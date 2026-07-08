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

// ════════════════════════════════════════════════════════════════
// MATEMATIK NIVÅ 1c — kapitel 1: Aritmetik
// ════════════════════════════════════════════════════════════════

'ma1c-1.1': [
  {
    question: 'Vilken beteckning används för mängden av de **rationella talen**?',
    choices: [
      '$\\mathbb{N}$',
      '$\\mathbb{Z}$',
      '$\\mathbb{Q}$',
      '$\\mathbb{R}$',
    ],
    correct: 2,
    why: [
      '$\\mathbb{N}$ betecknar de naturliga talen — alla icke-negativa heltal 0, 1, 2, 3 …',
      '$\\mathbb{Z}$ betecknar heltalen — …, −2, −1, 0, 1, 2, …',
      '$\\mathbb{Q}$ betecknar de rationella talen: alla tal som kan skrivas som ett bråk $\\frac{a}{b}$ där $a$ och $b$ är heltal och $b \\neq 0$.',
      '$\\mathbb{R}$ betecknar de reella talen — alla tal på tallinjen, även de irrationella.',
    ],
  },
  {
    question: 'Vilka talmängder tillhör talet $-7$?',
    choices: [
      'Endast $\\mathbb{Z}$',
      '$\\mathbb{Z}$, $\\mathbb{Q}$ och $\\mathbb{R}$, men inte $\\mathbb{N}$',
      '$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ och $\\mathbb{R}$',
      '$\\mathbb{Q}$ och $\\mathbb{R}$, men inte $\\mathbb{Z}$',
    ],
    correct: 1,
    why: [
      'Talmängderna ligger inuti varandra — ett tal som ligger i $\\mathbb{Z}$ ligger automatiskt också i $\\mathbb{Q}$ och $\\mathbb{R}$.',
      '$-7$ är ett heltal, och varje heltal är också rationellt (t.ex. $-7 = \\frac{-7}{1}$) och reellt. Däremot är $-7$ inte naturligt, eftersom de naturliga talen bara innehåller icke-negativa heltal.',
      'De naturliga talen $\\mathbb{N}$ innehåller bara icke-negativa heltal — det negativa talet $-7$ ingår inte där.',
      '$-7$ är visst ett heltal — heltalen $\\mathbb{Z}$ innehåller även de negativa heltalen.',
    ],
  },
  {
    question: 'Vad kännetecknar ett **irrationellt** tal?',
    choices: [
      'Det är mindre än 0',
      'Det har oändligt många decimaler',
      'Det kan inte skrivas som ett bråk av två heltal — decimalutvecklingen är oändlig utan att upprepa sig',
      'Det ligger utanför de reella talen',
    ],
    correct: 2,
    why: [
      'Tecknet har inget med saken att göra — det finns både negativa rationella tal (t.ex. −0,25) och negativa irrationella tal (t.ex. −π).',
      'Det räcker inte — även $\\frac{1}{3} = 0{,}333\\ldots$ har oändligt många decimaler, men de upprepar sig, och talet är rationellt.',
      'Just det — irrationella tal som π och $\\sqrt{2}$ kan inte skrivas på formen $\\frac{a}{b}$ med heltal $a$ och $b$, och deras decimalutveckling är oändlig utan att upprepa sig.',
      'Tvärtom — de irrationella talen ingår i de reella talen $\\mathbb{R}$, som innehåller alla tal på tallinjen.',
    ],
  },
  {
    question: 'Beräkna $6 - (-4)$.',
    choices: [
      '$2$',
      '$-10$',
      '$10$',
      '$-2$',
    ],
    correct: 2,
    why: [
      'Då har du räknat $6 - 4$ — men två minustecken ihop ersätts med ett plustecken, så det blir $6 + 4$.',
      'Teckenregeln ger plus, inte minus: $6 - (-4) = 6 + 4$.',
      'Lika tecken ihop ersätts med ett plustecken: $6 - (-4) = 6 + 4 = 10$.',
      'Det vore svaret på $(-6) + 4$ — här ska två minustecken ihop bli ett plus: $6 + 4 = 10$.',
    ],
  },
  {
    question: 'Vilket av följande uttryck har ett **negativt** värde?',
    choices: [
      '$(-3) \\cdot (-8)$',
      '$5 + (-9)$',
      '$\\dfrac{-24}{-6}$',
      '$7 - (-2)$',
    ],
    correct: 1,
    why: [
      'Minus gånger minus ger plus: $(-3) \\cdot (-8) = 24$, som är positivt.',
      'Plus och minus ihop ersätts med ett minustecken: $5 + (-9) = 5 - 9 = -4$, som är negativt.',
      'Lika tecken dividerat med varandra ger plus: $\\frac{-24}{-6} = 4$, som är positivt.',
      'Två minustecken ihop ersätts med ett plustecken: $7 - (-2) = 7 + 2 = 9$, som är positivt.',
    ],
  },
],

'ma1c-1.2': [
  {
    question: 'Vad kallas talet **ovanför** bråkstrecket?',
    choices: [
      'Nämnare',
      'Täljare',
      'Kvot',
      'Faktor',
    ],
    correct: 1,
    why: [
      'Nämnaren är talet under bråkstrecket — "nämnaren där nere".',
      'Talet ovanför bråkstrecket kallas täljare — "täljaren i toppen".',
      'Kvoten är resultatet av en division, inte en del av bråkets skrivsätt.',
      'Faktorer är talen i en multiplikation, inte delarna i ett bråk.',
    ],
  },
  {
    question: 'Vad händer med ett bråks **värde** när man förlänger bråket?',
    choices: [
      'Värdet blir större',
      'Värdet blir mindre',
      'Värdet är oförändrat',
      'Det beror på vilket tal man förlänger med',
    ],
    correct: 2,
    why: [
      'Täljaren blir visserligen större, men nämnaren växer lika många gånger — andelen är kvar.',
      'Bråket delas inte upp i mindre värde — bara i fler, mindre delar.',
      'Vid förlängning multipliceras täljare och nämnare med samma tal, så bråkets storlek ändras inte — t.ex. är $\\frac{1}{4} = \\frac{3}{12}$.',
      'Så länge man multiplicerar täljare och nämnare med samma tal (utom 0) är värdet alltid oförändrat, oavsett vilket talet är.',
    ],
  },
  {
    question: 'Förkorta $\\dfrac{8}{12}$ med 4.',
    choices: [
      '$\\dfrac{4}{6}$',
      '$\\dfrac{2}{12}$',
      '$\\dfrac{2}{3}$',
      '$\\dfrac{8}{3}$',
    ],
    correct: 2,
    why: [
      '$\\frac{4}{6}$ får man om man förkortar med 2 — här skulle det förkortas med 4.',
      'Här har bara täljaren dividerats med 4 — nämnaren måste också divideras med 4.',
      'Att förkorta med 4 betyder att dividera både täljare och nämnare med 4: $\\frac{8/4}{12/4} = \\frac{2}{3}$.',
      'Här har bara nämnaren dividerats med 4 — täljaren måste också divideras med 4.',
    ],
  },
  {
    question: 'När går det att förkorta ett bråk genom att "stryka likadana tal" i täljare och nämnare?',
    choices: [
      'Alltid — likadana tal tar ut varandra',
      'När det står gångertecken mellan talen',
      'När det står plustecken mellan talen',
      'Aldrig — man måste alltid räkna ut täljare och nämnare först',
    ],
    correct: 1,
    why: [
      'Nej — t.ex. är $\\frac{6+2}{2+2} = \\frac{8}{4} = 2$, men "stryker" man 2:orna får man $\\frac{6}{2} = 3$, vilket är fel.',
      'Strykning är egentligen en förkortning — division av täljare och nämnare med samma faktor — och det kräver att talet är en faktor, alltså att det står gångertecken mellan.',
      'Precis tvärtom — med plustecken mellan ger strykning fel resultat, t.ex. $\\frac{6+2}{2+2} = 2$ men $\\frac{6}{2} = 3$.',
      'Det går utmärkt att stryka gemensamma faktorer, t.ex. $\\frac{4 \\cdot 2}{4 \\cdot 1} = \\frac{2}{1}$ — så länge det är multiplikation.',
    ],
  },
  {
    question: 'Vilket bråk är störst: $\\dfrac{2}{3}$ eller $\\dfrac{3}{5}$?',
    choices: [
      '$\\dfrac{2}{3}$',
      '$\\dfrac{3}{5}$',
      'De är lika stora',
    ],
    correct: 0,
    why: [
      'Med samma nämnare syns det direkt: $\\frac{2}{3} = \\frac{10}{15}$ och $\\frac{3}{5} = \\frac{9}{15}$, och $\\frac{10}{15} > \\frac{9}{15}$.',
      '$\\frac{3}{5} = \\frac{9}{15}$ är mindre än $\\frac{2}{3} = \\frac{10}{15}$ — jämför genom att göra om till samma nämnare.',
      'Gör om till samma nämnare: $\\frac{10}{15}$ respektive $\\frac{9}{15}$ — de är inte lika.',
    ],
  },
],

'ma1c-1.3': [
  {
    question: 'Vad ska man göra **innan** man adderar två bråk med olika nämnare?',
    choices: [
      'Addera täljarna och nämnarna var för sig',
      'Förlänga ett eller flera av bråken så att alla får samma nämnare',
      'Förkorta båda bråken så långt det går',
      'Skriva om bråken i blandad form',
    ],
    correct: 1,
    why: [
      'Det är det klassiska felet — $\\frac{1}{2} + \\frac{1}{2}$ skulle då bli $\\frac{2}{4} = \\frac{1}{2}$, vilket uppenbart är fel.',
      'Först när bråken har samma nämnare går det att addera täljarna rakt av — därför förlänger man tills nämnarna är lika.',
      'Förkortning kan snygga till bråken men löser inte problemet — nämnarna måste bli lika innan additionen.',
      'Tvärtom — vid beräkningar ska alltid bråkform användas, inte blandad form.',
    ],
  },
  {
    question: 'Beräkna $\\dfrac{3}{7} + \\dfrac{2}{7}$.',
    choices: [
      '$\\dfrac{5}{14}$',
      '$\\dfrac{6}{49}$',
      '$\\dfrac{5}{7}$',
      '$\\dfrac{1}{7}$',
    ],
    correct: 2,
    why: [
      'Nämnarna ska inte adderas — bråken har redan samma nämnare, så det är bara täljarna som adderas.',
      'Här har täljare och nämnare multiplicerats — men det är en addition, inte en multiplikation.',
      'Samma nämnare: addera täljarna och behåll nämnaren, $\\frac{3 + 2}{7} = \\frac{5}{7}$.',
      'Det är differensen $\\frac{3}{7} - \\frac{2}{7}$ — här ska bråken adderas.',
    ],
  },
  {
    question: 'Vilken är den **minsta** gemensamma nämnaren (MGN) till 4 och 6?',
    choices: [
      '24',
      '12',
      '10',
      '6',
    ],
    correct: 1,
    why: [
      '24 är en gemensam nämnare (4 · 6), men inte den minsta — 12 dyker upp tidigare i båda multiplarkolumnerna.',
      'Multiplarna av 4 är 4, 8, 12 … och multiplarna av 6 är 6, 12 … — den första gemensamma multipeln är 12.',
      '10 är varken en multipel av 4 eller ett användbart val — inget av bråken kan förlängas till nämnaren 10 med heltal.',
      '6 är inte en multipel av 4 — fjärdedelarna kan inte skrivas om till sjättedelar med heltalsförlängning.',
    ],
  },
  {
    question: 'Skriv $2\\dfrac{1}{5}$ i bråkform.',
    choices: [
      '$\\dfrac{3}{5}$',
      '$\\dfrac{21}{5}$',
      '$\\dfrac{11}{5}$',
      '$\\dfrac{7}{5}$',
    ],
    correct: 2,
    why: [
      'Här har talet 2 och täljaren 1 adderats — men de hela ska först multipliceras med nämnaren: 2 hela är $\\frac{10}{5}$.',
      'Här har siffrorna 2 och 1 bara skrivits ihop — blandad form betyder $2 + \\frac{1}{5}$, inte 21 femtedelar.',
      'Talet framför bråket gånger nämnaren plus täljaren: $\\frac{2 \\cdot 5 + 1}{5} = \\frac{11}{5}$.',
      'Kontrollera: $\\frac{7}{5} = 1\\frac{2}{5}$, inte $2\\frac{1}{5}$.',
    ],
  },
  {
    question: 'Vilken form ska bråk skrivas i när man **räknar** med dem?',
    choices: [
      'Blandad form',
      'Bråkform',
      'Decimalform, alltid',
      'Det spelar ingen roll',
    ],
    correct: 1,
    why: [
      'Blandad form är bra för att *läsa av* en storlek (t.ex. $3\\frac{3}{4}$ tårtor), men i beräkningar ställer den till det.',
      'Vid beräkningar ska alltid bråkform användas — därför är det viktigt att kunna växla från blandad form till bråkform.',
      'Decimalform är ofta avrundad och kan ge avrundningsfel — bråkform är exakt.',
      'Jo — blandad form i en beräkning leder lätt till fel, t.ex. att $2\\frac{1}{5}$ råkar läsas som $2 \\cdot \\frac{1}{5}$.',
    ],
  },
],

'ma1c-1.4': [
  {
    question: 'Hur multiplicerar man två bråk?',
    choices: [
      'Täljare gånger täljare och nämnare gånger nämnare',
      'Bråken måste först få samma nämnare',
      'Täljare gånger nämnare korsvis',
      'Man inverterar det andra bråket och multiplicerar sedan',
    ],
    correct: 0,
    why: [
      'Vid multiplikation multipliceras täljarna med varandra och nämnarna med varandra: $\\frac{2}{3} \\cdot \\frac{5}{7} = \\frac{10}{21}$.',
      'Gemensam nämnare behövs vid addition och subtraktion — inte vid multiplikation.',
      'Korsvis multiplikation är ett minnesknep för att jämföra bråk eller lösa ekvationer, inte för att multiplicera dem.',
      'Invertering används vid division med bråk, inte vid multiplikation.',
    ],
  },
  {
    question: 'Vad gör man med bråket i **nämnaren** vid division med bråk?',
    choices: [
      'Man förkortar det så långt det går',
      'Man inverterar det och byter divisionen mot multiplikation',
      'Man förlänger det så att nämnarna blir lika',
      'Ingenting — man dividerar täljarna och nämnarna var för sig',
    ],
    correct: 1,
    why: [
      'Förkortning ändrar inte divisionen till något enklare räknesätt — regeln är att invertera och multiplicera.',
      'Divisionen byts mot multiplikation samtidigt som bråket i nämnaren inverteras: $\\frac{a}{b} \\Big/ \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$.',
      'Gemensam nämnare hör till addition och subtraktion — vid division inverterar man i stället.',
      'Det kan råka fungera i specialfall, men den allmänna regeln är invertera-och-multiplicera.',
    ],
  },
  {
    question: 'Beräkna $6 \\Big/ \\dfrac{2}{3}$.',
    choices: [
      '$4$',
      '$\\dfrac{1}{9}$',
      '$9$',
      '$\\dfrac{12}{3}$',
    ],
    correct: 2,
    why: [
      '$6 \\cdot \\frac{2}{3} = 4$ — men här ska det divideras, så bråket ska inverteras först.',
      'Här har divisionen vänts åt fel håll — det är bråket i nämnaren som ska inverteras, inte hela uttrycket.',
      'Skriv $6 = \\frac{6}{1}$, invertera och multiplicera: $\\frac{6}{1} \\cdot \\frac{3}{2} = \\frac{18}{2} = 9$.',
      '$\\frac{12}{3} = 4$ är resultatet av $6 \\cdot \\frac{2}{3}$ — division kräver invertering.',
    ],
  },
  {
    question: 'Hur mycket är $\\dfrac{2}{9}$ av 45 kr?',
    choices: [
      '5 kr',
      '10 kr',
      '18 kr',
      '90 kr',
    ],
    correct: 1,
    why: [
      '5 kr är $\\frac{1}{9}$ av 45 kr — här söks $\\frac{2}{9}$, alltså dubbelt så mycket.',
      'Bråkdel av något betyder multiplikation: $\\frac{2}{9} \\cdot 45 = \\frac{2 \\cdot 45}{9} = 2 \\cdot 5 = 10$.',
      '18 kr är $\\frac{2}{5}$ av 45 kr — kontrollera nämnaren.',
      '90 kr är dubbla beloppet — då har det multiplicerats med 2 utan att divideras med 9.',
    ],
  },
  {
    question: 'Varför lönar det sig att **faktorisera** täljare och nämnare innan man multiplicerar bråk med stora tal?',
    choices: [
      'Det gör att man slipper förkorta svaret',
      'Gemensamma faktorer kan förkortas bort innan talen hinner bli stora',
      'Det är enda sättet att få rätt svar',
      'Faktorisering förvandlar multiplikationen till en addition',
    ],
    correct: 1,
    why: [
      'Man förkortar fortfarande — men mycket enklare, eftersom faktorerna syns direkt.',
      'När täljare och nämnare skrivs som produkter syns gemensamma faktorer direkt och kan strykas — t.ex. $\\frac{7 \\cdot 6}{6 \\cdot 6 \\cdot 7 \\cdot 3} = \\frac{1}{18}$ utan att någonsin räkna ut $36 \\cdot 21$.',
      'Att multiplicera först och förkorta sedan ger också rätt svar — det är bara krångligare med stora tal.',
      'Räknesättet ändras inte — det är fortfarande multiplikation, bara med synliga faktorer.',
    ],
  },
],

'ma1c-1.5': [
  {
    question: 'Vad kallas ett värde som är avrundat?',
    choices: [
      'Närmevärde',
      'Medelvärde',
      'Gränsvärde',
      'Absolutvärde',
    ],
    correct: 0,
    why: [
      'Ett avrundat värde kallas närmevärde — det ligger nära, men är inte exakt lika med, det ursprungliga talet.',
      'Ett medelvärde är summan av flera värden delat med antalet — det har inget med avrundning att göra.',
      'Gränsvärde är ett begrepp som dyker upp först i senare kurser och handlar om vad ett uttryck närmar sig.',
      'Absolutvärdet av ett tal är talets avstånd till 0 på tallinjen, alltid utan tecken.',
    ],
  },
  {
    question: 'Avrunda 8,349 till tiondelar.',
    choices: [
      '8,4',
      '8,3',
      '8,35',
      '8',
    ],
    correct: 1,
    why: [
      '8,4 får man om man först avrundar till 8,35 och sedan en gång till — men avrundning görs i ett steg, och siffran efter tiondelssiffran är 4, som avrundar nedåt.',
      'Tiondelssiffran är 3 och siffran efter är 4 — den hör till gruppen 0–4, så tiondelssiffran behålls: 8,3.',
      '8,35 är avrundat till hundradelar, inte tiondelar.',
      '8 är avrundat till ental — här efterfrågas tiondelar.',
    ],
  },
  {
    question: 'Hur många värdesiffror har talet 0,0072?',
    choices: [
      '5',
      '4',
      '3',
      '2',
    ],
    correct: 3,
    why: [
      'Nollorna före 7:an räknas inte — de visar bara var decimaltecknet ligger.',
      'Den första värdesiffran är den första siffran som inte är 0 — nollorna i början räknas inte.',
      'Bara siffrorna från och med den första nollskilda siffran räknas: 7 och 2.',
      'Den första värdesiffran är den första siffran som inte är 0, alltså 7:an. Värdesiffrorna är 7 och 2 — två stycken.',
    ],
  },
  {
    question: 'Vid multiplikation av två mätvärden — vad avgör antalet värdesiffror i svaret?',
    choices: [
      'Värdet med minsta antalet decimaler',
      'Värdet med minsta antalet värdesiffror',
      'Värdet med största antalet värdesiffror',
      'Svaret anges alltid med tre värdesiffror',
    ],
    correct: 1,
    why: [
      'Minsta antalet decimaler styr vid addition och subtraktion — inte vid multiplikation.',
      'Vid multiplikation och division ger värdet med minsta antalet värdesiffror antalet värdesiffror i svaret — t.ex. 19,5 · 24 = 468 ≈ 470 (två värdesiffror, som i 24).',
      'Då skulle svaret se noggrannare ut än den sämsta mätningen — noggrannheten kan aldrig bli bättre än den osäkraste faktorn.',
      'Tre värdesiffror är en vanlig tumregel i fysiken när inget annat anges, men regeln här följer den minst noggranna faktorn.',
    ],
  },
  {
    question: 'Beräkna $5{,}84 - 2{,}1$ och svara med korrekt antal decimaler.',
    choices: [
      '3,74',
      '3,7',
      '3,8',
      '4',
    ],
    correct: 1,
    why: [
      '3,74 är rätt uträknat men inte korrekt avrundat — vid subtraktion styr värdet med minsta antalet decimaler (2,1 har en decimal).',
      'Differensen är 3,74, och eftersom 2,1 bara har en decimal avrundas svaret till en decimal: 3,7.',
      '3,8 är felavrundat — siffran efter tiondelssiffran är 4, som avrundar nedåt.',
      'Heltal vore för grovt — det minsta antalet decimaler bland termerna är en decimal, inte noll.',
    ],
  },
],

'ma1c-1.6': [
  {
    question: 'I potensen $3^5$ — vad kallas talet 3?',
    choices: [
      'Exponent',
      'Bas',
      'Faktor',
      'Koefficient',
    ],
    correct: 1,
    why: [
      'Exponenten är talet 5 — det som anger hur många gånger basen ska multipliceras med sig själv.',
      'Basen är det tal som upphöjs — här 3. Exponenten 5 anger antalet faktorer.',
      'I faktorformen $3 \\cdot 3 \\cdot 3 \\cdot 3 \\cdot 3$ är varje trea en faktor, men i potensskrivsättet kallas 3:an bas.',
      'Koefficient kallas talet framför en variabel, t.ex. 42 i $42x^3$.',
    ],
  },
  {
    question: 'Vad är $7^2 \\cdot 7^3$ skrivet som en enda potens?',
    choices: [
      '$7^6$',
      '$49^5$',
      '$7^5$',
      '$14^5$',
    ],
    correct: 2,
    why: [
      '$7^6$ fås om exponenterna multipliceras — men vid multiplikation av potenser med samma bas ska de adderas.',
      'Basen ändras inte vid multiplikation av potenser — bara exponenterna adderas.',
      'Potenslagen ger $7^2 \\cdot 7^3 = 7^{2+3} = 7^5$.',
      'Baserna ska inte adderas — båda potenserna har redan samma bas 7, och den behålls.',
    ],
  },
  {
    question: 'Vad är $(a^3)^4$?',
    choices: [
      '$a^7$',
      '$a^{12}$',
      '$a^{81}$',
      '$a^{34}$',
    ],
    correct: 1,
    why: [
      '$a^7$ vore svaret på $a^3 \\cdot a^4$ — vid potens av potens multipliceras exponenterna i stället.',
      'Vid "potens av potens" multipliceras exponenterna: $(a^3)^4 = a^{3 \\cdot 4} = a^{12}$.',
      '81 är $3^4$ — men det är exponenterna 3 och 4 som ska multipliceras, inte upphöjas.',
      'Exponenterna ska inte skrivas ihop som siffror — de multipliceras: $3 \\cdot 4 = 12$.',
    ],
  },
  {
    question: 'Vilket värde har $-4^2$?',
    choices: [
      '$16$',
      '$-16$',
      '$-8$',
      '$8$',
    ],
    correct: 1,
    why: [
      '$16$ är värdet av $(-4)^2$, där hela talet −4 är basen. I $-4^2$ står minustecknet utanför potensen.',
      'Utan parentes är basen bara 4: $-4^2 = -(4 \\cdot 4) = -16$.',
      'Här har $4^2$ råkat bli $4 \\cdot 2$ — exponenten betyder upprepad multiplikation, inte multiplikation med 2.',
      'Både tecknet och potensen har tappats bort — $-4^2$ är minus "4 i kvadrat", alltså −16.',
    ],
  },
  {
    question: 'Hur utläses $7^3$?',
    choices: [
      '"7 i kvadrat"',
      '"3 upphöjt till 7"',
      '"7 i kubik"',
      '"7 gånger 3"',
    ],
    correct: 2,
    why: [
      '"I kvadrat" hör till exponenten 2 — här är exponenten 3.',
      'Ordningen är omvänd — basen är 7 och exponenten 3, så det utläses "7 upphöjt till 3".',
      'En trea i exponenten kan utläsas "i kubik", så $7^3$ blir "7 i kubik" (eller "7 upphöjt till 3").',
      '$7 \\cdot 3 = 21$ men $7^3 = 343$ — en potens är upprepad multiplikation, inte en enkel produkt.',
    ],
  },
],

'ma1c-1.7': [
  {
    question: 'Vad är $9^0$?',
    choices: [
      '$0$',
      '$1$',
      '$9$',
      'Odefinierat',
    ],
    correct: 1,
    why: [
      'Det vanligaste misstaget — men $\\frac{9^5}{9^5}$ är både $9^{5-5} = 9^0$ och uppenbart lika med 1, så $9^0 = 1$.',
      'Alla tal utom 0 upphöjt till 0 är 1 — det följer av potenslagen för division: $\\frac{9^5}{9^5} = 9^0 = 1$.',
      'Exponenten 0 betyder inte att talet behålls — det är exponenten 1 som gör det: $9^1 = 9$.',
      'Det är bara $0^0$ som är odefinierat (det motsvarar division med 0) — för alla andra baser är värdet 1.',
    ],
  },
  {
    question: 'Vad är $2^{-4}$?',
    choices: [
      '$-16$',
      '$-\\dfrac{1}{16}$',
      '$\\dfrac{1}{16}$',
      '$\\dfrac{1}{8}$',
    ],
    correct: 2,
    why: [
      'Minustecknet i exponenten gör inte värdet negativt — det betyder "1 dividerat med potensen".',
      'Det finns inget minustecken kvar i värdet: $2^{-4}$ är ett positivt bråk.',
      'Negativ exponent betyder $a^{-n} = \\frac{1}{a^n}$, så $2^{-4} = \\frac{1}{2^4} = \\frac{1}{16}$.',
      '$\\frac{1}{8} = 2^{-3}$ — kontrollera exponenten: här är den −4.',
    ],
  },
  {
    question: 'Skriv $\\dfrac{1}{x^3}$ som en potens med basen $x$.',
    choices: [
      '$x^{-3}$',
      '$x^{3}$',
      '$x^{\\frac{1}{3}}$',
      '$3x^{-1}$',
    ],
    correct: 0,
    why: [
      'Nämnaren "flyttas upp" med ombytt tecken på exponenten: $\\frac{1}{x^3} = x^{-3}$.',
      '$x^3$ är nämnaren själv — bråket är dess invers, och det kräver negativ exponent.',
      'Exponenten $\\frac{1}{3}$ betyder något helt annat (ett rotuttryck), inte "1 delat med".',
      'Trean är en exponent i uttrycket, inte en koefficient framför $x$.',
    ],
  },
  {
    question: 'Vad är $\\left(\\dfrac{5}{8}\\right)^{-1}$?',
    choices: [
      '$-\\dfrac{5}{8}$',
      '$\\dfrac{8}{5}$',
      '$\\dfrac{5}{8}$',
      '$-\\dfrac{8}{5}$',
    ],
    correct: 1,
    why: [
      'Exponenten −1 byter inte tecken på bråket — den inverterar det.',
      'Att upphöja ett bråk till −1 är samma sak som att invertera det: täljare och nämnare byter plats.',
      'Utan invertering har exponenten −1 inte använts alls.',
      'Bråket ska inverteras men inte byta tecken — värdet förblir positivt.',
    ],
  },
],

'ma1c-1.8': [
  {
    question: 'Vad kallas en exponent som innehåller ett bråk, t.ex. $25^{1/2}$?',
    choices: [
      'Rationell exponent',
      'Irrationell exponent',
      'Negativ exponent',
      'Bruten bas',
    ],
    correct: 0,
    why: [
      'En exponent som är ett bråk (ett rationellt tal) kallas rationell exponent.',
      'Irrationella tal är tal som INTE kan skrivas som bråk — bråkexponenter är tvärtom rationella.',
      'Negativa exponenter handlar om minustecken i exponenten, inte om bråk.',
      'Det är exponenten som är ett bråk — basen 25 är ett vanligt heltal.',
    ],
  },
  {
    question: 'Vad är $36^{1/2}$?',
    choices: [
      '$18$',
      '$6$',
      '$72$',
      '$\\dfrac{1}{36}$',
    ],
    correct: 1,
    why: [
      '18 är hälften av 36 — men exponenten $\\frac{1}{2}$ betyder kvadratrot, inte halvering.',
      'Exponenten $\\frac{1}{2}$ betyder kvadratroten: $36^{1/2} = \\sqrt{36} = 6$.',
      '72 är dubbla 36 — exponenten $\\frac{1}{2}$ är varken halvering eller dubblering.',
      '$\\frac{1}{36}$ vore $36^{-1}$ — negativ exponent, inte rationell.',
    ],
  },
  {
    question: 'Vilket uttryck är lika med $\\sqrt[3]{64}$?',
    choices: [
      '$64^{3}$',
      '$\\dfrac{64}{3}$',
      '$64^{1/3}$',
      '$3^{64}$',
    ],
    correct: 2,
    why: [
      '$64^3$ är 64 multiplicerat med sig själv tre gånger — motsatsen till att dra tredjeroten.',
      'Tredjeroten är ingen division — $\\sqrt[3]{64} = 4$ men $\\frac{64}{3} \\approx 21{,}3$.',
      'Regeln $a^{1/n} = \\sqrt[n]{a}$ ger $\\sqrt[3]{64} = 64^{1/3}$ (= 4, eftersom $4^3 = 64$).',
      'Här har bas och exponent bytt plats — rotens index hamnar i exponentens nämnare.',
    ],
  },
  {
    question: 'Hur beräknas $8^{2/3}$ enklast utan räknare?',
    choices: [
      'Ta tredjeroten ur 8 och kvadrera resultatet',
      'Dividera 8 med 3 och multiplicera med 2',
      'Kvadrera 8 och dividera med 3',
      'Ta kvadratroten ur 8 och upphöja till 3',
    ],
    correct: 0,
    why: [
      'Dela upp exponenten: $8^{2/3} = (8^{1/3})^2 = (\\sqrt[3]{8})^2 = 2^2 = 4$.',
      'Exponenten är inget vanligt bråk att multiplicera basen med — den styr rot och potens.',
      '$8^2/3$ vore något annat — i $8^{2/3}$ hör trean till rotdragningen, inte till en division av resultatet.',
      'Nämnaren 3 ger tredjeroten och täljaren 2 ger kvadreringen — inte tvärtom.',
    ],
  },
],

'ma1c-1.9': [
  {
    question: 'Vilket villkor gäller för talet $a$ i grundpotensformen $a \\cdot 10^n$?',
    choices: [
      '$0 \\leq a < 1$',
      '$1 \\leq a < 10$',
      '$1 \\leq a \\leq 100$',
      '$a$ kan vara vilket tal som helst',
    ],
    correct: 1,
    why: [
      'Med $a$ mindre än 1 (t.ex. $0{,}63 \\cdot 10^5$) är talet inte i grundpotensform.',
      'Talet framför tiopotensen ska vara minst 1 men mindre än 10 — t.ex. $6{,}3 \\cdot 10^4$, inte $63 \\cdot 10^3$.',
      'Tal mellan 10 och 100 framför tiopotensen (t.ex. $63 \\cdot 10^3$) är inte grundpotensform.',
      'Utan villkoret vore skrivsättet inte entydigt — samma tal kunde skrivas på många sätt.',
    ],
  },
  {
    question: 'Skriv 0,0008 i grundpotensform.',
    choices: [
      '$8 \\cdot 10^{-3}$',
      '$8 \\cdot 10^{-4}$',
      '$0{,}8 \\cdot 10^{-3}$',
      '$8 \\cdot 10^{4}$',
    ],
    correct: 1,
    why: [
      'Räkna nollorna före åttan: det är fyra (0,000…), inte tre.',
      'Antalet nollor innan första siffran ger den negativa exponenten — här 4: $0{,}0008 = 8 \\cdot 10^{-4}$.',
      '0,8 ligger inte mellan 1 och 10, så det är inte grundpotensform.',
      'Talet är mindre än 1, så exponenten måste vara negativ.',
    ],
  },
  {
    question: 'Vilken tiopotens motsvarar prefixet G (giga)?',
    choices: [
      '$10^{6}$',
      '$10^{9}$',
      '$10^{12}$',
      '$10^{-9}$',
    ],
    correct: 1,
    why: [
      '$10^6$ är mega (M) — giga är tusen gånger större.',
      'Giga betyder miljard: $1\\ \\mathrm{GB} = 10^9\\ \\mathrm{B}$.',
      '$10^{12}$ är tera (T) — som i terabyte.',
      '$10^{-9}$ är nano (n) — små tal, inte stora.',
    ],
  },
  {
    question: 'Skriv 0,0025 A med lämpligt prefix.',
    choices: [
      '2,5 mA',
      '25 mA',
      '2,5 µA',
      '2,5 cA',
    ],
    correct: 0,
    why: [
      '$0{,}0025\\ \\mathrm{A} = 2{,}5 \\cdot 10^{-3}\\ \\mathrm{A}$, och $10^{-3}$ är prefixet m (milli).',
      'Kontrollera grundpotensformen: $0{,}0025 = 2{,}5 \\cdot 10^{-3}$, inte $25 \\cdot 10^{-3}$.',
      'µ (mikro) är $10^{-6}$ — här är tiopotensen $10^{-3}$.',
      'c (centi) är $10^{-2}$ — det skulle ge 0,25 cA, och centi används sällan utanför längdmått.',
    ],
  },
  {
    question: 'Varför skrivs 270 000 N som 0,27 MN och inte som $2{,}7 \\cdot 10^5$ N med ett eget prefix?',
    choices: [
      'Det finns inget prefix för $10^5$, så talet justeras till närmaste tiopotens med prefix',
      'Prefixet för $10^5$ är för ovanligt för att användas i skolan',
      '270 000 N går inte att skriva i grundpotensform',
      'MN är fel — det borde vara 27 kN',
    ],
    correct: 0,
    why: [
      'Prefixen hoppar i tretal kring de vanliga ($10^3$, $10^6$, $10^9$ …), så $2{,}7 \\cdot 10^5$ skrivs om till $0{,}27 \\cdot 10^6 = 0{,}27$ MN.',
      'Det handlar inte om ovanlighet — det finns helt enkelt inget SI-prefix för $10^5$.',
      'Visst går det: $270\\ 000 = 2{,}7 \\cdot 10^5$ — men den tiopotensen saknar prefix.',
      'Kontrollera: $27\\ \\mathrm{kN} = 27\\ 000\\ \\mathrm{N}$, vilket är tio gånger för litet.',
    ],
  },
],

'ma1c-1.10': [
  {
    question: 'I vilken ordning ska räkneoperationerna prioriteras?',
    choices: [
      'Parenteser → potenser → multiplikation/division → addition/subtraktion',
      'Addition/subtraktion → multiplikation/division → potenser → parenteser',
      'Multiplikation/division → parenteser → potenser → addition/subtraktion',
      'Alltid från vänster till höger, oavsett räknesätt',
    ],
    correct: 0,
    why: [
      'Det är prioriteringsreglernas ordning — kom ihåg mattedjävulen uppifrån och ner: parenteser (hornen), potenser (ögonen), multiplikation/division, addition, subtraktion.',
      'Det är precis omvänd ordning — addition och subtraktion kommer sist, inte först.',
      'Parenteser går alltid först — de finns just för att tvinga fram en viss ordning.',
      'Vänster till höger gäller bara mellan operationer med SAMMA prioritet — annars gäller reglerna, t.ex. $5 + 2 \\cdot 3 = 11$, inte 21.',
    ],
  },
  {
    question: 'Beräkna $10 - 2 \\cdot 3$.',
    choices: [
      '$24$',
      '$4$',
      '$16$',
      '$-4$',
    ],
    correct: 1,
    why: [
      '24 fås om man räknar $10 - 2 = 8$ först — men multiplikationen har högre prioritet.',
      'Multiplikationen först: $10 - 2 \\cdot 3 = 10 - 6 = 4$.',
      '16 skulle kräva $10 + 2 \\cdot 3$ — kontrollera tecknet.',
      'Ordningen är rätt men subtraktionen har vänts: $10 - 6 = 4$, inte $6 - 10$.',
    ],
  },
  {
    question: 'Vad kallas svaret i en division?',
    choices: [
      'Produkt',
      'Differens',
      'Kvot',
      'Nämnare',
    ],
    correct: 2,
    why: [
      'Produkten är svaret i en multiplikation.',
      'Differensen är svaret i en subtraktion.',
      'Svaret i en division kallas kvot — t.ex. är kvoten $12/4 = 3$.',
      'Nämnaren är talet man dividerar MED, inte svaret.',
    ],
  },
  {
    question: 'Beräkna $\\dfrac{18}{7 - 4}$.',
    choices: [
      '$6$',
      '$-1{,}43$ (ungefär)',
      '$2{,}57 - 4$ (går inte att förenkla)',
      '$14$',
    ],
    correct: 0,
    why: [
      'Divisionen har en "osynlig" parentes kring nämnaren: $\\frac{18}{(7-4)} = \\frac{18}{3} = 6$.',
      'Här har $\\frac{18}{7}$ beräknats först och sedan subtraherats med 4 — men hela nämnaren $7 - 4$ hör ihop.',
      'Nämnaren beräknas alltid först som en helhet — uttrycket förenklas utmärkt till 6.',
      'Kontrollera: $\\frac{18}{3} = 6$, inte 14.',
    ],
  },
  {
    question: 'Vad symboliserar hornen på "mattedjävulen"?',
    choices: [
      'Potenser',
      'Parenteser',
      'Multiplikation',
      'Subtraktion',
    ],
    correct: 1,
    why: [
      'Potenserna är ögonen (upphöjt-tecknen ^ ^) — nivå två uppifrån.',
      'Hornen är böjda som parenteser ( ) och sitter överst — parenteser prioriteras först.',
      'Multiplikationspunkten sitter på kinden, i mitten av ansiktet — tredje prioritet.',
      'Minustecknet är hakan längst ner — subtraktion kommer sist.',
    ],
  },
],

'ma1c-1.11': [
  {
    question: 'Räknaren visar \`2,5E-4\`. Vilket tal är det?',
    choices: [
      '$0{,}000\\ 25$',
      '$-2{,}54$',
      '$25\\ 000$',
      '$2{,}5 - 4$',
    ],
    correct: 0,
    why: [
      'E-notationen betyder "gånger 10 upphöjt till": $2{,}5\\mathrm{E}{-4} = 2{,}5 \\cdot 10^{-4} = 0{,}000\\ 25$.',
      'E är ingen subtraktion eller decimal — det är en tiopotens.',
      '$25\\ 000$ vore $2{,}5\\mathrm{E}4$ — exponenten här är negativ, så talet är litet.',
      'E:t skiljer talet från exponenten — det är inte ett minusuttryck.',
    ],
  },
  {
    question: 'Hur ska $\\dfrac{360}{2 \\cdot 3}$ slås in på räknaren för att ge rätt svar (60)?',
    choices: [
      '\`360/2*3\`',
      '\`360/(2*3)\`',
      '\`(360/2)*3\`',
      '\`360*2/3\`',
    ],
    correct: 1,
    why: [
      '\`360/2*3\` tolkas från vänster: $\\frac{360}{2} \\cdot 3 = 540$ — fel.',
      'Bråkstrecket har en osynlig parentes kring nämnaren — på räknaren måste den skrivas ut: $360/(2 \\cdot 3) = 60$.',
      'Det är exakt vad räknaren gör med alternativet utan parentes — och det ger 540, inte 60.',
      'Här har räknesätten kastats om helt: $360 \\cdot 2 / 3 = 240$.',
    ],
  },
  {
    question: 'Vad händer om man slår \`-3,7^2\` utan parentes i stället för \`(-3,7)^2\`?',
    choices: [
      'Räknaren ger samma svar, 13,69',
      'Räknaren ger −13,69, eftersom potensen prioriteras före minustecknet',
      'Räknaren ger ett felmeddelande',
      'Räknaren ger 7,4',
    ],
    correct: 1,
    why: [
      'Utan parentes upphöjer räknaren bara 3,7 och sätter minustecknet efteråt — svaren skiljer sig åt.',
      'Potenser prioriteras före minustecknet, så \`-3,7^2\` tolkas som $-(3{,}7^2) = -13{,}69$. Ska hela −3,7 kvadreras krävs parentes.',
      'Uttrycket är giltigt — det ger bara ett annat (negativt) svar än väntat.',
      '7,4 vore $3{,}7 \\cdot 2$ — potensen är inte en multiplikation.',
    ],
  },
],

// ── Kapitel 2: Algebra och ekvationer ─────────────────────────

'ma1c-2.1': [
  {
    question: 'I uttrycket $800 + 150x$ — vad kallas $x$?',
    choices: [
      'Koefficient',
      'Variabel',
      'Konstantterm',
      'Produkt',
    ],
    correct: 1,
    why: [
      'Koefficienten är talet 150 — det som multipliceras med variabeln.',
      'Bokstaven som kan anta olika värden kallas variabel.',
      'Konstanttermen är 800 — termen som bara består av ett tal.',
      'En produkt är resultatet av en multiplikation — $x$ är en enskild bokstav.',
    ],
  },
  {
    question: 'Vad kallas termen $150x$ i uttrycket $800 + 150x$?',
    choices: [
      'Konstantterm',
      'Koefficient',
      'Variabelterm',
      'Uttryckets värde',
    ],
    correct: 2,
    why: [
      'Konstanttermen är 800 — den innehåller ingen variabel.',
      'Koefficienten är bara talet 150, inte hela termen.',
      'Hela termen som innehåller variabeln kallas variabelterm.',
      'Uttryckets värde är det tal man får när man sätter in ett värde på $x$ och räknar ut alltihop.',
    ],
  },
  {
    question: 'Vad är värdet av uttrycket $30 - 4x$ när $x = 5$?',
    choices: [
      '$10$',
      '$26$',
      '$130$',
      '$-10$',
    ],
    correct: 0,
    why: [
      'Ersätt $x$ med 5: $30 - 4 \\cdot 5 = 30 - 20 = 10$.',
      'Här har $4 \\cdot 5$ blivit 4 — koefficienten ska multipliceras med variabelns värde.',
      'Här har $30 - 4 = 26$ multiplicerats med 5 — men multiplikationen prioriteras före subtraktionen.',
      'Kontrollera ordningen: $30 - 20 = 10$, inte $20 - 30$.',
    ],
  },
  {
    question: 'Bullar kostar $a$ kr/st och kanelsnäckor $b$ kr/st. Vad beskriver uttrycket $6a - 2b$?',
    choices: [
      'Kostnaden för 6 bullar och 2 kanelsnäckor',
      'Prisskillnaden mellan 6 bullar och 2 kanelsnäckor',
      'Kostnaden för 4 bullar',
      'Antalet bullar minus antalet kanelsnäckor',
    ],
    correct: 1,
    why: [
      'Kostnaden för båda tillsammans vore summan $6a + 2b$ — här står ett minustecken.',
      'Differensen $6a - 2b$ jämför priset på 6 bullar med priset på 2 kanelsnäckor.',
      'Termerna har olika variabler ($a$ och $b$) och kan inte slås ihop till $4a$.',
      'Uttrycket handlar om kronor (pris gånger antal), inte om antal.',
    ],
  },
],

'ma1c-2.2': [
  {
    question: 'Vilka termer får läggas ihop när man förenklar ett uttryck?',
    choices: [
      'Alla termer i uttrycket',
      'Endast likadana termer — $x$-termer för sig, $y$-termer för sig osv.',
      'Endast termer med plustecken framför',
      'Endast konstanttermer',
    ],
    correct: 1,
    why: [
      'Olika slags termer kan inte slås ihop — $6x + 12y$ går inte att förenkla vidare.',
      'Likadana termer läggs ihop var för sig: $x$-termer, $y$-termer, $x^2$-termer och konstanttermer separat.',
      'Tecknet följer med termen i beräkningen, men både plus- och minustermer av samma slag läggs ihop.',
      'Även variabeltermer av samma slag läggs ihop, t.ex. $8x - 2x = 6x$.',
    ],
  },
  {
    question: 'Förenkla $5x + 2y - 3x + y$.',
    choices: [
      '$2x + 3y$',
      '$8x + 3y$',
      '$2x + 2y$',
      '$5xy$',
    ],
    correct: 0,
    why: [
      '$5x - 3x = 2x$ och $2y + y = 3y$ ger $2x + 3y$.',
      'Tecknet framför $3x$ är minus — termerna ska subtraheras, inte adderas.',
      'Glöm inte att $y$ är samma sak som $1y$: $2y + y = 3y$.',
      'Olika variabler kan inte multipliceras ihop vid en addition.',
    ],
  },
  {
    question: 'Vad händer med tecknen när parentesen tas bort i $a - (b - c)$?',
    choices: [
      'Ingenting: $a - b - c$',
      'Alla tecken inuti byts: $a - b + c$',
      'Bara första termens tecken byts: $a + b - c$',
      'Parentesen kan inte tas bort',
    ],
    correct: 1,
    why: [
      'Utan teckenbyte har minustecknet framför parentesen bara applicerats på $b$ men inte på $c$.',
      'Minustecken framför en parentes byter tecknen på ALLA termer inuti: $a - (b - c) = a - b + c$.',
      'Det är precis tvärtom — alla tecken byts, inte bara det första.',
      'Det går utmärkt — det är just teckenbytet som gör det möjligt.',
    ],
  },
  {
    question: 'Förenkla $12x - (3x + 5)$.',
    choices: [
      '$9x + 5$',
      '$9x - 5$',
      '$15x - 5$',
      '$4x$',
    ],
    correct: 1,
    why: [
      'Även 5:ans tecken byts när minusparentesen tas bort: $12x - 3x - 5$.',
      'Minustecknet byter båda tecknen inuti: $12x - 3x - 5 = 9x - 5$.',
      '$3x$ ska subtraheras, inte adderas — minustecknet står framför parentesen.',
      '$9x$ och $-5$ är olika slags termer och kan inte slås ihop till $4x$.',
    ],
  },
],

'ma1c-2.3': [
  {
    question: 'Vad säger den distributiva lagen?',
    choices: [
      '$a(b + c) = ab + ac$',
      '$a(b + c) = ab + c$',
      '$a + (b + c) = ab + ac$',
      '$(a + b)(c + d) = ac + bd$',
    ],
    correct: 0,
    why: [
      'Faktorn framför parentesen multipliceras med varje term inuti: $a(b + c) = ab + ac$.',
      'Här har faktorn bara multiplicerats med den första termen — den ska in i varje term.',
      'Med ett plustecken framför parentesen sker ingen multiplikation alls.',
      'Vid två parenteser ska varje term i den första multipliceras med varje term i den andra — här saknas $ad$ och $bc$.',
    ],
  },
  {
    question: 'Utveckla $3(4x - 5)$.',
    choices: [
      '$12x - 5$',
      '$12x - 15$',
      '$7x - 8$',
      '$12x + 15$',
    ],
    correct: 1,
    why: [
      'Trean ska multipliceras med BÅDA termerna, även med −5.',
      'Distributiva lagen: $3 \\cdot 4x - 3 \\cdot 5 = 12x - 15$.',
      'Faktorn ska multipliceras, inte adderas, med termerna.',
      'Tecknet följer med: $3 \\cdot (-5) = -15$, inte $+15$.',
    ],
  },
  {
    question: 'Hur många multiplikationer görs när $(a + b)(c + d)$ utvecklas?',
    choices: [
      'Två',
      'Tre',
      'Fyra',
      'En',
    ],
    correct: 2,
    why: [
      'Två multiplikationer ($ac + bd$) missar korstermerna $ad$ och $bc$.',
      'Det blir en term för varje par — och paren är fyra.',
      'Varje term i den första parentesen multipliceras med varje term i den andra: $ac$, $ad$, $bc$ och $bd$ — fyra stycken.',
      'En enda multiplikation räcker bara när båda parenteserna innehåller en term var.',
    ],
  },
  {
    question: 'Vad är första steget när $10 - (x - 2)(x - 3)$ ska förenklas?',
    choices: [
      'Byta tecken på termerna i den första parentesen',
      'Utveckla parentesparet men behålla en stor parentes runt resultatet',
      'Multiplicera in 10:an i parenteserna',
      'Stryka parenteserna direkt',
    ],
    correct: 1,
    why: [
      'Teckenbytet görs på det UTVECKLADE uttrycket, inte på en av parenteserna i förväg.',
      'Utveckla $(x-2)(x-3)$ inom en stor parentes — minustecknet framför ska sedan byta tecken på alla termer i den.',
      '10:an är en term (subtraktion framför), inte en faktor — den ska inte multipliceras in.',
      'Stryks parenteserna tappas minustecknets verkan på alla termer utom den första.',
    ],
  },
],

'ma1c-2.4': [
  {
    question: 'Vad innebär det att **faktorisera** ett uttryck?',
    choices: [
      'Att skriva uttrycket som en multiplikation',
      'Att räkna ut uttryckets värde',
      'Att ta bort alla parenteser',
      'Att lägga ihop likadana termer',
    ],
    correct: 0,
    why: [
      'Faktorisering skriver om uttrycket som en produkt av faktorer, t.ex. $27x^2 - 18x = 9x(3x - 2)$.',
      'Värdet beräknas när variabeln får ett tal — faktorisering ändrar bara uttryckets form.',
      'Det är tvärtom utveckling — faktorisering SKAPAR parenteser.',
      'Det är förenkling — faktorisering handlar om att bryta ut gemensamma faktorer.',
    ],
  },
  {
    question: 'Vilken är den största gemensamma faktorn i $27x^2 - 18x$?',
    choices: [
      '$9$',
      '$x$',
      '$9x$',
      '$3x$',
    ],
    correct: 2,
    why: [
      '9 är rätt för koefficienterna — men båda termerna innehåller dessutom $x$.',
      '$x$ kan brytas ut — men även koefficienterna har en gemensam faktor, 9.',
      'Koefficienterna 27 och 18 delas båda av 9, och den minsta potensen av $x$ är $x$ — tillsammans $9x$.',
      '3 är en gemensam delare men inte den största — 9 delar både 27 och 18.',
    ],
  },
  {
    question: 'Faktorisera $15x - 10$.',
    choices: [
      '$5(3x - 2)$',
      '$5x(3 - 2)$',
      '$5(3x - 10)$',
      '$15(x - 10)$',
    ],
    correct: 0,
    why: [
      'Största gemensamma delaren till 15 och 10 är 5: $15x - 10 = 5(3x - 2)$.',
      'Konstanttermen 10 innehåller inget $x$, så $x$ kan inte brytas ut.',
      'Kontrollera med multiplikation: $5 \\cdot 3x - 5 \\cdot 10 = 15x - 50$, inte $15x - 10$.',
      '15 delar inte 10 — kontrollera med multiplikation: $15x - 150$ blir fel.',
    ],
  },
  {
    question: 'Hur kontrollerar man enklast att en faktorisering är korrekt?',
    choices: [
      'Genom att multiplicera ihop faktorerna och jämföra med det ursprungliga uttrycket',
      'Genom att sätta $x = 0$ i båda uttrycken',
      'Genom att derivera båda uttrycken',
      'Det går inte att kontrollera en faktorisering',
    ],
    correct: 0,
    why: [
      'Faktorisering är "distributiva lagen baklänges" — multiplicera in igen och se att det ursprungliga uttrycket kommer tillbaka.',
      '$x = 0$ kollar bara konstanttermen — likheten måste gälla för ALLA $x$, och t.ex. missar testet fel i $x$-koefficienten.',
      'Derivering hör till senare kurser — och multiplikation är både enklare och tillräcklig.',
      'Det går utmärkt — kontrollen är en vanlig utveckling av parentesen.',
    ],
  },
],

'ma1c-2.5': [
  {
    question: 'Vad är grundprincipen vid ekvationslösning?',
    choices: [
      'Det man gör på ena sidan av likhetstecknet måste man också göra på andra sidan',
      'Man testar olika värden på variabeln tills ekvationen stämmer',
      'Variabeln ska alltid stå i vänsterledet',
      'Man börjar alltid med att dividera båda led',
    ],
    correct: 0,
    why: [
      'Likheten bevaras bara om båda led behandlas lika — det är hela balansprincipen.',
      'Prövning (att testa sig fram) är uttryckligen inte tillåtet vid ekvationslösning — lösningen ska härledas.',
      'Variabeln får stå var som helst — målet är bara att den till slut står ensam.',
      'Vilken operation som görs först beror på ekvationen — ofta tas termer bort före faktorer.',
    ],
  },
  {
    question: 'Vilken operation löser ekvationen $x - 24 = 72$?',
    choices: [
      'Subtrahera 24 från båda led',
      'Addera 24 till båda led',
      'Dividera båda led med 24',
      'Multiplicera båda led med 24',
    ],
    correct: 1,
    why: [
      'Då blir vänsterledet $x - 48$ — termen försvinner inte.',
      'För att få bort en term som subtraheras adderas den till båda led: $x = 72 + 24 = 96$.',
      'Division tar bort en faktor, inte en term.',
      'Multiplikation tar bort en nämnare, inte en term.',
    ],
  },
  {
    question: 'Lös ekvationen $9x = 63$.',
    choices: [
      '$x = 7$',
      '$x = 54$',
      '$x = 72$',
      '$x = 567$',
    ],
    correct: 0,
    why: [
      'Faktorn 9 tas bort genom division med 9 i båda led: $x = \\frac{63}{9} = 7$.',
      '54 är $63 - 9$ — men 9:an är en faktor och ska divideras bort, inte subtraheras.',
      '72 är $63 + 9$ — fel operation.',
      '567 är $63 \\cdot 9$ — multiplikation är motsatsen till vad som behövs här.',
    ],
  },
  {
    question: 'Hur kontrollerar man att $x = 7$ löser ekvationen $4x + 7 = 35$?',
    choices: [
      'Sätt in 7 i stället för $x$ och kontrollera att vänsterledet blir lika med högerledet',
      'Lös ekvationen en gång till på ett annat sätt',
      'Kontrollera att 7 är ett heltal',
      'Derivera båda led',
    ],
    correct: 0,
    why: [
      '$\\mathrm{VL} = 4 \\cdot 7 + 7 = 35 = \\mathrm{HL}$ — likheten stämmer, så lösningen är korrekt.',
      'Det kan fungera men är omständligt — insättning i den ursprungliga ekvationen räcker.',
      'Lösningar behöver inte vara heltal — t.ex. har $\\frac{7x}{6} - 15 = -11$ lösningen $x = \\frac{24}{7}$.',
      'Derivering hör inte hemma i ekvationskontroll — det är insättning som gäller.',
    ],
  },
  {
    question: 'Ekvationen $\\dfrac{7x}{6} - 15 = -11$ har lösningen $x = \\dfrac{24}{7}$. Hur bör svaret anges?',
    choices: [
      'Exakt som bråket $\\dfrac{24}{7}$ — avrunda inte',
      'Avrundat till 3,4',
      'Avrundat till 3',
      'Som blandad form $3\\dfrac{3}{7}$, alltid',
    ],
    correct: 0,
    why: [
      'Bråkformen är exakt — en avrundad decimalform är bara ett närmevärde och gör svaret sämre.',
      '3,4 är ett närmevärde — det exakta svaret $\\frac{24}{7}$ ska behållas.',
      'Att avrunda till heltal kastar bort ännu mer information.',
      'Blandad form är tillåten som avläsning men bråkform är standard — och kravet är framför allt att INTE avrunda.',
    ],
  },
],

'ma1c-2.6': [
  {
    question: 'Vad är första steget när en ekvation har variabler i **båda** led, t.ex. $2x + 8 = 9x - 20$?',
    choices: [
      'Samla variabeltermerna på ena sidan av likhetstecknet',
      'Dividera båda led med $x$',
      'Prova olika värden på $x$',
      'Byta plats på vänster- och högerled',
    ],
    correct: 0,
    why: [
      'Ta bort variabeltermen med minst koefficient från sin sida — här subtraheras $2x$ från båda led.',
      'Division med $x$ är riskabel ($x$ kan vara 0) och löser inte problemet med termerna.',
      'Prövning är inte tillåtet vid ekvationslösning — lösningen ska härledas steg för steg.',
      'Det ändrar ingenting i sak — variablerna finns fortfarande i båda led.',
    ],
  },
  {
    question: 'Från vilken sida bör variabeltermen tas bort, enligt genomgången?',
    choices: [
      'Från den sida där variabeltermen har minst koefficient',
      'Alltid från vänsterledet',
      'Alltid från högerledet',
      'Det spelar ingen roll för resultatet — men minst koefficient brukar bli enklast',
    ],
    correct: 0,
    why: [
      'Då blir den kvarvarande koefficienten positiv och räkningen enklast — t.ex. tas $2x$ bort ur $2x + 8 = 9x - 20$.',
      'Vänsterledet kan lika gärna ha den största koefficienten — då är det bättre att ta bort högerledets term.',
      'Samma sak gäller där — det är koefficientens storlek som avgör, inte sidan.',
      'Resultatet blir förstås detsamma oavsett — men genomgångens rekommendation är just minst koefficient, så det första alternativet är mer precist.',
    ],
  },
  {
    question: 'Lös ekvationen $6x + 4 = 2x + 24$.',
    choices: [
      '$x = 5$',
      '$x = 7$',
      '$x = 3{,}5$',
      '$x = 2{,}5$',
    ],
    correct: 0,
    why: [
      'Subtrahera $2x$: $4x + 4 = 24$. Subtrahera 4: $4x = 20$. Dividera med 4: $x = 5$.',
      '7 fås om 4:an adderas i stället för subtraheras — kontrollera stegen.',
      '3,5 fås om $2x$ läggs till i stället för att dras bort ($8x = 28$).',
      'Kontrollera: $6 \\cdot 2{,}5 + 4 = 19$ men $2 \\cdot 2{,}5 + 24 = 29$ — inte lika.',
    ],
  },
  {
    question: 'Ekvationen $3(7x - 4) = 7(9 + 3x)$ förenklas till $-12 = 63$. Vad är slutsatsen?',
    choices: [
      'Ekvationen saknar lösning',
      '$x = -12$ eller $x = 63$',
      '$x = 75$',
      'Alla tal löser ekvationen',
    ],
    correct: 0,
    why: [
      'När variabeltermerna tar ut varandra och kvar står en falsk likhet finns inget $x$ som gör ekvationen sann.',
      'Talen −12 och 63 är inte lösningar — de är resterna av konstanttermerna efter förenklingen.',
      'Det finns inget steg som ger 75 — likheten är falsk oavsett $x$.',
      'Det hade krävt en SANN likhet (som $0 = 0$) efter att variablerna försvunnit.',
    ],
  },
],

'ma1c-2.7': [
  {
    question: 'Vilka värden på $x$ är inte tillåtna i ekvationen $\\dfrac{9}{2x} = \\dfrac{3}{8}$?',
    choices: [
      '$x \\neq 0$',
      '$x \\neq 8$',
      '$x \\neq 2$',
      'Alla värden är tillåtna',
    ],
    correct: 0,
    why: [
      'Nämnaren $2x$ får inte bli 0, och $2x = 0$ precis när $x = 0$.',
      '8 står i en nämnare men innehåller ingen variabel — den kan aldrig bli 0.',
      '$x = 2$ ger nämnaren $2 \\cdot 2 = 4 \\neq 0$ — helt tillåtet.',
      'Variabeln finns i en nämnare, så värden som nollar nämnaren måste uteslutas.',
    ],
  },
  {
    question: 'Vilken metod passar när det står EN bråkterm i varje led, t.ex. $\\dfrac{9}{2x} = \\dfrac{3}{8}$?',
    choices: [
      'Korsvis multiplikation',
      'Kvadrering av båda led',
      'Prövning',
      'Faktorisering',
    ],
    correct: 0,
    why: [
      'Täljaren i ena bråket multipliceras med nämnaren i det andra och vice versa: $3 \\cdot 2x = 9 \\cdot 8$.',
      'Kvadrering hör till rotekvationer — här skulle den bara göra uttrycken krångligare.',
      'Prövning är inte tillåtet vid ekvationslösning.',
      'Det finns inga gemensamma faktorer att bryta ut som löser problemet med nämnarna.',
    ],
  },
  {
    question: 'Vad multiplicerar man båda led med för att lösa $\\dfrac{x}{3} + \\dfrac{1}{4} = \\dfrac{5}{6}$ enligt MGN-metoden?',
    choices: [
      '12',
      '6',
      '72',
      '13',
    ],
    correct: 0,
    why: [
      '12 är det minsta talet som är delbart med 3, 4 och 6 — multiplikationen ger $4x + 3 = 10$.',
      '6 är inte delbart med 4 — bråket $\\frac{1}{4}$ skulle inte bli heltaligt.',
      '72 fungerar (alla nämnare delar 72) men är inte den MINSTA gemensamma nämnaren — talen blir onödigt stora.',
      '13 är inte delbart med någon av nämnarna.',
    ],
  },
  {
    question: 'Ekvationen $\\dfrac{5x - 35}{x - 7} = 4$ ger räknevägen $x = 7$. Vad är slutsatsen?',
    choices: [
      'Lösningen är $x = 7$',
      'Ekvationen saknar lösning, eftersom $x = 7$ gör nämnaren till 0',
      'Lösningen är $x = -7$',
      'Ekvationen har oändligt många lösningar',
    ],
    correct: 1,
    why: [
      '$x = 7$ ger nämnaren $7 - 7 = 0$ — division med 0 är inte definierad, så värdet är förbjudet.',
      'Kandidatvärdet krockar med villkoret $x \\neq 7$ som sattes upp innan lösningen — alltså saknas lösning.',
      'Teckenbyte hjälper inte — insättning av $-7$ ger $\\frac{-70}{-14} = 5 \\neq 4$.',
      'En falsk likhet utan variabler hade behövts för "saknar lösning" på det sättet — här är problemet i stället det förbjudna värdet.',
    ],
  },
],

'ma1c-2.8': [
  {
    question: 'Vilka är de tre stegen i metoden för problemlösning med ekvationer, i rätt ordning?',
    choices: [
      'Översätt → lös ekvationen → tolka och svara',
      'Lös ekvationen → översätt → svara',
      'Gissa → kontrollera → justera',
      'Rita figur → mät → beräkna',
    ],
    correct: 0,
    why: [
      'Först införs en beteckning och en ekvation ställs upp, sedan löses ekvationen, och till sist tolkas svaret med enhet och rimlighetskoll.',
      'Ekvationen kan inte lösas innan den finns — översättningen kommer först.',
      'Gissa-och-justera är prövning, vilket inte är tillåtet vid ekvationslösning.',
      'Figurer kan hjälpa, men metoden bygger på att översätta till en ekvation.',
    ],
  },
  {
    question: 'Vad bör man införa beteckningen $x$ på i ett problemlösningsproblem?',
    choices: [
      'Det som efterfrågas i uppgiften',
      'Det största talet i uppgiften',
      'Alltid tiden',
      'Det första talet som nämns',
    ],
    correct: 0,
    why: [
      'Kalla det som söks för $x$ — då är ekvationens lösning direkt svaret på frågan. Skriv ner vad $x$ betyder!',
      'Storleken på talen har inget med valet att göra.',
      'Tid är bara en av många möjliga storheter.',
      'Ordningen i texten spelar ingen roll — det är frågan som styr.',
    ],
  },
  {
    question: 'Rayan får dubbelt så mycket som Arielle, som får $x$ kr. Samuel får 300 kr mindre än Rayan. Vilket uttryck beskriver Samuels belopp?',
    choices: [
      '$2x - 300$',
      '$x - 300$',
      '$2x + 300$',
      '$2(x - 300)$',
    ],
    correct: 0,
    why: [
      'Rayan får $2x$ kr, och Samuel får 300 kr mindre än så: $2x - 300$.',
      'Samuel jämförs med Rayan (som får $2x$), inte med Arielle.',
      '"Mindre än" betyder subtraktion, inte addition.',
      'Subtraktionen görs efter dubblingen — 300 kr dras från Rayans belopp, inte från Arielles före dubblingen.',
    ],
  },
  {
    question: 'Varför avslutas problemlösningen med att fråga "är svaret rimligt?"',
    choices: [
      'En rimlighetskoll avslöjar översättnings- och räknefel — t.ex. en ålder på 500 år',
      'Det är bara en artighetsfras',
      'För att kunna avrunda svaret korrekt',
      'För att slippa kontrollera ekvationen',
    ],
    correct: 0,
    why: [
      'Om svaret är orimligt i sitt sammanhang har något gått fel i översättningen eller lösningen — tolkningssteget fångar det.',
      'Rimlighetsbedömningen är en riktig kontroll av hela kedjan, inte en formalitet.',
      'Avrundning styrs av värdesiffror — rimligheten handlar om storleksordning och sammanhang.',
      'Tvärtom — rimlighetskollen är en del av kontrollen, och insättning i ekvationen är fortfarande bra.',
    ],
  },
],

'ma1c-2.9': [
  {
    question: 'Vad avgör en ekvations **grad**?',
    choices: [
      'Variabeltermen med högst exponent',
      'Antalet termer i ekvationen',
      'Storleken på konstanttermen',
      'Antalet lösningar',
    ],
    correct: 0,
    why: [
      'Högsta exponenten på variabeln ger graden — $x^2 + 7 = 11$ är av grad 2 och $x^3 - 8 = 1$ av grad 3.',
      'En ekvation kan ha många termer och ändå vara av första graden.',
      'Konstanttermen påverkar inte graden alls.',
      'Antalet lösningar hänger ihop med graden men definierar den inte.',
    ],
  },
  {
    question: 'Hur många lösningar har ekvationen $x^2 = 49$?',
    choices: [
      'En: $x = 7$',
      'Två: $x = 7$ och $x = -7$',
      'Ingen',
      'Fyra',
    ],
    correct: 1,
    why: [
      'Den negativa lösningen glöms lätt — men $(-7)^2 = 49$ också.',
      'Kvadraten av både 7 och −7 är 49, så $x = \\pm 7$.',
      'Lösningar saknas bara när högerledet är negativt, t.ex. $x^2 = -9$.',
      'En andragradsekvation har högst två lösningar.',
    ],
  },
  {
    question: 'Vad gäller för ekvationen $x^3 = -8$?',
    choices: [
      'Den saknar lösning, eftersom högerledet är negativt',
      'Den har lösningen $x = -2$',
      'Den har lösningarna $x = \\pm 2$',
      'Den har lösningen $x = 2$',
    ],
    correct: 1,
    why: [
      'Det gäller för $x^2$ — men tredjeroten ur negativa tal fungerar: tre minustecken multiplicerade ger minus.',
      '$(-2)^3 = (-2)(-2)(-2) = -8$ — tredjegradsekvationen har exakt denna lösning.',
      '±-paret hör till jämna exponenter — $2^3 = +8$, inte $-8$.',
      '$2^3 = 8$, med fel tecken — lösningen är negativ.',
    ],
  },
  {
    question: 'En kvadrat har arean $196\\ \\mathrm{cm^2}$. Ekvationen $x^2 = 196$ ger $x = \\pm 14$. Vad är kvadratens sida?',
    choices: [
      '14 cm — den negativa lösningen förkastas eftersom en sida inte kan vara negativ',
      '±14 cm — båda lösningarna ska anges',
      '98 cm — arean delas med 2',
      '49 cm — arean delas med 4',
    ],
    correct: 0,
    why: [
      'Matematiskt har ekvationen två lösningar, men i sammanhanget är bara den positiva rimlig — en längd kan inte vara negativ.',
      'I en geometrisk tillämpning tolkas svaret — en negativ sidlängd är orimlig och förkastas.',
      'Arean är sidan i kvadrat, inte sidan gånger 2.',
      'Division med 4 hör till omkretsen ($O = 4x$), inte arean.',
    ],
  },
],

'ma1c-2.10': [
  {
    question: 'Vad kallas en ekvation där variabeln är en potens, t.ex. $x^{14} = 80\\ 000$?',
    choices: [
      'Potensekvation',
      'Exponentialekvation',
      'Andragradsekvation',
      'Rotekvation',
    ],
    correct: 0,
    why: [
      'Variabeln är basen i en potens ("upphöjt till något") — en potensekvation.',
      'I en exponentialekvation sitter variabeln i EXPONENTEN (t.ex. $2^x = 8$) — här är den basen.',
      'Andragradsekvationen är specialfallet $n = 2$ — här är exponenten 14.',
      'Rotuttryck används för att LÖSA potensekvationer, men det är inte ekvationens namn.',
    ],
  },
  {
    question: 'Vilken är lösningen till $x^n = a$ skriven med potenslagar?',
    choices: [
      '$x = a^{1/n}$',
      '$x = a^n$',
      '$x = \\dfrac{a}{n}$',
      '$x = n^a$',
    ],
    correct: 0,
    why: [
      'Upphöj båda led till exponentens invers $\\frac{1}{n}$: $(x^n)^{1/n} = x^1 = a^{1/n}$.',
      'Det upphöjer åt fel håll — då växer exponenten till $n^2$.',
      'Exponenten är ingen faktor — den kan inte divideras bort.',
      'Bas och exponent har bytt plats.',
    ],
  },
  {
    question: 'Hur många lösningar har $x^4 = 0$?',
    choices: [
      'En: $x = 0$',
      'Två: $x = \\pm\\sqrt[4]{0}$',
      'Ingen',
      'Fyra',
    ],
    correct: 0,
    why: [
      'Jämn exponent ger i allmänhet två lösningar, men här sammanfaller de: $+0$ och $-0$ är samma tal.',
      '±0 är inte två olika tal — lösningen är bara $x = 0$.',
      'Det finns visst en lösning: $0^4 = 0$.',
      'Gradtalet anger högsta möjliga antal, inte det faktiska.',
    ],
  },
  {
    question: 'Vad är första steget när ekvationen $x^{2/5} = 10$ ska lösas?',
    choices: [
      'Upphöja båda led till exponentens nämnare, 5',
      'Dra kvadratroten ur båda led',
      'Dividera båda led med 2/5',
      'Multiplicera båda led med 5',
    ],
    correct: 0,
    why: [
      'Då försvinner nämnaren i exponenten: $(x^{2/5})^5 = x^2 = 10^5$, och sedan löses ekvationen som vanligt.',
      'Kvadratroten kommer först i ETT senare steg, när ekvationen blivit $x^2 = 100\\ 000$.',
      'Exponenten är ingen koefficient — division ändrar inte potensen.',
      'Multiplikation av leden ändrar bara talen, inte exponenten på $x$.',
    ],
  },
  {
    question: 'Varför får $x^{99} = -5$ exakt en lösning?',
    choices: [
      'Potensekvationer med udda exponent har alltid exakt en lösning',
      'Alla potensekvationer har exakt en lösning',
      'Eftersom −5 är negativt saknas lösningar',
      'Eftersom 99 är stort finns bara en lösning',
    ],
    correct: 0,
    why: [
      'Udda potenser bevarar tecknet — ett negativt tal upphöjt till 99 är negativt, så det finns exakt ett $x$ som fungerar.',
      'Jämna exponenter kan ge två, en eller noll lösningar — det är udda exponenter som alltid ger en.',
      'Det gäller för JÄMNA exponenter — med udda exponent går negativa högerled utmärkt.',
      'Exponentens storlek spelar ingen roll — det är dess paritet (udda/jämn) som avgör.',
    ],
  },
],

'ma1c-2.11': [
  {
    question: 'Vad skiljer en olikhet från en ekvation?',
    choices: [
      'Olikheten har ett olikhetstecken (<, >, ≤, ≥) i stället för likhetstecken',
      'Olikheten innehåller inga variabler',
      'Olikheten kan inte lösas',
      'Olikheten har alltid exakt en lösning',
    ],
    correct: 0,
    why: [
      '$3x - 4 = 2$ är en ekvation; $3x - 4 < 2$ är en olikhet — skillnaden är tecknet mellan leden.',
      'Olikheter innehåller oftast variabler, precis som ekvationer.',
      'Olikheter löses nästan precis som ekvationer.',
      'Tvärtom — lösningen är oftast ett helt intervall av tal, t.ex. $x < 9$.',
    ],
  },
  {
    question: 'Lös olikheten $-2x > 10$.',
    choices: [
      '$x > -5$',
      '$x < -5$',
      '$x > 5$',
      '$x < 5$',
    ],
    correct: 1,
    why: [
      'Vid division med det negativa talet −2 måste olikhetstecknet vändas.',
      'Dividera med −2 och vänd tecknet: $x < \\frac{10}{-2} = -5$.',
      'Både tecknet på 5:an och olikhetstecknet har hanterats fel — kontrollera med t.ex. $x = -6$: $-2 \\cdot (-6) = 12 > 10$ stämmer.',
      'Högerledet blir $-5$, inte 5, vid divisionen.',
    ],
  },
  {
    question: 'Varför vänds olikhetstecknet vid multiplikation med ett negativt tal?',
    choices: [
      'Talens ordning på tallinjen speglas — t.ex. är $5 > 3$ men $-5 < -3$',
      'Det är en ren konvention utan matematisk grund',
      'För att negativa tal inte kan jämföras',
      'Tecknet vänds egentligen bara vid division, inte multiplikation',
    ],
    correct: 0,
    why: [
      'Multiplikation med ett negativt tal speglar tallinjen kring 0 — det större talet hamnar till vänster, så tecknet måste vändas.',
      'Undersökningen med $5 > 3$ visar att regeln är tvingande, inte en konvention.',
      'Negativa tal jämförs utmärkt — det är själva jämförelsens riktning som byts.',
      'Regeln gäller både multiplikation och division med negativa tal.',
    ],
  },
  {
    question: 'Hur beskrivs lösningen till $x^2 < 9$?',
    choices: [
      '$-3 < x < 3$',
      '$x < 3$',
      '$x < \\pm 3$',
      '$x < -3$ och $x > 3$',
    ],
    correct: 0,
    why: [
      'Gränsfallet $x^2 = 9$ ger $x = \\pm 3$, och kvadraten är mindre än 9 för alla tal MELLAN gränserna.',
      '$x = -5 < 3$ men $(-5)^2 = 25 > 9$ — den negativa sidan måste också begränsas.',
      'Skrivsättet $x < \\pm 3$ är inte väldefinierat — intervallet skrivs $-3 < x < 3$.',
      'Det är lösningen till den OMVÄNDA olikheten $x^2 > 9$.',
    ],
  },
],

'ma1c-2.12': [
  {
    question: 'Vad är en **formel**?',
    choices: [
      'En ekvation som beskriver ett samband mellan olika storheter',
      'En regel för hur räknaren används',
      'Ett tal som aldrig ändras',
      'En lista över enheter',
    ],
    correct: 0,
    why: [
      'T.ex. beskriver $v = \\frac{s}{t}$ sambandet mellan storheterna hastighet, sträcka och tid.',
      'Formler är matematiska samband, inte bruksanvisningar.',
      'Det beskriver snarare en konstant — formler innehåller variabler.',
      'Enheter är viktiga i formler, men formeln är själva sambandet.',
    ],
  },
  {
    question: 'Lös ut $t$ ur formeln $v = \\dfrac{s}{t}$.',
    choices: [
      '$t = \\dfrac{s}{v}$',
      '$t = \\dfrac{v}{s}$',
      '$t = s \\cdot v$',
      '$t = s - v$',
    ],
    correct: 0,
    why: [
      'Multiplicera båda led med $t$ ($s = vt$) och dividera sedan med $v$: $t = \\frac{s}{v}$.',
      'Uttrycket är uppochnedvänt — tiden växer med sträckan, inte tvärtom.',
      'Det är sträckan som är produkten: $s = v \\cdot t$.',
      'Storheter med olika enheter kan inte subtraheras.',
    ],
  },
  {
    question: 'Formeln $H = 21\\ 000 + 2{,}5m$ gäller med $m$ i kilometer. Vad måste man göra innan man sätter in en körsträcka på 2 000 mil?',
    choices: [
      'Räkna om sträckan till kilometer: 2 000 mil = 20 000 km',
      'Ingenting — mil och kilometer är samma sak',
      'Räkna om kostnaden till euro',
      'Dividera sträckan med 10',
    ],
    correct: 0,
    why: [
      'Formelns $m$ är definierad i kilometer — 1 mil = 10 km, så $m = 20\\ 000$.',
      'En mil är 10 km — utan omvandling blir kostnaden tio gånger för låg.',
      'Valutan har inget med formeln att göra.',
      'Det är precis tvärtom — antalet mil MULTIPLICERAS med 10 för att bli kilometer.',
    ],
  },
  {
    question: 'Hur långt kan man köra för 30 000 kr om $H = 21\\ 000 + 2{,}5m$?',
    choices: [
      '3 600 km',
      '9 000 km',
      '12 000 km',
      '360 km',
    ],
    correct: 0,
    why: [
      'Insättning av $H = 30\\ 000$ ger $9\\ 000 = 2{,}5m$, dvs. $m = 3\\ 600$ km (360 mil).',
      '9 000 är kronorna som återstår efter den fasta kostnaden — de ska divideras med 2,5 kr/km.',
      '12 000 vore $30\\ 000/2{,}5$ — den fasta kostnaden 21 000 kr måste dras bort först.',
      '360 är svaret i MIL — i kilometer är det 3 600.',
    ],
  },
],

'ma1c-2.13': [
  {
    question: 'Vad kallas talen i en talföljd?',
    choices: [
      'Element',
      'Faktorer',
      'Koefficienter',
      'Nämnare',
    ],
    correct: 0,
    why: [
      'Talen i en talföljd kallas element och betecknas $a_n$, där $n$ är ordningsnumret.',
      'Faktorer är delarna i en multiplikation.',
      'Koefficient är talet framför en variabel i ett uttryck.',
      'Nämnaren är den nedre delen av ett bråk.',
    ],
  },
  {
    question: 'Vad betyder $a_3 = 11$ i en talföljd?',
    choices: [
      'Det tredje elementet i talföljden är 11',
      'Talföljden har 3 element som är 11',
      'Element nummer 11 är 3',
      'Talföljden slutar på 11',
    ],
    correct: 0,
    why: [
      'Indexet 3 är ordningsnumret — det tredje talet i följden är 11.',
      'Beteckningen pekar ut ETT element, det med ordningsnummer 3.',
      'Ordningen är omvänd — indexet är ordningsnumret och värdet står efter likhetstecknet.',
      'Talföljder fortsätter ofta oändligt — tre punkter (…) markerar det.',
    ],
  },
  {
    question: 'Talföljden 3, 7, 11, 15, … ökar med 4 per steg. Varför är formeln $a_n = 4n - 1$ och inte $a_n = 4n$?',
    choices: [
      'Testet $n = 1$ ger $4 \\cdot 1 = 4$, som är 1 för mycket — därför subtraheras 1',
      'Man subtraherar alltid 1 i slutna formler',
      'Eftersom talföljden börjar på ett udda tal',
      'Formeln $a_n = 4n$ är också korrekt',
    ],
    correct: 0,
    why: [
      'Ökningen ger termen $4n$; konstanten bestäms genom att testa mot $a_1 = 3$ — och $4n$ ensamt ger 4, så 1 dras bort.',
      'Justeringen beror helt på talföljden — 6, 10, 14 … kräver i stället $+2$.',
      'Udda/jämnt avgör inte konstanten — det gör skillnaden mellan $4 \\cdot 1$ och $a_1$.',
      'Nej: $a_1 = 4 \\cdot 1 = 4 \\neq 3$ — formeln måste stämma för alla element.',
    ],
  },
  {
    question: 'Ett mönster har formeln $a_n = 3n + 1$. Hur många prickar finns i figur 1 000?',
    choices: [
      '3 001',
      '3 000',
      '1 003',
      '4 000',
    ],
    correct: 0,
    why: [
      'Insättning: $a_{1000} = 3 \\cdot 1\\ 000 + 1 = 3\\ 001$ — det är hela poängen med en sluten formel.',
      'Ettan i formeln får inte glömmas: $3n + 1$, inte $3n$.',
      'Koefficienten 3 multipliceras med $n$ — inte med 1.',
      '4 000 vore $4n$ — fel koefficient.',
    ],
  },
],

// ── Kapitel 3: Procentuella förändringar ──────────────────────

'ma1c-3.1': [
  {
    question: 'Vad betyder **promille**?',
    choices: [
      'Tusendelar',
      'Hundradelar',
      'Miljondelar',
      'Tiondelar',
    ],
    correct: 0,
    why: [
      '1 ‰ = 1/1 000 = 0,001 — promille är tusendelar.',
      'Hundradelar är procent (%).',
      'Miljondelar är ppm (parts per million).',
      'Tiondelar har ingen egen symbol i det här systemet.',
    ],
  },
  {
    question: 'Hur beräknas en andel?',
    choices: [
      'andel = delen/hela',
      'andel = hela/delen',
      'andel = delen · hela',
      'andel = delen − hela',
    ],
    correct: 0,
    why: [
      'Andelen är delen dividerad med det hela — och den anges i bråk- eller decimalform.',
      'Uppochnedvänt — då blir andelen större än 1 så fort delen är mindre än det hela.',
      'Multiplikationen ger delen när andelen och det hela är kända: delen = andel · hela.',
      'En differens jämför storlekar i samma enhet — en andel är en kvot.',
    ],
  },
  {
    question: 'Vad måste man kontrollera innan man beräknar andelen 120 g av 15 kg?',
    choices: [
      'Att delen och det hela har samma enhet',
      'Att delen är större än det hela',
      'Att båda talen är heltal',
      'Att svaret blir i procent',
    ],
    correct: 0,
    why: [
      'Gör om till samma enhet först: 15 kg = 15 000 g, sedan är andelen 120/15 000 = 0,008 = 8 ‰.',
      'Delen är normalt mindre än det hela — annars är andelen större än 100 %.',
      'Decimaltal fungerar utmärkt i andelsberäkningar.',
      'Andelen kan uttryckas i procent, promille eller ppm — det väljs efter frågan.',
    ],
  },
  {
    question: 'Skriv 5 ppm i decimalform.',
    choices: [
      '0,000 005',
      '0,005',
      '0,000 05',
      '0,5',
    ],
    correct: 0,
    why: [
      'ppm är miljondelar: $5/1\\ 000\\ 000 = 0{,}000\\ 005$.',
      '0,005 är 5 ‰ — promille, inte ppm.',
      'En nolla för lite — miljondelar kräver sex decimalpositioner för 1 ppm.',
      '0,5 är 50 % — långt ifrån miljondelar.',
    ],
  },
  {
    question: 'Hur används procenttriangeln?',
    choices: [
      'Täck den sökta storheten — de kvarvarande visar formeln',
      'Den visar att alla tre storheterna alltid adderas',
      'Den fungerar bara för procent, inte promille',
      'Den ger svaret utan beräkning',
    ],
    correct: 0,
    why: [
      'Täcker man t.ex. "delen" står "andelen · hela" kvar bredvid varandra — multiplikation. Täcker man "andelen" står delen ÖVER hela — division.',
      'Triangeln kodar multiplikation och division, inte addition.',
      'Den fungerar utmärkt även för promille och ppm.',
      'Triangeln ger formeln — beräkningen gör man själv.',
    ],
  },
],

'ma1c-3.2': [
  {
    question: 'Hur beräknas förändringsfaktorn?',
    choices: [
      'nya värdet dividerat med gamla värdet',
      'gamla värdet dividerat med nya värdet',
      'nya värdet minus gamla värdet',
      'nya värdet plus gamla värdet',
    ],
    correct: 0,
    why: [
      'Förändringsfaktor = nya värdet/gamla värdet — och omvänt är nya värdet = förändringsfaktor · gamla värdet.',
      'Uppochnedvänt — då får en ökning en faktor mindre än 1.',
      'Differensen ger ändringen i kronor (eller annan enhet), inte faktorn.',
      'En summa av två priser säger inget om förändringen.',
    ],
  },
  {
    question: 'Vilken förändringsfaktor motsvarar − 25 %?',
    choices: [
      '0,75',
      '1,25',
      '0,25',
      '−0,25',
    ],
    correct: 0,
    why: [
      '$100\\ \\% - 25\\ \\% = 75\\ \\% = 0{,}75$.',
      '1,25 motsvarar en ÖKNING med 25 %.',
      '0,25 vore en minskning med 75 % — bara en fjärdedel kvar.',
      'Förändringsfaktorer är aldrig negativa — minskningen kodas som en faktor mindre än 1.',
    ],
  },
  {
    question: 'En förändringsfaktor är 2,40. Vad betyder det?',
    choices: [
      'Värdet har ökat med 140 %',
      'Värdet har ökat med 240 %',
      'Värdet har ökat med 24 %',
      'Värdet har minskat med 40 %',
    ],
    correct: 0,
    why: [
      '2,40 = 240 %, och jämfört med 100 % är ökningen 140 %.',
      'En ökning med 240 % hade gett faktorn 3,40.',
      'En ökning med 24 % ger faktorn 1,24.',
      'Faktorer över 1 betyder alltid ökning.',
    ],
  },
  {
    question: 'Vid en procentuell jämförelse — vad motsvarar "gamla värdet"?',
    choices: [
      'Det man jämför med',
      'Det största värdet',
      'Det minsta värdet',
      'Medelvärdet av de två',
    ],
    correct: 0,
    why: [
      '"Hur många procent dyrare än butik A?" — då är A:s pris gamla värdet. Det förklarar varför 22 % dyrare och 18 % billigare kan beskriva samma prisskillnad.',
      'Jämförelsereferensen väljs av frågan, inte av storleken.',
      'Samma sak — det är frågans "jämfört med" som styr.',
      'Medelvärdet används inte i procentuella jämförelser av den här typen.',
    ],
  },
  {
    question: 'Ett pris ökar från 175 kr till 231 kr. Hur stor är ökningen i procent?',
    choices: [
      '32 %',
      '56 %',
      '132 %',
      '24 %',
    ],
    correct: 0,
    why: [
      'Förändringsfaktorn är $231/175 = 1{,}32 = 132\\ \\%$ — alltså 32 % över 100 %.',
      '56 kr är ökningen i KRONOR — i procent av 175 kr är den 32 %.',
      '132 % är hela förändringsfaktorn — själva ökningen är det som överstiger 100 %.',
      '24 % vore ökningen räknad på det NYA priset — ökningen räknas alltid på det gamla.',
    ],
  },
],

'ma1c-3.3': [
  {
    question: 'Hur fås den totala förändringsfaktorn vid upprepade procentuella förändringar?',
    choices: [
      'Förändringsfaktorerna multipliceras',
      'Förändringsfaktorerna adderas',
      'Procentsatserna adderas och görs om till faktor',
      'Den största faktorn används',
    ],
    correct: 0,
    why: [
      'Total förändringsfaktor = faktor 1 · faktor 2 · … — varje förändring verkar på det redan förändrade värdet.',
      'Faktorer adderas aldrig — addition av procentsatser är just det klassiska felet.',
      '+15 % följt av −15 % ger 0,9775 (−2,25 %), inte 0 % — procentsatser kan inte adderas rakt av.',
      'Alla förändringar påverkar — ingen kan hoppas över.',
    ],
  },
  {
    question: 'Ett pris höjs med 15 % och sänks sedan med 15 %. Vad har hänt totalt?',
    choices: [
      'Priset har minskat med 2,25 %',
      'Priset är oförändrat',
      'Priset har ökat med 2,25 %',
      'Priset har minskat med 15 %',
    ],
    correct: 0,
    why: [
      '$1{,}15 \\cdot 0{,}85 = 0{,}9775$ — en minskning med 2,25 %, eftersom sänkningen räknas på det höjda priset.',
      'Det känns intuitivt men stämmer inte — 15 % av det höjda priset är mer i kronor än 15 % av det ursprungliga.',
      'Faktorn 0,9775 ligger UNDER 1 — en minskning.',
      'Sänkningen med 15 % tog bara bort det mesta av höjningen, inte 15 % av originalet netto.',
    ],
  },
  {
    question: 'Vilket uttryck ger kontobehållningen efter 18 år om 80 000 kr sätts in med 2,5 % årsränta?',
    choices: [
      '$80\\ 000 \\cdot 1{,}025^{18}$',
      '$80\\ 000 \\cdot 1{,}025 \\cdot 18$',
      '$80\\ 000 \\cdot 0{,}025^{18}$',
      '$80\\ 000 + 1{,}025^{18}$',
    ],
    correct: 0,
    why: [
      'Faktorn 1,025 multipliceras en gång per år — 18 gånger blir $1{,}025^{18}$.',
      'Multiplikation med 18 ger enkel ränta gånger fel — upprepad förändring är en potens, inte en produkt med antalet år.',
      '0,025 är räntesatsen ensam — förändringsfaktorn är $1 + 0{,}025$.',
      'Faktorn ska multipliceras med beloppet, inte adderas.',
    ],
  },
  {
    question: 'Varför ger +15 % följt av −15 % inte 0 % totalt?',
    choices: [
      'Procentsatserna räknas på olika värden — sänkningen räknas på det redan höjda priset',
      'Avrundningsfel i mellanstegen',
      'Det ger visst 0 % totalt',
      'Höjningar väger alltid tyngre än sänkningar',
    ],
    correct: 0,
    why: [
      '15 % av det höjda värdet är mer i kronor än 15 % av originalet — därför hamnar man under startvärdet.',
      'Effekten är exakt, inte ett avrundningsfel: $1{,}15 \\cdot 0{,}85 = 0{,}9775$ precis.',
      'Kontrollera: 100 kr → 115 kr → 97,75 kr. Inte tillbaka till 100.',
      'Ordningen spelar ingen roll ($0{,}85 \\cdot 1{,}15$ är samma produkt) — asymmetrin ligger i att basen ändras.',
    ],
  },
],

'ma1c-3.4': [
  {
    question: 'Vad anger **årsräntan** på ett sparkonto?',
    choices: [
      'Med hur många procent behållningen växer varje år',
      'Hur många kronor kontot växer med varje år',
      'Hur mycket banken tar i avgift',
      'Hur ofta man får sätta in pengar',
    ],
    correct: 0,
    why: [
      'Årsräntan är en procentsats — behållningen multipliceras varje år med förändringsfaktorn 1 + räntan.',
      'Kronbeloppet ändras år från år (ränta på ränta) — procentsatsen är densamma.',
      'Avgifter är något annat — räntan är tillväxten.',
      'Räntan handlar om tillväxt, inte om insättningsregler.',
    ],
  },
  {
    question: 'Vad heter cellen i kolumn C på rad 5 i ett kalkylblad?',
    choices: [
      'C5',
      '5C',
      'C:5',
      'R5K3',
    ],
    correct: 0,
    why: [
      'Kolumnbokstaven följs av radnumret: C5.',
      'Ordningen är alltid bokstav först, siffra sedan.',
      'Inget kolon används i cellnamn — kolon anger i stället ett OMRÅDE, t.ex. B3:B10.',
      'Det skrivsättet används inte i vanliga kalkylblad.',
    ],
  },
  {
    question: 'Varför skrivs formeln som \`=B2*$B$12\` i stället för \`=B2*B12\` innan den dras nedåt?',
    choices: [
      'Dollartecknen låser referensen till B12 så att alla kopior använder samma faktorcell',
      'Dollartecknen anger att värdet är i kronor',
      'Formler fungerar inte utan dollartecken',
      'Det gör beräkningen snabbare',
    ],
    correct: 0,
    why: [
      'Utan låsning flyttas referensen med vid kopiering (B13, B14 …) och pekar på tomma celler — med $B$12 använder alla rader förändringsfaktorn.',
      'Dollartecknet i kalkylformler handlar om cellreferenser, inte valuta.',
      'Formeln fungerar — men ger fel värden när den kopieras.',
      'Hastigheten påverkas inte — det är korrektheten som står på spel.',
    ],
  },
  {
    question: 'Du sparar 5 000 kr i slutet av varje år med 2,8 % ränta. Vilken kalkylbladsformel ger nästa års behållning utifrån föregående (cell B2)?',
    choices: [
      '\`=B2*1,028+5000\`',
      '\`=B2+5000*1,028\`',
      '\`=B2*0,028+5000\`',
      '\`=B2+5000\`',
    ],
    correct: 0,
    why: [
      'Det gamla beloppet växer med faktorn 1,028 OCH en ny insättning på 5 000 kr läggs till.',
      'Här är det bara den nya insättningen som får ränta — det är tvärtom det gamla beloppet som ska växa.',
      '0,028 ger bara själva räntedelen — behållningen kräver faktorn 1,028.',
      'Utan faktorn växer inga pengar — det är sparande utan ränta.',
    ],
  },
],

'ma1c-3.5': [
  {
    question: 'Vad består varje inbetalning på ett lån av?',
    choices: [
      'Amortering och ränta',
      'Endast amortering',
      'Endast ränta',
      'Insättning och behållning',
    ],
    correct: 0,
    why: [
      'Amorteringen betalar av själva skulden och räntan är lånekostnaden — båda ingår i inbetalningen.',
      'Med enbart amortering vore lånet gratis — räntan är priset för lånet.',
      'Med enbart ränta krymper skulden aldrig.',
      'Insättning och behållning hör till sparkonton, inte lån.',
    ],
  },
  {
    question: 'Vad menas med "rak amortering"?',
    choices: [
      'Lika stora amorteringsbelopp vid varje inbetalning',
      'Lika stora totala inbetalningar varje månad',
      'Att hela lånet betalas på en gång',
      'Att ingen ränta betalas',
    ],
    correct: 0,
    why: [
      'Skulden delas i lika delar — t.ex. 150 000 kr på 60 månader ger 2 500 kr amortering varje månad. Totalbeloppet sjunker ändå, eftersom räntedelen krymper.',
      'Det beskriver annuitetslån — vid rak amortering är det amorteringen som är konstant, inte totalen.',
      'Det vore en engångsbetalning, inte en amorteringsplan.',
      'Ränta betalas alltid på den aktuella skulden.',
    ],
  },
  {
    question: 'En skuld är 150 000 kr och årsräntan 4,8 %. Hur stor är räntan den första månaden?',
    choices: [
      '600 kr',
      '7 200 kr',
      '2 500 kr',
      '60 kr',
    ],
    correct: 0,
    why: [
      'Årsräntan är $0{,}048 \\cdot 150\\ 000 = 7\\ 200$ kr, och per månad $7\\ 200/12 = 600$ kr.',
      '7 200 kr är räntan för ett HELT år — månadsräntan är en tolftedel.',
      '2 500 kr är amorteringen i exemplet, inte räntan.',
      'En tiopotens fel — kontrollera divisionen med 12.',
    ],
  },
  {
    question: 'Varför sjunker månadens totala inbetalning under lånets gång vid rak amortering?',
    choices: [
      'Räntan beräknas på den aktuella skulden, som minskar för varje amortering',
      'Amorteringen minskar för varje månad',
      'Banken sänker räntesatsen varje år',
      'Den sjunker inte — inbetalningen är konstant',
    ],
    correct: 0,
    why: [
      'Amorteringen är konstant men räntedelen krymper i takt med skulden — från 600 kr första månaden till 10 kr den sista i exemplet.',
      'Vid rak amortering är amorteringen exakt lika stor varje gång.',
      'Räntesatsen är oförändrad — det är underlaget (skulden) som minskar.',
      'Konstant inbetalning kännetecknar annuitetslån, inte rak amortering.',
    ],
  },
  {
    question: 'Vilken kalkylbladsformel summerar alla inbetalningar i cellerna D2 till D61?',
    choices: [
      '\`=SUM(D2:D61)\`',
      '\`=D2+D61\`',
      '\`=SUM(D2;D61)\`',
      '\`=TOTAL(D)\`',
    ],
    correct: 0,
    why: [
      'SUM med kolon anger hela området från D2 till och med D61.',
      'Det adderar bara den första och den sista cellen — inte alla däremellan.',
      'Semikolon mellan referenserna betyder två ENSKILDA celler, inte ett område.',
      'TOTAL är ingen standardfunktion i kalkylblad.',
    ],
  },
],

// ── Kapitel 4: Räta linjer och funktioner ─────────────────────

'ma1c-4.1': [
  {
    question: 'Hur skrivs koordinaterna för en punkt?',
    choices: [
      'Med x-koordinaten först och y-koordinaten sist: ($x$, $y$)',
      'Med y-koordinaten först och x-koordinaten sist: ($y$, $x$)',
      'Ordningen spelar ingen roll',
      'Med ett likhetstecken mellan: $x = y$',
    ],
    correct: 0,
    why: [
      'Läget i sidled (x) skrivs först och läget i höjdled (y) sist — punkten (2, 3) ligger 2 åt höger och 3 upp.',
      'Ordningen är fast bestämd — (2, 3) och (3, 2) är olika punkter.',
      'Med omkastad ordning hamnar man i fel punkt så fort koordinaterna är olika.',
      'Likhetstecken har inget med koordinatskrivsättet att göra.',
    ],
  },
  {
    question: 'Vilken kvadrant har både positiva x-värden och positiva y-värden?',
    choices: [
      'Första kvadranten',
      'Andra kvadranten',
      'Tredje kvadranten',
      'Fjärde kvadranten',
    ],
    correct: 0,
    why: [
      'Första kvadranten ligger uppe till höger, där båda koordinaterna är positiva — och numreringen fortsätter moturs.',
      'Andra kvadranten (uppe till vänster) har negativa x-värden.',
      'Tredje kvadranten (nere till vänster) har båda negativa.',
      'Fjärde kvadranten (nere till höger) har negativa y-värden.',
    ],
  },
  {
    question: 'Vad kännetecknar en **linjär modell**?',
    choices: [
      'Något ändras i jämn takt med samma mängd — grafen blir en rät linje',
      'Något fördubblas i varje steg',
      'Grafen går alltid genom origo',
      'Modellen saknar konstantterm',
    ],
    correct: 0,
    why: [
      'Jämn ändringstakt (t.ex. 400 kr per timme) ger en rät linje — därav namnet linjär.',
      'Fördubbling i varje steg är exponentiell tillväxt, inte linjär.',
      'Linjen kan skära y-axeln var som helst — verkstadsmodellen $y = 500 + 400x$ startar på 500.',
      'Konstanttermen (t.ex. en fast avgift) är tillåten och vanlig.',
    ],
  },
  {
    question: 'På vilka tre sätt kan en linjär modell beskrivas enligt genomgången?',
    choices: [
      'Med formel, värdetabell eller graf',
      'Endast med en formel',
      'Med cirkeldiagram, stapeldiagram eller kurva',
      'Med ekvation, olikhet eller rot',
    ],
    correct: 0,
    why: [
      'Samma samband kan uttryckas som formeln $y = 500 + 400x$, som en tabell med x- och y-värden, eller som en rät linje i ett koordinatsystem.',
      'Formeln är bara ett av sätten — tabell och graf visar samma sak.',
      'Cirkel- och stapeldiagram används för helt andra slags data.',
      'Olikheter och rötter är andra verktyg — inte beskrivningsformer för en modell.',
    ],
  },
],

'ma1c-4.2': [
  {
    question: 'Vilken formel beskriver alla proportionaliteter?',
    choices: [
      '$y = kx$',
      '$y = kx + m$',
      '$y = x^k$',
      '$y = \\dfrac{k}{x}$',
    ],
    correct: 0,
    why: [
      'En proportionalitet är $y = kx$ där $k$ är proportionalitetskonstanten — utan konstantterm.',
      '$y = kx + m$ med $m \\neq 0$ är linjär men inte proportionell — grafen missar origo.',
      'Variabeln i exponenten hör till potensfunktioner.',
      'Det är en omvänd proportionalitet — något annat.',
    ],
  },
  {
    question: 'Var skär grafen till en proportionalitet y-axeln?',
    choices: [
      'I origo',
      'I punkten (0, $k$)',
      'I punkten (1, 0)',
      'Den skär aldrig y-axeln',
    ],
    correct: 0,
    why: [
      'Med $x = 0$ ger $y = kx$ alltid $y = 0$ — grafen går genom origo.',
      '$k$ är lutningen, inte skärningspunkten — insättning av $x = 0$ ger $y = 0$.',
      '(1, 0) ligger på x-axeln — proportionalitetens graf går där bara om $k = 0$.',
      'Alla räta linjer av formen $y = kx$ skär (går genom) y-axeln i origo.',
    ],
  },
  {
    question: 'Hur beräknas proportionalitetskonstanten $k$ ur ett värdepar?',
    choices: [
      '$k = \\dfrac{y}{x}$',
      '$k = \\dfrac{x}{y}$',
      '$k = y - x$',
      '$k = x \\cdot y$',
    ],
    correct: 0,
    why: [
      'Ur $y = kx$ följer $k = \\frac{y}{x}$ — t.ex. ger (5, 100) konstanten $k = 20$.',
      'Kvoten är vänd åt fel håll — det ger $\\frac{1}{k}$.',
      'En differens ger inte förhållandet mellan variablerna.',
      'Produkten är konstant i en OMVÄND proportionalitet, inte här.',
    ],
  },
  {
    question: 'Grafen till ett samband är en rät linje som skär y-axeln i (0, 50). Är sambandet en proportionalitet?',
    choices: [
      'Nej — grafen går inte genom origo',
      'Ja — alla räta linjer är proportionaliteter',
      'Ja — 50 är proportionalitetskonstanten',
      'Det går inte att avgöra',
    ],
    correct: 0,
    why: [
      'Rät linje räcker inte — den måste dessutom gå genom origo, och (0, 50) är inte origo.',
      'Räta linjer med startvärde (som $y = 50 + kx$) är linjära modeller men inte proportionaliteter.',
      '50 är startvärdet (konstanttermen) — proportionaliteter saknar sådant.',
      'Jo — kriterierna är tydliga: rät linje OCH genom origo, och det andra kravet är brutet.',
    ],
  },
],

'ma1c-4.3': [
  {
    question: 'Vad är första steget när grafen till $y = -2x + 3$ ska ritas för hand?',
    choices: [
      'Göra en värdetabell med några x-värden kring 0',
      'Dra en linje på måfå och justera efteråt',
      'Beräkna grafens lutning med gradskiva',
      'Rita av grafen från räknaren',
    ],
    correct: 0,
    why: [
      'Värdetabellen ger koordinater att pricka in — en bra tumregel är några positiva och negativa x-värden kring 0.',
      'Grafen ska byggas på beräknade punkter, inte gissningar.',
      'Lutningen syns när punkterna är inprickade — ingen gradskiva behövs.',
      'Poängen med handritning är att förstå vad de digitala verktygen gör.',
    ],
  },
  {
    question: 'Vad motsvarar en rad i värdetabellen ($x = -3$, $y = 9$) i koordinatsystemet?',
    choices: [
      'Punkten (−3, 9)',
      'Punkten (9, −3)',
      'En linje genom −3 och 9',
      'Avståndet mellan −3 och 9',
    ],
    correct: 0,
    why: [
      'Varje rad är en koordinat: x-värdet först, y-värdet sist.',
      'Omkastad ordning ger en helt annan punkt.',
      'En rad ger EN punkt — linjen uppstår först när alla punkter förbinds.',
      'Raden anger ett läge, inte ett avstånd.',
    ],
  },
  {
    question: 'Hur väljer man lämpliga intervall för axlarna innan punkterna prickas in?',
    choices: [
      'Axlarna måste täcka största och minsta x- respektive y-värdena i tabellen',
      'Axlarna ska alltid gå från −10 till 10',
      'x-axeln räcker från 0 och uppåt',
      'Intervallen spelar ingen roll',
    ],
    correct: 0,
    why: [
      'För $y = -2x + 3$ med x från −3 till 3 krävs y-axel från −3 till 9 — annars ryms inte alla punkter.',
      'Ett fast intervall passar ibland men slösar ofta plats eller klipper punkter.',
      'Negativa x-värden hör till en bra värdetabell — axeln måste täcka dem.',
      'För små intervall gör att punkter hamnar utanför papperet.',
    ],
  },
  {
    question: 'Grafen till en linjär ekvation blir en rät linje. Vad betyder det för punkterna i värdetabellen?',
    choices: [
      'Alla punkter ska hamna på en och samma räta linje',
      'Punkterna bildar alltid en båge',
      'Bara två av punkterna ligger på linjen',
      'Punkterna ska ligga symmetriskt kring y-axeln',
    ],
    correct: 0,
    why: [
      'Ligger en punkt utanför linjen är det ett räknefel i den raden av värdetabellen — grafen fungerar som kontroll.',
      'Bågar hör till andra funktionstyper — linjära ekvationer ger räta linjer.',
      'ALLA punkter från tabellen ligger på linjen — det är själva linjäriteten.',
      'Symmetri kring y-axeln gäller t.ex. $y = x^2$, inte räta linjer i allmänhet.',
    ],
  },
],

'ma1c-4.4': [
  {
    question: 'Vad kallas ekvationen $y = kx + m$?',
    choices: [
      'Räta linjens ekvation',
      'Andragradsekvationen',
      'Proportionalitetsekvationen',
      'Potensekvationen',
    ],
    correct: 0,
    why: [
      'Alla räta linjer utom lodräta kan skrivas $y = kx + m$ — räta linjens ekvation i k-form.',
      'Andragradsekvationer innehåller $x^2$.',
      'Proportionaliteten är specialfallet $m = 0$.',
      'I potensekvationer är variabeln basen i en potens med annan exponent.',
    ],
  },
  {
    question: 'Vad motsvarar $k$-värdet i $y = kx + m$?',
    choices: [
      'Linjens lutning',
      'Skärningen med y-axeln',
      'Skärningen med x-axeln',
      'Linjens startvärde',
    ],
    correct: 0,
    why: [
      '$k$ är lutningen (riktningskoefficienten) — hur många steg linjen går uppåt per steg åt höger.',
      'Skärningen med y-axeln är $m$-värdet.',
      'Skärningen med x-axeln fås först när man löser $kx + m = 0$.',
      '"Startvärdet" i linjära modeller motsvarar $m$, inte $k$.',
    ],
  },
  {
    question: 'Hur beräknas $k$-värdet med trappstegsmetoden?',
    choices: [
      '$k = \\dfrac{\\Delta y}{\\Delta x}$ — förändringen i y-led delat med förändringen i x-led',
      '$k = \\dfrac{\\Delta x}{\\Delta y}$ — förändringen i x-led delat med förändringen i y-led',
      '$k = \\Delta y \\cdot \\Delta x$',
      '$k = \\Delta y - \\Delta x$',
    ],
    correct: 0,
    why: [
      'Trappstegets höjd genom dess längd: $k = \\frac{\\Delta y}{\\Delta x}$, och man tänker att man går åt höger.',
      'Kvoten är uppochnedvänd — det gäller höjd genom längd.',
      'Produkten säger inget om lutningen.',
      'En differens ger inte förhållandet mellan förändringarna.',
    ],
  },
  {
    question: 'En linje går 2 steg nedåt för varje steg åt höger och skär y-axeln i (0, 1). Vilken är ekvationen?',
    choices: [
      '$y = -2x + 1$',
      '$y = 2x + 1$',
      '$y = -2x - 1$',
      '$y = x - 2$',
    ],
    correct: 0,
    why: [
      'Nedåt betyder negativ lutning: $k = -2$, och skärningen ger $m = 1$.',
      'Med $k = +2$ skulle linjen luta uppåt.',
      '$m$ är skärningen med y-axeln, som är $+1$.',
      'Här har $k$ och $m$ bytt roller.',
    ],
  },
  {
    question: 'Vad händer med linjen om $k$-värdet är negativt?',
    choices: [
      'Den lutar nedåt, sett från vänster till höger',
      'Den lutar uppåt',
      'Den blir vågrät',
      'Den hamnar under x-axeln överallt',
    ],
    correct: 0,
    why: [
      'Negativt $k$ betyder att y minskar när x ökar — linjen faller åt höger, som $y = -2x + 1$.',
      'Uppåtlutning kräver positivt $k$.',
      'Vågrät linje har $k = 0$.',
      'Linjen kan mycket väl ligga över x-axeln för små x — lutningen styr riktningen, inte läget.',
    ],
  },
],

'ma1c-4.5': [
  {
    question: 'Vad förkortas ibland "RLE"?',
    choices: [
      'Räta linjens ekvation',
      'Riktningskoefficientens lägesekvation',
      'Räta linjens exponent',
      'Rätvinkliga linjers egenskaper',
    ],
    correct: 0,
    why: [
      'RLE står för räta linjens ekvation, $y = kx + m$.',
      'Riktningskoefficienten är $k$-värdet i ekvationen, inte förkortningens betydelse.',
      'Exponenter förekommer inte i räta linjens ekvation.',
      'Rätvinklighet hör till nästa avsnitt om vinkelräta linjer.',
    ],
  },
  {
    question: 'Hur beräknas $\\Delta y$ ur två punkter $(x_1, y_1)$ och $(x_2, y_2)$?',
    choices: [
      '$\\Delta y = y_2 - y_1$',
      '$\\Delta y = y_2 + y_1$',
      '$\\Delta y = x_2 - x_1$',
      '$\\Delta y = y_1 - y_2$, alltid med största talet först',
    ],
    correct: 0,
    why: [
      'Förändringen i y-led är differensen mellan y-koordinaterna, i samma ordning som punkterna: $y_2 - y_1$.',
      'En summa mäter ingen förändring.',
      'Det är $\\Delta x$ — förändringen i x-led.',
      'Ordningen följer punkternas numrering — huvudsaken är att $\\Delta y$ och $\\Delta x$ tar punkterna i SAMMA ordning.',
    ],
  },
  {
    question: 'Beräkna $k$ för linjen genom (−6, −1) och (2, 3).',
    choices: [
      '$\\dfrac{1}{2}$',
      '$2$',
      '$-\\dfrac{1}{2}$',
      '$\\dfrac{4}{-4}= -1$',
    ],
    correct: 0,
    why: [
      '$k = \\frac{3 - (-1)}{2 - (-6)} = \\frac{4}{8} = \\frac{1}{2}$ — dubbla minustecken blir plus.',
      '2 är kvoten uppochnedvänd ($\\frac{8}{4}$) — $\\Delta y$ ska stå i täljaren.',
      'Tecknen tar ut varandra i båda differenserna — kvoten blir positiv.',
      'Nämnaren är $2 - (-6) = 8$, inte $-4$ — parenteserna kring negativa koordinater är viktiga.',
    ],
  },
  {
    question: 'En linje har $k = 2$ och går genom (4, −3). Hur bestäms $m$-värdet?',
    choices: [
      'Sätt in punktens koordinater i $y = 2x + m$ och lös ut $m$',
      'Läs av var linjen skär x-axeln',
      '$m$ är alltid y-koordinaten i den givna punkten',
      '$m = k \\cdot 4$',
    ],
    correct: 0,
    why: [
      '$-3 = 2 \\cdot 4 + m$ ger $m = -11$ — punkten ligger på linjen, så koordinaterna uppfyller ekvationen.',
      '$m$ är skärningen med y-axeln, inte x-axeln — och den kan inte läsas av utan graf.',
      'Bara om punkten ligger PÅ y-axeln ($x = 0$) är y-koordinaten lika med $m$.',
      '$k \\cdot 4$ är variabeltermens värde i punkten — $m$ är det som återstår upp till $y$.',
    ],
  },
],

'ma1c-4.6': [
  {
    question: 'Vad kännetecknar två parallella linjer?',
    choices: [
      'De har samma k-värde',
      'De har samma m-värde',
      'De skär varandra i origo',
      'De har samma ekvation',
    ],
    correct: 0,
    why: [
      'Samma lutning betyder att linjerna aldrig möts — k-värdena är lika men m-värdena olika.',
      'Samma m-värde betyder att linjerna skär y-axeln i samma punkt — då korsar de varandra där.',
      'Parallella linjer skär aldrig varandra alls.',
      'Samma ekvation vore samma linje, inte två parallella.',
    ],
  },
  {
    question: 'Varför kan en vertikal linje inte skrivas i k-form ($y = kx + m$)?',
    choices: [
      'Lutningen skulle bli oändligt stor — det finns inget k-värde',
      'Vertikala linjer saknar punkter',
      'Vertikala linjer är inga riktiga linjer',
      'Den kan visst skrivas i k-form',
    ],
    correct: 0,
    why: [
      'Trappsteget har $\\Delta x = 0$ — kvoten $\\Delta y/\\Delta x$ är odefinierad. Vertikala linjer skrivs i stället $x = a$.',
      'De har oändligt många punkter — alla med samma x-koordinat.',
      'De är fullvärdiga räta linjer, bara med ett annat skrivsätt.',
      'Ingen kombination av $k$ och $m$ ger en lodrät graf.',
    ],
  },
  {
    question: 'Vilken är räta linjens ekvation i **allmän form**?',
    choices: [
      '$ax + by + c = 0$',
      '$y = kx + m$',
      '$x = a$',
      '$y = x^2 + c$',
    ],
    correct: 0,
    why: [
      'I allmän form samlas alla termer i ena ledet och andra ledet är 0 — den formen klarar även vertikala linjer.',
      'Det är k-formen — den vanligaste, men den klarar inte vertikala linjer.',
      'Det är den vertikala linjens specialform.',
      '$x^2$ hör till andragradskurvor, inte räta linjer.',
    ],
  },
  {
    question: 'Vilket k-värde har linjen $2x + 3y - 6 = 0$?',
    choices: [
      '$-\\dfrac{2}{3}$',
      '$2$',
      '$\\dfrac{2}{3}$',
      '$-6$',
    ],
    correct: 0,
    why: [
      'Lös ut y: $3y = -2x + 6$ ger $y = -\\frac{2}{3}x + 2$ — lutningen är $-\\frac{2}{3}$.',
      '2 är koefficienten framför x i allmän form — inte lutningen i k-form.',
      'Tecknet följer med när $2x$ flyttas över: $-\\frac{2}{3}$.',
      '−6 är konstanten c i allmän form.',
    ],
  },
],

'ma1c-4.7': [
  {
    question: 'Vad krävs för att ett samband mellan $x$ och $y$ ska vara en **funktion**?',
    choices: [
      'Varje tillåtet x-värde ger exakt ett y-värde',
      'Varje y-värde ger exakt ett x-värde',
      'Grafen är en rät linje',
      'Sambandet innehåller inga negativa tal',
    ],
    correct: 0,
    why: [
      'Det är funktionsdefinitionen — grafiskt: en lodrät penna skär grafen högst en gång.',
      'Det är kravet åt fel håll — flera x-värden får gärna ge samma y-värde.',
      'Även kurvor (t.ex. andragradsfunktioner) är funktioner — linjäritet krävs inte.',
      'Negativa tal är inga problem för funktioner.',
    ],
  },
  {
    question: 'Hur utläses $f(x)$?',
    choices: [
      '"f av x"',
      '"f gånger x"',
      '"f upphöjt till x"',
      '"f och x"',
    ],
    correct: 0,
    why: [
      '$f(x)$ utläses "f av x" — f är funktionens namn och x variabeln den beror på.',
      'Parenteserna betyder INTE multiplikation här — det är funktionsskrivsättet.',
      'Ingen exponent finns i skrivsättet.',
      'Skrivsättet anger att f beror på x, inte en uppräkning.',
    ],
  },
  {
    question: 'Låt $f(x) = 2x + 3$. Vad är $f(5)$?',
    choices: [
      '$13$',
      '$10$',
      '$25$',
      '$f \\cdot 5$',
    ],
    correct: 0,
    why: [
      'Ersätt x med 5: $f(5) = 2 \\cdot 5 + 3 = 13$.',
      '10 är bara variabeltermen $2 \\cdot 5$ — konstanttermen 3 ska med.',
      '25 vore $5^2$ — funktionen kvadrerar inte.',
      '$f$ är ett funktionsnamn, inte ett tal att multiplicera med.',
    ],
  },
  {
    question: 'Vad kallas $y$ i sambandet $y = f(x)$?',
    choices: [
      'Den beroende variabeln',
      'Den oberoende variabeln',
      'Koefficienten',
      'Definitionsmängden',
    ],
    correct: 0,
    why: [
      '$y$:s värde beror på vilket $x$ som stoppas in — därav "beroende".',
      'Den oberoende variabeln är $x$ — den väljs fritt.',
      'Koefficient är talet framför en variabel i ett uttryck.',
      'Definitionsmängden är mängden tillåtna x-värden — ett begrepp som kommer i ett senare avsnitt.',
    ],
  },
  {
    question: 'Grafen till $f$ skär x-axeln i $x = -1$, $x = 1$ och $x = 3$. Vad säger det?',
    choices: [
      'Ekvationen $f(x) = 0$ har lösningarna $x = -1$, $x = 1$ och $x = 3$',
      '$f(0) = -1$, $f(0) = 1$ och $f(0) = 3$',
      'Funktionen är inte definierad där',
      'Grafen är ingen funktion',
    ],
    correct: 0,
    why: [
      'Skärning med x-axeln betyder $y = 0$ — där är funktionsvärdet noll, alltså lösningarna till $f(x) = 0$.',
      '$f(0)$ är skärningen med Y-axeln — och en funktion kan bara ha ETT värde i $x = 0$.',
      'Tvärtom — funktionen är definierad och råkar vara exakt noll där.',
      'Tre olika x-värden med varsitt y-värde bryter inte mot funktionskravet.',
    ],
  },
],

'ma1c-4.8': [
  {
    question: 'Vad kallas det att lösa en ekvation med hjälp av grafer i t.ex. GeoGebra?',
    choices: [
      'Grafisk lösning',
      'Algebraisk lösning',
      'Prövning',
      'Faktorisering',
    ],
    correct: 0,
    why: [
      'Att rita y = VL och y = HL och läsa av skärningspunkten kallas grafisk lösning.',
      'Algebraisk lösning är att räkna sig fram med balansmetoden.',
      'Prövning (gissa och testa) är inte tillåtet vid ekvationslösning.',
      'Faktorisering är en algebraisk teknik, inte en grafisk.',
    ],
  },
  {
    question: 'Vilka två grafer ritas för att lösa $3x - 5 = -x + 3$ grafiskt?',
    choices: [
      '$y = 3x - 5$ och $y = -x + 3$',
      '$y = 3x$ och $y = -x$',
      '$y = 3x - 5 + x - 3$ och $y = 0$',
      '$x = 3$ och $x = -1$',
    ],
    correct: 0,
    why: [
      'Sätt "y =" framför vänsterledet respektive högerledet och rita båda.',
      'Konstanttermerna måste med — annars ritas fel linjer.',
      'Det är en alternativ metod (nollställemetoden), men genomgångens metod ritar VL och HL var för sig.',
      'Det är två lodräta linjer — inte ekvationens led.',
    ],
  },
  {
    question: 'Skärningspunkten mellan graferna är (2, 1). Vad är lösningen till ekvationen?',
    choices: [
      '$x = 2$',
      '$x = 1$',
      '$x = 3$',
      '$(2, 1)$ — hela punkten',
    ],
    correct: 0,
    why: [
      'Lösningen är skärningspunktens X-koordinat: vid $x = 2$ är båda leden lika (värdet 1).',
      '1 är y-koordinaten — ledens gemensamma värde, inte lösningen.',
      'Summan av koordinaterna har ingen betydelse här.',
      'Ekvationen har EN obekant — svaret är ett x-värde, inte en punkt.',
    ],
  },
  {
    question: 'Hur skrivs ekvationen $y = 13t + 5$ när den matas in för grafisk lösning i GeoGebra?',
    choices: [
      '\`y = 13x + 5\`',
      '\`y = 13t + 5\`',
      '\`t = 13y + 5\`',
      '\`y = 13.5\`',
    ],
    correct: 0,
    why: [
      'GeoGebra förstår bara x och y i grafiska lösningar — variabeln t byts mot x.',
      'Med t kvar tolkar GeoGebra inte uttrycket som en linje i xy-planet.',
      'Att kasta om variablerna ändrar sambandet helt.',
      '13.5 är ett tal — hela uttrycket försvann.',
    ],
  },
],

'ma1c-4.9': [
  {
    question: 'Vad kallas mängden av möjliga värden på den beroende variabeln $y$?',
    choices: [
      'Värdemängd',
      'Definitionsmängd',
      'Funktionsmängd',
      'Koordinatmängd',
    ],
    correct: 0,
    why: [
      'Möjliga y-värden bildar värdemängden.',
      'Definitionsmängden är i stället de möjliga X-värdena.',
      '"Funktionsmängd" är inget vedertaget begrepp här.',
      'Koordinater är punkter — mängderna handlar om var sin variabel.',
    ],
  },
  {
    question: 'Vad betyder en **ifylld ring** i änden av en graf?',
    choices: [
      'Ändpunkten ingår i intervallet — markeras med ≤ eller ≥',
      'Ändpunkten ingår inte i intervallet',
      'Grafen fortsätter oändligt åt det hållet',
      'Funktionen är odefinierad i punkten',
    ],
    correct: 0,
    why: [
      'Ifylld ring = punkten är med; tom ring = punkten är inte med (< eller >).',
      'Det är den TOMMA ringens betydelse.',
      'En pil brukar markera oändlig fortsättning — ringen markerar ett stopp.',
      'Tvärtom — i en ifylld ändpunkt är funktionen definierad och antar värdet.',
    ],
  },
  {
    question: 'En graf börjar med en tom ring vid $x = -1$ och slutar med en ifylld punkt vid $x = 2$. Vilken är definitionsmängden?',
    choices: [
      '$-1 < x \\leq 2$',
      '$-1 \\leq x < 2$',
      '$-1 \\leq x \\leq 2$',
      '$-1 < x < 2$',
    ],
    correct: 0,
    why: [
      'Tom ring ger strikt olikhet vid −1 och ifylld punkt ger ≤ vid 2.',
      'Olikheterna har hamnat på fel ändar.',
      'Vänstra änden är tom — $x = -1$ ingår inte.',
      'Högra änden är ifylld — $x = 2$ ingår.',
    ],
  },
  {
    question: 'Musiktjänsten $y = 50x$ gäller i högst 12 månader ($0 \\leq x \\leq 12$). Vilken är värdemängden?',
    choices: [
      '$0 \\leq y \\leq 600$',
      '$0 \\leq y \\leq 12$',
      '$0 \\leq y \\leq 50$',
      '$y = 600$',
    ],
    correct: 0,
    why: [
      'Minsta kostnaden är $y(0) = 0$ kr och största $y(12) = 600$ kr.',
      '0–12 är definitionsmängden (månaderna), inte kostnaderna.',
      '50 kr är bara priset för EN månad.',
      '600 kr är bara det största värdet — värdemängden är hela spannet.',
    ],
  },
],

'ma1c-4.10': [
  {
    question: 'Var sitter variabeln i en exponentialfunktion?',
    choices: [
      'I exponenten',
      'I basen',
      'I nämnaren',
      'Under ett rottecken',
    ],
    correct: 0,
    why: [
      'T.ex. $y = 25\\ 000 \\cdot 1{,}02^x$ — variabeln $x$ är exponenten.',
      'Variabel i basen (t.ex. $y = x^2$) ger en potensfunktion.',
      'Variabel i nämnaren hör till andra funktionstyper.',
      'Rotuttryck motsvarar rationella exponenter på en variabel BAS.',
    ],
  },
  {
    question: 'I formeln $y = Ca^x$ — vad står $a$ för?',
    choices: [
      'Förändringsfaktorn',
      'Det ursprungliga värdet',
      'Tiden',
      'Arean',
    ],
    correct: 0,
    why: [
      '$a$ är förändringsfaktorn — t.ex. 1,02 för +2 % per år eller 0,85 för −15 %.',
      'Det ursprungliga värdet är $C$.',
      'Tiden är exponenten $x$.',
      'Formeln handlar om förändring över tid, inte geometri.',
    ],
  },
  {
    question: 'Bilens värde ges av $V(t) = 180\\ 000 \\cdot 0{,}85^t$. Vad betyder 0,85?',
    choices: [
      'Värdet minskar med 15 % per år',
      'Värdet minskar med 85 % per år',
      'Värdet ökar med 85 % per år',
      'Bilen är värd 85 kr efter ett år',
    ],
    correct: 0,
    why: [
      '$0{,}85 = 100\\ \\% - 15\\ \\%$ — en årlig minskning med 15 %.',
      'En minskning med 85 % hade gett faktorn 0,15.',
      'Faktorer under 1 betyder minskning.',
      '0,85 är en faktor, inte ett belopp — värdet efter 1 år är $180\\ 000 \\cdot 0{,}85 = 153\\ 000$ kr.',
    ],
  },
  {
    question: 'Hur ser grafen till $y = Ca^x$ ut när $0 < a < 1$?',
    choices: [
      'Den faller brant först och planar ut mot noll — exponentiell minskning',
      'Den stiger allt brantare — exponentiell ökning',
      'Den är en rät linje som lutar nedåt',
      'Den är en parabel',
    ],
    correct: 0,
    why: [
      'Med faktor under 1 krymper värdet varje steg — som radioaktivt sönderfall.',
      'Ökning kräver $a > 1$ — som befolkningstillväxt.',
      'Exponentiella förlopp är aldrig räta linjer.',
      'Parabler hör till andragradsfunktioner.',
    ],
  },
  {
    question: 'Hur avgör man om kurvan i en graf är $f(x) = 3^x$ eller $g(x) = 2^x$?',
    choices: [
      'Beräkna några punkter (t.ex. x = 1) och testa vilka som ligger på kurvan',
      'Det går inte — kurvorna är identiska',
      'Mät kurvans lutning med linjal',
      'Kolla var kurvan skär x-axeln',
    ],
    correct: 0,
    why: [
      'Vid $x = 1$ ska $3^x$ ge 3 och $2^x$ ge 2 — punkttestet avgör direkt vilken kurva som är ritad.',
      'Kurvorna skiljer sig överallt utom i (0, 1).',
      'Lutningen ändras hela tiden på en exponentialkurva — punkttest är säkrare.',
      'Exponentialkurvor skär aldrig x-axeln — de närmar sig den bara.',
    ],
  },
],

'ma1c-4.11': [
  {
    question: 'Var sitter variabeln i en potensfunktion?',
    choices: [
      'I basen',
      'I exponenten',
      'I nämnaren, alltid',
      'Utanför funktionen',
    ],
    correct: 0,
    why: [
      '$f(x) = Cx^a$ — variabeln $x$ är basen som upphöjs till konstanten $a$.',
      'Variabel i exponenten ($Ca^x$) ger en exponentialfunktion.',
      '$x^{-1} = \\frac{1}{x}$ hamnar i nämnaren, men det är ett specialfall — inte definitionen.',
      'Variabeln är själva kärnan i funktionsuttrycket.',
    ],
  },
  {
    question: 'Vilken funktionstyp är $g(x) = x^{-2}$?',
    choices: [
      'En potensfunktion',
      'En exponentialfunktion',
      'En linjär funktion',
      'Ingen funktion alls',
    ],
    correct: 0,
    why: [
      'Variabeln är basen och exponenten är konstanten −2 — en potensfunktion ($g(x) = \\frac{1}{x^2}$).',
      'Exponentialfunktioner har variabeln i exponenten, som $2^x$.',
      'Linjära funktioner har formen $kx + m$.',
      'För varje tillåtet $x$ (alla utom 0) fås exakt ett värde — en funktion.',
    ],
  },
  {
    question: 'Hur ser grafen till $y = x^2$ ut?',
    choices: [
      'En parabel med botten i origo, symmetrisk kring y-axeln',
      'En hyperbel med två grenar',
      'En rät linje',
      'En kurva som bara finns för positiva x',
    ],
    correct: 0,
    why: [
      'Kvadraten är alltid positiv och lika stor för $x$ och $-x$ — en symmetrisk parabel.',
      'Hyperbeln hör till $y = \\frac{1}{x}$.',
      'Räta linjer kommer från förstagradsfunktioner.',
      'Det beskriver $y = \\sqrt{x}$ — kvadraten är definierad för alla x.',
    ],
  },
  {
    question: 'Låt $f(x) = x^{1/2}$ och $g(x) = 4x^2$. Hur beräknas $f(g(2))$?',
    choices: [
      'Först $g(2) = 16$, sedan $f(16) = 4$ — inifrån och ut',
      'Först $f(2)$, sedan $g$ av det',
      '$f(2) \\cdot g(2)$',
      '$f(2) + g(2)$',
    ],
    correct: 0,
    why: [
      'Funktion i funktion räknas inifrån och ut: den inre $g(2) = 4 \\cdot 4 = 16$, sedan den yttre $f(16) = \\sqrt{16} = 4$.',
      'Det vore $g(f(2))$ — ordningen styrs av vilken funktion som står innerst.',
      'Sammansättning är inte multiplikation av funktionsvärden.',
      'Inte addition heller — $g(2)$ blir den yttre funktionens INDATA.',
    ],
  },
],

// ── Kapitel 5: Statistik och sannolikhetslära ─────────────────

'ma1c-5.1': [
  {
    question: 'Vad kallas den mängd som en statistisk undersökning handlar om?',
    choices: [
      'Population',
      'Stickprov',
      'Data',
      'Urval',
    ],
    correct: 0,
    why: [
      'Populationen är hela mängden (människor eller föremål) som undersökningen handlar om.',
      'Stickprovet är den mindre del av populationen som faktiskt undersöks.',
      'Data är informationen som samlas in, inte gruppen den samlas från.',
      'Urvalet är metoden för att välja vilka som ska delta.',
    ],
  },
  {
    question: 'Vad är fördelen med en totalundersökning jämfört med en stickprovsundersökning?',
    choices: [
      'Den är exakt — hela populationen undersöks',
      'Den är snabbare att genomföra',
      'Den kräver inget urval av frågor',
      'Den är alltid billigare',
    ],
    correct: 0,
    why: [
      'När alla i populationen undersöks finns ingen osäkerhet från urvalet — men det är tidskrävande för stora populationer.',
      'Tvärtom — stickprovet är det snabba alternativet.',
      'Frågorna måste utformas väl i båda fallen.',
      'Att undersöka alla kostar i regel mer, inte mindre.',
    ],
  },
  {
    question: 'Vid ett stratifierat urval med 75 % kvinnor i populationen — hur väljs stickprovet?',
    choices: [
      'Så att även 75 % av stickprovet är kvinnor',
      'Helt slumpmässigt ur hela populationen',
      'Var femte person från en lista',
      'Endast kvinnor väljs',
    ],
    correct: 0,
    why: [
      'Stratifierat urval speglar populationens sammansättning — 75 % kvinnor i populationen ger 75 % kvinnor i stickprovet.',
      'Det beskriver obundet slumpmässigt urval.',
      'Det beskriver systematiskt urval.',
      'Då speglas inte populationen alls — 25 % är ju män.',
    ],
  },
  {
    question: 'Att fråga "Tror du på Gud?" utanför en kyrka för att mäta gudstron i en stad är ett exempel på…',
    choices: [
      'Urvalsfel — urvalet representerar inte populationen',
      'Mätfel — frågan är felformulerad',
      'Svarsbortfall',
      'En totalundersökning',
    ],
    correct: 0,
    why: [
      'Kyrkobesökare är mer religiösa än stadens befolkning i stort — urvalet speglar inte populationen.',
      'Själva frågan är neutral — problemet är VAR den ställs.',
      'Bortfall handlar om de som inte svarar alls.',
      'Långt ifrån — bara en liten, skev del av populationen tillfrågas.',
    ],
  },
  {
    question: 'Varför kan ett stort svarsbortfall göra en undersökning svårtolkad?',
    choices: [
      'De som inte svarat kan tycka annorlunda — resultatet får ett brett osäkerhetsintervall',
      'Bortfallet gör alltid resultatet exakt noll',
      'Enkäter med bortfall är olagliga',
      'Det spelar ingen roll — bortfallet kan alltid ignoreras',
    ],
    correct: 0,
    why: [
      'I kärnkraftsexemplet kunde andelen positiva ligga mellan 42 % och 54 % beroende på hur bortfallet skulle ha svarat.',
      'Bortfallet nollar inget — det skapar osäkerhet.',
      'Inget olagligt — men resultaten måste tolkas försiktigt.',
      'Bara små bortfall utan misstänkt snedvridning kan ibland ignoreras.',
    ],
  },
],

'ma1c-5.2': [
  {
    question: 'Vad anger **felmarginalen**?',
    choices: [
      'Hur mycket resultatet kan förväntas variera om undersökningen upprepas',
      'Hur många som svarade fel på enkäten',
      'Antalet personer i bortfallet',
      'Undersökningens kostnad',
    ],
    correct: 0,
    why: [
      'Felmarginalen mäter resultatets osäkerhet — vanligen så att resultatet i 95 % av fallen ligger inom den.',
      'Det finns inga "fel svar" i en åsiktsundersökning — marginalen handlar om slumpvariation.',
      'Bortfall är en egen felkälla, skild från den statistiska osäkerheten.',
      'Kostnaden har inget med felmarginalen att göra.',
    ],
  },
  {
    question: 'Med resultatet 60 % och felmarginalen 9,6 % — vilket är konfidensintervallet?',
    choices: [
      '50,4 % till 69,6 %',
      '60 % till 69,6 %',
      '9,6 % till 60 %',
      '55 % till 65 %',
    ],
    correct: 0,
    why: [
      'Resultatet ± felmarginalen: $60 - 9{,}6 = 50{,}4$ och $60 + 9{,}6 = 69{,}6$.',
      'Marginalen läggs åt BÅDA hållen, inte bara uppåt.',
      'Felmarginalen är en bredd, inte en undre gräns.',
      'Det vore intervallet för felmarginalen 5 %.',
    ],
  },
  {
    question: 'Vad betyder att en förändring är "statistiskt säkerställd" (signifikant)?',
    choices: [
      'Förändringen är större än felmarginalen — den beror med 95 % säkerhet inte på slumpen',
      'Förändringen är exakt uppmätt utan någon osäkerhet',
      'Alla i populationen har tillfrågats',
      'Förändringen är större än 10 procentenheter',
    ],
    correct: 0,
    why: [
      'Ligger det nya värdet utanför konfidensintervallet är förändringen signifikant.',
      'Osäkerheten finns kvar — men den är för liten för att förklara förändringen.',
      'Signifikans bedöms just för STICKPROV — totalundersökningar behöver den inte.',
      'Gränsen är felmarginalen, inte ett fast antal procentenheter.',
    ],
  },
  {
    question: 'Vad händer med felmarginalen när stickprovet görs större?',
    choices: [
      'Den minskar — resultatet blir säkrare',
      'Den ökar',
      'Den påverkas inte',
      'Den blir alltid exakt 1,96 %',
    ],
    correct: 0,
    why: [
      '$n$ står i nämnaren under rottecknet — större stickprov ger mindre felmarginal (men det krävs 4 gånger fler för att halvera den).',
      'Fler svarande kan aldrig göra resultatet osäkrare.',
      '$n$ ingår i formeln — storleken påverkar i högsta grad.',
      '1,96 är en konstant i formeln (kopplad till 95 %-nivån), inte felmarginalen själv.',
    ],
  },
],

'ma1c-5.3': [
  {
    question: 'Vad betyder det att två variabler har en **korrelation**?',
    choices: [
      'Det finns ett samband mellan dem',
      'Den ena orsakar den andra',
      'De är alltid lika stora',
      'De saknar samband',
    ],
    correct: 0,
    why: [
      'Korrelation = samband (punkterna i spridningsdiagrammet följer ett mönster). Orsakssambandet är en annan fråga.',
      'Det är kausalitet — korrelation kan finnas utan orsakssamband.',
      'Variablerna kan ha helt olika storlek och ändå samvariera.',
      'Tvärtom — utan samband är korrelationen just ingen.',
    ],
  },
  {
    question: 'Punkterna ligger spridda men kring en linje med positiv lutning. Vilken korrelation?',
    choices: [
      'Svag positiv',
      'Stark positiv',
      'Svag negativ',
      'Ingen',
    ],
    correct: 0,
    why: [
      'Spridda punkter = svag; positiv lutning = positiv — som mammors och döttrars längd i genomgången.',
      'Stark kräver att punkterna ligger TYDLIGT på linjen.',
      'Lutningen är positiv, inte negativ.',
      'Ett mönster finns — punkterna samlas kring en linje.',
    ],
  },
  {
    question: 'Vad kallas det när två variabler samvarierar utan att den ena orsakar den andra?',
    choices: [
      'Skensamband',
      'Kausalitet',
      'Signifikans',
      'Proportionalitet',
    ],
    correct: 0,
    why: [
      'Som livslängd och internettillgång — korrelationen finns men förklaras av en tredje variabel (landets rikedom/sjukvård).',
      'Kausalitet är motsatsen — ett äkta orsakssamband.',
      'Signifikans handlar om statistisk säkerhet, inte orsaker.',
      'Proportionalitet är ett exakt matematiskt samband, y = kx.',
    ],
  },
  {
    question: 'Mellan mammors och döttrars längd råder både korrelation och kausalitet. Varför kausalitet?',
    choices: [
      'Generna från mamman avgör delvis hur lång dottern blir',
      'Punkterna ligger på en perfekt linje',
      'Båda mäts i centimeter',
      'Döttrarnas längd påverkar mammornas',
    ],
    correct: 0,
    why: [
      'Det finns en verklig orsaksmekanism — arvet — från mammans längd till dotterns.',
      'Korrelationen var till och med svag — kausaliteten handlar om orsak, inte om hur tät linjen är.',
      'Samma enhet skapar inget orsakssamband.',
      'Orsaksriktningen går från mamma till dotter, inte tvärtom.',
    ],
  },
],

'ma1c-5.4': [
  {
    question: 'Vad kallas mängden av alla möjliga utfall i ett slumpförsök?',
    choices: [
      'Utfallsrum',
      'Gynnsamma utfall',
      'Population',
      'Händelse',
    ],
    correct: 0,
    why: [
      'Utfallsrummet är alla möjliga utfall — för en tärning {1, 2, 3, 4, 5, 6}.',
      'Gynnsamma utfall är bara de som stämmer in på händelsen.',
      'Population hör till statistiska undersökningar.',
      'Händelsen är det man frågar efter, t.ex. "minst 5".',
    ],
  },
  {
    question: 'Hur beräknas sannolikheten enligt den klassiska definitionen?',
    choices: [
      'Antalet gynnsamma utfall delat med antalet möjliga utfall',
      'Antalet möjliga utfall delat med antalet gynnsamma',
      'Gynnsamma plus möjliga utfall',
      'Alltid 50 %',
    ],
    correct: 0,
    why: [
      '$P(\\text{händelse}) = \\frac{\\text{gynnsamma}}{\\text{möjliga}}$ — och den kräver likformig sannolikhetsfördelning.',
      'Uppochnedvänt — då blir sannolikheten större än 1.',
      'En summa av antal är ingen sannolikhet.',
      '50 % gäller bara specialfall som slantsingling.',
    ],
  },
  {
    question: 'Varför fungerar den klassiska definitionen för slantsingling men INTE för straffläggning i fotboll?',
    choices: [
      'Slantsinglingens utfall är lika sannolika — mål och miss är det inte',
      'Fotboll har fler utfall än mynt',
      'Mynt kan inte landa på kant',
      'Definitionen fungerar för båda',
    ],
    correct: 0,
    why: [
      'Formeln kräver likformig fördelning: krona och klave är lika sannolika, men sannolikheten för mål beror på skyttens skicklighet.',
      'Antalet utfall är två i båda fallen (mål/miss, krona/klave) — problemet är sannolikheterna.',
      'Kantfall är inte poängen — likformigheten är.',
      'För straffar skulle formeln ge 50 % mål oavsett skytt — uppenbart fel.',
    ],
  },
  {
    question: 'Du kastar två tärningar. Hur många möjliga utfall finns i utfallsrummet?',
    choices: [
      '36',
      '12',
      '6',
      '11',
    ],
    correct: 0,
    why: [
      'Sex utfall för första tärningen gånger sex för andra: $6 \\cdot 6 = 36$ rutor i tabellen.',
      '12 vore $6 + 6$ — kombinationerna multipliceras, inte adderas.',
      '6 gäller EN tärning.',
      '11 är antalet olika SUMMOR (2–12), men de är inte lika sannolika.',
    ],
  },
  {
    question: 'Vad är sannolikheten att få minst summan 10 med två tärningar?',
    choices: [
      '$\\dfrac{6}{36} = \\dfrac{1}{6}$',
      '$\\dfrac{3}{36} = \\dfrac{1}{12}$',
      '$\\dfrac{10}{36}$',
      '$\\dfrac{1}{36}$',
    ],
    correct: 0,
    why: [
      'Summorna 10, 11 och 12 täcker 3 + 2 + 1 = 6 rutor i utfallsrummet av 36.',
      '$\\frac{3}{36}$ är sannolikheten för summa STÖRRE än 10 (bara 11 och 12) — skilj på formuleringarna!',
      'Talet 10 i frågan är ett summavärde, inte ett antal utfall.',
      '$\\frac{1}{36}$ är sannolikheten för exakt summan 12.',
    ],
  },
],

'ma1c-5.5': [
  {
    question: 'När behövs **experimentella** sannolikheter?',
    choices: [
      'När utfallen inte är lika sannolika och sannolikheten inte är självklar',
      'När man kastar en vanlig tärning',
      'När utfallsrummet är känt och likformigt',
      'Aldrig — den klassiska definitionen räcker alltid',
    ],
    correct: 0,
    why: [
      'Som meteoritexemplet: två utfall men helt olika sannolika — då måste sannolikheten mätas genom försök.',
      'Tärningen är likformig — där fungerar klassiska definitionen perfekt.',
      'Det är precis läget där den KLASSISKA definitionen används.',
      'Straffar, häftstift och meteoriter visar motsatsen.',
    ],
  },
  {
    question: 'Vad kallas andelen gånger en händelse inträffar i en försöksserie?',
    choices: [
      'Relativ frekvens',
      'Utfallsrum',
      'Konfidensintervall',
      'Korrelation',
    ],
    correct: 0,
    why: [
      'Relativ frekvens = antal gånger händelsen inträffade delat med antalet försök — t.ex. 139 mål på 200 straffar ≈ 70 %.',
      'Utfallsrummet är mängden möjliga utfall.',
      'Konfidensintervall hör till felmarginalen.',
      'Korrelation handlar om samband mellan variabler.',
    ],
  },
  {
    question: 'Asllanis relativa frekvens efter 200 straffar är cirka 70 %. Vad är sannolikheten att nästa straff INTE blir mål?',
    choices: [
      '30 %',
      '70 %',
      '50 %',
      'Det går inte att veta',
    ],
    correct: 0,
    why: [
      'Motsatshändelsen: $100\\ \\% - 70\\ \\% = 30\\ \\%$.',
      '70 % är sannolikheten FÖR mål.',
      '50 % vore den felaktiga klassiska ansatsen med två utfall.',
      'Jodå — komplementet ger det direkt.',
    ],
  },
  {
    question: 'Varför är den relativa frekvensen efter 200 straffar mer pålitlig än efter 5?',
    choices: [
      'Ju fler försök, desto närmare den verkliga sannolikheten kommer frekvensen',
      'Frekvensen efter få försök är alltid för låg',
      'Sannolikheten ändras med tiden',
      '200 är ett jämnt tal',
    ],
    correct: 0,
    why: [
      'I tabellen studsade frekvensen (100 %, 50 %, 40 %…) i början men stabiliserades kring 70 % — fler försök ger mer exakthet.',
      'Den kan vara för hög också — efter 1 straff var den 100 %.',
      'Skyttens skicklighet antas konstant — det är MÄTNINGEN som förbättras.',
      'Jämnhet hos talet har ingen betydelse.',
    ],
  },
],

'ma1c-5.6': [
  {
    question: 'Vad säger **produktregeln**?',
    choices: [
      'Sannolikheten för en kombination av händelser fås genom att multiplicera de enskilda sannolikheterna',
      'Sannolikheter adderas alltid',
      'Sannolikheten för två händelser är alltid 50 %',
      'Produkten av två sannolikheter är alltid större än 1',
    ],
    correct: 0,
    why: [
      'T.ex. är $P(\\text{två sexor}) = \\frac{1}{6} \\cdot \\frac{1}{6} = \\frac{1}{36}$.',
      'Addition hör till "antingen eller"-situationer, inte kombinationer.',
      '50 % gäller bara enstaka specialfall.',
      'Tvärtom — produkten av tal mellan 0 och 1 blir MINDRE än faktorerna.',
    ],
  },
  {
    question: 'Vad kännetecknar **oberoende** händelser?',
    choices: [
      'Sannolikheten påverkas inte av händelsen innan — "slumpen har inget minne"',
      'De kan aldrig inträffa samtidigt',
      'Deras sannolikheter är alltid lika stora',
      'De sker alltid utan återläggning',
    ],
    correct: 0,
    why: [
      'Tärningskast är oberoende — sexans sannolikhet är $\\frac{1}{6}$ oavsett tidigare kast.',
      'Det beskriver oförenliga händelser — något annat.',
      'Oberoendet handlar om påverkan, inte om lika sannolikheter.',
      'Tvärtom — UTAN återläggning blir händelserna beroende.',
    ],
  },
  {
    question: 'Du drar ett hjärter ur en kortlek och lägger INTE tillbaka det. Vad är sannolikheten att nästa kort också är hjärter?',
    choices: [
      '$\\dfrac{12}{51}$',
      '$\\dfrac{13}{52}$',
      '$\\dfrac{13}{51}$',
      '$\\dfrac{12}{52}$',
    ],
    correct: 0,
    why: [
      '12 hjärter kvar av 51 kort — både täljare och nämnare har minskat.',
      '$\\frac{13}{52}$ gällde FÖRSTA dragningen — utan återläggning ändras oddsen.',
      'Ett hjärter är borta — 12 kvar, inte 13.',
      'Ett kort är borta ur leken — 51 kvar, inte 52.',
    ],
  },
  {
    question: 'Skål med 6 röda och 4 blå kulor. Varför skiljer sig $P$(två blå) med och utan återläggning (16 % mot 13 %)?',
    choices: [
      'Utan återläggning finns färre blå kulor kvar till andra dragningen — händelserna är beroende',
      'Med återläggning hinner kulorna blandas bättre',
      'Skillnaden är ett avrundningsfel',
      'De borde vara lika — beräkningen är fel',
    ],
    correct: 0,
    why: [
      'Andra faktorn ändras från $\\frac{4}{10}$ till $\\frac{3}{9}$ när den första blå kulan inte läggs tillbaka.',
      'Blandningen är inte poängen — antalet kulor är det.',
      'Skillnaden är exakt: $\\frac{16}{100}$ mot $\\frac{12}{90}$.',
      'Beräkningarna stämmer — beroendet är verkligt.',
    ],
  },
],

'ma1c-5.7': [
  {
    question: 'När är ett träddiagram särskilt användbart?',
    choices: [
      'När sannolikheterna för de enskilda utfallen är olika',
      'Bara när alla utfall är lika sannolika',
      'Bara för tärningskast',
      'När man vill undvika multiplikation',
    ],
    correct: 0,
    why: [
      'Trädet håller ordning på olika sannolikheter i varje steg — som 7/10 och 3/10 för strumporna.',
      'Vid lika sannolika utfall räcker ofta ett enkelt utfallsrum.',
      'Trädet fungerar för alla slags flerstegsförsök.',
      'Multiplikationen längs grenarna är själva metoden.',
    ],
  },
  {
    question: 'Hur beräknas sannolikheten för kombinationen svart–svart i ett träddiagram?',
    choices: [
      'Multiplicera sannolikheterna längs grenen',
      'Addera sannolikheterna längs grenen',
      'Ta medelvärdet av sannolikheterna',
      'Räkna antalet grenar',
    ],
    correct: 0,
    why: [
      'Längs grenen gäller produktregeln: $\\frac{7}{10} \\cdot \\frac{7}{10} = \\frac{49}{100}$ med återläggning.',
      'Addition används MELLAN gynnsamma grenar, inte längs en gren.',
      'Medelvärden hör inte hemma här.',
      'Antalet grenar säger inget om sannolikheten när grenarna är olika sannolika.',
    ],
  },
  {
    question: 'Utan återläggning: efter en svart strumpa (av 7 svarta, 3 vita) — vilken sannolikhet står på grenen till nästa svarta?',
    choices: [
      '$\\dfrac{6}{9}$',
      '$\\dfrac{7}{10}$',
      '$\\dfrac{7}{9}$',
      '$\\dfrac{6}{10}$',
    ],
    correct: 0,
    why: [
      '6 svarta kvar av 9 totalt — både täljare och nämnare har minskat med 1.',
      'Det är sannolikheten i FÖRSTA dragningen.',
      '$\\frac{7}{9}$ gäller grenen svart EFTER VIT — där är alla 7 svarta kvar.',
      'Nämnaren ska också minska — en strumpa är borta ur lådan.',
    ],
  },
  {
    question: 'Vad görs när både grenen svart–vit och grenen vit–svart är gynnsamma?',
    choices: [
      'Grenarnas sannolikheter adderas',
      'Grenarnas sannolikheter multipliceras',
      'Bara den största grenen räknas',
      'Trädet ritas om',
    ],
    correct: 0,
    why: [
      'Multiplicera längs varje gren, addera grenarna: $\\frac{21}{90} + \\frac{21}{90} = \\frac{42}{90}$.',
      'Multiplikation sker LÄNGS grenar — mellan gynnsamma grenar adderas det.',
      'Alla gynnsamma grenar bidrar till sannolikheten.',
      'Samma träd används — det är avläsningen som ändras.',
    ],
  },
],

'ma1c-5.8': [
  {
    question: 'Vad är en **komplementhändelse**?',
    choices: [
      'Händelsen som tillsammans med den ursprungliga utgör alla möjliga utfall — "händelsens motsats"',
      'En händelse med samma sannolikhet',
      'En omöjlig händelse',
      'Den mest sannolika händelsen',
    ],
    correct: 0,
    why: [
      'Händelse + komplement täcker allt: $P(\\text{händelse}) + P(\\text{komplement}) = 1$.',
      'Komplementets sannolikhet är oftast en annan.',
      'Komplementet är fullt möjligt — det är "allt annat".',
      'Sannolikhetens storlek avgör inte vad som är komplement.',
    ],
  },
  {
    question: 'Sannolikheten för regn är 0,3. Vad är sannolikheten för komplementhändelsen?',
    choices: [
      '0,7',
      '0,3',
      '1,3',
      '0',
    ],
    correct: 0,
    why: [
      '$1 - 0{,}3 = 0{,}7$ — sannolikheten att det INTE regnar.',
      'Det är händelsens egen sannolikhet.',
      'Sannolikheter kan aldrig överstiga 1.',
      'Komplementet är inte omöjligt — det inträffar när det inte regnar.',
    ],
  },
  {
    question: 'Vad är komplementhändelsen till "att slå minst en femma" med en tärning?',
    choices: [
      'Att slå högst en fyra',
      'Att slå en sexa',
      'Att slå minst en fyra',
      'Att slå exakt en femma',
    ],
    correct: 0,
    why: [
      '"Inte minst en femma" betyder 1, 2, 3 eller 4 — alltså högst en fyra.',
      'Sexan ingår i händelsen "minst en femma".',
      '"Minst en fyra" överlappar händelsen — komplement får inte överlappa.',
      'Komplementet ska täcka ALLT som inte är händelsen.',
    ],
  },
  {
    question: 'Varför beräknas $P$(minst en sexa på fem tärningar) enklast med komplementhändelse?',
    choices: [
      '"Minst en" täcker många kombinationer, men komplementet "ingen sexa" är en enda enkel beräkning',
      'Komplementet ger alltid större sannolikhet',
      'Det går inte att räkna på fem tärningar annars',
      'Tärningar kräver alltid komplement',
    ],
    correct: 0,
    why: [
      '$P(\\text{ingen sexa}) = (5/6)^5 \\approx 0{,}40$, så $P(\\text{minst en}) = 1 - 0{,}40 \\approx 60\\ \\%$ — en rad i stället för dussintals fall.',
      'Komplementets sannolikhet kan vara mindre eller större — poängen är enkelheten.',
      'Det går, men kräver att många kombinationer summeras.',
      'Enkla tärningsfrågor klarar sig utan.',
    ],
  },
  {
    question: 'Hur många personer krävs enligt födelsedagsparadoxen för över 50 % chans att minst två delar födelsedag?',
    choices: [
      '23',
      '183',
      '365',
      '57',
    ],
    correct: 0,
    why: [
      'Bara 23 — i en sådan grupp finns 253 möjliga par, så chansen växer mycket snabbare än intuitionen säger.',
      '183 (halva 365) är den vanliga felgissningen.',
      'Med 365 personer är det i praktiken garanterat — långt över 50 %.',
      '57 personer ger över 99 % — frågan gällde 50 %.',
    ],
  },
],

// ── Kapitel 6: Trigonometri ───────────────────────────────────

'ma1c-6.1': [
  {
    question: 'Vad kallas kateten MITT EMOT en vinkel i en rätvinklig triangel?',
    choices: [
      'Motstående katet',
      'Närliggande katet',
      'Hypotenusa',
      'Höjd',
    ],
    correct: 0,
    why: [
      'Kateten mitt emot vinkeln är den motstående; kateten som bildar vinkeln är den närliggande.',
      'Den närliggande kateten är den som BILDAR vinkeln tillsammans med hypotenusan.',
      'Hypotenusan är den längsta sidan, mitt emot den räta vinkeln.',
      'Höjd är inget av triangelns standardbegrepp här.',
    ],
  },
  {
    question: 'För vilka trianglar gäller de trigonometriska funktionerna tan, sin och cos (i denna kurs)?',
    choices: [
      'Endast rätvinkliga trianglar',
      'Alla trianglar',
      'Endast liksidiga trianglar',
      'Endast trianglar med två lika sidor',
    ],
    correct: 0,
    why: [
      'Definitionerna bygger på hypotenusa och kateter — de kräver en rät vinkel. (Generaliseringar kommer i senare kurser.)',
      'För allmänna trianglar krävs andra satser — grunddefinitionerna gäller rätvinkliga.',
      'Liksidiga trianglar är inte ens rätvinkliga.',
      'Likbenthet har inget med saken att göra.',
    ],
  },
  {
    question: 'Vad betyder skrivsättet ∠ABC?',
    choices: [
      'Vinkeln vid hörn B, när man går från A till B till C',
      'Vinkeln vid hörn A',
      'Triangeln med hörnen A, B och C',
      'Sträckan från A till C',
    ],
    correct: 0,
    why: [
      'Mittenbokstaven anger hörnet där vinkeln sitter — ∠ABC är vinkeln vid B.',
      'Vinkeln vid A skrivs ∠BAC eller ∠CAB.',
      'Triangeln betecknas utan vinkelsymbol.',
      'Sträckor skrivs utan vinkelsymbol, t.ex. AC.',
    ],
  },
  {
    question: 'I en triangel är motstående katet 4 cm och närliggande katet 3 cm till vinkeln $u$. Vad är tan $u$?',
    choices: [
      '$\\dfrac{4}{3}$',
      '$\\dfrac{3}{4}$',
      '$\\dfrac{4}{5}$',
      '$\\dfrac{3}{5}$',
    ],
    correct: 0,
    why: [
      'Motstående genom närliggande: $\\tan u = \\frac{4}{3}$.',
      '$\\frac{3}{4}$ är tangens för den ANDRA spetsiga vinkeln i triangeln.',
      '$\\frac{4}{5}$ vore sinus (motstående/hypotenusa) i 3-4-5-triangeln.',
      '$\\frac{3}{5}$ vore cosinus i samma triangel.',
    ],
  },
  {
    question: 'Vad betyder beteckningen "l.e."?',
    choices: [
      'Längdenheter — används när enhet saknas i uppgiften',
      'Likbenta enheter',
      'Longitud och latitud',
      'Ett skrivfel',
    ],
    correct: 0,
    why: [
      'Saknar en sträcka enhet anges svaret i l.e. (längdenheter) — som x ≈ 12 l.e. i genomgången.',
      '"Likbent" beskriver trianglar, inte enheter.',
      'Koordinater på jordklotet hör inte hit.',
      'Beteckningen är standard i svenska läromedel.',
    ],
  },
],

'ma1c-6.2': [
  {
    question: 'Vilken trigonometrisk funktion kopplar motstående katet till hypotenusan?',
    choices: [
      'Sinus',
      'Cosinus',
      'Tangens',
      'Ingen av dem',
    ],
    correct: 0,
    why: [
      '$\\sin v = \\frac{\\text{motstående katet}}{\\text{hypotenusa}}$.',
      'Cosinus använder den NÄRLIGGANDE kateten och hypotenusan.',
      'Tangens använder de två katetrarna — hypotenusan ingår inte.',
      'Sinus är exakt den kopplingen.',
    ],
  },
  {
    question: 'I 3-4-5-triangeln är motstående katet till $u$ 4 cm. Vad är cos $u$?',
    choices: [
      '$\\dfrac{3}{5}$',
      '$\\dfrac{4}{5}$',
      '$\\dfrac{4}{3}$',
      '$\\dfrac{5}{3}$',
    ],
    correct: 0,
    why: [
      'Cosinus tar den NÄRLIGGANDE kateten (3) genom hypotenusan (5): $\\cos u = \\frac{3}{5} = 0{,}6$.',
      '$\\frac{4}{5}$ är sin $u$ — motstående genom hypotenusan.',
      '$\\frac{4}{3}$ är tan $u$.',
      'Hypotenusan står alltid i NÄMNAREN för sinus och cosinus.',
    ],
  },
  {
    question: 'Du känner en vinkel och dess motstående katet och söker hypotenusan. Vilken funktion väljer du?',
    choices: [
      'Sinus',
      'Cosinus',
      'Tangens',
      'Vilken som helst',
    ],
    correct: 0,
    why: [
      'Sinus innehåller just motstående katet och hypotenusa — som $\\sin 41° = \\frac{6{,}1}{a}$ i genomgången.',
      'Cosinus kräver den närliggande kateten, som är okänd här.',
      'Tangens innehåller inte hypotenusan alls.',
      'Valet styrs av vilka sidor som är kända och sökta.',
    ],
  },
  {
    question: 'Hur beräknas arean av en triangel som INTE är rätvinklig, med basen 12, sidan 14 och mellanliggande vinkeln 42°?',
    choices: [
      'Höjden fås som $14 \\cdot \\sin 42°$ och arean blir $\\dfrac{12 \\cdot 14 \\cdot \\sin 42°}{2}$',
      'Arean är $\\dfrac{12 \\cdot 14}{2}$ direkt',
      'Arean kan inte beräknas utan den tredje sidan',
      'Höjden fås som $14 \\cdot \\cos 42°$',
    ],
    correct: 0,
    why: [
      'Höjden ritas in och bildar en rätvinklig triangel där 14 är hypotenusa: $h = 14 \\sin 42°$, sedan basen gånger höjden delat med 2.',
      'Det gäller bara om sidorna är vinkelräta — här är vinkeln 42°.',
      'Två sidor och mellanliggande vinkel räcker precis.',
      'Cosinus skulle ge den VÅGRÄTA projektionen, inte höjden.',
    ],
  },
],

'ma1c-6.3': [
  {
    question: 'Vad används de inversa trigonometriska funktionerna till?',
    choices: [
      'Att beräkna VINKLAR när sidförhållandena är kända',
      'Att beräkna sidor när vinklarna är kända',
      'Att invertera bråk',
      'Att rita trianglar',
    ],
    correct: 0,
    why: [
      'tan⁻¹, sin⁻¹ och cos⁻¹ går "baklänges": från förhållandet till vinkeln, t.ex. $v = \\cos^{-1}(0{,}753) \\approx 41°$.',
      'Sidor beräknas med de vanliga funktionerna tan, sin och cos.',
      'Bråkinvertering är något annat — trots det liknande namnet.',
      'De är räkneverktyg, inte ritverktyg.',
    ],
  },
  {
    question: 'Vad är ett annat namn för sin⁻¹?',
    choices: [
      'arcsin ("arcus sinus")',
      'cosec',
      'sinh',
      '$\\dfrac{1}{\\sin}$',
    ],
    correct: 0,
    why: [
      'sin⁻¹ och arcsin är två skrivsätt för samma inversa funktion — känn igen båda.',
      'Cosekant är $\\frac{1}{\\sin}$ — en annan funktion.',
      'sinh är sinus hyperbolicus — hör till senare studier.',
      'Upphöjt −1 på FUNKTIONEN betyder invers, inte "1 delat med".',
    ],
  },
  {
    question: 'Om $\\tan v = \\dfrac{a}{b}$, hur bestäms vinkeln $v$?',
    choices: [
      '$v = \\tan^{-1}\\left(\\dfrac{a}{b}\\right)$',
      '$v = \\tan\\left(\\dfrac{a}{b}\\right)$',
      '$v = \\dfrac{b}{a}$',
      '$v = 180° - \\dfrac{a}{b}$',
    ],
    correct: 0,
    why: [
      'Den inversa funktionen "låser upp" vinkeln ur förhållandet.',
      'tan går åt fel håll — från vinkel till förhållande.',
      'Det inverterade bråket är fortfarande ett förhållande, ingen vinkel.',
      'Vinkelsumman blandas inte in här.',
    ],
  },
  {
    question: 'I en rätvinklig triangel är närliggande katet 3 cm och hypotenusan 5 cm. Hur bestäms vinkeln $u$?',
    choices: [
      '$u = \\cos^{-1}\\left(\\dfrac{3}{5}\\right) \\approx 53°$',
      '$u = \\sin^{-1}\\left(\\dfrac{3}{5}\\right) \\approx 37°$',
      '$u = \\tan^{-1}\\left(\\dfrac{3}{5}\\right) \\approx 31°$',
      '$u = \\dfrac{3}{5} = 0{,}6°$',
    ],
    correct: 0,
    why: [
      'Närliggande katet och hypotenusa → cosinus, och vinkeln fås med cos⁻¹.',
      'sin⁻¹(3/5) ger den ANDRA vinkeln (37°) — där 3 cm är motstående katet.',
      'Tangens kräver båda katetrarna — hypotenusan ingår inte.',
      '0,6 är förhållandet, inte vinkeln — inversen behövs.',
    ],
  },
],

'ma1c-6.4': [
  {
    question: 'Hur bestäms sträckan mellan två punkter i ett koordinatsystem?',
    choices: [
      'Bilda en rätvinklig triangel — sträckan är hypotenusan och beräknas med Pythagoras sats',
      'Räkna rutor längs sträckan',
      'Addera x- och y-skillnaderna',
      'Multiplicera koordinaterna',
    ],
    correct: 0,
    why: [
      'Katetrarna läggs vågrätt och lodrätt längs rutnätet; $c^2 = a^2 + b^2$ ger sträckan.',
      'Att räkna rutor fungerar bara för vågräta och lodräta sträckor.',
      '$4 + 3 = 7$ men sträckan är 5 — addition ger fel.',
      'Koordinatprodukter har ingen geometrisk mening här.',
    ],
  },
  {
    question: 'Punkterna (−2, 1) och (2, 4) förbinds. Hur långa blir triangelns kateter?',
    choices: [
      '4 och 3 längdenheter',
      '2 och 4 längdenheter',
      '−2 och 1 längdenheter',
      '5 och 5 längdenheter',
    ],
    correct: 0,
    why: [
      'Vågrätt: från −2 till 2 är 4 rutor. Lodrätt: från 1 till 4 är 3 rutor.',
      'Det är koordinatvärden, inte skillnader.',
      'Kateter är längder — alltid positiva.',
      '5 är hypotenusan, inte katetrarna.',
    ],
  },
  {
    question: 'Varför förkastas den negativa lösningen när $c^2 = 25$ ger $c = \\pm 5$?',
    choices: [
      'En sträcka kan inte vara negativ',
      'Negativa tal saknar kvadratrot',
      'Pythagoras sats gäller bara positiva tal',
      'Den förkastas inte — båda är svar',
    ],
    correct: 0,
    why: [
      'Ekvationen har två lösningar, men i sammanhanget är bara den positiva rimlig — precis som med kvadratens sida.',
      '$(-5)^2 = 25$ fungerar utmärkt matematiskt — det är tolkningen som utesluter den.',
      'Satsen i sig bryr sig inte — geometrin gör det.',
      'Som LÄNGD är bara 5 giltig.',
    ],
  },
  {
    question: 'Hur bestäms vinkeln mellan sträckan och x-axeln när katetrarna 3 (motstående) och 4 (närliggande) är kända?',
    choices: [
      '$v = \\tan^{-1}\\left(\\dfrac{3}{4}\\right) \\approx 37°$',
      '$v = \\tan\\left(\\dfrac{3}{4}\\right)$',
      '$v = \\sin^{-1}\\left(\\dfrac{3}{4}\\right)$',
      '$v = \\dfrac{3}{4} \\cdot 90°$',
    ],
    correct: 0,
    why: [
      'Två kateter → tangens, och vinkeln fås med inversen: $\\tan^{-1}(0{,}75) \\approx 37°$.',
      'tan utan invers går åt fel håll — från vinkel till kvot.',
      'sin⁻¹ kräver hypotenusan i nämnaren, och $\\frac{3}{4}$ är kvoten av katetrarna.',
      'Vinklar skalas inte linjärt med kvoten.',
    ],
  },
],

'ma1c-6.5': [
  {
    question: 'Vilken av följande storheter är en skalär?',
    choices: [
      'Temperatur',
      'Hastighet',
      'Kraft',
      'Acceleration',
    ],
    correct: 0,
    why: [
      'Temperatur har bara storlek — ingen riktning. En skalär.',
      'Hastighet har riktning — en vektor.',
      'Kraft har riktning — en vektor.',
      'Acceleration har riktning — en vektor.',
    ],
  },
  {
    question: 'Hur representeras en vektor grafiskt?',
    choices: [
      'Med en pil vars längd är storleken och vars riktning är vektorns riktning',
      'Med en punkt',
      'Med en cirkel vars radie är storleken',
      'Med ett tal',
    ],
    correct: 0,
    why: [
      'Pilen bär båda egenskaperna: längd = storlek, pilriktning = riktning.',
      'En punkt saknar både längd och riktning.',
      'En cirkel har ingen riktning.',
      'Ett tal ensamt räcker bara för skalärer.',
    ],
  },
  {
    question: 'Vad händer med en vektor när den parallellförflyttas?',
    choices: [
      'Ingenting — det är fortfarande samma vektor',
      'Den byter riktning',
      'Den blir längre',
      'Den blir en skalär',
    ],
    correct: 0,
    why: [
      'Startpunkten ingår inte i vektorn — bara storlek och riktning. Flyttas den utan att dessa ändras är den identisk.',
      'Riktningen bevaras vid parallellförflyttning.',
      'Längden bevaras också.',
      'Vektorer förblir vektorer.',
    ],
  },
  {
    question: 'Hur skrivs och utläses längden av vektorn $\\vec{u}$?',
    choices: [
      '$|\\vec{u}|$ — "absolutbeloppet av u"',
      '$\\vec{u}^2$ — "u i kvadrat"',
      '$-\\vec{u}$ — "motsatta u"',
      '$u°$ — "u grader"',
    ],
    correct: 0,
    why: [
      'Längden skrivs med absolutbeloppstecken och beräknas med Pythagoras sats.',
      'Kvadraten på längden dyker upp i beräkningen, men beteckningen för längden är beloppet.',
      '$-\\vec{u}$ är den motsatta vektorn, inte längden.',
      'Grader mäter vinklar, inte längder.',
    ],
  },
  {
    question: 'Vektorn $\\overrightarrow{AB}$ har katetrarna 8 och 4 i rutnätet. Vad är $|\\overrightarrow{AB}|$?',
    choices: [
      '$\\sqrt{80}$ l.e.',
      '$12$ l.e.',
      '$80$ l.e.',
      '$\\sqrt{12}$ l.e.',
    ],
    correct: 0,
    why: [
      '$|\\overrightarrow{AB}|^2 = 8^2 + 4^2 = 80$, så längden är $\\sqrt{80}$ l.e.',
      '$8 + 4 = 12$ — men kateter adderas inte; Pythagoras sats gäller.',
      '80 är längdens KVADRAT.',
      '$\\sqrt{8 + 4}$ blandar ihop — kvadrera FÖRST, addera sedan.',
    ],
  },
],

'ma1c-6.6': [
  {
    question: 'Vad händer med en vektor som multipliceras med en NEGATIV skalär?',
    choices: [
      'Storleken skalas och riktningen vänds',
      'Bara storleken ändras',
      'Vektorn försvinner',
      'Vektorn vrids 90 grader',
    ],
    correct: 0,
    why: [
      'T.ex. är $-2\\vec{w}$ dubbelt så lång som $\\vec{w}$ och pekar åt motsatt håll.',
      'Minustecknet gör mer än så — det vänder riktningen.',
      'Bara multiplikation med 0 nollar vektorn.',
      'Skalärmultiplikation vrider aldrig — den skalar och kan vända.',
    ],
  },
  {
    question: 'Hur ritas summan av två vektorer med polygonmetoden?',
    choices: [
      'Den ena flyttas till den andras spets; resultanten dras från start till slut',
      'Vektorerna ritas ovanpå varandra',
      'Vinkeln mellan dem halveras',
      'Den längre vektorn väljs som svar',
    ],
    correct: 0,
    why: [
      'Spets-till-start-kedja, sedan resultanten från första startpunkten till sista spetsen.',
      'Ovanpå varandra går ingenting att avläsa.',
      'Vinklar halveras inte i vektoraddition.',
      'Båda vektorerna bidrar till resultanten.',
    ],
  },
  {
    question: 'Vad kallas vektorn $\\vec{w} = \\vec{u} + \\vec{v}$?',
    choices: [
      'Resultanten',
      'Komplementet',
      'Skalärprodukten',
      'Inversen',
    ],
    correct: 0,
    why: [
      'Summavektorn kallas resultant.',
      'Komplement hör till sannolikhetsläran.',
      'Skalärprodukt är en annan operation (senare kurser).',
      'Invers används om funktioner och motsatta vektorer, inte summor.',
    ],
  },
  {
    question: 'Jämfört med $\\vec{w}$ — vad är $3\\vec{w}$?',
    choices: [
      'Tre gånger så lång, samma riktning',
      'Tre gånger så lång, motsatt riktning',
      'Lika lång, annan riktning',
      'En skalär',
    ],
    correct: 0,
    why: [
      'Positiv faktor: längden skalas, riktningen behålls.',
      'Motsatt riktning kräver negativ faktor.',
      'Längden ändras med faktorn 3.',
      'Produkten av skalär och vektor är fortfarande en vektor.',
    ],
  },
],

'ma1c-6.7': [
  {
    question: 'Hur beräknas $\\vec{u} - \\vec{v}$ grafiskt?',
    choices: [
      'Rita $-\\vec{v}$, flytta den till spetsen av $\\vec{u}$ och dra resultanten från start till slut',
      'Dra en pil mellan vektorernas startpunkter',
      'Förkorta båda vektorerna med 2',
      'Det går inte att subtrahera vektorer grafiskt',
    ],
    correct: 0,
    why: [
      'Subtraktionen skrivs om som addition med den motsatta vektorn och löses med polygonmetoden.',
      'Startpunkterna säger inget — det är spets-till-start-kedjan som gäller.',
      'Förkortning hör till bråk, inte vektorer.',
      'Jodå — via omskrivningen till addition.',
    ],
  },
  {
    question: 'Vad är $\\vec{u} - \\vec{v}$ omskrivet som addition?',
    choices: [
      '$\\vec{u} + (-\\vec{v})$',
      '$-\\vec{u} + \\vec{v}$',
      '$\\vec{u} + \\vec{v}$',
      '$-(\\vec{u} + \\vec{v})$',
    ],
    correct: 0,
    why: [
      'Minus en vektor = plus dess motsatta vektor.',
      'Det är $\\vec{v} - \\vec{u}$ — resultanten pekar åt motsatt håll.',
      'Utan teckenbytet blir det en helt annan resultant.',
      'Det är motsatta vektorn till SUMMAN.',
    ],
  },
  {
    question: 'Vektorn $\\vec{v}$ pekar snett uppåt höger. Åt vilket håll pekar $-\\vec{v}$?',
    choices: [
      'Snett nedåt vänster',
      'Snett uppåt vänster',
      'Snett nedåt höger',
      'Samma håll, men kortare',
    ],
    correct: 0,
    why: [
      'Motsatta vektorn pekar rakt motsatt: uppåt höger blir nedåt vänster.',
      'Bara ena komposanten har vänt — båda ska byta tecken.',
      'Samma sak — bara ena komposanten vänd.',
      'Längden bevaras och riktningen vänds helt.',
    ],
  },
  {
    question: 'Var ritas resultanten $\\vec{w} = \\vec{u} - \\vec{v}$ i kedjan u följd av minus v?',
    choices: [
      'Från startpunkten av $\\vec{u}$ till spetsen av $-\\vec{v}$',
      'Från spetsen av $\\vec{u}$ till startpunkten av $-\\vec{v}$',
      'Mellan de två spetsarna',
      'Från origo, alltid',
    ],
    correct: 0,
    why: [
      'Precis som vid addition: resultanten går från kedjans start till dess slut.',
      'Det är baklänges — och de punkterna sammanfaller ju i kedjan.',
      'Spets-till-spets ger fel vektor.',
      'Vektorer är inte bundna till origo.',
    ],
  },
],

'ma1c-6.8': [
  {
    question: 'Vad motsvarar koordinaterna i vektorn $\\overrightarrow{AB} = (8,\\ 4)$?',
    choices: [
      'Katetlängderna i den rätvinkliga triangel som vektorn bildar',
      'Punkten där vektorn slutar',
      'Vektorns längd och vinkel',
      'Två olika vektorer',
    ],
    correct: 0,
    why: [
      'Förflyttningen är 8 i x-led och 4 i y-led — precis katetrarna som går in i Pythagoras sats.',
      'Vektorn kan starta var som helst — koordinaterna anger förflyttningen, inte en punkt.',
      'Längd och vinkel kan RÄKNAS UT ur koordinaterna, men det är inte de som står där.',
      'Det är EN vektor med två komponenter.',
    ],
  },
  {
    question: 'Beräkna längden av $\\vec{u} = (6,\\ 8)$.',
    choices: [
      '10 l.e.',
      '14 l.e.',
      '48 l.e.',
      '$\\sqrt{14}$ l.e.',
    ],
    correct: 0,
    why: [
      '$\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.',
      '$6 + 8 = 14$ — koordinater adderas inte rakt av.',
      '$6 \\cdot 8 = 48$ — ingen multiplikation i formeln.',
      'Kvadrera FÖRST och addera sedan — inte tvärtom.',
    ],
  },
  {
    question: 'Varför spelar det ingen roll att en koordinat är negativ när längden beräknas?',
    choices: [
      'Kvadreringen gör den positiv',
      'Negativa koordinater är förbjudna',
      'Roten tar bort tecknet efteråt',
      'Det spelar roll — längden kan bli negativ',
    ],
    correct: 0,
    why: [
      '$(-5)^2 = 25$ — under rottecknet är allt positivt, så $(11, -5)$ har samma längd som $(11, 5)$.',
      'Vektorer pekar åt alla håll — negativa koordinater är vardag.',
      'Tecknet försvinner redan VID kvadreringen.',
      'En längd är alltid positiv.',
    ],
  },
  {
    question: 'Hur skrivs längdformeln med formelbladets beteckningar för $\\vec{u} = (a_x,\\ a_y)$?',
    choices: [
      '$|\\vec{u}| = \\sqrt{a_x^2 + a_y^2}$',
      '$|\\vec{u}| = a_x^2 + a_y^2$',
      '$|\\vec{u}| = \\sqrt{a_x + a_y}$',
      '$|\\vec{u}| = a_x \\cdot a_y$',
    ],
    correct: 0,
    why: [
      'Samma Pythagoras-formel, med index x och y på komponenterna.',
      'Utan roten fås längdens KVADRAT.',
      'Komponenterna måste kvadreras innan de adderas.',
      'Produkten har inget med längden att göra.',
    ],
  },
],

// ═══════════════════════════════════════════════════════════════════
// MATEMATIK NIVÅ 2c
// ═══════════════════════════════════════════════════════════════════

'ma2c-1.1': [
  {
    question: 'Vad betyder krullparentesen framför två ekvationer?',
    choices: [
      'Att ekvationerna bildar ett system med krav på en gemensam lösning',
      'Att ekvationerna ska adderas',
      'Att den övre ekvationen är viktigast',
      'Att båda ekvationerna saknar lösning',
    ],
    correct: 0,
    why: [
      'Krullparentesen markerar ett ekvationssystem — lösningen måste passa i båda ekvationerna samtidigt.',
      'Att addera ekvationerna kan vara ett lösningssteg (additionsmetoden), men det är inte vad parentesen betyder.',
      'Ekvationerna i ett system är likvärdiga — ingen ordning eller prioritet gäller.',
      'Var för sig har linjära ekvationer med två variabler oändligt många lösningar — systemet frågar efter de gemensamma.',
    ],
  },
  {
    question: 'Var i grafen hittar man lösningen till ett ekvationssystem?',
    choices: [
      'I skärningspunkten mellan linjerna',
      'Där den ena linjen skär y-axeln',
      'Där linjerna skär x-axeln',
      'I punkten där avståndet mellan linjerna är störst',
    ],
    correct: 0,
    why: [
      'Skärningspunkten ligger på båda linjerna samtidigt — dess koordinater uppfyller båda ekvationerna, vilket är precis vad en lösning är.',
      'Skärningen med y-axeln ger linjens m-värde, inte systemets lösning.',
      'Linjernas nollställen hör till varje linje för sig — lösningen kräver en punkt som ligger på båda.',
      'Lösningen är där linjerna möts, inte där de är som längst ifrån varandra.',
    ],
  },
  {
    question: 'Linjerna $y = 2x - 4$ och $y = -x + 5$ skär varandra i punkten (3, 2). Vilken är lösningen till ekvationssystemet?',
    choices: [
      '$x = 3$ och $y = 2$',
      '$x = 2$ och $y = 3$',
      '$x = 3$ eller $x = 2$',
      '$x = -4$ och $y = 5$',
    ],
    correct: 0,
    why: [
      'Skärningspunktens x-koordinat är lösningen till x och y-koordinaten är lösningen till y — punkten (3, 2) ger x = 3 och y = 2.',
      'Ordningen i en punkt är (x, y) — första koordinaten är x-värdet, inte y-värdet.',
      'Lösningen är ett talpar (ett x och ett y som hör ihop), inte två alternativa x-värden.',
      '−4 och 5 är linjernas m-värden (skärningar med y-axeln), inte systemets lösning.',
    ],
  },
  {
    question: 'Två linjer har samma $k$-värde men olika $m$-värden. Hur många lösningar har ekvationssystemet?',
    choices: [
      'Inga lösningar',
      'Exakt en lösning',
      'Oändligt många lösningar',
      'Det beror på m-värdenas storlek',
    ],
    correct: 0,
    why: [
      'Samma lutning men olika startpunkter på y-axeln gör linjerna parallella — de skär aldrig varandra, så det finns ingen gemensam lösning.',
      'Exakt en lösning kräver att linjerna skär varandra, vilket förutsätter olika k-värden.',
      'Oändligt många lösningar fås först när linjerna är identiska — samma k OCH samma m.',
      'Så länge m-värdena är olika är linjerna parallella oavsett hur stora eller små värdena är.',
    ],
  },
  {
    question: 'När har ett linjärt ekvationssystem exakt en lösning?',
    choices: [
      'När linjerna har olika $k$-värden',
      'När linjerna har samma $k$-värde',
      'När båda linjerna går genom origo',
      'När linjerna har samma $m$-värde men olika $k$-värden',
    ],
    correct: 0,
    why: [
      'Olika lutningar gör att linjerna alltid korsar varandra i exakt en punkt — m-värdena spelar då ingen roll.',
      'Samma k-värde ger antingen parallella linjer (inga lösningar) eller samma linje (oändligt många) — aldrig exakt en.',
      'Två olika linjer genom origo skär varandra där, men det är olika k-värden som är det allmänna villkoret — inte origo.',
      'Villkoret räcker med olika k-värden — kravet på samma m-värde är onödigt (då vet man dessutom att skärningen sker på y-axeln).',
    ],
  },
],

'ma2c-1.2': [
  {
    question: 'Vad innebär det att göra en **substitution** när man löser ett ekvationssystem?',
    choices: [
      'Att byta ut en variabel mot ett uttryck från den andra ekvationen',
      'Att addera de två ekvationerna ledvis',
      'Att rita upp båda ekvationerna i ett koordinatsystem',
      'Att byta plats på ekvationerna i systemet',
    ],
    correct: 0,
    why: [
      'Substitution betyder utbyte — variabeln ersätts med ett likvärdigt uttryck, så att en ekvation med bara en variabel återstår.',
      'Ledvis addition är additionsmetoden — en annan algebraisk metod.',
      'Det är den grafiska lösningsmetoden, inte substitutionsmetoden.',
      'Ekvationernas ordning spelar ingen roll — att byta plats förändrar ingenting.',
    ],
  },
  {
    question: 'Vad är det första steget i substitutionsmetoden?',
    choices: [
      'Lös ut en valfri variabel från en valfri ekvation',
      'Sätt in ett gissat värde på $x$ i båda ekvationerna',
      'Multiplicera ekvationerna så att en variabel får olika tecken',
      'Beräkna skärningspunkten mellan linjerna',
    ],
    correct: 0,
    why: [
      'Först behövs ett uttryck att byta in — därför löser man ut en variabel (helst en med koefficient 1) ur någon av ekvationerna.',
      'Substitutionsmetoden är exakt och algebraisk — ingen gissning behövs.',
      'Det är förberedelsen i additionsmetoden, inte substitutionsmetoden.',
      'Skärningspunkten hör till den grafiska metoden — substitutionsmetoden räknar fram lösningen algebraiskt.',
    ],
  },
  {
    question: 'Systemet $\\begin{cases} y = 3x \\\\ 2x + y = 10 \\end{cases}$ löses med substitutionsmetoden. Vilken ekvation får man?',
    choices: [
      '$2x + 3x = 10$',
      '$2x + y = 3x$',
      '$2 \\cdot 3x + y = 10$',
      '$3x = 10$',
    ],
    correct: 0,
    why: [
      'Enligt den övre ekvationen är y lika med 3x — byt ut y mot 3x i den undre: $2x + 3x = 10$, dvs. $5x = 10$.',
      'Substitutionen ska göras i den undre ekvationens y-term — inte genom att sätta ekvationernas led lika hur som helst.',
      'Det är x-termen som fått fel ersättning — det är $y$ som ska bytas ut mot $3x$, inte $x$.',
      'Då har $2x$-termen tappats bort — hela den undre ekvationen ska behållas.',
    ],
  },
  {
    question: 'Du har bestämt att $x = 3$. Hur får du fram $y$?',
    choices: [
      'Sätt in $x = 3$ i någon av de tidigare ekvationerna',
      'Lös hela systemet en gång till med $y$ först',
      'Addera 3 till båda led i den andra ekvationen',
      '$y$ är alltid samma som $x$, så $y = 3$',
    ],
    correct: 0,
    why: [
      'När den ena variabeln är känd ger insättning i valfri tidigare ekvation den andra — vilken ekvation man väljer spelar ingen roll.',
      'Det fungerar men är onödigt dubbelarbete — insättning räcker.',
      'Att addera 3 till båda led är en balansoperation, inte ett sätt att utnyttja att x är känt.',
      'x och y är olika variabler — deras värden hänger ihop via ekvationerna men är sällan lika.',
    ],
  },
  {
    question: 'Vilken variabel är smartast att lösa ut ur systemet $\\begin{cases} 3x - y = 2 \\\\ 5x + 2y = 10 \\end{cases}$?',
    choices: [
      '$y$ ur den övre ekvationen, eftersom den saknar koefficient',
      '$x$ ur den övre ekvationen, eftersom $x$ kommer först',
      '$y$ ur den undre ekvationen, eftersom 2 är ett litet tal',
      'Det går inte att använda substitutionsmetoden här',
    ],
    correct: 0,
    why: [
      'Ur den övre fås $y = 3x - 2$ utan division eller bråk — variabler med koefficient 1 (eller −1) är enklast att lösa ut.',
      'Att lösa ut x ur $3x - y = 2$ ger bråket $x = (2 + y)/3$ — det fungerar men ger jobbigare räkning.',
      'Att lösa ut y ur $5x + 2y = 10$ kräver division med 2 och ger bråk i uttrycket.',
      'Substitutionsmetoden fungerar på alla linjära ekvationssystem — frågan är bara vilket utlösande som ger minst räknearbete.',
    ],
  },
],

'ma2c-1.3': [
  {
    question: 'Vad krävs för att en variabel ska elimineras när ekvationerna adderas ledvis?',
    choices: [
      'Samma variabelterm finns i båda ekvationerna, med olika tecken',
      'Samma variabelterm finns i båda ekvationerna, med samma tecken',
      'Båda ekvationerna har samma högerled',
      'Variabeln står ensam i ena ledet',
    ],
    correct: 0,
    why: [
      'Termer som $+5y$ och $-5y$ ger summan 0 vid ledvis addition — variabeln försvinner och kvar blir en ekvation med en variabel.',
      'Med samma tecken blir summan dubbla termen (t.ex. $5y + 5y = 10y$) — inget elimineras.',
      'Högerleden adderas också, men de behöver inte vara lika för att metoden ska fungera.',
      'Det är utgångsläget för substitutionsmetoden — additionsmetoden bygger på teckenmotsatta termer.',
    ],
  },
  {
    question: 'Vad blir resultatet när ekvationerna i $\\begin{cases} -3x + 2y = 4 \\\\ 3x + 5y = 10 \\end{cases}$ adderas ledvis?',
    choices: [
      '$7y = 14$',
      '$3y = 6$',
      '$6x + 7y = 14$',
      '$7y = 40$',
    ],
    correct: 0,
    why: [
      '$-3x$ och $+3x$ tar ut varandra; $2y + 5y = 7y$ och $4 + 10 = 14$.',
      'y-termerna ska adderas, inte subtraheras: $2y + 5y = 7y$.',
      'x-termerna har olika tecken och elimineras — de blir inte $6x$.',
      'Högerleden adderas: $4 + 10 = 14$, inte $4 \\cdot 10 = 40$.',
    ],
  },
  {
    question: 'Systemet $\\begin{cases} 2x + y = 7 \\\\ 3x - 2y = 0 \\end{cases}$ ska lösas med additionsmetoden. Vad är ett lämpligt första steg?',
    choices: [
      'Multiplicera den övre ekvationen med 2',
      'Addera ekvationerna direkt',
      'Multiplicera den undre ekvationen med 2',
      'Subtrahera 7 från båda led i den övre ekvationen',
    ],
    correct: 0,
    why: [
      'Då blir den övre $4x + 2y = 14$ — termerna $+2y$ och $-2y$ har olika tecken och elimineras vid addition.',
      'Direkt addition ger $5x - y = 7$ — ingen variabel försvinner, man har bara fått en ny ekvation med två variabler.',
      'Då blir den undre $6x - 4y = 0$, och y-termerna ($+y$ och $-4y$) matchar fortfarande inte.',
      'Det ändrar bara den övre ekvationens form — det skapar inga teckenmotsatta variabeltermer.',
    ],
  },
  {
    question: 'När man multiplicerar en ekvation med ett tal — vad måste man tänka på?',
    choices: [
      'Alla termer i båda led ska multipliceras med talet',
      'Bara variabeltermerna ska multipliceras',
      'Bara vänsterledet ska multipliceras',
      'Talet måste vara positivt',
    ],
    correct: 0,
    why: [
      'En ekvation är en likhet — den bevaras bara om hela vänsterledet och hela högerledet multipliceras med samma tal.',
      'Om konstanttermerna hoppas över säger den nya ekvationen något annat än den gamla — likheten förstörs.',
      'Högerledet måste följa med, annars gäller inte likheten längre.',
      'Det går utmärkt att multiplicera med negativa tal — det används ofta just för att byta tecken på en term.',
    ],
  },
  {
    question: 'När behöver man multiplicera **båda** ekvationerna i ett system innan addition?',
    choices: [
      'När ingen variabelterm kan matchas genom att multiplicera bara en av ekvationerna med ett heltal',
      'Alltid — båda ekvationerna måste alltid modifieras',
      'När högerleden är olika stora',
      'När systemet saknar lösningar',
    ],
    correct: 0,
    why: [
      'Om ingen koefficient är en multipel av motsvarande koefficient i den andra ekvationen (som i $2x + 7y = 8$ och $5x + 9y = 3$) multipliceras ekvationerna med varandras koefficienter, med tecken valda så att termerna elimineras.',
      'Ofta räcker det att modifiera en ekvation — eller ingen alls, om teckenmotsatta termer redan finns.',
      'Högerledens storlek styr inte metoden — det är variabeltermernas koefficienter som ska matchas.',
      'Antalet lösningar avgör inte räknestrategin — även system utan lösning kan hanteras med addition (man får då en motsägelse).',
    ],
  },
],

'ma2c-1.4': [
  {
    question: 'Vad är det första steget vid problemlösning med ekvationssystem?',
    choices: [
      'Definiera vad variablerna betyder',
      'Ställa upp ekvationerna',
      'Gissa en rimlig lösning',
      'Rita en graf',
    ],
    correct: 0,
    why: [
      'Innan ekvationerna kan tecknas måste det vara tydligt vad varje bokstav står för — t.ex. "k = antalet kor".',
      'Ekvationerna kommer i steg 2 — utan definierade variabler vet man inte vad de betyder.',
      'Metoden är algebraisk och exakt — gissning behövs inte.',
      'En graf kan hjälpa men ingår inte i grundproceduren: definiera, ställ upp och lös, tolka.',
    ],
  },
  {
    question: 'En bonde har $k$ kor och $h$ höns. Vad beskriver termen $4k$ i ekvationen $4k + 2h = 352$?',
    choices: [
      'Det totala antalet ben från korna',
      'Antalet kor gånger antalet huvuden',
      'Att bonden har 4 kor',
      'Det totala antalet djur',
    ],
    correct: 0,
    why: [
      'Varje ko har 4 ben, så k kor bidrar med 4k ben — ekvationen räknar ihop alla ben till totalt 352.',
      'Huvudena räknas i den andra ekvationen ($k + h = 100$) — här handlar det om ben.',
      'Siffran 4 är antalet ben per ko, inte antalet kor.',
      'Totala antalet djur är $k + h$, inte $4k$.',
    ],
  },
  {
    question: 'Två tal har summan 19 och differensen 5. Vilket ekvationssystem beskriver detta, om $x$ är det största talet?',
    choices: [
      '$\\begin{cases} x + y = 19 \\\\ x - y = 5 \\end{cases}$',
      '$\\begin{cases} x + y = 5 \\\\ x - y = 19 \\end{cases}$',
      '$\\begin{cases} x \\cdot y = 19 \\\\ x - y = 5 \\end{cases}$',
      '$\\begin{cases} x + y = 19 \\\\ y - x = 5 \\end{cases}$',
    ],
    correct: 0,
    why: [
      'Summan är resultatet av addition (19) och differensen av subtraktion (5) — och eftersom x är störst är $x - y$ positiv.',
      'Summan och differensen har bytt plats — summan av två tal som skiljer sig med 19 kan inte vara 5 om båda är positiva.',
      'Summan betyder addition, inte multiplikation — $x \\cdot y$ är produkten.',
      'Med x som det största talet blir $y - x$ negativ (−5), inte 5.',
    ],
  },
  {
    question: 'Ekvationssystemet ger lösningen $k = 76$ och $h = 24$. Vad återstår enligt problemlösningsproceduren?',
    choices: [
      'Tolka lösningen och svara på frågan med ord',
      'Ingenting — lösningen är svaret',
      'Kontrollera att $k$ är större än $h$',
      'Rita upp lösningen i ett koordinatsystem',
    ],
    correct: 0,
    why: [
      'Sista steget är att tolka: "Bonden har 76 kor och 24 höns." Ett bra svar kopplar tillbaka till det frågan faktiskt gällde — och en rimlighetskoll skadar aldrig.',
      'Ett talpar är inte ett färdigt svar på en textuppgift — svaret ska formuleras i uppgiftens termer.',
      'Det finns inget generellt krav på att den ena variabeln ska vara störst.',
      'Grafisk redovisning behövs inte — men svaret ska tolkas och formuleras.',
    ],
  },
  {
    question: 'I en klass finns $p$ pojkar och $f$ flickor. Det finns 3 **fler** flickor än pojkar. Vilken ekvation stämmer?',
    choices: [
      '$f = p + 3$',
      '$p = f + 3$',
      '$f + p = 3$',
      '$f = 3p$',
    ],
    correct: 0,
    why: [
      'Flickorna är fler — flickornas antal är pojkarnas antal plus 3.',
      'Det säger tvärtom att pojkarna är 3 fler än flickorna — en klassisk teckningsfälla.',
      'Summan av antalen är inte 3 — det är skillnaden som är 3.',
      '"3 fler" betyder addition med 3, inte multiplikation med 3 ("3 gånger så många").',
    ],
  },
],

'ma2c-2.1': [
  {
    question: 'Vad säger första kvadreringsregeln?',
    choices: [
      '$(a + b)^2 = a^2 + 2ab + b^2$',
      '$(a + b)^2 = a^2 + b^2$',
      '$(a + b)^2 = a^2 + ab + b^2$',
      '$(a + b)(a - b) = a^2 - b^2$',
    ],
    correct: 0,
    why: [
      'Kvadraten på en summa ger de båda kvadraterna PLUS den dubbla produkten 2ab.',
      'Den dubbla produkten saknas — $(a + b)^2$ är inte samma sak som $a^2 + b^2$. Testa med a = b = 1: VL är 4 men HL är 2.',
      'Produkten ska dubblas — mittentermen är 2ab, inte ab.',
      'Det är konjugatregeln, inte en kvadreringsregel.',
    ],
  },
  {
    question: 'När kan konjugatregeln användas för att utveckla ett uttryck?',
    choices: [
      'När två likadana parenteser multipliceras och det enda som skiljer är tecknet mellan termerna',
      'När en parentes upphöjs till 2',
      'När båda parenteserna innehåller ett minustecken',
      'När parenteserna innehåller helt olika termer',
    ],
    correct: 0,
    why: [
      'Konjugat är just ett par som $(a + b)(a - b)$ — samma termer, olika tecken emellan. Produkten blir $a^2 - b^2$.',
      'En parentes i kvadrat utvecklas med en kvadreringsregel, inte konjugatregeln.',
      'Två minusparenteser, t.ex. $(a - b)(a - b)$, är en kvadrat — andra kvadreringsregeln gäller då.',
      'Med helt olika termer finns ingen genväg — då får man multiplicera in term för term.',
    ],
  },
  {
    question: 'Utveckla $(x - 5)^2$.',
    choices: [
      '$x^2 - 10x + 25$',
      '$x^2 - 25$',
      '$x^2 + 10x + 25$',
      '$x^2 - 10x - 25$',
    ],
    correct: 0,
    why: [
      'Andra kvadreringsregeln: kvadraten på x, minus dubbla produkten 10x, plus kvadraten på 5.',
      '$x^2 - 25$ är resultatet av konjugatet $(x + 5)(x - 5)$ — i en kvadrat uppstår en mittenterm.',
      'Plustecknet framför mittentermen hör till $(x + 5)^2$ — här är tecknet minus.',
      'Sista termen är $(-5)^2 = +25$ — kvadraten på ett negativt tal är positiv.',
    ],
  },
  {
    question: 'Vad blir den dubbla produkten när $(3x + 2)^2$ utvecklas?',
    choices: [
      '$12x$',
      '$6x$',
      '$5x$',
      '$9x$',
    ],
    correct: 0,
    why: [
      'Multiplicera termerna och dubbla: $3x \\cdot 2 = 6x$, dubblat ger $12x$. Hela utvecklingen är $9x^2 + 12x + 4$.',
      '$6x$ är produkten av termerna — den ska dessutom dubblas.',
      '$5x$ vore summan av koefficienterna — den dubbla produkten är $2 \\cdot 3x \\cdot 2$.',
      '$9x$ blandar ihop med kvadraten på $3x$ (som är $9x^2$).',
    ],
  },
  {
    question: 'Kan $(7 + 2x)(2x - 7)$ utvecklas med konjugatregeln?',
    choices: [
      'Ja — kasta om termerna i första parentesen till $(2x + 7)$, sedan ger regeln $4x^2 - 49$',
      'Nej — parenteserna börjar med olika termer, så regeln kan aldrig användas',
      'Ja — direkt utan omskrivning blir det $49 - 4x^2$',
      'Nej — konjugatregeln gäller bara när båda parenteserna har plustecken',
    ],
    correct: 0,
    why: [
      'Termer med plustecken emellan får byta plats: $(7 + 2x) = (2x + 7)$. Då står konjugatparet $(2x + 7)(2x - 7)$ klart och ger $(2x)^2 - 7^2 = 4x^2 - 49$.',
      'Ordningen i en parentes med plustecken kan alltid kastas om — då blir det ett konjugat.',
      'Utan omskrivning ser man inte vilket tal som är "a" — och tecknet blir fel: svaret är $4x^2 - 49$, inte $49 - 4x^2$.',
      'Konjugatregeln kräver precis ett plus- och ett minuspar — det är det som gör det till ett konjugat.',
    ],
  },
],

'ma2c-2.2': [
  {
    question: 'Vad innebär det att faktorisera ett uttryck?',
    choices: [
      'Att skriva om uttrycket som en multiplikation',
      'Att förenkla uttrycket så långt som möjligt',
      'Att utveckla alla parenteser',
      'Att sätta uttrycket lika med 0',
    ],
    correct: 0,
    why: [
      'Faktorer är delarna i en multiplikation — att faktorisera är att skriva uttrycket som en produkt av faktorer.',
      'Faktorisering är en särskild sorts omskrivning — resultatet är inte alltid "enklare", men det är en produkt.',
      'Att utveckla parenteser är motsatsen — då går man från produkt till summa.',
      'Att sätta ett uttryck lika med 0 skapar en ekvation — det är inte faktorisering.',
    ],
  },
  {
    question: 'Vilken regel används för att faktorisera $x^2 - 49$?',
    choices: [
      'Konjugatregeln baklänges — "kvadrat minus kvadrat är konjugat"',
      'Första kvadreringsregeln baklänges',
      'Andra kvadreringsregeln baklänges',
      'Bryta ut den gemensamma faktorn 7',
    ],
    correct: 0,
    why: [
      'Två kvadrater ($x^2$ och $7^2$) med minus emellan: $x^2 - 49 = (x + 7)(x - 7)$.',
      'Kvadreringsreglerna kräver TRE termer — här finns bara två.',
      'Även andra kvadreringsregeln kräver tre termer med en mittenterm.',
      'Termerna $x^2$ och 49 har ingen gemensam faktor att bryta ut.',
    ],
  },
  {
    question: 'Faktorisera $x^2 - 10x + 25$.',
    choices: [
      '$(x - 5)^2$',
      '$(x + 5)^2$',
      '$(x + 5)(x - 5)$',
      '$x(x - 10) + 25$',
    ],
    correct: 0,
    why: [
      'Tre termer, första och sista är kvadrater, minus framför mittentermen — andra kvadreringsregeln baklänges. Kontroll: dubbla produkten $2 \\cdot x \\cdot 5 = 10x$ stämmer.',
      'Plusvarianten $(x + 5)^2$ ger mittentermen $+10x$, men här är den $-10x$.',
      'Konjugatet ger $x^2 - 25$ — utan mittenterm.',
      'Det är ingen färdig faktorisering — uttrycket är inte skrivet som en enda produkt.',
    ],
  },
  {
    question: 'Vad är första steget när man ska faktorisera ett uttryck?',
    choices: [
      'Undersöka om något kan brytas ut "som vanligt"',
      'Testa konjugatregeln',
      'Sätta uttrycket lika med 0',
      'Kvadratkomplettera',
    ],
    correct: 0,
    why: [
      'Ordningen är: 1) bryt ut om möjligt, 2) använd kvadrerings- eller konjugatregel baklänges. Att bryta ut först gör resten enklare — som i $50x^2 - 98 = 2(25x^2 - 49)$.',
      'Konjugatregeln kan bli aktuell — men först efter att gemensamma faktorer brutits ut.',
      'Faktorisering är en omskrivning av uttrycket — ingen ekvation behövs.',
      'Kvadratkomplettering är en teknik för ekvationslösning, inte faktoriseringens första steg.',
    ],
  },
  {
    question: 'Hur förenklas det rationella uttrycket $\\dfrac{x^2 - 4}{2x + 4}$?',
    choices: [
      'Faktorisera till $\\dfrac{(x+2)(x-2)}{2(x+2)}$ och förkorta med $(x+2)$ — kvar blir $\\dfrac{x-2}{2}$',
      'Stryk $x^2$ mot $2x$ och 4 mot 4 — kvar blir $\\dfrac{x}{2}$',
      'Dividera täljare och nämnare med $x$ — kvar blir $\\dfrac{x - 4}{2 + 4}$',
      'Uttrycket kan inte förenklas',
    ],
    correct: 0,
    why: [
      'Först faktoriseras täljare (konjugat) och nämnare (bryt ut 2), sedan förkortas den gemensamma FAKTORN $(x + 2)$.',
      'Bara faktorer får förkortas — aldrig enskilda termer i en summa. Att stryka termer ger fel resultat.',
      'Termerna innehåller inte alla $x$ — och division term för term är inte tillåten i bråk.',
      'Det kan det visst — båda leden går att faktorisera med en gemensam faktor.',
    ],
  },
],

'ma2c-2.3': [
  {
    question: 'Vilken princip bygger nollproduktmetoden på?',
    choices: [
      'Om en produkt är lika med 0 måste minst en faktor vara lika med 0',
      'Om en summa är lika med 0 måste båda termerna vara 0',
      'En ekvation får alltid multipliceras med 0',
      'Alla andragradsekvationer har lösningen $x = 0$',
    ],
    correct: 0,
    why: [
      'Två tal kan aldrig multipliceras till 0 om inget av dem är 0 — därför måste någon faktor vara 0.',
      'En summa kan bli 0 på många sätt (t.ex. $5 + (-5)$) — principen gäller produkter.',
      'Att multiplicera en ekvation med 0 förstör den (allt blir 0 = 0).',
      'Endast ekvationer där konstantterm saknas har roten 0.',
    ],
  },
  {
    question: 'Vilka typer av ekvationer löses lämpligen med nollproduktmetoden?',
    choices: [
      'Ekvationer med både $x^2$-termer och $x$-termer (utan konstantterm), och ekvationer där en produkt är lika med 0',
      'Alla ekvationer som innehåller $x^2$',
      'Endast ekvationer som redan står i faktoriserad form',
      'Ekvationer med $x$ under ett rottecken',
    ],
    correct: 0,
    why: [
      'När konstantterm saknas kan x brytas ut, och när vänsterledet är en produkt lika med 0 ger metoden lösningarna direkt.',
      'Fullständiga andragradsekvationer (med konstantterm) kräver i stället pq-formeln.',
      'Metoden fungerar även på ofaktoriserade uttryck — faktoriseringen är ju steg 2 i metoden.',
      'Rotekvationer löses genom kvadrering, inte med nollproduktmetoden.',
    ],
  },
  {
    question: 'Vilka lösningar har ekvationen $x(x - 8) = 0$?',
    choices: [
      '$x_1 = 0$ och $x_2 = 8$',
      'Endast $x = 8$',
      '$x_1 = 0$ och $x_2 = -8$',
      'Endast $x = 0$',
    ],
    correct: 0,
    why: [
      'Faktorerna är $x$ och $(x - 8)$ — den första är 0 när x = 0, den andra när x = 8.',
      'Faktorn $x$ framför parentesen ger också en lösning: x = 0. Den glöms lätt bort.',
      'Faktorn $(x - 8)$ blir 0 när $x = 8$ (ombytt tecken), inte −8.',
      'Även parentesen kan bli 0 — det ger den andra lösningen x = 8.',
    ],
  },
  {
    question: 'Varför får man inte dividera båda led i $x^2 = 6x$ med $x$?',
    choices: [
      'Då tappas lösningen $x = 0$ bort',
      'Division med variabler är alltid förbjuden',
      'Då blir högerledet negativt',
      'Det får man visst — det ger båda lösningarna',
    ],
    correct: 0,
    why: [
      'Division med x förutsätter att x inte är 0 — men x = 0 ÄR en av lösningarna. Rätt väg: flytta över och faktorisera, $x(x - 6) = 0$.',
      'Division med en variabel är tillåten när variabeln bevisligen inte är 0 — problemet här är att den kan vara det.',
      'Tecknet påverkas inte av divisionen — problemet är den förlorade roten.',
      'Divisionen ger bara $x = 6$ — lösningen $x = 0$ försvinner.',
    ],
  },
  {
    question: 'Vilken ekvation har rötterna $x_1 = -2$ och $x_2 = 5$?',
    choices: [
      '$(x + 2)(x - 5) = 0$',
      '$(x - 2)(x + 5) = 0$',
      '$(x + 2)(x + 5) = 0$',
      '$(x - 2)(x - 5) = 0$',
    ],
    correct: 0,
    why: [
      'Rötterna sätts in med ombytt tecken: roten −2 ger faktorn $(x + 2)$ och roten 5 ger faktorn $(x - 5)$.',
      'Tecknen är omkastade — den här ekvationen har rötterna 2 och −5.',
      'Båda faktorerna har fel tecken för roten 5 — $(x + 5)$ ger roten −5.',
      '$(x - 2)$ ger roten +2, inte −2.',
    ],
  },
],

'ma2c-2.4': [
  {
    question: 'Vilken typ av ekvationer löses med pq-formeln?',
    choices: [
      'Fullständiga andragradsekvationer — med $x^2$-term, $x$-term och konstantterm',
      'Ekvationer med endast $x^2$-term och konstantterm',
      'Ekvationer med endast $x^2$-term och $x$-term',
      'Linjära ekvationer med två variabler',
    ],
    correct: 0,
    why: [
      'När alla tre termtyperna finns räcker varken den vanliga metoden eller nollproduktmetoden — då används pq-formeln.',
      'Utan x-term räcker den vanliga metoden: lös ut $x^2$ och dra roten ur.',
      'Utan konstantterm är nollproduktmetoden (bryt ut x) enklare.',
      'pq-formeln gäller andragradsekvationer med EN variabel.',
    ],
  },
  {
    question: 'Ekvationen $x^2 + px + q = 0$ har enligt pq-formeln lösningarna …',
    choices: [
      '$x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$',
      '$x = \\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$',
      '$x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 + q}$',
      '$x = -p \\pm \\sqrt{p^2 - q}$',
    ],
    correct: 0,
    why: [
      'Halva koefficienten med ombytt tecken utanför roten; under roten samma tal i kvadrat minus konstanttermen.',
      'Tecknet utanför roten ska vara ombytt — minus p/2, inte plus.',
      'Under rottecknet ska konstanttermen subtraheras (dvs. ombytt tecken på q).',
      'Det är HALVA koefficienten som används, både utanför och under roten.',
    ],
  },
  {
    question: 'Vilka två krav måste vara uppfyllda innan pq-formeln används?',
    choices: [
      'Ena ledet är 0 och koefficienten framför $x^2$-termen är 1',
      'Båda leden är positiva och ekvationen har två lösningar',
      'Ekvationen är faktoriserad och lika med 0',
      'Konstanttermen är positiv och x-termen är negativ',
    ],
    correct: 0,
    why: [
      'Formeln utgår från mallen $x^2 + px + q = 0$ — därför måste ledet göras till 0 och en eventuell koefficient framför $x^2$ divideras bort.',
      'Ledens tecken och antalet lösningar spelar ingen roll för att formeln ska få användas.',
      'Faktorisering hör till nollproduktmetoden — pq-formeln används på den utvecklade formen.',
      'p och q får ha vilka tecken som helst.',
    ],
  },
  {
    question: 'Hur löses $2x^2 + 12x - 14 = 0$ med pq-formeln?',
    choices: [
      'Dividera först båda led med 2, sedan pq-formeln på $x^2 + 6x - 7 = 0$',
      'Sätt $p = 12$ och $q = -14$ direkt i formeln',
      'Bryt ut 2x och använd nollproduktmetoden',
      'Subtrahera 2 från båda led så att koefficienten försvinner',
    ],
    correct: 0,
    why: [
      'Koefficienten framför $x^2$ måste bort först — division med 2 ger $x^2 + 6x - 7 = 0$, och sedan ger formeln $x = -3 \\pm 4$.',
      'p och q kan bara läsas av NÄR koefficienten framför $x^2$ är 1 — annars blir svaret fel.',
      '$2x$ är ingen gemensam faktor i alla tre termerna (konstanttermen innehåller inget x).',
      'Koefficienten sitter multiplicerad med $x^2$ — subtraktion tar inte bort den.',
    ],
  },
  {
    question: 'I lösningen $x = 4 \\pm \\sqrt{16 - 12}$ — vad ger $\\pm$-tecknet?',
    choices: [
      'De två lösningarna $x_1 = 4 - 2 = 2$ och $x_2 = 4 + 2 = 6$',
      'Att lösningen är osäker',
      'Att båda lösningarna är $\\pm 2$',
      'Att ekvationen saknar lösningar',
    ],
    correct: 0,
    why: [
      'Roten ur 4 är 2, och plus/minus ger de två rötterna: $4 - 2$ och $4 + 2$.',
      'Plus/minus betyder inte osäkerhet — det betyder att BÅDA tecknen ger giltiga lösningar.',
      'Termen 4 utanför roten ska räknas med: lösningarna är 2 och 6, inte ±2.',
      'Diskriminanten är positiv (4), så det finns två lösningar.',
    ],
  },
],

'ma2c-2.5': [
  {
    question: 'För vilken form av andragradsekvation är abc-formeln gjord?',
    choices: [
      '$ax^2 + bx + c = 0$',
      '$x^2 + px + q = 0$',
      '$a(x + b)^2 = c$',
      '$ax^2 + bx = cx$',
    ],
    correct: 0,
    why: [
      'abc-formeln hanterar den allmänna formen där koefficienten a framför $x^2$ får vara vilket tal som helst.',
      'Det är pq-formelns form — där måste koefficienten framför $x^2$ vara 1.',
      'Kvadratform löses enklast genom rotdragning, inte abc-formeln.',
      'Formeln kräver att ena ledet är 0.',
    ],
  },
  {
    question: 'Vad skiljer abc-formeln från pq-formeln?',
    choices: [
      'Koefficienten framför $x^2$-termen behöver inte divideras bort innan abc-formeln används',
      'abc-formeln ger fler lösningar än pq-formeln',
      'abc-formeln kräver ingen kvadratrot',
      'pq-formeln fungerar bara när q är positivt',
    ],
    correct: 0,
    why: [
      'a ingår i abc-formeln, så ekvationen kan användas som den står — pq-formeln kräver först division så att koefficienten blir 1.',
      'Båda formlerna ger exakt samma lösningar — de är två vägar till samma mål.',
      'Båda formlerna innehåller en kvadratrot.',
      'pq-formeln fungerar för alla tecken på q.',
    ],
  },
  {
    question: 'Vilka är $a$, $b$ och $c$ i ekvationen $5x^2 - 3x - 2 = 0$?',
    choices: [
      '$a = 5$, $b = -3$, $c = -2$',
      '$a = 5$, $b = 3$, $c = 2$',
      '$a = -3$, $b = 5$, $c = -2$',
      '$a = 5x^2$, $b = -3x$, $c = -2$',
    ],
    correct: 0,
    why: [
      'Koefficienterna läses av med tecken: 5 framför $x^2$, −3 framför $x$ och konstanttermen −2.',
      'Tecknen måste följa med — b och c är negativa här.',
      'a hör alltid till $x^2$-termen, b till x-termen.',
      'a, b och c är talen (koefficienterna), inte hela termerna.',
    ],
  },
  {
    question: 'Vad blir uttrycket under rottecknet ($b^2 - 4ac$) för ekvationen $2x^2 - 8x + 6 = 0$?',
    choices: [
      '$16$',
      '$64$',
      '$-48$',
      '$112$',
    ],
    correct: 0,
    why: [
      '$b^2 - 4ac = (-8)^2 - 4 \\cdot 2 \\cdot 6 = 64 - 48 = 16$.',
      '$64$ är bara $b^2$ — subtraktionen med $4ac = 48$ saknas.',
      '$-48$ är bara $-4ac$ — termen $b^2 = 64$ saknas.',
      '$112$ fås om man ADDERAR $4ac$ i stället för att subtrahera.',
    ],
  },
  {
    question: 'Ger pq-formeln och abc-formeln samma lösningar till en och samma ekvation?',
    choices: [
      'Ja — de är två likvärdiga metoder som ger exakt samma rötter',
      'Nej — abc-formeln ger dubbelt så många lösningar',
      'Bara om koefficienten framför $x^2$ är 1',
      'Nej — de gäller olika typer av ekvationer',
    ],
    correct: 0,
    why: [
      'Formlerna är algebraiskt ekvivalenta — abc-formeln blir pq-formeln om man dividerar ekvationen med a först.',
      'Antalet rötter bestäms av ekvationen (diskriminanten), inte av vilken formel som används.',
      'De ger samma svar för alla koefficienter — skillnaden är bara hur mycket förarbete som krävs.',
      'Båda löser samma sak: fullständiga andragradsekvationer lika med 0.',
    ],
  },
],

'ma2c-2.6': [
  {
    question: 'Vad kallas uttrycket under rottecknet i pq-formeln?',
    choices: [
      'Diskriminant',
      'Koefficient',
      'Konjugat',
      'Dubbelrot',
    ],
    correct: 0,
    why: [
      'Diskriminanten $\\left(\\frac{p}{2}\\right)^2 - q$ "diskriminerar" (skiljer) mellan fallen två, en eller ingen lösning.',
      'Koefficienter är talen framför variabeltermerna i ekvationen.',
      'Konjugat är ett parentespar av typen $(a+b)(a-b)$.',
      'Dubbelrot är namnet på lösningen när diskriminanten är 0 — inte på uttrycket självt.',
    ],
  },
  {
    question: 'Diskriminanten till en andragradsekvation är positiv. Hur många lösningar har ekvationen?',
    choices: [
      'Två',
      'En',
      'Ingen',
      'Det beror på konstanttermen',
    ],
    correct: 0,
    why: [
      'Roten ur ett positivt tal är ett positivt tal, och ± ger då två olika värden.',
      'En lösning fås bara när diskriminanten är exakt 0 (då är ± meningslöst).',
      'Ingen lösning fås när diskriminanten är negativ.',
      'Konstanttermen är redan inbakad i diskriminanten — dess tecken avgör ensamt.',
    ],
  },
  {
    question: 'Varför saknar ekvationen lösningar när diskriminanten är negativ?',
    choices: [
      'Kvadratroten ur ett negativt tal saknar (reellt) värde — inget tal i kvadrat blir negativt',
      'Negativa tal kan inte vara lösningar till ekvationer',
      'pq-formeln fungerar bara för positiva tal',
      'Ekvationen har då oändligt många lösningar i stället',
    ],
    correct: 0,
    why: [
      'Ett tal multiplicerat med sig självt är aldrig negativt — därför finns inget (reellt) värde för roten, och formeln ger inga rötter.',
      'Lösningar får visst vara negativa (t.ex. x = −7) — det är talet UNDER ROTEN som inte får vara negativt.',
      'Formeln hanterar negativa p och q utmärkt — problemet är enbart negativt värde under rottecknet.',
      'Negativ diskriminant ger noll lösningar, inte oändligt många.',
    ],
  },
  {
    question: 'Hur många lösningar har $x^2 + 4x + 4 = 0$?',
    choices: [
      'En (dubbelrot)',
      'Två',
      'Ingen',
      'Fyra',
    ],
    correct: 0,
    why: [
      'pq-formeln ger $x = -2 \\pm \\sqrt{4 - 4} = -2 \\pm 0$ — diskriminanten är 0, så det finns exakt en lösning, x = −2.',
      'Två lösningar kräver positiv diskriminant, men $2^2 - 4 = 0$.',
      'Diskriminanten är inte negativ — den är exakt 0, vilket ger en rot.',
      'En andragradsekvation kan aldrig ha fler än två lösningar.',
    ],
  },
  {
    question: 'För vilket värde på $q$ har $x^2 + 12x + q = 0$ exakt en lösning?',
    choices: [
      '$q = 36$',
      '$q = 12$',
      '$q = 6$',
      '$q = 144$',
    ],
    correct: 0,
    why: [
      'Diskriminanten $6^2 - q$ ska vara 0, vilket ger $q = 36$.',
      'q ska matcha KVADRATEN på halva koefficienten: $6^2 = 36$, inte koefficienten själv.',
      '6 är halva koefficienten — diskriminanten kräver dess kvadrat.',
      '144 är hela koefficienten i kvadrat ($12^2$) — det är halva koefficienten (6) som ska kvadreras.',
    ],
  },
],

'ma2c-2.7': [
  {
    question: 'Vad är det första steget i problemlösningsproceduren?',
    choices: [
      'Tolka problemet — definiera variabler och rita vid behov figur',
      'Lösa ekvationen med pq-formeln',
      'Kontrollera svaret',
      'Ställa upp ekvationen',
    ],
    correct: 0,
    why: [
      'Först måste problemet förstås: vad är okänt, vad ska variablerna betyda, och hjälper en figur?',
      'Ekvationslösningen är steg 3 — det finns ingen ekvation att lösa förrän problemet tolkats och tecknats.',
      'Kontroll och tolkning av svaret är det sista steget.',
      'Ekvationerna ställs upp i steg 2, efter att variablerna definierats.',
    ],
  },
  {
    question: 'En andragradsekvation ur ett geometriproblem ger rötterna $x_1 = -27$ och $x_2 = 45$, där $x$ är en sträcka i cm. Vad gäller?',
    choices: [
      'Roten $-27$ bortses — en sträcka kan inte vara negativ, så $x = 45$ cm',
      'Båda rötterna är giltiga svar',
      'Ekvationen måste ha lösts fel eftersom en rot är negativ',
      'Svaret är medelvärdet av rötterna',
    ],
    correct: 0,
    why: [
      'Ekvationen vet inget om verkligheten — tolkningssteget sållar bort rötter som är orimliga i sammanhanget, som negativa längder.',
      'En negativ sträcka saknar mening — bara den positiva roten duger som svar.',
      'Negativa rötter är helt normala matematiskt — de sorteras bort i tolkningen, inte i räkningen.',
      'Rötterna är två separata kandidater — de ska prövas mot verkligheten, inte medelvärdesbildas.',
    ],
  },
  {
    question: 'Två positiva tal har differensen 21 och produkten 1 080. Vilket ekvationssystem beskriver detta, om $y$ är det största talet?',
    choices: [
      '$\\begin{cases} y - x = 21 \\\\ x \\cdot y = 1\\,080 \\end{cases}$',
      '$\\begin{cases} x + y = 21 \\\\ x \\cdot y = 1\\,080 \\end{cases}$',
      '$\\begin{cases} y - x = 1\\,080 \\\\ x \\cdot y = 21 \\end{cases}$',
      '$\\begin{cases} y - x = 21 \\\\ x + y = 1\\,080 \\end{cases}$',
    ],
    correct: 0,
    why: [
      'Differens betyder subtraktion (större minus mindre = 21) och produkt betyder multiplikation (= 1 080).',
      'Differensen är en skillnad, inte en summa — talen adderas inte till 21.',
      'Villkoren har bytt plats — differensen är 21 och produkten 1 080.',
      'Produkten (multiplikationen) saknas — 1 080 är talens produkt, inte deras summa.',
    ],
  },
  {
    question: 'Varför blir det en andragradsekvation när substitutionen $y = 21 + x$ sätts in i $x \\cdot y = 1\\,080$?',
    choices: [
      'Produkten $x(21 + x)$ innehåller $x \\cdot x = x^2$',
      'Talet 1 080 är stort',
      'Substitutionsmetoden ger alltid andragradsekvationer',
      'Det blir det inte — ekvationen är linjär',
    ],
    correct: 0,
    why: [
      'När x multipliceras in i parentesen uppstår termen $x^2$: $21x + x^2 = 1\\,080$ — en andragradsekvation som löses med pq-formeln.',
      'Högerledets storlek påverkar inte ekvationens gradtal.',
      'I linjära system (som kapitel 1) ger substitutionen linjära ekvationer — det är produktvillkoret som skapar $x^2$ här.',
      'Termen $x \\cdot x$ gör ekvationen till en andragradsekvation.',
    ],
  },
  {
    question: 'En rektangel har sidorna $x$ och $x - 18$ cm och arean $1\\,215\\ \\mathrm{cm}^2$. Frågan gäller **omkretsen**. Vad ska man göra när $x = 45$ har bestämts?',
    choices: [
      'Sätta in $x = 45$ i omkretsformeln $O = 4x - 36$ — svaret är 144 cm, inte 45',
      'Svara 45 cm — det är ju lösningen till ekvationen',
      'Multiplicera sidorna för att få svaret',
      'Dubblera $x$ till 90 cm',
    ],
    correct: 0,
    why: [
      'Ekvationen gav bara sidan x — men frågan gällde omkretsen. Sista steget är att räkna ut det som faktiskt efterfrågades: $O = 4 \\cdot 45 - 36 = 144$ cm.',
      'x är ett delresultat — att svara med det är att missa tolkningssteget. Frågan gällde omkretsen.',
      'Produkten av sidorna är arean ($1\\,215\\ \\mathrm{cm}^2$) — den var given från början.',
      'Omkretsen är summan av ALLA fyra sidor: $x + x + (x-18) + (x-18)$.',
    ],
  },
],

'ma2c-2.8': [
  {
    question: 'Vad är en rotekvation?',
    choices: [
      'En ekvation där variabeln finns under ett rottecken',
      'En ekvation som saknar rötter',
      'En ekvation vars lösning är 0',
      'En ekvation med en kvadratrot i svaret',
    ],
    correct: 0,
    why: [
      'Namnet syftar på att variabeln (t.ex. x) står under ett rottecken, som i $\\sqrt{x + 2} = 17$.',
      'Rotekvationer kan mycket väl ha lösningar — "rot" syftar på rottecknet, inte på antalet rötter.',
      'Lösningens värde har inget med namnet att göra.',
      'Det är variabelns placering under rottecknet i EKVATIONEN som räknas, inte svarets form.',
    ],
  },
  {
    question: 'Vad är standardmetoden för att lösa en rotekvation?',
    choices: [
      'Lös ut rotuttrycket, kvadrera båda led och lös ekvationen — kontrollera sedan lösningarna',
      'Dra roten ur båda led',
      'Använd pq-formeln direkt på ekvationen',
      'Gissa och pröva olika värden',
    ],
    correct: 0,
    why: [
      'Kvadrering tar bort rottecknet — men den kan skapa falska rötter, så kontrollen är obligatorisk.',
      'Rotdragning skulle skapa ännu fler rotuttryck — det är kvadrering som tar BORT rottecken.',
      'pq-formeln kräver en andragradsekvation utan rottecken — den kan bli aktuell först EFTER kvadreringen.',
      'Metoden är systematisk och algebraisk — ingen gissning behövs.',
    ],
  },
  {
    question: 'Vad är en falsk rot?',
    choices: [
      'En lösning som uppstår vid kvadreringen men inte uppfyller den ursprungliga ekvationen',
      'En lösning som är negativ',
      'En lösning som innehåller ett rottecken',
      'En avrundad lösning',
    ],
    correct: 0,
    why: [
      'Kvadreringen är inte reversibel: ur $A = B$ följer $A^2 = B^2$, men $A^2 = B^2$ gäller även för $A = -B$. Sådana extralösningar avslöjas vid kontrollen.',
      'Negativa lösningar kan vara helt giltiga — falskheten avgörs av kontrollen i ursprungsekvationen, inte av tecknet.',
      'Lösningens form spelar ingen roll — det är om den uppfyller ursprungsekvationen som räknas.',
      'Falska rötter handlar inte om avrundning utan om kvadreringens extralösningar.',
    ],
  },
  {
    question: 'Ekvationen $x + 3\\sqrt{x} - 4 = 0$ ska lösas med variabelsubstitution. Vilken substitution är lämplig, och vad blir den nya ekvationen?',
    choices: [
      '$t = \\sqrt{x}$ ger $t^2 + 3t - 4 = 0$',
      '$t = x^2$ ger $t + 3\\sqrt{t} - 4 = 0$',
      '$t = 3\\sqrt{x}$ ger $t^2 + t - 4 = 0$',
      '$t = x + 3$ ger $t\\sqrt{x} = 4$',
    ],
    correct: 0,
    why: [
      'Med $t = \\sqrt{x}$ blir $x = t^2$, och ekvationen förvandlas till en vanlig andragradsekvation i t som pq-formeln löser.',
      'Den substitutionen gör inte ekvationen enklare — rottecknet finns kvar.',
      'Med $t = 3\\sqrt{x}$ blir $x = t^2/9$ — koefficienterna blir krångligare, inte enklare.',
      'Substitutionen ska ersätta ROTUTTRYCKET så att ekvationen blir rotfri.',
    ],
  },
  {
    question: 'Efter substitutionen $t = \\sqrt{x}$ fås $t_1 = -4$ och $t_2 = 1$. Vad gäller för $t_1 = -4$?',
    choices: [
      '$\\sqrt{x} = -4$ saknar lösning — ett rotuttryck är aldrig negativt (kvadrering ger den falska roten $x = 16$)',
      '$t_1 = -4$ ger den giltiga lösningen $x = 16$',
      '$t_1 = -4$ ger lösningen $x = -16$',
      '$t_1 = -4$ ger lösningen $x = -2$',
    ],
    correct: 0,
    why: [
      'Kvadratroten ur ett tal är aldrig negativ, så $\\sqrt{x} = -4$ är omöjlig. Kvadrerar man ändå fås x = 16 — som kontrollen avslöjar som falsk rot.',
      'Kontrollen i ursprungsekvationen visar att x = 16 INTE stämmer (VL blir 24, inte 0).',
      'Kvadrering av −4 ger +16 — men även den roten är falsk.',
      'Roten och halveringar hör inte ihop — och ekvationen $\\sqrt{x} = -4$ saknar helt lösning.',
    ],
  },
],

'ma2c-3.1': [
  {
    question: 'Vad kallas formen på grafen till en andragradsfunktion?',
    choices: [
      'Parabel',
      'Hyperbel',
      'Sinuskurva',
      'Rät linje',
    ],
    correct: 0,
    why: [
      'Andragradsfunktionens graf bildar en "båge" som kallas parabel.',
      'Hyperbel är grafen till t.ex. $y = 1/x$ — två separata grenar.',
      'Sinuskurvan hör till trigonometriska funktioner och böljar fram och tillbaka.',
      'Räta linjer hör till förstagradsfunktioner ($y = kx + m$).',
    ],
  },
  {
    question: 'Vad är en **extrempunkt**?',
    choices: [
      'Ett samlingsnamn för maximi- och minimipunkt',
      'Den punkt där grafen skär y-axeln',
      'Ett annat namn för nollställe',
      'Den punkt där grafen är som brantast',
    ],
    correct: 0,
    why: [
      'En extrempunkt är antingen en maximipunkt ("topp") eller en minimipunkt ("dal") — vilket av dem kallas punktens karaktär.',
      'Skärningen med y-axeln är en annan sak — den ges av konstanttermen.',
      'Nollställen är där grafen skär x-axeln, inte parabelns topp/dal.',
      'I extrempunkten är grafen tvärtom som flackast — den vänder där.',
    ],
  },
  {
    question: 'Funktionen $f(x) = -3x^2 + 6x - 1$ har en negativ $x^2$-term. Vilken karaktär har extrempunkten?',
    choices: [
      'Maximipunkt — negativ andragradsterm ger "sur mun"',
      'Minimipunkt — negativ andragradsterm ger "glad mun"',
      'Det beror på konstanttermen',
      'Funktionen saknar extrempunkt',
    ],
    correct: 0,
    why: [
      'Negativ andragradsterm gör att parabeln öppnar sig nedåt ("sur mun") — grafen har en topp, en maximipunkt.',
      'Minnesreglerna är tvärtom: positiv term ger glad mun (minimipunkt).',
      'Karaktären avgörs enbart av tecknet på andragradstermen — konstanttermen flyttar bara grafen i höjdled.',
      'Alla andragradsfunktioner har exakt en extrempunkt.',
    ],
  },
  {
    question: 'Vad gäller för symmetrilinjen till en parabel?',
    choices: [
      'Den är lodrät, går genom extrempunkten och anges med sin x-koordinat',
      'Den är vågrät och går genom nollställena',
      'Den sammanfaller alltid med y-axeln',
      'Den finns bara om parabeln har nollställen',
    ],
    correct: 0,
    why: [
      'Symmetrilinjen delar parabeln i två spegellika halvor; extrempunkten ligger alltid på den, och ekvationen skrivs t.ex. $x_s = 3$.',
      'Symmetrilinjen är lodrät — en vågrät linje kan inte dela parabeln i två spegellika halvor.',
      'Bara parabler med extrempunkt på y-axeln har $x_s = 0$ — i allmänhet ligger den någon annanstans.',
      'Alla parabler har en symmetrilinje, oavsett om nollställen finns.',
    ],
  },
  {
    question: 'Hur många nollställen kan en andragradsfunktion ha?',
    choices: [
      'Två, ett eller inga',
      'Alltid exakt två',
      'Alltid minst ett',
      'Hur många som helst',
    ],
    correct: 0,
    why: [
      'Parabeln kan skära x-axeln två gånger, nudda den en gång (dubbelrot) eller ligga helt ovanför/under den (inga nollställen).',
      'En parabel som ligger helt ovanför x-axeln saknar nollställen, och en som nuddar har bara ett.',
      'En parabel med minimipunkt ovanför x-axeln skär aldrig axeln.',
      'En parabel kan aldrig skära x-axeln fler än två gånger.',
    ],
  },
],

'ma2c-3.2': [
  {
    question: 'Hur bestäms en andragradsfunktions **nollställen** algebraiskt?',
    choices: [
      'Sätt funktionsuttrycket lika med 0 och lös ekvationen',
      'Sätt in $x = 0$ i funktionsuttrycket',
      'Ta medelvärdet av extrempunktens koordinater',
      'Läs av konstanttermen',
    ],
    correct: 0,
    why: [
      'Nollställen är de x-värden där funktionens värde är 0 — ekvationen $f(x) = 0$ (t.ex. med pq-formeln) ger dem.',
      '$x = 0$ ger skärningen med y-axeln, inte nollställena.',
      'Extrempunkten ligger mellan nollställena men ger dem inte direkt.',
      'Konstanttermen är funktionens värde vid $x = 0$.',
    ],
  },
  {
    question: 'En funktion har nollställena $x = 3$ och $x = 7$. Vilken är symmetrilinjen?',
    choices: [
      '$x_s = 5$',
      '$x_s = 4$',
      '$x_s = 10$',
      '$x_s = 21$',
    ],
    correct: 0,
    why: [
      'Symmetrilinjen ligger mitt emellan nollställena: $(3 + 7)/2 = 5$.',
      '4 är halva avståndet mellan nollställena — men symmetrilinjen är medelvärdet, inte avståndet.',
      '10 är summan av nollställena — den ska halveras.',
      '21 är produkten av nollställena, inte medelvärdet.',
    ],
  },
  {
    question: 'En funktion saknar nollställen. Hur hittas symmetrilinjen ändå?',
    choices: [
      'Som "talet framför rottecknet" i pq-formeln, dvs. $x_s = -\\frac{p}{2}$',
      'Det går inte — utan nollställen finns ingen symmetrilinje',
      'Symmetrilinjen är då alltid $x_s = 0$',
      'Genom att läsa av konstanttermen q',
    ],
    correct: 0,
    why: [
      'pq-formelns första term $-\\frac{p}{2}$ pekar ut symmetrilinjen även när uttrycket under roten är negativt.',
      'Alla parabler har en symmetrilinje — det är bara nollställena som kan saknas.',
      'Symmetrilinjen ligger vid $-\\frac{p}{2}$, som sällan är 0.',
      'q påverkar grafens höjdläge och antalet nollställen — inte symmetrilinjens läge.',
    ],
  },
  {
    question: 'Hur bestäms extrempunktens fullständiga koordinater?',
    choices: [
      'x-koordinaten är symmetrilinjens värde, y-koordinaten fås genom insättning i funktionen',
      'Båda koordinaterna läses av i pq-formeln',
      'x-koordinaten är ett nollställe, y-koordinaten är 0',
      'x är konstanttermen och y är koefficienten framför x',
    ],
    correct: 0,
    why: [
      'Extrempunkten ligger på symmetrilinjen ($x = x_s$), och funktionsvärdet där, $f(x_s)$, är extrempunktens y-koordinat.',
      'pq-formeln ger nollställena och (via $-p/2$) symmetrilinjen — y-koordinaten kräver insättning i funktionen.',
      'Det beskriver ett nollställe, inte extrempunkten.',
      'Koefficienterna är inte koordinater.',
    ],
  },
  {
    question: 'Bestäm minsta värdet av $f(x) = x^2 - 10x + 21$, som har nollställena $x = 3$ och $x = 7$.',
    choices: [
      '$-4$',
      '$5$',
      '$21$',
      '$0$',
    ],
    correct: 0,
    why: [
      'Symmetrilinjen är $x_s = 5$ och $f(5) = 25 - 50 + 21 = -4$ — minsta värdet är extrempunktens y-koordinat.',
      '5 är symmetrilinjens x-värde — minsta VÄRDET är funktionens värde där, $f(5)$.',
      '21 är funktionens värde vid $x = 0$ (skärningen med y-axeln).',
      '0 är funktionens värde i nollställena — men minimipunkten ligger lägre, mellan dem.',
    ],
  },
],

'ma2c-3.3': [
  {
    question: 'Vad står $x_1$ och $x_2$ för i faktorformen $f(x) = k(x - x_1)(x - x_2)$?',
    choices: [
      'Funktionens nollställen',
      'Extrempunktens koordinater',
      'Två valfria punkter på grafen',
      'Koefficienterna framför x-termerna',
    ],
    correct: 0,
    why: [
      'Insättning av $x = x_1$ eller $x = x_2$ gör en faktor till 0 — de är precis funktionens nollställen.',
      'Extrempunkten ligger mitt emellan nollställena men ingår inte i faktorformen direkt.',
      'Punkterna i faktorformen är inte valfria — de är just nollställena.',
      'Koefficienten i faktorformen är k.',
    ],
  },
  {
    question: 'Vad krävs för att bestämma en andragradsfunktion med faktorform (Metod 1)?',
    choices: [
      'Nollställena samt ytterligare en punkt på grafen (som inte är ett nollställe)',
      'Endast nollställena',
      'Tre valfria punkter på grafen',
      'Extrempunkten och symmetrilinjen',
    ],
    correct: 0,
    why: [
      'Nollställena ger faktorerna, men k är fortfarande obekant — en extra punkt sätts in för att bestämma k.',
      'Utan en extra punkt är k obekant — oändligt många parabler har samma nollställen.',
      'Tre punkter hör till Metod 2 (utvecklad form) — faktorformen klarar sig med nollställen plus en punkt.',
      'Extrempunkten ligger på symmetrilinjen så de ger delvis samma information — det räcker inte för att fixera funktionen utan nollställena.',
    ],
  },
  {
    question: 'När fungerar INTE metoden med faktorform?',
    choices: [
      'När funktionen saknar nollställen eller när nollställena är okända',
      'När parabeln har en maximipunkt',
      'När grafen går genom origo',
      'När k är negativt',
    ],
    correct: 0,
    why: [
      'Faktorformen bygger på nollställena — finns de inte (eller syns de inte) används i stället tre punkter och utvecklad form.',
      'Karaktären spelar ingen roll — k blir negativt för en maximipunkt, men metoden fungerar.',
      'Origo kan själv vara ett nollställe (som för fontänen) — metoden fungerar utmärkt.',
      'k får vara vilket tal som helst utom 0.',
    ],
  },
  {
    question: 'Vad gäller i faktorformen om funktionen har en dubbelrot (grafen vänder på x-axeln)?',
    choices: [
      '$x_1 = x_2$ — samma faktor två gånger',
      'k måste vara 0',
      'Faktorformen kan inte användas',
      'Funktionen har då tre nollställen',
    ],
    correct: 0,
    why: [
      'Vid en dubbelrot nuddar parabeln x-axeln i en enda punkt: $f(x) = k(x - x_1)^2$.',
      'k = 0 skulle göra hela funktionen till 0 — k beskriver formen, inte antalet rötter.',
      'Faktorformen fungerar fint — faktorn upprepas bara.',
      'En andragradsfunktion kan aldrig ha fler än två nollställen.',
    ],
  },
  {
    question: 'En parabel har nollställena $x = -2$ och $x = 4$ och går genom (0, 8). Vad är $k$ i $f(x) = k(x + 2)(x - 4)$?',
    choices: [
      '$k = -1$',
      '$k = 1$',
      '$k = 8$',
      '$k = -4$',
    ],
    correct: 0,
    why: [
      'Insättning av (0, 8): $8 = k(0 + 2)(0 - 4) = -8k$, vilket ger $k = -1$.',
      'Med $k = 1$ blir $f(0) = 2 \\cdot (-4) = -8$, inte $+8$.',
      'Insättningen ger $8 = -8k$ — k är inte funktionsvärdet självt.',
      'Produkten $(0+2)(0-4) = -8$ ska multipliceras med k och bli 8, så $k = -1$.',
    ],
  },
],

'ma2c-3.4': [
  {
    question: 'Ekvationen $x^2 - 3x + 1 = 2x - 1$ ska lösas grafiskt. Vad ritar man upp?',
    choices: [
      'Båda leden som varsin funktion: $y = x^2 - 3x + 1$ och $y = 2x - 1$',
      'Endast vänsterledet: $y = x^2 - 3x + 1$',
      'Skillnaden av leden upphöjd till 2',
      'Symmetrilinjen till vänsterledet',
    ],
    correct: 0,
    why: [
      'Metoden är VL och HL som varsin graf — skärningarnas x-koordinater är lösningarna.',
      'Bara VL fungerar när HL är 0 (då används nollställena) — här är HL en linje.',
      'Ingen kvadrering ingår i den grafiska metoden.',
      'Symmetrilinjen hittar extrempunkten — inte lösningarna till en ekvation.',
    ],
  },
  {
    question: 'En andragradsekvation är lika med 0. Vilken grafisk genväg finns?',
    choices: [
      'Rita vänsterledet och ta fram grafens nollställen',
      'Rita vänsterledet och ta fram extrempunkten',
      'Rita $y = 0$ och ta fram dess extrempunkt',
      'Ingen — ekvationer lika med 0 kan inte lösas grafiskt',
    ],
    correct: 0,
    why: [
      'HL är 0, dvs. x-axeln — skärningarna med den är just grafens nollställen (verktyget "Nollställen" i Geogebra).',
      'Extrempunkten visar största/minsta värde — inte var funktionen är 0.',
      '$y = 0$ ÄR x-axeln — en rät linje utan extrempunkt.',
      'Det går utmärkt — nollställena är lösningarna.',
    ],
  },
  {
    question: 'Vad ger skärningspunkternas x-koordinater när en **olikhet** löses grafiskt?',
    choices: [
      'Gränserna för lösningsintervallen',
      'Lösningarna direkt',
      'Olikhetens tecken',
      'Funktionernas största värden',
    ],
    correct: 0,
    why: [
      'Skärningarna är där graferna byter ordning (över/under) — deras x-koordinater blir intervallens gränser, och sedan avgörs vilken sida som gäller.',
      'Till skillnad från en ekvation är lösningen ett helt intervall, inte bara skärningspunkterna.',
      'Tecknet står i uppgiften — grafen visar VAR det är uppfyllt.',
      'Största värden hör till extrempunkter, inte olikhetslösning.',
    ],
  },
  {
    question: 'Olikheten $f(x) > g(x)$ gäller där …',
    choices: [
      'grafen till $f$ ligger över grafen till $g$',
      'grafen till $f$ ligger under grafen till $g$',
      'graferna skär varandra',
      'grafen till $f$ ligger över x-axeln',
    ],
    correct: 0,
    why: [
      'Större funktionsvärde = högre upp i koordinatsystemet — f över g betyder $f(x) > g(x)$.',
      'Under-läget svarar mot $f(x) < g(x)$.',
      'I skärningarna är $f(x) = g(x)$ — likhet, inte olikhet.',
      'x-axeln är bara referens när HL är 0 — här jämförs f med g.',
    ],
  },
  {
    question: 'Parabeln $f(x) = x^2 + 6x + 6$ skär linjen $g(x) = 1$ vid $x = -5$ och $x = -1$, och ligger under linjen däremellan. Vilken är lösningen till $x^2 + 6x + 6 > 1$?',
    choices: [
      '$x < -5$ och $x > -1$',
      '$-5 < x < -1$',
      '$x > -1$',
      '$x = -5$ och $x = -1$',
    ],
    correct: 0,
    why: [
      'Parabeln ligger ÖVER linjen utanför skärningarna — lösningen består av två intervall, ett på varje sida.',
      'Mellan skärningarna ligger parabeln UNDER linjen — det är lösningen till $< 1$.',
      'Även området till vänster om $x = -5$ uppfyller olikheten — parabeln stiger brant åt båda hållen.',
      'Det är lösningarna till EKVATIONEN $= 1$ — olikheten löses av hela intervall.',
    ],
  },
],

'ma2c-3.5': [
  {
    question: 'En rakets höjd beskrivs av $h(t) = 40t - 4{,}9t^2$. Hur tar man grafiskt reda på **när raketen landar**?',
    choices: [
      'Ta fram grafens nollställe längst till höger — där är höjden 0 igen',
      'Ta fram extrempunkten',
      'Läsa av grafens skärning med y-axeln',
      'Rita hjälplinjen $y = 40$',
    ],
    correct: 0,
    why: [
      'Landning betyder $h(t) = 0$ — det högra nollstället ger landningstiden (det vänstra, $t = 0$, är starten).',
      'Extrempunkten ger högsta höjden, inte landningen.',
      'Vid $t = 0$ startar raketen — skärningen med y-axeln är startögonblicket.',
      '40 är koefficienten i funktionen, inte en höjd att sikta på.',
    ],
  },
  {
    question: 'Hur bestäms raketens **högsta höjd** grafiskt?',
    choices: [
      'Med verktyget Extrempunkt — maximipunktens y-koordinat är svaret',
      'Med verktyget Nollställen',
      'Maximipunktens x-koordinat är svaret',
      'Genom att rita $y = 100$ och ta skärningarna',
    ],
    correct: 0,
    why: [
      'Högsta höjden är det största funktionsvärdet — maximipunktens y-koordinat.',
      'Nollställena visar när höjden är 0 — start och landning.',
      'x-koordinaten säger NÄR raketen är som högst — höjden är y-koordinaten.',
      'En godtycklig hjälplinje visar när en viss höjd nås — inte den högsta.',
    ],
  },
  {
    question: 'Hur tar man reda på **när** raketen befinner sig på höjden 50 meter?',
    choices: [
      'Rita hjälplinjen $y = 50$ och ta fram skärningarna med grafen',
      'Sätt in $t = 50$ i funktionen',
      'Ta fram nollställena',
      'Läsa av y-koordinaten i extrempunkten',
    ],
    correct: 0,
    why: [
      'Skärningarna mellan banan och linjen $y = 50$ ger tidpunkterna — typiskt två: en på väg upp och en på väg ner.',
      '$t = 50$ ger höjden efter 50 sekunder — frågan är omvänd: när är höjden 50?',
      'Nollställena gäller höjden 0.',
      'Extrempunkten ger den högsta höjden, inte en specifik höjd.',
    ],
  },
  {
    question: 'En hage byggs mot en mur med 52 m stängsel till tre sidor. De två lika sidorna kallas $x$. Varför blir den tredje sidan $52 - 2x$?',
    choices: [
      'Stängslet räcker till tre sidor — två av dem tar $2x$, resten blir kvar till den tredje',
      'Muren är alltid dubbelt så lång som sidorna',
      'Arean ska vara $52\\ \\mathrm{m}^2$',
      'Symmetrilinjen ligger vid $x = 52$',
    ],
    correct: 0,
    why: [
      'Totalt 52 m fördelas på tre sidor: $x + x + \\text{tredje sidan} = 52$, så tredje sidan är $52 - 2x$.',
      'Muren ersätter den fjärde sidan och behöver inget stängsel — dess längd ingår inte i beräkningen.',
      '52 är stängslets längd i meter, inte arean.',
      '52 är stängsellängden — symmetrilinjen för arean hamnar vid $x = 13$.',
    ],
  },
  {
    question: 'Arean beskrivs av $A(x) = x(52 - 2x)$ och verktyget Extrempunkt ger (13, 338). Hur tolkas det?',
    choices: [
      'Den maximala arean är $338\\ \\mathrm{m}^2$ och fås när $x = 13$ m',
      'Den maximala arean är $13\\ \\mathrm{m}^2$ och fås när $x = 338$ m',
      'Hagen ska vara 13 × 338 meter',
      'Arean är alltid $338\\ \\mathrm{m}^2$ oavsett x',
    ],
    correct: 0,
    why: [
      'Maximipunktens x-koordinat är det värde på x som ger störst area, och y-koordinaten är själva arean. Måtten blir 13 m och $52 - 26 = 26$ m.',
      'Koordinaterna har bytt plats — x-värdet är sidan, y-värdet arean.',
      'Måtten är $x = 13$ m och $52 - 2x = 26$ m — 338 är arean, inte en sida.',
      'Parabeln visar just att arean VARIERAR med x — 338 är dess största värde.',
    ],
  },
],

'ma2c-4.1': [
  {
    question: 'En vinkel är 90°. Vad kallas den?',
    choices: [
      'Rät vinkel',
      'Spetsig vinkel',
      'Trubbig vinkel',
      'Rak vinkel',
    ],
    correct: 0,
    why: [
      'Exakt 90° är definitionen av en rät vinkel — den markeras ofta med en liten kvadrat.',
      'Spetsiga vinklar är mindre än 90°.',
      'Trubbiga vinklar ligger mellan 90° och 180°.',
      'En rak vinkel är 180° — ett halvt varv.',
    ],
  },
  {
    question: 'Vad är en **transversal**?',
    choices: [
      'En linje som skär minst två andra linjer',
      'En linje som delar en vinkel mitt itu',
      'En linje som är parallell med en annan linje',
      'En vinkel som är större än 180°',
    ],
    correct: 0,
    why: [
      'Transversalen är den skärande linjen — när den korsar två parallella linjer uppstår likbelägna vinklar, alternatvinklar med mera.',
      'En stråle som delar en vinkel mitt itu kallas bisektris.',
      'Parallella linjer skär aldrig varandra — transversalen gör precis tvärtom.',
      'En transversal är en linje, inte en vinkel.',
    ],
  },
  {
    question: 'Två parallella linjer skärs av en transversal. Vad gäller för **likbelägna** vinklar?',
    choices: [
      'De är lika stora',
      'De är tillsammans 180°',
      'De är tillsammans 90°',
      'Den ena är dubbelt så stor som den andra',
    ],
    correct: 0,
    why: [
      'Likbelägna vinklar sitter i samma position vid varsin skärning — och är lika stora när linjerna är parallella.',
      'Tillsammans 180° gäller sidovinklar.',
      'Ingen av vinkelparen vid en transversal summerar till 90° i allmänhet.',
      'Dubbelt så stor hör till randvinkelsatsen i cirklar — inte transversaler.',
    ],
  },
  {
    question: 'Vinklarna $v_3$ och $v_4$ bildar tillsammans en rak vinkel. Vad kallas de, och vad är deras summa?',
    choices: [
      'Sidovinklar — summan är 180°',
      'Vertikalvinklar — summan är 180°',
      'Alternatvinklar — summan är 90°',
      'Likbelägna vinklar — summan är 360°',
    ],
    correct: 0,
    why: [
      'Vinklar som tillsammans bildar en rak vinkel kallas sidovinklar, och en rak vinkel är 180°.',
      'Vertikalvinklar ligger mitt emot varandra och är LIKA stora — deras summa varierar.',
      'Alternatvinklar är lika stora (vid parallella linjer), inte komplementära.',
      'Likbelägna vinklar är lika stora — och ett helt varv (360°) är fyra räta vinklar, inte en rak.',
    ],
  },
  {
    question: 'Vad gör en **bisektris**?',
    choices: [
      'Delar en vinkel mitt itu',
      'Skär två parallella linjer',
      'Delar en sträcka mitt itu',
      'Bildar alltid en rät vinkel mot basen',
    ],
    correct: 0,
    why: [
      'En bisektris är en stråle som delar en vinkel i två lika stora halvor.',
      'Det beskriver en transversal.',
      'Bisektrisen delar en VINKEL — den punkt som delar en sträcka mitt itu kallas mittpunkt.',
      'Bisektrisen följer vinkelns riktning — den är sällan vinkelrät mot något.',
    ],
  },
],

'ma2c-4.2': [
  {
    question: 'Vad är vinkelsumman i en triangel?',
    choices: [
      '180°',
      '360°',
      '90°',
      'Det beror på triangelns form',
    ],
    correct: 0,
    why: [
      'Vinkelsumman i en triangel är alltid 180° — oavsett form.',
      '360° är vinkelsumman i en fyrhörning.',
      '90° är en enda rät vinkel.',
      'Summan är alltid exakt 180° — det är formoberoende.',
    ],
  },
  {
    question: 'Vad är vinkelsumman i en fyrhörning?',
    choices: [
      '360°',
      '180°',
      '540°',
      '720°',
    ],
    correct: 0,
    why: [
      'En fyrhörning kan delas i två trianglar — vinkelsumman är 2 · 180° = 360°.',
      '180° är triangelns vinkelsumma.',
      '540° är femhörningens vinkelsumma (tre trianglar).',
      '720° är sexhörningens vinkelsumma (fyra trianglar).',
    ],
  },
  {
    question: 'Hur bestäms vinkelsumman i en femhörning?',
    choices: [
      'Dela femhörningen i tre trianglar från ett hörn: 3 · 180° = 540°',
      'Multiplicera antalet hörn med 90°: 5 · 90° = 450°',
      'Addera 100° per hörn: 5 · 100° = 500°',
      'Vinkelsumman är alltid 360° oavsett antal hörn',
    ],
    correct: 0,
    why: [
      'Sträckor från ett hörn till alla övriga delar femhörningen i tre trianglar, och varje triangel bidrar med 180°.',
      'Hörn gånger 90° stämmer inte — testa med triangeln: 3 · 90° = 270° ≠ 180°.',
      '100° per hörn är påhittat — metoden är triangeluppdelningen.',
      '360° gäller bara fyrhörningar (och hela varv).',
    ],
  },
  {
    question: 'Vad kännetecknar en **liksidig** triangel?',
    choices: [
      'Alla sidor lika långa och alla vinklar 60°',
      'Minst två sidor lika långa',
      'En rät vinkel',
      'Alla vinklar olika stora',
    ],
    correct: 0,
    why: [
      'Liksidig = alla tre sidor lika, vilket tvingar alla vinklar att vara 180°/3 = 60°.',
      'Minst två lika sidor beskriver en likbent triangel.',
      'En rät vinkel gör triangeln rätvinklig — dess sidor följer Pythagoras sats.',
      'Tvärtom — i en liksidig triangel är alla vinklar lika.',
    ],
  },
  {
    question: 'I en likbent triangel är basvinklarna …',
    choices: [
      'lika stora',
      'tillsammans 90°',
      'alltid 60°',
      'olika stora',
    ],
    correct: 0,
    why: [
      'Basvinklarna (vinklarna mot basen) i en likbent triangel är alltid lika stora.',
      'Deras summa beror på toppvinkeln — den är inte låst till 90°.',
      '60° gäller bara i det liksidiga specialfallet.',
      'Det är just likheten mellan basvinklarna som kännetecknar likbenta trianglar.',
    ],
  },
],

'ma2c-4.3': [
  {
    question: 'Vad betyder $A \\implies B$?',
    choices: [
      'A leder till B, men B behöver inte leda till A',
      'A leder till B och B leder till A',
      'A och B är samma påstående',
      'A motsäger B',
    ],
    correct: 0,
    why: [
      'Implikationen pekar åt ett håll: om A är sann måste B vara sann — men inte nödvändigtvis omvänt.',
      'Det beskriver ekvivalensen A ⟺ B.',
      'A och B är olika påståenden som kopplas med en logisk pil.',
      'Implikation handlar om att A MEDFÖR B — inte motsäger.',
    ],
  },
  {
    question: 'När är två påståenden **ekvivalenta**?',
    choices: [
      'När implikationen gäller åt båda håll',
      'När implikationen gäller åt minst ett håll',
      'När båda påståendena är falska',
      'När det finns ett motexempel',
    ],
    correct: 0,
    why: [
      'Ekvivalens A ⟺ B kräver att A leder till B OCH att B leder till A.',
      'Ett håll räcker bara för implikation.',
      'Sanningshalten i enskilda fall avgör inte den logiska relationen.',
      'Ett motexempel FÄLLER en implikation — det skapar ingen ekvivalens.',
    ],
  },
  {
    question: 'Hur visar man att implikationen "det är en hund ⟹ det är en tax" är falsk?',
    choices: [
      'Med ett enda motexempel, t.ex. en pudel',
      'Genom att räkna upp många taxar',
      'Genom att visa att alla taxar är hundar',
      'Det går inte att visa',
    ],
    correct: 0,
    why: [
      'En pudel är en hund som inte är en tax — ett enda motexempel räcker för att fälla implikationen.',
      'Stödjande exempel bevisar aldrig en implikation — och hjälper inte mot ett motexempel.',
      'Det visar den OMVÄNDA implikationen (tax ⟹ hund), som faktiskt är sann.',
      'Jodå — motexempel är precis verktyget för detta.',
    ],
  },
  {
    question: 'Varför gäller INTE implikationen $x^2 = 25 \\implies x = 5$?',
    choices: [
      'Ekvationen har även lösningen $x = -5$ — ett motexempel',
      'Kvadratrötter kan inte beräknas exakt',
      '25 är inte en jämn kvadrat',
      'Implikationen gäller visst',
    ],
    correct: 0,
    why: [
      '$x = -5$ uppfyller $x^2 = 25$ men inte $x = 5$ — lösningen är inte entydig, så implikationen faller.',
      '$\\sqrt{25} = 5$ är exakt — problemet är teckenvalet, inte beräkningen.',
      '$25 = 5^2$ är visst en jämn kvadrat — det är inte där felet ligger.',
      'Den gäller inte — andragradsekvationer har i regel två rötter.',
    ],
  },
  {
    question: 'Vilket tecken gäller mellan $x^3 = 27$ och $x = 3$?',
    choices: [
      '⟺ — båda hållen gäller eftersom tredjegradsrötter är entydiga',
      '⟹ åt höger men inte åt vänster',
      'Inget — påståendena saknar samband',
      '⟸ åt vänster men inte åt höger',
    ],
    correct: 0,
    why: [
      'Udda exponent ger exakt en reell lösning: $x^3 = 27$ har bara $x = 3$, och $x = 3$ ger förstås $x^3 = 27$. Båda hållen gäller.',
      'Även vänsterhållet gäller: $x = 3$ insatt ger $27 = 27$.',
      'Sambandet är direkt — ekvationen och dess entydiga lösning.',
      'Även högerhållet gäller — kubikroten ur 27 är entydigt 3.',
    ],
  },
],

'ma2c-4.4': [
  {
    question: 'Vad är skillnaden mellan ett axiom och en sats?',
    choices: [
      'Ett axiom gäller utan bevis, en sats är bevisad',
      'Ett axiom är bevisat, en sats gäller utan bevis',
      'De är samma sak',
      'Ett axiom gäller bara i geometri',
    ],
    correct: 0,
    why: [
      'Axiom är överenskomna grundsatser som bevisen vilar på; satser är påståenden som bevisats utifrån axiom, definitioner och tidigare satser.',
      'Precis tvärtom.',
      'Skillnaden är just bevisen — axiom kräver inga, satser kräver.',
      'Axiom finns i all matematik, t.ex. "varje heltal n följs av n + 1".',
    ],
  },
  {
    question: 'Vad avslutas ett utfört bevis med?',
    choices: [
      'v.s.b. eller v.s.v. (vilket skulle bevisas/visas)',
      'Q.E.D. är det enda tillåtna',
      'Ett utropstecken',
      'Svar: följt av ett tal',
    ],
    correct: 0,
    why: [
      'Ett bevis avslutas med v.s.b. ("vilket skulle bevisas") eller v.s.v. ("vilket skulle visas").',
      'Q.E.D. är den latinska motsvarigheten, men kursens konvention är v.s.b./v.s.v.',
      'Beviset markeras med en formell avslutning, inte skiljetecken.',
      '"Svar:" hör till beräkningsuppgifter — bevis avslutas med v.s.b./v.s.v.',
    ],
  },
  {
    question: 'Hur skrivs ett godtyckligt **udda** tal, om $k$ är ett heltal?',
    choices: [
      '$2k + 1$',
      '$2k$',
      '$k + 1$',
      '$3k$',
    ],
    correct: 0,
    why: [
      'Ett udda tal är ett jämnt tal plus 1: $2k + 1$.',
      '$2k$ är alltid jämnt (delbart med 2).',
      '$k + 1$ kan vara både jämnt och udda beroende på k.',
      '$3k$ växlar också paritet — t.ex. 3, 6, 9.',
    ],
  },
  {
    question: 'I ett bevis måste varje steg …',
    choices: [
      'motiveras utifrån axiom, definitioner eller tidigare kända satser',
      'testas med minst tre exempel',
      'innehålla en ekvation',
      'godkännas av en lärare',
    ],
    correct: 0,
    why: [
      'Det är det som gör resonemanget till ett bevis — inga luckor, varje steg vilar på något etablerat.',
      'Exempel illustrerar men bevisar inte — ett bevis ska täcka ALLA fall.',
      'Bevis kan föras i ord och geometri också — kravet är motiveringen, inte formen.',
      'Bevisets giltighet ligger i logiken, inte i ett godkännande.',
    ],
  },
  {
    question: 'Varför skrivs talen som $n$, $n + 1$, $n + 2$ när man bevisar något om tre på varandra följande heltal?',
    choices: [
      'För att beviset ska gälla ALLA sådana taltrippler, inte bara ett exempel',
      'För att det är kortare att skriva',
      'För att undvika negativa tal',
      'För att summan då alltid blir jämn',
    ],
    correct: 0,
    why: [
      'Variabeln n representerar vilket heltal som helst — det som visas för n, n+1, n+2 gäller därmed generellt. Ett exempel som 4, 5, 6 bevisar bara det fallet.',
      'Syftet är allmängiltighet, inte kortare skrivsätt.',
      'n får vara negativt — beviset gäller ändå.',
      'Summan 3n + 3 är delbar med 3, men jämnheten varierar med n.',
    ],
  },
],

'ma2c-4.5': [
  {
    question: 'Vad säger Pythagoras sats?',
    choices: [
      'I en rätvinklig triangel är summan av kateternas kvadrater lika med hypotenusans kvadrat',
      'I alla trianglar är summan av de två kortaste sidorna lika med den längsta',
      'Vinkelsumman i en rätvinklig triangel är 90°',
      'Hypotenusan är alltid dubbelt så lång som en katet',
    ],
    correct: 0,
    why: [
      '$a^2 + b^2 = c^2$ där a och b är kateter och c hypotenusan — och satsen gäller just rätvinkliga trianglar.',
      'Sidor adderas inte rakt av — det är KVADRATERNA som summeras, och bara i rätvinkliga trianglar.',
      'Vinkelsumman är 180° i alla trianglar.',
      'Förhållandet mellan hypotenusa och katet varierar — det är inget fast 2:1.',
    ],
  },
  {
    question: 'I en rätvinklig triangel är kateterna 3 och 4. Vad är hypotenusan?',
    choices: [
      '5',
      '7',
      '25',
      '$\\sqrt{7}$',
    ],
    correct: 0,
    why: [
      '$c^2 = 3^2 + 4^2 = 25$, så $c = 5$ — den klassiska 3-4-5-triangeln.',
      '7 är summan av kateterna — men det är kvadraterna som ska summeras, följt av roten.',
      '25 är $c^2$ — glöm inte att dra roten ur.',
      '$\\sqrt{7}$ fås om man adderar sidorna i stället för kvadraterna.',
    ],
  },
  {
    question: 'Varför skrivs lösningen $x = \\pm\\sqrt{144}$ men svaret blir bara 12?',
    choices: [
      'En sträcka kan inte vara negativ, så den negativa roten bortses',
      'Negativa tal saknar kvadratrot',
      '−12 är en felräkning',
      'Man väljer alltid det största talet',
    ],
    correct: 0,
    why: [
      'Ekvationen $x^2 = 144$ har matematiskt två rötter, men i geometrin är x en sidlängd — tolkningen sållar bort −12.',
      'Roten ur ett negativt tal saknas — men här är det roten som ger ± framför ett positivt resultat.',
      '−12 löser ekvationen korrekt — den förkastas av geometriska skäl, inte räknefel.',
      'Valet styrs av rimlighet (positiv längd), inte storlek.',
    ],
  },
  {
    question: 'Sidorna i en triangel är 6, 8 och 11. Är triangeln rätvinklig?',
    choices: [
      'Nej — $6^2 + 8^2 = 100$ men $11^2 = 121$',
      'Ja — $6 + 8 > 11$',
      'Ja — 6-8-triangeln är alltid rätvinklig',
      'Det kan inte avgöras utan vinklarna',
    ],
    correct: 0,
    why: [
      'Omvändningen av Pythagoras sats: likheten $a^2 + b^2 = c^2$ måste gälla. Här är $100 \\neq 121$, så ingen rät vinkel.',
      'Triangelolikheten avgör bara om triangeln EXISTERAR — inte om den är rätvinklig.',
      'Med hypotenusan 10 vore den rätvinklig — men här är längsta sidan 11.',
      'Pythagoras sats är en ekvivalens — sidorna räcker för att avgöra saken.',
    ],
  },
  {
    question: 'Pythagoras sats är en ekvivalens: $a^2 + b^2 = c^2 \\iff$ …',
    choices: [
      'triangeln är rätvinklig',
      'triangeln är likbent',
      'triangeln är liksidig',
      'triangeln har en trubbig vinkel',
    ],
    correct: 0,
    why: [
      'Sambandet gäller åt båda håll: rätvinklig triangel ger likheten, och likheten ger rätvinklig triangel.',
      'Likbenta trianglar handlar om två lika sidor — inget kvadratsamband.',
      'Liksidiga trianglar har alla vinklar 60° — ingen rät vinkel alls.',
      'Trubbvinkliga trianglar har tvärtom $a^2 + b^2 < c^2$.',
    ],
  },
],

'ma2c-4.6': [
  {
    question: 'Vad beräknar avståndsformeln $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$?',
    choices: [
      'Avståndet mellan två punkter i ett koordinatsystem',
      'Mittpunkten mellan två punkter',
      'Lutningen mellan två punkter',
      'Arean av triangeln mellan punkterna',
    ],
    correct: 0,
    why: [
      'Formeln är Pythagoras sats på koordinatform: kateterna är skillnaderna i x- respektive y-led och d är hypotenusan.',
      'Mittpunkten fås av medelvärdena, inte av rötter och kvadrater.',
      'Lutningen är kvoten Δy/Δx — utan kvadrater.',
      'Formeln ger en sträcka, inte en area.',
    ],
  },
  {
    question: 'Hur lyder mittpunktsformeln?',
    choices: [
      '$(x_m, y_m) = \\left(\\frac{x_1 + x_2}{2},\\ \\frac{y_1 + y_2}{2}\\right)$',
      '$(x_m, y_m) = (x_2 - x_1,\\ y_2 - y_1)$',
      '$(x_m, y_m) = \\left(\\frac{x_1 + y_1}{2},\\ \\frac{x_2 + y_2}{2}\\right)$',
      '$(x_m, y_m) = (x_1 \\cdot x_2,\\ y_1 \\cdot y_2)$',
    ],
    correct: 0,
    why: [
      'Mittpunkten ligger mitt emellan — medelvärdet av x-koordinaterna och medelvärdet av y-koordinaterna.',
      'Skillnaderna ger förflyttningen mellan punkterna, inte mitten.',
      'x- och y-koordinater får inte blandas — medelvärdena tas ledvis.',
      'Multiplikation har inget med mittpunkter att göra.',
    ],
  },
  {
    question: 'Vilka kateter har den rätvinkliga triangel som avståndsformeln bygger på?',
    choices: [
      'Den vågräta sträckan $(x_2 - x_1)$ och den lodräta sträckan $(y_2 - y_1)$',
      'De två koordinataxlarna',
      'Avståndet d och mittpunkten',
      'Två radier i en cirkel',
    ],
    correct: 0,
    why: [
      'Mellan punkterna bildas en triangel med en vågrät och en lodrät katet — avståndet är hypotenusan, och Pythagoras sats ger formeln.',
      'Axlarna är referenslinjer — kateterna är sträckorna mellan punkternas koordinater.',
      'd är hypotenusan och mittpunkten är en punkt — inte en katet.',
      'Radier hör till cirkelgeometrin, inte avståndsformeln.',
    ],
  },
  {
    question: 'Bestäm avståndet mellan (0, 0) och (6, 8).',
    choices: [
      '10 l.e.',
      '14 l.e.',
      '100 l.e.',
      '48 l.e.',
    ],
    correct: 0,
    why: [
      '$d = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$.',
      '14 är summan av koordinaterna — kvadrera, addera och dra roten ur i stället.',
      '100 är $d^2$ — roten saknas.',
      '48 är produkten 6 · 8 — fel operation.',
    ],
  },
  {
    question: 'Mittpunkten mellan (−4, 6) och (2, −2) är …',
    choices: [
      '(−1, 2)',
      '(−2, 4)',
      '(−6, 8)',
      '(1, −2)',
    ],
    correct: 0,
    why: [
      'Medelvärden: $\\frac{-4 + 2}{2} = -1$ och $\\frac{6 + (-2)}{2} = 2$.',
      '(−2, 4) är halva den första punkten — båda punkterna ska medelvärdesbildas.',
      '(−6, 8) är skillnaden mellan punkterna, inte mitten.',
      'Teckenfel — kontrollera medelvärdena: −1 och +2.',
    ],
  },
],

'ma2c-4.7': [
  {
    question: 'Två månghörningar är **likformiga**. Vad betyder det?',
    choices: [
      'De har samma form — motsvarande vinklar lika och sidförhållanden lika — men kan vara olika stora',
      'De är exakt lika stora',
      'De har samma omkrets',
      'De har minst en gemensam sida',
    ],
    correct: 0,
    why: [
      'Likformighet = samma form: figurerna kan vara olika stora, vridna och spegelvända, men vinklar och sidförhållanden stämmer.',
      'Lika stora OCH likformiga = kongruenta — det är ett starkare krav.',
      'Omkretsen skiljer i regel (skalfaktorn gånger) — det är formen som ska stämma.',
      'Figurerna behöver inte röra varandra alls.',
    ],
  },
  {
    question: 'Varför räcker det inte att kontrollera vinklarna för fyrhörningar?',
    choices: [
      'Figurer med lika vinklar kan ha olika proportioner — t.ex. en kvadrat och en avlång rektangel',
      'Vinklarna går inte att mäta i fyrhörningar',
      'Det räcker visst — vinklar räcker alltid',
      'Fyrhörningar saknar motsvarande vinklar',
    ],
    correct: 0,
    why: [
      'Kvadraten och den avlånga rektangeln har båda fyra räta vinklar men helt olika form — sidförhållandena måste också kontrolleras.',
      'Vinklar mäts likadant i alla månghörningar.',
      'Bara för trianglar räcker ett villkor.',
      'Motsvarande vinklar identifieras hörn för hörn precis som i trianglar.',
    ],
  },
  {
    question: 'Vad är en **skalfaktor**?',
    choices: [
      'Kvoten mellan två motsvarande sidor — hur många gånger större den ena figuren är',
      'Skillnaden mellan två motsvarande sidor',
      'Summan av alla sidförhållanden',
      'Antalet hörn i månghörningen',
    ],
    correct: 0,
    why: [
      'Skalfaktorn fås genom att dividera motsvarande sidor, t.ex. 24/8 = 3 — alla sidor i den större figuren är 3 gånger längre.',
      'Skillnaden varierar från sida till sida — det är KVOTEN som är konstant.',
      'Ett enda sidpar räcker — kvoten är samma för alla par.',
      'Hörnantalet måste vara lika för likformighet, men det är inte skalfaktorn.',
    ],
  },
  {
    question: 'Två likformiga figurer har skalfaktorn 3. Sidan 5 cm i den lilla motsvaras i den stora av …',
    choices: [
      '15 cm',
      '8 cm',
      '5 cm',
      '45 cm',
    ],
    correct: 0,
    why: [
      'Motsvarande sida = 5 · 3 = 15 cm.',
      '8 = 5 + 3 — skalfaktorn multipliceras, adderas inte.',
      'Sidorna är lika bara om skalfaktorn är 1.',
      '45 = 5 · 9 — det vore skalfaktorn 3 använd två gånger (det gäller AREOR, inte sidor).',
    ],
  },
  {
    question: 'Sidan $x$ i den stora figuren motsvarar sidan 5 i den lilla, och sidparet 24 och 8 är känt. Vilken ekvation ger $x$?',
    choices: [
      '$\\dfrac{x}{5} = \\dfrac{24}{8}$',
      '$\\dfrac{x}{24} = \\dfrac{8}{5}$',
      '$x \\cdot 5 = 24 \\cdot 8$',
      '$x - 5 = 24 - 8$',
    ],
    correct: 0,
    why: [
      'Motsvarande sidor har samma förhållande: stor/liten = stor/liten, dvs. x/5 = 24/8, vilket ger x = 15.',
      'Paren har blandats — x hör ihop med 5 och 24 hör ihop med 8.',
      'Produkter av sidor hör till kordasatsen — likformighet bygger på kvoter.',
      'Skillnader bevaras inte vid skalning — kvoterna gör det.',
    ],
  },
],

'ma2c-4.8': [
  {
    question: 'Vad betyder $\\triangle ABC \\sim \\triangle DEF$?',
    choices: [
      'Triangeln ABC är likformig med triangeln DEF',
      'Triangeln ABC är kongruent med triangeln DEF',
      'Trianglarna har samma area',
      'Trianglarna är rätvinkliga',
    ],
    correct: 0,
    why: [
      'Tecknet ~ utläses "är likformig med".',
      'Kongruens skrivs med ≅.',
      'Likformighet handlar om form — arean skiljer med skalfaktorn i kvadrat.',
      'Likformighet säger inget om räta vinklar.',
    ],
  },
  {
    question: 'Varför räcker det att TVÅ vinklar är lika för att två trianglar ska vara likformiga?',
    choices: [
      'Den tredje vinkeln är automatiskt lika, på grund av vinkelsumman 180°',
      'Två vinklar räcker inte — alla tre måste kontrolleras',
      'För att trianglar alltid har en rät vinkel',
      'För att sidorna då är lika långa',
    ],
    correct: 0,
    why: [
      'Om två vinklar stämmer måste den tredje också stämma: 180° minus samma två tal ger samma rest.',
      'Jo — den tredje följer gratis av vinkelsumman.',
      'Trianglar behöver inte ha någon rät vinkel.',
      'Likformighet kräver inte lika sidor — bara lika form.',
    ],
  },
  {
    question: 'Vilket villkor räcker för att två trianglar ska vara likformiga?',
    choices: [
      'Motsvarande vinklar lika ELLER sidförhållanden lika — ett av dem räcker',
      'Både vinklar och sidförhållanden måste kontrolleras',
      'Trianglarna måste vara lika stora',
      'Trianglarna får inte vara spegelvända',
    ],
    correct: 0,
    why: [
      'Till skillnad från andra månghörningar räcker ETT villkor för trianglar.',
      'Det gäller månghörningar med fler än tre hörn.',
      'Storlek är irrelevant för likformighet.',
      'Likformiga figurer får vara spegelvända.',
    ],
  },
  {
    question: 'Alva (1,60 m) har skuggan 1,20 m samtidigt som flaggstångens skugga är 6,75 m. Varför är trianglarna likformiga?',
    choices: [
      'Solens strålar ger samma vinkel i båda trianglar, och båda har en rät vinkel mot marken — två lika vinklar',
      'För att Alva står bredvid flaggstången',
      'För att skuggorna är olika långa',
      'De är inte likformiga — bara kongruenta',
    ],
    correct: 0,
    why: [
      'Samma solvinkel + rät vinkel = två lika vinklar i båda trianglar — det räcker för likformighet, och sidförhållandena ger höjden 9,00 m.',
      'Platsen spelar ingen roll — det är vinklarna som avgör.',
      'Olika skugglängder är själva poängen (olika storlek) — likformigheten kommer från vinklarna.',
      'Kongruens skulle kräva samma storlek — trianglarna är olika stora men likformiga.',
    ],
  },
  {
    question: 'Två likformiga trianglar har sidförhållandet 0,6. En sida i den stora är 7,5 cm. Motsvarande sida i den lilla är …',
    choices: [
      '4,5 cm',
      '12,5 cm',
      '6,9 cm',
      '8,1 cm',
    ],
    correct: 0,
    why: [
      'Liten/stor = 0,6 ger liten sida = 7,5 · 0,6 = 4,5 cm.',
      '12,5 = 7,5/0,6 — det vore att gå åt fel håll (förstora i stället för förminska).',
      '6,9 = 7,5 − 0,6 — förhållandet multipliceras, subtraheras inte.',
      '8,1 = 7,5 + 0,6 — förhållandet är en faktor, inte ett tillägg.',
    ],
  },
],

'ma2c-4.9': [
  {
    question: 'Vad säger **topptriangelsatsen**?',
    choices: [
      'En parallelltransversal bildar en topptriangel som är likformig med hela triangeln',
      'Toppvinkeln i en triangel är alltid störst',
      'En transversal delar triangelns sidor i olika förhållanden',
      'Topptriangeln är alltid hälften av hela triangeln',
    ],
    correct: 0,
    why: [
      'Parallelltransversalen skapar en mindre triangel med samma vinklar (gemensam toppvinkel + likbelägna vinklar) — likformig med originalet.',
      'Toppvinkelns storlek beror på triangeln — satsen handlar om likformighet.',
      'Tvärtom — transversalsatsen säger att sidorna delas i SAMMA förhållande.',
      'Storleksförhållandet beror på var transversalen dras.',
    ],
  },
  {
    question: 'Vad säger **transversalsatsen**?',
    choices: [
      'En parallelltransversal delar triangelns sidor i samma förhållande: $\\frac{a}{b} = \\frac{c}{d}$',
      'Transversalen är alltid parallell med basen',
      'Transversalen delar triangeln i två lika stora delar',
      'Sidorna delas i förhållandet 1:2',
    ],
    correct: 0,
    why: [
      'Sidodelarna ovanför transversalen förhåller sig till delarna nedanför på samma sätt på båda sidor.',
      'Satsen FÖRUTSÄTTER att transversalen är parallell med basen — det är inte slutsatsen.',
      'Areadelningen beror på var transversalen ligger.',
      'Förhållandet kan vara vilket som helst — poängen är att det är SAMMA på båda sidor.',
    ],
  },
  {
    question: 'När måste topptriangelsatsen användas i stället för transversalsatsen?',
    choices: [
      'När topptriangelns bas (transversalen) eller hela basen ingår i beräkningen',
      'Alltid — transversalsatsen är bara en gissning',
      'När triangeln är rätvinklig',
      'När sidorna är lika långa',
    ],
    correct: 0,
    why: [
      'Transversalsatsen jämför bara sidornas DELAR. Så fort baserna (DE eller BC) ingår krävs topptriangelsatsen som jämför hela sidor och baser.',
      'Båda är bevisade satser — tumregeln är att välja transversalsatsen när det går, för enklare räkning.',
      'Rätvinklighet påverkar inte valet av sats.',
      'Sidolängderna avgör inte metodvalet — det gör frågan om baserna används.',
    ],
  },
  {
    question: 'Vad säger **bisektrissatsen**?',
    choices: [
      'Bisektrisen delar motstående sida i samma förhållande som de två närliggande sidorna',
      'Bisektrisen delar motstående sida mitt itu',
      'Bisektrisen är alltid vinkelrät mot motstående sida',
      'Bisektrisen delar triangeln i två kongruenta delar',
    ],
    correct: 0,
    why: [
      'Delarna på motstående sida förhåller sig som de närliggande sidorna: $\\frac{AD}{BD} = \\frac{AC}{BC}$.',
      'Mitt itu blir det bara om de närliggande sidorna är lika långa (likbent triangel).',
      'Vinkelräthet gäller höjden, inte bisektrisen.',
      'Delarna är kongruenta bara i specialfall — satsen handlar om förhållanden.',
    ],
  },
  {
    question: 'En parallelltransversal delar sidorna så att $\\frac{a}{b} = \\frac{c}{d}$ med $a = 4$, $b = 8$ och $c = 5$. Vad är $d$?',
    choices: [
      '10',
      '9',
      '2,5',
      '40',
    ],
    correct: 0,
    why: [
      '$\\frac{4}{8} = \\frac{5}{d}$ ger $4d = 40$, dvs. $d = 10$.',
      '9 = 8 + 1 — förhållandet är multiplikativt, inte additivt.',
      '2,5 fås om förhållandet vänds åt fel håll — d ska vara STÖRRE än c precis som b är större än a.',
      '40 är korsprodukten $4d$ — dividera med 4 för att få d.',
    ],
  },
],

'ma2c-4.10': [
  {
    question: 'Vad krävs för att två figurer ska vara **kongruenta**?',
    choices: [
      'De är likformiga och lika stora',
      'De är likformiga — storleken spelar ingen roll',
      'De har samma omkrets',
      'De har samma antal hörn',
    ],
    correct: 0,
    why: [
      'Kongruens = likformighet + samma storlek. Tecknet är ≅.',
      'Utan storlekskravet är det bara likformighet (~).',
      'Samma omkrets kan två helt olika figurer ha.',
      'Hörnantalet är nödvändigt men långt ifrån tillräckligt.',
    ],
  },
  {
    question: 'Vilket av följande är ett giltigt kongruensvillkor för trianglar?',
    choices: [
      'SSS — alla tre sidorna överensstämmer',
      'VVV — alla tre vinklarna överensstämmer',
      'SSV — två sidor och en icke-mellanliggande vinkel',
      'Omkretsen överensstämmer',
    ],
    correct: 0,
    why: [
      'SSS är ett av de tre villkoren (tillsammans med SVS och VSV) — tre lika sidor låser triangeln helt.',
      'VVV ger bara likformighet — en stor och en liten triangel kan ha samma vinklar.',
      'SSV är inte giltigt — den tredje sidan kan "fällas" åt två håll och ge två olika trianglar.',
      'Samma omkrets kan uppnås med helt olika trianglar.',
    ],
  },
  {
    question: 'I villkoret SVS — var måste vinkeln sitta?',
    choices: [
      'Mellan de två sidorna (mellanliggande)',
      'Var som helst i triangeln',
      'Mitt emot den längsta sidan',
      'Vid basen',
    ],
    correct: 0,
    why: [
      'Sida-VINKEL-sida: vinkeln kläms mellan de två kända sidorna — då är triangeln entydigt bestämd.',
      'Med en annan vinkel (SSV) är triangeln inte entydig — villkoret faller.',
      'Positionen relativt längsta sidan är irrelevant — det är läget mellan de kända sidorna som räknas.',
      '"Basen" är bara ett ritval — villkoret handlar om de två givna sidorna.',
    ],
  },
  {
    question: 'Två trianglar är kongruenta enligt SSS. Sidan med två tvärstreck i den ena är 32 cm. Vad gäller i den andra?',
    choices: [
      'Sidan med två tvärstreck är också 32 cm',
      'Sidan med ett tvärstreck är 32 cm',
      'Alla sidor är 32 cm',
      'Ingen slutsats kan dras',
    ],
    correct: 0,
    why: [
      'Lika många tvärstreck markerar motsvarande sidor — i kongruenta trianglar är motsvarande sidor exakt lika långa.',
      'Ett tvärstreck markerar ett ANNAT sidopar — de kan ha en annan längd.',
      'Bara motsvarande sida är 32 cm — de andra har sina egna längder.',
      'Kongruensen ger precis denna slutsats — motsvarande delar är lika.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan tecknen ~ och ≅?',
    choices: [
      '~ betyder likformig, ≅ betyder kongruent (likformig OCH lika stor)',
      '≅ betyder likformig, ~ betyder kongruent',
      'De betyder samma sak',
      '~ används för vinklar och ≅ för sidor',
    ],
    correct: 0,
    why: [
      '~ = samma form; ≅ = samma form och samma storlek. Kongruens är det starkare kravet.',
      'Precis tvärtom.',
      'Skillnaden är storlekskravet — kongruens kräver lika stora figurer.',
      'Båda tecknen relaterar hela figurer, inte enskilda delar.',
    ],
  },
],

'ma2c-4.11': [
  {
    question: 'Vad är en **randvinkel**?',
    choices: [
      'En vinkel med spetsen på cirkelns rand',
      'En vinkel med spetsen i cirkelns medelpunkt',
      'Vinkeln mellan en tangent och en radie',
      'En vinkel som är större än 180°',
    ],
    correct: 0,
    why: [
      'Randvinkelns spets ligger på randen (cirkelkanten) och dess ben står på en cirkelbåge.',
      'Det är en medelpunktsvinkel.',
      'Tangent mot radie är alltid 90° — ett specialfall, men inte definitionen av randvinkel.',
      'Vinkelns storlek ingår inte i definitionen — läget för spetsen gör det.',
    ],
  },
  {
    question: 'Vad säger randvinkelsatsen?',
    choices: [
      'Medelpunktsvinkeln är dubbelt så stor som randvinkeln på samma cirkelbåge',
      'Randvinkeln är dubbelt så stor som medelpunktsvinkeln',
      'Alla randvinklar är 90°',
      'Randvinkeln är lika stor som cirkelbågen',
    ],
    correct: 0,
    why: [
      '$y = 2x$ — medelpunktsvinkeln (y) är dubbla randvinkeln (x) när de står på samma båge.',
      'Förhållandet är omvänt — medelpunktsvinkeln är störst.',
      '90° gäller bara randvinklar på en halvcirkelbåge.',
      'Vinkel och båglängd är olika storheter — satsen jämför två vinklar.',
    ],
  },
  {
    question: 'Två randvinklar står på samma cirkelbåge. Vad gäller?',
    choices: [
      'De är lika stora',
      'De är tillsammans 180°',
      'Den ena är dubbelt så stor',
      'De är tillsammans 90°',
    ],
    correct: 0,
    why: [
      'Följdsats: båda är hälften av samma medelpunktsvinkel — alltså lika stora, oavsett var på randen spetsarna sitter.',
      '180°-summan gäller motstående vinklar i en inskriven fyrhörning.',
      'Dubbelt gäller mellan MEDELPUNKTSvinkeln och randvinkeln.',
      'Ingen sådan summa — vinklarna är helt enkelt lika.',
    ],
  },
  {
    question: 'En triangel bildas av två radier och en korda. Vad vet man säkert om triangeln?',
    choices: [
      'Den är likbent — två sidor är radier och därmed lika långa',
      'Den är rätvinklig',
      'Den är liksidig',
      'Ingenting särskilt',
    ],
    correct: 0,
    why: [
      'Alla radier i en cirkel är lika långa — triangeln får två lika ben och därmed lika basvinklar.',
      'Rätvinklig blir den bara i specialfall (t.ex. randvinkel på halvcirkelbåge).',
      'Liksidig kräver att även kordan råkar vara lika lång som radien.',
      'Jo — radiernas lika längd ger alltid en likbent triangel.',
    ],
  },
  {
    question: 'Vilken vinkel bildar en tangent med radien till tangeringspunkten?',
    choices: [
      'Alltid 90°',
      'Alltid 45°',
      'Det beror på cirkelns storlek',
      'Alltid 180°',
    ],
    correct: 0,
    why: [
      'Tangenten rör cirkeln i exakt en punkt och står alltid vinkelrätt mot radien dit — motiveras (tangent mot radie).',
      '45° har ingen särställning här.',
      'Vinkeln är 90° oavsett cirkelns radie.',
      '180° skulle betyda att tangenten sammanfaller med radiens förlängning — då skure den cirkeln.',
    ],
  },
],

'ma2c-4.12': [
  {
    question: 'Vad är en **korda**?',
    choices: [
      'En sträcka mellan två punkter på cirkelns rand',
      'En linje som rör cirkeln i exakt en punkt',
      'En sträcka från medelpunkten till randen',
      'En vinkel i cirkeln',
    ],
    correct: 0,
    why: [
      'Kordan förbinder två randpunkter — diametern är den längsta kordan.',
      'Det är en tangent.',
      'Det är en radie.',
      'En korda är en sträcka, inte en vinkel.',
    ],
  },
  {
    question: 'Två kordor skär varandra i delarna $a, b$ respektive $c, d$. Vad säger kordasatsen?',
    choices: [
      '$a \\cdot b = c \\cdot d$',
      '$a + b = c + d$',
      '$\\frac{a}{b} = \\frac{c}{d}$',
      '$a - b = c - d$',
    ],
    correct: 0,
    why: [
      'Produkterna av respektive kordas delsträckor är lika — det följer av likformiga trianglar via randvinklar och vertikalvinklar.',
      'Summorna (kordornas längder) är i regel olika.',
      'Kvotformen hör till transversalsatsen — kordasatsen använder produkter.',
      'Skillnaderna har inget samband.',
    ],
  },
  {
    question: 'Vilka satser används i beviset av kordasatsen?',
    choices: [
      'Randvinklar på samma båge och vertikalvinklar ger likformiga trianglar',
      'Pythagoras sats och avståndsformeln',
      'Kvadreringsreglerna',
      'Bisektrissatsen',
    ],
    correct: 0,
    why: [
      'Hjälpsträckorna skapar två trianglar med lika vinklar (randvinklar på samma båge + vertikalvinklar) — likformigheten ger sidförhållandet som korsmultipliceras.',
      'Inga räta vinklar behövs i beviset.',
      'Algebraiska regler för parenteser ingår inte.',
      'Bisektriser förekommer inte i kordasatsen.',
    ],
  },
  {
    question: 'Vad gäller för motstående vinklar i en **inskriven fyrhörning**?',
    choices: [
      'De är tillsammans 180°',
      'De är lika stora',
      'De är tillsammans 360°',
      'De är alltid räta',
    ],
    correct: 0,
    why: [
      'Motstående vinklar summerar till 180° — beviset använder randvinkelsatsen: medelpunktsvinklarna 2u + 2v utgör ett helt varv.',
      'Lika stora blir de bara i specialfall (t.ex. rektangel).',
      '360° är summan av ALLA fyra vinklar.',
      'Räta vinklar kräver att fyrhörningen är en rektangel.',
    ],
  },
  {
    question: 'I en inskriven fyrhörning är en vinkel 115°. Den motstående vinkeln är …',
    choices: [
      '65°',
      '115°',
      '245°',
      '75°',
    ],
    correct: 0,
    why: [
      '$180° - 115° = 65°$ (motstående vinklar i inskriven fyrhörning).',
      'Lika vinklar gäller inte i allmänhet — summan ska bli 180°.',
      '245° skulle ge summan 360° — det är hela fyrhörningens vinkelsumma som är 360°, inte parets.',
      '75° ger summan 190° — kontrollera subtraktionen: 180 − 115 = 65.',
    ],
  },
],

'ma2c-5.1': [
  {
    question: 'Vad skiljer en potensekvation från en exponentialekvation?',
    choices: [
      'I potensekvationen är variabeln i basen, i exponentialekvationen i exponenten',
      'I potensekvationen är variabeln i exponenten, i exponentialekvationen i basen',
      'Potensekvationer har alltid två lösningar',
      'De är samma sak',
    ],
    correct: 0,
    why: [
      'Potensekvation: $x^7 = 860$ (x i basen). Exponentialekvation: $2^x = 37$ (x i exponenten).',
      'Precis tvärtom.',
      'Antalet lösningar beror på exponentens paritet — jämn ger två, udda ger en.',
      'Skillnaden i variabelns placering avgör vilken lösningsmetod som fungerar.',
    ],
  },
  {
    question: 'Hur löses potensekvationen $x^7 = 860$ algebraiskt?',
    choices: [
      'Upphöj båda led till $\\frac{1}{7}$ eller dra sjunde roten ur',
      'Logaritmera båda led och dividera med 7',
      'Dividera båda led med 7',
      'Den kan bara lösas grafiskt',
    ],
    correct: 0,
    why: [
      '$x = 860^{1/7} = \\sqrt[7]{860} \\approx 2{,}63$ — potenslagar eller rotuttryck.',
      'Logaritmering är metoden för EXPONENTIALEKVATIONER — här sitter variabeln i basen.',
      'Exponenten 7 är ingen faktor — division hjälper inte.',
      'Potensekvationer har en direkt algebraisk lösning.',
    ],
  },
  {
    question: 'Varför löses exponentialekvationen $50\\,000 = 12\\,000 \\cdot 1{,}176^x$ grafiskt i detta avsnitt?',
    choices: [
      'Vi har ännu ingen algebraisk metod för variabler i exponenten — logaritmerna kommer i nästa avsnitt',
      'Exponentialekvationer kan aldrig lösas algebraiskt',
      'Grafisk lösning är alltid exaktare',
      'Räknaren saknar potensknapp',
    ],
    correct: 0,
    why: [
      'Utan logaritmer finns inget verktyg för att "ta ner" x ur exponenten — därför skärningsmetoden. Tiologaritmerna (nästa avsnitt) ger sedan den algebraiska vägen.',
      'Med logaritmer går det utmärkt algebraiskt.',
      'Grafisk avläsning är tvärtom ungefärlig.',
      'Räknarens funktioner räcker — det är metoden som saknas så här långt.',
    ],
  },
  {
    question: 'Vad står $C$ för i modellen $y = C \\cdot a^x$?',
    choices: [
      'Det ursprungliga värdet (startvärdet)',
      'Förändringsfaktorn',
      'Tiden',
      'Det nya värdet',
    ],
    correct: 0,
    why: [
      'C är värdet vid start ($x = 0$ ger $y = C \\cdot a^0 = C$).',
      'Förändringsfaktorn är a.',
      'Tiden (antalet förändringar) är x.',
      'Nya värdet är y.',
    ],
  },
  {
    question: 'Aktier köps för 12 000 kr och säljs 5 år senare för 27 000 kr. Vilken ekvation ger den årliga förändringsfaktorn?',
    choices: [
      '$27\\,000 = 12\\,000 \\cdot a^5$',
      '$27\\,000 = 12\\,000 \\cdot 5a$',
      '$27\\,000 = 12\\,000 + a^5$',
      '$12\\,000 = 27\\,000 \\cdot a^5$',
    ],
    correct: 0,
    why: [
      'Modellen y = C·aˣ med y = 27 000, C = 12 000 och x = 5 — potensekvationen ger a = 2,25^(1/5) ≈ 1,176.',
      '5a beskriver LINJÄR förändring — procentuell förändring är multiplikativ, a^5.',
      'Förändringsfaktorn multipliceras med startvärdet, adderas inte.',
      'Start- och slutvärde har bytt plats — då blir a en minskning.',
    ],
  },
],

'ma2c-5.2': [
  {
    question: 'Vad betyder $\\lg 100$?',
    choices: [
      '"Det tal som 10 ska upphöjas till för att bli 100" — alltså 2',
      '"100 delat med 10" — alltså 10',
      '"Roten ur 100" — alltså 10',
      '"10 upphöjt till 100"',
    ],
    correct: 0,
    why: [
      'Tiologaritmen är tians exponent: $10^2 = 100$ ger $\\lg 100 = 2$.',
      'Logaritm är inte division — det är en exponentfråga.',
      'Roten ur är upphöjt till en halv — en annan operation.',
      'Det vore $10^{100}$ — logaritmen frågar efter exponenten, inte potensen.',
    ],
  },
  {
    question: 'Vad är $\\lg 1$?',
    choices: [
      '0',
      '1',
      '10',
      'Odefinierat',
    ],
    correct: 0,
    why: [
      '$10^0 = 1$, så $\\lg 1 = 0$.',
      '$10^1 = 10$, inte 1.',
      '10 är basen, inte logaritmen.',
      '$\\lg 1$ är väldefinierat — det är logaritmer av tal ≤ 0 som saknas.',
    ],
  },
  {
    question: 'Varför måste talet man tar logaritmen av vara **större än 0**?',
    choices: [
      '10 upphöjt till något kan aldrig bli 0 eller negativt',
      'Räknaren klarar inte negativa tal',
      'Logaritmer är alltid positiva',
      'Det är en godtycklig regel',
    ],
    correct: 0,
    why: [
      'Hur liten exponenten än blir ($10^{-6} = 0{,}000\\,001$) är potensen alltid positiv — det finns ingen exponent som ger 0 eller minus.',
      'Begränsningen är matematisk, inte teknisk.',
      'Logaritmen SJÄLV kan vara negativ (lg 0,01 = −2) — det är talet man loggar som måste vara positivt.',
      'Regeln följer direkt av tiopotensernas egenskaper.',
    ],
  },
  {
    question: 'Utan räknare: mellan vilka heltal ligger $\\lg 42$, och varför?',
    choices: [
      'Mellan 1 och 2, eftersom $10^1 = 10 < 42 < 100 = 10^2$',
      'Mellan 4 och 5, eftersom 42 börjar på 4',
      'Mellan 2 och 3, eftersom 42 har två siffror och en till',
      'Exakt 4,2',
    ],
    correct: 0,
    why: [
      'Kläm in talet mellan två tiopotenser: 10 är för litet, 100 för stort — exponenten ligger mellan 1 och 2 (räknaren ger 1,62).',
      'Första siffran styr inte tiopotensen.',
      'Nästan rätt tanke — ett tal med två siffror ligger mellan $10^1$ och $10^2$, alltså logaritm mellan 1 och 2.',
      'lg 42 är irrationellt, ungefär 1,62 — inte 4,2.',
    ],
  },
  {
    question: 'Vad är $10^{\\lg a}$ (för $a > 0$)?',
    choices: [
      '$a$',
      '$\\lg a$',
      '$10a$',
      '$1$',
    ],
    correct: 0,
    why: [
      'lg a är precis den exponent som gör att 10-potensen blir a — alltså $10^{\\lg a} = a$. Sambandet används för att skriva tal med basen 10.',
      'lg a är exponenten — potensen blir talet självt.',
      'Ingen multiplikation med 10 sker.',
      '$10^0 = 1$ kräver att exponenten är 0, dvs. a = 1 — inte allmänt.',
    ],
  },
],

'ma2c-5.3': [
  {
    question: 'Vilket är första steget när $2^x = 37$ löses med tiologaritmer?',
    choices: [
      'Skriv om båda led med basen 10: $(10^{\\lg 2})^x = 10^{\\lg 37}$',
      'Dividera båda led med 2',
      'Dra roten ur båda led',
      'Sätt $x = 37 - 2$',
    ],
    correct: 0,
    why: [
      'Med båda led som tiopotenser kan potenslagarna användas och exponenterna sättas lika: $x \\cdot \\lg 2 = \\lg 37$.',
      'Division tar bort EN faktor 2 — men x anger hur många de är.',
      'Rotdragning hjälper när variabeln är i basen, inte i exponenten.',
      'Subtraktion har inget med potenser att göra.',
    ],
  },
  {
    question: 'Varför får man sätta exponenterna lika i $10^{x \\cdot \\lg 2} = 10^{\\lg 37}$?',
    choices: [
      'Två lika potenser med samma bas måste ha lika exponenter',
      'Man får alltid stryka det som ser likadant ut',
      'För att 10 är ett jämnt tal',
      'Det är en avrundning',
    ],
    correct: 0,
    why: [
      'Funktionen $10^t$ antar varje värde exakt en gång — är potenserna lika måste exponenterna vara det.',
      'Strykningen är giltig just för att basen är densamma — inte en allmän regel.',
      'Basens paritet är irrelevant — principen gäller alla baser större än 0 (utom 1).',
      'Steget är exakt, ingen avrundning.',
    ],
  },
  {
    question: 'Vad är en **logaritmekvation**?',
    choices: [
      'En ekvation där variabeln finns i logaritmen, t.ex. $\\lg x = 3$',
      'En ekvation där variabeln är i exponenten',
      'En ekvation som saknar lösning',
      'En ekvation med två variabler',
    ],
    correct: 0,
    why: [
      'Variabeln står inuti logaritmen — ekvationen löses genom omskrivning till potensform: $x = 10^3$.',
      'Det är en exponentialekvation.',
      'Logaritmekvationer har ofta en lösning — t.ex. x = 1 000.',
      'Antalet variabler har inget med namnet att göra.',
    ],
  },
  {
    question: 'Skriv om $\\lg x = 2{,}5$ till potensform.',
    choices: [
      '$x = 10^{2{,}5}$',
      '$x = 2{,}5^{10}$',
      '$10^x = 2{,}5$',
      '$x = \\lg 2{,}5$',
    ],
    correct: 0,
    why: [
      '"10 upphöjt till det som står i högra ledet ska bli det vi har logaritmen för": $10^{2{,}5} = x \\approx 316$.',
      'Bas och exponent har bytt plats.',
      'Det är en annan ekvation — där är x exponenten.',
      'Det tar logaritmen en gång till i stället för att invertera den.',
    ],
  },
  {
    question: 'Lösningen till $10^x = 53$ är …',
    choices: [
      '$x = \\lg 53 \\approx 1{,}72$',
      '$x = 5{,}3$',
      '$x = \\frac{53}{10}$',
      '$x = 10^{53}$',
    ],
    correct: 0,
    why: [
      'Direkt från definitionen: exponenten som gör 10-potensen till 53 är lg 53 ≈ 1,72 (rimligt — mellan 1 och 2).',
      '5,3 är 53/10 — logaritmen är ingen division.',
      'Samma felslut — exponenten söks, inte kvoten.',
      'Det är potensen av 53, inte exponenten för 53.',
    ],
  },
],

'ma2c-5.4': [
  {
    question: 'Vad säger **första** logaritmlagen?',
    choices: [
      '$\\lg x + \\lg y = \\lg xy$',
      '$\\lg x + \\lg y = \\lg(x + y)$',
      '$\\lg x \\cdot \\lg y = \\lg xy$',
      '$\\lg x + \\lg y = \\lg x^y$',
    ],
    correct: 0,
    why: [
      'Summan av logaritmer är logaritmen av PRODUKTEN — t.ex. lg 25 + lg 4 = lg 100 = 2.',
      'Klassisk fälla: logaritmen av en summa kan INTE delas upp.',
      'Det är summan av logaritmerna, inte produkten av dem, som ger lg xy.',
      'Exponentform hör till tredje lagen.',
    ],
  },
  {
    question: 'Vad säger **andra** logaritmlagen?',
    choices: [
      '$\\lg x - \\lg y = \\lg \\frac{x}{y}$',
      '$\\lg x - \\lg y = \\lg(x - y)$',
      '$\\frac{\\lg x}{\\lg y} = \\lg \\frac{x}{y}$',
      '$\\lg x - \\lg y = \\frac{x}{y}$',
    ],
    correct: 0,
    why: [
      'Differensen av logaritmer är logaritmen av KVOTEN — t.ex. lg 3 000 − lg 3 = lg 1 000 = 3.',
      'Logaritmen av en differens kan inte delas upp.',
      'Kvoten av två logaritmer är något annat än logaritmen av kvoten.',
      'Resultatet är en logaritm, inte kvoten själv.',
    ],
  },
  {
    question: 'Vad säger **tredje** logaritmlagen?',
    choices: [
      '$\\lg x^p = p \\cdot \\lg x$',
      '$\\lg x^p = (\\lg x)^p$',
      '$\\lg x^p = p + \\lg x$',
      '$\\lg x^p = \\lg px$',
    ],
    correct: 0,
    why: [
      'Exponenten kan multipliceras ner framför logaritmen — nyckeln till att lösa exponentialekvationer algebraiskt.',
      'Exponenten flyttas ner som FAKTOR — hela logaritmen upphöjs inte.',
      'Multiplikation, inte addition.',
      'p är exponent på x, inte en faktor inuti logaritmen.',
    ],
  },
  {
    question: 'Hur löses $5^x = 136$ med tredje logaritmlagen?',
    choices: [
      'Logaritmera båda led, multiplicera ner exponenten: $x = \\frac{\\lg 136}{\\lg 5}$',
      'Dividera båda led med 5: $x = \\frac{136}{5}$',
      'Ta $\\lg$ av vänsterledet enbart',
      '$x = \\lg 136 - \\lg 5$',
    ],
    correct: 0,
    why: [
      '$\\lg 5^x = \\lg 136$ ger $x \\cdot \\lg 5 = \\lg 136$, dvs. $x = \\lg 136 / \\lg 5 \\approx 3{,}05$.',
      'Division tar bort en faktor 5 — inte exponenten.',
      'En ekvation kräver samma operation på BÅDA led.',
      'Differensen $\\lg 136 - \\lg 5 = \\lg(136/5)$ — det är kvoten av logaritmerna som behövs, inte differensen.',
    ],
  },
  {
    question: 'I ekvationen $\\lg 100 = \\lg 2x$ — varför får logaritmfunktionen strykas?',
    choices: [
      'När en enda logaritm står i varje led måste innehållen vara lika: $100 = 2x$',
      'Logaritmer får alltid strykas var de än står',
      'För att 100 är en tiopotens',
      'Den får inte strykas',
    ],
    correct: 0,
    why: [
      'Logaritmfunktionen antar varje värde exakt en gång — lika logaritmer betyder lika tal. Sedan löses 100 = 2x som vanligt (x = 50).',
      'Först måste varje led vara skrivet som EN logaritm (via logaritmlagarna) — termvis strykning är fel.',
      'Strykningen fungerar för alla positiva innehåll, inte bara tiopotenser.',
      'Jo — det är precis så logaritmekvationer med flera termer avslutas.',
    ],
  },
],

'ma2c-5.5': [
  {
    question: 'Något ökar med 2,3 % per år. Vilken förändringsfaktor används i modellen $y = C \\cdot a^x$?',
    choices: [
      '$a = 1{,}023$',
      '$a = 0{,}023$',
      '$a = 2{,}3$',
      '$a = 1{,}23$',
    ],
    correct: 0,
    why: [
      'En ökning med 2,3 % betyder att hela värdet (100 %) plus 2,3 % finns kvar: faktorn är 1 + 0,023 = 1,023.',
      '0,023 är bara ökningsdelen — då försvinner 97,7 % av värdet varje år.',
      '2,3 skulle betyda att värdet 2,3-dubblas varje år (+130 %).',
      '1,23 motsvarar en ökning med 23 %, inte 2,3 %.',
    ],
  },
  {
    question: 'När behövs logaritmer i modellen $y = C \\cdot a^x$?',
    choices: [
      'När tiden $x$ söks — variabeln sitter i exponenten',
      'När startvärdet $C$ söks',
      'När nya värdet $y$ söks',
      'Alltid',
    ],
    correct: 0,
    why: [
      'y och C fås med insättning, a med en potensekvation — men x i exponenten kräver logaritmering och tredje logaritmlagen.',
      'C fås genom division: $C = y/a^x$.',
      'y fås genom direkt beräkning.',
      'Tre av fyra storheter nås utan logaritmer.',
    ],
  },
  {
    question: 'Ekvationen $1{,}2 = 1{,}023^x$ logaritmeras. Vad blir nästa rad?',
    choices: [
      '$\\lg 1{,}2 = x \\cdot \\lg 1{,}023$',
      '$\\lg 1{,}2 = \\lg x \\cdot 1{,}023$',
      '$1{,}2 = x \\cdot \\lg 1{,}023$',
      '$\\lg 1{,}2 = 1{,}023 \\cdot \\lg x$',
    ],
    correct: 0,
    why: [
      'Tredje logaritmlagen multiplicerar ner exponenten x: $\\lg 1{,}023^x = x \\cdot \\lg 1{,}023$.',
      'Det är exponenten x som flyttas ner — inte basen som flyttas in i logaritmen.',
      'VL måste också logaritmeras — samma operation på båda led.',
      'x är exponenten och flyttas ner som faktor; 1,023 stannar i logaritmen.',
    ],
  },
  {
    question: 'Beräkningen ger $x \\approx 8{,}02$ år för sparkontot, men svaret blir "efter 9 år". Varför?',
    choices: [
      'Räntan betalas ut i slutet av varje år — beloppet passerar gränsen först vid nästa hela utbetalning',
      'Man ska alltid avrunda uppåt till närmaste heltal',
      '8,02 är fel uträknat',
      'Logaritmer ger bara heltalssvar',
    ],
    correct: 0,
    why: [
      'Modellen är kontinuerlig men räntan är diskret: efter 8 år har beloppet inte passerat 12 000 kr — det sker vid årsskifte 9.',
      'Avrundningen motiveras av situationen (årsvisa utbetalningar), inte av en allmän regel.',
      'Uträkningen stämmer — tolkningen kräver hela år.',
      'Logaritmer ger vilka reella värden som helst.',
    ],
  },
  {
    question: 'Ett värde HALVERAS med tiden enligt $0{,}5 = a^x$. Vad kännetecknar förändringsfaktorn $a$?',
    choices: [
      '$a < 1$ — värdet minskar',
      '$a > 1$ — värdet ökar',
      '$a = 0{,}5$ alltid',
      '$a$ är negativt',
    ],
    correct: 0,
    why: [
      'Minskning betyder förändringsfaktor under 1 (t.ex. 0,85 vid −15 % per år).',
      'a > 1 beskriver tillväxt — då nås aldrig hälften.',
      'a = 0,5 gäller bara om halveringen sker på exakt en tidsenhet.',
      'Förändringsfaktorer är alltid positiva — annars växlar värdet tecken.',
    ],
  },
],

'ma2c-5.6': [
  {
    question: 'Vad betyder $\\log_2 16$?',
    choices: [
      '"Det tal som 2 ska upphöjas till för att bli 16" — alltså 4',
      '"16 delat med 2" — alltså 8',
      '"2 upphöjt till 16"',
      '"Tiologaritmen av 32"',
    ],
    correct: 0,
    why: [
      'Generella logaritmer fungerar som tiologaritmen men med annan bas: $2^4 = 16$ ger $\\log_2 16 = 4$.',
      'Logaritm är en exponentfråga, inte division.',
      'Det vore $2^{16}$ — logaritmen är exponenten, inte potensen.',
      'Basen är 2, inte 10 — och talet är 16.',
    ],
  },
  {
    question: 'Ekvationen $3^x = 25$ har lösningen …',
    choices: [
      '$x = \\log_3 25$',
      '$x = \\lg 25$',
      '$x = \\frac{25}{3}$',
      '$x = \\sqrt[3]{25}$',
    ],
    correct: 0,
    why: [
      'Basen är 3, så lösningen är "3-logaritmen för 25".',
      'lg är basen 10 — den löser $10^x = 25$.',
      'Division löser linjära ekvationer, inte exponentialekvationer.',
      'Tredje roten löser $x^3 = 25$ — variabeln i basen.',
    ],
  },
  {
    question: 'Vad är $5^{\\log_5 12}$?',
    choices: [
      '12',
      '5',
      '$\\log_5 12$',
      '60',
    ],
    correct: 0,
    why: [
      'Samma samband som $10^{\\lg a} = a$ fast med basen 5: $5^{\\log_5 12} = 12$.',
      'Basen är 5, men resultatet är talet man "loggat".',
      'Det är exponenten — potensen blir talet självt.',
      '60 = 5 · 12 — men potens är inte multiplikation.',
    ],
  },
  {
    question: 'Varför skrivs tiologaritmen "lg" i stället för $\\log_{10}$?',
    choices: [
      'Basen 10 är så vanlig att den fått ett förkortat skrivsätt',
      'lg och log₁₀ är olika funktioner',
      'lg betyder alltid basen 2',
      'lg är en felskrivning',
    ],
    correct: 0,
    why: [
      'lg är bara en förkortning av log₁₀ — samma funktion, kortare namn.',
      'De är exakt samma funktion.',
      'Basen 2-logaritmen skrivs log₂ (ibland "lb").',
      'lg är standardnotation i svensk matematik.',
    ],
  },
  {
    question: 'Bestäm $\\log_3 9$ utan räknare.',
    choices: [
      '2',
      '3',
      '$\\frac{9}{3} = 3$',
      '81',
    ],
    correct: 0,
    why: [
      '$3^2 = 9$, så $\\log_3 9 = 2$.',
      '3 är basen — exponenten som ger 9 är 2.',
      'Kvoten 9/3 råkar också bli 3, men logaritmen är exponentfrågan: $3^? = 9$.',
      '81 är $3^4$ (eller $9^2$) — inte exponenten.',
    ],
  },
],

'ma2c-6.1': [
  {
    question: 'Vilka är de tre vanligaste **lägesmåtten**?',
    choices: [
      'Medelvärde, median och typvärde',
      'Medelvärde, variationsbredd och standardavvikelse',
      'Median, kvartil och percentil',
      'Frekvens, klassmitt och medelvärde',
    ],
    correct: 0,
    why: [
      'Lägesmåtten sammanfattar var materialet "ligger": medelvärde (summan/antalet), median (mitten) och typvärde (vanligast).',
      'Variationsbredd och standardavvikelse är SPRIDNINGSmått.',
      'Kvartiler och percentiler beskriver fördelningens delar, inte dess läge i första hand.',
      'Frekvens och klassmitt är hjälpbegrepp, inte lägesmått.',
    ],
  },
  {
    question: 'Hur bestäms **medianen**?',
    choices: [
      'Sortera värdena i storleksordning och ta värdet i mitten',
      'Dividera summan med antalet',
      'Ta det värde som förekommer flest gånger',
      'Ta det största värdet minus det minsta',
    ],
    correct: 0,
    why: [
      'Medianen är mittvärdet i det sorterade materialet — vid jämnt antal tas medelvärdet av de två mittersta.',
      'Det är medelvärdet.',
      'Det är typvärdet.',
      'Det är variationsbredden — ett spridningsmått.',
    ],
  },
  {
    question: 'Åldrarna 16, 16, 16, 17, 17, 18 och 61 har medelvärdet 23 år. Varför är medianen (17 år) mer representativ här?',
    choices: [
      '61-åringen är ett utstickande värde som drar upp medelvärdet — medianen påverkas inte av det',
      'Medianen är alltid mer representativ än medelvärdet',
      'Medelvärdet är felräknat',
      'Typvärdet är alltid bäst',
    ],
    correct: 0,
    why: [
      'Vid sned fördelning blir medelvärdet missvisande (ingen i rummet är nära 23 år) — medianen struntar i hur extremt ytterlighetsvärdet är.',
      'I symmetriska material utan utstickare fungerar medelvärdet oftast utmärkt.',
      'Medelvärdet 161/7 = 23 stämmer — det är representativiteten som brister.',
      'Typvärdet (16) är ett alternativ, men frågan gäller medianens fördel över medelvärdet.',
    ],
  },
  {
    question: 'Vad är **frekvens**?',
    choices: [
      'Antalet av ett visst värde i materialet',
      'Materialets största värde',
      'Antalet klasser i ett histogram',
      'Skillnaden mellan två klassmitter',
    ],
    correct: 0,
    why: [
      'Frekvensen anger hur många gånger ett värde förekommer — t.ex. att 17-åringarnas frekvens är 12 om det finns 12 stycken.',
      'Största värdet har inget särskilt namn kopplat till frekvens.',
      'Antalet klasser är just antalet klasser — frekvensen räknar värden.',
      'Klassbredd beskriver avståndet mellan klassgränser.',
    ],
  },
  {
    question: 'Vad är **klassmitt** i ett klassindelat material?',
    choices: [
      'Värdet i mitten av ett intervall — det värde alla i klassen räknas som att de har',
      'Den klass som har högst frekvens',
      'Medianen av hela materialet',
      'Mitten av histogrammets x-axel',
    ],
    correct: 0,
    why: [
      'Klassen 300 ≤ x < 400 har klassmitten 350 — vid t.ex. medelvärdesberäkning räknas alla i klassen som 350.',
      'Klassen med högst frekvens ger typvärdesklassen.',
      'Medianen är ett lägesmått för hela materialet, inte ett intervalls mitt.',
      'Klassmitten hör till varje enskild klass, inte till axeln.',
    ],
  },
],

'ma2c-6.2': [
  {
    question: 'Hur beräknas **variationsbredden**?',
    choices: [
      'Största värdet minus minsta värdet',
      'Övre kvartil minus nedre kvartil',
      'Medelvärdet minus medianen',
      'Största värdet dividerat med minsta värdet',
    ],
    correct: 0,
    why: [
      'Variationsbredden mäter hela materialets spann: största − minsta.',
      'Det är kvartilavståndet.',
      'Skillnaden mellan lägesmått är inget standardspridningsmått.',
      'Det är en kvot, inte variationsbredden.',
    ],
  },
  {
    question: 'Vilka fem värden behövs för att rita ett lådagram?',
    choices: [
      'Minsta värdet, nedre kvartilen, medianen, övre kvartilen och största värdet',
      'Medelvärdet, medianen, typvärdet, frekvensen och summan',
      'De fem största värdena',
      'Fem slumpmässigt valda värden',
    ],
    correct: 0,
    why: [
      'Pinnarnas ändar är minsta/största värdet, lådans kanter är kvartilerna Q1 och Q3, och strecket i lådan är medianen.',
      'Lådagrammet bygger på kvartiler, inte på läges- och summamått.',
      'Alla delar av materialet representeras — inte bara toppen.',
      'Värdena är exakt bestämda av materialet.',
    ],
  },
  {
    question: 'Vad är den **nedre kvartilen** $Q_1$?',
    choices: [
      'Medianen av alla värden till vänster om (under) medianen',
      'Det minsta värdet i materialet',
      'En fjärdedel av största värdet',
      'Medelvärdet av de fyra minsta värdena',
    ],
    correct: 0,
    why: [
      'Q1 delar den undre halvan i två lika delar — 25 % av värdena ligger under Q1.',
      'Minsta värdet är pinnens ände, inte kvartilen.',
      'Kvartilen är ett läge i materialet, inte en bråkdel av ett värde.',
      'Q1 är medianen av HELA undre halvan, oavsett antal.',
    ],
  },
  {
    question: 'Vad betyder det att en del av lådagrammet är STOR?',
    choices: [
      'Värdena i den delen är utspridda över ett stort intervall',
      'Den delen innehåller fler värden än de andra',
      'Materialet innehåller fel',
      'Medelvärdet ligger i den delen',
    ],
    correct: 0,
    why: [
      'Varje del innehåller alltid 25 % av värdena — en stor del betyder att dessa 25 % ligger utspridda (stor spridning).',
      'Antalet är alltid 25 % per del — det är spridningen som varierar.',
      'Olika stora delar är helt normalt — det är så spridningen syns.',
      'Medelvärdet syns inte i ett lådagram.',
    ],
  },
  {
    question: 'Vad anger den 80:e percentilen, $p_{80}$?',
    choices: [
      'Värdet som 80 % av materialet är mindre än',
      'Värdet som 80 % av materialet är större än',
      'Att materialet innehåller 80 värden',
      '80 % av medelvärdet',
    ],
    correct: 0,
    why: [
      'Percentiler anger hur många procent som är LÄGRE än värdet: under p80 ligger 80 %, över ligger 20 %.',
      'Tvärtom — 20 % är större än p80.',
      'Percentilen är ett värde i materialet, inte ett antal.',
      'Percentilen är inte kopplad till medelvärdet.',
    ],
  },
],

'ma2c-6.3': [
  {
    question: 'Hur tar man fram statistiska mått ur en värdekolumn i Geogebra?',
    choices: [
      'Markera värdena, välj Envariabelanalys och klicka på "Visa statistik"',
      'Skriv medelvärde() i inmatningsfältet',
      'Växla till sannolikhetskalkylatorn',
      'Rita ett spridningsdiagram',
    ],
    correct: 0,
    why: [
      'Envariabelanalys (menyn "blå staplar") med "Visa statistik" ger n, Medel, Min, Q1, Median, Q3, Max med mera på en gång.',
      'Enstaka kommandon finns, men statistiktabellen ger allt samlat.',
      'Sannolikhetskalkylatorn används för normalfördelningar.',
      'Spridningsdiagram hör till TVÅvariabelsanalys.',
    ],
  },
  {
    question: 'Vad står **n** för i Geogebras statistiktabell?',
    choices: [
      'Antalet värden',
      'Medelvärdet',
      'Största värdet',
      'Standardavvikelsen',
    ],
    correct: 0,
    why: [
      'n är antalet inmatade värden — bra som kontroll att allt kommit med.',
      'Medelvärdet står vid "Medel".',
      'Största värdet står vid "Max".',
      'Standardavvikelsen står vid σ respektive s.',
    ],
  },
  {
    question: 'Hur beräknas percentilen $p_{90}$ i Geogebra?',
    choices: [
      'Skapa en lista av värdena och skriv Percentil(l1, 90%) i inmatningsfältet',
      'Klicka på "Visa statistik" — percentilen står i tabellen',
      'Multiplicera medelvärdet med 0,9',
      'Läs av Q3 i statistiktabellen',
    ],
    correct: 0,
    why: [
      'Percentiler kräver kommandot Percentil med en lista och en procentsats — värdena görs först till en lista via "Skapa lista".',
      'Statistiktabellen visar kvartiler men inte godtyckliga percentiler.',
      'Percentilen är ett gränsvärde i materialet, inte en andel av medelvärdet.',
      'Q3 är den 75:e percentilen — inte den 90:e.',
    ],
  },
  {
    question: 'En frekvenstabell ska analyseras i Geogebra. Hur matas den in?',
    choices: [
      'Värdena i en kolumn och frekvenserna i kolumnen till höger — markera båda',
      'Varje värde skrivs in lika många gånger som frekvensen anger',
      'Bara frekvenserna matas in',
      'Frekvenstabeller kan inte analyseras i Geogebra',
    ],
    correct: 0,
    why: [
      'Geogebra viktar värdena med frekvenserna när båda kolumnerna markeras — 177 elever blir 14 celler.',
      'Det fungerar men är just det arbete frekvenskolumnen besparar en.',
      'Utan värdena vet Geogebra inte VAD som räknats.',
      'Jodå — det är en av kalkylbladets styrkor.',
    ],
  },
  {
    question: 'Hur ritas ett lådagram i Geogebra?',
    choices: [
      'Välj Envariabelanalys och byt diagramtyp från "Histogram" till "Boxplot (Lådagram)" i rullistan',
      'Skriv "lådagram" i inmatningsfältet',
      'Lådagram måste ritas för hand',
      'Använd verktyget Extrempunkt',
    ],
    correct: 0,
    why: [
      'I Envariabelanalysens rullista finns flera diagramtyper — Boxplot (Lådagram) är en av dem, och diagrammet kan kopieras till ritområdet.',
      'Kommandot heter Boxplot/Låddiagram — men rullistan är den enkla vägen.',
      'Geogebra ritar lådagrammet automatiskt ur värdena.',
      'Extrempunkt hör till funktionsgrafer.',
    ],
  },
],

'ma2c-6.4': [
  {
    question: 'Vad betyder en STOR standardavvikelse?',
    choices: [
      'Stor spridning — värdena avviker i genomsnitt mycket från medelvärdet',
      'Stort medelvärde',
      'Många värden i materialet',
      'Att materialet är normalfördelat',
    ],
    correct: 0,
    why: [
      'Standardavvikelsen är ett spridningsmått: stora avvikelser från medelvärdet ger stor standardavvikelse.',
      'Medelvärdets storlek och spridningen är oberoende — 2, 4, 12, 24, 43 och 16, 17, 17, 17, 18 har samma medelvärde men helt olika spridning.',
      'Antalet värden anges av n.',
      'Standardavvikelse kan beräknas för alla material, normalfördelade eller ej.',
    ],
  },
  {
    question: 'När används beteckningen $s$ för standardavvikelsen?',
    choices: [
      'Vid en stickprovsundersökning — när bara en del av populationen undersökts',
      'Vid en totalundersökning',
      'När standardavvikelsen är liten',
      's och σ används helt godtyckligt',
    ],
    correct: 0,
    why: [
      's hör till stickprov och σ till totalundersökning — de beräknas med lite olika formler (n − 1 respektive n i nämnaren).',
      'Totalundersökningens standardavvikelse betecknas σ.',
      'Beteckningen styrs av undersökningstypen, inte av värdets storlek.',
      'Valet är betydelsebärande — läs av rätt rad i Geogebras tabell.',
    ],
  },
  {
    question: 'Datamängderna 16, 17, 17, 17, 18 och 2, 4, 12, 24, 43 har båda medelvärdet 17. Vad skiljer dem?',
    choices: [
      'Spridningen — den andra har mycket större standardavvikelse',
      'Ingenting — samma medelvärde betyder samma egenskaper',
      'Den första har större standardavvikelse',
      'Den andra har större median',
    ],
    correct: 0,
    why: [
      'Avvikelserna från 17 är som mest 1 i den första men upp till 26 i den andra — lägesmåttet döljer spridningen, och det är därför spridningsmått behövs.',
      'Medelvärdet säger inget om hur utspridda värdena är.',
      'Den förstas värden ligger tätt kring 17 — minimal spridning.',
      'Medianerna är 17 respektive 12 — men den stora skillnaden är spridningen.',
    ],
  },
  {
    question: 'Var läser man av standardavvikelsen för en totalundersökning i Geogebra?',
    choices: [
      'Vid σ i statistiktabellen (Envariabelanalys, "Visa statistik")',
      'Vid s i statistiktabellen',
      'Vid Max i statistiktabellen',
      'Standardavvikelsen visas inte i Geogebra',
    ],
    correct: 0,
    why: [
      'σ (lilla sigma) är totalundersökningens standardavvikelse; framgår inget annat i uppgiften förutsätts totalundersökning.',
      's gäller stickprov — värdet är något större.',
      'Max är det största värdet.',
      'Båda varianterna visas i tabellen.',
    ],
  },
  {
    question: 'En datamängd har standardavvikelsen 0. Vad vet du om värdena?',
    choices: [
      'Alla värden är exakt lika stora',
      'Alla värden är 0',
      'Materialet saknar medelvärde',
      'Materialet innehåller bara ett värde',
    ],
    correct: 0,
    why: [
      'Ingen spridning alls betyder att inget värde avviker från medelvärdet — alla är identiska.',
      'Värdena kan vara vilket tal som helst, bara de är lika (t.ex. 7, 7, 7).',
      'Medelvärdet finns — det är lika med det gemensamma värdet.',
      'Även 5, 5, 5, 5 (fyra värden) har standardavvikelsen 0.',
    ],
  },
],

'ma2c-6.5': [
  {
    question: 'Vad kännetecknar ett normalfördelat material?',
    choices: [
      'Värdena fördelas jämnt (symmetriskt) kring medelvärdet enligt normalfördelningskurvan',
      'Alla värden är lika vanliga',
      'Värdena ökar exponentiellt',
      'Materialet innehåller inga negativa tal',
    ],
    correct: 0,
    why: [
      'Normalfördelningen är den klockformade kurvan där bestämda procentsatser (34,1/13,6/2,3 %) ligger inom givna intervall av standardavvikelser.',
      'Lika vanliga värden vore en likformig fördelning — normalfördelningen toppar vid medelvärdet.',
      'Exponentiell tillväxt är något annat — normalfördelning beskriver hur värden SPRIDS.',
      'Normalfördelade värden kan vara negativa (t.ex. temperaturer).',
    ],
  },
  {
    question: 'Hur stor andel ligger mellan medelvärdet och EN standardavvikelse uppåt ($\\mu$ till $\\mu + \\sigma$)?',
    choices: [
      '34,1 %',
      '68,2 %',
      '13,6 %',
      '50 %',
    ],
    correct: 0,
    why: [
      'Varje sida om medelvärdet upp till en standardavvikelse rymmer 34,1 %.',
      '68,2 % är BÅDA sidorna tillsammans (±σ).',
      '13,6 % ligger mellan en och två standardavvikelser.',
      '50 % är hela halvan ovanför medelvärdet.',
    ],
  },
  {
    question: 'Hur stor andel ligger MER än två standardavvikelser ÖVER medelvärdet?',
    choices: [
      '2,3 %',
      '13,6 %',
      '4,6 %',
      '15,9 %',
    ],
    correct: 0,
    why: [
      'Svansen ovanför μ + 2σ rymmer 2,3 % (kontroll: 34,1 + 13,6 + 2,3 = 50 %).',
      '13,6 % ligger mellan en och två standardavvikelser.',
      '4,6 % är BÅDA svansarna tillsammans.',
      '15,9 % är allt ovanför μ + σ.',
    ],
  },
  {
    question: 'Kvinnors längd: $\\mu = 165{,}5$ och $\\sigma = 6{,}15$. Vilket Geogebra-verktyg besvarar "hur stor andel är mellan 160 och 170 cm"?',
    choices: [
      'Sannolikhetskalkylatorn med ett slutet intervall 160 ≤ X ≤ 170',
      'Envariabelanalys med "Visa statistik"',
      'Verktyget Nollställen',
      'Percentil(l1, 50%)',
    ],
    correct: 0,
    why: [
      'Sannolikhetskalkylatorn tar μ och σ, och intervallknappen ger P(160 ≤ X ≤ 170) ≈ 0,58 = 58 %.',
      'Envariabelanalys arbetar med inmatade värden — här finns bara fördelningens parametrar.',
      'Nollställen hör till funktionsgrafer.',
      'Percentiler kräver en lista av värden — och svarar på en annan fråga.',
    ],
  },
  {
    question: 'Hur påverkas normalfördelningskurvans form av spridningen?',
    choices: [
      'Liten spridning ger en hög och smal kurva; stor spridning ger en låg och bred',
      'Liten spridning ger en låg och bred kurva',
      'Spridningen påverkar inte formen',
      'Kurvan blir asymmetrisk vid stor spridning',
    ],
    correct: 0,
    why: [
      'Samlade värden koncentrerar kurvan kring medelvärdet (hög/smal); utspridda värden plattar ut den (låg/bred). Arean under kurvan är alltid densamma.',
      'Tvärtom.',
      'σ styr precis kurvans bredd och höjd.',
      'Normalfördelningskurvan är alltid symmetrisk kring μ.',
    ],
  },
],

'ma2c-6.6': [
  {
    question: 'Vad gör man när man utför en **linjär regression**?',
    choices: [
      'Tar fram ekvationen för den räta linje som bäst ansluter till punkterna',
      'Beräknar medelvärdet av y-värdena',
      'Ritar ett lådagram',
      'Sorterar punkterna i storleksordning',
    ],
    correct: 0,
    why: [
      'Regressionslinjen är linjen punkterna samlas kring — regressionen ger dess ekvation, t.ex. y = 270x + 2 500.',
      'Regression handlar om SAMBANDET mellan två variabler.',
      'Lådagram beskriver en enda variabels spridning.',
      'Ordningen på punkterna saknar betydelse.',
    ],
  },
  {
    question: 'Mellan vilka värden ligger korrelationskoefficienten $r$?',
    choices: [
      'Mellan −1 och 1',
      'Mellan 0 och 1',
      'Mellan 0 och 100',
      'Vilka värden som helst',
    ],
    correct: 0,
    why: [
      'r = 1 är perfekt positiv, r = −1 perfekt negativ och r = 0 ingen korrelation.',
      '0 till 1 gäller $r^2$ — $r$ själv kan vara negativt.',
      'r är ingen procentsats.',
      'r är normerad till intervallet [−1, 1].',
    ],
  },
  {
    question: 'Punkterna i ett spridningsdiagram ligger spritt kring en fallande linje. Hur beskrivs korrelationen?',
    choices: [
      'Svag negativ',
      'Stark negativ',
      'Svag positiv',
      'Ingen korrelation',
    ],
    correct: 0,
    why: [
      'Fallande riktning = negativ; spridda punkter = svag. Ett typiskt r-värde kunde vara ≈ −0,5.',
      'Stark kräver att punkterna ligger tydligt PÅ linjen.',
      'Positiv korrelation kräver stigande lutning.',
      'Det finns en tendens (fallande) — alltså viss korrelation.',
    ],
  },
  {
    question: 'Var läser man av $r$ i Geogebra efter en tvåvariabels regressionsanalys?',
    choices: [
      'Klicka på "Visa statistik" och läs av raden r',
      'r visas i rutan med regressionsekvationen',
      'r kan inte beräknas i Geogebra',
      'r står i kalkylbladets sista rad',
    ],
    correct: 0,
    why: [
      'Statistikknappen i regressionsanalysen listar bl.a. r (korrelationskoefficienten) — för glassexemplet r ≈ 0,97.',
      'Under diagrammet visas ekvationen — r kräver statistikvyn.',
      'Jodå, via "Visa statistik".',
      'Kalkylbladet innehåller rådata, inte analysresultaten.',
    ],
  },
  {
    question: 'Modellen y = 270x + 2 500 beskriver glassförsäljning (kr) som funktion av temperatur (°C). Hur uppskattas försäljningen vid 30 °C?',
    choices: [
      'Sätt in x = 30: y = 270 · 30 + 2 500 = 10 600 kr',
      'Sätt in y = 30 och lös ut x',
      'Multiplicera 30 med r-värdet',
      'Läs av medelvärdet av försäljningen',
    ],
    correct: 0,
    why: [
      'Modellen används som en vanlig funktion — temperaturen in, försäljningen ut.',
      'y = 30 skulle betyda 30 kr i försäljning — frågan ger temperaturen.',
      'r beskriver korrelationens styrka, inte sambandet självt.',
      'Poängen med modellen är att förutsäga NYA värden, inte att sammanfatta gamla.',
    ],
  },
],

'ma2c-6.7': [
  {
    question: 'Vilken modellform har en **exponentiell** regressionsmodell?',
    choices: [
      '$y = Ca^x$',
      '$y = kx + m$',
      '$y = Cx^a$',
      '$y = ax^2 + bx + c$',
    ],
    correct: 0,
    why: [
      'Exponentiell: variabeln i exponenten, y = C·aˣ.',
      'Det är den linjära modellen.',
      'Det är potensmodellen — variabeln i basen.',
      'Det är polynommodellen av grad 2.',
    ],
  },
  {
    question: 'Vad kännetecknar en **linjär** modell i data?',
    choices: [
      'Ökningen eller minskningen är lika stor överallt',
      'Liten ökning i början och stor i slutet',
      'Kurvan vänder och går genom origo',
      'Värdena fördubblas varje period',
    ],
    correct: 0,
    why: [
      'En rät linje har konstant lutning — samma förändring per steg i hela materialet.',
      'Accelererande ökning är exponentialfunktionens signum.',
      'Vändning genom origo kännetecknar potensfunktionen.',
      'Fördubbling per period är multiplikativ — exponentiell.',
    ],
  },
  {
    question: 'Vad används $r^2$-värdet till?',
    choices: [
      'Att jämföra hur väl olika regressionsmodeller är anpassade — närmast 1 vinner',
      'Att beräkna medelvärdet av residualerna',
      'Att avgöra om korrelationen är positiv eller negativ',
      'Att räkna antalet punkter',
    ],
    correct: 0,
    why: [
      '$r^2$ ligger mellan 0 och 1; ju närmare 1, desto bättre kurvanpassning — t.ex. 0,9933 (exponentiell) mot 0,954 (linjär) för världens befolkning.',
      '$r^2$ är ett sammanfattande mått, inte ett medelvärde av fel.',
      'Kvadreringen tar bort tecknet — riktningen syns i $r$, inte i $r^2$.',
      'Antalet punkter är n.',
    ],
  },
  {
    question: 'Varför är det svårt att skilja potens- och polynommodeller åt?',
    choices: [
      'Deras kurvor liknar varandra och kan ibland sammanfalla — $y = x^2$ är båda',
      'Geogebra kan inte rita potenskurvor',
      'Polynomkurvor går alltid genom origo',
      'Potensfunktioner har inget $r^2$-värde',
    ],
    correct: 0,
    why: [
      '$y = x^2$ är på samma gång potensfunktionen $Cx^a$ ($C = 1$, $a = 2$) och polynomet $ax^2 + bx + c$ ($b = c = 0$) — kännetecken och $r^2$ får hjälpa till.',
      'Geogebra har en egen rullistepost för potensmodellen.',
      'Tvärtom — polynom går INTE nödvändigtvis genom origo, det gör potensfunktionen.',
      '$r^2$ beräknas för alla modelltyper.',
    ],
  },
  {
    question: 'Världens befolkning 1920–2020: linjär modell ger $r^2 = 0{,}954$ och exponentiell ger $r^2 = 0{,}9933$. Vilken slutsats är rätt?',
    choices: [
      'Den exponentiella modellen beskriver sambandet bäst — dess $r^2$ ligger närmast 1',
      'Den linjära är bäst eftersom den är enklast',
      'Modellerna är likvärdiga',
      'Ingen av modellerna kan användas',
    ],
    correct: 0,
    why: [
      'Både kurvans passform och $r^2$-jämförelsen pekar på den exponentiella modellen — befolkningen har vuxit procentuellt snarare än med fast antal per år.',
      'Enkelhet är trevligt men $r^2$ visar att den linjära missar krökningen i datat.',
      'Skillnaden 0,9933 mot 0,954 är tydlig i sammanhanget.',
      'Båda fungerar hyggligt — den exponentiella bäst.',
    ],
  },
],

// ═══════════════════════════════════════════════════════════════════════
// Matematik fortsättning nivå 1c (Ma3c)
// ═══════════════════════════════════════════════════════════════════════
'ma3c-1.1': [
  {
    question: 'Vad är ett rationellt uttryck?',
    choices: [
      'Ett uttryck med ett polynom i täljaren och ett polynom i nämnaren',
      'Ett uttryck som bara innehåller heltal',
      'Ett uttryck utan variabler',
      'En ekvation med två obekanta',
    ],
    correct: 0,
    why: [
      'Precis — ett bråk där både täljare och nämnare är polynom, t.ex. $\\dfrac{5x^2 - 5x}{3x - 3}$.',
      'Rationella uttryck innehåller nästan alltid variabler — det är polynomen i täljare och nämnare som är det centrala.',
      'Tvärtom, variabler är typiska för rationella uttryck.',
      'Ett rationellt uttryck är just ett uttryck, inte en ekvation — det finns inget likhetstecken.',
    ],
  },
  {
    question: 'Vad händer med ett uttrycks värde när du förkortar eller förlänger det?',
    choices: [
      'Värdet ändras inte',
      'Värdet blir alltid mindre',
      'Värdet blir alltid större',
      'Värdet dubbleras',
    ],
    correct: 0,
    why: [
      'Förkortning och förlängning innebär att dividera respektive multiplicera täljare och nämnare med samma sak — storleken på uttrycket är oförändrad.',
      'Förkortning gör bara uttrycket enklare att skriva, inte mindre i värde.',
      'Förlängning ändrar hur uttrycket skrivs, inte dess värde.',
      'Att multiplicera både täljare och nämnare med samma tal ändrar inte kvoten.',
    ],
  },
  {
    question: 'Vilka tre metoder har vi för att faktorisera ett polynom?',
    choices: [
      'Bryta ut gemensam faktor, kvadrerings-/konjugatregeln baklänges, och nollställen',
      'Addition, subtraktion och multiplikation',
      'Förkorta, förlänga och förenkla',
      'pq-formeln, abc-formeln och gränsvärden',
    ],
    correct: 0,
    why: [
      'Just dessa tre — och den tredje (nollställen) fungerar på vilket polynom som helst.',
      'Det är räknesätt, inte faktoriseringsmetoder.',
      'Det är vad vi gör med rationella uttryck, inte metoder att faktorisera med.',
      'pq- och abc-formeln löser ekvationer; de används inom nollställesmetoden men är inte de tre metoderna i sig.',
    ],
  },
  {
    question: 'Ett polynom $p(x)$ har nollställena $x_1$ och $x_2$ och koefficienten $k$ framför högsta gradens term. Hur kan det faktoriseras?',
    choices: [
      '$p(x) = k(x - x_1)(x - x_2)$',
      '$p(x) = k(x + x_1)(x + x_2)$',
      '$p(x) = (x - x_1) + (x - x_2)$',
      '$p(x) = k \\cdot x_1 \\cdot x_2$',
    ],
    correct: 0,
    why: [
      'Varje nollställe $x_i$ ger en faktor $(x - x_i)$, och $k$ är koefficienten framför termen med högst grad.',
      'Tecknet är fel — ett nollställe $x_1$ ger faktorn $(x - x_1)$, så $x_1 = 3$ ger $(x - 3)$.',
      'Faktorer multipliceras, de adderas inte.',
      'Faktoriseringen består av förstagradsfaktorer $(x - x_i)$, inte av produkten av nollställena.',
    ],
  },
  {
    question: 'Varför faktoriserar vi täljare och nämnare innan vi förkortar ett rationellt uttryck?',
    choices: [
      'Bara hela gemensamma faktorer får förkortas bort — inte enskilda termer',
      'För att uttrycket ska bli längre',
      'För att slippa räkna ut nollställen',
      'Det behövs aldrig — man kan alltid förkorta term för term',
    ],
    correct: 0,
    why: [
      'Förkortning kräver en gemensam faktor i både täljare och nämnare; faktoriseringen gör dessa synliga. Man får aldrig stryka enstaka termer.',
      'Målet med förkortning är att förenkla, inte förlänga.',
      'Nollställen är ofta just den metod vi behöver för att kunna faktorisera.',
      'Att förkorta term för term är ett vanligt fel — $\\dfrac{x + 2}{x + 3}$ kan inte förkortas till $\\dfrac{2}{3}$.',
    ],
  },
],


'ma3c-1.2': [
  {
    question: 'Vad krävs för att man ska kunna addera eller subtrahera två rationella uttryck direkt (utan att göra dem liknämniga)?',
    choices: [
      'Att de har samma nämnare',
      'Att de har samma täljare',
      'Att båda uttrycken är positiva',
      'Att exponenterna i täljarna är lika',
    ],
    correct: 0,
    why: [
      'Precis — med samma nämnare adderas eller subtraheras bara täljarna; nämnaren förblir densamma.',
      'Täljarna får gärna vara olika — det är nämnarna som måste stämma överens.',
      'Tecknet på uttrycken spelar ingen roll för om man kan addera dem direkt.',
      'Exponenter i täljaren avgör inte om nämnarna är lika.',
    ],
  },
  {
    question: 'Hur gör man två rationella uttryck med olika nämnare liknämniga?',
    choices: [
      'Man förlänger varje term med den andra termens nämnare',
      'Man adderar nämnarna till en gemensam summa',
      'Man stryker nämnarna och adderar bara täljarna',
      'Man sätter båda nämnarna till 1',
    ],
    correct: 0,
    why: [
      'Genom att förlänga varje term med den andra termens (eller MGN:s) nämnare får båda samma nämnare, utan att uttryckens värden ändras.',
      'Nämnare adderas inte ihop — man förlänger med dem, man summerar dem inte.',
      'Nämnaren måste vara densamma innan man kan slå ihop täljarna — den kan inte bara strykas.',
      'Det skulle ändra uttryckens värden, vilket varken förkortning eller förlängning får göra.',
    ],
  },
  {
    question: 'Varför måste man kontrollera vilka $x$-värden som gör en nämnare lika med noll innan man löser en ekvation med rationella uttryck?',
    choices: [
      'Dessa värden gör ekvationen odefinierad och får aldrig vara med i svaret',
      'För att kunna förkorta uttrycket snyggare',
      'Det behövs bara om ekvationen saknar lösning',
      'För att avgöra vilken metod (MGN eller liknämnigt) som är snabbast',
    ],
    correct: 0,
    why: [
      'En nämnare som är noll gör att uttrycket är odefinierat — sådana $x$-värden kan aldrig vara giltiga lösningar, även om de dyker upp i uträkningen.',
      'Kontrollen handlar om vilka lösningar som är tillåtna, inte om att förenkla uttrycket.',
      'Kontrollen behövs alltid, oavsett hur många lösningar ekvationen råkar ha.',
      'Valet av metod är valfritt — kontrollen av nämnaren gäller definitionsmängden, inte vilken metod som är snabbast.',
    ],
  },
  {
    question: 'Vilka två metoder kan användas för att lösa en ekvation med rationella uttryck?',
    choices: [
      'Multiplicera med minsta gemensamma nämnaren, eller göra liknämnigt',
      'Kvadreringsreglerna eller konjugatregeln',
      '$pq$-formeln eller nollproduktmetoden',
      'Förkortning eller förlängning av bråk',
    ],
    correct: 0,
    why: [
      'Just dessa två metoder löser ekvationer med rationella uttryck — antingen multiplicerar man bort nämnarna, eller gör man alla termer liknämniga.',
      'Det är metoder för att faktorisera polynom, inte för att lösa ekvationer med rationella uttryck.',
      'De kan behövas som delsteg (t.ex. vid en andragradsekvation som dyker upp under lösningen), men är inte själva huvudmetoderna för rationella ekvationer.',
      'Det är operationer på rationella uttryck i sig, inte metoder för att lösa ekvationer.',
    ],
  },
  {
    question: 'En ekvation med rationella uttryck ger efter uträkning lösningarna $x = 0$ och $x = 3$, men nämnaren i den ursprungliga ekvationen innehåller faktorn $(x - 3)$. Vad blir slutsatsen?',
    choices: [
      '$x = 3$ måste förkastas eftersom ekvationen inte är definierad där; enda giltiga svaret är $x = 0$',
      'Båda lösningarna är giltiga eftersom uträkningen gav dem',
      '$x = 0$ måste förkastas eftersom det är den minsta lösningen',
      'Ekvationen saknar lösning eftersom en av rötterna är ogiltig',
    ],
    correct: 0,
    why: [
      '$x = 3$ gör nämnaren $(x - 3)$ noll, så det värdet ligger utanför definitionsmängden och kan inte vara en lösning — trots att det löser den multiplicerade ekvationen.',
      'Att multiplicera bort nämnare kan införa falska rötter — varje lösning måste kontrolleras mot de förbjudna värdena.',
      'Det är definitionsmängden, inte storleken på lösningen, som avgör om den ska förkastas.',
      'Ekvationen har fortfarande en giltig lösning ($x = 0$) — bara den falska roten förkastas, inte hela ekvationen.',
    ],
  },
],

'ma3c-1.3': [
  {
    question: 'Hur multiplicerar man två rationella uttryck $\\dfrac{a}{b}$ och $\\dfrac{c}{d}$?',
    choices: [
      '$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{ac}{bd}$ — täljare gånger täljare, nämnare gånger nämnare',
      '$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a+c}{b+d}$',
      '$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{ac}{b}$',
      '$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a}{b}\\cdot\\dfrac{d}{c}$',
    ],
    correct: 0,
    why: [
      'Precis — täljarna multipliceras med varandra och nämnarna med varandra, precis som vid multiplikation av vanliga bråk.',
      'Så adderar man bråk med gemensam nämnare — det är inte multiplikationsregeln.',
      'Nämnaren $d$ måste också vara med i resultatet, annars blir uttrycket inte likvärdigt med det ursprungliga.',
      'Det är divisionens invertering, inte multiplikation — här ska ingenting inverteras.',
    ],
  },
  {
    question: 'Hur beräknar man $\\dfrac{a}{b} \\Big/ \\dfrac{c}{d}$?',
    choices: [
      'Genom att byta divisionstecknet mot multiplikation och invertera uttrycket i nämnaren: $\\dfrac{a}{b}\\cdot\\dfrac{d}{c}$',
      'Genom att dividera täljarna och nämnarna var för sig: $\\dfrac{a/c}{b/d}$',
      'Genom att invertera båda uttrycken: $\\dfrac{b}{a}\\cdot\\dfrac{d}{c}$',
      'Genom att multiplicera täljare och nämnare direkt utan att invertera: $\\dfrac{ac}{bd}$',
    ],
    correct: 0,
    why: [
      'Precis — division med ett rationellt uttryck blir multiplikation med dess invers: man byter plats på täljare och nämnare i uttrycket i nämnaren.',
      'Det räcker inte att dela täljare mot täljare och nämnare mot nämnare var för sig — man måste invertera uttrycket i nämnaren och multiplicera.',
      'Bara uttrycket i nämnaren (det man delar med) ska inverteras — det första uttrycket lämnas oförändrat.',
      'Det beskriver multiplikation, inte division — vid division måste det andra uttrycket inverteras innan man multiplicerar.',
    ],
  },
  {
    question: 'Varför faktoriserar vi täljare och nämnare innan vi förkortar en produkt eller kvot av rationella uttryck?',
    choices: [
      'Bara hela gemensamma faktorer får förkortas bort — inte enskilda termer',
      'För att uttrycket ska se mer komplicerat ut',
      'Faktorisering är obligatorisk enligt lag, inte av matematiska skäl',
      'Man kan alltid förkorta term för term utan att faktorisera',
    ],
    correct: 0,
    why: [
      'Precis — en gemensam faktor måste synas i både täljare och nämnare för att få strykas, och faktorisering gör dessa faktorer synliga.',
      'Målet är tvärtom att förenkla uttrycket, inte göra det krångligare.',
      'Det handlar om vilka räkneoperationer som är matematiskt giltiga, inte om någon godtycklig regel.',
      'Att förkorta term för term är ett vanligt fel — t.ex. kan $\\dfrac{x+2}{x+5}$ inte förkortas till $\\dfrac{2}{5}$.',
    ],
  },
  {
    question: 'Vid ekvationen $\\dfrac{x-2}{x-3} = \\dfrac{x+7}{x}$ måste man notera att $x \\neq 3$ och $x \\neq 0$. Varför?',
    choices: [
      'Därför att ingen nämnare i en rationell ekvation får vara noll',
      'Därför att $x$ alltid ska vara ett positivt heltal',
      'Därför att täljaren annars blir noll',
      'Det är bara en rekommendation, inte ett krav',
    ],
    correct: 0,
    why: [
      'Precis — division med noll är inte definierad, så varje värde som gör en nämnare lika med noll måste uteslutas ur lösningsmängden.',
      'Rationella uttryck kan anta vilka reella värden som helst för $x$ (utom de som ger nämnaren noll) — inget krav på positiva heltal.',
      'Det är nämnarna, inte täljarna, som styr vilka värden som måste uteslutas.',
      'Det är ett absolut krav — ett värde som gör en nämnare noll ger ett odefinierat uttryck och kan aldrig vara en giltig lösning.',
    ],
  },
  {
    question: 'Vilket är det första steget för att förenkla $\\dfrac{x^2-4}{5}\\cdot\\dfrac{10}{x+2}$?',
    choices: [
      'Faktorisera $x^2-4$ som konjugat: $(x-2)(x+2)$',
      'Addera täljarna: $x^2-4+10$',
      'Förkorta $x^2$ mot $x$ i nämnaren direkt',
      'Invertera det andra uttrycket eftersom det är en division',
    ],
    correct: 0,
    why: [
      'Precis — genom att faktorisera $x^2-4$ med konjugatregeln syns faktorn $(x+2)$ som sedan kan förkortas mot nämnaren i det andra uttrycket.',
      'Det är multiplikation, inte addition — täljarna ska multipliceras, inte adderas.',
      'Man får bara förkorta hela faktorer, inte enskilda termer i ett polynom som $x^2-4$.',
      'Uttrycket är en multiplikation, inte en division — ingen invertering behövs här.',
    ],
  },
],

'ma3c-1.4': [
  {
    question: 'Vad är ett gränsvärde?',
    choices: [
      'Det värde ett uttryck närmar sig när variabeln går mot ett visst värde eller mot en oändlighet',
      'Det största värde ett uttryck kan anta',
      'Skillnaden mellan två uttryck',
      'Det värde där ett uttryck alltid är odefinierat',
    ],
    correct: 0,
    why: [
      'Precis — gränsvärdet är det värde uttrycket närmar sig, till exempel $\\lim_{x \\to \\infty} \\dfrac{1}{x} = 0$, även om uttrycket aldrig når fram dit.',
      'Ett gränsvärde handlar om vad ett uttryck närmar sig, inte om något maximivärde.',
      'Ett gränsvärde beskriver ett enda uttrycks beteende, inte en jämförelse mellan två uttryck.',
      'Många gränsvärden bestäms just för uttryck som ÄR odefinierade i en punkt (t.ex. $\\frac{0}{0}$), men gränsvärdet existerar ofta ändå.',
    ],
  },
  {
    question: 'Hur bestämmer man $\\lim_{x \\to a} f(x)$ om $f$ är definierad vid $x = a$?',
    choices: [
      'Man sätter in $x = a$ direkt i uttrycket och beräknar',
      'Man måste alltid faktorisera uttrycket först',
      'Man måste alltid göra en tabell med värden underifrån och ovanifrån',
      'Gränsvärdet kan då aldrig bestämmas',
    ],
    correct: 0,
    why: [
      'Det är metod 1 — den enklaste och mest effektiva metoden, som fungerar så snart uttrycket är definierat vid $x = a$.',
      'Faktorisering (metod 2) behövs bara när direkt insättning ger en odefinierad form som $\\frac{0}{0}$.',
      'Tabeller (metod 3) är sista utvägen, när varken metod 1 eller metod 2 fungerar.',
      'Är uttrycket definierat vid $x = a$ går gränsvärdet alltid att bestämma genom direkt insättning.',
    ],
  },
  {
    question: 'Vid direkt insättning i $\\displaystyle\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$ fås formen $\\frac{0}{0}$. Vad bör man göra?',
    choices: [
      'Faktorisera täljare och nämnare och förkorta bort den gemensamma faktorn',
      'Sätta gränsvärdet till 0 direkt',
      'Sätta gränsvärdet till oändligheten',
      'Byta ut nämnaren mot 1',
    ],
    correct: 0,
    why: [
      'Att faktorisera täljaren (här med konjugatregeln till $(x+1)(x-1)$) och förkorta bort $(x-1)$ gör uttrycket definierat vid $x=1$, så man kan sätta in värdet.',
      'Formen $\\frac{0}{0}$ säger ingenting om gränsvärdets faktiska värde — det måste bestämmas genom förkortning (eller tabeller).',
      'Formen $\\frac{0}{0}$ är inte samma sak som en oändlighet i täljare eller nämnare.',
      'Nämnaren får inte bytas ut godtyckligt — man förkortar bara bort gemensamma faktorer som faktiskt finns i uttrycket.',
    ],
  },
  {
    question: 'Vad blir $\\displaystyle\\lim_{x \\to \\infty} \\frac{7}{x}$?',
    choices: [
      '$0$',
      '$7$',
      'Oändlighet',
      'Gränsvärde saknas',
    ],
    correct: 0,
    why: [
      'En oändlighet enbart i nämnaren gör nämnaren oändligt mycket större än täljaren, så kvoten går mot 0.',
      '7 är bara täljarens konstant — den påverkar inte vart kvoten går när nämnaren växer obegränsat.',
      'Oändlighet som gränsvärde fås när täljaren ensam går mot oändligheten, inte nämnaren.',
      'Gränsvärdet existerar här och är väldefinierat: 0.',
    ],
  },
  {
    question: 'Gränsvärdet av ett uttryck är $-\\infty$ när $x$ närmar sig ett tal underifrån, men $+\\infty$ när $x$ närmar sig samma tal ovanifrån. Vad gäller?',
    choices: [
      'Gränsvärdet saknas',
      'Gränsvärdet är medelvärdet av de två, det vill säga 0',
      'Gränsvärdet är alltid 0',
      'Man använder det största av de två värdena som gränsvärde',
    ],
    correct: 0,
    why: [
      'För att ett gränsvärde ska existera måste uttrycket gå mot samma värde underifrån och ovanifrån. Här skiljer sig värdena åt, så gränsvärdet saknas.',
      'Gränsvärden beräknas inte som medelvärden av ensidiga gränsvärden — existerar inte båda och är lika, saknas gränsvärdet helt.',
      'Ingenting i uppgiften ger 0 som svar — slutsatsen av olika ensidiga gränsvärden är att gränsvärdet saknas.',
      'Man väljer inte det ena ensidiga gränsvärdet framför det andra — om de skiljer sig åt saknas gränsvärdet.',
    ],
  },
],

'ma3c-1.5': [
  {
    question: 'Vad kännetecknar ett symbolhanterande hjälpmedel?',
    choices: [
      'Det kan hantera algebraiska uttryck (bokstavsuttryck), inte bara numeriska beräkningar',
      'Det kan bara utföra numeriska beräkningar, precis som en vanlig räknare',
      'Det kan bara rita grafer, inte beräkna något',
      'Det är ett annat namn för en vanlig miniräknare',
    ],
    correct: 0,
    why: [
      'Precis — utöver numeriska beräkningar (beräkningar med siffror) kan ett symbolhanterande hjälpmedel räkna med algebraiska uttryck, t.ex. faktorisera och lösa ekvationer symboliskt. Geogebra är ett exempel.',
      'Tvärtom — det är just förmågan att hantera algebraiska uttryck utöver tal som skiljer ett symbolhanterande hjälpmedel från en vanlig räknare.',
      'Grafritning är bara en av flera funktioner i Geogebra — symbolhanteringen (förenkla, faktorisera, lösa, gränsvärden) är det utmärkande.',
      'En vanlig miniräknare klarar bara numeriska beräkningar — den kan inte hantera uttryck med bokstäver i sig.',
    ],
  },
  {
    question: 'Vilket kommando används i Geogebra för att faktorisera ett polynom?',
    choices: [
      'Faktorisera( Polynom )',
      'Förenkla( Funktion )',
      'Lös( Ekvation )',
      'Gränsvärde( Funktion, Värde )',
    ],
    correct: 0,
    why: [
      'Faktorisera( Polynom ) skriver om ett polynom som en produkt av faktorer, t.ex. $(x-1)(x+3)(x+5)$.',
      'Förenkla förenklar ett uttryck, men skriver inte nödvändigtvis om det som en produkt av faktorer.',
      'Lös( Ekvation ) löser ekvationer — det förutsätter ett likhetstecken, inte bara ett uttryck att faktorisera.',
      'Gränsvärde( Funktion, Värde ) beräknar vad ett uttryck närmar sig, inte hur det faktoriseras.',
    ],
  },
  {
    question: 'Vad skiljer kommandona NLös och Lös åt när man löser en ekvation?',
    choices: [
      'NLös ger lösningen i decimalform, Lös ger den exakt med symboler',
      'NLös ger lösningen exakt med symboler, Lös ger decimalform',
      'De ger alltid identiskt samma sorts svar',
      'NLös kan bara användas på förstagradsekvationer',
    ],
    correct: 0,
    why: [
      'NLös (numeriskt lös) svarar med decimaltal, t.ex. $x \\approx 1{,}73$, medan Lös svarar exakt, t.ex. $x = \\sqrt{3}$.',
      'Det är tvärtom — NLös står för "numeriskt lös" och ger decimalform.',
      'Skillnaden är just formen på svaret: decimaler mot exakta symboler.',
      'Både NLös och Lös fungerar på ekvationer av godtycklig grad, inte bara förstagradsekvationer.',
    ],
  },
  {
    question: 'En funktion $f(x) = x^3 - 4x^2$ är definierad i Geogebra. Hur bestämmer man funktionsvärdet $f(7)$?',
    choices: [
      'Man skriver f(7) på raden under funktionsdefinitionen och läser av svaret',
      'Man använder kommandot Gränsvärde( f, 7 )',
      'Man skriver NLös( f(x) = 7 )',
      'Funktionsvärden kan bara läsas av grafiskt, inte beräknas exakt',
    ],
    correct: 0,
    why: [
      'När funktionen är definierad räcker det att skriva f(7) på en ny rad — Geogebra räknar ut och visar värdet direkt.',
      'Gränsvärde beräknar vad ett uttryck närmar sig när variabeln går mot ett värde, inte ett funktionsvärde vid en punkt.',
      'NLös( f(x) = 7 ) löser i stället ekvationen $f(x) = 7$ med avseende på $x$ — motsatt fråga.',
      'Geogebra beräknar funktionsvärden exakt och numeriskt, inte bara genom att läsa av grafen.',
    ],
  },
  {
    question: 'Kommandot $\\text{Gränsvärde}\\!\\left(\\dfrac{x^2 - 9}{x - 3},\\ 3\\right)$ ger svaret 6, trots att uttrycket inte är definierat för $x = 3$. Varför blir svaret ändå 6?',
    choices: [
      'Gränsvärdet beskriver vad uttrycket närmar sig när $x$ går mot 3, inte vad som händer exakt vid $x = 3$',
      'Geogebra gissar ett rimligt värde när nämnaren blir 0',
      'Uttrycket är faktiskt definierat för $x = 3$ — nämnaren blir aldrig 0',
      'Gränsvärden kan bara beräknas för polynom, inte för rationella uttryck',
    ],
    correct: 0,
    why: [
      'Just det — förkortar man bort den gemensamma faktorn $(x-3)$ fås $x + 3$, som är definierat vid $x = 3$ och ger värdet 6. Gränsvärdet bryr sig bara om vad som händer nära punkten, inte i den.',
      'Geogebra gissar ingenting — den räknar exakt genom att hantera den borttagbara luckan i definitionsmängden algebraiskt.',
      'Nämnaren $x - 3$ blir exakt 0 när $x = 3$, så uttrycket är odefinierat just där.',
      'Gränsvärden kan mycket väl beräknas för rationella uttryck — det är precis vad detta exempel visar.',
    ],
  },
],

'ma3c-2.1': [
  {
    question: 'Vad kallas en rät linje mellan två punkter på en kurva?',
    choices: [
      'En sekant',
      'En tangent',
      'En asymptot',
      'En normal',
    ],
    correct: 0,
    why: [
      'Just det — en sekant är en rät linje mellan två punkter på en kurva.',
      'En tangent nuddar kurvan i endast en punkt och har samma lutning som kurvan just där — inte samma sak som en linje mellan två punkter.',
      'En asymptot är en linje som kurvan närmar sig men aldrig når — inte relaterat till två markerade punkter på kurvan.',
      'En normal är vinkelrät mot en tangent i en punkt — inte en linje mellan två punkter på kurvan.',
    ],
  },
  {
    question: 'Vilken formel ger sekantens lutning $k$ mellan punkterna $(x_1, y_1)$ och $(x_2, y_2)$?',
    choices: [
      '$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$',
      '$k = \\dfrac{x_2 - x_1}{y_2 - y_1}$',
      '$k = (y_2 - y_1)(x_2 - x_1)$',
      '$k = \\dfrac{y_2 + y_1}{x_2 + x_1}$',
    ],
    correct: 0,
    why: [
      'Precis — förändringen i y-led delat med förändringen i x-led.',
      'Kvoten är omvänd här — täljare och nämnare har bytt plats.',
      'Lutningen fås genom division av differenserna, inte genom multiplikation.',
      'Formeln bygger på differenser (minus) mellan koordinaterna, inte summor (plus).',
    ],
  },
  {
    question: 'Vad står sekantens lutning för vid tillämpningar, t.ex. när en storhet förändras över tiden?',
    choices: [
      'En genomsnittlig förändringshastighet',
      'Ett maximivärde',
      'Ett nollställe',
      'En amplitud',
    ],
    correct: 0,
    why: [
      'Rätt — sekantens lutning motsvarar den genomsnittliga förändringen per enhet i det valda intervallet.',
      'Ett maximivärde är en extrempunkt på kurvan och har inget direkt samband med sekantens lutning.',
      'Ett nollställe är där kurvan skär x-axeln — inte samma sak som en lutning.',
      'Amplitud beskriver svängningars utslag, inte en sekants lutning.',
    ],
  },
  {
    question: 'En sekant till $f(x) = x^2$ dras mellan $x = 2$ och $x = 4$. Vad blir sekantens lutning?',
    choices: [
      '$k = 6$',
      '$k = 12$',
      '$k = 3$',
      '$k = 20$',
    ],
    correct: 0,
    why: [
      'Rätt — $f(2) = 4$ och $f(4) = 16$ ger $k = \\dfrac{16 - 4}{4 - 2} = \\dfrac{12}{2} = 6$.',
      '12 är skillnaden i funktionsvärde ($16 - 4$), men den måste också delas med skillnaden i x-värde ($4 - 2 = 2$).',
      'Nämnaren är $4 - 2 = 2$, inte $4$ — kontrollera differensen i x-led igen.',
      'Att addera funktionsvärdena ($16 + 4 = 20$) i stället för att beräkna differensen ger fel svar.',
    ],
  },
  {
    question: 'Varför kan en kurvas lutning inte anges med ett enda tal, till skillnad från en rät linjes lutning?',
    choices: [
      'Eftersom en kurvas lutning varierar längs kurvan, medan en rät linje har samma lutning överallt',
      'Eftersom kurvor saknar lutning',
      'Eftersom en kurva alltid är brant lodrätt',
      'Eftersom bara räta linjer kan ha negativ lutning',
    ],
    correct: 0,
    why: [
      'Just därför använder vi en sekants medellutning för att beskriva en kurvas lutning i ett visst intervall.',
      'Kurvor har visst en lutning i varje punkt, men den skiljer sig från punkt till punkt.',
      'En kurva kan luta på vilket sätt som helst — den är inte alltid brant.',
      'Både kurvor och räta linjer kan ha negativ lutning (avta) i olika delar.',
    ],
  },
],

'ma3c-2.2': [
  {
    question: 'Vad är en tangent till en kurva?',
    choices: [
      'En rät linje som snuddar kurvan i exakt en punkt',
      'En rät linje som skär kurvan i två punkter',
      'En kurva som aldrig möter en annan kurva',
      'Kurvans högsta punkt',
    ],
    correct: 0,
    why: [
      'En tangent snuddar (tangerar) kurvan i en enda punkt, och dess lutning där är densamma som kurvans lutning i den punkten.',
      'En linje som skär kurvan i två punkter kallas i stället sekant.',
      'Det som beskrivs är snarare en asymptot — och även en asymptot kan i vissa fall mötas av kurvan.',
      'Kurvans högsta punkt är en extrempunkt, inte en tangent — en tangent är en linje, inte en punkt.',
    ],
  },
  {
    question: 'Två punkter $(x_1, y_1)$ och $(x_2, y_2)$ ligger på en tangent. Vilken formel ger tangentens lutning $k$?',
    choices: [
      '$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$',
      '$k = \\dfrac{x_2 - x_1}{y_2 - y_1}$',
      '$k = y_2 - y_1$',
      '$k = \\dfrac{y_2 + y_1}{x_2 + x_1}$',
    ],
    correct: 0,
    why: [
      'Riktningskoefficienten är kvoten mellan förändringen i $y$-led och förändringen i $x$-led, $k = \\dfrac{\\Delta y}{\\Delta x}$.',
      'Här är täljare och nämnare omvända — det ger det inverterade värdet, inte $k$.',
      'Detta saknar nämnare — utan att dela med förändringen i $x$-led får man inte en lutning.',
      'Att summera koordinaterna i stället för att bilda differenser ger inte lutningen mellan punkterna.',
    ],
  },
  {
    question: 'En tangent till en kurva går genom punkterna $(1, 4)$ och $(4, 13)$. Beräkna tangentens lutning $k$.',
    choices: [
      '$k = 3$',
      '$k = 9$',
      '$k = 0{,}33$',
      '$k = 2{,}25$',
    ],
    correct: 0,
    why: [
      '$k = \\dfrac{13 - 4}{4 - 1} = \\dfrac{9}{3} = 3$ — rätt insättning i formeln.',
      'Detta är bara $\\Delta y = 13 - 4 = 9$, utan att dela med $\\Delta x$.',
      'Här har täljare och nämnare bytt plats: $\\dfrac{4 - 1}{13 - 4} = \\dfrac{3}{9} = 0{,}33$ är inte lutningen.',
      'Detta motsvarar att dela $\\Delta y$ med $x_2 = 4$ i stället för med $\\Delta x = x_2 - x_1 = 3$.',
    ],
  },
  {
    question: 'En graf visar en tanks vattenvolym $V$ (liter) som funktion av tiden $t$ (min). Vilken enhet får tangentens lutning i en punkt på grafen?',
    choices: [
      'liter/min',
      'min/liter',
      'liter',
      'min',
    ],
    correct: 0,
    why: [
      'Enheten blir "enheten på $y$-axeln" per "enheten på $x$-axeln", dvs. liter per minut.',
      'Det är tvärtom — täljaren i enheten följer $y$-axeln och nämnaren $x$-axeln, inte omvänt.',
      'Enbart liter är enheten för volymen själv, inte för hur snabbt den förändras.',
      'Enbart minuter är enheten för tiden, inte för lutningen mellan volym och tid.',
    ],
  },
  {
    question: 'Vad står tangentens lutning för när en graf visar en storhet som funktion av tiden, t.ex. sträcka som funktion av tid?',
    choices: [
      'Förändringshastigheten vid just den tidpunkten',
      'Medelhastigheten över hela tidsintervallet',
      'Det totala värdet av storheten vid den tidpunkten',
      'En konstant som är densamma överallt på grafen',
    ],
    correct: 0,
    why: [
      'Tangentens lutning i en punkt motsvarar förändringshastigheten just vid den tidpunkten — det är därför tangenten, och inte sekanten, används för att beskriva ett ögonblick.',
      'Medelhastigheten över ett helt intervall beräknas i stället med en sekant mellan intervallets ändpunkter.',
      'Det totala värdet vid tidpunkten läses av direkt på $y$-axeln, inte från lutningen.',
      'Lutningen kan variera längs kurvan — bara för en rät linje är lutningen densamma överallt.',
    ],
  },
],

'ma3c-2.3': [
  {
    question: 'Vad kallas gränsvärdet $\\displaystyle\\lim_{h \\to 0} \\dfrac{f(a+h)-f(a)}{h}$, om det existerar?',
    choices: [
      'Derivatan av $f$ i punkten $x = a$, alltså $f\'(a)$',
      'Sekantens lutning',
      'Integralen av $f$',
      'Medellutningen över ett intervall',
    ],
    correct: 0,
    why: [
      'Precis — det är just detta gränsvärde som definierar derivatan (tangentens lutning) i punkten $x = a$.',
      'Sekantens lutning är uttrycket $\\dfrac{f(a+h)-f(a)}{h}$ INNAN gränsvärdet tas — när $h \\to 0$ övergår sekanten i tangenten.',
      'Integraler handlar om area under en kurva, inte om lutning i en punkt.',
      'Medellutningen över ett intervall är just $\\dfrac{f(a+h)-f(a)}{h}$ utan gränsvärde — det ger ett närmevärde, inte den exakta lutningen i en punkt.',
    ],
  },
  {
    question: 'Vilket uttryck ger sekantens lutning genom punkterna $(a, f(a))$ och $(a+h, f(a+h))$?',
    choices: [
      '$\\dfrac{f(a+h) - f(a)}{h}$',
      '$\\dfrac{f(a) - f(a+h)}{h}$',
      '$\\dfrac{f(a+h) + f(a)}{h}$',
      '$\\dfrac{h}{f(a+h) - f(a)}$',
    ],
    correct: 0,
    why: [
      'Lutningen $k = \\dfrac{y_2-y_1}{x_2-x_1}$ ger med $(x_1,y_1)=(a,f(a))$ och $(x_2,y_2)=(a+h,f(a+h))$ just $\\dfrac{f(a+h)-f(a)}{h}$, eftersom $x_2-x_1 = (a+h)-a = h$.',
      'Tecknet i täljaren är fel — det ska vara det senare funktionsvärdet minus det tidigare, inte tvärtom.',
      'Termerna i täljaren ska subtraheras, inte adderas — annars är det inte en lutning.',
      'Detta är lutningens invers ($1/k$), inte lutningen själv.',
    ],
  },
  {
    question: 'Varför kan man inte sätta $h = 0$ direkt i uttrycket $\\dfrac{f(a+h) - f(a)}{h}$ innan man har förenklat?',
    choices: [
      'Då blir nämnaren 0, vilket ger division med 0',
      'Då blir täljaren negativ',
      'Då försvinner variabeln $a$ ur uttrycket',
      'Det går utmärkt att göra det',
    ],
    correct: 0,
    why: [
      'Just det — med $h=0$ i nämnaren får vi division med 0, som är odefinierat. Därför måste vi först faktorisera bort $h$ ur täljare och nämnare.',
      'Täljarens tecken beror på funktionen, inte på att $h=0$ ger något odefinierat problem.',
      '$a$ finns kvar i uttrycket oavsett vad $h$ sätts till — problemet ligger i nämnaren.',
      'Det är precis vad man INTE får göra direkt — nämnaren blir 0 innan uttrycket förenklats.',
    ],
  },
  {
    question: 'Vad innebär det geometriskt att låta $h \\to 0$ i derivatans definition?',
    choices: [
      'Sekanten genom de två punkterna övergår i tangenten i punkten $x = a$',
      'Kurvan blir en rät linje överallt',
      'Funktionen blir konstant',
      'Punkten med $x$-koordinaten $a$ försvinner ur figuren',
    ],
    correct: 0,
    why: [
      'Precis — när den andra punkten $(a+h, f(a+h))$ närmar sig $(a, f(a))$ (dvs. $h \\to 0$) glider sekanten mot tangenten i punkten.',
      'Det är bara sekanten som övergår i tangenten, inte hela kurvan som rätas ut.',
      'Funktionen är oförändrad — det är bara vilken linje (sekant eller tangent) vi betraktar som ändras.',
      'Punkten $x=a$ är fortfarande kvar; det är den ANDRA punkten, $a+h$, som glider in mot den första när $h \\to 0$.',
    ],
  },
  {
    question: 'Vid beräkning av $f\'(a)$ för $f(x) = x^2$ förenklas täljaren $(a+h)^2 - a^2$ (innan förkortning med $h$) till vilket uttryck?',
    choices: [
      '$2ah + h^2$',
      '$a^2 + h^2$',
      '$2ah$',
      '$h^2$',
    ],
    correct: 0,
    why: [
      'Rätt — $(a+h)^2 - a^2 = a^2 + 2ah + h^2 - a^2 = 2ah + h^2$, en summa där båda termerna innehåller faktorn $h$.',
      'Här saknas korsledet $2ah$ och $a^2$ ska försvinna eftersom $-a^2$ tar bort det ursprungliga $a^2$.',
      'Termen $h^2$ har fallit bort — kvadreringen $(a+h)^2$ ger tre termer, inte två.',
      'Termen $2ah$ har fallit bort — bara $h^2$ räcker inte för att beskriva hela utvecklingen.',
    ],
  },
],

'ma3c-2.4': [
  {
    question: 'Vad står derivatan för vid tillämpningar inom t.ex. naturvetenskap eller ekonomi?',
    choices: [
      'Någon form av förändringshastighet vid en tidpunkt',
      'Funktionens värde vid en viss tidpunkt',
      'Grafens skärningspunkt med x-axeln',
      'Medelvärdet av funktionen över ett intervall',
    ],
    correct: 0,
    why: [
      'Precis — grafiskt är derivatan lutningen i en punkt, och i tillämpningar tolkas den som en momentan förändringshastighet.',
      'Det är funktionsvärdet $f(a)$, inte derivatan $f\'(a)$, som beskriver ett värde vid en viss tidpunkt.',
      'Nollställen beskriver var funktionen är noll, inte hur snabbt den förändras.',
      'Ett medelvärde över ett intervall är inte detsamma som en momentan förändringshastighet i en enda punkt.',
    ],
  },
  {
    question: 'En funktion $g(x)$ har enheten kg och variabeln $x$ har enheten sekunder. Vilken enhet har $g\'(x)$?',
    choices: [
      'kg/s',
      's/kg',
      'kg',
      's',
    ],
    correct: 0,
    why: [
      'Rätt — enheten för derivatan fås genom att ta "enheten för funktionen" per "enheten för variabeln", dvs. kg per s.',
      'Kvoten tas i motsatt ordning mot det korrekta: det är funktionens enhet per variabelns enhet, inte tvärtom.',
      'Det är enheten för $g(x)$ själv, inte för förändringshastigheten $g\'(x)$.',
      'Det är enheten för variabeln $x$, inte för derivatan.',
    ],
  },
  {
    question: 'Antalet besökare på en webbsida ges av $B(t)$, där $t$ är tiden i dygn. Om $B\'(4) = 150$, vad betyder det?',
    choices: [
      'Efter 4 dygn ökar antalet besökare med cirka 150 per dygn',
      'Efter 4 dygn har sidan haft totalt 150 besökare',
      'Efter 150 dygn har sidan haft 4 besökare',
      'Antalet besökare ökar med exakt 150 varje dygn under hela mätperioden',
    ],
    correct: 0,
    why: [
      'Precis — $B\'(4)$ är den momentana förändringshastigheten vid $t = 4$, med enheten besökare per dygn.',
      'Det totala antalet besökare vid $t = 4$ är $B(4)$, inte $B\'(4)$ — derivatan beskriver förändringstakten, inte ett funktionsvärde.',
      'Detta byter ut vilken variabel som är vilken och stämmer inte med hur $B\'(4) = 150$ ska läsas.',
      '$B\'(4) = 150$ gäller bara vid tidpunkten $t = 4$ — det säger inget om hur snabbt antalet besökare förändras vid andra tidpunkter.',
    ],
  },
  {
    question: 'Du ska mata in funktionen $f(x) = 0{,}3x^2 - 5$ i Geogebras inmatningsfält. Hur skriver du talet $0{,}3$?',
    choices: [
      '0.3',
      '0,3',
      '0:3',
      '3/10',
    ],
    correct: 0,
    why: [
      'Rätt — i Geogebras inmatningsfält används punkt som decimaltecken, så $0{,}3$ skrivs som 0.3.',
      'Det svenska decimalkommat tolkas inte som decimaltecken i Geogebras inmatningsfält.',
      'Kolon används inte som decimaltecken i Geogebra.',
      'Bråkform fungerar visserligen matematiskt, men frågan gäller hur decimaltalet $0{,}3$ specifikt ska skrivas.',
    ],
  },
  {
    question: 'En bils sträcka ges av $s(t)$ km, där $t$ är tiden i timmar. Vad är skillnaden mellan $s(2)$ och $s\'(2)$?',
    choices: [
      '$s(2)$ är sträckan efter 2 timmar; $s\'(2)$ är momentanhastigheten vid $t = 2$ timmar',
      '$s(2)$ och $s\'(2)$ betyder samma sak, bara skrivet på två sätt',
      '$s(2)$ är momentanhastigheten; $s\'(2)$ är den tillryggalagda sträckan',
      '$s(2)$ gäller vid $t = 2$ timmar, men $s\'(2)$ gäller vid $t = 2$ km',
    ],
    correct: 0,
    why: [
      'Precis — $s(2)$ är funktionsvärdet (sträckan i km), medan $s\'(2)$ är derivatans värde (momentanhastigheten i km/h) vid samma tidpunkt.',
      'De har olika enheter och olika betydelse: km respektive km/h, sträcka respektive hastighet.',
      'Detta är tvärtom — det är $s\'(2)$ som är hastigheten och $s(2)$ som är sträckan.',
      '$t = 2$ km ger ingen mening här — variabeln $t$ mäts i timmar, inte kilometer, i båda fallen.',
    ],
  },
],

'ma3c-2.5': [
  {
    question: 'Vad innebär det att en funktion är kontinuerlig i en punkt?',
    choices: [
      'Grafen hänger ihop där — den kan ritas utan att lyfta pennan',
      'Funktionen har ett maximum där',
      'Derivatan är noll där',
      'Funktionen är alltid positiv där',
    ],
    correct: 0,
    why: [
      'Precis — en kontinuerlig graf hänger ihop, utan hopp eller språng, i punkten.',
      'Kontinuitet handlar om att grafen hänger ihop, inte om extrempunkter.',
      'En derivata lika med noll beskriver en vågrät tangent, inte kontinuitet.',
      'En funktion kan vara kontinuerlig även om den är negativ — tecknet på funktionsvärdet spelar ingen roll.',
    ],
  },
  {
    question: 'Hur definieras absolutbeloppet $|a|$ av ett tal $a$?',
    choices: [
      'Talets avstånd till 0 på tallinjen',
      'Talet multiplicerat med $-1$',
      'Kvadratroten ur talet',
      'Talets motsats',
    ],
    correct: 0,
    why: [
      'Just det — $|{-3}| = 3$ eftersom avståndet från $-3$ till 0 är 3, och $|2| = 2$ eftersom avståndet från 2 till 0 är 2.',
      'Det gäller bara för negativa tal ($|{-3}| = -1 \\cdot (-3) = 3$) — för positiva tal skulle det ge fel tecken ($|2| \\ne -2$).',
      'Kvadratroten är bara definierad för icke-negativa tal och sammanfaller inte i allmänhet med absolutbeloppet.',
      'Motsatsen till $a$ är $-a$, vilket är negativt när $a$ är positivt — absolutbeloppet är alltid icke-negativt.',
    ],
  },
  {
    question: 'Vilket av följande är INTE ett skäl till att en funktion saknar derivata i en punkt?',
    choices: [
      'Funktionen är deriverbar och kontinuerlig i punkten',
      'Funktionen har en hörnpunkt där',
      'Funktionen är diskontinuerlig där (t.ex. ett hopp)',
      'Funktionen är inte definierad där (t.ex. ett språng)',
    ],
    correct: 0,
    why: [
      'Om funktionen redan är deriverbar i punkten finns derivatan förstås där — detta är motsatsen till ett skäl att sakna derivata.',
      'I en hörnpunkt är lutningen olika från vänster och höger, så derivatan saknar ett entydigt värde.',
      'En diskontinuerlig funktion (t.ex. med ett hopp) kan inte ha en väldefinierad derivata i den punkten.',
      'En funktion som inte är definierad i en punkt kan inte heller ha en derivata där.',
    ],
  },
  {
    question: 'Varför är $f(x) = |x|$ inte deriverbar i $x = 0$?',
    choices: [
      'Eftersom lutningen är $-1$ från vänster och $1$ från höger — gränsvärdena är olika',
      'Eftersom funktionen inte är definierad i $x = 0$',
      'Eftersom funktionen är diskontinuerlig i $x = 0$',
      'Eftersom $f(0) = 0$',
    ],
    correct: 0,
    why: [
      'Rätt — vänster- och högergränsvärdet för derivatan skiljer sig åt, så derivatan saknar ett entydigt värde i hörnpunkten.',
      '$f(x) = |x|$ är definierad överallt, även i $x = 0$ (där $f(0) = 0$).',
      '$f(x) = |x|$ hänger ihop i hela sin graf, även i $x = 0$ — den är kontinuerlig där.',
      'Att $f(0) = 0$ säger bara vad funktionsvärdet är — det säger inget om varför derivatan saknas.',
    ],
  },
  {
    question: 'En funktions graf har en öppen ring i punkten $(2, 5)$ och en fylld prick i punkten $(2, 3)$. Vad kan vi dra för slutsats?',
    choices: [
      'Funktionen har ett hopp i $x = 2$ och är varken kontinuerlig eller deriverbar där',
      'Funktionen är kontinuerlig men inte deriverbar i $x = 2$',
      'Funktionen är deriverbar i $x = 2$',
      'Funktionen är inte definierad i $x = 2$',
    ],
    correct: 0,
    why: [
      'Den öppna ringen visar att gränsvärdet från ena hållet är 5 medan det faktiska funktionsvärdet (fylld prick) är 3 — grafen hänger inte ihop, dvs. ett hopp. Då är funktionen varken kontinuerlig eller deriverbar i punkten.',
      'Ett hopp innebär att grafen inte hänger ihop, så funktionen är inte ens kontinuerlig i $x = 2$ — inte bara icke-deriverbar.',
      'Deriverbarhet kräver kontinuitet, och en funktion med ett hopp är inte kontinuerlig i punkten.',
      'Den fyllda pricken vid $(2, 3)$ visar tvärtom att funktionen faktiskt är definierad i $x = 2$, med värdet 3.',
    ],
  },
],

'ma3c-3.1': [
  {
    question: 'Vilken deriveringsregel gäller för $f(x) = x^n$?',
    choices: [
      '$f\'(x) = nx^{n-1}$',
      '$f\'(x) = nx^n$',
      '$f\'(x) = x^{n-1}$',
      '$f\'(x) = nx^{n+1}$',
    ],
    correct: 0,
    why: [
      'Precis — vi multiplicerar ned exponenten framför och minskar den sedan med 1.',
      'Exponenten ska minskas med 1 i svaret, inte lämnas oförändrad.',
      'Exponenten $n$ ska också multipliceras ned framför x-termen, inte bara försvinna ur svaret.',
      'Exponenten ska minskas med 1, inte ökas.',
    ],
  },
  {
    question: 'Derivera $f(x) = 4x^5$.',
    choices: [
      '$f\'(x) = 20x^4$',
      '$f\'(x) = 20x^5$',
      '$f\'(x) = 4x^4$',
      '$f\'(x) = 5x^4$',
    ],
    correct: 0,
    why: [
      'Rätt — vi multiplicerar ned exponenten 5 till koefficienten 4 (vilket ger 20) och minskar exponenten med 1.',
      'Exponenten i svaret ska minskas med 1 (till 4), inte lämnas som 5.',
      'Koefficienten 4 ska multipliceras med exponenten 5 (vilket ger 20) — den ska inte stå oförändrad.',
      'Ursprungskoefficienten 4 måste också multipliceras in i svaret — annars försvinner den.',
    ],
  },
  {
    question: 'Vad är derivatan av en konstant funktion $f(x) = a$?',
    choices: [
      '$f\'(x) = 0$',
      '$f\'(x) = a$',
      '$f\'(x) = 1$',
      '$f\'(x) = ax$',
    ],
    correct: 0,
    why: [
      'Precis — grafen till en konstant funktion är en horisontell linje, och lutningen (derivatan) är alltid 0.',
      'Detta är funktionens eget värde, inte dess derivata — en konstant funktions derivata är alltid 0.',
      'Derivatan är 0, inte 1, oavsett vilket tal $a$ har.',
      'En konstant funktion innehåller ingen $x$-term, så derivatan kan inte bli $ax$.',
    ],
  },
  {
    question: 'Vilken är derivatan av förstagradsfunktionen $f(x) = 9x$?',
    choices: [
      '$f\'(x) = 9$',
      '$f\'(x) = 9x$',
      '$f\'(x) = 0$',
      '$f\'(x) = x$',
    ],
    correct: 0,
    why: [
      'Rätt — vid derivering av en $x$-term av grad 1 "försvinner" $x$:et, och kvar blir bara koefficienten 9.',
      'Vid derivering ska $x$:et försvinna — svaret kan inte längre innehålla $x$.',
      'Derivatan är 0 bara för konstanta funktioner utan någon $x$-term, inte för $f(x) = 9x$.',
      'Koefficienten 9 måste vara med i svaret — den försvinner inte vid derivering.',
    ],
  },
  {
    question: 'Hur deriverar man $f(x) = \\dfrac{g(x)}{a}$, där $a$ är en konstant?',
    choices: [
      'Man deriverar täljaren $g(x)$ med de vanliga deriveringsreglerna och behåller nämnaren $a$',
      'Man deriverar både täljaren och nämnaren',
      'Man behåller täljaren och deriverar bara nämnaren $a$',
      'Man kan inte derivera ett uttryck med en konstant i nämnaren',
    ],
    correct: 0,
    why: [
      'Precis — en konstant nämnare kan ses som en koefficient, så täljaren deriveras som vanligt medan nämnaren står kvar oförändrad.',
      'Nämnaren $a$ är en konstant och ska inte deriveras — bara täljaren $g(x)$ deriveras.',
      'Det är täljaren $g(x)$ som ska deriveras, inte nämnaren — nämnaren $a$ behålls oförändrad.',
      'Uttrycket går utmärkt att derivera — nämnaren $a$ fungerar precis som en vanlig koefficient.',
    ],
  },
],

'ma3c-3.2': [
  {
    question: 'Vad innebär det att derivera en polynomfunktion "term för term"?',
    choices: [
      'Att varje term i polynomet deriveras var för sig, och att derivatorna sedan adderas',
      'Att bara den term som har högst exponent deriveras',
      'Att man deriverar en gång för varje term i nämnaren',
      'Att man sätter alla termer lika med noll och löser ekvationen',
    ],
    correct: 0,
    why: [
      'Precis — varje term deriveras separat med deriveringsreglerna, och summan av dessa derivator ger hela funktionens derivata.',
      'Alla termer måste deriveras, inte bara den med högst exponent — annars försvinner information ur derivatan.',
      'Nämnaren i ett bråkuttryck har inget med antalet termer i polynomet att göra.',
      'Det beskriver hur man löser en ekvation, inte hur man deriverar en funktion.',
    ],
  },
  {
    question: 'Funktionen $f(x) = x^2 + 4x - 7$ deriverades i avsnittet både med derivatans definition och term för term. Vilket samband stämmer?',
    choices: [
      'Båda metoderna ger samma derivata, $f\'(x) = 2x + 4$',
      'Derivatans definition ger $f\'(x) = 2x + 4$, men term för term ger ett annat svar',
      'De två metoderna kan bara användas på olika typer av funktioner',
      'Derivatans definition fungerar inte för polynom med fler än en term',
    ],
    correct: 0,
    why: [
      'Term för term-metoden bygger på samma deriveringsregler och ger alltid samma resultat som derivatans definition — precis det som räkneexemplet visade.',
      'Tvärtom ger de två metoderna exakt samma derivata; term för term är bara en snabbare väg till samma svar.',
      'Båda metoderna fungerar på alla polynomfunktioner, oavsett hur många termer de har.',
      'Derivatans definition gäller för alla deriverbara funktioner, inklusive polynom med flera termer — den ligger till grund för alla deriveringsregler.',
    ],
  },
  {
    question: 'Derivera $f(x) = 6x^3 - 2x + 9$.',
    choices: [
      `$f'(x) = 18x^2 - 2$`,
      `$f'(x) = 18x^2 - 2x$`,
      `$f'(x) = 6x^2 - 2$`,
      `$f'(x) = 18x^2 - 2 + 9$`,
    ],
    correct: 0,
    why: [
      'Varje term deriveras för sig: $6x^3$ ger $18x^2$, $-2x$ ger $-2$, och konstanten $9$ försvinner.',
      'Exponenten på $x$ i den deriverade termen ska minska med 1 jämfört med ursprungstermen — här blir det $x^2$, inte $x$.',
      'Koefficienten $6$ ska multipliceras med exponenten $3$ innan exponenten minskas, dvs. $3 \\cdot 6 = 18$, inte bara $6$.',
      'Konstanttermen $9$ har derivatan $0$ och ska inte finnas kvar i svaret.',
    ],
  },
  {
    question: 'Vad måste göras innan man deriverar $f(x) = (3x - 1)^2$?',
    choices: [
      'Parentesen måste utvecklas till ett polynom innan man deriverar term för term',
      'Man deriverar parentesuttrycket direkt, utan förberedelse',
      'Man sätter in ett värde på $x$ innan man deriverar',
      'Man förkortar uttrycket med en gemensam faktor innan man deriverar',
    ],
    correct: 0,
    why: [
      'Deriveringsregeln term för term gäller bara när funktionen är skriven som en summa av termer — kvadraten måste därför utvecklas till ett polynom först.',
      'Att derivera parentesuttrycket direkt utan att utveckla det ger fel svar.',
      'Att sätta in ett specifikt $x$-värde är ett separat steg som görs efter deriveringen, om man vill beräkna derivatans värde i en punkt.',
      'Förkortning används för att förenkla rationella uttryck (bråk), inte för att förbereda derivering av ett polynom.',
    ],
  },
  {
    question: 'Låt $f(x) = 2x^2 - 3x$. Vad är $f\'(1)$?',
    choices: [
      `$1$`,
      `$-1$`,
      `$4$`,
      `$2$`,
    ],
    correct: 0,
    why: [
      'Derivatan är $f\'(x) = 4x - 3$, så $f\'(1) = 4 \\cdot 1 - 3 = 1$.',
      'Ett teckenfel har smugit sig in — $4 \\cdot 1 - 3 = 1$, inte $-1$.',
      'Termen $-3x$ ger derivatan $-3$; den försvinner inte när $x = 1$ sätts in.',
      'Det är koefficienten framför $x^2$ i derivatan, inte derivatans värde i punkten $x = 1$.',
    ],
  },
],

'ma3c-3.3': [
  {
    question: 'Gäller potensregeln $f\'(x) = ax^{a-1}$ för $f(x) = x^a$ bara när $a$ är ett positivt heltal?',
    choices: [
      'Nej, den gäller för alla reella tal $a$ (om $x > 0$)',
      'Ja, bara för positiva heltal',
      'Ja, men bara för negativa heltal',
      'Nej, den gäller bara för bråkexponenter',
    ],
    correct: 0,
    why: [
      'Med derivatans definition visar man att regeln fungerar lika bra för bråkexponenter (t.ex. $a = 1/2$) och negativa exponenter (t.ex. $a = -1$) — regeln är alltså generell.',
      'Regeln gäller betydligt bredare — även bråk- och negativa exponenter ger samma enkla mönster.',
      'Regeln gäller inte bara negativa heltal, utan alla reella exponenter.',
      'Bråkexponenter är bara ett av flera fall regeln täcker — den gäller även heltal och negativa exponenter.',
    ],
  },
  {
    question: 'Hur skriver man om $\\dfrac{1}{x^5}$ som en potens innan man deriverar?',
    choices: [
      '$x^{-5}$',
      '$x^{5}$',
      '$-x^{5}$',
      '$x^{1/5}$',
    ],
    correct: 0,
    why: [
      'Att flytta en faktor från nämnare till täljare byter tecken på exponenten, så $\\dfrac{1}{x^5} = x^{-5}$.',
      'Tecknet på exponenten måste bytas när $x^5$ flyttas upp från nämnaren till täljaren.',
      'Minustecknet ska sitta i exponenten, inte framför hela uttrycket — annars byter uttrycket värde.',
      'Detta är hur man skriver om en rot ($\\sqrt[5]{x}$), inte hur man flyttar en nämnare till täljaren.',
    ],
  },
  {
    question: 'Hur skriver man om $\\sqrt{x}$ som en potens innan man deriverar?',
    choices: [
      '$x^{1/2}$',
      '$x^{2}$',
      '$x^{-1/2}$',
      '$2x$',
    ],
    correct: 0,
    why: [
      'Kvadratroten ur $x$ motsvarar exponenten $1/2$, dvs. $\\sqrt{x} = x^{1/2}$.',
      'Exponenten 2 svarar mot $x^2$, inte mot roten ur $x$.',
      'Exponenten ska vara positiv $1/2$ — det negativa tecknet hör till $\\dfrac{1}{\\sqrt{x}}$, inte till $\\sqrt{x}$.',
      'Att skriva om roten som en potens ger $x^{1/2}$, inte ett uttryck med $x$ multiplicerat med en konstant.',
    ],
  },
  {
    question: 'Vad blir $f\'(x)$ om $f(x) = \\dfrac{1}{x^2}$?',
    choices: [
      '$f\'(x) = -\\dfrac{2}{x^3}$',
      '$f\'(x) = \\dfrac{2}{x^3}$',
      '$f\'(x) = -\\dfrac{1}{x}$',
      '$f\'(x) = -2x$',
    ],
    correct: 0,
    why: [
      'Med $f(x) = x^{-2}$ ger potensregeln $f\'(x) = -2x^{-3} = -\\dfrac{2}{x^3}$.',
      'Tecknet blir fel — exponenten $-2$ multiplicerad ner ger ett negativt tal, inte ett positivt.',
      'Exponenten ska minskas med 1 (från $-2$ till $-3$), inte försvinna helt.',
      'Man multiplicerar ner exponenten $-2$ som faktor och minskar den med 1 i potensen — resultatet är fortfarande ett bråk, inte ett förstagradsuttryck.',
    ],
  },
  {
    question: 'Hur deriverar man enklast $f(x) = \\dfrac{5x - 3}{x}$, som har $x$ i både täljare och nämnare?',
    choices: [
      'Dela upp bråket i två termer, $5 - 3x^{-1}$, och derivera termvis',
      'Derivera täljaren och nämnaren var för sig och sätt kvoten av derivatorna',
      'Förkorta bort $x$ direkt i bråket före derivering',
      'Bråket kan inte deriveras eftersom $x$ finns i nämnaren',
    ],
    correct: 0,
    why: [
      'Genom att dela upp $\\dfrac{5x - 3}{x}$ i $\\dfrac{5x}{x} - \\dfrac{3}{x} = 5 - 3x^{-1}$ kan varje term deriveras enkelt med potensregeln.',
      'Att derivera täljare och nämnare separat och dividera derivatorna är inte hur ett kvotuttryck deriveras.',
      'Man får inte förkorta bort $x$ ur $5x - 3$, eftersom $-3$ saknar faktorn $x$ — de är inte en gemensam faktor för hela täljaren.',
      'Uttryck med $x$ i nämnaren kan deriveras — man skriver bara om dem som potenser med negativa exponenter först.',
    ],
  },
],

'ma3c-3.4': [
  {
    question: 'Vad är derivatan av $f(x) = e^x$?',
    choices: [
      '$f\'(x) = e^x$',
      '$f\'(x) = xe^{x-1}$',
      '$f\'(x) = 0$',
      '$f\'(x) = e$',
    ],
    correct: 0,
    why: [
      'Funktionen $e^x$ är sin egen derivata — det är just det som gör talet $e$ speciellt.',
      'Det är regeln för potensfunktioner ($x^n$), inte för exponentialfunktioner där variabeln sitter i exponenten.',
      'Variabeln $x$ sitter i exponenten, så funktionen är inte konstant — derivatan är inte 0.',
      'Derivatan behåller $x$ i exponenten, den blir inte en ren konstant.',
    ],
  },
  {
    question: 'Varför gäller att derivatan av $f(x) = e^x$ är precis $f\'(x) = e^x$?',
    choices: [
      'Talet $e$ är definierat som den bas där gränsvärdet $k = \\lim\\limits_{h\\to 0}\\dfrac{a^h-1}{h}$ blir exakt 1',
      'Talet $e$ är det enda talet som är sin egen kvadrat',
      'Alla exponentialfunktioner har samma derivata som sig själva',
      '$e$ är en variabel, inte en konstant, så den deriveras precis som $x$',
    ],
    correct: 0,
    why: [
      'Derivatan av $a^x$ är $a^x \\cdot k$ där $k$ beror på basen $a$. Just för $a = e$ blir $k = 1$, så derivatan blir exakt $e^x$.',
      'Det är en annan egenskap (och stämmer förresten inte för $e$) — det handlar inte om varför derivatan blir sig själv.',
      'Tvärtom varierar $k$-värdet med basen $a$; det är bara för basen $e$ som $k = 1$.',
      '$e$ är ett bestämt tal (en konstant, $\\approx 2{,}72$), precis som $\\pi$ — det är $x$ som är variabeln.',
    ],
  },
  {
    question: 'Vad är ett ungefärligt värde för talet $e$?',
    choices: [
      '$e \\approx 2{,}72$',
      '$e \\approx 3{,}14$',
      '$e \\approx 1{,}41$',
      '$e \\approx 1{,}00$',
    ],
    correct: 0,
    why: [
      'Talet $e$ är ett irrationellt tal, $e = 2{,}718\\ldots \\approx 2{,}72$.',
      'Det är en avrundning av $\\pi$, inte av $e$.',
      'Det är en avrundning av $\\sqrt{2}$, inte av $e$.',
      'Om $k = 1$ (talet $e$ som bas), inte om basen själv skulle vara 1 — då vore funktionen konstant och inte alls intressant att derivera.',
    ],
  },
  {
    question: 'Derivera $f(x) = 6e^x$.',
    choices: [
      '$f\'(x) = 6e^x$',
      '$f\'(x) = e^x$',
      '$f\'(x) = 6xe^{x-1}$',
      '$f\'(x) = 6e^{x-1}$',
    ],
    correct: 0,
    why: [
      'En koefficient framför $e^x$ behålls oförändrad vid derivering, precis som för alla andra funktioner.',
      'Koefficienten framför en term ska behållas vid derivering, inte försvinna.',
      'Det är regeln för potensfunktioner ($x^n$) som blandas ihop här — $e^x$ deriveras inte på det sättet.',
      'Exponenten på $e$ ska inte minskas med 1 — den regeln gäller potensfunktioner, inte exponentialfunktioner med basen $e$.',
    ],
  },
  {
    question: 'Funktionen är $f(x) = e^x + 4$. Vad är $f\'(x)$?',
    choices: [
      '$f\'(x) = e^x$',
      '$f\'(x) = e^x + 4$',
      '$f\'(x) = 4e^x$',
      '$f\'(x) = e^{x+4}$',
    ],
    correct: 0,
    why: [
      'Konstanten $+4$ försvinner vid derivering (derivatan av en konstant är 0), så bara $e^x$ blir kvar.',
      'Konstanttermen ska försvinna vid derivering — den ska inte hänga kvar oförändrad.',
      'Konstanten $4$ adderas, den ska inte bli en multiplikativ koefficient framför $e^x$.',
      'Uttrycket deriveras termvis; $4$ är en egen additiv term, inte en del av exponenten.',
    ],
  },
],

'ma3c-3.5': [
  {
    question: 'Vad är $f\'(x)$ om $f(x) = e^{7x}$?',
    choices: [
      '$7e^{7x}$',
      '$e^{7x}$',
      '$7e^{x}$',
      '$e^{7}$',
    ],
    correct: 0,
    why: [
      'Derivatan av $e^{kx}$ är $ke^{kx}$ — koefficienten i exponenten (7) multipliceras in framför.',
      'Här saknas koefficienten 7 som exponenten faktiskt har — den ska multipliceras in, inte utelämnas.',
      'Exponenten ska vara oförändrad ($7x$, inte $x$) — bara koefficienten flyttas fram, funktionen skrivs annars av som den var.',
      'Det saknas både rätt exponent och rätt koefficient — $f(x)$ deriveras inte till en konstant.',
    ],
  },
  {
    question: 'Vad är $f\'(x)$ om $f(x) = 3^x$?',
    choices: [
      '$3^x \\ln 3$',
      '$3^x$',
      '$x \\cdot 3^{x-1}$',
      '$\\ln 3$',
    ],
    correct: 0,
    why: [
      'Basen 3 är inte $e$, så enligt regeln $f\'(x) = a^x \\ln a$ multipliceras funktionen med $\\ln 3$.',
      'Det stämmer bara för basen $e$ ($f(x) = e^x$ har derivatan $e^x$) — med en annan bas måste man multiplicera med $\\ln$ för den basen.',
      'Det är potensregeln för $x^n$ med konstant exponent — här är det tvärtom, $x$ som står i exponenten och 3 som är basen.',
      'Det är bara $\\ln$-faktorn, men själva funktionen $3^x$ saknas i svaret.',
    ],
  },
  {
    question: 'Vad innebär $\\ln 5$?',
    choices: [
      'Det tal $e$ ska upphöjas till för att svaret ska bli 5',
      'Talet 5 upphöjt till $e$',
      'Tiologaritmen av 5',
      'Talet $e$ dividerat med 5',
    ],
    correct: 0,
    why: [
      '$\\ln$ är den naturliga logaritmen, dvs. $e$-logaritmen — $\\ln 5$ svarar på "vad ska $e$ upphöjas till för att bli 5?".',
      'Det är $e^5$, inte $\\ln 5$ — ordningen mellan bas och exponent är omvänd.',
      'Tiologaritmen har basen 10 och skrivs $\\lg$ — $\\ln$ har i stället basen $e$.',
      '$\\ln 5$ är en logaritm, inte en division mellan $e$ och 5.',
    ],
  },
  {
    question: 'Vad händer med koefficienten framför en exponentialfunktion, t.ex. i $f(x) = 4e^{3x}$, när man deriverar?',
    choices: [
      'Den behålls oförändrad framför',
      'Den försvinner',
      'Den kvadreras',
      'Den blir en exponent',
    ],
    correct: 0,
    why: [
      'En konstant faktor framför funktionen följer med rakt av — bara faktorer i exponenten påverkar hur derivatan bildas.',
      'Koefficienten framför en exponentialfunktion försvinner aldrig vid derivering, till skillnad från t.ex. en konstantterm i en summa.',
      'Ingenting i deriveringsregeln kvadrerar koefficienten framför funktionen.',
      'Koefficienten framför funktionen byter inte plats med exponenten vid derivering.',
    ],
  },
  {
    question: 'Enligt "lathunden" för att derivera exponentialfunktioner ska man multiplicera med $\\ln$ för basen …',
    choices: [
      '… bara om basen är någon annan än $e$',
      '… alltid, oavsett bas',
      '… bara om det finns en koefficient framför funktionen',
      '… aldrig',
    ],
    correct: 0,
    why: [
      'Är basen $e$ gäller $\\ln e = 1$, så den faktorn syns inte — därför multiplicerar man bara med $\\ln$ när basen är en annan än $e$.',
      'Med basen $e$ skulle det innebära att multiplicera med $\\ln e = 1$, vilket inte ändrar något — regeln gäller alltså bara andra baser.',
      'Om basen ska ha en $\\ln$-faktor eller ej avgörs av basen, inte av om det finns en koefficient framför funktionen.',
      'Utan $\\ln$-faktorn skulle t.ex. $f(x) = 2^x$ få samma derivata som $f(x) = e^x$, vilket är fel — baserna ger olika brantheter.',
    ],
  },
],

'ma3c-3.6': [
  {
    question: 'Derivatan av en modell är negativ vid en viss tidpunkt. Hur tolkar vi det?',
    choices: [
      'Storheten minskar vid den tidpunkten',
      'Storheten ökar vid den tidpunkten',
      'Storheten är noll vid den tidpunkten',
      'Modellen innehåller ett räknefel',
    ],
    correct: 0,
    why: [
      'En negativ derivata betyder att funktionens värde avtar just då — en minskning.',
      'En ökning svarar mot en positiv derivata, inte en negativ.',
      'Att storheten är noll säger derivatan inget om — det handlar om funktionens eget värde, inte förändringstakten.',
      'En negativ derivata är ett giltigt, tolkningsbart resultat — inte ett tecken på ett fel.',
    ],
  },
  {
    question: 'En funktion $f(t)$ mäts i liter och $t$ i minuter. Vilken enhet får $f\'(t)$?',
    choices: [
      'Liter per minut',
      'Minuter per liter',
      'Liter gånger minuter',
      'Liter',
    ],
    correct: 0,
    why: [
      'Enheten för derivatan är "enheten för funktionen" per "enheten för variabeln" — här liter per minut.',
      'Ordningen är omvänd — det är funktionens enhet delat med variabelns enhet, inte tvärtom.',
      'Derivatan är ett kvot-begrepp (förändring per tidsenhet), inte en produkt.',
      'Att bara ange liter (samma enhet som $f$ själv) glömmer bort att derivatan är en förändringshastighet per tidsenhet.',
    ],
  },
  {
    question: 'Tangenten till kurvan $y = f(x)$ i punkten där $x = a$ har ekvationen $y = kx + m$. Hur bestäms $k$?',
    choices: [
      '$k = f\'(a)$',
      '$k = f(a)$',
      '$k = f\'\'(a)$',
      '$k = a \\cdot f(a)$',
    ],
    correct: 0,
    why: [
      'Riktningskoefficienten är tangentens (och kurvans) lutning i punkten, vilket är derivatans värde där.',
      '$f(a)$ ger tangeringspunktens $y$-koordinat, inte lutningen.',
      'Andraderivatan beskriver hur lutningen själv förändras, inte lutningen i sig.',
      'Detta blandar ihop $x$-koordinaten och funktionsvärdet med lutningen — de har inget sådant samband.',
    ],
  },
  {
    question: 'Varför räcker det inte att bara känna $k = f\'(a)$ för att skriva tangentens fullständiga ekvation?',
    choices: [
      'Man måste också bestämma $m$ genom att sätta in tangeringspunktens koordinater',
      '$k$ bestämmer alltid hela linjen på egen hand',
      '$m$ är alltid noll för en tangent',
      'Tangentens ekvation behöver ingen konstant $m$',
    ],
    correct: 0,
    why: [
      'Räta linjens ekvation har två konstanter, $k$ och $m$. Lutningen $k$ fixerar bara riktningen — $m$ läggs till genom att kräva att linjen går genom tangeringspunkten $(a, f(a))$.',
      'Oändligt många linjer har samma lutning $k$ men olika $m$ — bara en av dem går genom rätt punkt.',
      '$m$ är $y$-värdet där linjen skär $y$-axeln och beror på var tangeringspunkten ligger — det är sällan noll.',
      'Utan $m$ vet man bara linjens lutning, inte var den befinner sig i koordinatsystemet.',
    ],
  },
  {
    question: 'Kurvan $y = x^2 - 4x + 1$ har en tangent i punkten där $x = 3$. Vad är tangentens lutning $k = y\'(3)$?',
    choices: [
      '2',
      '3',
      '6',
      '−2',
    ],
    correct: 0,
    why: [
      'Derivatan är $y\' = 2x - 4$, så $y\'(3) = 2 \\cdot 3 - 4 = 6 - 4 = 2$.',
      'Detta är $x$-koordinaten, inte lutningen — den måste beräknas via derivatan.',
      'Detta fås om man glömmer att subtrahera $4$ efter att ha satt in $x = 3$ i $2x$.',
      'Tecknet är fel — $2 \\cdot 3 - 4 = 2$, inte $-2$.',
    ],
  },
],

'ma3c-3.7': [
  {
    question: 'Vilket Geogebra-kommando ger derivatans värde vid en given punkt, t.ex. vid $x = 3$, för en redan definierad funktion $f$?',
    choices: [
      `f'(3)`,
      'f(3)',
      'NLös(f(x) = 3)',
      'Lös(f(x) = 3)',
    ],
    correct: 0,
    why: [
      `Just det — när funktionen $f(x)$ redan är definierad ger f'(3) derivatans värde i punkten $x = 3$.`,
      'f(3) ger funktionens eget värde i $x = 3$, inte lutningen där.',
      'NLös löser ekvationer numeriskt — det ger inte derivatans värde direkt.',
      'Lös löser ekvationer exakt (symboliskt) — det är inte samma sak som att läsa av derivatans värde.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan kommandona NLös(Ekvation) och Lös(Ekvation) i Geogebra?',
    choices: [
      'NLös ger svaret som decimaltal, Lös ger svaret exakt med symboler',
      'NLös löser bara andragradsekvationer, Lös löser alla ekvationer',
      'NLös deriverar ekvationen, Lös bestämmer funktionsvärdet',
      'Det är samma kommando fast med olika namn',
    ],
    correct: 0,
    why: [
      'Exakt — NLös returnerar en numerisk lösning (decimaltal), medan Lös ger den exakta, symboliska lösningen.',
      'Båda kommandona fungerar på alla typer av ekvationer — det är svarets form som skiljer dem åt, inte vilka ekvationer de klarar.',
      'Ingetdera kommando deriverar eller ger enbart ett funktionsvärde — båda löser ekvationer.',
      'De ger olika typer av svar (numeriskt respektive exakt), så de är inte utbytbara.',
    ],
  },
  {
    question: 'En exponentialfunktion skrivs $y = C \\cdot a^x$. Hur skriver man om den på formen med basen $e$?',
    choices: [
      '$y = Ce^{kx}$ där $e^k = a$',
      '$y = Ce^{ax}$ där $k = a$',
      '$y = Ce^{x/k}$ där $k = a$',
      '$y = C^k e^x$ där $k = a$',
    ],
    correct: 0,
    why: [
      'Rätt uppställning — förändringsfaktorn $a$ motsvaras av $e^k$, så $k = \\ln a$.',
      'Exponenten ska innehålla $k$, inte $a$ direkt — sambandet är $e^k = a$, inte $k = a$.',
      'Det är inte division i exponenten, utan multiplikation: $kx$.',
      'Startvärdet $C$ ska inte upphöjas — det är bara koefficienten framför exponentialuttrycket.',
    ],
  },
  {
    question: 'Hur bestämmer man koefficienten $k$ när en modell $y = C \\cdot a^x$ ska skrivas om med basen $e$?',
    choices: [
      '$k = \\ln a$, eftersom $e^k = a$',
      '$k = a$ eftersom baserna är lika',
      '$k = \\log a$ med basen 10',
      '$k$ kan inte bestämmas utan att känna $C$',
    ],
    correct: 0,
    why: [
      'Precis — logaritmera båda led i $e^k = a$: $\\ln e^k = \\ln a$, dvs. $k \\cdot \\ln e = \\ln a$, och eftersom $\\ln e = 1$ blir $k = \\ln a$.',
      'Basbytet kräver logaritmering — $k$ är inte samma tal som $a$.',
      'Det är den naturliga logaritmen (ln, med basen $e$) som används här, inte 10-logaritmen.',
      '$k$ beror bara på förändringsfaktorn $a$ — startvärdet $C$ påverkar inte $k$.',
    ],
  },
  {
    question: `En funktions graf har som brantast negativa lutning vid en viss punkt. Vad motsvarar det i grafen till derivatan $f'(x)$?`,
    choices: [
      'Derivatans minimipunkt',
      'Derivatans nollställe',
      'Derivatans maximipunkt',
      `Punkten där $f'(x) = f(x)$`,
    ],
    correct: 0,
    why: [
      `Ja — lutningen är som mest negativ just där derivatan $f'(x)$ själv har sitt minsta värde, dvs. i derivatans minimipunkt.`,
      `Ett nollställe till $f'(x)$ betyder att lutningen är noll (en extrempunkt hos $f$), inte att lutningen är som mest negativ.`,
      `En maximipunkt hos $f'(x)$ ger i stället den brantaste positiva lutningen.`,
      `Det är inget villkor som beskriver extrem lutning — $f'(x)$ och $f(x)$ är olika funktioner.`,
    ],
  },
],

'ma3c-5.1': [
  {
    question: 'Vad menas med att $F(x)$ är en primitiv funktion till $f(x)$?',
    choices: [
      'Att $F\'(x) = f(x)$',
      'Att $f\'(x) = F(x)$',
      'Att $F(x)$ är andraderivatan av $f(x)$',
      'Att $F(x)$ och $f(x)$ är samma funktion fast omskriven',
    ],
    correct: 0,
    why: [
      'Precis — en primitiv funktion är en funktion vars derivata ger tillbaka den ursprungliga funktionen.',
      'Det är tvärtom: det är $F$ som deriveras till $f$, inte $f$ som deriveras till $F$.',
      'Andraderivatan fås genom att derivera två gånger, inte genom att gå baklänges ett steg.',
      'De är i allmänhet olika funktioner — $F$ har en högre exponent (eller motsvarande) än $f$.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan att ange "en primitiv funktion" och "samtliga primitiva funktioner" till $f(x)$?',
    choices: [
      'Samtliga primitiva funktioner innehåller en generell konstant $C$ som en primitiv funktion inte behöver ha',
      'En primitiv funktion måste alltid vara en konstant funktion',
      'Samtliga primitiva funktioner är alltid lika med noll',
      'Det finns ingen skillnad, de betyder samma sak',
    ],
    correct: 0,
    why: [
      'Alla funktioner av formen $F(x) + C$ har samma derivata $f(x)$, så samtliga primitiva funktioner skrivs med konstanten $C$ på slutet.',
      'En primitiv funktion kan vara vilken funktion som helst — det beror på $f(x)$, den behöver inte alls vara konstant.',
      'Konstanten $C$ kan stå för vilket tal som helst, inte bara noll.',
      'Skillnaden är avgörande: en primitiv funktion är ett enda exempel, samtliga primitiva funktioner är hela familjen $F(x) + C$.',
    ],
  },
  {
    question: 'Hur bestämmer man en primitiv funktion till potensfunktionen $f(x) = x^n$?',
    choices: [
      'Öka exponenten med 1 och dividera med den nya exponenten: $F(x) = \\dfrac{x^{n+1}}{n+1}$',
      'Öka exponenten med 1 utan att dividera: $F(x) = x^{n+1}$',
      'Minska exponenten med 1 och multiplicera med $n$: $F(x) = nx^{n-1}$',
      'Dividera exponenten med $x$: $F(x) = \\dfrac{x^n}{n}$',
    ],
    correct: 0,
    why: [
      'Just detta är regeln för potensfunktioner — den nya exponenten $n + 1$ används både i täljaren och som divisor.',
      'Man måste också dividera med den nya exponenten, annars stämmer inte derivatan tillbaka till $x^n$.',
      'Det är deriveringsregeln (framlänges), inte regeln för en primitiv funktion.',
      'Det är exponenten på $x$ som ska ökas med 1, inte $x^n$ som ska divideras med den gamla exponenten $n$.',
    ],
  },
  {
    question: 'Hur bestämmer man en primitiv funktion till en konstant funktion $f(x) = k$?',
    choices: [
      'Multiplicera konstanten med $x$: $F(x) = kx$',
      'Låt funktionen vara oförändrad: $F(x) = k$',
      'Kvadrera konstanten och dividera med 2: $F(x) = \\dfrac{k^2}{2}$',
      'Dividera konstanten med $x$: $F(x) = \\dfrac{k}{x}$',
    ],
    correct: 0,
    why: [
      'Deriverar man $F(x) = kx$ fås just $k$ tillbaka, så detta är den primitiva funktionen till en konstant.',
      'Deriverar man en konstant $F(x) = k$ blir derivatan noll, inte $k$ — det stämmer alltså inte.',
      'Det är inte regeln för en konstant funktion — ingen kvadrering är inblandad.',
      'Att dividera med $x$ ger en funktion som inte alls har derivatan $k$.',
    ],
  },
  {
    question: 'Hur bestämmer man en primitiv funktion till exponentialfunktionen $f(x) = e^{kx}$?',
    choices: [
      'Skriv av funktionen och dividera med koefficienten $k$ framför $x$ i exponenten: $F(x) = \\dfrac{e^{kx}}{k}$',
      'Skriv av funktionen och multiplicera med $k$: $F(x) = ke^{kx}$',
      'Låt funktionen vara oförändrad: $F(x) = e^{kx}$',
      'Öka exponenten med 1 som för en potensfunktion: $F(x) = \\dfrac{e^{kx+1}}{k+1}$',
    ],
    correct: 0,
    why: [
      'Deriverar man $F(x) = \\dfrac{e^{kx}}{k}$ med kedjeregeln fås $k \\cdot \\dfrac{e^{kx}}{k} = e^{kx}$ tillbaka, precis $f(x)$.',
      'Att multiplicera med $k$ ger fel håll — deriverar man den funktionen fås $k^2 e^{kx}$, inte $e^{kx}$.',
      'Deriverar man $e^{kx}$ oförändrad fås $k e^{kx}$ på grund av kedjeregeln, inte $e^{kx}$ — det stämmer alltså inte.',
      'Exponentialfunktioner med basen $e$ följer en egen regel; man ökar inte exponenten som för en potensfunktion.',
    ],
  },
],

'ma3c-5.2': [
  {
    question: 'Vad menas med ett "villkor" för en primitiv funktion?',
    choices: [
      'En extra uppgift om funktionen, till exempel ett känt funktionsvärde, som gör att konstanten $C$ kan bestämmas',
      'Ett krav på att funktionen måste vara ett polynom',
      'Att funktionen saknar nollställen',
      'Att man alltid får $C = 0$',
    ],
    correct: 0,
    why: [
      'Precis — ett villkor som $F(1) = 7$ ger en ekvation som löser ut $C$.',
      'Villkoret handlar om att bestämma konstanten, inte om vilken typ av funktion det är.',
      'Nollställen har inget att göra med hur $C$ bestäms.',
      'Konstanten $C$ kan bli vilket tal som helst — det beror helt på villkoret.',
    ],
  },
  {
    question: 'Vad är motsatsen till att derivera?',
    choices: [
      'Att integrera',
      'Att förenkla',
      'Att faktorisera',
      'Att förkorta',
    ],
    correct: 0,
    why: [
      'Att ta fram en primitiv funktion (integrera) är motsatsen till att derivera.',
      'Förenkling är en allmän räkneoperation, inte motsatsen till derivering.',
      'Faktorisering handlar om att skriva om uttryck som produkter, inte om derivator.',
      'Förkortning gäller rationella uttryck, inte sambandet mellan derivator och primitiva funktioner.',
    ],
  },
  {
    question: 'Om vi deriverar en sträckfunktion $s(t)$ två gånger efter varandra, vad får vi?',
    choices: [
      'En accelerationsfunktion $a(t)$',
      'En hastighetsfunktion $v(t)$',
      'Samma sträckfunktion $s(t)$ igen',
      'Konstanten $C$',
    ],
    correct: 0,
    why: [
      'Första deriveringen ger hastigheten $v(t)$, andra deriveringen av $v(t)$ ger accelerationen $a(t)$.',
      'Det är bara resultatet av den första deriveringen — frågan gäller två deriveringar.',
      'Derivering av en icke-konstant funktion ger en ny funktion, inte samma tillbaka.',
      'Konstanten $C$ dyker upp vid integrering, inte vid derivering.',
    ],
  },
  {
    question: 'En primitiv funktion till $f(x) = 2x$ är $F(x) = x^2 + C$. Vilket villkor ger $C = 3$?',
    choices: [
      '$F(0) = 3$',
      '$F(3) = 0$',
      '$f(0) = 3$',
      '$F(1) = 1$',
    ],
    correct: 0,
    why: [
      'Insättning ger $0^2 + C = 3$, alltså $C = 3$.',
      'Insättning ger $9 + C = 0$, alltså $C = -9$ — inte $3$.',
      'Villkoret måste gälla den primitiva funktionen $F$, inte $f$ (och $f(0) = 0$ oavsett $C$).',
      'Insättning ger $1 + C = 1$, alltså $C = 0$ — inte $3$.',
    ],
  },
  {
    question: 'Hastigheten för ett föremål är $v(t) = 6t$, och $s(0) = 2$. Vilken är sträckfunktionen $s(t)$?',
    choices: [
      '$s(t) = 3t^2 + 2$',
      '$s(t) = 3t^2$',
      '$s(t) = 6t^2 + 2$',
      '$s(t) = 3t^2 + 6$',
    ],
    correct: 0,
    why: [
      'Integrering av $6t$ ger $3t^2 + C$, och $s(0) = 2$ ger $C = 2$.',
      'Villkoret $s(0) = 2$ har inte använts — det ger $C = 2$, inte $C = 0$.',
      'Exponenten ska öka med 1 och man ska dividera med den nya exponenten: $6t$ ger $3t^2$, inte $6t^2$.',
      'Konstanten $C$ ska bestämmas av villkoret $s(0) = 2$, den är inte samma tal som koefficienten i $v(t)$.',
    ],
  },
],

'ma3c-5.3': [
  {
    question: 'Vad motsvarar en bestämd integral $\\int_a^b f(x)\\, dx$ grafiskt?',
    choices: [
      'Arean mellan grafen och $x$-axeln, mellan $x = a$ och $x = b$',
      'Lutningen på grafens tangent i en punkt',
      'Skärningspunkten mellan grafen och $x$-axeln',
      'Grafens högsta värde mellan $x = a$ och $x = b$',
    ],
    correct: 0,
    why: [
      'Precis — integralen motsvarar arean under grafen mellan de två integrationsgränserna.',
      'Det är derivatan (tangentens lutning i en punkt) som beskrivs så, inte integralen.',
      'Det beskriver ett nollställe till funktionen, inte en integral.',
      'Det beskriver ett maximivärde, inte en integral.',
    ],
  },
  {
    question: 'Hur går övergången från summan av rektangelareor $\\sum f(x) \\cdot \\Delta x$ till integralen $\\int f(x)\\, dx$?',
    choices: [
      'Genom att låta rektanglarnas bredd $\\Delta x$ gå mot 0, så att $\\Delta x$ blir $dx$ och summan blir en integral',
      'Genom att multiplicera alla rektangelareor med varandra i stället för att addera dem',
      'Genom att bara använda en enda, bredare rektangel',
      'Genom att derivera summan av rektangelareorna',
    ],
    correct: 0,
    why: [
      'När $\\Delta x$ går mot noll blir summan av oändligt många, oändligt smala rektangelareor en integral — integraltecknet är en "utdragen s" för summa.',
      'Rektangelareorna adderas (summeras) hela tiden, både före och efter gränsövergången — de multipliceras aldrig.',
      'Tvärtom blir approximationen bättre ju FLER (och smalare) rektanglar som används, inte färre.',
      'Derivering är den motsatta operationen till integrering och har inget med denna gränsövergång att göra.',
    ],
  },
  {
    question: 'En area under en funktions graf ligger helt under $x$-axeln. Vad gäller för arean respektive integralen?',
    choices: [
      'Integralen blir negativ, men arean i sig kan aldrig vara negativ',
      'Både integralen och arean blir negativa',
      'Integralen blir positiv eftersom en area alltid är positiv',
      'Integralen blir noll eftersom området ligger under $x$-axeln',
    ],
    correct: 0,
    why: [
      'Precis denna distinktion är central: en integral kan bli negativ, men en geometrisk area är per definition alltid större än eller lika med noll.',
      'En area kan aldrig vara negativ — det är bara integralens värde som kan bli det.',
      'Att arean ligger under $x$-axeln gör tvärtom att integralens värde blir negativt, inte positivt.',
      'Integralen blir negativ (inte noll) så länge området har en utsträckning skild från noll.',
    ],
  },
  {
    question: 'I integralen $\\int_2^7 f(x)\\, dx$ — vad kallas talet 7?',
    choices: [
      'Övre integrationsgräns',
      'Undre integrationsgräns',
      'Integrand',
      'Integrationsvariabel',
    ],
    correct: 0,
    why: [
      'Precis — 7 är det $x$-värde där arean slutar, alltså den övre integrationsgränsen.',
      'Den undre integrationsgränsen är talet längst ner vid integraltecknet, här 2.',
      'Integranden är funktionen som integreras, $f(x)$, inte en gräns.',
      'Integrationsvariabeln är $x$ (den som anges i $dx$), inte en gräns.',
    ],
  },
  {
    question: 'Grafen till $f(x) = 3$ bildar tillsammans med $x$-axeln, $x = 1$ och $x = 5$ en rektangel. Vad är $\\int_1^5 3\\, dx$?',
    choices: [
      '$12$',
      '$15$',
      '$4$',
      '$3$',
    ],
    correct: 0,
    why: [
      'Rektangeln har basen $5 - 1 = 4$ och höjden $3$, så integralens värde är $4 \\cdot 3 = 12$.',
      'Det motsvarar $5 \\cdot 3$ — men bredden på rektangeln är $5 - 1 = 4$, inte $5$; glöm inte att subtrahera den undre gränsen.',
      'Det är bara bredden $5 - 1 = 4$ — höjden (funktionsvärdet $3$) måste också multipliceras in.',
      'Det är bara höjden $f(x) = 3$ — bredden $5 - 1 = 4$ måste också multipliceras in.',
    ],
  },
],

'ma3c-5.4': [
  {
    question: 'Vad säger integralkalkylens fundamentalsats?',
    choices: [
      '$\\int_a^b f(x)\\, dx = F(b) - F(a)$, där $F$ är en primitiv funktion till $f$',
      '$\\int_a^b f(x)\\, dx = f(b) - f(a)$',
      '$\\int_a^b f(x)\\, dx = F(a) - F(b)$',
      '$\\int_a^b f(x)\\, dx = \\dfrac{F(b) - F(a)}{b - a}$',
    ],
    correct: 0,
    why: [
      'Precis — den bestämda integralen beräknas som skillnaden mellan den primitiva funktionens värden i övre och undre gränsen.',
      'Det är den primitiva funktionen $F$, inte $f$ självt, som ska sättas in i gränserna.',
      'Ordningen är omvänd — det är övre gränsen minus undre gränsen, $F(b) - F(a)$, inte tvärtom.',
      'Det uttrycket är formeln för en medellutning (sekant) mellan två punkter — integralen är själva differensen $F(b) - F(a)$, inte den delat med $b - a$.',
    ],
  },
  {
    question: 'Vad betyder skrivsättet $\\big[F(x)\\big]_a^b$?',
    choices: [
      'Ett kompakt skrivsätt för differensen $F(b) - F(a)$',
      'Ett kompakt skrivsätt för differensen $F(a) - F(b)$',
      'Ett kompakt skrivsätt för summan $F(b) + F(a)$',
      'Ett kompakt skrivsätt för derivatan av $F$ i intervallet',
    ],
    correct: 0,
    why: [
      'Rätt — hakparentesen med gränserna är bara ett skrivsätt för att först sätta in övre gränsen och sedan subtrahera värdet vid undre gränsen.',
      'Ordningen är omvänd: det är övre gränsens värde som sätts in först och undre gränsens värde som subtraheras, inte tvärtom.',
      'Det handlar om en differens, inte en summa.',
      'Skrivsättet handlar om att sätta in gränserna i en redan bestämd primitiv funktion, inte om att derivera något.',
    ],
  },
  {
    question: 'Vilket krav ställs på funktionen $F$ i integralkalkylens fundamentalsats?',
    choices: [
      'Den måste vara en primitiv funktion till $f$, dvs. en funktion vars derivata är lika med $f$',
      'Den måste vara samma funktion som $f$',
      'Den måste vara derivatan av $f$',
      'Den kan vara vilken funktion som helst',
    ],
    correct: 0,
    why: [
      'Just det — $F$ måste vara en primitiv funktion (antiderivata) till $f$, det vill säga en funktion vars derivata är $f$, annars gäller inte sambandet.',
      '$f$ är integranden, funktionen som ska integreras — $F$ är en annan funktion, den primitiva funktionen till $f$.',
      'Det är tvärtom: $f$ är derivatan av $F$, inte omvänt.',
      'Sambandet gäller bara om $F$ specifikt är en primitiv funktion till $f$ — vilken funktion som helst duger inte.',
    ],
  },
  {
    question: 'Varför måste man sätta parentes runt hela uttrycket när man sätter in den undre gränsen, om den primitiva funktionen har flera termer?',
    choices: [
      'Annars påverkar minustecknet bara den första termen i stället för samtliga termer, vilket ger fel tecken i svaret',
      'Det är bara en skrivvana utan betydelse för slutsvaret',
      'För att göra uttrycket kortare och lättare att läsa',
      'Parentes behövs bara vid den övre gränsen, aldrig vid den undre',
    ],
    correct: 0,
    why: [
      'Precis — utan parentesen distribueras inte minustecknet till alla termer i den undre gränsens uttryck, och svaret blir fel.',
      'En glömd parentes ändrar ofta hela svaret, så det är inte bara en stilfråga.',
      'Parentesen handlar om att räkna rätt, inte om att förkorta uttrycket.',
      'Det är tvärtom den undre gränsen (den som subtraheras med ett minustecken framför) som kräver parentes när den har flera termer.',
    ],
  },
  {
    question: 'Vad blir $\\big[x^2\\big]_1^3$?',
    choices: [
      '$8$',
      '$5$',
      '$9$',
      '$4$',
    ],
    correct: 0,
    why: [
      'Rätt — $3^2 - 1^2 = 9 - 1 = 8$.',
      '$5$ stämmer varken med $3^2$ eller med differensen $9 - 1$ — kontrollera uträkningen igen.',
      '$9$ är bara $3^2$ — den undre gränsens värde $1^2 = 1$ har inte subtraherats.',
      '$4$ stämmer inte med vare sig $3^2$ eller $1^2$ — se över kvadreringen.',
    ],
  },
],

'ma3c-5.5': [
  {
    question: 'Vilket kommando använder man i Geogebra för att bestämma en primitiv funktion till en given funktion?',
    choices: [
      'Integral( Funktion )',
      'Integral( Funktion, Från x-värde, Till x-värde )',
      'Derivata( Funktion )',
      'Lös( Funktion )',
    ],
    correct: 0,
    why: [
      'Matar man bara in funktionsuttrycket, utan gränser, ger kommandot en primitiv funktion.',
      'Det kommandot har två gränser också och används för att beräkna integralens värde, inte för att ta fram en primitiv funktion.',
      'Derivata ger derivatan av funktionen — den motsatta operationen till att integrera.',
      'Lös används för att lösa ekvationer, inte för att bestämma primitiva funktioner.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan att använda kommandot Integral( Funktion ) i standardläget respektive i CAS-läget?',
    choices: [
      'Standardläget ger en enda primitiv funktion, CAS-läget ger samtliga primitiva funktioner (med konstanten $c_1$)',
      'Standardläget ger ett exakt svar, CAS-läget ger ett närmevärde',
      'De ger alltid exakt samma svar',
      'CAS-läget fungerar bara för andragradsfunktioner',
    ],
    correct: 0,
    why: [
      'CAS-läget lägger till den godtyckliga konstanten $c_1$ och beskriver därmed hela familjen av primitiva funktioner, medan standardläget bara ger en av dem.',
      'Skillnaden mellan exakt svar och närmevärde gäller kommandot med integrationsgränser — utan gränser skiljer det sig i stället genom konstanten $c_1$.',
      'Svaren skiljer sig åt just genom att CAS-lägets svar innehåller $c_1$.',
      'Kommandot fungerar för polynomfunktioner av vilken grad som helst, inte bara andragradsfunktioner.',
    ],
  },
  {
    question: 'Med kommandot Integral( Funktion, Från x-värde, Till x-värde ) i standardläget — vilken typ av svar får man?',
    choices: [
      'Ett närmevärde (ett ungefärligt decimaltal)',
      'Ett exakt svar, t.ex. i bråkform',
      'En primitiv funktion utan gränser',
      'Ett samband mellan två variabler',
    ],
    correct: 0,
    why: [
      'I standardläget beräknar Geogebra integralen numeriskt och ger ett ungefärligt decimaltal.',
      'Ett exakt svar, t.ex. som bråk, får man i stället i CAS-läget.',
      'Kommandot har två integrationsgränser inmatade, så svaret blir ett tal, inte en funktion.',
      'Svaret är ett enda tal — integralens värde mellan gränserna — inte ett samband.',
    ],
  },
  {
    question: 'Med samma kommando, Integral( Funktion, Från x-värde, Till x-värde ), fast i CAS-läget — vilken typ av svar får man?',
    choices: [
      'Ett exakt svar, t.ex. i bråkform',
      'Ett närmevärde (ett ungefärligt decimaltal)',
      'En primitiv funktion utan gränser',
      'Alltid ett heltal',
    ],
    correct: 0,
    why: [
      'CAS-läget räknar symboliskt och ger integralens exakta värde, t.ex. som ett bråk.',
      'Ett ungefärligt decimaltal är vad standardläget ger, inte CAS-läget.',
      'Gränserna är inmatade i kommandot, så svaret är integralens värde, inte en primitiv funktion.',
      'Svaret kan mycket väl bli ett bråk eller ett rotuttryck — det behöver inte bli ett heltal.',
    ],
  },
  {
    question: 'Ett digitalt hjälpmedel ger i CAS-läget $\\displaystyle\\int_1^5 (x^2 - 4)\\, dx = \\dfrac{76}{3}$. Vilket svar skulle samma integral ge i standardläget?',
    choices: [
      '$\\approx 25{,}3$',
      '$\\dfrac{76}{3}$, exakt precis som i CAS-läget',
      '$76$',
      '$\\dfrac{3}{76}$',
    ],
    correct: 0,
    why: [
      'Standardläget ger samma tal som CAS-läget, men som ett numeriskt närmevärde: $\\dfrac{76}{3} \\approx 25{,}3$.',
      'Det exakta bråksvaret är det CAS-läget ger — standardläget avrundar i stället till ett decimaltal.',
      'Det är täljaren i det exakta svaret, inte integralens värde eller dess närmevärde.',
      'Det är bråket upp och ner — inte integralens värde.',
    ],
  },
],

'ma3c-5.6': [
  {
    question: 'Hur beräknas arean mellan två kurvor $f(x)$ och $g(x)$ i intervallet $[a, b]$, om $f(x) \\geq g(x)$ i hela intervallet?',
    choices: [
      '$A = \\int_a^b (f(x) - g(x))\\, dx$',
      '$A = \\int_a^b (g(x) - f(x))\\, dx$',
      '$A = \\int_a^b f(x)\\, dx + \\int_a^b g(x)\\, dx$',
      '$A = f(b) - f(a) - (g(b) - g(a))$',
    ],
    correct: 0,
    why: [
      'Just det — arean ges av integralen av den övre funktionen minus den undre funktionen.',
      'Det är tvärtom: eftersom $f(x)$ är den övre funktionen ska den stå först i differensen, annars blir integralen negativ.',
      'Det ger summan av areorna under båda kurvorna var för sig, inte arean mellan dem — den undre arean ska subtraheras, inte adderas.',
      'Man kan inte bara subtrahera funktionsvärden i ändpunkterna — hela differensen $f(x) - g(x)$ måste integreras över intervallet.',
    ],
  },
  {
    question: 'Varför subtraherar vi den undre funktionens integral från den övre funktionens integral när vi beräknar arean mellan två kurvor?',
    choices: [
      'Arean under den övre kurvan innehåller även arean under den undre kurvan, som ska räknas bort',
      'Det är bara en beräkningsregel utan geometrisk betydelse',
      'För att arean annars alltid blir negativ',
      'För att undvika att använda integraler över huvud taget',
    ],
    correct: 0,
    why: [
      'Precis — integralen av $f(x)$ ger arean mellan $f(x)$ och x-axeln, vilket omfattar arean under $g(x)$ också. Subtraherar man bort den kvarstår bara arean mellan kurvorna.',
      'Subtraktionen har en tydlig geometrisk tolkning: den övre arean minus den undre arean blir kvar som arean mellan kurvorna.',
      'Arean blir bara negativ om man råkar subtrahera i fel ordning (undre minus övre), inte som en följd av metoden i sig.',
      'Tvärtom — metoden bygger helt på att integrera båda funktionerna.',
    ],
  },
  {
    question: 'Kurvorna $y = f(x)$ och $y = g(x)$ ska integreras mellan sina skärningspunkter, men inga gränser är angivna i uppgiften. Hur bestäms integrationsgränserna $a$ och $b$?',
    choices: [
      'Genom att sätta $f(x) = g(x)$ och lösa ekvationen',
      'Genom att derivera $f(x) - g(x)$ och sätta lika med noll',
      'Genom att sätta $f(x) = 0$ och $g(x) = 0$',
      'Gränserna kan väljas godtyckligt',
    ],
    correct: 0,
    why: [
      'Just det — där kurvorna skär varandra gäller $f(x) = g(x)$, och lösningarna till den ekvationen ger integrationsgränserna.',
      'Det ger i stället extrempunkter till differensfunktionen, inte skärningspunkterna mellan kurvorna.',
      'Det ger kurvornas egna nollställen (var de skär x-axeln), inte var de skär varandra.',
      'Gränserna måste vara skärningspunkterna — annars integreras ett område där kurvorna inte längre avgränsar varandra på det sättet.',
    ],
  },
  {
    question: 'Ett område avgränsas av tre kurvor så att den övre funktionen byter identitet mitt i intervallet (t.ex. en rät linje först, sedan en parabel). Hur beräknas den sammanlagda arean?',
    choices: [
      'Dela upp intervallet vid bytespunkten, beräkna varje delarea för sig och addera dem',
      'Integrera med den funktion som är övre funktion i störst del av intervallet, över hela intervallet',
      'Integrera skillnaden mellan de två övre funktionerna',
      'Beräkna bara arean i den ena delen — den andra bidrar inte',
    ],
    correct: 0,
    why: [
      'Precis så — varje delintervall har sin egen övre och undre funktion, så $A_1$ och $A_2$ beräknas separat och adderas: $A = A_1 + A_2$.',
      'Det ger fel resultat i den del av intervallet där den funktionen inte längre är den övre.',
      'De två "övre" funktionerna gäller i olika delintervall, inte samtidigt — de ska inte subtraheras från varandra.',
      'Båda delarna bidrar till den sammanlagda arean — ingen del kan uteslutas.',
    ],
  },
  {
    question: 'Vad är skillnaden mellan att beräkna arean mellan två kurvor i Geogebras CAS-läge och i standardvyn med kommandot IntegralMellan?',
    choices: [
      'CAS-läget ger ett exakt svar, standardvyn ger ett närmevärde',
      'CAS-läget ger ett närmevärde, standardvyn ger ett exakt svar',
      'Det är ingen skillnad — båda ger exakt samma sorts svar',
      'CAS-läget kan bara användas för en kurva åt gången',
    ],
    correct: 0,
    why: [
      'Just det — CAS-läget räknar symboliskt och ger exakta svar (t.ex. som bråk), medan standardvyn ger ett numeriskt närmevärde.',
      'Det är tvärtom: CAS-läget ger exakta svar, standardvyn ger närmevärden.',
      'Kommandot är detsamma, men CAS-läget respektive standardvyn tolkar och presenterar resultatet på olika sätt (exakt kontra numeriskt).',
      'IntegralMellan tar emot två funktionsuttryck — en övre och en undre — i båda vyerna, inte bara ett.',
    ],
  },
],

'ma3c-5.7': [
  {
    question: 'Vad står en integral generellt för vid tillämpningar?',
    choices: [
      'Produkten av den beroende variabeln och den oberoende variabeln',
      'Derivatan av funktionen i en given punkt',
      'Funktionens medelvärde över ett intervall',
      'Skillnaden mellan funktionens största och minsta värde',
    ],
    correct: 0,
    why: [
      'Precis — en integral $\\int f(x)\\, dx$ tolkas som produkten av $f(x)$ (den beroende variabeln) och $x$ (den oberoende variabeln), vilket bland annat ger enheten för integralen.',
      'Det är derivatan $f\'(a)$ som beskriver en momentan förändringshastighet i en punkt — en helt annan storhet än integralen.',
      'Ett medelvärde fås genom att dividera integralen med intervallets längd, inte av integralen ensam.',
      'Skillnaden mellan störst och minst värde säger inget om integralens tolkning som en produkt.',
    ],
  },
  {
    question: 'En funktion $f$ har enheten kg/s och variabeln $x$ (tiden) har enheten sekunder. Vilken enhet får $\\displaystyle\\int f(x)\\, dx$?',
    choices: [
      'kg',
      'kg/s',
      's',
      '$\\text{kg} \\cdot \\text{s}^2$',
    ],
    correct: 0,
    why: [
      'Rätt — integralens enhet fås genom att ta "enheten för $f$" $\\cdot$ "enheten för $x$", dvs. $\\dfrac{\\text{kg}}{\\text{s}} \\cdot \\text{s} = \\text{kg}$.',
      'Det är enheten för $f(x)$ själv, inte för integralen — s-enheterna ska förkortas bort.',
      'Det är enheten för variabeln $x$, inte för hela integralen.',
      'Enheterna för sekunder förkortas bort mot varandra i stället för att multipliceras ihop till kvadrat.',
    ],
  },
  {
    question: 'Vilket samband stämmer mellan sträcka $s(t)$, hastighet $v(t)$ och acceleration $a(t)$?',
    choices: [
      '$v(t) = \\displaystyle\\int a(t)\\, dt$ och $s(t) = \\displaystyle\\int v(t)\\, dt$',
      '$a(t) = \\displaystyle\\int v(t)\\, dt$ och $v(t) = \\displaystyle\\int s(t)\\, dt$',
      '$v(t) = s(t) \\cdot t$',
      '$a(t) = s(t) \\cdot v(t)$',
    ],
    correct: 0,
    why: [
      'Precis — vi integrerar oss "bakåt" från accelerationen till hastigheten och vidare till sträckan (motsatsen till att derivera).',
      'Detta har riktningen omvänd: det är hastigheten som fås genom att integrera accelerationen, inte tvärtom.',
      'Hastighet och sträcka är inte relaterade genom en enkel multiplikation med tiden om inte hastigheten är konstant.',
      'Acceleration är inte en produkt av sträcka och hastighet, utan hänger ihop med dem via derivering/integrering.',
    ],
  },
  {
    question: 'Hastigheten för ett fordon ges av $v(t)$ m/s. Vad beräknar $\\displaystyle\\int_5^{12} v(t)\\, dt$?',
    choices: [
      'Den sträcka som fordonet färdas mellan $t = 5$ s och $t = 12$ s',
      'Fordonets hastighet vid $t = 12$ s',
      'Fordonets acceleration mellan $t = 5$ s och $t = 12$ s',
      'Den genomsnittliga hastigheten mellan $t = 5$ s och $t = 12$ s',
    ],
    correct: 0,
    why: [
      'Rätt — integralen av hastigheten mellan två tidpunkter ger den tillryggalagda sträckan under det tidsintervallet.',
      'Hastigheten vid en viss tidpunkt fås genom att sätta in tidpunkten i $v(t)$, inte genom att integrera.',
      'Accelerationen fås genom att derivera hastigheten, inte genom att integrera den.',
      'Medelhastigheten fås genom att dela integralen med tidsintervallets längd ($\\frac{1}{12-5}\\int_5^{12} v(t)\\, dt$) — inte av integralen ensam.',
    ],
  },
  {
    question: 'Ett företags omsättningshastighet ges av $K(t)$ kr/månad. Om $\\displaystyle\\int_0^{12} K(t)\\, dt = 3\\,000\\,000$, vad betyder detta?',
    choices: [
      'Företaget omsatte totalt 3 000 000 kr under de första 12 månaderna',
      'Företagets omsättningshastighet är 3 000 000 kr/månad vid $t = 12$',
      'Företaget behöver 3 000 000 månader för att nå en viss omsättning',
      'Företagets fasta kostnader är 3 000 000 kr',
    ],
    correct: 0,
    why: [
      'Precis — integralen av en omsättningshastighet (kr/månad) över ett tidsintervall (månader) ger den totala omsättningen i kronor under intervallet.',
      'Det skulle vara $K(12)$, inte integralen, som gav omsättningshastigheten vid en enskild tidpunkt — och 3 000 000 är dessutom orimligt stort för en hastighet.',
      'Enheten kr kommer från kr/månad $\\cdot$ månad — talet 3 000 000 är en summa pengar, inte ett antal månader.',
      'Integralen av en omsättningshastighet säger inget om kostnader, bara om den totala omsättningen (intäkten).',
    ],
  },
],

'ma3c-4.1': [
  {
    question: 'Vad kan vi säga om en funktion $f(x)$ i en punkt där $f\'(x) > 0$?',
    choices: [
      'Funktionen växer i den punkten',
      'Funktionen avtar i den punkten',
      'Funktionen har ett maximum där',
      'Funktionen är konstant där',
    ],
    correct: 0,
    why: [
      'Precis — positiv derivata betyder positiv lutning, dvs. att funktionen växer.',
      'Avtagande hör ihop med negativ derivata, $f\'(x) < 0$, inte positiv.',
      'I en maximipunkt är derivatan noll, inte positiv.',
      'En konstant funktion har derivatan noll överallt, inte ett positivt värde.',
    ],
  },
  {
    question: 'Vilket samband gäller mellan derivatans tecken och funktionens graf?',
    choices: [
      '$f\'(x) < 0$ ger avtagande funktion, $f\'(x) > 0$ ger växande funktion',
      '$f\'(x) < 0$ ger växande funktion, $f\'(x) > 0$ ger avtagande funktion',
      'Derivatans tecken avgör om funktionen är positiv eller negativ',
      'Derivatans tecken har ingen koppling till om funktionen växer eller avtar',
    ],
    correct: 0,
    why: [
      'Rätt — negativ lutning ("nedförsbacke") ger avtagande, positiv lutning ("uppförsbacke") ger växande.',
      'Detta är tvärtom — negativ derivata ger avtagande, inte växande.',
      'Derivatans tecken beskriver lutningen (om funktionen växer eller avtar), inte om funktionsvärdet självt är positivt eller negativt.',
      'Tvärtom — det är just derivatans tecken som avgör om en funktion växer eller avtar.',
    ],
  },
  {
    question: 'Vad krävs för att en funktion ska vara strängt växande i ett intervall?',
    choices: [
      'Funktionen måste växa i hela intervallet, utan avbrott',
      'Funktionen måste växa i minst halva intervallet',
      'Funktionens derivata måste vara konstant i intervallet',
      'Funktionen måste ha ett minimum i intervallet',
    ],
    correct: 0,
    why: [
      'Just det — strängt växande betyder växande under hela intervallet, ingen del får avta eller vara konstant.',
      'En del av intervallet räcker inte — hela intervallet måste vara växande.',
      'Derivatan behöver bara vara positiv, inte konstant — lutningen får variera i storlek så länge den är positiv.',
      'Ett minimum mitt i intervallet skulle betyda att funktionen både avtar och växer där, inte att den är strängt växande.',
    ],
  },
  {
    question: 'Grafen till derivatan $f\'(x)$ ligger under $x$-axeln i ett visst intervall. Vad innebär det för $f(x)$?',
    choices: [
      '$f(x)$ är avtagande i det intervallet',
      '$f(x)$ är växande i det intervallet',
      '$f(x)$ har ett nollställe i det intervallet',
      '$f(x)$ är negativ i det intervallet',
    ],
    correct: 0,
    why: [
      'Att grafen till $f\'(x)$ ligger under $x$-axeln betyder att $f\'(x) < 0$ där, vilket ger avtagande $f(x)$.',
      'Växande skulle kräva att $f\'(x) > 0$, dvs. att grafen till $f\'(x)$ ligger ovanför $x$-axeln.',
      'Det är $f\'(x)$:s graf som ligger under axeln — det säger inget om var $f(x)$ själv är noll.',
      'Tecknet på $f\'(x)$ säger hur $f(x)$ förändras, inte vilket värde $f(x)$ själv har.',
    ],
  },
  {
    question: 'Varför är det användbart att sammanställa tecknet på $f\'(x)$ i en teckentabell?',
    choices: [
      'Det ger en tydlig översikt över i vilka intervall $f(x)$ växer respektive avtar',
      'Det är enda sättet att beräkna $f\'(x)$',
      'Tabellen visar exakt vilket värde $f(x)$ har i varje punkt',
      'Tabellen behövs för att avgöra om $f(x)$ är ett polynom',
    ],
    correct: 0,
    why: [
      'Precis — teckentabellen sammanfattar tecknet på $f\'(x)$ i varje intervall mellan nollställena, vilket direkt visar var $f(x)$ växer och avtar.',
      'Teckentabellen används efter att $f\'(x)$ redan är bestämd eller avläst — den är inget verktyg för att derivera.',
      'Teckentabellen visar bara tecknet (positivt, negativt eller noll) på $f\'(x)$, inte funktionsvärdet på $f(x)$.',
      'Att $f(x)$ är ett polynom eller inte har inget att göra med teckentabellen.',
    ],
  },
],

'ma3c-4.2': [
  {
    question: 'Vad kännetecknar en lokal extrempunkt (maximi- eller minimipunkt) hos en deriverbar funktion $f(x)$?',
    choices: [
      'Att $f\'(x) = 0$ i punkten',
      'Att $f(x) = 0$ i punkten',
      'Att $f(x)$ är negativ i punkten',
      'Att funktionen är kontinuerlig i punkten',
    ],
    correct: 0,
    why: [
      'I en lokal extrempunkt är tangenten vågrät, vilket innebär att derivatan (lutningen) är exakt 0.',
      'Det villkoret gäller nollställen till funktionen själv, inte extrempunkter — en extrempunkt kan ha vilket funktionsvärde som helst.',
      'Funktionsvärdets tecken säger ingenting om huruvida punkten är en extrempunkt.',
      'Kontinuitet krävs för att derivatan ska vara definierad, men säger inget om var extrempunkter finns.',
    ],
  },
  {
    question: 'Vad kallas en punkt där derivatan är 0, men kurvan fortsätter i samma riktning (varken vänder uppåt eller nedåt)?',
    choices: [
      'Terrasspunkt',
      'Lokal maximipunkt',
      'Lokal minimipunkt',
      'Nollställe',
    ],
    correct: 0,
    why: [
      'En terrasspunkt har en vågrät tangent precis som en extrempunkt, men kurvan planar bara ut en stund innan den fortsätter åt samma håll som innan.',
      'En lokal maximipunkt är en "topp" där kurvan vänder nedåt efteråt — här fortsätter kurvan i samma riktning.',
      'En lokal minimipunkt är en "dal" där kurvan vänder uppåt efteråt — här fortsätter kurvan i samma riktning.',
      'Ett nollställe är en punkt där funktionsvärdet är 0, vilket är ett annat villkor än att derivatan är 0.',
    ],
  },
  {
    question: 'I en teckentabell för $f\'(x)$ växlar tecknet från $+$ till $-$ vid $x = a$. Vad innebär det för punkten $x = a$?',
    choices: [
      'Det är en lokal maximipunkt',
      'Det är en lokal minimipunkt',
      'Det är en terrasspunkt',
      'Funktionen saknar extrempunkt där',
    ],
    correct: 0,
    why: [
      'Funktionen växer före $x = a$ och avtar efter — kurvan går från stigande till fallande, vilket är precis vad som kännetecknar en topp, dvs. en lokal maximipunkt.',
      'En minimipunkt kräver den motsatta teckenväxlingen: från $-$ till $+$.',
      'Vid en terrasspunkt behåller derivatan samma tecken på båda sidor om nollstället, den växlar inte.',
      'En teckenväxling vid $f\'(a) = 0$ innebär tvärtom att $x = a$ är en extrempunkt.',
    ],
  },
  {
    question: 'En andragradsfunktion har en negativ koefficient framför $x^2$-termen. Vilken karaktär har dess extrempunkt?',
    choices: [
      'Maximipunkt',
      'Minimipunkt',
      'Terrasspunkt',
      'Kan vara vilken som helst av de tre',
    ],
    correct: 0,
    why: [
      'En negativ $x^2$-term ger en "sur" kurva som öppnar sig nedåt, och en sådan kurva har alltid en topp, dvs. en maximipunkt.',
      'Minimipunkt hade krävt en positiv $x^2$-term ("glad" kurva som öppnar sig uppåt).',
      'En andragradsfunktions enda extrempunkt är alltid en riktig maximi- eller minimipunkt, aldrig en terrasspunkt.',
      'Tecknet framför $x^2$-termen avgör entydigt karaktären — det behövs ingen teckentabell för andragradsfunktioner.',
    ],
  },
  {
    question: 'Vilket är det första steget för att bestämma en funktions lokala extrempunkter?',
    choices: [
      'Derivera funktionen och lösa $f\'(x) = 0$',
      'Sätta $f(x) = 0$ och lösa ekvationen',
      'Rita upp en värdetabell för funktionen',
      'Beräkna funktionens andraderivata',
    ],
    correct: 0,
    why: [
      'Extrempunkternas $x$-koordinater fås genom att derivera funktionen, sätta derivatan lika med 0 och lösa den ekvationen.',
      'Det ger i stället funktionens nollställen, dvs. var kurvan skär $x$-axeln — ett annat problem än att hitta extrempunkter.',
      'En värdetabell kan ge en fingervisning, men ger inte extrempunkternas exakta koordinater.',
      'Andraderivatan används inte i den metod som gås igenom i det här avsnittet — karaktären bestäms i stället med en teckentabell.',
    ],
  },
],

'ma3c-4.3': [
  {
    question: 'Var kan en funktions största eller minsta värde i ett slutet intervall finnas?',
    choices: [
      'I en extrempunkt eller i en av intervallets ändpunkter',
      'Bara i en extrempunkt',
      'Bara i intervallets ändpunkter',
      'Var som helst där funktionen är definierad',
    ],
    correct: 0,
    why: [
      'Precis — det största och minsta värdet i ett slutet intervall finns alltid antingen i en extrempunkt eller i en av ändpunkterna, aldrig någon annanstans.',
      'En ändpunkt kan också ge det största eller minsta värdet — t.ex. om funktionen fortsätter växa ända fram till intervallets kant.',
      'En extrempunkt inom intervallet kan också ge det största eller minsta värdet, inte bara ändpunkterna.',
      'Det är för vagt — värdet finns bland en bestämd, liten mängd kandidatpunkter, inte var som helst.',
    ],
  },
  {
    question: 'Vad är det första steget när vi ska bestämma en funktions största och minsta värde i ett intervall?',
    choices: [
      'Sätta in intervallets ändpunkter i $f(x)$',
      'Derivera funktionen och sätta derivatan lika med 0',
      'Rita grafen och läsa av värdena',
      'Beräkna andraderivatan',
    ],
    correct: 0,
    why: [
      'Ja — vi börjar med att beräkna $y$-koordinaterna i ändpunkterna, innan vi undersöker extrempunkterna.',
      'Det är steg två i metoden — att hitta extrempunkterna med derivata görs efter att ändpunkterna är beräknade.',
      'Vi ska just skissa grafen med hjälp av de beräknade punkterna, inte tvärtom läsa av punkter ur en redan ritad graf.',
      'Andraderivatan används inte i den här metoden — extrempunkternas karaktär bestäms med en teckentabell.',
    ],
  },
  {
    question: 'Funktionen $g(x) = 2x + 1$ är definierad på intervallet $1 \\leq x \\leq 4$. Vilket är funktionens värde vid den högra ändpunkten?',
    choices: [
      '$g(4) = 9$',
      '$g(4) = 8$',
      '$g(1) = 3$',
      '$g(4) = 7$',
    ],
    correct: 0,
    why: [
      'Rätt insättning: $g(4) = 2 \\cdot 4 + 1 = 8 + 1 = 9$.',
      'Additionen med $1$ har tappats bort — $2 \\cdot 4 = 8$, men $g(4) = 8 + 1 = 9$.',
      'Det är värdet vid den vänstra ändpunkten ($x = 1$), inte den högra.',
      'Det motsvarar $2 \\cdot 4 - 1$, men funktionen adderar $1$, den subtraherar inte.',
    ],
  },
  {
    question: 'I en teckentabell anger pilen $\\nearrow$ att funktionen är växande i det delintervallet. Vad anger en vågrät pil ($\\rightarrow$) i tabellens $f(x)$-rad?',
    choices: [
      'En punkt där derivatan är $0$, dvs. en horisontell tangent (en extrempunkt)',
      'Att funktionen är konstant i hela det angränsande intervallet',
      'Att derivatan är odefinierad i den punkten',
      'Att grafen har en asymptot i den punkten',
    ],
    correct: 0,
    why: [
      'Precis — den vågräta pilen markerar en enda punkt, där lutningen (derivatan) är $0$, dvs. en extrempunkt.',
      'Pilen markerar en enskild punkt i tabellen, inte ett helt delintervall där funktionen skulle vara konstant.',
      'Tvärtom är derivatan precis definierad och lika med $0$ i den punkten — det är själva poängen.',
      'Teckentabellen för extrempunkter har ingenting med asymptoter att göra.',
    ],
  },
  {
    question: 'Vad behöver du känna till om en funktions extrempunkter innan du kan skissa grafens utseende?',
    choices: [
      'Deras koordinater och deras karaktär (max-, min- eller terrasspunkt)',
      'Bara deras $x$-koordinater',
      'Bara om funktionen är ett polynom',
      'Funktionens andraderivata i alla punkter',
    ],
    correct: 0,
    why: [
      'Ja — utan $y$-koordinaterna och utan att veta om punkten är en topp eller en dal går det inte att skissa kurvans form.',
      '$x$-koordinaterna räcker inte — du behöver också $y$-koordinaterna (ur den ursprungliga funktionen) och punkternas karaktär.',
      'Metoden med derivata och teckentabell fungerar för alla deriverbara funktioner, inte bara polynom.',
      'Det räcker med en teckentabell baserad på förstaderivatans tecken — andraderivatan i alla punkter behövs inte.',
    ],
  },
],

'ma3c-4.4': [
  {
    question: 'Vad kallas derivatan av derivatan, och hur utläses den?',
    choices: [
      'Andraderivatan, $f\'\'(x)$, utläses "$f$ bis av $x$"',
      'Förstaderivatan, $f\'(x)$, utläses "$f$ prim av $x$"',
      'Tredjederivatan, $f\'\'\'(x)$, utläses "$f$ ters av $x$"',
      'Integralen av $f(x)$',
    ],
    correct: 0,
    why: [
      'Precis — deriverar man en funktion två gånger får man andraderivatan, som skrivs $f\'\'(x)$ och utläses "$f$ bis av $x$".',
      'Förstaderivatan $f\'(x)$ fås genom att derivera funktionen en enda gång, inte två.',
      'Tredjederivatan skulle kräva ytterligare en derivering av $f\'\'(x)$ — här har vi bara deriverat två gånger.',
      'Integralen är motsatsen till derivering, inte samma sak som att derivera två gånger.',
    ],
  },
  {
    question: 'Vad innebär det att $f\'\'(x) > 0$ i ett helt intervall?',
    choices: [
      'Kurvan är konvex (böjer uppåt, en "glad" kurva) i intervallet',
      'Kurvan är konkav (böjer nedåt, en "ledsen" kurva) i intervallet',
      'Funktionen är växande i intervallet',
      'Funktionen har ett nollställe i intervallet',
    ],
    correct: 0,
    why: [
      'Precis — en positiv andraderivata betyder att lutningen hela tiden ökar, vilket ger en konvex, uppåtböjande kurva.',
      'En konkav kurva ger tvärtom en negativ andraderivata, $f\'\'(x) < 0$.',
      'Om funktionen växer eller avtar avgörs av förstaderivatans tecken, $f\'(x)$ — inte av andraderivatan.',
      'Nollställen (punkter där $f(x) = 0$) har inget direkt samband med andraderivatans tecken.',
    ],
  },
  {
    question: 'Vad innebär det att $f\'\'(x) < 0$ i ett helt intervall?',
    choices: [
      'Kurvan är konkav (böjer nedåt, en "ledsen" kurva) i intervallet',
      'Kurvan är konvex (böjer uppåt, en "glad" kurva) i intervallet',
      'Funktionen är avtagande i intervallet',
      'Funktionen saknar extrempunkter i intervallet',
    ],
    correct: 0,
    why: [
      'Precis — en negativ andraderivata betyder att lutningen hela tiden minskar, vilket ger en konkav, nedåtböjande kurva.',
      'En konvex kurva ger tvärtom en positiv andraderivata, $f\'\'(x) > 0$.',
      'Om funktionen växer eller avtar avgörs av förstaderivatans tecken $f\'(x)$ — inte av andraderivatans tecken.',
      'Andraderivatans tecken säger inget om huruvida det finns extrempunkter i intervallet — det avgörs av förstaderivatans nollställen.',
    ],
  },
  {
    question: 'Vad kännetecknar en inflexionspunkt?',
    choices: [
      'Andraderivatan är noll där, samtidigt som kurvan växlar mellan konvex och konkav',
      'Förstaderivatan är noll där, och funktionen har ett extremvärde',
      'Funktionen själv är noll där, dvs. ett nollställe',
      'Kurvan är konvex i hela intervallet kring punkten',
    ],
    correct: 0,
    why: [
      'Precis — i en inflexionspunkt är $f\'\'(x) = 0$ samtidigt som andraderivatan byter tecken, så kurvan går från konvex till konkav eller tvärtom.',
      'Det beskriver i stället en extrempunkt (en lokal maximi- eller minimipunkt), inte en inflexionspunkt.',
      'Ett nollställe är en punkt där $f(x) = 0$ — det har inget direkt samband med andraderivatans tecken.',
      'Om kurvan är konvex i hela intervallet byter andraderivatan aldrig tecken där, och då finns ingen inflexionspunkt.',
    ],
  },
  {
    question: 'En funktion har andraderivatan $f\'\'(x) = 4x - 8$. I vilket intervall är funktionen konvex?',
    choices: [
      '$x > 2$',
      '$x < 2$',
      '$x > 8$',
      '$x < -2$',
    ],
    correct: 0,
    why: [
      'Precis — konvex innebär $f\'\'(x) > 0$, och $4x - 8 > 0$ ger $x > 2$.',
      'Det intervallet är där $f\'\'(x) < 0$, dvs. där funktionen i stället är konkav.',
      'Olikheten $4x - 8 > 0$ ger $x > 2$ efter division med 4 — talet 8 ska inte stå kvar som gräns.',
      'Tecknet är fel vänt: $4x - 8 > 0$ ger ett positivt gränsvärde, $x > 2$, inte ett negativt.',
    ],
  },
],

'ma3c-4.5': [
  {
    question: 'Om $f\'(a) = 0$ och $f\'\'(a) > 0$, vad gäller för funktionen $f$ vid $x = a$?',
    choices: [
      'Lokal minimipunkt',
      'Lokal maximipunkt',
      'Terrasspunkt',
      'Inflexionspunkt utan att vara extrempunkt',
    ],
    correct: 0,
    why: [
      'Positiv andraderivata betyder att kurvan är konvex (en "glad mun") i punkten, så en kritisk punkt där blir en minimipunkt.',
      'En maximipunkt kräver i stället $f\'\'(a) < 0$ — kurvan konkav (en "sur mun").',
      'En terrasspunkt uppstår när $f\'\'(a) = 0$, inte när andraderivatan är positiv.',
      'En sådan punkt kräver $f\'\'(a) = 0$ och att derivatan inte byter tecken — det stämmer inte med $f\'\'(a) > 0$.',
    ],
  },
  {
    question: 'Om $f\'(a) = 0$ och $f\'\'(a) < 0$, vad gäller för funktionen $f$ vid $x = a$?',
    choices: [
      'Lokal maximipunkt',
      'Lokal minimipunkt',
      'Terrasspunkt',
      'Kurvan är konvex vid $x = a$',
    ],
    correct: 0,
    why: [
      'Negativ andraderivata betyder att kurvan är konkav (en "sur mun") i punkten, så en kritisk punkt där blir en maximipunkt.',
      'En minimipunkt kräver i stället $f\'\'(a) > 0$ — kurvan konvex.',
      'Terrasspunkt gäller när $f\'\'(a) = 0$, inte när andraderivatan är negativ.',
      'Negativ andraderivata betyder tvärtom att kurvan är konkav, inte konvex.',
    ],
  },
  {
    question: 'Vad krävs för att avgöra karaktären hos en extrempunkt om $f\'(a) = 0$ och $f\'\'(a) = 0$?',
    choices: [
      'Ett teckenstudium (teckentabell) av $f\'(x)$ kring $x = a$',
      'Punkten är automatiskt en minimipunkt',
      'Punkten är automatiskt en maximipunkt',
      'Punkten kan inte vara en extrempunkt',
    ],
    correct: 0,
    why: [
      'När andraderivatan är noll ger den ingen information om karaktären — då behövs en teckentabell för $f\'(x)$ för att se om derivatan byter tecken, och i så fall åt vilket håll.',
      'Andraderivatan noll säger ingenting om karaktären — varken minimi- eller maximipunkt kan avgöras direkt på det sättet.',
      'Andraderivatan noll säger ingenting om karaktären — varken maximi- eller minimipunkt kan avgöras direkt på det sättet.',
      'Punkten kan mycket väl vara en extrempunkt — men den kan också vara en terrasspunkt. Utan teckenstudium vet vi inte vilket.',
    ],
  },
  {
    question: 'Funktionen $f(x) = x^3 - 6x^2$ har $f\'(x) = 3x^2 - 12x$, med $f\'(4) = 0$. Vad är $f\'\'(4)$ och vilken karaktär har extrempunkten?',
    choices: [
      '$f\'\'(4) = 12$, minimipunkt',
      '$f\'\'(4) = 12$, maximipunkt',
      '$f\'\'(4) = -12$, minimipunkt',
      '$f\'\'(4) = 0$, terrasspunkt',
    ],
    correct: 0,
    why: [
      'Andraderivatan är $f\'\'(x) = 6x - 12$, så $f\'\'(4) = 24 - 12 = 12 > 0$, vilket ger en minimipunkt.',
      'Värdet $f\'\'(4) = 12$ stämmer, men positiv andraderivata ger en minimipunkt, inte en maximipunkt.',
      'Tecknet är fel: $f\'\'(4) = 6 \\cdot 4 - 12 = 12$, inte $-12$.',
      '$f\'\'(4) = 12 \\neq 0$, så det är ingen terrasspunkt.',
    ],
  },
  {
    question: 'Varför måste andraderivatan vara positiv vid en lokal minimipunkt?',
    choices: [
      'Eftersom en minimipunkt alltid ligger på en konvex del av kurvan (en "glad mun"), och konvexitet innebär $f\'\'(x) > 0$',
      'Eftersom derivatan $f\'(x)$ alltid är positiv vid en minimipunkt',
      'Eftersom minimipunkter bara finns på räta linjer',
      'Eftersom andraderivatan mäter funktionens eget värde, inte dess lutning',
    ],
    correct: 0,
    why: [
      'En lokal minimipunkt är en "dal" i kurvan — grafen böjer av uppåt kring punkten, vilket är precis vad positiv andraderivata (konvexitet) innebär.',
      'Vid själva extrempunkten är $f\'(a) = 0$, inte positiv — det är andraderivatans tecken, inte förstaderivatans, som avgör karaktären.',
      'Räta linjer har $f\'\'(x) = 0$ överallt och saknar extrempunkter helt.',
      'Andraderivatan är derivatan av derivatan och mäter hur lutningen ändras (konkaviteten), inte funktionens värde.',
    ],
  },
],

'ma3c-4.6': [
  {
    question: 'Vad kallas problem som handlar om att bestämma ett störst eller minst möjligt värde?',
    choices: [
      'Extremvärdesproblem (eller optimeringsproblem)',
      'Ekvationssystem',
      'Gränsvärdesproblem',
      'Andragradsekvationer',
    ],
    correct: 0,
    why: [
      'Just det — även kallat optimeringsproblem.',
      'Ett ekvationssystem har flera obekanta och samband — det handlar inte om att optimera en storhet.',
      'Gränsvärden beskriver vad en funktion närmar sig, inte det störst eller minst möjliga värdet.',
      'Andragradsekvationer är en ekvationstyp — andragradsfunktioner förekommer ofta i extremvärdesproblem, men begreppen är inte samma sak.',
    ],
  },
  {
    question: 'Vilket är det första steget när man löser ett extremvärdesproblem?',
    choices: [
      'Ställa upp en funktion för den storhet som ska maximeras eller minimeras',
      'Sätta derivatan lika med 0',
      'Rita upp grafen i ett koordinatsystem',
      'Beräkna andraderivatan',
    ],
    correct: 0,
    why: [
      'Utan en funktion att derivera finns inget att optimera — det är alltid det första steget.',
      'Derivatan sätts lika med 0 senare, efter att funktionen ställts upp och deriverats.',
      'En graf kan vara ett hjälpmedel, men det krävs inte för den algebraiska lösningsmetoden.',
      'Andraderivatan används för att bestämma extrempunktens karaktär, vilket sker efter att extrempunkten hittats.',
    ],
  },
  {
    question: 'En funktion $A(x)$ beskriver en storhet. Vid $x = x_0$ gäller $A\'(x_0) = 0$ och $A\'\'(x_0) < 0$. Vad innebär det?',
    choices: [
      '$x_0$ ger ett maximivärde',
      '$x_0$ ger ett minimivärde',
      '$A$ saknar extrempunkt vid $x_0$',
      '$A$ är växande vid $x_0$',
    ],
    correct: 0,
    why: [
      'En negativ andraderivata i en punkt där derivatan är 0 betyder att kurvan böjer nedåt där, vilket ger en maximipunkt.',
      'En minimipunkt har i stället en positiv andraderivata (kurvan böjer uppåt där).',
      'Tvärtom — att derivatan är 0 och andraderivatan har ett bestämt tecken visar just att det finns en extrempunkt.',
      'Är derivatan 0 exakt i punkten kan funktionen inte vara växande (eller avtagande) där — lutningen är noll.',
    ],
  },
  {
    question: 'Varför räcker det inte att bara ange $x$-värdet när man svarar på ett extremvärdesproblem?',
    choices: [
      'Resultatet måste tolkas i problemets sammanhang, t.ex. vilket pris eller vilken area som blir följden',
      'Ett $x$-värde kan aldrig vara en del av ett korrekt svar på matematiska problem',
      'Andraderivatan kan bara beräknas om $x$-värdet skrivs ut i decimalform',
      '$x$-värdet är alltid fel om det inte anges tillsammans med en enhet',
    ],
    correct: 0,
    why: [
      'Extremvärdesproblem beskriver verkliga situationer — svaret ska kopplas till vad $x$-värdet betyder i sammanhanget, t.ex. det pris eller den area som ger extremvärdet.',
      'Tvärtom, ett $x$-värde kan mycket väl vara en del av ett korrekt svar — men det räcker sällan som ett fullständigt svar i ett tillämpat problem.',
      'Andraderivatan beror inte på hur $x$-värdet skrivs — den beräknas ur funktionsuttrycket, inte ur ett tals decimalform.',
      'Enhet är viktigt när det finns en, men huvudskälet till att tolka resultatet är sammanhanget, inte enheten i sig.',
    ],
  },
  {
    question: 'En intäktsfunktion skrivs $I(x) = x(300 - 2x)$, där $x$ är biljettpriset i kr. Hur tolkas faktorn $(300 - 2x)$?',
    choices: [
      'Antalet sålda biljetter vid biljettpriset $x$',
      'Den totala intäkten i kr',
      'Vinsten efter avdrag för kostnader',
      'Antalet besökare som inte köper biljett',
    ],
    correct: 0,
    why: [
      'Eftersom $\\text{intäkt} = \\text{biljettpris} \\cdot \\text{antal sålda biljetter}$ och $x$ redan står för biljettpriset måste den andra faktorn vara antalet sålda biljetter.',
      'Den totala intäkten är hela produkten $I(x) = x(300 - 2x)$, inte bara den ena faktorn.',
      'Funktionen beskriver intäkten, inte vinsten — den tar inte hänsyn till några kostnader.',
      'Faktorn beskriver hur många som faktiskt köper biljett vid det priset, inte hur många som avstår.',
    ],
  },
],

'ma3c-4.7': [
  {
    question: 'Varför måste vi uttrycka storheten som ska optimeras (t.ex. en volym) som en funktion av en enda variabel innan vi ritar grafen i Geogebra?',
    choices: [
      'Ett vanligt koordinatsystem visar bara hur ett $y$-värde beror av ETT $x$-värde, så funktionen måste bero av en enda variabel för att kunna ritas',
      'Annars kan Geogebra inte beräkna areor eller volymer alls',
      'En funktion med flera variabler blir alltid negativ',
      'Det är bara för att svaret ska bli ett heltal',
    ],
    correct: 0,
    why: [
      'En graf ritas i ett koordinatsystem med en $x$-axel och en $y$-axel — funktionen måste alltså bero av en enda variabel för att kunna ritas och undersökas med verktyget Extrempunkt.',
      'Geogebra kan visst beräkna uttryck med flera variabler — problemet är att en sådan funktion inte kan ritas som en vanlig graf i ett plan.',
      'Att en funktion beror av flera variabler säger ingenting om tecknet på dess värden.',
      'Svaret behöver inte alls bli ett heltal — i exemplet blev radien cirka 16,7 cm.',
    ],
  },
  {
    question: 'I ett extremvärdesproblem har vi tagit fram funktionen $V(r) = 50\\pi r^2 - 2\\pi r^3$ och hittat extrempunkten $B = (16.66667, 14544.41043)$ i Geogebra. Vad representerar $y$-koordinaten?',
    choices: [
      'Den maximala volymen',
      'Radien som ger maximal volym',
      'Höjden hos cylindern',
      'Antalet extrempunkter på grafen',
    ],
    correct: 0,
    why: [
      'Grafen visar $V(r)$ mot $r$, så $y$-koordinaten hos en punkt på grafen är just funktionsvärdet — här den maximala volymen.',
      'Radien är den oberoende variabeln $r$, som är $x$-koordinaten hos punkten, inte $y$-koordinaten.',
      'Höjden $h$ förekommer inte i den graf som ritas — den eliminerades redan när $V$ skrevs som funktion av enbart $r$.',
      'En enda extrempunkt har ett $x$- och ett $y$-värde; koordinaterna säger inget om hur många extrempunkter grafen har totalt.',
    ],
  },
  {
    question: 'Vilket av följande är den algebraiska motsvarigheten till att klicka med Geogebras verktyg Extrempunkt på en graf?',
    choices: [
      'Att derivera funktionen, sätta derivatan lika med noll och lösa ut den obekanta variabeln',
      'Att sätta funktionen lika med noll och lösa ut den obekanta variabeln',
      'Att integrera funktionen över hela definitionsmängden',
      'Att förkorta funktionens uttryck så långt som möjligt',
    ],
    correct: 0,
    why: [
      'Det är precis det här Geogebra gör i bakgrunden när verktyget markerar en extrempunkt: hittar var derivatan (lutningen) är noll.',
      'Att sätta funktionen (inte derivatan) lika med noll ger nollställen, dvs. var grafen skär $x$-axeln — inte extrempunkter.',
      'Integraler ger arean under en kurva, inte extrempunkter.',
      'Förkortning handlar om att förenkla rationella uttryck, inte om att optimera en funktion.',
    ],
  },
  {
    question: 'En pappskiva ska vikas till en låda. Volymen som funktion av den bortklippta kvadratsidan $x$ är $V(x) = x(24 - 2x)(15 - 2x)$, med definitionsmängden $0 < x < 7{,}5$. Geogebra markerar TVÅ punkter med vågrät tangent: $(3, 486)$ och $(10, -200)$. Varför duger inte punkten $(10, -200)$ som svar?',
    choices: [
      '$x = 10$ ligger utanför den tillåtna definitionsmängden $0 < x < 7{,}5$',
      'Geogebra har räknat fel',
      'En volym kan aldrig vara ett jämnt tal',
      'Extrempunkter måste alltid ha positiva koordinater',
    ],
    correct: 0,
    why: [
      'Definitionsmängden begränsas av att sidan $15 - 2x$ måste vara positiv, vilket ger $x < 7{,}5$. Eftersom $10 > 7{,}5$ ligger punkten utanför det fysikaliskt möjliga intervallet.',
      'Geogebra räknar rätt på den matematiska funktionen — problemet är att den delen av grafen inte motsvarar en verklig låda.',
      'Volymer kan mycket väl vara jämna tal (486 är jämnt) — det är inte skälet till att punkten förkastas.',
      'Extrempunkter kan visst ha negativa koordinater rent matematiskt; det är definitionsmängden, inte tecknet i sig, som avgör om punkten duger som svar.',
    ],
  },
  {
    question: 'Vilken är fördelen med att lösa ett extremvärdesproblem grafiskt i Geogebra, jämfört med att lösa det algebraiskt för hand?',
    choices: [
      'Vi slipper derivera för hand — men får bara ett avläst, avrundat värde i stället för ett exakt uttryck',
      'Vi får alltid ett exaktare svar än med den algebraiska metoden',
      'Vi behöver inte uttrycka storheten som funktion av en variabel',
      'Metoden fungerar bara för andragradsfunktioner',
    ],
    correct: 0,
    why: [
      'Geogebras verktyg Extrempunkt hittar extremvärdet automatiskt utan att vi behöver derivera för hand, men resultatet är ett numeriskt (avrundat) värde, till skillnad från ett exakt algebraiskt uttryck.',
      'Tvärtom — den grafiska avläsningen ger ett avrundat närmevärde, medan den algebraiska metoden (när den går att genomföra) ger ett exakt svar.',
      'Precis som i den algebraiska metoden måste storheten uttryckas som funktion av en enda variabel för att kunna ritas som en vanlig graf.',
      'Metoden fungerar för alla funktioner som går att rita i Geogebra, t.ex. tredjegradsfunktioner som i cylinderexemplet.',
    ],
  },
],

'ma3c-6.1': [
  {
    question: 'I en rätvinklig triangel: vilken sida kallas hypotenusan?',
    choices: [
      'Sidan mitt emot den räta vinkeln (den längsta sidan)',
      'Sidan mitt emot vinkeln $v$',
      'Sidan som tillsammans med hypotenusan bildar vinkeln $v$',
      'Vilken som helst av de tre sidorna, beroende på hur man mäter',
    ],
    correct: 0,
    why: [
      'Precis — hypotenusan ligger alltid mitt emot den räta vinkeln och är triangelns längsta sida.',
      'Det är den motstående kateten som beskrivs så, inte hypotenusan.',
      'Det är den närliggande kateten som beskrivs så, inte hypotenusan.',
      'Hypotenusan är en bestämd sida — alltid den mitt emot den räta vinkeln, oavsett hur triangeln är vriden.',
    ],
  },
  {
    question: 'Vilket samband definierar $\\cos v$ i en rätvinklig triangel?',
    choices: [
      '$\\cos v = \\dfrac{\\text{närliggande katet}}{\\text{hypotenusa}}$',
      '$\\cos v = \\dfrac{\\text{motstående katet}}{\\text{hypotenusa}}$',
      '$\\cos v = \\dfrac{\\text{motstående katet}}{\\text{närliggande katet}}$',
      '$\\cos v = \\dfrac{\\text{hypotenusa}}{\\text{närliggande katet}}$',
    ],
    correct: 0,
    why: [
      'Cosinus är förhållandet mellan den närliggande kateten och hypotenusan.',
      'Det förhållandet definierar $\\sin v$, inte $\\cos v$.',
      'Det förhållandet definierar $\\tan v$, inte $\\cos v$.',
      'Bråket är upp och ner — hypotenusan står alltid i nämnaren för både sinus och cosinus.',
    ],
  },
  {
    question: 'Du känner den motstående och den närliggande kateten till vinkeln $v$ och vill bestämma $v$. Vilken funktion (och dess invers) använder du?',
    choices: [
      'Tangens — $v = \\tan^{-1}\\!\\left(\\dfrac{\\text{motstående}}{\\text{närliggande}}\\right)$',
      'Sinus — $v = \\sin^{-1}\\!\\left(\\dfrac{\\text{motstående}}{\\text{närliggande}}\\right)$',
      'Cosinus — $v = \\cos^{-1}\\!\\left(\\dfrac{\\text{motstående}}{\\text{närliggande}}\\right)$',
      'Ingen av funktionerna fungerar utan hypotenusan',
    ],
    correct: 0,
    why: [
      'Tangens är just kvoten mellan motstående och närliggande katet, så $\\tan^{-1}$ av den kvoten ger $v$ direkt.',
      'Sinus kräver hypotenusan i nämnaren, inte den närliggande kateten.',
      'Cosinus kräver hypotenusan, inte den motstående kateten i täljaren.',
      'Tangens kopplar just de två kateterna till varandra — hypotenusan behövs aldrig i den relationen.',
    ],
  },
  {
    question: 'Vad gör den inversa funktionen $\\tan^{-1}$ (arctan)?',
    choices: [
      'Den ger vinkeln $v$ när kvoten mellan motstående och närliggande katet är känd',
      'Den ger kvoten mellan katetrarna när vinkeln $v$ är känd',
      'Den är samma sak som $\\dfrac{1}{\\tan v}$',
      'Den fungerar bara för vinklar större än 90°',
    ],
    correct: 0,
    why: [
      'Just det — $\\tan^{-1}$ "vänder om" tangens och tar en kvot av sidor som indata och lämnar en vinkel som resultat.',
      'Det är precis vad $\\tan v$ själv gör (utan invers) — inversen går åt andra hållet.',
      'Vanlig förväxling: trots skrivsättet $\\tan^{-1}$ betyder det INTE $1/\\tan v$, utan den inversa funktionen till tangens.',
      'Tvärtom — i en rätvinklig triangel är de spetsiga vinklarna alltid mindre än 90°, och det är just för såna vinklar $\\tan^{-1}$ används här.',
    ],
  },
  {
    question: 'En rätvinklig triangel har hypotenusan 10 cm och vinkeln $v = 30°$. Vilken formel ger den motstående kateten $a$?',
    choices: [
      '$a = 10 \\cdot \\sin 30°$',
      '$a = 10 \\cdot \\cos 30°$',
      '$a = 10 / \\sin 30°$',
      '$a = 10 \\cdot \\tan 30°$',
    ],
    correct: 0,
    why: [
      'Eftersom $\\sin v = \\dfrac{a}{\\text{hypotenusa}}$ ger multiplikation med hypotenusan just den motstående kateten.',
      'Det uttrycket ger den närliggande kateten, inte den motstående.',
      'Division i stället för multiplikation skulle ge en sträcka LÄNGRE än hypotenusan — omöjligt för en katet.',
      'Tangens kopplar ihop de två kateterna med varandra, inte en katet med hypotenusan.',
    ],
  },
],

'ma3c-6.2': [
  {
    question: 'Vad är en enhetscirkel?',
    choices: [
      'En cirkel med radien 1 och medelpunkten i origo',
      'En cirkel med radien 1 med valfri medelpunkt',
      'En cirkel med omkretsen 1',
      'En cirkel som bara går genom heltalspunkter',
    ],
    correct: 0,
    why: [
      'Just så — radie 1 och medelpunkt i origo. Det gör att en punkt på cirkeln direkt ger cosinus- och sinusvärdet.',
      'Medelpunkten måste ligga i origo för att koordinaterna ska bli $\\cos v$ och $\\sin v$.',
      'Det är radien, inte omkretsen, som är 1.',
      'Alla punkter på cirkelns rand räknas, inte bara heltalspunkter.',
    ],
  },
  {
    question: 'En vinkel $v$ ger punkten $(x, y)$ på enhetscirkeln. Vad är $\\cos v$?',
    choices: [
      '$x$-koordinaten',
      '$y$-koordinaten',
      'Kvoten $y/x$',
      'Avståndet till origo',
    ],
    correct: 0,
    why: [
      'På enhetscirkeln är $\\cos v = x$ och $\\sin v = y$ — cosinus är alltid $x$-koordinaten.',
      '$y$-koordinaten är $\\sin v$, inte $\\cos v$.',
      'Kvoten $y/x$ är $\\tan v$.',
      'Avståndet till origo är radien, som alltid är $1$.',
    ],
  },
  {
    question: 'Hur mäts en positiv vinkel i enhetscirkeln?',
    choices: [
      'Moturs från den positiva $x$-axeln',
      'Medurs från den positiva $x$-axeln',
      'Moturs från den positiva $y$-axeln',
      'Från närmaste axel',
    ],
    correct: 0,
    why: [
      'En positiv vinkel startar vid den positiva $x$-axeln och vrids moturs.',
      'Medurs motsvarar i stället en negativ vinkel.',
      'Vinkeln mäts från $x$-axeln, inte $y$-axeln.',
      'Vinkeln mäts alltid från den positiva $x$-axeln, inte från närmaste axel.',
    ],
  },
  {
    question: 'Vinkeln $v$ och vinkeln $-v$ ger två punkter på enhetscirkeln. Hur förhåller de sig till varandra?',
    choices: [
      'Punkten för $-v$ är en spegelbild i $x$-axeln av punkten för $v$',
      'Punkterna är identiska',
      'Punkten för $-v$ är en spegelbild i $y$-axeln',
      'Punkterna ligger på motsatta sidor om origo',
    ],
    correct: 0,
    why: [
      'En negativ vinkel vrids medurs, så punkten speglas i $x$-axeln: $\\cos v$ är oförändrat men $\\sin v$ byter tecken.',
      'Punkterna sammanfaller bara om $v = 0^\\circ$.',
      'Spegling i $y$-axeln skulle byta tecken på $\\cos v$, men det är $\\sin v$ som byter tecken.',
      'Diametralt motsatta punkter hör i stället ihop med $v$ och $v + 180^\\circ$.',
    ],
  },
  {
    question: 'Varför ger $360^\\circ + v$ samma punkt på enhetscirkeln som $v$?',
    choices: [
      'Ett helt varv är $360^\\circ$, så man hamnar tillbaka i samma punkt',
      'För att $360^\\circ$ är ett rakt varv gånger två',
      'För att sinus alltid är $0$ vid $360^\\circ$',
      'Det stämmer inte — punkterna är olika',
    ],
    correct: 0,
    why: [
      'Att lägga till $360^\\circ$ innebär ett helt varv runt cirkeln, tillbaka till exakt samma punkt.',
      'Ett helt varv är $360^\\circ$, inte ett rakt varv gånger två.',
      'Sinusvärdet vid en vinkel beror på punktens $y$-koordinat, inte på att man passerar $360^\\circ$.',
      'Punkterna sammanfaller — hela poängen med periodiciteten är att $v$ och $360^\\circ + v$ ger samma punkt.',
    ],
  },
],

'ma3c-6.3': [
  {
    question: 'Vad kallas en ekvation som innehåller sinus, cosinus eller tangens?',
    choices: [
      'En trigonometrisk ekvation',
      'En andragradsekvation',
      'En linjär ekvation',
      'En exponentialekvation',
    ],
    correct: 0,
    why: [
      'Precis — ekvationer med de trigonometriska funktionerna kallas trigonometriska ekvationer.',
      'En andragradsekvation innehåller en term med $x^2$, inte trigonometriska funktioner.',
      'En linjär ekvation innehåller bara $x$ i första graden, ingen trigonometrisk funktion.',
      'En exponentialekvation har den obekanta i exponenten, t.ex. $a^x = b$ — inte samma sak.',
    ],
  },
  {
    question: 'Hur löser man ekvationen $\\sin v = a$ med hjälp av enhetscirkeln?',
    choices: [
      'Man drar en vågrät linje vid $y = a$ och avläser var den skär cirkeln',
      'Man drar en lodrät linje vid $x = a$ och avläser var den skär cirkeln',
      'Man drar en linje genom origo med lutningen $a$',
      'Man ritar en ny cirkel med radien $a$',
    ],
    correct: 0,
    why: [
      'Sinus motsvarar $y$-koordinaten på enhetscirkeln, så en vågrät linje vid $y = a$ visar var $\\sin v = a$.',
      'En lodrät linje vid $x = a$ används för att lösa $\\cos v = a$, inte $\\sin v = a$.',
      'Det är inte metoden — enhetscirkeln har alltid radien 1, och ekvationen löses med en horisontell linje, inte en linje genom origo.',
      'Enhetscirkelns radie är alltid 1, oavsett vilket $a$-värde ekvationen har.',
    ],
  },
  {
    question: 'Räknaren ger $v_1$ som lösning till ekvationen $\\sin v = a$. Hur bestäms den andra lösningen $v_2$ i intervallet $0\^\circ$–$360\^\circ$?',
    choices: [
      '$v_2 = 180\^\circ - v_1$',
      '$v_2 = 360\^\circ - v_1$',
      '$v_2 = 90\^\circ - v_1$',
      '$v_2 = v_1 + 180\^\circ$',
    ],
    correct: 0,
    why: [
      'För sinusekvationer gäller sambandet $v_2 = 180\^\circ - v_1$, eftersom sinus har samma värde i första och andra kvadranten.',
      'Det sambandet gäller för cosinusekvationer, inte för sinusekvationer.',
      'Detta samband stämmer inte för vare sig sinus eller cosinus.',
      'Att lägga till $180\^\circ$ ger en vinkel utanför intervallet $0\^\circ$–$360\^\circ$ för de flesta $v_1$, och ger dessutom fel värde på sinus (motsatt tecken).',
    ],
  },
  {
    question: 'Räknaren ger $v_1$ som lösning till ekvationen $\\cos v = a$. Hur bestäms den andra lösningen $v_2$ i intervallet $0\^\circ$–$360\^\circ$?',
    choices: [
      '$v_2 = 360\^\circ - v_1$',
      '$v_2 = 180\^\circ - v_1$',
      '$v_2 = v_1 - 360\^\circ$',
      '$v_2 = 2v_1$',
    ],
    correct: 0,
    why: [
      'För cosinusekvationer gäller sambandet $v_2 = 360\^\circ - v_1$, eftersom cosinus har samma värde speglat kring $x$-axeln.',
      'Det sambandet gäller för sinusekvationer, inte för cosinusekvationer.',
      'Det ger ett negativt tal för alla lösningar $v_1$ i intervallet $0\^\circ$–$360\^\circ$, vilket hamnar utanför intervallet.',
      'Det finns inget samband som säger att $v_2$ är dubbelt så stort som $v_1$.',
    ],
  },
  {
    question: 'Ekvationen $\\cos v = 1{,}8$ ska lösas i intervallet $0\^\circ$–$360\^\circ$. Vad gäller?',
    choices: [
      'Ekvationen saknar lösning, eftersom $1{,}8 > 1$',
      'Ekvationen har exakt en lösning',
      'Ekvationen har två lösningar, precis som alla cosinusekvationer',
      'Ekvationen har oändligt många lösningar i intervallet',
    ],
    correct: 0,
    why: [
      'Enhetscirkelns radie är 1, så $\\cos v$ kan aldrig anta ett värde större än 1. Linjen $x = 1{,}8$ hamnar helt utanför cirkeln.',
      'Ekvationen har ingen lösning alls, eftersom $1{,}8$ ligger utanför cosinus värdemängd $[-1, 1]$.',
      'Det stämmer bara när $|a| < 1$ — här är $a = 1{,}8$ för stort för att ge någon lösning.',
      'Trigonometriska ekvationer kan ha oändligt många lösningar om man tillåter alla varv runt cirkeln, men här saknas lösning helt eftersom $a$-värdet är för stort.',
    ],
  },
],

'ma3c-6.4': [
  {
    question: 'Vilken invers funktion använder vi för att lösa ekvationen $\\tan v = a$?',
    choices: [
      '$\\tan^{-1}$',
      '$\\sin^{-1}$',
      '$\\cos^{-1}$',
      'Ingen — tangensekvationer går inte att lösa',
    ],
    correct: 0,
    why: [
      'Precis som $\\sin^{-1}$ och $\\cos^{-1}$ löser sina ekvationer, löser $\\tan^{-1}$ ekvationen $\\tan v = a$.',
      '$\\sin^{-1}$ hör till ekvationen $\\sin v = a$, inte $\\tan v = a$.',
      '$\\cos^{-1}$ hör till ekvationen $\\cos v = a$.',
      'Tangensekvationer löses med den inversa funktionen $\\tan^{-1}$.',
    ],
  },
  {
    question: 'Vad är perioden för tangensfunktionen?',
    choices: [
      '$180^\\circ$',
      '$360^\\circ$',
      '$90^\\circ$',
      '$270^\\circ$',
    ],
    correct: 0,
    why: [
      'Tangens upprepar sig var $180^\\circ$ eftersom $\\tan(v + 180^\\circ) = \\tan v$ — en linje genom origo och dess förlängning har samma lutning.',
      '$360^\\circ$ är perioden för sinus och cosinus, inte för tangens.',
      'Tangens upprepar sig inte redan efter $90^\\circ$.',
      'Perioden är $180^\\circ$, inte $270^\\circ$.',
    ],
  },
  {
    question: 'Du har hittat en lösning $v_1 = 40^\\circ$ till en tangensekvation. Hur får du nästa lösning i intervallet $0^\\circ \\leq v \\leq 360^\\circ$?',
    choices: [
      'Lägg till perioden $180^\\circ$: $v_2 = 220^\\circ$',
      'Lägg till $360^\\circ$: $v_2 = 400^\\circ$',
      'Ta $180^\\circ - 40^\\circ = 140^\\circ$',
      'Ta $90^\\circ - 40^\\circ = 50^\\circ$',
    ],
    correct: 0,
    why: [
      'Tangens har perioden $180^\\circ$, så nästa lösning fås genom att lägga till $180^\\circ$.',
      'Att lägga till $360^\\circ$ ger en vinkel utanför intervallet och missar lösningen vid $220^\\circ$.',
      '$180^\\circ - v$ är regeln för sinusekvationer, inte tangensekvationer.',
      '$90^\\circ - v$ hör inte ihop med tangensekvationers lösningar.',
    ],
  },
  {
    question: 'Varför upprepar sig tangens redan efter $180^\\circ$ och inte först efter $360^\\circ$?',
    choices: [
      'Eftersom $\\tan(v + 180^\\circ) = \\dfrac{-\\sin v}{-\\cos v} = \\tan v$',
      'Eftersom tangens bara är definierad mellan $0^\\circ$ och $180^\\circ$',
      'Eftersom tangens alltid är positiv',
      'Eftersom $180^\\circ$ är ett halvt varv och sinus då är noll',
    ],
    correct: 0,
    why: [
      'Vid $v + 180^\\circ$ byter både $\\sin v$ och $\\cos v$ tecken, och kvoten blir därför oförändrad — samma tangensvärde.',
      'Tangens är definierad för alla vinklar utom där $\\cos v = 0$.',
      'Tangens kan vara både positiv och negativ.',
      'Att sinus är noll vid $180^\\circ$ förklarar inte periodiciteten — det är teckenbytet i både täljare och nämnare som gör det.',
    ],
  },
  {
    question: 'En ekvation $\\tan v = a$ ska lösas i intervallet $0^\\circ \\leq v \\leq 360^\\circ$. Hur många lösningar har den vanligtvis?',
    choices: [
      'Två — en grundlösning och en till efter ett halvt varv',
      'Bara en',
      'Fyra',
      'Ingen',
    ],
    correct: 0,
    why: [
      'Med perioden $180^\\circ$ ryms två lösningar i ett $360^\\circ$-intervall: grundlösningen och grundlösningen plus $180^\\circ$.',
      'En enda lösning missar den andra som ligger ett halvt varv bort.',
      'Fyra lösningar skulle kräva ett intervall på $720^\\circ$.',
      'Tangens antar varje värde, så ekvationen saknar inte lösning.',
    ],
  },
],

'ma3c-6.6': [
  {
    question: 'Vad säger sinussatsen om en triangel $ABC$?',
    choices: [
      '$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$',
      '$a^2 = b^2 + c^2 - 2bc\\cos A$',
      '$a + b + c = 180^\\circ$',
      '$\\dfrac{a}{b} = \\dfrac{c}{a}$',
    ],
    correct: 0,
    why: [
      'Just så — kvoten mellan en sida och sinus för dess motstående vinkel är lika stor för alla tre sidorna.',
      'Det är cosinussatsen, inte sinussatsen.',
      'Det är sidorna som summeras här — det är vinklarna i en triangel som summerar till $180^\\circ$.',
      'Sinussatsen kopplar ihop sidor med sina motstående vinklars sinus, inte sidor med varandra direkt.',
    ],
  },
  {
    question: 'I sinussatsen — vilken vinkel hör ihop med sidan $a$?',
    choices: [
      'Vinkeln $A$, mitt emot sidan $a$',
      'Vinkeln $B$, intill sidan $a$',
      'Den största vinkeln',
      'Vinkeln $C$',
    ],
    correct: 0,
    why: [
      'Sidan $a$ paras ihop med sin motstående vinkel $A$ i kvoten $\\dfrac{a}{\\sin A}$.',
      'Det är den motstående, inte den intilliggande, vinkeln som hör ihop med sidan.',
      'Kopplingen gäller motstående vinkel, oavsett om den är störst.',
      'Vinkeln $C$ hör ihop med sidan $c$, inte $a$.',
    ],
  },
  {
    question: 'I vilket fall kan du använda sinussatsen?',
    choices: [
      'När en sida och två vinklar är kända',
      'När bara de tre sidorna är kända',
      'När två sidor och den mellanliggande vinkeln är kända',
      'Bara i rätvinkliga trianglar',
    ],
    correct: 0,
    why: [
      'Med en sida och två vinklar (och därmed den tredje) kan sinussatsen ge de övriga sidorna.',
      'Med enbart tre sidor behövs cosinussatsen — sinussatsen räcker inte.',
      'Två sidor och mellanliggande vinkel löses med cosinussatsen.',
      'Sinussatsen gäller alla trianglar, inte bara rätvinkliga.',
    ],
  },
  {
    question: 'För att bestämma en sida med sinussatsen behöver du känna till...',
    choices: [
      'Den motstående vinkeln till sidan, samt ett annat sida–vinkel-par',
      'Alla tre vinklarna men ingen sida',
      'Bara två sidor',
      'Triangelns area',
    ],
    correct: 0,
    why: [
      'Sinussatsen kopplar två sida–vinkel-par, så du behöver den sökta sidans motstående vinkel plus ett känt par.',
      'Utan minst en känd sida kan trianglarnas storlek inte bestämmas — vinklarna ensamma ger bara formen.',
      'Två sidor utan tillhörande vinklar räcker inte för sinussatsen.',
      'Arean behövs inte för att tillämpa sinussatsen.',
    ],
  },
  {
    question: 'När du löser $\\sin A = 0{,}77$ för en vinkel i en triangel kan det finnas två kandidater. Varför?',
    choices: [
      'Både en spetsig och en trubbig vinkel har samma sinusvärde',
      'Sinusfunktionen kan ge två olika värden för samma vinkel',
      'Triangeln måste vara liksidig',
      'Räknaren avrundar fel',
    ],
    correct: 0,
    why: [
      'Sinus är positivt för både spetsiga och trubbiga vinklar, så $A$ och $180^\\circ - A$ ger samma sinusvärde — man måste pröva om båda ger en giltig triangel.',
      'Sinus ger ett bestämt värde för en given vinkel; det är det omvända — samma sinusvärde för två vinklar — som ger tvetydigheten.',
      'Den tvetydiga situationen har inget med liksidiga trianglar att göra.',
      'Det handlar inte om avrundning utan om att sinus är positivt i två kvadranter.',
    ],
  },
],

'ma3c-6.5': [
  {
    question: 'Vilka uppgifter behöver du känna till för att kunna beräkna en triangels area med areasatsen?',
    choices: [
      'Två sidor och vinkeln mellan dem (den mellanliggande vinkeln)',
      'Alla tre sidorna',
      'En vinkel och triangelns omkrets',
      'Triangelns bas och höjd',
    ],
    correct: 0,
    why: [
      'Precis — areasatsen $T = \\dfrac{ab\\sin C}{2}$ kräver bara två sidor och vinkeln mellan dem, ingen höjd.',
      'Tre sidor räcker (det finns andra formler för det), men areasatsen är till för fallet med två sidor och en mellanliggande vinkel.',
      'Omkretsen ger ingen information om vinklarna eller hur sidorna förhåller sig till varandra.',
      'Just poängen med areasatsen är att slippa känna till höjden — den beräknas i stället med sinus för den mellanliggande vinkeln.',
    ],
  },
  {
    question: 'I en triangel $ABC$ är vinkeln $B$ mellanliggande vinkel till vilka två sidor?',
    choices: [
      '$a$ och $c$',
      '$a$ och $b$',
      '$b$ och $c$',
      'Alla tre sidorna',
    ],
    correct: 0,
    why: [
      'Sidorna $a$ och $c$ möts i hörn $B$, så det är dessa som är mellanliggande till vinkeln $B$.',
      'Sidan $b$ ligger mitt emot vinkeln $B$ — den möts alltså inte i hörn $B$ och är inte mellanliggande.',
      'Sidan $b$ är motstående sida, inte mellanliggande, till vinkeln $B$.',
      'Endast två sidor möts i varje hörn, inte alla tre.',
    ],
  },
  {
    question: 'En triangel har sidorna $a = 4{,}0$ cm och $b = 6{,}0$ cm med mellanliggande vinkel $C = 30^\\circ$. Vad är triangelns area?',
    choices: [
      '$6{,}0$ cm²',
      '$12$ cm²',
      '$24$ cm²',
      '$3{,}0$ cm²',
    ],
    correct: 0,
    why: [
      'Rätt: $T = \\dfrac{ab\\sin C}{2} = \\dfrac{4{,}0 \\cdot 6{,}0 \\cdot \\sin 30^\\circ}{2} = 6{,}0$ cm².',
      'Detta är $ab\\sin C$ utan att dela med 2 — glöm inte nämnaren i areasatsen.',
      'Detta är bara $a \\cdot b$, utan att alls ta hänsyn till $\\sin C$.',
      'Detta har delats med 2 en gång för mycket — areasatsen har bara en tvåa i nämnaren.',
    ],
  },
  {
    question: 'En triangel har arean $12$ cm². Två sidor är $6{,}0$ cm och $8{,}0$ cm. Hur många möjliga värden finns det för den mellanliggande vinkeln?',
    choices: [
      'Två — cirka $30^\\circ$ och $150^\\circ$',
      'Bara ett — cirka $30^\\circ$',
      'Bara ett — cirka $150^\\circ$',
      'Inget värde är möjligt',
    ],
    correct: 0,
    why: [
      'Rätt — $\\sin C = 0{,}5$ ger $C \\approx 30^\\circ$ eller $C \\approx 150^\\circ$, och till skillnad från sinussatsen finns här ingen vinkelsumma som utesluter någon av dem.',
      'Den trubbiga lösningen $150^\\circ$ är lika giltig — sinus är positivt för både spetsiga och trubbiga vinklar.',
      'Den spetsiga lösningen $30^\\circ$ är lika giltig som den trubbiga.',
      'Ekvationen $\\sin C = 0{,}5$ har en lösning i intervallet $0^\\circ$ till $180^\\circ$.',
    ],
  },
  {
    question: 'I beviset för areasatsen dras en höjd $h$ från ett hörn ner till motstående sida, vilket bildar en rätvinklig triangel. Vilket samband används där för att uttrycka $h$ med sidan $b$ och vinkeln $A$?',
    choices: [
      '$h = b\\sin A$',
      '$h = b\\cos A$',
      '$h = \\dfrac{b}{\\sin A}$',
      '$h = a\\sin A$',
    ],
    correct: 0,
    why: [
      'Rätt — i den rätvinkliga triangeln gäller $\\sin A = \\dfrac{h}{b}$, vilket ger $h = b\\sin A$.',
      'Cosinus för $A$ ger i stället den andra kateten i den rätvinkliga triangeln (avståndet längs basen), inte höjden.',
      'Att dividera i stället för att multiplicera vänder på sambandet — $\\sin A = h/b$ ger $h = b\\sin A$, inte $b/\\sin A$.',
      'Höjden uttrycks med sidan $b$ (hypotenusan i den lilla rätvinkliga triangeln), inte med sidan $a$.',
    ],
  },
],

'ma3c-6.8': [
  {
    question: 'Vad kallas areasatsen, sinussatsen och cosinussatsen tillsammans?',
    choices: [
      'Triangelsatserna',
      'Trigonometriska ekvationerna',
      'Enhetscirkelns satser',
      'Vinkelsumman',
    ],
    correct: 0,
    why: [
      'Just det — de tre satserna kallas gemensamt för triangelsatserna eftersom alla beskriver samband mellan sidor och vinklar i en triangel.',
      'Trigonometriska ekvationer löses med sinus, cosinus och tangens i enhetscirkeln — inte samma sak som satserna om sidor och vinklar i en triangel.',
      'Enhetscirkeln definierar de trigonometriska funktionerna, men areasatsen, sinussatsen och cosinussatsen har inget eget samlingsnamn kopplat till den.',
      'Vinkelsumman ($180^\\circ$ i en triangel) är en enskild regel, inte samlingsnamnet för de tre satserna.',
    ],
  },
  {
    question: 'En triangel har två kända sidor och den mellanliggande vinkeln känd. Vilken sats används lämpligast för att bestämma den tredje sidan?',
    choices: [
      'Cosinussatsen',
      'Sinussatsen',
      'Areasatsen',
      'Vinkelsumman i en triangel',
    ],
    correct: 0,
    why: [
      'Cosinussatsen kopplar samman tre sidor och en vinkel, så den fungerar direkt så fort två sidor och den mellanliggande vinkeln är kända.',
      'Sinussatsen kräver en känd vinkel-sida-motstående-par — här känner vi ingen vinkel som står mot en av de kända sidorna.',
      'Areasatsen ger triangelns area, inte en sidas längd.',
      'Vinkelsumman ger en tredje vinkel om två vinklar är kända — här är det sidor, inte vinklar, som saknas.',
    ],
  },
  {
    question: 'En triangel har en sida och två vinklar kända. Vilken sats används för att bestämma en av de andra sidorna?',
    choices: [
      'Sinussatsen',
      'Cosinussatsen',
      'Areasatsen',
      'Pythagoras sats',
    ],
    correct: 0,
    why: [
      'Med en sida och två vinklar kända (vilket ger alla tre vinklarna via vinkelsumman) ger sinussatsen $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ direkt de andra sidorna.',
      'Cosinussatsen kräver två kända sidor för att lösa ut en tredje sida eller en vinkel — här är bara en sida känd.',
      'Areasatsen ger arean, inte en enskild sidas längd.',
      'Pythagoras sats gäller bara i rätvinkliga trianglar, vilket inte är givet här.',
    ],
  },
  {
    question: 'Alla tre sidorna i en triangel är kända, men ingen vinkel. Vilken sats kan användas för att bestämma en vinkel?',
    choices: [
      'Cosinussatsen',
      'Sinussatsen',
      'Areasatsen',
      'Ingen sats fungerar utan att minst en vinkel är känd',
    ],
    correct: 0,
    why: [
      'Cosinussatsen kan lösas ut med avseende på cosinustermen, t.ex. $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$, så en vinkel kan bestämmas även när bara sidorna är kända.',
      'Sinussatsen kräver att minst en vinkel redan är känd för att kunna sätta upp ett samband — det har vi inte här.',
      'Areasatsen kräver en känd vinkel för att ge arean, och ger i vilket fall inte en vinkel som svar.',
      'Cosinussatsen fungerar utan någon känd vinkel, så en vinkel går faktiskt att bestämma.',
    ],
  },
  {
    question: 'I ett tillämpningsproblem med två höjdvinklar mot samma lodräta linje (t.ex. en flaggstång på en kulle, sedd från en punkt på marken) — hur löser man det?',
    choices: [
      'Man bestämmer först en gemensam sträcka (t.ex. siktlinjen till den övre punkten) med en triangelsats i den ena triangeln, och använder den sträckan som känd i nästa triangel',
      'Man använder cosinussatsen en enda gång och är klar',
      'Man mäter höjden direkt ur figuren utan beräkning',
      'Man löser de två trianglarna helt oberoende av varandra utan att någon storhet återanvänds',
    ],
    correct: 0,
    why: [
      'De två trianglarna delar en sida (siktlinjen till den övre punkten), så den sträckan fungerar som en brygga: bestäm den i den ena triangeln, återanvänd den sedan som känd storhet i den andra.',
      'En enda tillämpning av en sats räcker sällan — det saknas tillräckligt med kända storheter i någon av trianglarna för att lösa hela problemet i ett steg.',
      'Figuren är en skiss, inte skalenlig — höjden måste beräknas med triangelsatserna, inte avläsas.',
      'Trianglarna delar en sida, så den ena triangelns resultat behövs som indata till den andra — de är inte oberoende.',
    ],
  },
],

'ma3c-6.7': [
  {
    question: 'I en triangel $ABC$ med sidorna $a$, $b$ och $c$, vilket uttryck är cosinussatsen för sidan $c$?',
    choices: [
      '$c^2 = a^2 + b^2 - 2ab\\cos C$',
      '$c^2 = a^2 + b^2 + 2ab\\cos C$',
      '$c^2 = a^2 + b^2 - 2ab\\sin C$',
      '$c = a + b - 2ab\\cos C$',
    ],
    correct: 0,
    why: [
      'Precis — kvadraten på sidan mitt emot en vinkel är summan av de andra sidornas kvadrater minus $2ab\\cos C$.',
      'Tecknet framför $2ab\\cos C$ ska vara minus, inte plus — annars stämmer inte formeln när $C = 0^\\circ$ (triangeln "faller ihop" och $c$ borde bli $b - a$, inte $a + b$).',
      'Cosinussatsen innehåller $\\cos C$, inte $\\sin C$ — det är just cosinusfunktionen som ger sambandet mellan sidorna och den mellanliggande vinkeln.',
      'Vänsterledet ska vara $c^2$, inte $c$ — sambandet gäller kvadraterna på sidorna, inte sidorna själva.',
    ],
  },
  {
    question: 'I vilken situation kan cosinussatsen användas, men INTE sinussatsen?',
    choices: [
      'När alla tre sidorna är kända, men ingen vinkel',
      'När en sida och två vinklar är kända',
      'När två sidor och en icke-mellanliggande vinkel är kända',
      'När triangelns omkrets är känd',
    ],
    correct: 0,
    why: [
      'Sinussatsen kräver ett känt vinkel–sida-par (en vinkel och dess motstående sida). Känner man bara tre sidor finns inget sådant par, och cosinussatsen behövs.',
      'Det är precis tvärtom — en sida och två vinklar är sinussatsens klassiska användningsfall, inte cosinussatsens.',
      'Två sidor och en icke-mellanliggande vinkel är också ett fall för sinussatsen, inte cosinussatsen.',
      'Enbart omkretsen (summan av sidorna) räcker inte för att bestämma triangeln entydigt, och det är inte den situation som skiljer satserna åt.',
    ],
  },
  {
    question: 'En triangel $ABC$ har sidorna $a = 6$ cm och $b = 9$ cm, med vinkeln $C = 40^\\circ$ mellan dem. Vilken storhet kan bestämmas direkt med cosinussatsen, utan mellansteg?',
    choices: [
      'Sidan $c$, motstående vinkel $C$',
      'Vinkeln $A$',
      'Vinkeln $B$',
      'Triangelns area',
    ],
    correct: 0,
    why: [
      'Med två sidor och den mellanliggande vinkeln kända ger cosinussatsen $c^2 = a^2 + b^2 - 2ab\\cos C$ sidan $c$ i ett enda steg.',
      'Vinkeln $A$ kräver att sidan $c$ är känd först (för att alla tre sidorna ska vara kända) — det är alltså ett tvåstegsproblem.',
      'Precis som för $A$ krävs sidan $c$ innan $B$ kan bestämmas med cosinus- eller sinussatsen.',
      'Arean kräver kännedom om en höjd eller använder en annan formel (t.ex. $\\frac{1}{2}ab\\sin C$) — det är inte det cosinussatsen ger direkt.',
    ],
  },
  {
    question: 'Varför rekommenderas cosinussatsen framför sinussatsen när man ska bestämma en vinkel och alla tre sidorna är kända?',
    choices: [
      'Cosinus är entydig i intervallet $0^\\circ$–$180^\\circ$, så $\\cos^{-1}$ ger alltid rätt vinkel direkt',
      'Cosinussatsen är alltid enklare att räkna ut för hand',
      'Sinussatsen fungerar bara i rätvinkliga trianglar',
      'Cosinussatsen kräver inte att man känner några sidor alls',
    ],
    correct: 0,
    why: [
      'Cosinus är en-till-en-funktion mellan $0^\\circ$ och $180^\\circ$, medan sinus ger samma värde för en spetsig och dess trubbiga komplementvinkel — sinussatsen kan därför ge en falsk lösning som måste kontrolleras och förkastas.',
      'Beräkningarna är ungefär lika omfattande för båda satserna — fördelen med cosinussatsen ligger i entydigheten, inte enkelheten.',
      'Både sinussatsen och cosinussatsen gäller för godtyckliga trianglar, inte bara rätvinkliga.',
      'Cosinussatsen kräver tvärtom att man känner sidorna (och/eller vinklar) i triangeln — den kan inte användas helt utan information.',
    ],
  },
  {
    question: 'Vilket samband ger cosinussatsen för sidan $a$ (motstående vinkel $A$)?',
    choices: [
      '$a^2 = b^2 + c^2 - 2bc\\cos A$',
      '$a^2 = b^2 + c^2 - 2ab\\cos A$',
      '$a^2 = a^2 + c^2 - 2ac\\cos A$',
      '$a^2 = b^2 - c^2 - 2bc\\cos A$',
      ],
    correct: 0,
    why: [
      'Precis som $c^2 = a^2 + b^2 - 2ab\\cos C$ byts sidorna cykliskt: för $a^2$ används de ANDRA två sidorna $b$ och $c$ tillsammans med $\\cos A$.',
      'Produkttermen ska innehålla just de två sidor som INTE är $a$, det vill säga $b$ och $c$ — inte $a$ och $b$.',
      'Vänsterledet får inte förekomma igen i högerledet ($a^2$ på båda sidor är fel) — högerledet ska bestå av de två andra sidornas kvadrater.',
      'Tecknet mellan $b^2$ och $c^2$ ska vara plus, inte minus — cosinussatsen är en summa av kvadraterna minus dubbla produkttermen.',
    ],
  },
],
};
