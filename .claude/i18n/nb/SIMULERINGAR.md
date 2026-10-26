# Översätta en simulering till norska (bokmål)

Simuleringarna (`fysik1-*.html`, `fysik2-*.html`) visas på norska med
`?lang=nb`, till exempel `https://fysiklabbet.se/fysik1-densitet-app.html?lang=nb`.
Svenskan är källan. Referens: `fysik1-densitet-app` (pilot, 2026-10-26).

## Så fungerar det

- `i18n.js` (laddas först i `<head>`) slår på norska när adressen har
  `?lang=nb` och sidan är en simulering. Valet sparas, och länkar mellan
  simuleringar får `?lang=nb` automatiskt. Andra sidor (katalog, teori)
  stannar på svenska.
- **Ordlistor**: `i18n/nb.js` (gemensamt: meny, sidfot, vanliga knappar,
  delade skript) och `i18n/nb/sidor/<sida>.js` (en per simulering).
  DOM-översättaren byter varje textnod och attributen
  `title`/`placeholder`/`aria-label`/`alt` vars HELA trimmade text är en
  nyckel, även när React ritar om.
- **Decimalkomma behålls** på norska, så tal behöver inte göras om.

## Arbetsgång per simulering

1. **Samla strängarna.** Kör
   `node .claude/i18n/extrahera.js <sida>.html` (statiska kandidater ur
   källan, även text i lägen som inte syns vid start) och
   `node .claude/i18n/nb/kvar.js <sida>.html` (det som syns, inklusive
   canvas-text, på norska). Läs dessutom JSX-koden: text i villkorade
   grenar (fullskärm, andra lägen, gissa-läget, felmeddelanden) syns inte
   förrän de ritas.
2. **Skriv `i18n/nb/sidor/<sida>.js`** efter mönstret i
   `fysik1-densitet-app.js`. Nyckeln är den svenska texten exakt (blanktecken
   normaliseras). Fackorden ur `.claude/i18n/nb/termlista.md`.
   - Text som JSX delar runt inline-element (`Friktionen följer dragkraften (`
     + `<em>F</em>` + `) tills den når`) blir flera nycklar, en per textnod.
     Norsk ordföljd ligger nära svenskan, så det går nästan alltid; gör det
     inte det, skriv om fragmenten så att helheten blir rätt norska.
   - Brödsmulans sista led är en egen textnod: `'/ Densitet': '/ Tetthet'`.
   - `<title>`, `meta description`, `og:title`, `og:description`,
     `twitter:*` översätts med sina exakta strängar.
   - Versalsatta rubriker (`textTransform: 'uppercase'`) är vanlig text i
     DOM:en och behöver ingen versalvariant; text som versaliseras i KODEN
     (`.toUpperCase()`) behöver det.
3. **Text som byggs ihop i koden** (mallsträngar, `'Visa ' + n`,
   canvas `fillText`, `alert`, `title={…}` med variabler) översätts med
   `I18N.t()` där den ritas, alltid med skydd:
   `window.I18N ? I18N.t('Massa') : 'Massa'`, eller platshållare
   `I18N.t('Visa {n} laddningar', {n})` med nyckeln `'Visa {n} laddningar'`.
   Ändra aldrig själva logiken. Jämförelser mot strängar
   (`m.name === e.target.value`) ska fortsätta använda de svenska värdena.
4. **Bygg manifestet**: `node .claude/i18n/nb/bygg-manifest.js`.
5. **Kontrollera**: `node .claude/i18n/nb/kvar.js <sida>.html` ska ge 0
   (eller bara namn/enheter som är lika på båda språken). Pröva också
   lägen och fullskärm i webbläsaren; kvar.js ser bara det som är ritat.
6. **Språkgranskning**: agenten `norsk-sprakgranskare` granskar ordlistan
   och rättar. Simuleringen är klar först när den fått GODKÄND.
7. **Svenskan får inte ändras.** Kör simuleringen utan `?lang=nb` och
   kontrollera att den ser ut som förut och inte ger JS-fel.

## Regler för den norska texten

- Bokmål, moderat norm, `-en` i bestämd form singular. Se agentfilen.
- Inga tankstreck som pausmarkör, inga förkortningar i löptext (sajtregler).
- Beteckningar, formler, enheter och tal översätts aldrig.
- Samma svenska term blir samma norska term i alla simuleringar
  (termlistan). En ny term läggs till i termlistan.
