// Fysiklabbet — Nationellt prov Matematik 3b, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// ⚠️ PROVET ÄR HÄRLETT UR MA 3C VT 2022 (data/np/ma3c-vt2022.js).
// Ma 3b- och Ma 3c-proven från våren 2022 delar 24 av 28 uppgifter (i
// delvis annan ordning). De delade uppgifterna lagras bara EN gång, i
// ma3c-filen, och hämtas hit enligt KARTA nedan (3b-numret → 3c-numret).
// Det gäller text, figurer, lösningssteg och pennlösning: en rättelse i
// ma3c-filen slår alltså igenom här av sig självt. Ändra ALDRIG en delad
// uppgift "för 3b" — gör ändringen i ma3c-vt2022.js (och
// ma3c-vt2022-penna.js).
//
// Bara 3b-provets EGNA uppgifter (4, 5, 20 och 24) står i den här filen, i
// EGNA. De prövar det som skiljer kurserna åt: geometrisk summa och linjär
// optimering (3c har absolutbelopp och trigonometri i stället). Deras
// pennlösningar finns i ma3b-vt2022-penna.js och figurerna i
// ma3b-vt2022-figurer.js (nycklar 'b<nr>…', så att de aldrig krockar med
// de lånade 'u<nr>…'-nycklarna).
//
// Härledningen sker först när uppgiftslistan läses (en getter), så att
// filordningen inte spelar någon roll: Node-skripten laddar filerna i
// bokstavsordning, och ma3b kommer före ma3c. Den lånade uppgiften får
// - sitt 3b-nummer (nr),
// - pennlösningen från 3c (penna: 'ma3c-vt2022-u<nr>'),
// - teorilänkar omskrivna till 3b-avsnitt via window.MA3B_ALIAS när
//   avsnittet finns i 3b (ma3c-2.1 → ma3b-2.3); annars står 3c-länken kvar,
// - figurerna kopierade till NP_FIGURER['ma3b-vt2022'].
//
// Dataformat: se data/np/RIKTLINJER.md och huvudet i ma1c-vt2022.js.
// Källa: Skolverket/Umeå universitet. Provet är frisläppt och återanvänds
// inte.

window.NP_PROV = window.NP_PROV || {};
(function () {
    var ID = 'ma3b-vt2022', KALLA = 'ma3c-vt2022', ALIAS = 'MA3B_ALIAS';

    // [3b-nummer, 3c-nummer, ändringar?]. Saknas 3c-numret är uppgiften
    // provets egen (står i EGNA). Ett tredje element skriver över fält i den
    // lånade uppgiften, till exempel { poang: [0, 1, 0] } om b-provet ger
    // uppgiften andra poäng. 3b-provet behöver inga sådana: uppgift 7 och 8
    // har bytt plats jämfört med 3c (liksom 21 och 22), men text och poäng
    // är desamma.
    var KARTA = [
        [1, 1], [2, 2], [3, 3], [4], [5], [6, 6], [7, 8], [8, 7],
        [9, 9], [10, 10], [11, 11],
        [12, 12], [13, 13], [14, 14], [15, 15], [16, 16], [17, 17], [18, 18],
        [19, 19], [20], [21, 22], [22, 21], [23, 23], [24],
        [25, 25], [26, 26], [27, 27], [28, 28],
    ];

    var EGNA = [

        // ================= DELPROV B =================
        {
            nr: 4, del: 'B', poang: [1, 1, 0], omrade: 'Geometrisk summa: tolka formeln',
            genomgangar: ['ma3b-6.4', 'ma3b-6.2'],
            endastSvar: true,
            fraga: 'De $100$ första talen i en talföljd bildar den geometriska summan $S$, där\n\n' +
                '$$S = \\dfrac{2(5^{100} - 1)}{4}$$\n\n' +
                '**a)** Bestäm det första talet i talföljden.\n\n' +
                '**b)** Bestäm det fjärde talet i talföljden.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Jämför med formeln för en geometrisk summa',
                    varfor: 'En geometrisk summa med $n$ termer, första termen $a$ och kvoten $k$ ' +
                        'kan skrivas $S = \\dfrac{a(k^n - 1)}{k - 1}$. Står summan redan på den ' +
                        'formen kan $a$, $k$ och $n$ läsas av direkt, utan att något räknas ut.',
                    text: '$$S = \\dfrac{a(k^n - 1)}{k - 1} \\qquad\\qquad S = \\dfrac{2(5^{100} - 1)}{4}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Läs av första termen och kvoten',
                    varfor: 'Basen i potensen är kvoten, så $k = 5$, och exponenten är antalet ' +
                        'termer, $n = 100$. Då ska nämnaren vara $k - 1 = 5 - 1 = 4$, vilket ' +
                        'stämmer. Faktorn framför parentesen är första termen.',
                    text: '$$k = 5 \\qquad n = 100 \\qquad k - 1 = 4 \\qquad a = 2$$',
                    delsvar: { del: 'a', text: 'Det första talet är $2$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Multiplicera med kvoten tre gånger',
                    varfor: 'I en geometrisk talföljd får man nästa tal genom att multiplicera med ' +
                        'kvoten. Från det första talet till det fjärde är det tre steg, så det ' +
                        'fjärde talet är $a \\cdot k^3$.',
                    text: '$$2,\\quad 2 \\cdot 5 = 10,\\quad 10 \\cdot 5 = 50,\\quad 50 \\cdot 5 = 250$$\n\n' +
                        '$$a \\cdot k^3 = 2 \\cdot 5^3 = 2 \\cdot 125 = 250$$',
                    delsvar: { del: 'b', text: 'Det fjärde talet är $250$.' },
                },
            ],
            svar: '**a)** $2$&emsp;&emsp;**b)** $250$',
            bedomning: [
                ['a) Korrekt svar ($2$)', '+E'],
                ['b) Korrekt svar ($250$)', '+C'],
            ],
        },

        {
            nr: 5, del: 'B', poang: [1, 0, 0], omrade: 'System av olikheter: område',
            genomgangar: ['ma3b-2.1'],
            endastSvar: true,
            fraga: 'Figuren visar två räta linjer och sex punkter $A$–$F$.\n\n' +
                'En av punkterna $A$–$F$ ligger i området som begränsas av\n\n' +
                '$$\\begin{cases} x > 0 \\\\ y < 5 - x \\\\ y > x + 1 \\end{cases}$$\n\n' +
                'Vilken?',
            figur: 'b5',
            steg: [
                {
                    rubrik: 'Koppla ihop linjerna med olikheterna',
                    varfor: 'Varje olikhet har en gränslinje där olikheten blir en likhet. ' +
                        'Linjen $y = 5 - x$ skär $y$-axeln i $5$ och lutar nedåt. Linjen ' +
                        '$y = x + 1$ skär $y$-axeln i $1$ och lutar uppåt. Gränsen för ' +
                        '$x > 0$ är $y$-axeln.',
                    text: '$$y = 5 - x \\qquad\\qquad y = x + 1 \\qquad\\qquad x = 0$$',
                    figur: 'b5-los1',
                },
                {
                    rubrik: 'Bestäm vilken sida om varje linje som gäller',
                    varfor: '$y < 5 - x$ betyder att punkten ligger **under** den fallande linjen, ' +
                        'och $y > x + 1$ att den ligger **över** den stigande. $x > 0$ ger ' +
                        'högra sidan om $y$-axeln. Området är triangeln som de tre gränserna ' +
                        'stänger in, med hörnen $(0,\\ 1)$, $(0,\\ 5)$ och $(2,\\ 3)$.',
                    text: 'Området är triangeln mellan $y$-axeln och de två linjerna. ' +
                        'Bara punkten $C$ ligger inuti den.',
                    figur: 'b5-los2',
                },
                {
                    rubrik: 'Kontrollera genom att pröva punkterna',
                    varfor: 'Olikheterna är **strikta** ($<$ och $>$), så en punkt som ligger ' +
                        'precis på en gränslinje hör inte till området. Det gäller $D(2,\\ 3)$, ' +
                        'där linjerna skär varandra.',
                    text: '$C(1,\\ 3)$: $\\ 1 > 0$, $\\ 3 < 5 - 1 = 4$ och $\\ 3 > 1 + 1 = 2$. ' +
                        'Alla tre villkoren stämmer.\n\n' +
                        '$D(2,\\ 3)$: $\\ 3 < 5 - 2 = 3$ är falskt, eftersom $3 = 3$.\n\n' +
                        '$A(2,\\ 5)$, $E(4,\\ 3)$ och $F(2,\\ 1)$ bryter mot någon av linjernas ' +
                        'olikheter, och $B(-1,\\ 3)$ har $x < 0$.',
                },
            ],
            svar: '$C$',
            bedomning: [['Korrekt svar ($C$)', '+E']],
        },

        // ================= DELPROV D =================
        {
            nr: 20, del: 'D', poang: [2, 0, 0], omrade: 'Geometrisk summa: bestäm första termen',
            genomgangar: ['ma3b-6.4'],
            fraga: 'En geometrisk summa ges av $B + B \\cdot 1{,}4 + B \\cdot 1{,}4^2 + \\ldots + B \\cdot 1{,}4^{21}$ ' +
                'där $B$ är en konstant.\n\n' +
                'Bestäm $B$ så att summan blir $250\\,000$',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm första termen, kvoten och antalet termer',
                    varfor: 'Varje term är den föregående gånger $1{,}4$, så kvoten är $k = 1{,}4$ ' +
                        'och första termen är $B$. Exponenterna går från $0$ (den första termen ' +
                        'är $B = B \\cdot 1{,}4^0$) till $21$. Det är $22$ termer, inte $21$: ' +
                        'en vanlig fälla.',
                    text: '$$a = B \\qquad k = 1{,}4 \\qquad n = 21 + 1 = 22$$',
                },
                {
                    rubrik: 'Ställ upp summan med formeln',
                    varfor: 'Formeln för en geometrisk summa, ' +
                        '$S = \\dfrac{a(k^n - 1)}{k - 1}$, gör de $22$ termerna till ett enda ' +
                        'uttryck. Summan ska vara $250\\,000$, så vi får en ekvation i $B$.',
                    text: '$$\\dfrac{B(1{,}4^{22} - 1)}{1{,}4 - 1} = 250\\,000$$',
                },
                {
                    rubrik: 'Multiplicera båda led med 0,4',
                    varfor: 'Nämnaren är $1{,}4 - 1 = 0{,}4$. Multipliceras båda led med $0{,}4$ ' +
                        'försvinner bråket.',
                    text: '$$\\dfrac{B(1{,}4^{22} - 1)}{0{,}4} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{0{,}4} = ' +
                        '250\\,000 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{0{,}4}$$\n\n' +
                        '$$B(1{,}4^{22} - 1) = 100\\,000$$',
                },
                {
                    rubrik: 'Dividera båda led med parentesen',
                    varfor: 'Då står $B$ ensamt. Räkna ut $1{,}4^{22} = 1\\,639{,}897\\ldots$ på ' +
                        'räknaren och avrunda inte förrän i sista steget.',
                    text: '$$B = \\dfrac{100\\,000}{1{,}4^{22} - 1} = \\dfrac{100\\,000}{1\\,638{,}897\\ldots} = 61{,}016\\ldots$$',
                },
                {
                    rubrik: 'Avrunda och bedöm rimligheten',
                    varfor: 'Den sista termen är $B \\cdot 1{,}4^{21} \\approx 61 \\cdot 1\\,171 \\approx 71\\,000$, ' +
                        'och de stora termerna i slutet står för det mesta av summan. Att ' +
                        'summan blir $250\\,000$ är därför rimligt.',
                    text: '$$B \\approx 61$$',
                },
            ],
            svar: '$B \\approx 61$',
            bedomning: [
                ['Godtagbar ansats, tecknar ekvationen $\\dfrac{B(1{,}4^{22} - 1)}{1{,}4 - 1} = 250\\,000$', '+E'],
                ['Med i övrigt godtagbar lösning med godtagbart svar ($61$)', '+E'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [0, 4, 0], omrade: 'Linjär optimering',
            genomgangar: ['ma3b-2.2', 'ma3b-2.1'],
            fraga: 'Julius och Sophia planerar att starta en nätbutik för att sälja sittkuddar. ' +
                'De tänker sälja två modeller av sittkuddar, modell $A$ och modell $B$.\n\n' +
                'Inköpspriset för en sittkudde av modell $A$ är $600$ kr och för modell $B$ ' +
                '$400$ kr. De kan köpa in sittkuddar för totalt $60\\,000$ kr. I deras lagerlokal ' +
                'ryms det som mest $125$ sittkuddar.\n\n' +
                'Julius och Sophia räknar med att sälja alla kuddar som köps in och att vinsten ' +
                'blir $500$ kr för varje såld kudde av modell $A$ och $400$ kr för varje såld ' +
                'kudde av modell $B$.\n\n' +
                'Bestäm hur många sittkuddar av varje modell som de ska köpa in för att vinsten ' +
                'ska bli maximal.',
            figur: null,
            steg: [
                {
                    rubrik: 'Inför variabler',
                    varfor: 'Det som ska bestämmas är två antal. Ge dem var sin bokstav, så kan ' +
                        'varje villkor i texten skrivas som en olikhet.',
                    text: '$x$ = antal kuddar av modell $A$&emsp;&emsp;$y$ = antal kuddar av modell $B$',
                },
                {
                    rubrik: 'Teckna villkoren som olikheter',
                    varfor: 'Inköpet får kosta högst $60\\,000$ kr: varje $A$-kudde kostar $600$ kr ' +
                        'och varje $B$-kudde $400$ kr. Lagret rymmer högst $125$ kuddar. ' +
                        'Antalen kan inte vara negativa.',
                    text: '$$\\begin{cases} 600x + 400y \\leq 60\\,000 \\\\ x + y \\leq 125 \\\\ ' +
                        'x \\geq 0 \\\\ y \\geq 0 \\end{cases}$$',
                },
                {
                    rubrik: 'Teckna målfunktionen',
                    varfor: 'Målfunktionen är det som ska bli så stort som möjligt, här vinsten ' +
                        '$V$ i kronor.',
                    text: '$$V = 500x + 400y$$',
                },
                {
                    rubrik: 'Skriv gränslinjerna på formen y = kx + m och rita dem',
                    varfor: 'Varje olikhet har en gränslinje där den blir en likhet. På formen ' +
                        '$y = kx + m$ går linjerna lätt att rita. Båda olikheterna är av typen ' +
                        '"högst", så området ligger **under** båda linjerna.',
                    text: '$$600x + 400y = 60\\,000 \\quad \\Longleftrightarrow \\quad y = 150 - 1{,}5x$$\n\n' +
                        '$$x + y = 125 \\quad \\Longleftrightarrow \\quad y = 125 - x$$',
                    figur: 'b24-s1',
                },
                {
                    rubrik: 'Bestäm områdets hörn',
                    varfor: 'Målfunktionen får sitt största värde i ett av hörnen till det tillåtna ' +
                        'området. Tre hörn ligger på axlarna. Det fjärde är skärningen mellan ' +
                        'de två linjerna, där de har samma $y$-värde.',
                    text: '$$150 - 1{,}5x = 125 - x \\quad \\Longleftrightarrow \\quad 25 = 0{,}5x ' +
                        '\\quad \\Longleftrightarrow \\quad x = 50$$\n\n' +
                        '$$y = 125 - 50 = 75$$\n\n' +
                        'Hörnen är $(0,\\ 0)$, $(100,\\ 0)$, $(50,\\ 75)$ och $(0,\\ 125)$. ' +
                        'På $x$-axeln gäller den lägre linjen, $y = 150 - 1{,}5x$, som når axeln ' +
                        'i $x = 100$; på $y$-axeln den lägre linjen $y = 125 - x$, som når axeln ' +
                        'i $y = 125$.',
                    figur: 'b24-s2',
                },
                {
                    rubrik: 'Pröva hörnen i målfunktionen',
                    varfor: 'Det största värdet av $V$ i hörnen är den största möjliga vinsten.',
                    text: '| Hörn | $V = 500x + 400y$ |\n| :---: | :---: |\n' +
                        '| $(0,\\ 0)$ | $0$ |\n' +
                        '| $(100,\\ 0)$ | $500 \\cdot 100 = 50\\,000$ |\n' +
                        '| $(50,\\ 75)$ | $500 \\cdot 50 + 400 \\cdot 75 = 55\\,000$ |\n' +
                        '| $(0,\\ 125)$ | $400 \\cdot 125 = 50\\,000$ |\n\n' +
                        'Störst vinst, $55\\,000$ kr, ger hörnet $(50,\\ 75)$. Kontroll: ' +
                        '$600 \\cdot 50 + 400 \\cdot 75 = 60\\,000$ kr och $50 + 75 = 125$ kuddar, ' +
                        'precis vid båda gränserna.',
                    figur: 'b24-s3',
                },
            ],
            svar: 'De ska köpa in $50$ sittkuddar av modell $A$ och $75$ av modell $B$. ' +
                'Vinsten blir då $55\\,000$ kr.',
            bedomning: [
                ['Godtagbar ansats, till exempel tecknar de två olikheterna $600x + 400y \\leq 60\\,000$ ' +
                    'och $x + y \\leq 125$', '+C'],
                ['Med godtagbar fortsättning, tecknar algebraiskt eller grafiskt ett system av ' +
                    'olikheter som motsvarar kraven (även $x \\geq 0$ och $y \\geq 0$) och ställer upp ' +
                    'målfunktionen $V = 500x + 400y$ eller bestämmer skärningspunkterna', '+C'],
                ['Godtagbar lösning, där punkterna $(0,\\ 0)$, $(0,\\ 125)$, $(100,\\ 0)$ och ' +
                    '$(50,\\ 75)$ undersöks, med korrekt svar ($50$ av modell $A$ och $75$ av ' +
                    'modell $B$). Även en lösning där $(0,\\ 0)$ inte undersöks är godtagbar', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },
    ];

    var prov = window.NP_PROV[ID] = {
        id: ID,
        kurs: 'Matematik fortsättning nivå 1b',
        termin: 'VT 2022',
        namn: 'Nationellt prov Ma 3b, våren 2022',
        kort: 'NP Ma 3b VT 2022',
        harlettFran: KALLA,
        intro: 'Det här är det riktiga nationella provet i Matematik 3b (dagens Matematik ' +
            'fortsättning nivå 1b) från våren 2022. Provet är frisläppt och återanvänds inte. ' +
            'Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg i taget. ' +
            'Varje steg förklarar både vad som görs och varför, och varje uppgift kan också ' +
            'följas som en pennlösning.',
        kravgranser: 'Provet (delprov B–D) ger totalt 59 poäng varav 21 E-, 22 C- och 16 A-poäng. ' +
            'Poängen skrivs (E/C/A). Till exempel betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
            '1 A-poäng. Gräns för provbetyget: E minst 15 poäng · D minst 24 poäng varav 7 på ' +
            'minst C-nivå · C minst 31 poäng varav 13 på minst C-nivå · B minst 39 poäng varav ' +
            '5 på A-nivå · A minst 46 poäng varav 8 på A-nivå.',
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
                beskrivning: 'Uppgift 12–18. Fullständiga lösningar krävs.',
            },
            D: {
                tid: '120 minuter',
                hjalpmedel: 'Digitala verktyg, formelblad och linjal',
                hjalpmedelKort: 'Digitala verktyg tillåtna',
                beskrivning: 'Uppgift 19–28. Fullständiga lösningar krävs.',
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
