# Verifiera projektet

Kör fullständig verifiering av Fysiklabbet-projektet.

## Automatiska kontroller

### 1. Navigation
Kör navigationsverifieringen:
```bash
node .claude/verify-navigation.js
```

### 2. HTML-validering
Kontrollera alla HTML-filer för:
- `lang="sv"` på `<html>`
- `<link rel="stylesheet" href="styles.css">`
- Korrekt `<nav class="navbar">`
- Breadcrumb efter navigation
- Footer

### 3. Decimalformatering
Sök efter `.toFixed(` och verifiera att det följs av `.replace('.', ',')`:
```bash
findstr /s /i "toFixed" *.html
```

### 4. Konsistens i kursöversikter
Verifiera att alla simuleringar som finns som filer också har kort i:
- `fysik1.html`
- `fysik2.html`

## Rapportera resultat

Lista eventuella problem i formatet:
```
✅ Navigation - OK (X filer kontrollerade)
✅ Decimalformatering - OK
❌ Saknat kort i fysik1.html för: fysik1-exempel.html
```

## Åtgärda problem

Om problem hittas, föreslå konkreta lösningar och genomför dem om användaren godkänner.
