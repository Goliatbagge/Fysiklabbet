# Labbfolket: från manus till schemalagd reel

`masterprompt-labbfolket.md` tar en film från idé till scenprompter och
redigeringsplan. Den här filen tar vid där och beskriver hur filmen byggs på
den här datorn och hur den publiceras. Allt nedan har gjorts på de fyra
första filmerna (2026-10-28–31), och mallarna ligger i `filmer/`.

När användaren skriver "gör en Labbfolket-film": kör masterpromptens steg 1–8
i samtalet (idéer, format, längd, faktakontroll och manus, scenplan och
redigeringsplan), sedan stegen här. Fråga användaren vid varje STOPPA i
masterprompten. Fråga också innan något publiceras, om inte uppdraget redan
sa att filmen ska ut.

## Mappar och mallar

```
.claude/video/
├── masterprompt-labbfolket.md    idé → manus → scenprompter → redigeringsplan
├── produktion.md                 den här filen
├── karaktarer/                   karaktärsark + README med röst-id:n
├── verktyg/cors_server.py        filserver för YouTube-uppladdningen
└── filmer/<film>/
    ├── manus.json                {"segment": [{"scen", "tal", "undertext"}]}
    ├── scenplan.txt              scen för scen: AI-klipp eller egen animation
    ├── scenprompter.txt/.json    prompterna till Flow (byggs av bygg/scenprompter.py)
    ├── rost-nils/ eller rost-malin/   scenNN.mp3, langder.json, helspar.mp3, tidslinje.txt
    ├── klipp/                    AI-klippen från Flow, döpta scenNN-….mp4
    ├── arbete/                   lager/ (PNG-textlager), sN/ (egna scener), undertexter.json
    ├── bygg/                     scenprompter.py, egna.html, render.html, rendera.js, montera.py
    ├── <film>.mp4                fullversionen (YouTube)
    └── <film>-liten.mp4          högst 10 MB (Facebook och Instagram)
```

**Mallen är `filmer/faradays-bur/`**, den första filmen med de nya figurerna
och den renaste uppsättningen. Kopiera hela `bygg/`-mappen till den nya
filmen och skriv om det som är filmspecifikt (scener, textlager, egna
animationer). `tung-och-latt-boll/bygg/rost_film.py` är röstskriptet och
används som det är.

## Steg 1: Välj huvudfigur

Nils och Malin varvas: en av dem per film, aldrig båda, och huvudfiguren
läser sitt eget manus. Kolla vem som hade förra filmen
(`karaktarer/README.md` och mapparna i `filmer/`) och ta den andra, om inte
användaren säger något annat.

| Figur | Röst-id (ElevenLabs, `eleven_v4`) |
|---|---|
| Nils | `Pl7pcT0MQ5oC83oklshh` |
| Malin | `zyfJspwEDo0sxPeFmtsn` |

## Steg 2: Manus

- Masterpromptens steg 4 ger manuset. Faktakontrollera fysiken mot
  teorigenomgången (`data/teori/*.md`) och beteckningarna mot den, som för
  allt annat på sajten.
- **Agenten `rostmanus`** skriver om repliken till det som ska *sägas*
  (`tal`): tal i ord, "dom" där det låter naturligt och v4-taggar för pauser.
  `undertext` följer sajtens stavning och typografi (siffror, "de", "ned").
  Innehållet i de två ska vara detsamma.
- Spara som `filmer/<film>/manus.json`. Ett segment per scen; sista scenen
  (slutskylten) har ingen replik.
- En replik bör rymmas på högst cirka 4 sekunder. Längre repliker gör
  scenen längre, och AI-klippen får inte sträckas hur mycket som helst
  (se steg 6).

## Steg 3: Röst

```bash
python -I filmer/tung-och-latt-boll/bygg/rost_film.py filmer/<film>/manus.json filmer/<film>/rost-nils Pl7pcT0MQ5oC83oklshh
```

- Nyckeln ligger i användarvariabeln `ELEVENLABS_API_KEY`. Kör Python via
  PowerShell om Git Bash svarar med exit 127.
- Repliker som redan finns återanvänds; `--ny` genererar om allt. Vill du
  göra om en enda replik: radera dess `scenNN.mp3` och kör igen.
- Skriptet skriver `tidslinje.txt` (scen, start, slut i sekunder). Den styr
  allt efteråt: klippens längd, undertexterna och textlagren.
- **Provlyssna `helspar.mp3`** och låt användaren göra det innan klippen
  beställs. Ett uttalsfel rättas i `tal`, aldrig i undertexten.

## Steg 4: Scenprompter

- Skriv scenplanen i `bygg/scenprompter.py` (kopia från faradays-bur). Den
  hämtar HUSSTILEN och det LÅSTA FIGURBLOCKET ordagrant ur masterprompten,
  så att alla klipp får samma figur och stil. Skriv aldrig av dem för hand.
- AI-klippen visar figuren och vardagssituationen, **aldrig själva fysiken**
  (FYSIKREGELN). Allt som ska stämma, som fält, pilar, banor och mätvärden,
  görs som egna animationer i steg 7.
- Utdata: `scenprompter.txt` (inklistras i Flow) och `scenprompter.json`.

## Steg 5: AI-klippen i Google Flow

Läs minnet om Flow innan du börjar. Det viktigaste:

- Använd användarens **inloggade Flow-flik** (flow.google.com) i
  BOSGAME-Chrome, flyttad till din flikgrupp, och ha ingen annan flik aktiv
  i gruppen (annars fryser Flow).
- Agentinställningar: Bekräfta = Aldrig, video **9:16**, Omni 1.1 Flash.
- Ladda upp karaktärsarket (`karaktarer/<figur>-karaktarsark.jpg`) med en
  egen dold `<input type=file>` + `file_upload` och ett `drop`-event på
  projektytan, lägg det i prompten via "+", och klistra in hela
  `scenprompter.txt` med `execCommand('insertText')`.
- Ladda ned varje klipp i 720p (originalstorlek). Sidan fryser i 30 s till
  flera minuter efter varje klipp, så vänta på en lyckad skärmbild före
  nästa klick. Kakrutan och Chromes behörighetsrutor låser sidan; be
  användaren klicka Tillåt.
- Döp om till `klipp/scenNN-<kort namn>.mp4`.

## Steg 6: Granska klippen

Titta på varje klipp innan det används (en kontaktbild med några rutor per
klipp, `ffmpeg -vf "fps=1,scale=270:-1,tile=…"`):

- Rätt figur, rätt stil och ingen fysik som AI:n hittat på.
- **AI-text i hörnet** ("#ece3d2", "8" och liknande) retuscheras bort med
  `ffmpeg -vf delogo=x=…:y=…:w=…:h=…`.
- Krockar figuren med rubriken eller slutskylten (de nya figurerna står ofta
  i helfigur): `python -I filmer/slutklipp.py <klipp> <papper.png> <ut> <tonstart_y> [lyft]`
  lyfter eller sänker klippet och tonar över i papperet.
- Ett dåligt klipp genereras om i Flow med samma prompt och en kort rättelse.

## Steg 7: Egna animationer, textlager och undertexter

- De egna scenerna (fysiken) ritas i `bygg/egna.html` i laboranstemat: blå
  kulspets på rutat papper, samma beteckningar som teorigenomgången och
  husets typografiregler (kursiva variabler, decimalkomma, inga tankstreck).
- `bygg/rendera.js` renderar textlager (krok, formel, slutskylt),
  undertexter och de egna scenernas bildrutor till PNG:

  ```bash
  NODE_PATH="$TEMP/pptr-test/node_modules" node filmer/<film>/bygg/rendera.js filmer/<film>/arbete filmer/<film>/rost-nils/tidslinje.txt filmer/<film>/manus.json
  ```

  Undertexterna delas i högst två rader och får hårt mellanslag mellan tal
  och enhet. Slutskylten: "Testa själv på fysiklabbet.se" plus
  simuleringens namn.
- Granska varje lager och varje egen scen i skärmdump: inget textlager över
  figuren, inga etiketter på linjer, ingen vit halo.

## Steg 8: Montering

```bash
python -I filmer/<film>/bygg/montera.py filmer/<film>/arbete filmer/<film>/klipp filmer/<film>/rost-nils filmer/<film>/<film>.mp4
```

- Varje scen klipps efter röstens tidslinje. AI-klippen sträcks eller
  trycks ihop till scenens längd inom 0,77–1,35 gånger; längre än så står
  sista bildrutan kvar. Bara rösten, ingen musik och inga ljudeffekter.
- Skriv i `montera.py` vilka scener som är egna (`egna`) och vilka textlager
  som läggs på var (`lager`).
- **Liten version för Meta** (Business Suite tar högst 10 MB via
  `file_upload`):

  ```bash
  ffmpeg -v error -y -i <film>.mp4 -vf scale=720:1280 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -movflags +faststart <film>-liten.mp4
  ```

  Blir den ändå över 10 MB: höj `-crf` ett steg i taget.
- Skicka filmen till användaren med SendUserFile och vänta på klartecken
  innan något publiceras.

## Steg 9: Texter till inläggen

Skriv texterna i en JSON-fil i filmmappen, en post per kanal (mall:
`filmer/texter-omgjorda.json`). Inga emojier, inga tankstreck, korrekturläs
med `korrekturlasare` vid tveksamhet.

- **YouTube:** titel = filmens fråga (högst 60 tecken, "Labbfolket" behövs
  inte). Beskrivning på två–tre meningar plus länken till simuleringen eller
  teoriavsnittet. Aldrig `<` eller `>` i beskrivningen (då blir Nästa grå
  utan förklaring).
- **Facebook:** samma krok, två–tre meningar, och sist "Testa själv i
  simuleringen X, länken finns i första kommentaren." Ingen länk i texten
  (sämre räckvidd), och ingen nivåmarkering som "gymnasienivå".
- **Instagram:** kroken, två meningar, "Testa själv i simuleringen X på
  Fysiklabbet, länk i bion." och fyra hashtaggar (`#fysik` + ämnet +
  `#naturvetenskap`).

## Steg 10: YouTube

Kanalen Fysiklabbet är inloggad i BOSGAME-Chrome (deviceId `158b4037…`;
kontrollera med `http://localhost:8000/om.html`). Filmen är större än
10 MB, så den förs in via en lokal filserver:

```bash
python -I .claude/video/verktyg/cors_server.py .claude/video 8765
```

Kör den i bakgrunden. Svarar porten 404 kör en annan session redan en
server där: ta 8766.

I YouTube Studio (Skapa → "Ladda upp videor"):

1. `fetch('http://127.0.0.1:8765/filmer/<film>/<film>.mp4')` → `new File(…)`
   → `DataTransfer` → `input[type=file].files` + `change`-event. Första
   gången visar Chrome en ruta om lokala nätverket som användaren måste
   klicka bort.
2. Titel och beskrivning med `execCommand('insertText')` i
   `ytcp-uploads-dialog #textbox`.
3. Målgrupp: "Nej, den är inte gjord för barn"
   (`tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]`).
4. **Spellista:** kursens lista (de hittills gjorda ligger i "Fysik nivå 1").
   Väljaren sorterar ikryssade rader överst, så kontrollera antalet i
   spellisteöversikten efteråt.
5. "Visa mer" → Videospråk → **Svenska** (måste väljas varje gång; scrolla
   raden i vy). Kategorin Utbildning är förvald.
6. Nästa ×3, välj Offentlig (eller Privat om den ska publiceras senare) och
   Klar. Varningen "Vi kontrollerar fortfarande" besvaras med "Publicera
   ändå".
7. Läs video-id ur Studios länk (inte ur skärmbilden; I och l går inte att
   skilja åt) och skriv in det i minnet om YouTube-kanalen.

Stoppa filservern när uppladdningen är klar.

## Steg 11: Facebook och Instagram (Meta Business Suite)

En reel per dag, kl. 16.00, på båda kanalerna. Kolla under Schemalagt vilka
dagar som redan är upptagna och ta nästa lediga.

Business Suite: `https://business.facebook.com/latest/posts/published_posts?asset_id=1265616036634709&business_id=2102548700697088`
→ Skapa reel.

1. **Uppladdningen.** `fetch` från localhost stoppas av sidans CSP. Patcha i
   stället `HTMLInputElement.prototype.click` så att filinputen hängs in i
   DOM:en, klicka "Lägg till video", hitta inputen med `find` ("Choose
   File") och kör `file_upload` med sökvägen till `<film>-liten.mp4`.
   Vänta cirka 20 s tills videon bearbetats.
2. Slå på "Anpassa inlägget för Facebook och Instagram" och skriv de två
   texterna. **Skriv med riktiga tangenttryck** (computer type):
   `execCommand`-text försvinner när formuläret ritas om.
3. Nästa → Nästa. Bocka ur Textning (filmen har redan inbrända
   undertexter).
4. Schemalägg: datum i väljaren, timme "16", minut "00", och klicka
   Schemalägg. Viewporten är 1920 px bred men skärmbilderna 1568 px
   (faktor 0,8167), så räkna om koordinater eller använd `find`-refs.
5. Kontrollera att både Facebook- och Instagram-reelen står under
   Schemalagt med rätt datum och tid.

## Steg 12: Länken i första kommentaren på Facebook

Facebook-texten lovar en länk i första kommentaren. Lägg en engångsuppgift
med `create_scheduled_task` (`fireAt` = publiceringen + 15 minuter) som
öppnar reelen som sidan Fysiklabbet och skriver
"Testa själv i simuleringen X: https://fysiklabbet.se/…". Kopiera prompten
från `C:\Users\sam_s\.claude\scheduled-tasks\fb-kommentar-flugan-ny\SKILL.md`
och byt textens början, datumet och länken. Uppgiften kollar själv att
kommentaren inte redan finns. Säg till användaren att den bara körs när
Claude-appen är öppen på BOSGAME.

Instagram har ingen kommentar; där står länken i bion.

## Steg 13: Efteråt

- Uppdatera minnet om YouTube-kanalen (id, spellista, publiceringsdagar) och
  `karaktarer/README.md` om något om figurerna ändrats.
- Committa filmmappens textfiler (manus, scenplan, scenprompter, texter
  och allt under `bygg/`) med pathspec och pusha till main. Mediefilerna
  (klipp, röst, bildrutor och mp4, flera hundra MB per film) committas
  inte; de ligger bara lokalt på BOSGAME och följer med i den dagliga
  säkerhetskopian.
