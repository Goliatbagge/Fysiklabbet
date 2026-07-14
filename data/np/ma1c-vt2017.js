// Fysiklabbet — Kursprov Matematik 1c, våren 2017.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Delprov A (muntligt gruppdelprov med kort) ingår inte — det är inte ett
// skriftligt uppgiftsformat med steg-för-steg-lösningar.
//
// Källa: Skolverket/PRIM-gruppen, kursprov Ma 1c VT 2017 (frisläppt).

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma1c-vt2017'] = {
    id: 'ma1c-vt2017',
    kurs: 'Matematik nivå 1c',
    termin: 'VT 2017',
    namn: 'Kursprov Ma 1c, våren 2017',
    kort: 'NP Ma 1c VT 2017',
    intro: 'Det här är kursprovet i Matematik 1c från våren 2017 ' +
        '(Skolverket/PRIM-gruppen). Här finns de skriftliga delproven B, C och D — ' +
        'delprov A är ett muntligt gruppdelprov och ingår inte. ' +
        'Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg i taget. ' +
        'Varje steg förklarar både vad som görs och varför.',
    kravgranser: 'Provet (delprov A–D) ger totalt högst 87 poäng. Poängen skrivs (E/C/A). ' +
        'Gräns för provbetyget: E minst 19 poäng · D minst 32 poäng varav 12 på lägst C-nivå · ' +
        'C minst 43 poäng varav 22 på lägst C-nivå · B minst 55 poäng varav 7 på A-nivå · ' +
        'A minst 66 poäng varav 13 på A-nivå.',
    delprov: {
        B: {
            tid: '60 minuter',
            hjalpmedel: 'Formelblad och linjal — inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'De flesta uppgifter kräver endast svar; några kräver en kort redovisning.',
        },
        C: {
            tid: '60 minuter',
            hjalpmedel: 'Digitala verktyg, formelblad och linjal',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'En enda större uppgift där lösningen ska redovisas och motiveras.',
        },
        D: {
            tid: '',
            hjalpmedel: 'Digitala verktyg, formelblad och linjal',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Lösningarna ska redovisas, om inte uppgiften anger att endast svar krävs.',
        },
    },
    uppgifter: [

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [1, 0, 0], omrade: 'Ekvationer',
            endastSvar: true,
            fraga: 'Lös ekvationen $12x + 5 = 12 - 2x$',
            figur: null,
            steg: [
                {
                    rubrik: 'Samla x-termerna i ena ledet',
                    varfor: 'För att lösa ut $x$ vill vi ha alla termer med $x$ i ett led och alla ' +
                        'rena tal i det andra. Vi adderar $2x$ till båda leden så att $-2x$ försvinner ' +
                        'från högerledet.',
                    text: '$$12x + 5 = 12 - 2x$$\n\nAddera $2x$ till båda leden:\n\n' +
                        '$$14x + 5 = 12$$',
                },
                {
                    rubrik: 'Lös ut x',
                    text: 'Subtrahera $5$ från båda leden:\n\n$$14x = 7$$\n\n' +
                        'Dela båda leden med $14$:\n\n$$x = \\dfrac{7}{14} = 0{,}5$$\n\n' +
                        '**Kontroll:** $12 \\cdot 0{,}5 + 5 = 11$ och $12 - 2 \\cdot 0{,}5 = 11$ ✓',
                },
            ],
            svar: '$x = 0{,}5$',
            bedomning: [['Korrekt svar: $x = 0{,}5$', '+E']],
        },

        {
            nr: 2, del: 'B', poang: [1, 0, 0], omrade: 'Vektorer',
            endastSvar: true,
            fraga: 'Addera vektorerna $\\vec{u} = (3,\\ 4)$ och $\\vec{v} = (2,\\ -5)$',
            figur: null,
            steg: [
                {
                    rubrik: 'Addera koordinatvis',
                    varfor: 'Vektorer adderas genom att $x$-koordinaterna läggs ihop för sig och ' +
                        '$y$-koordinaterna för sig — precis som att göra två förflyttningar efter varandra.',
                    text: '$$\\vec{u} + \\vec{v} = (3 + 2,\\ 4 + (-5)) = (5,\\ -1)$$',
                },
            ],
            svar: '$(5,\\ -1)$',
            bedomning: [['Korrekt svar: $(5,\\ -1)$', '+E']],
        },

        {
            nr: 3, del: 'B', poang: [2, 0, 0], omrade: 'Räta linjen — Celsius/Fahrenheit',
            endastSvar: false,
            fraga: 'Sambandet mellan temperatur i grader Celsius ($\\degree$C) och grader Fahrenheit ' +
                '($\\degree$F) är linjärt. Temperaturen $-18\\degree$C motsvarar ungefär $0\\degree$F ' +
                'och $38\\degree$C motsvarar ungefär $100\\degree$F.\n\n' +
                '**a)** Rita i koordinatsystemet en graf som visar sambandet mellan temperatur mätt i ' +
                '$\\degree$C och $\\degree$F.\n\n' +
                '**b)** Avläs i din graf hur många grader Fahrenheit ($\\degree$F) som motsvaras av $0\\degree$C.',
            figur: 'u3',
            steg: [
                {
                    del: 'a', rubrik: 'Markera de två kända punkterna',
                    varfor: 'En rät linje bestäms helt av två punkter. Vi har två motsvarigheter mellan ' +
                        'skalorna — lägg $\\degree$C på $x$-axeln och $\\degree$F på $y$-axeln, så blir ' +
                        'punkterna $(x,\\ y) = (\\degree\\text{C},\\ \\degree\\text{F})$.',
                    text: 'De två punkterna är\n\n$$(-18,\\ 0) \\qquad \\text{och} \\qquad (38,\\ 100)$$',
                    figur: 'u3-los1',
                },
                {
                    del: 'a', rubrik: 'Dra linjen genom punkterna',
                    varfor: 'Eftersom sambandet är linjärt förbinder en rät linje de två punkterna — ' +
                        'och beskriver då alla temperaturer däremellan och utanför.',
                    text: 'Dra en rät linje genom $(-18,\\ 0)$ och $(38,\\ 100)$ och förläng den åt båda hållen:',
                    figur: 'u3-los2',
                    delsvar: { del: 'a', text: 'En rät linje genom $(-18,\\ 0)$ och $(38,\\ 100)$ — se figuren.' },
                },
                {
                    del: 'b', rubrik: 'Läs av var linjen skär y-axeln (0 °C)',
                    varfor: '$0\\degree$C ligger på $y$-axeln ($x = 0$). Gå rakt upp från $x = 0$ till linjen ' +
                        'och läs av $y$-värdet — det är antalet grader Fahrenheit.',
                    text: 'Vid $x = 0$ ligger linjen på ungefär $y = 32$:\n\n$$0\\degree\\text{C} \\approx 32\\degree\\text{F}$$\n\n' +
                        '(Ett avläst värde i intervallet $30$–$35\\degree$F godtas.)',
                    figur: 'u3-los3',
                    delsvar: { del: 'b', text: 'Ungefär $32\\degree$F (avläst i intervallet $30$–$35\\degree$F)' },
                },
            ],
            svar: '**a)** En rät linje genom $(-18,\\ 0)$ och $(38,\\ 100)$ **b)** ungefär $32\\degree$F ($30$–$35\\degree$F)',
            bedomning: [
                ['a) Godtagbart ritad graf', '+E'],
                ['b) Godtagbart svar i intervallet $30$–$35\\degree$F', '+E'],
            ],
        },

        {
            nr: 4, del: 'B', poang: [1, 1, 0], omrade: 'Algebraiska uttryck',
            endastSvar: false,
            fraga: 'Utgå från uttrycket $4(x + 2) - 3(2x - 2)$\n\n' +
                '**a)** Beräkna uttryckets värde om $x = 1$.\n\n' +
                '**b)** Bestäm $x$ så att uttryckets värde blir 18. Redovisa din lösning.',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Sätt in x = 1 i uttrycket',
                    varfor: 'Att "beräkna värdet om $x = 1$" betyder att vi ersätter varje $x$ med $1$ ' +
                        'och räknar ut. Man kan sätta in direkt utan att först förenkla.',
                    text: '$$4(1 + 2) - 3(2 \\cdot 1 - 2) = 4 \\cdot 3 - 3 \\cdot 0 = 12$$',
                    delsvar: { del: 'a', text: 'Uttryckets värde är $12$' },
                },
                {
                    del: 'b', rubrik: 'Förenkla uttrycket',
                    varfor: 'Innan vi löser ekvationen förenklar vi uttrycket: multiplicera in $4$:an ' +
                        'och $3$:an och dra ihop lika termer. Tänk på att $-3$ gånger $-2$ blir $+6$.',
                    text: '$$4(x + 2) - 3(2x - 2) = 4x + 8 - 6x + 6 = -2x + 14$$',
                },
                {
                    del: 'b', rubrik: 'Lös ekvationen −2x + 14 = 18',
                    text: 'Uttryckets värde ska bli $18$:\n\n$$-2x + 14 = 18$$\n\n' +
                        'Subtrahera $14$ från båda leden:\n\n$$-2x = 4$$\n\n' +
                        'Dela båda leden med $-2$:\n\n$$x = -2$$\n\n' +
                        '**Kontroll:** $4(-2 + 2) - 3(-4 - 2) = 0 - 3 \\cdot (-6) = 18$ ✓',
                    delsvar: { del: 'b', text: '$x = -2$' },
                },
            ],
            svar: '**a)** $12$ **b)** $x = -2$',
            bedomning: [
                ['a) Korrekt svar: $12$', '+E'],
                ['b) Påbörjad lösning, t.ex. multiplicerar in $4$ och $3$ i parenteserna', '+E'],
                ['b) Lösning med korrekt svar: $x = -2$', '+C'],
            ],
        },

        {
            nr: 5, del: 'B', poang: [1, 1, 0], omrade: 'Andelar — promille och ppm',
            endastSvar: true,
            fraga: 'Vilket eller vilka av följande alternativ motsvarar $0{,}12\\ \\%$? Ringa in ditt/dina svar.\n\n' +
                '$12\\ ‰ \\qquad 1{,}2\\ ‰ \\qquad 120\\ ‰ \\qquad 120\\ \\text{ppm} \\qquad 1200\\ \\text{ppm}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv om alla andelar i decimalform',
                    varfor: 'De olika enheterna ($\\%$, ‰, ppm) är bara olika sätt att ange en andel. ' +
                        'Skriver vi om allt i decimalform kan vi jämföra direkt. Kom ihåg: ' +
                        '$1\\ \\% = \\frac{1}{100}$, $1\\ ‰ = \\frac{1}{1000}$, $1\\ \\text{ppm} = \\frac{1}{1\\,000\\,000}$.',
                    text: 'Frågan gäller\n\n$$0{,}12\\ \\% = \\dfrac{0{,}12}{100} = 0{,}0012$$',
                },
                {
                    rubrik: 'Räkna om varje alternativ',
                    text: '- $12\\ ‰ = \\frac{12}{1000} = 0{,}012$ — för stort\n' +
                        '- $1{,}2\\ ‰ = \\frac{1{,}2}{1000} = 0{,}0012$ — **stämmer**\n' +
                        '- $120\\ ‰ = \\frac{120}{1000} = 0{,}12$ — för stort\n' +
                        '- $120\\ \\text{ppm} = \\frac{120}{1\\,000\\,000} = 0{,}00012$ — för litet\n' +
                        '- $1200\\ \\text{ppm} = \\frac{1200}{1\\,000\\,000} = 0{,}0012$ — **stämmer**',
                },
            ],
            svar: '$1{,}2\\ ‰$ och $1200\\ \\text{ppm}$',
            bedomning: [
                ['Minst ett korrekt och max ett felaktigt svar', '+E'],
                ['Två korrekta och inget felaktigt svar: $1{,}2\\ ‰$ och $1200\\ \\text{ppm}$', '+C'],
            ],
        },

        {
            nr: 6, del: 'B', poang: [0, 1, 0], omrade: 'Räta linjen — avläsning ur graf',
            endastSvar: true,
            fraga: 'Hamed är dykare. När han dyker nedåt från vattenytan gör han det med samma hastighet ' +
                'hela tiden. Vid ett dyk startar han dykdatorn när han är 6 meter under vattenytan. ' +
                'Dykdatorns data visas i diagrammet.\n\n' +
                'Hur lång tid tar det för Hamed att komma från vattenytan ner till 18 meters djup?',
            figur: 'u6',
            steg: [
                {
                    rubrik: 'Bestäm dykhastigheten ur grafen',
                    varfor: 'Hastigheten är hur många meter djupare han kommer per minut — det är grafens ' +
                        'lutning. Läs av två punkter på linjen och se hur mycket djupet ändras per minut.',
                    text: 'Vid $t = 0$ är han på $-6$ m (djupet där dykdatorn startade). ' +
                        'Två minuter senare, vid $t = 2$, är han på $-12$ m. Han sjunker alltså $6$ m på $2$ min:\n\n' +
                        '$$\\text{hastighet} = \\dfrac{6\\ \\text{m}}{2\\ \\text{min}} = 3\\ \\text{m/min}$$',
                    figur: 'u6-los',
                },
                {
                    rubrik: 'Räkna ut tiden från ytan till 18 m djup',
                    varfor: 'Hastigheten är konstant hela dyket, även före dykdatorn startade. Från ytan ' +
                        '($0$ m) till $18$ m djup är det $18$ m, och han rör sig $3$ m varje minut.',
                    text: '$$\\text{tid} = \\dfrac{18\\ \\text{m}}{3\\ \\text{m/min}} = 6\\ \\text{minuter}$$',
                },
            ],
            svar: '6 minuter',
            bedomning: [['Godtagbart svar: 6 minuter', '+C']],
        },

        {
            nr: 7, del: 'B', poang: [0, 1, 0], omrade: 'Talteori',
            endastSvar: true,
            fraga: 'Lisa tänker på ett heltal mellan 40 och 50.\n\n' +
                '- Talet är *inte* delbart med 2.\n' +
                '- Talet är *inte* delbart med 3.\n' +
                '- Talet är *inte* ett primtal.\n\n' +
                'Vilket tal tänker hon på?',
            figur: null,
            steg: [
                {
                    rubrik: 'Ta bort de jämna talen',
                    varfor: '"Inte delbart med 2" betyder att talet är udda. Vi stryker alla jämna tal ' +
                        'mellan 40 och 50.',
                    text: 'Udda tal mellan $40$ och $50$: $41,\\ 43,\\ 45,\\ 47,\\ 49$',
                },
                {
                    rubrik: 'Ta bort tal delbara med 3',
                    varfor: 'Ett tal är delbart med $3$ om siffersumman är delbar med $3$. ' +
                        '$45$ har siffersumman $4 + 5 = 9$, som är delbart med $3$ — stryk det.',
                    text: 'Kvar: $41,\\ 43,\\ 47,\\ 49$',
                },
                {
                    rubrik: 'Behåll det tal som inte är primtal',
                    varfor: 'Ett primtal är bara delbart med $1$ och sig självt. Vi söker det tal som ' +
                        '*inte* är ett primtal — det måste ha någon annan delare.',
                    text: '$41$, $43$ och $47$ är primtal. Men $49 = 7 \\cdot 7$ är inte ett primtal.\n\n' +
                        'Alltså tänker Lisa på $49$.',
                },
            ],
            svar: '49',
            bedomning: [['Korrekt svar: 49', '+C']],
        },

        {
            nr: 8, del: 'B', poang: [0, 1, 0], omrade: 'Potenser',
            endastSvar: true,
            fraga: 'Ringa in de potenser som har samma värde.\n\n' +
                '$0^5 \\qquad 1^4 \\qquad 2^3 \\qquad 3^2 \\qquad 4^1 \\qquad 5^0$',
            figur: null,
            steg: [
                {
                    rubrik: 'Beräkna varje potens',
                    varfor: 'En potens $a^b$ betyder $a$ multiplicerat med sig självt $b$ gånger. ' +
                        'Två specialfall: allt upphöjt till $0$ blir $1$, och $1$ upphöjt till vad ' +
                        'som helst blir $1$.',
                    text: '$$0^5 = 0 \\qquad 1^4 = 1 \\qquad 2^3 = 8 \\qquad 3^2 = 9 \\qquad 4^1 = 4 \\qquad 5^0 = 1$$',
                },
                {
                    rubrik: 'Hitta de lika värdena',
                    text: 'Två av potenserna har värdet $1$:\n\n$$1^4 = 1 \\qquad \\text{och} \\qquad 5^0 = 1$$',
                },
            ],
            svar: '$1^4$ och $5^0$ (båda $= 1$)',
            bedomning: [['Korrekt svar: $1^4$ och $5^0$', '+C']],
        },

        {
            nr: 9, del: 'B', poang: [0, 1, 0], omrade: 'Algebra',
            endastSvar: true,
            fraga: 'Vilket värde får uttrycket $3x + 12$ om $x + 4 = 12$?',
            figur: null,
            steg: [
                {
                    rubrik: 'Se sambandet mellan uttrycken',
                    varfor: 'I stället för att först lösa ut $x$ kan vi se att $3x + 12$ är $3$ gånger ' +
                        '$(x + 4)$ — bryt ut $3$: $3x + 12 = 3(x + 4)$. Och $x + 4$ känner vi redan värdet på.',
                    text: '$$3x + 12 = 3(x + 4)$$',
                },
                {
                    rubrik: 'Sätt in det kända värdet',
                    text: 'Eftersom $x + 4 = 12$:\n\n$$3(x + 4) = 3 \\cdot 12 = 36$$\n\n' +
                        '(Man kan också först lösa ut $x = 8$ och sätta in: $3 \\cdot 8 + 12 = 36$.)',
                },
            ],
            svar: '36',
            bedomning: [['Korrekt svar: 36', '+C']],
        },

        {
            nr: 10, del: 'B', poang: [0, 1, 0], omrade: 'Talbaser — binära tal',
            endastSvar: true,
            fraga: 'Matematikläraren fyller år och eleverna vill överraska henne med en tårta. ' +
                'Läraren undrar först varför bara tre av sex ljus är tända, men förstår sedan att eleverna ' +
                'har skrivit hennes ålder i binär form, bas två. Hur många år fyller matematikläraren?',
            figur: 'u10',
            steg: [
                {
                    rubrik: 'Ge varje ljus sitt platsvärde',
                    varfor: 'I det binära talsystemet (bas två) har varje position ett värde som är en ' +
                        'tvåpotens. Med sex ljus blir platsvärdena, från vänster till höger, ' +
                        '$32,\\ 16,\\ 8,\\ 4,\\ 2,\\ 1$. Ett tänt ljus betyder att platsvärdet ska räknas med.',
                    text: '$$\\underbrace{32}_{\\text{ljus 1}} \\quad \\underbrace{16}_{\\text{ljus 2}} \\quad ' +
                        '\\underbrace{8}_{\\text{ljus 3}} \\quad \\underbrace{4}_{\\text{ljus 4}} \\quad ' +
                        '\\underbrace{2}_{\\text{ljus 5}} \\quad \\underbrace{1}_{\\text{ljus 6}}$$',
                    figur: 'u10-los',
                },
                {
                    rubrik: 'Addera platsvärdena för de tända ljusen',
                    varfor: 'Tre ljus är tända. På tårtan är det ljusen med platsvärdena $32$, $16$ och $2$ ' +
                        'som lyser — motsvarande binärt $110010$. Åldern är summan av deras platsvärden.',
                    text: '$$32 + 16 + 2 = 50$$\n\nLäraren fyller alltså $50$ år.',
                },
            ],
            svar: '50 år',
            bedomning: [['Korrekt svar: 50', '+C']],
        },

        {
            nr: 11, del: 'B', poang: [1, 1, 1], omrade: 'Funktioner — definitions- och värdemängd',
            endastSvar: false,
            fraga: 'Rita en möjlig graf till funktionen $f$ i koordinatsystemet. För funktionen $f$ gäller att:\n\n' +
                '- Definitionsmängden är $-5 \\leq x \\leq 6$\n' +
                '- $f(-3) = 0$\n' +
                '- Värdemängden är $-2 \\leq f(x) \\leq 4$',
            figur: 'u11',
            steg: [
                {
                    rubrik: 'Tolka de tre villkoren',
                    varfor: 'Varje villkor säger något om var grafen får finnas. Innan vi ritar översätter ' +
                        'vi dem till konkreta begränsningar i koordinatsystemet.',
                    text: '- **Definitionsmängd** $-5 \\leq x \\leq 6$: grafen får bara finnas mellan ' +
                        '$x = -5$ och $x = 6$ (den börjar och slutar där).\n' +
                        '- **$f(-3) = 0$**: grafen ska gå genom punkten $(-3,\\ 0)$.\n' +
                        '- **Värdemängd** $-2 \\leq f(x) \\leq 4$: alla $y$-värden ska ligga mellan $-2$ och $4$, ' +
                        'och både $-2$ och $4$ ska nås någon gång.',
                },
                {
                    rubrik: 'Rita en kurva som uppfyller allt',
                    varfor: 'Det finns oändligt många riktiga svar — vilken kurva som helst duger så länge ' +
                        'de tre villkoren är uppfyllda. Vi väljer en enkel kurva som passerar $(-3,\\ 0)$, ' +
                        'nuddar $y = 4$ som högst och $y = -2$ som lägst, och håller sig inom $-5 \\leq x \\leq 6$.',
                    text: 'Ett möjligt exempel (ändpunkterna vid $x = -5$ och $x = 6$ markerade):',
                    figur: 'u11-los',
                },
            ],
            svar: 'En kurva inom $-5 \\leq x \\leq 6$ som går genom $(-3,\\ 0)$ och vars $y$-värden fyller ' +
                '$-2 \\leq f(x) \\leq 4$ — se exemplet i figuren. (Flera riktiga svar finns.)',
            bedomning: [
                ['Ett av de tre villkoren är uppfyllt', '+E'],
                ['Godtagbart ritad graf där två av de tre villkoren är uppfyllda', '+C'],
                ['Godtagbart ritad graf där samtliga tre villkor är uppfyllda', '+A'],
            ],
        },

        {
            nr: 12, del: 'B', poang: [0, 0, 1], omrade: 'Ekvationer med två variabler',
            endastSvar: true,
            fraga: 'Det finns många olika värden på $x$ och $y$ som löser ekvationen $8x - y = 10$.\n\n' +
                'Hitta en lösning till ekvationen där $x$ och $y$ har samma värde.',
            figur: null,
            steg: [
                {
                    rubrik: 'Använd villkoret att x och y är lika',
                    varfor: 'Ekvationen har oändligt många lösningar, men vi söker den där $x$ och $y$ är ' +
                        'lika. Då kan vi byta ut $y$ mot $x$ — så blir det en ekvation med bara en obekant.',
                    text: 'Sätt $y = x$ i ekvationen:\n\n$$8x - x = 10$$',
                },
                {
                    rubrik: 'Lös ut värdet',
                    text: '$$7x = 10 \\quad \\Longrightarrow \\quad x = \\dfrac{10}{7}$$\n\n' +
                        'Eftersom $y = x$ är $y = \\dfrac{10}{7}$ också.\n\n' +
                        '**Kontroll:** $8 \\cdot \\frac{10}{7} - \\frac{10}{7} = 7 \\cdot \\frac{10}{7} = 10$ ✓',
                },
            ],
            svar: '$x = y = \\dfrac{10}{7}$',
            bedomning: [['Korrekt svar: $x = y = \\dfrac{10}{7}$', '+A']],
        },

        {
            nr: 13, del: 'B', poang: [0, 1, 2], omrade: 'Trigonometri',
            endastSvar: false,
            fraga: 'De två kortaste sidorna i en rätvinklig triangel har längderna $\\sqrt{3}$ och 2. ' +
                'Låt $v$ vara den minsta vinkeln i triangeln. Vilket värde har $\\sin v$? ' +
                'Ringa in ditt svar och motivera.\n\n' +
                '$\\sqrt{\\dfrac{3}{7}} \\qquad \\sqrt{\\dfrac{4}{7}} \\qquad \\sqrt{\\dfrac{3}{5}} \\qquad ' +
                '\\sqrt{\\dfrac{3}{4}} \\qquad \\sqrt{\\dfrac{4}{5}}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Identifiera kateter och hypotenusa',
                    varfor: 'I en rätvinklig triangel är de två kortaste sidorna alltid kateterna, ' +
                        'och den längsta sidan är hypotenusan. Så $\\sqrt{3}$ och $2$ är kateterna.',
                    text: 'Kateterna är $\\sqrt{3}$ och $2$ (notera att $\\sqrt{3} \\approx 1{,}7 < 2$). ' +
                        'Hypotenusan är den sida vi ännu inte känner.',
                    figur: 'u13-los',
                },
                {
                    rubrik: 'Beräkna hypotenusan med Pythagoras sats',
                    varfor: 'Pythagoras sats binder ihop sidorna i en rätvinklig triangel: ' +
                        'summan av kateternas kvadrater är lika med hypotenusans kvadrat.',
                    text: '$$\\text{hypotenusan} = \\sqrt{(\\sqrt{3})^2 + 2^2} = \\sqrt{3 + 4} = \\sqrt{7}$$',
                },
                {
                    rubrik: 'Bestäm sin v för den minsta vinkeln',
                    varfor: 'Den minsta vinkeln ligger mitt emot den kortaste sidan. Kortast är ' +
                        '$\\sqrt{3}$, så den motstående kateten till $v$ är $\\sqrt{3}$. ' +
                        'Sinus = motstående katet genom hypotenusan.',
                    text: '$$\\sin v = \\dfrac{\\sqrt{3}}{\\sqrt{7}} = \\sqrt{\\dfrac{3}{7}}$$\n\n' +
                        '(Här användes att $\\dfrac{\\sqrt{3}}{\\sqrt{7}} = \\sqrt{\\dfrac{3}{7}}$.)',
                },
            ],
            svar: '$\\sin v = \\sqrt{\\dfrac{3}{7}}$',
            bedomning: [
                ['Påbörjad lösning, t.ex. visar hur kateternas längder och vinkeln $v$ förhåller sig, ' +
                    'eller bestämmer hypotenusans längd', '+C'],
                ['Lösning med korrekt svar: $\\sqrt{\\frac{3}{7}}$', '+A'],
                ['Redovisning som är lätt att följa med tydlig koppling till triangeln', '+A'],
            ],
        },

        {
            nr: 14, del: 'B', poang: [0, 0, 2], omrade: 'Vektorer',
            endastSvar: false,
            fraga: 'I rutnätet visas representanter för vektorerna $\\vec{u}$ och $\\vec{w}$. ' +
                'Rita i samma rutnät en representant för vektorn $\\vec{v}$ som uppfyller ' +
                '$2\\vec{u} - 2\\vec{v} = \\vec{w}$. Redovisa din lösning.',
            figur: 'u14',
            steg: [
                {
                    rubrik: 'Lös ut v ur sambandet',
                    varfor: 'Vi behöver ett uttryck för $\\vec{v}$ med hjälp av $\\vec{u}$ och $\\vec{w}$. ' +
                        'Behandla sambandet som en vanlig ekvation och lös ut $\\vec{v}$.',
                    text: '$$2\\vec{u} - 2\\vec{v} = \\vec{w}$$\n\nFlytta över och dela med $2$:\n\n' +
                        '$$2\\vec{v} = 2\\vec{u} - \\vec{w} \\quad \\Longrightarrow \\quad ' +
                        '\\vec{v} = \\vec{u} - \\dfrac{\\vec{w}}{2}$$',
                },
                {
                    rubrik: 'Läs av u och w i rutnätet',
                    varfor: 'För att räkna med vektorerna uttrycker vi dem i koordinatform ' +
                        '(antal rutor åt höger, antal rutor uppåt) genom att räkna rutor från svans till spets.',
                    text: '$$\\vec{u} = (4,\\ 2) \\qquad \\vec{w} = (4,\\ 0)$$',
                },
                {
                    rubrik: 'Beräkna v och rita den',
                    text: '$$\\vec{v} = \\vec{u} - \\dfrac{\\vec{w}}{2} = (4,\\ 2) - \\dfrac{(4,\\ 0)}{2} = ' +
                        '(4,\\ 2) - (2,\\ 0) = (2,\\ 2)$$\n\n' +
                        'Rita alltså $\\vec{v}$ som en pil $2$ rutor åt höger och $2$ rutor uppåt.\n\n' +
                        '**Kontroll:** $2(4,2) - 2(2,2) = (8,4) - (4,4) = (4,0) = \\vec{w}$ ✓',
                    figur: 'u14-los',
                },
            ],
            svar: '$\\vec{v} = (2,\\ 2)$ — en pil 2 rutor åt höger och 2 rutor uppåt (se figuren).',
            bedomning: [
                ['Påbörjad lösning, t.ex. ritar en vektorpolygon även om vektorn $\\vec{v}$ har fel riktning', '+A'],
                ['Lösning med godtagbart svar där storlek och riktning tydligt framgår', '+A'],
            ],
        },

        {
            nr: 15, del: 'B', poang: [0, 1, 1], omrade: 'Potenser och rötter',
            endastSvar: false,
            fraga: 'Lös ekvationen $\\left(\\left(\\sqrt{3}\\right)^x\\right)^4 = 3^6$. Redovisa din lösning.',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv om vänsterledet med potenslagarna',
                    varfor: 'Vänsterledet har en potens av en potens. Potenslagen $(a^m)^n = a^{m \\cdot n}$ ' +
                        'låter oss slå ihop exponenterna. Skriv också $\\sqrt{3} = 3^{1/2}$ så att båda ' +
                        'leden får basen $3$ — då kan vi jämföra exponenterna.',
                    text: '$$\\left(\\left(\\sqrt{3}\\right)^x\\right)^4 = \\left(\\sqrt{3}\\right)^{4x} = ' +
                        '\\left(3^{1/2}\\right)^{4x} = 3^{\\frac{4x}{2}} = 3^{2x}$$',
                },
                {
                    rubrik: 'Jämför exponenterna och lös ut x',
                    varfor: 'Nu står samma bas ($3$) i båda leden. Två potenser med samma bas är lika ' +
                        'precis när exponenterna är lika.',
                    text: '$$3^{2x} = 3^6 \\quad \\Longrightarrow \\quad 2x = 6 \\quad \\Longrightarrow \\quad x = 3$$',
                },
            ],
            svar: '$x = 3$',
            bedomning: [
                ['Påbörjad lösning, använder potenslagarna och förenklar i något steg', '+C'],
                ['Lösning med korrekt svar: $x = 3$', '+A'],
            ],
        },

        // ================= DELPROV C =================
        {
            nr: 16, del: 'C', poang: [4, 4, 4], omrade: 'Sannolikhet — tärningsspelet Azaloo',
            endastSvar: false,
            fraga: 'I ett tärningsspel som kallas Azaloo kastar man två sexsidiga tärningar samtidigt.\n\n' +
                '- Om tärningarna visar *olika* antal prickar får man lika många poäng som antalet prickar ' +
                'på den tärning som visar *minsta* antalet prickar.\n' +
                '- Om tärningarna visar *samma* antal prickar får man lika många *minuspoäng* som antalet ' +
                'prickar tärningarna visar tillsammans.\n\n' +
                'Exempel: $(2,\\ 1)$ ger $+1$ poäng (minst är $1$). $(3,\\ 3)$ ger $-6$ poäng ' +
                '(lika, tillsammans $6$). $(4,\\ 4)$ ger $-8$ poäng.\n\n' +
                '**I.** Vad är sannolikheten att få $-8$ poäng vid ett kast?\n\n' +
                '**II.** Vad är sannolikheten att få minuspoäng vid ett kast?\n\n' +
                '**III.** Vad är sannolikheten att få precis $+1$ poäng vid ett kast?\n\n' +
                '**IV.** Man kastar tärningarna upprepade gånger och adderar resultaten. ' +
                'Vad är sannolikheten att man har totalt $+10$ poäng efter två kastomgångar?\n\n' +
                '**V.** Undersök vad som händer med totalpoängen om man spelar många kastomgångar under ' +
                'en längre tid och adderar resultaten från varje kastomgång.',
            figur: 'u16',
            steg: [
                {
                    del: 'I', rubrik: 'Räkna alla möjliga kast',
                    varfor: 'Sannolikhet = gynnsamma utfall genom möjliga utfall. Två tärningar med sex ' +
                        'sidor var ger, om vi håller isär vilken tärning som är vilken, ' +
                        '$6 \\cdot 6 = 36$ lika sannolika utfall. Det är nämnaren i alla delfrågorna.',
                    text: '$$\\text{antal möjliga utfall} = 6 \\cdot 6 = 36$$',
                    figur: 'u16-los',
                },
                {
                    del: 'I', rubrik: 'Hitta utfallen som ger −8 poäng',
                    varfor: 'Man får $-8$ poäng bara när tärningarna är *lika* och tillsammans visar $8$ ' +
                        'prickar. Det kräver att båda visar $4$ (eftersom $4 + 4 = 8$).',
                    text: 'Endast utfallet $(4,\\ 4)$ ger $-8$ poäng — $1$ gynnsamt utfall av $36$:\n\n' +
                        '$$P(-8) = \\dfrac{1}{36}$$',
                    delsvar: { del: 'I', text: '$P(-8) = \\dfrac{1}{36}$' },
                },
                {
                    del: 'II', rubrik: 'Hitta utfallen som ger minuspoäng',
                    varfor: 'Man får minuspoäng så fort tärningarna visar *samma* antal prickar — ' +
                        'oavsett vilket. Räkna alla "par".',
                    text: 'De lika utfallen är $(1,1),\\ (2,2),\\ (3,3),\\ (4,4),\\ (5,5),\\ (6,6)$ — $6$ stycken:\n\n' +
                        '$$P(\\text{minuspoäng}) = \\dfrac{6}{36} = \\dfrac{1}{6}$$',
                    delsvar: { del: 'II', text: '$P(\\text{minuspoäng}) = \\dfrac{6}{36} = \\dfrac{1}{6}$' },
                },
                {
                    del: 'III', rubrik: 'Hitta utfallen som ger precis +1 poäng',
                    varfor: 'Man får $+1$ poäng när tärningarna är *olika* och den minsta visar $1$. ' +
                        'Det betyder att den ena tärningen visar $1$ och den andra visar något annat ' +
                        '($2$–$6$). Vi måste räkna båda ordningarna, eftersom tärningarna hålls isär.',
                    text: 'Ettan kan ligga på första tärningen: $(1,2),(1,3),(1,4),(1,5),(1,6)$ — $5$ st, ' +
                        'eller på andra: $(2,1),(3,1),(4,1),(5,1),(6,1)$ — $5$ st. Totalt $10$ utfall:\n\n' +
                        '$$P(+1) = \\dfrac{10}{36} = \\dfrac{5}{18}$$',
                    delsvar: { del: 'III', text: '$P(+1) = \\dfrac{10}{36} = \\dfrac{5}{18}$' },
                },
                {
                    del: 'IV', rubrik: 'Ta reda på hur +10 kan uppstå på två omgångar',
                    varfor: 'Den högsta poäng man kan få på en enda omgång är $+5$ (då den minsta ' +
                        'tärningen visar $5$, dvs. utfallen $(5,6)$ och $(6,5)$). Eftersom $+5$ är taket ' +
                        'per omgång måste $+10$ på två omgångar komma som $+5$ i varje omgång.',
                    text: 'Sannolikheten för $+5$ i en omgång: utfallen $(5,6)$ och $(6,5)$, alltså\n\n' +
                        '$$P(+5) = \\dfrac{2}{36} = \\dfrac{1}{18}$$',
                },
                {
                    del: 'IV', rubrik: 'Multiplicera för båda omgångarna',
                    varfor: 'Omgångarna är oberoende, så sannolikheten att få $+5$ i *både* första och ' +
                        'andra omgången är produkten av de två sannolikheterna.',
                    text: '$$P(+10 \\text{ på två omgångar}) = \\dfrac{2}{36} \\cdot \\dfrac{2}{36} = ' +
                        '\\dfrac{4}{1296} = \\dfrac{1}{324}$$',
                    delsvar: { del: 'IV', text: '$P(+10) = \\left(\\dfrac{2}{36}\\right)^2 = \\dfrac{1}{324} \\approx 0{,}003$' },
                },
                {
                    del: 'V', rubrik: 'Summera poängen över alla 36 utfall',
                    varfor: 'För att förstå vad som händer i längden räknar vi den *genomsnittliga* ' +
                        'poängen per omgång (väntevärdet). Först summerar vi poängen från samtliga $36$ ' +
                        'lika sannolika utfall — de positiva (olika tärningar) och de negativa (lika tärningar).',
                    text: 'Positiva utfall, grupperade efter den minsta tärningen:\n\n' +
                        '- minst $1$: $10$ utfall $\\times\\, 1 = 10$\n' +
                        '- minst $2$: $8$ utfall $\\times\\, 2 = 16$\n' +
                        '- minst $3$: $6$ utfall $\\times\\, 3 = 18$\n' +
                        '- minst $4$: $4$ utfall $\\times\\, 4 = 16$\n' +
                        '- minst $5$: $2$ utfall $\\times\\, 5 = 10$\n\n' +
                        'Summa positivt: $10 + 16 + 18 + 16 + 10 = 70$.\n\n' +
                        'Negativa utfall (lika tärningar): $-(2 + 4 + 6 + 8 + 10 + 12) = -42$.',
                },
                {
                    del: 'V', rubrik: 'Beräkna genomsnittspoängen per omgång',
                    varfor: 'Den genomsnittliga poängen per omgång är den totala poängsumman delad med ' +
                        'antalet utfall. Är den positiv växer totalpoängen i längden; är den negativ ' +
                        'sjunker den.',
                    text: 'Total poängsumma över alla utfall: $70 - 42 = 28$. Genomsnitt per omgång:\n\n' +
                        '$$\\dfrac{28}{36} = \\dfrac{7}{9} \\approx 0{,}78 \\text{ poäng per omgång}$$\n\n' +
                        'Genomsnittet är positivt, så i längden **ökar** totalpoängen — med ungefär ' +
                        '$0{,}78$ poäng per kastomgång.',
                    delsvar: { del: 'V', text: 'Genomsnittet är $\\dfrac{28}{36} = \\dfrac{7}{9} \\approx 0{,}78$ ' +
                        'poäng per omgång — totalpoängen ökar alltså i längden.' },
                },
            ],
            svar: '**I.** $\\dfrac{1}{36}$ **II.** $\\dfrac{1}{6}$ **III.** $\\dfrac{5}{18}$ ' +
                '**IV.** $\\dfrac{1}{324}$ **V.** genomsnittet $\\dfrac{7}{9} \\approx 0{,}78$ poäng/omgång, ' +
                'så totalpoängen ökar i längden.',
            bedomning: [
                ['Anger att det finns 36 möjliga kombinationer', '+E'],
                ['Gör någon sannolikhetsberäkning korrekt', '+E'],
                ['Anger antalet gynnsamma utfall för mer än en efterfrågad sannolikhet', '+E'],
                ['Anger antalet gynnsamma utfall för $+1$ poäng (eller de två utfallen $(5,6)$ och $(6,5)$ för $+10$)', '+C'],
                ['Beräknar sannolikheten för $+1$ poäng eller $+5$ poäng i en omgång', '+C'],
                ['Påbörjar en undersökning av totalpoängen i längden (resonemang om summan av möjliga poäng)', '+C'],
                ['Beräknar sannolikheten för $+10$ poäng i två kastomgångar', '+A'],
                ['Beräknar den genomsnittliga poängökningen', '+A'],
                ['För ett resonemang om att totalpoängen ökar, utifrån korrekta motiveringar', '+A'],
            ],
        },

        // ================= DELPROV D =================
        {
            nr: 17, del: 'D', poang: [2, 0, 0], omrade: 'Trigonometri — tillämpning',
            endastSvar: false,
            fraga: 'När man ska fälla ett träd är det viktigt att veta hur högt trädet är. ' +
                'Petra mäter avståndet fram till trädet och vinkeln till toppen med ett instrument (se figur). ' +
                'Avståndet är $30$ m, vinkeln är $20\\degree$ och Petras öga är $1{,}6$ m över marken. ' +
                'Beräkna trädets höjd.',
            figur: 'u17',
            steg: [
                {
                    rubrik: 'Rita den rätvinkliga triangeln',
                    varfor: 'Petras blicklinje, det vågräta avståndet och den lodräta sträckan upp till ' +
                        'trädets topp bildar en rätvinklig triangel. Vinkeln $20\\degree$ sitter vid ögat, ' +
                        'det vågräta avståndet $30$ m är närliggande katet och den sökta höjden ovanför ' +
                        'ögonhöjd är motstående katet.',
                    text: 'Kalla höjden från ögonnivå upp till toppen $h$.',
                    figur: 'u17-los',
                },
                {
                    rubrik: 'Ställ upp ett trigonometriskt samband',
                    varfor: 'Vi känner närliggande katet ($30$ m) och söker motstående katet ($h$) — ' +
                        'då passar tangens: $\\tan v = \\dfrac{\\text{motstående}}{\\text{närliggande}}$.',
                    text: '$$\\tan 20\\degree = \\dfrac{h}{30}$$',
                },
                {
                    rubrik: 'Lös ut h',
                    text: '$$h = 30 \\cdot \\tan 20\\degree \\approx 30 \\cdot 0{,}364 \\approx 10{,}9\\ \\text{m}$$',
                },
                {
                    rubrik: 'Lägg till ögonhöjden',
                    varfor: 'Triangeln räknar bara höjden *ovanför Petras öga*. Trädet börjar vid marken, ' +
                        'så vi måste lägga till ögonhöjden $1{,}6$ m för att få hela trädets höjd.',
                    text: '$$\\text{trädets höjd} = 10{,}9 + 1{,}6 \\approx 12{,}5 \\approx 13\\ \\text{m}$$',
                },
            ],
            svar: 'Ungefär $13$ m (mer exakt $\\approx 12{,}5$ m)',
            bedomning: [
                ['Bestämmer triangelns andra katet ($30 \\tan 20\\degree \\approx 10{,}9$ m)', '+E'],
                ['Lösning med godtagbart svar (trädets höjd $\\approx 13$ m)', '+E'],
            ],
        },

        {
            nr: 18, del: 'D', poang: [2, 1, 0], omrade: 'Formler — insättning och ekvation',
            endastSvar: false,
            fraga: 'Afrikas högsta berg Kilimanjaro har en höjd på $5\\,892$ meter över havet. ' +
                'Johan vandrar mot toppen. När han kokar tevatten konstaterar han att vattnet kokar vid ' +
                '$85\\degree$C. Sambandet mellan koktemperatur och höjd över havet kan beskrivas med formeln\n\n' +
                '$$t = 100 - \\dfrac{h}{300}$$\n\n' +
                'där $t$ är vattnets koktemperatur i grader Celsius och $h$ är höjden över havet i meter.\n\n' +
                '**a)** Vid vilken temperatur kokar vatten på Kilimanjaros topp? *Endast svar krävs.*\n\n' +
                '**b)** På vilken höjd över havet befinner sig Johan när han kokar sitt tevatten?',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Sätt in toppens höjd i formeln',
                    varfor: 'På toppen är höjden $h = 5\\,892$ m. Sätt in det i formeln och räkna ut ' +
                        'koktemperaturen $t$ (digitala verktyg är tillåtna).',
                    text: '$$t = 100 - \\dfrac{5\\,892}{300} = 100 - 19{,}64 \\approx 80{,}4\\degree\\text{C}$$',
                    delsvar: { del: 'a', text: 'Ungefär $80{,}4\\degree$C (ca $80\\degree$C)' },
                },
                {
                    del: 'b', rubrik: 'Sätt in koktemperaturen och lös ut höjden',
                    varfor: 'Nu är det i stället temperaturen som är känd ($t = 85$) och höjden $h$ som söks. ' +
                        'Sätt in $85$ och lös ekvationen för $h$.',
                    text: '$$85 = 100 - \\dfrac{h}{300}$$\n\nSubtrahera $100$ från båda leden:\n\n' +
                        '$$-15 = -\\dfrac{h}{300}$$',
                },
                {
                    del: 'b', rubrik: 'Räkna ut h',
                    text: 'Multiplicera båda leden med $-300$:\n\n$$h = 15 \\cdot 300 = 4\\,500\\ \\text{m}$$\n\n' +
                        '**Kontroll:** $100 - \\frac{4500}{300} = 100 - 15 = 85$ ✓',
                    delsvar: { del: 'b', text: 'Johan befinner sig på $4\\,500$ m över havet' },
                },
            ],
            svar: '**a)** $\\approx 80{,}4\\degree$C **b)** $4\\,500$ m',
            bedomning: [
                ['a) Godtagbart svar: $80{,}4\\degree$C eller $80\\degree$C', '+E'],
                ['b) Påbörjad lösning, t.ex. löser ut $h$ eller ersätter $t$ med $85$ i formeln', '+E'],
                ['b) Lösning med korrekt svar: $4\\,500$ m', '+C'],
            ],
        },

        {
            nr: 19, del: 'D', poang: [2, 3, 0], omrade: 'Diagram och procent',
            endastSvar: false,
            fraga: 'Diagrammet visar antal elever i gymnasieskolan åren 1996–2015 (blå linje) och en ' +
                'prognos för åren 2016–2024 (röd linje).\n\n' +
                '**a)** Vilket år, enligt prognosen, förväntas antalet elever bli lika stort som år 2013? ' +
                '*Endast svar krävs.*\n\n' +
                '**b)** Hur stor var den procentuella ökningen av antalet elever från år 2003 till år 2007?\n\n' +
                '**c)** Antag att antalet elever fortsätter att öka på samma sätt som prognosen från ' +
                'år 2019 till år 2023. När skulle då antalet elever bli $400\\,000$?',
            figur: 'u19',
            steg: [
                {
                    del: 'a', rubrik: 'Läs av elevantalet år 2013',
                    varfor: 'Vi behöver först veta hur många elever det var $2013$, för att sedan hitta ' +
                        'vilket senare år prognosen (röda linjen) når samma nivå.',
                    text: 'År $2013$ ligger kurvan på ungefär $325\\,000$ elever. ' +
                        'Dra en vågrät linje vid $325\\,000$ och se var den röda prognoslinjen skär den — ' +
                        'det sker någon gång kring åren $2019$–$2022$.',
                    figur: 'u19-los-a',
                    delsvar: { del: 'a', text: 'Något år i intervallet $2019$–$2022$' },
                },
                {
                    del: 'b', rubrik: 'Läs av elevantalet 2003 och 2007',
                    varfor: 'Procentuell ökning jämför förändringen med *utgångsvärdet*. Vi läser därför ' +
                        'av båda årens elevantal ur diagrammet.',
                    text: 'År $2003$: ungefär $320\\,000$ elever. År $2007$: ungefär $380\\,000$ elever.',
                    figur: 'u19-los-b',
                },
                {
                    del: 'b', rubrik: 'Beräkna den procentuella ökningen',
                    varfor: 'Procentuell ökning = ökningen delad med startvärdet. Startvärdet är ' +
                        'elevantalet $2003$ (det vi jämför med).',
                    text: '$$\\dfrac{380\\,000 - 320\\,000}{320\\,000} = \\dfrac{60\\,000}{320\\,000} \\approx ' +
                        '0{,}19 = 19\\ \\%$$\n\n(Ett svar i intervallet $15$–$20\\ \\%$ godtas, eftersom ' +
                        'avläsningen är ungefärlig.)',
                    delsvar: { del: 'b', text: 'Ungefär $15$–$20\\ \\%$ (ca $19\\ \\%$)' },
                },
                {
                    del: 'c', rubrik: 'Bestäm ökningstakten i prognosen 2019–2023',
                    varfor: 'Vi ska anta att elevantalet fortsätter öka *lika snabbt* som prognosen ' +
                        'gör mellan $2019$ och $2023$. Läs av dessa två år och räkna ut ökningen per år.',
                    text: 'År $2019$: ungefär $325\\,000$. År $2023$: ungefär $365\\,000$. ' +
                        'Ökning på $4$ år: $40\\,000$ elever, alltså\n\n' +
                        '$$\\dfrac{40\\,000}{4} = 10\\,000 \\text{ elever per år}$$',
                },
                {
                    del: 'c', rubrik: 'Räkna fram året då antalet når 400 000',
                    varfor: 'Från $2023$ ($365\\,000$ elever) fortsätter vi öka med $10\\,000$ elever ' +
                        'per år tills vi når $400\\,000$. Räkna ut hur många år det tar.',
                    text: 'Som saknas: $400\\,000 - 365\\,000 = 35\\,000$ elever. Med $10\\,000$ per år:\n\n' +
                        '$$\\dfrac{35\\,000}{10\\,000} = 3{,}5 \\text{ år efter } 2023$$\n\n' +
                        'Alltså under åren $2027$–$2030$ (avläsningarna är ungefärliga).',
                    delsvar: { del: 'c', text: 'Något år i intervallet $2027$–$2030$' },
                },
            ],
            svar: '**a)** $2019$–$2022$ **b)** ca $15$–$20\\ \\%$ **c)** $2027$–$2030$',
            bedomning: [
                ['a) Godtagbart svar i intervallet $2019$–$2022$', '+E'],
                ['b) Tecknar en relevant kvot', '+E'],
                ['b) Lösning med godtagbart svar ($15$–$20\\ \\%$)', '+C'],
                ['c) Påbörjad lösning, t.ex. beräknar elevökning per år eller per 4 år', '+C'],
                ['c) Lösning med godtagbart svar ($2027$–$2030$)', '+C'],
            ],
        },

        {
            nr: 20, del: 'D', poang: [2, 2, 1], omrade: 'Linjära modeller',
            endastSvar: false,
            fraga: 'Albin ska lägga nytt golv i sin lägenhet och väljer mellan två olika golv.\n\n' +
                'Golv A: $345$ kr/m². Golv B: $395$ kr/m².\n\n' +
                'För golv B finns nu ett erbjudande med $4\\,000$ kr rabatt på det totala priset om man ' +
                'köper $50$ m² eller mer.\n\n' +
                '**a)** Hur mycket kostar golv A respektive golv B om Albin köper $20$ m²?\n\n' +
                '**b)** Ange en formel för hur mycket golv A kostar beroende på hur många kvadratmeter golv man köper.\n\n' +
                '**c)** För vilken golvyta kommer golven att kosta lika mycket?',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Räkna ut priset för 20 m²',
                    varfor: 'Priset är pris per kvadratmeter gånger antal kvadratmeter. Rabatten på golv B ' +
                        'gäller bara från $50$ m², så vid $20$ m² är det fullpris för båda.',
                    text: 'Golv A: $345 \\cdot 20 = 6\\,900$ kr.\n\nGolv B: $395 \\cdot 20 = 7\\,900$ kr ' +
                        '(ingen rabatt, eftersom $20 < 50$ m²).',
                    delsvar: { del: 'a', text: 'Golv A: $6\\,900$ kr. Golv B: $7\\,900$ kr.' },
                },
                {
                    del: 'b', rubrik: 'Skriv priset för golv A som en formel',
                    varfor: 'Kostnaden växer med $345$ kr för varje extra kvadratmeter — ett linjärt ' +
                        'samband utan fast avgift. Inför en variabel $x$ för antalet kvadratmeter.',
                    text: 'Låt $x$ vara antalet kvadratmeter och $K$ kostnaden i kronor:\n\n$$K = 345x$$',
                    delsvar: { del: 'b', text: '$K = 345x$, där $K$ är kostnaden i kronor och $x$ antalet m²' },
                },
                {
                    del: 'c', rubrik: 'Teckna kostnaden för båda golven för stora ytor',
                    varfor: 'Frågan gäller när golven kostar *lika mycket*. Det blir intressant först vid ' +
                        'stora ytor, där golv B får sin rabatt — annars är A alltid billigare. Anta därför ' +
                        '$x \\geq 50$ m² så att rabatten $4\\,000$ kr gäller.',
                    text: 'Golv A: $345x$. Golv B med rabatt: $395x - 4\\,000$.',
                },
                {
                    del: 'c', rubrik: 'Sätt kostnaderna lika och lös ut ytan',
                    text: '$$345x = 395x - 4\\,000$$\n\nSamla $x$-termerna:\n\n' +
                        '$$4\\,000 = 50x \\quad \\Longrightarrow \\quad x = 80\\ \\text{m}^2$$\n\n' +
                        '$80 \\geq 50$, så rabatten gäller verkligen — svaret är giltigt.\n\n' +
                        '**Kontroll:** A: $345 \\cdot 80 = 27\\,600$ kr. B: $395 \\cdot 80 - 4\\,000 = 27\\,600$ kr ✓',
                    delsvar: { del: 'c', text: 'Vid $80$ m² kostar golven lika mycket' },
                },
            ],
            svar: '**a)** Golv A $6\\,900$ kr, golv B $7\\,900$ kr **b)** $K = 345x$ **c)** $80$ m²',
            bedomning: [
                ['a) Beräkning med korrekt svar ($6\\,900$ kr och $7\\,900$ kr)', '+E'],
                ['b) Godtagbart uttryck, t.ex. $345x$', '+E'],
                ['b) Godtagbar algebraisk formel med definierade variabler', '+C'],
                ['c) Prövning med korrekt svar eller påbörjad effektiv lösningsmetod', '+C'],
                ['c) Effektiv lösningsmetod med korrekt svar: $80$ m²', '+A'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [0, 2, 0], omrade: 'Bevis och resonemang',
            endastSvar: false,
            fraga: 'Erik, Carina och Sara har fått i uppgift att bevisa yttervinkelsatsen $c = a + b$ ' +
                '(se figuren). Vilken eller vilka av elevlösningarna är bevis och vilken eller vilka är ' +
                'det inte? Motivera.\n\n' +
                '**Carina:** gör en tabell med flera exempel på vinkelvärden ($a$, $b$, $x$, $c$, $a+b$) ' +
                'och konstaterar att $c$ alltid blir lika stor som $a + b$.\n\n' +
                '**Erik:** väljer $a = 30\\degree$ och $b = 60\\degree$, får $x = 180\\degree - 90\\degree = 90\\degree$ ' +
                'och alltså $c = 90\\degree$, och ser att $a + b = c$.\n\n' +
                '**Sara:** skriver att vinkelsumman ger $a + b + x = 180\\degree$ och att rak vinkel ger ' +
                '$x + c = 180\\degree$, sätter uttrycken lika och drar slutsatsen $a + b = c$.',
            figur: 'u21',
            steg: [
                {
                    rubrik: 'Vad krävs för att något ska vara ett bevis?',
                    varfor: 'Ett matematiskt bevis måste visa att påståendet gäller i *alla* fall — inte ' +
                        'bara i några utvalda exempel. Det är den avgörande skillnaden mellan att pröva ' +
                        'och att bevisa.',
                    text: 'Ett bevis ska gälla för en *godtycklig* triangel, alltså för alla möjliga ' +
                        'värden på vinklarna $a$ och $b$ — inte bara för enskilda talexempel.',
                },
                {
                    rubrik: 'Granska Carinas och Eriks lösningar',
                    varfor: 'Både Carina och Erik räknar på *bestämda* vinkelvärden. Att likheten stämmer ' +
                        'i några fall visar inte att den alltid stämmer.',
                    text: '**Carina** provar flera exempel i en tabell. Hur många exempel man än testar bevisar ' +
                        'det inte att satsen gäller för alla trianglar — det är en prövning, inte ett bevis.\n\n' +
                        '**Erik** räknar på ett enda fall ($a = 30\\degree$, $b = 60\\degree$). Ett exempel ' +
                        'bevisar ingenting allmänt. Det är alltså inte heller ett bevis.',
                },
                {
                    rubrik: 'Granska Saras lösning',
                    varfor: 'Sara räknar aldrig med några siffror — hon arbetar med bokstäverna $a$, $b$, ' +
                        '$x$ och $c$ hela vägen. Då gäller slutsatsen för *vilka* vinklar som helst.',
                    text: 'Sara använder två allmänt giltiga samband:\n\n' +
                        '$$a + b + x = 180\\degree \\quad (\\text{vinkelsumman i triangeln})$$\n' +
                        '$$x + c = 180\\degree \\quad (\\text{rak vinkel längs baslinjen})$$\n\n' +
                        'Båda högerleden är $180\\degree$, så vänsterleden är lika:\n\n' +
                        '$$a + b + x = x + c \\quad \\Longrightarrow \\quad a + b = c$$\n\n' +
                        'Detta gäller för alla trianglar — **Saras lösning är ett bevis**.',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    text: 'Endast **Sara** har bevisat yttervinkelsatsen, eftersom hon visar att den gäller ' +
                        'för alla trianglar. **Carina** och **Erik** har bara kontrollerat enskilda fall — ' +
                        'deras lösningar är inte bevis.',
                },
            ],
            svar: 'Endast Saras lösning är ett bevis — hon visar att $a + b = c$ gäller för alla trianglar. ' +
                'Carina (tabell med exempel) och Erik (ett talexempel) har bara prövat enskilda fall och ' +
                'har därför inte bevisat satsen.',
            bedomning: [
                ['Motiverar varför Sara bevisar satsen eller varför en av de andra inte gör det', '+C'],
                ['Motiverar både varför Sara bevisar satsen och varför Carina och Erik inte gör det', '+C'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [1, 1, 1], omrade: 'Procent — jämförelse',
            endastSvar: false,
            fraga: 'Oskar vinner $x$ kr i en tävling. Ahmed vinner $40\\ \\%$ mer än Oskar. ' +
                'Stina vinner $20\\ \\%$ mindre än Oskar. Hur många procent större är Ahmeds vinst ' +
                'jämfört med Stinas?',
            figur: null,
            steg: [
                {
                    rubrik: 'Uttryck Ahmeds och Stinas vinster med Oskars',
                    varfor: 'Alla jämförs med Oskar, så det är smart att uttrycka allt med Oskars vinst $x$. ' +
                        '"$40\\ \\%$ mer" ger förändringsfaktorn $1{,}4$, och "$20\\ \\%$ mindre" ger $0{,}8$.',
                    text: '$$\\text{Ahmed} = 1{,}4x \\qquad \\text{Stina} = 0{,}8x$$',
                },
                {
                    rubrik: 'Jämför Ahmeds vinst med Stinas',
                    varfor: '"Hur många procent större är Ahmeds vinst jämfört med Stinas" betyder att vi ' +
                        'jämför med *Stinas* vinst. Bilda kvoten $\\dfrac{\\text{Ahmed}}{\\text{Stina}}$ — ' +
                        'då syns hur mycket större Ahmeds är. Notera att $x$ förkortas bort, så svaret ' +
                        'gäller oavsett hur mycket Oskar vann.',
                    text: '$$\\dfrac{\\text{Ahmed}}{\\text{Stina}} = \\dfrac{1{,}4x}{0{,}8x} = ' +
                        '\\dfrac{1{,}4}{0{,}8} = 1{,}75$$',
                },
                {
                    rubrik: 'Tolka förändringsfaktorn som procent',
                    text: 'Faktorn $1{,}75$ betyder att Ahmeds vinst är $175\\ \\%$ av Stinas, alltså\n\n' +
                        '$$1{,}75 - 1 = 0{,}75 = 75\\ \\%$$\n\nAhmeds vinst är $75\\ \\%$ större än Stinas.',
                },
            ],
            svar: '$75\\ \\%$ större',
            bedomning: [
                ['Påbörjad lösning, bestämmer en förändringsfaktor eller ansätter ett värde för Oskars ' +
                    'vinst och beräknar Ahmeds eller Stinas vinst', '+E'],
                ['Godtagbar lösning med korrekt svar', '+C'],
                ['och förhållandet visas generellt (t.ex. att $x$ förkortas bort)', '+A'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [1, 1, 1], omrade: 'Procent och procentenheter',
            endastSvar: false,
            fraga: 'I en opinionsundersökning fick Socialdemokraterna $33{,}4\\ \\%$ av rösterna. ' +
                'Detta motsvarade en ökning med $1{,}7$ procentenheter från förra undersökningen. ' +
                'Moderaterna ökade med $1{,}2$ procentenheter till $23{,}6\\ \\%$. ' +
                'Kalle påstår att ökningarna är lika stora. Hur kan Kalle ha resonerat?',
            figur: null,
            steg: [
                {
                    rubrik: 'Skilj på procentenheter och procent',
                    varfor: 'De två ökningarna ($1{,}7$ och $1{,}2$ procentenheter) är olika stora räknat ' +
                        'i procentenheter. Men Kalle måste ha jämfört den *procentuella* ökningen — hur ' +
                        'många procent partiets stöd växte, jämfört med dess tidigare nivå. Det är två ' +
                        'olika sätt att mäta förändring.',
                    text: 'Först behöver vi de tidigare nivåerna. Socialdemokraterna: $33{,}4 - 1{,}7 = 31{,}7\\ \\%$. ' +
                        'Moderaterna: $23{,}6 - 1{,}2 = 22{,}4\\ \\%$.',
                },
                {
                    rubrik: 'Beräkna den procentuella ökningen för varje parti',
                    varfor: 'Procentuell ökning = ökningen i procentenheter delad med den tidigare nivån. ' +
                        'Det visar hur stor ökningen är *i förhållande till* partiets eget storlek.',
                    text: 'Socialdemokraterna: $\\dfrac{1{,}7}{31{,}7} \\approx 0{,}054 = 5{,}4\\ \\%$.\n\n' +
                        'Moderaterna: $\\dfrac{1{,}2}{22{,}4} \\approx 0{,}054 = 5{,}4\\ \\%$.',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    text: 'Båda partierna ökade med ungefär $5\\ \\%$ av sitt tidigare stöd. ' +
                        'Kalle har alltså jämfört den procentuella ökningen (inte antalet procentenheter) — ' +
                        'och sett så är ökningarna lika stora, ca $5\\ \\%$ var.',
                },
            ],
            svar: 'Kalle jämförde den procentuella ökningen: båda partierna ökade med ungefär $5\\ \\%$ ' +
                'av sitt tidigare stöd ($\\frac{1{,}7}{31{,}7} \\approx \\frac{1{,}2}{22{,}4} \\approx 5{,}4\\ \\%$).',
            bedomning: [
                ['Beräknar procentandelen för något parti i förra opinionsmätningen', '+E'],
                ['Beräknar procentuell ökning för ett parti', '+C'],
                ['Lösning med godtagbart svar (båda ökar med ca $5\\ \\%$)', '+A'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [1, 1, 1], omrade: 'Formler och ekvationer',
            endastSvar: false,
            fraga: 'Musikklassen på en skola ska ha en konsert. Biljettpriset för en vuxen är $100$ kr och ' +
                'för barn $50$ kr. Eleverna ställer upp en formel för hur intäkten för biljettförsäljningen ' +
                '$I$ kr beror av antal sålda vuxenbiljetter $x$ st.\n\n' +
                '$$I = 100x + 50(650 - x)$$\n\n' +
                'Hur många barnbiljetter såldes till konserten om intäkten blev $52\\,500$ kr?',
            figur: null,
            steg: [
                {
                    rubrik: 'Sätt in intäkten i formeln',
                    varfor: 'Intäkten är känd ($52\\,500$ kr) och vi söker antalet biljetter. Sätt in ' +
                        '$I = 52\\,500$ i formeln så får vi en ekvation i $x$ (antal vuxenbiljetter).',
                    text: '$$52\\,500 = 100x + 50(650 - x)$$',
                },
                {
                    rubrik: 'Förenkla högerledet',
                    varfor: 'Multiplicera in $50$ i parentesen och dra ihop $x$-termerna, så blir ' +
                        'ekvationen enkel att lösa.',
                    text: '$$52\\,500 = 100x + 32\\,500 - 50x$$\n\n$$52\\,500 = 50x + 32\\,500$$',
                },
                {
                    rubrik: 'Lös ut antalet vuxenbiljetter',
                    text: 'Subtrahera $32\\,500$ och dela med $50$:\n\n' +
                        '$$50x = 20\\,000 \\quad \\Longrightarrow \\quad x = 400 \\text{ vuxenbiljetter}$$',
                },
                {
                    rubrik: 'Räkna ut antalet barnbiljetter',
                    varfor: 'Frågan gäller *barnbiljetter*. I formeln står $650 - x$ för antalet barnbiljetter ' +
                        '(totalt $650$ biljetter minus vuxenbiljetterna).',
                    text: '$$\\text{barnbiljetter} = 650 - 400 = 250 \\text{ st}$$',
                },
            ],
            svar: '$250$ barnbiljetter',
            bedomning: [
                ['Påbörjad lösning, ersätter $I$ med $52\\,500$ eller förenklar formeln', '+E'],
                ['Korrekt löst ekvation, $x = 400$', '+C'],
                ['Lösning med korrekt svar: $250$ barnbiljetter', '+A'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 2, 2], omrade: 'Geometri — area och bevis',
            endastSvar: false,
            fraga: 'Figuren visar en cirkel och en rätvinklig triangel. Cirkelns radie är lika lång som ' +
                'triangelns höjd. Om cirkeln skulle rulla ett varv så skulle sträckan motsvara triangelns bas. ' +
                'Pythagoras påstod att cirkelns area och triangelns area alltid är lika stora. ' +
                'Undersök om hans påstående stämmer.',
            figur: 'u25',
            steg: [
                {
                    rubrik: 'Uttryck triangelns höjd och bas med cirkelns radie',
                    varfor: 'Allt ska uttryckas med cirkelns radie $r$, så att vi kan jämföra areorna. ' +
                        'Två samband är givna: höjden är lika med radien, och basen är lika med sträckan ' +
                        'cirkeln rullar på ett varv — det vill säga cirkelns omkrets.',
                    text: '$$\\text{höjden} = r \\qquad \\text{basen} = \\text{cirkelns omkrets} = 2\\pi r$$',
                    figur: 'u25-los',
                },
                {
                    rubrik: 'Beräkna triangelns area',
                    varfor: 'Triangelns area är basen gånger höjden delat med två. Sätt in uttrycken i $r$.',
                    text: '$$A_{\\text{triangel}} = \\dfrac{\\text{bas} \\cdot \\text{höjd}}{2} = ' +
                        '\\dfrac{2\\pi r \\cdot r}{2} = \\pi r^2$$',
                },
                {
                    rubrik: 'Jämför med cirkelns area',
                    varfor: 'Cirkelns area ges av formeln $\\pi r^2$. Nu kan vi jämföra de två areorna direkt.',
                    text: '$$A_{\\text{cirkel}} = \\pi r^2 \\qquad A_{\\text{triangel}} = \\pi r^2$$\n\n' +
                        'Areorna är lika — och eftersom vi bara använde $r$ (aldrig något specifikt talvärde) ' +
                        'gäller det för **alla** storlekar. Pythagoras påstående stämmer alltid.',
                },
            ],
            svar: 'Ja, påståendet stämmer alltid: både cirkelns och triangelns area är $\\pi r^2$, ' +
                'eftersom triangelns bas är cirkelns omkrets $2\\pi r$ och höjden är $r$, så ' +
                '$A_{\\text{triangel}} = \\frac{2\\pi r \\cdot r}{2} = \\pi r^2 = A_{\\text{cirkel}}$.',
            bedomning: [
                ['Påbörjad lösning som bygger på att triangelns bas är lika lång som cirkelns omkrets', '+C'],
                ['Visar att areorna är lika för något fall eller påbörjar ett generellt bevis', '+C'],
                ['Visar att areorna alltid är lika', '+A'],
                ['där redovisningen är lätt att följa och har ett godtagbart matematiskt språk', '+A'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 3, 2], omrade: 'Geometrisk talföljd',
            endastSvar: false,
            fraga: 'Bilden visar en skiss av en skulptur. De horisontella pinnarnas längd minskar med ' +
                '$20\\ \\%$ för varje steg och avståndet mellan pinnarna är $25$ cm. Den första pinnen ' +
                'är $2{,}0$ meter lång.\n\n' +
                '**a)** Hur lång är den 6:e pinnen?\n\n' +
                '**b)** Undersök hur hög skulpturen blir om den sista pinnen inte får vara kortare än $15$ cm.',
            figur: 'u26',
            steg: [
                {
                    del: 'a', rubrik: 'Bestäm förändringsfaktorn',
                    varfor: 'Varje pinne är $20\\ \\%$ kortare än den föregående. "$20\\ \\%$ kortare" ' +
                        'betyder att $80\\ \\%$ återstår, alltså förändringsfaktorn $0{,}8$. Längderna ' +
                        'bildar då en geometrisk talföljd.',
                    text: 'Pinne $1$ är $2{,}0$ m. Varje ny pinne fås genom multiplikation med $0{,}8$:\n\n' +
                        '$$\\text{pinne } n = 2{,}0 \\cdot 0{,}8^{\\,n-1}$$',
                },
                {
                    del: 'a', rubrik: 'Beräkna den 6:e pinnen',
                    varfor: 'Från pinne $1$ till pinne $6$ är det fem steg, så vi multiplicerar med $0{,}8$ ' +
                        'fem gånger (exponenten $n - 1 = 5$).',
                    text: '$$\\text{pinne } 6 = 2{,}0 \\cdot 0{,}8^{\\,5} = 2{,}0 \\cdot 0{,}328 \\approx ' +
                        '0{,}655\\ \\text{m} = 65{,}5\\ \\text{cm}$$',
                    delsvar: { del: 'a', text: 'Den 6:e pinnen är ungefär $65{,}5$ cm (ca $66$ cm)' },
                },
                {
                    del: 'b', rubrik: 'Hitta hur många pinnar som ryms',
                    varfor: 'Skulpturen får byggas så länge pinnarna är minst $15$ cm $= 0{,}15$ m. ' +
                        'Vi söker det största pinnnumret $n$ där längden fortfarande är $\\geq 0{,}15$ m. ' +
                        'Pröva oss uppåt (digitala verktyg tillåtna).',
                    text: 'Testa: pinne $12 = 2{,}0 \\cdot 0{,}8^{\\,11} \\approx 0{,}172$ m $= 17{,}2$ cm ' +
                        '($\\geq 15$ ✓). Pinne $13 = 2{,}0 \\cdot 0{,}8^{\\,12} \\approx 0{,}137$ m $= 13{,}7$ cm ' +
                        '($< 15$ ✗).\n\nAlltså ryms $12$ pinnar.',
                },
                {
                    del: 'b', rubrik: 'Räkna ut skulpturens höjd',
                    varfor: 'Höjden bestäms av avstånden *mellan* pinnarna. Med $12$ pinnar finns det $11$ ' +
                        'mellanrum, vart och ett $25$ cm.',
                    text: '$$\\text{höjd} = 11 \\cdot 25\\ \\text{cm} = 275\\ \\text{cm} = 2{,}75\\ \\text{m} ' +
                        '\\approx 2{,}8\\ \\text{m}$$',
                    delsvar: { del: 'b', text: 'Skulpturen blir $275$ cm $= 2{,}75$ m hög (ca $2{,}8$ m)' },
                },
            ],
            svar: '**a)** ca $65{,}5$ cm **b)** $275$ cm $= 2{,}75$ m (med $12$ pinnar och $11$ mellanrum)',
            bedomning: [
                ['a) Använder upprepad procentuell förändring', '+C'],
                ['a) Lösning med godtagbart svar ($65{,}5$–$66$ cm)', '+C'],
                ['b) Påbörjad lösning, t.ex. ställer upp en ekvation/olikhet eller påbörjar prövning', '+C'],
                ['b) Lösning som visar att höjden ska beräknas på 11 eller 12 avstånd mellan pinnarna', '+A'],
                ['b) Lösning med godtagbart svar utifrån 11 avstånd mellan pinnarna ($2{,}75$ m)', '+A'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 3, 2], omrade: 'Exponentiell förändring',
            endastSvar: false,
            fraga: 'Befolkningen i en stadsdel ökar. Tiden det tar för befolkningen att fördubblas beror på ' +
                'den genomsnittliga procentuella ökningen per år. En tumregel säger att fördubblingstiden är ' +
                'lika med $70$ dividerat med den procentuella ökningen per år skriven i procentform.\n\n' +
                '**a)** Skriv tumregeln som en formel som beskriver hur fördubblingstiden $T$ år beror på ' +
                '$p$, som är den procentuella ökningen per år skriven i procentform.\n\n' +
                '**b)** Använd tumregeln för att beräkna vilken procentuell ökning per år som krävs för att ' +
                'befolkningen ska fördubblas på $14$ år.\n\n' +
                '**c)** Använd en annan metod än tumregeln och bestäm ett mer noggrant värde för den ' +
                'procentuella ökningen per år som krävs för att befolkningen ska fördubblas på $14$ år. ' +
                'Svara med två decimaler.',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Översätt tumregeln till en formel',
                    varfor: 'Tumregeln i ord är "fördubblingstiden är $70$ delat med den procentuella ' +
                        'ökningen". Skriv om det rakt av med symbolerna $T$ (år) och $p$ (procenttalet).',
                    text: '$$T = \\dfrac{70}{p}$$',
                    delsvar: { del: 'a', text: '$T = \\dfrac{70}{p}$' },
                },
                {
                    del: 'b', rubrik: 'Sätt in fördubblingstiden 14 år',
                    varfor: 'Nu är fördubblingstiden känd ($T = 14$) och vi söker procenttalet $p$. ' +
                        'Sätt in $14$ i tumregeln och lös ut $p$.',
                    text: '$$14 = \\dfrac{70}{p} \\quad \\Longrightarrow \\quad p = \\dfrac{70}{14} = 5$$\n\n' +
                        'Det krävs alltså en ökning på ungefär $5\\ \\%$ per år.',
                    delsvar: { del: 'b', text: 'Ungefär $5\\ \\%$ per år' },
                },
                {
                    del: 'c', rubrik: 'Ställ upp den exakta fördubblingsekvationen',
                    varfor: 'Tumregeln är en approximation. Exakt fördubbling betyder att befolkningen ' +
                        'multipliceras med $2$ efter $14$ år. Med förändringsfaktorn $a$ per år blir det ' +
                        '$a$ upphöjt till $14$ som ska bli $2$.',
                    text: '$$a^{14} = 2$$',
                },
                {
                    del: 'c', rubrik: 'Lös ut den årliga förändringsfaktorn',
                    varfor: 'För att få ut $a$ drar vi $14$:e roten ur båda leden, det vill säga upphöjer ' +
                        'till $\\frac{1}{14}$ (digitala verktyg tillåtna).',
                    text: '$$a = 2^{1/14} \\approx 1{,}0508$$',
                },
                {
                    del: 'c', rubrik: 'Tolka som procentuell ökning',
                    text: 'Förändringsfaktorn $1{,}0508$ betyder en ökning med\n\n' +
                        '$$1{,}0508 - 1 = 0{,}0508 = 5{,}08\\ \\%$$\n\n' +
                        'per år. Det mer noggranna värdet är alltså $5{,}08\\ \\%$ (tumregeln gav $5\\ \\%$).',
                    delsvar: { del: 'c', text: '$5{,}08\\ \\%$ per år' },
                },
            ],
            svar: '**a)** $T = \\dfrac{70}{p}$ **b)** $5\\ \\%$ per år **c)** $5{,}08\\ \\%$ per år',
            bedomning: [
                ['a) Korrekt svar: $T = \\dfrac{70}{p}$', '+C'],
                ['b) Ersätter $T$ med $14$', '+C'],
                ['b) Lösning med korrekt svar: $5\\ \\%$', '+C'],
                ['c) Tecknar en godtagbar ekvation ($a^{14} = 2$)', '+A'],
                ['c) Lösning med korrekt svar: $5{,}08\\ \\%$', '+A'],
            ],
        },
    ],
};
