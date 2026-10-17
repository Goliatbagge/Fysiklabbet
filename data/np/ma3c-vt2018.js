// Fysiklabbet — Nationellt prov Matematik 3c, våren 2018.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Provet skrevs enligt ämnesplanen från 2011. Kursen Matematik 3c motsvarar
// dagens "Matematik fortsättning nivå 1c". Uppgifter på stoff som utgick vid
// revideringen 2021 är märkta med `utgatt`: bara uppgift 11 (cirkelns
// ekvation, som stod i Ma 3c 2011–2021; se Styrdokument/Gy11-matematik/). Det muntliga delprovet A ingår
// inte här. Källa: Skolverket/Umeå universitet. Provet är frisläppt och
// återanvänds inte.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma3c-vt2018'] = {
    id: 'ma3c-vt2018',
    kurs: 'Matematik fortsättning nivå 1c',
    termin: 'VT 2018',
    namn: 'Nationellt prov Ma 3c, våren 2018',
    kort: 'NP Ma 3c VT 2018',
    intro: 'Det här är det nationella provet i Matematik 3c (dagens Matematik fortsättning ' +
        'nivå 1c) från våren 2018 (Skolverket/Umeå universitet). Provet är frisläppt och ' +
        'återanvänds inte, och här finns de tre skriftliga delproven B, C och D. Provet skrevs ' +
        'enligt ämnesplanen från 2011; den enda uppgiften på stoff som utgick vid revideringen ' +
        '2021 (cirkelns ekvation i uppgift 11) är märkt. Välj en uppgift, lös den själv, och klicka sedan fram ' +
        'lösningen ett steg i taget. Varje steg förklarar både vad som görs och varför, ' +
        'figurerna byggs upp i takt med lösningen och varje uppgift kan också följas som en ' +
        'pennlösning.',
    kravgranser: 'De skriftliga delproven B–D ger totalt 57 poäng varav 21 E-, 21 C- och 15 A-poäng. ' +
        'Poängen skrivs (E/C/A). Till exempel betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
        '1 A-poäng. Provbetyget räknades på hela provet, inklusive det muntliga delprovet A, som ' +
        'tillsammans gav 64 poäng varav 24 E-, 22 C- och 18 A-poäng. Gräns för provbetyget: ' +
        'E minst 18 poäng · D minst 27 poäng varav 7 på minst C-nivå · C minst 34 poäng varav ' +
        '13 på minst C-nivå · B minst 43 poäng varav 6 på A-nivå · A minst 50 poäng varav 10 ' +
        'på A-nivå.',
    delprov: {
        B: {
            tid: '120 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 1–11. Endast svar krävs.',
        },
        C: {
            tid: '120 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 12–19. Fullständiga lösningar krävs.',
        },
        D: {
            tid: '120 minuter',
            hjalpmedel: 'Digitala verktyg, formelblad och linjal',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Uppgift 20–28. Fullständiga lösningar krävs.',
        },
    },
    // Uppgifterna läggs in nedan, ett block per delprov (B, C, D).
    uppgifter: [],
};

// Fysiklabbet: Nationellt prov Matematik 3c, våren 2018, DELPROV B
// (uppgift 1–11, endast svar krävs). Uppgifterna läggs till i provet som
// definieras i data/np/ma3c-vt2018.js.
//
// Dataformat och regler: se data/np/RIKTLINJER.md. Figurerna genereras av
// .claude/np-figs/gen-ma3c-vt2018-B.js → data/np/ma3c-vt2018-figurer-B.js,
// pennlösningarna finns i data/np/ma3c-vt2018-delB-penna.js (samma siffror
// som här). Svar och poängkrav följer provets bedömningsanvisningar.

(function () {
    var P = window.NP_PROV && window.NP_PROV['ma3c-vt2018'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [2, 0, 0], omrade: 'Derivata: deriveringsregler',
            genomgangar: ['ma3c-3.2', 'ma3c-3.5'],
            endastSvar: true,
            fraga: 'Derivera<br>' +
                '**a)** $f(x) = x^4 + 5x^2 - 3$<br>' +
                '**b)** $f(x) = 8\\mathrm{e}^{2x}$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Derivera term för term med potensregeln',
                    varfor: 'Potensregeln: $x^n$ har derivatan $n \\cdot x^{n-1}$. En konstant faktor ' +
                        'följer med, och varje term deriveras för sig. Konstanten $-3$ ändrar sig aldrig, ' +
                        'så dess derivata är $0$.',
                    text: '$$f\'(x) = 4x^3 + 5 \\cdot 2x - 0 = 4x^3 + 10x$$',
                    delsvar: { del: 'a', text: '$f\'(x) = 4x^3 + 10x$' },
                },
                {
                    del: 'b',
                    rubrik: 'Använd deriveringsregeln för e upphöjt till kx',
                    varfor: 'Funktionen $\\mathrm{e}^{kx}$ har derivatan $k \\cdot \\mathrm{e}^{kx}$. Här är ' +
                        '$k = 2$, och den konstanta faktorn $8$ följer med.',
                    text: '$$f\'(x) = 8 \\cdot 2\\mathrm{e}^{2x} = 16\\mathrm{e}^{2x}$$',
                    delsvar: { del: 'b', text: '$f\'(x) = 16\\mathrm{e}^{2x}$' },
                },
            ],
            svar: '**a)** $f\'(x) = 4x^3 + 10x$&emsp;&emsp;**b)** $f\'(x) = 16\\mathrm{e}^{2x}$',
            bedomning: [
                ['a) Korrekt svar ($f\'(x) = 4x^3 + 10x$)', '+E'],
                ['b) Korrekt svar ($f\'(x) = 16\\mathrm{e}^{2x}$)', '+E'],
            ],
        },

        {
            nr: 2, del: 'B', poang: [2, 0, 0], omrade: 'Derivata: tangent och sekant',
            genomgangar: ['ma3c-2.2', 'ma3c-2.1'],
            endastSvar: true,
            fraga: 'Figuren visar grafen till en fjärdegradsfunktion $f$ och fem räta linjer ' +
                '$A$–$E$. Linjerna $D$ och $E$ är parallella med $y$-axeln.<br>' +
                '**a)** En av linjerna $A$–$E$ är en tangent till funktionens graf. Vilken?<br>' +
                '**b)** En av linjerna $A$–$E$ är en sekant till funktionens graf. Vilken?',
            figur: 'u2',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Leta efter linjen som snuddar grafen',
                    varfor: 'En tangent är en linje som snuddar (tangerar) kurvan i en punkt och där har ' +
                        'samma lutning som kurvan. Den skär inte rakt igenom kurvan där den möter den.',
                    text: 'Linjen $B$ snuddar grafen i en punkt strax till höger om den högra toppen. ' +
                        'Där har linjen och kurvan samma lutning, och på båda sidor om punkten ligger ' +
                        'kurvan under linjen.',
                    figur: 'u2-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Uteslut de andra linjerna',
                    varfor: 'Det räcker inte att hitta en kandidat. Vi kontrollerar att ingen annan linje ' +
                        'också passar in på beskrivningen.',
                    text: '$C$ når aldrig fram till grafen. $A$ skär rakt igenom grafen i två punkter. ' +
                        '$D$ och $E$ är lodräta och skär grafen i en punkt var. Ingen av dem snuddar ' +
                        'grafen, så $B$ är den enda tangenten.',
                    delsvar: { del: 'a', text: 'Linjen $B$' },
                },
                {
                    del: 'b',
                    rubrik: 'Leta efter linjen som går genom två punkter på grafen',
                    varfor: 'En sekant är en rät linje som går genom två punkter på kurvan. Vi letar alltså ' +
                        'efter en linje som skär grafen i två punkter.',
                    text: 'Linjen $A$ skär grafen två gånger: en gång där grafen stiger till vänster och en ' +
                        'gång där den faller till höger. $A$ är en sekant.',
                    figur: 'u2-s2',
                },
                {
                    del: 'b',
                    rubrik: 'Kontrollera de lodräta linjerna',
                    varfor: 'Linjerna $D$ och $E$ kan se ut att kunna vara sekanter, men en lodrät linje ' +
                        'träffar grafen till en funktion i högst en punkt: varje $x$-värde har bara ett ' +
                        'funktionsvärde.',
                    text: '$D$ och $E$ skär grafen i bara en punkt var, så de är inga sekanter. ' +
                        'Svaret är $A$.',
                    delsvar: { del: 'b', text: 'Linjen $A$' },
                },
            ],
            svar: '**a)** $B$&emsp;&emsp;**b)** $A$',
            bedomning: [
                ['a) Korrekt svar ($B$)', '+E'],
                ['b) Korrekt svar ($A$)', '+E'],
            ],
        },

        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Derivata: hastighet som derivata',
            genomgangar: ['ma3c-3.6', 'ma3c-3.2'],
            endastSvar: true,
            fraga: 'En bil startar och kör iväg. Sträckan som bilen kör under de första sekunderna ' +
                'kan beskrivas med sambandet $s(t) = 0{,}75t^2$ där $s(t)$ är sträckan i meter och ' +
                '$t$ är tiden i sekunder.<br>' +
                'Bestäm bilens hastighet vid tiden $t = 3$ sekunder.',
            figur: null,
            steg: [
                {
                    rubrik: 'Hastigheten är sträckans derivata',
                    varfor: 'Hastighet är hur snabbt sträckan ändras med tiden, alltså förändrings' +
                        'hastigheten för $s(t)$. Den får vi genom att derivera $s(t)$. Enheten blir ' +
                        'meter per sekund.',
                    text: '$$s\'(t) = 0{,}75 \\cdot 2t = 1{,}5t$$',
                },
                {
                    rubrik: 'Sätt in t = 3',
                    varfor: 'Vi vill veta hastigheten just vid tiden $3$ sekunder, så vi sätter in ' +
                        '$t = 3$ i derivatan.',
                    text: '$$s\'(3) = 1{,}5 \\cdot 3 = 4{,}5$$\n\n' +
                        'Rimligt: bilen accelererar från stillastående, och $4{,}5\\ \\mathrm{m/s}$ är ' +
                        'ungefär $16\\ \\mathrm{km/h}$ efter tre sekunder.',
                },
            ],
            svar: '$4{,}5\\ \\mathrm{m/s}$',
            bedomning: [['Korrekt svar ($4{,}5\\ \\mathrm{m/s}$)', '+E']],
        },

        {
            nr: 4, del: 'B', poang: [1, 0, 0], omrade: 'Trigonometri: enhetscirkeln',
            genomgangar: ['ma3c-6.2', 'ma3c-6.3'],
            endastSvar: true,
            fraga: 'Figurerna A–F visar enhetscirklar där en vinkel $v$ är markerad.<br>' +
                'Två av figurerna A–F visar en vinkel $v$ där $\\cos v = -0{,}5$. Vilka två?',
            figur: 'u4',
            steg: [
                {
                    rubrik: 'Tolka cos v som en x-koordinat',
                    varfor: 'På enhetscirkeln är $\\cos v$ den $x$-koordinat där vinkelns vridna ben ' +
                        'skär cirkeln. Vi letar alltså efter de punkter på cirkeln som har ' +
                        '$x = -0{,}5$.',
                    text: '$$\\cos v = -0{,}5 \\quad \\Longleftrightarrow \\quad x = -0{,}5$$\n\n' +
                        'Den lodräta linjen $x = -0{,}5$ skär cirkeln i två punkter: en ovanför och en ' +
                        'nedanför $x$-axeln.',
                    figur: 'u4-s1',
                },
                {
                    rubrik: 'Bestäm vinklarna till de två punkterna',
                    varfor: 'Vinkeln mäts moturs från den positiva $x$-axeln. Punkten ovanför $x$-axeln ' +
                        'ligger vid $120\\degree$, eftersom $\\cos 60\\degree = 0{,}5$ och $120\\degree$ ' +
                        'är $60\\degree$ från den negativa $x$-axeln. Punkten nedanför är dess spegelbild ' +
                        'i $x$-axeln: $360\\degree - 120\\degree = 240\\degree$.',
                    text: '$$v = 120\\degree \\qquad \\text{och} \\qquad v = 240\\degree$$',
                },
                {
                    rubrik: 'Jämför med figurerna',
                    varfor: 'Skalstrecken på axlarna sitter vid $\\pm 0{,}5$. Vi ser efter vilka figurer ' +
                        'som har det vridna benet rakt ovanför eller rakt nedanför strecket vid ' +
                        '$x = -0{,}5$.',
                    text: '**A:** benet ovanför $x = -0{,}5$, $v = 120\\degree$. Stämmer.\n\n' +
                        '**D:** benet nedanför $x = -0{,}5$, $v = 240\\degree$. Stämmer.\n\n' +
                        '**B** och **C** har benet vid $x \\approx -0{,}87$ ($v = 150\\degree$ och ' +
                        '$210\\degree$), och **E** och **F** har positiva $x$-koordinater ($v = 300\\degree$ ' +
                        'och $330\\degree$).',
                },
            ],
            svar: 'A och D',
            bedomning: [['Korrekt svar (A och D)', '+E']],
        },

        {
            nr: 5, del: 'B', poang: [0, 2, 0], omrade: 'Derivata: derivatans definition',
            genomgangar: ['ma3c-2.3'],
            endastSvar: true,
            fraga: 'Elvira ska bestämma derivatan för funktionen $f$ då $x = 4$. Hon använder ' +
                'derivatans definition och tecknar korrekt följande gränsvärde\n\n' +
                '$$f\'(4) = \\lim_{h \\to 0} \\frac{(4 + h)^2 - 4^2}{h}$$\n\n' +
                '**a)** Bestäm $f\'(4)$.<br>' +
                '**b)** Vilken är funktionen $f$?',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Utveckla kvadraten i täljaren',
                    varfor: 'Vi kan inte sätta $h = 0$ direkt, för då blir nämnaren noll. Först ' +
                        'förenklar vi. Kvadreringsregeln ger $(4 + h)^2 = 16 + 8h + h^2$.',
                    text: '$$f\'(4) = \\lim_{h \\to 0} \\frac{16 + 8h + h^2 - 16}{h} = ' +
                        '\\lim_{h \\to 0} \\frac{8h + h^2}{h}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Bryt ut h och förkorta',
                    varfor: 'Båda termerna i täljaren innehåller $h$. Bryter vi ut $h$ kan det förkortas ' +
                        'mot nämnaren, och då försvinner problemet med division med noll.',
                    text: '$$f\'(4) = \\lim_{h \\to 0} \\frac{h(8 + h)}{h} = \\lim_{h \\to 0} (8 + h)$$',
                },
                {
                    del: 'a',
                    rubrik: 'Låt h gå mot noll',
                    varfor: 'Nu finns inget $h$ kvar i någon nämnare, så vi kan låta $h$ gå mot noll.',
                    text: '$$f\'(4) = 8 + 0 = 8$$',
                    delsvar: { del: 'a', text: '$f\'(4) = 8$' },
                },
                {
                    del: 'b',
                    rubrik: 'Jämför med definitionen',
                    varfor: 'Derivatans definition i punkten $x = 4$ är ' +
                        '$f\'(4) = \\lim_{h \\to 0} \\dfrac{f(4 + h) - f(4)}{h}$. Elviras uttryck har ' +
                        'precis den formen, så vi kan läsa av vad $f(4 + h)$ och $f(4)$ är.',
                    text: '$$f(4 + h) = (4 + h)^2 \\qquad \\text{och} \\qquad f(4) = 4^2$$\n\n' +
                        'Funktionen kvadrerar alltså det tal som sätts in.',
                },
                {
                    del: 'b',
                    rubrik: 'Skriv funktionen och kontrollera',
                    varfor: 'Om $f$ kvadrerar sitt argument är $f(x) = x^2$. Kontroll med ' +
                        'deriveringsreglerna: $f\'(x) = 2x$ ger $f\'(4) = 8$, samma som i a).',
                    text: '$$f(x) = x^2$$',
                    delsvar: { del: 'b', text: '$f(x) = x^2$' },
                },
            ],
            svar: '**a)** $f\'(4) = 8$&emsp;&emsp;**b)** $f(x) = x^2$',
            bedomning: [
                ['a) Korrekt svar ($8$)', '+C'],
                ['b) Korrekt svar ($f(x) = x^2$)', '+C'],
            ],
        },

        {
            nr: 6, del: 'B', poang: [0, 1, 0], omrade: 'Rationella uttryck: när ett uttryck inte är definierat',
            genomgangar: ['ma3c-1.3'],
            endastSvar: true,
            fraga: 'Ge ett exempel på ett uttryck som inte är definierat för $x = 7$ och $x = -5$',
            figur: null,
            steg: [
                {
                    rubrik: 'Tänk på när ett bråk saknar värde',
                    varfor: 'Division med noll är inte definierad. Ett rationellt uttryck är alltså inte ' +
                        'definierat för de $x$-värden som gör nämnaren lika med noll. Vi behöver en ' +
                        'nämnare som blir noll både då $x = 7$ och då $x = -5$.',
                    text: 'Faktorn $x - 7$ blir noll då $x = 7$, och faktorn $x + 5$ blir noll då ' +
                        '$x = -5$. Med båda faktorerna i nämnaren blir nämnaren noll i båda fallen ' +
                        '(nollproduktmetoden baklänges).',
                },
                {
                    rubrik: 'Skriv uttrycket och kontrollera',
                    varfor: 'Täljaren kan vara vad som helst som inte innehåller samma faktorer. Vi tar ' +
                        'den enklaste, $1$. Sätt sedan in de två $x$-värdena i nämnaren.',
                    text: '$$\\frac{1}{(x + 5)(x - 7)}$$\n\n' +
                        '$x = 7$: nämnaren blir $12 \\cdot 0 = 0$. $x = -5$: nämnaren blir ' +
                        '$0 \\cdot (-12) = 0$. Uttrycket är inte definierat för något av värdena.',
                },
            ],
            svar: 'Till exempel $\\dfrac{1}{(x + 5)(x - 7)}$',
            bedomning: [['Korrekt svar (till exempel $\\dfrac{1}{(x + 5)(x - 7)}$)', '+C']],
        },

        {
            nr: 7, del: 'B', poang: [1, 0, 1], omrade: 'Rationella uttryck och potenser: förenkla',
            genomgangar: ['ma3c-1.3', 'ma1c-1.8', 'ma2c-2.1'],
            endastSvar: true,
            fraga: 'Förenkla så långt som möjligt.<br>' +
                '**a)**&nbsp;$\\dfrac{3x + 18}{x + 6}$&emsp;&emsp;' +
                '**b)**&nbsp;$a \\cdot \\left(1 + \\dfrac{2}{a} + \\dfrac{1}{a^2}\\right)^{\\frac{1}{2}}$ då $a > 0$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Bryt ut 3 i täljaren',
                    varfor: 'Båda termerna i täljaren är delbara med $3$. Bryter vi ut $3$ dyker samma ' +
                        'parentes upp som i nämnaren.',
                    text: '$$\\frac{3x + 18}{x + 6} = \\frac{3(x + 6)}{x + 6}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Förkorta bort den gemensamma faktorn',
                    varfor: 'Faktorn $x + 6$ finns både i täljaren och i nämnaren och kan förkortas bort ' +
                        '(för alla $x$ där uttrycket är definierat, det vill säga $x \\neq -6$).',
                    text: '$$\\frac{3(x + 6)}{x + 6} = 3$$',
                    delsvar: { del: 'a', text: '$3$' },
                },
                {
                    del: 'b',
                    rubrik: 'Skriv parentesen på gemensamt bråkstreck',
                    varfor: 'Innanför parentesen står tre termer med olika nämnare. Med den gemensamma ' +
                        'nämnaren $a^2$ blir de ett enda bråk: $1 = \\dfrac{a^2}{a^2}$ och ' +
                        '$\\dfrac{2}{a} = \\dfrac{2a}{a^2}$.',
                    text: '$$a \\cdot \\left(\\frac{a^2}{a^2} + \\frac{2a}{a^2} + \\frac{1}{a^2}\\right)^{\\frac{1}{2}} ' +
                        '= a \\cdot \\left(\\frac{a^2 + 2a + 1}{a^2}\\right)^{\\frac{1}{2}}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Känn igen kvadreringsregeln i täljaren',
                    varfor: 'Kvadreringsregeln baklänges: $a^2 + 2a + 1 = (a + 1)^2$. Då är både ' +
                        'täljaren och nämnaren kvadrater, och hela bråket kan skrivas som en kvadrat.',
                    text: '$$a \\cdot \\left(\\frac{(a + 1)^2}{a^2}\\right)^{\\frac{1}{2}} ' +
                        '= a \\cdot \\left(\\left(\\frac{a + 1}{a}\\right)^2\\right)^{\\frac{1}{2}}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Skriv exponenten 1/2 som en kvadratrot',
                    varfor: 'Att upphöja till $\\dfrac{1}{2}$ är detsamma som att ta kvadratroten.',
                    text: '$$a \\cdot \\sqrt{\\left(\\frac{a + 1}{a}\\right)^2}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Ta roten ur kvadraten',
                    varfor: 'Kvadratroten ur ett tal i kvadrat ger tillbaka talet, om talet är positivt. ' +
                        'Eftersom $a > 0$ är $\\dfrac{a + 1}{a}$ positivt, så roten och kvadraten tar ut ' +
                        'varandra.',
                    text: '$$a \\cdot \\frac{a + 1}{a}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Förkorta bort a',
                    varfor: 'Faktorn $a$ framför bråket tar ut nämnaren $a$.',
                    text: '$$a \\cdot \\frac{a + 1}{a} = a + 1$$\n\n' +
                        'Kontroll med $a = 1$: $1 \\cdot (1 + 2 + 1)^{\\frac{1}{2}} = \\sqrt{4} = 2$ ' +
                        'och $a + 1 = 2$. Stämmer.',
                    delsvar: { del: 'b', text: '$a + 1$' },
                },
            ],
            svar: '**a)** $3$&emsp;&emsp;**b)** $a + 1$',
            bedomning: [
                ['a) Korrekt svar ($3$)', '+E'],
                ['b) Korrekt svar ($a + 1$)', '+A'],
            ],
        },

        {
            nr: 8, del: 'B', poang: [0, 2, 0], omrade: 'Derivata: tangent och derivatans värde',
            genomgangar: ['ma3c-2.2'],
            endastSvar: true,
            fraga: 'Grafen till funktionen $g$ har en tangent $y = 2x - 1$ i den punkt där $x = 3$<br>' +
                '**a)** Bestäm tangeringspunktens koordinater.<br>' +
                '**b)** Bestäm $g\'(3)$.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Använd att tangeringspunkten ligger på tangenten',
                    varfor: 'Tangeringspunkten är den punkt där tangenten och grafen möts. Den ligger ' +
                        'alltså på tangenten, och då kan $y$-koordinaten räknas ut ur tangentens ' +
                        'ekvation med $x = 3$.',
                    text: '$$y = 2 \\cdot 3 - 1 = 5$$\n\nTangeringspunkten är $(3,\\ 5)$.',
                    delsvar: { del: 'a', text: '$(3,\\ 5)$' },
                },
                {
                    del: 'b',
                    rubrik: 'Läs av tangentens lutning',
                    varfor: '$g\'(3)$ är grafens lutning där $x = 3$, och den är lika med tangentens ' +
                        'lutning i den punkten. I $y = kx + m$ är lutningen $k$, här $k = 2$.',
                    text: '$$g\'(3) = k = 2$$',
                    delsvar: { del: 'b', text: '$g\'(3) = 2$' },
                },
            ],
            svar: '**a)** $(3,\\ 5)$&emsp;&emsp;**b)** $g\'(3) = 2$',
            bedomning: [
                ['a) Korrekt svar ($(3,\\ 5)$)', '+C'],
                ['b) Korrekt svar ($2$)', '+C'],
            ],
        },

        {
            nr: 9, del: 'B', poang: [0, 0, 1], omrade: 'Andraderivatan och grafens form',
            genomgangar: ['ma3c-4.4', 'ma3c-4.2'],
            endastSvar: true,
            fraga: 'Figuren visar grafen till tredjegradsfunktionen $f$.<br>' +
                'För vilket eller vilka värden på $x$ är $f\'\'(x) \\leq 0$?',
            figur: 'u9',
            steg: [
                {
                    rubrik: 'Tolka villkoret f″(x) ≤ 0',
                    varfor: 'Andraderivatan är derivatan av $f\'$. Där $f\'\'(x) < 0$ minskar lutningen ' +
                        '$f\'(x)$, och kurvan är konkav (böjer nedåt, en "ledsen" kurva). Vi söker alltså ' +
                        'den del av grafen där lutningen minskar, plus punkten där $f\'\'(x) = 0$.',
                    text: '$$f\'\'(x) \\leq 0 \\quad \\Longleftrightarrow \\quad f\'(x) \\text{ minskar, eller } f\'\'(x) = 0 \\text{ (i inflexionspunkten)}$$',
                },
                {
                    rubrik: 'Läs av extrempunkterna',
                    varfor: 'I en extrempunkt är lutningen noll. Grafen har en maximipunkt där ' +
                        '$x = -3$ och en minimipunkt där $x = 1$.',
                    text: '$$f\'(-3) = 0 \\qquad \\text{och} \\qquad f\'(1) = 0$$',
                    figur: 'u9-s1',
                },
                {
                    rubrik: 'Se hur derivatan ser ut',
                    varfor: 'Eftersom $f$ är en tredjegradsfunktion är $f\'$ en andragradsfunktion. Den ' +
                        'har nollställena $-3$ och $1$, är positiv utanför dem (där $f$ växer) och negativ ' +
                        'mellan dem (där $f$ avtar). Grafen till $f\'$ är alltså en parabel som öppnar ' +
                        'sig uppåt, med symmetrilinjen mitt emellan nollställena.',
                    text: '$$x = \\frac{-3 + 1}{2} = -1$$\n\n' +
                        'Parabeln $y = f\'(x)$ har sin lägsta punkt där $x = -1$.',
                    figur: 'u9-s2',
                },
                {
                    rubrik: 'Bestäm var lutningen minskar',
                    varfor: 'Till vänster om $x = -1$ sjunker parabeln, alltså minskar $f\'(x)$ och ' +
                        '$f\'\'(x) < 0$. Till höger om $x = -1$ ökar $f\'(x)$ och $f\'\'(x) > 0$. I ' +
                        '$x = -1$ är $f\'\'(-1) = 0$: där ligger grafens inflexionspunkt, mitt emellan ' +
                        'extrempunkterna.',
                    text: 'Grafen är konkav till vänster om inflexionspunkten:\n\n' +
                        '$$f\'\'(x) \\leq 0 \\quad \\text{då} \\quad x \\leq -1$$',
                    figur: 'u9-s3',
                },
            ],
            svar: '$x \\leq -1$',
            bedomning: [['Korrekt svar utifrån godtagbar avläsning ($x \\leq -1$)', '+A']],
        },

        {
            nr: 10, del: 'B', poang: [0, 0, 1], omrade: 'Derivata: lutning och funktionsvärden',
            genomgangar: ['ma3c-4.1', 'ma3c-2.4'],
            endastSvar: true,
            fraga: 'Funktionen $f$ uppfyller följande två villkor:\n\n' +
                '- $f(6) = 3$\n' +
                '- $-2 \\leq f\'(x) \\leq 1$ för $x$ i intervallet $0 \\leq x \\leq 10$\n\n' +
                'Bestäm största möjliga värde för $f(x)$ i intervallet $0 \\leq x \\leq 10$',
            figur: null,
            steg: [
                {
                    rubrik: 'Tolka villkoret på derivatan',
                    varfor: '$f\'(x)$ är grafens lutning. Villkoret säger att grafen aldrig stiger ' +
                        'brantare än $1$ enhet uppåt per steg åt höger, och aldrig sjunker brantare än ' +
                        '$2$ enheter nedåt per steg åt höger.',
                    text: 'Vi utgår från den kända punkten $(6,\\ 3)$ och undersöker hur högt grafen kan ' +
                        'nå åt höger och åt vänster.',
                },
                {
                    rubrik: 'Undersök hur högt grafen kan nå åt höger',
                    varfor: 'Från $x = 6$ till $x = 10$ är det $4$ steg. Grafen stiger högst $1$ per ' +
                        'steg, så den kan som mest stiga $4$ enheter.',
                    text: '$$f(10) \\leq 3 + 4 \\cdot 1 = 7$$',
                    figur: 'u10-s1',
                },
                {
                    rubrik: 'Undersök hur högt grafen kan nå åt vänster',
                    varfor: 'Från $x = 0$ till $x = 6$ är det $6$ steg. Grafen kan som mest sjunka $2$ per ' +
                        'steg åt höger. Läst baklänges, från $x = 6$ mot $x = 0$, betyder det att grafen ' +
                        'högst kan ligga $2$ enheter högre för varje steg åt vänster.',
                    text: '$$f(0) \\leq 3 + 6 \\cdot 2 = 15$$\n\n' +
                        'Värdet $15$ nås om grafen är den räta linjen $y = 15 - 2x$ mellan $x = 0$ och ' +
                        '$x = 6$, som har lutningen $-2$ hela vägen.',
                    figur: 'u10-s2',
                },
                {
                    rubrik: 'Jämför de två sidorna',
                    varfor: 'Till höger kan grafen inte nå över $7$, till vänster kan den nå ända upp till ' +
                        '$15$. Det största möjliga värdet är det större av dem.',
                    text: '$$15 > 7$$\n\nDet största möjliga värdet för $f(x)$ i intervallet är $15$.',
                },
            ],
            svar: '$15$',
            bedomning: [['Korrekt svar ($15$)', '+A']],
        },

        {
            nr: 11, del: 'B', poang: [0, 0, 1], omrade: 'Cirkelns ekvation och tangent',
            genomgangar: ['ma2c-4.6', 'ma2c-4.11'],
            utgatt: 'Cirkelns ekvation ingår inte längre i Matematik fortsättning nivå 1c. Stoffet ' +
                'utgick vid revideringen av ämnesplanerna 2021, så du behöver inte kunna det till provet. ' +
                'Lös uppgiften bara om du tycker att den ser rolig ut.',
            endastSvar: true,
            fraga: 'Figuren visar en cirkel med ekvationen $(x + 2)^2 + (y - 2)^2 = 8$<br>' +
                'I punkten $P$ är cirkelns tangent parallell med $y$-axeln.<br>' +
                'Bestäm koordinaterna för punkten $P$. Svara exakt.',
            figur: 'u11',
            steg: [
                {
                    rubrik: 'Läs av cirkelns medelpunkt och radie',
                    varfor: 'Avståndsformeln: avståndet $d$ mellan $(x,\\ y)$ och $(-2,\\ 2)$ uppfyller ' +
                        '$d^2 = (x - (-2))^2 + (y - 2)^2 = (x + 2)^2 + (y - 2)^2$. Ekvationen säger alltså ' +
                        'att varje punkt på cirkeln har avståndet $\\sqrt{8}$ till punkten $(-2,\\ 2)$.',
                    text: 'Medelpunkt: $(-2,\\ 2)$. Radie: $r = \\sqrt{8}$.',
                    figur: 'u11-s1',
                },
                {
                    rubrik: 'Bestäm var tangenten är lodrät',
                    varfor: 'En tangent till en cirkel är vinkelrät mot radien i tangeringspunkten. En ' +
                        'tangent parallell med $y$-axeln är lodrät, så radien till $P$ måste vara ' +
                        'vågrät. $P$ ligger därför på samma höjd som medelpunkten, i cirkelns högra kant ' +
                        '(enligt figuren till höger om $y$-axeln).',
                    text: '$P$ har $y$-koordinaten $2$ och ligger en radie till höger om medelpunkten:\n\n' +
                        '$$x = -2 + \\sqrt{8} = \\sqrt{8} - 2$$',
                    figur: 'u11-s2',
                },
                {
                    rubrik: 'Kontrollera genom insättning',
                    varfor: 'Punkten ska ligga på cirkeln, alltså uppfylla cirkelns ekvation.',
                    text: '$$\\left(\\sqrt{8} - 2 + 2\\right)^2 + (2 - 2)^2 = \\left(\\sqrt{8}\\right)^2 + 0 = 8$$\n\n' +
                        'Stämmer. Som närmevärde är $\\sqrt{8} - 2 \\approx 0{,}83$, vilket passar med ' +
                        'figuren där $P$ ligger strax till höger om $y$-axeln. (Svaret kan också skrivas ' +
                        '$(2\\sqrt{2} - 2,\\ 2)$, eftersom $\\sqrt{8} = 2\\sqrt{2}$.)',
                },
            ],
            svar: '$P = \\left(\\sqrt{8} - 2,\\ 2\\right)$',
            bedomning: [['Korrekt svar ($\\left(\\sqrt{8} - 2,\\ 2\\right)$)', '+A']],
        }
    );
})();

// Fysiklabbet — Nationellt prov Matematik 3c, våren 2018, DELPROV C
// (uppgift 12–19, fullständiga lösningar, utan digitala verktyg).
//
// Lägger till uppgifterna i provet som skelettet data/np/ma3c-vt2018.js
// skapar. Dataformat och regler: data/np/RIKTLINJER.md. Figurerna i
// lösningsstegen genereras av .claude/np-figs/gen-ma3c-vt2018-C.js, och
// pennlösningarna ligger i data/np/ma3c-vt2018-delC-penna.js.
//
// Räkningen är kontrollerad i Node. Svaren stämmer med provets
// bedömningsanvisningar (15, 54, Anna har rätt, 5 kr/kg, ln(π/3) är minst,
// F(x) = 4e^(x/4) + x²/2 − 2, a < 1/4 och b godtyckligt, a = √2).

(function () {
    var P = window.NP_PROV && window.NP_PROV['ma3c-vt2018'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV C =================
        {
            nr: 12, del: 'C', poang: [2, 0, 0], omrade: 'Integraler: beräkning med primitiv funktion',
            genomgangar: ['ma3c-5.4', 'ma3c-5.1'],
            fraga: 'Bestäm $\\displaystyle\\int_{1}^{2} 4x^3\\,\\mathrm{d}x$',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'En bestämd integral beräknas med en primitiv funktion. För en potens ' +
                        'höjs exponenten med ett och termen divideras med den nya exponenten: ' +
                        '$4x^3$ ger $\\dfrac{4x^4}{4} = x^4$. Kontroll: derivatan av $x^4$ är ' +
                        '$4x^3$, precis integranden.',
                    text: '$$F(x) = \\dfrac{4x^4}{4} = x^4$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Integralkalkylens fundamentalsats: den primitiva funktionens värde i ' +
                        'övre gränsen minus dess värde i undre gränsen.',
                    text: '$$\\int_{1}^{2} 4x^3\\,\\mathrm{d}x = \\Big[ x^4 \\Big]_{1}^{2} ' +
                        '= 2^4 - 1^4 = 16 - 1 = 15$$',
                },
            ],
            svar: '$15$',
            bedomning: [
                ['Godtagbar ansats, bestämmer korrekt primitiv funktion', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($15$)', '+E'],
            ],
        },

        {
            nr: 13, del: 'C', poang: [2, 0, 0], omrade: 'Derivata: andraderivatan',
            genomgangar: ['ma3c-4.4', 'ma3c-3.2'],
            fraga: 'Bestäm $f\'\'(3)$ då $f(x) = 0{,}5x^4$',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera en gång',
                    varfor: 'Andraderivatan är derivatan av derivatan, så vi deriverar två gånger. ' +
                        'Deriveringsregeln för en potens: exponenten multipliceras med ' +
                        'koefficienten och sänks sedan med ett. $0{,}5 \\cdot 4 = 2$.',
                    text: '$$f\'(x) = 0{,}5 \\cdot 4x^3 = 2x^3$$',
                },
                {
                    rubrik: 'Derivera en gång till',
                    varfor: 'Samma regel på $2x^3$: $2 \\cdot 3 = 6$ och exponenten blir $2$.',
                    text: '$$f\'\'(x) = 2 \\cdot 3x^2 = 6x^2$$',
                },
                {
                    rubrik: 'Sätt in x = 3',
                    varfor: 'Först nu sätts $x = 3$ in, i andraderivatan. Sätter man in $3$ ' +
                        'tidigare blir funktionen en konstant, och derivatan av en konstant är ' +
                        'noll. Potensen räknas före multiplikationen: $3^2 = 9$.',
                    text: '$$f\'\'(3) = 6 \\cdot 3^2 = 6 \\cdot 9 = 54$$',
                },
            ],
            svar: '$f\'\'(3) = 54$',
            bedomning: [
                ['Godtagbar ansats, bestämmer andraderivatan korrekt', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($54$)', '+E'],
            ],
        },

        {
            nr: 14, del: 'C', poang: [1, 0, 0], omrade: 'Absolutbelopp: ekvation utan lösning',
            genomgangar: ['ma3c-2.5'],
            fraga: 'Anna påstår att ekvationen $|-4x| = -8$ inte har någon lösning.\n\n' +
                'Har Anna rätt? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Påminn dig vad absolutbelopp betyder',
                    varfor: 'Absolutbeloppet av ett tal är talets avstånd till noll på ' +
                        'tallinjen. Ett avstånd kan aldrig vara negativt. Därför är ' +
                        '$|a| \\geq 0$ för alla tal $a$, vad som än står innanför strecken.',
                    text: '$$|-4x| \\geq 0 \\quad \\text{för alla } x$$',
                },
                {
                    rubrik: 'Jämför med högerledet',
                    varfor: 'Vänsterledet är aldrig negativt, men högerledet är det negativa ' +
                        'talet $-8$. Det finns alltså inget $x$ som gör leden lika. (Hade ' +
                        'högerledet varit $8$ hade ekvationen haft två lösningar, ' +
                        '$x = 2$ och $x = -2$.)',
                    text: '$$|-4x| \\geq 0 > -8$$\n\n' +
                        'Vänsterledet kan aldrig bli $-8$, så ekvationen saknar lösning. ' +
                        '**Anna har rätt.**',
                },
            ],
            svar: 'Ja, Anna har rätt. Ett absolutbelopp är aldrig negativt, så $|-4x|$ kan inte bli $-8$.',
            bedomning: [
                ['Godtagbart enkelt resonemang, som inkluderar att $|-4x|$ inte är negativt, vilket leder till slutsatsen att Anna har rätt', '+E'],
            ],
        },

        {
            nr: 15, del: 'C', poang: [3, 1, 0], omrade: 'Extremvärdesproblem: största dagsinkomst',
            genomgangar: ['ma3c-4.6', 'ma3c-4.5', 'ma3c-4.2'],
            fraga: 'Olle och Olga säljer blåbär och funderar på att höja kilopriset på blåbären ' +
                'för att öka dagsinkomsten. De har kommit fram till att dagsinkomsten som funktion ' +
                'av prishöjningen ges av\n\n' +
                '$$f(x) = 3\\,000 + 75x - x^3, \\quad x \\geq 0$$\n\n' +
                'där $f(x)$ är dagsinkomsten i kr och $x$ är prishöjningen i kr/kg.\n\n' +
                'Beräkna vilken prishöjning $x$ som ger den största dagsinkomsten.',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera funktionen',
                    varfor: 'Den största dagsinkomsten finns där grafen har en topp, och i en ' +
                        'topp är tangenten vågrät: derivatan är noll. Vi deriverar term för ' +
                        'term. Konstanten $3\\,000$ har derivatan $0$, $75x$ ger $75$ och $x^3$ ' +
                        'ger $3x^2$.',
                    text: '$$f\'(x) = 75 - 3x^2$$',
                },
                {
                    rubrik: 'Sätt derivatan lika med noll',
                    varfor: 'Addera $3x^2$ till båda led, så hamnar $x^2$-termen ensam i ' +
                        'högerledet. Dividera sedan båda led med $3$.',
                    text: '$$75 - 3x^2 = 0$$\n\n' +
                        '$$75 = 3x^2$$\n\n' +
                        '$$25 = x^2$$',
                },
                {
                    rubrik: 'Dra roten ur båda led',
                    varfor: 'Både $5$ och $-5$ har kvadraten $25$, så ekvationen har två ' +
                        'lösningar. Men $x$ är en prishöjning och $x \\geq 0$ enligt uppgiften, ' +
                        'så $x = -5$ ligger utanför definitionsmängden.',
                    text: '$$x = \\pm\\sqrt{25}$$\n\n' +
                        '$$x = \\pm 5$$\n\n' +
                        'Med $x \\geq 0$ återstår $x = 5$.',
                    figur: 'u15-s1',
                },
                {
                    rubrik: 'Visa att det är ett maximum',
                    varfor: 'Att derivatan är noll räcker inte: punkten kan lika gärna vara en ' +
                        'minimipunkt eller en terrasspunkt. Andraderivatan avgör. Är den ' +
                        'negativ i punkten är grafen böjd nedåt där, som en topp.',
                    text: '$$f\'\'(x) = -6x \\qquad f\'\'(5) = -6 \\cdot 5 = -30 < 0$$\n\n' +
                        'Alltså är $x = 5$ en maximipunkt.',
                },
                {
                    rubrik: 'Kontrollera att toppen är störst i hela intervallet',
                    varfor: 'Definitionsmängden är $x \\geq 0$, och ändpunkten $x = 0$ måste ' +
                        'jämföras. För $0 \\leq x < 5$ är $f\'(x) > 0$ (till exempel ' +
                        '$f\'(0) = 75$), så inkomsten växer fram till $x = 5$. För $x > 5$ är ' +
                        '$f\'(x) < 0$ (till exempel $f\'(6) = 75 - 108 = -33$), så den avtar ' +
                        'sedan. Toppen är alltså det största värdet. Inkomsten blir då ' +
                        '$f(5) = 3\\,000 + 375 - 125 = 3\\,250\\ \\mathrm{kr}$, mer än $f(0) = 3\\,000\\ \\mathrm{kr}$.',
                    text: '$$f(5) = 3\\,000 + 75 \\cdot 5 - 5^3 = 3\\,000 + 375 - 125 = 3\\,250\\ \\mathrm{kr}$$\n\n' +
                        'En prishöjning med $5$ kr/kg ger den största dagsinkomsten, $3\\,250\\ \\mathrm{kr}$.',
                    figur: 'u15-s2',
                },
            ],
            svar: 'En prishöjning med $5$ kr/kg ger den största dagsinkomsten.',
            bedomning: [
                ['Godtagbar ansats, bestämmer derivatan korrekt, $f\'(x) = 75 - 3x^2$', '+E'],
                ['med godtagbar fortsättning, bestämmer derivatans nollställen korrekt, $x = \\pm 5$', '+E'],
                ['med godtagbar verifiering av maximum med godtagbart svar ($5$ kr/kg)', '+E'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 16, del: 'C', poang: [0, 2, 0], omrade: 'Logaritmer och exponentialfunktion: jämför två tal',
            genomgangar: ['ma3c-3.5', 'ma3c-3.4'],
            fraga: 'Avgör vilket av talen $\\ln\\left(\\dfrac{\\pi}{3}\\right)$ och ' +
                '$\\mathrm{e}^{\\frac{\\pi}{3}}$ som är minst. Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Uppskatta π/3',
                    varfor: 'Båda talen innehåller $\\dfrac{\\pi}{3}$. Eftersom $\\pi \\approx 3{,}14$ ' +
                        'är kvoten bara en aning större än $1$. Då kan vi jämföra med ' +
                        '$\\ln 1$ och $\\mathrm{e}^1$, som vi känner utan räknare.',
                    text: '$$\\dfrac{\\pi}{3} \\approx \\dfrac{3{,}14}{3} \\approx 1{,}05 \\approx 1$$',
                },
                {
                    rubrik: 'Uppskatta ln(π/3)',
                    varfor: '$\\ln 1 = 0$, eftersom $\\mathrm{e}^0 = 1$. Talet $\\dfrac{\\pi}{3}$ ' +
                        'ligger nära $1$, så $\\ln\\left(\\dfrac{\\pi}{3}\\right)$ ligger nära $0$. ' +
                        'Mer exakt: $\\dfrac{\\pi}{3} < \\mathrm{e}$, och eftersom $\\ln$ är en ' +
                        'växande funktion är då $\\ln\\left(\\dfrac{\\pi}{3}\\right) < \\ln \\mathrm{e} = 1$.',
                    text: '$$\\ln\\left(\\dfrac{\\pi}{3}\\right) \\approx \\ln 1 = 0$$',
                    figur: 'u16-s1',
                },
                {
                    rubrik: 'Uppskatta e upphöjt till π/3',
                    varfor: 'Med exponenten ungefär $1$ blir potensen ungefär $\\mathrm{e}^1 = \\mathrm{e} ' +
                        '\\approx 2{,}72$. Mer exakt: $\\dfrac{\\pi}{3} > 1$, och $\\mathrm{e}^x$ är ' +
                        'växande, så $\\mathrm{e}^{\\frac{\\pi}{3}} > \\mathrm{e}^1 > 2$.',
                    text: '$$\\mathrm{e}^{\\frac{\\pi}{3}} \\approx \\mathrm{e}^1 = \\mathrm{e} \\approx 2{,}72$$',
                    figur: 'u16-s2',
                },
                {
                    rubrik: 'Jämför talen',
                    varfor: 'Det ena talet ligger nära $0$ (och är mindre än $1$), det andra nära ' +
                        '$2{,}7$ (och är större än $2$). Det första är alltså minst.',
                    text: '$$\\ln\\left(\\dfrac{\\pi}{3}\\right) < 1 < 2 < \\mathrm{e}^{\\frac{\\pi}{3}}$$\n\n' +
                        '$\\ln\\left(\\dfrac{\\pi}{3}\\right)$ är det minsta talet.',
                },
            ],
            svar: '$\\ln\\left(\\dfrac{\\pi}{3}\\right)$ är minst, eftersom $\\ln\\left(\\dfrac{\\pi}{3}\\right) \\approx \\ln 1 = 0$ ' +
                'medan $\\mathrm{e}^{\\frac{\\pi}{3}} \\approx \\mathrm{e}^1 \\approx 2{,}72$.',
            bedomning: [
                ['Godtagbar ansats, till exempel inser att $\\dfrac{\\pi}{3} \\approx 1$ och att $\\ln 1$ och $\\mathrm{e}^1$ ska jämföras', '+C'],
                ['med i övrigt godtagbart välgrundat resonemang där det framgår att $\\ln\\left(\\dfrac{\\pi}{3}\\right)$ är minst, baserat på till exempel att $\\ln\\left(\\dfrac{\\pi}{3}\\right) \\approx 0$ och att $\\mathrm{e}^{\\frac{\\pi}{3}} \\approx \\mathrm{e}$', '+C'],
            ],
        },

        {
            nr: 17, del: 'C', poang: [0, 2, 0], omrade: 'Primitiva funktioner med villkor',
            genomgangar: ['ma3c-5.2', 'ma3c-5.1'],
            fraga: 'För funktionen $f$ gäller att $f(x) = \\mathrm{e}^{\\frac{x}{4}} + x$. ' +
                'Funktionen $F$ är en primitiv funktion till $f$.\n\n' +
                'Bestäm $F$ så att $F(4) = 4\\mathrm{e} + 6$',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv exponenten med en koefficient',
                    varfor: 'Regeln för den primitiva funktionen till $\\mathrm{e}^{kx}$ kräver ' +
                        'att vi ser koefficienten $k$ framför $x$. Att dividera med $4$ är ' +
                        'detsamma som att multiplicera med $\\dfrac{1}{4}$, så $k = \\dfrac{1}{4}$.',
                    text: '$$\\mathrm{e}^{\\frac{x}{4}} = \\mathrm{e}^{\\frac{1}{4}x} ' +
                        '\\qquad k = \\dfrac{1}{4}$$',
                },
                {
                    rubrik: 'Bestäm den primitiva funktionen',
                    varfor: 'Den primitiva funktionen till $\\mathrm{e}^{kx}$ är ' +
                        '$\\dfrac{\\mathrm{e}^{kx}}{k}$. Att dividera med $\\dfrac{1}{4}$ är att ' +
                        'multiplicera med $4$. Termen $x$ ger $\\dfrac{x^2}{2}$. Konstanten $C$ ' +
                        'skrivs ut, eftersom den ska bestämmas. Kontroll: derivatan av ' +
                        '$4\\mathrm{e}^{\\frac{x}{4}}$ är $4 \\cdot \\dfrac{1}{4}\\mathrm{e}^{\\frac{x}{4}} ' +
                        '= \\mathrm{e}^{\\frac{x}{4}}$.',
                    text: '$$F(x) = \\dfrac{\\mathrm{e}^{\\frac{x}{4}}}{\\frac{1}{4}} + \\dfrac{x^2}{2} + C ' +
                        '= 4\\mathrm{e}^{\\frac{x}{4}} + \\dfrac{x^2}{2} + C$$',
                },
                {
                    rubrik: 'Sätt in villkoret F(4) = 4e + 6',
                    varfor: 'Villkoret säger vilken av alla primitiva funktioner som avses. ' +
                        'Med $x = 4$ blir exponenten $\\dfrac{4}{4} = 1$, så $\\mathrm{e}^1 = \\mathrm{e}$, ' +
                        'och $\\dfrac{4^2}{2} = 8$.',
                    text: '$$F(4) = 4\\mathrm{e}^{\\frac{4}{4}} + \\dfrac{4^2}{2} + C = 4\\mathrm{e} + 8 + C$$\n\n' +
                        '$$4\\mathrm{e} + 8 + C = 4\\mathrm{e} + 6$$',
                },
                {
                    rubrik: 'Lös ut C',
                    varfor: 'Subtrahera $4\\mathrm{e}$ från båda led, så försvinner ' +
                        '$\\mathrm{e}$-termerna. Subtrahera sedan $8$ från båda led.',
                    text: '$$8 + C = 6$$\n\n' +
                        '$$C = -2$$',
                },
                {
                    rubrik: 'Skriv den primitiva funktionen',
                    varfor: 'Kontroll: $F(4) = 4\\mathrm{e} + 8 - 2 = 4\\mathrm{e} + 6$. Stämmer.',
                    text: '$$F(x) = 4\\mathrm{e}^{\\frac{x}{4}} + \\dfrac{x^2}{2} - 2$$',
                },
            ],
            svar: '$F(x) = 4\\mathrm{e}^{\\frac{x}{4}} + \\dfrac{x^2}{2} - 2$',
            bedomning: [
                ['Godtagbar ansats, bestämmer korrekt den primitiva funktionen $F(x) = 4\\mathrm{e}^{\\frac{x}{4}} + \\dfrac{x^2}{2} + C$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar $\\left(F(x) = 4\\mathrm{e}^{\\frac{x}{4}} + \\dfrac{x^2}{2} - 2\\right)$', '+C'],
            ],
        },

        {
            nr: 18, del: 'C', poang: [0, 1, 2], omrade: 'Extrempunkter: villkor på konstanter',
            genomgangar: ['ma3c-4.2', 'ma2c-2.6', 'ma3c-3.2'],
            fraga: 'För funktionen $f$ gäller att $f(x) = \\dfrac{x^3}{3} + \\dfrac{x^2}{2} + ax + b$ ' +
                'där $a$ och $b$ är konstanter. Undersök vilka värden som konstanterna $a$ och ' +
                '$b$ kan anta för att grafen till funktionen ska ha två extrempunkter.',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera funktionen',
                    varfor: 'Extrempunkter kan bara finnas där derivatan är noll. Termvis: ' +
                        '$\\dfrac{x^3}{3}$ ger $\\dfrac{3x^2}{3} = x^2$, $\\dfrac{x^2}{2}$ ger $x$, ' +
                        '$ax$ ger $a$ och konstanten $b$ ger $0$.',
                    text: '$$f\'(x) = x^2 + x + a$$',
                },
                {
                    rubrik: 'Konstatera vad b gör',
                    varfor: 'Konstanten $b$ försvann vid deriveringen. Den flyttar bara hela ' +
                        'grafen uppåt eller nedåt, och då ändras varken tangenternas lutning ' +
                        'eller antalet toppar och dalar.',
                    text: '$b$ påverkar inte $f\'(x)$, så $b$ kan vara vilket tal som helst.',
                },
                {
                    rubrik: 'Lös f\'(x) = 0 med pq-formeln',
                    varfor: 'Derivatan är ett andragradsuttryck med $p = 1$ och $q = a$. ' +
                        'Halva $p$ är $\\dfrac{1}{2}$, och $\\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{4}$.',
                    text: '$$x^2 + x + a = 0$$\n\n' +
                        '$$x = -\\dfrac{1}{2} \\pm \\sqrt{\\dfrac{1}{4} - a}$$',
                },
                {
                    rubrik: 'Ställ upp villkoret för två extrempunkter',
                    varfor: 'Grafen får två extrempunkter när derivatan har två olika ' +
                        'nollställen, för då byter $f\'$ tecken vid båda (en uppåtöppen ' +
                        'parabel är positiv utanför nollställena och negativ mellan dem). ' +
                        'Två olika rötter kräver att uttrycket under rottecknet är positivt.',
                    text: '$$\\dfrac{1}{4} - a > 0$$\n\n' +
                        '$$\\dfrac{1}{4} > a$$',
                    figur: 'u18-s1',
                },
                {
                    rubrik: 'Pröva gränsfallen',
                    varfor: 'Är $a = \\dfrac{1}{4}$ blir $f\'(x) = \\left(x + \\dfrac{1}{2}\\right)^2$. ' +
                        'Derivatan är då noll bara i $x = -\\dfrac{1}{2}$ och positiv på båda ' +
                        'sidor, så punkten är en terrasspunkt och ingen extrempunkt. Är ' +
                        '$a > \\dfrac{1}{4}$ är uttrycket under roten negativt: derivatan är ' +
                        'aldrig noll, och grafen saknar extrempunkter.',
                    text: '$a = \\dfrac{1}{4}$: en terrasspunkt. $\\quad a > \\dfrac{1}{4}$: inga ' +
                        'extrempunkter.\n\n' +
                        'Grafen har två extrempunkter precis när $a < \\dfrac{1}{4}$, och $b$ kan ' +
                        'vara vilket tal som helst.',
                },
            ],
            svar: 'Grafen har två extrempunkter om $a < \\dfrac{1}{4}$. Konstanten $b$ kan anta vilket värde som helst.',
            bedomning: [
                ['Godtagbar ansats, bestämmer derivatan korrekt, $f\'(x) = x^2 + x + a$', '+C'],
                ['med välgrundat och nyanserat resonemang med slutsatsen att $a < \\dfrac{1}{4}$', '+A'],
                ['Välgrundat och nyanserat resonemang med slutsatsen att $b$ kan anta vilket värde som helst', '+A'],
            ],
        },

        {
            nr: 19, del: 'C', poang: [0, 0, 3], omrade: 'Integral med parameter: största värde',
            genomgangar: ['ma3c-5.4', 'ma3c-4.6', 'ma3c-4.5'],
            fraga: 'För konstanten $a$ gäller att $a > 0$. Bestäm för vilket värde på $a$ som\n\n' +
                '$$\\int_{0}^{a} \\left(x^2 - ax + 1\\right)\\mathrm{d}x$$\n\n' +
                'får sitt största värde.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'Integrationsvariabeln är $x$. Konstanten $a$ behandlas som ett ' +
                        'vanligt tal: $ax$ ger $\\dfrac{ax^2}{2}$, precis som $3x$ hade gett ' +
                        '$\\dfrac{3x^2}{2}$.',
                    text: '$$\\int_{0}^{a} \\left(x^2 - ax + 1\\right)\\mathrm{d}x = ' +
                        '\\left[ \\dfrac{x^3}{3} - \\dfrac{ax^2}{2} + x \\right]_{0}^{a}$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Övre gränsen är $a$, så $x$ byts mot $a$ överallt. Den undre ' +
                        'gränsen $0$ ger noll i alla termer. Integralens värde beror alltså ' +
                        'bara på $a$, och vi kallar det $I(a)$.',
                    text: '$$I(a) = \\dfrac{a^3}{3} - \\dfrac{a \\cdot a^2}{2} + a - 0 ' +
                        '= \\dfrac{a^3}{3} - \\dfrac{a^3}{2} + a$$',
                },
                {
                    rubrik: 'Förenkla uttrycket',
                    varfor: 'Gemensam nämnare $6$: $\\dfrac{a^3}{3} = \\dfrac{2a^3}{6}$ och ' +
                        '$\\dfrac{a^3}{2} = \\dfrac{3a^3}{6}$. Skillnaden blir $-\\dfrac{a^3}{6}$.',
                    text: '$$I(a) = \\dfrac{2a^3}{6} - \\dfrac{3a^3}{6} + a = -\\dfrac{a^3}{6} + a$$',
                },
                {
                    rubrik: 'Derivera med avseende på a',
                    varfor: 'Nu är frågan när funktionen $I(a)$ är störst, ett vanligt ' +
                        'extremvärdesproblem med $a$ som variabel. Derivatan av ' +
                        '$-\\dfrac{a^3}{6}$ är $-\\dfrac{3a^2}{6} = -\\dfrac{a^2}{2}$.',
                    text: '$$I\'(a) = -\\dfrac{a^2}{2} + 1$$',
                },
                {
                    rubrik: 'Sätt derivatan lika med noll',
                    varfor: 'Subtrahera $1$ från båda led och multiplicera sedan båda led med ' +
                        '$-2$, så blir $a^2$ ensamt kvar.',
                    text: '$$-\\dfrac{a^2}{2} + 1 = 0$$\n\n' +
                        '$$-\\dfrac{a^2}{2} = -1$$\n\n' +
                        '$$a^2 = 2$$',
                },
                {
                    rubrik: 'Dra roten ur båda led',
                    varfor: 'Ekvationen har lösningarna $\\pm\\sqrt{2}$, men enligt uppgiften är ' +
                        '$a > 0$.',
                    text: '$$a = \\pm\\sqrt{2}$$\n\n' +
                        'Med $a > 0$ återstår $a = \\sqrt{2}$.',
                },
                {
                    rubrik: 'Visa att det är ett maximum',
                    varfor: 'Andraderivatan är $I\'\'(a) = -a$, som är negativ för $a = \\sqrt{2}$: ' +
                        'grafen till $I$ är böjd nedåt där. Dessutom är $I\'(a) > 0$ för ' +
                        '$0 < a < \\sqrt{2}$ och $I\'(a) < 0$ för $a > \\sqrt{2}$, så $I$ växer ' +
                        'fram till $a = \\sqrt{2}$ och avtar sedan. Det är alltså det största ' +
                        'värdet för alla $a > 0$, och det är ' +
                        '$I(\\sqrt{2}) = -\\dfrac{2\\sqrt{2}}{6} + \\sqrt{2} = \\dfrac{2\\sqrt{2}}{3} \\approx 0{,}94$.',
                    text: '$$I\'\'(a) = -a \\qquad I\'\'(\\sqrt{2}) = -\\sqrt{2} < 0$$\n\n' +
                        'Integralen får sitt största värde när $a = \\sqrt{2}$.',
                    figur: 'u19-s1',
                },
            ],
            svar: '$a = \\sqrt{2}$',
            bedomning: [
                ['Godtagbar ansats, tecknar integralens värde som $\\dfrac{a^3}{3} - \\dfrac{a^3}{2} + a$', '+A'],
                ['med i övrigt godtagbar lösning, som inkluderar verifiering av maximum, med korrekt svar ($\\sqrt{2}$)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        }
    );
})();

// Fysiklabbet: NP Matematik 3c VT 2018, delprov D (uppgift 20–28).
// Delfil under arbetet: uppgifterna läggs till i provet som definieras i
// data/np/ma3c-vt2018.js och slås ihop dit när provet är klart.
//
// Dataformat och regler: se data/np/RIKTLINJER.md. Svar och poängkrav följer
// provets bedömningsanvisningar; lösningsmetoderna är de som ingår i kursens
// genomgångar (Matematik fortsättning nivå 1c). Inget stoff i delprov D har
// utgått ur kursen. Där det digitala verktyget räknar visas kommandot
// (GeoGebra) och matematiken bakom förklaras.

(function () {
    var P = window.NP_PROV && window.NP_PROV['ma3c-vt2018'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV D =================
        {
            nr: 20, del: 'D', poang: [2, 0, 0], omrade: 'Derivata: genomsnittlig förändringshastighet',
            genomgangar: ['ma3c-2.1'],
            fraga: 'Elisabeth publicerar ett inlägg på sin blogg klockan 13.00. Bloggen har en ' +
                'besöksräknare som visar antalet besökare på bloggen i varje ögonblick. Elisabeth ' +
                'läser av besöksräknaren varje hel timme och ritar ett diagram.\n\n' +
                '**a)** I vilket av tidsintervallen A–E är den genomsnittliga ' +
                'förändringshastigheten av antalet bloggbesökare störst? *Endast svar krävs*\n\n' +
                '**A.** 13.00–18.00\n\n' +
                '**B.** 13.00–21.00\n\n' +
                '**C.** 15.00–16.00\n\n' +
                '**D.** 15.00–17.00\n\n' +
                '**E.** 17.00–18.00\n\n' +
                '**b)** Beräkna den genomsnittliga förändringshastigheten av antalet ' +
                'bloggbesökare i tidsintervallet 15.00–19.00',
            figur: 'u20',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av start- och slutvärdet i varje intervall',
                    varfor: 'Den genomsnittliga förändringshastigheten är ändringskvoten ' +
                        '$\\dfrac{\\Delta y}{\\Delta x}$: förändringen i antal besökare delat med ' +
                        'tiden. Bara intervallets början och slut räknas, inte vad som händer ' +
                        'däremellan.',
                    text: '**A:** $\\dfrac{40 - 10}{5} = 6$ besökare/h&emsp;&emsp;' +
                        '**B:** $\\dfrac{20 - 10}{8} = 1{,}25$ besökare/h\n\n' +
                        '**C:** $\\dfrac{30 - 10}{1} = 20$ besökare/h&emsp;&emsp;' +
                        '**D:** $\\dfrac{40 - 10}{2} = 15$ besökare/h\n\n' +
                        '**E:** $\\dfrac{40 - 40}{1} = 0$ besökare/h',
                },
                {
                    del: 'a',
                    rubrik: 'Välj det största värdet',
                    varfor: 'Störst förändringshastighet betyder brantast sekant i diagrammet. ' +
                        'Mellan 15.00 och 16.00 ökar antalet med 20 besökare på en enda timme, ' +
                        'och ingen annan sekant är lika brant.',
                    text: 'Störst är $20$ besökare per timme, i intervallet C (15.00–16.00).',
                    figur: 'u20-s1',
                    delsvar: { del: 'a', text: 'Alternativ C: 15.00–16.00' },
                },
                {
                    del: 'b',
                    rubrik: 'Läs av värdena klockan 15.00 och 19.00',
                    varfor: 'Diagrammets punkter ger antalet besökare vid varje hel timme. ' +
                        'Klockan 15.00 är det $10$ besökare och klockan 19.00 är det $30$.',
                    text: 'Klockan 15.00: $10$ besökare. Klockan 19.00: $30$ besökare.',
                },
                {
                    rubrik: 'Beräkna ändringskvoten',
                    del: 'b',
                    varfor: 'Förändringen i antal är $30 - 10 = 20$ besökare, och tiden är ' +
                        '$19 - 15 = 4$ timmar. Enheten blir besökare per timme, och utan enhet ' +
                        'är svaret inte fullständigt.',
                    text: '$$\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{30 - 10}{19 - 15} = ' +
                        '\\dfrac{20}{4} = 5\\ \\text{besökare/h}$$',
                    figur: 'u20-s2',
                    delsvar: { del: 'b', text: '$5$ besökare per timme' },
                },
            ],
            svar: '**a)** Alternativ C (15.00–16.00)&emsp;&emsp;**b)** $5$ besökare per timme',
            bedomning: [
                ['a) Korrekt svar (C: 15.00–16.00)', '+E'],
                ['b) Godtagbar lösning med korrekt svar ($5$ besökare/h). Svar utan godtagbar enhet ges 0 poäng', '+E'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [2, 0, 0], omrade: 'Triangelsatserna: sinussatsen och tangens',
            genomgangar: ['ma3c-6.6', 'ma3c-6.1'],
            fraga: 'Samir och Viktor har fått i uppgift att bestämma höjden av glaspelaren i ' +
                'fontänen på Sergels torg. De mäter avståndet mellan två punkter $A$ och $B$ ' +
                'samt vinklarna till en punkt $C$.\n\n' +
                'Punkt $C$ befinner sig rakt under glaspelarens högsta punkt $D$ och på samma ' +
                'höjd som punkterna $A$ och $B$.\n\n' +
                'Samir och Viktor mäter även höjdvinkeln $CAD$. Se figur.\n\n' +
                'Beräkna höjden av glaspelaren, det vill säga längden av sträckan $CD$ i figuren.',
            figur: 'u21',
            steg: [
                {
                    rubrik: 'Bestäm vinkeln vid C i triangeln ABC',
                    varfor: 'Figuren är ritad i perspektiv, så vinklarna ser inte ut som de är. ' +
                        'Det finns två trianglar: $ABC$ ligger på marken och $ACD$ står lodrätt, ' +
                        'med en rät vinkel i $C$ eftersom $D$ ligger rakt ovanför $C$. Höjden ' +
                        '$CD$ finns i triangeln $ACD$, men där känner vi bara vinkeln $42^\\circ$. ' +
                        'Sidan $AC$ har den gemensam med triangeln $ABC$, där vi känner en sida ' +
                        'och två vinklar. Vi börjar alltså med att beräkna $AC$.',
                    text: 'Vinkelsumman i triangeln $ABC$ ger vinkeln vid $C$:\n\n' +
                        '$$\\angle ACB = 180^\\circ - 43^\\circ - 55^\\circ = 82^\\circ$$',
                    figur: 'u21-s1',
                },
                {
                    rubrik: 'Beräkna AC med sinussatsen',
                    varfor: 'Sinussatsen parar ihop varje sida med vinkeln mitt emot den. Sidan ' +
                        '$AC$ står mot vinkeln $B = 55^\\circ$, och den kända sidan $AB = 50$ m ' +
                        'står mot vinkeln $C = 82^\\circ$.',
                    text: '$$\\dfrac{AC}{\\sin 55^\\circ} = \\dfrac{50}{\\sin 82^\\circ}$$\n\n' +
                        'Multiplicera båda led med $\\sin 55^\\circ$:\n\n' +
                        '$$\\dfrac{AC}{\\sin 55^\\circ} \\cdot \\boldsymbol{\\sin 55^\\circ} = ' +
                        '\\dfrac{50}{\\sin 82^\\circ} \\cdot \\boldsymbol{\\sin 55^\\circ}$$\n\n' +
                        '$$AC =\\dfrac{50 \\cdot \\sin 55^\\circ}{\\sin 82^\\circ} = 41{,}36\\ldots\\ \\mathrm{m}$$',
                    figur: 'u21-s2',
                },
                {
                    rubrik: 'Beräkna CD i den rätvinkliga triangeln ACD',
                    varfor: 'I triangeln $ACD$ är vinkeln vid $C$ rät. Sett från vinkeln ' +
                        '$42^\\circ$ i $A$ är $CD$ motstående katet och $AC$ närliggande katet, ' +
                        'och kvoten mellan dem är tangens.',
                    text: '$$\\tan 42^\\circ = \\dfrac{CD}{AC}$$\n\n' +
                        'Multiplicera båda led med $AC$:\n\n' +
                        '$$\\tan 42^\\circ \\cdot \\boldsymbol{AC} = \\dfrac{CD}{AC} \\cdot \\boldsymbol{AC}$$\n\n' +
                        '$$CD = AC \\cdot \\tan 42^\\circ$$\n\n' +
                        'Sätt in $AC = 41{,}36\\ldots$ utan att avrunda:\n\n' +
                        '$$CD = 41{,}36\\ldots \\cdot \\tan 42^\\circ = ' +
                        '37{,}24\\ldots \\approx 37\\ \\mathrm{m}$$\n\n' +
                        '**Rimlighet:** vinkeln $42^\\circ$ är lite mindre än $45^\\circ$, så ' +
                        'höjden ska vara lite kortare än avståndet $AC \\approx 41$ m. Det stämmer. ' +
                        'Avståndet $50$ m har två värdesiffror, så svaret ges med två.',
                    figur: 'u21-s3',
                },
            ],
            svar: 'Glaspelaren är cirka $37$ m hög.',
            bedomning: [
                ['Godtagbar ansats, till exempel bestämmer sträckan $AC$, $41{,}4$ m', '+E'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($37$ m)', '+E'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [1, 0, 0], omrade: 'Derivata: sambandet mellan f och f′',
            genomgangar: ['ma3c-4.1', 'ma3c-4.2'],
            fraga: 'Figuren visar huvuddragen av graferna till funktionerna $f$ och $g$. Den ena ' +
                'funktionen är den andra funktionens derivata.\n\n' +
                'Förklara vilken av funktionerna, $f$ eller $g$, som är derivata till den andra.',
            figur: 'u22',
            steg: [
                {
                    rubrik: 'Jämför extrempunkterna med nollställena',
                    varfor: 'Derivatan är grafens lutning. Där en graf har en extrempunkt är ' +
                        'tangenten vågrät, och då är derivatan $0$. Derivatans graf ska alltså ' +
                        'skära $x$-axeln precis under den andra grafens extrempunkter.',
                    text: 'Grafen till $f$ har en minimipunkt där $x = 0$ och en maximipunkt där ' +
                        '$x = 2$. Grafen till $g$ har sina nollställen just i $x = 0$ och $x = 2$. ' +
                        'Det passar med att $g = f\'$.',
                    figur: 'u22-s1',
                },
                {
                    rubrik: 'Jämför tecknet med var grafen växer',
                    varfor: 'Där en funktion växer är derivatan positiv, och där den avtar är ' +
                        'derivatan negativ. Det ger en andra kontroll.',
                    text: '$f$ växer mellan $x = 0$ och $x = 2$, och där är $g(x) > 0$. För ' +
                        '$x < 0$ och $x > 2$ avtar $f$, och där är $g(x) < 0$.\n\n' +
                        'Omvänt fungerar det inte: $g$ har en maximipunkt där $x = 1$, men $f(1)$ ' +
                        'är inte $0$. Alltså är $f$ inte derivata till $g$.\n\n' +
                        'Det syns också på graferna: $f$ ser ut som en tredjegradsfunktion och $g$ ' +
                        'som en andragradsfunktion. Deriverar man en tredjegradsfunktion får man ' +
                        'en andragradsfunktion.',
                    figur: 'u22-s2',
                },
            ],
            svar: '$g$ är derivata till $f$. Grafen till $g$ har nollställen där $f$ har sina ' +
                'extrempunkter ($x = 0$ och $x = 2$), och $g$ är positiv där $f$ växer och ' +
                'negativ där $f$ avtar.',
            bedomning: [
                ['Godtagbart enkelt resonemang som inkluderar en enkel motivering till varför $g$ är derivata till $f$ (till exempel "$g$ är derivatan, deriverar man en tredjegradare så får man en andragradare")', '+E'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [1, 0, 0], omrade: 'Derivata: digitalt verktyg',
            genomgangar: ['ma3c-3.7', 'ma4-2.3'],
            endastSvar: true,
            fraga: 'Funktionen $f$ som ges av $f(x) = (2x + 1)^{13}$ kan inte deriveras direkt med ' +
                'hjälp av deriveringsreglerna inom denna kurs.\n\n' +
                'Använd ditt digitala hjälpmedel för att beräkna ett värde på $f\'(0)$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Låt det digitala verktyget derivera',
                    varfor: 'Funktionen är en parentes upphöjd till 13, en sammansatt funktion. ' +
                        'Verktyget kan ändå beräkna derivatans värde i en punkt. I GeoGebra ' +
                        'skriver man `f(x) = (2x + 1)^13` och sedan `f\'(0)`.',
                    text: '$$f\'(0) = 26$$',
                },
                {
                    rubrik: 'Förstå vad verktyget räknar',
                    varfor: 'Derivatan är tangentens lutning. Med en sekant över ett mycket ' +
                        'litet intervall kring $x = 0$ får man nästan samma värde, och det är ' +
                        'så en numerisk derivata fungerar.',
                    text: '$$\\dfrac{f(0{,}001) - f(-0{,}001)}{0{,}002} \\approx 26{,}0$$\n\n' +
                        '(Kontroll med kedjeregeln, som hör till nästa nivå: ' +
                        '$f\'(x) = 13 \\cdot (2x + 1)^{12} \\cdot 2$ ger $f\'(0) = 13 \\cdot 1 \\cdot 2 = 26$.)',
                },
            ],
            svar: '$f\'(0) = 26$',
            bedomning: [
                ['Godtagbart svar ($26$). En viss avvikelse från det korrekta värdet kan tolereras beroende på vald metod', '+E'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [0, 2, 0], omrade: 'Derivata: exponentialfunktion och ekvation',
            genomgangar: ['ma3c-3.5', 'ma2c-5.4'],
            fraga: 'För funktionen $f$ gäller att $f(x) = 5 \\cdot \\mathrm{e}^{-0{,}4x} + 100x$\n\n' +
                'Lös ekvationen $f\'(x) = 12$',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera f',
                    varfor: 'Derivatan av $\\mathrm{e}^{kx}$ är $k \\cdot \\mathrm{e}^{kx}$, så ' +
                        'exponentens konstant $-0{,}4$ kommer ned som faktor. Termen $100x$ har ' +
                        'derivatan $100$.',
                    text: '$$f\'(x) = 5 \\cdot (-0{,}4) \\cdot \\mathrm{e}^{-0{,}4x} + 100 = ' +
                        '-2\\mathrm{e}^{-0{,}4x} + 100$$',
                },
                {
                    rubrik: 'Ställ upp ekvationen',
                    varfor: 'Nu ska derivatan vara lika med $12$.',
                    text: '$$-2\\mathrm{e}^{-0{,}4x} + 100 = 12$$',
                },
                {
                    rubrik: 'Få potensen ensam',
                    varfor: 'Subtrahera först $100$ från båda led och dividera sedan båda led ' +
                        'med $-2$.',
                    text: '$$-2\\mathrm{e}^{-0{,}4x} + 100 \\mathbin{\\boldsymbol{-}} \\boldsymbol{100} = ' +
                        '12 \\mathbin{\\boldsymbol{-}} \\boldsymbol{100}$$\n\n' +
                        '$$-2\\mathrm{e}^{-0{,}4x} = -88$$\n\n' +
                        '$$\\dfrac{-2\\mathrm{e}^{-0{,}4x}}{\\boldsymbol{-2}} = \\dfrac{-88}{\\boldsymbol{-2}}$$\n\n' +
                        '$$\\mathrm{e}^{-0{,}4x} = 44$$',
                },
                {
                    rubrik: 'Logaritmera båda led',
                    varfor: 'Den obekanta sitter i exponenten. Den naturliga logaritmen tar ' +
                        'ned exponenten som faktor, och $\\ln \\mathrm{e} = 1$.',
                    text: '$$\\ln \\mathrm{e}^{-0{,}4x} = \\ln 44$$\n\n' +
                        '$$-0{,}4x \\cdot \\ln \\mathrm{e} = \\ln 44$$\n\n' +
                        '$$-0{,}4x = \\ln 44$$',
                },
                {
                    rubrik: 'Lös ut x',
                    varfor: 'Dividera båda led med $-0{,}4$. Med digitalt verktyg kan man också ' +
                        'lösa ekvationen direkt, till exempel med `NLös(-2exp(-0.4x) + 100 = 12)`, ' +
                        'eller rita $y = f\'(x)$ och $y = 12$ och läsa av skärningspunkten.',
                    text: '$$\\dfrac{-0{,}4x}{\\boldsymbol{-0{,}4}} = \\dfrac{\\ln 44}{\\boldsymbol{-0{,}4}}$$\n\n' +
                        '$$x = \\dfrac{\\ln 44}{-0{,}4} = -9{,}4604\\ldots \\approx -9{,}46$$\n\n' +
                        '**Kontroll:** $f\'(-9{,}46) = -2\\mathrm{e}^{3{,}784} + 100 \\approx 12$.',
                    figur: 'u24-s1',
                },
            ],
            svar: '$x \\approx -9{,}46$',
            bedomning: [
                ['Godtagbar ansats, till exempel deriverar och tecknar ekvationen $-2 \\cdot \\mathrm{e}^{-0{,}4x} + 100 = 12$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($x = -9{,}46$)', '+C'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 4, 0], omrade: 'Triangelsatserna: cosinussatsen och areasatsen',
            genomgangar: ['ma3c-6.7', 'ma3c-6.5', 'ma3c-6.8'],
            fraga: 'Ken ska anlägga en gräsmatta på sin tomt. Han mäter sidorna till 13&nbsp;m, ' +
                '20&nbsp;m, 10&nbsp;m och 24&nbsp;m. En av gräsmattans vinklar är $90^\\circ$. Se figur.\n\n' +
                'Ken har gräsfrö som räcker till $250\\ \\mathrm{m^2}$. Avgör med hjälp av någon eller ' +
                'några av triangelsatserna (sinussatsen, cosinussatsen och areasatsen) om ' +
                'gräsfröna kommer att räcka till hela gräsmattan.',
            figur: 'u25',
            steg: [
                {
                    rubrik: 'Dela gräsmattan i två trianglar',
                    varfor: 'Triangelsatserna gäller trianglar, så fyrhörningen delas med en ' +
                        'diagonal. Diagonalen från det nedre vänstra hörnet till det övre högra ' +
                        'ger en rätvinklig triangel med kateterna $24$ m och $10$ m, och där ger ' +
                        'Pythagoras sats diagonalen $d$.',
                    text: '$$d^2 = 24^2 + 10^2 = 576 + 100 = 676$$\n\n' +
                        '$$d = \\sqrt{676} = 26\\ \\mathrm{m}$$',
                    figur: 'u25-s1',
                },
                {
                    rubrik: 'Ställ upp cosinussatsen i den andra triangeln',
                    varfor: 'Den andra triangeln har sidorna $13$, $20$ och $26$ m men ingen ' +
                        'känd vinkel. Areasatsen behöver två sidor och vinkeln mellan dem. Kalla ' +
                        'vinkeln mellan sidorna $13$ och $20$ för $\\alpha$. Den står mitt emot ' +
                        'diagonalen, och då ger cosinussatsen den.',
                    text: '$$26^2 = 13^2 + 20^2 - 2 \\cdot 13 \\cdot 20 \\cdot \\cos \\alpha$$\n\n' +
                        '$$676 = 569 - 520\\cos \\alpha$$',
                    figur: 'u25-s2',
                },
                {
                    rubrik: 'Lös ut vinkeln α',
                    varfor: 'Subtrahera $569$ från båda led och dividera med $-520$. Cosinus ' +
                        'blir negativt, alltså är vinkeln trubbig, och det stämmer med figuren.',
                    text: '$$676 \\mathbin{\\boldsymbol{-}} \\boldsymbol{569} = ' +
                        '569 - 520\\cos \\alpha \\mathbin{\\boldsymbol{-}} \\boldsymbol{569}$$\n\n' +
                        '$$107 = -520\\cos \\alpha$$\n\n' +
                        '$$\\dfrac{107}{\\boldsymbol{-520}} = \\dfrac{-520\\cos \\alpha}{\\boldsymbol{-520}}$$\n\n' +
                        '$$\\cos \\alpha = -0{,}2057\\ldots$$\n\n' +
                        '$$\\alpha = 101{,}87\\ldots^\\circ$$',
                },
                {
                    rubrik: 'Beräkna de två triangelareorna',
                    varfor: 'Den rätvinkliga triangelns area är bas gånger höjd delat med två. ' +
                        'Den andra triangelns area ger areasatsen med sidorna $13$ och $20$ och ' +
                        'vinkeln $\\alpha$ mellan dem. Behåll alla decimaler i $\\alpha$.',
                    text: '$$T_1 = \\dfrac{24 \\cdot 10}{2} = 120\\ \\mathrm{m^2}$$\n\n' +
                        '$$T_2 = \\dfrac{13 \\cdot 20 \\cdot \\sin 101{,}87\\ldots^\\circ}{2} = ' +
                        '127{,}21\\ldots\\ \\mathrm{m^2}$$',
                    figur: 'u25-s3',
                },
                {
                    rubrik: 'Lägg ihop och jämför med 250 m²',
                    varfor: 'Gräsmattans area är summan av de två trianglarna. Den ska jämföras ' +
                        'med de $250\\ \\mathrm{m^2}$ som fröna räcker till.',
                    text: '$$T = 120 + 127{,}21\\ldots = 247{,}21\\ldots \\approx 247\\ \\mathrm{m^2}$$\n\n' +
                        'Eftersom $247 < 250$ räcker gräsfröna, men marginalen är liten.',
                },
            ],
            svar: 'Ja, gräsmattans area blir cirka $247\\ \\mathrm{m^2}$, så gräsfröna räcker.',
            bedomning: [
                ['Godtagbar ansats, till exempel beräknar hypotenusans längd i den rätvinkliga triangeln, $26$ m', '+C'],
                ['med godtagbar fortsättning, till exempel beräknar en användbar vinkel med cosinussatsen', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar (Ja, arean blir $247\\ \\mathrm{m^2}$ så gräsfröna räcker)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 3, 0], omrade: 'Integraler: tillämpning',
            genomgangar: ['ma3c-5.7', 'ma3c-5.4', 'ma3c-5.5'],
            fraga: 'I en musiktävling sker röstningen med hjälp av en mobilapp. Antalet ' +
                'inkommande röster per minut kan beskrivas med sambandet\n\n' +
                '$$r(x) = 12\\,600x - 140x^2$$\n\n' +
                'där $x$ är tiden i minuter efter att röstningen startat. Totalt registrerades ' +
                '12,6 miljoner röster under tävlingen.\n\n' +
                'Beräkna hur många minuter röstningen pågick.',
            figur: null,
            steg: [
                {
                    rubrik: 'Tolka r(x) och teckna en integral',
                    varfor: 'Funktionen $r$ anger röster **per minut**, och den ändras hela ' +
                        'tiden. Det totala antalet röster från start till tiden $t$ minuter är ' +
                        'därför arean under grafen, alltså integralen av $r$ från $0$ till $t$. ' +
                        'Röster per minut gånger minuter blir röster.',
                    text: '$$\\int_{0}^{t} \\left( 12\\,600x - 140x^2 \\right) \\mathrm{d}x = 12\\,600\\,000$$',
                    figur: 'u26-s1',
                },
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'Ta fram den primitiva funktionen term för term: $x$ blir ' +
                        '$\\dfrac{x^2}{2}$ och $x^2$ blir $\\dfrac{x^3}{3}$. Den undre gränsen $0$ ' +
                        'ger noll i båda termerna.',
                    text: '$$\\left[ 6\\,300x^2 - \\dfrac{140x^3}{3} \\right]_{0}^{t} = 12\\,600\\,000$$\n\n' +
                        '$$6\\,300t^2 - \\dfrac{140t^3}{3} = 12\\,600\\,000$$',
                },
                {
                    rubrik: 'Lös ekvationen med digitalt verktyg',
                    varfor: 'Ekvationen är av tredje graden, så den löses digitalt. I GeoGebras ' +
                        'CAS-fönster: `Lös(Integral(12600x - 140x^2, 0, t) = 12600000, t)`. ' +
                        'Verktyget ger tre lösningar.',
                    text: '$$t_1 \\approx -39{,}4 \\qquad t_2 = 60 \\qquad t_3 \\approx 114{,}4$$',
                },
                {
                    rubrik: 'Välj den lösning som passar sammanhanget',
                    varfor: 'En negativ tid är orimlig. Faktoriseras $r(x) = 140x(90 - x)$ syns ' +
                        'att antalet röster per minut blir negativt efter $90$ minuter, och ' +
                        'negativa röster finns inte. Modellen gäller alltså bara för ' +
                        '$0 \\leq x \\leq 90$, och $t_3 \\approx 114$ förkastas.',
                    text: 'Röstningen pågick i $t = 60$ minuter.\n\n' +
                        '**Kontroll:** $6\\,300 \\cdot 60^2 - \\dfrac{140 \\cdot 60^3}{3} = ' +
                        '22\\,680\\,000 - 10\\,080\\,000 = 12\\,600\\,000$',
                    figur: 'u26-s2',
                },
            ],
            svar: 'Röstningen pågick i $60$ minuter.',
            bedomning: [
                ['Godtagbar ansats, till exempel tecknar ekvationen $\\displaystyle\\int_0^t (12\\,600x - 140x^2)\\,\\mathrm{d}x = 12\\,600\\,000$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($60$ min)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 1, 2], omrade: 'Rationella funktioner och gränsvärden',
            genomgangar: ['ma3c-1.6', 'ma3c-1.3'],
            fraga: 'Ett företag väver mönstrade band i olika längder. Mycket korta band kan vara ' +
                'dyrare än längre band att tillverka eftersom vävmaskinen måste ställas om för ' +
                'varje nytt band.\n\n' +
                'Priset $P(x)$ kronor för ett band som är $x$ meter långt kan beskrivas med ' +
                'följande modell\n\n' +
                '$$P(x) = \\dfrac{20x^2 + 150}{x}$$\n\n' +
                '**a)** Kalle beställer ett 5 meter långt band och undrar över meterpriset. Beräkna ' +
                'priset uttryckt i kronor per meter.\n\n' +
                '**b)** För kunder som beställer mycket långa band kan företaget ge ett fast pris ' +
                'uttryckt i kronor per meter. Använd modellen och visa hur det fasta meterpriset ' +
                'för mycket långa band kan bestämmas.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Beräkna priset för 5 meter',
                    varfor: 'Priset för hela bandet är funktionsvärdet $P(5)$.',
                    text: '$$P(5) = \\dfrac{20 \\cdot 5^2 + 150}{5} = \\dfrac{500 + 150}{5} = ' +
                        '\\dfrac{650}{5} = 130\\ \\text{kr}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Dela med längden',
                    varfor: 'Meterpriset är priset för hela bandet delat med antalet meter.',
                    text: '$$\\dfrac{130}{5} = 26\\ \\text{kr/m}$$',
                    delsvar: { del: 'a', text: '$26$ kr/m' },
                },
                {
                    del: 'b',
                    rubrik: 'Teckna meterpriset för ett band med längden x',
                    varfor: 'Som i a) är meterpriset priset delat med längden, alltså ' +
                        '$\\dfrac{P(x)}{x}$. Att dela med $x$ är detsamma som att multiplicera ' +
                        'nämnaren med $x$. Sedan delas bråket upp term för term.',
                    text: '$$\\dfrac{P(x)}{x} = \\dfrac{20x^2 + 150}{x \\cdot x} = ' +
                        '\\dfrac{20x^2 + 150}{x^2} = \\dfrac{20x^2}{x^2} + \\dfrac{150}{x^2} = ' +
                        '20 + \\dfrac{150}{x^2}$$\n\n' +
                        '(Kontroll mot a): $20 + \\dfrac{150}{25} = 26$.)',
                },
                {
                    rubrik: 'Låt bandet bli mycket långt',
                    del: 'b',
                    varfor: 'Ett mycket långt band betyder att $x$ växer obegränsat. Då har ' +
                        'termen $\\dfrac{150}{x^2}$ en oändlighet enbart i nämnaren, och den går ' +
                        'mot $0$. Kvar blir $20$. Omställningskostnaden fördelas på så många ' +
                        'meter att den inte märks.',
                    text: '$$\\lim_{x \\to \\infty} \\left( 20 + \\dfrac{150}{x^2} \\right) = 20 + 0 = 20$$\n\n' +
                        'Till exempel ger $x = 100$ meterpriset $20 + \\dfrac{150}{10\\,000} = 20{,}015$ kr/m. ' +
                        'Meterpriset närmar sig alltså $20$ kr/m men blir aldrig lägre.',
                    figur: 'u27-s1',
                    delsvar: { del: 'b', text: 'Meterpriset är $\\dfrac{P(x)}{x} = 20 + \\dfrac{150}{x^2}$, som närmar sig $20$ kr/m när $x$ blir mycket stort. Det fasta meterpriset blir $20$ kr/m.' },
                },
            ],
            svar: '**a)** $26$ kr/m&emsp;&emsp;**b)** $\\dfrac{P(x)}{x} = 20 + \\dfrac{150}{x^2} \\to 20$ ' +
                'när $x \\to \\infty$, så det fasta meterpriset blir $20$ kr/m.',
            bedomning: [
                ['a) Godtagbar lösning med korrekt svar ($26$ kr/m)', '+C'],
                ['b) Godtagbar ansats, påbörjar ett välgrundat och nyanserat resonemang, till exempel tecknar och förenklar en relevant kvot, $\\dfrac{P(x)}{x} = 20 + \\dfrac{150}{x^2}$', '+A'],
                ['b) med fortsatt välgrundat och nyanserat resonemang som visar att priset närmar sig $20$ kr/m för mycket långa band', '+A'],
            ],
        },

        {
            nr: 28, del: 'D', poang: [0, 0, 4], omrade: 'Optimering: billigaste burken',
            genomgangar: ['ma3c-4.6', 'ma3c-4.5', 'ma3c-3.3'],
            fraga: 'I en fabrik tillverkas varmkorv. Korven ska förpackas i en plåtburk som har ' +
                'formen av en rak cirkulär cylinder. Priset för materialet som används till ' +
                'burkens botten och lock är $0{,}20\\ \\mathrm{kr/dm^2}$ medan priset för materialet ' +
                'till burkens mantelyta är $0{,}10\\ \\mathrm{kr/dm^2}$.\n\n' +
                'Fabriken vill använda en burk med så låg materialkostnad som möjligt. Volymen på ' +
                'burken ska vara $2{,}0\\ \\mathrm{dm^3}$.\n\n' +
                'Bestäm hur mycket materialet till denna burk kostar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Inför beteckningar och använd volymen',
                    varfor: 'Burkens form bestäms av radien $r$ och höjden $h$ (i dm). Volymen ' +
                        'är låst till $2{,}0\\ \\mathrm{dm^3}$, så de två måtten hänger ihop: ' +
                        'väljs $r$ är $h$ bestämd. Det gör att kostnaden kan skrivas med en ' +
                        'enda variabel.',
                    text: '$$\\pi r^2 h = 2{,}0 \\quad \\Longleftrightarrow \\quad h = \\dfrac{2{,}0}{\\pi r^2}$$',
                    figur: 'u28-s1',
                },
                {
                    rubrik: 'Teckna materialkostnaden',
                    varfor: 'Botten och lock är två cirklar med arean $\\pi r^2$ vardera och ' +
                        'kostar $0{,}20$ kr per kvadratdecimeter. Manteln är en rektangel med ' +
                        'bredden $2\\pi r$ (omkretsen) och höjden $h$, och den kostar $0{,}10$ kr ' +
                        'per kvadratdecimeter.',
                    text: '$$K = 0{,}20 \\cdot 2\\pi r^2 + 0{,}10 \\cdot 2\\pi r h = ' +
                        '0{,}40\\pi r^2 + 0{,}20\\pi r h$$',
                },
                {
                    rubrik: 'Sätt in h och få en funktion av r',
                    varfor: 'Ersätt $h$ med $\\dfrac{2{,}0}{\\pi r^2}$. I den andra termen ' +
                        'förkortas $\\pi$ och en faktor $r$ bort.',
                    text: '$$K(r) = 0{,}40\\pi r^2 + 0{,}20\\pi r \\cdot \\dfrac{2{,}0}{\\pi r^2} = ' +
                        '0{,}40\\pi r^2 + \\dfrac{0{,}40}{r}, \\quad r > 0$$',
                },
                {
                    rubrik: 'Derivera och sätt derivatan lika med 0',
                    varfor: 'Den lägsta kostnaden finns där derivatan är $0$. Skriv ' +
                        '$\\dfrac{0{,}40}{r} = 0{,}40r^{-1}$, så ger potensregeln derivatan ' +
                        '$-0{,}40r^{-2}$.',
                    text: '$$K\'(r) = 0{,}80\\pi r - \\dfrac{0{,}40}{r^2} = 0$$',
                },
                {
                    rubrik: 'Lös ut r',
                    varfor: 'Multiplicera båda led med $r^2$ så att nämnaren försvinner, addera ' +
                        '$0{,}40$ till båda led och dividera båda led med $0{,}80\\pi$. Då står ' +
                        '$r^3$ ensamt, och tredjeroten ur båda led ger $r$.',
                    text: '$$\\left( 0{,}80\\pi r - \\dfrac{0{,}40}{r^2} \\right) \\cdot \\boldsymbol{r^2} = 0 \\cdot \\boldsymbol{r^2}$$\n\n' +
                        '$$0{,}80\\pi r \\cdot r^2 - \\dfrac{0{,}40}{r^2} \\cdot r^2 = 0$$\n\n' +
                        '$$0{,}80\\pi r^3 - 0{,}40 = 0$$\n\n' +
                        '$$0{,}80\\pi r^3 - 0{,}40 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0{,}40} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0{,}40}$$\n\n' +
                        '$$0{,}80\\pi r^3 = 0{,}40$$\n\n' +
                        '$$\\dfrac{0{,}80\\pi r^3}{\\boldsymbol{0{,}80\\pi}} = \\dfrac{0{,}40}{\\boldsymbol{0{,}80\\pi}}$$\n\n' +
                        '$$r^3 = 0{,}1591\\ldots$$\n\n' +
                        '$$r = \\sqrt[3]{0{,}1591\\ldots} = 0{,}5419\\ldots\\ \\mathrm{dm}$$\n\n' +
                        'Digitalt: `NLös(0.8pi r - 0.4 / r^2 = 0)` ger samma $r$.',
                },
                {
                    rubrik: 'Verifiera att det är ett minimum',
                    varfor: 'Andraderivatan avgör vilken sorts extrempunkt det är: positiv ' +
                        'andraderivata betyder att grafen buktar uppåt, alltså en minimipunkt.',
                    text: '$$K\'\'(r) = 0{,}80\\pi + \\dfrac{0{,}80}{r^3} > 0 \\quad \\text{för alla } r > 0$$\n\n' +
                        'Alltså är $r = 0{,}5419\\ldots$ dm en minimipunkt, och eftersom det är den ' +
                        'enda extrempunkten för $r > 0$ ger den den lägsta kostnaden.',
                    figur: 'u28-s2',
                },
                {
                    rubrik: 'Beräkna den lägsta kostnaden',
                    varfor: 'Sätt in det oavrundade $r$ i $K(r)$. Avrunda först i sista steget. ' +
                        'Ett pris anges i hela ören, därför svaret $1{,}11$ kr fast givna data ' +
                        'bara har två värdesiffror.',
                    text: '$$K(0{,}5419\\ldots) = 0{,}40\\pi \\cdot 0{,}5419\\ldots^2 + ' +
                        '\\dfrac{0{,}40}{0{,}5419\\ldots} = 0{,}3690\\ldots + 0{,}7381\\ldots = ' +
                        '1{,}107\\ldots \\approx 1{,}11\\ \\text{kr}$$\n\n' +
                        'Burken får då höjden $h = \\dfrac{2{,}0}{\\pi \\cdot 0{,}5419\\ldots^2} \\approx 2{,}17$ dm, ' +
                        'fyra gånger radien. Det är rimligt att den billigaste burken är hög och ' +
                        'smal: botten och lock kostar dubbelt så mycket per kvadratdecimeter.',
                },
            ],
            svar: 'Materialet till den billigaste burken kostar cirka $1{,}11$ kr.',
            bedomning: [
                ['Godtagbar ansats, tecknar ett uttryck i en variabel för burkens pris', '+A'],
                ['med godtagbar fortsättning, till exempel bestämmer hur stor radien ska vara för att få lägsta pris på materialet till burken, $r = 0{,}542$', '+A'],
                ['med i övrigt godtagbar lösning, inklusive verifiering av minimipunkt, med godtagbart svar ($1{,}11$ kr)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        }
    );
})();

if (window.I18N) window.I18N.overlay('np/ma3c-vt2018');
