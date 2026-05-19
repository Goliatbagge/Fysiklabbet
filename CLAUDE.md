# CLAUDE.md - Fysiklabbet

Interaktiva fysiksimuleringar för gymnasieelever (Fysik 1 & 2).

## Tech Stack

- **Frontend**: Standalone HTML med React 18 (CDN), TailwindCSS (CDN)
- **Språk**: Svenska, kommatecken som decimalavskiljare (5,00 inte 5.00)
- **Tusentalsavgränsare**: hårt mellanslag (NBSP, ` `) mellan tusentalsgrupper. Exempel: "5 000" (rätt), "5000" (fel). "10 000 Pa" (rätt), "10000 Pa" (fel). Gäller alla numeriska värden i sims, formler, resultat-paneler.
  - JS-helper: `function fmtNum(n, d) { const s = n.toFixed(d); const [intp, frac] = s.split('.'); const withSpaces = intp.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return frac !== undefined ? withSpaces + ',' + frac : withSpaces; }`
- **Versaler**: Använd ALDRIG "title case" (engelska versalregler). På svenska skrivs endast första ordet i en mening/rubrik med stor bokstav. Exempel:
  - ✓ "Elektrostatisk induktion" (korrekt)
  - ✗ "Elektrostatisk Induktion" (fel - title case)
  - ✓ "Visa laddningar" (korrekt)
  - ✗ "Visa Laddningar" (fel - title case)
- **3D**: Three.js för vissa simuleringar
- **Styling**: `styles.css` för gemensam design (navigation, layout, tema)

## Kommandon

```bash
# Verifiera navigation i alla filer (KÖR FÖRE COMMIT!)
node .claude/verify-navigation.js

# Öppna simulering i webbläsare
start [filnamn].html
```

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

3. **Uppdatera** `.claude/verify-navigation.js` - lägg till filnamnet i `HTML_FILES_TO_CHECK`

4. Direkt före `</body>`: `<script src="feedback.js" defer></script>` (lägger in feedback-widgeten)

## Projektstruktur

```
fysiklabbet/
├── index.html              # Startsida
├── fysik1.html             # Fysik 1 översikt
├── fysik2.html             # Fysik 2 översikt
├── fysik1-*.html           # Fysik 1 simuleringar
├── fysik2-*.html           # Fysik 2 simuleringar
├── styles.css              # Gemensam CSS
└── .claude/
    ├── verify-navigation.js    # Navigationsverifiering
    ├── commands/               # Slash-commands
    └── agents/                 # Specialiserade agenter
```

## Simuleringsmönster

Alla simuleringar följer samma struktur:
1. Navigation (från mall ovan)
2. Breadcrumb: `Hem / Fysik X / [Namn]`
3. Titel och introduktion
4. `<div id="root">` för React-app
5. React-komponenter: Simulation, Controls, Results, Explanation
6. Footer

### Standardlayout: visualisering + sidopanel (icke-fullskärmsläge)

I normalt (icke-fullskärm) läge ska varje simulering följa denna layout:

1. **Visualiseringen** ligger i ett block till vänster (på smala skärmar:
   överst). Den får ta så stor yta som möjligt utan att tränga ut sidopanelen.
2. **Reglagen** (sliders, knappar, materialval, lägen, resultatpaneler,
   förklaringar) ligger i ett **block till höger om visualiseringen** — inte
   inne i scenen. På mobila/smala skärmar flyter sidopanelen automatiskt ner
   under visualiseringen.
3. Fullskärmsknappen sitter alltid inne i scenen (även i icke-fullskärm).

Mönster för layout (huvudregel, samma för alla simuleringar):

```jsx
<main className="flex-grow flex flex-col lg:flex-row px-4 sm:px-6 pb-6 gap-6 max-w-7xl mx-auto w-full">
    {/* Visualisering */}
    <div className="flex-grow lg:w-2/3 xl:w-3/4 min-h-[400px] order-1">
        <SimulationView ... />
    </div>
    {/* Sidopanel med reglage */}
    <div className="lg:w-1/3 xl:w-1/4 flex-shrink-0 order-2">
        <ControlsView ... />
    </div>
</main>
```

**Anti-mönster:** att enbart visa en flytande kontrollpanel inne i scenen i
icke-fullskärmsläget (utan sidopanel) — då blir reglagen otillgängliga och
scenen "trångbodd". Den flytande panelen är ENDAST för fullskärmsläget.

Referensimplementation: `fysik2-brytning-app.html`, `fysik2-fotoelektrisk-effekt.html`.

### Fullskärmsläge och integrerade reglage

**Varje simulering ska ha ett fullskärmsläge** där visualiseringen kan ta upp hela
skärmen. De **viktigaste reglagen ska finnas inne i visualiseringen** (flytande
panel ovanpå scenen) så att man kommer åt dem även i fullskärmsläget.
Referensimplementation: `fysik2-fotoelektrisk-effekt.html` (se även
`fysik2-brytning-app.html`).

Krav:

1. **Wrapper med `position: relative;`** runt canvas/SVG. Lägg till CSS-klassen
   `.scene-wrap` med stöd för `:fullscreen` och `:-webkit-full-screen`-pseudoklasser
   (sätt `width/height` till `100vw/100vh` och ta bort `border-radius`).
2. **Fullskärmsknapp** (`.fs-btn`) i ett hörn av scenen som kallar
   `el.requestFullscreen()` / `document.exitFullscreen()`. Lyssna på
   `fullscreenchange`-eventet och uppdatera ikonen (utvidga ↔ komprimera).
3. **Flytande kontrollpanel** (`.fs-controls`) inuti scen-wrappern, absolut
   positionerad nära botten, med backdrop-blur och halvgenomskinlig bakgrund.
   Ska innehålla de viktigaste reglagen (det elever oftast behöver justera).
4. **Visa/dölj-knapp** (`.fs-toggle-handle`) som låter användaren minimera
   panelen om den skymmer scenen.
5. Tunga eller sällan använda kontroller (förklaringar, avancerade inställningar)
   kan ligga kvar i den vanliga sidopanelen utanför scenen — de behöver inte
   dupliceras i fullskärmspanelen.
6. **Förhindra textmarkering vid drag**: scen-wrappern ska ha
   `user-select: none` (alla varianter med vendor-prefix). Annars markeras
   etiketter ("Medium 1", axlar, m.m.) blått när användaren drar i scenen.

CSS-mönstret (kopiera från `fysik2-fotoelektrisk-effekt.html` eller
`fysik2-brytning-app.html`):

```css
.scene-wrap { position: relative; ... }
.scene-wrap:fullscreen, .scene-wrap:-webkit-full-screen {
    width: 100vw !important; height: 100vh !important; border-radius: 0;
}
.fs-btn { position: absolute; top: 14px; right: 14px; ... z-index: 5; }
.fs-controls { position: absolute; bottom: 62px; left: 50%;
    transform: translateX(-50%); ... z-index: 6; }
.fs-controls.collapsed { transform: translateX(-50%) translateY(...); opacity: 0; }
.fs-toggle-handle { position: absolute; bottom: 14px; left: 50%; ... z-index: 7; }
```

React-mönstret:

```jsx
const sceneWrapRef = useRef(null);
const [isFullscreen, setIsFullscreen] = useState(false);
const [controlsOpen, setControlsOpen] = useState(true);

useEffect(() => {
    const handler = () => setIsFullscreen(
        document.fullscreenElement === sceneWrapRef.current ||
        document.webkitFullscreenElement === sceneWrapRef.current
    );
    document.addEventListener('fullscreenchange', handler);
    document.addEventListener('webkitfullscreenchange', handler);
    return () => { /* cleanup */ };
}, []);

const toggleFullscreen = () => {
    const el = sceneWrapRef.current;
    const isFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (isFs) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
};
```

### Inga överlappande objekt

**UI-element får aldrig ligga ovanpå varandra.** Alla synliga objekt — knappar,
SVG-etiketter, paneler, formelrutor, ikoner, vinkelbågar, m.m. — ska ha sina
egna utrymmen och inte täcka eller skymma något annat objekt.

Vanliga fall att kontrollera:

1. **Fullskärmsknappen i ett hörn** — kontrollera att inga SVG-etiketter (t.ex.
   "Medium 1") börjar i samma hörn. Flytta etiketten åt höger eller nedåt så
   att den klarar knappen även på smala skärmar (typiskt `x ≥ 70` viewBox-
   units om knappen sitter i top-left med `left: 14px; width: 40px`).
2. **Flytande paneler vs visualisering** — den flytande kontrollpanelen
   (`.fs-controls`) i fullskärmsläget får inte täcka det som eleven faktiskt
   vill se (t.ex. strålgång, partikelbana). Använd toggle-knappen så
   användaren kan dölja panelen.
3. **Etiketter och bågar** — vinkeletiketter (i₁, b₁, …) får inte hamna
   ovanpå strålarna eller varandra. Använd större radie för etikettens
   placering om värden ska visas inline.
4. **Formelkort vs sidopanel** — om en formel finns i headern ska den inte
   också upprepas i sidopanelen.

I tveksamma fall: testa simuleringen i normalt läge OCH fullskärmsläge på både
bred och smal skärm innan du markerar arbetet som klart.

### Typografi och variabler

- **Teckensnitt**: Använd Poppins för text i canvas och UI-element
- **Fysikaliska variabler**: Ska ALLTID skrivas med *kursiv stil* (t.ex. *F*, *Q*, *r*, *v*, *a*)
- **Enheter**: Ska skrivas med rak stil (t.ex. N, C, m, m/s)
- **Subscript**: Använd Unicode-subscript för **sifferindex** (Q₁, Q₂, v₀, etc.)
  För **bokstavsindex** måste inline-LaTeX användas i markdown-genomgångar,
  inte `*F*_G`-mönstret — markdown tolkar `_G` som början på en kursiv-sektion
  och underscore-tecknet blir kvar synligt. Exempel:
  - ✓ `$F_G$` (renderas som *F* med G som subscript)
  - ✓ `$F_\text{drag}$` (för flerteckniga index)
  - ✓ `$F_{N1}$` (för index med både bokstav och siffra)
  - ✗ `*F*_G` (G blir kvar med underscore framför — fel)
  - ✗ `*F*_drag` (samma problem)

  Denna regel gäller löpande text i `data/teori/*.md`. I `$$ ... $$`-block
  fungerar `F_G` redan korrekt eftersom math-blocken skyddas från markdown-
  parsern (se `protectMath` i `katalog.html`/`avsnitt.html`).

- **Subscript-stil i math (KaTeX)**: när indexet är en **identifierare/etikett**
  (N, f, G, R, drag, tot, bom, …) och **inte en egen variabel**, ska det
  renderas **rakt** (upright), inte kursivt. KaTeX gör som standard alla
  bokstäver i math kursiva, även i subscript, vilket är fel för dessa fall.

  - ✓ `F_\mathrm{N}` (rendrerar som *F* med rak N)
  - ✓ `F_\mathrm{drag}` (rendrerar som *F* med rakt "drag")
  - ✗ `F_N` (rendrerar som *F* med kursiv N — fel, N är ingen variabel)

  Sifferindex (1, 2, 0, …) är redan upright i KaTeX som standard — lämna dem
  som `F_1`, `F_2`, `v_0`, etc.

  **Du behöver inte skriva `\mathrm{}` manuellt** i `data/teori/*.md`.
  Build-skriptet `data/teori/build.js` har en transformfunktion
  `uprightSubscripts()` som **automatiskt** omsluter bokstavs-subscripts med
  `\mathrm{}` när bundeln byggs. Skriv enkelt `F_G`, `F_N`, `F_\text{drag}` —
  build.js gör om till rätt upright-form. Siffror lämnas oförändrade.

```javascript
// I canvas: variabel i kursiv, värde i normal stil
ctx.font = 'italic 18px Poppins, sans-serif';
ctx.fillText('F', x, y);  // Variabel
ctx.font = '18px Poppins, sans-serif';
ctx.fillText(' = 5,0 N', x + 10, y);  // Värde med enhet
```

```html
<!-- Lägg till Poppins i head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
```

### Formelpresentation

**Gäller överallt där formler visas i en simulering** — introduktionstext, ingress, headern, formelpaneler, förklaringar, härledningar och resultatpaneler. Så fort en formel som `F = G·m₁m₂/r²`, `ρ = m/V` eller liknande dyker upp som en tydlig formel (inte bara som löpande text om en variabel) ska följande regler följas:

1. **Raka divisionsstreck** (horisontell bråkstreck) — använd ALDRIG snedstreck `/` mellan täljare och nämnare när formeln presenteras. Snedstreck är endast tillåtet i sammansatta enheter (t.ex. `m/s`, `kg/m³`).
   - ✓ ρ = *m* / *V* renderat som bråk med horisontellt streck
   - ✗ ρ = *m*/*V* med snedstreck
   - ✗ Att dölja en formel i ingress-texten med snedstreck "för att den är liten" — flytta då hellre formeln till en egen formelruta strax under ingressen.
2. **Definiera beteckningar** — varje variabel som förekommer i en formel ska förklaras med ord (antingen ovanför/under variabeln eller i en intilliggande lista). Exempel: ovanför *m* står "Massa", under *V* står "Volym".
3. **Enheter alltid med värden** — om formeln visas med insatta numeriska värden ska varje värde ha sin SI-enhet. Skriv `5,0 kg` och `0,005 m³`, inte `5,0` och `0,005`. Slutresultatet ska också ha enhet (t.ex. `1 000 kg/m³`).
4. **Variabler i kursiv, enheter rakt** (se Typografi-avsnittet ovan).
5. **Konstanter har också benämning** — t.ex. *G* (gravitationskonstanten), *k* (Coulombs konstant), σ (Stefan–Boltzmanns konstant). Skriv aldrig bara symbolen utan att i närheten också ange vad den heter och dess värde med enhet.
6. **Gångertecken (·) skrivs alltid ut** — använd alltid ett tydligt multiplikationstecken (`⋅`, U+22C5) mellan faktorer i en formel. Skriv `n₁ · sin i`, inte `n₁ sin i`. Skriv `F = G · m₁ · m₂ / r²`, inte `F = G m₁ m₂ / r²`. Detta gör formlerna entydiga och lättare att läsa, särskilt när variabelnamnen står tätt. Undantag: implicit multiplikation inom funktionsargument är OK (t.ex. `sin i` betyder sin tillämpat på *i*, inte sin gånger *i*).
7. **Operatorer i nivå med variabler** — i formelkort där varje variabel har en beskrivande etikett ovanför sig ska operatorer (`=`, `·`, `sin`, `+`, `−`) ligga i nivå med variablerna, inte centrerade vertikalt mellan etikett och variabel. Använd `items-end` istället för `items-center` på flex-containern, så att operatorerna och variablernas baslinjer hamnar i samma horisontella linje. Etiketterna får då flyta ovanför variablerna utan att operatorerna förskjuts uppåt.

Mönster att följa (se densitetssimuleringen för referensimplementation):

```
        Massa
ρ  =     m       =     5,0 kg       =   1 000 kg/m³
       ─────         ─────────
         V            0,005 m³
        Volym
```

Implementera bråk i React/JSX med stackad layout (täljare och nämnare i kolumn med `border-top` som divisionsstreck). I canvas: rita en horisontell linje mellan numerator och denominator istället för att skriva ut `/`.

**Introduktionstext (header/ingress):** Om formeln är central för simuleringen ska den lyftas ut ur löptexten till en egen formelruta direkt under ingressen, med raka bråkstreck och definierade beteckningar. Skriv inte hela formeln inbäddad i ingressmeningen — där räcker det att hänvisa till "formeln nedan" eller "Newtons gravitationslag".

**Formelkort högst upp på sidan:** När formeln är central för simuleringen (t.ex. Snells lag i brytning, *E*ₙ i energinivåer, *F* = *G m*₁*m*₂ / *r*² i gravitation) ska den ligga som ett tydligt formelkort i headern, direkt under ingressparagrafen — inte gömd i sidopanelen. Varje beteckning får en kort beskrivning med ord direkt över sig. Använd dubblettlös placering: ligger formeln i headern ska den inte också upprepas i sidopanelen.

Referensimplementation: `fysik2-energinivaer.html` (se formelkortet i headern). Mönstret:

```jsx
<header className="mb-6">
    <h1>...</h1>
    <p>Ingresstext...</p>
    <div className="mt-6 flex flex-row flex-wrap items-stretch gap-6 text-cyan-300">
        <div className="flex items-center gap-3 flex-wrap px-6 py-4 rounded-xl border border-cyan-500/20 bg-slate-900/40">
            <div style={{textAlign:'center'}}>
                <div className="text-xs text-cyan-400/60 font-semibold mb-1">Beskrivning</div>
                <div className="text-2xl font-bold"><em>X</em></div>
            </div>
            <div className="text-xl text-slate-500">=</div>
            {/* ... fler termer ... */}
        </div>
    </div>
</header>
```

För bråk: stackad layout med `borderTop:'2px solid currentColor'` mellan täljare och nämnare (se formel 2 i `fysik2-energinivaer.html`).

### Decimaltalsformatering

```javascript
const formatNumber = (num, decimals = 2) => {
    return num.toFixed(decimals).replace('.', ',');
};
```

### Diagramkonventioner (svensk fysik/matte-standard)

När diagram ritas i simuleringar, följ dessa konventioner:

1. **Axelfärg**: X-axeln (y=0) och Y-axeln (x=0) ska vara ljusblå/cyan (`#38bdf8`)
2. **X-axelns etiketter**: Placeras direkt **under x-axeln (y=0)**, inte längst ned i diagrammet
3. **Symmetrisk skala**: Om diagrammet visar negativa värden, ska skalan vara symmetrisk kring y=0 (t.ex. -12 till +12, inte -12 till +2)

```javascript
// Exempel: Placera x-axel-etiketter under y=0-linjen
const xAxisLabelY = (minY < 0 && maxY > 0)
    ? height - padding.bottom - ((0 - minY) / range) * graphHeight + 16
    : height - padding.bottom + 16;
```

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

Startsidan (`index.html`) har en sökruta som filtrerar simuleringar i realtid. Varje
simulering finns i `SIMULATIONS`-arrayen i bottnen av `index.html` med fälten
`title`, `description`, `href`, `icon`, `course` och `keywords`.

**Nyckelord (`keywords`)** är osynliga för användaren men är det som gör att
simuleringen hittas via sökningen. Varje ny simulering MÅSTE få lämpliga nyckelord:

- Inkludera alltid **huvudområdet** (ett av: `rörelse`, `krafter`, `densitet`,
  `tryck`, `värme`, `ellära`, `kärnfysik`, `vågor`, `optik`, `elektromagnetism`,
  `magnetism`, `modern fysik`, `kvantfysik`, `atomfysik`, `astronomi`, `mekanik`,
  `termodynamik`).
- Inkludera **specifika begrepp** som eleven kan tänkas söka på (t.ex. `coulomb`,
  `newton`, `halveringstid`, `interferens`, `pendel`, `foton`).
- Inkludera **synonymer och vardagsuttryck** (t.ex. både `elektricitet` och `ellära`,
  både `ljus` och `optik`).
- Använd gemener och svenska tecken där det är naturligt — sökningen normaliserar
  automatiskt å/ä/ö så att "karnfysik" matchar "kärnfysik".

Exempel:
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
7. [ ] **Lägg till i `SIMULATIONS`-arrayen i `index.html` med lämpliga `keywords`** (se ovan)
8. [ ] Lägg till rad i "Senaste uppdateringar" i `index.html` (behåll max 4–5 poster, ta bort äldsta)
9. [ ] Testa i webbläsare
10. [ ] Verifiera decimalformatering (komma, inte punkt)
11. [ ] Testa att sökningen hittar simuleringen via minst ett av nyckelorden

## CDN-länkar (standard)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

För 3D-simuleringar, lägg till Three.js:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```
