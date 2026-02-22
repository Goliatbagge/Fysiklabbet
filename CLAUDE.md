# CLAUDE.md - Fysiklabbet

Interaktiva fysiksimuleringar för gymnasieelever (Fysik 1 & 2).

## Tech Stack

- **Frontend**: Standalone HTML med React 18 (CDN), TailwindCSS (CDN)
- **Språk**: Svenska, kommatecken som decimalavskiljare (5,00 inte 5.00)
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

### Typografi och variabler

- **Teckensnitt**: Använd Poppins för text i canvas och UI-element
- **Fysikaliska variabler**: Ska ALLTID skrivas med *kursiv stil* (t.ex. *F*, *Q*, *r*, *v*, *a*)
- **Enheter**: Ska skrivas med rak stil (t.ex. N, C, m, m/s)
- **Subscript**: Använd Unicode-subscript för index (Q₁, Q₂, v₀, etc.)

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

## Checklista: Ny simulering

1. [ ] Kopiera navigation från mall
2. [ ] Lägg till `<link rel="stylesheet" href="styles.css">`
3. [ ] Använd korrekt breadcrumb
4. [ ] Uppdatera `verify-navigation.js` med filnamnet
5. [ ] Kör `node .claude/verify-navigation.js`
6. [ ] Lägg till kort i `fysik1.html` eller `fysik2.html`
7. [ ] Testa i webbläsare
8. [ ] Verifiera decimalformatering (komma, inte punkt)

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
