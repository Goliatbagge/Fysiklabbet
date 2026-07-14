// Fysiklabbet — Nationellt prov Matematik 1c, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat:
//   nr         — uppgiftsnummer i provet (heltal)
//   del        — 'B' | 'C' | 'D' (delprov)
//   poang      — [E, C, A] maxpoäng per nivå
//   omrade     — kort ämnesetikett (visas i uppgiftslistan)
//   endastSvar — true om provet bara kräver svar (ingen redovisning)
//   fraga      — uppgiftstexten (markdown + KaTeX, dubbla backslash!)
//   figur      — nyckel i window.NP_FIGURER['ma1c-vt2022'] (eller null)
//   steg       — [{ rubrik, varfor?, text, figur?, delsvar? }]
//                REGEL: vid deluppgifter (a, b, c …) ska varje deluppgift
//                AVSLUTAS MED SITT SVAR innan nästa deluppgift påbörjas —
//                sätt delsvar: { del: 'a', text: '…' } på det steg som
//                avslutar deluppgiften. Se data/np/RIKTLINJER.md.
//   svar       — slutsvaret enligt bedömningsanvisningarna
//   bedomning  — [[krav, nivå]] enligt bedömningsanvisningarna
//   sekretess  — true om uppgiften är borttagen ur det frisläppta provet
//
// Källa: Skolverket/PRIM-gruppen. Provet återanvänds inte enligt beslut
// Dnr 6.2.1-2023:233 och får därför användas övningsmaterial.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma1c-vt2022'] = {
    id: 'ma1c-vt2022',
    kurs: 'Matematik nivå 1c',
    termin: 'VT 2022',
    namn: 'Nationellt prov Ma 1c, våren 2022',
    kort: 'NP Ma 1c VT 2022',
    intro: 'Det här är det riktiga nationella provet i Matematik 1c från våren 2022 ' +
        '(Skolverket/PRIM-gruppen — provet är frisläppt och återanvänds inte). ' +
        'Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg i taget. ' +
        'Varje steg förklarar både vad som görs och varför.',
    kravgranser: 'Provet (delprov B–D) ger totalt högst 70 poäng. Poängen skrivs (E/C/A) — ' +
        't.ex. betyder (1/0/1) att uppgiften kan ge 1 E-poäng och 1 A-poäng. ' +
        'Gräns för provbetyget: E minst 14 poäng · D minst 27 poäng varav 12 på lägst C-nivå · ' +
        'C minst 35 poäng varav 18 på lägst C-nivå · B minst 46 poäng varav 6 på A-nivå · ' +
        'A minst 55 poäng varav 11 på A-nivå.',
    delprov: {
        B: {
            tid: '60 minuter',
            hjalpmedel: 'Formelblad och linjal — inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Till uppgifterna behöver du endast ange svar.',
        },
        C: {
            tid: '60 minuter',
            hjalpmedel: 'Formelblad och linjal — inga digitala verktyg',
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
    uppgifter: [

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [1, 0, 0], omrade: 'Algebra — faktorisering',
            endastSvar: true,
            fraga: 'Faktorisera uttrycket $5x + 25$ genom att bryta ut största möjliga faktor.',
            figur: null,
            steg: [
                {
                    rubrik: 'Hitta den största gemensamma faktorn',
                    varfor: 'Att faktorisera betyder att skriva uttrycket som en produkt. ' +
                        'Vi letar efter det största tal (eller uttryck) som finns som faktor i **båda** termerna.',
                    text: 'Dela upp termerna i faktorer:\n\n' +
                        '$$5x = 5 \\cdot x \\qquad 25 = 5 \\cdot 5$$\n\n' +
                        'Båda termerna innehåller faktorn $5$ — och ingen större gemensam faktor finns ' +
                        '($x$ finns bara i den första termen).',
                },
                {
                    rubrik: 'Bryt ut faktorn 5',
                    varfor: 'När vi bryter ut $5$ skriver vi $5$ framför en parentes. Inuti parentesen ' +
                        'står det som blir kvar av varje term när $5$ "plockats bort". ' +
                        'Vi kan alltid kontrollera svaret genom att multiplicera in $5$ igen.',
                    text: '$$5x + 25 = 5(x + 5)$$\n\n' +
                        '**Kontroll:** $5(x+5) = 5 \\cdot x + 5 \\cdot 5 = 5x + 25$ — stämmer.',
                },
            ],
            svar: '$5(x + 5)$',
            bedomning: [['Korrekt svar: $5(x+5)$', '+E']],
        },

        {
            nr: 2, del: 'B', poang: [1, 0, 0], omrade: 'Räta linjen — avläsa graf',
            endastSvar: true,
            fraga: 'Vilket funktionsuttryck motsvarar grafen i koordinatsystemet?\n\n' +
                '$y = -2x + 1{,}5$\n\n$y = -2x + 3$\n\n$y = -0{,}5x + 3$\n\n$y = 2x - 1{,}5$\n\n$y = 1{,}5x + 3$',
            figur: 'u2',
            steg: [
                {
                    rubrik: 'Läs av m-värdet där linjen skär y-axeln',
                    varfor: 'En rät linje kan skrivas $y = kx + m$, där $m$ är $y$-värdet där linjen ' +
                        'korsar $y$-axeln (där $x = 0$). Det är det enklaste att läsa av först.',
                    text: 'Linjen skär $y$-axeln i punkten $(0,\\ 3)$, alltså är\n\n$$m = 3$$\n\n' +
                        'Redan nu kan vi stryka alternativen $y = -2x + 1{,}5$ och $y = 2x - 1{,}5$, ' +
                        'som har fel $m$-värde.',
                    figur: 'u2-los1',
                },
                {
                    rubrik: 'Bestäm lutningen k med ett trappsteg',
                    varfor: '$k$ talar om hur mycket $y$ ändras när $x$ ökar med $1$. ' +
                        'Vi går ett steg åt höger från en punkt på linjen och räknar hur långt linjen går uppåt eller nedåt.',
                    text: 'Utgå från $(0,\\ 3)$. När $x$ ökar med $1$ (till $x = 1$) sjunker linjen ' +
                        'med $2$ rutor, till $y = 1$. Alltså är\n\n$$k = \\dfrac{-2}{1} = -2$$\n\n' +
                        'Linjen lutar nedåt, så $k$ måste vara negativt — det stämmer med grafen.',
                    figur: 'u2-los2',
                },
                {
                    rubrik: 'Sätt ihop funktionsuttrycket',
                    text: 'Med $k = -2$ och $m = 3$ blir funktionsuttrycket\n\n$$y = -2x + 3$$',
                },
            ],
            svar: '$y = -2x + 3$',
            bedomning: [['Korrekt svar: $y = -2x + 3$', '+E']],
        },

        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Sannolikhet — utan återläggning',
            endastSvar: true,
            fraga: 'Lena har en påse med 2 gula och 3 blå vantar. ' +
                'Hon tar 2 stycken vantar utan att titta vilken färg de har. ' +
                'Vilken beräkning kan användas för att bestämma sannolikheten för att hon tar de två gula vantarna?\n\n' +
                '$\\dfrac{2}{5} \\cdot \\dfrac{2}{5} \\qquad ' +
                '\\dfrac{2}{5} \\cdot \\dfrac{1}{5} \\qquad ' +
                '\\dfrac{2}{5} \\cdot \\dfrac{2}{4} \\qquad ' +
                '\\dfrac{2}{5} \\cdot \\dfrac{1}{4} \\qquad ' +
                '\\dfrac{3}{5} \\cdot \\dfrac{2}{4}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Sannolikheten att första vanten är gul',
                    varfor: 'Sannolikhet = antal gynnsamma utfall delat med antal möjliga utfall. ' +
                        'I påsen ligger $5$ vantar och $2$ av dem är gula.',
                    text: '$$P(\\text{första gul}) = \\dfrac{2}{5}$$',
                    figur: 'u3-vantar1',
                },
                {
                    rubrik: 'Sannolikheten att även andra vanten är gul',
                    varfor: 'Lena lägger **inte tillbaka** den första vanten — det är dragning utan återläggning. ' +
                        'Då ändras både antalet vantar och antalet gula i påsen inför andra dragningen. ' +
                        'Detta är den avgörande skillnaden mot alternativen med $\\frac{2}{5}$ eller $\\frac{1}{5}$ i andra faktorn.',
                    text: 'När den första gula vanten är tagen finns $4$ vantar kvar, varav $1$ gul:\n\n' +
                        '$$P(\\text{andra gul} \\mid \\text{första gul}) = \\dfrac{1}{4}$$',
                    figur: 'u3-vantar2',
                },
                {
                    rubrik: 'Multiplicera sannolikheterna',
                    varfor: 'För att **båda** händelserna ska inträffa multipliceras sannolikheterna ' +
                        '(multiplikationsprincipen för sannolikheter i flera steg).',
                    text: '$$P(\\text{två gula}) = \\dfrac{2}{5} \\cdot \\dfrac{1}{4}$$',
                },
            ],
            svar: '$\\dfrac{2}{5} \\cdot \\dfrac{1}{4}$',
            bedomning: [['Korrekt svar: $\\frac{2}{5} \\cdot \\frac{1}{4}$', '+E']],
        },

        {
            nr: 4, del: 'B', poang: [1, 0, 0], omrade: 'Potenser — förenkling',
            endastSvar: true,
            fraga: 'Förenkla uttrycket $\\dfrac{3a^7}{12a^5}$ så långt som möjligt.',
            figur: null,
            steg: [
                {
                    rubrik: 'Förenkla siffrorna för sig',
                    varfor: 'Ett bråk med flera faktorer kan förenklas del för del: ' +
                        'först talen, sedan potenserna. Det gör beräkningen överskådlig.',
                    text: '$$\\dfrac{3}{12} = \\dfrac{1}{4}$$',
                },
                {
                    rubrik: 'Förenkla potenserna med potenslagen',
                    varfor: 'Vid division av potenser med **samma bas** subtraheras exponenterna: ' +
                        '$\\dfrac{a^m}{a^n} = a^{m-n}$.',
                    text: '$$\\dfrac{a^7}{a^5} = a^{7-5} = a^2$$',
                },
                {
                    rubrik: 'Sätt ihop delarna',
                    text: '$$\\dfrac{3a^7}{12a^5} = \\dfrac{1}{4} \\cdot a^2 = \\dfrac{a^2}{4}$$\n\n' +
                        'Svaret kan också skrivas $0{,}25a^2$.',
                },
            ],
            svar: '$\\dfrac{a^2}{4}$ (eller likvärdigt, t.ex. $0{,}25a^2$)',
            bedomning: [['Korrekt svar: $0{,}25a^2$ eller $\\frac{a^2}{4}$', '+E']],
        },

        {
            nr: 5, del: 'B', poang: [1, 0, 0], omrade: 'Statistik — korrelation',
            endastSvar: true,
            fraga: 'I diagrammen visas sex olika korrelationer mellan variablerna $x$ och $y$. ' +
                'Vilket av diagrammen A–F visar starkast korrelation?',
            figur: 'u5',
            steg: [
                {
                    rubrik: 'Vad menas med stark korrelation?',
                    varfor: 'Korrelationens **styrka** handlar om hur nära punkterna ligger en tänkt rät linje — ' +
                        'inte om linjen lutar uppåt eller nedåt. En stark korrelation kan alltså vara ' +
                        'både positiv och negativ.',
                    text: 'Vi letar efter det diagram där punkterna ligger tätast samlade kring en rät linje.',
                },
                {
                    rubrik: 'Granska diagrammen ett i taget',
                    text: '- **B** — punkterna är helt utspridda: ingen korrelation.\n' +
                        '- **E** — punkterna ligger i ett vågrätt band: $y$ påverkas inte av $x$, ingen korrelation.\n' +
                        '- **A** och **F** — tydlig riktning men punkterna spretar: måttlig korrelation.\n' +
                        '- **C** — punkterna följer en stigande linje ganska tätt: stark positiv korrelation.\n' +
                        '- **D** — punkterna ligger nästan exakt på en fallande rät linje: mycket stark negativ korrelation.',
                },
                {
                    rubrik: 'Jämför C och D',
                    varfor: 'Att D är **negativ** spelar ingen roll för styrkan — det avgörande är hur tätt ' +
                        'punkterna följer linjen.',
                    text: 'Punkterna i D ligger ännu tätare längs sin linje än punkterna i C. ' +
                        'Diagram D visar därför den starkaste korrelationen.',
                },
            ],
            svar: 'D',
            bedomning: [['Korrekt svar: D', '+E']],
        },

        {
            nr: 6, del: 'B', poang: [1, 1, 0], omrade: 'Funktioner — avläsa graf',
            endastSvar: true,
            fraga: 'Nedan visas grafen till funktionen $y = f(x)$\n\n' +
                '**a)** Bestäm $f(2)$\n\n' +
                '**b)** Lös ekvationen $f(x) = 14$',
            figur: 'u6',
            steg: [
                {
                    del: 'a', rubrik: 'Läs av funktionsvärdet där x = 2',
                    varfor: '$f(2)$ betyder "funktionens värde när $x = 2$". ' +
                        'I grafen: gå till $x = 2$ på $x$-axeln, gå lodrätt upp till kurvan ' +
                        'och läs av $y$-värdet.',
                    text: 'Vid $x = 2$ ligger kurvan på höjden $y = 8$:\n\n$$f(2) = 8$$',
                    figur: 'u6-los-a',
                    delsvar: { del: 'a', text: '$f(2) = 8$' },
                },
                {
                    del: 'b', rubrik: 'Lös ekvationen grafiskt med linjen y = 14',
                    varfor: 'Att lösa $f(x) = 14$ betyder att hitta de $x$ där kurvan har höjden $14$. ' +
                        'Observera skillnaden mot a): nu är det $y$-värdet som är känt och $x$ som söks — ' +
                        'vi läser av åt andra hållet.',
                    text: 'Dra en vågrät linje vid $y = 14$ och se var den skär kurvan. ' +
                        'Kurvans lokala maximipunkt till vänster når bara upp till $y = 12$, ' +
                        'så linjen skär kurvan på ett enda ställe — långt till höger, där kurvan stiger brant:\n\n' +
                        '$$x = 16$$',
                    figur: 'u6-los-b',
                    delsvar: { del: 'b', text: '$x = 16$' },
                },
            ],
            svar: '**a)** $f(2) = 8$ **b)** $x = 16$',
            bedomning: [
                ['a) Korrekt svar: $f(2) = 8$', '+E'],
                ['b) Korrekt svar: $x = 16$', '+C'],
            ],
        },

        {
            nr: 7, del: 'B', poang: [1, 1, 0], omrade: 'Vektorer',
            endastSvar: true,
            fraga: 'För vektorerna $\\vec{u}$, $\\vec{v}$ och $\\vec{w}$ gäller följande:\n\n' +
                '$$\\vec{u} = (2,\\ 3) \\qquad \\vec{v} = (1,\\ 2) \\qquad \\vec{w} = \\vec{u} + \\vec{v}$$\n\n' +
                '**a)** Skriv $\\vec{w}$ i koordinatform.\n\n' +
                '**b)** Bestäm $|\\vec{w}|$',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Addera vektorerna koordinatvis',
                    varfor: 'Vektorer adderas genom att $x$-koordinaterna läggs ihop för sig ' +
                        'och $y$-koordinaterna för sig — precis som att gå två förflyttningar efter varandra.',
                    text: '$$\\vec{w} = \\vec{u} + \\vec{v} = (2 + 1,\\ 3 + 2) = (3,\\ 5)$$',
                    delsvar: { del: 'a', text: '$\\vec{w} = (3,\\ 5)$' },
                },
                {
                    del: 'b', rubrik: 'Beräkna vektorns längd med Pythagoras sats',
                    varfor: '$|\\vec{w}|$ betecknar vektorns **längd**. Vektorn $(3,\\ 5)$ bildar ' +
                        'hypotenusan i en rätvinklig triangel med kateterna $3$ och $5$, ' +
                        'så längden fås med Pythagoras sats.',
                    text: '$$|\\vec{w}| = \\sqrt{3^2 + 5^2} = \\sqrt{9 + 25} = \\sqrt{34}$$\n\n' +
                        'Svaret lämnas exakt eftersom $\\sqrt{34}$ inte är ett helt tal ' +
                        '($\\sqrt{34} \\approx 5{,}8$).',
                    delsvar: { del: 'b', text: '$|\\vec{w}| = \\sqrt{34}$' },
                },
            ],
            svar: '**a)** $\\vec{w} = (3,\\ 5)$ **b)** $|\\vec{w}| = \\sqrt{34}$',
            bedomning: [
                ['a) Korrekt svar: $\\vec{w} = (3,\\ 5)$', '+E'],
                ['b) Korrekt svar: $|\\vec{w}| = \\sqrt{34}$', '+C'],
            ],
        },

        {
            nr: 8, del: 'B', poang: [0, 2, 0], omrade: 'Matematiska modeller',
            endastSvar: true,
            fraga: 'Nedan presenteras fyra olika situationer. Ange för varje situation ' +
                'om den kan beskrivas med en linjär modell, exponentiell modell eller potensmodell.\n\n' +
                '1. Totalvikten på en lastbil ökar beroende på mängden sand som lastas på flaket.\n' +
                '2. Bromssträckan för en bil beror på bilens hastighet i kvadrat.\n' +
                '3. Volymen på en deg ökar beroende på tiden, när degens volym ökar med 5 % var tionde minut.\n' +
                '4. Volymen vatten i en hink minskar beroende på tiden, när vattnet rinner ut med 2 cl per minut.',
            figur: null,
            steg: [
                {
                    rubrik: 'Känn igen de tre modelltyperna',
                    varfor: 'Nyckeln är att titta på **hur** förändringen sker: med lika stora steg, ' +
                        'med lika stora procent, eller via en potens av variabeln.',
                    text: '- **Linjär modell** $y = kx + m$ — ändras med **konstant mängd** per enhet.\n' +
                        '- **Exponentiell modell** $y = C \\cdot a^x$ — ändras med **konstant procent** per enhet.\n' +
                        '- **Potensmodell** $y = C \\cdot x^n$ — variabeln ingår som en **potens**, t.ex. $x^2$.',
                },
                {
                    rubrik: 'Klassificera situation 1 och 2',
                    text: '**1. Lastbilen:** varje kilo sand ökar totalvikten med lika mycket — ' +
                        'konstant ökning per kilo, alltså **linjär modell**.\n\n' +
                        '**2. Bromssträckan:** den beror på hastigheten *i kvadrat*, ' +
                        'dvs. $y = C \\cdot v^2$ — alltså en **potensmodell**.',
                },
                {
                    rubrik: 'Klassificera situation 3 och 4',
                    text: '**3. Degen:** volymen ökar med $5\\ \\%$ var tionde minut — konstant ' +
                        '**procentuell** förändring, alltså **exponentiell modell** ' +
                        '(förändringsfaktorn $1{,}05$ per tiominutersperiod).\n\n' +
                        '**4. Hinken:** vattnet minskar med $2$ cl varje minut — konstant mängd ' +
                        'per minut, alltså **linjär modell** (med negativ lutning).',
                },
            ],
            svar: '1. Linjär modell · 2. Potensmodell · 3. Exponentiell modell · 4. Linjär modell',
            bedomning: [
                ['Minst tre korrekta alternativ markerade', '+C'],
                ['Samtliga alternativ korrekt markerade', '+C'],
            ],
        },

        {
            nr: 9, del: 'B', poang: [0, 1, 0], omrade: 'Trigonometri',
            endastSvar: true,
            fraga: 'Vilket uttryck har samma värde som $\\sin 20\\degree$?\n\n' +
                '$\\cos 20\\degree \\qquad \\tan 20\\degree \\qquad \\sin 70\\degree \\qquad \\cos 70\\degree \\qquad \\tan 70\\degree$',
            figur: 'u9',
            steg: [
                {
                    rubrik: 'Bestäm triangelns tredje vinkel',
                    varfor: 'Vinkelsumman i en triangel är $180\\degree$. I en rätvinklig triangel är ' +
                        'de två spetsiga vinklarna därför tillsammans $90\\degree$ — de är **komplementvinklar**.',
                    text: 'Den tredje vinkeln är\n\n$$180\\degree - 90\\degree - 20\\degree = 70\\degree$$',
                    figur: 'u9-vinklar',
                },
                {
                    rubrik: 'Jämför sinus och cosinus i triangeln',
                    varfor: 'Sinus = motstående katet genom hypotenusan; cosinus = närliggande katet ' +
                        'genom hypotenusan. Samma sida kan vara *motstående* för den ena vinkeln och ' +
                        '*närliggande* för den andra.',
                    text: 'Kalla sidan mitt emot $20\\degree$-vinkeln för $a$ och hypotenusan för $c$.\n\n' +
                        '- För $20\\degree$-vinkeln är $a$ **motstående**: $\\sin 20\\degree = \\dfrac{a}{c}$\n' +
                        '- För $70\\degree$-vinkeln är samma sida $a$ **närliggande**: $\\cos 70\\degree = \\dfrac{a}{c}$\n\n' +
                        'Uttrycken beskriver samma kvot:\n\n$$\\sin 20\\degree = \\cos 70\\degree$$',
                    figur: 'u9-sidor',
                },
            ],
            svar: '$\\cos 70\\degree$',
            bedomning: [['Korrekt svar: $\\cos 70\\degree$', '+C']],
        },

        {
            nr: 10, del: 'B', poang: [0, 1, 0], omrade: 'Algebra — omskrivning',
            endastSvar: true,
            fraga: 'Skriv ett uttryck i den tomma parentesen så att likheten gäller.\n\n' +
                '$$3(4x - 10) = 2(\\qquad\\qquad)$$',
            figur: null,
            steg: [
                {
                    rubrik: 'Utveckla vänsterledet',
                    varfor: 'När båda leden skrivs utan parenteser ser vi exakt vilket uttryck ' +
                        'högerledets parentes måste innehålla.',
                    text: '$$3(4x - 10) = 3 \\cdot 4x - 3 \\cdot 10 = 12x - 30$$',
                },
                {
                    rubrik: 'Dela med 2 för att hitta parentesens innehåll',
                    varfor: 'Högerledet är $2 \\cdot (\\text{parentesen})$. Parentesen måste alltså vara ' +
                        'hälften av $12x - 30$.',
                    text: '$$\\dfrac{12x - 30}{2} = 6x - 15$$\n\n' +
                        '**Kontroll:** $2(6x - 15) = 12x - 30 = 3(4x - 10)$ — stämmer.',
                },
            ],
            svar: '$6x - 15$',
            bedomning: [['Korrekt svar: $6x - 15$', '+C']],
        },

        {
            nr: 11, del: 'B', poang: [0, 1, 0], omrade: 'Sannolikhet',
            endastSvar: true,
            fraga: 'På en tärning har alla sidor olika färg. En sida är röd. ' +
                'Sannolikheten att få röd tre gånger i rad när man kastar tärningen är $\\dfrac{1}{64}$\n\n' +
                'Hur många sidor har tärningen?',
            figur: null,
            steg: [
                {
                    rubrik: 'Teckna sannolikheten med okänt antal sidor',
                    varfor: 'Kasten är oberoende av varandra, så sannolikheten att få röd tre gånger i rad ' +
                        'är produkten av tre lika sannolikheter. Har tärningen $n$ sidor är sannolikheten ' +
                        'för röd i ett kast $\\frac{1}{n}$.',
                    text: '$$\\dfrac{1}{n} \\cdot \\dfrac{1}{n} \\cdot \\dfrac{1}{n} = \\left(\\dfrac{1}{n}\\right)^3 = \\dfrac{1}{n^3}$$',
                },
                {
                    rubrik: 'Lös ekvationen',
                    text: '$$\\dfrac{1}{n^3} = \\dfrac{1}{64} \\quad \\Longrightarrow \\quad n^3 = 64$$\n\n' +
                        'Vilket tal i kubik blir $64$? Eftersom $4 \\cdot 4 \\cdot 4 = 64$ är\n\n$$n = 4$$',
                },
            ],
            svar: '4 sidor',
            bedomning: [['Korrekt svar: 4', '+C']],
        },

        {
            nr: 12, del: 'B', poang: [0, 0, 1], omrade: 'Algebra — substitution',
            endastSvar: true,
            fraga: 'Skriv $2a + b$ uttryckt i $a$ om\n\n$$a + b = 2$$\n\nFörenkla så långt som möjligt.',
            figur: null,
            steg: [
                {
                    rubrik: 'Lös ut b ur sambandet',
                    varfor: '"Uttryckt i $a$" betyder att svaret bara får innehålla $a$. ' +
                        'Då behöver vi ersätta $b$ — och det kan vi göra om vi först löser ut $b$ ur villkoret.',
                    text: '$$a + b = 2 \\quad \\Longrightarrow \\quad b = 2 - a$$',
                },
                {
                    rubrik: 'Sätt in och förenkla',
                    text: '$$2a + b = 2a + (2 - a) = 2a + 2 - a = a + 2$$',
                },
            ],
            svar: '$a + 2$',
            bedomning: [['Korrekt svar: $a + 2$', '+A']],
        },

        {
            nr: 13, del: 'B', poang: [0, 0, 1], omrade: 'Funktioner — sammansatt',
            endastSvar: true,
            fraga: '$f(x) = 2x - 4$ och $g(x) = 3x + 1$\n\nBestäm $f(g(2))$',
            figur: null,
            steg: [
                {
                    rubrik: 'Beräkna den inre funktionen g(2) först',
                    varfor: '$f(g(2))$ läses inifrån och ut: först räknar vi ut vad $g(2)$ är, ' +
                        'sedan stoppar vi in det värdet i $f$.',
                    text: '$$g(2) = 3 \\cdot 2 + 1 = 7$$',
                },
                {
                    rubrik: 'Sätt in resultatet i f',
                    text: '$$f(g(2)) = f(7) = 2 \\cdot 7 - 4 = 10$$',
                },
            ],
            svar: '$f(g(2)) = 10$',
            bedomning: [['Korrekt svar: $f(g(2)) = 10$', '+A']],
        },

        {
            nr: 14, del: 'B', poang: [0, 0, 1], omrade: 'Potenser — rationella exponenter',
            endastSvar: true,
            fraga: 'Uttrycken nedan har samma positiva värde på $a$. ' +
                'Vilka tal ska stå i rutorna så att likheterna stämmer?\n\n' +
                '$$a^{1/3} = \\square \\qquad\\qquad a^{2/3} = 9 \\qquad\\qquad a = \\square$$',
            figur: null,
            steg: [
                {
                    rubrik: 'Utnyttja att a^(2/3) är kvadraten på a^(1/3)',
                    varfor: 'Potenslagen $(a^m)^n = a^{m \\cdot n}$ kopplar ihop uttrycken: ' +
                        '$\\left(a^{1/3}\\right)^2 = a^{2/3}$. Det mellersta uttrycket, som vi känner värdet på, ' +
                        'är alltså kvadraten på det första.',
                    text: '$$\\left(a^{1/3}\\right)^2 = a^{2/3} = 9$$\n\n' +
                        'Eftersom $a$ är positivt är $a^{1/3}$ positivt, så\n\n' +
                        '$$a^{1/3} = \\sqrt{9} = 3$$',
                },
                {
                    rubrik: 'Bestäm a genom att kubera',
                    varfor: 'På samma sätt gäller $\\left(a^{1/3}\\right)^3 = a^{3/3} = a$ — ' +
                        'kuben på det första uttrycket ger $a$ självt.',
                    text: '$$a = \\left(a^{1/3}\\right)^3 = 3^3 = 27$$\n\n' +
                        '**Kontroll:** $27^{2/3} = \\left(27^{1/3}\\right)^2 = 3^2 = 9$ — stämmer.',
                },
            ],
            svar: '$a^{1/3} = 3$ och $a = 27$',
            bedomning: [['Korrekt svar: $3$ och $27$', '+A']],
        },

        {
            nr: 15, del: 'B', poang: [0, 0, 1], omrade: 'Olikheter',
            endastSvar: true,
            fraga: 'Bestäm värdet på $a$ så att olikheten $2x - a < 5$ har lösningen $x < 7$',
            figur: null,
            steg: [
                {
                    rubrik: 'Lös olikheten med a kvar som bokstav',
                    varfor: 'Vi löser ut $x$ precis som i en vanlig ekvation och låter $a$ följa med som ' +
                        'ett obekant tal. Då ser vi vilken gräns för $x$ olikheten ger — uttryckt i $a$.',
                    text: '$$2x - a < 5$$\n\nAddera $a$ till båda leden:\n\n$$2x < 5 + a$$\n\n' +
                        'Dela båda leden med $2$ (positivt tal — olikhetstecknet behålls):\n\n' +
                        '$$x < \\dfrac{5 + a}{2}$$',
                },
                {
                    rubrik: 'Jämför med den önskade lösningen',
                    varfor: 'Olikheten ska ha lösningen $x < 7$. Gränsen $\\frac{5+a}{2}$ måste därför ' +
                        'vara exakt $7$.',
                    text: '$$\\dfrac{5 + a}{2} = 7 \\quad \\Longrightarrow \\quad 5 + a = 14 \\quad \\Longrightarrow \\quad a = 9$$\n\n' +
                        '**Kontroll:** $2x - 9 < 5 \\Rightarrow 2x < 14 \\Rightarrow x < 7$ — stämmer.',
                },
            ],
            svar: '$a = 9$',
            bedomning: [['Korrekt svar: $a = 9$', '+A']],
        },

        {
            nr: 16, del: 'B', poang: [0, 0, 1], omrade: 'Funktioner — grafisk olikhet',
            endastSvar: true,
            fraga: 'Skugga det område i koordinatsystemet där $f(x) \\leq y \\leq g(x)$',
            figur: 'u16',
            steg: [
                {
                    rubrik: 'Tolka den dubbla olikheten',
                    varfor: 'Villkoret $f(x) \\leq y \\leq g(x)$ säger två saker samtidigt om varje punkt ' +
                        '$(x,\\ y)$ i området: punkten ska ligga **på eller ovanför** linjen $f$ ' +
                        'och **på eller under** parabeln $g$.',
                    text: 'Området ligger alltså *mellan* graferna — med linjen $f$ som golv och ' +
                        'parabeln $g$ som tak.',
                },
                {
                    rubrik: 'Avgör var ett sådant område finns',
                    varfor: 'Ett golv måste ligga under sitt tak: villkoret kan bara uppfyllas där ' +
                        '$f(x) \\leq g(x)$, dvs. där parabeln ligger ovanför linjen.',
                    text: 'I figuren skär graferna varandra i punkten $(4,\\ 3)$. ' +
                        'Till vänster om skärningspunkten ligger parabeln under linjen — där finns inget område. ' +
                        'Till höger om skärningspunkten ligger parabeln över linjen — där finns området.',
                    figur: 'u16-skarning',
                },
                {
                    rubrik: 'Skugga området',
                    text: 'Skugga ytan mellan linjen och parabeln från skärningspunkten $(4,\\ 3)$ ' +
                        'och åt höger, så långt koordinatsystemet räcker:',
                    figur: 'u16-svar',
                },
            ],
            svar: 'Området mellan graferna till höger om skärningspunkten $(4,\\ 3)$ — se figuren i steg 3.',
            bedomning: [['Korrekt skuggat område', '+A']],
        },

        // ================= DELPROV C =================
        {
            nr: 17, del: 'C', poang: [3, 2, 4], omrade: 'Exponentiell modell — Koch-kurvan',
            endastSvar: false,
            fraga: 'För att konstruera ett mönster som liknar snöflingor kan man göra som ' +
                'den svenska matematikern Helge von Koch. Utgå från en liksidig triangel med sidan 3, se bild.\n\n' +
                'Dela in varje sida i den ursprungliga triangeln i tre lika långa sträckor. ' +
                'Den mittersta sträckan utgör nu sidan i en ny liksidig triangel. ' +
                'En ny figur med större omkrets har nu bildats, figur 1. ' +
                'Upprepa proceduren för att skapa nästa figur, figur 2.\n\n' +
                '**a)** Den ursprungliga triangeln har omkretsen 9. Beräkna omkretsen för figur 1.\n\n' +
                '**b)** Beräkna omkretsen för figur 2.\n\n' +
                '**c)** Omkretsen ökar för varje figur. Beräkna förändringsfaktorn från figur 1 till figur 2.\n\n' +
                '**d)** Omkretsen ökar exponentiellt för varje figur. Skriv en exakt formel för omkretsen $O$ för figur $n$.\n\n' +
                '**e)** Vilket nummer har den figur som har omkretsen $\\dfrac{2^{16}}{3^6}$?',
            figur: 'u17',
            steg: [
                {
                    del: 'a', rubrik: 'Se vad som händer med en enda sida',
                    varfor: 'Hela konstruktionen upprepar samma sak på varje sida. ' +
                        'Om vi förstår **en** sida vet vi vad som händer med hela omkretsen.',
                    text: 'En sida med längden $3$ delas i tre delar à $1$. Mittdelen tas bort och ' +
                        'ersätts av **två** sträckor à $1$ (den nya triangelns ben). ' +
                        'Kvar blir alltså $4$ sträckor à $1$ i stället för $3$:\n\n' +
                        '$$3 \\longrightarrow 4 \\qquad \\text{sidan blir } \\dfrac{4}{3} \\text{ av sin längd}$$',
                    figur: 'u17-sida',
                },
                {
                    del: 'a', rubrik: 'Beräkna omkretsen för figur 1',
                    varfor: 'Varje sida växer med samma faktor $\\frac{4}{3}$ — då växer hela omkretsen ' +
                        'med faktorn $\\frac{4}{3}$.',
                    text: '$$O_1 = 9 \\cdot \\dfrac{4}{3} = 12$$',
                    delsvar: { del: 'a', text: '$O_1 = 12$' },
                },
                {
                    del: 'b', rubrik: 'Upprepa för figur 2',
                    varfor: 'Proceduren är exakt densamma i varje steg: varje liten sträcka delas i tre ' +
                        'och blir fyra. Omkretsen multipliceras därför med $\\frac{4}{3}$ ännu en gång.',
                    text: '$$O_2 = 12 \\cdot \\dfrac{4}{3} = 16$$',
                    delsvar: { del: 'b', text: '$O_2 = 16$' },
                },
                {
                    del: 'c', rubrik: 'Beräkna förändringsfaktorn',
                    varfor: 'Förändringsfaktorn är kvoten mellan det nya och det gamla värdet.',
                    text: '$$\\dfrac{O_2}{O_1} = \\dfrac{16}{12} = \\dfrac{4}{3}$$\n\n' +
                        'Precis som väntat: omkretsen multipliceras med $\\dfrac{4}{3}$ för varje ny figur.',
                    delsvar: { del: 'c', text: 'Förändringsfaktorn är $\\dfrac{4}{3}$' },
                },
                {
                    del: 'd', rubrik: 'Skriv formeln för figur n',
                    varfor: 'Exponentiell förändring: startvärde $\\cdot$ (förändringsfaktor)$^{\\,\\text{antal steg}}$. ' +
                        'Starten (figur 0, den ursprungliga triangeln) har omkretsen $9$, och det tar $n$ steg ' +
                        'att nå figur $n$.',
                    text: '$$O = 9 \\cdot \\left(\\dfrac{4}{3}\\right)^n$$\n\n' +
                        '**Kontroll:** $n = 1$ ger $9 \\cdot \\frac{4}{3} = 12$ ✓ och $n = 2$ ger ' +
                        '$9 \\cdot \\frac{16}{9} = 16$ ✓',
                    delsvar: { del: 'd', text: '$O = 9 \\cdot \\left(\\dfrac{4}{3}\\right)^n$' },
                },
                {
                    del: 'e', rubrik: 'Skriv om formeln med potenslagarna',
                    varfor: 'Omkretsen $\\frac{2^{16}}{3^6}$ är skriven med tvåor och treor. ' +
                        'Om vi skriver om vår formel på samma form kan vi jämföra exponenterna direkt — ' +
                        'det är hela poängen med basbytet.',
                    text: 'Eftersom $9 = 3^2$ och $4^n = (2^2)^n = 2^{2n}$:\n\n' +
                        '$$O = 9 \\cdot \\dfrac{4^n}{3^n} = \\dfrac{3^2 \\cdot 2^{2n}}{3^n} = \\dfrac{2^{2n}}{3^{n-2}}$$',
                },
                {
                    del: 'e', rubrik: 'Jämför exponenterna',
                    varfor: 'Två potensuttryck med baserna $2$ och $3$ är lika precis när exponenterna ' +
                        'för respektive bas är lika.',
                    text: '$$\\dfrac{2^{2n}}{3^{n-2}} = \\dfrac{2^{16}}{3^6}$$\n\n' +
                        'Jämför tvåornas exponenter: $2n = 16$, dvs. $n = 8$.\n\n' +
                        'Kontrollera treornas exponenter: $n - 2 = 8 - 2 = 6$ ✓\n\n' +
                        'Båda villkoren ger samma $n$ — figuren har nummer $8$.',
                    delsvar: { del: 'e', text: 'Figur nummer $8$' },
                },
            ],
            svar: '**a)** $O_1 = 12$ **b)** $O_2 = 16$ **c)** $\\dfrac{4}{3}$ ' +
                '**d)** $O = 9 \\cdot \\left(\\dfrac{4}{3}\\right)^n$ **e)** $n = 8$',
            bedomning: [
                ['Anger någon figurs omkrets', '+E'],
                ['Påbörjar bestämning av omkrets för figur 2', '+E'],
                ['Motiverar någon figurs omkrets, t.ex. i bild eller med beräkning', '+E'],
                ['Bestämmer omkretsen för någon figur $n > 1$ med beräkning eller motivering', '+C'],
                ['Anger förändringsfaktorn', '+C'],
                ['Anger ett uttryck för omkretsen i figur $n$', '+A'],
                ['Påbörjar bestämning av det sökta figurnumret genom basbyte', '+A'],
                ['Bestämmer det sökta figurnumret', '+A'],
                ['Redovisningen är lätt att följa och innehåller en exakt formel för omkretsen i figur $n$', '+A'],
            ],
        },

        {
            nr: 18, del: 'C', poang: [2, 0, 0], omrade: 'Räta linjen — genom två punkter',
            endastSvar: false,
            fraga: 'Bestäm ekvationen för den räta linje som går genom punkterna $(2,\\ 10)$ och $(12,\\ 30)$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Beräkna lutningen k',
                    varfor: 'En rät linje skrivs $y = kx + m$. Lutningen $k$ är förändringen i $y$ ' +
                        'delad med förändringen i $x$ mellan två punkter på linjen.',
                    text: '$$k = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{30 - 10}{12 - 2} = \\dfrac{20}{10} = 2$$',
                    figur: 'u18-los1',
                },
                {
                    rubrik: 'Bestäm m med hjälp av en av punkterna',
                    varfor: 'Linjen $y = 2x + m$ ska gå genom $(2,\\ 10)$ — då måste punktens koordinater ' +
                        'passa i ekvationen. Det ger oss $m$.',
                    text: 'Sätt in $x = 2$ och $y = 10$:\n\n' +
                        '$$10 = 2 \\cdot 2 + m \\quad \\Longrightarrow \\quad m = 10 - 4 = 6$$',
                },
                {
                    rubrik: 'Skriv linjens ekvation och kontrollera',
                    text: '$$y = 2x + 6$$\n\n' +
                        '**Kontroll med den andra punkten:** $x = 12$ ger $y = 2 \\cdot 12 + 6 = 30$ ✓',
                    figur: 'u18-los3',
                },
            ],
            svar: '$y = 2x + 6$',
            bedomning: [
                ['Bestämmer $k$-värdet eller $m$-värdet', '+E'],
                ['Lösning med korrekt svar', '+E'],
            ],
        },

        {
            nr: 19, del: 'C', poang: [1, 1, 0], omrade: 'Algebra — ekvation',
            endastSvar: false,
            fraga: 'Utgå från uttrycket $3(x + 4) - (8 + x)$\n\nBestäm $x$ så att uttryckets värde blir 3.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp ekvationen och förenkla vänsterledet',
                    varfor: '"Uttryckets värde blir 3" betyder att uttrycket ska vara lika med $3$ — ' +
                        'det ger en ekvation. Innan vi löser den förenklar vi: multiplicera in $3$:an ' +
                        'och ta bort parentesen. Minustecknet framför $(8 + x)$ byter tecken på **båda** termerna.',
                    text: '$$3(x + 4) - (8 + x) = 3$$\n\n' +
                        '$$3x + 12 - 8 - x = 3$$\n\n' +
                        '$$2x + 4 = 3$$',
                },
                {
                    rubrik: 'Lös ekvationen',
                    text: 'Subtrahera $4$ från båda leden:\n\n$$2x = -1$$\n\n' +
                        'Dela båda leden med $2$:\n\n$$x = -\\dfrac{1}{2}$$\n\n' +
                        '**Kontroll:** $3 \\cdot (-0{,}5 + 4) - (8 - 0{,}5) = 10{,}5 - 7{,}5 = 3$ ✓',
                },
            ],
            svar: '$x = -\\dfrac{1}{2}$',
            bedomning: [
                ['Tecknar ekvation eller skriver om uttrycket utan parenteser', '+E'],
                ['Lösning med korrekt svar', '+C'],
            ],
        },

        {
            nr: 20, del: 'C', poang: [0, 2, 0], omrade: 'Algebra — ekvation med parenteser',
            endastSvar: false,
            fraga: 'Lös ekvationen $(2x - 5)(x + 3) = 2x^2 - 9$',
            figur: null,
            steg: [
                {
                    rubrik: 'Multiplicera ihop parenteserna i vänsterledet',
                    varfor: 'Ekvationen ser ut att vara av andra graden, men vi kan inte se det säkert ' +
                        'förrän parenteserna är utvecklade. Varje term i första parentesen multipliceras ' +
                        'med varje term i den andra.',
                    text: '$$(2x - 5)(x + 3) = 2x \\cdot x + 2x \\cdot 3 - 5 \\cdot x - 5 \\cdot 3$$\n\n' +
                        '$$= 2x^2 + 6x - 5x - 15 = 2x^2 + x - 15$$',
                },
                {
                    rubrik: 'Förenkla ekvationen',
                    varfor: 'Nu står $2x^2$ i **båda** leden. När vi subtraherar $2x^2$ från båda leden ' +
                        'försvinner andragradstermerna — kvar blir en enkel förstagradsekvation.',
                    text: '$$2x^2 + x - 15 = 2x^2 - 9$$\n\n' +
                        'Subtrahera $2x^2$ från båda leden:\n\n$$x - 15 = -9$$',
                },
                {
                    rubrik: 'Lös ut x',
                    text: 'Addera $15$ till båda leden:\n\n$$x = 6$$\n\n' +
                        '**Kontroll:** $(2 \\cdot 6 - 5)(6 + 3) = 7 \\cdot 9 = 63$ och ' +
                        '$2 \\cdot 6^2 - 9 = 72 - 9 = 63$ ✓',
                },
            ],
            svar: '$x = 6$',
            bedomning: [
                ['Förenklar vänsterledet genom att multiplicera parenteserna', '+C'],
                ['Lösning med korrekt svar', '+C'],
            ],
        },

        {
            nr: 21, del: 'C', poang: [0, 2, 1], omrade: 'Funktioner — definitionsmängd',
            endastSvar: false,
            fraga: 'Ali går på naturbruksprogrammet och ska markera ett $20\\ \\text{m}^2$ stort område ' +
                'att odla på. Området ska ha formen av en triangel med basen $b$ meter och höjden $h$ meter. ' +
                'Ali vill undersöka hur området kan se ut.\n\n' +
                '**a)** Bestäm en funktion för hur basen $b$ beror av höjden $h$ för Alis område.\n\n' +
                '**b)** Bestäm definitionsmängden för funktionen om $b$ ska vara minst 1 m lång.',
            figur: 'u21',
            steg: [
                {
                    del: 'a', rubrik: 'Utgå från triangelns areaformel',
                    varfor: 'Det enda vi vet om området är dess form och area. Areaformeln kopplar ' +
                        'ihop $b$ och $h$ — ur den kan vi lösa ut $b$.',
                    text: '$$A = \\dfrac{b \\cdot h}{2} = 20$$',
                    figur: 'u21-hojd',
                },
                {
                    del: 'a', rubrik: 'Lös ut basen b',
                    text: 'Multiplicera båda leden med $2$:\n\n$$b \\cdot h = 40$$\n\n' +
                        'Dela båda leden med $h$:\n\n$$b = \\dfrac{40}{h}$$',
                    delsvar: { del: 'a', text: '$b = \\dfrac{40}{h}$' },
                },
                {
                    del: 'b', rubrik: 'Ställ upp villkoret för basen',
                    varfor: 'Definitionsmängden är de värden på $h$ (funktionens variabel) som är tillåtna. ' +
                        'Kravet är att basen ska vara minst $1$ m — det översätter vi till en olikhet i $h$.',
                    text: '$$b \\geq 1 \\quad \\Longleftrightarrow \\quad \\dfrac{40}{h} \\geq 1$$\n\n' +
                        'Höjden $h$ är en längd och därmed positiv, så vi kan multiplicera båda leden ' +
                        'med $h$ utan att olikhetstecknet vänds:\n\n$$40 \\geq h$$',
                },
                {
                    del: 'b', rubrik: 'Ange definitionsmängden',
                    varfor: 'Utöver kravet $h \\leq 40$ måste höjden vara ett positivt tal — ' +
                        'en triangel kan inte ha höjden $0$ eller en negativ höjd.',
                    text: '$$0 < h \\leq 40$$',
                    delsvar: { del: 'b', text: '$0 < h \\leq 40$' },
                },
            ],
            svar: '**a)** $b = \\dfrac{40}{h}$ **b)** $0 < h \\leq 40$',
            bedomning: [
                ['a) Lösning med korrekt svar', '+C'],
                ['b) Anger minst en av gränserna korrekt', '+C'],
                ['b) Korrekt svar där intervallet anges med symboler', '+A'],
            ],
        },

        // ================= DELPROV D =================
        {
            nr: 22, del: 'D', poang: [2, 0, 0], omrade: 'Exponentialfunktion — ränta',
            endastSvar: true,
            fraga: 'Stina har satt in pengar på ett bankkonto med fast årsränta. Följande funktion ' +
                'kan användas för att beräkna hur mycket pengar, i kronor, som finns på bankkontot:\n\n' +
                '$$f(x) = 10\\,000 \\cdot 1{,}04^x$$\n\n' +
                'där $x$ är antal år efter att hon har satt in pengarna på bankkontot.\n\n' +
                '**a)** Vilken räntesats fick hon av banken? *Endast svar krävs.*\n\n' +
                '**b)** Beräkna $f(5)$ *Endast svar krävs.*',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Tolka förändringsfaktorn',
                    varfor: 'I en exponentialfunktion $f(x) = C \\cdot a^x$ är $a$ förändringsfaktorn. ' +
                        'Vid ränta är förändringsfaktorn $1 + \\text{räntesatsen}$ — ' +
                        'ettan står för pengarna som redan finns, resten är räntan.',
                    text: '$$a = 1{,}04 = 1 + 0{,}04$$\n\n' +
                        'Räntesatsen är alltså $0{,}04 = 4\\ \\%$ per år.',
                    delsvar: { del: 'a', text: '$4\\ \\%$' },
                },
                {
                    del: 'b', rubrik: 'Beräkna f(5)',
                    varfor: '$f(5)$ är beloppet på kontot efter $5$ år: startbeloppet har då ' +
                        'multiplicerats med $1{,}04$ fem gånger.',
                    text: '$$f(5) = 10\\,000 \\cdot 1{,}04^5 \\approx 12\\,166{,}53$$\n\n' +
                        'Efter $5$ år finns ungefär $12\\,167$ kr på kontot (avrundat $12\\,200$ kr).',
                    delsvar: { del: 'b', text: '$f(5) \\approx 12\\,166{,}53$ (ca $12\\,200$ kr)' },
                },
            ],
            svar: '**a)** $4\\ \\%$ **b)** $f(5) = 10\\,000 \\cdot 1{,}04^5 \\approx 12\\,166{,}53$ (ca $12\\,200$ kr)',
            bedomning: [
                ['a) Korrekt svar: $4\\ \\%$', '+E'],
                ['b) Godtagbart svar: $12\\,166{,}53$ kr eller $12\\,200$ kr', '+E'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [2, 2, 0], omrade: 'Trigonometri — tillämpning',
            endastSvar: false,
            fraga: 'Jonas ska borra ett hål för bergvärme och behöver borra ner till djupet 125 m. ' +
                'Lutningen på borrhålet måste vara $10{,}0\\degree$ enligt en borrplan, se figur.\n\n' +
                '**a)** Hur långt borrhål måste Jonas *minst* borra?\n\n' +
                '**b)** Hur långt från tomtgränsen ska Jonas *minst* börja borra för att inte ' +
                'borra utanför tomtgränsen, om han borrar enligt borrplanen?',
            figur: 'u23',
            steg: [
                {
                    // Hör till a) — uppritningen är a-uppgiftens första steg
                    del: 'a', rubrik: 'Rita och namnge den rätvinkliga triangeln',
                    varfor: 'Borrhålet, lodlinjen och marken bildar en rätvinklig triangel: ' +
                        'lodlinjen (djupet $125$ m) är den ena kateten, avståndet längs marken den andra, ' +
                        'och själva borrhålet är hypotenusan. Vinkeln $10{,}0\\degree$ ligger mellan ' +
                        'borrhålet och lodlinjen.',
                    text: 'Kalla borrhålets längd $L$ och det vågräta avståndet $d$.',
                    figur: 'u23-triangel',
                },
                {
                    del: 'a', rubrik: 'Ställ upp ett trigonometriskt samband för L',
                    varfor: 'Djupet $125$ m är **närliggande** katet till vinkeln $10{,}0\\degree$ och ' +
                        '$L$ är hypotenusan — då är cosinus rätt funktion: ' +
                        '$\\cos v = \\dfrac{\\text{närliggande}}{\\text{hypotenusa}}$.',
                    text: '$$\\cos 10{,}0\\degree = \\dfrac{125}{L}$$',
                    figur: 'u23-cos',
                },
                {
                    del: 'a', rubrik: 'Lös ut borrhålets längd',
                    text: '$$L = \\dfrac{125}{\\cos 10{,}0\\degree} \\approx 126{,}93 \\approx 127\\ \\text{m}$$',
                    delsvar: { del: 'a', text: 'Jonas måste borra minst ca $127$ m' },
                },
                {
                    del: 'b', rubrik: 'Ställ upp ett samband för avståndet d',
                    varfor: 'Borrhålet lutar åt sidan — vid botten har borren kommit $d$ meter i sidled. ' +
                        'Börjar Jonas närmare tomtgränsen än $d$ hamnar borrspetsen utanför tomten. ' +
                        'Avståndet $d$ är **motstående** katet till vinkeln och djupet $125$ m är närliggande — ' +
                        'då passar tangens: $\\tan v = \\dfrac{\\text{motstående}}{\\text{närliggande}}$.',
                    text: '$$\\tan 10{,}0\\degree = \\dfrac{d}{125}$$',
                    figur: 'u23-tan',
                },
                {
                    del: 'b', rubrik: 'Lös ut avståndet',
                    text: '$$d = 125 \\cdot \\tan 10{,}0\\degree \\approx 22{,}0 \\approx 22\\ \\text{m}$$\n\n' +
                        '*Alternativ:* används borrhålets längd $127$ m från a) fås ' +
                        '$d = 127 \\cdot \\sin 10{,}0\\degree \\approx 22{,}4$ m — även det godtas.',
                    delsvar: { del: 'b', text: 'Jonas ska börja borra minst ca $22$ m från tomtgränsen' },
                },
            ],
            svar: '**a)** Minst ca $127$ m (godtagbart: $126{,}9$–$130$ m) **b)** Minst ca $22$ m ($22{,}4$ m med hypotenusan $127$ m)',
            bedomning: [
                ['a) Tecknar trigonometriskt samband', '+E'],
                ['a) Lösning med godtagbart svar', '+E'],
                ['b) Tecknar en ekvation för att beräkna sträckan', '+C'],
                ['b) Lösning med godtagbart svar', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [2, 1, 0], omrade: 'Kalkylblad',
            endastSvar: true,
            fraga: 'Aida tar ett lån på $20\\,000$ kr. Månadsräntan är $3\\ \\%$ och hon ska amortera ' +
                '$1\\,000$ kr varje månad. För att beräkna hur stor månadsbetalningen blir gör Aida ett kalkylblad.\n\n' +
                '**a)** Vilket *värde* visas i cell E2 när månadsbetalningen har beräknats? *Endast svar krävs.*\n\n' +
                'Aida vill att kalkylbladet ska kunna användas oavsett räntesats, lånebelopp och amortering.\n\n' +
                '**b)** Vilken *formel* ska då skrivas i cell B3? *Endast svar krävs.*\n\n' +
                '**c)** Vilken *formel* ska då skrivas i cell E3 för att beräkna månadsbetalningen? *Endast svar krävs.*',
            figur: 'u24',
            steg: [
                {
                    del: 'a', rubrik: 'Beräkna månadsbetalningen för januari',
                    varfor: 'Enligt rubriken i kolumn E är månadsbetalningen räntekostnad + amortering. ' +
                        'Räntekostnaden i januari är $3\\ \\%$ av det återstående lånet $20\\,000$ kr.',
                    text: '$$\\text{E2} = \\underbrace{20\\,000 \\cdot 0{,}03}_{\\text{ränta } 600} + ' +
                        '\\underbrace{1\\,000}_{\\text{amortering}} = 1\\,600$$',
                    delsvar: { del: 'a', text: '$1\\,600$' },
                },
                {
                    del: 'b', rubrik: 'Teckna formeln för återstående lån i B3',
                    varfor: 'Kalkylbladet ska fungera oavsett vilka tal som skrivs in — därför måste ' +
                        'formeln hämta värden ur **cellerna** i stället för att innehålla fasta tal. ' +
                        'Februaris återstående lån är januaris lån minus januaris amortering.',
                    text: '$$\\text{B3} = \\text{B2} - \\text{D2}$$\n\n' +
                        '(Räntan påverkar inte det återstående lånet — den betalas ju varje månad och läggs inte till skulden.)',
                    delsvar: { del: 'b', text: 'Formeln `=B2-D2`' },
                },
                {
                    del: 'c', rubrik: 'Teckna formeln för månadsbetalningen i E3',
                    varfor: 'Samma princip: månadsbetalning = ränta + amortering, där räntan är ' +
                        'räntesatsen (C3) gånger det återstående lånet (B3). Med cellreferenser fungerar ' +
                        'formeln oavsett räntesats, lånebelopp och amortering.',
                    text: '$$\\text{E3} = \\text{B3} \\cdot \\text{C3} + \\text{D3}$$',
                    delsvar: { del: 'c', text: 'Formeln `=B3*C3+D3`' },
                },
            ],
            svar: '**a)** $1\\,600$ **b)** `=B2-D2` **c)** `=B3*C3+D3`',
            bedomning: [
                ['a) Korrekt svar: $1600$', '+E'],
                ['b) Fungerande formel för cell B3', '+E'],
                ['c) Fungerande formel för cell E3', '+C'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 3, 0], omrade: 'Ekvation — vinklar i triangel',
            endastSvar: false,
            fraga: 'En triangel har vinklarna $A$, $B$ och $C$.\n\n' +
                'Vinkel $B$ är $72\\ \\%$ *mindre* än vinkel $A$.\n\n' +
                'Vinkel $C$ är $60\\ \\%$ *större* än vinkel $A$.\n\n' +
                'Bestäm triangelns vinklar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Uttryck B och C som andelar av A',
                    varfor: 'Alla jämförelser görs mot vinkel $A$ — då är $A$ ett naturligt val av obekant. ' +
                        '"$72\\ \\%$ mindre" betyder att bara $100 - 72 = 28\\ \\%$ återstår, och ' +
                        '"$60\\ \\%$ större" betyder $100 + 60 = 160\\ \\%$. Procenten översätts till förändringsfaktorer.',
                    text: '$$B = 0{,}28A \\qquad C = 1{,}6A$$',
                    figur: 'u25-triangel',
                },
                {
                    rubrik: 'Ställ upp en ekvation med vinkelsumman',
                    varfor: 'Vi behöver ett samband som bestämmer $A$ — och i varje triangel är ' +
                        'vinkelsumman $180\\degree$.',
                    text: '$$A + B + C = 180\\degree$$\n\n' +
                        '$$A + 0{,}28A + 1{,}6A = 180\\degree$$\n\n' +
                        '$$2{,}88A = 180\\degree$$',
                },
                {
                    rubrik: 'Lös ekvationen och beräkna alla vinklar',
                    text: '$$A = \\dfrac{180\\degree}{2{,}88} = 62{,}5\\degree$$\n\n' +
                        'Därmed:\n\n' +
                        '$$B = 0{,}28 \\cdot 62{,}5\\degree = 17{,}5\\degree \\qquad C = 1{,}6 \\cdot 62{,}5\\degree = 100\\degree$$\n\n' +
                        '**Kontroll:** $62{,}5\\degree + 17{,}5\\degree + 100\\degree = 180\\degree$ ✓',
                },
            ],
            svar: '$A = 62{,}5\\degree$, $B = 17{,}5\\degree$ och $C = 100\\degree$',
            bedomning: [
                ['Uttrycker vinkel $B$ och vinkel $C$ som en andel av vinkel $A$', '+C'],
                ['Ställer upp ett samband baserat på relationen mellan vinklarna, t.ex. genom en ekvation', '+C'],
                ['Lösning med korrekt svar', '+C'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 2, 0], omrade: 'Potensmodell — jämförelse',
            endastSvar: false,
            fraga: 'Energibehovet hos hundar kan beräknas med två olika formler.\n\n' +
                '$$\\text{Formel 1:} \\quad y_1 = 70x^{0{,}75}$$\n\n' +
                '$$\\text{Formel 2:} \\quad y_2 = 30x + 70$$\n\n' +
                'där $y_1$ och $y_2$ är energibehovet i kcal/dygn för en hund som väger $x$ kg.\n\n' +
                'Hur många procent lägre energibehov ger formel 1 jämfört med formel 2 för en hund som väger 40 kg?',
            figur: null,
            steg: [
                {
                    rubrik: 'Beräkna energibehovet enligt båda formlerna',
                    varfor: 'För att kunna jämföra procentuellt behöver vi först de två talen som ska jämföras. ' +
                        'Sätt in $x = 40$ i båda formlerna (digitala verktyg är tillåtna).',
                    text: '$$y_1 = 70 \\cdot 40^{0{,}75} \\approx 1\\,113 \\qquad ' +
                        'y_2 = 30 \\cdot 40 + 70 = 1\\,270$$',
                },
                {
                    rubrik: 'Bilda kvoten för att jämföra',
                    varfor: '"Hur många procent lägre" jämfört med formel 2 betyder att skillnaden ska ' +
                        'sättas i förhållande till **formel 2**:s värde — det är jämförelsens referens ' +
                        '(det hela). Enklast är att beräkna kvoten $y_1/y_2$ och se hur långt under $1$ den hamnar.',
                    text: '$$\\dfrac{y_1}{y_2} = \\dfrac{70 \\cdot 40^{0{,}75}}{30 \\cdot 40 + 70} \\approx ' +
                        '\\dfrac{1\\,113}{1\\,270} \\approx 0{,}88$$',
                },
                {
                    rubrik: 'Tolka kvoten som en procentuell skillnad',
                    text: 'Kvoten $0{,}88$ betyder att formel 1 ger $88\\ \\%$ av formel 2:s värde, alltså\n\n' +
                        '$$1 - 0{,}88 = 0{,}12 = 12\\ \\%$$\n\n' +
                        'Formel 1 ger ungefär $12\\ \\%$ lägre energibehov.',
                },
            ],
            svar: 'Cirka $12\\ \\%$ lägre',
            bedomning: [
                ['Tecknar kvoten för att kunna jämföra energibehovet för en hund som väger 40 kg', '+C'],
                ['Lösning med godtagbart svar', '+C'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 2, 0], omrade: 'Procent — årlig förändringsfaktor',
            endastSvar: false,
            fraga: 'Moa har en bil som hon köpt för $230\\,000$ kr. Hon säljer bilen efter 6 år ' +
                'för $157\\,000$ kr. Hur mycket har bilens värde minskat procentuellt i genomsnitt per år?',
            figur: null,
            steg: [
                {
                    rubrik: 'Teckna den totala förändringsfaktorn',
                    varfor: 'Värdeminskningen sker med samma procent varje år — då multipliceras värdet ' +
                        'med samma förändringsfaktor $a$ sex gånger. Den totala förändringen på 6 år är ' +
                        'kvoten mellan slutvärde och startvärde.',
                    text: '$$a^6 = \\dfrac{157\\,000}{230\\,000} \\approx 0{,}6826$$',
                },
                {
                    rubrik: 'Lös ut den årliga förändringsfaktorn',
                    varfor: 'Ekvationen $a^6 = 0{,}6826$ löses genom att dra sjätte roten ur — ' +
                        'dvs. upphöja till $\\frac{1}{6}$.',
                    text: '$$a = \\left(\\dfrac{157\\,000}{230\\,000}\\right)^{1/6} \\approx 0{,}938$$',
                },
                {
                    rubrik: 'Tolka förändringsfaktorn som procent',
                    text: 'Faktorn $0{,}938$ betyder att $93{,}8\\ \\%$ av värdet är kvar efter varje år:\n\n' +
                        '$$1 - 0{,}938 = 0{,}062 \\approx 6\\ \\%$$\n\n' +
                        'Bilens värde har minskat med ungefär $6\\ \\%$ per år i genomsnitt.',
                },
            ],
            svar: 'Cirka $6\\ \\%$ per år (mer noggrant $6{,}2\\ \\%$)',
            bedomning: [
                ['Tecknar numeriskt uttryck eller ekvation för att beräkna den genomsnittliga procentuella minskningen per år', '+C'],
                ['Lösning med godtagbart svar', '+C'],
            ],
        },

        {
            nr: 28, del: 'D', poang: [0, 0, 0], omrade: '',
            endastSvar: false, sekretess: true,
            fraga: 'Borttagen på grund av sekretess.',
            figur: null, steg: [], svar: '',
        },

        {
            nr: 29, del: 'D', poang: [1, 2, 1], omrade: 'Sannolikhet — flera försök',
            endastSvar: false,
            fraga: 'Hugo är på en nöjespark och spelar på ett nummer på chokladhjulet. ' +
                'Chokladhjulet har 20 fält där ett av fälten ger vinst vid varje spelomgång.\n\n' +
                '**a)** Hur stor är sannolikheten att han vinner två spelomgångar i rad?\n\n' +
                '**b)** Hur stor är sannolikheten att han vinner *minst* en gång på sju spelomgångar?',
            figur: 'u29',
            steg: [
                {
                    del: 'a', rubrik: 'Multiplicera sannolikheterna för två vinster',
                    varfor: 'Vinstchansen i en omgång är $\\frac{1}{20}$ (ett vinstfält av tjugo). ' +
                        'Spelomgångarna är oberoende — hjulet minns inte förra snurret — ' +
                        'så sannolikheterna multipliceras.',
                    text: '$$P(\\text{två vinster i rad}) = \\dfrac{1}{20} \\cdot \\dfrac{1}{20} = ' +
                        '\\dfrac{1}{400} = 0{,}0025 = 0{,}25\\ \\%$$',
                    delsvar: { del: 'a', text: '$\\dfrac{1}{400} = 0{,}25\\ \\%$' },
                },
                {
                    del: 'b', rubrik: 'Gå via komplementhändelsen',
                    varfor: '"Minst en vinst" rymmer många fall: exakt 1, 2, 3 … vinster — jobbigt att ' +
                        'räkna var för sig. Motsatsen är ett enda fall: **ingen vinst alls**. ' +
                        'Därför använder vi $P(\\text{minst en}) = 1 - P(\\text{ingen})$.',
                    text: 'Sannolikheten att *inte* vinna en omgång är $\\dfrac{19}{20}$. ' +
                        'Sju förlorade omgångar i rad:\n\n' +
                        '$$P(\\text{ingen vinst}) = \\left(\\dfrac{19}{20}\\right)^7 \\approx 0{,}698$$',
                },
                {
                    del: 'b', rubrik: 'Subtrahera från 1',
                    text: '$$P(\\text{minst en vinst}) = 1 - \\left(\\dfrac{19}{20}\\right)^7 \\approx ' +
                        '1 - 0{,}698 = 0{,}302 \\approx 0{,}3$$',
                    delsvar: { del: 'b', text: 'Ungefär $0{,}3 = 30\\ \\%$' },
                },
            ],
            svar: '**a)** $\\dfrac{1}{400} = 0{,}25\\ \\%$ **b)** $1 - \\left(\\dfrac{19}{20}\\right)^7 \\approx 0{,}3 = 30\\ \\%$',
            bedomning: [
                ['a) Lösning med korrekt svar', '+E'],
                ['b) Identifierar komplementhändelsen eller minst två gynnsamma utfall', '+C'],
                ['b) Tecknar sannolikhet för komplementhändelse (eller samtliga sannolikheter för minst två olika antal vinster)', '+C'],
                ['b) Lösning med godtagbart svar', '+A'],
            ],
        },

        {
            nr: 30, del: 'D', poang: [1, 2, 2], omrade: 'Formler — ekvationslösning',
            endastSvar: false,
            fraga: 'I en tidningsartikel presenteras en formel för att beräkna tidsskillnaden i minuter ' +
                'om man kör samma sträcka med två olika hastigheter.\n\n' +
                '$$t = \\left(\\dfrac{1}{h_1} - \\dfrac{1}{h_2}\\right) \\cdot s \\cdot 60$$\n\n' +
                'där $t$ är tidsskillnad i minuter, $h_1$ är genomsnittlig hastighet 1 i km/h, ' +
                '$h_2$ är genomsnittlig hastighet 2 i km/h och $s$ är sträcka i kilometer.\n\n' +
                'Kim kör bil till jobbet. Till Kims jobb är sträckan 20 km.\n\n' +
                '**a)** Använd formeln för att beräkna tidsskillnaden i minuter om Kim ena dagen ' +
                'kör i den genomsnittliga hastigheten 80 km/h och den andra dagen istället kör i den ' +
                'genomsnittliga hastigheten 90 km/h till jobbet.\n\n' +
                '**b)** Kim jämför två andra dagars resor till jobbet. Den ena genomsnittliga hastigheten ' +
                'var dubbelt så hög som den andra på grund av trafiken. Tidsskillnaden för resorna till ' +
                'jobbet var 12 min. Vilka genomsnittliga hastigheter körde Kim med de två dagarna?',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Sätt in värdena i formeln',
                    varfor: 'Vi känner $h_1 = 80$, $h_2 = 90$ och $s = 20$ — det är bara att ersätta ' +
                        'bokstäverna med talen. (Det är viktigt att *visa* att formeln används — ' +
                        'det är det som bedöms.)',
                    text: '$$t = \\left(\\dfrac{1}{80} - \\dfrac{1}{90}\\right) \\cdot 20 \\cdot 60$$',
                },
                {
                    del: 'a', rubrik: 'Beräkna tidsskillnaden',
                    text: '$$t = \\left(\\dfrac{1}{80} - \\dfrac{1}{90}\\right) \\cdot 1\\,200 = ' +
                        '\\dfrac{10}{7\\,200} \\cdot 1\\,200 = \\dfrac{5}{3} \\approx 1{,}7$$',
                    delsvar: { del: 'a', text: '$\\dfrac{5}{3} \\approx 1{,}7$ minuter (1 minut och 40 sekunder)' },
                },
                {
                    del: 'b', rubrik: 'Inför en variabel för hastigheterna',
                    varfor: 'Vi vet inte någon av hastigheterna — men vi vet att den ena är dubbelt så ' +
                        'stor som den andra. Då räcker **en** variabel: kalla den lägre hastigheten $h$, ' +
                        'så är den högre $2h$. Det är nyckelsteget i uppgiften.',
                    text: 'Sätt $h_1 = h$ (lägre hastigheten), $h_2 = 2h$, $s = 20$ och $t = 12$:\n\n' +
                        '$$12 = \\left(\\dfrac{1}{h} - \\dfrac{1}{2h}\\right) \\cdot 20 \\cdot 60$$',
                },
                {
                    del: 'b', rubrik: 'Förenkla parentesen',
                    varfor: 'Bråken har olika nämnare — förläng $\\dfrac{1}{h}$ med $2$ så att båda får ' +
                        'nämnaren $2h$ och kan subtraheras.',
                    text: '$$\\dfrac{1}{h} - \\dfrac{1}{2h} = \\dfrac{2}{2h} - \\dfrac{1}{2h} = \\dfrac{1}{2h}$$\n\n' +
                        'Ekvationen blir\n\n' +
                        '$$12 = \\dfrac{1}{2h} \\cdot 1\\,200 = \\dfrac{600}{h}$$',
                },
                {
                    del: 'b', rubrik: 'Lös ut h och svara',
                    text: 'Multiplicera båda leden med $h$ och dela med $12$:\n\n' +
                        '$$12h = 600 \\quad \\Longrightarrow \\quad h = 50$$\n\n' +
                        '**Kontroll:** $\\left(\\dfrac{1}{50} - \\dfrac{1}{100}\\right) \\cdot 1\\,200 = ' +
                        '\\dfrac{1}{100} \\cdot 1\\,200 = 12$ ✓',
                    delsvar: { del: 'b', text: '$50$ km/h och $100$ km/h' },
                },
            ],
            svar: '**a)** $\\dfrac{5}{3} \\approx 1{,}7$ minuter (1 minut och 40 sekunder) ' +
                '**b)** $50$ km/h och $100$ km/h',
            bedomning: [
                ['a) Ersätter $h_1$, $h_2$ och $s$ med korrekta värden i formeln', '+E'],
                ['a) Lösning med godtagbart svar utifrån den givna formeln', '+C'],
                ['b) Uttrycker $h_1$ och $h_2$ i samma variabel (eller avslutad lösning med korrekt svar utifrån prövning)', '+C'],
                ['b) Bestämmer en av hastigheterna utifrån ekvationslösning', '+A'],
                ['b) Lösning med korrekt svar', '+A'],
            ],
        },

        {
            nr: 31, del: 'D', poang: [0, 0, 3], omrade: 'Procent — ekvationssystem',
            endastSvar: false,
            fraga: 'Talet $x$ ligger någonstans mellan talen 17 och 23.\n\n' +
                '$x$ är $p\\ \\%$ *större* än 17 och $p\\ \\%$ *mindre* än 23.\n\n' +
                'Bestäm $x$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Teckna två samband med förändringsfaktorer',
                    varfor: 'Samma tal $x$ beskrivs på två sätt: som en ökning av $17$ och som en ' +
                        'minskning av $23$ — med **samma** procentsats $p$. Skriv $p$ i decimalform, ' +
                        'så blir förändringsfaktorerna $1 + p$ (ökning) och $1 - p$ (minskning).',
                    text: '$$x = 17(1 + p) \\qquad \\text{och} \\qquad x = 23(1 - p)$$',
                },
                {
                    rubrik: 'Sätt uttrycken lika och lös ut p',
                    varfor: 'Båda uttrycken är lika med $x$ — då är de lika med varandra. ' +
                        'Det ger en ekvation med bara $p$ som obekant.',
                    text: '$$17(1 + p) = 23(1 - p)$$\n\n' +
                        '$$17 + 17p = 23 - 23p$$\n\n' +
                        'Samla $p$-termerna i vänsterledet och talen i högerledet:\n\n' +
                        '$$40p = 6 \\quad \\Longrightarrow \\quad p = \\dfrac{6}{40} = 0{,}15 = 15\\ \\%$$',
                },
                {
                    rubrik: 'Beräkna x',
                    text: 'Sätt in $p = 0{,}15$ i något av sambanden:\n\n' +
                        '$$x = 17 \\cdot 1{,}15 = 19{,}55$$\n\n' +
                        '**Kontroll med det andra sambandet:** $23 \\cdot 0{,}85 = 19{,}55$ ✓\n\n' +
                        'Talet ligger mellan $17$ och $23$ — rimligt.',
                },
            ],
            svar: '$x = 19{,}55$',
            bedomning: [
                ['Påbörjad lösning, t.ex. tecknar ett samband mellan $p$ och $x$', '+A'],
                ['Bestämmer $p$ (eller tecknar en ekvation med endast en variabel för att bestämma $x$)', '+A'],
                ['Lösning med korrekt svar där $p$ används i procentform', '+A'],
            ],
        },

        {
            nr: 32, del: 'D', poang: [0, 0, 3], omrade: 'Geometri — area med variabel',
            endastSvar: false,
            fraga: 'Figuren visar en mindre cirkel som är inskriven i en kvadrat, som i sin tur är ' +
                'inskriven i en större cirkel. Bestäm ett exakt uttryck för det skuggade områdets area ' +
                'då den mindre cirkelns radie är $r$. Förenkla uttrycket så långt som möjligt.',
            figur: 'u32',
            steg: [
                {
                    rubrik: 'Uttryck kvadratens sida i r',
                    varfor: 'Allt i figuren ska uttryckas i den enda variabeln $r$. ' +
                        'Den lilla cirkeln nuddar kvadratens alla fyra sidor — då är avståndet mellan ' +
                        'två motstående sidor exakt en diameter.',
                    text: 'Kvadratens sida är lika med lilla cirkelns diameter:\n\n$$\\text{sidan} = 2r$$',
                    figur: 'u32-sida',
                },
                {
                    rubrik: 'Uttryck stora cirkelns radie i r',
                    varfor: 'Kvadraten är inskriven i den stora cirkeln — hörnen ligger på cirkeln. ' +
                        'Kvadratens **diagonal** är därför stora cirkelns diameter, och diagonalen ' +
                        'fås med Pythagoras sats.',
                    text: '$$\\text{diagonalen} = \\sqrt{(2r)^2 + (2r)^2} = \\sqrt{8r^2} = 2r\\sqrt{2}$$\n\n' +
                        'Stora cirkelns radie är halva diagonalen:\n\n' +
                        '$$R = r\\sqrt{2}$$',
                    figur: 'u32-diagonal',
                },
                {
                    rubrik: 'Teckna det skuggade områdets area',
                    varfor: 'Det skuggade området är allt som ligger **innanför stora cirkeln men utanför ' +
                        'lilla cirkeln** (kvadraten är bara en streckad hjälpfigur). ' +
                        'Arean fås som en skillnad mellan cirklarnas areor.',
                    text: '$$A = \\pi R^2 - \\pi r^2 = \\pi \\left(r\\sqrt{2}\\right)^2 - \\pi r^2$$',
                },
                {
                    rubrik: 'Förenkla uttrycket',
                    varfor: 'Kvadrera faktorvis: $\\left(r\\sqrt{2}\\right)^2 = r^2 \\cdot 2$. ' +
                        'Sedan kan $\\pi r^2$ brytas ut.',
                    text: '$$A = 2\\pi r^2 - \\pi r^2 = \\pi r^2$$\n\n' +
                        'Det skuggade områdets area är exakt $\\pi r^2$ — lika stor som den lilla cirkelns area.',
                },
            ],
            svar: '$\\pi r^2$',
            bedomning: [
                ['Uttrycker ett samband mellan den större cirkelns radie eller diameter och den lilla cirkelns radie', '+A'],
                ['Tecknar uttryck för det skuggade områdets area i en variabel', '+A'],
                ['Lösning med korrekt svar', '+A'],
            ],
        },
    ],
};
