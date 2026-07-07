# Plan: Matematik nivå 2c i Fysiklabbet

**Mål:** Lägga in kursen Matematik nivå 2c under ämnet Matematik i katalogen
med Teori, Övningar och Exit ticket per avsnitt — byggt från genomgångs-
PDF:erna i `Genomgångar/Matematik nivå 2c/`. **Ingen simulering** för matte
(sim-kortet renderas inte för matteämnet). Samma upplägg som Matematik
nivå 1c — se `.claude/matematik-plan.md` för det projektets beslut; alla
gäller även här om inget annat sägs nedan.

**Status/återupptagning:** Checklistan längst ned är sanningskällan. Vid
avbrott: läs denna fil, hitta första obockade rutan, fortsätt där.
Committa endast när användaren ber om det.

---

## Arkitekturbeslut

1. **ID-konvention:** `ma2c-K.A`, teorifiler `data/teori/ma2c-K.A.md`.
   Frontmatter som ma1c men `course: Matematik nivå 2c`.
2. **Hoppade PDF:er:** 2.09 "Repetitionslektioner" (lärarnotiser, ingen
   genomgång) och 3.03 "Andragradsfunktioner och kvadr…" (1 sida:
   "Genomgång inte gjord."). Dessa blir INTE avsnitt.
3. **Omnumrering:** Kap 3 tätas efter hoppet (PDF 3.04→3.3, 3.05→3.4,
   3.06→3.5). Kap 4 har TVÅ PDF:er numrerade 4 07 — "Likformiga
   månghörningar" kommer först (dess text: "…vilket nästa genomgång
   handlar om" = trianglar). PDF 4.07a→4.7, 4.07b→4.8, 4.08→4.9,
   4.09→4.10, 4.10→4.11, 4.11→4.12. Sajtens nummer används överallt.
4. **Titlar tas från PDF:ens sida 1** (filnamnen är avhuggna). Alla titlar
   i checklistan nedan är redan verifierade mot sida 1. Obs: PDF 4.06
   heter "Koordinatgeometri" på sida 1 (inte filnamnets "Avståndsformeln
   och mittpunkts…").
5. **PDF-rendering:** `pdftoppm -png -r 110 "Genomgångar/Matematik nivå
   2c/<fil>.pdf" <scratchpad>/pdf/<namn>` — Read-verktyget saknar poppler.
   Alla PDF:er är 1–4 sidor.
6. **Interaktiva grafer (`::: graf`):** obligatoriskt där avsnittet
   handlar om parameter → grafens utseende. Självklara kandidater:
   3.1 (parabelns a-, b-, c-parametrar), 3.3 (modellering), 5.1/5.3
   (exponentialfunktioner), 6.6/6.7 (regressionsmodeller — bedöm).
7. **Katalogen fylls inkrementellt** — avsnitt in i `data/katalog.js`
   först när teori + övningar + exit ticket finns (annars faller
   verify-exittickets). Kapitelobjekt skapas vid första avsnittet.
8. **TTS batchas sist** (fas 7). Audio genereras med
   `py -3.12 data/tts/generate-audio.py` (edge-tts saknas i
   standardpython); dev-server på port 8000 krävs.
9. **Heredoc-fällan:** skriv md-filer med Write-verktyget (aldrig
   bash-heredoc+python utan raw-strängar) — `\f`/`\t`/`\n` i KaTeX äts
   annars. Skanna nya filer efter kontrolltecken vid tvekan.
10. **verify-figur-bounds:** textutbredning mäts via ankarpunkten —
    höger-etiketter `text-anchor="end"` nära kanten, vänster `start`.
    Max font-size 17 px i figurer.

## Kodändringar för infrastrukturen (fas 0)

- [x] `data/katalog.js`: kurs `'Matematik nivå 2c'` under `'Matematik'`
  (label, intro med tagline/paragraphs/bullets, chapters).
- [x] `katalog.html`: `courseCode()` + `HASH_COURSES` + hash-regex
  (`fy1|fy2|ma1c|ma2c`) + Ämne-dropdown `#ma2c`.
- [x] `.claude/verify-exittickets.js`: mappning `'Matematik nivå 2c'` →
  `'ma2c'`.
- [x] `avsnitt.html`: Ämne-dropdown `#ma2c`.
- [ ] Övriga HTML-filer med Ämne-dropdown (~90 st): görs i fas 8 som
  massredigering.

## Arbetsgång per avsnitt

Samma som ma1c-planens 7 steg: rendera PDF → teori-md (formel/tips/
härledning/exempel-block, inline-SVG-figurer med tät viewBox) →
`node data/teori/build.js` → övningar 3 N1 + 2 N2 + 1 N3 i
`data/ovningar.js` → exit ticket 4–6 frågor i `data/exittickets.js` →
katalogpost → verifierare + skärmdump av nya figurer.

## Kapitel- och avsnittsstruktur (42 avsnitt)

### Kapitel 1 — Linjära ekvationssystem
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma2c-1.1 | 1.01 | Grafisk lösning av linjära ekvationssystem | ☑ | ☑ | ☑ | ☑ |
| ma2c-1.2 | 1.02 | Substitutionsmetoden | ☑ | ☑ | ☑ | ☑ |
| ma2c-1.3 | 1.03 | Additionsmetoden | ☑ | ☑ | ☑ | ☑ |
| ma2c-1.4 | 1.04 | Problemlösning med ekvationssystem | ☑ | ☑ | ☑ | ☑ |

### Kapitel 2 — Algebra och andragradsekvationer
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma2c-2.1 | 2.01 | Kvadreringsreglerna och konjugatregeln | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.2 | 2.02 | Faktorisering av uttryck | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.3 | 2.03 | Nollproduktmetoden | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.4 | 2.04 | pq-formeln | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.5 | 2.05 | abc-formeln | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.6 | 2.06 | Antal lösningar till en andragradsekvation | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.7 | 2.07 | Problemlösning med andragradsekvationer | ☑ | ☑ | ☑ | ☑ |
| ma2c-2.8 | 2.08 | Rotekvationer | ☑ | ☑ | ☑ | ☑ |
| — | 2.09 | Repetitionslektioner — HOPPAS ÖVER (lärarnotiser) | | | | |

### Kapitel 3 — Andragradsfunktioner
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma2c-3.1 | 3.01 | Grafen till en andragradsfunktion | ☑ | ☑ | ☑ | ☑ |
| ma2c-3.2 | 3.02 | Andragradsekvationer och andragradsfunktioner | ☑ | ☑ | ☑ | ☑ |
| — | 3.03 | HOPPAS ÖVER ("Genomgång inte gjord.") | | | | |
| ma2c-3.3 | 3.04 | Andragradsfunktioner och modellering | ☑ | ☑ | ☑ | ☑ |
| ma2c-3.4 | 3.05 | Andragradsekvationer och olikheter med grafritande hjälpmedel | ☑ | ☑ | ☑ | ☑ |
| ma2c-3.5 | 3.06 | Problemlösning med grafritande hjälpmedel | ☑ | ☑ | ☑ | ☑ |

### Kapitel 4 — Geometri
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma2c-4.1 | 4.01 | Olika slags vinklar | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.2 | 4.02 | Vinklar i trianglar och månghörningar | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.3 | 4.03 | Implikation och ekvivalens | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.4 | 4.04 | Satser och bevis | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.5 | 4.05 | Pythagoras sats | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.6 | 4.06 | Koordinatgeometri | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.7 | 4.07a | Likformiga månghörningar | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.8 | 4.07b | Likformiga trianglar | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.9 | 4.08 | Triangelsatserna | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.10 | 4.09 | Kongruens | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.11 | 4.10 | Randvinkelsatsen | ☑ | ☑ | ☑ | ☑ |
| ma2c-4.12 | 4.11 | Kordasatsen och inskrivna fyrhörningar | ☑ | ☑ | ☑ | ☑ |

### Kapitel 5 — Logaritmer
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma2c-5.1 | 5.01 | Exponential- och potensekvationer | ☑ | ☑ | ☑ | ☑ |
| ma2c-5.2 | 5.02 | Tiologaritmer | ☑ | ☑ | ☑ | ☑ |
| ma2c-5.3 | 5.03 | Exponentialekvationer och tiologaritmer | ☑ | ☑ | ☑ | ☑ |
| ma2c-5.4 | 5.04 | Logaritmlagarna | ☑ | ☑ | ☑ | ☑ |
| ma2c-5.5 | 5.05 | Tillämpningar av logaritmer | ☑ | ☑ | ☑ | ☑ |
| ma2c-5.6 | 5.06 | Logaritmer med andra baser | ☑ | ☑ | ☑ | ☑ |

### Kapitel 6 — Statistik
| id | PDF | Titel | T | Ö | E | K |
|---|---|---|---|---|---|---|
| ma2c-6.1 | 6.01 | Lägesmått | ☑ | ☑ | ☑ | ☑ |
| ma2c-6.2 | 6.02 | Spridningsmått, lådagram och percentiler | ☑ | ☑ | ☑ | ☑ |
| ma2c-6.3 | 6.03 | Statistik med digitala verktyg | ☑ | ☑ | ☑ | ☑ |
| ma2c-6.4 | 6.04 | Standardavvikelse | ☑ | ☑ | ☑ | ☑ |
| ma2c-6.5 | 6.05 | Normalfördelning | ☑ | ☑ | ☑ | ☑ |
| ma2c-6.6 | 6.06 | Linjär regression | ☑ | ☑ | ☑ | ☑ |
| ma2c-6.7 | 6.07 | Olika regressionsmodeller | ☑ | ☑ | ☑ | ☑ |

## Faser

- **Fas 0 — infrastruktur**: ☑ KLAR 2026-07-07 + pilot ma2c-1.1
  browserverifierad.
- **Fas 1–6 — kapitel 1–6**: ☑ KLARA 2026-07-07, alla 42 avsnitt (se
  checklistan).
- **Fas 7 — TTS**: ☑ manus klara 2026-07-07. manus-lib.js utökad med
  `\triangle`/`\sim`/`\cong`, `\log_a`-baser (inkl. uppackning av
  `\mathrm{}` som uprightSubscripts lägger på bokstavsbaser) och
  prosa-strip av ⟹⟺≅. Audio genererad med
  `py -3.12 data/tts/generate-audio.py` (inkrementellt, 42 nya).
- **Fas 8 — avslut**: ☑ KLAR 2026-07-07 (utom commit). #ma2c-länk i alla
  ~85 HTML-navbars (verify-navigation grön), uppdateringspost i
  index.html, alla verifierare gröna (nav, exittickets, figur-bounds 361,
  white-outline), skärmdumps-stickprov (1.1, 1.3, 2.7, 3.1, 4.1, 4.11,
  6.2, 6.5, kursintro, exit ticket 4.5) godkända. verify-figur-bounds.js
  breddad till `(fy\d|ma\dc)`. Innehållsfel i käll-PDF:erna rättade:
  2.07-facit (24 och 45), 4.11-exempel (65°), 5.04 2b (−0,31).
  Commit/push görs på användarens begäran.
