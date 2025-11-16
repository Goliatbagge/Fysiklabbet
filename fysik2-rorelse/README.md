# Snett Kast - Projektilrörelse Simulering

En interaktiv simulering av snett kast (projektilbana) byggd med React, TypeScript och Vite.

## Funktioner

- 🎯 Justera utkastvinkel, utgångshastighet och utkasthöjd
- 🌍 Välj gravitation från olika himlakroppar (Jorden, Mars, Jupiter, etc.)
- 📊 Visualisera hastighetsvektorer (vₓ, vᵧ, total hastighet)
- 💨 Aktivera luftmotstånd för mer realistisk simulering
- ⏸️ Pausa, stega framåt/bakåt genom simuleringen
- 🔍 Zooma och panorera canvas
- 📐 Visa koordinataxlar och symmetrilinje

## Installation och Utveckling

### Förutsättningar
- Node.js (v18 eller senare)
- npm

### Installera beroenden
```bash
npm install
```

### Utvecklingsserver
```bash
npm run dev
```
Öppna http://localhost:5173 i din webbläsare.

### Bygga för produktion
```bash
npm run build
```
Detta skapar en optimerad version i `dist/` mappen.

### Förhandsgranska produktionsbygget
```bash
npm run preview
```

## Projektstruktur

```
fysik2-rorelse/
├── src/
│   ├── components/
│   │   ├── CelestialBodySelector.tsx  # Väljare för himlakroppar
│   │   ├── ControlPanel.tsx           # Kontrollpanel med inställningar
│   │   ├── SimulationCanvas.tsx       # Canvas-ritning av simuleringen
│   │   └── icons.tsx                  # SVG-ikoner
│   ├── App.tsx                        # Huvudkomponent
│   ├── constants.ts                   # Fysikaliska konstanter
│   ├── types.ts                       # TypeScript-typer
│   ├── index.tsx                      # Entry point
│   └── index.css                      # Global styling
├── index.html                         # HTML-mall
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Teknologier

- **React 18** - UI-bibliotek
- **TypeScript** - Typsäkerhet
- **Vite** - Build tool och dev server
- **Tailwind CSS** - Utility-first CSS framework
- **HTML5 Canvas** - Grafisk rendering

## Fysikaliska Formler

### Utan luftmotstånd:
- Position: `x(t) = v₀ · cos(θ) · t`, `y(t) = v₀ · sin(θ) · t - ½gt²`
- Maxhöjd: `h = (v₀ · sin(θ))² / (2g)`
- Räckvidd: `R = v₀² · sin(2θ) / g`
- Flygtid: `t = 2v₀ · sin(θ) / g`

### Med luftmotstånd:
- Dragkraft: `F_drag = -k · v · |v|` där k är luftmotståndskoefficienten
- Numerisk integration med Euler-metoden

## Licens

Skapad för Fysiklabbet - Gymnasieelever 2025
