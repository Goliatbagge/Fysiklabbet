# Plan: Matematik nivå 1c i Fysiklabbet

**Mål:** Lägga in ämnet Matematik (kursen Matematik nivå 1c) i katalogen med
Teori, Övningar och Exit ticket per avsnitt — byggt från genomgångs-PDF:erna i
`Genomgångar/Matematik nivå 1c/Genomgångar/`. **Ingen simulering** för matte
(sim-kortet ska inte renderas alls för matteämnet — inte ens som "Kommer
snart"; ev. annat visuellt inslag beslutas senare).

**Status/återupptagning:** Checklistan längst ned är sanningskällan. Vid
avbrott: läs denna fil, hitta första obockade rutan, fortsätt där. Arbeta
kapitelvis; committa per kapitel (eller per färdigt avsnitt) — endast när
användaren ber om det.

---

## Arkitekturbeslut (fattade — ändra inte utan skäl)

1. **ID-konvention:** `ma1c-K.A`, t.ex. `ma1c-1.1`. Teorifiler:
   `data/teori/ma1c-1.1.md` osv. Frontmatter:
   ```
   id: ma1c-1.1
   title: Talmängder och negativa tal
   course: Matematik nivå 1c
   chapter: Aritmetik
   chapterNumber: 1
   section: '1.1'
   ```
2. **Kapitelomdöpning/-omnumrering:** PDF-kapitel 3 delas i två sajtkapitel.
   PDF 3.01–3.05 → sajt **kap 3 "Procentuella förändringar"** (3.1–3.5).
   PDF 3.06–3.16 → sajt **kap 4 "Räta linjer och funktioner"** (4.1–4.11).
   Övriga: PDF 1→kap 1 "Aritmetik", PDF 2→kap 2 "Algebra och ekvationer",
   PDF 5→kap 5 "Statistik och sannolikhetslära", PDF 6→kap 6 "Trigonometri".
   Full mappningstabell i checklistan nedan. **Sajtens nummer (inte PDF:ens)
   används överallt** i id, katalog och rubriker.
3. **Katalogen fylls på inkrementellt:** ett avsnitt läggs in i
   `data/katalog.js` FÖRST när dess teori + övningar + exit ticket är klara
   (annars faller `verify-exittickets.js`-täckningen och elever ser tomma
   avsnitt). Kapitelobjektet skapas när första avsnittet läggs in.
4. **Inga emojis** — `icon`-fältet sätts till `null` för matteavsnitt
   (används bara för sim-länkar i sökrutan; matte har inga sims).
5. **TTS (uppläsning) görs som egen sista fas** när alla manus är stabila —
   inte per avsnitt. (Kedjan i CLAUDE.md gäller, men ljudgenerering är dyr;
   batcha den.)
6. **PDF-läsning:** Read-verktyget saknar poppler på denna maskin. Rendera
   sidor med MiKTeX i stället och läs PNG:erna:
   ```bash
   pdftoppm -png -r 110 "Genomgångar/Matematik nivå 1c/Genomgångar/<fil>.pdf" <scratchpad>/pdf/<namn>
   ```
7. **Dubbletter:** PDF 6.04 finns i tre kopior (`_`, `_(1)`, `_(2)`). Jämför
   och använd den mest kompletta; anteckna valet i checklistan.
8. **Trunkerade filnamn:** flera PDF-filnamn är avhuggna ("expone…", "mo…",
   "ur…"). Den riktiga titeln står på PDF:ens första sida — använd ALLTID
   den, inte filnamnet.

## Kodändringar för infrastrukturen (fas 0)

- [x] `data/katalog.js`: nytt ämne `'Matematik'` med kursen
  `'Matematik nivå 1c'` (label, intro med tagline/paragraphs/bullets,
  chapters). Ersätter kommentaren "Matematik-ämnet är borttaget…".
- [x] `katalog.html` (KLART 2026-07-05):
  - [x] `teoriId()` + ny helper `courseCode()`: `'Matematik nivå 1c'` → `'ma1c'`.
  - [x] Sökresultatens teori-länk använder `courseCode()`.
  - [x] `parseInitialState()`: `HASH_COURSES`-tabell; `#ma1c`, `#ma1c-2`,
    `#ma1c-2.3`, `#ma1c-1.1:ovningar` → subject 'Matematik'.
  - [x] `isMath`-grenen med `MathematicsPlaceholder` borttagen.
  - [x] Simulering-kortet renderas inte alls för matte (`!isMath &&`).
  - [x] Nav-dropdownen "Ämne": `Matematik nivå 1c` → `#ma1c`.
- [x] `.claude/verify-exittickets.js`: kurskod-mappning
  `'Matematik nivå 1c'` → `'ma1c'`.
- [x] `index.html`: "Senaste uppdateringar"-post tillagd 2026-07-05 (kapitel 1 live). Sökrutan på startsidan listar bara simuleringar —
  lämnas orörd tills vidare.

## Arbetsgång per avsnitt (upprepas 56 gånger)

1. Rendera PDF:en till PNG (se ovan) och läs ALLA sidor.
2. Skriv `data/teori/ma1c-K.A.md` — samma stil som fy-filerna:
   - Gröna faktarutor i PDF → `::: formel "Rubrik"` (definitioner/regler)
     eller `::: tips`/`::: kuriosa` där det passar.
     ⚠️ FÄLLA: en `::: formel`-box som innehåller BÅDE KaTeX-math och en
     punktlista (`- …`) byggs om av `buildFormelLayouts()` i katalog.html
     (listan flyttas till högerkolumn, styckena kastas om). Använd
     `::: tips` för sådana boxar (samma gröna stil, ingen transform).
     Peach-rutor (Undersökning/Bevis/OBS/Introduktion) → `::: härledning`.
   - "Ex. …" med Svar → `::: exempel "Exempel N — …"` med fet frågestam,
     lösning och **Svar:**-rad. Mätvärden i bracket-block enl. feedback.
   - Figurer (tallinjer, talmängdsovaler, koordinatsystem, grafer,
     trianglar, träddiagram, vektorpilar) → inline-SVG i `::: figur`,
     efterlikna PDF:ens figur. Tät viewBox (verify-figur-bounds).
   - Typografi: variabler kursiva (även i SVG via `<tspan
     font-style="italic">`), decimalkomma, `−` (U+2212) för minus,
     math-block för alla `beteckning = värde`, `\cdot` för gånger.
     Talmängdssymboler: `$\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$`.
3. `node data/teori/build.js` (ALLTID efter md-ändring).
   ⚠️ FÄLLA (upptäckt i kap 4): skrivs md-filen via bash-heredoc + python
   utan raw-sträng äts en backslash-nivå → rac blir FORM FEED + rac och
   	ext blir TAB + ext (\cdot, \Delta m.fl. klarar sig). Skanna efter
   kontrolltecken (, 	) i nya ma1c-filer efter varje sådan skrivning,
   eller använd Write-verktyget för filer med rac/	ext/
eq.
4. Övningar i `data/ovningar.js` under `'ma1c-K.A'`: 3 st N1 + 2 st N2 +
   1 st N3. Nivåtolkning för matte: N1 = direkt procedur (ett moment),
   N2 = två moment/kombination, N3 = kräver insikt/problemlösning
   (N3-demoteringstestet i OVNINGAR.md gäller i anda). Figuruppgifter
   ritas (makeDiagram för grafer), aldrig beskrivs.
5. Exit ticket i `data/exittickets.js` under samma id: 4–6 flervalsfrågor
   som förhör genomgångens kärna; `why` per alternativ; aldrig
   "Rätt!/Fel!"-prefix.
6. Lägg in avsnittet i `data/katalog.js` (num, title, description,
   `href: null`, `icon: null`, keywords med synonymer).
7. Verifiera: `node .claude/verify-exittickets.js`,
   OBS: verify-figur-bounds mäter text-utbredning ENBART via ankarpunkten
   (x-attributet) — etiketter nära höger kant ska ha `text-anchor="end"`
   med x nära viewBox-kanten (och vänsteretiketter `start`), annars slår
   marginal-/klippkollen fel. Max font-size i figurer: 17 px.
   `node .claude/verify-figur-bounds.js`,
   `node .claude/verify-no-white-outline.js`, samt skärmdump av varje ny
   figur via dev-servern (kontrollera kursiv-arv, textkrockar, viewBox).

## Faser

- **Fas 0 — infrastruktur** (kodändringarna ovan) + pilotavsnitt ma1c-1.1
  hela kedjan. Verifiera i webbläsare att #ma1c fungerar.
- **Fas 1–6 — kapitel 1–6**, avsnitt för avsnitt enligt checklistan.
- **Fas 7 — TTS:** ☑ KLAR 2026-07-06. manus-lib.js fick mattestöd
  (\vec/\overrightarrow, |vektor| → "längden av", f(x)/P() → "av",
  \mathbb/\ldots/\Big/\Longleftrightarrow, arcsin/arccos/arctan, enheter
  kr/B/MN/l.e./‰/VL/HL, ∠, br-fix, ordfraser i \text, singular
  "1 längdenhet"); fysik-storhetsnamn (NAMN) avstängda för ma-id:n i
  export-manus.html + tts.js. Manus ombyggt. OBS: audio genereras med
  `py -3.12 data/tts/generate-audio.py` (edge-tts saknas i standardpython).
- **Fas 8 — avslut:** ☑ KLAR 2026-07-06 (utom commit). Uppdateringspost i
  index.html uppdaterad till hela kursen; figur-stickprov kap 5–6 (5.4,
  5.7, 6.5–6.8) godkända via skärmdump; alla verifierare gröna.
  Commit/push görs på användarens begäran.

## Checklista (T = teori-md, Ö = övningar, E = exit ticket, K = i katalog.js)

### Kapitel 1 — Aritmetik
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma1c-1.1 | 1.01 | Talmängder och negativa tal | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.2 | 1.02 | Bråk | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.3 | 1.03 | Addition och subtraktion av bråk | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.4 | 1.04 | Multiplikation och division av bråk | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.5 | 1.05 | Tal i decimalform | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.6 | 1.06 | Potenser med positiva heltalsexponenter | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.7 | 1.07 | Negativa exponenter och exponenten noll | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.8 | 1.08 | Rationella exponenter | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.9 | 1.09 | Grundpotensform och prefix | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.10 | 1.10 | Prioriteringsregler | ☑ | ☑ | ☑ | ☑ |
| ma1c-1.11 | 1.11 | Hur du slår på din räknare | ☑ | ☑ | ☑ | ☑ |

### Kapitel 2 — Algebra och ekvationer
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma1c-2.1 | 2.01 | Teckna och tolka uttryck | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.2 | 2.02 | Förenkla uttryck | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.3 | 2.03 | Multiplicera med parenteser | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.4 | 2.04 | Faktorisera uttryck | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.5 | 2.05 | Ekvationslösningens grunder | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.6 | 2.06 | Mer om ekvationer | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.7 | 2.07 | Ekvationer med nämnare | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.8 | 2.08 | Problemlösning med ekvationer | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.9 | 2.09 | Enkla andra- och tredjegradsekvationer | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.10 | 2.10 | Potensekvationer | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.11 | 2.11 | Olikheter | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.12 | 2.12 | Använda formler | ☑ | ☑ | ☑ | ☑ |
| ma1c-2.13 | 2.13 | Mönster och formler | ☑ | ☑ | ☑ | ☑ |

### Kapitel 3 — Procentuella förändringar
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma1c-3.1 | 3.01 | Procent, promille och ppm | ☑ | ☑ | ☑ | ☑ |
| ma1c-3.2 | 3.02 | Förändringsfaktor | ☑ | ☑ | ☑ | ☑ |
| ma1c-3.3 | 3.03 | Upprepade procentuella förändringar | ☑ | ☑ | ☑ | ☑ |
| ma1c-3.4 | 3.04 | Sparande och ränteberäkningar | ☑ | ☑ | ☑ | ☑ |
| ma1c-3.5 | 3.05 | Lån och ränteberäkningar | ☑ | ☑ | ☑ | ☑ |

### Kapitel 4 — Räta linjer och funktioner (PDF-kapitel 3, omnumrerat!)
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma1c-4.1 | 3.06 | Koordinatsystem och linjära modeller | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.2 | 3.07 | Proportionalitet | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.3 | 3.08 | Från ekvation till graf | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.4 | 3.09 | Från graf till ekvation | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.5 | 3.10 | Räta linjens ekvation | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.6 | 3.11 | Parallella och vertikala linjer samt allmän form | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.7 | 3.12 | Funktion och funktionsvärde | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.8 | 3.13 | Ekvationslösning med grafritande hjälpmedel | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.9 | 3.14 | Definitionsmängd och värdemängd | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.10 | 3.15 | Exponentialfunktioner | ☑ | ☑ | ☑ | ☑ |
| ma1c-4.11 | 3.16 | Potensfunktioner | ☑ | ☑ | ☑ | ☑ |

### Kapitel 5 — Statistik och sannolikhetslära
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma1c-5.1 | 5.01 | Statistiska undersökningar, urval och felkällor | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.2 | 5.02 | Felmarginal och signifikans | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.3 | 5.03 | Korrelation och kausalitet | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.4 | 5.04 | Den klassiska sannolikhetsdefinitionen | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.5 | 5.05 | Experimentella sannolikheter | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.6 | 5.06 | Produktregeln | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.7 | 5.07 | Träddiagram | ☑ | ☑ | ☑ | ☑ |
| ma1c-5.8 | 5.08 | Komplementhändelse | ☑ | ☑ | ☑ | ☑ |

### Kapitel 6 — Trigonometri
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma1c-6.1 | 6.01 | Tangens för en vinkel | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.2 | 6.02 | Sinus och cosinus | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.3 | 6.03 | Bestämma vinklar med inversa funktioner | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.4 | 6.04 | Bestämma sträckor och vinklar i koordinatsystem (källa: _(2).pdf; _(1) = repetitionsblad, _ = GeoGebra-lärarnotis) | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.5 | 6.05 | Vektorer och skalärer | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.6 | 6.06 | Räkneoperationer med vektorer | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.7 | 6.07 | Subtraktion av vektorer | ☑ | ☑ | ☑ | ☑ |
| ma1c-6.8 | 6.08 | Längden av en vektor i koordinatform | ☑ | ☑ | ☑ | ☑ |

\* = titeln är avhuggen i PDF-filnamnet — verifiera mot PDF:ens första sida
och uppdatera tabellen om den skiljer sig.

## Kursintro-text (till katalog.js — utkast, justera fritt)

Tagline: "Gymnasiets första matematikkurs för naturvetare och tekniker."
Innehåll: aritmetik och algebra som grund, procent och privatekonomi,
funktioner och räta linjer, statistik/sannolikhet och trigonometri med
vektorer. Bullets om vad man lär sig/tränar på/möter.
