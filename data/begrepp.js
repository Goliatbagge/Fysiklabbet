/*
 * Fysiklabbet — Begreppsordlista (dataset).
 *
 * Exponerar window.BEGREPP: en array av begreppsposter. Renderas av
 * begrepp.html (hela listan i bokstavsordning, ankare per begrepp) och
 * används av nyheter.html för att AUTOMATISKT göra första förekomsten av
 * varje begrepp i en artikel klickbar (Wikipedia-stil, med popover).
 *
 * Länkningen är helt automatisk: lägg till en post här, så blir begreppet
 * klickbart i ALLA artiklar (även gamla) nästa gång de visas. Skriv alltså
 * ALDRIG manuella <a href="begrepp.html#…">-länkar i artikeltexterna.
 *
 * Fält per post:
 *   id         – unik slug i a–z, 0–9 och bindestreck (blir ankaret
 *                begrepp.html#<id>); å/ä/ö skrivs a/a/o ("mork-energi")
 *   term       – uppslagsordet som det visas (versal första bokstav,
 *                aldrig title case)
 *   former     – ALLA böjningsformer/varianter som ska kännas igen i
 *                artiklarna, i gemener. Flerordsuttryck är ok
 *                ("mörk energi"). Matchningen sker på hela ord (aldrig
 *                inuti sammansättningar), så lista både grundform,
 *                bestämd form, plural och vanliga sammansättningar som
 *                bör länkas ("kristallgittret").
 *   kort       – 1–2 meningar som sammanfattar begreppet. Visas i
 *                popovern i artiklarna och som ingress i ordlistan.
 *   relaterade – (valfri) array av id:n till besläktade begrepp;
 *                visas som "Se även"-länkar.
 *   body       – array av block, samma typer som i data/nyheter.js:
 *                  { type: 'p',    html: '…' }   stycke (inline-HTML ok)
 *                  { type: 'h2',   text: '…' }   mellanrubrik
 *                  { type: 'fact', title: '…', items: ['…', …] }
 *
 * ⚠️ REN TEXT kontra HTML — den vanligaste fällan:
 *   `term`, `kort`, h2-blockens `text` och faktarutans `title` renderas som
 *   REN TEXT (React-textbarn; popovern sätter dem med textContent). Skriver
 *   du HTML där syns den bokstavligt på skärmen — "9,46&nbsp;·&nbsp;10<sup>12</sup>&nbsp;km".
 *   Använd literalt hårt mellanslag (U+00A0) i stället för &nbsp;, och skriv
 *   om exponenter i ord ("knappt tio biljoner kilometer").
 *   Bara p-blockens `html` och faktarutans `items` renderas som HTML — där
 *   hör <em>, <sup>, &nbsp; och länkar hemma. Ingen KaTeX finns på sidan, så
 *   math-block ($x$) fungerar ingenstans. Validatorn kontrollerar detta.
 *
 * Skrivregler (utöver typografireglerna i CLAUDE.md):
 *   – Målgrupp: gymnasieelever. Begreppen ligger ofta ÖVER gymnasienivå —
 *     förklara dem enklare, utförligare och mer pedagogiskt än artikeln
 *     hann göra. Konkreta vardagsjämförelser är guld.
 *   – Varje post ska stå på egna ben (ingen hänvisning till kurser
 *     eller specifika nyhetsartiklar — sidan listar själv var begreppet
 *     förekommer).
 *   – Ordningen i filen kvittar: begrepp.html sorterar alfabetiskt.
 *   – HTML-kontext: exponenter som 10<sup>−9</sup> (äkta minus U+2212),
 *     &nbsp; mellan tal och enhet, kommatecken som decimalavskiljare.
 */
// Tilldelas direkt till window (ingen global `const BEGREPP`) — annars
// krockar filen med sidor som själva vill deklarera en variabel med det
// namnet, och webbläsaren avbryter med "Identifier has already been declared".
window.BEGREPP = [
  {
    id: 'gravitationslinsning',
    term: 'Gravitationslinsning',
    former: ['gravitationslinsning', 'gravitationslinsningen', 'gravitationslins', 'gravitationslinsen', 'gravitationslinser', 'gravitationslinserna', 'gravitationslinseffekt', 'gravitationslinseffekten', 'svag gravitationslinsning', 'svaga gravitationslinsningen', 'stark gravitationslinsning', 'linsning', 'linsningen'],
    kort: 'Ljus som passerar nära en tung massa böjs av, så att bilden av det som ligger bakom förskjuts, dras ut eller dubbleras. Effekten gör det möjligt att väga massa som inte syns.',
    relaterade: ['mork-materia', 'galaxhop', 'relativitetsteori'],
    body: [
      { type: 'p', html: 'Ljus går den snabbaste vägen genom rummet — men rummet självt är krökt kring tunga föremål. Passerar en ljusstråle nära en stor massa följer den därför en böjd bana, precis som om den gått genom en glaslins. Ligger en tung galaxhop mellan oss och en avlägsen galax kommer galaxens ljus alltså fram till oss från lite fel håll, och bilden hamnar på fel plats, blir utdragen eller syns i flera exemplar samtidigt.' },
      { type: 'p', html: 'Hur kraftig effekten blir beror på hur mycket massa ljuset passerar och hur nära. I de mest spektakulära fallen — stark linsning — dras bakgrundsgalaxen ut till en lysande båge eller till och med en sluten ring runt den tunga hopen. Betydligt vanligare är svag linsning, där formen bara förvrängs med någon procent. Så små förändringar syns inte på en enskild galax, eftersom galaxer har vitt skilda former från början. Men mäter man tiotusentals galaxer i samma område och de visar sig luta systematiskt åt samma håll, går det att räkna ut hur mycket massa som ligger emellan.' },
      { type: 'p', html: 'Att effekten finns förutsades av Albert Einstein och bekräftades vid en solförmörkelse 1919, då stjärnor nära solskivan visade sig stå en aning fel. I dag är gravitationslinsning ett av de viktigaste verktygen inom astronomin — bland annat för att den mäter <em>all</em> massa, inte bara den som lyser, och därmed avslöjar var den mörka materien finns.' }
    ]
  },
  {
    id: 'rotationskurva',
    term: 'Rotationskurva',
    former: ['rotationskurva', 'rotationskurvan', 'rotationskurvor', 'rotationskurvorna', 'galaxrotation', 'galaxrotationen', 'platt rotationskurva', 'platta rotationskurvor'],
    kort: 'En graf över hur fort stjärnorna i en galax rör sig, ritad mot avståndet till galaxens mitt. Att kurvorna är platta är det klassiska skälet att tro på mörk materia.',
    relaterade: ['mork-materia', 'vintergatan'],
    body: [
      { type: 'p', html: 'I ett solsystem gäller en enkel regel: ju längre ut en planet ligger, desto långsammare rör den sig. Merkurius far fram i 47&nbsp;km/s medan Neptunus lunkar i 5,4&nbsp;km/s. Det följer direkt av gravitationslagen — nästan all massa sitter i mitten, i solen, och dess dragningskraft avtar med avståndet.' },
      { type: 'p', html: 'En galax borde bete sig ungefär likadant, eftersom både stjärnorna och ljuset tätnar kraftigt mot mitten. När astronomer på 1960- och 70-talen mätte farten hos gas och stjärnor allt längre ut i spiralgalaxer väntade de sig därför en kurva som stiger nära mitten och sedan sjunker utåt. Det de fick var en kurva som stiger — och sedan lägger sig platt, med i stort sett samma fart ända ut i utkanterna där knappt något ljus finns kvar.' },
      { type: 'p', html: 'En platt kurva betyder att massan innanför en stjärnas bana fortsätter växa ju längre ut man kommer, trots att ljuset tagit slut. Antingen fungerar gravitationen annorlunda på de här avstånden, eller så är galaxen omgiven av ett stort klot av materia som inte lyser. Den andra tolkningen har fått stöd från flera oberoende håll, och rotationskurvorna räknas i dag som det första riktigt svårslagna beviset för att universum innehåller mer massa än vi kan se.' }
    ]
  },
  {
    id: 'karnfusion',
    term: 'Kärnfusion',
    former: ['kärnfusion', 'kärnfusionen', 'fusion', 'fusionen', 'fusioner', 'fusionerna', 'fusionera', 'fusionerar', 'fusionerade', 'fusionsreaktion', 'fusionsreaktionen', 'fusionsreaktioner', 'fusionsreaktor', 'fusionsreaktorn', 'fusionsreaktorer', 'fusionskraft', 'fusionskraften', 'fusionshastighet', 'fusionshastigheten', 'vätefusion', 'vätefusionen', 'kall fusion', 'kalla fusionen'],
    kort: 'Två lätta atomkärnor slås samman till en tyngre, och en del av massan frigörs som energi. Det är kärnfusion som får solen och alla andra stjärnor att lysa.',
    relaterade: ['coulombbarriar', 'tunneleffekt', 'plasma', 'isotop'],
    body: [
      { type: 'p', html: 'Slår man ihop två lätta atomkärnor till en enda blir resultatet nästan alltid lite lättare än delarna var för sig. Den massa som ”försvinner” har inte försvunnit — den har blivit energi, enligt <em>E</em>&nbsp;=&nbsp;<em>m</em>&nbsp;·&nbsp;<em>c</em><sup>2</sup>. Eftersom ljushastigheten i kvadrat är ett gigantiskt tal räcker en försvinnande liten massförändring för att frigöra oerhört mycket energi. Ett gram väte som fusioneras till helium ger ungefär lika mycket energi som tio ton kol som brinner upp.' },
      { type: 'p', html: 'Haken är att kärnorna måste komma varandra oerhört nära innan sammanslagningen kan ske, och de är alla positivt laddade. Positiva laddningar stöter bort varandra, och avstötningen växer brant på korta avstånd. Därför krävs våldsamma förhållanden: i solens kärna är temperaturen omkring 15&nbsp;miljoner grader och trycket ofattbart högt, och materien är där ett plasma, alltså kärnor och elektroner som rör sig fritt från varandra. Även då är fusion en sällsynt händelse för den enskilda kärnan — solen är effektiv först för att den är enormt stor och har enormt gott om tid.' },
      { type: 'p', html: 'Att bygga en fusionsreaktor på jorden har visat sig svårare än man hoppades på 1950-talet. Det räcker inte att få reaktionerna att ske; man måste hålla kvar det urheta plasmat tillräckligt länge, med magnetfält eller med laserpulser, och få ut mer energi än man stoppar in. Lockelsen är att bränslet — deuterium ur havsvatten — finns i praktiskt taget obegränsad mängd, att processen inte kan skena, och att den inte ger något långlivat radioaktivt avfall av det slag som fission gör.' }
    ]
  },
  {
    id: 'coulombbarriar',
    term: 'Coulombbarriär',
    former: ['coulombbarriär', 'coulombbarriären', 'coulombbarriärer', 'coulombbarriärerna', 'coulombtröskel', 'coulombtröskeln'],
    kort: 'Den energitröskel två atomkärnor måste ta sig förbi för att komma tillräckligt nära varandra för att kunna reagera, eftersom de stöter bort varandra elektriskt hela vägen in.',
    relaterade: ['karnfusion', 'tunneleffekt', 'hogladdad-jon'],
    body: [
      { type: 'p', html: 'Alla atomkärnor är positivt laddade, och lika laddningar stöter bort varandra. Kraften följer Coulombs lag och växer som ett genom avståndet i kvadrat: halveras avståndet fyrdubblas avstötningen. Två kärnor som närmar sig varandra måste alltså arbeta allt hårdare ju längre in de kommer, ungefär som att cykla uppför en backe som blir brantare för varje meter.' },
      { type: 'p', html: 'Men riktigt nära, på ett avstånd av några få kärndiametrar, tar en annan kraft över: den starka kärnkraften, som drar kärnpartiklar till sig med väldig styrka men bara på extremt korta håll. Backen har alltså en topp och stupar sedan brant nedåt på andra sidan. Toppens höjd är coulombbarriären. För två vätekärnor ligger den kring några hundra tusen elektronvolt; för tunga kärnor med många protoner är den många gånger högre.' },
      { type: 'p', html: 'Det märkliga är att barriären inte är någon absolut spärr. Kvantmekaniken tillåter partiklar att ta sig igenom hinder de egentligen inte har råd med, och därför sker kärnreaktioner även vid energier långt under barriärens topp — bara mycket, mycket sällan. Ju lägre energi, desto mer osannolikt, och sambandet är exponentiellt: en halvering av energin kan göra reaktionen tusentals gånger ovanligare. Just den branta kurvan är kärnan i varför fusionsenergi är så svårt att få till på jorden.' }
    ]
  },
  {
    id: 'tunneleffekt',
    term: 'Tunneleffekt',
    former: ['tunneleffekt', 'tunneleffekten', 'tunnling', 'tunnlingen', 'kvanttunnling', 'kvanttunnlingen', 'tunnelsannolikhet', 'tunnelsannolikheten', 'tunnelchans', 'tunnelchansen', 'tunnla', 'tunnlar', 'tunnlade'],
    kort: 'Kvantfysikaliskt fenomen där en partikel tar sig igenom ett hinder som den enligt klassisk fysik inte har energi nog att ta sig över. Det är tunneleffekten som får solen att lysa.',
    relaterade: ['coulombbarriar', 'karnfusion', 'nanoskala'],
    body: [
      { type: 'p', html: 'Rulla en boll mot en kulle. Har den för lite fart rullar den en bit uppför och sedan tillbaka — den kommer aldrig över. Så fungerar vardagen. I kvantvärlden gäller inte riktigt det. En partikel har ingen skarpt bestämd plats utan beskrivs av en vågfunktion som är utsmetad i rummet, och den vågen dör inte tvärt vid hindrets kant. En liten del av den läcker igenom och fortsätter på andra sidan. Det betyder att partikeln ibland helt enkelt dyker upp bortom hindret, utan att någonsin ha befunnit sig på toppen.' },
      { type: 'p', html: 'Chansen är oftast försvinnande liten, och den beror mycket känsligt på hindrets höjd och bredd. Görs barriären bara något smalare kan tunnelsannolikheten öka med många tiopotenser. Därför är effekten helt obetydlig för en fotboll mot en vägg — där skulle man få vänta oändligt mycket längre än universums ålder — men helt avgörande på atomskalan, där hindren är tunna och partiklarna lätta.' },
      { type: 'p', html: 'Utan tunneleffekten skulle solen inte lysa: dess kärna är i själva verket för sval för att vätekärnor ska kunna ta sig över sin ömsesidiga avstötning, och det är tunnlandet som räddar situationen. Effekten förklarar också alfasönderfall, där en heliumkärna smiter ut ur en tung atomkärna som den borde vara instängd i. Och den används tekniskt: i sveptunnelmikroskopet mäts en ström av elektroner som tunnlar mellan en nålspets och en yta, en ström så känslig för avståndet att enskilda atomer kan avbildas.' }
    ]
  },
  {
    id: 'hogladdad-jon',
    term: 'Högladdad jon',
    former: ['högladdad jon', 'högladdade joner', 'högladdad', 'högladdade', 'högladdade jonen', 'högladdade jonerna'],
    kort: 'En atom som fått många eller rentav alla sina elektroner bortslitna och därför bär en kraftigt positiv laddning. De finns naturligt i solens yttre lager och tillverkas på konstgjord väg i acceleratorer och jonkällor.',
    relaterade: ['plasma', 'partikelaccelerator', 'penningfalla', 'kvantelektrodynamik'],
    body: [
      { type: 'p', html: 'En vanlig jon — natriumjonen i ett glas saltvatten — har tappat en enda elektron. En högladdad jon har tappat tio, tjugo eller i ytterlighetsfallet allihop, så att bara den nakna atomkärnan återstår. Skillnaden i svårighetsgrad är enorm. Att lossa den yttersta elektronen ur en atom kostar bara några få elektronvolt, men de innersta elektronerna sitter tätt intill kärnan och känner hela dess positiva laddning på nära håll. För ett tungt grundämne krävs tiotusentals gånger mer energi för att få loss dem.' },
      { type: 'p', html: 'Trots det är högladdade joner ingen laboratoriekuriositet — de dominerar universum. I solens korona, där temperaturen är någon miljon grader, har järnatomerna typiskt förlorat ett tiotal elektroner, och en av koronans karakteristiska gröna spektrallinjer kommer just från järn som saknar tretton elektroner. På jorden skapas de antingen i en jonkälla, där en tät elektronstråle slår bort en elektron i taget, eller genom att atomerna accelereras till nära ljushastigheten och skickas genom en tunn folie som sopar av elektronskalen.' },
      { type: 'p', html: 'Att fysiker gärna vill ha tag på dem beror på två saker. Dels är en kärna med bara en eller ingen elektron kvar det enklaste system som finns att räkna på, samtidigt som det elektriska fältet alldeles intill kärnan är ofattbart starkt — starkare än någon laser kan skapa. Dels bär jonen på en väldig lagrad energi: all den energi som gick åt för att slita bort elektronerna finns kvar tills jonen träffar en yta, då den töms på ett ögonblick i en volym på några nanometer. Den effekten går att använda för att mönstra material i mycket liten skala.' }
    ]
  },
  {
    id: 'penningfalla',
    term: 'Penningfälla',
    former: ['penningfälla', 'penningfällan', 'penningfällor', 'penningfällorna', 'jonfälla', 'jonfällan', 'jonfällor', 'jonfällorna', 'jonfälletekniken', 'jonfälleteknik'],
    kort: 'En fälla som håller kvar laddade partiklar mitt i ett vakuum med hjälp av ett starkt magnetfält och ett elektriskt fält. Enstaka joner eller elektroner kan förvaras i månader och mätas med extrem noggrannhet.',
    relaterade: ['hogladdad-jon', 'partikelaccelerator', 'supraledare', 'antimateria'],
    body: [
      { type: 'p', html: 'Hur förvarar man en enda jon? Inte i en burk — den skulle genast driva mot en vägg, ta upp en elektron och sluta vara en jon. Lösningen är att låta fält göra jobbet i stället för väggar. Ett kraftigt magnetfält längs fällans axel tvingar varje laddad partikel att gå i cirkelbanor kring fältlinjerna, och därmed kan den inte ta sig ut åt sidorna.' },
      { type: 'p', html: 'Men magnetfältet räcker inte hela vägen. Den magnetiska kraften verkar alltid vinkelrätt mot rörelsen och kan därför aldrig bromsa en partikel som glider längs med fältlinjen — den skulle helt enkelt spiralera ut genom ändarna. Därför sätter man elektroder i vardera änden och laddar dem så att de stöter bort partikeln tillbaka in mot mitten. Magnetfältet håller den på plats i två riktningar, det elektriska fältet i den tredje, och tillsammans blir partikeln instängd utan att någonsin röra något fast.' },
      { type: 'p', html: 'Namnet kommer från den nederländske fysikern Frans Michel Penning, som använde samma kombination av fält i en vakuummätare. Hans Dehmelt byggde de första fällorna av den här typen och delade Nobelpriset i fysik 1989 för fälltekniken. I hans mest berömda experiment hölls en ensam elektron fångad i månader, vilket gjorde det möjligt att mäta elektronens magnetiska egenskaper med ett dussin korrekta decimaler. I dag används fällorna bland annat till att väga exotiska atomkärnor och till att förvara antimateria vid CERN.' }
    ]
  },
  {
    id: 'kvantelektrodynamik',
    term: 'Kvantelektrodynamik',
    former: ['kvantelektrodynamik', 'kvantelektrodynamiken'],
    kort: 'Teorin för hur ljus och elektriskt laddad materia växelverkar. Den beskriver den elektriska kraften som ett utbyte av fotoner och är den noggrannast prövade teori fysiken har.',
    relaterade: ['kvantmekanik', 'foton', 'standardmodellen', 'antimateria'],
    body: [
      { type: 'p', html: 'Coulombs lag säger att två laddningar drar eller stöter bort varandra på avstånd — men hur vet den ena laddningen att den andra finns där? Kvantelektrodynamikens svar är att de skickar fotoner mellan sig. Den elektriska kraften är helt enkelt ljuspartiklar som kastas fram och tillbaka. Fotonerna kallas virtuella, eftersom de aldrig går att fånga in och mäta; de dyker bara upp som mellansteg i räkningen. Två elektroner som studsar mot varandra gör det alltså inte genom något osynligt gummiband, utan genom ett utbyte.' },
      { type: 'p', html: 'En annan följd är att tomrummet inte är tomt. Partiklar och antipartiklar bubblar hela tiden upp ur vakuumet och försvinner igen innan de hunnit göra av sig. En elektron är därför alltid omgiven av ett myller av sådana kortlivade par, och myllret påverkar hur elektronen uppträder — mycket lite, men mätbart. Det är skälet till att elektronens magnetiska styrka inte är exakt 2, som en enklare teori förutsäger, utan 2,002 319 304 … Beräkningen och mätningen stämmer med varandra på över tio decimaler, vilket gör detta till den skarpaste jämförelsen mellan teori och experiment i hela naturvetenskapen.' },
      { type: 'p', html: 'Teorin fick sin färdiga form på 1940-talet genom Richard Feynman, Julian Schwinger och Sin-Itiro Tomonaga, som delade Nobelpriset 1965. Den fungerar lysande i de förhållandevis svaga elektriska fält vi normalt har omkring oss. Det som fortfarande är obeprövat är motsatta ytterligheten: alldeles intill en tung atomkärna är fältet av storleksordningen 10<sup>16</sup>&nbsp;volt per centimeter, långt bortom vad någon laser kan åstadkomma. Om teorin håller även där vet ingen säkert, och det är därför fysiker lägger ner så mycket möda på att fånga in tunga joner och mäta på dem.' }
    ]
  },
  {
    id: 'viskositet',
    term: 'Viskositet',
    former: ['viskositet', 'viskositeten', 'viskositeter', 'viskositeterna',
             'viskositetsvärde', 'viskositetsvärdet', 'viskositetsgräns',
             'viskositetsgränsen', 'viskositetsintervall', 'viskositetsintervallet',
             'pascalsekund', 'pascalsekunden', 'pascalsekunder'],
    kort: 'Ett mått på hur trögt ett ämne flyter — hur hårt det gör motstånd när skikten inuti det ska glida förbi varandra. Vatten har låg viskositet, honung hög och sten allra högst.',
    relaterade: ['turbulens', 'superfluid'],
    body: [
      { type: 'p', html: 'Rör om i ett glas vatten och skeden möter nästan inget motstånd. Rör om i sirap och du måste ta i. Skillnaden är viskositeten: vätskans inre friktion. Tänk dig vätskan som en trave spelkort. Drar du det översta kortet åt sidan följer kortet under med en aning, och kortet under det en aning mindre. Viskositeten talar om hur stark den kopplingen är — hur stor kraft per ytenhet som krävs för att få två intilliggande skikt att glida förbi varandra med en viss hastighetsskillnad. SI-enheten heter pascalsekund (Pa·s). Luft ligger på omkring 10<sup>−5</sup>&nbsp;Pa·s, vatten på 10<sup>−3</sup>&nbsp;Pa·s, olivolja kring 10<sup>−1</sup>&nbsp;Pa·s och honung runt 10&nbsp;Pa·s.' },
      { type: 'p', html: 'Motståndet kommer av att molekylerna hakar i varandra. I en vätska sitter de tätt och dras till varandra, och för att flyta måste de hela tiden lossa sitt grepp och ta nytt. Värmer man vätskan får molekylerna mer rörelseenergi, greppet lossnar lättare och viskositeten sjunker — därför rinner honung ur burken så mycket villigare efter en stund i varmt vatten. I en gas är det tvärtom. Där finns knappt några bindningar alls; motståndet uppstår i stället genom att snabba molekyler flyger mellan skikten och tar med sig rörelsemängd. Värmer man en gas flyger molekylerna fortare, blandningen går snabbare och viskositeten <em>ökar</em>. Varm luft är alltså trögare än kall.' },
      { type: 'p', html: 'Skalan är enorm. Från luftens 10<sup>−5</sup>&nbsp;Pa·s upp till de allra styvaste bergarterna spänner den över drygt trettio tiopotenser. Beck, det svarta materialet från tjärframställning, ligger kring 10<sup>8</sup>&nbsp;Pa·s: det går att slå sönder med en hammare, men i ett berömt försök i Australien har det droppat ur en tratt ungefär vart tionde år sedan 1927. Glaciäris hamnar på 10<sup>13</sup>–10<sup>17</sup>&nbsp;Pa·s och jordens mantel kring 10<sup>21</sup>&nbsp;Pa·s. Just därför är viskositet alltid knutet till en tidsskala: nästan allting flyter, om man bara har tålamod att vänta tillräckligt länge på det.' }
    ]
  },
  {
    id: 'subduktion',
    term: 'Subduktion',
    former: ['subduktion', 'subduktionen', 'subduktionszon', 'subduktionszonen',
             'subduktionszoner', 'subduktionszonerna', 'subducera', 'subducerar', 'subducerad'],
    kort: 'När en av jordens tektoniska plattor glider ner under en annan och sjunker in i manteln. Där bildas djuphavsgravar, vulkankedjor och de kraftigaste jordbävningarna.',
    relaterade: ['viskositet'],
    body: [
      { type: 'p', html: 'Jordens yttersta skal är inte ett enda stycke utan ett femtontal styva plattor som sakta glider omkring, ungefär lika fort som naglar växer — några centimeter om året. Eftersom jorden inte blir större måste det som skapas någonstans försvinna någon annanstans. Ny havsbottenplatta bildas längs de undervattensryggar där plattor dras isär, och den gamla plattan görs av med genom subduktion: den dyker ner under sin granne och sjunker in i manteln.' },
      { type: 'p', html: 'Vilken platta som åker ner avgörs av tätheten. Havsbottenplattor består av tyngre bergarter än kontinenterna och blir dessutom kallare och tätare med åldern, så det är i stort sett alltid havsbottnen som förlorar. På havsytan syns nedgången som en djuphavsgrav — Marianergraven, jordens djupaste punkt på nästan elva kilometer, är just en sådan. Med sig ner tar plattan vatten som suttit bundet i bergarterna. Vattnet pressas ut på djupet och sänker smältpunkten hos berget ovanför, som delvis smälter och stiger upp. Det är därför vulkankedjor som Andernas och Japans följer subduktionszonerna som ett band.' },
      { type: 'p', html: 'Kontakten mellan de två plattorna kärvar samtidigt som de trycks mot varandra, och när greppet till slut släpper frigörs den upplagrade energin på en gång. Världens allra kraftigaste jordbävningar sitter därför i subduktionszoner, och eftersom brottytan ofta ligger under havet lyfts vattenmassan ovanför och skapar tsunamier. Att en platta över huvud taget kan böja sig nedåt är för övrigt märkligare än det låter: berget är stelt på människors tidsskala, men på miljontals år beter det sig som en oerhört trögflytande vätska.' }
    ]
  },
  {
    id: 'maxwelltid',
    term: 'Maxwelltid',
    former: ['maxwelltid', 'maxwelltiden', 'maxwelltider',
             'maxwells relaxationstid', 'maxwellrelaxationstid', 'relaxationstid', 'relaxationstiden'],
    kort: 'Den tid man måste vänta innan ett material slutar bete sig som en fjäder och börjar bete sig som en trögflytande vätska. Man får den genom att dividera viskositeten med materialets styvhet.',
    relaterade: ['viskositet'],
    body: [
      { type: 'p', html: 'Det finns en leksaksmassa, hoppgummi, som svarar helt olika beroende på hur snabbt man behandlar den. Kastar man en klump i golvet studsar den som en boll. Lämnar man samma klump på bordet över natten har den flutit ut till en pannkaka. Massan är varken fast eller flytande — den är båda, och vilket beteende som visar sig avgörs av tiden. Gränsen mellan de två kallas materialets maxwelltid, efter fysikern James Clerk Maxwell.' },
      { type: 'p', html: 'Bakom ligger en enkel modell: en fjäder och en trög dämpare kopplade efter varandra. Fjädern står för det elastiska, den del som fjädrar tillbaka när kraften släpper. Dämparen står för det trögflytande, den del som ger efter för gott. Snabba påfrestningar hinner bara fjädern reagera på, och materialet känns fast. Långsamma påfrestningar hinner dämparen släppa igenom, och materialet flyter. Maxwelltiden räknas ut genom att dividera viskositeten med styvheten (skjuvmodulen), och den anger var omslaget sker. Påfrestningar som är mycket kortare än maxwelltiden möts av ett fast ämne, påfrestningar som är mycket längre av en vätska.' },
      { type: 'p', html: 'För jordens mantel, med en viskositet kring 10<sup>21</sup>&nbsp;Pa·s och en styvhet kring 10<sup>11</sup>&nbsp;Pa, blir maxwelltiden ungefär 10<sup>10</sup> sekunder — några hundra år. Det förklarar två observationer som annars verkar motsäga varandra. En jordbävningsvåg, som passerar på sekunder, möter ett stelt berg och går rakt igenom. Men Skandinavien, som pressades ner av inlandsisen och blev av med den för tiotusen år sedan, reser sig fortfarande någon centimeter om året — för på den tidsskalan är samma berg en vätska som långsamt rinner tillbaka på plats.' }
    ]
  },
  {
    id: 'absoluta-nollpunkten',
    term: 'Absoluta nollpunkten',
    former: ['absoluta nollpunkten', 'absolut nollpunkt'],
    kort: 'Den lägsta temperatur som över huvud taget kan finnas: −273,15 °C, eller 0 kelvin. Där har partiklarnas värmerörelse i princip helt stannat av.',
    relaterade: ['supraledare', 'superfluid'],
    body: [
      { type: 'p', html: 'Temperatur är egentligen ett mått på hur mycket ett ämnes atomer och molekyler rör sig: i het ånga far vattenmolekylerna omkring i hög fart, i kallt is-vatten kryper de långsamt. Kyler man något blir rörelsen mindre och mindre — och då måste det finnas en botten, en temperatur där rörelsen inte kan bli mindre. Den bottnen kallas den absoluta nollpunkten och ligger vid −273,15&nbsp;°C. Kelvinskalan är byggd så att den börjar precis där: 0&nbsp;K är absoluta nollpunkten, och en grad på kelvinskalan är lika stor som en grad Celsius.' },
      { type: 'p', html: 'Nollpunkten går att komma hur nära som helst — men aldrig att nå exakt. Dels säger termodynamiken att varje kylsteg bara tar bort en del av den värme som finns kvar, dels säger kvantmekaniken att partiklar aldrig kan ligga helt stilla: även vid 0&nbsp;K finns en liten kvarvarande darrning som kallas nollpunktsrörelse. Med laserkylning och magnetfällor har forskare ändå kylt små gasmoln till under en miljarddels kelvin — kallare än någon naturlig plats i universum.' },
      { type: 'p', html: 'Det är nära den absoluta nollpunkten som materiens konstigaste sidor visar sig: metaller som leder ström utan motstånd (supraledning), vätskor som rinner utan friktion (superfluiditet) och gasmoln där tusentals atomer smälter samman till en enda gemensam kvantvåg (Bose–Einstein-kondensat).' }
    ]
  },
  {
    id: 'bose-einstein-kondensat',
    term: 'Bose–Einstein-kondensat',
    former: ['bose–einstein-kondensat', 'bose-einstein-kondensat', 'bose–einstein-kondensatet', 'bose-einstein-kondensatet', 'bose–einstein-kondensaten', 'bose-einstein-kondensaten', 'kondensat', 'kondensatet', 'kondensaten', 'rubidiumkondensat', 'rubidiumkondensatet', 'rubidiumkondensaten', 'kaliumkondensat', 'kaliumkondensatet', 'atomkondensat'],
    kort: 'Den kallaste form av materia som går att tillverka: en gas där alla atomer har fallit ner i samma kvanttillstånd och tillsammans beter sig som en enda gemensam våg.',
    relaterade: ['absoluta-nollpunkten', 'boson', 'superfluid', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'I en vanlig gas far atomerna omkring huller om buller, var och en med sin egen fart och sin egen riktning. Ju kallare gasen blir, desto trögare rör de sig — och kyler man tillräckligt hårt händer något som inte har någon motsvarighet i vardagen: atomerna slutar vara enskilda partiklar. I stället samlas de allihop i det lägsta energitillstånd som finns, och hela molnet beskrivs av en enda gemensam kvantvåg. Det är ett Bose–Einstein-kondensat, ibland kallat materiens femte aggregationstillstånd vid sidan av fast, flytande, gas och plasma.' },
      { type: 'p', html: 'Att det över huvud taget är möjligt beror på vilken sorts partiklar atomerna är. Naturens partiklar delas i två familjer: fermioner, som vägrar dela tillstånd med varandra, och bosoner, som tvärtom gärna gör det. Atomer med ett jämnt totalt antal byggstenar räknas som bosoner, och det är bara sådana som kan kondensera. Fenomenet förutsades av Satyendra Nath Bose och Albert Einstein 1924–1925, men först 1995 lyckades någon framställa det i ett laboratorium — med hjälp av laserkylning och magnetfällor, som tillsammans kan pressa ner ett litet gasmoln till några miljarddels grader över den absoluta nollpunkten. Upptäckten gav Nobelpriset i fysik 2001.' },
      { type: 'p', html: 'Ett kondensat är kallare än någon plats som finns naturligt i universum, och just därför användbart. Eftersom alla atomer svänger i takt fungerar molnet som en materievåg som går att dela i två delar, skicka olika vägar och sedan lägga ihop igen — samma trick som med ljus i en interferometer, fast med atomer som har massa och därför känner av tyngdkraften. Sådana mätningar hör i dag till de känsligaste som finns för acceleration, rotation och små skillnader i gravitationen.' }
    ]
  },
  {
    id: 'boson',
    term: 'Boson',
    former: ['boson', 'bosonen', 'bosoner', 'bosonerna'],
    kort: 'En partikel av den familj som gärna samsas i samma kvanttillstånd — motsatsen till fermionerna, som aldrig kan dela tillstånd med varandra.',
    relaterade: ['spinn', 'higgsbosonen', 'bose-einstein-kondensat', 'foton'],
    body: [
      { type: 'p', html: 'Alla partiklar i naturen tillhör en av två familjer, och gränsen mellan dem dras av en egenskap som kallas spinn — ett slags inbyggd rotation som bara kan ha bestämda värden. Partiklar med halvtaligt spinn kallas fermioner: elektroner, protoner och neutroner hör dit. Partiklar med heltaligt spinn kallas bosoner, och dit hör bland annat ljuspartikeln fotonen.' },
      { type: 'p', html: 'Skillnaden i beteende är dramatisk. Två fermioner kan aldrig befinna sig i exakt samma tillstånd samtidigt — det är därför elektronerna i en atom tvingas fördela sig på olika skal i stället för att alla lägga sig innerst, och i förlängningen därför materia tar plats. Bosoner har ingen sådan spärr. Tvärtom blir det mer sannolikt att en boson hamnar i ett visst tillstånd ju fler som redan finns där. Laserns skarpa stråle bygger på just den flockningen: alla fotoner marscherar i takt.' },
      { type: 'p', html: 'Sammansatta objekt räknas efter hur många byggstenar de innehåller. En atom med jämnt totalt antal protoner, neutroner och elektroner beter sig utåt som en boson, och kan därför bilda ett Bose–Einstein-kondensat om den kyls tillräckligt. Med udda antal blir atomen i stället en fermion och vägrar — sådana gaser måste kylas på helt andra sätt, och beter sig då som elektronerna i en metall snarare än som ljus i en laser.' }
    ]
  },
  {
    id: 'ekvivalensprincipen',
    term: 'Ekvivalensprincipen',
    former: ['ekvivalensprincipen', 'ekvivalensprincip', 'ekvivalensprinciper', 'ekvivalensprincipsförsök'],
    kort: 'Påståendet att den massa som gör ett föremål trögt att sätta i rörelse är exakt samma massa som gör det tungt — och därför faller allting lika fort.',
    relaterade: ['relativitetsteori'],
    body: [
      { type: 'p', html: 'Massa dyker upp på två helt olika ställen i fysiken. Dels bestämmer den hur trögt ett föremål är: ju större massa, desto mer kraft krävs för att ändra dess rörelse. Dels bestämmer den hur hårt jorden drar i föremålet. Det finns ingen självklar anledning till att de två talen skulle vara samma sak — men de är det, och det är innebörden av ekvivalensprincipen.' },
      { type: 'p', html: 'Följden är den observation som brukar tillskrivas Galileo Galilei: släpper man två föremål samtidigt landar de samtidigt, hur olika de än är, så länge luftmotståndet inte lägger sig i. En tung sten dras visserligen hårdare av jorden, men den är i exakt samma grad trögare att sätta i rörelse, och de två effekterna tar ut varandra. Den mest sedda demonstrationen gjordes 1971 på månen, där en hammare och en fjäder släpptes framför en tv-kamera och landade i samma ögonblick.' },
      { type: 'p', html: 'Albert Einstein tog principen ett steg längre och gjorde den till grunden för den allmänna relativitetsteorin: eftersom allt faller lika fort går det inte att med något experiment inne i en sluten hiss avgöra om hissen står stilla i ett gravitationsfält eller accelererar ute i rymden. Skulle det någon gång visa sig att två ämnen faller olika fort, om än med en obetydlighet, skulle det peka mot en okänd kraft — och därför mäts saken om och om igen, med allt bättre metoder. Hittills har principen hållit i varje test.' }
    ]
  },
  {
    id: 'atominterferometri',
    term: 'Atominterferometri',
    former: ['atominterferometri', 'atominterferometrin', 'atominterferometer', 'atominterferometern', 'atominterferometrar', 'atominterferometrarna', 'materievåg', 'materievågen', 'materievågor', 'materievågorna'],
    kort: 'En mätmetod där ett moln av atomer behandlas som en våg: den delas i två delar som går olika vägar och läggs ihop igen, och mönstret som uppstår avslöjar minsta skillnad mellan vägarna.',
    relaterade: ['interferens', 'bose-einstein-kondensat', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'Kvantfysikens kanske mest överraskande besked är att materia beter sig som vågor. En atom som rör sig har en våglängd, precis som ljus, och kan därför göra allt som vågor gör: böja av runt hinder, mötas och förstärka varandra, eller mötas och släcka ut varandra. Våglängden är visserligen försvinnande liten för vardagliga föremål, men för en atom som kylts nästan till stillastående blir den fullt mätbar.' },
      { type: 'p', html: 'En atominterferometer utnyttjar detta. I stället för halvgenomskinliga speglar används korta laserpulser, som delar atommolnet så att det tar två vägar samtidigt — en aning högre upp och en aning längre ner, eller åt två håll. En stund senare förs delarna ihop igen. Har de två vägarna varit exakt likvärdiga hamnar atomerna i ett bestämt tillstånd; har den ena vägen varit det allra minsta annorlunda syns det direkt som en förskjutning i mönstret.' },
      { type: 'p', html: 'Eftersom atomer har massa känner de av tyngdkraften, och det gör metoden extremt känslig för acceleration. Med atominterferometrar mäts i dag tyngdaccelerationen med många decimalers noggrannhet, och de används för att kartlägga berggrund, hitta hålrum under mark och navigera utan satellitsignal. Noggrannheten växer snabbt med hur länge atomerna hinner falla fritt — vilket är skälet till att sådana instrument gärna vill upp i tyngdlöshet, där fallet aldrig tar slut.' }
    ]
  },
  {
    id: 'altermagnetism',
    term: 'Altermagnetism',
    former: ['altermagnetism', 'altermagnetismen', 'altermagnet', 'altermagneter', 'altermagneterna', 'altermagnetisk', 'altermagnetiskt', 'altermagnetiska'],
    kort: 'En tredje sorts magnetism, identifierad på 2020-talet: materialet är omagnetiskt utåt som en antiferromagnet, men elektronerna beter sig som i en ferromagnet.',
    relaterade: ['spinn', 'gitter'],
    body: [
      { type: 'p', html: 'I skolan möter man en sorts magnetism: den i kylskåpsmagneter och kompassnålar, som kallas ferromagnetism. Där pekar elektronernas små inbyggda magneter — deras spinn — åt samma håll, och materialet får ett magnetfält utåt. Sedan länge känner fysiken också till antiferromagneter, där grannatomernas spinn pekar åt varsitt håll och tar ut varandra, så att materialet utåt sett är helt omagnetiskt.' },
      { type: 'p', html: 'Altermagneter är något mittemellan — och blev allmänt accepterade som en egen, tredje klass först runt 2022. Precis som i en antiferromagnet pekar grannspinnen åt motsatta håll, så inget magnetfält läcker ut. Men atomerna med motsatt spinn sitter dessutom <em>vridna</em> i förhållande till varandra i kristallgittret, och den vridningen gör att elektroner med olika spinn ändå får olika energi och rör sig olika lätt — precis det som annars är ferromagnetens signum.' },
      { type: 'p', html: 'Kombinationen är het inom forskningsfältet spinntronik, som vill bygga elektronik där informationen bärs av spinn i stället för laddning: altermagneter kan växlas mycket snabbt, störs inte av yttre magnetfält och läcker inga egna fält som stör grannkomponenterna.' }
    ]
  },
  {
    id: 'exciterat-tillstand',
    term: 'Exciterat tillstånd',
    former: ['exciterat tillstånd', 'exciterade tillstånd', 'exciterade tillståndet', 'exciterade tillstånden', 'exciterad', 'exciterat', 'exciterade', 'exciteras', 'excitation', 'excitationen', 'excitationer', 'deexciteras', 'deexcitation'],
    kort: 'Ett tillstånd där en atom, atomkärna eller molekyl bär på mer energi än sitt lägsta möjliga tillstånd — som en uppdragen fjäder som väntar på att få släppa ut sin energi.',
    relaterade: ['spinn'],
    body: [
      { type: 'p', html: 'Elektronerna i en atom kan inte ha vilken energi som helst — de är hänvisade till bestämda energinivåer, ungefär som pinnarna i en stege. Det lägsta steget kallas grundtillståndet, och där ligger atomen om den får vara i fred. Träffas atomen av exakt rätt energiportion — till exempel en ljuspartikel, en foton — kan en elektron lyftas till ett högre steg. Då säger man att atomen är <em>exciterad</em>, eller befinner sig i ett exciterat tillstånd.' },
      { type: 'p', html: 'Ett exciterat tillstånd är nästan alltid kortlivat. Efter en bråkdels sekund faller elektronen tillbaka ner (atomen <em>deexciteras</em>) och energiskillnaden skickas ut som en foton med exakt den våglängd som motsvarar hoppet. Det är därför varje grundämne lyser med sina egna karakteristiska färger — det är så neonskyltar får sitt röda sken, norrskenet sina färger och astronomer kan avgöra vad avlägsna stjärnor består av. Även atomkärnor kan exciteras; när de faller tillbaka skickar de ut gammastrålning.' },
      { type: 'p', html: 'Ordet kommer från engelskans <em>excited state</em> — men på svenska heter det alltid exciterad, aldrig ”upphetsad”.' }
    ]
  },
  {
    id: 'fotonisk-kristall',
    term: 'Fotonisk kristall',
    former: ['fotonisk kristall', 'fotoniska kristaller', 'fotoniska kristallen', 'fotoniska kristallerna'],
    kort: 'Ett material med ett inbyggt, regelbundet mönster i nanostorlek som bestämmer vilka ljusvåglängder som får passera — ett slags kristallgitter för ljus.',
    relaterade: ['gitter', 'interferens', 'metamaterial'],
    body: [
      { type: 'p', html: 'I en vanlig kristall sitter atomerna i ett regelbundet mönster som styr hur elektroner kan röra sig genom materialet — vissa energier är tillåtna, andra förbjudna. En fotonisk kristall gör exakt samma sak, fast för ljus: materialet är uppbyggt av ett regelbundet mönster av två ämnen med olika ljusbrytning, upprepat med ett avstånd i samma storleksordning som ljusets våglängd (några hundra nanometer för synligt ljus).' },
      { type: 'p', html: 'När ljus försöker ta sig igenom mönstret reflekteras små delvågor från varje lager, och för vissa våglängder släcker eller förstärker delvågorna varandra genom interferens. Resultatet blir ”förbjudna band”: våglängder som helt enkelt inte kan färdas genom materialet utan kastas tillbaka. Naturen kom på tricket långt före oss — morphofjärilens metalliskt blå vingar, opalers färgspel och påfågelns stjärtfjädrar får sina färger från mikroskopiska mönster, inte från pigment. Det kallas strukturfärg och bleknar aldrig.' },
      { type: 'p', html: 'Tekniskt används fotoniska kristaller bland annat i specialoptiska fibrer, i effektivare lysdioder och lasrar, och som byggsten i framtida kretsar där ljus i stället för elektroner bär informationen.' }
    ]
  },
  {
    id: 'gitter',
    term: 'Gitter',
    former: ['gitter', 'gittret', 'kristallgitter', 'kristallgittret', 'atomgitter', 'atomgittret', 'metallgitter', 'metallgittret', 'gitterstruktur', 'gitterstrukturen', 'diffraktionsgitter', 'diffraktionsgittret', 'bikakegitter', 'bikakegittret'],
    kort: 'Det regelbundna, upprepade mönster som atomerna bildar i en kristall. Ordet används också om optiska gitter — täta mönster av spalter eller spår som delar upp ljus i sina färger.',
    relaterade: ['fotonisk-kristall', 'interferens', 'tidskristall'],
    body: [
      { type: 'p', html: 'I ett fast ämne som är kristallint — metaller, salt, is, diamant — sitter atomerna inte huller om buller utan i ett strikt geometriskt mönster som upprepar sig i alla riktningar: ett kristallgitter. Gittret avgör många av materialets egenskaper. Att diamant och grafit är så olika trots att båda är rent kol beror helt på hur kolatomernas gitter ser ut. Värme i ett fast ämne är i själva verket vibrationer som fortplantar sig genom gittret, och när elektroner krockar med gittrets vibrationer uppstår elektriskt motstånd.' },
      { type: 'p', html: 'Inom optiken betyder gitter något besläktat men annorlunda: en skiva med tusentals tätt liggande, jämnt fördelade spalter eller spår. När ljus passerar böjs det olika mycket beroende på våglängd, och genom interferens delas ljuset upp i ett skarpt spektrum — mycket skarpare än genom ett prisma. Det är samma effekt som gör att en cd-skivas undersida skimrar i regnbågens färger: de tätt packade dataspåren fungerar som ett gitter.' }
    ]
  },
  {
    id: 'interferens',
    term: 'Interferens',
    former: ['interferens', 'interferensen', 'interferera', 'interfererar', 'interfererade', 'interferensmönster', 'interferensmönstret'],
    kort: 'När två vågor möts och lägger ihop sig: vågtopp på vågtopp förstärker varandra, medan vågtopp på vågdal släcker ut varandra.',
    relaterade: ['fotonisk-kristall', 'gitter'],
    body: [
      { type: 'p', html: 'Släpp två stenar samtidigt i en stilla damm och titta där ringarna korsas: på vissa ställen gungar vattnet extra kraftigt, på andra ligger det nästan stilla. Det är interferens. När två vågor möts adderas de helt enkelt — kommer topp och topp samtidigt blir resultatet en dubbelt så hög topp (konstruktiv interferens), kommer topp och dal samtidigt tar de ut varandra (destruktiv interferens).' },
      { type: 'p', html: 'För ljus är interferensen själva beviset på att ljus är en vågrörelse. Skickas ljus genom två smala spalter bildas ett randmönster av ljusa och mörka band på en skärm bakom — ljust där vågorna förstärker varandra, mörkt där de släcker ut varandra. Samma fenomen ger såpbubblans och oljefläckens skiftande färger: ljus som studsar på hinnans över- och undersida interfererar, och vilka färger som förstärks beror på hinnans tjocklek.' },
      { type: 'p', html: 'Interferens är också ett av fysikens vassaste mätverktyg. Instrument som delar en ljusstråle i två vägar och låter dem mötas igen — interferometrar — kan avslöja väglängdsskillnader mindre än en tusendel av en atomdiameter. Det var så gravitationsvågor upptäcktes 2015.' }
    ]
  },
  {
    id: 'kiralitet',
    term: 'Kiralitet',
    former: ['kiralitet', 'kiraliteten', 'kiral', 'kiralt', 'kirala'],
    kort: 'Egenskapen att skilja sig från sin egen spegelbild — som en höger- och en vänsterhand. Molekyler, kristaller och till och med ljus kan vara kirala.',
    body: [
      { type: 'p', html: 'Håll upp händerna framför dig: de är varandras spegelbilder, men hur du än vrider och vänder går de inte att lägga exakt ovanpå varandra. Ett föremål med den egenskapen kallas kiralt — ordet kommer från grekiskans <em>cheir</em>, hand. En kula eller en slät mugg är däremot inte kiral: dess spegelbild är identisk med originalet.' },
      { type: 'p', html: 'Många molekyler är kirala och finns i en ”höger-” och en ”vänsterversion” med samma atomer i samma ordning. Det låter harmlöst, men kroppens mottagarmolekyler är själva kirala och känner skillnad: molekylen limonen luktar apelsin i den ena spegelformen och terpentinaktigt barr i den andra, och inom läkemedelsutveckling kan spegelformerna ha helt olika medicinsk effekt. Nästan allt liv på jorden använder dessutom bara den ena spegelformen av sina aminosyror — varför är fortfarande en olöst gåta.' },
      { type: 'p', html: 'Även ljus kan vara kiralt: i cirkulärpolariserat ljus skruvar sig det elektriska fältet som en spiral, medurs eller moturs, längs strålens väg. Sådant ljus växelverkar olika starkt med höger- och vänsterversionen av en kiral molekyl, vilket gör det till ett fint verktyg för att skilja spegelformer åt.' }
    ]
  },
  {
    id: 'kosmologiska-konstanten',
    term: 'Kosmologiska konstanten',
    former: ['kosmologiska konstanten', 'kosmologisk konstant'],
    kort: 'En term i Einsteins ekvationer, betecknad Λ (lambda), som ger tomma rymden en inbyggd energi. I dag är den enklaste förklaringen till att universums expansion accelererar.',
    relaterade: ['mork-energi', 'mork-materia'],
    body: [
      { type: 'p', html: 'När Einstein 1917 använde sin allmänna relativitetsteori på hela universum stötte han på ett problem: ekvationerna vägrade att ge det stillastående universum alla på den tiden trodde på — gravitationen borde få allting att dras ihop. Han lade därför till en extra term, den kosmologiska konstanten Λ, som fungerar som ett utåtriktat tryck och kunde hålla universum i balans. När Edwin Hubble sedan visade att universum expanderar ångrade Einstein tillägget djupt.' },
      { type: 'p', html: 'Men konstanten fick en andra chans. 1998 upptäckte två forskarlag, med hjälp av avlägsna supernovor, att universums expansion inte bromsar in — den <em>accelererar</em>. Något måste trycka på, och den enklaste kandidaten visade sig vara just Λ: en konstant energitäthet som finns i själva rymden, så att mer rymd betyder mer utåtriktat tryck. Kosmologins standardmodell heter i dag ΛCDM — lambda plus kall mörk materia.' },
      { type: 'p', html: 'Ett stort olöst problem kvarstår: när partikelfysiker försöker räkna ut hur stor vakuumets energi <em>borde</em> vara hamnar de omkring 10<sup>120</sup> gånger fel jämfört med det uppmätta värdet. Det brukar kallas fysikhistoriens sämsta teoretiska förutsägelse — och är ett tecken på att något grundläggande fortfarande saknas i pusslet.' }
    ]
  },
  {
    id: 'kvantsammanflatning',
    term: 'Kvantsammanflätning',
    former: ['kvantsammanflätning', 'kvantsammanflätningen', 'sammanflätning', 'sammanflätningen', 'sammanflätade', 'sammanflätat', 'sammanflätas', 'kvantsammanflätade', 'kvantsammanflätat'],
    kort: 'Ett kvantfenomen där två partiklar delar ett gemensamt tillstånd, så att en mätning på den ena omedelbart avgör resultatet för den andra — oavsett avståndet mellan dem.',
    relaterade: ['spinn'],
    body: [
      { type: 'p', html: 'När två partiklar skapas tillsammans eller får växelverka kan de hamna i ett gemensamt kvanttillstånd där ingen av dem längre har egna, färdiga egenskaper — bara paret som helhet är bestämt. Mäter man då den ena partikeln, till exempel dess spinn, är det i samma ögonblick avgjort vad en mätning på den andra kommer att ge. Det gäller även om partiklarna hunnit hamna i varsin ände av galaxen.' },
      { type: 'p', html: 'Einstein misstrodde fenomenet och kallade det ”spöklik avståndsverkan” — han menade att partiklarna rimligen måste bära med sig hemliga förutbestämda svar. Men fysikern John Bell visade på 1960-talet att de två förklaringarna går att skilja åt experimentellt, och alla experiment sedan dess har gett kvantmekaniken rätt: korrelationerna är starkare än någon ”hemlig lapp i fickan” kan åstadkomma. Experimenten belönades med Nobelpriset i fysik 2022.' },
      { type: 'p', html: 'Viktigt att veta: sammanflätning kan inte användas för att skicka meddelanden snabbare än ljuset — mätresultaten ser slumpmässiga ut tills de jämförs via en vanlig, ljushastighetsbegränsad kanal. Däremot är sammanflätning själva råvaran i kvantdatorer, kvantkryptering och kvantteleportering.' }
    ]
  },
  {
    id: 'kvasar',
    term: 'Kvasar',
    former: ['kvasar', 'kvasaren', 'kvasarer', 'kvasarerna'],
    kort: 'Kärnan i en avlägsen galax som lyser starkare än hela galaxen omkring den. Ljuset kommer från gas som hettas upp våldsamt när den faller in mot ett supermassivt svart hål.',
    body: [
      { type: 'p', html: 'När radioastronomer på 1960-talet ringade in några starka radiokällor på himlen såg de i teleskopen bara stjärnliknande ljusprickar — objekten döptes till kvasarer, av engelskans <em>quasi-stellar</em>, ”stjärnliknande”. Chocken kom när avstånden mättes: prickarna låg miljarder ljusår bort. För att synas alls på det avståndet måste de lysa hundratals gånger starkare än en hel galax, från ett område inte större än vårt solsystem.' },
      { type: 'p', html: 'Förklaringen är materiens sista resa in i ett supermassivt svart hål. I centrum av kvasarens värdgalax sitter ett svart hål med miljoner till miljarder solmassor. Gas som faller in mot det lägger sig i en snabbt roterande skiva — en ackretionsskiva — där friktionen hettar upp gasen till miljontals grader så att den lyser intensivt över hela spektrumet. Många kvasarer skjuter dessutom ut strålar av partiklar i nära ljushastighet, vinkelrätt mot skivan.' },
      { type: 'p', html: 'Eftersom kvasarernas ljus har rest i miljarder år fungerar de som strålkastare från universums barndom: i deras ljus kan astronomer läsa av vilken gas som fanns mellan galaxerna för länge sedan, och hur tidigt de första jättesvarta hålen hann växa sig stora.' }
    ]
  },
  {
    id: 'metamaterial',
    term: 'Metamaterial',
    former: ['metamaterial', 'metamaterialet', 'metamaterialen'],
    kort: 'Konstgjorda material uppbyggda av små, noggrant utformade byggstenar som ger egenskaper inget naturligt material har — till exempel att bryta ljus åt ”fel” håll.',
    relaterade: ['fotonisk-kristall'],
    body: [
      { type: 'p', html: 'Ett vanligt materials egenskaper bestäms av dess kemi — vilka atomer det består av och hur de binder till varandra. Ett metamaterial fuskar: det byggs upp av små konstgjorda strukturer (metallslingor, stavar, hål) som är mindre än våglängden hos de vågor materialet ska påverka. Vågen kan då inte urskilja de enskilda byggstenarna utan känner bara av deras samlade verkan — och den kan konstrueras nästan fritt. Grekiskans <em>meta</em> betyder ”bortom”: egenskaper bortom de naturliga.' },
      { type: 'p', html: 'Det mest berömda exemplet är negativt brytningsindex: ljus som går in i materialet bryts åt motsatt håll mot vad det gör i vatten eller glas — något inget känt naturligt material klarar. Samma idé ligger bakom experiment med ”osynlighetsmantlar” som leder ljus eller mikrovågor runt ett föremål, superlinser som ser detaljer mindre än ljusets våglängd, och akustiska metamaterial som stoppar ljud som borde ta sig igenom. Principen är alltså inte begränsad till ljus — den fungerar för alla slags vågor.' }
    ]
  },
  {
    id: 'mork-energi',
    term: 'Mörk energi',
    former: ['mörk energi', 'mörka energin'],
    kort: 'Den okända form av energi som får universums expansion att gå allt fortare. Den utgör ungefär 68 % av universums totala energiinnehåll — och ingen vet vad den är.',
    relaterade: ['mork-materia', 'kosmologiska-konstanten'],
    body: [
      { type: 'p', html: 'Att universum expanderar har varit känt sedan 1920-talet, och länge var den självklara frågan hur mycket gravitationen bromsar expansionen. 1998 mätte två forskarlag inbromsningen med hjälp av avlägsna supernovor av en typ vars verkliga ljusstyrka är känd — och fick ett svar ingen väntat sig: expansionen bromsar inte alls, den <em>accelererar</em>. Upptäckten belönades med Nobelpriset i fysik 2011, och ”någonting” som knuffar på expansionen fick arbetsnamnet mörk energi.' },
      { type: 'p', html: 'Mätningar av den kosmiska bakgrundsstrålningen och av hur galaxer klumpar sig ger samma bild: universums energiinnehåll består till ungefär 68&nbsp;% av mörk energi, 27&nbsp;% mörk materia och bara 5&nbsp;% vanlig materia — allt vi någonsin sett i teleskop är alltså en liten minoritetspost. Den enklaste förklaringen är att tomma rymden själv bär en konstant energitäthet (en kosmologisk konstant); djärvare förslag handlar om ett okänt energifält som ändras med tiden.' },
      { type: 'p', html: 'Vilket svar som är rätt avgör bokstavligen universums framtid: en konstant mörk energi ger evig, allt snabbare expansion, medan en föränderlig skulle kunna mattas av — eller växa. Att mäta mörk energi-egenskaperna är därför huvuduppgiften för flera av 2020-talets stora teleskopprojekt.' }
    ]
  },
  {
    id: 'mork-materia',
    term: 'Mörk materia',
    former: ['mörk materia', 'mörka materian', 'mörka materien'],
    kort: 'Osynlig materia som varken sänder ut eller absorberar ljus, men vars gravitation håller ihop galaxerna. Den verkar väga ungefär fem gånger mer än all vanlig materia.',
    relaterade: ['mork-energi', 'kosmologiska-konstanten'],
    body: [
      { type: 'p', html: 'Räknar man ihop allt som syns i en galax — stjärnor, gas, stoft — och jämför med hur fort galaxen roterar, går ekvationen inte ihop: ytterkanterna snurrar så fort att galaxen borde slungas isär. Något osynligt måste bidra med extra gravitation. Astronomen Vera Rubins mätningar av galaxrotation på 1970-talet gjorde problemet omöjligt att vifta bort, och samma osynliga massa syns i dag i hur galaxhopar böjer ljus (gravitationslinsning) och i den kosmiska bakgrundsstrålningens mönster.' },
      { type: 'p', html: 'Det enkla svaret — att det bara är vanlig materia som råkar vara mörk, som döda stjärnor eller gasmoln — har uteslutits: universums tidiga kärnreaktioner sätter en gräns för hur mycket vanlig materia som finns totalt, och den räcker inte på långa vägar. Mörk materia verkar vara något annat: partiklar som känner av gravitation men (nästan) inte något annat, och som aldrig observerats i något laboratorium.' },
      { type: 'p', html: 'Jakten pågår på tre fronter: känsliga detektorer djupt under jord som väntar på att en mörk materia-partikel ska studsa mot en atomkärna, partikelacceleratorer som försöker skapa partiklarna, och teleskop som letar efter strålning från mörk materia som förintar sig själv i rymden. Hittills har alla kommit hem tomhänta — vilket i sig sakta ritar om kartan över vad mörk materia kan vara.' }
    ]
  },
  {
    id: 'neutrino',
    term: 'Neutrino',
    former: ['neutrino', 'neutrinon', 'neutriner', 'neutrinerna', 'antineutrino', 'antineutriner', 'elektronneutrino', 'myonneutrino', 'tauneutrino', 'tauneutrinon'],
    kort: 'Universums skyggaste partikel: elektriskt neutral, nästan masslös och passerar rakt genom hela jordklotet utan att märka det. Varje sekund far tiotals miljarder neutriner genom din tumnagel.',
    body: [
      { type: 'p', html: 'Neutriner föds i kärnreaktioner: i solens inre, i kärnkraftverk, i radioaktiva sönderfall och i exploderande stjärnor. De saknar elektrisk laddning och känner varken av elektriska krafter eller den starka kärnkraften — bara den svaga växelverkan och (ytterst lite) gravitationen. Därför flyger de rakt igenom nästan allt: av de tiotals miljarder solneutriner som varje sekund passerar genom en tumnagel fastnar i praktiken ingen. Ett ljusårs­tjockt blylager skulle bara stoppa ungefär hälften.' },
      { type: 'p', html: 'Att alls fånga en neutrino kräver därför enorma detektorer och gott om tålamod: tiotusentals ton ultrarent vatten, is eller specialvätska djupt nere i gruvor eller under Antarktis is, kantade av ljussensorer som väntar på den svaga blixt som uppstår de sällsynta gånger en neutrino ändå träffar en atomkärna.' },
      { type: 'p', html: 'Neutrinerna har redan bjudit på en stor överraskning: de finns i tre sorter, och på vägen från solen byter de skepnad mellan sorterna — de <em>oscillerar</em>. Det är bara möjligt om de har massa, vilket den övriga partikelfysikens standardmodell inte hade förutsett. Upptäckten belönades med Nobelpriset i fysik 2015, och neutrinons exakta massa är fortfarande en av fysikens öppna frågor.' }
    ]
  },
  {
    id: 'plasma',
    term: 'Plasma',
    former: ['plasma', 'plasmat'],
    kort: 'Materiens fjärde tillstånd: en gas så energirik att elektronerna slitits loss från sina atomer. Nästan all synlig materia i universum — stjärnorna — är plasma.',
    body: [
      { type: 'p', html: 'Fast form, vätska, gas — och så plasma. Värmer man en gas tillräckligt, eller utsätter den för starka elektriska fält, slås elektronerna loss från atomerna. Kvar blir en virvlande blandning av fria elektroner och positivt laddade joner. Den blandningen beter sig helt annorlunda än en vanlig gas: den leder elektrisk ström utmärkt, och den både påverkas av och skapar egna magnetfält, vilket ger plasma ett rikt och ofta dramatiskt beteende.' },
      { type: 'p', html: 'Plasma är ovanligt i vår vardag men normen i universum: solen och alla andra stjärnor är gigantiska plasmaklot, och även den tunna materian mellan stjärnorna är till stor del joniserad. Närmare hemmet finns plasma i blixtar, i norrskenet (där partiklar från solen krockar med atmosfären), i lysrörens och neonskyltarnas sken — och i fusionsreaktorer, där ett plasma hetare än solens kärna hålls svävande av magnetfält för att atomkärnor ska kunna smälta samman.' }
    ]
  },
  {
    id: 'skyrmion',
    term: 'Skyrmion',
    former: ['skyrmion', 'skyrmionen', 'skyrmioner', 'skyrmionerna'],
    kort: 'En liten, knutliknande virvel i ett fält — till exempel i ett materials magnetisering — som är förvånansvärt stabil och kan flyttas omkring som en partikel.',
    relaterade: ['spinn'],
    body: [
      { type: 'p', html: 'I vissa magnetiska material kan elektronernas spinn ordna sig i ett litet virvelmönster: i mitten pekar spinnen åt ett håll, längst ut åt motsatt håll, och däremellan vrider de sig mjukt runt. Ett sådant mönster kallas skyrmion, efter den brittiske fysikern Tony Skyrme som beskrev matematiken bakom redan på 1960-talet — då som en modell för atomkärnornas partiklar.' },
      { type: 'p', html: 'Skyrmionens finess är att den är <em>topologiskt skyddad</em>: virveln kan inte slätas ut steg för steg, av samma skäl som en knut på ett rep inte försvinner hur man än drar i ändarna — den måste ”klippas upp”. Det gör skyrmioner ovanligt tåliga mot störningar, samtidigt som de kan vara bara några nanometer små och knuffas runt med svaga elektriska strömmar. Därför utforskas de som databärare i framtida minnen, där ettor och nollor skulle kunna lagras som närvaro eller frånvaro av enskilda skyrmioner.' },
      { type: 'p', html: 'Idén är inte begränsad till magneter: forskare har på senare år skapat optiska skyrmioner — samma slags knutmönster fast i ljusets fält — som kan behålla sin form över anmärkningsvärda avstånd.' }
    ]
  },
  {
    id: 'spinn',
    term: 'Spinn',
    former: ['spinn', 'spinnet', 'elektronspinn', 'elektronspinnet', 'kärnspinn', 'kärnspinnet', 'spinntronik', 'spinntroniken'],
    kort: 'En inbyggd kvantegenskap hos partiklar som gör att de beter sig som små magneter och bär ett eget rörelsemängdsmoment — trots att ingenting faktiskt snurrar.',
    relaterade: ['altermagnetism', 'kvantsammanflatning', 'skyrmion'],
    body: [
      { type: 'p', html: 'Namnet lurar lätt tanken: spinn låter som att partikeln snurrar runt sin egen axel, som en liten jord. Men elektronen har, så vitt fysiken vet, ingen utsträckning alls — det finns inget som kan snurra. Spinn är i stället en medfödd kvantegenskap, lika grundläggande som partikelns laddning och massa: partikeln bär ett inbyggt rörelsemängdsmoment och uppför sig som en pytteliten magnet. För elektronen kan spinnet dessutom bara mätas till två värden, ofta kallade ”upp” och ”ner” — aldrig något mittemellan.' },
      { type: 'p', html: 'Trots sin abstrakta natur formar spinnet världen påtagligt. Att järn kan bli magnetiskt beror på att många elektronspinn ställer in sig åt samma håll. Och att elektroner med samma spinn vägrar dela kvanttillstånd (Pauliprincipen) tvingar atomernas elektroner att stapla sig i skal — vilket ger grundämnena deras kemi och periodiska systemet dess struktur.' },
      { type: 'p', html: 'Spinn är också teknik: magnetkameran på sjukhuset (MR) lyssnar på väteatomkärnornas spinn i kroppen, och forskningsfältet spinntronik utvecklar elektronik där information lagras och skickas med spinnriktningar i stället för elektrisk laddning — snabbare och snålare än dagens kretsar.' }
    ]
  },
  {
    id: 'superfluid',
    term: 'Superfluid',
    former: ['superfluid', 'superfluida', 'superfluidum', 'superfluider', 'superfluiditet', 'superfluiditeten'],
    kort: 'En vätska som flyter helt utan inre friktion. Den kan krypa upp för sitt kärls väggar och rinna genom porer så små att ingen vanlig vätska tar sig igenom.',
    relaterade: ['absoluta-nollpunkten', 'supraledare'],
    body: [
      { type: 'p', html: 'Kyl flytande helium till under 2,17&nbsp;K — drygt två grader över den absoluta nollpunkten — och det förvandlas till något som inte beter sig som en vätska längre. All inre friktion (viskositet) försvinner: sätter man vätskan i rotation snurrar den för evigt, och den rinner obehindrat genom springor så trånga att vanligt flytande helium fastnar. Mest kusligt är krypfilmen: ett tunt skikt superfluid klättrar av sig självt upp längs bägarens insida, över kanten och ner på utsidan, tills bägaren tömt sig själv.' },
      { type: 'p', html: 'Förklaringen är kvantmekanik i stor skala. Vid tillräckligt låg temperatur samlas en stor del av heliumatomerna i ett och samma kvanttillstånd och rör sig som en enda samordnad våg i stället för som myllrande enskilda atomer. Friktion kräver att enskilda partiklar kan knuffas ur takten — men i det gemensamma tillståndet finns inga småknuffar att ta emot, så flödet fortsätter ostört.' },
      { type: 'p', html: 'Superfluiditet är nära släkt med supraledning — som är samma idé fast för elektroner i en metall — och fenomenet dyker upp på oväntade ställen: i neutronstjärnors inre tros neutronerna flyta superfluida, och även ljus kan under rätt förhållanden bete sig som en friktionsfri vätska.' }
    ]
  },
  {
    id: 'supraledare',
    term: 'Supraledare',
    former: ['supraledare', 'supraledaren', 'supraledarna', 'supraledning', 'supraledningen', 'supraledande'],
    kort: 'Ett material som under en viss kritisk temperatur leder ström helt utan elektriskt motstånd — och dessutom trycker ut magnetfält ur sitt inre, så att magneter kan sväva över det.',
    relaterade: ['absoluta-nollpunkten', 'superfluid'],
    body: [
      { type: 'p', html: 'I en vanlig ledare krockar elektronerna ständigt med atomgittrets vibrationer och orenheter — det är det som är elektriskt motstånd, och det som gör att kablar blir varma och energi går förlorad. 1911 upptäckte Heike Kamerlingh Onnes något häpnadsväckande: kyls kvicksilver under 4,2&nbsp;K försvinner motståndet inte bara nästan — det försvinner <em>exakt</em>. En ström som startats i en supraledande ring cirkulerar i åratal utan att mätbart avta.' },
      { type: 'p', html: 'Förklaringen dröjde till 1957: vid låg temperatur parar elektronerna ihop sig två och två till så kallade Cooperpar, och paren rör sig samordnat som en enda gemensam kvantvåg som gittrets vibrationer inte förmår bromsa. Supraledare gör dessutom något mer än att leda perfekt — de motar aktivt ut magnetfält ur sitt inre (Meissnereffekten). Det är därför en magnet kan sväva stabilt ovanför en kyld supraledare, ett av fysikens mest fotograferade partytrick.' },
      { type: 'p', html: 'Supraledande spolar ger de starka magnetfälten i sjukhusens MR-kameror, i partikelacceleratorer och i magnettåg. Den stora drömmen är en supraledare som fungerar i rumstemperatur utan extrema tryck — den skulle revolutionera elnät, motorer och datorer, och jakten på den är ett av materialfysikens hetaste fält.' }
    ]
  },
  {
    id: 'terahertzstralning',
    term: 'Terahertzstrålning',
    former: ['terahertzstrålning', 'terahertzstrålningen', 'terahertzområdet', 'terahertzvågor', 'terahertzljus', 'terahertzgapet', 'terahertzband', 'terahertzbandet', 'terahertz'],
    kort: 'Elektromagnetiska vågor i gränslandet mellan mikrovågor och infrarött ljus — länge så svåra att både skapa och fånga att området kallades ”terahertzgapet”.',
    body: [
      { type: 'p', html: 'Terahertzstrålning är ljusets okända kusin: elektromagnetiska vågor som svänger omkring en biljon gånger per sekund (1&nbsp;THz = 10<sup>12</sup>&nbsp;Hz), med våglängder från någon tiondels millimeter upp till ett par millimeter. På frekvensskalan ligger området inklämt mellan mikrovågorna (radar, mobilnät) och det infraröda ljuset (värmestrålning) — för högt i frekvens för vanlig radioelektronik, för lågt för vanliga lasrar och lampor. Därför släpade tekniken länge efter, och fysiker talade om ”terahertzgapet”.' },
      { type: 'p', html: 'Det är synd, för strålningen har ovanligt användbara egenskaper: den passerar genom kläder, papper, plast och kartong men stoppas av metall och vatten, och den är ofarlig — fotonernas energi är alldeles för låg för att skada molekyler som röntgenstrålning kan (den är icke-joniserande). Dessutom har många molekyler sina karakteristiska vibrationer just i terahertzområdet, så strålningen kan artbestämma ämnen på avstånd.' },
      { type: 'p', html: 'I takt med att källor och detektorer blivit bättre öppnas tillämpningarna: säkerhetsskannrar på flygplatser, kvalitetskontroll av läkemedel och material, avbildning av gamla målningars dolda lager — och snabb trådlös kommunikation, där terahertzbanden pekas ut som en nyckel till framtidens 6G-nät.' }
    ]
  },
  {
    id: 'tidskristall',
    term: 'Tidskristall',
    former: ['tidskristall', 'tidskristallen', 'tidskristaller', 'tidskristallerna'],
    kort: 'En fas av materia som upprepar sig i tiden i stället för i rummet: systemet tickar av sig självt i en stabil rytm, som en kristall vars mönster ligger i tid.',
    relaterade: ['gitter', 'kvantsammanflatning'],
    body: [
      { type: 'p', html: 'En vanlig kristall är materia som ordnat sig i ett mönster som upprepar sig i <em>rummet</em>: atom, mellanrum, atom, mellanrum. 2012 ställde nobelpristagaren Frank Wilczek en till synes enkel fråga: kan materia i stället ordna sig i ett mönster som upprepar sig i <em>tiden</em> — ett tillstånd som spontant börjar ticka, om och om igen, utan att förbruka energi? Idén verkade först strida mot termodynamiken, och i sin ursprungliga form visade den sig mycket riktigt vara omöjlig.' },
      { type: 'p', html: 'Men en variant överlevde granskningen. Om ett kvantsystem knuffas i jämn takt utifrån — till exempel av laserpulser — kan det välja att svara i en <em>annan</em> takt än knuffarna, typiskt varannan puls, och hålla fast vid sin egen rytm hur länge som helst utan att värmas upp. Systemet har då spontant brutit tidens upprepningsmönster, precis som en kristall bryter rummets likformighet. De första tidskristallerna skapades 2016–2017 i kedjor av infångade joner och i diamantdefekter, och senare har de även körts på kvantdatorer.' },
      { type: 'p', html: 'Tidskristaller är än så länge grundforskning, men deras envisa, störningståliga tickande gör dem intressanta som byggstenar i precisionsklockor och som robusta minnen i kvantteknik.' }
    ]
  },
{
    id: 'ljusar',
    term: 'Ljusår',
    former: ['ljusår', 'ljusåret', 'ljusåren'],
    kort: 'Den sträcka ljuset hinner på ett år: knappt tio biljoner kilometer. Trots namnet är ljusåret ett längdmått, inte ett tidsmått.',
    relaterade: ['parsec', 'vintergatan', 'galaxhop'],
    body: [
      { type: 'p', html: 'Ett ljusår låter som en tid men är en sträcka: precis så långt som ljuset hinner färdas på ett år. Ljuset går knappt 300&nbsp;000&nbsp;km i sekunden — sju varv runt jorden medan du säger ordet — och när man låter den farten fortsätta i ett helt år blir sträckan ungefär 9,46&nbsp;·&nbsp;10<sup>12</sup>&nbsp;km, alltså nästan tio biljoner kilometer.' },
      { type: 'p', html: 'Anledningen till att astronomer inte skriver ut kilometrarna är att talen annars blir omöjliga att känna något inför. Närmaste stjärna efter solen, Proxima Centauri, ligger 4,2 ljusår bort. Skrivet i kilometer blir det fyrtio biljoner — en siffra som säger de flesta ingenting. Granngalaxen Andromeda ligger 2,5 miljoner ljusår bort, och de mest avlägsna galaxer teleskopen når syns med ljus som varit på väg i över tretton miljarder år.' },
      { type: 'p', html: 'Just den väntetiden gör måttet extra användbart. Eftersom ljuset behöver tid på sig ser vi aldrig något i rymden som det är just nu, utan som det var när ljuset lämnade det. Solen ser vi med åtta minuters fördröjning, månen med drygt en sekund, och en galax hundra miljoner ljusår bort ser vi som den såg ut för hundra miljoner år sedan. Varje teleskop är därför också en tidsmaskin: ju längre ut man tittar, desto längre bakåt i universums historia ser man.' },
      { type: 'p', html: 'I populärvetenskap är ljusåret det vanligaste avståndsmåttet, men i forskarnas egna artiklar används oftast parsec i stället.' }
    ]
  },
  {
    id: 'parsec',
    term: 'Parsec',
    former: ['parsec', 'kiloparsec', 'megaparsec', 'gigaparsec'],
    kort: 'Astronomernas egen avståndsenhet, ungefär 3,26 ljusår. Den är definierad utifrån hur mycket en stjärna tycks flytta sig på himlen när jorden rör sig runt solen.',
    relaterade: ['ljusar', 'galaxhop', 'magnitud'],
    body: [
      { type: 'p', html: 'En parsec är ungefär 3,26 ljusår, eller drygt 3,09&nbsp;·&nbsp;10<sup>13</sup>&nbsp;km. Det är en udda siffra, och det beror på att enheten inte är påhittad för att vara rund — den kommer direkt ur den mätning astronomer använder för att bestämma avstånd till närbelägna stjärnor.' },
      { type: 'p', html: 'Håll upp ett finger framför ansiktet och blunda växelvis med höger och vänster öga: fingret verkar hoppa fram och tillbaka mot bakgrunden. Ju närmare fingret är, desto större hopp. Samma sak händer med stjärnorna när jorden hinner till andra sidan av sin bana ett halvår senare — en närbelägen stjärna tycks då ha flyttat sig en aning mot de avlägsna bakgrundsstjärnorna. Halva den lilla vinkeln kallas stjärnans parallax, och en parsec är definierad som avståndet till en stjärna vars parallax är exakt en bågsekund, det vill säga 1/3600 grad. Namnet är helt enkelt en hopslagning av <em>par</em>allax och båg<em>sec</em>und.' },
      { type: 'p', html: 'Fördelen framför ljusåret är att räkningen blir trivial: avståndet i parsec är precis ett dividerat med parallaxen i bågsekunder. Mätvärdet blir avstånd utan omvägar. I praktiken ligger ingen stjärna så nära att parallaxen når en hel bågsekund — rekordhållaren Proxima Centauri har 0,77 bågsekunder och ligger alltså 1,3 parsec bort.' },
      { type: 'p', html: 'För större avstånd används kiloparsec (tusen parsec) inom vår egen galax, megaparsec (en miljon parsec) mellan galaxer och gigaparsec för de allra största kosmologiska skalorna.' }
    ]
  },
  {
    id: 'solmassa',
    term: 'Solmassa',
    former: ['solmassa', 'solmassan', 'solmassor', 'solmassorna'],
    kort: 'Massan hos vår sol, ungefär 330 000 gånger jordens. Används som måttstock när man anger massan hos stjärnor, svarta hål och hela galaxer.',
    relaterade: ['svart-hal', 'supernova', 'vintergatan'],
    body: [
      { type: 'p', html: 'Solen väger ungefär 2&nbsp;·&nbsp;10<sup>30</sup>&nbsp;kg — en tvåa följd av trettio nollor. Det är omkring 333&nbsp;000 gånger jordens massa, och trots att solsystemet rymmer åtta planeter, hundratals månar och otaliga asteroider sitter drygt 99,8&nbsp;% av all massa i solen själv. Allt annat är småsmulor som blev över.' },
      { type: 'p', html: 'Eftersom kilogram blir lika oanvändbart i astronomin som kilometer använder man solen som referens och anger massor i antal solmassor. Att en stjärna väger 30 solmassor säger genast något meningsfullt: den är mycket tyngre än vår sol, kommer att brinna ut på bara några miljoner år och sluta som en supernova. Ett klot av gas måste väga minst omkring 0,08 solmassor för att trycket i mitten ska räcka till att tända vätefusion — under den gränsen blir det bara en ljummen brun dvärg. Uppåt slutar det någonstans över hundra solmassor, där stjärnans eget strålningstryck blåser bort materialet.' },
      { type: 'p', html: 'Måttstocken används långt utanför stjärnornas värld. Ett svart hål bildat ur en döende stjärna väger några till några tiotals solmassor, medan de supermassiva svarta hålen i galaxernas mitt väger miljoner till miljarder. Vintergatans centrala svarta hål ligger på ungefär fyra miljoner solmassor, och hela Vintergatan med sin mörka materia inräknad på storleksordningen 10<sup>12</sup> solmassor.' }
    ]
  },
  {
    id: 'galaxhop',
    term: 'Galaxhop',
    former: ['galaxhop', 'galaxhopen', 'galaxhopar', 'galaxhoparna', 'galaxkluster', 'galaxklustret', 'galaxklustren'],
    kort: 'Hundratals till tusentals galaxer som hålls samman av sin gemensamma gravitation. Galaxhopar är de största strukturer i universum som fortfarande hänger ihop.',
    relaterade: ['mork-materia', 'vintergatan', 'ytljusstyrka'],
    body: [
      { type: 'p', html: 'Galaxer är sällan ensamma. Gravitationen samlar dem i grupper, och de största samlingarna — hundratals eller tusentals galaxer inom ett område som kan mäta över tio miljoner ljusår tvärs över — kallas galaxhopar. Vintergatan tillhör en blygsam samling på några tiotal galaxer, Lokala galaxgruppen, som i sin tur långsamt dras mot den närmaste riktiga hopen: Virgohopen, ungefär 55 miljoner ljusår bort och med över tusen galaxer.' },
      { type: 'p', html: 'Det mest överraskande med en galaxhop är att galaxerna inte är huvudsaken. Mellanrummen är fyllda av extremt tunn gas som gravitationen har hettat upp till mellan tio och hundra miljoner grader. Så het gas lyser inte i synligt ljus utan i röntgen, och den väger mer än alla hopens stjärnor tillsammans. Ändå räcker inte ens det: galaxerna rör sig så snabbt att de borde ha flugit isär för länge sedan om inte något osynligt höll fast dem. Redan 1933 påpekade Fritz Zwicky detta för Comahopen, och i dag räknar man med att omkring 85&nbsp;% av en galaxhops massa är mörk materia.' },
      { type: 'p', html: 'Större strukturer finns — superhopar och det kosmiska nätets långa filament — men de hålls inte samman, utan dras isär av universums expansion. Mitt i en hop sitter oftast en enormt stor elliptisk galax som vuxit sig jättelik genom att sluka sina grannar; de största galaxer som över huvud taget är kända är just sådana hopmittgalaxer.' }
    ]
  },
  {
    id: 'ytljusstyrka',
    term: 'Ytljusstyrka',
    former: ['ytljusstyrka', 'ytljusstyrkan', 'ytljusstyrkor'],
    kort: 'Hur mycket ljus ett utsträckt objekt sänder ut per ytenhet på himlen, oftast angivet i magnituder per kvadratbågsekund. Låg ytljusstyrka betyder svårfotograferat.',
    relaterade: ['magnitud', 'galaxhop'],
    body: [
      { type: 'p', html: 'Två objekt kan skicka lika mycket ljus till teleskopet och ändå se helt olika ut. En stjärna samlar allt sitt ljus i en enda liten punkt och lyser bländande, medan en galax breder ut lika mycket ljus över en fläck som kan vara större än fullmånen — och då blir varje del av fläcken svag. Ytljusstyrka är måttet på just det: ljus per ytenhet på himlen. Den anges i magnituder per kvadratbågsekund, alltså hur ljus en himmelsruta som är en bågsekund gånger en bågsekund är. Eftersom magnitudskalan är omvänd betyder ett högre tal en svagare, mörkare yta.' },
      { type: 'p', html: 'En egenhet med ytljusstyrkan är att den knappt bryr sig om avståndet. Flyttar man en galax dubbelt så långt bort kommer bara en fjärdedel så mycket ljus fram — men galaxen ser samtidigt ut att täcka en fjärdedel så stor yta på himlen, så ljuset per ytenhet blir detsamma. Ett svagt utbrett objekt förblir alltså svagt hur mycket man än närmar sig det med ett större teleskop.' },
      { type: 'p', html: 'Gränsen sätts i stället av att natthimlen själv lyser, av luftglöd i atmosfären, spritt stjärnljus och zodiakljus. På en riktigt mörk plats ligger himmelsbakgrunden runt 22 magnituder per kvadratbågsekund, och det som är svagare än så drunknar helt enkelt i den. Andromedagalaxen breder ut sig över sex gånger fullmånens bredd men syns ändå knappt för blotta ögat, och i en stad med ljusföroreningar, där himlen kan vara tiotals gånger ljusare, försvinner den helt.' }
    ]
  },
  {
    id: 'magnitud',
    term: 'Magnitud',
    former: ['magnitud', 'magnituden', 'magnituder', 'magnituderna', 'magnitudskalan', 'skenbar magnitud', 'absolut magnitud'],
    kort: 'Astronomernas mått på hur ljust ett himmelsobjekt är. Skalan är både omvänd — lägre tal betyder ljusare — och logaritmisk, så att fem magnituder motsvarar en faktor hundra.',
    relaterade: ['ytljusstyrka', 'parsec', 'supernova'],
    body: [
      { type: 'p', html: 'Två saker med magnitudskalan brukar överraska. Den första är att den går åt fel håll: ju lägre tal, desto ljusare objekt, och de allra starkaste får negativa tal. Den andra är att den är logaritmisk — varje steg är en multiplikation, inte ett tillägg.' },
      { type: 'p', html: 'Båda egenheterna är arv från antiken. Omkring 150 f.Kr. delade den grekiske astronomen Hipparchos in stjärnorna i sex klasser efter ögonmått: de ljusaste kallades stjärnor av första storleken, de nätt och jämnt synliga av sjätte storleken. När man långt senare kunde mäta ljus med instrument visade det sig att ögat uppfattar ljusstyrka logaritmiskt, och att steget från första till sjätte storleken råkade motsvara ungefär en faktor hundra. År 1856 låste Norman Pogson fast skalan vid exakt det: fem magnituder ska betyda en faktor 100 i ljusflöde, vilket ger 100<sup>1/5</sup> ≈ 2,512 gånger per magnitudsteg.' },
      { type: 'p', html: 'Några hållpunkter: solen har magnitud −26,7, fullmånen −12,7, den ljusaste stjärnan Sirius −1,5, och blotta ögat når ner till ungefär 6 under mörk himmel. De djupaste teleskopbilderna når omkring magnitud 30, alltså objekt som är runt fyra miljarder gånger ljussvagare än vad ögat klarar.' },
      { type: 'p', html: 'Talen ovan är skenbara magnituder — hur ljust något ser ut härifrån, vilket beror lika mycket på avståndet som på objektet självt. För att jämföra objektens verkliga ljusstyrka används i stället absolut magnitud: hur ljust objektet skulle se ut om det placerades på standardavståndet 10 parsec. Solen, bländande på vår himmel, har absolut magnitud +4,8 och skulle på det avståndet knappt gå att urskilja.' }
    ]
  },
  {
    id: 'vintergatan',
    term: 'Vintergatan',
    former: ['vintergatan'],
    kort: 'Vår egen galax: en stavspiral med hundratals miljarder stjärnor, ungefär 100 000 ljusår tvärs över. Det ljusa bandet på natthimlen är dess skiva sedd inifrån.',
    relaterade: ['svart-hal', 'ljusar', 'solmassa'],
    body: [
      { type: 'p', html: 'Långt från stadsljus syns ett svagt, disigt band tvärs över natthimlen. Det bandet gav Vintergatan sitt namn, och när Galilei 1610 riktade sitt teleskop mot det upptäckte han att dimman i själva verket består av oräkneliga enskilda stjärnor. Förklaringen till bandets form är att vi sitter mitt inne i en tillplattad skiva av stjärnor: tittar vi längs skivans plan ligger hundratusentals stjärnor bakom varandra och flyter ihop till en sammanhängande strimma, tittar vi rakt ut ur skivan ser vi bara enstaka stjärnor mot tom rymd.' },
      { type: 'p', html: 'Vintergatan är en stavspiral — en avlång stav av stjärnor genom mitten, med spiralarmar som lindar ut från stavens ändar. Skivan mäter ungefär 100&nbsp;000 ljusår tvärs över men är bara några tusen ljusår tjock, och rymmer någonstans mellan hundra och fyrahundra miljarder stjärnor. Solen ligger inte i centrum utan ungefär 26&nbsp;000 ljusår ut, i utkanten av en av armarna, och behöver omkring 230 miljoner år för ett varv runt galaxens mitt.' },
      { type: 'p', html: 'I själva centrum sitter ett supermassivt svart hål som kallas Skytten A*, efter stjärnbilden det ligger i sett från jorden. Det väger ungefär fyra miljoner solmassor. Tjocka stoftmoln blockerar allt synligt ljus mot centrum, så hålet upptäcktes i stället genom att man i infrarött ljus följde enskilda stjärnor som svängde runt en osynlig punkt — ett arbete som gav Nobelpriset i fysik 2020. Runt hela skivan finns dessutom ett väldigt klotformigt moln av mörk materia, som står för det mesta av galaxens massa.' }
    ]
  },
{
    id: 'svart-hal',
    term: 'Svart hål',
    former: ['svart hål', 'svarta hål', 'svarta hålet', 'svarta hålen', 'supermassivt svart hål', 'supermassiva svarta hål', 'supermassiva svarta hålet', 'händelsehorisont', 'händelsehorisonten'],
    kort: 'Ett område där så mycket massa packats ihop på så liten plats att inget kan ta sig därifrån — inte ens ljus. Gränsen kallas händelsehorisonten.',
    relaterade: ['kvasar', 'supernova', 'vit-dvarg'],
    body: [
      { type: 'p', html: 'Namnet lurar: ett svart hål är inte ett hål i rymden utan raka motsatsen — ovanligt mycket materia klämd in på ovanligt liten plats. Ju mer massa som trängs ihop, desto starkare blir gravitationen och desto högre fart krävs för att slita sig loss. Pressas materien hårt nog räcker inte ens ljusets hastighet. Den gränsen kallas händelsehorisonten, och innanför den kommer ingenting ut. Solen skulle behöva klämmas ihop till en kula med 3&nbsp;km radie för att bli ett svart hål, jorden till en kula på ett par centimeter.' },
      { type: 'p', html: 'Det finns två sorter. Stjärnmassehål på några till några tiotals solmassor bildas när kärnan i en mycket tung stjärna kollapsar. Supermassiva svarta hål väger miljoner till miljarder solmassor och sitter i mitten av så gott som varje stor galax — Vintergatans heter Sagittarius&nbsp;A* och är omkring 4&nbsp;miljoner solmassor tungt.' },
      { type: 'p', html: 'Eftersom hålet inte lyser upptäcks det genom sin verkan på omgivningen: stjärnor som svänger kring en osynlig punkt, gas som hettas upp till miljontals grader i en ackretionsskiva utanför horisonten, och sedan 2015 gravitationsvågor från svarta hål som krockar. År 2019 publicerades den första bilden av ett — en glödande ring med en mörk skugga i mitten, i galaxen M87.' },
      { type: 'p', html: 'Nära ett litet svart hål är gravitationen mycket starkare vid fötterna än vid huvudet, och skillnaden skulle dra ut ett föremål till en tunn tråd. Helt svarta är de kanske ändå inte: Stephen Hawking visade 1974 att kvantfysiken borde få dem att avge en ytterst svag strålning och långsamt avdunsta — alldeles för svag för att kunna mätas.' }
    ]
  },
  {
    id: 'supernova',
    term: 'Supernova',
    former: ['supernova', 'supernovan', 'supernovor', 'supernovorna', 'supernovaexplosion', 'supernovaexplosionen', 'supernovaexplosioner', 'supernovarest', 'supernovaresten', 'supernovarester', 'kärnkollapssupernova', 'kärnkollapssupernovor'],
    kort: 'En stjärnexplosion som under några veckor kan lysa lika starkt som en hel galax. Bakom namnet döljer sig två helt olika sätt för en stjärna att sprängas.',
    relaterade: ['vit-dvarg', 'svart-hal', 'nova'],
    body: [
      { type: 'p', html: 'En supernova är det våldsammaste en enskild stjärna kan göra: på några dagar tänds en ljuspunkt som kan mäta sig med hela sin galax, för att sedan blekna bort. Kinesiska astronomer noterade en sådan ”gäststjärna” år 1054, och resterna syns i dag som Krabbnebulosan. Två helt olika processer kan ge samma spektakulära resultat.' },
      { type: 'p', html: 'Den ena drabbar mycket tunga stjärnor, från omkring åtta solmassor och uppåt. En sådan stjärna fusionerar sig fram genom allt tyngre grundämnen, men vid järn tar det stopp — järnfusion ger ingen energi tillbaka. Utan strålningstrycket inifrån kollapsar kärnan på sekunder, de yttre lagren studsar, och en skur av neutriner kastar av stjärnans hölje. Kvar i mitten blir en neutronstjärna eller ett svart hål.' },
      { type: 'p', html: 'Den andra sorten, typ&nbsp;Ia, har ingen tung stjärna inblandad. Här drar en vit dvärg till sig materia från en följeslagare tills den närmar sig sin övre massgräns på ungefär 1,4&nbsp;solmassor. Då antänds kolet i hela stjärnan nästan samtidigt och dvärgen sprängs fullständigt — ingen rest blir kvar. Eftersom smällen alltid sker vid nästan samma massa blir ljusstyrkan nästan densamma varje gång, så typ&nbsp;Ia fungerar som standardljuskällor: ser en svag ut ligger den långt bort. Det var så universums accelererande expansion upptäcktes 1998.' },
      { type: 'p', html: 'Supernovor är också en av naturens verkstäder för tunga grundämnen. Stjärnors normala fusion bygger bara upp till järn; guld och uran kräver de extrema neutronflöden som uppstår i explosioner och i krockar mellan neutronstjärnor. Materialet blandas in i nya gasmoln — atomerna i din kropp har varit inuti stjärnor som sprängts.' }
    ]
  },
  {
    id: 'vit-dvarg',
    term: 'Vit dvärg',
    former: ['vit dvärg', 'vita dvärgen', 'vita dvärgar', 'vita dvärgarna', 'vit dvärgstjärna', 'vita dvärgstjärnan', 'vita dvärgstjärnor', 'chandrasekhargränsen'],
    kort: 'Den utbrunna kärna som blir kvar när en stjärna av solens storlek dör: ungefär lika stor som jorden men lika tung som en stjärna.',
    relaterade: ['nova', 'supernova', 'solmassa'],
    body: [
      { type: 'p', html: 'De flesta stjärnor slutar inte med en explosion utan med en tyst avveckling. När solen om ungefär fem miljarder år gjort slut på sitt bränsle sväller den först upp till en röd jätte och puffar sedan av sina yttre gaslager. Kvar blir den nakna, glödheta kärnan — en vit dvärg, ungefär lika stor som jorden men med en stor del av solens massa kvar. Tätheten blir absurd: en tesked av materialet skulle väga flera ton. Omkring 97&nbsp;% av alla stjärnor i Vintergatan går den vägen.' },
      { type: 'p', html: 'Vad hindrar en så tät kropp från att krympa vidare? Inte fusion, den har upphört. I stället ett rent kvantfysikaliskt motstånd som kallas elektrondegenerationstryck: två elektroner kan inte pressas in i exakt samma tillstånd, så när de trängs ihop tvingas de upp i höga farter och trycker tillbaka utåt. Det ger en märklig konsekvens — ju tyngre en vit dvärg är, desto <em>mindre</em> blir den. Vid ungefär 1,4&nbsp;solmassor räcker motståndet inte längre. Den gränsen kallas Chandrasekhargränsen, efter Subrahmanyan Chandrasekhar som räknade fram den på 1930-talet och fick Nobelpriset i fysik 1983.' },
      { type: 'p', html: 'En nybildad vit dvärg kan ha över 100&nbsp;000&nbsp;°C vid ytan, men den producerar ingen ny energi. Den strålar bara bort sitt värmeförråd och svalnar under miljarder år mot att bli en mörk och kall svart dvärg. Ingen sådan finns ännu: universum är bara 13,8&nbsp;miljarder år gammalt, alldeles för ungt. Närmast ligger Sirius&nbsp;B, 8,6&nbsp;ljusår bort.' }
    ]
  },
  {
    id: 'nova',
    term: 'Nova',
    former: ['nova', 'novan', 'novor', 'novorna', 'novautbrott', 'novautbrottet', 'heliumnova', 'heliumnovan', 'heliumnovor'],
    kort: 'Ett utbrott på ytan av en vit dvärg som drar till sig gas från en granne. Stjärnan blossar upp tiotusenfalt — men överlever, till skillnad från vid en supernova.',
    relaterade: ['vit-dvarg', 'supernova'],
    body: [
      { type: 'p', html: 'Namnet kommer från latinets <em>nova stella</em>, ny stjärna. För blotta ögat såg det nämligen precis så ut: på en himmel man kände utantill tändes plötsligt en stjärna som inte funnits där kvällen innan, för att långsamt blekna bort igen. Först på 1900-talet stod det klart att ingenting nytt fötts — det är en gammal, svag stjärna som tillfälligt lyser upp.' },
      { type: 'p', html: 'Scenen är ett dubbelstjärnesystem där en vit dvärg går i bana nära en vanlig stjärna. Dvärgens hårda gravitation drar över vätgas från grannen, och gasen lägger sig som ett allt tjockare lager på ytan. Lagret pressas samman och blir hetare, och när temperaturen i botten når några miljoner grader tänder vätet i fusion. Eftersom materialet är hoppressat kan det inte utvidga sig och svalna av sig självt, så förbränningen skenar: hela skiktet brinner av på sekunder och slungas ut i rymden. Stjärnan kan bli tiotusentals gånger ljusare på ett dygn och tonar sedan bort under veckor eller månader.' },
      { type: 'p', html: 'Det avgörande är att bara det tunna ytlagret sprängs bort — en nova är alltså ingen liten supernova. Den vita dvärgen är oskadd, börjar genast samla på sig ny gas från grannen och kan göra om alltihop. Vissa system är kända återfallsförbrytare som blossar upp med bara några decenniers mellanrum. Är gasen som dras över heliumrik i stället för väterik kan det bli helium som antänds; sådana utbrott kallas heliumnovor och är ovanligare.' }
    ]
  },
  {
    id: 'exoplanet',
    term: 'Exoplanet',
    former: ['exoplanet', 'exoplaneten', 'exoplaneter', 'exoplaneterna', 'exoplanetatmosfär', 'exoplanetatmosfärer', 'het jupiter', 'heta jupitrar', 'superjord', 'superjorden', 'superjordar', 'superjordarna'],
    kort: 'En planet som kretsar kring en annan stjärna än solen. Flera tusen är i dag kända, och de flesta liknar ingenting i vårt eget solsystem.',
    relaterade: ['spektroskopi', 'ljusar'],
    body: [
      { type: 'p', html: 'Att andra stjärnor borde ha planeter gissade man i århundraden, men ända in på 1990-talet var det bara en gissning. En planet lyser inte själv, och den svaga reflex den ger drunknar i stjärnans bländande ljus — som att försöka se en knappnål bredvid en strålkastare flera mil bort. Genombrottet kom 1995, när Michel Mayor och Didier Queloz hittade 51&nbsp;Pegasi&nbsp;b kring en solliknande stjärna. Upptäckten gav dem Nobelpriset i fysik 2019, och sedan dess har listan vuxit till flera tusen bekräftade exoplaneter.' },
      { type: 'p', html: 'Två metoder står för de flesta fynden, och båda studerar stjärnan i stället för planeten. Transitmetoden mäter stjärnans ljusstyrka och väntar på att en planet ska passera framför den: ljuset dippar en aning, regelbundet, varje varv. En jupiterstor planet skymmer ungefär en procent av en solliknande stjärna, en jordstor bara någon hundradels procent. Radialhastighetsmetoden utnyttjar i stället att stjärnan och planeten kretsar kring en gemensam tyngdpunkt, så att stjärnan vaggar. Vaggningen syns som en periodisk förskjutning av färgerna i stjärnans ljus — Jupiter får solen att vagga med omkring 12&nbsp;m/s, ungefär cykelfart.' },
      { type: 'p', html: 'Skörden har varit full av överraskningar. Den allra första är en gasjätte som rundar sin stjärna på fyra dygn — en ”het jupiter”, en planettyp ingen räknat med. Vanligast av allt verkar vara superjordar och små gasplaneter med storlek mellan jordens och Neptunus, alltså precis det som saknas hos oss. Passerar planeten framför sin stjärna filtreras dessutom en gnutta stjärnljus genom dess atmosfär, och av vilka våglängder som försvinner kan astronomer läsa ut vilka gaser den innehåller.' }
    ]
  },
  {
    id: 'komet',
    term: 'Komet',
    former: ['komet', 'kometen', 'kometer', 'kometerna', 'kometkärna', 'kometkärnan', 'kometkärnor', 'kometsvans', 'kometsvansen', 'mörk komet', 'mörka kometer', 'mörka kometen'],
    kort: 'En klump av is och stoft från solsystemets kalla utkanter. Kommer den nära solen förångas isen och bildar ett lysande gasmoln och en svans.',
    relaterade: ['asteroid', 'plasma'],
    body: [
      { type: 'p', html: 'Långt ute i solsystemet, där solen bara är en ljusprick bland andra, ligger miljardtals frusna klumpar kvar sedan planeterna bildades. En kometkärna är typiskt några kilometer stor och består av vattenis och frusna gaser blandat med stoft och sot — den brukar beskrivas som en smutsig snöboll. Kall och kolsvart är den osynlig från jorden; det spektakulära händer först när banan för in den nära solen.' },
      { type: 'p', html: 'Då värms ytan och isen sublimerar, alltså går direkt från fast form till gas utan att smälta först. Gasen strömmar ut och drar med sig stoft, så att kärnan omges av ett lysande dimmoln — en koma — som kan bli hundratusentals kilometer i diameter, långt större än jordklotet. Solens strålning och solvinden knuffar undan gas och stoft till en svans som kan bli tiotals miljoner kilometer lång. Här sitter den vanligaste missuppfattningen: svansen släpar inte efter kometen som röken efter ett tåg, utan pekar <em>bort från solen</em>. På väg ut ur solsystemet färdas kometen alltså med svansen först. Ofta syns två svansar: en böjd av stoft och en rakare av laddad gas.' },
      { type: 'p', html: 'Kometer delas grovt in efter omloppstid. De kortperiodiska varvar solen på mindre än 200&nbsp;år och kommer från det isiga Kuiperbältet utanför Neptunus; Halleys komet återvänder vart 76:e år. De långperiodiska kan ta tiotusentals år på ett varv och kommer från Oorts moln allra längst ut. På senare år har astronomer också ringat in en mellanform, ”mörka kometer”: objekt som ser ut som asteroider utan koma eller svans, men som ändå knuffas ur sin bana av utströmmande gas.' }
    ]
  },
  {
    id: 'asteroid',
    term: 'Asteroid',
    former: ['asteroid', 'asteroiden', 'asteroider', 'asteroiderna', 'asteroidbälte', 'asteroidbältet', 'jordnära asteroid', 'jordnära asteroider'],
    kort: 'En sten- eller metallkropp i bana kring solen, för liten för att kallas planet. De flesta finns i asteroidbältet mellan Mars och Jupiter.',
    relaterade: ['komet'],
    body: [
      { type: 'p', html: 'Asteroider är byggmaterial som blev över. När solsystemet bildades för 4,6&nbsp;miljarder år sedan klumpade stoft och grus ihop sig till allt större kroppar, och på de flesta ställen växte de vidare till planeter. Mellan Mars och Jupiter gick det inte: Jupiters gravitation piskade upp farterna där, så att krockarna krossade i stället för att bygga. Kvar blev ett bälte av spillror i alla storlekar — från Ceres på omkring 940&nbsp;km i diameter, stor nog att räknas som dvärgplanet, ner till stenar på några meter.' },
      { type: 'p', html: 'Trots antalet är bältet inget minfält. Lägger man ihop allt material där blir det bara några procent av månens massa, utspritt över ett enormt område, och avstånden mellan grannarna mäts i miljoner kilometer — rymdsonder passerar rakt igenom utan risk. Eftersom asteroiderna aldrig smälte samman till en planet är de i praktiken fryst ursprungsmaterial, och prover som sonder hämtat hem ger en direkt inblick i hur solsystemet såg ut innan planeterna fanns.' },
      { type: 'p', html: 'Alla håller sig inte i bältet. Över 30&nbsp;000 jordnära asteroider har banor som tar dem in i jordens grannskap, och deras vägar bevakas noga. Metoden är enkel i grunden: mät positionen på himlen vid flera tillfällen, anpassa en bana som följer gravitationens lagar och räkna framåt i tiden. Att hotet är verkligt visar kratern efter den 10&nbsp;km stora kropp som slog ner för 66&nbsp;miljoner år sedan och bidrog till dinosauriernas utdöende. År 2022 testades ett motmedel för första gången: rymdsonden DART kolliderade avsiktligt med asteroiden Dimorphos och kortade dess omloppstid med drygt en halvtimme.' }
    ]
  },
{
    id: 'laser',
    term: 'Laser',
    former: ['laser', 'lasern', 'lasrar', 'lasrarna', 'laserstråle', 'laserstrålen', 'laserstrålar', 'laserpuls', 'laserpulsen', 'laserpulser', 'laserljus', 'laserljuset', 'laserkylning', 'diodlaser', 'diodlasern', 'diodlasrar', 'diodlasrarna', 'precisionslaser', 'precisionslasrar', 'terahertzlaser', 'terahertzlasrar'],
    kort: 'En ljuskälla som skickar ut en smal, skarpt riktad stråle där alla ljusvågor har samma våglängd och svänger i takt. Namnet är en förkortning av engelskans light amplification by stimulated emission of radiation.',
    relaterade: ['foton', 'exciterat-tillstand', 'optisk-fiber'],
    body: [
      { type: 'p', html: 'Tänd en ficklampa och en laserpekare bredvid varandra så syns skillnaden direkt: ficklampans sken sprider ut sig åt alla håll och innehåller alla möjliga färger, medan laserns stråle håller ihop som en tunn nål av en enda färg. Skillnaden sitter i hur ljuset skapas. I en glödlampa skickar varje atom ut sin ljuspartikel för sig, oberoende av grannarna. En laser utnyttjar i stället <em>stimulerad emission</em>, en effekt som Einstein förutsade redan 1917: passerar en foton en atom som redan är exciterad kan den knuffa ner atomen i förtid, och den nya fotonen blir en exakt kopia av den första — samma våglängd, samma riktning, i takt med originalet.' },
      { type: 'p', html: 'För att kopiorna ska hinna bli många sitter det aktiva materialet — en kristall, en gas eller en halvledarbit — mellan två speglar som bildar en resonator. Ljuset studsar fram och tillbaka och förstärks för varje varv. Samtidigt pumpas materialet med energi, från en ström, en blixtlampa eller en annan laser, tills fler atomer befinner sig i det exciterade tillståndet än i grundtillståndet. Det kallas inversion och är nödvändigt: annars skulle ljuset absorberas mer än det förstärks. Den ena spegeln släpper igenom någon procent av ljuset, och det som kommer ut där är laserstrålen.' },
      { type: 'p', html: 'Ljuset får därmed tre ovanliga egenskaper: det är koherent (vågorna svänger i takt), riktat (en stråle som skickas mot månen har breddats till bara några kilometer när den kommer fram) och smalbandigt (i praktiken en enda våglängd). Den första fungerande lasern byggdes 1960. I dag finns de överallt: i streckkodsläsare, i fiberkommunikation, i ögonoperationer och materialbearbetning — och i laboratorier, där laserljus används för att bromsa atomer till nära absoluta nollpunkten.' }
    ]
  },
  {
    id: 'foton',
    term: 'Foton',
    former: ['foton', 'fotonen', 'fotoner', 'fotonerna', 'ljuspartikel', 'ljuspartikeln', 'ljuspartiklar'],
    kort: 'Ljusets minsta odelbara energipaket — en partikel utan massa som alltid rör sig med ljusets hastighet. Energin bestäms av ljusets frekvens, alltså av färgen.',
    relaterade: ['vaglangd', 'laser', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Frågan om ljus är en vågrörelse eller en ström av partiklar var länge en av fysikens hetaste stridsfrågor. Svaret blev: både och. När Max Planck och Albert Einstein i början av 1900-talet skulle förklara hur glödande föremål strålar, och hur ljus kan slå loss elektroner ur en metallyta, tvingades de anta att ljusenergin kommer i odelbara portioner. En sådan portion kallas en foton. Energin ges av <em>E</em> = <em>h</em> · <em>f</em>, där <em>f</em> är ljusets frekvens och <em>h</em> är Plancks konstant, ungefär 6,63 · 10<sup>−34</sup>&nbsp;J·s. Blått ljus svänger snabbare än rött, så varje blå foton bär mer energi än en röd.' },
      { type: 'p', html: 'Det viktigaste i formeln är vad som <em>inte</em> står i den: intensiteten. Att skruva upp ljusstyrkan ger fler fotoner per sekund, men varje enskild foton behåller sin energi. Därför kan hur starkt rött ljus som helst vara oförmöget att slå loss en enda elektron ur en metallyta, medan svagt ultraviolett ljus gör det omedelbart. Det är den fotoelektriska effekten, och förklaringen av den gav Einstein nobelpriset för året 1921.' },
      { type: 'p', html: 'Fotonen saknar massa och rör sig alltid med ljusets hastighet, knappt 300&nbsp;000&nbsp;km/s i vakuum. Den kan varken stå still eller bromsas in — bara skapas och absorberas. Ändå beter sig ljus fortfarande som en våg: skickas det genom två smala spalter bildas ett randmönster på skärmen bakom, även om fotonerna skickas i väg en och en. Det kallas våg–partikel-dualitet. Moderna detektorer registrerar enskilda fotoner, och ögat är nästan lika känsligt: en mörkeranpassad stavcell i näthinnan reagerar på några få fotoner.' }
    ]
  },
  {
    id: 'vaglangd',
    term: 'Våglängd',
    former: ['våglängd', 'våglängden', 'våglängder', 'våglängderna'],
    kort: 'Avståndet mellan två närliggande vågtoppar. För ljus avgör våglängden färgen, och tillsammans med ljushastigheten bestämmer den frekvensen.',
    relaterade: ['foton', 'spektroskopi', 'interferens'],
    body: [
      { type: 'p', html: 'Titta på havsvågor som rullar in mot en strand: avståndet från en vågtopp till nästa är vågens våglängd. Samma mått används för alla vågrörelser — ljud, radiovågor, ljus — och betecknas med den grekiska bokstaven <em>λ</em> (lambda). Våglängden hänger ihop med frekvensen, alltså hur många vågtoppar som passerar en punkt varje sekund, genom sambandet <em>c</em> = <em>λ</em> · <em>f</em>. För ljus i vakuum är <em>c</em> ljushastigheten, ungefär 3,00 · 10<sup>8</sup>&nbsp;m/s, och den är densamma för allt ljus. Lång våglängd betyder därför låg frekvens, kort våglängd hög.' },
      { type: 'p', html: 'Hela det elektromagnetiska spektrumet är i grunden samma sorts vågor — bara med olika våglängd. Radiovågor mäts i meter eller kilometer, mikrovågor i centimeter (en mikrovågsugn arbetar kring 12&nbsp;cm), infrarött i mikrometer. Det synliga ljuset upptar en förvånansvärt smal remsa, från omkring 400&nbsp;nm (violett) till omkring 700&nbsp;nm (rött), där en nanometer är 10<sup>−9</sup>&nbsp;m. Ännu kortare är ultraviolett, röntgen och gammastrålning. Eftersom varje fotons energi växer med frekvensen är det just den korta våglängden som gör strålning energirik.' },
      { type: 'p', html: 'Våglängden sätter också en gräns för vad som går att se. Ett vanligt ljusmikroskop kan inte visa detaljer som är mycket mindre än ljusets våglängd — vågen böjer sig helt enkelt runt dem. Vill man se mindre måste man byta till något med kortare våglängd: elektroner i ett elektronmikroskop, eller röntgen när avstånden mellan atomerna i en kristall ska mätas.' }
    ]
  },
  {
    id: 'spektroskopi',
    term: 'Spektroskopi',
    former: ['spektroskopi', 'spektroskopin', 'spektroskopisk', 'spektroskopiskt', 'spektroskopiska', 'spektrum', 'spektrumet', 'spektret', 'spektra', 'spektrometer', 'spektrometern', 'laserspektroskopi', 'fotoelektronspektroskopi'],
    kort: 'Konsten att dela upp ljus efter våglängd och läsa av mönstret av ljusa och mörka linjer. Eftersom varje grundämne har sitt eget linjemönster går det att bestämma vad något består av utan att röra vid det.',
    relaterade: ['vaglangd', 'gitter', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Låter man solljus passera ett prisma eller ett optiskt gitter delas det upp i regnbågens färger efter våglängd. Tittar man riktigt noga på det uppdelade solljuset visar det sig att regnbågen är genomkorsad av smala mörka streck. Joseph von Fraunhofer kartlade hundratals av dem kring 1814 utan att veta vad de var. Förklaringen kom senare: atomerna i solens svalare ytterlager plockar bort exakt de våglängder som svarar mot hopp mellan deras egna energinivåer. Varje grundämne har sin egen uppsättning nivåer — och därmed sitt eget streckkodsliknande fingeravtryck.' },
      { type: 'p', html: 'Att läsa av det mönstret kallas spektroskopi. En het, tunn gas ger ljusa linjer på precis samma våglängder som ett svalare skikt ger mörka. Natrium lyser till exempel i ett gult par vid 589&nbsp;nm — samma gula ton som i gatlyktor och i en flamma man strör salt i. Metoden är så pålitlig att grundämnet helium upptäcktes i solens spektrum 1868, nästan trettio år innan någon hittade det på jorden. Namnet kommer av grekiskans <em>helios</em>, sol.' },
      { type: 'p', html: 'I dag är spektroskopi det viktigaste sättet att undersöka något man aldrig kan besöka. Ur ett spektrum går det att läsa av sammansättning, temperatur, täthet och tryck. Rör sig källan mot eller från oss förskjuts alla linjer i våglängd, ett dopplerskift som avslöjar farten — så upptäcktes både universums expansion och de första exoplaneterna. Sitter källan dessutom i ett magnetfält splittras linjerna, så även fältstyrkan går att mäta på miljarder ljusårs avstånd.' }
    ]
  },
  {
    id: 'optisk-fiber',
    term: 'Optisk fiber',
    former: ['optisk fiber', 'optiska fibern', 'optiska fibrer', 'optiska fibrerna', 'fiberoptik', 'fiberoptiken', 'fiberoptisk', 'fiberoptiska', 'fiberkabel', 'fiberkabeln', 'fiberkablar', 'fiberkommunikation', 'glasfiber', 'glasfibern'],
    kort: 'En hårstråtunn tråd av mycket rent glas som leder ljus långa sträckor genom totalreflektion. Optiska fibrer bär i dag nästan all internettrafik mellan städer och över haven.',
    relaterade: ['laser', 'vaglangd', 'fotonisk-kristall'],
    body: [
      { type: 'p', html: 'Ljus går rakt fram — men i en optisk fiber kan det ledas runt hörn, kilometer efter kilometer. Tricket heter totalreflektion. Fibern har en kärna av mycket rent glas omgiven av en mantel med något lägre brytningsindex. Ljus som träffar gränsytan mellan kärna och mantel tillräckligt snett kastas helt och hållet tillbaka in i kärnan, utan att någon del läcker ut i manteln. Strålen studsar därför fram genom fibern som i en spegeltunnel, oavsett hur kabeln slingrar sig. I den vanligaste typen, enkelmodsfiber, är kärnan bara omkring 9&nbsp;µm i diameter och hela glastråden 125&nbsp;µm — tunnare än ett hårstrå.' },
      { type: 'p', html: 'Hur bra en fiber är anges som dämpning i decibel per kilometer. Modernt fiberglas ligger runt 0,2&nbsp;dB/km, vilket betyder att ungefär hälften av ljuset finns kvar först efter 15&nbsp;km. Så lågt blir värdet bara vid en viss våglängd, 1550&nbsp;nm i det nära infraröda området, där glaset är som allra klarast — därför skickas fibersignaler med osynligt infrarött laserljus i stället för synligt. Sträckor på tio mil eller mer klaras utan att signalen behöver läsas om, och i sjökablarna sitter optiska förstärkare med jämna mellanrum.' },
      { type: 'p', html: 'En enda fiber kan bära dussintals våglängder samtidigt, var och en med sin egen datakanal, vilket ger kapaciteter i storleksordningen terabit per sekund. Fibrer används också som sensorer: ljuset som sprids tillbaka påverkas av töjning, temperatur och vibrationer, så en enda kabel kan känna av jordskalv, tågtrafik eller ett kabelbrott och tala om var längs sträckan det hände.' }
    ]
  },
  {
    id: 'gammastralning',
    term: 'Gammastrålning',
    former: ['gammastrålning', 'gammastrålningen', 'gammastråle', 'gammastrålen', 'gammastrålar', 'gammafoton', 'gammafotonen', 'gammafotoner', 'gammakvanta', 'gammablixt', 'gammablixten', 'gammablixtar', 'gammablixtarna'],
    kort: 'Elektromagnetisk strålning med allra kortast våglängd och högst energi per foton. Den kommer från atomkärnor och från universums våldsammaste händelser, och är kraftigt joniserande.',
    relaterade: ['foton', 'vaglangd', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Gammastrålning ligger allra längst ut i det elektromagnetiska spektrumet: kortast våglängd, högst frekvens och därmed högst energi per foton. Våglängderna är typiskt kortare än 10<sup>−11</sup>&nbsp;m, alltså mindre än en atom, och en enskild gammafoton kan bära omkring en miljon gånger mer energi än en foton synligt ljus. Gränsen mot röntgenstrålning handlar mer om ursprung än om exakt våglängd: röntgen uppstår när elektroner bromsas eller byter energinivå, medan gammastrålning kommer från själva atomkärnan.' },
      { type: 'p', html: 'Den vanligaste källan är radioaktiva sönderfall. Efter ett alfa- eller betasönderfall lämnas den nybildade kärnan ofta i ett exciterat tillstånd, med energi över. När kärnan deexciteras skickas överskottet ut som en gammafoton. Till skillnad från alfa- och betasönderfall ändras då varken antalet protoner eller neutroner — bara kärnans energi. Gammafotoner bildas också när materia och antimateria möts och förintar varandra.' },
      { type: 'p', html: 'Energin räcker gott för att slita loss elektroner ur atomer, alltså jonisera dem, och därmed för att skada arvsmassan i levande celler. Medan alfastrålning stoppas av ett papper och betastrålning av en aluminiumplåt krävs tjockt bly eller betong för att dämpa gammastrålning, och den försvinner aldrig helt utan bara gradvis. Samma genomträngande kraft gör den användbar: strålbehandling där många svaga strålar korsas i en tumör, sterilisering av sjukvårdsmaterial och kryddor, och genomlysning av svetsfogar i rör.' },
      { type: 'p', html: 'De våldsammaste gammakällorna finns i rymden. Gammablixtar — korta utbrott från kollapsande jättestjärnor eller kolliderande neutronstjärnor miljarder ljusår bort — frigör på några sekunder mer energi än solen hinner stråla ut under hela sin livstid. De upptäcktes av en slump på 1960-talet, av amerikanska satelliter som egentligen letade efter hemliga kärnvapenprov.' }
    ]
  },
{
    id: 'kvantmekanik',
    term: 'Kvantmekanik',
    former: ['kvantmekanik', 'kvantmekaniken', 'kvantmekanisk', 'kvantmekaniskt', 'kvantmekaniska', 'kvantfysik', 'kvantfysiken', 'kvanta', 'kvantum', 'kvanttillstånd', 'kvanttillståndet', 'superposition', 'superpositionen', 'obestämdhetsrelationen', 'obestämdhetsrelation'],
    kort: 'Teorin för materiens allra minsta beståndsdelar. Där kommer energi i bestämda portioner, partiklar beter sig som vågor, och naturen svarar med sannolikheter i stället för säkra besked.',
    relaterade: ['kvantsammanflatning', 'foton', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'I början av 1900-talet gick den klassiska fysiken i stå. Den kunde inte förklara varför en glödande kropp lyser som den gör, varför atomerna inte kollapsar, eller varför varje grundämne bara sänder ut vissa bestämda färger. Lösningen visade sig vara lika enkel som omvälvande: på den allra minsta skalan kommer energi inte i en jämn ström utan i bestämda portioner, kvanta. En elektron i en atom kan inte ha vilken energi som helst, lika lite som du kan stå mellan två pinnar på en stege.' },
      { type: 'p', html: 'Kvantmekaniken lade till två saker som strider mot vardagsförnuftet. Det ena är att allt smått har både våg- och partikelegenskaper: skickar man elektroner mot två smala spalter bildas ett randmönster på skärmen bakom, precis som av en vattenvåg — men varje elektron träffar skärmen i en enda punkt, som en kula. Det andra är att teorin bara ger sannolikheter. Man kan räkna ut exakt hur stor chansen är att elektronen hamnar på ett visst ställe, men inte vilket ställe det blir i just det försöket. Obestämdhetsrelationen sätter dessutom en principiell gräns: ju bättre man känner en partikels läge, desto sämre känner man dess rörelsemängd — och det beror inte på slarviga instrument utan på hur naturen är byggd.' },
      { type: 'p', html: 'Varför märks inget av detta när du kastar en boll? För att effekterna skalas av en mycket liten naturkonstant, Plancks konstant <em>h</em> ≈ 6,63&nbsp;·&nbsp;10<sup>−34</sup>&nbsp;J·s. För vardagsföremål blir kvanteffekterna så försvinnande små att den klassiska fysiken räcker gott. Trots sin egendomlighet är kvantmekaniken den mest välprövade teori fysiken har, och den är helt nödvändig för transistorn i varje dator, för lysdioden, lasern och magnetkameran.' }
    ]
  },
  {
    id: 'kvantdator',
    term: 'Kvantdator',
    former: ['kvantdator', 'kvantdatorn', 'kvantdatorer', 'kvantdatorerna', 'qubit', 'qubitar', 'qubitarna', 'kvantbit', 'kvantbiten', 'kvantbitar', 'kvantberäkning', 'kvantberäkningar', 'kvantalgoritm', 'kvantalgoritmer', 'dekoherens', 'dekoherensen'],
    kort: 'En dator som räknar med kvantmekanikens regler. Dess minnesceller, qubits, kan befinna sig i en blandning av 0 och 1 samtidigt — vilket öppnar nya sätt att angripa vissa problem.',
    relaterade: ['kvantsammanflatning', 'kvantmekanik', 'supraledare'],
    body: [
      { type: 'p', html: 'En vanlig dator bygger på bitar som är antingen 0 eller 1, som strömbrytare i två lägen. En kvantdator använder i stället qubits, kvantbitar, som lyder kvantmekanikens regler: en qubit kan befinna sig i en superposition, en blandning av 0 och 1 samtidigt, och flera qubits kan sammanflätas så att de bildar ett enda gemensamt tillstånd. Med <em>n</em> qubits rymmer maskinen därför 2<sup><em>n</em></sup> möjligheter på en gång — redan 300 qubits ger fler kombinationer än det finns atomer i det synliga universum.' },
      { type: 'p', html: 'Men en kvantdator är inte bara en snabbare dator. Läser man av qubitarna kollapsar superpositionen och man får ut ett helt vanligt svar av nollor och ettor. Konsten ligger i att skriva algoritmer där de felaktiga svaren släcker ut varandra genom interferens medan det rätta förstärks, och sådana algoritmer känner man bara till för vissa problemtyper: faktorisering av stora tal (som mycket av dagens kryptering vilar på), simulering av molekyler och kemiska reaktioner, samt vissa sök- och optimeringsproblem. På ordbehandling, videoströmning och det mesta annat är en kvantdator hopplöst underlägsen en vanlig.' },
      { type: 'p', html: 'Det stora hindret heter dekoherens. Ett kvanttillstånd är oerhört skört: minsta värmeskakning eller elektriska brus från omgivningen förstör det på bråkdelar av en sekund. Därför körs de flesta kvantdatorer nedkylda till nära absoluta nollpunkten, och därför krävs felkorrigering, där hundratals eller tusentals fysiska qubits samverkar för att bilda en enda pålitlig ”logisk” qubit. Dagens maskiner har i storleksordningen hundra till tusen brusiga qubits — imponerande, men fortfarande långt ifrån de felkorrigerade maskiner som skulle kunna knäcka verklig kryptering.' }
    ]
  },
  {
    id: 'standardmodellen',
    term: 'Standardmodellen',
    former: ['standardmodellen', 'standardmodell', 'kvark', 'kvarken', 'kvarkar', 'kvarkarna', 'lepton', 'leptonen', 'leptoner', 'leptonerna', 'gluon', 'gluonen', 'gluoner', 'gluonerna', 'fermion', 'fermioner', 'fermionerna', 'elementarpartikel', 'elementarpartiklar', 'elementarpartiklarna', 'nedkvark', 'nedkvarkar', 'uppkvark', 'uppkvarkar', 'pentakvark', 'pentakvarkar'],
    kort: 'Partikelfysikens grundkarta: en lista över materiens minsta byggstenar och de partiklar som förmedlar krafterna mellan dem. Den beskriver tre av naturens fyra krafter — gravitationen står utanför.',
    relaterade: ['higgsbosonen', 'boson', 'neutrino', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'Allt du kan ta på består av atomer, atomerna av elektroner och atomkärnor, och kärnorna av protoner och neutroner. Där tog uppdelningen slut länge — men protoner och neutroner visade sig i sin tur bestå av kvarkar. Standardmodellen är listan där allt detta samlas: tolv materiepartiklar, nämligen sex kvarkar (upp, ner, sär, charm, botten och topp) och sex leptoner (elektronen, myonen, tauonen och deras tre neutriner). De är ordnade i tre generationer, där varje generation är en tyngre kopia av den föregående. Vanlig materia klarar sig med den lättaste: uppkvark, nedkvark och elektron. De tyngre släktingarna sönderfaller nästan omedelbart.' },
      { type: 'p', html: 'Till detta kommer krafternas budbärare. Elektromagnetismen förmedlas av fotonen, den starka kraften som håller ihop atomkärnan av gluoner, och den svaga kraften — den som driver vissa radioaktiva sönderfall — av W- och Z-partiklarna. Sist i uppställningen står higgsbosonen, som hör ihop med det fält som ger de övriga partiklarna massa. Varje materiepartikel har dessutom en antipartikel med motsatt laddning.' },
      { type: 'p', html: 'Standardmodellen är extremt välprövad; vissa av dess förutsägelser stämmer med mätningar på tio värdesiffrors noggrannhet. Ändå vet alla att den är ofullständig. Gravitationen finns inte med alls. Den säger ingenting om mörk materia eller mörk energi, som tillsammans utgör det mesta av universums innehåll. Den förutsåg inte att neutriner har massa. Och den förklarar inte varför universum blev fullt av materia i stället för lika delar materia och antimateria. Standardmodellen är alltså inte slutmålet, utan den bästa karta vi har hittills.' }
    ]
  },
  {
    id: 'higgsbosonen',
    term: 'Higgsbosonen',
    former: ['higgsbosonen', 'higgsboson', 'higgsbosoner', 'higgspartikeln', 'higgspartikel', 'higgsfältet', 'higgsfält', 'higgsmekanismen', 'higgsmekanism'],
    kort: 'Partikeln som avslöjade higgsfältet — det osynliga fält som fyller hela rymden och ger elementarpartiklarna deras massa. Den hittades vid CERN 2012, nästan femtio år efter att den förutsagts.',
    relaterade: ['standardmodellen', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'På 1960-talet hade fysikerna ett problem. Teorin för den svaga kraften fungerade vackert så länge alla partiklar var masslösa — men verkligheten är inte masslös. År 1964 föreslog flera forskargrupper, bland dem Peter Higgs samt François Englert och Robert Brout, en utväg: ett osynligt fält som fyller hela rymden. Partiklar som växelverkar starkt med fältet bromsas upp och beter sig som om de vore tunga, medan partiklar som knappt känner av fältet — som fotonen — förblir masslösa och far fram med ljusets hastighet. Bilden man brukar använda är en sirapsliknande sörja: vissa partiklar kilar rakt igenom, andra kämpar sig fram.' },
      { type: 'p', html: 'Ett fält som verkligen finns måste också gå att skaka igång, och krusningen på higgsfältet är higgsbosonen. Att skaka fram en enda kräver enorm energi samlad på en punkt, och det var en av huvuduppgifterna för partikelacceleratorn LHC vid CERN. I juli 2012 kunde två oberoende experiment meddela att de sett en ny partikel med massan omkring 125&nbsp;GeV — higgsbosonen. Året därpå gick Nobelpriset i fysik till Higgs och Englert. Partikeln lever bara ungefär 10<sup>−22</sup>&nbsp;sekunder och ses aldrig direkt, utan spåras genom mönstret i de lättare partiklar den sönderfaller till.' },
      { type: 'p', html: 'En vanlig missuppfattning är att higgsfältet ger massa åt allt. Det ger massa åt elementarpartiklarna: kvarkar, elektroner samt W- och Z-partiklarna. Men nästan all massa i din kropp sitter i protoner och neutroner, och omkring 99&nbsp;% av deras massa kommer från energin i den starka kraft som binder kvarkarna samman — inte från higgsfältet. Utan higgsfältet skulle du ändå inte finnas: atomer kräver elektroner med massa.' }
    ]
  },
  {
    id: 'antimateria',
    term: 'Antimateria',
    former: ['antimateria', 'antimaterian', 'antipartikel', 'antipartikeln', 'antipartiklar', 'antipartiklarna', 'positron', 'positronen', 'positroner', 'positronerna', 'antiproton', 'antiprotoner', 'antiväte', 'antivätet', 'antiatom', 'antiatomer', 'annihilation', 'annihilationen'],
    kort: 'Materiens spegelbild: till varje partikel finns en antipartikel med samma massa men motsatt laddning. Möts de förintas båda och blir ren energi.',
    relaterade: ['standardmodellen', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'När Paul Dirac 1928 skrev ner en ekvation som förenade kvantmekaniken med relativitetsteorin fick han på köpet med en uppsättning lösningar som verkade beskriva elektroner med positiv laddning. I stället för att stryka dem tog han dem på allvar — och 1932 hittade Carl Anderson just en sådan partikel i den kosmiska strålningen. Den kallas positron och är elektronens antipartikel: exakt samma massa, exakt lika stor laddning, men med motsatt tecken. Samma sak gäller alla andra partiklar. Det finns antiprotoner, antineutroner och till och med hela antiväteatomer, som tillverkas några i taget vid CERN.' },
      { type: 'p', html: 'Det dramatiska händer när materia möter antimateria. Partikelparet förintas, och hela massan omvandlas till energi enligt <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup>, oftast som två gammafotoner som far åt var sitt håll. Det är den effektivaste energiomvandling naturen känner till — men helt oanvändbar som energikälla, eftersom det kostar långt mer energi att tillverka antimaterian än man någonsin får ut av den. All antimateria som mänskligheten hittills framställt väger tillsammans mindre än ett miljondels gram.' },
      { type: 'p', html: 'Ändå är antimateria vardag på sjukhus. PET-kameran, positronemissionstomografen, bygger på den: patienten får ett spårämne som sönderfaller och sänder ut positroner, varje positron förintas nästan omedelbart mot en elektron i vävnaden, och de två gammafotonerna som skickas ut åt precis motsatta håll fångas upp av en ring av detektorer som räknar ut var förintelsen skedde.' },
      { type: 'p', html: 'Den stora olösta frågan är varför det finns någon materia alls. I det tidiga universum borde materia och antimateria ha bildats i lika delar och sedan förintat varandra fullständigt, så att bara strålning återstod. Ändå är allt omkring oss byggt av materia. Någonstans måste naturen ha behandlat de två sidorna en aning olika, och den lilla obalansen letar fysiker efter i minutiösa jämförelser mellan partiklar och deras antipartiklar.' }
    ]
  },
  {
    id: 'partikelaccelerator',
    term: 'Partikelaccelerator',
    former: ['partikelaccelerator', 'partikelacceleratorn', 'partikelacceleratorer', 'partikelacceleratorerna', 'lagringsring', 'lagringsringen', 'lagringsringar', 'lagringsringarna', 'acceleratorn', 'acceleratorer', 'acceleratorerna', 'synkrotron', 'synkrotronen', 'synkrotroner', 'synkrotronljus', 'synkrotronljuset', 'cyklotron', 'cyklotronen', 'kollisionsenergi', 'kollisionsenergin', 'elektronvolt', 'gigaelektronvolt', 'megaelektronvolt', 'protonsynkrotron', 'protonsynkrotronen', 'synkrocyklotron', 'synkrocyklotronen'],
    kort: 'En maskin som driver upp laddade partiklar till nära ljushastigheten med elektriska fält och styr dem med magneter. Används för att utforska materiens minsta byggstenar — men allra mest inom sjukvård och materialforskning.',
    relaterade: ['standardmodellen', 'higgsbosonen', 'antimateria'],
    body: [
      { type: 'p', html: 'Principen är enkel och gammal: en laddad partikel i ett elektriskt fält känner en kraft och accelereras. Bildröret i en gammaldags tv var faktiskt en liten accelerator — elektroner som fick fart av en spänning och slog i skärmen. Skillnaden i en forskningsanläggning är att partiklarna får passera samma accelererande fält om och om igen. I en ringaccelerator böjer kraftfulla elektromagneter partikelknippet runt ett cirkelformat vakuumrör, medan snabbt växlande elektriska fält ger en knuff varje varv. Efter miljontals varv rör sig partiklarna med bara några miljondels procent lägre fart än ljuset.' },
      { type: 'p', html: 'Energin anges i elektronvolt (eV) — den energi en elektron får av en volts spänning. Världens största maskin, LHC vid CERN, ligger i en tunnel med 27&nbsp;km omkrets och krockar protoner med en sammanlagd energi på drygt 13&nbsp;TeV, alltså över 13&nbsp;·&nbsp;10<sup>12</sup>&nbsp;eV. Hög energi behövs av två skäl. Dels beter sig snabba partiklar som vågor med kort våglängd, och bara korta vågor kan avbilda små detaljer — acceleratorn är i den meningen ett mikroskop. Dels kan energin enligt <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup> omvandlas till nya, tyngre partiklar som annars bara fanns i universums första ögonblick.' },
      { type: 'p', html: 'Partikelfysik är ändå en liten minoritet av verksamheten. Av världens tiotusentals acceleratorer används de allra flesta till helt andra saker: strålbehandling av cancer, tillverkning av kortlivade spårämnen till medicinska undersökningar, härdning av plaster och sterilisering av utrustning. En särskilt viktig gren är synkrotronljuskällor, där elektroner som tvingas runt en ring sänder ut extremt intensivt röntgenljus. Det ljuset används för att kartlägga proteiners form, se vad som händer inuti ett batteri under drift och till och med läsa texten i förkolnade antika bokrullar utan att rulla upp dem.' }
    ]
  },
  {
    id: 'radioaktivt-sonderfall',
    term: 'Radioaktivt sönderfall',
    former: ['radioaktivt sönderfall', 'radioaktivitet', 'radioaktiviteten', 'radioaktiv', 'radioaktivt', 'radioaktiva', 'sönderfall', 'sönderfallet', 'sönderfaller', 'sönderfalla', 'halveringstid', 'halveringstiden', 'halveringstider', 'halveringstiderna', 'alfastrålning', 'alfasönderfall', 'betastrålning', 'betasönderfall', 'alfasönderfallet', 'betasönderfallet'],
    kort: 'Instabila atomkärnor omvandlas spontant och gör sig av med energi genom att sända ut strålning. När det sker för en enskild kärna går inte att förutsäga — men för en stor mängd kärnor följer det en exakt lag.',
    relaterade: ['isotop', 'gammastralning', 'neutrino'],
    body: [
      { type: 'p', html: 'En atomkärna hålls ihop av den starka kärnkraften, som drar, medan protonernas positiva laddningar stöter bort varandra. Blir blandningen av protoner och neutroner ogynnsam blir kärnan instabil och ombildar sig förr eller senare spontant till något som ligger stabilare till. Det sker på tre huvudsätt. Vid alfasönderfall spottar kärnan ut ett fast paket av två protoner och två neutroner, alltså en heliumkärna. Vid betasönderfall omvandlas en neutron till en proton eller tvärtom, och en elektron eller positron kastas ut tillsammans med en neutrino. Vid gammasönderfall behåller kärnan sina partiklar men gör sig av med överskottsenergi som en energirik foton.' },
      { type: 'p', html: 'Det märkliga är slumpen. Kärnor åldras inte, och ingen enskild kärna går att förutsäga: en atom som legat orörd i en miljard år har exakt samma chans att sönderfalla under nästa sekund som en nybildad. Ändå blir en stor samling kärnor fullständigt förutsägbar. Efter en halveringstid återstår ungefär hälften, efter två halveringstider en fjärdedel, efter tre en åttondel. Halveringstiderna spänner över ofattbara skalor: vissa konstgjorda kärnor lever bråkdelar av en miljondels sekund, medan uran-238 har halveringstiden 4,5&nbsp;miljarder år — ungefär jordens ålder, vilket är just därför det fortfarande finns uran i berggrunden.' },
      { type: 'p', html: 'Regelbundenheten gör sönderfall till en klocka. Kol-14 bildas hela tiden i atmosfären och tas upp av allt levande. När organismen dör slutar påfyllningen och halten sjunker med halveringstiden 5&nbsp;730&nbsp;år, vilket låter arkeologer datera fynd upp till omkring 50&nbsp;000&nbsp;år bakåt. Inom sjukvården används i stället avsiktligt kortlivade ämnen som spårämnen: de ges i mycket små mängder, följs utifrån med detektorer och har hunnit klinga av inom några timmar.' }
    ]
  },
  {
    id: 'isotop',
    term: 'Isotop',
    former: ['isotop', 'isotopen', 'isotoper', 'isotoperna', 'isotopisk', 'isotopiska', 'isotopförhållande', 'isotopförhållandet', 'isotopförhållanden', 'nuklid', 'nuklider', 'deuterium', 'deuteron', 'deuteronen', 'deuteroner', 'deuteronerna', 'tritium', 'tungt vatten', 'väteisotop', 'väteisotopen', 'väteisotoper', 'väteisotoperna', 'moderisotop', 'moderisotopen', 'radiumisotop', 'radiumisotoper', 'radiumisotoperna'],
    kort: 'Atomer av samma grundämne men med olika många neutroner i kärnan. De uppför sig nästan likadant kemiskt, men skiljer sig i massa och i hur stabila de är.',
    relaterade: ['radioaktivt-sonderfall', 'spektroskopi'],
    body: [
      { type: 'p', html: 'Vilket grundämne en atom tillhör bestäms helt av antalet protoner i kärnan: sex protoner betyder kol, åtta betyder syre, 92 betyder uran. Antalet neutroner är däremot inte låst. Kolatomer finns med sex, sju eller åtta neutroner och kallas då kol-12, kol-13 och kol-14 efter det sammanlagda antalet kärnpartiklar. Sådana varianter av samma grundämne kallas isotoper. Eftersom kemin styrs av elektronerna, och elektronantalet följer protonerna, beter sig isotoperna nästan identiskt kemiskt — de ingår i samma föreningar och deltar i samma reaktioner.' },
      { type: 'p', html: 'Två saker skiljer dem åt. Den ena är massan, vilket märks tydligast bland de lättaste ämnena: vanligt väte har en ensam proton i kärnan, deuterium har en proton och en neutron och är alltså ungefär dubbelt så tungt, och tritium med två neutroner nästan tre gånger så tungt. Tungt vatten, där väteatomerna är deuterium, är faktiskt mätbart tyngre än vanligt vatten. Den andra skillnaden är stabiliteten. Av de omkring 3&nbsp;000 kända isotoperna är bara ungefär 250 stabila; resten är radioaktiva och sönderfaller förr eller senare. Kol-12 ligger kvar för alltid, medan kol-14 har halveringstiden 5&nbsp;730&nbsp;år.' },
      { type: 'p', html: 'Just för att isotoper är kemiskt lika men fysiskt olika blir de utmärkta spår att följa. Vatten med den tyngre syreisotopen syre-18 avdunstar något trögare än vatten med syre-16, så förhållandet mellan de två i iskärnor och havssediment berättar hur varmt det var för tiotusentals år sedan. Kol- och kväveisotoper i benrester avslöjar vad en människa åt för tusentals år sedan, och i sjukvården används kortlivade isotoper för att följa hur ett organ arbetar i realtid.' }
    ]
  },
{
    id: 'halvledare',
    term: 'Halvledare',
    former: ['halvledare', 'halvledaren', 'halvledarna', 'halvledarmaterial', 'halvledarmaterialet', 'halvledarkomponent', 'halvledarkomponenter', 'halvledarindustrin', 'bandgap', 'bandgapet', 'dopning', 'dopningen', 'dopad', 'dopat', 'dopade', 'pn-övergång', 'pn-övergången'],
    kort: 'Ett material som leder ström sämre än en metall men bättre än en isolator — och där ledningsförmågan dessutom går att styra. Det är styrbarheten som gör all modern elektronik möjlig.',
    relaterade: ['gitter', 'nanoskala', 'supraledare'],
    body: [
      { type: 'p', html: 'Sorterar man material efter hur bra de leder ström hamnar metallerna i ena änden och isolatorerna i den andra: koppar släpper igenom ström nästan hur lätt som helst, glas och gummi inte alls. Mittemellan ligger halvledarna, med kisel som den stora arbetshästen. Det intressanta är inte att de leder ”lagom”, utan att ledningsförmågan går att <em>styra</em>: samma bit kisel kan gå från att knappt leda alls till att leda bra, beroende på temperatur, ljus eller en pålagd spänning.' },
      { type: 'p', html: 'Förklaringen ligger i bandgapet. Elektronerna i ett fast ämne kan bara ha vissa energier, och mellan de energier där de sitter fastlåsta i sina bindningar och de där de kan vandra fritt finns ett tomrum: bandgapet. I en isolator är gapet så brett att nästan ingen elektron orkar över, i en metall finns inget gap alls, och i en halvledare räcker en knuff av värme eller ljus. Dessutom går det att smutsa ner kislet med avsikt, så kallad dopning: en främmande atom på en miljon kiselatomer räcker. Har den en elektron för mycket blir det n-typ, med rörliga elektroner i överskott; en för lite ger p-typ, där tomma platser beter sig som positiva laddningar.' },
      { type: 'p', html: 'Skarven mellan n-dopat och p-dopat material, pn-övergången, är den verkliga uppfinningen. Den släpper fram ström åt bara ett håll — det är en diod. Tre skikt på varandra blir en transistor: en strömbrytare utan rörliga delar som kan slås av och på miljarder gånger per sekund. Lyser övergången när ström passerar är det en lysdiod; faller ljus in i stället är det en solcell. Ett modernt processorchip rymmer tiotals miljarder transistorer på en yta mindre än en tumnagel.' }
    ]
  },
  {
    id: 'nanoskala',
    term: 'Nanoskala',
    former: ['nanoskala', 'nanoskalan', 'nanometer', 'nanometern', 'nanoteknik', 'nanotekniken', 'nanostruktur', 'nanostrukturer', 'nanopartikel', 'nanopartiklar', 'nanopartiklarna', 'kvantprick', 'kvantprickar', 'kvantprickarna'],
    kort: 'Storleksordningen några miljarddels meter, där enstaka atomer och molekyler är byggstenarna. Väl kända material får ofta helt nya egenskaper när de krymps ner hit.',
    relaterade: ['halvledare', 'metamaterial', 'fotonisk-kristall'],
    body: [
      { type: 'p', html: 'En nanometer är en miljarddels meter: 1&nbsp;nm = 10<sup>−9</sup>&nbsp;m. Tumregeln är att ungefär tio atomer på rad blir en nanometer. Ett människohårstrå är omkring 80&nbsp;000&nbsp;nm tjockt — en nanometer förhåller sig alltså till hårstrået ungefär som hårstrået till en fotbollsplan. DNA-spiralen är ett par nanometer bred och ett virus några tiotals till ett par hundra. Med nanoskalan menas vanligen storlekar från ungefär 1 till 100&nbsp;nm.' },
      { type: 'p', html: 'Att material beter sig annorlunda här beror på två saker. Dels blir ytan viktig: i en guldtacka sitter så gott som alla atomer skyddade inne i materialet, medan en partikel på några nanometer har en stor del av sina atomer i ytan, med lösa bindningar som gärna reagerar. Dels tar kvanteffekterna över — en elektron instängd i ett så litet utrymme kan bara ha vissa bestämda energier, och vilka beror på utrymmets storlek. Därför är guld gult och trögreaktivt i vanlig storlek men rubinrött och en effektiv katalysator som nanopartiklar. Samma princip ger kvantprickar: halvledarkorn som lyser i en färg som bestäms av kornets storlek, större korn rött och mindre blått.' },
      { type: 'p', html: 'Ett vanligt ljusmikroskop hjälper inte — synligt ljus har en våglängd på runt 500&nbsp;nm och är alltså grövre än det man vill titta på. I stället används elektronmikroskop och sveptunnelmikroskop, där en nål känner sig fram över ytan och till och med kan putta enskilda atomer på plats. Nanotekniken sitter redan i solkrämer, smutsavvisande ytor, katalysatorer och i datorchipp, där de minsta detaljerna mäts i tiotals nanometer.' }
    ]
  },
  {
    id: 'relativitetsteori',
    term: 'Relativitetsteori',
    former: ['relativitetsteori', 'relativitetsteorin', 'speciella relativitetsteorin', 'allmänna relativitetsteorin', 'relativistisk', 'relativistiskt', 'relativistiska', 'tidsdilatation', 'tidsdilatationen', 'längdkontraktion', 'längdkontraktionen', 'rumtid', 'rumtiden'],
    kort: 'Einsteins två teorier om rum, tid och gravitation: den speciella (1905) om vad som händer nära ljusets hastighet, och den allmänna (1915) som beskriver gravitation som en krökning av rumtiden.',
    relaterade: ['svart-hal', 'kosmologiska-konstanten', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'Den speciella relativitetsteorin, som Einstein lade fram 1905, vilar på ett enda envist mätresultat: ljus i vakuum rör sig med samma fart, ungefär 300&nbsp;000&nbsp;km/s, oavsett hur den som mäter rör sig. Kastar du en boll framåt från ett tåg läggs bollens och tågets fart ihop — men riktar du en ficklampa framåt blir ljusets fart exakt densamma. För att det ska gå ihop måste något annat ge vika, och det som ger vika är tiden och längden. En klocka i hög fart går långsammare sett utifrån (tidsdilatation) och ett föremål blir kortare i sin färdriktning (längdkontraktion). Det är inga synvillor: myoner som bildas högt uppe i atmosfären hinner ner till marken trots att de borde ha sönderfallit långt innan. Ur samma teori följer att massa är en form av energi, <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup>.' },
      { type: 'p', html: 'Tio år senare kom fortsättningen. I den allmänna relativitetsteorin från 1915 är gravitation inte en kraft som drar i saker på avstånd, utan ren geometri: massa och energi kröker rumtiden — rummets tre riktningar och tiden sammanvävda till en helhet — och föremål följer den rakaste möjliga vägen genom krökningen. Bilden av en tung kula som gröper ur en studsmatta fångar en del av saken, men bara en del, för det är inte bara rummet som kröks: klockor går långsammare djupt nere i ett gravitationsfält.' },
      { type: 'p', html: 'Båda teorierna har provats hårt och hållit. Vid solförmörkelsen 1919 mättes hur stjärnljus böjs av när det passerar solen. GPS-satelliternas klockor går omkring 38 miljondels sekunder fel per dygn jämfört med klockor på marken, och utan relativistisk korrigering skulle positionerna glida flera kilometer om dagen. 2015 fångades gravitationsvågor från två kolliderande svarta hål — krusningar i själva rumtiden, förutsagda hundra år tidigare.' }
    ]
  },
  {
    id: 'topologiskt-skydd',
    term: 'Topologiskt skydd',
    former: ['topologiskt skydd', 'topologiskt skyddad', 'topologiskt skyddat', 'topologiskt skyddade', 'topologisk', 'topologiskt', 'topologiska', 'topologi', 'topologin', 'topologisk isolator', 'topologiska isolatorer', 'kanttillstånd'],
    kort: 'När en egenskap bestäms av en helhetsform i stället för av detaljerna blir den nästan omöjlig att förstöra — som knuten på ett rep, som sitter kvar hur mycket man än drar och vrider.',
    relaterade: ['skyrmion', 'supraledare', 'kvantdator'],
    body: [
      { type: 'p', html: 'Slå en knut på ett rep och knyt sedan ihop ändarna till en ögla. Nu kan du dra, vrida och skaka hur mycket du vill: knuten glider omkring och byter form, men den försvinner aldrig. Enda sättet att bli av med den är att klippa av repet. Antalet knutar är ett exempel på en topologisk egenskap — något som bara beror på hur saker hänger ihop, inte på exakta mått eller mjuka formförändringar. Topologiskt sett är en kaffekopp och en ringformad kaka samma sak: båda har precis ett hål.' },
      { type: 'p', html: 'Samma logik dyker upp i material. Vissa kvanttillstånd bär på ett tal som av matematiska skäl bara kan vara ett helt tal — 0, 1, 2 och så vidare — och ett helt tal kan inte ändras lite grann. Orenheter, ojämna kanter, en stöt eller värmerörelse kan skaka om tillståndet men inte ändra dess tal, för det skulle kräva ett helt hopp och därmed mycket energi. Tillståndet är topologiskt skyddat, och därför ovanligt tåligt.' },
      { type: 'p', html: 'Ett tydligt exempel är den topologiska isolatorn: den leder inte alls ström i sitt inre, men längs kanten finns tillstånd som leder utmärkt och som tar sig förbi hinder utan att strömmen studsar tillbaka. Ett annat är skyrmioner, små virvlar i ett magnetiskt mönster som går att flytta men inte att jämna ut, och som därför testas som robusta minnesceller. Störst hopp knyts kanske till kvantdatorer, vars stora problem är just hur ömtåliga kvanttillstånden är. Nobelpriset i fysik 2016 gick till David Thouless, Duncan Haldane och Michael Kosterlitz för den matematiska beskrivningen av sådana tillstånd.' }
    ]
  },
  {
    id: 'termoelektrisk-effekt',
    term: 'Termoelektrisk effekt',
    former: ['termoelektrisk effekt', 'termoelektriska effekten', 'termoelektrisk', 'termoelektriskt', 'termoelektriska', 'termoelektricitet', 'termoelektriciteten', 'seebeckeffekten', 'seebeck-effekten', 'peltiereffekten', 'peltier-effekten', 'peltierelement', 'termoelement', 'termoelementet'],
    kort: 'En temperaturskillnad över ett material ger upphov till en elektrisk spänning — och omvänt kan en ström pumpa värme, så att ena sidan blir kall och den andra varm.',
    relaterade: ['halvledare', 'nanoskala', 'isotop'],
    body: [
      { type: 'p', html: 'Värm ena änden av en metallstav och håll den andra kall. Laddningsbärarna i den varma änden rör sig häftigare än de i den kalla och sprider sig därför nedåt i temperatur, tills det samlats ett litet överskott av laddning i den kalla änden. Då finns en spänning mellan ändarna, helt utan batteri. Det kallas seebeckeffekten efter Thomas Seebeck, som upptäckte den 1821. Spänningen är liten — några tiotals miljondels volt per grads temperaturskillnad — så i praktiken kopplas två olika material ihop till en slinga.' },
      { type: 'p', html: 'Effekten går också att köra baklänges. Driver man i stället en ström genom skarven mellan två sådana material bär laddningsbärarna med sig värme från den ena sidan till den andra: ena sidan kyls ner, den andra blir varm. Det är peltiereffekten, upptäckt 1834, och ett peltierelement är alltså en värmepump utan rörliga delar, köldmedium eller ljud — bra i små kylskåp och för att kyla bildsensorer.' },
      { type: 'p', html: 'Vanligast är termoelementet: två hopsvetsade trådar av olika metall som mäter temperatur från djupt minusgradigt till långt över tusen grader, och som sitter i ugnar, motorer och processindustri överallt. Mest spektakulärt används effekten i rymden. En radioisotopgenerator innehåller en klump plutonium-238 som håller sig varm av sitt eget radioaktiva sönderfall, och termoelektriska element gör temperaturskillnaden mot rymdkylan till elektricitet — utan solpaneler och utan en enda rörlig del. Voyagersonderna har drivits så sedan 1977. Haken är verkningsgraden, bara några få procent: ett bra termoelektriskt material ska leda ström bra men värme dåligt, och i de flesta material följs de två egenskaperna åt. Att bryta det sambandet, till exempel med nanostrukturer som bromsar värmen men släpper fram laddningarna, är fältets stora utmaning.' }
    ]
  },
  {
    id: 'turbulens',
    term: 'Turbulens',
    former: ['turbulens', 'turbulensen', 'turbulent', 'turbulenta', 'turbulent flöde', 'laminär', 'laminärt', 'laminära', 'laminärt flöde'],
    kort: 'Det virvlande, kaotiska tillstånd en gas eller vätska hamnar i när flödet blir tillräckligt snabbt. Rörelsen lyder kända lagar men går ändå inte att förutsäga i detalj.',
    relaterade: ['superfluid', 'plasma'],
    body: [
      { type: 'p', html: 'Titta på röken från ett nyss släckt ljus. Precis ovanför veken stiger den som en slät, nästan orörlig strimma — laminärt flöde, där gasen rör sig i parallella skikt som glider förbi varandra utan att blandas. Några centimeter längre upp bryts strimman plötsligt upp i virvlar som slingrar in i varandra i ett mönster som aldrig upprepar sig. Det är övergången till turbulens. Om ett flöde blir turbulent avgörs av farten, av områdets storlek och av mediets inre friktion, viskositeten: snabbt, stort och tunnflytande ger turbulens, medan långsamt, litet och trögflytande — tänk honung — håller sig laminärt.' },
      { type: 'p', html: 'Kännetecknet är virvlar i alla storlekar samtidigt. De stora bryts upp i mindre, som bryts upp i ännu mindre, i en kaskad nedåt tills virvlarna är så små att den inre friktionen gör om deras rörelse till värme. Blandningen blir därför mycket effektiv — en droppe mjölk sprider sig direkt i omrört kaffe — och motståndet ökar dramatiskt, eftersom en stor del av energin går åt till att röra om i mediet i stället för att driva något framåt. Just därför läggs så mycket möda på att hålla flödet laminärt kring flygplansvingar, båtskrov och tävlingscyklister.' },
      { type: 'p', html: 'Turbulens är ändå inte laglös: rörelsen lyder ekvationer som varit kända sedan 1800-talet. Problemet är att lösningarna är extremt känsliga för startvillkoren — en försumbar skillnad i början växer till ett helt annat virvelmönster en stund senare, och ingen dator kan hålla reda på varenda liten virvel i ett verkligt flöde. Därför har väderprognoser en bortre gräns, därför går luftgropar inte att förutsäga i detalj, och därför räknar ingenjörer med ungefärliga modeller. Att ens bevisa att ekvationerna alltid har snälla lösningar är ett av matematikens berömda millennieproblem, och turbulens brukar kallas det sista stora olösta problemet i den klassiska fysiken.' }
    ]
  },
  {
    id: 'rodforskjutning',
    term: 'Rödförskjutning',
    former: ['rödförskjutning', 'rödförskjutningen', 'rödförskjutningar',
             'rödförskjuten', 'rödförskjutet', 'rödförskjutna', 'rödförskjuts'],
    kort: 'Att ljuset från ett avlägset objekt sträcks ut mot längre våglängder, alltså mot rött. Det är astronomins viktigaste mått på hur långt bort och hur långt tillbaka i tiden något ligger.',
    relaterade: ['vaglangd', 'kvasar', 'mork-energi', 'ljusar'],
    body: [
      { type: 'p', html: 'Alla känner igen effekten från en ambulans som kör förbi: sirenen låter ljusare när den närmar sig och mörkare när den avlägsnar sig, eftersom ljudvågorna trycks ihop framför bilen och dras ut bakom den. Ljus beter sig likadant. Ett föremål som rör sig bort från oss får sitt ljus utsträckt till längre våglängder — mot den röda änden av spektrumet — och det kallas rödförskjutning. Rör det sig i stället mot oss trycks ljuset ihop och blir blåförskjutet.' },
      { type: 'p', html: 'Att det går att mäta beror på att varje grundämne sänder ut och absorberar ljus vid sina alldeles egna våglängder, som ett strimmigt fingeravtryck i spektrumet. Astronomer letar upp det mönstret i ljuset från en avlägsen galax och ser hur långt hela mönstret har glidit mot rött. Förskjutningen anges med bokstaven <em>z</em>: en galax med <em>z</em>&nbsp;=&nbsp;1 syns i ljus vars våglängd har fördubblats på vägen.' },
      { type: 'p', html: 'För avlägsna galaxer är förklaringen dock inte riktigt att de far iväg genom rymden. Det är rymden själv som växer medan ljuset är på väg, och ljusvågen sträcks ut med den. Edwin Hubble upptäckte 1929 att ju längre bort en galax ligger, desto mer rödförskjutet är dess ljus — det första beviset för att universum expanderar. Därför fungerar <em>z</em> i praktiken som både avståndsmått och tidsmaskin: de mest avlägsna galaxer teleskopen hittills nått ligger över <em>z</em>&nbsp;=&nbsp;14, och deras ljus lämnade dem när universum var några hundra miljoner år gammalt. Den kosmiska bakgrundsstrålningen är ännu extremare, omkring <em>z</em>&nbsp;=&nbsp;1100.' },
      { type: 'p', html: 'Det finns också en helt annan sorts rödförskjutning som inte har med rörelse att göra: ljus som klättrar bort från något mycket tungt förlorar energi och blir rödare på köpet. Den gravitationella rödförskjutningen är liten vid jordytan men fullt mätbar, och nära ett svart håls händelsehorisont blir den dramatisk.' }
    ]
  },
  {
    id: 'astronomisk-enhet',
    term: 'Astronomisk enhet',
    former: ['astronomisk enhet', 'astronomiska enheter', 'astronomiska enheten',
             'astronomiska enheterna'],
    kort: 'Avståndet mellan jorden och solen, knappt 150 miljoner km. Det är måttstocken astronomer använder inom solsystemet, där ljusår blir orimligt stora.',
    relaterade: ['ljusar', 'parsec', 'asteroid', 'komet'],
    body: [
      { type: 'p', html: 'Avstånd i rymden spänner över så många storleksordningar att ett enda mått inte räcker. Ljusår passar mellan stjärnorna, men inne i vårt eget solsystem blir de löjligt stora — hela avståndet ut till Neptunus är bara en halv tusendels ljusår. Därför använder astronomer i stället jordens eget avstånd till solen som måttstock och kallar det en astronomisk enhet, förkortad au. Sedan 2012 är den exakt definierad till 149&nbsp;597&nbsp;870&nbsp;700 meter, alltså knappt 150&nbsp;miljoner&nbsp;km.' },
      { type: 'p', html: 'Fördelen är att solsystemet plötsligt går att överblicka. Mars ligger 1,5&nbsp;au från solen, Jupiter 5,2&nbsp;au och Neptunus 30&nbsp;au. Kuiperbältet, där de flesta kometer håller till, sträcker sig från ungefär 30 till 50&nbsp;au. Rymdsonden Voyager&nbsp;1, som lämnade jorden 1977, har passerat 160&nbsp;au. Ett ljusår motsvarar drygt 63&nbsp;000&nbsp;au — först då börjar det bli tal om grannstjärnor.' },
      { type: 'p', html: 'Enheten säger också något om tid. Ljuset behöver ungefär 8&nbsp;minuter och 20&nbsp;sekunder för att färdas en astronomisk enhet, vilket är precis så gammal bilden av solen är när den når din näthinna. Att över huvud taget mäta upp avståndet var länge ett av astronomins svåraste problem; i dag görs det med radarekon mot planeter och med hur rymdsonders signaler fördröjs på vägen hem.' }
    ]
  }
];
