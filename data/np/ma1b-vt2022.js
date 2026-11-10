// Fysiklabbet — Nationellt prov Matematik 1b, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// ⚠️ PROVET ÄR HÄRLETT UR MA 1C VT 2022 (data/np/ma1c-vt2022.js).
// Ma 1b- och Ma 1c-proven från våren 2022 delar 26 av 32 uppgifter. De
// delade uppgifterna lagras bara EN gång, i ma1c-filen, och hämtas hit
// enligt KARTA nedan (1b-numret → 1c-numret). Det gäller text, figurer,
// lösningssteg och pennlösning: en rättelse i ma1c-filen slår alltså igenom
// här av sig självt. Ändra ALDRIG en delad uppgift "för 1b" — gör ändringen i
// ma1c-vt2022.js (och ma1c-vt2022-penna.js).
//
// Bara 1b-provets EGNA uppgifter (3, 5, 9, 23, 24 och 28) står i den här
// filen, i EGNA. Deras pennlösningar finns i ma1b-vt2022-penna.js och
// figurerna i ma1b-vt2022-figurer.js (nycklar 'b<nr>…', så att de aldrig
// krockar med de lånade 'u<nr>…'-nycklarna).
//
// Härledningen sker först när uppgiftslistan läses (en getter), så att
// filordningen inte spelar någon roll: Node-skripten laddar filerna i
// bokstavsordning, och ma1b kommer före ma1c. Den lånade uppgiften får
// - sitt 1b-nummer (nr),
// - pennlösningen från 1c (penna: 'ma1c-vt2022-u<nr>'),
// - teorilänkar omskrivna till 1b-avsnitt via window.MA1B_ALIAS när
//   avsnittet finns i 1b (ma1c-3.4 → ma1b-3.5); annars står 1c-länken kvar,
// - figurerna kopierade till NP_FIGURER['ma1b-vt2022'].
//
// Dataformat: se data/np/RIKTLINJER.md och huvudet i ma1c-vt2022.js.
// Källa: Skolverket/PRIM-gruppen. Provet återanvänds inte enligt beslut
// Dnr 6.2.1-2023:233 och får därför användas som övningsmaterial.

window.NP_PROV = window.NP_PROV || {};
(function () {
    var ID = 'ma1b-vt2022', KALLA = 'ma1c-vt2022', ALIAS = 'MA1B_ALIAS';

    // [1b-nummer, 1c-nummer, ändringar?]. Saknas 1c-numret är uppgiften
    // provets egen (står i EGNA). Ett tredje element skriver över fält i den
    // lånade uppgiften, till exempel { poang: [0, 1, 0] } om b-provet ger
    // uppgiften andra poäng.
    var KARTA = [
        [1, 1], [2, 2], [3], [4, 3], [5], [6, 4], [7, 5], [8, 6], [9], [10, 8],
        [11, 10], [12, 11], [13, 12], [14, 13], [15, 14], [16, 16],
        [17, 17], [18, 18], [19, 19], [20, 20], [21, 21],
        [22, 22], [23], [24], [25, 24], [26, 25], [27, 27], [28], [29, 29],
        [30, 30], [31, 31], [32, 32],
    ];

    var EGNA = [

        // ================= DELPROV B =================
        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Exponentialfunktion: värdeminskning',
            genomgangar: ['ma1b-3.2', 'ma1b-4.9'],
            endastSvar: true,
            fraga: 'En bil kostar $420\\,000$ kr i inköpspris. Bilens värde minskar med $15\\ \\%$ per år. ' +
                'Skriv en funktion $y$ som beskriver bilens värde i kronor $x$ år efter inköp.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm förändringsfaktorn',
                    varfor: 'Minskar något med $15\\ \\%$ finns $100\\ \\% - 15\\ \\% = 85\\ \\%$ kvar. ' +
                        'Att ta $85\\ \\%$ av ett värde är detsamma som att multiplicera med $0{,}85$. ' +
                        'Det talet är förändringsfaktorn.',
                    text: '$$1 - 0{,}15 = 0{,}85$$',
                },
                {
                    rubrik: 'Multiplicera med förändringsfaktorn en gång per år',
                    varfor: 'Efter ett år är värdet $420\\,000 \\cdot 0{,}85$, efter två år ' +
                        '$420\\,000 \\cdot 0{,}85 \\cdot 0{,}85 = 420\\,000 \\cdot 0{,}85^2$, och så vidare. ' +
                        'Efter $x$ år har vi multiplicerat med $0{,}85$ precis $x$ gånger. ' +
                        'Det ger en exponentialfunktion $y = C \\cdot a^x$ med startvärdet ' +
                        '$C = 420\\,000$ och förändringsfaktorn $a = 0{,}85$.',
                    text: '$$y = 420\\,000 \\cdot 0{,}85^x$$',
                },
                {
                    rubrik: 'Rimlighetskontroll',
                    varfor: 'När $x = 0$ ska funktionen ge inköpspriset, och eftersom $0{,}85 < 1$ ' +
                        'ska värdet minska år för år.',
                    text: '$$y(0) = 420\\,000 \\cdot 0{,}85^0 = 420\\,000 \\cdot 1 = 420\\,000$$\n\n' +
                        'Stämmer med inköpspriset.',
                },
            ],
            svar: '$y = 420\\,000 \\cdot 0{,}85^x$',
            bedomning: [['Korrekt svar ($y = 420\\,000 \\cdot 0{,}85^x$)', '+E']],
        },

        {
            nr: 5, del: 'B', poang: [1, 0, 0], omrade: 'Index: procentuell förändring',
            genomgangar: ['ma1b-3.4', 'ma1b-3.1'],
            endastSvar: true,
            fraga: 'Diagrammet visar indexutvecklingen för priset för glassen Päronis mellan åren ' +
                '$1980$ och $2020$.\n\n' +
                'Med hur många procent har priset för Päronis ökat mellan åren $1980$ och $2020$?',
            figur: 'b5',
            steg: [
                {
                    rubrik: 'Läs av indexet för de två åren',
                    varfor: 'Ett index jämför ett pris med priset ett basår, där indexet är $100$. ' +
                        'Här är $1980$ basåret.',
                    text: '$$\\text{År } 1980\\text{: index } 100 \\qquad\\qquad \\text{År } 2020\\text{: index } 615$$',
                    figur: 'b5-los1',
                },
                {
                    rubrik: 'Beräkna ökningen i indexenheter',
                    varfor: 'Priset ändras i samma proportion som indexet. Därför räcker det att ' +
                        'räkna på indextalen, och vi behöver inte veta vad glassen kostade.',
                    text: '$$615 - 100 = 515$$',
                },
                {
                    rubrik: 'Uttryck ökningen i procent av basårets index',
                    varfor: 'En procentuell ökning räknas alltid från det ursprungliga värdet, ' +
                        'alltså från $100$. Att jämföra med just $100$ gör att ökningen i ' +
                        'indexenheter direkt blir procenttalet.',
                    text: '$$\\dfrac{515}{100} = 5{,}15 = 515\\ \\%$$\n\n' +
                        'Priset har alltså blivit drygt sex gånger så högt ($615\\ \\%$ av priset ' +
                        '$1980$), och ökningen är $515\\ \\%$.',
                },
            ],
            svar: 'Priset har ökat med $515\\ \\%$.',
            bedomning: [['Korrekt svar ($515\\ \\%$)', '+E']],
        },

        {
            nr: 9, del: 'B', poang: [0, 1, 0], omrade: 'Olikheter',
            genomgangar: ['ma1b-2.11'],
            endastSvar: true,
            fraga: 'Lös olikheten $-4x - 10 < 90$',
            figur: null,
            steg: [
                {
                    rubrik: 'Addera 10 till båda led',
                    varfor: 'En olikhet löses som en ekvation: samma operation i båda led. ' +
                        'Att addera eller subtrahera ett tal ändrar aldrig olikhetstecknet.',
                    text: '$$-4x - 10 \\mathbin{\\boldsymbol{+}} \\boldsymbol{10} < 90 \\mathbin{\\boldsymbol{+}} \\boldsymbol{10}$$\n\n' +
                        '$$-4x < 100$$',
                },
                {
                    rubrik: 'Dividera båda led med −4 och vänd olikhetstecknet',
                    varfor: 'När båda led multipliceras eller divideras med ett **negativt** tal byter ' +
                        'leden plats på tallinjen, och då måste olikhetstecknet vändas. ' +
                        'Jämför med $-1 < 2$: dividerar vi med $-1$ blir det $1 > -2$.',
                    text: '$$\\dfrac{-4x}{\\boldsymbol{-4}} > \\dfrac{100}{\\boldsymbol{-4}}$$\n\n' +
                        '$$x > -25$$',
                },
                {
                    rubrik: 'Kontrollera med ett tal i lösningsmängden',
                    varfor: 'Välj ett tal som är större än $-25$, till exempel $x = 0$, och ett som ' +
                        'är mindre, till exempel $x = -30$. Det första ska uppfylla olikheten, ' +
                        'det andra inte.',
                    text: '$$x = 0\\text{:}\\quad -4 \\cdot 0 - 10 = -10 < 90 \\quad \\text{stämmer}$$\n\n' +
                        '$$x = -30\\text{:}\\quad -4 \\cdot (-30) - 10 = 110 \\quad \\text{som inte är mindre än } 90$$',
                },
            ],
            svar: '$x > -25$',
            bedomning: [['Korrekt svar ($x > -25$)', '+C']],
        },

        // ================= DELPROV D =================
        {
            nr: 23, del: 'D', poang: [2, 0, 0], omrade: 'Linjär modell: fast och rörlig kostnad',
            genomgangar: ['ma1b-4.1', 'ma1b-4.5'],
            fraga: 'Familjen Josefssons diskmaskin har gått sönder. De ringer en tekniker för att få ' +
                'den lagad. Teknikern tar betalt med en fast avgift på $300$ kr samt en avgift per ' +
                'timme. Teknikern arbetar i $3$ timmar och den totala kostnaden blir $1\\,440$ kr.\n\n' +
                'Skapa en formel där $y$ beskriver den totala kostnaden i kronor för $x$ antal ' +
                'arbetade timmar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Dra bort den fasta avgiften',
                    varfor: 'Den fasta avgiften betalas en gång, hur länge teknikern än arbetar. ' +
                        'Det som blir kvar av totalkostnaden är vad de tre timmarna kostade.',
                    text: '$$1\\,440 - 300 = 1\\,140 \\text{ kr för } 3 \\text{ timmar}$$',
                },
                {
                    rubrik: 'Beräkna avgiften per timme',
                    varfor: 'Varje timme kostar lika mycket, så kostnaden för tre timmar delas ' +
                        'lika på tre.',
                    text: '$$\\dfrac{1\\,140}{3} = 380 \\text{ kr per timme}$$',
                },
                {
                    rubrik: 'Ställ upp formeln',
                    varfor: 'Totalkostnaden är timavgiften gånger antalet timmar plus den fasta ' +
                        'avgiften. Det är en linjär modell $y = kx + m$: timavgiften är ' +
                        'lutningen $k$ och den fasta avgiften är startvärdet $m$.',
                    text: '$$y = 380x + 300$$',
                },
                {
                    rubrik: 'Kontrollera med uppgiftens värden',
                    varfor: 'Formeln ska ge $1\\,440$ kr när $x = 3$.',
                    text: '$$y = 380 \\cdot 3 + 300 = 1\\,140 + 300 = 1\\,440$$\n\n' +
                        'Stämmer.',
                },
            ],
            svar: '$y = 380x + 300$',
            bedomning: [
                ['Beräknar avgiften per timme ($380$ kr)', '+E'],
                ['Korrekt svar ($y = 380x + 300$)', '+E'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [1, 1, 0], omrade: 'Linjärt samband: tolka tabell',
            genomgangar: ['ma1b-4.1', 'ma1b-5.1'],
            fraga: 'När det blåser känns det kallare än vad termometern visar. SMHI har gett ut en ' +
                'tabell över hur temperaturen upplevs beroende på faktisk temperatur och vindhastighet. ' +
                'Tabellens värden är upplevd temperatur i °C.\n\n' +
                '| Vindhastighet | $-15$ °C | $-10$ °C | $-5$ °C | $0$ °C | $5$ °C | $10$ °C |\n' +
                '| :--- | :---: | :---: | :---: | :---: | :---: | :---: |\n' +
                '| $2$ m/s | $-20$ | $-14$ | $-8$ | $-2$ | $3$ | $9$ |\n' +
                '| $5$ m/s | $-24$ | $-17$ | $-11$ | $-5$ | $1$ | $8$ |\n' +
                '| $10$ m/s | $-27$ | $-20$ | $-14$ | $-7$ | $0$ | $6$ |\n' +
                '| $15$ m/s | $-29$ | $-22$ | $-15$ | $-8$ | $-2$ | $5$ |\n' +
                '| $20$ m/s | $-31$ | $-23$ | $-16$ | $-9$ | $-2$ | $5$ |\n\n' +
                'Kolumnrubrikerna är den faktiska temperaturen (vid $0$ m/s).\n\n' +
                'Är sambandet mellan vindhastighet och upplevd temperatur linjärt för den faktiska ' +
                'temperaturen $0$ °C? Motivera.',
            figur: null,
            steg: [
                {
                    rubrik: 'Plocka ut kolumnen för 0 °C',
                    varfor: 'Frågan gäller bara den faktiska temperaturen $0$ °C, så vi läser den ' +
                        'kolumnen uppifrån och ned.',
                    text: '| Vindhastighet (m/s) | $2$ | $5$ | $10$ | $15$ | $20$ |\n' +
                        '| :--- | :---: | :---: | :---: | :---: | :---: |\n' +
                        '| Upplevd temperatur (°C) | $-2$ | $-5$ | $-7$ | $-8$ | $-9$ |',
                },
                {
                    rubrik: 'Vad kräver ett linjärt samband?',
                    varfor: 'Ett linjärt samband har en graf som är en rät linje. Då ändras ' +
                        'temperaturen **lika mycket** varje gång vindhastigheten ökar lika mycket, ' +
                        'eftersom lutningen är densamma överallt.',
                    text: 'Vi jämför därför ändringar över lika långa steg i vindhastighet. ' +
                        'Från $10$ till $15$ m/s och från $15$ till $20$ m/s är båda steg på $5$ m/s, ' +
                        'och likaså från $5$ till $10$ m/s.',
                },
                {
                    rubrik: 'Jämför ändringarna',
                    varfor: 'Blir ändringarna olika stora för lika stora steg kan grafen inte vara ' +
                        'en rät linje.',
                    text: '$$5 \\to 10 \\text{ m/s:}\\quad -7 - (-5) = -2 \\text{ °C}$$\n\n' +
                        '$$10 \\to 15 \\text{ m/s:}\\quad -8 - (-7) = -1 \\text{ °C}$$\n\n' +
                        '$$15 \\to 20 \\text{ m/s:}\\quad -9 - (-8) = -1 \\text{ °C}$$\n\n' +
                        'Samma ökning av vindhastigheten, $5$ m/s, sänker den upplevda temperaturen ' +
                        'med $2$ °C i det första steget men bara $1$ °C i det andra. Temperaturen ' +
                        'sjunker allt långsammare när det blåser mer.',
                },
            ],
            svar: 'Nej, sambandet är inte linjärt. När vindhastigheten ökar från $5$ till $10$ m/s ' +
                'sjunker den upplevda temperaturen med $2$ °C, men när den ökar lika mycket, från ' +
                '$10$ till $15$ m/s, sjunker den bara med $1$ °C. Ett linjärt samband skulle ge ' +
                'lika stor ändring för lika stora steg.',
            bedomning: [
                ['Korrekt slutsats med hänvisning till att värdena i tabellen förändras ickelinjärt, ' +
                    'utan specifika värden (eller felaktig slutsats utifrån specifika värden som ' +
                    'förändras linjärt)', '+E'],
                ['Korrekt slutsats med hänvisning till hur värdena förändras ickelinjärt utifrån ' +
                    'specifika värden i tabellen', '+C'],
            ],
        },

        {
            nr: 28, del: 'D', poang: [0, 2, 0], omrade: 'KPI: penningvärde',
            genomgangar: ['ma1b-3.4'],
            fraga: 'Tabellen visar både prissumman för Nobelpriset olika år och summans motsvarande ' +
                'penningvärde år $2016$. Använd KPI-tabellen för att bestämma prissumman år $2020$ ' +
                'i $2016$ års penningvärde.\n\n' +
                '| År | $2016$ | $2020$ |\n| :---: | :---: | :---: |\n| KPI | $316{,}43$ | $335{,}92$ |\n\n' +
                '| År | Prissumma (miljoner kronor) | Motsvarande penningvärde 2016 (miljoner kronor) |\n' +
                '| :---: | :---: | :---: |\n' +
                '| $2020$ | $10{,}0$ | |\n' +
                '| $2016$ | $8{,}0$ | $8{,}0$ |\n' +
                '| $2001$ | $10{,}0$ | $11{,}8$ |\n' +
                '| $1990$ | $4{,}0$ | $6{,}1$ |\n' +
                '| $1980$ | $0{,}9$ | $2{,}8$ |\n' +
                '| $1970$ | $0{,}4$ | $3{,}1$ |',
            figur: null,
            steg: [
                {
                    rubrik: 'Vad betyder penningvärde?',
                    varfor: 'KPI (konsumentprisindex) mäter hur dyrt det är att leva. Ett högre ' +
                        'KPI betyder att samma varor kostar fler kronor. Att räkna om $2020$ års ' +
                        'prissumma till $2016$ års penningvärde betyder: hur många kronor år ' +
                        '$2016$ hade köpt lika mycket som $10{,}0$ miljoner kronor år $2020$?',
                    text: 'KPI steg från $316{,}43$ till $335{,}92$, så priserna var lägre år $2016$. ' +
                        'Det behövdes alltså **färre** kronor år $2016$ för att köpa samma sak. ' +
                        'Svaret ska bli mindre än $10{,}0$ miljoner kronor.',
                },
                {
                    rubrik: 'Multiplicera med kvoten mellan KPI-värdena',
                    varfor: 'Priserna år $2016$ var $\\dfrac{316{,}43}{335{,}92}$ av priserna år $2020$, ' +
                        'eftersom KPI är ett mått på prisnivån. Ett belopp räknas därför om till ' +
                        '$2016$ års penningvärde genom att multipliceras med samma kvot. KPI-värdet för ' +
                        'året vi räknar om **till** står i täljaren.',
                    text: '$$10{,}0 \\cdot \\dfrac{316{,}43}{335{,}92} = 9{,}4198\\ldots$$',
                },
                {
                    rubrik: 'Avrunda och bedöm rimligheten',
                    varfor: 'Prissumman i tabellen anges med en decimal, så vi svarar med en decimal. ' +
                        'Svaret är mindre än $10{,}0$, som vi förutsåg. KPI steg med drygt $6\\ \\%$, ' +
                        'och beloppet krymper med ungefär lika mycket.',
                    text: '$$10{,}0 \\cdot \\dfrac{316{,}43}{335{,}92} \\approx 9{,}4 \\text{ miljoner kronor}$$',
                },
            ],
            svar: 'Ungefär $9{,}4$ miljoner kronor i $2016$ års penningvärde.',
            bedomning: [
                ['Tecknar någon kvot för att kunna bestämma prissumman i 2016 års penningvärde, ' +
                    'till exempel kvoten för förändringen i index eller kvoten för prissumma per indexenhet', '+C'],
                ['Lösning med godtagbart svar ($9{,}4$ miljoner kr)', '+C'],
            ],
        },
    ];

    var prov = window.NP_PROV[ID] = {
        id: ID,
        kurs: 'Matematik nivå 1b',
        termin: 'VT 2022',
        namn: 'Nationellt prov Ma 1b, våren 2022',
        kort: 'NP Ma 1b VT 2022',
        harlettFran: KALLA,
        intro: 'Det här är det riktiga nationella provet i Matematik 1b från våren 2022. ' +
            'Provet är frisläppt och återanvänds inte. Välj en uppgift, lös den själv, och ' +
            'klicka sedan fram lösningen ett steg i taget. Varje steg förklarar både vad som ' +
            'görs och varför, och varje uppgift kan också följas som en pennlösning.',
        kravgranser: 'Provet (delprov B–D) ger totalt högst 67 poäng. Poängen skrivs (E/C/A). ' +
            'Till exempel betyder (1/0/1) att uppgiften kan ge 1 E-poäng och 1 A-poäng. ' +
            'Gräns för provbetyget: E minst 14 poäng · D minst 25 poäng varav 9 på lägst C-nivå · ' +
            'C minst 33 poäng varav 14 på lägst C-nivå · B minst 43 poäng varav 6 på A-nivå · ' +
            'A minst 51 poäng varav 10 på A-nivå.',
        delprov: {
            B: {
                tid: '60 minuter',
                hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
                hjalpmedelKort: 'Utan digitala verktyg',
                beskrivning: 'Till uppgifterna behöver du endast ange svar.',
            },
            C: {
                tid: '60 minuter',
                hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
                hjalpmedelKort: 'Utan digitala verktyg',
                beskrivning: 'Lösningarna ska redovisas.',
            },
            D: {
                tid: '120 minuter',
                hjalpmedel: 'Digitala verktyg, formelblad och linjal',
                hjalpmedelKort: 'Digitala verktyg tillåtna',
                beskrivning: 'Lösningarna ska redovisas, om inte uppgiften anger att endast svar krävs.',
            },
        },
    };

    /* ---- Härledningen (samma kod i ma2b- och ma3b-filen) ---- */
    var klar = null;
    function bygg() {
        var kalla = window.NP_PROV[KALLA];
        if (!kalla) return null;
        // c-avsnitt → b-avsnitt för alla b-kurser, så att även en länk över
        // kursgränsen (ett 3b-prov som pekar på 2c-teori) går till b-kursen.
        var tillB = {};
        ['MA1B_ALIAS', 'MA2B_ALIAS', 'MA3B_ALIAS'].forEach(function (namn) {
            var alias = window[namn] || {};
            Object.keys(alias).forEach(function (b) { tillB[alias[b]] = b; });
        });
        var fig = window.NP_FIGURER = window.NP_FIGURER || {};
        var cf = fig[KALLA] || {}, bf = fig[ID] = fig[ID] || {};
        Object.keys(cf).forEach(function (k) { if (!(k in bf)) bf[k] = cf[k]; });
        var egna = {};
        EGNA.forEach(function (u) { egna[u.nr] = u; });
        return KARTA.map(function (k) {
            if (k[1] == null) return egna[k[0]];
            var u = kalla.uppgifter.filter(function (x) { return x.nr === k[1]; })[0];
            // k[2]: fält som skiljer sig i b-provet (poäng, bedömning …)
            var kopia = Object.assign({}, u, k[2] || {}, {
                nr: k[0],
                penna: u.penna || (KALLA + '-u' + k[1]),
                lanadFran: { prov: KALLA, nr: k[1] },
            });
            if (kopia.genomgangar) {
                kopia.genomgangar = kopia.genomgangar.map(function (g) { return tillB[g] || g; });
            }
            return kopia;
        });
    }
    Object.defineProperty(prov, 'uppgifter', {
        enumerable: true, configurable: true,
        get: function () {
            if (klar) return klar;
            var u = bygg();
            // Sparas först när aliaskartan finns (sidan har laddat
            // data/katalog.js), så att teorilänkarna hinner skrivas om.
            if (u && window[ALIAS]) klar = u;
            return u || EGNA;
        },
    });
})();
