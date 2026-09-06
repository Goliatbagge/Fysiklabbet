// Fysiklabbet — Nationellt prov Matematik 2c, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Kursen Matematik 2c motsvarar dagens "Matematik nivå 2c" (och delas till
// stora delar med nivå 2b). Källa: Skolverket/Umeå universitet — provet är
// frisläppt och återanvänds inte. Svar och poängkrav följer provets
// bedömningsanvisningar; lösningsmetoderna är de som ingår i kursens
// genomgångar.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma2c-vt2022'] = {
    id: 'ma2c-vt2022',
    kurs: 'Matematik nivå 2c',
    termin: 'VT 2022',
    namn: 'Nationellt prov Ma 2c, våren 2022',
    kort: 'NP Ma 2c VT 2022',
    intro: 'Det här är det riktiga nationella provet i Matematik 2c från våren 2022. ' +
        'Provet är frisläppt och återanvänds inte. Välj en uppgift, lös den själv, och ' +
        'klicka sedan fram lösningen ett steg i taget. Varje steg förklarar både vad som ' +
        'görs och varför, figurerna byggs upp i takt med lösningen och varje uppgift kan ' +
        'också följas som en pennlösning.',
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
            beskrivning: 'Uppgift 1–8. Endast svar krävs.',
        },
        C: {
            tid: '120 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal. Inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 9–15. Fullständiga lösningar krävs.',
        },
        D: {
            tid: '120 minuter',
            hjalpmedel: 'Digitala verktyg, formelblad och linjal',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Uppgift 16–28. Fullständiga lösningar krävs.',
        },
    },
    uppgifter: [

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [2, 0, 0], omrade: 'Algebra: kvadrerings- och konjugatregeln',
            genomgangar: ['ma2c-2.1'],
            endastSvar: true,
            fraga: 'Förenkla uttrycken så långt som möjligt.<br>' +
                '**a)**&nbsp;$(x + 5)^2 - 10x$&emsp;&emsp;**b)**&nbsp;$(x + 3)(x - 3) + 9$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Utveckla kvadraten med första kvadreringsregeln',
                    varfor: 'Regeln $(a + b)^2 = a^2 + 2ab + b^2$ gäller alltid. Här är $a = x$ och ' +
                        '$b = 5$, så den dubbla produkten blir $2 \\cdot x \\cdot 5 = 10x$.',
                    text: '$$(x + 5)^2 - 10x = x^2 + 10x + 25 - 10x$$',
                },
                {
                    del: 'a',
                    rubrik: 'Förenkla',
                    varfor: 'Termerna $10x$ och $-10x$ tar ut varandra. Kvar blir bara kvadrattermen ' +
                        'och konstanten.',
                    text: '$$x^2 + 10x + 25 - 10x = x^2 + 25$$',
                    delsvar: { del: 'a', text: '$x^2 + 25$' },
                },
                {
                    del: 'b',
                    rubrik: 'Använd konjugatregeln',
                    varfor: 'Produkten av $(a + b)$ och $(a - b)$ är alltid $a^2 - b^2$. Här är ' +
                        '$a = x$ och $b = 3$, så $b^2 = 9$.',
                    text: '$$(x + 3)(x - 3) + 9 = x^2 - 9 + 9$$',
                },
                {
                    del: 'b',
                    rubrik: 'Förenkla',
                    varfor: 'Niorna tar ut varandra och bara $x^2$ blir kvar.',
                    text: '$$x^2 - 9 + 9 = x^2$$',
                    delsvar: { del: 'b', text: '$x^2$' },
                },
            ],
            svar: '**a)** $x^2 + 25$&emsp;&emsp;**b)** $x^2$',
            bedomning: [
                ['a) Korrekt svar ($x^2 + 25$)', '+E'],
                ['b) Korrekt svar ($x^2$)', '+E'],
            ],
        },

        {
            nr: 2, del: 'B', poang: [2, 0, 0], omrade: 'Andragradsfunktioner: graf och symmetrilinje',
            genomgangar: ['ma2c-3.1', 'ma2c-3.2'],
            endastSvar: true,
            fraga: 'Grafen till andragradsfunktionen $f$, där $y = f(x)$, går genom punkterna ' +
                '$D(-1,\\ 0)$, $E(0,\\ 2)$ och $F(4,\\ 0)$.\n\n' +
                '**a)** Funktionen $f$ kan skrivas på formen $f(x) = ax^2 + bx + c$. ' +
                'Bestäm konstanten $c$.\n\n' +
                '**b)** Grafen till funktionen $f$ har en maximipunkt. ' +
                'Bestäm $x$-koordinaten för maximipunkten.',
            figur: 'u2',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av var grafen skär y-axeln',
                    varfor: 'Konstanten $c$ är funktionsvärdet när $x = 0$, eftersom både $ax^2$ och ' +
                        '$bx$ blir noll där: $f(0) = c$. Grafen skär alltså $y$-axeln i höjden $c$.',
                    text: 'Punkten $E(0,\\ 2)$ ligger på $y$-axeln, så\n\n' +
                        '$$f(0) = 2 \\quad \\Longrightarrow \\quad c = 2$$',
                    delsvar: { del: 'a', text: '$c = 2$' },
                },
                {
                    del: 'b',
                    rubrik: 'Hitta nollställena',
                    varfor: 'Punkterna $D$ och $F$ ligger på $x$-axeln, så där är $f(x) = 0$. ' +
                        'Nollställena är $x = -1$ och $x = 4$.',
                    text: '$$x_1 = -1 \\qquad x_2 = 4$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lägg symmetrilinjen mitt emellan nollställena',
                    varfor: 'En parabel är symmetrisk kring en lodrät linje genom sin vertex, och ' +
                        'nollställena ligger lika långt från den linjen. Maximipunkten ligger på ' +
                        'symmetrilinjen, så dess $x$-koordinat är medelvärdet av nollställena.',
                    text: '$$x = \\dfrac{-1 + 4}{2} = \\dfrac{3}{2} = 1{,}5$$',
                    figur: 'u2-s1',
                    delsvar: { del: 'b', text: '$x = 1{,}5$' },
                },
            ],
            svar: '**a)** $c = 2$&emsp;&emsp;**b)** $x = 1{,}5$',
            bedomning: [
                ['a) Korrekt svar ($2$)', '+E'],
                ['b) Korrekt svar ($1{,}5$)', '+E'],
            ],
        },

        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Implikation och ekvivalens',
            genomgangar: ['ma2c-4.3'],
            endastSvar: true,
            fraga: 'Nedan anges två påståenden om Lena.\n\n' +
                '$$\\text{Lena bor i Europa.} \\qquad \\boxed{\\phantom{\\Longleftrightarrow}} \\qquad ' +
                '\\text{Lena bor i Sverige.}$$\n\n' +
                'Vilken symbol ska stå i rutan mellan de två påståendena för att argumentationen ' +
                'ska vara korrekt? Välj mellan $\\Leftrightarrow$, $\\Rightarrow$ och $\\Leftarrow$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Pröva pilen åt höger',
                    varfor: 'Pilen $\\Rightarrow$ betyder "om det vänstra gäller, så gäller det högra". ' +
                        'Pröva: om Lena bor i Europa, måste hon då bo i Sverige? Nej, hon kan lika ' +
                        'gärna bo i Norge eller Italien. Pilen åt höger stämmer alltså inte.',
                    text: '$$\\text{Lena bor i Europa} \\ \\not\\Rightarrow\\ \\text{Lena bor i Sverige}$$',
                },
                {
                    rubrik: 'Pröva pilen åt vänster',
                    varfor: 'Pilen $\\Leftarrow$ läses "det vänstra följer av det högra". Om Lena bor ' +
                        'i Sverige, bor hon då i Europa? Ja, alltid, eftersom Sverige ligger i ' +
                        'Europa. Den pilen stämmer.',
                    text: '$$\\text{Lena bor i Europa} \\ \\Leftarrow\\ \\text{Lena bor i Sverige}$$',
                },
                {
                    rubrik: 'Uteslut ekvivalensen',
                    varfor: 'Ekvivalens $\\Leftrightarrow$ kräver att pilen gäller åt båda hållen. ' +
                        'Eftersom pilen åt höger inte stämmer är påståendena inte ekvivalenta. ' +
                        'Rätt symbol är $\\Leftarrow$.',
                    text: 'Svaret är $\\Leftarrow$: att Lena bor i Sverige medför att hon bor i Europa, ' +
                        'men inte tvärtom.',
                },
            ],
            svar: '$\\Leftarrow$',
            bedomning: [['Korrekt svar ($\\Leftarrow$)', '+E']],
        },

        {
            nr: 4, del: 'B', poang: [1, 1, 0], omrade: 'Normalfördelning: medelvärde och standardavvikelse',
            genomgangar: ['ma2c-6.5', 'ma2c-6.4'],
            endastSvar: true,
            fraga: '**a)** Figuren visar en kurva som representerar en normalfördelning. ' +
                'Vilket medelvärde har normalfördelningen?\n\n' +
                '**b)** Figuren visar fem kurvor A–E som representerar normalfördelningar. ' +
                'Vilken av kurvorna A–E representerar den normalfördelning som har den minsta ' +
                'standardavvikelsen?',
            figur: 'u4',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av var kurvan har sin topp',
                    varfor: 'En normalfördelningskurva är symmetrisk kring medelvärdet, och toppen ' +
                        'ligger precis där. Medelvärdet är alltså $x$-värdet under den högsta punkten.',
                    text: 'Toppen ligger rakt ovanför $9$ på axeln, så medelvärdet är $9$.',
                    figur: 'u4-s1',
                    delsvar: { del: 'a', text: 'Medelvärdet är $9$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Jämför kurvornas bredd',
                    varfor: 'Standardavvikelsen är ett spridningsmått: den säger hur mycket värdena ' +
                        'sprider sig kring medelvärdet. En liten standardavvikelse ger en smal och ' +
                        'hög kurva, en stor standardavvikelse en bred och låg. Höjden hänger ihop ' +
                        'med bredden eftersom arean under varje kurva är lika stor.',
                    text: 'Kurva D är den smalaste och högsta. Den har alltså den minsta ' +
                        'standardavvikelsen. Kurva B är motsatsen: bredast och lägst, störst spridning.',
                    figur: 'u4-s2',
                    delsvar: { del: 'b', text: 'Kurva D.' },
                },
            ],
            svar: '**a)** $9$&emsp;&emsp;**b)** Kurva D',
            bedomning: [
                ['a) Korrekt svar utifrån godtagbar avläsning ($9$)', '+E'],
                ['b) Korrekt svar (D)', '+C'],
            ],
        },

        {
            nr: 5, del: 'B', poang: [1, 1, 0], omrade: 'Koordinatgeometri: avstånd och mittpunkt',
            genomgangar: ['ma2c-4.6'],
            endastSvar: true,
            fraga: '**a)** I ett koordinatsystem finns punkten $Q(1,\\ 0)$. Ge ett exempel på ' +
                'koordinaterna för punkten $P$ om avståndet mellan $P$ och $Q$ är $5$ längdenheter.\n\n' +
                '**b)** Mitt emellan punkterna $A\\!\\left(\\dfrac{1}{2},\\ \\dfrac{1}{4}\\right)$ och $B$ i ' +
                'ett koordinatsystem ligger punkten $M\\!\\left(1,\\ \\dfrac{3}{4}\\right)$. ' +
                'Bestäm koordinaterna för punkten $B$.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Gå 5 steg åt något håll från Q',
                    varfor: 'Enklast är att gå rakt längs $x$-axeln: då ändras bara $x$-koordinaten ' +
                        'och avståndet blir precis antalet steg. Från $x = 1$ fem steg åt höger ' +
                        'ger $x = 6$.',
                    text: '$$P(6,\\ 0) \\qquad \\text{ty} \\qquad d = \\sqrt{(6 - 1)^2 + (0 - 0)^2} = \\sqrt{25} = 5$$',
                },
                {
                    del: 'a',
                    rubrik: 'Kontrollera med avståndsformeln, och se att fler svar finns',
                    varfor: 'Alla punkter på avståndet $5$ från $Q$ ligger på en cirkel med radien $5$. ' +
                        'Avståndsformeln $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ visar att till ' +
                        'exempel $(4,\\ 4)$ också duger, eftersom $3^2 + 4^2 = 25$.',
                    text: '$$d = \\sqrt{(4 - 1)^2 + (4 - 0)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$\n\n' +
                        'Andra exempel: $(-4,\\ 0)$, $(1,\\ 5)$ och $(-2,\\ 4)$.',
                    delsvar: { del: 'a', text: 'Till exempel $P(6,\\ 0)$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Ställ upp mittpunktsformeln för x-koordinaten',
                    varfor: 'Mittpunktens $x$-koordinat är medelvärdet av ändpunkternas ' +
                        '$x$-koordinater: $x_M = \\dfrac{x_A + x_B}{2}$. Vi känner $x_M = 1$ och ' +
                        '$x_A = \\dfrac{1}{2}$, så ekvationen kan lösas för $x_B$.',
                    text: '$$\\dfrac{\\frac{1}{2} + x_B}{2} = 1 \\quad \\Longleftrightarrow \\quad ' +
                        '\\dfrac{1}{2} + x_B = 2 \\quad \\Longleftrightarrow \\quad x_B = \\dfrac{3}{2}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Gör likadant för y-koordinaten',
                    varfor: 'Samma formel i $y$-led: $y_M = \\dfrac{y_A + y_B}{2}$ med $y_M = \\dfrac{3}{4}$ ' +
                        'och $y_A = \\dfrac{1}{4}$.',
                    text: '$$\\dfrac{\\frac{1}{4} + y_B}{2} = \\dfrac{3}{4} \\quad \\Longleftrightarrow \\quad ' +
                        '\\dfrac{1}{4} + y_B = \\dfrac{3}{2} \\quad \\Longleftrightarrow \\quad ' +
                        'y_B = \\dfrac{6}{4} - \\dfrac{1}{4} = \\dfrac{5}{4}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Kontrollera',
                    varfor: 'Ett snabbt sätt att se att det stämmer: från $A$ till $M$ är steget ' +
                        '$\\dfrac{1}{2}$ i $x$-led och $\\dfrac{1}{2}$ i $y$-led. Samma steg en gång till ' +
                        'ger $B$.',
                    text: '$$B\\!\\left(1 + \\dfrac{1}{2},\\ \\dfrac{3}{4} + \\dfrac{1}{2}\\right) = ' +
                        'B\\!\\left(\\dfrac{3}{2},\\ \\dfrac{5}{4}\\right)$$',
                    delsvar: { del: 'b', text: '$B\\!\\left(\\dfrac{3}{2},\\ \\dfrac{5}{4}\\right)$' },
                },
            ],
            svar: '**a)** Till exempel $P(6,\\ 0)$&emsp;&emsp;**b)** $B\\!\\left(\\dfrac{3}{2},\\ \\dfrac{5}{4}\\right)$',
            bedomning: [
                ['a) Korrekt svar (till exempel $(6,\\ 0)$)', '+E'],
                ['b) Korrekt svar $\\left(\\dfrac{3}{2},\\ \\dfrac{5}{4}\\right)$. Även decimalform eller oförkortat bråk ges poäng', '+C'],
            ],
        },

        {
            nr: 6, del: 'B', poang: [1, 3, 1], omrade: 'Ekvationer: exponential-, rot- och andragradsekvationer',
            genomgangar: ['ma2c-5.3', 'ma2c-5.4', 'ma2c-2.8'],
            endastSvar: true,
            fraga: 'Lös ekvationerna och svara exakt på enklaste form.<br>' +
                '**a)**&nbsp;$5^x = 7$<br>' +
                '**b)**&nbsp;$3 - \\sqrt{\\sqrt{2x - 5}} = 0$<br>' +
                '**c)**&nbsp;$\\lg 200 - \\lg 2 + 98 = 10^x$<br>' +
                '**d)**&nbsp;$(3x - 4)(4 - 3x) = -9x^2$<br>' +
                '**e)**&nbsp;$(5987 - x)^2 - 2(5987 - x) = 0$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Logaritmera båda led',
                    varfor: 'Det obekanta står i exponenten. Tiologaritmen plockar ned exponenten ' +
                        'som en faktor: $\\lg 5^x = x \\cdot \\lg 5$.',
                    text: '$$5^x = 7 \\quad \\Longleftrightarrow \\quad x \\cdot \\lg 5 = \\lg 7$$',
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
                    rubrik: 'Isolera roten',
                    varfor: 'Flytta talet $3$ till högerledet så att den yttre roten står ensam. ' +
                        'Först då kan den tas bort genom kvadrering.',
                    text: '$$3 - \\sqrt{\\sqrt{2x - 5}} = 0 \\quad \\Longleftrightarrow \\quad ' +
                        '\\sqrt{\\sqrt{2x - 5}} = 3$$',
                },
                {
                    del: 'b',
                    rubrik: 'Kvadrera båda led, två gånger',
                    varfor: 'Att kvadrera tar bort en rot i taget: $\\left(\\sqrt{\\square}\\right)^2 = \\square$. ' +
                        'Det finns två rötter, så vi kvadrerar två gånger. Högerledet blir ' +
                        '$3^2 = 9$ och sedan $9^2 = 81$.',
                    text: '$$\\sqrt{2x - 5} = 9 \\quad \\Longrightarrow \\quad 2x - 5 = 81$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös ut x och pröva',
                    varfor: 'Kvadrering kan ge falska rötter, så en rotekvation ska alltid prövas i ' +
                        'ursprungsekvationen: $2 \\cdot 43 - 5 = 81$, $\\sqrt{81} = 9$ och $\\sqrt{9} = 3$, ' +
                        'precis vad som krävdes.',
                    text: '$$2x = 86 \\quad \\Longleftrightarrow \\quad x = 43$$',
                    delsvar: { del: 'b', text: '$x = 43$' },
                },
                {
                    del: 'c',
                    rubrik: 'Skriv ihop logaritmerna med logaritmlagen för division',
                    varfor: 'Lagen $\\lg a - \\lg b = \\lg \\dfrac{a}{b}$ gör två logaritmer till en, ' +
                        'och $\\dfrac{200}{2} = 100$ är en tiopotens som logaritmen kan räknas ut ' +
                        'exakt för: $\\lg 100 = 2$ eftersom $10^2 = 100$.',
                    text: '$$\\lg 200 - \\lg 2 = \\lg \\dfrac{200}{2} = \\lg 100 = 2$$',
                },
                {
                    del: 'c',
                    rubrik: 'Lös potensekvationen',
                    varfor: 'Vänsterledet blir $2 + 98 = 100$, och $100 = 10^2$. Två potenser med samma ' +
                        'bas är lika precis när exponenterna är lika.',
                    text: '$$100 = 10^x \\quad \\Longleftrightarrow \\quad 10^2 = 10^x \\quad ' +
                        '\\Longleftrightarrow \\quad x = 2$$',
                    delsvar: { del: 'c', text: '$x = 2$' },
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
            svar: '**a)** $x = \\dfrac{\\lg 7}{\\lg 5}$&emsp;&emsp;**b)** $x = 43$&emsp;&emsp;**c)** $x = 2$&emsp;&emsp;' +
                '**d)** $x = \\dfrac{2}{3}$&emsp;&emsp;**e)** $x_1 = 5987$ och $x_2 = 5985$',
            bedomning: [
                ['a) Korrekt svar $\\left(x = \\dfrac{\\lg 7}{\\lg 5}\\right)$', '+E'],
                ['b) Korrekt svar ($x = 43$)', '+C'],
                ['c) Korrekt svar ($x = 2$)', '+C'],
                ['d) Korrekt svar $\\left(x = \\dfrac{2}{3}\\right)$', '+C'],
                ['e) Korrekt svar ($x_1 = 5987$ och $x_2 = 5985$)', '+A'],
            ],
        },

        {
            nr: 7, del: 'B', poang: [0, 1, 0], omrade: 'Andragradsfunktioner: modellering',
            genomgangar: ['ma2c-3.3'],
            endastSvar: true,
            fraga: 'Bosse ska bygga en rektangulär hage av $120$ meter staket till sina två hästar. ' +
                'Längden av hagens ena sida betecknas med $x$. Se figur.\n\n' +
                'Teckna hagens area $A$ som en funktion av $x$.',
            figur: 'u7',
            steg: [
                {
                    rubrik: 'Uttryck den andra sidan i x',
                    varfor: 'Staketet går runt hela hagen, så omkretsen är $120$ m. En rektangel ' +
                        'har två sidor av längden $x$ och två av den andra längden, kalla den $y$. ' +
                        'Då kan $y$ lösas ut ur omkretsen.',
                    text: '$$2x + 2y = 120 \\quad \\Longleftrightarrow \\quad y = 60 - x$$',
                    figur: 'u7-s1',
                },
                {
                    rubrik: 'Teckna arean',
                    varfor: 'Rektangelns area är basen gånger höjden. Med båda sidorna uttryckta i ' +
                        '$x$ blir arean en andragradsfunktion av $x$.',
                    text: '$$A(x) = x(60 - x) = 60x - x^2$$',
                },
                {
                    rubrik: 'Rimlighetskontroll',
                    varfor: 'Om $x = 30$ blir hagen en kvadrat med sidan $30$ m: $A(30) = 30 \\cdot 30 = 900$. ' +
                        'Funktionen ger $60 \\cdot 30 - 30^2 = 1800 - 900 = 900$. Stämmer.',
                    text: 'Funktionen gäller för $0 < x < 60$, eftersom båda sidorna måste vara positiva.',
                },
            ],
            svar: '$A(x) = x(60 - x) = 60x - x^2$',
            bedomning: [['Korrekt svar $\\left(A = x \\cdot \\dfrac{120 - 2x}{2}\\right)$', '+C']],
        },

        {
            nr: 8, del: 'B', poang: [0, 1, 1], omrade: 'Andragradsfunktioner: symmetrilinje och parabel',
            genomgangar: ['ma2c-3.1'],
            endastSvar: true,
            fraga: 'Det finns många andragradsfunktioner som har en graf med symmetrilinjen $x = 3$.\n\n' +
                '**a)** Ge exempel på en sådan funktion.\n\n' +
                'En parabel har samma form som grafen till en andragradsfunktion. Det finns ' +
                'parabler där $x = f(y)$, det vill säga att parabeln ges av en andragradsfunktion ' +
                '$f$ som är en funktion av $y$ i stället för av $x$.\n\n' +
                '**b)** Ge exempel på en ekvation till en parabel med symmetrilinjen $y = 0$.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Lägg vertex på symmetrilinjen',
                    varfor: 'Symmetrilinjen går alltid genom parabelns vertex. Enklaste sättet att ' +
                        'få symmetrilinjen $x = 3$ är att flytta grundparabeln $y = x^2$ tre steg ' +
                        'åt höger, så att vertex hamnar i $(3,\\ 0)$.',
                    text: '$$y = (x - 3)^2 = x^2 - 6x + 9$$',
                },
                {
                    del: 'a',
                    rubrik: 'Kontrollera med symmetrilinjens formel',
                    varfor: 'För $y = ax^2 + bx + c$ ligger symmetrilinjen i $x = -\\dfrac{b}{2a}$. ' +
                        'Med $a = 1$ och $b = -6$ blir det $x = \\dfrac{6}{2} = 3$. Varje funktion ' +
                        'med $-\\dfrac{b}{2a} = 3$ duger, till exempel $y = (x - 2)(x - 4)$ vars ' +
                        'nollställen $2$ och $4$ ligger symmetriskt kring $3$.',
                    text: '$$x = -\\dfrac{b}{2a} = -\\dfrac{-6}{2 \\cdot 1} = 3$$',
                    delsvar: { del: 'a', text: 'Till exempel $y = (x - 3)^2$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Byt roll på x och y',
                    varfor: 'En parabel av typen $x = f(y)$ öppnar sig åt sidan i stället för uppåt ' +
                        'eller nedåt, och dess symmetrilinje är vågrät. Grundparabeln $y = x^2$ har ' +
                        'symmetrilinjen $x = 0$. Byter vi plats på $x$ och $y$ speglas allt: ' +
                        'symmetrilinjen blir $y = 0$.',
                    text: '$$x = y^2$$\n\nParabeln går genom $(0,\\ 0)$, $(1,\\ 1)$, $(1,\\ -1)$, $(4,\\ 2)$ ' +
                        'och $(4,\\ -2)$: varje punkt har en spegelbild i $x$-axeln, så $y = 0$ är ' +
                        'symmetrilinje.',
                    delsvar: { del: 'b', text: 'Till exempel $x = y^2$.' },
                },
            ],
            svar: '**a)** Till exempel $y = (x - 3)^2$&emsp;&emsp;**b)** Till exempel $x = y^2$',
            bedomning: [
                ['a) Korrekt svar (till exempel $y = (x - 2)(x - 4)$). Svar som uppfyller $-\\dfrac{b}{2a} = 3$ är korrekta', '+C'],
                ['b) Korrekt svar (till exempel $x = y^2$). Även svar på formen $f(y) = y^2$ ges poäng', '+A'],
            ],
        },

        // ================= DELPROV C =================
        {
            nr: 9, del: 'C', poang: [2, 0, 0], omrade: 'Andragradsekvationer: pq-formeln',
            genomgangar: ['ma2c-2.4'],
            fraga: 'Lös andragradsekvationen $x^2 + 8x + 12 = 0$ med algebraisk metod.',
            figur: null,
            steg: [
                {
                    rubrik: 'Identifiera p och q',
                    varfor: 'Ekvationen står redan på formen $x^2 + px + q = 0$ med koefficienten ' +
                        '$1$ framför $x^2$, så *pq*-formeln kan användas direkt: $p = 8$ och $q = 12$.',
                    text: '$$x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$$',
                },
                {
                    rubrik: 'Sätt in i pq-formeln',
                    varfor: 'Halva $p$ är $4$, och under rottecknet står $4^2 - 12 = 16 - 12 = 4$. ' +
                        'Det är positivt, så ekvationen har två reella lösningar.',
                    text: '$$x = -\\dfrac{8}{2} \\pm \\sqrt{\\left(\\dfrac{8}{2}\\right)^2 - 12} = ' +
                        '-4 \\pm \\sqrt{16 - 12} = -4 \\pm \\sqrt{4} = -4 \\pm 2$$',
                },
                {
                    rubrik: 'Skriv ut de två lösningarna och kontrollera',
                    varfor: 'Plustecknet ger den ena roten och minustecknet den andra. Kontroll: ' +
                        '$(-2)^2 + 8 \\cdot (-2) + 12 = 4 - 16 + 12 = 0$ och ' +
                        '$(-6)^2 + 8 \\cdot (-6) + 12 = 36 - 48 + 12 = 0$.',
                    text: '$$x_1 = -4 + 2 = -2 \\qquad\\qquad x_2 = -4 - 2 = -6$$',
                },
            ],
            svar: '$x_1 = -2$ och $x_2 = -6$',
            bedomning: [
                ['Godtagbar ansats, sätter in värden korrekt i formeln för lösning av andragradsekvationer eller motsvarande för kvadratkomplettering', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($x_1 = -2$ och $x_2 = -6$)', '+E'],
            ],
        },

        {
            nr: 10, del: 'C', poang: [2, 0, 0], omrade: 'Linjära ekvationssystem: resonemang',
            genomgangar: ['ma2c-1.2', 'ma2c-1.1'],
            fraga: 'Emma och Sanna har fått i uppgift att lösa ekvationssystemet\n\n' +
                '$$\\begin{cases} x - y = 3{,}5 \\\\ 2x + y = 5{,}5 \\end{cases}$$\n\n' +
                '**a)** Det finns flera sätt att lösa ett ekvationssystem. Emma börjar med att ' +
                'lösa ut $y$ ur båda ekvationerna och får:\n\n' +
                '$$\\begin{cases} y = x + 3{,}5 \\\\ y = -2x + 5{,}5 \\end{cases}$$\n\n' +
                'Har Emma löst ut $y$ på ett korrekt sätt ur de båda ekvationerna? Motivera ditt svar.\n\n' +
                '**b)** Sanna påstår att $\\begin{cases} x = 5 \\\\ y = 1{,}5 \\end{cases}$ är en lösning ' +
                'till ekvationssystemet. Har Sanna rätt? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Lös själv ut y ur den första ekvationen',
                    varfor: 'I $x - y = 3{,}5$ står $y$ med minustecken. Addera $y$ till båda led ' +
                        'och subtrahera sedan $3{,}5$, så kommer $y$ ensamt på ena sidan.',
                    text: '$$x - y = 3{,}5 \\quad \\Longleftrightarrow \\quad x = 3{,}5 + y \\quad ' +
                        '\\Longleftrightarrow \\quad y = x - 3{,}5$$',
                },
                {
                    del: 'a',
                    rubrik: 'Jämför med Emmas rader',
                    varfor: 'Emma fick $y = x + 3{,}5$, men rätt är $y = x - 3{,}5$: hon har fått fel ' +
                        'tecken på $3{,}5$. Den andra ekvationen är däremot rätt löst: ' +
                        '$2x + y = 5{,}5$ ger $y = 5{,}5 - 2x = -2x + 5{,}5$.',
                    text: 'Nej, Emma har gjort fel i den första ekvationen. Det ska stå $y = x - 3{,}5$. ' +
                        'Den andra raden, $y = -2x + 5{,}5$, är korrekt.',
                    delsvar: { del: 'a', text: 'Nej. Ur den första ekvationen följer $y = x - 3{,}5$, inte $y = x + 3{,}5$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Sätt in värdena i den första ekvationen',
                    varfor: 'En lösning till ett ekvationssystem måste uppfylla båda ekvationerna ' +
                        'samtidigt. Vi prövar därför $x = 5$ och $y = 1{,}5$ i var och en.',
                    text: '$$x - y = 5 - 1{,}5 = 3{,}5 \\qquad \\text{stämmer}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Sätt in värdena i den andra ekvationen',
                    varfor: 'Det räcker inte att den ena ekvationen stämmer. I den andra blir ' +
                        'vänsterledet $11{,}5$, inte $5{,}5$. Därför är talparet ingen lösning.',
                    text: '$$2x + y = 2 \\cdot 5 + 1{,}5 = 11{,}5 \\neq 5{,}5 \\qquad \\text{stämmer inte}$$\n\n' +
                        'Sanna har fel. (Den riktiga lösningen är $x = 3$ och $y = -0{,}5$, som uppfyller ' +
                        'båda ekvationerna.)',
                    delsvar: { del: 'b', text: 'Nej. Talparet uppfyller den första ekvationen men inte den andra, eftersom $2 \\cdot 5 + 1{,}5 = 11{,}5 \\neq 5{,}5$.' },
                },
            ],
            svar: '**a)** Nej. Ur $x - y = 3{,}5$ följer $y = x - 3{,}5$, inte $y = x + 3{,}5$.&emsp;&emsp;' +
                '**b)** Nej. $2 \\cdot 5 + 1{,}5 = 11{,}5 \\neq 5{,}5$, så talparet uppfyller inte den andra ekvationen.',
            bedomning: [
                ['a) Godtagbart resonemang som inkluderar slutsatsen att Emma har gjort fel (till exempel "Nej, det borde stå $-3{,}5$ i den första ekvationen.")', '+E'],
                ['b) Godtagbart resonemang som visar att $x = 5$, $y = 1{,}5$ inte är en lösning och som inkluderar slutsatsen att Sanna har fel', '+E'],
            ],
        },

        {
            nr: 11, del: 'C', poang: [0, 2, 0], omrade: 'Geometri: bisektriser och vinkelsumma',
            genomgangar: ['ma2c-4.2', 'ma2c-4.1'],
            fraga: 'I triangeln $ABC$ dras en bisektris från $A$ och en bisektris från $B$ så att ' +
                'bisektriserna skär varandra i $D$. Bisektriserna bildar en vinkel som är ' +
                '$125\\degree$. Se figur.\n\n' +
                'Bestäm vinkeln $v$.',
            figur: 'u11',
            steg: [
                {
                    rubrik: 'Inför beteckningar för de halva vinklarna',
                    varfor: 'En bisektris delar en vinkel mitt itu. Kalla halva vinkeln vid $A$ för ' +
                        '$\\alpha$ och halva vinkeln vid $B$ för $\\beta$. Då är hela vinkeln vid $A$ ' +
                        'lika med $2\\alpha$ och hela vinkeln vid $B$ lika med $2\\beta$.',
                    text: '$$\\angle DAB = \\alpha,\\quad \\angle CAB = 2\\alpha \\qquad\\qquad ' +
                        '\\angle DBA = \\beta,\\quad \\angle CBA = 2\\beta$$',
                    figur: 'u11-s1',
                },
                {
                    rubrik: 'Använd vinkelsumman i den lilla triangeln ABD',
                    varfor: 'I triangeln $ABD$ är vinkeln vid $D$ känd, $125\\degree$, och de andra två ' +
                        'är $\\alpha$ och $\\beta$. Vinkelsumman i en triangel är $180\\degree$, så ' +
                        'summan $\\alpha + \\beta$ kan bestämmas utan att vi vet dem var för sig.',
                    text: '$$\\alpha + \\beta + 125\\degree = 180\\degree \\quad \\Longleftrightarrow \\quad ' +
                        '\\alpha + \\beta = 55\\degree$$',
                    figur: 'u11-s2',
                },
                {
                    rubrik: 'Använd vinkelsumman i den stora triangeln ABC',
                    varfor: 'I triangeln $ABC$ är vinklarna $2\\alpha$, $2\\beta$ och $v$. Summan ' +
                        '$2\\alpha + 2\\beta = 2(\\alpha + \\beta)$ är dubbelt så stor som den vi just ' +
                        'räknade ut.',
                    text: '$$v + 2\\alpha + 2\\beta = 180\\degree \\quad \\Longleftrightarrow \\quad ' +
                        'v = 180\\degree - 2 \\cdot 55\\degree = 70\\degree$$',
                    figur: 'u11-s3',
                },
            ],
            svar: '$v = 70\\degree$',
            bedomning: [
                ['Godtagbar ansats, visar insikt i att vinklarna vid $A$ är lika stora och att vinklarna vid $B$ är lika stora samt att $\\angle DAB + \\angle ABD = 55\\degree$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($70\\degree$)', '+C'],
            ],
        },

        {
            nr: 12, del: 'C', poang: [0, 2, 0], omrade: 'Linjära ekvationssystem: algebraisk lösning',
            genomgangar: ['ma2c-1.2', 'ma2c-1.3'],
            fraga: 'Lös ekvationssystemet\n\n' +
                '$$\\begin{cases} 0{,}2x - 0{,}5y = 1{,}2 \\\\ x + y + 3{,}5 = 6 \\end{cases}$$\n\n' +
                'med algebraisk metod.',
            figur: null,
            steg: [
                {
                    rubrik: 'Städa upp ekvationerna',
                    varfor: 'Decimaler försvinner om den första ekvationen multipliceras med $10$ i ' +
                        'båda led. I den andra flyttas $3{,}5$ över, så att bara $x + y$ står kvar ' +
                        'i vänsterledet.',
                    text: '$$\\begin{cases} 2x - 5y = 12 \\\\ x + y = 2{,}5 \\end{cases}$$',
                },
                {
                    rubrik: 'Lös ut y ur den andra ekvationen',
                    varfor: 'Substitutionsmetoden: lös ut en variabel ur den ekvation där det är ' +
                        'enklast, och sätt in uttrycket i den andra. I $x + y = 2{,}5$ är $y$ ' +
                        'redan nästan ensamt.',
                    text: '$$y = 2{,}5 - x$$',
                },
                {
                    rubrik: 'Sätt in i den första ekvationen',
                    varfor: 'Nu innehåller ekvationen bara $x$. Multiplicera in $-5$ i parentesen ' +
                        'och samla $x$-termerna.',
                    text: '$$2x - 5(2{,}5 - x) = 12 \\quad \\Longleftrightarrow \\quad 2x - 12{,}5 + 5x = 12 \\quad ' +
                        '\\Longleftrightarrow \\quad 7x = 24{,}5$$',
                },
                {
                    rubrik: 'Bestäm x och sedan y',
                    varfor: 'Dividera med $7$ för att få $x$, och sätt sedan in $x$ i uttrycket för $y$.',
                    text: '$$x = \\dfrac{24{,}5}{7} = 3{,}5 \\qquad\\qquad y = 2{,}5 - 3{,}5 = -1$$',
                },
                {
                    rubrik: 'Kontrollera i båda ursprungsekvationerna',
                    varfor: 'En lösning till ett ekvationssystem måste stämma i båda ekvationerna. ' +
                        'Kontrollen fångar räknefel innan svaret skrivs.',
                    text: '$$0{,}2 \\cdot 3{,}5 - 0{,}5 \\cdot (-1) = 0{,}7 + 0{,}5 = 1{,}2 \\qquad \\checkmark$$\n\n' +
                        '$$3{,}5 + (-1) + 3{,}5 = 6 \\qquad \\checkmark$$',
                },
            ],
            svar: '$x = 3{,}5$ och $y = -1$',
            bedomning: [
                ['Godtagbar ansats, kommer fram till en korrekt ekvation i en variabel utifrån ekvationssystemet', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($x = 3{,}5$ och $y = -1$)', '+C'],
            ],
        },

        {
            nr: 13, del: 'C', poang: [0, 2, 0], omrade: 'Algebra: bevis med kvadreringsregeln',
            genomgangar: ['ma2c-2.1', 'ma2c-4.4'],
            fraga: 'Fiona undersöker två tal där differensen mellan talen är $1$. Hon påstår att ' +
                'differensen mellan kvadraten av det större talet och kvadraten av det mindre ' +
                'talet är lika stor som summan av talen.\n\n' +
                'Visa att Fionas påstående alltid stämmer för två tal där differensen mellan ' +
                'talen är $1$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Inför en variabel för talen',
                    varfor: 'Påståendet ska gälla för alla sådana talpar, så vi kan inte pröva med ' +
                        'exempel. Kalla det mindre talet $x$. Eftersom differensen är $1$ är det ' +
                        'större talet $x + 1$. Så täcks varje tänkbart par in.',
                    text: '$$\\text{mindre talet: } x \\qquad\\qquad \\text{större talet: } x + 1$$',
                },
                {
                    rubrik: 'Teckna differensen mellan kvadraterna',
                    varfor: 'Kvadraten på det större talet minus kvadraten på det mindre. Utveckla ' +
                        '$(x + 1)^2$ med första kvadreringsregeln.',
                    text: '$$(x + 1)^2 - x^2 = x^2 + 2x + 1 - x^2 = 2x + 1$$',
                },
                {
                    rubrik: 'Teckna summan av talen',
                    varfor: 'Summan av det mindre och det större talet.',
                    text: '$$x + (x + 1) = 2x + 1$$',
                },
                {
                    rubrik: 'Jämför och dra slutsatsen',
                    varfor: 'Båda uttrycken blev $2x + 1$, oavsett vilket värde $x$ har. Alltså är ' +
                        'differensen mellan kvadraterna alltid lika med summan av talen. ' +
                        '(Exempel: $6^2 - 5^2 = 11 = 6 + 5$.)',
                    text: '$$(x + 1)^2 - x^2 = 2x + 1 = x + (x + 1)$$\n\nFionas påstående stämmer för alla ' +
                        'tal $x$, det vill säga för alla par av tal med differensen $1$.',
                },
            ],
            svar: 'Med det mindre talet $x$ och det större $x + 1$ är $(x + 1)^2 - x^2 = 2x + 1 = x + (x + 1)$. ' +
                'Påståendet gäller alltså för alla sådana tal.',
            bedomning: [
                ['Godtagbar ansats, påbörjar ett resonemang där ena ledet av sambandet ställs upp uttryckt i en variabel och en förenkling påbörjas för att visa att VL = HL, eller där båda leden ställs upp uttryckta i en variabel, eller där hela sambandet ställs upp i två variabler och skrivs om korrekt med konjugatregeln', '+C'],
                ['med slutfört resonemang där det visas att Fionas påstående stämmer', '+C'],
            ],
        },

        {
            nr: 14, del: 'C', poang: [0, 0, 2], omrade: 'Exponentialfunktioner: bestäm funktionen ur två punkter',
            genomgangar: ['ma2c-5.1', 'ma2c-1.2'],
            fraga: 'Figuren visar grafen till en exponentialfunktion.\n\n' +
                'Bestäm $y$-koordinaten för grafens skärningspunkt med $y$-axeln. Förenkla svaret ' +
                'så långt som möjligt och svara exakt.',
            figur: 'u14',
            steg: [
                {
                    rubrik: 'Ställ upp funktionen och sätt in punkterna',
                    varfor: 'En exponentialfunktion har formen $y = C \\cdot a^x$, där $C$ är värdet ' +
                        'vid $x = 0$, alltså just skärningen med $y$-axeln. Punkterna $(2,\\ 2)$ och ' +
                        '$(5,\\ 54)$ ligger på grafen och ger två ekvationer för de två obekanta.',
                    text: '$$\\begin{cases} C \\cdot a^2 = 2 \\\\ C \\cdot a^5 = 54 \\end{cases}$$',
                },
                {
                    rubrik: 'Dividera ekvationerna för att få bort C',
                    varfor: 'Delar vi den andra ekvationen med den första försvinner $C$, och ' +
                        'potenserna förenklas med potensregeln $\\dfrac{a^5}{a^2} = a^{5-2} = a^3$.',
                    text: '$$\\dfrac{C \\cdot a^5}{C \\cdot a^2} = \\dfrac{54}{2} \\quad \\Longleftrightarrow \\quad a^3 = 27$$',
                },
                {
                    rubrik: 'Bestäm a',
                    varfor: 'Vilket tal upphöjt till $3$ blir $27$? Eftersom $3 \\cdot 3 \\cdot 3 = 27$ är ' +
                        '$a = 3$. Grafen växer alltså med faktorn $3$ för varje steg i $x$-led.',
                    text: '$$a = \\sqrt[3]{27} = 3$$',
                },
                {
                    rubrik: 'Bestäm C ur den första ekvationen',
                    varfor: 'Sätt in $a = 3$ i $C \\cdot a^2 = 2$. Talet $C$ är funktionsvärdet vid ' +
                        '$x = 0$, alltså det sökta.',
                    text: '$$C \\cdot 3^2 = 2 \\quad \\Longleftrightarrow \\quad 9C = 2 \\quad ' +
                        '\\Longleftrightarrow \\quad C = \\dfrac{2}{9}$$',
                    figur: 'u14-s1',
                },
                {
                    rubrik: 'Kontrollera med den andra punkten',
                    varfor: 'Funktionen $y = \\dfrac{2}{9} \\cdot 3^x$ ska ge $54$ när $x = 5$: ' +
                        '$\\dfrac{2}{9} \\cdot 243 = \\dfrac{486}{9} = 54$. Stämmer.',
                    text: '$$y = \\dfrac{2}{9} \\cdot 3^x \\qquad\\qquad y(0) = \\dfrac{2}{9}$$',
                },
            ],
            svar: 'Grafen skär $y$-axeln i $y = \\dfrac{2}{9}$.',
            bedomning: [
                ['Godtagbar ansats, ställer upp ett korrekt ekvationssystem, till exempel $C \\cdot a^2 = 2$ och $C \\cdot a^5 = 54$, och eliminerar en variabel på ett korrekt sätt i den fortsatta lösningen', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar som är förenklat $\\left(\\dfrac{2}{9}\\right)$', '+A'],
            ],
        },

        {
            nr: 15, del: 'C', poang: [0, 0, 3], omrade: 'Problemlösning med andragradsekvationer',
            genomgangar: ['ma2c-2.7', 'ma2c-2.4'],
            fraga: 'I en butik köper Armand ett rep för $60$ kr. En annan butik säljer samma typ av ' +
                'rep men där är repet $1$ kr dyrare per meter. Om Armand hade handlat i den andra ' +
                'butiken hade han fått ett $2$ meter kortare rep för $60$ kr.\n\n' +
                'Bestäm hur långt rep Armand köpte. Prövning godtas inte.',
            figur: null,
            steg: [
                {
                    rubrik: 'Inför en variabel och teckna priset per meter',
                    varfor: 'Det sökta är repets längd, så låt $x$ meter vara längden på repet Armand ' +
                        'köpte. Priset per meter är totalpriset delat med längden.',
                    text: '$$\\text{Första butiken: } x\\ \\text{m för } 60\\ \\text{kr, alltså } ' +
                        '\\dfrac{60}{x}\\ \\text{kr/m}$$',
                },
                {
                    rubrik: 'Teckna den andra butikens rep',
                    varfor: 'Där är metern $1$ kr dyrare och repet $2$ m kortare, men det kostar ' +
                        'fortfarande $60$ kr. Längd gånger meterpris ger totalpriset, och det ger ' +
                        'en ekvation i $x$.',
                    text: '$$\\text{Andra butiken: } (x - 2)\\ \\text{m för } \\left(\\dfrac{60}{x} + 1\\right)\\ \\text{kr/m}$$\n\n' +
                        '$$(x - 2)\\left(\\dfrac{60}{x} + 1\\right) = 60$$',
                },
                {
                    rubrik: 'Utveckla och förenkla',
                    varfor: 'Multiplicera in varje term. Termen $60$ finns i båda led och kan tas bort. ' +
                        'Kvar blir en ekvation med $x$ i nämnaren.',
                    text: '$$60 + x - \\dfrac{120}{x} - 2 = 60 \\quad \\Longleftrightarrow \\quad ' +
                        'x - 2 - \\dfrac{120}{x} = 0$$',
                },
                {
                    rubrik: 'Multiplicera med x och lös andragradsekvationen',
                    varfor: 'Att multiplicera båda led med $x$ tar bort nämnaren (tillåtet eftersom ' +
                        '$x \\neq 0$, en längd). Sedan används *pq*-formeln med $p = -2$ och ' +
                        '$q = -120$.',
                    text: '$$x^2 - 2x - 120 = 0 \\quad \\Longleftrightarrow \\quad ' +
                        'x = 1 \\pm \\sqrt{1 + 120} = 1 \\pm \\sqrt{121} = 1 \\pm 11$$\n\n' +
                        '$$x_1 = 12 \\qquad\\qquad x_2 = -10$$',
                },
                {
                    rubrik: 'Förkasta den negativa roten och kontrollera',
                    varfor: 'En längd kan inte vara negativ, så $x = -10$ förkastas. Kontroll: ' +
                        '$12$ m för $60$ kr är $5$ kr/m. Andra butiken: $6$ kr/m och $10$ m, ' +
                        'alltså $6 \\cdot 10 = 60$ kr. Stämmer.',
                    text: '$$x = 12$$',
                },
            ],
            svar: 'Armand köpte $12$ meter rep.',
            bedomning: [
                ['Godtagbar ansats, ställer upp en korrekt ekvation i en variabel, till exempel $\\left(\\dfrac{60}{x} + 1\\right)(x - 2) = 60$', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($12$ m)', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },

        // ================= DELPROV D =================
        {
            nr: 16, del: 'D', poang: [1, 0, 0], omrade: 'Randvinkelsatsen',
            genomgangar: ['ma2c-4.11'],
            endastSvar: true,
            fraga: 'Figuren visar en cirkel med medelpunkten $M$. Punkterna $A$, $B$ och $C$ ligger ' +
                'på cirkelns rand.\n\nBestäm vinkeln $v$.',
            figur: 'u16',
            steg: [
                {
                    rubrik: 'Känn igen en randvinkel och en medelpunktsvinkel på samma båge',
                    varfor: 'Vinkeln $52{,}3\\degree$ vid $C$ har sin spets på randen: en randvinkel. ' +
                        'Vinkeln $v$ vid $M$ har sin spets i medelpunkten: en medelpunktsvinkel. ' +
                        'Båda står på samma cirkelbåge, bågen $AB$ (den som inte innehåller $C$).',
                    text: '$$\\angle ACB = 52{,}3\\degree \\text{ (randvinkel)} \\qquad ' +
                        '\\angle AMB = v \\text{ (medelpunktsvinkel)}$$',
                    figur: 'u16-s1',
                },
                {
                    rubrik: 'Använd randvinkelsatsen',
                    varfor: 'Randvinkelsatsen: medelpunktsvinkeln är dubbelt så stor som en randvinkel ' +
                        'på samma båge.',
                    text: '$$v = 2 \\cdot 52{,}3\\degree = 104{,}6\\degree$$',
                },
            ],
            svar: '$v = 104{,}6\\degree$',
            bedomning: [['Korrekt svar ($104{,}6\\degree$)', '+E']],
        },

        {
            nr: 17, del: 'D', poang: [1, 0, 0], omrade: 'Rotekvationer',
            genomgangar: ['ma2c-2.8'],
            endastSvar: true,
            fraga: 'Lös ekvationen $\\sqrt{2{,}11x - 5} = 8{,}6$ och svara med minst en decimal.',
            figur: null,
            steg: [
                {
                    rubrik: 'Kvadrera båda led',
                    varfor: 'Roten står redan ensam i vänsterledet, så kvadrering tar bort den ' +
                        'direkt. Högerledet blir $8{,}6^2 = 73{,}96$.',
                    text: '$$2{,}11x - 5 = 8{,}6^2 = 73{,}96$$',
                },
                {
                    rubrik: 'Lös ut x',
                    varfor: 'Addera $5$ till båda led och dividera sedan med $2{,}11$.',
                    text: '$$2{,}11x = 78{,}96 \\quad \\Longleftrightarrow \\quad ' +
                        'x = \\dfrac{78{,}96}{2{,}11} = 37{,}421\\ldots \\approx 37{,}4$$',
                },
                {
                    rubrik: 'Pröva lösningen',
                    varfor: 'Kvadrering kan ge falska rötter, så en rotekvation prövas alltid. ' +
                        'Med det oavrundade värdet: $2{,}11 \\cdot 37{,}421\\ldots - 5 = 73{,}96$ och ' +
                        '$\\sqrt{73{,}96} = 8{,}6$. Stämmer.',
                    text: '$$x \\approx 37{,}4$$',
                },
            ],
            svar: '$x \\approx 37{,}4$',
            bedomning: [['Korrekt svar ($x = 37{,}4$)', '+E']],
        },

        {
            nr: 18, del: 'D', poang: [1, 0, 0], omrade: 'Andragradsfunktioner: punkt på grafen',
            genomgangar: ['ma2c-3.1'],
            endastSvar: true,
            fraga: 'En andragradsfunktion $f$ ges av $f(x) = 3x^2 + 5x + 7$.\n\n' +
                'Ge ett exempel på en punkt som ligger på grafen till $f$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Välj ett x-värde och räkna ut funktionsvärdet',
                    varfor: 'Varje punkt på grafen har formen $(x,\\ f(x))$. Välj ett enkelt $x$, ' +
                        'till exempel $x = 0$: då försvinner de två första termerna.',
                    text: '$$f(0) = 3 \\cdot 0^2 + 5 \\cdot 0 + 7 = 7$$',
                },
                {
                    rubrik: 'Skriv punkten',
                    varfor: 'Punkten är $(0,\\ 7)$, grafens skärning med $y$-axeln. Vilket $x$ som ' +
                        'helst duger: $x = 1$ ger $f(1) = 3 + 5 + 7 = 15$ och punkten $(1,\\ 15)$.',
                    text: '$$(0,\\ 7)$$',
                },
            ],
            svar: 'Till exempel $(0,\\ 7)$.',
            bedomning: [['Korrekt svar (till exempel $(0,\\ 7)$)', '+E']],
        },

        {
            nr: 19, del: 'D', poang: [1, 0, 0], omrade: 'Linjär regression',
            genomgangar: ['ma2c-6.6'],
            endastSvar: true,
            fraga: 'Värdetabellen visar ett antal värden på variablerna $x$ och $y$.\n\n' +
                '| $x$ | 22 | 23 | 24 | 25 | 26 | 27 | 28 |\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n' +
                '| $y$ | 4,2 | 5,6 | 4,9 | 3,6 | 3,1 | 1,9 | 2,5 |\n\n' +
                'Ur värdena kan ett anpassat samband på formen $y = ax + b$ bestämmas.\n\n' +
                'Bestäm $a$ och $b$ med hjälp av linjär regression. Svara med minst två decimaler.',
            figur: null,
            steg: [
                {
                    rubrik: 'Mata in värdena i det digitala verktyget',
                    varfor: 'Linjär regression betyder att verktyget hittar den räta linje som ' +
                        'passar punkterna bäst. Lägg $x$-värdena i en kolumn och $y$-värdena i ' +
                        'en annan (i GeoGebra: kalkylbladet eller kommandot ' +
                        '`RegressionLinjär`, på räknaren: statistikläget med LinReg).',
                    text: 'Sju punkter: $(22;\\ 4{,}2)$, $(23;\\ 5{,}6)$, $(24;\\ 4{,}9)$, $(25;\\ 3{,}6)$, ' +
                        '$(26;\\ 3{,}1)$, $(27;\\ 1{,}9)$ och $(28;\\ 2{,}5)$.',
                },
                {
                    rubrik: 'Läs av regressionslinjen',
                    varfor: 'Verktyget ger linjens ekvation. Riktningskoefficienten $a$ är ' +
                        'negativ, vilket stämmer med att $y$-värdena i stort sett minskar när $x$ ökar.',
                    text: '$$y = -0{,}51x + 16{,}45$$',
                },
                {
                    rubrik: 'Rimlighetskontroll',
                    varfor: 'Regressionslinjen går alltid genom punkten $(\\bar{x},\\ \\bar{y})$. ' +
                        'Här är $\\bar{x} = 25$ och $\\bar{y} = \\dfrac{25{,}8}{7} \\approx 3{,}69$. ' +
                        'Linjen ger $-0{,}51 \\cdot 25 + 16{,}45 = 3{,}70$. Stämmer.',
                    text: '$$a \\approx -0{,}51 \\qquad\\qquad b \\approx 16{,}45$$',
                },
            ],
            svar: '$a \\approx -0{,}51$ och $b \\approx 16{,}45$',
            bedomning: [['Korrekt svar ($a = -0{,}51$ och $b = 16{,}45$). Även svaret $y = -0{,}51x + 16{,}45$ ges poäng', '+E']],
        },

        {
            nr: 20, del: 'D', poang: [2, 0, 0], omrade: 'Likformighet: areaskala',
            genomgangar: ['ma2c-4.7', 'ma2c-4.8'],
            fraga: 'I en rätvinklig triangel $ABC$ är sidan $AB$ $5{,}6$ cm och sidan $BC$ $1{,}8$ cm. ' +
                'Triangeln $DEF$ är likformig med triangeln $ABC$. Sidan $EF$ är dubbelt så lång ' +
                'som sidan $BC$, se figur.\n\n' +
                'Hur många gånger större är arean av triangeln $DEF$ än arean av triangeln $ABC$?',
            figur: 'u20',
            steg: [
                {
                    rubrik: 'Beräkna arean av triangeln ABC',
                    varfor: 'Triangeln är rätvinklig vid $B$, så de två kateterna $AB$ och $BC$ är ' +
                        'bas och höjd. Arean är basen gånger höjden delat med två.',
                    text: '$$A_{ABC} = \\dfrac{5{,}6 \\cdot 1{,}8}{2} = 5{,}04\\ \\mathrm{cm^2}$$',
                },
                {
                    rubrik: 'Bestäm längdskalan mellan trianglarna',
                    varfor: 'Likformiga trianglar har samma form, så alla sidor i $DEF$ är lika ' +
                        'många gånger längre än motsvarande sidor i $ABC$. Eftersom $EF = 2 \\cdot BC$ ' +
                        'är längdskalan $2$: $EF = 3{,}6$ cm och $DE = 2 \\cdot 5{,}6 = 11{,}2$ cm.',
                    text: '$$\\text{längdskala} = \\dfrac{EF}{BC} = \\dfrac{3{,}6}{1{,}8} = 2$$',
                    figur: 'u20-s1',
                },
                {
                    rubrik: 'Beräkna arean av triangeln DEF',
                    varfor: 'Med båda kateterna dubblade blir arean $\\dfrac{11{,}2 \\cdot 3{,}6}{2}$. ' +
                        'Det är detsamma som $2 \\cdot 2 = 4$ gånger den lilla arean: areaskalan ' +
                        'är längdskalan i kvadrat.',
                    text: '$$A_{DEF} = \\dfrac{11{,}2 \\cdot 3{,}6}{2} = 20{,}16\\ \\mathrm{cm^2} = 4 \\cdot 5{,}04\\ \\mathrm{cm^2}$$',
                },
                {
                    rubrik: 'Svara på frågan',
                    varfor: 'Arean av $DEF$ är $4$ gånger så stor som arean av $ABC$. "Hur många ' +
                        'gånger större" blir då $3$ gånger större, eftersom $20{,}16 - 5{,}04 = 15{,}12 ' +
                        '= 3 \\cdot 5{,}04$. Bedömningsanvisningarna godtar båda formuleringarna.',
                    text: '$$\\dfrac{A_{DEF}}{A_{ABC}} = \\dfrac{20{,}16}{5{,}04} = 4$$',
                },
            ],
            svar: 'Arean av $DEF$ är $4$ gånger så stor som arean av $ABC$, det vill säga $3$ gånger större.',
            bedomning: [
                ['Godtagbar ansats, till exempel beräknar arean av triangeln $DEF$, $20{,}16\\ \\mathrm{cm^2}$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($3$ gånger större) eller ($4$ gånger så stor). Svaret "$4$ gånger större" godtas också, eftersom det handlar om en språklig och inte en matematisk missuppfattning', '+E'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [2, 0, 0], omrade: 'Andragradsfunktioner: nollställen och maximum',
            genomgangar: ['ma2c-3.3', 'ma2c-3.2'],
            endastSvar: true,
            fraga: 'Bilden visar byggnaden Municipal Asphalt Plant i New York. Ytterkanten på ' +
                'byggnadens framsida kan beskrivas med grafen till andragradsfunktionen $f$. ' +
                'Funktionen $f$ ges av $f(x) = -0{,}14x^2 + 3{,}92x$ där $x$ och $f(x)$ har enheten ' +
                'meter och där $x$-axeln är placerad på marknivå längs byggnadens framsida. ' +
                'Se figur.\n\n' +
                'Bestäm byggnadens bredd och höjd.',
            figur: 'u21',
            steg: [
                {
                    rubrik: 'Bestäm nollställena',
                    varfor: 'Bredden är avståndet mellan de två punkter där kurvan når marken, ' +
                        'alltså där $f(x) = 0$. Båda termerna innehåller $x$, så bryt ut $x$ och ' +
                        'använd nollproduktmetoden.',
                    text: '$$-0{,}14x^2 + 3{,}92x = 0 \\quad \\Longleftrightarrow \\quad x(-0{,}14x + 3{,}92) = 0$$\n\n' +
                        '$$x_1 = 0 \\qquad\\qquad -0{,}14x + 3{,}92 = 0 \\ \\Longleftrightarrow\\ x_2 = \\dfrac{3{,}92}{0{,}14} = 28$$',
                    figur: 'u21-s1',
                },
                {
                    rubrik: 'Läs av bredden',
                    varfor: 'Byggnaden står mellan $x = 0$ och $x = 28$.',
                    text: '$$\\text{bredd} = 28 - 0 = 28\\ \\mathrm{m}$$',
                },
                {
                    rubrik: 'Hitta symmetrilinjen och beräkna höjden',
                    varfor: 'Högsta punkten ligger på symmetrilinjen, mitt emellan nollställena: ' +
                        '$x = \\dfrac{0 + 28}{2} = 14$. Höjden är funktionsvärdet där. (Med digitalt ' +
                        'verktyg kan maximipunkten också läsas av direkt i grafen.)',
                    text: '$$f(14) = -0{,}14 \\cdot 14^2 + 3{,}92 \\cdot 14 = -27{,}44 + 54{,}88 = 27{,}44 \\approx 27\\ \\mathrm{m}$$',
                    figur: 'u21-s2',
                },
            ],
            svar: 'Bredden är $28$ m och höjden cirka $27$ m.',
            bedomning: [
                ['Godtagbar ansats, anger korrekt värde för antingen bredden eller höjden', '+E'],
                ['med godtagbart svar (bredd $28$ m, höjd $27$ m)', '+E'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [0, 3, 0], omrade: 'Exponentialekvationer: förändringsfaktor',
            genomgangar: ['ma2c-5.5', 'ma2c-5.3'],
            fraga: 'Tidningen Times of India släppte år $2018$ nyheten att antalet tigrar i Indien ' +
                'mer än fördubblats sedan år $2006$.\n\n' +
                'Tidningen uppgav att det fanns $1411$ tigrar i Indien år $2006$ och att det fanns ' +
                '$2967$ tigrar år $2018$. Anta att tigrarna räknades i början av år $2006$ och i ' +
                'början av år $2018$. Anta även att den årliga procentuella förändringen av antalet ' +
                'tigrar var lika stor under tidsperioden och att förändringen fortsätter i samma ' +
                'takt även efter år $2018$.\n\n' +
                'Bestäm vilket år som tigrarnas antal förväntas vara $5000$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp en ekvation för den årliga förändringsfaktorn',
                    varfor: 'Samma procentuella ökning varje år betyder att antalet multipliceras ' +
                        'med samma förändringsfaktor $a$ varje år. Från början av $2006$ till början ' +
                        'av $2018$ är det $12$ år, alltså $12$ multiplikationer med $a$.',
                    text: '$$1411 \\cdot a^{12} = 2967$$',
                },
                {
                    rubrik: 'Lös ut förändringsfaktorn',
                    varfor: 'Dividera med $1411$ och dra tolfte roten ur båda led, det vill säga ' +
                        'upphöj till $\\dfrac{1}{12}$. Behåll många decimaler: en avrundad faktor ' +
                        'ger fel år efter tjugo års räntesränta.',
                    text: '$$a^{12} = \\dfrac{2967}{1411} \\quad \\Longleftrightarrow \\quad ' +
                        'a = \\left(\\dfrac{2967}{1411}\\right)^{\\frac{1}{12}} = 1{,}06389\\ldots$$\n\n' +
                        'Antalet ökar alltså med cirka $6{,}4\\ \\%$ per år.',
                },
                {
                    rubrik: 'Ställ upp ekvationen för 5000 tigrar',
                    varfor: 'Låt $t$ vara antalet år efter början av $2006$. Antalet är då ' +
                        '$1411 \\cdot a^t$, och vi söker det $t$ som ger $5000$.',
                    text: '$$1411 \\cdot 1{,}06389\\ldots^{\\,t} = 5000 \\quad \\Longleftrightarrow \\quad ' +
                        '1{,}06389\\ldots^{\\,t} = \\dfrac{5000}{1411}$$',
                },
                {
                    rubrik: 'Logaritmera och lös ut t',
                    varfor: 'Det obekanta står i exponenten, så vi logaritmerar båda led. ' +
                        'Logaritmlagen $\\lg a^t = t \\cdot \\lg a$ plockar ned $t$.',
                    text: '$$t \\cdot \\lg 1{,}06389\\ldots = \\lg \\dfrac{5000}{1411} \\quad \\Longleftrightarrow \\quad ' +
                        't = \\dfrac{\\lg \\frac{5000}{1411}}{\\lg 1{,}06389\\ldots} = 20{,}4\\ldots$$',
                },
                {
                    rubrik: 'Tolka tiden som ett årtal',
                    varfor: 'Drygt $20$ år efter början av $2006$ är vi en bit in på år $2026$. ' +
                        'Rimlighet: från $2018$ är det $8{,}4$ år, och $2967 \\cdot 1{,}0639^{8{,}4} \\approx 5000$.',
                    text: '$$2006 + 20{,}4 \\approx 2026{,}4$$\n\nAntalet tigrar förväntas vara $5000$ under år $2026$.',
                },
            ],
            svar: 'År $2026$.',
            bedomning: [
                ['Godtagbar ansats, till exempel ställer upp en korrekt ekvation för att bestämma förändringsfaktorn, $2967 = 1411 \\cdot a^{12}$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar (år $2026$)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [0, 2, 0], omrade: 'Geometri: bevis med likbenta trianglar i en cirkel',
            genomgangar: ['ma2c-4.2', 'ma2c-4.11'],
            fraga: 'Figuren visar fyrhörningen $PMQR$ i en cirkel där $P$, $Q$ och $R$ ligger på ' +
                'cirkelns rand och $M$ är cirkelns medelpunkt. Vinklarna $a$, $b$ och $c$ är ' +
                'markerade i figuren.\n\n' +
                'Visa att sambandet $a + b = c$ gäller för alla fyrhörningar $PMQR$ där $P$, $Q$ ' +
                'och $R$ ligger på cirkelns rand och $M$ är cirkelns medelpunkt.',
            figur: 'u23',
            steg: [
                {
                    rubrik: 'Dra hjälplinjen MR',
                    varfor: 'Sträckorna $MP$, $MQ$ och $MR$ är alla radier i cirkeln och därför lika ' +
                        'långa. Med $MR$ inritad delas fyrhörningen i två trianglar som var och en ' +
                        'har två lika långa sidor: de är likbenta.',
                    text: '$$MP = MR = MQ = r$$',
                    figur: 'u23-s1',
                },
                {
                    rubrik: 'Använd basvinklarna i triangeln MPR',
                    varfor: 'I en likbent triangel är basvinklarna lika stora. I triangeln $MPR$ är ' +
                        '$MP = MR$, så vinkeln vid $R$ är lika stor som vinkeln vid $P$, som är $a$.',
                    text: '$$\\angle MRP = \\angle MPR = a$$',
                    figur: 'u23-s2',
                },
                {
                    rubrik: 'Använd basvinklarna i triangeln MQR',
                    varfor: 'Samma sak i triangeln $MQR$: $MQ = MR$, så vinkeln vid $R$ är lika stor ' +
                        'som vinkeln vid $Q$, som är $b$.',
                    text: '$$\\angle MRQ = \\angle MQR = b$$',
                    figur: 'u23-s3',
                },
                {
                    rubrik: 'Sätt ihop vinkeln c',
                    varfor: 'Hjälplinjen $MR$ delar vinkeln $c$ vid $R$ i två delar: $\\angle PRM = a$ ' +
                        'och $\\angle MRQ = b$. Beviset använder bara att $MP$, $MQ$ och $MR$ är radier, ' +
                        'så det gäller för alla fyrhörningar $PMQR$ av det här slaget.',
                    text: '$$c = \\angle PRQ = \\angle PRM + \\angle MRQ = a + b$$',
                },
            ],
            svar: 'Radierna $MP = MR = MQ$ gör trianglarna $MPR$ och $MQR$ likbenta, så $\\angle MRP = a$ och ' +
                '$\\angle MRQ = b$. Därför är $c = a + b$.',
            bedomning: [
                ['Godtagbar ansats, till exempel använder randvinkelsatsen och tecknar ett generellt uttryck för fyrhörningens vinkelsumma, eller använder att trianglarna $MPR$ och $MQR$ är likbenta', '+C'],
                ['med slutfört generellt resonemang som visar att sambandet gäller', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [1, 0, 2], omrade: 'Problemlösning med ekvationssystem',
            genomgangar: ['ma2c-1.4', 'ma2c-1.2'],
            fraga: 'Edith och Adrian kör samma sträcka från Umeå till Hudiksvall. Adrian startar ' +
                'först och Edith startar när Adrian redan har kört $13$ km. Efter ett tag kör ' +
                'Edith om Adrian. Adrian kör med medelhastigheten $72$ km/h fram till omkörningen ' +
                'och Edith kör med medelhastigheten $81$ km/h fram till omkörningen.\n\n' +
                'Det påbörjade ekvationssystemet kan användas för att ta reda på hur lång sträcka ' +
                'Edith har kört när hon kör om Adrian.\n\n' +
                '$$\\begin{cases} y = 81x \\\\ \\ldots \\end{cases}$$\n\n' +
                'där $y$ km är sträckan fram till omkörningen. Se figur.\n\n' +
                '**a)** Tolka vad $x$ betyder i detta sammanhang.\n\n' +
                'När Edith kör om Adrian har de kört en tredjedel av hela sträckan.\n\n' +
                '**b)** Beräkna hur långt det är mellan Umeå och Hudiksvall.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs ekvationen som sträcka = hastighet gånger tid',
                    varfor: 'Ediths medelhastighet är $81$ km/h, och $y$ är sträckan i km. ' +
                        'Sambandet $y = 81x$ är alltså $\\text{sträcka} = \\text{hastighet} \\cdot \\text{tid}$, ' +
                        'så $x$ måste vara en tid i timmar.',
                    text: '$x$ är tiden i timmar från det att Edith startar tills hon kör om Adrian.',
                    delsvar: { del: 'a', text: '$x$ är tiden (i timmar) som Edith kör fram till omkörningen.' },
                },
                {
                    del: 'b',
                    rubrik: 'Ställ upp Adrians ekvation',
                    varfor: 'Adrian kör lika lång tid $x$ under Ediths körning, med $72$ km/h, men han ' +
                        'hade redan $13$ km försprång. Vid omkörningen har båda kört samma sträcka $y$.',
                    text: '$$\\begin{cases} y = 81x \\\\ y = 72x + 13 \\end{cases}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös ekvationssystemet',
                    varfor: 'Båda ekvationerna ger $y$, så högerleden kan sättas lika ' +
                        '(substitutionsmetoden). Sedan löses $x$ ut och sätts in i $y = 81x$.',
                    text: '$$81x = 72x + 13 \\quad \\Longleftrightarrow \\quad 9x = 13 \\quad ' +
                        '\\Longleftrightarrow \\quad x = \\dfrac{13}{9} = 1{,}44\\ldots$$\n\n' +
                        '$$y = 81 \\cdot \\dfrac{13}{9} = 9 \\cdot 13 = 117$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna hela sträckan',
                    varfor: 'Omkörningen sker efter $117$ km, och det är en tredjedel av hela ' +
                        'sträckan. Hela sträckan är alltså tre gånger så lång. Rimlighet: Edith ' +
                        'kör om efter knappt en och en halv timme, och $81 \\cdot 1{,}44 \\approx 117$.',
                    text: '$$3 \\cdot 117 = 351\\ \\mathrm{km} \\approx 350\\ \\mathrm{km}$$',
                    delsvar: { del: 'b', text: 'Cirka $350$ km (exakt $351$ km med modellen).' },
                },
            ],
            svar: '**a)** $x$ är tiden i timmar från Ediths start till omkörningen.&emsp;&emsp;' +
                '**b)** Cirka $350$ km ($351$ km).',
            bedomning: [
                ['a) Godtagbart svar (till exempel "tiden")', '+E'],
                ['b) Godtagbar ansats, till exempel bestämmer $x$, $x = 1{,}44$', '+A'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($350$ km)', '+A'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 2, 0], omrade: 'Statistik: medelvärde, median och variationsbredd',
            genomgangar: ['ma2c-6.1', 'ma2c-6.2'],
            fraga: 'För fyra personers timlöner gäller följande:\n\n' +
                'Medelvärde: $210$ kr/h\n\nMedian: $200$ kr/h\n\nVariationsbredd: $80$ kr/h\n\n' +
                'Undersök vad timlönen kan vara för den person som har den högsta timlönen.',
            figur: null,
            steg: [
                {
                    rubrik: 'Inför beteckningar för lönerna i storleksordning',
                    varfor: 'Alla tre måtten handlar om lönerna i ordning, så kalla dem ' +
                        '$l_1 \\leq l_2 \\leq l_3 \\leq l_4$. Den högsta timlönen är $l_4$.',
                    text: '$$l_1 \\leq l_2 \\leq l_3 \\leq l_4$$',
                },
                {
                    rubrik: 'Översätt medelvärdet till en summa',
                    varfor: 'Medelvärdet är summan delat med antalet. Fyra löner med medelvärdet ' +
                        '$210$ har alltså summan $4 \\cdot 210$.',
                    text: '$$l_1 + l_2 + l_3 + l_4 = 4 \\cdot 210 = 840$$',
                },
                {
                    rubrik: 'Översätt medianen',
                    varfor: 'Med ett jämnt antal värden är medianen medelvärdet av de två ' +
                        'mittersta. De två mittersta lönerna har alltså summan $2 \\cdot 200$.',
                    text: '$$\\dfrac{l_2 + l_3}{2} = 200 \\quad \\Longleftrightarrow \\quad l_2 + l_3 = 400$$',
                },
                {
                    rubrik: 'Kombinera med variationsbredden',
                    varfor: 'Summan av den lägsta och den högsta lönen är $840 - 400 = 440$. ' +
                        'Variationsbredden är största minus minsta värdet, $l_4 - l_1 = 80$. ' +
                        'Två ekvationer med två obekanta: addera dem så försvinner $l_1$.',
                    text: '$$\\begin{cases} l_1 + l_4 = 440 \\\\ l_4 - l_1 = 80 \\end{cases} \\quad \\Longrightarrow \\quad ' +
                        '2 l_4 = 520 \\quad \\Longleftrightarrow \\quad l_4 = 260$$',
                },
                {
                    rubrik: 'Kontrollera att en sådan lönefördelning finns',
                    varfor: 'Den lägsta lönen blir $l_1 = 440 - 260 = 180$. De två mittersta ska ha ' +
                        'summan $400$ och ligga mellan $180$ och $260$, vilket går, till exempel ' +
                        '$200$ och $200$. Eftersom $l_4$ bestämdes entydigt av villkoren är $260$ ' +
                        'den enda möjliga högsta lönen.',
                    text: 'Till exempel lönerna $180$, $200$, $200$ och $260$ kr/h: medelvärde ' +
                        '$\\dfrac{840}{4} = 210$, median $200$, variationsbredd $260 - 180 = 80$.',
                },
            ],
            svar: 'Den högsta timlönen måste vara $260$ kr/h.',
            bedomning: [
                ['Godtagbar ansats, inser att den sammanlagda timlönen för den som har den lägsta och den högsta timlönen är $440$ kr/h, eller ställer upp en ekvation i en variabel, eller påbörjar en prövning där alla tre villkoren ingår och tolkas korrekt', '+C'],
                ['med slutfört resonemang med korrekt svar ($260$ kr/h)', '+C'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 0, 3], omrade: 'Algebra: bevis med på varandra följande heltal',
            genomgangar: ['ma2c-2.1', 'ma2c-4.4'],
            fraga: 'Anta att $a$, $b$ och $c$ är tre på varandra följande heltal där $a < b < c$.\n\n' +
                'Undersök om uttrycket $\\dfrac{a^2 + b^2 + c^2 - 2}{3}$ alltid är ett heltal för alla ' +
                'sådana på varandra följande heltal $a$, $b$ och $c$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Uttryck de tre talen i en variabel',
                    varfor: 'Tre på varandra följande heltal skiljer sig med $1$ i taget. Om det ' +
                        'minsta är $a$ så är de andra $a + 1$ och $a + 2$. Då beskrivs alla ' +
                        'tänkbara tripplar av ett enda heltal $a$, och vi kan resonera allmänt i ' +
                        'stället för att pröva exempel.',
                    text: '$$b = a + 1 \\qquad\\qquad c = a + 2$$',
                },
                {
                    rubrik: 'Utveckla täljaren med kvadreringsregeln',
                    varfor: 'Första kvadreringsregeln på $(a + 1)^2$ och $(a + 2)^2$. Samla sedan ' +
                        'kvadrattermer, $a$-termer och konstanter var för sig.',
                    text: '$$a^2 + (a + 1)^2 + (a + 2)^2 - 2 = a^2 + a^2 + 2a + 1 + a^2 + 4a + 4 - 2 = 3a^2 + 6a + 3$$',
                },
                {
                    rubrik: 'Dividera med 3',
                    varfor: 'Alla tre termerna i täljaren är delbara med $3$, så bryt ut $3$ och ' +
                        'förkorta. Kvar blir ett polynom med heltalskoefficienter.',
                    text: '$$\\dfrac{3a^2 + 6a + 3}{3} = \\dfrac{3(a^2 + 2a + 1)}{3} = a^2 + 2a + 1$$',
                },
                {
                    rubrik: 'Känn igen en jämn kvadrat och dra slutsatsen',
                    varfor: 'Uttrycket $a^2 + 2a + 1$ är $(a + 1)^2$, det vill säga $b^2$. Eftersom $a$ ' +
                        'är ett heltal är $a + 1$ ett heltal, och kvadraten på ett heltal är alltid ' +
                        'ett heltal. Uttrycket är alltså alltid ett heltal, nämligen kvadraten på ' +
                        'det mittersta talet. (Exempel: $3$, $4$, $5$ ger $\\dfrac{9 + 16 + 25 - 2}{3} = 16 = 4^2$.)',
                    text: '$$\\dfrac{a^2 + b^2 + c^2 - 2}{3} = (a + 1)^2 = b^2$$',
                },
            ],
            svar: 'Ja. Med $b = a + 1$ och $c = a + 2$ blir uttrycket $(a + 1)^2 = b^2$, kvadraten på ett heltal, ' +
                'och alltså alltid ett heltal.',
            bedomning: [
                ['Godtagbar ansats, ansätter lämpliga uttryck för $a$, $b$ och $c$ och skriver om uttrycket i en variabel, till exempel $\\dfrac{a^2 + (a+1)^2 + (a+2)^2 - 2}{3}$', '+A'],
                ['med slutfört resonemang som inkluderar slutsatsen att uttrycket alltid är ett heltal', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 0, 2], omrade: 'Koordinatgeometri: avståndsformeln med parameter',
            genomgangar: ['ma2c-4.6', 'ma2c-3.1'],
            fraga: 'Funktionen $f$ ges av $f(x) = \\dfrac{x^2}{a}$ där $a$ är en konstant och $a > 0$.\n\n' +
                'En sträcka $S$ dras från den punkt på funktionens graf där $x$-koordinaten är $a$ ' +
                'till den punkt på funktionens graf där $x$-koordinaten är $2a$.\n\n' +
                'Bestäm längden av sträckan $S$ uttryckt i $a$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm y-koordinaten för den första punkten',
                    varfor: 'En punkt på grafen har $y$-koordinaten $f(x)$. Sätt in $x = a$ och ' +
                        'förkorta bråket med $a$.',
                    text: '$$f(a) = \\dfrac{a^2}{a} = a \\qquad \\Longrightarrow \\qquad (a,\\ a)$$',
                },
                {
                    rubrik: 'Bestäm y-koordinaten för den andra punkten',
                    varfor: 'Sätt in $x = 2a$. Kom ihåg att hela $2a$ kvadreras: $(2a)^2 = 4a^2$.',
                    text: '$$f(2a) = \\dfrac{(2a)^2}{a} = \\dfrac{4a^2}{a} = 4a \\qquad \\Longrightarrow \\qquad (2a,\\ 4a)$$',
                    figur: 'u27-s1',
                },
                {
                    rubrik: 'Använd avståndsformeln',
                    varfor: 'Avståndet mellan två punkter är hypotenusan i en rätvinklig triangel ' +
                        'med kateterna $\\Delta x$ och $\\Delta y$: $S = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$. ' +
                        'Här är $\\Delta x = 2a - a = a$ och $\\Delta y = 4a - a = 3a$.',
                    text: '$$S = \\sqrt{(2a - a)^2 + (4a - a)^2} = \\sqrt{a^2 + (3a)^2} = \\sqrt{a^2 + 9a^2} = \\sqrt{10a^2}$$',
                },
                {
                    rubrik: 'Förenkla roten',
                    varfor: 'Roten ur en produkt är produkten av rötterna: $\\sqrt{10a^2} = \\sqrt{10} \\cdot \\sqrt{a^2}$. ' +
                        'Eftersom $a > 0$ är $\\sqrt{a^2} = a$.',
                    text: '$$S = \\sqrt{10} \\cdot a = a\\sqrt{10} \\approx 3{,}16a$$',
                },
            ],
            svar: '$S = a\\sqrt{10}$ längdenheter (cirka $3{,}16a$).',
            bedomning: [
                ['Godtagbar ansats, bestämmer $y$-koordinaterna för båda punkterna', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($a\\sqrt{10}$ l.e.). Även svaren $3{,}16a$, $\\sqrt{10a^2}$ och $\\sqrt{10}\\,a$ ges poäng', '+A'],
            ],
        },

        {
            nr: 28, del: 'D', poang: [0, 0, 3], omrade: 'Likformiga trianglar: förhållande mellan sträckor',
            genomgangar: ['ma2c-4.8'],
            fraga: 'Figuren visar rektangeln $ABCD$ med en punkt $P$ på sidan $BC$. När sträckorna ' +
                '$DP$ och $AB$ förlängs skär de varandra i punkten $Q$.\n\n' +
                'Bestäm $\\dfrac{AB}{AQ}$ om $BP = a$ och $PC = 3a$.',
            figur: 'u28',
            steg: [
                {
                    rubrik: 'Hitta två likformiga trianglar',
                    varfor: 'Sträckan $DP$ skapar två trianglar: $DCP$ inne i rektangeln och $QBP$ ' +
                        'utanför. Vinklarna vid $C$ och $B$ är räta (rektangelns hörn). Vinklarna vid ' +
                        '$P$ är vertikalvinklar och därför lika stora. Två lika vinklar räcker: ' +
                        'trianglarna är likformiga.',
                    text: '$$\\triangle DCP \\sim \\triangle QBP$$',
                    figur: 'u28-s1',
                },
                {
                    rubrik: 'Ställ upp förhållandet mellan motsvarande sidor',
                    varfor: 'I likformiga trianglar är förhållandet mellan motsvarande sidor lika. ' +
                        'Kateten $PC$ i den stora triangeln motsvarar $BP$ i den lilla, och $DC$ ' +
                        'motsvarar $BQ$. Längdskalan är $\\dfrac{PC}{BP} = \\dfrac{3a}{a} = 3$.',
                    text: '$$\\dfrac{DC}{BQ} = \\dfrac{PC}{BP} = \\dfrac{3a}{a} = 3 \\quad \\Longleftrightarrow \\quad ' +
                        'BQ = \\dfrac{DC}{3}$$',
                    figur: 'u28-s2',
                },
                {
                    rubrik: 'Uttryck BQ i AB',
                    varfor: 'I en rektangel är motstående sidor lika långa, så $DC = AB$. Sträckan ' +
                        '$BQ$ är alltså en tredjedel av $AB$.',
                    text: '$$BQ = \\dfrac{AB}{3}$$',
                },
                {
                    rubrik: 'Bilda kvoten AB/AQ',
                    varfor: 'Sträckan $AQ$ består av $AB$ och $BQ$ efter varandra: ' +
                        '$AQ = AB + \\dfrac{AB}{3} = \\dfrac{4 \\cdot AB}{3}$. Kvoten blir oberoende av ' +
                        'både $a$ och rektangelns bredd, precis som frågan antyder.',
                    text: '$$\\dfrac{AB}{AQ} = \\dfrac{AB}{AB + \\frac{AB}{3}} = \\dfrac{AB}{\\frac{4 \\cdot AB}{3}} = \\dfrac{3}{4}$$',
                },
            ],
            svar: '$\\dfrac{AB}{AQ} = \\dfrac{3}{4}$',
            bedomning: [
                ['Godtagbar ansats, till exempel anger ett samband mellan $DC$ och $BQ$ med hjälp av likformighet', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar $\\left(\\dfrac{AB}{AQ} = \\dfrac{3}{4}\\right)$', '+A'],
                ['Lösningen kommuniceras på A-nivå', '+A'],
            ],
        },
    ],
};
