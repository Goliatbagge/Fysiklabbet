# Bygginstruktion: visualiseringsmodul (för subagenter)

Du bygger EN interaktiv matematikvisualisering ("aha-maskin") för
Fysiklabbets katalog. Läs detta dokument noga och följ det exakt.

## Steg 0 — läs referenserna FÖRST

1. **`data/visualiseringar/ma3c-2.3.js`** — pilotmodulen ("Sekanten blir
   tangent"). Din modul ska följa SAMMA mönster: IIFE, hjälpfunktioner,
   DOM-skelett, steg-pills, legend, update()-omritning, mount/destroy-API.
   Kopiera gärna hjälpfunktionerna (fmt, fmtTex, fmtDisp, svgEl, svgVarText,
   katexInto, clampNum, COL) rakt av — modulen ska vara självförsörjande.
2. **Teorigenomgångarna** för dina avsnitt (anges i din uppgift) i
   `data/teori/*.md` — beteckningar, formelskrivning och exempel ska
   speglas EXAKT (synk-regeln i CLAUDE.md). Låt gärna startläget motsvara
   ett exempel ur genomgången så eleven kan "spela upp" det.

## Kontrakt (MÅSTE följas)

- **En fil**: `data/visualiseringar/<primärt-teori-id>.js` (t.ex.
  `ma2c-2.1.js`). Ren vanilla JS + SVG, ingen React, inga externa beroenden
  utöver `window.katex` (finns redan på sidan).
- **API**: filen slutar med
  ```js
  window.VISUALISERINGAR = window.VISUALISERINGAR || {};
  var api = { mount: mount };
  window.VISUALISERINGAR['<id1>'] = api;   // alla teori-id din uppgift anger
  ```
  `mount(el)` bygger allt inuti `el` och returnerar `{ destroy() }` som
  avbryter ev. `requestAnimationFrame`/timers och tömmer `el`.
- **Rör INGA delade filer**: inte `data/visualiseringar/index.js`, inte
  `katalog.html`, inte `styles-laborans.css`, inte andra moduler, inte
  `.shots/vis-runner.html`. Huvudsessionen kopplar in manifestet.
  Behöver du specialstil: sätt inline-styles i JS (sparsamt).

## Tillgängliga CSS-klasser (styla ALDRIG om dem)

Kort/scen: `lab-graf-card` (+ `lab-vis` på samma div), `lab-graf-title`,
`lab-graf-scene lab-vis-scene` (max 560 px), `lab-graf-svg` (skalar 100 %).
Kontroller: `lab-graf-controls`, `lab-graf-row`, `lab-graf-lbl` (med `<em>`
för variabelnamnet), `lab-graf-slider`, `lab-graf-num`, `lab-graf-foot`,
`lab-graf-check`, `lab-graf-reset`, `lab-btn`.
Visualiserings-skalet: `lab-vis-steps` + `lab-vis-step` (+ `.active`),
`lab-vis-instr`, `lab-vis-legend` (+ inre `span.swatch` med
`style.borderTopColor`), `lab-vis-formel` (KaTeX-rad, scrollar själv om
den blir för bred), `lab-vis-note`, `lab-vis-actions`.

## Designspråk

- **Scen-SVG**: `viewBox 0 0 560 H` (H efter behov, ~380–420 för huvudscen).
  Marginaler ca L=46, R=16, T=14, B=36. Rita eget rutnät/axlar som piloten
  (färger i `COL`). Kurvor `stroke-width` 2–2.4.
- **Färger**: `COL = { grid: 'rgba(31,37,48,0.08)', axis: '#1f2530',
  tick: '#5b6472', curve: '#2563c9' (blå), secant/positiv: '#4a7d3a' (grön),
  tangent/accent: '#c8324a' (röd), dash: 'rgba(31,37,48,0.45)',
  track: 'rgba(15,22,32,0.22)' }`. Färgkoppla formel ↔ linje: en formelrad
  som beskriver den gröna linjen är grön osv.
- **Steg-pills** (`lab-vis-steps`): 2–4 steg som bygger upp konceptet
  lagervis, med `lab-vis-instr`-text per steg (innerHTML, variabler i
  `<em>`). Senare steg behåller tidigare lager där det är logiskt.
- **Interaktion**: dragbara SVG-objekt (pointerdown/move/up +
  setPointerCapture, osynlig träffcirkel r≈16) FRAMFÖR enbart glidare;
  glidare/sifferfält som komplement (mönstret `makeRow` i piloten).
  Gissa-först-moment där det passar. Animationsknappar via rAF — avbryt
  vid användarinteraktion och i destroy().
- **Live-formler**: KaTeX via `katexInto(div, tex)` med aktuella värden
  insatta (`fmtTex`, decimalkomma `{,}`). `\lim\limits_{...}` för lim.

## Typografi (hårda regler ur CLAUDE.md)

- Svenska, decimalKOMMA överallt (fmt-helpern). Exakt/avrundat noll → `0`.
- Variabler kursiva ÄVEN i SVG: `<tspan font-style="italic">` via
  `svgVarText(attrs, ['*f', '(', '*x', ')'])` — `*`-prefix = kursiv del.
  Mätetal och enheter ALDRIG kursiva.
- ALDRIG title case ("Visa mönstret", inte "Visa Mönstret").
- INGA emojis eller dekorativa piktogram. Riktig notation (·, °, →, π) OK.
- ALDRIG vit kontur/halo runt text/pilar på ljus bakgrund.
- Etiketter ALDRIG ovanpå linjer/kurvor/objekt — flytta till fri yta
  (beräkna kollisioner numeriskt, inte på ögonmått). Vinkeletikett på
  bisektrisen utanför bågen; vinkelbågens medelpunkt i hörnet, rätt
  sweep-flagga (se CLAUDE.md "Geometrifigurer" om din figur har vinklar).
- Unicode-superscript är OK i SVG-text för enkla potenser (x², 10³) men
  aldrig i löptext/KaTeX-sammanhang.

## Testning (obligatorisk — ingen modul är klar utan skärmdumpar)

Dev-servern ska svara på `http://localhost:8000` (kolla med curl; om inte:
starta `python .claude/dev-server.py 8000` i bakgrunden — ALDRIG
`python -m http.server`).

Montera din modul fristående med testrunnern:

```
http://localhost:8000/.shots/vis-runner.html?id=<teori-id>&step=N
```

Runner-parametrar: `step=N` (klicka steg-pill N), `sliders=v0,v1,…` eller
`s0=…&s1=…` (sätt glidare per index), `sweep=1` (svep glidare 0),
`checks=1` (bocka alla kryssrutor), `press=Text` (klicka knapp vars text
innehåller Text), `debug=1` (breddmätningar).

Skärmdump (Bash):
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=820,1400 \
  --virtual-time-budget=8000 \
  --screenshot="C:\\claude\\Fysiklabbet\\.shots\\<modul>-steg1.png" \
  "http://localhost:8000/.shots/vis-runner.html?id=<id>&step=1"
```

**OBS:** headless Chrome har MINSTA fönsterbredd 500 px — en smalare
`--window-size` beskär bara bilden (ser ut som overflow men är det inte).
Verifiera smal skärm vid 500 px, inte 420.

Ta skärmdump av VARJE steg (med representativa glidarlägen, inklusive
extremlägen) och GRANSKA bilderna mot checklistan:

1. Inga texter utanför viewBox/kortet; inga klippta glyfer.
2. Inga texter på linjer/kurvor/andra figurdelar — i NÅGOT glidarläge
   (testa extremvärden!).
3. Inga texter som överlappar varandra.
4. Formler: decimalkomma, kursiva variabler, raka mätetal/enheter,
   korrekt matematik i alla lägen.
5. Ingen vit kontur/halo.
6. Rutnät/axlar/pilspetsar som i piloten; axeletiketter kursiva x/y inom
   ramen.
7. Interaktionen fungerar: kolla att steg-pillsen växlar innehåll och att
   glidarna faktiskt uppdaterar scenen (syns i skärmdumparna med olika
   värden).

Iterera tills ALLA punkter passerar. Kör också `node --check <din fil>`.

## Rapport (ditt slutmeddelande)

Kort på svenska: filnamn, vilka teori-id som registrerats, stegen och vad
de visar, vilka skärmdumpar som finns i `.shots/` (filnamn), kända
begränsningar. Föreslå kort-titel (max ~30 tecken) och en beskrivningsmening
för manifestet. INGEN kod i rapporten.
