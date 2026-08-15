# Ladda upp veckans nyhetsbrev till EmailOctopus

Använd denna command för att föra över det senaste nyhetsbrevsutkastet till
EmailOctopus som en färdig kampanj — allt utom själva schemaläggningen, som
användaren alltid trycker på själv. Flödet är beprövat (första gången körd
2026-08-15 för premiärbrevet) och kräver att användaren är inloggad på
emailoctopus.com i Chrome.

## Argument
- `$ARGUMENTS` — utkastets datum (t.ex. `2026-08-23`). Utelämnas det: ta den
  senaste filen i `.claude/nyhetsbrev/utkast/`.

## Förutsättningar (kontrollera FÖRE webbläsaren)

1. **Utkastet finns**: `.claude/nyhetsbrev/utkast/<datum>.html`. Läs dess
   HTML-kommentar överst — den innehåller ÄMNESRAD, PREHEADER och utskickstid.
2. **Streckkoll**: grep `mdash|—|–` i utkastet ska ge noll träffar
   (tankstrecksregeln, se `.claude/agents/nyhetsbrev.md`).
3. **Sidfoten har EmailOctopus-taggarna**: `{{UnsubscribeURL}}`,
   `{{SenderInfo}}` och `{{RewardsURL}}` måste finnas i utkastet — annars
   vägrar EmailOctopus skicka. Saknas de: kopiera sidfotsblocket från
   `.claude/nyhetsbrev/valkomstmejl.html`, committa och pusha.
4. **Bilderna är live**: varje `https://fysiklabbet.se/...`-bild-URL i
   utkastet ska svara 200 (Invoke-WebRequest -Method Head). Om inte: pusha
   main först — mejlet visar annars trasiga bildrutor.

## Kampanjen i EmailOctopus (claude-in-chrome)

1. Gå till `https://emailoctopus.com/campaigns` → **Create a campaign**.
2. **Setup-steget**:
   - Kampanjnamn (pennikonen vid "Untitled"): `Nyhetsbrev nr N - <datum>`
     (N = löpnumret; kolla föregående kampanjer i listan).
   - Sending from (name): `Fysiklabbet`
   - Sending from (email): `kontakt@fysiklabbet.se`
   - Subject: ÄMNESRAD ur utkastets kommentar.
   - Preview text: PREHEADER ur utkastets kommentar.
   - Sending to: All subscribers. → **Save & next**.
   - OBS: `form_input` kan blockeras av permission-klassificeraren på vissa
     fält — klicka i fältet och använd `type` i stället.
3. **Design-steget**: Start from scratch → **Code your own** → klicka kortet.
4. **Content-steget** (CodeMirror 6-editor):
   - Bygg inklistrings-HTML: utkastets innehåll + den dolda preheader-diven
     direkt efter `<body ...>`-taggen:
     `<div style="display: none; max-height: 0px; overflow: hidden;">{{PreviewText}}` + ~90 st `&nbsp;` + `</div>`
   - CM6-vyn är INTE åtkomlig via API (ingen `cmView`). Fungerande metod via
     `javascript_tool` (base64-koda HTML:en för transporten):
     ```js
     const html = new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));
     const content = document.querySelector('.cm-content');
     content.focus();
     document.execCommand('selectAll');
     document.execCommand('insertText', false, html);
     ```
   - Verifiera i förhandsvisnings-iframen (JS): alla `d.images` har
     `complete && naturalWidth > 0`, och sidfotstexterna finns i
     `d.body.innerText`. → **Save & next**.
5. **Send-steget**: välj gärna radioknappen "Send at a specific time" —
   **men fyll INTE i leveransfälten och tryck ALDRIG på
   Schedule/Send/Preview & test.** Skicka-steget är användarens:
   testskick till egen adress, datum/tid (söndag **06.00 svensk tid**,
   standard sedan 2026-08-15 — kontrollera att tidszonen står på Stockholm,
   inte London) och Schedule-knappen.

## Efterarbete

- Rapportera till användaren exakt vad som återstår (testskick +
  schemaläggning) med värdena ifyllda i klartext.
- Notera i `.claude/nyhetsbrev/logg.md` under brevets post att kampanjen är
  upplagd i EmailOctopus (datum + kampanjnamn).

## Kända fällor

- EmailOctopus API v2 kan INTE skapa kampanjer (bara läsa/rapportera) —
  webbläsarvägen är enda vägen. Kontrollerat 2026-08-15.
- Tidszonen på Send-steget default:ar till London (UTC+1). 06.00 svensk
  sommartid = 05.00 London — byt hellre tidszon till Stockholm än att räkna om.
- En aktiv automation (välkomstmejlet) ska INTE röras — den är skrivskyddad
  när den är aktiv, och så ska den förbli.
