// Fysiklabbet: Kursprov Fysik 1, våren 2017, delprov A (teoriuppgifter).
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Delprov B (laborativ uppgift) ingår inte här.
//
// Källa: Skolverket/Umeå universitet, kursprov Fysik 1 VT 2017. Provet
// återanvändes till och med 2025-06-30 och är numera frisläppt.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['fy1-vt2017'] = {
    id: 'fy1-vt2017',
    kurs: 'Fysik nivå 1',
    termin: 'VT 2017',
    namn: 'Kursprov Fysik 1, våren 2017',
    kort: 'Kursprov Fy 1 VT2017',
    intro: 'Det här är kursprovet i Fysik 1 från våren 2017 (Skolverket/Umeå universitet). ' +
        'Här finns delprov A (teoriuppgifter). Delprov B är en laborativ uppgift och ingår ' +
        'inte här. Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg ' +
        'i taget. Varje steg förklarar både vad som görs och varför, och figurerna byggs upp ' +
        'i takt med lösningen.',
    kravgranser: 'Provet (delprov A och B) ger totalt 60 poäng varav 21 E-, 20 C- och 19 A-poäng. ' +
        'Poängen skrivs (E/C/A). Gräns för provbetyget: E minst 13 poäng · ' +
        'D minst 21 poäng varav 6 på minst C-nivå · C minst 28 poäng varav 11 på minst C-nivå · ' +
        'B minst 36 poäng varav 5 på A-nivå · A minst 43 poäng varav 9 på A-nivå.',
    delprov: {
        A: {
            tid: '240 minuter',
            hjalpmedel: 'Linjal, formelsamling och digitala hjälpmedel (även dator utan tillgång till kommunikation)',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Uppgift 1–7 kräver endast ett kort svar eller en kortare redovisning. ' +
                'Uppgift 8–21 kräver fullständiga redovisningar med beräkningar, motiveringar och figurer.',
        },
    },
    // Uppgifterna läggs in nedan i tre block (uppgift 1–10, 11–16, 17–21).
    uppgifter: [],
};

// Fysiklabbet: Kursprov Fysik 1 VT 2017, delprov A, uppgift 1–10 (del 1 av 3).
// Pushar uppgiftsobjekten in i skelettet data/np/fy1-vt2017.js. Figurerna
// genereras av .claude/np-figs/gen-fy1-vt2017-1.js → data/np/fy1-vt2017-figurer-1.js
// och pennlösningarna ligger i data/np/fy1-vt2017-del1-penna.js.
//
// Format och regler: data/np/RIKTLINJER.md (referens: data/np/fy2-vt2016.js).
// Bedömningen följer provets bedömningsanvisningar (Kursprovsuppgifter/Fysik 1/
// Frisläppta/04 Kursprov Fysik 1 våren 2017/Fy1 vt17 A Bedömningsanvisningar.pdf).
(function () {
    var P = window.NP_PROV && window.NP_PROV['fy1-vt2017'];
    if (!P) return;

    // ================= UPPGIFT 1 =================
    P.uppgifter.push({
        nr: 1, del: 'A', poang: [1, 0, 0], omrade: 'Tryck: storheter och enheter',
        genomgangar: ['fy1-5.2', 'fy1-1.2'],
        endastSvar: true,
        fraga: 'Ewa arbetar med en fysikuppgift som bland annat innehåller bilden nedan.\n\n' +
            'Ewa utför följande beräkning i sitt skrivblock:\n\n' +
            '$$\\frac{80 \\cdot 9{,}82}{\\pi \\cdot 0{,}25^2} \\approx 4000$$\n\n' +
            'Vilken **enhet** ska Ewas svar ha?',
        figur: 'u1',
        steg: [
            {
                rubrik: 'Tolka täljaren',
                varfor: 'För att veta vilken enhet svaret ska ha måste vi först förstå vad Ewa räknar ut. ' +
                    'Talet $80$ är cylinderns massa i kilogram och $9{,}82$ är tyngdfaktorn $g$ i N/kg. ' +
                    'Produkten av massa och tyngdfaktor är tyngdkraften.',
                text: '$$F_G = m \\cdot g = 80\\ \\mathrm{kg} \\cdot 9{,}82\\ \\mathrm{N/kg} = 785{,}6\\ \\mathrm{N}$$\n\n' +
                    'Täljaren är alltså en **kraft** med enheten newton (N).',
                figur: 'u1-s1',
            },
            {
                rubrik: 'Tolka nämnaren',
                varfor: 'Diametern är $50\\ \\mathrm{cm}$, så radien är $25\\ \\mathrm{cm} = 0{,}25\\ \\mathrm{m}$. ' +
                    'Uttrycket $\\pi \\cdot r^2$ är arean av en cirkel, här cylinderns bottenyta som vilar mot plattan.',
                text: '$$A = \\pi \\cdot r^2 = \\pi \\cdot (0{,}25\\ \\mathrm{m})^2 \\approx 0{,}196\\ \\mathrm{m^2}$$\n\n' +
                    'Nämnaren är alltså en **area** med enheten kvadratmeter ($\\mathrm{m^2}$).',
                figur: 'u1-s2',
            },
            {
                rubrik: 'Känn igen sambandet',
                varfor: 'En kraft delad med den area den fördelas på är tryck. Enheten blir newton per ' +
                    'kvadratmeter, som har ett eget namn: pascal.',
                text: '$$p = \\dfrac{F}{A} \\qquad \\left[ \\dfrac{\\mathrm{N}}{\\mathrm{m^2}} \\right] = [\\mathrm{Pa}]$$\n\n' +
                    'Ewa räknar ut trycket som cylindern utövar på plattan, cirka $4\\,000\\ \\mathrm{Pa}$.',
            },
        ],
        svar: 'Pa (pascal), det vill säga $\\mathrm{N/m^2}$.',
        bedomning: [
            ['Korrekt svar (Pa eller $\\mathrm{N/m^2}$)', '+E'],
        ],
    });

    // ================= UPPGIFT 2 =================
    P.uppgifter.push({
        nr: 2, del: 'A', poang: [1, 0, 0], omrade: 'Ellära: kopplingsscheman och mätinstrument',
        genomgangar: ['fy1-7.6', 'fy1-7.9'],
        endastSvar: true,
        fraga: 'En leksaksbil har en motor med resistansen $R$ och drivs av en solcell.\n\n' +
            'Vilken av kretsarna A–E är korrekt för att mäta den spänning och ström som krävs för att ' +
            'beräkna solcellens effekt?',
        figur: 'u2',
        steg: [
            {
                rubrik: 'Bestäm vad som ska mätas',
                varfor: 'Effekten är spänningen gånger strömmen. Vi behöver alltså mäta spänningen över ' +
                    'solcellen och strömmen som solcellen driver genom motorn.',
                text: '$$P = U \\cdot I$$',
            },
            {
                rubrik: 'Placera voltmetern och amperemetern',
                varfor: 'En voltmeter mäter spänningen mellan två punkter och ska därför kopplas ' +
                    '**parallellt** över det den mäter på. Den har mycket stor resistans, så nästan ingen ' +
                    'ström går genom den. En amperemeter mäter strömmen som går **genom** den och ska ' +
                    'kopplas **i serie**. Den har mycket liten resistans.',
                text: 'Voltmetern ska sitta parallellt med solcellen och amperemetern i serie med motorn. ' +
                    'Så är krets **A** kopplad: voltmetern ligger i en egen gren parallellt med solcellen, ' +
                    'och amperemetern sitter i samma gren som motorn.',
                figur: 'u2-s1',
            },
            {
                rubrik: 'Uteslut de andra kretsarna',
                varfor: 'Det räcker inte att hitta en krets som verkar rätt. Vi kontrollerar också att de ' +
                    'andra verkligen är fel.',
                text: '**B** och **E:** amperemetern sitter parallellt med solcellen. Den har nästan ingen ' +
                    'resistans och kortsluter solcellen.\n\n' +
                    '**C:** amperemetern och voltmetern sitter i serie i en gren parallellt med solcellen. ' +
                    'Amperemetern mäter då inte strömmen genom motorn.\n\n' +
                    '**D:** voltmetern sitter i serie med motorn. Dess stora resistans stoppar nästan all ' +
                    'ström, och motorn går inte.',
            },
        ],
        svar: 'Krets **A**.',
        bedomning: [
            ['Korrekt svar (A)', '+E'],
        ],
    });

    // ================= UPPGIFT 3 =================
    P.uppgifter.push({
        nr: 3, del: 'A', poang: [1, 0, 0], omrade: 'Storheter: mätningar på en väderstation',
        genomgangar: ['fy1-1.2', 'fy1-5.4'],
        endastSvar: true,
        fraga: 'SMHI samlar in data som ligger till grund för väderprognoser. Datainsamlingen görs på ' +
            'väderstationer som är placerade runt om i landet. Tidigare samlades informationen in ' +
            'manuellt av väderobservatörer, men sedan mitten av 1990-talet har utvecklingen gått mer ' +
            'och mer mot automatiserade väderstationer.\n\n' +
            'På väderstationerna mäts temperaturen vid olika tillfällen. Nämn ytterligare tre ' +
            'storheter som mäts vid dessa stationer.',
        figur: null,
        steg: [
            {
                rubrik: 'Tänk på vad en väderprognos beskriver',
                varfor: 'En storhet är något som kan mätas och anges med ett mätetal och en enhet. ' +
                    'En väderprognos säger hur varmt det blir, om det blåser, om det regnar och om ' +
                    'lufttrycket stiger eller sjunker. Allt det måste mätas.',
                text: 'Storheter som mäts på en väderstation (förutom temperaturen):\n\n' +
                    '- **lufttryck** (hPa), mäts med barometer\n' +
                    '- **vindhastighet** (m/s), mäts med anemometer\n' +
                    '- **vindriktning**, visas av en vindflöjel\n' +
                    '- **luftfuktighet** (%), mäts med hygrometer\n' +
                    '- **nederbörd**, mängden regn eller snö (mm)\n' +
                    '- **molnhöjd** (m), mäts med molnhöjdsmätare\n\n' +
                    'Vindhastighet och vindriktning är två olika storheter. Bara ”vind” räknas som en.',
            },
        ],
        svar: 'Tre av följande: nederbörd, luftfuktighet, lufttryck, vindhastighet, vindriktning och molnhöjd.',
        bedomning: [
            ['Tre korrekta svar av följande: nederbörd, luftfuktighet, lufttryck, vindhastighet, vindriktning och molnhöjd', '+E'],
            ['Kommentar: Svaret vind räknas som ett svar, medan vindriktning och vindhastighet är två svar. Regn räknas som nederbörd.', ''],
        ],
    });

    // ================= UPPGIFT 4 =================
    P.uppgifter.push({
        nr: 4, del: 'A', poang: [3, 0, 0], omrade: 'Kärnfysik: reaktionsformel och halveringstid',
        genomgangar: ['fy1-9.1', 'fy1-9.3', 'fy1-9.4'],
        endastSvar: true,
        fraga: 'När nya grundämnen ska framställas låter forskare atomkärnor kollidera med varandra för ' +
            'att de ska fusionera och bilda ett nytt tyngre grundämne. Forskare vid ett laboratorium i ' +
            'Lund lät Am-243 kollidera med Ca-48. Vid en sådan kollision bildades ett nytt grundämne och ' +
            'tre neutroner.\n\n' +
            '**a)** Det nya grundämnet kallas Ununpentium (Uup). Skriv reaktionsformeln för fusionen. ' +
            'Atomnummer och masstal för Uup-isotopen ska ingå i reaktionsformeln.\n\n' +
            '**b)** Det nya grundämnet har halveringstiden $0{,}16\\ \\mathrm{s}$. Förklara begreppet halveringstid.',
        figur: null,
        steg: [
            {
                del: 'a',
                rubrik: 'Skriv kärnorna som reagerar',
                varfor: 'I en nuklidbeteckning står masstalet $A$ (antalet nukleoner) uppe till vänster ' +
                    'och atomnumret $Z$ (antalet protoner) nere till vänster. Masstalen står i ' +
                    'uppgiften (Am-243, Ca-48), och atomnumren hämtas ur periodiska systemet: ' +
                    'americium har $Z = 95$ och kalcium $Z = 20$. En neutron har masstalet $1$ och ' +
                    'atomnumret $0$.',
                text: '$${}^{243}_{95}\\mathrm{Am} + {}^{48}_{20}\\mathrm{Ca} \\rightarrow {}^{A}_{Z}\\mathrm{Uup} + 3\\,{}^{1}_{0}\\mathrm{n}$$',
            },
            {
                del: 'a',
                rubrik: 'Bevara masstal och atomnummer',
                varfor: 'Vid en kärnreaktion bevaras både antalet nukleoner och laddningen. Summan av ' +
                    'masstalen och summan av atomnumren måste därför vara lika stora före och efter ' +
                    'reaktionen. De tre neutronerna bär tillsammans masstalet $3$ men ingen laddning.',
                text: 'Masstal:\n\n' +
                    '$$243 + 48 = A + 3 \\cdot 1$$\n\n' +
                    '$$291 = A + 3$$\n\n' +
                    '$$A = 291 - 3 = 288$$\n\n' +
                    'Atomnummer:\n\n' +
                    '$$95 + 20 = Z + 3 \\cdot 0$$\n\n' +
                    '$$115 = Z + 0$$\n\n' +
                    '$$Z = 115$$\n\n' +
                    'Reaktionsformeln:\n\n' +
                    '$${}^{243}_{95}\\mathrm{Am} + {}^{48}_{20}\\mathrm{Ca} \\rightarrow {}^{288}_{115}\\mathrm{Uup} + 3\\,{}^{1}_{0}\\mathrm{n}$$',
                delsvar: { del: 'a', text: '${}^{243}_{95}\\mathrm{Am} + {}^{48}_{20}\\mathrm{Ca} \\rightarrow ' +
                    '{}^{288}_{115}\\mathrm{Uup} + 3\\,{}^{1}_{0}\\mathrm{n}$ (ämnet har sedan 2016 det ' +
                    'officiella namnet moskovium, Mc).' },
            },
            {
                del: 'b',
                rubrik: 'Förklara halveringstiden',
                varfor: 'Radioaktiva kärnor sönderfaller slumpvis. Man kan aldrig säga när en enskild ' +
                    'kärna sönderfaller, men för väldigt många kärnor går det att säga hur lång tid det ' +
                    'tar innan hälften har sönderfallit.',
                text: 'Halveringstiden är den tid det tar för **hälften** av de radioaktiva atomkärnorna i ' +
                    'ett prov att sönderfalla. Efter $0{,}16\\ \\mathrm{s}$ finns hälften av Uup-kärnorna ' +
                    'kvar, efter $0{,}32\\ \\mathrm{s}$ en fjärdedel och så vidare.',
                delsvar: { del: 'b', text: 'Halveringstiden är den tid det tar för hälften av de ' +
                    'radioaktiva kärnorna att sönderfalla.' },
            },
        ],
        svar: 'a) ${}^{243}_{95}\\mathrm{Am} + {}^{48}_{20}\\mathrm{Ca} \\rightarrow {}^{288}_{115}\\mathrm{Uup} + 3\\,{}^{1}_{0}\\mathrm{n}$ ' +
            'b) Halveringstiden är den tid det tar för hälften av de radioaktiva kärnorna att sönderfalla.',
        bedomning: [
            ['a) Korrekt masstal ($288$) eller korrekt atomnummer ($115$)', '+E'],
            ['med korrekt reaktionsformel', '+E'],
            ['b) Godtagbar förklaring, till exempel ”Hälften av atomerna av Uup-288 kommer att sönderfalla på $0{,}16\\ \\mathrm{s}$.”', '+E'],
        ],
    });

    // ================= UPPGIFT 5 =================
    P.uppgifter.push({
        nr: 5, del: 'A', poang: [2, 0, 0], omrade: 'Relativitetsteori: ljushastigheten och tidsdilatation',
        genomgangar: ['fy1-8.1'],
        endastSvar: true,
        fraga: 'I ett framtidsscenario planeras en resa där en astronaut färdas i ett rymdskepp mot en ' +
            'avlägsen stjärna. Rymdskeppet har motorer som gör att det åker mycket snabbt, nära ' +
            'ljushastigheten.\n\n' +
            '**a)** Vilken hastighet mäter astronauten på det inkommande ljuset från stjärnan under resan?\n\n' +
            '**b)** En observatör på jorden har räknat ut att det borde ta en livstid på jorden för ' +
            'rymdskeppet att nå sitt mål. Därför borde astronauten inte leva när hon kommer fram. Har ' +
            'observatören rätt? Motivera ditt svar.',
        figur: 'u5',
        steg: [
            {
                del: 'a',
                rubrik: 'Använd att ljushastigheten är konstant',
                varfor: 'Man kunde tro att astronauten, som rör sig mot ljuset, ska mäta ljusets fart ' +
                    'plus sin egen fart. Men en av grundpelarna i relativitetsteorin är att ljusets ' +
                    'hastighet i vakuum är densamma för alla observatörer, oavsett hur de rör sig.',
                text: 'Astronauten mäter samma ljushastighet som alla andra:\n\n' +
                    '$$c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}$$',
                figur: 'u5-s1',
                delsvar: { del: 'a', text: 'Ljusets hastighet, $c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}$.' },
            },
            {
                del: 'b',
                rubrik: 'Använd tidsdilatationen',
                varfor: 'När ett rymdskepp rör sig nära ljushastigheten går tiden ombord långsammare sett ' +
                    'från jorden. Astronautens klockor, hjärtslag och åldrande följer tiden ombord, ' +
                    'egentiden $t_0$, inte jordens tid $t$.',
                text: '$$t = \\dfrac{t_0}{\\sqrt{1 - \\dfrac{v^2}{c^2}}}$$\n\n' +
                    'När $v$ är nära $c$ är nämnaren nära $0$, så $t$ blir mycket större än $t_0$. En ' +
                    'livstid på jorden kan alltså motsvara bara några år ombord.',
                delsvar: { del: 'b', text: 'Nej. På grund av tidsdilatationen går tiden ombord ' +
                    'långsammare än på jorden. Astronauten åldras bara egentiden $t_0$, som är mycket ' +
                    'kortare än jordens livstid, och hon kan leva när hon kommer fram.' },
            },
        ],
        svar: 'a) $c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}$ ' +
            'b) Nej. Tiden ombord går långsammare (tidsdilatation), så astronauten åldras mycket mindre än en livstid på jorden.',
        bedomning: [
            ['a) Korrekt svar ($3{,}0 \\cdot 10^8\\ \\mathrm{m/s}$ eller $c$)', '+E'],
            ['b) Korrekt svar med godtagbar motivering (observatören har fel)', '+E'],
            ['Kommentar: Även en förklaring med längdkontraktion godtas. En motivering som bara indirekt hänvisar till tidsdilatation, att tiden går långsammare, räcker nätt och jämnt för poängen.', ''],
        ],
    });

    // ================= UPPGIFT 6 =================
    P.uppgifter.push({
        nr: 6, del: 'A', poang: [0, 1, 0], omrade: 'Krafter och rörelse: acceleration vid vertikalt kast',
        genomgangar: ['fy1-3.2', 'fy1-2.4'],
        endastSvar: true,
        fraga: 'En boll sköts rakt upp med hjälp av en fjäder. Figuren visar bollens läge vid olika ' +
            'tidpunkter. Fjädern var ursprungligen sammanpressad så att bollen befann sig vid X. ' +
            'Bollen lämnade fjädern vid Y och nådde sin högsta punkt vid Z. Luftmotståndet försummas.\n\n' +
            'Vilket av påståendena A–F är korrekt?\n\n' +
            'A. Bollens acceleration var störst just innan den nådde Y och bollen fortfarande var i ' +
            'kontakt med fjädern.<br>' +
            'B. Bollens acceleration minskade på dess väg från Y till Z.<br>' +
            'C. Bollens acceleration var noll i Z.<br>' +
            'D. Bollens acceleration var noll i Y.<br>' +
            'E. Bollens acceleration var densamma mellan Y och Z.<br>' +
            'F. Bollens acceleration var densamma mellan X och Y.',
        figur: 'u6',
        steg: [
            {
                rubrik: 'Rita krafterna mellan Y och Z',
                varfor: 'Accelerationen bestäms av den resulterande kraften (Newtons andra lag, ' +
                    '$F_R = m \\cdot a$). När bollen har lämnat fjädern och luftmotståndet försummas ' +
                    'verkar bara tyngdkraften på den.',
                text: 'Mellan Y och Z är $F_R = F_G = m \\cdot g$, så\n\n' +
                    '$$a = \\dfrac{F_R}{m} = \\dfrac{m \\cdot g}{m} = g$$\n\n' +
                    'Accelerationen är $g$, riktad nedåt, hela vägen från Y till Z, även i Z där farten ' +
                    'är noll. Därmed är **E** korrekt, och **B** och **C** är fel.',
                figur: 'u6-s1',
            },
            {
                rubrik: 'Rita krafterna mellan X och Y',
                varfor: 'Medan bollen är i kontakt med fjädern trycker fjädern uppåt. Fjäderkraften är ' +
                    'störst när fjädern är mest sammanpressad, alltså vid X, och avtar till noll när ' +
                    'fjädern har sin naturliga längd vid Y.',
                text: 'Vid X är fjäderkraften mycket större än tyngdkraften, och accelerationen är stor ' +
                    'och riktad uppåt. Den resulterande kraften ändras hela vägen upp till Y, så ' +
                    'accelerationen är inte densamma mellan X och Y (**F** är fel).\n\n' +
                    'Just innan Y är fjäderkraften nästan noll. Accelerationen är där inte störst, utan ' +
                    'nästan $g$ nedåt (**A** är fel). I Y verkar bara tyngdkraften, så accelerationen ' +
                    'är $g$ och inte noll (**D** är fel).\n\n' +
                    'I figuren är fjäderkraften bara ritad klart större än $F_G$, inte i skala, ' +
                    'eftersom dess belopp är okänt.',
                figur: 'u6-s2',
            },
        ],
        svar: '**E.** Bollens acceleration var densamma ($g$, riktad nedåt) mellan Y och Z.',
        bedomning: [
            ['Korrekt svar (E)', '+C'],
        ],
    });

    // ================= UPPGIFT 7 =================
    P.uppgifter.push({
        nr: 7, del: 'A', poang: [0, 1, 0], omrade: 'Ellära: resistans och Ohms lag',
        genomgangar: ['fy1-7.5'],
        endastSvar: true,
        fraga: 'Bilden visar ett diagram där fem olika mätningar av spänning och ström är markerade. ' +
            'Mätningarna är gjorda på fyra olika resistorer. Resistanserna antas vara oberoende av ' +
            'temperaturen.\n\n' +
            'Vilka två av mätningarna a–e är gjorda på samma resistor?',
        figur: 'u7',
        steg: [
            {
                rubrik: 'Ställ upp sambandet för resistansen',
                varfor: 'Resistansen är kvoten mellan spänningen och strömmen. Två mätningar på samma ' +
                    'resistor ger därför samma kvot, även om spänningen och strömmen är olika.',
                text: '$$U = R \\cdot I \\quad \\Leftrightarrow \\quad R = \\dfrac{U}{I}$$',
            },
            {
                rubrik: 'Dra linjer genom origo',
                varfor: 'För en resistor med konstant resistans ligger alla mätpunkter på en rät linje ' +
                    'genom origo, $U = R \\cdot I$. Linjens lutning är resistansen. Två punkter på samma ' +
                    'linje genom origo har alltså samma resistans.',
                text: 'Linjen från origo genom **a** går också genom **e**: när strömmen blir cirka ' +
                    '$2{,}2$ gånger så stor blir spänningen också cirka $2{,}2$ gånger så stor. Alla ' +
                    'andra punkter ligger på linjer med andra lutningar.',
                figur: 'u7-s1',
            },
        ],
        svar: 'Mätningarna **a** och **e**.',
        bedomning: [
            ['Korrekt svar (a och e)', '+C'],
        ],
    });

    // ================= UPPGIFT 8 =================
    P.uppgifter.push({
        nr: 8, del: 'A', poang: [2, 0, 0], omrade: 'Rörelse: sträcka ur ett v-t-diagram',
        genomgangar: ['fy1-2.5', 'fy1-2.7'],
        fraga: 'Figuren visar *v-t*-grafen för Alexander som cyklar.\n\n' +
            'Bestäm hur långt Alexander hinner under de fem första sekunderna.',
        figur: 'u8',
        steg: [
            {
                rubrik: 'Använd arean under grafen',
                varfor: 'I ett *v-t*-diagram motsvarar arean mellan grafen och tidsaxeln sträckan. ' +
                    'Det gäller även när farten ändras: arean summerar alla små bitar fart gånger tid.',
                text: 'Sträckan under de fem första sekunderna är arean under grafen från ' +
                    '$t = 0$ till $t = 5\\ \\mathrm{s}$.',
                figur: 'u8-s1',
            },
            {
                rubrik: 'Läs av hastigheterna',
                varfor: 'Ytan är ett parallelltrapets med de lodräta sidorna $v(0)$ och $v(5)$. Grafen ' +
                    'stiger från $2\\ \\mathrm{m/s}$ till $8\\ \\mathrm{m/s}$ på $6\\ \\mathrm{s}$, alltså ' +
                    '$1\\ \\mathrm{m/s}$ varje sekund. Vid $t = 5\\ \\mathrm{s}$ är farten därför ' +
                    '$2 + 5 = 7\\ \\mathrm{m/s}$, mitt emellan stödlinjerna $6$ och $8$.',
                text: '$$v(0) = 2\\ \\mathrm{m/s} \\qquad v(5) = 7\\ \\mathrm{m/s}$$',
                figur: 'u8-s2',
            },
            {
                rubrik: 'Beräkna arean',
                varfor: 'Arean av ett parallelltrapets är medelvärdet av de parallella sidorna gånger ' +
                    'avståndet mellan dem. Här är det samma sak som medelhastigheten gånger tiden.',
                text: 'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'v_0 = 2\\ \\mathrm{m/s} \\\\ ' +
                    'v = 7\\ \\mathrm{m/s} \\\\ ' +
                    't = 5\\ \\mathrm{s} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$s = \\dfrac{v_0 + v}{2} \\cdot t = \\dfrac{2 + 7}{2} \\cdot 5\\ \\mathrm{m} = 22{,}5\\ \\mathrm{m}$$',
            },
            {
                rubrik: 'Avrunda och bedöm rimligheten',
                varfor: 'Värdena är avlästa ur en graf, så svaret anges med två värdesiffror. ' +
                    'Samma area fås som en rektangel ($5 \\cdot 2$) plus en triangel ' +
                    '($\\dfrac{5 \\cdot 5}{2}$): $10 + 12{,}5 = 22{,}5$. Rimlighet: medelfarten är ' +
                    '$4{,}5\\ \\mathrm{m/s}$, ungefär $16\\ \\mathrm{km/h}$, en vanlig cykelfart.',
                text: '$$s = 22{,}5\\ \\mathrm{m} \\approx 23\\ \\mathrm{m}$$',
            },
        ],
        svar: 'Alexander hinner cirka $23\\ \\mathrm{m}$.',
        bedomning: [
            ['Godtagbar ansats, till exempel beräknar triangelarean', '+E'],
            ['med i övrigt godtagbar lösning och svar ($23\\ \\mathrm{m}$)', '+E'],
        ],
    });

    // ================= UPPGIFT 9 =================
    P.uppgifter.push({
        nr: 9, del: 'A', poang: [2, 0, 0], omrade: 'Experimentell metod: densitet',
        genomgangar: ['fy1-5.1'],
        fraga: 'Du ska planera ett experiment där du ska ta reda på vad det kan vara för metall som en ' +
            'liten oregelbunden metallklump består av genom att bestämma dess densitet. Din planering ska ' +
            'vara så tydlig att någon annan kan använda den för att genomföra experimentet.\n\n' +
            '**Förutsättningar**\n\n' +
            'Du har tillgång till en oregelbunden metallklump, våg, mätglas, vatten och formelsamling.\n\n' +
            '**Planering**\n\n' +
            'Din planering ska innehålla:\n\n' +
            '- en kortfattad beskrivning av hur försöket ska genomföras,\n' +
            '- de mätningar som behöver utföras,\n' +
            '- de samband som behövs för att bestämma vilken metallen är.',
        figur: null,
        steg: [
            {
                rubrik: 'Mät massan',
                varfor: 'Densiteten är massan per volymenhet. Vi behöver alltså både massan och volymen. ' +
                    'Massan är enkel: klumpen läggs på vågen.',
                text: 'Väg metallklumpen på vågen. Det ger massan $m$.',
            },
            {
                rubrik: 'Mät volymen med vattenförträngning',
                varfor: 'Klumpen är oregelbunden, så volymen kan inte räknas ut med en formel för en ' +
                    'kropp. Men när klumpen sänks ned i vatten tränger den undan lika mycket vatten som ' +
                    'sin egen volym, och vattenytan stiger lika mycket.',
                text: 'Fyll mätglaset delvis med vatten och läs av volymen $V_1$. Sänk försiktigt ned ' +
                    'klumpen så att den hamnar helt under vattenytan, och läs av den nya volymen $V_2$. ' +
                    'Klumpens volym är skillnaden:\n\n' +
                    '$$V = V_2 - V_1$$',
                figur: 'u9-s1',
            },
            {
                rubrik: 'Beräkna densiteten och jämför med tabellen',
                varfor: 'Med massan och volymen ger definitionen av densitet ett värde som kan jämföras ' +
                    'med tabellvärdena i formelsamlingen. Varje metall har sin egen densitet.',
                text: '$$\\rho = \\dfrac{m}{V} = \\dfrac{m}{V_2 - V_1}$$\n\n' +
                    'Räkna om till samma enheter som i tabellen (till exempel $\\mathrm{g/cm^3}$ eller ' +
                    '$\\mathrm{kg/m^3}$, $1\\ \\mathrm{ml} = 1\\ \\mathrm{cm^3}$) och välj den metall vars ' +
                    'densitet ligger närmast det uppmätta värdet. Upprepa gärna mätningarna och använd ' +
                    'medelvärdet.',
            },
        ],
        svar: 'Väg klumpen ($m$). Läs av vattenvolymen i mätglaset före ($V_1$) och efter ($V_2$) att ' +
            'klumpen sänkts ned helt, så att $V = V_2 - V_1$. Beräkna $\\rho = \\dfrac{m}{V_2 - V_1}$ och ' +
            'jämför med densiteterna i formelsamlingen.',
        bedomning: [
            ['Godtagbar beskrivning av hur försöket ska genomföras, där det framgår att massa och volym ska bestämmas och att metallklumpens volym är skillnaden mellan volymavläsningarna', '+E'],
            ['Godtagbar beskrivning av hur densiteten ska beräknas och att beräknad densitet jämförs med tabellvärden för att kunna bestämma vilken metallen är', '+E'],
            ['Kommentar (elevlösning 9.1): Det framgår inte tydligt att skillnaden i volymavläsningarna motsvarar metallklumpens volym, men lösningen uppfyller ändå kraven för den första poängen. Eftersom jämförelse med tabellvärde saknas helt ges inte den andra poängen.', ''],
            ['Kommentar (elevlösning 9.2): Det framgår inte hur volymen ska avläsas, däremot hur den beräknade densiteten ska användas för att avgöra vilken metall det är. Lösningen ges den andra poängen men inte den första.', ''],
        ],
    });

    // ================= UPPGIFT 10 =================
    P.uppgifter.push({
        nr: 10, del: 'A', poang: [1, 1, 0], omrade: 'Energi: lägesenergi och verkningsgrad',
        genomgangar: ['fy1-4.2', 'fy1-4.6', 'fy1-4.5'],
        fraga: 'Hur mycket elektrisk energi kan utvinnas i ett vattenkraftverk när $100\\ \\mathrm{m^3}$ ' +
            'vatten faller $30\\ \\mathrm{m}$ om verkningsgraden är $90\\ \\%$? Svara i kWh.',
        figur: null,
        steg: [
            {
                rubrik: 'Ställ upp energin som utvinns',
                varfor: 'Vattnets lägesenergi är den energi som tillförs kraftverket. Verkningsgraden ' +
                    'talar om hur stor del av den som blir elektrisk energi: ' +
                    '$\\eta = \\dfrac{E_n}{E_t}$ ger $E_n = \\eta \\cdot E_t$, med $E_t = m \\cdot g \\cdot h$.',
                text: '$$E_n = \\eta \\cdot m \\cdot g \\cdot h$$',
            },
            {
                rubrik: 'Sätt in värdena',
                varfor: 'Massan är inte given, men volymen är det. Med vattnets densitet ur ' +
                    'tabellen räknas massan ut i klammern med $m = \\rho \\cdot V$. Alla värden är i ' +
                    'SI-enheter, så energin kommer ut i joule.',
                text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    '\\eta = 90\\ \\% = 0{,}90 \\\\ ' +
                    '\\rho \\approx 1{,}00 \\cdot 10^3\\ \\mathrm{kg/m^3}\\ \\text{(vattnets densitet)} \\\\ ' +
                    'V = 100\\ \\mathrm{m^3} \\\\ ' +
                    'm = \\rho \\cdot V = 1{,}00 \\cdot 10^3 \\cdot 100\\ \\mathrm{kg} = 1{,}00 \\cdot 10^5\\ \\mathrm{kg} \\\\ ' +
                    'g \\approx 9{,}82\\ \\mathrm{N/kg} \\\\ ' +
                    'h = 30\\ \\mathrm{m} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$E_n = 0{,}90 \\cdot 1{,}00 \\cdot 10^5 \\cdot 9{,}82 \\cdot 30\\ \\mathrm{J} = 26\\,514\\,000\\ \\mathrm{J}$$',
            },
            {
                rubrik: 'Omvandla till kWh',
                varfor: 'En kilowattimme är en effekt på $1\\,000\\ \\mathrm{W}$ under $3\\,600\\ \\mathrm{s}$, ' +
                    'alltså $1\\ \\mathrm{kWh} = 3{,}6 \\cdot 10^6\\ \\mathrm{J}$. Vi delar därför antalet ' +
                    'joule med $3{,}6 \\cdot 10^6$.',
                text: '$$E_n = \\dfrac{26\\,514\\,000}{3{,}6 \\cdot 10^6}\\ \\mathrm{kWh} = 7{,}365\\ \\mathrm{kWh} \\approx 7{,}4\\ \\mathrm{kWh}$$',
            },
            {
                rubrik: 'Avrunda och bedöm rimligheten',
                varfor: 'Fallhöjden $30\\ \\mathrm{m}$ och verkningsgraden $90\\ \\%$ har två värdesiffror, ' +
                    'så svaret avrundas till två. Rimlighet: en diskning tar cirka $1\\ \\mathrm{kWh}$, ' +
                    'så $7{,}4\\ \\mathrm{kWh}$ räcker till ett sjutal diskningar.',
                text: '$$E_n \\approx 7{,}4\\ \\mathrm{kWh}$$',
            },
        ],
        svar: 'Cirka $7{,}4\\ \\mathrm{kWh}$ elektrisk energi.',
        bedomning: [
            ['Godtagbar ansats, till exempel beräknar minskningen i lägesenergi i någon enhet', '+E'],
            ['med i övrigt godtagbar lösning och svar ($7{,}4\\ \\mathrm{kWh}$)', '+C'],
        ],
    });
})();

// Fysiklabbet: Kursprov Fysik 1 VT 2017, delprov A, uppgift 11–16 (del 2 av 3).
// Pushas in i window.NP_PROV['fy1-vt2017'].uppgifter; slås ihop med del 1 och 3
// före publicering. Dataformat: se data/np/RIKTLINJER.md.
// Figurer: data/np/fy1-vt2017-figurer-2.js (generator .claude/np-figs/gen-fy1-vt2017-2.js).
// Pennlösningar: data/np/fy1-vt2017-del2-penna.js.
// Bedömning och svar enligt bedömningsanvisningarna (Kursprovsuppgifter/Fysik 1/
// Frisläppta/04 Kursprov Fysik 1 våren 2017/Fy1 vt17 A Bedömningsanvisningar.pdf).
(function () {
    var P = window.NP_PROV && window.NP_PROV['fy1-vt2017'];
    if (!P) return;

    // ================= UPPGIFT 11 =================
    P.uppgifter.push({
        nr: 11, del: 'A', poang: [0, 2, 0], omrade: 'Ellära: ersättningsresistans',
        genomgangar: ['fy1-7.8', 'fy1-7.7', 'fy1-7.5'],
        fraga: 'Krets I består av ett batteri, en amperemeter och tre resistorer. Krets I ska ' +
            'ersättas med krets II så att amperemetern visar lika mycket. Batterierna i krets I ' +
            'och II ger lika stor spänning.\n\n' +
            'Beräkna resistansen $R$ i krets II.',
        figur: 'u11',
        steg: [
            {
                rubrik: 'Jämför de två kretsarna med Ohms lag',
                varfor: 'Batterierna ger samma spänning $U$ och amperemetrarna ska visa samma ström $I$. ' +
                    'Enligt Ohms lag bestäms resistansen av just de två storheterna, så krets II måste ' +
                    'ha samma resistans som hela krets I tillsammans.',
                text: '$$R = \\dfrac{U}{I}$$\n\n' +
                    'Samma $U$ och samma $I$ ger alltså $R = R_\\text{tot}$, där $R_\\text{tot}$ är ' +
                    'ersättningsresistansen för krets I.',
            },
            {
                rubrik: 'Hitta parallellkopplingen',
                varfor: 'En ersättningsresistans räknas ut inifrån och ut. Resistorerna $470\\ \\mathrm{\\Omega}$ ' +
                    'och $220\\ \\mathrm{\\Omega}$ går båda från samma knutpunkt på den övre ledningen ner ' +
                    'till den nedre ledningen. De är alltså parallellkopplade, och den kombinationen ' +
                    'sitter i serie med $150\\ \\mathrm{\\Omega}$.',
                text: 'Vi kallar resistanserna $R_1 = 150\\ \\mathrm{\\Omega}$, ' +
                    '$R_2 = 470\\ \\mathrm{\\Omega}$ och $R_3 = 220\\ \\mathrm{\\Omega}$. ' +
                    '$R_2$ och $R_3$ är parallellkopplade.',
                figur: 'u11-s1',
            },
            {
                rubrik: 'Beräkna ersättningsresistansen för parallellkopplingen',
                varfor: 'För parallellkopplade resistorer adderas inverserna. Svaret på den raden är ' +
                    '$\\dfrac{1}{R_{2,3}}$, så vi inverterar det för att få själva resistansen.',
                text: '$$\\dfrac{1}{R_{2,3}} = \\dfrac{1}{R_2} + \\dfrac{1}{R_3}$$\n\n' +
                    'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'R_2 = 470\\ \\mathrm{\\Omega} \\\\ ' +
                    'R_3 = 220\\ \\mathrm{\\Omega} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$\\dfrac{1}{R_{2,3}} = \\dfrac{1}{470} + \\dfrac{1}{220} = 0{,}006673\\ldots$$\n\n' +
                    '$$R_{2,3} = \\dfrac{1}{0{,}006673\\ldots}\\ \\mathrm{\\Omega} = 149{,}855\\ldots\\ \\mathrm{\\Omega}$$',
            },
            {
                rubrik: 'Lägg till seriemotståndet',
                varfor: '$R_1$ och parallellkopplingen sitter efter varandra i kretsen, så all ström går ' +
                    'genom båda. Seriekopplade resistanser adderas. Vi avrundar först här, till tre ' +
                    'värdesiffror som resistanserna i uppgiften.',
                text: '$$R_\\text{tot} = R_1 + R_{2,3}$$\n\n' +
                    'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'R_1 = 150\\ \\mathrm{\\Omega} \\\\ ' +
                    'R_{2,3} = 149{,}855\\ldots\\ \\mathrm{\\Omega}\\ \\text{(beräknad ovan)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$R_\\text{tot} = (150 + 149{,}855\\ldots)\\ \\mathrm{\\Omega} = 299{,}855\\ldots\\ \\mathrm{\\Omega} ' +
                    '\\approx 300\\ \\mathrm{\\Omega}$$',
                figur: 'u11-s2',
            },
            {
                rubrik: 'Bedöm rimligheten',
                varfor: 'Två parallellkopplade resistorer ger alltid en ersättningsresistans som är mindre ' +
                    'än den minsta av dem. Här är $R_{2,3} \\approx 150\\ \\mathrm{\\Omega}$, mindre än ' +
                    '$220\\ \\mathrm{\\Omega}$, så det stämmer. Med $150\\ \\mathrm{\\Omega}$ i serie blir ' +
                    'summan cirka $300\\ \\mathrm{\\Omega}$.',
                text: 'Krets II ska alltså ha $R = R_\\text{tot} \\approx 300\\ \\mathrm{\\Omega}$.',
            },
        ],
        svar: 'Resistansen ska vara $R \\approx 300\\ \\mathrm{\\Omega}$.',
        bedomning: [
            ['Godtagbar ansats, till exempel tecknar $\\dfrac{1}{R_{2,3}} = \\dfrac{1}{470} + \\dfrac{1}{220}$', '+C'],
            ['med i övrigt godtagbar lösning och svar ($300\\ \\mathrm{\\Omega}$)', '+C'],
        ],
    });

    // ================= UPPGIFT 12 =================
    P.uppgifter.push({
        nr: 12, del: 'A', poang: [1, 2, 0], omrade: 'Elektrostatik: Coulombs lag och kraftfigur',
        genomgangar: ['fy1-7.2', 'fy1-3.4', 'fy1-3.1'],
        fraga: 'Två identiska kulor med lika stor laddning kan röra sig friktionsfritt längs en ' +
            'tunn tråd. Se figur. Båda kulorna väger lika mycket, $1{,}1\\ \\mathrm{g}$. Vid jämvikt är ' +
            'avståndet mellan kulornas centrum $r = 3{,}1\\ \\mathrm{cm}$.\n\n' +
            '**a)** Bestäm kulornas laddning.\n\n' +
            '**b)** Rita kraftsituationen för den nedre kulan, som vilar mot den isolerade bordsytan.',
        figur: 'u12',
        steg: [
            {
                del: 'a',
                rubrik: 'Rita krafterna på den övre kulan',
                varfor: 'Den övre kulan svävar stilla, så krafterna på den tar ut varandra. Tråden är ' +
                    'friktionsfri och kan inte hålla kulan uppe. Det enda som bär kulan är den elektriska ' +
                    'kraften från den nedre kulan: lika laddningar stöter bort varandra, så kraften pekar ' +
                    'uppåt.',
                text: 'På den övre kulan verkar tyngdkraften $F_G$ nedåt och den elektriska kraften $F_e$ ' +
                    'uppåt. Kulan är i jämvikt:\n\n' +
                    '$$F_e = F_G$$',
                figur: 'u12-s1',
            },
            {
                del: 'a',
                rubrik: 'Ställ upp Coulombs lag och lös ut laddningen',
                varfor: 'Båda kulorna har samma laddning $Q$, så produkten $Q_1 \\cdot Q_2$ blir $Q^2$. ' +
                    'Vi löser ut $Q^2$ och drar sedan roten ur båda led.',
                text: '$$F_e = k \\cdot \\dfrac{Q \\cdot Q}{r^2} = k \\cdot \\dfrac{Q^2}{r^2} ' +
                    '\\quad \\Longleftrightarrow \\quad Q^2 = \\dfrac{F_e \\cdot r^2}{k}$$\n\n' +
                    '$$Q = \\sqrt{\\dfrac{F_e \\cdot r^2}{k}}$$',
            },
            {
                del: 'a',
                rubrik: 'Sätt in värdena',
                varfor: 'Massan görs om från gram till kilogram och avståndet från centimeter till meter. ' +
                    'Kraften $F_e$ är inte given, men den är lika stor som tyngdkraften, $F_G = m \\cdot g$, ' +
                    'och räknas ut direkt i klammern.',
                text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'm = 1{,}1\\ \\mathrm{g} = 1{,}1 \\cdot 10^{-3}\\ \\mathrm{kg} \\\\ ' +
                    'g \\approx 9{,}82\\ \\mathrm{N/kg}\\ \\text{(tyngdfaktorn)} \\\\ ' +
                    'F_e = F_G = m \\cdot g = 1{,}1 \\cdot 10^{-3}\\ \\mathrm{kg} \\cdot 9{,}82\\ \\mathrm{N/kg} = 0{,}010802\\ \\mathrm{N} \\\\ ' +
                    'r = 3{,}1\\ \\mathrm{cm} = 0{,}031\\ \\mathrm{m} \\\\ ' +
                    'k \\approx 8{,}99 \\cdot 10^9\\ \\mathrm{N \\cdot m^2/C^2}\\ \\text{(Coulombs konstant)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$Q = \\sqrt{\\dfrac{0{,}010802 \\cdot 0{,}031^2}{8{,}99 \\cdot 10^9}}\\ \\mathrm{C} ' +
                    '= 3{,}398\\ldots \\cdot 10^{-8}\\ \\mathrm{C} \\approx 3{,}4 \\cdot 10^{-8}\\ \\mathrm{C}$$',
            },
            {
                del: 'a',
                rubrik: 'Avrunda och tolka svaret',
                varfor: 'Massan och avståndet har två värdesiffror, så svaret får två. Uppgiften säger ' +
                    'inte om laddningarna är positiva eller negativa, bara att de är lika. Vi kan därför ' +
                    'bara bestämma laddningens storlek.',
                text: '$$Q \\approx 3{,}4 \\cdot 10^{-8}\\ \\mathrm{C} = 34\\ \\mathrm{nC}$$\n\n' +
                    'Rimligt? Laddningar på några tiotal nanocoulomb är vad man får när man gnider en ' +
                    'plaststav, så det är en realistisk laddning för en liten kula.',
                delsvar: { del: 'a', text: 'Varje kula har laddningen $34\\ \\mathrm{nC}$ ' +
                    '($3{,}4 \\cdot 10^{-8}\\ \\mathrm{C}$), med samma tecken på båda.' },
            },
            {
                del: 'b',
                rubrik: 'Rita krafterna på den nedre kulan',
                varfor: 'Den nedre kulan påverkas av tre krafter. Tyngdkraften drar den nedåt. Den övre ' +
                    'kulan stöter bort den, och eftersom den övre kulan sitter ovanför pekar den elektriska ' +
                    'kraften också nedåt. Enligt Newtons tredje lag är den lika stor som kraften på den ' +
                    'övre kulan, alltså lika stor som $F_G$. Bordet trycker uppåt med normalkraften, som ' +
                    'angriper i kontaktpunkten mot bordet.',
                text: 'Kulan ligger still, så normalkraften tar ut båda de nedåtriktade krafterna:\n\n' +
                    '$$F_N = F_G + F_e = 2 \\cdot F_G$$\n\n' +
                    'Normalkraften ritas därför dubbelt så lång som tyngdkraften, och $F_G$ och $F_e$ ' +
                    'lika långa. Tråden är lodrät och friktionsfri och ger ingen kraft längs sig.',
                figur: 'u12-s2',
                delsvar: { del: 'b', text: 'Tyngdkraften $F_G$ och den elektriska kraften $F_e$ ' +
                    '(lika stor som $F_G$) pekar nedåt. Normalkraften från bordet pekar uppåt från ' +
                    'kontaktpunkten och är dubbelt så stor, $F_N = 2 \\cdot F_G$.' },
            },
        ],
        svar: 'a) $Q \\approx 34\\ \\mathrm{nC}$ på vardera kulan. ' +
            'b) $F_G$ och $F_e$ nedåt, lika stora, och $F_N = 2 \\cdot F_G$ uppåt från bordet.',
        bedomning: [
            ['a) Godtagbar ansats, till exempel tecknar $m \\cdot g = k \\cdot \\dfrac{Q^2}{r^2}$', '+E'],
            ['med i övrigt godtagbar lösning och svar ($34\\ \\mathrm{nC}$)', '+C'],
            ['b) Godtagbart utritad kraftsituation där det framgår att kraften uppåt är dubbelt så stor som de två lika stora krafterna nedåt', '+C'],
        ],
    });

    // ================= UPPGIFT 13 =================
    P.uppgifter.push({
        nr: 13, del: 'A', poang: [1, 2, 0], omrade: 'Värme: blandning av vatten',
        genomgangar: ['fy1-6.2', 'fy1-6.1'],
        fraga: 'En varm sommardag fyller Ulrika vatten i en liten pool till barnen. Vattnet från ' +
            'trädgårdsslangen har temperaturen $16\\ \\mathrm{°C}$. Barnen tycker att vattnet är kallt och ' +
            'Ulrika bär därför ut hinkar med varmt vatten för att det ska bli skönare att bada. ' +
            'Poolen innehåller $700$ liter vatten från trädgårdsslangen. Varmvattnets temperatur är ' +
            '$47\\ \\mathrm{°C}$ och hinken rymmer $10$ liter.\n\n' +
            'Hur många hinkar med varmt vatten måste Ulrika hälla i för att vattnet i poolen ska få ' +
            'temperaturen $20\\ \\mathrm{°C}$?',
        figur: null,
        steg: [
            {
                rubrik: 'Ställ upp energibalansen',
                varfor: 'Värme flödar från varmt till kallt. Varmvattnet svalnar från $47\\ \\mathrm{°C}$ ' +
                    'till $20\\ \\mathrm{°C}$ och avger energi. Poolvattnet värms från $16\\ \\mathrm{°C}$ ' +
                    'till $20\\ \\mathrm{°C}$ och tar upp exakt den energin (vi bortser från värme som går ' +
                    'till luften och marken).',
                text: '$$E_\\text{avg} = E_\\text{upp}$$\n\n' +
                    '$$c \\cdot m_v \\cdot \\Delta T_v = c \\cdot m_k \\cdot \\Delta T_k$$\n\n' +
                    'där $m_v$ och $\\Delta T_v$ gäller varmvattnet och $m_k$ och $\\Delta T_k$ det kalla ' +
                    'poolvattnet.',
            },
            {
                rubrik: 'Dividera bort den specifika värmekapaciteten',
                varfor: 'Det är vatten på båda sidor, så $c$ är densamma och kan divideras bort. ' +
                    'Därefter löser vi ut varmvattnets massa, som är det vi söker.',
                text: '$$m_v \\cdot \\Delta T_v = m_k \\cdot \\Delta T_k ' +
                    '\\quad \\Longleftrightarrow \\quad m_v = \\dfrac{m_k \\cdot \\Delta T_k}{\\Delta T_v}$$',
            },
            {
                rubrik: 'Sätt in värdena',
                varfor: 'En liter vatten väger ungefär ett kilogram, så $700$ liter är cirka $700\\ \\mathrm{kg}$. ' +
                    'En temperaturskillnad är lika stor i kelvin som i grader Celsius.',
                text: 'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'm_k \\approx 700\\ \\mathrm{kg}\\ \\text{(1 liter vatten väger cirka 1 kg)} \\\\ ' +
                    '\\Delta T_k = (20 - 16)\\ \\mathrm{K} = 4\\ \\mathrm{K} \\\\ ' +
                    '\\Delta T_v = (47 - 20)\\ \\mathrm{K} = 27\\ \\mathrm{K} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$m_v = \\dfrac{700 \\cdot 4}{27}\\ \\mathrm{kg} = 103{,}70\\ldots\\ \\mathrm{kg}$$\n\n' +
                    'Det motsvarar cirka $103{,}7$ liter varmt vatten.',
            },
            {
                rubrik: 'Räkna om till antal hinkar',
                varfor: 'Varje hink rymmer $10$ liter. Antalet hinkar kan inte vara ett decimaltal, och ' +
                    'tio hinkar räcker inte riktigt. Därför avrundas uppåt.',
                text: '$$\\text{antal hinkar} = \\dfrac{103{,}70\\ldots}{10} = 10{,}37\\ldots$$\n\n' +
                    'Med $10$ hinkar blir temperaturen ' +
                    '$\\dfrac{700 \\cdot 16 + 100 \\cdot 47}{800}\\ \\mathrm{°C} \\approx 19{,}9\\ \\mathrm{°C}$, ' +
                    'bara $0{,}1\\ \\mathrm{°C}$ för kallt. Det ligger under noggrannheten i uppgiftens ' +
                    'data, så även $10$ hinkar är ett rimligt svar. Med $11$ hinkar blir temperaturen ' +
                    '$\\dfrac{700 \\cdot 16 + 110 \\cdot 47}{810}\\ \\mathrm{°C} \\approx 20{,}2\\ \\mathrm{°C}$, ' +
                    'och det är den säkra sidan: då blir det minst $20\\ \\mathrm{°C}$.\n\n' +
                    'Rimligt? Varmvattnet är $27$ grader för varmt men poolvattnet bara $4$ grader för ' +
                    'kallt, så det räcker med ungefär en sjundedel så mycket varmt vatten som kallt: ' +
                    '$\\dfrac{700}{7} = 100$ liter.',
            },
        ],
        svar: 'Ulrika måste hälla i $11$ hinkar (det behövs $10{,}4$ hinkar, och $10$ hinkar ger bara ' +
            'cirka $19{,}9\\ \\mathrm{°C}$).',
        bedomning: [
            ['Godtagbar ansats, till exempel beräknar upptagen energi', '+E'],
            ['med godtagbar fortsättning, till exempel tecknar $c \\cdot m_v \\cdot (47 - 20) = c \\cdot 700 \\cdot (20 - 16)$', '+C'],
            ['med i övrigt godtagbar lösning och svar ($10$ till $11$ hinkar)', '+C'],
        ],
    });

    // ================= UPPGIFT 14 =================
    P.uppgifter.push({
        nr: 14, del: 'A', poang: [0, 2, 2], omrade: 'Krafter: friktion och lutande plan',
        genomgangar: ['fy1-3.6', 'fy1-3.7', 'fy1-2.9'],
        fraga: 'Johanna är på skidsemester i Norge. En dag när hon kör bil hem från skidbackarna ' +
            'tvingas hon bromsa. Väglaget är halt och friktionstal mellan däck och väg är $0{,}20$. ' +
            'Det innebär att friktionskraften är $20\\ \\%$ av normalkraften.\n\n' +
            '**a)** Vilken blir den kortaste bromssträckan om Johanna kör i $90\\ \\mathrm{km/h}$ på plan väg?\n\n' +
            '**b)** Vilken blir den kortaste bromssträckan om Johanna kör i $90\\ \\mathrm{km/h}$ i en ' +
            'nedförsbacke med lutningen $5^\\circ$?',
        figur: null,
        steg: [
            {
                del: 'a',
                rubrik: 'Rita krafterna på bilen',
                varfor: 'Den kortaste bromssträckan får man när hjulen bromsar så hårt det går, alltså ' +
                    'när friktionskraften är så stor den kan bli: $F_f = \\mu \\cdot F_N$. På plan väg är ' +
                    'friktionen den enda kraften i rörelseriktningen, och normalkraften är lika stor som ' +
                    'tyngdkraften.',
                text: 'Lodrätt: $F_N = F_{N1} + F_{N2} = F_G = m \\cdot g$. Friktionen verkar vid ' +
                    'marken, under tyngdpunkten, och vill tippa bilen framåt. Därför trycks framhjulet ' +
                    'hårdare mot vägen än bakhjulet, och $F_{N2}$ är ritad längre än $F_{N1}$ så att ' +
                    'momenten kring tyngdpunkten tar ut varandra.\n\n' +
                    'Vågrätt: bara friktionskraften, som är riktad bakåt:\n\n' +
                    '$$F_f = \\mu \\cdot F_N = \\mu \\cdot m \\cdot g$$',
                figur: 'u14-s1',
            },
            {
                del: 'a',
                rubrik: 'Beräkna retardationen med Newtons andra lag',
                varfor: 'Friktionskraften är den resulterande kraften. Vi räknar rörelseriktningen som ' +
                    'positiv. Friktionen pekar mot rörelsen, så den resulterande kraften och accelerationen ' +
                    'blir negativa: bilen bromsas. Massan $m$ förkortas bort, så vi behöver inte veta hur ' +
                    'mycket bilen väger.',
                text: '$$F_R = -F_f = -\\mu \\cdot m \\cdot g$$\n\n' +
                    '$$a = \\dfrac{F_R}{m} = \\dfrac{-\\mu \\cdot m \\cdot g}{m} = -\\mu \\cdot g$$\n\n' +
                    'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    '\\mu = 0{,}20 \\\\ ' +
                    'g \\approx 9{,}82\\ \\mathrm{m/s^2}\\ \\text{(tyngdaccelerationen)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$a = -0{,}20 \\cdot 9{,}82\\ \\mathrm{m/s^2} = -1{,}964\\ \\mathrm{m/s^2}$$',
            },
            {
                del: 'a',
                rubrik: 'Använd Torricellis ekvation',
                varfor: 'Vi känner starthastigheten, sluthastigheten (bilen stannar) och accelerationen, ' +
                    'men inte tiden. Då passar den tidlösa ekvationen. Hastigheten görs om från km/h ' +
                    'till m/s genom att dividera med $3{,}6$.',
                text: '$$v^2 - v_0^2 = 2 a s \\quad \\Longleftrightarrow \\quad s = \\dfrac{v^2 - v_0^2}{2a}$$\n\n' +
                    'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'v = 0\\ \\text{(bilen stannar)} \\\\ ' +
                    'v_0 = 90\\ \\mathrm{km/h} = \\dfrac{90}{3{,}6}\\ \\mathrm{m/s} = 25\\ \\mathrm{m/s} \\\\ ' +
                    'a = -1{,}964\\ \\mathrm{m/s^2}\\ \\text{(beräknad ovan)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$s = \\dfrac{0 - 25^2}{2 \\cdot (-1{,}964)}\\ \\mathrm{m} = 159{,}11\\ldots\\ \\mathrm{m} ' +
                    '\\approx 160\\ \\mathrm{m}$$',
            },
            {
                del: 'a',
                rubrik: 'Avrunda och bedöm rimligheten',
                varfor: 'Friktionstalet $0{,}20$ och farten $90\\ \\mathrm{km/h}$ har två värdesiffror, ' +
                    'så svaret får två. På torr asfalt är friktionstalet cirka $0{,}8$, och då blir ' +
                    'bromssträckan ungefär $40\\ \\mathrm{m}$. På halt väglag med en fjärdedel så stor ' +
                    'friktion blir den fyra gånger så lång. Det stämmer.',
                text: '$$s \\approx 160\\ \\mathrm{m} = 1{,}6 \\cdot 10^2\\ \\mathrm{m}$$\n\n' +
                    'Samma svar fås med energiprincipen: hela rörelseenergin blir friktionsvärme, ' +
                    '$\\dfrac{m \\cdot v_0^2}{2} = F_f \\cdot s = \\mu \\cdot m \\cdot g \\cdot s$, som ger ' +
                    '$s = \\dfrac{v_0^2}{2 \\cdot \\mu \\cdot g}$.',
                delsvar: { del: 'a', text: 'Bromssträckan blir cirka $160\\ \\mathrm{m}$.' },
            },
            {
                del: 'b',
                rubrik: 'Rita krafterna på bilen i backen',
                varfor: 'Tyngdkraften pekar fortfarande rakt nedåt, men normalkraften står vinkelrätt ' +
                    'mot vägen och friktionen verkar längs vägen, uppför backen eftersom bilen rör sig ' +
                    'nedför och bromsar.',
                text: 'På bilen verkar $F_G$ (rakt nedåt), $F_{N1}$ och $F_{N2}$ (vinkelrätt mot vägen) och ' +
                    '$F_f$ (längs vägen, uppför backen). Som på plan väg är framhjulets normalkraft störst.',
                figur: 'u14-s2',
            },
            {
                del: 'b',
                rubrik: 'Dela upp tyngdkraften i komposanter',
                varfor: 'I backen pekar tyngdkraften inte längre vinkelrätt mot vägen. Vi delar upp den i ' +
                    'en komposant $F_1$ längs backen och en komposant $F_2$ vinkelrätt mot vägen. ' +
                    'Vinkeln mellan $F_G$ och $F_2$ är lika stor som backens lutning $\\alpha$: $F_G$ är vinkelrät ' +
                    'mot den vågräta marken och $F_2$ vinkelrät mot vägen, och vägen lutar $\\alpha$ mot marken.',
                text: '$$F_1 = m \\cdot g \\cdot \\sin \\alpha \\qquad F_2 = m \\cdot g \\cdot \\cos \\alpha$$\n\n' +
                    'Normalkraften tar ut $F_2$, så $F_N = m \\cdot g \\cdot \\cos \\alpha$. Friktionskraften ' +
                    'pekar uppför backen och komposanten $F_1$ nedför. Med $\\alpha = 5^\\circ$ är $F_1$ bara ' +
                    'cirka $9\\ \\%$ av $F_G$. Figuren är därför förstorad: tyngdkraften är ritad mycket ' +
                    'längre än i bilfiguren, så att $F_1$ syns.',
                figur: 'u14-s3',
            },
            {
                del: 'b',
                rubrik: 'Beräkna den resulterande kraften och retardationen',
                varfor: 'Längs backen verkar $F_1$ framåt (nedför backen) och friktionen bakåt. Med ' +
                    'rörelseriktningen som positiv är den resulterande kraften $F_1 - F_f$. $F_1$ hjälper ' +
                    'bilen framåt, så retardationen blir mindre än på plan väg. Massan förkortas bort igen.',
                text: '$$F_R = F_1 - F_f = m \\cdot g \\cdot \\sin \\alpha - \\mu \\cdot m \\cdot g \\cdot \\cos \\alpha$$\n\n' +
                    '$$a = \\dfrac{F_R}{m} = g \\cdot \\sin \\alpha - \\mu \\cdot g \\cdot \\cos \\alpha$$\n\n' +
                    'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    '\\mu = 0{,}20 \\\\ ' +
                    'g \\approx 9{,}82\\ \\mathrm{m/s^2}\\ \\text{(tyngdaccelerationen)} \\\\ ' +
                    '\\alpha = 5^\\circ ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$a = (9{,}82 \\cdot \\sin 5^\\circ - 0{,}20 \\cdot 9{,}82 \\cdot \\cos 5^\\circ)\\ \\mathrm{m/s^2} ' +
                    '= -1{,}1006\\ldots\\ \\mathrm{m/s^2}$$',
            },
            {
                del: 'b',
                rubrik: 'Använd Torricellis ekvation igen',
                varfor: 'Samma ekvation som i a), men med den nya, mindre retardationen.',
                text: '$$s = \\dfrac{v^2 - v_0^2}{2a}$$\n\n' +
                    'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'v = 0 \\\\ ' +
                    'v_0 = 25\\ \\mathrm{m/s} \\\\ ' +
                    'a = -1{,}1006\\ldots\\ \\mathrm{m/s^2}\\ \\text{(beräknad ovan)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$s = \\dfrac{0 - 25^2}{2 \\cdot (-1{,}1006\\ldots)}\\ \\mathrm{m} = 283{,}92\\ldots\\ \\mathrm{m}$$',
            },
            {
                del: 'b',
                rubrik: 'Avrunda och bedöm rimligheten',
                varfor: 'Lutningen $5^\\circ$ är given med bara en värdesiffra, och den styr svaret: ' +
                    'skillnaden $\\mu \\cdot \\cos \\alpha - \\sin \\alpha$ är känslig för vinkeln ($4^\\circ$ ' +
                    'ger cirka $250\\ \\mathrm{m}$ och $6^\\circ$ cirka $340\\ \\mathrm{m}$). Därför avrundas ' +
                    'svaret till en värdesiffra, som i bedömningsanvisningarna. Nedför backen drar ' +
                    'tyngdkraften bilen framåt, så bromssträckan ska bli längre än på plan väg. Den blir ' +
                    'nästan dubbelt så lång, trots att backen bara lutar $5^\\circ$: på så halt väglag gör ' +
                    'även en liten lutning stor skillnad.',
                text: '$$s = 283{,}92\\ldots\\ \\mathrm{m} \\approx 300\\ \\mathrm{m} = 3 \\cdot 10^2\\ \\mathrm{m}$$',
                delsvar: { del: 'b', text: 'Bromssträckan blir cirka $300\\ \\mathrm{m}$ (beräknat $284\\ \\mathrm{m}$).' },
            },
        ],
        svar: 'a) Cirka $160\\ \\mathrm{m}$. b) Cirka $300\\ \\mathrm{m}$ (beräknat $284\\ \\mathrm{m}$).',
        bedomning: [
            ['a) Godtagbar ansats, till exempel tecknar $\\dfrac{m \\cdot v^2}{2} = F_f \\cdot s$ (en antagen massa godtas)', '+C'],
            ['med korrekt svar ($160\\ \\mathrm{m}$)', '+C'],
            ['b) Godtagbar ansats, till exempel tecknar $m \\cdot a = m \\cdot g \\cdot \\sin 5^\\circ - \\mu \\cdot m \\cdot g \\cdot \\cos 5^\\circ$', '+A'],
            ['med godtagbar lösning och svar där massan inte är antagen ($300\\ \\mathrm{m}$)', '+A'],
        ],
    });

    // ================= UPPGIFT 15 =================
    P.uppgifter.push({
        nr: 15, del: 'A', poang: [0, 2, 1], omrade: 'Gaser: ideala gaslagen och molnbildning',
        genomgangar: ['fy1-5.7', 'fy1-6.3'],
        fraga: 'En varmfront är en varm luftmassa i rörelse som möter ett område med kallare luft. ' +
            'Den varma luftmassan har lägre densitet än den kalla luften och kommer då att börja ' +
            'stiga (se bild).\n\n' +
            'När den varma luftmassan förflyttas från läge A till B i figuren sjunker trycket med ' +
            '$50\\ \\%$ och temperaturen (i kelvin) sjunker med $20\\ \\%$.\n\n' +
            '**a)** Bestäm den procentuella förändringen av den varma luftmassans volym när luften ' +
            'stiger från A till B.\n\n' +
            '**b)** Förklara varför det bildas moln i läge B.',
        figur: 'u15',
        steg: [
            {
                del: 'a',
                rubrik: 'Skriv tillstånden i A och B med samma storheter',
                varfor: 'Vi vet inte trycket eller temperaturen i siffror, bara hur mycket de ändras. ' +
                    'Det räcker: om trycket sjunker med $50\\ \\%$ är det nya trycket $50\\ \\%$ av det ' +
                    'gamla, och om temperaturen sjunker med $20\\ \\%$ är den nya $80\\ \\%$ av den gamla.',
                text: '$$p_2 = 0{,}50 \\cdot p_1 \\qquad T_2 = 0{,}80 \\cdot T_1$$\n\n' +
                    'Vi söker kvoten $\\dfrac{V_2}{V_1}$.',
                figur: 'u15-s1',
            },
            {
                del: 'a',
                rubrik: 'Ställ upp ideala gaslagen och lös ut volymen',
                varfor: 'Det är samma luftmassa i A och B (samma mängd gas), så ideala gaslagen gäller ' +
                    'mellan de två lägena. Vi bortser från att lite av vattenångan kondenserar på vägen, ' +
                    'det minskar inte gasmängden märkbart.',
                text: '$$\\dfrac{p_1 \\cdot V_1}{T_1} = \\dfrac{p_2 \\cdot V_2}{T_2} ' +
                    '\\quad \\Longleftrightarrow \\quad V_2 = \\dfrac{p_1 \\cdot V_1 \\cdot T_2}{T_1 \\cdot p_2}$$',
            },
            {
                del: 'a',
                rubrik: 'Sätt in sambanden och förkorta',
                varfor: 'När $p_2$ och $T_2$ skrivs med $p_1$ och $T_1$ förkortas både $p_1$ och $T_1$ ' +
                    'bort. Kvar blir ett tal gånger $V_1$, och det talet är volymens förändringsfaktor.',
                text: '$$V_2 = \\dfrac{p_1 \\cdot V_1 \\cdot 0{,}80 \\cdot T_1}{T_1 \\cdot 0{,}50 \\cdot p_1} ' +
                    '= \\dfrac{0{,}80}{0{,}50} \\cdot V_1 = 1{,}6 \\cdot V_1$$',
            },
            {
                del: 'a',
                rubrik: 'Tolka förändringsfaktorn',
                varfor: 'Förändringsfaktorn $1{,}6$ betyder att den nya volymen är $160\\ \\%$ av den ' +
                    'gamla. Ökningen är skillnaden mot $100\\ \\%$.',
                text: '$$1{,}6 = 1 + 0{,}6 \\quad \\Longrightarrow \\quad \\text{volymen ökar med } 60\\ \\%$$\n\n' +
                    'Rimligt? Både det lägre trycket och den lägre temperaturen påverkar volymen. ' +
                    'Halverat tryck fördubblar volymen, och svalare luft drar ihop sig. Sammantaget ' +
                    'ökar volymen, men mindre än dubbelt.',
                delsvar: { del: 'a', text: 'Volymen ökar med $60\\ \\%$.' },
            },
            {
                del: 'b',
                rubrik: 'Förklara molnbildningen',
                varfor: 'Ett moln består av små vattendroppar (eller iskristaller), inte av vattenånga, ' +
                    'som är osynlig. Frågan är alltså varför vattenångan i luften övergår till vätska ' +
                    'just i läge B.',
                text: 'När luften stiger sjunker trycket, luften expanderar och temperaturen sjunker ' +
                    '(med $20\\ \\%$ i kelvin, det vill säga flera tiotals grader). Kall luft kan innehålla ' +
                    'mindre vattenånga än varm luft. När luften kylts av tillräckligt kondenserar ' +
                    'vattenångan till små vattendroppar, och de syns som moln.',
                figur: 'u15-s2',
                delsvar: { del: 'b', text: 'Luften kyls av när den stiger och expanderar. Kall luft ' +
                    'kan inte innehålla lika mycket vattenånga, så ångan kondenserar till små ' +
                    'vattendroppar som bildar moln.' },
            },
        ],
        svar: 'a) Volymen ökar med $60\\ \\%$. b) Luften kyls av när den stiger, och vattenångan ' +
            'kondenserar till små vattendroppar som bildar moln.',
        bedomning: [
            ['a) Godtagbar ansats, löser uppgiften med antagna värden eller påbörjar en generell lösning', '+C'],
            ['med i övrigt godtagbar generell lösning och svar (volymen ökar med $60\\ \\%$)', '+A'],
            ['b) Godtagbar motivering där kondensation ingår', '+C'],
        ],
    });

    // ================= UPPGIFT 16 =================
    P.uppgifter.push({
        nr: 16, del: 'A', poang: [2, 1, 2], omrade: 'Elektriska fält: spänning och energi',
        genomgangar: ['fy1-7.11', 'fy1-7.4', 'fy1-7.1'],
        fraga: 'Inom ett åskmoln, och mellan marken och åskmolnet, uppstår elektriska fält. Övre ' +
            'delen av molnet är positivt laddat och den nedre delen är negativt laddat. Avståndet ' +
            'mellan marken och molnet är $1{,}5\\ \\mathrm{km}$ och den elektriska fältstyrkan ' +
            '$3{,}1\\ \\mathrm{kV/m}$.\n\n' +
            '**a)** Rita in det elektriska fältets riktning mellan marken och molnets undersida.\n\n' +
            '**b)** Hur stor är spänningen mellan marken och undersidan av molnet?\n\n' +
            '**c)** I filmen ”Tillbaka till framtiden” från 1985 ska hjälten med hjälp av ett ' +
            'blixtnedslag öka sin bils hastighet från $140\\ \\mathrm{km/h}$ till $15\\ \\mathrm{Mm/s}$. ' +
            'Bilen har en antenn som är i kontakt med en vajer kopplad till åskledaren på kyrktornet. ' +
            'Det är alltså den elektriska energin från blixten som används i bilens motor. Bilen är ' +
            'av märket DeLorean och väger $1{,}5$ ton. Utgå från att avståndet mellan marken och ' +
            'molnet är $1{,}5\\ \\mathrm{km}$ och den elektriska fältstyrkan $3{,}1\\ \\mathrm{kV/m}$.\n\n' +
            'Hur många elektroner måste blixten leverera till bilen för att detta ska fungera?',
        figur: 'u16',
        steg: [
            {
                del: 'a',
                rubrik: 'Bestäm fältets riktning',
                varfor: 'Ett elektriskt fält pekar från positiv laddning mot negativ laddning, alltså i ' +
                    'den riktning en positiv laddning skulle dras. Molnets undersida är negativ. Den ' +
                    'negativa laddningen stöter bort elektroner i marken (influens), så markytan under ' +
                    'molnet blir positivt laddad.',
                text: 'Fältet pekar från den positiva marken **uppåt** mot molnets negativa undersida. ' +
                    'Fältlinjerna är lodräta och parallella, som mellan två plattor.',
                figur: 'u16-s1',
                delsvar: { del: 'a', text: 'Fältet är riktat uppåt, från marken mot molnets undersida.' },
            },
            {
                del: 'b',
                rubrik: 'Beräkna spänningen',
                varfor: 'Mellan marken och molnets undersida är fältet i stort sett homogent, precis som ' +
                    'mellan två parallella plattor. Då är spänningen fältstyrkan gånger avståndet. ' +
                    'Kilovolt och kilometer görs om till SI-enheterna volt och meter.',
                text: '$$\\mathbb{E} = \\dfrac{U}{d} \\quad \\Longleftrightarrow \\quad U = \\mathbb{E} \\cdot d$$\n\n' +
                    'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    '\\mathbb{E} = 3{,}1\\ \\mathrm{kV/m} = 3{,}1 \\cdot 10^3\\ \\mathrm{V/m} \\\\ ' +
                    'd = 1{,}5\\ \\mathrm{km} = 1{,}5 \\cdot 10^3\\ \\mathrm{m} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$U = 3{,}1 \\cdot 10^3 \\cdot 1{,}5 \\cdot 10^3\\ \\mathrm{V} = 4{,}65 \\cdot 10^6\\ \\mathrm{V} ' +
                    '\\approx 4{,}7\\ \\mathrm{MV}$$\n\n' +
                    'Svaret avrundas till två värdesiffror, som fältstyrkan och avståndet.',
                figur: 'u16-s2',
                delsvar: { del: 'b', text: 'Spänningen är cirka $4{,}7\\ \\mathrm{MV}$.' },
            },
            {
                del: 'c',
                rubrik: 'Kontrollera om klassisk rörelseenergi duger',
                varfor: 'Bilen ska upp i $15\\ \\mathrm{Mm/s}$, och vid höga farter gäller inte ' +
                    '$E_k = \\dfrac{m \\cdot v^2}{2}$ exakt. Vi jämför därför farten med ljusets.',
                text: '$$\\dfrac{v}{c} \\approx \\dfrac{1{,}5 \\cdot 10^7}{3{,}00 \\cdot 10^8} = 0{,}05$$\n\n' +
                    'Farten är bara $5\\ \\%$ av ljusets hastighet. Den relativistiska rörelseenergin ' +
                    'blir då bara cirka $0{,}2\\ \\%$ större än den klassiska, vilket inte märks med två ' +
                    'värdesiffror. Den vanliga formeln duger. (Här är $c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}$, ' +
                    'ljusets hastighet.)',
            },
            {
                del: 'c',
                rubrik: 'Koppla elektronernas energi till bilens rörelseenergi',
                varfor: 'Varje elektron som passerar spänningen $U$ lämnar energin $q_e \\cdot U$. ' +
                    'Med $n$ elektroner är laddningen $Q = n \\cdot q_e$, och hela den elektriska energin ' +
                    'ska bli bilens ökning av rörelseenergi (energiprincipen).',
                text: '$$E = Q \\cdot U = n \\cdot q_e \\cdot U$$\n\n' +
                    '$$n \\cdot q_e \\cdot U = \\Delta E_k \\quad \\Longleftrightarrow \\quad ' +
                    'n = \\dfrac{\\Delta E_k}{q_e \\cdot U}$$',
            },
            {
                del: 'c',
                rubrik: 'Sätt in värdena',
                varfor: 'Ändringen i rörelseenergi är inte given. Den räknas ut i klammern som slutlig ' +
                    'minus ursprunglig rörelseenergi. Ton görs om till kilogram, och båda farterna ' +
                    'till meter per sekund.',
                text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'm = 1{,}5\\ \\text{ton} = 1\\,500\\ \\mathrm{kg} \\\\ ' +
                    'v_0 = 140\\ \\mathrm{km/h} = \\dfrac{140}{3{,}6}\\ \\mathrm{m/s} = 38{,}88\\ldots\\ \\mathrm{m/s} \\\\ ' +
                    'v = 15\\ \\mathrm{Mm/s} = 1{,}5 \\cdot 10^7\\ \\mathrm{m/s} \\\\ ' +
                    '\\Delta E_k = \\dfrac{m \\cdot v^2}{2} - \\dfrac{m \\cdot v_0^2}{2} = 1{,}6874\\ldots \\cdot 10^{17}\\ \\mathrm{J} \\\\ ' +
                    'U = 4{,}65 \\cdot 10^6\\ \\mathrm{V}\\ \\text{(beräknad i b)} \\\\ ' +
                    'q_e \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}\\ \\text{(elementarladdningen)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$n = \\dfrac{1{,}6874\\ldots \\cdot 10^{17}}{1{,}602 \\cdot 10^{-19} \\cdot 4{,}65 \\cdot 10^6} ' +
                    '= 2{,}265\\ldots \\cdot 10^{29} \\approx 2{,}3 \\cdot 10^{29}$$\n\n' +
                    'Starthastigheten spelar nästan ingen roll: $v_0 = 39\\ \\mathrm{m/s}$ är försumbar ' +
                    'jämfört med $15\\,000\\,000\\ \\mathrm{m/s}$.',
            },
            {
                del: 'c',
                rubrik: 'Bedöm rimligheten',
                varfor: 'Svaret avrundas till två värdesiffror. Att talet är enormt är väntat: en ' +
                    'verklig blixt för med sig en laddning av storleksordningen $10\\ \\mathrm{C}$, ' +
                    'alltså cirka $6 \\cdot 10^{19}$ elektroner.',
                text: 'Laddningen som behövs är $n \\cdot q_e \\approx 3{,}6 \\cdot 10^{10}\\ \\mathrm{C}$, ' +
                    'flera miljarder gånger mer än en riktig blixt. Det går alltså inte i verkligheten.',
                delsvar: { del: 'c', text: 'Blixten måste leverera cirka $2{,}3 \\cdot 10^{29}$ elektroner.' },
            },
        ],
        svar: 'a) Uppåt, från marken mot molnets undersida. b) Cirka $4{,}7\\ \\mathrm{MV}$. ' +
            'c) Cirka $2{,}3 \\cdot 10^{29}$ elektroner.',
        bedomning: [
            ['a) Korrekt ritad fältriktning mellan moln och mark (uppåt)', '+E'],
            ['b) Godtagbar lösning och svar ($4{,}7\\ \\mathrm{MV}$)', '+E'],
            ['c) Godtagbar ansats, till exempel beräknar den kinetiska energin efter accelerationen', '+C'],
            ['med godtagbar fortsättning, till exempel tecknar $Q \\cdot U = E_k$', '+A'],
            ['med i övrigt godtagbar lösning och svar ($2{,}3 \\cdot 10^{29}$ elektroner)', '+A'],
        ],
    });
})();

// Fysiklabbet: Kursprov Fysik 1 VT 2017, delprov A, uppgift 17–21 (del 3).
// Pushas in i skelettet data/np/fy1-vt2017.js under utvecklingen; slås ihop
// med del 1 och 2 innan publicering. Format och regler: data/np/RIKTLINJER.md.
//
// Källa: elevhäftet och bedömningsanvisningarna för delprov A
// (Kursprovsuppgifter/Fysik 1/Frisläppta/04 Kursprov Fysik 1 våren 2017/).
(function () {
    var P = window.NP_PROV && window.NP_PROV['fy1-vt2017'];
    if (!P) return;

    // ================= UPPGIFT 17 =================
    P.uppgifter.push({
        nr: 17, del: 'A', poang: [0, 0, 2], omrade: 'Rörelsemängd och impuls: studsande boll',
        genomgangar: ['fy1-4.7', 'fy1-3.3'],
        fraga: 'Ludvig kastar två lika tunga bollar mot en vägg. Boll A studsar bra medan boll B inte ' +
            'studsar alls. Boll A har kortare kontakttid med väggen.\n\n' +
            'Han kastar bollarna en i taget med samma hastighet mot en glasruta. Den andra bollen han ' +
            'kastar krossar glasrutan.\n\n' +
            'Vilken av bollarna A eller B krossar glasrutan? Ge en fysikalisk förklaring till varför ' +
            'glasrutan krossas endast av den ena bollen.',
        figur: null,
        steg: [
            {
                rubrik: 'Koppla kraften på rutan till impulsen',
                varfor: 'Glasrutan går sönder om kraften från bollen blir tillräckligt stor. Enligt ' +
                    'Newtons tredje lag är kraften från bollen på rutan lika stor som kraften från rutan ' +
                    'på bollen, och den kraften är det som ändrar bollens rörelsemängd. Impulslagen ' +
                    'kopplar ihop kraften, kontakttiden och ändringen av rörelsemängden.',
                text: 'Impulslagen för bollen under stöten:\n\n' +
                    '$$I = F \\cdot \\Delta t = \\Delta p \\quad \\Longleftrightarrow \\quad ' +
                    'F = \\dfrac{\\Delta p}{\\Delta t}$$\n\n' +
                    'Kraften blir alltså stor om rörelsemängdsändringen $\\Delta p$ är stor och om ' +
                    'kontakttiden $\\Delta t$ är kort.',
            },
            {
                rubrik: 'Jämför bollarnas rörelsemängdsändring',
                varfor: 'Rörelsemängd är en vektor, så riktningen måste räknas med. Vi väljer kastriktningen ' +
                    'som positiv. Båda bollarna har samma massa $m$ och samma hastighet $v_1$ före stöten. ' +
                    'Skillnaden ligger i hastigheten $v_2$ efter stöten.',
                text: '**Boll A** studsar tillbaka, så $v_2$ är negativ:\n\n' +
                    '$$\\Delta p_\\mathrm{A} = m \\cdot v_2 - m \\cdot v_1 = m \\cdot (v_2 - v_1)$$\n\n' +
                    'Eftersom $v_2 < 0$ blir beloppet $|\\Delta p_\\mathrm{A}| = m \\cdot (v_1 + |v_2|)$, ' +
                    'alltså **större** än $m \\cdot v_1$.\n\n' +
                    '**Boll B** stannar, så $v_2 = 0$:\n\n' +
                    '$$\\Delta p_\\mathrm{B} = m \\cdot 0 - m \\cdot v_1 = -m \\cdot v_1$$\n\n' +
                    'Boll A:s rörelsemängd ändras mer: $|\\Delta p_\\mathrm{A}| > |\\Delta p_\\mathrm{B}|$. ' +
                    'Rutan ska först bromsa bollen och sedan dessutom skjuta tillbaka den.',
                figur: 'u17-s1',
            },
            {
                rubrik: 'Jämför kontakttiderna och dra slutsatsen om kraften',
                varfor: 'Uppgiften säger att boll A har kortare kontakttid. I $F = \\dfrac{\\Delta p}{\\Delta t}$ ' +
                    'ger då både täljaren och nämnaren en större kraft för boll A: större ' +
                    'rörelsemängdsändring på kortare tid.',
                text: '$$\\Delta t_\\mathrm{A} < \\Delta t_\\mathrm{B} \\quad \\text{och} \\quad ' +
                    '|\\Delta p_\\mathrm{A}| > |\\Delta p_\\mathrm{B}| \\quad \\Longrightarrow \\quad ' +
                    '|F_\\mathrm{A}| > |F_\\mathrm{B}|$$\n\n' +
                    'I ett kraft-tid-diagram är impulsen arean under kurvan. Boll A ger en större area ' +
                    'på en kortare tid, alltså en mycket högre topp.',
                figur: 'u17-s2',
            },
            {
                rubrik: 'Besvara frågan',
                varfor: 'Den största kraften på rutan kommer från boll A. Det är därför den bollen som ' +
                    'krossar rutan, och boll B gör det inte trots samma massa och samma fart.',
                text: 'Boll A ger den största rörelsemängdsändringen under den kortaste tiden och därmed ' +
                    'den största kraften på glasrutan.',
            },
        ],
        svar: 'Glasrutan krossas av boll A. Kraften på rutan är $F = \\dfrac{\\Delta p}{\\Delta t}$. Boll A ' +
            'studsar tillbaka, så dess rörelsemängdsändring är större än för boll B som bara stannar, och ' +
            'boll A har dessutom kortare kontakttid. Båda delarna gör kraften från boll A större.',
        bedomning: [
            ['Godtagbar ansats till förklaring som innehåller resonemang om hastighetsändringar eller att ' +
                '$\\Delta t_\\mathrm{A} < \\Delta t_\\mathrm{B}$ ger $|F_\\mathrm{A}| > |F_\\mathrm{B}|$', '+A'],
            ['med i övrigt godtagbar förklaring som innehåller resonemang om rörelsemängdsändring och ' +
                'kontakttid (fönstret går sönder av boll A)', '+A'],
            ['*Kommentar:* Algebraisk bearbetning är inte nödvändig.', ''],
        ],
    });

    // ================= UPPGIFT 18 =================
    P.uppgifter.push({
        nr: 18, del: 'A', poang: [1, 2, 1], omrade: 'Experimentell metod: gasers lyftkraft',
        genomgangar: ['fy1-5.6', 'fy1-5.5', 'fy1-5.1'],
        fraga: 'En ballong fylld med helium stiger uppåt. Ju större ballongen är desto mer last kan den ' +
            'lyfta. En teoretisk modell för den last som ballongen kan lyfta ges av\n\n' +
            '$$m_\\mathrm{L} = (\\rho_\\mathrm{luft} - \\rho_\\mathrm{He}) \\cdot V_\\mathrm{B} - m_\\mathrm{B}$$\n\n' +
            'där $m_\\mathrm{L}$ är massan för den maximala last som ballongen kan lyfta, ' +
            '$V_\\mathrm{B}$ är ballongens volym och $m_\\mathrm{B}$ är den tomma ballongens massa.\n\n' +
            'Din uppgift är att planera ett experiment där denna modell testas. Din planering ska vara så ' +
            'tydlig att en klasskamrat kan använda den för att genomföra experimentet.\n\n' +
            '**Förutsättningar**\n\n' +
            'Till din hjälp har du ballonger av samma sort (som blir klotformiga), heliumgas, en våg, ett ' +
            'måttband, snören och en uppsättning vikter samt en formelsamling.\n\n' +
            '**Planering**\n\n' +
            'Din planering ska innehålla:\n\n' +
            '- en kortfattad beskrivning av hur försöket ska genomföras,\n' +
            '- de mätningar som behöver utföras,\n' +
            '- en beskrivning av hur du genom att använda dina mätdata i ett diagram kan visa att ' +
            'modellen stämmer.',
        figur: null,
        steg: [
            {
                rubrik: 'Se efter vad modellen säger',
                varfor: 'Innan försöket planeras behöver vi veta vad som ska mätas och vad resultatet ska ' +
                    'jämföras med. Modellen kommer från kraftjämvikt: lyftkraften från den undanträngda ' +
                    'luften bär heliumet, ballongen och lasten.',
                text: 'När ballongen svävar med största möjliga last är lyftkraften lika stor som ' +
                    'tyngden av helium, ballong och last:\n\n' +
                    '$$\\rho_\\mathrm{luft} \\cdot V_\\mathrm{B} \\cdot g = ' +
                    '(\\rho_\\mathrm{He} \\cdot V_\\mathrm{B} + m_\\mathrm{B} + m_\\mathrm{L}) \\cdot g$$\n\n' +
                    'Dividerar vi bort $g$ och löser ut lasten får vi modellen ' +
                    '$m_\\mathrm{L} = (\\rho_\\mathrm{luft} - \\rho_\\mathrm{He}) \\cdot V_\\mathrm{B} - m_\\mathrm{B}$. ' +
                    'Den har samma form som en rät linje $y = k \\cdot x + m$:\n\n' +
                    '- $m_\\mathrm{L}$ som funktion av $V_\\mathrm{B}$ ska bli en **rät linje**,\n' +
                    '- linjens **lutning** ska vara $\\rho_\\mathrm{luft} - \\rho_\\mathrm{He}$,\n' +
                    '- linjen ska skära den lodräta axeln i $-m_\\mathrm{B}$.',
            },
            {
                rubrik: 'Väg den tomma ballongen',
                varfor: 'Ballongens egen massa $m_\\mathrm{B}$ är det värde som linjens skärning med den ' +
                    'lodräta axeln ska jämföras med. Den mäts en gång, innan ballongen fylls.',
                text: 'Väg en tom ballong, med det snöre som lasten ska hänga i, på vågen. Det ger ' +
                    '$m_\\mathrm{B}$.',
            },
            {
                rubrik: 'Fyll ballongen och mät dess volym',
                varfor: 'Volymen går inte att mäta direkt, men ballongen blir klotformig. Med måttbandet ' +
                    'mäter vi omkretsen $O$ runt ballongens bredaste del, och ur omkretsen räknas radien ' +
                    'och sedan klotets volym ut.',
                text: 'Fyll ballongen med helium och knyt den. Mät omkretsen $O$ med måttbandet runt ' +
                    'ballongens bredaste del. Volymen räknas ut ur omkretsen:\n\n' +
                    '$$r = \\dfrac{O}{2\\pi} \\qquad V_\\mathrm{B} = \\dfrac{4 \\pi r^3}{3}$$',
                figur: 'u18-s1',
            },
            {
                rubrik: 'Belasta ballongen tills den svävar',
                varfor: 'Modellen gäller den **största** last ballongen kan lyfta. Den lasten har vi hittat ' +
                    'när ballongen varken stiger eller sjunker, för då är lyftkraften och tyngden lika ' +
                    'stora.',
                text: 'Häng vikter i snöret och prova dig fram tills ballongen svävar, alltså varken ' +
                    'stiger eller sjunker. Väg lasten (vikterna) på vågen. Det ger $m_\\mathrm{L}$. ' +
                    'Anteckna $V_\\mathrm{B}$ och $m_\\mathrm{L}$ i en tabell.',
            },
            {
                rubrik: 'Gör en mätserie med olika stora ballonger',
                varfor: 'En enda mätpunkt kan inte visa att sambandet är linjärt. Vi behöver flera ' +
                    'volymer för att se om punkterna ligger på en rät linje.',
                text: 'Upprepa försöket med minst fem olika volymer: fyll ballongen med olika mycket ' +
                    'helium (eller använd flera ballonger av samma sort). Mät omkretsen och den last som ' +
                    'får ballongen att sväva varje gång.',
            },
            {
                rubrik: 'Rita diagrammet och anpassa en rät linje',
                varfor: 'Lasten ska vara funktion av volymen, eftersom modellen är skriven så. Då blir ' +
                    'lutningen och skärningen med den lodräta axeln direkt de storheter som modellen ' +
                    'förutsäger.',
                text: 'Avsätt $m_\\mathrm{L}$ på den lodräta axeln och $V_\\mathrm{B}$ på den vågräta. ' +
                    'Anpassa en rät linje till mätpunkterna, gärna med ett digitalt verktyg (linjär ' +
                    'regression). Väljs volymen i $\\mathrm{dm^3}$ (liter) och massan i gram får lutningen ' +
                    'enheten $\\mathrm{g/dm^3}$, som är samma sak som $\\mathrm{kg/m^3}$.',
                figur: 'u18-s2',
            },
            {
                rubrik: 'Jämför linjen med modellen',
                varfor: 'Modellen stämmer om tre saker gäller samtidigt: punkterna ligger på en rät linje, ' +
                    'lutningen stämmer med densitetsskillnaden ur formelsamlingen och skärningen stämmer ' +
                    'med den uppmätta ballongmassan.',
                text: 'Slå upp densiteterna i formelsamlingen:\n\n' +
                    '$$\\rho_\\mathrm{luft} - \\rho_\\mathrm{He} \\approx (1{,}29 - 0{,}18)\\ \\mathrm{kg/m^3} ' +
                    '= 1{,}11\\ \\mathrm{kg/m^3}$$\n\n' +
                    '- Ligger punkterna på en rät linje?\n' +
                    '- Är linjens lutning nära $1{,}11\\ \\mathrm{kg/m^3}$?\n' +
                    '- Skär linjen den lodräta axeln i $-m_\\mathrm{B}$, alltså minus den uppmätta ' +
                    'ballongmassan?\n\n' +
                    'Stämmer alla tre inom mätosäkerheten stöder försöket modellen.',
            },
        ],
        svar: 'Se planeringen i stegen: väg den tomma ballongen ($m_\\mathrm{B}$), fyll den med helium, mät ' +
            'omkretsen och räkna ut volymen $V_\\mathrm{B}$, häng på vikter tills ballongen svävar och väg ' +
            'lasten ($m_\\mathrm{L}$). Upprepa för minst fem volymer, rita $m_\\mathrm{L}$ som funktion av ' +
            '$V_\\mathrm{B}$ och anpassa en rät linje. Modellen stämmer om lutningen är ' +
            '$\\rho_\\mathrm{luft} - \\rho_\\mathrm{He} \\approx 1{,}11\\ \\mathrm{kg/m^3}$ och linjen skär ' +
            'den lodräta axeln i $-m_\\mathrm{B}$.',
        bedomning: [
            ['Eleven anger minst två storheter som behöver mätas (ballongens massa, ballongens ' +
                'omkrets/diameter eller lastens maximala massa) och beskriver hur minst två av dessa ' +
                'mätningar ska gå till', '+E'],
            ['Eleven beskriver hur experimentet ska genomföras där det framgår att ballongen belastas så ' +
                'att den svävar samt att volym och massa noteras', '+C'],
            ['Eleven anger att det krävs en mätserie med flera mätpunkter för att utvärdera sambandet ' +
                'mellan lastens maximala massa och ballongens volym och att en rät linje anpassas till ' +
                'dessa mätpunkter', '+C'],
            ['Eleven anger att en verifiering ska göras där den räta linjens lutning jämförs med ' +
                'tabellvärden för densiteterna samt jämför skärningen med lodrät axel med ballongens ' +
                'massa', '+A'],
            ['*Kommentar:* Det finns även andra metoder som är godtagbara.', ''],
        ],
    });

    // ================= UPPGIFT 19 =================
    P.uppgifter.push({
        nr: 19, del: 'A', poang: [0, 0, 2], omrade: 'Värme: avsvalning och effekt',
        genomgangar: ['fy1-6.2', 'fy1-4.5'],
        fraga: 'Ett litet akvarium fylls med 12 liter varmvatten. Vattnet blandas så att temperaturen är ' +
            'lika överallt. Det varma vattnet i akvariet får sedan svalna vilket visas i diagrammet.\n\n' +
            'För att hålla vattentemperaturen konstant på $30\\ \\mathrm{°C}$ tänker man använda en ' +
            'doppvärmare. Bestäm med hjälp av grafen hur stor effekt doppvärmaren behöver ha.',
        figur: 'u19',
        steg: [
            {
                rubrik: 'Se vad doppvärmaren ska ersätta',
                varfor: 'Vid $30\\ \\mathrm{°C}$ förlorar vattnet en viss energi per sekund till ' +
                    'omgivningen, och det är den förlusten som syns som en temperatursänkning i diagrammet. ' +
                    'Ska temperaturen stå still måste doppvärmaren tillföra exakt lika mycket energi per ' +
                    'sekund. Doppvärmarens effekt är alltså lika stor som vattnets förlusteffekt vid ' +
                    '$30\\ \\mathrm{°C}$.',
                text: 'Vi drar en jämn kurva genom mätpunkterna och letar upp punkten där temperaturen ' +
                    'är $30\\ \\mathrm{°C}$. Det sker ungefär $85$ minuter in i avsvalningen.',
                figur: 'u19-s1',
            },
            {
                rubrik: 'Rita tangenten vid 30 °C och läs av två punkter på den',
                varfor: 'Hur snabbt temperaturen sjunker just vid $30\\ \\mathrm{°C}$ är kurvans lutning i ' +
                    'den punkten, och lutningen i en punkt är tangentens lutning. Tangenten är rak, så ' +
                    'vi kan läsa av den över hela diagrammets bredd. Långt mellan avläsningarna ger ' +
                    'säkrare lutning.',
                text: 'Tangenten går genom punkterna $(0\\ \\mathrm{min};\\ 35{,}3\\ \\mathrm{°C})$ och ' +
                    '$(160\\ \\mathrm{min};\\ 25{,}4\\ \\mathrm{°C})$:\n\n' +
                    'Temperatursänkningen och tiden blir\n\n' +
                    '$$\\Delta T = (35{,}3 - 25{,}4)\\ \\mathrm{°C} = 9{,}9\\ \\mathrm{°C} \\qquad ' +
                    '\\Delta t = 160\\ \\mathrm{min} = 9\\,600\\ \\mathrm{s}$$\n\n' +
                    'Vattnet svalnar alltså $9{,}9\\ \\mathrm{°C}$ på $9\\,600\\ \\mathrm{s}$ i den takt det ' +
                    'har vid $30\\ \\mathrm{°C}$. En temperaturskillnad på $1\\ \\mathrm{°C}$ är lika stor som ' +
                    '$1\\ \\mathrm{K}$.',
                figur: 'u19-s2',
            },
            {
                rubrik: 'Ställ upp effekten som energi per tid',
                varfor: 'Effekt är energi per tidsenhet. Energin som vattnet avger när det svalnar ges ' +
                    'av $E = c \\cdot m \\cdot \\Delta T$, och sätter vi in den i effektens definition får ' +
                    'vi ett samband där temperaturens sänkning per tid ingår direkt.',
                text: '$$P = \\dfrac{\\Delta E}{\\Delta t} = \\dfrac{c \\cdot m \\cdot \\Delta T}{\\Delta t}$$',
            },
            {
                rubrik: 'Sätt in värdena',
                varfor: 'Vattnets massa får vi ur volymen: en liter vatten väger ett kilogram. ' +
                    'Vattnets specifika värmekapacitet står i formelsamlingen. Vi räknar med beloppet ' +
                    'av temperaturändringen, alltså temperatursänkningen, eftersom vi söker hur mycket ' +
                    'energi som ska tillföras.',
                text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'c \\approx 4\\,180\\ \\mathrm{J/(kg \\cdot K)}\\ \\text{(vattnets specifika värmekapacitet)} \\\\ ' +
                    'm = 12\\ \\mathrm{kg}\\ \\text{(12 liter vatten)} \\\\ ' +
                    '\\Delta T = (35{,}3 - 25{,}4)\\ \\mathrm{°C} = 9{,}9\\ \\mathrm{°C} = 9{,}9\\ \\mathrm{K}\\ \\text{(avläst)} \\\\ ' +
                    '\\Delta t = 160\\ \\mathrm{min} = 9\\,600\\ \\mathrm{s}\\ \\text{(avläst)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$P = \\dfrac{4\\,180 \\cdot 12 \\cdot 9{,}9}{9\\,600}\\ \\mathrm{W} = 51{,}7275\\ \\mathrm{W} ' +
                    '\\approx 52\\ \\mathrm{W}$$',
            },
            {
                rubrik: 'Bedöm svaret',
                varfor: 'En tangent ritas för hand och lutningen blir därför ungefärlig. ' +
                    'Bedömningsanvisningarna läser av en något brantare tangent ($11\\ \\mathrm{°C}$ på ' +
                    '$9\\,600\\ \\mathrm{s}$) och får $57\\ \\mathrm{W}$, cirka $60\\ \\mathrm{W}$. En ' +
                    'kurva anpassad till mätpunkterna ger en sänkning på ungefär $9{,}9$–$10{,}2\\ \\mathrm{°C}$ ' +
                    'på $160$ minuter. Svaret beror alltså på hur tangenten ritas.',
                text: 'En vanlig akvarievärmare för ett litet akvarium har en effekt på några tiotal watt, ' +
                    'så omkring $50\\ \\mathrm{W}$ är rimligt.',
            },
        ],
        svar: 'Doppvärmaren behöver ha effekten cirka $52\\ \\mathrm{W}$. (Bedömningsanvisningarna läser ' +
            'av en brantare tangent och får $57\\ \\mathrm{W}$, cirka $60\\ \\mathrm{W}$; svaret beror på hur ' +
            'tangenten ritas.)',
        bedomning: [
            ['Godtagbar ansats, till exempel beräknar temperatursänkningen per sekund i ett intervall ' +
                'godtagbart kring $30\\ \\mathrm{°C}$', '+A'],
            ['med i övrigt godtagbar lösning och svar (cirka $60\\ \\mathrm{W}$)', '+A'],
        ],
    });

    // ================= UPPGIFT 20 =================
    P.uppgifter.push({
        nr: 20, del: 'A', poang: [0, 0, 2], omrade: 'Storheter och enheter: enhetsanalys',
        genomgangar: ['fy1-1.2', 'fy1-3.2'],
        fraga: 'Nedanstående formel används för att beräkna hur lång tid det tar för en vätska att sugas ' +
            'in i ett kapillärt ämne (till exempel tiden för kaffe att sugas in i ett kex).\n\n' +
            '$$t = \\dfrac{4 L^2 \\eta}{s D}$$\n\n' +
            'där $L$ är hur långt vätskan trängt in i kapillären, $s$ är ytspänningen för vätskan mätt i ' +
            'newton per meter, $D$ är diametern på porerna och $\\eta$ är den så kallade viskositeten. ' +
            'Viskositeten kan ses som ett mått på friktionen i vätskan.\n\n' +
            'Vilka två av alternativen A–E visar enheten för viskositet? Visa hur du kommer fram till ' +
            'dina svar.\n\n' +
            'A. $\\mathrm{Ns/m^2}$<br>' +
            'B. $\\mathrm{Ns/m}$<br>' +
            'C. $\\mathrm{kg/s^2}$<br>' +
            'D. $\\mathrm{kg/(m \\cdot s)}$<br>' +
            'E. $\\mathrm{kg/s}$',
        figur: null,
        steg: [
            {
                rubrik: 'Lös ut viskositeten ur formeln',
                varfor: 'Enheten för $\\eta$ får vi genom att sätta in de andra storheternas enheter. ' +
                    'Därför löser vi först ut $\\eta$. Vi multiplicerar båda led med $s \\cdot D$ och ' +
                    'dividerar sedan båda led med $4 L^2$.',
                text: '$$t = \\dfrac{4 L^2 \\eta}{s D} \\quad \\Longleftrightarrow \\quad ' +
                    't \\cdot s \\cdot D = 4 L^2 \\eta \\quad \\Longleftrightarrow \\quad ' +
                    '\\eta = \\dfrac{s \\cdot D \\cdot t}{4 L^2}$$',
            },
            {
                rubrik: 'Sätt in enheterna',
                varfor: 'Talet $4$ saknar enhet och påverkar därför inte enheten. Ytspänningen mäts i ' +
                    'newton per meter, diametern och inträngningslängden i meter och tiden i sekunder. ' +
                    'Hakparentesen betyder "enheten för".',
                text: '$$[\\eta] = \\dfrac{\\dfrac{\\mathrm{N}}{\\mathrm{m}} \\cdot \\mathrm{m} \\cdot \\mathrm{s}}' +
                    '{\\mathrm{m^2}} = \\dfrac{\\mathrm{N \\cdot s}}{\\mathrm{m^2}}$$\n\n' +
                    'Det är alternativ **A**, $\\mathrm{Ns/m^2}$.',
            },
            {
                rubrik: 'Skriv newton i grundenheter',
                varfor: 'Övriga alternativ är skrivna med kilogram i stället för newton. Newtons andra lag ' +
                    '$F = m \\cdot a$ visar vad en newton är i grundenheter: kilogram gånger meter per ' +
                    'sekundkvadrat.',
                text: '$$[F] = [m] \\cdot [a] \\quad \\Longrightarrow \\quad ' +
                    '\\mathrm{N} = \\mathrm{kg} \\cdot \\dfrac{\\mathrm{m}}{\\mathrm{s^2}}$$\n\n' +
                    'Insatt i enheten för viskositeten:\n\n' +
                    '$$[\\eta] = \\dfrac{\\mathrm{N \\cdot s}}{\\mathrm{m^2}} = ' +
                    '\\dfrac{\\dfrac{\\mathrm{kg \\cdot m}}{\\mathrm{s^2}} \\cdot \\mathrm{s}}{\\mathrm{m^2}} = ' +
                    '\\dfrac{\\mathrm{kg}}{\\mathrm{m \\cdot s}}$$\n\n' +
                    'Det är alternativ **D**, $\\mathrm{kg/(m \\cdot s)}$.',
            },
            {
                rubrik: 'Kontrollera de andra alternativen',
                varfor: 'Uppgiften frågar efter exakt två alternativ. En snabb kontroll visar att de ' +
                    'övriga inte kan skrivas om till samma sak.',
                text: 'B ($\\mathrm{Ns/m}$) har en meter för lite i nämnaren, C ($\\mathrm{kg/s^2}$) är ' +
                    'enheten för ytspänningen själv, $\\mathrm{N/m}$, och E ($\\mathrm{kg/s}$) saknar meter ' +
                    'helt. Ingen av dem är lika med $\\mathrm{kg/(m \\cdot s)}$.',
            },
        ],
        svar: 'Alternativ **A** ($\\mathrm{Ns/m^2}$) och alternativ **D** ($\\mathrm{kg/(m \\cdot s)}$). ' +
            'Ur $\\eta = \\dfrac{s \\cdot D \\cdot t}{4 L^2}$ fås enheten $\\dfrac{\\mathrm{(N/m) \\cdot m \\cdot s}}' +
            '{\\mathrm{m^2}} = \\mathrm{Ns/m^2}$, och med $\\mathrm{N} = \\mathrm{kg \\cdot m/s^2}$ blir det ' +
            '$\\mathrm{kg/(m \\cdot s)}$.',
        bedomning: [
            ['Godtagbar redovisning för ett av de korrekta alternativen (A eller D)', '+A'],
            ['med godtagbar redovisning för ytterligare ett korrekt alternativ (A och D)', '+A'],
        ],
    });

    // ================= UPPGIFT 21 =================
    P.uppgifter.push({
        nr: 21, del: 'A', poang: [0, 1, 4], omrade: 'Kärnfysik: sönderfall, aktivitet och stråldos',
        genomgangar: ['fy1-9.4', 'fy1-9.3', 'fy1-9.5'],
        fraga: 'Varje år görs tiotals miljoner undersökningar i världen med hjälp av radioaktiva isotoper ' +
            'av grundämnet teknetium. Det kan till exempel användas för att mäta hur stor volym blod en ' +
            'människa har.\n\n' +
            'Teknetiumisotopen Tc-99 produceras genom att molybdenisotopen Mo-99 sönderfaller.\n\n' +
            '**a)** Skriv reaktionsformeln för sönderfallet av Mo-99.\n\n' +
            'En kortlivad exciterad isotop av Tc-99 med halveringstiden $6{,}0058\\ \\mathrm{h}$ ' +
            'deexciteras till grundtillståndet genom att sända ut en foton med energin ' +
            '$140\\ \\mathrm{keV}$. Sönderfallskonstanten är $3{,}2059 \\cdot 10^{-5}\\ \\mathrm{s^{-1}}$.\n\n' +
            'Vid ett tillfälle sprutade en läkare in $0{,}10\\ \\mathrm{ml}$ av en teknetiumlösning med ' +
            'aktiviteten $48\\ \\mathrm{MBq/ml}$ i en ven. Åtta timmar senare togs ett blodprov på ' +
            'patienten som visade sig ha aktiviteten $386\\ \\mathrm{Bq/ml}$.\n\n' +
            '**b)** Hur stor volym blod har patienten?\n\n' +
            '**c)** Uppskatta hur stor absorberad stråldos patienten fick under dessa åtta timmar. ' +
            'Patienten väger $75\\ \\mathrm{kg}$. Anta att $90\\ \\%$ av strålningen absorberas av ' +
            'patientens kropp.\n\n' +
            '$D$ = absorberad stråldos<br>$E$ = absorberad strålningsenergi<br>$m$ = massa<br><br>' +
            '$D = \\dfrac{E}{m}$&emsp;Enhet $1\\ \\mathrm{Gy}$ (gray) $= 1\\ \\mathrm{J/kg}$',
        figur: null,
        steg: [
            {
                del: 'a',
                rubrik: 'Bestäm sönderfallstypen',
                varfor: 'Molybden har atomnumret $42$ och teknetium $43$. Masstalet $99$ är detsamma ' +
                    'före och efter. Atomnumret ökar alltså med ett medan antalet nukleoner är oförändrat. ' +
                    'Det händer vid β⁻-sönderfall, där en neutron blir en proton och en elektron sänds ut.',
                text: 'Mo-99 sönderfaller med β⁻-sönderfall till Tc-99.',
            },
            {
                del: 'a',
                rubrik: 'Skriv reaktionsformeln',
                varfor: 'Masstalen och atomnumren ska summera till samma värde på båda sidor om pilen: ' +
                    '$99 = 99 + 0$ och $42 = 43 + (-1)$. Vid β⁻-sönderfall sänds också en antineutrino ' +
                    '$\\bar{\\nu}$ ut. I teorigenomgången skrivs den förenklat $\\nu$.',
                text: '$${}_{42}^{99}\\mathrm{Mo} \\rightarrow {}_{43}^{99}\\mathrm{Tc} + ' +
                    '{}_{-1}^{\\ \\ 0}\\mathrm{e} + \\bar{\\nu}$$',
                delsvar: { del: 'a', text: '${}_{42}^{99}\\mathrm{Mo} \\rightarrow {}_{43}^{99}\\mathrm{Tc} + ' +
                    '{}_{-1}^{\\ \\ 0}\\mathrm{e} + \\bar{\\nu}$' },
            },
            {
                del: 'b',
                rubrik: 'Beräkna aktiviteten som sprutades in',
                varfor: 'Lösningen har aktiviteten $48\\ \\mathrm{MBq}$ per milliliter, och läkaren sprutade ' +
                    'in $0{,}10\\ \\mathrm{ml}$. Den totala aktiviteten vid starten är därför en tiondel ' +
                    'av $48\\ \\mathrm{MBq}$.',
                text: '$$A_0 = 0{,}10\\ \\mathrm{ml} \\cdot 48\\ \\mathrm{MBq/ml} = 4{,}8\\ \\mathrm{MBq}$$',
            },
            {
                del: 'b',
                rubrik: 'Beräkna aktiviteten efter åtta timmar',
                varfor: 'Under åtta timmar sönderfaller en del av teknetiumet, och aktiviteten avtar enligt ' +
                    'sönderfallslagen. Åtta timmar är lite mer än en halveringstid, så knappt hälften av ' +
                    'aktiviteten finns kvar. Tiderna behålls i timmar: bara kvoten mellan tiden och ' +
                    'halveringstiden ingår i exponenten, och den blir densamma i vilken tidsenhet som helst.',
                text: '$$A = A_0 \\cdot 0{,}5^{t / T_{1/2}}$$\n\n' +
                    'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'A_0 = 4{,}8\\ \\mathrm{MBq} = 4{,}8 \\cdot 10^{6}\\ \\mathrm{Bq}\\ \\text{(beräknad ovan)} \\\\ ' +
                    't = 8\\ \\mathrm{h} \\\\ ' +
                    'T_{1/2} = 6{,}0058\\ \\mathrm{h} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$A = 4{,}8 \\cdot 10^{6} \\cdot 0{,}5^{8 / 6{,}0058}\\ \\mathrm{Bq} = ' +
                    '1\\,906\\,582{,}17\\ldots\\ \\mathrm{Bq}$$',
                figur: 'u21-s1',
            },
            {
                del: 'b',
                rubrik: 'Dela med aktiviteten per milliliter blod',
                varfor: 'Efter åtta timmar har teknetiumet blandats jämnt i hela blodet. Hela aktiviteten ' +
                    '$A$ är då utspädd så att varje milliliter blod har $386\\ \\mathrm{Bq}$. Antalet ' +
                    'milliliter blod är därför $A$ delat med $386\\ \\mathrm{Bq/ml}$.',
                text: '$$V = \\dfrac{A}{386\\ \\mathrm{Bq/ml}} = \\dfrac{1\\,906\\,582{,}17\\ldots}{386}\\ \\mathrm{ml} = ' +
                    '4\\,939{,}33\\ldots\\ \\mathrm{ml} \\approx 4\\,900\\ \\mathrm{ml} = 4{,}9\\ \\mathrm{liter}$$\n\n' +
                    'Svaret avrundas till två värdesiffror, som $0{,}10\\ \\mathrm{ml}$ och ' +
                    '$48\\ \\mathrm{MBq/ml}$. En vuxen människa har ungefär fem liter blod, så svaret är ' +
                    'rimligt.',
                delsvar: { del: 'b', text: 'Patienten har ungefär $4{,}9$ liter blod.' },
            },
            {
                del: 'c',
                rubrik: 'Ställ upp antalet sönderfall',
                varfor: 'Varje sönderfall sänder ut en foton på $140\\ \\mathrm{keV}$, så vi behöver veta ' +
                    'hur många kärnor som sönderfallit under de åtta timmarna. Det är antalet kärnor vid ' +
                    'starten minus antalet efter åtta timmar. Aktiviteten är antalet kärnor gånger ' +
                    'sönderfallskonstanten, $A = \\lambda \\cdot N$, så antalet kärnor är ' +
                    '$N = \\dfrac{A}{\\lambda}$.',
                text: '$$\\Delta N = N_0 - N = \\dfrac{A_0}{\\lambda} - \\dfrac{A}{\\lambda} = ' +
                    '\\dfrac{A_0 - A}{\\lambda}$$',
            },
            {
                del: 'c',
                rubrik: 'Beräkna antalet sönderfall',
                varfor: 'Båda aktiviteterna har vi från b), och sönderfallskonstanten står i uppgiften. ' +
                    'Aktiviteten i becquerel är sönderfall per sekund och konstanten har enheten ' +
                    '$\\mathrm{s^{-1}}$, så kvoten blir ett rent antal.',
                text: 'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'A_0 = 4{,}8 \\cdot 10^{6}\\ \\mathrm{Bq}\\ \\text{(beräknad ovan)} \\\\ ' +
                    'A = 1\\,906\\,582{,}17\\ldots\\ \\mathrm{Bq}\\ \\text{(beräknad ovan)} \\\\ ' +
                    '\\lambda = 3{,}2059 \\cdot 10^{-5}\\ \\mathrm{s^{-1}}\\ \\text{(givet)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$\\Delta N = \\dfrac{4{,}8 \\cdot 10^{6} - 1\\,906\\,582{,}17\\ldots}{3{,}2059 \\cdot 10^{-5}} = ' +
                    '9{,}0252\\ldots \\cdot 10^{10}$$\n\n' +
                    '(Det är skillnaden mellan $N_0 = 1{,}4972\\ldots \\cdot 10^{11}$ kärnor vid starten och ' +
                    '$N = 5{,}9471\\ldots \\cdot 10^{10}$ kärnor efter åtta timmar.)',
            },
            {
                del: 'c',
                rubrik: 'Beräkna den absorberade energin',
                varfor: 'Varje sönderfall ger en foton med energin $140\\ \\mathrm{keV}$, och $90\\ \\%$ av ' +
                    'energin stannar i kroppen. Fotonenergin görs om till joule med elementarladdningen, ' +
                    '$1\\ \\mathrm{eV} \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$, så att dosen sedan ' +
                    'kommer ut i gray.',
                text: '$$E = 0{,}90 \\cdot \\Delta N \\cdot E_\\mathrm{f}$$\n\n' +
                    'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    '\\Delta N = 9{,}0252\\ldots \\cdot 10^{10}\\ \\text{(beräknad ovan)} \\\\ ' +
                    'E_\\mathrm{f} = 140\\ \\mathrm{keV} = 140 \\cdot 10^{3} \\cdot 1{,}602 \\cdot 10^{-19}\\ \\mathrm{J} = ' +
                    '2{,}2428 \\cdot 10^{-14}\\ \\mathrm{J}\\ \\text{(fotonens energi)} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$E = 0{,}90 \\cdot 9{,}0252\\ldots \\cdot 10^{10} \\cdot 2{,}2428 \\cdot 10^{-14}\\ \\mathrm{J} = ' +
                    '1{,}8217\\ldots \\cdot 10^{-3}\\ \\mathrm{J}$$',
            },
            {
                del: 'c',
                rubrik: 'Beräkna den absorberade dosen',
                varfor: 'Den absorberade dosen är den absorberade energin per kilogram kropp, ' +
                    '$D = \\dfrac{E}{m}$, enligt rutan i uppgiften.',
                text: '$$D = \\dfrac{E}{m}$$\n\n' +
                    'Mätvärden:\n\n' +
                    '$$\\left[ \\begin{array}{l} ' +
                    'E = 1{,}8217\\ldots \\cdot 10^{-3}\\ \\mathrm{J}\\ \\text{(beräknad ovan)} \\\\ ' +
                    'm = 75\\ \\mathrm{kg} ' +
                    '\\end{array} \\right]$$\n\n' +
                    '$$D = \\dfrac{1{,}8217\\ldots \\cdot 10^{-3}}{75}\\ \\mathrm{Gy} = 2{,}4290\\ldots \\cdot 10^{-5}\\ \\mathrm{Gy} ' +
                    '\\approx 24 \\cdot 10^{-6}\\ \\mathrm{Gy} = 24\\ \\mathrm{µGy}$$',
            },
            {
                del: 'c',
                rubrik: 'Bedöm svaret',
                varfor: 'Patientens massa och andelen $90\\ \\%$ har två värdesiffror, så dosen avrundas till ' +
                    'två värdesiffror.',
                text: 'Gränsen för akut strålningssjuka går vid $1\\ \\mathrm{Gy}$. Den gränsen är mer ' +
                    'än fyrtiotusen gånger så stor som dosen $24\\ \\mathrm{µGy}$, vilket är rimligt för ' +
                    'en medicinsk undersökning som ska vara ofarlig.',
                delsvar: { del: 'c', text: 'Den absorberade dosen är cirka $24\\ \\mathrm{µGy}$.' },
            },
        ],
        svar: 'a) ${}_{42}^{99}\\mathrm{Mo} \\rightarrow {}_{43}^{99}\\mathrm{Tc} + {}_{-1}^{\\ \\ 0}\\mathrm{e} + ' +
            '\\bar{\\nu}$ (β⁻-sönderfall). b) Cirka $4{,}9$ liter blod. c) Cirka $24\\ \\mathrm{µGy}$.',
        bedomning: [
            ['a) Korrekt svar (${}_{42}^{99}\\mathrm{Mo} \\rightarrow {}_{43}^{99}\\mathrm{Tc} + ' +
                '{}_{-1}^{\\ \\ 0}\\mathrm{e} + \\bar{\\nu}$). Poängen ges även om $\\bar{\\nu}$ utelämnas.', '+C'],
            ['b) Godtagbar ansats, till exempel beräknar aktiviteten efter 8 h, $1{,}907\\ \\mathrm{MBq}$', '+A'],
            ['med i övrigt godtagbar lösning och svar ($4{,}9$ liter)', '+A'],
            ['c) Godtagbar ansats, till exempel beräknar antal sönderfall under 8 h, ' +
                '$\\Delta N \\approx 9{,}025 \\cdot 10^{10}$ st', '+A'],
            ['med i övrigt godtagbar lösning och svar ($24\\ \\mathrm{µGy}$)', '+A'],
        ],
    });
})();
