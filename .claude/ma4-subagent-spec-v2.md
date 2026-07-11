# Ma4 subagent-spec v2 — bygg ETT avsnitt i Matematik fortsättning nivå 2

Du bygger ett (1) avsnitt i matematikkursen **Matematik fortsättning nivå 2**
(kurskod `ma4`) för sajten Fysiklabbet. Din prompt anger avsnittets id, titel,
kapitel (namn + nummer), PDF-sidor, graf-flagga och en STAGING-sökväg. Följ
denna spec EXAKT.

## Källa (läs FÖRST)

- **PDF-sidor som PNG:** `<SCRATCH>/ma4-pdf/p-0NN.png` (NN = sidnummer).
  `<SCRATCH>` = `C:\Users\sam_s\AppData\Local\Temp\claude\C--claude-Fysiklabbet\5545a689-2548-4f92-9c96-cc740e8b2767\scratchpad`.
  Läs varje tilldelad sida med Read (bild). Din md ska spegla genomgången:
  samma begrepp, samma exempel, samma beteckningar och formelskrivning.
- **Formatmallar (läs som facit):** teori `data/teori/ma4-1.8.md` (formelkort
  + bevis + figur) och `data/teori/ma4-1.11.md` (`::: graf`); övningar +
  exitticket: blocken `'ma4-1.8'` i `data/ovningar.js` och `data/exittickets.js`;
  katalogpost: avsnitt i `data/katalog.js` (kursen "Matematik fortsättning
  nivå 2").

## Vad du LEVERERAR (två saker)

1. **Skriv filen** `data/teori/ma4-<id>.md` (unik fil — ingen konflikt).
2. **Skriv en staging-fil** till den STAGING-sökväg din prompt anger, med
   EXAKT detta innehåll (inga ```-kodstaket, inget annat):

```
===OVNINGAR===
    'ma4-<id>': [
        ...hela arrayen, indrag som i ma4-1.8...
    ],
===EXITTICKET===
'ma4-<id>': [
  ...hela arrayen, indrag som i ma4-1.8...
],
===KATALOG===
              { num: '<num>', title: '<titel>', description: '<beskrivning>', href: null, icon: null, keywords: [ ... ] },
===END===
```

Din slutliga textrespons ska bara vara en kort mening om vad du gjorde + ev.
figur-notis. (Huvudprocessen merge:ar staging-filen; returnera INTE blocken i
chatten.)

## FÖRBJUDET

- **Rör INTE** `data/ovningar.js`, `data/exittickets.js`, `data/katalog.js`,
  `data/teori/bundle.js`. Kör INTE `node data/teori/build.js`.
- **Inga emojis / dekorativa piktogram.** (Matematiska tecken → ⟂ · × ≈ ≤ ≥
  ± ° ′ ″, pilar och grekiska bokstäver är notation, OK.)
- **Inga HTML-entiteter i KaTeX/text.** Skriv literalt `<`, `>`, `&` — ALDRIG
  `&lt;`, `&gt;`, `&amp;`. (Inuti `$...$` funkar `<` och `>` direkt.) Undantag:
  radbrytning i deluppgifter skrivs som literalt `<br>` och mellanrum som
  literalt `&emsp;&emsp;` (se deluppgifter nedan).

## Teori-md — struktur

Frontmatter (byt ut värdena; kapitel/nummer får du i prompten):
```
---
id: ma4-<id>
title: <titel>
course: Matematik fortsättning nivå 2
chapter: <KAPITELNAMN>
chapterNumber: <KAPITELNUMMER>
section: '<num>'
---

# <titel>

<brödtext ...>
```

Block (se ma4-1.8.md för exakt syntax): `::: formel "Rubrik"` … `:::`,
`::: exempel "Exempel 1 — kort beskr."` … `:::` (avsluta med `**Svar:** …`,
frågestam i fetstil), `::: figur` `<svg …>` `:::`, `::: graf` … `:::` (endast
om prompten säger GRAF). Skriv 1–3 korta brödtextstycken, formelkort, 2–3
exempel som speglar PDF:ens exempel.

## Typografi (KRITISKT)

- **Svenska, decimalkomma:** `5,0` inte `5.0`. Aldrig title case.
- **Variabler kursiv, enheter/tal rakt.** I md/KaTeX blir `$v$`, `$x$` kursiva.
- **Grader:** `^\circ` i KaTeX (`41^\circ`), ALDRIG `\degree`. Unicode `°` OK
  i ren brödtext utanför math.
- **Värde+enhet / relation = ETT math-block:** `$v = 5{,}0\ \mathrm{cm}$`,
  `$F_R = m\cdot a$`. Decimalkomma i KaTeX = `{,}` → `5{,}0`. Aldrig
  radbrytning mellan beteckning, `=` och värde.
- **Raka bråkstreck** `\frac{}{}` / `\dfrac{}{}`; snedstreck bara i enheter.
- **`\cdot`** mellan faktorer. **Exakt noll utan decimaler** (`0`).
- **I .md: ENKLA backslash** (`\frac`, `\sin`, `\circ`). **I staging-filens
  JS-block (ovningar/exitticket): DUBBLA backslash** (`\\frac`, `\\sin`,
  `\\circ`, `\\cdot`, `\\ `, `\\mathrm`). Vanligaste buggen — kontrollera varje.

## Figurer (inline-SVG) — rita bara när det tillför

Rita vid geometrisk/rumslig uppställning (enhetscirkel, komplexa talplanet/
visare, kurva som INTE är `::: graf`). Rena räkneavsnitt: ingen figur.
- **Rita från beräknade koordinater** (cos/sin), aldrig ögonmått. Tät viewBox
  utan tom luft, men inget klipps. Höger/nedre marginal måste vara liten —
  räkna på det (viewBox-höger ≈ största x-koordinat + ~12 px). OBS: text-
  BREDD räknas inte av verifieraren, så håll etiketter KORTA (ensam bokstav
  som `P`, `Q`, `z`) och lägg dem inom viewBoxen — långa etiketter som
  "P (cos v, sin v)" spiller ut och klipps. Definiera koordinater i brödtext.
- **Variabler i SVG-text kursiveras** med `<tspan font-style="italic">v</tspan>`.
  Sätt ALDRIG `font-style="italic"` på ett helt `<text>` med `= värde enhet`.
- **INGEN vit kontur/halo** (`stroke="#fff"`, `paint-order:stroke`, vit
  `text-shadow` förbjudet). Mörk bläckfärg `#1f2530` räcker på ljus botten.
- **Vinkelbåge:** medelpunkt i hörnet, ändpunkter på benen, RÄTT sweep-flagga
  (fel flagga = bågen buktar åt fel håll). Testa: en båge från positiva
  x-axeln moturs uppåt i ett SVG (y nedåt) behöver oftast sweep-flagga `0`.
- **Argand-diagram (kap 4):** reell axel vågrät, imaginär lodrät (pilspetsar),
  visare/pil från origo till punkten `z`, `Re`/`Im`-etiketter i fri yta.
- **Verifiera figuren:** skriv `.shots/ma4-<id>-figN.html` som inlinear din
  SVG mot ljus botten (`#f2ece0`), skjut skärmdump och GRANSKA:
  ```
  "C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=700,700 --screenshot="C:/claude/Fysiklabbet/.shots/ma4-<id>-figN.png" "file:///C:/claude/Fysiklabbet/.shots/ma4-<id>-figN.html"
  ```
  Rätta tills inget klipps, inga texter på linjer, variabler kursiva, inga
  vita halor, vinkelbågar rätt.

## `::: graf` (endast om prompten säger GRAF)

```
::: graf
titel: y = a x^{{2}}
uttryck: a*x^2
ekvation: y = {a}x^2
a: 1, -3, 3, 0.5
x: -6, 6
y: -6, 6
:::
```
`uttryck:` maskin-uttryck i `x` + parametrar (`.`-decimal; `sin cos tan sqrt
abs exp ln log`, `pi`, `e`). `ekvation:` KaTeX-mall med `{param}`. En rad per
parameter `värde, min, max[, steg]`, namn = EN bokstav som matchar
genomgången. `x:`/`y:` startfönster. Prompten ger ofta ett färdigt block.

## Övningar (staging) — 3 N1 + 2 N2 + 1 N3

Exakt 6, i ordning tre `level:1`, två `level:2`, en `level:3`. Fält som i
`'ma4-1.8'`. Två svarsformat: flerval (`choices:[...4...], correct:0,` +
`solution`) eller numeriskt (`answer:{value,unit,tol}` + `solution`). Rätt
svar FÖRST i källan. `solution`: formel → insatta värden → beräkning →
`**Svar:** …`. **N3 kräver en insikt** (ekvationssystem, exakt värde, fälla,
substitution) — inte bara lång räknekedja. Deluppgifter: `<br>` före "a)",
skilj med `&emsp;&emsp;`, inget komma. DUBBLA backslash.

## Exit ticket (staging) — 5 frågor

Exakt 5: `question`, `choices` (4, rätt FÖRST), `correct:0`, `why` (4, en per
choice i ordning; `why[0]`=varför rätt). Får INTE börja med "Rätt!"/"Fel!".
DUBBLA backslash.

## Innan du är klar

- [ ] `data/teori/ma4-<id>.md` skriven, frontmatter rätt (kapitel + nummer).
- [ ] Ev. figur screenshot-verifierad (inget klipp/halo, kursiva variabler,
      rätt vinkelbåge, korta etiketter).
- [ ] Staging-fil skriven till angiven sökväg, med de fyra `===`-avdelarna,
      dubbla backslash, inga HTML-entiteter, inga ```-staket.
- [ ] 3+2+1 övningar (rätt först, N3-insikt); 5 exit tickets (4 why);
      katalograd (num/titel/beskrivning/6–10 keywords). Inga emojis. `^\circ`.
