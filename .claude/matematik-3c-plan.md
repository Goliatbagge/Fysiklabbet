# Plan: Matematik fortsättning nivå 1c (Ma3c) i Fysiklabbet

**Mål:** Lägga in kursen **Matematik fortsättning nivå 1c** (= Ma3c) som
tredje kurs under ämnet Matematik i katalogen, med Teori, Övningar och Exit
ticket per avsnitt — byggt från den samlade genomgångs-PDF:en
`Genomgångar/Matematik fortsättning nivå 1c/Alla genomgångar - Ma3c.pdf`
(115 sidor, en enda fil). **Ingen simulering** för matte (sim-kortet
renderas inte för matteämnet). Samma upplägg som [Matematik nivå 1c]
(`.claude/matematik-plan.md`) och [Matematik nivå 2c]
(`.claude/matematik-2c-plan.md`) — alla deras beslut gäller om inget annat
sägs här.

**Status/återupptagning:** Checklistan längst ned är sanningskällan. Vid
avbrott: läs denna fil, hitta första obockade rutan, fortsätt där.
Committa endast när användaren ber om det.

---

## Arkitekturbeslut

1. **Kurskod `ma3c`.** ID-konvention `ma3c-K.A`, teorifiler
   `data/teori/ma3c-K.A.md`. Frontmatter: `course: Matematik fortsättning
   nivå 1c`, `chapter`, `chapterNumber`, `section`.
2. **Kursens label i katalogen:** `Matematik fortsättning nivå 1c`.
3. **PDF-rendering (klart):** hela PDF:en renderad till PNG i scratchpad
   `ma3c-pdf/p-001.png` … `p-115.png` (`pdftoppm -png -r 90`). Textlager
   extraherat till `ma3c.txt`. Sidmappningen nedan är verifierad mot
   textlagrets sidrubriker. PDF:ens ordning ≠ sajtens listordning (t.ex.
   "Deriverbarhet och absolutbelopp" ligger fysiskt på s.19–21 men är
   avsnitt 2.5).
4. **39 avsnitt i 6 kapitel** (se tabell). Sidintervall angivna.
5. **Interaktiva grafer (`::: graf`)** obligatoriskt där avsnittet handlar
   om parameter → grafens utseende. Kandidater: 3.4/3.5 (e^x, e^kx),
   4.1 (växande/avtagande via derivatans tecken — bedöm), grafer i
   integralavsnitt. Bedöm per avsnitt.
6. **Katalogen fylls inkrementellt** — avsnitt in i `data/katalog.js` först
   när teori + övningar + exit ticket finns (annars faller
   verify-exittickets). Kapitelobjekt skapas vid första avsnittet.
7. **TTS batchas sist** (fas 7). `node data/tts/build-manus.js` +
   `py -3.12 data/tts/generate-audio.py` (dev-server på port 8000).
   Inkrementellt.
8. **Heredoc-fällan:** skriv md-filer med Write-verktyget. Skanna efter
   kontrolltecken (`\f`/`\t`) vid tvekan. JS-strängar i ovningar.js/
   exittickets.js: dubbla alla backslash.
9. **verify-figur-bounds** täcker redan `(fy\d|ma\dc)` → ma3c ingår.

## Kodändringar för infrastrukturen (fas 0)

- [x] `data/katalog.js`: kurs `'Matematik fortsättning nivå 1c'` under
  `'Matematik'` (label, intro, chapters) — fylls inkrementellt.
- [x] `katalog.html`: `courseCode()` +ma3c, `HASH_COURSES` +ma3c,
  hash-regex `(fy1|fy2|ma1c|ma2c|ma3c)`, Ämne-dropdown-länk `#ma3c`.
- [x] `.claude/verify-exittickets.js`: mappning
  `'Matematik fortsättning nivå 1c'` → `'ma3c'`.
- [x] `avsnitt.html`: Ämne-dropdown-länk `#ma3c`.
- [ ] Övriga 82 HTML-filer med Ämne-dropdown: `#ma3c`-länk läggs till i
  fas 8 (massredigering, verify-navigation grön efteråt).

## Arbetsgång per avsnitt

Läs avsnittets PDF-sidor (PNG) → teori-md (formel/tips/härledning/exempel-
block, inline-SVG-figurer med tät viewBox, korrekt typografi) → övningar
3 N1 + 2 N2 + 1 N3 i `data/ovningar.js` → exit ticket 5 frågor i
`data/exittickets.js` → katalogpost → `node data/teori/build.js` +
verifierare (exittickets, figur-bounds, no-white-outline) + skärmdump av
figurer.

## Kapitel- och avsnittsstruktur (39 avsnitt)

Chapter-titlar (sajtens): Kap1 "Rationella uttryck och gränsvärden",
Kap2 "Derivatan", Kap3 "Deriveringsregler", Kap4 "Kurvor och extremvärden",
Kap5 "Integraler", Kap6 "Trigonometri och triangelsatserna".

### Kapitel 1 — Rationella uttryck och gränsvärden
| id | Titel | Sidor | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma3c-1.1 | Förkortning och förlängning av rationella uttryck | 1–4 | ☐ | ☐ | ☐ | ☐ |
| ma3c-1.2 | Addition och subtraktion av rationella uttryck | 5–8 | ☐ | ☐ | ☐ | ☐ |
| ma3c-1.3 | Multiplikation och division av rationella uttryck | 9–10 | ☐ | ☐ | ☐ | ☐ |
| ma3c-1.4 | Gränsvärden | 11–14 | ☐ | ☐ | ☐ | ☐ |
| ma3c-1.5 | Symbolhanterande hjälpmedel | 15–18 | ☐ | ☐ | ☐ | ☐ |

### Kapitel 2 — Derivatan
| id | Titel | Sidor | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma3c-2.1 | Sekantens lutning | 22–23 | ☐ | ☐ | ☐ | ☐ |
| ma3c-2.2 | Tangentens lutning | 24–25 | ☐ | ☐ | ☐ | ☐ |
| ma3c-2.3 | Derivatans definition | 26–27 | ☐ | ☐ | ☐ | ☐ |
| ma3c-2.4 | Använda derivata | 28–29 | ☐ | ☐ | ☐ | ☐ |
| ma3c-2.5 | Deriverbarhet och absolutbelopp | 19–21 | ☐ | ☐ | ☐ | ☐ |

### Kapitel 3 — Deriveringsregler
| id | Titel | Sidor | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma3c-3.1 | Derivatan av enkla potensfunktioner | 30–33 | ☐ | ☐ | ☐ | ☐ |
| ma3c-3.2 | Derivatan av polynomfunktioner | 34–35 | ☐ | ☐ | ☐ | ☐ |
| ma3c-3.3 | Mer om derivatan av potensfunktioner | 36–39 | ☐ | ☐ | ☐ | ☐ |
| ma3c-3.4 | Derivatan av eˣ | 40–42 | ☐ | ☐ | ☐ | ☐ |
| ma3c-3.5 | Derivatan av eᵏˣ och aˣ | 43–47 | ☐ | ☐ | ☐ | ☐ |
| ma3c-3.6 | Tillämpningar av derivata | 48–50 | ☐ | ☐ | ☐ | ☐ |
| ma3c-3.7 | Tillämpningar av derivata med digitala hjälpmedel | 51–53 | ☐ | ☐ | ☐ | ☐ |

### Kapitel 4 — Kurvor och extremvärden
| id | Titel | Sidor | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma3c-4.1 | Växande och avtagande funktion | 54–56 | ☐ | ☐ | ☐ | ☐ |
| ma3c-4.2 | Derivatans nollställen | 57–60 | ☐ | ☐ | ☐ | ☐ |
| ma3c-4.3 | Största och minsta värde i ett intervall samt kurvkonstruktion | 61–63 | ☐ | ☐ | ☐ | ☐ |
| ma3c-4.4 | Andraderivatan och funktionens graf | 64–66 | ☐ | ☐ | ☐ | ☐ |
| ma3c-4.5 | Andraderivatan och lokala extrempunkter | 67–69 | ☐ | ☐ | ☐ | ☐ |
| ma3c-4.6 | Extremvärdesproblem | 70–72 | ☐ | ☐ | ☐ | ☐ |
| ma3c-4.7 | Extremvärdesproblem med digitalt hjälpmedel | 73 | ☐ | ☐ | ☐ | ☐ |

### Kapitel 5 — Integraler
| id | Titel | Sidor | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma3c-5.1 | Primitiva funktioner | 74–76 | ☐ | ☐ | ☐ | ☐ |
| ma3c-5.2 | Primitiva funktioner med villkor | 77–78 | ☐ | ☐ | ☐ | ☐ |
| ma3c-5.3 | Arean under en kurva | 79–83 | ☐ | ☐ | ☐ | ☐ |
| ma3c-5.4 | Integralkalkylens fundamentalsats | 84–85 | ☐ | ☐ | ☐ | ☐ |
| ma3c-5.5 | Beräkna integraler med digitalt hjälpmedel | 86–87 | ☐ | ☐ | ☐ | ☐ |
| ma3c-5.6 | Area mellan kurvor | 88–91 | ☐ | ☐ | ☐ | ☐ |
| ma3c-5.7 | Tillämpningar av integraler | 92–93 | ☐ | ☐ | ☐ | ☐ |

### Kapitel 6 — Trigonometri och triangelsatserna
| id | Titel | Sidor | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma3c-6.1 | Trigonometri i rätvinkliga trianglar | 94–95 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.2 | Enhetscirkeln | 96–99 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.3 | Trigonometriska ekvationer | 100–102 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.4 | Trigonometriska ekvationer – räknelektion och tangens | 103–104 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.5 | Areasatsen | 105–106 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.6 | Sinussatsen | 107–108 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.7 | Cosinussatsen | 109–112 | ☐ | ☐ | ☐ | ☐ |
| ma3c-6.8 | Tillämpningar av triangelsatserna | 113–115 | ☐ | ☐ | ☐ | ☐ |

## Faser — STATUS (2026-07-08)

- **Fas 0 — infrastruktur:** ☑ KLAR + pilot ma3c-1.1 browserverifierad.
- **Fas 1–6 — kapitel 1–6:** ☑ KLARA. Alla 39 avsnitt (teori + 6 övn +
  exit ticket + katalogpost) byggda med parallella subagenter och mergade.
  Kap 6 byggdes efter att sessionens rate limit slog till en gång (agenterna
  återstartades). ::: graf i 3.4.
- **Fas 7 — TTS:** ☑ manus klara. manus-lib.js utökad med `\to`→"går mot",
  `\lim_{...}`→"gränsvärdet då …" (renderar subscript), `\int`→"integralen
  av", prim/bis för `'`/`''`. build-manus.js normaliserar unicode-super
  (eˣ/aˣ/eᵏˣ). Ljud genereras med `py -3.12 data/tts/generate-audio.py`.
- **Fas 8 — avslut:** ☑ #ma3c i 81 navbars (Python-massinsättning,
  verify-navigation grön), index.html uppdaterad (post + knapp + introtext),
  alla verifierare gröna (exittickets, figur-bounds 401, vinkelbagar 0 fel,
  no-white-outline). Skärmdumps-stickprov OK (1.1, 1.4, 2.5, 3.4, 5.3, 6.3,
  6.5, 6.7). **Commit/push görs på användarens begäran.**

## ⚠️ FÄLLA upptäckt: sed korrumperar \degree

`sed -i 's/\\degree/^\\circ/g'` i Bash-tool (Git Bash/MSYS) förvandlade
`\degree` till `\^<TAB>rc` i 6.1/6.3/6.4.md. Använd ALLTID Python för
sådana textersättningar i md/JS. KaTeX saknar `\degree` → skriv `^\circ`.
