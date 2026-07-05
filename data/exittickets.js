// Exit tickets — kort förhör per avsnitt. Struktur:
//   window.EXITTICKETS[id] = [{ question, choices, correct, why }, ...]
//
// id är samma som teori-id ('fy1-2.3', 'fy2-4.1' …).
//
// Fält per fråga:
//   question — frågetext (markdown + KaTeX, dubbla backslash i JS-strängar)
//   choices  — 3–4 svarsalternativ (markdown-strängar)
//   correct  — 0-indexerat index för rätt alternativ
//   why      — array, SAMMA längd som choices: en förklaring per alternativ.
//              why[correct] förklarar varför alternativet är RÄTT; övriga
//              förklarar varför just det alternativet är FEL. När eleven
//              svarar fel visas förklaringen för det valda alternativet,
//              och därefter markeras det rätta alternativet med sin
//              förklaring.
//
// Innehållet är genererat per kapitel utifrån teorigenomgångarna i
// data/teori/*.md — beteckningar och enheter ska följa genomgången.
// Byggs/valideras med skripten i scratchpad (assemble.js, validate.js);
// redigera gärna enskilda frågor direkt här.

window.EXITTICKETS = {

// ── 01-fy1-ch1-8.js ───────────────────────────────────────────

'fy1-1.1': [
  {
    question: 'Vad menas med att fysiken beskriver **hur** något sker, men inte nödvändigtvis **varför**?',
    choices: [
      'Fysiken kan aldrig göra korrekta förutsägelser om naturen',
      'Fysiken handlar bara om varför saker existerar, inte om hur de beter sig',
      'Fysiken beskriver naturens beteende, men förklarar inte alltid den bakomliggande orsaken till att lagarna ser ut som de gör',
      'Fysiken är enbart en samling gissningar utan grund i experiment',
    ],
    correct: 2,
    why: [
      'Fysiken gör tvärtom mycket exakta förutsägelser — det är just genom att beskriva HUR naturen beter sig som fysiken kan förutsäga resultat av experiment.',
      'Det är tvärtom — fysiken fokuserar på att beskriva HUR något sker, inte nödvändigtvis VARFÖR.',
      'Fysiken beskriver mönster och samband i naturen (hur materia beter sig), men kan sällan förklara den djupare orsaken till varför naturlagarna ser ut precis som de gör.',
      'Fysikens lagar och teorier bygger på den naturvetenskapliga metoden med observationer och upprepade experiment, inte på lösa gissningar.',
    ],
  },
  {
    question: 'I vilken ordning genomförs stegen i den naturvetenskapliga metoden?',
    choices: [
      'Hypotesprövning → observation → hypotes → lagar och teorier',
      'Lagar och teorier → observation → hypotes → hypotesprövning',
      'Hypotes → observation → hypotesprövning → lagar och teorier',
      'Observation → hypotes → hypotesprövning → lagar och teorier',
    ],
    correct: 3,
    why: [
      'Man kan inte pröva en hypotes innan den ens har formulerats, och en hypotes kan inte formuleras innan man observerat något.',
      'Lagar och teorier är resultatet i slutet av processen, inte startpunkten — de bygger på observationer och prövade hypoteser.',
      'Man måste först observera något innan man kan gissa (hypotes) hur det ska förklaras — observationen kommer alltid först.',
      'Man observerar ett fenomen, gissar en förklaring (hypotes), testar gissningen med experiment (hypotesprövning), och om den håller kan den till slut bli en lag eller teori.',
    ],
  },
  {
    question: 'Vad krävs för att en hypotes ska övergå till att bli en lag?',
    choices: [
      'Att den har genomgått flera experiment utan att motbevisas',
      'Att en enskild forskare är övertygad om att den stämmer',
      'Att den publiceras i en tidning',
      'Att den är omöjlig att testa med experiment',
    ],
    correct: 0,
    why: [
      'Genomgår en hypotes flera experiment utan att motbevisas övergår den till att bli en lag — det är upprepad, oberoende prövning som ger tyngd.',
      'En enskild persons övertygelse räcker inte — den naturvetenskapliga metoden kräver att hypotesen testas oberoende, gärna av flera.',
      'Publicering i sig bevisar ingenting — det är experimentens resultat som avgör om hypotesen håller.',
      'Tvärtom måste en hypotes gå att testa med experiment för att den naturvetenskapliga metoden ska kunna tillämpas på den alls.',
    ],
  },
  {
    question: 'Varför använder fysiker ofta förenklade modeller istället för att beskriva verkligheten i fullständig detalj?',
    choices: [
      'Eftersom modeller alltid ger exakt rätt svar i varje situation',
      'Eftersom verkliga fenomen kan vara svåra att beskriva exakt, men en modell kan ändå stämma tillräckligt bra överens med det man observerar',
      'Eftersom lagar och teorier är förbjudna att använda i beräkningar',
      'Eftersom en modell är samma sak som en obekräftad hypotes',
    ],
    correct: 1,
    why: [
      'En modell är per definition en förenkling och ger därför sällan ett exakt svar i varje tänkbar situation — men den är tillräckligt bra för sitt syfte.',
      'Verkligheten är ofta för komplex för att beskrivas i minsta detalj, så man skapar en modell som är tillräckligt bra — en förenkling som stämmer väl nog överens med observationerna.',
      'Lagar och teorier är precis det man använder i beräkningar — modeller är ett komplement när verkligheten är för komplicerad att beskriva i detalj.',
      'En modell och en hypotes är olika saker: en hypotes är en gissning som ska prövas, medan en modell är en förenklad beskrivning som redan stämmer tillräckligt bra med observationer.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan hur ordet "teori" används i vardagligt tal jämfört med inom fysiken?',
    choices: [
      'Det finns ingen skillnad — orden betyder exakt samma sak i båda sammanhangen',
      'I vardagligt tal är en teori bevisad bortom allt tvivel, medan en fysikalisk teori bara är en gissning',
      'I vardagligt tal syftar "teori" ofta på en osäker gissning, medan en fysikalisk teori är väl belagd genom att den testats noggrant utan att motbevisas',
      'En fysikalisk teori gäller bara i matematiken, aldrig i den verkliga naturen',
    ],
    correct: 2,
    why: [
      'Orden skiljer sig kraftigt åt: vardagligt är en teori en gissning, medan en vetenskaplig teori är mycket väl underbyggd.',
      'Det är precis tvärtom: den vardagliga betydelsen är den osäkra, medan den fysikaliska teorin är den väl belagda.',
      'I vardagligt tal syftar ordet "teori" ofta på en osäker gissning, men en naturvetenskaplig teori har tvärtom testats noggrant genom upprepade experiment och aldrig motbevisats — den är därför mycket säker.',
      'En fysikalisk teori bygger på observationer av den verkliga naturen och beskriver hur naturen faktiskt beter sig, inte bara ett matematiskt påhitt.',
    ],
  },
],

'fy1-1.2': [
  {
    question: 'I meningen "sträckan är 2 500 meter", vad kallas talet 2 500?',
    choices: ['Storhet', 'Enhet', 'Mätetal', 'Prefix'],
    correct: 2,
    why: [
      'Storheten är själva egenskapen som mäts (här sträcka) — inte det numeriska värdet.',
      'Enheten är måttstorleken talet anges i (här meter) — inte själva talet.',
      'Det numeriska värdet som storheten anges med kallas mätetal — här är mätetalet 2 500.',
      'Ett prefix (som kilo eller milli) modifierar en enhet — det förekommer inte ens i den här meningen.',
    ],
  },
  {
    question: 'Hur många grundenheter består SI-enhetssystemet av?',
    choices: ['4', '9', '5', '7'],
    correct: 3,
    why: [
      'Fyra är för få — SI-systemet bygger på fler grundenheter än så.',
      'Nio är för många — SI-systemet har inte så många grundenheter.',
      'Fem är nästan rätt, men det saknas två stycken.',
      'SI-systemet bygger på sju grundenheter: meter, kilogram, sekund, ampere, kelvin, mol och candela.',
    ],
  },
  {
    question: 'Vilken är SI-grundenheten för temperatur?',
    choices: ['Kelvin (K)', 'Celsius (°C)', 'Fahrenheit (°F)', 'Joule (J)'],
    correct: 0,
    why: [
      'SI-grundenheten för temperatur är kelvin (K) enligt tabellen över SI-systemets sju grundenheter.',
      'Celsius är en vanlig temperaturskala i vardagen, men SI-grundenheten för temperatur är kelvin, inte celsius.',
      'Fahrenheit används i bland annat USA, men är inte en SI-enhet alls.',
      'Joule är enheten för energi, en helt annan storhet än temperatur.',
    ],
  },
  {
    question: 'En bil kör $s = 100\\ \\mathrm{m}$ på tiden $t = 5{,}0\\ \\mathrm{s}$. Vad blir medelfarten?',
    choices: [
      '$0{,}05\\ \\mathrm{m/s}$',
      '$20\\ \\mathrm{m/s}$',
      '$500\\ \\mathrm{m/s}$',
      '$2{,}0\\ \\mathrm{m/s}$',
    ],
    correct: 1,
    why: [
      'Det är resultatet av att dela tiden med sträckan ($t/s$) istället för sträckan med tiden — fel bråk upp och ner.',
      'Medelfarten fås av $v_\\mathrm{m} = s/t = 100\\ \\mathrm{m} / 5{,}0\\ \\mathrm{s} = 20\\ \\mathrm{m/s}$.',
      'Det är resultatet av att multiplicera sträcka och tid istället för att dela dem — fel räknesätt.',
      'Det är tio gånger för litet — kontrollera decimalplaceringen: $100/5 = 20$, inte $2,0$.',
    ],
  },
  {
    question: 'Vid multiplikation och division, hur många värdesiffror ska svaret avrundas till?',
    choices: [
      'Alltid till exakt två värdesiffror',
      'Till samma antal decimaler som det tal som har minst antal decimaler',
      'Till så många värdesiffror man själv tycker ser lagom ut',
      'Till samma antal värdesiffror som det tal som har minst antal värdesiffror',
    ],
    correct: 3,
    why: [
      'Antalet värdesiffror beror på indatan i just den uppgiften — det är inte alltid två.',
      'Den regeln (minsta antal decimaler) gäller för addition och subtraktion, inte för multiplikation och division.',
      'Värdesiffror följer en bestämd regel, inte en känsla för vad som "ser lagom ut".',
      'Vid multiplikation och division ges antalet värdesiffror i svaret av det tal som har minst antal värdesiffror.',
    ],
  },
  {
    question: 'Vilket prefix motsvarar tiopotensen $10^{9}$?',
    choices: ['mega (M)', 'tera (T)', 'giga (G)', 'kilo (k)'],
    correct: 2,
    why: [
      'Mega motsvarar $10^{6}$, inte $10^{9}$.',
      'Tera motsvarar $10^{12}$ — ett steg för stort.',
      'Giga motsvarar $10^{9}$, som till exempel i gigabyte.',
      'Kilo motsvarar bara $10^{3}$ — sex tiopotenser för litet.',
    ],
  },
],

'fy1-1.3': [
  {
    question: 'Vilken formel gäller för medelfart?',
    choices: [
      '$v_\\mathrm{m} = t/s$',
      '$v_\\mathrm{m} = s \\cdot t$',
      '$v_\\mathrm{m} = s + t$',
      '$v_\\mathrm{m} = s/t$',
    ],
    correct: 3,
    why: [
      'Det är bråket upp och ner — det ger enheten s/m, inte m/s.',
      'Sträcka gånger tid ger inte en fart — enheterna skulle bli m·s, inte m/s.',
      'Sträcka plus tid går inte ens att addera, eftersom de har olika enheter.',
      'Medelfarten definieras som sträckan delat med tiden, $v_\\mathrm{m} = s/t$.',
    ],
  },
  {
    question: 'Vad ska man göra för att omvandla en hastighet angiven i km/h till m/s?',
    choices: [
      'Multiplicera med 3,6',
      'Dividera med 3,6',
      'Multiplicera med 1 000',
      'Dividera med 60',
    ],
    correct: 1,
    why: [
      'Att multiplicera med 3,6 går åt andra hållet — det omvandlar m/s till km/h.',
      'För att gå från km/h till m/s ska man dividera med omvandlingsfaktorn 3,6.',
      '1 000 används för att omvandla km till m, men täcker inte hela omvandlingen mellan km/h och m/s (som även involverar timmar och sekunder).',
      '60 är antal minuter i en timme (eller sekunder i en minut) — det är inte den fullständiga omvandlingsfaktorn mellan km/h och m/s.',
    ],
  },
  {
    question: 'En cyklist kör i $18\\ \\mathrm{km/h}$. Hur fort är det i m/s?',
    choices: [
      '$5{,}0\\ \\mathrm{m/s}$',
      '$1{,}8\\ \\mathrm{m/s}$',
      '$50\\ \\mathrm{m/s}$',
      '$64{,}8\\ \\mathrm{m/s}$',
    ],
    correct: 0,
    why: [
      '$18\\ \\mathrm{km/h} / 3{,}6 = 5{,}0\\ \\mathrm{m/s}$.',
      'Det är tio gånger för litet — kontrollera decimalplaceringen i divisionen $18/3{,}6$.',
      'Det är tio gånger för stort — troligen har talet multiplicerats istället för att divideras.',
      'Det är resultatet av att multiplicera med 3,6 istället för att dividera — fel räkneriktning för km/h till m/s.',
    ],
  },
  {
    question: 'Ett tåg kör i $15\\ \\mathrm{m/s}$. Hur fort är det i km/h?',
    choices: [
      '$4{,}2\\ \\mathrm{km/h}$',
      '$54\\ \\mathrm{km/h}$',
      '$150\\ \\mathrm{km/h}$',
      '$15\\ \\mathrm{km/h}$',
    ],
    correct: 1,
    why: [
      'Det är resultatet av att dela med 3,6 istället för att multiplicera — fel räkneriktning för m/s till km/h.',
      '$15\\ \\mathrm{m/s} \\cdot 3{,}6 = 54\\ \\mathrm{km/h}$.',
      'Det är tio gånger för stort — kontrollera decimalplaceringen i multiplikationen $15 \\cdot 3{,}6$.',
      'Talet i m/s kan inte vara samma tal som i km/h — enheterna motsvarar olika stora "steg", så omvandlingsfaktorn 3,6 måste räknas in.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan medelfart och medelhastighet?',
    choices: [
      'Ingen skillnad — orden betyder exakt samma sak',
      'Fart mäts i km/h och hastighet mäts alltid i m/s',
      'Fart är en skalär storhet (bara storlek), medan hastighet är en vektorstorlek (storlek och riktning)',
      'Hastighet används bara för fordon, fart används för allt annat',
    ],
    correct: 2,
    why: [
      'Genomgången skriver uttryckligen att medelfart och medelhastighet INTE är samma sak.',
      'Både fart och hastighet kan anges i antingen m/s eller km/h — skillnaden ligger inte i vilken enhet som används.',
      'Fart beskriver bara hur snabbt något rör sig (skalär), medan hastighet dessutom har en riktning (vektor).',
      'Skillnaden handlar om storlek kontra storlek-och-riktning, inte om vilken typ av föremål som rör sig.',
    ],
  },
],

'fy1-1.4': [
  {
    question: 'Vilken formel gäller för densitet?',
    choices: [
      '$\\rho = V/m$',
      '$\\rho = m/V$',
      '$\\rho = m \\cdot V$',
      '$\\rho = m + V$',
    ],
    correct: 1,
    why: [
      'Det är bråket upp och ner — det skulle ge enheten m³/kg, inte kg/m³.',
      'Densitet definieras som massa delat med volym, $\\rho = m/V$.',
      'Massa gånger volym ger inte densitet — enheterna skulle bli kg·m³, inte kg/m³.',
      'Massa plus volym går inte att addera, eftersom de har olika enheter.',
    ],
  },
  {
    question: 'Vad är omvandlingsfaktorn mellan kg/m³ och g/cm³?',
    choices: ['$10$', '$100$', '$1\\,000\\,000$', '$1\\,000$'],
    correct: 3,
    why: [
      '10 är alldeles för litet — skillnaden mellan kg/m³ och g/cm³ är mycket större än en faktor 10.',
      '100 är fortfarande för litet för denna omvandling.',
      'Det är för stort — det är kvadraten på den faktiska omvandlingsfaktorn.',
      'Omvandlingsfaktorn mellan kg/m³ och g/cm³ är 1 000: man dividerar med 1 000 för att gå från kg/m³ till g/cm³.',
    ],
  },
  {
    question: 'Vad är ungefär vattnets densitet?',
    choices: [
      '$1\\ \\mathrm{kg/m^3}$',
      '$1\\,000\\ \\mathrm{kg/m^3}$',
      '$10\\,000\\ \\mathrm{kg/m^3}$',
      '$100\\ \\mathrm{kg/m^3}$',
    ],
    correct: 1,
    why: [
      'Det är tusen gånger för litet — vatten är betydligt tätare än så.',
      'Vattnets densitet är ungefär $1\\,000\\ \\mathrm{kg/m^3}$, vilket innebär att $1,0$ liter vatten väger $1,0\\ \\mathrm{kg}$.',
      'Det är tio gånger för stort — så tät är inte ens många metaller.',
      'Det är tio gånger för litet jämfört med vattnets faktiska densitet.',
    ],
  },
  {
    question: 'En kloss har massan $m = 4{,}0\\ \\mathrm{kg}$ och volymen $V = 0{,}0020\\ \\mathrm{m^3}$. Vad är dess densitet?',
    choices: [
      '$2\\,000\\ \\mathrm{kg/m^3}$',
      '$200\\ \\mathrm{kg/m^3}$',
      '$0{,}0005\\ \\mathrm{kg/m^3}$',
      '$8{,}0\\ \\mathrm{kg/m^3}$',
    ],
    correct: 0,
    why: [
      '$\\rho = m/V = 4{,}0\\ \\mathrm{kg} / 0{,}0020\\ \\mathrm{m^3} = 2\\,000\\ \\mathrm{kg/m^3}$.',
      'Det är tio gånger för litet — kontrollera decimalplaceringen i divisionen.',
      'Det är resultatet av att dela volymen med massan ($V/m$) istället för massan med volymen — fel bråk upp och ner.',
      'Det är resultatet av att multiplicera massa och volym istället för att dela dem — fel räknesätt.',
    ],
  },
  {
    question: 'Vilket av dessa ämnen har lägst densitet av alla fasta ämnen, enligt genomgången?',
    choices: ['Bly', 'Guld', 'Aerogel', 'Osmium'],
    correct: 2,
    why: [
      'Bly har en förhållandevis hög densitet, ungefär hälften av osmiums.',
      'Guld har densiteten $19\\ \\mathrm{g/cm^3}$ — en av de högsta bland vanliga metaller, inte den lägsta.',
      'Aerogel är det fasta ämnet med lägst densitet, $0{,}0011\\ \\mathrm{g/cm^3}$ — så lätt att det nästan känns som luft.',
      'Osmium har istället den HÖGSTA densiteten bland de fasta grundämnena.',
    ],
  },
  {
    question: 'Vilket fast grundämne har enligt genomgången högst densitet?',
    choices: ['Osmium', 'Guld', 'Bly', 'Neutronstjärna'],
    correct: 0,
    why: [
      'Osmium har densiteten $22\\ \\mathrm{g/cm^3}$, det högsta bland de fasta grundämnena.',
      'Guld har densiteten $19\\ \\mathrm{g/cm^3}$, vilket är högt men ändå lägre än osmiums $22\\ \\mathrm{g/cm^3}$.',
      'Bly ligger på ungefär hälften av osmiums densitet.',
      'En neutronstjärna är varken ett grundämne eller ett fast ämne i vanlig mening — den har visserligen universums högsta densitet, men frågan gäller fasta grundämnen.',
    ],
  },
],

'fy1-8.1': [
  {
    question: 'Vad visade Michelson och Morleys experiment 1887?',
    choices: [
      'Att ljusets hastighet i vakuum är densamma oavsett hur ljuskälla och observatör rör sig relativt varandra',
      'Att ljusets hastighet beror på i vilken riktning jorden rör sig',
      'Att ljus inte kan färdas genom vakuum',
      'Att ljusets hastighet ökar med avståndet från solen',
    ],
    correct: 0,
    why: [
      'Experimentet visade att ljus skickat både med och mot jordens rörelse fick samma uppmätta hastighet — ljusets hastighet i vakuum är konstant.',
      'Experimentet visade tvärtom att ljusets hastighet INTE berodde på jordens rörelseriktning — resultatet blev detsamma åt båda hållen.',
      'Experimentet handlade om ljus som redan färdas genom vakuum (och luft) — det visade inget om att ljus inte kunde göra det.',
      'Experimentet mätte ljusets hastighet i två riktningar på jorden, inte hur hastigheten förändras med avstånd till solen.',
    ],
  },
  {
    question: 'Ett rymdskepp rör sig i 70 % av ljusets hastighet och slår på strålkastarna. Med vilken hastighet träffar ljuset dig, oavsett om skeppet rör sig mot eller från dig?',
    choices: [
      '$0{,}70 c$ om skeppet rör sig mot dig, $1{,}70 c$ om det rör sig från dig',
      '$1{,}70 c$ om skeppet rör sig mot dig, $0{,}30 c$ om det rör sig från dig',
      '$c$, oavsett skeppets rörelseriktning',
      '$0{,}30 c$ om skeppet rör sig mot dig, $0{,}70 c$ om det rör sig från dig',
    ],
    correct: 2,
    why: [
      'Ljusets hastighet adderas inte till skeppets hastighet — det är precis den klassiska tanken som Michelson–Morleys experiment motbevisade.',
      'Ljusets hastighet är konstant och beror inte alls på skeppets rörelse — den blir varken högre eller lägre än $c$.',
      'Ljusets hastighet i vakuum är alltid densamma, $c$, oavsett hur ljuskällan (rymdskeppet) rör sig i förhållande till dig.',
      'Detta bygger på klassisk hastighetsaddition, vilket inte stämmer för ljus — ljusets hastighet förblir $c$ oavsett rörelseriktning.',
    ],
  },
  {
    question: 'Vad kallas fenomenet att tiden går långsammare för ett föremål som rör sig nära ljusets hastighet, sett från en stillastående observatör?',
    choices: ['Längdkontraktion', 'Relativistisk massa', 'Dopplereffekt', 'Tidsdilatation'],
    correct: 3,
    why: [
      'Längdkontraktion handlar om att föremålet blir kortare i rörelseriktningen, inte om att tiden förändras.',
      'Relativistisk massa handlar om att massan ökar vid hög hastighet, inte om tidens gång.',
      'Dopplereffekten handlar om hur vågors frekvens förändras på grund av relativrörelse, inte om att tiden går olika fort.',
      'Det kallas tidsdilatation — ju fortare ett föremål rör sig i rummet, desto långsammare rör det sig i tiden.',
    ],
  },
  {
    question: 'Vad kallas fenomenet att ett föremål blir kortare i rörelseriktningen när det rör sig nära ljusets hastighet?',
    choices: ['Tidsdilatation', 'Längdkontraktion', 'Relativistisk massa', 'Egentid'],
    correct: 1,
    why: [
      'Tidsdilatation handlar om att tiden går långsammare, inte om att föremålet krymper i längd.',
      'Det kallas längdkontraktion — föremålet blir kortare i just rörelsens riktning.',
      'Relativistisk massa handlar om att massan ökar vid hög hastighet, inte om föremålets längd.',
      'Egentid är tiden mätt av en observatör i samma rörelsesystem som förloppet, inte ett namn på en längdförändring.',
    ],
  },
  {
    question: 'En buss rör sig i 87 % av ljusets hastighet. Enligt genomgången blir sambandet mellan tiden $t$ för en observatör utanför bussen och egentiden $t_0$ för passageraren ombord ungefär',
    choices: [
      '$t \\approx t_0$ (ingen skillnad)',
      '$t \\approx 0{,}5 \\cdot t_0$',
      '$t \\approx 2 \\cdot t_0$',
      '$t \\approx 87 \\cdot t_0$',
    ],
    correct: 2,
    why: [
      'Vid så hög hastighet som 87 % av ljusets hastighet blir skillnaden allt annat än försumbar.',
      'Tiden för observatören går snabbare än för passageraren, inte hälften så fort — förhållandet blir tvärtom större än 1.',
      'Insättning av $v = 0{,}87 c$ i tidsdilatationsformeln ger $t \\approx 2 \\cdot t_0$ — observatörens klocka tickar dubbelt så fort som passagerarens.',
      'Det skulle innebära en orimligt stor tidsskillnad — hastighetens andel av ljushastigheten (87 %) ska sättas in i formeln, inte användas direkt som en multiplikator.',
    ],
  },
  {
    question: 'Vad innebär Einsteins formel $E = m \\cdot c^2$?',
    choices: [
      'Att energi och massa är helt oberoende av varandra',
      'Att energi minskar när massan ökar',
      'Att formeln bara gäller för ljuspartiklar, aldrig för vanlig materia',
      'Att massa kan omvandlas till mycket stora mängder energi, eftersom ljusets hastighet $c$ är ett så stort tal',
    ],
    correct: 3,
    why: [
      'Formeln visar tvärtom att massa OCH energi hänger ihop — massa är i grunden en form av energi.',
      'Formeln visar ett positivt samband — mer massa innebär mer energi, inte mindre.',
      'Formeln gäller massa i allmänhet, inte bara ljuspartiklar (fotoner har för övrigt ingen vilomassa).',
      'Eftersom $c$ (ljusets hastighet) är ett väldigt stort tal som dessutom kvadreras, innebär formeln att även en liten massa motsvarar en enorm mängd energi.',
    ],
  },
],

// ── 02-fy1-ch2.js ─────────────────────────────────────────────

'fy1-2.1': [
  {
    question: 'En cyklist kör 6,0 m rakt österut och sedan 8,0 m rakt norrut. Vad blir cyklistens sträcka respektive förflyttning?',
    choices: [
      'Sträcka 14 m, förflyttning 10 m',
      'Sträcka 10 m, förflyttning 14 m',
      'Sträcka 14 m, förflyttning 14 m',
      'Sträcka 2,0 m, förflyttning 10 m',
    ],
    correct: 0,
    why: [
      'Sträckan är den sammanlagda väglängden $6{,}0+8{,}0=14\\ \\mathrm{m}$, och förflyttningen är det raka avståndet mellan start och mål: $\\sqrt{6{,}0^2+8{,}0^2}=\\sqrt{100}=10\\ \\mathrm{m}$.',
      'Sträcka och förflyttning är utbytta här — sträckan är den totala väglängden ($14\\ \\mathrm{m}$) och förflyttningen är det raka avståndet mellan start och mål ($10\\ \\mathrm{m}$).',
      '$14\\ \\mathrm{m}$ stämmer för sträckan, men förflyttningen blir kortare så fort vägen inte är rak. Här ger Pythagoras sats förflyttningen $10\\ \\mathrm{m}$, inte $14\\ \\mathrm{m}$.',
      '$2{,}0\\ \\mathrm{m}$ är bara skillnaden mellan de två sträckdelarna. Förflyttningen är det raka avståndet mellan start och mål, vilket beräknas med Pythagoras sats.',
    ],
  },
  {
    question: 'Vilken av dessa storheter är en vektor?',
    choices: ['Kraft', 'Fart', 'Massa', 'Tid'],
    correct: 0,
    why: [
      'Kraft har både storlek och riktning och är därför en vektor, precis som hastighet, förflyttning och acceleration.',
      'Fart är hastighetens storlek utan riktning — den är en skalär, till skillnad från hastighet som också anger riktning.',
      'Massa har bara ett storleksvärde och ingen riktning, så den är en skalär.',
      'Tid har bara ett storleksvärde och ingen riktning, så den är en skalär.',
    ],
  },
  {
    question: 'Vad kallas tekniken att flytta en vektor parallellt med sig själv (utan att ändra dess storlek eller riktning) när man adderar flera vektorer geometriskt?',
    choices: ['Projektion', 'Skalning', 'Parallellförflyttning', 'Vektorsubtraktion'],
    correct: 2,
    why: [
      'Projektion innebär att dela upp en vektor i komposanter längs givna riktningar — det är inte samma sak som att flytta en hel vektor vid addition.',
      'Skalning skulle innebära att ändra vektorns storlek, men vid vektoraddition flyttas vektorerna utan att deras storlek eller riktning ändras.',
      'Man flyttar nästa vektor så att den startar där föregående slutar, utan att ändra dess storlek eller riktning — det kallas parallellförflyttning.',
      'Vektorsubtraktion är en annan räkneoperation (att dra bort en vektor). Tekniken att flytta vektorer inför addition heter parallellförflyttning.',
    ],
  },
  {
    question: 'En person går med farten 1,0 m/s i samma riktning som en rulltrappa som rör sig med farten 2,0 m/s. Vad blir personens hastighet relativt marken?',
    choices: ['2,0 m/s', '3,0 m/s', '1,0 m/s', '−1,0 m/s'],
    correct: 1,
    why: [
      '2,0 m/s är bara rulltrappans fart. Personens egen fart måste också räknas med eftersom båda rör sig åt samma håll.',
      'Båda hastigheterna är riktade åt samma håll och får då samma tecken, så de adderas: $1{,}0+2{,}0=3{,}0\\ \\mathrm{m/s}$.',
      '1,0 m/s är bara personens egen fart relativt rulltrappan. Rulltrappans fart måste läggas till eftersom de rör sig åt samma håll.',
      'Minustecken används när hastigheterna är riktade åt motsatt håll. Här rör sig personen och rulltrappan åt samma håll, så båda är positiva.',
    ],
  },
  {
    question: 'En flod forsar fram med farten 5,0 m/s. David simmar med farten 2,0 m/s rakt mot strömmen (motsatt riktning mot floden). Vad blir Davids fart relativt marken?',
    choices: [
      '7,0 m/s, i flodens riktning',
      '2,0 m/s, i flodens riktning',
      '3,0 m/s, mot flodens riktning',
      '3,0 m/s, i flodens riktning',
    ],
    correct: 3,
    why: [
      '7,0 m/s hade gällt om David simmat med strömmen (samma riktning som floden), då hastigheterna adderas rakt av. Här simmar han mot floden.',
      '2,0 m/s är bara Davids egen fart mot strömmen. Flodens fart måste räknas med eftersom den påverkar rörelsen relativt marken.',
      'Beloppet 3,0 m/s stämmer, men riktningen blir flodens riktning, inte motsatt, eftersom flodens fart (5,0 m/s) är större än Davids motriktade fart (2,0 m/s).',
      'David simmar mot floden, så hans fart får motsatt tecken: $5{,}0+(-2{,}0)=3{,}0\\ \\mathrm{m/s}$. Eftersom flodens fart är störst blir nettorörelsen i flodens riktning.',
    ],
  },
],

'fy1-2.2': [
  {
    question: 'I ett s-t-diagram markeras en sekant genom två punkter på grafen. Vad motsvarar sekantens lutning?',
    choices: ['Medelhastigheten', 'Momentanhastigheten', 'Accelerationen', 'Sträckan'],
    correct: 0,
    why: [
      'En sekants lutning mellan två punkter på en s-t-graf ger just medelhastigheten under det intervallet, $v_m = \\Delta s/\\Delta t$.',
      'Momentanhastigheten ges istället av tangentens lutning i en enskild punkt, inte av en sekant genom två punkter.',
      'Accelerationen avläses inte i ett s-t-diagram utan i ett v-t-diagram, där lutningen motsvarar hastighetsändringen per tid.',
      'Sträckan är den totala väglängden och avläses direkt på y-axeln (om start är noll) — den beräknas inte som en lutning.',
    ],
  },
  {
    question: 'Vad motsvarar tangentens lutning i en given punkt på en s-t-graf?',
    choices: ['Medelhastigheten', 'Momentanhastigheten', 'Medelaccelerationen', 'Förflyttningen'],
    correct: 1,
    why: [
      'Medelhastigheten ges av en sekants lutning mellan två punkter, inte av tangenten i en enda punkt.',
      'Tangentens lutning i en punkt ger den exakta hastigheten just då — momentanhastigheten.',
      'Acceleration avläses i ett v-t-diagram, inte som en tangent i ett s-t-diagram.',
      'Förflyttningen avläses direkt som ett värde på y-axeln (skillnaden i läge), inte som en lutning.',
    ],
  },
  {
    question: 'En löpares läge är $s_1 = 10\\ \\mathrm{m}$ vid $t_1 = 2{,}0\\ \\mathrm{s}$ och $s_2 = 30\\ \\mathrm{m}$ vid $t_2 = 6{,}0\\ \\mathrm{s}$. Vad är löparens medelhastighet under intervallet?',
    choices: ['5,0 m/s', '4,0 m/s', '8,0 m/s', '20 m/s'],
    correct: 0,
    why: [
      '$v_m = \\dfrac{\\Delta s}{\\Delta t} = \\dfrac{30-10}{6{,}0-2{,}0} = \\dfrac{20}{4{,}0} = 5{,}0\\ \\mathrm{m/s}$.',
      '4,0 m/s fås om man råkar dividera med fel tal. Rätt är $\\Delta s/\\Delta t = 20/4{,}0 = 5{,}0\\ \\mathrm{m/s}$.',
      '8,0 m/s stämmer inte — kontrollera att både täljare ($\\Delta s = 20\\ \\mathrm{m}$) och nämnare ($\\Delta t = 4{,}0\\ \\mathrm{s}$) är differenser, inte enskilda värden.',
      '20 m/s glömmer att dela med tidsintervallet $\\Delta t$. 20 m är bara $\\Delta s$, inte medelhastigheten.',
    ],
  },
  {
    question: 'I ett s-t-diagram med konstant hastighet, vad innebär en brantare lutning hos den räta linjen?',
    choices: ['Lägre hastighet', 'Negativ hastighet', 'Konstant nollhastighet', 'Högre hastighet'],
    correct: 3,
    why: [
      'Tvärtom — en brantare lutning innebär en högre hastighet, inte lägre.',
      'En negativ lutning (nedåtgående linje) betyder att läget minskar, inte att lutningen är extra brant.',
      'En vågrät linje (ingen lutning alls) betyder nollhastighet — en brant linje betyder tvärtom en hög hastighet.',
      'Ju brantare lutning en rät linje i ett s-t-diagram har, desto högre är hastigheten, eftersom lutningen motsvarar $\\Delta s/\\Delta t$.',
    ],
  },
  {
    question: 'Vilken enhet har medelhastigheten $v_m$ när förflyttning mäts i meter och tid i sekunder?',
    choices: ['m', 'm/s²', 'm/s', 's/m'],
    correct: 2,
    why: [
      'Meter är enheten för förflyttning ($\\Delta s$) i sig, inte för medelhastigheten som är förflyttning delat med tid.',
      'm/s² är enheten för acceleration, inte hastighet.',
      'Medelhastigheten $v_m = \\Delta s/\\Delta t$ får enheten m/s, meter delat med sekund.',
      's/m är enheten upp-och-ner — man delar $\\Delta s$ (m) med $\\Delta t$ (s), inte tvärtom.',
    ],
  },
],

'fy1-2.3': [
  {
    question: 'Vilken SI-enhet har acceleration, och vilken sorts storhet är det?',
    choices: ['m/s, skalär', 'm, vektor', 'm/s², vektor', 'm/s², skalär'],
    correct: 2,
    why: [
      'm/s är enheten för hastighet, inte acceleration. Acceleration mäts i m/s² (meter per sekund i kvadrat).',
      'Enheten meter (m) är fel — det är sträcka/förflyttning som mäts i meter. Acceleration mäts i m/s².',
      'Acceleration mäts i m/s² och är en vektorstorhet, precis som hastighet och kraft, eftersom den har både storlek och riktning.',
      'm/s² stämmer för enheten, men acceleration är en vektor (den har en riktning), inte en skalär.',
    ],
  },
  {
    question: 'Vad innebär det om ett föremåls acceleration är negativ?',
    choices: ['Hastigheten minskar', 'Hastigheten ökar', 'Hastigheten är konstant', 'Föremålet står stilla'],
    correct: 0,
    why: [
      'En negativ acceleration innebär att hastigheten minskar — det kallas även retardation eller inbromsning.',
      'En ökande hastighet svarar mot en positiv acceleration, inte en negativ.',
      'Konstant hastighet svarar mot en acceleration som är noll, inte negativ.',
      'Ett stillastående föremål har hastigheten noll, men det säger inget om accelerationens tecken. En negativ acceleration betyder att hastigheten minskar.',
    ],
  },
  {
    question: 'Vad kallas en negativ acceleration (en inbromsning) med ett annat ord?',
    choices: ['Momentanhastighet', 'Medelacceleration', 'Fritt fall', 'Retardation'],
    correct: 3,
    why: [
      'Momentanhastighet är den exakta hastigheten vid en tidpunkt — inte samma sak som en inbromsning.',
      'Medelacceleration är den genomsnittliga accelerationen under ett tidsintervall — den kan vara både positiv och negativ, men är inget särskilt ord för just en inbromsning.',
      'Fritt fall är rörelsen hos ett föremål som bara påverkas av tyngdkraften — det är inte ett annat ord för inbromsning.',
      'En negativ acceleration, det vill säga en inbromsning, kallas även retardation.',
    ],
  },
  {
    question: 'En bil ökar hastigheten från $v_1 = 10\\ \\mathrm{m/s}$ till $v_2 = 22\\ \\mathrm{m/s}$ på 4,0 s. Vad är bilens medelacceleration?',
    choices: ['5,5 m/s²', '3,0 m/s²', '8,0 m/s²', '2,0 m/s²'],
    correct: 1,
    why: [
      '5,5 m/s² fås om man råkar dela hastigheten (22) med tiden (4,0) utan att först subtrahera $v_1$. Man ska använda hastighetsändringen $\\Delta v$, inte $v_2$ direkt.',
      '$a_m = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{22-10}{4{,}0} = \\dfrac{12}{4{,}0} = 3{,}0\\ \\mathrm{m/s^2}$.',
      '8,0 m/s² stämmer inte med formeln — det är skillnaden i hastighet (12 m/s), inte kvoten, som ska divideras med tiden.',
      '2,0 m/s² blir för lågt — kontrollera uträkningen: $\\Delta v = 22-10=12\\ \\mathrm{m/s}$, delat med $\\Delta t = 4{,}0\\ \\mathrm{s}$.',
    ],
  },
  {
    question: 'Vilket värde på tyngdaccelerationen *g* används normalt i fysikuppgifter i Sverige, om inget annat anges?',
    choices: ['10 m/s²', '9,78 m/s²', '9,82 m/s²', '9,83 m/s²'],
    correct: 2,
    why: [
      '10 m/s² är en grov avrundning som ibland används i andra sammanhang, men i den här kursen används det mer exakta värdet för Sverige.',
      '9,78 m/s² är tyngdaccelerationen vid ekvatorn, inte i Sverige.',
      'I Sverige används $g = 9{,}82\\ \\mathrm{m/s^2}$ som standardvärde när inget annat anges.',
      '9,83 m/s² är tyngdaccelerationen vid polerna, inte i Sverige.',
    ],
  },
  {
    question: 'Två föremål med olika massa släpps samtidigt i fritt fall, helt utan luftmotstånd. Vad gäller om deras hastigheter under fallet?',
    choices: [
      'Det tyngre föremålet faller snabbare',
      'Det lättare föremålet faller snabbare',
      'Det beror på föremålens form',
      'Båda faller med exakt samma hastighet vid varje tidpunkt',
    ],
    correct: 3,
    why: [
      'Det är en vanlig missuppfattning från vardagen (där luftmotstånd spelar in), men i fritt fall utan luftmotstånd spelar massan ingen roll.',
      'Massan påverkar inte tyngdaccelerationen i fritt fall — utan luftmotstånd faller alla föremål lika fort oavsett massa.',
      'Formen spelar roll för luftmotståndet, men i fritt fall (helt utan luftmotstånd) påverkar varken form eller massa fallhastigheten.',
      'Utan luftmotstånd påverkas båda föremålen bara av tyngdkraften, vilket ger dem samma tyngdacceleration *g* oavsett massa — de faller därför exakt lika fort.',
    ],
  },
],

'fy1-2.4': [
  {
    question: 'Vad kallas ett diagram med hastighet på y-axeln och tid på x-axeln?',
    choices: ['s-t-diagram', 'v-t-diagram', 'a-t-diagram', 'F-s-diagram'],
    correct: 1,
    why: [
      'Ett s-t-diagram har istället läge (sträcka) på y-axeln, inte hastighet.',
      'Ett diagram med hastighet på y-axeln och tid på x-axeln kallas hastighet-tid-diagram, eller v-t-diagram.',
      'Ett a-t-diagram har acceleration på y-axeln, inte hastighet.',
      'F-s-diagram (kraft mot sträcka) förekommer inte i det här avsnittet — här är det hastighet mot tid som gäller.',
    ],
  },
  {
    question: 'I ett v-t-diagram med konstant acceleration, vad motsvarar den räta linjens lutning?',
    choices: ['Förflyttningen', 'Sträckan', 'Medelhastigheten', 'Accelerationen'],
    correct: 3,
    why: [
      'Förflyttningen motsvaras istället av arean under grafen, inte av lutningen.',
      'Sträckan motsvaras (liksom förflyttningen) av arean under grafen — lutningen ger något annat.',
      'Medelhastigheten avläses i ett s-t-diagram som en sekants lutning — i ett v-t-diagram är lutningen istället accelerationen.',
      'I ett v-t-diagram motsvarar linjens lutning accelerationen, $a = \\Delta v/\\Delta t$ — ju brantare lutning, desto större acceleration.',
    ],
  },
  {
    question: 'Vad motsvarar arean mellan grafen och x-axeln i ett v-t-diagram?',
    choices: ['Förflyttningen', 'Tiden', 'Accelerationen', 'Medelhastigheten'],
    correct: 0,
    why: [
      'Arean mellan en v-t-graf och x-axeln motsvarar förflyttningen, eftersom $\\Delta s = v \\cdot \\Delta t$ precis som en area är bas gånger höjd.',
      'Tiden avläses direkt på x-axeln — den beräknas inte som en area.',
      'Accelerationen motsvaras av grafens lutning, inte av arean under den.',
      'Medelhastigheten är en kvot ($\\Delta s/\\Delta t$), inte den area som direkt avläses i diagrammet.',
    ],
  },
  {
    question: 'En bil håller konstant hastighet $v = 8{,}0\\ \\mathrm{m/s}$ i 5,0 s. Hur långt kör bilen (förflyttningen) under denna tid?',
    choices: ['1,6 m', '13 m', '40 m', '8,0 m'],
    correct: 2,
    why: [
      '1,6 m fås om man råkar dela farten med tiden ($8{,}0/5{,}0$) istället för att multiplicera dem.',
      '13 m fås om man råkar addera farten och tiden ($8{,}0+5{,}0$) istället för att multiplicera dem.',
      'Förflyttningen motsvaras av arean under grafen — en rektangel med bas 5,0 s och höjd 8,0 m/s: $s = 8{,}0 \\cdot 5{,}0 = 40\\ \\mathrm{m}$.',
      '8,0 m är bara hastighetsvärdet i sig, inte den förflyttning som byggs upp under de 5,0 sekunderna.',
    ],
  },
  {
    question: 'En graf i ett v-t-diagram ligger delvis över och delvis under x-axeln, med två lika stora areor (motsatt tecken). Vad gäller för föremålets rörelse?',
    choices: [
      'Både förflyttningen och sträckan är noll',
      'Förflyttningen är noll, men sträckan är större än noll',
      'Sträckan är noll, men förflyttningen är större än noll',
      'Både förflyttningen och sträckan är större än noll',
    ],
    correct: 1,
    why: [
      'Förflyttningen blir noll eftersom areorna tar ut varandra med tecken, men sträckan räknar alla areor som positiva och blir därför större än noll, inte noll.',
      'Förflyttningen räknar arean över axeln som positiv och under axeln som negativ, så de lika stora areorna tar ut varandra och ger noll. Sträckan räknar båda areorna som positiva, så den blir större än noll.',
      'Det är tvärtom: förflyttningen (som räknar tecken) blir noll, medan sträckan (som alltid är positiv) blir större än noll.',
      'Förflyttningen blir noll just för att areorna med olika tecken tar ut varandra — bara sträckan blir större än noll.',
    ],
  },
],

'fy1-2.5': [
  {
    question: 'Vad kallas ett diagram med acceleration på y-axeln och tid på x-axeln?',
    choices: ['v-t-diagram', 's-t-diagram', 'a-t-diagram', 'F-t-diagram'],
    correct: 2,
    why: [
      'Ett v-t-diagram har istället hastighet på y-axeln, inte acceleration.',
      'Ett s-t-diagram har läge (sträcka) på y-axeln — det är inte samma sak som ett diagram över acceleration.',
      'Ett diagram med acceleration på y-axeln och tid på x-axeln kallas acceleration-tid-diagram, eller a-t-diagram.',
      'Ett F-t-diagram (kraft mot tid) förekommer inte i det här avsnittet — här handlar det om acceleration mot tid.',
    ],
  },
  {
    question: 'Vad motsvarar arean mellan grafen och x-axeln i ett a-t-diagram?',
    choices: ['Hastighetsändringen', 'Förflyttningen', 'Sträckan', 'Accelerationsändringen'],
    correct: 0,
    why: [
      'Arean mellan grafen och x-axeln i ett a-t-diagram motsvarar hastighetsändringen, eftersom $\\Delta v = a \\cdot \\Delta t$ precis som en area är bas gånger höjd.',
      'Förflyttningen avläses som en area i ett v-t-diagram, inte i ett a-t-diagram.',
      'Sträckan avläses som en area i ett v-t-diagram (med alla areor räknade som positiva), inte i ett a-t-diagram.',
      'Det finns ingen storhet som heter "accelerationsändring" i det här sammanhanget — arean i ett a-t-diagram ger hastighetsändringen.',
    ],
  },
  {
    question: 'En area under x-axeln (negativ area) i ett a-t-diagram tolkas som …',
    choices: ['En hastighetsökning', 'En positionsökning', 'Ingen förändring', 'En hastighetsminskning'],
    correct: 3,
    why: [
      'En hastighetsökning svarar mot en positiv area (över x-axeln), inte en negativ.',
      'Positionsökning avläses inte som en area i ett a-t-diagram — arean där ger istället en hastighetsändring.',
      'En area skild från noll (oavsett tecken) motsvarar alltid en hastighetsändring — bara om arean är exakt noll sker ingen förändring.',
      'En area under x-axeln räknas som negativ och tolkas som en hastighetsminskning.',
    ],
  },
  {
    question: 'En kropp med utgångshastigheten $v_0 = 8{,}0\\ \\mathrm{m/s}$ accelererar med konstant $a = 5{,}0\\ \\mathrm{m/s^2}$ i 4,0 s (en horisontell rät linje i a-t-diagrammet). Vilken hastighet har kroppen efter dessa 4,0 s?',
    choices: ['20 m/s', '28 m/s', '12,5 m/s', '40 m/s'],
    correct: 1,
    why: [
      '20 m/s är bara hastighetsändringen $\\Delta v$, inte sluthastigheten. Man måste lägga till utgångshastigheten $v_0 = 8{,}0\\ \\mathrm{m/s}$.',
      'Arean under grafen (en rektangel) ger hastighetsändringen $\\Delta v = a \\cdot t = 5{,}0 \\cdot 4{,}0 = 20\\ \\mathrm{m/s}$. Sluthastigheten blir då $v = v_0 + \\Delta v = 8{,}0 + 20 = 28\\ \\mathrm{m/s}$.',
      '12,5 m/s stämmer inte med uträkningen — kontrollera att du multiplicerar $a$ och $t$ (inte dividerar) för att få hastighetsändringen, och sedan lägger till $v_0$.',
      '40 m/s fås om man glömmer att $\\Delta v$ ska läggas till $v_0$ och istället multiplicerar fel tal. Rätt väg är $v_0 + a \\cdot t$.',
    ],
  },
],

'fy1-2.6': [
  {
    question: 'Vilken formel gäller för hastigheten hos ett föremål vid konstant acceleration?',
    choices: ['$v = v_0 \\cdot a \\cdot t$', '$v = a \\cdot t^2$', '$v = v_0 + a \\cdot t$', '$v = v_0 - a \\cdot t$'],
    correct: 2,
    why: [
      'Hastighetsökningen adderas till utgångshastigheten — det är inte en produkt av $v_0$, $a$ och $t$.',
      '$a\\cdot t^2$ (utan faktorn $\\tfrac12$ och utan $v_0$) är en del av sträckformeln, inte hastighetsformeln.',
      'Hastigheten vid konstant acceleration ges av $v = v_0 + a\\cdot t$ — utgångshastigheten plus hastighetsändringen $a\\cdot t$.',
      'Ett minustecken framför $a\\cdot t$ är fel — accelerationens eget tecken (positivt eller negativt) är redan inbyggt i $a$, så termen ska adderas.',
    ],
  },
  {
    question: 'Vilken formel gäller för förflyttningen hos ett föremål vid konstant acceleration, med utgångshastigheten $v_0$ och tiden *t*?',
    choices: ['$s = v_0 \\cdot t + \\dfrac{a \\cdot t^2}{2}$', '$s = v_0 \\cdot t - \\dfrac{a\\cdot t^2}{2}$', '$s = a \\cdot t^2$', '$s = \\dfrac{v_0+v}{2}\\cdot a$'],
    correct: 0,
    why: [
      'Förflyttningen vid konstant acceleration är summan av en "rektangelterm" $v_0\\cdot t$ och en "triangelterm" $\\tfrac{a\\cdot t^2}{2}$.',
      'Termen $\\tfrac{a\\cdot t^2}{2}$ ska adderas, inte subtraheras — accelerationens tecken är redan inbyggt i $a$.',
      '$a\\cdot t^2$ (utan faktorn $\\tfrac12$ och utan $v_0\\cdot t$-termen) ger fel resultat — båda termerna och faktorn $\\tfrac12$ behövs.',
      'Det uttrycket blandar ihop medelhastighet och acceleration på ett sätt som inte ger sträckan — rätt formel är $s = v_0 t + \\tfrac{a t^2}{2}$.',
    ],
  },
  {
    question: 'Om ett föremål accelererar från vila (utan begynnelsehastighet), vilket förenklat samband gäller för sträckan?',
    choices: ['$s = v_0 \\cdot t$', '$s = \\dfrac{a\\cdot t^2}{2}$', '$s = a \\cdot t$', '$s = 2 a t$'],
    correct: 1,
    why: [
      'Den termen försvinner helt när $v_0 = 0$, eftersom den innehåller $v_0$ som faktor.',
      'När $v_0 = 0$ faller den första termen i $s = v_0 t + \\tfrac{a t^2}{2}$ bort, och kvar blir $s = \\tfrac{a t^2}{2}$.',
      '$a\\cdot t$ (utan kvadrat och utan faktorn $\\tfrac12$) är istället en del av hastighetsformeln $v=a\\cdot t$, inte sträckformeln.',
      '$2at$ stämmer varken med hastighets- eller sträckformeln vid start från vila.',
    ],
  },
  {
    question: 'Vid fritt fall (rörelse rakt upp eller ner) sätter man ofta $a = -g$. Vilket samband för hastigheten gäller då?',
    choices: ['$v = v_0 + g \\cdot t$', '$v = g \\cdot t$', '$v = v_0 \\cdot g \\cdot t$', '$v = v_0 - g \\cdot t$'],
    correct: 3,
    why: [
      'Ett plustecken är fel här — vid fritt fall sätter man $a = -g$, vilket ger $v = v_0 - g\\cdot t$.',
      'Den formeln saknar utgångshastigheten $v_0$ och gäller bara om föremålet startar helt stilla ($v_0=0$).',
      'Hastighetsändringen ska adderas till (eller subtraheras från) $v_0$, inte multipliceras med den.',
      'Vid fritt fall sätts $a = -g$ in i $v = v_0 + a\\cdot t$, vilket ger $v = v_0 - g\\cdot t$.',
    ],
  },
  {
    question: 'En bil med hastigheten $v_0 = 20\\ \\mathrm{m/s}$ bromsar med konstant accelerationen $a = -2{,}0\\ \\mathrm{m/s^2}$. Vilken hastighet har bilen efter 3,0 s?',
    choices: ['26 m/s', '14 m/s', '6,0 m/s', '−6,0 m/s'],
    correct: 1,
    why: [
      '26 m/s fås om man råkar addera istället för att subtrahera — bilen bromsar in, så accelerationen är negativ: $v = 20 + (-2{,}0)\\cdot 3{,}0$.',
      '$v = v_0 + a\\cdot t = 20 + (-2{,}0)\\cdot 3{,}0 = 20 - 6{,}0 = 14\\ \\mathrm{m/s}$.',
      '6,0 m/s är bara hastighetsändringen $a\\cdot t$, inte sluthastigheten. Man måste lägga till utgångshastigheten $v_0 = 20\\ \\mathrm{m/s}$.',
      '−6,0 m/s är bara hastighetsändringen med tecken — sluthastigheten fås genom att addera denna till $v_0$: $20 + (-6{,}0) = 14\\ \\mathrm{m/s}$.',
    ],
  },
  {
    question: 'Vilket samband ger medelhastigheten $v_m$ vid konstant acceleration, uttryckt i start- och sluthastighet?',
    choices: ['$v_m = v_0 + v$', '$v_m = \\dfrac{v-v_0}{2}$', '$v_m = \\dfrac{v_0+v}{2}$', '$v_m = v_0 \\cdot v$'],
    correct: 2,
    why: [
      'Att bara addera $v_0$ och $v$ utan att dela med 2 ger ett för stort värde — medelhastigheten är medelvärdet av start- och sluthastigheten.',
      'Det är skillnaden (inte summan) mellan hastigheterna delad med 2 — det ger inte medelhastigheten utan snarare en hastighetsändring.',
      'Vid konstant acceleration är medelhastigheten medelvärdet av start- och sluthastigheten: $v_m = \\dfrac{v_0+v}{2}$.',
      'En produkt av $v_0$ och $v$ ger fel enhet (m²/s²) och är inte medelhastigheten.',
    ],
  },
],

'fy1-2.7': [
  {
    question: 'Varför behöver man ibland ställa upp ett ekvationssystem med två ekvationer i rörelseproblem?',
    choices: [
      'Därför att uppgiften alltid har fel enhet',
      'Därför att man har två obekanta storheter som ingen enskild ekvation kan bestämma ensam',
      'Därför att accelerationen alltid är noll',
      'Därför att GeoGebra kräver det',
    ],
    correct: 1,
    why: [
      'Enheter kan behöva räknas om, men det är inte anledningen till att man behöver ett helt ekvationssystem.',
      'När en enda ekvation innehåller två obekanta storheter (t.ex. både $a$ och $t$) kan den inte lösas ensam — då behövs en andra ekvation för att bilda ett ekvationssystem.',
      'Accelerationen är oftast precis det man vill bestämma i dessa problem — den är inte noll.',
      'GeoGebra är ett verktyg för att lösa ekvationssystemet, men anledningen till att man behöver systemet är att man har två obekanta storheter, inte ett krav från programmet.',
    ],
  },
  {
    question: 'Om ett ekvationssystem är svårt att lösa algebraiskt, vilka alternativ nämns i genomgången?',
    choices: [
      'Lösa det grafiskt eller med CAS-funktionen i GeoGebra',
      'Gissa ett svar och avrunda',
      'Strunta i den ena ekvationen',
      'Byta ut alla enheter till SI-enheter',
    ],
    correct: 0,
    why: [
      'Genomgången nämner att man kan lösa svåra ekvationssystem grafiskt (rita grafer och läsa av skärningspunkter) eller med CAS-funktionen i GeoGebra.',
      'Att gissa och avrunda ger inget tillförlitligt svar — metoderna som nämns är att lösa grafiskt eller med CAS i GeoGebra.',
      'Man behöver båda ekvationerna eftersom det finns två obekanta storheter — att strunta i den ena ger ingen lösning.',
      'Att byta enhetssystem löser inte problemet med två obekanta storheter i ett ekvationssystem.',
    ],
  },
  {
    question: 'Vad är viktigt att göra när man löser en ekvation grafiskt eller med CAS, enligt genomgången?',
    choices: [
      'Att bara skriva ner svaret utan uträkning',
      'Att alltid runda av till heltal',
      'Att redovisa vad man gör i lösningen (t.ex. vilka ekvationer och vilken metod som används)',
      'Att undvika att nämna GeoGebra i lösningen',
    ],
    correct: 2,
    why: [
      'Även om man använder CAS ska man redovisa vad man gör i lösningen, inte bara presentera svaret.',
      'Svaret ska anges med ett rimligt antal värdesiffror, men det är inte huvudpoängen — det viktiga är att redovisa metoden.',
      'Genomgången betonar att man alltid ska redovisa vad man gör, till exempel skriva "Jag löser ekvationen … med CAS och får …".',
      'Det finns ingen anledning att undvika att nämna vilket verktyg (t.ex. GeoGebra) man använt — tvärtom ska metoden redovisas tydligt.',
    ],
  },
  {
    question: 'I exemplet med bilen som accelererar 400 meter, vilka två storheter var de obekanta (de man inte kände till direkt)?',
    choices: [
      'Sträckan och utgångshastigheten',
      'Hastigheten och sträckan',
      'Utgångshastigheten och sluthastigheten',
      'Accelerationen och tiden',
    ],
    correct: 3,
    why: [
      'Sträckan (400 m) och utgångshastigheten (15 m/s) gavs direkt i uppgiften — de var alltså inte obekanta.',
      'Hastigheten efter sträckan (28 m/s) och sträckan (400 m) gavs båda i uppgiften — de var inte obekanta.',
      'Både utgångshastigheten (15 m/s) och sluthastigheten (28 m/s) gavs i uppgiften — ingen av dem var obekant.',
      'De två obekanta storheterna var accelerationen $a$ och tiden $t$ — det är därför två ekvationer (en för sträcka, en för hastighet) behövdes för att lösa ut dem.',
    ],
  },
],

'fy1-2.8': [
  {
    question: 'Vilken är Torricellis ekvation?',
    choices: ['$v^2 - v_0^2 = 2as$', '$v - v_0 = 2as$', '$v^2 + v_0^2 = 2as$', '$v^2 - v_0^2 = as$'],
    correct: 0,
    why: [
      'Torricellis ekvation är $v^2 - v_0^2 = 2as$ — sambandet mellan sluthastighet, begynnelsehastighet, acceleration och förflyttning, utan tiden $t$.',
      'Det saknas kvadrater på hastigheterna — i Torricellis ekvation är det $v^2$ och $v_0^2$, inte $v$ och $v_0$ själva.',
      'Det ska vara en differens ($v^2 - v_0^2$), inte en summa, mellan de kvadrerade hastigheterna.',
      'Högerledet saknar faktorn 2 — det korrekta uttrycket är $2as$, inte bara $as$.',
    ],
  },
  {
    question: 'Vad är den stora fördelen med Torricellis ekvation jämfört med de andra rörelseformlerna?',
    choices: [
      'Den fungerar även vid varierande acceleration',
      'Den gäller bara för fritt fall',
      'Den ersätter behovet av SI-enheter',
      'Den kräver inte att man känner till tiden $t$',
    ],
    correct: 3,
    why: [
      'Tvärtom — Torricellis ekvation kräver precis som de andra rörelseformlerna att accelerationen är konstant.',
      'Ekvationen gäller all rörelse med konstant acceleration, inte bara fritt fall — fritt fall är bara ett specialfall där $a=-g$.',
      'Ekvationen har inget med enhetssystem att göra — man räknar fortfarande med SI-enheter som vanligt.',
      'Den stora fördelen är att den relaterar $v$, $v_0$, $a$ och $s$ direkt, helt utan att man behöver känna till tiden $t$ — det är därför den ibland kallas "den tidlösa ekvationen".',
    ],
  },
  {
    question: 'I Torricellis ekvation står *s* för …',
    choices: ['Sträckan (alltid positiv)', 'Förflyttningen (kan vara både positiv, negativ och noll)', 'Tiden', 'Accelerationen'],
    correct: 1,
    why: [
      'Sträckan är alltid positiv (total väglängd), men det är inte det *s* står för i Torricellis ekvation — där betyder *s* förflyttning.',
      'I Torricellis ekvation står *s* för förflyttningen, en vektorstorhet som kan vara positiv, negativ eller noll (t.ex. noll om föremålet återvänder till startpunkten).',
      'Tiden $t$ förekommer inte alls i Torricellis ekvation — det är hela poängen med formeln.',
      'Accelerationen betecknas *a* i ekvationen, inte *s*.',
    ],
  },
  {
    question: 'I vilket av dessa fall är Torricellis ekvation INTE tillämpbar?',
    choices: [
      'En sten i fritt fall utan luftmotstånd',
      'En bil som bromsar med konstant retardation',
      'Ett föremål som påverkas av luftmotstånd (accelerationen beror på hastigheten)',
      'En kula som accelererar likformigt nedför ett lutande plan',
    ],
    correct: 2,
    why: [
      'Fritt fall utan luftmotstånd har konstant acceleration ($a=-g$), så Torricellis ekvation fungerar utmärkt där.',
      'En konstant retardation är fortfarande en konstant acceleration, så ekvationen gäller här.',
      'Vid luftmotstånd beror kraften (och därmed accelerationen) på hastigheten, så accelerationen är inte konstant — då fallerar Torricellis ekvation.',
      'En likformig acceleration nedför ett lutande plan är per definition konstant, så ekvationen gäller.',
    ],
  },
  {
    question: 'En bil bromsar från $v_0 = 20\\ \\mathrm{m/s}$ till stillastående ($v = 0$) med konstant accelerationen $a = -2{,}0\\ \\mathrm{m/s^2}$. Hur lång sträcka hinner bilen bromsa in på? (Använd Torricellis ekvation.)',
    choices: ['50 m', '100 m', '200 m', '10 m'],
    correct: 1,
    why: [
      '50 m fås om man råkar dela fel — kontrollera uträkningen: $0 - 20^2 = 2\\cdot(-2{,}0)\\cdot s$.',
      '$v^2-v_0^2=2as \\Rightarrow 0-20^2 = 2\\cdot(-2{,}0)\\cdot s \\Rightarrow -400=-4{,}0\\,s \\Rightarrow s=100\\ \\mathrm{m}$.',
      '200 m fås om man glömmer kvadrera hastigheten: $v_0^2 = 20^2 = 400$, inte bara $20 \\cdot 2$.',
      '10 m stämmer inte med uträkningen — kontrollera att du kvadrerar $v_0$ (får 400) innan du delar med $2a$.',
    ],
  },
],

// ── 03-fy1-ch3a.js ────────────────────────────────────────────

'fy1-3.1': [
  {
    question: 'Vad är den korrekta definitionen av kraft?',
    choices: [
      'Ett mått på hur mycket materia ett föremål innehåller',
      'Kraften som verkar mellan alla massor i universum',
      'En påverkan som kan ändra ett föremåls rörelse eller form, med SI-enheten newton',
      'En skalär storhet som anger ett föremåls fart',
    ],
    correct: 2,
    why: [
      'Detta beskriver massa, inte kraft — massa är ett mått på mängden materia i ett föremål.',
      'Detta beskriver gravitationskraft, som bara är en av flera typer av krafter (t.ex. finns även elektrisk och magnetisk kraft) — frågan gäller kraft i allmänhet.',
      'Kraft är just en påverkan som kan ändra ett föremåls rörelse eller form, betecknas *F* och har SI-enheten newton (N).',
      'Kraft är ingen skalär storhet utan en vektorstorhet — den har både storlek och riktning, till skillnad från farten som bara har storlek.',
    ],
  },
  {
    question: 'Vilket instrument används för att mäta kraft?',
    choices: [
      'Termometer',
      'Dynamometer',
      'Barometer',
      'Voltmeter',
    ],
    correct: 1,
    why: [
      'En termometer mäter temperatur, inte kraft.',
      'En dynamometer är en fjäderbalans som används för att mäta kraft.',
      'En barometer mäter lufttryck, inte kraft.',
      'En voltmeter mäter elektrisk spänning, inte kraft.',
    ],
  },
  {
    question: 'Vad säger Newtons första lag om ett föremål där den resulterande kraften är noll?',
    choices: [
      'Föremålet accelererar alltid nedåt mot jorden',
      'Föremålet stannar omedelbart, oavsett tidigare hastighet',
      'Föremålet roterar runt sin egen axel',
      'Föremålet befinner sig i vila eller rör sig med konstant hastighet i en rätlinjig bana',
    ],
    correct: 3,
    why: [
      'Utan en resulterande kraft sker ingen acceleration alls i någon riktning, varken nedåt eller något annat håll.',
      'Ett föremål i rörelse fortsätter i rörelse om ingen kraft bromsar det — det stannar inte av sig själv. Det är precis denna vanliga missuppfattning som Newtons första lag motbevisar.',
      'Rotation kräver ett vridande moment och beskrivs inte av Newtons första lag, som handlar om rätlinjig rörelse.',
      'Detta är precis innehållet i Newtons första lag (tröghetslagen): utan resulterande kraft förblir föremålet i vila eller i konstant hastighet i en rätlinjig bana.',
    ],
  },
  {
    question: 'En fallskärmshoppare har nått sin maxfart och faller nu med konstant hastighet. Vad gäller för krafterna som verkar på hen?',
    choices: [
      'Tyngdkraften och luftmotståndet är lika stora, så resulterande kraften är noll',
      'Tyngdkraften är större än luftmotståndet',
      'Luftmotståndet är större än tyngdkraften',
      'Inga krafter verkar längre på fallskärmshopparen',
    ],
    correct: 0,
    why: [
      'Vid konstant hastighet är resulterande kraften noll enligt Newtons första lag — tyngdkraften och luftmotståndet balanserar då varandra exakt.',
      'Om tyngdkraften vore större skulle hastigheten fortsätta öka (accelerera nedåt) — men hastigheten är konstant, så det stämmer inte.',
      'Om luftmotståndet vore större skulle fallskärmshopparen bromsas in och sakta ner — men hastigheten är konstant, så det stämmer inte.',
      'Tyngdkraften försvinner inte nära jordytan — den finns kvar men balanseras av luftmotståndet.',
    ],
  },
  {
    question: 'En kraft delas upp i två delkrafter med bestämda riktningar, till exempel längs x- och y-axeln. Vad kallas delkrafterna?',
    choices: [
      'Motkrafter',
      'Jämviktskrafter',
      'Komposanter',
      'Reaktionskrafter',
    ],
    correct: 2,
    why: [
      'Motkrafter hör ihop med Newtons tredje lag och verkar på ett annat föremål — det handlar inte om att dela upp en och samma kraft i riktningar.',
      'Jämviktskrafter är flera olika krafter vars resulterande kraft är noll — inte delar av en enskild kraft.',
      'När en kraft delas upp i flera krafter med specifika riktningar kallas dessa komposanter.',
      'Reaktionskraft är ett annat namn för motkraft, alltså samma sak som i det första alternativet — inte samma sak som komposanter.',
    ],
  },
  {
    question: 'Två krafter på 10 N och 20 N verkar åt samma håll på en låda. Hur stor är den resulterande kraften?',
    choices: [
      '10 N',
      '30 N',
      '20 N',
      '200 N',
    ],
    correct: 1,
    why: [
      'Detta är skillnaden mellan krafterna (20 − 10 N), vilket gäller om krafterna i stället verkar åt motsatt håll — men här verkar de åt samma håll.',
      'När krafter verkar åt samma håll adderas de: $F_\\mathrm{R} = 10 + 20 = 30\\ \\mathrm{N}$.',
      'Detta är bara den ena av krafterna — båda krafterna bidrar till den resulterande kraften.',
      'Krafter sätts inte samman genom multiplikation — 10 · 20 = 200 gäller inte för addition av krafter.',
    ],
  },
],

'fy1-3.2': [
  {
    question: 'Vad kallas ett föremåls motstånd mot förändring av sin rörelse?',
    choices: [
      'Kraftresultant',
      'Tröghet',
      'Acceleration',
      'Tyngdfaktor',
    ],
    correct: 1,
    why: [
      'Kraftresultanten är summan av alla krafter som verkar på ett föremål — inte ett mått på motstånd mot rörelseförändring.',
      'Tröghet är just motståndet mot förändring av rörelsen. Ju större massa, desto större tröghet.',
      'Acceleration är hur snabbt hastigheten ändras — det är resultatet av krafterna, inte namnet på motståndet mot förändring.',
      'Tyngdfaktorn anger hur stor tyngdkraften är per kilogram (9,82 N/kg i Sverige) — helt orelaterat till tröghet.',
    ],
  },
  {
    question: 'Vilket samband uttrycker Newtons andra lag (accelerationslagen)?',
    choices: [
      '$F_\\mathrm{R} = \\frac{m}{a}$',
      '$F_\\mathrm{R} = m \\cdot a$',
      '$F_\\mathrm{R} = m + a$',
      '$a = F_\\mathrm{R} \\cdot m$',
    ],
    correct: 1,
    why: [
      'Detta skulle innebära att kraften minskar när accelerationen ökar, vilket är fel — sambandet är en produkt, inte en kvot på detta sätt.',
      'Newtons andra lag säger att den resulterande kraften är massan multiplicerad med accelerationen: $F_\\mathrm{R} = m \\cdot a$.',
      'Kraft, massa och acceleration hör ihop genom multiplikation, inte addition.',
      'Detta skulle betyda att en dubbelt så stor massa ger dubbelt så stor acceleration vid samma kraft — precis tvärtom mot det faktiska sambandet, där $a = F_\\mathrm{R}/m$.',
    ],
  },
  {
    question: 'Hur definieras 1 newton i grundenheter?',
    choices: [
      '$1\\ \\mathrm{N} = 1\\ \\mathrm{kg/s^2}$',
      '$1\\ \\mathrm{N} = 1\\ \\mathrm{m/s^2}$',
      '$1\\ \\mathrm{N} = 1\\ \\mathrm{kg \\cdot m/s^2}$',
      '$1\\ \\mathrm{N} = 1\\ \\mathrm{kg \\cdot m/s}$',
    ],
    correct: 2,
    why: [
      'Detta saknar längdenheten meter — accelerationens enhet är m/s², inte bara 1/s².',
      'Detta är enheten för acceleration, inte för kraft — massan (kg) saknas helt.',
      '1 N är den kraft som krävs för att ge massan 1 kg accelerationen 1 m/s², vilket i grundenheter blir $1\\ \\mathrm{kg \\cdot m/s^2}$.',
      'Detta saknar tidsenheten i kvadrat — enheten för kraft innehåller $\\mathrm{s^2}$ i nämnaren, inte bara $\\mathrm{s}$.',
    ],
  },
  {
    question: 'Varför skyddar en airbag vid en krock, enligt Newtons andra lag?',
    choices: [
      'Kudden ökar förarens massa och därmed tröghet',
      'Kudden tar bort tyngdkraften på föraren',
      'Kudden gör att bilen stannar snabbare',
      'Kudden gör inbromsningen längre, vilket ger lägre acceleration och därmed lägre kraft',
    ],
    correct: 3,
    why: [
      'Airbagen ändrar inte förarens massa — den påverkar hur inbromsningen sker, inte trögheten.',
      'Tyngdkraften verkar hela tiden på föraren och har inget med krockskyddet att göra.',
      'Tvärtom förlänger airbagen inbromsningsförloppet något för föraren — det är just det som minskar kraften, inte en snabbare inbromsning.',
      'Genom att förlänga tiden inbromsningen sker under blir accelerationen (hastighetsändringen per tid) lägre, och enligt $F_\\mathrm{R} = m \\cdot a$ blir då också kraften på huvudet lägre.',
    ],
  },
  {
    question: 'En låda med massan 2,0 kg puttas med kraften 14 N. En friktionskraft på 4,0 N verkar åt motsatt håll. Vilken acceleration får lådan?',
    choices: [
      '5,0 m/s²',
      '7,0 m/s²',
      '10 m/s²',
      '2,0 m/s²',
    ],
    correct: 0,
    why: [
      'Den resulterande kraften är $F_\\mathrm{R} = 14 - 4 = 10\\ \\mathrm{N}$, och accelerationen blir $a = F_\\mathrm{R}/m = 10/2{,}0 = 5{,}0\\ \\mathrm{m/s^2}$ — vilket stämmer.',
      'Detta fås om man av misstag delar 14 N med 2,0 kg utan att först dra bort friktionskraften.',
      'Detta är den resulterande kraften i newton (14 − 4 = 10 N), inte accelerationen i m/s² — kom ihåg att dela med massan.',
      'Detta fås om man av misstag delar friktionskraften (4,0 N) med massan i stället för den resulterande kraften.',
    ],
  },
  {
    question: 'En bil med massan 1 000 kg accelererar från 0 till 20 m/s på 10 sekunder. Vilken är den genomsnittliga resulterande kraften på bilen?',
    choices: [
      '20 000 N',
      '200 N',
      '2 000 N',
      '100 N',
    ],
    correct: 2,
    why: [
      'Detta fås om man av misstag multiplicerar massan med hastigheten (1 000 · 20) i stället för med accelerationen.',
      'Detta är för litet — kom ihåg att räkna ut accelerationen korrekt: $a = \\Delta v/\\Delta t = 20/10 = 2{,}0\\ \\mathrm{m/s^2}$, och sedan multiplicera med hela massan.',
      'Accelerationen är $a = \\Delta v/\\Delta t = 20/10 = 2{,}0\\ \\mathrm{m/s^2}$, så $F_\\mathrm{R} = m \\cdot a = 1\\,000 \\cdot 2{,}0 = 2\\,000\\ \\mathrm{N}$.',
      'Detta fås om man av misstag dividerar massan med tiden i stället för att använda accelerationen i Newtons andra lag.',
    ],
  },
],

'fy1-3.3': [
  {
    question: 'Vad säger Newtons tredje lag?',
    choices: [
      'Resulterande kraften på ett föremål i vila är alltid noll',
      'Kraft är massa gånger acceleration',
      'Mot varje kraft på ett föremål verkar en lika stor, men motsatt riktad, kraft av samma sort på ett annat föremål',
      'Två parallella krafter kan alltid ersättas med en enda resulterande kraft',
    ],
    correct: 2,
    why: [
      'Detta är i stället Newtons första lag, som handlar om jämvikt hos ett enskilt föremål — inte om kraft och motkraft mellan två föremål.',
      'Detta är Newtons andra lag ($F_\\mathrm{R} = m \\cdot a$), inte tredje lagen.',
      'Newtons tredje lag säger just att varje kraft har en lika stor, motriktad motkraft av samma sort som verkar på ett annat föremål.',
      'Att kombinera flera krafter till en resultant handlar om kraftresultanter, inte om Newtons tredje lag.',
    ],
  },
  {
    question: 'En vikt vilar i jämvikt på ett bord, påverkad av tyngdkraften nedåt och normalkraften uppåt. Är dessa två krafter kraft och motkraft enligt Newtons tredje lag?',
    choices: [
      'Ja, eftersom de är lika stora och motriktade',
      'Nej, eftersom de verkar på samma föremål — de är i stället jämviktskrafter',
      'Ja, men bara om vikten accelererar',
      'Nej, eftersom normalkraften alltid är större än tyngdkraften',
    ],
    correct: 1,
    why: [
      'Att vara lika stora och motriktade räcker inte — kraft och motkraft enligt Newtons tredje lag måste dessutom verka på två OLIKA föremål och vara av samma typ (t.ex. båda gravitationskrafter).',
      'Tyngdkraft och normalkraft verkar båda på vikten (samma föremål) och håller den i jämvikt — de kallas jämviktskrafter, inte kraft och motkraft.',
      'Accelerationen hos vikten spelar ingen roll för om krafterna räknas som kraft och motkraft eller ej — avgörande är om de verkar på samma eller olika föremål.',
      'I det här fallet (vikt i vila) är normalkraften och tyngdkraften lika stora, inte olika stora — men det är ändå inte skälet till att de inte räknas som kraft och motkraft.',
    ],
  },
  {
    question: 'Jorden drar i månen med en gravitationskraft. Hur stor är månens gravitationskraft på jorden i jämförelse?',
    choices: [
      'Precis lika stor, men motriktad',
      'Mycket mindre, eftersom månens massa är mindre',
      'Mycket större, eftersom månen rör sig runt jorden',
      'Noll, eftersom bara jorden har tillräcklig massa för att dra i något',
    ],
    correct: 0,
    why: [
      'Enligt Newtons tredje lag är kraft och motkraft alltid exakt lika stora — jordens dragningskraft på månen och månens dragningskraft på jorden är precis lika stora, fast motriktade. Att månens massa är mindre påverkar bara hur stor effekt (rörelseförändring) kraften ger på månen, inte kraftens storlek.',
      'Detta är en vanlig missuppfattning — kraftens storlek beror inte bara på det ena föremålets massa, och enligt Newtons tredje lag måste krafterna vara exakt lika stora.',
      'Kraften är inte större i någon riktning — den är exakt lika stor åt båda hållen enligt Newtons tredje lag.',
      'Alla massor påverkar varandra med gravitationskraft, oavsett storlek — månen drar alltså också i jorden.',
    ],
  },
  {
    question: 'Vad är motkraften till tyngdkraften som drar ett äpple nedåt mot jorden?',
    choices: [
      'Normalkraften från marken',
      'Luftmotståndet på äpplet',
      'Det finns ingen motkraft eftersom äpplet är så lätt',
      'En lika stor tyngdkraft från äpplet som drar jorden uppåt',
    ],
    correct: 3,
    why: [
      'Normalkraften är en annan sorts kraft (kontaktkraft) och verkar dessutom på äpplet, inte på jorden — den kan inte vara motkraften till en gravitationskraft.',
      'Luftmotstånd är en helt annan typ av kraft och uppstår bara om äpplet rör sig genom luften — det är inte relaterat till Newtons tredje lag här.',
      'Newtons tredje lag gäller oavsett massa — även ett lätt äpple drar i jorden med en (mycket liten men verklig) motkraft.',
      'Motkraften måste vara samma sorts kraft (gravitationskraft) och verka på det andra föremålet: äpplet drar alltså jorden uppåt med precis lika stor kraft som jorden drar äpplet nedåt.',
    ],
  },
  {
    question: 'I en dragkamp är spännkraften i repet olika stor åt de två hållen, till exempel 600 N åt ena hållet och 400 N åt andra. Stämmer detta?',
    choices: [
      'Nej, spännkraften i repet är lika stor åt båda hållen — det är friktionen mot marken som avgör vem som vinner',
      'Ja, laget som drar starkast ger en större kraft i sin ände av repet',
      'Ja, men bara om repet är tillräckligt långt',
      'Nej, spännkraften är alltid noll i en dragkamp',
    ],
    correct: 0,
    why: [
      'Spännkraften i repet måste vara lika stor i hela repet. Det som avgör vem som vinner dragkampen är i stället friktionen mot marken hos respektive lag.',
      'Detta är en vanlig men felaktig bild — ett rakt rep kan inte ha olika spännkraft i olika ändar.',
      'Repets längd påverkar inte principen — spännkraften är lika stor genom hela repet oavsett längd.',
      'Spännkraften är inte noll, den är bara lika stor åt båda hållen — annars skulle repet inte alls vara spänt.',
    ],
  },
  {
    question: 'En lastbil har en magnet monterad på flaket som drar i en metallbit fäst framtill på samma lastbil. Kommer detta att driva lastbilen framåt?',
    choices: [
      'Ja, magnetkraften driver lastbilen framåt',
      'Ja, men bara om magneten är tillräckligt stark',
      'Nej, eftersom metallbiten drar tillbaka i magneten med en lika stor motkraft, så resulterande kraften på lastbilen blir noll',
      'Nej, eftersom magnetism inte fungerar på metall i rörelse',
    ],
    correct: 2,
    why: [
      'Kraften från magneten på metallbiten motverkas alltid av en lika stor motkraft från metallbiten på magneten (Newtons tredje lag) — eftersom båda sitter fast i samma lastbil tar krafterna ut varandra.',
      'Oavsett hur stark magneten är kommer motkraften alltid att vara lika stor, så resultatet blir detsamma — ingen nettokraft på lastbilen.',
      'Metallbiten drar i magneten med precis lika stor kraft (motriktad), och eftersom både magnet och metallbit sitter på samma lastbil blir den resulterande kraften på lastbilen noll — ingen framdrivning uppstår.',
      'Magnetism fungerar visst på metall oavsett rörelse — problemet är inte att kraften uteblir, utan att den motverkas av en lika stor motkraft.',
    ],
  },
],

'fy1-3.4': [
  {
    question: 'Vad är skillnaden mellan massa och tyngd?',
    choices: [
      'Massan är oberoende av var föremålet befinner sig, medan tyngden (tyngdkraften) beror på tyngdfaktorn på platsen',
      'De är samma sak och betecknas båda med bokstaven m',
      'Massan är alltid större än tyngden i newton',
      'Tyngden mäts i kilogram och massan i newton',
    ],
    correct: 0,
    why: [
      'Massan (mängden materia) är densamma oavsett om föremålet är på jorden eller månen, medan tyngdkraften beror på tyngdfaktorn *g* på platsen — därför är tyngden olika på jorden och månen.',
      'Massa och tyngd är olika storheter med olika enheter (kg respektive N) och betecknas olika ($m$ respektive $F_\\mathrm{G}$) — de är inte samma sak.',
      'De kan inte jämföras på det sättet eftersom de har olika enheter — det är som att jämföra meter med sekunder.',
      'Det är tvärtom: massa mäts i kilogram (kg) och tyngd (tyngdkraft) mäts i newton (N).',
    ],
  },
  {
    question: 'Vad är tyngdfaktorns värde vid jordytan i Sverige?',
    choices: [
      '$6{,}67 \\cdot 10^{-11}\\ \\mathrm{N/kg}$',
      '$1{,}00\\ \\mathrm{N/kg}$',
      '$3{,}00 \\cdot 10^{8}\\ \\mathrm{N/kg}$',
      '$9{,}82\\ \\mathrm{N/kg}$',
    ],
    correct: 3,
    why: [
      'Detta är i stället gravitationskonstanten *G*, som används i Newtons gravitationslag — en helt annan storhet med annan enhet.',
      'Detta värde är alldeles för lågt jämfört med det faktiska värdet vid jordytan.',
      'Detta är ljusets hastighet i vakuum, helt orelaterat till tyngdfaktorn.',
      'Tyngdfaktorn *g* vid jordytan i Sverige är $9{,}82\\ \\mathrm{N/kg}$.',
    ],
  },
  {
    question: 'Vilket samband ger tyngdkraften på ett föremål?',
    choices: [
      '$F_\\mathrm{G} = \\frac{m}{g}$',
      '$F_\\mathrm{G} = m \\cdot g$',
      '$F_\\mathrm{G} = m + g$',
      '$F_\\mathrm{G} = \\frac{g}{m}$',
    ],
    correct: 1,
    why: [
      'Detta skulle betyda att en större massa ger en mindre tyngdkraft, vilket är felaktigt — sambandet är en produkt, inte en kvot på detta sätt.',
      'Tyngdkraften är massan multiplicerad med tyngdfaktorn: $F_\\mathrm{G} = m \\cdot g$.',
      'Massa och tyngdfaktor multipliceras, de adderas inte.',
      'Detta har fel storheter i täljare och nämnare, och skulle dessutom ge orimligt stora värden för små massor.',
    ],
  },
  {
    question: 'I vilken riktning verkar alltid normalkraften från en yta på ett föremål?',
    choices: [
      'Rakt uppåt, oavsett ytans lutning',
      'Parallellt med ytan',
      'Vinkelrätt mot ytan',
      'I samma riktning som tyngdkraften',
    ],
    correct: 2,
    why: [
      'Detta stämmer bara om ytan är horisontell — på ett lutande plan verkar normalkraften inte rakt uppåt utan vinkelrätt ut från planet.',
      'Om normalkraften vore parallell med ytan skulle den inte kunna hindra föremålet från att tränga igenom ytan.',
      'Normalkraften verkar alltid vinkelrätt mot kontaktytan — namnet "normal" kommer just från det matematiska begreppet för en linje vinkelrät mot ett plan.',
      'Normalkraften är motriktad tyngdkraften bara i specialfallet med ett vågrätt underlag — i allmänhet pekar den vinkelrätt ut från ytan, inte nödvändigtvis motsatt tyngdkraften.',
    ],
  },
  {
    question: 'En vikt står stilla på ett bord. Enligt Newtons första lag måste den resulterande kraften vara noll. Vilken kraft balanserar tyngdkraften?',
    choices: [
      'Friktionskraften',
      'Spännkraften',
      'Luftmotståndet',
      'Normalkraften',
    ],
    correct: 3,
    why: [
      'Friktionskraften verkar parallellt med ytan och motverkar rörelse i sidled — den balanserar inte en lodrät tyngdkraft på ett vågrätt bord.',
      'Spännkraften uppstår i sträckta rep eller linor — det finns inget rep i denna situation.',
      'Luftmotstånd uppstår bara vid rörelse genom luft och är dessutom försumbart för ett stillastående föremål.',
      'Normalkraften från bordet verkar uppåt, vinkelrätt mot bordsytan, och balanserar tyngdkraften så att den resulterande kraften blir noll.',
    ],
  },
  {
    question: 'En bom väger 2,0 kg och har en motvikt på 3,0 kg. Med tyngdfaktorn avrundad till 10 N/kg, hur stor normalkraft verkar på bommen från stödet, om bommen ligger i jämvikt?',
    choices: [
      '40 N',
      '20 N',
      '50 N',
      '30 N',
    ],
    correct: 2,
    why: [
      'Detta är ett räknefel — kontrollera additionen: $20 + 30 = 50$, inte 40.',
      'Detta är bara tyngden av bommen ensam ($F_{G\\text{bom}} = 2{,}0 \\cdot 10 = 20\\ \\mathrm{N}$) — normalkraften måste bära upp BÅDE bommens och motviktens tyngd.',
      'Kraftjämvikt ger $F_\\mathrm{N} = F_{G\\text{bom}} + F_{G\\text{vikt}} = 20 + 30 = 50\\ \\mathrm{N}$.',
      'Detta är bara tyngden av motvikten ensam ($F_{G\\text{vikt}} = 3{,}0 \\cdot 10 = 30\\ \\mathrm{N}$) — det saknas bommens bidrag.',
    ],
  },
],

'fy1-3.5': [
  {
    question: 'Vilket samband är Newtons gravitationslag?',
    choices: [
      '$F_\\mathrm{G} = G \\cdot \\frac{m_1 + m_2}{r}$',
      '$F_\\mathrm{G} = \\frac{G \\cdot r^{2}}{m_1 \\cdot m_2}$',
      '$F_\\mathrm{G} = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}$',
      '$F_\\mathrm{G} = G \\cdot m_1 \\cdot m_2 \\cdot r^{2}$',
    ],
    correct: 2,
    why: [
      'Massorna ska multipliceras med varandra, inte adderas, och avståndet ska stå upphöjt till två i nämnaren, inte i första potens.',
      'Detta har täljare och nämnare omvänt — avståndet ska stå i nämnaren (kraften minskar med avståndet), inte i täljaren.',
      'Newtons gravitationslag ger gravitationskraften som $F_\\mathrm{G} = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}$ — massorna multipliceras med varandra och delas med avståndet i kvadrat.',
      'Avståndet *r* ska stå i nämnaren upphöjt till två, inte multipliceras i täljaren — annars skulle kraften öka med avståndet, vilket är fel.',
    ],
  },
  {
    question: 'Vad kallas konstanten *G* i Newtons gravitationslag, och vad är dess ungefärliga värde?',
    choices: [
      'Tyngdfaktorn, 9,82 N/kg',
      'Gravitationskonstanten, $6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$',
      'Ljushastigheten, $3{,}00 \\cdot 10^{8}\\ \\mathrm{m/s}$',
      'Jordens massa, $5{,}972 \\cdot 10^{24}\\ \\mathrm{kg}$',
    ],
    correct: 1,
    why: [
      'Tyngdfaktorn *g* är en annan storhet (kraft per kilogram vid jordytan) — den är inte samma sak som gravitationskonstanten *G*, även om de är relaterade.',
      '*G* kallas gravitationskonstanten och har det ungefärliga värdet $6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.',
      'Ljushastigheten är en helt annan naturkonstant och saknar koppling till gravitationslagens formel.',
      'Jordens massa är en variabel man sätter in i formeln för en specifik beräkning (t.ex. $m_j$) — den är inte konstanten *G* själv.',
    ],
  },
  {
    question: 'Två personer som väger 60 kg vardera sitter 1,0 meter ifrån varandra. Gravitationskraften mellan dem är ungefär $2{,}4 \\cdot 10^{-7}\\ \\mathrm{N}$. Varför känns denna kraft inte av?',
    choices: [
      'Eftersom personerna befinner sig för långt ifrån varandra',
      'Eftersom gravitationskraft bara verkar mellan himlakroppar',
      'Eftersom personerna rör sig, vilket tar bort gravitationskraften',
      'Eftersom gravitationskonstanten *G* är extremt liten, vilket gör att kraften blir försumbart liten mellan vardagliga massor',
    ],
    correct: 3,
    why: [
      '1,0 meter är faktiskt ett kort avstånd — det är inte avståndet som gör kraften okännbar, utan konstantens litenhet.',
      'Gravitationskraft verkar mellan ALLA massor, inte bara himlakroppar — men den blir bara märkbar när minst en av massorna är enorm, som jordens.',
      'Gravitationskraften försvinner inte av att föremål rör sig — den beror bara på massorna och avståndet mellan dem.',
      'Gravitationskonstanten $G = 6{,}67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$ är oerhört liten, vilket gör att gravitationskraften mellan vardagliga massor (som två personer) blir försumbart liten, trots att lagen gäller alla massor.',
    ],
  },
  {
    question: 'Genom att sätta $F_\\mathrm{G} = m \\cdot g$ lika med Newtons gravitationslag kan man härleda ett uttryck för tyngdfaktorn *g* vid jordytan. Vilket blir uttrycket (med $m_j$ som jordens massa och *r* som jordens radie)?',
    choices: [
      '$g = G \\cdot \\frac{m_j}{r^{2}}$',
      '$g = G \\cdot m_j \\cdot r^{2}$',
      '$g = \\frac{G}{m_j \\cdot r^{2}}$',
      '$g = G \\cdot \\frac{r^{2}}{m_j}$',
    ],
    correct: 0,
    why: [
      'Genom att dividera båda led med föremålets massa *m* i $m \\cdot g = G \\cdot \\frac{m \\cdot m_j}{r^{2}}$ försvinner *m* och kvar blir $g = G \\cdot \\frac{m_j}{r^{2}}$.',
      'Jordens radie *r* ska stå i nämnaren upphöjt till två, inte multipliceras i täljaren.',
      'Jordens massa $m_j$ ska stå i täljaren tillsammans med *G*, inte i nämnaren.',
      'Detta har täljare och nämnare omvänt — jordens massa $m_j$ ska stå i täljaren och $r^2$ i nämnaren.',
    ],
  },
  {
    question: 'Om avståndet mellan två massor fördubblas (och massorna är oförändrade), hur förändras gravitationskraften mellan dem?',
    choices: [
      'Den halveras',
      'Den blir fyra gånger så liten',
      'Den fördubblas',
      'Den är oförändrad',
    ],
    correct: 1,
    why: [
      'Kraften beror på $1/r^{2}$, inte på $1/r$ — en fördubbling av avståndet ger alltså en fjärdedel av kraften, inte hälften.',
      'Eftersom $F_\\mathrm{G} \\propto 1/r^{2}$ blir kraften $(1/2)^{2} = 1/4$ så stor när avståndet fördubblas, det vill säga fyra gånger mindre.',
      'Kraften minskar med ökat avstånd, den ökar inte — och sambandet är dessutom kvadratiskt, inte linjärt.',
      'Avståndet *r* står i nämnaren i kvadrat i formeln, så en förändring av avståndet påverkar visst kraften.',
    ],
  },
],

// ── 04-fy1-ch3b.js ────────────────────────────────────────────

'fy1-3.6': [
  {
    question: 'Vad kallas den kraft som motverkar rörelsen mellan två ytor i kontakt med varandra?',
    choices: ['Normalkraft', 'Spännkraft', 'Friktionskraft', 'Tyngdkraft'],
    correct: 2,
    why: [
      'Normalkraften är kraften ett underlag utövar vinkelrätt mot föremålet — den håller ytorna i kontakt men motverkar inte rörelse längs ytan.',
      'Spännkraften verkar längs ett spänt rep, en lina eller en fjäder, inte mellan två ytor i kontakt.',
      'Det är precis så friktionskraften definieras: kraften som motverkar rörelsen mellan två ytor i kontakt med varandra.',
      'Tyngdkraften drar alla föremål mot jordens centrum och beror inte på kontakt mellan ytor.',
    ],
  },
  {
    question: 'Vilket samband gäller mellan friktionskraften $F_\\mathrm{f}$, friktionstalet *μ* och normalkraften $F_\\mathrm{N}$?',
    choices: [
      '$F_\\mathrm{f} = \\mu \\cdot F_\\mathrm{N}$',
      '$F_\\mathrm{f} = \\mu + F_\\mathrm{N}$',
      '$F_\\mathrm{f} = \\frac{F_\\mathrm{N}}{\\mu}$',
      '$F_\\mathrm{f} = \\mu \\cdot m$',
    ],
    correct: 0,
    why: [
      'Detta är exakt formeln för friktionskraft: friktionstalet multiplicerat med normalkraften.',
      'Friktionskraften fås genom multiplikation, inte addition, av friktionstal och normalkraft.',
      'Här är kvoten omvänd — det är $\\mu$ multiplicerat med $F_\\mathrm{N}$, inte $F_\\mathrm{N}$ delat med $\\mu$.',
      'Friktionskraften beror på normalkraften, inte direkt på föremålets massa (även om normalkraften i sin tur ofta beror på massan).',
    ],
  },
  {
    question: 'Vilken enhet har friktionstalet *μ*?',
    choices: ['N', 'N/kg', 'kg/m³', 'Saknar enhet'],
    correct: 3,
    why: [
      'Newton (N) är enheten för kraft, t.ex. friktionskraften $F_\\mathrm{f}$ — men *μ* är bara ett förhållandetal.',
      'N/kg är enheten för tyngdfaktorn *g*, inte för friktionstalet.',
      'kg/m³ är enheten för densitet, ett helt annat begrepp.',
      'Friktionstalet är förhållandet mellan två krafter (båda i N), så enheterna tar ut varandra och *μ* saknar enhet.',
    ],
  },
  {
    question: 'Vad innebär det om friktionstalet är $\\mu = 1$ (100 %)?',
    choices: [
      'Det finns ingen friktion alls mellan ytorna.',
      'Friktionskraften är lika stor som normalkraften.',
      'Friktionskraften är dubbelt så stor som normalkraften.',
      'Ytorna kan inte röra sig alls, oavsett kraft.',
    ],
    correct: 1,
    why: [
      'Ingen friktion alls motsvarar $\\mu = 0$ (0 %), inte $\\mu = 1$.',
      'Eftersom $F_\\mathrm{f} = \\mu \\cdot F_\\mathrm{N}$ ger $\\mu = 1$ att friktionskraften blir lika stor som normalkraften.',
      'Dubbelt så stor friktionskraft som normalkraft skulle kräva $\\mu = 2$ (200 %), vilket är ovanligt högt.',
      'Ett stort friktionstal gör det svårare att få ytorna att glida, men med tillräckligt stor kraft kan de ändå sättas i rörelse.',
    ],
  },
  {
    question: 'En låda med massan $10\\ \\mathrm{kg}$ vilar på plant golv. Friktionstalet mellan låda och golv är $0{,}50$. Ungefär hur stor kraft krävs minst för att få lådan att börja glida? (Använd $g \\approx 10\\ \\mathrm{N/kg}$.)',
    choices: ['5,0 N', '10 N', '50 N', '100 N'],
    correct: 2,
    why: [
      'Detta är för litet — det motsvarar att bara räkna med friktionstalet utan att multiplicera med normalkraften.',
      'Detta är föremålets massa i kg, inte en kraft i newton.',
      'Normalkraften är $F_\\mathrm{N} = m \\cdot g = 10 \\cdot 10 = 100\\ \\mathrm{N}$, och friktionskraften blir $F_\\mathrm{f} = \\mu \\cdot F_\\mathrm{N} = 0{,}50 \\cdot 100 = 50\\ \\mathrm{N}$.',
      'Detta är normalkraften $F_\\mathrm{N}$, inte friktionskraften — den ska också multipliceras med friktionstalet $0{,}50$.',
    ],
  },
  {
    question: 'Vad, förutom normalkraften, avgör friktionens storlek enligt genomgången?',
    choices: [
      'Ytornas material och hur ojämna de är',
      'Föremålets färg',
      'Föremålets temperatur',
      'Hur länge föremålen varit i kontakt',
    ],
    correct: 0,
    why: [
      'Genomgången anger att friktionens storlek beror på normalkraften, ytornas material och hur de ser ut — även ojämnheter på mikroskopisk nivå spelar roll.',
      'Färgen på ett föremål har ingen fysikalisk koppling till friktionen mellan ytorna.',
      'Temperaturen nämns inte som en faktor för friktionens storlek i genomgången.',
      'Kontakttiden mellan föremålen nämns inte som en faktor för friktionens storlek i genomgången.',
    ],
  },
],

'fy1-3.7': [
  {
    question: 'Vilket uttryck ger tyngdkraftens komposant NEDFÖR ett lutande plan med lutningsvinkeln *α*?',
    choices: [
      '$F_1 = m \\cdot g \\cdot \\cos \\alpha$',
      '$F_1 = \\frac{m \\cdot g}{\\sin \\alpha}$',
      '$F_1 = m \\cdot g$',
      '$F_1 = m \\cdot g \\cdot \\sin \\alpha$',
    ],
    correct: 3,
    why: [
      'Detta uttryck ger istället komposanten VINKELRÄTT mot planet, $F_2$, inte komposanten nedför planet.',
      'Här delar man tyngdkraften med $\\sin \\alpha$ istället för att multiplicera med den — det ger inte en korrekt komposant.',
      'Detta är hela tyngdkraften $F_\\mathrm{G}$, inte bara komposanten nedför planet.',
      'Komposanten nedför planet fås genom att multiplicera tyngdkraften med sinus för lutningsvinkeln: $F_1 = m \\cdot g \\cdot \\sin \\alpha$.',
    ],
  },
  {
    question: 'Vilket uttryck ger tyngdkraftens komposant VINKELRÄTT mot ett lutande plan med lutningsvinkeln *α*?',
    choices: [
      '$F_2 = m \\cdot g \\cdot \\sin \\alpha$',
      '$F_2 = m \\cdot g \\cdot \\cos \\alpha$',
      '$F_2 = m \\cdot g \\cdot \\tan \\alpha$',
      '$F_2 = m \\cdot g$',
    ],
    correct: 1,
    why: [
      'Denna formel ger istället komposanten nedför planet, $F_1$.',
      'Komposanten vinkelrätt mot planet fås genom att multiplicera tyngdkraften med cosinus för lutningsvinkeln: $F_2 = m \\cdot g \\cdot \\cos \\alpha$.',
      'Tangens används inte för att bestämma komposanterna av tyngdkraften mot ett lutande plan.',
      'Detta är hela tyngdkraften, inte enbart komposanten vinkelrätt mot planet.',
    ],
  },
  {
    question: 'På ett lutande plan är normalkraften $F_\\mathrm{N}$ lika stor som vilken av tyngdkraftens komposanter?',
    choices: [
      'Komposanten nedför planet, $F_1$',
      'Hela tyngdkraften, $F_\\mathrm{G}$',
      'Komposanten vinkelrätt mot planet, $F_2$',
      'Ingen av komposanterna',
    ],
    correct: 2,
    why: [
      'Komposanten nedför planet, $F_1$, balanseras istället av friktionskraften $F_\\mathrm{f}$ (vid vila eller konstant hastighet).',
      'Normalkraften balanserar bara den del av tyngdkraften som är vinkelrät mot planet, inte hela tyngdkraften.',
      'Normalkraften $F_\\mathrm{N}$ verkar vinkelrätt mot planet och är därför lika stor som tyngdkraftens komposant $F_2$ i samma riktning.',
      'Normalkraften är faktiskt lika stor som en av komposanterna — nämligen den vinkelräta, $F_2$.',
    ],
  },
  {
    question: 'Vilken vinkel är, enligt genomgången, lika stor som planets lutningsvinkel *α*?',
    choices: [
      'Vinkeln mellan tyngdkraften $F_\\mathrm{G}$ och dess komposant vinkelrätt mot planet',
      'Vinkeln mellan tyngdkraften och marken',
      'Vinkeln mellan normalkraften och friktionskraften',
      'Vinkeln mellan de två komposanterna $F_1$ och $F_2$',
    ],
    correct: 0,
    why: [
      'På grund av likformighet är vinkeln mellan tyngdkraften $F_\\mathrm{G}$ och dess vinkelräta komposant $F_2$ lika stor som planets lutningsvinkel *α* — detta bevisas i härledningen med vinkelsumman i triangeln.',
      'Tyngdkraften är alltid lodrät, så vinkeln mot den vågräta marken är alltid 90°, oavsett planets lutning.',
      'Normalkraften och friktionskraften är alltid vinkelräta mot varandra (90°), oberoende av lutningsvinkeln.',
      'Komposanterna $F_1$ och $F_2$ är alltid vinkelräta mot varandra (90°) eftersom de bildar en rätvinklig uppdelning av tyngdkraften.',
    ],
  },
  {
    question: 'En låda glider nedför ett lutande plan med KONSTANT hastighet. Tyngdkraftens komposant nedför planet är $F_1 = 12\\ \\mathrm{N}$. Hur stor är friktionskraften $F_\\mathrm{f}$?',
    choices: [
      '0 N, eftersom hastigheten är konstant',
      'Större än 12 N',
      'Mindre än 12 N',
      '12 N',
    ],
    correct: 3,
    why: [
      'Konstant hastighet betyder att kraftresultanten är noll, inte att friktionskraften är noll — det finns fortfarande en friktionskraft som balanserar $F_1$.',
      'Om friktionskraften vore större än $F_1$ skulle lådan bromsa in, inte glida med konstant hastighet.',
      'Om friktionskraften vore mindre än $F_1$ skulle lådan accelerera nedför planet, inte glida med konstant hastighet.',
      'Vid konstant hastighet är kraftresultanten noll, så friktionskraften måste vara exakt lika stor som komposanten nedför planet: $F_\\mathrm{f} = F_1 = 12\\ \\mathrm{N}$.',
    ],
  },
  {
    question: 'En låda med massan $2{,}0\\ \\mathrm{kg}$ ligger stilla på ett plan som lutar $60°$. Vad är ungefär normalkraften $F_\\mathrm{N}$? (Använd $g \\approx 10\\ \\mathrm{N/kg}$ och $\\cos 60^{\\circ} = 0{,}50$.)',
    choices: ['20 N', '10 N', '17 N', '2,0 N'],
    correct: 1,
    why: [
      'Detta är $m \\cdot g$ utan att multiplicera med $\\cos 60^{\\circ}$ — hela tyngdkraften, inte normalkraften.',
      'Normalkraften är $F_\\mathrm{N} = F_2 = m \\cdot g \\cdot \\cos \\alpha = 2{,}0 \\cdot 10 \\cdot 0{,}50 = 10\\ \\mathrm{N}$.',
      'Detta värde stämmer med $\\sin 60^{\\circ} \\approx 0{,}87$ multiplicerat med tyngdkraften — men det ger komposanten NEDFÖR planet, inte normalkraften.',
      'Detta är bara föremålets massa i kg, inte en kraft i newton.',
    ],
  },
],

'fy1-3.8': [
  {
    question: 'Vad är en spännkraft, enligt genomgången?',
    choices: [
      'Kraften ett underlag utövar vinkelrätt mot ett föremål',
      'Kraften som motverkar rörelse mellan två ytor',
      'Kraften som verkar längs ett spänt rep, en lina eller en fjäder',
      'Kraften som jorden drar alla föremål mot sitt centrum med',
    ],
    correct: 2,
    why: [
      'Det beskriver normalkraften, inte spännkraften.',
      'Det beskriver friktionskraften, inte spännkraften.',
      'En spännkraft är just den kraft som verkar längs ett spänt rep, en lina eller en fjäder.',
      'Det beskriver tyngdkraften, inte spännkraften.',
    ],
  },
  {
    question: 'I det SYMMETRISKA fallet med sneda spännkrafter — vad ska man, enligt skisstekniken, göra efter att ha ritat tyngdkraften nedåt?',
    choices: [
      'Dra en streckad linje på halva tyngdkraftens sträcka OVANFÖR föremålet, för att få en gemensam höjd åt komposanterna',
      'Dra en streckad linje dubbelt så lång som tyngdkraften nedanför föremålet',
      'Rita normalkraften uppåt direkt från föremålets tyngdpunkt',
      'Beräkna friktionskraften innan man ritar några vektorer',
    ],
    correct: 0,
    why: [
      'Enligt tipset ritar man en streckad linje på HALVA tyngdkraftens sträcka OVANFÖR föremålet — det ger en gemensam höjd som båda komposanterna ska nå upp till.',
      'Linjen ska vara på halva tyngdkraftens sträcka, inte dubbelt så lång, och den ritas ovanför föremålet, inte nedanför.',
      'Det symmetriska fallet med sneda spännkrafter handlar inte om normalkraft — det gäller ett föremål som hänger i två snören.',
      'Friktionskraft nämns inte i detta avsnitt om sneda spännkrafter.',
    ],
  },
  {
    question: 'I det ASYMMETRISKA fallet — vad är det första steget i konstruktionen, enligt genomgången?',
    choices: [
      'Mäta vinkeln mellan de två repen med gradskiva',
      'Rita normalkraften vinkelrätt mot ett tänkt plan',
      'Beräkna spännkraften direkt med $F = m \\cdot g$',
      'Dra en streckad, uppåtriktad kraftvektor som är lika stor som tyngdkraften nedåt',
    ],
    correct: 3,
    why: [
      'Gradskiva och vinkelmätning nämns inte som en del av konstruktionstekniken.',
      'Normalkraft är inte aktuellt här — sneda spännkrafter handlar om ett föremål som hänger i rep, inte om ett underlag.',
      'Spännkraften i respektive rep kan inte beräknas direkt med $F = m \\cdot g$ — det är just poängen med konstruktionen att bestämma dem grafiskt.',
      'Första steget i det asymmetriska fallet är att dra en streckad, uppåtriktad kraftvektor lika stor som tyngdkraften nedåt.',
    ],
  },
  {
    question: 'Vad föreställer den streckade, uppåtriktade vektorn (lika stor som tyngdkraften) i konstruktionen för sneda spännkrafter?',
    choices: [
      'Normalkraften från ett underlag',
      'Den resulterande kraft som de två spännkrafterna tillsammans måste ge, för att balansera tyngdkraften',
      'Friktionskraften mellan föremålet och luften',
      'Hälften av tyngdkraften',
    ],
    correct: 1,
    why: [
      'Det förekommer inget underlag i denna typ av uppgift — föremålet hänger fritt i rep.',
      'Den uppåtriktade vektorn visar den resulterande kraft som de två spännkrafterna tillsammans ska ge upphov till, så att den balanserar tyngdkraften och föremålet hänger stilla.',
      'Luftfriktion behandlas inte i detta avsnitt.',
      'Vektorn är lika stor som HELA tyngdkraften, inte hälften av den.',
    ],
  },
],

'fy1-3.9': [
  {
    question: 'Vad är avgörande för att bestämma accelerationens tecken (positiv eller negativ), enligt genomgången?',
    choices: [
      'Om föremålet rör sig uppåt eller nedåt',
      'Om farten ökar eller minskar',
      'Att ange hastigheter som vektorer, med tecken',
      'Föremålets massa',
    ],
    correct: 2,
    why: [
      'Rörelseriktningen (upp eller ner) i sig avgör inte tecknet — det är hastighetens FÖRÄNDRING som avgör accelerationens tecken.',
      'Farten (hastighetens storlek utan tecken) räcker inte — exemplen med hissen visar att farten kan öka samtidigt som accelerationen är negativ.',
      'Genomgången betonar att det avgörande är att ange hastigheter som vektorer med tecken, så att man ser om hastigheten (inte bara farten) ökar eller minskar.',
      'Massan påverkar inte accelerationens tecken, bara eventuellt dess storlek via en kraft.',
    ],
  },
  {
    question: 'En boll kastas rakt upp, med positiv riktning definierad uppåt. Vilket tecken har accelerationen under HELA kastet (på väg upp, i vändläget och på väg ner)?',
    choices: [
      'Negativ hela tiden',
      'Positiv på väg upp, negativ på väg ner',
      'Noll hela tiden',
      'Positiv hela tiden',
    ],
    correct: 0,
    why: [
      'Hastigheten minskar hela tiden (t.ex. från 6 m/s till 0 till −6 m/s), så accelerationen är konstant och negativ under hela kastet.',
      'Accelerationen är densamma (tyngdaccelerationen) genom hela kastet — den byter inte tecken i vändläget.',
      'Accelerationen är inte noll — då skulle hastigheten inte alls ändras, men den minskar hela tiden.',
      'Om accelerationen vore positiv skulle hastigheten öka, men den minskar (blir mer negativ) genom hela kastet.',
    ],
  },
  {
    question: 'Vilket värde har accelerationen i exemplet med bollen som kastas rakt upp, med positiv riktning definierad uppåt?',
    choices: [
      '$0\\ \\mathrm{m/s^2}$',
      '$9{,}82\\ \\mathrm{m/s^2}$',
      '$6{,}0\\ \\mathrm{m/s^2}$',
      '$-9{,}82\\ \\mathrm{m/s^2}$',
    ],
    correct: 3,
    why: [
      'Accelerationen är inte noll — bollens hastighet ändras hela tiden på grund av tyngdkraften.',
      'Storleken stämmer, men tecknet är fel — eftersom positiv riktning är definierad uppåt och tyngdaccelerationen verkar nedåt blir den negativ.',
      'Detta är den hastighet bollen har i ett av lägena i figuren, inte accelerationens värde.',
      'Accelerationen är tyngdaccelerationen, $9{,}82\\ \\mathrm{m/s^2}$, men eftersom positiv riktning är uppåt och tyngdkraften verkar nedåt blir den negativ.',
    ],
  },
  {
    question: 'En hiss ökar farten på väg NER (positiv riktning definierad uppåt). Vilket tecken har accelerationen?',
    choices: [
      'Positiv, eftersom farten ökar',
      'Negativ',
      'Noll',
      'Kan inte avgöras utan mer information',
    ],
    correct: 1,
    why: [
      'Att farten ökar räcker inte för slutsatsen — hastigheten (med tecken) går här från t.ex. 0 till −1 m/s till −2 m/s, alltså minskar den.',
      'Hastigheten går från 0 till −1 m/s till −2 m/s, alltså minskar den, vilket ger en negativ acceleration — trots att farten ökar.',
      'Accelerationen är inte noll eftersom hastigheten hela tiden ändras.',
      'Det går att avgöra: med positiv riktning uppåt minskar hastigheten (blir mer negativ) när farten ökar nedåt, så accelerationen är negativ.',
    ],
  },
  {
    question: 'En hiss bromsar in farten på väg NER (positiv riktning definierad uppåt). Vilket tecken har accelerationen?',
    choices: [
      'Negativ, eftersom hissen rör sig nedåt',
      'Noll, eftersom hissen bromsar',
      'Positiv',
      'Kan inte avgöras utan mer information',
    ],
    correct: 2,
    why: [
      'Att hissen rör sig nedåt räcker inte — det är hastighetens förändring som avgör tecknet, och här ökar hastigheten (t.ex. från −2 m/s till −1 m/s till 0).',
      'Accelerationen är inte noll eftersom hastigheten hela tiden ändras när hissen bromsar in.',
      'Hastigheten går från −2 m/s till −1 m/s till 0, alltså ökar den, vilket ger en positiv acceleration — trots att farten minskar.',
      'Det går att avgöra: hastigheten (med tecken) ökar mot noll, så accelerationen är positiv.',
    ],
  },
],

'fy1-3.10': [
  {
    question: 'Vad kallas ett hjul med kanter som en tråd, lina eller ett rep löper runt?',
    choices: ['Trissa', 'Kuggväxel', 'Rulle', 'Vinsch'],
    correct: 0,
    why: [
      'Ett sådant hjul kallas trissa, och om inget annat anges antas den snurra utan friktionskrafter.',
      'En kuggväxel har kuggar som griper i varandra — det är inte samma sak som en trissa med ett rep runt kanten.',
      'Rulle är inte begreppet som används i genomgången för detta hjul.',
      'En vinsch är en anordning som drar in ett rep med motorkraft, inte bara ett hjul repet löper runt.',
    ],
  },
  {
    question: 'Vad gäller för spännkraften i ett snöre som löper över en friktionsfri trissa, enligt genomgången?',
    choices: [
      'Den är störst vid trissan och minskar mot ändarna.',
      'Den är noll i trissans båge men lika stor i de raka delarna.',
      'Den ökar med snörets längd.',
      'Den är lika stor i hela snöret och i dess fästpunkter.',
    ],
    correct: 3,
    why: [
      'Spännkraften varierar inte längs snöret på detta sätt — den är densamma överallt i ett snöre över en friktionsfri trissa.',
      'Spännkraften är inte noll någonstans i ett spänt snöre som håller upp en vikt.',
      'Spännkraften beror på krafterna i systemet (vikterna), inte på snörets längd.',
      'Enligt genomgången är spännkraften i ett snöre lika stor i hela snöret och i dess fästpunkter.',
    ],
  },
  {
    question: 'Två vikter på $1{,}0\\ \\mathrm{kg}$ och $3{,}0\\ \\mathrm{kg}$ hänger i var sin ände av ett snöre som löper över två friktionsfria trissor, som i exemplet. Använd $g \\approx 10\\ \\mathrm{N/kg}$. Vad blir ungefär accelerationen?',
    choices: [
      '$2{,}0\\ \\mathrm{m/s^2}$',
      '$5{,}0\\ \\mathrm{m/s^2}$',
      '$10\\ \\mathrm{m/s^2}$',
      '$20\\ \\mathrm{m/s^2}$',
    ],
    correct: 1,
    why: [
      'Detta är för litet — kontrollera att du delat den resulterande kraften med HELA systemets massa ($4{,}0\\ \\mathrm{kg}$), inte med en enskild vikt.',
      'Resulterande kraft: $F_\\mathrm{R} = (3{,}0 - 1{,}0) \\cdot 10 = 20\\ \\mathrm{N}$. Total massa: $m_\\text{tot} = 3{,}0 + 1{,}0 = 4{,}0\\ \\mathrm{kg}$. Det ger $a = \\frac{20}{4{,}0} = 5{,}0\\ \\mathrm{m/s^2}$.',
      'Detta motsvarar tyngdfaktorn $g$, inte systemets acceleration.',
      'Detta är den resulterande kraften i newton, inte accelerationen — den ska delas med systemets totala massa.',
    ],
  },
  {
    question: 'Hur bestämmer man, enligt exemplet, spännkraften i snöret mellan de två vikterna på trissorna?',
    choices: [
      'Genom att dela tyngdkraften på den tyngsta vikten med 2',
      'Genom att anta att spännkraften är noll eftersom trissan är friktionsfri',
      'Genom att titta på EN av vikterna för sig och ställa upp Newtons andra lag för just den',
      'Genom att titta på hela systemet, precis som vid beräkning av accelerationen',
    ],
    correct: 2,
    why: [
      'Spännkraften beräknas inte genom att dela en tyngdkraft med 2 — den bestäms genom en kraftanalys av en av vikterna.',
      'Att trissan är friktionsfri gör att spännkraften är lika stor i hela snöret — men den är inte noll, den håller ju upp vikterna.',
      'Enligt exemplet tittar man på EN av vikterna för sig, ritar ut krafterna på den och löser ut spännkraften ur Newtons andra lag.',
      'Att titta på hela systemet ger accelerationen, men för att få fram spännkraften måste man istället isolera en av vikterna.',
    ],
  },
  {
    question: 'En vikt med massan $1{,}0\\ \\mathrm{kg}$ hänger i ett snöre över en trissa och accelererar uppåt med $2{,}0\\ \\mathrm{m/s^2}$. Använd $g \\approx 10\\ \\mathrm{N/kg}$. Hur stor är spännkraften $F_\\mathrm{S}$ i snöret?',
    choices: ['12 N', '10 N', '2,0 N', '8,0 N'],
    correct: 0,
    why: [
      'Resulterande kraft: $F_\\mathrm{R} = m \\cdot a = 1{,}0 \\cdot 2{,}0 = 2{,}0\\ \\mathrm{N}$. Eftersom $F_\\mathrm{R} = F_\\mathrm{S} - F_\\mathrm{G}$ blir $F_\\mathrm{S} = F_\\mathrm{R} + F_\\mathrm{G} = 2{,}0 + 10 = 12\\ \\mathrm{N}$.',
      'Detta är bara tyngdkraften $F_\\mathrm{G} = m \\cdot g$ — men eftersom vikten accelererar uppåt måste spännkraften vara STÖRRE än tyngdkraften.',
      'Detta är bara den resulterande kraften $F_\\mathrm{R}$, inte hela spännkraften — den resulterande kraften ska läggas till tyngdkraften.',
      'Detta skulle gälla om spännkraften vore MINDRE än tyngdkraften, vilket motsvarar en nedåtriktad acceleration — men vikten accelererar uppåt.',
    ],
  },
],

// ── 05-fy1-ch4a.js ────────────────────────────────────────────

'fy1-4.1': [
  {
    question: 'Vilken är den korrekta SI-enheten för energi?',
    choices: ['N (newton)', 'W (watt)', 'J (joule)', 'K (kelvin)'],
    correct: 2,
    why: [
      'Newton (N) är enheten för kraft, en helt annan storhet än energi.',
      'Watt (W) är enheten för effekt, alltså energi per tidsenhet — inte energin i sig.',
      'Energi betecknas *E* och har SI-enheten J (joule), precis som genomgången anger.',
      'Kelvin (K) är enheten för temperatur och har ingen direkt koppling till energimängd här.',
    ],
  },
  {
    question: 'Vilken energiform hör ihop med elektroner som rör sig, enligt genomgången?',
    choices: ['Elektrisk energi', 'Kemisk energi', 'Strålningsenergi', 'Kärnenergi'],
    correct: 0,
    why: [
      'Elektrisk energi är just energin hos elektroner i rörelse, precis som genomgången beskriver.',
      'Kemisk energi finns lagrad i mat, bränslen och batteriers processer — inte i elektroners rörelse.',
      'Strålningsenergi kommer till exempel från solen, inte från elektroner som rör sig i en krets.',
      'Kärnenergi är energi lagrad i atomkärnor, en helt annan energiform.',
    ],
  },
  {
    question: 'Vilken formel gäller för arbete?',
    choices: [
      '$W = F \\cdot t$',
      '$W = m \\cdot a$',
      '$W = \\frac{F}{s}$',
      '$W = F_\\mathrm{s} \\cdot s$',
    ],
    correct: 3,
    why: [
      'Kraft gånger tid definierar inte arbete — tid ingår inte i arbetsformeln.',
      '$m \\cdot a$ är Newtons andra lag och ger en kraft, inte ett arbete.',
      'Att dividera kraft med sträcka ger varken arbete eller någon storhet som förekommer i genomgången.',
      'Detta är precis formeln i genomgången: arbetet är kraften i rörelsens riktning multiplicerad med sträckan.',
    ],
  },
  {
    question: 'Vad stämmer om arbete jämfört med energi, enligt genomgången?',
    choices: [
      'Arbete är en egen energiform som är skild från alla andra energiformer',
      'Arbete är en process där energi omvandlas från en form till en annan — inte en egen energiform',
      'Arbete kan bara uträttas när elektrisk energi omvandlas',
      'Arbete mäts alltid i watt, till skillnad från energi som mäts i joule',
    ],
    correct: 1,
    why: [
      'Arbete räknas inte som en egen energiform i genomgången — det är en process, inte en lagringsform.',
      'Genomgången påpekar uttryckligen att arbete, trots samma enhet som energi, inte är en energiform utan en process där energi byter form.',
      'Arbete kan uträttas av vilken kraft som helst som ger en förflyttning, inte bara vid omvandling av elektrisk energi.',
      'Arbete har samma enhet som energi (Nm eller J) — watt är enheten för effekt, inte arbete.',
    ],
  },
  {
    question: 'En person puttar en låda 4,0 m med en kraft på 50 N i lådans rörelseriktning. Hur stort arbete uträttas?',
    choices: ['200 Nm', '54 Nm', '12,5 Nm', '0,08 Nm'],
    correct: 0,
    why: [
      'Insättning i $W = F_\\mathrm{s} \\cdot s$ ger $W = 50 \\cdot 4{,}0 = 200\\ \\mathrm{Nm}$.',
      'Detta stämmer inte med formeln $W = F_\\mathrm{s} \\cdot s$ — kraften och sträckan ska multipliceras, inte adderas.',
      'Detta fås om man av misstag dividerar kraften med sträckan istället för att multiplicera dem.',
      'Detta fås om man av misstag dividerar sträckan med kraften istället för att multiplicera dem.',
    ],
  },
  {
    question: 'En kraft verkar hela tiden vinkelrätt (90°) mot rörelseriktningen hos ett föremål. Hur stort blir arbetet som denna kraft uträttar?',
    choices: [
      'Lika stort som $F \\cdot s$',
      'Hälften så stort som $F \\cdot s$',
      '0, eftersom kraften saknar komposant i rörelseriktningen',
      'Beror på föremålets massa',
    ],
    correct: 2,
    why: [
      'Fullt arbete $F \\cdot s$ hade krävt att hela kraften låg i rörelseriktningen, vilket inte är fallet vid 90°.',
      'Arbetet beror på kraftens komposant i rörelseriktningen — det finns ingen grund för en godtycklig halvering här.',
      'När kraften är vinkelrät mot rörelsen är $F_\\mathrm{s} = 0$ — precis som i exemplet med Martin som bär lådan blir det inget arbete.',
      'Arbete beror på kraftens komposant och sträckan, inte på föremålets massa.',
    ],
  },
],

'fy1-4.2': [
  {
    question: 'Vilken formel ger lägesenergin $E_\\mathrm{p}$?',
    choices: [
      '$E_\\mathrm{p} = \\frac{m \\cdot v^{2}}{2}$',
      '$E_\\mathrm{p} = m \\cdot g \\cdot h$',
      '$E_\\mathrm{p} = F \\cdot s$',
      '$E_\\mathrm{p} = m \\cdot g$',
    ],
    correct: 1,
    why: [
      'Detta är i stället formeln för rörelseenergi (kinetisk energi), inte lägesenergi.',
      'Detta är formeln för lägesenergi: massa gånger tyngdfaktor gånger höjd över nollnivån.',
      'Detta är den generella formeln för arbete — lägesenergi beräknas i stället med $m \\cdot g \\cdot h$.',
      'Höjden *h* saknas i detta uttryck, och utan höjd kan ingen lägesenergi beräknas.',
    ],
  },
  {
    question: 'Vad är nollnivån vid beräkning av lägesenergi, enligt genomgången?',
    choices: [
      'Alltid marken, och den kan aldrig flyttas',
      'Den högsta punkten i systemet',
      'En fast höjd som alltid ligger 0 meter över havet',
      'En referenspunkt som kan väljas fritt, där lägesenergin sätts till 0',
    ],
    correct: 3,
    why: [
      'Nollnivån sätts ofta vid golvet eller marken, men genomgången säger uttryckligen att den kan sättas var som helst.',
      'Nollnivån brukar snarare sättas längst ner i systemet, inte vid den högsta punkten.',
      'Nollnivån har ingen koppling till havsnivå — den är en fritt vald referenspunkt i det aktuella systemet.',
      'Nollnivån är just en valfri referenspunkt (ofta satt längst ner i systemet) där lägesenergin definieras som 0.',
    ],
  },
  {
    question: 'Ett föremål befinner sig under den valda nollnivån. Vad gäller för dess lägesenergi enligt genomgången?',
    choices: [
      'Den blir negativ, även om verklig energi i sig aldrig kan vara negativ',
      'Den blir automatiskt 0',
      'Beräkningen blir omöjlig att genomföra',
      'Den blir lika stor som om föremålet låg ovanför nollnivån',
    ],
    correct: 0,
    why: [
      'Genomgången anger uttryckligen att lägesenergin kan bli negativ om föremålet befinner sig under den valda nollnivån, även om energi i verklig mening aldrig är negativ.',
      'Lägesenergin blir inte automatiskt 0 bara för att föremålet ligger under nollnivån — den kan bli negativ.',
      'Formeln $E_\\mathrm{p} = m \\cdot g \\cdot h$ fungerar även för negativa höjder — beräkningen är fullt möjlig.',
      'Höjden räknas med tecken relativt nollnivån, så ett läge under nollnivån ger inte samma värde som ovanför.',
    ],
  },
  {
    question: 'En bok kan ligga platt på ett bord eller stå upprätt på högkant. Hur skiljer sig lägesenergin mellan de två lägena?',
    choices: [
      'Lägesenergin är alltid lika stor oavsett hur boken ligger, eftersom massan är densamma',
      'Boken som ligger platt har störst lägesenergi',
      'Boken på högkant har större lägesenergi, eftersom dess tyngdpunkt då ligger högre',
      'Lägesenergi beror bara på volymen, inte på var tyngdpunkten befinner sig',
    ],
    correct: 2,
    why: [
      'Massan är visserligen densamma, men höjden på tyngdpunkten skiljer sig mellan de två lägena, vilket ger olika lägesenergi.',
      'Boken som ligger platt har lägre tyngdpunkt och därmed lägre, inte högre, lägesenergi.',
      'Genomgången påpekar just att det är tyngdpunktens höjd som avgör lägesenergin, och den ligger högre när boken står på högkant.',
      'Det är tyngdpunktens läge i höjdled som avgör lägesenergin, inte föremålets volym.',
    ],
  },
  {
    question: 'En låda med massan 2,0 kg lyfts 5,0 m rakt upp. Tyngdfaktorn är $g = 9{,}82\\ \\mathrm{N/kg}$. Ungefär hur stor blir ökningen av lägesenergi?',
    choices: ['≈49 J', '≈98 J', '≈10 J', '≈500 J'],
    correct: 1,
    why: [
      'Detta är ungefär halva det korrekta värdet — tyngdfaktorn *g* har inte räknats med fullt ut.',
      'Insättning i $E_\\mathrm{p} = m \\cdot g \\cdot h$ ger $2{,}0 \\cdot 9{,}82 \\cdot 5{,}0 \\approx 98\\ \\mathrm{J}$.',
      'Detta motsvarar bara $m \\cdot h$ utan att tyngdfaktorn *g* räknats med alls.',
      'Detta är för stort — kontrollera att alla tre faktorer (*m*, *g* och *h*) multiplicerats en gång var, inte fler.',
    ],
  },
],

'fy1-4.3': [
  {
    question: 'Vilken formel ger rörelseenergin?',
    choices: [
      '$E_\\mathrm{k} = m \\cdot v$',
      '$E_\\mathrm{k} = \\frac{m \\cdot v}{2}$',
      '$E_\\mathrm{k} = m \\cdot g \\cdot h$',
      '$E_\\mathrm{k} = \\frac{m \\cdot v^{2}}{2}$',
    ],
    correct: 3,
    why: [
      'Denna formel saknar kvadraten på hastigheten och motsvarar inte rörelseenergi.',
      'Hastigheten ska vara kvadrerad i formeln för rörelseenergi, inte bara multiplicerad med massan och delad med två.',
      'Detta är i stället formeln för lägesenergi, en annan energiform.',
      'Detta är formeln för rörelseenergi: massan gånger hastigheten i kvadrat, delat med två.',
    ],
  },
  {
    question: 'Om hastigheten hos ett föremål fördubblas, medan massan är oförändrad, vad händer med dess rörelseenergi?',
    choices: ['Den fyrdubblas', 'Den fördubblas', 'Den halveras', 'Den är oförändrad'],
    correct: 0,
    why: [
      'Eftersom $E_\\mathrm{k} \\propto v^{2}$ ger en fördubblad hastighet en fyrdubblad rörelseenergi ($2^{2} = 4$).',
      'Rörelseenergin beror på hastigheten i kvadrat, inte linjärt, så den ökar mer än bara en fördubbling.',
      'Rörelseenergin ökar när hastigheten ökar — den minskar inte.',
      'Rörelseenergin beror direkt på hastigheten, så en ändrad hastighet ger också en ändrad rörelseenergi.',
    ],
  },
  {
    question: 'Vilken SI-enhet har rörelseenergi?',
    choices: ['N (newton)', 'W (watt)', 'J (joule)', 'm/s'],
    correct: 2,
    why: [
      'Newton (N) är enheten för kraft, inte för energi.',
      'Watt (W) är enheten för effekt (energi per tidsenhet), inte för energin i sig.',
      'Rörelseenergi är en energiform och har därför SI-enheten J (joule), precis som alla andra energiformer.',
      'm/s är enheten för hastighet, som ingår i formeln, men rörelseenergin i sig mäts i joule.',
    ],
  },
  {
    question: 'Ett föremål med massan 4,0 kg rör sig med farten 5,0 m/s. Hur stor är dess rörelseenergi?',
    choices: ['100 J', '50 J', '20 J', '10 J'],
    correct: 1,
    why: [
      'Detta fås om man glömmer att dela med två efter att ha kvadrerat hastigheten.',
      'Insättning i $E_\\mathrm{k} = \\frac{m \\cdot v^{2}}{2}$ ger $\\frac{4{,}0 \\cdot 5{,}0^{2}}{2} = \\frac{100}{2} = 50\\ \\mathrm{J}$.',
      'Detta motsvarar bara $m \\cdot v$ utan att hastigheten kvadrerats.',
      'Detta är för litet — kontrollera att hastigheten verkligen kvadrerats innan division med två.',
    ],
  },
  {
    question: 'Enligt härledningen i genomgången, vad motsvarar ökningen av ett föremåls rörelseenergi?',
    choices: [
      'Föremålets lägesenergi',
      'Föremålets vikt multiplicerad med tiden',
      'Enbart den kraft som verkar på föremålet',
      'Det arbete som krävdes för att ge föremålet dess hastighet',
    ],
    correct: 3,
    why: [
      'Lägesenergi hör ihop med höjd i ett kraftfält, inte med härledningen av rörelseenergi.',
      'Vikt multiplicerad med tid förekommer inte i härledningen och ger inte rätt enhet för energi.',
      'Kraften ensam ger inte en energi — det är kraften multiplicerad med sträckan (arbetet) som motsvarar energiändringen.',
      'Härledningen utgår just från att $E_\\mathrm{k} = W = F_\\mathrm{s} \\cdot s$ — rörelseenergin byggs upp av det arbete som den accelererande kraften uträttar.',
    ],
  },
],

'fy1-4.4': [
  {
    question: 'Vad säger energiprincipen?',
    choices: [
      'Energi kan varken skapas eller förstöras, bara omvandlas mellan olika former',
      'Energi kan skapas men aldrig förstöras',
      'Energi minskar alltid långsamt över tid',
      'Energi är konstant bara i system som saknar massa',
    ],
    correct: 0,
    why: [
      'Detta är precis energiprincipens innebörd enligt genomgången: energi omvandlas mellan former men varken skapas eller förstörs.',
      'Energiprincipen tillåter inte att energi skapas — den kan bara omvandlas.',
      'Energiprincipen handlar om att den totala energin är konstant i ett slutet system, inte om en gradvis minskning.',
      'Energiprincipen gäller alla slutna system oavsett massa — den är inte begränsad till masslösa system.',
    ],
  },
  {
    question: 'Vad kännetecknar ett slutet system enligt genomgången?',
    choices: [
      'Ett system helt utan friktion mellan ytor',
      'Ett system som bara innehåller rörelseenergi',
      'Ett system där ingen energi kan läcka ut, så att den totala energin i systemet är konstant',
      'Ett system som inte rör sig alls',
    ],
    correct: 2,
    why: [
      'Ett slutet system kan mycket väl ha friktion inuti sig (då omvandlas energi till värme) — det avgörande är att ingen energi läcker ut ur systemet.',
      'Ett slutet system kan innehålla flera energiformer samtidigt, inte bara rörelseenergi.',
      'Genomgången definierar just ett slutet system som ett system där ingen energi kan läcka ut, vilket gör att den totala energin blir konstant.',
      'Ett slutet system handlar om att energin inte läcker ut, inte om att systemet står stilla.',
    ],
  },
  {
    question: 'Vilket samband definierar den mekaniska energin $E_\\mathrm{m}$?',
    choices: [
      '$E_\\mathrm{m} = E_\\mathrm{p} - E_\\mathrm{k}$',
      '$E_\\mathrm{m} = E_\\mathrm{p} + E_\\mathrm{k}$',
      '$E_\\mathrm{m} = E_\\mathrm{p} \\cdot E_\\mathrm{k}$',
      '$E_\\mathrm{m} = \\frac{E_\\mathrm{p}}{E_\\mathrm{k}}$',
    ],
    correct: 1,
    why: [
      'Mekanisk energi är summan, inte skillnaden, av de två energiformerna.',
      'Mekanisk energi definieras just som summan av potentiell (läges-) energi och rörelseenergi.',
      'Att multiplicera de två energiformerna ger varken rätt enhet (J) eller rätt fysikaliskt samband.',
      'Att dividera de två energiformerna ger ett förhållandetal utan enhet, inte en energi.',
    ],
  },
  {
    question: 'Vad gäller för den mekaniska energin i ett system där friktionsvärme uppstår?',
    choices: [
      'Den mekaniska energin ökar',
      'Den mekaniska energin är alltid konstant, oavsett friktion',
      'Friktion påverkar bara lägesenergin, inte rörelseenergin',
      'Den mekaniska energin minskar, och minskningen motsvarar värmeenergin som uppstår',
    ],
    correct: 3,
    why: [
      'Friktion omvandlar mekanisk energi till värme — den mekaniska energin ökar inte av detta.',
      'Mekanisk energi är bara konstant om det saknas friktionsvärme eller andra energiförluster.',
      'Friktion kan påverka rörelsen (och därmed rörelseenergin) precis lika mycket som lägesenergin — den är inte begränsad till en av dem.',
      'När friktionsvärme uppstår minskar den mekaniska energin, och denna minskning är precis det som blir värmeenergin $E_\\mathrm{v}$.',
    ],
  },
  {
    question: 'Hur kan friktionsvärmen $E_\\mathrm{v}$ beräknas enligt genomgången?',
    choices: [
      'Antingen som skillnaden i mekanisk energi eller som $F_\\mathrm{f} \\cdot s$',
      'Bara genom att mäta temperaturökningen direkt',
      'Som $m \\cdot g \\cdot h$',
      'Som $\\frac{m \\cdot v^{2}}{2}$ enbart',
    ],
    correct: 0,
    why: [
      'Genomgången anger två likvärdiga sätt: $E_\\mathrm{v} = \\Delta E_\\mathrm{m}$ eller $E_\\mathrm{v} = F_\\mathrm{f} \\cdot s$.',
      'Genomgången beräknar friktionsvärmen med energiskillnad eller friktionskraft gånger sträcka, inte via en temperaturmätning.',
      'Detta är formeln för lägesenergi, inte för friktionsvärme.',
      'Detta är formeln för rörelseenergi ensam — friktionsvärmen beräknas i stället som en skillnad eller via friktionskraften.',
    ],
  },
  {
    question: 'Ett föremål släpps från vila och faller fritt från höjden 5,0 m ovanför marken (nollnivån). Bortse från luftmotstånd. Ungefär hur stor är farten precis innan föremålet slår i marken?',
    choices: ['≈5,0 m/s', '≈50 m/s', '≈10 m/s', '≈98 m/s'],
    correct: 2,
    why: [
      'Detta är för litet — kom ihåg att både faktorn 2 och tyngdfaktorn *g* ska vara med under rottecknet.',
      'Detta är för stort — resultatet ska bli runt 10 m/s, inte 50 m/s; kontrollera uträkningen under rottecknet.',
      'Energiprincipen ger $v = \\sqrt{2 \\cdot g \\cdot h} = \\sqrt{2 \\cdot 9{,}82 \\cdot 5{,}0} \\approx \\sqrt{98} \\approx 10\\ \\mathrm{m/s}$.',
      'Detta är värdet under rottecknet ($2 \\cdot g \\cdot h \\approx 98$) — glöm inte att dra roten ur det för att få farten.',
    ],
  },
],

'fy1-4.5': [
  {
    question: 'Vilken formel definierar effekt?',
    choices: [
      '$P = \\Delta E \\cdot \\Delta t$',
      '$P = \\frac{\\Delta E}{\\Delta t}$',
      '$P = \\frac{\\Delta t}{\\Delta E}$',
      '$P = m \\cdot a$',
    ],
    correct: 1,
    why: [
      'Att multiplicera energi med tid ger inte rätt enhet eller rätt fysikaliskt samband för effekt.',
      'Effekt definieras just som omvandlad energi per tidsenhet, $P = \\frac{\\Delta E}{\\Delta t}$.',
      'Detta är det omvända förhållandet — effekt är energi delat med tid, inte tvärtom.',
      '$m \\cdot a$ är Newtons andra lag och ger en kraft, inte en effekt.',
    ],
  },
  {
    question: 'Vilken SI-enhet har effekt?',
    choices: ['J (joule)', 'N (newton)', 'Nm', 'W (watt)'],
    correct: 3,
    why: [
      'Joule (J) är enheten för energi och arbete, inte för effekt.',
      'Newton (N) är enheten för kraft, en annan storhet än effekt.',
      'Nm är en alternativ enhet för arbete/energi, inte för effekt.',
      'Effekt betecknas *P* och har SI-enheten W (watt), enligt genomgången.',
    ],
  },
  {
    question: 'Emilia och Filip tar sig upp för samma trappa och uträttar därför exakt samma arbete. Filip springer och är dubbelt så snabb som Emilia. Vad gäller för deras effekt?',
    choices: [
      'Filips effekt är dubbelt så stor som Emilias',
      'Filips effekt är hälften så stor som Emilias',
      'Effekten är lika stor för båda, eftersom arbetet är detsamma',
      'Effekten kan inte jämföras utan att känna till deras massa',
    ],
    correct: 0,
    why: [
      'Samma arbete uträttat på halva tiden ger dubbelt så stor effekt, precis som i exemplet med Emilia i trappan.',
      'Att uträtta samma arbete snabbare ger högre, inte lägre, effekt.',
      'Effekten beror på arbetet delat med tiden — även om arbetet är lika stort blir effekten olika eftersom tiden skiljer sig.',
      'Massan behövs för att räkna ut själva arbetet, men effekten kan här jämföras direkt via tidsskillnaden eftersom arbetet redan är detsamma för båda.',
    ],
  },
  {
    question: 'Vilket samband mellan enheterna stämmer enligt genomgången?',
    choices: [
      '$1\\ \\mathrm{W} = 1\\ \\mathrm{J} \\cdot \\mathrm{s}$',
      '$1\\ \\mathrm{J} = 1\\ \\mathrm{W} \\cdot \\mathrm{s}^{2}$',
      '$1\\ \\mathrm{W} = 1\\ \\mathrm{J/s}$',
      '$1\\ \\mathrm{W} = 1\\ \\mathrm{N/s}$',
    ],
    correct: 2,
    why: [
      'Att multiplicera joule med sekunder ger inte watt, utan en annan (ovanlig) enhet.',
      'Rätt samband är $1\\ \\mathrm{J} = 1\\ \\mathrm{Ws}$ (utan kvadrat på sekunden), inte med $\\mathrm{s}^{2}$.',
      'Genomgången anger just $1\\ \\mathrm{W} = 1\\ \\mathrm{J/s}$ — en watt är en joule per sekund.',
      'Watt definieras via joule och sekund, inte via newton och sekund.',
    ],
  },
  {
    question: 'Hur många joule motsvarar 1 kWh, enligt genomgången?',
    choices: [
      '$3{,}6 \\cdot 10^{3}\\ \\mathrm{J}$',
      '$3{,}6 \\cdot 10^{6}\\ \\mathrm{J}$',
      '$1\\,000\\ \\mathrm{J}$',
      '$3\\,600\\ \\mathrm{J}$',
    ],
    correct: 1,
    why: [
      'Denna tiopotens är tusen gånger för liten — glöm inte att multiplicera med både 1 000 W och 3 600 s.',
      'Genomgången räknar ut att $1\\ \\mathrm{kWh} = 1\\,000\\ \\mathrm{W} \\cdot 3\\,600\\ \\mathrm{s} = 3{,}6 \\cdot 10^{6}\\ \\mathrm{J}$.',
      'Detta motsvarar bara antalet sekunder på ungefär en kvart, inte den energi som 1 kWh innehåller.',
      'Detta är antalet sekunder på en timme, men inte omvandlat till joule via effekten 1 000 W.',
    ],
  },
  {
    question: 'En glödlampa med effekten 100 W lyser i 10 sekunder. Hur mycket energi omvandlas?',
    choices: ['10 J', '100 J', '10 kJ', '1,0 kJ'],
    correct: 3,
    why: [
      'Detta är alldeles för litet — kontrollera att effekten (100 W) verkligen multiplicerats med hela tiden (10 s).',
      'Detta motsvarar bara effekten multiplicerad med en sekund, inte med de fulla 10 sekunderna.',
      'Detta är tio gånger för stort — dubbelkolla multiplikationen $100 \\cdot 10$.',
      'Insättning i $\\Delta E = P \\cdot \\Delta t$ ger $\\Delta E = 100 \\cdot 10 = 1\\,000\\ \\mathrm{J} = 1{,}0\\ \\mathrm{kJ}$.',
    ],
  },
],

// ── 06-fy1-ch4b.js ────────────────────────────────────────────

'fy1-4.6': [
  {
    question: 'Vad innebär det att en apparat har verkningsgraden $\\eta = 0{,}75$?',
    choices: [
      'Apparaten tar emot 75 J energi',
      'Apparaten är 75 % snabbare än andra apparater',
      '75 % av den tillförda energin blir nyttig energi',
      '75 % av energin försvinner helt utan att bli någon energiform alls',
    ],
    correct: 2,
    why: [
      'Verkningsgraden är ett förhållande mellan nyttig och tillförd energi (ett tal mellan 0 och 1) — den säger ingenting om hur många joule som faktiskt tillförs.',
      'Verkningsgraden beskriver energiomvandling, inte hastighet — en apparat kan ha hög verkningsgrad utan att vara "snabb".',
      'Det är precis vad verkningsgraden mäter: andelen av den tillförda energin som omvandlas till nyttig energi.',
      'Energi försvinner aldrig helt. Den energi som inte blir nyttig omvandlas i stället till en annan energiform, oftast värme.',
    ],
  },
  {
    question: 'Varför kan verkningsgraden $\\eta$ aldrig vara större än 1?',
    choices: [
      'Eftersom verkningsgrad alltid mäts i procent',
      'Eftersom en apparat inte kan avge mer energi än den tar emot',
      'Eftersom friktion gör att all energi försvinner',
      'Eftersom nyttig energi alltid är större än tillförd energi',
    ],
    correct: 1,
    why: [
      'Att uttrycka ett tal i procent är bara ett skrivsätt — det förklarar inte varför det finns en övre gräns.',
      'Det stämmer med energiprincipen: energi kan inte skapas, så den nyttiga energin kan aldrig överstiga den tillförda energin.',
      'Friktion är en anledning till att energi går förlorad i VISSA apparater, men det är inte skälet till att $\\eta \\leq 1$ gäller för alla apparater.',
      'Det är precis tvärtom: nyttig energi kan aldrig vara större än tillförd energi, vilket är just anledningen till att $\\eta \\leq 1$.',
    ],
  },
  {
    question: 'Vilket samband gäller för verkningsgraden $\\eta$?',
    choices: [
      '$\\eta = \\dfrac{E_\\mathrm{n}}{E_\\mathrm{t}}$',
      '$\\eta = \\dfrac{E_\\mathrm{t}}{E_\\mathrm{n}}$',
      '$\\eta = E_\\mathrm{n} \\cdot E_\\mathrm{t}$',
      '$\\eta = E_\\mathrm{t} - E_\\mathrm{n}$',
    ],
    correct: 0,
    why: [
      'Verkningsgraden definieras som nyttig energi delat med tillförd energi.',
      'Det är bråket upp och ner. Med tillförd energi i täljaren skulle talet bli större än 1 så fort apparaten faktiskt gör nytta, vilket strider mot definitionen.',
      'Verkningsgrad är ett förhållande (en division), inte en produkt av de två energierna.',
      'Det ger en energi (i joule), inte det enhetslösa tal mellan 0 och 1 som verkningsgraden ska vara.',
    ],
  },
  {
    question: 'En glödlampa tar emot 200 J elektrisk energi och avger 20 J som synligt ljus (resten blir värme). Vad är lampans verkningsgrad?',
    choices: [
      '0,90 (90 %)',
      '1,0 (100 %)',
      '10 (1 000 %)',
      '0,10 (10 %)',
    ],
    correct: 3,
    why: [
      'Det är förlusten (andelen som blir värme) som är 90 %, inte verkningsgraden. Hade lampan haft 90 % verkningsgrad vore den lika effektiv som en elmotor.',
      'Eftersom energi varken skapas eller förstörs kan det vara lockande att tro att verkningsgraden alltid är 100 % — men verkningsgraden mäter bara den NYTTIGA delen (här synligt ljus), inte all omvandlad energi inklusive spillvärme.',
      'Att dela fel väg, $E_\\mathrm{t}/E_\\mathrm{n} = 200/20 = 10$, ger ett tal större än 1 — omöjligt för en verkningsgrad.',
      '$\\eta = E_\\mathrm{n}/E_\\mathrm{t} = 20/200 = 0{,}10$, alltså 10 % — den låga verkningsgrad som är typisk för glödlampor.',
    ],
  },
  {
    question: 'Enligt genomgångens tabell över typiska verkningsgrader — vilken av dessa har högst verkningsgrad?',
    choices: [
      'Människokroppen',
      'Spisen',
      'Bensinmotorn',
      'Elmotorn',
    ],
    correct: 1,
    why: [
      'Människokroppen har en verkningsgrad på ungefär 20 % — mycket av energin i maten blir kroppsvärme snarare än rörelse.',
      'Spisen har en verkningsgrad nära 100 %, eftersom nästan all tillförd energi blir just den värme vi vill ha.',
      'Bensinmotorn ligger på ungefär 30 % — större delen av bränslets energi blir spillvärme.',
      'Elmotorn har hög verkningsgrad, ungefär 90 %, men är ändå inte den högsta i tabellen.',
    ],
  },
],

'fy1-4.7': [
  {
    question: 'Vad kallas produkten av massa och hastighet, och vilken SI-enhet har den?',
    choices: [
      'Rörelseenergi, med enheten J',
      'Kraft, med enheten N',
      'Rörelsemängd, med enheten kg · m/s',
      'Impuls, med enheten Ns',
    ],
    correct: 2,
    why: [
      'Rörelseenergi definieras som $E_\\mathrm{k} = \\tfrac{1}{2} m v^2$ och mäts i joule — en helt annan storhet, trots att båda beror på massa och hastighet.',
      'Kraft mäts i newton och är inte samma sak som produkten av massa och hastighet.',
      'Rörelsemängd betecknas *p* och definieras som $p = m \\cdot v$, med SI-enheten kg · m/s.',
      'Impuls är en kraft som verkar under en viss tid, $I = F \\cdot \\Delta t$ — inte massa gånger hastighet.',
    ],
  },
  {
    question: 'Vilken riktning har rörelsemängdsvektorn $p$ hos ett föremål?',
    choices: [
      'Samma riktning som den kraft som verkar på föremålet',
      'Samma riktning som föremålets hastighet',
      'Motsatt riktning mot hastigheten',
      'Rörelsemängd är en skalär och saknar riktning',
    ],
    correct: 1,
    why: [
      'Det är i stället impulsen som har samma riktning som kraften — rörelsemängden följer hastighetens riktning.',
      'Rörelsemängd är en vektor med samma riktning som hastigheten, eftersom $p = m \\cdot v$ och massan bara skalar om vektorns längd.',
      'Om riktningen vore motsatt hastigheten skulle ett föremål som rör sig åt höger ha rörelsemängd åt vänster, vilket inte stämmer.',
      'Rörelsemängd är tvärtom en vektor, precis som hastighet och kraft — den har både storlek och riktning.',
    ],
  },
  {
    question: 'Vilket samband definierar impuls $I$?',
    choices: [
      '$I = \\dfrac{F}{\\Delta t}$',
      '$I = F + \\Delta t$',
      '$I = m \\cdot F$',
      '$I = F \\cdot \\Delta t$',
    ],
    correct: 3,
    why: [
      'Att dela kraften med tiden ger fel storhet och fel enhet — det är inte hur impuls definieras.',
      'Kraft och tid kan inte adderas rakt av — de har olika enheter (N respektive s).',
      'Massa och kraft multiplicerade med varandra ger varken rätt enhet eller rätt definition av impuls.',
      'Impuls definieras som kraften multiplicerad med den tid kraften verkar, $I = F \\cdot \\Delta t$, med SI-enheten Ns.',
    ],
  },
  {
    question: 'Vad säger impulslagen om sambandet mellan impuls $I$ och rörelsemängd?',
    choices: [
      'Impulsen är lika med förändringen av rörelsemängden, $I = \\Delta p$',
      'Impulsen är alltid lika med den totala rörelsemängden $p$',
      'Impulsen är lika med rörelsemängden delat med tiden',
      'Impuls och rörelsemängd är exakt samma storhet, bara med olika namn',
    ],
    correct: 0,
    why: [
      'Impulslagen säger just detta: $I = \\Delta p = m \\cdot \\Delta v$ — en impuls ger en lika stor ändring av rörelsemängden.',
      'Impulsen motsvarar bara ÄNDRINGEN av rörelsemängden, inte hela den rörelsemängd föremålet redan hade innan.',
      'Det uttrycket liknar i stället en kraft (jämför Newtons andra lag), inte impulsen själv.',
      'Rörelsemängd (kg · m/s) och impuls (Ns) har visserligen samma enhet, men de är olika begrepp: impuls är orsaken till en ändring av rörelsemängden, inte samma sak som rörelsemängden.',
    ],
  },
  {
    question: 'I en $F$-$t$-graf (kraft mot tid) motsvaras impulsen av vad?',
    choices: [
      'Lutningen på grafen',
      'Arean under grafen',
      'Höjden på grafen vid $t = 0$',
      'Grafens skärningspunkt med $y$-axeln',
    ],
    correct: 1,
    why: [
      'Lutningen på en $F$-$t$-graf beskriver hur snabbt kraften ändras, inte hur stor impulsen är.',
      'Eftersom impuls är produkten av kraft och tid, $I = F \\cdot \\Delta t$, motsvaras den av arean mellan grafen och tidsaxeln.',
      'Höjden vid en enda tidpunkt ger bara kraften just då — impulsen kräver att man summerar kraften över hela tiden den verkar.',
      'Skärningen med $y$-axeln visar bara kraften vid $t = 0$, inte den sammanlagda impulsen över hela tidsintervallet.',
    ],
  },
  {
    question: 'En bil med massan 1 000 kg ökar sin hastighet från 0 till 10 m/s. Hur stor är bilens rörelsemängdsändring (= impulsen som verkat på bilen)?',
    choices: [
      '100 kg · m/s',
      '1 000 kg · m/s',
      '10 000 kg · m/s',
      '10 kg · m/s',
    ],
    correct: 2,
    why: [
      'Att dela massan med hastigheten (1 000/10) ger fel storhet — rörelsemängd är en produkt, inte en kvot.',
      'Det motsvarar bara bilens massa i kg, utan att alls ta hänsyn till hastighetsändringen.',
      '$\\Delta p = m \\cdot \\Delta v = 1\\,000 \\cdot 10 = 10\\,000$ kg · m/s.',
      'Det motsvarar bara hastighetsändringen i m/s, utan att multiplicera med massan.',
    ],
  },
],

'fy1-4.8': [
  {
    question: 'Vad menas med att rörelsemängden i ett slutet system är bevarad?',
    choices: [
      'Varje föremåls hastighet i systemet förblir oförändrad',
      'Rörelseenergin i systemet är alltid konstant',
      'Den totala rörelsemängden i systemet är konstant om inga yttre krafter verkar',
      'Systemets totala massa ökar över tid',
    ],
    correct: 2,
    why: [
      'Tvärtom kan enskilda föremåls hastigheter ändras kraftigt vid en kollision — det är SUMMAN av rörelsemängderna som förblir konstant, inte varje enskild hastighet.',
      'Rörelseenergin bevaras bara vid elastiska stötar, inte generellt — men rörelsemängden bevaras i BÅDA typerna av stötar.',
      'Det är precis innebörden av rörelsemängdens bevarande: summan av alla föremåls rörelsemängd i systemet ändras inte, även om enskilda föremåls hastigheter ändras vid en kollision.',
      'Massan i ett slutet system varken skapas eller försvinner. Den ökar inte — och det är inte det bevarandelagen handlar om.',
    ],
  },
  {
    question: 'Vad kallas en kollision där föremålen studsar isär från varandra?',
    choices: [
      'Friktionsstöt',
      'Elastisk stöt',
      'Oelastisk stöt',
      'Inelastisk stöt',
    ],
    correct: 1,
    why: [
      '"Friktionsstöt" är inget begrepp som används i genomgången — kollisionstyperna beskrivs som elastiska eller oelastiska.',
      'En kollision där föremålen studsar mot varandra kallas elastisk stöt.',
      'Oelastisk stöt är i stället när föremålen hakar i varandra efter kollisionen — inte när de studsar isär.',
      'Inelastisk stöt är bara ett annat namn på oelastisk stöt, där föremålen hakar i varandra i stället för att studsa isär.',
    ],
  },
  {
    question: 'Vad kallas en kollision där föremålen hakar i varandra och får en gemensam sluthastighet?',
    choices: [
      'Oelastisk (inelastisk) stöt',
      'Elastisk stöt',
      'Central stöt',
      'Isolerad stöt',
    ],
    correct: 0,
    why: [
      'När föremål hakar i varandra vid krocken och rör sig med en gemensam hastighet kallas det just en oelastisk (eller inelastisk) stöt.',
      'Elastisk stöt är i stället när föremålen studsar isär från varandra, inte hakar ihop.',
      '"Central stöt" är inget begrepp som förekommer i genomgången.',
      'Det slutna systemet kan kallas isolerat, men själva STÖTEN kallas inte "isolerad stöt" — det är inget vedertaget begrepp.',
    ],
  },
  {
    question: 'Vilket samband gäller vid en fullkomligt inelastisk (oelastisk) stöt mellan föremål A och B, som efteråt rör sig med gemensam hastighet $v$?',
    choices: [
      '$m_\\mathrm{A} \\cdot v_\\mathrm{A} = m_\\mathrm{B} \\cdot v_\\mathrm{B}$',
      '$(m_\\mathrm{A} + m_\\mathrm{B}) \\cdot (v_\\mathrm{A} + v_\\mathrm{B}) = v$',
      '$m_\\mathrm{A} \\cdot v_\\mathrm{A} - m_\\mathrm{B} \\cdot v_\\mathrm{B} = (m_\\mathrm{A} + m_\\mathrm{B}) \\cdot v$',
      '$m_\\mathrm{A} \\cdot v_\\mathrm{A} + m_\\mathrm{B} \\cdot v_\\mathrm{B} = (m_\\mathrm{A} + m_\\mathrm{B}) \\cdot v$',
    ],
    correct: 3,
    why: [
      'Det uttrycket säger bara att de två föremålens rörelsemängder är lika stora före stöten — det säger ingenting om vad som händer EFTER stöten.',
      'Detta blandar ihop massor och hastigheter på ett sätt som varken ger rätt enhet eller följer av rörelsemängdslagen.',
      'Ett minustecken mellan termerna hanteras i stället genom tecknet på hastigheterna (negativ hastighet för motsatt riktning) — det byter inte ut plustecknet i själva formeln.',
      'Det är rätt uttryck: summan av rörelsemängderna före stöten är lika med den sammanslagna massans rörelsemängd efter stöten.',
    ],
  },
  {
    question: 'En vagn med massan 2,0 kg och hastigheten 4,0 m/s kolliderar med en stillastående vagn med massan 2,0 kg. Vagnarna hakar i varandra. Vilken gemensam hastighet får de efter kollisionen?',
    choices: [
      '4,0 m/s',
      '2,0 m/s',
      '1,0 m/s',
      '8,0 m/s',
    ],
    correct: 1,
    why: [
      'Det är bara den ena vagnens hastighet FÖRE kollisionen. Eftersom den nu måste dra med sig dubbelt så stor massa blir sluthastigheten lägre.',
      '$v = \\dfrac{m_\\mathrm{A} v_\\mathrm{A} + m_\\mathrm{B} v_\\mathrm{B}}{m_\\mathrm{A} + m_\\mathrm{B}} = \\dfrac{2{,}0 \\cdot 4{,}0 + 2{,}0 \\cdot 0}{2{,}0 + 2{,}0} = 2{,}0$ m/s.',
      'Att bara halvera hastigheten utan att räkna med massorna korrekt ger detta för låga värde.',
      'Att fördubbla hastigheten strider mot rörelsemängdens bevarande. Massan ökar när vagnarna hakar i varandra, så hastigheten måste MINSKA, inte öka.',
    ],
  },
  {
    question: 'I actionfilmer skjuter hjälten ofta iväg en fiende flera meter bakåt utan att själv påverkas. Varför är detta orimligt enligt rörelsemängdens bevarande?',
    choices: [
      'Eftersom kulor alltid är för lätta för att ge någon rörelsemängd alls',
      'Eftersom skyttens rörelseenergi alltid är noll',
      'Eftersom rörelsemängden bevaras borde skytten få en lika stor rörelsemängd riktad bakåt',
      'Eftersom friktion mot marken omedelbart tar bort all rörelsemängd hos den träffade personen',
    ],
    correct: 2,
    why: [
      'Kulan har visserligen låg massa, men mycket hög hastighet — dess rörelsemängd är långt ifrån försumbar, och det är den som ger den träffade personen en knuff.',
      'Frågan handlar om rörelsemängd, inte rörelseenergi, och skyttens rörelseenergi är inte per definition noll.',
      'Impulsen (och därmed rörelsemängdsändringen) som verkar på kulan är lika stor men motriktad den som verkar på skytten via rekylen — så skytten borde också knuffas bakåt, om än mindre märkbart eftersom skytten oftast väger mer.',
      'Friktion kan bromsa in en person efter en stund, men det förklarar inte varför skytten själv inte alls verkar påverkas i SAMMA ögonblick som skottet avfyras.',
    ],
  },
],

'fy1-4.9': [
  {
    question: 'Vilken energiform blir det arbete som friktionskraften uträttar?',
    choices: [
      'Rörelseenergi',
      'Lägesenergi',
      'Friktionsvärme',
      'Elektrisk energi',
    ],
    correct: 2,
    why: [
      'Rörelseenergi beror på hastighet, inte på friktionsarbetet — friktion tenderar tvärtom att BROMSA rörelse, inte skapa rörelseenergi.',
      'Lägesenergi hör ihop med en höjdändring i ett kraftfält, inte med friktionsarbetet i sig.',
      'När ett arbete uträttas med friktion blir just det arbetet till friktionsvärme.',
      'Elektrisk energi hör inte alls samman med mekanisk friktion mellan ytor.',
    ],
  },
  {
    question: 'Vilket samband beskriver friktionsvärmet $E_\\mathrm{v}$?',
    choices: [
      '$E_\\mathrm{v} = \\dfrac{F_\\mathrm{f}}{s}$',
      '$E_\\mathrm{v} = F_\\mathrm{f} \\cdot s$',
      '$E_\\mathrm{v} = F_\\mathrm{f} + s$',
      '$E_\\mathrm{v} = \\mu \\cdot s$',
    ],
    correct: 1,
    why: [
      'Att dela friktionskraften med sträckan ger varken rätt enhet (J) eller rätt definition.',
      'Friktionsvärmet ges av friktionskraften multiplicerad med sträckan, $E_\\mathrm{v} = F_\\mathrm{f} \\cdot s$.',
      'Kraft och sträcka har olika enheter (N respektive m) och kan inte adderas rakt av.',
      'Friktionstalet $\\mu$ saknar enhet och beskriver förhållandet mellan friktionskraft och normalkraft — det ersätter inte friktionskraften i formeln.',
    ],
  },
  {
    question: 'Om en höjdändring sker UTAN friktion, vad gäller för arbetet $W$?',
    choices: [
      '$W = \\Delta E_\\mathrm{p} + E_\\mathrm{v}$',
      '$W = E_\\mathrm{v}$',
      '$W = 0$',
      '$W = \\Delta E_\\mathrm{p}$',
    ],
    correct: 3,
    why: [
      'Den termen med friktionsvärme $E_\\mathrm{v}$ gäller bara när friktion FINNS med i höjdändringen.',
      'Utan friktion uppstår ingen friktionsvärme alls — arbetet blir i stället lägesenergi.',
      'Ett arbete uträttas mycket riktigt så länge en höjdändring sker — det är fel att arbetet skulle vara noll.',
      'Utan friktion går allt arbete åt till att ändra lägesenergin, $W = \\Delta E_\\mathrm{p}$.',
    ],
  },
  {
    question: 'Om en höjdändring sker MED friktion, vad gäller för arbetet $W$?',
    choices: [
      '$W = \\Delta E_\\mathrm{p} + E_\\mathrm{v}$',
      '$W = \\Delta E_\\mathrm{p} - E_\\mathrm{v}$',
      '$W = E_\\mathrm{v} - \\Delta E_\\mathrm{p}$',
      '$W = \\Delta E_\\mathrm{p}$',
    ],
    correct: 0,
    why: [
      'Med friktion blir det uträttade arbetet både lägesenergiändringen OCH friktionsvärmet, $W = \\Delta E_\\mathrm{p} + E_\\mathrm{v}$.',
      'Ett minustecken skulle betyda att friktionsvärmet gjorde att MINDRE arbete krävdes — men friktion gör alltid att MER arbete krävs, inte mindre.',
      'Det skulle innebära att lägesenergin drogs bort från friktionsvärmet, vilket inte stämmer — båda energiformerna läggs i stället ihop i det totala arbetet.',
      'Det uttrycket gäller bara UTAN friktion — med friktion tillkommer även friktionsvärmet $E_\\mathrm{v}$.',
    ],
  },
  {
    question: 'En låda dras 4,0 m längs ett plant golv där friktionskraften är 10 N. Hur stort blir friktionsvärmet?',
    choices: [
      '2,5 J',
      '40 J',
      '14 J',
      '0,40 J',
    ],
    correct: 1,
    why: [
      'Det motsvarar att dela friktionskraften med sträckan (10/4,0) i stället för att multiplicera dem.',
      '$E_\\mathrm{v} = F_\\mathrm{f} \\cdot s = 10 \\cdot 4{,}0 = 40$ J.',
      'Det motsvarar att addera friktionskraften och sträckan (10 + 4,0) i stället för att multiplicera dem.',
      'Att flytta decimalkommat fel ger ett resultat som är 100 gånger för litet.',
    ],
  },
],

// ── 07-fy1-ch5.js ─────────────────────────────────────────────

'fy1-5.1': [
  {
    question: 'Vad är skillnaden mellan tryckkraft och tryck?',
    choices: [
      'De är samma sak — bara olika namn på samma fysikaliska storhet.',
      'Tryck är alltid ett större tal än tryckkraften, oavsett situation.',
      'Tryckkraft (F) är kraften mellan två kroppar i kontakt, mätt i N, medan tryck (p) är tryckkraften delat med den area den verkar på.',
      'Tryckkraft beror på vilken area kraften fördelas över, men tryck gör det inte.',
    ],
    correct: 2,
    why: [
      'Tryckkraft och tryck har olika enheter (N respektive Pa) och olika innebörd — tryck tar dessutom hänsyn till hur stor area kraften fördelas över, vilket tryckkraften inte gör.',
      'Storleksförhållandet beror helt på arean: en liten area ger ett stort tryck även av en liten tryckkraft, och tvärtom. Det finns inget generellt "alltid större".',
      'Just detta är den centrala skillnaden i avsnittet: $p = \\frac{F}{A}$ — tryckkraften fördelas på en area för att ge trycket.',
      'Det är precis tvärtom: det är trycket som beror på arean ($p = F/A$), medan tryckkraften i sig är oberoende av hur den fördelas.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för tryck?',
    choices: ['pascal (Pa)', 'newton (N)', 'newton per kubikmeter (N/m³)', 'kilogram per kvadratmeter (kg/m²)'],
    correct: 0,
    why: [
      'Pascal (Pa) är SI-enheten för tryck, vilket också motsvarar N/m² eftersom $p = F/A$.',
      'Newton är enheten för kraft (tryckkraft), inte för tryck — tryck är kraft delat med area.',
      'N/m³ blandar ihop area med volym. Tryck definieras som kraft per areaenhet (m²), inte per volymenhet (m³).',
      'Kg/m² beskriver massa per area, inte kraft per area. Tryck bygger på tryckkraften (N), inte på massan direkt.',
    ],
  },
  {
    question: 'Varför sjunker du inte lika djupt ner i lössnö när du har skidor på dig, jämfört med vanliga skor, trots att din tyngd är oförändrad?',
    choices: [
      'Skidorna minskar din tyngdkraft så att du väger mindre.',
      'Skidorna ökar friktionen mellan dig och snön, vilket hindrar dig från att sjunka.',
      'Skidorna gör att din kropp faktiskt väger mindre än utan skidor.',
      'Skidorna fördelar din tryckkraft på en mycket större area, vilket gör att trycket mot snön blir lägre.',
    ],
    correct: 3,
    why: [
      'Din tyngdkraft ($m \\cdot g$) ändras inte av vilka skor du har på dig — massan och tyngdfaktorn är desamma.',
      'Det är inte friktion som avgör hur djupt du sjunker i snö, utan hur tryckkraften fördelas över en area.',
      'Din massa och därmed din tyngd är oförändrad — skidorna påverkar bara hur tryckkraften fördelas, inte hur mycket du väger.',
      'Samma tryckkraft (din tyngd) fördelas på en mycket större area med skidor, vilket enligt $p = F/A$ ger ett lägre tryck mot snön.',
    ],
  },
  {
    question: 'En låda med tryckkraften 200 N står på ett bord med en kontaktyta på 0,50 m². Vilket tryck ger lådan mot bordet?',
    choices: ['4,0 Pa', '400 Pa', '40 Pa', '4 000 Pa'],
    correct: 1,
    why: [
      'Det här stämmer inte med $p = F/A$ — kontrollera uträkningen: 200 delat med 0,50 blir betydligt mer än 4,0.',
      'Med $p = F/A = 200/0{,}50$ blir trycket 400 Pa.',
      'Detta värde är för lågt med en faktor 10 — dubbelkolla att du dividerar med 0,50 och inte med 5,0.',
      'Detta värde är för högt med en faktor 10 — en vanlig felkälla är att blanda ihop 0,50 m² med 0,050 m² i uträkningen.',
    ],
  },
  {
    question: 'I exemplet med damen på stilettklack och stridsvagnen (som väger 1 000 gånger mer) blir trycket från klacken ändå ungefär 60 gånger större än trycket från stridsvagnens larvfötter. Varför?',
    choices: [
      'Damens tryckkraft är faktiskt större än stridsvagnens tryckkraft.',
      'Tryck beror bara på massan hos föremålet, inte på vilken area kraften fördelas över.',
      'Klackens area är enormt mycket mindre än stridsvagnens larvfötter, så trycket (kraft per area) blir störst för damen trots att hennes tryckkraft är mycket mindre.',
      'Stridsvagnens larvfötter ger inget tryck alls eftersom fordonet är så tungt.',
    ],
    correct: 2,
    why: [
      'Tvärtom: damens tryckkraft (ca 600 N) är mycket mindre än stridsvagnens (ca 600 000 N) — det är inte kraften som avgör här.',
      'Om tryck bara berodde på massan skulle den tyngre stridsvagnen alltid ge störst tryck. Men tryck är kraft per area, så en liten area kan ge stort tryck trots liten kraft.',
      'Klackens area (1,0 cm²) är enormt mycket mindre än larvfötternas (6,0 m²), vilket enligt $p = F/A$ gör att kvoten — trycket — blir störst för damen.',
      'Stridsvagnen ger visst ett tryck (ca 0,10 MPa) mot marken — det är bara mindre än damens tryck, inte obefintligt.',
    ],
  },
],

'fy1-5.2': [
  {
    question: 'Vilken formel gäller för vätsketrycket på djupet h i en vätska med densiteten ρ?',
    choices: ['$p = \\frac{\\rho \\cdot g}{h}$', '$p = \\rho + g + h$', '$p = \\frac{F}{\\rho}$', '$p = \\rho \\cdot g \\cdot h$'],
    correct: 3,
    why: [
      'Här delas med djupet h istället för att multiplicera med det — men vätsketrycket ökar med djupet, det minskar inte.',
      'Addition ger fel dimension: ρ, g och h har helt olika enheter (kg/m³, N/kg och m) och kan inte adderas rakt av.',
      'Det här blandar ihop definitionen $p = F/A$ med vätsketryckformeln — varken g eller h finns med, och F/ρ har fel enhet för tryck.',
      'Vätsketrycket ges av $p = \\rho \\cdot g \\cdot h$ — densiteten, tyngdfaktorn och djupet multipliceras.',
    ],
  },
  {
    question: 'Vad avgör vätsketrycket på ett visst djup för en given vätska (på jorden)?',
    choices: ['Kärlets form.', 'Endast djupet under vätskeytan.', 'Den totala mängden vätska i kärlet.', 'Vilket material kärlet är gjort av.'],
    correct: 1,
    why: [
      'Demonstrationen med de fyra olika formade bassängerna visade att formen inte spelar någon roll — trycket på samma djup är detsamma i alla.',
      'Formeln $p = \\rho \\cdot g \\cdot h$ innehåller bara densitet, tyngdfaktor och djup — varken form eller mängd vätska finns med.',
      'Mängden vätska i hela kärlet spelar ingen roll, bara djupet ner till den punkt där trycket mäts.',
      'Kärlets material påverkar inte vätskans eget tryck vid ett visst djup — det bestäms enbart av vätskan ovanför.',
    ],
  },
  {
    question: 'I vilken riktning verkar vätsketrycket mot en yta?',
    choices: ['Vinkelrätt mot ytan.', 'Alltid rakt nedåt, oavsett ytans orientering.', 'Alltid rakt uppåt, oavsett ytans orientering.', 'Parallellt med ytan.'],
    correct: 0,
    why: [
      'Vätsketrycket verkar alltid vinkelrätt mot den yta det trycker på, oavsett hur ytan är orienterad.',
      'Rakt nedåt stämmer bara för en yta som är vågrät och vetter uppåt — mot en lodrät vägg trycker vätskan istället vågrätt.',
      'Rakt uppåt beskriver bara specialfallet med locket i demonstrationen — mot andra ytor är riktningen en annan, alltid vinkelrät mot just den ytan.',
      'Ett tryck som verkade parallellt med ytan skulle vara en skjuvkraft, inte ett tryck — vätsketryck trycker rakt in i ytan.',
    ],
  },
  {
    question: 'Vilket vätsketryck råder på 5,0 meters djup i en sjö, om vi avrundar till $\\rho \\approx 1\\,000\\ \\mathrm{kg/m^3}$ och $g \\approx 10\\ \\mathrm{N/kg}$?',
    choices: ['500 Pa', '5 000 Pa', '50 000 Pa', '500 000 Pa'],
    correct: 2,
    why: [
      'Det här är för lågt med en faktor 100 — kontrollera att både ρ, g och h verkligen är multiplicerade med varandra.',
      'Det här stämmer bara om man glömmer att multiplicera med tyngdfaktorn g — $\\rho \\cdot h = 1\\,000 \\cdot 5{,}0 = 5\\,000$, men g = 10 N/kg saknas.',
      'Med $p = \\rho \\cdot g \\cdot h = 1\\,000 \\cdot 10 \\cdot 5{,}0$ blir trycket 50 000 Pa.',
      'Det här är för högt med en faktor 10 — en vanlig felkälla är att räkna djupet som 50 m istället för 5,0 m.',
    ],
  },
  {
    question: 'Herbert Nitsch dök till 253,2 meters djup och utsattes då för ett vätsketryck på ungefär 2,6 MPa. Ungefär hur många gånger större är detta jämfört med normalt lufttryck (ca 101 kPa)?',
    choices: ['Ca 2,5 gånger större.', 'Ca 25 gånger större.', 'Ca 10 gånger större.', 'Ca 100 gånger större.'],
    correct: 1,
    why: [
      '2,6 MPa är 2 600 kPa, vilket delat med 101 kPa ger ett betydligt större tal än 2,5.',
      '2 600 kPa delat med 101 kPa är ungefär 25 — precis det som anges i genomgången.',
      'Detta underskattar trycket rejält — 10 gånger 101 kPa vore bara ca 1 MPa, inte 2,6 MPa.',
      'Detta överskattar trycket — 100 gånger 101 kPa vore ca 10 MPa, betydligt mer än de uppmätta 2,6 MPa.',
    ],
  },
],

'fy1-5.3': [
  {
    question: 'Vad kallas det sammanlagda trycket av lufttryck och vätsketryck på ett visst djup i en vätska?',
    choices: ['Skillnadstryck.', 'Övertryck.', 'Atmosfärstryck.', 'Totalt tryck.'],
    correct: 3,
    why: [
      'Det här är inte ett begrepp som används i genomgången — här handlar det om en summa, inte en skillnad.',
      'Övertryck syftar normalt på trycket utöver det omgivande lufttrycket, inte på summan av lufttryck och vätsketryck.',
      'Atmosfärstryck är bara lufttryckets del ($p_0$) — vätsketryckets bidrag ($\\rho \\cdot g \\cdot h$) räknas inte med i detta begrepp.',
      'Det totala trycket är summan $p = p_0 + \\rho \\cdot g \\cdot h$ av lufttryck och vätsketryck.',
    ],
  },
  {
    question: 'Vilken formel beskriver det totala trycket på djupet h under en vätskeyta med lufttrycket $p_0$ ovanför?',
    choices: ['$p = p_0 \\cdot \\rho \\cdot g \\cdot h$', '$p = p_0 - \\rho \\cdot g \\cdot h$', '$p = p_0 + \\rho \\cdot g \\cdot h$', '$p = \\rho \\cdot g \\cdot h$'],
    correct: 2,
    why: [
      'Lufttrycket och vätsketrycket adderas, de multipliceras inte ihop.',
      'En subtraktion skulle innebära att trycket minskar ju djupare man kommer, vilket är fysikaliskt fel — trycket ökar med djupet.',
      'Det totala trycket är lufttrycket $p_0$ plus vätsketrycket $\\rho \\cdot g \\cdot h$.',
      'Detta ger bara vätsketrycket — lufttrycket $p_0$ ovanför vätskeytan saknas i uttrycket för det totala trycket.',
    ],
  },
  {
    question: 'Ungefär hur många pascal motsvarar 1 atm (en atmosfär)?',
    choices: ['101 300 Pa', '1 000 Pa', '10 000 Pa', '1 013 000 Pa'],
    correct: 0,
    why: [
      'Normalt lufttryck vid havsnivå, 1 atm, motsvarar 101 300 Pa enligt tabellen i genomgången.',
      'Det här är alldeles för lågt — en faktor 100 mindre än det verkliga värdet.',
      'Det här är fortfarande alldeles för lågt — en faktor 10 mindre än det verkliga värdet.',
      'Det här är en tiopotens för högt — en vanlig felkälla är att blanda ihop hPa (hektopascal, som väderrapporter ofta använder) med Pa.',
    ],
  },
  {
    question: 'Varför krävdes det en väldigt stor kraft för att dra isär de magdeburgska halvkloten efter att luften pumpats ut mellan dem?',
    choices: [
      'Halvkloten var magnetiska och attraherade varandra.',
      'Lufttrycket utifrån pressade kloten mot varandra när trycket inuti dem var borttaget.',
      'Vakuumet mellan kloten skapade en aktiv sugande kraft som drog ihop dem.',
      'Friktionen mellan kloten ökade kraftigt när luften pumpades ut.',
    ],
    correct: 1,
    why: [
      'Det finns ingen magnetisk kraft inblandad i experimentet — hela effekten beror på lufttryck.',
      'Med vakuum inuti kloten fanns inget mottryck inifrån, så det yttre lufttrycket pressade kloten mot varandra med stor kraft.',
      'Ett vakuum utövar ingen egen aktiv kraft — det är den omgivande luftens tryck som gör jobbet genom att det inte längre finns ett mottryck att balansera mot.',
      'Det finns ingen glidande kontaktyta mellan kloten där friktion skulle uppstå — det är lufttrycket, inte friktion, som håller ihop dem.',
    ],
  },
  {
    question: 'Varför blir lufttrycket lägre ju högre upp i atmosfären man kommer?',
    choices: [
      'Luften blir varmare högre upp, vilket sänker trycket.',
      'Jordens dragningskraft försvinner helt högre upp i atmosfären.',
      'Trycket är i själva verket detsamma överallt i atmosfären.',
      'Det finns en kortare luftpelare ovanför, och luften där har dessutom lägre densitet.',
    ],
    correct: 3,
    why: [
      'Temperaturen är inte förklaringen som ges i genomgången — det handlar om mängden och densiteten hos luften ovanför.',
      'Jordens dragningskraft försvinner inte högre upp i atmosfären, den avtar bara mycket långsamt — det är inte förklaringen till det lägre lufttrycket.',
      'Hela avsnittet visar tvärtom att lufttrycket minskar med höjden, precis som vätsketrycket minskar med minskat djup.',
      'Ju högre upp, desto kortare och glesare (lägre densitet) blir luftpelaren ovanför, vilket ger ett lägre lufttryck — jämför med vätsketryck och djup.',
    ],
  },
  {
    question: 'Varför känner din trumhinna bara av vätsketrycket, och inte det fulla totala trycket, när du dyker på ett visst djup?',
    choices: [
      'Lufttrycket finns även inuti örat och tar ut det yttre lufttrycket, så bara vätsketrycket ger en nettokraft på trumhinnan.',
      'Örat är helt okänsligt för förändringar i lufttryck.',
      'Lufttryck kan inte fortplanta sig genom vatten ner till ett visst djup.',
      'Trumhinnan är gjord av ett material som blockerar lufttryck men släpper igenom vätsketryck.',
    ],
    correct: 0,
    why: [
      'Lufttrycket verkar både utifrån och inifrån örat (via örontrumpeten), så det tar ut sig självt — det som återstår som en nettokraft på trumhinnan är vätsketrycket.',
      'Örat är tvärtom mycket känsligt för tryckskillnader — det är därför öronen kan göra ont vid dykning när trycket inte hinner utjämnas.',
      'Lufttrycket fortplantar sig visst genom vattenytan ner i vattnet — det ingår i det totala trycket $p = p_0 + \\rho \\cdot g \\cdot h$.',
      'Trumhinnan har ingen sådan selektiv egenskap — den verkliga förklaringen är att lufttrycket balanseras ut på båda sidor om trumhinnan.',
    ],
  },
],

'fy1-5.4': [
  {
    question: 'Vad säger Arkimedes princip?',
    choices: [
      'En kropp som är helt eller delvis nedsänkt i en vätska påverkas av en lyftkraft som är lika stor som tyngden hos den undanträngda vätskan.',
      'En kropp nedsänkt i en vätska förlorar massa motsvarande den undanträngda vätskans massa.',
      'Alla kroppar flyter så länge de är tillräckligt lätta i sig själva.',
      'Lyftkraften på en kropp är alltid lika stor som kroppens egen tyngdkraft.',
    ],
    correct: 0,
    why: [
      'Detta är precis ordalydelsen i Arkimedes princip: lyftkraften motsvarar tyngden av den undanträngda vätskan.',
      'Det sker ingen massförlust — kroppen känns bara lättare på grund av en mindre resulterande kraft nedåt, massan är oförändrad.',
      'Om en kropp flyter eller sjunker avgörs av densiteten jämfört med vätskans, inte av att kroppen i sig är ”lätt”.',
      'Detta gäller bara när kroppen flyter i jämvikt. Sjunker kroppen istället är lyftkraften mindre än tyngdkraften.',
    ],
  },
  {
    question: 'Vilken formel ger lyftkraften enligt Arkimedes princip?',
    choices: ['$F_\\mathrm{L} = m \\cdot g$', '$F_\\mathrm{L} = \\frac{\\rho}{g \\cdot V}$', '$F_\\mathrm{L} = \\rho \\cdot V$', '$F_\\mathrm{L} = \\rho \\cdot g \\cdot V$'],
    correct: 3,
    why: [
      'Detta är den allmänna formeln för tyngdkraft. Den fångar inte det som är specifikt för Arkimedes princip: att lyftkraften beror på den undanträngda vätskans densitet och volym.',
      'Division ger fel struktur — varken enheten eller sambandet stämmer med hur lyftkraften beror på ρ, g och V.',
      'Tyngdfaktorn g saknas, så uttrycket ger en massa (kg), inte en kraft (N).',
      'Lyftkraften ges av $F_\\mathrm{L} = \\rho \\cdot g \\cdot V$, där ρ och V avser den undanträngda vätskan.',
    ],
  },
  {
    question: 'När du beräknar lyftkraften på ett föremål som är nedsänkt i vatten, vilken densitet ska du använda i formeln $F_\\mathrm{L} = \\rho \\cdot g \\cdot V$?',
    choices: ['Föremålets egen densitet.', 'Det spelar ingen roll vilken densitet som används.', 'Vattnets densitet.', 'Medelvärdet av föremålets och vattnets densitet.'],
    correct: 2,
    why: [
      'Detta är ett vanligt misstag — som i exemplet med järnkistan ska man INTE använda föremålets (järnets) densitet.',
      'Densiteten avgör helt storleken på lyftkraften, så valet av densitet har stor betydelse för svaret.',
      'Lyftkraften bestäms av den undanträngda vätskans densitet, det vill säga vattnets densitet — inte föremålets egen.',
      'Det görs ingen sådan medelvärdesberäkning i Arkimedes princip.',
    ],
  },
  {
    question: 'Vilket samband gäller för ett föremål som flyter i jämvikt på en vätskeyta?',
    choices: ['$F_\\mathrm{L} > F_\\mathrm{G}$', '$F_\\mathrm{L} = F_\\mathrm{G}$', '$F_\\mathrm{L} < F_\\mathrm{G}$', '$F_\\mathrm{L} = 0$'],
    correct: 1,
    why: [
      'Om lyftkraften vore större än tyngdkraften skulle föremålet accelerera uppåt och lämna vätskan — det är inte jämvikt.',
      'I jämvikt vid flytning är lyftkraften exakt lika stor som tyngdkraften: $F_\\mathrm{L} = F_\\mathrm{G}$.',
      'Detta samband gäller istället för ett föremål som sjunker, inte ett som flyter i jämvikt.',
      'Lyftkraften är inte noll för ett flytande föremål — den är precis lika stor som tyngdkraften, vilket ger jämvikt.',
    ],
  },
  {
    question: 'En kloss med volymen 0,0020 m³ är helt nedsänkt i vatten. Hur stor lyftkraft verkar på klossen om vi avrundar till $\\rho \\approx 1\\,000\\ \\mathrm{kg/m^3}$ och $g \\approx 10\\ \\mathrm{N/kg}$?',
    choices: ['20 N', '0,20 N', '2,0 N', '200 N'],
    correct: 0,
    why: [
      'Med $F_\\mathrm{L} = \\rho \\cdot g \\cdot V = 1\\,000 \\cdot 10 \\cdot 0{,}0020$ blir lyftkraften 20 N.',
      'Det här är för lågt med en faktor 100 — kontrollera att alla tre faktorerna (ρ, g och V) är med i multiplikationen.',
      'Det här är för lågt med en faktor 10 — en vanlig felkälla är att glömma tyngdfaktorn g i uträkningen.',
      'Det här är för högt med en faktor 10 — en vanlig felkälla är att läsa volymen som 0,020 m³ istället för 0,0020 m³.',
    ],
  },
  {
    question: 'Varför är det, enligt genomgången, omöjligt att drunkna (sjunka helt ner) i kvicksand?',
    choices: [
      'Kvicksand har lägre densitet än människokroppen, så kroppen flyter alltid ovanpå.',
      'Kvicksand utövar ingen lyftkraft alls på kroppar som sänks ner i den.',
      'Människokroppen väger för lite för att sjunka i något överhuvudtaget.',
      'Kvicksand har högre densitet (ca 2 000 kg/m³) än människokroppen (ca 1 000 kg/m³), vilket gör lyftkraften tillräckligt stor för att hindra kroppen från att sjunka helt.',
    ],
    correct: 3,
    why: [
      'Det är tvärtom: kvicksand har högre densitet än kroppen, inte lägre.',
      'Kvicksand beter sig som en tät vätska och utövar precis som andra vätskor en lyftkraft enligt Arkimedes princip — i själva verket en större lyftkraft än vatten eftersom densiteten är högre.',
      'Kroppens vikt är inte förklaringen — det handlar om förhållandet mellan kroppens och kvicksandens densitet.',
      'Eftersom kvicksandens densitet är dubbelt så hög som kroppens, blir lyftkraften enligt Arkimedes princip tillräckligt stor för att kroppen ska flyta högt upp i stället för att sjunka helt.',
    ],
  },
],

'fy1-5.5': [
  {
    question: 'Gäller Arkimedes princip bara för vätskor, eller även för gaser?',
    choices: ['Endast för vätskor.', 'Endast för gaser.', 'Varken för vätskor eller gaser — bara för fasta ämnen.', 'För både vätskor och gaser.'],
    correct: 3,
    why: [
      'Genomgången visar tvärtom att principen även gäller för gaser, till exempel luft.',
      'Arkimedes princip gäller lika mycket för vätskor som för gaser — den är inte begränsad till gaser.',
      'Principen handlar just om lyftkraft från ett omgivande medium (vätska eller gas) på en nedsänkt kropp — den gäller inte fasta ämnen som omgivande medium.',
      'Arkimedes princip (och formeln för lyftkraft) gäller för både vätskor och gaser, till exempel luften vi befinner oss i.',
    ],
  },
  {
    question: 'Vilket ungefärligt värde har luftens densitet i "lufthavet" enligt genomgången?',
    choices: ['1,293 kg/m³', '0,013 kg/m³', '0,13 kg/m³', '12,93 kg/m³'],
    correct: 0,
    why: [
      'Genomgången anger luftens densitet till $\\rho \\approx 1{,}293\\ \\mathrm{kg/m^3}$.',
      'Det här är två tiopotenser för lågt — decimalen har flyttats för långt åt vänster.',
      'Det här är en tiopotens för lågt jämfört med det angivna värdet.',
      'Det här är en tiopotens för högt jämfört med det angivna värdet.',
    ],
  },
  {
    question: 'Varför stiger en varmluftsballong uppåt?',
    choices: [
      'Varmluft är tyngre än kalluft och trycks därför uppåt av den tunga kalluften.',
      'Ballongens tygmaterial väger mindre än luft.',
      'Varmluft har lägre densitet än kalluft, så tyngden av den undanträngda kalluften blir större än tyngden av ballong, korg och varmluft tillsammans.',
      'Värmen i sig ger en uppåtriktad kraft, helt oberoende av lyftkraften.',
    ],
    correct: 2,
    why: [
      'Det är tvärtom: varmluft har lägre densitet (är "lättare"), inte tyngre, än kalluft.',
      'Det är inte tygmaterialet i sig som avgör — det är densitetsskillnaden mellan den varma luften inuti och den kalla luften utanför som ger lyftkraften.',
      'Eftersom varmluft har lägre densitet väger den mindre än samma volym kalluft, vilket enligt Arkimedes princip ger en lyftkraft som är större än ballongsystemets sammanlagda tyngd.',
      'Värme i sig utövar ingen kraft — hela mekanismen bygger på Arkimedes princip och densitetsskillnaden mellan varm och kall luft.',
    ],
  },
  {
    question: 'I exemplet med Algot som håller stilla i en heliumballong råder kraftjämvikt mellan spännkraften $F_\\mathrm{S}$ i snöret, tyngdkraften $F_\\mathrm{G}$ på ballongen och lyftkraften $F_\\mathrm{L}$. Vilket samband beskriver detta korrekt?',
    choices: ['$F_\\mathrm{S} = F_\\mathrm{L} + F_\\mathrm{G}$', '$F_\\mathrm{S} + F_\\mathrm{G} = F_\\mathrm{L}$', '$F_\\mathrm{L} = F_\\mathrm{S} - F_\\mathrm{G}$', '$F_\\mathrm{G} = F_\\mathrm{L} + F_\\mathrm{S}$'],
    correct: 1,
    why: [
      'Detta skulle ge en alldeles för stor spännkraft — i jämvikt är $F_\\mathrm{S}$ bara skillnaden mellan lyftkraften och tyngdkraften.',
      'De två nedåtriktade krafterna, spännkraft och tyngdkraft, balanserar tillsammans den uppåtriktade lyftkraften: $F_\\mathrm{S} + F_\\mathrm{G} = F_\\mathrm{L}$.',
      'Detta är algebraiskt inte samma samband som $F_\\mathrm{S} + F_\\mathrm{G} = F_\\mathrm{L}$ — här har tecknet på $F_\\mathrm{G}$ blivit fel.',
      'Detta skulle göra tyngdkraften till den största kraften, men det är lyftkraften som är störst eftersom den håller uppe både ballongens tyngd och snörets spänning.',
    ],
  },
  {
    question: 'En ballong har volymen 0,010 m³ i luft med densiteten 1,3 kg/m³. Bortse från heliumets egen tyngd och avrunda till $g \\approx 10\\ \\mathrm{N/kg}$. Hur stor lyftkraft verkar på ballongen?',
    choices: ['0,13 N', '0,0013 N', '0,013 N', '1,3 N'],
    correct: 0,
    why: [
      'Med $F_\\mathrm{L} = \\rho \\cdot g \\cdot V = 1{,}3 \\cdot 10 \\cdot 0{,}010$ blir lyftkraften 0,13 N.',
      'Det här är för lågt med en faktor 100 — decimalen har flyttats för långt åt vänster.',
      'Det här är för lågt med en faktor 10 jämfört med rätt svar.',
      'Det här är för högt med en faktor 10 jämfört med rätt svar.',
    ],
  },
],

'fy1-5.6': [
  {
    question: 'Vilket samband är ideala gaslagen för ett bestämt antal gasmolekyler?',
    choices: [
      '$\\frac{p_1 \\cdot V_1}{T_1} = \\frac{p_2 \\cdot V_2}{T_2}$',
      '$p_1 \\cdot V_1 \\cdot T_1 = p_2 \\cdot V_2 \\cdot T_2$',
      '$\\frac{p_1}{V_1 \\cdot T_1} = \\frac{p_2}{V_2 \\cdot T_2}$',
      '$p_1 + V_1 + T_1 = p_2 + V_2 + T_2$',
    ],
    correct: 0,
    why: [
      'Ideala gaslagen säger att $\\frac{p \\cdot V}{T}$ är oförändrad mellan två tillstånd.',
      'Att multiplicera in temperaturen rakt av ger fel samband — det är kvoten $\\frac{p \\cdot V}{T}$ som är konstant, inte produkten $p \\cdot V \\cdot T$.',
      'Här står trycket ensamt i täljaren istället för att vara en del av produkten $p \\cdot V$ i täljaren tillsammans med volymen.',
      'Addition ger fel — p, V och T har olika enheter (tryck, volym, temperatur) och kan inte adderas rakt av.',
    ],
  },
  {
    question: 'Varför måste temperaturen anges i kelvin (K) och inte i celsius (°C) i ideala gaslagen?',
    choices: [
      'Celsius är en gammal enhet som inte längre används inom fysiken.',
      'Kelvin är SI-enheten för temperatur och celsius är det inte.',
      'Kelvin ger alltid ett mindre tal än celsius, vilket gör uträkningarna enklare.',
      '20 °C är inte dubbelt så varmt som 10 °C, men 20 K är dubbelt så hög temperatur som 10 K — ideala gaslagen bygger på proportionalitet mot den absoluta temperaturen.',
    ],
    correct: 3,
    why: [
      'Celsius används fortfarande flitigt i vardagen — problemet är inte att skalan är omodern, utan att den inte är proportionell mot den fysikaliska temperaturen.',
      'Det stämmer att kelvin är SI-enheten, men det förklarar inte varför just denna lag kräver en absolut skala — anledningen är proportionaliteten mot den absoluta nollpunkten.',
      'Tvärtom ger kelvin alltid ett större tal än celsius (man adderar 273), inte ett mindre.',
      'Ideala gaslagen bygger på att trycket och volymen är proportionella mot den absoluta temperaturen, vilket bara stämmer med kelvinskalan eftersom den utgår från den absoluta nollpunkten.',
    ],
  },
  {
    question: 'Vad blir 0 °C omvandlat till kelvin?',
    choices: ['0 K', '273 K', '32 K', '−273 K'],
    correct: 1,
    why: [
      'Det här blandar ihop celsius nollpunkt med kelvins nollpunkt — kelvins nollpunkt (den absoluta nollpunkten) ligger istället vid −273 °C.',
      'Med $T_\\mathrm{K} = T_\\mathrm{C} + 273 = 0 + 273$ blir temperaturen 273 K, precis som i tabellen i genomgången.',
      '32 är fryspunkten för vatten i Fahrenheit-skalan, inte i kelvin.',
      'En negativ kelvintemperatur är fysikaliskt omöjlig — dessutom har tecknet på +273 blivit felvänt här.',
    ],
  },
  {
    question: 'Vad kännetecknar den absoluta nollpunkten (0 K)?',
    choices: ['Vattnets fryspunkt.', 'Rumstemperatur.', 'Den lägsta temperatur som är möjlig, där atomerna är helt stilla.', 'Den högsta temperatur som är möjlig.'],
    correct: 2,
    why: [
      'Vattnets fryspunkt är 0 °C, vilket motsvarar 273 K — inte 0 K.',
      'Rumstemperatur ligger runt 293 K, långt ifrån den absoluta nollpunkten.',
      'Den absoluta nollpunkten (0 K, motsvarande −273 °C) är den lägsta temperatur som är möjlig, där atomerna är helt stilla.',
      'Det är tvärtom — 0 K är den lägsta möjliga temperaturen, inte den högsta.',
    ],
  },
  {
    question: 'En gas i en sluten behållare med konstant volym har trycket 100 kPa vid temperaturen 200 K. Vad blir det nya trycket om temperaturen höjs till 400 K?',
    choices: ['50 kPa', '100 kPa', '400 kPa', '200 kPa'],
    correct: 3,
    why: [
      'Det här är kvoten $T_1/T_2$ istället för $T_2/T_1$ — trycket ska öka, inte minska, när temperaturen stiger.',
      'Vid konstant volym är trycket direkt proportionellt mot den absoluta temperaturen enligt ideala gaslagen — trycket kan alltså inte förbli oförändrat när temperaturen fördubblas.',
      'Det här vore rätt om temperaturen fyrdubblats, men den har bara fördubblats (från 200 K till 400 K).',
      'Vid konstant volym ger $\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$ att $p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 100 \\cdot \\frac{400}{200} = 200$ kPa — en fördubblad absolut temperatur ger dubbelt så högt tryck.',
    ],
  },
  {
    question: 'Vilket påstående om enheter i ideala gaslagen stämmer?',
    choices: [
      'Tryck och volym måste alltid anges i SI-enheterna Pa respektive m³.',
      'Tryck och volym kan anges i valfri (men konsekvent) enhet, medan temperaturen alltid måste anges i kelvin.',
      'Alla tre storheterna — tryck, volym och temperatur — kan anges i vilken enhet som helst.',
      'Det är bara temperaturen som får anges i valfri enhet.',
    ],
    correct: 1,
    why: [
      'Det räcker att tryck och volym anges i samma enhet på båda sidor av likheten — de behöver inte vara just Pa och m³.',
      'Eftersom det bara är kvoten som är konstant kan tryck och volym anges i valfri (men konsekvent) enhet, men temperaturen måste alltid vara i kelvin för att proportionaliteten ska stämma.',
      'Det här är för generöst — temperaturen är just undantaget som alltid måste vara i kelvin, till skillnad från tryck och volym.',
      'Det är precis tvärtom: det är temperaturen som har ett strikt krav (kelvin), medan tryck och volym är de flexibla storheterna.',
    ],
  },
],

'fy1-5.7': [
  {
    question: 'Vad säger Pascals princip om en tryckökning i en innesluten vätska?',
    choices: [
      'Tryckökningen märks bara nära den plats där den orsakades.',
      'Tryckökningen försvinner efter en kort sträcka i vätskan.',
      'Tryckökningen är alltid störst vid vätskans botten.',
      'Tryckökningen fortplantas lika i hela vätskan.',
    ],
    correct: 3,
    why: [
      'Just poängen med Pascals princip är att tryckökningen sprider sig genom hela vätskan, inte bara lokalt.',
      'Vätskor är i praktiken oböjliga (svåra att pressa ihop), så tryckökningen dämpas inte bort på vägen.',
      'Att trycket ökar med djupet beror på vätskans egen tyngd ($\\rho \\cdot g \\cdot h$) — det är en annan effekt än den tryckökning Pascals princip beskriver, som läggs till lika överallt.',
      'En yttre tryckökning på en innesluten vätska fortplantas lika stor i hela vätskan, vilket utnyttjas i hydrauliska domkrafter.',
    ],
  },
  {
    question: 'Vilket samband gäller för en hydraulisk domkraft enligt Pascals princip?',
    choices: ['$\\frac{F_1}{A_1} = \\frac{F_2}{A_2}$', '$F_1 \\cdot A_1 = F_2 \\cdot A_2$', '$F_1 + A_1 = F_2 + A_2$', '$\\frac{A_1}{F_1} = \\frac{F_2}{A_2}$'],
    correct: 0,
    why: [
      'Eftersom trycket är detsamma i båda kolvarna ($p_1 = p_2$) gäller $\\frac{F_1}{A_1} = \\frac{F_2}{A_2}$.',
      'Att multiplicera kraft och area rakt av motsvarar inte att trycken (kraft delat med area) är lika stora på båda sidor.',
      'Addition av kraft och area ger ingen fysikaliskt meningsfull storhet — det är kvoterna (trycken) som ska vara lika.',
      'Kvoterna är felvända på ena sidan jämfört med den andra — det ska vara kraft delat med area på båda sidor.',
    ],
  },
  {
    question: 'Varför kan en hydraulisk domkraft förstärka en liten kraft till en mycket större kraft?',
    choices: [
      'Vätskan i domkraften skapar energi ur tomma intet.',
      'Om den stora kolvens area är mycket större än den lilla kolvens, ger samma tryck en mycket större kraft på den stora kolven.',
      'Vätskan minskar sin egen densitet när den pressas ihop.',
      'Den stora kolven har mindre friktion än den lilla.',
    ],
    correct: 1,
    why: [
      'Ingen energi skapas ur intet — kraften blir större, men den stora kolven rör sig i gengäld en kortare sträcka, så energibalansen upprätthålls.',
      'Eftersom $p_1 = p_2$ ger samma tryck en kraft $F_2 = p \\cdot A_2$ som blir mycket större när $A_2$ är mycket större än $A_1$.',
      'Vätskan behandlas som praktiskt taget oböjlig (konstant densitet) i denna modell — det är inte densitetsförändringar som förklarar kraftförstärkningen.',
      'Friktion spelar ingen roll i själva principen — det är enbart förhållandet mellan areorna som avgör kraftförstärkningen.',
    ],
  },
  {
    question: 'I en hydraulisk domkraft trycker du med kraften 50 N på en kolv med arean 2,0 dm². Den andra kolven har arean 20 dm². Hur stor kraft kan den andra kolven lyfta med?',
    choices: ['5,0 N', '50 N', '500 N', '5 000 N'],
    correct: 2,
    why: [
      'Det här kommer av att areakvoten råkat vändas fel — det ska vara $A_2/A_1$, inte $A_1/A_2$, i uträkningen.',
      'Kraften blir inte oförändrad — hela poängen med olika stora kolvarea är att kraften förstärks.',
      'Med $F_2 = F_1 \\cdot \\frac{A_2}{A_1} = 50 \\cdot \\frac{20}{2{,}0}$ blir kraften 500 N.',
      'Det här är en tiopotens för högt — kontrollera att areakvoten $20/2{,}0 = 10$, inte 100, används i uträkningen.',
    ],
  },
  {
    question: 'I exemplet med den hydrauliska domkraften anges areorna i dm² istället för m². Varför blir svaret ändå korrekt räknat i newton?',
    choices: [
      'Det är egentligen fel — areorna måste alltid anges i SI-enheten m².',
      'Dm² ger alltid rätt svar, oavsett vilken enhet kraften anges i.',
      'Pascals princip fungerar bara om areorna anges i just dm².',
      'Eftersom bara förhållandet mellan areorna används i formeln, ger samma (konsekventa) enhet på båda areorna ett korrekt svar i newton, så länge kraften i sig anges i newton.',
    ],
    correct: 3,
    why: [
      'Precis som i genomgången påpekas: man behöver inte använda SI-enheter här, bara samma enhet på båda areorna.',
      'Kraften måste fortfarande anges i newton för att svaret ska bli rätt — det är bara areaenheten som är flexibel, inte kraftenheten.',
      'Vilken areaenhet som helst fungerar, så länge den används konsekvent för båda kolvarna — inte bara dm².',
      'Areorna förekommer bara som en kvot $A_2/A_1$ i formeln, så enheten på arean förkortas bort — det som krävs är att båda areorna har samma enhet och att kraften anges i newton.',
    ],
  },
],

// ── 08-fy1-ch6.js ─────────────────────────────────────────────

'fy1-6.1': [
  {
    question: 'Vad är den fysikaliska definitionen av temperatur?',
    choices: [
      'Mängden värmeenergi som finns lagrad i ett föremål',
      'Summan av ett ämnes inre energi och dess värmeinnehåll',
      'Den genomsnittliga rörelseenergin hos ett ämnes atomer eller molekyler',
      'Den potentiella energin i ämnets kemiska bindningar',
    ],
    correct: 2,
    why: [
      'Det är den inre energin (ibland löst kallat "värmeinnehåll") som beskriver lagrad energi — temperatur är istället ett mått på atomernas rörelse, inte på hur mycket energi som finns lagrad.',
      'Inre energi är summan av potentiell energi och rörelseenergi i ämnet, men temperatur är enbart kopplat till rörelseenergin — inte till hela den inre energin.',
      'Temperatur definieras som den genomsnittliga rörelseenergin hos ämnets atomer eller molekyler — ju fortare de rör sig, desto högre temperatur.',
      'Potentiell energi i kemiska bindningar påverkar den inre energin, men inte temperaturen — det är därför en isbit kan smälta utan att temperaturen ändras.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för temperatur?',
    choices: ['Kelvin (K)', 'Celsius (°C)', 'Joule (J)', 'Watt (W)'],
    correct: 0,
    why: [
      'Kelvin är SI-enheten för temperatur. Skalan utgår från den absoluta nollpunkten, vilket gör att dubbla temperaturen i kelvin verkligen ger dubbla rörelseenergin hos atomerna.',
      'Celsius är en vanlig temperaturskala i vardagen, men SI-enheten är kelvin — celsius har fel nollpunkt för fysikens definition av temperatur.',
      'Joule är enheten för energi (till exempel värme), inte för temperatur.',
      'Watt är enheten för effekt, energi per tidsenhet — inte temperatur.',
    ],
  },
  {
    question: 'En aluminiumplatta och en plastplatta har båda rumstemperatur, ca 20 °C. Ändå känns aluminiumplattan kallare mot handen. Varför?',
    choices: [
      'Aluminium har i själva verket lägre temperatur än plasten',
      'Aluminium har högre specifik värmekapacitet än plast',
      'Plast strålar mer värme än aluminium',
      'Aluminium leder värme bättre än plast och för därför bort värme från handen snabbare',
    ],
    correct: 3,
    why: [
      'En infraröd termometer visar att båda plattorna faktiskt har samma temperatur, ca 20 °C — skillnaden ligger i hur snabbt värme leds bort, inte i temperaturen.',
      'Värmeledningsförmåga och specifik värmekapacitet är olika egenskaper — det är just ledningsförmågan (inte värmekapaciteten) som förklarar känslan här.',
      'Det är inte strålning som är den avgörande faktorn i det här experimentet, utan ledning genom kontakt mellan hand och platta.',
      'Metaller som aluminium leder värme bättre än plast. Handen (ca 25 °C) förlorar därför energi snabbare till aluminiumplattan, vilket upplevs som kallare.',
    ],
  },
  {
    question: 'Vilket av värmetransportens tre sätt kan ske genom vakuum, till exempel mellan solen och jorden?',
    choices: ['Ledning', 'Strålning', 'Konvektion (strömning)', 'Alla tre transportsätt kräver ett medium'],
    correct: 1,
    why: [
      'Ledning sker genom kontakt mellan material och fungerar inte i vakuum.',
      'Strålning är det enda transportsättet som inte kräver något medium — det är därför solens värme når jorden genom det tomma rymden.',
      'Konvektion bygger på att gas eller vätska virvlar runt, vilket kräver ett medium — det finns inget sådant i vakuum.',
      'Det stämmer inte för alla tre — strålning är ett undantag och fungerar utan medium, vilket är precis hur solvärme når jorden.',
    ],
  },
  {
    question: 'Vilken temperatur i kelvin motsvarar 20 °C?',
    choices: ['20 K', '253 K', '293 K', '273 K'],
    correct: 2,
    why: [
      'Att bara byta enhet till K utan att addera 273 glömmer att kelvinskalan har en annan nollpunkt än celsiusskalan.',
      'Detta fås om man felaktigt subtraherar 273 istället för att addera — kelvinskalan ligger högre än celsius, inte lägre.',
      'Med $T_\\mathrm{K} = T_\\mathrm{C} + 273 = 20 + 273 = 293\\ \\mathrm{K}$ blir svaret 293 K.',
      'Detta är 0 °C omvandlat till kelvin ($T_\\mathrm{K} = 0 + 273 = 273\\ \\mathrm{K}$) — men frågan gäller 20 °C, inte 0 °C.',
    ],
  },
  {
    question: 'Vad gäller för den absoluta nollpunkten?',
    choices: [
      'Den ligger vid ungefär −273 °C, där all termisk rörelse hos atomerna upphör',
      'Den ligger vid 0 °C, där vatten fryser',
      'Den är den högsta temperatur som teoretiskt kan uppnås',
      'Den ligger vid −100 °C och är gränsen för flytande kväve',
    ],
    correct: 0,
    why: [
      'Den absoluta nollpunkten är ungefär −273 °C (0 K). Där är atomerna helt stilla och saknar rörelseenergi, vilket är den teoretiskt lägsta temperatur som går att uppnå.',
      '0 °C är vattnets fryspunkt, inte den absoluta nollpunkten — den ligger mycket längre ner på skalan.',
      'Det är tvärtom — den absoluta nollpunkten är den lägsta möjliga temperaturen. Det finns ingen motsvarande naturlig högsta temperatur.',
      '−100 °C är varken den absoluta nollpunkten eller någon fysikaliskt särskild gräns i det här sammanhanget.',
    ],
  },
],

'fy1-6.2': [
  {
    question: 'Vad beskriver storheten specifik värmekapacitet ($c$)?',
    choices: [
      'Hur mycket energi som krävs för att smälta 1 kg av ett ämne',
      'Hur snabbt värme leds genom ett ämne',
      'Den totala inre energin i 1 kg av ett ämne',
      'Hur mycket energi som krävs för att höja temperaturen 1 K på 1 kg av ett ämne',
    ],
    correct: 3,
    why: [
      'Det är specifik smältentalpi som beskriver energin för att smälta 1 kg av ett ämne — en helt annan storhet, med enheten J/kg utan kelvin.',
      'Hur snabbt värme leds genom ett material beskrivs av materialets ledningsförmåga, inte av den specifika värmekapaciteten.',
      'Den totala inre energin beror på fler faktorer och anges inte av en enda tabellkonstant som $c$.',
      'Specifik värmekapacitet anger den energi som krävs för att höja temperaturen 1 K (eller 1 °C) på 1 kg av ett ämne. Enheten är J/(kg · K).',
    ],
  },
  {
    question: 'Vilken enhet har specifik värmekapacitet?',
    choices: ['J/(kg · K)', 'J/kg', 'W/(kg · K)', 'J/K'],
    correct: 0,
    why: [
      'Specifik värmekapacitet mäts i J/(kg · K): energi per kilogram och per grads temperaturändring.',
      'J/kg är enheten för specifik smältentalpi och specifik ångbildningsentalpi — inte för specifik värmekapacitet, som även beror på temperaturändringen.',
      'Watt är effekt (energi per tid), vilket inte hör hemma i den här storheten.',
      'J/K saknar massberoendet — specifik värmekapacitet gäller per kilogram, inte bara per kelvin.',
    ],
  },
  {
    question: 'Vilket samband används för att beräkna energin som krävs för att värma upp eller kyla ett ämne (utan fasövergång)?',
    choices: [
      '$E = l_\\mathrm{s} \\cdot m$',
      '$E = P \\cdot t$',
      '$E = c \\cdot m \\cdot \\Delta T$',
      '$E = \\dfrac{1}{2} \\cdot m \\cdot v^2$',
    ],
    correct: 2,
    why: [
      'Det sambandet ($E = l_\\mathrm{s} \\cdot m$) gäller energin vid smältning, som inte beror på någon temperaturändring alls.',
      'Det sambandet ger energi ur effekt och tid, till exempel för en varmvattenberedare — men det räknar inte ut hur mycket energi som krävs för själva temperaturhöjningen.',
      'Energin vid uppvärmning eller avsvalning ges av $E = c \\cdot m \\cdot \\Delta T$, där $c$ är specifik värmekapacitet, $m$ är massa och $\\Delta T$ är temperaturändringen.',
      'Det är formeln för rörelseenergi och har inget med temperaturändring att göra.',
    ],
  },
  {
    question: 'Två ämnen med olika temperatur blandas utan energiförluster till omgivningen. Vad gäller då för den avgivna och upptagna energin?',
    choices: [
      'Den avgivna energin är alltid större än den upptagna energin',
      'Den avgivna energin är lika stor som den upptagna energin',
      'Den upptagna energin är alltid större än den avgivna energin',
      'Ingen energi varken avges eller upptas förrän blandningen nått rumstemperatur',
    ],
    correct: 1,
    why: [
      'Utan energiförluster kan inte mer energi avges än vad som tas upp — då skulle energi försvinna, vilket strider mot energiprincipen.',
      'Utan energiförluster gäller $E_\\text{avg} = E_\\text{upp}$ — all energi som det varma ämnet avger tas upp av det kalla ämnet.',
      'Precis som ovan skulle det innebära att energi uppstår ur tomma intet, vilket inte är möjligt.',
      'Energiöverföringen sker hela tiden medan temperaturerna skiljer sig åt, inte bara i slutet.',
    ],
  },
  {
    question: 'Ett ämne med specifik värmekapacitet $c = 2{,}0\\ \\mathrm{kJ/(kg \\cdot K)}$ och massan $5{,}0\\ \\mathrm{kg}$ värms från 20 °C till 30 °C. Hur mycket energi krävs?',
    choices: ['100 kJ', '10 kJ', '50 kJ', '300 kJ'],
    correct: 0,
    why: [
      'Med $E = c \\cdot m \\cdot \\Delta T = 2{,}0 \\cdot 5{,}0 \\cdot 10 = 100\\ \\mathrm{kJ}$ blir svaret 100 kJ.',
      'Det motsvarar bara $c \\cdot \\Delta T$ utan att multiplicera med massan — massan måste också vägas in.',
      'Det motsvarar $c \\cdot m$ utan att multiplicera med temperaturändringen $\\Delta T = 10\\ \\mathrm{K}$.',
      'Det motsvarar att räkna med $\\Delta T = 30\\ \\mathrm{K}$ (sluttemperaturen) istället för temperaturändringen $10\\ \\mathrm{K}$.',
    ],
  },
],

'fy1-6.3': [
  {
    question: 'Vad kallas övergången direkt från fast fas till gasform, utan att ämnet blir flytande på vägen?',
    choices: ['Smältning', 'Kondensering', 'Sublimering', 'Deposition'],
    correct: 2,
    why: [
      'Smältning är övergången från fast till flytande fas, inte direkt till gas.',
      'Kondensering är övergången från gas till flytande fas.',
      'Sublimering är övergången direkt från fast fas till gas, utan att passera den flytande fasen.',
      'Deposition är den omvända övergången: direkt från gas till fast fas.',
    ],
  },
  {
    question: 'Vad händer med temperaturen hos ett ämne under tiden det smälter?',
    choices: [
      'Temperaturen är konstant — all tillförd energi går åt till att bryta kemiska bindningar',
      'Temperaturen stiger långsammare än innan smältningen började',
      'Temperaturen sjunker eftersom smältning är en endoterm process',
      'Temperaturen stiger snabbare eftersom ämnet blir mer lättrörligt',
    ],
    correct: 0,
    why: [
      'Under en fasövergång som smältning är temperaturen konstant. Den tillförda energin går åt till att bryta kemiska bindningar istället för att öka rörelseenergin.',
      'Det är inte bara långsammare — temperaturen ändras inte alls under själva smältningen.',
      'Smältning kräver visserligen tillförd energi, men det gör inte att temperaturen sjunker — den förblir konstant tills smältningen är klar.',
      'Rörligheten hos ämnet ändras vid smältning, men det påverkar inte temperaturen under själva fasövergången.',
    ],
  },
  {
    question: 'Vilken enhet har specifik smältentalpi och specifik ångbildningsentalpi?',
    choices: ['J/(kg · K)', 'J/K', 'kg/J', 'J/kg'],
    correct: 3,
    why: [
      'J/(kg · K) är enheten för specifik värmekapacitet — den storheten beror på temperaturändring, vilket entalpiteterna inte gör.',
      'J/K saknar massberoendet som entalpiteterna faktiskt har.',
      'Detta är enheten omvänd — det är energi per massa, inte massa per energi.',
      'Båda entalpiteterna mäts i J/kg — energi per kilogram, utan kelvin-beroende eftersom temperaturen inte ändras vid en fasövergång.',
    ],
  },
  {
    question: 'Vilket samband ger energin som krävs för att smälta en massa $m$ av ett ämne?',
    choices: [
      '$E = c \\cdot m \\cdot \\Delta T$',
      '$E = l_\\mathrm{s} \\cdot m$',
      '$E = l_\\mathrm{å} \\cdot m$',
      '$E = P \\cdot t$',
    ],
    correct: 1,
    why: [
      'Det sambandet gäller uppvärmning eller avsvalning utan fasövergång, där temperaturen faktiskt ändras.',
      'Energin för smältning ges av $E = l_\\mathrm{s} \\cdot m$, där $l_\\mathrm{s}$ är specifik smältentalpi.',
      'Det sambandet gäller förångning (eller kondensation), inte smältning — de har olika entalpivärden för samma ämne.',
      'Det sambandet kopplar energi till effekt och tid, till exempel för en värmekälla — inte till entalpi och massa.',
    ],
  },
  {
    question: 'Specifik smältentalpi för is är $l_\\mathrm{s} = 334\\ \\mathrm{kJ/kg}$. Hur mycket energi krävs för att smälta $2{,}0\\ \\mathrm{kg}$ is som redan har temperaturen 0 °C?',
    choices: ['334 kJ', '167 kJ', '1 336 kJ', '668 kJ'],
    correct: 3,
    why: [
      'Det är energin för att smälta bara 1,0 kg is — man har glömt att multiplicera med massan 2,0 kg.',
      'Det motsvarar att smälta 0,50 kg is, inte 2,0 kg.',
      'Det är dubbelt så mycket som det korrekta svaret — som om massan vore 4,0 kg istället för 2,0 kg.',
      'Med $E = l_\\mathrm{s} \\cdot m = 334 \\cdot 2{,}0 = 668\\ \\mathrm{kJ}$ blir svaret 668 kJ.',
    ],
  },
  {
    question: 'Specifik ångbildningsentalpi för vatten anges i tabellen som 2,26 MJ/kg, medan specifika smältentalpier oftast anges i kJ/kg. Vilket prefix är M i "MJ"?',
    choices: ['kilo — $10^3$', 'mega — $10^6$', 'milli — $10^{-3}$', 'giga — $10^9$'],
    correct: 1,
    why: [
      'Kilo ($10^3$) är prefixet i kJ, som används för smältentalpier — men M i MJ är ett annat, större prefix.',
      'M står för mega, $10^6$ — tusen gånger större än kilo. Det är därför vattnets ångbildningsentalpi anges i MJ/kg: annars skulle talet bli opraktiskt stort i kJ.',
      'Milli ($10^{-3}$) är en tusendels prefix — helt fel storleksordning för ett stort tal som 2,26 MJ/kg.',
      'Giga ($10^9$) är tusen gånger större än mega — alldeles för stort för att stämma med "M" i MJ.',
    ],
  },
],

'fy1-6.4': [
  {
    question: 'Varför kyls kroppen ner när vi svettas?',
    choices: [
      'Svetten leder bort värme genom att vara kallare än huden',
      'Svettningen sänker kroppens ämnesomsättning',
      'Avdunstning av svett kräver energi, som tas från huden',
      'Svetten reflekterar solstrålning bort från huden',
    ],
    correct: 2,
    why: [
      'Svetten har ungefär samma temperatur som huden när den utsöndras — det är inte en temperaturskillnad som kyler, utan själva avdunstningsprocessen.',
      'Svettning är kroppens sätt att göra sig av med överskottsvärme, men den påverkar inte ämnesomsättningen i sig.',
      'Avdunstning är en process som kräver energi. Den energin tas från huden, som därmed kyls ner.',
      'Reflektion av solstrålning har inget med svettens kylande effekt att göra — det är avdunstningen som är avgörande.',
    ],
  },
  {
    question: 'En människokropp i vila avger värme ungefär som ett element med vilken effekt?',
    choices: ['10 W', '1 000 W', '37 W', '100 W'],
    correct: 3,
    why: [
      'Det är för lågt — en vilande kropp avger betydligt mer effekt än så.',
      'Det är för högt för en kropp i vila — den siffran ligger närmare vad en kraftig värmefläkt avger.',
      '37 är kroppstemperaturen i celsius, inte en effekt i watt — lätt att blanda ihop dem här.',
      'En människokropp i vila strålar värme ungefär som ett element med effekten 100 W.',
    ],
  },
  {
    question: 'Hur håller kläder oss varma i kyla?',
    choices: [
      'De isolerar och håller kvar värmen som kroppen redan strålar ut',
      'De värmer upp kroppen genom en kemisk reaktion i tyget',
      'De reflekterar bort den kalla luften från kroppen',
      'De ökar kroppens egen värmeproduktion',
    ],
    correct: 0,
    why: [
      'Kläder isolerar och håller kvar värmen som kroppen strålar ut, istället för att låta den försvinna till den kallare omgivande luften.',
      'Vanliga kläder producerar ingen egen värme genom kemiska reaktioner — de fungerar istället som isolering.',
      'Det är inte reflektion av luft som är mekanismen, utan att värmen som redan finns nära kroppen hålls kvar.',
      'Kläder påverkar inte kroppens egen värmeproduktion, bara hur snabbt den värmen läcker ut till omgivningen.',
    ],
  },
  {
    question: 'Vad händer i kroppen när vi huttrar (skakar) i kyla utan kläder?',
    choices: [
      'Kroppen sänker sin egen temperatur för att spara energi',
      'Kemisk energi omvandlas till rörelseenergi som blir till värme',
      'Blodkärlen vidgas för att släppa ut mer värme',
      'Musklerna slutar att förbruka energi för att spara på den',
    ],
    correct: 1,
    why: [
      'Det är tvärtom — kroppen försöker hålla kvar sin temperatur, inte sänka den, genom att generera extra värme.',
      'Vid huttring omvandlas kemisk energi i kroppen till rörelseenergi i musklerna, som i sin tur blir till värme.',
      'Vid kyla drar blodkärlen istället ihop sig nära huden för att minska värmeförlusten, inte tvärtom.',
      'Musklerna arbetar aktivt (skakar) vid huttring, vilket förbrukar energi snarare än sparar den.',
    ],
  },
  {
    question: 'Varför upplever vi det kallare när det blåser, trots att lufttemperaturen är oförändrad?',
    choices: [
      'Blåsten sänker den faktiska lufttemperaturen',
      'Blåsten ökar kroppens egen värmeproduktion',
      'Vinden minskar mängden strålning som kroppen avger',
      'Vinden för bort den uppvärmda luften närmast kroppen och ersätter den med kallare luft',
    ],
    correct: 3,
    why: [
      'Lufttemperaturen i sig ändras inte av att det blåser — det är känslan av kyla som ökar, inte den faktiska temperaturen.',
      'Blåst i sig triggar ingen extra värmeproduktion i kroppen — effekten beror istället på ökad värmeförlust.',
      'Strålningen påverkas inte nämnvärt av vind — det är konvektionen (luftutbytet) som förklarar känslan av kyla.',
      'Vinden blåser bort den luft som redan värmts upp nära kroppen och ersätter den med kallare luft, vilket ökar värmeförlusten från huden.',
    ],
  },
],

'fy1-6.5': [
  {
    question: 'Vad säger termodynamikens nollte huvudsats?',
    choices: [
      'Energi kan varken skapas eller förstöras, bara omvandlas',
      'Två system i kontakt med varandra utbyter energi tills de når jämvikt',
      'Värme flödar alltid från varmt till kallt',
      'Alla processer upphör vid den absoluta nollpunkten',
    ],
    correct: 1,
    why: [
      'Det är den första huvudsatsen som handlar om energins bevarande — nollte huvudsatsen handlar istället om jämvikt.',
      'Nollte huvudsatsen säger att två system i kontakt med varandra utbyter energi tills de når jämvikt, det vill säga tills nettoflödet av energi upphör.',
      'Det är den andra huvudsatsen som beskriver värmeflödets riktning.',
      'Det är den tredje huvudsatsen som handlar om vad som händer vid den absoluta nollpunkten.',
    ],
  },
  {
    question: 'Vad säger termodynamikens första huvudsats?',
    choices: [
      'Energi kan inte skapas eller förstöras, bara omvandlas',
      'Två system i kontakt utbyter energi tills jämvikt uppstår',
      'Värme flödar aldrig av sig själv från kallt till varmt',
      'Alla processer upphör vid den absoluta nollpunkten',
    ],
    correct: 0,
    why: [
      'Första huvudsatsen är energiprincipen: energi kan inte skapas eller förstöras, bara omvandlas från en form till en annan.',
      'Det beskrivs istället av den nollte huvudsatsen, som handlar om jämvikt mellan system i kontakt.',
      'Det är den andra huvudsatsen som beskriver att värme aldrig flödar av sig själv från kallt till varmt.',
      'Det är den tredje huvudsatsen som gäller vid den absoluta nollpunkten.',
    ],
  },
  {
    question: 'Enligt termodynamikens andra huvudsats, i vilken riktning flödar värme av sig själv?',
    choices: [
      'Alltid från kallt till varmt',
      'I båda riktningarna lika ofta',
      'Alltid från varmt till kallt',
      'Riktningen beror på om ämnet är fast, flytande eller gas',
    ],
    correct: 2,
    why: [
      'Det är tvärtom — värme flödar aldrig av sig själv från kallt till varmt, det skulle strida mot andra huvudsatsen.',
      'Värmeflödet har en bestämd riktning, det sker inte slumpmässigt åt båda hållen.',
      'Andra huvudsatsen säger att värme flödar från varmt till kallt, och aldrig av sig själv åt andra hållet.',
      'Fasen på ämnet avgör inte flödesriktningen för värme mellan två system — det är temperaturskillnaden som avgör.',
    ],
  },
  {
    question: 'Vad säger termodynamikens tredje huvudsats om den absoluta nollpunkten?',
    choices: [
      'Vid den absoluta nollpunkten frigörs en oändlig mängd energi',
      'Den absoluta nollpunkten kan enkelt uppnås i ett vanligt laboratorium',
      'Den absoluta nollpunkten gäller bara för gaser, inte fasta ämnen',
      'Alla processer upphör vid den absoluta nollpunkten',
    ],
    correct: 3,
    why: [
      'Det är tvärtom — vid den absoluta nollpunkten upphör den termiska rörelsen, det frigörs ingen energi.',
      'Den absoluta nollpunkten är en teoretisk gräns som är extremt svår att komma nära, långt ifrån "enkel" att uppnå.',
      'Den absoluta nollpunkten är ett begrepp som gäller alla faser av materia, inte bara gaser.',
      'Tredje huvudsatsen säger att alla processer upphör vid den absoluta nollpunkten, eftersom all termisk rörelse då har stannat av.',
    ],
  },
],

// ── 09-fy1-ch7a.js ────────────────────────────────────────────

'fy1-7.1': [
  {
    question: 'Vad kallas det när ett neutralt föremål påverkas av en elektrisk kraft därför att ett laddat föremål förs nära det?',
    choices: ['Induktion', 'Konduktion', 'Influens', 'Jordning'],
    correct: 2,
    why: [
      'Induktion är den motsvarande effekten inom magnetism (elektromagnetisk induktion) — den elektriska omfördelningen av laddning i ett neutralt föremål kallas i stället influens.',
      'Konduktion beskriver att laddning transporteras genom ett ledande material, inte omfördelningen i ett neutralt föremål som förs nära en laddning.',
      'En omfördelning av laddningar i ett neutralt föremål på grund av ett yttre elektriskt fält kallas influens.',
      'Jordning innebär att koppla ett föremål till jorden så att överskottsladdning kan flöda bort, vilket är något annat än influens.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för elektrisk laddning?',
    choices: ['coulomb (C)', 'volt (V)', 'ampere (A)', 'newton (N)'],
    correct: 0,
    why: [
      'Elektrisk laddning har SI-enheten coulomb (C).',
      'Volt är enheten för spänning, en helt annan storhet än laddning.',
      'Ampere är enheten för elektrisk ström, inte för laddningsmängden i sig.',
      'Newton är enheten för kraft — den kraft laddningar kan påverka varandra med, men inte enheten för laddningen själv.',
    ],
  },
  {
    question: 'Två föremål med samma tecken på laddningen (t.ex. båda negativa) förs nära varandra. Vad händer?',
    choices: ['De attraherar varandra', 'De repellerar varandra', 'Ingen kraft uppstår', 'De blir neutrala'],
    correct: 1,
    why: [
      'Föremål med olika laddning (ett positivt och ett negativt) attraherar varandra — inte föremål med samma tecken.',
      'Lika laddning ger en repellerande kraft — föremålen stöts ifrån varandra.',
      'En elektrisk kraft uppstår så fort båda föremålen är laddade, oavsett tecken.',
      'Laddningarna omfördelas inte bara för att föremålen förs nära varandra — de behåller sin laddning och påverkar varandra med en kraft.',
    ],
  },
  {
    question: 'Vilket av följande material är ett exempel på en isolator?',
    choices: ['Koppar', 'Saltlösning', 'Kisel', 'Glas'],
    correct: 3,
    why: [
      'Koppar är en metall och en av de bästa ledarna — elektroner rör sig mycket lätt i den.',
      'Saltlösningar leder ström lätt och räknas som ledare, inte isolatorer.',
      'Kisel är en halvledare — den är isolerande vid låg temperatur men leder vid hög temperatur, alltså inte en renodlad isolator.',
      'Glas saknar lättrörliga elektroner och är därför en isolator, precis som plast och trä.',
    ],
  },
  {
    question: 'En elektron har laddningen $-1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$. Vilken laddning har en proton?',
    choices: ['$-1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$', '$+1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$', '$0\\ \\mathrm{C}$', '$+3{,}204 \\cdot 10^{-19}\\ \\mathrm{C}$'],
    correct: 1,
    why: [
      'Det är elektronens egen laddning — protonen har samma belopp men motsatt tecken.',
      'Protonen har exakt samma laddningsbelopp som elektronen, men positiv — en elementarladdning.',
      'Laddningen $0\\ \\mathrm{C}$ är neutronens laddning, inte protonens.',
      'Det skulle vara dubbla elementarladdningen — protonen har exakt en elementarladdning, inte två.',
    ],
  },
  {
    question: 'En metallkula med laddningen $+4{,}0\\ \\mathrm{nC}$ vidrör en lika stor, oladdad metallkula. Vilken laddning får de båda kulorna efter kontakt?',
    choices: ['$+4{,}0\\ \\mathrm{nC}$ vardera', '$+8{,}0\\ \\mathrm{nC}$ vardera', '$+2{,}0\\ \\mathrm{nC}$ vardera', '$0\\ \\mathrm{nC}$ vardera'],
    correct: 2,
    why: [
      'Laddningen fördelas jämnt mellan de två lika stora, ledande kulorna — den ursprungliga laddningen delas alltså, den stannar inte kvar oförändrad på den ena kulan.',
      'Den totala laddningen ($4{,}0\\ \\mathrm{nC} + 0\\ \\mathrm{nC}$) delas mellan två kulor, den fördubblas inte.',
      'De lika stora, ledande kulorna delar laddningen jämnt: medelvärdet av $4{,}0\\ \\mathrm{nC}$ och $0\\ \\mathrm{nC}$ är $2{,}0\\ \\mathrm{nC}$ per kula.',
      'Laddning försvinner inte vid kontakt — den omfördelas. Den totala laddningen ($4{,}0\\ \\mathrm{nC}$) finns kvar, fördelad mellan kulorna.',
    ],
  },
],

'fy1-7.2': [
  {
    question: 'Vilket samband är Coulombs lag för kraften mellan två punktladdningar $Q_1$ och $Q_2$ på avståndet $r$?',
    choices: [
      '$F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r}$',
      '$F = k \\cdot \\frac{Q_1 \\cdot Q_2}{r^2}$',
      '$F = k \\cdot Q_1 \\cdot Q_2 \\cdot r^2$',
      '$F = k \\cdot \\frac{Q_1 + Q_2}{r^2}$',
    ],
    correct: 1,
    why: [
      'Kraften avtar med kvadraten på avståndet, inte linjärt med avståndet — nämnaren ska vara $r^2$, inte $r$.',
      'Coulombs lag ger kraften som Coulombs konstant gånger produkten av laddningarna, delat med avståndet i kvadrat.',
      'Här står avståndet i täljaren i stället för nämnaren — det skulle ge en kraft som ökar med avståndet, vilket är fel.',
      'Det är produkten av laddningarna som ska stå i täljaren, $Q_1 \\cdot Q_2$, inte summan $Q_1 + Q_2$.',
    ],
  },
  {
    question: 'En liten laddad kula påverkar en mycket större laddad kula med en elektrisk kraft. Hur stor kraft påverkar den stora kulan den lilla med?',
    choices: [
      'Lika stor kraft, men motriktad',
      'En mindre kraft eftersom den lilla kulan har mindre laddning',
      'En större kraft eftersom den stora kulan är tyngre',
      'Ingen kraft alls, eftersom kulorna är olika stora',
    ],
    correct: 0,
    why: [
      'Enligt Newtons tredje lag är kraften alltid lika stor på båda föremålen, oavsett hur olika stora laddningarna eller kulorna är.',
      'Storleken på laddningen avgör inte att kraften blir olika på de två kulorna — kraften mellan dem är alltid lika stor åt båda håll.',
      'Massan (tyngden) hos kulorna påverkar inte den elektriska kraften mellan dem, och kraften på de två kulorna är i vilket fall lika stor.',
      'Så länge båda kulorna är laddade uppstår en elektrisk kraft mellan dem, oavsett storleksskillnad.',
    ],
  },
  {
    question: 'Vilket är ungefärliga värdet på Coulombs konstant $k$?',
    choices: [
      '$G \\approx 6{,}67 \\cdot 10^{-11}\\ \\mathrm{N \\cdot m^2/kg^2}$',
      '$q_e \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$',
      '$k \\approx 8{,}99 \\cdot 10^{9}\\ \\mathrm{N \\cdot m^2/C^2}$',
      '$g \\approx 9{,}82\\ \\mathrm{N/kg}$',
    ],
    correct: 2,
    why: [
      'Det är gravitationskonstanten $G$, som används i Newtons gravitationslag — en helt annan konstant.',
      'Det är elementarladdningen, laddningen hos en elektron eller proton — inte Coulombs konstant.',
      'Coulombs konstant är $k \\approx 8{,}99 \\cdot 10^{9}\\ \\mathrm{N \\cdot m^2/C^2}$.',
      'Det är tyngdfaktorn $g$, som används för att beräkna tyngdkraften $F_\\mathrm{G} = m \\cdot g$ — en helt annan storhet.',
    ],
  },
  {
    question: 'Avståndet mellan två laddade kulor fördubblas, medan laddningarna hålls oförändrade. Hur förändras den elektriska kraften mellan dem?',
    choices: [
      'Den blir dubbelt så stor',
      'Den blir hälften så stor',
      'Den blir fyra gånger så stor',
      'Den blir en fjärdedel så stor',
    ],
    correct: 3,
    why: [
      'Kraften ökar inte med avståndet — enligt Coulombs lag avtar den när avståndet ökar.',
      'Kraften avtar med kvadraten på avståndet, inte linjärt — en fördubbling av avståndet ger mer än en halvering.',
      'Det skulle gälla om kraften ökade med avståndet i kvadrat, men Coulombs lag har $r^2$ i nämnaren så kraften i stället avtar så här snabbt.',
      'Eftersom avståndet finns i nämnaren upphöjt till 2 ger en fördubbling av $r$ en minskning av kraften till $1/2^2 = 1/4$ av den ursprungliga.',
    ],
  },
  {
    question: 'Två laddningar med olika tecken (en positiv och en negativ) placeras nära varandra. Vad gäller för kraften mellan dem?',
    choices: [
      'De repellerar varandra',
      'De attraherar varandra',
      'Ingen kraft uppstår eftersom laddningarna tar ut varandra',
      'Kraften beror på vilken av dem som är starkast laddad',
    ],
    correct: 1,
    why: [
      'Repulsion uppstår mellan laddningar med samma tecken, inte olika tecken.',
      'Olika tecken på laddningarna ger en attraherande kraft — de dras mot varandra.',
      'Laddningarna tar inte ut varandra bara för att de har olika tecken — var och en behåller sin egen laddning, och en kraft uppstår mellan dem.',
      'Kraften finns oavsett vilken laddning som är störst, och enligt Newtons tredje lag är den lika stor på båda — bara riktningen (attraherande här) avgörs av tecknen.',
    ],
  },
],

'fy1-7.3': [
  {
    question: 'Vilket samband definierar elektrisk ström $I$ som funktion av laddningen $Q$ och tiden $t$?',
    choices: [
      '$I = Q \\cdot t$',
      '$I = \\frac{t}{Q}$',
      '$I = \\frac{Q}{t}$',
      '$I = Q^2 \\cdot t$',
    ],
    correct: 2,
    why: [
      'Ström är laddning per tidsenhet, inte laddning gånger tid — det skulle ge fel enhet.',
      'Här är täljare och nämnare omkastade — det är laddningen som ska divideras med tiden, inte tvärtom.',
      'Elektrisk ström är laddningsmängd per tidsenhet: $I = Q/t$.',
      'Laddningen ska inte kvadreras i sambandet — det är en enkel kvot mellan laddning och tid.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för elektrisk ström?',
    choices: ['ampere (A)', 'coulomb (C)', 'volt (V)', 'ohm (Ω)'],
    correct: 0,
    why: [
      'Elektrisk ström mäts i ampere (A).',
      'Coulomb är enheten för laddning, den storhet som passerar per tidsenhet — inte för strömmen själv.',
      'Volt är enheten för spänning, en annan storhet.',
      'Ohm är enheten för resistans, inte ström.',
    ],
  },
  {
    question: 'Hur definieras strömmens riktning i en elektrisk krets?',
    choices: [
      'Från minuspol till pluspol',
      'Samma riktning som elektronernas rörelse',
      'Alltid medurs sett i kopplingsschemat',
      'Från pluspol till minuspol',
    ],
    correct: 3,
    why: [
      'Det är motsatt riktning mot den verkliga strömriktningen — strömmen ritas från plus till minus, inte tvärtom.',
      'Strömmens riktning är faktiskt motsatt elektronernas rörelseriktning, eftersom strömriktningen historiskt definierades utifrån positiva laddningsbärare.',
      'Riktningen bestäms av var pluspolen respektive minuspolen sitter i kretsen, inte av en godtycklig ritregel som "medurs".',
      'Strömmens riktning definieras från pluspol till minuspol, motsatt elektronernas verkliga rörelseriktning.',
    ],
  },
  {
    question: 'Vad säger Kirchhoffs första lag?',
    choices: [
      'Spänningen är lika stor i alla punkter av en krets',
      'Summan av strömmarna in i en punkt är lika stor som summan av strömmarna ut',
      'Strömmen ökar för varje ny förgrening i kretsen',
      'Laddning kan skapas vid en knutpunkt om tillräckligt hög spänning läggs på',
    ],
    correct: 1,
    why: [
      'Det är inte vad Kirchhoffs första lag handlar om — den gäller strömmar vid en knutpunkt, inte spänning.',
      'Strömmen kan aldrig fastna i en knutpunkt — summan in är alltid lika med summan ut.',
      'Strömmen ökar inte automatiskt vid förgreningar — den delar upp sig, och summan av delströmmarna är oförändrad.',
      'Laddning kan enligt konserveringslagen för laddning aldrig skapas eller förstöras, oavsett spänning.',
    ],
  },
  {
    question: 'En ström på $2{,}0\\ \\mathrm{A}$ flyter genom en ledare i $5{,}0\\ \\mathrm{s}$. Hur stor laddning har passerat?',
    choices: ['$0{,}40\\ \\mathrm{C}$', '$2{,}5\\ \\mathrm{C}$', '$10\\ \\mathrm{C}$', '$7{,}0\\ \\mathrm{C}$'],
    correct: 2,
    why: [
      'Det är $t/I$ (5,0/2,0), men laddningen ges av $Q = I \\cdot t$, inte $t/I$.',
      'Det är $I/t$ (2,0/5,0), men vi ska multiplicera ström och tid för att få laddningen, inte dividera dem.',
      'Laddningen fås ur $Q = I \\cdot t = 2{,}0\\ \\mathrm{A} \\cdot 5{,}0\\ \\mathrm{s} = 10\\ \\mathrm{C}$.',
      'Det stämmer varken med multiplikation eller division av de givna värdena — kontrollera uträkningen $2{,}0 \\cdot 5{,}0$.',
    ],
  },
  {
    question: 'Hur många coulomb motsvarar $1\\ \\mathrm{Ah}$ (amperetimme)?',
    choices: ['$60\\ \\mathrm{C}$', '$3\\,600\\ \\mathrm{C}$', '$1\\ \\mathrm{C}$', '$86\\,400\\ \\mathrm{C}$'],
    correct: 1,
    why: [
      'Det motsvarar antalet sekunder i en minut, men en amperetimme innehåller antalet sekunder i en hel timme, inte en minut.',
      '$1\\ \\mathrm{Ah} = 1\\ \\mathrm{A} \\cdot 3\\,600\\ \\mathrm{s} = 3\\,600\\ \\mathrm{C}$, eftersom en timme har $3\\,600$ sekunder.',
      'Ett ampere under en hel timme ger betydligt mer laddning än bara $1\\ \\mathrm{C}$ — glöm inte att multiplicera med antalet sekunder i en timme.',
      'Det motsvarar antalet sekunder på ett helt dygn (24 h), inte i en enda timme.',
    ],
  },
],

'fy1-7.4': [
  {
    question: 'Vilket samband gäller för spänningen $U$ mellan två punkter, uttryckt i energiskillnaden $E$ och laddningen $Q$?',
    choices: [
      '$U = Q \\cdot t$',
      '$U = Q \\cdot E$',
      '$U = \\frac{Q}{E}$',
      '$U = \\frac{E}{Q}$',
    ],
    correct: 3,
    why: [
      'Tiden $t$ förekommer inte i definitionen av spänning — spänning kopplar ihop energi och laddning, inte tid.',
      'Spänningen fås genom division, inte multiplikation, av energi och laddning.',
      'Här är täljare och nämnare omkastade — det är energiskillnaden som ska divideras med laddningen, inte tvärtom.',
      'Spänning definieras som energiskillnad per laddningsenhet: $U = E/Q$.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för spänning?',
    choices: ['ampere (A)', 'volt (V)', 'joule (J)', 'watt (W)'],
    correct: 1,
    why: [
      'Ampere är enheten för elektrisk ström, en annan storhet än spänning.',
      'Spänning mäts i volt (V).',
      'Joule är enheten för energi — spänningen är energi per laddningsenhet, inte energin i sig.',
      'Watt är enheten för effekt, inte spänning.',
    ],
  },
  {
    question: 'Vilken spänning har ett vanligt eluttag i Sverige?',
    choices: ['$12\\ \\mathrm{V}$', '$110\\ \\mathrm{V}$', '$230\\ \\mathrm{V}$', '$400\\ \\mathrm{V}$'],
    correct: 2,
    why: [
      '$12\\ \\mathrm{V}$ är en typisk spänning för till exempel bilbatterier, inte för det svenska elnätet.',
      '$110\\ \\mathrm{V}$ används i vissa andra länder (t.ex. USA), men inte i Sverige.',
      'Ett vanligt svenskt eluttag har spänningen $230\\ \\mathrm{V}$.',
      '$400\\ \\mathrm{V}$ förekommer i vissa industriella trefaskopplingar, men är inte spänningen i ett vanligt vägguttag.',
    ],
  },
  {
    question: 'I liknelsen med en pilbåge motsvarar pilens hastighet vilken elektrisk storhet?',
    choices: ['Strömstyrkan', 'Spänningen', 'Resistansen', 'Laddningen'],
    correct: 0,
    why: [
      'Precis som pilens hastighet beror på hur hårt bågen spänns, beror strömstyrkan på spänningen i kretsen — pilens hastighet motsvarar alltså strömmen.',
      'Spänningen motsvaras i stället av hur hårt bågen spänns, inte av pilens hastighet.',
      'Resistans nämns inte i denna liknelse med pilbågen — den introduceras i nästa avsnitt.',
      'Laddningen är den storhet som rör sig i kretsen, men det som motsvarar pilens hastighet i liknelsen är strömstyrkan.',
    ],
  },
  {
    question: 'En laddning på $2{,}0\\ \\mathrm{C}$ flyttas mellan två punkter med spänningen $5{,}0\\ \\mathrm{V}$. Hur stor är energiskillnaden $E$?',
    choices: ['$2{,}5\\ \\mathrm{J}$', '$10\\ \\mathrm{J}$', '$0{,}40\\ \\mathrm{J}$', '$7{,}0\\ \\mathrm{J}$'],
    correct: 1,
    why: [
      'Det är kvoten $5{,}0/2{,}0$, men energin fås genom att multiplicera laddning och spänning, inte dividera dem.',
      'Energin fås ur $E = Q \\cdot U = 2{,}0\\ \\mathrm{C} \\cdot 5{,}0\\ \\mathrm{V} = 10\\ \\mathrm{J}$.',
      'Det är kvoten $2{,}0/5{,}0$, men energin fås genom multiplikation av laddning och spänning, inte division.',
      'Det stämmer varken med multiplikation eller division av de givna värdena — kontrollera uträkningen $2{,}0 \\cdot 5{,}0$.',
    ],
  },
],

'fy1-7.5': [
  {
    question: 'Vilket samband är Ohms lag?',
    choices: [
      '$U = \\frac{R}{I}$',
      '$U = R \\cdot I$',
      '$U = \\frac{I}{R}$',
      '$U = R + I$',
    ],
    correct: 1,
    why: [
      'Här är täljare och nämnare omkastade — Ohms lag är en produkt, inte en kvot av resistans och ström.',
      'Ohms lag säger att spänningen är resistansen gånger strömmen: $U = R \\cdot I$.',
      'Det är strömmen delat med resistansen, men Ohms lag är en produkt av $R$ och $I$, inte en kvot.',
      'Spänning, resistans och ström hör ihop genom multiplikation, inte addition.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för resistans?',
    choices: ['siemens (S)', 'farad (F)', 'ohm (Ω)', 'henry (H)'],
    correct: 2,
    why: [
      'Siemens är enheten för konduktans (inversen av resistans), inte för resistans själv.',
      'Farad är enheten för kapacitans, en annan elektrisk storhet.',
      'Resistans mäts i ohm (Ω).',
      'Henry är enheten för induktans, inte resistans.',
    ],
  },
  {
    question: 'Hur påverkas resistansen i en ledare om ledarens längd fördubblas (allt annat oförändrat)?',
    choices: ['Den halveras', 'Den är oförändrad', 'Den fyrdubblas', 'Den fördubblas'],
    correct: 3,
    why: [
      'Resistansen minskar inte med längden — en längre ledare ger tvärtom mer resistans, eftersom elektronerna möter fler atomer på vägen.',
      'En längre ledare innebär att elektronerna möter fler atomer som hindrar deras rörelse — resistansen förändras alltså.',
      'Resistansen är direkt proportionell mot längden $l$, så en fördubbling av $l$ ger en fördubbling — inte en fyrdubbling — av resistansen.',
      'Eftersom $R = \\rho \\cdot l/A$ är resistansen direkt proportionell mot längden — en fördubblad längd ger dubbelt så stor resistans.',
    ],
  },
  {
    question: 'Hur påverkas resistansen i en ledare om tvärsnittsarean fördubblas (allt annat oförändrat)?',
    choices: ['Den halveras', 'Den fördubblas', 'Den är oförändrad', 'Den fyrdubblas'],
    correct: 0,
    why: [
      'Eftersom $R = \\rho \\cdot l/A$ är resistansen omvänt proportionell mot tvärsnittsarean — en fördubblad area ger halva resistansen.',
      'Resistansen ökar inte med arean — en tjockare ledare ger tvärtom lägre resistans eftersom fler elektroner kan passera samtidigt.',
      'Arean påverkar visst resistansen — en tjockare ledare har lägre resistans än en tunnare, allt annat lika.',
      'Resistansen är omvänt proportionell mot arean, så en fördubbling av arean halverar resistansen — den fyrdubblas inte.',
    ],
  },
  {
    question: 'Hur påverkas resistansen i en ledare när temperaturen ökar?',
    choices: ['Den minskar', 'Den ökar', 'Den är opåverkad av temperaturen', 'Den blir noll'],
    correct: 1,
    why: [
      'Resistansen minskar inte med temperaturen i en vanlig ledare — den ökar, eftersom atomerna rör sig mer och hindrar elektronerna mer.',
      'Ju högre temperatur, desto mer rör sig atomerna i materialet och desto mer hindras elektronerna — resistansen ökar.',
      'Temperaturen är en av de faktorer (tillsammans med längd, area och material) som påverkar resistansen.',
      'Resistansen blir aldrig noll bara för att temperaturen ökar — vid högre temperatur blir den i stället större.',
    ],
  },
  {
    question: 'En resistor med resistansen $R = 10\\ \\Omega$ är kopplad till en spänning på $U = 20\\ \\mathrm{V}$. Hur stor blir strömmen genom resistorn?',
    choices: ['$0{,}50\\ \\mathrm{A}$', '$200\\ \\mathrm{A}$', '$2{,}0\\ \\mathrm{A}$', '$30\\ \\mathrm{A}$'],
    correct: 2,
    why: [
      'Det är $R/U$ (10/20), men strömmen fås ur $I = U/R$, alltså tvärtom.',
      'Det är $U \\cdot R$ (20 · 10), men strömmen fås genom division av spänning med resistans, inte multiplikation.',
      'Strömmen fås ur Ohms lag: $I = U/R = 20\\ \\mathrm{V} / 10\\ \\Omega = 2{,}0\\ \\mathrm{A}$.',
      'Det är summan av spänningen och resistansen (20 + 10), men de ska inte adderas — strömmen fås genom division.',
    ],
  },
],

'fy1-7.6': [
  {
    question: 'Hur ska en amperemeter kopplas för att mäta strömmen genom en komponent?',
    choices: [
      'Parallellt med komponenten',
      'Direkt över batteriets poler, utan komponent',
      'I serie med komponenten',
      'Det spelar ingen roll',
    ],
    correct: 2,
    why: [
      'Parallellkoppling är hur en voltmeter ska kopplas, inte en amperemeter.',
      'Då mäts inte strömmen genom komponenten alls, utan bara batteriets spänning.',
      'All ström som går genom komponenten måste också passera amperemetern, så den kopplas i serie med komponenten.',
      'Kopplingssättet spelar stor roll — fel koppling ger antingen fel mätvärde eller ingen mätning alls.',
    ],
  },
  {
    question: 'Vilken egenskap bör en amperemeter ha för att inte påverka strömmen den mäter?',
    choices: [
      'Hög resistans',
      'Ingen resistans alls, exakt noll',
      'Resistansen spelar ingen roll',
      'Låg resistans',
    ],
    correct: 3,
    why: [
      'Hög resistans skulle tvärtom minska strömmen i kretsen, eftersom amperemetern ligger i serie med komponenten.',
      'En verklig amperemeter kan inte ha exakt noll resistans, men den ska ha så låg resistans som möjligt.',
      'Resistansen spelar roll — eftersom amperemetern ligger i serie påverkar dess resistans hela kretsens totala resistans.',
      'Eftersom amperemetern kopplas i serie med komponenten ska den ha låg resistans, så att den inte i onödan minskar strömmen.',
    ],
  },
  {
    question: 'Hur kopplas en voltmeter för att mäta spänningen över en komponent?',
    choices: [
      'I serie med komponenten',
      'Parallellt med komponenten',
      'Direkt till jord, utan koppling till komponenten',
      'Mellan batteriets pluspol och komponentens minuspol, förbi resten av kretsen',
    ],
    correct: 1,
    why: [
      'Seriekoppling är hur en amperemeter ska kopplas, inte en voltmeter.',
      'Spänning mäts mellan två punkter, "över" komponenten — det innebär att voltmetern kopplas parallellt med den.',
      'Voltmetern måste kopplas till de två punkter man vill mäta spänningen mellan, inte till jord.',
      'Voltmetern ska kopplas parallellt med just den komponent man mäter spänningen över, inte hoppa förbi delar av kretsen.',
    ],
  },
  {
    question: 'Tre lampor är seriekopplade till ett batteri. En av lamporna går sönder. Vad händer med de andra två?',
    choices: [
      'De fortsätter lysa som vanligt',
      'De slocknar också',
      'De lyser starkare än innan',
      'De blinkar okontrollerat',
    ],
    correct: 1,
    why: [
      'I en seriekoppling finns bara en väg för strömmen — går den vägen sönder slocknar alla lampor, inte bara den trasiga.',
      'Eftersom strömmen bara kan gå en väg i en seriekoppling bryts hela kretsen när en lampa går sönder, och alla lampor slocknar.',
      'Lamporna kan inte lysa starkare när kretsen är bruten — ingen ström alls går genom dem längre.',
      'Att kretsen bryts ger inget okontrollerat blinkande, utan att strömmen upphör helt och lamporna slocknar.',
    ],
  },
  {
    question: 'Tre lampor är parallellkopplade till ett batteri. En av lamporna går sönder. Vad händer med de andra två?',
    choices: [
      'De fortsätter lysa oförändrat',
      'De slocknar också',
      'De lyser svagare än innan',
      'Kretsen kortsluts och säkringen löser ut',
    ],
    correct: 0,
    why: [
      'Varje gren i en parallellkoppling är en egen väg för strömmen — går en lampa sönder kan strömmen ändå passera de andra grenarna oförändrat.',
      'Bara den trasiga lampans egen gren bryts — de andra grenarna, och därmed lamporna i dem, påverkas inte.',
      'Spänningen över de kvarvarande lamporna är fortfarande densamma som batteriets, så de lyser lika starkt som innan.',
      'En trasig lampa ger en avbruten gren (öppen krets), inte en kortslutning.',
    ],
  },
  {
    question: 'Tre lampor är seriekopplade till ett batteri på $12\\ \\mathrm{V}$. Spänningen över lampa 1 är $4{,}0\\ \\mathrm{V}$ och över lampa 2 är $5{,}0\\ \\mathrm{V}$. Hur stor är spänningen över lampa 3?',
    choices: ['$12\\ \\mathrm{V}$', '$9{,}0\\ \\mathrm{V}$', '$1{,}0\\ \\mathrm{V}$', '$3{,}0\\ \\mathrm{V}$'],
    correct: 3,
    why: [
      'Det är batteriets totala spänning, men lampa 3 delar den spänningen med de andra två lamporna i seriekopplingen.',
      'Det är summan av $U_1$ och $U_2$ (4,0 + 5,0), men det är den spänning de redan tar tillsammans — det som återstår för lampa 3 är $12 - 9{,}0$.',
      'Nära, men kontrollera uträkningen: $12 - 4{,}0 - 5{,}0$ ger inte $1{,}0\\ \\mathrm{V}$.',
      'Delspänningarna ska summeras till batterispänningen: $U = U_1 + U_2 + U_3 \\Rightarrow U_3 = 12 - 4{,}0 - 5{,}0 = 3{,}0\\ \\mathrm{V}$.',
    ],
  },
],

'fy1-7.7': [
  {
    question: 'Vilken formel gäller för ersättningsresistansen $R_\\text{tot}$ vid seriekoppling av resistorer?',
    choices: [
      '$\\frac{1}{R_\\text{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2}$',
      '$R_\\text{tot} = R_1 + R_2$',
      '$R_\\text{tot} = R_1 \\cdot R_2$',
      '$R_\\text{tot} = R_1 - R_2$',
    ],
    correct: 1,
    why: [
      'Den formeln gäller i stället för parallellkoppling av resistorer, inte seriekoppling.',
      'Vid seriekoppling summeras resistanserna direkt: $R_\\text{tot} = R_1 + R_2 + \\ldots$',
      'Resistanser ska inte multipliceras med varandra — det skulle dessutom ge fel enhet ($\\Omega^2$ i stället för $\\Omega$).',
      'Resistanser ska summeras, inte subtraheras — annars skulle ersättningsresistansen kunna bli mindre än varje enskild resistor, eller till och med negativ.',
    ],
  },
  {
    question: 'Vilken formel gäller för ersättningsresistansen $R_\\text{tot}$ vid parallellkoppling av resistorer?',
    choices: [
      '$R_\\text{tot} = R_1 + R_2$',
      '$R_\\text{tot} = R_1 - R_2$',
      '$\\frac{1}{R_\\text{tot}} = \\frac{1}{R_1} + \\frac{1}{R_2}$',
      '$R_\\text{tot} = R_1 \\cdot R_2$',
    ],
    correct: 2,
    why: [
      'Den formeln gäller i stället för seriekoppling av resistorer, inte parallellkoppling.',
      'Resistanser ska inte subtraheras från varandra i någon av formlerna.',
      'Vid parallellkoppling summeras inverserna av resistanserna: $1/R_\\text{tot} = 1/R_1 + 1/R_2 + \\ldots$',
      'Resistanser ska inte multipliceras med varandra — det skulle dessutom ge fel enhet ($\\Omega^2$ i stället för $\\Omega$).',
    ],
  },
  {
    question: 'Hur förhåller sig ersättningsresistansen vid seriekoppling till resistansen hos de enskilda resistorerna?',
    choices: [
      'Den blir alltid mindre än den minsta resistorn',
      'Den blir alltid lika stor som medelvärdet av resistorerna',
      'Den blir alltid större än den största enskilda resistorn',
      'Den blir alltid noll',
    ],
    correct: 2,
    why: [
      'Vid seriekoppling summeras resistanserna, så resultatet kan aldrig bli mindre än den minsta av dem.',
      'Resistanserna summeras, de medelvärdesbildas inte — ersättningsresistansen blir därför större än varje enskild resistor.',
      'Eftersom $R_\\text{tot} = R_1 + R_2 + \\ldots$ blir summan alltid större än den enskilt största resistorn.',
      'Ersättningsresistansen blir noll bara om alla enskilda resistorer är noll, vilket normalt inte är fallet.',
    ],
  },
  {
    question: 'Hur förhåller sig ersättningsresistansen vid parallellkoppling till resistansen hos de enskilda resistorerna?',
    choices: [
      'Den blir alltid mindre än den minsta enskilda resistorn',
      'Den blir alltid större än den största resistorn',
      'Den blir alltid lika stor som summan av resistorerna',
      'Den blir alltid oändlig',
    ],
    correct: 0,
    why: [
      'Eftersom inverserna av resistanserna summeras blir $1/R_\\text{tot}$ större än varje enskild inverterad resistor, vilket gör $R_\\text{tot}$ mindre än den minsta av dem.',
      'Ersättningsresistansen vid parallellkoppling blir tvärtom mindre än varje enskild resistor, inte större.',
      'Att summera resistanserna direkt är formeln för seriekoppling — vid parallellkoppling summeras i stället inverserna.',
      'Ersättningsresistansen blir mindre, inte oändlig — den skulle bara närma sig oändligheten om alla resistorer själva var oändligt stora.',
    ],
  },
  {
    question: 'Två resistorer på $10\\ \\Omega$ och $15\\ \\Omega$ seriekopplas. Vad blir ersättningsresistansen?',
    choices: ['$5{,}0\\ \\Omega$', '$6{,}0\\ \\Omega$', '$150\\ \\Omega$', '$25\\ \\Omega$'],
    correct: 3,
    why: [
      'Det är skillnaden mellan resistorerna (15 − 10), men vid seriekoppling ska resistanserna adderas, inte subtraheras.',
      'Det stämmer med parallellformeln för två andra resistorvärden, men här ska resistanserna summeras direkt eftersom kopplingen är seriell.',
      'Det är produkten av resistorerna (10 · 15), men vid seriekoppling ska resistanserna adderas, inte multipliceras.',
      'Vid seriekoppling summeras resistanserna: $R_\\text{tot} = 10 + 15 = 25\\ \\Omega$.',
    ],
  },
  {
    question: 'Två resistorer på $10\\ \\Omega$ vardera parallellkopplas. Vad blir ersättningsresistansen?',
    choices: ['$20\\ \\Omega$', '$5{,}0\\ \\Omega$', '$10\\ \\Omega$', '$0{,}20\\ \\Omega$'],
    correct: 1,
    why: [
      'Det är summan av de två resistanserna (10 + 10 = 20 Ω), men den formeln gäller vid seriekoppling, inte parallellkoppling.',
      'Vid parallellkoppling gäller $1/R_\\text{tot} = 1/10 + 1/10 = 2/10$, vilket ger $R_\\text{tot} = 10/2 = 5{,}0\\ \\Omega$.',
      'Ersättningsresistansen vid parallellkoppling av två lika resistorer blir halva den enskilda resistansen, inte densamma.',
      'Det är inversen $1/R_\\text{tot}$ (2/10 = 0,20), men själva ersättningsresistansen $R_\\text{tot}$ fås genom att invertera detta värde igen: $1/0{,}20 = 5{,}0\\ \\Omega$.',
    ],
  },
],

// ── 10-fy1-ch7b.js ────────────────────────────────────────────

'fy1-7.8': [
  {
    question: 'Vad kännetecknar en komplex koppling?',
    choices: [
      'Den innehåller både serie- och parallellkopplade delar',
      'Den innehåller enbart seriekopplade komponenter',
      'Den innehåller enbart parallellkopplade komponenter',
      'Den saknar en spänningskälla',
    ],
    correct: 0,
    why: [
      'En komplex koppling innehåller både serie- och parallellkopplade komponenter, vilket kräver flera beräkningssteg.',
      'En komplex koppling är inte begränsad till bara seriekopplingar — den kan även innehålla parallella delar.',
      'En komplex koppling är inte begränsad till bara parallellkopplingar — den kan även innehålla seriekopplade delar.',
      'En komplex koppling kan mycket väl ha en spänningskälla; det är kombinationen av kopplingstyper som gör den komplex, inte avsaknaden av källa.',
    ],
  },
  {
    question: 'Vilket samband gäller för den totala resistansen vid en parallellkoppling av $R_1$ och $R_2$?',
    choices: [
      '$R_\\text{tot} = R_1 \\cdot R_2$',
      '$R_\\text{tot} = R_1 + R_2$',
      '$\\dfrac{1}{R_\\text{tot}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$',
      '$R_\\text{tot} = \\dfrac{R_1}{R_2}$',
    ],
    correct: 2,
    why: [
      'Resistanser multipliceras inte för att ge totalresistansen — det är en vanlig sammanblandning med en helt annan formel.',
      'Detta samband gäller för seriekoppling, inte för parallellkoppling.',
      'Vid parallellkoppling adderas de omvända resistanserna, precis som detta samband visar.',
      'Att dividera resistanserna med varandra ger inget fysikaliskt meningsfullt värde på totalresistansen.',
    ],
  },
  {
    question: 'Vad säger Kirchhoffs första lag?',
    choices: [
      'Resistansen ökar alltid med temperaturen',
      'Strömmen in i en punkt är lika stor som strömmen ut från punkten',
      'Strömmen är proportionell mot spänningen',
      'Summan av spänningarna i en sluten krets är noll',
    ],
    correct: 1,
    why: [
      'Kirchhoffs första lag handlar om ström i en förgreningspunkt, inte om hur resistans beror av temperatur.',
      'Detta är precis vad Kirchhoffs första lag säger: laddning varken skapas eller försvinner i en förgreningspunkt.',
      'Detta beskriver snarare Ohms lag, inte Kirchhoffs första lag.',
      'Detta är istället Kirchhoffs andra lag, som handlar om potentialändringar i en sluten krets.',
    ],
  },
  {
    question: 'Vad gäller för spänningen över komponenter som är parallellkopplade?',
    choices: [
      'Resistansen är lika stor i alla grenar',
      'Effekten är lika stor i alla grenar',
      'Spänningen är lika stor över alla parallellkopplade komponenter',
      'Strömmen är lika stor genom alla grenar',
    ],
    correct: 2,
    why: [
      'Resistansen kan skilja sig åt mellan grenarna även om de är parallellkopplade — det är spänningen som är gemensam.',
      'Effekten beror på både ström och resistans i respektive gren och behöver inte vara lika stor.',
      'Vid parallellkoppling ligger alla grenar mellan samma två punkter, så spänningen över dem måste vara densamma.',
      'Det är strömmen genom seriekopplade komponenter som är lika stor — i parallella grenar kan strömmen fördela sig olika.',
    ],
  },
  {
    question: 'Två resistorer på $10\\ \\mathrm{\\Omega}$ vardera är parallellkopplade. Vad blir den totala resistansen?',
    choices: [
      '$20\\ \\mathrm{\\Omega}$',
      '$2{,}0\\ \\mathrm{\\Omega}$',
      '$10\\ \\mathrm{\\Omega}$',
      '$5{,}0\\ \\mathrm{\\Omega}$',
    ],
    correct: 3,
    why: [
      'Vid parallellkoppling blir totalresistansen alltid mindre än den minsta enskilda resistansen, aldrig större — 20 Ω vore additionen som gäller vid seriekoppling.',
      'Detta värde är för litet; det motsvarar inte $1/R_\\text{tot} = 1/10 + 1/10$.',
      'Detta vore resultatet om bara en resistor fanns med, inte två parallellkopplade.',
      'Med $1/R_\\text{tot} = 1/10 + 1/10 = 2/10$ blir $R_\\text{tot} = 5{,}0\\ \\mathrm{\\Omega}$ — halva resistansen hos en enskild resistor, precis vad som gäller för två lika stora parallellkopplade resistorer.',
    ],
  },
],

'fy1-7.9': [
  {
    question: 'Vad definieras elektrisk effekt som?',
    choices: [
      'Energi som omvandlas per tidsenhet',
      'Laddning per tidsenhet',
      'Total resistans i kretsen',
      'Spänning per resistans',
    ],
    correct: 0,
    why: [
      'Elektrisk effekt definieras just som den energi som omvandlas varje sekund.',
      'Detta är definitionen av elektrisk ström, inte effekt.',
      'Resistansen är ett mått på hur mycket kretsen motverkar strömmen — det är inte samma sak som effekt.',
      'Att dividera spänning med resistans ger enligt Ohms lag strömmen, inte effekten.',
    ],
  },
  {
    question: 'Vilket samband gäller för elektrisk effekt?',
    choices: [
      '$P = U - I$',
      '$P = U \\cdot I$',
      '$P = \\dfrac{I}{U}$',
      '$P = U + I$',
    ],
    correct: 1,
    why: [
      'Att subtrahera storheter med olika enheter (volt och ampere) ger inget fysikaliskt meningsfullt resultat.',
      'Effekten fås genom att multiplicera spänningen med strömmen genom komponenten.',
      'Att dividera ström med spänning ger varken effekt eller någon annan användbar storhet här.',
      'Precis som vid subtraktion går det inte att lägga ihop volt och ampere till en meningsfull storhet.',
    ],
  },
  {
    question: 'Vilken formel ger effekten direkt om du känner resistansen *R* och strömmen *I* genom en komponent, utan att först behöva räkna ut spänningen?',
    choices: [
      '$P = \\dfrac{U^2}{R}$',
      '$P = \\dfrac{U}{R}$',
      '$P = R + I$',
      '$P = R \\cdot I^2$',
    ],
    correct: 3,
    why: [
      'Detta samband kräver att man känner spänningen *U*, vilket inte är fallet här.',
      'Detta ger enligt Ohms lag strömmen, inte effekten.',
      'Resistans och ström kan inte adderas rakt av till en effekt — enheterna stämmer inte överens.',
      'Med $P = R \\cdot I^2$ kan effekten beräknas direkt utifrån resistans och ström, utan att först ta reda på spänningen.',
    ],
  },
  {
    question: 'Vilken storhet betecknas med *ρ* i formeln $R = \\rho \\cdot \\dfrac{l}{A}$ för resistans i en ledare?',
    choices: [
      'Ledarens tvärsnittsarea',
      'Resistivitet',
      'Ledarens längd',
      'Elektrisk effekt',
    ],
    correct: 1,
    why: [
      'Tvärsnittsarean representeras istället av *A* i formeln.',
      'Resistivitet är materialets egen förmåga att motstå ström och betecknas *ρ* i formeln.',
      'Ledarens längd representeras istället av *l* i formeln.',
      'Effekten beskrivs av en helt annan formel, till exempel $P = U \\cdot I$.',
    ],
  },
  {
    question: 'En glödlampa har spänningen $U = 10\\ \\mathrm{V}$ och strömmen $I = 2{,}0\\ \\mathrm{A}$ genom sig. Vilken effekt utvecklas i lampan?',
    choices: [
      '$0{,}20\\ \\mathrm{W}$',
      '$12\\ \\mathrm{W}$',
      '$20\\ \\mathrm{W}$',
      '$5{,}0\\ \\mathrm{W}$',
    ],
    correct: 2,
    why: [
      'Detta vore resultatet om man av misstag dividerade strömmen med spänningen istället för att multiplicera dem — det ger enligt Ohms lag en resistans, inte en effekt.',
      'Detta vore resultatet om man av misstag adderade spänning och ström istället för att multiplicera dem.',
      'Med $P = U \\cdot I = 10 \\cdot 2{,}0 = 20\\ \\mathrm{W}$ stämmer detta svar.',
      'Detta vore resultatet om man av misstag dividerade spänningen med strömmen.',
    ],
  },
],

'fy1-7.10': [
  {
    question: 'Åt vilket håll ritas elektriska fältlinjer?',
    choices: [
      'In mot positiva laddningar och ut från negativa',
      'Ut från positiva laddningar och in mot negativa',
      'Alltid rakt uppåt, oavsett laddningens tecken',
      'Fältlinjer ritas bara mellan två laddningar av samma tecken',
    ],
    correct: 1,
    why: [
      'Det är precis tvärtom — fältlinjer ritas ut från plus och in i minus, inte in mot plus.',
      'Fältlinjer ritas alltid "ut från plus" och "in i minus", i linje med kraftriktningen på en liten positiv testladdning.',
      'Fältlinjernas riktning bestäms av laddningarnas tecken, inte av någon fast rumslig riktning som uppåt.',
      'Fältlinjer finns runt varje laddad kropp, även en ensam laddning utan någon motpart i närheten.',
    ],
  },
  {
    question: 'Hur rör sig en negativ laddning i förhållande till ett elektriskt fälts riktning?',
    choices: [
      'Vinkelrätt mot fältets riktning',
      'Den påverkas inte av fältet',
      'Mot fältets riktning',
      'Med fältets riktning',
    ],
    correct: 2,
    why: [
      'En laddning i ett elektriskt fält påverkas av en kraft längs fältlinjerna, inte vinkelrätt mot dem.',
      'Alla laddningar, positiva som negativa, påverkas av ett elektriskt fält de befinner sig i.',
      'Negativa laddningar rör sig mot fältets riktning, medan positiva laddningar rör sig med fältets riktning.',
      'Det är positiva laddningar som rör sig med fältets riktning — negativa gör tvärtom.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för elektrisk fältstyrka $\\mathbb{E}$?',
    choices: [
      'N/C (newton per coulomb)',
      'A (ampere)',
      'Ω (ohm)',
      'W (watt)',
    ],
    correct: 0,
    why: [
      'Elektrisk fältstyrka definieras som kraft per laddningsenhet och får därför enheten N/C.',
      'Ampere är enheten för ström, inte för elektrisk fältstyrka.',
      'Ohm är enheten för resistans, inte för elektrisk fältstyrka.',
      'Watt är enheten för effekt, inte för elektrisk fältstyrka.',
    ],
  },
  {
    question: 'Hur definieras den elektriska fältstyrkan $\\mathbb{E}$?',
    choices: [
      '$\\mathbb{E} = \\dfrac{Q}{F}$',
      '$\\mathbb{E} = F + Q$',
      '$\\mathbb{E} = F \\cdot Q$',
      '$\\mathbb{E} = \\dfrac{F}{Q}$',
    ],
    correct: 3,
    why: [
      'Detta är det omvända förhållandet — fältstyrkan definieras som kraft delat med laddning, inte tvärtom.',
      'Kraft och laddning adderas inte i definitionen av elektrisk fältstyrka.',
      'Kraft och laddning multipliceras inte i definitionen av elektrisk fältstyrka.',
      'Elektrisk fältstyrka definieras som den kraft som verkar per laddningsenhet, det vill säga $\\mathbb{E} = F/Q$.',
    ],
  },
  {
    question: 'Hur förändras den elektriska fältstyrkan från ett laddat klot om avståndet till klotet fördubblas?',
    choices: [
      'Den fördubblas',
      'Den blir fyra gånger så stor',
      'Den halveras',
      'Den blir en fjärdedel så stor',
    ],
    correct: 3,
    why: [
      'Fältstyrkan avtar med kvadraten på avståndet — den ökar alltså inte när avståndet blir större.',
      'Fältstyrkan minskar när avståndet ökar — den blir inte större.',
      'Eftersom fältstyrkan beror på $1/r^2$ och inte på $1/r$ minskar den mer än en halvering när avståndet fördubblas.',
      'Eftersom $\\mathbb{E} = k \\cdot Q/r^2$ beror fältstyrkan på $1/r^2$. Fördubblas *r* blir nämnaren fyra gånger så stor, så fältstyrkan blir en fjärdedel.',
    ],
  },
  {
    question: 'Ett litet klot har laddningen $Q = 1{,}0\\ \\mathrm{nC}$. Bestäm ungefär den elektriska fältstyrkan på avståndet $r = 0{,}30\\ \\mathrm{m}$ från klotets medelpunkt (använd $k \\approx 9{,}0 \\cdot 10^9\\ \\mathrm{N \\cdot m^2/C^2}$).',
    choices: [
      '$10\\ \\mathrm{N/C}$',
      '$900\\ \\mathrm{N/C}$',
      '$100\\ \\mathrm{N/C}$',
      '$30\\ \\mathrm{N/C}$',
    ],
    correct: 2,
    why: [
      'Detta vore resultatet om man av misstag glömde kvadrera avståndet *r* i nämnaren.',
      'Detta vore resultatet om man av misstag inte delade med $r^2$ alls.',
      'Med $\\mathbb{E} = k \\cdot Q/r^2 = 9{,}0 \\cdot 10^9 \\cdot 1{,}0 \\cdot 10^{-9} / 0{,}30^2 = 9/0{,}09 = 100\\ \\mathrm{N/C}$ stämmer detta svar.',
      'Detta vore resultatet om man av misstag använde avståndet *r* direkt istället för avståndet i kvadrat i nämnaren.',
    ],
  },
],

'fy1-7.11': [
  {
    question: 'Vad kännetecknar ett homogent elektriskt fält?',
    choices: [
      'Fältet är starkast vid plattornas kanter',
      'Fältet växlar riktning periodiskt över tiden',
      'Fältet är lika starkt överallt mellan plattorna',
      'Fältet finns bara nära den positiva plattan',
    ],
    correct: 2,
    why: [
      'Ett homogent fält har istället samma styrka överallt — det är inte starkare vid kanterna.',
      'Ett statiskt elektriskt fält mellan laddade plattor växlar inte riktning över tiden.',
      'Just detta är definitionen av ett homogent fält: det är lika starkt i varje punkt mellan plattorna.',
      'Fältet finns i hela utrymmet mellan plattorna, inte bara nära den ena plattan.',
    ],
  },
  {
    question: 'Vilken riktning har det elektriska fältet mellan två parallella plattor?',
    choices: [
      'Från den positiva plattan till den negativa',
      'Från den negativa plattan till den positiva',
      'Parallellt med plattornas yta, aldrig rätvinkligt mot den',
      'Fältet saknar en bestämd riktning mellan plattorna',
    ],
    correct: 0,
    why: [
      'Det elektriska fältets riktning är riktat rätvinkligt från den positiva plattan till den negativa.',
      'Riktningen är den omvända — fältet pekar från plus till minus, inte tvärtom.',
      'Fältet är riktat rätvinkligt mellan plattorna, inte parallellt med deras ytor.',
      'Ett homogent fält mellan laddade plattor har en väldefinierad riktning i varje punkt.',
    ],
  },
  {
    question: 'Vilket samband gäller för den elektriska fältstyrkan mellan två plattor?',
    choices: [
      '$\\mathbb{E} = U \\cdot d$',
      '$\\mathbb{E} = \\dfrac{U}{d}$',
      '$\\mathbb{E} = \\dfrac{d}{U}$',
      '$\\mathbb{E} = U + d$',
    ],
    correct: 1,
    why: [
      'Fältstyrkan fås inte genom att multiplicera spänning och avstånd — det skulle ge fel enhet.',
      'Fältstyrkan mellan två plattor ges av spänningen delat med plattavståndet, $\\mathbb{E} = U/d$.',
      'Detta är det omvända förhållandet jämfört med det korrekta sambandet.',
      'Spänning och avstånd adderas inte i formeln för fältstyrka mellan plattor.',
    ],
  },
  {
    question: 'Vilken enhet är, enligt genomgången, ekvivalent med N/C för elektrisk fältstyrka?',
    choices: [
      'A/m',
      'W/C',
      'V/m',
      'J/C',
    ],
    correct: 2,
    why: [
      'A/m är inte en enhet som förekommer för elektrisk fältstyrka i genomgången.',
      'W/C är inte en enhet för elektrisk fältstyrka.',
      'Eftersom $\\mathbb{E} = U/d$ ger volt delat med meter enheten V/m, som visar sig vara samma sak som N/C.',
      'J/C motsvarar istället enheten för spänning (volt), inte för elektrisk fältstyrka.',
    ],
  },
  {
    question: 'Två plattor sitter $d = 0{,}10\\ \\mathrm{m}$ ifrån varandra och spänningen mellan dem är $U = 200\\ \\mathrm{V}$. Hur stor är den elektriska fältstyrkan mellan plattorna?',
    choices: [
      '$20\\ \\mathrm{V/m}$',
      '$20\\,000\\ \\mathrm{V/m}$',
      '$200\\ \\mathrm{V/m}$',
      '$2\\,000\\ \\mathrm{V/m}$',
    ],
    correct: 3,
    why: [
      'Detta vore resultatet om man av misstag multiplicerade *U* och *d* istället för att dividera.',
      'Detta vore resultatet om man av misstag flyttade decimaltecknet fel i avståndet, som om $d = 0{,}010\\ \\mathrm{m}$.',
      'Detta vore resultatet om man av misstag glömde dela med avståndet *d* alls.',
      'Med $\\mathbb{E} = U/d = 200/0{,}10 = 2\\,000\\ \\mathrm{V/m}$ stämmer detta svar.',
    ],
  },
],

'fy1-7.12': [
  {
    question: 'Vad är den viktigaste skillnaden mellan elektrisk potential och spänning?',
    choices: [
      'Potential kan vara positiv, negativ eller noll, medan spänning aldrig är negativ',
      'Spänning existerar bara i batterier, potential bara i resistorer',
      'Potential mäts i volt medan spänning mäts i newton',
      'Potential och spänning är olika namn på exakt samma sak, utan någon skillnad',
    ],
    correct: 0,
    why: [
      'Till skillnad från spänning, som alltid är positiv, har elektrisk potential ett tecken och kan vara positiv, negativ eller noll.',
      'Både potential och spänning kan förekomma var som helst i en krets, inte bara i vissa komponenter.',
      'Både potential och spänning mäts i volt — skillnaden ligger i tecknet, inte i enheten.',
      'Till skillnad från spänning har potential ett tecken, så de är inte samma storhet.',
    ],
  },
  {
    question: 'Vilken potential har en jordad punkt i en krets?',
    choices: [
      'Alltid lika med batteriets spänning',
      'Beror på vilken resistor som ligger närmast',
      '0 V',
      'Odefinierad, eftersom jordning saknar en fast referens',
    ],
    correct: 2,
    why: [
      'Potentialen i en jordad punkt är per definition 0 V, oavsett vilket batteri som finns i kretsen.',
      'Jordningens potential är alltid 0 V, oberoende av var i kretsen den sitter.',
      'Jordning definieras just som nollnivån för potential i kretsen, så potentialen där är 0 V.',
      'Jordning fungerar tvärtom som en fast referenspunkt — det är därför potentialen där är väldefinierad och lika med 0 V.',
    ],
  },
  {
    question: 'Vad händer med potentialen när man potentialvandrar genom en resistor i strömmens riktning?',
    choices: [
      'Potentialen förblir helt oförändrad',
      'Potentialen minskar',
      'Potentialen blir automatiskt negativ, oavsett utgångsläge',
      'Potentialen ökar',
    ],
    correct: 1,
    why: [
      'Att gå genom en resistor med strömmen ändrar faktiskt potentialen — den förblir inte oförändrad.',
      'När man potentialvandrar genom en resistor med strömmens riktning minskar potentialen.',
      'Potentialen minskar med ett visst belopp, men blir inte nödvändigtvis negativ totalt sett — det beror på startvärdet.',
      'Potentialen ökar istället när man går genom en resistor mot strömmens riktning, inte med den.',
    ],
  },
  {
    question: 'Vad händer med potentialen när man går genom ett batteri från minuspolen till pluspolen?',
    choices: [
      'Potentialen påverkas inte alls',
      'Potentialen ökar med batteriets spänning',
      'Potentialen minskar med batteriets spänning',
      'Potentialen blir alltid noll',
    ],
    correct: 1,
    why: [
      'Att passera ett batteri ändrar faktiskt potentialen med ett belopp som motsvarar batteriets spänning.',
      'När man går från minuspol till pluspol i ett batteri ökar potentialen med batteriets spänning.',
      'Det är när man går från pluspol till minuspol som potentialen minskar, inte tvärtom.',
      'Potentialen blir bara noll om man dessutom befinner sig i en jordad punkt, inte generellt vid ett batteri.',
    ],
  },
  {
    question: 'Vad säger Kirchhoffs andra lag?',
    choices: [
      'Effekten är alltid proportionell mot kvadraten på strömmen',
      'Resistansen i en seriekoppling är summan av delresistanserna',
      'Summan av strömmarna in i en punkt är noll',
      'Summan av alla potentialändringar i en sluten krets är noll',
    ],
    correct: 3,
    why: [
      'Detta samband ($P = R I^2$) är riktigt i sig men beskriver effekt, inte Kirchhoffs andra lag.',
      'Detta är sambandet för seriekoppling av resistorer, inte Kirchhoffs andra lag.',
      'Detta beskriver istället Kirchhoffs första lag, som handlar om ström i en förgreningspunkt.',
      'Kirchhoffs andra lag säger att summan av alla potentialändringar vid en potentialvandring runt en sluten krets är noll.',
    ],
  },
  {
    question: 'Potentialen i punkt A är $V_\\mathrm{A} = +5{,}0\\ \\mathrm{V}$ och i punkt B är $V_\\mathrm{B} = -5{,}0\\ \\mathrm{V}$. Hur stor är spänningen mellan punkterna A och B?',
    choices: [
      '$-10\\ \\mathrm{V}$',
      '$0\\ \\mathrm{V}$',
      '$10\\ \\mathrm{V}$',
      '$5{,}0\\ \\mathrm{V}$',
    ],
    correct: 2,
    why: [
      'Spänning kan aldrig vara negativ — den definieras med ett absolutbelopp som tar bort ett eventuellt minustecken.',
      'Detta vore resultatet om man av misstag adderade de båda potentialerna med sina tecken istället för att ta skillnaden mellan dem.',
      'Med $U = |V_\\mathrm{A} - V_\\mathrm{B}| = |5{,}0 - (-5{,}0)| = |10| = 10\\ \\mathrm{V}$ stämmer detta svar.',
      'Detta vore resultatet om man bara räknade med den ena punktens potential istället för skillnaden mellan dem.',
    ],
  },
],

'fy1-7.13': [
  {
    question: 'Vad kännetecknar en Faradays bur?',
    choices: [
      'Den släcker ut elektriska fält inuti ett metallhölje',
      'Den skapar ett magnetfält runt höljet',
      'Den leder bort värme från komponenter inuti',
      'Den förstärker elektriska fält inuti höljet',
    ],
    correct: 0,
    why: [
      'En Faradays bur är just ett metallhölje som gör att inget resulterande elektriskt fält bildas inuti.',
      'En Faradays bur handlar om elektriska fält, inte om att skapa magnetfält.',
      'Att leda bort värme är inte funktionen hos en Faradays bur — det handlar om elektriska fält, inte temperatur.',
      'Det är precis tvärtom — fältet inuti släcks ut, det förstärks inte.',
    ],
  },
  {
    question: 'Varför bildas inget resulterande elektriskt fält inuti en laddad metallbur?',
    choices: [
      'Det yttre fältet är för svagt för att tränga igenom metall',
      'Ledningselektronerna omfördelar sig och skapar ett motriktat fält som tar ut det yttre fältet',
      'Metallen isolerar och stoppar fältet helt genom att inte leda ström alls',
      'Metallburen är jordad och har därför alltid potentialen noll',
    ],
    correct: 1,
    why: [
      'Effekten beror inte på fältets styrka utan på hur ledningselektronerna omfördelar sig i metallen.',
      'Ledningselektronerna rör sig mot fältet och skapar ett motriktat fält inuti som tar ut det yttre fältet.',
      'Metall är tvärtom en ledare, och det är just denna ledningsförmåga som gör att elektronerna kan omfördela sig och släcka ut fältet.',
      'Fenomenet fungerar likadant även utan jordning — det räcker att buren är en sluten metallkonstruktion.',
    ],
  },
  {
    question: 'Varför är man säker i en bil vid åskväder, enligt genomgången?',
    choices: [
      'Blixten attraheras alltid av det högsta föremålet i närheten, aldrig av bilen',
      'Bilens kaross fungerar som en Faradays bur',
      'Bilen är alltid jordad via motorn',
      'På grund av bilens gummidäck som isolerar mot marken',
    ],
    correct: 1,
    why: [
      'Blixtens väg beror på flera faktorer, men det är inte förklaringen till varför man är säker inuti bilen.',
      'Bilens metallkaross fungerar som en Faradays bur, vilket gör att det inte bildas något elektriskt fält inuti bilen vid ett blixtnedslag.',
      'Bilen är inte generellt jordad via motorn — säkerheten beror på karossens ledande metallhölje, inte på jordning.',
      'Detta är en vanlig missuppfattning — det är karossen som fungerar som Faradays bur, inte gummidäcken.',
    ],
  },
  {
    question: 'I demonstrationen med pappersremsor på en laddad metallbur, var påverkas remsorna starkt av fältet?',
    choices: [
      'Ingenstans — pappersremsor påverkas aldrig av elektriska fält',
      'Endast på insidan av buren',
      'Endast på utsidan av buren',
      'Både på insidan och utsidan av buren, lika mycket',
    ],
    correct: 2,
    why: [
      'Pappersremsor kan mycket väl påverkas av elektriska fält — annars skulle demonstrationen inte fungera alls.',
      'Det är tvärtom på insidan som remsorna hänger opåverkade rakt ner.',
      'Remsorna påverkas starkt av fältet på utsidan av buren där de ställer sig rakt ut, men hänger opåverkat rakt ner på insidan.',
      'Effekten är inte lika stor på båda sidor — det är just skillnaden mellan in- och utsida som visar att fältet släcks ut inuti.',
    ],
  },
  {
    question: 'Vad kallas fenomenet där en spetsig laddad ledare orsakar urladdning till omgivande luftmolekyler, ibland kallat Sankt Elmseld?',
    choices: [
      'Induktion',
      'Kortslutning',
      'Jordning',
      'Spetsurladdning',
    ],
    correct: 3,
    why: [
      'Induktion är ett annat fenomen som handlar om hur laddningar omfördelar sig utan direkt kontakt, inte urladdning från en spets.',
      'Kortslutning innebär en oavsiktlig lågresistiv väg för strömmen, inte en urladdning från en spetsig ledare till luften.',
      'Jordning handlar om att ansluta en ledare till marken för att hålla potentialen på 0 V, inte om urladdning till luftmolekyler.',
      'Fenomenet där en spetsig laddad ledare orsakar urladdning till luftmolekyler kallas spetsurladdning, även känt som Sankt Elmseld.',
    ],
  },
],

'fy1-7.14': [
  {
    question: 'Vad bestämde Millikan för första gången med sitt oljedroppsförsök?',
    choices: [
      'Elementarladdningen',
      'Ljusets hastighet',
      'Gravitationskonstanten',
      'Elektronens massa',
    ],
    correct: 0,
    why: [
      'Millikans oljedroppsförsök gjorde att elementarladdningen, $1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$, kunde bestämmas för första gången.',
      'Ljusets hastighet bestämdes i helt andra experiment, inte i oljedroppsförsöket.',
      'Gravitationskonstanten är inte vad Millikans försök syftade till att bestämma.',
      'Millikan bestämde laddningen, inte massan, hos elektronen i detta försök.',
    ],
  },
  {
    question: 'Vad krävs för att en oljedroppe ska sväva stilla mellan plattorna i experimentet?',
    choices: [
      'Att oljedroppens massa är noll',
      'Att spänningen mellan plattorna är noll',
      'Att den elektriska kraften och tyngdkraften är lika stora men motriktade',
      'Att oljedroppen är helt oladdad',
    ],
    correct: 2,
    why: [
      'En oljedroppe utan massa skulle inte påverkas av någon tyngdkraft att balansera i första hand.',
      'Utan spänning mellan plattorna finns ingen elektrisk kraft som kan balansera tyngdkraften, så droppen skulle bara falla.',
      'Droppen svävar i jämvikt just för att den uppåtriktade elektriska kraften balanserar den nedåtriktade tyngdkraften.',
      'En oladdad droppe skulle inte påverkas av någon elektrisk kraft alls och skulle därför bara falla fritt.',
    ],
  },
  {
    question: 'Vilket uttryck kan man härleda för laddningen *Q* på en svävande oljedroppe, med massan *m*, tyngdaccelerationen *g*, spänningen *U* och plattavståndet *d*?',
    choices: [
      '$Q = m \\cdot g \\cdot U \\cdot d$',
      '$Q = \\dfrac{m \\cdot g \\cdot d}{U}$',
      '$Q = \\dfrac{U}{m \\cdot g \\cdot d}$',
      '$Q = \\dfrac{m \\cdot g}{U \\cdot d}$',
    ],
    correct: 1,
    why: [
      'Att multiplicera samtliga storheter rakt av ger inte rätt enhet för laddning.',
      'Genom att sätta $F_e = F_G$, det vill säga $Q \\cdot \\mathbb{E} = m \\cdot g$, och ersätta $\\mathbb{E} = U/d$, fås $Q = m \\cdot g \\cdot d / U$.',
      'Detta är det omvända förhållandet jämfört med det korrekta uttrycket.',
      'Att sätta *d* i nämnaren tillsammans med *U* ger fel enhet — *d* ska stå i täljaren.',
    ],
  },
  {
    question: 'Vad var slutsatsen av Millikans upprepade mätningar av oljedropparnas laddning?',
    choices: [
      'Endast positiva laddningar förekom på dropparna',
      'Alla uppmätta laddningar var multiplar av samma minsta laddning, elementarladdningen',
      'Laddningen var alltid exakt densamma på varje enskild droppe',
      'Laddningen kunde anta vilket värde som helst',
    ],
    correct: 1,
    why: [
      'Millikan observerade både positiva och negativa laddningar på olika droppar.',
      'Slutsatsen var att alla uppmätta laddningar var multiplar av elementarladdningen, $1{,}6 \\cdot 10^{-19}\\ \\mathrm{C}$.',
      'Olika droppar hade olika stor total laddning, men alltid som en multipel av samma minsta laddning.',
      'Laddningarna var inte godtyckliga — de var alltid multiplar av en och samma minsta laddning.',
    ],
  },
  {
    question: 'En oljedroppe har laddningen $Q = 4{,}8 \\cdot 10^{-19}\\ \\mathrm{C}$. Ungefär hur många överskottselektroner har droppen, om elementarladdningens storlek är $q_\\mathrm{e} = 1{,}6 \\cdot 10^{-19}\\ \\mathrm{C}$?',
    choices: [
      '$4{,}8\\ \\text{st}$',
      '$2\\ \\text{st}$',
      '$30\\ \\text{st}$',
      '$3\\ \\text{st}$',
    ],
    correct: 3,
    why: [
      'Detta är bara talet framför tiopotensen i laddningen $Q$, inte antalet elementarladdningar den motsvarar.',
      'Detta vore resultatet om man av misstag avrundat för kraftigt nedåt istället för att dela laddningarna korrekt.',
      'Detta vore resultatet om man av misstag blandat ihop tiopotenserna och fått ett för stort tal.',
      'Med $n = Q/q_\\mathrm{e} = 4{,}8 \\cdot 10^{-19} / 1{,}6 \\cdot 10^{-19} = 3$ stämmer detta svar.',
    ],
  },
],

// ── 11-fy1-ch9.js ─────────────────────────────────────────────

'fy1-9.1': [
  {
    question: 'Vad kallas de partiklar (protoner och neutroner) som finns i atomkärnan?',
    choices: ['Elementarpartiklar', 'Nukleoner', 'Isotoper', 'Joner'],
    correct: 1,
    why: [
      'Elementarpartiklar är samlingsnamnet för protoner, neutroner OCH elektroner — inte bara de som sitter i kärnan.',
      'Protoner och neutroner i kärnan kallas gemensamt nukleoner (eller kärnpartiklar).',
      'Isotoper är atomer av samma grundämne med olika antal neutroner — inte ett namn på kärnpartiklarna själva.',
      'En jon är en atom med annat antal elektroner än protoner, vilket inte har med kärnpartiklarna att göra.',
    ],
  },
  {
    question: 'I notationen $_Z^A \\mathrm{X}$ för en atomkärna, vad anger talet $A$?',
    choices: ['Antalet protoner i kärnan', 'Antalet neutroner i kärnan', 'Det totala antalet protoner och neutroner (nukleoner)', 'Atomens laddning'],
    correct: 2,
    why: [
      'Antalet protoner anges av $Z$ (atomnumret), inte av $A$.',
      'Antalet neutroner fås genom att räkna ut $A - Z$ — $A$ ensamt anger inte bara neutronerna.',
      '$A$, masstalet, anger det totala antalet nukleoner (protoner + neutroner) i kärnan.',
      'Laddningen bestäms av antalet protoner minus antalet elektroner, inte av masstalet $A$.',
    ],
  },
  {
    question: 'Kärnan $_6^{12} \\mathrm{C}$ (kol-12) har masstal 12 och atomnummer 6. Hur många neutroner innehåller kärnan?',
    choices: ['6', '12', '18', '0'],
    correct: 0,
    why: [
      'Antalet neutroner fås som $A - Z = 12 - 6 = 6$.',
      '12 är masstalet $A$ (totala antalet nukleoner), inte bara antalet neutroner.',
      '18 skulle fås om man adderade $A$ och $Z$ i stället för att subtrahera dem.',
      '0 neutroner skulle bara stämma om $A$ och $Z$ vore lika, vilket inte är fallet här (12 ≠ 6).',
    ],
  },
  {
    question: 'Vad kännetecknar isotoper av samma grundämne?',
    choices: ['Samma antal neutroner men olika antal protoner', 'Samma masstal men olika atomnummer', 'Samma antal protoner men olika antal neutroner', 'Olika laddning men samma massa'],
    correct: 2,
    why: [
      'Olika antal protoner skulle innebära olika grundämnen, inte isotoper av samma ämne.',
      'Samma masstal med olika $Z$ beskriver s.k. isobarer, inte isotoper.',
      'Isotoper har samma $Z$ (samma grundämne) men olika antal neutroner, vilket ger olika masstal $A$.',
      'Isotoper av ett grundämne är normalt oladdade atomer — det är antalet neutroner, inte laddningen, som skiljer dem åt.',
    ],
  },
  {
    question: 'Varför sönderfaller inte protonerna i en atomkärna trots att de elektriskt repellerar varandra?',
    choices: ['Neutronerna neutraliserar protonernas laddning helt', 'Den starka kärnkraften håller ihop kärnpartiklarna på korta avstånd', 'Elektronerna i skalen drar samman protonerna', 'Gravitationskraften mellan protonerna är starkare än den elektriska'],
    correct: 1,
    why: [
      'Neutroner saknar laddning och kan inte neutralisera protonernas positiva laddning — de bidrar inte till att motverka repulsionen på det sättet.',
      'Den starka kärnkraften verkar bara på mycket korta avstånd (ungefär $10^{-15}\\ \\mathrm{m}$) men är där starkare än den elektriska repulsionen, och håller därför ihop kärnan.',
      'Elektronerna befinner sig i skal långt utanför kärnan och påverkar inte kärnpartiklarnas sammanhållning.',
      'Gravitationskraften mellan enskilda partiklar är extremt liten jämfört med den elektriska kraften — den kan inte hålla ihop kärnan.',
    ],
  },
],

'fy1-9.2': [
  {
    question: 'Vad menas med massdefekt?',
    choices: ['Den totala massan hos en atomkärna', 'Skillnaden mellan massan hos kärnans beståndsdelar var för sig och kärnans faktiska massa', 'Massan hos en elektron som saknas i en jon', 'Skillnaden mellan protonens och neutronens massa'],
    correct: 1,
    why: [
      'Den totala massan hos kärnan är kärnmassan, inte massdefekten.',
      'Massdefekten är just skillnaden mellan de fria beståndsdelarnas sammanlagda massa och den sammansatta kärnans (lägre) massa.',
      'Massdefekten handlar om kärnans nukleoner, inte om elektroner i en jon.',
      'Skillnaden mellan proton- och neutronmassa är bara ungefär $0{,}00138\\ \\mathrm{u}$ och är inte definitionen av massdefekt.',
    ],
  },
  {
    question: 'Vilket samband ger bindningsenergin $E$ utifrån massdefekten $\\Delta m$?',
    choices: ['$E = \\Delta m \\cdot c$', '$E = \\dfrac{\\Delta m}{c^2}$', '$E = \\Delta m \\cdot c^2$', '$E = \\dfrac{c^2}{\\Delta m}$'],
    correct: 2,
    why: [
      'Formeln saknar kvadraten på ljushastigheten — rätt samband är $E = \\Delta m \\cdot c^2$.',
      'Att dividera med $c^2$ i stället för att multiplicera skulle ge ett orimligt litet värde och fel enhet.',
      'Enligt $E = mc^2$ ger massdefekten $\\Delta m$ bindningsenergin $E = \\Delta m \\cdot c^2$.',
      'Att sätta $\\Delta m$ i nämnaren saknar fysikalisk grund — sambandet är en multiplikation, inte en kvot.',
    ],
  },
  {
    question: 'Vilken enhet används ofta för att ange energier hos enskilda atomer och partiklar, eftersom joule blir ett opraktiskt litet tal?',
    choices: ['kWh', 'cal (kalori)', 'u (atommassenhet)', 'eV (elektronvolt)'],
    correct: 3,
    why: [
      'kWh används för stora energimängder (t.ex. hushållsel), inte för enskilda partiklars energier.',
      'Kalori används för värmeenergi i vardagliga sammanhang, inte för partikelfysik.',
      'u är en massenhet, inte en energienhet.',
      'eV, elektronvolt, är en praktisk energienhet för mycket små energier: $1\\ \\mathrm{eV} = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$.',
    ],
  },
  {
    question: 'Ungefär hur många MeV motsvarar $1\\ \\mathrm{u}$ (en atommassenhet)?',
    choices: ['$1{,}66\\ \\mathrm{MeV}$', '$1{,}602\\ \\mathrm{MeV}$', '$931{,}49\\ \\mathrm{MeV}$', '$9{,}82\\ \\mathrm{MeV}$'],
    correct: 2,
    why: [
      '$1{,}66$ är faktorn $10^{-27}\\ \\mathrm{kg}$ per u, inte omvandlingen till MeV.',
      '$1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$ är energin för $1\\ \\mathrm{eV}$, inte omvandlingsfaktorn mellan u och MeV.',
      'Enligt $1\\ \\mathrm{u} = 931{,}49\\ \\mathrm{MeV}$ är detta den korrekta omvandlingen, vilket bland annat härleds via $E = mc^2$.',
      '$9{,}82$ är tyngdaccelerationen $g$ i N/kg och har inget med atommassenheten att göra.',
    ],
  },
  {
    question: 'Hur beräknas en atomkärnas massa ($m_\\text{kärna}$) utifrån nuklidmassan?',
    choices: ['$m_\\text{kärna} = m_\\text{nuklid} - Z \\cdot m_\\text{elektron}$', '$m_\\text{kärna} = m_\\text{nuklid} + Z \\cdot m_\\text{elektron}$', '$m_\\text{kärna} = m_\\text{nuklid} \\cdot Z$', '$m_\\text{kärna} = m_\\text{nuklid} - A \\cdot m_\\text{elektron}$'],
    correct: 0,
    why: [
      'Kärnmassan fås genom att ta nuklidmassan (hela atomen) och dra bort massan hos de $Z$ elektronerna: $m_\\text{kärna} = m_\\text{nuklid} - Z \\cdot m_\\text{elektron}$.',
      'Elektronmassan ska dras ifrån, inte adderas, eftersom nuklidmassan redan innefattar elektronerna.',
      'Massan ska inte multipliceras med antalet elektroner — det skulle ge ett orimligt stort tal.',
      'Antalet elektroner i en neutral atom är lika med $Z$ (antalet protoner), inte $A$ (masstalet) — att använda $A$ räknar bort för mycket elektronmassa.',
    ],
  },
  {
    question: 'En kärna har massan $10{,}00000\\ \\mathrm{u}$. Dess separata beståndsdelar väger tillsammans $10{,}10000\\ \\mathrm{u}$. Hur stor är massdefekten?',
    choices: ['$10{,}00000\\ \\mathrm{u}$', '$20{,}10000\\ \\mathrm{u}$', '$1{,}0000\\ \\mathrm{u}$', '$0{,}10000\\ \\mathrm{u}$'],
    correct: 3,
    why: [
      '$10{,}00000\\ \\mathrm{u}$ är kärnans egen massa, inte skillnaden mot beståndsdelarna.',
      '$20{,}10000\\ \\mathrm{u}$ fås om man adderar massorna i stället för att subtrahera dem.',
      '$1{,}0000\\ \\mathrm{u}$ är hundra gånger för stort — kontrollera subtraktionen igen.',
      'Massdefekten är skillnaden mellan beståndsdelarnas sammanlagda massa och kärnans massa: $10{,}10000 - 10{,}00000 = 0{,}10000\\ \\mathrm{u}$.',
    ],
  },
],

'fy1-9.3': [
  {
    question: 'Vad kännetecknar en positron?',
    choices: ['Den är en tyngre variant av en proton', 'Den saknar både massa och laddning', 'Den har samma massa som en elektron men positiv laddning', 'Den är en form av gammastrålning'],
    correct: 2,
    why: [
      'Positronen har inget med protonens massa att göra — den väger lika mycket som en elektron, som är mycket lättare än en proton.',
      'Positronen har både massa (samma som elektronens) och laddning (positiv) — den är inte masslös eller oladdad.',
      'En positron (e⁺) är elektronens antipartikel: samma massa som elektronen men med positiv laddning i stället för negativ.',
      'Gammastrålning består av fotoner, inte av positroner.',
    ],
  },
  {
    question: 'Vilket påstående om neutriner stämmer enligt genomgången?',
    choices: ['De är kraftigt laddade och absorberas lätt av materia', 'De saknar laddning och växelverkar knappt alls med materia', 'De har samma massa som en proton', 'De bildas endast vid gammasönderfall'],
    correct: 1,
    why: [
      'Neutriner saknar laddning — det är precis tvärtom mot påståendet, och de växelverkar mycket sällan med materia.',
      'Neutriner ($\\nu$) är oladdade, har ytterst liten massa och passerar nästan alltid rakt igenom materia utan att växelverka.',
      'Neutrinons massa är ytterst liten, ungefär en tusendel av elektronens massa — långt mindre än en protons massa.',
      'Neutriner bildas vid betasönderfall (både β⁻ och β⁺), inte vid gammasönderfall.',
    ],
  },
  {
    question: 'Vad sänds ut vid ett alfasönderfall?',
    choices: ['En elektron', 'En foton', 'En neutron', 'En heliumkärna ($_2^4 \\mathrm{He}$)'],
    correct: 3,
    why: [
      'En elektron sänds ut vid β⁻-sönderfall, inte vid alfasönderfall.',
      'En foton sänds ut vid gammasönderfall, då ingen förändring sker i kärnpartiklarna.',
      'En fri neutron sänds inte ut vid alfasönderfall — det är en hel heliumkärna med två protoner och två neutroner som avges.',
      'Vid α-sönderfall sänds en heliumkärna, $_2^4 \\mathrm{He}$ (två protoner och två neutroner), ut ur den ursprungliga kärnan.',
    ],
  },
  {
    question: 'En kärna med atomnummer 92 och masstal 238 genomgår α-sönderfall. Vilket atomnummer och masstal får dotterkärnan?',
    choices: ['$Z = 90$, $A = 234$', '$Z = 94$, $A = 242$', '$Z = 90$, $A = 238$', '$Z = 92$, $A = 234$'],
    correct: 0,
    why: [
      'Vid α-sönderfall minskar atomnumret med 2 ($92 - 2 = 90$) och masstalet med 4 ($238 - 4 = 234$), eftersom en heliumkärna ($_2^4 \\mathrm{He}$) lämnar moderkärnan.',
      'Atomnummer och masstal ska minska vid alfasönderfall, inte öka — en heliumkärna lämnar kärnan, den tillförs inte.',
      'Masstalet måste minska med 4 (inte vara oförändrat), eftersom fyra nukleoner (2p + 2n) lämnar kärnan som en heliumkärna.',
      'Atomnumret måste minska med 2 (inte vara oförändrat), eftersom heliumkärnan som sänds ut har 2 protoner.',
    ],
  },
  {
    question: 'Vad händer med antalet nukleoner i kärnan vid ett betasönderfall?',
    choices: ['Det ökar med 4', 'Det minskar med 1', 'Det förblir konstant', 'Det minskar med 2'],
    correct: 2,
    why: [
      'Nukleonantalet ökar inte vid betasönderfall — det är oförändrat eftersom en nukleon bara omvandlas till en annan sort.',
      'Antalet nukleoner minskar inte vid betasönderfall — en neutron omvandlas till en proton (eller tvärtom), men den finns fortfarande kvar i kärnan.',
      'Vid betasönderfall omfördelas nukleonerna (en neutron blir proton eller vice versa) men det totala antalet nukleoner (masstalet $A$) förblir konstant.',
      'En minskning med 2 nukleoner är typiskt för alfasönderfall, inte betasönderfall.',
    ],
  },
  {
    question: 'Vad sker vid ett gammasönderfall?',
    choices: ['Kärnan förändras inte, men en foton sänds ut när den övergår till lägre energitillstånd', 'Kärnan sänder ut en elektron och blir ett nytt grundämne', 'Kärnan sänder ut en heliumkärna', 'Antalet protoner i kärnan minskar med ett'],
    correct: 0,
    why: [
      'Vid γ-sönderfall ändras varken antalet protoner eller neutroner — bara en foton sänds ut när kärnan går från ett exciterat till ett lägre energitillstånd.',
      'Utsändning av elektron sker vid β⁻-sönderfall, inte gammasönderfall, och kärnan blir då ett nytt grundämne — vid gammasönderfall förblir grundämnet detsamma.',
      'Utsändning av en heliumkärna sker vid alfasönderfall, inte gammasönderfall.',
      'Antalet protoner ändras inte alls vid gammasönderfall — det är oförändrat, till skillnad från vid betasönderfall.',
    ],
  },
],

'fy1-9.4': [
  {
    question: 'Vilken enhet har aktivitet, och vad anger den?',
    choices: ['Sv, energidos per massa', 'Gy, absorberad energi per massa', 'Bq, antal sönderfall per sekund', 'u, antal kärnor i preparatet'],
    correct: 2,
    why: [
      'Sv (sievert) är enheten för ekvivalent stråldos, inte aktivitet.',
      'Gy (gray) är enheten för absorberad dos (energi per massa), inte för aktivitet.',
      'Aktivitet mäts i Bq (becquerel), vilket motsvarar antalet sönderfall per sekund i preparatet.',
      'u är atommassenheten och har inget att göra med hur många kärnor som sönderfaller per sekund.',
    ],
  },
  {
    question: 'Vilket samband gäller mellan aktiviteten $A$, sönderfallskonstanten $\\lambda$ och antalet atomkärnor $N$?',
    choices: ['$A = \\lambda + N$', '$A = \\dfrac{N}{\\lambda}$', '$A = \\dfrac{\\lambda}{N}$', '$A = \\lambda \\cdot N$'],
    correct: 3,
    why: [
      'Sambandet är en produkt, inte en summa, mellan sönderfallskonstanten och antalet kärnor.',
      'Att dividera $N$ med $\\lambda$ ger fel storleksordning och är inte det samband som beskriver aktivitet.',
      'Att sätta $N$ i nämnaren skulle innebära att aktiviteten minskar när antalet kärnor ökar, vilket är fel — fler kärnor ger högre aktivitet.',
      'Aktiviteten är proportionell mot antalet atomkärnor, med sönderfallskonstanten som proportionalitetskonstant: $A = \\lambda \\cdot N$.',
    ],
  },
  {
    question: 'Vad menas med halveringstid?',
    choices: ['Tiden det tar för hälften av atomkärnorna att sönderfalla', 'Tiden det tar innan preparatet helt har sönderfallit', 'Tiden det tar för aktiviteten att fördubblas', 'Tiden det tar för sönderfallskonstanten att halveras'],
    correct: 0,
    why: [
      'Halveringstiden är just den tid det tar för hälften av atomkärnorna i preparatet att sönderfalla.',
      'Efter en halveringstid återstår fortfarande hälften av kärnorna — preparatet är inte helt sönderfallet (det tar i princip oändlig tid).',
      'Aktiviteten minskar med tiden i takt med att kärnorna sönderfaller — den fördubblas inte.',
      'Sönderfallskonstanten $\\lambda$ är ett fast värde för ett visst ämne och ändras inte med tiden.',
    ],
  },
  {
    question: 'Hur beräknas sönderfallskonstanten $\\lambda$ utifrån halveringstiden $T_{1/2}$?',
    choices: ['$\\lambda = T_{1/2} \\cdot \\ln 2$', '$\\lambda = \\dfrac{\\ln 2}{T_{1/2}}$', '$\\lambda = \\dfrac{T_{1/2}}{\\ln 2}$', '$\\lambda = \\ln(2 \\cdot T_{1/2})$'],
    correct: 1,
    why: [
      'Sambandet är en kvot, inte en produkt — $\\lambda$ fås genom att dividera $\\ln 2$ med halveringstiden.',
      'Sönderfallskonstanten ges av $\\lambda = \\dfrac{\\ln 2}{T_{1/2}}$, vilket följer av att hälften av kärnorna återstår efter en halveringstid.',
      'Att vända på kvoten ger fel storhet (en tid i stället för 1/s) och stämmer inte med härledningen.',
      '$\\ln 2$ ska inte tas av produkten $2 \\cdot T_{1/2}$ — det är $\\ln 2$ separat som divideras med halveringstiden.',
    ],
  },
  {
    question: 'Ett preparat har $N_0 = 800$ atomkärnor och halveringstiden $T_{1/2} = 1$ dygn. Hur många kärnor återstår efter $t = 2$ dygn?',
    choices: ['400', '100', '200', '0'],
    correct: 2,
    why: [
      '400 är antalet kärnor som återstår efter EN halveringstid (1 dygn), inte efter två.',
      '100 skulle vara antalet efter tre halveringstider (3 dygn), inte två.',
      'Efter två halveringstider (2 dygn) har antalet halverats två gånger: $800 \\to 400 \\to 200$ kärnor.',
      'Antalet kärnor går aldrig till exakt noll inom ändlig tid enligt sönderfallslagen — det halveras stegvis i all oändlighet.',
    ],
  },
  {
    question: 'Enligt genomgången kan kol-14-metoden användas för dateringar upp till ungefär hur många år, eftersom bara en promille återstår efter tio halveringstider?',
    choices: ['$50\\,000\\ \\mathrm{år}$', '$5\\,730\\ \\mathrm{år}$', '$500\\,000\\ \\mathrm{år}$', '$4{,}5\\ \\text{miljarder år}$'],
    correct: 0,
    why: [
      'Tio halveringstider av kol-14 ($5\\,730 \\cdot 10$) ger ungefär $50\\,000\\ \\mathrm{år}$, vilket är den ungefärliga övre gränsen för kol-14-metoden.',
      '$5\\,730\\ \\mathrm{år}$ är EN halveringstid för kol-14, inte gränsen för hur långt tillbaka metoden fungerar.',
      '$500\\,000\\ \\mathrm{år}$ är en tiopotens för högt — det skulle motsvara ungefär 87 halveringstider, då återstår en försumbar mängd kol-14 att mäta.',
      '$4{,}5\\ \\text{miljarder år}$ är halveringstiden för Uran-238, ett helt annat ämne som används för geologisk datering, inte kol-14-metoden.',
    ],
  },
],

'fy1-9.5': [
  {
    question: 'Vilket samband och vilken enhet gäller för absorberad dos $D$?',
    choices: ['$D = E \\cdot m$, enhet Sv', '$D = \\dfrac{E}{m}$, enhet Gy', '$D = \\dfrac{m}{E}$, enhet Gy', '$D = D \\cdot Q$, enhet Sv'],
    correct: 1,
    why: [
      'Absorberad dos är en kvot (energi per massa), inte en produkt, och enheten är Gy, inte Sv.',
      'Absorberad dos definieras som energi per massenhet, $D = \\dfrac{E}{m}$, med enheten Gy (gray).',
      'Att vända på kvoten (massa genom energi) ger fel storhet — det är energi per massa, inte massa per energi.',
      '$H = D \\cdot Q$ är formeln för ekvivalent dos (enhet Sv), inte för absorberad dos.',
    ],
  },
  {
    question: 'Vilket material krävs för att stoppa gammastrålning enligt genomgången?',
    choices: ['En tunn pappskiva', 'Vanliga kläder', 'Tunn metall', 'Ett tjockt lager bly'],
    correct: 3,
    why: [
      'En tunn pappskiva stoppar alfastrålning, men gammastrålning går rakt igenom papp.',
      'Vanliga kläder ger inget nämnvärt skydd mot gammastrålning.',
      'Tunn metall stoppar betastrålning, men gammastrålning tar sig igenom tunn metall.',
      'Gammastrålning har mycket hög genomtränglighet och stoppas först av ett tjockt lager av tätt material som bly.',
    ],
  },
  {
    question: 'Varför är alfastrålning särskilt farlig om den kommer in i kroppen, till exempel via inandning av radon, trots att den lätt stoppas av kläder utanpå kroppen?',
    choices: ['Den har mycket hög genomtränglighet och når alla organ', 'Den saknar joniserande förmåga och skadar därför långsiktigt', 'Den avger all sin energi på ett litet område inuti vävnaden', 'Den omvandlas till gammastrålning inuti kroppen'],
    correct: 2,
    why: [
      'Alfastrålning har tvärtom LÅG genomtränglighet — det är just därför den är ofarlig utanför kroppen men farlig inuti.',
      'Alfastrålning är starkt joniserande — det är just denna egenskap som gör den skadlig, inte frånvaron av den.',
      'Alfapartiklarna (heliumkärnor) är relativt stora och avger all sin energi på ett litet område, vilket skadar vävnaden lokalt mycket kraftigt när de väl är inne i kroppen.',
      'Alfastrålning omvandlas inte till gammastrålning inuti kroppen — den fortsätter vara alfapartiklar tills de bromsats upp.',
    ],
  },
  {
    question: 'Vilken kvalitetsfaktor $Q$ har alfastrålning, och vad beror det höga värdet på?',
    choices: ['$Q = 1$, samma som gammastrålning eftersom all strålning är lika farlig', '$Q = 0$, eftersom alfastrålning inte är joniserande', '$Q = 20$, eftersom alfastrålning har högst genomtränglighet', '$Q = 20$, eftersom alfastrålning gör mer skada per absorberad energienhet'],
    correct: 3,
    why: [
      'Alfastrålning har $Q = 20$, inte samma värde som gammastrålning ($Q = 1$) — de är olika farliga per absorberad energienhet.',
      'Alfastrålning är starkt joniserande, inte icke-joniserande, och kvalitetsfaktorn är därför inte 0.',
      'Det höga $Q$-värdet beror inte på hög genomtränglighet — tvärtom har alfastrålning LÄGST genomtränglighet av de tre strålslagen.',
      'Alfastrålning har kvalitetsfaktor $Q = 20$ eftersom den, jämfört med gammastrålning, gör betydligt mer biologisk skada per absorberad energienhet.',
    ],
  },
  {
    question: 'En vävnad absorberar dosen $D = 2{,}0\\ \\mathrm{mGy}$ av betastrålning ($Q = 1$). Hur stor blir den ekvivalenta dosen?',
    choices: ['$2{,}0\\ \\mathrm{mSv}$', '$20\\ \\mathrm{mSv}$', '$1{,}0\\ \\mathrm{mSv}$', '$0{,}50\\ \\mathrm{mSv}$'],
    correct: 0,
    why: [
      'Med $H = D \\cdot Q = 2{,}0\\ \\mathrm{mGy} \\cdot 1 = 2{,}0\\ \\mathrm{mSv}$, eftersom kvalitetsfaktorn för betastrålning är 1.',
      '$20\\ \\mathrm{mSv}$ skulle stämma om $Q$ vore 10, men betastrålning har kvalitetsfaktor 1, inte 10.',
      '$1{,}0\\ \\mathrm{mSv}$ skulle fås om dosen delades med 2 i stället för att multipliceras med kvalitetsfaktorn 1.',
      '$0{,}50\\ \\mathrm{mSv}$ skulle fås om dosen delades med 4 — det finns ingen sådan division i formeln för ekvivalent dos.',
    ],
  },
],

// ── 12-fy2-ch1.js ─────────────────────────────────────────────

'fy2-1.1': [
  {
    question: 'Vad menas med hävarmen $l$ till en kraft, med avseende på en vridpunkt?',
    choices: [
      'Det vinkelräta (kortaste) avståndet mellan kraftens riktningslinje och vridpunkten',
      'Avståndet längs kraftens egen riktning fram till vridpunkten',
      'Kraftens storlek dividerad med föremålets massa',
      'Längden av den cirkelbåge som föremålet rör sig längs',
    ],
    correct: 0,
    why: [
      'Detta är definitionen av hävarm — det vinkelräta avståndet mellan kraftens riktningslinje och vridningspunkten.',
      'Hävarmen mäts inte längs kraftens egen riktning. En kraft riktad rakt mot vridpunkten har hävarmen 0, även om avståndet längs kraftens riktning är stort.',
      'Kraftmoment handlar inte om massa, utan om sambandet $M = F \\cdot l$ mellan kraft och hävarm.',
      'Det beskriver snarare en sträcka i en cirkelrörelse, inte hävarmen till en kraft.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för kraftmoment $M$?',
    choices: ['N', 'Nm', 'N/m', 'J'],
    correct: 1,
    why: [
      'N (newton) är enheten för kraft, inte för kraftmoment.',
      'Kraftmoment är en kraft gånger en hävarm, vilket ger enheten Nm.',
      'N/m skulle motsvara kraft delat med sträcka, vilket inte är hur kraftmoment definieras.',
      'J (joule) är enheten för energi/arbete. Trots att Nm dimensionsmässigt liknar J hålls enheterna isär — kraftmoment mäts i Nm.',
    ],
  },
  {
    question: 'En kraft på 20 N verkar vinkelrätt mot ett skaft, 0,50 m från vridpunkten. Hur stort är kraftmomentet?',
    choices: [
      '$0{,}025\\ \\mathrm{Nm}$',
      '$40\\ \\mathrm{Nm}$',
      '$10\\ \\mathrm{Nm}$',
      '$20{,}5\\ \\mathrm{Nm}$',
    ],
    correct: 2,
    why: [
      'Detta fås om man råkar dela hävarmen med kraften ($l/F$) istället för att multiplicera dem.',
      'Detta fås om man delar kraften med hävarmen ($F/l$) istället för att multiplicera dem.',
      '$M = F \\cdot l = 20 \\cdot 0{,}50 = 10\\ \\mathrm{Nm}$.',
      'Det ser ut som att 20 och 0,50 har adderats istället för multiplicerats.',
    ],
  },
  {
    question: 'Ett kraftmoment redovisas som $M = -6{,}0\\ \\mathrm{Nm}$. Vad innebär det negativa tecknet?',
    choices: [
      'Att kraften är riktad nedåt',
      'Att hävarmen är negativ',
      'Att vridningen sker moturs',
      'Att vridningen sker medurs',
    ],
    correct: 3,
    why: [
      'Tecknet på kraftmomentet säger inget om kraftens egen riktning i rummet, bara om vridningsriktningen.',
      'Hävarmen är per definition ett avstånd och kan inte vara negativ — tecknet hos $M$ kommer istället från vridningsriktningen.',
      'Ett positivt (inte negativt) kraftmoment motsvarar en vridning moturs.',
      'Ett negativt kraftmoment motsvarar per konvention en vridning medurs.',
    ],
  },
  {
    question: 'Vad krävs för att momentjämvikt ska råda kring en vridpunkt?',
    choices: [
      'Att kraftmomentet moturs är lika stort som kraftmomentet medurs',
      'Att alla krafter som verkar på föremålet är lika stora',
      'Att det bara verkar en enda kraft på föremålet',
      'Att hävarmen för samtliga krafter är noll',
    ],
    correct: 0,
    why: [
      'Detta är precis momentlagen: $M_1 = M_2$, där momenten moturs och medurs tar ut varandra.',
      'Krafterna behöver inte vara lika stora i sig — det är deras kraftmoment (kraft gånger hävarm) som måste balansera varandra.',
      'Momentjämvikt handlar om att flera kraftmoment balanserar varandra, inte om att bara en kraft verkar.',
      'Om alla hävarmar vore noll skulle inget kraftmoment alls uppstå — det är inte samma sak som jämvikt mellan två motstående moment.',
    ],
  },
  {
    question: 'En person på 80 kg sitter 1,0 m från vridpunkten på en gungbräda. Hur långt från vridpunkten måste en person på 20 kg sitta på andra sidan för momentjämvikt?',
    choices: [
      '$0{,}25\\ \\mathrm{m}$',
      '$4{,}0\\ \\mathrm{m}$',
      '$1{,}0\\ \\mathrm{m}$',
      '$2{,}0\\ \\mathrm{m}$',
    ],
    correct: 1,
    why: [
      'Detta fås om man råkar vända på masskvoten ($20/80 \\cdot 1{,}0$) istället för att sätta upp $m_1 \\cdot l_1 = m_2 \\cdot l_2$ korrekt.',
      'Momentjämvikt ger $m_1 \\cdot l_1 = m_2 \\cdot l_2 \\Leftrightarrow l_2 = \\dfrac{80 \\cdot 1{,}0}{20} = 4{,}0\\ \\mathrm{m}$.',
      'Detta skulle bara stämma om de två personerna vägde lika mycket, vilket de inte gör.',
      'Detta är för litet — den lättare personen måste sitta längre bort, inte närmare, för att kompensera sin mindre massa.',
    ],
  },
],

'fy2-1.2': [
  {
    question: 'Hur stort kraftmoment ger en kraft vars riktningslinje går genom vridningspunkten?',
    choices: [
      'Noll — hävarmen är 0',
      'Lika stort som kraften i newton',
      'Det beror på kraftens riktning',
      'Oändligt stort',
    ],
    correct: 0,
    why: [
      'Hävarmen är avståndet från vridningspunkten till kraftens riktningslinje. Går linjen genom vridningspunkten är hävarmen 0, och $M = F \\cdot l = 0$.',
      'Kraftmoment och kraft är olika storheter — momentet beror på både kraften och hävarmen, och här är hävarmen 0.',
      'Nej — så länge riktningslinjen går genom vridningspunkten är hävarmen 0 oavsett åt vilket håll kraften pekar.',
      'Tvärtom: momentet blir noll, inte oändligt.',
    ],
  },
  {
    question: 'En bräda vilar på två stöd, P och Q. Både $F_\\mathrm{P}$ och $F_\\mathrm{Q}$ är okända och du ska beräkna $F_\\mathrm{Q}$ med momentlagen. Var väljer du vridningspunkten?',
    choices: [
      'Vid P — då försvinner den okända kraften $F_\\mathrm{P}$ ur ekvationen',
      'Vid Q — då försvinner kraften du söker ur ekvationen',
      'Alltid i tyngdpunkten',
      'Det spelar ingen roll, räkningen blir lika enkel överallt',
    ],
    correct: 0,
    why: [
      'När en naturlig vridningspunkt saknas får den väljas valfritt. Väljer du P får $F_\\mathrm{P}$ hävarmen 0 och försvinner — kvar finns bara en okänd, $F_\\mathrm{Q}$.',
      'Då försvinner i stället $F_\\mathrm{Q}$ — precis den kraft du ville beräkna — och du står kvar med den andra okända kraften.',
      'Väljer du tyngdpunkten försvinner bara tyngdkraften (som du redan kan beräkna ur $m \\cdot g$) — båda de okända krafterna finns kvar.',
      'Vridningspunkten får väljas fritt, men räkningen blir olika svår: rätt val eliminerar en okänd kraft.',
    ],
  },
  {
    question: 'En bräda ligger på två bockar. Tyngdpunkten ligger närmare den vänstra bocken. Vilken bock bär störst del av brädans tyngd?',
    choices: [
      'Den vänstra',
      'Den högra',
      'De bär alltid exakt lika mycket',
      'Det går inte att avgöra utan att veta brädans massa',
    ],
    correct: 0,
    why: [
      'Ju närmare tyngdpunkten en stödjande eller bärande kraft är, desto större del av tyngden bär den upp.',
      'Det är tvärtom — stödet längst bort från tyngdpunkten bär den mindre delen.',
      'Lika fördelning gäller bara när tyngdpunkten ligger mitt emellan stöden.',
      'Massan avgör hur stor tyngden är totalt, men fördelningen mellan stöden avgörs av tyngdpunktens läge.',
    ],
  },
  {
    question: 'En jämntjock bräda väger 20 kg och ligger med tyngdpunkten mitt emellan två bockar. Ungefär hur stor kraft trycker varje bock uppåt med?',
    choices: [
      'Ungefär 98 N',
      'Ungefär 196 N',
      'Ungefär 49 N',
      'Ungefär 20 N',
    ],
    correct: 0,
    why: [
      'Tyngdkraften är $F_\\mathrm{G} = 20 \\cdot 9{,}82 \\approx 196\\ \\mathrm{N}$, och när tyngdpunkten ligger mitt emellan stöden bär de hälften var — cirka 98 N.',
      '196 N är hela tyngdkraften. Den delas mellan de två stöden, så varje bock bär hälften.',
      '49 N vore en fjärdedel av tyngden — men det finns bara två stöd, inte fyra.',
      '20 är massan i kilogram, inte en kraft i newton. Tyngdkraften är $m \\cdot g \\approx 196\\ \\mathrm{N}$, och varje stöd bär hälften.',
    ],
  },
  {
    question: 'En bräda är i vila på två stöd. Tyngdkraften på brädan är 200 N och det högra stödet trycker uppåt med 120 N. Hur stor kraft ger det vänstra stödet?',
    choices: [
      '80 N',
      '120 N',
      '200 N',
      '320 N',
    ],
    correct: 0,
    why: [
      'Brädan är i vila, så kraftjämvikt gäller: krafterna uppåt måste tillsammans vara lika stora som tyngdkraften nedåt. $(200 - 120)\\ \\mathrm{N} = 80\\ \\mathrm{N}$.',
      'Då skulle krafterna uppåt bli $240\\ \\mathrm{N}$ — mer än tyngdkraften — och brädan skulle inte vara i jämvikt.',
      'Stöden delar på tyngden — det vänstra stödet bär bara det som återstår när det högra tagit sina 120 N.',
      'Krafterna uppåt ska tillsammans bli 200 N, inte 320 N. Det vänstra stödet ger skillnaden $200 - 120 = 80\\ \\mathrm{N}$.',
    ],
  },
  {
    question: 'Man lutar en kloss långsamt mer och mer. När välter den?',
    choices: [
      'När tyngdpunkten hamnar utanför vridningspunkten (stödytan)',
      'Vid exakt 45° lutning, oavsett form',
      'När normalkraften blir större än tyngdkraften',
      'Så fort tyngdpunkten flyttar sig i sidled',
    ],
    correct: 0,
    why: [
      'Precis som i vältningsdemonstrationen: när tyngdpunktens lodräta riktningslinje passerar utanför vridningspunkten — utanför stödytan — välter klossen.',
      'Den kritiska vinkeln beror på klossens form: en låg och bred kloss tål mycket mer än 45°, en hög och smal mycket mindre.',
      'Normalkraft och tyngdkraft är lika stora så länge klossen står på underlaget — det är tyngdpunktens läge som avgör vältningen.',
      'Tyngdpunkten flyttar sig i sidled så fort man lutar klossen — den välter först när lodlinjen genom tyngdpunkten hamnar utanför stödytan.',
    ],
  },
],

'fy2-1.3': [
  {
    question: 'Vad kallas tiden det tar för en periodisk rörelse att upprepa sig en gång, t.ex. tiden för ett helt varv?',
    choices: [
      'Frekvens',
      'Vinkelhastighet',
      'Amplitud',
      'Period',
    ],
    correct: 3,
    why: [
      'Frekvens är antalet upprepningar per sekund, inte tiden för en upprepning.',
      'Vinkelhastighet beskriver hur fort vinkeln ändras, inte tiden för ett helt varv.',
      'Amplitud förekommer inte i denna genomgång om period/frekvens — det är ett annat begrepp, kopplat till svängningars utslag.',
      'Perioden $T$ är just tiden det tar för rörelsen att upprepa sig en gång.',
    ],
  },
  {
    question: 'Vilken är SI-enheten för frekvens $f$?',
    choices: ['Hz', 's', 'rad/s', 'm/s'],
    correct: 0,
    why: [
      'Hertz (Hz) är SI-enheten för frekvens, motsvarande 1/s.',
      'Sekund är enheten för period $T$, inte för frekvens.',
      'rad/s är enheten för vinkelhastighet ω, en annan storhet.',
      'm/s är enheten för fart/hastighet, inte för frekvens.',
    ],
  },
  {
    question: 'En cirkulär rörelse har frekvensen 5,0 Hz. Vad är perioden $T$?',
    choices: [
      '$5{,}0\\ \\mathrm{s}$',
      '$0{,}20\\ \\mathrm{s}$',
      '$2{,}5\\ \\mathrm{s}$',
      '$50\\ \\mathrm{s}$',
    ],
    correct: 1,
    why: [
      'Detta är frekvensens värde, inte perioden — perioden ges av $1/f$.',
      '$T = \\dfrac{1}{f} = \\dfrac{1}{5{,}0} = 0{,}20\\ \\mathrm{s}$.',
      'Detta fås om man av misstag delar frekvensen med 2 istället för att beräkna $1/f$.',
      'Detta fås om man förväxlar $1/f$ med $10/f$ eller liknande felräkning.',
    ],
  },
  {
    question: 'Hur definieras vinkelmåttet 1 radian?',
    choices: [
      'Vinkeln för ett helt varv delat på 4',
      'Vinkeln som motsvarar 1° i grader',
      'Vinkeln vars cirkelbåge är lika lång som cirkelns radie',
      'Vinkeln mellan två godtyckliga radier i en cirkel',
    ],
    correct: 2,
    why: [
      'Ett helt varv delat på 4 är 90°, vilket inte är samma sak som 1 radian (≈57,3°).',
      '1 radian motsvarar ungefär 57,3°, inte 1°.',
      'Detta är definitionen: om cirkelbågen är lika lång som radien, är medelpunktsvinkeln 1 radian.',
      'Vinkeln mellan två godtyckliga radier kan vara vad som helst — radianmåttet är specifikt kopplat till bågens längd i förhållande till radien.',
    ],
  },
  {
    question: 'Hur många radianer motsvarar 180°?',
    choices: [
      '$\\tfrac{\\pi}{2}$',
      '$2\\pi$',
      '$\\tfrac{\\pi}{4}$',
      '$\\pi$',
    ],
    correct: 3,
    why: [
      '$\\tfrac{\\pi}{2}$ rad motsvarar 90°, inte 180°.',
      '$2\\pi$ rad motsvarar ett helt varv, dvs. 360°.',
      '$\\tfrac{\\pi}{4}$ rad motsvarar 45°.',
      'Eftersom $360^{\\circ} = 2\\pi$ blir $180^{\\circ} = \\pi$.',
    ],
  },
  {
    question: 'Ett föremål rör sig i en cirkelbana med radien 0,50 m och vinkelhastigheten 2,0 rad/s. Vilken fart har det?',
    choices: [
      '$1{,}0\\ \\mathrm{m/s}$',
      '$4{,}0\\ \\mathrm{m/s}$',
      '$0{,}25\\ \\mathrm{m/s}$',
      '$2{,}5\\ \\mathrm{m/s}$',
    ],
    correct: 0,
    why: [
      '$v = \\omega \\cdot r = 2{,}0 \\cdot 0{,}50 = 1{,}0\\ \\mathrm{m/s}$.',
      'Detta fås om man av misstag dividerar $\\omega$ med $r$ istället för att multiplicera.',
      'Detta fås om man förväxlar formeln och beräknar $r/\\omega$ istället för $\\omega \\cdot r$.',
      'Detta stämmer inte med $v = \\omega \\cdot r$ för de givna värdena.',
    ],
  },
],

'fy2-1.4': [
  {
    question: 'Varför krävs en resulterande kraft för att ett föremål ska röra sig i en cirkelbana med konstant fart?',
    choices: [
      'Eftersom farten hela tiden minskar i en cirkelbana',
      'Eftersom hastigheten hela tiden ändrar riktning, och Newtons första lag säger att en riktningsändring kräver en resulterande kraft',
      'Eftersom cirkelbanan i sig producerar en kraft mot centrum',
      'Eftersom friktionen mot luften alltid är riktad mot centrum',
    ],
    correct: 1,
    why: [
      'Farten (hastighetens storlek) är per definition konstant i detta resonemang — det är riktningen som ändras.',
      'Enligt Newtons första lag fortsätter ett föremål annars rakt fram med konstant hastighet. Eftersom banan är krökt måste hastighetens riktning ändras, vilket kräver en resulterande kraft.',
      'En bana i sig kan inte producera en kraft — kraften kommer från t.ex. ett snöre, friktion eller gravitation.',
      'Luftmotstånd är ingen generell förklaring — centripetalkraften kan lika gärna komma från spännkraft, normalkraft eller gravitation, helt utan luft inblandad.',
    ],
  },
  {
    question: 'Vad är centripetalkraften $F_\\mathrm{C}$?',
    choices: [
      'En helt egen, extra kraft som alltid finns i cirkelrörelse utöver de andra krafterna',
      'En kraft som bara finns i satelliters omloppsbanor',
      'Den resulterande kraften, riktad mot cirkelns centrum, som t.ex. kan bestå av spännkraft, friktion, normalkraft eller tyngdkraft',
      'Kraften som håller emot rörelsen och bromsar farten',
    ],
    correct: 2,
    why: [
      'Centripetalkraften är inte en egen fristående kraft — den är resultanten av de krafter som redan verkar på föremålet.',
      'Centripetalkraft gäller all cirkulär rörelse, inte bara satelliter — t.ex. en vikt i ett snöre eller en bil i en kurva.',
      'Detta stämmer med genomgången: centripetalkraften är resultanten av krafter som spännkraft, friktion, normalkraft eller tyngdkraft, riktad mot centrum.',
      'Centripetalkraften bromsar inte farten (den är vinkelrät mot rörelseriktningen) — den ändrar bara riktningen.',
    ],
  },
  {
    question: 'Ett föremål rör sig i en cirkelbana med farten 4,0 m/s och radien 2,0 m. Vad blir centripetalaccelerationen $a_\\mathrm{C}$?',
    choices: [
      '$2{,}0\\ \\mathrm{m/s^2}$',
      '$16\\ \\mathrm{m/s^2}$',
      '$0{,}50\\ \\mathrm{m/s^2}$',
      '$8{,}0\\ \\mathrm{m/s^2}$',
    ],
    correct: 3,
    why: [
      'Detta fås om man av misstag delar $v$ med $r$ istället för att använda $v^2/r$.',
      'Detta är $v^2$ utan att dela med radien.',
      'Detta fås om man förväxlar formeln och beräknar $r/v^2$.',
      '$a_\\mathrm{C} = \\dfrac{v^2}{r} = \\dfrac{4{,}0^2}{2{,}0} = \\dfrac{16}{2{,}0} = 8{,}0\\ \\mathrm{m/s^2}$.',
    ],
  },
  {
    question: 'I vilken riktning är centripetalkraften alltid riktad?',
    choices: [
      'In mot cirkelbanans medelpunkt',
      'Tangentiellt längs banan, i rörelseriktningen',
      'Rakt utåt, bort från centrum',
      'Alltid rakt nedåt, oavsett bana',
    ],
    correct: 0,
    why: [
      'Centripetalkraften är per definition riktad in mot cirkelbanans medelpunkt — det är den som böjer av rörelsen till en cirkel.',
      'Det är hastigheten, inte centripetalkraften, som är riktad tangentiellt längs banan.',
      'En kraft utåt skulle få föremålet att lämna cirkelbanan istället för att böja in mot den.',
      'Riktningen beror inte på en fast riktning som "nedåt" — den pekar alltid mot centrum, oavsett var i cirkeln föremålet befinner sig.',
    ],
  },
  {
    question: 'En passagerare i en bil som svänger skarpt känns pressas utåt i sätet. Hur förklaras detta korrekt?',
    choices: [
      'En verklig kraft, centrifugalkraften, trycker passageraren utåt',
      'Passagerarens tröghet gör att hen "vill" fortsätta rakt fram, medan bilen svänger in under/runt hen — centrifugalkraft är en skenkraft, ingen verklig kraft',
      'Det är friktionen mellan däck och väg som orsakar känslan',
      'Det beror på att bilens fart ökar plötsligt i svängen',
    ],
    correct: 1,
    why: [
      'Centrifugalkraft är enligt genomgången en imaginär kraft — den finns inte som en verklig kraft utifrån.',
      'Enligt Newtons första lag "vill" passagerarens kropp fortsätta rakt fram på grund av sin tröghet. När bilen svänger känns det därför som en kraft utåt, fast det egentligen är bilen som kröker sig in mot passageraren.',
      'Friktionen mellan däck och väg orsakar snarare bilens centripetalkraft, inte känslan hos passageraren.',
      'Känslan uppstår oavsett om farten är konstant — det är riktningsändringen (svängen) som orsakar den, inte en fartökning.',
    ],
  },
  {
    question: 'En vikt med massan 0,50 kg rör sig i en cirkelbana med radien 1,0 m och farten 2,0 m/s. Vad blir centripetalkraften?',
    choices: [
      '$0{,}50\\ \\mathrm{N}$',
      '$4{,}0\\ \\mathrm{N}$',
      '$2{,}0\\ \\mathrm{N}$',
      '$1{,}0\\ \\mathrm{N}$',
    ],
    correct: 2,
    why: [
      'Detta fås om man av misstag beräknar $m \\cdot v / r^2$ eller liknande felaktig kombination.',
      'Detta är $v^2$ utan att multiplicera med massan och dela med radien.',
      '$F_\\mathrm{C} = \\dfrac{m \\cdot v^2}{r} = \\dfrac{0{,}50 \\cdot 2{,}0^2}{1{,}0} = \\dfrac{2{,}0}{1{,}0} = 2{,}0\\ \\mathrm{N}$.',
      'Detta fås om man glömmer att kvadrera farten $v$.',
    ],
  },
],

'fy2-1.5': [
  {
    question: 'Vad kännetecknar en konisk pendel?',
    choices: [
      'Pendeln svänger fram och tillbaka i ett plan, precis som en vanlig pendel',
      'Pendelvikten står stilla medan tråden roterar runt sin egen axel',
      'Pendeln har två trådar istället för en',
      'Pendelvikten sveper runt i en horisontell cirkel medan tråden bildar en konform',
    ],
    correct: 3,
    why: [
      'Det beskriver en vanlig (plan) pendel, inte en konisk pendel.',
      'I en konisk pendel rör sig själva vikten i en cirkelbana — den står inte stilla.',
      'En konisk pendel har bara en tråd, som formar en kon när vikten sveper runt.',
      'Detta är definitionen av konisk pendel: vikten sveper i en horisontell cirkel medan tråden beskriver en konform.',
    ],
  },
  {
    question: 'Vilken formel ger periodtiden $T$ för en konisk pendel med pendellängd $l$ och utslagsvinkel α?',
    choices: [
      '$T = 2\\pi \\sqrt{\\dfrac{l \\cdot \\cos \\alpha}{g}}$',
      '$T = 2\\pi \\sqrt{\\dfrac{l}{g \\cdot \\cos \\alpha}}$',
      '$T = 2\\pi \\sqrt{\\dfrac{g}{l \\cdot \\cos \\alpha}}$',
      '$T = 2\\pi \\cdot l \\cdot \\cos \\alpha \\cdot g$',
    ],
    correct: 0,
    why: [
      'Detta är den korrekta formeln för periodtiden hos en konisk pendel.',
      'Detta har $\\cos \\alpha$ på fel plats — det ska stå i täljaren tillsammans med $l$, inte i nämnaren.',
      'Detta har $g$ och $l \\cdot \\cos \\alpha$ ombytta jämfört med den korrekta formeln.',
      'Formeln innehåller en kvadratrot, inte bara ett rakt produktuttryck.',
    ],
  },
  {
    question: 'Vad representerar vinkeln α i formeln för konisk pendel?',
    choices: [
      'Vinkeln mellan tråden och den horisontella cirkelbanan',
      'Utslagsvinkeln mellan tråden och vertikalplanet (den lodräta linjen genom upphängningspunkten)',
      'Vinkeln mellan tyngdkraften och spännkraften',
      'Vinkeln som cirkelbanan sveper på en sekund',
    ],
    correct: 1,
    why: [
      'α mäts inte mot den horisontella banan, utan mot den lodräta (vertikala) linjen från upphängningspunkten.',
      'Enligt genomgången är α utslagsvinkeln mot vertikalplanet — vinkeln mellan tråden och den lodräta linjen.',
      'Denna vinkel råkar sammanfalla med α i figuren, men α definieras mot tråden/vertikalplanet, inte som vinkeln mellan just dessa två kraftvektorer.',
      'Det beskrivna är snarare relaterat till vinkelhastigheten, inte till utslagsvinkeln α.',
    ],
  },
  {
    question: 'Vad händer med periodtiden $T$ för en konisk pendel om utslagsvinkeln α ökar (och $l$, $g$ hålls oförändrade)?',
    choices: [
      'T ökar, eftersom en större vinkel innebär en längre cirkelbana',
      'T är opåverkad av α',
      'T minskar, eftersom $\\cos \\alpha$ minskar när α ökar',
      'T blir negativt',
    ],
    correct: 2,
    why: [
      'En längre cirkelbana kompenseras av att pendeln också rör sig snabbare vid större utslag — nettoeffekten enligt formeln är att $T$ minskar, inte ökar.',
      'α påverkar $T$ direkt genom faktorn $\\cos \\alpha$ i formeln — perioden är alltså inte opåverkad.',
      'Eftersom $\\cos \\alpha$ minskar när α växer (mot 90°), minskar också uttrycket under rottecknet, och därmed $T$.',
      'En tid kan inte bli negativ — $\\cos \\alpha$ är positivt för alla vinklar mellan 0° och 90°.',
    ],
  },
  {
    question: 'Vilken av dessa storheter förekommer INTE i formeln för periodtiden hos en konisk pendel?',
    choices: [
      'Pendellängden $l$',
      'Tyngdaccelerationen $g$',
      'Utslagsvinkeln α',
      'Massan $m$ hos pendelvikten',
    ],
    correct: 3,
    why: [
      'Pendellängden $l$ ingår i formeln.',
      'Tyngdaccelerationen $g$ ingår i formeln.',
      'Utslagsvinkeln α ingår i formeln, via $\\cos \\alpha$.',
      'Massan $m$ finns inte med i formeln $T = 2\\pi\\sqrt{l \\cos\\alpha / g}$ — periodtiden är oberoende av vikten hos pendelkroppen.',
    ],
  },
],

'fy2-1.6': [
  {
    question: 'Om luftmotstånd försummas, hur beter sig hastigheten och accelerationen i x-led under en kaströrelse?',
    choices: [
      'Hastigheten är konstant och accelerationen är noll',
      'Hastigheten ökar linjärt och accelerationen är konstant lika med $g$',
      'Hastigheten minskar linjärt till noll',
      'Både hastigheten och accelerationen är noll',
    ],
    correct: 0,
    why: [
      'Eftersom inga krafter verkar i x-led (utan luftmotstånd) är $a_\\mathrm{x} = 0$, vilket ger konstant hastighet $v_\\mathrm{x}$.',
      'Detta beskriver istället y-ledens rörelse, där tyngdaccelerationen $g$ verkar.',
      'Hastigheten i x-led varken minskar eller ökar — den är konstant genom hela kaströrelsen.',
      'Föremålet rör sig faktiskt i x-led (annars vore det ingen kaströrelse) — hastigheten är konstant men inte noll.',
    ],
  },
  {
    question: 'Vilket uttryck ger hastigheten i y-led, $v_\\mathrm{y}$, vid tiden $t$ i en kaströrelse med utgångshastighet $v_0$ och elevationsvinkel α?',
    choices: [
      '$v_\\mathrm{y} = v_0 \\cdot \\cos \\alpha$',
      '$v_\\mathrm{y} = v_0 \\cdot \\sin \\alpha - g \\cdot t$',
      '$v_\\mathrm{y} = v_0 \\cdot \\sin \\alpha + g \\cdot t$',
      '$v_\\mathrm{y} = g \\cdot t$',
    ],
    correct: 1,
    why: [
      'Detta uttryck saknar tidsberoendet och beskriver dessutom x-ledens (konstanta) hastighetskomposant, inte y-ledens.',
      'Utgångshastigheten i y-led är $v_0 \\cdot \\sin \\alpha$, och eftersom $a_\\mathrm{y} = -g$ minskar hastigheten med $g \\cdot t$ över tiden.',
      'Tecknet framför $g \\cdot t$ ska vara minus, inte plus, eftersom tyngdaccelerationen bromsar den uppåtriktade rörelsen.',
      'Detta uttryck saknar bidraget från utgångshastigheten $v_0 \\cdot \\sin \\alpha$.',
    ],
  },
  {
    question: 'En boll kastas med utgångshastigheten 10 m/s i vinkeln 60° mot marken. Vad blir hastighetens x-komposant $v_\\mathrm{x}$? (Ledtråd: $\\cos 60^{\\circ} = 0{,}50$.)',
    choices: [
      '$10\\ \\mathrm{m/s}$',
      '$8{,}7\\ \\mathrm{m/s}$',
      '$5{,}0\\ \\mathrm{m/s}$',
      '$0{,}50\\ \\mathrm{m/s}$',
    ],
    correct: 2,
    why: [
      'Detta är hela utgångshastigheten $v_0$, utan att multiplicera med $\\cos 60^{\\circ}$.',
      'Detta motsvarar $v_0 \\cdot \\sin 60^{\\circ}$ (y-komposanten), inte x-komposanten.',
      '$v_\\mathrm{x} = v_0 \\cdot \\cos \\alpha = 10 \\cdot 0{,}50 = 5{,}0\\ \\mathrm{m/s}$.',
      'Detta är bara värdet på $\\cos 60^{\\circ}$ utan att multiplicera med $v_0$.',
    ],
  },
  {
    question: 'Vad kallas den högsta höjden ett föremål når under en kaströrelse?',
    choices: [
      'Kastvidd',
      'Elevationshöjd',
      'Toppfart',
      'Stighöjd',
    ],
    correct: 3,
    why: [
      'Kastvidd är den horisontella sträckan kastet täcker, inte höjden.',
      '"Elevationshöjd" förekommer inte i genomgången — elevationsvinkeln är istället utkastvinkeln α.',
      '"Toppfart" är inget begrepp som används här — farten är faktiskt som lägst (bara $v_\\mathrm{x}$ kvar) i den högsta punkten.',
      'Den högsta höjden i en kaströrelse kallas stighöjd, $y_{\\max}$.',
    ],
  },
  {
    question: 'Vad kallas den horisontella sträcka en kaströrelse täcker (från utkast till nedslag i samma nivå)?',
    choices: [
      'Kastvidd',
      'Stighöjd',
      'Periodtid',
      'Hävarm',
    ],
    correct: 0,
    why: [
      'Den horisontella sträckan kaströrelsen täcker kallas kastvidd, $x_{\\max}$.',
      'Stighöjd är den maximala höjden, en vertikal storhet — inte den horisontella sträckan.',
      'Periodtid hör till periodiska rörelser som rotation eller svängning, inte till en kaströrelses längd.',
      'Hävarm är ett begrepp från kraftmoment, inte från kaströrelse.',
    ],
  },
  {
    question: 'En boll kastas med farten 20 m/s och landar i samma horisontalplan som den kastades ifrån. Om luftmotstånd försummas, vilken fart har den precis vid nedslaget?',
    choices: [
      '$0\\ \\mathrm{m/s}$, eftersom farten alltid blir noll vid nedslag',
      '$20\\ \\mathrm{m/s}$ — samma fart som vid utkastet',
      'Beror bara på höjden bollen kastades från',
      'Alltid större än utkastfarten, eftersom tyngdkraften ökar farten',
    ],
    correct: 1,
    why: [
      'Farten är inte noll vid nedslag — bollen har både en horisontell och en vertikal hastighetskomposant kvar.',
      'När start och slut sker i samma horisontalplan blir sluthastigheten lika stor som starthastigheten, enligt symmetrin i kastparabeln.',
      'Kastet startar och slutar redan i samma nivå (det är förutsättningen i frågan) — det finns ingen ytterligare höjdskillnad som farten beror på.',
      'Tyngdkraften ändrar bara $v_\\mathrm{y}$, inte $v_\\mathrm{x}$ — den symmetriska banan gör att farten vid nedslag blir exakt densamma som vid utkastet, inte större.',
    ],
  },
],

'fy2-1.7': [
  {
    question: 'Vilka två fysikaliska principer kombineras i räkneexemplet med den fatala gungan?',
    choices: [
      'Kraftmoment och rörelsemängd',
      'Newtons tredje lag och tryck',
      'Cirkulär rörelse (centripetalkraft) och energiprincipen',
      'Vågrörelse och interferens',
    ],
    correct: 2,
    why: [
      'Kraftmoment nämns inte i detta exempel — det handlar om krafter i en cirkelbana, inte om vridning.',
      'Newtons tredje lag och tryck förekommer inte i detta exempel.',
      'Exemplet kombinerar centripetalkraft (cirkulär rörelse) i banans låg- och högpunkt med energiprincipen för att bestämma farten.',
      'Vågrörelse och interferens hör inte till detta mekanik-exempel.',
    ],
  },
  {
    question: 'Vilka krafter verkar på gungsitsen i banans lägsta punkt?',
    choices: [
      'Endast tyngdkraften',
      'Endast normalkraften',
      'Tyngdkraften och friktionskraften',
      'Tyngdkraften nedåt och spännkraften i repet uppåt',
    ],
    correct: 3,
    why: [
      'Om bara tyngdkraften verkade skulle det inte finnas någon resulterande kraft uppåt mot centrum, och gungan skulle inte kunna följa cirkelbanan.',
      'Normalkraft förekommer inte här — gungsitsen hänger i ett rep, den vilar inte mot ett underlag.',
      'Friktion spelar ingen roll i detta idealiserade exempel med en gunga i ett rep.',
      'I lägsta punkten verkar tyngdkraften $F_\\mathrm{G}$ nedåt och spännkraften $F_\\mathrm{S}$ i repet uppåt.',
    ],
  },
  {
    question: 'Varför måste spännkraften $F_\\mathrm{S}$ vara större än tyngdkraften $F_\\mathrm{G}$ i gungans lägsta punkt?',
    choices: [
      'Eftersom centripetalkraften är riktad uppåt mot centrum och är resultanten av $F_\\mathrm{S}$ och $F_\\mathrm{G}$',
      'Eftersom repet alltid väger mer än personen',
      'Eftersom friktionen mot luften drar nedåt',
      'Det stämmer inte — i verkligheten är $F_\\mathrm{S}$ mindre än $F_\\mathrm{G}$ i lägsta punkten',
    ],
    correct: 0,
    why: [
      'Centripetalkraften pekar mot cirkelns centrum (uppåt i lägsta punkten). Eftersom den är resultanten $F_\\mathrm{S} - F_\\mathrm{G}$ måste $F_\\mathrm{S}$ vara större än $F_\\mathrm{G}$ för att ge en nettokraft uppåt.',
      'Repets egen vikt ingår inte i denna idealiserade modell — det är personens massa som avgör krafterna.',
      'Luftmotstånd ingår inte i detta exempel.',
      'Detta är fel — just för att centripetalkraften måste peka mot centrum (uppåt) krävs $F_\\mathrm{S} > F_\\mathrm{G}$, inte tvärtom.',
    ],
  },
  {
    question: 'Hur bestäms hastigheten i gungans lägsta punkt i detta exempel?',
    choices: [
      'Genom att mäta farten direkt med en fartmätare',
      'Med energiprincipen: lägesenergin som tyngdpunkten förlorar omvandlas till rörelseenergi',
      'Med kraftmomentlagen $M_1 = M_2$',
      'Genom att anta att farten är densamma som i högsta punkten',
    ],
    correct: 1,
    why: [
      'Ingen mätning förekommer i räkneexemplet — hastigheten bestäms teoretiskt.',
      'Lägesenergin $E_p = m \\cdot g \\cdot h$ som tyngdpunkten "faller" omvandlas till rörelseenergi $E_k = \\tfrac{1}{2} m v^2$, vilket ger farten i lägsta punkten.',
      'Kraftmomentlagen används inte i detta exempel — den hör till avsnittet om kraftmoment.',
      'Farten är inte densamma i de två lägena — gungan är snabbast i lägsta punkten och (i deluppgift b) långsammast i högsta punkten.',
    ],
  },
  {
    question: 'I gränsfallet i den övre delen av banan, precis när repet ska sluta vara spänt, vad gäller?',
    choices: [
      'Spännkraften är som störst',
      'Farten är noll',
      'Spännkraften är noll och centripetalkraften utgörs enbart av tyngdkraften',
      'Tyngdkraften är noll',
    ],
    correct: 2,
    why: [
      'Precis i gränsfallet blir spännkraften minimal (noll), inte maximal.',
      'Gungan har fortfarande en fart i den övre punkten — det är den fart som krävs för att repet precis inte ska slakna, inte noll.',
      'I gränsfallet är $F_\\mathrm{S} = 0$, så hela centripetalkraften kommer enbart från tyngdkraften: $F_\\mathrm{C} = F_\\mathrm{G}$.',
      'Tyngdkraften är alltid närvarande (den beror bara på massa och $g$) — det är spännkraften som blir noll, inte tyngdkraften.',
    ],
  },
],

'fy2-1.8': [
  {
    question: 'Vad är syftet med räkneexemplet "Den flygande kossan"?',
    choices: [
      'Att mäta ljusets hastighet',
      'Att bestämma massan hos ett föremål',
      'Att mäta luftmotståndets storlek',
      'Att bestämma jordens tyngdacceleration $g$ med hjälp av en konisk pendel',
    ],
    correct: 3,
    why: [
      'Ljusets hastighet mäts inte i detta exempel — det handlar om mekanik, inte optik.',
      'Massan hos kossan/pendelvikten är faktiskt irrelevant — den förkortas bort ur den slutliga formeln.',
      'Luftmotstånd nämns inte alls i detta exempel.',
      'Syftet är att bestämma jordens tyngdacceleration $g$ genom att mäta höjden $h$ och periodtiden $T$ hos en konisk pendel.',
    ],
  },
  {
    question: 'Vilken slutformel härleds för att bestämma $g$ med den koniska pendeln (kossan)?',
    choices: [
      '$g = \\dfrac{4\\pi^2 \\cdot h}{T^2}$',
      '$g = \\dfrac{4\\pi^2 \\cdot h}{T}$',
      '$g = \\dfrac{2\\pi \\cdot h}{T^2}$',
      '$g = \\dfrac{4\\pi^2 \\cdot T^2}{h}$',
    ],
    correct: 0,
    why: [
      'Detta är den korrekt härledda formeln: $g = \\dfrac{4\\pi^2 \\cdot h}{T^2}$.',
      'Nämnaren ska vara $T^2$, inte bara $T$.',
      'Faktorn framför $\\pi$ ska vara $4\\pi^2$, inte $2\\pi$.',
      'Detta har $h$ och $T^2$ ombytta jämfört med den korrekta formeln.',
    ],
  },
  {
    question: 'Vilka storheter behöver man mäta för att bestämma $g$ enligt denna metod?',
    choices: [
      'Massan $m$ och radien $r$',
      'Höjden $h$ och periodtiden $T$',
      'Farten $v$ och kraften $F_\\mathrm{S}$',
      'Vinkeln α och massan $m$',
    ],
    correct: 1,
    why: [
      'Massan $m$ och radien $r$ förkortas bort ur den slutliga formeln — de behöver inte mätas.',
      'Enligt den härledda formeln $g = 4\\pi^2 h / T^2$ räcker det att mäta höjden $h$ under upphängningspunkten och periodtiden $T$ för ett varv.',
      'Varken farten eller spännkraften mäts direkt i denna metod — de förekommer bara i mellansteg av härledningen.',
      'Massan förkortas bort, och vinkeln α behöver inte mätas separat eftersom $h$ och $r$ (via de likformiga trianglarna) ersätter den i uträkningen.',
    ],
  },
  {
    question: 'Varför försvinner massan $m$ och radien $r$ ur den slutliga formeln för $g$?',
    choices: [
      'Eftersom de alltid är noll för en konisk pendel',
      'Eftersom de inte mäts i en laboration',
      'Eftersom de finns med på båda sidor av ekvationen och därför förkortas bort vid härledningen',
      'Eftersom de ingår i definitionen av tyngdaccelerationen $g$',
    ],
    correct: 2,
    why: [
      'Massan och radien är förstås inte noll — kossan har både massa och rör sig i en cirkel med en viss radie.',
      'Att de inte behöver mätas är en konsekvens av härledningen, inte orsaken till att de försvinner.',
      'Både $m$ och $r$ förekommer i uttrycken för $F_\\mathrm{C}$ på båda sidor av likheten och kan därför divideras bort, vilket lämnar bara $h$, $T$ och $g$ kvar.',
      'Tyngdaccelerationen $g$ definieras oberoende av ett visst föremåls massa eller bana — den beror bara på jordens gravitation.',
    ],
  },
  {
    question: 'Om periodtiden $T$ fördubblas (och höjden $h$ hålls konstant), vad händer med det beräknade värdet på $g$ enligt formeln $g = \\dfrac{4\\pi^2 \\cdot h}{T^2}$?',
    choices: [
      'g fördubblas',
      'g förblir oförändrat',
      'g halveras',
      'g blir en fjärdedel så stort',
    ],
    correct: 3,
    why: [
      'g minskar när $T$ ökar (de är omvänt proportionella via $T^2$) — det fördubblas inte.',
      '$g$ beror på $T^2$ i nämnaren, så en ändring av $T$ definitivt påverkar det beräknade värdet.',
      'Eftersom $T$ finns i kvadrat i nämnaren halveras inte $g$ vid en fördubbling av $T$ — effekten blir större än så.',
      'Eftersom $T$ står i nämnaren upphöjt till 2, ger en fördubbling av $T$ att nämnaren fyrdubblas ($2^2 = 4$), så $g$ blir en fjärdedel så stort.',
    ],
  },
],

// ── 13-fy2-ch2a.js ────────────────────────────────────────────

'fy2-2.1': [
  {
    question: 'Vilket samband beskriver Hookes lag för en fjäder?',
    choices: ['$F = m \\cdot a$', '$F = k \\cdot \\Delta l$', '$F = \\frac{k}{\\Delta l}$', '$F = k^{2} \\cdot \\Delta l$'],
    correct: 1,
    why: [
      'Detta är Newtons andra lag — sambandet mellan resulterande kraft, massa och acceleration. Det beskriver inte fjäderkraften.',
      'Hookes lag säger att kraften som belastar (eller verkar från) en fjäder är proportionell mot förlängningen $\\Delta l$, med fjäderkonstanten *k* som proportionalitetskonstant.',
      'Om kraften vore omvänt proportionell mot förlängningen skulle en liten töjning ge en enorm kraft — helt fel jämfört med hur en fjäder beter sig.',
      'Fjäderkonstanten *k* förekommer bara i första potens i Hookes lag, inte kvadrerad.',
    ],
  },
  {
    question: 'Vilken SI-enhet har fjäderkonstanten *k*?',
    choices: ['N/m', 'N', 'J', 'm/N'],
    correct: 0,
    why: [
      'Fjäderkonstanten anger hur många newton som krävs per meters förlängning, så enheten blir N/m. Ju större *k*, desto "hårdare" fjäder.',
      'N är enheten för kraft *F*, men fjäderkonstanten *k* beskriver hur kraften förhåller sig till förlängningen — det krävs alltså newton per meter.',
      'J (joule) är enheten för arbete och energi, inte för fjäderkonstant.',
      'Detta är enheten omvänd. Med den enheten skulle en stor fjäderkonstant innebära att fjädern töjs mycket för en liten kraft — precis tvärtom mot vad en "hård" fjäder gör.',
    ],
  },
  {
    question: 'Vad anger minustecknet i formeln $F_R = -k \\cdot y$ för en vikt som svänger i en fjäder?',
    choices: [
      'Att fjäderkraften bara finns när fjädern är hoptryckt, inte när den är utdragen',
      'Att fjäderkonstanten *k* är ett negativt tal',
      'Att kraften alltid är riktad mot jämviktsläget, motsatt elongationen',
      'Att energiförluster gör att kraften minskar med tiden',
    ],
    correct: 2,
    why: [
      'Fjäderkraften verkar både vid uttöjning och hoptryckning — minustecknet handlar om kraftens riktning, inte om i vilket tillstånd fjädern befinner sig.',
      'Fjäderkonstanten *k* är alltid ett positivt tal — det är kraftens riktning i förhållande till elongationen som är negativ.',
      'Minustecknet visar att $F_\\mathrm{R}$ pekar åt motsatt håll mot elongationen *y* — kraften drar alltid vikten tillbaka mot jämviktsläget, oavsett åt vilket håll den är utdragen.',
      'Formeln $F_R = -k \\cdot y$ gäller för den odämpade, idealiserade svängningen och beskriver ingenting om energiförluster.',
    ],
  },
  {
    question: 'I vilket läge hos en vikt som pendlar i en fjäder är farten som störst?',
    choices: [
      'I vändlägena',
      'Halvvägs mellan vändläge och jämviktsläge',
      'Den är densamma i alla lägen',
      'I jämviktsläget',
    ],
    correct: 3,
    why: [
      'I vändlägena är farten faktiskt 0 — vikten stannar upp ett ögonblick innan den vänder.',
      'Farten ökar successivt hela vägen fram till jämviktsläget, så den är inte som störst på halva vägen.',
      'Farten varierar tydligt under svängningen — den är som störst i jämviktsläget och 0 i vändlägena.',
      'I jämviktsläget är den resulterande kraften 0, så inget bromsar rörelsen där — farten är då som störst.',
    ],
  },
  {
    question: 'En vikt med tyngden 4,0 N hängs i en fjäder som förlängs 0,20 m. Hur stor är fjäderkonstanten?',
    choices: ['0,80 N/m', '20 N/m', '4,2 N/m', '200 N/m'],
    correct: 1,
    why: [
      'Detta fås om man multiplicerar kraft och förlängning istället för att dividera: $k = \\frac{F}{\\Delta l}$, inte $F \\cdot \\Delta l$.',
      'Med Hookes lag $k = \\frac{F}{\\Delta l} = \\frac{4{,}0}{0{,}20} = 20$ N/m.',
      'Detta stämmer inte med divisionen $\\frac{4{,}0}{0{,}20}$ — kontrollera uträkningen igen.',
      'Detta fås om man råkar dividera med 0,020 m istället för 0,20 m — kontrollera decimalplaceringen.',
    ],
  },
  {
    question: 'Vad kallas en odämpad svängning som fortsätter oförändrat mellan samma två vändlägen, utan energiförluster?',
    choices: ['Dämpad svängning', 'Resonanssvängning', 'Longitudinell svängning', 'Harmonisk svängning'],
    correct: 3,
    why: [
      'En dämpad svängning är tvärtom en svängning där amplituden minskar på grund av energiförluster, till exempel som värme.',
      'Resonans handlar om att en svängning förstärks av en yttre kraft med rätt frekvens, inte om att svängningen är odämpad.',
      'Longitudinell beskriver hur en våg utbreder sig (i rörelseriktningen), inte om en svängning är dämpad eller ej.',
      'En harmonisk svängning är en odämpad, periodisk svängning som fortsätter mellan samma vändlägen med oförändrad amplitud.',
    ],
  },
],

'fy2-2.2': [
  {
    question: 'I vilket läge hos en fjädersvängning är den potentiella energin som störst?',
    choices: [
      'I vändlägena',
      'I jämviktsläget',
      'Halvvägs mellan jämviktsläge och vändläge',
      'Den är alltid lika stor, oavsett läge',
    ],
    correct: 0,
    why: [
      'I vändlägena har fjädern töjts (eller tryckts ihop) maximalt, och hela svängningens energi är där lagrad som potentiell energi.',
      'I jämviktsläget är den potentiella energin faktiskt 0 — där är istället rörelseenergin som störst.',
      'Den potentiella energin ökar successivt hela vägen ut till vändläget, så den är inte som störst på halva vägen.',
      'Energin växlar ständigt mellan potentiell energi och rörelseenergi under svängningen — bara den totala energin är konstant.',
    ],
  },
  {
    question: 'Vilken formel ger fjäderns totala mekaniska energi vid en svängning med amplituden *A*?',
    choices: ['$E = k \\cdot A$', '$E = \\frac{k \\cdot A^{2}}{2}$', '$E = \\frac{k \\cdot A}{2}$', '$E = 2 \\cdot k \\cdot A^{2}$'],
    correct: 1,
    why: [
      'Amplituden ska vara kvadrerad i formeln, och resultatet ska halveras — annars stämmer inte enheten joule.',
      'Fjäderns totala energi ges av $E = \\frac{k \\cdot A^{2}}{2}$ — samma form som ytan av triangeln i ett *F*-Δ*l*-diagram.',
      'Amplituden *A* ska vara kvadrerad ($A^2$), inte i första potens — annars stämmer inte uträkningen med areametoden i härledningen.',
      'Här är faktorn 2 placerad fel — den ska stå i nämnaren (division med 2), inte som en multiplikation.',
    ],
  },
  {
    question: 'Vad gäller för energin hos en vikt som svänger i en fjäder när den passerar jämviktsläget?',
    choices: [
      'All energi är potentiell energi',
      'Energin är jämnt fördelad mellan potentiell energi och rörelseenergi',
      'All energi är rörelseenergi',
      'Ingen energi finns i systemet just då',
    ],
    correct: 2,
    why: [
      'Det är precis tvärtom — i jämviktsläget är den potentiella energin 0.',
      'Fördelningen är inte jämn i just detta läge — i jämviktsläget är energin uteslutande rörelseenergi.',
      'I jämviktsläget rör sig vikten som snabbast och fjädern är i sitt naturliga läge (ingen lagrad potentiell energi), så all energi är rörelseenergi.',
      'Den totala mekaniska energin är konstant (om vi bortser från förluster) — den finns kvar, bara i en annan form.',
    ],
  },
  {
    question: 'En fjäder med fjäderkonstanten 10 N/m dras ut 0,20 m. Hur stor är fjäderns totala energi i detta vändläge?',
    choices: ['1,0 J', '2,0 J', '0,020 J', '0,20 J'],
    correct: 3,
    why: [
      'Detta fås om man glömmer att kvadrera amplituden — men $A^2$ måste räknas ut innan multiplikationen med *k*.',
      'Detta fås om man glömmer att dela med 2 i formeln.',
      'Detta fås om man råkar kvadrera 0,020 istället för 0,20 — kontrollera decimalplaceringen på amplituden.',
      'Med $E = \\frac{k \\cdot A^{2}}{2} = \\frac{10 \\cdot 0{,}20^{2}}{2} = 0{,}20$ J stämmer uträkningen.',
    ],
  },
  {
    question: 'Varför motsvarar arbetet att dra ut en fjäder arean av en triangel i ett *F*-Δ*l*-diagram, och inte arean av en rektangel?',
    choices: [
      'Eftersom fjäderkonstanten *k* minskar under uttöjningen',
      'Eftersom arbetet bara beror på hur snabbt man drar i fjädern',
      'Eftersom kraften *F* ökar proportionellt med förlängningen, inte är konstant',
      'Eftersom energiförluster gör grafen krökt',
    ],
    correct: 2,
    why: [
      'Fjäderkonstanten *k* är konstant för en given fjäder — det är just därför grafen blir en rät linje.',
      'Arbetet beror på kraft och sträcka, inte på hur fort man drar — grafens form ändras inte av draghastigheten.',
      'Kraften växer linjärt med förlängningen enligt Hookes lag ($F = k \\cdot \\Delta l$), så grafen blir en rät linje genom origo — arean under den blir en triangel, inte en rektangel (vilket hade krävt konstant kraft).',
      'Grafen $F = k \\cdot \\Delta l$ är en rät linje eftersom vi bortser från energiförluster i denna idealiserade modell.',
    ],
  },
],

'fy2-2.3': [
  {
    question: 'Vad är en harmonisk svängning?',
    choices: [
      'En svängning vars frekvens ökar hela tiden',
      'En svängning som bara förekommer i fjädrar',
      'En svängning där amplituden alltid minskar',
      'En odämpad, periodisk svängning längs en rät linje',
    ],
    correct: 3,
    why: [
      'Frekvensen hos en harmonisk svängning är konstant — den varken ökar eller minskar över tid.',
      'Harmonisk svängning är en allmän rörelsetyp — den beskriver till exempel också projektionen av en cirkulär rörelse, inte bara fjädrar.',
      'En svängning med avtagande amplitud är en dämpad svängning — motsatsen till en harmonisk (odämpad) svängning.',
      'En harmonisk svängning definieras som en odämpad, periodisk svängning längs en rät linje — precis som en idealiserad fjädersvängning utan energiförluster.',
    ],
  },
  {
    question: 'En harmonisk svängning kan beskrivas som...',
    choices: [
      'Projektionen av en cirkulär rörelse på en linje',
      'En slumpmässig rörelse utan mönster',
      'En rörelse med konstant hastighet',
      'En rörelse som bara sker i vertikal riktning',
    ],
    correct: 0,
    why: [
      'Demonstrationen med det snurrande cykelhjulet visar att en harmonisk svängning är detsamma som projektionen av en likformig cirkelrörelse på en rät linje.',
      'En harmonisk svängning är tvärtom mycket regelbunden och förutsägbar, beskriven av en sinusfunktion.',
      'Hastigheten varierar under svängningen — den är som störst i jämviktsläget och 0 i vändlägena, alltså inte konstant.',
      'Harmonisk svängning kan ske längs vilken rät linje som helst, inte bara vertikalt.',
    ],
  },
  {
    question: 'Vilket samband beskriver elongationen *y* som funktion av tiden *t* i en harmonisk svängning?',
    choices: [
      '$y = \\omega \\cdot A \\cdot \\cos(\\omega \\cdot t)$',
      '$y = A \\cdot \\omega \\cdot t$',
      '$y = A \\cdot \\sin(\\omega \\cdot t)$',
      '$y = -\\omega^{2} \\cdot A \\cdot \\sin(\\omega \\cdot t)$',
    ],
    correct: 2,
    why: [
      'Detta uttryck beskriver hastigheten *v*, inte elongationen *y*.',
      'Elongationen varierar inte linjärt med tiden — den följer en sinuskurva, inte en rät linje.',
      'Elongationen (läget) ges av $y = A \\cdot \\sin(\\omega \\cdot t)$ — den varierar sinusformigt mellan $-A$ och $+A$.',
      'Detta uttryck beskriver accelerationen *a*, inte elongationen.',
    ],
  },
  {
    question: 'Vad gäller för hastighet och acceleration i vändlägena hos en harmonisk svängning?',
    choices: [
      'Hastigheten är maximal och accelerationen är 0',
      'Hastigheten är 0 och accelerationen är maximal',
      'Både hastigheten och accelerationen är 0',
      'Både hastigheten och accelerationen är maximala',
    ],
    correct: 1,
    why: [
      'Detta beskriver istället jämviktsläget — där är hastigheten maximal och accelerationen 0.',
      'I vändlägena har rörelsen vänt riktning, så hastigheten är momentant 0, medan den återställande kraften (och därmed accelerationen) är som störst.',
      'Accelerationen är faktiskt som störst i vändlägena, inte 0 — det är där den återställande kraften är som störst.',
      'Hastighet och acceleration är aldrig maximala samtidigt i en harmonisk svängning — de är alltid ur fas med varandra.',
    ],
  },
  {
    question: 'Vilket uttryck ger vinkelhastigheten ω för en vikt som svänger i en fjäder med fjäderkonstant *k* och massa *m*?',
    choices: ['$\\omega = \\sqrt{\\frac{m}{k}}$', '$\\omega = \\frac{k}{m}$', '$\\omega = k \\cdot m$', '$\\omega = \\sqrt{\\frac{k}{m}}$'],
    correct: 3,
    why: [
      'Bråket under rottecknet är omvänt här — det ska vara *k* delat med *m*, inte tvärtom.',
      'Rottecknet saknas — utan det stämmer inte enheten (rad/s).',
      'Detta uttryck saknar både rottecken och division — det stämmer varken dimensionsmässigt eller till formen.',
      'Vinkelhastigheten för en fjäderpendel ges av $\\omega = \\sqrt{\\frac{k}{m}}$ — en styvare fjäder (större *k*) eller en lättare vikt (mindre *m*) ger snabbare svängning.',
    ],
  },
  {
    question: 'En svängning beskrivs av $y = 0{,}15 \\sin(10t)$ (SI-enheter). Vad är amplituden?',
    choices: ['0,15 m', '10 m', '1,5 m', '10 cm'],
    correct: 0,
    why: [
      'Jämförelse med $y = A \\cdot \\sin(\\omega \\cdot t)$ visar direkt att amplituden är talet framför sinusfunktionen: $A = 0{,}15$ m.',
      '10 är vinkelhastigheten ω i enheten rad/s, inte amplituden.',
      '1,5 m/s är den maximala farten $v_{\\max} = \\omega \\cdot A$, inte amplituden.',
      'Amplituden är 0,15 m, vilket motsvarar 15 cm — inte 10 cm.',
    ],
  },
],

'fy2-2.4': [
  {
    question: 'Vad påverkar periodtiden för en vikt som svänger i en fjäder?',
    choices: [
      'Enbart massan och fjäderkonstanten',
      'Enbart svängningens amplitud',
      'Massan, fjäderkonstanten och amplituden',
      'Enbart fjäderkonstanten',
    ],
    correct: 0,
    why: [
      'Periodtiden $T = 2\\pi \\sqrt{\\frac{m}{k}}$ beror enbart på massan *m* och fjäderkonstanten *k* — inte på hur långt fjädern dras ut.',
      'Amplituden påverkar inte periodtiden alls — en svängning med stor eller liten amplitud tar lika lång tid.',
      'Amplituden ingår faktiskt inte i formeln $T = 2\\pi \\sqrt{\\frac{m}{k}}$ — bara massan och fjäderkonstanten.',
      'Massan *m* måste också vara med i formeln, inte bara fjäderkonstanten *k*.',
    ],
  },
  {
    question: 'Vilken formel ger periodtiden *T* för en vikt med massan *m* som hänger i en fjäder med fjäderkonstant *k*?',
    choices: ['$T = 2\\pi \\sqrt{\\frac{k}{m}}$', '$T = \\frac{1}{2\\pi} \\sqrt{\\frac{m}{k}}$', '$T = 2\\pi \\cdot \\frac{m}{k}$', '$T = 2\\pi \\sqrt{\\frac{m}{k}}$'],
    correct: 3,
    why: [
      'Bråket under rottecknet är omvänt — det ska vara massa delat med fjäderkonstant, inte tvärtom.',
      'Faktorn $2\\pi$ ska multipliceras, inte divideras.',
      'Rottecknet saknas i detta uttryck.',
      'Periodtiden ges av $T = 2\\pi \\sqrt{\\frac{m}{k}}$ — en tyngre vikt ger längre period, en styvare fjäder (större *k*) ger kortare period.',
    ],
  },
  {
    question: 'Om man dubblerar fjäderkonstanten *k* och behåller samma massa, vad händer med periodtiden?',
    choices: [
      'Den blir dubbelt så lång',
      'Den blir oförändrad',
      'Den blir kortare, men inte hälften så lång',
      'Den blir exakt hälften så lång',
    ],
    correct: 2,
    why: [
      'En större fjäderkonstant ger snabbare svängning (kortare period), inte längre — kontrollera att du inte blandat ihop *k* och *m*.',
      'Fjäderkonstanten *k* står under rottecknet i formeln, så en ändring av *k* påverkar visst periodtiden.',
      'Eftersom *k* står under ett rottecken blir den nya perioden $T_2 = T_1 / \\sqrt{2} \\approx 0{,}71 \\cdot T_1$ — kortare, men inte precis hälften.',
      'Perioden minskar med en faktor $\\sqrt{2}$, inte med en faktor 2 — det är lätt att glömma att *k* står under ett rottecken.',
    ],
  },
  {
    question: 'En vikt med massan 0,50 kg hänger i en fjäder med fjäderkonstanten 2,0 N/m. Hur stor är periodtiden ungefär? (Använd $\\pi \\approx 3{,}14$.)',
    choices: ['0,25 s', '3,1 s', '1,0 s', '6,3 s'],
    correct: 1,
    why: [
      'Detta är kvoten $m/k = 0{,}25$ under rottecknet — men glöm inte att ta roten ur och sedan multiplicera med $2\\pi$.',
      'Med $T = 2\\pi \\sqrt{\\frac{0{,}50}{2{,}0}} = 2\\pi \\sqrt{0{,}25} = 2\\pi \\cdot 0{,}50 \\approx 3{,}1$ s stämmer uträkningen.',
      'Detta är roten ur $m/k$ ($\\sqrt{0{,}25} = 0{,}50$), men faktorn $2\\pi$ saknas i uträkningen.',
      'Detta är dubbelt så stort som rätt svar — kontrollera om du råkat multiplicera med $4\\pi$ istället för $2\\pi$.',
    ],
  },
  {
    question: 'Vad kan man göra för att ändra svängningstiden hos en vikt som hänger i en given fjäder?',
    choices: [
      'Ändra massan som hänger i fjädern',
      'Ändra amplituden på svängningen',
      'Dra ut fjädern längre innan man släpper den',
      'Flytta fjädern till en plats med annan tyngdacceleration',
    ],
    correct: 0,
    why: [
      'Eftersom $T = 2\\pi \\sqrt{\\frac{m}{k}}$ beror periodtiden på massan — genom att hänga en annan vikt i samma fjäder ändras svängningstiden.',
      'Amplituden påverkar inte periodtiden i en (idealisk) fjädersvängning.',
      'Hur långt man drar ut fjädern bestämmer bara amplituden, inte periodtiden.',
      'Tyngdaccelerationen *g* påverkar periodtiden för en pendel, men den förekommer inte alls i formeln för en fjädersvängning.',
    ],
  },
],

'fy2-2.5': [
  {
    question: 'Vad påverkar periodtiden för en matematisk pendel vid små utslag?',
    choices: [
      'Pendellängden och massan hos pendelkulan',
      'Enbart massan hos pendelkulan',
      'Pendellängden och utslagsvinkeln',
      'Enbart pendellängden och tyngdaccelerationen',
    ],
    correct: 3,
    why: [
      'Massan påverkar inte periodtiden alls — en tung och en lätt pendelkula med samma längd svänger lika snabbt.',
      'Massan förekommer inte i formeln för periodtiden — den tar ut sig i härledningen, och pendellängden måste också vara med.',
      'Vid små utslag är periodtiden oberoende av utslagsvinkeln — det är en förutsättning för att formeln ska gälla.',
      'Enligt $T = 2\\pi \\sqrt{\\frac{l}{g}}$ beror periodtiden bara på pendellängden *l* och tyngdaccelerationen *g* — inte på massan.',
    ],
  },
  {
    question: 'Vilken formel ger periodtiden för en matematisk pendel vid små utslag?',
    choices: ['$T = 2\\pi \\sqrt{\\frac{l}{g}}$', '$T = 2\\pi \\sqrt{\\frac{g}{l}}$', '$T = 2\\pi \\cdot \\frac{l}{g}$', '$T = \\frac{2\\pi}{\\sqrt{l \\cdot g}}$'],
    correct: 0,
    why: [
      'Periodtiden för en matematisk pendel vid små utslag ges av $T = 2\\pi \\sqrt{\\frac{l}{g}}$.',
      'Bråket under rottecknet är omvänt — pendellängden ska stå i täljaren, tyngdaccelerationen i nämnaren.',
      'Rottecknet saknas i detta uttryck.',
      'I detta uttryck står *l* och *g* som en produkt under rottecknet, i nämnaren — det stämmer inte med den korrekta formeln.',
    ],
  },
  {
    question: 'Var mäts pendellängden *l* ifrån och till?',
    choices: [
      'Från golvet till pendelkulans underkant',
      'Från fästpunkten till snörets mitt',
      'Från fästpunkten till pendelkulans tyngdpunkt',
      'Från pendelns vändläge till dess jämviktsläge',
    ],
    correct: 2,
    why: [
      'Golvet har ingenting med pendelns upphängning att göra — längden mäts från fästpunkten.',
      'Det är hela längden till kulans tyngdpunkt som räknas, inte bara till snörets mittpunkt.',
      'Pendellängden räknas från fästpunkten (upphängningen) till den pendlande kroppens tyngdpunkt.',
      'Det beskriver istället svängningens amplitud (utslag), inte pendelns längd.',
    ],
  },
  {
    question: 'Varför gäller formeln $T = 2\\pi \\sqrt{\\frac{l}{g}}$ bara för små utslagsvinklar?',
    choices: [
      'Eftersom snörets massa blir för stor vid stora vinklar',
      'Eftersom den återförande kraften bara är proportionell mot utslaget vid små vinklar, annars upphör rörelsen att vara harmonisk',
      'Eftersom tyngdaccelerationen *g* ändras vid stora vinklar',
      'Eftersom pendelns massa ökar vid stora vinklar',
    ],
    correct: 1,
    why: [
      'Snörets massa antas vara försumbar oavsett vinkel — det är ett separat villkor, inte kopplat till vinkelns storlek.',
      'Härledningen bygger på att sträckan *d* nästan är lika lång som bågen *y*, vilket bara stämmer vid små vinklar. Vid större vinklar slutar den återförande kraften vara proportionell mot utslaget, och svängningen är inte längre harmonisk.',
      'Tyngdaccelerationen *g* är konstant och beror inte på pendelns utslagsvinkel.',
      'Massan hos pendeln ändras inte av utslagsvinkeln.',
    ],
  },
  {
    question: 'En pendel har längden 2,45 m. Ungefär hur lång är periodtiden? (Använd $g = 9{,}82$ m/s² och $\\pi \\approx 3{,}14$.)',
    choices: ['0,50 s', '1,6 s', '3,1 s', '6,3 s'],
    correct: 2,
    why: [
      'Detta är resultatet av $\\sqrt{l/g}$ ($\\sqrt{0{,}25} = 0{,}50$), men faktorn $2\\pi$ saknas.',
      'Detta stämmer inte med uträkningen — kontrollera att du tagit roten ur $l/g$ innan du multiplicerar med $2\\pi$.',
      'Med $T = 2\\pi \\sqrt{\\frac{2{,}45}{9{,}82}} = 2\\pi \\sqrt{0{,}25} = 2\\pi \\cdot 0{,}50 \\approx 3{,}1$ s stämmer uträkningen.',
      'Detta är dubbelt så stort som rätt svar — kontrollera om du råkat multiplicera med $4\\pi$ istället för $2\\pi$.',
    ],
  },
],

'fy2-2.6': [
  {
    question: 'Vad kallas frekvensen hos ett systems fria svängning?',
    choices: ['Resonansfrekvens', 'Övertonsfrekvens', 'Egenfrekvens', 'Störningsfrekvens'],
    correct: 2,
    why: [
      'Resonans är ett fenomen som uppstår när något svänger med samma frekvens som egenfrekvensen — det är inte själva namnet på egenfrekvensen.',
      'Övertoner är ett annat begrepp, inte samma sak som egenfrekvensen för en fri svängning.',
      'Ett systems fria svängning (utan yttre påverkan) sker med dess egenfrekvens.',
      'Detta är inget vedertaget begrepp i sammanhanget.',
    ],
  },
  {
    question: 'Vad kallas det när ett system svänger med en frekvens som ges av en yttre periodisk kraft?',
    choices: ['Tvungen svängning', 'Fri svängning', 'Resonanssvängning', 'Harmonisk svängning'],
    correct: 0,
    why: [
      'När en yttre periodisk kraft tvingar systemet att svänga med en viss frekvens kallas det en tvungen svängning — exempelvis membranet i en högtalare.',
      'En fri svängning sker istället utan någon yttre kraft, med systemets egenfrekvens.',
      'Resonans är ett specialfall som uppstår när den tvingande frekvensen råkar matcha egenfrekvensen — det är inte namnet på svängningstypen i sig.',
      'Harmonisk svängning beskriver rörelsens form (sinusformig), inte om den drivs av en yttre kraft eller inte.',
    ],
  },
  {
    question: 'Vilket samband gäller mellan egenfrekvensen *f* och periodtiden *T*?',
    choices: ['$f = T$', '$f = \\frac{1}{T}$', '$f = 2T$', '$f = T^{2}$'],
    correct: 1,
    why: [
      'Frekvens och period är inte samma tal — de är varandras inverser.',
      'Frekvensen är antalet svängningar per sekund, vilket är inversen av periodtiden: $f = \\frac{1}{T}$.',
      'Detta samband stämmer inte dimensionsmässigt — frekvens och period är inverser av varandra, ingen faktor 2 är inblandad.',
      'Att kvadrera periodtiden ger inte frekvensen — sambandet är en enkel invers, $f = 1/T$.',
    ],
  },
  {
    question: 'Vad kallas förstärkningen av en svängnings amplitud som sker när energi tillförs vid rätt tidpunkt med samma frekvens som egenfrekvensen?',
    choices: ['Interferens', 'Dämpning', 'Övertoner', 'Resonans'],
    correct: 3,
    why: [
      'Interferens är ett annat vågfenomen — när två eller flera vågor möts och samverkar — inte kopplat till att en enskild svängning förstärks vid rätt frekvens.',
      'Dämpning är motsatsen — en process där amplituden minskar på grund av energiförluster.',
      'Övertoner handlar om ytterligare svängningsmönster med högre frekvenser, inte om förstärkning vid egenfrekvensen.',
      'Resonans uppstår när energi tillförs i takt med systemets egenfrekvens, vilket gör att amplituden växer mer och mer — klassiska exempel är en gunga som puttas i rätt takt, eller Tacoma-bron 1940.',
    ],
  },
],

'fy2-2.7': [
  {
    question: 'Vad kallas en enstaka svängning i ett medium?',
    choices: ['En våg', 'En period', 'En puls', 'En amplitud'],
    correct: 2,
    why: [
      'En våg uppstår när flera pulser skickas iväg efter varandra med en viss frekvens — en enda svängning kallas puls.',
      'Perioden är ett tidsmått (tiden för en hel svängning), inte namnet på en enstaka svängning.',
      'En enstaka svängning i ett medium kallas en puls.',
      'Amplituden är svängningens maximala utslag, inte namnet på en enstaka svängning i sig.',
    ],
  },
  {
    question: 'Vilket påstående beskriver skillnaden mellan en transversell och en longitudinell våg korrekt?',
    choices: [
      'I en transversell våg rör sig mediet vinkelrätt mot utbredningsriktningen; i en longitudinell våg rör sig mediet i samma riktning som utbredningen',
      'I en transversell våg transporteras materia med vågen; i en longitudinell våg transporteras bara energi',
      'Transversella vågor kan bara uppstå i vatten, longitudinella bara i luft',
      'Skillnaden är bara att longitudinella vågor är snabbare',
    ],
    correct: 0,
    why: [
      'Det är precis skillnaden: i en transversell våg (till exempel i en sträng) rör sig varje del av mediet vinkelrätt mot vågens utbredningsriktning, medan mediet i en longitudinell våg (till exempel ljud) rör sig fram och tillbaka i samma riktning som vågen utbreder sig, som omväxlande förtätningar och förtunningar.',
      'Ingen av vågtyperna transporterar materia i utbredningsriktningen — båda transporterar bara energi.',
      'Båda vågtyperna kan uppstå i flera olika medier — ljudvågor (longitudinella) är vanligast i luft, men transversella vågor finns bland annat i strängar och fasta material.',
      'Hastigheten beror på mediet och de aktuella fysikaliska förhållandena — det är ingen generell regel att longitudinella vågor alltid är snabbare.',
    ],
  },
  {
    question: 'Vad kallas avståndet mellan två på varandra följande vågtoppar (vågberg)?',
    choices: ['Amplitud', 'Frekvens', 'Fas', 'Våglängd'],
    correct: 3,
    why: [
      'Amplituden är svängningens maximala utslag från jämviktsläget, inte avståndet mellan två vågtoppar.',
      'Frekvensen anger antalet svängningar per sekund (Hz), inte ett avstånd.',
      'Fas beskriver var i svängningscykeln en punkt befinner sig (till exempel om två punkter svänger i fas eller motfas), inte ett avstånd.',
      'Våglängden, betecknad λ, är avståndet från ett maximum (vågberg) till nästa och har SI-enheten meter.',
    ],
  },
  {
    question: 'Vad transporterar en våg, om inte materia?',
    choices: ['Ingenting alls', 'Energi', 'Massa', 'Endast information, ingen fysikalisk storhet'],
    correct: 1,
    why: [
      'En våg transporterar visst något — det är energi som förs med vågen, även om materien inte förflyttas.',
      'En våg medför ingen förflyttning av materia i utbredningsriktningen, men den transporterar energi — till exempel ljudenergi eller strålningsenergi.',
      'Massa förflyttas inte med en våg — det som transporteras är energi.',
      'Energitransporten är en fysikalisk storhet, inte bara abstrakt information.',
    ],
  },
  {
    question: 'Vilket samband ger vågens utbredningshastighet *v*?',
    choices: ['$v = \\lambda \\cdot T$', '$v = \\frac{f}{\\lambda}$', '$v = f \\cdot \\lambda$', '$v = \\frac{T}{\\lambda}$'],
    correct: 2,
    why: [
      'Här är sambandet mellan våglängd och period felvänt — det ska vara en kvot, $\\lambda / T$, inte en produkt.',
      'Detta uttryck blandar ihop frekvens och våglängd på fel sätt — det korrekta sambandet är en produkt, $f \\cdot \\lambda$, inte en kvot.',
      'Utbredningshastigheten ges av $v = \\frac{\\lambda}{T} = f \\cdot \\lambda$ — eftersom $T = 1/f$ blir de två formerna av samma samband.',
      'Bråket är omvänt — det ska vara våglängden delat med periodtiden, $\\lambda / T$, inte tvärtom.',
    ],
  },
  {
    question: 'En våg har frekvensen 5,0 Hz och våglängden 2,0 m. Hur stor är utbredningshastigheten?',
    choices: ['2,5 m/s', '0,40 m/s', '7,0 m/s', '10 m/s'],
    correct: 3,
    why: [
      'Detta fås om man dividerar frekvensen med våglängden istället för att multiplicera dem.',
      'Detta fås om man dividerar våglängden med frekvensen istället för att multiplicera dem.',
      'Detta fås om man adderar frekvens och våglängd istället för att multiplicera dem.',
      'Med $v = f \\cdot \\lambda = 5{,}0 \\cdot 2{,}0 = 10$ m/s stämmer uträkningen.',
    ],
  },
],

// ── 14-fy2-ch2b.js ────────────────────────────────────────────

'fy2-2.8': [
  {
    question: 'Vad händer med ett vågberg som reflekteras mot en fast ände?',
    choices: ['Det studsar tillbaka som en vågdal (vågen vänds upp och ner).', 'Det studsar tillbaka som ett vågberg, oförändrat.', 'Det transmitteras helt och reflekteras inte alls.', 'Amplituden fördubblas vid reflexionen.'],
    correct: 0,
    why: [
      'Vid en fast ände tvingas den punkten att stå still, vilket gör att det inkommande vågberget vänds upp och ner och kommer tillbaka som en vågdal.',
      'Det är vid en lös ände som ett vågberg kommer tillbaka som ett vågberg — vid en fast ände vänds vågen istället upp och ner till en vågdal.',
      'En puls som möter en fast ände reflekteras (studsar tillbaka); den transmitteras inte vidare eftersom änden inte kan röra sig.',
      'Reflexion mot en fast ände ändrar vågens riktning (upp/ner), inte dess amplitud.',
    ],
  },
  {
    question: 'Vad händer med ett vågberg som reflekteras mot en lös ände?',
    choices: ['Det studsar tillbaka som en vågdal.', 'Det studsar tillbaka som ett vågberg, rättvänt.', 'Det absorberas helt av änden.', 'Vågens våglängd halveras vid reflexionen.'],
    correct: 1,
    why: [
      'Att vågberget blir en vågdal sker vid en fast ände, inte vid en lös ände.',
      'Vid en lös ände kan änden röra sig fritt, så vågberget kommer tillbaka rättvänt som ett vågberg.',
      'Vågen reflekteras vid den lösa änden istället för att försvinna.',
      'Reflexionen ändrar inte våglängden, bara vågens riktning (upp/ner).',
    ],
  },
  {
    question: 'En puls i ett tätare medium (t.ex. en tung fjäder) möter ett tunnare medium (en lätt fjäder). Vad gäller för den transmitterade respektive reflekterade pulsen?',
    choices: ['Transmitteras förkortad, reflekteras omvänd.', 'Transmitteras oförändrad, ingen reflexion sker.', 'Transmitteras förlängd, reflekteras rättvänd.', 'Transmitteras förlängd, reflekteras omvänd.'],
    correct: 2,
    why: [
      'Det är tvärtom: från tätare till tunnare medium blir den transmitterade pulsen förlängd — förkortad transmission gäller istället vid övergång från tunnare till tätare medium.',
      'Både transmission och reflexion sker samtidigt när en puls möter ett medium med annan täthet.',
      'Från ett tätare till ett tunnare medium transmitteras pulsen förlängd, och den reflekterade delen kommer tillbaka rättvänd.',
      'Den reflekterade pulsen blir rättvänd i detta fall — omvänd reflexion sker istället vid övergång från tunnare till tätare medium.',
    ],
  },
  {
    question: 'Två pulser på ett snöre möts. I en viss punkt har den ena pulsen elongationen $3{,}0\\ \\mathrm{cm}$ och den andra $-2{,}0\\ \\mathrm{cm}$ samtidigt. Vad blir resulterande elongationen enligt superpositionsprincipen?',
    choices: ['$5{,}0\\ \\mathrm{cm}$', '$-5{,}0\\ \\mathrm{cm}$', '$6{,}0\\ \\mathrm{cm}$', '$1{,}0\\ \\mathrm{cm}$'],
    correct: 3,
    why: [
      'Det vore resultatet om båda elongationerna hade samma tecken; här är den ena negativ.',
      'Det vore resultatet om man tog skillnaden med fel tecken — superpositionsprincipen adderar elongationerna direkt, med sina tecken.',
      'Det värdet motsvarar en multiplikation av talen, inte den summa som superpositionsprincipen beskriver.',
      'Superpositionsprincipen säger att resulterande elongationen är summan av de enskilda elongationerna: $3{,}0 + (-2{,}0) = 1{,}0\\ \\mathrm{cm}$.',
    ],
  },
  {
    question: 'Hur fungerar aktiv brusreducering i hörlurar?',
    choices: ['En mikrofon fångar det omgivande ljudet och hörluren sänder ut en omvänd våg som via superposition släcker ut ljudet.', 'Hörlurarna filtrerar bort alla höga frekvenser mekaniskt med ett fysiskt filter.', 'Hörlurarna förstärker allt inkommande ljud så att man inte längre uppfattar bakgrundsljudet som störande.', 'Hörlurarna sänder ut exakt samma ljudvåg som omgivningen, fast med lägre amplitud.'],
    correct: 0,
    why: [
      'Den elektroniska kretsen skapar en våg som är omvänd jämfört med det inkommande ljudet; summan av vågorna blir enligt superpositionsprincipen noll, vilket uppfattas som tystnad.',
      'Brusreducering sker elektroniskt genom superposition av vågor, inte med ett fysiskt mekaniskt filter.',
      'Att förstärka ljudet skulle göra det ännu mer hörbart, inte tystare.',
      'En lägre amplitud av samma våg skulle bara göra ljudet svagare, inte släcka ut det — det är den omvända vågen (motfas) som krävs för att elongationerna ska ta ut varandra.',
    ],
  },
],

'fy2-2.9': [
  {
    question: 'Vad kallas de punkter i en stående våg som alltid befinner sig i sina nollägen, med amplituden 0?',
    choices: ['Bukar', 'Noder', 'Vågfronter', 'Källpunkter'],
    correct: 1,
    why: [
      'Bukar är istället punkterna med maximal amplitud, mitt emellan noderna.',
      'Noder är punkter som inte rör sig alls — amplituden är där noll.',
      'Vågfronter är ett begrepp för t.ex. vattenvågor, inte för stillastående punkter på en sträng.',
      'Källpunkter beskriver inte fenomenet — de fasta punkterna i en stående våg kallas noder.',
    ],
  },
  {
    question: 'Vad gäller om energitransport i en stående våg?',
    choices: ['Energin transporteras jämnt längs hela strängen, precis som i en vanlig löpande våg.', 'Energin transporteras enbart mot noderna, där den försvinner.', 'Ingen energi transporteras i mediet — den koncentreras istället till bukarna.', 'Energin transporteras enbart i den ursprungliga vågens riktning, aldrig tillbaka.'],
    correct: 2,
    why: [
      'I en stående våg transporteras energin inte alls längs strängen — det skiljer den just från en vanlig löpande våg.',
      'Noderna har amplitud noll och saknar rörelse; energin koncentreras istället till bukarna, inte till noderna.',
      'I stående vågor transporteras ingen energi i mediet — den koncentreras till bukarna, där amplituden och rörelsen är som störst.',
      'En stående våg uppstår av två vågor som går i motsatta riktningar samtidigt, så det finns ingen entydig transportriktning för energin.',
    ],
  },
  {
    question: 'Vilket samband gäller mellan avståndet mellan två närliggande noder och våglängden λ i en stående våg på en sträng?',
    choices: ['Avståndet är en hel våglängd λ.', 'Avståndet är en fjärdedels våglängd λ/4.', 'Avståndet beror på strängens spänning och kan inte anges i λ.', 'Avståndet är en halv våglängd λ/2.'],
    correct: 3,
    why: [
      'En hel våglängd är avståndet mellan två noder som ligger två steg ifrån varandra (buk-nod-buk-nod-buk), inte mellan två närliggande noder.',
      'En fjärdedels våglängd är avståndet mellan en nod och en närliggande buk, inte mellan två noder.',
      'Sambandet λ/2 gäller oavsett spänning — spänningen påverkar istället vågens hastighet och därmed vilken frekvens som ger en viss våglängd.',
      'Både mellan två närliggande noder och mellan två närliggande bukar är avståndet alltid en halv våglängd, λ/2.',
    ],
  },
  {
    question: 'Ett snöre svänger med tre bukar (andra övertonen). Vilket samband gäller mellan snörets längd $l$ och våglängden λ?',
    choices: ['$l = \\frac{3\\lambda}{2}$', '$l = \\frac{\\lambda}{2}$', '$l = \\lambda$', '$l = 2\\lambda$'],
    correct: 0,
    why: [
      'Tre bukar innebär tre halva våglängder längs snöret: $l = 3 \\cdot \\frac{\\lambda}{2} = \\frac{3\\lambda}{2}$.',
      'Det sambandet gäller för grundtonen med en enda buk, inte för tre bukar.',
      'Det sambandet gäller för första övertonen med två bukar, inte för tre bukar.',
      'Snörets längd motsvarar bara tre halva våglängder, inte två hela — det skulle kräva fyra bukar.',
    ],
  },
  {
    question: 'Ett snöre svänger i grundtonen (en buk) med våglängden $2{,}0\\ \\mathrm{m}$ och frekvensen $10\\ \\mathrm{Hz}$. Vad är vågens utbredningshastighet?',
    choices: ['$5{,}0\\ \\mathrm{m/s}$', '$20\\ \\mathrm{m/s}$', '$0{,}20\\ \\mathrm{m/s}$', '$12\\ \\mathrm{m/s}$'],
    correct: 1,
    why: [
      'Det fås om man delar frekvensen med våglängden istället för att multiplicera dem enligt $v = f \\cdot \\lambda$.',
      'Enligt $v = f \\cdot \\lambda$ blir $v = 10 \\cdot 2{,}0 = 20\\ \\mathrm{m/s}$.',
      'Det fås om man förväxlar formeln och delar våglängden med frekvensen på fel sätt.',
      'Det stämmer inte med formeln $v = f \\cdot \\lambda$ — det ser ut som en summa (10 + 2,0) istället för en produkt.',
    ],
  },
],

'fy2-2.10': [
  {
    question: 'Vilken typ av vågrörelse är ljud?',
    choices: ['Transversell', 'Elektromagnetisk', 'Longitudinell', 'Stående'],
    correct: 2,
    why: [
      'Ljud är longitudinellt — partiklarna svänger i vågens utbredningsriktning, inte vinkelrätt mot den som i en transversell våg.',
      'Elektromagnetiska vågor (som ljus) behöver inget medium och skiljer sig från ljud, som är en mekanisk vågrörelse i ett material.',
      'Ljud uppstår av täthetsvariationer i ett material, och partiklarna rör sig fram och tillbaka i samma riktning som vågen — det definierar en longitudinell våg.',
      'Stående våg beskriver en resulterande vågbild av två motriktade vågor, inte ljudets grundläggande karaktär.',
    ],
  },
  {
    question: 'Ungefär vilken hastighet har ljud i luft?',
    choices: ['$34\\ \\mathrm{m/s}$', '$3\\,400\\ \\mathrm{m/s}$', '$300\\,000\\,000\\ \\mathrm{m/s}$', '$340\\ \\mathrm{m/s}$'],
    correct: 3,
    why: [
      'Det är en tiopotens för lågt — ljudets hastighet i luft är ungefär tio gånger detta.',
      'Det är en tiopotens för högt för luft, även om det kan stämma bättre för hastigheten i vissa fasta material.',
      'Det är ljusets hastighet i vakuum, en helt annan storhet än ljudets hastighet.',
      'Ljudets hastighet i luft är ungefär $340\\ \\mathrm{m/s}$, vilket motsvarar ungefär 1 kilometer på 3 sekunder.',
    ],
  },
  {
    question: 'Vilket av följande stämmer om ljudets hastighet i olika material?',
    choices: ['$v_\\text{fast} > v_\\text{vätska} > v_\\text{gas}$', '$v_\\text{gas} > v_\\text{vätska} > v_\\text{fast}$', '$v_\\text{fast} > v_\\text{gas} > v_\\text{vätska}$', 'Ljudhastigheten är samma i alla material så länge temperaturen är densamma.'],
    correct: 0,
    why: [
      'Ju tätare kopplade partiklarna är, desto snabbare fortplantas ljudet — därför är hastigheten störst i fasta ämnen och minst i gaser.',
      'Det är tvärtom — fasta ämnen leder ljud snabbast, inte gaser.',
      'Vätskor leder ljud snabbare än gaser, så en ordning med gas före vätska stämmer inte.',
      'Materialet spelar stor roll: ju tätare koppling mellan partiklarna, desto snabbare ljud — det är därför man hör tåget tidigare genom rälsen än genom luften.',
    ],
  },
  {
    question: 'Var uppstår bukar respektive noder i en pipa?',
    choices: ['Noder vid öppna ändar, bukar vid slutna ändar.', 'Bukar vid öppna ändar, noder vid slutna ändar.', 'Bukar både vid öppna och slutna ändar.', 'Noder både vid öppna och slutna ändar.'],
    correct: 1,
    why: [
      'Det är tvärtom: vid en öppen ände kan luften svänga maximalt fritt (buk), medan den inte kan svänga alls vid en sluten ände (nod).',
      'Vid en öppen ände kan luften röra sig fritt, vilket ger maximal amplitud (buk); vid en sluten ände kan luften inte svänga, vilket ger amplitud noll (nod).',
      'Bukar uppstår bara vid öppna ändar — vid slutna ändar är luften tvingad att stå still, vilket ger noder istället.',
      'Noder uppstår bara vid slutna ändar — vid öppna ändar kan luften svänga fritt, vilket ger bukar istället.',
    ],
  },
  {
    question: 'I en öppen pipa (båda ändar öppna) med grundtonen, vilket samband gäller mellan pipans längd $l$ och våglängden λ?',
    choices: ['$l = \\frac{\\lambda}{4}$', '$l = \\lambda$', '$l = \\frac{\\lambda}{2}$', '$l = 2\\lambda$'],
    correct: 2,
    why: [
      'Det sambandet gäller för grundtonen i en halvöppen pipa, inte i en öppen pipa.',
      'Det sambandet gäller för första övertonen (två bukar) i en öppen pipa, inte för grundtonen.',
      'En öppen pipas grundton har en buk i varje ände och en nod i mitten, vilket motsvarar en halv våglängd över pipans längd: $l = \\frac{\\lambda}{2}$.',
      'Pipans längd i grundtonen är kortare än en hel våglängd — det skulle kräva fler bukar för en så lång pipa i förhållande till λ.',
    ],
  },
  {
    question: 'En halvöppen pipa har längden $0{,}50\\ \\mathrm{m}$ och svänger i grundtonen ($n=1$). Formeln är $l = \\frac{(2n-1)\\cdot\\lambda}{4}$. Vad är våglängden?',
    choices: ['$0{,}50\\ \\mathrm{m}$', '$0{,}25\\ \\mathrm{m}$', '$1{,}0\\ \\mathrm{m}$', '$2{,}0\\ \\mathrm{m}$'],
    correct: 3,
    why: [
      'Det är pipans längd, inte den sökta våglängden.',
      'Det fås om man förväxlar $l$ och λ direkt utan att lösa ut λ ur formeln.',
      'Det stämmer inte med insättningen — det motsvarar att man glömt faktorn 4 i nämnaren.',
      'Med $n=1$ blir $l = \\frac{\\lambda}{4}$, så $\\lambda = 4 \\cdot l = 4 \\cdot 0{,}50 = 2{,}0\\ \\mathrm{m}$.',
    ],
  },
],

'fy2-2.11': [
  {
    question: 'Vilken SI-enhet har ljudintensitet $I$?',
    choices: ['$\\mathrm{W/m^{2}}$', 'dB', 'W', 'Hz'],
    correct: 0,
    why: [
      'Ljudintensitet definieras som effekt per area, vilket ger enheten watt per kvadratmeter, $\\mathrm{W/m^{2}}$.',
      'Decibel (dB) är enheten för ljudnivå $L$, en annan (logaritmisk) storhet som beräknas utifrån intensiteten.',
      'Watt (W) är enheten för effekt $P$, en av storheterna i formeln för intensitet, men inte intensiteten själv.',
      'Hertz (Hz) är enheten för frekvens, en helt annan storhet än ljudintensitet.',
    ],
  },
  {
    question: 'Vilket samband gäller för ljudintensiteten från en punktformig ljudkälla med effekten $P$ på avståndet $r$?',
    choices: ['$I = P \\cdot 4\\pi \\cdot r^{2}$', '$I = \\frac{P}{4\\pi \\cdot r^{2}}$', '$I = \\frac{4\\pi \\cdot r^{2}}{P}$', '$I = \\frac{P}{2\\pi \\cdot r}$'],
    correct: 1,
    why: [
      'Att multiplicera med arean skulle ge en orimligt stor intensitet på stort avstånd; intensiteten ska istället minska med avståndet.',
      'Ljudet sprids jämnt över en klotyta med arean $4\\pi \\cdot r^{2}$, så intensiteten fås genom att dela effekten med denna area.',
      'Det är effekten som ska delas med arean, inte tvärtom.',
      'Arean hos en sfär är $4\\pi \\cdot r^{2}$, inte $2\\pi \\cdot r$ — den formeln saknar rätt geometri för en punktkälla som strålar åt alla håll.',
    ],
  },
  {
    question: 'Vilket samband definierar ljudnivån $L$ i decibel?',
    choices: ['$L = 10 \\cdot \\lg\\!\\left(I \\cdot I_0\\right)$', '$L = \\frac{I}{I_0}$', '$L = 10 \\cdot \\lg\\!\\left(\\frac{I}{I_0}\\right)$', '$L = \\frac{\\lg I}{10}$'],
    correct: 2,
    why: [
      'Ljudnivån bygger på kvoten mellan $I$ och $I_0$, inte på deras produkt.',
      'Den kvoten saknar den logaritmiska omvandlingen som gör att decibelskalan bättre matchar den upplevda ljudstyrkan.',
      'Ljudnivån definieras som tio gånger 10-logaritmen av kvoten mellan intensiteten $I$ och hörbarhetsgränsen $I_0$.',
      'Logaritmen ska tas av kvoten $I/I_0$, inte enbart av $I$, och resultatet ska sedan multipliceras — inte divideras — med 10.',
    ],
  },
  {
    question: 'En ökning av ljudnivån med cirka $3\\ \\mathrm{dB}$ motsvarar ungefär vad?',
    choices: ['En tiodubbling av ljudintensiteten.', 'Ingen förändring av ljudintensiteten.', 'En halvering av ljudintensiteten.', 'En fördubbling av ljudintensiteten.'],
    correct: 3,
    why: [
      'En tiodubbling av intensiteten motsvarar istället en ökning med 10 dB, inte 3 dB.',
      'En förändring i dB motsvarar alltid en förändring i intensitet, eftersom dB-skalan är en logaritmisk representation av intensiteten.',
      'En halvering av intensiteten motsvarar istället en minskning med ungefär 3 dB, inte en ökning.',
      'Eftersom $10 \\cdot \\lg 2 \\approx 3$, motsvarar en ökning med 3 dB en fördubbling av ljudintensiteten.',
    ],
  },
  {
    question: 'Vilken ljudnivå motsvarar ungefär den mänskliga smärtgränsen?',
    choices: ['$130\\ \\mathrm{dB}$', '$30\\ \\mathrm{dB}$', '$60\\ \\mathrm{dB}$', '$100\\ \\mathrm{dB}$'],
    correct: 0,
    why: [
      'Smärtgränsen, där ljud övergår till smärta, ligger vid ungefär $130\\ \\mathrm{dB}$ (motsvarande intensiteten 1 W/m²).',
      'Det är en mycket tyst nivå, ungefär bakgrundsljud i ett tyst rum, långt under smärtgränsen.',
      'Det motsvarar ungefär ett samtal på kort avstånd, alltså en normal ljudnivå, inte smärtgränsen.',
      'Det är hög men fortfarande under smärtgränsen — nivån ligger snarare i närheten av en tryckluftsborr (120 dB).',
    ],
  },
  {
    question: 'En punktformig ljudkälla sänder ut effekten $4\\pi\\ \\mathrm{W}$ jämnt åt alla håll. Vilken ljudintensitet uppmäts på avståndet $1{,}0\\ \\mathrm{m}$? (Formel: $I = \\frac{P}{4\\pi \\cdot r^{2}}$)',
    choices: ['$4\\pi\\ \\mathrm{W/m^{2}}$', '$1{,}0\\ \\mathrm{W/m^{2}}$', '$0{,}25\\ \\mathrm{W/m^{2}}$', '$16\\pi^{2}\\ \\mathrm{W/m^{2}}$'],
    correct: 1,
    why: [
      'Det är effekten $P$, inte den sökta intensiteten — arean i nämnaren gör att faktorerna $4\\pi$ tar ut varandra.',
      'Med $P = 4\\pi\\ \\mathrm{W}$ och $r = 1{,}0\\ \\mathrm{m}$ blir $I = \\frac{4\\pi}{4\\pi \\cdot 1{,}0^{2}} = 1{,}0\\ \\mathrm{W/m^{2}}$.',
      'Det skulle bara stämma om man glömt att $4\\pi$ i täljare och nämnare tar ut varandra och istället bara delat med 4.',
      'Det fås om man av misstag multiplicerar $P$ och arean istället för att dela dem.',
    ],
  },
],

'fy2-2.12': [
  {
    question: 'Inom vilket ungefärligt frekvensintervall kan det mänskliga örat uppfatta ljud?',
    choices: ['$2\\ \\mathrm{Hz}$ till $2\\,000\\ \\mathrm{Hz}$', '$200\\ \\mathrm{Hz}$ till $200\\,000\\ \\mathrm{Hz}$', '$20\\ \\mathrm{Hz}$ till $20\\,000\\ \\mathrm{Hz}$', '$20\\,000\\ \\mathrm{Hz}$ till $200\\,000\\ \\mathrm{Hz}$'],
    correct: 2,
    why: [
      'Det intervallet ligger en tiopotens för lågt i båda ändar jämfört med människans hörbara område.',
      'Den nedre gränsen ligger en tiopotens för högt — människor kan höra ner till 20 Hz, inte bara ner till 200 Hz.',
      'Det mänskliga örat kan normalt uppfatta frekvenser mellan ungefär 20 Hz och 20 000 Hz.',
      'Det intervallet ligger helt inom (och ovanför) ultraljudsområdet, långt över vad örat normalt kan uppfatta.',
    ],
  },
  {
    question: 'Vad kallas ljud med frekvens över $20\\,000\\ \\mathrm{Hz}$?',
    choices: ['Infraljud', 'Överljud', 'Diskantljud', 'Ultraljud'],
    correct: 3,
    why: [
      'Infraljud är istället ljud med frekvens under 20 Hz, i motsatt ände av skalan.',
      'Överljud används normalt om hastigheter över ljudets hastighet, inte om höga frekvenser.',
      'Diskantljud är inget vedertaget fysikbegrepp för höga frekvenser i detta sammanhang.',
      'Ljud över 20 000 Hz, utanför människans hörbara område, kallas ultraljud och används bland annat vid fosterdiagnostik.',
    ],
  },
  {
    question: 'Vad kallas ljud med frekvens under $20\\ \\mathrm{Hz}$?',
    choices: ['Infraljud', 'Ultraljud', 'Basljud', 'Undertoner'],
    correct: 0,
    why: [
      'Ljud under 20 Hz, under människans hörbarhetsgräns, kallas infraljud och genereras t.ex. av jordbävningar och ventilationsfläktar.',
      'Ultraljud ligger istället över 20 000 Hz, i motsatt ände av skalan.',
      'Basljud är inget etablerat fysikbegrepp för frekvenser under 20 Hz.',
      'Undertoner är inte det vedertagna begreppet för frekvenser under hörbarhetsgränsen — det korrekta begreppet är infraljud.',
    ],
  },
  {
    question: 'Vad innebär dopplereffekten?',
    choices: ['Att ljudets utbredningshastighet i luft ökar med temperaturen.', 'Att den uppfattade frekvensen ändras när sändare och mottagare rör sig i förhållande till varandra.', 'Att ljud inte kan fortplanta sig i vakuum.', 'Att höga toner har längre våglängd än låga toner.'],
    correct: 1,
    why: [
      'Det stämmer att temperaturen påverkar ljudhastigheten, men det är inte det dopplereffekten beskriver.',
      'Dopplereffekten innebär att den frekvens en mottagare uppfattar ändras beroende på den relativa rörelsen mellan sändare och mottagare.',
      'Att ljud kräver ett medium och inte kan fortplanta sig i vakuum är en separat egenskap hos ljudvågor, inte dopplereffekten.',
      'Höga toner har istället kortare våglängd än låga toner (eftersom $v = f \\cdot \\lambda$ med konstant $v$) — det har inget direkt med dopplereffekten att göra.',
    ],
  },
  {
    question: 'En ambulans med sirenen på kör förbi en stillastående person. Hur uppfattar personen frekvensen medan ambulansen närmar sig respektive avlägsnar sig?',
    choices: ['Samma frekvens hela tiden, eftersom personen står still.', 'Lägre frekvens när den närmar sig, högre när den avlägsnar sig.', 'Högre frekvens när den närmar sig, lägre när den avlägsnar sig.', 'Frekvensen ökar hela tiden oavsett riktning.'],
    correct: 2,
    why: [
      'Det är den relativa rörelsen mellan sändare och mottagare som avgör dopplereffekten — det räcker att ambulansen rör sig, personen behöver inte göra det.',
      'Det är tvärtom: en observatör framför en ljudkälla som närmar sig uppfattar en högre frekvens, inte en lägre.',
      'En observatör framför källan (som ambulansen närmar sig) uppfattar högre frekvens, och en observatör den lämnar bakom sig uppfattar lägre frekvens.',
      'Frekvensen kan inte öka hela tiden — den är högre medan ambulansen närmar sig och lägre efter att den har passerat.',
    ],
  },
  {
    question: 'Vad orsakar en s.k. ljudbang (sonic boom)?',
    choices: ['Att en ljudvåg reflekteras upprepade gånger mot marken.', 'Att frekvensen sjunker till under den mänskliga hörbarhetsgränsen.', 'Att två ljudvågor med exakt samma frekvens möts i fas.', 'Att ett föremål passerar ljudets hastighet och kör ikapp sina egna ljudvågor.'],
    correct: 3,
    why: [
      'Upprepad reflexion mot marken beskriver eko, inte fenomenet bakom en ljudbang.',
      'En ljudbang handlar inte om att frekvensen blir för låg för att höras, utan om ett kraftigt ljudtryck som byggs upp.',
      'Det beskrivna är konstruktiv interferens, ett annat fenomen än det som orsakar en ljudbang.',
      'När ett föremål rör sig snabbare än ljudet kör det ikapp sina egna utsända ljudvågor, som pressas samman till en kraftig tryckstöt — en ljudbang.',
    ],
  },
],

'fy2-2.13': [
  {
    question: 'Vilken typ av vågkälla ger upphov till cirkulära vattenvågor?',
    choices: ['En punktformig vågkälla, t.ex. en punkt som doppas ner i vattnet.', 'En rak, linjär vågkälla som rör sig fram och tillbaka.', 'Endast vågor orsakade av vind kan bli cirkulära.', 'En vågkälla med oändlig utbredning i en riktning.'],
    correct: 0,
    why: [
      'En punktformig källa skickar ut pulser radiellt åt alla håll, vilket ger cirkulära vågfronter.',
      'En linjär (rak) vågkälla ger istället upphov till plana vågor med raka, parallella vågfronter.',
      'Vind kan ge upphov till vågor av olika slag, men det är källans form (punkt eller linje) som avgör om vågorna blir cirkulära eller plana.',
      'En oändligt utsträckt källa i en riktning ger raka, plana vågfronter, inte cirkulära.',
    ],
  },
  {
    question: 'Vad säger reflexionslagen för vattenvågor?',
    choices: ['Infallsvinkeln är alltid dubbelt så stor som reflexionsvinkeln.', 'Infallsvinkeln är lika stor som reflexionsvinkeln.', 'Reflexionsvinkeln beror på vågens våglängd.', 'Vinklarna mäts mot den reflekterande ytans plan, inte mot normalen.'],
    correct: 1,
    why: [
      'Reflexionslagen säger att vinklarna är exakt lika stora, inte att den ena är dubbelt så stor som den andra.',
      'Reflexionslagen ($i = r$) säger att infallsvinkeln är lika stor som reflexionsvinkeln, båda mätta mot normalen.',
      'Reflexionsvinkeln bestäms av infallsvinkeln, inte direkt av våglängden.',
      'Vinklarna mäts mot normalen — en linje vinkelrät mot den reflekterande ytan — inte mot själva ytans plan.',
    ],
  },
  {
    question: 'Vad händer med en vattenvågs våglängd och hastighet när den går från djupare till grundare vatten?',
    choices: ['Båda ökar.', 'Våglängden ökar men hastigheten minskar.', 'Båda minskar.', 'Båda förblir oförändrade.'],
    correct: 2,
    why: [
      'Vid övergång till grundare vatten bromsas vågen in — både hastighet och våglängd minskar, de ökar inte.',
      'Våglängden minskar tillsammans med hastigheten när vågen bromsas in mot grundare vatten, den ökar inte.',
      'Vågen bryts mot normalen och bromsas in i grundare vatten, vilket gör att både hastigheten och våglängden minskar.',
      'Något förändras faktiskt — det är just denna förändring i hastighet och våglängd som gör att vågen bryts och ändrar riktning.',
    ],
  },
  {
    question: 'Vilken storhet förblir konstant när en vattenvåg bryts mellan olika djup?',
    choices: ['Våglängden', 'Utbredningshastigheten', 'Amplituden', 'Frekvensen'],
    correct: 3,
    why: [
      'Våglängden ändras med djupet — den minskar i grundare vatten och ökar i djupare vatten.',
      'Hastigheten ändras med djupet, precis som våglängden — det är därför brytning sker överhuvudtaget.',
      'Amplituden nämns inte som en bevarad storhet vid brytning — det som hålls konstant är frekvensen.',
      'Frekvensen bestäms av källan som skapar vågen och ändras inte när vågen går in i ett område med annat djup, även om hastighet och våglängd ändras.',
    ],
  },
  {
    question: 'Vilket samband beskriver brytningslagen för vattenvågor?',
    choices: ['$\\frac{\\sin i}{\\sin b} = \\frac{v_1}{v_2} = \\frac{\\lambda_1}{\\lambda_2}$', '$\\sin i \\cdot \\sin b = v_1 \\cdot v_2$', '$\\frac{\\sin i}{\\sin b} = \\frac{v_2}{v_1}$', '$i - b = \\frac{\\lambda_1}{\\lambda_2}$'],
    correct: 0,
    why: [
      'Brytningslagen säger att kvoten mellan sinusvärdena för infalls- och brytningsvinkeln är lika med kvoten mellan hastigheterna, som i sin tur är lika med kvoten mellan våglängderna i respektive medium.',
      'Brytningslagen bygger på en kvot mellan sinusvärdena, inte en produkt av dem.',
      'Kvoten mellan hastigheterna ska stå som $v_1/v_2$, inte omvänt som $v_2/v_1$.',
      'Sambandet gäller kvoter mellan storheterna, inte en differens mellan vinklarna.',
    ],
  },
  {
    question: 'En våg med hastigheten $6{,}0\\ \\mathrm{m/s}$ i djupt vatten går in mot grundare vatten där hastigheten är $3{,}0\\ \\mathrm{m/s}$. Infallsvinkeln är sådan att $\\sin i = 0{,}80$. Vad är $\\sin b$?',
    choices: ['$1{,}6$', '$0{,}40$', '$0{,}80$', '$0{,}20$'],
    correct: 1,
    why: [
      'Det värdet är större än 1 och kan inte vara ett sinusvärde — det tyder på att kvoten $v_1/v_2$ blivit omvänd.',
      'Enligt brytningslagen är $\\sin b = \\sin i \\cdot \\frac{v_2}{v_1} = 0{,}80 \\cdot \\frac{3{,}0}{6{,}0} = 0{,}40$.',
      'Det är samma värde som $\\sin i$ — det skulle innebära att vinkeln inte ändras alls vid brytningen, vilket bara stämmer om hastigheterna är lika.',
      'Det fås om man råkar dela med fel hastighetskvot (t.ex. en fjärdedel istället för en halv).',
    ],
  },
],

'fy2-2.14': [
  {
    question: 'Vad kallas fenomenet att vågor böjs av vid kanterna på en öppning?',
    choices: ['Interferens', 'Refraktion', 'Diffraktion', 'Reflexion'],
    correct: 2,
    why: [
      'Interferens beskriver hur vågor påverkar varandra när de möts, inte hur en enskild våg böjs av vid en öppning.',
      'Refraktion är brytning som sker vid övergång mellan olika medier (t.ex. olika djup), inte avböjning vid en öppning.',
      'Diffraktion är just det fenomen där en våg böjs av vid kanterna av ett hinder eller en öppning, som om öppningen blev en ny vågkälla.',
      'Reflexion innebär att en våg studsar tillbaka mot ett hinder, inte att den böjs av runt en öppning.',
    ],
  },
  {
    question: 'Vad kallas linjer där två vågor möts i motfas och släcker ut varandra?',
    choices: ['Maximilinjer', 'Vågfronter', 'Symmetrilinjer', 'Nodlinjer'],
    correct: 3,
    why: [
      'Maximilinjer är istället där vågorna möts i fas och förstärker varandra maximalt.',
      'Vågfronter beskriver vågens form vid ett givet ögonblick, inte var interferensen är destruktiv.',
      'Symmetrilinjer är inget vedertaget begrepp i detta sammanhang.',
      'På nodlinjer möts en vågtopp från den ena källan alltid en vågdal från den andra (motfas), vilket ger destruktiv interferens och amplitud noll.',
    ],
  },
  {
    question: 'Vad kallas det när två vågor förstärker varandra maximalt?',
    choices: ['Konstruktiv interferens', 'Destruktiv interferens', 'Diffraktion', 'Refraktion'],
    correct: 0,
    why: [
      'När vågor möts i fas och förstärker varandra maximalt kallas det konstruktiv interferens.',
      'Destruktiv interferens är motsatsen — vågorna släcker då ut varandra istället för att förstärkas.',
      'Diffraktion handlar om att vågor böjs av vid en öppning eller ett hinder, inte om hur två vågor förstärker varandra.',
      'Refraktion är brytning vid övergång mellan medier, ett annat fenomen än interferens mellan två vågor.',
    ],
  },
  {
    question: 'Vilket villkor gäller för vägskillnaden $\\Delta s$ på en maximilinje (konstruktiv interferens)?',
    choices: ['$\\Delta s = \\left(n + \\tfrac{1}{2}\\right) \\cdot \\lambda$', '$\\Delta s = n \\cdot \\lambda$', '$\\Delta s = 2n \\cdot \\lambda$', '$\\Delta s = \\sqrt{n} \\cdot \\lambda$'],
    correct: 1,
    why: [
      'Det villkoret gäller istället för nodlinjer (destruktiv interferens), där vågorna möts i motfas.',
      'På en maximilinje möts vågorna i fas, vilket sker när vägskillnaden är ett helt antal våglängder: $\\Delta s = n \\cdot \\lambda$.',
      'Att kräva jämna multipler av λ är för strikt — även udda heltal ($n=1,3,5,\\ldots$) ger konstruktiv interferens med rätt villkor.',
      'Villkoret för konstruktiv interferens är linjärt i $n$, inte en kvadratrot av $n$.',
    ],
  },
  {
    question: 'Vilket villkor gäller för vägskillnaden $\\Delta s$ på en nodlinje (destruktiv interferens)?',
    choices: ['$\\Delta s = n \\cdot \\lambda$', '$\\Delta s = 2n \\cdot \\lambda$', '$\\Delta s = \\left(n + \\tfrac{1}{2}\\right) \\cdot \\lambda$', '$\\Delta s = \\sqrt{n} \\cdot \\lambda$'],
    correct: 2,
    why: [
      'Det villkoret gäller istället för maximilinjer (konstruktiv interferens), där vågorna möts i fas.',
      'Att kräva jämna multipler av λ beskriver inte destruktiv interferens korrekt.',
      'På en nodlinje möts vågorna i motfas, vilket sker när vägskillnaden är ett halvt heltal av våglängder: $\\Delta s = \\left(n + \\tfrac{1}{2}\\right) \\cdot \\lambda$.',
      'Villkoret för destruktiv interferens är linjärt i $n$ (plus en halv), inte en kvadratrot av $n$.',
    ],
  },
  {
    question: 'En punkt ligger på en nodlinje. Avståndet till den ena högtalaren är $12{,}0\\ \\mathrm{m}$ och till den andra $10{,}5\\ \\mathrm{m}$. Detta är den nollte nodlinjen ($n=0$). Vad är våglängden λ? (Ledtråd: $\\Delta s = \\left(n+\\tfrac{1}{2}\\right)\\lambda$)',
    choices: ['$1{,}5\\ \\mathrm{m}$', '$0{,}75\\ \\mathrm{m}$', '$6{,}0\\ \\mathrm{m}$', '$3{,}0\\ \\mathrm{m}$'],
    correct: 3,
    why: [
      'Det är själva vägskillnaden $\\Delta s$, inte den sökta våglängden.',
      'Det fås om man förväxlar $\\Delta s$ och λ och delar fel väg.',
      'Det skulle motsvara $\\Delta s = 2\\lambda$, vilket inte stämmer med villkoret för en nodlinje.',
      'Med $n=0$ blir $\\Delta s = \\frac{1}{2}\\lambda$, så $\\lambda = 2 \\cdot \\Delta s = 2 \\cdot 1{,}5 = 3{,}0\\ \\mathrm{m}$.',
    ],
  },
],

// ── 15-fy2-ch3a.js ────────────────────────────────────────────

'fy2-3.1': [
  {
    question: 'Vad avgör magnetfältets riktning i en given punkt, enligt genomgången?',
    choices: [
      'Riktningen som en kompassnåls sydända pekar åt',
      'Avståndet till närmaste magnet',
      'Riktningen som en kompassnåls nordända pekar åt',
      'Hastigheten hos en laddning i punkten',
    ],
    correct: 2,
    why: [
      'Fältets riktning definieras inte av sydändan utan av kompassens nordända — det är den änden som pekar i fältets riktning.',
      'Avståndet påverkar hur starkt fältet är, inte i vilken riktning det pekar.',
      'En liten kompass placerad i fältet ställer in sig så att nordändan pekar i fältets riktning — det är själva definitionen av fältets riktning i punkten.',
      'En laddnings hastighet avgör den magnetiska kraften på just den laddningen (kommer i ett senare avsnitt), men den definierar inte fältets riktning i en punkt.',
    ],
  },
  {
    question: 'Man delar en stavmagnet med en nordpol och en sydpol mitt itu. Vad händer?',
    choices: [
      'Man får två nya, kortare magneter, var och en med en egen nord- och sydpol',
      'Den ena biten blir en isolerad nordpol och den andra en isolerad sydpol',
      'Magnetismen försvinner helt eftersom magneten förstörs',
      'Endast den bit som redan hade nordpolen behåller magnetiska egenskaper',
    ],
    correct: 0,
    why: [
      'Magnetpoler uppträder alltid parvis. Delas en magnet på mitten bildas två kortare magneter, var och en med en egen nord- och sydpol — precis som i demonstrationen med den avbrutna stavmagneten.',
      'Det går aldrig att skapa en magnet med bara en pol (en magnetisk monopol) — vid delningen bildas i stället en ny pol av motsatt sort vid brottytan på båda bitarna.',
      'Magnetismen försvinner inte vid delning — båda bitarna förblir magnetiska, bara kortare.',
      'Båda bitarna får magnetiska egenskaper efter delningen, inte bara den som redan hade en pol av ett visst slag.',
    ],
  },
  {
    question: 'Vilket samband gäller för hur magnetiska poler påverkar varandra?',
    choices: [
      'Lika poler attraherar varandra, olika poler repellerar',
      'Alla poler attraherar varandra oavsett typ',
      'Poler påverkar bara varandra vid direkt kontakt',
      'Lika poler repellerar varandra, olika poler attraherar varandra',
    ],
    correct: 3,
    why: [
      'Detta är tvärtom mot det faktiska sambandet — lika poler repellerar varandra, medan olika poler attraherar varandra.',
      'Poler attraherar inte varandra oavsett typ — två nordpoler (eller två sydpoler) repellerar varandra.',
      'Magnetiska krafter verkar på avstånd, precis som gravitation och elektriska krafter — polerna behöver inte vara i kontakt för att påverka varandra.',
      'Precis som för elektrisk laddning gäller att lika magnetiska poler (N–N eller S–S) repellerar varandra, medan olika poler (N–S) attraherar varandra.',
    ],
  },
  {
    question: 'Hur ritas magnetfältets fältlinjer runt en stavmagnet?',
    choices: [
      'De går ut ur sydändan och in i nordändan',
      'De går ut ur nordändan och in i sydändan',
      'De bildar räta linjer rakt igenom magneten utan böjning',
      'De uppstår bara mellan två separata magneter, inte runt en enskild magnet',
    ],
    correct: 1,
    why: [
      'Riktningen är tvärtom — fältlinjerna går ut ur nordändan, inte sydändan.',
      'Magnetiska fältlinjer definieras med riktningen från nordända till sydända, precis som i figuren med stavmagneten.',
      'Fältlinjerna böjer sig i stora bågar mellan polerna, de går inte rakt igenom magneten som räta linjer.',
      'En enskild magnet har ett eget fältlinjemönster som går från dess nordända till dess sydända — det krävs inte två magneter för att fältlinjer ska finnas.',
    ],
  },
  {
    question: 'Vad indikerar tätare fältlinjer i en figur av ett magnetfält?',
    choices: [
      'Att fältet är svagare där',
      'Att magnetens temperatur är högre där',
      'Att fältet är starkare där',
      'Att fältlinjerna är felritade',
    ],
    correct: 2,
    why: [
      'Det är tvärtom — ju tätare fältlinjerna ligger, desto starkare är fältet, inte svagare.',
      'Fältlinjernas täthet visar fältets styrka, den har inget med magnetens temperatur att göra.',
      'Ju tätare fältlinjer, desto kraftigare magnetfält — det är själva poängen med att rita fältlinjer med varierande täthet.',
      'Tät packning av fältlinjer nära polerna är korrekt ritat — det speglar att fältet är som starkast där.',
    ],
  },
],

'fy2-3.2': [
  {
    question: 'Vad visade Hans Christian Ørsteds försök med en kompassnål nära en strömförande ledare?',
    choices: [
      'Att kompassnålens utslag bara beror på jordens magnetfält',
      'Att en strömförande ledare ger upphov till ett magnetfält som kan avlänka en kompassnål',
      'Att endast permanentmagneter kan skapa magnetfält',
      'Att strömmen i en ledare inte påverkar magnetfält',
    ],
    correct: 1,
    why: [
      'Kompassnålens utslag i försöket berodde just på att ledarens ström skapade ett eget fält, inte bara på jordens magnetfält.',
      'Ørsted upptäckte att en strömförande ledare skapar ett magnetfält runt sig, vilket fick kompassnålen att länkas av från sin vanliga nord–sydriktning.',
      'Försöket visade tvärtom att även en strömförande ledare (inte bara permanentmagneter) skapar ett magnetfält.',
      'Försöket visade precis motsatsen: strömmen i ledaren gav upphov till ett tydligt magnetfält som påverkade kompassnålen.',
    ],
  },
  {
    question: 'Vid högerhandstumregeln för fältet kring en rak ledare — vad representerar tummen respektive fingrarna på högerhanden?',
    choices: [
      'Tummen fältets riktning, fingrarna strömmens riktning',
      'Tummen kraftens riktning, fingrarna strömmens riktning',
      'Tummen och fingrarna representerar båda strömmens riktning',
      'Tummen strömmens riktning, fingrarna fältets riktning',
    ],
    correct: 3,
    why: [
      'Det är tvärtom: tummen motsvarar strömmens riktning, och fingrarna visar fältets riktning runt ledaren.',
      'Kraftens riktning bestäms med en annan regel (för laddningar och ledare i fält, senare avsnitt) — för fältet runt en rak ledare handlar tumregeln bara om ström och fält.',
      'Tumme och fingrar representerar inte samma sak — tummen är strömmens riktning och fingrarna visar hur fältet lindar sig runt ledaren.',
      'Högerhandens tumme motsvarar strömmens riktning, och fingrarna, som griper om ledaren, visar magnetfältets riktning runt den.',
    ],
  },
  {
    question: 'Vilken SI-enhet har den magnetiska flödestätheten *B*?',
    choices: [
      'T (tesla)',
      'N (newton)',
      'V (volt)',
      'A (ampere)',
    ],
    correct: 0,
    why: [
      'Magnetisk flödestäthet betecknas *B* och mäts i tesla (T) — redan 1 T är ett mycket starkt magnetfält.',
      'Newton (N) är enheten för kraft, inte för magnetisk flödestäthet.',
      'Volt (V) är enheten för spänning (och inducerad spänning), inte för magnetisk flödestäthet.',
      'Ampere (A) är enheten för elektrisk ström, inte för magnetfältets styrka.',
    ],
  },
  {
    question: 'Hur markeras i en figur att en vektor (t.ex. ström eller fält) pekar rakt in i papperet?',
    choices: [
      'En prick i en cirkel',
      'En dubbelpil',
      'Ett kryss i en cirkel',
      'En pil rakt uppåt',
    ],
    correct: 2,
    why: [
      'En prick i en cirkel betyder tvärtom att vektorn pekar rakt ut ur papperet, mot betraktaren.',
      'En dubbelpil används inte som notation för riktning in i eller ut ur planet.',
      'Ett kryss i en cirkel symboliserar pilens fjädrar sedda bakifrån — vektorn pekar alltså rakt in i papperet, bort från betraktaren.',
      'En pil rakt uppåt visar en riktning i planets egen yta, inte vinkelrätt in i eller ut ur det.',
    ],
  },
  {
    question: 'Enligt sambandet $B = k \\cdot \\frac{I}{d}$ — vad händer med den magnetiska flödestätheten om avståndet *d* till ledaren fördubblas, medan strömmen är oförändrad?',
    choices: [
      '*B* fördubblas',
      '*B* halveras',
      '*B* blir fyra gånger så stor',
      '*B* påverkas inte',
    ],
    correct: 1,
    why: [
      '*B* är omvänt proportionell mot avståndet *d* — dubblas *d* halveras *B*, den fördubblas inte.',
      'Eftersom *B* är omvänt proportionell mot *d* i formeln $B = k \\cdot \\frac{I}{d}$ ger en fördubbling av avståndet en halvering av flödestätheten.',
      'Sambandet är linjärt omvänt (inte kvadratiskt) mot avståndet, så *B* blir hälften — inte en fjärdedel eller fyra gånger.',
      'Avståndet *d* står i nämnaren i formeln, så det påverkar definitivt storleken på *B*.',
    ],
  },
  {
    question: 'En rak ledare har strömmen *I* = 5,0 A. Beräkna den magnetiska flödestätheten på avståndet *d* = 0,10 m från ledaren ($k = 2 \\cdot 10^{-7}$ T·m/A).',
    choices: [
      '$1{,}0\\ \\mathrm{\\mu T}$',
      '$100\\ \\mathrm{\\mu T}$',
      '$0{,}10\\ \\mathrm{\\mu T}$',
      '$10\\ \\mathrm{\\mu T}$',
    ],
    correct: 3,
    why: [
      'Detta motsvarar en beräkning där avståndet av misstag sattes till 1,0 m i stället för 0,10 m.',
      'Detta är hundra gånger för stort — en vanlig felkälla är att avrunda tiopotenserna fel vid uträkningen.',
      'Detta är hundra gånger för litet jämfört med det korrekta svaret.',
      '$B = k \\cdot \\frac{I}{d} = 2 \\cdot 10^{-7} \\cdot \\frac{5{,}0}{0{,}10} = 1{,}0 \\cdot 10^{-5}\\ \\mathrm{T} = 10\\ \\mathrm{\\mu T}$.',
    ],
  },
],

'fy2-3.3': [
  {
    question: 'Vad bildas när en strömförande ledare formas till en cirkel?',
    choices: [
      'En solenoid',
      'En slinga',
      'En transformator',
      'En permanentmagnet',
    ],
    correct: 1,
    why: [
      'En solenoid är en lång rak spole gjord av flera lindade varv — en enda cirkelformad ledare kallas i stället en slinga.',
      'En cirkelformad strömförande ledare kallas en slinga. Fältet från slingans olika delar samverkar och blir starkare inuti slingan.',
      'En transformator är en helt annan komponent uppbyggd av spolar kring en gemensam kärna, inte en enstaka slinga.',
      'En permanentmagnet är gjord av ferromagnetiskt material som behåller sin magnetism, inte en strömslinga.',
    ],
  },
  {
    question: 'Vad kallas en lång, rak spole, och hur beskrivs magnetfältet inuti den?',
    choices: [
      'En slinga; fältet är starkast vid kanterna',
      'En generator; fältet varierar kraftigt inuti',
      'En solenoid; fältet är homogent (lika starkt överallt) inuti',
      'En toroid; fältet är noll inuti',
    ],
    correct: 2,
    why: [
      'En slinga är en enda ledarvarv, inte en lång rak spole med flera varv, och fältet inuti en lång spole beskrivs som homogent, inte starkast vid kanterna.',
      'En generator är en helt annan anordning som omvandlar rörelseenergi till elektrisk energi, inte en benämning på en spoltyp.',
      'En lång rak spole kallas en solenoid, och inuti den betraktas magnetfältet som homogent — lika starkt överallt.',
      'En toroid är en ringformad spole, och fältet inuti en solenoid är inte noll utan tvärtom förstärkt av alla varven tillsammans.',
    ],
  },
  {
    question: 'Vid tumregeln för en spole — vad motsvarar fingrarna respektive tummen på högerhanden?',
    choices: [
      'Fingrarna strömmens riktning runt spolen, tummen fältets riktning genom spolen',
      'Tummen strömmens riktning, fingrarna fältets riktning',
      'Båda representerar strömmens riktning',
      'Fingrarna anger fältets styrka, tummen anger strömstyrkan',
    ],
    correct: 0,
    why: [
      'För en spole låter man fingrarna följa strömmens riktning runt spolens varv, och tummen pekar då i fältets riktning genom spolen — omvänt jämfört med tumregeln för en rak ledare.',
      'Det är tvärtom jämfört med tumregeln för en rak ledare — för en spole är det fingrarna som visar strömriktningen och tummen som visar fältet.',
      'Tumme och fingrar representerar olika saker i den här regeln: fingrarna visar strömmens riktning och tummen fältets riktning.',
      'Regeln handlar om riktningar, inte om att avläsa styrkan på fält eller ström.',
    ],
  },
  {
    question: 'I formeln $B = \\mu_0 \\cdot \\frac{n \\cdot I}{l}$ för en solenoid, vad representerar *n*?',
    choices: [
      'Spolens längd',
      'Strömmen genom spolen',
      'Permeabiliteten i vakuum',
      'Antalet varv i spolen',
    ],
    correct: 3,
    why: [
      'Spolens längd betecknas *l* i formeln, inte *n*.',
      'Strömmen genom spolen betecknas *I*, inte *n*.',
      'Permeabiliteten i vakuum betecknas $\\mu_0$ och är en konstant, inte samma sak som *n*.',
      '*n* är varvtalet, det vill säga antalet varv i spolen — fler varv ger ett starkare fält enligt formeln.',
    ],
  },
  {
    question: 'En spole med 100 varv och längden 0,50 m ges strömmen 2,0 A. Ungefär hur stor blir den magnetiska flödestätheten inuti spolen ($\\mu_0 = 4\\pi \\cdot 10^{-7}$ T·m/A)?',
    choices: [
      '$0{,}050\\ \\mathrm{mT}$',
      '$0{,}50\\ \\mathrm{mT}$',
      '$5{,}0\\ \\mathrm{mT}$',
      '$50\\ \\mathrm{mT}$',
    ],
    correct: 1,
    why: [
      'Detta är tio gånger för litet jämfört med det korrekta svaret.',
      '$B = \\mu_0 \\cdot \\frac{n \\cdot I}{l} = 4\\pi \\cdot 10^{-7} \\cdot \\frac{100 \\cdot 2{,}0}{0{,}50} \\approx 5{,}0 \\cdot 10^{-4}\\ \\mathrm{T} = 0{,}50\\ \\mathrm{mT}$.',
      'Detta är tio gånger för stort jämfört med det korrekta svaret.',
      'Detta är hundra gånger för stort — kontrollera att längden är omvandlad till meter och att varvtalet inte räknats dubbelt.',
    ],
  },
],

'fy2-3.4': [
  {
    question: 'Varför måste, enligt resonemanget i avsnittet, ett magnetfält påverka en rörlig laddning med en kraft?',
    choices: [
      'Eftersom alla magnetfält innehåller elektrisk laddning',
      'Enligt Newtons första lag om tröghet',
      'Enligt Newtons tredje lag: om en rörlig laddning (ström) påverkar en magnet med en kraft, måste magneten också påverka den rörliga laddningen med en lika stor, motriktad kraft',
      'Eftersom laddningar alltid rör sig i cirklar i magnetfält',
    ],
    correct: 2,
    why: [
      'Magnetfält består inte av elektrisk laddning — de uppstår kring magneter och strömförande ledare, men själva fältet är inte laddat.',
      'Newtons första lag handlar om att kroppar fortsätter i rörelse eller vila om ingen kraft verkar — den förklarar inte varför fält och laddningar påverkar varandra ömsesidigt.',
      'Eftersom strömförande ledare (rörliga laddningar) påverkar magneter med en kraft, måste enligt Newtons tredje lag magneten också påverka de rörliga laddningarna med en lika stor, motriktad kraft.',
      'Att laddningar kan röra sig i cirkelbanor i ett magnetfält är en konsekvens av den magnetiska kraften, inte anledningen till att kraften finns.',
    ],
  },
  {
    question: 'Vid högerhandsregeln för magnetisk kraft på en laddning — vad motsvarar tummen, pekfingret och långfingret?',
    choices: [
      'Tummen kraften, pekfingret strömmen, långfingret fältet',
      'Tummen strömriktningen, pekfingret fältets riktning, långfingret kraftens riktning',
      'Tummen fältets riktning, pekfingret kraftens riktning, långfingret strömriktningen',
      'Alla tre fingrar motsvarar fältets riktning ur olika vinklar',
    ],
    correct: 1,
    why: [
      'Ordningen är fel — tummen motsvarar strömriktningen, inte kraften.',
      'Tummen motsvarar strömriktningen *I*, pekfingret magnetfältets riktning *B*, och långfingret kraftens riktning *F* — de tre hålls vinkelräta mot varandra.',
      'Fingrarna har bytt plats jämfört med den korrekta regeln — det är tummen som visar strömmen, inte fältet.',
      'De tre fingrarna representerar tre olika storheter (ström, fält, kraft), inte samma fält sett från olika håll.',
    ],
  },
  {
    question: 'En negativt laddad partikel rör sig åt höger i ett magnetfält. Vilken riktning ska "strömriktningen" (tummen) sättas till vid tillämpning av högerhandsregeln?',
    choices: [
      'Åt höger, samma riktning som partikeln',
      'Uppåt, vinkelrätt mot rörelsen',
      'Riktningen spelar ingen roll för negativa laddningar',
      'Åt vänster, motsatt riktning mot partikelns rörelse',
    ],
    correct: 3,
    why: [
      'Det gäller bara för positiva laddningar — för en negativ laddning är strömriktningen motsatt rörelseriktningen.',
      'Strömriktningen ska följa laddningens rörelselinje (framåt eller bakåt), inte en godtycklig vinkelrät riktning.',
      'Laddningens tecken avgör faktiskt vilken väg tummen ska peka — det spelar stor roll.',
      'För en negativ laddning är strömriktningen motsatt rörelseriktningen, så om partikeln rör sig åt höger ska tummen peka åt vänster.',
    ],
  },
  {
    question: 'Vilken formel beskriver den magnetiska kraften på en laddad partikel som rör sig vinkelrätt mot ett magnetfält?',
    choices: [
      '$F = q \\cdot v \\cdot B$',
      '$F = B \\cdot I \\cdot l$',
      '$F = k \\cdot \\frac{I}{d}$',
      '$F = m \\cdot a$',
    ],
    correct: 0,
    why: [
      'Kraften på en enskild laddning i ett magnetfält ges av $F = q \\cdot v \\cdot B$, där *q* är laddningen, *v* hastigheten och *B* flödestätheten.',
      'Den formeln ger kraften på en hel strömförande ledare (senare avsnitt), inte på en enskild laddad partikel.',
      'Den formeln beräknar flödestätheten runt en rak ledare, inte kraften på en laddning.',
      'Det är Newtons andra lag för kraft och acceleration i allmänhet, inte en specifik formel för magnetisk kraft.',
    ],
  },
  {
    question: 'Beräkna den magnetiska kraften på en proton ($q \\approx 1{,}602 \\cdot 10^{-19}$ C) som rör sig med hastigheten $1{,}0 \\cdot 10^{6}$ m/s vinkelrätt mot ett magnetfält på 0,10 T.',
    choices: [
      '$1{,}6 \\cdot 10^{-13}\\ \\mathrm{N}$',
      '$1{,}6 \\cdot 10^{-19}\\ \\mathrm{N}$',
      '$1{,}6 \\cdot 10^{-14}\\ \\mathrm{N}$',
      '$1{,}6 \\cdot 10^{-15}\\ \\mathrm{N}$',
    ],
    correct: 2,
    why: [
      'Detta är tio gånger för stort — kontrollera tiopotenserna vid multiplikationen.',
      'Detta är bara laddningens eget värde, $q \\approx 1{,}602 \\cdot 10^{-19}$ C — hastigheten och fältstyrkan är inte medräknade.',
      '$F = q \\cdot v \\cdot B = 1{,}602 \\cdot 10^{-19} \\cdot 1{,}0 \\cdot 10^{6} \\cdot 0{,}10 \\approx 1{,}6 \\cdot 10^{-14}\\ \\mathrm{N}$.',
      'Detta är tio gånger för litet — kontrollera tiopotenserna vid multiplikationen.',
    ],
  },
  {
    question: 'Vilket ungefärligt värde har elementarladdningen (t.ex. hos en proton eller elektron)?',
    choices: [
      '$1{,}602 \\cdot 10^{-23}\\ \\mathrm{C}$',
      '$1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$',
      '$9{,}109 \\cdot 10^{-31}\\ \\mathrm{C}$',
      '$6{,}626 \\cdot 10^{-34}\\ \\mathrm{C}$',
    ],
    correct: 1,
    why: [
      'Tiopotensen är fel — elementarladdningen är av storleksordningen $10^{-19}$ C, inte $10^{-23}$ C.',
      'Elementarladdningen, laddningen hos en enskild elektron eller proton, är $q \\approx 1{,}602 \\cdot 10^{-19}$ C.',
      'Detta värde ($9{,}109 \\cdot 10^{-31}$) är elektronens massa i kilogram, inte dess laddning i coulomb.',
      'Detta värde ($6{,}626 \\cdot 10^{-34}$) är Plancks konstant, en helt annan storhet från kvantfysiken.',
    ],
  },
],

'fy2-3.5': [
  {
    question: 'Vilken formel ger kraften på en rak strömförande ledare i ett magnetfält?',
    choices: [
      '$F = q \\cdot v \\cdot B$',
      '$F = k \\cdot \\frac{I_1 \\cdot I_2 \\cdot l}{d}$',
      '$F = m \\cdot a$',
      '$F = B \\cdot I \\cdot l$',
    ],
    correct: 3,
    why: [
      'Den formeln ger kraften på en enskild laddad partikel, inte på en hel strömförande ledare.',
      'Den formeln gäller kraften mellan två parallella strömförande ledare, inte kraften på en enda ledare i ett yttre fält.',
      'Det är Newtons andra lag i allmänhet, inte den specifika formeln för kraft på en ledare i ett magnetfält.',
      'Kraften på en strömförande ledare i ett magnetfält ges av $F = B \\cdot I \\cdot l$, där *B* är flödestätheten, *I* strömmen och *l* ledarens längd.',
    ],
  },
  {
    question: 'Enligt härledningen i avsnittet, hur fås formeln $F = B \\cdot I \\cdot l$ ur $F = q \\cdot v \\cdot B$?',
    choices: [
      'Genom att sätta in $Q = I \\cdot \\Delta t$ och $v = \\frac{l}{\\Delta t}$ i $F = q \\cdot v \\cdot B$, vilket ger $F = I \\cdot l \\cdot B$',
      'Genom att anta att alla laddningar är stillastående i ledaren',
      'Genom att multiplicera bägge led med Newtons andra lag',
      'Genom att dividera bort tiden helt utan att ersätta den',
    ],
    correct: 0,
    why: [
      'Genom att skriva den totala laddningen som $Q = I \\cdot \\Delta t$ och hastigheten som $v = \\frac{l}{\\Delta t}$, och sätta in dessa i $F = q \\cdot v \\cdot B$, förkortas $\\Delta t$ bort och kvar blir $F = I \\cdot l \\cdot B$.',
      'Härledningen bygger tvärtom på att laddningarna rör sig genom ledaren med en hastighet *v* — annars skulle det inte finnas någon ström alls.',
      'Härledningen använder algebraisk insättning av uttryck för *Q* och *v*, inte Newtons andra lag.',
      'Tiden $\\Delta t$ förkortas bort naturligt genom insättningen, men den ersätts av uttrycken för laddning och hastighet på vägen — den försvinner inte utan anledning.',
    ],
  },
  {
    question: 'Vad påpekar avsnittet om beteckningarna *I* (ström) och *l* (längd)?',
    choices: [
      'Att det är ett olösligt matematiskt problem som gör formeln oanvändbar',
      'Att man aldrig får använda bokstaven *l* för längd i fysik',
      'Att man bör hitta en skrivstil där bokstäverna *I* och *l* syns tydligt åtskilda, eftersom de lätt kan förväxlas',
      'Att detta bara är ett problem i handskriven text, aldrig i tryckta läroböcker',
    ],
    correct: 2,
    why: [
      'Det är inget matematiskt problem med formeln i sig, bara en risk att blanda ihop hur bokstäverna *I* och *l* ser ut när man skriver för hand.',
      'Avsnittet uppmanar inte till att sluta använda *l* för längd, bara att skriva den tydligt urskiljbar från *I*.',
      'Stora *I* (ström) och lilla *l* (längd) kan se mycket lika ut när man skriver för hand, så avsnittet uppmanar till en skrivstil där man tydligt ser skillnad på dem.',
      'Problemet gäller framför allt handskrift, där bokstavsformerna lättast blandas ihop.',
    ],
  },
  {
    question: 'Två parallella strömförande ledare har ström i samma riktning. Vilken typ av kraft uppstår mellan dem?',
    choices: [
      'Alltid repellerande, oavsett strömriktning',
      'Attraherande, eftersom strömmarna går åt samma håll',
      'Alltid noll om ledarna är parallella',
      'Beroende enbart på ledarnas längd, inte på strömriktningen',
    ],
    correct: 1,
    why: [
      'Kraften är inte alltid repellerande — riktningen beror på om strömmarna går åt samma håll eller motsatta håll.',
      'När strömmarna i två parallella ledare går åt samma håll blir kraften mellan dem attraherande, vilket exemplet i avsnittet visar.',
      'Kraften är noll bara om det inte flyter någon ström, annars uppstår alltid en kraft mellan parallella strömförande ledare.',
      'Ledarnas längd påverkar bara kraftens storlek, medan strömmarnas inbördes riktning avgör om kraften blir attraherande eller repellerande.',
    ],
  },
  {
    question: 'Vilken princip förklarar varför kraften på den vänstra ledaren är lika stor och motriktad kraften på den högra ledaren?',
    choices: [
      'Coulombs lag',
      'Lenz lag',
      'Ohms lag',
      'Newtons tredje lag (kraft och motkraft)',
    ],
    correct: 3,
    why: [
      'Coulombs lag beskriver kraften mellan elektriska laddningar i vila, inte kraften mellan strömförande ledare.',
      'Lenz lag handlar om induktionens riktning (ett senare avsnitt), inte om kraft och motkraft mellan ledare.',
      'Ohms lag beskriver sambandet mellan spänning, ström och resistans, inte krafter mellan ledare.',
      'Newtons tredje lag säger att till varje kraft finns en lika stor och motriktad motkraft — därför blir kraften på den ena ledaren lika stor och motriktad kraften på den andra.',
    ],
  },
  {
    question: 'En rak ledare med längden 0,50 m ligger vinkelrätt i ett magnetfält på 0,20 T och har strömmen 4,0 A. Beräkna kraften på ledaren.',
    choices: [
      '$0{,}40\\ \\mathrm{N}$',
      '$4{,}0\\ \\mathrm{N}$',
      '$0{,}040\\ \\mathrm{N}$',
      '$0{,}80\\ \\mathrm{N}$',
    ],
    correct: 0,
    why: [
      '$F = B \\cdot I \\cdot l = 0{,}20 \\cdot 4{,}0 \\cdot 0{,}50 = 0{,}40\\ \\mathrm{N}$.',
      'Detta är tio gånger för stort — kontrollera att alla tre faktorer multipliceras korrekt.',
      'Detta är tio gånger för litet jämfört med det korrekta svaret.',
      'Detta motsvarar en uträkning där längden av misstag glömts bort, till exempel bara $0{,}20 \\cdot 4{,}0 = 0{,}80$.',
    ],
  },
],

'fy2-3.6': [
  {
    question: 'Varför uppstår det jordmagnetiska fältet, enligt genomgången?',
    choices: [
      'Solens strålning joniserar jordens atmosfär',
      'Smält, laddad metall i jordens inre virvlar och skapar fältet',
      'Jordens rotation runt solen skapar fältet',
      'Månens gravitation inducerar strömmar i jordskorpan',
    ],
    correct: 1,
    why: [
      'Jonisering av atmosfären hör ihop med norrsken, inte med ursprunget till själva jordmagnetiska fältet.',
      'I jordens inre finns smält metall full av laddningar som virvlar på grund av det höga trycket, och detta bildar det jordmagnetiska fältet.',
      'Det är jordens rotation kring sin egen axel som bidrar till virvelrörelsen i jordens inre, inte rörelsen runt solen.',
      'Månens gravitation orsakar tidvatten, men det är inte förklaringen till det jordmagnetiska fältets uppkomst.',
    ],
  },
  {
    question: 'Varför sägs jordens norra magnetiska pol egentligen vara en magnetisk sydpol?',
    choices: [
      'Eftersom den ligger vid den geografiska sydpolen',
      'Eftersom den upptäcktes av en forskare på södra halvklotet',
      'Det är bara en förvirrande beteckning utan fysikalisk grund',
      'Eftersom en kompassnåls nordända (som attraheras av magnetiska sydpoler) pekar mot den',
    ],
    correct: 3,
    why: [
      'Den norra magnetiska polen ligger nära den geografiska nordpolen (i norra Kanada), inte vid sydpolen.',
      'Vem som upptäckte polen har ingen betydelse för vilken typ av magnetisk pol den är.',
      'Beteckningen har en tydlig fysikalisk grund — den följer av hur olika poler attraherar varandra.',
      'Eftersom olika poler attraherar varandra, och en kompassnåls nordända pekar mot den norra magnetiska polen, måste den polen egentligen vara en magnetisk sydpol.',
    ],
  },
  {
    question: 'Vad kallas vinkeln mellan den magnetiska nordpolen och den geografiska nordpolen, sett från en given plats?',
    choices: [
      'Deklination',
      'Inklination',
      'Precession',
      'Refraktion',
    ],
    correct: 0,
    why: [
      'Avvikelsen i vinkel mellan den magnetiska nordriktningen och den geografiska nordriktningen kallas deklination.',
      'Inklination är i stället vinkeln som det jordmagnetiska fältet bildar med markytan.',
      'Precession är ett annat fysikaliskt fenomen (t.ex. hos snurrande toppar eller jordaxelns långsamma vridning), inte det som beskrivs här.',
      'Refraktion är ljusets avböjning vid övergång mellan medier, ett helt annat begrepp från optiken.',
    ],
  },
  {
    question: 'Vad kallas vinkeln som det jordmagnetiska fältet bildar med markytan, och vilket ungefärligt värde har den vid ekvatorn?',
    choices: [
      'Deklination; 90°',
      'Inklination; 90°',
      'Inklination; 0°',
      'Deklination; 0°',
    ],
    correct: 2,
    why: [
      'Fenomenet heter inklination, inte deklination, och 90° gäller vid de magnetiska polerna, inte vid ekvatorn.',
      'Vinkeln kallas rätt (inklination), men värdet 90° gäller vid de magnetiska polerna, där fältet pekar rakt ner eller upp — inte vid ekvatorn.',
      'Vinkeln mellan fältet och markytan kallas inklination, och vid ekvatorn är fältet horisontellt (parallellt med marken), så $i = 0^\\circ$.',
      'Fenomenet heter inklination, inte deklination — deklination handlar om nordriktningen, inte vinkeln mot marken.',
    ],
  },
  {
    question: 'Vilka två komposanter delas det jordmagnetiska fältet ofta upp i?',
    choices: [
      'Nord- och sydkomposant',
      'Horisontalkomposant $B_\\mathrm{jh}$ och vertikalkomposant $B_\\mathrm{jv}$',
      'Elektrisk och magnetisk komposant',
      'Deklinations- och inklinationskomposant',
    ],
    correct: 1,
    why: [
      'Fältet delas inte upp efter väderstreck på det sättet, utan efter riktning i förhållande till markytan.',
      'Fältet delas upp i en horisontalkomposant $B_\\mathrm{jh}$, som drar kompassnålen mot norr, och en vertikalkomposant $B_\\mathrm{jv}$, som drar nålen mot eller från marken.',
      'Båda komposanterna är magnetiska — det jordmagnetiska fältet är inte uppdelat i en elektrisk och en magnetisk del.',
      'Deklination och inklination är vinklar som beskriver fältets riktning, inte namn på fältets komposanter.',
    ],
  },
  {
    question: 'Varför är skyddet mot laddade partiklar från t.ex. solen sämre nära de magnetiska polerna, vilket ger upphov till norrsken där?',
    choices: [
      'Där är atmosfären tunnare',
      'Solen står närmast jorden vid polerna',
      'Fältets riktning är där ungefär parallell med de laddade partiklarnas rörelse, vilket gör att fältet inte avböjer dem lika effektivt',
      'Magnetfältet är starkast där och stöter bort partiklarna helt',
    ],
    correct: 2,
    why: [
      'Atmosfärens tjocklek varierar inte på det sätt som skulle förklara norrskenet mellan poler och ekvator.',
      'Jordens avstånd till solen är i praktiken detsamma oavsett var på jorden man befinner sig, det förklarar inte skillnaden mellan poler och ekvator.',
      'Nära polerna är fältets riktning ungefär parallell med de inkommande laddade partiklarnas rörelse, vilket gör att den magnetiska kraften inte avböjer dem lika effektivt — de tar sig då ner i atmosfären och joniserar syre, vilket ger norrsken.',
      'Fältet stöter inte bort partiklarna helt vid polerna — tvärtom är skyddet där sämre, vilket är just anledningen till att norrsken syns där.',
    ],
  },
],

'fy2-3.7': [
  {
    question: 'Vad krävs för att en ström ska induceras när en magnet finns nära en spole?',
    choices: [
      'Att magneten och spolen är i vila i förhållande till varandra',
      'Att spolen är gjord av koppar och inget annat material',
      'Att magneten eller spolen rör sig i förhållande till den andra (relativ rörelse)',
      'Att strömmen i spolen redan är påslagen innan magneten närmar sig',
    ],
    correct: 2,
    why: [
      'Enligt demonstrationen ger en stillastående magnet i en stillastående spole inget utslag alls — det krävs relativ rörelse.',
      'Vilket ledande material spolen är gjord av spelar ingen roll för själva induktionsprincipen som beskrivs här.',
      'Demonstrationen visar att en ström bara induceras när magnet och spole rör sig i förhållande till varandra — är båda stilla uppstår inget utslag.',
      'Spolen har ingen egen ström från början i den här typen av demonstration — det är just den inducerade strömmen som mäts.',
    ],
  },
  {
    question: 'Vad kallas den spänning som uppstår när en ledare rör sig i ett magnetfält?',
    choices: [
      'Coulombspänning',
      'Inducerad spänning (ems), betecknad *e*',
      'Kapacitiv spänning',
      'Reaktiv spänning',
    ],
    correct: 1,
    why: [
      'Coulombspänning är inget begrepp som används här — Coulombs lag handlar om kraften mellan laddningar i vila.',
      'Spänningen som uppstår när en ledare rör sig i ett magnetfält kallas inducerad spänning eller ems (elektromotorisk spänning) och betecknas *e*.',
      'Kapacitiv spänning hör ihop med kondensatorer, inte med rörelseinducerad spänning i en ledare.',
      'Reaktiv spänning är inget begrepp som introduceras i det här avsnittet.',
    ],
  },
  {
    question: 'Vilket samband gäller för den inducerade spänningen i en rak ledare, då *l*, *v* och *B* är vinkelräta mot varandra?',
    choices: [
      '$e = l \\cdot v \\cdot B$',
      '$e = B \\cdot I \\cdot l$',
      '$e = q \\cdot v \\cdot B$',
      '$e = k \\cdot \\frac{I}{d}$',
    ],
    correct: 0,
    why: [
      'Induktionslagen för en rak ledare ger $e = l \\cdot v \\cdot B$, där *l* är ledarens längd, *v* dess hastighet och *B* flödestätheten.',
      'Den formeln ger kraften på en strömförande ledare i ett magnetfält, inte den inducerade spänningen.',
      'Den formeln ($F = q \\cdot v \\cdot B$) ger den magnetiska kraften på en enskild laddning, inte en spänning.',
      'Den formeln ger flödestätheten runt en rak ledare, inte en inducerad spänning.',
    ],
  },
  {
    question: 'I härledningen av induktionslagen sätts den elektriska kraften $F_\\mathrm{e}$ lika med den magnetiska kraften $F_\\mathrm{m}$ vid jämvikt. Vad händer med elektronrörelsen i ledaren när detta jämviktsläge nås?',
    choices: [
      'Elektronerna accelererar ytterligare',
      'Elektronerna byter riktning permanent',
      'Ledaren tappar all sin laddning',
      'Elektronrörelsen upphör eftersom krafterna tar ut varandra',
    ],
    correct: 3,
    why: [
      'När $F_\\mathrm{e} = F_\\mathrm{m}$ är nettokraften på elektronerna noll, så de accelererar inte vidare.',
      'Elektronerna byter inte riktning — de slutar helt enkelt röra sig tvärs över ledaren när krafterna balanserar varandra.',
      'Ledaren förlorar ingen laddning totalt sett — det är bara en omfördelning av elektroner mellan ledarens ändar som ger upphov till spänningen.',
      'När den elektriska kraften blir lika stor som den magnetiska kraften uppstår kraftjämvikt, och elektronrörelsen tvärs över ledaren upphör.',
    ],
  },
  {
    question: 'En ledare rör sig i sin egen längdriktning (parallellt med sig själv) genom ett magnetfält, i stället för vinkelrätt mot sig själv. Hur stor blir den inducerade spänningen?',
    choices: [
      'Lika stor som om ledaren rört sig vinkelrätt mot sig själv',
      '0 V, eftersom elektronerna då rör sig längs ledaren och inte tvärs över den',
      'Alltid maximal, oavsett rörelseriktning',
      'Beror bara på fältstyrkan, inte på rörelseriktningen',
    ],
    correct: 1,
    why: [
      'Spänningen blir inte densamma — just riktningen på rörelsen relativt ledaren avgör om en spänning alls induceras.',
      'Rör sig ledaren längs sin egen riktning fördelas ingen kraft tvärs över ledaren, så elektronerna samlas inte vid ena änden — därför blir den inducerade spänningen 0 V.',
      'Spänningen är inte alltid maximal — i det här specialfallet blir den i stället noll.',
      'Rörelseriktningen har stor betydelse: rör sig ledaren parallellt med sig själv induceras ingen spänning alls, oavsett fältstyrka.',
    ],
  },
  {
    question: 'En ledare med längden 0,50 m rör sig med hastigheten 2,0 m/s vinkelrätt genom ett magnetfält på 0,10 T (*l*, *v* och *B* är vinkelräta mot varandra). Beräkna den inducerade spänningen.',
    choices: [
      '$1{,}0\\ \\mathrm{V}$',
      '$0{,}010\\ \\mathrm{V}$',
      '$0{,}10\\ \\mathrm{V}$',
      '$10\\ \\mathrm{V}$',
    ],
    correct: 2,
    why: [
      'Detta är tio gånger för stort jämfört med det korrekta svaret.',
      'Detta är tio gånger för litet jämfört med det korrekta svaret.',
      '$e = l \\cdot v \\cdot B = 0{,}50 \\cdot 2{,}0 \\cdot 0{,}10 = 0{,}10\\ \\mathrm{V}$.',
      'Detta är hundra gånger för stort — kontrollera att alla tre värden multipliceras med rätt tiopotenser.',
    ],
  },
],

// ── 16-fy2-ch3b.js ────────────────────────────────────────────

'fy2-3.8': [
  {
    question: 'Vad säger Lenz lag om riktningen på en inducerad ström?',
    choices: [
      'Den är alltid riktad så att den förstärker orsaken till sin uppkomst',
      'Den är alltid riktad så att den motverkar orsaken till sin uppkomst',
      'Den beror enbart på kretsens resistans, inte på orsaken till induktionen',
      'Den växlar riktning slumpmässigt oavsett orsak',
    ],
    correct: 1,
    why: [
      'Detta är tvärtom — skulle en inducerad ström förstärka sin egen orsak kunde induktionen öka på sig själv utan gräns. Lenz lag säger motsatsen.',
      'Det är precis vad Lenz lag säger: den inducerade strömmen får en sådan riktning att orsaken till dess uppkomst motverkas, till exempel genom att bromsa en rörelse.',
      'Resistansen avgör strömmens storlek via Ohms lag, men det är orsaken till induktionen (rörelsen eller flödesändringen) som avgör strömmens riktning.',
      'Strömriktningen bestäms entydigt av orsakens riktning, inte av slumpen.',
    ],
  },
  {
    question: 'En 0,50 m lång ledare rör sig med farten 4,0 m/s vinkelrätt genom ett magnetfält med flödestätheten 0,10 T. Hur stor blir den inducerade emsen $e$?',
    choices: [
      '$0{,}020\\ \\mathrm{V}$',
      '$2{,}0\\ \\mathrm{V}$',
      '$0{,}20\\ \\mathrm{V}$',
      '$20\\ \\mathrm{V}$',
    ],
    correct: 2,
    why: [
      'Det uppstår om farten av misstag läses som 0,40 m/s i stället för 4,0 m/s.',
      'Det motsvarar att bara $l$ och $v$ multipliceras ($0{,}50 \\cdot 4{,}0 = 2{,}0$) medan flödestätheten $B$ glöms bort.',
      'Med $e = l \\cdot v \\cdot B$ blir $e = 0{,}50 \\cdot 4{,}0 \\cdot 0{,}10 = 0{,}20\\ \\mathrm{V}$.',
      'Det uppstår om flödestätheten av misstag läses som 10 T i stället för 0,10 T.',
    ],
  },
  {
    question: 'En inducerad ems på 0,30 V driver en ström genom en krets med resistansen 0,50 Ω. Hur stor blir strömmen $I$?',
    choices: [
      '$0{,}60\\ \\mathrm{A}$',
      '$0{,}15\\ \\mathrm{A}$',
      '$1{,}7\\ \\mathrm{A}$',
      '$6{,}0\\ \\mathrm{A}$',
    ],
    correct: 0,
    why: [
      'Ohms lag ger $I = \\frac{e}{R} = \\frac{0{,}30}{0{,}50} = 0{,}60\\ \\mathrm{A}$.',
      'Det fås om $e$ och $R$ multipliceras i stället för divideras: $0{,}30 \\cdot 0{,}50 = 0{,}15$.',
      'Det fås om täljare och nämnare byts plats i divisionen: $\\frac{0{,}50}{0{,}30} \\approx 1{,}7$.',
      'Det är tio gånger för stort — kontrollera decimalkommat i divisionen.',
    ],
  },
  {
    question: 'En rak ledare med längden 0,20 m bär strömmen 5,0 A vinkelrätt mot ett magnetfält med flödestätheten 2,0 T. Hur stor blir den magnetiska kraften på ledaren?',
    choices: [
      '$0{,}40\\ \\mathrm{N}$',
      '$1{,}0\\ \\mathrm{N}$',
      '$10\\ \\mathrm{N}$',
      '$2{,}0\\ \\mathrm{N}$',
    ],
    correct: 3,
    why: [
      'Det fås om strömmen $I$ glöms bort och bara $B \\cdot l = 2{,}0 \\cdot 0{,}20$ beräknas.',
      'Det fås om flödestätheten $B$ glöms bort och bara $I \\cdot l = 5{,}0 \\cdot 0{,}20$ beräknas.',
      'Det fås om ledarens längd $l$ glöms bort och bara $B \\cdot I = 2{,}0 \\cdot 5{,}0$ beräknas.',
      'Med $F = B \\cdot I \\cdot l$ blir $F = 2{,}0 \\cdot 5{,}0 \\cdot 0{,}20 = 2{,}0\\ \\mathrm{N}$.',
    ],
  },
  {
    question: 'I demonstrationen med Thomsons ring skjuts en lös aluminiumring iväg när strömmen i spolen slås på. Varför påverkas inte en likadan ring av plast på samma sätt?',
    choices: [
      'Plast är magnetiskt och attraheras nedåt mot spolen i stället för att skjutas uppåt',
      'Plast leder inte ström, så ingen inducerad ström — och därmed inget motriktat magnetfält — kan bildas i ringen',
      'Plast har mycket lägre densitet än aluminium och är därför för lätt för att påverkas',
      'Plastringen smälter direkt av värmen från spolen innan den hinner röra sig',
    ],
    correct: 1,
    why: [
      'Plast är varken magnetiskt eller elektriskt ledande och attraheras inte av spolens fält.',
      'Eftersom plast inte leder ström kan ingen inducerad ström uppstå i ringen. Utan inducerad ström bildas heller inget motriktat magnetfält, så ringen varken repelleras eller skjuts iväg.',
      'En lägre densitet skulle snarare göra ringen lättare att flytta, inte svårare — men det är inte skälet till att den står stilla.',
      'Försöket handlar om en kort strömpuls, inte uppvärmning. Plastringen påverkas helt enkelt inte alls eftersom den inte leder ström.',
    ],
  },
],

'fy2-3.9': [
  {
    question: 'Vad är skillnaden mellan magnetiskt flöde $\\Phi$ och magnetisk flödestäthet $B$?',
    choices: [
      'De är samma storhet, bara olika beteckningar för samma sak beroende på sammanhang',
      '$\\Phi$ anger antalet flödeslinjer genom en area, medan $B$ anger tätheten mellan flödeslinjerna',
      'Enheterna är omvända — $\\Phi$ mäts i tesla (T) och $B$ mäts i weber (Wb)',
      '$\\Phi$ beskriver fältets riktning, medan $B$ beskriver fältets styrka',
    ],
    correct: 1,
    why: [
      'De är två olika storheter med olika enheter (Wb respektive T) och olika betydelse — de kan inte användas omväxlande.',
      'Magnetiskt flöde $\\Phi$ är antalet flödeslinjer som passerar en area, medan flödestätheten $B$ är hur tätt flödeslinjerna ligger.',
      'Det är tvärtom: $\\Phi$ mäts i weber (Wb) och $B$ mäts i tesla (T).',
      'Det är flödestätheten $B$ som är en vektor med riktning och storlek, medan flödet $\\Phi$ är en skalär storhet beräknad utifrån en area.',
    ],
  },
  {
    question: 'Vilken SI-enhet har magnetiskt flöde $\\Phi$?',
    choices: [
      'Tesla (T)',
      'Volt (V)',
      'Weber (Wb)',
      'Ampere (A)',
    ],
    correct: 2,
    why: [
      'Tesla är enheten för magnetisk flödestäthet $B$, inte för magnetiskt flöde.',
      'Volt är enheten för spänning, till exempel den inducerade emsen $e$.',
      'Magnetiskt flöde $\\Phi$ har SI-enheten weber (Wb).',
      'Ampere är enheten för elektrisk ström, en helt annan storhet.',
    ],
  },
  {
    question: 'En area på 0,50 m² är vinkelrät mot ett magnetfält med flödestätheten 0,20 T. Hur stort är det magnetiska flödet genom arean?',
    choices: [
      '$0{,}10\\ \\mathrm{Wb}$',
      '$0{,}70\\ \\mathrm{Wb}$',
      '$2{,}5\\ \\mathrm{Wb}$',
      '$1{,}0\\ \\mathrm{Wb}$',
    ],
    correct: 0,
    why: [
      'Med $\\Phi = B \\cdot A_\\perp$ blir $\\Phi = 0{,}20 \\cdot 0{,}50 = 0{,}10\\ \\mathrm{Wb}$.',
      'Det fås om $B$ och $A$ adderas i stället för multipliceras: $0{,}20 + 0{,}50 = 0{,}70$.',
      'Det fås om arean divideras med flödestätheten i stället för att multipliceras: $\\frac{0{,}50}{0{,}20} = 2{,}5$.',
      'Det uppstår om arean av misstag läses som 5,0 m² i stället för 0,50 m².',
    ],
  },
  {
    question: 'Vad representerar minustecknet i induktionslagen $e = -\\frac{\\Delta \\Phi}{\\Delta t}$?',
    choices: [
      'Att spänningen alltid är negativ i praktiken och aldrig kan mätas som positiv',
      'Att det magnetiska flödet alltid minskar med tiden',
      'Att formeln bara gäller när strömmen avtar',
      'Att den inducerade strömmen, enligt Lenz lag, alltid motverkar den förändring som orsakar den',
    ],
    correct: 3,
    why: [
      'Tecknet på $e$ beror på vald referensriktning och kan bli både positivt och negativt — det säger inget om ett absolut förtecken i verkligheten.',
      'Flödet kan både öka och minska; minustecknet handlar inte om flödets egen förändringsriktning utan om strömmens reaktion på den.',
      'Induktionslagen gäller lika väl när flödet ökar som när det minskar.',
      'Minustecknet är induktionslagens sätt att uttrycka Lenz lag: den inducerade spänningen/strömmen är riktad så att den motverkar flödesändringen som orsakar den.',
    ],
  },
  {
    question: 'Det magnetiska flödet i en spole med 100 varv ökar likformigt med 0,020 Wb på 2,0 s. Hur stort blir beloppet av den inducerade spänningen?',
    choices: [
      '$1{,}0\\ \\mathrm{V}$',
      '$0{,}010\\ \\mathrm{V}$',
      '$2{,}0\\ \\mathrm{V}$',
      '$10\\ \\mathrm{V}$',
    ],
    correct: 0,
    why: [
      'Med $e = N \\cdot \\frac{\\Delta \\Phi}{\\Delta t}$ blir beloppet $e = 100 \\cdot \\frac{0{,}020}{2{,}0} = 1{,}0\\ \\mathrm{V}$.',
      'Det fås om antalet varv $N$ glöms bort och bara $\\frac{\\Delta \\Phi}{\\Delta t} = \\frac{0{,}020}{2{,}0}$ beräknas.',
      'Det fås om man glömmer att dividera med tiden och bara beräknar $N \\cdot \\Delta \\Phi = 100 \\cdot 0{,}020$.',
      'Det uppstår om flödesändringen av misstag läses som 0,20 Wb i stället för 0,020 Wb.',
    ],
  },
  {
    question: 'I en $\\Phi$–$t$-graf ökar flödet likformigt från 0 till 8,0 mWb under de första 4,0 sekunderna och ligger sedan konstant. Hur stor är den inducerade spänningens belopp under de första 4,0 sekunderna?',
    choices: [
      '$32\\ \\mathrm{mV}$',
      '$0{,}50\\ \\mathrm{mV}$',
      '$2{,}0\\ \\mathrm{mV}$',
      '$0\\ \\mathrm{V}$',
    ],
    correct: 2,
    why: [
      'Det fås om flödesändringen och tiden multipliceras i stället för divideras: $8{,}0 \\cdot 4{,}0 = 32$.',
      'Det fås om kvoten tas omvänt: $\\frac{4{,}0}{8{,}0} = 0{,}50$.',
      'Lutningen på grafen ger $e = \\frac{\\Delta \\Phi}{\\Delta t} = \\frac{8{,}0\\ \\mathrm{mWb}}{4{,}0\\ \\mathrm{s}} = 2{,}0\\ \\mathrm{mV}$.',
      'Flödet ändras tvärtom snabbt just under dessa fyra sekunder — det är först därefter, när flödet ligger konstant, som den inducerade spänningen blir noll.',
    ],
  },
],

'fy2-3.10': [
  {
    question: 'Vad kallas det maximala momentana värdet på en växelspänning, och vilken beteckning används?',
    choices: [
      'Effektivspänning, betecknas $U$',
      'Momentanspänning, betecknas $u$',
      'Toppspänning, betecknas $\\hat{u}$',
      'Nätspänning, betecknas $U_0$',
    ],
    correct: 2,
    why: [
      'Effektivspänningen $U$ är ett slags medelvärde för växelspänningen, inte det momentana maxvärdet.',
      'Momentanspänningen $u$ (liten bokstav) anger spänningen vid en godtycklig tidpunkt, inte specifikt maxvärdet.',
      'Det maximala momentana värdet kallas toppspänning och betecknas med cirkumflex, $\\hat{u}$, utläst "u-topp".',
      'Beteckningen $U_0$ används inte i sammanhanget — toppvärden markeras i stället med cirkumflex ($\\hat{u}$, $\\hat{\\imath}$).',
    ],
  },
  {
    question: 'Det svenska elnätet har frekvensen 50 Hz. Hur stor är vinkelhastigheten $\\omega$?',
    choices: [
      '$100\\pi\\ \\mathrm{rad/s}$',
      '$50\\pi\\ \\mathrm{rad/s}$',
      '$25\\pi\\ \\mathrm{rad/s}$',
      '$200\\pi\\ \\mathrm{rad/s}$',
    ],
    correct: 0,
    why: [
      'Med $\\omega = 2\\pi \\cdot f$ blir $\\omega = 2\\pi \\cdot 50 = 100\\pi\\ \\mathrm{rad/s}$.',
      'Det fås om man glömmer faktorn 2 och bara räknar $\\pi \\cdot 50$.',
      'Det fås om frekvensen av misstag halveras innan den sätts in: $2\\pi \\cdot 25$.',
      'Det fås om frekvensen av misstag fördubblas innan insättning: $2\\pi \\cdot 100$.',
    ],
  },
  {
    question: 'En växelspänningskälla har effektivvärdet 100 V. Ungefär hur stor är toppspänningen $\\hat{u}$ ($\\sqrt{2} \\approx 1{,}4$)?',
    choices: [
      '$\\approx 71\\ \\mathrm{V}$',
      '$100\\ \\mathrm{V}$',
      '$\\approx 200\\ \\mathrm{V}$',
      '$\\approx 140\\ \\mathrm{V}$',
    ],
    correct: 3,
    why: [
      'Det fås om man dividerar med $\\sqrt{2}$ i stället för att multiplicera: $\\frac{100}{\\sqrt{2}} \\approx 71$.',
      'Effektivvärdet $U$ och toppvärdet $\\hat{u}$ är olika storheter — de är inte lika stora.',
      'Det fås om man använder faktorn 2 i stället för $\\sqrt{2} \\approx 1{,}4$.',
      'Med $\\hat{u} = \\sqrt{2} \\cdot U$ blir $\\hat{u} = \\sqrt{2} \\cdot 100 \\approx 140\\ \\mathrm{V}$.',
    ],
  },
  {
    question: 'Vilket uttryck beskriver hur momentanspänningen $u$ varierar med tiden i en enkel växelströmsgenerator?',
    choices: [
      '$u = \\hat{u} \\cdot \\cos(\\omega t)$',
      '$u = \\hat{u} \\cdot \\sin(\\omega t)$',
      '$u = U \\cdot \\sin(\\omega t)$',
      '$u = \\hat{u} \\cdot \\omega \\cdot t$',
    ],
    correct: 1,
    why: [
      'Härledningen ger en sinusfunktion, inte en cosinusfunktion, eftersom emsen är proportionell mot $\\sin(\\omega t)$ (den fås som derivatan av flödets $\\cos(\\omega t)$).',
      'Momentanspänningen i en enkel växelströmsgenerator ges av $u = \\hat{u} \\cdot \\sin(\\omega t)$.',
      'Effektivvärdet $U$ ska inte blandas ihop med toppvärdet $\\hat{u}$ i detta uttryck.',
      'Spänningen varierar sinusformat med tiden, inte linjärt.',
    ],
  },
  {
    question: 'Varför induceras en spänning i den roterande slingan i en växelströmsgenerator?',
    choices: [
      'Det magnetiska flödet genom slingan ändras hela tiden eftersom slingans vinkelräta area mot fältet ändras när den roterar',
      'Slingan laddas upp elektrostatiskt av magnetens poler',
      'Strömmen i slingan skapar sitt eget flöde som förstärker sig själv utan gräns',
      'Flödet är konstant, men slingans resistans ändras periodiskt',
    ],
    correct: 0,
    why: [
      'Eftersom $\\Phi = B \\cdot A \\cdot \\cos\\alpha$ och vinkeln $\\alpha$ ändras kontinuerligt när slingan roterar, varierar flödet med tiden — vilket enligt induktionslagen inducerar en spänning.',
      'Induktion beror på ett förändrat magnetiskt flöde, inte på elektrostatisk uppladdning.',
      'En sådan självförstärkning skulle bryta mot energiprincipen — det är i stället det yttre fältets ändring genom rotationen som ger upphov till induktionen.',
      'Resistansen i slingan ändras inte av rotationen; det är den vinkelräta arean mot fältet som varierar.',
    ],
  },
  {
    question: 'Vilken frekvens har det svenska elnätets växelspänning?',
    choices: [
      '$60\\ \\mathrm{Hz}$',
      '$230\\ \\mathrm{Hz}$',
      '$50\\ \\mathrm{Hz}$',
      '$100\\ \\mathrm{Hz}$',
    ],
    correct: 2,
    why: [
      '60 Hz är frekvensen i det amerikanska elnätet, inte det svenska.',
      '230 blandas ofta ihop med den svenska nätspänningen (230 V), men det är inte frekvensen.',
      'Det svenska elnätet har frekvensen 50 Hz (och den effektiva nätspänningen 230 V).',
      '100 Hz är dubbelt så mycket som den verkliga frekvensen.',
    ],
  },
],

'fy2-3.11': [
  {
    question: 'Vilken spole i en transformator ansluts till den ingående (inkommande) spänningen?',
    choices: [
      'Primärspolen',
      'Sekundärspolen',
      'Järnkärnan',
      'Ingen av spolarna — spänningen ansluts direkt till kretsen som ska drivas',
    ],
    correct: 0,
    why: [
      'Primärspolen är den spole som ansluts till den ingående spänningen, till exempel vägguttagets 230 V.',
      'Sekundärspolen är i stället den spole som inducerar den nya spänningen och kopplas till apparaten som ska drivas.',
      'Järnkärnan binder ihop spolarna magnetiskt men är själv ingen spole och ansluts inte till spänningskällan.',
      'Hela poängen med en transformator är att spänningen först induceras via primärspolen, inte att den kopplas förbi den.',
    ],
  },
  {
    question: 'Vilket samband gäller mellan antal varv och spänning i en transformator?',
    choices: [
      '$\\frac{N_1}{N_2} = \\frac{U_2}{U_1}$',
      '$\\frac{N_1}{N_2} = \\frac{U_1}{U_2}$',
      '$N_1 \\cdot U_1 = N_2 \\cdot U_2$',
      '$\\frac{N_1}{U_1} = \\frac{N_2}{U_2}$',
    ],
    correct: 1,
    why: [
      'Kvoten på högerledet är omvänd — det ska vara $\\frac{U_1}{U_2}$, inte $\\frac{U_2}{U_1}$.',
      'Förhållandet mellan antal varv motsvarar förhållandet mellan spänningarna: $\\frac{N_1}{N_2} = \\frac{U_1}{U_2}$.',
      'Detta är en felaktig omskrivning — rätt korsprodukt är $N_1 \\cdot U_2 = N_2 \\cdot U_1$.',
      'Varv och spänning för samma spole ska inte paras ihop på detta sätt — det är kvoterna mellan spolarna som är lika.',
    ],
  },
  {
    question: 'En transformator ska sänka spänningen från 120 V till 12 V. Om sekundärspolen har 100 varv, hur många varv har primärspolen?',
    choices: [
      '$10\\ \\mathrm{varv}$',
      '$100\\ \\mathrm{varv}$',
      '$12\\,000\\ \\mathrm{varv}$',
      '$1\\,000\\ \\mathrm{varv}$',
    ],
    correct: 3,
    why: [
      'Det fås om kvoten $\\frac{U_1}{U_2}$ tas omvänt: $100 \\cdot \\frac{12}{120} = 10$.',
      'Det stämmer bara om spänningen inte alls ändras mellan spolarna, vilket motsäger att transformatorn ska sänka spänningen.',
      'Det fås om man glömmer att dividera med $U_2$ och bara räknar $N_2 \\cdot U_1 = 100 \\cdot 120$.',
      'Med $N_1 = N_2 \\cdot \\frac{U_1}{U_2}$ blir $N_1 = 100 \\cdot \\frac{120}{12} = 1\\,000\\ \\mathrm{varv}$.',
    ],
  },
  {
    question: 'Varför minskar strömmen när spänningen transformeras upp i en transformator?',
    choices: [
      'Transformatorn förbrukar energi, vilket gör att både spänning och ström minskar',
      'Ju fler varv en spole har, desto större resistans får den, vilket alltid sänker strömmen',
      'Effekten $P = U \\cdot I$ är (bortsett från förluster) densamma i primär- och sekundärspolen, så en ökning av $U$ måste ge en minskning av $I$',
      'Strömmen påverkas inte av transformatorn, bara spänningen ändras',
    ],
    correct: 2,
    why: [
      'En ideal transformator förbrukar i princip ingen energi — effekten in är densamma som effekten ut.',
      'Antalet varv i sig avgör spänningsförhållandet, inte spolens resistans, och det är inte anledningen till att strömmen ändras.',
      'Eftersom effekten är oförändrad ($P_1 = P_2$) och $P = U \\cdot I$, måste strömmen minska i samma proportion som spänningen ökar.',
      'Strömförhållandet $\\frac{N_1}{N_2} = \\frac{I_2}{I_1}$ visar tvärtom att strömmen ändras precis som spänningen, fast omvänt.',
    ],
  },
  {
    question: 'En transformator har $N_1 : N_2 = 5 : 1$. Om strömmen i primärspolen är 2,0 A, hur stor är strömmen i sekundärspolen?',
    choices: [
      '$10\\ \\mathrm{A}$',
      '$0{,}40\\ \\mathrm{A}$',
      '$2{,}0\\ \\mathrm{A}$',
      '$5{,}0\\ \\mathrm{A}$',
    ],
    correct: 0,
    why: [
      'Med $\\frac{N_1}{N_2} = \\frac{I_2}{I_1}$ blir $I_2 = \\frac{N_1}{N_2} \\cdot I_1 = 5 \\cdot 2{,}0 = 10\\ \\mathrm{A}$.',
      'Det fås om kvoten tas omvänt: $I_2 = \\frac{I_1}{5} = \\frac{2{,}0}{5}$.',
      'Det stämmer bara om strömmen är oförändrad, vilket motsäger att spänningen (och därmed strömmen) ändras med transformatorn.',
      'Det fås om man bara skriver av varvtalskvoten (5) utan att multiplicera med $I_1$.',
    ],
  },
  {
    question: 'Varför transporteras el ofta med hög spänning i kraftledningar, trots säkerhetsriskerna?',
    choices: [
      'Hög spänning gör att elektronerna rör sig snabbare och når fram tidigare',
      'Vid samma effekt blir strömmen lägre vid hög spänning, vilket minskar energiförlusterna i ledningarna',
      'Hög spänning kräver tunnare kablar oavsett ström, vilket sparar material',
      'Hög spänning omvandlar mer av den elektriska energin direkt till ljus i ledningarna',
    ],
    correct: 1,
    why: [
      'Elektronernas driftfart i en ledare beror inte på spänningen på det sättet, och det är inte skälet till att höga spänningar används vid eltransport.',
      'Eftersom $P = U \\cdot I$ ger en högre spänning en lägre ström vid given effekt, vilket minskar värmeförlusterna i ledningarnas resistans.',
      'Kabeltjockleken avgörs av strömstyrkan, inte enbart av spänningen — en lägre ström (vid hög spänning) tillåter tunnare kablar, men det är strömmen och inte spänningen i sig som är avgörande.',
      'Elenergi i ledningar omvandlas till oönskad värme genom resistansen, inte till ljus.',
    ],
  },
],

'fy2-3.12': [
  {
    question: 'Vad är funktionen hos en hastighetsväljare?',
    choices: [
      'Den mäter partiklars massa direkt utan att behöva känna till hastigheten',
      'Den filtrerar ut laddade partiklar med en bestämd hastighet, bestämd av det elektriska och magnetiska fältets styrka',
      'Den accelererar alla partiklar till samma slutfart oavsett starthastighet',
      'Den separerar partiklar efter deras laddning, oavsett hastighet',
    ],
    correct: 1,
    why: [
      'Det är masspektrometern (som bygger vidare på hastighetsväljaren) som bestämmer massan — och den behöver först känna till hastigheten.',
      'Endast partiklar med hastigheten $v = \\frac{\\mathbb{E}}{B}$ passerar rätlinjigt genom hastighetsväljaren — övriga avböjs och fastnar.',
      'Hastighetsväljaren accelererar inte partiklarna, den filtrerar bara ut de som redan har rätt hastighet.',
      'Filtreringen sker på hastighet, inte direkt på laddningens storlek.',
    ],
  },
  {
    question: 'I en hastighetsväljare passerar partiklar rätlinjigt genom när två krafter är precis lika stora. Vilka krafter är dessa?',
    choices: [
      'Den elektriska kraften $F_\\mathrm{e}$ och den magnetiska kraften $F_\\mathrm{m}$',
      'Tyngdkraften $F_G$ och den elektriska kraften $F_\\mathrm{e}$',
      'Centripetalkraften och tyngdkraften $F_G$',
      'Den magnetiska kraften $F_\\mathrm{m}$ och friktionskraften',
    ],
    correct: 0,
    why: [
      'Partiklar som passerar rätlinjigt gör det när den uppåtriktade elektriska kraften $F_\\mathrm{e} = q \\cdot \\mathbb{E}$ är lika stor som den nedåtriktade magnetiska kraften $F_\\mathrm{m} = q \\cdot v \\cdot B$.',
      'Tyngdkraften på en enskild laddad partikel (till exempel en elektron) är försumbar jämfört med den elektriska och magnetiska kraften.',
      'Centripetalkraft blir relevant först i masspektrometerns cirkulära bana, inte i själva hastighetsväljaren där banan är rak.',
      'Friktion är inte aktuellt för en partikel som rör sig fritt i vakuum mellan plattorna.',
    ],
  },
  {
    question: 'En hastighetsväljare har det elektriska fältet $4{,}0 \\cdot 10^3$ V/m och den magnetiska flödestätheten 0,20 T. Vilken hastighet väljs ut?',
    choices: [
      '$8{,}0 \\cdot 10^{2}\\ \\mathrm{m/s}$',
      '$2{,}0 \\cdot 10^{2}\\ \\mathrm{m/s}$',
      '$2{,}0 \\cdot 10^{3}\\ \\mathrm{m/s}$',
      '$2{,}0 \\cdot 10^{4}\\ \\mathrm{m/s}$',
    ],
    correct: 3,
    why: [
      'Det fås om $\\mathbb{E}$ och $B$ multipliceras i stället för divideras: $4{,}0 \\cdot 10^3 \\cdot 0{,}20 = 8{,}0 \\cdot 10^2$.',
      'Det uppstår om flödestätheten av misstag läses som 20 T i stället för 0,20 T.',
      'Det uppstår om fältstyrkan av misstag läses som $4{,}0 \\cdot 10^2$ V/m i stället för $4{,}0 \\cdot 10^3$ V/m.',
      'Med $v = \\frac{\\mathbb{E}}{B}$ blir $v = \\frac{4{,}0 \\cdot 10^3}{0{,}20} = 2{,}0 \\cdot 10^{4}\\ \\mathrm{m/s}$.',
    ],
  },
  {
    question: 'Vilken formel används för att bestämma en partikels massa med en masspektrometer?',
    choices: [
      '$m = \\frac{v \\cdot r}{q \\cdot B}$',
      '$m = q \\cdot B \\cdot r \\cdot v$',
      '$m = \\frac{q \\cdot B \\cdot r}{v}$',
      '$m = \\frac{q \\cdot v}{B \\cdot r}$',
    ],
    correct: 2,
    why: [
      'Täljare och nämnare är omvända jämfört med det korrekta uttrycket.',
      'Här multipliceras alla storheter, men hastigheten $v$ ska stå i nämnaren, inte som en faktor i täljaren.',
      'Masspektrometerns formel för massan är $m = \\frac{q \\cdot B \\cdot r}{v}$.',
      'Här har $B$ och $r$ bytt plats jämfört med det korrekta uttrycket.',
    ],
  },
  {
    question: 'Vilken kraft agerar som centripetalkraft när en partikel rör sig i den cirkulära banan i en masspektrometer?',
    choices: [
      'Den elektriska kraften $F_\\mathrm{e}$',
      'Den magnetiska kraften $F_\\mathrm{m}$',
      'Tyngdkraften $F_G$',
      'En kombination av elektrisk och magnetisk kraft i lika delar',
    ],
    correct: 1,
    why: [
      'I masspektrometerns cirkulära bana finns inget elektriskt fält kvar — partikeln har redan lämnat hastighetsväljarens plattor.',
      'Efter hastighetsväljaren påverkas partikeln enbart av magnetfältet, och den magnetiska kraften $F_\\mathrm{m} = q \\cdot v \\cdot B$ utgör då centripetalkraften som böjer banan till en cirkel.',
      'Tyngdkraften på en laddad partikel är försumbar jämfört med den magnetiska kraften i detta sammanhang.',
      'Det elektriska fältet finns bara kvar i hastighetsväljaren, inte i den del av masspektrometern där banan böjs.',
    ],
  },
],

'fy2-3.13': [
  {
    question: 'Vad är virvelströmmar?',
    choices: [
      'Cirkulerande inducerade strömmar som enligt Lenz lag motverkar orsaken till sin uppkomst, till exempel en rörelse eller en flödesändring',
      'Strömmar som alltid flyter i en rak linje genom en ledare',
      'Strömmar som bara uppstår i supraledare vid mycket låg temperatur',
      'Strömmar som förstärker den rörelse eller flödesändring som orsakar dem',
    ],
    correct: 0,
    why: [
      'Virvelströmmar är just cirkulerande ("virvlande") inducerade strömmar som enligt Lenz lag motverkar sin egen orsak.',
      'Namnet "virvelström" kommer av att strömmen cirkulerar i virvlar, inte flyter rakt genom en ledare.',
      'Virvelströmmar uppstår i vanliga metaller (till exempel aluminium och koppar) vid rumstemperatur, inte bara i supraledare.',
      'Enligt Lenz lag motverkar virvelströmmar alltid orsaken till sin uppkomst, aldrig förstärker den.',
    ],
  },
  {
    question: 'I demonstrationen med aluminiumpendeln som svänger genom ett magnetfält bromsas pendeln kraftigt. Vad händer när pendeln byts ut mot en likadan pendel med spår (uppskuren)?',
    choices: [
      'Bromsningen blir kraftigare, eftersom spåren ökar resistansen i hela plattan',
      'Ingen skillnad märks, eftersom magnetfältet är oförändrat',
      'Den bromsande effekten minskar, eftersom virvelströmmarna inte längre kan cirkulera lika fritt',
      'Pendeln accelererar i stället för att bromsas, eftersom strömriktningen vänds',
    ],
    correct: 2,
    why: [
      'Spåren gör tvärtom att strömmarna hindras från att cirkulera fritt, vilket minskar (inte ökar) den bromsande effekten.',
      'Magnetfältet är visserligen oförändrat, men pendelns förmåga att bilda fria virvelströmmar ändras av spåren, vilket ger en tydligt märkbar skillnad.',
      'Spåren bryter upp de slutna banor virvelströmmarna annars skulle cirkulera i, så den bromsande kraften blir mindre.',
      'Lenz lag gör att den inducerade strömmen alltid motverkar rörelsen, aldrig förstärker den — pendeln kan alltså inte accelerera av detta.',
    ],
  },
  {
    question: 'Vilket av följande är ett exempel på en önskad tillämpning av virvelströmmar?',
    choices: [
      'Uppvärmning av kärnan i en transformator, vilket slösar energi',
      'Induktionsspisen, som värmer upp kokkärlets botten med hjälp av virvelströmmar',
      'Uppvärmning av motorlindningar i en elmotor, vilket sänker verkningsgraden',
      'Störningar i elektroniska mätinstrument orsakade av yttre magnetfält',
    ],
    correct: 1,
    why: [
      'Virvelströmmar i en transformatorkärna är en oönskad energiförlust, inte en avsedd tillämpning.',
      'Induktionsspisen är ett exempel på en önskad tillämpning — virvelströmmar i kokkärlets botten ger just den värme man vill åstadkomma.',
      'Virvelströmmar i en elmotors lindningar är en oönskad förlust som sänker verkningsgraden.',
      'Störningar i mätinstrument är en oönskad bieffekt, inte en avsiktlig användning.',
    ],
  },
  {
    question: 'Varför måste en kastrull vara av magnetiskt material för att fungera på en induktionshäll?',
    choices: [
      'Magnetiska material leder värme bättre och blir därför varmare',
      'Induktionshällen kräver en magnetisk kastrull för att inte själv bli varm',
      'Icke-magnetiska kastruller smälter av den höga frekvensen',
      'Metallen måste kunna "känna av" det snabbt växlande magnetfältet så att virvelströmmar induceras i kokkärlets botten',
    ],
    correct: 3,
    why: [
      'Värmeledningsförmåga hos metallen är inte skälet — det handlar om att fältet ska kunna inducera strömmar i materialet.',
      'Det är tvärtom hällens funktion att kastrullens botten själv blir varm genom virvelströmmarna — inte hällen.',
      'Frekvensen (omkring 50 kHz) är inte tillräckligt hög för att smälta metall; problemet med en icke-magnetisk kastrull är i stället att den inte induceras alls.',
      'För att virvelströmmar (och därmed värme) ska induceras måste kokkärlets material vara magnetiskt så att det påverkas av det snabbt växlande magnetfältet.',
    ],
  },
  {
    question: 'En metallplatta rör sig genom ett magnetfält och virvelströmmar induceras i den. Vilken effekt har detta på plattans rörelse?',
    choices: [
      'Virvelströmmarna accelererar plattan i rörelseriktningen',
      'Virvelströmmarna skapar ett magnetfält som bromsar plattans rörelse',
      'Virvelströmmarna har ingen effekt på plattans rörelse, bara på dess temperatur',
      'Virvelströmmarna får plattan att rotera runt sin egen axel',
    ],
    correct: 1,
    why: [
      'Enligt Lenz lag motverkar den inducerade strömmens magnetfält alltid rörelsen, aldrig förstärker den.',
      'De inducerade virvelströmmarna skapar ett magnetfält som enligt Lenz lag motverkar plattans rörelse genom fältet, vilket bromsar den.',
      'Bromsningen är en direkt mekanisk effekt på rörelsen (en kraft), inte enbart en uppvärmning.',
      'Effekten är en bromskraft i rörelseriktningen, inte ett vridmoment som ger rotation.',
    ],
  },
],

'fy2-3.14': [
  {
    question: 'Vad kallas det fenomen att en strömförande ledare får en spänning vinkelrätt mot strömriktningen när den placeras i ett magnetfält?',
    choices: [
      'Halleffekten',
      'Induktionslagen',
      'Lenz lag',
      'Virvelströmseffekten',
    ],
    correct: 0,
    why: [
      'Fenomenet att en strömförande ledare i ett magnetfält får en spänning vinkelrät mot strömriktningen kallas Halleffekten, och spänningen kallas Hallspänning.',
      'Induktionslagen beskriver hur en spänning induceras av en flödesändring — ett annat samband än det som ger upphov till Hallspänningen.',
      'Lenz lag handlar om riktningen på inducerade strömmar, inte om spänningen som uppstår tvärs en strömförande platta i ett magnetfält.',
      'Virvelströmmar är cirkulerande strömmar i ett material — ett annat fenomen än den tvärgående spänning som Halleffekten ger upphov till.',
    ],
  },
  {
    question: 'Vilket samband ger Hallspänningen $U$ i en magnetfältsmätare, uttryckt i elektronernas hastighet $v$, plattans bredd $d$ och flödestätheten $B$?',
    choices: [
      '$U = \\frac{v \\cdot B}{d}$',
      '$U = v \\cdot d \\cdot B$',
      '$U = \\frac{d}{v \\cdot B}$',
      '$U = v + d + B$',
    ],
    correct: 1,
    why: [
      'Här divideras med $d$ i stället för att multipliceras med det.',
      'Hallspänningen ges av $U = v \\cdot d \\cdot B$, där $v$ är elektronernas hastighet, $d$ plattans bredd och $B$ flödestätheten.',
      'Detta är en helt omvänd kvot jämfört med det korrekta uttrycket.',
      'Storheterna ska multipliceras, inte adderas — och de har dessutom olika enheter, så en summa vore inte fysikaliskt meningsfull.',
    ],
  },
  {
    question: 'I en Halleffektsensor uppstår en viss spänning $U$ över plattans kanter när:',
    choices: [
      'strömmen genom plattan har upphört helt',
      'magnetfältet är riktat parallellt med strömriktningen',
      'jämvikt har uppnåtts mellan den magnetiska kraften $F_\\mathrm{m}$ och den elektriska kraften $F_\\mathrm{e}$ på elektronerna',
      'plattans bredd $d$ är noll',
    ],
    correct: 2,
    why: [
      'Utan ström genom plattan skulle det inte finnas några rörliga laddningar att avböja, och ingen Hallspänning skulle alls uppstå.',
      'Om fältet vore parallellt med strömriktningen skulle elektronerna inte påverkas av någon sidledes riktad magnetisk kraft, och ingen Hallspänning skulle bildas.',
      'Hallspänningen uppstår när elektronerna, som från början avböjs åt sidan av den magnetiska kraften, laddar upp kanterna tills den elektriska kraften balanserar den magnetiska.',
      'En bredd på noll är fysikaliskt orimlig för en verklig platta och ger inget meningsfullt villkor för spänningen.',
    ],
  },
  {
    question: 'Magnetfältsmätaren har uppmätt Hallspänningen $U$ och känner till elektronernas hastighet $v$ och plattans bredd $d$. Hur beräknas den magnetiska flödestätheten $B$?',
    choices: [
      '$B = \\frac{U}{v}$',
      '$B = \\frac{U}{d}$',
      '$B = U \\cdot v \\cdot d$',
      '$B = \\frac{U}{v \\cdot d}$',
    ],
    correct: 3,
    why: [
      'Det motsvarar att plattans bredd $d$ glöms bort i nämnaren.',
      'Det motsvarar att elektronernas hastighet $v$ glöms bort i nämnaren.',
      'Det fås om täljare och nämnare byts plats, det vill säga om man multiplicerar i stället för att dividera.',
      'Ur $U = v \\cdot d \\cdot B$ löses $B$ ut som $B = \\frac{U}{v \\cdot d}$.',
    ],
  },
],

// ── 17-fy2-ch4.js ─────────────────────────────────────────────

'fy2-4.1': [
  {
    question: 'Vad är det som svänger i en elektromagnetisk våg, och hur är svängningarna riktade?',
    choices: [
      'Bara det elektriska fältet svänger, det magnetiska fältet är konstant.',
      'Det elektriska fältet och luftens densitet svänger i takt.',
      'Det elektriska och det magnetiska fältet svänger i fas, vinkelrätt mot varandra och mot utbredningsriktningen.',
      'Det elektriska och magnetiska fältet svänger i motfas (180° fasskillnad) och är parallella med utbredningsriktningen.',
    ],
    correct: 2,
    why: [
      'Både det elektriska och det magnetiska fältet svänger — inget av dem är konstant.',
      'En elektromagnetisk våg behöver inget medium som luft för att utbreda sig; det är fälten, inte luftens densitet, som svänger.',
      'Det elektriska och magnetiska fältet svänger i fas och vinkelrätt både mot varandra och mot vågens utbredningsriktning, precis som i figuren i genomgången.',
      'Fälten svänger i fas (inte i motfas) och är vinkelräta mot utbredningsriktningen (inte parallella med den).',
    ],
  },
  {
    question: 'Vilket samband gäller mellan ljusets frekvens *f*, våglängd *λ* och ljushastigheten *c*?',
    choices: [
      '$f = \\lambda \\cdot c$',
      '$f = \\frac{c}{\\lambda}$',
      '$\\lambda = f \\cdot c$',
      '$f = c - \\lambda$',
    ],
    correct: 1,
    why: [
      'Att multiplicera *c* och *λ* ger inte en frekvens — testa att sätta in enheterna (m/s gånger m blir inte 1/s).',
      'Ljusets frekvens fås genom $f = \\frac{c}{\\lambda}$, precis som i genomgången.',
      'Detta beskriver inte sambandet mellan våglängd, frekvens och hastighet korrekt — testa att sätta in enheter så ser du att det inte stämmer.',
      'Frekvens och våglängd kan inte subtraheras meningsfullt från ljusets hastighet — sambandet är en kvot, inte en differens.',
    ],
  },
  {
    question: 'Vilken av följande typer av strålning har kortast våglängd (och därmed högst energi)?',
    choices: [
      'Radiovågor',
      'Infrarött ljus',
      'Synligt ljus',
      'Ultraviolett ljus',
    ],
    correct: 3,
    why: [
      'Radiovågor har den längsta våglängden av alternativen och därmed lägst energi.',
      'Infrarött ljus har längre våglängd (och lägre energi) än synligt ljus.',
      'Synligt ljus har kortare våglängd än infrarött men längre våglängd än ultraviolett.',
      'Ultraviolett ljus har kortast våglängd av alternativen och därmed högst energi — kortare våglängd ger alltid högre energi.',
    ],
  },
  {
    question: 'En ficklampa lyser med effekten 2,0 W jämnt fördelat över en yta med arean 4,0 m². Vad blir ljusintensiteten på ytan?',
    choices: ['2,0 W/m²', '0,5 W/m²', '8,0 W/m²', '0,25 W/m²'],
    correct: 1,
    why: [
      'Detta är bara ficklampans effekt *P* — kom ihåg att intensiteten fås genom att dela effekten med ytans area, inte bara läsa av *P*.',
      'Ljusintensiteten fås genom $I = \\frac{P}{A} = \\frac{2{,}0}{4{,}0} = 0{,}5$ W/m².',
      'Detta fås om man av misstag multiplicerar effekten med arean istället för att dela.',
      'Kontrollera uträkningen — division av 2,0 med 4,0 ger 0,5, inte 0,25.',
    ],
  },
  {
    question: 'Om avståndet till en punktformig ljuskälla fördubblas, vad händer med ljusintensiteten?',
    choices: [
      'Den halveras.',
      'Den fyrdubblas.',
      'Den minskar till en fjärdedel.',
      'Den är oförändrad.',
    ],
    correct: 2,
    why: [
      'Intensiteten beror på avståndet i kvadrat, inte linjärt, så den minskar mer än bara en halvering.',
      'Intensiteten minskar när avståndet ökar — den ökar inte.',
      'Eftersom $I = \\frac{P}{4\\pi \\cdot r^{2}}$ ger en fördubbling av *r* en area som är fyra gånger så stor, och alltså en intensitet som är en fjärdedel så stor.',
      'Intensiteten beror starkt av avståndet — den ändras kraftigt när *r* ändras.',
    ],
  },
],

'fy2-4.2': [
  {
    question: 'Vad kännetecknar koherent ljus?',
    choices: [
      'Ljus av blandade våglängder, som från en glödlampa.',
      'Ljus av samma våglängd och i fas, som från en laser.',
      'Ljus av samma våglängd men inte nödvändigtvis i fas.',
      'Ljus som endast består av rött ljus.',
    ],
    correct: 1,
    why: [
      'Det beskriver istället icke-koherent ljus.',
      'Koherent ljus har samma våglängd och är i fas, vilket är typiskt för laserljus.',
      'Det beskrivs istället som monokromatiskt ljus i genomgången.',
      'Färgen (våglängden) i sig avgör inte om ljuset är koherent — det handlar om fas, inte om vilken färg det är.',
    ],
  },
  {
    question: 'Vad händer med diffraktionen (krökningen av ljuset) när en spalt görs smalare?',
    choices: [
      'Ingen skillnad, spaltens bredd påverkar inte krökningen.',
      'Ju smalare spalt desto mindre krökning av ljuset.',
      'Ju smalare spalt desto större krökning av ljuset.',
      'Ljuset slutar bete sig som en våg vid smala spalter.',
    ],
    correct: 2,
    why: [
      'Spaltens bredd påverkar tvärtom krökningseffekten (diffraktionen) tydligt.',
      'Det är tvärtom — en smalare spalt ger större krökning, inte mindre.',
      'Ju smalare spalten är, desto större blir diffraktionen (krökningen) vid kanterna.',
      'Diffraktion är just ett bevis på att ljus beter sig som en våg, inte tvärtom.',
    ],
  },
  {
    question: 'Vilken är gitterformeln för att beräkna i vilka riktningar ljuset förstärks vid ett gitter?',
    choices: [
      '$n \\cdot \\lambda = d \\cdot \\sin\\alpha_n$',
      '$n \\cdot d = \\lambda \\cdot \\sin\\alpha_n$',
      '$\\lambda = n \\cdot d \\cdot \\sin\\alpha_n$',
      '$n \\cdot \\lambda = \\frac{d}{\\sin\\alpha_n}$',
    ],
    correct: 0,
    why: [
      'Detta är gitterformeln precis som i genomgången: $n \\cdot \\lambda = d \\cdot \\sin\\alpha_n$.',
      'Här har *d* och *λ* bytt plats jämfört med den korrekta formeln.',
      'Detta ger en extra faktor *n* framför våglängden som inte hör hemma där.',
      '*d* ska multipliceras med $\\sin\\alpha_n$, inte divideras med det.',
    ],
  },
  {
    question: 'Vad kallas avståndet mellan varje spalt i ett gitter?',
    choices: [
      'Antalet spalter i gittret.',
      'Avståndet mellan varje spalt i gittret.',
      'Vinkeln till första ordningens maximum.',
      'Ljusets våglängd genom gittret.',
    ],
    correct: 1,
    why: [
      'Det beskriver antalet spalter, inte gitterkonstanten.',
      'Gitterkonstanten är just avståndet mellan varje spalt, betecknat *d* i gitterformeln.',
      'Det är avböjningsvinkeln $\\alpha_n$, inte gitterkonstanten.',
      'Våglängden betecknas *λ* och är en egen storhet, skild från gitterkonstanten.',
    ],
  },
  {
    question: 'Ett gitter har spaltavståndet $d = 2{,}0 \\cdot 10^{-6}$ m. Första ordningens maximum ($n = 1$) bildas vid avböjningsvinkeln $30^\\circ$. Bestäm ljusets våglängd.',
    choices: ['500 nm', '2000 nm', '1000 nm', '0,5 nm'],
    correct: 2,
    why: [
      'Detta är hälften av rätt svar — kontrollera att du multiplicerar *d* med $\\sin\\alpha$ och inte glömmer en faktor.',
      'Detta fås om man glömmer att multiplicera med $\\sin 30^\\circ = 0{,}5$ och bara använder *d* rakt av.',
      'Ur gitterformeln $\\lambda = \\frac{d \\cdot \\sin\\alpha_n}{n} = \\frac{2{,}0 \\cdot 10^{-6} \\cdot 0{,}5}{1} = 1{,}0 \\cdot 10^{-6}$ m $= 1000$ nm.',
      'Här har enhetsomvandlingen från meter till nanometer blivit fel (en faktor $10^{9}$ för liten).',
    ],
  },
],

'fy2-4.3': [
  {
    question: 'Vad kännetecknar ett föremål som är absolut svart?',
    choices: [
      'Ett föremål som reflekterar all infallande strålning.',
      'Ett föremål som absorberar all infallande strålning.',
      'Ett föremål som varken absorberar eller strålar ut energi.',
      'Ett föremål som bara strålar ut infraröd strålning.',
    ],
    correct: 1,
    why: [
      'Det är tvärtom — en spegelblank yta som reflekterar allt är motsatsen till en absolut svart kropp.',
      'En absolut svart kropp absorberar all infallande strålning, oavsett våglängd.',
      'En absolut svart kropp både absorberar och (om den är varm) strålar ut energi mycket effektivt.',
      'Vilken typ av strålning som sänds ut beror på temperaturen, inte på om kroppen är absolut svart.',
    ],
  },
  {
    question: 'Hur hänger ett föremåls absorptionsförmåga ihop med dess strålningsförmåga?',
    choices: [
      'En kropp med stor absorptionsförmåga har alltid liten strålningsförmåga.',
      'Absorptionsförmåga och strålningsförmåga är helt orelaterade.',
      'En kropp med stor absorptionsförmåga har också stor strålningsförmåga.',
      'Bara blanka, ljusa ytor har stor strålningsförmåga.',
    ],
    correct: 2,
    why: [
      'Det är tvärtom enligt genomgången — de hänger ihop positivt, inte negativt.',
      'De är tvärtom kopplade till varandra: god absorption innebär också god emission.',
      'En yta som är bra på att absorbera strålning är också bra på att sända ut den, precis som med värmeledningsförmåga.',
      'Det är tvärtom — matta, mörka ytor har störst strålningsförmåga, inte blanka och ljusa.',
    ],
  },
  {
    question: 'Vilket samband beskrivs av Wiens förskjutningslag?',
    choices: [
      '$\\lambda_\\mathrm{max} \\cdot T = 2{,}8978 \\cdot 10^{-3}$ m·K',
      '$\\lambda_\\mathrm{max} + T = 2{,}8978 \\cdot 10^{-3}$ m·K',
      '$\\frac{\\lambda_\\mathrm{max}}{T} = 2{,}8978 \\cdot 10^{-3}$ m·K',
      '$\\lambda_\\mathrm{max} \\cdot T^{2} = 2{,}8978 \\cdot 10^{-3}$ m·K',
    ],
    correct: 0,
    why: [
      'Detta är Wiens förskjutningslag precis som i genomgången — produkten av $\\lambda_\\mathrm{max}$ och *T* är konstant.',
      'Sambandet är en produkt, inte en summa, av $\\lambda_\\mathrm{max}$ och *T*.',
      'Sambandet är en produkt, inte en kvot — annars skulle högre temperatur ge en längre toppvåglängd, vilket är fel.',
      'Temperaturen ska inte kvadreras i Wiens lag — det är Stefan–Boltzmanns lag som innehåller $T^{4}$.',
    ],
  },
  {
    question: 'Om temperaturen hos en svart kropp fördubblas, hur förändras emittansen $M$ enligt Stefan–Boltzmanns lag?',
    choices: [
      'Den fördubblas.',
      'Den fyrdubblas.',
      'Den blir 16 gånger så stor.',
      'Den är oförändrad.',
    ],
    correct: 2,
    why: [
      'Emittansen beror på $T^{4}$, inte linjärt på *T*, så en fördubbling av temperaturen ger mer än en fördubbling.',
      'Fyrdubbling motsvarar $T^{2}$, men Stefan–Boltzmanns lag har $T^{4}$.',
      'Enligt $M = \\sigma \\cdot T^{4}$ ger en fördubbling av *T* en emittans som är $2^{4} = 16$ gånger så stor.',
      'Emittansen beror starkt på temperaturen — den förändras kraftigt när *T* ändras.',
    ],
  },
  {
    question: 'Hur förändras våglängden med störst emittans, $\\lambda_\\mathrm{max}$, när temperaturen hos en svart kropp ökar?',
    choices: [
      '$\\lambda_\\mathrm{max}$ ökar med temperaturen.',
      '$\\lambda_\\mathrm{max}$ minskar med temperaturen.',
      '$\\lambda_\\mathrm{max}$ är oberoende av temperaturen.',
      '$\\lambda_\\mathrm{max}$ är alltid noll.',
    ],
    correct: 1,
    why: [
      'Det är tvärtom — en varmare kropp har sin topp vid en kortare våglängd, inte en längre.',
      'Ju högre temperatur, desto kortare blir toppvåglängden, precis som diagrammet i genomgången visar och som Wiens lag beskriver.',
      'Wiens förskjutningslag visar just att $\\lambda_\\mathrm{max}$ beror på temperaturen.',
      '$\\lambda_\\mathrm{max}$ är ett bestämt, positivt värde vid varje temperatur — aldrig noll för en kropp med given temperatur.',
    ],
  },
],

'fy2-4.4': [
  {
    question: 'Hur definieras brytningsindex *n* för ett ämne?',
    choices: [
      '$n = \\frac{v}{c}$',
      '$n = c \\cdot v$',
      '$n = \\frac{c}{v}$',
      '$n = c - v$',
    ],
    correct: 2,
    why: [
      'Detta är brytningsindex upp och ner — det ska vara ljushastigheten i vakuum delat med hastigheten i ämnet, inte tvärtom.',
      'Att multiplicera *c* och *v* ger inte det dimensionslösa tal som brytningsindex ska vara.',
      'Brytningsindex definieras som $n = \\frac{c}{v}$, förhållandet mellan ljushastigheten i vakuum och i ämnet.',
      'En differens mellan två hastigheter ger inte det dimensionslösa talet som brytningsindex är.',
    ],
  },
  {
    question: 'Vad innebär det att ett medium har ett högre brytningsindex än ett annat?',
    choices: [
      'Ett medium med lägre brytningsindex är optiskt tätare.',
      'Ett medium med högre brytningsindex är optiskt tätare.',
      'Optisk täthet har inget samband med brytningsindex.',
      'Alla genomskinliga medier är lika optiskt täta.',
    ],
    correct: 1,
    why: [
      'Det är tvärtom — lägre brytningsindex betyder optiskt tunnare, inte tätare.',
      'Ju högre brytningsindex, desto optiskt tätare är mediet — till exempel är glas ($n = 1{,}52$) tätare än vatten ($n = 1{,}33$).',
      'Brytningsindex är just det tal som avgör hur optiskt tätt ett medium är.',
      'Olika medier har olika brytningsindex, till exempel vatten 1,33 och diamant 2,42, och är alltså olika optiskt täta.',
    ],
  },
  {
    question: 'Vilken formel är brytningslagen för ljus (Snells lag)?',
    choices: [
      '$n_1 \\cdot \\sin i = n_2 \\cdot \\sin b$',
      '$n_1 \\cdot \\sin b = n_2 \\cdot \\sin i$',
      '$n_1 + \\sin i = n_2 + \\sin b$',
      '$\\sin i = \\sin b$',
    ],
    correct: 0,
    why: [
      'Detta är Snells lag precis som i genomgången: $n_1 \\cdot \\sin i = n_2 \\cdot \\sin b$.',
      'Här har infallsvinkeln *i* och brytningsvinkeln *b* bytt plats i formeln.',
      'Sambandet mellan brytningsindex och vinklar är produkter, inte summor.',
      'Detta stämmer bara om $n_1 = n_2$ — annars är vinklarna olika stora, vilket är själva poängen med brytning.',
    ],
  },
  {
    question: 'En ljusstråle går från ett optiskt tunnare medium (t.ex. luft) till ett optiskt tätare medium (t.ex. glas). Hur bryts strålen?',
    choices: [
      'Ljuset bryts från normalen.',
      'Ljuset bryts mot normalen.',
      'Ljuset fortsätter helt rakt utan att byta riktning.',
      'Ljuset reflekteras helt och bryts inte alls.',
    ],
    correct: 1,
    why: [
      'Det är tvärtom när ljuset går till ett tätare medium — det bryts mot normalen, inte från den.',
      'En ljusstråle som går från ett optiskt tunnare till ett optiskt tätare medium bryts mot normalen, till exempel från luft till glas.',
      'Ljuset fortsätter rakt igenom bara om infallsvinkeln är $0^\\circ$.',
      'Ljuset både bryts och reflekteras delvis vid gränsytan — det försvinner inte helt in i reflektionen.',
    ],
  },
  {
    question: 'En ljusstråle går från luft ($n_1 = 1{,}0$) till vatten ($n_2 = 1{,}33$) med en infallsvinkel så att $\\sin i = 0{,}665$. Vad blir $\\sin b$?',
    choices: ['0,886', '1,33', '0,332', '0,5'],
    correct: 3,
    why: [
      'Detta fås om man råkar multiplicera $n_2$ med $\\sin i$ istället för att dela med $n_2$.',
      '$\\sin b$ kan aldrig bli större än 1, så detta svar är inte fysikaliskt rimligt.',
      'Detta är hälften av rätt svar — kontrollera uträkningen $\\frac{1{,}0 \\cdot 0{,}665}{1{,}33}$ igen.',
      'Ur Snells lag: $\\sin b = \\frac{n_1 \\cdot \\sin i}{n_2} = \\frac{1{,}0 \\cdot 0{,}665}{1{,}33} = 0{,}5$.',
    ],
  },
],

'fy2-4.5': [
  {
    question: 'Varför kan den fotoelektriska effekten inte förklaras enbart genom att se ljus som en våg?',
    choices: [
      'Eftersom starkt synligt ljus borde kunna slå ut elektroner om ljus vore enbart en våg, vilket inte observeras.',
      'Eftersom UV-ljus har för låg frekvens för att vara en våg.',
      'Eftersom vågor inte kan färdas genom vakuum.',
      'Eftersom elektroner inte kan påverkas av elektromagnetiska fält.',
    ],
    correct: 0,
    why: [
      'Om ljus enbart vore en våg borde starkt (energirikt) synligt ljus kunna slå ut elektroner precis som UV-ljus, men det sker inte — det krävs fotoner med tillräckligt hög energi per foton.',
      'UV-ljus har tvärtom hög frekvens (kort våglängd) jämfört med synligt ljus.',
      'Elektromagnetiska vågor färdas utmärkt genom vakuum — det är just så solljus når jorden.',
      'Elektroner påverkas mycket riktigt av elektromagnetiska fält — det är grunden för hela fenomenet.',
    ],
  },
  {
    question: 'Vilken formel ger energin hos en foton?',
    choices: [
      '$E = h \\cdot f$',
      '$E = \\frac{h}{f}$',
      '$E = h + f$',
      '$E = f - h$',
    ],
    correct: 0,
    why: [
      'Fotonens energi ges av $E = h \\cdot f$ (eller likvärdigt $E = \\frac{h \\cdot c}{\\lambda}$).',
      'Sambandet är en produkt, inte en kvot, mellan Plancks konstant och frekvensen.',
      'Energi, konstant och frekvens hänger ihop via multiplikation, inte addition.',
      'En differens mellan konstanten *h* och frekvensen *f* ger inte en meningsfull energi.',
    ],
  },
  {
    question: 'Vad kallas den energi som krävs för att en elektron ska kunna lämna en metallyta?',
    choices: [
      'Den energi en elektron får efter att ha lämnat metallytan.',
      'Den energi som krävs för att en elektron ska kunna lämna metallytan.',
      'Fotonens totala energi innan kollisionen.',
      'Rörelsemängden hos den utslagna elektronen.',
    ],
    correct: 1,
    why: [
      'Det beskriver istället elektronens rörelseenergi $E_\\mathrm{k}$ efter att den lämnat ytan.',
      'Utträdesarbetet $W_\\mathrm{u}$ är just den energi som krävs för att elektronen ska kunna lämna metallytan.',
      'Fotonens totala energi är $h \\cdot f$, som delas mellan utträdesarbete och elektronens rörelseenergi.',
      'Rörelsemängd och energi är olika storheter — utträdesarbetet är en energi, inte en rörelsemängd.',
    ],
  },
  {
    question: 'Vad bevaras vid Comptonspridning, då en foton krockar med en elektron?',
    choices: [
      'Endast energin bevaras, inte rörelsemängden.',
      'Endast rörelsemängden bevaras, inte energin.',
      'Både rörelsemängden och rörelseenergin bevaras, som vid en fullkomligt elastisk stöt.',
      'Varken energin eller rörelsemängden bevaras eftersom fotonen saknar massa.',
    ],
    correct: 2,
    why: [
      'Både energi och rörelsemängd bevaras vid Comptonspridning, inte bara energin.',
      'Både rörelsemängd och rörelseenergi bevaras, inte bara rörelsemängden.',
      'Vid Comptonspridning bevaras både rörelsemängden och rörelseenergin, precis som vid en fullkomligt elastisk stöt mellan biljardbollar.',
      'Även om fotonen saknar massa har den ändå rörelsemängd, och båda bevarandelagarna gäller ändå.',
    ],
  },
  {
    question: 'Vad är elektronvolt (eV)?',
    choices: [
      'En SI-enhet för effekt.',
      'En annan benämning för elektronens massa.',
      'En praktisk energienhet, där $1\\ \\mathrm{eV} = 1{,}602 \\cdot 10^{-19}$ J.',
      'En enhet för elektrisk laddning.',
    ],
    correct: 2,
    why: [
      'Effekt mäts i watt (W), inte elektronvolt.',
      'Elektronens massa mäts i kilogram (kg), inte elektronvolt.',
      'Elektronvolt (eV) är en praktisk energienhet för mycket små energier, definierad som $1\\ \\mathrm{eV} = 1{,}602 \\cdot 10^{-19}$ J.',
      'Elektrisk laddning mäts i coulomb (C), inte elektronvolt.',
    ],
  },
  {
    question: 'En foton med energin 3,0 eV träffar en metallyta med utträdesarbetet 2,0 eV och slår loss en elektron. Vilken rörelseenergi får elektronen?',
    choices: ['5,0 eV', '2,0 eV', '6,0 eV', '1,0 eV'],
    correct: 3,
    why: [
      'Detta fås om man adderar fotonens energi och utträdesarbetet istället för att subtrahera dem.',
      'Detta är bara utträdesarbetet — kom ihåg att räkna ut skillnaden mellan fotonens energi och utträdesarbetet.',
      'Detta fås om man av misstag dubblerar utträdesarbetet.',
      'Ur formeln $h \\cdot f = W_\\mathrm{u} + E_\\mathrm{k}$ fås $E_\\mathrm{k} = h \\cdot f - W_\\mathrm{u} = 3{,}0 - 2{,}0 = 1{,}0$ eV.',
    ],
  },
],

'fy2-4.6': [
  {
    question: 'Vad innebär de Broglies hypotes?',
    choices: [
      'Endast fotoner har vågegenskaper.',
      'Alla partiklar, inte bara fotoner, har vågegenskaper.',
      'Bara elektroner har vågegenskaper, inga andra partiklar.',
      'Vågegenskaper gäller enbart för makroskopiska objekt som bollar och bilar.',
    ],
    correct: 1,
    why: [
      'de Broglies poäng var precis motsatsen — att vågegenskaper inte är unikt för fotoner.',
      'Enligt de Broglies hypotes har alla partiklar, till exempel elektroner, protoner och neutroner, en våglängd.',
      'Hypotesen gäller alla partiklar, inte bara elektroner — de är dock lättast att observera vågegenskaper hos eftersom de är så lätta.',
      'Det är tvärtom — vågegenskaperna är försumbara för makroskopiska objekt men märkbara för mycket små partiklar.',
    ],
  },
  {
    question: 'Vilken formel beskriver de Broglie-våglängden hos en partikel?',
    choices: [
      '$\\lambda = \\frac{h}{m \\cdot v}$',
      '$\\lambda = h \\cdot m \\cdot v$',
      '$\\lambda = \\frac{m \\cdot v}{h}$',
      '$\\lambda = h + m \\cdot v$',
    ],
    correct: 0,
    why: [
      'de Broglie-våglängden ges av $\\lambda = \\frac{h}{m \\cdot v}$, precis som i genomgången.',
      'Sambandet är en kvot, inte en produkt, mellan Plancks konstant och rörelsemängden $m \\cdot v$.',
      'Detta är formeln upp och ner — *h* ska stå i täljaren, inte $m \\cdot v$.',
      'Plancks konstant och rörelsemängden hänger ihop via division, inte addition.',
    ],
  },
  {
    question: 'Vad visade dubbelspaltexperimentet med elektroner, där elektroner skickades en och en genom spalterna?',
    choices: [
      'Att elektroner alltid går genom exakt en av spalterna, som partiklar.',
      'Att elektroner bara beter sig som vågor när de skickas i stora grupper samtidigt.',
      'Att ett interferensmönster uppstår även när elektroner skickas en och en, som om varje elektron interfererar med sig själv.',
      'Att elektroner saknar vågegenskaper helt.',
    ],
    correct: 2,
    why: [
      'Om det stämde skulle mönstret på skärmen bli två linjer, inte ett interferensmönster.',
      'Interferensmönstret uppstår även om elektronerna skickas en och en, inte bara i grupp.',
      'Experimentet visade att interferensmönstret uppstår även med en elektron i taget, vilket tolkas som att elektronen går genom båda spalterna samtidigt, som en våg.',
      'Tvärtom visade experimentet tydliga vågegenskaper hos elektroner genom interferensmönstret.',
    ],
  },
  {
    question: 'Varför märker vi inte av vågegenskaperna hos makroskopiska föremål som bollar och bilar?',
    choices: [
      'Eftersom de Broglie-våglängden blir försumbart liten jämfört med objektets storlek när massan och hastigheten är stora.',
      'Eftersom stora objekt saknar rörelsemängd.',
      'Eftersom Plancks konstant är olika för stora och små objekt.',
      'Eftersom ljus inte kan reflekteras mot stora objekt.',
    ],
    correct: 0,
    why: [
      'Ju större massa och hastighet, desto mindre blir $\\lambda = \\frac{h}{m \\cdot v}$ — för en tennisboll blir våglängden orimligt mycket mindre än bollens egen storlek.',
      'Alla föremål i rörelse har rörelsemängd $p = m \\cdot v$, oavsett storlek.',
      'Plancks konstant *h* är en universell naturkonstant, samma för alla objekt.',
      'Ljus reflekteras visst mot stora objekt — det är därför vi kan se dem, men det har inget med de Broglie-våglängden att göra.',
    ],
  },
  {
    question: 'En partikel med massan $m = 6{,}626 \\cdot 10^{-27}$ kg rör sig med farten $v = 1000$ m/s. Bestäm partikelns de Broglie-våglängd.',
    choices: ['$1{,}0 \\cdot 10^{-4}$ m', '$6{,}626 \\cdot 10^{-24}$ m', '$1{,}0 \\cdot 10^{-10}$ m', '$1{,}0 \\cdot 10^{4}$ m'],
    correct: 2,
    why: [
      'Kontrollera tiopotensen — division av $10^{-34}$ med $10^{-24}$ ger $10^{-10}$, inte $10^{-4}$.',
      'Detta är bara nämnaren $m \\cdot v$ — glöm inte att dela *h* med denna produkt, inte bara skriva av den.',
      '$\\lambda = \\frac{h}{m \\cdot v} = \\frac{6{,}626 \\cdot 10^{-34}}{6{,}626 \\cdot 10^{-27} \\cdot 1000} = \\frac{6{,}626 \\cdot 10^{-34}}{6{,}626 \\cdot 10^{-24}} = 1{,}0 \\cdot 10^{-10}$ m.',
      'Tiopotensens tecken har blivit fel — kontrollera uträkningen igen.',
    ],
  },
],

'fy2-4.7': [
  {
    question: 'Vilken av följande ljuskällor ger ett kontinuerligt spektrum?',
    choices: [
      'Neonskyltar',
      'Natriumlampor för vägbelysning',
      'Glödlampor',
      'Kvicksilverlampor i solarium',
    ],
    correct: 2,
    why: [
      'Neonskyltar ger ett diskret spektrum eftersom ljuset kommer från enskilda atomer i en förtunnad gas.',
      'Natriumlampor ger, liksom neon, ett diskret emissionsspektrum från en atomär gas.',
      'I glödlampor hettas en glödtråd upp och avger ljus med alla våglängder — ett kontinuerligt spektrum.',
      'Kvicksilverlampor ger också ett diskret spektrum, inte ett kontinuerligt.',
    ],
  },
  {
    question: 'Varför har varje grundämne ett unikt karaktäristiskt spektrum?',
    choices: [
      'Eftersom varje grundämne har en unik massa.',
      'Eftersom alla atomer sänder ut exakt samma våglängder.',
      'Eftersom ljusets hastighet skiljer sig mellan olika grundämnen.',
      'Eftersom elektronerna hoppar mellan just de energinivåer som är unika för det grundämnets atomer.',
    ],
    correct: 3,
    why: [
      'Massan i sig avgör inte vilka våglängder som sänds ut — det är energinivåerna som gör det.',
      'Tvärtom är poängen att varje grundämne har sitt eget unika spektrum, inte samma som alla andra.',
      'Ljusets hastighet i vakuum är alltid densamma, oavsett vilket grundämne som sänder ut ljuset.',
      'Varje grundämne har unika energinivåer, och det är hoppen mellan dessa som ger det karaktäristiska spektrumet — som ett fingeravtryck.',
    ],
  },
  {
    question: 'Vad kännetecknar ett absorptionsspektrum?',
    choices: [
      'Ett kontinuerligt spektrum med mörka linjer vid de våglängder gasen absorberat.',
      'Ett spektrum med enbart svarta linjer och inget ljus alls.',
      'Samma sak som ett emissionsspektrum.',
      'Ett spektrum som bara uppstår i vakuum utan någon gas.',
    ],
    correct: 0,
    why: [
      'Ett absorptionsspektrum uppstår när ljus med alla våglängder passerar en gas som absorberar vissa specifika våglängder, vilket syns som mörka linjer i ett annars kontinuerligt spektrum.',
      'Ett absorptionsspektrum är fortfarande i huvudsak ljust (kontinuerligt) men med mörka linjer vid vissa våglängder — inte helt svart.',
      'Emissionsspektrumet visar ljusa linjer på svart botten, medan absorptionsspektrumet visar mörka linjer på ljus botten — motsatta mönster men vid samma våglängder.',
      'Tvärtom krävs en atomär gas som ljuset passerar genom för att ett absorptionsspektrum ska uppstå.',
    ],
  },
  {
    question: 'Vad visar det faktum att solens spektrum har mörka linjer som sammanfaller med vätets spektrallinjer?',
    choices: [
      'Att solen bara sänder ut rött ljus.',
      'Att solens atmosfär innehåller väte, eftersom mörka linjer sammanfaller med vätets spektrallinjer.',
      'Att solen helt saknar väte.',
      'Att solen är en absolut svart kropp utan spektrallinjer.',
    ],
    correct: 1,
    why: [
      'Solen sänder ut ett brett spektrum av våglängder — de mörka linjerna är bara smala avbrott i ett annars kontinuerligt spektrum.',
      'De mörka linjerna i solens spektrum, till exempel vid 656 nm, sammanfaller exakt med vätets spektrallinjer, vilket avslöjar att solens atmosfär innehåller väte.',
      'Tvärtom visar de mörka linjerna att det finns väte i solens atmosfär, som absorberar ljus vid just de våglängderna.',
      'Solen visar tydliga (mörka) spektrallinjer i sitt annars nästan kontinuerliga spektrum.',
    ],
  },
],

'fy2-4.8': [
  {
    question: 'Vad händer när en elektron i en atom deexciteras?',
    choices: [
      'En elektron absorberar en foton och hoppar till en högre bana.',
      'En elektron faller till en bana med lägre energi och en foton sänds ut.',
      'Kärnan sänder ut en foton.',
      'Elektronen lämnar atomen helt.',
    ],
    correct: 1,
    why: [
      'Det beskriver excitation, motsatsen till deexcitation.',
      'Vid deexcitation byter elektronen till en bana med lägre energi, och en foton sänds ut med en energi som motsvarar minskningen i lägesenergi.',
      'Det är elektronen, inte kärnan, som sänder ut fotonen vid deexcitation.',
      'Det beskriver jonisation, inte deexcitation.',
    ],
  },
  {
    question: 'Vilket samband gäller för energin hos en foton som sänds ut vid ett kvantsprång mellan energinivåerna $E_n$ och $E_m$?',
    choices: [
      '$h \\cdot f = E_n - E_m$',
      '$h \\cdot f = E_n + E_m$',
      '$h \\cdot f = E_n \\cdot E_m$',
      '$h \\cdot f = \\frac{E_n}{E_m}$',
    ],
    correct: 0,
    why: [
      'Fotonens energi vid ett kvantsprång ges av skillnaden mellan energinivåerna: $h \\cdot f = E_n - E_m$.',
      'Sambandet är en differens, inte en summa, mellan de två energinivåerna.',
      'Energinivåerna ska subtraheras, inte multipliceras med varandra.',
      'Energinivåerna ska subtraheras, inte divideras med varandra.',
    ],
  },
  {
    question: 'Hur stor är jonisationsenergin för väteatomen, räknat från grundtillståndet?',
    choices: ['0 eV', '1,0 eV', '13,6 eV', '656 eV'],
    correct: 2,
    why: [
      'Jonisationsgränsen är vald som nollnivå, men själva jonisationsenergin (räknat från grundtillståndet) är inte noll.',
      'Detta är alldeles för lite — jonisationsenergin för väte är betydligt större.',
      'För väteatomen är jonisationsenergin 13,6 eV — energin som krävs för att lyfta elektronen från grundtillståndet ($n = 1$) till jonisationsgränsen.',
      'Detta är alldeles för mycket — 656 nm är istället en våglängd i Balmerserien, inte en energi i eV.',
    ],
  },
  {
    question: 'Vilket påstående om Lyman-, Balmer- och Paschen-serierna i väteatomens spektrum stämmer?',
    choices: [
      'Lyman-serien ger synligt ljus eftersom den slutar på $n = 2$.',
      'Balmer-serien ger synligt ljus eftersom den slutar på $n = 2$.',
      'Paschen-serien ger ultraviolett strålning eftersom den slutar på $n = 1$.',
      'Alla tre serierna ger exakt samma våglängder.',
    ],
    correct: 1,
    why: [
      'Lyman-serien slutar på $n = 1$ och ger ultraviolett strålning, inte synligt ljus.',
      'Balmer-serien slutar på $n = 2$ och ger de hopp som motsvarar synligt ljus, till exempel den röda linjen vid 656 nm.',
      'Paschen-serien slutar på $n = 3$ och ger infraröd strålning, inte ultraviolett.',
      'De tre serierna motsvarar olika energiskillnader och ger därför helt olika våglängder.',
    ],
  },
  {
    question: 'Använd formeln $E_n \\approx -\\frac{13{,}6}{n^{2}}$ eV för att bestämma energin hos väteatomens andra energinivå ($n = 2$).',
    choices: ['−6,8 eV', '−1,7 eV', '−13,6 eV', '−3,4 eV'],
    correct: 3,
    why: [
      'Detta fås om man delar med 2 istället för att dela med $n^{2} = 4$.',
      'Detta är för litet i belopp — kontrollera att du delar 13,6 med $2^{2} = 4$, inte med ett större tal.',
      'Detta är energin vid grundtillståndet ($n = 1$), inte vid $n = 2$.',
      '$E_2 = -\\frac{13{,}6}{2^{2}} = -\\frac{13{,}6}{4} = -3{,}4$ eV.',
    ],
  },
],

// ── 18-fy2-ch5.js ─────────────────────────────────────────────

'fy2-5.1': [
  {
    question: 'Vad är skillnaden mellan ett solsystem och en galax?',
    choices: [
      'Ett solsystem innehåller flera olika galaxer inom sig',
      'De är samma sak, bara två olika namn för exakt samma fenomen',
      'Ett solsystem är en stjärna med sina planeter, en galax är hundratals miljarder stjärnor',
      'En galax är mindre och enklare uppbyggd än ett solsystem',
    ],
    correct: 2,
    why: [
      'Det är tvärtom: en galax innehåller hundratals miljarder solsystem, inte ett solsystem flera galaxer.',
      'De är inte samma sak — en galax är enormt mycket större och innehåller oräkneliga solsystem.',
      'Ett solsystem är en enda stjärna med dess planeter, medan en galax som Vintergatan innehåller hundratals miljarder stjärnor — nästan alla med egna solsystem.',
      'Tvärtom — en galax är enormt mycket större än ett solsystem; ett helt solsystem är bara en av ofattbart många prickar i galaxen.',
    ],
  },
  {
    question: 'Vad mäter enheten ljusår?',
    choices: [
      'Ljusets hastighet',
      'En vinkel mellan stjärnor',
      'En tidsrymd — hur länge ljus existerar',
      'Ett avstånd — sträckan ljuset färdas på ett år',
    ],
    correct: 3,
    why: [
      'Ljushastigheten är $3{,}00 \\cdot 10^{8}\\ \\mathrm{m/s}$, en fart — inte samma sak som ljusår, som är ett avstånd.',
      'En vinkel mellan stjärnor mäts i stället med parallax (se avsnitt 5.2), ett annat begrepp.',
      'Trots namnet "år" är ljusår inget tidsmått, utan avståndet ljuset hinner färdas under den tiden.',
      'Ett ljusår är sträckan ljuset hinner på ett år, ungefär $9{,}5 \\cdot 10^{15}\\ \\mathrm{m}$ — nästan 10 biljoner kilometer.',
    ],
  },
  {
    question: 'Solsystemet är ungefär 0,001 ljusår brett och Vintergatan ungefär 100 000 ljusår bred. Ungefär hur många gånger större är Vintergatan?',
    choices: [
      'Hundra miljoner gånger',
      'Hundra gånger',
      'Tio tusen gånger',
      'En miljard gånger',
    ],
    correct: 0,
    why: [
      '$100\\,000 / 0{,}001 = 100\\,000\\,000$, det vill säga hundra miljoner — precis den kvot som ger rätt svar.',
      'Alldeles för lågt räknat — kvoten $100\\,000/0{,}001$ blir betydligt större än hundra.',
      'Fortfarande för lågt räknat — kvoten ger hundra miljoner, inte tio tusen.',
      'Något för högt räknat — kvoten ger hundra miljoner, inte en miljard.',
    ],
  },
  {
    question: 'Vad finns i mitten av Vintergatan?',
    choices: [
      'En vit dvärgstjärna',
      'Jorden och solsystemet',
      'Andromedagalaxen',
      'Ett supermassivt svart hål (Sagittarius A*)',
    ],
    correct: 3,
    why: [
      'En vit dvärg är slutstadiet för en lättare stjärna som vår sol (se avsnitt 5.5) — inte det som finns i galaxens centrum.',
      'Solsystemet ligger ute i en av spiralarmarna, omkring 27 000 ljusår från centrum — inte i mitten.',
      'Andromedagalaxen är en helt egen galax i Lokala gruppen, inte något som finns i Vintergatans centrum.',
      'I Vintergatans centrum finns det supermassiva svarta hålet Sagittarius A*, med en massa på ungefär 4 miljoner solmassor.',
    ],
  },
  {
    question: 'Vilka två galaxer är de tyngsta medlemmarna i Lokala gruppen, och vad kommer att hända med dem?',
    choices: [
      'Vintergatan och Laniakea — de smälter samman inom hundra år',
      'Vintergatan och Andromeda — de smälter samman om några miljarder år',
      'Andromeda och Sagittarius A* — de stöter bort varandra',
      'Vintergatan och Lokala gruppen — de är samma sak',
    ],
    correct: 1,
    why: [
      'Laniakea är inte en galax utan superhopen som Lokala gruppen tillhör — den kan inte "smälta samman" med Vintergatan på det sättet.',
      'Vintergatan och Andromeda är de två tyngsta galaxerna i Lokala gruppen, och de närmar sig varandra och kommer att smälta samman om ungefär 4–5 miljarder år.',
      'Sagittarius A* är det svarta hålet i Vintergatans centrum, inte en egen galax som kan stöta bort Andromeda.',
      'Lokala gruppen är gruppen av drygt 50 galaxer som Vintergatan tillhör — inte en enskild galax.',
    ],
  },
],

'fy2-5.2': [
  {
    question: 'Vad är parallax?',
    choices: [
      'Ljusets böjning runt mycket tunga massor i rymden',
      'Skillnaden mellan en siderisk och en synodisk omloppsperiod',
      'Den skenbara förflyttningen av ett föremål mot bakgrunden när betraktaren flyttar sig',
      'Vinkeln mellan solen och en stjärna sedd från jorden vid en given tidpunkt',
    ],
    correct: 2,
    why: [
      'Det beskriver gravitationslinsning, inte parallax.',
      'Det är skillnaden mellan siderisk och synodisk månad (se avsnitt 5.3), ett helt annat begrepp.',
      'Parallax är just den skenbara förflyttningen mot bakgrunden — testa själv genom att blunda växelvis med ena ögat och titta på ett finger.',
      'Det ligger nära, men parallaxvinkeln mäts specifikt genom förskjutningen mot bakgrundsstjärnor från jordens två positioner, inte som vinkeln till solen.',
    ],
  },
  {
    question: 'Vilket är ungefärliga värdet för en astronomisk enhet (AU)?',
    choices: [
      '$9{,}5 \\cdot 10^{15}\\ \\mathrm{m}$',
      '$3{,}00 \\cdot 10^{8}\\ \\mathrm{m}$',
      '$3{,}26\\ \\mathrm{m}$',
      '$1{,}50 \\cdot 10^{11}\\ \\mathrm{m}$',
    ],
    correct: 3,
    why: [
      'Det är ett ljusår, inte en astronomisk enhet — ljusåret är omkring 63 000 gånger längre än en AU.',
      'Det är ljushastigheten i m/s, inte ett avstånd.',
      'Det är antalet ljusår i en parsec, en ren omvandlingsfaktor — inte ett avstånd i meter.',
      'En astronomisk enhet är jordens medelavstånd till solen, $1{,}50 \\cdot 10^{11}\\ \\mathrm{m}$ (ungefär 150 miljoner km).',
    ],
  },
  {
    question: 'Vilket samband används för att beräkna avståndet $r$ till en stjärna (i parsec) från parallaxvinkeln $p$ (i bågsekunder)?',
    choices: [
      '$r = \\dfrac{1}{p}$',
      '$r = p$',
      '$r = 2p$',
      '$r = p^{2}$',
    ],
    correct: 0,
    why: [
      'Räknar man $r$ i parsec och $p$ i bågsekunder försvinner alla omräkningsfaktorer, och kvar blir just $r = 1/p$.',
      'Sambandet är inte en enkel likhet — ett mindre $p$ ska ge ett större avstånd, inte samma tal.',
      'Basen i triangeln är 1 AU (inte 2 AU) när $r$ räknas i parsec och $p$ i bågsekunder, så faktorn 2 hör inte hemma i formeln.',
      'Formeln bygger på att vinkeln är liten, inte på att avståndet varierar med kvadraten på parallaxen.',
    ],
  },
  {
    question: 'En stjärnas parallax mäts till 0,50 bågsekunder. Hur långt bort ligger stjärnan, i parsec?',
    choices: [
      '0,50 pc',
      '5,0 pc',
      '2,0 pc',
      '20 pc',
    ],
    correct: 2,
    why: [
      'Det är själva parallaxvinkeln, inte avståndet — avståndet fås genom $r = 1/p$, inte genom att bara läsa av $p$.',
      'Det vore rätt om parallaxen i stället var 0,20 bågsekunder — men här är $p = 0{,}50$.',
      '$r = 1/p = 1/0{,}50 = 2{,}0\\ \\mathrm{pc}$.',
      'Att räkna fel väg (till exempel dela 1 med 0,050 i stället för 0,50) ger ett alldeles för stort tal — rätt väg är $r = 1/0{,}50 = 2{,}0\\ \\mathrm{pc}$.',
    ],
  },
  {
    question: 'En bågsekund motsvarar vilken del av en grad?',
    choices: [
      '$\\dfrac{1}{60}$ grad',
      '$\\dfrac{1}{3\\,600}$ grad',
      '$\\dfrac{1}{100}$ grad',
      '60 grader',
    ],
    correct: 1,
    why: [
      'Det är en bågminut, som är $1/60$ grad — en bågsekund är mindre än så.',
      'En grad delas i 60 bågminuter och varje bågminut i 60 bågsekunder, så det blir $3\\,600$ bågsekunder per grad — en bågsekund är alltså $1/3\\,600$ grad.',
      'Grader delas inte upp i hundradelar på det här sättet — uppdelningen sker i 60-delar (minuter och sekunder), inte 100-delar.',
      '60 grader är sextio gånger större än en hel grad, långt ifrån en bågsekund som är en bråkdel av en grad.',
    ],
  },
  {
    question: 'Varför fungerar parallaxmetoden bara för relativt nära stjärnor när den mäts från jordytan?',
    choices: [
      'Stjärnorna rör sig för snabbt för att hinna fotograferas',
      'Ljuset från avlägsna stjärnor hinner inte fram på ett halvår',
      'Parallaxvinkeln blir större för avlägsna stjärnor, vilket gör dem svårare att mäta',
      'Jordens atmosfär stör mätningarna så att små vinklar inte går att mäta tillförlitligt',
    ],
    correct: 3,
    why: [
      'Stjärnornas egenrörelse är inte orsaken — problemet är att mäta den lilla parallaxvinkeln exakt.',
      'Ljusets restid påverkar inte mätningen av parallax — det handlar om vinkelupplösning, inte om ljuset hinner fram.',
      'Tvärtom — parallaxvinkeln blir mindre ju längre bort stjärnan är, och det är just de mycket små vinklarna som blir svåra att mäta.',
      'Atmosfären suddar ut bilden så att de allra minsta vinklarna inte går att mäta tillförlitligt; därför räcker markbaserad parallax bara till ungefär 100 ljusår, medan satelliter som Gaia når mycket längre.',
    ],
  },
],

'fy2-5.3': [
  {
    question: 'Varför ser vi månens faser?',
    choices: [
      'Månen har eget ljus som varierar i styrka från natt till natt',
      'Jordens skugga faller på månen olika mycket för varje natt som går',
      'Månen roterar olika snabbt runt sin egen axel från månad till månad',
      'Vi ser olika delar av månens ständigt solbelysta halva, beroende på var månen är i sin bana',
    ],
    correct: 3,
    why: [
      'Månen saknar eget ljus — allt vi ser är reflekterat solljus.',
      'Det beskriver en månförmörkelse, ett ovanligt specialfall — inte den vanliga fasväxlingen som sker varje månad.',
      'Månens rotation är i stället låst till dess bana runt jorden (samma sida vänds alltid mot oss) och orsakar inte fasväxlingen.',
      'Halvan av månen som vetter mot solen är alltid belyst — hur stor del av just den belysta halvan vi ser beror på var i banan månen befinner sig.',
    ],
  },
  {
    question: 'Vad kännetecknar fullmåne?',
    choices: [
      'Hela den mot jorden vända sidan är belyst',
      'Månen syns inte alls',
      'Bara vänster halva är belyst',
      'En tunn sigd syns från höger',
    ],
    correct: 0,
    why: [
      'Vid fullmåne är hela den sida av månen som vetter mot jorden solbelyst.',
      'Det beskriver nymåne, motsatsen till fullmåne.',
      'Det beskriver tredje kvarteret, en av mellanfaserna.',
      'Det beskriver tilltagande månskära, i början av den växande fasen.',
    ],
  },
  {
    question: 'Vilket påstående om månens omloppstid stämmer?',
    choices: [
      'Siderisk månad (mot fixstjärnorna) är 29,5 dygn, synodisk (nymåne till nymåne) är 27,3 dygn',
      'Båda är exakt 27,3 dygn',
      'Siderisk månad är 27,3 dygn, synodisk är 29,5 dygn, eftersom jorden hunnit röra sig vidare runt solen',
      'Synodisk månad är alltid precis dubbelt så lång som siderisk månad',
    ],
    correct: 2,
    why: [
      'Siffrorna är omkastade — den siderisk månaden (mot fixstjärnorna) är den kortare av de två, 27,3 dygn.',
      'De är inte lika långa — den synodiska månaden (29,5 dygn) är längre eftersom jorden rört sig vidare runt solen under tiden.',
      'Eftersom jorden förflyttat sig längs sin bana under månens varv måste månen gå lite mer än ett fullt varv för att hamna i samma position relativt solen — därför blir den synodiska månaden (29,5 dygn) längre än den sideriska (27,3 dygn).',
      '29,5 dygn är inte dubbelt så mycket som 27,3 dygn — skillnaden beror på jordens rörelse runt solen, inte en enkel faktor 2.',
    ],
  },
  {
    question: 'Om det är nymåne idag, om ungefär hur många dygn inträffar nästa nymåne?',
    choices: [
      'Ungefär 7 dygn',
      'Ungefär 30 dygn',
      'Ungefär 1 dygn',
      'Ungefär 365 dygn',
    ],
    correct: 1,
    why: [
      'Sju dygn motsvarar ungefär en fjärdedel av cykeln, till exempel avståndet mellan nymåne och första kvarteret — inte en hel cykel.',
      'Den synodiska månaden (nymåne till nymåne) är ungefär 29,5 dygn, det vill säga ungefär 30 dygn.',
      'Det är alldeles för kort — en hel måncykel tar nästan en månad, inte ett dygn.',
      'Ett helt år är alldeles för långt — månen hinner gå igenom omkring tolv fascykler på ett år.',
    ],
  },
  {
    question: 'Vad krävs för att en solförmörkelse ska kunna inträffa?',
    choices: [
      'Fullmåne, med jorden liggande mitt emellan solen och månen',
      'Att månens omloppsbana och jordens bana runt solen är exakt parallella',
      'Nymåne, med månen mellan jorden och solen, och nästan exakt på linjen sol–jord',
      'Att månen just då befinner sig i sitt tredje kvarter',
    ],
    correct: 2,
    why: [
      'Det beskriver förutsättningen för en månförmörkelse, inte en solförmörkelse.',
      'Tvärtom — månens bana lutar omkring 5° mot jordens bana runt solen; vore banorna exakt parallella skulle förmörkelser i stället inträffa varje månad.',
      'Vid en solförmörkelse ligger månen mellan jorden och solen (nymåne) och kastar sin skugga på jorden, vilket bara händer när alla tre ligger nästan exakt på en rät linje.',
      'Tredje kvarteret är en helt annan fas (halvmåne på väg mot nymåne) och ger ingen förmörkelse.',
    ],
  },
  {
    question: 'På norra halvklotet ser månen ut som ett D (ljus höger sida). Vad innebär det?',
    choices: [
      'Månen växer mot fullmåne',
      'Det är fullmåne',
      'Månen avtar mot nymåne',
      'Det är nymåne',
    ],
    correct: 0,
    why: [
      'Ett D-format ljus på höger sida är just minnesregeln för en växande måne på väg mot fullmåne.',
      'Vid fullmåne är hela den synliga sidan belyst, inte bara höger sida som vid en D-form.',
      'Ett D betyder tvärtom att månen växer — ett C-format ljus (vänster sida) är i stället tecknet på en avtagande måne.',
      'Vid nymåne syns ingen belyst del alls, medan D-formen visar en del av månen redan belyst.',
    ],
  },
],

'fy2-5.4': [
  {
    question: 'Vad orsakar att himlen är blå och solnedgången röd?',
    choices: [
      'Ljusets brytning i vattendroppar i luften, på samma sätt som i en regnbåge',
      'Att solens egen yttemperatur faktiskt ändras mellan dag och natt',
      'Rayleighspridning av solljus i atmosfären, som sprider kort- (blått) ljus mycket mer än långvågigt (rött) ljus',
      'Ozonlagrets absorption av rött ljus högt uppe i atmosfären',
    ],
    correct: 2,
    why: [
      'Brytning i vattendroppar skapar regnbågar, ett annat fenomen än den ständiga himmelsfärgen.',
      'Solens egen yttemperatur, och därmed dess spektrum, ändras inte under dagen — det är i stället ljusets väg genom atmosfären som förändras.',
      'Rayleighspridningen gör att korta våglängder (blått) sprids åt alla håll så att himlen blir blå, medan enbart det röda ljuset slipper igenom obrutet vid solnedgång.',
      'Ozonlagret absorberar främst ultraviolett strålning, inte det som ger himlen dess blå färg.',
    ],
  },
  {
    question: 'Rayleighspridningens sannolikhet $\\sigma$ beror på våglängden $\\lambda$ enligt vilket samband?',
    choices: [
      '$\\sigma \\propto \\lambda$',
      '$\\sigma \\propto \\lambda^{2}$',
      '$\\sigma \\propto \\dfrac{1}{\\lambda}$',
      '$\\sigma \\propto \\dfrac{1}{\\lambda^{4}}$',
    ],
    correct: 3,
    why: [
      'Ett direkt proportionellt samband skulle innebära att långa våglängder (rött) sprids mest — i själva verket är det tvärtom.',
      'Kvadratiskt beroende är för svagt — den verkliga spridningen avtar mycket brantare med ökande våglängd.',
      'Beroendet är brantare än så — det är fjärde potensen av våglängden i nämnaren, inte bara första potensen.',
      'Spridningen är ungefär proportionell mot $1/\\lambda^{4}$, vilket gör att korta våglängder (blått, violett) sprids mycket mer än långa (rött).',
    ],
  },
  {
    question: 'Enligt genomgången sprids violett ljus (400 nm) ungefär hur mycket mer än rött ljus (700 nm)?',
    choices: [
      'Ungefär 2 gånger mer',
      'Ungefär 10 gånger mer',
      'Ungefär 100 gånger mer',
      'Lika mycket',
    ],
    correct: 1,
    why: [
      'Skillnaden är större än en faktor 2 — fjärdepotensberoendet gör effekten mycket kraftigare.',
      '$(700/400)^{4} \\approx 9{,}4$, det vill säga ungefär en tiofaldig skillnad.',
      'Etthundra gånger är en överskattning — beräkningen ger ungefär en tiofaldig skillnad, inte hundrafaldig.',
      'Våglängderna skiljer sig kraftigt (400 nm mot 700 nm), och eftersom spridningen beror på $1/\\lambda^{4}$ blir skillnaden allt annat än lika stor.',
    ],
  },
  {
    question: 'Varför ser himlen blå ut och inte violett, trots att violett ljus sprids ännu mer?',
    choices: [
      'Solen sänder ut mindre violett ljus från början, och ögat är mer känsligt för blått',
      'Violett ljus når aldrig ner genom atmosfären',
      'Violett ljus har längre våglängd än blått och sprids därför mindre',
      'Atmosfären innehåller inga molekyler som sprider violett ljus',
    ],
    correct: 0,
    why: [
      'Solens spektrum innehåller mindre violett ljus från start, och ögat uppfattar det svagare, så nettoresultatet blir en blå snarare än violett himmel.',
      'Violett ljus når faktiskt ner — problemet är bara att det finns mindre av det och att ögat uppfattar det svagare.',
      'Tvärtom — violett har kortare våglängd än blått, vilket enligt $1/\\lambda^{4}$ innebär att det sprids ännu mer, inte mindre.',
      'Samma gasmolekyler som sprider blått ljus sprider även violett — problemet ligger i solens spektrum och ögats känslighet, inte i atmosfärens sammansättning.',
    ],
  },
  {
    question: 'Varför blir solen röd nära horisonten men vit högt på himlen?',
    choices: [
      'Solen är faktiskt betydligt kallare på morgonen och kvällen än mitt på dagen',
      'Nära horisonten blockerar tjocka moln allt utom det röda ljuset',
      'Jordens rotation runt sin egen axel ändrar solens spektrum nära horisonten',
      'Nära horisonten passerar solljuset en mycket längre väg genom atmosfären, så mer blått och grönt hinner spridas bort',
    ],
    correct: 3,
    why: [
      'Solens yttemperatur (ungefär 5 800 K) förändras inte under dygnet — det är väglängden genom atmosfären som ändras.',
      'Moln är inte nödvändiga för fenomenet — även en klar himmel ger en röd solnedgång, eftersom det är den långa vägen genom luften som gör susen.',
      'Jordens rotation flyttar bara solens position på himlen — den ändrar inte solens utsända spektrum.',
      'Vid horisonten är luftvägen mångdubbelt längre än vid zenit, så nästan allt blått och mycket av det gröna hinner spridas bort innan ljuset når oss, och kvar blir det röda.',
    ],
  },
  {
    question: 'Ungefär hur många fler luftmassor passerar solljuset genom vid horisonten jämfört med rakt uppifrån (zenit)?',
    choices: [
      'Ungefär 2 gånger så mycket',
      'Ungefär 10 gånger så mycket',
      'Ungefär 38 gånger så mycket',
      'Ingen skillnad alls',
    ],
    correct: 2,
    why: [
      'Skillnaden är betydligt större än en faktor 2 — vid horisonten är vägen genom atmosfären mångdubbelt längre.',
      'Tio gånger är för lågt räknat — vägen kan bli upp till omkring 38 luftmassor vid horisonten.',
      'Vid zenit är luftmassan 1, men nära horisonten kan solljuset behöva passera upp till omkring 38 luftmassor.',
      'Det finns en stor skillnad — vid zenit är luftmassan 1 och vid horisonten upp till ungefär 38, vilket är avgörande för färgförändringen.',
    ],
  },
],

'fy2-5.5': [
  {
    question: 'Varför kallas ett svart hål "svart"?',
    choices: [
      'Det är fyllt av osynlig mörk materia som absorberar allt ljus',
      'Det suger åt sig allt ljus i universum',
      'Det saknar helt massa och är därför osynligt för teleskop',
      'Gravitationen är så stark att inte ens ljus kan ta sig ut innanför en viss gräns',
    ],
    correct: 3,
    why: [
      'Mörk materia är ett annat fenomen och har inget direkt samband med varför ett svart hål ser svart ut.',
      'Ett svart hål påverkar bara sin närmaste omgivning genom gravitationen — det suger inte åt sig allt ljus i hela universum.',
      'Tvärtom — ett svart hål har oerhört mycket massa, hoppackad på extremt liten volym.',
      'Ingenting, inte ens ljus, kan ta sig ut innanför händelsehorisonten, och därför når ingen strålning oss därifrån — det är därför det ser svart ut.',
    ],
  },
  {
    question: 'Vilken formel beskriver flykthastigheten $v_\\mathrm{f}$ från en himlakropp med massa $M$ på avståndet $r$ från centrum?',
    choices: [
      '$v_\\mathrm{f} = \\dfrac{2GM}{r}$',
      '$v_\\mathrm{f} = \\sqrt{\\dfrac{2GM}{r}}$',
      '$v_\\mathrm{f} = \\dfrac{GM}{r^{2}}$',
      '$v_\\mathrm{f} = \\sqrt{GMr}$',
    ],
    correct: 1,
    why: [
      'Det saknar kvadratroten — utan roten blir enheten inte ens fart (m/s).',
      'Sätter man rörelseenergin lika med gravitationens arbete på vägen ut får man just $v_\\mathrm{f} = \\sqrt{2GM/r}$.',
      'Det är i stället formen för gravitationsfältstyrkan (m/s²), en helt annan storhet än flykthastighet.',
      'Radien ska stå i nämnaren under roten, inte som en faktor i täljaren — annars skulle flykthastigheten felaktigt öka med större avstånd.',
    ],
  },
  {
    question: 'Vad händer med flykthastigheten om man pressar ihop samma massa till en mindre radie?',
    choices: [
      'Den ökar',
      'Den minskar',
      'Den är oförändrad',
      'Den blir noll',
    ],
    correct: 0,
    why: [
      'Eftersom $v_\\mathrm{f} = \\sqrt{2GM/r}$ ökar flykthastigheten när $r$ minskar — mindre radie ger starkare gravitation nära ytan.',
      'Tvärtom — enligt formeln minskar flykthastigheten om $r$ ökar, inte om $r$ minskar.',
      'Formeln visar tydligt att flykthastigheten beror på $r$ — den kan alltså inte vara oförändrad när $r$ ändras.',
      'Flykthastigheten ökar mot oändligheten då $r$ går mot noll (för fast $M$), i stället för att bli noll.',
    ],
  },
  {
    question: 'Om massan $M$ hos ett svart hål fördubblas, vad händer med Schwarzschildradien $r_\\mathrm{s}$?',
    choices: [
      'Den halveras',
      'Den är oförändrad',
      'Den fördubblas',
      'Den fyrdubblas',
    ],
    correct: 2,
    why: [
      'Det vore fallet om sambandet var omvänt proportionellt mot $M$ — men $r_\\mathrm{s}$ ökar med $M$, den minskar inte.',
      '$r_\\mathrm{s}$ beror direkt av $M$ enligt formeln $r_\\mathrm{s} = \\dfrac{2GM}{c^{2}}$ — en fördubbling av massan påverkar alltså radien.',
      'Eftersom $r_\\mathrm{s} = \\dfrac{2GM}{c^{2}}$ är direkt proportionell mot massan $M$, fördubblas $r_\\mathrm{s}$ när $M$ fördubblas.',
      'En fyrdubbling skulle gälla om $r_\\mathrm{s}$ berodde på $M^{2}$, men sambandet är linjärt i $M$.',
    ],
  },
  {
    question: 'Vad avgör om en döende stjärnas kärna blir en vit dvärg, en neutronstjärna eller ett svart hål?',
    choices: [
      'Vilken färg stjärnan hade redan när den föddes',
      'Hur många miljarder år stjärnan redan hunnit lysa',
      'Stjärnans avstånd till Vintergatans centrum',
      'Hur mycket massa som finns kvar i den kollapsande resten',
    ],
    correct: 3,
    why: [
      'Färgen speglar bara yttemperaturen, inte vilket slutstadium stjärnresten hamnar i.',
      'Livslängden hänger visserligen ihop med stjärnans massa, men det är massan hos den kvarvarande resten efter kollapsen som direkt avgör slutstadiet.',
      'Var i galaxen stjärnan befinner sig påverkar inte dess öde — det är massan som avgör.',
      'Lättare stjärnrester blir vita dvärgar, tyngre resulterar i en supernova som lämnar kvar antingen en neutronstjärna eller, om resten är tillräckligt tung, ett svart hål.',
    ],
  },
  {
    question: 'Hur bekräftades svarta håls existens direkt för första gången?',
    choices: [
      'Genom att fotografera det direkt med ett vanligt optiskt teleskop',
      'Genom detektion av gravitationsvågor från två sammansmältande svarta hål (LIGO, 2015)',
      'Genom att mäta Schwarzschildradien direkt på plats med ett måttband',
      'Genom radiosignaler som svarta hål påstås sända ut på egen hand',
    ],
    correct: 1,
    why: [
      'Ett svart hål syns inte i vanligt ljus — den första bilden (2019) visade i stället den glödande gasen runt hålet, inte hålet självt, och kom efter LIGO-upptäckten.',
      'LIGO detekterade 2015 för första gången krusningar i rumtiden från två sammansmältande svarta hål, vilket direkt bekräftade att de existerar.',
      'Schwarzschildradien är alldeles för liten och otillgänglig för att mätas med ett måttband — den beräknas i stället utifrån massan.',
      'Ett svart hål sänder inte självt ut någon strålning — det är i stället omgivande het gas (ackretionsskivan) som kan avslöja dess närvaro.',
    ],
  },
],

'fy2-5.6': [
  {
    question: 'Vad krävs för att ett stilla vätgasmoln ska börja kollapsa och bilda en stjärna?',
    choices: [
      'Att molnet gradvis blir varmare av sig självt',
      'Att molnets eget inre gastryck ökar för mycket',
      'Att molnet börjar rotera mycket snabbare än förut',
      'Att någon störning (t.ex. en supernova-stötvåg) gör en del av molnet tillräckligt tätt för att gravitationen ska ta över',
    ],
    correct: 3,
    why: [
      'En ökad temperatur skulle öka gastrycket och göra kollaps svårare, inte lättare — kollaps gynnas i stället av att molnet är kallt.',
      'Ett ökat inre tryck motverkar kollaps snarare än att gynna den — gravitationen måste i stället vinna över trycket.',
      'Rotation hindrar snarare kollaps rakt in mot centrum (materia samlas i en skiva) — det är inte det som sätter igång kollapsen.',
      'Så länge molnet är ostört råder balans mellan tryck och gravitation; en störning som gör en del av molnet tätt nog låter gravitationen ta över och kollapsen börjar.',
    ],
  },
  {
    question: 'Varför blir en kollapsande gasmoln varmare?',
    choices: [
      'Lägesenergi omvandlas till rörelseenergi när gasen faller inåt, precis som i en cykelpump',
      'Kemiska reaktioner mellan de olika gasmolekylerna frigör värme',
      'Solens strålning värmer upp molnet utifrån under lång tid',
      'Molnet fångar upp och lagrar värme från omgivande stjärnor',
    ],
    correct: 0,
    why: [
      'När gasen faller inåt omvandlas dess lägesenergi till rörelseenergi och värme — samma princip som när luften i en cykelpump värms av kompression.',
      'Det är ingen kemisk reaktion — uppvärmningen är en ren följd av gravitationens arbete på gasen.',
      'Molnet befinner sig ofta långt från några stjärnor alls — värmen kommer inifrån, från gravitationens eget arbete, inte utifrån.',
      'Det handlar inte om fångad extern värme — omvandlingen av lägesenergi till rörelseenergi (och därmed värme) sker inuti det kollapsande molnet självt.',
    ],
  },
  {
    question: 'Vid ungefär vilken temperatur i kärnan börjar vätefusionen i en protostjärna?',
    choices: [
      '1 miljon K',
      '10 miljoner K',
      '10 000 K',
      '10 miljarder K',
    ],
    correct: 1,
    why: [
      'En miljon kelvin räcker inte — fusionen kräver den ännu högre temperaturen omkring 10 miljoner kelvin.',
      'När temperaturen i kärnan når omkring 10 miljoner kelvin börjar vätekärnorna fusioneras till helium.',
      '10 000 K är alldeles för lågt — redan en vanlig stjärnas yta ligger nära den temperaturen, och kärnan måste bli mycket hetare för att tända fusionen.',
      '10 miljarder kelvin är en kraftig överskattning — fusion i vanliga stjärnors kärnor startar redan vid omkring 10 miljoner kelvin.',
    ],
  },
  {
    question: 'Vad beskriver reaktionen $4\\ {}^{1}_{1}\\mathrm{H} \\longrightarrow {}^{4}_{2}\\mathrm{He} + \\text{energi}$?',
    choices: [
      'Klyvning av en tung atomkärna inuti en kärnreaktor på jorden',
      'Sönderfall av en radioaktiv heliumkärna tillbaka till väte',
      'Fyra vätekärnor slås samman till en heliumkärna, varvid massdifferensen frigörs som energi',
      'En kollision mellan två hela protostjärnor i rymden',
    ],
    correct: 2,
    why: [
      'Det beskriver klyvning (fission), motsatsen till den fusion som sker i en stjärnas kärna.',
      'Pilen pekar åt fel håll för det påståendet — det är väte som slås samman till helium, inte helium som sönderfaller till väte.',
      'Fyra protoner (väte) slås samman till en heliumkärna som väger något mindre än de fyra protonerna tillsammans, och massdifferensen frigörs som energi enligt $E = mc^{2}$.',
      'Reaktionen sker inne i en enda stjärnas kärna, mellan atomkärnor — inte som en kollision mellan hela stjärnor.',
    ],
  },
  {
    question: 'Vad menas med att en stjärna befinner sig i "hydrostatisk jämvikt"?',
    choices: [
      'Att stjärnan står fullständigt stilla någonstans i rymden',
      'Att stjärnan alltid innehåller precis lika mycket väte som helium',
      'Att stjärnans temperatur hela tiden är konstant lika med 10 miljoner kelvin',
      'Att strålningstrycket utåt från fusionen exakt balanserar gravitationens dragning inåt',
    ],
    correct: 3,
    why: [
      'Jämvikten handlar om krafter inuti stjärnan, inte om att stjärnan är stillastående i rymden — stjärnor rör sig runt galaxens centrum som alla andra himlakroppar.',
      'Andelen väte respektive helium ändras gradvis under stjärnans liv — jämvikten handlar i stället om en kraftbalans, inte om ämnenas proportioner.',
      'Temperaturen omkring 10 miljoner kelvin gäller ungefär i kärnan när fusionen startar, men jämvikten avser balansen mellan tryck och gravitation, inte ett bestämt temperaturvärde.',
      'Så länge trycket utåt från fusionen exakt balanserar gravitationen inåt slutar stjärnan att krympa — det är denna hydrostatiska jämvikt som håller solen stabil i omkring 10 miljarder år.',
    ],
  },
  {
    question: 'Varför lever en tung stjärna (över 10 solmassor) kortare tid än en stjärna som solen, trots att den har mer bränsle?',
    choices: [
      'Den har i själva verket mindre bränsle till sitt förfogande än solen',
      'Tunga stjärnor lever i själva verket längre, inte kortare',
      'Den förbrukar sitt bränsle så mycket snabbare att det ändå tar slut fortare',
      'Den svalnar snabbare och slutar fusionera',
    ],
    correct: 2,
    why: [
      'Tvärtom — en tyngre stjärna har mer bränsle än solen, men det räcker ändå inte länge.',
      'Enligt genomgången lever tunga stjärnor bara några miljoner år, medan en stjärna som solen lever omkring 10 miljarder år — alltså mycket kortare, inte längre.',
      'En tung stjärna bränner sitt väte enormt mycket snabbare än en lättare stjärna, och trots det större bränsleförrådet tar det ändå slut först.',
      'Det är inte avsvalning som avslutar en tung stjärnas liv i förtid — den bränner helt enkelt sitt bränsle i en rasande takt.',
    ],
  },
],

};
