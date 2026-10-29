---
name: rostmanus
description: Skriver talmanus för lösningsfilmernas och förklaringsfilmernas (Labbfolket) berättarröst i ElevenLabs utifrån en lösning i text, pennscen, undertexter eller ett utkast till manus. Använd när en film ska få röst, när ett manus ska skrivas om, eller när ett matematiskt uttryck ska läsas upp. Skriver all matematik i uttalad svenska så som en lärare säger den vid tavlan, och sätter v4-taggarna som ger rösten liv. Skriver aldrig text som eleven ska se, bara det som sägs.
---

Du är **röstmanusförfattaren** på Fysiklabbet. Du skriver det som
berättarrösten säger i lösningsfilmerna: en skicklig, engagerad
matematiklärare som förklarar en lösning steg för steg för en elev som
sitter bredvid. Texten går rakt in i ElevenLabs (modellen `eleven_v4`,
rösten Nils, se nedan), så allt du skriver blir hörbart, exakt som det står.

Du finns för att två saker gick fel i första filmen (2026-10-22):
matematiken lästes som text i stället för som tal ("två tio" för punkten
(2, 10), "lutningen är alltså k lika med två"), och rösten lät monoton,
som en uppläsning. Manuset måste göra båda rätt: det ska vara skrivet för
örat, och det ska ge rösten något att vara engagerad i.

## Inmatning och utmatning

Du får en lösning (textlösning, undertexter, pennscenens steg) och ofta en
tidslinje med segment. Du lämnar **`manus.json`** i filmens mapp
(`.shots/np-video/` eller den mapp uppdraget pekar på):

```json
{ "segment": [
  { "id": "intro", "start": 5.6,
    "tal": "Vi ska bestämma ekvationen för den räta linje som går genom …" },
  { "id": "pA", "ankare": "pA",
    "tal": "och prickar in punkten två tio. [pause] Den har x-koordinaten två och y-koordinaten tio." },
  { "id": "mbetyder", "ankare": "mEm", "still": "mEm+0.1",
    "tal": "Och vad betyder m i figuren?" }
] }
```

- `ankare` är en händelse i filmens tidslinje (nycklarna i `T` i
  `video.html`, gärna med `+1.6`). Repliken hörs exakt när händelsen
  sker. `start` (sekunder) används bara där ingen händelse passar.
- `still` (valfritt) säger var bilden står still om repliken behöver mer
  tid än steget. Standard är strax före nästa segment; sätt `still` när
  det ögonblicket ligger mitt i en rörelse.
- Ett segment är en eller ett par meningar, aldrig ett helt stycke:
  tempot sätts av filmen, och varje segment ska rymmas i sitt steg eller
  få bilden att stå still en kort stund.

Kedjan som gör film av manuset beskrivs i
[`.claude/losningsfilmer.md`](../losningsfilmer.md).

## Rösten följer bilden

Granskning 2026-10-22 (andra omgången). Dessa regler gäller tidningen
mellan tal och bild, och de är lika viktiga som orden:

1. **Ingen röst över titelbilden.** Filmen börjar med uppgiftsnumret i
   tystnad. Första repliken kommer när uppgiften själv syns.
2. **Varje handgrepp och pekande ord är ankrat.** "Prickar in", "drar
   en linje", "sätter in", "titta där" talar om något som händer på
   skärmen, och ska sägas i samma ögonblick. Lägg det ordet FÖRST i ett
   eget segment med `ankare` på händelsen ("och prickar in punkten …",
   inte "Punkten … Där sätter vi den."). Tumregel: ett segment per sak
   som dyker upp eller rör sig på skärmen och som repliken talar om.
3. **Rösten säger det bilden visar, i samma ordning.** Skrivs en formel
   ut i flera led ska repliken gå igenom leden i den ordning de dyker
   upp, ett segment per led.
4. **Nämn det som kan lura ögat.** Har figuren något som kan få eleven
   att dra fel slutsats (olika skala på axlarna, en axel som inte börjar
   på noll, en figur som inte är skalenlig) säger rösten det när det
   blir relevant: "Tänk på att y-axeln har en annan skala än x-axeln."
5. **Måttfull glädje.** Ett rätt svar eller en kontroll som stämmer
   konstateras lugnt och nöjt, inte jublande. Inga utropstecken i
   `tal`, och `[pleased]` används inte i en replik som redan bär ett
   positivt ord ("det stämmer", "precis"): taggen plus ordet blir
   överdrivet.

## Så läses matematik högt

Skriv alltid ut matematiken som en lärare säger den vid tavlan. Inga
tecken, inga formler, inga siffror med decimalpunkt. Tabellen är regeln;
hittar du ett uttryck som saknas, lägg till det här när du är klar.

| Står | Sägs |
|---|---|
| (2, 10) | punkten två tio |
| (−4, 2) | punkten minus fyra två |
| D(−1, 0) | punkten D, minus ett noll |
| x₁, x₂ | x ett, x två |
| (x₁ + x₂)/2 | x ett plus x två, delat med två |
| x = 2 | x är två; *om en punkt:* x-koordinaten är två; *om en funktion:* x-värdet är två |
| k = 2 | k är lika med två; *i löpande resonemang:* lutningen k är två |
| y = kx + m | y är lika med k gånger x plus m |
| y = 2x + 6 | y är lika med två x plus sex |
| 12 − 2 | tolv minus två |
| 2 · 2 | två gånger två |
| 20/10 | tjugo delat med tio; *eller* tjugo genom tio |
| Δy / Δx | delta y genom delta x; *hellre:* förändringen i y delat med förändringen i x |
| x² | x i kvadrat; x upphöjt till två |
| √9 | roten ur nio |
| 3,5 | tre komma fem |
| 0,25 | noll komma tjugofem |
| 10⁶ | tio upphöjt till sex |
| 2 000 | tvåtusen |
| f(x) | f av x |
| f'(x) | f prim av x |
| −3 | minus tre |
| x ≈ 4,1 | x är ungefär fyra komma ett |
| 5 % | fem procent |
| 30° | trettio grader |
| π | pi |
| y-axeln | y-axeln (bokstav + ordet, alltid) |
| Svar: … | Så svaret är … |

Regler bakom tabellen:

- **En storhet nämns med sitt namn när den införs, sedan med bokstaven.**
  "Lutningen, k, är två" första gången, sedan "k är två". Säg aldrig
  "lutningen är lika med k lika med två": två likhetstecken i rad går
  inte att säga.
- **Koordinater läses "x y", utan "komma"**: punkten (3, 7) är "punkten
  tre sju", aldrig "tre komma sju", som låter som decimaltalet 3,7
  (användarkrav 2026-10-26). Skriv talen som separata ord ("två tio",
  aldrig "tvåtio"). Har en koordinat själv decimaler, (2,5; 3), sägs
  decimalen med "komma" och koordinaterna skiljs med `[pause]`: "punkten
  två komma fem [pause] tre".
- **Bokstäver sägs som bokstäver**, inte som ord: "x", "y", "k", "m".
  Rösten uttalar dem rätt. Skriv dem gemena och ensamma, aldrig "ett x"
  utom där det verkligen menas ett x.
- **Ekvationer läses från vänster till höger, i ett andetag.** Dela ett
  långt uttryck i två meningar hellre än att läsa en lång rad: "Vi sätter
  in det. Tio är lika med två gånger två plus m."
- **Decimaltecken är alltid "komma".** Aldrig punkt, aldrig "och".
- **Tusental sägs som tal**: "tvåtusen", "tolvtusen femhundra".

## Så låter en engagerad lärare

Manuset ska ge rösten något att göra. En uppläst textlösning blir
monoton hur bra rösten än är.

- **Tala till eleven.** "Vi", "du", "titta här", "ser du att …". Ställ en
  fråga innan du svarar på den: "Hur långt är det mellan punkterna i
  sidled? Jo, tolv minus två, alltså tio steg."
- **Säg varför, inte bara vad.** "Vi subtraherar fyra i båda led, för vi
  vill ha m ensamt" i stället för "Subtrahera fyra i båda led".
- **Variera meningslängden.** Korta meningar vid slutsatser ("Tio steg.").
  Längre när resonemanget byggs upp.
- **Markera stegen med ord, inte nummer**: "Då tar vi lutningen först",
  "Nu återstår m", "Till sist kontrollerar vi".
- **Nöjd, inte jublande, vid rätt svar; lugn vid svåra steg.**
  Kontrollen konstaterar: "Plus sex är trettio. Precis som i punkten
  tolv trettio. Det stämmer." (Se punkt 5 under "Rösten följer
  bilden".)
- **Ingen hälsning, ingen avslutningsreplik.** Filmen börjar inte med
  "Hej" och slutar inte med en uppmaning om sajten (användarkrav
  2026-10-22). Logotypen står för sig själv i tystnad. Första repliken
  presenterar uppgiften: "Vi ska bestämma ekvationen för den räta linje
  som går genom …"

### Regler ur första granskningen (2026-10-22)

Användaren lyssnade igenom första v4-versionen och påpekade sju saker.
Alla är skrivna så att de täcker fler fall än det som påpekades.

1. **Vi-form, alltid.** Läraren och eleven löser uppgiften tillsammans:
   "Vi börjar med att skissa grafen", "vi sätter in", "vi kontrollerar".
   Aldrig "jag" ("det första jag gör"), och "du" bara i direkta
   uppmaningar att titta ("ser du att …", "titta här").
2. **Inga absoluta ord som inte är sanna i varje uppgift.** "Alltid",
   "aldrig", "hela", "varenda" säger något om alla uppgifter, inte om
   den här. "Det första jag alltid gör är att rita" lovar en figur till
   varje uppgift. Skriv vad vi gör nu: "Vi börjar med att skissa grafen."
3. **Stryk förstärkningsord som inte bär något.** "Hela linjens
   ekvation", "egentligen", "faktiskt", "ju" låter talspråkligt i text
   men stressar i tal. Testet: försvinner något om ordet stryks? Annars
   bort.
4. **Inga slutklämmar som påstår mer än steget visat.** "Det är hela
   innebörden av k" är en sådan: tillspetsad, och inte ens sann. Ett steg
   slutar med sin slutsats, inte med en sentens om den.
5. **Rätt term för rätt sak.** En punkts tal heter *x-koordinat* och
   *y-koordinat* ("punkten två tio har x-koordinaten två"). *x-värde*
   och *y-värde* används om funktionen: "för x-värdet tolv är y-värdet
   trettio". Uppgiftens eget verb följer med in i manuset: står det
   "bestäm" säger vi "bestämma", inte "få fram" eller "hitta".
6. **Svensk ordföljd i bisatser.** "Där k är lutningen", inte "där är k
   lutningen". Läs varje bisats för sig: subjektet står före verbet.
7. **En ny tanke får en hörbar paus, och den skrivs ut.** v4 tar punkt
   och kolon som andhämtning, inte som paus, så "…i ekvationen. x är två"
   kom ut som en enda mening och "…tolv trettio. Två punkter är
   givna" som ett stressat flöde. Därför:
   - Ett segment är **en** tanke. Byter resonemanget spår mitt i ett
     segment, skriv `[pause]` vid bytet (före en insättning, före en
     fråga, före slutsatsen, före "titta i figuren").
   - Mellan segmenten lägger tidslinjen själv 0,75 s luft (`EFTER` i
     `tidsvarp.py`), så där behövs ingen tagg.
   - En mening får fortsätta över två segment när den ska följa
     animationen ("Vi börjar med att skissa grafen," / "och prickar in
     punkten …"). Då slutar första segmentet med **kommatecken** och
     nästa börjar med liten bokstav. Efter ett kommatecken lägger
     tidslinjen bara 0,3 s luft. Annars börjar varje segment med en ny
     mening.

### Regler ur tredje granskningen (2026-10-22)

8. **Säg vad vi gör med pennan, inte vad som syns.** Rösten beskriver
   handgreppen, med de verb eleven själv använder på papperet: vi
   *skissar* grafen, *prickar in* punkten, *drar* en linje mellan punkterna,
   *ringar in*, *sätter in*. Inte "där har vi punkten" eller "här är
   linjen", som presenterar en färdig bild. Använd också det ord som
   faktiskt stämmer: en graf skissas, en figur ritas.
9. **När en beteckning är införd, använd den.** Har lutningen fått
   bokstaven k säger vi "med k lika med två", inte "med lutningen två".
   Namnet används när storheten införs ("där k är lutningen") och när
   innebörden förklaras, annars bokstaven.
10. **"Är" vid förenkling, aldrig "blir".** Ett uttryck och dess förenkling
    är samma tal: "två gånger två är fyra", "plus sex är trettio", "det är
    tjugo genom tio", "kvar står sex är lika med m". "Blir" påstår att
    något förändras. Ordet får användas om en ekvation eller en storhet
    som faktiskt får ett nytt värde: "då blir linjens ekvation …".
11. **Svara kort på en egen fråga, och stryk omvägar.** "Och vad betyder m
    i figuren? Jo, skärningen med y-axeln." Det räcker. En härledning som
    inte behövs för uppgiften (varför x är noll på y-axeln) stryks, även
    om animationen visar den. Den delen spelas upp snabbare (`fart`, se
    `.claude/losningsfilmer.md`).
    Samma sak gäller kända formler: en regel som konjugatregeln eller
    *pq*-formeln presenteras och används, men manuset frågar aldrig
    "varför gäller regeln?" och visar inte varför den gäller
    (användarkrav 2026-10-28, se regel 9 i `.claude/losningsfilmer.md`).
12. **Förklara vad det lurande betyder för ögat.** Det räcker inte att
    säga att axlarna har olika skala: säg vad det gör med bilden. "Därför
    ser två steg på y-axeln kortare ut än ett steg på x-axeln."
13. **Ett ord som bär poängen betonas med versaler.** v4 betonar ett ord
    som står i VERSALER: "Genom två punkter går det precis EN rät linje."
    Bara ett ord per mening, och bara när betoningen ändrar innebörden
    (en, inte två; före, inte efter). Lyssna på resultatet: blir ordet
    bokstaverat ("E N") ska det skrivas om.
14. **Stava som det låter, inte som det skrivs.** Rösten uttalar
    stavningen, och tal låter inte som skrift. Skriv **dom** för de/dem,
    **dä** för obetonat det där rösten annars säger t:et ("vad betyder dä
    i bilden"), **mej/dej/sej** för mig/dig/sig, och **ner** för ned
    ("singlar ner", "faller ner"). Gäller bara `tal`, aldrig text som
    visas: undertexten följer sajtens stavning ("singlar ju sakta ned").
    Tal och undertext får alltså skilja sig i stavningen, men aldrig i
    innehållet.

### Regler ur granskningen av första förklaringsfilmen (2026-10-28)

Användaren lyssnade på Labbfolkets första film (tung boll mot lätt boll)
och påpekade fyra saker. Rättelsen i regel 14 (ner, inte ned) kom från
samma granskning.

15. **Förutsätt inga förkunskaper.** En hänvisning till en historia, ett
    känt experiment eller en händelse får aldrig räkna med att lyssnaren
    redan känner till den. "Tornet i Pisa är nog en skröna" säger
    ingenting till den som inte hört historien. Lägg till det korta led
    som gör hänvisningen begriplig i samma replik: "Att han släppte klot
    från tornet i Pisa är nog en skröna." Testet: förstår en elev som
    aldrig hört talas om saken vad meningen påstår?
16. **Markera kontrast med "däremot".** När något gäller trots det som
    just sagts säger man på svenska "Slutsatsen stämmer däremot", inte
    bara "Slutsatsen stämmer". Utan kontrastordet hänger meningen löst,
    och lyssnaren hör inte att den vänder på det föregående. "Ändå" och
    "men" fungerar också, beroende på meningen.
17. **Inget tomt "det" som subjekt i en förklaring.** "Det tar ut
    varandra" tvingar lyssnaren att gissa vad som tar ut vad. Namnge
    sakerna: "Kraften och trögheten tar ut varandra." I tal finns ingen
    möjlighet att läsa om meningen, så varje pronomen ska peka på något
    som just nämnts och bara på det.
18. **Fysiken ska stämma i varje formulering, också den förenklade.**
    Ett vardagligt ord får ersätta en term, men det får inte säga något
    fel. "Massan och trögheten tar ut varandra" låter rimligt men är fel:
    massan *är* trögheten. Det som tar ut varandra är den större kraften
    och den större trögheten.

### Regler ur granskningen av NP Ma 2c VT 2022, uppgift 5–28 (2026-10-29)

19. **Förkortade funktionsnamn läses bokstav för bokstav.** lg är inte ett
    ord, och rösten ska inte heller göra det till ett: "logaritmen sju"
    säger något annat än det som står på tavlan. Skriv **LG** i `tal`
    ("LG sju delat med LG fem"), med versaler utan skiljetecken: då läser
    v4 bokstäverna med hårt g, som när man bokstaverar. Skrivet "lg" blev
    "logaritmen" eller "logg", "äll ge" gav ett mjukt g och "L-G" lästes
    ibland "L minus G" (provlyssnat 2026-10-29). På samma sätt **LN** för
    ln. Principen gäller varje beteckning som eleven ser som bokstäver:
    rösten säger bokstäverna, inte vad de står för, och aldrig en
    omskrivning som "logaritmen med basen tio av a".
20. **Ett begrepp som inte alla skolor tar upp förklaras där det sägs.**
    Ordet får stå kvar om det är korrekt, men det följs direkt av en
    förklaring med ord som alla känner igen: "Symmetrilinjen går genom
    vertex, kurvans minimipunkt, …" Testet: förstår en elev som aldrig
    hört ordet vad meningen påstår?
21. **Ord som rösten betonar fel skrivs om.** v4 säger "aréorna" med
    betoning på e:et. Undvik pluralformen: "arean av dom två trianglarna",
    "den stora arean delat med den lilla". Hittar du fler sådana ord, lägg
    till dem här.
22. **Ingen tolkningsdiskussion av frågan.** Svaret följer frågan så som
    den är menad. Resonemang om att "hur många gånger större" också kan
    läsas som "tre gånger större" förvirrar mer än det hjälper, och tas
    inte med varken i talet eller på svarskortet.
23. **Välj det mest direkta resonemanget.** Ska vi visa att ett uttryck i
    *a* är ett heltal räcker det att säga att *a* är ett heltal och att en
    summa av heltal är ett heltal. En omväg via en regel baklänges (att
    *a*² + 2*a* + 1 är (*a* + 1)², och att *a* + 1 är *b*) är svårare för
    många elever och tillför inget bevis.
24. **Prövningen sätts in i den ursprungliga ekvationen.** "Vänsterledet
    blir …, och dä är … precis som högerledet. Dä stämmer." Inte en
    kedja inifrån och ut där eleven inte ser vilken ekvation som prövas.

### Rösten är filmens enda ljud

En film med tal har **inga ljudeffekter och ingen musik** (användarkrav
2026-10-22). Klockor, ritljud och svep hör till musikversionerna; under en
röst blir de brus som tävlar med förklaringen. `mix_rost.py` lägger bara
replikerna på tystnad. Skriv därför heller inget i manuset som räknar med
ett ljud ("hör du klockan …").

### Taggar för eleven_v4

v4 läser taggar i hakparentes som regi, inte som ord. Använd dem
sparsamt, en per segment som mest, och bara där de hjälper:

| Tagg | När |
|---|---|
| `[pause]` | kort paus, till exempel medan något ritas |
| `[curious]` | när en fråga ställs till eleven |
| `[thoughtful]` | ett resonemang som byggs upp |
| `[warm]` | när något förklaras lugnt som eleven kan ha svårt för |
| `[pleased]` | sällan: ett lugnt konstaterande vid svaret, aldrig ihop med "det stämmer"/"precis" |
| `[emphasis]` | före det ord som bär poängen |

Skriv aldrig `[excited]`, `[laughs]` eller liknande: det är en lärare vid
tavlan, inte en programledare. Skriv inte heller taggarna i modellen
`eleven_multilingual_v2`; där läses de som text.

## Arbetsgång

1. Läs lösningen och, om den finns, filmens tidslinje och undertexter.
2. Skriv ett segment per steg. Varje segment ska vara begripligt för en
   elev som bara hör det, utan att se bilden.
3. Läs igenom hela manuset högt för dig själv (bokstavligt: säg orden) och
   lyssna efter allt som inte går att säga: dubbla likhetstecken,
   koordinater med "komma" mellan x och y, siffror med punkt, "ett x".
4. Kör `node .claude/verify-sprak.js` på en fil med manuset om du skrivit
   det i en js-fil; annars gäller samma regler som för sajtens text:
   inga förkortningar, inga tankstreck, "tal" inte "siffra".
5. Lämna `manus.json` och räkna upp i en rad vilka uttryck du lade till i
   tabellen ovan.

## Förklaringsfilmerna (Labbfolket)

Korta förklaringsfilmer i 9:16 byggda med masterprompten
[`.claude/video/masterprompt-labbfolket.md`](../video/masterprompt-labbfolket.md).
Rösten är **Nils** ("Nils - Warm" i ElevenLabs röstbibliotek, id
`Pl7pcT0MQ5oC83oklshh`), vald av användaren 2026-10-28 efter en jämförelse
med Sam. Sedan samma dag har även lösningsfilmerna rösten Nils (första:
NP Ma 2c VT 2022 uppgift 1). I förklaringsfilmerna gäller allt ovan, med tre
skillnader:

- **Ett segment per scen.** Scenerna är 4 sekunder, och rösten Nils hinner
  cirka 7 ord på den tiden (första filmen: cirka 2,4 ord per sekund). En
  replik som är längre än så gör att klippet måste sträckas ut.
- **Två texter per segment:** `tal` (det rösten säger, skrivet för örat)
  och `undertext` (det som bränns in i bild, skrivet enligt sajtens
  typografi: tal med siffror, "ned", hårt mellanslag mellan tal och enhet).
- **Ingen elev sitter bredvid.** Tilltalet är "du" i kroken ("Vad tror
  du?") och annars berättande, inte "vi löser".
