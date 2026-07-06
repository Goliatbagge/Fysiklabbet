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

# Verifiera att teori-figurer (::: figur) har tät viewBox utan tom "luft"
# i kanterna (KÖR FÖRE COMMIT!)
node .claude/verify-figur-bounds.js

# Verifiera exit tickets efter ändringar i data/exittickets.js (KÖR FÖRE
# COMMIT!) — syntax, täckning mot katalogen, choices/why-längder, emoji,
# tappade KaTeX-backslash. Dataformatet dokumenteras i filens huvud;
# why[correct] = varför rätt, övriga = varför fel; förklaringar får inte
# börja med "Rätt!"/"Fel!" (UI:t sätter etiketterna).
node .claude/verify-exittickets.js

# Bygg teori-bundle efter ändringar i data/teori/*.md (KÖR FÖRE COMMIT!)
node data/teori/build.js

# Bygg per-artikel-OG-sidor efter ändringar i data/nyheter.js (KÖR FÖRE COMMIT!)
# Genererar nyheter/dela/<id>.html med rätt og:*-taggar för korrekt
# delningsförhandsvisning (Facebook/X/LinkedIn) — delningsknapparna pekar dit
node data/build-nyheter-og.js

# Uppläsning (talsyntes): bygg om manus + ljud efter ändringar i
# data/teori/*.md, data/nyheter.js eller data/tts/manus-lib.js.
# Kräver dev-servern på port 8000 och Python 3.12 med edge-tts.
# Inkrementellt — bara dokument vars manus ändrats genereras om.
node data/tts/build-manus.js
python data/tts/generate-audio.py

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

## ⚠️ KRITISK: Uppdateringskedja när teoriinnehåll ändras

**En ändring i en teorigenomgång (`data/teori/*.md`) är ALDRIG klar med bara
md-filen.** Övningar, exit tickets och uppläsning bygger alla på genomgångens
innehåll — ändras teorin utan att de följer med testar/uppläser sajten stoff
som inte längre finns. Gå därför igenom hela kedjan i samma arbetspass, varje
gång innehåll skrivs om, läggs till, tas bort eller byter titel (gäller även
när en genomgång byggs om från en ny PDF i `Genomgångar/`):

1. **Teori-bundle**: `node data/teori/build.js` (se avsnittet ovan).
2. **Övningar** — `data/ovningar.js`, nyckel = teori-id (t.ex. `'fy2-1.2'`).
   Uppgifterna ska spegla det NYA innehållet (3 N1 + 2 N2 + 1 N3, se
   `OVNINGAR.md`); ta bort/ersätt uppgifter som testar borttaget stoff.
3. **Exit tickets** — `data/exittickets.js`, samma id. Frågorna ska förhöra
   det nya innehållet. Kör `node .claude/verify-exittickets.js`.
4. **Uppläsning (TTS)** — `node data/tts/build-manus.js` +
   `python data/tts/generate-audio.py` (dev-server på port 8000 krävs).
   Inkrementellt: bara ändrade manus genereras om.
5. **Simuleringar + katalog** — grep på avsnittets ämnesord i
   `data/katalog.js`, `index.html` och `fysikN-*.html`: stämmer beteckningar,
   formler och beskrivningar fortfarande med den nya genomgången?
6. **Angränsande teoriavsnitt** — grep i `data/teori/` efter hänvisningar
   till avsnittet ("förra avsnittet", gamla titeln, begrepp som flyttats).
7. **Verifierare före commit**: `node .claude/verify-figur-bounds.js` och
   `node .claude/verify-no-white-outline.js` om figurer ändrats.

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

## ⚠️ KRITISK: Synka beteckningar och kurs med teorigenomgången

**Innan du skapar (eller ändrar) en simulering MÅSTE du läsa motsvarande
teorigenomgång i `data/teori/*.md` och använda EXAKT samma beteckningar,
enheter och formelskrivning.** Simuleringen, katalogen och övningarna ska
spegla genomgången — inte en egen variant. Detta är ett ÅTERKOMMANDE fel:
en sim byggdes med egna beteckningar som inte stämde med elevernas
genomgång, vilket förvirrar.

**Originalgenomgångarna finns som PDF i `Genomgångar/Fysik 1/` och
`Genomgångar/Fysik 2/`.** När du bygger figurer (eller simuleringar) ska du
öppna motsvarande PDF (läs med Read, `pages`-param) och **efterlikna dess
figurer** — perspektiv, vilka objekt som ritas, etiketter. Kapitelnumren i
PDF-filnamnen skiljer sig från md-filerna → mappa via `title:`, inte numret
(ex: md `fy1-3.2` "Newtons andra lag" = PDF `Fy 1 4.02 Newtons andra
lag.pdf`). Projektet att ersätta `::: bild`-platshållare med riktiga
inline-SVG-figurer styrs av `.claude/figurer-plan.md`.

Gör så här, varje gång:

1. **Hitta avsnittet.** Sök i `data/teori/` efter ämnet (t.ex.
   `grep -rin "kraftmoment" data/teori/`). Filnamnet avslöjar kursen:
   `fy1-*.md` → Fysik 1, `fy2-*.md` → Fysik 2. **Lägg simuleringen i samma
   kurs som genomgången** (filnamn `fysikN-…`, breadcrumb, katalog-`#fyN`,
   och länka den i rätt katalog-avsnitt i `data/katalog.js`). Ett ämne du
   tror är Fysik 1 kan ligga i Fysik 2 i denna kursplan — kontrollera
   alltid, gissa aldrig.
2. **Kopiera beteckningarna exakt.** Variabelbokstäver, index och enheter
   ska vara identiska med genomgången. Exempel som redan bitit:
   - Hävarm betecknas **`l`** (kursiv), aldrig `r`. Kraftmoment: `M = F · l`.
   - Enheten skrivs som i genomgången (t.ex. **`Nm`**, inte `N·m`, för
     kraftmoment).
   - Krafter följer master-konventionen (`F_G` med stort G osv.).
3. **Spegla formeln.** Samma uppställning (`M = F · l`), samma ord-etiketter
   och samma enhetsskrivning i formelkort, scen-etiketter, avläsningar,
   katalogtext och uppdateringsrutan.
4. **Vid minsta avvikelse mellan din sim och genomgången → rätta sim:en**,
   inte genomgången (om inte användaren uttryckligen ber om motsatsen).

## Interaktiva grafer i teorin (`::: graf`)

**REGEL: När en teorigenomgång handlar om hur en eller flera parametrar
formar en graf ska du bädda in en interaktiv grafritare (`::: graf`) direkt
i genomgången — inte bara en statisk figur.** Eleven/läraren ska kunna dra i
glidare (eller skriva i sifferfält) och se grafen ändras live. Det gäller
`::: graf` för alla kurser (matematik och fysik) och ska ske **automatiskt**
när nya graf-tunga avsnitt läggs in.

**Bädda in när avsnittet bygger på "parameter → grafens utseende", t.ex.:**
- räta linjer (`y = kx + m` — lutning och m-värde),
- proportionalitet (`y = kx`),
- andragradsfunktioner/parabler (`y = ax² + bx + c`),
- exponential- och potensfunktioner (`y = C·a^x`, `y = C·x^n`),
- trigonometriska funktioner (amplitud, period, fasförskjutning),
- fysik-samband som ritas som graf (v–t, s–t, sönderfall, svängningar).

**Hoppa över när** avsnittet inte handlar om en parametriserad graf (ren
räkning, definitioner, geometri utan funktionsgraf).

### Syntax

Blocket skrivs i `.md`-filen och byggs av `graf.js`
(`window.FYSIKGRAF.mountAll`), som kopplas in efter render i både
`katalog.html`, `avsnitt.html` och presentationsläget:

```
::: graf
titel: y = kx + m
uttryck: k*x + m
ekvation: y = {k}x + {m}
lutningstriangel: ja
k: -2, -5, 5, 0.5
m: 3, -10, 10, 1
x: -6, 6
y: -6, 6
:::
```

- `titel:` — KaTeX-etikett ovanför grafen (valfritt; `$` behövs ej, hela
  raden tolkas som matte så variabler blir kursiva).
- `uttryck:` — **obligatoriskt.** Maskin-uttrycket i `x` och parametrarna,
  med `.` som decimaltecken. Stöder `+ - * / ^`, parenteser, unärt minus och
  funktionerna `sin cos tan asin acos atan sqrt abs exp ln log sign` samt
  konstanterna `pi` och `e`. (`·` och `−` tolereras och normaliseras.)
- `ekvation:` — KaTeX-mall med `{param}`-platshållare. Visas under grafen
  **med aktuella värden insatta, live** (blå som kurvan). Städas automatiskt:
  `+ -3` → `- 3`, `1x` → `x`, `1 \cdot` → bort, `0x + 3` → `3`, `+ 0` tas
  bort. **Använd nästan alltid detta** — kopplingen "allmän form ovanför,
  konkret ekvation under" är kärnpedagogiken. (Utan `ekvation:` visas i
  stället värde-chips.) **Parameter i exponent:** skriv dubbla klamrar,
  `x^{{a}}` — substitutionen konsumerar de inre (`{a}` → `2`) och de yttre
  blir KaTeX-exponentens klamrar (`x^{2}`), vilket krävs för fleteckens-
  värden som `-1` och `0{,}5`.
- `lutningstriangel: ja` — streckat "trappsteg" från y-skärningen: 1 steg åt
  höger, Δy steg upp/ner (för räta linjer = `k`), med etiketter. Får
  automatiskt en kryssruta "Visa trappsteget" i widgetens footer. Använd på
  avsnitt om räta linjer/lutning.
- `<param>:` — en glidare per parameter: `värde, min, max[, steg]`. Utan
  fjärde värdet gissas ett rimligt steg. Parameternamnen måste matcha dem i
  `uttryck:`.
- `x:` / `y:` — STARTfönster `min, max` (valfritt, standard `-6, 6`; det
  ger stödlinjer för varje heltalssteg i startläget — behåll den storleks-
  ordningen om inte kurvan kräver annat).
  Rutnätet är ALLTID symmetriskt (1 enhet i x-led = 1 enhet i y-led,
  kvadratiska rutor), så skalan sätts så att BÅDA intervallen ryms — den
  rymligare riktningen får luft. Panorering (dra i rutnätet, touch/pinch)
  och zoom (mushjul över rutnätet, +/−-knappar) är inbyggt; användaren kan
  alltid flytta vyn själv, så fönstret behöver bara vara en rimlig start.

**Konventioner:** parameternamn med **en bokstav** (`k`, `m`, `a`, `b`, `c`,
`A`, `T`) speglar genomgångens beteckningar exakt (samma synk-regel som för
simuleringar). Låt en parameters default matcha ett exempel som redan står i
avsnittet, så eleven kan "spela upp" exemplet i verktyget. Widgeten ritar
själv koordinatsystem i papperstemat (ink-axlar med pilspetsar, blå kurva,
röd prick i `y`-skärningen) — du behöver inte rita någon SVG.

**Byggkedja:** `::: graf`-block skyddas i `data/teori/build.js` (rörs ej av
NBSP/term-transformer) och hoppas över av uppläsningen (config läses aldrig
upp). Efter att du lagt in ett block: kör `node data/teori/build.js` som
vanligt. Ingen TTS-omgenerering behövs för själva grafen (den ger ingen
uppläsningstext), men omgivande brödtext följer den vanliga
uppdateringskedjan.

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

### ⛔ FÖRBJUDET: emojis och dekorativa piktogram

**Emojis är strikt förbjudna överallt — i simuleringar, katalog, teori,
övningar, knappar, rubriker, kort och löptext. Inga undantag.** Färgglada
piktogram (📦, 🪨, 🚀, ⚛️, ⚠️, ✋, 🎈, ↕️, ✅, 🔍 osv.) får aldrig
användas som ikoner, rubrikprydnader eller blickfång. De ser
oprofessionella ut och "skriker AI" — exakt motsatsen till den sobra
laborationsestetiken sidan ska ha. Detta gäller även emoji-varianten av
symboler (med `U+FE0F` variation selector) och dingbat-emoji (☀️, ⭐, ✔️).

Ersätt i stället med:
- **Ingenting** — en ren textrubrik utan prydnad är förstahandsvalet.
- **Inline-SVG-ikoner** med `currentColor` (samma stil som `fs-btn`,
  logotypen, nav-pilarna) när en ikon verkligen behövs.

**Legitima undantag (INTE emoji):** matematiska och typografiska tecken som
→ ⟶ ⟂ · × ≈ ≤ ≥ ∝ ⟺ ⟹ ± ∑ √ ° ′ ″, pilar i formler/figurer, samt
grekiska bokstäver. Dessa är inte emoji utan riktig notation och ska
användas där de hör hemma. Tumregel: om tecknet bär matematisk/typografisk
betydelse i sammanhanget → behåll; om det bara är en färgglad dekoration →
ta bort.

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

  **⚠️ Teori-figurer (`::: figur` i `data/teori`) ÄRVER kursiv stil.**
  `marked` lindar `<svg>` i ett `<p>`, och `.lab-block-figur p` är kursiv
  (bildtext-stil) → SVG-texten ärver `font-style: italic`, så **mätetal och
  enheter blir kursiva** trots att källan inte kursiverar dem (påpekat
  2026-07-01: "34 N" och "0,25 m" renderades kursivt). Detta neutraliseras
  globalt av regeln `.lab-block-figur svg { font-style: normal }` i
  `styles-laborans.css` — **rör inte den regeln.** Regeln sitter ENBART på
  `svg`-roten (inte på `text`), så det ärvda kursiv-värdet slås ut medan
  variabler som är explicit kursiva via `<tspan font-style="italic">` (eller
  ett helt `<text font-style="italic">` för en ren variabel) BEHÅLLER sin
  kursivering — presentationsattribut på `<text>`/`<tspan>` vinner över det
  ärvda värdet. Granska alltid en
  katalog-skärmdump (inte bara isolerad SVG) — kursiv-arvet syns bara i
  katalog-kontexten.

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

### Exponenter och tiopotenser

**Använd ALDRIG Unicode-superscript-tecken (⁻, ¹, ², ⁷, ⁰ …) för exponenter
i löptext.** De ligger i olika teckensnittsglyfer med olika storlek och
baslinje, så `10⁻¹⁷` renderas ojämnt — minustecknet och siffrorna får olika
höjd och "hoppar". Extra synligt i fet/stor text. Återkommande fel (påpekat
2026-06-25).

Skriv i stället exponenten med riktig markup:

- **I HTML-kontext** (t.ex. `body`-strängar i `data/nyheter.js`, rå inline-SVG/
  HTML): `10<sup>−17</sup>`. Använd **äkta minustecken** `−` (U+2212) i
  exponenten, inte bindestreck `-`.
- **I markdown-/KaTeX-kontext** (`data/teori/*.md`, `data/ovningar.js`):
  math-block — `$10^{-17}$` (md) / `$10^{-17}$` med `\\` vid ev. kommandon (JS).
- **Sifferindex (subscript) i ren text** får använda Unicode (Q₁, v₀) — se
  Subscript ovan. Det är exponenter (superscript) som ALDRIG ska vara Unicode.

**Undantag — ren textkontext utan HTML/KaTeX-rendering:** där taggar visas
bokstavligen (t.ex. `research.citation` i `data/nyheter.js`, som renderas som
React-textbarn utan `dangerouslySetInnerHTML`) går varken `<sup>` eller
math-block. Skriv då `10^-17` (caret) eller behåll Unicode som nödlösning —
men välj alltid `<sup>`/math-block så fort kontexten faktiskt renderar dem.

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
4. **Hela relationen i ETT math-block** — en relation mellan storheter
   (t.ex. `F_f = F_drag`, `F_N = F_G`) skrivs som **ett** sammanhållet
   math-block `$F_f = F_\text{drag}$`, ALDRIG som två separata inline-math
   med operatorn utanför (`$F_f$ = $F_\text{drag}$`). I det senare fallet är
   ` = ` vanlig löptext och webbläsaren får bryta raden vid operatorn, så
   `F_drag` hamnar på nästa rad. Math-blocket har `white-space: nowrap` och
   håller ihop hela uttrycket. Återkommande fel (påpekat 2026-06-22).
5. **ALDRIG markdown-kursiv variabel följt av värde** (`*t*₁ = 0 min`,
   `*t* = 5,0 s`) i löptext eller frågestam — använd math-block
   (`$t_1 = 0\ \mathrm{min}$`, `$t = 5{,}0\ \mathrm{s}$`). Markdown-formen
   bryter raden mellan beteckning och värde (` = värde` är vanlig löptext),
   och **inuti en fet `::: exempel`-stam** (`**…**`) kolliderar dessutom
   asteriskerna i `*t*` med fet-asteriskerna `**` så att hela frågan
   renderas kursiv med en lös `*` i kanten. **Det får ALDRIG ske en
   radbrytning mellan beteckning, likhetstecken och värde** — pakka alltid
   `beteckning = värde [enhet]` i ett math-block. Återkommande fel
   (påpekat 2026-06-23).

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

**Exakt noll skrivs ALLTID utan decimaler** — `0`, aldrig `0,0`, `0,00`,
`-0,0` osv. Gäller överallt värden visas (avläsningar, etiketter i scen/
canvas/SVG, diagram, formelkort, övningar). Ett värde som *avrundas* till
noll (t.ex. 0,03 m/s vid en decimal) räknas också som noll och skrivs `0`.
Decimalsiffror på en nolla ser ut som onödigt brus. Varje sifferformaterare
i projektet måste hantera detta (lägg `if (parseFloat(s) === 0) return '0';`
direkt efter `toFixed`):

```javascript
const formatNumber = (num, decimals = 2) => {
    const s = num.toFixed(decimals);
    if (parseFloat(s) === 0) return '0';        // exakt/avrundat noll → "0"
    return s.replace('.', ',');
};
```

Tusentalsavgränsare-helper (NBSP):
```javascript
function fmtNum(n, d) {
    const s = n.toFixed(d);
    if (parseFloat(s) === 0) return '0';        // exakt/avrundat noll → "0"
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
- **Start/Paus/Börja om (styrknappar) → BARA i rutan uppe till höger**
  (`.scene-toggles` `.st-actions`), tillsammans med visningsvalen.
- Fullskärmsknappen (`.fs-btn`) sitter uppe till vänster.

⛔ **VARJE reglage får finnas på EXAKT ETT ställe i fullskärm — aldrig
dubblerat.** Återkommande misstag: Start/Börja om läggs *både* i den nedre
panelen (`.fs-controls`) *och* uppe till höger (`.st-actions`), så samma
knappar syns två gånger. Styrknapparna hör hemma uppe till höger; den nedre
panelen innehåller **bara glidare/sifferfält**. Har ett scenario inga
glidare (t.ex. fallskärmshopparen) ska den nedre panelen och dess
"Dölj reglage"-handtag **inte renderas alls** — annars blir den en tom låda
eller en dubblettlåda för knappar. Kontrollera alltid i fullskärm att inget
reglage förekommer på två platser.

Så: kontinuerliga värden (glidare) nere, diskreta val + styrknappar uppe
till höger, fullskärm uppe till vänster — inga överlapp, inga dubbletter.
Referensimpl: `fysik2-konisk-pendel-app.html`, `fysik1-vektoraddition-app.html`.

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

**Kraftvektorer startar däremot i angreppspunkten:**
- **Tyngdkraft `F_G`** — i tyngdpunkten (CM).
- **Normalkraft `F_N`** — i **KONTAKTYTAN** (där kropparna möts), aldrig uppe
  på kroppen. En vikt på ett vågrätt bord → `F_N`-pilens *svans* sitter vid
  lådans **undersida** (kontaktytan mot bordet) och pilen pekar uppåt
  *genom* kroppen. Rita ALDRIG `F_N` med svansen i toppen eller mitten av
  kroppen. (Uttryckligt önskemål, påpekat 2026-06-22.)
- **Friktion `F_f`** — i kontaktytan, i kroppens bakkant (se nedan).

Kraftpilens *bas* får alltså ligga inuti/under kroppen — det är hela poängen
med en angreppspunkt. **Markera angreppspunkten med en prick
(`<circle r="2.6">`) ENDAST för tyngdkraften `F_G`** (för att tydliggöra
tyngdpunkten). Övriga krafter (`F_N`, `F_f`, `F_S`, applicerad `F` …) får
INGEN prick — bara pilen.

**Pilens skaft ska sluta vid pilhuvudets BAS, inte vid spetsen.** Ritas
pilen som `<line>` + `<polygon>`-huvud (i SVG-figurer) måste linjens
ändpunkt ligga vid huvudets bakkant, inte vid spetsen — annars sticker
linjens rundade ände ut förbi spetsen som en liten tagg. Ex: spets
`(x, t)`, huvudhöjd 9 px ⇒ `<line … y2="t+9">` och
`<polygon points="x-6,t+9 x,t x+6,t+9">`. Återkommande påpekat.

**Kraftpilens skaft ska ha `stroke-linecap="butt"`, ALDRIG `"round"`.** En
rund linjeände buktar ut en halv linjebredd **bakom** svansen (angrepps-
punkten), så pilen ser ut att starta bakom/under kontaktytan i stället för
exakt på den. Med `butt` slutar linjen precis vid angreppspunkten. (Gäller
även en ev. mörk casing-linje under pilen.) Dekorativa linjer (mark,
hatch) får däremot gärna ha runda ändar. Påpekat 2026-06-22.

**Friktion mot underlag: angreppspunkten ligger i kroppens BAKKANT** (den
kant som är "bak" sett i rörelse-/dragriktningen), inte i mitten. Puttas en
låda åt höger → `F_f` pekar åt vänster med *svansen på lådans vänsterkant*
(vid bottenhörnet) och pilen sticker ut åt vänster utanför lådan. Detta är
ett uttryckligt önskemål från användaren.

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

### Kraftfigurer: angreppspunkt, komposanter, kontakt och etiketter

Detta avsnitt samlar fel som **upprepade gånger** har behövt rättas i
kraftdiagram (låda, hand mot vägg, ballong mot tak, lutande plan). Granska
ALLTID en skärmdump mot dessa punkter innan en kraftfigur räknas som klar —
de ska inte behöva påpekas av användaren:

1. **Kraftpilen måste synligt utgå FRÅN den kropp den verkar på.** En
   normalkraft på en hand/ballong/låda ska ha sin svans i kontaktpunkten på
   *det objektet* och sitt skaft/sin spets tydligt **över objektet** — aldrig
   svävande bredvid eller liggande på den *andra* ytan (väggen/taket). Fälla:
   `F_N` ritad en bit nedanför handen eller uppe vid taket → ser ut att verka
   på fel kropp. Lägg pilen så att huvudet pekar in i/ligger på objektet.
2. **Tyngdkraften `F_G` ritas ALLTID från tyngdpunkten** (kroppens mitt),
   aldrig sidoförskjuten. Markera tyngdpunkten med en liten ifylld prick
   (`<circle r="2.6">`) vid pilens svans. Behöver `F_N` särskiljas från `F_G`
   på vågrätt underlag → förskjut **`F_N`** i sidled, inte `F_G`.
3. **SKALENLIGA KRAFTVEKTORER — pilens längd ∝ kraftens belopp (viktig
   princip, upprepat påpekad).** Rita ALDRIG alla kraftpilar "lagom långa".
   Räkna ut beloppen, välj en skala (px per N) som rymmer alla pilar, och
   sätt varje pils längd = belopp · skala. Pilhuvudet hålls lika stort på
   alla pilar — det är skaftets/totallängden som bär informationen.
   - **Lika stora krafter ritas exakt lika långa** (jämvikt `F_N = F_G` på
     vågrätt underlag; `F_N = F` mot vägg; en komposant `F_⊥ = F_N`). Annars
     klagar användaren att "den ena ser kortare ut".
   - **Dubbelt så stor kraft → dubbelt så lång pil** (24 kg-vikt ger pil
     dubbelt så lång som 12 kg-vikt).
   - **Resulterande/summa-vektor ritas lika lång som komposanterna
     tillsammans** (bom: `F_N = F_Gbom + F_Gvikt` ⇒ `F_N`-pilen lika lång som
     `F_Gbom`- och `F_Gvikt`-pilarna staplade).
   - **Vid komposantuppdelning: rita ALLA relevanta komposanter.** På lutande
     plan ska *både* den vinkelräta (`F_G · cos α`) *och* den parallella
     (`F_G · sin α`) komposanten ritas — streckade, som en parallellogram där
     `F_G` är diagonalen (rita de två kompletterande sidorna som svaga
     streckade guider).
   Gör figuren stor nog (höj `LMAX`/standardvärdet) så pilarna inte trasslar
   ihop sig till en klump vid små krafter.
4. **Etiketter får ALDRIG ligga på en färgad/mönstrad bakgrund** (tegelvägg,
   ballong, planets fyllning) — de blir svårlästa. Flytta etiketten ut till
   den lugna pappersytan precis utanför objektet (`text-anchor="end"`/
   `"start"` så den hamnar bredvid, inte på, mönstret). Detta är samma
   princip som no-white-halo-regeln: **lösningen är att flytta etiketten,
   inte att lägga en kontur/halo bakom den.**
5. **Objekt som "trycker mot / ligger mot / mot" en yta måste faktiskt
   nudda ytan** — inget mellanrum. Fejka tillplattad kontakt med z-ordning:
   rita objektet först och ytan (taket/väggen) *ovanpå*, så objektets kant
   göms och ser intryckt ut.
6. **Igenkännbara verkliga objekt (hand, kropp, fordon) ritas med omsorg**
   värdig en modern, inspirerande sida — inte som grova klumpar. Bygg t.ex.
   en hand av handflata + separata fingrar + tumme + en subtil veck-linje,
   inte två rundade rektanglar. Vid minsta tvekan: använd `grafik`-agenten.
7. **Kraftvektorns etikett (beteckning + värde) STARTAR vid pilens SPETS
   och löper utåt i fri yta — aldrig ovanpå objektet pilen verkar på.**
   Lägg etiketten en bit bortom pilspetsen i pilens riktning (med
   `text-anchor="start"`/`"end"` så texten flödar *bort* från objektet, inte
   in över det) och lyft den till en lugn pappers-/himmelsyta. Detta är
   återkommande påpekat: en kort kraftpil (liten kraft) får en spets som
   hamnar nära kroppen → en `anchor="middle"`-etikett breder då ut sig över
   kroppen. Fäst alltid etiketten vid spetsen, inte vid mitten. Gäller alla
   kraftpilar (även korta friktions-/normalpilar). Referensimpl:
   `fysik1-lutande-plan-app.html` (friktionsetiketten).
8. **En kraftpil som ligger MOT/PÅ ett objekt med liknande färg får en tunn
   MÖRK kantlinje för separation — aldrig att den smälter in.** Vanlig fälla:
   orange friktionspil på en orangebrun låda → pilen försvinner. Lägg en
   smal bläckfärgad casing (`rgba(15,22,32,0.5–0.55)`, skaft `width+3.5`,
   huvud-stroke `~2`) under den färgade pilen — INTE en vit halo (det är
   förbjudet, se no-white-outline-regeln). Skala dessutom pilhuvudet efter
   skaftlängden för korta pilar (`head = max(12, min(20, Lf·0.95))`) så att
   en liten kraft inte blir ett rent pilhuvud utan synligt skaft. Mönstret
   finns som `edge`-flaggan på `Arrow` i `fysik1-lutande-plan-app.html`.

### Måttsättning av hävarm och avstånd (måttlinje i FRI yta)

**En markerad hävarm (eller annat måttsatt avstånd) ska ALLTID vara lättläst
och får ALDRIG ligga ovanpå ett annat objekt (mark, sten, kropp, kärra …)
som försvårar läsningen** (uttryckligt önskemål 2026-07-01). Rita den som en
riktig **måttlinje**, inte som en lös streckad linje på golvet:

1. **Måttlinje med dubbelpil** (pilhuvud i båda ändar) placerad i **fri
   yta bredvid/under figuren**, förskjuten ut från objekten. Aldrig ovanpå
   marken/stenen/kroppen.
2. **Projektionslinjer** (tunna streckade) från de två punkterna avståndet
   mäts mellan (t.ex. vridpunkten och kraftens riktningslinje) ut till
   måttlinjen. Kraftens **riktningslinje** ritas gärna som en streckad
   förlängning så måttet tydligt utgår från den.
3. **Etiketten** (`l`, `l_P`, `0,25 m` …) mitt på måttlinjen, i fri yta
   (ovanför/under/vid sidan), aldrig på ett objekt. Variabel kursiv, mätetal
   och enhet rakt.
4. **Hävarmen är kraftens vinkelräta avstånd till vridpunkten** — måttet ska
   ha den riktningen (t.ex. en lodrät kraft ⇒ hävarmen är det **vågräta**
   avståndet, `l = 1{,}0\cos 45^\circ`), inte parallellt med kraften.
5. Behöver figuren vändas för att en vinkel-/måttetikett ska hamna i fri yta
   (t.ex. spegla så stenen hamnar på motsatt sida om vinkelbågen) — gör det;
   följ genomgångens PDF-orientering när den redan är fri.

Referensimpl: `fy2-1.1.md` (skiftnyckel 0,25 m, spett `l`, gungbräda
`l_P`/`l_B`) — generator-helper `dimHead(pt,dir)` i scratchpad-generatorerna.

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
<script src="https://unpkg.com/@babel/standalone@7.29.7/babel.min.js"></script>
```

⚠️ **Babel-versionen MÅSTE vara pinnad (`@7.29.7`) — av-pinna ALDRIG.**
En opinnad länk (`@babel/standalone/babel.min.js`) hämtar senaste, och
Babel 8 bytte React-presetens standard till "automatic runtime" som
injicerar `import { jsx } from "react/jsx-runtime"` överst i den
kompilerade koden. Eftersom våra appar körs som klassiskt
`<script type="text/babel">` (inte module) kraschar varje sida då med
`Uncaught SyntaxError: ... Cannot use import statement outside a module`
och renderar blankt. Projektet använder UMD-globaler (React/ReactDOM via
`<script>`), inte ES-moduler, så vi behöver den klassiska runtimen som
Babel 7 har som standard. Lägg ALDRIG till nya HTML-filer med den opinnade
länken.

För 3D: `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`
