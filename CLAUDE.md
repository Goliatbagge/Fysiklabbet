# CLAUDE.md

Projektinstruktioner för Claude Code när du arbetar med Fysiklabbet.

## Projekt Översikt

Fysiklabbet är en samling interaktiva fysiksimuleringar för gymnasieelever.
- **Tekniker**: Standalone HTML-filer med React (via CDN), TailwindCSS
- **Målplattform**: Webb (moderna webbläsare)

## ⚠️ KRITISK REGEL: NAVIGATION I ALLA HTML-FILER

**DETTA ÄR EXTREMT VIKTIGT OCH HAR MISSATS 5 GÅNGER TIDIGARE!**

### Varje ny HTML-simulering MÅSTE innehålla:

1. **CSS-länk i `<head>`:**
```html
<link rel="stylesheet" href="styles.css">
```

2. **Navigationsmeny direkt efter `<body>`:**
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
        </ul>
    </div>
</nav>
```

### Verifiering

**KÖR ALLTID innan commit:**
```bash
node .claude/verify-navigation.js
```

Detta script kontrollerar att alla HTML-filer har korrekt navigation.

Se `.claude/NAVIGATION-CHECKLIST.md` för detaljerad mall.

## Utvecklingskommandon

- **Verifiera navigation**: `node .claude/verify-navigation.js`
- **Öppna lokalt**: Öppna HTML-filerna direkt i webbläsare
- **Linting**: Ej implementerat än
- **Test**: Manuell testning i webbläsare

## Arkitektur

### Fil-struktur
```
/
├── index.html              # Startsida
├── fysik1.html             # Fysik 1 innehållsförteckning
├── fysik2.html             # Fysik 2 innehållsförteckning
├── fysik1-*.html           # Individuella Fysik 1 simuleringar
├── fysik2-*.html           # Individuella Fysik 2 simuleringar
├── styles.css              # Gemensam CSS (navigation, layout)
└── .claude/
    ├── verify-navigation.js
    └── NAVIGATION-CHECKLIST.md
```

### Design-principer
- Varje simulering är en **standalone HTML-fil**
- React och andra bibliotek laddas via CDN
- TailwindCSS används för styling
- Svenska språk och kommatecken som decimalavskiljare
- Alla simuleringar har enhetlig navigationsmeny

### Beroenden
- React 18 (via CDN)
- TailwindCSS (via CDN)
- Vissa simuleringar använder Three.js eller andra 3D-bibliotek

## Checklista för nya simuleringar

1. ✅ Använd mallen från `.claude/NAVIGATION-CHECKLIST.md`
2. ✅ Inkludera `<link rel="stylesheet" href="styles.css">`
3. ✅ Lägg till `<nav class="navbar">` direkt efter `<body>`
4. ✅ Kör `node .claude/verify-navigation.js` innan commit
5. ✅ Lägg till kortet i rätt sektion i `fysik1.html` eller `fysik2.html`
6. ✅ Testa i webbläsare
7. ✅ Committa och pusha

## Svenska Konventioner

- Använd svenska i all text
- Kommatecken (`,`) som decimalavskiljare, inte punkt (`.`)
- Exempel: `5,00 kg` inte `5.00 kg`
