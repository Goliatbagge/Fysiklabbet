// Fysiklabbet — Nationellt prov Matematik 4, våren 2018.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Provet skrevs enligt ämnesplanen från 2011. Kursen Matematik 4 motsvarar
// dagens "Matematik fortsättning nivå 2". Uppgifter på stoff som utgick vid
// revideringen 2021 är märkta med `utgatt`. Källa: Skolverket/Umeå
// universitet. Provet är frisläppt och återanvänds inte.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma4-vt2018'] = {
    id: 'ma4-vt2018',
    kurs: 'Matematik fortsättning nivå 2',
    termin: 'VT 2018',
    namn: 'Nationellt prov Ma 4, våren 2018',
    kort: 'NP Ma 4 VT 2018',
    intro: 'Det här är det nationella provet i Matematik 4 (dagens Matematik fortsättning ' +
        'nivå 2) från våren 2018 (Skolverket/Umeå universitet). Provet är frisläppt och ' +
        'återanvänds inte. Provet skrevs enligt ämnesplanen från 2011. Välj en uppgift, lös ' +
        'den själv, och klicka sedan fram lösningen ett steg i taget. Varje steg förklarar ' +
        'både vad som görs och varför, figurerna byggs upp i takt med lösningen och varje ' +
        'uppgift kan också följas som en pennlösning.',
    kravgranser: 'Provet (delprov B–D) ger totalt 61 poäng varav 20 E-, 23 C- och 18 A-poäng. ' +
        'Poängen skrivs (E/C/A). Till exempel betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
        '1 A-poäng. Gräns för provbetyget: E minst 14 poäng · D minst 23 poäng varav 8 på ' +
        'minst C-nivå · C minst 31 poäng varav 14 på minst C-nivå · B minst 41 poäng varav ' +
        '6 på A-nivå · A minst 49 poäng varav 10 på A-nivå.',
    delprov: {
        B: {
            tid: '150 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 1–10. Endast svar krävs.',
        },
        C: {
            tid: '150 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 11–19. Fullständiga lösningar krävs.',
        },
        D: {
            tid: '120 minuter',
            hjalpmedel: 'Digitala verktyg, formelblad och linjal',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Uppgift 20–27. Fullständiga lösningar krävs.',
        },
    },
    // Uppgifterna läggs in nedan, ett block per delprov (B, C, D).
    uppgifter: [],
};

// Fysiklabbet: Nationellt prov Matematik 4, våren 2018, DELPROV B
// (uppgift 1–10, endast svar krävs). Pushas in i provhuvudet i
// data/np/ma4-vt2018.js under utvecklingen. Format och regler: se
// data/np/RIKTLINJER.md. Figurerna genereras av
// .claude/np-figs/gen-ma4-vt2018-B.js, pennlösningarna ligger i
// data/np/ma4-vt2018-delB-penna.js.
//
// Ingen uppgift i delprov B prövar stoff som utgått: trigonometriska
// funktioner, integraler, asymptoter, sammansatta funktioner och komplexa
// tal ingår alla i dagens Matematik fortsättning nivå 2 (absolutbeloppet
// i uppgift 5 ingår i nivå 1c, se ma3c-2.5).
(function () {
    var P = window.NP_PROV && window.NP_PROV['ma4-vt2018'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [2, 0, 0], omrade: 'Trigonometriska funktioner: period och minsta värde',
            genomgangar: ['ma4-1.11', 'ma4-1.12'],
            endastSvar: true,
            fraga: 'En funktion ges av $f(x) = 1 + 2\\sin 3x$.<br>' +
                '**a)** Ange funktionens period.<br>' +
                '**b)** Ange funktionens minsta värde.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Använd formeln för perioden',
                    varfor: 'För en funktion av typen $y = A\\sin Bx$ är perioden $\\dfrac{2\\pi}{B}$ i ' +
                        'radianer: $Bx$ måste öka med ett helt varv, $2\\pi$, innan kurvan upprepar sig. ' +
                        'Här är $B = 3$. Talet $1$ flyttar kurvan uppåt och faktorn $2$ sträcker den i ' +
                        '$y$-led, men ingen av dem ändrar perioden.',
                    text: '$$\\text{perioden} = \\dfrac{2\\pi}{3}$$\n\n' +
                        'I grader blir det $\\dfrac{360^\\circ}{3} = 120^\\circ$.',
                    delsvar: { del: 'a', text: 'Perioden är $\\dfrac{2\\pi}{3}$ (eller $120^\\circ$).' },
                },
                {
                    del: 'b',
                    rubrik: 'Låt sinus anta sitt minsta värde',
                    varfor: '$\\sin 3x$ varierar mellan $-1$ och $1$, vilket $x$ vi än väljer. Uttrycket ' +
                        '$1 + 2\\sin 3x$ blir alltså minst när $\\sin 3x = -1$. Kurvan svänger med ' +
                        'amplituden $2$ kring linjen $y = 1$, och dess lägsta punkter ligger $2$ under ' +
                        'den linjen.',
                    text: '$$f_\\text{min} = 1 + 2 \\cdot (-1) = 1 - 2 = -1$$\n\n' +
                        'Minsta värdet antas till exempel då $3x = \\dfrac{3\\pi}{2}$, alltså i ' +
                        '$x = \\dfrac{\\pi}{2}$, och sedan en period senare.',
                    figur: 'u1-s1',
                    delsvar: { del: 'b', text: 'Minsta värdet är $-1$.' },
                },
            ],
            svar: 'a) $\\dfrac{2\\pi}{3}$ (eller $120^\\circ$)&emsp;&emsp;b) $-1$',
            bedomning: [
                ['a) Korrekt svar ($120^\\circ$; $\\dfrac{2\\pi}{3}$)', '+E'],
                ['b) Korrekt svar ($-1$)', '+E'],
            ],
        },

        {
            nr: 2, del: 'B', poang: [1, 0, 0], omrade: 'Integraler: integral som area ur en graf',
            genomgangar: ['ma4-3.2', 'ma3c-5.3'],
            endastSvar: true,
            fraga: 'Figuren visar grafen till en funktion $f$.\n\n' +
                'Bestäm $\\displaystyle\\int_{-3}^{0} f(x)\\,dx$.',
            figur: 'u2',
            steg: [
                {
                    rubrik: 'Tolka integralen som area med tecken',
                    varfor: 'Funktionens formel är inte given, så integralen måste läsas ur grafen. ' +
                        'Integralen är arean mellan grafen och $x$-axeln från $x = -3$ till $x = 0$, ' +
                        'men en area som ligger UNDER $x$-axeln räknas negativ. Grafen korsar ' +
                        '$x$-axeln i $x = -2$, så intervallet delas där. Den sista biten, från ' +
                        '$x = -1$ till $x = 0$, är vågrät och delas av för sig.',
                    text: 'Tre delområden:\n\n' +
                        '- från $-3$ till $-2$: en triangel **under** $x$-axeln,\n' +
                        '- från $-2$ till $-1$: en triangel **ovanför** $x$-axeln,\n' +
                        '- från $-1$ till $0$: en rektangel **ovanför** $x$-axeln.',
                    figur: 'u2-s1',
                },
                {
                    rubrik: 'Beräkna de tre areorna',
                    varfor: 'Läs av måtten i rutnätet. Båda trianglarna har basen $1$ och höjden $2$ ' +
                        '(lägsta punkten är $(-3,\\ -2)$ och grafen når $y = 2$ i $x = -1$). ' +
                        'Rektangeln har bredden $1$ och höjden $2$.',
                    text: '$$\\text{triangel under: } \\dfrac{1 \\cdot 2}{2} = 1 \\qquad ' +
                        '\\text{triangel ovanför: } \\dfrac{1 \\cdot 2}{2} = 1 \\qquad ' +
                        '\\text{rektangel: } 1 \\cdot 2 = 2$$',
                },
                {
                    rubrik: 'Summera med tecken',
                    varfor: 'Arean under $x$-axeln ger ett negativt bidrag, de två andra ett positivt. ' +
                        'Här tar triangeln under axeln och triangeln ovanför ut varandra, och kvar blir ' +
                        'rektangeln.',
                    text: '$$\\int_{-3}^{0} f(x)\\,dx = -1 + 1 + 2 = 2$$',
                },
            ],
            svar: '$2$',
            bedomning: [['Korrekt svar utifrån godtagbar avläsning ($2$)', '+E']],
        },

        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Komplexa tal: de Moivres formel',
            genomgangar: ['ma4-4.8', 'ma4-4.6'],
            endastSvar: true,
            fraga: 'Det komplexa talet $z = 2\\left(\\cos \\dfrac{\\pi}{6} + i\\sin \\dfrac{\\pi}{6}\\right)$ ' +
                'är givet på polär form.\n\n' +
                'Bestäm $\\arg(z^5)$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Läs av belopp och argument',
                    varfor: 'Ett tal på polär form $r(\\cos v + i\\sin v)$ har beloppet $r$ och ' +
                        'argumentet $v$. Båda kan läsas av direkt.',
                    text: '$$|z| = 2 \\qquad \\arg z = \\dfrac{\\pi}{6}$$',
                },
                {
                    rubrik: 'Använd de Moivres formel',
                    varfor: 'När ett tal upphöjs till $n$ upphöjs beloppet till $n$ och argumentet ' +
                        'multipliceras med $n$: $z^n = r^n(\\cos nv + i\\sin nv)$. För argumentet ' +
                        'räcker det alltså att multiplicera $\\dfrac{\\pi}{6}$ med $5$.',
                    text: '$$z^5 = 2^5\\left(\\cos \\left(5 \\cdot \\dfrac{\\pi}{6}\\right) + ' +
                        'i\\sin \\left(5 \\cdot \\dfrac{\\pi}{6}\\right)\\right) = ' +
                        '32\\left(\\cos \\dfrac{5\\pi}{6} + i\\sin \\dfrac{5\\pi}{6}\\right)$$',
                },
                {
                    rubrik: 'Läs av argumentet',
                    varfor: '$\\dfrac{5\\pi}{6}$ ligger mellan $0$ och $2\\pi$, så vinkeln behöver inte ' +
                        'justeras med hela varv. I grader är det $5 \\cdot 30^\\circ = 150^\\circ$: ' +
                        '$z^5$ ligger i andra kvadranten.',
                    text: '$$\\arg(z^5) = \\dfrac{5\\pi}{6}$$',
                    figur: 'u3-s1',
                },
            ],
            svar: '$\\arg(z^5) = \\dfrac{5\\pi}{6}$ (eller $150^\\circ$)',
            bedomning: [['Korrekt svar ($\\dfrac{5\\pi}{6}$; $150^\\circ$)', '+E']],
        },

        {
            nr: 4, del: 'B', poang: [2, 0, 0], omrade: 'Enhetscirkeln: exakta värden',
            genomgangar: ['ma4-1.6', 'ma4-1.2'],
            endastSvar: true,
            fraga: 'Bestäm det exakta värdet av<br>' +
                '**a)**&nbsp;$\\cos 390^\\circ$&emsp;&emsp;' +
                '**b)**&nbsp;$\\sin 210^\\circ$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Dra bort ett helt varv',
                    varfor: 'Ett helt varv, $360^\\circ$, för punkten på enhetscirkeln tillbaka till samma ' +
                        'ställe. Därför ändras inte cosinusvärdet när $360^\\circ$ dras bort: ' +
                        '$390^\\circ$ pekar åt samma håll som $30^\\circ$.',
                    text: '$$\\cos 390^\\circ = \\cos (30^\\circ + 360^\\circ) = \\cos 30^\\circ$$',
                    figur: 'u4-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Använd det exakta värdet för 30°',
                    varfor: 'Det exakta värdet $\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$ kommer från den ' +
                        'liksidiga triangeln som delas mitt itu, och står i tabellen över exakta värden.',
                    text: '$$\\cos 390^\\circ = \\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$$',
                    delsvar: { del: 'a', text: '$\\cos 390^\\circ = \\dfrac{\\sqrt{3}}{2}$' },
                },
                {
                    del: 'b',
                    rubrik: 'Skriv vinkeln som 30° plus ett halvt varv',
                    varfor: 'Ett halvt varv, $180^\\circ$, för punkten till andra sidan origo, mitt emot ' +
                        'punkten för $30^\\circ$. Då byter båda koordinaterna tecken, så ' +
                        '$\\sin(v + 180^\\circ) = -\\sin v$.',
                    text: '$$\\sin 210^\\circ = \\sin (30^\\circ + 180^\\circ) = -\\sin 30^\\circ$$',
                    figur: 'u4-s2',
                },
                {
                    del: 'b',
                    rubrik: 'Använd det exakta värdet för 30°',
                    varfor: '$\\sin 30^\\circ = \\dfrac{1}{2}$. Punkten för $210^\\circ$ ligger i tredje ' +
                        'kvadranten, under $x$-axeln, så sinusvärdet ska mycket riktigt vara negativt.',
                    text: '$$\\sin 210^\\circ = -\\sin 30^\\circ = -\\dfrac{1}{2}$$',
                    delsvar: { del: 'b', text: '$\\sin 210^\\circ = -\\dfrac{1}{2}$' },
                },
            ],
            svar: 'a) $\\dfrac{\\sqrt{3}}{2}$&emsp;&emsp;b) $-\\dfrac{1}{2}$',
            bedomning: [
                ['a) Korrekt svar ($\\dfrac{\\sqrt{3}}{2}$)', '+E'],
                ['b) Korrekt svar ($-\\dfrac{1}{2}$)', '+E'],
            ],
        },

        {
            nr: 5, del: 'B', poang: [0, 1, 0], omrade: 'Funktioner med absolutbelopp',
            genomgangar: ['ma3c-2.5'],
            endastSvar: true,
            fraga: 'Alternativen A–F visar sex olika kurvor.\n\n' +
                'Ett av alternativen A–F visar kurvan $y = x \\cdot |x|$. Vilket?',
            figur: 'u5',
            steg: [
                {
                    rubrik: 'Undersök kurvan för x ≥ 0',
                    varfor: 'Absolutbeloppet är talets avstånd till $0$. För ett positivt tal (och för ' +
                        '$0$) är det talet självt, $|x| = x$. Då försvinner beloppstecknet och kurvan ' +
                        'blir en vanlig parabelhalva.',
                    text: '$$x \\geq 0: \\quad y = x \\cdot x = x^2$$\n\n' +
                        'Till höger om $y$-axeln ser kurvan ut som parabeln $y = x^2$: den börjar i ' +
                        'origo och böjer uppåt.',
                    figur: 'u5-s1',
                },
                {
                    rubrik: 'Undersök kurvan för x < 0',
                    varfor: 'För ett negativt tal är avståndet till $0$ talet med omvänt tecken, ' +
                        '$|x| = -x$. Till exempel är $|-3| = 3 = -(-3)$.',
                    text: '$$x < 0: \\quad y = x \\cdot (-x) = -x^2$$\n\n' +
                        'Till vänster om $y$-axeln är $y$ alltså negativt: kurvan är en ' +
                        'parabelhalva som böjer nedåt.',
                    figur: 'u5-s2',
                },
                {
                    rubrik: 'Jämför med alternativen',
                    varfor: 'Kurvan ska gå uppåt till höger om $y$-axeln och nedåt till vänster om den, ' +
                        'och båda halvorna ska vara böjda som parabler. B är fel, eftersom den är ' +
                        'positiv på båda sidor ($y = x^2$). A och F är räta linjer, D är vågräta ' +
                        'linjer och E finns bara för $x \\geq 0$.',
                    text: 'Kurvan $y = x \\cdot |x|$ är alternativ **C**.\n\n' +
                        'Kontroll: $x = -1$ ger $y = (-1) \\cdot |-1| = (-1) \\cdot 1 = -1$, en punkt ' +
                        'under $x$-axeln, precis som i C.',
                },
            ],
            svar: 'Alternativ C',
            bedomning: [['Korrekt svar (C)', '+C']],
        },

        {
            nr: 6, del: 'B', poang: [0, 1, 0], omrade: 'Asymptoter: vertikala och horisontella',
            genomgangar: ['ma4-2.12', 'ma4-2.14'],
            endastSvar: true,
            fraga: 'Alternativen A–E beskriver fem olika kurvor.\n\n' +
                '**A.** $y = \\dfrac{1}{x}$&emsp;&emsp;&emsp;' +
                '**B.** $y = \\dfrac{1}{x - 1}$\n\n' +
                '**C.** $y = \\dfrac{x}{x - 1}$&emsp;&emsp;&emsp;' +
                '**D.** $y = \\dfrac{x + 1}{x}$\n\n' +
                '**E.** $y = \\dfrac{x^2 + 1}{x^2 - 1}$\n\n' +
                'Ett av alternativen A–E beskriver en kurva som endast har två asymptoter, ' +
                '$x = 1$ och $y = 1$. Vilket?',
            figur: null,
            steg: [
                {
                    rubrik: 'Hitta de vertikala asymptoterna',
                    varfor: 'En vertikal asymptot finns där nämnaren är noll men inte täljaren: där ' +
                        'växer $|y|$ obegränsat. Kurvan ska ha den vertikala asymptoten $x = 1$ och ' +
                        'ingen annan, så nämnaren ska vara noll för $x = 1$ och bara då.',
                    text: '- **A** och **D**: nämnaren $x$ är noll då $x = 0$. Asymptoten är $x = 0$, fel.\n' +
                        '- **B** och **C**: nämnaren $x - 1$ är noll då $x = 1$. Det stämmer.\n' +
                        '- **E**: nämnaren $x^2 - 1$ är noll då $x = 1$ **och** då $x = -1$. ' +
                        'Två vertikala asymptoter, alltså en för mycket.',
                },
                {
                    rubrik: 'Undersök den horisontella asymptoten för B och C',
                    varfor: 'En horisontell asymptot är det värde $y$ närmar sig när $x$ blir mycket stort. ' +
                        'I B är täljaren $1$ medan nämnaren växer, så bråket går mot $0$. I C skrivs ' +
                        'täljaren om så att nämnaren syns i den: $x = (x - 1) + 1$.',
                    text: '**B:** $y = \\dfrac{1}{x - 1} \\to 0$ då $x \\to \\pm\\infty$. ' +
                        'Asymptoten är $y = 0$, fel.\n\n' +
                        '**C:** $$y = \\dfrac{x}{x - 1} = \\dfrac{(x - 1) + 1}{x - 1} = ' +
                        '1 + \\dfrac{1}{x - 1} \\to 1 \\quad \\text{då } x \\to \\pm\\infty$$',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    varfor: 'C har den vertikala asymptoten $x = 1$ och den horisontella asymptoten $y = 1$, ' +
                        'och inga andra. Grafen visar hur de två grenarna närmar sig båda linjerna.',
                    text: 'Kurvan i alternativ **C**, $y = \\dfrac{x}{x - 1}$, har precis de två ' +
                        'asymptoterna $x = 1$ och $y = 1$.',
                    figur: 'u6-s1',
                },
            ],
            svar: 'Alternativ C: $y = \\dfrac{x}{x - 1}$',
            bedomning: [['Korrekt svar (C: $y = \\dfrac{x}{x - 1}$)', '+C']],
        },

        {
            nr: 7, del: 'B', poang: [0, 0, 1], omrade: 'Komplexa tal: läge i det komplexa talplanet',
            genomgangar: ['ma4-4.5', 'ma4-4.2'],
            endastSvar: true,
            fraga: 'För varje reellt värde på konstanten $a$ har ekvationen $z - 3 = a(1 - i)$ en rot.\n\n' +
                'För vilka värden på $a$ ligger roten i första kvadranten i det komplexa talplanet?',
            figur: null,
            steg: [
                {
                    rubrik: 'Lös ut z',
                    varfor: 'För att se var roten ligger behövs dess realdel och imaginärdel. Addera ' +
                        '$3$ i båda led, så att $z$ står ensamt.',
                    text: '$$z - 3 + 3 = a(1 - i) + 3$$\n\n$$z = a(1 - i) + 3$$',
                },
                {
                    rubrik: 'Dela upp i realdel och imaginärdel',
                    varfor: 'Multiplicera in $a$ i parentesen och samla de reella termerna för sig. ' +
                        'Eftersom $a$ är reellt är $3 + a$ realdelen, och det som står framför $i$, ' +
                        'alltså $-a$, är imaginärdelen.',
                    text: '$$z = a - ai + 3 = (3 + a) - ai$$\n\n' +
                        '$$\\mathrm{Re}\\, z = 3 + a \\qquad \\mathrm{Im}\\, z = -a$$',
                },
                {
                    rubrik: 'Ställ upp villkoret för första kvadranten',
                    varfor: 'I första kvadranten ligger punkten till höger om den imaginära axeln och ' +
                        'ovanför den reella axeln. Både realdelen och imaginärdelen ska alltså vara ' +
                        'positiva. (En punkt på en axel ligger inte i någon kvadrant.)',
                    text: '$$3 + a > 0 \\qquad \\text{och} \\qquad -a > 0$$',
                },
                {
                    rubrik: 'Lös den första olikheten',
                    varfor: 'Subtrahera $3$ i båda led.',
                    text: '$$3 + a - 3 > 0 - 3$$\n\n$$a > -3$$',
                },
                {
                    rubrik: 'Lös den andra olikheten',
                    varfor: 'Addera $a$ i båda led. Då slipper vi multiplicera med ett negativt tal ' +
                        '(vilket hade vänt olikhetstecknet).',
                    text: '$$-a + a > 0 + a$$\n\n$$0 > a \\quad \\Longleftrightarrow \\quad a < 0$$',
                },
                {
                    rubrik: 'Kombinera villkoren',
                    varfor: 'Båda villkoren ska gälla samtidigt. Figuren visar alla rötter: de ligger på ' +
                        'linjen genom $3$ och $3i$, och sträckan mellan dem ligger i första ' +
                        'kvadranten. Till exempel ger $a = -1$ roten $z = 2 + i$.',
                    text: '$$-3 < a < 0$$\n\n' +
                        'I ändpunkterna hamnar roten på en axel: $a = -3$ ger $z = 3i$ och ' +
                        '$a = 0$ ger $z = 3$.',
                    figur: 'u7-s1',
                },
            ],
            svar: '$-3 < a < 0$',
            bedomning: [['Korrekt svar ($-3 < a < 0$). Även svaret $-3 \\leq a \\leq 0$ ges poäng.', '+A']],
        },

        {
            nr: 8, del: 'B', poang: [0, 0, 1], omrade: 'Primitiva funktioner: formeln för dubbla vinkeln',
            genomgangar: ['ma4-1.8', 'ma4-3.1', 'ma4-2.5'],
            endastSvar: true,
            fraga: 'Bestäm en primitiv funktion till funktionen $f(x) = \\sin 5x \\cos 5x$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv om produkten med formeln för dubbla vinkeln',
                    varfor: 'En produkt av sinus och cosinus är svår att hitta en primitiv funktion till ' +
                        'direkt. Formeln för dubbla vinkeln, $\\sin 2v = 2\\sin v\\cos v$, med ' +
                        '$v = 5x$ ger $\\sin 10x = 2\\sin 5x\\cos 5x$. Dividera båda led med $2$.',
                    text: '$$\\sin 10x = 2\\sin 5x\\cos 5x$$\n\n' +
                        '$$\\dfrac{\\sin 10x}{2} = \\dfrac{2\\sin 5x\\cos 5x}{2}$$\n\n' +
                        '$$\\sin 5x\\cos 5x = \\dfrac{\\sin 10x}{2}$$',
                },
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'Derivatan av $\\cos kx$ är $-k\\sin kx$. En primitiv funktion till ' +
                        '$\\sin kx$ är därför $-\\dfrac{\\cos kx}{k}$. Här är $k = 10$, och faktorn ' +
                        '$\\dfrac{1}{2}$ följer med.',
                    text: '$$f(x) = \\dfrac{1}{2}\\sin 10x \\quad \\Longrightarrow \\quad ' +
                        'F(x) = \\dfrac{1}{2} \\cdot \\left(-\\dfrac{\\cos 10x}{10}\\right) = ' +
                        '-\\dfrac{\\cos 10x}{20}$$',
                },
                {
                    rubrik: 'Kontrollera genom att derivera',
                    varfor: 'En primitiv funktion är rätt om dess derivata ger tillbaka $f(x)$. ' +
                        'Kedjeregeln: derivatan av $\\cos 10x$ är $-10\\sin 10x$.',
                    text: '$$F\'(x) = -\\dfrac{-10\\sin 10x}{20} = \\dfrac{\\sin 10x}{2} = ' +
                        '\\sin 5x\\cos 5x$$\n\n' +
                        'Ett annat svar som också är rätt är $F(x) = \\dfrac{\\sin^2 5x}{10}$: med ' +
                        'kedjeregeln blir derivatan $\\dfrac{2\\sin 5x \\cdot 5\\cos 5x}{10} = ' +
                        '\\sin 5x\\cos 5x$. De två svaren skiljer sig bara med en konstant.',
                },
            ],
            svar: 'Till exempel $F(x) = -\\dfrac{\\cos 10x}{20}$ (eller $F(x) = \\dfrac{\\sin^2 5x}{10}$)',
            bedomning: [['Korrekt svar (till exempel $F(x) = -\\dfrac{\\cos 10x}{20}$ eller ' +
                '$F(x) = \\dfrac{\\sin^2 5x}{10}$). Även svar med samtliga primitiva funktioner ges poäng.', '+A']],
        },

        {
            nr: 9, del: 'B', poang: [0, 1, 1], omrade: 'Sammansatta funktioner: grafer',
            genomgangar: ['ma4-2.3', 'ma4-1.10'],
            endastSvar: true,
            fraga: 'Av funktionerna $f(x) = \\sqrt{x}$ och $g(x) = \\cos(x)$ bildas fyra nya funktioner:\n\n' +
                '$f(x) + g(x)$&emsp;&emsp;$f(x) \\cdot g(x)$&emsp;&emsp;$f(g(x))$&emsp;&emsp;$g(f(x))$\n\n' +
                'Figuren visar graferna till dessa fyra nya funktioner ritade i samma skala.\n\n' +
                'Ange vilken graf A–D som hör ihop med respektive funktion.',
            figur: 'u9',
            steg: [
                {
                    rubrik: 'Summan f(x) + g(x)',
                    varfor: 'Till $\\sqrt{x}$, som växer långsamt, läggs $\\cos x$, som svänger mellan ' +
                        '$-1$ och $1$. Kurvan svänger alltså lika mycket hela tiden, men kring en ' +
                        'linje som stiger: grafen $y = \\sqrt{x}$.',
                    text: '$$f(x) + g(x) = \\sqrt{x} + \\cos x$$\n\n' +
                        'En vågig kurva med konstant amplitud som klättrar uppåt: graf **D**.',
                    figur: 'u9-s1',
                },
                {
                    rubrik: 'Produkten f(x) · g(x)',
                    varfor: 'Här multipliceras $\\cos x$ med $\\sqrt{x}$. Eftersom $\\cos x$ ligger mellan ' +
                        '$-1$ och $1$ ligger produkten mellan $-\\sqrt{x}$ och $\\sqrt{x}$. Svängningarna ' +
                        'blir alltså större och större när $x$ växer.',
                    text: '$$f(x) \\cdot g(x) = \\sqrt{x} \\cdot \\cos x$$\n\n' +
                        'Svängningar kring $x$-axeln med växande amplitud: graf **C**.',
                    figur: 'u9-s2',
                },
                {
                    rubrik: 'Den sammansatta funktionen f(g(x))',
                    varfor: 'Här är $\\cos x$ den inre funktionen och roten den yttre. En kvadratrot ' +
                        'finns bara av tal som är större än eller lika med $0$. Funktionen är alltså ' +
                        'bara definierad där $\\cos x \\geq 0$, och värdena ligger mellan $0$ och $1$. ' +
                        'Den finns också för negativa $x$.',
                    text: '$$f(g(x)) = \\sqrt{\\cos x}$$\n\n' +
                        'Små bågar med höjden $1$ och glapp där $\\cos x < 0$: graf **B**.',
                    figur: 'u9-s3',
                },
                {
                    rubrik: 'Den sammansatta funktionen g(f(x))',
                    varfor: 'Här är roten den inre funktionen, så $x \\geq 0$. I $x = 0$ är värdet ' +
                        '$\\cos 0 = 1$. Eftersom $\\sqrt{x}$ växer allt långsammare dröjer det allt ' +
                        'längre mellan svängningarna. Första minimipunkten kommer när $\\sqrt{x} = \\pi$, ' +
                        'alltså i $x = \\pi^2 \\approx 9{,}9$.',
                    text: '$$g(f(x)) = \\cos \\sqrt{x}$$\n\n' +
                        'Långsamma svängningar mellan $-1$ och $1$ som blir allt längre: graf **A**.',
                    figur: 'u9-s4',
                },
            ],
            svar: '$f(x) + g(x)$: D&emsp;&emsp;$f(x) \\cdot g(x)$: C&emsp;&emsp;$f(g(x))$: B&emsp;&emsp;$g(f(x))$: A',
            bedomning: [
                ['Anger minst två korrekta alternativ', '+C'],
                ['med korrekt svar ($f(x) + g(x)$: D, $f(x) \\cdot g(x)$: C, $f(g(x))$: B, $g(f(x))$: A)', '+A'],
            ],
        },

        {
            nr: 10, del: 'B', poang: [0, 0, 2], omrade: 'Komplexa tal: villkor i det komplexa talplanet',
            genomgangar: ['ma4-4.5', 'ma4-4.2'],
            endastSvar: true,
            fraga: 'Markera i det komplexa talplanet alla $z$ som uppfyller villkoret ' +
                '$|z + \\bar{z}| = |z - \\bar{z}|$.',
            figur: 'u10',
            steg: [
                {
                    rubrik: 'Skriv z med real- och imaginärdel',
                    varfor: 'För att översätta villkoret till ett samband mellan koordinaterna skrivs ' +
                        '$z = x + yi$, där $x$ och $y$ är reella. Konjugatet har samma realdel men ' +
                        'imaginärdelen med omvänt tecken: $\\bar{z} = x - yi$.',
                    text: '$$z + \\bar{z} = x + yi + x - yi = 2x$$\n\n' +
                        '$$z - \\bar{z} = x + yi - (x - yi) = 2yi$$',
                },
                {
                    rubrik: 'Beräkna absolutbeloppen',
                    varfor: 'Absolutbeloppet är avståndet till origo. $2x$ ligger på den reella axeln, ' +
                        'på avståndet $2|x|$ från origo. $2yi$ ligger på den imaginära axeln, på ' +
                        'avståndet $2|y|$.',
                    text: '$$|z + \\bar{z}| = |2x| = 2|x| \\qquad |z - \\bar{z}| = |2yi| = 2|y|$$',
                },
                {
                    rubrik: 'Ställ upp villkoret och förenkla',
                    varfor: 'Sätt beloppen lika och dividera båda led med $2$.',
                    text: '$$2|x| = 2|y|$$\n\n$$\\dfrac{2|x|}{2} = \\dfrac{2|y|}{2}$$\n\n$$|x| = |y|$$',
                },
                {
                    rubrik: 'Tolka villkoret',
                    varfor: 'Två tal har samma absolutbelopp när de är lika eller när de bara skiljer sig ' +
                        'i tecken. Varje sådan punkt ligger på någon av de två diagonalerna genom ' +
                        'origo.',
                    text: '$$y = x \\qquad \\text{eller} \\qquad y = -x$$\n\n' +
                        'Kontroll med $z = 2 + 2i$: $|z + \\bar{z}| = |4| = 4$ och ' +
                        '$|z - \\bar{z}| = |4i| = 4$. Det stämmer.',
                    figur: 'u10-s1',
                },
            ],
            svar: 'Linjerna $y = x$ och $y = -x$ ($\\mathrm{Im}\\, z = \\mathrm{Re}\\, z$ och ' +
                '$\\mathrm{Im}\\, z = -\\mathrm{Re}\\, z$)',
            bedomning: [
                ['Markering av minst två godtagbara punkter och ingen felaktig punkt', '+A'],
                ['med godtagbart svar: de två linjerna $\\mathrm{Im}\\, z = \\mathrm{Re}\\, z$ och ' +
                    '$\\mathrm{Im}\\, z = -\\mathrm{Re}\\, z$', '+A'],
            ],
        }
    );
})();

// Fysiklabbet: Nationellt prov Matematik 4, våren 2018, DELPROV C
// (uppgift 11–19, fullständiga lösningar, utan digitala verktyg). Pushas in
// i provhuvudet i data/np/ma4-vt2018.js under utvecklingen och slås ihop
// med den innan publicering. Format och regler: se data/np/RIKTLINJER.md.
// Figurerna genereras av .claude/np-figs/gen-ma4-vt2018-C.js
// (data/np/ma4-vt2018-figurer-C.js), pennlösningarna ligger i
// data/np/ma4-vt2018-delC-penna.js.
(function () {
    var P = window.NP_PROV && window.NP_PROV['ma4-vt2018'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV C =================
        {
            nr: 11, del: 'C', poang: [2, 1, 0], omrade: 'Trigonometriska ekvationer',
            genomgangar: ['ma4-1.3', 'ma4-1.5'],
            fraga: 'Lös ekvationen $\\sin 2x = \\dfrac{1}{2}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Hitta en vinkel med rätt sinusvärde',
                    varfor: '$\\dfrac{1}{2}$ är ett exakt värde som känns igen från triangeln med ' +
                        'vinklarna $30^\\circ$, $60^\\circ$ och $90^\\circ$: $\\sin 30^\\circ = \\dfrac{1}{2}$. ' +
                        'Argumentet är här hela $2x$, så det är $2x$ som kan vara $30^\\circ$.',
                    text: '$$\\sin 30^\\circ = \\dfrac{1}{2}$$',
                },
                {
                    rubrik: 'Skriv upp båda lösningsfamiljerna för 2x',
                    varfor: 'Sinus är $y$-koordinaten i enhetscirkeln, och två punkter per varv har ' +
                        '$y$-koordinaten $\\dfrac{1}{2}$: vinkeln $30^\\circ$ och ' +
                        '$180^\\circ - 30^\\circ = 150^\\circ$. Varje helt varv, $n \\cdot 360^\\circ$, ' +
                        'ger samma punkt igen.',
                    text: '$$2x = 30^\\circ + n \\cdot 360^\\circ \\qquad \\text{eller} \\qquad ' +
                        '2x = 180^\\circ - 30^\\circ + n \\cdot 360^\\circ = 150^\\circ + n \\cdot 360^\\circ$$\n\n' +
                        'där $n$ är ett heltal.',
                    figur: 'u11-s2',
                },
                {
                    rubrik: 'Dividera båda led med 2',
                    varfor: 'Det är $x$ som söks, så båda led divideras med $2$. Då delas även ' +
                        'periodtermen: $\\dfrac{n \\cdot 360^\\circ}{2} = n \\cdot 180^\\circ$. ' +
                        'Lösningarna kommer alltså dubbelt så tätt som för $\\sin x$, två gånger per halvt varv.',
                    text: '$$\\dfrac{2x}{2} = \\dfrac{30^\\circ + n \\cdot 360^\\circ}{2}$$\n\n' +
                        '$$x = \\dfrac{30^\\circ}{2} + \\dfrac{n \\cdot 360^\\circ}{2} = 15^\\circ + n \\cdot 180^\\circ$$\n\n' +
                        '$$\\dfrac{2x}{2} = \\dfrac{150^\\circ + n \\cdot 360^\\circ}{2}$$\n\n' +
                        '$$x = \\dfrac{150^\\circ}{2} + \\dfrac{n \\cdot 360^\\circ}{2} = 75^\\circ + n \\cdot 180^\\circ$$',
                },
                {
                    rubrik: 'Kontrollera och skriv lösningarna i radianer',
                    varfor: 'Uppgiften säger inget om vinkelmått, så svaret får ges i grader eller ' +
                        'radianer. Med $180^\\circ = \\pi$ blir $15^\\circ = \\dfrac{\\pi}{12}$ och ' +
                        '$75^\\circ = \\dfrac{5\\pi}{12}$. Kontroll: $\\sin(2 \\cdot 15^\\circ) = \\sin 30^\\circ$ ' +
                        'och $\\sin(2 \\cdot 75^\\circ) = \\sin 150^\\circ$, som båda är $\\dfrac{1}{2}$.',
                    text: '$$x = \\dfrac{\\pi}{12} + n \\cdot \\pi \\qquad \\text{och} \\qquad ' +
                        'x = \\dfrac{5\\pi}{12} + n \\cdot \\pi$$',
                },
            ],
            svar: '$x = 15^\\circ + n \\cdot 180^\\circ$ och $x = 75^\\circ + n \\cdot 180^\\circ$, där $n$ är ett heltal ' +
                '(i radianer $x = \\dfrac{\\pi}{12} + n \\cdot \\pi$ och $x = \\dfrac{5\\pi}{12} + n \\cdot \\pi$)',
            bedomning: [
                ['Godtagbar ansats, bestämmer minst en lösning till ekvationen, till exempel $x = 15^\\circ$', '+E'],
                ['med godtagbar fortsättning, bestämmer minst två lösningar till ekvationen, till exempel $x = 15^\\circ + n \\cdot 180^\\circ$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($x = 15^\\circ + n \\cdot 180^\\circ$ och $x = 75^\\circ + n \\cdot 180^\\circ$)', '+C'],
            ],
        },

        {
            nr: 12, del: 'C', poang: [2, 0, 0], omrade: 'Komplexa tal: division',
            genomgangar: ['ma4-4.2'],
            fraga: 'Skriv uttrycket $\\dfrac{2 + i}{3 - i}$ på formen $a + bi$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Förläng med nämnarens konjugat',
                    varfor: 'Ett $i$ i nämnaren går inte att dela upp i realdel och imaginärdel. ' +
                        'Multipliceras nämnaren $3 - i$ med sitt konjugat $3 + i$ blir den reell, ' +
                        'eftersom $(c - di)(c + di) = c^2 + d^2$. Täljaren förlängs med samma tal, så ' +
                        'att bråkets värde inte ändras.',
                    text: '$$\\dfrac{2 + i}{3 - i} = \\dfrac{(2 + i)(3 + i)}{(3 - i)(3 + i)}$$',
                },
                {
                    rubrik: 'Multiplicera ut täljaren och nämnaren',
                    varfor: 'I täljaren multipliceras varje term i den första parentesen med varje ' +
                        'term i den andra. Nämnaren är ett tal gånger sitt konjugat, så ' +
                        'konjugatregeln $(p - q)(p + q) = p^2 - q^2$ ger den direkt.',
                    text: '$$\\begin{aligned}\\dfrac{2 + i}{3 - i} &= \\dfrac{(2 + i)(3 + i)}{(3 - i)(3 + i)} \\\\[6pt] ' +
                        '&= \\dfrac{6 + 2i + 3i + i^2}{3^2 - i^2}\\end{aligned}$$',
                },
                {
                    rubrik: 'Slå ihop likadana termer och ersätt i i kvadrat med −1',
                    varfor: 'De imaginära termerna $2i$ och $3i$ blir tillsammans $5i$. Sedan används ' +
                        '$i^2 = -1$ i både täljare och nämnare: $+i^2$ blir $-1$ och $-i^2$ blir $+1$. ' +
                        'Nämnaren är nu reell.',
                    text: '$$\\begin{aligned}\\phantom{\\dfrac{2 + i}{3 - i}} &= \\dfrac{6 + 5i + i^2}{9 - i^2} \\\\[6pt] ' +
                        '&= \\dfrac{6 + 5i - 1}{9 + 1} = \\dfrac{5 + 5i}{10}\\end{aligned}$$',
                },
                {
                    rubrik: 'Dela upp i realdel och imaginärdel',
                    varfor: 'Nämnaren är det reella talet $10$, så både realdelen och imaginärdelen ' +
                        'i täljaren kan divideras med $10$ var för sig. Kontroll: ' +
                        '$(0{,}5 + 0{,}5i)(3 - i) = 1{,}5 - 0{,}5i + 1{,}5i - 0{,}5i^2 = 2 + i$, som det ska.',
                    text: '$$\\begin{aligned}\\phantom{\\dfrac{2 + i}{3 - i}} &= \\dfrac{5}{10} + \\dfrac{5}{10}i = 0{,}5 + 0{,}5i\\end{aligned}$$',
                },
            ],
            svar: '$0{,}5 + 0{,}5i$',
            bedomning: [
                ['Godtagbar ansats, till exempel förlänger med nämnarens konjugat, $\\dfrac{(2 + i)(3 + i)}{(3 - i)(3 + i)}$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($0{,}5 + 0{,}5i$). Även svaret $\\dfrac{1 + i}{2}$ ger poäng.', '+E'],
            ],
        },

        {
            nr: 13, del: 'C', poang: [2, 0, 0], omrade: 'Derivata: kedjeregeln',
            genomgangar: ['ma4-2.3'],
            fraga: 'En funktion ges av $f(x) = (2x - 5)^6$\n\nBeräkna $f\'(3)$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Dela upp i yttre och inre funktion',
                    varfor: 'Funktionen är sammansatt: något, $2x - 5$, upphöjs till $6$. Den yttre ' +
                        'funktionen är potensen $u^6$ och den inre funktionen är $u = 2x - 5$. ' +
                        'Kedjeregeln säger att derivatan är den yttre derivatan gånger den inre derivatan.',
                    text: '$$\\text{yttre: } u^6 \\qquad\\qquad \\text{inre: } u = 2x - 5$$',
                },
                {
                    rubrik: 'Derivera med kedjeregeln',
                    varfor: 'Den yttre derivatan är $6u^5$, med den inre funktionen kvar i parentesen: ' +
                        '$6(2x - 5)^5$. Den inre derivatan är derivatan av $2x - 5$, alltså $2$.',
                    text: '$$f\'(x) = 6(2x - 5)^5 \\cdot 2 = 12(2x - 5)^5$$',
                },
                {
                    rubrik: 'Sätt in x = 3',
                    varfor: 'Parentesen blir $2 \\cdot 3 - 5 = 1$, och $1$ upphöjt till vad som helst ' +
                        'är $1$.',
                    text: '$$f\'(3) = 12(2 \\cdot 3 - 5)^5 = 12 \\cdot 1^5 = 12$$',
                },
            ],
            svar: '$f\'(3) = 12$',
            bedomning: [
                ['Godtagbar ansats, bestämmer $f\'(x)$ korrekt, $f\'(x) = 6(2x - 5)^5 \\cdot 2$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($12$)', '+E'],
            ],
        },

        {
            nr: 14, del: 'C', poang: [1, 1, 0], omrade: 'Komplexa tal: konjugat, summa och produkt',
            genomgangar: ['ma4-4.2', 'ma4-4.1'],
            fraga: 'Conny och Yugat diskuterar komplexa tal.\n\n' +
                'Conny påstår: ”För alla komplexa tal gäller att summan av talet och dess konjugat ' +
                'alltid blir ett reellt tal”.\n\n' +
                'Yugat påstår: ”Det är produkten av talet och dess konjugat som alltid blir ett ' +
                'reellt tal”.\n\n' +
                'Undersök om deras påståenden är sanna.',
            figur: 'u14',
            steg: [
                {
                    rubrik: 'Skriv z och konjugatet på allmän form',
                    varfor: 'Påståendena gäller alla komplexa tal, så ett exempel räcker inte som ' +
                        'bevis. Ett godtyckligt komplext tal skrivs $z = a + bi$, där $a$ och $b$ är ' +
                        'reella. Konjugatet har samma realdel men motsatt imaginärdel. I det komplexa ' +
                        'talplanet är $\\bar{z}$ spegelbilden av $z$ i den reella axeln.',
                    text: '$$z = a + bi \\qquad\\qquad \\bar{z} = a - bi$$',
                    figur: 'u14-s1',
                },
                {
                    rubrik: 'Undersök summan',
                    varfor: 'Imaginärdelarna $bi$ och $-bi$ tar ut varandra. Kvar blir $2a$, och ' +
                        'eftersom $a$ är reellt är också $2a$ reellt, vilka värden $a$ och $b$ än har.',
                    text: '$$z + \\bar{z} = (a + bi) + (a - bi) = a + bi + a - bi = 2a$$\n\n' +
                        'Summan är alltid reell, så Connys påstående är sant.',
                },
                {
                    rubrik: 'Undersök produkten',
                    varfor: 'Produkten är en summa gånger en differens av samma två termer, så ' +
                        'konjugatregeln $(p + q)(p - q) = p^2 - q^2$ ger den direkt. Med $i^2 = -1$ ' +
                        'blir $-b^2 i^2 = +b^2$.',
                    text: '$$z \\cdot \\bar{z} = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 - b^2 i^2 = a^2 + b^2$$\n\n' +
                        '$a^2 + b^2$ är reellt eftersom $a$ och $b$ är reella, så Yugats påstående är också sant.',
                },
                {
                    rubrik: 'Kontrollera med ett exempel och dra slutsatsen',
                    varfor: 'Ett exempel bevisar ingenting, men det visar att räkningen stämmer. ' +
                        'Med $z = 3 + 2i$ är $\\bar{z} = 3 - 2i$.',
                    text: '$$z + \\bar{z} = 6 \\qquad\\qquad z \\cdot \\bar{z} = 9 - 4i^2 = 9 + 4 = 13$$\n\n' +
                        'Båda blir reella, precis som de allmänna uttrycken $2a = 6$ och $a^2 + b^2 = 13$ säger. ' +
                        'Båda påståendena är alltså sanna: både summan och produkten av ett komplext tal ' +
                        'och dess konjugat är alltid reella.',
                },
            ],
            svar: 'Båda påståendena är sanna. Med $z = a + bi$ är $z + \\bar{z} = 2a$ och ' +
                '$z \\cdot \\bar{z} = a^2 + b^2$, och båda är reella tal för alla reella $a$ och $b$.',
            bedomning: [
                ['Korrekt slutsats om båda påståendena utifrån undersökning av specialfall, eller korrekt slutsats om minst ett av påståendena utifrån generell undersökning', '+E'],
                ['med välgrundat resonemang där korrekt slutsats dras om båda påståendena utifrån generella undersökningar', '+C'],
            ],
        },

        {
            nr: 15, del: 'C', poang: [1, 1, 2], omrade: 'Trigonometri: definitionsmängd och bevis',
            genomgangar: ['ma4-1.9', 'ma4-1.7', 'ma4-1.8'],
            fraga: 'Uttrycket $\\dfrac{1 - \\sin 2v}{\\sin v - \\cos v}$ är givet.\n\n' +
                '**a)** Avgör för vilka värden på $v$ som uttrycket inte är definierat.\n\n' +
                '**b)** Visa att $\\dfrac{1 - \\sin 2v}{\\sin v - \\cos v}$ kan skrivas som ' +
                '$\\sin v - \\cos v$ för alla $v$ där uttrycket är definierat.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Sätt nämnaren lika med noll',
                    varfor: 'Ett bråk är inte definierat när nämnaren är noll, eftersom man inte kan ' +
                        'dividera med noll. Täljaren spelar ingen roll för den frågan. Adderas ' +
                        '$\\cos v$ till båda led står sinus och cosinus på var sin sida.',
                    text: '$$\\sin v - \\cos v = 0$$\n\n' +
                        '$$\\sin v - \\cos v + \\cos v = 0 + \\cos v$$\n\n' +
                        '$$\\sin v = \\cos v$$',
                },
                {
                    del: 'a',
                    rubrik: 'Dividera båda led med cos v',
                    varfor: 'Det går att dividera med $\\cos v$, för den kan inte vara noll här: är ' +
                        '$\\cos v = 0$ så är $\\sin v = \\pm 1$, och då är $\\sin v \\neq \\cos v$. ' +
                        'Sinus delat med cosinus är tangens.',
                    text: '$$\\dfrac{\\sin v}{\\cos v} = \\dfrac{\\cos v}{\\cos v} \\quad \\Longleftrightarrow \\quad \\tan v = 1$$',
                },
                {
                    del: 'a',
                    rubrik: 'Lös tan v = 1',
                    varfor: '$\\tan 45^\\circ = 1$, eftersom sinus och cosinus är lika stora för ' +
                        '$45^\\circ$. Tangens har perioden $180^\\circ$: punkten på enhetscirkeln ett halvt ' +
                        'varv bort, vid $225^\\circ$, har både sinus och cosinus negativa men lika stora.',
                    text: '$$v = 45^\\circ + n \\cdot 180^\\circ \\qquad \\text{där } n \\text{ är ett heltal}$$\n\n' +
                        'I radianer: $v = \\dfrac{\\pi}{4} + n \\cdot \\pi$',
                    figur: 'u15-s3',
                    delsvar: { del: 'a', text: 'Uttrycket är inte definierat för $v = 45^\\circ + n \\cdot 180^\\circ$ ' +
                        '($v = \\dfrac{\\pi}{4} + n \\cdot \\pi$), där $n$ är ett heltal.' },
                },
                {
                    del: 'b',
                    rubrik: 'Skriv om ettan och sin 2v',
                    varfor: 'Vi förenklar vänsterledet (VL) tills det blir högerledet (HL). Ettan ' +
                        'skrivs med trigonometriska ettan, $1 = \\sin^2 v + \\cos^2 v$, och ' +
                        '$\\sin 2v$ med formeln för dubbla vinkeln, $\\sin 2v = 2\\sin v \\cos v$. ' +
                        'Då står allt i täljaren uttryckt i $\\sin v$ och $\\cos v$, precis som i nämnaren.',
                    text: '$$\\text{VL} = \\dfrac{1 - \\sin 2v}{\\sin v - \\cos v} = ' +
                        '\\dfrac{\\sin^2 v + \\cos^2 v - 2\\sin v \\cos v}{\\sin v - \\cos v}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Känn igen en kvadrat i täljaren',
                    varfor: 'Ordnas termerna som $\\sin^2 v - 2\\sin v \\cos v + \\cos^2 v$ är täljaren ' +
                        'precis den andra kvadreringsregeln, $(p - q)^2 = p^2 - 2pq + q^2$, med ' +
                        '$p = \\sin v$ och $q = \\cos v$.',
                    text: '$$\\text{VL} = \\dfrac{\\sin^2 v - 2\\sin v \\cos v + \\cos^2 v}{\\sin v - \\cos v} = ' +
                        '\\dfrac{(\\sin v - \\cos v)^2}{\\sin v - \\cos v}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Förkorta bort sin v − cos v',
                    varfor: 'Faktorn $\\sin v - \\cos v$ finns i både täljare och nämnare. Den får ' +
                        'förkortas bort eftersom den inte är noll där uttrycket är definierat, det ' +
                        'var just de värden som uteslöts i a).',
                    text: '$$\\text{VL} = \\dfrac{(\\sin v - \\cos v)(\\sin v - \\cos v)}{\\sin v - \\cos v} = ' +
                        '\\sin v - \\cos v = \\text{HL}$$\n\n' +
                        'Alltså är VL = HL för alla $v$ där uttrycket är definierat.',
                    delsvar: { del: 'b', text: '$\\dfrac{1 - \\sin 2v}{\\sin v - \\cos v} = ' +
                        '\\dfrac{\\sin^2 v - 2\\sin v \\cos v + \\cos^2 v}{\\sin v - \\cos v} = ' +
                        '\\dfrac{(\\sin v - \\cos v)^2}{\\sin v - \\cos v} = \\sin v - \\cos v$' },
                },
            ],
            svar: '**a)** $v = 45^\\circ + n \\cdot 180^\\circ$ ($v = \\dfrac{\\pi}{4} + n \\cdot \\pi$), där $n$ är ett heltal.\n\n' +
                '**b)** $\\dfrac{1 - \\sin 2v}{\\sin v - \\cos v} = \\dfrac{\\sin^2 v - 2\\sin v \\cos v + \\cos^2 v}{\\sin v - \\cos v} = ' +
                '\\dfrac{(\\sin v - \\cos v)^2}{\\sin v - \\cos v} = \\sin v - \\cos v$',
            bedomning: [
                ['**a)** Godtagbar ansats, kommer fram till att $\\tan v = 1$ ska lösas eller inser att $v = \\dfrac{\\pi}{4}$ är en lösning till $\\sin v - \\cos v = 0$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($v = \\dfrac{\\pi}{4} + n \\cdot \\pi$; $v = 45^\\circ + n \\cdot 180^\\circ$)', '+C'],
                ['**b)** Godtagbar ansats, till exempel skriver om täljaren med trigonometriska ettan och formeln för dubbla vinkeln', '+A'],
                ['med i övrigt godtagbart slutfört bevis', '+A'],
            ],
        },

        {
            nr: 16, del: 'C', poang: [0, 3, 0], omrade: 'Derivata: kedjeregeln och tangentens ekvation',
            genomgangar: ['ma4-2.3', 'ma3c-3.6'],
            fraga: 'En linje tangerar grafen till $f(x) = \\sqrt{2x - 1}$ i den punkt där $x = 5$\n\n' +
                'Bestäm linjens ekvation.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm tangeringspunkten',
                    varfor: 'Tangenten och grafen har punkten där $x = 5$ gemensam. Dess ' +
                        '$y$-koordinat är funktionsvärdet $f(5)$.',
                    text: '$$f(5) = \\sqrt{2 \\cdot 5 - 1} = \\sqrt{9} = 3$$\n\n' +
                        'Tangeringspunkten är $(5,\\ 3)$.',
                },
                {
                    rubrik: 'Skriv roten som en potens',
                    varfor: 'Kvadratroten är detsamma som exponenten $\\dfrac{1}{2}$. På potensform ' +
                        'kan funktionen deriveras med kedjeregeln: den yttre funktionen är ' +
                        '$u^{\\frac{1}{2}}$ och den inre är $u = 2x - 1$.',
                    text: '$$f(x) = \\sqrt{2x - 1} = (2x - 1)^{\\frac{1}{2}}$$',
                },
                {
                    rubrik: 'Derivera med kedjeregeln',
                    varfor: 'Den yttre derivatan är $\\dfrac{1}{2}u^{-\\frac{1}{2}}$, med den inre ' +
                        'funktionen kvar i parentesen. Den inre derivatan är $2$. Faktorerna ' +
                        '$\\dfrac{1}{2}$ och $2$ tar ut varandra.',
                    text: '$$f\'(x) = \\dfrac{1}{2}(2x - 1)^{-\\frac{1}{2}} \\cdot 2 = (2x - 1)^{-\\frac{1}{2}}$$',
                },
                {
                    rubrik: 'Skriv om derivatan ett steg i taget',
                    varfor: 'Den negativa exponenten betyder att potensen står i nämnaren, och ' +
                        'exponenten $\\dfrac{1}{2}$ är en kvadratrot.',
                    text: '$$f\'(x) = \\dfrac{1}{(2x - 1)^{\\frac{1}{2}}}$$\n\n' +
                        '$$f\'(x) = \\dfrac{1}{\\sqrt{2x - 1}}$$',
                },
                {
                    rubrik: 'Beräkna tangentens lutning',
                    varfor: 'Tangentens lutning $k$ är derivatans värde i tangeringspunkten.',
                    text: '$$k = f\'(5) = \\dfrac{1}{\\sqrt{2 \\cdot 5 - 1}} = \\dfrac{1}{\\sqrt{9}} = \\dfrac{1}{3}$$',
                },
                {
                    rubrik: 'Bestäm m med tangeringspunkten',
                    varfor: 'Tangenten är en rät linje $y = kx + m$ med $k = \\dfrac{1}{3}$. Punkten ' +
                        '$(5,\\ 3)$ ligger på linjen, så $x = 5$ och $y = 3$ insatta ger en ekvation ' +
                        'för $m$. Subtraheras $\\dfrac{5}{3}$ från båda led står $m$ ensamt, och ' +
                        '$3$ skrivs som $\\dfrac{9}{3}$ så att bråken får samma nämnare.',
                    text: '$$y = \\dfrac{1}{3}x + m$$\n\n' +
                        '$$3 = \\dfrac{1}{3} \\cdot 5 + m$$\n\n' +
                        '$$3 = \\dfrac{5}{3} + m$$\n\n' +
                        '$$3 - \\dfrac{5}{3} = \\dfrac{5}{3} + m - \\dfrac{5}{3}$$\n\n' +
                        '$$3 - \\dfrac{5}{3} = m$$\n\n' +
                        '$$\\dfrac{9}{3} - \\dfrac{5}{3} = m$$\n\n' +
                        '$$m = \\dfrac{4}{3}$$',
                },
                {
                    rubrik: 'Skriv tangentens ekvation och kontrollera',
                    varfor: 'Kontroll: med $x = 5$ blir $y = \\dfrac{5}{3} + \\dfrac{4}{3} = \\dfrac{9}{3} = 3$, ' +
                        'så linjen går genom tangeringspunkten. Lutningen $\\dfrac{1}{3}$ är positiv och ' +
                        'liten, vilket stämmer med att rotfunktionen växer allt långsammare.',
                    text: '$$y = \\dfrac{1}{3}x + \\dfrac{4}{3} = \\dfrac{x}{3} + \\dfrac{4}{3}$$',
                    figur: 'u16-s7',
                },
            ],
            svar: '$y = \\dfrac{x}{3} + \\dfrac{4}{3}$',
            bedomning: [
                ['Godtagbar ansats, bestämmer $f\'(x)$ korrekt, $f\'(x) = \\dfrac{1}{\\sqrt{2x - 1}}$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($y = \\dfrac{x}{3} + \\dfrac{4}{3}$)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 17, del: 'C', poang: [0, 3, 0], omrade: 'Polynomdivision och polynomekvationer',
            genomgangar: ['ma4-4.4', 'ma4-4.3'],
            fraga: 'Ekvationen $z^3 + 4z^2 + 3z + 12 = 0$ har en lösning $z = -4$\n\n' +
                'Bestäm övriga lösningar till ekvationen.',
            figur: null,
            steg: [
                {
                    rubrik: 'Använd faktorsatsen',
                    varfor: 'Eftersom $z = -4$ är en lösning är $z - (-4) = z + 4$ en faktor i ' +
                        'polynomet. Den andra faktorn får vi genom att dividera polynomet med $z + 4$.',
                    text: '$$z^3 + 4z^2 + 3z + 12 = (z + 4) \\cdot q(z)$$',
                },
                {
                    rubrik: 'Ställ upp polynomdivisionen',
                    varfor: 'Polynomet skrivs med ett streck ovanför och nämnaren $z + 4$ i ' +
                        'trappsteget till höger. Kvoten byggs upp term för term ovanför strecket.',
                    text: '$$\\def\\arraystretch{1.45}\n' +
                        '\\begin{array}{l}\n' +
                        '\\phantom{-\\,(}z^2 + 3 \\\\\n' +
                        '\\phantom{-\\,(}\\overline{z^3 + 4z^2 + 3z + 12\\;}\\rule[-0.24em]{0.04em}{1.12em}\\underline{\\;z + 4\\;} \\\\\n' +
                        '\\phantom{-\\,(}\\mkern-24mu{-}\\,\\underline{(\\mathrlap{z^3 + 4z^2)}\\phantom{z^3 + 4z^2 + 3z + 12}} \\\\\n' +
                        '\\phantom{-\\,(z^3 {}+{} 4z^2 {}+{}}3z + 12 \\\\\n' +
                        '\\phantom{-\\,(z^3 {}+{} 4z^2 {}+{}}\\mkern-24mu{-}\\,\\underline{(3z + 12)} \\\\\n' +
                        '\\phantom{-\\,(z^3 {}+{} 4z^2 {}+{} 3z {}+{} 1}0\n' +
                        '\\end{array}$$',
                },
                {
                    rubrik: 'Följ varven i divisionen',
                    varfor: 'Varje varv går till på samma sätt: dela den första termen med nämnarens ' +
                        '$z$, multiplicera upp och dra bort hela produkten. Under strecket skrivs ' +
                        'allt som blir kvar.',
                    text: '- $z^3 : z = z^2$, och $z^2(z + 4) = z^3 + 4z^2$ dras bort. ' +
                        '$z^2$-termerna tar ut varandra, $4z^2 - 4z^2 = 0$, och kvar blir $3z + 12$.\n' +
                        '- $3z : z = 3$, och $3(z + 4) = 3z + 12$ dras bort. Resten blir $0$.\n\n' +
                        'Divisionen går jämnt upp och kvoten är $z^2 + 3$:\n\n' +
                        '$$z^3 + 4z^2 + 3z + 12 = (z + 4)(z^2 + 3)$$\n\n' +
                        'Samma faktorisering ger en gruppering av termerna två och två: ' +
                        '$z^3 + 4z^2 + 3z + 12 = z^2(z + 4) + 3(z + 4) = (z + 4)(z^2 + 3)$.',
                },
                {
                    rubrik: 'Använd nollproduktmetoden',
                    varfor: 'En produkt är noll precis när någon av faktorerna är noll. Faktorn ' +
                        '$z + 4$ ger den lösning vi redan känner, $z = -4$. De övriga lösningarna ' +
                        'kommer från den andra faktorn.',
                    text: '$$(z + 4)(z^2 + 3) = 0$$\n\n' +
                        '$$z + 4 = 0 \\qquad \\text{eller} \\qquad z^2 + 3 = 0$$',
                },
                {
                    rubrik: 'Lös z i kvadrat + 3 = 0',
                    varfor: 'Subtrahera $3$ från båda led och dra roten ur. Bland de komplexa talen ' +
                        'finns en rot ur $-3$: $\\sqrt{-3} = i\\sqrt{3}$, eftersom ' +
                        '$(i\\sqrt{3})^2 = i^2 \\cdot 3 = -3$. Glöm inte den negativa roten.',
                    text: '$$z^2 + 3 - 3 = 0 - 3$$\n\n' +
                        '$$z^2 = -3$$\n\n' +
                        '$$z = \\pm\\sqrt{-3}$$\n\n' +
                        '$$z = \\pm i\\sqrt{3}$$',
                },
                {
                    rubrik: 'Kontrollera en lösning',
                    varfor: 'Med $z = i\\sqrt{3}$ är $z^2 = -3$ och $z^3 = z^2 \\cdot z = -3i\\sqrt{3}$. ' +
                        'Insatt i polynomet ska det bli $0$.',
                    text: '$$-3i\\sqrt{3} + 4 \\cdot (-3) + 3i\\sqrt{3} + 12 = -3i\\sqrt{3} - 12 + 3i\\sqrt{3} + 12 = 0$$',
                },
            ],
            svar: '$z = \\pm i\\sqrt{3}$, alltså $z_1 = i\\sqrt{3}$ och $z_2 = -i\\sqrt{3}$',
            bedomning: [
                ['Godtagbar ansats, till exempel faktoriserar polynomet, $(z + 4)(z^2 + 3)$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($z = \\pm i\\sqrt{3}$)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 18, del: 'C', poang: [0, 1, 1], omrade: 'Absolutbelopp',
            genomgangar: ['ma3c-2.5'],
            fraga: 'Signe påstår att funktionen $f(x) = |x - 1| + x - 1$ aldrig antar negativa värden.\n\n' +
                'Undersök om Signes påstående är korrekt.',
            figur: null,
            steg: [
                {
                    rubrik: 'Dela upp i två fall',
                    varfor: 'Absolutbeloppet av ett tal är talets avstånd till $0$: talet självt om det ' +
                        'är positivt eller noll, och talet med ombytt tecken om det är negativt. ' +
                        'Uttrycket inuti, $x - 1$, byter tecken vid $x = 1$, så vi undersöker ' +
                        '$x \\geq 1$ och $x < 1$ var för sig.',
                    text: '$$|x - 1| = \\begin{cases} x - 1 & \\text{om } x \\geq 1 \\\\ -(x - 1) & \\text{om } x < 1 \\end{cases}$$',
                },
                {
                    rubrik: 'Undersök fallet x ≥ 1',
                    varfor: 'Här är $x - 1 \\geq 0$, så absolutbeloppstecknen kan tas bort utan att ' +
                        'något ändras, och då är också $2(x - 1) \\geq 0$.',
                    text: '$$f(x) = (x - 1) + x - 1 = 2x - 2 = 2(x - 1) \\geq 0$$',
                },
                {
                    rubrik: 'Undersök fallet x < 1',
                    varfor: 'Här är $x - 1$ negativt, så absolutbeloppet är $-(x - 1)$. Minustecknet ' +
                        'framför parentesen byter tecken på båda termerna, och då tar allt ut varandra.',
                    text: '$$f(x) = -(x - 1) + x - 1 = -x + 1 + x - 1 = 0$$',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    varfor: 'I båda fallen är $f(x) \\geq 0$, och fallen täcker alla reella tal. ' +
                        'Grafen bekräftar det: den ligger på $x$-axeln fram till $x = 1$ och stiger sedan.',
                    text: 'För $x < 1$ är $f(x) = 0$ och för $x \\geq 1$ är $f(x) = 2(x - 1) \\geq 0$. ' +
                        'Funktionen antar alltså aldrig negativa värden, och Signes påstående är korrekt.',
                    figur: 'u18-s4',
                },
            ],
            svar: 'Signes påstående är korrekt. För $x < 1$ är $f(x) = -(x - 1) + x - 1 = 0$ och för ' +
                '$x \\geq 1$ är $f(x) = 2(x - 1) \\geq 0$, så $f(x)$ är aldrig negativ.',
            bedomning: [
                ['Godtagbar ansats, till exempel delar upp funktionen i två intervall, $x < 1$ och $x > 1$', '+C'],
                ['med godtagbar generell undersökning med slutsatsen att Signes påstående är korrekt', '+A'],
            ],
        },

        {
            nr: 19, del: 'C', poang: [0, 1, 3], omrade: 'Derivata: extrempunkter och andraderivata',
            genomgangar: ['ma3c-4.5', 'ma4-2.5', 'ma4-2.3'],
            fraga: 'En funktion ges av $f(x) = ax^2 - 6x + b\\sin 3x$ där $a$ och $b$ är reella ' +
                'konstanter. Undersök vilka värden på $a$ och $b$ som är möjliga om funktionen har ' +
                'ett maximum då $x = 0$',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera f',
                    varfor: 'Funktionen är deriverbar överallt, så i en maximipunkt måste derivatan ' +
                        'vara noll. Termen $b\\sin 3x$ deriveras med kedjeregeln: yttre derivatan ' +
                        '$b\\cos 3x$ gånger inre derivatan $3$.',
                    text: '$$f\'(x) = 2ax - 6 + 3b\\cos 3x$$',
                },
                {
                    rubrik: 'Sätt derivatan lika med noll i x = 0',
                    varfor: 'Med $x = 0$ försvinner termen $2ax$, och $\\cos 0 = 1$. Villkoret ' +
                        '$f\'(0) = 0$ bestämmer därför $b$, men säger ingenting om $a$.',
                    text: '$$f\'(0) = 2a \\cdot 0 - 6 + 3b\\cos 0 = -6 + 3b$$\n\n' +
                        '$$-6 + 3b = 0$$\n\n' +
                        '$$-6 + 3b + 6 = 0 + 6$$\n\n' +
                        '$$3b = 6$$\n\n' +
                        '$$\\dfrac{3b}{3} = \\dfrac{6}{3}$$\n\n' +
                        '$$b = 2$$\n\n' +
                        'Med något annat värde på $b$ är $f\'(0) \\neq 0$, och då växer eller avtar ' +
                        'funktionen i $x = 0$. Då kan det inte vara ett maximum där.',
                },
                {
                    rubrik: 'Bestäm andraderivatan i x = 0',
                    varfor: 'Om punkten är ett maximum, ett minimum eller en terrasspunkt avgörs med ' +
                        'andraderivatan. Derivatan av $3b\\cos 3x$ är $-9b\\sin 3x$ (kedjeregeln igen), ' +
                        'och $\\sin 0 = 0$.',
                    text: '$$f\'\'(x) = 2a - 9b\\sin 3x$$\n\n' +
                        '$$f\'\'(0) = 2a - 9b\\sin 0 = 2a$$',
                },
                {
                    rubrik: 'Pröva tecknet på a',
                    varfor: 'Är andraderivatan negativ i en punkt där derivatan är noll vänder grafen ' +
                        'nedåt där, och punkten är en maximipunkt. Är den positiv är punkten en ' +
                        'minimipunkt.',
                    text: '- $a < 0$: $f\'\'(0) = 2a < 0$, så $x = 0$ är en maximipunkt.\n' +
                        '- $a > 0$: $f\'\'(0) = 2a > 0$, så $x = 0$ är en minimipunkt.\n' +
                        '- $a = 0$: $f\'\'(0) = 0$, och andraderivatan avgör ingenting. Fallet måste ' +
                        'undersökas för sig.',
                },
                {
                    rubrik: 'Undersök fallet a = 0',
                    varfor: 'Med $a = 0$ och $b = 2$ är $f(x) = -6x + 2\\sin 3x$. Vi studerar ' +
                        'derivatans tecken i stället. Eftersom $\\cos 3x \\leq 1$ för alla $x$ kan ' +
                        'derivatan aldrig bli positiv.',
                    text: '$$f\'(x) = -6 + 6\\cos 3x = 6(\\cos 3x - 1) \\leq 0$$\n\n' +
                        'Derivatan är noll bara där $\\cos 3x = 1$, det vill säga där $3x = n \\cdot 2\\pi$, ' +
                        'alltså $x = n \\cdot \\dfrac{2\\pi}{3}$. Det är isolerade punkter, och däremellan ' +
                        'är derivatan negativ. Funktionen är därför strängt avtagande, så $f(x) > f(0)$ ' +
                        'för $x < 0$. Punkten $x = 0$ är en terrasspunkt och inget maximum.',
                    figur: 'u19-s5',
                },
                {
                    rubrik: 'Sammanfatta villkoren',
                    varfor: 'Maximum i $x = 0$ kräver $b = 2$, och av fallen för $a$ ger bara $a < 0$ ' +
                        'ett maximum.',
                    text: '$$a < 0 \\qquad \\text{och} \\qquad b = 2$$',
                },
            ],
            svar: 'Funktionen har ett maximum då $x = 0$ om $a < 0$ och $b = 2$.',
            bedomning: [
                ['Godtagbar ansats, till exempel bestämmer $b$ korrekt, $b = 2$', '+C'],
                ['med godtagbar fortsättning som visar att funktionen har maximum för $x = 0$ om $a < 0$ och $b = 2$', '+A'],
                ['med i övrigt godtagbar lösning som även utreder fallet $a = 0$, med korrekt svar ($a < 0$ och $b = 2$)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        }
    );
})();

// Fysiklabbet: Nationellt prov Matematik 4, våren 2018, DELPROV D
// (uppgift 20–27, fullständiga lösningar, digitala verktyg tillåtna).
// Pushas in i provhuvudet i data/np/ma4-vt2018.js under utvecklingen.
// Format och regler: se data/np/RIKTLINJER.md. Figurerna genereras av
// .claude/np-figs/gen-ma4-vt2018-D.js (data/np/ma4-vt2018-figurer-D.js),
// pennlösningarna ligger i data/np/ma4-vt2018-delD-penna.js.
//
// Alla värden är omräknade numeriskt (integraler med Simpsons metod,
// skärningspunkten med intervallhalvering). Ingen uppgift i delprovet
// prövar stoff som lämnat kursen, så ingen är märkt med `utgatt`.
(function () {
    var P = window.NP_PROV && window.NP_PROV['ma4-vt2018'];
    if (!P) return;
    P.uppgifter.push(

        {
            nr: 20, del: 'D', poang: [4, 0, 0], omrade: 'Trigonometrisk modell och derivata',
            genomgangar: ['ma4-1.15', 'ma4-2.5', 'ma4-2.3'],
            fraga: 'Temperaturen i ett växthus varierar under ett dygn enligt\n\n' +
                '$$y = 20 + 15\\sin\\left(\\frac{\\pi x}{12}\\right)$$\n\n' +
                'där $y$ är temperaturen i °C och $x$ är tiden i timmar räknat från klockan 9.00.\n\n' +
                '**a)** Bestäm vid vilket klockslag som temperaturen i växthuset är högst.\n\n' +
                '**b)** Bestäm hur snabbt temperaturen ökar i växthuset klockan 12.00.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Se när temperaturen är som högst',
                    varfor: 'Sinusfaktorn är som mest $1$, och då är temperaturen ' +
                        '$20 + 15 \\cdot 1 = 35\\ ^\\circ\\mathrm{C}$. Sinus är $1$ när vinkeln är ' +
                        '$\\dfrac{\\pi}{2}$ (plus hela varv). Perioden är ' +
                        '$2\\pi \\cdot \\dfrac{12}{\\pi} = 24$&nbsp;timmar, så under ett dygn finns bara ' +
                        'en topp: nästa ligger ett helt dygn senare.',
                    text: '$$\\sin\\left(\\frac{\\pi x}{12}\\right) = 1 \\quad \\text{när} \\quad ' +
                        '\\frac{\\pi x}{12} = \\frac{\\pi}{2}$$',
                    figur: 'u20-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Multiplicera båda led med 12',
                    varfor: 'Nämnaren $12$ försvinner om båda led multipliceras med $12$.',
                    text: '$$\\frac{\\pi x}{12} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{12} = ' +
                        '\\frac{\\pi}{2} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{12}$$\n\n' +
                        '$$\\pi x = 6\\pi$$',
                },
                {
                    del: 'a',
                    rubrik: 'Dividera båda led med π',
                    varfor: 'Nu står $x$ multiplicerat med talet $\\pi$. Division med $\\pi$ i båda ' +
                        'led lämnar $x$ ensamt.',
                    text: '$$\\frac{\\pi x}{\\boldsymbol{\\pi}} = \\frac{6\\pi}{\\boldsymbol{\\pi}}$$\n\n' +
                        '$$x = 6$$\n\n' +
                        'Med digitalt verktyg: skriv först in `f(x) = 20 + 15sin(πx/12)` i GeoGebra. ' +
                        'Därefter ger `Extrempunkt(f, 0, 24)` punkten $(6, 35)$, samma $x$.',
                },
                {
                    del: 'a',
                    rubrik: 'Översätt x till ett klockslag',
                    varfor: '$x$ räknas i timmar från klockan 9.00. Sex timmar efter 9.00 är 15.00.',
                    text: '$$9 + 6 = 15$$\n\n' +
                        'Temperaturen är högst klockan 15.00, och den är då $35\\ ^\\circ\\mathrm{C}$.',
                    delsvar: { del: 'a', text: 'Klockan 15.00' },
                },
                {
                    del: 'b',
                    rubrik: 'Tolka hur snabbt temperaturen ökar som derivatan',
                    varfor: 'Hur snabbt temperaturen ändras vid ett visst klockslag är derivatan ' +
                        '$y\'(x)$ där. Klockan 12.00 är tre timmar efter 9.00, alltså $x = 3$.',
                    text: '$$\\text{Sökt: } y\'(3)$$',
                },
                {
                    del: 'b',
                    rubrik: 'Derivera modellen',
                    varfor: 'Derivatan av $\\sin(kx)$ är $k\\cos(kx)$: den inre derivatan ' +
                        '$\\dfrac{\\pi}{12}$ kommer ut som faktor (kedjeregeln). Konstanten $20$ ' +
                        'har derivatan $0$. Bråket $\\dfrac{15\\pi}{12}$ förkortas sedan med $3$.',
                    text: '$$y\'(x) = 15 \\cdot \\frac{\\pi}{12} \\cos\\left(\\frac{\\pi x}{12}\\right) = ' +
                        '\\frac{15\\pi}{12} \\cos\\left(\\frac{\\pi x}{12}\\right) = ' +
                        '\\frac{5\\pi}{4} \\cos\\left(\\frac{\\pi x}{12}\\right)$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna y′(3)',
                    varfor: 'Sätt in $x = 3$ och räkna i radianer. Vinkeln blir ' +
                        '$\\dfrac{3\\pi}{12} = \\dfrac{\\pi}{4}$, och $\\cos \\dfrac{\\pi}{4} = ' +
                        '\\dfrac{\\sqrt{2}}{2}$. I GeoGebra ger `f\'(3)` samma värde. Enheten är ' +
                        'grader per timme, eftersom $y$ mäts i °C och $x$ i timmar.',
                    text: '$$y\'(3) = \\frac{5\\pi}{4} \\cos\\frac{\\pi}{4} = \\frac{5\\pi}{4} \\cdot ' +
                        '\\frac{\\sqrt{2}}{2} = \\frac{5\\sqrt{2}\\,\\pi}{8} = 2{,}776\\ldots \\approx 2{,}8$$\n\n' +
                        '**Rimlighet:** derivatan är positiv, och det stämmer: klockan 12.00 är ' +
                        'temperaturen fortfarande på väg upp mot toppen klockan 15.00.',
                    figur: 'u20-s2',
                    delsvar: { del: 'b', text: 'Cirka $2{,}8\\ ^\\circ\\mathrm{C/h}$' },
                },
            ],
            svar: '**a)** Klockan 15.00&emsp;&emsp;**b)** Cirka $2{,}8\\ ^\\circ\\mathrm{C/h}$',
            bedomning: [
                ['a) Godtagbar ansats, till exempel bestämmer det värde på $x$ som ger maximum, $x = 6$', '+E'],
                ['a) med i övrigt godtagbar lösning med godtagbart svar (15.00)', '+E'],
                ['b) Godtagbar ansats, inser att $y\'(3)$ ska bestämmas', '+E'],
                ['b) med i övrigt godtagbar lösning med godtagbart svar inklusive korrekt enhet ($2{,}8\\ ^\\circ\\mathrm{C/h}$)', '+E'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [2, 1, 0], omrade: 'Integraler: area mellan kurvor',
            genomgangar: ['ma4-3.4', 'ma4-3.2', 'ma4-3.1'],
            fraga: 'Figuren visar graferna till funktionerna $f(x) = 2\\cos\\dfrac{x}{2}$ och ' +
                '$g(x) = 5\\ln x$.\n\n' +
                'De två funktionernas grafer innesluter tillsammans med de positiva ' +
                'koordinataxlarna det område som skuggats i figuren.\n\n' +
                'Bestäm arean av det skuggade området och svara med minst tre värdesiffror.',
            figur: 'u21',
            steg: [
                {
                    rubrik: 'Bestäm skärningspunkten mellan kurvorna',
                    varfor: 'Området slutar där kurvorna skär varandra. Ekvationen ' +
                        '$2\\cos\\dfrac{x}{2} = 5\\ln x$ går inte att lösa algebraiskt, så den löses ' +
                        'med verktyget. Skriv in `f(x) = 2cos(x/2)` och `g(x) = 5ln(x)` i GeoGebra och ' +
                        'använd `Skärning(f, g, 1)`, där $1$ är ett startvärde nära skärningen ' +
                        '(eller `NLös(2cos(x/2) = 5ln(x))`). Spara värdet som $a$ utan att avrunda.',
                    text: '$$2\\cos\\frac{x}{2} = 5\\ln x \\quad \\Longleftrightarrow \\quad ' +
                        'x = a \\approx 1{,}3641$$',
                    figur: 'u21-s1',
                },
                {
                    rubrik: 'Bestäm var g skär x-axeln',
                    varfor: 'Området begränsas nedåt av $x$-axeln fram till den punkt där ' +
                        '$g(x) = 5\\ln x$ börjar, och $\\ln x = 0$ när $x = 1$.',
                    text: '$$5\\ln x = 0 \\quad \\Longleftrightarrow \\quad \\ln x = 0 ' +
                        '\\quad \\Longleftrightarrow \\quad x = 1$$',
                },
                {
                    rubrik: 'Dela upp arean i två integraler',
                    varfor: 'Ta hela arean under $f$ från $x = 0$ till $x = a$, och dra sedan ' +
                        'bort biten under $g$ mellan $x = 1$ och $x = a$, som inte hör till ' +
                        'området. Båda kurvorna ligger ovanför $x$-axeln där de integreras.',
                    text: '$$A = \\int_{0}^{a} 2\\cos\\frac{x}{2}\\, \\mathrm{d}x - ' +
                        '\\int_{1}^{a} 5\\ln x\\, \\mathrm{d}x$$',
                    figur: 'u21-s2',
                },
                {
                    rubrik: 'Beräkna den första integralen',
                    varfor: 'En primitiv funktion till $2\\cos\\dfrac{x}{2}$ är $4\\sin\\dfrac{x}{2}$: ' +
                        'deriveras den kommer den inre derivatan $\\dfrac{1}{2}$ ut som faktor, ' +
                        'och $4 \\cdot \\dfrac{1}{2} = 2$. Vid den undre gränsen är ' +
                        '$\\sin 0 = 0$.',
                    text: '$$\\int_{0}^{a} 2\\cos\\frac{x}{2}\\, \\mathrm{d}x = ' +
                        '\\Big[ 4\\sin\\frac{x}{2} \\Big]_{0}^{a} = 4\\sin\\frac{a}{2} - 4\\sin 0 = ' +
                        '2{,}5215\\ldots$$',
                },
                {
                    rubrik: 'Beräkna den andra integralen digitalt',
                    varfor: 'En primitiv funktion till $\\ln x$ ingår inte i kursen, så den ' +
                        'integralen räknas med verktyget: `Integral(5ln(x), 1, a)` med det ' +
                        'sparade värdet $a$.',
                    text: '$$\\int_{1}^{a} 5\\ln x\\, \\mathrm{d}x = 0{,}2972\\ldots$$',
                },
                {
                    rubrik: 'Subtrahera och avrunda',
                    varfor: 'Uppgiften vill ha minst tre värdesiffror.',
                    text: '$$A = 2{,}5215\\ldots - 0{,}2972\\ldots = 2{,}2243\\ldots \\approx 2{,}22$$\n\n' +
                        '**Rimlighet:** området är knappt $1{,}4$ brett och mellan cirka $1{,}55$ och $2$ ' +
                        'högt. En rektangel på $1{,}36 \\cdot 1{,}8$ har arean cirka $2{,}5$, och ' +
                        'en liten bit nere till höger saknas. Svaret $2{,}22$ är rimligt.',
                },
            ],
            svar: 'Arean är cirka $2{,}22$&nbsp;areaenheter.',
            bedomning: [
                ['Godtagbar ansats, bestämmer minst en av intervallgränserna $x = 1$ eller $x = 1{,}364$', '+E'],
                ['med godtagbar fortsättning, till exempel tecknar ett korrekt uttryck för bestämning av någon relevant area, till exempel $\\displaystyle\\int_{1}^{1{,}364} 5\\ln x\\,\\mathrm{d}x$', '+E'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($2{,}22$&nbsp;areaenheter; svar utan enhet eller med felaktig enhet ges poäng)', '+C'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [0, 2, 0], omrade: 'Integraler: kurvans längd',
            genomgangar: ['ma4-2.5', 'ma4-2.3'],
            fraga: 'Vid ett visst tillfälle kan formen av en huggorm som ringlar längs marken ' +
                'beskrivas med den enkla modellen $y = 5\\sin\\left(\\dfrac{x}{3}\\right)$, där $x$ ' +
                'och $y$ är sträckor i cm. Se figur.\n\n' +
                'Ormens svansspets ligger i origo och ormens nos där $x = 40$.\n\n' +
                'Längden $L$ av en kurva som ges av $y = f(x)$ från $x = a$ till $x = b$ kan ' +
                'beräknas med formeln\n\n' +
                '$$L = \\int_{a}^{b} \\sqrt{1 + (f\'(x))^2}\\, \\mathrm{d}x$$\n\n' +
                'Beräkna ormens längd.',
            figur: 'u22',
            steg: [
                {
                    rubrik: 'Förstå formeln',
                    varfor: 'En kort bit av kurvan är nästan rak. Går den $\\mathrm{d}x$ i sidled ' +
                        'och $\\mathrm{d}y = f\'(x)\\,\\mathrm{d}x$ i höjdled är dess längd ' +
                        'hypotenusan $\\sqrt{(\\mathrm{d}x)^2 + (\\mathrm{d}y)^2} = ' +
                        '\\sqrt{1 + (f\'(x))^2}\\,\\mathrm{d}x$. Integralen lägger ihop alla ' +
                        'bitarna. Formeln behöver bara derivatan.',
                    text: '$$\\mathrm{d}L = \\sqrt{1 + (f\'(x))^2}\\, \\mathrm{d}x$$',
                    figur: 'u22-s1',
                },
                {
                    rubrik: 'Derivera modellen',
                    varfor: 'Derivatan av $\\sin\\dfrac{x}{3}$ är $\\cos\\dfrac{x}{3}$ gånger den ' +
                        'inre derivatan $\\dfrac{1}{3}$ (kedjeregeln).',
                    text: '$$f(x) = 5\\sin\\frac{x}{3} \\quad \\Longrightarrow \\quad ' +
                        'f\'(x) = 5 \\cdot \\frac{1}{3}\\cos\\frac{x}{3} = \\frac{5}{3}\\cos\\frac{x}{3}$$',
                },
                {
                    rubrik: 'Sätt in derivatan och gränserna i formeln',
                    varfor: 'Ormen går från svansspetsen i $x = 0$ till nosen i $x = 40$, så ' +
                        'det är gränserna.',
                    text: '$$L = \\int_{0}^{40} \\sqrt{1 + \\left(\\frac{5}{3}\\cos\\frac{x}{3}\\right)^2}\\, ' +
                        '\\mathrm{d}x$$',
                },
                {
                    rubrik: 'Beräkna integralen digitalt',
                    varfor: 'Integranden har ingen primitiv funktion som går att skriva upp med ' +
                        'kursens funktioner, så verktyget räknar: ' +
                        '`Integral(sqrt(1 + (5/3 cos(x/3))^2), 0, 40)` i GeoGebra.',
                    text: '$$L = 61{,}088\\ldots \\approx 61$$\n\n' +
                        '**Rimlighet:** ormen sträcker sig $40$&nbsp;cm i sidled men slingrar sig ' +
                        'upp och ned $10$&nbsp;cm på varje halv period (knappt $9{,}5$&nbsp;cm i ' +
                        'sidled). Den raka sträckan mellan en topp och en dal är ' +
                        '$\\sqrt{9{,}4^2 + 10^2} \\approx 13{,}7$, alltså cirka $1{,}45$ gånger ' +
                        'så lång som förflyttningen i sidled. $1{,}45 \\cdot 40 \\approx 58$, och ' +
                        'den böjda kurvan är lite längre än de raka bitarna.',
                },
            ],
            svar: 'Ormen är cirka $61$&nbsp;cm lång.',
            bedomning: [
                ['Godtagbar ansats, till exempel ställer upp ett korrekt uttryck för beräkning av ormens längd, $\\displaystyle\\int_0^{40} \\sqrt{1 + \\left(\\frac{5}{3}\\cos\\frac{x}{3}\\right)^2}\\,\\mathrm{d}x$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($61$&nbsp;cm)', '+C'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [0, 3, 0], omrade: 'Trigonometri: additionsformeln för sinus',
            genomgangar: ['ma4-1.8', 'ma4-1.1'],
            fraga: 'I figuren är vinklarna $u$ och $v$ markerade.\n\n' +
                'Värdet på $\\sin(u + v)$ kan skrivas som $\\dfrac{\\sqrt{A}}{B}$ där $A$ och $B$ ' +
                'är heltal.\n\n' +
                'Bestäm $A$ och $B$.',
            figur: 'u23',
            steg: [
                {
                    rubrik: 'Använd additionsformeln för sinus',
                    varfor: 'Vinklarna $u$ och $v$ sitter i var sin rätvinklig triangel. Var för ' +
                        'sig går deras sinus- och cosinusvärden att läsa av som kvoter mellan ' +
                        'sidor. Additionsformeln sätter ihop dem.',
                    text: '$$\\sin(u + v) = \\sin u \\cos v + \\cos u \\sin v$$',
                },
                {
                    rubrik: 'Bestäm hypotenusan i den vänstra triangeln',
                    varfor: 'Den vänstra triangeln har kateterna $8$ och $4$. Sidan $4$ slutar på ' +
                        'diagonalen, så den vänstra triangelns hypotenusa är bara den övre delen av ' +
                        'diagonalen. Hela diagonalen är den högra triangelns hypotenusa.',
                    text: '$$c_1 = \\sqrt{8^2 + 4^2} = \\sqrt{80}$$',
                },
                {
                    rubrik: 'Läs av sin u och cos u',
                    varfor: 'Sett från vinkeln $u$ är sidan $4$ den motstående kateten och sidan ' +
                        '$8$ den närliggande. Ingen avrundning: rötterna får stå kvar.',
                    text: '$$\\sin u = \\frac{4}{\\sqrt{80}} \\qquad \\cos u = \\frac{8}{\\sqrt{80}}$$',
                    figur: 'u23-s1',
                },
                {
                    rubrik: 'Gör samma sak i den högra triangeln',
                    varfor: 'Den högra triangeln har kateterna $8$ och $6$, och hypotenusan blir ' +
                        'ett heltal. Sett från $v$ är $6$ motstående och $8$ närliggande katet.',
                    text: '$$c_2 = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$$\n\n' +
                        '$$\\sin v = \\frac{6}{10} \\qquad \\cos v = \\frac{8}{10}$$',
                    figur: 'u23-s2',
                },
                {
                    rubrik: 'Sätt in värdena i additionsformeln',
                    varfor: 'Multiplicera täljare med täljare och nämnare med nämnare. Båda ' +
                        'termerna får samma nämnare, $10\\sqrt{80}$, så de kan läggas ihop.',
                    text: '$$\\sin(u + v) = \\frac{4}{\\sqrt{80}} \\cdot \\frac{8}{10} + ' +
                        '\\frac{8}{\\sqrt{80}} \\cdot \\frac{6}{10} = \\frac{32}{10\\sqrt{80}} + ' +
                        '\\frac{48}{10\\sqrt{80}} = \\frac{80}{10\\sqrt{80}}$$',
                },
                {
                    rubrik: 'Skriv om till formen √A genom B',
                    varfor: 'Eftersom $80 = \\sqrt{80} \\cdot \\sqrt{80}$ kan en faktor ' +
                        '$\\sqrt{80}$ förkortas bort ur täljare och nämnare.',
                    text: '$$\\frac{80}{10\\sqrt{80}} = \\frac{\\sqrt{80} \\cdot \\sqrt{80}}{10\\sqrt{80}} = ' +
                        '\\frac{\\sqrt{80}}{10}$$\n\n' +
                        'Alltså $A = 80$ och $B = 10$.\n\n' +
                        '**Kontroll:** $u = \\arctan\\dfrac{4}{8} \\approx 26{,}6^\\circ$ och ' +
                        '$v = \\arctan\\dfrac{6}{8} \\approx 36{,}9^\\circ$, så ' +
                        '$\\sin(u + v) \\approx \\sin 63{,}4^\\circ \\approx 0{,}894$. Och ' +
                        '$\\dfrac{\\sqrt{80}}{10} \\approx 0{,}894$. (Svaret kan också skrivas ' +
                        '$\\dfrac{\\sqrt{20}}{5}$, alltså $A = 20$ och $B = 5$.)',
                },
            ],
            svar: '$A = 80$ och $B = 10$, eftersom $\\sin(u + v) = \\dfrac{\\sqrt{80}}{10}$ ' +
                '(även till exempel $A = 20$ och $B = 5$ fungerar).',
            bedomning: [
                ['Godtagbar ansats, till exempel använder additionsformeln för sinus och bestämmer minst ett av värdena $\\cos u$, $\\cos v$, $\\sin u$ eller $\\sin v$', '+C'],
                ['med godtagbar fortsättning, till exempel sätter in samtliga värden i additionsformeln, $\\dfrac{4}{\\sqrt{80}} \\cdot \\dfrac{8}{10} + \\dfrac{8}{\\sqrt{80}} \\cdot \\dfrac{6}{10}$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar (till exempel $A = 80$, $B = 10$)', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [0, 2, 0], omrade: 'Täthetsfunktioner',
            genomgangar: ['ma4-3.6', 'ma4-3.2'],
            fraga: 'Inför antagningen till en högskola skriver alla sökande ett prov. Provtiden ' +
                'är 2&nbsp;timmar. Det har visat sig att tiden $t$ timmar som de sökande använder ' +
                'för att skriva provet har en fördelning som kan beskrivas med täthetsfunktionen\n\n' +
                '$$f(t) = \\frac{15t^5 - 7t^6}{32} \\quad \\text{där} \\quad 0 \\leq t \\leq 2$$\n\n' +
                'Bestäm sannolikheten att en sökande blir klar med provet under den sista ' +
                'halvtimmen.',
            figur: null,
            steg: [
                {
                    rubrik: 'Teckna sannolikheten som en integral',
                    varfor: 'Den sista halvtimmen är tiden mellan $t = 1{,}5$ och $t = 2$. För en ' +
                        'täthetsfunktion är sannolikheten arean under kurvan över intervallet.',
                    text: '$$P(1{,}5 \\leq t \\leq 2) = \\int_{1{,}5}^{2} \\frac{15t^5 - 7t^6}{32}\\, ' +
                        '\\mathrm{d}t$$',
                    figur: 'u24-s1',
                },
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'Ta fram den primitiva funktionen term för term: öka exponenten med ' +
                        'ett och dividera med den nya exponenten. Konstanten $\\dfrac{1}{32}$ ' +
                        'följer med som faktor.',
                    text: '$$F(t) = \\frac{1}{32}\\left( \\frac{15t^6}{6} - \\frac{7t^7}{7} \\right) = ' +
                        '\\frac{2{,}5t^6 - t^7}{32}$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Sannolikheten är $F(2) - F(1{,}5)$. Med digitalt verktyg ger ' +
                        '`Integral((15t^5 - 7t^6)/32, 1.5, 2)` samma värde.',
                    text: '$$F(2) = \\frac{2{,}5 \\cdot 64 - 128}{32} = \\frac{32}{32} = 1$$\n\n' +
                        'Täljaren i $F(1{,}5)$: $2{,}5 \\cdot 1{,}5^6 - 1{,}5^7 = 28{,}4765625 - 17{,}0859375 = ' +
                        '11{,}390625$.\n\n' +
                        '$$F(1{,}5) = \\frac{2{,}5 \\cdot 1{,}5^6 - 1{,}5^7}{32} = ' +
                        '\\frac{11{,}390625}{32} = 0{,}3559\\ldots$$\n\n' +
                        '$$P(1{,}5 \\leq t \\leq 2) = 1 - 0{,}3559\\ldots = 0{,}6440\\ldots \\approx 0{,}64$$',
                },
                {
                    rubrik: 'Pröva rimligheten',
                    varfor: '$F(2) - F(0) = 1 - 0 = 1$, så hela arean under kurvan är $1$, som den ' +
                        'ska vara för en täthetsfunktion. Kurvan har sin topp vid ' +
                        '$t = \\dfrac{75}{42} \\approx 1{,}8$, alltså under den sista halvtimmen. ' +
                        'Att de flesta blir klara då är rimligt.',
                    text: 'Sannolikheten är cirka $0{,}64$, alltså cirka $64\\ \\%$.',
                },
            ],
            svar: 'Sannolikheten är cirka $0{,}64$.',
            bedomning: [
                ['Godtagbar ansats, till exempel ställer upp korrekt integral, $\\displaystyle\\int_{1{,}5}^{2} \\frac{15t^5 - 7t^6}{32}\\,\\mathrm{d}t$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($0{,}64$)', '+C'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 0, 2], omrade: 'Rotationskroppar: rotation kring en vågrät linje',
            genomgangar: ['ma4-3.7', 'ma4-3.3'],
            fraga: 'Ett område begränsas av kurvan $y = x^2 - 4$ och linjen $y = 5$.\n\n' +
                'Bestäm volymen som bildas när detta område roterar runt linjen $y = 5$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm var kurvan skär linjen',
                    varfor: 'Området ligger mellan kurvan och linjen, från den ena skärningen ' +
                        'till den andra. Addera $4$ till båda led och dra sedan roten ur.',
                    text: '$$x^2 - 4 = 5$$\n\n' +
                        '$$x^2 - 4 \\mathbin{\\boldsymbol{+}} \\boldsymbol{4} = 5 \\mathbin{\\boldsymbol{+}} \\boldsymbol{4}$$\n\n' +
                        '$$x^2 = 9$$\n\n' +
                        '$$x = \\pm\\sqrt{9}$$\n\n' +
                        '$$x = \\pm 3$$',
                    figur: 'u25-s1',
                },
                {
                    rubrik: 'Bestäm skivornas radie',
                    varfor: 'Varje tunn skiva vinkelrätt mot $x$-axeln roterar runt linjen ' +
                        '$y = 5$ och blir en cylinder. Radien är avståndet från linjen ned till ' +
                        'kurvan: linjens $y$-värde minus kurvans.',
                    text: '$$r(x) = 5 - (x^2 - 4) = 5 - x^2 + 4 = 9 - x^2$$',
                    figur: 'u25-s2',
                },
                {
                    rubrik: 'Teckna volymen med skivmetoden',
                    varfor: 'En skiva med radien $r$ och tjockleken $\\mathrm{d}x$ har volymen ' +
                        '$\\pi r^2\\,\\mathrm{d}x$. Volymen är summan av alla skivor från ' +
                        '$x = -3$ till $x = 3$. Det är samma formel som vid rotation runt ' +
                        '$x$-axeln, men med radien $9 - x^2$ i stället för $y$.',
                    text: '$$V = \\pi \\int_{-3}^{3} (9 - x^2)^2\\, \\mathrm{d}x$$',
                },
                {
                    rubrik: 'Utveckla kvadraten',
                    varfor: 'Kvadreringsregeln $(a - b)^2 = a^2 - 2ab + b^2$ med $a = 9$ och ' +
                        '$b = x^2$ ger ett polynom, som är lätt att integrera.',
                    text: '$$V = \\pi \\int_{-3}^{3} \\left( 81 - 18x^2 + x^4 \\right) \\mathrm{d}x$$',
                },
                {
                    rubrik: 'Integrera och sätt in gränserna',
                    varfor: 'Primitiv funktion term för term. Den undre gränsen $-3$ ger ' +
                        'motsatta värden, eftersom varje term har udda exponent.',
                    text: '$$V = \\pi \\Big[ 81x - 6x^3 + \\frac{x^5}{5} \\Big]_{-3}^{3}$$\n\n' +
                        '$$V = \\pi \\big( (243 - 162 + 48{,}6) - (-243 + 162 - 48{,}6) \\big) = ' +
                        '\\pi (129{,}6 + 129{,}6)$$\n\n' +
                        '$$V = 259{,}2\\pi = 814{,}30\\ldots \\approx 814$$\n\n' +
                        'Med digitalt verktyg: `pi * Integral((9 - x^2)^2, -3, 3)` ger samma värde.\n\n' +
                        '**Rimlighet:** en cylinder med radien $9$ och längden $6$ har volymen ' +
                        '$\\pi \\cdot 81 \\cdot 6 \\approx 1\\,500$. Kroppen är lika tjock bara på ' +
                        'mitten och smalnar av mot ändarna, så ungefär hälften är rimligt.',
                },
            ],
            svar: 'Volymen är $259{,}2\\pi \\approx 814$&nbsp;volymenheter.',
            bedomning: [
                ['Godtagbar ansats, inser att volymen består av skivor med radien $9 - x^2$ eller inser att funktionen kan förskjutas 5&nbsp;enheter i $y$-led för att få rotation runt $x$-axeln', '+A'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($814$&nbsp;volymenheter; svar utan enhet eller med felaktig enhet ges poäng)', '+A'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 1, 3], omrade: 'Derivata: kedjeregeln och produktregeln',
            genomgangar: ['ma4-2.3', 'ma4-2.7'],
            fraga: 'Funktionen $h$ definieras genom $h(x) = (f(x))^2$.\n\n' +
                'Bestäm $h\'\'(0)$ för alla funktioner $f$ med följande egenskaper:\n\n' +
                '- $f(0) = -1$\n' +
                '- $f\'(0) = 3$\n' +
                '- $f\'\'(0) = 2$',
            figur: null,
            steg: [
                {
                    rubrik: 'Derivera h en gång med kedjeregeln',
                    varfor: 'Funktionen $h$ är sammansatt: den yttre funktionen är kvadreringen ' +
                        'och den inre är $f(x)$. Yttre derivatan $2f(x)$ gånger inre derivatan ' +
                        '$f\'(x)$.',
                    text: '$$h\'(x) = 2f(x) \\cdot f\'(x)$$',
                },
                {
                    rubrik: 'Derivera en gång till med produktregeln',
                    varfor: 'Nu är $h\'(x)$ en produkt av två funktioner, $f(x)$ och $f\'(x)$, ' +
                        'med konstanten $2$ framför. Produktregeln: derivatan av den första ' +
                        'gånger den andra plus den första gånger derivatan av den andra.',
                    text: '$$h\'\'(x) = 2\\big( f\'(x) \\cdot f\'(x) + f(x) \\cdot f\'\'(x) \\big)$$\n\n' +
                        '$$h\'\'(x) = 2f\'(x) \\cdot f\'(x) + 2f(x) \\cdot f\'\'(x)$$',
                },
                {
                    rubrik: 'Sätt in x = 0',
                    varfor: 'Uttrycket innehåller bara $f(0)$, $f\'(0)$ och $f\'\'(0)$, och dem ' +
                        'känner vi.',
                    text: '$$h\'\'(0) = 2 \\cdot 3 \\cdot 3 + 2 \\cdot (-1) \\cdot 2 = 18 - 4 = 14$$',
                },
                {
                    rubrik: 'Konstatera att svaret gäller alla sådana f',
                    varfor: 'Uppgiften frågar efter $h\'\'(0)$ för alla funktioner med de tre ' +
                        'egenskaperna. Eftersom $h\'\'(0)$ bara beror på de tre givna värdena ' +
                        'blir det samma tal för varje sådan funktion.',
                    text: '$h\'\'(0) = 14$ för alla funktioner $f$ med de givna egenskaperna.\n\n' +
                        '**Kontroll med ett exempel:** $f(x) = x^2 + 3x - 1$ har $f(0) = -1$, ' +
                        '$f\'(0) = 3$ och $f\'\'(0) = 2$. Då är ' +
                        '$h(x) = (x^2 + 3x - 1)^2 = x^4 + 6x^3 + 7x^2 - 6x + 1$, så ' +
                        '$h\'\'(x) = 12x^2 + 36x + 14$ och $h\'\'(0) = 14$.',
                },
            ],
            svar: '$h\'\'(0) = 14$',
            bedomning: [
                ['Godtagbar ansats, bestämmer $h\'\'(0)$ för ett specialfall eller bestämmer $h\'(x) = 2f(x) \\cdot f\'(x)$', '+C'],
                ['med godtagbar fortsättning, bestämmer $h\'\'(x) = 2f\'(x) \\cdot f\'(x) + 2f(x) \\cdot f\'\'(x)$', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($14$)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 0, 2], omrade: 'Derivata: kedjeregeln och tangens',
            genomgangar: ['ma4-2.7', 'ma4-2.4', 'ma4-1.1'],
            fraga: 'En laserpekare är placerad på en roterande skiva. Där laserstrålen från ' +
                'laserpekaren träffar en vägg syns en röd ljuspunkt. Avståndet mellan väggen och ' +
                'den roterande skivans mittpunkt är $L$ meter. Vid tiden $t = 0$ lyser laserstrålen ' +
                'vinkelrätt mot väggen, se figur 1.\n\n' +
                'Skivan med laserpekaren roterar så att den röda ljuspunkten rör sig åt höger längs ' +
                'väggen. Vid tiden $t$ sekunder har skivan roterat vinkeln $\\alpha$ radianer och ' +
                'ljuspunkten rört sig sträckan $x$ meter längs väggen. Se figur 2.\n\n' +
                'Skivan roterar med konstant vinkelhastighet $C$ radianer/s så att ' +
                '$\\alpha = C \\cdot t$.\n\n' +
                'Ljuspunkten rör sig längs väggen med hastigheten $\\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$.\n\n' +
                'Bestäm ett uttryck för hastigheten $\\dfrac{\\mathrm{d}x}{\\mathrm{d}t}$.',
            figur: 'u27',
            steg: [
                {
                    rubrik: 'Hitta en rätvinklig triangel',
                    varfor: 'Skivans mittpunkt, ljuspunktens startläge och ljuspunkten nu bildar ' +
                        'en rätvinklig triangel med den räta vinkeln vid väggen. Sett från ' +
                        'vinkeln $\\alpha$ är $x$ den motstående kateten och $L$ den närliggande.',
                    text: '$$\\tan \\alpha = \\frac{x}{L}$$',
                    figur: 'u27-s1',
                },
                {
                    rubrik: 'Lös ut x',
                    varfor: 'Multiplicera båda led med $L$, så står $x$ ensamt. Sätt sedan in ' +
                        '$\\alpha = C \\cdot t$, så att $x$ blir en funktion av tiden.',
                    text: '$$\\tan \\alpha \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{L} = ' +
                        '\\frac{x}{L} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{L}$$\n\n' +
                        '$$x = L \\tan \\alpha = L \\tan(Ct)$$',
                },
                {
                    rubrik: 'Derivera med avseende på t',
                    varfor: '$L$ är en konstant. Derivatan av $\\tan u$ är $\\dfrac{1}{\\cos^2 u}$, ' +
                        'och eftersom vinkeln är $Ct$ kommer den inre derivatan $C$ ut som ' +
                        'faktor (kedjeregeln).',
                    text: '$$\\frac{\\mathrm{d}x}{\\mathrm{d}t} = L \\cdot \\frac{1}{\\cos^2(Ct)} \\cdot C = ' +
                        '\\frac{CL}{\\cos^2(Ct)}$$',
                },
                {
                    rubrik: 'Pröva rimligheten',
                    varfor: 'Vid $t = 0$ är $\\cos 0 = 1$, så hastigheten är $CL$: precis som en ' +
                        'punkt på en cirkel med radien $L$. När $Ct$ närmar sig ' +
                        '$\\dfrac{\\pi}{2}$ går cosinus mot $0$ och hastigheten växer obegränsat, ' +
                        'eftersom strålen då nästan är parallell med väggen. Enheten blir m/s.',
                    text: '$$\\frac{\\mathrm{d}x}{\\mathrm{d}t} = \\frac{CL}{\\cos^2(Ct)} = ' +
                        '\\frac{CL}{\\cos^2 \\alpha}\\ \\ \\mathrm{m/s}$$',
                },
            ],
            svar: '$\\dfrac{\\mathrm{d}x}{\\mathrm{d}t} = \\dfrac{CL}{\\cos^2(Ct)}$ (eller ' +
                '$\\dfrac{CL}{\\cos^2 \\alpha}$) meter per sekund.',
            bedomning: [
                ['Godtagbar ansats, till exempel tecknar uttrycket $x = L\\tan(Ct)$', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar $\\left(\\dfrac{\\mathrm{d}x}{\\mathrm{d}t} = \\dfrac{CL}{\\cos^2(Ct)}\\right)$; även svaret $\\dfrac{\\mathrm{d}x}{\\mathrm{d}t} = \\dfrac{CL}{\\cos^2 \\alpha}$ godtas', '+A'],
            ],
        }
    );
})();
