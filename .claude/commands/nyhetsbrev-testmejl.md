# Lägg upp veckans nyhetsbrev i EmailOctopus och skicka testmejlet

Körs headless (`claude --chrome -p`) av `.claude/server/nyhetsbrev-test.ps1`
på lördagsmorgonen. Användarens stående önskemål (2026-10-17): det första
testmejlet ska komma automatiskt, utan att hen behöver be om det, och det
ska skickas från EmailOctopus i Chrome. Gmail-kopplingen duger inte: den tar
bort alla `<img>` ur HTML:en, så brevet kom fram utan bilder.

Skriptet har redan kontrollerat att söndagens utkast finns på main.
`$ARGUMENTS` är utkastets datum (ÅÅÅÅ-MM-DD).

1. Kör hela flödet i `.claude/commands/brev-till-octopus.md` för utkastet
   `$ARGUMENTS`: förutsättningarna, Setup-, Design- och Content-stegen.
   Finns redan en kampanj för samma datum i kampanjlistan: uppdatera dess
   innehåll i stället för att skapa en ny.
2. Gå till Content-stegets **Preview & test**, klicka **Send as test** och
   **Send** i dialogen (mottagaren är förifylld med kontots adress).
   Kontrollera bekräftelsen "Sent!".
3. **Schemalägg ALDRIG** och tryck aldrig på Schedule eller Send i
   Send-steget. Det riktiga utskicket är användarens.
4. Är Chrome utloggad från EmailOctopus: stanna på inloggningssidan, fyll
   aldrig i något, och rapportera det.
5. Stäng flikarna du öppnat. Avsluta med EN rad: `TESTMEJL SKICKAT
   <kampanjnamn>` om det gick, annars `FEL: <orsak>`.
