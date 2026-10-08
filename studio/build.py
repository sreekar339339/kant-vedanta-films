"""Build film pages from studio sources.

  python3 studio/build.py <series_dir> artifact <filmN>   -> <series_dir>/<filmN>/build/index.html + narration.mp3
  python3 studio/build.py <series_dir> site               -> every film into <repo>/<site_path>/<filmN>/ (GitHub Pages)

<series_dir>/series.json:
  {"title": "...", "site_path": "" (root) or "my-series",
   "films": [{"dir": "film1", "title": "...", "desc": "...", "poster": 19.8, "artifact": "https://claude.ai/artifact/..."}]}
Each film dir holds script.json, scenes.js and out/ (timings.json + narration.mp3 from tts.py).
An optional <series_dir>/common.js (helpers shared by a series) is prepended to every film's scenes.js.
"""
import html, json, os, shutil, sys

STUDIO = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(STUDIO)
HEAD = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} · {series}</title>
<meta name="description" content="{desc}">
<style>*,*::before,*::after{{box-sizing:border-box}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
'''

def film_html(series_dir, ser, i, standalone):
    f = ser['films'][i]; d = os.path.join(series_dir, f['dir'])
    s = json.load(open(f'{d}/script.json')); t = json.load(open(f'{d}/out/timings.json'))
    chs = [{'id': sc['id'], 'title': sc['title'], 'style': sc['style'], 'src': sc['src'], 'start': tc['start'],
            'lines': [{'text': l['text'], 'start': l['start'], 'end': l['end'], **({'q': 1} if l.get('q') else {})} for l in tc['lines']]}
           for sc, tc in zip(s['chapters'], t['chapters'])]
    data = {'duration': t['duration'], 'poster': f.get('poster', 5), 'chapters': chs}
    n = len(ser['films'])
    def link(j):
        g = ser['films'][j]; lab = f"{j+1}. {g['title']}"
        if j == i: return f'<b>{lab}</b>'
        href = f"../{g['dir']}/" if standalone else g.get('artifact')
        return f'<a href="{href}">{lab}</a>' if href else f'<span>{lab}</span>'
    nav = (('<a href="../">All films</a> · ' if standalone else 'Series: ') + ' · '.join(link(j) for j in range(n)))
    h = open(f'{STUDIO}/shell.html').read()
    h = h.replace('Kant &amp; Vedanta · Film {{NUM}} of 3', f"{html.escape(ser['title'])} · Film {i+1} of {n}")
    h = h.replace('{{TITLE}}', s['title']).replace('{{NUM}}', str(i+1)).replace('{{NAV}}', nav)
    h = (h.replace('/*DATA*/null', json.dumps(data, ensure_ascii=False))
          .replace('/*LIB*/', open(f'{STUDIO}/lib.js').read())
          .replace('/*SCENES*/', (open(f'{series_dir}/common.js').read() + '\n' if os.path.exists(f'{series_dir}/common.js') else '') + open(f'{d}/scenes.js').read())
          .replace('/*PLAYER*/', open(f'{STUDIO}/player.js').read()))
    if standalone:
        title_tag = f"<title>{s['title']}</title>\n"
        h = h.replace(title_tag, '', 1)
        links_end = h.index('<style>')
        h = (HEAD.format(title=s['title'], series=html.escape(ser['title']), desc=html.escape(f.get('desc', ''))) + h[:links_end] +
             '</head>\n<body>\n' + h[links_end:] + '</body>\n</html>\n')
    return h

def main():
    series_dir, mode = os.path.abspath(sys.argv[1]), sys.argv[2]
    ser = json.load(open(f'{series_dir}/series.json'))
    if mode == 'artifact':
        i = [f['dir'] for f in ser['films']].index(sys.argv[3])
        out = os.path.join(series_dir, ser['films'][i]['dir'], 'build'); os.makedirs(out, exist_ok=True)
        open(f'{out}/index.html', 'w').write(film_html(series_dir, ser, i, False))
        shutil.copy(os.path.join(series_dir, ser['films'][i]['dir'], 'out', 'narration.mp3'), f'{out}/narration.mp3')
        print('artifact build:', out)
    elif mode == 'site':
        root = os.path.join(REPO, ser.get('site_path', ''))
        for i, f in enumerate(ser['films']):
            out = os.path.join(root, f['dir']); os.makedirs(out, exist_ok=True)
            open(f'{out}/index.html', 'w').write(film_html(series_dir, ser, i, True))
            shutil.copy(os.path.join(series_dir, f['dir'], 'out', 'narration.mp3'), f'{out}/narration.mp3')
            print('site build:', out)
    else:
        sys.exit('mode must be artifact or site')

if __name__ == '__main__':
    main()
