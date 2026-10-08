# Vivekananda animated film studio: workflow

Narrated, animated explainer films made from Swami Vivekananda source pages. Every frame is drawn live on a canvas from one timeline, kept in sync with a synthesised narration track. Films are published as claude.ai Artifacts and on GitHub Pages.

- Repo: `sreekar339339/kant-vedanta-films` (public). Pages serves `main` from `/ (root)` at https://sreekar339339.github.io/kant-vedanta-films/
- Engine: `studio/` (lib.js, player.js, shell.html, build.py, tts.py, sheet.py, setup_tts.sh)
- Series sources: `studio/series/<slug>/` with `series.json` plus `filmN/{script.json, scenes.js, out/}`
- Reference series: `studio/series/kant-vedanta` (3 films, 35 chapters, all seven styles)

## 0. Set up a fresh web session
1. Attach the repo with `add_repo` (owner `sreekar339339`, repo `kant-vedanta-films`, access `push`), then clone it to `/home/claude/kant-vedanta-films`.
2. Run `sh studio/setup_tts.sh` (about 150 MB from GitHub releases). PyPI and Hugging Face are blocked; GitHub works.
3. The Claude GitHub App is installed on the repo, so `git push` works. The session cannot create repos or change Pages settings; ask the user for those.

## 1. Read the sources
- WebFetch every URL the user gives. Ask for a full summary plus verbatim key passages.
- Narration must come only from these pages: quotes exact, paraphrase faithful. Name each chapter's source in `src`.

## 2. Plan with the user
- Before building, propose: how many films (split by kind of content, about 4–5 minutes and 10–13 chapters each), chapter list per film, a home style per film, and a style per chapter.
- Default direction: one calm narrator, with Naren (or another person from the source) framing the opening and close.

## 3. Style grammar: one job per style
| style key | Look | Use for |
|---|---|---|
| `plate` | dark graph-paper scientific figure, "FIG. n.m" caption, cited source | an argument with a REAL scientific parallel; never force-fit |
| `percept` | light lab card with an optical illusion | the viewer experiences the point (Kanizsa 1955, Müller-Lyer 1889, Chevreul 1839…) |
| `lantern` | magic lantern: light → slides → picture on a round screen | Māyā, appearance vs the light behind it, removing thoughts |
| `palmleaf` | palm-leaf manuscript on wood, Devanagari with English glosses, strike-throughs | scripture, Sanskrit terms, neti neti |
| `papercut` | layered paper with drop shadows (ocean, night sea, tunnels) | parables of form and boundary |
| `kalighat` | 19th-c. Calcutta Kalighat pat: one sweeping ink line, flat colour | people and scenes, Naren's framing |
| `chart` | parchment ship's chart with a route, dots and a ship's log | journeys, places, dates |

Each segment should run at least 20–30 s. The Kalighat ink-line wipe between chapters and the style-coloured timeline are built into the player.

## 4. Write the script
For each film, `studio/series/<slug>/filmN/script.json`:
```json
{"title": "...", "chapters": [{"id": "open", "title": "...", "style": "kalighat", "src": "Source name", "lines": ["One beat per line.", "..."]}]}
```
- One line = one visual beat. Keep it terse, 3–6 lines per chapter.
- TTS spelling: write numbers in words ("eighteen eighty-one"), and avoid past-tense "read" (use "studied" or "would read"). Captions show the text as written; the player's `disp()` maps "eighteen eighty-one" to "1881", "Maya" to "Māyā" and "Muller" to "Müller", so add mappings there for new terms.
- New Sanskrit or foreign names: add IPA to the `IPA` table in `studio/tts.py`. Check espeak first:
  `LD_LIBRARY_PATH=/tmp/tts/piper /tmp/tts/piper/espeak-ng --path=/tmp/tts/piper/espeak-ng-data -q --ipa -v en-us "Word"`

## 5. Record narration (slow: about 2.5× real time on 2 CPUs; always run in the background)
```sh
cd studio/series/<slug>/filmN
nohup sh -c 'python3 -u ../../../tts.py script.json out af_heart 0.92 > tts.log 2>&1 && ffmpeg -y -loglevel error -i out/narration.wav -c:a libmp3lame -b:a 80k -ac 1 out/narration.mp3' >/dev/null 2>&1 &
```
Never use `pkill -f` with a pattern that matches your own shell command; it kills the shell. `out/timings.json` gives each line's start and end. The scene functions read beat times from it.

## 6. Animate: `filmN/scenes.js`
```js
const SC={};
SC.open=(c,t,B)=>{ paper(c); /* t = seconds since chapter start; B[i] = start of line i */ 
  person(c,320,300,.95,ease(seg(t,0,2.8)),seg(t,2.4,3.8),{shawl:'#34477e',book:true,bookLabel:'KANT'});
  txt(c,'Calcutta',480,120,`600 40px ${DISP}`,INK,'center',P(t,B,1,1));   // P(t,B,i,dur,offset): eased 0..1 from beat i
  heading(c,1,'Chapter title','kalighat',false); fig(c,'','Source',false); };
```
- Canvas is 960×540. Keep the heading area (x 36–300, y < 80) clear. `fig()` writes at y = 526. Captions sit under the stage, not on the canvas.
- Lantern screens are centred at (640, 262) with R = 190. Put lantern text at y 476–502.
- `lib.js` provides:
  - Text and layout: `txt`, `heading`, `fig`, `P`, `seg`, `ease`, `lerp`, `hexm`.
  - Grounds: `paper`, `grid(c, light)`, `parchment`, `wood`.
  - Figures and shapes: `person` (Kalighat seated figure, with options shawl, dhoti, skin, beard, book, bookLabel, look), `bricks`, `cloud`, `arrow`, `leaf`, `strike`.
  - Paper-cut: `waves`, `waveY`, `tag`.
  - Lantern: `lanternRig(c, t, screenFn)`, `slide`, `worldPicture`.
  - Font constants: `DISP`, `MONO`, `DEV` (Devanagari), `ARAB` (Persian), `BODY`, `INK`, `STY`.
- More helpers to copy from the kant-vedanta scenes:
  - film1: `kanizsa`, `lensRow`, `xbox`, `shadowScene`.
  - film2: `standing`, `balance`, `twilight`.
  - film3: `turban`, `mkproj`, `qcurve`, `cdot`, `chartGrid`, `rose`, `polyAlong`, `INDIA` coastline.

## 7. Build, check, publish
1. `python3 studio/build.py studio/series/<slug> artifact filmN` writes `filmN/build/index.html` and `narration.mp3`.
2. `python3 studio/sheet.py <abs path to build/index.html> sheet.png` renders a contact sheet of every beat plus each transition. Look at it once, fix overlaps and clipped labels, then rebuild. (Google Fonts are blocked in the headless check, so fallback fonts are normal.)
3. Publish with the Artifact tool: `file_path` = build/index.html, `files` = {"narration.mp3": <path>}, `icon` = "film". Put the returned URL in `series.json` as `artifact`, then rebuild and republish so the films link to each other.

## 8. Deploy to GitHub Pages
1. In `series.json`, set `site_path` to the series slug (the Kant films live at the root for historical reasons).
2. `python3 studio/build.py studio/series/<slug> site` writes `<slug>/filmN/`.
3. Write `<slug>/index.html` as the series landing page (copy the root `index.html` design). Capture posters with a frame from each film (`window.__film.frame(T)`, then `canvas.toDataURL`). Add a link to the new series on the root `index.html`.
4. Commit (keep `out/timings.json` and `out/narration.mp3`; `.wav` and `build/` are ignored), then `git push`. Pages updates in about a minute.

## 9. Series-level direction (hooks used by "From Colombo to Almora")
- `<series>/common.js` is prepended to every film's `scenes.js`. It can redefine the look for a whole series.
- `QUOTE(c, text, lt, dur, ch, i)`: if defined, every script line written as `{"q": "..."}` is drawn by it instead of the chapter scene, from the line's start until the next line starts. Colombo to Almora uses it for full-frame kinetic type of the speaker's exact words.
- `TRANSITION(ctx, T, k, n, drawScene, CH)`: if defined, replaces the Kalighat ink wipe between chapters. Colombo to Almora flies through a yantra into the next chapter.
- A series may replace the chapter style keys by mutating `STY` (it is a const object). Colombo to Almora uses the Holo-Chart modes: `map` (3D chart flight), `panel` (data panel), `signal` (transmission: scripture and Sanskrit decoded), `sim` (simulation: parables and processes), `dossier` (people and scenes), `alert` (violence, persecution).
- Narration is one voice (`af_heart`, 0.92). Quotes are still marked `{"q": ...}` so captions and the quote layer can treat them differently.

## 10. Whiteboard mural direction (From Colombo to Almora, from Film 1 v3)
- Style reference: hand-drawn whiteboard explainers. One continuous mural per chapter; ink outlines, then cross-hatching from a tone map, then marker colour; camera pans right; pull-back at chapter end; clean board between chapters. No hand in shot, no full-frame quote type.
- `<series>/common.js` holds the engine: `Scene` builder (`S` shaded shape, `L` line, `T` lettering, `G` glow, `A` traced asset), `compileScene` (tone map → hatching), `muralScene(id)`, `stack()` lettering blocks, `wash()` pastel glows, and the object library.
- `filmN/scenes.js`: `MURAL.<chapterId>=[pn(lineIndex, S=>{...}), ...]`, then `SC[id]=muralScene(id)`. One hero drawing per panel, satellites around it, one `stack()` of lettering in clear space.
- Portraits: `python3 studio/trace.py <public-domain photo> <series>/assets/<name>.json [--no-colour] [--height N]`; build.py embeds `assets/*.json` as `ASSETS`; place with `S.A(name,x,y,scale,{mono})`.
- Check with a completion contact sheet (each panel just before its pan, plus the pull-back), not the beat sheet.

## 11. Watercolour mural and Hindu motifs (Film 1 v4 onward)
- Paint mode replaces hatching: `MSTYLE='water'` (layered washes on paper texture). Each object sketches its outline, then floods with colour by sweep, bloom or drop. Aim for 20 to 50 narration objects per panel; use the clusters (`skyset`, `harbour`, `village`, `battlefield`, `templeTown`, `crowdRows`, `flowers`).
- Panels are 960 apart (`PW=960`) so nothing bleeds between them.
- Where India is the subject, call `IN(S)` first (a temple-border band across the top, which joins up panel to panel like a sari border) and start lettering at y=30. Then draw from the Hindu motif library in common.js: `om`, `kalash`, `toran`, `marigolds`, `rangoli`, `bell`, `samai` (brass lamp), `peacock`, `elephant({umbrella})`, `nandi`, `tulsi`, `chakra`, `sriYantra`, `kamandalu`, `shikhara`, `dhwaja`, `parasol`, `veena`, `havan`, `mala`, `ghat`, `kumbamBand`, plus the older `diya`, `lotus`, `gopuram`, `lingam`, `trident`, `conch`, `palmleaf`, `banyan`. Keep Western and world scenes free of them, so the contrast reads.
