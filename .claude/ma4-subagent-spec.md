# Ma4 subagent-spec — bygg ETT avsnitt i Matematik fortsättning nivå 2

Du bygger ett (1) avsnitt i matematikkursen **Matematik fortsättning nivå 2**
(kurskod `ma4`) för sajten Fysiklabbet. Din prompt anger avsnittets id, titel,
PDF-sidor och ev. specialnoteringar. Följ denna spec EXAKT.

## Källa (läs FÖRST)

- **PDF-sidor som PNG:** `<SCRATCH>/ma4-pdf/p-0NN.png` där NN = sidnummer.
  `<SCRATCH>` =
  `C:\Users\sam_s\AppData\Local\Temp\claude\C--claude-Fysiklabbet\5545a689-2548-4f92-9c96-cc740e8b2767\scratchpad`
  Läs varje tilldelad sida med Read-verktyget (bild). Innehållet i din md ska
  spegla genomgången: samma begrepp, samma exempel, samma beteckningar.
- **Formatmallar (läs som facit för struktur/typografi):**
  - Teori-md: `data/teori/ma4-1.1.md`
  - Övningar: blocket `'ma4-1.1'` i `data/ovningar.js`
  - Exit ticket: blocket `'ma4-1.1'` i `data/exittickets.js`
  - Katalogpost: avsnitt `1.1` i `data/katalog.js` (kursen "Matematik
    fortsättning nivå 2", kapitlet "Trigonometri")
- **Fler exempel** på trig-avsnitt finns i `data/teori/ma3c-6.*.md` och
  `data/teori/ma3c-3.4.md` (ett `::: graf`-exempel) — titta vid behov.

## Vad du LEVERERAR

1. **Skriv filen** `data/teori/ma4-<id>.md` (unik fil — ingen konflikt).
2. **Returnera** (som din slutliga text, inget annat) tre block i EXAKT detta
   format, med avdelarna på egna rader:

```
===OVNINGAR===
    'ma4-<id>': [
        ... (hela arrayen, indenterad med 4/8/12 mellanslag som i ma4-1.1) ...
    ],
===EXITTICKET===
'ma4-<id>': [
  ... (hela arrayen, indenterad med 2 mellanslag som i ma4-1.1) ...
],
===KATALOG===
              { num: '<num>', title: '<titel>', description: '<beskrivning>', href: null, icon: null, keywords: [ ... ] },
===END===
```

Returnera INGET annat än din korta kvittens + dessa block. Skriv en mening
om ev. figurer du gjort och att du screenshot-verifierat dem.

## FÖRBJUDET

- **Rör INTE** `data/ovningar.js`, `data/exittickets.js`, `data/katalog.js`,
  `data/teori/bundle.js`. Kör INTE `node data/teori/build.js` (huvudprocessen
  bygger och merge:ar). Du skriver BARA din egen `.md` + returnerar text.
- **Inga emojis / dekorativa piktogram** någonstans. Ren textrubrik är
  förstahandsval. (Matematiska tecken → ⟂ · × ≈ ≤ ≥ ± ° ′ ″ och grekiska
  bokstäver är OK, det är notation, inte emoji.)

## Teori-md — struktur

Frontmatter (byt ut värdena):
```
---
id: ma4-<id>
title: <titel>
course: Matematik fortsättning nivå 2
chapter: Trigonometri
chapterNumber: 1
section: '<num>'
---

# <titel>

<brödtext ...>
```

Block du kan använda (se ma4-1.1.md för exakt syntax):
- `::: formel "Rubrik"` … `:::` — formelkort. Får innehålla `::: figur` och
  `$$…$$`-block.
- `::: exempel "Exempel 1 — kort beskrivning"` … `:::` — genomräknat exempel.
  Avsluta med `**Svar:** …`. Frågestammen i fetstil.
- `::: figur` `<svg …></svg>` `:::` — inline-SVG-figur (se figur-reglerna).
- `::: graf` … `:::` — interaktiv grafritare (BARA om din prompt säger så, se
  nedan).

Skriv 1–3 korta brödtextstycken som förklarar begreppet, sedan formelkort,
sedan 2–3 exempel som speglar PDF:ens exempel. Håll det pedagogiskt och sobert.

## Typografi (KRITISKT — bryts detta ser det fel ut)

- **Svenska. Kommatecken som decimal:** `5,0` inte `5.0`. Aldrig title case
  ("Trigonometriska ekvationer", inte "Trigonometriska Ekvationer").
- **Variabler kursiv, enheter/tal rakt.** I md/KaTeX blir `$v$`, `$x$`, `$a$`
  automatiskt kursiva. I löptext skriv variabler i math: `$v$`, `$x$`.
- **Grader:** skriv `^\circ` i KaTeX (t.ex. `41^\circ`), ALDRIG `\degree`.
  I ren brödtext utanför math går unicode `°` bra (`41°`).
- **Värde + enhet + variabel = math-block:** `$v = 5{,}0\ \mathrm{cm}$`,
  `$g = 9{,}82\ \mathrm{N/kg}$`. Decimalkomma i KaTeX skrivs `{,}` → `5{,}0`.
  Aldrig radbrytning mellan beteckning, `=` och värde → pakka i ETT math-block.
- **Raka bråkstreck** via `\frac{}{}` / `\dfrac{}{}`, aldrig `/` mellan
  täljare och nämnare (snedstreck bara i enheter som `m/s`).
- **Multiplikationstecken** `\cdot` skrivs ut mellan faktorer.
- **Exakt noll utan decimaler:** `0`, aldrig `0,0`.
- **NBSP i löptext** för `10 000`, `5 %`, `100 °C` (U+00A0) — eller pakka i
  math.
- **I .md används ENKLA backslash** (`\frac`, `\sin`, `\circ`, `\cdot`).
  **I de returnerade JS-blocken (ovningar/exitticket) DUBBLAS ALLA backslash**
  (`\\frac`, `\\sin`, `\\circ`, `\\cdot`, `\\ `, `\\mathrm`). Detta är den
  vanligaste buggen — kontrollera varje backslash i JS-blocken.

## Figur-regler (inline-SVG)

Rita BARA om avsnittet har en rumslig/geometrisk uppställning (triangel,
enhetscirkel, komplexa talplanet, funktionsgraf som INTE är `::: graf`). Rena
räkneavsnitt behöver ingen figur.

- **Rita från beräknade koordinater** (cos/sin), aldrig på ögonmått.
- **Tät viewBox** utan tom luft i kanterna, men så att inga glyfer klipps.
- **Variabler i SVG-text kursiveras** med `<tspan font-style="italic">v</tspan>`.
  Sätt ALDRIG `font-style="italic"` på ett helt `<text>` som innehåller
  `= värde enhet` (då blir talet också kursivt). Mätetal + enhet rakt.
- **INGEN vit kontur/halo** runt text eller pilar (`stroke="#fff"`,
  `paint-order:stroke`, `text-shadow` i vitt är förbjudet). Mörk bläckfärg
  `#1f2530` för linjer/text på ljus bakgrund räcker.
- **Etiketter aldrig på linjer/objekt** — offsetta ut i fri yta.
- **Enhetscirkel-figur:** rita cirkeln (r i px), x/y-axlar med pilspetsar
  (ljust blå `#38bdf8` axlar ELLER bläck `#1f2530` — följ ma3c-stilen, bläck
  är säkrast), vinkelben från origo, punkt på randen, `v`-båge i origo.
  Koordinater beräknas: punkt = (R·cos v, −R·sin v) i SVG (y nedåt).
- **Verifiera figuren visuellt:** skriv en fristående
  `.shots/ma4-<id>-figN.html` som inlinear din SVG mot en ljus bakgrund
  (`#f2ece0`), skjut en skärmdump och GRANSKA den:
  ```bash
  "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
    --disable-gpu --hide-scrollbars --window-size=700,700 \
    --screenshot="C:/claude/Fysiklabbet/.shots/ma4-<id>-figN.png" \
    "file:///C:/claude/Fysiklabbet/.shots/ma4-<id>-figN.html"
  ```
  Läs PNG:n, kontrollera: inget klipps, inga texter på linjer, variabler
  kursiva, inga vita halor. Rätta tills den är ren.

## `::: graf` (BARA om din prompt säger "GRAF: …")

Interaktiv grafritare. Syntax (se CLAUDE.md-utdrag nedan och `ma3c-3.4.md`):
```
::: graf
titel: y = A \sin(Bx)
uttryck: A*sin(B*x)
ekvation: y = {A}\sin({B}x)
A: 2, -4, 4, 0.5
B: 1, 0.5, 4, 0.5
x: -6.5, 6.5
y: -4.5, 4.5
:::
```
- `uttryck:` maskin-uttryck i `x` + parametrar, `.` som decimal; stöder
  `sin cos tan sqrt abs exp ln log` och `pi`, `e`.
- `ekvation:` KaTeX-mall med `{param}`-platshållare, visas live.
- En rad per parameter: `värde, min, max[, steg]`. Parameternamn = EN bokstav,
  matcha genomgångens beteckningar (A amplitud, B/period, C/D förskjutning).
- `x:`/`y:` startfönster. Sätt så kurvan syns bra.
- Lägg default-värden så de matchar ett exempel i avsnittet.
Efter grafblocket kan brödtext/exempel fortsätta.

## Övningar (returnerat block) — 3 N1 + 2 N2 + 1 N3

Exakt 6 uppgifter, i ordning: tre `level: 1`, två `level: 2`, en `level: 3`.
Se `'ma4-1.1'` i ovningar.js för fälten. Två svarsformat:
- **Flerval:** `choices: [...4 st...], correct: 0,` (rätt svar FÖRST i källan;
  UI:t blandar). Plus `solution`.
- **Numeriskt:** `answer: { value: <tal>, unit: '<enhet>', tol: <tolerans> },`
  Plus `solution`.
- `solution`: formel → insatta värden → beräkning → `**Svar:** …`. Raka bråk.
- **N3 ska kräva en insikt** (ekvationssystem, exakt värde, fälla, stryka
  obekant) — inte bara en lång räknekedja. Se N3 i ma4-1.1.
- Deluppgifter a)/b): `<br>` före "a)", skilj med `&emsp;&emsp;`, inget komma.
- KaTeX i dessa strängar: **DUBBLA backslash**.

## Exit ticket (returnerat block) — 5 frågor

Exakt 5 objekt. Varje: `question`, `choices` (4 st, rätt FÖRST), `correct: 0`,
`why` (4 förklaringar, en per choice i samma ordning). `why[0]` = varför rätt,
övriga = varför fel. Förklaringar får INTE börja med "Rätt!"/"Fel!" (UI:t
sätter etiketten). KaTeX: **DUBBLA backslash**. Se `'ma4-1.1'` i exittickets.js.

## Innan du returnerar — checklista

- [ ] `data/teori/ma4-<id>.md` skriven, frontmatter korrekt.
- [ ] Ev. figur screenshot-verifierad (ren, inga klipp/halor, kursiva var.).
- [ ] Övningar: 3+2+1, rätt svar först, dubbla backslash, N3 kräver insikt.
- [ ] Exit ticket: 5 frågor, 4 why per fråga, dubbla backslash, ingen
      "Rätt!/Fel!"-inledning.
- [ ] Katalog-raden: rätt num/titel, kort beskrivning, 6–10 keywords.
- [ ] Inga emojis. Decimalkomma. `^\circ` för grader i KaTeX.
- [ ] Returnera de tre blocken i `===OVNINGAR===/===EXITTICKET===/===KATALOG===/===END===`-format.
