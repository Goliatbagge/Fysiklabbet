# Plan: Matematik fortsättning nivå 2 (Ma4) i Fysiklabbet

**Mål:** Lägga in kursen **Matematik fortsättning nivå 2** (= Ma4) som fjärde
kurs under ämnet Matematik i katalogen, med **Teori, Övningar och Exit
ticket** per avsnitt — byggt från den samlade genomgångs-PDF:en
`Genomgångar/Matematik fortsättning nivå 2/Alla genomgångar - Matematik 4.pdf`
(139 sidor, en enda fil). **Ingen simulering** för matte (sim-kortet renderas
inte för matteämnet). Samma upplägg som [Matematik nivå 1c]
(`.claude/matematik-plan.md`), [Matematik nivå 2c]
(`.claude/matematik-2c-plan.md`) och [Matematik fortsättning nivå 1c]
(`.claude/matematik-3c-plan.md`) — alla deras beslut gäller om inget annat
sägs här.

**Status/återupptagning:** Checklistorna (fas-status + avsnittstabellen) är
sanningskällan. Vid avbrott: läs denna fil, hitta första obockade rutan i
avsnittstabellen (kolumnerna T/Ö/E/K), fortsätt där. Committa endast när
användaren ber om det.

---

## Arkitekturbeslut

1. **Kurskod `ma4`.** ID-konvention `ma4-K.A`, teorifiler
   `data/teori/ma4-K.A.md`. Frontmatter: `course: Matematik fortsättning
   nivå 2`, `chapter`, `chapterNumber`, `section`. (OBS: koden har inget
   avslutande "c" — Ma4 saknar spårvariant i gymnasiet. Detta påverkar
   verify-figur-bounds-regexen, se fas 0.)
2. **Kursens label i katalogen:** `Matematik fortsättning nivå 2`.
3. **PDF-rendering (KLAR):** hela PDF:en renderad till PNG i scratchpad
   `<scratch>/ma4-pdf/p-001.png` … `p-139.png` (`pdftoppm -png -r 90`).
   Textlager extraherat till `<scratch>/ma4.txt` (latin-1). Sidmappningen i
   avsnittstabellen nedan är verifierad mot textlagrets sidrubriker.
   `<scratch>` =
   `C:\Users\sam_s\AppData\Local\Temp\claude\C--claude-Fysiklabbet\5545a689-2548-4f92-9c96-cc740e8b2767\scratchpad`.
   Om scratchpad rensats: kör om `pdftoppm`/`pdftotext` (kommandon i loggen).
4. **48 avsnitt i 4 kapitel** (se tabell). Ett avsnitt (1.16
   Repetitionslektioner) saknar egen PDF-genomgång — se "Öppen fråga".
5. **Interaktiva grafer (`::: graf`)** obligatoriskt där avsnittet handlar om
   parameter → grafens utseende. Kapitel 1 är graf-tungt: 1.10, 1.11, 1.12,
   1.13, 1.14 är starka kandidater (sin/cos/tan-funktioner, amplitud/period,
   förskjutning). graf.js stöder `sin cos tan`. Bedöm även 2.11/2.12/2.14
   (kurvor/asymptoter). Se "graf-kolumn" i tabellen (G).
6. **Katalogen fylls inkrementellt** — avsnitt in i `data/katalog.js` först
   när teori + övningar + exit ticket finns (annars faller
   verify-exittickets). Kapitelobjekt skapas vid första avsnittet i kapitlet.
7. **TTS batchas sist** (fas 6). `node data/tts/build-manus.js` +
   `py -3.12 data/tts/generate-audio.py` (dev-server på port 8000).
   Inkrementellt. Kontrollera att export-manus.html plockar upp ma4 ur
   bundeln (bör ske automatiskt). Kap 4 (komplexa tal) har ovanlig notation
   (i, arg, |z|, ∠) → granska manus-lib.js-uttalet: `i` som imaginär enhet,
   `\cdot`, potenser, `e^{i\theta}`. Utöka manus-lib vid behov.
8. **Heredoc-fällan:** skriv md-filer med Write-verktyget. JS-strängar i
   ovningar.js/exittickets.js: dubbla alla backslash.
9. **sed-fällan (från ma3c):** använd ALLTID Python (inte `sed`) för
   textersättningar i md/JS — `sed` i Git Bash korrumperade `\degree`.
   KaTeX saknar `\degree` → skriv `^\circ`.

## Kodändringar för infrastrukturen (fas 0)

- [x] Läs av alla touch-points (KLART — lista nedan)
- [x] `data/katalog.js`: kurs `'Matematik fortsättning nivå 2'` (label +
  intro + `chapters`) tillagd efter ma3c-objektet. Kapitel 1 "Trigonometri"
  + avsnitt 1.1 inlagt.
- [x] `katalog.html`: `courseCode()` +ma4, `HASH_COURSES` +ma4, hash-regex
  `(fy1|fy2|ma1c|ma2c|ma3c|ma4)`, Ämne-dropdown `#ma4`.
- [x] `.claude/verify-exittickets.js`: mappning `'Matematik fortsättning
  nivå 2'` → `'ma4'`.
- [x] `.claude/verify-figur-bounds.js`: regex utökad till
  `/^(fy\d|ma\dc|ma4)-.*\.md$/`.
- [x] `avsnitt.html`: Ämne-dropdown-länk `#ma4`.
- [ ] Övriga ~82 HTML-filer med Ämne-dropdown: `#ma4`-länk läggs till i
  fas 7 (Python-massredigering, verify-navigation grön efteråt).
- [x] Pilot: ma4-1.1 helt byggd (T+Ö+E+K) och browserverifierad i
  katalog.html (`#ma4-1.1:teori`) — breadcrumb, flikar, figur och formelkort
  renderar rätt. Skärmdump `.shots/ma4-1.1-teori.png`.

Verifierare som redan täcker ma4 utan ändring: `verify-vinkelbagar.js`
(substring-filter), `verify-no-white-outline.js` (skannar alla),
`data/teori/build.js` (uprightSubscripts + graf-skydd är id-agnostiskt).

## Arbetsgång per avsnitt

Läs avsnittets PDF-sidor (PNG i `<scratch>/ma4-pdf/`) → teori-md
(formel/tips/härledning/exempel-block, `::: graf` där relevant, inline-SVG-
figurer med tät viewBox, korrekt typografi: kursiva variabler, `^\circ`,
NBSP/math-block, `F_G`-stil ej relevant men subscript-regler gäller) →
övningar 3 N1 + 2 N2 + 1 N3 i `data/ovningar.js` (nyckel = `ma4-K.A`) →
exit ticket 5 frågor i `data/exittickets.js` → katalogpost i `data/katalog.js`
→ `node data/teori/build.js` + verifierare (exittickets, figur-bounds,
vinkelbagar, no-white-outline) + skärmdump av ev. figurer.

**Notera för Ma4:** mycket få klassiska geometrifigurer; däremot enhets-
cirkel-figurer (kap 1), komplexa talplanet/visare (kap 4) och funktions-
grafer. Enhetscirkel + argand-diagram ritas som inline-SVG med beräknade
koordinater (samma disciplin som geometrifigurerna: rita från cos/sin, inga
ögonmått). Argand-diagram: reell axel vågrät, imaginär lodrät, visare från
origo, `Re`/`Im`-etiketter i fri yta.

## Kapitel- och avsnittsstruktur (48 avsnitt, 139 sidor)

Chapter-titlar (sajtens): Kap1 **Trigonometri**, Kap2 **Derivata**,
Kap3 **Integraler**, Kap4 **Komplexa tal**.

Kolumner: T=Teori, Ö=Övningar, E=Exit ticket, K=Katalogpost,
G=graf-kandidat (`::: graf`).

### Kapitel 1 — Trigonometri (16 avsnitt)
| id | Titel | Sidor | G | T | Ö | E | K |
|---|---|---|---|---|---|---|---|
| ma4-1.1 | Trigonometri i rätvinkliga trianglar | 1–2 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.2 | Enhetscirkeln | 3–6 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.3 | Lösa trigonometriska ekvationer | 7–8 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.4 | Mer om trigonometriska ekvationer | 9–10 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.5 | Radianer | 11–14 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.6 | Samband mellan vinklar i enhetscirkeln | 15–17 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.7 | Trigonometriska ettan | 18–19 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.8 | Additions- och subtraktionsformler | 20–22 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.9 | Formler och trigonometriska ekvationer | 23–25 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-1.10 | Sinus- och cosinusfunktionen | 26–28 | ★ | ☑ | ☑ | ☑ | ☑ |
| ma4-1.11 | Amplitud och period | 29–31 | ★ | ☑ | ☑ | ☑ | ☑ |
| ma4-1.12 | Förskjutning i x- och y-led | 32–34 | ★ | ☑ | ☑ | ☑ | ☑ |
| ma4-1.13 | Grafen till y = tan x | 35–36 | ★ | ☑ | ☑ | ☑ | ☑ |
| ma4-1.14 | Grafen till y = a sin x + b cos x | 37–39 | ★ | ☑ | ☑ | ☑ | ☑ |
| ma4-1.15 | Tillämpningar av trigonometriska funktioner | 40–41 | ○ | ☑ | ☑ | ☑ | ☑ |

**1.16 Repetitionslektioner byggs INTE som eget avsnitt.** Per användaren:
dess repetitionsinnehåll/tips (vanliga/exakta trigonometriska värden — 0°,
30°, 45°, 60°, 90° och deras sin/cos/tan) vävs in i det tidigare avsnitt där
dessa värden hör hemma. Naturlig plats: **1.2 Enhetscirkeln** (där de exakta
värdena etableras på enhetscirkeln), alternativt 1.1 (som redan är
"Repetition från Matematik 1c"). Lägg en tydlig värdetabell + minnesknep där.
Kapitel 1 blir därmed 15 byggda avsnitt (1.1–1.15).

### Kapitel 2 — Derivata (14 avsnitt)
| id | Titel | Sidor | G | T | Ö | E | K |
|---|---|---|---|---|---|---|---|
| ma4-2.1 | Derivatans definition och deriveringsregler | 42–44 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.2 | Tolkningar av derivata | 45–46 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.3 | Derivatan av sammansatta funktioner och kedjeregeln | 47–49 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.4 | Tillämpningar av kedjeregeln | 50–51 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.5 | Derivatan av sin x och cos x | 52–53 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.6 | Derivatan av exponential- och logaritmfunktioner | 54–56 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.7 | Produktregeln och kvotregeln | 57–59 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.8 | Tillämpningar med digitala verktyg | 60–61 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.9 | Extremvärdesproblem (repetition) | 62–65 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-2.10 | Extremvärdesproblem med digitala hjälpmedel | 66–67 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-2.11 | Kurvkonstruktion med derivata | 68–70 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-2.12 | Vertikala och horisontella asymptoter | 71–73 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-2.13 | Sneda asymptoter | 74–75 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-2.14 | Kurvritning med hjälp av asymptoter | 76–78 | ○ | ☑ | ☑ | ☑ | ☑ |

### Kapitel 3 — Integraler (8 avsnitt)
| id | Titel | Sidor | G | T | Ö | E | K |
|---|---|---|---|---|---|---|---|
| ma4-3.1 | Primitiva funktioner | 79–82 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-3.2 | Areaberäkning med integraler | 83–85 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-3.3 | Räkneregler för integraler | 86–88 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-3.4 | Arean mellan två kurvor | 89–92 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-3.5 | Beräkning av storheter med integraler | 93–95 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-3.6 | Täthetsfunktioner | 96–99 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-3.7 | Rotationskroppar | 100–102 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-3.8 | Mer om rotationskroppar (rotation kring y-axeln) | 103–106 | – | ☑ | ☑ | ☑ | ☑ |

### Kapitel 4 — Komplexa tal (10 avsnitt)
| id | Titel | Sidor | G | T | Ö | E | K |
|---|---|---|---|---|---|---|---|
| ma4-4.1 | Imaginära och komplexa tal | 107–109 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.2 | Beräkningar med komplexa tal | 110–112 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.3 | Andragradsekvationer med komplexa rötter | 113–115 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.4 | Polynomekvationer av högre grad och polynomdivision | 116–119 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.5 | Komplexa tal som punkter och visare | 120–121 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-4.6 | Polär form | 122–126 | ○ | ☑ | ☑ | ☑ | ☑ |
| ma4-4.7 | Multiplikation och division i polär form | 127–129 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.8 | Potenser av komplexa tal och de Moivres formel | 130–131 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.9 | Ekvationen zⁿ = w | 132–135 | – | ☑ | ☑ | ☑ | ☑ |
| ma4-4.10 | Eulers formel och talet eᶻ | 136–139 | – | ☑ | ☑ | ☑ | ☑ |

G-legend: ★ = interaktiv `::: graf` obligatorisk, ○ = bedöm (figur kan räcka),
– = ingen graf.

## Beslutade frågor

**1.16 Repetitionslektioner:** BESLUTAT (användaren) — bygg inte som eget
avsnitt. Väv in de vanliga/exakta trigonometriska värdena i 1.2 Enhetscirkeln
(se not i kap 1-tabellen). Kursen får **47 byggda avsnitt** totalt.

## Faser — STATUS

- **Fas 0 — infrastruktur:** ☑ KLAR — all kod ändrad, alla verifierare
  gröna, pilot ma4-1.1 browserverifierad. (Kvar från fas 0: navbar-massinsats
  i övriga HTML-filer, görs i fas 7.)
- **Fas 1 — Kapitel 1 (Trigonometri, 15 avsnitt):** ☑ KLAR — alla 15
  avsnitt (teori + 6 övn + exit ticket + katalogpost) byggda med parallella
  subagenter, mergade och verifierade. Figurer skärmdumpsgranskade (1.2, 1.8,
  1.11). 5 interaktiva grafer (1.10–1.14). Alla verifierare gröna.
- **Fas 2 — Kapitel 2 (Derivata, 14 avsnitt):** ☑ KLAR — alla 14 avsnitt byggda med parallella subagenter (v2-spec, egen staging-fil), mergade och verifierade. Figurer (2.1 sekant, 2.2 tangent, 2.5 sin/cos, 2.9 hästhage, 2.10 K(t)) + grafer (2.11, 2.12). Alla verifierare gröna.
- **Fas 3 — Kapitel 3 (Integraler, 8 avsnitt):** ☑ KLAR — 8 avsnitt byggda parallellt, mergade och verifierade (figurer: shaded-area 3.2/3.4, täthet 3.6, rotationskroppar 3.7/3.8). OBS: chapter-label krock — ma3c har också en Integraler-kapitel; merge_chapter.py scopar nu till ma4-kursen. Alla verifierare gröna.
- **Fas 4 — Kapitel 4 (Komplexa tal, 10 avsnitt):** ☑ KLAR — 10 avsnitt byggda parallellt, mergade (course-scoped) och verifierade. Argand-diagram (4.5, 4.6, 4.9, 4.10). Alla verifierare gröna. ALLA 47 AVSNITT KLARA.
- **Fas 5 — grafer/figurer-genomgång:** ☑ KLAR — alla figurer verifierade (figur-bounds 430, vinkelbagar, no-white-outline gröna) + skärmdumps-stickprov över alla 4 kapitel. (verifiera alla `::: graf` + SVG
  renderar rätt; skärmdumpsstickprov)
- **Fas 6 — TTS:** ☑ KLAR — manus byggt (297 avsnitt totalt) och ljud genererat för alla 47 ma4-avsnitt (audio/tts/teori/ma4-*.mp3). manus-lib EJ ändrad (|z| läses som tysta pipes, acceptabelt). (`build-manus.js` + `generate-audio.py`; utöka
  manus-lib.js för komplex-tal-notation vid behov)
- **Fas 7 — avslut:** ☑ KLAR — #ma4 i 82 navbars (verify-navigation grön), index.html (dropdown + kursknapp + "Senaste uppdateringar"-post), MEMORY uppdaterad. **ALLT KLART — commit/push på begäran.** Efterjustering 2026-07-10: 1.2 enhetscirkel-viewBox + y-etikett + trasigt minnesknep (inline-math radbrytning) fixat i 1.2/2.1/3.1; ny CLAUDE.md-regel + [[feedback_inline_math_och_figurklipp]]. (`#ma4` i alla navbars via Python-massinsättning →
  verify-navigation grön; index.html: kursknapp + dropdown + intro-text +
  "Senaste uppdateringar"-post; alla verifierare gröna; skärmdumps-stickprov;
  MEMORY.md-post). **Commit/push endast på användarens begäran.**

## Kommandon (repris)

```bash
# PDF (redan gjort — kör om vid behov):
pdftotext "Genomgångar/Matematik fortsättning nivå 2/Alla genomgångar - Matematik 4.pdf" <scratch>/ma4.txt
pdftoppm -png -r 90 "Genomgångar/.../Alla genomgångar - Matematik 4.pdf" <scratch>/ma4-pdf/p

# Efter varje avsnitt:
node data/teori/build.js
node .claude/verify-exittickets.js
node .claude/verify-figur-bounds.js
node .claude/verify-vinkelbagar.js
node .claude/verify-no-white-outline.js

# Dev-server (för browserverifiering + TTS):
python .claude/dev-server.py 8000

# TTS (fas 6):
node data/tts/build-manus.js
py -3.12 data/tts/generate-audio.py
```
