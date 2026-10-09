"""Builds the decision board's records (seed.json). The board page reads them from its shared store;
Claude writes them there after publishing, and reads back the picks, verdicts and notes made on the page.
Run: python3 studio/board/seed.py <used.json>   (used.json maps engine functions to Film 1 chapters)"""
import json, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
PLAN = json.load(open(os.path.join(HERE, '..', 'series', 'colombo-to-almora', 'plan.json')))
USED = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else {}
CHN = {c[0]: c[2] for c in PLAN['films'][0]['chapters']}
docs = {}
def add(id_, **d):
    d.setdefault('film', 0); docs[id_] = d

# ---------- 1. calls: open and proposed decisions ----------
calls = [
 ('call-baal', dict(film=1, chapter='tribes', status='proposed', title='How to show Baal',
   body='Narration: "Allied Babylonian tribes called their gods Baal." Two hilltop gods carry this name in the chapter.',
   opts=[dict(k='storm', label='Striding storm god', pv='baalStorm', rec=True, now=True,
              note='A bronze statuette with a horned crown, a raised mace and a lightning spear, after the Baal stele from Ugarit.'),
         dict(k='high', label='High-place altar', pv='highPlace',
              note='A standing stone, a four-horned altar with fire and a sacred pole. No figure at all.')])),
 ('call-moloch', dict(film=1, chapter='tribes', status='proposed', title='The Jewish tribes’ god, narrated as “Moloch”',
   body='Vivekananda follows a 19th-century theory that linked Moloch and Yahveh. Israelite worship had no cult image, so a bull idol here would misrepresent it and could offend.',
   opts=[dict(k='ark', label='Ark of the Covenant', pv='ark', rec=True, now=True, note='Aniconic and historically grounded; the Ark went out with the tribes to battle.'),
         dict(k='bull', label='Victorian bull-headed idol', pv='moloch', note='How 1890s readers pictured Moloch (Flaubert’s Salammbô). Dramatic, but historically doubtful.'),
         dict(k='tablets', label='Two stone tablets', pv='tablets', note='Clear and respectful, but it says law more than tribal war-god.')])),
 ('call-merodach', dict(film=1, chapter='tribes', status='proposed', title='Baal-Merodach (Marduk of Babylon)',
   body='Narration: "Baal-Merodach, said the Babylonians, was the greatest."',
   opts=[dict(k='dragon', label='Marduk’s dragon on blue glazed brick', pv='mushhushshu', rec=True, now=True, note='The mušḫuššu dragon from the Ishtar Gate: the best-known image tied to Marduk.'),
         dict(k='ziggurat', label='The ziggurat of Babylon', pv='ziggurat', note='Etemenanki, Marduk’s temple tower. Reads as Babylon more than as a god.')])),
 ('call-yahveh', dict(film=1, chapter='tribes', status='proposed', title='“Moloch-Yahveh”, over all the other Molochs',
   body='The lecture’s own name for the god who won out among the Jewish tribes. We keep his words in the lettering and keep the image aniconic.',
   opts=[dict(k='ark', label='The Ark, crowned', pv='ark', rec=True, now=True, note='Matches the earlier hilltop, so the viewer sees the same tribe rise.'),
         dict(k='bush', label='The burning bush', pv='burningBush', note='Strong image, but it belongs to Moses’ call, not to tribal rivalry.'),
         dict(k='tablets', label='Two stone tablets', pv='tablets', note='')])),
 ('call-swastika', dict(status='open', title='The swastika as an auspicious mark',
   body='It is an everyday Hindu sign of good fortune, drawn on doorways, account books and the kalash. Viewers outside India often read it through its Nazi misuse. Right now the films leave it out.',
   opts=[dict(k='out', label='Leave it out', now=True, note='No risk of misreading. The kalash and doorways stay without it.'),
         dict(k='india', label='Use it in India scenes only', pv='kalash', note='On the kalash, thresholds and rangoli, small and in vermilion, as it actually appears.')])),
 ('call-deities', dict(status='open', title='How to show Hindu deities and avatars',
   body='Film 1 shows gods only through their emblems. Later films need Rama, Sita, Krishna and the Gopis, Shiva in the poor, Dhruva and Prahlada, Radha and Krishna (Films 4, 13, 21, 23).',
   opts=[dict(k='symbols', label='Emblems and attributes only', pv='trident', now=True, note='Trident and Nandi, conch and chakra, bow and arrow, flute and peacock feather. Never wrong, sometimes abstract.'),
         dict(k='folk', label='Painted figures in an Indian folk manner', note='Original drawings in the spirit of Kalighat pat and Pattachitra, painted in the same watercolour.'),
         dict(k='oleo', label='Traced 1890s oleographs', note='Raja Ravi Varma Press prints, which are public domain and period-correct. Each one needs a download you approve.')])),
 ('call-saints', dict(status='open', title='Saints and teachers on screen',
   body='Shankara, Ramanuja, Chaitanya, Nanak, Kabir, Dadu, Buddha, Guru Govind Singh, Ramakrishna (Films 11, 13, 17, 22). Sikh practice is wary of painted likenesses of the Gurus.',
   opts=[dict(k='trace', label='Trace real photographs where they exist', note='Ramakrishna (1881, 1884) and other 19th-century figures. Each photo needs your yes to download.'),
         dict(k='emblem', label='Emblems for the rest', pv='palmleaf', note='Bodhi tree for the Buddha, a manuscript and staff for Shankara, the Khanda for Guru Govind Singh.'),
         dict(k='paint', label='Painted portraits for everyone', note='Consistent look, but invented faces for people we have no picture of.')])),
 ('call-science', dict(status='open', title='The science parallels',
   body='Several chapters set a lecture idea beside a discovery: Lavoisier 1789, Ritter 1801, Helmholtz 1847, Maxwell 1865, Mendeleev 1869, Koch 1882, Copernicus 1543, Newton 1687 (Films 2, 3, 7, 9, 12, 18, 24, 25, 29).',
   opts=[dict(k='sepia', label='A sepia engraving inset', note='A small framed plate, like a 19th-century textbook figure, sits in the mural. The style change signals the change of subject.'),
         dict(k='water', label='Same watercolour as everything else', pv='dynamo', now=True, note='The apparatus is painted like any other object, as with the dynamo in Film 1.')])),
 ('call-photos', dict(status='open', title='More period photographs to trace',
   body='Candidates: Sri Ramakrishna; Raja Bhaskara Sethupathi of Ramnad; Raja Ajit Singh of Khetri; Sister Nivedita; Belur Math in 1899; Castle Kernan, Madras.',
   opts=[dict(k='each', label='Ask me before each download', now=True, note='Name, source and size for every file, one at a time.'),
         dict(k='list', label='Approve this list from Wikimedia Commons', note='Public-domain files only. I still show you each one before using it.')])),
]
for i, (id_, d) in enumerate(calls):
    if d.get('chapter'): d['chapterName'] = CHN.get(d['chapter'], d['chapter'])
    add(id_, sec='call', ord=i, **d)

# ---------- 2. series style, settled ----------
style = [
 ('voice', 'One narrator', 'A single voice (Kokoro af_heart, speed 0.92). Quoted lines use the same voice and show as italic captions.', 'You asked for one voice, not two.'),
 ('length', 'No time cap', 'Each lecture gets the length its content needs.', 'Your brief at the start.'),
 ('mural', 'One mural per chapter', 'Drawings build left to right; the camera pans panel to panel and pulls back to show the whole mural, then the board wipes clean.', 'The After Skool study.'),
 ('paint', 'Watercolour', 'Layered translucent washes on a paper texture, with a light ink line. No cross-hatching.', 'You chose watercolour over gouache and flat marker.'),
 ('reveal', 'Outline, then colour', 'Each object sketches its outline quickly and floods with colour by sweep, bloom or drop, chosen per object.', 'Hatching was slow and repetitive.'),
 ('density', 'Dense scenes', '20 to 50 things from the narration in each panel: places, people, tools, plants, animals, symbols.', 'You asked for even denser.'),
 ('hand', 'No hand in shot', 'Drawings appear by themselves.', 'Your choice in the mural study.'),
 ('letter', 'Lettering on the board', 'Hand-lettered capitals (Patrick Hand SC) placed in clear space, key words in colour.', 'Your choice in the mural study.'),
 ('quote', 'The quote card', 'Closing quotation in italic serif beside the traced portrait on a sky wash.', ''),
 ('portraits', 'Traced portraits', 'People are traced from public-domain photographs of the 1890s and painted from their own colour regions.', 'You approved the two 1893 Chicago photographs.'),
 ('sanskrit', 'Sanskrit in Devanagari', 'Sanskrit terms and verses are lettered in Devanagari (Tiro Devanagari Sanskrit), with English beside them.', ''),
 ('band', 'Temple border in India scenes', 'A red-and-gold temple-tower band runs along the top of every India scene. It appears at once, without animating, and joins up from panel to panel like a sari border.', 'You asked for it drawn instantly.'),
 ('hindu', 'Hindu motifs where India is the subject', 'Kalash, toran, lamps, bells, rangoli, temple elephants, peacocks, Om, yantra and the rest appear only in India scenes. Greek, Roman, Western and world scenes stay without them.', 'Your note on making India scenes stylistically Hindu.'),
 ('maps', 'Maps for places', 'A chapter that opens on a place starts with a watercolour map and the route.', ''),
 ('aniconic', 'Aniconic faiths stay aniconic', 'Where a tradition forbids images of God, we show its sacred objects (the Ark, the Kaaba), never a figure.', 'Set with the Gods of the tribes chapter.'),
]
for i, (k, t, choice, why) in enumerate(style): add('style-' + k, sec='style', ord=i, status='settled', title=t, choice=choice, why=why)

# ---------- 3. symbols chosen for narration in Film 1 ----------
sym = [
 ('arrive', 'Colombo harbour', 'lighthouse', 'Lighthouse, steamship, outrigger canoes, harbour buildings, palms'),
 ('arrive', 'The welcome', 'kalash', 'Welcome arch with toran and marigolds, a kalash on each side, a temple elephant, a cheering crowd'),
 ('arrive', 'The road north', 'indiaMap', 'Map of India with the tour route, temple icons at Madura, Madras and Calcutta'),
 ('welcome', 'Address of welcome', 'scroll', 'A scroll under a toran, brass lamps, garlands, two rows of people'),
 ('welcome', 'Not a politician, soldier or millionaire', 'tophat', 'Top hat, cannon, money bag and crown, each struck through in red'),
 ('welcome', 'A begging Sannyasin', 'kamandalu', 'Begging bowl, kamandalu, staff and rudraksha mala'),
 ('welcome', 'Religion, the backbone', 'spine', 'A spine of stacked vertebrae beside Om'),
 ('welcome', 'Floral Hall', 'building', 'Pillared hall with a toran and brass lamps at the door'),
 ('punya', 'Blessings from the West', 'steamship', 'The 1893 portrait, a glowing path from India to Western buildings'),
 ('punya', 'Punya Bhumi', 'rangoli', 'The word in Devanagari over temple towns, temple bells, rangoli and lamps'),
 ('punya', 'Every soul wending Godward', 'shikhara', 'Pilgrims climbing a path to a shikhara temple, saffron flags'),
 ('punya', 'Tidal waves of philosophy', 'globe', 'Globe with rings of waves, ships and books at the edges'),
 ('sword', 'Greek battalions, war trumpets', 'hoplite', 'Hoplites in dust, trumpets, the eagle standard, a temple'),
 ('sword', 'A deluge of blood', 'helmetX', 'Red sea, fallen helmets and swords, blood rain, widows’ tears'),
 ('sword', 'A blessing behind it', 'kalash', 'A large kalash, doves, sages, a tulsi planter, a peacock, a banyan'),
 ('capitol', 'The Roman eagle', 'eagleStandard', 'The aquila standard over a temple, coins and a crown'),
 ('capitol', 'The spider’s web on the Capitol', 'web', 'Broken columns with a spider web, a fallen helmet, ripples'),
 ('capitol', 'Manu', 'havan', 'A seated lawgiver, palm-leaf laws, books, a havan fire, a heart'),
 ('plough', 'Religion, the one occupation', 'bell', 'A saffron panel lettered RELIGION with a toran, bells and a temple town'),
 ('plough', 'The Sino-Japanese War', 'newspaper', 'Newspaper front pages and a cannon'),
 ('plough', 'The Western labourer', 'tophat', 'Man in a hat at the plough, a vote box, a silver dollar, a church'),
 ('plough', 'The ploughman’s mark', 'ox', 'Oxen, plough, the farmer with a mark on his forehead, rice fields, tulsi, rangoli, a well, women with water pots'),
 ('dynamo', 'Political greatness is not our mission', 'crownX', 'Crown and cannon, struck through'),
 ('dynamo', 'A dynamo of spiritual energy', 'dynamo', 'A dynamo inside a halo of rays, lamps and a brass samai'),
 ('dynamo', 'The light spiritual', 'om', 'Globe with India glowing and Om at its heart; Persian, Greek, Roman, Arab and English ships'),
 ('dew', 'Indian ideas flooding the world', 'indiaMap', 'Map of India with Om and arrows outward to mosque, church and stupa'),
 ('dew', 'Schopenhauer and the Upanishads', 'book', 'The philosopher, and the Upanishads in Sanskrit, Persian and Latin'),
 ('dew', 'Never by fire and sword', 'sword', 'Sword and fire inside a red no-sign; FASCINATION in a flower of life'),
 ('dew', 'Like the gentle dew', 'lotus', 'Dewdrops falling on a lotus pond and roses'),
 ('porcelain', 'History repeating', 'wheel', 'A turning wheel under the light of science and books'),
 ('porcelain', 'Pulverised like porcelain', 'vase', 'Cracked vases, shards and a hammer'),
 ('porcelain', 'The world a mud-puddle', 'clock', 'A puddle, a clock, figures evolving, the conservation of energy'),
 ('porcelain', 'Vedanta', 'sriYantra', 'The Sri Yantra inside rings of colour'),
 ('yugas', 'Shruti and Smriti', 'palmleaf', 'Two palm-leaf manuscripts in Devanagari, a temple town and a village'),
 ('yugas', 'Yugas and Rishis', 'wheel', 'The wheel of the four Yugas; Rishis with kamandalus and a havan'),
 ('tribes', 'Baal and Moloch', 'baalStorm', 'See Your call: the storm god for Baal, the Ark for the tribe narrated as Moloch'),
 ('tribes', 'Baal-Merodach and Moloch-Yahveh', 'mushhushshu', 'See Your call: Marduk’s dragon against the crowned Ark, swords crossed'),
 ('tribes', 'Shiva and Vishnu', 'nandi', 'Trident, lingam and Nandi; conch, chakra and peacock; a temple bell'),
 ('ekam', 'Ekam sat', 'om', 'The Rig Veda line on a palm leaf with Om, sages, lamps and a havan'),
 ('ekam', 'The same One by many names', 'trident', 'Trident = conch inside one circle, a rudraksha mala'),
 ('ekam', 'Dualist and Advaitist', 'seated', 'Two seated sages either side of a banyan, a kamandalu and tulsi'),
 ('rivers', 'Temples for Mohammedans and Christians', 'mosque', 'Hindu builders carrying bricks between a mosque and a church'),
 ('rivers', 'Different rivers, one ocean', 'waves', 'Mountain streams converging into the sea, shikharas on the banks'),
 ('rivers', 'The Caaba, the church, the stupa', 'lingam', 'Kaaba, church and stupa with arrows to a garlanded lingam'),
 ('mission', 'Not toleration but sympathy', 'dove', 'Doves and flowers under the lettering'),
 ('mission', 'Man, woman and child', 'rangoli', 'Three figures, a village, a rangoli, six virtues lettered above'),
 ('mission', 'Next: Jaffna', 'gopuram', 'Map from Colombo to Jaffna with a gopuram and a kalash'),
]
for i, (ch, term, pv, d) in enumerate(sym):
    add(f'sym-1-{i:02d}', sec='symbol', film=1, chapter=ch, chapterName=CHN.get(ch, ch), ord=i, status='settled', title=term, pv=pv, choice=d)

# ---------- 4. motif library ----------
G = {'india': 'Hindu and Indian', 'ancient': 'Ancient and Western', 'world': 'Land, sea and sky', 'people': 'People and crowds', 'modern': 'Modern and science', 'sign': 'Signs and marks'}
motifs = [
 # india
 ('om', 'Om', 'india'), ('kalash', 'Kalash (purna kumbha)', 'india'), ('toran', 'Toran of mango leaves', 'india'), ('marigolds', 'Marigold strings', 'india'),
 ('rangoli', 'Rangoli', 'india'), ('bell', 'Temple bell', 'india'), ('samai', 'Brass lamp (samai)', 'india'), ('diya', 'Diya', 'india'), ('lotus', 'Lotus', 'india'),
 ('peacock', 'Peacock', 'india'), ('elephant', 'Temple elephant', 'india'), ('nandi', 'Nandi', 'india'), ('tulsi', 'Tulsi planter', 'india'),
 ('chakra', 'Chakra', 'india'), ('sriYantra', 'Sri Yantra', 'india'), ('kamandalu', 'Kamandalu', 'india'), ('mala', 'Rudraksha mala', 'india'),
 ('shikhara', 'Shikhara temple', 'india'), ('gopuram', 'Gopuram', 'india'), ('templeTown', 'Temple town', 'india'), ('ghat', 'River ghat', 'india'),
 ('dhwaja', 'Temple flag', 'india'), ('parasol', 'Ceremonial parasol', 'india'), ('veena', 'Veena', 'india'), ('havan', 'Havan fire', 'india'),
 ('lingam', 'Lingam', 'india'), ('trident', 'Trident', 'india'), ('conch', 'Conch', 'india'), ('palmleaf', 'Palm-leaf manuscript', 'india'),
 ('banyan', 'Banyan', 'india'), ('kumbamBand', 'Temple border band', 'india'), ('indiaMap', 'Map of India', 'india'), ('paddy', 'Rice fields', 'india'),
 ('hut', 'Village hut', 'india'), ('well', 'Village well', 'india'), ('ox', 'Ox', 'india'), ('plough', 'Plough', 'india'), ('pot', 'Water pot', 'india'),
 ('wheel', 'Wheel of the Yugas', 'india'), ('garland', 'Garland', 'india'),
 # ancient
 ('hoplite', 'Greek hoplite', 'ancient'), ('temple', 'Greek temple', 'ancient'), ('column', 'Column', 'ancient'), ('eagleStandard', 'Roman eagle standard', 'ancient'),
 ('trumpet', 'War trumpet', 'ancient'), ('helmetX', 'Fallen helmet', 'ancient'), ('sword', 'Sword', 'ancient'), ('web', 'Spider web', 'ancient'),
 ('baalStorm', 'Baal, storm god', 'ancient'), ('highPlace', 'High-place altar', 'ancient'), ('moloch', 'Moloch, Victorian idol', 'ancient'),
 ('mushhushshu', 'Marduk’s dragon', 'ancient'), ('ziggurat', 'Ziggurat', 'ancient'), ('ark', 'Ark of the Covenant', 'ancient'), ('tablets', 'Stone tablets', 'ancient'),
 ('burningBush', 'Burning bush', 'ancient'), ('church', 'Church', 'ancient'), ('mosque', 'Mosque', 'ancient'), ('caaba', 'Kaaba', 'ancient'), ('stupa', 'Stupa', 'ancient'),
 ('crownX', 'Crown', 'ancient'), ('scroll', 'Scroll', 'ancient'),
 # world
 ('skyset', 'Sky with sun, clouds, birds', 'world'), ('mountains', 'Mountains', 'world'), ('waves', 'Sea', 'world'), ('palm', 'Palm', 'world'), ('cloud', 'Cloud', 'world'),
 ('sun', 'Sun', 'world'), ('bird', 'Bird', 'world'), ('dove', 'Dove', 'world'), ('rose', 'Rose', 'world'), ('flowers', 'Flower bed', 'world'), ('fire', 'Fire', 'world'),
 ('hill', 'Hill', 'world'), ('globe', 'Globe', 'world'), ('rainbow', 'Rainbow', 'world'), ('village', 'Village', 'world'),
 # people
 ('person', 'Person', 'people'), ('crowd', 'Crowd', 'people'), ('crowdRows', 'Two-row crowd', 'people'), ('seated', 'Seated figure', 'people'), ('sage', 'Sage', 'people'),
 ('battlefield', 'Battlefield', 'people'), ('canoe', 'Outrigger canoe', 'people'), ('portrait', 'Traced portrait (1893)', 'people'),
 # modern
 ('steamship', 'Steamship', 'modern'), ('lighthouse', 'Lighthouse', 'modern'), ('colonial', 'Colonial building', 'modern'), ('harbour', 'Harbour front', 'modern'),
 ('building', 'Pillared hall', 'modern'), ('dynamo', 'Dynamo', 'modern'), ('bulb', 'Light bulb', 'modern'), ('newspaper', 'Newspaper', 'modern'), ('cannon', 'Cannon', 'modern'),
 ('tophat', 'Top hat', 'modern'), ('moneybag', 'Money bag', 'modern'), ('clock', 'Clock', 'modern'), ('vase', 'Porcelain vase', 'modern'), ('hammer', 'Hammer', 'modern'),
 ('book', 'Book', 'modern'), ('coin', 'Coin', 'modern'), ('arch', 'Welcome arch', 'modern'), ('bunting', 'Bunting', 'modern'),
 # signs
 ('spine', 'Spine', 'sign'), ('rays', 'Rays', 'sign'), ('flowerOfLife', 'Flower of life', 'sign'), ('tears', 'Tears', 'sign'), ('star', 'Star', 'sign'), ('flag', 'Flag', 'sign'),
 ('arrowL', 'Arrow', 'sign'), ('strikeL', 'Strike-through', 'sign'),
]
for i, (k, name, g) in enumerate(motifs):
    chs = USED.get(k, []) if k != 'portrait' else ['punya', 'welcome', 'mission']
    add('motif-' + k, sec='motif', ord=i, status='settled', title=name, pv=k, group=g, groupName=G[g],
        used=[CHN.get(c, c) for c in chs])

# ---------- 5. the film slate ----------
design = {
 1: [], 2: ['Nallur temple, Jaffna', 'Sindhu river becoming "Hindu"', 'Rishi seeing a mantra', 'Four Vedas', 'Lavoisier’s balance', 'Rain on every field', 'Nahusha falling from Indra’s throne'],
 3: ['Pamban wharf and the Raja’s pandal', 'Raja of Ramnad (portrait)', 'Shoemaker and bricklayer', 'Ritter’s prism and ultraviolet', 'Robber-baron castle and Rishi cave', 'Krishna’s chariot'],
 4: ['Rameswaram temple corridor', 'Shiva in the poor and the sick', 'Two gardeners and the master’s garden', 'A dusty mirror'],
 5: ['Ramnad palace', 'The giant rising', 'A ditch beside a fountain', 'Mushroom nations', 'Pravritti and Nivritti'],
 6: ['Spiritual and material tides', 'Shylock moneylenders', 'The world as a stage play', 'Heir to the Emperor of emperors'],
 7: ['The mountain and Mohammed', 'An empire where the sun never sets', 'Koch’s microscope', 'The cooking-pot "don’t touch me"'],
 8: ['Madura: Meenakshi-Sundareshwara gopurams', 'Scylla and Charybdis', 'Southern and Northern customs', 'Rishi with a heart like the ocean'],
 9: ['Ganga from the glacier', 'A great tree that cannot be moved', 'A Japanese vase as ornament', 'Helmholtz and energy'],
 10: ['Castle Kernan, Madras', 'Speaking from a carriage box', 'A crowd that breaks the hall', 'The fire kept burning'],
 11: ['Victoria Hall, Madras', 'The drowning boy', 'Chronic rheumatism', 'Six reformers on a map'],
 12: ['She-goat or the Unborn (Ajā)', 'Two birds on one tree', 'Alexander and the sannyasin', 'Madalasa’s cradle', 'Maxwell’s field lines'],
 13: ['Rama, Sita, Krishna and the Gopis', 'The Gita as pearls on a thread', 'Buddha and the Jagannath temple', 'Shankara, Ramanuja, Chaitanya', 'Ramakrishna (portrait)'],
 14: ['Greek and Indian minds', 'Roman and English roads', 'The Sufi at the closed door'],
 15: ['Somnath destroyed and rebuilt', 'The cobra drawing out its poison', 'The ass carrying sandalwood', 'The Virat, the cosmic form'],
 16: ['Feeding the hungry (annadana)', 'Poor-house and jail'],
 17: ['Sobhabazar Rajbari, Calcutta', 'The oyster in its shell', 'Nachiketa at the house of Death'],
 18: ['Athens, Alexandria, Antioch', 'The farmer breaching the mud wall', 'Neti, neti', 'Kant: time, space, causation', 'Copernicus’ sky', 'The saffron banner of renunciation'],
 19: ['The road to Almora', 'Himalayan peaks', 'The moon among stars', 'A Math in the hills'],
 20: ['A tribal god conquering others', 'The hall dissolving into Spirit'],
 21: ['Kashmir, Murree, Jammu, Sialkot', 'A river divided', 'The sadhu who makes gold', 'Radha and Krishna', 'The tigress and her cubs'],
 22: ['Lahore and the five rivers', 'The giant whose life is in a bird', 'The ass in a lion’s skin', 'Guru Govind Singh (emblem)'],
 23: ['Dhruva and Prahlada', 'The mother facing the lion', 'The triangle of love'],
 24: ['The Arundhati star', 'A stone in the lake', 'The pearl in the oyster', 'Rope and snake', 'The potter and the pot'],
 25: ['Khetri palace and Raja Ajit Singh', 'Dara Shukoh’s Persian Upanishads', 'The Egyptian double', 'Mendeleev’s table'],
 26: ['Star Theatre, Calcutta', 'Bengali script on Chinese temple walls', 'Sister Nivedita (portrait)', 'Bubble, wave and ocean'],
 27: ['Belur Math, 1899', 'Catching the crocodile', 'The plant and the dog'],
 28: ['Rivers and boats of Eastern Bengal', 'An amalaka fruit in the palm', 'Parrots reciting'],
 29: ['The seed that seems to rot', 'Repairing the old house', 'The leaking ship', 'Newton’s gravitation'],
}
for f in PLAN['films']:
    n = f['n']
    st = 'review' if n == 1 else ('next' if n <= 4 else 'planned')
    d = dict(sec='film', film=n, ord=n, status=st, title=f['title'], lecture=f['lecture'], where=f['where'],
             chapters=[c[2] for c in f['chapters']], design=design.get(n, []))
    if n == 1: d['url'] = 'https://claude.ai/artifact/XGGbzoBgwE9bjCqLAbArwb'
    add(f'film-{n:02d}', **d)

json.dump(docs, open(os.path.join(HERE, 'seed.json'), 'w'), ensure_ascii=False, indent=1)
print(len(docs), 'records')
