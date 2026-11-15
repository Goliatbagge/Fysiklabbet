# Kalibrering av övningsnivåer: Fysik nivå 2 (fy2)

Måttstock för agenter som skriver nya övningar på nivåerna Grund, Mellan och
Avancerad i Fysik nivå 2. Nivåerna motsvarar provens E-, C- och A-poäng.

## Källor som analyserats

- Kursprov Fysik 2 våren 2016, delprov A, med bedömningsanvisningar
  (`NP/Fysik nivå 2/VT 2016/`, även `data/np/fy2-vt2016.js`).
- Kursprov Fysik 2 hösten 2014, delprov A, med bedömningsanvisningar och
  de laborativa delproven B (`NP/Fysik nivå 2/HT 2014/`,
  `Kursprovsuppgifter/Fysik 2/Frisläppta kursprov/`).
- Samlingen "Uppgifter från tidigare kursprov i Fysik 2" (74 uppgifter med
  poängfördelning, `Kursprovsuppgifter/Fysik 2/`).
- Nationella prov i Fysik B: vt98, vt00, ht00, vt02, vt05 (`NP/Fysik B/`),
  där vg-poäng och MVG-markerade uppgifter (¤) motsvarar dagens C och A.
- Finsk studentexamen i fysik, bland annat 2022, 2023, 2024, 2025 och 2026
  (`NP/Finsk studentexamen fysik/`), som idékälla för krävande,
  materialbaserade uppgifter.
- `OVNINGAR.md` och befintliga fy2-avsnitt i `data/ovningar.js`.

**Ingenting i den här filen är en avskriven provuppgift.** Typerna är
beskrivna med egna ord och utan provens tal eller scenarier. Använd aldrig
provens inramningar (samma föremål, samma person, samma apparat, samma tal)
när du skriver en ny uppgift: ta konceptet och bygg ett eget scenario runt
det.

## Hur proven delar ut poäng

Ett kursprov i Fysik 2 ger ungefär lika många E-, C- och A-poäng (till
exempel 20/21/19 av 60). Poängen anges per uppgift som (E/C/A), och
bedömningsanvisningarna knyter varje poäng till en förmåga: B (begrepp),
P (problemlösning), Ex (experiment) och K (kommunikation). Fyra mönster
återkommer i varje prov och styr kalibreringen:

1. **Poängen ligger i en kedja.** Den första poängen ges för en "godtagbar
   ansats" (rätt samband uppställt, första storheten beräknad), nästa för
   "godtagbar fortsättning" och den sista för "i övrigt godtagbar lösning och
   svar". En uppgift märkt (0/1/3) betyder alltså att bara första steget är
   på C-nivå och att resten av vägen bär A-poäng. A-poängen sitter på de steg
   där eleven själv måste se hur delarna hänger ihop.
2. **Samma område kan ge E, C eller A.** Wiens lag ur en avläst topp är E,
   att förklara spektrumets form eller identifiera absorptionslinjer i samma
   diagram är A. Nivån avgörs av vad eleven själv måste tillföra, inte av
   ämnet.
3. **Motiveringen är en egen poäng.** C-kommunikation kräver att det
   avgörande påståendet skrivs ut (att två frekvenser är lika eftersom det är
   resonans), A-kommunikation att hela lösningen är strukturerad och använder
   fackspråket med säkerhet. Ett rätt svar utan skäl ger ingen poäng.
4. **Antaganden belönas.** Uppgifter med "gör nödvändiga och rimliga
   antaganden" eller "uppskatta" förekommer i nästan varje prov, ofta på C-
   och A-nivå. En kursprovsuppgift gav uttryckligen färre poäng om eleven
   satte in numeriska värden i stället för att lösa generellt.

## Grund (motsvarar E-poäng)

### Kännetecken

- **En eller två tankesteg.** Ett samband identifieras och används, ibland
  efter en enhetsomvandling eller en enkel omformning.
- **Allt som behövs står i uppgiften**, i den form det ska användas.
  Situationen är en standardsituation från genomgången.
- **Begreppsfrågor med kort svar**: välja rätt alternativ, ange en riktning,
  rita en kraft, peka ut en punkt, förklara ett fenomen i en mening.
- **Avläsning av ett tydligt värde** i en graf (en topp, en periodtid, en
  amplitud) följd av en formel.
- Provens formuleringar: "Beräkna", "Bestäm", "Hur stor är", "Vilken
  riktning har", "Rita in", "Vilket av påståendena är felaktigt",
  "Förklara varför", "Kortfattad redovisning och svar".

### Uppgiftstyper

1. Yttemperatur ur emittansen med Stefan–Boltzmanns lag, eller
   temperatur ur våglängden för maximal strålning med Wiens lag.
2. Magnetisk flödestäthet på ett givet avstånd från en rak ledare, eller i
   en lång spole med givet varvtal och längd.
3. Kraftmoment eller momentjämvikt med en vikt på var sida om
   vridningspunkten, där bara en hävarm söks.
4. Centripetalkraft eller centripetalacceleration ur fart och radie
   (eventuellt efter km/h till m/s), eller vinkelhastighet ur varvtal.
5. Våglängd ur frekvens och utbredningshastighet, eller grundtonens
   våglängd i en sträng eller pipa ur dess längd.
6. Fjäderkonstant ur förlängning och last, eller periodtid för fjäder och
   plan pendel ur formeln.
7. Fotonenergi, frekvens eller antal fotoner per sekund ur effekt och
   våglängd; utträdesarbete ur gränsvåglängd.
8. Gitterekvationen för en ordning, eller brytningsindex ur två vinklar.
9. Riktningsfrågor: kraften på en laddning eller ledare i ett magnetfält
   (högerhandsregeln), fältriktningen kring en ledare, centripetalkraftens
   riktning för en satellit.
10. Begreppsval: i vilket fall induceras ström, vilken våg är longitudinell,
    var i svängningen är hastigheten störst, vilka slutsatser en
    rödförskjutning ger.

### Vanliga fällor

- En Grund-uppgift som i praktiken kräver två samband i följd där det ena
  inte är självklart (de Broglie till hastighet till accelerationsspänning)
  är Mellan.
- Glöm inte enhetsomvandlingen, men låt den vara den enda extra
  svårigheten.
- Avslöja inte svaret i en figur eller i alternativens ordning.

## Mellan (motsvarar C-poäng)

### Kännetecken

- **Två eller tre samband kombineras**, och vilka det är framgår inte helt
  av uppgiftstexten. Typiskt: en storhet räknas ut ur ett samband och sätts
  in i ett annat (falltid sedan vågrät sträcka, våglängd i pipan sedan
  utbredningshastighet i strängen).
- **Graf eller tabell ska tolkas**: lutning ur en rak flödesgraf,
  periodtid och kraft i jämviktsläget ur en kraft–tid-graf, ett
  medelvärde ur en mätserie.
- **Enklare resonemang med slutsats**: "finns det någon risk att", "räcker
  det", "uppstår det en stående våg även då", "rangordna". Slutsatsen ska
  motiveras med räkning.
- **Rimliga antaganden** behöver göras i mindre omfattning (en hastighet,
  ljudets fart, en kroppsmassa).
- **Förklaring av en mekanism i två led**: varierande magnetfält ger
  virvelströmmar, och resistansen gör att energin blir värme.
- Provens formuleringar: "Gör nödvändiga och rimliga antaganden och
  bestäm", "Utred", "Motivera ditt svar", "Visa med beräkningar", "Vad
  händer med … när …", "Med hur stor total kraft", "Får … plats".

### Uppgiftstyper

1. Normalkraft eller trådkraft i den lägsta eller högsta punkten av en
   lodrät cirkelbana, där tyngdkraft och centripetalkraft ska kombineras.
2. Vågrätt kast från en höjd: falltid ur höjden, sedan krävd eller uppnådd
   vågrät sträcka, med en slutsats om en verklig situation.
3. Resonans mellan två system med samma frekvens (pipa och sträng, gungning
   och vägens ojämnheter) där frekvensen förs över från det ena till det
   andra.
4. Inducerad spänning ur en flödes- eller fältgraf med raka delar, eller
   ur en stav som rör sig på skenor.
5. Banradie för en laddad partikel i ett magnetfält, eller hastigheten
   efter acceleration genom en given spänning.
6. Gitterspektrum: får en hel ordning plats på en skärm, vilken ordning är
   högst möjlig, vilka våglängder ger givna vinklar.
7. Fjädersvängning ur en graf: periodtid och massa ur kraft–tid-grafen,
   största farten ur amplitud och periodtid.
8. Fotoelektrisk effekt i två led: utträdesarbete ur gränsvåglängd och
   sedan rörelseenergin vid en annan våglängd.
9. Energinivåer: våglängd för en given övergång, eller minsta energi som
   måste tillföras för att en viss serie ska kunna sändas ut.
10. Gravitationskraft och banfart för en satellit på given höjd, eller en
    massa ur omloppstid och fart i en cirkelbana.

### Vanliga fällor

- En lång men linjär kedja av insättningar där varje steg är givet är
  Mellan, även om den har fyra steg.
- En kort standardhärledning (att kastbanan är en parabel, perioden för en
  fjäder ur kraftekvationen) är Mellan, inte Avancerad.
- Glöm inte att slutsatsen ("ja, det räcker") är en del av svaret och ska
  ha ett "Svar:".

## Avancerad (motsvarar A-poäng)

Avancerade uppgifter ska vara verkligt krävande. Den vanligaste missen på
sajten är att en lång Mellan-kedja märks som Avancerad. Två exempel från de
befintliga fy2-övningarna som är för lätta för nivån: effekten i en
kvadratisk slinga som dras ut ur ett fält med given fart (ems, sedan
effekt) och en vikt som hängs i två parallella fjädrar (halva förlängningen).
Båda löses genom insättning i tur och ordning och är Mellan.

### Kännetecken

- **Vägen är inte given.** Eleven måste själv genomskåda situationen
  innan räkningen kan börja: vilken komposant som gäller, att två villkor
  ska kombineras, att en storhet måste elimineras, att det räcker att
  undersöka ett gränsfall.
- **Flera principer från olika områden möts**: elektriskt och magnetiskt
  fält i samma apparat, kaströrelse i ett elektriskt fält, energiprincipen
  och cirkelrörelsens kraftekvation, Stefan–Boltzmann och
  avståndskvadratlagen.
- **Generella och symboliska lösningar**: uttrycket ska tas fram med
  bokstäver och visas oberoende av en okänd storhet (massa, längd), med
  insättning först i sista steget eller inte alls.
- **Ekvationssystem eller linjär modell ur mätdata**: två mätningar ger två
  ekvationer med två obekanta, eller en rät linje vars lutning och skärning
  är de sökta konstanterna.
- **Modellering och giltighet**: bygga en enkel modell av en verklig
  situation, jämföra modellens resultat med en mätning och förklara
  skillnaden, avgöra när en formel slutar gälla.
- **Fullständigt resonemang**: rangordna och motivera alla fall, visa att
  något är omöjligt, planera ett experiment med noggrannhet och felkällor.
  Resonemanget ska vara precist, med figur där situationen kräver det och
  med varje samband motiverat.
- **Ofta en ny kontext**: forskningsutrustning, rymdsonder, medicinsk
  teknik, naturfenomen eller vardagsteknik, där texten är längre och eleven
  själv ska plocka ut det som är fysikaliskt relevant.
- Provens formuleringar: "Bestäm ett experimentellt värde på", "Visa med
  beräkningar varför", "Vilken … motsvarar", "Ange de antaganden du gör och
  de fysikaliska samband du använder", "Utred på vilka sätt", "Hur väl
  stämmer detta med", "Rangordna … Motivera ditt svar med beräkningar",
  "Planera ett experiment … noggrant".

### Uppgiftstyper

1. **Masspektrometer från början till slut**: hastigheten ur ett
   hastighetsfilter, sedan massan ur banradien i det andra fältet och till
   sist identifiering av en isotop eller jon.
2. **Avlänkning i ett elektriskt fält med vinkel**: laddningen passerar
   mellan plattor, passagetiden ur den vågräta rörelsen, den lodräta
   hastigheten ur utgångsvinkeln, sedan fält och spänning. Varianten där
   partikeln går in snett och ska komma ut genom ett givet hål är
   kaströrelse i ett elektriskt fält.
3. **Plancks konstant och utträdesarbete ur två mätningar** av
   bromsspänning vid olika våglängder: ekvationssystem eller rät linje.
4. **Strålningsjämvikt för en planet**: utstrålad effekt från stjärnan,
   intensiteten på planetens avstånd, absorberad effekt över
   tvärsnittsarean mot utstrålad över hela ytan, och planetens temperatur.
   Gärna med en jämförelse mot ett uppmätt värde och en förklaring av
   skillnaden.
5. **Komposant som måste upptäckas**: inducerad spänning i en ledare som
   faller i jordens fält (bara den vågräta komponenten ger ems för en
   vågrät ledare i rätt riktning), eller strömmen genom en ledare ur hur
   mycket en kompassnål vrids när jordfältets horisontalkomposant är känd.
6. **Moment och kraft med vinkel**: minsta kraft i ett snedställt rep för
   att lyfta en planka eller bom som är vridbar i ena änden, eller en stege
   eller bom där både moment- och kraftjämvikt behövs.
7. **Svängning ur en kraftgraf**: amplituden ur den resulterande kraften i
   ett vändläge och vinkelhastigheten, eller största rörelseenergin, när
   bara fjäderkraften som funktion av tiden är given.
8. **Cirkelbana med energi och brott**: kraften i en tråd i lägsta punkten
   när farten måste bestämmas ur en efterföljande kaströrelse, löst helt
   symboliskt så att trådens längd stryks.
9. **Nollpunkt för gravitation eller fält**: var den resulterande kraften
   från två kroppar eller två ledare blir noll, med andragradsekvation eller
   geometriskt resonemang.
10. **Spektrum och energinivåer med resonemang**: beräkna övriga möjliga
    övergångar och visa att de inte syns, och motivera varför det räcker att
    räkna på den kortaste våglängden.

### Vanliga fällor

- **Märk inte en lång linjär kedja som Avancerad.** Använd demoteringstestet
  i `OVNINGAR.md`: kan eleven lösa uppgiften genom att identifiera
  formlerna och sätta in i tur och ordning, utan att fundera på strukturen,
  är den Mellan.
- **Ge inte bort insikten i uppgiftstexten.** Skriv inte "använd
  horisontalkomposanten" eller "börja med hastighetsfiltret". Det är just
  det steget som bär A-poängen.
- **Beräkningssvårighet är inte A.** Att lösa en andragradsekvation eller
  logaritmera med digitala hjälpmedel är rutin; insikten som ställer upp
  ekvationen är det som räknas.
- **Lösningen måste vara fullständig**: figur med beteckningar, varje
  samband motiverat, numrerade ekvationer som återanvänds, antaganden
  utskrivna, rimlighetsbedömning och "Svar:" efter varje deluppgift.
- **Fysiken måste stämma i hela kedjan.** Räkna om varje led med Node före
  publicering, och kontrollera att svaret är rimligt (en isotop som finns,
  en temperatur som är fysikaliskt möjlig, en fart under ljushastigheten).
- **Undvik provens scenarier**, även de som redan förekommer på sajten.
  Några befintliga fy2-övningar ligger nära kursprovsscenarier (hopp från
  ett tio meter högt torn); nya uppgifter ska välja helt andra situationer.

## Kapitel för kapitel: A-uppgifter i proven

### Kapitel 1: Rörelse och krafter (kraftmoment, cirkulär rörelse, kaströrelse)

- Jämvikt där kraften angriper snett: minsta kraft i ett rep med vinkel mot
  en vridbar planka, bom eller lucka, med hävarmen som vinkelrätt avstånd.
- Moment och energi i samma uppgift: arbetet i en hävstång som går över i
  värme eller lägesenergi.
- Lodrät cirkelbana där trådkraften eller normalkraften kräver farten ur
  energiprincipen eller ur en efterföljande kaströrelse, gärna helt
  symboliskt.
- Konisk pendel eller motsvarande cirkelrörelse där en konstant (till
  exempel tyngdaccelerationen) ska bestämmas ur mätningar i en bild eller
  tabell.
- Gravitation och cirkelbana: massa ur omloppstid och fart, banhöjd för en
  given period, punkten mellan två himlakroppar där kraften är noll.
- Kaströrelse med extra villkor: nå över ett hinder, landa på en sluttning,
  kast från höjd med andragradsekvation i tiden, två vinklar som ger samma
  vidd med förklaring.

### Kapitel 2: Mekaniska vågor (svängningar, resonans, vågor, ljud)

- Kraft–tid- eller läge–tid-grafer för en fjäder där amplitud, massa eller
  största rörelseenergi bara kan fås genom att kombinera jämviktsläge,
  vändlägen och periodtid.
- Resonansproblem där fjäderkonstanten fås ur en nedsjunkning, periodtiden
  ur den och sedan en kritisk fart eller frekvens i en ny situation.
- Harmonisk svängning i en oväntad tillämpning: största hastigheten hos en
  rörelse längs en lutning när höjden svänger harmoniskt.
- Interferens från två källor i fas: vägskillnad till flera punkter,
  rangordning efter ljudstyrka med fullständig motivering.
- Stående vågor i rör och strängar kopplade till en verklig begränsning
  (hörbarhetsområde, örats känslighet, instrumentets längd), där eleven
  själv ska utreda vilka övertoner som är relevanta.
- Planering av ett experiment för ljudets hastighet eller tyngdaccelerationen
  med noggrannhet: upprepning, flera frekvenser eller längder, mätning över
  många perioder och en linjär modell.

### Kapitel 3: Elektromagnetism (magnetfält, partiklar i fält, induktion)

- Masspektrometer och hastighetsfilter med identifiering av isotop eller
  jon ur banradie, eller den flödestäthet som krävs för en given bana.
- Elektronstråle i ett elektriskt fält med avlänkningsvinkel, eller en
  partikel som går in snett mellan plattor och ska träffa ett hål.
- Hastighetsfilter med ändrade förutsättningar: vad som händer med
  snabbare partiklar, motsatt laddning eller tyngre joner, motiverat med
  krafternas storlek.
- Induktion i jordens fält där rätt komposant (inklinationen) måste väljas,
  och den maximala ems under ett fall.
- Fältsuperposition: punkter eller linjer där två ledares fält tar ut
  varandra, och kraft mellan ledare i olika geometrier.
- Transformatordesign där flera kombinationer av spolar ska utredas mot ett
  spänningsintervall och de möjliga lösningarna redovisas.
- Induktion ur en krökt flödesgraf (lutning i en punkt) eller ems som
  funktion av tiden för en roterande slinga.

### Kapitel 4: Ljus som våg och partikel (interferens, svartkropp, fotoner, atommodell)

- Experimentella värden på Plancks konstant och utträdesarbetet ur två eller
  flera mätpunkter.
- Energinivåer kombinerade med gitterspektrometer: våglängder ur vinklar,
  energinivåer ur dem, och ett resonemang om vilka övriga övergångar som syns
  eller inte syns.
- de Broglie-våglängd kopplad till accelerationsspänning och diffraktion i
  ett gitter eller en kristall.
- Fotonens rörelsemängd i en tillämpning: hastighetsändring per absorberad
  foton, antal absorptioner per sekund, inbromsningssträcka.
- Spektrumtolkning som kräver förståelse av kurvans form: varför en stjärna
  vars topp ligger utanför det synliga ändå har en färg, hur
  absorptionslinjer i ett uppmätt spektrum visar vilka grundämnen som finns.
- Gitter med överlappande ordningar: förhållandet mellan två våglängder vars
  maxima sammanfaller, högsta ordning för flera våglängder.

### Kapitel 5: Astronomi (universums struktur, avstånd, solens färg, svarta hål, stjärnbildning)

- Strålningsjämvikt: stjärnans effekt, intensiteten på ett avstånd, en
  planets temperatur i en enkel modell och en diskussion av modellens
  brister (växthuseffekt, reflektion).
- Massa hos en osynlig kropp (svart hål, exoplanetens stjärna) ur en
  omloppsbana, där omloppstiden och farten först ska ge radien.
- Rödförskjutning eller dopplereffekt i spektrallinjer: hastighet och
  riktning ur förskjutningen, kopplad till avstånd eller rotation.
- Wien och Stefan–Boltzmann tillsammans: stjärnans radie ur temperatur och
  utstrålad effekt, eller jämförelse mellan två stjärnor genom kvoter där
  okända storheter stryks.
- Avståndsbestämning (parallax, standardljuskälla med avståndskvadratlagen)
  där mätosäkerheten eller metodens giltighetsområde ska diskuteras.

## Idéer från den finska studentexamen

Den finska examen har längre, materialbaserade uppgifter som passar
Avancerad-nivån väl som förebild för arbetssätt (inte för scenarier):

- Mätdata i en tabell ska ritas, en rät linje anpassas och extrapoleras,
  och svaret ska motiveras med hänvisning till grafen.
- Ett påstående om en modells giltighet ska prövas (en linjär fjäderlag
  som inte kan gälla för mycket stora förlängningar, en modell som motsägs
  av ett mätresultat).
- Kraftfigurer där verkliga krafter och deras komposanter tydligt skiljs
  åt, och storhetsekvationer som motiveras ur figuren.
- Symboliska lösningar godtas och uppmuntras, men den lösta
  storhetsekvationen ska stå i redovisningen.
- Rimlighet och storleksordning: med vilken noggrannhet ett resultat är
  meningsfullt, vilken storleksordning en energi har.

## Kontrollfrågor före publicering

1. Grund: kan uppgiften lösas med ett samband (plus omvandling)? Annars
   Mellan.
2. Mellan: kräver den två eller tre samband, en tolkning eller en motiverad
   slutsats, men är vägen ändå i stort sett given? Då är den rätt.
3. Avancerad: finns det ett steg där eleven måste genomskåda strukturen
   (välja komposant, eliminera en obekant, kombinera två fält, bygga en
   modell, visa ett generellt samband)? Om inte, flytta den till Mellan.
4. Är scenariot eget, utan provens föremål, personer och tal?
5. Är varje led omräknat, och har varje deluppgift ett "Svar:"?
