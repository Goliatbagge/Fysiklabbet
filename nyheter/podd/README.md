# Poddar (ljudöversikter) till nyhetsartiklarna

Varje nyhetsartikel kan ha en **poddspelare högst upp** — en "djupdykning"
(ljudöversikt) som skapas manuellt i **NotebookLM**. Spelaren dyker upp
automatiskt så fort en ljudfil för artikeln ligger i den här mappen. Ingen
ändring i `data/nyheter.js` behövs.

## Så lägger du till en podd

1. **Öppna [NotebookLM](https://notebooklm.google.com/)** och skapa en ny notebook.
2. **Lägg in artikelns källor** — länkarna under "Källor" i artikeln, plus gärna
   direktlänken till originalforskningen och fler relevanta källor.
3. **Skapa en ljudöversikt** → formatet **Djupdykning**, språk **svenska**,
   längd **standard**.
4. **Ladda ner** ljudfilen.
5. **Lägg filen i den här mappen** (`nyheter/podd/`) och döp den till artikelns
   `id` (samma sträng som i webbadressen `?id=…` och i `id:`-fältet i
   `data/nyheter.js`). Behåll filändelsen.
   - Exempel: artikeln `?id=2026-06-18-juno-neutrinodetektor`
     → filen `nyheter/podd/2026-06-18-juno-neutrinodetektor.m4a`
6. **Klart.** Ladda om artikelsidan — poddspelaren visas högst upp.

> **Enklast:** skicka bara ljudfilen till assistenten (Claude Code) i en session,
> så sköts namnsättning, komprimering och placering automatiskt. Det är så den
> första podden (JUNO) lades upp.

## Format och storlek

Spelaren hittar automatiskt filer med ändelsen **`.m4a`, `.mp3`, `.wav`,
`.ogg`, `.aac`** eller **`.opus`**.

- **Komprimera gärna till en liten `.m4a`/`.mp3`.** NotebookLM-filer är ofta
  stereo i hög bithastighet (tiotals MB). Tal räcker gott med **mono ~64 kbps**,
  vilket krymper filen till några MB. Med ffmpeg:
  ```
  ffmpeg -i in.m4a -ac 1 -c:a aac -b:a 64k -movflags +faststart ut.m4a
  ```
- Ligger filen någon annanstans eller heter den något annat kan du sätta ett
  explicit `audio`-fält på artikeln i `data/nyheter.js`.

## Transparens

Poddarna är AI-genererade (NotebookLM). Spelaren visar texten
"Ljudöversikt skapad i NotebookLM", och artikeln har dessutom sin allmänna
AI-transparensnotis högst upp.
