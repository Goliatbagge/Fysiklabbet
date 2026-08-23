# CLAUDE.md - Fysiklabbet

Interaktiva fysiksimuleringar för gymnasieelever (Fysik 1 & 2).

## Git: "pusha" betyder pusha till main

**När användaren skriver "pusha" (eller ber om en push utan att ange gren)
ska ändringarna alltid hamna på `main`** — det är `main` som deployas till
sajten, och användaren tittar direkt på den (ofta i mobilen). Arbetar
sessionen på en arbetsgren: committa där, merga (fast-forward om möjligt)
in i `main` och pusha `main`. Att bara pusha arbetsgrenen räcker inte —
då syns ingenting på sajten. (Stående önskemål 2026-08-03.)

## Tech Stack

- **Frontend**: Standalone HTML med React 18 (CDN), TailwindCSS (CDN)
- **Språk**: Svenska, kommatecken som decimalavskiljare (5,00 inte 5.00)
- **3D**: Three.js för vissa simuleringar
- **Styling**: `styles.css` (gemensam navigation/layout/tema), `styles-laborans.css` (papper-tema)
- **Teckensnitt**: Poppins (canvas + UI)

## Kommandon

```bash
# Verifiera navigation i alla filer (KÖR FÖRE COMMIT!)
node .claude/verify-navigation.js

# Verifiera att inga vita konturer/halor finns runt etiketter/pilar på
# ljusa scenbakgrunder (KÖR FÖRE COMMIT!)
node .claude/verify-no-white-outline.js

# Verifiera att teori-figurer (::: figur) har tät viewBox utan tom "luft"
# i kanterna — och att INGEN etikett klipps av viewBox-kanten, i höjdled
# eller i sidled (KÖR FÖRE COMMIT!). Sidledsmåttet använder den uppmätta
# teckentabellen i .claude/teckenbredd.js. Se "Etiketter får aldrig klippas
# av viewBox-kanten" nedan.
node .claude/verify-figur-bounds.js

# Verifiera vinkelbågar och likhetsstreck i teori-figurernas SVG (KÖR FÖRE
# COMMIT vid figurändringar!) — bågens medelpunkt i hörnet (rätt sweep-
# flagga), ändpunkter på vinkelbenen, likhetsstreck vinkelräta mot sidan.
# Se "Geometrifigurer" nedan för reglerna.
node .claude/verify-vinkelbagar.js

# Verifiera att KURVOR i teori-figurerna är mjuka och inte ritade som en grov
# polylinje med synliga facetter (KÖR FÖRE COMMIT vid figurändringar!) — en
# kurva ska samplas tätt ur sin funktion eller ritas med C/Q-kommandon.
# Se "Kurvor ska ritas ur sin funktion" nedan.
node .claude/verify-kurvor.js

# Verifiera BALANSEN i kopplingsscheman (KÖR FÖRE COMMIT vid ändringar i
# kopplingsscheman!) — komponenterna ska ha lika stora mellanrum på sin
# ledarsträcka, batteriet sitta centrerat och parallellgrenarna ligga på
# lika avstånd (även ner till bottenledningen). Granskar både
# data/teori/*.md och schemana som makeCircuit/makeBridge genererar.
# Se "Kopplingsscheman: jämn fördelning och centrering" nedan.
node .claude/verify-kopplingsschema.js

# Verifiera exit tickets efter ändringar i data/exittickets.js (KÖR FÖRE
# COMMIT!) — syntax, täckning mot katalogen, choices/why-längder, emoji,
# tappade KaTeX-backslash. Dataformatet dokumenteras i filens huvud;
# why[correct] = varför rätt, övriga = varför fel; förklaringar får inte
# börja med "Rätt!"/"Fel!" (UI:t sätter etiketterna). Rätt svar får ALDRIG
# systematiskt ligga först (correct: 0) — blanda alternativen så att
# rätt-index blir jämnt fördelat; verifieraren ger fel vid > 45 % på ett
# index inom en kurs (felet har hänt: hela ma2c/ma3c/ma4 hade alltid
# alternativ A rätt, påpekat av en besökare 2026-08-18).
node .claude/verify-exittickets.js

# Verifiera pennlösningarna (::: handskrift-scenerna i handskrift.js) —
# KÖR FÖRE COMMIT vid nya eller ändrade scener! Bygger varje scens
# aktlista i Node (utan webbläsare, via HANDSKRIFT.scen) och mäter att
# allt bläck ligger innanför arket, att inget hamnar i inställningsrutans
# mobilzon (arkets övre högra hörn) eller i stega-pilarnas kantband
# (pilzonen: x > PAPER_W−34 — pilarna följer skrollen i höjdled, så hela
# högerremsan är förbjuden; "27 700" blev "27 70" bakom framåtknappen),
# att tankebubblorna inte skymmer något
# som redan skrivits — och att inget tecken saknar glyf i GLYPHS (en
# saknad bokstav ritas inte alls men tar plats: "FÖRSTÄRKS" blev
# "FÖRST RKS"). Utan argument granskas alla scener som teorin länkar.
# Reglerna står i handskrift.js filhuvud. Ersätter INTE skärmdumps-
# granskningen — etiketter som ligger på linjer syns bara där.
node .claude/verify-handskrift.js

# Täckningsrapport för de nationella provens pennlösningar — hur många
# uppgifter per prov som har en registrerad ::: handskrift-scen
# (data/np/<provid>-penna.js, scennamn <provid>-u<nr>). Sekretessbelagda
# uppgifter räknas inte. Se data/np/RIKTLINJER.md.
node .claude/np-penna-tacktning.js

# Fysiktester för simuleringen Flugan i bägaren (KÖR vid ändringar i
# fysikmotorn i fysik1-flugan-i-bagaren-app.html!) — driver motorn direkt
# i headless Chrome och kontrollerar gränsfallen: hovring/stigning/mynning/
# vakuum, acceleration, fritt fall, impulsbalansen över ett helt förlopp
# samt att masscentrumsatsen N − M·g = Δp/Δt uppfylls i varje tidssteg.
# Kräver dev-servern på port 8000 + puppeteer-core i %TEMP%\pptr-test.
node .claude/test-fluga-fysik.js

# Verifiera att avsnittets ANDRA simulering går att nå (KÖR FÖRE COMMIT
# när du lägger till en href2!) — katalogen länkar bara till `href`, så
# avsnittsraden (section-nav.js) är enda vägen till href2-simuleringen.
# Kontrollerar att båda filerna laddar data/katalog.js + section-nav.js och
# har eget namn och egna nyckelord i data/simuleringar.js.
node .claude/verify-sim-vaxlare.js

# Verifiera sökindexet efter nya simuleringar eller ändringar i
# data/simuleringar.js (KÖR FÖRE COMMIT!) — varje länkad simulering (även
# href2 och djuplänkar) ska finnas som egen rad i sökrutan, med eget namn
# och egna nyckelord. Se "Sökruta och nyckelord" nedan.
node .claude/verify-sok.js

# Verifiera begreppsordlistan efter ändringar i data/begrepp.js (KÖR FÖRE
# COMMIT!) — schema, unika id:n, att uppslagsordet finns bland `former`, att
# ingen böjningsform tillhör två begrepp, typografi och täckning mot
# nyhetsartiklarna. Se "Begreppsordlista" nedan.
node .claude/verify-begrepp.js

# Verifiera att fullskärmsknappen ligger ENSAM på sin yta (KÖR FÖRE
# COMMIT vid nya/ändrade scenknappar eller overlays!) — laddar varje
# simulering på bred skärm (1280×800), i normalläge OCH fullskärm, och
# mäter att inget annat interaktivt element (knapp, label, länk, reglage)
# överlappar .fs-btn:s ruta. Felet har hänt: en äldre sim lade sin egen
# Play-knapp på 24,24 — rakt bakom .fs-btn (40 px vid 14,14). Se "Inga
# överlappande objekt" nedan. Kräver dev-servern på port 8000 +
# puppeteer-core i %TEMP%\pptr-test.
node .claude/verify-fs-btn.js

# Verifiera mobil-dispositionen i simuleringarna (KÖR FÖRE COMMIT vid
# ändringar i scener, verktygsrutor eller sektion 8 i
# styles-laborans-sim.css) — startar 390×744, går in i fullskärm i varje
# sim och mäter att ingen verktygsruta ligger ovanpå ritytan, klipps bort,
# kollapsar scenramen eller krockar med avläsningsrutan. Se "Mobil (≤600px)"
# nedan. Kräver dev-servern på port 8000 + puppeteer-core i %TEMP%\pptr-test.
node .claude/verify-mobil-scen.js

# Bygg teori-bundle efter ändringar i data/teori/*.md (KÖR FÖRE COMMIT!)
node data/teori/build.js

# Bygg per-artikel-OG-sidor + RSS + sitemap + begreppsindex efter ändringar i
# data/nyheter.js ELLER data/begrepp.js (KÖR FÖRE COMMIT!) Genererar
# (1) nyheter/dela/<id>.html med rätt og:*-taggar för delningsförhandsvisning
# (Facebook/X/LinkedIn), (2) feed.xml — RSS-flödet med de 20 senaste
# publicerade artiklarna (datumgrindat). OBS: feed.xml är sedan 2026-08-22
# INSKICKAD SOM WEBBPLATSKARTA i Search Console (typ RSS), vid sidan av
# sitemap.xml. Det är den snabba kanalen för dagens nyhet: Google hämtar
# ett litet, färskt flöde betydligt oftare än en sitemap med 700+ adresser.
# Går flödet sönder eller slutar byggas märks det alltså inte bara i
# RSS-läsare — dagens artikel blir också långsammare att hitta på Google.
# (3) sitemap.xml — alla publika sidor,
# artiklarnas ?id=-URL:er, begreppens ?ord=-URL:er samt teoriavsnittens,
# de nationella provens och repetitionspaketens ?id=-URL:er (robots.txt pekar
# hit; se "Adresser till teoriavsnitt" nedan),
# (4) data/begrepp-sok.js — det lätta begreppsindexet (se "Begreppsordlista").
node data/build-nyheter-og.js

# Verifiera att feed.xml, sitemap.xml och delningssidorna är i takt med
# data/nyheter.js + data/begrepp.js (KÖR FÖRE COMMIT vid nyhets-/begreppsändringar!)
# Bygger om vad filerna BORDE innehålla och jämför med disk — fångar den tysta
# missen att byggskriptet ovan aldrig kördes (artikeln syns på sajten men
# saknas i RSS och sitemap, utan att något ser trasigt ut).
# Körs dessutom automatiskt av GitHub Actions — se
# .github/workflows/verifiera-sitemap.yml, som gör olika saker beroende på
# vem som är närvarande: vid PUSH till main bara kontroll (rött kryss om du
# glömt byggskriptet), medan den DAGLIGA körningen (06:00 UTC) och manuell
# start från fliken Actions bygger om, committar och pushar själva. Den
# dagliga körningen finns för datumgrindade artiklar som blir synliga vid
# midnatt utan att någon pushar — där finns ingen människa att säga till.
# Ägarverifieringsfiler (google<token>.html) hålls medvetet
# utanför sitemapen men MÅSTE ligga kvar i roten.
node .claude/verify-sitemap.js

# Uppläsning (talsyntes).
# ⛔ PAUSAT (2026-08-03, tills vidare på uttrycklig begäran): generera INGET
# nytt ljud och committa inga ljudkedje-artefakter (audio/,
# data/tts/manus/teori.json) — ljudproduktionen löses på annat sätt framöver.
# Kodfixar i själva kedjan (t.ex. export-manus.html) är fortsatt OK.
# Kommandona nedan står kvar för när pausen hävs:
# (kräver dev-servern på port 8000 och Python 3.12 med edge-tts;
# inkrementellt — bara dokument vars manus ändrats genereras om.
# Nyhetsartiklar har INGEN uppläsning — borttaget 2026-07-18.)
node data/tts/build-manus.js
python data/tts/generate-audio.py

# Öppna simulering i webbläsare
start [filnamn].html

# Lokal utvecklingsserver (cache avstängd — använd ALLTID denna, inte
# `python -m http.server` som låter webbläsaren cacha gamla filer).
# NORMALT BEHÖVS DEN INTE STARTAS FÖR HAND — se avsnittet nedan; en
# schemalagd uppgift håller http://localhost:8000 igång dygnet runt.
python .claude/dev-server.py 8000            # bara denna dator
python .claude/dev-server.py 8000 0.0.0.0    # även hemmanätverket

# Status / stopp / omstart för den alltid-igång-servern
powershell -ExecutionPolicy Bypass -File .claude/server/dev-server-vakt.ps1 -Status
powershell -ExecutionPolicy Bypass -File .claude/server/dev-server-vakt.ps1 -Stoppa
powershell -ExecutionPolicy Bypass -File .claude/server/dev-server-vakt.ps1 -Starta_om
```

## Utvecklingsservern körs alltid i bakgrunden

`http://localhost:8000` ska **alltid** svara, så att ändringar kan provas i
webbläsaren utan att pushas — och så att `verify-mobil-scen.js`,
`build-manus.js` och skärmdumpsgranskningen alltid har en server att prata
med. Det sköts av en schemalagd Windows-uppgift, inte av ett terminalfönster
som råkar stå öppet:

| Fil | Roll |
|---|---|
| `.claude/dev-server.py` | Själva servern (no-store, lyssnar bara på 127.0.0.1). |
| `.claude/server/dev-server-vakt.ps1` | Vakten: startar servern **om den inte redan svarar**. Även `-Status`, `-Stoppa`, `-Starta_om`. |
| `.claude/server/installera-server-task.ps1` | Registrerar uppgiften. Kör en gång per maskin (`-Avinstallera` tar bort den). |
| `.claude/server/oppna-brandvagg.ps1` | Öppnar port 8000 för hemmanätverket. Kräver administratör, körs en gång. |
| `.claude/server/logg/vakt.log` | Starter och fel. Serverns egen utskrift: `server-ut.log` / `server-fel.log`. |

Uppgiften **Fysiklabbet dev-server** har två triggrar: vid inloggning (+30 s)
och sedan var femte minut för alltid. Varje körning är en snabb hälsokoll —
svarar servern görs ingenting, så det finns aldrig två servrar. Dör servern
(krasch, `Stop-Process`, avbruten session) är den tillbaka inom fem minuter.

- Servern startas som en **fristående `pythonw`-process** — den lever vidare
  när uppgiften avslutas, och syns inte som något konsolfönster.
- Vakten tar **aldrig över port 8000 från ett annat program**. Är porten
  upptagen av något som inte är `dev-server.py` loggas det och vakten
  avstår, i stället för att döda främmande processer.
- **Starta inte servern för hand** i en långkörande terminal — kolla i
  stället `-Status`. En manuellt startad server på 8000 gör att vakten inte
  gör något (den ser bara att porten svarar), men den försvinner när
  sessionen tar slut.

### Nå sidan från telefon och surfplatta

Uppgiften registreras som standard med `-Natverk`, så servern binder
`0.0.0.0` och nås från alla enheter i hemmanätverket:

- `http://<datorns IPv4>:8000` (visas av `-Status`; adressen är DHCP och
  kan ändras vid omstart av routern)
- `http://<datornamn>:8000` — stabilare, fungerar där NetBIOS/mDNS slår
  igenom (iOS och Android brukar klara det; annars använd IP:t)

Två saker gäller när servern är öppen mot nätverket:

1. **Brandväggen måste släppa in porten.** Kör `oppna-brandvagg.ps1` en
   gång som administratör. Den lägger till en tillåt-regel begränsad till
   `-Profile Private -RemoteAddress LocalSubnet` (bara hemmanätverket) och
   tar bort de **blockera-regler för python** som Windows skapar när en
   brandväggsruta någon gång avfärdats med "Avbryt". En blockera-regel
   vinner alltid över en tillåt-regel — utan det steget svarar servern
   lokalt men aldrig utåt, och ingenting ser trasigt ut.
2. **Mappar som aldrig ska lämna datorn spärras.** `LOKALA_MAPPAR` i
   `dev-server.py` ger 404 på `Genomgångar/`, `Uppgifter/`,
   `Kursprovsuppgifter/`, `NP/`, `docs-vault/` och `.git/` så snart
   bindningen är något annat än `127.0.0.1` — annars hade hela
   projektmappen, inklusive upphovsrättsskyddade PDF:er, legat öppen på
   nätverket. Lägg till nya lokala mappar i den listan, inte bara i
   `.gitignore`.

Vill du stänga nätverkstillgången: kör om installationsskriptet med
`-Lokal` (vakten startar då om servern mot `127.0.0.1`) och
`oppna-brandvagg.ps1 -Stang` som administratör.

## ⚠️ KRITISK: Bygg teori-bundle efter md-ändringar

`data/teori/*.md` läses INTE direkt — katalogen läser `data/teori/bundle.js`,
genererad av `data/teori/build.js`. **Efter varje ändring i en md-fil måste
du köra `node data/teori/build.js`** — annars ser sidan fortfarande gamla
texten. Vanlig fälla: man fixar en typografisk detalj, laddar om sidan,
ser fortfarande felet, och tror att fixet inte fungerade. Ingen
auto-reload; lägg det som rutin efter md-redigeringar.

## Tabeller i teorin: skriv dem som markdown, aldrig som rå HTML

En värdetabell eller ett teckenschema kan ha 6–8 kolumner, och KaTeX-celler
(`$x$`, `$f'(x)$`) bryter aldrig rad — på en telefon blir tabellen då bredare
än textspalten. Eftersom `.lab-article-body`/`.lab-block` har
`overflow-x: hidden` **klipptes de yttre kolumnerna bort helt** (partikel-
tabellen i `fy1-9.3` visade två av sju kolumner på en 390 px-skärm, och
resten gick inte att nå).

Därför lindar marked-renderarna i `katalog.html`, `avsnitt.html` och
`np.html` varje markdown-tabell i `<div class="lab-tabell">`, som scrollar i
sidled i sig själv i stället för att klippas (samma lösning som
`.katex-display` använder för breda displayformler). CSS:en ligger i
`styles-laborans.css` intill de övriga tabellreglerna: tätare celler under
560 px, och i en blockruta får scroll-rutan gå ända ut i rutans kant.

- **Skriv tabeller som markdown** (`| a | b |`), inte som rå `<table>` i
  md-filen — rå HTML går förbi renderaren och får ingen scroll-ruta.
- Lägger du in markdown-rendering på en NY sida: kopiera `marked.use({
  renderer: { table … } })` från `katalog.html`, annars klipps tabellerna
  där.
- Kontrollera breda tabeller i en skärmdump på 390 px: sista kolumnen ska
  gå att nå genom att dra i tabellen, och sidan får aldrig vågrät scroll.

## Härledningar i teorin: dropdown i formelrutan

**En härledning/ett bevis av en formel skrivs som ett `::: härledning`-block
NÄSTLAT INUTI formelns `::: formel`-block** — renderarna gör det då till en
hopfällbar dropdown (`<details>`) längst ned i formelrutan (mönstret infört
sajtbrett 2026-08-03, referens: `fy2-1.5.md`). Skapa ALDRIG en ny fristående
härledningsruta direkt före/efter en formelruta.

- Ordningen i md-filen: formelinnehåll (+ ev. `där`-lista och `::: figur`),
  blankrad, `::: härledning "Härledning — …"`, innehåll, `:::` (härledning),
  `:::` (formel) — två `:::` på raken.
- **Flera härledningar per formel är OK** (t.ex. serie- + parallellbevis) —
  de blir varsin dropdown-rad i källordning.
- Rubriken blir dropdownens etikett. Låt den inte ordagrant dubblera
  formelrubriken — skriv `"Härledning — <namn>"`/`"Bevis — <namn>"`.
- **Fristående `::: härledning` är fortsatt rätt** för rutor som inte härleder
  en formelruta: OBS/varningar, Kuriosa, Introduktion/Kom ihåg,
  GeoGebra-tips, resonemang utan formelruta (t.ex. `ma3c-3.4`, `ma3c-5.3`)
  — sådana ska INTE stoppas in i närmaste formelruta.
- Layoutkoden i `katalog.html` (`buildFormelLayouts`) flyttar alla
  `details.formel-harledning` sist i rutan — rör inte den ordningen.

## ⚠️ KRITISK: En exempellösning i teorin ska ALLTID ha en pennlösning

**Varje `::: exempel` i `data/teori/*.md` som får en `::: textlosning` ska
också få en `::: handskrift`-scen — en animerad pennlösning.** Det räcker
alltså aldrig att skriva lösningen i text: eleven ska kunna se HUR den
skrivs, steg för steg, med penna på rutat papper (uttryckligt önskemål
2026-08-09). Gäller nya exempel såväl som gamla exempel som skrivs om, i
alla kurser.

Ordningen i md-filen är alltid:

```
::: exempel "Exempel — …"
**frågestammen … a) …&emsp;&emsp;b) …**

::: figur          ← om uppgiften har en figur (frivilligt)
…
:::

::: handskrift
typ: <scennamn>
:::

::: textlosning
…
:::
:::
```

Så här bygger du scenen:

1. **Skriv layoutfunktionen i `handskrift.js`** (`layoutMittScennamn(cfg, F)`)
   och registrera namnet i `SCENES`-objektet längst ned i filen. Lägg
   funktionen bland scenerna för samma kurs/kapitel, i avsnittsordning.
2. **Följ reglerna i `handskrift.js` filhuvud** — de är många och
   uttryckliga (figur i grafit med värden och vektorer i blått, rubrik +
   formel, mätvärdesklammer DIREKT under formeln, insättning, aldrig
   avrundning i mellanled, rimlighetsbedömning i en bubbla före svarsraden,
   division med vågrätt streck, en tanke per led, blå båge från faktorn
   till varje term när en parentes utvecklas — produkttermen skrivs direkt
   efter sin båge). **Läs filhuvudet innan
   du skriver en ny scen** — kopiera rytmen från en närliggande scen
   (`layoutParallax`, `layoutVinkeldiameter`, `layoutSchwarzschild`).
3. **Saknas ett tecken i `GLYPHS`** ritas det inte alls men tar plats
   ("FÖRSTÄRKS" blev "FÖRST RKS"). Lägg då till glyfen som enstreckad
   handstil bland de andra (θ lades till 2026-08-09) — och granska den
   sida vid sida med den bokstav den kan förväxlas med.
4. **Håll siffrorna identiska** i pennlösningen och `::: textlosning` —
   användaren växlar mellan dem med "Med penna"/"Som text", och olika
   avrundning i de två lägena läses som ett fel. Det är pennlösningens
   regler (inga avrundade mellanled, värdesiffror i sista steget) som
   gäller för BÅDA.
5. **Kör `node .claude/verify-handskrift.js <scennamn>`** — den mäter att
   allt bläck ligger på arket, att inget hamnar i inställningsrutans
   mobilzon, att tankebubblorna inte skymmer något och att inget tecken
   saknar glyf.
6. **Granska i skärmdump** (verifieraren fångar inte etiketter som ligger
   på linjer): mounta scenen i en liten testsida under `.shots/` med
   `HANDSKRIFT.mount(el, {typ:'…'}, {instant:true, stegvis:false})` och
   kontrollera figuren, bråkstrecken och att vinkelbågen landar på sina
   ben.
7. **MATTESCENER SOM LÖSER EKVATIONER ska stödja BÅDA
   redovisningslägena** — "Båda led" (operationen skrivs med blåpennan i
   båda led) och "Väggen" (lodrätt blått streck + operationen till höger
   om raden; elevens val i inställningsrutan, infört 2026-08-15). Läs
   EKVATIONSREDOVISNING i `handskrift.js` filhuvud: layoutfunktionen
   läser `cfg.vagg`, använder `T.vaggOp()` för väggstegen och sätter
   `ekvval: 1` i returobjektet. Kravet är SAMMA ANTAL klicksteg i båda
   lägena (positionen bevaras via stegindex vid växling). Väggen gäller
   term-/faktoroperationer (+, −, ·, /) — rotdragningar och
   upphöjningar skrivs likadant i båda lägena, och ryms inte väggen på
   raden (pilzonen!) får det steget behålla ledformen. Gäller ENDAST
   matematik — fysikscener redovisar alltid med båda led.
   `verify-handskrift.js` granskar båda lägena automatiskt, och
   ekvval-scener har en HÖGRE inställningsruta: inget bläck med x > 420
   får ligga ovanför y = 210 (i stället för 150).

## ⚠️ KRITISK: Uppdateringskedja när teoriinnehåll ändras

**En ändring i en teorigenomgång (`data/teori/*.md`) är ALDRIG klar med bara
md-filen.** Övningar, exit tickets och uppläsning bygger alla på genomgångens
innehåll — ändras teorin utan att de följer med testar/uppläser sajten stoff
som inte längre finns. Gå därför igenom hela kedjan i samma arbetspass, varje
gång innehåll skrivs om, läggs till, tas bort eller byter titel (gäller även
när en genomgång byggs om från en ny PDF i `Genomgångar/`):

1. **Teori-bundle**: `node data/teori/build.js` (se avsnittet ovan).
2. **Övningar** — `data/ovningar.js`, nyckel = teori-id (t.ex. `'fy2-1.2'`).
   Uppgifterna ska spegla det NYA innehållet (3 N1 + 2 N2 + 1 N3, se
   `OVNINGAR.md`); ta bort/ersätt uppgifter som testar borttaget stoff.
3. **Exit tickets** — `data/exittickets.js`, samma id. Frågorna ska förhöra
   det nya innehållet. Kör `node .claude/verify-exittickets.js`.
3b. **Pennlösningar** — varje nytt eller omskrivet `::: exempel` med
   `::: textlosning` ska ha en `::: handskrift`-scen (se avsnittet ovan).
   Kör `node .claude/verify-handskrift.js`.
4. **Uppläsning (TTS)** — ⛔ **PAUSAT tills vidare** (se Kommandon):
   generera inget nytt ljud och committa inga ljudkedje-artefakter;
   ljudet löses separat. (Normalt: `node data/tts/build-manus.js` +
   `python data/tts/generate-audio.py`, dev-server på port 8000 krävs.)
5. **Simuleringar + katalog** — grep på avsnittets ämnesord i
   `data/katalog.js`, `index.html` och `fysikN-*.html`: stämmer beteckningar,
   formler och beskrivningar fortfarande med den nya genomgången?
6. **Angränsande teoriavsnitt** — grep i `data/teori/` efter hänvisningar
   till avsnittet ("förra avsnittet", gamla titeln, begrepp som flyttats).
7. **Verifierare före commit**: `node .claude/verify-figur-bounds.js` och
   `node .claude/verify-no-white-outline.js` om figurer ändrats.

## ⚠️ KRITISK: Matematik nivå 1b delar innehåll med nivå 1c

**Matematik nivå 1b är en HÄRLEDD kurs — nästan alla genomgångar är
identiska med nivå 1c och lagras bara EN gång, i ma1c-filerna.** Kursen
byggs programmatiskt av `MA1B_SPEC` i slutet av `data/katalog.js`, som
också genererar aliaskartan `window.MA1B_ALIAS` (`ma1b-id → ma1c-id`,
t.ex. `ma1b-4.6 → ma1c-4.7` — numreringen SKILJER sig där avsnitt
tagits bort eller lagts till). Sidorna (`katalog.html`) speglar teori,
övningar, exit tickets och visualiseringar via kartan vid sidladdning.

- **Ändra ALDRIG ett delat avsnitt "för 1b"** — en ändring i ma1c-filen
  (md, övningar, exit tickets, visualisering, pennlösning) slår
  automatiskt igenom i 1b. Det är hela poängen: inget dubbelarbete.
- **Skapa ALDRIG poster med ma1b-id** i `data/ovningar.js`/
  `data/exittickets.js`/`data/teori/` för ett avsnitt som finns i
  aliaskartan — `verify-exittickets.js` ger DUBBLETT-fel.
- **Egna 1b-filer finns bara för:** `ma1b-3.4` (KPI och index),
  `ma1b-5.1` (Tolka och granska tabeller och diagram) samt
  sammanfattningarna `ma1b-3.S`, `ma1b-4.S`, `ma1b-5.S` (kapitlen
  skiljer sig där). Dessa underhålls som vanligt under sina ma1b-id.
- **Sammanfattningarna är det enda manuella synkstället:** ändras
  gemensamt kapitelinnehåll i `ma1c-3.S`/`4.S`/`5.S` ska samma ändring
  göras i ma1b-versionen (en kommentar i filerna påminner).
- **Skillnaderna mot 1c** (styrs helt av `MA1B_SPEC`): kapitel 6
  (Trigonometri + vektorer) och 1c-avsnittet 4.6 (Parallella och
  vertikala linjer samt allmän form) ingår inte; 3.4 KPI och index samt
  5.1 Tolka och granska tabeller och diagram är egna 1b-avsnitt;
  efterföljande avsnitt är omnumrerade.
- **Nytt/borttaget avsnitt i 1b?** Redigera ENDAST `MA1B_SPEC` (ordning,
  `fran:`-nummer, egna avsnitt) — numrering och aliaskartan räknas om
  automatiskt. Lägger 1c till ett nytt avsnitt i kapitel 3–5 måste det
  manuellt läggas in i spec-listan (kapitel 1–2 använder `'alla'` och
  följer med av sig självt).

## ⚠️ KRITISK: Navigation i ALLA HTML-filer

**Varje HTML-simulering MÅSTE innehålla:**

1. I `<head>`: `<link rel="stylesheet" href="styles.css">`

2. Direkt efter `<body>`:
```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="logo">
            <span class="logo-icon">⚛️</span>
            <span class="logo-text">Fysiklabbet</span>
        </a>
        <ul class="nav-menu">
            <li><a href="index.html" class="nav-link">Hem</a></li>
            <li><a href="fysik1.html" class="nav-link active">Fysik 1</a></li>
            <li><a href="fysik2.html" class="nav-link">Fysik 2</a></li>
            <li><a href="om.html" class="nav-link">Om</a></li>
        </ul>
    </div>
</nav>
```

3. **Uppdatera** `.claude/verify-navigation.js` — lägg till filnamnet i `HTML_FILES_TO_CHECK`

4. Direkt före `</body>`:
```html
<script src="feedback.js" defer></script>
<script src="sim-dock.js" defer></script>
```
   (feedback-widget + hopfällbar verktygsdock på mobil — se
   "Mobil (≤600px)" nedan. Båda ska finnas i ALLA simuleringar.)

## ⚠️ KRITISK: Synka beteckningar och kurs med teorigenomgången

**Innan du skapar (eller ändrar) en simulering MÅSTE du läsa motsvarande
teorigenomgång i `data/teori/*.md` och använda EXAKT samma beteckningar,
enheter och formelskrivning.** Simuleringen, katalogen och övningarna ska
spegla genomgången — inte en egen variant. Detta är ett ÅTERKOMMANDE fel:
en sim byggdes med egna beteckningar som inte stämde med elevernas
genomgång, vilket förvirrar.

**Originalgenomgångarna finns som PDF i `Genomgångar/Fysik 1/` och
`Genomgångar/Fysik 2/`.** När du bygger figurer (eller simuleringar) ska du
öppna motsvarande PDF (läs med Read, `pages`-param) och **efterlikna dess
figurer** — perspektiv, vilka objekt som ritas, etiketter. Kapitelnumren i
PDF-filnamnen skiljer sig från md-filerna → mappa via `title:`, inte numret
(ex: md `fy1-3.2` "Newtons andra lag" = PDF `Fy 1 4.02 Newtons andra
lag.pdf`). Projektet att ersätta `::: bild`-platshållare med riktiga
inline-SVG-figurer styrs av `.claude/figurer-plan.md`.

Gör så här, varje gång:

1. **Hitta avsnittet.** Sök i `data/teori/` efter ämnet (t.ex.
   `grep -rin "kraftmoment" data/teori/`). Filnamnet avslöjar kursen:
   `fy1-*.md` → Fysik 1, `fy2-*.md` → Fysik 2. **Lägg simuleringen i samma
   kurs som genomgången** (filnamn `fysikN-…`, breadcrumb, katalog-`#fyN`,
   och länka den i rätt katalog-avsnitt i `data/katalog.js`). Ett ämne du
   tror är Fysik 1 kan ligga i Fysik 2 i denna kursplan — kontrollera
   alltid, gissa aldrig.
2. **Kopiera beteckningarna exakt.** Variabelbokstäver, index och enheter
   ska vara identiska med genomgången. Exempel som redan bitit:
   - Hävarm betecknas **`l`** (kursiv), aldrig `r`. Kraftmoment: `M = F · l`.
   - Enheten skrivs som i genomgången (t.ex. **`Nm`**, inte `N·m`, för
     kraftmoment).
   - Krafter följer master-konventionen (`F_G` med stort G osv.).
3. **Spegla formeln.** Samma uppställning (`M = F · l`), samma ord-etiketter
   och samma enhetsskrivning i formelkort, scen-etiketter, avläsningar,
   katalogtext och uppdateringsrutan.
4. **Vid minsta avvikelse mellan din sim och genomgången → rätta sim:en**,
   inte genomgången (om inte användaren uttryckligen ber om motsatsen).

## Interaktiva grafer i teorin (`::: graf`)

**REGEL: När en teorigenomgång handlar om hur en eller flera parametrar
formar en graf ska du bädda in en interaktiv grafritare (`::: graf`) direkt
i genomgången — inte bara en statisk figur.** Eleven/läraren ska kunna dra i
glidare (eller skriva i sifferfält) och se grafen ändras live. Det gäller
`::: graf` för alla kurser (matematik och fysik) och ska ske **automatiskt**
när nya graf-tunga avsnitt läggs in.

**Bädda in när avsnittet bygger på "parameter → grafens utseende", t.ex.:**
- räta linjer (`y = kx + m` — lutning och m-värde),
- proportionalitet (`y = kx`),
- andragradsfunktioner/parabler (`y = ax² + bx + c`),
- exponential- och potensfunktioner (`y = C·a^x`, `y = C·x^n`),
- trigonometriska funktioner (amplitud, period, fasförskjutning),
- fysik-samband som ritas som graf (v–t, s–t, sönderfall, svängningar).

**Hoppa över när** avsnittet inte handlar om en parametriserad graf (ren
räkning, definitioner, geometri utan funktionsgraf).

### Syntax

Blocket skrivs i `.md`-filen och byggs av `graf.js`
(`window.FYSIKGRAF.mountAll`), som kopplas in efter render i både
`katalog.html`, `avsnitt.html` och presentationsläget:

```
::: graf
titel: y = kx + m
uttryck: k*x + m
ekvation: y = {k}x + {m}
lutningstriangel: ja
k: -2, -5, 5, 0.5
m: 3, -10, 10, 1
x: -6, 6
y: -6, 6
:::
```

- `titel:` — KaTeX-etikett ovanför grafen (valfritt; `$` behövs ej, hela
  raden tolkas som matte så variabler blir kursiva).
- `uttryck:` — **obligatoriskt.** Maskin-uttrycket i `x` och parametrarna,
  med `.` som decimaltecken. Stöder `+ - * / ^`, parenteser, unärt minus och
  funktionerna `sin cos tan asin acos atan sqrt abs exp ln log sign` samt
  konstanterna `pi` och `e`. (`·` och `−` tolereras och normaliseras.)
- `ekvation:` — KaTeX-mall med `{param}`-platshållare. Visas under grafen
  **med aktuella värden insatta, live** (blå som kurvan). Städas automatiskt:
  `+ -3` → `- 3`, `1x` → `x`, `1 \cdot` → bort, `0x + 3` → `3`, `+ 0` tas
  bort. **Använd nästan alltid detta** — kopplingen "allmän form ovanför,
  konkret ekvation under" är kärnpedagogiken. (Utan `ekvation:` visas i
  stället värde-chips.) **Parameter i exponent:** skriv dubbla klamrar,
  `x^{{a}}` — substitutionen konsumerar de inre (`{a}` → `2`) och de yttre
  blir KaTeX-exponentens klamrar (`x^{2}`), vilket krävs för fleteckens-
  värden som `-1` och `0{,}5`.
- `lutningstriangel: ja` — streckat "trappsteg" från y-skärningen: 1 steg åt
  höger, Δy steg upp/ner (för räta linjer = `k`), med etiketter. Får
  automatiskt en kryssruta "Visa trappsteget" i widgetens footer. Använd på
  avsnitt om räta linjer/lutning.
- `<param>:` — en glidare per parameter: `värde, min, max[, steg]`. Utan
  fjärde värdet gissas ett rimligt steg. Parameternamnen måste matcha dem i
  `uttryck:`.
- `x:` / `y:` — STARTfönster `min, max` (valfritt, standard `-6, 6`; det
  ger stödlinjer för varje heltalssteg i startläget — behåll den storleks-
  ordningen om inte kurvan kräver annat).
  Rutnätet är ALLTID symmetriskt (1 enhet i x-led = 1 enhet i y-led,
  kvadratiska rutor), så skalan sätts så att BÅDA intervallen ryms — den
  rymligare riktningen får luft. Panorering (dra i rutnätet, touch/pinch)
  och zoom (mushjul över rutnätet, +/−-knappar) är inbyggt; användaren kan
  alltid flytta vyn själv, så fönstret behöver bara vara en rimlig start.

**Konventioner:** parameternamn med **en bokstav** (`k`, `m`, `a`, `b`, `c`,
`A`, `T`) speglar genomgångens beteckningar exakt (samma synk-regel som för
simuleringar). Låt en parameters default matcha ett exempel som redan står i
avsnittet, så eleven kan "spela upp" exemplet i verktyget. Widgeten ritar
själv koordinatsystem i papperstemat (ink-axlar med pilspetsar, blå kurva,
röd prick i `y`-skärningen) — du behöver inte rita någon SVG.

**Byggkedja:** `::: graf`-block skyddas i `data/teori/build.js` (rörs ej av
NBSP/term-transformer) och hoppas över av uppläsningen (config läses aldrig
upp). Efter att du lagt in ett block: kör `node data/teori/build.js` som
vanligt. Ingen TTS-omgenerering behövs för själva grafen (den ger ingen
uppläsningstext), men omgivande brödtext följer den vanliga
uppdateringskedjan.

## Minisimuleringar i teorin (`::: minisim`)

En **minisimulering** är en liten inbäddad interaktiv demo direkt i ett
teoriavsnitt — ett superlättillgängligt sätt att se/testa ett fysikaliskt
koncept utan att lämna genomgången (enklare än de fristående
simuleringssidorna). Passar särskilt för att göra `::: demo`-rutornas
klassrumsdemonstrationer körbara virtuellt. Motorn bor i `minisim.js`
(`window.FYSIKMINISIM.mountAll`), vanilla-JS med egen intern CSS,
och kopplas in efter render i `katalog.html` och `avsnitt.html`.

### Syntax

```
::: minisim
typ: tomtebloss
:::
```

- `typ:` — **obligatoriskt.** Vilken minisimulering som byggs. Tillgängliga
  typer: `tomtebloss` (demonstrationen i fy2-1.4 Cirkulär rörelse: tänd ett
  tomtebloss fäst i en skruvdragare, i mörker, och se gnistorna lämna
  cirkelbanan tangentiellt; varvtalsglidare, pausknapp som fryser bilden,
  "Ultrarapid"-kryssruta för slow motion, "Visa spår"-kryssruta som ritar
  gnistornas banor som en långsamt borttonande lång exponering (tangenterna
  syns i efterhand), fullskärmsläge samt syntetiserat
  ljud via Web Audio — motorton som följer varvtalet + sprakande gnistor,
  inga ljudfiler — med ljudknapp uppe till höger) och `centrifug`
  (demonstrationen i fy2-1.4: en blöt tvättsvamp i en roterande
  centrifugkorg sedd rakt uppifrån; vattendropparna lämnar banan
  tangentiellt enligt Newtons första lag. Samma kontrolluppsättning som
  tomteblosset: varvtalsglidare, paus som fryser bilden, "Ultrarapid",
  "Visa spår", fullskärm och syntetiserat ljud — motorton + vattenfräs. Ritad i
  laboranstemat: ljus pappersbakgrund med kollegieblocks-rutnät). Senare
  tillkomna typer dokumenteras i filhuvudet på `minisim.js` (bl.a.
  `fjaderpendel` i fy2-2.1, `linjal` i fy2-1.2 — linjalen på två
  pekfingrar som växelvis glider tills de möts under tyngdpunkten — och
  `valtning` i fy2-1.2: en kloss med tyngdpunktsvisare som lutas kring
  sitt nedre hörn på vågrätt underlag och välter när visaren släpps
  utanför vridningspunkten).
- `titel:` — liten rubrik ovanför scenen (valfritt; blocket ligger oftast
  inuti en `::: demo`-ruta som redan har titel).
- Blocket kan nästlas inuti andra `:::`-rutor (som `::: figur`).

### Bygga en ny minisim-typ

Lägg en builder-funktion i `minisim.js` och registrera den i `TYPES`.
Canvas-scen med DPR-skalning, svenska UI-texter (Poppins — INTE
`--lab-font-display`, som är serif), komma som decimaltecken,
IntersectionObserver som pausar rAF-loopen när widgeten inte syns.
Simuleringen ska vara omedelbart begriplig: 1–3 knappar, inga menyer.

**Tema: minisimuleringar ska generellt gå i laboranstemat** — ljus
pappersbakgrund (`#f7f2e8` → `#ece3d2`) med ett blått kollegieblocks-
rutnät, som om simuleringen låg ritad på ett anteckningsblock. Använd
kortklassen `ms-ljus` (ljusa knappar/reglage) + `drawBackground()`-mönstret
i `buildCentrifug` (referens). Mörk scen är UNDANTAG och kräver att fysiken
motiverar det (tomteblosset: gnistor i mörker). På den ljusa botten gäller
no-white-outline-regeln som vanligt — mörka/mättade färger, inga haloer,
och ingen additiv `lighter`-blending (den är till för mörka scener).

### Byggkedja (samma mönster som `::: graf`)

Blocket skyddas i `data/teori/build.js`, byggs om till en
`.lab-minisim`-placeholder av `preprocessBlocks()` i `katalog.html`/
`avsnitt.html`, undantas från bionic-läsning och tangentbordsklick, och
hoppas över helt av TTS-manuset (`data/tts/export-manus.html` — config-
raderna får aldrig läsas upp). Marginal-CSS i `styles-laborans.css`
(`.lab-minisim`), övrig CSS injiceras av widgeten själv. Efter att du lagt
in ett block: kör `node data/teori/build.js` som vanligt.

## Fritt filmmaterial (`::: video` + video-block i nyheter)

**REGEL: När en text (teoriavsnitt, nyhetsartikel, simulering) refererar
till filmmaterial som är fritt tillgängligt (public domain/CC) — som
Apollo 15:s hammare-och-fjäder eller Tacoma-brons kollaps — ska filmen
bäddas in intill referensen, så att läsaren kan titta direkt.** Går den
inte att bädda in läggs en extern länk. Bädda ALDRIG in upphovsrätts-
skyddat material (uttryckligt önskemål 2026-08-06).

- **Självhostad mp4 är FÖRSTAHANDSVALET** — tredjeparts-iframes
  (archive.org-embed) visade svart ruta i mobilen. Filmerna ligger i
  `media/video/` (mp4 + affisch-jpg) och hämtas av GitHub Actions-
  arbetsflödet **Hämta videomaterial**: skriv
  `<archive.org-id> <filnamn> <affisch-tidpunkt>` i
  `.github/videoorder.txt` och pusha (samma mönster som `bildorder.txt`
  för pressbilder; körningen committar filerna och tömmer filen). Håll
  filerna små — minsta fullängds-mp4-derivatet väljs automatiskt.
- **Teorin**: `::: video`-block med `titel:`, `fil:`, `affisch:`,
  `format: 4:3` (äldre filmmaterial; standard 16:9), `källa:` och
  `länk:`. Byggkedja som `::: graf`: skyddas i `data/teori/build.js`,
  renderas av `buildVideoEmbed()` i `katalog.html`/`avsnitt.html`
  (`.lab-video`, CSS i `styles-laborans.css`), hoppas över av TTS-
  manuset. `arkiv:`/`youtube:` finns som iframe-reserv. Kör
  `node data/teori/build.js` efteråt. Referens: `fy1-2.4`, `fy2-2.6`.
- **Nyheter**: body-block `{ type: 'video', src, poster, ratio, title,
  caption, credit, url }` — dokumenterat i huvudet på `data/nyheter.js`.
  Blocket läggs intill det ställe i artikeln som refererar filmen.
- **`länk:`/`url` ska peka DIREKT på filmens egen sida** (t.ex.
  `archive.org/details/<id>`), aldrig på en startsida — och undvik
  NSSDC-länkar (nssdc.gsfc.nasa.gov låg nere 2026-08-06 och visade en
  underhållssida i stället för filmen).

## Projektstruktur

```
fysiklabbet/
├── index.html              # Startsida
├── fysik1.html             # Fysik 1 översikt
├── fysik2.html             # Fysik 2 översikt
├── fysik1-*.html           # Fysik 1 simuleringar
├── fysik2-*.html           # Fysik 2 simuleringar
├── styles.css              # Gemensam CSS
├── OVNINGAR.md             # Guide för övningar per avsnitt
└── .claude/
    ├── verify-navigation.js    # Navigationsverifiering
    ├── commands/               # Slash-commands
    └── agents/                 # Specialiserade agenter
```

## Typografi (master)

### ⛔ FÖRBJUDET: emojis och dekorativa piktogram

**Emojis är strikt förbjudna överallt — i simuleringar, katalog, teori,
övningar, knappar, rubriker, kort och löptext. Inga undantag.** Färgglada
piktogram (📦, 🪨, 🚀, ⚛️, ⚠️, ✋, 🎈, ↕️, ✅, 🔍 osv.) får aldrig
användas som ikoner, rubrikprydnader eller blickfång. De ser
oprofessionella ut och "skriker AI" — exakt motsatsen till den sobra
laborationsestetiken sidan ska ha. Detta gäller även emoji-varianten av
symboler (med `U+FE0F` variation selector) och dingbat-emoji (☀️, ⭐, ✔️).

Ersätt i stället med:
- **Ingenting** — en ren textrubrik utan prydnad är förstahandsvalet.
- **Inline-SVG-ikoner** med `currentColor` (samma stil som `fs-btn`,
  logotypen, nav-pilarna) när en ikon verkligen behövs.

**Legitima undantag (INTE emoji):** matematiska och typografiska tecken som
→ ⟶ ⟂ · × ≈ ≤ ≥ ∝ ⟺ ⟹ ± ∑ √ ° ′ ″, pilar i formler/figurer, samt
grekiska bokstäver. Dessa är inte emoji utan riktig notation och ska
användas där de hör hemma. Tumregel: om tecknet bär matematisk/typografisk
betydelse i sammanhanget → behåll; om det bara är en färgglad dekoration →
ta bort.

### Versaler
ALDRIG title case på svenska — endast första ordet i mening/rubrik med stor bokstav.
- ✓ "Elektrostatisk induktion"  ✗ "Elektrostatisk Induktion"
- ✓ "Visa laddningar"  ✗ "Visa Laddningar"

### Variabler och enheter
- **Fysikaliska variabler**: alltid *kursiv* — *F*, *Q*, *r*, *v*, *a*
- **Enheter**: alltid rakt — N, C, m/s, kg/m³
- **Konstanter har också benämning** — t.ex. *G* (gravitationskonstanten),
  *k* (Coulombs konstant), σ (Stefan–Boltzmanns konstant). Skriv aldrig
  bara symbolen utan att i närheten ange namn och värde med enhet.
- **Komponent-etiketter är INTE variabler** — bokstäver som identifierar
  ett objekt (inte en storhet) skrivs rakt:
  - L₁, L₂ (Lampa 1, Lampa 2) — rakt
  - A (amperemeter), V (voltmeter) — rakt
  - R₁, R₂ (resistans 1, 2) — *kursivt* (resistans är en storhet)
  - U, I, Q, P — *kursivt* (alla fysikaliska storheter)

  Tumregel: kan man säga "*storheten X*" om bokstaven (spänningen *U*,
  strömmen *I*, resistansen *R*)? Då är det variabel → kursiv. Är det
  ett *namn* på ett objekt (Lampa, Amperemeter)? Då är det etikett → rakt.

- **Variabler i sammansättningar (pq-formeln, x-axeln, k-värde) — kursiv
  variabeldel, rakt efterled.** I ord som "*pq*-formeln", "*abc*-formeln",
  "*x*-axeln", "*y*-led", "*k*-värde", "*m*-värdet", "*x*-koordinaten",
  "*x*-termer" ska variabeldelen kursiveras och bindestreck + efterled stå
  rakt (uttryckligt önskemål 2026-07-21). Gäller ÖVERALLT: rubriker,
  brödtext, blocktitlar, katalogtitlar/beskrivningar, övningar och exit
  tickets. Skrivsätt per kontext:
  - **md-löptext, rubriker och `data/ovningar.js`/`data/exittickets.js`**:
    markdown-kursiv — `*pq*-formeln`, `*x*-axeln`. Använd INTE math-block
    (`$pq$-formeln`) — TTS-manuset läser det som "p q -formeln" medan
    `*pq*` strippas till "pq-formeln"; markdown-formen ger alltså bättre
    uppläsning och identiskt manus med råtext.
  - **Fetstil**: nästla — `***pq*-formeln**` (kursiv variabel i fet fras).
  - **`:::`-blocktitlar** (`::: formel "*pq*-formeln"`): samma
    asterisk-form; renderarna i `katalog.html`/`avsnitt.html` gör om
    `*…*` till `<em>` (och `export-manus.html` strippar till råtext).
  - **Titlar i `data/katalog.js` och md-frontmatter** (`title:`): samma
    asterisk-form (frontmatter-värdet citeras: `title: '*pq*-formeln'`).
    Renderas via `emTitle()`-helpern i `katalog.html`/`avsnitt.html`;
    `keywords:`-listorna hålls ASTERISK-FRIA (råtext för sökningen).
  - **Rå HTML/JS-UI** (t.ex. visualiserings-moduler med `innerHTML`):
    `<em>pq</em>-formeln`.
  - **Kodkommentarer och GeoGebra-kommandonamn** (`` `IntegralMellan(från
    x-värde, …)` ``): råtext — ingen kursivering i kod.
  - **Radbrytningsskydd (automatiskt)**: `restoreMath()` i
    `katalog.html`/`avsnitt.html` wrappar `$x$-termen` och
    `<em>pq</em>-formeln` i en `.var-compound`-nowrap-span (CSS i
    `styles-laborans.css`) så att raden aldrig bryts efter bindestrecket —
    **rör inte den regeln/klassen.** Suspenderat led ("*x*- och *y*-led")
    får däremot brytas.

- **Variabler i inline-SVG-figurer**: kursiveringen gäller även i
  `<text>`-element i SVG, inte bara i markdown och KaTeX. Bokstaven i
  ett SVG-tal som "*v*₁ = 3,0 m/s" eller "*λ*₂ = 8,0 m" måste vara
  kursiv — wrappa den i `<tspan font-style="italic">v</tspan>₁ = 3,0 m/s`.
  SVG ärver inte `font-style` från omgivande HTML/CSS, så utan
  uttryckligt `font-style="italic"` (på `<text>` eller `<tspan>`) renderas
  variabeln rakt. Vanligaste fällan: man skriver in Unicode-subscript
  direkt i strängen (`λ₁`, `v₁`) och glömmer att kursivera bokstaven.
  Granska alltid figuren genom en skärmdump och kontrollera att varje
  variabel ser ut som "*v*", inte "v".

  **ALDRIG `font-style="italic"` på ett helt `<text>`-element som
  innehåller `= värde enhet`** — då blir mätetalet och enheten också
  kursiverade ("*I* = *4,0 A*" istället för "*I* = 4,0 A"). Detta är
  den vanligaste figurbuggen. Två säkra mönster:

  1. **Använd helpern `sceneQty(label)`** (eller `sceneVar(label)` för
     ren variabel utan värde). Den finns i `data/ovningar.js` och
     kursiverar bara variabeldelen före `' = '`. Använd den i alla
     figur-helpers (`makeBField`, `makeRefraction`, `makeForceDiagram`
     m.fl. gör det redan).
  2. **Skriv `<tspan>` manuellt** i rå-SVG: lägg italic på `<tspan>`,
     **inte** på `<text>`:
     ```html
     <!-- RÄTT -->
     <text font-size="13"><tspan font-style="italic">I</tspan> = 4,0 A</text>
     <!-- FEL -->
     <text font-size="13" font-style="italic">I = 4,0 A</text>
     ```

  **⚠️ Teori-figurer (`::: figur` i `data/teori`) ÄRVER kursiv stil.**
  `marked` lindar `<svg>` i ett `<p>`, och `.lab-block-figur p` är kursiv
  (bildtext-stil) → SVG-texten ärver `font-style: italic`, så **mätetal och
  enheter blir kursiva** trots att källan inte kursiverar dem (påpekat
  2026-07-01: "34 N" och "0,25 m" renderades kursivt). Detta neutraliseras
  globalt av regeln `.lab-block-figur svg { font-style: normal }` i
  `styles-laborans.css` — **rör inte den regeln.** Regeln sitter ENBART på
  `svg`-roten (inte på `text`), så det ärvda kursiv-värdet slås ut medan
  variabler som är explicit kursiva via `<tspan font-style="italic">` (eller
  ett helt `<text font-style="italic">` för en ren variabel) BEHÅLLER sin
  kursivering — presentationsattribut på `<text>`/`<tspan>` vinner över det
  ärvda värdet. Granska alltid en
  katalog-skärmdump (inte bara isolerad SVG) — kursiv-arvet syns bara i
  katalog-kontexten.

### Subscript

- **Sifferindex**: Unicode (Q₁, Q₂, v₀) eller `F_1` i math-block.
- **Bokstavsindex i löptext**: alltid math-block `$F_G$`, aldrig `*F*_G`
  (markdown sväljer underscore-tecknet och G blir kvar med `_` framför).
  Gäller även Unicode-tecken som ρ, σ, μ — skriv `$\rho_\text{guld}$`,
  inte `ρ_guld`.
- **Upright vs kursiv subscript**: bokstavs-subscript som är etikett (N,
  G, R, drag) ska renderas upright med `\mathrm{}`, inte kursivt.
  Build-skriptet `data/teori/build.js` har `uprightSubscripts()` som
  **automatiskt** konverterar `F_G` → `F_\mathrm{G}` i teori-bundeln —
  skriv enkelt `F_G`, `F_\text{drag}`. Siffror lämnas oförändrade.
- I `data/ovningar.js` finns ingen sådan transform — där måste du själv
  skriva `F_\\mathrm{G}` (med dubbelt backslash, se nedan).

### Exponenter och tiopotenser

**Använd ALDRIG Unicode-superscript-tecken (⁻, ¹, ², ⁷, ⁰ …) för exponenter
i löptext.** De ligger i olika teckensnittsglyfer med olika storlek och
baslinje, så `10⁻¹⁷` renderas ojämnt — minustecknet och siffrorna får olika
höjd och "hoppar". Extra synligt i fet/stor text. Återkommande fel (påpekat
2026-06-25).

Skriv i stället exponenten med riktig markup:

- **I HTML-kontext** (t.ex. `body`-strängar i `data/nyheter.js`, rå inline-SVG/
  HTML): `10<sup>−17</sup>`. Använd **äkta minustecken** `−` (U+2212) i
  exponenten, inte bindestreck `-`.
- **I markdown-/KaTeX-kontext** (`data/teori/*.md`, `data/ovningar.js`):
  math-block — `$10^{-17}$` (md) / `$10^{-17}$` med `\\` vid ev. kommandon (JS).
- **Sifferindex (subscript) i ren text** får använda Unicode (Q₁, v₀) — se
  Subscript ovan. Det är exponenter (superscript) som ALDRIG ska vara Unicode.

**Undantag — ren textkontext utan HTML/KaTeX-rendering:** där taggar visas
bokstavligen (t.ex. `research.citation` i `data/nyheter.js`, som renderas som
React-textbarn utan `dangerouslySetInnerHTML`) går varken `<sup>` eller
math-block. Skriv då `10^-17` (caret) eller behåll Unicode som nödlösning —
men välj alltid `<sup>`/math-block så fort kontexten faktiskt renderar dem.

### Standardbeteckningar för krafter

- **Tyngdkraften betecknas ALLTID `F_G` med STORT `G`** — aldrig `F_g`
  (litet g). Litet `g` är *tyngdfaktorn* (9,82 N/kg), en helt annan storhet;
  använder man `F_g` blandar man ihop kraften med faktorn. Gäller överallt:
  md-teori, `data/ovningar.js`, KaTeX, JSX-formelkort, canvas- och
  SVG-etiketter (`<tspan>G</tspan>`, inte `g`). `G` är en upright
  etikett-subscript (se ovan), så `F_\mathrm{G}` i ovningar.js / rå-KaTeX.
- Övriga vedertagna kraftbeteckningar: normalkraft `F_N`, spännkraft `F_S`,
  friktionskraft `F_f`, resulterande kraft `F_R`, elektrisk kraft `F_e`.

### Hårt mellanslag (NBSP) i löptext

Använd NBSP (U+00A0) eller pakka i math-block (`$…$`) för att förhindra
radbrytning mellan ihörande element. Math-blocket har `white-space: nowrap`
(regel i `styles-laborans.css`) → hela uttrycket flyttas tillsammans.
**Rör inte den CSS-regeln** utan att samtidigt återinföra NBSP överallt.

Tre fall där radbrytning måste förhindras:

1. **Tusentalsgrupper**: `10 000 Pa` (NBSP), inte `10000 Pa`. Vid flera
   grupper i samma tal (`10 130 000`) — *alla* mellanslag är NBSP.
2. **Värde + enhet**: `5,0 m/s` (NBSP mellan 5,0 och m/s). Gäller också
   `100 °C`, `180°`, `5 %`, `3 st`.
3. **Variabel + värde + enhet**: ALLTID math-block — `$g = 9{,}82\ \mathrm{N/kg}$`.
   Gäller alla operatorer: `=`, `≈` (`\approx`), `<`, `>`, `≤` (`\leq`),
   `≥`, `∝` (`\propto`), `≠`.
4. **Hela relationen i ETT math-block** — en relation mellan storheter
   (t.ex. `F_f = F_drag`, `F_N = F_G`) skrivs som **ett** sammanhållet
   math-block `$F_f = F_\text{drag}$`, ALDRIG som två separata inline-math
   med operatorn utanför (`$F_f$ = $F_\text{drag}$`). I det senare fallet är
   ` = ` vanlig löptext och webbläsaren får bryta raden vid operatorn, så
   `F_drag` hamnar på nästa rad. Math-blocket har `white-space: nowrap` och
   håller ihop hela uttrycket. Återkommande fel (påpekat 2026-06-22).
5. **ALDRIG markdown-kursiv variabel följt av värde** (`*t*₁ = 0 min`,
   `*t* = 5,0 s`) i löptext eller frågestam — använd math-block
   (`$t_1 = 0\ \mathrm{min}$`, `$t = 5{,}0\ \mathrm{s}$`). Markdown-formen
   bryter raden mellan beteckning och värde (` = värde` är vanlig löptext),
   och **inuti en fet `::: exempel`-stam** (`**…**`) kolliderar dessutom
   asteriskerna i `*t*` med fet-asteriskerna `**` så att hela frågan
   renderas kursiv med en lös `*` i kanten. **Det får ALDRIG ske en
   radbrytning mellan beteckning, likhetstecken och värde** — pakka alltid
   `beteckning = värde [enhet]` i ett math-block. Återkommande fel
   (påpekat 2026-06-23).

Math-block ($...$) är immuna mot NBSP-behov — inom KaTeX används `\,`
som tunt skyddande tusentalsavgränsare (`2\,700`).

**Anti-mönster** (vanligast): `(m = 150 g)` i parentes — varken kursiv eller
math. Rätt: `($m = 150\ \mathrm{g}$)` i md, `($m = 150\\ \\mathrm{g}$)` i JS.
Stanna alltid upp vid "(*m* = …)", "(*V* = …)", "(*t* = …)"-mönster och
pakka hela parentesen i math-block.

4. **Öppningsparentes direkt före inline-formel** — `($q_e = …$)`. KaTeX
   renderar formeln som inline-block, så webbläsaren får bryta raden mellan
   `(` och formeln → `(` blir ensam kvar i radslutet. **Detta hanteras numera
   automatiskt** av `restoreMath()` i `katalog.html`, som limmar ihop `(` med
   den efterföljande inline-formeln i en `.math-paren`-nowrap-span (CSS i
   `styles-laborans.css`). Du behöver alltså *inte* göra något särskilt i
   md/JS — men **rör inte** den regeln eller CSS-klassen utan att förstå
   detta. Skriver du rå inline-HTML/SVG (utanför markdown-pipelinen) gäller
   inte automatiken: lägg då parentesen *inuti* formeln, `$(q_e = …$`.

### ⚠️ Inline-math `$…$` måste ligga på EN källrad — aldrig radbrytas

**Ett inline-math-span (enkelt `$…$`) får ALDRIG spänna över en radbrytning i
md-källan.** marked+KaTeX kräver att hela `$…$` ligger på en rad. Bryts det
mitt itu — t.ex.

```
sinusraden är $\dfrac{\sqrt{0}}{2},\ \dfrac{\sqrt{1}}{2},\
\dfrac{\sqrt{2}}{2}$ — täljarens rot …
```

— så bryts delimiter-paringen och felet **kaskaderar**: efterföljande löptext
hamnar i math-mode, mellanslagen strippas och rå LaTeX visas
("täljarensroträknarbarauppp…"). Radbryt alltid MELLAN math-spann, aldrig
inuti ett. Långa inline-formler får hellre ligga på en lång rad (eller göras
till ett `$$…$$`-displayblock, som DÄREMOT får spänna flera rader).

**Verifierarna fångar INTE detta** — bara en katalog-skärmdump avslöjar det.
Vanlig fälla när subagenter radbryter för ~76-teckensmarginal. Scanner: dela
på `$$…$$`, splitta resten på `$`, flagga udda index som innehåller `\n`.

### ⚠️ Figur-viewBox får aldrig klippa cirkeln/kurvan; axeletikett aldrig på kurvan

När en `::: figur` innehåller en cirkel eller kurva: sätt viewBoxen så att
HELA geometrin ryms med ~3 px marginal (räkna `cx±r`, `cy±r` — inte på
ögonmått). Lägg axeletiketten (`x`/`y`) vid pilspetsen, **ovanför/bredvid**
kurvan, och kontrollera numeriskt att glyfboxen inte överlappar cirkeln (vid
etikettens x är cirkelns rand `cy − √(r² − (x−cx)²)`). `verify-figur-bounds.js`
fångar INTE detta (den mäter TEXTENS klipp — se avsnittet om etiketter nedan —
inte geometrins; phantom-punkter i 0,0 gör vänster/topp-marginal negativ) —
granska ALLTID skärmdump.

### ⚠️ Kurvor ska ritas UR SIN FUNKTION — aldrig på fri hand

**En graf är en matematisk kurva, inte en teckning.** Rita den genom att
räkna ut punkter ur funktionen och sampla TÄTT — aldrig genom att gissa
några punkter och dra raka streck emellan. En polylinje med långa segment
ger synliga facetter och en spetsig topp där kurvan ska vara rund
(uttryckligt önskemål 2026-08-20: normalfördelningskurvorna i `ma2c-6.5`
var "spetsigt och hackigt" i stället för "fina och jämna klockkurvor").

- **Sampla ur formeln med steg ≤ 4 enheter** och skriv ut punkterna som en
  polylinje, ELLER rita med riktiga kurvkommandon (`C`, `Q`, `A`). Ett
  litet genereringsskript i scratchpad är alltid rätt väg — skriv aldrig
  koordinaterna för hand.
- **Toppar och vändpunkter måste ha en punkt PÅ SIG och punkter tätt
  omkring**, annars blir extrempunkten ett hörn. Det är där facetteringen
  syns värst.
- **`node .claude/verify-kurvor.js` före commit.** Den flaggar paths som
  bara har `M`/`L`, svänger mjukt i minst tre hörn och har segment längre
  än 10 px renderat.
- **Avsiktligt raka grafer är undantagna** — en v–t-graf med konstant
  acceleration, en styckvis linjär funktion, en area-polygon. Verifieraren
  skiljer dem åt på svängvinkeln: knäckar skarpare än 40° räknas som
  avsiktliga hörn.

**Fysiken ska stämma i kurvans form, inte bara i dess etiketter.** Tre
normalfördelningskurvor med samma medelvärde men olika spridning har
**samma area** (arean under en täthetsfunktion är alltid 1), så höjden är
omvänt proportionell mot spridningen: $h = C/\sigma$. Ritar man dem på
ögonmått blir "högre och smalare" fel i förhållande till "lägre och
bredare", och figuren motsäger texten bredvid.

### ⚠️ Figurernas storlek: skala upp `width`/`height`, aldrig 1:1

**En teori-figur ska renderas STÖRRE än sin viewBox**, så att etiketterna
hamnar i nivå med brödtexten (17 px) i stället för de 9–13 px de ritas i.
Figurerna ritas alltså fortfarande i bekväma viewBox-koordinater, men
`<svg>`-taggens `width`/`height` sätts till viewBox-måtten **gånger en
skalfaktor** (uttryckligt önskemål 2026-08-20: "alla har inte så bra syn").

Räkna faktorn så här — den minsta av fyra gränser:

```
k = min( 664 / viewBoxBredd,      // får inte bli bredare än spalten
         520 / viewBoxHöjd,       // rimligt tak i höjdled
         19  / största font-size, // texten ska inte svälla förbi brödtexten
         1.8 )                    // generellt tak
width = round(viewBoxBredd · k)   height = round(viewBoxHöjd · k)
```

- **Spalten är 664 px** (figurblockets innehållsbredd på bred skärm). En
  figur som sätts bredare krymps av `max-width: 100%`, och då blir skalan en
  annan än den avsedda — `verify-figur-bounds.js` ger fel på det.
- **Samma k i båda led**, annars förvrängs figuren. Aldrig k < 1.
- **Rör aldrig viewBoxen eller koordinaterna** när du skalar — bara de två
  attributen. Geometri, etiketter och streckbredder följer med av sig
  själva, så inga nya kollisioner kan uppstå.
- **Hover-etiketter räknas som text**: en dold etikett i font-size 10 i en
  figur med k = 1,2 renderas som 12 px och är för liten. Sikta på minst
  ~13 px renderat — dela hellre etiketten på två rader i större grad än att
  låta den ligga på en rad i mikroskopisk stil. (Upphöjda exponent-`tspan`
  är förstås mindre än sin bastext, som sig bör.)
- **CSS:en har en fälla**: `marked` lindar `<svg>` i ett `<p>`, och
  bildtextens `max-width: 46ch` träffade därför även figuren och kapade
  varje figur till 405 px. Undantaget `.lab-block-figur p:has(> svg)` i
  `styles-laborans.css` löser det — **ta inte bort det**, då blir alla
  figurer små igen oavsett vad `width` säger.

### ⚠️ Etiketter får aldrig klippas av viewBox-kanten — räkna på TEXTENS BREDD

En SVG-etikett har en bredd, och den bredden ryms inte alltid innanför
viewBoxen. Klassikern är **diagrammets y-värden**: de sätts med
`text-anchor="end"` några px till vänster om y-axeln, och då sticker den
BREDASTE siffergruppen ut åt vänster — "300" fick sin första siffra avhuggen
i `ma2c-3.5` (påpekat 2026-08-15), och samma fel fanns i tio figurer till
(bl.a. y-värdena i `ma3c-2.1` och `ma4-2.5` samt hela x-axelpilen i
`fy2-2.12`). Det ser inte trasigt ut i källan — bara i renderingen.

Räkna alltid ut etikettens ytterkanter innan du sätter viewBoxen:

- `text-anchor="end"` → texten går från `x − bredd` till `x`
- `text-anchor="middle"` → `x ± bredd/2`
- `text-anchor="start"` → `x` till `x + bredd`

Bredden är ≈ `0,54 · font-size` per siffra, ≈ `0,50` per gemen och
≈ `0,68` per versal — exakta värden finns i **`.claude/teckenbredd.js`**
(uppmätta i Chrome i figurernas typsnittsstack). Behöver du bredden i ett
skript: `require('.claude/teckenbredd.js').textWidth(str, fontSize)`.

- **Dimensionera efter den bredaste etiketten**, inte efter den första:
  y-skalans "300" är bredare än "0", och "10 000" bredare än "500".
- **Utöka hellre viewBoxen (och `width`/`height`) än att krympa gapet till
  axeln** — 4–6 px luft mellan tal och axel ska finnas kvar.
- **Ryms etiketten inte ens då: flytta den in i en fri yta i stället**
  (t.ex. in i figuren med `text-anchor="start"`), och kontrollera att den
  inte hamnar på en linje.
- Detsamma gäller **geometrin**: `fy2-2.12` hade axelpilens spets 36 px
  utanför viewBoxen, så hela pilen försvann.

`node .claude/verify-figur-bounds.js` mäter detta automatiskt (både i
höjd- och sidled) för alla `::: figur` — men bara för text utan egen
`transform`; roterade etiketter och simuleringarnas scener måste du
fortfarande granska i skärmdump.

### JS-strängar: dubbla alla backslash

I `data/ovningar.js` (och andra `.js`-filer där KaTeX-källa ligger i
template literals): **alla backslash dubblas**, annars sväljer JS dem och
KaTeX får råtext. I `.md`-filer används enkla backslash.

- md: `Räkna med $g = 9{,}82\ \mathrm{N/kg}$.`
- JS: `` `Räkna med $g = 9{,}82\\ \\mathrm{N/kg}$.` ``

Gäller alla KaTeX-kommandon: `\\cdot`, `\\frac`, `\\sqrt`, `\\left`,
`\\right`, `\\sin`, `\\alpha`, `\\mathrm`, `\\,` osv. Titta i grannraderna
— om de använder `\\cdot` ska din också göra det.

### Värdesiffror: räkna om avrundningen, gissa aldrig

**Slutsvaret avrundas till lika många värdesiffror som den minst
noggranna given — och avrundningen ska räknas ut, inte "kännas rimlig".**
Felet som utlöste regeln (påpekat 2026-08-22): $78{,}56\ \mathrm{N}$
skrevs $\approx 80\ \mathrm{N}$ i pennlösningen till `fy2-1.2`, trots att
givna 20 kg, 1,0 m och 2,5 m ger **två** värdesiffror — rätt svar är
**79 N**. Talet såg ut att "höra hemma" vid 80 eftersom grannsvaret i
uppgiften var 120 N, och ingen verifierare fångar det.

- **Räkna avrundningen som ett eget steg.** Skriv ut det oavrundade värdet,
  bestäm antalet värdesiffror ur givna data, och avrunda sedan siffra för
  siffra: 78,56 → två värdesiffror → 7 och 8 behålls, nästa siffra är 5 →
  **79**. Runda ALDRIG "till närmaste tiotal" bara för att talet är tvåsiffrigt
  — 79 har redan två värdesiffror.
- **Nollor räknas inte som värdesiffror i början av talet.** 117,84 med två
  värdesiffror blir 120 N (= 1,2 · 10²) — där är tiotalsavrundningen rätt,
  och just den likheten gör 78,56 → 80 lätt att skriva av misstag.
- **Samma tal, samma avrundning överallt.** Pennlösningen
  (`::: handskrift`), `::: textlosning`, svarsraden, tankebubblorna,
  figurens etiketter och eventuella övningar/exit tickets måste visa
  identiskt avrundat svar. Ändras ett svar: grepa på BÅDA formerna (det
  oavrundade och det avrundade) i `data/teori/`, `handskrift.js`,
  `data/ovningar.js` och `data/exittickets.js`.
- **Överslag ska märkas ut som överslag.** Resonerar texten med grovt
  avrundade värden ("ungefär 200 N minus ungefär 120 N ger 80 N") måste det
  stå att det är ett överslag, och den exakta räkningen redovisas separat —
  annars ser två olika svar (80 N och 79 N) ut som ett fel.
- **Mellanled avrundas aldrig** (redan regel i `handskrift.js` filhuvud):
  196,4 och 117,84 bärs vidare oavrundade, och avrundningen sker först i
  sista steget.

### Decimalformatering

**Exakt noll skrivs ALLTID utan decimaler** — `0`, aldrig `0,0`, `0,00`,
`-0,0` osv. Gäller överallt värden visas (avläsningar, etiketter i scen/
canvas/SVG, diagram, formelkort, övningar). Ett värde som *avrundas* till
noll (t.ex. 0,03 m/s vid en decimal) räknas också som noll och skrivs `0`.
Decimalsiffror på en nolla ser ut som onödigt brus. Varje sifferformaterare
i projektet måste hantera detta (lägg `if (parseFloat(s) === 0) return '0';`
direkt efter `toFixed`):

```javascript
const formatNumber = (num, decimals = 2) => {
    const s = num.toFixed(decimals);
    if (parseFloat(s) === 0) return '0';        // exakt/avrundat noll → "0"
    return s.replace('.', ',');
};
```

Tusentalsavgränsare-helper (NBSP):
```javascript
function fmtNum(n, d) {
    const s = n.toFixed(d);
    if (parseFloat(s) === 0) return '0';        // exakt/avrundat noll → "0"
    const [intp, frac] = s.split('.');
    const withSpaces = intp.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return frac !== undefined ? withSpaces + ',' + frac : withSpaces;
}
```

### Deluppgifter (a, b, c …) i frågor — VARJE deluppgift på EGEN rad

**Varje deluppgift börjar på en egen rad — b) får ALDRIG ligga på samma
rad som a)** (uttryckligt önskemål 2026-08-14, ersätter den tidigare
regeln där deluppgifterna flödade med `&emsp;&emsp;` emellan: en lång
a-uppgift fick då b) att börja i slutet av samma rad och radbrytas mitt
i meningen). Lägg en hård radbrytning **`<br>`** direkt före **varje**
deluppgiftsbokstav — före "a)", före "b)", före "c)" osv. Markdown-
pipelinen kör `marked` med `breaks: false` (se `katalog.html`), så ett
vanligt radslut räcker *inte* — det måste vara `<br>` (eller två
avslutande blanksteg).

- ✓ `**Priset var 80 kr år 2010 och 140 kr år 2023.<br>a) Bestäm indextalet år 2023.<br>b) Med hur många procent har priset ökat?**`
- ✗ `**…<br>a) Bestäm indextalet år 2023.&emsp;&emsp;b) Med hur många procent …**`
- ✗ `**Vad är SI-enheten för a) hastighet, b) volym?**` (inbäddat i meningen)

Gäller både teori-exemplens frågor (`::: exempel` i `data/teori/*.md`) och
`question`-strängarna i `data/ovningar.js` — även när deluppgifterna är
korta ettordsalternativ (`<br>a) hastighet<br>b) volym`).

**Undantag som behåller inline-formen:**

- **Svarsrader**: den kompakta sammanfattningen i slutet av en lösning
  skrivs fortfarande på EN rad med `&emsp;&emsp;` som avskiljare —
  `**Svar:** a) Index 175&emsp;&emsp;b) Priset har ökat med 75 %.`
  (En svarsrad är kort och är inte en uppgift.)
- När a)/b) är **inflätade som separata satser mitt i en mening**
  ("Vilken a) acceleration får vikterna, b) spännkraft …?").

## Designtänk för simuleringar (5/5-arbetssättet)

Detta arbetssätt användes när "Flyta eller sjunka" gjordes om 2026-08-06 och
fick uttryckligt toppbetyg av användaren ("exakt samma tänk" ska användas
framöver). Tillämpa det på VARJE ny simulering och varje större revidering:

1. **Eget koncept — aldrig en kopia.** Kolla hur kända simuleringar (PhET
   m.fl.) brukar visa momentet och gör MEDVETET annorlunda: byt scenmetafor,
   upplägg och interaktionsmönster så att simuleringen känns som Fysiklabbets
   egen. Fysiken och beteckningarna följer förstås genomgången som vanligt.
   (Exempel: PhET:s nedgrävda bassäng + block A/B med radioknappar blev ett
   akvarium på en labbänk med föremålskort och färdiga försök.)
2. **Labbautentisk scen i laboranstemat.** Bygg scenen som ett riktigt
   skolexperiment på papperet: labbänk, akvarium, labbstativ, dynamometer,
   literskala — hellre än abstrakta lådor i ett tomrum. Små omsorger
   (glasreflexer, materialtexturer som träådring/tegelfog, plask och ringar)
   ger karaktär utan att störa pedagogiken.
3. **En pedagogisk centerpiece som förklarar VARFÖR.** Utöver själva
   skeendet ska scenen ha en visualisering som bär förklaringen — något
   eleven kan läsa av och resonera ur. (Exempel: flytkartan — en
   densitetsskala med "tätare nedåt" där föremål ovanför vätskans linje
   flyter. Motsvarigheter: energistaplar, vektortriangel, fasdiagram.)
   Hitta en egen, konkret representation i stället för ännu en siffertabell.
4. **Gissa-läge (förutsäg–testa–förklara) när momentet passar.** Låt eleven
   förutsäga utfallet av ett dolt/slumpat fall innan simuleringen visar
   facit: maskera avläsningar som avslöjar svaret, kräv en liten beräkning
   (t.ex. ρ = m/V), ge feedback med förklaring och räkna poäng/svit.
   Detta gör simuleringen till ett självtest, inte bara en demonstration.
5. **Färdiga försök i stället för lägesradioknappar.** Klassiska jämförelser
   ("samma volym", "samma massa", "samma densitet") läggs som förvalsknappar
   som ställer upp scenen med ett klick — eleven kan sedan ändra fritt.
   Parametrar väljs helst fysiskt begripligt (material + volym) i stället
   för råa glidare, med härledda värden visade (m = ρ · V = …).
6. **Husets standarder gäller fullt ut**: layout, fullskärmsmönstret
   (`.fs-controls`/`.fs-toggle-handle`/`.scene-toggles` från
   styles-laborans-sim.css — definiera inga egna dubbletter), mobil-dock,
   skalenliga kraftpilar, typografi och alla verifierare. Testa interaktivt
   med skärmdumpar (dra föremål, byt läge, fullskärm, mobil 390 px) och
   kontrollera fysiken numeriskt i jämvikt (t.ex. F_L = F_G) före commit.

## Simuleringsmönster

Alla simuleringar följer samma struktur:
1. Navigation (mall ovan)
2. Breadcrumb: `Hem / Fysik X / [Namn]`
3. Titel + introduktion
4. `<div id="root">` för React-app
5. React-komponenter: Simulation, Controls, Results, Explanation
6. Footer

### Standardlayout (icke-fullskärm)

Visualiseringen vänster, sidopanel med reglage höger. På smal skärm:
sidopanelen flyter ner under visualiseringen.

```jsx
<main className="flex-grow flex flex-col lg:flex-row px-4 sm:px-6 pb-6 gap-6 max-w-7xl mx-auto w-full">
    <div className="flex-grow lg:w-2/3 xl:w-3/4 min-h-[400px] order-1">
        <SimulationView ... />
    </div>
    <div className="lg:w-1/3 xl:w-1/4 flex-shrink-0 order-2">
        <ControlsView ... />
    </div>
</main>
```

**Anti-mönster**: enbart flytande kontrollpanel inne i scenen i icke-
fullskärmsläget — reglagen blir otillgängliga. Flytande panel är ENDAST
för fullskärm.

Referensimpl: `fysik2-brytning-app.html`, `fysik2-fotoelektrisk-effekt.html`.

### Fullskärmsläge

Varje sim ska ha fullskärmsläge. **All interaktion måste vara möjlig även i
fullskärm** — fullskärm får aldrig bli ett "titta-men-rör-inte"-läge.

⚠️ **PLACERINGSREGEL (gäller ALLA simuleringar):** I fullskärm på **bred
skärm** placeras reglagen efter typ, så att de inte skymmer scenen. (På
skärmar ≤600 px gäller i stället "Mobil (≤600px)" nedan: overlay-lägena
kopplas bort och verktygen dockas under scenen. Du behöver inte göra något
särskilt för det — men skriv inga egna `align-items: center`-regler på
`.scene-wrap:fullscreen`, se fällan där.)

- **Glidare/reglage (och sifferfält) → en hopfällbar panel (dropdown) i
  scenens UNDERKANT** (`.fs-controls` + `.fs-toggle-handle`). Användaren kan
  fälla ihop den med "Dölj reglage".
- **Kryssrutor och radioknappar (visningsval, lägesval) → en ruta UPPE TILL
  HÖGER** på scenytan (`.scene-toggles`). Denna ruta visas i både normalt
  läge och fullskärm.
- **Start/Paus/Börja om (styrknappar) → BARA i rutan uppe till höger**
  (`.scene-toggles` `.st-actions`), tillsammans med visningsvalen.
- Fullskärmsknappen (`.fs-btn`) sitter uppe till vänster.

⛔ **VARJE reglage får finnas på EXAKT ETT ställe i fullskärm — aldrig
dubblerat.** Återkommande misstag: Start/Börja om läggs *både* i den nedre
panelen (`.fs-controls`) *och* uppe till höger (`.st-actions`), så samma
knappar syns två gånger. Styrknapparna hör hemma uppe till höger; den nedre
panelen innehåller **bara glidare/sifferfält**. Har ett scenario inga
glidare (t.ex. fallskärmshopparen) ska den nedre panelen och dess
"Dölj reglage"-handtag **inte renderas alls** — annars blir den en tom låda
eller en dubblettlåda för knappar. Kontrollera alltid i fullskärm att inget
reglage förekommer på två platser.

Så: kontinuerliga värden (glidare) nere, diskreta val + styrknappar uppe
till höger, fullskärm uppe till vänster — inga överlapp, inga dubbletter.
Referensimpl: `fysik2-konisk-pendel-app.html`, `fysik1-vektoraddition-app.html`.

Krav på mönstret:

1. Scen-wrapper (`.scene-wrap`) med `position: relative` och
   `:fullscreen`/`:-webkit-full-screen` som sätter `100vw/100vh`.
   **För SVG-/HTML-scener (inte THREE.js):** `body.lab-sim .scene-wrap` har
   som standard en MÖRK gradient-bakgrund. En ljus pappersscen kräver
   attributet `data-theme="ljusPapper"` på scen-wrappern
   (`<div className="scene-wrap" data-theme="ljusPapper">`) — annars blir
   bakgrunden marinblå och dina mörka pilar/etiketter syns knappt. Gäller
   även i fullskärm. THREE.js-sims slipper detta eftersom canvasen fyller
   wrappern med sin egen `scene.background`.
   ⚠️ **Scope `width:100%`-regeln till DIREKTA scen-svg:n.** En regel som
   `.scene-wrap svg { width:100%; height:100% }` träffar **även ikon-svg:n
   inne i `.fs-btn`** och blåser upp den från 18 px till hela 40 px-cirkeln —
   kanterna spiller utanför cirkeln och fullskärmsikonen ser fel ut jämfört
   med övriga sims. Använd barnselektorn `.scene-wrap > svg { width:100% }`
   så att bara scenens egen svg fylls, inte knapparnas ikoner.
2. Fullskärmsknapp (`.fs-btn`) i ett hörn → `el.requestFullscreen()`.
   **Ikonen ska vara IDENTISK på alla simuleringar** — exakt samma som på
   `fysik2-fotoelektrisk-effekt.html` (referens). Hitta ALDRIG på en egen
   fullskärmsikon. **Använd ALLTID klassen `fs-btn`** — den är globalt stylad i
   `styles-laborans-sim.css` till en cirkulär ikon-knapp (40 px, vit
   cirkel, ink-ikon, uppe till vänster). **Definiera ALDRIG en egen lokal
   `.fs-btn`-CSS** och lägg **ingen text** i knappen — bara expandera/
   komprimera-ikon-SVG:n (annars spiller texten ut under cirkeln och varje
   sim ser olika ut). Exakt mönster (kopiera från
   `fysik2-fotoelektrisk-effekt.html` eller `fysik2-konisk-pendel-app.html`):
   ```jsx
   <button className="fs-btn" onClick={toggleFullscreen} aria-label="Fullskärm"
           title={isFullscreen ? 'Lämna fullskärm' : 'Fullskärm'}>
     {isFullscreen ? (
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/>
       </svg>
     ) : (
       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/>
       </svg>
     )}
   </button>
   ```
3. Flytande kontrollpanel (`.fs-controls`) absolut positionerad,
   innehållande de viktigaste reglagen.
4. Visa/dölj-knapp (`.fs-toggle-handle`) — användaren kan minimera panelen.
5. Tunga/sällan använda kontroller stannar i sidopanelen utanför scenen.
6. `user-select: none` på scen-wrappern (förhindrar att etiketter markeras
   blått när användaren drar i scenen).

Komplett CSS- och React-mall: kopiera från `fysik2-fotoelektrisk-effekt.html`
eller `fysik2-brytning-app.html`.

### Mobil (≤600px): scenen överst, verktygen UNDER — aldrig ovanpå

**På smal skärm är overlay-placeringen ovan FÖRBJUDEN.** En 860×520-viewBox
mot 390 px bredd ger en rityta som bara är ~215 px hög — en panel uppe till
vänster eller höger täcker då i praktiken hela simuleringen. Dispositionen
byggs därför om, och det sköts **centralt i `styles-laborans-sim.css`
sektion 8** plus `sim-dock.js`. Du behöver normalt inte skriva någon
mobil-CSS i en ny simulering; du behöver däremot **inte motarbeta** reglerna:

    scenen överst  →  verktygen dockade under  →  hopfällbara med handtag

- **Normalläge**: scenramen får `height: auto` (fast höjd + `aspect-ratio`
  neutraliseras) så att den hugger scenen och rymmer `.scene-toggles`,
  `.scene-info` och `.scene-hint` under den. Sätt alltså gärna en fast höjd
  på `.scene-wrap` för desktop — mobilen skriver över den.
- **Fullskärm**: ramen blir en flex-kolumn, scenen ligger `sticky` i
  överkanten och verktygsrutorna flödar under i ordningen scen → avläsning →
  hint → handtag → `.fs-sliders` → `.scene-toggles` → `.fs-controls`.
- **Hopfällbart**: `sim-dock.js` lägger till ett handtag ("Dölj verktyg" /
  "Visa verktyg") som fäller hela docken. Det ersätter simuleringens egna
  `.fs-toggle-handle` på mobil, så att det bara finns EN fäll-knapp.
- **Ark-läge**: har scenen ingen egen proportion (canvas/div som JS skalar
  efter ramen) blir den 100vh i fullskärm och det finns ingen yta under att
  docka i. Då lägger `sim-dock.js` verktygen som ett ark över scenens nedre
  del (max ~60 % av skärmen) och fäller ihop det som utgångsläge.
- **Avläsningsrutan (`.scene-info`) får ALDRIG ligga som en ruta över
  scenen i ark-läget** (uttryckligt önskemål 2026-08-15: rutan centrerades
  mitt över solförmörkelsen och "skymde hela sikten"). Standard: sektion 8
  gömmer/visar den ihop med docken, precis som verktygsrutorna — du behöver
  inte göra något. Ska avläsningen synas HELA tiden även i ark-läget (t.ex.
  en nedräkning): sätt klassen **`si-diskret`** på `.scene-info` — då ritas
  den som ren text utan ruta/ram/skugga uppe till vänster under
  fullskärmsknappen. Simuleringen sätter då SJÄLV textfärger som håller mot
  sin scenbakgrund (ljus text + tunn mörk textskugga på mörk himmel; bläck
  på ljus pappersscen — aldrig vit halo på ljus botten). Referens:
  `fysik2-solformorkelse.html`. `verify-mobil-scen.js` ger fel om en
  avläsning med bakgrund/ram ligger över scenen i ark-läget.
- **Snabbverktyg i ark-läget (`.fs-quick`)**: de VIKTIGASTE reglagen
  (start/paus + 1–2 glidare, t.ex. tid och förstoring) ska vara åtkomliga
  även med hopfälld dock (uttryckligt önskemål 2026-08-15) — annars måste
  eleven öppna hela verktygsarket för att alls styra skeendet. Lägg en
  `<div className="fs-quick">` i scen-wrappern: `.fq-play`-knapp
  (SVG-ikon, currentColor) + `.fq-rows` > `.fq-row` med `.fq-lbl` +
  range-input (samma state som huvudreglagen — ingen egen kopia av
  värdet). CSS:en är central (bas + sektion 8 i styles-laborans-sim.css);
  raden visas BARA i ark-läge med hopfälld dock, så inget reglage är
  synligt på två ställen samtidigt — när arket fälls ut tar
  `.fs-controls`/`.scene-toggles` över. Etiketterna ska matcha
  huvudreglagens namn ("Förstoring", inte "Zoom"). Referens:
  `fysik2-solformorkelse.html`.

Fällor som redan kostat tid (finns som kommentarer i CSS:en — läs dem innan
du ändrar):

1. **`align-items: center; justify-content: center` på
   `body.lab-sim .scene-wrap:fullscreen`** i en simulerings egna
   `<style>`-block har exakt samma specificitet som sektion 8 men står
   senare → utan `!important` i sektion 8 vann centreringen och docken
   överflödade symmetriskt ut ur skärmen. Skriv inte nya sådana regler.
2. **Absolut positionerad scen** (`div.absolute.inset-0`) gör att
   `height: auto` kollapsar ramen till 0 px. Sektion 8.1 undantar det med
   `:not(:has(> .inset-0))` — behåll klassen `inset-0` om du bygger så.
3. **`bottom`-ankrade overlays** (`.scene-info`) följer med nedåt när ramen
   växer och landar bakom verktygen. De dockas därför också.

**Kör `node .claude/verify-mobil-scen.js` före commit** när du rört en scen,
en verktygsruta eller sektion 8. Den startar 390×744, går in i fullskärm i
varje simulering och mäter att ingen verktygsruta ligger ovanpå ritytan,
klipps bort, kollapsar ramen eller krockar med avläsningsrutan. Kräver
dev-servern på port 8000.

### Inga överlappande objekt

UI-element får aldrig ligga ovanpå varandra. Testa både normalt OCH
fullskärmsläge på både bred och smal skärm innan klart.

Vanliga fällor:
- **Övre vänstra hörnet tillhör `.fs-btn` — ensam.** Den globala CSS:en
  lägger fullskärmsknappen absolut på `top: 14px; left: 14px` (40×40 px;
  32×32 vid ≤600 px), så en egen absolut-positionerad knapp/etikett på
  ~`24,24` hamnar RAKT BAKOM den (hänt: en Play-knapp doldes helt).
  Placera egna overlays till höger om (`left: 66px`) eller under
  (`top: 66px`) knappen — och kör `node .claude/verify-fs-btn.js`, som
  mäter just detta i både normalläge och fullskärm.
- SVG-etikett (t.ex. "Medium 1") kolliderar med fullskärmsknappen i samma
  hörn → flytta etiketten åt höger/nedåt.
- Flytande panel täcker det eleven faktiskt vill se → toggle-knapp.
- Vinkeletiketter (i₁, b₁) hamnar på strålarna → större etikettradie.
- Formel i headern upprepas i sidopanelen → välj en plats, inte båda.

### ⛔ FÖRBJUDET: vit kontur/halo runt text och pilar på ljus scenbakgrund

**Detta är ett ÅTERKOMMANDE fel som upprepade gånger har påpekats och rättats
— gör det INTE igen.** På ljusa scenbakgrunder (t.ex. "Laborans papper"
`#f7f2e8` → `#ece3d2`, men även ljus himmel/mark i andra scener) får SVG-
textetiketter och pilar **ALDRIG** en vit eller nästan-vit kontur/halo:

- ✗ `stroke="#ffffff"` / `stroke="#fff"` / `stroke="white"` på `<text>`,
  `<tspan>`, `<line>` eller `<polygon>` som utgör en etikett/pil
- ✗ `paintOrder: 'stroke'` (eller `paint-order: stroke`) kombinerat med vit
  `stroke`
- ✗ `WebkitTextStroke` eller `text-shadow` i vitt/ljust

Mot en redan ljus botten gör konturen ingen nytta — den lägger bara en
suddig vit gloria runt texten/pilen och gör den **svårare** att läsa, inte
lättare. Körs `node .claude/verify-no-white-outline.js` (se "Kommandon")
före varje commit för att fånga detta maskinellt.

Lösning, i prioritetsordning:

1. **Mörk/mättad textfärg** (bläck, eller komponentens egen kraft-/
   accelerationsfärg) räcker för kontrast mot ljus bakgrund — **ingen
   kontur alls**. Förstahandsvalet, nästan alltid rätt.
2. **OBS – även en ljus papperston-halo läses som vit gloria.** På en
   pappers-*gradient* (`#f7f2e8` → `#ece3d2`) är `#f3eee4` ljusare än botten
   i nedre halvan av scenen, så en `#f3eee4`-halo syns där som en suddig vit
   ring runt texten — exakt det fel användaren upprepat påpekar. Använd
   **ingen halo som standard**, ens i papperston. Endast om en etikett
   faktiskt korsar rörliga figurdelar (skrollande golvmarkeringar,
   luftpartiklar) och punkt 3 inte räcker: lägg en *ultratunn* halo
   (`strokeWidth 2`) i tonen för den **lokala** bakgrunden just där etiketten
   sitter (inte en generell ljus ton) — och granska i skärmdump att den inte
   ser vit ut. Vid minsta tveksamhet: ta bort halon.
3. **Hellre flytta etiketten till en lugn yta** än att lösa en kollision
   (etikett ovanpå figur/objekt) med kontur. En etikett som hamnar ovanpå
   t.ex. en röd bil löses genom att flytta etiketten till himlen/vägen ovan/
   under pilen — inte genom att lägga en kontur runt den.

Samma princip gäller pilkonturer (`Arrow`-komponenter): på ljus bakgrund
räcker pilens egen färg. En tunn bläckfärgad kantlinje
(`rgba(15,22,32,0.18)`) kan användas enbart där pilen korsar andra
figurdelar (kärra, hjul) för lite separation — aldrig en tjock vit kontur.

**Undantag (legitima vita konturer, INTE detta fel):** vita ikon-strokes på
*mörka* knappar/scener (t.ex. `.fs-btn`-fullskärmsikonen, ljud-knappen,
muspekar-cursors), eller dekorativa effekter på riktigt mörka ytor (t.ex.
en grön LED-display). Avgör alltid utifrån den FAKTISKA bakgrunden bakom
elementet — inte filens generella tema.

### Formelpresentation

Gäller överallt formler visas (ingress, header, paneler, förklaringar):

1. **Raka divisionsstreck** — aldrig `/` mellan täljare och nämnare.
   Snedstreck endast i sammansatta enheter (`m/s`, `kg/m³`).
2. **Definiera beteckningar med ord-etikett ovanför/under variabeln**
   (OBLIGATORISKT, inte valfritt). Varje variabel i formelkortet får sitt
   *namn* satt som en liten etikett **direkt ovanför täljaren och under
   nämnaren** (och ovanför/intill resultatvariabeln) — t.ex. MASSA över
   *m*, VOLYM under *V*, RESULTERANDE KRAFT över *F*_R. Exakt som i
   densitets- och Newtons andra lag-korten. Det räcker INTE att bara skriva
   `a = F/m = värde` med symbolerna — varje symbol ska ha sitt ord.
   En intilliggande lista (`där …`) är endast nödfallsutväg när utrymmet är
   för trångt; förstahandsvalet är alltid etikett över/under. **Gäller även
   React/JSX-formelkort i headern**, inte bara canvas/densitet — använd
   `.flbl`-spann över/under variabel-spannen. Vanlig fälla: man bygger ett
   snabbt JSX-bråk `a = F/m` utan ord-etiketter — det är fel.
3. **Insatta värden har SI-enheter** — `5,0 kg`, inte bara `5,0`.
4. **Variabler kursiv, enheter rakt** (se Typografi).
5. **Multiplikationstecken `⋅` (U+22C5) skrivs alltid ut** mellan faktorer
   — `n₁ · sin i`, `F = G · m₁ · m₂ / r²`. Undantag: implicit multiplikation
   inom funktionsargument (`sin i`).
6. **Operatorer i nivå med variablerna** — i formelkort med etiketter
   ovanför variablerna: använd `items-end` (inte `items-center`) på
   flex-containern så att `=`, `·`, `sin`, `+`, `−` ligger på variablernas
   baslinje.
7. **Vertikal linjering i fleruttrycks-formler (OBLIGATORISKT)** — när ett
   formelkort har flera former på rad (t.ex.
   `F_R = m · a  ⟺  a = F_R/m = värden = resultat`) eller **blandar
   variabler-med-ord-etikett och bråk**, ska ALLA delar ligga på *samma
   mittlinje*. Operatorer (`=`, `·`, `⟺`, `⟹`), bråk och variabler får
   aldrig hamna högre eller lägre än varandra. Lägg hela formeln på **EN
   `items-center`-rad** (inte separata grupper med olika alignment).
   ⚠️ Vanligaste fällan: en variabel med ord-etikett *ovanför* (utan
   motvikt under) trycks ned **under** bråkens mittlinje, så vänsterledet
   hamnar lägre än högerledet. Lös det med en **osynlig spacer-etikett
   under symbolen** (lika hög som etiketten) så att symbolen centreras i
   sin ruta:
   ```jsx
   <div className="flex flex-col items-center">
     <span className="flbl">Massa</span>
     <span className="fnum"><em>m</em></span>
     <span className="flbl" aria-hidden="true" style={{visibility:'hidden'}}>Massa</span>
   </div>
   ```
   Referensimpl: `fysik1-newtons-andra-app.html` (`Vbl`/`Frac`-helpers).

Mönster (densitetssimuleringen är referens):

```
        Massa
ρ  =     m       =     5,0 kg       =   1 000 kg/m³
       ─────         ─────────
         V            0,005 m³
        Volym
```

I JSX: stackad layout, `borderTop: '2px solid currentColor'` mellan
täljare och nämnare. I canvas: rita en horisontell linje, inte `/`.

**Central formel ska ligga i formelkort i headern**, direkt under
ingressparagrafen — inte gömd i sidopanelen, och inte inbäddad i
ingresstextens löptext med snedstreck. Referensimpl:
`fysik2-energinivaer.html`, `fysik1-densitet-app.html` (etiketter över/under)
och `fysik1-newtons-andra-app.html` (etiketter + *F*_R för resulterande kraft).

### Vektorpilar: hastighet vs kraft

**Hastighetsvektorer startar vid objektets KANT, inte vid tyngdpunkten.**
En *v*-pil (eller komposant *v*ₓ/*v*ᵧ) ritas så att dess bakkant ligger på
objektets rand i pilens riktning. Aldrig inifrån objektet. Gäller både
inline-SVG-figurer (övningar) och canvas/SVG-renderade simuleringar.

**Kraftvektorer startar däremot i angreppspunkten:**
- **Tyngdkraft `F_G`** — i tyngdpunkten (CM).
- **Normalkraft `F_N`** — i **KONTAKTYTAN** (där kropparna möts), aldrig uppe
  på kroppen. En vikt på ett vågrätt bord → `F_N`-pilens *svans* sitter vid
  lådans **undersida** (kontaktytan mot bordet) och pilen pekar uppåt
  *genom* kroppen. Rita ALDRIG `F_N` med svansen i toppen eller mitten av
  kroppen. (Uttryckligt önskemål, påpekat 2026-06-22.)
- **Friktion `F_f`** — i kontaktytan, i kroppens bakkant (se nedan).

Kraftpilens *bas* får alltså ligga inuti/under kroppen — det är hela poängen
med en angreppspunkt. **Markera angreppspunkten med en prick
(`<circle r="2.6">`) ENDAST för tyngdkraften `F_G`** (för att tydliggöra
tyngdpunkten). Övriga krafter (`F_N`, `F_f`, `F_S`, applicerad `F` …) får
INGEN prick — bara pilen.

**Pilens skaft ska sluta vid pilhuvudets BAS, inte vid spetsen.** Ritas
pilen som `<line>` + `<polygon>`-huvud (i SVG-figurer) måste linjens
ändpunkt ligga vid huvudets bakkant, inte vid spetsen — annars sticker
linjens rundade ände ut förbi spetsen som en liten tagg. Ex: spets
`(x, t)`, huvudhöjd 9 px ⇒ `<line … y2="t+9">` och
`<polygon points="x-6,t+9 x,t x+6,t+9">`. Återkommande påpekat.

**Kraftpilens skaft ska ha `stroke-linecap="butt"`, ALDRIG `"round"`.** En
rund linjeände buktar ut en halv linjebredd **bakom** svansen (angrepps-
punkten), så pilen ser ut att starta bakom/under kontaktytan i stället för
exakt på den. Med `butt` slutar linjen precis vid angreppspunkten. (Gäller
även en ev. mörk casing-linje under pilen.) Dekorativa linjer (mark,
hatch) får däremot gärna ha runda ändar. Påpekat 2026-06-22.

**Friktion mot underlag: angreppspunkten ligger i kroppens BAKKANT** (den
kant som är "bak" sett i rörelse-/dragriktningen), inte i mitten. Puttas en
låda åt höger → `F_f` pekar åt vänster med *svansen på lådans vänsterkant*
(vid bottenhörnet) och pilen sticker ut åt vänster utanför lådan. Detta är
ett uttryckligt önskemål från användaren.

Hur du applicerar i kod:

- För ett objekt med radie *r* och pil i riktning **û**: starta vid
  `(cx + r·ûₓ, cy + r·ûᵧ)`, inte `(cx, cy)`. (För SVG y-axeln: byt tecken
  på *y*-komponenten.)
- För rektangulära objekt (bilar, vagnar): använd halv-bredden längs
  pilens riktning som offset.

Helpers som redan följer regeln: `makeBField`, `makeProjectile`,
`makeCircularPath`, `makeCrest`, `makeLoop` (i `data/ovningar.js`).
Skriver du en ny helper eller ny canvas-sim med v-pilar måste du själv
implementera kant-offseten. **Granska alltid skärmdump** och verifiera
att hastighetspilen kommer från kanten, inte mitten.

### Fältlinjer: pilspetsen MITT PÅ linjen, aldrig i dess ände

**En fältlinje avslutas ALDRIG med en pilspets — spetsen sitter mitt på
linjen och linjen löper obruten förbi den** (uttryckligt önskemål
2026-07-26). Gäller ALLA fält, i alla medier: elektriska och magnetiska
fältlinjer i simuleringar (SVG, canvas och THREE.js), i teori-figurer
(`::: figur`) och i övningsfigurer.

Skälet är att en fältlinje inte är en vektor: den har varken början, slut
eller längd som betyder något — den visar bara fältets *förlopp*. En pil i
änden gör att linjen läses som en enskild vektorpil som "pekar på" objektet,
i stället för som en linje genom hela fältet. Pilspetsen är en
riktningsmarkör längs linjen, precis som i läroböckerna.

- **Rak linje**: spetsen centreras på sträckans mittpunkt; skaftet ritas
  hela vägen till den gamla spetsens position.
- **Kurva/sluten slinga**: spetsen placeras på en punkt längs kurvan
  (t.ex. `t ≈ 0,3` och `0,7`, eller på slingans ytterpunkter) — flera
  spetsar per linje är helt i sin ordning på långa linjer.
- **Parallella fältlinjer**: alla spetsar ska ligga *vinkelrätt över
  varandra* (samma *x* för vågrätt fält, samma *y* för lodrätt) så scenen
  läses som ETT fält, inte som spridda pilar. `makeBField` i
  `data/ovningar.js` gör redan detta — kopiera mönstret.
- **Krockar**: hamnar mittpunkten på ett objekt (ledartvärsnitt ⊗/⊙,
  strömslinga, magnet) — flytta i första hand *objektet*, i andra hand
  spetskolumnen till en fri del av linjen. Lägg ALDRIG spetsen tillbaka i
  änden, och lägg aldrig en kontur/halo bakom den.

⚠️ **Detta gäller INTE vektorpilar**, som fortsatt har spetsen i änden
eftersom pilens *längd* bär informationen: kraft-, hastighets- och
accelerationspilar, fältstyrke-*vektorer* vars längd visar beloppet,
strömriktningspilar längs en ledare, kompassnålar/riktningspilar (norr,
deklination), måttpilar och högerhandsregelns fingrar. Fråga: visar pilen
en storhets belopp eller en linjes förlopp? Belopp → spets i änden.
Förlopp → spets mitt på.

### Magnetpoler: nordpolen röd, sydpolen VIT — aldrig blå

I svensk fysiklitteratur markeras **nordpolen röd och sydpolen vit**. Blått
är i våra figurer strömmens färg (*I*), så en blå sydpol läses som ström i
stället för som pol. Gäller polkroppar och polbeteckningar överallt: sims
(SVG, canvas, THREE.js), teori-figurer och övningsfigurer.

**Sydpolens `S` ritas vitt med en tunn svart kontur** (`#0f1620`), så att
den håller både mot den ljusa pappersbotten (`#f3eee4`) och mot en vit
polkropp. Nordpolens `N` är vitt på den röda polkroppen och behöver ingen
kontur.

Konturen ritas som `strokeText` **före** `fillText` (canvas) respektive
`paint-order: stroke` (SVG) — då täcker fyllningen konturens inre halva och
bara den yttre halvan syns, vilket ger en jämn tunn kant i stället för en
uppsvälld glyf. Riktvärde `lineWidth` ≈ 4,5–6 vid 64–100 px teckenstorlek.

⚠️ Detta är INTE ett brott mot no-white-outline-regeln nedan: där är felet
en *vit halo runt mörk text*. Här är vitt fyllnadsfärgen och konturen svart.
Referensimpl: `textSprite()` i `fysik2-magnetfalt-spole-app.html` och
`createCurvedLabel()` i `fysik2-jordmagnetiska-faltet.html`.

### Kraftfigurer: angreppspunkt, komposanter, kontakt och etiketter

Detta avsnitt samlar fel som **upprepade gånger** har behövt rättas i
kraftdiagram (låda, hand mot vägg, ballong mot tak, lutande plan). Granska
ALLTID en skärmdump mot dessa punkter innan en kraftfigur räknas som klar —
de ska inte behöva påpekas av användaren:

1. **Kraftpilen måste synligt utgå FRÅN den kropp den verkar på.** En
   normalkraft på en hand/ballong/låda ska ha sin svans i kontaktpunkten på
   *det objektet* och sitt skaft/sin spets tydligt **över objektet** — aldrig
   svävande bredvid eller liggande på den *andra* ytan (väggen/taket). Fälla:
   `F_N` ritad en bit nedanför handen eller uppe vid taket → ser ut att verka
   på fel kropp. Lägg pilen så att huvudet pekar in i/ligger på objektet.
2. **Tyngdkraften `F_G` ritas ALLTID från tyngdpunkten** (kroppens mitt),
   aldrig sidoförskjuten. Markera tyngdpunkten med en liten ifylld prick
   (`<circle r="2.6">`) vid pilens svans. OBS: i sned-/3D-projektion
   projiceras tyngdpunkten till frontytans mitt + halva djupvektorn — inte
   till frontytans mitt.
2b. **VRIDMOMENTSKONTROLL — Στ = 0 i varje jämviktsfigur (kontrollregel,
   infördes efter besökarpåpekande 2026-08-18).** En kropp som ritas i vila
   får inte ha krafter som ger ett nettovridmoment — då visar figuren en
   kropp som borde rotera. Räkna, gissa aldrig:
   - **Motriktade lika stora krafter (`F_N`/`F_G`, `F`/`F_N` mot vägg) ska
     ligga på SAMMA verkningslinje** — annars bildar de ett kraftpar.
     Förskjut inte `F_N` i sidled för att särskilja den från `F_G` — det
     gav ett synligt kraftpar och påpekades av en besökare. Läsbarheten
     löses i första hand genom att skaften ritas precis INTILL varandra på
     verkningslinjen (centrum ≈ en skaftbredd isär, ~4 px vid bredd 3,6)
     med pilspetsarna åt var sitt håll.
     **Sanktionerat undantag (användarbeslut 2026-08-18):** i 3D-/sned-
     projektion där tyngdpunkten ligger inne i kroppen (t.ex. bordsfiguren
     i `fy1-3.4.md`) får en liten sidledsförskjutning behållas när
     intill-varandra-ritningen blir för tät och svårläst — läsbarheten går
     då före. I platta 2D-figurer gäller samma verkningslinje utan undantag
     (referens: väggfiguren i `fy1-3.4.md`).
   - **Hävstångsgeometrier (bom, gungbräda, spett) ritas så att momenten
     kring vridpunkten/stödet faktiskt balanserar**: räkna F·l för varje
     kraft kring stödet och välj x-koordinaterna så att summorna blir lika
     (dubbelt så stor kraft → halva hävarmen, exakt). Referens: bom-figuren
     i `fy1-3.4.md` (armar 47/94 px för krafter 2:1).
   - Kontrollen gäller överallt: teori-figurer, övningsfigurer,
     simuleringsscener och pennlösningarnas skisser i `handskrift.js`.
3. **SKALENLIGA KRAFTVEKTORER — pilens längd ∝ kraftens belopp (viktig
   princip, upprepat påpekad).** Rita ALDRIG alla kraftpilar "lagom långa".
   Räkna ut beloppen, välj en skala (px per N) som rymmer alla pilar, och
   sätt varje pils längd = belopp · skala. Pilhuvudet hålls lika stort på
   alla pilar — det är skaftets/totallängden som bär informationen.
   - **Lika stora krafter ritas exakt lika långa** (jämvikt `F_N = F_G` på
     vågrätt underlag; `F_N = F` mot vägg; en komposant `F_⊥ = F_N`). Annars
     klagar användaren att "den ena ser kortare ut".
   - **Dubbelt så stor kraft → dubbelt så lång pil** (24 kg-vikt ger pil
     dubbelt så lång som 12 kg-vikt).
   - **Resulterande/summa-vektor ritas lika lång som komposanterna
     tillsammans** (bom: `F_N = F_Gbom + F_Gvikt` ⇒ `F_N`-pilen lika lång som
     `F_Gbom`- och `F_Gvikt`-pilarna staplade).
   - **Vid komposantuppdelning: rita ALLA relevanta komposanter.** På lutande
     plan ska *både* den vinkelräta (`F_G · cos α`) *och* den parallella
     (`F_G · sin α`) komposanten ritas — streckade, som en parallellogram där
     `F_G` är diagonalen (rita de två kompletterande sidorna som svaga
     streckade guider).
   Gör figuren stor nog (höj `LMAX`/standardvärdet) så pilarna inte trasslar
   ihop sig till en klump vid små krafter.
4. **Etiketter får ALDRIG ligga på en färgad/mönstrad bakgrund** (tegelvägg,
   ballong, planets fyllning) — de blir svårlästa. Flytta etiketten ut till
   den lugna pappersytan precis utanför objektet (`text-anchor="end"`/
   `"start"` så den hamnar bredvid, inte på, mönstret). Detta är samma
   princip som no-white-halo-regeln: **lösningen är att flytta etiketten,
   inte att lägga en kontur/halo bakom den.**
5. **Objekt som "trycker mot / ligger mot / mot" en yta måste faktiskt
   nudda ytan** — inget mellanrum. Fejka tillplattad kontakt med z-ordning:
   rita objektet först och ytan (taket/väggen) *ovanpå*, så objektets kant
   göms och ser intryckt ut.
6. **Igenkännbara verkliga objekt (hand, kropp, fordon) ritas med omsorg**
   värdig en modern, inspirerande sida — inte som grova klumpar. Bygg t.ex.
   en hand av handflata + separata fingrar + tumme + en subtil veck-linje,
   inte två rundade rektanglar. Vid minsta tvekan: använd `grafik`-agenten.
7. **Kraftvektorns etikett (beteckning + värde) STARTAR vid pilens SPETS
   och löper utåt i fri yta — aldrig ovanpå objektet pilen verkar på.**
   Lägg etiketten en bit bortom pilspetsen i pilens riktning (med
   `text-anchor="start"`/`"end"` så texten flödar *bort* från objektet, inte
   in över det) och lyft den till en lugn pappers-/himmelsyta. Detta är
   återkommande påpekat: en kort kraftpil (liten kraft) får en spets som
   hamnar nära kroppen → en `anchor="middle"`-etikett breder då ut sig över
   kroppen. Fäst alltid etiketten vid spetsen, inte vid mitten. Gäller alla
   kraftpilar (även korta friktions-/normalpilar). Referensimpl:
   `fysik1-lutande-plan-app.html` (friktionsetiketten).
8. **En kraftpil som ligger MOT/PÅ ett objekt med liknande färg får en tunn
   MÖRK kantlinje för separation — aldrig att den smälter in.** Vanlig fälla:
   orange friktionspil på en orangebrun låda → pilen försvinner. Lägg en
   smal bläckfärgad casing (`rgba(15,22,32,0.5–0.55)`, skaft `width+3.5`,
   huvud-stroke `~2`) under den färgade pilen — INTE en vit halo (det är
   förbjudet, se no-white-outline-regeln). Skala dessutom pilhuvudet efter
   skaftlängden för korta pilar (`head = max(12, min(20, Lf·0.95))`) så att
   en liten kraft inte blir ett rent pilhuvud utan synligt skaft. Mönstret
   finns som `edge`-flaggan på `Arrow` i `fysik1-lutande-plan-app.html`.

### Måttsättning av hävarm och avstånd (måttlinje i FRI yta)

**En markerad hävarm (eller annat måttsatt avstånd) ska ALLTID vara lättläst
och får ALDRIG ligga ovanpå ett annat objekt (mark, sten, kropp, kärra …)
som försvårar läsningen** (uttryckligt önskemål 2026-07-01). Rita den som en
riktig **måttlinje**, inte som en lös streckad linje på golvet:

1. **Måttlinje med dubbelpil** (pilhuvud i båda ändar) placerad i **fri
   yta bredvid/under figuren**, förskjuten ut från objekten. Aldrig ovanpå
   marken/stenen/kroppen.
2. **Projektionslinjer** (tunna streckade) från de två punkterna avståndet
   mäts mellan (t.ex. vridpunkten och kraftens riktningslinje) ut till
   måttlinjen. Kraftens **riktningslinje** ritas gärna som en streckad
   förlängning så måttet tydligt utgår från den.
3. **Etiketten** (`l`, `l_P`, `0,25 m` …) mitt på måttlinjen, i fri yta
   (ovanför/under/vid sidan), aldrig på ett objekt. Variabel kursiv, mätetal
   och enhet rakt.
4. **Hävarmen är kraftens vinkelräta avstånd till vridpunkten** — måttet ska
   ha den riktningen (t.ex. en lodrät kraft ⇒ hävarmen är det **vågräta**
   avståndet, `l = 1{,}0\cos 45^\circ`), inte parallellt med kraften.
5. Behöver figuren vändas för att en vinkel-/måttetikett ska hamna i fri yta
   (t.ex. spegla så stenen hamnar på motsatt sida om vinkelbågen) — gör det;
   följ genomgångens PDF-orientering när den redan är fri.

Referensimpl: `fy2-1.1.md` (skiftnyckel 0,25 m, spett `l`, gungbräda
`l_P`/`l_B`) — generator-helper `dimHead(pt,dir)` i scratchpad-generatorerna.

### Geometrifigurer: vinkelbågar, likhetsstreck och etiketter

Gäller alla geometriska figurer (matte-teorin, men även vinklar i
fysikfigurer). Dessa fel har ALLA förekommit och rättats i stor skala
(ma2c kap 4, 2026-07-07) — bygg rätt från början och kör
`node .claude/verify-vinkelbagar.js` före commit:

1. **Rita ALLTID från beräknade koordinater, aldrig på ögonmått.** Välj
   hörnens koordinater först, räkna sedan ut bågändpunkter, etikett-
   positioner och streck numeriskt (cos/sin). Alla fel nedan uppstod ur
   handplacerade punkter.
2. **Vinkelbågens medelpunkt är HÖRNET.** Ändpunkterna ligger PÅ de två
   vinkelbenen: `hörn + r·(cos θ, sin θ)` för respektive bens riktning θ.
   En båge som slutar mitt i luften, sticker ut förbi benet eller spänner
   halva vinkeln är fel — bågen ska spänna HELA vinkeln, ben till ben.
3. **Sweep-flaggan (sista flaggan i `A`-kommandot) avgör åt vilket håll
   bågen buktar — DET VANLIGASTE FELET.** Fel flagga speglar medelpunkten
   till andra sidan kordan så bågen buktar bort från hörnet (∩ i stället
   för ∪). Regel i SVG:s y-nedåt-system: går bågen från θ₁ till θ₂ med
   **minskande** vinkel → sweep `0`, **ökande** → sweep `1`. Vid
   tveksamhet: kör verifieraren, den räknar ut den faktiska medelpunkten.
4. **Mätetal/beteckning FRAMFÖR vinkelbågen**: på bisektrisen, strax
   utanför bågens radie (radie + ~6–14 px), inne i vinkelns "kil" — aldrig
   ovanpå bågen, vinkelbenen eller andra objekt. För mycket spetsiga
   vinklar (< ~20°): lägg kilen vågrätt om möjligt (texten är vågrät) och
   placera talet längre ut där kilen är bred nog; räkna att glyfboxen får
   marginal mot BÅDA benen.
5. **Likhetsstreck (tvärstreck) står VINKELRÄTT mot sidan**, centrerade på
   sidans mittpunkt, med ändpunkterna symmetriskt på var sin sida om
   sidan (± ~4 px längs sidans normal; flera streck förskjuts ~2,5 px
   längs sidan). Ett streck som lutar längs sidan är fel.
6. **Skalenlighet**: sträckor som påstås/markeras lika ritas LIKA LÅNGA;
   vinklar ritas nära sina angivna gradtal; likformiga figurer ritas
   likformiga (samma form, olika skala); längdförhållanden i uppgiften
   (t.ex. 9 mot 15) ska synas i figuren. Konstruera geometrin ur de givna
   måtten (sinussatsen/cosinussatsen vid behov) i stället för att rita en
   godtycklig triangel och sätta siffror på den.
7. **Etiketter aldrig på linjer/objekt** (gäller även koordinatpar som
   "(−4, 2)" och sidbeteckningar): flytta till fri yta bredvid/under
   punkten, offsetta vinkelrätt ut från sidan. Sidlängds-etiketter på en
   bas kan läggas UNDER basen (utanför figuren) i stället för inuti en
   trång figur.
8. **viewBox ska rymma alla glyfer** — rubriketiketter med versaler
   ("Randvinkel") kräver ~9–10 px ovanför baslinjen; kontrollera att
   inget klipps i över-/underkant (verify-figur-bounds.js fångar detta).
9. **Bevisfigurer ska vara geometriskt korrekta**, inte bara snygga: en
   bisektris ska faktiskt dela vinkeln mitt itu (och träffa motstående
   sida i rätt delningsförhållande), hjälpsträckor ska gå till de hörn
   beviset använder, medelpunktsvinkeln 2v ska vara just 2v (kan bli
   reflex > 180° — rita den då som reflexbåge med large-arc-flagga 1).

### Kopplingsscheman: jämn fördelning och centrering

**Komponenterna i ett kopplingsschema ska sitta JÄMNT FÖRDELADE på sin
ledare — aldrig hopklumpade i ena änden** (uttryckligt önskemål
2026-07-31). Balansen är det första ögat läser i ett schema: två lampor
tryckta åt vänster med tom ledning till höger, eller ett batteri som
sitter bredvid mitten, ser slarvigt ut även när kopplingen är elektriskt
rätt. Kör `node .claude/verify-kopplingsschema.js` före commit — den
mäter mellanrummen i teorifigurerna och i schemana som
`makeCircuit`/`makeBridge` genererar.

1. **Lika stora mellanrum — räkna, gissa aldrig.** På en ledarsträcka
   ska mellanrummet före första komponenten, mellan varje par och efter
   sista komponenten vara lika stort:
   `g = (sträckans längd − Σ komponentbredder) / (antal komponenter + 1)`.
   Komponentens mittpunkt blir då `sträckans början + g + bredd/2` osv.
   (Detta ger automatiskt en centrerad rad — centrering är alltså inte
   ett separat steg.)
2. **Sträckan går från nod till nod.** En nod är ett hörn, en
   förgrening eller en utmärkt/jordad punkt. Varje sträcka fördelas för
   sig: sitter en resistor mellan noderna A och B centreras den mellan
   A och B, inte mot hela ledarens mitt.
3. **Batteriet centreras på sin ledare** — även när det sitter ensamt på
   bottenledningen (mittpunkt = ledarens mittpunkt) och även när ledaren
   är lodrät. Samma sak för växelspänningskälla, amperemeter och andra
   symboler som sitter ensamma på en sträcka.
4. **Parallellkopplingens grenar ligger på LIKA avstånd** — och
   avståndet toppledning → första grenen och sista grenen →
   bottenledning ska vara lika stora som avståndet mellan grenarna.
   Vanligaste felet: bottenledningen klistras fast strax under understa
   grenen medan grenarna har rejält med luft mellan sig.
5. **Grenarnas komponenter centreras i sin gren.** En gren med EN lampa
   sätter lampan mitt på grenen, även om en annan gren har två
   komponenter — grenarna fördelas var för sig.
6. **Symmetriska ben.** Har schemat en seriekomponent på ena sidan om en
   parallellsektion ska ledningsbenen på var sida vara lika långa, så
   att parallellsektionen och batteriet hamnar på samma lodräta
   mittlinje.
7. `makeCircuit()`/`makeBridge()` i `data/ovningar.js` gör allt detta
   automatiskt via `spreadCenters()` — bygg övningsscheman med dem, och
   ändra inte fördelningslogiken till fasta slot-avstånd igen.

### Diagramkonventioner (svensk fysik/matte-standard)

1. **Axelfärg**: x-axel (y=0) och y-axel (x=0) ljusblå/cyan (`#38bdf8`).
2. **X-axel-etiketter** placeras direkt **under x-axeln (y=0)**, inte
   längst ned i diagrammet.
2b. **Pilspets BARA åt det positiva hållet — aldrig åt båda.** En tallinje
   och en koordinataxel har pilspets i **en enda** ände: tallinjen och
   x-axeln åt **höger**, y-axeln **uppåt**. Den negativa änden lämnas
   öppen, utan pilspets. Pilen talar om åt vilket håll talen växer; sätter
   man en pil i vardera änden säger den ingenting, och det är inte så
   läroböckerna ritar (uttryckligt önskemål 2026-08-11). Gäller överallt:
   teori-figurer (`::: figur`), övningsfigurer, `data/visualiseringar/*.js`,
   simuleringar (SVG och canvas) och pennlösningarnas tallinjer i
   `handskrift.js`.
   **Detta gäller AXELN — inte allt som råkar ligga på den.** Pilar som
   bär egen information behåller sin riktning: en **lösningsmängds stråle**
   ($x < -3$) pekar åt vänster, en **riktningsmarkör** ("negativa tal" ←)
   pekar åt vänster, och en **måttlinje** har spets i båda ändar (se
   "Måttsättning av hävarm och avstånd"). Fråga: är pilen axelns egen? Då
   en pil, åt det positiva hållet.
3. **Symmetrisk skala** om negativa värden visas (-12 till +12, inte
   -12 till +2).
4. **Axeletiketter måste få plats INOM viewBox/ramen.** Vanlig fälla:
   en x-label "t (s)" eller "a (m/s²)" placeras inline efter pilspetsen
   med `text-anchor="start"` på en *x*-position så nära viewBox-höger
   att texten sticker ut till höger. Eller en y-label med en stor
   bokstav (Φ, Σ, β) placeras med en *y*-position så nära viewBox-topp
   att glyfens topp sticker över. **Använd `text-anchor="end"`** med
   *x* nära men inom högerkant (`x = W - 6`), och placera y-label
   **tillräckligt nedanför** topp-kanten (`y = padT - 8`, inte
   `padT - 18`) så att stora glyfer ryms.

```javascript
const xAxisLabelY = (minY < 0 && maxY > 0)
    ? height - padding.bottom - ((0 - minY) / range) * graphHeight + 16
    : height - padding.bottom + 16;
```

### Skärmdumpsverifiering av figurer

Innan du markerar en figur (diagram, scen, SVG-helper-output) som klar:
**generera en PNG-skärmdump via headless Chrome och inspektera den
visuellt.** SVG-källan kan se rätt ut samtidigt som rendering visar att
texter sticker utanför ramen, ligger på linjer, eller överlappar
varandra.

```powershell
# Skapa förhandsvisning (.html i .shots/)
# Skjut sedan en skärmdump:
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --hide-scrollbars `
  --window-size=900,1200 `
  --screenshot="C:\claude\Fysiklabbet\.shots\name.png" `
  "http://localhost:8000/.shots/name.html"
```

Vid varje skärmdumpsgranskning, kontrollera **systematiskt**:

1. **Inga texter sticker ut över ramen** (varken viewBox-kant eller en
   `<rect>`/`<svg border>`). Gäller särskilt:
   - X-axelns label vid högerkant.
   - Y-axelns label vid övre kant (Φ, β, Σ är extra höga glyfer).
   - Tick-labels längst ute (t.ex. "10" på y=10 längst upp).
2. **Inga texter på linjer eller andra figurdelar** (regeln finns
   utförligt i `OVNINGAR.md`). Speciellt: wire-/laddningsetiketter i
   scener med parallella fältlinjer måste hamna *mellan* linjer.
3. **Inga texter överlappar varandra.**
4. **Vektorpilar från objektkant, inte från CM** (för hastighet) — se
   regel ovan.
5. **Fältlinjepilar i samma kolumn/rad** (vinkelrätt mot fältriktningen)
   och **homogen täthet** mellan parallella fältlinjer.
6. **Formelkort linjerat på en mittlinje** — alla led, operatorer (`=`,
   `·`, `⟺`, `⟹`) och bråk ligger på samma nivå; inget högerled hamnar
   högre/lägre än vänsterledet, och varje variabel har sin ord-etikett
   över/under (se Formelpresentation punkt 2 och 7).
7. **Ingen vit kontur/halo runt etiketter eller pilar på ljus
   scenbakgrund** — kontrollera att texter och pilar inte har en suddig vit
   gloria runt sig (se "⛔ FÖRBJUDET: vit kontur/halo..." ovan). Kör även
   `node .claude/verify-no-white-outline.js`.
8. **Στ = 0 i jämviktsfigurer** — motriktade lika stora krafter på samma
   verkningslinje, hävarmar som balanserar momenten numeriskt (se
   "Vridmomentskontroll" punkt 2b under Kraftfigurer).

Markera först som klart när skärmdumpen passerar alla åtta kontroller.

## Fysikämnen

### Fysik 1
- Rörelse: hastighet-tid, sträcka-tid, rörelsediagram
- Kraft: Newtons lagar, tyngdfaktor
- Tryck: atmosfärstryck, Magdeburgska halvklot
- Arkimedes princip, densitet
- Ellära, värme, influens

### Fysik 2
- Rörelse i gravitationsfält
- Magnetfält, magnetisk kraft på ledare
- Vågor: brytning, stående våg
- Pendlar: matematisk, konisk
- Jordmagnetiska fältet

## Sökruta och nyckelord

Sökrutan i sidhuvudet (`index.html`, `katalog.html`, `simuleringar.html`)
filtrerar i realtid. Alla tre sidorna använder **samma sökindex**,
`data/sok.js`, som byggs av `data/katalog.js` + `data/simuleringar.js`.
Ändra aldrig sökningen i bara en av sidorna — logiken bor i `sok.js`.

Varje avsnitt expanderas till flera träffrader:

- en **TEORI**-rad (alltid) → `katalog.html#<kurskod>-<num>`,
- en **SIMULERING**-rad **per simulering** avsnittet har,
- **REPETITION** för kapitelsammanfattningarnas länk till
  `fysik-repetition.html`.

### ⚠️ Varje enskild simulering ska gå att söka fram

Har ett avsnitt **två simuleringar** (`href` + `href2` i `data/katalog.js`,
se två-sim-mönstret) måste **båda** komma upp i sökrutan under sina **egna
namn** — inte som en enda rad med avsnittets titel. Namn, beskrivning och
länk hämtas ur `data/simuleringar.js` (`SIM_NAMES`), så:

1. Lägg in en post i `SIM_NAMES` för avsnittets `href`, som en array med en
   post per simulering: `{ name, desc, href, kw }` (`href` utelämnas för
   avsnittets egen fil; ange den för den andra simuleringen).
2. **`kw:` är obligatoriskt när avsnittet har flera simuleringar.** Ett
   avsnitt med EN simulering ärver avsnittets `keywords` från
   `data/katalog.js`; med FLERA ärvs de inte (annars skulle "bandgenerator"
   också träffa "Elektrisk influens"). Ge då varje simulering egna nyckelord
   — huvudområde, specifika begrepp och synonymer.
3. Testa i sökrutan att **varje** simulering kommer upp på sitt eget namn
   och på minst ett eget nyckelord.

(Saknas `SIM_NAMES`-posten helt lägger `sok.js` ändå in `href2` som en rad
med avsnittets titel — ett skyddsnät, inte ett godkänt slutläge.)

Nyckelord (`keywords` i `data/katalog.js`, `kw` i `data/simuleringar.js`):
- **Huvudområde** (ett av: `rörelse`, `krafter`, `densitet`, `tryck`,
  `värme`, `ellära`, `kärnfysik`, `vågor`, `optik`, `elektromagnetism`,
  `magnetism`, `modern fysik`, `kvantfysik`, `atomfysik`, `astronomi`,
  `mekanik`, `termodynamik`).
- **Specifika begrepp** (t.ex. `coulomb`, `halveringstid`, `interferens`).
- **Synonymer/vardagsuttryck** (både `elektricitet` och `ellära`).
- Gemener och svenska tecken — sökningen normaliserar å/ä/ö automatiskt.

```javascript
// data/katalog.js — avsnittet (två simuleringar: href + href2)
{ num: '7.1', title: 'Laddning och influens', description: '…',
  href: 'fysik1-influens.html', href2: 'fysik1-bandgenerator-app.html',
  icon: '🧲', keywords: ['ellära','laddning','influens','bandgenerator', …] }

// data/simuleringar.js — en post per simulering, med egna nyckelord
'fysik1-influens.html': [
  { name: 'Elektrisk influens', desc: '…',
    kw: ['ellära','influens','elektrostatik','laddad stav', …] },
  { name: 'Bandgeneratorn', href: 'fysik1-bandgenerator-app.html', desc: '…',
    kw: ['ellära','bandgenerator','van de graaff','gnista','urladdning', …] },
],
```

## ⚠️ Två simuleringar på samma avsnitt (`href2`) — måste gå att nå

**Katalogen länkar BARA till avsnittets `href`.** Lägger du en andra
simulering som `href2` i `data/katalog.js` är den osynlig för alla som
klickar "Simulering" i katalogen — om inte avsnittsraden överst på
simuleringssidorna länkar dit. Felet har hänt (2026-08-23): flugan i
bägaren lades som href2 på fy1-3.3, och besökaren som kom in via
astronautsimuleringen såg aldrig att den fanns.

**Växlingen sköts av `section-nav.js`** — samma rad som visar
Teori / Simulering / Övningar. Har avsnittet två simuleringar ritar den
en egen ruta för var och en, med namnen ur `data/simuleringar.js`
(SIM_NAMES-filen hämtas automatiskt om sidan inte redan laddat den).
Det sker **av sig självt** så snart `href2` finns i katalogen — du
behöver inte skriva någon växlare för hand.

Kraven, som `node .claude/verify-sim-vaxlare.js` kontrollerar:

1. **Båda HTML-filerna måste ladda `data/katalog.js` OCH `section-nav.js`**
   (sist i `<body>`, se checklistan för nya simuleringar). Utan dem ritas
   ingen avsnittsrad och simuleringen blir oåtkomlig.
2. **Varje simulering ska ha eget `name` och egna `kw`** i
   `data/simuleringar.js` — annars får rutan en anonym etikett
   ("Simulering 2") och sökrutan hittar den inte på sina egna begrepp.
3. **Lägg INTE till egna flikar i sidhuvudet för att växla mellan
   simuleringarna på nya sidor.** Avsnittsraden gör det redan, och två
   växlare på samma sida är dubbelt UI. (Några äldre simuleringar har
   kvar sådana flikar sedan tidigare — de är ett komplement, inte
   mönstret att kopiera.)

## Adresser till teoriavsnitt, prov och repetitionspaket

Tre sidor visar allt sitt innehåll i EN HTML-fil och väljer vad som ska
visas utifrån adressen:

| Sida | Hash (som förr) | `?id=` (sitemap/sökmotorer) |
|---|---|---|
| `katalog.html` | `#fy1-3.2`, `#fy1-3.2:ovningar` | `?id=fy1-3.2` |
| `np.html` | `#fy2-vt2016`, `#fy2-vt2016:7` | `?id=fy2-vt2016` |
| `fysik-repetition.html` | `#fy1-3` | `?id=fy1-3` |

**Varför båda formerna finns:** allt efter `#` är osynligt för sökmotorer.
`katalog.html#fy1-3.2` och `katalog.html#ma4-5.1` räknas som *samma* sida av
Google, så alla 333 genomgångar var i praktiken omöjliga att hitta via
sökning. `?id=` ger varje avsnitt en egen riktig adress.

**Regler:**

- **`?id=` läses BARA när hashen är tom.** Hashen vinner alltid, så
  befintliga länkar, bokmärken och sökrutans träffar beter sig oförändrat.
  Rör inte den ordningen.
- **Sidorna skriver aldrig om adressfältet** — varken hash eller query.
  Navigering sker i React-state. Inför ingen `replaceState`-normalisering
  utan att tänka igenom hur den samverkar med `hashchange`.
- **I `fysik-repetition.html` gäller `?id=` bara första inläsningen.**
  `read()` körs även vid `hashchange`; faller den tillbaka på `?id=` när
  användaren går tillbaka till listan dras hen in i paketet igen.
- **Katalogens egen navigation länkar med `?id=`** (kapitelflikarna och
  avsnittsraderna i `katalog.html`, samt Ämne-menyns kurslänkar). Det var
  tidigare `<button>`-element utan adress, och det visade sig vara orsaken
  till att sajten inte indexerades: Google kände till avsnittens adresser
  enbart genom `sitemap.xml`, och en adress utan en enda inlänk hamnar
  sist i genomsökningskön. I Search Console låg 393 av 408 icke-indexerade
  sidor som **"Upptäckt – inte indexerad"** (2026-08-08) — alltså aldrig
  ens hämtade — medan bara 3 var dubbletter. Ta ALDRIG bort `href` från
  de listorna igen; en robot kan inte klicka på en knapp.
  - Elementen fångar vanligt vänsterklick (`preventDefault` + `setState`)
    så vyn byts utan omladdning precis som förr. Modifierarklick släpps
    igenom, så "öppna i ny flik" fungerar.
  - **De måste stylas som knapparna de ersatte.** Reglerna ligger överst i
    `styles-laborans.css`: `a.lab-tab-3`/`a.lab-section-item` får
    `font: inherit` med **exakt** samma vikt som `body.laborans button`
    (en klass + ett element), och undantas från `body.laborans a { color:
    inherit }`. Skrivs font-regeln tyngre (t.ex. `body.laborans
    .lab-tab-3`) nollställs `font-weight: 600` på den aktiva fliken, hela
    flikraden byter radbrytning och sidan hoppar 40 px. Läs kommentaren
    där innan du rör reglerna.
- **`data/sok.js` bygger fortfarande `katalog.html#…`** för sökrutans
  träffar. Det är oförändrat och behöver inte ändras — sökrutan är JS-only
  och ger ändå inga länkar en robot kan följa.
- **Adresserna räknas upp i `data/build-nyheter-og.js`** av `loadAvsnitt()`
  (ur `KATALOG_FLAT`), `loadProv()` (ur `data/np/index.js`) och
  `loadRepetition()` (filnamnen i `data/repetition/`). Kursnamn → kurskod
  sker via `KURSKOD`, som **måste matcha `course`-fältet i `data/katalog.js`
  exakt** — byter någon ett kursnamn försvinner hela kursens avsnitt ur
  sitemapen. `.claude/verify-sitemap.js` larmar om det, och kontrollerar
  dessutom att varje genererad adress matchar katalogens routing-regexp
  (annars skulle den tyst visa standardsidan, och Google indexera hundratals
  identiska sidor). **Hålls regexpen i takt med `parseInitialState()`.**

## ⚠️ Nytt ämne eller ny nivå? Uppdatera välkomstmejlet också

**Välkomstmejlet räknar upp katalogens ämnen och nivåer i klartext.** Lägger
du till ett ämne, en nivå eller byter namn på något i `data/katalog.js`
(`course`-fältet och Ämne-menyn i `katalog.html`) blir mejlet fel tills det
uppdateras — och till skillnad från sajten *märks* det inte, eftersom mejlet
går ut automatiskt till varje ny prenumerant utan att någon läser det först.

- Källan är `.claude/nyhetsbrev/valkomstmejl.html`, stycket som börjar
  "Den rymmer tre ämnen på olika nivåer". Varje nivå är en egen länk till
  `katalog.html?id=<kurskod>` (`fy1`, `fy2`, `ma1c`, `ma2c`, `ma3c`, `ma4`).
  Länka ALDRIG bara `katalog.html` — utan `?id=` landar man på Fysik nivå 1,
  vilket får katalogen att se ut som om den bara rymmer fysik.
- Nämns antalet avsnitt någonstans (i dag "matematiken är katalogens största
  del") måste påståendet stämma. Räkna om:
  `ls data/teori/ma*.md | wc -l` mot `ls data/teori/fy*.md | wc -l`.
- **Filen är inte kopplad till sajten** — den är ett utkast som måste
  klistras in för hand i EmailOctopus: Automations → Välkomstmejl → steget
  Send email → Content (mallen "Code your own"), markera allt och ersätt.
  Redigerar du bara filen händer ingenting med det som faktiskt skickas.
- **⚠️ Pausa automationen först.** Är den aktiv öppnas e-poststeget
  skrivskyddat ("To make changes, pause your automation first") och alla
  fält är gråa. Pausa via statusknappen uppe till höger, gör ändringen,
  starta igen. Räkna med det: mejlet går ut automatiskt, så en paus är ett
  litet fönster där en ny prenumerant kan hamna fel. Gör därför alla
  ändringar i ETT svep, och verifiera i förhandsvisningen innan du sparar —
  inklistringen har misslyckats tyst en gång och lämnade rutan tom, vilket
  hade skickat ett blankt brev om det inte upptäckts.
- **Kodkommentarer behöver inte synkas.** Filen är källan; att den
  EmailOctopus-lagrade kopian saknar en kommentarsrad är ofarligt och inte
  värt en paus. Innehåll och struktur MÅSTE däremot stämma överens.
- Ändra inget i sidfoten: `{{UnsubscribeURL}}`, `{{SenderInfo}}` och
  `{{RewardsURL}}` krävs av EmailOctopus, och rutnätsbrickan måste förbli
  genomskinlig (skälet står i filens egen kommentar).
- Inga tankstreck, se `.claude/agents/nyhetsbrev.md`.

## ⚠️ Schemalagda routines MÅSTE skapas via claude.ai — annars saknar de repot

**En routine (schemalagd trigger) som ska arbeta i Fysiklabbet-repot måste
skapas från claude.ai → Routines, där repot väljs som källa.** Skapas den i
stället inifrån en session, med MCP-verktyget `create_trigger`, får den
**inget `sources`-fält** — och varje körning startar då en tom molnsession
utan repo. Agentfilerna under `.claude/agents/`, `data/nyheter.js` och
git-loggen finns helt enkelt inte där, så jobbet kan inte utföras.

Det värsta är att det inte ser trasigt ut: routinen står som `enabled`,
`last_fired_at` uppdateras, och den fyller på `next_run_at` som vanligt.
Bara utebliven produkt avslöjar felet. Det hände nyhetsbrevsroutinen
("Nyhetsbrevsutkast — lördag morgon"), som brann varje lördag utan att
någonsin kunna skriva ett brev, upptäckt 2026-08-15.

- **Kontrollera en misstänkt routine** med `list_triggers` och titta efter
  `job_config.ccr.session_context.sources`. Saknas fältet är routinen
  blind — jämför med "Fysiklabbet — veckoavstämning säkerhetspunkter",
  som har `sources: Goliatbagge/Fysiklabbet` och därför fungerar.
  Fältet `created_via` skvallrar också: `http_api` = skapad via claude.ai
  (har källor), `meta_mcp` = skapad från en session (har inga).
- **`update_trigger` kan INTE laga det** — den ändrar bara namn, cron,
  prompt, modell och på/av. Källorna går inte att lägga till i efterhand,
  så en trasig routine måste skapas om från claude.ai och den gamla
  raderas.
- **Trigger-startade sessioner syns inte i sessionslistan.** Misslyckas en
  körning finns det ingen session att leta upp i efterhand; felsök därför
  mot routinens konfiguration, inte mot körningen.
- Routines skapade från en session ärver dessutom **inga connectors**
  (Gmail m.fl.) — samma sak där: skapa dem via claude.ai.

## Formler i nyhetsartiklar: KaTeX, precis som i teorin

**En formel i en nyhetsartikel sätts med KaTeX — `$…$` i `body`-strängarna i
`data/nyheter.js`** (uttryckligt önskemål 2026-08-05). Samma matematiksättning
som teoriavsnitten: **rakt bråkstreck** i stället för snedstreck, och
**rotmärke som spänner över hela uttrycket**. `nyheter.html` laddar KaTeX och
renderar artikelkroppen i `ArticleView`.

- ✓ `$v = \\sqrt{\\dfrac{G \\cdot M}{r}}$`, `$\\rho = \\dfrac{m}{V}$`,
  `$P = \\dfrac{\\Delta E}{\\Delta t}$`
- ✗ `<em>v</em>&nbsp;=&nbsp;√(<em>G</em>·<em>M</em>/<em>r</em>)`

Regler:

- **`data/nyheter.js` är JS → dubbla alla backslash** (`\\dfrac`, `\\cdot`,
  `\\mathrm`, `\\approx`). Samma fälla som `data/ovningar.js`.
- **Decimalkomma skrivs `{,}`** inuti math (`$z = 7{,}77$`) — annars blir
  kommat en listavgränsare med luft efter.
- **En ensam storhet i löptext är också ett math-block**: `talet $z$`,
  `bokstaven $\\eta$ (eta)`, `arbetet $W$`. `<em>` reserveras för kursiverad
  löptext (tidskriftsnamn, betoning), inte för variabler.
- **Variabel + värde + enhet i ETT block**:
  `$c \\approx 2{,}998 \\cdot 10^{8}\\ \\mathrm{m/s}$` — aldrig uppdelat, då
  kan raden brytas vid likhetstecknet.
- **Undantag som behåller HTML:** rena tiopotenser och enheter utan variabel
  (`10<sup>−17</sup>&nbsp;Pa·s`, `m<sup>−2</sup>`) samt kemiska formler
  (`Al<sub>0,28</sub>Ga<sub>0,72</sub>As`). Att sätta varje siffra i KaTeX
  skulle göra brödtexten spräcklig.
- **`title`, `deck` och `research.citation` får ALDRIG innehålla math** — de
  går ut som ren text i `og:description`, RSS-flödet och delningssidorna, där
  `$…$` syns bokstavligt.

Ordningen i `ArticleView`s effekt är **formler → begreppslänkning → bionisk
läsning**: KaTeX måste se råtexten först, och både `begrepp-lank.js` och
`applyBionic` hoppar över `.katex` (spann inuti en formel slår sönder
sättningen). **Rör inte den ordningen eller katex-undantagen.**

## Ordval i nyhetsartiklar: ge inte döda ting ett uppsåt

**Verbet ”förråda” får aldrig användas i artiklarna** (uttryckligt önskemål
2026-08-18). Ett brus, en gas eller ett mätinstrument har ingen vilja och
inget att dölja — ”bruset förråder hur stor laddningen är” och ”gasen
förrådde protonerna” läser som angiveri i stället för som fysik. (Ordet är
inte en anglicism; *förråda* i betydelsen röja är gammal svenska. Men det
bär alltid en avsikt, och därför personifierar det.)

Skriv i stället **avslöjar, visar, röjer, pekar ut, vittnar om** — eller
formulera om så att egenskapen hamnar hos den som mäter.

Samma fälla i annan form: **egenskaper som bara en människa kan ha ska inte
läggas på utrustningen.** ”Tålamodskrävande apparatur” säger att apparaten
har tålamod; rätt är ”känsliga instrument och gott om tålamod”. Gå igenom
den färdiga artikeln och fråga vid varje verb med ett dött ting som subjekt:
kräver det här ett uppsåt? Då ska verbet bytas.

Substantivet **förråd** (bränsleförråd, ordförråd, värmeförråd) berörs
förstås inte — regeln gäller verbet.

## Begreppsordlista

Nyhetsartiklarna innehåller ofta facktermer som ligger över gymnasienivå
(altermagnetism, kvasar, skyrmion). Sådana ord är **klickbara i artikeltexten**
och leder till ett uppslag i begreppsordlistan, där begreppet förklaras
enklare, utförligare och mer pedagogiskt än artikeln hinner göra. Hela listan
finns på `begrepp.html` i bokstavsordning (nav-länken "Ordlista").

**Ordlistan byggs på efterhand — den är aldrig "klar".** Varje ny nyhet är ett
tillfälle att fylla på den.

### Delarna

| Fil | Roll |
|---|---|
| `data/begrepp.js` | Datamängden (`window.BEGREPP`). Fältformatet dokumenteras i filens huvud. **Detta är filen du redigerar.** |
| `data/begrepp-sok.js` | **Genererad** — lätt index (id, term, kort, former, utan brödtext). Byggs av `data/build-nyheter-og.js`. |
| `begrepp-lank.js` | Autolänkaren + förhandsvisningen (popover). Delad, kan användas på fler sidor. |
| `begrepp.html` | Hela ordlistan (A–Ö, filter) + uppslagssidan `?ord=<id>`. |
| `.claude/verify-begrepp.js` | Validator — kör före commit. |

**Vilken fil laddar vad:** sidor som bara *länkar och förhandsvisar* begrepp
(`index.html`, `katalog.html`, `simuleringar.html`, `nyheter.html`) laddar det
lätta `data/begrepp-sok.js` — 20 kB i stället för 113 kB, eftersom de aldrig
renderar uppslagens brödtext. **Bara `begrepp.html` laddar hela
`data/begrepp.js`.** Båda sätter `window.BEGREPP`; det lätta indexet sätter
dessutom `window.BEGREPP_LATT = true`. Lägger du till något som renderar
`body` på en annan sida måste den byta till hela filen. **Kör
`node data/build-nyheter-og.js` efter varje ändring i `data/begrepp.js`** —
annars ser sidorna den gamla ordlistan (samma fälla som teori-bundeln).

Länkningen är **helt automatisk**: `begrepp-lank.js` går igenom artikelns
DOM och länkar **första** förekomsten av varje känt ord. Skriv därför
**aldrig** manuella `<a href="begrepp.html#…">` i artikeltexterna — lägg bara
till posten i `data/begrepp.js`, så blir ordet klickbart i *alla* artiklar,
även gamla. Sökrutan (`data/sok.js`) och `sitemap.xml` plockar upp nya
begrepp automatiskt.

### Lägga till ett begrepp

```javascript
{
  id: 'kvasar',                       // a–z, 0–9, bindestreck (å/ä/ö → a/a/o)
  term: 'Kvasar',                     // uppslagsordet, bara första bokstaven versal
  former: ['kvasar', 'kvasaren',      // ALLA böjningsformer, gemener
           'kvasarer', 'kvasarerna'], // (genitiv-s fångas automatiskt)
  kort: 'Kärnan i en avlägsen galax som lyser starkare än …',  // 1–2 meningar
  relaterade: ['mork-energi'],        // valfritt, id:n
  body: [ { type: 'p', html: '…' }, { type: 'h2', text: '…' },
          { type: 'fact', title: '…', items: ['…'] } ],
}
```

Regler:

- **Uppslagsordet måste finnas bland `former`** — annars länkas det aldrig
  i texten (validatorn fångar detta).
- **En böjningsform får bara tillhöra ETT begrepp.** Två poster som båda
  listar "gitter" gör länkningen tvetydig — validatorn ger fel.
- **Matchningen sker på hela ord.** Sammansättningar länkas bara om de står
  i `former` ("kristallgittret"), så lägg in de sammansättningar som är
  värda att länka. Korta former (< 4 tecken) ger varning — de riskerar att
  träffa fel ord. Validatorn listar under rubriken **"sammansättningar som
  inte är klickbara"** de ord i artiklarna som SLUTAR på en känd form utan
  att själva stå i `former` (t.ex. "diffraktionsgitter", "laserspektroskopi").
  Gå igenom listan och lägg till dem som betyder samma sak — men bara dem:
  "ytplasmon" är inte plasma, och "cirkulationskvantum" är inte kvantmekanik.
- **Håll isär rentext-fälten och HTML-fälten** (vanligaste felet):
  `term`, `kort`, h2-blockens `text` och faktarutans `title` renderas som
  **ren text** — HTML i dem syns bokstavligt på skärmen
  (`9,46&nbsp;·&nbsp;10<sup>12</sup>&nbsp;km`). Använd literalt hårt
  mellanslag (U+00A0) och skriv om exponenter i ord ("knappt tio biljoner
  kilometer"). Bara p-blockens `html` och faktarutans `items` är **HTML** —
  där hör `<em>`, `<sup>` och `&nbsp;` hemma.
- **Ingen KaTeX finns på `begrepp.html`.** Ett math-block (`$z = 1$`) visas
  bokstavligt med dollartecken och allt, även i p-blocken. Skriv
  `<em>z</em>&nbsp;=&nbsp;1`. Validatorn ger fel på både math-block och
  markup i rentext-fälten, och varnar för vanligt mellanslag mellan tal
  och enhet.
- **Förklaringen ska stå på egna ben** — hänvisa inte till kurserna eller
  till en enskild nyhetsartikel (uppslagssidan listar själv vilka nyheter
  som nämner ordet). Samma standalone-regel som för nyhetsartiklar.
- **Skriv för en 16-åring utan förkunskaper**: börja i det konkreta, använd
  vardagsjämförelser, och var utförligare än artikeln — ~3 stycken är lagom
  (validatorn varnar under ~90 ord).
- Vanlig HTML-kontext: `10<sup>−9</sup>` (äkta minus), `&nbsp;` mellan tal
  och enhet, kommatecken som decimalavskiljare, svenska citattecken ”…”.

### Var ordlistan används

`begrepp-lank.js` hoppar över rubriker, citat, bildtexter och redan länkad
text. Ett element med klassen `no-begrepp` lämnas också orört. På sidor som
har bionisk läsning **måste länkningen köras före `applyBionic`** — den
styckar orden i `<span>`-taggar och då hittas de inte längre (se
`ArticleView` i `nyheter.html`).

## Checklista: Ny simulering

1. [ ] Kopiera navigation från mall
2. [ ] Lägg till `<link rel="stylesheet" href="styles.css">`
3. [ ] Använd korrekt breadcrumb
4. [ ] Uppdatera `verify-navigation.js` med filnamnet
5. [ ] Kör `node .claude/verify-navigation.js`
6. [ ] Lägg till kort i `fysik1.html` eller `fysik2.html`
7. [ ] Länka simuleringen i rätt avsnitt i `data/katalog.js` (`href`, eller
    `href2` om avsnittet redan har en sim) med `keywords`
8. [ ] Namnge simuleringen i `data/simuleringar.js` — och vid **två sims på
    samma avsnitt**: en post per sim med eget `name`, `desc`, `href` och
    `kw` (se "Sökruta och nyckelord"). Kör då även
    `node .claude/verify-sim-vaxlare.js` så att BÅDA simuleringarna går
    att nå från avsnittsraden (se "Två simuleringar på samma avsnitt")
9. [ ] Lägg till rad i "Senaste uppdateringar" i `index.html` (max 4–5 poster)
10. [ ] Testa i webbläsare (normalt OCH fullskärm, bred OCH smal skärm)
11. [ ] Verifiera decimalformatering (komma, inte punkt)
12. [ ] Testa att sökningen hittar **varje enskild** simulering — på sitt
    eget namn och på minst ett eget nyckelord
13. [ ] Kör `node .claude/verify-no-white-outline.js` — inga vita konturer/
    halor runt etiketter eller pilar på ljus scenbakgrund
14. [ ] Lägg in `<script src="sim-dock.js" defer></script>` före `</body>`
15. [ ] Kör `node .claude/verify-mobil-scen.js` — scenen överst och verktygen
    under på 390×744, i både normalläge och fullskärm
16. [ ] **Sidspecifika meta-taggar i `<head>`** — kopiera mönstret från
    `fysik1-densitet-app.html`: `<meta name="description">`,
    `<link rel="canonical">`, `og:title`, `og:description`, `og:url`,
    `twitter:title`, `twitter:description`. Utan dem visar en delad
    simulering samma generiska Fysiklabbet-kort som alla andra, och Googles
    sökresultat får ingen beskrivningstext. `og:title` skrivs
    `"<Simuleringens namn> — <Kurs>"`, `<title>` som
    `"<Namn> — Fysiklabbet"` (em-streck). Kör
    `node .claude/verify-sitemap.js` — den larmar om taggarna saknas.

## Övningar

Se [`OVNINGAR.md`](OVNINGAR.md) för komplett guide:
- Nivåer N1/N2/N3 och kalibrering mot Impuls Fysik 1 / kursprov
- Antal per avsnitt (3 + 2 + 1) och formel-täckning
- Diagram-helper `makeDiagram` och kraftvektor-helper `makeForceDiagram`
- **Figurer ska ritas, inte beskrivas** — uppgifter med rumslig/geometrisk
  uppställning (kast, hävstång, cirkelrörelse, lutning, pendel, loop) ska ha
  en illustrerande figur. Mekanik-helpers: `makeProjectile`,
  `makeConicalPendulum`, `makeLever`, `makeTippingBox`, `makeTorqueArm`,
  `makeCircularPath`, `makeCrest`, `makeBankedCurve`, `makeLoop`, `makeSwing`,
  `makeLadder`, `makeClock`. Avslöja aldrig svaret i figuren. Etiketter
  (värden/beteckningar) får aldrig ligga på linjer/figurdelar — offsetta
  vinkelrätt ut. Granska alltid renderingen (skärmbild) före klart.
- Flervalsformat (`choices` + `correct`)
- Lösningsmall (formel → bracket → beräkning → svar)

## CDN-länkar (standard)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.7/babel.min.js"></script>
```

⚠️ **Babel-versionen MÅSTE vara pinnad (`@7.29.7`) — av-pinna ALDRIG.**
En opinnad länk (`@babel/standalone/babel.min.js`) hämtar senaste, och
Babel 8 bytte React-presetens standard till "automatic runtime" som
injicerar `import { jsx } from "react/jsx-runtime"` överst i den
kompilerade koden. Eftersom våra appar körs som klassiskt
`<script type="text/babel">` (inte module) kraschar varje sida då med
`Uncaught SyntaxError: ... Cannot use import statement outside a module`
och renderar blankt. Projektet använder UMD-globaler (React/ReactDOM via
`<script>`), inte ES-moduler, så vi behöver den klassiska runtimen som
Babel 7 har som standard. Lägg ALDRIG till nya HTML-filer med den opinnade
länken.

För 3D: `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>`
