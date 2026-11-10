// Fysiklabbet — Nationellt prov Matematik 2b, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// ⚠️ PROVET ÄR HÄRLETT UR MA 2C VT 2022 (data/np/ma2c-vt2022.js).
// Ma 2b- och Ma 2c-proven från våren 2022 delar 25 av 29 uppgifter. De
// delade uppgifterna lagras bara EN gång, i ma2c-filen, och hämtas hit
// enligt KARTA nedan (2b-numret → 2c-numret). Det gäller text, figurer,
// lösningssteg och pennlösning: en rättelse i ma2c-filen slår alltså igenom
// här av sig självt. Ändra ALDRIG en delad uppgift "för 2b" — gör ändringen i
// ma2c-vt2022.js (och ma2c-vt2022-penna.js).
//
// Bara 2b-provets EGNA uppgifter (6, 8, 9 och 18) står i den här filen, i
// EGNA. Uppgift 6 och 8 liknar 2c-provets uppgift 6 och 8 men skiljer sig:
// i 6 är b) och c) andra ekvationer (2b har inga rotekvationer), och 8 är
// bara 2c-provets a-del. Deras pennlösningar finns i ma2b-vt2022-penna.js och
// figurerna i ma2b-vt2022-figurer.js (nycklar 'b<nr>…', så att de aldrig
// krockar med de lånade 'u<nr>…'-nycklarna).
//
// Härledningen sker först när uppgiftslistan läses (en getter), så att
// filordningen inte spelar någon roll: Node-skripten laddar filerna i
// bokstavsordning, och ma2b kommer före ma2c. Den lånade uppgiften får
// - sitt 2b-nummer (nr),
// - pennlösningen från 2c (penna: 'ma2c-vt2022-u<nr>'),
// - teorilänkar omskrivna till 2b-avsnitt via window.MA2B_ALIAS när
//   avsnittet finns i 2b; annars står 2c-länken kvar,
// - figurerna kopierade till NP_FIGURER['ma2b-vt2022'].
//
// Dataformat: se data/np/RIKTLINJER.md och huvudet i ma1c-vt2022.js.
// Källa: Skolverket/Umeå universitet. Provet är frisläppt och återanvänds inte.

window.NP_PROV = window.NP_PROV || {};
(function () {
    var ID = 'ma2b-vt2022', KALLA = 'ma2c-vt2022', ALIAS = 'MA2B_ALIAS';

    // [2b-nummer, 2c-nummer, ändringar?]. Saknas 2c-numret är uppgiften
    // provets egen (står i EGNA). Ett tredje element skriver över fält i den
    // lånade uppgiften, till exempel { poang: [0, 1, 0] } om b-provet ger
    // uppgiften andra poäng.
    var KARTA = [
        [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6], [7, 7], [8], [9],
        [10, 9], [11, 10], [12, 11], [13, 12], [14, 13], [15, 14], [16, 15],
        [17, 16], [18], [19, 18], [20, 19], [21, 20], [22, 21], [23, 22],
        [24, 23], [25, 24], [26, 25], [27, 26], [28, 27], [29, 28],
    ];

    var EGNA = [

        // ================= DELPROV B =================
        {
            nr: 6, del: 'B', poang: [1, 3, 1], omrade: 'Ekvationer: exponential- och andragradsekvationer',
            genomgangar: ['ma2b-5.3', 'ma2b-5.4', 'ma2b-2.3'],
            endastSvar: true,
            fraga: 'Lös ekvationerna och svara exakt på enklaste form.<br>' +
                '**a)**&nbsp;$5^x = 7$<br>' +
                '**b)**&nbsp;$\\lg 1000 + 97 = 10^x$<br>' +
                '**c)**&nbsp;$3^{4x} = 10^2$<br>' +
                '**d)**&nbsp;$(3x - 4)(4 - 3x) = -9x^2$<br>' +
                '**e)**&nbsp;$(5987 - x)^2 - 2(5987 - x) = 0$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Logaritmera båda led',
                    varfor: 'Det obekanta står i exponenten. Vi tar tiologaritmen av båda led, ' +
                        'så att logaritmlagen kan flytta ned exponenten i nästa steg.',
                    text: '$$5^x = 7 \\quad \\Longleftrightarrow \\quad \\lg 5^x = \\lg 7$$',
                },
                {
                    del: 'a',
                    rubrik: 'Flytta ned exponenten',
                    varfor: 'Logaritmlagen $\\lg a^x = x \\cdot \\lg a$ gör exponenten till en faktor.',
                    text: '$$x \\cdot \\lg 5 = \\lg 7$$',
                },
                {
                    del: 'a',
                    rubrik: 'Dividera med lg 5',
                    varfor: 'Svaret ska ges exakt, så kvoten av logaritmerna lämnas som den är. ' +
                        '(Den är ungefär $1{,}21$, vilket är rimligt: $5^1 = 5$ och $5^2 = 25$.)',
                    text: '$$x = \\dfrac{\\lg 7}{\\lg 5}$$',
                    delsvar: { del: 'a', text: '$x = \\dfrac{\\lg 7}{\\lg 5}$' },
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna lg 1000',
                    varfor: '$\\lg 1000$ är den exponent som $10$ ska upphöjas till för att ge ' +
                        '$1000$. Eftersom $10^3 = 1000$ är $\\lg 1000 = 3$.',
                    text: '$$\\lg 1000 + 97 = 3 + 97 = 100$$',
                },
                {
                    del: 'b',
                    rubrik: 'Skriv 100 som en tiopotens och jämför exponenterna',
                    varfor: 'Vänsterledet är $100 = 10^2$. Två potenser med samma bas är lika ' +
                        'precis när exponenterna är lika.',
                    text: '$$10^2 = 10^x \\quad \\Longleftrightarrow \\quad x = 2$$',
                    delsvar: { del: 'b', text: '$x = 2$' },
                },
                {
                    del: 'c',
                    rubrik: 'Logaritmera båda led',
                    varfor: 'Det obekanta står i exponenten. Vi tar tiologaritmen av båda led, ' +
                        'precis som i a).',
                    text: '$$3^{4x} = 10^2 \\quad \\Longleftrightarrow \\quad \\lg 3^{4x} = \\lg 10^2$$',
                },
                {
                    del: 'c',
                    rubrik: 'Flytta ned exponenterna',
                    varfor: 'Logaritmlagen $\\lg a^x = x \\cdot \\lg a$ gäller i båda led. ' +
                        'I högerledet blir det $2 \\cdot \\lg 10 = 2$, eftersom $\\lg 10 = 1$.',
                    text: '$$4x \\cdot \\lg 3 = 2$$',
                },
                {
                    del: 'c',
                    rubrik: 'Dividera med 4 · lg 3 och förkorta',
                    varfor: 'Då står $x$ ensamt. Bråket förkortas med $2$, så att svaret står på ' +
                        'enklaste form. (Det är ungefär $1{,}05$, vilket är rimligt: $3^4 = 81$ ' +
                        'ligger nära $10^2 = 100$.)',
                    text: '$$x = \\dfrac{2}{4 \\cdot \\lg 3} = \\dfrac{1}{2 \\cdot \\lg 3}$$',
                    delsvar: { del: 'c', text: '$x = \\dfrac{1}{2 \\lg 3}$' },
                },
                {
                    del: 'd',
                    rubrik: 'Utveckla vänsterledet',
                    varfor: 'Multiplicera varje term i den första parentesen med varje term i den ' +
                        'andra. Termen $-9x^2$ dyker då upp i vänsterledet också, och den kan ' +
                        'tas bort från båda led.',
                    text: '$$(3x - 4)(4 - 3x) = 12x - 9x^2 - 16 + 12x = -9x^2 + 24x - 16$$',
                },
                {
                    del: 'd',
                    rubrik: 'Ta bort kvadrattermen och lös ekvationen',
                    varfor: 'Addera $9x^2$ till båda led. Kvar blir en vanlig förstagradsekvation. ' +
                        'Bråket $\\dfrac{16}{24}$ förkortas med $8$.',
                    text: '$$-9x^2 + 24x - 16 = -9x^2 \\quad \\Longleftrightarrow \\quad 24x = 16 \\quad ' +
                        '\\Longleftrightarrow \\quad x = \\dfrac{16}{24} = \\dfrac{2}{3}$$',
                    delsvar: { del: 'd', text: '$x = \\dfrac{2}{3}$' },
                },
                {
                    del: 'e',
                    rubrik: 'Bryt ut den gemensamma faktorn',
                    varfor: 'Utveckla inte! Parentesen $(5987 - x)$ finns i båda termerna, och ' +
                        '$(5987 - x)^2 = (5987 - x)(5987 - x)$. Bryts den ut blir ekvationen en ' +
                        'produkt som är lika med noll.',
                    text: '$$(5987 - x)\\big((5987 - x) - 2\\big) = 0 \\quad \\Longleftrightarrow \\quad ' +
                        '(5987 - x)(5985 - x) = 0$$',
                },
                {
                    del: 'e',
                    rubrik: 'Använd nollproduktmetoden',
                    varfor: 'En produkt är noll precis när minst en faktor är noll. Sätt varje ' +
                        'faktor lika med noll för sig.',
                    text: '$$5987 - x = 0 \\ \\Longleftrightarrow\\ x_1 = 5987 \\qquad\\qquad ' +
                        '5985 - x = 0 \\ \\Longleftrightarrow\\ x_2 = 5985$$',
                    delsvar: { del: 'e', text: '$x_1 = 5987$ och $x_2 = 5985$' },
                },
            ],
            svar: '**a)** $x = \\dfrac{\\lg 7}{\\lg 5}$&emsp;&emsp;**b)** $x = 2$&emsp;&emsp;' +
                '**c)** $x = \\dfrac{1}{2 \\lg 3}$&emsp;&emsp;' +
                '**d)** $x = \\dfrac{2}{3}$&emsp;&emsp;**e)** $x_1 = 5987$ och $x_2 = 5985$',
            bedomning: [
                ['a) Korrekt svar $\\left(x = \\dfrac{\\lg 7}{\\lg 5}\\right)$', '+E'],
                ['b) Korrekt svar ($x = 2$)', '+C'],
                ['c) Korrekt svar $\\left(x = \\dfrac{1}{2 \\lg 3}\\right)$', '+C'],
                ['d) Korrekt svar $\\left(x = \\dfrac{2}{3}\\right)$', '+C'],
                ['e) Korrekt svar ($x_1 = 5987$ och $x_2 = 5985$)', '+A'],
            ],
        },

        {
            nr: 8, del: 'B', poang: [0, 1, 0], omrade: 'Andragradsfunktioner: symmetrilinje',
            genomgangar: ['ma2b-3.1'],
            endastSvar: true,
            fraga: 'Det finns många andragradsfunktioner som har en graf med symmetrilinjen $x = 3$.\n\n' +
                'Ge exempel på en sådan funktion.',
            figur: null,
            steg: [
                {
                    rubrik: 'Lägg vertex på symmetrilinjen',
                    varfor: 'Symmetrilinjen går alltid genom parabelns vertex. Enklaste sättet att ' +
                        'få symmetrilinjen $x = 3$ är att flytta grundparabeln $y = x^2$ tre steg ' +
                        'åt höger, så att vertex hamnar i $(3,\\ 0)$.',
                    text: '$$y = (x - 3)^2 = x^2 - 6x + 9$$',
                },
                {
                    rubrik: 'Kontrollera med symmetrilinjens formel',
                    varfor: 'För $y = ax^2 + bx + c$ ligger symmetrilinjen i $x = -\\dfrac{b}{2a}$. ' +
                        'Med $a = 1$ och $b = -6$ blir det $x = \\dfrac{6}{2} = 3$. Varje funktion ' +
                        'med $-\\dfrac{b}{2a} = 3$ duger, till exempel $y = (x - 2)(x - 4)$ vars ' +
                        'nollställen $2$ och $4$ ligger symmetriskt kring $3$.',
                    text: '$$x = -\\dfrac{b}{2a} = -\\dfrac{-6}{2 \\cdot 1} = 3$$',
                },
            ],
            svar: 'Till exempel $y = (x - 3)^2$.',
            bedomning: [
                ['Korrekt svar (till exempel $y = (x - 2)(x - 4)$). Svar som uppfyller ' +
                    '$-\\dfrac{b}{2a} = 3$ är korrekta', '+C'],
            ],
        },

        {
            nr: 9, del: 'B', poang: [0, 0, 1], omrade: 'Korrelation: korrelationskoefficienten',
            genomgangar: ['ma2b-6.6'],
            endastSvar: true,
            fraga: 'Alternativen A–F visar sex olika spridningsdiagram. Till varje diagram finns ' +
                'även en anpassad linje inritad.\n\n' +
                'I två av alternativen är korrelationskoefficienten $r > 0{,}8$. Vilka två?',
            figur: 'b9',
            steg: [
                {
                    rubrik: 'Vad mäter korrelationskoefficienten?',
                    varfor: 'Korrelationskoefficienten $r$ ligger alltid mellan $-1$ och $1$. ' +
                        'Den mäter hur väl punkterna följer en rät linje, **inte** hur brant ' +
                        'linjen lutar. Tecknet visar riktningen: positivt $r$ när linjen lutar ' +
                        'uppåt, negativt när den lutar nedåt.',
                    text: '$r > 0{,}8$ kräver alltså två saker: linjen ska luta **uppåt**, och ' +
                        'punkterna ska ligga **tätt** kring linjen.',
                },
                {
                    rubrik: 'Stryk diagrammen där linjen lutar nedåt',
                    varfor: 'En linje som lutar nedåt ger ett negativt $r$, och ett negativt tal ' +
                        'kan aldrig vara större än $0{,}8$, hur tätt punkterna än ligger.',
                    text: 'I **C** ligger alla punkter exakt på en linje som lutar nedåt, så ' +
                        '$r = -1$ (perfekt negativ korrelation). I **D** ligger punkterna tätt ' +
                        'kring en nedåtlutande linje: stark negativ korrelation, $r$ nära $-1$. ' +
                        'Båda stryks.',
                    figur: 'b9-negativa',
                },
                {
                    rubrik: 'Stryk diagrammen där punkterna är utspridda',
                    varfor: 'Ligger punkterna långt från linjen på båda sidor är sambandet svagt, ' +
                        'och då är $r$ långt från $1$ även om linjen lutar uppåt.',
                    text: 'I **B** och **E** lutar linjen uppåt, men punkterna är utspridda över ' +
                        'en stor yta. Korrelationen är positiv men svag, så $r$ är klart mindre ' +
                        'än $0{,}8$.',
                    figur: 'b9-svaga',
                },
                {
                    rubrik: 'Kvar blir A och F',
                    varfor: 'I båda ligger punkterna tätt längs en uppåtlutande linje. Att linjen ' +
                        'i **F** är flack spelar ingen roll: lutningen påverkar inte $r$, bara hur ' +
                        'väl punkterna följer linjen.',
                    text: 'Stark positiv korrelation i **A** och **F**, så där är $r > 0{,}8$.',
                    figur: 'b9-svar',
                },
            ],
            svar: 'A och F',
            bedomning: [['Korrekt svar (A och F)', '+A']],
        },

        // ================= DELPROV D =================
        {
            nr: 18, del: 'D', poang: [1, 0, 0], omrade: 'Exponentialekvationer: logaritmer',
            genomgangar: ['ma2b-5.3', 'ma2b-5.4'],
            endastSvar: true,
            fraga: 'Lös ekvationen $7^{\\frac{x}{5}} = 1{,}3$ och svara med minst två decimaler.',
            figur: null,
            steg: [
                {
                    rubrik: 'Logaritmera båda led',
                    varfor: 'Det obekanta står i exponenten. Tiologaritmen av båda led gör att ' +
                        'logaritmlagen kan flytta ned exponenten i nästa steg.',
                    text: '$$7^{\\frac{x}{5}} = 1{,}3 \\quad \\Longleftrightarrow \\quad ' +
                        '\\lg 7^{\\frac{x}{5}} = \\lg 1{,}3$$',
                },
                {
                    rubrik: 'Flytta ned exponenten',
                    varfor: 'Logaritmlagen $\\lg a^p = p \\cdot \\lg a$ gör exponenten ' +
                        '$\\dfrac{x}{5}$ till en faktor.',
                    text: '$$\\dfrac{x}{5} \\cdot \\lg 7 = \\lg 1{,}3$$',
                },
                {
                    rubrik: 'Multiplicera båda led med 5',
                    varfor: 'Då försvinner nämnaren $5$ i vänsterledet.',
                    text: '$$x \\cdot \\lg 7 = 5 \\cdot \\lg 1{,}3$$',
                },
                {
                    rubrik: 'Dividera båda led med lg 7',
                    varfor: 'Då står $x$ ensamt. Räkna ut kvoten med det digitala verktyget ' +
                        'först här, så att inget avrundas i förväg.',
                    text: '$$x = \\dfrac{5 \\cdot \\lg 1{,}3}{\\lg 7} = 0{,}6741\\ldots \\approx 0{,}67$$',
                },
                {
                    rubrik: 'Kontrollera',
                    varfor: 'Exponenten $\\dfrac{0{,}6741}{5} \\approx 0{,}135$ är liten, så $7$ ' +
                        'upphöjt till den ska bli strax över $1$. Räknaren ger:',
                    text: '$$7^{\\frac{0{,}6741}{5}} \\approx 1{,}30$$\n\nStämmer.',
                },
            ],
            svar: '$x \\approx 0{,}67$',
            bedomning: [['Korrekt svar ($x = 0{,}67$)', '+E']],
        },
    ];

    var prov = window.NP_PROV[ID] = {
        id: ID,
        kurs: 'Matematik nivå 2b',
        termin: 'VT 2022',
        namn: 'Nationellt prov Ma 2b, våren 2022',
        kort: 'NP Ma 2b VT 2022',
        harlettFran: KALLA,
        intro: 'Det här är det riktiga nationella provet i Matematik 2b från våren 2022. ' +
            'Provet är frisläppt och återanvänds inte. Välj en uppgift, lös den själv, och ' +
            'klicka sedan fram lösningen ett steg i taget. Varje steg förklarar både vad som ' +
            'görs och varför, och varje uppgift kan också följas som en pennlösning.',
        kravgranser: 'Provet (delprov B–D) ger totalt 58 poäng varav 21 E-, 20 C- och 17 A-poäng. ' +
            'Poängen skrivs (E/C/A). Till exempel betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
            '1 A-poäng. Gräns för provbetyget: E minst 14 poäng · D minst 22 poäng varav 6 på ' +
            'minst C-nivå · C minst 29 poäng varav 11 på minst C-nivå · B minst 38 poäng varav ' +
            '5 på A-nivå · A minst 45 poäng varav 9 på A-nivå.',
        delprov: {
            B: {
                tid: '120 minuter för delprov B och C tillsammans',
                hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
                hjalpmedelKort: 'Utan digitala verktyg',
                beskrivning: 'Uppgift 1–9. Endast svar krävs.',
            },
            C: {
                tid: '120 minuter för delprov B och C tillsammans',
                hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
                hjalpmedelKort: 'Utan digitala verktyg',
                beskrivning: 'Uppgift 10–16. Fullständiga lösningar krävs.',
            },
            D: {
                tid: '120 minuter',
                hjalpmedel: 'Digitala verktyg, formelblad och linjal',
                hjalpmedelKort: 'Digitala verktyg tillåtna',
                beskrivning: 'Uppgift 17–29. Fullständiga lösningar krävs.',
            },
        },
    };

    /* ---- Härledningen (samma kod i ma1b- och ma3b-filen) ---- */
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
