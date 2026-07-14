// Fysiklabbet — Kursprov Matematik 1c, hösten 2016.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Delprov A (muntligt gruppdelprov) ingår inte. Uppgift 11 var vid
// frisläppandet fortfarande under sekretess och saknar uppgiftstext.
//
// Källa: Skolverket/PRIM-gruppen, kursprov Ma 1c HT2016 (frisläppt).

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma1c-ht2016'] = {
    id: 'ma1c-ht2016',
    kurs: 'Matematik nivå 1c',
    termin: 'HT 2016',
    namn: 'Kursprov Ma 1c, hösten 2016',
    kort: 'NP Ma 1c HT2016',
    intro: 'Det här är kursprovet i Matematik 1c från hösten 2016 ' +
        '(Skolverket/PRIM-gruppen). Här finns de skriftliga delproven B, C och D — ' +
        'delprov A är ett muntligt gruppdelprov och ingår inte. ' +
        'Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg i taget. ' +
        'Varje steg förklarar både vad som görs och varför.',
    kravgranser: 'Provet (delprov A–D) ger totalt högst 83 poäng. Poängen skrivs (E/C/A). ' +
        'Gräns för provbetyget: E minst 19 poäng · D minst 34 poäng varav 13 på lägst C-nivå · ' +
        'C minst 41 poäng varav 19 på lägst C-nivå · B minst 53 poäng varav 7 på A-nivå · ' +
        'A minst 64 poäng varav 13 på A-nivå.',
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
            tid: '120 minuter',
            hjalpmedel: 'Digitala verktyg, formelblad och linjal',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Flera uppgifter; lösningarna ska oftast redovisas och motiveras.',
        },
    },
    uppgifter: [

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [1, 0, 0], omrade: 'Algebra — insättning',
            endastSvar: true,
            fraga: 'Bestäm värdet av $4x + 3$ om $x = 3$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Sätt in x = 3',
                    varfor: 'Att bestämma värdet betyder att vi ersätter varje $x$ med $3$ och räknar ut. ' +
                        'Kom ihåg räkneordningen: multiplikation före addition.',
                    text: '$$4 \\cdot 3 + 3 = 12 + 3 = 15$$',
                },
            ],
            svar: '15',
            bedomning: [['Korrekt svar: 15', '+E']],
        },

        {
            nr: 2, del: 'B', poang: [2, 0, 0], omrade: 'Olikheter',
            endastSvar: true,
            fraga: 'Vilket värde på $x$ uppfyller *inte* villkoret $2x + 1 > 5$? Ringa in ditt svar.\n\n' +
                '$7 \\qquad 5 \\qquad 4 \\qquad 3 \\qquad 2$',
            figur: null,
            steg: [
                {
                    rubrik: 'Lös olikheten',
                    varfor: 'Vi tar reda på vilka $x$ som *uppfyller* villkoret, så ser vi vilket av talen ' +
                        'som *inte* gör det. Lös ut $x$ som i en vanlig ekvation.',
                    text: '$$2x + 1 > 5 \\quad \\Longrightarrow \\quad 2x > 4 \\quad \\Longrightarrow \\quad x > 2$$\n\n' +
                        'Villkoret uppfylls alltså av alla tal som är **större än** $2$.',
                },
                {
                    rubrik: 'Hitta talet som inte uppfyller villkoret',
                    text: 'Av alternativen är $7$, $5$, $4$ och $3$ alla större än $2$ — de uppfyller villkoret. ' +
                        'Bara $x = 2$ är *inte* större än $2$ (eftersom $2 \\cdot 2 + 1 = 5$, och $5$ är inte ' +
                        '$> 5$). Alltså är svaret $x = 2$.',
                },
            ],
            svar: '$x = 2$',
            bedomning: [['Korrekt svar: $x = 2$', '+E +E']],
        },

        {
            nr: 3, del: 'B', poang: [1, 0, 0], omrade: 'Logik — ekvivalens och implikation',
            endastSvar: true,
            fraga: 'Följande samband är ekvivalenser eller implikationer. Markera ekvivalens med ' +
                'ekvivalenspil $\\Leftrightarrow$ och enbart implikation med korrekt implikationspil ' +
                '$\\Rightarrow$ eller $\\Leftarrow$.\n\n' +
                '**Rad 1:** Pernilla bor i Sverige. $\\square$ Pernilla bor i Europa.\n\n' +
                '**Rad 2:** Fyrhörningen $F$ är en rektangel. $\\square$ Fyrhörningen $F$ är en kvadrat.',
            figur: null,
            steg: [
                {
                    rubrik: 'Rad 1: bor i Sverige — bor i Europa',
                    varfor: 'En pil $\\Rightarrow$ betyder "medför". En dubbelpil $\\Leftrightarrow$ betyder ' +
                        'att påståendena medför varandra åt båda hållen. Fråga: följer det ena av det andra, ' +
                        'och gäller det åt båda hållen?',
                    text: 'Bor man i Sverige så bor man i Europa — det stämmer alltid. Men bor man i Europa ' +
                        'behöver man inte bo i Sverige (man kan bo i t.ex. Spanien). Det gäller alltså bara ' +
                        'åt ett håll:\n\n$$\\text{bor i Sverige} \\Rightarrow \\text{bor i Europa}$$',
                },
                {
                    rubrik: 'Rad 2: rektangel — kvadrat',
                    varfor: 'Samma fråga här: medför det ena det andra, och åt vilket håll? Tänk på ' +
                        'definitionerna — en kvadrat är en rektangel med alla sidor lika långa.',
                    text: 'Varje kvadrat *är* en rektangel, men en rektangel behöver inte vara en kvadrat. ' +
                        'Så "kvadrat" medför "rektangel", vilket skrivs med pilen åt vänster:\n\n' +
                        '$$\\text{rektangel} \\Leftarrow \\text{kvadrat}$$',
                },
            ],
            svar: 'Rad 1: $\\Rightarrow$ · Rad 2: $\\Leftarrow$',
            bedomning: [['Två korrekta symboler', '+E']],
        },

        {
            nr: 4, del: 'B', poang: [1, 0, 0], omrade: 'Potensekvationer',
            endastSvar: true,
            fraga: 'Lös ekvationen $4x^3 = 32$',
            figur: null,
            steg: [
                {
                    rubrik: 'Dela bort faktorn 4',
                    varfor: 'Vi vill ha $x^3$ ensamt i vänsterledet. Dela båda leden med $4$.',
                    text: '$$4x^3 = 32 \\quad \\Longrightarrow \\quad x^3 = 8$$',
                },
                {
                    rubrik: 'Dra kubikroten',
                    varfor: 'För att få $x$ ur $x^3$ drar vi kubikroten (tredje roten) ur båda leden. ' +
                        'Vilket tal upphöjt till $3$ blir $8$?',
                    text: '$$x = \\sqrt[3]{8} = 2$$\n\n(eftersom $2^3 = 8$). **Kontroll:** $4 \\cdot 2^3 = 4 \\cdot 8 = 32$ ✓',
                },
            ],
            svar: '$x = 2$',
            bedomning: [['Korrekt svar: $x = 2$ (eller $\\sqrt[3]{8}$)', '+E']],
        },

        {
            nr: 5, del: 'B', poang: [1, 0, 0], omrade: 'Andelar — ppm och decimalform',
            endastSvar: true,
            fraga: 'Koldioxidhalten i luften är $393$ ppm. Skriv denna halt i decimalform.',
            figur: null,
            steg: [
                {
                    rubrik: 'Vad betyder ppm?',
                    varfor: 'ppm står för "parts per million" — delar per miljon. $1$ ppm är alltså ' +
                        '$\\dfrac{1}{1\\,000\\,000}$.',
                    text: '$$393\\ \\text{ppm} = \\dfrac{393}{1\\,000\\,000}$$',
                },
                {
                    rubrik: 'Skriv som decimaltal',
                    text: '$$\\dfrac{393}{1\\,000\\,000} = 0{,}000393$$\n\n' +
                        'Detta kan också skrivas $3{,}93 \\cdot 10^{-4}$.',
                },
            ],
            svar: '$0{,}000393$ (eller $3{,}93 \\cdot 10^{-4}$)',
            bedomning: [['Korrekt svar: $0{,}000393$', '+E']],
        },

        {
            nr: 6, del: 'B', poang: [0, 2, 0], omrade: 'Talbaser',
            endastSvar: false,
            fraga: 'Talet $113$ är skrivet i bas 7. Skriv talet i bas 10. Redovisa din lösning.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ge varje siffra sitt platsvärde',
                    varfor: 'I bas 7 har positionerna, från höger, platsvärdena $7^0 = 1$, $7^1 = 7$, ' +
                        '$7^2 = 49$, osv. Talet $113_7$ har siffrorna $1$, $1$, $3$ — multiplicera varje ' +
                        'siffra med sitt platsvärde.',
                    text: '$$113_7 = 1 \\cdot 7^2 + 1 \\cdot 7^1 + 3 \\cdot 7^0$$',
                },
                {
                    rubrik: 'Räkna ut summan',
                    text: '$$1 \\cdot 49 + 1 \\cdot 7 + 3 \\cdot 1 = 49 + 7 + 3 = 59$$',
                },
            ],
            svar: '$59$',
            bedomning: [
                ['Påbörjad lösning, t.ex. visar att ettorna står för $49$ ($7^2$) och $7$', '+C'],
                ['Lösning med korrekt svar: $59$', '+C'],
            ],
        },

        {
            nr: 7, del: 'B', poang: [0, 2, 0], omrade: 'Funktioner — avläsa graf',
            endastSvar: true,
            fraga: 'I figuren visas grafen till funktionen $y = f(x)$.\n\n' +
                '**a)** Bestäm $f(2)$ med hjälp av grafen.\n\n' +
                '**b)** Lös ekvationen $f(x) = 2$ med hjälp av grafen.',
            figur: 'u7',
            steg: [
                {
                    del: 'a', rubrik: 'Läs av funktionsvärdet där x = 2',
                    varfor: '$f(2)$ är kurvans höjd när $x = 2$. Gå till $x = 2$ på $x$-axeln, upp till ' +
                        'grafen och läs av $y$-värdet.',
                    text: 'Vid $x = 2$ ligger grafen på höjden $y = 4$:\n\n$$f(2) = 4$$',
                    figur: 'u7-los-a',
                    delsvar: { del: 'a', text: '$f(2) = 4$' },
                },
                {
                    del: 'b', rubrik: 'Läs av var grafen har höjden 2',
                    varfor: 'Nu är $y$-värdet känt ($2$) och $x$ söks — vi läser av åt andra hållet. ' +
                        'Gå till $y = 2$ på $y$-axeln, följ vågrätt ut till grafen och ner till $x$-axeln.',
                    text: 'Grafen har höjden $y = 2$ när $x = 6$:\n\n$$x = 6$$',
                    figur: 'u7-los-b',
                    delsvar: { del: 'b', text: '$x = 6$' },
                },
            ],
            svar: '**a)** $f(2) = 4$ **b)** $x = 6$',
            bedomning: [
                ['a) Korrekt svar: $f(2) = 4$', '+C'],
                ['b) Korrekt svar: $x = 6$', '+C'],
            ],
        },

        {
            nr: 8, del: 'B', poang: [1, 1, 1], omrade: 'Algebraiska uttryck — resonemang',
            endastSvar: false,
            fraga: '$A = \\dfrac{B}{B + 1}$ där $B$ är ett positivt tal. Blir $A$ större eller mindre ' +
                'om $B$ dubbleras? Motivera ditt svar.',
            figur: null,
            steg: [
                {
                    rubrik: 'Testa med ett exempel',
                    varfor: 'Ett konkret exempel ger snabbt en känsla för åt vilket håll $A$ ändras. ' +
                        'Välj ett $B$ och jämför med dess dubbla värde.',
                    text: 'Låt $B = 1$: $A = \\dfrac{1}{1 + 1} = \\dfrac{1}{2} = 0{,}5$.\n\n' +
                        'Dubbla $B$ till $B = 2$: $A = \\dfrac{2}{2 + 1} = \\dfrac{2}{3} \\approx 0{,}67$.\n\n' +
                        '$A$ blev större.',
                },
                {
                    rubrik: 'Motivera generellt',
                    varfor: 'Ett exempel visar bara ett fall. För att veta att det *alltid* blir så skriver ' +
                        'vi om uttrycket så att beroendet av $B$ syns tydligt.',
                    text: 'Skriv om:\n\n$$A = \\dfrac{B}{B + 1} = \\dfrac{B + 1 - 1}{B + 1} = 1 - \\dfrac{1}{B + 1}$$\n\n' +
                        'När $B$ ökar blir nämnaren $B + 1$ större, så $\\dfrac{1}{B + 1}$ blir *mindre*. ' +
                        'Då blir det som dras bort från $1$ mindre — och därmed blir $A$ **större**. ' +
                        'Detta gäller för alla positiva $B$.',
                },
            ],
            svar: '$A$ blir större. Ett exempel: $B = 1$ ger $A = 0{,}5$, medan $B = 2$ ger $A \\approx 0{,}67$. ' +
                'Generellt: $A = 1 - \\frac{1}{B+1}$, och när $B$ ökar minskar $\\frac{1}{B+1}$, så $A$ ökar.',
            bedomning: [
                ['Påbörjad lösning, sätter in ett värde på $B$ och dess dubbla värde', '+E'],
                ['Korrekt slutsats utifrån exempel', '+C'],
                ['Korrekt slutsats utifrån generellt resonemang', '+A'],
            ],
        },

        {
            nr: 9, del: 'B', poang: [0, 2, 0], omrade: 'Ekvationer med bråk',
            endastSvar: false,
            fraga: 'Lös ekvationen $\\dfrac{3x + 1}{4} - \\dfrac{2x + 3}{3} = 2$. Redovisa din lösning.',
            figur: null,
            steg: [
                {
                    rubrik: 'Multiplicera bort nämnarna',
                    varfor: 'Bråk i en ekvation är enklast att bli av med. Minsta gemensamma nämnare för ' +
                        '$4$ och $3$ är $12$. Multiplicera *hela* ekvationen med $12$ så försvinner nämnarna.',
                    text: '$$12 \\cdot \\dfrac{3x + 1}{4} - 12 \\cdot \\dfrac{2x + 3}{3} = 12 \\cdot 2$$\n\n' +
                        '$$3(3x + 1) - 4(2x + 3) = 24$$',
                },
                {
                    rubrik: 'Förenkla vänsterledet',
                    varfor: 'Multiplicera in och dra ihop lika termer. Var noga med minustecknet framför ' +
                        '$4(2x + 3)$ — det byter tecken på båda termerna.',
                    text: '$$9x + 3 - 8x - 12 = 24$$\n\n$$x - 9 = 24$$',
                },
                {
                    rubrik: 'Lös ut x',
                    text: 'Addera $9$ till båda leden:\n\n$$x = 33$$\n\n' +
                        '**Kontroll:** $\\dfrac{3 \\cdot 33 + 1}{4} - \\dfrac{2 \\cdot 33 + 3}{3} = ' +
                        '\\dfrac{100}{4} - \\dfrac{69}{3} = 25 - 23 = 2$ ✓',
                },
            ],
            svar: '$x = 33$',
            bedomning: [
                ['Påbörjad lösning, t.ex. förlänger bråken till gemensam nämnare eller multiplicerar båda ' +
                    'leden med $12$', '+C'],
                ['Lösning med korrekt svar: $x = 33$', '+C'],
            ],
        },

        {
            nr: 10, del: 'B', poang: [0, 1, 1], omrade: 'Andelar — jämförelse',
            endastSvar: true,
            fraga: 'Vilket eller vilka tal av alternativen nedan är större än $2$ promille? ' +
                'Ringa in ditt/dina svar.\n\n' +
                '$\\dfrac{2}{2\\,000} \\qquad 0{,}00201 \\qquad \\dfrac{1}{499} \\qquad \\dfrac{1}{501} ' +
                '\\qquad 1{,}9 \\cdot 10^{-3}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv 2 promille i decimalform',
                    varfor: 'Promille betyder tusendelar: $1\\ ‰ = \\dfrac{1}{1000} = 0{,}001$. ' +
                        'Vi jämför alla alternativ med detta gränsvärde.',
                    text: '$$2\\ ‰ = \\dfrac{2}{1000} = 0{,}002$$',
                },
                {
                    rubrik: 'Räkna om varje alternativ',
                    text: '- $\\dfrac{2}{2\\,000} = 0{,}001$ — mindre\n' +
                        '- $0{,}00201$ — **större** än $0{,}002$\n' +
                        '- $\\dfrac{1}{499} \\approx 0{,}002004$ — **större** än $0{,}002$\n' +
                        '- $\\dfrac{1}{501} \\approx 0{,}001996$ — mindre\n' +
                        '- $1{,}9 \\cdot 10^{-3} = 0{,}0019$ — mindre',
                },
            ],
            svar: '$0{,}00201$ och $\\dfrac{1}{499}$',
            bedomning: [
                ['Minst ett korrekt tal inringat och maximalt ett felaktigt tal inringat', '+C'],
                ['Ringat in de båda korrekta talen och inget felaktigt tal', '+A'],
            ],
        },

        {
            nr: 11, del: 'B', poang: [0, 0, 0], omrade: '',
            endastSvar: false, sekretess: true,
            fraga: 'Uppgift under sekretess.',
            figur: null, steg: [], svar: '',
        },

        {
            nr: 12, del: 'B', poang: [0, 0, 1], omrade: 'Algebra — tabell',
            endastSvar: true,
            fraga: 'Vilket tal ska stå i den tomma rutan i tabellen?\n\n' +
                '| $x$ | $xy$ | $xy^2$ |\n| :---: | :---: | :---: |\n| $2$ | $-10$ | ? |',
            figur: null,
            steg: [
                {
                    rubrik: 'Ta reda på y',
                    varfor: 'Vi känner $x = 2$ och $xy = -10$. Ur dessa kan vi lösa ut $y$, som vi sedan ' +
                        'behöver för att räkna ut $xy^2$.',
                    text: '$$xy = -10 \\quad \\Longrightarrow \\quad 2y = -10 \\quad \\Longrightarrow \\quad y = -5$$',
                },
                {
                    rubrik: 'Beräkna xy²',
                    varfor: 'Nu när vi vet $x = 2$ och $y = -5$ sätter vi in i $xy^2$. Tänk på att bara $y$ ' +
                        'kvadreras, inte $x$: $xy^2 = x \\cdot y^2$.',
                    text: '$$xy^2 = 2 \\cdot (-5)^2 = 2 \\cdot 25 = 50$$\n\n' +
                        '(Man kan också se det som $xy \\cdot y = -10 \\cdot (-5) = 50$.)',
                },
            ],
            svar: '$xy^2 = 50$',
            bedomning: [['Korrekt svar: $50$', '+A']],
        },

        {
            nr: 13, del: 'B', poang: [0, 0, 1], omrade: 'Funktioner — beteckning',
            endastSvar: true,
            fraga: 'En istapp har volymen $V(t)$ cm³, där $t$ är tiden i minuter efter klockan 08.00. ' +
                'Klockan 09.00 har istappen volymen $21$ cm³. Använd funktionen $V(t)$ och skriv detta ' +
                'påstående med matematiska symboler.',
            figur: null,
            steg: [
                {
                    rubrik: 'Översätt tiden till funktionens variabel',
                    varfor: 'Variabeln $t$ räknas i *minuter efter klockan 08.00*. Klockan 09.00 är en timme ' +
                        'senare, alltså $60$ minuter efter 08.00. Så tidpunkten motsvarar $t = 60$.',
                    text: '$$\\text{klockan } 09.00 \\quad \\Longleftrightarrow \\quad t = 60$$',
                },
                {
                    rubrik: 'Skriv påståendet med funktionsbeteckning',
                    varfor: '"$V(t)$ = volymen vid tiden $t$." Att volymen är $21$ cm³ vid $t = 60$ skrivs ' +
                        'genom att sätta in $60$ som argument.',
                    text: '$$V(60) = 21$$',
                },
            ],
            svar: '$V(60) = 21$',
            bedomning: [['Korrekt svar: $V(60) = 21$', '+A']],
        },

        {
            nr: 14, del: 'B', poang: [0, 0, 1], omrade: 'Rötter och potenser',
            endastSvar: true,
            fraga: 'Skriv $\\sqrt{a^6} \\cdot \\sqrt{a^6}$ som en potens med basen $a$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Se att det är en kvadratrot gånger sig själv',
                    varfor: 'De två faktorerna är identiska, så produkten är en kvadrat: ' +
                        '$\\sqrt{a^6} \\cdot \\sqrt{a^6} = \\left(\\sqrt{a^6}\\right)^2$. ' +
                        'Och att kvadrera en kvadratrot tar bort roten.',
                    text: '$$\\sqrt{a^6} \\cdot \\sqrt{a^6} = \\left(\\sqrt{a^6}\\right)^2 = a^6$$',
                },
                {
                    rubrik: 'Kontrollera på ett annat sätt',
                    varfor: 'Det är bra att kontrollera med en annan väg. $\\sqrt{a^6}$ kan först förenklas: ' +
                        '$\\sqrt{a^6} = a^{6/2} = a^3$.',
                    text: '$$\\sqrt{a^6} \\cdot \\sqrt{a^6} = a^3 \\cdot a^3 = a^{3+3} = a^6$$\n\nSamma svar.',
                },
            ],
            svar: '$a^6$',
            bedomning: [['Korrekt svar: $a^6$', '+A']],
        },

        {
            nr: 15, del: 'B', poang: [0, 0, 1], omrade: 'Trigonometri — med tabell',
            endastSvar: true,
            fraga: 'Bestäm längden på sidan $a$ i triangeln med hjälp av tabellen över $\\sin$, $\\cos$ ' +
                'och $\\tan$. Triangeln är rätvinklig med den räta vinkeln nere till vänster, ' +
                'vinkeln $20\\degree$ vid toppen och $70\\degree$ nere till höger. Hypotenusan (från toppen ' +
                'till nedre högra hörnet) har längden $2$. Sidan $a$ är den lodräta vänstra sidan. ' +
                'Figuren är ej skalenligt ritad. Svara i längdenheter (l.e.).\n\n' +
                '(Ur tabellen: $\\sin 20\\degree = 0{,}342$, $\\cos 20\\degree = 0{,}940$, $\\tan 20\\degree = 0{,}364$.)',
            figur: 'u15',
            steg: [
                {
                    rubrik: 'Placera sidorna i förhållande till 20°-vinkeln',
                    varfor: 'Vid toppvinkeln $20\\degree$ möts sidan $a$ och hypotenusan (längd $2$). ' +
                        'Sidan $a$ ligger *intill* vinkeln (närliggande katet) och $2$ är hypotenusan. ' +
                        'När vi har närliggande katet och hypotenusan är cosinus rätt funktion.',
                    text: '$$\\cos 20\\degree = \\dfrac{a}{2}$$',
                    figur: 'u15-los',
                },
                {
                    rubrik: 'Lös ut a med värdet ur tabellen',
                    varfor: 'Ur tabellen är $\\cos 20\\degree = 0{,}940$. Multiplicera båda leden med $2$ ' +
                        'för att få $a$.',
                    text: '$$a = 2 \\cdot \\cos 20\\degree = 2 \\cdot 0{,}940 = 1{,}88\\ \\text{l.e.}$$',
                },
            ],
            svar: '$a = 1{,}88$ l.e.',
            bedomning: [['Korrekt svar: $1{,}88$ l.e.', '+A']],
        },

        {
            nr: 16, del: 'B', poang: [0, 0, 2], omrade: 'Potenslagar',
            endastSvar: true,
            fraga: 'Bestäm $n$ om $2^4 \\cdot 3^8 = 9^n \\cdot 6^4$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv höger led med baserna 2 och 3',
                    varfor: 'Vänsterledet är redan uttryckt i baserna $2$ och $3$. Om vi skriver om ' +
                        'högerledets $9$ och $6$ i samma baser kan vi jämföra exponenterna direkt. ' +
                        'Notera att $9 = 3^2$ och $6 = 2 \\cdot 3$.',
                    text: '$$9^n = (3^2)^n = 3^{2n} \\qquad 6^4 = (2 \\cdot 3)^4 = 2^4 \\cdot 3^4$$\n\n' +
                        'Högerledet blir:\n\n$$9^n \\cdot 6^4 = 3^{2n} \\cdot 2^4 \\cdot 3^4 = 2^4 \\cdot 3^{2n + 4}$$',
                },
                {
                    rubrik: 'Jämför exponenterna för basen 3',
                    varfor: 'Nu står $2^4$ i båda leden, så de tar ut varandra. Kvar är två potenser av $3$ ' +
                        'som måste vara lika — alltså måste exponenterna vara lika.',
                    text: '$$2^4 \\cdot 3^8 = 2^4 \\cdot 3^{2n + 4}$$\n\n' +
                        'Jämför treornas exponenter:\n\n' +
                        '$$8 = 2n + 4 \\quad \\Longrightarrow \\quad 2n = 4 \\quad \\Longrightarrow \\quad n = 2$$',
                },
            ],
            svar: '$n = 2$',
            bedomning: [['Korrekt svar: $n = 2$', '+A +A']],
        },

        // ================= DELPROV C =================
        {
            nr: 17, del: 'C', poang: [3, 5, 3], omrade: 'Sannolikhet — spela kula',
            endastSvar: false,
            fraga: 'På en skolgård spelar barnen kula. Barnen kastar kulor mot pyramider som består av ' +
                'fyra kulor. Spelregler:\n\n' +
                '- Spelet spelas i par: en *uppställare* (bygger en pyramid) och en *kastare*.\n' +
                '- Kastaren kastar en kula i taget.\n' +
                '- En spelomgång pågår tills kastaren träffar pyramiden.\n' +
                '- Träffar kastaren pyramiden vinner hon/han de fyra kulorna i pyramiden.\n' +
                '- Kastaren *förlorar alltid* den kula hon/han kastar — både vid träff och miss.\n\n' +
                'Camilla har observerat sin lillebror Niklas: av $150$ kast har Niklas träffat pyramiden ' +
                '$15$ gånger och missat $135$ gånger.\n\n' +
                '**I.** Hur stor är sannolikheten att Niklas träffar pyramiden i första kastet i en spelomgång?\n\n' +
                '**II.** Rita av träddiagrammet och ange sannolikheterna för träff och miss i de första tre kasten.\n\n' +
                'Om Niklas har *fler* kulor efter en spelomgång än före kallas det att "gå plus". ' +
                'Har han *färre* kallas det att "gå minus".\n\n' +
                '**III.** Hur många kulor kan Niklas "gå plus" med i en spelomgång? Ange samtliga möjligheter.\n\n' +
                '**IV.** Hur stor är sannolikheten att Niklas "går plus" med *precis två* kulor i en spelomgång?\n\n' +
                '**V.** Hur stor är sannolikheten att Niklas "går plus" med *minst en* kula i en spelomgång?\n\n' +
                '**VI.** Hur stor är sannolikheten att Niklas "går minus" med *minst en* kula i en spelomgång? Motivera.',
            figur: 'u17',
            steg: [
                {
                    del: 'I', rubrik: 'Beräkna sannolikheten för träff ur observationerna',
                    varfor: 'Vi känner inte träffchansen exakt, men Camilla har observerat många kast. ' +
                        'Andelen träffar av alla kast ger en bra skattning av sannolikheten för träff.',
                    text: '$$P(\\text{träff}) = \\dfrac{15}{150} = \\dfrac{1}{10} = 0{,}1$$\n\n' +
                        'Och då är $P(\\text{miss}) = 1 - 0{,}1 = 0{,}9$.',
                    delsvar: { del: 'I', text: '$P(\\text{träff}) = \\dfrac{15}{150} = \\dfrac{1}{10} = 0{,}1$' },
                },
                {
                    del: 'II', rubrik: 'Fyll i träddiagrammet',
                    varfor: 'I varje kast är sannolikheten för träff $0{,}1$ och för miss $0{,}9$ — samma ' +
                        'i alla tre kasten, eftersom kasten är oberoende. Träddiagrammet fortsätter bara ' +
                        'nedåt via "miss", för en spelomgång slutar så fort det blir träff.',
                    text: 'Varje gren märks: träff $= 0{,}1$, miss $= 0{,}9$, i vart och ett av de tre kasten.',
                    figur: 'u17-trad',
                    delsvar: { del: 'II', text: 'Varje kast: träff $0{,}1$, miss $0{,}9$ (se träddiagrammet).' },
                },
                {
                    del: 'III', rubrik: 'Räkna ut nettovinsten beroende på när träffen kommer',
                    varfor: 'En spelomgång slutar med en träff. Träffar Niklas på kast nummer $k$ har han ' +
                        'kastat (och förlorat) $k$ kulor, men vinner $4$ kulor från pyramiden. ' +
                        'Nettot blir $4 - k$. "Gå plus" betyder netto större än $0$.',
                    text: '$$\\text{netto} = 4 - k$$\n\n' +
                        '- Träff på kast $1$: netto $= 4 - 1 = +3$\n' +
                        '- Träff på kast $2$: netto $= 4 - 2 = +2$\n' +
                        '- Träff på kast $3$: netto $= 4 - 3 = +1$\n' +
                        '- Träff på kast $4$: netto $= 0$ (varken plus eller minus)\n\n' +
                        'Niklas kan alltså "gå plus" med $1$, $2$ eller $3$ kulor.',
                    delsvar: { del: 'III', text: 'Med $1$, $2$ eller $3$ kulor (träff på kast 3, 2 respektive 1).' },
                },
                {
                    del: 'IV', rubrik: 'Sannolikheten att gå plus med precis två kulor',
                    varfor: '"Gå plus med precis två kulor" betyder netto $+2$, vilket enligt föregående steg ' +
                        'sker om träffen kommer på *andra* kastet — alltså miss först, sedan träff.',
                    text: '$$P(\\text{miss, träff}) = 0{,}9 \\cdot 0{,}1 = 0{,}09$$',
                    delsvar: { del: 'IV', text: '$0{,}9 \\cdot 0{,}1 = 0{,}09$' },
                },
                {
                    del: 'V', rubrik: 'Sannolikheten att gå plus med minst en kula',
                    varfor: '"Gå plus med minst en kula" betyder netto $\\geq +1$, vilket sker om träffen ' +
                        'kommer på kast $1$, $2$ *eller* $3$. Dessa tre fall utesluter varandra, så vi ' +
                        'adderar deras sannolikheter.',
                    text: '- Träff på kast $1$: $0{,}1$\n' +
                        '- Träff på kast $2$: $0{,}9 \\cdot 0{,}1 = 0{,}09$\n' +
                        '- Träff på kast $3$: $0{,}9 \\cdot 0{,}9 \\cdot 0{,}1 = 0{,}081$\n\n' +
                        '$$P(\\text{plus med minst en}) = 0{,}1 + 0{,}09 + 0{,}081 = 0{,}271$$',
                    delsvar: { del: 'V', text: '$0{,}1 + 0{,}09 + 0{,}081 = 0{,}271$' },
                },
                {
                    del: 'VI', rubrik: 'Avgör när Niklas går minus',
                    varfor: 'Netto $= 4 - k$ blir *negativt* (går minus) när $k > 4$, alltså när träffen ' +
                        'kommer först på kast $5$ eller senare. Men för att spelomgången ska nå kast $5$ ' +
                        'måste de fyra första kasten *alla* vara missar.',
                    text: 'Att "gå minus med minst en kula" betyder alltså att de fyra första kasten är missar ' +
                        '(sedan spelar det ingen roll när träffen kommer — nettot är redan negativt).',
                },
                {
                    del: 'VI', rubrik: 'Beräkna sannolikheten',
                    varfor: 'De fyra missarna är oberoende, så sannolikheten är produkten av fyra $0{,}9$.',
                    text: '$$P(\\text{minst 4 missar först}) = 0{,}9^4 = 0{,}6561 \\approx 0{,}66$$\n\n' +
                        'Sannolikheten att Niklas går minus med minst en kula är alltså ungefär $0{,}66$.',
                    delsvar: { del: 'VI', text: '$0{,}9^4 = 0{,}6561 \\approx 0{,}66$ (de fyra första kasten måste missa).' },
                },
            ],
            svar: '**I.** $0{,}1$ **II.** träff $0{,}1$ / miss $0{,}9$ per kast **III.** $1$, $2$ eller $3$ kulor ' +
                '**IV.** $0{,}09$ **V.** $0{,}271$ **VI.** $0{,}9^4 = 0{,}6561 \\approx 0{,}66$',
            bedomning: [
                ['Anger någon sannolikhet, t.ex. sannolikheten för träff', '+E'],
                ['Fyller i sannolikheterna i träddiagrammet', '+E'],
                ['Anger samtliga möjligheter för hur många kulor man kan "gå plus" med', '+E'],
                ['Beräknar någon sannolikhet i flera steg, t.ex. $P(\\text{miss, träff})$ eller $P(\\text{miss, miss})$', '+C'],
                ['Beräknar sannolikheten att "gå plus" med precis två kulor, $P(\\text{miss, träff})$', '+C'],
                ['Beräknar sannolikheten att "gå plus" med minst en kula', '+C'],
                ['Visar möjliga utfall eller komplementhändelse för "gå plus" med minst en kula', '+C'],
                ['Beräknar sannolikheten att "gå minus" med minst en kula ($0{,}9^4$)', '+A'],
                ['Motiverar beräkningen för att "gå minus" med minst en kula', '+A'],
            ],
        },

        // ================= DELPROV D =================
        {
            nr: 18, del: 'D', poang: [2, 0, 0], omrade: 'Tid och rest',
            endastSvar: false,
            fraga: 'Antag att klockan är 9 på morgonen. Vad är då klockan $1\\,000$ timmar senare?',
            figur: null,
            steg: [
                {
                    rubrik: 'Räkna om timmarna till hela dygn plus rest',
                    varfor: 'Ett dygn är $24$ timmar. Klockan visar samma tid efter varje helt dygn, ' +
                        'så vi behöver bara veta hur många timmar som blir *över* efter så många hela ' +
                        'dygn som möjligt. Dela $1\\,000$ med $24$.',
                    text: '$$1\\,000 = 41 \\cdot 24 + 16$$\n\n' +
                        'Det blir $41$ hela dygn och $16$ timmar över ($41 \\cdot 24 = 984$, och ' +
                        '$1\\,000 - 984 = 16$).',
                },
                {
                    rubrik: 'Lägg på resten',
                    varfor: 'Efter $41$ hela dygn är klockan åter $9$ på morgonen. Sedan lägger vi på ' +
                        'de $16$ återstående timmarna.',
                    text: '$$09.00 + 16\\ \\text{timmar} = 01.00$$\n\n' +
                        'Klockan är alltså $01.00$ (ett på natten).',
                },
            ],
            svar: 'Klockan $01.00$',
            bedomning: [
                ['Påbörjad lösning, t.ex. beräknar hur många dygn det går på $1\\,000$ h', '+E'],
                ['Lösning med korrekt svar: $01.00$', '+E'],
            ],
        },

        {
            nr: 19, del: 'D', poang: [2, 1, 0], omrade: 'Formler — bromssträcka',
            endastSvar: false,
            fraga: 'För en bil med bra däck och bromsar kan den ungefärliga bromssträckan på torr asfalt ' +
                'beräknas med formeln\n\n$$s = \\dfrac{v^2}{200}$$\n\n' +
                'där $s$ är bromssträckan i meter och $v$ är hastigheten i km/h. ' +
                'Hur mycket längre blir bromssträckan enligt formeln om man kör i hastigheten $70$ km/h ' +
                'jämfört med om man kör i hastigheten $50$ km/h?',
            figur: null,
            steg: [
                {
                    rubrik: 'Beräkna bromssträckan vid 50 km/h',
                    varfor: 'Vi räknar ut de två bromssträckorna var för sig och jämför dem sedan. ' +
                        'Sätt in $v = 50$ i formeln.',
                    text: '$$s = \\dfrac{50^2}{200} = \\dfrac{2\\,500}{200} = 12{,}5\\ \\text{m}$$',
                },
                {
                    rubrik: 'Beräkna bromssträckan vid 70 km/h',
                    text: '$$s = \\dfrac{70^2}{200} = \\dfrac{4\\,900}{200} = 24{,}5\\ \\text{m}$$',
                },
                {
                    rubrik: 'Jämför sträckorna',
                    varfor: '"Hur mycket längre" betyder skillnaden mellan de två bromssträckorna.',
                    text: '$$24{,}5 - 12{,}5 = 12\\ \\text{m}$$\n\n' +
                        'Bromssträckan blir alltså $12$ m längre vid $70$ km/h än vid $50$ km/h.',
                },
            ],
            svar: '$12$ m längre',
            bedomning: [
                ['Använder formeln och beräknar någon bromssträcka', '+E'],
                ['Bestämmer bromssträckan för hastigheten $50$ km/h eller $70$ km/h', '+E'],
                ['Redovisning med korrekt svar: $12$ m', '+C'],
            ],
        },

        {
            nr: 20, del: 'D', poang: [2, 2, 0], omrade: 'Diagram — källkritik',
            endastSvar: false,
            fraga: 'Diagrammet visar antalet miljarder mejl som i genomsnitt skickas i världen varje dag ' +
                '(åren 2002, 2004, 2005, 2006, 2007 och 2010).\n\n' +
                '**a)** Av alla mejl som skickas uppskattas att cirka $82$ procent är spam (oönskade mejl). ' +
                'Ungefär hur många spam skickades under en dag år $2010$?\n\n' +
                '**b)** Diagrammet är missvisande. Vad är det som är missvisande i diagrammet?\n\n' +
                '**c)** Om man skulle rita diagrammet korrekt, hur skulle det påverka utseendet på diagrammet?',
            figur: 'u20',
            steg: [
                {
                    del: 'a', rubrik: 'Läs av antalet mejl år 2010',
                    varfor: 'Vi behöver totalantalet mejl $2010$ för att sedan ta $82\\ \\%$ av det. ' +
                        'Läs av kurvans värde vid $2010$.',
                    text: 'År $2010$ skickades ungefär $190$ miljarder mejl per dag.',
                    figur: 'u20-los-a',
                },
                {
                    del: 'a', rubrik: 'Ta 82 % av totalen',
                    varfor: 'Spam utgör $82\\ \\%$ av alla mejl. $82\\ \\%$ som förändringsfaktor är $0{,}82$.',
                    text: '$$0{,}82 \\cdot 190 \\approx 156\\ \\text{miljarder spam per dag}$$\n\n' +
                        '(Ett svar i intervallet $148$–$160$ miljarder godtas, eftersom avläsningen är ungefärlig.)',
                    delsvar: { del: 'a', text: 'Ungefär $156$ miljarder spam (ca $0{,}82 \\cdot 190$)' },
                },
                {
                    del: 'b', rubrik: 'Granska x-axeln',
                    varfor: 'I ett korrekt tidsdiagram ska lika stora tidsavstånd ta lika stort avstånd ' +
                        'längs axeln (skalan ska vara *ekvidistant*). Titta på vilka år som finns med.',
                    text: 'Åren på $x$-axeln är $2002,\\ 2004,\\ 2005,\\ 2006,\\ 2007,\\ 2010$ — men de är ' +
                        'utritade med *lika stort* avstånd mellan varje, trots att tidsavstånden är olika ' +
                        '(t.ex. $3$ år mellan $2007$ och $2010$, men bara $1$ år mellan $2006$ och $2007$).',
                    delsvar: { del: 'b', text: 'Avstånden mellan årtalen på $x$-axeln är inte lika stora — skalan är inte ekvidistant.' },
                },
                {
                    del: 'c', rubrik: 'Beskriv hur ett korrekt diagram skulle se ut',
                    varfor: 'Om åren placeras på rätt avstånd (ekvidistant) skulle särskilt det sista ' +
                        'hoppet (från $2007$ till $2010$) dras ut över tre gånger så stort avstånd. ' +
                        'Då blir kurvan där mindre brant.',
                    text: 'Kurvan skulle inte bli lika brant, eftersom $x$-axeln förlängs där år saknas ' +
                        '(mellan $2007$ och $2010$ saknas $2008$ och $2009$). Ökningen skulle då se ' +
                        'långsammare ut än den gör i det missvisande diagrammet.',
                    delsvar: { del: 'c', text: 'Kurvan skulle bli mindre brant där år saknas (t.ex. mellan $2007$ och $2010$), eftersom $x$-axeln förlängs.' },
                },
            ],
            svar: '**a)** ca $156$ miljarder spam **b)** avstånden mellan årtalen på $x$-axeln är inte lika ' +
                'stora (skalan ej ekvidistant) **c)** kurvan skulle bli mindre brant där år saknas',
            bedomning: [
                ['a) Godtagbar avläsning (intervallet $180$–$195$ miljarder)', '+E'],
                ['a) Redovisning med godtagbart svar ($148$–$160$ miljarder)', '+E'],
                ['b) Knapphändig beskrivning som antyder problemet, t.ex. "År 2003 är inte med"', '+E'],
                ['b) Beskrivning som anger att skalan inte är ekvidistant', '+C'],
                ['c) Beskrivning som antyder ett korrekt diagrams utseende', '+E'],
                ['c) Beskrivning som tydligt anger hur ett korrekt diagram påverkas', '+C'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [2, 2, 0], omrade: 'Trigonometri — takvinkel',
            endastSvar: false,
            fraga: 'Förr i tiden angavs lutningen på ett tak som ett förhållande mellan två sträckor. ' +
                '"Förhållandet 1 till 3" (1:3) betyder att takstolen är $1$ hög och $3$ bred (hela bredden). ' +
                'Nu anges takets lutning i stället med takvinkeln $v$ — vinkeln mellan taket och ' +
                'horisontalplanet.\n\n' +
                '**a)** Hur stor är takvinkeln som motsvaras av förhållandet 1 till 3?\n\n' +
                '**b)** Blir takvinkeln dubbelt så stor om förhållandet 1 till 3 ändras till förhållandet ' +
                '1 till 1,5? Motivera.',
            figur: 'u21',
            steg: [
                {
                    del: 'a', rubrik: 'Se hur takvinkeln bildas',
                    varfor: 'Taket är symmetriskt med nocken i mitten. Höjden $1$ når nocken, och den ' +
                        'totala bredden är $3$. Takvinkeln $v$ mäts vid takfoten, där den ena halvan av ' +
                        'taket möter horisontalplanet. Den halvan spänner över *halva* bredden, alltså ' +
                        '$\\frac{3}{2} = 1{,}5$, med höjden $1$.',
                    text: 'I den rätvinkliga triangeln för ena takhalvan är höjden $1$ motstående katet ' +
                        'till $v$, och halva bredden $1{,}5$ är närliggande katet. Då passar tangens.',
                    figur: 'u21-los',
                },
                {
                    del: 'a', rubrik: 'Beräkna vinkeln med tangens',
                    varfor: '$\\tan v = \\dfrac{\\text{motstående}}{\\text{närliggande}} = \\dfrac{1}{1{,}5}$. ' +
                        'Sedan slår vi upp vilken vinkel som har den tangensen (digitala verktyg tillåtna).',
                    text: '$$\\tan v = \\dfrac{1}{1{,}5} = \\dfrac{2}{3} \\approx 0{,}67 \\quad \\Longrightarrow ' +
                        '\\quad v \\approx 34\\degree$$',
                    delsvar: { del: 'a', text: 'Takvinkeln är ungefär $34\\degree$' },
                },
                {
                    del: 'b', rubrik: 'Beräkna vinkeln för förhållandet 1 till 1,5',
                    varfor: 'Samma resonemang: hela bredden är nu $1{,}5$, så halva bredden är $0{,}75$, ' +
                        'och höjden är fortfarande $1$.',
                    text: '$$\\tan v = \\dfrac{1}{0{,}75} = \\dfrac{4}{3} \\approx 1{,}33 \\quad \\Longrightarrow ' +
                        '\\quad v \\approx 53\\degree$$',
                },
                {
                    del: 'b', rubrik: 'Jämför med det dubbla',
                    varfor: 'Dubbla den första vinkeln och jämför. Om takvinkeln vore dubbelt så stor skulle ' +
                        'den bli $2 \\cdot 34\\degree = 68\\degree$.',
                    text: 'Den nya vinkeln är $53\\degree$, men dubbla den gamla är $2 \\cdot 34\\degree = 68\\degree$. ' +
                        'Eftersom $53\\degree \\neq 68\\degree$ blir takvinkeln **inte** dubbelt så stor. ' +
                        '(Sambandet mellan förhållande och vinkel är inte proportionellt.)',
                    delsvar: { del: 'b', text: 'Nej. Vinkeln blir $\\approx 53\\degree$, inte $2 \\cdot 34\\degree = 68\\degree$.' },
                },
            ],
            svar: '**a)** $v \\approx 34\\degree$ **b)** Nej — förhållandet 1:1,5 ger $v \\approx 53\\degree$, ' +
                'vilket inte är dubbelt så mycket som $34\\degree$.',
            bedomning: [
                ['a) Påbörjad lösning, ställer upp godtagbart trigonometriskt samband', '+E'],
                ['a) Redovisning med korrekt svar: $v \\approx 34\\degree$', '+E'],
                ['b) Beräknar vinkeln för förhållandet 1:1,5 ($\\approx 53\\degree$)', '+C'],
                ['b) Slutsats med godtagbar motivering (nej)', '+C'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [0, 2, 0], omrade: 'Procent — baklängesräkning',
            endastSvar: false,
            fraga: 'År $2014$ var elpriset $27$ öre per kWh. Det var $40\\ \\%$ lägre än året innan. ' +
                'Hur mycket kostade $1$ kWh år $2013$?',
            figur: null,
            steg: [
                {
                    rubrik: 'Uttryck 2014 års pris med 2013 års pris',
                    varfor: 'Priset $2014$ är $40\\ \\%$ *lägre* än $2013$. "$40\\ \\%$ lägre" betyder att ' +
                        'bara $60\\ \\%$ återstår, alltså förändringsfaktorn $0{,}6$. Kalla $2013$ års pris $x$.',
                    text: '$$0{,}6 \\cdot x = 27$$',
                },
                {
                    rubrik: 'Lös ut priset år 2013',
                    varfor: 'Vi söker det ursprungliga priset $x$. Dela $27$ med förändringsfaktorn $0{,}6$.',
                    text: '$$x = \\dfrac{27}{0{,}6} = 45\\ \\text{öre}$$\n\n' +
                        '**Kontroll:** $45 \\cdot 0{,}6 = 27$ ✓ (en minskning med $40\\ \\%$ från $45$ ger $27$).',
                },
            ],
            svar: '$45$ öre per kWh',
            bedomning: [
                ['Påbörjad lösning, t.ex. visar att förändringsfaktorn är $0{,}6$ eller att minskningen ' +
                    'ska baseras på priset år $2013$', '+C'],
                ['Lösning med godtagbart svar: $45$ öre', '+C'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [0, 2, 0], omrade: 'Procent — genomsnittlig årlig förändring',
            endastSvar: false,
            fraga: 'År $1750$ var världens befolkning $750$ miljoner. År $1870$ var världens befolkning ' +
                'dubbelt så stor. Med hur många procent ökade befolkningen i genomsnitt per år?',
            figur: null,
            steg: [
                {
                    rubrik: 'Teckna den totala förändringen som en potens',
                    varfor: 'Befolkningen fördubblades ($\\times 2$) under $1870 - 1750 = 120$ år, ' +
                        'med samma procentuella ökning varje år. Med den årliga förändringsfaktorn $a$ ' +
                        'multipliceras befolkningen med $a$ hela $120$ gånger.',
                    text: '$$a^{120} = 2$$',
                },
                {
                    rubrik: 'Lös ut den årliga förändringsfaktorn',
                    varfor: 'För att få $a$ drar vi $120$:e roten ur båda leden, det vill säga upphöjer ' +
                        'till $\\frac{1}{120}$ (digitala verktyg tillåtna).',
                    text: '$$a = 2^{1/120} \\approx 1{,}0058$$',
                },
                {
                    rubrik: 'Tolka som procentuell ökning',
                    text: 'Förändringsfaktorn $1{,}0058$ svarar mot en ökning på\n\n' +
                        '$$1{,}0058 - 1 = 0{,}0058 = 0{,}58\\ \\% \\approx 0{,}6\\ \\%$$\n\nper år.',
                },
            ],
            svar: 'Ungefär $0{,}6\\ \\%$ per år (mer exakt $0{,}58\\ \\%$)',
            bedomning: [
                ['Påbörjad lösning, tecknar en ekvation eller ett rotuttryck ($a^{120} = 2$)', '+C'],
                ['Lösning med godtagbart svar ($0{,}58$–$0{,}6\\ \\%$)', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [1, 1, 1], omrade: 'Linjära modeller — funktion',
            endastSvar: false,
            fraga: 'Kalles klass ska samla in pengar till klasskassan och vill ordna ett skoldisco. ' +
                'De har hittat en lokal att hyra som kostar $500$ kr och en DJ med musikanläggning som ' +
                'kostar $1\\,500$ kr. De tänker sälja biljetter för $50$ kr/st.\n\n' +
                '**a)** Hur stor vinst gör klassen om de lyckas sälja $100$ biljetter?\n\n' +
                '**b)** Ange en funktion $V(x)$ som visar klassens vinst/förlust efter $x$ antal sålda biljetter.\n\n' +
                '**c)** På discot kommer maximalt $200$ betalande gäster. Bestäm funktionens värdemängd.',
            figur: null,
            steg: [
                {
                    del: 'a', rubrik: 'Räkna ut intäkt och kostnad',
                    varfor: 'Vinst = intäkter − kostnader. Intäkten är antalet biljetter gånger priset; ' +
                        'de fasta kostnaderna är lokal ($500$) plus DJ ($1\\,500$), alltså $2\\,000$ kr.',
                    text: 'Intäkt: $100 \\cdot 50 = 5\\,000$ kr. Kostnad: $500 + 1\\,500 = 2\\,000$ kr.\n\n' +
                        '$$\\text{vinst} = 5\\,000 - 2\\,000 = 3\\,000\\ \\text{kr}$$',
                    delsvar: { del: 'a', text: 'Vinsten är $3\\,000$ kr' },
                },
                {
                    del: 'b', rubrik: 'Skriv vinsten som en funktion av antalet biljetter',
                    varfor: 'Varje såld biljett ger $50$ kr, och de fasta kostnaderna $2\\,000$ kr dras av ' +
                        'oavsett antal. Det ger ett linjärt samband i $x$ (antal biljetter).',
                    text: '$$V(x) = 50x - 2\\,000$$\n\n' +
                        '**Kontroll:** $V(100) = 50 \\cdot 100 - 2\\,000 = 3\\,000$ ✓',
                    delsvar: { del: 'b', text: '$V(x) = 50x - 2\\,000$' },
                },
                {
                    del: 'c', rubrik: 'Räkna ut vinsten vid ändpunkterna',
                    varfor: 'Värdemängden är alla vinstvärden $V$ kan anta. Antalet biljetter $x$ går från ' +
                        '$0$ till högst $200$ (max antal gäster). Eftersom $V$ växer med $x$ nås ' +
                        'minsta och största vinst vid $x = 0$ respektive $x = 200$.',
                    text: '$$V(0) = 50 \\cdot 0 - 2\\,000 = -2\\,000 \\quad (\\text{ren förlust})$$\n' +
                        '$$V(200) = 50 \\cdot 200 - 2\\,000 = 10\\,000 - 2\\,000 = 8\\,000$$',
                },
                {
                    del: 'c', rubrik: 'Ange värdemängden',
                    text: 'Vinsten kan alltså ligga mellan $-2\\,000$ kr och $8\\,000$ kr:\n\n' +
                        '$$-2\\,000 \\leq V(x) \\leq 8\\,000$$',
                    delsvar: { del: 'c', text: '$-2\\,000 \\leq V(x) \\leq 8\\,000$' },
                },
            ],
            svar: '**a)** $3\\,000$ kr **b)** $V(x) = 50x - 2\\,000$ **c)** $-2\\,000 \\leq V(x) \\leq 8\\,000$',
            bedomning: [
                ['a) Korrekt beräknad vinst: $3\\,000$ kr', '+E'],
                ['b) Godtagbart tecknat uttryck: $50x - 2\\,000$', '+E'],
                ['b) Godtagbart tecknad funktion: $V(x) = 50x - 2\\,000$', '+C'],
                ['c) Anger en gräns för värdemängden', '+E'],
                ['c) Anger övre och undre gräns med korrekta symboler: $-2\\,000 \\leq V(x) \\leq 8\\,000$', '+A'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [0, 2, 1], omrade: 'Exponentiell förändring — ränta',
            endastSvar: false,
            fraga: 'Frida tar ett sms-lån på $1\\,000$ kr. Lånet ska betalas tillbaka efter en månad och ' +
                'den procentuella månadsräntan är $20\\ \\%$. När månaden är slut har Frida inte råd att ' +
                'betala sin skuld. För att betala skulden tar hon ett nytt sms-lån på hela det belopp hon ' +
                'är skyldig. Det nya lånet har samma procentuella månadsränta. Frida fortsätter att låna ' +
                'på samma sätt varje månad. Hur stor är Fridas skuld ett år efter att hon har tagit sitt ' +
                'första sms-lån?',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm den månatliga förändringsfaktorn',
                    varfor: 'Varje månad växer skulden med $20\\ \\%$ ränta. "$20\\ \\%$ ökning" ger ' +
                        'förändringsfaktorn $1{,}20$. Eftersom Frida lånar om hela skulden varje månad ' +
                        'räknas räntan på hela det växande beloppet — en exponentiell tillväxt.',
                    text: 'Skulden multipliceras med $1{,}20$ varje månad.',
                },
                {
                    rubrik: 'Teckna skulden efter 12 månader',
                    varfor: 'Ett år är $12$ månader, så skulden multipliceras med $1{,}20$ tolv gånger ' +
                        'räknat från startbeloppet $1\\,000$ kr.',
                    text: '$$\\text{skuld} = 1\\,000 \\cdot 1{,}20^{12}$$',
                },
                {
                    rubrik: 'Räkna ut beloppet',
                    varfor: 'Beräkna potensen med digitala verktyg och avrunda till hela kronor.',
                    text: '$$1\\,000 \\cdot 1{,}20^{12} \\approx 1\\,000 \\cdot 8{,}916 = 8\\,916\\ \\text{kr}$$\n\n' +
                        'Fridas skuld har alltså nästan nio-dubblats på ett år — ett tydligt exempel på hur ' +
                        'snabbt en hög ränta växer.',
                },
            ],
            svar: 'Ungefär $8\\,916$ kr',
            bedomning: [
                ['Påbörjad lösning som visar upprepad procentuell ökning, t.ex. skulden efter minst två månader', '+C'],
                ['Lösning med godtagbart svar', '+C'],
                ['med en effektiv lösningsmetod, t.ex. $1\\,000 \\cdot 1{,}2^{12}$', '+A'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 2, 2], omrade: 'Geometri — area och bevis',
            endastSvar: false,
            fraga: 'Figuren visar två cirklar som skär varandra. Visa att den stora cirkeln har dubbelt så ' +
                'stor area som den lilla cirkeln. $M$ är mittpunkten i den stora cirkeln och $m$ är ' +
                'mittpunkten i den lilla cirkeln. Den stora cirkelns mittpunkt $M$ ligger på den lilla ' +
                'cirkelns rand, och i figuren finns en rätvinklig triangel $m\\text{–}M\\text{–}P$ med rät ' +
                'vinkel vid $m$, där $P$ är en av cirklarnas skärningspunkter.',
            figur: 'u26',
            steg: [
                {
                    rubrik: 'Namnge radierna och läs av triangeln',
                    varfor: 'Kalla lilla cirkelns radie $r$ och stora cirkelns radie $R$. Nyckeln är den ' +
                        'rätvinkliga triangeln $m\\text{–}M\\text{–}P$: den knyter ihop $r$ och $R$.',
                    text: 'Triangelns sidor:\n\n' +
                        '- $mM = r$ — sträckan från lilla cirkelns mitt $m$ till $M$. Eftersom $M$ ligger ' +
                        'på lilla cirkelns rand är detta avstånd lika med lilla radien $r$.\n' +
                        '- $mP = r$ — $P$ ligger också på lilla cirkeln, så avståndet från $m$ till $P$ är $r$.\n' +
                        '- $MP = R$ — $P$ ligger på stora cirkeln (centrum $M$), så detta avstånd är stora radien $R$.',
                    figur: 'u26-los',
                },
                {
                    rubrik: 'Använd Pythagoras sats',
                    varfor: 'Triangeln är rätvinklig vid $m$, med kateterna $mM = r$ och $mP = r$ och ' +
                        'hypotenusan $MP = R$. Pythagoras sats kopplar ihop dem.',
                    text: '$$R^2 = (mM)^2 + (mP)^2 = r^2 + r^2 = 2r^2$$',
                },
                {
                    rubrik: 'Jämför areorna',
                    varfor: 'En cirkels area är $\\pi \\cdot (\\text{radie})^2$. Sätt in $R^2 = 2r^2$ i ' +
                        'stora cirkelns area och jämför med lilla cirkelns.',
                    text: '$$A_{\\text{stor}} = \\pi R^2 = \\pi \\cdot 2r^2 = 2 \\cdot \\pi r^2 = 2 \\cdot A_{\\text{liten}}$$\n\n' +
                        'Den stora cirkelns area är alltså exakt dubbelt så stor som den lilla cirkelns — ' +
                        'och eftersom vi bara använde $r$ (aldrig ett talvärde) gäller det alltid. ' +
                        'V.S.B.',
                },
            ],
            svar: 'Med lilla radien $r$ och stora radien $R$ ger den rätvinkliga triangeln (kateterna ' +
                '$mM = mP = r$, hypotenusan $MP = R$) att $R^2 = 2r^2$. Då är $A_{\\text{stor}} = \\pi R^2 = ' +
                '2\\pi r^2 = 2 A_{\\text{liten}}$.',
            bedomning: [
                ['Påbörjad lösning, t.ex. visar sambandet mellan radierna med ett exempel eller algebraiskt', '+C'],
                ['Påbörjar en generell formulering av stora cirkelns area utifrån lilla radien, eller visar ' +
                    'för något värde att stora arean är dubbelt så stor', '+C'],
                ['Tecknar ett generellt uttryck för stora cirkelns area utifrån lilla radien ($R^2 = 2r^2$)', '+A'],
                ['Visar sambandet mellan areorna generellt', '+A'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 1, 2], omrade: 'Vektorer — associativa lagen',
            endastSvar: false,
            fraga: 'Vid addition av tal gäller den associativa lagen, dvs. $(a + b) + c = a + (b + c)$. ' +
                'Till exempel är $(3 + 2) + 5 = 5 + 5 = 10$ och $3 + (2 + 5) = 3 + 7 = 10$. ' +
                'Den associativa lagen gäller även för addition av vektorer. Visa med ett exempel att ' +
                'detta gäller även för vektorerna $\\vec{u}$, $\\vec{v}$ och $\\vec{w}$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Välj tre vektorer',
                    varfor: 'Vi ska visa likheten med ett *exempel*, så vi väljer själva tre konkreta ' +
                        'vektorer i koordinatform. Vilka spelar ingen roll — de får gärna vara enkla.',
                    text: 'Låt\n\n$$\\vec{u} = (1,\\ 2) \\qquad \\vec{v} = (3,\\ 1) \\qquad \\vec{w} = (2,\\ 4)$$',
                },
                {
                    rubrik: 'Räkna ut vänsterledet (u + v) + w',
                    varfor: 'Vektorer adderas koordinatvis. Beräkna först parentesen $\\vec{u} + \\vec{v}$, ' +
                        'addera sedan $\\vec{w}$.',
                    text: '$$\\vec{u} + \\vec{v} = (1 + 3,\\ 2 + 1) = (4,\\ 3)$$\n\n' +
                        '$$(\\vec{u} + \\vec{v}) + \\vec{w} = (4 + 2,\\ 3 + 4) = (6,\\ 7)$$',
                },
                {
                    rubrik: 'Räkna ut högerledet u + (v + w)',
                    varfor: 'Nu grupperar vi om: beräkna först $\\vec{v} + \\vec{w}$ och addera sedan $\\vec{u}$. ' +
                        'Om associativa lagen gäller ska vi få samma vektor som i vänsterledet.',
                    text: '$$\\vec{v} + \\vec{w} = (3 + 2,\\ 1 + 4) = (5,\\ 5)$$\n\n' +
                        '$$\\vec{u} + (\\vec{v} + \\vec{w}) = (1 + 5,\\ 2 + 5) = (6,\\ 7)$$',
                },
                {
                    rubrik: 'Jämför leden',
                    text: 'Båda leden gav $(6,\\ 7)$:\n\n' +
                        '$$(\\vec{u} + \\vec{v}) + \\vec{w} = (6,\\ 7) = \\vec{u} + (\\vec{v} + \\vec{w})$$\n\n' +
                        'Exemplet visar att den associativa lagen gäller för vektoraddition.',
                },
            ],
            svar: 'Med t.ex. $\\vec{u} = (1,2)$, $\\vec{v} = (3,1)$, $\\vec{w} = (2,4)$: ' +
                '$(\\vec{u} + \\vec{v}) + \\vec{w} = (6,7)$ och $\\vec{u} + (\\vec{v} + \\vec{w}) = (6,7)$ — lika.',
            bedomning: [
                ['Påbörjad lösning, t.ex. anger tre vektorer och adderar två av dessa', '+C'],
                ['Korrekt visad likhet', '+A'],
                ['Tydlig redovisning', '+A'],
            ],
        },

        {
            nr: 28, del: 'D', poang: [0, 0, 2], omrade: 'Index',
            endastSvar: false,
            fraga: 'Diagrammet visar prisutvecklingen för ett kilogram kaffe i Sverige (åren 1921–2011). ' +
                'Enligt en indexserie var index för kaffepriset $330$ år $2011$. Vilket år var indexseriens basår?',
            figur: 'u28',
            steg: [
                {
                    rubrik: 'Vad betyder index 330?',
                    varfor: 'Ett index utgår från ett *basår* som sätts till index $100$. Index $330$ år ' +
                        '$2011$ betyder att priset då var $\\dfrac{330}{100} = 3{,}3$ gånger så högt som ' +
                        'under basåret.',
                    text: '$$\\text{pris}_{2011} = 3{,}3 \\cdot \\text{pris}_{\\text{basår}}$$',
                },
                {
                    rubrik: 'Läs av 2011 års pris och räkna ut basårets pris',
                    varfor: 'Ur diagrammet läser vi av priset $2011$. Basårets pris är då detta delat med ' +
                        '$3{,}3$.',
                    text: 'År $2011$ var kaffepriset ungefär $79$ kr/kg (diagrammets sista topp). Basårets pris:\n\n' +
                        '$$\\dfrac{79}{3{,}3} \\approx 24\\ \\text{kr/kg}$$',
                    figur: 'u28-los',
                },
                {
                    rubrik: 'Hitta året med det priset',
                    varfor: 'Nu letar vi upp i diagrammet vilket år kaffepriset var ungefär $24$ kr/kg.',
                    text: 'Priset var ungefär $24$ kr/kg omkring år $1976$. Det är alltså indexseriens basår.\n\n' +
                        '(Ett svar i intervallet $1975$–$1977$ godtas, eftersom avläsningarna är ungefärliga.)',
                },
            ],
            svar: 'Ungefär år $1976$ (i intervallet $1975$–$1977$)',
            bedomning: [
                ['Påbörjad lösning, t.ex. beräknar basårets kaffepris', '+A'],
                ['Lösning med godtagbart svar ($1975$–$1977$)', '+A'],
            ],
        },
    ],
};
