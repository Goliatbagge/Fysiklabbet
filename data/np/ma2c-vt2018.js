// Fysiklabbet — Nationellt prov Matematik 2c, våren 2018.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Provet skrevs enligt ämnesplanen från 2011. Kursen Matematik 2c motsvarar
// dagens "Matematik nivå 2c" (och delas till stora delar med nivå 2b). Det
// enda stoff i provet som utgick vid revideringen 2021 är komplexa tal
// (uppgift 4c), som är märkt med `utgatt`. Källa: Skolverket/Umeå
// universitet — provet är frisläppt och återanvänds inte. Svar och poängkrav
// följer provets bedömningsanvisningar; lösningsmetoderna är de som ingår i
// kursens genomgångar.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma2c-vt2018'] = {
    id: 'ma2c-vt2018',
    kurs: 'Matematik nivå 2c',
    termin: 'VT 2018',
    namn: 'Nationellt prov Ma 2c, våren 2018',
    kort: 'NP Ma 2c VT 2018',
    intro: 'Det här är det nationella provet i Matematik 2c från våren 2018 ' +
        '(Skolverket/Umeå universitet). Provet är frisläppt och återanvänds inte, och ' +
        'här finns de tre skriftliga delproven B, C och D. Provet skrevs enligt ' +
        'ämnesplanen från 2011; den enda uppgiften på stoff som utgick vid revideringen ' +
        '2021 (komplexa tal i uppgift 4c) är märkt. Välj en uppgift, lös den själv, och ' +
        'klicka sedan fram lösningen ett steg i taget. Varje steg förklarar både vad som ' +
        'görs och varför, figurerna byggs upp i takt med lösningen och varje uppgift kan ' +
        'också följas som en pennlösning.',
    kravgranser: 'Provet (delprov B–D) ger totalt 57 poäng varav 20 E-, 20 C- och 17 A-poäng. ' +
        'Poängen skrivs (E/C/A). Till exempel betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
        '1 A-poäng. Gräns för provbetyget: E minst 13 poäng · D minst 22 poäng varav 7 på ' +
        'minst C-nivå · C minst 29 poäng varav 12 på minst C-nivå · B minst 37 poäng varav ' +
        '5 på A-nivå · A minst 44 poäng varav 9 på A-nivå.',
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
            beskrivning: 'Uppgift 17–26. Fullständiga lösningar krävs.',
        },
    },
    uppgifter: [

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [1, 0, 0], omrade: 'Räta linjen: ekvation ur graf',
            genomgangar: ['ma1c-4.4', 'ma1c-4.5'],
            endastSvar: true,
            fraga: 'Figuren visar en rät linje.\n\n' +
                'Ange linjens ekvation på formen $y = kx + m$.',
            figur: 'u1',
            steg: [
                {
                    rubrik: 'Läs av var linjen skär y-axeln',
                    varfor: 'I $y = kx + m$ är $m$ funktionsvärdet när $x = 0$, alltså höjden ' +
                        'där linjen korsar $y$-axeln. Linjen går genom $(0,\\ 3)$.',
                    text: '$$m = 3$$',
                    figur: 'u1-s1',
                },
                {
                    rubrik: 'Läs av lutningen med ett trappsteg',
                    varfor: 'Riktningskoefficienten $k$ är hur mycket $y$ ändras när $x$ ökar ' +
                        'med $1$. Från $(0,\\ 3)$ går vi ett steg åt höger, $\\Delta x = 1$, och ' +
                        'upp till linjen: $\\Delta y = 2$.',
                    text: '$$k = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{2}{1} = 2$$',
                    figur: 'u1-s2',
                },
                {
                    rubrik: 'Skriv linjens ekvation',
                    varfor: 'Sätt in $k = 2$ och $m = 3$. Kontroll med en tredje punkt: ' +
                        '$x = 2$ ger $y = 2 \\cdot 2 + 3 = 7$, och linjen går mycket riktigt ' +
                        'genom $(2,\\ 7)$.',
                    text: '$$y = 2x + 3$$',
                },
            ],
            svar: '$y = 2x + 3$',
            bedomning: [['Korrekt svar utifrån godtagbar avläsning ($y = 2x + 3$)', '+E']],
        },

        {
            nr: 2, del: 'B', poang: [3, 0, 0], omrade: 'Andragradsfunktioner: begrepp ur grafen',
            genomgangar: ['ma2c-3.1', 'ma2c-3.2'],
            endastSvar: true,
            fraga: 'Figuren visar grafen till en andragradsfunktion $f$. Grafen går genom ' +
                'punkterna $(-3,\\ 0)$, $(-1,\\ -4)$ och $(1,\\ 0)$.\n\n' +
                'Utgå från grafen och fyll i det matematiskt korrekta ord som fattas i var ' +
                'och en av meningarna.\n\n' +
                '**a)** $x_1 = -3$ och $x_2 = 1$ är funktionens _______________\n\n' +
                '**b)** Linjen $x = -1$ är grafens _______________\n\n' +
                '**c)** Punkten $(-1,\\ -4)$ är grafens _______________',
            figur: 'u2',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Se var grafen skär x-axeln',
                    varfor: 'Vid $x = -3$ och $x = 1$ är funktionsvärdet noll: grafen går genom ' +
                        '$(-3,\\ 0)$ och $(1,\\ 0)$. De $x$-värden där $f(x) = 0$ kallas ' +
                        'funktionens nollställen.',
                    text: '$x_1 = -3$ och $x_2 = 1$ är funktionens **nollställen**.',
                    figur: 'u2-s1',
                    delsvar: { del: 'a', text: 'Nollställen' },
                },
                {
                    del: 'b',
                    rubrik: 'Se hur grafen ligger kring linjen x = −1',
                    varfor: 'Linjen $x = -1$ går mitt emellan nollställena, och grafen är ' +
                        'spegelsymmetrisk kring den: varje punkt till vänster har en ' +
                        'spegelbild till höger. En sådan linje är parabelns symmetrilinje.',
                    text: 'Linjen $x = -1$ är grafens **symmetrilinje**.',
                    figur: 'u2-s2',
                    delsvar: { del: 'b', text: 'Symmetrilinje' },
                },
                {
                    del: 'c',
                    rubrik: 'Se var grafen vänder',
                    varfor: 'Punkten $(-1,\\ -4)$ är grafens lägsta punkt: den ligger på ' +
                        'symmetrilinjen och där vänder kurvan. Eftersom parabeln öppnar sig ' +
                        'uppåt är det en minimipunkt. (Även svaren vertex och extrempunkt ' +
                        'är korrekta.)',
                    text: 'Punkten $(-1,\\ -4)$ är grafens **minimipunkt**.',
                    figur: 'u2-s3',
                    delsvar: { del: 'c', text: 'Minimipunkt' },
                },
            ],
            svar: '**a)** Nollställen&emsp;&emsp;**b)** Symmetrilinje&emsp;&emsp;**c)** Minimipunkt',
            bedomning: [
                ['a) Korrekt svar (nollställen). Endast svaret nollställen ges poäng', '+E'],
                ['b) Korrekt svar (symmetrilinje). Endast svaret symmetrilinje ges poäng', '+E'],
                ['c) Korrekt svar (till exempel minimipunkt). Även svaren minpunkt, extrempunkt och vertex ges poäng', '+E'],
            ],
        },

        {
            nr: 3, del: 'B', poang: [1, 1, 0], omrade: 'Normalfördelning: medelvärde och standardavvikelse',
            genomgangar: ['ma2c-6.5', 'ma2c-6.4'],
            endastSvar: true,
            fraga: '**a)** Figuren visar en kurva som representerar en normalfördelning. ' +
                'Vilket medelvärde har normalfördelningen?\n\n' +
                '**b)** Figuren visar fem kurvor A–E som representerar normalfördelningar. ' +
                'Vilken av kurvorna A–E representerar den normalfördelning som har den ' +
                'största standardavvikelsen?',
            figur: 'u3',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av var kurvans topp ligger',
                    varfor: 'En normalfördelningskurva är symmetrisk kring medelvärdet, så ' +
                        'toppen ligger rakt ovanför det. Toppen ligger över talet $9$ på axeln.',
                    text: '$$\\text{medelvärde} = 9$$',
                    figur: 'u3-s1',
                    delsvar: { del: 'a', text: '$9$' },
                },
                {
                    del: 'b',
                    rubrik: 'Jämför kurvornas bredd',
                    varfor: 'Standardavvikelsen är ett spridningsmått. Stor spridning ger en ' +
                        'bred och låg kurva, liten spridning en smal och hög. Arean under varje ' +
                        'kurva är lika stor, så den bredaste kurvan är också den lägsta: ' +
                        'kurva A.',
                    text: 'Kurva **A** är bredast och lägst, så den har den största ' +
                        'standardavvikelsen. (Kurva D är smalast och högst och har den minsta.)',
                    figur: 'u3-s2',
                    delsvar: { del: 'b', text: 'Kurva A' },
                },
            ],
            svar: '**a)** $9$&emsp;&emsp;**b)** Kurva A',
            bedomning: [
                ['a) Korrekt svar utifrån godtagbar avläsning ($9$)', '+E'],
                ['b) Korrekt svar (A)', '+C'],
            ],
        },

        {
            nr: 4, del: 'B', poang: [1, 2, 1], omrade: 'Ekvationer: exponentialekvation, kvadrerings- och konjugatregeln',
            genomgangar: ['ma2c-5.3', 'ma2c-2.1', 'ma2c-2.6'],
            endastSvar: true,
            utgatt: 'Deluppgift c) handlar om komplexa tal, som inte längre ingår i Matematik 2c. ' +
                'Stoffet flyttade till Matematik 4 vid revideringen av ämnesplanerna 2021. I dagens ' +
                'kurs räcker det att konstatera att ekvationen $x^2 = -4$ saknar reella lösningar. ' +
                'Deluppgifterna a), b) och d) ingår fortfarande.',
            fraga: 'Lös ekvationerna och svara exakt.\n\n' +
                '**a)** $8^x = 15$\n\n' +
                '**b)** $(x + 5)(x - 5) = (x + 5)^2$\n\n' +
                '**c)** $x^2 + \\mathrm{i}^2 = -5$\n\n' +
                '**d)** $\\left(x + 3^x\\right)^2 - 3^x\\left(3^x + 2x\\right) = 9$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Logaritmera båda led',
                    varfor: 'Det obekanta står i exponenten. Tiologaritmen av båda led och ' +
                        'logaritmlagen $\\lg a^x = x \\cdot \\lg a$ plockar ned $x$ som en faktor.',
                    text: '$$8^x = 15 \\quad \\Longleftrightarrow \\quad \\lg 8^x = \\lg 15 ' +
                        '\\quad \\Longleftrightarrow \\quad x \\cdot \\lg 8 = \\lg 15$$',
                },
                {
                    del: 'a',
                    rubrik: 'Lös ut x',
                    varfor: 'Dividera båda led med $\\lg 8$. Svaret ska vara exakt, så kvoten ' +
                        'lämnas som den är. (Ett närmevärde är $x \\approx 1{,}30$.)',
                    text: '$$x = \\dfrac{\\lg 15}{\\lg 8}$$',
                    delsvar: { del: 'a', text: '$x = \\dfrac{\\lg 15}{\\lg 8}$' },
                },
                {
                    del: 'b',
                    rubrik: 'Utveckla båda led',
                    varfor: 'Vänsterledet är ett konjugatpar, $(a + b)(a - b) = a^2 - b^2$, och ' +
                        'högerledet en kvadrat, $(a + b)^2 = a^2 + 2ab + b^2$. Här är $a = x$ ' +
                        'och $b = 5$.',
                    text: '$$x^2 - 25 = x^2 + 10x + 25$$',
                },
                {
                    del: 'b',
                    rubrik: 'Ta bort kvadrattermen och lös ut x',
                    varfor: '$x^2$ finns i båda led och försvinner när $x^2$ subtraheras från ' +
                        'båda led. Kvar blir en förstagradsekvation: subtrahera $25$ och ' +
                        'dividera med $10$.',
                    text: '$$-25 = 10x + 25 \\quad \\Longleftrightarrow \\quad 10x = -50 \\quad ' +
                        '\\Longleftrightarrow \\quad x = -5$$\n\n' +
                        'Kontroll: $x = -5$ ger $0 \\cdot (-10) = 0$ i vänsterledet och $0^2 = 0$ i högerledet.',
                    delsvar: { del: 'b', text: '$x = -5$' },
                },
                {
                    del: 'c',
                    rubrik: 'Byt ut i² mot −1',
                    varfor: 'Den imaginära enheten är definierad så att $\\mathrm{i}^2 = -1$. ' +
                        'Då blir vänsterledet $x^2 - 1$.',
                    text: '$$x^2 - 1 = -5 \\quad \\Longleftrightarrow \\quad x^2 = -4$$',
                },
                {
                    del: 'c',
                    rubrik: 'Dra roten ur ett negativt tal',
                    varfor: 'Inget reellt tal har kvadraten $-4$, men $\\sqrt{-4} = \\sqrt{4} \\cdot ' +
                        '\\sqrt{-1} = 2\\mathrm{i}$. Ekvationen har alltså de två komplexa ' +
                        'lösningarna $2\\mathrm{i}$ och $-2\\mathrm{i}$. (I dagens Matematik 2c: ' +
                        'ekvationen saknar reella lösningar.)',
                    text: '$$x = \\pm\\sqrt{-4} = \\pm 2\\mathrm{i}$$',
                    delsvar: { del: 'c', text: '$x = \\pm 2\\mathrm{i}$' },
                },
                {
                    del: 'd',
                    rubrik: 'Utveckla kvadraten i vänsterledet',
                    varfor: 'Första kvadreringsregeln med $a = x$ och $b = 3^x$: den dubbla ' +
                        'produkten är $2 \\cdot x \\cdot 3^x$ och $\\left(3^x\\right)^2 = 3^{2x}$. ' +
                        'Resten av ekvationen skrivs med oförändrad.',
                    text: '$$x^2 + 2x \\cdot 3^x + 3^{2x} - 3^x\\left(3^x + 2x\\right) = 9$$',
                },
                {
                    del: 'd',
                    rubrik: 'Multiplicera in 3ˣ i parentesen',
                    varfor: 'Behåll minustecknet och parentesen. Faktorn $3^x$ multipliceras med ' +
                        'varje term: $3^x \\cdot 3^x = 3^{2x}$ och $3^x \\cdot 2x = 2x \\cdot 3^x$.',
                    text: '$$x^2 + 2x \\cdot 3^x + 3^{2x} - \\left(3^{2x} + 2x \\cdot 3^x\\right) = 9$$',
                },
                {
                    del: 'd',
                    rubrik: 'Ta bort parentesen och förenkla',
                    varfor: 'Minus framför parentesen byter tecken på varje term inuti. Sedan tar ' +
                        '$3^{2x}$ och $-3^{2x}$ ut varandra, liksom $2x \\cdot 3^x$ och ' +
                        '$-2x \\cdot 3^x$. Kvar blir bara $x^2$.',
                    text: '$$x^2 + 2x \\cdot 3^x + 3^{2x} - 3^{2x} - 2x \\cdot 3^x = 9 \\quad ' +
                        '\\Longleftrightarrow \\quad x^2 = 9$$',
                },
                {
                    del: 'd',
                    rubrik: 'Dra roten ur båda led',
                    varfor: 'Både $3$ och $-3$ har kvadraten $9$, så ekvationen har två lösningar.',
                    text: '$$x = \\pm\\sqrt{9} = \\pm 3$$',
                    delsvar: { del: 'd', text: '$x = \\pm 3$' },
                },
            ],
            svar: '**a)** $x = \\dfrac{\\lg 15}{\\lg 8}$&emsp;&emsp;**b)** $x = -5$&emsp;&emsp;' +
                '**c)** $x = \\pm 2\\mathrm{i}$&emsp;&emsp;**d)** $x = \\pm 3$',
            bedomning: [
                ['a) Korrekt svar $\\left(x = \\dfrac{\\lg 15}{\\lg 8}\\right)$', '+E'],
                ['b) Korrekt svar ($x = -5$)', '+C'],
                ['c) Korrekt svar ($x = \\pm 2\\mathrm{i}$)', '+C'],
                ['d) Korrekt svar ($x = \\pm 3$)', '+A'],
            ],
        },

        {
            nr: 5, del: 'B', poang: [0, 1, 0], omrade: 'Logaritmlagarna',
            genomgangar: ['ma2c-5.4'],
            endastSvar: true,
            fraga: 'Ge ett exempel på reella tal $a$ och $b$ sådana att ' +
                '$\\lg 3^a - \\lg 3^b = 8 \\lg 3$',
            figur: null,
            steg: [
                {
                    rubrik: 'Flytta ned exponenterna',
                    varfor: 'Logaritmlagen $\\lg x^n = n \\cdot \\lg x$ gör exponenterna till ' +
                        'faktorer framför $\\lg 3$.',
                    text: '$$\\lg 3^a - \\lg 3^b = a \\cdot \\lg 3 - b \\cdot \\lg 3 = (a - b) \\lg 3$$',
                },
                {
                    rubrik: 'Jämför med högerledet',
                    varfor: 'Båda led är ett tal gånger $\\lg 3$, och $\\lg 3 \\neq 0$. ' +
                        'Likheten gäller alltså precis när talen framför är lika: $a - b = 8$.',
                    text: '$$(a - b) \\lg 3 = 8 \\lg 3 \\quad \\Longleftrightarrow \\quad a - b = 8$$',
                },
                {
                    rubrik: 'Välj ett talpar med differensen 8',
                    varfor: 'Vilka tal som helst med $a - b = 8$ duger, till exempel $a = 10$ och ' +
                        '$b = 2$. Kontroll: $\\lg 3^{10} - \\lg 3^2 = 10 \\lg 3 - 2 \\lg 3 = 8 \\lg 3$.',
                    text: '$$a = 10 \\qquad b = 2$$',
                },
            ],
            svar: 'Till exempel $a = 10$ och $b = 2$ (alla tal med $a - b = 8$ duger).',
            bedomning: [['Korrekt svar där differensen mellan $a$ och $b$ är $8$ (till exempel $a = 10$ och $b = 2$)', '+C']],
        },

        {
            nr: 6, del: 'B', poang: [0, 1, 0], omrade: 'Tiologaritmer: olikhet',
            genomgangar: ['ma2c-5.2'],
            endastSvar: true,
            fraga: 'Ange alla värden $x$ kan anta om $1 < \\lg x < 3$',
            figur: null,
            steg: [
                {
                    rubrik: 'Tolka logaritmens värden som tiopotenser',
                    varfor: '$\\lg x$ är den exponent som $10$ ska upphöjas till för att ge $x$. ' +
                        '$\\lg x = 1$ betyder $x = 10^1 = 10$, och $\\lg x = 3$ betyder ' +
                        '$x = 10^3 = 1000$.',
                    text: '$$\\lg 10 = 1 \\qquad \\lg 1000 = 3$$',
                },
                {
                    rubrik: 'Skriv intervallet för x',
                    varfor: 'Logaritmen växer när $x$ växer, så $\\lg x$ ligger mellan $1$ och ' +
                        '$3$ precis när $x$ ligger mellan $10$ och $1000$. Gränserna ingår inte, ' +
                        'eftersom olikheterna är stränga.',
                    text: '$$10 < x < 1000$$',
                },
            ],
            svar: '$10 < x < 1000$',
            bedomning: [['Korrekt angivet intervall (till exempel "$x$ ligger mellan $10$ och $1000$")', '+C']],
        },

        {
            nr: 7, del: 'B', poang: [0, 0, 1], omrade: 'Potensekvation med rationell exponent',
            genomgangar: ['ma1c-1.8', 'ma1c-1.7', 'ma2c-5.1'],
            endastSvar: true,
            fraga: 'Lös ekvationen $2 \\cdot x^{-\\frac{1}{2}} + 3 \\cdot x^{-\\frac{1}{2}} + 4 \\cdot x^{-\\frac{1}{2}} = 3$',
            figur: null,
            steg: [
                {
                    rubrik: 'Samla termerna',
                    varfor: 'Alla tre termerna innehåller samma potens, $x^{-\\frac{1}{2}}$. ' +
                        'De kan därför läggas ihop precis som $2y + 3y + 4y = 9y$.',
                    text: '$$9 \\cdot x^{-\\frac{1}{2}} = 3 \\quad \\Longleftrightarrow \\quad ' +
                        'x^{-\\frac{1}{2}} = \\dfrac{1}{3}$$',
                },
                {
                    rubrik: 'Skriv om potensen',
                    varfor: 'En negativ exponent betyder inverterat tal, och exponenten ' +
                        '$\\dfrac{1}{2}$ betyder kvadratrot: $x^{-\\frac{1}{2}} = \\dfrac{1}{x^{\\frac{1}{2}}} = ' +
                        '\\dfrac{1}{\\sqrt{x}}$.',
                    text: '$$\\dfrac{1}{x^{\\frac{1}{2}}} = \\dfrac{1}{3} \\quad \\Longleftrightarrow \\quad ' +
                        '\\dfrac{1}{\\sqrt{x}} = \\dfrac{1}{3} \\quad \\Longleftrightarrow \\quad \\sqrt{x} = 3$$',
                },
                {
                    rubrik: 'Kvadrera',
                    varfor: 'Kvadrera båda led för att få bort roten. Kontroll: ' +
                        '$9^{-\\frac{1}{2}} = \\dfrac{1}{\\sqrt{9}} = \\dfrac{1}{3}$, och ' +
                        '$(2 + 3 + 4) \\cdot \\dfrac{1}{3} = 3$. Stämmer.',
                    text: '$$x = 3^2 = 9$$',
                },
            ],
            svar: '$x = 9$',
            bedomning: [['Korrekt svar ($x = 9$)', '+A']],
        },

        {
            nr: 8, del: 'B', poang: [0, 0, 1], omrade: 'Exponentialfunktion: byte av tidsenhet',
            genomgangar: ['ma2c-5.5', 'ma1c-3.3', 'ma1c-4.10'],
            endastSvar: true,
            fraga: 'Emil "HeatoN" Christensen, en känd e-sportare, köpte i början av år 2017 ' +
                'en speldator för 32 997 kr. Han räknar med att den procentuella minskningen ' +
                'av datorns värde kommer vara ungefär 5 % per månad. Anta att värdeminskningen ' +
                'per månad fortsätter i samma takt.\n\n' +
                'Teckna den funktion $V$ som beskriver datorns värde $V(t)$ kr som funktion ' +
                'av tiden $t$ i år, istället för i månader, efter inköpet.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm förändringsfaktorn per månad',
                    varfor: 'En minskning med $5\\ \\%$ betyder att $95\\ \\%$ finns kvar efter ' +
                        'varje månad. Förändringsfaktorn är $1 - 0{,}05 = 0{,}95$, och den ' +
                        'används en gång per månad.',
                    text: '$$\\text{efter 1 månad: } 32\\,997 \\cdot 0{,}95 \\qquad ' +
                        '\\text{efter 2 månader: } 32\\,997 \\cdot 0{,}95^2$$',
                },
                {
                    rubrik: 'Räkna med hela år',
                    varfor: 'Ett år är $12$ månader, så efter ett år har värdet multiplicerats ' +
                        'med $0{,}95$ tolv gånger. Antalet månader är alltid $12$ gånger antalet ' +
                        'år: $2$ år är $24$ månader, och $t$ år är $12 \\cdot t$ månader.',
                    text: '$$\\text{efter 1 år: } 32\\,997 \\cdot 0{,}95^{12} \\qquad ' +
                        '\\text{efter } t \\text{ år: } 32\\,997 \\cdot 0{,}95^{12t}$$',
                },
                {
                    rubrik: 'Teckna funktionen',
                    varfor: 'Exponenten är antalet månader, $12t$. Kontroll: efter ett år ' +
                        '($t = 1$) är värdet $32\\,997 \\cdot 0{,}95^{12} \\approx 17\\,800$ kr, ' +
                        'ungefär en halvering, vilket är rimligt med $5\\ \\%$ i månaden.',
                    text: '$$V(t) = 32\\,997 \\cdot 0{,}95^{12t}$$',
                },
            ],
            svar: '$V(t) = 32\\,997 \\cdot 0{,}95^{12t}$',
            bedomning: [['Korrekt svar ($V = 32\\,997 \\cdot 0{,}95^{12t}$). Funktionsnamn ska anges i svaret men även andra namn än $V$ godtas', '+A']],
        },

        {
            nr: 9, del: 'B', poang: [0, 0, 1], omrade: 'Linjära ekvationssystem: oändligt många lösningar',
            genomgangar: ['ma2c-1.1'],
            endastSvar: true,
            fraga: 'I ekvationssystemet nedan är $A$ och $B$ konstanter.\n\n' +
                '$$\\begin{cases} 3y - 2Ax = 9 \\\\ 6 - 2y = 6Bx \\end{cases}$$\n\n' +
                'Bestäm sambandet mellan konstanterna $A$ och $B$ så att ekvationssystemet ' +
                'har ett oändligt antal lösningar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Tolka villkoret grafiskt',
                    varfor: 'Varje ekvation är en rät linje. Två linjer har oändligt många ' +
                        'gemensamma punkter bara om de är samma linje: samma riktningskoefficient ' +
                        'och samma $m$-värde. Skriv därför båda på formen $y = kx + m$.',
                    text: 'Systemet har oändligt många lösningar precis när de två linjerna sammanfaller.',
                },
                {
                    rubrik: 'Lös ut y ur den första ekvationen',
                    varfor: 'Addera $2Ax$ till båda led och dividera sedan med $3$.',
                    text: '$$3y = 2Ax + 9 \\quad \\Longleftrightarrow \\quad y = \\dfrac{2A}{3}x + 3$$',
                },
                {
                    rubrik: 'Lös ut y ur den andra ekvationen',
                    varfor: 'Subtrahera $6$ från båda led och dividera med $-2$. Tecknen byts ' +
                        'när man delar med ett negativt tal.',
                    text: '$$-2y = 6Bx - 6 \\quad \\Longleftrightarrow \\quad y = -3Bx + 3$$',
                },
                {
                    rubrik: 'Jämför linjerna',
                    varfor: 'Båda linjerna har $m = 3$, så de skär $y$-axeln i samma punkt. De ' +
                        'sammanfaller om riktningskoefficienterna också är lika: ' +
                        '$\\dfrac{2A}{3} = -3B$. Multiplicera med $3$ så försvinner bråket.',
                    text: '$$\\dfrac{2A}{3} = -3B \\quad \\Longleftrightarrow \\quad 2A = -9B \\quad ' +
                        '\\Longleftrightarrow \\quad A = -\\dfrac{9B}{2}$$',
                },
            ],
            svar: '$2A = -9B$, det vill säga $A = -\\dfrac{9B}{2}$ (även $\\dfrac{2A}{3} = -3B$ och andra varianter av sambandet godtas).',
            bedomning: [['Korrekt svar $\\left(\\dfrac{2A}{3} = -3B\\right)$. Varianter av det korrekta sambandet ges poäng', '+A']],
        },

        // ================= DELPROV C =================
        {
            nr: 10, del: 'C', poang: [2, 0, 0], omrade: 'Andragradsekvationer: pq-formeln',
            genomgangar: ['ma2c-2.4'],
            fraga: 'Lös ekvationen $x^2 + 10x + 16 = 0$ med algebraisk metod.',
            figur: null,
            steg: [
                {
                    rubrik: 'Identifiera p och q',
                    varfor: 'Ekvationen har redan formen $x^2 + px + q = 0$ med $1$ framför ' +
                        '$x^2$, så $pq$-formeln kan användas direkt: $p = 10$ och $q = 16$.',
                    text: '$$x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$$',
                },
                {
                    rubrik: 'Sätt in i pq-formeln',
                    varfor: 'Halva $p$ är $5$, och $5^2 = 25$. Under roten står $25 - 16 = 9$, ' +
                        'ett positivt tal, så ekvationen har två reella lösningar.',
                    text: '$$x = -5 \\pm \\sqrt{25 - 16} = -5 \\pm \\sqrt{9} = -5 \\pm 3$$',
                },
                {
                    rubrik: 'Skriv ut de två rötterna',
                    varfor: 'Plustecknet ger den ena roten och minustecknet den andra. ' +
                        'Kontroll: $(-2)^2 + 10 \\cdot (-2) + 16 = 4 - 20 + 16 = 0$ och ' +
                        '$(-8)^2 + 10 \\cdot (-8) + 16 = 64 - 80 + 16 = 0$.',
                    text: '$$x_1 = -5 + 3 = -2 \\qquad x_2 = -5 - 3 = -8$$',
                },
            ],
            svar: '$x_1 = -2$ och $x_2 = -8$',
            bedomning: [
                ['Godtagbar ansats, sätter in värden korrekt i formeln för lösning av andragradsekvationer eller motsvarande för kvadratkomplettering', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($x_1 = -8$, $x_2 = -2$)', '+E'],
            ],
        },

        {
            nr: 11, del: 'C', poang: [3, 0, 0], omrade: 'Problemlösning med ekvationssystem',
            genomgangar: ['ma2c-1.4', 'ma2c-1.2'],
            fraga: 'Kim och Sascha är på torget och köper 2,5 kg äpplen var. Kim köper gröna ' +
                'äpplen och Sascha köper röda äpplen. Kim köper även 1 kg päron. Tillsammans ' +
                'betalar de 105 kr. Kilopriset för de röda äpplena är 2 kr högre än kilopriset ' +
                'för de gröna äpplena.\n\n' +
                'Följande ekvationssystem beskriver situationen:\n\n' +
                '$$\\begin{cases} y - x = 2 \\\\ 2{,}5x + 2{,}5y + z = 105 \\\\ 105 - z = 85 \\end{cases}$$\n\n' +
                '**a)** Tolka vad $y$ står för i detta sammanhang.\n\n' +
                '**b)** Bestäm kilopriset i kronor för de röda respektive de gröna äpplena ' +
                'samt för päronen.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs den första ekvationen',
                    varfor: 'Ekvationen $y - x = 2$ säger att $y$ är $2$ mer än $x$. I texten ' +
                        'är det kilopriset för de röda äpplena som är $2$ kr högre än för de ' +
                        'gröna. Alltså är $y$ de röda äpplenas kilopris och $x$ de grönas.',
                    text: '$y$ är kilopriset i kronor för de röda äpplena (och $x$ kilopriset för ' +
                        'de gröna, $z$ priset för ett kilo päron).',
                    delsvar: { del: 'a', text: '$y$ är kilopriset för de röda äpplena.' },
                },
                {
                    del: 'b',
                    rubrik: 'Lös ut z ur den tredje ekvationen',
                    varfor: 'Den tredje ekvationen innehåller bara $z$. Addera $z$ till båda ' +
                        'led och subtrahera $85$. (Kim och Sascha betalade $85$ kr för äpplena ' +
                        'och resten för päronen.)',
                    text: '$$105 - z = 85 \\quad \\Longleftrightarrow \\quad z = 105 - 85 = 20$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös ut y ur den första ekvationen',
                    varfor: 'Addera $x$ till båda led, så uttrycks $y$ i $x$.',
                    text: '$$y = x + 2$$',
                },
                {
                    del: 'b',
                    rubrik: 'Sätt in i den andra ekvationen',
                    varfor: 'Substitutionsmetoden: byt ut $y$ mot $x + 2$ och $z$ mot $20$. ' +
                        'Då finns bara $x$ kvar. Multiplicera in $2{,}5$ i parentesen.',
                    text: '$$2{,}5x + 2{,}5(x + 2) + 20 = 105 \\quad \\Longleftrightarrow \\quad ' +
                        '2{,}5x + 2{,}5x + 5 + 20 = 105$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös ut x',
                    varfor: 'Samla $x$-termerna, subtrahera $25$ från båda led och dividera med $5$.',
                    text: '$$5x + 25 = 105 \\quad \\Longleftrightarrow \\quad 5x = 80 \\quad ' +
                        '\\Longleftrightarrow \\quad x = 16$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna y och svara med enheter',
                    varfor: '$y = x + 2 = 18$. Kontroll i den andra ekvationen: ' +
                        '$2{,}5 \\cdot 16 + 2{,}5 \\cdot 18 + 20 = 40 + 45 + 20 = 105$. Svaret ' +
                        'ska kopplas tillbaka till verkligheten: bara $x = 16$, $y = 18$, $z = 20$ ' +
                        'räcker inte för full poäng.',
                    text: '$$y = 16 + 2 = 18$$\n\n' +
                        'De röda äpplena kostar $18$ kr/kg, de gröna $16$ kr/kg och päronen $20$ kr/kg.',
                    delsvar: { del: 'b', text: 'Röda äpplen $18$ kr/kg, gröna äpplen $16$ kr/kg och päron $20$ kr/kg.' },
                },
            ],
            svar: '**a)** $y$ är kilopriset för de röda äpplena.&emsp;&emsp;**b)** Röda äpplen $18$ kr/kg, ' +
                'gröna äpplen $16$ kr/kg och päron $20$ kr/kg.',
            bedomning: [
                ['a) Godtagbar tolkning (till exempel "Kilopriset på de röda äpplena"). Även svar där prefixet kilo utelämnas ges poäng', '+E'],
                ['b) Godtagbar ansats, bestämmer värdet på en av variablerna', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar (till exempel "De röda äpplena kostar $18$ kr, de gröna äpplena $16$ kr och päronen $20$ kr."). Svaret $x = 16$, $y = 18$, $z = 20$ ges inte sista poängen, eftersom återkoppling till verkligheten saknas', '+E'],
            ],
        },

        {
            nr: 12, del: 'C', poang: [0, 2, 0], omrade: 'Räta linjen: bestäm funktionen',
            genomgangar: ['ma1c-4.5', 'ma1c-4.7'],
            fraga: 'För funktionen $f$, där $y = f(x)$, gäller att\n\n' +
                '* grafen till $f$ är en rät linje med riktningskoefficienten $4$\n' +
                '* $f(6) = 9$\n\n' +
                'Bestäm funktionen $f$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv linjens ekvation med känd lutning',
                    varfor: 'En rät linje har formen $y = kx + m$, och riktningskoefficienten ' +
                        '$k = 4$ är given. Det som återstår att bestämma är $m$.',
                    text: '$$f(x) = 4x + m$$',
                },
                {
                    rubrik: 'Använd den kända punkten',
                    varfor: '$f(6) = 9$ betyder att $x = 6$ ger funktionsvärdet $9$: punkten ' +
                        '$(6,\\ 9)$ ligger på linjen. Sätt in $x = 6$ och $f(x) = 9$.',
                    text: '$$9 = 4 \\cdot 6 + m$$',
                },
                {
                    rubrik: 'Lös ut m',
                    varfor: '$4 \\cdot 6 = 24$. Subtrahera $24$ från båda led.',
                    text: '$$9 = 24 + m \\quad \\Longleftrightarrow \\quad m = 9 - 24 = -15$$',
                },
                {
                    rubrik: 'Skriv funktionen',
                    varfor: 'Kontroll: $f(6) = 4 \\cdot 6 - 15 = 24 - 15 = 9$. Stämmer.',
                    text: '$$f(x) = 4x - 15$$',
                },
            ],
            svar: '$f(x) = 4x - 15$',
            bedomning: [
                ['Godtagbar ansats, till exempel ställer upp ekvationen $9 = 4 \\cdot 6 + m$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($f(x) = 4x - 15$). Även svaret $y = 4x - 15$ ges poäng', '+C'],
            ],
        },

        {
            nr: 13, del: 'C', poang: [0, 2, 0], omrade: 'Algebra: minsta värde av ett uttryck',
            genomgangar: ['ma2c-2.1', 'ma2c-3.1'],
            fraga: 'Vilket är det minsta värde som uttrycket $2(x + 1)^2 - x(x + 4)$ kan anta ' +
                'om $x$ är ett reellt tal? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Utveckla kvadraten',
                    varfor: 'Första kvadreringsregeln, $(a + b)^2 = a^2 + 2ab + b^2$, med $a = x$ ' +
                        'och $b = 1$. Sedan multipliceras $2$ in i varje term.',
                    text: '$$2(x + 1)^2 = 2\\left(x^2 + 2x + 1\\right) = 2x^2 + 4x + 2$$',
                },
                {
                    rubrik: 'Multiplicera in x i den andra parentesen',
                    varfor: '$x$ gånger varje term: $x \\cdot x = x^2$ och $x \\cdot 4 = 4x$. ' +
                        'Minustecknet framför gäller hela produkten.',
                    text: '$$x(x + 4) = x^2 + 4x$$',
                },
                {
                    rubrik: 'Förenkla hela uttrycket',
                    varfor: 'Samla lika termer: $2x^2 - x^2 = x^2$, och $4x - 4x$ tar ut varandra.',
                    text: '$$2x^2 + 4x + 2 - x^2 - 4x = x^2 + 2$$',
                },
                {
                    rubrik: 'Motivera det minsta värdet',
                    varfor: 'En kvadrat är aldrig negativ: $x^2 \\geq 0$ för alla reella $x$, med ' +
                        'likhet bara för $x = 0$. Därför är $x^2 + 2 \\geq 2$, och värdet $2$ ' +
                        'antas när $x = 0$. Grafiskt: $y = x^2 + 2$ är en parabel med ' +
                        'minimipunkten $(0,\\ 2)$.',
                    text: '$$x^2 + 2 \\geq 0 + 2 = 2, \\quad \\text{med likhet för } x = 0$$\n\n' +
                        'Det minsta värdet är $2$.',
                },
            ],
            svar: 'Det minsta värdet är $2$ (uttrycket är lika med $x^2 + 2$, och $x^2 \\geq 0$).',
            bedomning: [
                ['Godtagbar ansats, till exempel förenklar uttrycket till $x^2 + 2$', '+C'],
                ['med godtagbart välgrundat resonemang som motiverar varför uttryckets minsta värde är $2$', '+C'],
            ],
        },

        {
            nr: 14, del: 'C', poang: [0, 3, 0], omrade: 'Parallella linjer: bestäm ekvationen',
            genomgangar: ['ma1c-4.6', 'ma1c-4.5'],
            fraga: 'En rät linje $L_1$ går genom punkterna $(1,\\ -6a)$ och $(5,\\ 2a)$ och är ' +
                'parallell med den räta linjen $L_2$ som har ekvationen ' +
                '$y = \\dfrac{4}{3}x + 3$\n\n' +
                'Bestäm ekvationen för $L_1$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Använd att linjerna är parallella',
                    varfor: 'Parallella linjer har samma lutning. $L_2$ har riktningskoefficienten ' +
                        '$\\dfrac{4}{3}$, så det har $L_1$ också.',
                    text: '$$k_1 = k_2 = \\dfrac{4}{3}$$',
                },
                {
                    rubrik: 'Teckna lutningen med de två punkterna',
                    varfor: 'Riktningskoefficienten är $\\dfrac{\\Delta y}{\\Delta x}$ mellan två ' +
                        'punkter på linjen: $\\dfrac{2a - (-6a)}{5 - 1} = \\dfrac{8a}{4} = 2a$.',
                    text: '$$k_1 = \\dfrac{2a - (-6a)}{5 - 1} = \\dfrac{8a}{4} = 2a$$',
                },
                {
                    rubrik: 'Bestäm a',
                    varfor: 'De två uttrycken för lutningen måste vara lika. Dividera med $2$.',
                    text: '$$2a = \\dfrac{4}{3} \\quad \\Longleftrightarrow \\quad a = \\dfrac{2}{3}$$',
                },
                {
                    rubrik: 'Räkna ut punkternas koordinater',
                    varfor: 'Med $a = \\dfrac{2}{3}$ blir $-6a = -4$ och $2a = \\dfrac{4}{3}$. ' +
                        'Punkten $(1,\\ -4)$ är enklast att räkna med.',
                    text: '$$(1,\\ -6a) = (1,\\ -4) \\qquad (5,\\ 2a) = \\left(5,\\ \\dfrac{4}{3}\\right)$$',
                },
                {
                    rubrik: 'Bestäm m och skriv ekvationen',
                    varfor: 'Sätt in $(1,\\ -4)$ i $y = \\dfrac{4}{3}x + m$ och lös ut $m$. ' +
                        'Kontroll med den andra punkten: $\\dfrac{4}{3} \\cdot 5 - \\dfrac{16}{3} = ' +
                        '\\dfrac{20 - 16}{3} = \\dfrac{4}{3}$. Stämmer.',
                    text: '$$-4 = \\dfrac{4}{3} \\cdot 1 + m \\quad \\Longleftrightarrow \\quad ' +
                        'm = -4 - \\dfrac{4}{3} = -\\dfrac{16}{3}$$\n\n' +
                        '$$L_1:\\ y = \\dfrac{4}{3}x - \\dfrac{16}{3}$$',
                },
            ],
            svar: '$y = \\dfrac{4}{3}x - \\dfrac{16}{3}$',
            bedomning: [
                ['Godtagbar ansats, till exempel bestämmer värdet på $a$, $a = \\dfrac{2}{3}$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar $\\left(y = \\dfrac{4}{3}x - \\dfrac{16}{3}\\right)$', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 15, del: 'C', poang: [0, 0, 3], omrade: 'Andragradsekvationer: antal reella rötter',
            genomgangar: ['ma2c-2.6', 'ma2c-2.4', 'ma2c-3.4'],
            fraga: 'Bestäm för vilka värden på $c$ som andragradsekvationen\n\n' +
                '$$x^2 + cx + 3 = c$$\n\n' +
                'saknar reella rötter.',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv ekvationen på formen x² + px + q = 0',
                    varfor: 'Subtrahera $c$ från båda led. Då är $p = c$ och $q = 3 - c$.',
                    text: '$$x^2 + cx + (3 - c) = 0$$',
                },
                {
                    rubrik: 'Ställ upp uttrycket under rottecknet',
                    varfor: '$pq$-formeln ger $x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$. ' +
                        'Ekvationen saknar reella rötter precis när uttrycket under roten är negativt: ' +
                        'då finns inget reellt tal att dra roten ur.',
                    text: '$$\\left(\\dfrac{c}{2}\\right)^2 - (3 - c) < 0$$',
                },
                {
                    rubrik: 'Förenkla olikheten',
                    varfor: '$\\left(\\dfrac{c}{2}\\right)^2 = \\dfrac{c^2}{4}$. Multiplicera båda led ' +
                        'med $4$ (positivt, så olikheten behåller riktningen).',
                    text: '$$\\dfrac{c^2}{4} - 3 + c < 0 \\quad \\Longleftrightarrow \\quad c^2 + 4c - 12 < 0$$',
                },
                {
                    rubrik: 'Bestäm nollställena till c² + 4c − 12',
                    varfor: 'För att veta var uttrycket är negativt behövs först var det är noll. ' +
                        '$pq$-formeln med $p = 4$ och $q = -12$.',
                    text: '$$c = -2 \\pm \\sqrt{4 + 12} = -2 \\pm 4 \\quad \\Longrightarrow \\quad ' +
                        'c_1 = -6, \\quad c_2 = 2$$',
                },
                {
                    rubrik: 'Avgör tecknet mellan nollställena',
                    varfor: '$y = c^2 + 4c - 12$ är en parabel som öppnar sig uppåt (positiv ' +
                        '$c^2$-term), så den ligger under $c$-axeln mellan sina nollställen. ' +
                        'Kontroll: $c = 0$ ger $-12 < 0$, och $x^2 + 3 = 0$ saknar mycket riktigt ' +
                        'reella rötter. Gränsvärdena ger dubbelrot och ingår inte.',
                    text: '$$c^2 + 4c - 12 < 0 \\quad \\Longleftrightarrow \\quad -6 < c < 2$$',
                },
            ],
            svar: 'Ekvationen saknar reella rötter när $-6 < c < 2$.',
            bedomning: [
                ['Godtagbar ansats, kommer fram till korrekt uttryck under rottecknet och visar insikt i att $\\left(\\dfrac{c}{2}\\right)^2 - (3 - c)$ ska vara mindre än noll', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($-6 < c < 2$)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },

        {
            nr: 16, del: 'C', poang: [0, 0, 3], omrade: 'Logaritmer: antal skärningspunkter genom undersökning',
            genomgangar: ['ma2c-5.2', 'ma2c-3.5'],
            fraga: 'Funktionerna $f$ och $g$ ges av $f(x) = (\\lg x)^8$ och $g(x) = x$.\n\n' +
                'Utred, genom att undersöka funktionsvärden för $f$ och $g$, hur många gånger ' +
                'funktionernas grafer skär varandra då $x \\leq 100$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Uteslut x ≤ 0',
                    varfor: 'Logaritmen är bara definierad för positiva tal: $\\lg x$ finns inte ' +
                        'när $x \\leq 0$. Grafen till $f$ finns alltså bara till höger om ' +
                        '$y$-axeln, och det är bara där de kan skära varandra.',
                    text: '$$f(x) = (\\lg x)^8 \\text{ är definierad endast för } x > 0$$',
                },
                {
                    rubrik: 'Räkna ut funktionsvärden för 0 < x ≤ 100',
                    varfor: 'Graferna skär varandra där $f(x) = g(x)$. Där $f$ går från att vara ' +
                        'större än $g$ till att vara mindre (eller tvärtom) måste kurvorna ha ' +
                        'korsat varandra. Jämför därför $f$ och $g$ i några punkter.',
                    text: '| $x$ | $f(x) = (\\lg x)^8$ | $g(x) = x$ | jämförelse |\n| :---: | :---: | :---: | :---: |\n' +
                        '| $0{,}1$ | $(-1)^8 = 1$ | $0{,}1$ | $f > g$ |\n' +
                        '| $0{,}5$ | $(-0{,}301\\ldots)^8 \\approx 0{,}0001$ | $0{,}5$ | $f < g$ |\n' +
                        '| $1$ | $0^8 = 0$ | $1$ | $f < g$ |\n' +
                        '| $10$ | $1^8 = 1$ | $10$ | $f < g$ |\n' +
                        '| $100$ | $2^8 = 256$ | $100$ | $f > g$ |',
                    figur: 'u16-s1',
                },
                {
                    rubrik: 'Hitta den första skärningen',
                    varfor: 'Vid $x = 0{,}1$ ligger $f$ över $g$, vid $x = 0{,}5$ under. Båda ' +
                        'funktionerna är kontinuerliga, så någonstans mellan $0{,}1$ och $0{,}5$ ' +
                        'korsar graferna varandra. Skärningen ligger nära $x \\approx 0{,}16$, där ' +
                        '$(\\lg 0{,}16)^8 \\approx 0{,}16$.',
                    text: '$$f(0{,}1) > g(0{,}1) \\quad \\text{och} \\quad f(0{,}5) < g(0{,}5) ' +
                        '\\quad \\Longrightarrow \\quad \\text{en skärning mellan } 0{,}1 \\text{ och } 0{,}5$$',
                },
                {
                    rubrik: 'Hitta den andra skärningen',
                    varfor: 'Vid $x = 10$ ligger $f$ under $g$, vid $x = 100$ över: en skärning ' +
                        'till, mellan $10$ och $100$ (nära $x \\approx 37{,}6$). Mellan $0{,}5$ ' +
                        'och $10$ är $f$ hela tiden mindre än $g$, eftersom $|\\lg x| \\leq 1$ ' +
                        'ger $f(x) \\leq 1$ medan $g(x) = x$ är större än $f$ där.',
                    text: '$$f(10) < g(10) \\quad \\text{och} \\quad f(100) > g(100) ' +
                        '\\quad \\Longrightarrow \\quad \\text{en skärning mellan } 10 \\text{ och } 100$$',
                    figur: 'u16-s2',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    varfor: 'Graferna skär varandra två gånger då $x \\leq 100$: en gång strax ' +
                        'ovanför $x = 0{,}1$ och en gång mellan $10$ och $100$. För $x \\leq 0$ ' +
                        'finns $f$ inte alls.',
                    text: 'Graferna skär varandra **två gånger** för $x \\leq 100$.',
                },
            ],
            svar: 'Två gånger (en skärning mellan $x = 0{,}1$ och $x = 0{,}5$, en mellan $x = 10$ och $x = 100$; för $x \\leq 0$ är $f$ inte definierad).',
            bedomning: [
                ['Godtagbar uteslutning av värdena $x \\leq 0$ där det visas insikt om att $(\\lg x)^8$ inte är definierad för dessa värden', '+A'],
                ['Godtagbart välgrundat och nyanserat resonemang där det visas att funktionernas grafer skär varandra en gång', '+A'],
                ['med fortsatt välgrundat och nyanserat resonemang där det visas att funktionernas grafer skär varandra ytterligare en gång', '+A'],
            ],
        },

        // ================= DELPROV D =================
        {
            nr: 17, del: 'D', poang: [2, 0, 0], omrade: 'Likformiga trianglar',
            genomgangar: ['ma2c-4.8'],
            fraga: 'Genom att placera en spegel horisontellt på marken mellan ett träd och en ' +
                'person går det att beräkna höjden av trädet.\n\n' +
                'För att göra en sådan beräkning ställer sig en person så att den kan se trädets ' +
                'topp i spegeln. Därefter mäts de sträckor som behövs för att kunna beräkna ' +
                'trädets höjd.\n\n' +
                'Figuren visar de uppmätta sträckorna samt övriga linjer och vinklar som behövs ' +
                'för att två likformiga trianglar ska bildas.\n\n' +
                'Beräkna trädets höjd $x$.',
            figur: 'u17',
            steg: [
                {
                    rubrik: 'Se de två likformiga trianglarna',
                    varfor: 'Personen, marken och siktlinjen bildar en liten rätvinklig triangel, ' +
                        'och trädet, marken och siktlinjen en stor. Båda har en rät vinkel mot ' +
                        'marken och vinkeln $v$ vid spegeln, så de är likformiga: samma form, ' +
                        'olika storlek.',
                    text: 'Den lilla triangeln (höjd $1{,}70$, bas $2{,}10$) är likformig med den ' +
                        'stora (höjd $x$, bas $13{,}2$).',
                    figur: 'u17-s1',
                },
                {
                    rubrik: 'Ställ upp förhållandet mellan motsvarande sidor',
                    varfor: 'I likformiga trianglar är kvoten mellan motsvarande sidor lika. ' +
                        'Höjd genom bas i den stora triangeln är lika med höjd genom bas i den lilla.',
                    text: '$$\\dfrac{x}{13{,}2} = \\dfrac{1{,}70}{2{,}10}$$',
                },
                {
                    rubrik: 'Lös ut x',
                    varfor: 'Multiplicera båda led med $13{,}2$. Räkna med det digitala verktyget ' +
                        'och avrunda först i svaret: mätvärdena har tre värdesiffror, så svaret ' +
                        'ges med tre.',
                    text: '$$x = \\dfrac{1{,}70 \\cdot 13{,}2}{2{,}10} = 10{,}685\\ldots \\approx 10{,}7$$\n\n' +
                        'Trädet är cirka $10{,}7$ m högt. Rimligt: trädet står drygt sex gånger så långt ' +
                        'från spegeln som personen och är drygt sex gånger så högt.',
                },
            ],
            svar: 'Trädets höjd är cirka $10{,}7$ m.',
            bedomning: [
                ['Godtagbar ansats, till exempel ställer upp ett korrekt samband med hjälp av likformighet', '+E'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($10{,}7$ m). Även svar utan enhet ges poäng', '+E'],
            ],
        },

        {
            nr: 18, del: 'D', poang: [2, 0, 0], omrade: 'Normalfördelning: andel över μ + 2σ',
            genomgangar: ['ma2c-6.5'],
            fraga: 'Vid ett provtillfälle skrev 76 483 personer Högskoleprovet. Deras resultat ' +
                'antas vara normalfördelat med medelvärdet $0{,}90$ och standardavvikelsen ' +
                '$0{,}40$\n\n' +
                'Bestäm hur många av dessa personer som enligt normalfördelningen hade ' +
                'resultatet $1{,}70$ eller högre.',
            figur: null,
            steg: [
                {
                    rubrik: 'Uttryck 1,70 i standardavvikelser från medelvärdet',
                    varfor: 'Normalfördelningens andelar räknas i standardavvikelser. Från ' +
                        'medelvärdet $0{,}90$ till $1{,}70$ är det $0{,}80$, och det är två ' +
                        'standardavvikelser: $2 \\cdot 0{,}40 = 0{,}80$.',
                    text: '$$1{,}70 = 0{,}90 + 2 \\cdot 0{,}40 = \\mu + 2\\sigma$$',
                    figur: 'u18-s1',
                },
                {
                    rubrik: 'Bestäm andelen ovanför μ + 2σ',
                    varfor: 'Inom två standardavvikelser från medelvärdet ligger $95{,}4\\ \\%$ av ' +
                        'värdena. Resten, $4{,}6\\ \\%$, delas lika mellan de två svansarna eftersom ' +
                        'fördelningen är symmetrisk: $2{,}3\\ \\%$ ligger ovanför $\\mu + 2\\sigma$.',
                    text: '$$\\dfrac{100\\ \\% - 95{,}4\\ \\%}{2} = 2{,}3\\ \\%$$',
                },
                {
                    rubrik: 'Räkna om andelen till antal personer',
                    varfor: '$2{,}3\\ \\%$ av alla $76\\,483$ personer. Antalet personer är ett ' +
                        'heltal, och eftersom procentsatsen är avrundad är svaret ungefärligt: ' +
                        'cirka $1\\,760$ personer.',
                    text: '$$0{,}023 \\cdot 76\\,483 = 1759{,}1\\ldots \\approx 1759$$\n\n' +
                        'Ungefär $1\\,760$ personer hade resultatet $1{,}70$ eller högre.',
                },
            ],
            svar: 'Cirka $1\\,760$ personer ($0{,}023 \\cdot 76\\,483 \\approx 1759$).',
            bedomning: [
                ['Godtagbar ansats, till exempel inser att $1{,}70 = \\mu + 2\\sigma$', '+E'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($1759$)', '+E'],
            ],
        },

        {
            nr: 19, del: 'D', poang: [2, 0, 0], omrade: 'Räta linjen: parallellförflyttning',
            genomgangar: ['ma1c-4.5', 'ma1c-4.6'],
            fraga: 'I koordinatsystemet är den räta linjen $y = 3x - 1$ ritad.\n\n' +
                'Alla punkter på linjen flyttas två längdenheter i positiv $x$-led och tre ' +
                'längdenheter i negativ $y$-led. De flyttade punkterna bildar en ny rät linje.\n\n' +
                'Bestäm den nya linjens ekvation på formen $y = kx + m$.',
            figur: 'u19',
            steg: [
                {
                    rubrik: 'Flytta en punkt på linjen',
                    varfor: 'Enklast är att välja punkten där linjen skär $y$-axeln, $(0,\\ -1)$. ' +
                        'Två steg åt höger och tre steg ned ger $(0 + 2,\\ -1 - 3) = (2,\\ -4)$, ' +
                        'som ligger på den nya linjen.',
                    text: '$$(0,\\ -1) \\longrightarrow (2,\\ -4)$$',
                    figur: 'u19-s1',
                },
                {
                    rubrik: 'Behåll riktningskoefficienten',
                    varfor: 'Alla punkter flyttas lika mycket, så linjen blir bara förskjuten: den ' +
                        'nya linjen är parallell med den gamla och har samma lutning, $k = 3$.',
                    text: '$$y = 3x + m$$',
                },
                {
                    rubrik: 'Bestäm m med den flyttade punkten',
                    varfor: 'Sätt in $(2,\\ -4)$ i $y = 3x + m$ och lös ut $m$. Kontroll med en ' +
                        'annan punkt: $(1,\\ 2)$ på den gamla linjen flyttas till $(3,\\ -1)$, ' +
                        'och $3 \\cdot 3 - 10 = -1$. Stämmer.',
                    text: '$$-4 = 3 \\cdot 2 + m \\quad \\Longleftrightarrow \\quad m = -10$$\n\n' +
                        '$$y = 3x - 10$$',
                    figur: 'u19-s2',
                },
            ],
            svar: '$y = 3x - 10$',
            bedomning: [
                ['Godtagbar ansats, till exempel bestämmer en punkt på den nya linjen', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($y = 3x - 10$)', '+E'],
            ],
        },

        {
            nr: 20, del: 'D', poang: [2, 0, 0], omrade: 'Koordinatgeometri: rätvinklig triangel med Pythagoras sats',
            genomgangar: ['ma2c-4.6', 'ma2c-4.5'],
            fraga: 'I ett koordinatsystem utgör de tre punkterna $(2,\\ 4)$, $(10,\\ 0)$ och ' +
                '$(0,\\ 0)$ hörnen i en triangel. Är triangeln rätvinklig? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm hur frågan kan avgöras',
                    varfor: 'En triangel är rätvinklig precis när Pythagoras sats gäller för dess ' +
                        'sidor: den längsta sidans kvadrat är summan av de andra två kvadraterna. ' +
                        'Räkna därför ut sidornas kvadrater med avståndsformeln.',
                    text: 'Kalla punkterna $O(0,\\ 0)$, $P(2,\\ 4)$ och $Q(10,\\ 0)$. Triangeln är ' +
                        'rätvinklig om $a^2 + b^2 = c^2$ för sidorna.',
                    figur: 'u20',
                },
                {
                    rubrik: 'Beräkna sidornas kvadrater',
                    varfor: 'Avståndsformeln: $d^2 = (\\Delta x)^2 + (\\Delta y)^2$. Kvadraterna ' +
                        'räcker, rötterna behöver aldrig dras.',
                    text: '$$OP^2 = 2^2 + 4^2 = 20 \\qquad PQ^2 = (10 - 2)^2 + (0 - 4)^2 = 64 + 16 = 80 ' +
                        '\\qquad OQ^2 = 10^2 = 100$$',
                    figur: 'u20-s1',
                },
                {
                    rubrik: 'Pröva Pythagoras sats',
                    varfor: 'Den längsta sidan är $OQ$. Summan av de två kortare sidornas kvadrater ' +
                        'är $20 + 80 = 100$, exakt lika med $OQ^2$. Satsen gäller, så vinkeln ' +
                        'mitt emot $OQ$, alltså vid $P$, är rät.',
                    text: '$$OP^2 + PQ^2 = 20 + 80 = 100 = OQ^2$$\n\n' +
                        'Ja, triangeln är rätvinklig med den räta vinkeln vid $(2,\\ 4)$.',
                    figur: 'u20-s2',
                },
            ],
            svar: 'Ja. $OP^2 + PQ^2 = 20 + 80 = 100 = OQ^2$, så Pythagoras sats gäller och vinkeln vid $(2,\\ 4)$ är rät.',
            bedomning: [
                ['Godtagbart enkelt resonemang, till exempel visar insikt om att Pythagoras sats måste gälla om triangeln är rätvinklig', '+E'],
                ['med fortsatt enkelt resonemang som innefattar slutsatsen att triangeln är rätvinklig', '+E'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [1, 1, 0], omrade: 'Andragradsfunktioner: resonemang om grafen',
            genomgangar: ['ma2c-3.1', 'ma2c-3.2'],
            fraga: 'För en andragradsfunktion $f$, där $y = f(x)$, gäller att\n\n' +
                '* $x^2$-termen är negativ\n' +
                '* funktionens graf har symmetrilinjen $x = 5$\n\n' +
                '**a)** En av figurerna A–F visar grafens utseende omkring den punkt $P$ på ' +
                'kurvan där $x = 3$. Vilken? Motivera ditt svar.\n\n' +
                '**b)** Går det att avgöra hur många skärningspunkter grafen till funktionen $f$ ' +
                'har med $x$-axeln? Motivera ditt svar.',
            figur: 'u21',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Bestäm parabelns form',
                    varfor: 'En negativ $x^2$-term ger en parabel som öppnar sig nedåt, med en ' +
                        'maximipunkt på symmetrilinjen $x = 5$. Kurvan är alltså "ledsen": den ' +
                        'stiger fram till $x = 5$ och faller sedan.',
                    text: 'Grafen har en maximipunkt vid $x = 5$.',
                    figur: 'u21-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Se hur kurvan ser ut vid x = 3',
                    varfor: 'Punkten $P$ ligger vid $x = 3$, till vänster om maximipunkten. Där ' +
                        'är kurvan på väg upp mot toppen, och den böjer av nedåt (den är ' +
                        'konkav). Bara figur E visar en stigande kurva som böjer på det sättet: ' +
                        'B stiger också, men böjer åt fel håll, som en parabel som öppnar sig uppåt.',
                    text: 'Figur **E**: kurvan stiger vid $P$ och böjer nedåt, eftersom $3 < 5$ och ' +
                        'parabeln öppnar sig nedåt.',
                    delsvar: { del: 'a', text: 'Figur E' },
                },
                {
                    del: 'b',
                    rubrik: 'Fundera på vad som saknas',
                    varfor: 'Antalet skärningspunkter med $x$-axeln beror på var maximipunkten ' +
                        'ligger i höjdled, alltså på dess $y$-koordinat. Den vet vi inget om: ' +
                        'villkoren säger bara hur parabeln öppnar sig och var symmetrilinjen går.',
                    text: 'Maximipunktens $y$-koordinat är okänd.',
                    figur: 'u21-s2',
                },
                {
                    del: 'b',
                    rubrik: 'Visa att alla tre fallen är möjliga',
                    varfor: 'Ligger maximipunkten ovanför $x$-axeln skär grafen axeln två gånger, ' +
                        'ligger den på axeln en gång, och ligger den under axeln inte alls. ' +
                        'Till exempel $f(x) = -(x - 5)^2 + 1$, $f(x) = -(x - 5)^2$ och ' +
                        '$f(x) = -(x - 5)^2 - 1$ uppfyller alla villkoren.',
                    text: 'Nej, det går inte att avgöra. Grafen kan ha två, en eller ingen ' +
                        'skärningspunkt med $x$-axeln beroende på maximipunktens $y$-koordinat.',
                    delsvar: { del: 'b', text: 'Nej. Utan maximipunktens $y$-koordinat kan grafen ha två, en eller ingen skärningspunkt med $x$-axeln.' },
                },
            ],
            svar: '**a)** Figur E, eftersom kurvan stiger vid $x = 3 < 5$ och parabeln öppnar sig nedåt.&emsp;&emsp;' +
                '**b)** Nej. Vi vet inte maximipunktens $y$-koordinat, så grafen kan ha två, en eller ingen skärningspunkt med $x$-axeln.',
            bedomning: [
                ['a) Godtagbart enkelt resonemang med korrekt svar (till exempel "E för att kurvan är ledsen och 3 är före 5")', '+E'],
                ['b) Godtagbart välgrundat resonemang med korrekt svar (till exempel "Nej, eftersom vi inte vet $y$-koordinaten för extrempunkten så kan man inte veta om grafen skär $x$-axeln.")', '+C'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [0, 2, 0], omrade: 'Skärning mellan parabel och linje: nollproduktmetoden',
            genomgangar: ['ma2c-2.3', 'ma2c-2.2', 'ma2c-3.4'],
            fraga: 'Bestäm $x$-koordinaterna för eventuella skärningspunkter mellan kurvorna ' +
                '$y = -4x(x - 2)$ och $y = x - 2$',
            figur: null,
            steg: [
                {
                    rubrik: 'Sätt högerleden lika',
                    varfor: 'I en skärningspunkt har kurvorna samma $y$-värde för samma $x$. ' +
                        'De två uttrycken för $y$ ska alltså vara lika.',
                    text: '$$-4x(x - 2) = x - 2$$',
                },
                {
                    rubrik: 'Samla allt i ett led och bryt ut den gemensamma faktorn',
                    varfor: 'Utveckla inte! Faktorn $(x - 2)$ finns i båda led. Subtrahera ' +
                        '$(x - 2)$ från båda led och bryt ut den, så blir det en produkt som är ' +
                        'noll. (Att dividera med $x - 2$ vore fel: då försvinner lösningen $x = 2$.)',
                    text: '$$-4x(x - 2) - (x - 2) = 0 \\quad \\Longleftrightarrow \\quad (x - 2)(-4x - 1) = 0$$',
                },
                {
                    rubrik: 'Använd nollproduktmetoden',
                    varfor: 'En produkt är noll precis när någon av faktorerna är noll. Sätt var ' +
                        'och en lika med noll.',
                    text: '$$x - 2 = 0 \\quad \\Longleftrightarrow \\quad x_1 = 2$$\n\n' +
                        '$$-4x - 1 = 0 \\quad \\Longleftrightarrow \\quad x_2 = -\\dfrac{1}{4} = -0{,}25$$',
                },
                {
                    rubrik: 'Kontrollera',
                    varfor: '$x = 2$ ger $y = 0$ i båda kurvorna. $x = -0{,}25$ ger ' +
                        '$-4 \\cdot (-0{,}25) \\cdot (-2{,}25) = -2{,}25$ och $-0{,}25 - 2 = -2{,}25$. ' +
                        'Samma metod i ett digitalt verktyg: rita kurvorna och läs av skärningarna.',
                    text: 'Skärningspunkterna har $x$-koordinaterna $x_1 = 2$ och $x_2 = -0{,}25$.',
                },
            ],
            svar: '$x_1 = 2$ och $x_2 = -0{,}25$',
            bedomning: [
                ['Godtagbar ansats, till exempel sätter in värden korrekt i formeln för lösning av andragradsekvationer eller motsvarande för kvadratkomplettering', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($x_1 = -0{,}25$, $x_2 = 2$)', '+C'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [0, 3, 0], omrade: 'Exponentialekvationer: procentuell minskning',
            genomgangar: ['ma2c-5.5', 'ma2c-5.3', 'ma1c-3.2'],
            fraga: 'Ett av Sveriges miljömål är att minska koldioxidutsläppet med 40 % från år ' +
                '1990 till år 2020. År 1990 var koldioxidutsläppet $7{,}29 \\cdot 10^7$ ton. År 2014 ' +
                'hade utsläppet minskat till $5{,}44 \\cdot 10^7$ ton.\n\n' +
                'Anta att den årliga procentuella minskningen är 2,0 % från och med år 2014. ' +
                'Bestäm hur många år det kommer att ta, räknat från år 2014, innan ' +
                'koldioxidutsläppet är 40 % lägre än år 1990.',
            figur: null,
            steg: [
                {
                    rubrik: 'Beräkna målnivån',
                    varfor: '$40\\ \\%$ lägre än utsläppet år $1990$ betyder att $60\\ \\%$ återstår: ' +
                        'förändringsfaktorn är $0{,}60$.',
                    text: '$$0{,}60 \\cdot 7{,}29 \\cdot 10^7 = 4{,}374 \\cdot 10^7 \\text{ ton}$$',
                },
                {
                    rubrik: 'Ställ upp en ekvation för tiden',
                    varfor: 'Låt $x$ vara antalet år efter $2014$. En minskning med $2{,}0\\ \\%$ ' +
                        'per år ger förändringsfaktorn $0{,}98$, som används $x$ gånger på ' +
                        'utsläppet år $2014$.',
                    text: '$$5{,}44 \\cdot 10^7 \\cdot 0{,}98^x = 4{,}374 \\cdot 10^7$$',
                },
                {
                    rubrik: 'Lös ut potensen',
                    varfor: 'Dividera båda led med $5{,}44 \\cdot 10^7$. Behåll det oavrundade ' +
                        'värdet i räknaren.',
                    text: '$$0{,}98^x = \\dfrac{4{,}374 \\cdot 10^7}{5{,}44 \\cdot 10^7} = \\dfrac{4{,}374}{5{,}44} = 0{,}80404\\ldots$$',
                },
                {
                    rubrik: 'Logaritmera och lös ut x',
                    varfor: 'Det obekanta står i exponenten. Logaritmlagen $\\lg a^x = x \\cdot \\lg a$ ' +
                        'ger en förstagradsekvation i $x$. Dividera med $\\lg 0{,}98$ (ett ' +
                        'negativt tal, liksom täljaren, så kvoten blir positiv).',
                    text: '$$\\lg 0{,}98^x = \\lg 0{,}80404\\ldots \\quad \\Longleftrightarrow \\quad ' +
                        'x \\cdot \\lg 0{,}98 = \\lg 0{,}80404\\ldots \\quad \\Longleftrightarrow \\quad ' +
                        'x = \\dfrac{\\lg 0{,}80404\\ldots}{\\lg 0{,}98} = 10{,}79\\ldots \\approx 10{,}8$$',
                },
                {
                    rubrik: 'Tolka svaret',
                    varfor: 'Det tar knappt $11$ år räknat från $2014$, alltså till en bit in på år ' +
                        '$2025$. Miljömålet till år $2020$ nås inte med den takten. Rimligt: ' +
                        '$0{,}98^{11} \\approx 0{,}80$ och $5{,}44 \\cdot 0{,}80 \\approx 4{,}35$.',
                    text: 'Det tar cirka $10{,}8$ år, det vill säga knappt $11$ år räknat från år $2014$.',
                },
            ],
            svar: 'Cirka $10{,}8$ år (knappt $11$ år) räknat från år $2014$.',
            bedomning: [
                ['Godtagbar ansats, till exempel ställer upp ekvationen $0{,}60 \\cdot 7{,}29 \\cdot 10^7 = 5{,}44 \\cdot 10^7 \\cdot 0{,}98^x$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($10{,}8$)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [0, 2, 1], omrade: 'Linjär regression och modellens begränsning',
            genomgangar: ['ma2c-6.6', 'ma1c-5.3'],
            fraga: 'I mitten på 1800-talet var Stockholm en av Europas smutsigaste städer. ' +
                'Bristen på rent vatten var en av anledningarna till att många i Stockholm dog ' +
                'av kolera och andra sjukdomar. Då tillgången till rent vattenledningsvatten ' +
                'förbättrades kunde fler människor dricka rent vatten och även använda rent ' +
                'vatten till matlagning och hygien.\n\n' +
                'Tabellen och diagrammet visar förbrukningen av antal liter vattenledningsvatten ' +
                'per person och dygn (liter/person/dygn) respektive dödstalen i promille (‰) ' +
                'under åren 1853 till 1903 i Stockholm.\n\n' +
                '| År | Förbrukning av vattenledningsvatten (liter/person/dygn) | Dödstal (‰) |\n| :---: | :---: | :---: |\n' +
                '| 1853 | 8,0 | 45 |\n| 1858 | 10 | 38 |\n| 1863 | 10 | 34 |\n| 1868 | 30 | 31 |\n' +
                '| 1873 | 43 | 35 |\n| 1878 | 50 | 26 |\n| 1883 | 67 | 24 |\n| 1888 | 84 | 21 |\n' +
                '| 1893 | 88 | 20 |\n| 1898 | 100 | 18 |\n| 1903 | 100 | 16 |\n\n' +
                '**a)** Bestäm ett linjärt samband mellan dödstalen i promille (‰), $y$, och ' +
                'förbrukningen av antal liter vattenledningsvatten per person och dygn, $x$.\n\n' +
                '**b)** Det linjära sambandet ger en modell över hur dödstalen beror av ' +
                'förbrukningen av vattenledningsvatten. Har modellen någon begränsning? Bortse ' +
                'från andra orsaker som kan påverka dödstalen. Motivera ditt svar.',
            figur: 'u24',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Mata in värdeparen i det digitala verktyget',
                    varfor: 'Ett linjärt samband som passar alla punkter så bra som möjligt bestäms ' +
                        'med linjär regression. Lägg förbrukningen som $x$ och dödstalet som $y$ ' +
                        '(i GeoGebra: kalkylbladet eller kommandot `RegressionLinjär`, på räknaren: ' +
                        'LinReg). Att bara dra en linje genom två av punkterna räcker inte.',
                    text: 'Elva punkter: $(8;\\ 45)$, $(10;\\ 38)$, $(10;\\ 34)$, $(30;\\ 31)$, $(43;\\ 35)$, ' +
                        '$(50;\\ 26)$, $(67;\\ 24)$, $(84;\\ 21)$, $(88;\\ 20)$, $(100;\\ 18)$ och $(100;\\ 16)$.',
                },
                {
                    del: 'a',
                    rubrik: 'Läs av regressionslinjen',
                    varfor: 'Verktyget ger $k \\approx -0{,}241$ och $m \\approx 40{,}9$. ' +
                        'Riktningskoefficienten är negativ: dödstalet sjunker med cirka $0{,}24$ ' +
                        'promilleenheter för varje extra liter vatten per person och dygn. ' +
                        'Kontroll: linjen går genom medelpunkten $(53{,}6;\\ 28)$, och ' +
                        '$-0{,}24 \\cdot 53{,}6 + 41 \\approx 28$.',
                    text: '$$y = -0{,}24x + 41$$',
                    figur: 'u24-s1',
                    delsvar: { del: 'a', text: '$y = -0{,}24x + 41$ (avrundat)' },
                },
                {
                    del: 'b',
                    rubrik: 'Pröva modellen för större förbrukning',
                    varfor: 'En rät linje med negativ lutning fortsätter nedåt hur långt som helst. ' +
                        'Redan vid $x \\approx 170$ liter är $y = 0$, och för större förbrukning ' +
                        'ger modellen ett negativt dödstal, vilket är omöjligt.',
                    text: '$$-0{,}24x + 41 = 0 \\quad \\Longleftrightarrow \\quad x \\approx 170$$',
                    figur: 'u24-s2',
                },
                {
                    del: 'b',
                    rubrik: 'Formulera begränsningen',
                    varfor: 'Modellen kan bara gälla i ett begränsat intervall. Dödstalet kan inte ' +
                        'bli noll eller negativt hur mycket vatten man än förbrukar, så det ' +
                        'linjära sambandet duger inte för stora $x$ (ungefär över $150$ liter). ' +
                        'Modellen beskriver också dåligt vad som händer vid mycket små förbrukningar, ' +
                        'där dödstalet rimligen är ännu högre än linjen anger.',
                    text: 'Ja. Linjen går under $x$-axeln vid ungefär $170$ liter per person och dygn, ' +
                        'och ett dödstal kan aldrig vara mindre än $0$. Modellen gäller därför bara ' +
                        'i ett begränsat intervall av förbrukningar.',
                    delsvar: { del: 'b', text: 'Ja. Linjen ger dödstalet $0$ vid ungefär $170$ liter och negativa dödstal därefter, vilket är omöjligt. Modellen gäller bara i ett begränsat intervall.' },
                },
            ],
            svar: '**a)** $y = -0{,}24x + 41$ (avrundat).&emsp;&emsp;**b)** Ja: linjen kan inte gå under ' +
                '$x$-axeln, eftersom dödstalet inte kan bli mindre än $0$, så modellen gäller bara i ett begränsat intervall.',
            bedomning: [
                ['a) Godtagbar ansats, till exempel ritar en godtagbart anpassad linje och bestämmer dess lutning till ett värde i intervallet $-0{,}30 \\leq k \\leq -0{,}20$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar (till exempel $y = -0{,}24x + 41$)', '+C'],
                ['b) Godtagbar lösning som innefattar ett nyanserat omdöme om modellens begränsningar (till exempel "Linjen kan inte gå under $x$-axeln för att dödstalet kan inte bli mindre än $0$.")', '+A'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 0, 3], omrade: 'Andragradsfunktioner: modellera en form',
            genomgangar: ['ma2c-3.3', 'ma2c-3.2'],
            fraga: 'Åsa är en träkonstnär från Östersund. Hon ska börja tillverka prydnadsföremål ' +
                'i trä formade som Storsjöodjuret och ritar en bild av hur hon vill att de ska ' +
                'se ut.\n\n' +
                'Åsa vill att de två bitarna i mitten ska vara identiska och att deras övre kant ' +
                'ska ha samma form som grafen till en andragradsfunktion så att de blir ' +
                'symmetriska. Bitarnas bredd ska vara 11,5 cm och deras höjd 4,5 cm.\n\n' +
                'Bestäm en andragradsfunktion som beskriver bitarnas övre kant.',
            figur: 'u25',
            steg: [
                {
                    rubrik: 'Välj ett koordinatsystem',
                    varfor: 'Funktionen beror på var axlarna läggs, så valet måste redovisas. ' +
                        'Lägg $x$-axeln längs bitens underkant och origo i det vänstra hörnet, ' +
                        'med längder i cm. Då är nollställena $x = 0$ och $x = 11{,}5$, och ' +
                        'toppen ligger mitt emellan, i $(5{,}75;\\ 4{,}5)$.',
                    text: 'Nollställen: $(0,\\ 0)$ och $(11{,}5;\\ 0)$. Maximipunkt på symmetrilinjen ' +
                        '$x = \\dfrac{0 + 11{,}5}{2} = 5{,}75$: $(5{,}75;\\ 4{,}5)$.',
                    figur: 'u25-s1',
                },
                {
                    rubrik: 'Skriv funktionen i faktorform',
                    varfor: 'En andragradsfunktion med nollställena $0$ och $11{,}5$ kan skrivas ' +
                        '$y = a \\cdot x \\cdot (x - 11{,}5)$. Konstanten $a$ styr höjden och ' +
                        'bestäms av toppunkten.',
                    text: '$$y = a \\cdot x(x - 11{,}5)$$',
                },
                {
                    rubrik: 'Bestäm a med maximipunkten',
                    varfor: 'Sätt in $x = 5{,}75$ och $y = 4{,}5$. $5{,}75 \\cdot (5{,}75 - 11{,}5) = ' +
                        '5{,}75 \\cdot (-5{,}75) = -33{,}0625$. Dividera med det talet: $a$ blir ' +
                        'negativt, som det ska för en parabel med maximipunkt.',
                    text: '$$4{,}5 = a \\cdot 5{,}75 \\cdot (-5{,}75) \\quad \\Longleftrightarrow \\quad ' +
                        'a = \\dfrac{4{,}5}{-33{,}0625} = -0{,}13611\\ldots$$',
                },
                {
                    rubrik: 'Utveckla och svara',
                    varfor: 'Multiplicera in $a$: $a \\cdot x^2 - 11{,}5a \\cdot x$, där ' +
                        '$-11{,}5 \\cdot (-0{,}13611\\ldots) = 1{,}5652\\ldots$. Kontroll: ' +
                        '$x = 11{,}5$ ger $-0{,}1361 \\cdot 132{,}25 + 1{,}5652 \\cdot 11{,}5 \\approx 0$. ' +
                        'Samma funktion fås med kvadratisk regression på de tre punkterna i ett ' +
                        'digitalt verktyg.',
                    text: '$$y = -0{,}136x^2 + 1{,}57x \\quad (\\text{cm}),\\ \\text{för } 0 \\leq x \\leq 11{,}5$$',
                },
            ],
            svar: 'Med origo i bitens vänstra nedre hörn: $y = -0{,}136x^2 + 1{,}57x$ (ungefär $y = -0{,}14x^2 + 1{,}57x$), $0 \\leq x \\leq 11{,}5$.',
            bedomning: [
                ['Godtagbar ansats, bestämmer koordinaterna för minst tre punkter som krävs för lösning av uppgiften i ett definierat koordinatsystem, eller bestämmer koordinaterna för två punkter samt visar insikt i att symmetri gäller', '+A'],
                ['med i övrigt godtagbar lösning med godtagbart svar utifrån det definierade koordinatsystemet (till exempel $y = -0{,}14x^2 + 1{,}57x$)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 0, 3], omrade: 'Största rektangel i en triangel: likformighet och andragradsfunktion',
            genomgangar: ['ma2c-4.8', 'ma2c-3.3', 'ma2c-3.5'],
            fraga: 'Figuren visar en triangel $ABC$ med höjden 7,0 cm och basen 9,0 cm. En ' +
                'rektangel ritas så att två av rektangelns hörn ligger på triangelns bas och de ' +
                'andra hörnen ligger på triangelns två andra sidor, se figur.\n\n' +
                'Bestäm den största area som en sådan rektangel kan ha.',
            figur: 'u26',
            steg: [
                {
                    rubrik: 'Inför beteckningar',
                    varfor: 'Rektangelns area är basen gånger höjden, så kalla dem $b$ och $h$ ' +
                        '(cm). Ovanför rektangeln blir det en mindre triangel med basen $b$ och ' +
                        'höjden $7 - h$.',
                    text: '$$A = b \\cdot h$$',
                    figur: 'u26-s1',
                },
                {
                    rubrik: 'Koppla ihop b och h med likformighet',
                    varfor: 'Topptriangeln har samma vinklar som hela triangeln (rektangelns ' +
                        'överkant är parallell med basen), så de är likformiga: förhållandet ' +
                        'bas genom höjd är detsamma i båda. Det ger $b$ uttryckt i $h$.',
                    text: '$$\\dfrac{b}{7 - h} = \\dfrac{9}{7} \\quad \\Longleftrightarrow \\quad b = \\dfrac{9}{7}(7 - h)$$',
                },
                {
                    rubrik: 'Skriv arean som funktion av h',
                    varfor: 'Sätt in uttrycket för $b$. Arean blir en andragradsfunktion av $h$ ' +
                        'med negativ $h^2$-term, alltså en parabel med maximipunkt.',
                    text: '$$A(h) = \\dfrac{9}{7}(7 - h) \\cdot h = \\dfrac{9}{7}\\left(7h - h^2\\right), \\quad 0 < h < 7$$',
                },
                {
                    rubrik: 'Hitta maximipunkten',
                    varfor: 'Nollställena är $h = 0$ och $h = 7$, och maximum ligger på ' +
                        'symmetrilinjen mitt emellan dem: $h = 3{,}5$, halva höjden. Samma ' +
                        'resultat fås genom att rita $A(h)$ i ett digitalt verktyg och läsa av ' +
                        'maximipunkten.',
                    text: '$$h = \\dfrac{0 + 7}{2} = 3{,}5$$',
                    figur: 'u26-s2',
                },
                {
                    rubrik: 'Beräkna den största arean',
                    varfor: 'Vid $h = 3{,}5$ är $b = \\dfrac{9}{7} \\cdot 3{,}5 = 4{,}5$, halva basen. ' +
                        'Mätvärdena har två värdesiffror, så svaret avrundas till $16$ cm². ' +
                        'Rimligt: den största rektangeln täcker precis halva triangelns area ' +
                        '$\\dfrac{9 \\cdot 7}{2} = 31{,}5$ cm².',
                    text: '$$A(3{,}5) = 4{,}5 \\cdot 3{,}5 = 15{,}75 \\approx 16\\ \\text{cm}^2$$',
                },
            ],
            svar: 'Den största arean är $15{,}75$ cm² $\\approx 16$ cm² (rektangeln med basen $4{,}5$ cm och höjden $3{,}5$ cm).',
            bedomning: [
                ['Godtagbar ansats, till exempel tecknar samband mellan basen och höjden i rektangeln med hjälp av likformighet', '+A'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($16$ cm²)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },
    ],
};
