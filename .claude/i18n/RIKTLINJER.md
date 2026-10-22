# Engelska versionen — riktlinjer för översättning

Svenska är standardspråket. Engelska visas med `?lang=en` (eller när
besökaren valt English i menyn). Allt som saknar översättning visas på
svenska, så en halvfärdig översättning gör ingen skada.

## Mekanismen (i18n.js)

1. **Gränssnittet**: ordlistor svenska → engelska.
   - `i18n/en.js`: gemensamma strängar (huvudmenyn, kursnamn, kapitelnamn,
     vanliga knappar). Ägs av huvudsessionen.
   - `i18n/gemensamt/<skript>.js`: strängar i delade skript som laddas på
     många sidor (section-nav.js, feedback.js, sim-dock.js, graf.js …).
   - `i18n/sidor/<sida>.js`: strängar som bara finns på `<sida>.html`.
   Formatet:
   ```js
   I18N.add({ 'Svensk text': 'English text', … });       // exakta textnoder + attribut
   I18N.addHtml({ '<svensk innerHTML>': '<engelsk innerHTML>', … });  // hela stycken med markup
   ```
   - `add`: DOM-översättaren byter en textnod (eller title/placeholder/
     aria-label/alt) vars HELA trimmade text är nyckeln. Blanktecken
     normaliseras. `'nav:Text'` gäller bara inuti huvudmenyn.
   - `addHtml`: för ett stycke (p, li, h1–h6, td, label, button, span, div,
     a …) som innehåller inbäddade element (`<strong>`, `<a>`, `<em>`). Då
     går det inte att översätta fragmenten var för sig utan att ordföljden
     blir fel. Nyckeln är elementets innerHTML ordagrant (blanktecken
     normaliseras, `class` i JSX blir `class` i DOM — skriv nyckeln som den
     RENDERAS i webbläsaren, alltså `class="…"`, inte `className`). Behåll
     länkarnas `href` och klasserna oförändrade i översättningen.
   - Kör `node .claude/i18n/bygg-manifest.js` efter att du skapat en ny fil i
     `i18n/sidor/`, och efter VARJE ändring i `i18n/gemensamt/` (delfilerna
     slås ihop till `i18n/gemensamt.js`, som är den fil sidorna laddar).
2. **Text som byggs ihop i koden** (`'Visa ' + n + ' laddningar'`, en
   etikett som ritas på canvas, en `alert`): skriv om anropet till
   `I18N.t('Visa {n} laddningar', {n})` och lägg nyckeln i ordlistan.
   Skydda mot sidor där i18n.js saknas med
   `(window.I18N ? I18N.t(…) : '…')` bara i skript som också laddas utanför
   sajten; på sajtens sidor finns i18n.js alltid. Ändra aldrig logik som
   jämför mot svenska nycklar (kursnamn i `data/katalog.js` är nycklar).
3. **Innehåll** (teori, övningar, exit tickets, nyheter, ordlista, prov,
   katalogtexter) ligger i `data/en/…` och läggs ovanpå de svenska
   globala objekten (`I18N.overlay`). Sätt klassen `no-i18n` på behållare
   vars innehåll redan kommer på rätt språk, så att DOM-översättaren inte
   rör det.

Testa: `http://localhost:8000/<sida>.html?lang=en`. Svenska ska se ut
exakt som förut.

## Språk och stil

- **Brittisk engelska** (colour, optimisation, centre, metre). Skolfysik och
  skolmatematik på engelska, för gymnasieelever: tydligt, vänligt, utan
  slang.
- **Kursnamnen** följer `i18n/en.js`: Physics level 1, Mathematics level 1c,
  Mathematics continuation level 1c … Kurskoderna (fy1, ma2c) ändras aldrig.
  "Nationella prov" = "national tests" ("the Swedish national test" när det
  behöver förklaras).
- **Inga tankstreck (—) som pausmarkör** i ny engelsk text, samma skäl som på
  svenska (förväxlas med minustecken). Dela meningen eller använd kolon.
- **Tal**: decimalpunkt (5.0 m/s), tusental med hårt mellanslag (10 000).
  I KaTeX: `5.0` i stället för `5{,}0`. Enheter och beteckningar som förut
  (F_G, *l* för hävarm, α för vinklar).
- **Inga förkortningar** som e.g./i.e./etc. i löptext: skriv "for example",
  "that is", "and so on".
- Inga emojis, ingen title case i rubriker (bara första ordet versalt, som på
  svenska: "Draw circuit diagrams", inte "Draw Circuit Diagrams") —
  undantag: egennamn.
- Behåll ton och innehåll; översätt, skriv inte om.
- Svenska egennamn (Fysiklabbet, Guldäpplet, Skolverket) behålls, med en
  kort förklaring första gången om det behövs.
