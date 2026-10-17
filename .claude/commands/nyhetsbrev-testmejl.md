# Skicka testmejlet med veckans nyhetsbrev

Körs headless av `.claude/server/nyhetsbrev-test.ps1` på lördagsmorgonen
(användarens stående önskemål 2026-10-17: det första testmejlet ska komma
automatiskt, utan att hen behöver be om det). Skriptet har redan kört
`node .claude/nyhetsbrev/testmejl.js`, som lagt det färdiga brevet i en fil.

1. Läs `%TEMP%\nyhetsbrev-test.json` (sökvägen står i `$ARGUMENTS` om den
   skickats med). Den innehåller `amne` och `fil`.
2. Läs hela HTML-filen `fil`. Ändra ingenting i den.
3. Ladda Gmail-verktyget med ToolSearch
   (`select:mcp__claude_ai_Gmail__send_message`) och skicka EN gång:
   - `to`: `["sam.skoglund83@gmail.com"]` (aldrig någon annan adress)
   - `subject`: `amne` ur json-filen
   - `htmlBody`: hela filens innehåll
4. Svara med en enda rad: `SKICKAT <meddelande-id>` om det gick, annars
   `FEL: <orsak>`.

Skicka aldrig något via EmailOctopus, och committa ingenting.
