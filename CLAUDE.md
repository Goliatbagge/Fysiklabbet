# CLAUDE.md - Fysiklabbet

Interaktiva fysiksimuleringar för gymnasieelever (Fysik 1 & 2).

## Tech Stack

- **Frontend**: Standalone HTML med React 18 (CDN), TailwindCSS (CDN)
- **Språk**: Svenska, kommatecken som decimalavskiljare (5,00 inte 5.00)
- **Tusentalsavgränsare**: hårt mellanslag (NBSP, ` `) mellan tusentalsgrupper. Exempel: "5 000" (rätt), "5000" (fel). "10 000 Pa" (rätt), "10000 Pa" (fel). Gäller alla numeriska värden i sims, formler, resultat-paneler.
  - JS-helper: `function fmtNum(n, d) { const s = n.toFixed(d); const [intp, frac] = s.split('.'); const withSpaces = intp.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); return frac !== undefined ? withSpaces + ',' + frac : withSpaces; }`
  - **Aldrig vanligt mellanslag mellan tusentalsgrupper i löptext.** Skriver du "2 700 kg/m³" med vanligt mellanslag (U+0020) kan webbläsaren bryta raden mellan "2" och "700", så ena siffran står ensam på en rad — typografiskt fel. Använd NBSP (U+00A0). Gäller i `data/ovningar.js` (question/solution), `data/teori/*.md` och alla andra HTML-renderade texter.
  - **Flera tusentalsgrupper i samma tal** (t.ex. "10 130 000") — *alla* mellanslagen ska vara NBSP. Det räcker inte att bara fixa den första. Mönstret är: `\d+(?:\u00A0\d{3})+` — varenda mellanslag mellan siffergrupper är NBSP.
  - **Math-block ($...$) är immuna.** Inom KaTeX används `\,` (tunt skyddande mellanrum) som tusentalsavgränsare, t.ex. `2\,700` → "2 700" oddelbart. Inom math behövs ingen NBSP-konvertering.
- **Mätetal + enhet — hårt mellanslag (NBSP)**: Mellan ett numeriskt värde och dess enhet ska det *alltid* vara NBSP, aldrig ett vanligt mellanslag. Annars kan webbläsaren radbryta texten mitt emellan tal och enhet — t.ex. "10,5" på en rad och "g/cm³" på nästa, vilket är typografiskt fel och svårläst.
  - ✓ `"5,0 m/s"` (NBSP mellan 5,0 och m/s)
  - ✓ `"130 g"` (NBSP mellan 130 och g)
  - ✗ `"5,0 m/s"` (vanligt mellanslag — kan radbrytas)

  **Två sätt att åstadkomma det:**

  1. **NBSP-tecken i löptext** (i `data/teori/*.md` och i `data/ovningar.js`): klistra in NBSP-tecknet (U+00A0) direkt mellan tal och enhet. Det syns som ett vanligt mellanslag i editorn men förhindrar radbrytning. Skriv inte ` ` — det blir litterala tecken i markdown.

  2. **Packa hela uttrycket i math-block**: `$5{,}0\ \mathrm{m/s}$` eller `$\rho = 19{,}3\ \mathrm{g/cm^3}$`. Hela math-blocket är ett oddelbart inline-element och kan aldrig radbrytas internt. Använd detta när värdet ändå hör ihop med en formel-variabel (ρ, *F*, *E*).

  **Båda metoderna är OK** — välj efter vad som flyter bäst i texten. Skriv aldrig värde och enhet med bara vanligt mellanslag emellan.
- **Variabel + värde + enhet — alltid i math-block**: När en variabel, dess värde och enhet skrivs ihop i löptext (t.ex. "Räkna med *g* = 9,82 N/kg" eller "Använd *c* = 3,0 · 10⁸ m/s" eller "*c* ≈ 300 000 km/s") ska **hela trippeln** packas i ett math-block. Annars kan webbläsaren radbryta mellan "*g* =" och "9,82 N/kg" — en typografisk smutsfläck där eleven blir förvirrad över vad som hör ihop. Math-blocket är oddelbart och flyttas i sin helhet till nästa rad om det inte får plats.

  **Detta gäller alla jämförelseoperatorer**, inte bara `=`. Samma regel för `≈` (`\approx`), `<` (`\lt` eller `<`), `>`, `≤` (`\leq`), `≥` (`\geq`), `∝` (`\propto`), `≠` (`\neq`). Skriv aldrig "*c* ≈ 300 000 km/s" som lös text — packa allt i `$c \approx 300\,000\ \mathrm{km/s}$`. Detta gäller också introduktionstexter där en konstant nämns en passant ("Plancks konstant *h* ≈ 6,626 · 10⁻³⁴ J·s").

  **KRITISK fallgrop — JS-strängar kräver dubbelt backslash.** I `data/ovningar.js` (eller andra `.js`-filer där KaTeX-källan ligger i en JS-sträng/template literal) ska **alla backslash dubbleras**, annars sväljer JavaScript dem och KaTeX får råtext istället för kommandon. I `.md`-filer (`data/teori/*.md`) används enkla backslash som vanligt.

  - I markdown-filer (`.md`):
    - ✓ `Räkna med $g = 9{,}82\ \mathrm{N/kg}$.`
    - ✓ `Använd $c = 3{,}0 \cdot 10^{8}\ \mathrm{m/s}$.`

  - I JS-filer (`data/ovningar.js`), template literals/strängar:
    - ✓ `` `Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.` ``
    - ✓ `` `Använd $c = 3{,}0 \\cdot 10^{8}\\ \\mathrm{m/s}$.` ``
    - ✗ `` `Räkna med $g = 9{,}82\ \mathrm{N/kg}$.` `` (JS dropp:ar `\m` → renderar "mathrm" som råtext)

  - Anti-mönster (oavsett filtyp):
    - ✗ `Räkna med *g* = 9,82 N/kg.` (alla tre tecknen kan radbrytas inbördes)
    - ✗ `Räkna med *g* = 9,82 N/kg.` (NBSP räcker inte — "= 9,82" kan ändå hamna ensam på en rad om "Räkna med *g*" tar slutet av föregående rad)

  Gäller framförallt **konstanter som anges i uppgiftstexten** ("Räkna med …", "Använd …"), men också inline-referenser till specifika mätvärden ("vid *t* = 5,0 s" → `$t = 5{,}0\\ \\mathrm{s}$` i JS). Gränsfallet "bara variabelnamn utan värde" (t.ex. "*t* anger tiden") räcker det med kursiv markdown.

  **Generell regel**: `\` (en backslash) i markdown-källa ≡ `\\` (två backslash) i JS-sträng. Detta gäller även `\cdot`, `\frac`, `\sqrt`, `\left`, `\right`, `\sin`, `\cos`, `\alpha`, `\mathrm` osv. Titta i grannraderna när du skriver — om de använder `\\cdot` ska din också göra det.

  **CSS-skydd mot radbrytning (redan på plats — rör inte):** I `styles-laborans.css` finns regeln `.katex { white-space: nowrap; }` (med undantag för `.katex-display .katex` så block-math kan radbryta som vanligt). Den garanterar att inline-math aldrig bryts mitt itu — hela formeln flyttas i sin helhet till nästa rad. Tack vare detta räcker det att packa "*g* = 9,82 N/kg" i ett math-block för att förhindra radbrytning; man behöver inte använda NBSP utöver det. **Ta inte bort den regeln** utan att samtidigt återinföra NBSP-tekniken på alla ställen där math-block används i löptext.
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

# Bygg teori-bundle efter ändringar i data/teori/*.md (KÖR FÖRE COMMIT!)
node data/teori/build.js

# Öppna simulering i webbläsare
start [filnamn].html
```

## ⚠️ KRITISK: Bygg teori-bundle efter md-ändringar

`data/teori/*.md` läses INTE direkt av katalog-sidan. Den läser
`data/teori/bundle.js`, som är genererad från md-filerna av
`data/teori/build.js`. **Efter varje ändring i en md-fil måste du köra
`node data/teori/build.js`** — annars ser sidan fortfarande den gamla
texten. Detta är en vanlig fälla: man fixar en typografisk detalj i
md-filen, laddar om sidan, ser fortfarande felet, och tror att fixet inte
fungerade — men den verkliga orsaken är att bundle.js är cachad.

Det finns ingen automatisk hot-reload — bundle.js byggs bara när du
explicit kör build.js. Lägg det som rutin efter alla md-redigeringar.

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

  Denna regel gäller löpande text i `data/teori/*.md` **och i `data/ovningar.js`**
  (frågor, lösningar, distraktorer). I `$$ ... $$`-block fungerar `F_G` redan
  korrekt eftersom math-blocken skyddas från markdown-parsern (se
  `protectMath` i `katalog.html`/`avsnitt.html`).

  **OBS — gäller även Unicode-tecken som ρ, σ, ε, λ, μ, π m.fl.** Skriv aldrig
  `ρ_guld` eller `μ_s` i löptext — `_guld`/`_s` tolkas som början på en kursiv
  sektion och underscore-tecknet blir kvar synligt. Använd alltid inline-math:
  - ✓ `$\rho_\text{guld} = 19{,}3$ g/cm³`
  - ✓ `$\mu_\text{s}$` (statisk friktionskoefficient)
  - ✗ `ρ_guld = 19,3 g/cm³` (underscore-tecknet förblir synligt)
  - ✗ `μ_s` (samma problem)

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

## Övningar per avsnitt

Varje teori-avsnitt kan ha tillhörande övningar som visas under teori-texten
i katalogen. Övningarna lagras i `data/ovningar.js`:

```js
window.OVNINGAR = {
    'fy1-1.3': [
        { level: 1, question: '<markdown>', solution: '<markdown>' },
        ...
    ],
};
```

### Nivåer

- **Nivå 1** — Grundläggande (E-nivå). Bara SI-omvandling och insättning i
  en formel (eventuellt efter omformning). Exempel: omvandla minuter → timmar
  och räkna $v = s/t$.
- **Nivå 2** — Medel (C-nivå). Lösningen kräver kombination av två (eller
  flera) formler i flera steg. Inte alldeles för rätt fram.
- **Nivå 3** — Avancerad (A-nivå). Tre eller fler formler/koncept måste
  kombineras i längre kedjor, eller så krävs trigonometri/vinklar,
  ekvationssystem med två obekanta, algebraisk härledning av en formel,
  modelleringsantaganden, eller ett klassiskt fall där den "uppenbara"
  lösningsstrategin är fel (t.ex. sista sekunden av fritt fall, två
  rörelser som möts, sant medelvärde av kvadratiskt beroende).

### Kalibrering mot riktiga läromedel

Det är **viktigt** att svårighetsnivåerna matchar riktiga läromedel.
Källor som ska användas för kalibrering:

1. **`Uppgifter/Fysik 1/`** — Impuls Fysik 1 uppgifter sorterade på
   E-, C- och A-nivå (★, ★★, ★★★ i originalboken). Konsultera dessa
   PDF-filer när du är osäker på vilken nivå en uppgift bör ha. Notera
   genrer som passar A-nivå: möte/inhämtnings-problem, två obekanta,
   trigonometriska vinklar, krångliga geometrier, modelleringsantaganden,
   "den sista sekunden"-fällor, härledningsuppgifter.
2. **`Kursprovsuppgifter/`** — frisläppta kursprov med poängsättning
   som (E/C/A). En uppgift som ger "(2/1/0)" är på E-nivå, "(0/2/1)"
   eller liknande där A-poäng dominerar är på A-nivå.

**Du får ALDRIG kopiera uppgifter** från dessa filer — de är
upphovsrättsskyddade. Använd dem bara för att kalibrera svårighet och
hämta inspiration. Skapa alltid egna varianter.

**Inte ens "tydligt omformulerade" varianter av samma scenario.** PDF:erna
i `Uppgifter/` är **endast** till för att avgöra svårighetsnivå (E/C/A)
— inte för att leverera scenarier. Om PDF:n har en akvarie-uppgift, ska
*inte* din uppgift handla om ett akvarium. Om PDF:n har en domkraft med
$A_1 = 3{,}5\\ \\mathrm{cm^2}$ och $A_2 = 52\\ \\mathrm{cm^2}$, ska *inte* din
domkraft ha snarlika areor. Tänk: *vilka koncept testar PDF-uppgiften, och
vilket helt annat scenario kan testa samma koncept?* Vattentorn istället
för akvarie, bromsok istället för domkraft, isberg istället för båt, etc.
Konceptet är upphovsrättsfritt — själva scenariot/inramningen är där
risken finns både juridiskt och pedagogiskt (för att eleven kan ha löst
den exakta uppgiften i läroboken förut).

Om en uppgift du tänkt klassa som N3 i praktiken bara kräver två
formler i tydlig följd (även om det "känns" lite trixigt eller har en
fin pedagogisk poäng), ska den vara N2 — N3 är reserverat för uppgifter
som *kvalitativt* sticker ut i komplexitet. Hellre ingen N3 än en
N3 som egentligen är en lätt N2.

### Antal per avsnitt

Som riktlinje: **3 övningar Nivå 1 + 2 övningar Nivå 2 + 1 övning Nivå 3 = 6 st**.

För korta avsnitt (få begrepp att öva på) får principen frångås — färre
eller annan fördelning är OK.

### Minst en uppgift per formel

För varje **formel som introduceras i avsnittet** (det som står i en
`::: formel`-box eller framträder som en namngiven huvudformel i teori-
texten) ska det finnas **minst en räkneuppgift som använder just den
formeln**. Om ett avsnitt har två formler, ska båda dyka upp i någon av
övningarna. För formler som löses ut åt olika håll (t.ex. *s* = *v* · *t*,
*t* = *s* / *v*) räcker det att formeln används i någon form — men det är
bra att variera vilken variabel som söks i Nivå 1-uppgifterna.

### Begreppsavsnitt (utan formler)

För avsnitt som bara innehåller begrepp och beskrivningar (t.ex. en
historisk introduktion eller naturvetenskaplig metod) ska övningarna i
första hand skapas som **flervalsfrågor** (se nedan). De auto-rättas och
ger eleven snabb återkoppling. Om en begreppsfråga blir krystad som
flerval (för fyrkantiga alternativ eller orimliga distraktorer) får den
istället göras som öppen reflektionsfråga utan auto-rättning.

### Diagram ska ritas, inte beskrivas

Om en uppgift hänvisar till ett rörelsediagram (*s-t*, *v-t*, *a-t*),
energidiagram, kraft-positionsgraf eller annan figur ska diagrammet
**ritas** som inline-SVG — aldrig beskrivas i ord ("grafen är en rät
linje från … till …"). Eleven ska *läsa av* punkter från ett rutnät,
vilket är en kärnkunskap i kursen.

Samma princip gäller i teori-texterna under `data/teori/*.md` — om
exemplet säger "se diagrammet" ska det finnas en faktisk graf där, inte
en textuell beskrivning av kurvans utseende.

**Verktyg**: i `data/ovningar.js` finns helpern `makeDiagram(opts)` som
genererar konsekvent stylade SVG-diagram (rutnät, axlar med pilar,
Poppins-typsnitt, accent-röd kurva). Anropa den från question-strängen
med en template-literal och beskriv data via `paths` och `fills`. Se
kommentaren ovanför funktionen för fullständigt API.

**Markera inte mätpunkter med koordinatetiketter** i grafen — eleven får
räkna rutor i rutnätet själv. Använd naturliga rutnätssteg (vart 2 s,
vart 5 m/s, vart 10 m, vart 1 m/s² o.s.v.) och placera linjernas
ändpunkter så att de hamnar nära rutnätskorsningar, så avläsning blir
otvetydig.

**Avslöja inte metoden i uppgiftstexten.** Om eleven ska beräkna en
förflyttning från ett *v-t*-diagram ska det stå *"Beräkna föremålets
förflyttning"* — inte *"Beräkna arean under grafen"* eller *"…
(arean under grafen)"*. Att inse att arean motsvarar förflyttningen är
en del av uppgiften. Samma sak gäller för att inse att *lutningen*
motsvarar hastighet/acceleration, eller att en area i *a-t*-grafen
motsvarar Δ*v*.

**Markera inte arean i uppgiftens diagram.** Om uppgiften går ut på
att eleven ska räkna ut förflyttningen som en area ska arean *inte*
vara fylld (`fills`) i frågans diagram — då blir svaret för uppenbart.
Visa bara kurvan/linjen. **Undantag** finns — t.ex. om uppgiften
specifikt handlar om att jämföra två areor (positiv vs negativ
förflyttning, två delsträckor) kan färgade fills användas för att
markera vilka regioner som ska jämföras. Använd undantaget sparsamt.

**Lösningsförslaget får (och bör) rita om diagrammet** med arean
markerad. Då finns den pedagogiska poängen kvar — eleven har själv
kommit på att det är arean som ska beräknas, och i lösningen får hen
sedan en tydlig visuell bekräftelse. Anropa `makeDiagram` igen i
solution-strängen med samma axlar/skala men nu med fyllda `fills`.

### Kraftvektorer ska ritas, inte beskrivas

Om en uppgift hänvisar till **kraftvektorer** — exempelvis "två krafter
verkar vinkelrätt mot varandra", "en kraft drar i ett rep som lutar
30° över horisontalplanet", "tre krafter i jämvikt" — ska de **ritas**
som pilar i en figur, inte beskrivas enbart i text. Att läsa av en
vektorbild med vinklar och beteckningar är en kärnfärdighet i mekanik
och behövs både vid problemlösning och på prov.

**Verktyg**: helpern `makeForceDiagram(opts)` i `data/ovningar.js`
genererar inline-SVG med kraftpilar (med pilspetsar), beteckningar
(*F*₁, *F*₂…), valfri storleksetikett (50 N), valfri kompass
(N/S/Ö/V) och valfri kropp (liten kvadrat) som krafterna verkar på.
Vinklar anges i grader där 0 = höger, 90 = upp, 180 = vänster.
Strecka okända krafter med `dashed: true` och magnitud `'?'`. Se
kommentaren ovanför funktionen för fullständigt API.

**Storlek = pixellängd, inte newton.** Du anger pilens längd i pixlar
manuellt — välj proportionellt så att en kraft som är dubbelt så stor
också syns som dubbelt så lång pil. En tumregel är 3 px/N för krafter
runt 30–80 N (ger pilar 90–240 px).

**Beteckningen ska placeras vid PILSPETSEN, aldrig på pilens linje.**
Helpern placerar automatiskt etiketten enligt följande regler så att
det alltid är uppenbart vilken vektor en beteckning hör till:

- **Horisontell vektor** (åt höger eller vänster): etiketten OVANFÖR
  pilspetsen om vektorn lutar uppåt eller är rakt åt sidan, UNDER om
  den lutar nedåt.
- **Vertikal vektor** (uppåt eller nedåt): etiketten TILL HÖGER om
  pilspetsen, **nära spetsen** (text-anchor="start" med ~8 px offset).
  Inte centrerad bredvid spetsen — det ger för mycket luft mellan
  beteckning och pil.
- **Sned vektor**: etiketten vid spetsen, OVANFÖR om vektorn pekar
  uppåt-något (sin > 0), UNDER om den pekar nedåt-något (sin < 0).

Etiketten får **aldrig** korsa eller överlappa själva pilens linje.
Om du skriver egna inline-SVG-figurer (utanför `makeForceDiagram`) ska
du följa samma princip.

**Avslöja inte svaret i diagrammet.** Om uppgiften går ut på att räkna
ut riktningen eller storleken av en okänd kraft, rita den streckat med
`magnitude: '?'` — eller utelämna den helt om det är pedagogiskt rätt.
Aldrig visa själva svaret som en exakt pil i frågans diagram.

**Vinklar ska markeras i figuren, inte beskrivas i text.** Om en uppgift
har en figur (kraftdiagram, lutande plan, rörelsediagram, geometrisk
skiss) och vinkeln är central för beräkningen, ska den **ritas in i
figuren** — inte stå som en lös mening i uppgiftstexten ("Repet lutar
30° över horisontalplanet."). Markera vinkeln med en båge mellan den
lutande vektorn och en streckad hjälplinje (typiskt horisontalen), och
sätt gradetiketten vid bågen.

I `makeForceDiagram` finns parametern `showAngle: true` per vektor som
automatiskt ritar streckad horisontalreferens från ankarpunkten, en
båge och vinkeletikett. Använd valfri `angleLabel: 'α'` om du vill ha
en symbol istället för gradtal (vid algebraiska uppgifter).

```js
{ label: 'F', magnitude: '80 N', angle: 30, length: 220, showAngle: true }
```

Om du skriver en egen inline-SVG-figur (utanför `makeForceDiagram`),
följ samma princip: rita hjälplinjen streckat (`stroke-dasharray="5 4"`,
färg `#8a8579`), bågen som `<path d="M r 0 A r r 0 0 0 ...">` med samma
färg och etiketten i Poppins 14 px vid bågens mittlinje.

### Flervalsfrågor

Flervalsfrågor anges med fälten `choices` (array av strängar i markdown)
och `correct` (0-indexerat index av rätt svar). Inget `answer`-fält
behövs. Övriga fält fungerar som vanligt (level, question, solution).

```js
{
    level: 1,
    question: 'Vad menas med en hypotes inom naturvetenskaplig metod?',
    choices: [
        'Ett fenomen som inte kan förklaras.',
        'En gissning som ska testas med experiment.',
        'En lag som aldrig motbevisats.',
        'En sammanfattning av flera teorier.'
    ],
    correct: 1,  // 0-indexerat: alternativ B är rätt
    solution: 'En hypotes är en gissning som vi testar...'
}
```

Riktlinjer för bra distraktorer:
- 3 eller 4 alternativ (max 4)
- Alla alternativ ska vara rimliga vid första anblick — undvik
  uppenbart fel alternativ.
- Plocka **vanliga elev-missuppfattningar** som distraktorer (t.ex.
  "teori = osäker gissning", "medelvärdet av farterna = medelfarten").
- Skriv inte "Inget av ovanstående" eller "Alla ovan".

### Lösningsformat

Lösningsförslagen ska följa samma stil som exempeluppgifterna i teori-
texten:

1. **Identifiera formeln** och lösningen ut den variabel som söks om det
   behövs:
   $$ v_\mathrm{m} = \frac{s}{t} \quad\Leftrightarrow\quad s = v_\mathrm{m} \cdot t $$

2. **Mätvärden i bracket-block** (`\left[ \begin{array}{l} ... \end{array} \right]`)
   efter SI-omvandling.

3. **Beräkningssteg** i math-block — visa hur värdena sätts in.

4. **Svar** på egen rad: `**Svar:** ...`.

Eventuella pedagogiska kommentarer (klassiska elev-misstag, generaliseringar)
läggs efter svaret som extra `**Generell slutsats:** ...`-paragraf.

### Variabler

Som i resten av projektet ska fysikaliska variabler skrivas kursivt: använd
`*v*`, `*t*`, `*s*` i markdown-text (inte inom math-block — där hanterar
KaTeX kursiveringen). I math-block används `\mathrm{}` för bokstavsindex:
`v_\mathrm{m}`, inte `v_m`.

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
