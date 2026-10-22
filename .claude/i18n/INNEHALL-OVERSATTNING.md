# Översätta datainnehåll (övningar, exit tickets, nyheter, ordlista, prov)

Läs först `.claude/i18n/RIKTLINJER.md` och `.claude/i18n/termlista.md`.
Matematik och tal följer samma regler som teorin
(`.claude/i18n/TEORI-OVERSATTNING.md`, tabellen "Vad som översätts"):
KaTeX orört utom decimalkomma (`3{,}6` → `3.6`) och svenska ord i `\text{}`;
`**Svar:**` → `**Answer:**`; beteckningar orörda.

## Arbetsgång

1. Hämta de svenska posterna som JSON:
   `node .claude/i18n/skriv-innehall.js <typ> --mall <id> <id> … > <scratch>/sv.json`
   (för många id: skriv ett litet skript som läser `laddaSvenskt(typ)` ur
   `.claude/i18n/kalla.js`).
2. Översätt till en JSON-fil med SAMMA form, `{ "<id>": <engelsk data> }`,
   i din scratchpad. Skriv hellre ett skript som bygger JSON:en (via
   `JSON.stringify`) än att handskriva escapad JSON — backslash i KaTeX
   är lätt att tappa. Var noga: `\\frac` i JSON-källan är `\frac` i datan.
3. `node .claude/i18n/skriv-innehall.js <typ> <delnamn> <fil.json>` skriver
   `data/en/<typ>/<delnamn>.js` med fingeravtryck och uppdaterar manifestet.
   Samma delnamn kan skrivas i flera omgångar (posterna slås ihop).
4. Kontrollera: `node .claude/verify-engelska.js <typ>` (dina id ska räknas
   som översatta) och en sida i webbläsaren med
   `node .claude/i18n/kvar.js "<sida>?…"`.

## Per typ

**ovningar** (`window.OVNINGAR[id]` = lista av övningar). Hela listan
ersätts, så ta med VARJE övning i samma ordning. Översätt `question`,
`solution`, `choices`, `delsvar`-texter och `answer.unit` bara om enheten är
ett ord (`"st"` → `""` eller "pcs", `"kr"` behålls). Rör aldrig `level`,
`correct`, `answer.value`, `answer.tol`, `penna` eller figurfunktionernas
anrop. **Figurer**: frågor kan innehålla SVG genererad av hjälpfunktioner
när datafilen körs — i JSON:en ser du då den färdiga SVG-strängen; översätt
dess `<text>`-ord och behåll resten. Kontrollera i webbläsaren att figurerna
fortfarande syns.

**exittickets** (lista av `{question, choices, correct, why}`). Översätt
`question`, `choices`, `why`. Rör aldrig `correct` eller ordningen.

**nyheter** (`{id, title, deck, body, imageAlt, imageCredit?, tags,
category, research, larare, sources, …}`). Översätt `title`, `deck`,
`imageAlt`, `body` (varje blocks `html`/`text`/`caption`/`title`/`items`),
`larare` (lärartips) och bildtexter. `tags` och `category` översätts
(fasta värden: se `i18n/sidor/nyheter.js`). Rör inte `id`, `date`, `time`,
`image`, `sources`, `research.citation` (ordagrann källhänvisning, ofta
redan engelska) eller länkar. Ta bara med fält som ska bytas.
Citat från svenska källor översätts; citat som i originalet var på
engelska och översattes till svenska: hämta inte originalet, översätt
tillbaka troget. Begreppslänkningen sker automatiskt mot den engelska
ordlistan.

**begrepp** (`{id, term, former, kort, relaterade, body}`). Översätt
`term`, `kort`, `body`. `former` ersätts med ENGELSKA böjningsformer
(gemener: singular, plural, eventuell vanlig variant) — de styr vilka ord
som blir klickbara i de engelska artiklarna. En form får bara tillhöra ett
begrepp. `id` och `relaterade` rörs inte. Ingen KaTeX på `begrepp.html`
(samma regel som på svenska).

**np** (`window.NP_PROV[id]`: `{namn, kort, intro, delprov, uppgifter, …}`).
Översätt de fält som visas: `namn`, `kort`, `intro`, delprovens rubriker
och instruktioner, varje uppgifts `fraga`/`text`, `steg`, `svar`, `delsvar`,
`bedomning` och liknande. Rör inte id, poäng, `figur`-nycklar och
`penna`-namn. Ta med HELA `uppgifter`-listan i rätt ordning om du byter den
(fälten slås ihop på provnivå, så en lista ersätts i sin helhet).
Provets namn: "Nationellt prov Fysik 1 VT2017" → "National test Physics 1,
spring 2017"; VT = spring term, HT = autumn term.

**repetition** (`window.REPETITION[id]`). Hela posten ersätts; översätt alla
visade texter, rör inte id och strukturfält.

**np-figurer** (provens SVG-figurer, `data/np/<prov>-figurer.js`, genererade
— rör dem aldrig). Ordlista i `data/en/np/<prov>-figurer.js`:
```js
I18N.svgEtiketter('NP_FIGURER', '<prov>', { 'efter 8 h': 'after 8 h', 'Vatten': 'Water', … });
```
Nyckel = HELA texten i ett `<text>`/`<tspan>` (eller ett `aria-label`/`title`)
exakt som i SVG-strängen. Tal med decimalkomma görs om automatiskt; ord
behöver stå i ordlistan. Hämta kandidaterna med ett skript som läser
`window.NP_FIGURER[id]` och plockar `>([^<]*[A-Za-zÅÄÖåäö][^<]*)<` ur
`<text>`/`<tspan>` samt aria-label. Kör `node .claude/i18n/bygg-manifest.js`
efteråt. En engelsk etikett som är mycket längre än den svenska kan klippas:
kontrollera i webbläsaren (`np.html?id=<prov>:<uppgift>&lang=en`) och korta
hellre ordet.
