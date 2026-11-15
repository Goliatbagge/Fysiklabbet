# Kalibrering av övningsnivåer: Fysik nivå 1 (fy1)

Måttstock för agenter som skriver nya övningar på nivåerna Grund, Mellan och
Avancerad i Fysik nivå 1. Nivåerna motsvarar provens E-, C- och A-poäng.
På sajten heter nivåerna alltid Grund, Mellan och Avancerad: skriv aldrig
E, C eller A i en uppgift, en rubrik eller en lösning (se CLAUDE.md,
"Övningsblad").

## Källor som analyserats

- Kursprov Fysik 1 hösten 2012, delprov A och B, med bedömningsanvisningar
  (`NP/Fysik nivå 1/HT 2012/`, `Kursprovsuppgifter/Fysik 1/Frisläppta/01 …`).
- Kursprov Fysik 1 våren 2014, delprov A och B, med bedömningsanvisningar
  (`NP/Fysik nivå 1/VT 2014/`, `Kursprovsuppgifter/Fysik 1/Frisläppta/02 …`).
- Kursprov Fysik 1 hösten 2015, delprov A och B, med bedömningsanvisningar
  (`NP/Fysik nivå 1/HT 2015/`, `Kursprovsuppgifter/Fysik 1/Frisläppta/03 …`).
- Kursprov Fysik 1 våren 2017, delprov A och B, med bedömningsanvisningar
  (`NP/Fysik nivå 1/VT 2017/`, `Kursprovsuppgifter/Fysik 1/Frisläppta/04 …`,
  även `data/np/fy1-vt2017.js`).
- Samlingen "Uppgifter från tidigare kursprov i Fysik 1" (78 uppgifter med
  poängfördelning, ordnade efter område) och Skolverkets
  "Bedömningsexempel Fysik 1" (`Kursprovsuppgifter/Fysik 1/Frisläppta/`).
- Nationella prov i Fysik A: ht98, vt00, ht00, vt02, vt05 (`NP/Fysik A/`),
  där vg-poäng och de ¤-märkta uppgifterna (MVG) motsvarar dagens C och A.
- `OVNINGAR.md` och befintliga fy1-avsnitt i `data/ovningar.js` (bland
  annat 3.7 Lutande plan, 5.5 Arkimedes princip och 7.8 Komplexa kopplingar).

**Ingenting i den här filen är en avskriven provuppgift.** Typerna är
beskrivna med egna ord och utan provens tal, personer eller föremål. Använd
aldrig provens inramningar (samma apparat, samma idrott, samma livsmedel,
samma film, samma tal) när du skriver en ny uppgift: ta konceptet och bygg
ett eget scenario runt det. Se även OVNINGAR.md, "Kalibrering mot riktiga
läromedel".

## Hur proven delar ut poäng

Ett kursprov i Fysik 1 ger 60 eller 61 poäng, varav ungefär 21 till 23
E-poäng, 20 till 24 C-poäng och 14 till 19 A-poäng. Poängen anges per
uppgift som (E/C/A), och bedömningsanvisningarna knyter varje poäng till en
förmåga: B (begrepp), P (problemlösning), Ex (experiment) och
K (kommunikation). Problemlösningen bär nästan alla A-poäng: i ett av
proven var 13 av 19 A-poäng P-poäng. Sex mönster styr kalibreringen:

1. **Provet stiger i svårighet.** De första uppgifterna (kortsvar direkt i
   häftet) är nästan bara E, mitten blandar E och C, och de sista tre till
   fem uppgifterna är rena A-uppgifter märkta (0/0/2), (0/0/3) eller
   (0/0/4). En uppgift som ger enbart A-poäng är alltså svår redan i
   första steget: även den "godtagbara ansatsen" ger A-poäng.
2. **Poängen ligger i en kedja.** Bedömningen skrivs "godtagbar ansats",
   "med godtagbar fortsättning", "med i övrigt godtagbar lösning och svar".
   I en (0/1/2)-uppgift är första steget C och resten A. Poängen sitter där
   eleven själv måste se hur delarna hänger ihop, inte i räkningen.
3. **Den generella lösningen är A.** Flera bedömningsanvisningar ger
   uttryckligen C-poäng för en lösning med antagna värden och A-poäng först
   för en generell lösning: en bromssträcka i en backe "där massan ej är
   antagen", en volymändring ur procentuella ändringar av tryck och
   temperatur, en andel under vattenytan som ska visas utan givna mått.
   A-uppgifter ger därför ofta medvetet för lite data: eleven ska inse att
   den saknade storheten tar ut sig själv.
4. **Diskussionen är en egen poäng.** "Beräkna och diskutera resultatet"
   ger en A-poäng för att eleven ser vad modellen bortsett från (att en del
   av energin hamnar i ett annat föremål, att ett värde är en övre gräns).
5. **Kommunikationspoäng kräver helhet.** CK ges när större delen av
   uppgiften är behandlad och lösningen går att följa, AK när hela uppgiften
   är löst, välstrukturerad, utan ovidkommande delar och med säkert
   fackspråk där varje steg motiveras. Uppgifter med K-poäng märks i proven
   "På denna deluppgift kommer din lärare särskilt att bedöma hur väl du
   redovisar din lösning". Ett rätt svar utan motivering ger ingen poäng.
6. **Samma område kan ge E, C eller A.** Att skriva en sönderfallsformel är
   E, att räkna aktiviteten efter en tid är E eller C, och att gå från
   aktivitet till antal kärnor till en sällsynt sönderfallsgren under en
   kort tid är A. Nivån avgörs av vad eleven själv måste tillföra, inte av
   ämnet.

Delprov B (laborativt) och planeringslaborationerna i delprov A ger poäng på
alla tre nivåerna, typiskt (3/3/2) eller (1/2/1): E för att ange storheter
och mätningar, C för en genomförbar metod med upprepning och medelvärden,
A för grafisk analys (linjär anpassning, tolkning av lutning och skärning
med en axel) och en nyanserad diskussion av hur felkällor påverkar
resultatet åt vilket håll.

## Grund (motsvarar E-poäng)

### Kännetecken

- **En eller två tankesteg.** Ett samband identifieras och används direkt,
  ibland efter en enhetsomvandling (km/h till m/s, minuter till sekunder,
  liter till kubikmeter) eller en enkel omformning.
- **Allt som behövs står i uppgiften**, i den form det ska användas, och
  situationen är en standardsituation ur genomgången.
- **Avläsning av ett tydligt värde i en graf**: lutningen i en s–t-graf
  med rak linje, arean under en v–t-graf som består av en triangel eller
  rektangel, accelerationen ur en rak v–t-graf.
- **Kortsvar och begreppsfrågor**: komplettera en reaktionsformel, välja
  rätt koppling för mätinstrument, ange en enhet, förklara ett begrepp i en
  mening (halveringstid, varför ljusets fart är densamma för alla
  observatörer), rita fältlinjer eller en kraft.
- **Jämvikt i en dimension**: normalkraft lika med tyngd, friktion lika med
  dragkraft vid konstant fart, kraften delad lika på två stöd.
- Provens formuleringar: "Beräkna", "Bestäm", "Hur stor är", "Vilken
  hastighet", "Skriv reaktionsformeln", "Endast svar krävs", "Kortfattad
  redovisning och svar", "Förklara kortfattat", "Rita in", "Nämn".

### Uppgiftstyper

1. Medelfart eller sträcka ur en rak s–t-graf eller v–t-graf (lutning eller
   area av en enkel figur), eller avstånd ur ekotid där ljudet går fram och
   tillbaka.
2. Acceleration ur en rak v–t-graf, eller sluthastighet vid fritt fall ur
   en given höjd med energiprincipen.
3. Rörelsemängdens bevarande när två kroppar fastnar i varandra och den ena
   står still från början.
4. Arbete ur kraft och sträcka (kraften parallell med rörelsen, eller given
   som en andel av tyngden), effekt ur arbete och tid.
5. Elektrisk effekt och ström ur märkdata, med en ja/nej-slutsats mot en
   säkring eller ett batteri; resistans ur avlästa instrumentvärden.
6. Vätsketryck på ett djup och tryckkraft på en liten cirkulär yta.
7. Energi för uppvärmning med $E = c \cdot m \cdot \Delta T$, eller vilken av
   två metaller som avger mest energi vid avsvalning (jämförelse av
   specifik värmekapacitet).
8. Reaktionsformler för alfa- och betasönderfall, fusion eller
   neutroninfångning; aktivitet efter ett helt antal halveringstider eller
   efter en given tid med sönderfallslagen.
9. Spänning mellan två punkter ur fältstyrka och avstånd i ett homogent
   fält, eller fältets riktning mellan en laddad yta och marken.
10. Begreppsval: naturvetenskaplig frågeställning eller inte, vilka
    storheter som är konstanta under ett kast, vilken bana ger störst fart
    nere (alla lika utan friktion), vilket påstående om en stöt som är sant.

### Vanliga fällor

- En Grund-uppgift som i praktiken kräver två samband i följd där det ena
  inte är självklart (först acceleration ur en graf, sedan en kraft ur
  Newtons andra lag med friktion) är Mellan.
- Enhetsomvandlingen får vara den enda extra svårigheten, inte en av flera.
- Låt inte figuren eller alternativens ordning avslöja svaret, och lägg
  inte rätt alternativ på samma plats i varje flervalsuppgift
  (`verify-ovningar-flerval.js`).
- Begreppsfrågor på Grund ska gå att besvara med en mening. Kräver svaret
  ett resonemang i två led (varmare luft, lägre densitet, stiger, ersätts
  av luft från sidan) är det Mellan.

## Mellan (motsvarar C-poäng)

### Kännetecken

- **Två eller tre samband kombineras**, och vilka det är framgår inte helt
  av uppgiftstexten. Typiskt räknas en storhet ut ur ett samband och sätts
  in i nästa: friktionskraften ur friktionstalet, sedan bromssträckan ur
  arbete och rörelseenergi.
- **Graf eller tabell ska tolkas**, inte bara läsas av: en kraft–tid-graf
  för en hiss (massan ur viloläget, riktningen ur var kraften är större,
  accelerationen ur ett avvikande värde), en a–t-graf där hastigheten är
  arean, ett U–I-diagram där samma resistor känns igen på samma kvot.
- **Ekvationer med den sökta storheten på två ställen**: värmebalans vid
  blandning, antal hinkar eller liter som behövs för en sluttemperatur,
  ideala gaslagen med två tillstånd.
- **Kretsar och fält med flera steg**: ersättningsresistans i en blandad
  koppling, potentialen i en punkt när en annan punkt är jordad, laddning
  på kulor i jämvikt mellan Coulombkraft och tyngd.
- **Enklare resonemang med slutsats**: "räcker det", "stämmer det att",
  "åker hissen upp eller ner", "rangordna". Slutsatsen ska motiveras med
  räkning eller med ett namngivet samband.
- **Förklaring av en mekanism i två led** med fackord: avdunstning kräver
  energi som tas från huden, tryckskillnad mellan varm och kall luft ger
  vind, lägre yttre tryck gör att en sluten gas expanderar.
- Provens formuleringar: "Bestäm", "Motivera ditt svar", "Förklara varför",
  "Vilken blir den kortaste", "Hur många … måste", "Hur många dygn bör man
  vänta", "Vilka två av mätningarna", "Rita kraftsituationen".

### Uppgiftstyper

1. Bromssträcka på vågrätt underlag ur fart och friktionstal (friktion som
   andel av normalkraften, sedan arbete lika med rörelseenergi).
2. Normalkraft eller resulterande kraft på en person som accelereras lodrätt
   (hiss, uppskjutning), där tyngdkraften ska räknas med och inte glömmas.
3. Värmebalans vid blandning av två vattenmängder eller vatten och ett
   föremål, med den sökta mängden som obekant.
4. Ersättningsresistans och huvudström i en blandad koppling, eller den
   resistor som ska ersätta en del av kretsen så att strömmen blir
   oförändrad; potential i en punkt i förhållande till en jordad punkt.
5. Laddning ur jämvikt mellan elektrisk kraft och tyngd (kulor på en lodrät
   tråd, en laddad partikel som svävar mellan två plattor), med en ritad
   kraftsituation där krafternas storlek stämmer.
6. Hastighet för en jon eller elektron som accelereras från vila genom en
   given spänning (arbete $q \cdot U$ lika med rörelseenergi).
7. Impuls när en boll studsar tillbaka, där riktningsbytet gör att
   hastigheterna ska adderas och inte subtraheras.
8. Energi ur vatten som faller en höjd, med verkningsgrad och svar i kWh;
   verkningsgrad för en apparat ur effekt, tid och uppvärmd vattenmängd.
9. Ideala gaslagen med två tillstånd, eller tiden tills en aktivitet sjunkit
   under ett gränsvärde (exponenten löses ut med logaritm eller grafiskt).
10. Flervalsfrågor som kräver ett resonemang: var accelerationen är störst
    under en fjäderuppskjutning, vilka påståenden om parallellkoppling som
    stämmer, vilken mätning som är uppenbart felaktig i en tabell.

### Vanliga fällor

- En lång linjär kedja av insättningar är Mellan, inte Avancerad, oavsett
  hur många steg den har (OVNINGAR.md, "Demoterings-testet").
- Att lösa ut en exponent med logaritm eller lösa en andragradsekvation
  numeriskt är rutin med digitala hjälpmedel och lyfter inte en uppgift
  till Avancerad.
- Ge de data som behövs. En Mellan-uppgift ska inte kräva att eleven själv
  inser att en storhet tar ut sig, det är ett A-kännetecken.
- Riktningar ska motiveras: "hissen åker uppåt" utan en mening om varför
  normalkraften är större än tyngden ger ingen poäng i proven, och ska inte
  heller stå så i lösningsförslaget.

## Avancerad (motsvarar A-poäng)

A-uppgifterna i Fysik 1 är korta i texten men långa i tanken. De är INTE
enkla, och de är inte heller bara långa räknekedjor. En Avancerad uppgift
ska uppfylla minst ett, gärna två, av kännetecknen nedan. Jämför alltid med
OVNINGAR.md, "Vad gör en uppgift till Nivå 3". Observera att flera av
sajtens nuvarande nivå 3-uppgifter ligger närmare provens C: en andel under
vattenytan räknad med givna densiteter är Mellan, medan provens A-poäng
kräver att samma sak visas generellt och redovisas fullständigt.

### Kännetecken

- **Vägen är okänd.** Uppgiften säger vad som söks men inte vilka samband
  som ska användas eller i vilken ordning. Eleven måste själv bryta ned
  problemet i delar och se hur de hänger ihop.
- **Data saknas medvetet och tar ut sig.** Massan anges inte i en
  bromssträcka i backe eller i ett flytproblem, tryck och temperatur ges
  bara som procentuella ändringar. Lösningen ska vara generell, med
  storheten kvar som symbol tills den förkortas bort. En lösning med ett
  antaget värde ger bara C-poäng.
- **Flera områden i samma uppgift**: elektrisk energi som blir rörelseenergi
  och räknas om till antal elektroner; mekanisk energi som blir värme i en
  kula; aktivitet som blir antal kärnor, blodvolym genom utspädning och
  absorberad dos; moment och arbete som blir temperaturökning.
- **Icke-uppenbar struktur eller fälla**: två rörelser där det närmaste
  avståndet nås när hastigheterna är lika (inte när den bakre stannar);
  seriekopplade resistorer där den med lägre märkeffekt blir varmast; en
  gas med halva densiteten som inte ger dubbel lyftförmåga; en stöt där
  rörelsemängden bevaras men energin inte gör det.
- **Modellering ur data**: ställa upp en matematisk modell (till exempel en
  exponentiell minskning) ur en mätserie eller graf, eller bestämma en
  ändringshastighet med en tangent till en krökt kurva och föra den vidare
  till en effekt.
- **Enhets- och dimensionsanalys** av en okänd formel: bestämma enheten för
  en storhet i ett samband eleven aldrig sett, och känna igen flera
  likvärdiga skrivsätt.
- **Fullständigt kvalitativt resonemang**: "Vilken av … och varför", "Ge en
  fysikalisk förklaring", där svaret bara får A-poäng om rätt samband
  ($F = \dfrac{\Delta p}{\Delta t}$, kraftbalans, energibevarande) används
  och varje led motiveras. Ett rätt val utan förklaring ger ingenting.
- **Rimlighet och giltighet**: diskutera resultatet, peka ut vad modellen
  bortser från och åt vilket håll det påverkar svaret (övre eller undre
  gräns).
- Provens formuleringar: "Hur nära … kommer som närmast", "Stämmer
  påståendet? Styrk ditt svar med fysikaliska resonemang och beräkningar",
  "Undersök … och ställ upp en matematisk modell", "Beräkna … och diskutera
  resultatet", "Uppskatta", "Utred", "Bestäm med hjälp av grafen", "Visa
  hur du kommer fram till dina svar", "Hur många procent större",
  "Förklara varför de övriga alternativen är felaktiga".

### Uppgiftstyper

1. **Inhämtning med retardation.** Ett fordon bromsar in bakom ett
   långsammare fordon med konstant fart; bestäm det minsta avståndet eller
   avgör om de kolliderar. Insikten är att avståndet är minst när farterna
   är lika, och att båda sträckorna ska räknas fram till den tidpunkten.
2. **Bromssträcka eller acceleration i en lutning med friktion, generellt.**
   Kraftuppdelning med *α* längs och vinkelrätt mot planet, friktion som
   andel av normalkraften, och massan som försvinner ur ekvationen.
   Svaret ska jämföras med fallet på plan mark.
3. **Gaslagen med bara relativa ändringar.** Tryck och kelvintemperatur
   ändras med givna procent; bestäm den procentuella volymändringen utan
   att några absoluta värden ges, och förklara en följd (kondensation,
   molnbildning, ballong som spricker).
4. **Flytande kropp i två vätskor, eller lyftförmåga med olika gaser.**
   Andelen under ytan i den ena vätskan ges eller ska visas, och andelen i
   den andra söks; eller hur mycket mer en ballong lyfter när gasen byts.
   Kräver att lyftkraften skrivs som skillnaden mellan omgivningens och
   gasens densitet, generellt.
5. **Energikedja över områden med en diskussion.** En projektil fastnar i
   en kropp som svänger upp en höjd: hastigheten före stöten ur
   rörelsemängd och lägesenergi, förlusten i mekanisk energi, och den
   maximala temperaturökningen hos projektilen. A-poäng för att även
   kroppen tar emot värme, så att svaret är en övre gräns.
6. **Värmeförlust ur en avsvalningskurva.** Bestäm lutningen med en tangent
   i en given temperatur och för den vidare till den effekt en värmare
   måste ha för att hålla temperaturen konstant.
7. **Kärnfysik i flera led.** Från massa till antal kärnor (molmassa och
   Avogadros tal), aktivitet ur sönderfallskonstanten, en sällsynt
   sönderfallsgren som andel av alla sönderfall; eller utspädningsmetoden
   där aktiviteten först räknas om för sönderfallet under väntetiden;
   eller absorberad dos ur antal sönderfall, energi per sönderfall,
   absorberad andel och kroppsmassa.
8. **Energi från ett elektriskt fält till en makroskopisk rörelse.** Hur
   stor laddning (hur många elementarladdningar) som behövs för att ge en
   kropp en viss ändring i rörelseenergi genom en given spänning, där
   spänningen först ska tas fram ur fältstyrka och avstånd.
9. **Kvalitativt jämförelseresonemang med kraft och kontakttid.** Två
   kroppar träffar samma yta med samma fart, den ena studsar och den andra
   stannar; avgör vilken som ger störst kraft och motivera med
   rörelsemängdsändring och kontakttid. Eller: vilken av två seriekopplade
   resistorer blir varmast när de bara beskrivs med effekt vid en viss
   spänning.
10. **Modell ur mätdata.** Ur en graf över upprepade studsar eller
    svängningar: beräkna den mekaniska energin efter varje studs, se att
    kvoten är ungefär konstant och ställ upp en exponentiell modell; eller
    bestäm enheten för en storhet i ett okänt samband genom enhetsanalys.

### Vanliga fällor

- **En Avancerad uppgift med alla data givna och en given ordning är
  Mellan.** Ta bort det som tar ut sig (massan, en area, en absolut
  temperatur) och be om en generell lösning, eller låt eleven välja väg.
- **Svårighet ska komma från insikt, inte från siffror.** Stora tal,
  krångliga enheter och många decimaler gör inte en uppgift svårare på
  rätt sätt.
- **Ge inte delstegen som deluppgifter.** Provens A-uppgifter har oftast
  ingen eller en deluppgift. Delar man upp vägen i a), b), c) blir de
  senare deluppgifterna Mellan.
- **Lösningen måste vara fullständig och fysikaliskt precis.** Varje samband
  namnges, varje antagande skrivs ut, riktningar och tecken motiveras,
  och resultatet rimlighetsbedöms. Ett generellt uttryck förenklas innan
  värden sätts in. Följ "Övningsblad: lösningsförslagen ska gå att följa
  rad för rad" i CLAUDE.md.
- **Kvalitativa A-uppgifter kräver ett samband**, inte vardagsord. "Den
  hårdare bollen slår hårdare" är inget svar; $F = \dfrac{\Delta p}{\Delta t}$
  med båda faktorerna diskuterade är det.
- **Avslöja inte strukturen i frågetexten.** Skriv inte "tänk på att
  farterna är lika när avståndet är minst" eller "visa att massan tar ut
  sig". Insikten är själva poängen.
- **Kontrollera att modellen håller.** En uppskattning ska ha rimliga
  antaganden som eleven själv kan motivera, och svaret ska tåla en
  rimlighetsbedömning (en temperaturökning på flera tusen grader betyder
  att något antagande är fel).

## Kapitel för kapitel: A-uppgifter i proven

### Kapitel 1: Introduktion (storheter, enheter, prefix)

Rena enhetsfrågor är E (vilken enhet får ett uttryck). A-nivån nås med
enhetsanalys av ett okänt samband: lös ut en storhet ur en formel eleven
inte känner, sätt in enheterna och förenkla, och känn igen svaret i flera
likvärdiga former (till exempel uttryckt i N, kg och s). Kräv redovisning av
varje steg. Prefix och tiopotenser bär sällan egna A-poäng, men ett
felräknat prefix i en A-kedja fäller hela svaret.

### Kapitel 2: Rörelse

E: medelfart, lutning och area i raka grafer. C: area under en a–t-graf,
två fordon som startar samtidigt, en bil som ska nå en viss fart. A:
**inhämtning och möte med acceleration** (närmaste avstånd, om en
kollision sker, när ett fordon kommer i kapp), **fritt fall eller kast med
en okänd tid** som måste lösas ur två villkor, och **öppna grafuppgifter**
där eleven själv ska ta ut så mycket fysikalisk information som möjligt ur
en graf och väva ihop den till en sammanhängande beskrivning. Torricellis
ekvation och ekvationssystem i GeoGebra hör hemma här: insikten ska ligga i
att ställa upp villkoren, inte i att lösa systemet.

### Kapitel 3: Krafter

E: jämvikt i en dimension, friktion vid konstant fart, kraften delad på
två stöd. C: normalkraft i en hiss eller vid lodrät acceleration,
kraftsituation ur en kraft–tid-graf, Coulombkraft mot tyngd, normalkraft
med en sned dragkraft. A: **lutande plan med friktion och generell
lösning** (massan tar ut sig, jämförelse med plan mark), **sneda krafter i
två led** där komposanterna ska balanseras var för sig, **ändrad
kraftsituation** (en kropp som ändrar form och därmed luftmotstånd, en
dragkamp där kraften från underlaget avgör) med skalenligt ritade krafter,
och **kraftmoment med flera krafter** där vridningspunkten ska väljas
smart. I det äldre kursprovet var spikdragning med hävstång början på en
kedja som slutade i värme.

### Kapitel 4: Energi

E: arbete, lägesenergi, rörelseenergi, effekt, verkningsgrad i ett steg.
C: arbete mot friktion som bromssträcka, energiförlust vid en studs ur en
graf, kraftverk med verkningsgrad och svar i kWh, impuls med riktningsbyte.
A: **stöt följd av en svängning eller ett lyft** (rörelsemängd i stöten,
energi efteråt, och skillnaden i mekanisk energi som blir värme),
**kontakttid och kraft** i ett kvalitativt resonemang, **modell för
energiförlust** vid upprepade studsar, och **öppna modelleringsuppgifter**
om effektbehov (en lift, en hiss, ett transportband) där eleven ska ta
fram ett generellt samband och diskutera modellens brister. Ett påstående
om en evighetsmaskin som ska bemötas med energiprincipen är C till A
beroende på hur fullständigt resonemanget ska vara.

### Kapitel 5: Tryck

E: densitet, tryck och tryckkraft, vätsketryck på ett djup. C: tryck ur en
uppskattad kraft och area med motiverade antaganden, vätsketryck och
blodtryck på olika höjder, ideala gaslagen med två tillstånd. A: **flytande
kropp, generellt** (andel under ytan i en annan vätska, att ett påstående
om en andel stämmer, visat utan givna mått), **lyftkraft med olika gaser**
(varför halva densiteten inte ger dubbel last, hur stor gasvolym som skulle
krävas för att lyfta en människa), **gaslagen med procentuella ändringar**
(volymändring utan absoluta värden, kraften på ett lock efter avsvalning
och om det är lättare att öppna vid högt eller lågt lufttryck), och
**högtryck och luftmassor** där tryck och temperatur ur ett diagram ska
kombineras till en volymändring.

### Kapitel 6: Värmelära

E: $E = c \cdot m \cdot \Delta T$ och smältning eller förångning i ett steg.
C: värmebalans vid blandning, en genomströmningsvärmare (effekt och
flöde ger temperatur), solfångare med verkningsgrad, avdunstning som
förklaring. A: **avsvalningskurva till effekt** (tangent i en punkt,
värmeförlust per sekund, effekt för att hålla temperaturen), **mekanisk
energi till värme** (friktion, inbromsning, en projektil som fastnar) med
en diskussion om vart energin tar vägen, och **flerstegsmodeller** där en
given effektformel, ett kylflöde och en temperaturgräns ska jämföras för
att avgöra om något räcker. Fasövergångar i flera steg (is till ånga)
ligger oftast på C om alla data ges.

### Kapitel 7: Elektricitet

E: Ohms lag, effekt ur märkdata, instrumentens koppling, spänning ur
fältstyrka och avstånd. C: blandade kopplingar, potential mot en jordad
punkt, laddning ur jämvikt med tyngd, hastighet efter acceleration genom en
spänning, fältstyrka ur en svävande partikel. A: **seriekopplade lampor
eller resistorer med olika märkdata** (vilken blir varmast, varför båda
slocknar, vad som händer om fler lampor byts), **rangordning av ström och
effekt** i en okänd koppling med fullständig motivering, **energi ur ett
fält till en makroskopisk rörelse** (antal elementarladdningar som krävs),
och **design** (vilka resistanser som kan fås med givna komponenter, hur
en koppling ska se ut för att ge en viss resistans). Bryggkoppling och två
batterier i samma slinga finns i läromedlen men inte i kursproven, och kan
användas som Avancerad med försiktighet.

### Kapitel 8: Relativitetsteori

Proven prövar området nästan bara på E och C: att ljusets fart är densamma
för alla observatörer, och en förklaring till tidsdilatation eller till att
en resenär hinner fram fast resan tar en livstid sett från jorden. A-poäng
förekommer inte i de analyserade proven. En Avancerad uppgift här bör
därför vara ett fullständigt resonemang (varför två observatörer mäter
olika tider för samma händelse, med ljusklockan som modell och
Pythagoras sats för den längre ljusvägen) snarare än en räkneuppgift.
Håll den inom kursens stoff.

### Kapitel 9: Kärnfysik

E: reaktionsformler, halveringstid som begrepp, aktivitet efter en tid.
C: frigjord energi ur massdefekt, tid tills ett gränsvärde nås, en dos ur
given energi och massa, varför vissa isotoper är olämpliga för ett
ändamål. A: **från vägd massa till antal kärnor till aktivitet** (molmassa,
Avogadros tal, sönderfallskonstant) med en sällsynt sönderfallsgren,
**utspädningsmetoden** där aktiviteten först räknas om för väntetiden,
**absorberad och ekvivalent dos** ur aktivitet, tid, energi per sönderfall,
absorberad andel, kvalitetsfaktor och massa, och **bindningsenergi per
nukleon** för flera nuklider med en slutsats om stabilitet. Att invertera
sönderfallslagen är rutin (C), inte A.

## Kontrollfrågor före publicering

1. Kan en elev lösa uppgiften genom att sätta in i formler i tur och
   ordning utan att fundera på strukturen? Då är den högst Mellan.
2. Är en Avancerad uppgift generell där provet skulle kräva det, och tar
   den saknade storheten verkligen ut sig?
3. Är scenariot eget? Inga av provens föremål, personer, tal eller
   händelser.
4. Har varje deluppgift ett **Svar:**, och följer lösningen formel,
   mätvärdesklammer, insättning och svar enligt OVNINGAR.md?
5. Är facit (`answer.value`) samma tal som svarsraden, och har varje led
   räknats om (`verify-rakning.js`)?
6. Ligger rätt flervalsalternativ på olika platser (`verify-ovningar-flerval.js`)?
7. Följer beteckningarna genomgången: $F_G$ med stort G, vinklar med *α*,
   $g = 9{,}82\ \mathrm{N/kg}$, decimalkomma, inga tankstreck och inga
   emojier?
