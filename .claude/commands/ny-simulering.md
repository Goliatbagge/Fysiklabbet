# Skapa ny fysiksimulerering

Du ska skapa en ny interaktiv fysiksimulerering för Fysiklabbet.

## Steg 1: Samla information

Fråga användaren (om inte redan specificerat):
1. **Fysikämne**: Vilket fysikaliskt fenomen ska simuleras?
2. **Kurs**: Fysik 1 eller Fysik 2?
3. **Interaktivitet**: Vilka parametrar ska eleven kunna justera?

## Steg 2: Planera simuleringen

Använd `pedagog`-agenten för att:
- Verifiera fysikalisk korrekthet
- Identifiera relevanta formler
- Föreslå pedagogiska förklaringar

## Steg 3: Skapa filen

Filnamn: `fysik[1|2]-[ämne]-app.html`

Mall att utgå från:
```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[TITEL] - Fysiklabbet</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">
                <span class="logo-icon">⚛️</span>
                <span class="logo-text">Fysiklabbet</span>
            </a>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link">Hem</a></li>
                <li><a href="fysik1.html" class="nav-link [active om Fysik1]">Fysik 1</a></li>
                <li><a href="fysik2.html" class="nav-link [active om Fysik2]">Fysik 2</a></li>
            </ul>
        </div>
    </nav>

    <main class="container">
        <div class="breadcrumb">
            <a href="index.html">Hem</a> / <a href="fysik[X].html">Fysik [X]</a> / <span>[TITEL]</span>
        </div>

        <section class="intro-section">
            <h1 class="section-title">[TITEL]</h1>
            <p class="intro-text">[BESKRIVNING]</p>
        </section>

        <div id="root"></div>
    </main>

    <footer class="footer">
        <p>&copy; 2025 Fysiklabbet. Skapad för gymnasieelever.</p>
    </footer>

    <script type="text/babel">
        const { useState, useEffect, useRef, useMemo } = React;

        // Formatera nummer med kommatecken
        const formatNumber = (num, decimals = 2) => {
            return num.toFixed(decimals).replace('.', ',');
        };

        // Komponenter här...

        const App = () => {
            // State och logik...
            return (
                <div>
                    {/* Layout */}
                </div>
            );
        };

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
    </script>
</body>
</html>
```

## Steg 4: Obligatoriska efteråtgärder

1. **Uppdatera verify-navigation.js**:
   Lägg till filnamnet i `HTML_FILES_TO_CHECK`-arrayen

2. **Lägg till kort i kursöversikten**:
   Uppdatera `fysik1.html` eller `fysik2.html`

3. **Verifiera**:
   ```bash
   node .claude/verify-navigation.js
   ```

4. **Testa i webbläsare**:
   ```bash
   start [filnamn].html
   ```

## Steg 5: Kvalitetskontroll

Använd `testare`-agenten för att verifiera:
- Navigation fungerar
- Responsivitet
- Decimalformatering (komma, inte punkt)
- Inga konsolfel
