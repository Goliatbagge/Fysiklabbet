# Poddar (ljudöversikter) till nyhetsartiklarna

Varje nyhetsartikel kan ha en **poddspelare högst upp** — en "djupdykning"
(ljudöversikt) som skapas manuellt i **NotebookLM**. Spelaren dyker upp
automatiskt så fort en ljudfil ligger i artikelns mapp här. Ingen ändring i
`data/nyheter.js` behövs, och **du behöver inte döpa om filen**.

## Så lägger du till en podd (funkar bra från mobilen)

1. **Öppna [NotebookLM](https://notebooklm.google.com/)** och skapa en ny notebook.
2. **Lägg in artikelns källor** — länkarna under "Källor" i artikeln, plus gärna
   direktlänken till originalforskningen och fler relevanta källor.
3. **Skapa en ljudöversikt** → formatet **Djupdykning**, språk **svenska**,
   längd **standard**.
4. **Ladda ner** ljudfilen.
5. **Lägg filen i artikelns mapp** här under `nyheter/podd/`. Varje artikel har
   en egen mapp som heter artikelns `id` (samma som i webbadressen `?id=…`).
   Lägg bara filen där — **namnet spelar ingen roll**.
   - Exempel: artikeln `?id=2026-06-18-juno-neutrinodetektor`
     → lägg filen i `nyheter/podd/2026-06-18-juno-neutrinodetektor/`
6. **Klart.** Ladda om artikelsidan — poddspelaren visas högst upp.

## Hur hittar spelaren rätt fil?

Sidan frågar GitHubs API vilka filer som ligger i artikelns mapp och väljer
ljudfilen automatiskt (`.m4a`, `.mp3`, `.wav`, `.ogg`, `.aac` eller `.opus`).
Ligger det flera ljudfiler i mappen väljs den största. `.gitkeep` och andra
icke-ljudfiler ignoreras.

> Eftersom det är GitHubs API som läser mappen måste filen vara **pushad till
> GitHub** för att synas på den publika sajten. Laddar du upp via GitHub-appen
> eller github.com på mobilen sköts det automatiskt när du committar uppladdningen.

## Filstorlek

**Komprimera gärna till `.m4a` eller `.mp3`.** En okomprimerad `.wav` kan bli
stor (tiotals MB) och göra sidan långsam. Några MB räcker gott för tal.

## Transparens

Poddarna är AI-genererade (NotebookLM). Spelaren visar texten
"Ljudöversikt skapad i NotebookLM", och artikeln har dessutom sin allmänna
AI-transparensnotis högst upp.
