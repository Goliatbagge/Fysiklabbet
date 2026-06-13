# CLAUDE.md - Fysiklabbet

Interaktiva fysiksimuleringar för gymnasieelever (Fysik 1 & 2).

## Tech Stack

- **Frontend**: Standalone HTML med React 18 (CDN), TailwindCSS (CDN)
- **Språk**: Svenska, kommatecken som decimalavskiljare (5,00 inte 5.00)
- **3D**: Three.js för vissa simuleringar
- **Styling**: `styles.css` (gemensam navigation/layout/tema), `styles-laborans.css` (papper-tema)
- **Teckensnitt**: Poppins (canvas + UI)

## Kommandon

```bash
# Verifiera navigation i alla filer (KÖR FÖRE COMMIT!)
node .claude/verify-navigation.js

# Verifiera att inga vita konturer/halor finns runt etiketter/pilar på
# ljusa scenbakgrunder (KÖR FÖRE COMMIT!)
node .claude/verify-no-white-outline.js

# Bygg teori-bundle efter ändringar i data/teori/*.md (KÖR FÖRE COMMIT!)
node data/teori/build.js

# Öppna simulering i webbläsare
start [filnamn].html

# Lokal utvecklingsserver (cache avstängd — använd ALLTID denna, inte
# `python -m http.server` som låter webbläsaren cacha gamla filer)
python .claude/dev-server.py 8000
```

## ⚠️ KRITISK: Bygg teori-bundle efter md-ändringar

`data/teori/*.md` läses INTE direkt — katalogen läser `data/teori/bundle.js`,
genererad av `data/teori/build.js`. **Efter varje ändring i en md-fil måste
du köra `node data/teori/build.js`** — annars ser sidan fortfarande gamla
texten. Vanlig fälla: man fixar en typografisk detalj, laddar om sidan,
ser fortfarande felet, och tror att fixet inte fungerade. Ingen
auto-reload; lägg det som rutin efter md-redigeringar.

## ⚠️ KRITISK: Navigation i ALLA HTML-filer

**Varje HTML-simulering MÅSTE innehålla:**

1. I `<head>`: `<link rel="stylesheet" href="styles.css">`

2. Direkt efter `<body>`:
```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="logo">
            <span class="logo-icon">⚛️</span>
            <span class="logo-text">Fysiklabbet</span>
        </a>
        <ul class="nav-menu">
            <li><a href="index.html" class="nav-link">Hem</a></li>
            <li><a href="fysik1.html" class="nav-link active">Fysik 1</a></li>
            <li><a href="fysik2.html" class="nav-link">Fysik 2</a></li>
            <li><a href="om.html" class="nav-link">Om</a></li>
        </ul>
    </div>
</nav>
```

3. **Uppdatera** `.claude/verify-navigation.js` — lägg till filnamnet i `HTML_FILES_TO_CHECK`

4. Direkt före `</body>`: `<script src="feedback.js" defer></script>` (feedback-widget)

## Projektstruktur

```
fysiklabbet/
├── index.html              # Startsida
├── fysik1.html             # Fysik 1 översikt
├── fysik2.html             # Fysik 2 översikt
├── fysik1-*.html           # Fysik 1 simuleringar
├── fysik2-*.html           # Fysik 2 simuleringar
├── styles.css              # Gemensam CSS
├── OVNINGAR.md             # Guide för övningar per avsnitt
└── .claude/
    ├── verify-navigation.js    # Navigationsverifiering
    ├── commands/               # Slash-commands
    └── agents/                 # Specialiserade agenter
```

## Typografi (master)

### Versaler
ALDRIG title case på svenska — endast första ordet i mening/rubrik med stor bokstav.
- ✓ "Elektrostatisk induktion"  ✗ "Elektrostatisk Induktion"
- ✓ "Visa laddningar"  ✗ "Visa Laddningar"

### Variabler och enheter
- **Fysikaliska variabler**: alltid *kursiv* — *F*, *Q*, *r*, *v*, *a*
- **Enheter**: alltid rakt — N, C, m/s, kg/m³
- **Konstanter har också benämning** — t.ex. *G* (gravitationskonstanten),
  *k* (Coulombs konstant), σ (Stefan–Boltzmanns konstant). Skriv aldrig
  bara symbolen utan att i närheten ange namn och värde med enhet.
- **Komponent-etiketter är INTE variabler** — bokstäver som identifierar
  ett objekt (inte en storhet) skrivs rakt:
  - L₁, L₂ (Lampa 1, Lampa 2) — rakt
  - A (amperemeter), V (voltmeter) — rakt
  - R₁, R₂ (resistans 1, 2) — *kursivt* (resistans är en storhet)
  - U, I, Q, P — *kursivt* (alla fysikaliska storheter)

  Tumregel: kan man säga "*storheten X*" om bokstaven (spänningen *U*,
  strömmen *I*, resistansen *R*)? Då är det variabel → kursiv. Är det
  ett *namn* på ett objekt (Lampa, Amperemeter)? Då är det etikett → rakt.

- **Variabler i inline-SVG-figurer**: kursiveringen gäller även i
  `<text>`-element i SVG, inte bara i markdown och KaTeX. Bokstaven i
  ett SVG-tal som "*v*₁ = 3,0 m/s" eller "*λ*₂ = 8,0 m" måste vara
  kursiv — wrappa den i `<tspan font-style="italic">v</tspan>₁ = 3,0 m/s`.
  SVG ärver inte `font-style` från omgivande HTML/CSS, så utan
  uttryckligt `font-style="italic"` (på `<text>` eller `<tspan>`) renderas
  variabeln rakt. Vanligaste fällan: man skriver in Unicode-subscript
  direkt i strängen (`λ₁`, `v₁`) och glömmer att kursivera bokstaven.
  Granska alltid figuren genom en skärmdump och kontrollera att varje
  variabel ser ut som "*v*", inte "v".

  **ALDRIG `font-style="italic"` på ett helt `<text>`-element som
  innehåller `= värde enhet`** — då blir mätetalet och enheten också
  kursiverade ("*I* = *4,0 A*" istället för "*I* = 4,0 A"). Detta är
  den vanligaste figurbuggen. Två säkra mönster:

  1. **Använd helpern `sceneQty(label)`** (eller `sceneVar(label)` för
     ren variabel utan värde). Den finns i `data/ovningar.js` och
     kursiverar bara variabeldelen före `' = '`. Använd den i alla
     figur-helpers (`makeBField`, `makeRefraction`, `makeForceDiagram`
     m.fl. gör det redan).
  2. **Skriv `<tspan>` manuellt** i rå-SVG: lägg italic på `<tspan>`,
     **inte** på `<text>`:
     ```html
     <!-- RÄTT -->
     <text font-size="13"><tspan font-style="italic">I</tspan> = 4,0 A</text>
     <!-- FEL -->
     <text font-size="13" font-style="italic">I = 4,0 A</text>
     ```

### Subscript

- **Sifferindex**: Unicode (Q₁, Q₂, v₀) eller `F_1` i math-block.
- **Bokstavsindex i löptext**: alltid math-block `$F_G$`, aldrig `*F*_G`
  (markdown sväljer underscore-tecknet och G blir kvar med `_` framför).
  Gäller även Unicode-tecken som ρ, σ, μ — skriv `$\rho_\text{guld}$`,
  inte `ρ_guld`.
- **Upright vs kursiv subscript**: bokstavs-subscript som är etikett (N,
  G, R, drag) ska renderas upright med `\mathrm{}`, inte kursivt.
  Build-skriptet `data/teori/build.js` har `uprightSubscripts()` som
  **automatiskt** konverterar `F_G` → `F_\mathrm{G}` i teori-bundeln —
  skriv enkelt `F_G`, `F_\text{drag}`. Siffror lämnas oförändrade.
- I `data/ovningar.js` finns ingen sådan transform — där måste du själv
  skriva `F_\\mathrm{G}` (med dubbelt backslash, se nedan).

### Standardbeteckningar för krafter

- **Tyngdkraften betecknas ALLTID `F_G` med STORT `G`** — aldrig `F_g`
  (litet g). Litet `g` är *tyngdfaktorn* (9,82 N/kg), en helt annan storhet;
  använder man `F_g` blandar man ihop kraften med faktorn. Gäller överallt:
  md-teori, `data/ovningar.js`, KaTeX, JSX-formelkort, canvas- och
  SVG-etiketter (`<tspan>G</tspan>`, inte `g`). `G` är en upright
  etikett-subscript (se ovan), så `F_\mathrm{G}` i ovningar.js / rå-KaTeX.
- Övriga vedertagna kraftbeteckningar: normalkraft `F_N`, spännkraft `F_S`,
  friktionskraft `F_f`, resulterande kraft `F_R`, elektrisk kraft `F_e`.

### Hårt mellanslag (NBSP) i löptext

Använd NBSP (U+00A0) eller pakka i math-block (`$…$`) för att förhindra
radbrytning mellan ihörande element. Math-blocket har `white-space: nowrap`
(regel i `styles-laborans.css`) → hela uttrycket flyttas tillsammans.
**Rör inte den CSS-regeln** utan att samtidigt återinföra NBSP överallt.

Tre fall där radbrytning måste förhindras:

1. **Tusentalsgrupper**: `10 000 Pa` (NBSP), inte `10000 Pa`. Vid flera
   grupper i samma tal (`10 130 000`) — *alla* mellanslag är NBSP.
2. **Värde + enhet**: `5,0 m/s` (NBSP mellan 5,0 och m/s). Gäller också
   `100 °C`, `180°`, `5 %`, `3 st`.
3. **Variabel + värde + enhet**: ALLTID math-block — `$g = 9{,}82\ \mathrm{N/kg}$`.
   Gäller alla operatorer: `=`, `≈` (`\approx`), `<`, `>`, `≤` (`\leq`),
   `≥`, `∝` (`\propto`), `≠`.

Math-block ($...$) är immuna mot NBSP-behov — inom KaTeX används `\,`
som tunt skyddande tusentalsavgränsare (`2\,700`).

**Anti-mönster** (vanligast): `(m = 150 g)` i parentes — varken kursiv eller
math. Rätt: `($m = 150\ \mathrm{g}$)` i md, `($m = 150\\ \\mathrm{g}$)` i JS.
Stanna alltid upp vid "(*m* = …)", "(*V* = …)", "(*t* = …)"-mönster och
pakka hela parentesen i math-block.

4. **Öppningsparentes direkt före inline-formel** — `($q_e = …$)`. KaTeX
   renderar formeln som inline-block, så webbläsaren får bryta raden mellan
   `(` och formeln → `(` blir ensam kvar i radslutet. **Detta hanteras numera
   automatiskt** av `restoreMath()` i `katalog.html`, som limmar ihop `(` med
   den efterföljande inline-formeln i en `.math-paren`-nowrap-span (CSS i
   `styles-laborans.css`). Du behöver alltså *inte* göra något särskilt i
   md/JS — men **rör inte** den regeln eller CSS-klassen utan att förstå
   detta. Skriver du rå inline-HTML/SVG (utanför markdown-pipelinen) gäller
   inte automatiken: lägg då parentesen *inuti* formeln, `$(q_e = …$`.

### JS-strängar: dubbla alla backslash

I `data/ovningar.js` (och andra `.js`-filer där KaTeX-källa ligger i
template literals): **alla backslash dubblas**, annars sväljer JS dem och
KaTeX får råtext. I `.md`-filer används enkla backslash.

- md: `Räkna med $g = 9{,}82\ \mathrm{N/kg}$.`
- JS: `` `Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.` ``

Gäller alla KaTeX-kommandon: `\\cdot`, `\\frac`, `\\sqrt`, `\\left`,
`\\right`, `\\sin`, `\\alpha`, `\\mathrm`, `\\,` osv. Titta i grannraderna
— om de använder `\\cdot` ska din också göra det.

### Decimalformatering

```javascript
const formatNumber = (num, decimals = 2) => num.toFixed(decimals).replace('.', ',');
```

Tusentalsavgränsare-helper (NBSP):
```javascript
function fmtNum(n, d) {
    const s = n.toFixed(d);
    const [intp, frac] = s.split('.');
    const withSpaces = intp.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return frac !== undefined ? withSpaces + ',' + frac : withSpaces;
}
```

### Deluppgifter (a, b, c …) i frågor

När en frågestam fortsätter i punkter a), b), c) … som **bygger vidare på
stammen** (t.ex. "Vad är SI-enheten för a) hastighet, b) volym?") ska
deluppgifterna stå på **ny rad** efter stammen — inte inbäddade i samma
mening. Lägg en hård radbrytning **`<br>`** direkt före "a)". Markdown-
pipelinen kör `marked` med `breaks: false` (se `katalog.html`), så ett
vanligt radslut räcker *inte* — det måste vara `<br>` (eller två avslutande
blanksteg).

Deluppgifterna *flödar* sedan som löptext på nästa rad: korta alternativ
(`a) hastighet b) volym`) ryms bredvid varandra; om de inte får plats
bryter nästa deluppgift automatiskt till egen rad. Skriv dem alltså som
vanlig text efter brytningen — inte tvunget en per rad.

**Inget komma mellan deluppgifterna.** Skilj dem i stället åt med en
tab-liknande lucka **`&emsp;&emsp;`** (två em-blanksteg, ≈ 2 em) så de får
luft i sidled. Ett vanligt tabbtecken ger ingen synlig bredd i HTML.

- ✓ `**Vad är SI-enheten för<br>a) hastighet&emsp;&emsp;b) volym?**`
- ✗ `**Vad är SI-enheten för a) hastighet, b) volym?**`

Gäller både teori-exemplens frågor (`::: exempel` i `data/teori/*.md`) och
`question`-strängarna i `data/ovningar.js`. **Undantag:** när a)/b) är
inflätade som separata satser mitt i en mening ("Vilken a) acceleration får
vikterna, b) spännkraft …?"), eller redan är en uppräknad lista av korta
alternativ — då behålls inline-formen.

## Simuleringsmönster

Alla simuleringar följer samma struktur:
1. Navigation (mall ovan)
2. Breadcrumb: `Hem / Fysik X / [Namn]`
3. Titel + introduktion
4. `<div id="root">` för React-app
5. React-komponenter: Simulation, Controls, Results, Explanation
6. Footer

### Standardlayout (icke-fullskärm)

Visualiseringen vänster, sidopanel med reglage höger. På smal skärm:
sidopanelen flyter ner under visualiseringen.

```jsx
<main className="flex-grow flex flex-col lg:flex-row px-4 sm:px-6 pb-6 gap-6 max-w-7xl mx-auto w-full">
    <div className="flex-grow lg:w-2/3 xl:w-3/4 min-h-[400px] order-1">
        <SimulationView ... />
    </div>
    <div className="lg:w-1/3 xl:w-1/4 flex-shrink-0 order-2">
        <ControlsView ... />
    </div>
</main>
```

**Anti-mönster**: enbart flytande kontrollpanel inne i scenen i icke-
fullskärmsläget — reglagen blir otillgängliga. Flytande panel är ENDAST
för fullskärm.

Referensimpl: `fysik2-brytning-app.html`, `fysik2-fotoelektrisk-effekt.html`.

### Fullskärmsläge

Varje sim ska ha fullskärmsläge. **All interaktion måste vara möjlig även i
fullskärm** — fullskärm får aldrig bli ett "titta-men-rör-inte"-läge.

⚠️ **PLACERINGSREGEL (gäller ALLA simuleringar):** I fullskärm placeras
reglagen efter typ, så att de inte skymmer scenen:

- **Glidare/reglage (och sifferfält) → en hopfällbar panel (dropdown) i
  scenens UNDERKANT** (`.fs-controls` + `.fs-toggle-handle`). Användaren kan
  fälla ihop den med "Dölj reglage".
- **Kryssrutor och radioknappar (visningsval, lägesval) → en ruta UPPE TILL
  HÖGER** på scenytan (`.scene-toggles`). Denna ruta visas i både normalt
  läge och fullskärm.
- Fullskärmsknappen (`.fs-btn`) sitter uppe till vänster.

Så: kontinuerliga värden nere, diskreta val uppe till höger, fullskärm uppe
till vänster — inga överlapp. Referensimpl: `fysik2-konisk-pendel-app.html`,
`fysik1-vektoraddition-app.html`.

Krav på mönstret:

1. Scen-wrapper (`.scene-wrap`) med `position: relative` och
   `:fullscreen`/`:-webkit-full-screen` som sätter `100vw/100vh`.
   **För SVG-/HTML-scener (inte THREE.js):** `body.lab-sim .scene-wrap` har
   som standard en MÖRK gradient-bakgrund. En ljus pappersscen kräver
   attributet `data-theme="ljusPapper"` på scen-wrappern
   (`<div className="scene-wrap" data-theme="ljusPapper">`) — annars blir
   bakgrunden marinblå och dina mörka pilar/etiketter syns knappt. Gäller
   även i fullskärm. THREE.js-sims slipper detta eftersom canvasen fyller
   wrappern med sin egen `scene.background`.
   ⚠️ **Scope `width:100%`-regeln till DIREKTA scen-svg:n.** En regel som
   `.scene-wrap svg { width:100%; height:100% }` träffar **även ikon-svg:n
   inne i `.fs-btn`** och blåser upp den från 18 px till hela 40 px-cirkeln —
   kanterna spiller utanför cirkeln och fullskärmsikonen ser fel ut jämfört
   med övriga sims. Använd barnselektorn `.scene-wrap > svg { width:100% }`
   så att bara scenens egen svg fylls, inte knapparnas ikoner.
2. Fullskärmsknapp (`.fs-btn`) i ett hörn → `el.requestFullscreen()`.
   **Ikonen ska vara IDENTISK på alla simuleringar** — exakt samma som på
   `fysik2-fotoelektrisk-effekt.html` (referens). Hitta ALDRIG på en egen
   fullskärmsikon. **Använd ALLTID klassen `fs-btn`** — den är globalt stylad i
   `styles-laborans-sim.css` till en cirkulär ikon-knapp (40 px, vit
   cirkel, ink-ikon, uppe till vänster). **Definiera ALDRIG en egen lokal
   `.fs-btn`-CSS** och lägg **ingen text** i knappen — bara expandera/
   komprimera-ikon-SVG:n (annars spiller texten ut under cirkeln och varje
   sim ser olika ut). Exakt mönster (kopiera från
   `fysik2-fotoelektrisk-effekt.html` eller `fysik2-konisk-pendel-app.html`):
   ```jsx
   <button className="fs-btn" onClick={toggleFullscreen} aria-label="Fullskärm"
           title={isFullscreen ? 'Lämna fullskärm' : 'Fullskärm'}>
     {isFullscreen ? (
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/>
       </svg>
     ) : (
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/>
       </svg>
     )}
   </button>
   ```
3. Flytande kontrollpanel (`.fs-controls`) absolut positionerad,
   innehållande de viktigaste reglagen.
4. Visa/dölj-knapp (`.fs-toggle-handle`) — användaren kan minimera panelen.
5. Tunga/sällan använda kontroller stannar i sidopanelen utanför scenen.
6. `user-select: none` på scen-wrappern (förhindrar att etiketter markeras
   blått när användaren drar i scenen).

Komplett CSS- och React-mall: kopiera från `fysik2-fotoelektrisk-effekt.html`
eller `fysik2-brytning-app.html`.

### Inga överlappande objekt

UI-element får aldrig ligga ovanpå varandra. Testa både normalt OCH
fullskärmsläge på både bred och smal skärm innan klart.

Vanliga fällor:
- SVG-etikett (t.ex. "Medium 1") kolliderar med fullskärmsknappen i samma
  hörn → flytta etiketten åt höger/nedåt.
- Flytande panel täcker det eleven faktiskt vill se → toggle-knapp.
- Vinkeletiketter (i₁, b₁) hamnar på strålarna → större etikettradie.
- Formel i headern upprepas i sidopanelen → välj en plats, inte båda.

### ⛔ FÖRBJUDET: vit kontur/halo runt text och pilar på ljus scenbakgrund

**Detta är ett ÅTERKOMMANDE fel som upprepade gånger har påpekats och rättats
— gör det INTE igen.** På ljusa scenbakgrunder (t.ex. "Laborans papper"
`#f7f2e8` → `#ece3d2`, men även ljus himmel/mark i andra scener) får SVG-
textetiketter och pilar **ALDRIG** en vit eller nästan-vit kontur/halo:

- ✗ `stroke="#ffffff"` / `stroke="#fff"` / `stroke="white"` på `<text>`,
  `<tspan>`, `<line>` eller `<polygon>` som utgör en etikett/pil
- ✗ `paintOrder: 'stroke'` (eller `paint-order: stroke`) kombinerat med vit
  `stroke`
- ✗ `WebkitTextStroke` eller `text-shadow` i vitt/ljust

Mot en redan ljus botten gör konturen ingen nytta — den lägger bara en
suddig vit gloria runt texten/pilen och gör den **svårare** att läsa, inte
lättare. Körs `node .claude/verify-no-white-outline.js` (se "Kommandon")
före varje commit för att fånga detta maskinellt.

Lösning, i prioritetsordning:

1. **Mörk/mättad textfärg** (bläck, eller komponentens egen kraft-/
   accelerationsfärg) räcker för kontrast mot ljus bakgrund — **ingen
   kontur alls**. Förstahandsvalet, nästan alltid rätt.
2. **OBS – även en ljus papperston-halo läses som vit gloria.** På en
   pappers-*gradient* (`#f7f2e8` → `#ece3d2`) är `#f3eee4` ljusare än botten
   i nedre halvan av scenen, så en `#f3eee4`-halo syns där som en suddig vit
   ring runt texten — exakt det fel användaren upprepat påpekar. Använd
   **ingen halo som standard**, ens i papperston. Endast om en etikett
   faktiskt korsar rörliga figurdelar (skrollande golvmarkeringar,
   luftpartiklar) och punkt 3 inte räcker: lägg en *ultratunn* halo
   (`strokeWidth 2`) i tonen för den **lokala** bakgrunden just där etiketten
   sitter (inte en generell ljus ton) — och granska i skärmdump att den inte
   ser vit ut. Vid minsta tveksamhet: ta bort halon.
3. **Hellre flytta etiketten till en lugn yta** än att lösa en kollision
   (etikett ovanpå figur/objekt) med kontur. En etikett som hamnar ovanpå
   t.ex. en röd bil löses genom att flytta etiketten till himlen/vägen ovan/
   under pilen — inte genom att lägga en kontur runt den.

Samma princip gäller pilkonturer (`Arrow`-komponenter): på ljus bakgrund
räcker pilens egen färg. En tunn bläckfärgad kantlinje
(`rgba(15,22,32,0.18)`) kan användas enbart där pilen korsar andra
figurdelar (kärra, hjul) för lite separation — aldrig en tjock vit kontur.

**Undantag (legitima vita konturer, INTE detta fel):** vita ikon-strokes på
*mörka* knappar/scener (t.ex. `.fs-btn`-fullskärmsikonen, ljud-knappen,
muspekar-cursors), eller dekorativa effekter på riktigt mörka ytor (t.ex.
en grön LED-display). Avgör alltid utifrån den FAKTISKA bakgrunden bakom
elementet — inte filens generella tema.

### Formelpresentation

Gäller överallt formler visas (ingress, header, paneler, förklaringar):

1. **Raka divisionsstreck** — aldrig `/` mellan täljare och nämnare.
   Snedstreck endast i sammansatta enheter (`m/s`, `kg/m³`).
2. **Definiera beteckningar med ord-etikett ovanför/under variabeln**
   (OBLIGATORISKT, inte valfritt). Varje variabel i formelkortet får sitt
   *namn* satt som en liten etikett **direkt ovanför täljaren och under
   nämnaren** (och ovanför/intill resultatvariabeln) — t.ex. MASSA över
   *m*, VOLYM under *V*, RESULTERANDE KRAFT över *F*_R. Exakt som i
   densitets- och Newtons andra lag-korten. Det räcker INTE att bara skriva
   `a = F/m = värde` med symbolerna — varje symbol ska ha sitt ord.
   En intilliggande lista (`där …`) är endast nödfallsutväg när utrymmet är
   för trångt; förstahandsvalet är alltid etikett över/under. **Gäller även
   React/JSX-formelkort i headern**, inte bara canvas/densitet — använd
   `.flbl`-spann över/under variabel-spannen. Vanlig fälla: man bygger ett
   snabbt JSX-bråk `a = F/m` utan ord-etiketter — det är fel.
3. **Insatta värden har SI-enheter** — `5,0 kg`, inte bara `5,0`.
4. **Variabler kursiv, enheter rakt** (se Typografi).
5. **Multiplikationstecken `⋅` (U+22C5) skrivs alltid ut** mellan faktorer
   — `n₁ · sin i`, `F = G · m₁ · m₂ / r²`. Undantag: implicit multiplikation
   inom funktionsargument (`sin i`).
6. **Operatorer i nivå med variablerna** — i formelkort med etiketter
   ovanför variablerna: använd `items-end` (inte `items-center`) på
   flex-containern så att `=`, `·`, `sin`, `+`, `−` ligger på variablernas
   baslinje.
7. **Vertikal linjering i fleruttrycks-formler (OBLIGATORISKT)** — när ett
   formelkort har flera former på rad (t.ex.
   `F_R = m · a  ⟺  a = F_R/m = värden = resultat`) eller **blandar
   variabler-med-ord-etikett och bråk**, ska ALLA delar ligga på *samma
   mittlinje*. Operatorer (`=`, `·`, `⟺`, `⟹`), bråk och variabler får
   aldrig hamna högre eller lägre än varandra. Lägg hela formeln på **EN
   `items-center`-rad** (inte separata grupper med olika alignment).
   ⚠️ Vanligaste fällan: en variabel med ord-etikett *ovanför* (utan
   motvikt under) trycks ned **under** bråkens mittlinje, så vänsterledet
   hamnar lägre än högerledet. Lös det med en **osynlig spacer-etikett
   under symbolen** (lika hög som etiketten) så att symbolen centreras i
   sin ruta:
   ```jsx
   <div className="flex flex-col items-center">
     <span className="flbl">Massa</span>
     <span className="fnum"><em>m</em></span>
     <span className="flbl" aria-hidden="true" style={{visibility:'hidden'}}>Massa</span>
   </div>
   ```
   Referensimpl: `fysik1-newtons-andra-app.html` (`Vbl`/`Frac`-helpers).

Mönster (densitetssimuleringen är referens):

```
        Massa
ρ  =     m       =     5,0 kg       =   1 000 kg/m³
       ─────         ─────────
         V            0,005 m³
        Volym
```

I JSX: stackad layout, `borderTop: '2px solid currentColor'` mellan
täljare och nämnare. I canvas: rita en horisontell linje, inte `/`.

**Central formel ska ligga i formelkort i headern**, direkt under
ingressparagrafen — inte gömd i sidopanelen, och inte inbäddad i
ingresstextens löptext med snedstreck. Referensimpl:
`fysik2-energinivaer.html`, `fysik1-densitet-app.html` (etiketter över/under)
och `fysik1-newtons-andra-app.html` (etiketter + *F*_R för resulterande kraft).

### Vektorpilar: hastighet vs kraft

**Hastighetsvektorer startar vid objektets KANT, inte vid tyngdpunkten.**
En *v*-pil (eller komposant *v*ₓ/*v*ᵧ) ritas så att dess bakkant ligger på
objektets rand i pilens riktning. Aldrig inifrån objektet. Gäller både
inline-SVG-figurer (övningar) och canvas/SVG-renderade simuleringar.

**Kraftvektorer startar däremot i angreppspunkten** (typiskt CM för
tyngd-/normalkraft, kontaktpunkten för friktion/normal mot underlag).
Kraftpilens *bas* får alltså ligga inuti kroppen — det är hela poängen
med en angreppspunkt.

Hur du applicerar i kod:

- För ett objekt med radie *r* och pil i riktning **û**: starta vid
  `(cx + r·ûₓ, cy + r·ûᵧ)`, inte `(cx, cy)`. (För SVG y-axeln: byt tecken
  på *y*-komponenten.)
- För rektangulära objekt (bilar, vagnar): använd halv-bredden längs
  pilens riktning som offset.

Helpers som redan följer regeln: `makeBField`, `makeProjectile`,
`makeCircularPath`, `makeCrest`, `makeLoop` (i `data/ovningar.js`).
Skriver du en ny helper eller ny canvas-sim med v-pilar måste du själv
implementera kant-offseten. **Granska alltid skärmdump** och verifiera
att hastighetspilen kommer från kanten, inte mitten.

### Diagramkonventioner (svensk fysik/matte-standard)

1. **Axelfärg**: x-axel (y=0) och y-axel (x=0) ljusblå/cyan (`#38bdf8`).
2. **X-axel-etiketter** placeras direkt **under x-axeln (y=0)**, inte
   längst ned i diagrammet.
3. **Symmetrisk skala** om negativa värden visas (-12 till +12, inte
   -12 till +2).
4. **Axeletiketter måste få plats INOM viewBox/ramen.** Vanlig fälla:
   en x-label "t (s)" eller "a (m/s²)" placeras inline efter pilspetsen
   med `text-anchor="start"` på en *x*-position så nära viewBox-höger
   att texten sticker ut till höger. Eller en y-label med en stor
   bokstav (Φ, Σ, β) placeras med en *y*-position så nära viewBox-topp
   att glyfens topp sticker över. **Använd `text-anchor="end"`** med
   *x* nära men inom högerkant (`x = W - 6`), och placera y-label
   **tillräckligt nedanför** topp-kanten (`y = padT - 8`, inte
   `padT - 18`) så att stora glyfer ryms.

```javascript
const xAxisLabelY = (minY < 0 && maxY > 0)
    ? height - padding.bottom - ((0 - minY) / range) * graphHeight + 16
    : height - padding.bottom + 16;
```

### Skärmdumpsverifiering av figurer

Innan du markerar en figur (diagram, scen, SVG-helper-output) som klar:
**generera en PNG-skärmdump via headless Chrome och inspektera den
visuellt.** SVG-källan kan se rätt ut samtidigt som rendering visar att
texter sticker utanför ramen, ligger på linjer, eller överlappar
varandra.

```powershell
# Skapa förhandsvisning (.html i .shots/)
# Skjut sedan en skärmdump:
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --hide-scrollbars `
  --window-size=900,1200 `
  --screenshot="C:\claude\Fysiklabbet\.shots\name.png" `
  "http://localhost:8000/.shots/name.html"
```

Vid varje skärmdumpsgranskning, kontrollera **systematiskt**:

1. **Inga texter sticker ut över ramen** (varken viewBox-kant eller en
   `<rect>`/`<svg border>`). Gäller särskilt:
   - X-axelns label vid högerkant.
   - Y-axelns label vid övre kant (Φ, β, Σ är extra höga glyfer).
   - Tick-labels längst ute (t.ex. "10" på y=10 längst upp).
2. **Inga texter på linjer eller andra figurdelar** (regeln finns
   utförligt i `OVNINGAR.md`). Speciellt: wire-/laddningsetiketter i
   scener med parallella fältlinjer måste hamna *mellan* linjer.
3. **Inga texter överlappar varandra.**
4. **Vektorpilar från objektkant, inte från CM** (för hastighet) — se
   regel ovan.
5. **Fältlinjepilar i samma kolumn/rad** (vinkelrätt mot fältriktningen)
   och **homogen täthet** mellan parallella fältlinjer.
6. **Formelkort linjerat på en mittlinje** — alla led, operatorer (`=`,
   `·`, `⟺`, `⟹`) och bråk ligger på samma nivå; inget högerled hamnar
   högre/lägre än vänsterledet, och varje variabel har sin ord-etikett
   över/under (se Formelpresentation punkt 2 och 7).
7. **Ingen vit kontur/halo runt etiketter eller pilar på ljus
   scenbakgrund** — kontrollera att texter och pilar inte har en suddig vit
   gloria runt sig (se "⛔ FÖRBJUDET: vit kontur/halo..." ovan). Kör även
   `node .claude/verify-no-white-outline.js`.

Markera först som klart när skärmdumpen passerar alla sju kontroller.

## Fysikämnen

### Fysik 1
- Rörelse: hastighet-tid, sträcka-tid, rörelsediagram
- Kraft: Newtons lagar, tyngdfaktor
- Tryck: atmosfärstryck, Magdeburgska halvklot
- Arkimedes princip, densitet
- Ellära, värme, influens

### Fysik 2
- Rörelse i gravitationsfält
- Magnetfält, magnetisk kraft på ledare
- Vågor: brytning, stående våg
- Pendlar: matematisk, konisk
- Jordmagnetiska fältet

## Sökruta och nyckelord

Startsidan (`index.html`) har en sökruta som filtrerar simuleringar i realtid.
Varje sim finns i `SIMULATIONS`-arrayen i bottnen av `index.html`.

Varje ny simulering MÅSTE få lämpliga `keywords`:
- **Huvudområde** (ett av: `rörelse`, `krafter`, `densitet`, `tryck`,
  `värme`, `ellära`, `kärnfysik`, `vågor`, `optik`, `elektromagnetism`,
  `magnetism`, `modern fysik`, `kvantfysik`, `atomfysik`, `astronomi`,
  `mekanik`, `termodynamik`).
- **Specifika begrepp** (t.ex. `coulomb`, `halveringstid`, `interferens`).
- **Synonymer/vardagsuttryck** (både `elektricitet` och `ellära`).
- Gemener och svenska tecken — sökningen normaliserar å/ä/ö automatiskt.

```javascript
{ title: "Halveringstid", description: "...", href: "fysik1-halveringstid.html",
  icon: "⏳", course: "Fysik 1",
  keywords: ["kärnfysik", "atomfysik", "halveringstid", "radioaktivitet",
             "exponentiell", "sönderfall", "strålning"] }
```

## Checklista: Ny simulering

1. [ ] Kopiera navigation från mall
2. [ ] Lägg till `<link rel="stylesheet" href="styles.css">`
3. [ ] Använd korrekt breadcrumb
4. [ ] Uppdatera `verify-navigation.js` med filnamnet
5. [ ] Kör `node .claude/verify-navigation.js`
6. [ ] Lägg till kort i `fysik1.html` eller `fysik2.html`
7. [ ] Lägg till i `SIMULATIONS`-arrayen i `index.html` med `keywords`
8. [ ] Lägg till rad i "Senaste uppdateringar" i `index.html` (max 4–5 poster)
9. [ ] Testa i webbläsare (normalt OCH fullskärm, bred OCH smal skärm)
10. [ ] Verifiera decimalformatering (komma, inte punkt)
11. [ ] Testa att sökningen hittar simuleringen via minst ett nyckelord
12. [ ] Kör `node .claude/verify-no-white-outline.js` — inga vita konturer/
    halor runt etiketter eller pilar på ljus scenbakgrund

## Övningar

Se [`OVNINGAR.md`](OVNINGAR.md) för komplett guide:
- Nivåer N1/N2/N3 och kalibrering mot Impuls Fysik 1 / kursprov
- Antal per avsnitt (3 + 2 + 1) och formel-täckning
- Diagram-helper `makeDiagram` och kraftvektor-helper `makeForceDiagram`
- **Figurer ska ritas, inte beskrivas** — uppgifter med rumslig/geometrisk
  uppställning (kast, hävstång, cirkelrörelse, lutning, pendel, loop) ska ha
  en illustrerande figur. Mekanik-helpers: `makeProjectile`,
  `makeConicalPendulum`, `makeLever`, `makeTippingBox`, `makeTorqueArm`,
  `makeCircularPath`, `makeCrest`, `makeBankedCurve`, `makeLoop`, `makeSwing`,
  `makeLadder`, `makeClock`. Avslöja aldrig svaret i figuren. Etiketter
  (värden/beteckningar) får aldrig ligga på linjer/figurdelar — offsetta
  vinkelrätt ut. Granska alltid renderingen (skärmbild) före klart.
- Flervalsformat (`choices` + `correct`)
- Lösningsmall (formel → bracket → beräkning → svar)

## CDN-länkar (standard)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

För 3D: `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`
