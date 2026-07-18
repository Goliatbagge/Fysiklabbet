# Brief: kapitelsammanfattningar + repetitionsspel

Varje fysikkapitel avslutas med ett avsnitt **Sammanfattning** (teori-md)
och ett **repetitionsspel** (innehållspaket till `fysik-repetition.html`).
Denna brief styr både format och kvalitet. Referensexempel för spelpaket:
`data/repetition/fy1-2.js`.

## Källmaterial

Läs ALLA kapitlets teorifiler (`data/teori/fyN-K.*.md`) innan du skriver.
Sammanfattningen och spelet ska spegla EXAKT genomgångens beteckningar,
enheter och formelskrivning (synk-regeln i CLAUDE.md). Hitta aldrig på
stoff som inte finns i kapitlet.

## Del 1: Sammanfattningen — `data/teori/fyN-K.S.md`

Frontmatter (obligatorisk, exakta fält):

```
---
id: fy1-2.S
title: Sammanfattning
course: Fysik nivå 1
chapter: Rörelse
chapterNumber: 2
section: '2.S'
---
```

Struktur (rubrikerna ska vara dessa, i denna ordning; hoppa över en rubrik
bara om kapitlet saknar sådant innehåll):

```
# Sammanfattning — <Kapitelnamn>

2–3 meningars ingress: vad kapitlet handlade om och vad man ska kunna.

## Begrepp att kunna

Punktlista: **begrepp** — en rads förklaring. 6–12 st, de viktigaste.

## Formler

::: formel-block som samlar KAPITLETS ALLA formler, grupperade per delområde
med $$...$$ och "där"-lista där varje symbol namnges med enhet. Kopiera
gärna formelblocken ur avsnittsfilerna (utan att ändra beteckningar).

## Viktiga samband och metoder

Punktlista med samband som inte är rena formler (diagramtolkningar,
teckenkonventioner, metodval, vanliga fällor).

## Figurer värda att minnas   (valfri)

1–3 st ::: figur-block KOPIERADE ORDAGRANT ur kapitlets avsnittsfiler
(de är redan granskade). Rita INTE nya SVG:er. Även ett befintligt
::: graf-block får kopieras ordagrant om det är centralt för kapitlet.
Sätt en kort ledtext före varje figur.

## Inför provet

Checklista "Kan du …?" — 6–10 punkter som täcker kapitlets kärna.
```

Typografiregler (från CLAUDE.md — gäller fullt ut):
- md-filer: ENKLA backslash i KaTeX (`\frac`), inline-math `$…$` på EN källrad.
- Variabel + värde + enhet alltid i math-block: `$g = 9{,}82\ \mathrm{m/s^2}$`.
- `F_G` med stort G; decimalkomma; NBSP i värde+enhet i löptext; inga emojis;
  aldrig title case; exakt noll skrivs `0`.
- Skriv `F_G`, `F_\text{drag}` — build-skriptet gör subscripts upright.

## Del 2: Spelpaketet — `data/repetition/fyN-K.js`

```js
window.REPETITION = window.REPETITION || {};
window.REPETITION['fy1-2'] = {
    course: 'Fysik nivå 1',      // eller 'Fysik nivå 2'
    courseCode: 'fy1',           // 'fy1' | 'fy2'
    chapter: 'Rörelse',          // exakt kapitelnamn ur data/katalog.js
    chapterNumber: 2,
    intro: 'En mening om vad spelet repeterar.',
    stations: [ /* 4–5 stationer, se typerna nedan */ ],
};
```

⚠️ JS-fil ⇒ ALLA backslash i KaTeX dubblas (`$\\dfrac{\\Delta s}{\\Delta t}$`).
Text-fält är "Rich text": vanlig text blandad med `$…$`-segment.
Decimalkomma i KaTeX: `9{,}82`.

### Stationstyper

Välj 4–5 stationer med MINST 3 OLIKA typer. Ordna pedagogiskt:
begrepp → formler → tillämpning/sant-falskt sist.

**par** — para ihop vänsterkort med brickor (dra eller klicka):
```js
{ type: 'par', title: 'Para ihop formel och betydelse',
  instruktion: 'Dra rätt beskrivning till varje formel.',
  pairs: [ { a: '$v_m = \\dfrac{\\Delta s}{\\Delta t}$', b: 'Medelhastighet' }, … ] }
```
5–8 par. `a` = det fasta kortet (gärna formel), `b` = brickan.

**sortera** — dra brickor till rätt låda:
```js
{ type: 'sortera', title: 'Vektor eller skalär?',
  instruktion: 'Sortera storheterna i rätt låda.',
  bins: [ { name: 'Vektor', items: ['hastighet', …] },
          { name: 'Skalär', items: ['tid', …] } ] }
```
2–3 lådor, totalt 6–10 brickor.

**ordna** — ordna brickor i rätt följd (position 1 överst):
```js
{ type: 'ordna', title: 'Ordna efter fart',
  instruktion: 'Ordna hastigheterna från långsammast till snabbast.',
  etikettStart: 'långsammast', etikettSlut: 'snabbast',
  items: ['18 km/h', '10 m/s', …] }   // i KORREKT ordning — blandas av motorn
```
4–7 brickor. Bra för storleksordning, processteg, spektrum, energikedjor.

**lucka** — fyll luckan i påståenden/formler med rätt bricka:
```js
{ type: 'lucka', title: 'Vad ger diagrammet?',
  instruktion: 'Dra rätt storhet till varje lucka.',
  formler: [ { fore: 'Lutningen i ett $s$-$t$-diagram ger', efter: '.', svar: 'hastigheten' }, … ],
  distraktorer: ['tiden', 'medelfarten'] }
```
4–6 rader + 1–3 distraktorer. `fore`/`efter` får vara tomma strängar.

**blixt** — sant eller falskt, ett påstående i taget:
```js
{ type: 'blixt', title: 'Sant eller falskt?',
  instruktion: 'Avgör om påståendet stämmer.',
  pastaenden: [ { text: 'Vid fritt fall i vakuum faller alla föremål lika fort.',
                 sant: true, varfor: 'Utan luftmotstånd får alla föremål accelerationen $g$.' }, … ] }
```
6–8 påståenden, blanda sanna/falska. `varfor` = 1 menings förklaring
(börja INTE med "Rätt!"/"Fel!" — motorn sätter etiketten).

### Kvalitetsregler för spelinnehållet
- Inget svar får avslöjas av formuleringen eller ordningen.
- Brickor inom en station måste vara entydiga — bara EN bricka får passa
  per plats (kontrollera särskilt par/lucka: inga två svar som båda vore rätt).
- Korta brickor (max ~6 ord); formler hellre än prosa.
- Samma typografiregler som ovan (inga emojis, decimalkomma, kursiva
  variabler via `$…$`, enheter rakt).
- Täck kapitlets KÄRNA — det man måste kunna på provet, inte kuriosa.
