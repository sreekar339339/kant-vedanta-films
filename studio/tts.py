"""Render narration for a film script with Kokoro (onnx) + espeak-ng phonemes.
Usage: python3 studio/tts.py <film>/script.json <film>/out [voice] [speed] [quote_voice] [quote_speed]   (run studio/setup_tts.sh once first)
A line may be a string or {"q": "text"}: an exact quotation, captioned as a quote (spoken by the narrator unless quote_voice is given).
Writes outdir/narration.wav and outdir/timings.json (start/end of every line)."""
import json, re, subprocess, sys, wave, os
import numpy as np, onnxruntime as ort

TTS = os.environ.get('TTS_DIR', '/tmp/tts')
SR = 24000
VOCAB = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'kokoro_config.json')))['vocab']
IPA = {  # names espeak gets wrong
 'naren':'nəɹˈeɪn','arjuna':'ˈɑːɹdʒʊnə','gita':'ɡˈiːtɑː','brajendranath':'bɹədʒˈeɪndɹənɑːt','dakshineswar':'dˌʌkʃɪnˈeɪʃwəɹ',
 'baranagore':'bˈɑːɹənəɡˌɔːɹ','dara':'dˈɑːɹɑː','shikoh':'ʃˈɪkoʊ','kanyakumari':'kˌʌnjɑːkʊmˈɑːɹi','varanasi':'vɑːɹˈɑːnəsi',
 'vrindavan':'vɹˈɪndɑːvən','deussen':'dˈɔɪsən','nivedita':'nɪvˈeɪdɪtɑː','hegel':'hˈeɪɡəl','fichte':'fˈɪktə','descartes':'deɪkˈɑːɹt',
 'comte':'kˈoʊnt','ramayana':'ɹɑːmˈɑːjənə','mahabharata':'məhˌɑːbˈɑːɹətə','mughal':'mˈuːɡəl','golconda':'ɡɑːlkˈɑːndə',
 'vaisheshika':'vaɪʃˈeɪʃɪkə','nyaya':'njˈɑːjə','rajputana':'ɹˌɑːdʒpʊtˈɑːnə','travancore':'tɹˈævəŋkɔːɹ','krishna':'kɹˈɪʃnə',
 'rig':'ɹˈɪɡ','veda':'vˈeɪdə','sicily':'sˈɪsɪli','messina':'məsˈiːnə','etna':'ˈɛtnə','kiel':'kˈiːl','swami':'swˈɑːmi',
 'maya':'mˈɑːjɑː','neti':'nˈeɪti','narendranath':'nəɹˈeɪndɹənɑːt','vivekananda':'vɪvˌeɪkɑːnˈʌndə',
 'shankara':'ʃˈʌŋkəɹə','upanishads':'uːpˈʌnɪʃədz','vedanta':'veɪdˈɑːntə','vedas':'vˈeɪdəz',
 'punya':'pˈʊɲjə','bhumi':'bʰˈuːmi','sannyasin':'sənjˈɑːsɪn','sannyasins':'sənjˈɑːsɪnz','rameswaram':'ɹɑːmˈeɪʃwəɹəm',
 'madura':'mˈʌdʊɹə','almora':'ʌlmˈoːɹə','manu':'mˈʌnuː','yuga':'jˈʊɡə','yugas':'jˈʊɡəz','rishis':'ɹˈɪʃiz','rishi':'ɹˈɪʃi',
 'shrutis':'ʃɹˈʊtiz','shruti':'ʃɹˈʊti','smritis':'smɹˈɪtiz','smriti':'smɹˈɪti','puranas':'pʊɹˈɑːnəz','purana':'pʊɹˈɑːnə',
 'merodach':'mˈɛɹədæk','ekam':'ˈeɪkəm','sad':'sˈʌd','vipra':'vˈɪpɹɑː','bahudha':'bˈʌhʊdʰɑː','vadanti':'vˈʌdənti',
 'mahimnah':'məhˈɪmnəh','stotra':'stˈoʊtɹə','caaba':'kˈɑːbə','jaffna':'dʒˈɑːfnə','pamban':'pˈɑːmbən',
 'karma':'kˈɑːɹmə','shiva':'ʃˈɪvə','vishnu':'vˈɪʃnuː','linga':'lˈɪŋɡə',
 'vaidikas':'vˈaɪdɪkəz','vedantists':'veɪdˈɑːntɪsts','vedantism':'veɪdˈɑːntɪzəm','mantra':'mˈʌntɹə','drashta':'dɹˈɑːʃtɑː','kanda':'kˈɑːndə','jnana':'ɡjˈɑːnə',
 'shaivites':'ʃˈaɪvaɪts','shaivite':'ʃˈaɪvaɪt','vaishnavites':'vˈaɪʃnəvaɪts','vaishnavite':'vˈaɪʃnəvaɪt','shaktas':'ʃˈɑːktəz','sauras':'sˈaʊɹəz','ganapatyas':'ɡˌʌnəpˈɑːtjəz',
 'satya':'sˈʌtjə','treta':'tɹˈeɪtɑː','dwapara':'dwˈɑːpəɹə','kali':'kˈʌli','prakriti':'pɹˈʌkɹɪti','pralaya':'pɹˈʌləjə','brahman':'bɹˈʌhmən','sukshma':'sˈʊkʃmə','sharira':'ʃəɹˈiːɹə',
 'manas':'mˈʌnəs','atman':'ˈɑːtmən','indra':'ˈɪndɹə','indras':'ˈɪndɹəz','nahusha':'nəhˈuːʃə','mukti':'mˈʊkti','advaita':'ədvˈaɪtə','ishta':'ˈɪʃtə','dana':'dˈɑːnə',
 'vyasa':'vjˈɑːsə','sindhu':'sˈɪndʰuː','tantras':'tˈʌntɹəz','lavoisier':'ləvwˈɑːzieɪ','antoine':'ɑːntwˈɑːn','vid':'vˈɪd','jains':'dʒˈeɪnz',
 'annisquam':'ˈænɪskwɑːm','manmatha':'mˈʌnməθə','nath':'nˈɑːt','bhattacharya':'bˌʌtʃɑːtʃˈɑːɹjə','rajput':'ɹˈɑːdʒpʊt','mazoomdar':'məzˈuːmdɑːɹ','greenacre':'ɡɹˈiːneɪkɚ',
 'lakshmi':'lˈʌkʃmi','saraswati':'sˈʌɹəsvəti','khetri':'kˈeɪtɹi','maharaja':'mˌɑːhəɹˈɑːdʒə','babu':'bˈɑːbuː','bengali':'bɛŋɡˈɔːli',
 'ramakrishna':'ɹˌɑːməkɹˈɪʃnə','schopenhauer':'ʃˈoʊpənhaʊɚ','kant':'kˈɑːnt','muller':'mˈʊlɚ'}
PUNCT = set(',.;:!?—')

def espeak(text):
    out = subprocess.run([f'{TTS}/piper/espeak-ng', f'--path={TTS}/piper/espeak-ng-data', '-q', '--ipa', '-v', 'en-us', text],
                         capture_output=True, text=True, env={**os.environ, 'LD_LIBRARY_PATH': f'{TTS}/piper'}).stdout
    return ' '.join(out.replace('‍', '').split())

def phonemize(text):
    parts, buf = [], []
    def flush():
        if buf: parts.append(espeak(' '.join(buf))); buf.clear()
    for tok in re.findall(r"[A-Za-zÀ-ž'’-]+|[,.;:!?—]", text):
        if tok in PUNCT:
            flush(); parts.append(tok); continue
        base = tok.lower().replace('’', "'")
        poss = base.endswith("'s")
        key = base[:-2] if poss else base
        if key in IPA:
            flush(); parts.append(IPA[key] + (('s' if IPA[key][-1] in 'tkpfθ' else 'z') if poss else ''))
        else:
            buf.append(tok)
    flush()
    s = ''
    for p in parts:
        s += p if p in PUNCT else ((' ' if s else '') + p)
    return s

def main():
    script, outdir = sys.argv[1], sys.argv[2]
    voice = sys.argv[3] if len(sys.argv) > 3 else 'af_heart'
    speed = float(sys.argv[4]) if len(sys.argv) > 4 else 0.95
    os.makedirs(outdir, exist_ok=True)
    sess = ort.InferenceSession(f'{TTS}/model.onnx', providers=['CPUExecutionProvider'])
    names = [i.name for i in sess.get_inputs()]
    tok_in = 'input_ids' if 'input_ids' in names else 'tokens'
    speed_dt = np.int32 if 'int' in next(i.type for i in sess.get_inputs() if i.name == 'speed') else np.float32
    qvoice = sys.argv[5] if len(sys.argv) > 5 else voice   # one narrator by default; pass a voice to give quotes their own
    qspeed = float(sys.argv[6]) if len(sys.argv) > 6 else speed
    bank = np.load(f'{TTS}/voices.bin')
    vstyle, qstyle = bank[voice], bank[qvoice]
    data = json.load(open(script))
    audio, t, timings = [], 0.0, []
    def sil(sec):
        nonlocal t
        audio.append(np.zeros(int(sec * SR), np.float32)); t += sec
    sil(0.6)
    for ci, ch in enumerate(data['chapters']):
        if ci: sil(1.1)
        ch_start = t
        lines = []
        for li, line in enumerate(ch['lines']):
            q = isinstance(line, dict)
            if q: line = line['q']
            ph = phonemize(line)
            toks = [VOCAB[c] for c in ph if c in VOCAB][:510]
            sty, spd = (qstyle, qspeed) if q else (vstyle, speed)
            if q and li: sil(0.18)
            out = sess.run(None, {tok_in: np.array([[0, *toks, 0]], np.int64),
                                  'style': sty[len(toks) - 1].reshape(1, -1).astype(np.float32),
                                  'speed': np.array([spd], speed_dt)})
            a = np.asarray(out[0]).ravel().astype(np.float32)
            # trim near-silent edges
            nz = np.where(np.abs(a) > 0.01)[0]
            if len(nz): a = a[max(0, nz[0] - 1200): nz[-1] + 2400]
            start = t
            audio.append(a); t += len(a) / SR
            lines.append({'text': line, 'start': round(start, 3), 'end': round(t, 3), 'ph': ph, **({'q': True} if q else {})})
            sil(0.42 if li < len(ch['lines']) - 1 else 0.7)
            print(f'{ch["id"]}.{li} {t:7.2f}s  {ph[:70]}', flush=True)
        timings.append({'id': ch['id'], 'start': round(ch_start, 3), 'end': round(t, 3), 'lines': lines})
    sil(1.5)
    pcm = np.clip(np.concatenate(audio), -1, 1)
    pcm = (pcm / max(1e-6, np.abs(pcm).max()) * 0.92 * 32767).astype(np.int16)
    with wave.open(f'{outdir}/narration.wav', 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    json.dump({'duration': round(t, 3), 'voice': voice, 'speed': speed, 'quote_voice': qvoice, 'chapters': timings}, open(f'{outdir}/timings.json', 'w'), ensure_ascii=False, indent=1)
    print('TOTAL', round(t, 2))

if __name__ == '__main__':
    main()
