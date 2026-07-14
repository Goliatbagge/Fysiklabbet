// Fysiklabbet — Nationellt prov Matematik 3c, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Kursen Matematik 3c motsvarar dagens "Matematik fortsättning nivå 1c".
// Källa: Skolverket/Umeå universitet — provet är frisläppt och återanvänds
// inte.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma3c-vt2022'] = {
    id: 'ma3c-vt2022',
    kurs: 'Matematik fortsättning nivå 1c',
    termin: 'VT 2022',
    namn: 'Nationellt prov Ma 3c, våren 2022',
    kort: 'NP Ma 3c VT 2022',
    intro: 'Det här är det riktiga nationella provet i Matematik 3c (dagens Matematik ' +
        'fortsättning nivå 1c) från våren 2022 — provet är frisläppt och återanvänds inte. ' +
        'Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg i taget. ' +
        'Varje steg förklarar både vad som görs och varför, och figurerna byggs upp i takt ' +
        'med lösningen.',
    kravgranser: 'Provet (delprov B–D) ger totalt 58 poäng varav 21 E-, 21 C- och 16 A-poäng. ' +
        'Poängen skrivs (E/C/A) — t.ex. betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
        '1 A-poäng. Gräns för provbetyget: E minst 15 poäng · D minst 24 poäng varav 7 på ' +
        'minst C-nivå · C minst 31 poäng varav 13 på minst C-nivå · B minst 39 poäng varav ' +
        '5 på A-nivå · A minst 45 poäng varav 8 på A-nivå.',
    delprov: {
        B: {
            tid: '120 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal — inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 1–11. Endast svar krävs.',
        },
        C: {
            tid: '120 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal — inga digitala verktyg',
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
    uppgifter: [

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [1, 0, 0], omrade: 'Integraler — primitiv funktion',
            endastSvar: true,
            fraga: 'Ett av alternativen A–D är ett exempel på en primitiv funktion till ' +
                'funktionen $f(x) = x^3 - 2x$. Vilket?\n\n' +
                '**A.** $F(x) = 3x^2 - 2$\n\n' +
                '**B.** $F(x) = \\dfrac{x^4}{4} - 4x$\n\n' +
                '**C.** $F(x) = \\dfrac{x^4}{4} - x^2$\n\n' +
                '**D.** $F(x) = x^4 - 2x^2$',
            figur: null,
            steg: [
                {
                    rubrik: 'Använd villkoret för en primitiv funktion',
                    varfor: 'Att $F$ är en primitiv funktion till $f$ betyder precis att $F\'(x) = f(x)$. ' +
                        'Det snabbaste sättet att testa alternativen är alltså att derivera dem och se ' +
                        'vilket som ger tillbaka $x^3 - 2x$.',
                    text: 'Vi söker det $F$ som uppfyller $F\'(x) = x^3 - 2x$.\n\n' +
                        '**A:** $F\'(x) = 6x$ — fel.\n\n' +
                        '**B:** $F\'(x) = \\dfrac{4x^3}{4} - 4 = x^3 - 4$ — fel.',
                },
                {
                    rubrik: 'Derivera alternativ C',
                    varfor: 'Potensregeln: $\\dfrac{x^4}{4}$ har derivatan $\\dfrac{4x^3}{4} = x^3$ ' +
                        'och $x^2$ har derivatan $2x$. Alternativ D kan vi utesluta på samma sätt.',
                    text: '$$F(x) = \\dfrac{x^4}{4} - x^2 \\quad \\Longrightarrow \\quad ' +
                        'F\'(x) = x^3 - 2x = f(x)$$\n\n' +
                        '(**D** ger $F\'(x) = 4x^3 - 4x$ — fel.) Alternativ C stämmer.',
                },
            ],
            svar: 'Alternativ C: $F(x) = \\dfrac{x^4}{4} - x^2$',
            bedomning: [['Korrekt svar (C: $F(x) = \\dfrac{x^4}{4} - x^2$)', '+E']],
        },

        {
            nr: 2, del: 'B', poang: [1, 0, 0], omrade: 'Derivata — genomsnittlig förändringshastighet',
            endastSvar: true,
            fraga: 'Den 1 augusti varje sommar inventeras (räknas) antalet gråsälar i Östersjön. ' +
                'Tabellen visar resultatet.\n\n' +
                '| År | Antal gråsälar |\n| :---: | :---: |\n' +
                '| 2013 | 28 000 |\n| 2014 | 32 000 |\n| 2015 | 31 000 |\n' +
                '| 2016 | 30 000 |\n| 2017 | 30 000 |\n| 2018 | 34 000 |\n| 2019 | 38 000 |\n\n' +
                'Använd tabellen och bestäm den genomsnittliga förändringshastigheten för ' +
                'antalet gråsälar från den 1 augusti 2015 till den 1 augusti 2018.',
            figur: null,
            steg: [
                {
                    rubrik: 'Läs av start- och slutvärdet i tabellen',
                    varfor: 'Genomsnittlig förändringshastighet handlar bara om start- och slutpunkten — ' +
                        'vad som händer däremellan spelar ingen roll. Vi behöver alltså antalet sälar ' +
                        'år 2015 och år 2018.',
                    text: 'År 2015: $31\\,000$ sälar. År 2018: $34\\,000$ sälar.',
                },
                {
                    rubrik: 'Beräkna ändringskvoten',
                    varfor: 'Genomsnittlig förändringshastighet är den totala förändringen delad med ' +
                        'tiden det tog — en ändringskvot $\\dfrac{\\Delta y}{\\Delta x}$.',
                    text: '$$\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{34\\,000 - 31\\,000}{2018 - 2015} ' +
                        '= \\dfrac{3\\,000}{3} = 1\\,000\\ \\text{sälar/år}$$',
                },
            ],
            svar: '$1\\,000$ sälar per år.',
            bedomning: [['Korrekt svar ($1\\,000$)', '+E']],
        },

        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Derivata — grafisk avläsning',
            endastSvar: true,
            fraga: 'Figuren visar grafen till funktionen $f$.\n\n' +
                'Använd grafen och ange vilket av alternativen A–F som är det bästa värdet ' +
                'till $f\'(2)$.\n\n' +
                '**A.** $4$&emsp;&emsp;**B.** $2$&emsp;&emsp;**C.** $0{,}5$&emsp;&emsp;' +
                '**D.** $-0{,}5$&emsp;&emsp;**E.** $-2$&emsp;&emsp;**F.** $-4$',
            figur: 'u3',
            steg: [
                {
                    rubrik: 'Rita tangenten i punkten där x = 2',
                    varfor: 'Derivatan $f\'(2)$ är grafens lutning just där $x = 2$ — alltså lutningen ' +
                        'för tangenten i den punkten. Grafisk avläsning betyder: rita tangenten och ' +
                        'mät dess lutning.',
                    text: 'Grafen går genom punkten $(2,\\ 4)$. Där lägger vi en tangent — en rät ' +
                        'linje som precis snuddar grafen.',
                    figur: 'u3-s1',
                },
                {
                    rubrik: 'Avläs tangentens lutning med ett trappsteg',
                    varfor: 'Lutningen $k$ är "förändring i $y$ per steg i $x$". Vi går ett steg åt ' +
                        'höger längs tangenten och läser av hur mycket den sjunker.',
                    text: 'Ett steg åt höger ($\\Delta x = 1$) ger två steg nedåt ($\\Delta y = -2$):\n\n' +
                        '$$f\'(2) \\approx \\dfrac{-2}{1} = -2$$\n\nDet motsvarar alternativ **E**.',
                },
            ],
            svar: 'Alternativ E: $f\'(2) = -2$',
            bedomning: [['Korrekt svar (E: $-2$)', '+E']],
        },

        {
            nr: 4, del: 'B', poang: [1, 0, 0], omrade: 'Absolutbelopp',
            endastSvar: true,
            fraga: 'Beräkna värdet av uttrycket $\\left| 3x - 7 \\right|$ då $x = 2$',
            figur: null,
            steg: [
                {
                    rubrik: 'Sätt in x = 2 innanför beloppstecknen',
                    varfor: 'Först räknar vi ut vad som står innanför absolutbeloppet — precis som ' +
                        'med en parentes.',
                    text: '$$\\left| 3 \\cdot 2 - 7 \\right| = \\left| 6 - 7 \\right| = \\left| -1 \\right|$$',
                },
                {
                    rubrik: 'Beräkna absolutbeloppet',
                    varfor: 'Absolutbeloppet av ett tal är talets avstånd till $0$ på tallinjen — ' +
                        'alltid noll eller positivt. Avståndet från $-1$ till $0$ är $1$.',
                    text: '$$\\left| -1 \\right| = 1$$',
                },
            ],
            svar: '$1$',
            bedomning: [['Korrekt svar ($1$)', '+E']],
        },

        {
            nr: 5, del: 'B', poang: [1, 1, 0], omrade: 'Trigonometri — enhetscirkeln',
            endastSvar: true,
            fraga: 'Figuren visar en enhetscirkel där en punkt och en vinkel är markerade.\n\n' +
                'Använd figuren och bestäm värdet för<br>' +
                '**a)** $\\sin 50\\degree$&emsp;&emsp;**b)** $\\cos 230\\degree$',
            figur: 'u5',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av punktens y-koordinat',
                    varfor: 'På enhetscirkeln är $\\cos v$ punktens $x$-koordinat och $\\sin v$ dess ' +
                        '$y$-koordinat. Punkten vid vinkeln $50\\degree$ är given som $(0{,}64;\\ 0{,}77)$ ' +
                        '— så sinusvärdet kan läsas av direkt.',
                    text: '$$\\sin 50\\degree = y\\text{-koordinaten} = 0{,}77$$',
                    figur: 'u5-s1',
                    delsvar: { del: 'a', text: '$\\sin 50\\degree = 0{,}77$' },
                },
                {
                    del: 'b',
                    rubrik: 'Hitta punkten för vinkeln 230°',
                    varfor: 'Det finns ingen punkt för $230\\degree$ i figuren — men ' +
                        '$230\\degree = 50\\degree + 180\\degree$. Ett halvt varv till betyder att vi ' +
                        'hamnar i punkten mittemot, på andra sidan origo. Båda koordinaterna byter ' +
                        'då tecken.',
                    text: 'Punkten vid $230\\degree$ ligger diametralt mittemot punkten vid ' +
                        '$50\\degree$:\n\n$$(0{,}64;\\ 0{,}77) \\longrightarrow (-0{,}64;\\ -0{,}77)$$',
                    figur: 'u5-s2',
                },
                {
                    del: 'b',
                    rubrik: 'Läs av x-koordinaten',
                    varfor: 'Cosinus är $x$-koordinaten för punkten på enhetscirkeln.',
                    text: '$$\\cos 230\\degree = -0{,}64$$',
                    delsvar: { del: 'b', text: '$\\cos 230\\degree = -0{,}64$' },
                },
            ],
            svar: 'a) $\\sin 50\\degree = 0{,}77$ &nbsp;&nbsp; b) $\\cos 230\\degree = -0{,}64$',
            bedomning: [
                ['a) Korrekt svar ($0{,}77$)', '+E'],
                ['b) Korrekt svar ($-0{,}64$)', '+C'],
            ],
        },

        {
            nr: 6, del: 'B', poang: [1, 1, 1], omrade: 'Derivata — deriveringsregler',
            endastSvar: true,
            fraga: 'Bestäm $f\'(x)$ då<br>' +
                '**a)** $f(x) = 4x^3 - 12x$<br>' +
                '**b)** $f(x) = ax^2 - \\dfrac{4}{x}$<br>' +
                '**c)** $f(x) = \\dfrac{1}{3^{-2x}}$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Derivera termvis med potensregeln',
                    varfor: 'Potensregeln: $x^n$ har derivatan $n \\cdot x^{n-1}$. Konstanta faktorer ' +
                        'följer med, och varje term deriveras för sig.',
                    text: '$$f(x) = 4x^3 - 12x \\quad \\Longrightarrow \\quad f\'(x) = 12x^2 - 12$$',
                    delsvar: { del: 'a', text: '$f\'(x) = 12x^2 - 12$' },
                },
                {
                    del: 'b',
                    rubrik: 'Skriv om bråket som en potens',
                    varfor: 'Potensregeln kräver att termerna står på formen $x^n$. ' +
                        '$\\dfrac{4}{x} = 4x^{-1}$, och $a$ behandlas som en konstant.',
                    text: '$$f(x) = ax^2 - 4x^{-1}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Derivera med potensregeln',
                    varfor: 'Termen $-4x^{-1}$ får derivatan $-4 \\cdot (-1) \\cdot x^{-2} = 4x^{-2}$ ' +
                        '— tänk på att exponenten minskar med ett, från $-1$ till $-2$.',
                    text: '$$f\'(x) = 2ax + 4x^{-2} \\qquad \\left( = 2ax + \\dfrac{4}{x^2} \\right)$$',
                    delsvar: { del: 'b', text: '$f\'(x) = 2ax + 4x^{-2}$' },
                },
                {
                    del: 'c',
                    rubrik: 'Skriv om till en potens med positiv exponent',
                    varfor: 'Ett bråk med en potens i nämnaren kan alltid skrivas om: ' +
                        '$\\dfrac{1}{b^{-n}} = b^{n}$. Då blir funktionen en vanlig ' +
                        'exponentialfunktion som vi kan derivera.',
                    text: '$$f(x) = \\dfrac{1}{3^{-2x}} = 3^{2x}$$',
                },
                {
                    del: 'c',
                    rubrik: 'Derivera exponentialfunktionen',
                    varfor: 'Regeln för exponentialfunktioner: $a^{kx}$ har derivatan ' +
                        '$k \\cdot \\ln a \\cdot a^{kx}$. Här är $a = 3$ och $k = 2$, och ' +
                        '$2\\ln 3$ kan skrivas som $\\ln 3^2$.',
                    text: '$$f\'(x) = 2 \\cdot \\ln 3 \\cdot 3^{2x} = 3^{2x} \\cdot \\ln 3^2$$',
                    delsvar: { del: 'c', text: '$f\'(x) = 3^{2x} \\cdot \\ln 3^2$' },
                },
            ],
            svar: 'a) $f\'(x) = 12x^2 - 12$ &nbsp;&nbsp; b) $f\'(x) = 2ax + 4x^{-2}$ &nbsp;&nbsp; ' +
                'c) $f\'(x) = 3^{2x} \\cdot \\ln 3^2$',
            bedomning: [
                ['a) Korrekt svar ($f\'(x) = 12x^2 - 12$)', '+E'],
                ['b) Korrekt svar ($f\'(x) = 2ax + 4x^{-2}$)', '+C'],
                ['c) Korrekt svar ($f\'(x) = 3^{2x} \\cdot \\ln 3^2$) — även korrekta svar på annan form ges poäng', '+A'],
            ],
        },

        {
            nr: 7, del: 'B', poang: [1, 1, 1], omrade: 'Algebra — förenkling',
            endastSvar: true,
            fraga: 'Förenkla uttrycken så långt som möjligt.<br>' +
                '**a)** $\\dfrac{5x^3 - x^6}{x^3}$<br>' +
                '**b)** $\\dfrac{2x^2 + 12x + 18}{2(x^2 - 9)}$<br>' +
                '**c)** $\\dfrac{2\\mathrm{e}^x \\cdot \\mathrm{e}^{-ax} - \\mathrm{e}^x}{\\mathrm{e}^{-ax} - 0{,}5}$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Dela upp bråket termvis',
                    varfor: 'När nämnaren är en enda term kan varje term i täljaren delas för sig. ' +
                        'Potenslagen $\\dfrac{x^6}{x^3} = x^{6-3}$ gör resten.',
                    text: '$$\\dfrac{5x^3 - x^6}{x^3} = \\dfrac{5x^3}{x^3} - \\dfrac{x^6}{x^3} = 5 - x^3$$',
                    delsvar: { del: 'a', text: '$5 - x^3$' },
                },
                {
                    del: 'b',
                    rubrik: 'Faktorisera täljare och nämnare',
                    varfor: 'Ett bråk kan bara förkortas om täljare och nämnare är skrivna som ' +
                        'produkter. Täljaren döljer en kvadreringsregel och nämnaren ett ' +
                        'konjugat — två mönster som alltid är värda att leta efter.',
                    text: 'Täljaren: $2x^2 + 12x + 18 = 2(x^2 + 6x + 9) = 2(x + 3)^2$\n\n' +
                        'Nämnaren: $2(x^2 - 9) = 2(x + 3)(x - 3)$',
                },
                {
                    del: 'b',
                    rubrik: 'Förkorta bort gemensamma faktorer',
                    varfor: 'Faktorn $2$ och en faktor $(x + 3)$ finns i både täljare och nämnare ' +
                        'och kan strykas.',
                    text: '$$\\dfrac{2(x+3)^2}{2(x+3)(x-3)} = \\dfrac{x + 3}{x - 3}$$',
                    delsvar: { del: 'b', text: '$\\dfrac{x + 3}{x - 3}$' },
                },
                {
                    del: 'c',
                    rubrik: 'Bryt ut e^x ur täljaren',
                    varfor: 'Båda termerna i täljaren innehåller faktorn $\\mathrm{e}^x$ — bryter vi ' +
                        'ut den syns det att resten liknar nämnaren.',
                    text: '$$2\\mathrm{e}^x \\cdot \\mathrm{e}^{-ax} - \\mathrm{e}^x = ' +
                        '\\mathrm{e}^x \\left( 2\\mathrm{e}^{-ax} - 1 \\right)$$',
                },
                {
                    del: 'c',
                    rubrik: 'Skriv om nämnaren och förkorta',
                    varfor: 'Nämnaren $\\mathrm{e}^{-ax} - 0{,}5$ är precis hälften av parentesen ' +
                        '$2\\mathrm{e}^{-ax} - 1$. Skriver vi den så kan hela parentesen förkortas bort.',
                    text: '$$\\mathrm{e}^{-ax} - 0{,}5 = \\dfrac{2\\mathrm{e}^{-ax} - 1}{2} ' +
                        '\\quad \\Longrightarrow \\quad ' +
                        '\\dfrac{\\mathrm{e}^x \\left( 2\\mathrm{e}^{-ax} - 1 \\right)}' +
                        '{\\frac{2\\mathrm{e}^{-ax} - 1}{2}} = 2\\mathrm{e}^x$$',
                    delsvar: { del: 'c', text: '$2\\mathrm{e}^x$' },
                },
            ],
            svar: 'a) $5 - x^3$ &nbsp;&nbsp; b) $\\dfrac{x + 3}{x - 3}$ &nbsp;&nbsp; c) $2\\mathrm{e}^x$',
            bedomning: [
                ['a) Korrekt svar ($5 - x^3$)', '+E'],
                ['b) Korrekt svar ($\\dfrac{x+3}{x-3}$)', '+C'],
                ['c) Korrekt svar ($2\\mathrm{e}^x$) — även svaret $\\dfrac{\\mathrm{e}^x}{0{,}5}$ ges poäng', '+A'],
            ],
        },

        {
            nr: 8, del: 'B', poang: [0, 1, 0], omrade: 'Ekvationer — faktorisering',
            endastSvar: true,
            fraga: 'Lös ekvationen $3x^4 - 8x = 2x^4$',
            figur: null,
            steg: [
                {
                    rubrik: 'Samla alla termer i ett led',
                    varfor: 'För att kunna faktorisera vill vi ha noll i ena ledet. ' +
                        '$3x^4 - 2x^4 = x^4$, så ekvationen blir enkel.',
                    text: '$$3x^4 - 8x - 2x^4 = 0 \\quad \\Longleftrightarrow \\quad x^4 - 8x = 0$$',
                },
                {
                    rubrik: 'Faktorisera — dela aldrig med x',
                    varfor: 'Frestelsen är att dela båda leden med $x$, men då försvinner roten ' +
                        '$x = 0$! Bryt i stället ut $x$ och använd nollproduktmetoden: en produkt ' +
                        'är noll precis när någon faktor är noll.',
                    text: '$$x \\left( x^3 - 8 \\right) = 0$$',
                },
                {
                    rubrik: 'Lös varje faktor för sig',
                    varfor: 'Första faktorn ger $x = 0$ direkt. Andra faktorn är en tredjegradsekvation ' +
                        'utan mellantermer — dra kubikroten.',
                    text: '$$x = 0 \\qquad \\text{eller} \\qquad x^3 = 8 \\ \\Longleftrightarrow \\ x = 2$$\n\n' +
                        '$$x_1 = 0 \\qquad x_2 = 2$$',
                },
            ],
            svar: '$x_1 = 0$ och $x_2 = 2$',
            bedomning: [['Korrekt svar ($x_1 = 0$, $x_2 = 2$) — även svaret $x_1 = 0$, $x_2 = 8^{1/3}$ ges poäng', '+C']],
        },

        {
            nr: 9, del: 'B', poang: [0, 1, 0], omrade: 'Derivatans graf',
            endastSvar: true,
            fraga: 'Figuren visar grafen till funktionen $f$.\n\n' +
                'Ett av alternativen A–F visar grafen till funktionens derivata $f\'$. Vilket?',
            figur: 'u9',
            steg: [
                {
                    rubrik: 'Koppla extrempunkterna till derivatans nollställen',
                    varfor: 'I en maximi- eller minimipunkt är tangenten horisontell, så där är ' +
                        '$f\'(x) = 0$. Grafen till $f$ har en maximipunkt och en minimipunkt — ' +
                        'derivatans graf måste alltså skära $x$-axeln i två punkter.',
                    text: 'Grafen till $f\'$ ska ha **två nollställen** — ett vid maximipunktens ' +
                        '$x$-värde och ett vid minimipunktens. Det utesluter A, C, D och F, som har ' +
                        'ett eller inga nollställen.',
                    figur: 'u9-s1',
                },
                {
                    rubrik: 'Kontrollera derivatans tecken mellan nollställena',
                    varfor: 'Mellan maximipunkten och minimipunkten avtar $f$ — där måste ' +
                        '$f\'(x) < 0$. Före maximipunkten och efter minimipunkten växer $f$, ' +
                        'så där är $f\'(x) > 0$.',
                    text: 'Derivatans graf ska vara **positiv, sedan negativ, sedan positiv** — en ' +
                        'parabel med öppningen uppåt som går under $x$-axeln mellan sina nollställen. ' +
                        'Det stämmer med alternativ **B**.',
                },
            ],
            svar: 'Alternativ B',
            bedomning: [['Korrekt svar (B)', '+C']],
        },

        {
            nr: 10, del: 'B', poang: [0, 2, 0], omrade: 'Derivata — teckenstudium',
            endastSvar: true,
            fraga: 'Figuren visar huvuddragen av grafen till funktionen $p$.\n\n' +
                'Bestäm för vilka värden på $x$ som<br>' +
                '**a)** $p\'(x) < 0$<br>' +
                '**b)** uttrycket $\\dfrac{p(x)}{p\'(x)}$ inte är definierat.',
            figur: 'u10',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Hitta intervallet där grafen avtar',
                    varfor: '$p\'(x) < 0$ betyder att grafen lutar nedåt. Grafen avtar från ' +
                        'maximipunkten till minimipunkten — läs av deras $x$-värden.',
                    text: 'Grafen har en maximipunkt vid $x = 0$ och en minimipunkt vid $x = 3$. ' +
                        'Mellan dem avtar $p$:\n\n$$0 < x < 3$$\n\n(Ändpunkterna ingår inte — där är ' +
                        '$p\'(x) = 0$, inte negativ.)',
                    figur: 'u10-s1',
                    delsvar: { del: 'a', text: '$p\'(x) < 0$ för $0 < x < 3$' },
                },
                {
                    del: 'b',
                    rubrik: 'Hitta var nämnaren blir noll',
                    varfor: 'Ett bråk är odefinierat precis när nämnaren är noll. Här är nämnaren ' +
                        '$p\'(x)$ — den är noll där grafen har horisontell tangent, det vill säga ' +
                        'i extrempunkterna.',
                    text: 'Horisontell tangent i maximipunkten ($x = 0$) och minimipunkten ($x = 3$):\n\n' +
                        '$$x = 0 \\qquad \\text{och} \\qquad x = 3$$',
                    figur: 'u10-s2',
                    delsvar: { del: 'b', text: 'Uttrycket är inte definierat för $x = 0$ och $x = 3$' },
                },
            ],
            svar: 'a) $0 < x < 3$ &nbsp;&nbsp; b) $x = 0$ och $x = 3$',
            bedomning: [
                ['a) Korrekt svar utifrån godtagbar avläsning ($0 < x < 3$)', '+C'],
                ['b) Korrekt svar utifrån godtagbar avläsning ($0$ och $3$)', '+C'],
            ],
        },

        {
            nr: 11, del: 'B', poang: [0, 0, 1], omrade: 'Integraler — analysens huvudsats',
            endastSvar: true,
            fraga: 'Figuren visar grafen till funktionen $f$.\n\n' +
                'Bestäm ett värde på $a$ så att $\\displaystyle\\int_{-1}^{a} f\'(x)\\,\\mathrm{d}x = 3$',
            figur: 'u11',
            steg: [
                {
                    rubrik: 'Skriv om integralen med insättningsformeln',
                    varfor: 'Vi integrerar **derivatan** $f\'$ — och en primitiv funktion till $f\'$ ' +
                        'är just $f$. Integralens värde är därför skillnaden mellan funktionsvärdena ' +
                        'i gränserna. Det är nyckeln som gör att grafen räcker för att svara.',
                    text: '$$\\int_{-1}^{a} f\'(x)\\,\\mathrm{d}x = f(a) - f(-1)$$',
                },
                {
                    rubrik: 'Läs av f(−1) i grafen',
                    varfor: 'Vi behöver värdet i den undre gränsen. Grafen skär $x$-axeln ' +
                        'vid $x = -1$.',
                    text: '$$f(-1) = 0$$\n\nVillkoret blir alltså $f(a) - 0 = 3$, det vill säga ' +
                        '$f(a) = 3$.',
                    figur: 'u11-s1',
                },
                {
                    rubrik: 'Sök ett x där funktionsvärdet är 3',
                    varfor: 'Nu letar vi i grafen efter var kurvan når höjden $y = 3$. På den ' +
                        'växande delen efter minimipunkten sker det vid ungefär $x = 1{,}8$.',
                    text: '$$f(a) = 3 \\quad \\Longrightarrow \\quad a \\approx 1{,}8$$\n\n' +
                        '(Även $a = 0$ fungerar — maximipunkten $(0,\\ 3)$ ligger också på höjden $3$.)',
                    figur: 'u11-s2',
                },
            ],
            svar: '$a \\approx 1{,}8$ (svar i intervallet $1{,}7 \\leq a \\leq 1{,}9$ godtas)',
            bedomning: [['Korrekt svar utifrån godtagbar avläsning ($1{,}8$) — svar i intervallet $1{,}7 \\leq a \\leq 1{,}9$ ges poäng', '+A']],
        },

        // ================= DELPROV C =================
        {
            nr: 12, del: 'C', poang: [1, 0, 0], omrade: 'Derivata — exponentialfunktion',
            fraga: 'Tilde deriverar funktionen $f(x) = \\mathrm{e}^{2x}$ och ställer upp kvoten ' +
                '$\\dfrac{f\'(x)}{f(x)}$\n\n' +
                'Hon påstår följande: "För alla värden på $x$ kommer kvoten alltid att få värdet 2".\n\n' +
                'Har Tilde rätt? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera f',
                    varfor: 'För att undersöka kvoten behöver vi $f\'$. Deriveringsregeln för ' +
                        '$\\mathrm{e}^{kx}$ säger att den inre koefficienten $k$ hamnar som faktor ' +
                        'framför: derivatan av $\\mathrm{e}^{2x}$ är $2\\mathrm{e}^{2x}$.',
                    text: '$$f(x) = \\mathrm{e}^{2x} \\quad \\Longrightarrow \\quad ' +
                        'f\'(x) = 2\\mathrm{e}^{2x}$$',
                },
                {
                    rubrik: 'Förenkla kvoten',
                    varfor: 'Faktorn $\\mathrm{e}^{2x}$ finns i både täljare och nämnare och är ' +
                        'aldrig noll — den kan alltid förkortas bort, oavsett vilket $x$ vi väljer.',
                    text: '$$\\dfrac{f\'(x)}{f(x)} = \\dfrac{2\\mathrm{e}^{2x}}{\\mathrm{e}^{2x}} = 2 ' +
                        '\\qquad \\text{för alla } x$$\n\nKvoten är alltid $2$ — **Tilde har rätt**.',
                },
            ],
            svar: 'Ja, Tilde har rätt: $\\dfrac{f\'(x)}{f(x)} = \\dfrac{2\\mathrm{e}^{2x}}{\\mathrm{e}^{2x}} = 2$ för alla $x$.',
            bedomning: [['Godtagbart resonemang som visar att uttrycket alltid har värdet $2$ och att Tilde därmed har rätt', '+E']],
        },

        {
            nr: 13, del: 'C', poang: [2, 0, 0], omrade: 'Integraler — beräkning',
            fraga: 'Beräkna $\\displaystyle\\int_{1}^{2} 3x^2\\,\\mathrm{d}x$',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'En bestämd integral beräknas med en primitiv funktion: höj exponenten ' +
                        'ett steg och dela med den nya exponenten. Kontroll: deriveras $x^3$ fås ' +
                        '$3x^2$ tillbaka.',
                    text: '$$\\int 3x^2\\,\\mathrm{d}x = \\dfrac{3x^3}{3} = x^3$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Insättningsformeln: värdet i övre gränsen minus värdet i undre gränsen.',
                    text: '$$\\int_{1}^{2} 3x^2\\,\\mathrm{d}x = \\Big[ x^3 \\Big]_{1}^{2} ' +
                        '= 2^3 - 1^3 = 8 - 1 = 7$$',
                },
            ],
            svar: '$7$',
            bedomning: [
                ['Godtagbar ansats, bestämmer en korrekt primitiv funktion', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($7$)', '+E'],
            ],
        },

        {
            nr: 14, del: 'C', poang: [3, 1, 0], omrade: 'Derivata — extrempunkter',
            fraga: 'Funktionen $f$ ges av $f(x) = x^3 - 3x^2 + 7$\n\n' +
                'Använd derivata och bestäm koordinaterna för eventuella maximi-, minimi- och ' +
                'terrasspunkter för funktionens graf.\n\n' +
                'Avgör också, för varje sådan punkt, om det är en maximi-, minimi- eller ' +
                'terrasspunkt.',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera och sök derivatans nollställen',
                    varfor: 'I maximi-, minimi- och terrasspunkter är tangenten horisontell, ' +
                        'alltså $f\'(x) = 0$. Vi deriverar och faktoriserar för att hitta alla ' +
                        'sådana punkter.',
                    text: '$$f\'(x) = 3x^2 - 6x = 3x(x - 2)$$\n\n' +
                        '$$f\'(x) = 0 \\quad \\Longleftrightarrow \\quad x_1 = 0 \\ \\text{ eller } \\ x_2 = 2$$',
                },
                {
                    rubrik: 'Beräkna punkternas koordinater',
                    varfor: 'Extrempunkternas $y$-värden fås genom att sätta in $x$-värdena i den ' +
                        'ursprungliga funktionen $f$ — inte i derivatan.',
                    text: '$$f(0) = 7 \\qquad \\Longrightarrow \\qquad (0,\\ 7)$$\n\n' +
                        '$$f(2) = 2^3 - 3 \\cdot 2^2 + 7 = 8 - 12 + 7 = 3 \\qquad \\Longrightarrow \\qquad (2,\\ 3)$$',
                },
                {
                    rubrik: 'Avgör karaktären med en teckentabell',
                    varfor: 'Derivatans tecken runt nollställena avslöjar karaktären: går grafen ' +
                        'från växande till avtagande är det en maximipunkt, tvärtom en minimipunkt. ' +
                        'Testa ett $x$-värde i varje intervall, t.ex. $f\'(-1) = 9$, $f\'(1) = -3$ ' +
                        'och $f\'(3) = 9$.',
                    text: '| | $x < 0$ | $x = 0$ | $0 < x < 2$ | $x = 2$ | $x > 2$ |\n' +
                        '| :--- | :---: | :---: | :---: | :---: | :---: |\n' +
                        '| $f\'(x)$ | $+$ | $0$ | $-$ | $0$ | $+$ |\n' +
                        '| $f(x)$ | ↗ | max | ↘ | min | ↗ |\n\n' +
                        '$(0,\\ 7)$ är en **maximipunkt** och $(2,\\ 3)$ en **minimipunkt**. ' +
                        'Inga terrasspunkter finns.',
                },
            ],
            svar: 'Maximipunkt i $(0,\\ 7)$ och minimipunkt i $(2,\\ 3)$.',
            bedomning: [
                ['Godtagbar ansats, bestämmer derivatans nollställen $x_1 = 0$ och $x_2 = 2$, eller bestämmer ett av derivatans nollställen och en extrempunkts koordinater', '+E'],
                ['med korrekt bestämning av båda extrempunkternas koordinater, $(0,\\ 7)$ och $(2,\\ 3)$', '+E'],
                ['Godtagbar verifiering av båda extrempunkternas karaktär (maximipunkt $(0,\\ 7)$ och minimipunkt $(2,\\ 3)$)', '+E'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 15, del: 'C', poang: [0, 2, 0], omrade: 'Integraler — area med parameter',
            fraga: 'Figuren visar ett gråmarkerat område som begränsas av grafen till funktionen ' +
                '$g$, den räta linjen $x = 3$ samt de positiva koordinataxlarna.\n\n' +
                'Funktionen $g$ ges av $g(x) = 5 + px - x^2$ där $p$ är en konstant.\n\n' +
                'Bestäm $p$ så att det gråmarkerade områdets area blir 24 areaenheter.',
            figur: 'u15',
            steg: [
                {
                    rubrik: 'Ställ upp arean som en integral',
                    varfor: 'Området ligger mellan grafen och $x$-axeln från $x = 0$ till $x = 3$ — ' +
                        'dess area är integralen av $g$ över det intervallet. Villkoret "arean är 24" ' +
                        'blir en ekvation där $p$ är den obekanta.',
                    text: '$$\\int_{0}^{3} \\left( 5 + px - x^2 \\right)\\mathrm{d}x = 24$$',
                    figur: 'u15-s1',
                },
                {
                    rubrik: 'Beräkna integralen med p kvar som bokstav',
                    varfor: 'Konstanten $p$ följer bara med i räkningen som en vanlig koefficient. ' +
                        'Primitiv funktion termvis, sedan insättning av gränserna.',
                    text: '$$\\Big[ 5x + \\dfrac{px^2}{2} - \\dfrac{x^3}{3} \\Big]_{0}^{3} ' +
                        '= 15 + \\dfrac{9p}{2} - 9 = 6 + 4{,}5p$$',
                },
                {
                    rubrik: 'Lös ekvationen',
                    varfor: 'Arean ska vara $24$ — sätt uttrycket lika med $24$ och lös ut $p$.',
                    text: '$$6 + 4{,}5p = 24 \\quad \\Longleftrightarrow \\quad 4{,}5p = 18 ' +
                        '\\quad \\Longleftrightarrow \\quad p = 4$$',
                },
            ],
            svar: '$p = 4$',
            bedomning: [
                ['Godtagbar ansats, t.ex. ställer upp ekvationen $\\displaystyle\\int_0^3 g(x)\\,\\mathrm{d}x = 24$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($p = 4$)', '+C'],
            ],
        },

        {
            nr: 16, del: 'C', poang: [0, 2, 0], omrade: 'Derivata — resonemang om extrempunkter',
            fraga: 'Funktionen $f$ ges av $f(x) = x^3 + 3x$\n\n' +
                'Jaana påstår att funktionen $f$ har två extrempunkter.\n\n' +
                'Har Jaana rätt? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp villkoret för extrempunkter',
                    varfor: 'En extrempunkt kräver horisontell tangent, alltså att $f\'(x) = 0$ ' +
                        'har någon lösning. Vi deriverar och undersöker den ekvationen.',
                    text: '$$f\'(x) = 3x^2 + 3$$\n\n$$3x^2 + 3 = 0$$',
                },
                {
                    rubrik: 'Visa att ekvationen saknar lösningar',
                    varfor: 'Eftersom $x^2 \\geq 0$ för alla reella $x$ är $3x^2 + 3 \\geq 3$ — ' +
                        'derivatan är alltid minst $3$ och kan aldrig bli noll. Funktionen är ' +
                        'alltså växande överallt och kan inte vända.',
                    text: '$$3x^2 + 3 = 0 \\quad \\Longleftrightarrow \\quad x^2 = -1$$\n\n' +
                        'saknar reella lösningar. Eftersom $f\'(x) \\geq 3 > 0$ för alla $x$ är $f$ ' +
                        'strängt växande och saknar extrempunkter — **Jaana har fel**.',
                },
            ],
            svar: 'Nej, Jaana har fel: $f\'(x) = 3x^2 + 3 > 0$ för alla $x$, så $f$ saknar extrempunkter.',
            bedomning: [
                ['Godtagbar ansats, t.ex. bestämmer $f\'(x)$ och tecknar ekvationen $3x^2 + 3 = 0$', '+C'],
                ['med godtagbart resonemang där det framgår att funktionen $f$ saknar extrempunkter och att Jaana därmed har fel', '+C'],
            ],
        },

        {
            nr: 17, del: 'C', poang: [0, 1, 3], omrade: 'Derivatans definition',
            fraga: 'Funktionen $f$ ges av $f(x) = \\dfrac{5}{a^2 x}$ där $x \\neq 0$ och $a \\neq 0$\n\n' +
                'Bestäm $f\'(x)$ med hjälp av derivatans definition.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp derivatans definition',
                    varfor: 'Uppgiften kräver uttryckligen definitionen — deriveringsreglerna får ' +
                        'alltså inte användas (men de kan användas som facit i huvudet: ' +
                        'vi väntar oss $-\\dfrac{5}{a^2 x^2}$).',
                    text: '$$f\'(x) = \\lim_{h \\to 0} \\dfrac{f(x + h) - f(x)}{h} ' +
                        '= \\lim_{h \\to 0} \\dfrac{\\dfrac{5}{a^2(x + h)} - \\dfrac{5}{a^2 x}}{h}$$',
                },
                {
                    rubrik: 'Skriv täljaren på gemensamt bråkstreck',
                    varfor: 'För att kunna förenkla kvoten måste de två bråken i täljaren slås ihop. ' +
                        'Gemensam nämnare är $a^2(x + h)x$, och $\\dfrac{5}{a^2}$ kan brytas ut.',
                    text: '$$\\dfrac{5}{a^2(x+h)} - \\dfrac{5}{a^2 x} ' +
                        '= \\dfrac{5}{a^2} \\cdot \\dfrac{x - (x + h)}{(x + h)x} ' +
                        '= \\dfrac{5}{a^2} \\cdot \\dfrac{-h}{(x + h)x}$$',
                },
                {
                    rubrik: 'Förkorta bort h',
                    varfor: 'Nu syns det varför omskrivningen behövdes: $h$ finns som faktor i både ' +
                        'täljare och nämnare. När $h$ är förkortat går det att låta $h \\to 0$ utan ' +
                        'att dela med noll.',
                    text: '$$\\dfrac{f(x+h) - f(x)}{h} = \\dfrac{5}{a^2} \\cdot \\dfrac{-h}{h(x + h)x} ' +
                        '= \\dfrac{-5}{a^2 (x + h) x}$$',
                },
                {
                    rubrik: 'Låt h gå mot noll',
                    varfor: 'Gränsvärdet fås nu genom att sätta $h = 0$ i det förenklade uttrycket: ' +
                        '$(x + h) \\to x$.',
                    text: '$$f\'(x) = \\lim_{h \\to 0} \\dfrac{-5}{a^2 (x + h) x} = -\\dfrac{5}{a^2 x^2}$$',
                },
            ],
            svar: '$f\'(x) = -\\dfrac{5}{a^2 x^2}$',
            bedomning: [
                ['Godtagbar ansats, korrekt tecknad ändringskvot', '+C'],
                ['med godtagbar fortsättning, korrekt förenkling av ändringskvoten till en form där gränsvärdesbestämning kan göras', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($f\'(x) = -\\frac{5}{a^2x^2}$)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },

        {
            nr: 18, del: 'C', poang: [0, 0, 3], omrade: 'Tangent och area',
            fraga: 'Figuren visar grafen till tredjegradsfunktionen $f$ som ges av $f(x) = x^3$ och ' +
                'en tangent till grafen i den punkt där $x = a$. Tangenten, den positiva $x$-axeln ' +
                'och linjen $x = a$ begränsar ett område som har formen av en triangel.\n\n' +
                'Bestäm $a$ så att triangeln får arean 1,5 areaenheter.',
            figur: 'u18',
            steg: [
                {
                    rubrik: 'Ställ upp tangentens ekvation',
                    varfor: 'Triangelns form styrs av tangenten, så vi behöver dess ekvation. ' +
                        'Tangenten går genom punkten $(a,\\ a^3)$ och har lutningen $f\'(a)$.',
                    text: '$$f\'(x) = 3x^2 \\quad \\Longrightarrow \\quad k = f\'(a) = 3a^2$$\n\n' +
                        'Enpunktsformen ger:\n\n' +
                        '$$y - a^3 = 3a^2 (x - a) \\quad \\Longleftrightarrow \\quad y = 3a^2 x - 2a^3$$',
                    figur: 'u18-s1',
                },
                {
                    rubrik: 'Bestäm tangentens skärning med x-axeln',
                    varfor: 'Triangelns hörn är tangentens skärning med $x$-axeln, punkten $(a,\\ 0)$ ' +
                        'och tangeringspunkten $(a,\\ a^3)$. Skärningen med $x$-axeln fås ur $y = 0$.',
                    text: '$$0 = 3a^2 x - 2a^3 \\quad \\Longleftrightarrow \\quad x = \\dfrac{2a}{3}$$',
                    figur: 'u18-s2',
                },
                {
                    rubrik: 'Teckna triangelns area',
                    varfor: 'Basen ligger längs $x$-axeln, från $x = \\dfrac{2a}{3}$ till $x = a$, ' +
                        'och höjden är det lodräta avståndet upp till tangeringspunkten, $a^3$.',
                    text: '$$\\text{bas} = a - \\dfrac{2a}{3} = \\dfrac{a}{3} \\qquad \\text{höjd} = a^3$$\n\n' +
                        '$$T = \\dfrac{\\text{bas} \\cdot \\text{höjd}}{2} ' +
                        '= \\dfrac{\\frac{a}{3} \\cdot a^3}{2} = \\dfrac{a^4}{6}$$',
                },
                {
                    rubrik: 'Lös ekvationen för arean',
                    varfor: 'Arean ska vara $1{,}5$. Av figuren är $a > 0$, så bara den positiva ' +
                        'roten är aktuell.',
                    text: '$$\\dfrac{a^4}{6} = 1{,}5 \\quad \\Longleftrightarrow \\quad a^4 = 9 ' +
                        '\\quad \\Longleftrightarrow \\quad a = \\sqrt[4]{9} = \\sqrt{3} \\approx 1{,}73$$',
                },
            ],
            svar: '$a = \\sqrt[4]{9} = \\sqrt{3} \\approx 1{,}73$',
            bedomning: [
                ['Godtagbar ansats, bestämmer tangentens ekvation uttryckt i $a$: $y = 3a^2 \\cdot x - 2a^3$, eller tecknar motsvarande samband med en godtycklig skärningspunkt $b$', '+A'],
                ['med godtagbar fortsättning, bestämmer tangentens skärningspunkt med $x$-axeln uttryckt i $a$: $\\dfrac{2a}{3}$', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($a = \\sqrt[4]{9}$)', '+A'],
            ],
        },

        // ================= DELPROV D =================
        {
            nr: 19, del: 'D', poang: [1, 0, 0], omrade: 'Derivata — digitalt verktyg',
            endastSvar: true,
            fraga: 'Funktionen $f$ som ges av $f(x) = (2x - 1)^5$ kan inte deriveras med hjälp av ' +
                'deriveringsreglerna inom denna kurs.\n\n' +
                'Använd ditt digitala verktyg för att beräkna ett värde på $f\'(2)$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Låt det digitala verktyget derivera',
                    varfor: 'Poängen med uppgiften är att använda verktyget: mata in funktionen och ' +
                        'be om derivatans värde i $x = 2$ (numerisk derivata), eller rita grafen och ' +
                        'läs av tangentens lutning där.',
                    text: 'Med t.ex. kommandot $\\dfrac{\\mathrm{d}}{\\mathrm{d}x}\\Big[(2x-1)^5\\Big]_{x=2}$ ' +
                        'ger verktyget:\n\n$$f\'(2) = 810$$\n\n' +
                        '(Kontroll med kedjeregeln, som hör till nästa kurs: ' +
                        '$f\'(x) = 10(2x-1)^4$ ger $f\'(2) = 10 \\cdot 3^4 = 810$.)',
                },
            ],
            svar: '$f\'(2) = 810$',
            bedomning: [['Godtagbart svar ($810$)', '+E']],
        },

        {
            nr: 20, del: 'D', poang: [2, 0, 0], omrade: 'Triangelsatserna — areasatsen',
            fraga: 'I en triangel är en sida 6,6 cm och en annan sida 5,1 cm. Två av triangelns ' +
                'vinklar är $42\\degree$ och $120\\degree$. Se figur.\n\n' +
                'Bestäm triangelns area genom att använda någon eller några av triangelsatserna ' +
                '(sinussatsen, cosinussatsen och areasatsen).',
            figur: 'u20',
            steg: [
                {
                    rubrik: 'Bestäm triangelns tredje vinkel',
                    varfor: 'Areasatsen kräver två sidor och vinkeln **mellan** dem. De kända ' +
                        'sidorna 6,6 och 5,1 möts i det översta hörnet — och just den vinkeln är ' +
                        'okänd. Vinkelsumman i en triangel ger den direkt.',
                    text: '$$180\\degree - 42\\degree - 120\\degree = 18\\degree$$',
                    figur: 'u20-s1',
                },
                {
                    rubrik: 'Använd areasatsen',
                    varfor: 'Nu har vi två sidor och mellanliggande vinkel — precis vad areasatsen ' +
                        '$T = \\dfrac{a \\cdot b \\cdot \\sin C}{2}$ behöver.',
                    text: '$$T = \\dfrac{6{,}6 \\cdot 5{,}1 \\cdot \\sin 18\\degree}{2} ' +
                        '\\approx 5{,}2\\ \\mathrm{cm^2}$$',
                    figur: 'u20-s2',
                },
            ],
            svar: 'Triangelns area är cirka $5{,}2\\ \\mathrm{cm^2}$.',
            bedomning: [
                ['Godtagbar ansats, bestämmer triangelns tredje vinkel och påbörjar lösning med hjälp av areasatsen', '+E'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($5{,}2\\ \\mathrm{cm^2}$)', '+E'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [3, 1, 0], omrade: 'Exponentialmodell — tillväxt',
            fraga: 'Pojkars längd kan beskrivas med den enkla modellen ' +
                '$f(x) = 78 \\cdot \\mathrm{e}^{0{,}07x}$ där $f(x)$ är längden i centimeter och ' +
                '$x$ är pojkars ålder i år.<br>' +
                '**a)** Bestäm vid vilken ålder som pojkar är 125 cm långa enligt modellen.<br>' +
                '**b)** Använd modellen och bestäm hur snabbt pojkar växer då de är exakt 6 år.<br>' +
                '**c)** Undersök om modellen även är giltig för pojkar som går på gymnasiet.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Ställ upp ekvationen',
                    varfor: 'Vi söker den ålder $x$ där längden $f(x)$ är $125$ cm — det är en ' +
                        'ekvation, inte en insättning.',
                    text: '$$78 \\cdot \\mathrm{e}^{0{,}07x} = 125$$',
                },
                {
                    del: 'a',
                    rubrik: 'Lös ekvationen',
                    varfor: 'Dela med $78$ och logaritmera — eller låt det digitala verktyget lösa ' +
                        'ekvationen direkt.',
                    text: '$$\\mathrm{e}^{0{,}07x} = \\dfrac{125}{78} \\quad \\Longleftrightarrow \\quad ' +
                        '0{,}07x = \\ln \\dfrac{125}{78} \\quad \\Longleftrightarrow \\quad ' +
                        'x = \\dfrac{\\ln \\frac{125}{78}}{0{,}07} \\approx 6{,}7$$',
                    delsvar: { del: 'a', text: 'Pojkar är 125 cm långa vid cirka $6{,}7$ års ålder enligt modellen.' },
                },
                {
                    del: 'b',
                    rubrik: 'Tolka "hur snabbt" som derivatan',
                    varfor: 'Hur snabbt längden ändras vid en viss ålder är förändringshastigheten — ' +
                        'alltså derivatan $f\'(6)$, inte längden $f(6)$. Derivatan av ' +
                        '$78\\mathrm{e}^{0{,}07x}$ är $0{,}07 \\cdot 78\\mathrm{e}^{0{,}07x}$.',
                    text: '$$f\'(x) = 0{,}07 \\cdot 78 \\cdot \\mathrm{e}^{0{,}07x} = ' +
                        '5{,}46 \\cdot \\mathrm{e}^{0{,}07x}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna f′(6)',
                    varfor: 'Sätt in $x = 6$ — svaret får enheten cm per år, eftersom det är en ' +
                        'hastighet.',
                    text: '$$f\'(6) = 5{,}46 \\cdot \\mathrm{e}^{0{,}07 \\cdot 6} \\approx 8{,}3\\ \\text{cm/år}$$',
                    delsvar: { del: 'b', text: 'Vid 6 års ålder växer pojkar cirka $8{,}3$ cm/år enligt modellen.' },
                },
                {
                    del: 'c',
                    rubrik: 'Testa modellen för en gymnasieålder',
                    varfor: 'En modell prövas genom att sätta in ett relevant värde och bedöma ' +
                        'rimligheten. Gymnasiepojkar är cirka 16–19 år — testa t.ex. $x = 16$.',
                    text: '$$f(16) = 78 \\cdot \\mathrm{e}^{0{,}07 \\cdot 16} \\approx 240\\ \\text{cm}$$\n\n' +
                        'En medellängd på $2{,}4$ meter för 16-åringar är orimlig (och för 19-åringar ' +
                        'ger modellen nästan $2{,}9$ meter) — **modellen är inte giltig för pojkar på ' +
                        'gymnasiet**.',
                    delsvar: { del: 'c', text: 'Nej — modellen ger t.ex. $f(16) \\approx 240$ cm, vilket är orimligt. Modellen gäller inte gymnasiepojkar.' },
                },
            ],
            svar: 'a) Cirka $6{,}7$ år &nbsp;&nbsp; b) Cirka $8{,}3$ cm/år &nbsp;&nbsp; ' +
                'c) Nej, modellen är inte giltig för gymnasiepojkar (den ger t.ex. $240$ cm för en 16-åring).',
            bedomning: [
                ['a) Godtagbar ansats, ställer upp ekvationen $78 \\cdot \\mathrm{e}^{0{,}07x} = 125$ eller motsvarande med digitalt verktyg', '+E'],
                ['a) med i övrigt godtagbar lösning med godtagbart svar ($6{,}7$ år)', '+E'],
                ['b) Godtagbar lösning med godtagbart svar ($8{,}3$ cm/år)', '+C'],
                ['c) Godtagbart resonemang med slutsatsen att modellen inte är giltig för pojkar som går på gymnasiet', '+E'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [2, 0, 0], omrade: 'Tangentens ekvation',
            fraga: 'Grafen till funktionen $f(x) = 3x^2 + 4x$ har en tangent i den punkt där $x = 2$\n\n' +
                'Tangentens ekvation kan skrivas $y = kx - 12$\n\n' +
                'Bestäm $k$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm den gemensamma punkten',
                    varfor: 'Tangenten rör vid grafen i tangeringspunkten — den punkten ligger ' +
                        'alltså på **både** grafen och tangenten. Det ger oss en punkt att sätta ' +
                        'in i tangentens ekvation.',
                    text: '$$f(2) = 3 \\cdot 2^2 + 4 \\cdot 2 = 12 + 8 = 20$$\n\n' +
                        'Tangeringspunkten är $(2,\\ 20)$.',
                },
                {
                    rubrik: 'Sätt in punkten i tangentens ekvation',
                    varfor: 'Eftersom $(2,\\ 20)$ ligger på linjen $y = kx - 12$ måste koordinaterna ' +
                        'passa i ekvationen — då blir $k$ den enda obekanta.',
                    text: '$$20 = k \\cdot 2 - 12 \\quad \\Longleftrightarrow \\quad 2k = 32 ' +
                        '\\quad \\Longleftrightarrow \\quad k = 16$$\n\n' +
                        '**Kontroll:** tangentens lutning ska vara $f\'(2)$, och ' +
                        '$f\'(x) = 6x + 4$ ger $f\'(2) = 16$ — stämmer.',
                },
            ],
            svar: '$k = 16$',
            bedomning: [
                ['Godtagbar ansats, visar insikt om att grafen och tangenten har en gemensam punkt med koordinaten $(2,\\ 20)$, eller visar insikt om att $f\'(2) = k$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($k = 16$)', '+E'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [0, 2, 0], omrade: 'Derivata — ekvation med digitalt verktyg',
            fraga: 'Funktionerna $f$ och $g$ ges av $f(x) = \\dfrac{12}{x} + 8x$ och ' +
                '$g(x) = \\sqrt{x}$\n\n' +
                'Lös ekvationen $f\'(x) = g\'(x)$. Svara med minst två decimaler.',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera båda funktionerna',
                    varfor: 'Skriv om på potensform först: $\\dfrac{12}{x} = 12x^{-1}$ och ' +
                        '$\\sqrt{x} = x^{0,5}$. Då ger potensregeln båda derivatorna.',
                    text: '$$f(x) = 12x^{-1} + 8x \\quad \\Longrightarrow \\quad ' +
                        'f\'(x) = -12x^{-2} + 8 = -\\dfrac{12}{x^2} + 8$$\n\n' +
                        '$$g(x) = x^{0{,}5} \\quad \\Longrightarrow \\quad ' +
                        'g\'(x) = 0{,}5 \\cdot x^{-0{,}5} = \\dfrac{1}{2\\sqrt{x}}$$',
                },
                {
                    rubrik: 'Ställ upp ekvationen och lös den digitalt',
                    varfor: 'Ekvationen $-\\dfrac{12}{x^2} + 8 = \\dfrac{1}{2\\sqrt{x}}$ går inte ' +
                        'att lösa algebraiskt med kursens metoder — här är det digitala verktyget ' +
                        'tänkt att användas (t.ex. grafisk skärning eller en ekvationslösare).',
                    text: '$$-\\dfrac{12}{x^2} + 8 = 0{,}5 x^{-0{,}5}$$\n\n' +
                        'Verktyget ger $x \\approx 1{,}26$.',
                },
            ],
            svar: '$x \\approx 1{,}26$',
            bedomning: [
                ['Godtagbar ansats, ställer upp ekvationen $-12 \\cdot x^{-2} + 8 = 0{,}5x^{-0{,}5}$ eller motsvarande med digitalt verktyg', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($x = 1{,}26$)', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [0, 3, 0], omrade: 'Triangelsatserna — sinus- och cosinussatsen',
            fraga: 'Figuren visar triangeln $ABC$ där en punkt $D$ är markerad på sidan $AC$. ' +
                'Några mått och vinklar finns givna i figuren.\n\n' +
                'Bestäm längden av sträckan $BD$ genom att använda någon eller några av ' +
                'triangelsatserna (sinussatsen, cosinussatsen och areasatsen).',
            figur: 'u24',
            steg: [
                {
                    rubrik: 'Bestäm vinkeln ABC',
                    varfor: 'Sträckan $BD$ ligger i triangeln $ABD$, där vi bara känner $AD = 5{,}0$ ' +
                        'och vinkeln $A = 106\\degree$ — det räcker inte än. Men i den stora ' +
                        'triangeln $ABC$ kan vi komma åt sidan $AB$. Först behövs dess tredje vinkel.',
                    text: '$$\\angle ABC = 180\\degree - 106\\degree - 39\\degree = 35\\degree$$',
                    figur: 'u24-s1',
                },
                {
                    rubrik: 'Beräkna AB med sinussatsen i triangeln ABC',
                    varfor: 'I triangeln $ABC$ känner vi nu alla vinklar och sidan ' +
                        '$AC = 5{,}0 + 2{,}7 = 7{,}7$. Sinussatsen parar ihop varje sida med sin ' +
                        'motstående vinkel: $AC$ står mot $\\angle B$ och $AB$ mot $\\angle C$.',
                    text: '$$\\dfrac{AB}{\\sin 39\\degree} = \\dfrac{7{,}7}{\\sin 35\\degree} ' +
                        '\\quad \\Longleftrightarrow \\quad ' +
                        'AB = \\dfrac{7{,}7 \\cdot \\sin 39\\degree}{\\sin 35\\degree} \\approx 8{,}45$$',
                    figur: 'u24-s2',
                },
                {
                    rubrik: 'Beräkna BD med cosinussatsen i triangeln ABD',
                    varfor: 'I triangeln $ABD$ känner vi nu två sidor ($AB \\approx 8{,}45$ och ' +
                        '$AD = 5{,}0$) och vinkeln mellan dem ($106\\degree$) — exakt läget där ' +
                        'cosinussatsen ger den tredje sidan.',
                    text: '$$BD^2 = AB^2 + AD^2 - 2 \\cdot AB \\cdot AD \\cdot \\cos 106\\degree$$\n\n' +
                        '$$BD^2 = 8{,}45^2 + 5{,}0^2 - 2 \\cdot 8{,}45 \\cdot 5{,}0 \\cdot \\cos 106\\degree ' +
                        '\\approx 119{,}7$$\n\n' +
                        '$$BD \\approx \\sqrt{119{,}7} \\approx 10{,}9 \\approx 11\\ \\mathrm{cm}$$',
                    figur: 'u24-s3',
                },
            ],
            svar: '$BD \\approx 11\\ \\mathrm{cm}$',
            bedomning: [
                ['Godtagbar ansats, t.ex. bestämmer vinkeln $ABC$ och beräknar sidan $AB$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($11\\ \\mathrm{cm}$)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 2, 0], omrade: 'Sekant och tangent',
            fraga: 'Funktionen $f$ ges av $f(x) = 2^x$. Figuren visar grafen till funktionen $f$ ' +
                'samt en sekant mellan två punkter på grafen.\n\n' +
                'Till grafen dras en tangent som är parallell med sekanten. Bestäm $x$-koordinaten ' +
                'för tangeringspunkten. Svara med minst två decimaler.',
            figur: 'u25',
            steg: [
                {
                    rubrik: 'Beräkna sekantens lutning',
                    varfor: 'Parallella linjer har samma lutning — så först behöver vi veta vilken ' +
                        'lutning tangenten ska ha. Sekanten går genom $(-1;\\ 0{,}5)$ och $(2,\\ 4)$.',
                    text: '$$k = \\dfrac{4 - 0{,}5}{2 - (-1)} = \\dfrac{3{,}5}{3} = \\dfrac{7}{6}$$',
                    figur: 'u25-s1',
                },
                {
                    rubrik: 'Ställ villkoret för den parallella tangenten',
                    varfor: 'Tangentens lutning i punkten $x$ är $f\'(x)$. Derivatan av $2^x$ är ' +
                        '$2^x \\cdot \\ln 2$. Villkoret "parallell med sekanten" blir en ekvation.',
                    text: '$$f\'(x) = 2^x \\cdot \\ln 2 = \\dfrac{7}{6}$$',
                },
                {
                    rubrik: 'Lös ekvationen',
                    varfor: 'Dela med $\\ln 2$ och logaritmera — eller lös direkt med det digitala ' +
                        'verktyget.',
                    text: '$$2^x = \\dfrac{7}{6 \\ln 2} \\quad \\Longleftrightarrow \\quad ' +
                        'x = \\dfrac{\\ln \\left( \\frac{7}{6 \\ln 2} \\right)}{\\ln 2} \\approx 0{,}75$$',
                    figur: 'u25-s2',
                },
            ],
            svar: '$x \\approx 0{,}75$',
            bedomning: [
                ['Godtagbar ansats, t.ex. ställer upp ekvationen $2^x \\cdot \\ln 2 = \\dfrac{7}{6}$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($0{,}75$)', '+C'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 0, 2], omrade: 'Polynomfunktion — bevis',
            fraga: 'Funktionen $f$ ges av\n\n' +
                '$$f(x) = a(x - a)(x - 2a)(x - 3a) = ax^3 - 6a^2x^2 + 11a^3x - 6a^4$$\n\n' +
                'där $a$ är en konstant, $a > 0$\n\n' +
                'Grafen till $f$ skär $x$-axeln i punkterna $P$, $Q$ och $R$. Se figur.\n\n' +
                'Visa algebraiskt att tangenterna till grafen i punkterna $P$ och $R$ är ' +
                'parallella oavsett värde på konstanten $a$.',
            figur: 'u26',
            steg: [
                {
                    rubrik: 'Bestäm punkternas x-koordinater',
                    varfor: 'Faktorformen visar nollställena direkt: $f(x) = 0$ när $x = a$, ' +
                        '$x = 2a$ eller $x = 3a$. Eftersom $a > 0$ kommer de i den ordningen — ' +
                        '$P$ är alltså $(a,\\ 0)$ och $R$ är $(3a,\\ 0)$.',
                    text: '$$P = (a,\\ 0) \\qquad Q = (2a,\\ 0) \\qquad R = (3a,\\ 0)$$\n\n' +
                        'Tangenterna är parallella om de har samma lutning, det vill säga om ' +
                        '$f\'(a) = f\'(3a)$.',
                    figur: 'u26-s1',
                },
                {
                    rubrik: 'Derivera f',
                    varfor: 'Den utvecklade formen $ax^3 - 6a^2x^2 + 11a^3x - 6a^4$ deriveras ' +
                        'termvis med potensregeln — kom ihåg att $a$ är en konstant, så t.ex. ' +
                        '$6a^2x^2$ får derivatan $12a^2x$.',
                    text: '$$f\'(x) = 3ax^2 - 12a^2 x + 11a^3$$',
                },
                {
                    rubrik: 'Beräkna lutningarna i P och R',
                    varfor: 'Sätt in $x = a$ respektive $x = 3a$ och förenkla — varje term blir en ' +
                        'multipel av $a^3$, så jämförelsen blir enkel.',
                    text: '$$f\'(a) = 3a \\cdot a^2 - 12a^2 \\cdot a + 11a^3 = 3a^3 - 12a^3 + 11a^3 = 2a^3$$\n\n' +
                        '$$f\'(3a) = 3a \\cdot 9a^2 - 12a^2 \\cdot 3a + 11a^3 = 27a^3 - 36a^3 + 11a^3 = 2a^3$$',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    varfor: 'Båda lutningarna blev $2a^3$ — samma uttryck oavsett vilket värde ' +
                        '$a$ har. Två linjer med samma lutning är parallella.',
                    text: '$$f\'(a) = f\'(3a) = 2a^3 \\quad \\text{för alla } a > 0$$\n\n' +
                        'Tangenterna i $P$ och $R$ har alltså alltid samma lutning och är därmed ' +
                        'parallella oavsett värdet på $a$. $\\blacksquare$',
                },
            ],
            svar: 'Tangenterna i $P = (a,\\ 0)$ och $R = (3a,\\ 0)$ har båda lutningen $f\'(a) = f\'(3a) = 2a^3$ och är därför parallella oavsett värde på $a$.',
            bedomning: [
                ['Godtagbar ansats, påbörjar ett resonemang där det framgår att det är $f\'(a)$ och $f\'(3a)$ som ska undersökas', '+A'],
                ['med slutfört resonemang som visar att $f\'(a) = 2a^3$ och $f\'(3a) = 2a^3$ med slutsatsen att tangenterna är parallella oavsett värde på $a$', '+A'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 0, 2], omrade: 'Integralmodell — bensinförbrukning',
            fraga: 'Wilma har en gammal moped.\n\n' +
                'Bensinförbrukningen för mopeden kan beskrivas med den förenklade modellen ' +
                '$f(x) = 0{,}3 + 0{,}5\\mathrm{e}^{-0{,}76x}$ där $f(x)$ är bensinförbrukningen i ' +
                'liter/mil och $x$ är sträckan i mil från start.\n\n' +
                'Wilma startar med 4,0 liter bensin i tanken. Bestäm hur lång sträcka Wilma kan ' +
                'köra som längst innan bensinen tar slut enligt modellen.',
            figur: null,
            steg: [
                {
                    rubrik: 'Tolka modellen — en integral ger total förbrukning',
                    varfor: 'Funktionen $f$ anger förbrukningen i **liter per mil** vid varje läge ' +
                        '$x$ — den ändras längs vägen. Den totala mängden bensin på sträckan ' +
                        '$0$ till $a$ mil är då integralen av förbrukningen: liter/mil gånger mil ' +
                        'blir liter.',
                    text: '$$\\text{Total förbrukning på } a \\text{ mil} = ' +
                        '\\int_{0}^{a} \\left( 0{,}3 + 0{,}5\\mathrm{e}^{-0{,}76x} \\right)\\mathrm{d}x$$',
                },
                {
                    rubrik: 'Ställ upp ekvationen',
                    varfor: 'Bensinen tar slut när den totala förbrukningen är precis de $4{,}0$ ' +
                        'liter Wilma startade med. Sträckan $a$ är den obekanta.',
                    text: '$$\\int_{0}^{a} \\left( 0{,}3 + 0{,}5\\mathrm{e}^{-0{,}76x} \\right)\\mathrm{d}x = 4{,}0$$',
                },
                {
                    rubrik: 'Lös ekvationen med digitalt verktyg',
                    varfor: 'Ekvationen innehåller $a$ både linjärt och i en exponent — den löses ' +
                        'numeriskt. Verktyget kan lösa integralekvationen direkt, eller så ritas ' +
                        'funktionen $\\int_0^a f\\,\\mathrm{d}x - 4$ och nollstället läses av.',
                    text: 'Verktyget ger $a \\approx 11{,}1$.\n\n' +
                        '(Rimlighet: efter några mil är förbrukningen nästan konstant ' +
                        '$0{,}3$ liter/mil, och $\\dfrac{4{,}0}{0{,}3} \\approx 13$ mil minus den ' +
                        'törstigare starten stämmer med drygt $11$ mil.)',
                },
            ],
            svar: 'Wilma kan köra cirka $11$ mil innan bensinen tar slut.',
            bedomning: [
                ['Godtagbar ansats, t.ex. ställer upp ekvationen $\\displaystyle\\int_0^a (0{,}3 + 0{,}5\\mathrm{e}^{-0{,}76x})\\,\\mathrm{d}x = 4$', '+A'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($11$ mil)', '+A'],
            ],
        },

        {
            nr: 28, del: 'D', poang: [0, 0, 3], omrade: 'Optimering — minsta trådlängd',
            fraga: 'Konstsmeden Suzanna tänker göra smycken av silver och guld. Varje smycke ska ' +
                'bestå av en rektangulär silverplatta och en guldtråd. Guldtråden ska lödas fast ' +
                '8 mm från silverplattans hörn. Se figur.\n\n' +
                'Guldtråd är dyr och hon vill därför använda så lite guld som möjligt till ' +
                'smycket. Smycket får inte heller väga för mycket och därför bestämmer Suzanna ' +
                'att en silverplatta ska ha arean $550\\ \\mathrm{mm^2}$.\n\n' +
                'Bestäm vilken längd guldtråden får om Suzanna använder så lite guldtråd som ' +
                'möjligt till smycket.',
            figur: 'u28',
            steg: [
                {
                    rubrik: 'Inför en variabel för plattans mått',
                    varfor: 'Trådens längd beror på plattans form — hög och smal eller låg och bred ' +
                        'ger olika långa trådar. Formen bestäms av ett enda mått när arean är låst: ' +
                        'kalla höjden $x$ mm, så blir bredden $\\dfrac{550}{x}$ mm eftersom arean ' +
                        'är $550\\ \\mathrm{mm^2}$.',
                    text: '$$\\text{höjd} = x \\qquad \\text{bredd} = \\dfrac{550}{x}$$',
                    figur: 'u28-s1',
                },
                {
                    rubrik: 'Teckna trådens längd med Pythagoras sats',
                    varfor: 'Tråden går snett över plattan: från vänstra kanten $8$ mm under det ' +
                        'övre hörnet till högra kanten $8$ mm över det nedre. Den är hypotenusan i ' +
                        'en rätvinklig triangel — den vågräta kateten är hela bredden och den ' +
                        'lodräta är höjden minus $2 \\cdot 8$ mm.',
                    text: '$$L(x) = \\sqrt{ \\left( \\dfrac{550}{x} \\right)^2 + (x - 16)^2 }$$',
                    figur: 'u28-s2',
                },
                {
                    rubrik: 'Minimera längden med digitalt verktyg',
                    varfor: 'Att derivera $L$ för hand blir otympligt — rita i stället grafen till ' +
                        '$L(x)$ i verktyget och läs av minimipunkten. Grafen visar också att det ' +
                        'verkligen är ett minimum: kurvan sjunker före och stiger efter punkten.',
                    text: 'Verktyget ger minimum vid $x \\approx 28{,}7$ mm (plattan blir cirka ' +
                        '$28{,}7 \\times 19{,}1$ mm) med\n\n' +
                        '$$L(28{,}7) \\approx 23\\ \\mathrm{mm}$$',
                },
            ],
            svar: 'Guldtråden blir som kortast cirka $23\\ \\mathrm{mm}$.',
            bedomning: [
                ['Godtagbar ansats, bestämmer ett korrekt funktionsuttryck för guldtrådens längd i en variabel, t.ex. $L(x) = \\sqrt{(x-16)^2 + \\left( \\frac{550}{x} \\right)^2}$', '+A'],
                ['med i övrigt godtagbar lösning, inklusive verifiering av minimum, med godtagbart svar ($23$ mm)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },
    ],
};
