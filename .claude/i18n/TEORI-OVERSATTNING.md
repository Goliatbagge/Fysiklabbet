# Översätta en teorigenomgång till engelska

Läs först `.claude/i18n/RIKTLINJER.md` (stil) och `.claude/i18n/termlista.md`
(fasta termer). Referensexempel på en färdig översättning:
`data/teori/en/fy1-2.1.md` jämfört med `data/teori/fy1-2.1.md`.

## Arbetsgång per fil

1. Läs `data/teori/<id>.md` i sin helhet.
2. Skriv `data/teori/en/<id>.md` — en fullständig översättning, rad för rad
   samma struktur. Översätt ALLT besökaren ser; ändra inget annat.
3. `node .claude/i18n/stampla.js <id>` (skriver källans fingeravtryck).
4. När hela din sats är klar: `node data/teori/build.js` och granska några
   filer i webbläsaren med
   `node .claude/i18n/kvar.js "katalog.html?id=<id>"` — det som listas ska
   bara vara gränssnitt som andra översätter (och pennlösningarnas text,
   som är ritad och inte syns i listan), aldrig teoritext.

## Vad som översätts och vad som lämnas

| Element | Gör så här |
|---|---|
| Frontmatter | `title:` översätts. `id`, `course`, `chapter`, `chapterNumber`, `section` lämnas EXAKT som de är (svenska nycklar). Lägg inte till `kalla:` för hand. |
| Rubriker, löptext, listor, tabeller | Översätt. |
| `[[term\|förklaring]]` | Översätt både ordet och förklaringen: `[[average speed\|Total distance …]]`. |
| `::: typ "Titel"` | Blocktypen (`exempel`, `formel`, `härledning`, `förklaring`, `textlosning`, `handskrift`, `sammanfattning`, `sampunkt`, `figur`, `demo`, `video`, `graf`, `minisim` …) står kvar på svenska. Titeln översätts. "Exempel 2 — Titel" blir "Example 2: Title". "Härledning — X" blir "Derivation: X", "Bevis" → "Proof", "Förklaring" → "Explanation". |
| `där` före variabellistan | `where` |
| `**Svar:**` | `**Answer:**` |
| `::: handskrift` | Lämna `typ: …` orört (pennlösningens text översätts separat). |
| `::: graf` | Översätt `titel:`. `uttryck:`, `ekvation:` och parameterraderna rörs inte. |
| `::: minisim` | Översätt `titel:` om den finns. `typ:` rörs inte. |
| `::: video` | Översätt `titel:` och ev. bildtext. `fil:`, `affisch:`, `ankare:`, `länk:`, `format:` rörs inte. |
| KaTeX `$…$`, `$$…$$` | Rör inte matten — utom: decimalkomma `3{,}6` → `3.6`; `\text{…}` med svenska ord översätts (`\text{minuter}` → `\text{minutes}`); svenska ord i `\mathrm{…}` som är ord, inte enheter eller etikettindex, översätts. Etikettindex med EN bokstav (`F_G`, `F_N`, `v_\mathrm{m}`, `E_p`, `m_j`) lämnas som de är — de är beteckningar. Index som är hela svenska ord översätts: `F_{G\text{bom}}` → `F_{G\text{boom}}`, `m_\text{vikt}` → `m_\text{weight}`, `F_\text{luft}` → `F_\text{air}`, `t_\text{stig}` → `t_\text{rise}`; `F_\text{drag}` behålls (samma ord på engelska). Gör samma byte i figurens etiketter, så att figur och formel stämmer. |
| Tal i löptext | `3,6` → `3.6`; `10 000` behålls (hårt mellanslag). |
| Inline-SVG i `::: figur` | Översätt `<text>`/`<tspan>`-innehåll som är ord. Behåll koordinater, kursivering och attribut. Blir en etikett märkbart längre: kontrollera att den ryms (ytterkanterna enligt `text-anchor`, se CLAUDE.md "Etiketter får aldrig klippas"), korta hellre ned ordet än flytta geometri. |
| Bilder (`::: bild`, `<img alt>`) | Översätt alt-text och bildtext. |
| Länkar | `katalog.html?id=…&block=…` behålls. Länktexten översätts. |
| Svenska ortnamn och egennamn | Behålls (Falköping, Skövde, Guldäpplet). Lägg vid behov till en kort förklaring ("the Swedish national test"). |
| Svenska valutor och sammanhang | Behålls (kr = "SEK" eller "kronor"; skriv "kr" om det står i en formel). |
| HTML-entiteter, `<br>`, `&emsp;` | Behålls exakt på samma plats. |

## Matematik- och fysikkonventioner

- Behåll beteckningarna exakt (F_G, *l* för hävarm, α för vinklar, *v*ₘ).
  Byt aldrig beteckning för att den "vanligen" heter något annat på engelska.
- Multiplikationstecknet `\cdot` står kvar.
- `lg` står kvar som i originalet (`lg x`), men förklara första gången i ett
  avsnitt om logaritmer att lg = log₁₀ om originalet inte redan gör det.
- Svenska skolord: "genomgång" = lesson, "avsnitt" = section, "kapitel" =
  chapter, "uppgift" = task/question, "nationella provet" = the national test.

## Viktigt

- Översätt troget. Lägg inte till, stryk inte, förenkla inte.
- Inga tankstreck som pausmarkör i löptext (rubriker "Example 1: …").
- Inline-matte `$…$` ligger alltid på EN källrad (bryt aldrig mitt i).
- Ändra aldrig den svenska filen.
