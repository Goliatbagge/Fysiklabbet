# Kalibrering: Matematik nivå 2c (ma2c)

Måttstock för agenter som skriver nya övningar i `data/ovningar.js` för
Matematik nivå 2c på nivåerna Grund (level 1), Mellan (level 2) och
Avancerad (level 3). Grund ska motsvara uppgifter som ger E-poäng på de
nationella proven, Mellan C-poäng och Avancerad A-poäng.

## Underlag

Genomgånget 2026-11-15:

- Nationella prov Ma 2c: VT12, HT12, VT13, HT13, VT14, HT14, VT15, HT15,
  VT16, HT16, VT17, HT17, VT18 och VT22 (`NP/Matematik nivå 2c/`), med
  bedömningsanvisningarna för VT15, HT17 och VT22 lästa i detalj.
- Nationella prov Ma 2b (`NP/Matematik nivå 2b/`), stickprov VT13, HT15
  och VT17. Proven delar en stor del av uppgifterna med 2c; 2b saknar de
  mest abstrakta algebrauppgifterna men har samma sorts A-uppgifter i
  modellering, geometri och statistik.
- `data/np/ma2c-vt2018.js` och `data/np/ma2c-vt2022.js` (sajtens egna
  genomgångar av två av proven).
- `OVNINGAR.md` och de befintliga ma2c-övningarna i `data/ovningar.js`.

### Viktig iakttagelse om de befintliga övningarna

Alla 42 ma2c-avsnitt har i dag 3 + 2 + 1 uppgifter. De befintliga
level 3-uppgifterna motsvarar i praktiken **E- eller C-poäng**, inte
A-poäng: "rektangel med given omkrets och area, bestäm den längre sidan",
"efter hur lång tid har kulturen vuxit med 50 %", "en parallelltransversal,
bestäm den övre delen". Använd dem inte som förebild för Avancerad. De
befintliga level 2 ligger ofta på E-nivå. En ny Avancerad-uppgift ska vara
tydligt svårare än allt som står i avsnittet i dag.

### Hur proven är uppbyggda

- Provet ger cirka 45 till 66 poäng, fördelade ungefär en tredjedel var på
  E, C och A. För provbetyget A krävs knappt hälften av A-poängen.
- Delprov B: korta svar utan digitala verktyg, ofta 1 poäng. Här finns
  enpoängs A-uppgifter som prövar begreppsförståelse ("ge ett exempel på",
  "ange en linje som inte skär någon av graferna", "förenkla så långt som
  möjligt" med ett uttryck som kräver insikt).
- Delprov C: fullständiga lösningar utan digitala verktyg. A-uppgifterna här
  är oftast generella: konstanter i stället för tal, "visa att", "bestäm
  för vilka värden på a".
- Delprov D: fullständiga lösningar med digitala verktyg. A-uppgifterna här
  är oftast modellering i en verklig kontext (fontän, tyg, ram, pilkast) där
  eleven själv måste lägga in ett koordinatsystem och välja modell.
- A-uppgifter med fullständig lösning ger normalt 2 till 4 poäng. En
  fyrpoängare består typiskt av ansats (AM/APL), godtagbar fortsättning,
  korrekt svar och en kommunikationspoäng (AK).
- Förmågorna i bedömningen: B begrepp, P procedur, PL problemlösning,
  M modellering, R resonemang, K kommunikation. A-poängen är nästan alltid
  APL, AM, AR, AB eller AK; nästan aldrig AP (ren procedur) annat än i
  krävande förenklingar.

### Vad bedömningsanvisningarna kräver på de olika nivåerna

- **E**: "godtagbar ansats ... med i övrigt godtagbar lösning med korrekt
  svar". Ansatsen är att sätta in i rätt formel eller lösa ut en variabel.
- **C**: ansatsen är att tolka problemet och ställa upp rätt ekvation
  (förändringsfaktorn ur två mätvärden och ett antal år, likformighet ur
  figuren, ett ekvationssystem ur två villkor). Resonemang ska vara
  "välgrundat" och, när det är ett bevis, "slutfört generellt".
- **A**: ansatsen är själva insikten (avståndet mellan cirkelns medelpunkt
  och origo, att en standardavvikelse motsvarar två fack, att maximipunktens
  koordinater kan uttryckas i parametern). Resonemanget ska vara
  "välgrundat och nyanserat", och lösningen ska kommuniceras på A-nivå:
  fullständig, välstrukturerad, bara relevanta delar, korrekta symboler
  (⟺, ⟹, VL, HL, f(x)), definierade variabler, figur med införda
  beteckningar. Lösningar som bygger på specialfall godtas bara när
  uppgiften själv gör det möjligt, och "Prövning godtas inte" förekommer.

## Grund (E-poäng)

### Kännetecken

- Ett eller två tankesteg. Metoden framgår av uppgiften eller avsnittets
  rubrik; eleven behöver inte välja väg.
- Allt som behövs är givet med tal, ofta i den form metoden kräver
  (ekvationen redan på formen x² + px + q = 0, ekvationssystemet redan
  uppställt, formeln given i uppgiften).
- Typiska formuleringar: "Lös ekvationen med algebraisk metod", "Ange",
  "Bestäm", "Beräkna", "Lös ekvationssystemet", "Ange funktionens
  nollställen", "Läs av i figuren", "Svara exakt".
- Standardkontexter med enkel tolkning: ett pris per styck plus en fast
  avgift, en vinkel i en figur med en enda sats, en normalfördelning där
  gränsen ligger på ett helt antal standardavvikelser.
- Svaret är oftast ett tal eller ett enkelt uttryck. Resonemang på E-nivå
  är "enkelt": att visa att två linjer är parallella genom att jämföra
  lutningar, att motivera med en mening.

### Uppgiftstyper (beskrivna med egna ord)

1. Lös ett givet linjärt ekvationssystem med substitution eller addition,
   där koefficienterna redan är heltal och en variabel är lätt att lösa ut.
2. Ett vardagsproblem där ekvationssystemet redan är uppställt eller där
   variablerna redan är definierade; eleven löser och tolkar svaret.
3. Lös en andragradsekvation med *pq*-formeln eller nollproduktmetoden när
   den redan står på normalform eller faktoriserad form.
4. Utveckla eller faktorisera ett uttryck med en kvadreringsregel eller
   konjugatregeln i ett enda steg, eller ange vad som ska stå i en parentes
   för att en likhet ska gälla.
5. Läs av nollställen, symmetrilinje, extrempunkt eller ett funktionsvärde
   i en ritad parabel.
6. Bestäm en okänd konstant i en andragradsfunktion när en punkt på grafen
   är given, och använd symmetrin för att ange en annan punkt.
7. Beräkna en vinkel med vinkelsumman, vertikalvinklar eller
   randvinkelsatsen i en figur där en enda sats räcker.
8. Pythagoras sats eller likformighet med givna sidor i en figur där de
   motsvarande sidorna syns direkt.
9. Lös en exponentialekvation 10^x = a eller a^x = b exakt med lg, eller
   sätt in i en given logaritmisk formel (pH, ljudnivå, magnitud).
10. Beräkna medelvärde, median, kvartiler eller variationsbredd ur en liten
    datamängd; andel eller antal i en normalfördelning vid ett helt antal
    standardavvikelser från medelvärdet; avläs en regressionslinje.

### Vanliga fällor (för den som skriver)

- En Grund-uppgift får inte kräva att eleven själv väljer variabler och
  ställer upp två villkor; då är den Mellan.
- Undvik fula tal som gör en E-uppgift till en räknefälla utan att höja
  nivån; det ska vara rutin.
- Skriv inte en kontext som kräver tolkning av ett "inte" eller ett
  intervall; det hör till Mellan.

## Mellan (C-poäng)

### Kännetecken

- Flera steg, där eleven själv måste tolka situationen och ställa upp
  ekvationen, ekvationssystemet eller funktionen. Ofta en kedja av två
  samband (likformighet och sedan Pythagoras; förändringsfaktor och sedan
  tid).
- Uppgiften ger talen men inte metoden. Eleven ska känna igen vilken
  representation som behövs (graf, tabell, formel).
- Tolkning av graf eller tabell med olikheter ("för vilka x gäller att
  g(x) < 3"), skärning mellan parabel och linje, avläsning baklänges.
- Enklare generella inslag: en konstant som ska bestämmas så att ett villkor
  uppfylls ("för vilka värden på a har ekvationen två olika reella
  rötter"), förenkling av ett uttryck med insatta uttryck, "visa att" med
  ett kort men slutfört generellt resonemang (Fionas påstående om två tal
  med differensen 1 är typiskt C, inte A).
- Formuleringar: "Bestäm", "Beräkna den årliga procentuella ökningen",
  "Visa att", "Förklara varför", "Motivera ditt svar", "Teckna en ekvation
  med vars hjälp ... kan beräknas", "Bestäm för vilka värden på ...".
- Resonemanget ska vara välgrundat: alla steg motiverade, men det räcker
  med en lösningsväg och ett fall.

### Uppgiftstyper

1. Ett textproblem med två obekanta där eleven själv definierar variablerna,
   ställer upp systemet ur två villkor och tolkar lösningen.
2. Bestäm koefficienterna i en andragradsekvation när dess två lösningar är
   kända, eller bestäm konstanter så att en ekvation får en viss rot.
3. Bestäm för vilka värden på en konstant en andragradsekvation får två,
   en eller inga reella rötter (diskriminanten med en konstant i ett av
   leden).
4. Skärningspunkter mellan en parabel och en rät linje algebraiskt, eller
   lösning av en olikhet med hjälp av två ritade grafer.
5. Optimering där eleven tecknar en area- eller produktfunktion i en
   variabel och hittar maximum via symmetrilinjen eller nollställena.
6. Bestäm en andragradsfunktion ur grafen (nollställen och en punkt, eller
   extrempunkt och en punkt), eller ur en enkel beskrivning i ord.
7. Likformighet i två steg: först känna igen de likformiga trianglarna i en
   sammansatt figur, sedan teckna och lösa proportionen; topptriangelsatsen
   med en obekant på två ställen.
8. Exponentiell förändring ur två mätvärden: bestäm förändringsfaktorn och
   den årliga procentuella förändringen, eller tiden till en given nivå.
9. Logaritmlagarna: förenkla ett uttryck, visa ett närmevärde ur ett annat
   givet närmevärde, bestäm ett heltal ur en given logaritm.
10. Normalfördelning baklänges: bestäm medelvärdet eller standardavvikelsen
    ur en given andel; bestäm tre tal ur median, medelvärde och
    variationsbredd; tolka riktningskoefficienten i en regressionslinje.

### Vanliga fällor

- En lång kedja av insättningar där metoden är uppenbar är fortfarande
  Mellan, inte Avancerad (se demoteringstestet i `OVNINGAR.md`).
- Beräkningstyngd höjer inte nivån. Att logaritmera fram en exponent eller
  lösa ett system med obekväma tal är Mellan.
- Ett "visa att" med tal (visa att kvadratens area är 8 cm²) är Mellan om
  vägen är en enda likformighet; det blir A först när vägen inte är given
  eller när resultatet är generellt.

## Avancerad (A-poäng)

### Kännetecken

- **Okänd väg.** Uppgiften säger vad som ska bestämmas men inte hur, och
  den första och svåraste poängen ges för insikten som öppnar problemet:
  en hjälplinje, ett koordinatsystem, en variabel som gör villkoren till en
  ekvation, att maximipunkten kan skrivas som funktion av en parameter.
- **Generellt eller symboliskt.** Konstanter i stället för tal (a, b, c, k,
  m, s, R), svaret uttryckt i en parameter, "för alla", "undersök hur
  antalet ... beror på valet av a och b", "bestäm sambandet mellan A och B".
- **Modellering i ny kontext.** En verklig situation med figur där eleven
  själv lägger in axlar, väljer form på andragradsfunktionen (faktorform,
  vertexform), utnyttjar symmetri och sedan använder modellen för att svara
  på en fråga som inte är modellens egen (vilket fält pilen träffar, hur
  mycket tyg som går åt, ett generellt kostnadsuttryck).
- **Undersökande och nyanserade resonemang.** "Undersök", "Mellan vilka
  värden kan ... ligga", "Avgör", "Är det möjligt att". Svaret kräver att
  alla fall behandlas: både extremfallen, gränsfallen och en motivering
  till varför inget annat fall finns. Ett enda exempel räcker aldrig.
- **Bevis.** "Visa att" med en generell slutsats, gärna med ett villkor
  ("utan att använda randvinkelsatsen"). Varje steg ska motiveras med en
  namngiven sats eller definition, och slutsatsen ska följa för alla fall.
- **Kombination av kapitel.** Koordinatgeometri med andragradsfunktioner,
  logaritmer med räta linjer, likformighet med optimering, statistik med
  algebra.
- **Formuleringar:** "Visa att", "Undersök", "Bestäm ... uttryckt i ...",
  "Bestäm ett generellt uttryck för", "för vilka värden på", "Avgör",
  "Förklara varför", "Svara exakt och förenklat", "Prövning godtas inte".
- På delprov B finns enpoängs A-uppgifter som prövar en insikt utan
  uträkning: ett exempel som uppfyller två villkor samtidigt, en ekvation
  som ger ett system utan lösning, ett uttryck som förenklas med en regel
  baklänges. Sådana fungerar som Avancerad bara om insikten verkligen är
  icke-uppenbar; annars är de Mellan.

### Uppgiftstyper

1. Bestäm en andragradsfunktion som beskriver en verklig bana eller kant
   (vattenstråle, båge, tygkant, passbit) ur några mått i en figur, där
   eleven själv väljer origo och modellform, och använd sedan funktionen
   för att besvara en följdfråga i en annan punkt än de givna.
2. En parameterfamilj av parabler: bestäm kurvan som extrempunkterna följer
   när en koefficient varierar, eller de punkter som alla funktioner i
   familjen har gemensamma.
3. Antal lösningar eller skärningspunkter som funktion av en eller två
   konstanter, med fullständig fallindelning (två, en eller ingen) och
   villkoren uttryckta som olikheter.
4. Ett generellt kostnads- eller areauttryck i bokstäver, där okända
   enhetspriser först bestäms ur två fall med ett ekvationssystem och
   figurens geometri (gering, överlapp, ram) måste översättas till
   uttryck i bredd och längd.
5. Geometriskt bevis eller exakt beräkning i en sammansatt figur med
   cirklar och tangenter, där nyckeln är en hjälptriangel med radier och
   Pythagoras sats; svaret ges exakt med rotuttryck i en parameter.
6. Optimering i en figur där sambandet mellan variablerna först måste
   härledas ur likformighet eller en rät linjes ekvation (rektangel
   inskriven i en triangel, största rektangel under en linje).
7. Ett statistiskt "undersök": möjliga värden på medelvärdet ur ett
   lådagram, möjliga största värden ur medelvärde, median och
   variationsbredd, där både övre och nedre gräns ska motiveras.
8. Bevis om heltal eller uttryck: på varandra följande heltal, jämna och
   udda tal, ett uttryck som alltid är delbart eller alltid ett heltal,
   med fullständig algebraisk redovisning och slutsats för alla fall.
9. Logaritm- och exponentialekvationer där strukturen måste genomskådas:
   substitution av ett uttryck, logaritmering av båda led med två olika
   baser, skärningspunkt mellan två exponentialfunktioner med exakt och
   förenklat svar, ekvationssystem med logaritmer.
10. Normalfördelning i ny representation (en Galtonbräda, ett histogram med
    fack av halv standardavvikelses bredd) eller en motivering av varför
    två korrekta beräkningar ger olika medelvärden.

### Vanliga fällor

- **Det vanligaste felet är en "Avancerad" som egentligen är Mellan.** Om
  eleven kan läsa av metoden ur uppgiftstexten och sätta in tal i tur och
  ordning är uppgiften inte A, hur många steg den än har. Testa: vad är
  den första poängen? Är det en insikt eller en insättning?
- Fula tal, många decimaler eller en jobbig logaritmering gör inte en
  uppgift svårare på rätt sätt.
- Ge inte bort insikten i texten ("använd att maximipunkten ligger mitt
  mellan nollställena", "dra radien till tangeringspunkten"). Ge däremot
  gärna en figur med beteckningar, som proven gör.
- Ett "undersök" som har ett enda svar utan fallindelning är ingen
  A-uppgift. Det ska finnas något att undersöka.
- Ett generellt svar ska kunna kontrolleras: lägg in ett villkor på
  konstanterna (positiv, skild från noll) när svaret annars blir odefinierat.
- Fältet `answer.value` kräver ett tal. För bevis och generella svar:
  använd flerval med väl valda distraktorer (vanliga ofullständiga
  resonemang, ett specialfall som "bevis", ett fall som glömts bort) eller
  låt uppgiften sluta i ett kontrollerbart tal som följer av det generella
  resultatet. Lösningen ska ändå redovisa hela resonemanget på A-nivå.
- Lösningen ska kommuniceras på A-nivå: definierade variabler, figur med
  beteckningar, ⟺ mellan ekvivalenta led, motivering av varje sats och
  ett tydligt **Svar:**. Det är så eleven lär sig vad som ger AK.

## Kapitel för kapitel: vilka A-uppgifter proven brukar ha

Kapitlen följer `data/katalog.js`. Nivå 2b delar kapitel 1, 3, 4 och 6 och
de flesta avsnitten i kapitel 2 och 5 (se `MA2B_SPEC`). Uppgifter som
skrivs i ett delat avsnitt syns alltså även för 2b-elever: använd inte
rotekvationer eller logaritmer med andra baser än 10 utanför `ma2c-2.8`
och `ma2c-5.6`. Proven från Gy11 innehöll också komplexa tal, som inte
ingår i sajtens kurs; skriv inga uppgifter om dem.

### Kapitel 1: Linjära ekvationssystem

- Bestäm konstanter i ett ekvationssystem så att det har oändligt många
  lösningar, ingen lösning eller en given lösning; ange sambandet mellan
  två konstanter.
- Två linjer med konstanter (y = ax + 2 och en fast linje) som ska skära
  varandra i en viss kvadrant eller på en given tredje linje: undersök
  vilka värden konstanten kan ha.
- En linjär funktion bestämd ur två funktionella villkor (en differens av
  funktionsvärden och ett samband mellan två funktionsvärden) i stället för
  ur två punkter.
- Ett ekvationssystem med tre obekanta eller med logaritmer, där en
  substitution gör det linjärt.
- Ett modelleringsproblem där systemet ger enhetspriser som sedan används i
  ett generellt uttryck, eller där systemet måste kompletteras och tolkas
  (omkörning med olika medelhastighet, vilken storhet variablerna står för).

### Kapitel 2: Andragradsekvationer

- Lös en ekvation med en konstant (till exempel att x² minus ett kvadrerat
  uttryck i a ska vara noll) och svara på enklaste form.
- För vilka positiva värden på en konstant har en ekvation med konstanten
  på två ställen (både i x²- och x-termen) två reella rötter eller inga.
- Substitution: ett uttryck som upprepas i ekvationen behandlas som en ny
  variabel, gärna med en given hjälpekvation.
- Förenkling som kräver konjugatregeln baklänges på rotuttryck, eller
  algebra som visar att en räknare ger fel svar på en stor produkt.
- Textproblem som leder till en andragradsekvation via ett bråkuttryck
  (pris per meter och längd, fart och tid), där den negativa roten måste
  sorteras bort med motivering och prövning inte godtas.
- Exakt värde av ett uttryck som x² + 1/x² ur ett givet värde på x + 1/x
  (kvadrera och använd kvadreringsregeln).
- Rotekvation (bara i `ma2c-2.8`) där en rot är falsk och det ska
  motiveras.

### Kapitel 3: Andragradsfunktioner

- Modellering av en bana eller kant ur mått i en figur, följd av en fråga
  i en ny punkt (träffar pilen, hur högt är bågens yttersta del, hur
  mycket tyg går åt när styckena läggs omlott).
- En familj av funktioner där en koefficient varierar: extrempunkternas
  bana, gemensamma punkter, villkor för att sakna nollställen.
- Skärningspunkter mellan en parabel och en linje med bokstavskoefficienter:
  visa att en skärning ligger på y-axeln och uttryck den andra i
  konstanterna.
- Avstånd i y-led mellan två kurvor som funktion av x, och dess största
  värde.
- Optimering där sambandet mellan variablerna kommer från geometri
  (rektangel i triangel, tråd som delas mellan två figurer, definitionsmängd
  som ska motiveras).
- Grafiska olikheter med flera villkor samtidigt (båda funktionerna
  positiva, en dubbel olikhet mellan tre grafer) och en linje som inte
  skär någon av graferna.

### Kapitel 4: Geometri

- Bevis av en känd sats utan att använda den (Thales sats utan
  randvinkelsatsen), eller bevis att en sträcka är vinkelrät mot en annan
  med likbenta trianglar och vinkelsumma.
- Vinkelberäkning i en cirkel med inskriven triangel där en extra
  upplysning (en sida lika lång som radien, en diameter) måste översättas
  till en liksidig eller likbent triangel.
- Cirklar som tangerar varandra, en linje eller koordinataxlarna: radien
  uttryckt exakt i en parameter med hjälp av en hjälptriangel.
- Koordinatgeometri: cirkeln genom tre punkter, en liksidig triangels area
  uttryckt i en koordinat, längden av en sträcka mellan två punkter på en
  graf uttryckt i en parameter.
- Likformighet i sammansatta figurer med förlängda sträckor (en rektangel
  där en diagonal och en förlängd sida skär varandra), topptriangel och
  parallelltrapets med villkor på omkretsen.
- Jämförelse av båglängd och korda, eller area av ett område begränsat av
  halvcirklar, där resultatet ska visas generellt.
- Kordasatsen och inskrivna fyrhörningar: ett generellt samband som ska
  visas för alla lägen.

### Kapitel 5: Logaritmer

- Ekvationer där båda led logaritmeras eller där logaritmlagarna slår ihop
  flera termer, med exakt svar och kontroll av att argumentet är positivt.
- Skärningspunkt mellan två exponentialfunktioner med exakt och förenklat
  svar för båda koordinaterna.
- Exponentialfunktion bestämd ur en graf, följd av en fråga om lg f(x).
- Modell med två konstanter (C och k) där halveringstiden ger k och en
  procentandel ger tiden; byte av tidsenhet i en funktion (från månader
  till år) med generellt uttryck för den nya basen.
- Ett avsnitt av en logaritmisk skala (pH, magnitud, decibel) där frågan
  gäller ett förhållande mellan två lägen, så att konstanter tar ut
  varandra.
- Intervall för x ur en dubbel olikhet med lg, eller ett exempel på tal
  som uppfyller en logaritmlikhet.
- Logaritmer med andra baser (bara i `ma2c-5.6`): ekvationer med två
  baser och samband mellan log_a och lg.

### Kapitel 6: Statistik

- Mellan vilka värden kan medelvärdet ligga, givet ett lådagram och antalet
  observationer, eller givet avrundade värden; båda gränserna motiveras med
  extremfall.
- Bestäm de möjliga värdena på enskilda observationer ur median,
  medelvärde, variationsbredd och kvartiler (ett "undersök" med flera fall).
- Normalfördelning i en ny representation: fack, intervall av halva
  standardavvikelser, symmetri för att få ett okänt antal.
- Normalfördelning baklänges med ett nytt krav (vilket medelvärde behövs
  för att en viss andel ska ligga över en gräns), eller avgör vilka
  påståenden om en fördelning som är korrekta och motivera varför ett är
  fel.
- Förklara varför medelvärdet ur klassindelat material skiljer sig från
  det exakta, eller hur standardavvikelsen påverkas av att data ändras.
- Regression där modellerna jämförs: varför en linjär eller ren
  exponentiell modell inte håller över tid, val av modell med motivering,
  tolkning av riktningskoefficient och korrelation i sammanhanget.
