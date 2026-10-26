/* i18n/nb/sidor/fysik2-cirkular-rorelse-app.js — norska (bokmål) för
 * simuleringen Cirkulär rörelse. Löptexten är delad i textnoder runt
 * <em>/<strong>/<sub>, en nyckel per textnod. */
(function () {
    I18N.add({
        // Sidhuvud och metadata
        'Cirkulär rörelse — Fysiklabbet': 'Sirkelbevegelse — Fysiklabbet',
        'Cirkulär rörelse — Fysik nivå 2': 'Sirkelbevegelse — Fysikk nivå 2',
        'En bil i cirkelbana ovanifrån, en bilbana med en vid och en snäv kurva, en bil i loop och en bil över krön och genom dal. Visa verkliga krafter eller centripetalkraften (resultanten), hastighet, centripetalacceleration och radie. Se att kraften bara behövs i kurvorna, hitta gränsfarten där bilen klarar loopen eller lättar från krönet, och sänk friktionen tills bilen fortsätter rakt fram.':
            'En bil i sirkelbane sett ovenfra, en bilbane med en slak og en krapp sving, en bil i en loop og en bil over en bakketopp og gjennom en dump. Vis de virkelige kreftene eller sentripetalkraften (resultanten), hastighet, sentripetalakselerasjon og radius. Se at kraften bare trengs i svingene, finn grensefarten der bilen klarer loopen eller letter fra bakketoppen, og senk friksjonen til bilen fortsetter rett frem.',
        '/ Cirkulär rörelse': '/ Sirkelbevegelse',
        'Cirkulär rörelse': 'Sirkelbevegelse',
        'Tomtebloss och centrifug': 'Stjerneskudd og sentrifuge',
        'Tomtebloss i skruvdragare': 'Stjerneskudd i skrudrill',

        // Ingressen
        'En kropp i cirkelbana påverkas av en resulterande kraft som ständigt pekar in mot cirkelns medelpunkt —':
            'Et legeme i sirkelbane påvirkes av en resultantkraft som hele tiden peker inn mot sentrum i sirkelen:',
        'centripetalkraften': 'sentripetalkraften',
        '. Den är ingen egen kraft, utan utgörs av de verkliga krafter som råkar verka: för bilen på den cirkulära vägen och på bilbanan med kurvor är det':
            '. Den er ikke en egen kraft, men består av de virkelige kreftene som tilfeldigvis virker: for bilen på den sirkulære veien og på bilbanen med svinger er det',
        'friktionskraften': 'friksjonskraften',
        'från vägbanan, och i loopen, på krönet och i dalen är det': 'fra veibanen, og i loopen, på bakketoppen og i dumpen er det',
        'normalkraften': 'normalkraften',
        'och': 'og',
        'tyngdkraften': 'tyngdekraften',
        'tillsammans. Växla mellan att visa de verkliga krafterna och resultanten, se att kraften bara behövs i kurvorna och blir större ju snävare kurvan är, och undersök gränsfarten där bilen precis klarar loopen eller lättar från krönet.':
            'til sammen. Bytt mellom å vise de virkelige kreftene og resultanten, se at kraften bare trengs i svingene og blir større jo krappere svingen er, og undersøk grensefarten der bilen akkurat klarer loopen eller letter fra bakketoppen.',

        // Formelkortet
        'Centripetalkraft': 'Sentripetalkraft',
        'Massa · fart²': 'Masse · fart²',
        'Banradie': 'Baneradius',
        'Centripetalacc.': 'Sentripetalaks.',
        'Fart²': 'Fart²',
        'Vinkelhast.² · radie': 'Vinkelfart² · radius',
        'Banfart': 'Banefart',
        'Vinkelhastighet': 'Vinkelfart',

        // Scenerna
        'Konstant fart — men hastigheten byter riktning': 'Konstant fart, men hastigheten skifter retning',
        'Normalkraften blev 0 — bilen släpper och faller fritt!': 'Normalkraften ble 0. Bilen mister kontakten og faller fritt!',
        'För låg fart — bilen rullar fram och tillbaka': 'For lav fart: bilen ruller frem og tilbake',
        'För låg fart — bilen släpper där normalkraften blir 0': 'For lav fart: bilen mister kontakten der normalkraften blir 0',
        'Precis på gränsen — i toppen är normalkraften 0': 'Akkurat på grensen: på toppen er normalkraften 0',
        'Bilen klarar loopen — normalkraft från vägen hela varvet': 'Bilen klarer loopen: normalkraft fra veien hele runden',
        '= 0 här': '= 0 her',
        'För lite grepp: bilen fortsätter rakt fram': 'For lite veigrep: bilen fortsetter rett frem',
        'Vida kurvan: friktionen ger centripetalkraften': 'Den slake svingen: friksjonen gir sentripetalkraften',
        'Snäva kurvan: friktionen ger centripetalkraften': 'Den krappe svingen: friksjonen gir sentripetalkraften',
        'Rak väg: ingen kraft i sidled behövs': 'Rett vei: ingen kraft sideveis trengs',
        'Greppet släppte här': 'Her mistet bilen veigrepet',
        'Normalkraften blev 0. Bilen lättar från vägen!': 'Normalkraften ble 0. Bilen letter fra veien!',
        'Krön: mindre normalkraft än på plan väg': 'Bakketopp: mindre normalkraft enn på flat vei',
        'Dal: större normalkraft än på plan väg': 'Dump: større normalkraft enn på flat vei',
        'Plan väg: normalkraften bär bara tyngden': 'Flat vei: normalkraften bærer bare tyngden',
        'Backe: friktionen håller farten konstant': 'Bakke: friksjonen holder farten konstant',
        'Bilen håller konstant fart. Krafterna sedda ovanifrån.': 'Bilen holder konstant fart. Kreftene sett ovenfra.',
        'Bilen håller konstant fart, och luft- och rullmotstånd försummas: friktionen behövs bara i sidled, i kurvorna. Den kan som mest ge μ · m · g.':
            'Bilen holder konstant fart, og vi ser bort fra luft- og rullemotstand: friksjonen trengs bare sideveis, i svingene. Den kan høyst gi μ · m · g.',
        'Bilen håller konstant fart, så friktionen längs vägen driver i uppförsbacke och bromsar i nedförsbacke.':
            'Bilen holder konstant fart, så friksjonen langs veien driver bilen i oppoverbakke og bremser den i nedoverbakke.',
        'Friktion och luftmotstånd försummas — farten följer energiprincipen.': 'Vi ser bort fra friksjon og luftmotstand. Farten følger energiprinsippet.',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Verkliga krafter': 'Virkelige krefter',
        'Resulterande kraft': 'Resultantkraft',
        'Hastighet': 'Hastighet',
        'Radie': 'Radius',
        'Situation': 'Situasjon',
        'Cirkelbana (ovanifrån)': 'Sirkelbane (ovenfra)',
        'Bilbana med kurvor (ovanifrån)': 'Bilbane med svinger (ovenfra)',
        'Loop (från sidan)': 'Loop (fra siden)',
        'Krön och dal (från sidan)': 'Bakketopp og dump (fra siden)',

        // Situationsväljaren
        'Cirkelbana': 'Sirkelbane',
        'bil ovanifrån': 'bil ovenfra',
        'Bilbana med kurvor': 'Bilbane med svinger',
        'Loop': 'Loop',
        'bil från sidan': 'bil fra siden',
        'Krön och dal': 'Bakketopp og dump',

        // Glidarna (etiketterna sätts som HTML, en nyckel per textnod)
        'Banhastighet (': 'Banehastighet (',
        'Banhastighet': 'Banehastighet',
        'Vinkelhastighet (': 'Vinkelfart (',
        'Massa (': 'Masse (',
        'Massa': 'Masse',
        'Banradie (': 'Baneradius (',
        'Vida kurvans radie (': 'Radius i den slake svingen (',
        'Snäva kurvans radie (': 'Radius i den krappe svingen (',
        'Friktionstal (': 'Friksjonstall (',
        'Friktionstal': 'Friksjonstall',
        'Fart (': 'Fart (',
        'Krönets radie (': 'Radius på bakketoppen (',
        'Dalens radie (': 'Radius i dumpen (',
        'Fart längst ned (': 'Fart nederst (',
        'Vida kurvan': 'Den slake svingen',
        'Snäva kurvan': 'Den krappe svingen',
        'Krönets radie': 'Radius på bakketoppen',
        'Dalens radie': 'Radius i dumpen',
        'Fart längst ned': 'Fart nederst',
        'Gränsfart': 'Grensefart',
        'Skriv in värde': 'Skriv inn verdi',

        // Noterna under glidarna
        'är kopplade:': 'er koblet sammen:',
        '. Ändras radien behåller bilen sin fart, så': '. Endres radien, beholder bilen farten sin, så',
        'ändras.': 'endres.',
        'Friktionen mellan däck och väg kan som mest ge': 'Friksjonen mellom dekk og vei kan høyst gi',
        '. Kräver en kurva mer än så fortsätter bilen rakt fram. Torr asfalt har':
            '. Krever en sving mer enn det, fortsetter bilen rett frem. Tørr asfalt har',
        '≈ 0,8, våt väg ≈ 0,5 och is ≈ 0,1. Markeringen på fartglidaren visar högsta fart i den snäva kurvan.':
            '≈ 0,8, våt vei ≈ 0,5 og is ≈ 0,1. Markeringen på glidebryteren for fart viser høyeste fart i den krappe svingen.',
        'Backarna lutar': 'Bakkene heller',
        '°, och bilen lättar redan där krönet börjar: √(': '°, og bilen letter allerede der bakketoppen begynner: √(',
        'm/s. Det är den farten markeringen på glidaren visar. I själva toppen går gränsen först vid √(':
            'm/s. Det er denne farten markeringen på glidebryteren viser. Helt øverst går grensen først ved √(',
        'Loopens radie är': 'Radien i loopen er',
        'm och bilens massa': 'm og massen til bilen',
        'kg. Gränsfarten längst ned är √(5 ·': 'kg. Grensefarten nederst er √(5 ·',
        'm/s, och markeringen på glidaren visar den.': 'm/s, og markeringen på glidebryteren viser den.',

        // Avläsning
        'Avläsning': 'Avlesning',
        'centripetalacc.': 'sentripetalaks.',
        'centripetalkraft': 'sentripetalkraft',
        'vinkelhastighet': 'vinkelfart',
        'omloppstid': 'omløpstid',
        'frekvens': 'frekvens',
        'banradie': 'baneradius',
        'som krävs i vida kurvan': 'som trengs i den slake svingen',
        'som krävs i snäva kurvan': 'som trengs i den krappe svingen',
        'största friktionskraft': 'største friksjonskraft',
        'centripetalacc. just nu': 'sentripetalaks. akkurat nå',
        'minsta radie greppet klarar': 'minste radius veigrepet klarer',
        'högsta fart i snäva kurvan √(': 'høyeste fart i den krappe svingen √(',
        'normalkraft just nu': 'normalkraft akkurat nå',
        'tyngdkraft': 'tyngdekraft',
        'lättar': 'letter',
        'på krönets topp': 'øverst på bakketoppen',
        'i dalens botten': 'nederst i dumpen',
        'gränsfart, bilen lättar där krönet börjar √(': 'grensefart, bilen letter der bakketoppen begynner √(',
        'gränsfart i krönets topp √(': 'grensefart øverst på bakketoppen √(',
        'fart just nu': 'fart akkurat nå',
        'i toppen': 'på toppen',
        'gränsfart längst ned': 'grensefart nederst',

        // Kraftinsikten
        'Vad utgör centripetalkraften?': 'Hva utgjør sentripetalkraften?',
        'Sedd ovanifrån är det': 'Sett ovenfra er det',
        'mellan däcken och vägbanan som pekar in mot centrum. Den är alltså inte en extra kraft — väljer du':
            'mellom dekkene og veibanen som peker inn mot sentrum. Den er altså ikke en ekstra kraft. Med valget',
        'ser du samma pil igen, nu i rollen som resultant:': 'ser du den samme pilen igjen, nå i rollen som resultant:',
        'Bara i kurvorna behövs en kraft': 'Bare i svingene trengs en kraft',
        'På rakorna behövs ingen kraft i sidled: bilen fortsätter rakt fram av sig själv (Newtons första lag). I kurvorna måste':
            'På rettstrekningene trengs ingen kraft sideveis: bilen fortsetter rett frem av seg selv (Newtons første lov). I svingene må',
        'böja banan,': 'bøye banen,',
        ', och ju snävare kurvan är, desto större kraft krävs vid samma fart. Räcker inte greppet,':
            ', og jo krappere svingen er, desto større kraft trengs ved samme fart. Strekker ikke veigrepet til,',
        ', fortsätter bilen tangentiellt ut ur kurvan. Massan spelar ingen roll: den förkortas bort.':
            ', fortsetter bilen tangentielt ut av svingen. Massen spiller ingen rolle: den forkortes bort.',
        'Lättare på krönet, tyngre i dalen': 'Lettere på bakketoppen, tyngre i dumpen',
        'På krönets topp pekar centrum nedåt, så': 'Øverst på bakketoppen ligger sentrum rett under bilen, så',
        '. Där blir normalkraften 0 vid √(': '. Der blir normalkraften 0 ved √(',
        'm/s. Men vägen lutar': 'm/s. Men veien heller',
        '° där krönet börjar, och då pekar bara komposanten': '° der bakketoppen begynner, og da peker bare komponenten',
        'mot centrum. Normalkraften är alltså minst just där, och bilen lättar redan vid':
            'mot sentrum. Normalkraften er altså minst akkurat der, og bilen letter allerede ved',
        'm/s. Det är krönets gränsfart, och den markeringen sitter på fartglidaren. I dalens botten pekar centrum uppåt:':
            'm/s. Det er grensefarten for bakketoppen, og det er den markeringen som sitter på glidebryteren for fart. Nederst i dumpen ligger sentrum rett over bilen:',
        ', så': ', så',
        'Gränsfarten i toppen': 'Grensefarten på toppen',
        'I toppen pekar både': 'På toppen peker både',
        'nedåt, mot centrum:': 'nedover, mot sentrum:',
        '. I gränsfallet är': '. I grensetilfellet er',
        'vilket ger farten √(': 'som gir farten √(',
        'm/s i toppen — och med energiprincipen √(5 ·': 'm/s på toppen, og med energiprinsippet √(5 ·',
        'm/s längst ned.': 'm/s nederst.',

        // Pedagogiska kort
        'Ingen egen kraft': 'Ingen egen kraft',
        'Centripetalkraften är en': 'Sentripetalkraften er en',
        'resultant': 'resultant',
        'av de krafter som verkar på kroppen — spännkraft i ett snöre, friktionskraft, normalkraft eller tyngdkraft. Rita aldrig in':
            'av de kreftene som virker på legemet: snordrag i en snor, friksjonskraft, normalkraft eller tyngdekraft. Tegn aldri inn',
        'som en extra pil bredvid de verkliga krafterna: den': 'som en ekstra pil ved siden av de virkelige kreftene: den',
        'är': 'er',
        'deras summa.': 'summen av dem.',
        'Konstant fart — ändå acceleration': 'Konstant fart, likevel akselerasjon',
        'Farten är konstant, men hastigheten är en vektor och byter riktning hela tiden. Kroppen accelererar därför ständigt in mot centrum med':
            'Farten er konstant, men hastigheten er en vektor og skifter retning hele tiden. Legemet akselererer derfor hele tiden inn mot sentrum med',
        '. Enligt Newtons första lag skulle kroppen annars fortsätta rakt fram, tangentiellt.':
            '. Ifølge Newtons første lov ville legemet ellers fortsatt rett frem, tangentielt.',
        'Normalkraften varierar i loopen': 'Normalkraften varierer i loopen',
        'Längst ned är farten störst och': 'Nederst er farten størst og',
        '— normalkraften är som störst. I toppen är farten minst och': '(da er normalkraften størst). På toppen er farten minst og',
        '. Blir den 0 har bilen nått gränsfarten; under den släpper bilen från banan.':
            '. Blir den 0, har bilen nådd grensefarten; under den mister bilen kontakten med banen.',
        'Krön, dal och kurvor på vägen': 'Bakketopper, dumper og svinger på veien',
        'Över ett krön är': 'Over en bakketopp er',
        ', så bilen känns lättare och lättar helt vid √(': ', så bilen føles lettere og letter helt ved √(',
        '). I en dal är': '). I en dump er',
        '. På bilbanan behövs ingen kraft alls på rakorna, och i kurvorna växer friktionskraften när radien minskar.':
            '. På bilbanen trengs ingen kraft i det hele tatt på rettstrekningene, og i svingene øker friksjonskraften når radien minker.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”Det finns en centrifugalkraft som drar utåt.”': '«Det finnes en sentrifugalkraft som drar utover.»',
        'Centrifugalkraften är en imaginär kraft — en upplevelse i det roterande systemet. Sett utifrån vill kroppen bara fortsätta rakt fram (tröghet, Newtons första lag); det som känns som en kraft utåt är att banan kröker in under dig.':
            'Sentrifugalkraften er en fiktiv kraft, en opplevelse i det roterende systemet. Sett utenfra vil legemet bare fortsette rett frem (treghet, Newtons første lov); det som føles som en kraft utover, er at banen krummer seg innover under deg.',
        '”Konstant fart betyder ingen acceleration.”': '«Konstant fart betyr ingen akselerasjon.»',
        'Nej — acceleration är hastighetens': 'Nei. Akselerasjon er hastighetens',
        'ändring': 'endring',
        ', och riktningen ändras hela tiden i en cirkelbana. Därför krävs en resulterande kraft trots att farten är konstant.':
            ', og retningen endres hele tiden i en sirkelbane. Derfor trengs en resultantkraft selv om farten er konstant.',
        '”Centripetalkraften är en extra kraft i kraftfiguren.”': '«Sentripetalkraften er en ekstra kraft i kraftdiagrammet.»',
        'Nej — den är summan av de verkliga krafterna. I loopens topp gäller': 'Nei. Den er summen av de virkelige kreftene. På toppen av loopen gjelder',
        ', i botten': ', i bunnen',
        '”Om något slungas ut ur en cirkelbana åker det rakt ut från centrum.”': '«Hvis noe slynges ut av en sirkelbane, flyr det rett ut fra sentrum.»',
        'Nej — det fortsätter': 'Nei. Det fortsetter',
        'tangentiellt': 'tangentielt',
        ', i den riktning hastigheten hade i släppögonblicket. Precis som bilen som släpper i loopen: den fortsätter i sin tangentriktning och faller sedan som en projektil.':
            ', i den retningen hastigheten hadde i det øyeblikket det ble sluppet løs. Akkurat som bilen som mister kontakten i loopen: den fortsetter i tangentretningen sin og faller deretter som et prosjektil.',
        '”En tung bil klarar kurvan sämre än en lätt.”': '«En tung bil klarer svingen dårligere enn en lett.»',
        'Nej. Kraften som krävs,': 'Nei. Kraften som trengs,',
        ', och den största friktionskraften,': ', og den største friksjonskraften,',
        ', växer båda med massan, som förkortas bort. Farten och radien avgör, inte massan.':
            ', øker begge med massen, som forkortes bort. Farten og radien avgjør, ikke massen.'
    });
})();
