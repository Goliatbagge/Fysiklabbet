# ⚠️ NAVIGATIONSKONTROLL - KRITISKT VIKTIGT

## VARJE GÅNG EN NY HTML-FIL SKAPAS MÅSTE DEN INNEHÅLLA:

### 1. CSS-länk i `<head>`:
```html
<link rel="stylesheet" href="styles.css">
```

### 2. Komplett navigationsmeny direkt efter `<body>`:
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

### 3. Sedan kommer `<div id="root">` eller innehåll

## VERIFIKATION

Kör detta kommando för att verifiera alla filer:
```bash
node .claude/verify-navigation.js
```

## DETTA HAR MISSATS 5 GÅNGER TIDIGARE!

Lägg till detta i din checklista INNAN du skapar nya filer.

### Mall för nya HTML-filer:
```html
<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[TITEL] - Fysiklabbet</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Övriga scripts... -->
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
                <li><a href="fysik1.html" class="nav-link active">Fysik 1</a></li>
                <li><a href="fysik2.html" class="nav-link">Fysik 2</a></li>
            </ul>
        </div>
    </nav>

    <!-- Innehåll här -->

</body>
</html>
```
