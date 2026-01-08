# Uppdatera navigation i alla filer

Uppdaterar navigationsmenyn i alla HTML-filer till aktuell standard.

## Navigation som ska användas

```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="logo">
            <span class="logo-icon">⚛️</span>
            <span class="logo-text">Fysiklabbet</span>
        </a>
        <ul class="nav-menu">
            <li><a href="index.html" class="nav-link">Hem</a></li>
            <li><a href="fysik1.html" class="nav-link">Fysik 1</a></li>
            <li><a href="fysik2.html" class="nav-link">Fysik 2</a></li>
        </ul>
    </div>
</nav>
```

## Steg

1. **Hitta alla HTML-filer**:
   ```bash
   dir /b *.html
   ```

2. **För varje fil**:
   - Läs filen
   - Kontrollera om navigation saknas eller är felaktig
   - Uppdatera vid behov (sätt `active` på rätt länk baserat på filnamn)

3. **Verifiera**:
   ```bash
   node .claude/verify-navigation.js
   ```

## Automatisk `active`-klass

- `fysik1-*.html` → `active` på "Fysik 1"
- `fysik2-*.html` → `active` på "Fysik 2"
- `index.html` → `active` på "Hem"

## Rapport

Visa vilka filer som uppdaterades och vilka som redan var korrekta.
