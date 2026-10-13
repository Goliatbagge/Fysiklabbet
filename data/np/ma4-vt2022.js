// Fysiklabbet: Nationellt prov Matematik 4, våren 2022.
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Kursen Matematik 4 motsvarar dagens "Matematik fortsättning nivå 2".
// Källa: Skolverket/Umeå universitet. Provet är frisläppt och återanvänds
// inte.

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['ma4-vt2022'] = {
    id: 'ma4-vt2022',
    kurs: 'Matematik fortsättning nivå 2',
    termin: 'VT 2022',
    namn: 'Nationellt prov Ma 4, våren 2022',
    kort: 'NP Ma 4 VT 2022',
    intro: 'Det här är det riktiga nationella provet i Matematik 4 (dagens Matematik ' +
        'fortsättning nivå 2) från våren 2022. Provet är frisläppt och återanvänds inte. ' +
        'Välj en uppgift, lös den själv, och klicka sedan fram lösningen ett steg i taget. ' +
        'Varje steg förklarar både vad som görs och varför, och figurerna byggs upp i takt ' +
        'med lösningen.',
    kravgranser: 'Provet (delprov B–D) ger totalt 60 poäng varav 22 E-, 22 C- och 16 A-poäng. ' +
        'Poängen skrivs (E/C/A), till exempel betyder (3/2/1) att uppgiften kan ge 3 E-, 2 C- och ' +
        '1 A-poäng. Gräns för provbetyget: E minst 15 poäng · D minst 24 poäng varav 7 på ' +
        'minst C-nivå · C minst 31 poäng varav 13 på minst C-nivå · B minst 40 poäng varav ' +
        '5 på A-nivå · A minst 47 poäng varav 9 på A-nivå.',
    delprov: {
        B: {
            tid: '150 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal, inga digitala verktyg',
            hjalpmedelKort: 'Utan digitala verktyg',
            beskrivning: 'Uppgift 1–10. Endast svar krävs.',
        },
        C: {
            tid: '150 minuter för delprov B och C tillsammans',
            hjalpmedel: 'Formelblad och linjal, inga digitala verktyg',
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

// Fysiklabbet: Nationellt prov Matematik 4, våren 2022, DELPROV B
// (uppgift 1–10, endast svar krävs). Pushas in i provhuvudet i
// data/np/ma4-vt2022.js under utvecklingen. Format och regler: se
// data/np/RIKTLINJER.md. Figurerna genereras av
// .claude/np-figs/gen-ma4-vt2022-B.js, pennlösningarna ligger i
// data/np/ma4-vt2022-delB-penna.js.
(function () {
    var P = window.NP_PROV && window.NP_PROV['ma4-vt2022'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV B =================
        {
            nr: 1, del: 'B', poang: [3, 0, 0], omrade: 'Derivata: kedjeregeln och produktregeln',
            genomgangar: ['ma4-2.3', 'ma4-2.7', 'ma4-2.5'],
            endastSvar: true,
            fraga: 'Derivera<br>' +
                '**a)**&nbsp;$f(x) = \\sin 5x$&emsp;&emsp;' +
                '**b)**&nbsp;$g(x) = (5x + 2)^{10}$&emsp;&emsp;' +
                '**c)**&nbsp;$h(x) = x^7 \\cdot e^x$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Derivera med kedjeregeln',
                    varfor: 'Funktionen är sammansatt: den yttre funktionen är sinus och den inre ' +
                        'funktionen är $5x$. Kedjeregeln säger att derivatan är den yttre derivatan ' +
                        '(cosinus av samma inre funktion) gånger den inre derivatan, och derivatan ' +
                        'av $5x$ är $5$.',
                    text: '$$f\'(x) = \\cos 5x \\cdot 5 = 5\\cos 5x$$',
                    delsvar: { del: 'a', text: '$f\'(x) = 5\\cos 5x$' },
                },
                {
                    del: 'b',
                    rubrik: 'Derivera den yttre potensen och multiplicera med den inre derivatan',
                    varfor: 'Även här är funktionen sammansatt. Den yttre funktionen är en tiondepotens ' +
                        'och den inre är $5x + 2$. Potensregeln ger den yttre derivatan ' +
                        '$10(5x + 2)^9$, och den inre derivatan är $5$.',
                    text: '$$g\'(x) = 10(5x + 2)^9 \\cdot 5$$',
                },
                {
                    del: 'b',
                    rubrik: 'Multiplicera ihop talen',
                    varfor: 'Faktorerna $10$ och $5$ kan multipliceras ihop till en enda faktor framför ' +
                        'potensen.',
                    text: '$$g\'(x) = 50(5x + 2)^9$$',
                    delsvar: { del: 'b', text: '$g\'(x) = 50(5x + 2)^9$' },
                },
                {
                    del: 'c',
                    rubrik: 'Använd produktregeln',
                    varfor: 'Funktionen är en produkt av $x^7$ och $e^x$. Produktregeln: ' +
                        'derivatan av den första faktorn gånger den andra, plus den första faktorn ' +
                        'gånger derivatan av den andra. Derivatan av $x^7$ är $7x^6$, och ' +
                        '$e^x$ är sin egen derivata.',
                    text: '$$h\'(x) = 7x^6 \\cdot e^x + x^7 \\cdot e^x$$\n\n' +
                        'Svaret kan också skrivas $x^6e^x(7 + x)$ om $x^6e^x$ ' +
                        'bryts ut.',
                    delsvar: { del: 'c', text: '$h\'(x) = 7x^6 \\cdot e^x + x^7 \\cdot e^x$' },
                },
            ],
            svar: 'a) $f\'(x) = 5\\cos 5x$&emsp;&emsp;b) $g\'(x) = 50(5x + 2)^9$&emsp;&emsp;' +
                'c) $h\'(x) = 7x^6 \\cdot e^x + x^7 \\cdot e^x$',
            bedomning: [
                ['a) Korrekt svar ($f\'(x) = 5\\cos 5x$)', '+E'],
                ['b) Korrekt svar ($g\'(x) = 50(5x + 2)^9$). Även svaret $g\'(x) = 10(5x + 2)^9 \\cdot 5$ godtas.', '+E'],
                ['c) Korrekt svar ($h\'(x) = 7x^6 \\cdot e^x + x^7 \\cdot e^x$)', '+E'],
            ],
        },

        {
            nr: 2, del: 'B', poang: [2, 0, 0], omrade: 'Trigonometriska funktioner: period och största och minsta värde',
            genomgangar: ['ma4-1.11', 'ma4-1.12'],
            endastSvar: true,
            fraga: 'Funktionen $f$ ges av $f(x) = 2 + 5\\cos 4x$.<br>' +
                '**a)** Ange funktionens period.<br>' +
                '**b)** Ange funktionens minsta värde.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Använd formeln för perioden',
                    varfor: 'För en funktion av typen $y = A\\cos Bx$ (eller $A\\sin Bx$) är perioden ' +
                        '$\\dfrac{2\\pi}{B}$ i radianer, eftersom $Bx$ måste öka med ett helt varv, ' +
                        '$2\\pi$, innan kurvan upprepar sig. Här är $B = 4$. Talet $2$ flyttar kurvan ' +
                        'uppåt och faktorn $5$ sträcker den i $y$-led, men ingen av dem ändrar perioden.',
                    text: '$$\\text{perioden} = \\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}$$\n\n' +
                        'I grader blir det $\\dfrac{360^\\circ}{4} = 90^\\circ$.',
                    delsvar: { del: 'a', text: 'Perioden är $\\dfrac{\\pi}{2}$ (eller $90^\\circ$).' },
                },
                {
                    del: 'b',
                    rubrik: 'Låt cosinus anta sitt minsta värde',
                    varfor: '$\\cos 4x$ varierar mellan $-1$ och $1$, vilket $x$ vi än väljer. ' +
                        'Uttrycket $2 + 5\\cos 4x$ blir alltså minst när $\\cos 4x = -1$. Med andra ' +
                        'ord: kurvan svänger med amplituden $5$ kring linjen $y = 2$, och dess lägsta ' +
                        'punkt ligger $5$ under den linjen.',
                    text: '$$f_\\text{min} = 2 + 5 \\cdot (-1) = 2 - 5 = -3$$',
                    delsvar: { del: 'b', text: 'Minsta värdet är $-3$.' },
                },
            ],
            svar: 'a) $\\dfrac{\\pi}{2}$ (eller $90^\\circ$)&emsp;&emsp;b) $-3$',
            bedomning: [
                ['a) Korrekt svar ($90^\\circ$; $\\dfrac{\\pi}{2}$)', '+E'],
                ['b) Korrekt svar ($-3$)', '+E'],
            ],
        },

        {
            nr: 3, del: 'B', poang: [2, 0, 0], omrade: 'Sinusfunktionen: radianer, amplitud och period',
            genomgangar: ['ma4-1.10', 'ma4-1.11', 'ma4-1.5'],
            endastSvar: true,
            fraga: 'Figuren visar kurvan $y = \\sin x$ och en punkt $P$. ' +
                'Punkten $P$ ligger på kurvan och har $y$-koordinaten $0$.<br>' +
                '**a)** Ange $x$-koordinaten för punkten $P$. Svara i radianer.<br>' +
                '**b)** Skissa kurvan $y = \\sin \\dfrac{x}{2}$ i koordinatsystemet. Till din hjälp ' +
                'är kurvan $y = \\sin x$ inritad.',
            figur: 'u3',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Bestäm hur bred en ruta är',
                    varfor: 'Rutnätet har inga tal utsatta, så skalan måste läsas ur kurvan. ' +
                        '$\\sin x$ har sin första topp i $x = \\dfrac{\\pi}{2}$, och den toppen ligger ' +
                        'precis på första rutlinjen. Varje ruta är alltså $\\dfrac{\\pi}{2}$ bred, och ' +
                        'kurvan skär $x$-axeln vid varannan rutlinje: $x = \\pi,\\ 2\\pi,\\ 3\\pi$ och ' +
                        'så vidare.',
                    text: 'En ruta i $x$-led är $\\dfrac{\\pi}{2}$. Nollställena $\\pi,\\ 2\\pi,\\ \\ldots,\\ 6\\pi$ ' +
                        'markeras i figuren.',
                    figur: 'u3-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Räkna rutorna fram till P',
                    varfor: '$P$ ligger på den tolfte rutlinjen till höger om origo. Kontroll: kurvan ' +
                        'går uppåt genom $x$-axeln i $P$, och det gör den efter varje hel period ' +
                        '$2\\pi$. Från origo till $P$ ryms tre hela perioder, och $3 \\cdot 2\\pi = 6\\pi$.',
                    text: '$$x = 12 \\cdot \\dfrac{\\pi}{2} = 6\\pi$$',
                    delsvar: { del: 'a', text: '$x = 6\\pi$' },
                },
                {
                    del: 'b',
                    rubrik: 'Bestäm amplitud och period',
                    varfor: 'Kurvan har formen $y = A\\sin Bx$ med $A = 1$ och $B = \\dfrac{1}{2}$. ' +
                        'Amplituden är alltså fortfarande $1$, men perioden blir $\\dfrac{2\\pi}{B}$.',
                    text: '$$\\text{perioden} = \\dfrac{2\\pi}{\\frac{1}{2}} = 2\\pi \\cdot 2 = 4\\pi$$\n\n' +
                        'Perioden är dubbelt så lång som för $\\sin x$: kurvan dras ut till dubbla ' +
                        'bredden i $x$-led.',
                },
                {
                    del: 'b',
                    rubrik: 'Rita kurvan genom topparna, dalarna och nollställena',
                    varfor: '$\\sin \\dfrac{x}{2}$ når sin topp när $\\dfrac{x}{2} = \\dfrac{\\pi}{2}$, ' +
                        'alltså i $x = \\pi$. Där har $\\sin x$ redan hunnit tillbaka till noll. ' +
                        'Därefter kommer nollstället $x = 2\\pi$, dalen $x = 3\\pi$ och nästa ' +
                        'nollställe $x = 4\\pi$, där en hel period är slut.',
                    text: 'Toppar i $x = \\pi$ och $x = 5\\pi$, dal i $x = 3\\pi$ och nollställen i ' +
                        '$x = 0,\\ 2\\pi,\\ 4\\pi,\\ 6\\pi$. I rutnätet: toppen ligger på andra rutlinjen, ' +
                        'och kurvan går genom $x$-axeln på var fjärde rutlinje.',
                    figur: 'u3-s2',
                },
            ],
            svar: '$x = 6\\pi$',
            bedomning: [
                ['a) Korrekt svar ($6\\pi$)', '+E'],
                ['b) Godtagbar skiss av kurvan $y = \\sin \\dfrac{x}{2}$ där godtagbar amplitud och period framgår', '+E'],
            ],
        },

        {
            nr: 4, del: 'B', poang: [1, 1, 0], omrade: 'Asymptoter',
            genomgangar: ['ma4-2.13', 'ma4-2.12', 'ma4-2.14'],
            endastSvar: true,
            fraga: 'En kurva ges av $y = \\dfrac{3}{x + 2} + x - 1$\n\n' +
                'Rita in asymptoterna till kurvan i koordinatsystemet.',
            figur: 'u4',
            steg: [
                {
                    rubrik: 'Hitta den lodräta asymptoten',
                    varfor: 'Ett bråk saknar värde där nämnaren är noll. När $x$ närmar sig $-2$ blir ' +
                        'nämnaren $x + 2$ mycket liten medan täljaren är $3$, så bråket, och därmed ' +
                        '$y$, växer obegränsat uppåt eller nedåt. Kurvan närmar sig då den lodräta ' +
                        'linjen $x = -2$ utan att någonsin nå den.',
                    text: '$$x + 2 = 0 \\quad \\Longleftrightarrow \\quad x = -2$$\n\n' +
                        'Lodrät asymptot: $x = -2$.',
                    figur: 'u4-s1',
                },
                {
                    rubrik: 'Hitta den sneda asymptoten',
                    varfor: 'Funktionen är redan skriven som en rät linje plus en restterm: $x - 1$ är ' +
                        'linjen och $\\dfrac{3}{x + 2}$ är resttermen. När $x$ blir mycket stort, ' +
                        'positivt eller negativt, blir nämnaren stor och resttermen nästan noll. ' +
                        'Då ligger kurvan nästan på linjen $y = x - 1$.',
                    text: '$$y - (x - 1) = \\dfrac{3}{x + 2} \\to 0 \\quad \\text{då } x \\to \\pm\\infty$$\n\n' +
                        'Sned asymptot: $y = x - 1$. Den går genom punkterna $(0,\\ -1)$ och $(1,\\ 0)$.',
                    figur: 'u4-s2',
                },
                {
                    rubrik: 'Kontrollera med kurvan',
                    varfor: 'Den högra grenen ligger mellan asymptoterna och närmar sig båda. Den ' +
                        'vänstra grenen ligger under rutnätets nedersta linje: dess högsta punkt är ' +
                        '$(-2 - \\sqrt{3},\\ -3 - 2\\sqrt{3}) \\approx (-3{,}7;\\ -6{,}5)$. ' +
                        'Uppgiften gäller bara asymptoterna, så det räcker att rita in dem som ' +
                        'streckade linjer.',
                    text: 'Asymptoterna är $x = -2$ (lodrät) och $y = x - 1$ (sned).',
                    figur: 'u4-s3',
                },
            ],
            svar: 'Asymptoterna är $x = -2$ och $y = x - 1$ (se figuren).',
            bedomning: [
                ['Minst en av kurvans asymptoter godtagbart inritad', '+E'],
                ['med båda kurvans asymptoter godtagbart inritade och inga felaktiga asymptoter inritade. ' +
                    'De två korrekta asymptoterna är $y = x - 1$ och $x = -2$.', '+C'],
            ],
        },

        {
            nr: 5, del: 'B', poang: [0, 1, 0], omrade: 'Integraler: trigonometriska ettan',
            genomgangar: ['ma4-1.7', 'ma4-3.1', 'ma4-3.3'],
            endastSvar: true,
            fraga: 'Bestäm $\\displaystyle\\int_0^{\\frac{\\pi}{2}} (\\sin^2 x + \\cos^2 x + \\sin x)\\,dx$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Förenkla med trigonometriska ettan',
                    varfor: 'För alla vinklar gäller $\\sin^2 x + \\cos^2 x = 1$. De två första termerna ' +
                        'kan alltså bytas mot talet $1$, och integranden blir mycket enklare.',
                    text: '$$\\int_0^{\\frac{\\pi}{2}} (\\sin^2 x + \\cos^2 x + \\sin x)\\,dx = ' +
                        '\\int_0^{\\frac{\\pi}{2}} (1 + \\sin x)\\,dx$$',
                },
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'En primitiv funktion till $1$ är $x$. En primitiv funktion till $\\sin x$ ' +
                        'är $-\\cos x$, eftersom derivatan av $-\\cos x$ är $\\sin x$.',
                    text: '$$= \\Big[ x - \\cos x \\Big]_0^{\\frac{\\pi}{2}}$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Integralkalkylens fundamentalsats: den primitiva funktionens värde i den ' +
                        'övre gränsen minus värdet i den undre. Kom ihåg att $\\cos \\dfrac{\\pi}{2} = 0$ ' +
                        'och $\\cos 0 = 1$.',
                    text: '$$= \\left( \\dfrac{\\pi}{2} - \\cos \\dfrac{\\pi}{2} \\right) - (0 - \\cos 0) ' +
                        '= \\left( \\dfrac{\\pi}{2} - 0 \\right) - (0 - 1) = \\dfrac{\\pi}{2} + 1$$',
                },
            ],
            svar: '$1 + \\dfrac{\\pi}{2}$',
            bedomning: [['Korrekt svar ($1 + \\dfrac{\\pi}{2}$)', '+C']],
        },

        {
            nr: 6, del: 'B', poang: [0, 1, 0], omrade: 'Komplexa tal: exponentiell form',
            genomgangar: ['ma4-4.10', 'ma4-4.6'],
            endastSvar: true,
            fraga: 'Bestäm $|z|$ då $z = e^{2 + i\\pi}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Dela upp potensen',
                    varfor: 'Potenslagen $a^{m + n} = a^m \\cdot a^n$ gäller även när exponenten är ' +
                        'komplex. Då kan exponentens reella del och imaginära del skiljas åt.',
                    text: '$$z = e^{2 + i\\pi} = e^2 \\cdot e^{i\\pi}$$',
                },
                {
                    rubrik: 'Använd Eulers formel',
                    varfor: 'Eulers formel $e^{\iv} = \\cos v + i\\sin v$ med ' +
                        '$v = \\pi$ ger $\\cos \\pi + i\\sin \\pi = -1 + 0 \\cdot i = -1$. ' +
                        'Det är Eulers identitet, $e^{i\\pi} = -1$.',
                    text: '$$z = e^2 \\cdot (-1) = -e^2$$',
                },
                {
                    rubrik: 'Bestäm absolutbeloppet',
                    varfor: 'Absolutbeloppet är avståndet från origo i det komplexa talplanet. Talet ' +
                        '$-e^2$ ligger på den negativa reella axeln, på avståndet ' +
                        '$e^2$ från origo. (Allmänt gäller $|e^{a + bi}| = ' +
                        'e^a$, eftersom $e^{bi}$ alltid har beloppet $1$.)',
                    text: '$$|z| = |-e^2| = e^2$$',
                },
            ],
            svar: '$|z| = e^2$',
            bedomning: [['Korrekt svar ($e^2$)', '+C']],
        },

        {
            nr: 7, del: 'B', poang: [1, 1, 1], omrade: 'Komplexa talplanet: konjugat, argument och villkor',
            genomgangar: ['ma4-4.5', 'ma4-4.6', 'ma4-4.2'],
            endastSvar: true,
            fraga: 'Figuren visar det komplexa talplanet där talen $z_1$ och $z_2$ är markerade.<br>' +
                '**a)**&nbsp;Bestäm $\\bar{z}_1$&emsp;&emsp;' +
                '**b)**&nbsp;Bestäm $\\arg(z_2 - 1)$<br>' +
                '**c)** Markera alla komplexa tal $z$ som uppfyller $\\mathrm{Re}\\, z = \\mathrm{Im}(z + z_2)$',
            figur: 'u7',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av z₁ i figuren',
                    varfor: 'Realdelen läses av på den vågräta Re-axeln och imaginärdelen på den ' +
                        'lodräta Im-axeln. Punkten $z_1$ ligger $4$&nbsp;steg till vänster och $3$&nbsp;steg upp.',
                    text: '$$z_1 = -4 + 3i$$',
                },
                {
                    del: 'a',
                    rubrik: 'Byt tecken på imaginärdelen',
                    varfor: 'Konjugatet till $z = a + bi$ är $\\bar{z} = a - bi$: ' +
                        'realdelen behålls och imaginärdelen byter tecken. I talplanet är det en ' +
                        'spegling i den reella axeln.',
                    text: '$$\\bar{z}_1 = -4 - 3i$$',
                    figur: 'u7-s1',
                    delsvar: { del: 'a', text: '$\\bar{z}_1 = -4 - 3i$' },
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna z₂ − 1',
                    varfor: 'Ur figuren är $z_2 = 3 - 2i$. Att subtrahera $1$ minskar bara ' +
                        'realdelen med $1$, så punkten flyttas ett steg åt vänster.',
                    text: '$$z_2 - 1 = 3 - 2i - 1 = 2 - 2i$$',
                },
                {
                    del: 'b',
                    rubrik: 'Bestäm argumentet',
                    varfor: 'Argumentet är vinkeln från den positiva reella axeln till visaren. Punkten ' +
                        '$2 - 2i$ ligger i fjärde kvadranten, lika långt åt höger som nedåt. ' +
                        'Visaren bildar därför vinkeln $45^\\circ$, alltså $\\dfrac{\\pi}{4}$, under den ' +
                        'positiva reella axeln, och vinklar medurs räknas negativa.',
                    text: '$$\\tan v = \\dfrac{-2}{2} = -1 \\quad \\text{och fjärde kvadranten ger} \\quad ' +
                        'v = -\\dfrac{\\pi}{4}$$\n\n' +
                        'Samma riktning får man med $v = \\dfrac{7\\pi}{4}$ eller $v = -45^\\circ$.',
                    figur: 'u7-s2',
                    delsvar: { del: 'b', text: '$\\arg(z_2 - 1) = -\\dfrac{\\pi}{4}$ (eller $-45^\\circ$)' },
                },
                {
                    del: 'c',
                    rubrik: 'Skriv z med real- och imaginärdel',
                    varfor: 'För att översätta villkoret till en ekvation skrivs $z = x + yi$, ' +
                        'där $x$ och $y$ är reella tal: $x$ är realdelen och $y$ imaginärdelen. Då motsvarar $x$ och $y$ ' +
                        'koordinaterna i talplanet.',
                    text: '$$z + z_2 = x + yi + 3 - 2i = (x + 3) + (y - 2)i$$',
                },
                {
                    del: 'c',
                    rubrik: 'Ställ upp villkoret som en ekvation',
                    varfor: 'Vänsterledet är $\\mathrm{Re}\\, z = x$. Högerledet är imaginärdelen av ' +
                        '$z + z_2$, alltså det som står framför $i$: $y - 2$.',
                    text: '$$x = y - 2$$',
                },
                {
                    del: 'c',
                    rubrik: 'Lös ut y',
                    varfor: 'Med $y$ ensamt i ena ledet blir sambandet en rät linje på formen ' +
                        '$y = kx + m$, som är lätt att rita. Addera $2$ i båda led.',
                    text: '$$x + 2 = y - 2 + 2$$\n\n$$x + 2 = y \\quad \\Longleftrightarrow \\quad y = x + 2$$',
                },
                {
                    del: 'c',
                    rubrik: 'Rita linjen',
                    varfor: 'Alla tal $z = x + yi$ som uppfyller villkoret ligger på linjen ' +
                        '$y = x + 2$, det vill säga $\\mathrm{Im}\\, z = \\mathrm{Re}\\, z + 2$. Linjen ' +
                        'har lutningen $1$ och skär Im-axeln i $2$ (talet $2i$) och Re-axeln ' +
                        'i $-2$.',
                    text: 'Kontroll med $z = 2i$: $\\mathrm{Re}\\, z = 0$ och ' +
                        '$z + z_2 = 3 + 0i$, så $\\mathrm{Im}(z + z_2) = 0$. Det stämmer.',
                    figur: 'u7-s3',
                    delsvar: { del: 'c', text: 'Linjen $\\mathrm{Im}\\, z = \\mathrm{Re}\\, z + 2$ (se figuren).' },
                },
            ],
            svar: 'a) $\\bar{z}_1 = -4 - 3i$&emsp;&emsp;b) $\\arg(z_2 - 1) = -\\dfrac{\\pi}{4}$ ' +
                '(eller $-45^\\circ$)&emsp;&emsp;c) Linjen $\\mathrm{Im}\\, z = \\mathrm{Re}\\, z + 2$ (se figuren).',
            bedomning: [
                ['a) Korrekt svar ($-4 - 3i$)', '+E'],
                ['b) Korrekt svar (till exempel $-\\dfrac{\\pi}{4}$; $-45^\\circ$)', '+C'],
                ['c) Godtagbar markering av linjen $\\mathrm{Im}\\, z = \\mathrm{Re}\\, z + 2$', '+A'],
            ],
        },

        {
            nr: 8, del: 'B', poang: [0, 0, 1], omrade: 'Integraler: produktregeln baklänges',
            genomgangar: ['ma4-2.7', 'ma4-3.1'],
            endastSvar: true,
            fraga: 'Bestäm $\\displaystyle\\int_0^{\\pi} \\big(g\'(x) \\cdot h(x) + g(x) \\cdot h\'(x)\\big)\\,dx$<br>' +
                'då $g(x) = \\cos x$ och $h(x) = x^2$',
            figur: null,
            steg: [
                {
                    rubrik: 'Känn igen produktregeln',
                    varfor: 'Produktregeln säger att derivatan av $g(x) \\cdot h(x)$ är ' +
                        '$g\'(x) \\cdot h(x) + g(x) \\cdot h\'(x)$, precis det som står i integralen. ' +
                        'Integranden är alltså derivatan av produkten, och då är produkten ' +
                        '$g(x) \\cdot h(x)$ en primitiv funktion. Ingen derivata behöver räknas ut.',
                    text: '$$\\int_0^{\\pi} \\big(g\'(x) \\cdot h(x) + g(x) \\cdot h\'(x)\\big)\\,dx = ' +
                        '\\Big[ g(x) \\cdot h(x) \\Big]_0^{\\pi}$$',
                },
                {
                    rubrik: 'Sätt in funktionerna',
                    varfor: 'Produkten är $g(x) \\cdot h(x) = \\cos x \\cdot x^2$, som skrivs $x^2 \\cos x$.',
                    text: '$$= \\Big[ x^2 \\cos x \\Big]_0^{\\pi}$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Övre gränsen minus undre gränsen. $\\cos \\pi = -1$, och i den undre ' +
                        'gränsen blir hela produkten $0$ eftersom $0^2 = 0$.',
                    text: '$$= \\pi^2 \\cos \\pi - 0^2 \\cdot \\cos 0 = \\pi^2 \\cdot (-1) - 0 = -\\pi^2$$',
                },
            ],
            svar: '$-\\pi^2$',
            bedomning: [['Korrekt svar ($-\\pi^2$)', '+A']],
        },

        {
            nr: 9, del: 'B', poang: [0, 0, 1], omrade: 'Komplexa tal: ekvationen zⁿ = w',
            genomgangar: ['ma4-4.9', 'ma4-4.8'],
            endastSvar: true,
            fraga: 'Ange en icke-reell rot till ekvationen $z^{10} - 1 = 0$',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv ekvationen på formen zⁿ = w',
                    varfor: 'Ekvationer av typen $z^n = w$ löses genom att båda led skrivs i polär form ' +
                        'och beloppen och argumenten jämförs. Först adderas $1$ i båda led.',
                    text: '$$z^{10} - 1 + 1 = 0 + 1$$\n\n$$z^{10} = 1$$',
                },
                {
                    rubrik: 'Skriv båda led i polär form',
                    varfor: 'Med $z = r(\\cos v + i\\sin v)$ ger de Moivres formel ' +
                        '$z^{10} = r^{10}(\\cos 10v + i\\sin 10v)$. Talet $1$ har beloppet $1$ ' +
                        'och argumentet $0^\\circ$.',
                    text: '$$r^{10}(\\cos 10v + i\\sin 10v) = 1 \\cdot (\\cos 0^\\circ + i\\sin 0^\\circ)$$',
                },
                {
                    rubrik: 'Jämför belopp och argument',
                    varfor: 'Beloppen ska vara lika. Beloppet $r$ är alltid positivt, så ' +
                        '$r^{10} = 1$ ger $r = 1$. Argumenten får skilja sig med ett helt antal varv, ' +
                        'eftersom vinkeln kan ökas med $360^\\circ$ utan att punkten flyttar sig.',
                    text: '$$r^{10} = 1 \\quad \\Longrightarrow \\quad r = 1$$\n\n' +
                        '$$10v = 0^\\circ + n \\cdot 360^\\circ$$\n\n' +
                        'Dividera båda led med $10$:\n\n' +
                        '$$\\dfrac{10v}{10} = \\dfrac{0^\\circ + n \\cdot 360^\\circ}{10}$$\n\n' +
                        '$$v = n \\cdot 36^\\circ$$',
                },
                {
                    rubrik: 'Välj ett n som ger en icke-reell rot',
                    varfor: 'De tio rötterna ligger jämnt fördelade på enhetscirkeln. $n = 0$ ger ' +
                        '$v = 0^\\circ$, alltså $z = 1$, och $n = 5$ ger $v = 180^\\circ$, alltså ' +
                        '$z = -1$. De två är reella. Alla andra $n$ från $1$ till $9$ ger rötter ' +
                        'utanför den reella axeln. Vi väljer $n = 1$.',
                    text: '$$z = \\cos 36^\\circ + i\\sin 36^\\circ$$\n\n' +
                        'I radianer är $36^\\circ = \\dfrac{\\pi}{5}$, så samma rot kan skrivas ' +
                        '$z = \\cos \\dfrac{\\pi}{5} + i\\sin \\dfrac{\\pi}{5}$.',
                    figur: 'u9-s1',
                },
            ],
            svar: 'Till exempel $z = \\cos 36^\\circ + i\\sin 36^\\circ$ ' +
                '(eller $z = \\cos \\dfrac{\\pi}{5} + i\\sin \\dfrac{\\pi}{5}$)',
            bedomning: [
                ['Korrekt svar (till exempel $\\cos 36^\\circ + i\\sin 36^\\circ$; ' +
                    '$\\cos \\dfrac{\\pi}{5} + i\\sin \\dfrac{\\pi}{5}$). Även svar med flera ' +
                    'korrekta lösningar ges poäng, men svar av typen ' +
                    '$\\cos n36^\\circ + i\\sin n36^\\circ$ ges ej poäng eftersom svaret ' +
                    'innehåller reella lösningar.', '+A'],
            ],
        },

        {
            nr: 10, del: 'B', poang: [0, 0, 1], omrade: 'Rotationskroppar: rotation kring y-axeln',
            genomgangar: ['ma4-3.8', 'ma4-3.7'],
            endastSvar: true,
            fraga: 'Ett område i första kvadranten begränsas av kurvan $y = x^{\\frac{1}{4}}$, linjen ' +
                '$y = 2$ och $y$-axeln. När detta område roterar kring $y$-axeln bildas en ' +
                'rotationskropp vars volym ges av $\\pi\\displaystyle\\int_0^2 g(y)\\,dy$.\n\n' +
                'Ange funktionen $g$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp formeln för rotation kring y-axeln',
                    varfor: 'Kroppen delas i tunna vågräta skivor. En skiva på höjden $y$ är en cirkel ' +
                        'med radien $x$, alltså avståndet från $y$-axeln ut till kurvan, och tjockleken ' +
                        '$dy$. Dess volym är $\\pi x^2\\,dy$. Gränserna går i $y$-led, från $0$ till $2$.',
                    text: '$$V = \\pi\\int_0^2 x^2\\,dy$$',
                    figur: 'u10-s1',
                },
                {
                    rubrik: 'Lös ut x, eftersom radien ska uttryckas i y',
                    varfor: 'Integralen går längs $y$-axeln, så radien $x$ måste uttryckas med $y$. ' +
                        'Upphöj båda led till $4$, eftersom $\\left(x^{\\frac{1}{4}}\\right)^4 = x$.',
                    text: '$$y = x^{\\frac{1}{4}}$$\n\n' +
                        '$$y^4 = \\left(x^{\\frac{1}{4}}\\right)^4$$\n\n' +
                        '$$y^4 = x \\quad \\Longleftrightarrow \\quad x = y^4$$',
                },
                {
                    rubrik: 'Kvadrera radien',
                    varfor: 'Formeln innehåller $x^2$. Potenslagen $(a^m)^n = a^{m \\cdot n}$ ger ' +
                        '$(y^4)^2 = y^8$. Det är funktionen under integraltecknet.',
                    text: '$$x^2 = (y^4)^2 = y^8 \\quad \\Longrightarrow \\quad V = \\pi\\int_0^2 y^8\\,dy$$',
                    figur: 'u10-s2',
                },
            ],
            svar: '$g(y) = y^8$',
            bedomning: [['Korrekt svar ($y^8$)', '+A']],
        }
    );
})();

// Fysiklabbet: NP Ma 4 VT 2022, delprov C (uppgift 11–19).
// Fullständiga lösningar utan digitala verktyg. Dataformatet beskrivs i
// data/np/RIKTLINJER.md; filen fyller på uppgiftslistan i ma4-vt2022.js och
// slås ihop med den innan publicering. Figurerna ligger i
// data/np/ma4-vt2022-figurer-C.js (generator: .claude/np-figs/gen-ma4-vt2022-C.js)
// och pennlösningarna i data/np/ma4-vt2022-delC-penna.js.
(function () {
    var P = window.NP_PROV && window.NP_PROV['ma4-vt2022'];
    if (!P) return;
    P.uppgifter.push(

        // ================= DELPROV C =================
        {
            nr: 11, del: 'C', poang: [2, 0, 0], omrade: 'Komplexa tal: division',
            genomgangar: ['ma4-4.2'],
            fraga: 'Skriv $\\dfrac{8 + 6i}{1 + 2i}$ på formen $a + bi$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Förläng med nämnarens konjugat',
                    varfor: 'Ett $i$ i nämnaren går inte att dela upp i realdel och imaginärdel. ' +
                        'Multipliceras nämnaren $1 + 2i$ med sitt konjugat $1 - 2i$ blir den reell, ' +
                        'eftersom $(a + bi)(a - bi) = a^2 + b^2$. Täljaren förlängs med samma tal, så ' +
                        'att bråkets värde inte ändras.',
                    text: '$$\\dfrac{8 + 6i}{1 + 2i} = \\dfrac{(8 + 6i)(1 - 2i)}{(1 + 2i)(1 - 2i)}$$',
                },
                {
                    rubrik: 'Multiplicera ut täljaren och nämnaren',
                    varfor: 'I täljaren multipliceras varje term i den första parentesen med varje ' +
                        'term i den andra. Nämnaren är ett tal gånger sitt konjugat, så ' +
                        'konjugatregeln $(a + b)(a - b) = a^2 - b^2$ ger den direkt.',
                    text: '$$\\begin{aligned}\\dfrac{8 + 6i}{1 + 2i} &= \\dfrac{(8 + 6i)(1 - 2i)}{(1 + 2i)(1 - 2i)} \\\\[6pt] ' +
                        '&= \\dfrac{8 - 16i + 6i - 12i^2}{1^2 - (2i)^2}\\end{aligned}$$',
                },
                {
                    rubrik: 'Slå ihop likadana termer och ersätt i i kvadrat med −1',
                    varfor: 'De imaginära termerna $-16i$ och $6i$ blir tillsammans $-10i$, och i ' +
                        'nämnaren är $(2i)^2 = 4i^2$. Sedan används $i^2 = -1$ i både täljare och ' +
                        'nämnare: $-12i^2$ blir $+12$ och $-4i^2$ blir $+4$. Nämnaren är nu reell.',
                    text: '$$\\begin{aligned}\\phantom{\\dfrac{8 + 6i}{1 + 2i}} &= \\dfrac{8 - 10i - 12i^2}{1 - 4i^2} \\\\[6pt] ' +
                        '&= \\dfrac{8 - 10i + 12}{1 + 4} = \\dfrac{20 - 10i}{5}\\end{aligned}$$',
                },
                {
                    rubrik: 'Dela upp i realdel och imaginärdel',
                    varfor: 'Nämnaren är det reella talet $5$, så både realdelen och imaginärdelen ' +
                        'i täljaren kan divideras med $5$ var för sig. Kontroll: ' +
                        '$(4 - 2i)(1 + 2i) = 4 + 8i - 2i - 4i^2 = 8 + 6i$, som det ska.',
                    text: '$$\\begin{aligned}\\phantom{\\dfrac{8 + 6i}{1 + 2i}} &= \\dfrac{20}{5} - \\dfrac{10}{5}i = 4 - 2i\\end{aligned}$$',
                },
            ],
            svar: '$4 - 2i$',
            bedomning: [
                ['Godtagbar ansats, förlänger med nämnarens konjugat, $\\dfrac{(8 + 6i)(1 - 2i)}{(1 + 2i)(1 - 2i)}$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($4 - 2i$)', '+E'],
            ],
        },

        {
            nr: 12, del: 'C', poang: [2, 1, 0], omrade: 'Trigonometriska ekvationer',
            genomgangar: ['ma4-1.3', 'ma4-1.5'],
            fraga: 'Lös ekvationen $\\sin 4x = \\dfrac{\\sqrt{3}}{2}$',
            figur: null,
            steg: [
                {
                    rubrik: 'Hitta en vinkel med rätt sinusvärde',
                    varfor: '$\\dfrac{\\sqrt{3}}{2}$ är ett exakt värde som känns igen från den ' +
                        'liksidiga triangeln: $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$. Argumentet ' +
                        'är här hela $4x$, så det är $4x$ som kan vara $60^\\circ$.',
                    text: '$$\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$$',
                },
                {
                    rubrik: 'Skriv upp båda lösningsfamiljerna för 4x',
                    varfor: 'Sinus är $y$-koordinaten i enhetscirkeln, och två punkter per varv har ' +
                        'samma $y$-koordinat: vinkeln $60^\\circ$ och $180^\\circ - 60^\\circ = 120^\\circ$. ' +
                        'Varje helt varv, $n \\cdot 360^\\circ$, ger samma punkt igen.',
                    text: '$$4x = 60^\\circ + n \\cdot 360^\\circ \\qquad \\text{eller} \\qquad ' +
                        '4x = 180^\\circ - 60^\\circ + n \\cdot 360^\\circ = 120^\\circ + n \\cdot 360^\\circ$$\n\n' +
                        'där $n$ är ett heltal.',
                },
                {
                    rubrik: 'Dividera båda led med 4',
                    varfor: 'Det är $x$ som söks, så båda led divideras med $4$. Då delas även ' +
                        'periodtermen: $\\dfrac{n \\cdot 360^\\circ}{4} = n \\cdot 90^\\circ$. ' +
                        'Lösningarna kommer alltså tätare än för $\\sin x$, fyra gånger per varv.',
                    text: '$$\\dfrac{4x}{4} = \\dfrac{60^\\circ + n \\cdot 360^\\circ}{4}$$\n\n' +
                        '$$x = \\dfrac{60^\\circ}{4} + \\dfrac{n \\cdot 360^\\circ}{4} = 15^\\circ + n \\cdot 90^\\circ$$\n\n' +
                        '$$\\dfrac{4x}{4} = \\dfrac{120^\\circ + n \\cdot 360^\\circ}{4}$$\n\n' +
                        '$$x = \\dfrac{120^\\circ}{4} + \\dfrac{n \\cdot 360^\\circ}{4} = 30^\\circ + n \\cdot 90^\\circ$$',
                },
                {
                    rubrik: 'Skriv lösningarna i radianer',
                    varfor: 'Uppgiften säger inget om vinkelmått, så svaret får ges i grader eller ' +
                        'radianer. Med $180^\\circ = \\pi$ blir $15^\\circ = \\dfrac{\\pi}{12}$, ' +
                        '$30^\\circ = \\dfrac{\\pi}{6}$ och $90^\\circ = \\dfrac{\\pi}{2}$. ' +
                        'Kontroll: $\\sin(4 \\cdot 15^\\circ) = \\sin 60^\\circ$ och ' +
                        '$\\sin(4 \\cdot 30^\\circ) = \\sin 120^\\circ$, som båda är $\\dfrac{\\sqrt{3}}{2}$.',
                    text: '$$x = \\dfrac{\\pi}{12} + n \\cdot \\dfrac{\\pi}{2} \\qquad \\text{och} \\qquad ' +
                        'x = \\dfrac{\\pi}{6} + n \\cdot \\dfrac{\\pi}{2}$$',
                },
            ],
            svar: '$x = 15^\\circ + n \\cdot 90^\\circ$ och $x = 30^\\circ + n \\cdot 90^\\circ$, där $n$ är ett heltal ' +
                '(i radianer $x = \\dfrac{\\pi}{12} + n \\cdot \\dfrac{\\pi}{2}$ och $x = \\dfrac{\\pi}{6} + n \\cdot \\dfrac{\\pi}{2}$)',
            bedomning: [
                ['Godtagbar ansats, bestämmer minst en lösning till ekvationen korrekt', '+E'],
                ['med godtagbar fortsättning, bestämmer minst två lösningar till ekvationen korrekt, till exempel $x = 15^\\circ + n \\cdot 90^\\circ$', '+E'],
                ['med i övrigt godtagbar lösning med korrekt svar ($x = \\dfrac{\\pi}{12} + n \\cdot \\dfrac{\\pi}{2}$ och $x = \\dfrac{\\pi}{6} + n \\cdot \\dfrac{\\pi}{2}$; $x = 15^\\circ + n \\cdot 90^\\circ$ och $x = 30^\\circ + n \\cdot 90^\\circ$)', '+C'],
            ],
        },

        {
            nr: 13, del: 'C', poang: [2, 0, 0], omrade: 'Komplexa tal: konjugat och imaginärdel',
            genomgangar: ['ma4-4.2', 'ma4-4.1'],
            fraga: 'Visa att $\\dfrac{z - \\bar{z}}{2i} = \\operatorname{Im} z$ för alla komplexa tal $z$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Skriv z på allmän form',
                    varfor: 'Likheten ska gälla för alla komplexa tal, så vi kan inte pröva med ' +
                        'exempel. Ett godtyckligt komplext tal skrivs $z = a + bi$, där $a$ och $b$ ' +
                        'är reella. Då är konjugatet $\\bar{z} = a - bi$ och imaginärdelen ' +
                        '$\\operatorname{Im} z = b$.',
                    text: '$$z = a + bi \\qquad \\bar{z} = a - bi \\qquad \\operatorname{Im} z = b$$',
                },
                {
                    rubrik: 'Sätt in i vänsterledet',
                    varfor: 'Vi utgår från vänsterledet (VL) och förenklar det tills vi ser om det ' +
                        'blir lika med högerledet (HL). Parentesen runt $\\bar{z}$ behövs, eftersom ' +
                        'hela konjugatet ska subtraheras.',
                    text: '$$\\text{VL} = \\dfrac{z - \\bar{z}}{2i} = \\dfrac{a + bi - (a - bi)}{2i}$$',
                },
                {
                    rubrik: 'Förenkla täljaren',
                    varfor: 'Minustecknet framför parentesen byter tecken på båda termerna i den. ' +
                        'Realdelarna $a$ och $-a$ tar ut varandra, och kvar blir $2bi$.',
                    text: '$$\\text{VL} = \\dfrac{a + bi - a + bi}{2i} = \\dfrac{2bi}{2i}$$',
                },
                {
                    rubrik: 'Förkorta och jämför med högerledet',
                    varfor: 'Faktorn $2i$ finns i både täljare och nämnare och är aldrig noll, så ' +
                        'den kan förkortas bort. Kvar blir $b$, som är just imaginärdelen.',
                    text: '$$\\text{VL} = \\dfrac{2bi}{2i} = b \\qquad\\qquad \\text{HL} = \\operatorname{Im} z = b$$\n\n' +
                        'Alltså är VL = HL för alla komplexa tal $z$.',
                },
            ],
            svar: 'Med $z = a + bi$ är $\\dfrac{z - \\bar{z}}{2i} = \\dfrac{a + bi - (a - bi)}{2i} = ' +
                '\\dfrac{2bi}{2i} = b = \\operatorname{Im} z$, så likheten gäller för alla komplexa tal $z$.',
            bedomning: [
                ['Godtagbar ansats, till exempel skriver om VL till $\\dfrac{a + bi - (a - bi)}{2i}$', '+E'],
                ['med i övrigt godtagbart resonemang där likheten visas', '+E'],
            ],
        },

        {
            nr: 14, del: 'C', poang: [0, 3, 0], omrade: 'Polynomdivision och polynomekvationer',
            genomgangar: ['ma4-4.4', 'ma4-4.3'],
            fraga: 'Funktionerna $f$ och $g$ ges av $f(z) = z^4 + 2z^3 + 9z^2 - 2z - 10$ och ' +
                '$g(z) = z^2 - 1$\n\n' +
                '**a)** Visa att $f(z)$ är delbart med $g(z)$.\n\n' +
                '**b)** Lös ekvationen $f(z) = 0$',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Ställ upp polynomdivisionen',
                    varfor: '$f(z)$ är delbart med $g(z)$ om divisionen går jämnt upp, alltså om ' +
                        'resten blir $0$. Vi skriver $f(z)$ med ett streck ovanför och nämnaren ' +
                        '$z^2 - 1$ i trappsteget till höger, och bygger kvoten term för term ovanför ' +
                        'strecket. Nämnaren saknar en term med $z$, så produkterna får en lucka i ' +
                        '$z^3$- respektive $z$-kolumnen.',
                    text: '$$\\def\\arraystretch{1.45}\n' +
                        '\\begin{array}{l}\n' +
                        '\\phantom{-\\,(}z^2 + 2z + 10 \\\\\n' +
                        '\\phantom{-\\,(}\\overline{z^4 + 2z^3 + 9z^2 - 2z - 10\\;}\\rule[-0.24em]{0.04em}{1.12em}\\underline{\\;z^2 - 1\\;} \\\\\n' +
                        '\\phantom{-\\,(}\\mkern-24mu{-}\\,\\underline{(\\mathrlap{z^4 \\phantom{{}+ 2z^3} - z^2)}\\phantom{z^4 + 2z^3 + 9z^2 - 2z - 10}} \\\\\n' +
                        '\\phantom{-\\,(z^4 {}+{}}2z^3 + 10z^2 - 2z - 10 \\\\\n' +
                        '\\phantom{-\\,(z^4 {}+{}}\\mkern-24mu{-}\\,\\underline{(\\mathrlap{2z^3 \\phantom{{}+ 10z^2} - 2z)}\\phantom{2z^3 + 10z^2 - 2z - 10}} \\\\\n' +
                        '\\phantom{-\\,(z^4 {}+{} 2z^3 {}+{}}10z^2 \\phantom{{}- 2z} - 10 \\\\\n' +
                        '\\phantom{-\\,(z^4 {}+{} 2z^3 {}+{}}\\mkern-24mu{-}\\,\\underline{(10z^2 \\phantom{{}- 2z} - 10)} \\\\\n' +
                        '\\phantom{-\\,(z^4 {}+{} 2z^3 {}+{} 10z^2 {}-{} 2z {}-{} 1}0\n' +
                        '\\end{array}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Följ varven i divisionen',
                    varfor: 'Varje varv går till på samma sätt: dela den första termen med nämnarens ' +
                        '$z^2$, multiplicera upp och dra bort hela produkten. Under strecket skrivs ' +
                        'allt som blir kvar.',
                    text: '- $z^4 : z^2 = z^2$, och $z^2(z^2 - 1) = z^4 - z^2$ dras bort. Kvar blir ' +
                        '$2z^3 + 10z^2 - 2z - 10$.\n' +
                        '- $2z^3 : z^2 = 2z$, och $2z(z^2 - 1) = 2z^3 - 2z$ dras bort. ' +
                        '$z$-termerna tar ut varandra, $-2z - (-2z) = 0$, och kvar blir $10z^2 - 10$.\n' +
                        '- $10z^2 : z^2 = 10$, och $10(z^2 - 1) = 10z^2 - 10$ dras bort. Resten blir $0$.',
                },
                {
                    del: 'a',
                    rubrik: 'Dra slutsatsen',
                    varfor: 'Resten blev $0$, så $z^2 - 1$ går jämnt upp i $f(z)$. Kvoten står överst ' +
                        'och är den andra faktorn.',
                    text: '$$f(z) = (z^2 - 1)(z^2 + 2z + 10)$$\n\n' +
                        'Divisionen går jämnt upp, så $f(z)$ är delbart med $g(z)$.',
                    delsvar: { del: 'a', text: 'Polynomdivisionen ger kvoten $z^2 + 2z + 10$ och resten $0$, ' +
                        'så $f(z) = (z^2 - 1)(z^2 + 2z + 10)$ och $f(z)$ är delbart med $g(z)$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Skriv ekvationen som en produkt',
                    varfor: 'Faktoriseringen från a) gör att ekvationen kan lösas med ' +
                        'nollproduktmetoden: en produkt är noll precis när någon av faktorerna är noll.',
                    text: '$$f(z) = 0 \\quad \\Longleftrightarrow \\quad (z^2 - 1)(z^2 + 2z + 10) = 0$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös den första faktorn',
                    varfor: 'Addera $1$ till båda led och dra roten ur. Glöm inte den negativa roten.',
                    text: '$$z^2 - 1 = 0 \\quad \\Longleftrightarrow \\quad z^2 = 1 \\quad \\Longleftrightarrow ' +
                        '\\quad z = \\pm\\sqrt{1} \\quad \\Longleftrightarrow \\quad z = \\pm 1$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös den andra faktorn med pq-formeln',
                    varfor: 'Med $p = 2$ och $q = 10$ blir uttrycket under rottecknet negativt. ' +
                        'Bland de komplexa talen finns ändå en rot ur $-9$: $\\sqrt{-9} = 3i$, ' +
                        'eftersom $(3i)^2 = 9i^2 = -9$. Rötterna blir ett par komplexkonjugerade tal.',
                    text: '$$z^2 + 2z + 10 = 0$$\n\n' +
                        '$$z = -1 \\pm \\sqrt{1^2 - 10} = -1 \\pm \\sqrt{-9} = -1 \\pm 3i$$',
                    delsvar: { del: 'b', text: '$z = \\pm 1$ och $z = -1 \\pm 3i$' },
                },
            ],
            svar: '**a)** Polynomdivisionen ger $f(z) = (z^2 - 1)(z^2 + 2z + 10)$ med resten $0$, ' +
                'så $f(z)$ är delbart med $g(z)$.\n\n**b)** $z = \\pm 1$ och $z = -1 \\pm 3i$',
            bedomning: [
                ['**a)** Visar att $f(z)$ är delbart med $g(z)$, till exempel med hjälp av polynomdivision', '+C'],
                ['**b)** Godtagbar ansats, till exempel ställer upp $(z^2 + 2z + 10)(z^2 - 1) = 0$ och bestämmer minst två rötter till ekvationen', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($z = \\pm 1$ och $z = -1 \\pm 3i$)', '+C'],
            ],
        },

        {
            nr: 15, del: 'C', poang: [0, 2, 0], omrade: 'Trigonometri: formler och bevis',
            genomgangar: ['ma4-1.8', 'ma4-1.9'],
            fraga: 'Visa att $\\dfrac{\\sin x}{\\cos x - \\sin x} + \\dfrac{\\sin x}{\\cos x + \\sin x} = \\tan 2x$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Gör vänsterledet liknämnigt',
                    varfor: 'Vi förenklar vänsterledet (VL) tills det blir högerledet (HL). Två bråk ' +
                        'adderas genom att de får samma nämnare. Det första bråket förlängs med ' +
                        '$\\cos x + \\sin x$ och det andra med $\\cos x - \\sin x$, så att båda får ' +
                        'nämnaren $(\\cos x - \\sin x)(\\cos x + \\sin x)$.',
                    text: '$$\\text{VL} = \\dfrac{\\sin x(\\cos x + \\sin x) + \\sin x(\\cos x - \\sin x)}' +
                        '{(\\cos x - \\sin x)(\\cos x + \\sin x)}$$',
                },
                {
                    rubrik: 'Multiplicera ut täljare och nämnare',
                    varfor: 'I täljaren multipliceras $\\sin x$ in i varje parentes. Nämnaren är en ' +
                        'produkt av en summa och en differens av samma två termer, så konjugatregeln ' +
                        'ger $\\cos^2 x - \\sin^2 x$.',
                    text: '$$\\text{VL} = \\dfrac{\\sin x\\cos x + \\sin^2 x + \\sin x\\cos x - \\sin^2 x}' +
                        '{\\cos^2 x - \\sin^2 x}$$',
                },
                {
                    rubrik: 'Förenkla täljaren',
                    varfor: 'De två termerna $\\sin x\\cos x$ blir tillsammans $2\\sin x\\cos x$, ' +
                        'och $\\sin^2 x - \\sin^2 x = 0$.',
                    text: '$$\\text{VL} = \\dfrac{2\\sin x\\cos x}{\\cos^2 x - \\sin^2 x}$$',
                },
                {
                    rubrik: 'Använd formlerna för dubbla vinkeln',
                    varfor: 'Täljaren och nämnaren känns igen ur formlerna för dubbla vinkeln: ' +
                        '$\\sin 2x = 2\\sin x\\cos x$ och $\\cos 2x = \\cos^2 x - \\sin^2 x$.',
                    text: '$$\\text{VL} = \\dfrac{\\sin 2x}{\\cos 2x}$$',
                },
                {
                    rubrik: 'Skriv kvoten som tangens',
                    varfor: 'Tangens är kvoten mellan sinus och cosinus för samma vinkel, ' +
                        '$\\tan v = \\dfrac{\\sin v}{\\cos v}$, här med vinkeln $2x$.',
                    text: '$$\\text{VL} = \\dfrac{\\sin 2x}{\\cos 2x} = \\tan 2x = \\text{HL}$$\n\n' +
                        'Alltså är VL = HL, och likheten är visad (för alla $x$ där uttrycken är definierade).',
                },
            ],
            svar: '$\\dfrac{\\sin x(\\cos x + \\sin x) + \\sin x(\\cos x - \\sin x)}{(\\cos x - \\sin x)(\\cos x + \\sin x)} = ' +
                '\\dfrac{2\\sin x\\cos x}{\\cos^2 x - \\sin^2 x} = \\dfrac{\\sin 2x}{\\cos 2x} = \\tan 2x$, så VL = HL.',
            bedomning: [
                ['Godtagbar ansats, till exempel gör liknämnigt och använder formeln för dubbla vinkeln i täljare eller nämnare i VL, till exempel $\\dfrac{\\sin 2x}{(\\cos x - \\sin x)(\\cos x + \\sin x)}$', '+C'],
                ['med i övrigt godtagbart bevis', '+C'],
            ],
        },

        {
            nr: 16, del: 'C', poang: [0, 3, 0], omrade: 'Trigonometriska ettan och enhetscirkeln',
            genomgangar: ['ma4-1.7', 'ma4-1.2'],
            fraga: 'För vinkeln $v$ gäller villkoren:\n\n' +
                '- $\\sin^2 v = \\dfrac{8}{9}$\n' +
                '- $90^\\circ < v < 180^\\circ$\n\n' +
                'Bestäm $\\tan v$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Använd trigonometriska ettan',
                    varfor: 'Trigonometriska ettan, $\\sin^2 v + \\cos^2 v = 1$, kopplar ihop sinus ' +
                        'och cosinus för samma vinkel. Eftersom $\\sin^2 v$ är känd kan $\\cos^2 v$ ' +
                        'lösas ut.',
                    text: '$$\\sin^2 v + \\cos^2 v = 1 \\quad \\Longleftrightarrow \\quad \\cos^2 v = 1 - \\sin^2 v$$\n\n' +
                        '$$\\cos^2 v = 1 - \\dfrac{8}{9} = \\dfrac{1}{9}$$',
                },
                {
                    rubrik: 'Dra roten ur',
                    varfor: 'Både $\\cos v$ och $\\sin v$ kan vara positiva eller negativa, så ' +
                        'roten ur ger två tänkbara värden för var och en.',
                    text: '$$\\cos v = \\pm\\sqrt{\\dfrac{1}{9}} = \\pm\\dfrac{1}{3} \\qquad\\qquad ' +
                        '\\sin v = \\pm\\sqrt{\\dfrac{8}{9}} = \\pm\\dfrac{\\sqrt{8}}{3}$$',
                },
                {
                    rubrik: 'Välj tecken med enhetscirkeln',
                    varfor: 'Villkoret $90^\\circ < v < 180^\\circ$ betyder att vinkelns punkt på ' +
                        'enhetscirkeln ligger i andra kvadranten. Där är $x$-koordinaten, alltså ' +
                        '$\\cos v$, negativ och $y$-koordinaten, alltså $\\sin v$, positiv.',
                    text: '$$\\cos v = -\\dfrac{1}{3} \\qquad\\qquad \\sin v = \\dfrac{\\sqrt{8}}{3}$$',
                    figur: 'u16-s3',
                },
                {
                    rubrik: 'Beräkna tan v',
                    varfor: 'Tangens är kvoten mellan sinus och cosinus. Att dividera med bråket ' +
                        '$\\dfrac{-1}{3}$ är detsamma som att multiplicera med det inverterade ' +
                        'bråket $\\dfrac{3}{-1}$. Sedan tar treorna ut varandra.',
                    text: '$$\\tan v = \\dfrac{\\sin v}{\\cos v} = \\dfrac{\\;\\dfrac{\\sqrt{8}}{3}\\;}{\\;\\dfrac{-1}{3}\\;} ' +
                        '= \\dfrac{\\sqrt{8}}{3} \\cdot \\dfrac{3}{-1} = -\\sqrt{8}$$',
                },
                {
                    rubrik: 'Kontrollera svaret',
                    varfor: 'I andra kvadranten är sinus positiv och cosinus negativ, så tangens ' +
                        'måste vara negativ. Dessutom ska $\\sin^2 v = \\dfrac{8}{9}$ stämma.',
                    text: '$$\\sin^2 v = \\left(\\dfrac{\\sqrt{8}}{3}\\right)^2 = \\dfrac{8}{9} \\qquad \\checkmark$$\n\n' +
                        '$\\tan v = -\\sqrt{8} = -2\\sqrt{2} \\approx -2{,}83$ är negativ, som det ska vara.',
                },
            ],
            svar: '$\\tan v = -\\sqrt{8}$ $(= -2\\sqrt{2})$',
            bedomning: [
                ['Godtagbar ansats, till exempel bestämmer $\\cos^2 v$ och tecknar $\\tan v = \\dfrac{\\sin v}{\\cos v}$', '+C'],
                ['med godtagbar fortsättning, kommer fram till ett värde på $\\tan v$ som uppfyller villkoret $\\sin^2 v = \\dfrac{8}{9}$, till exempel $\\tan v = \\sqrt{8}$', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($-\\sqrt{8}$)', '+C'],
            ],
        },

        {
            nr: 17, del: 'C', poang: [0, 3, 0], omrade: 'Derivata: kvotregeln',
            genomgangar: ['ma4-2.7'],
            fraga: 'Funktionen $f$ ges av $f(x) = \\dfrac{ax + b}{x + 1}$\n\n' +
                'Bestäm konstanterna $a$ och $b$ så att $f(1) = 4$ och $f\'(1) = 3$',
            figur: null,
            steg: [
                {
                    rubrik: 'Använd villkoret f(1) = 4',
                    varfor: 'Två okända konstanter kräver två ekvationer, och varje villkor ger en. ' +
                        'Vi sätter in $x = 1$ i $f(x)$ och sätter resultatet lika med $4$.',
                    text: '$$f(1) = \\dfrac{a \\cdot 1 + b}{1 + 1} = \\dfrac{a + b}{2}$$\n\n' +
                        '$$\\dfrac{a + b}{2} = 4 \\quad \\Longleftrightarrow \\quad a + b = 8$$',
                },
                {
                    rubrik: 'Derivera f med kvotregeln',
                    varfor: '$f$ är en kvot av två funktioner, så kvotregeln används med täljaren ' +
                        '$ax + b$ (derivatan $a$) och nämnaren $x + 1$ (derivatan $1$): ' +
                        '$f\'(x) = \\dfrac{(\\text{täljarens derivata}) \\cdot (\\text{nämnaren}) - ' +
                        '(\\text{täljaren}) \\cdot (\\text{nämnarens derivata})}{(\\text{nämnaren})^2}$.',
                    text: '$$f\'(x) = \\dfrac{a \\cdot (x + 1) - (ax + b) \\cdot 1}{(x + 1)^2}$$',
                },
                {
                    rubrik: 'Förenkla derivatans täljare',
                    varfor: 'Multiplicera in $a$ i parentesen och byt tecken på termerna i den ' +
                        'parentes som har minus framför. Termerna $ax$ och $-ax$ tar ut varandra.',
                    text: '$$f\'(x) = \\dfrac{ax + a - ax - b}{(x + 1)^2} = \\dfrac{a - b}{(x + 1)^2}$$',
                },
                {
                    rubrik: 'Använd villkoret f′(1) = 3',
                    varfor: 'Sätt in $x = 1$ i derivatan. Nämnaren blir $(1 + 1)^2 = 4$, och ' +
                        'villkoret ger den andra ekvationen.',
                    text: '$$f\'(1) = \\dfrac{a - b}{(1 + 1)^2} = \\dfrac{a - b}{4}$$\n\n' +
                        '$$\\dfrac{a - b}{4} = 3 \\quad \\Longleftrightarrow \\quad a - b = 12$$',
                },
                {
                    rubrik: 'Lös ekvationssystemet',
                    varfor: 'Adderas ekvationerna försvinner $b$, eftersom $b$ och $-b$ tar ut ' +
                        'varandra. Därefter ger den första ekvationen $b$.',
                    text: '$$\\left\\{ \\begin{array}{l} a + b = 8 \\\\ a - b = 12 \\end{array} \\right.$$\n\n' +
                        '$$(a + b) + (a - b) = 8 + 12 \\quad \\Longleftrightarrow \\quad 2a = 20 ' +
                        '\\quad \\Longleftrightarrow \\quad a = 10$$\n\n' +
                        '$$10 + b = 8 \\quad \\Longleftrightarrow \\quad b = -2$$',
                },
                {
                    rubrik: 'Kontrollera båda villkoren',
                    varfor: 'Med $a = 10$ och $b = -2$ är $f(x) = \\dfrac{10x - 2}{x + 1}$ och ' +
                        '$f\'(x) = \\dfrac{12}{(x + 1)^2}$. Båda villkoren ska stämma.',
                    text: '$$f(1) = \\dfrac{10 - 2}{2} = 4 \\qquad \\checkmark \\qquad\\qquad ' +
                        'f\'(1) = \\dfrac{12}{4} = 3 \\qquad \\checkmark$$',
                },
            ],
            svar: '$a = 10$ och $b = -2$',
            bedomning: [
                ['Godtagbar ansats, anger ett samband mellan $a$ och $b$ samt deriverar $f$ korrekt', '+C'],
                ['med i övrigt godtagbar lösning med korrekt svar ($a = 10$ och $b = -2$)', '+C'],
                ['Lösningen kommuniceras på C-nivå', '+C'],
            ],
        },

        {
            nr: 18, del: 'C', poang: [0, 0, 2], omrade: 'Trigonometri: subtraktionsformel och bevis',
            genomgangar: ['ma4-1.8', 'ma4-1.3'],
            fraga: 'Visa att ekvationen $\\sin v \\cos 40^\\circ = \\sin v + \\cos v \\sin 40^\\circ$ ' +
                'saknar lösningar i intervallet $0^\\circ \\leq v \\leq 90^\\circ$',
            figur: null,
            steg: [
                {
                    rubrik: 'Samla termerna med 40° i vänsterledet',
                    varfor: 'Vänsterledet $\\sin v \\cos 40^\\circ$ påminner om en del av ' +
                        'subtraktionsformeln för sinus. Subtraheras $\\cos v \\sin 40^\\circ$ från båda ' +
                        'led får vänsterledet precis den formens utseende.',
                    text: '$$\\sin v \\cos 40^\\circ - \\cos v \\sin 40^\\circ = \\sin v$$',
                },
                {
                    rubrik: 'Använd subtraktionsformeln för sinus',
                    varfor: 'Subtraktionsformeln $\\sin(\\alpha - \\beta) = \\sin \\alpha \\cos \\beta - ' +
                        '\\cos \\alpha \\sin \\beta$ med $\\alpha = v$ och $\\beta = 40^\\circ$ gör om ' +
                        'vänsterledet till en enda sinusterm.',
                    text: '$$\\sin(v - 40^\\circ) = \\sin v$$',
                },
                {
                    rubrik: 'Ställ upp de två fallen',
                    varfor: 'Två vinklar har samma sinusvärde om de hör till samma punkt på ' +
                        'enhetscirkeln, eller till två punkter som är spegelbilder i $y$-axeln ' +
                        '(samma höjd). I det andra fallet är den ena vinkeln $180^\\circ$ minus den andra. ' +
                        'Varje helt varv, $n \\cdot 360^\\circ$, ger samma punkt igen.',
                    text: '$$v - 40^\\circ = v + n \\cdot 360^\\circ \\qquad \\text{eller} \\qquad ' +
                        'v - 40^\\circ = 180^\\circ - v + n \\cdot 360^\\circ$$\n\n' +
                        'där $n$ är ett heltal.',
                    figur: 'u18-s3',
                },
                {
                    rubrik: 'Visa att det första fallet är omöjligt',
                    varfor: 'Subtraheras $v$ från båda led försvinner $v$ helt. Kvar blir ett ' +
                        'påstående om $n$ som inget heltal uppfyller.',
                    text: '$$v - 40^\\circ = v + n \\cdot 360^\\circ \\quad \\Longleftrightarrow \\quad ' +
                        '-40^\\circ = n \\cdot 360^\\circ$$\n\n' +
                        'Högerledet $n \\cdot 360^\\circ$ är ett helt antal varv: $0^\\circ$, $\\pm 360^\\circ$, ' +
                        '$\\pm 720^\\circ$ och så vidare, aldrig $-40^\\circ$. Fallet ger inga lösningar.',
                },
                {
                    rubrik: 'Lös det andra fallet',
                    varfor: 'Samla $v$ i vänsterledet och gradtalen i högerledet, och dividera ' +
                        'sedan med $2$. Periodtermen delas också med $2$.',
                    text: '$$v - 40^\\circ = 180^\\circ - v + n \\cdot 360^\\circ$$\n\n' +
                        '$$2v - 40^\\circ = 180^\\circ + n \\cdot 360^\\circ$$\n\n' +
                        '$$2v = 220^\\circ + n \\cdot 360^\\circ$$\n\n' +
                        '$$\\dfrac{2v}{2} = \\dfrac{220^\\circ + n \\cdot 360^\\circ}{2}$$\n\n' +
                        '$$v = \\dfrac{220^\\circ}{2} + \\dfrac{n \\cdot 360^\\circ}{2} = 110^\\circ + n \\cdot 180^\\circ$$',
                },
                {
                    rubrik: 'Pröva lösningarna mot intervallet',
                    varfor: 'Lösningarna ligger $180^\\circ$ isär. Den närmaste uppåt är $110^\\circ$ ' +
                        'och den närmaste nedåt är $-70^\\circ$, och ingen av dem ligger mellan ' +
                        '$0^\\circ$ och $90^\\circ$.',
                    text: '$$n = -1:\\ v = -70^\\circ \\qquad\\qquad n = 0:\\ v = 110^\\circ$$\n\n' +
                        'Ingen lösning hamnar i intervallet $0^\\circ \\leq v \\leq 90^\\circ$, så ' +
                        'ekvationen saknar lösningar där.',
                },
            ],
            svar: 'Ekvationen kan skrivas $\\sin(v - 40^\\circ) = \\sin v$. Den har bara lösningarna ' +
                '$v = 110^\\circ + n \\cdot 180^\\circ$, och ingen av dem ligger i intervallet ' +
                '$0^\\circ \\leq v \\leq 90^\\circ$.',
            bedomning: [
                ['Godtagbar ansats, till exempel skriver om ekvationen med subtraktionssatsen för sinus, $\\sin(v - 40^\\circ) = \\sin v$', '+A'],
                ['med i övrigt godtagbart bevis', '+A'],
            ],
        },

        {
            nr: 19, del: 'C', poang: [0, 0, 2], omrade: 'Primitiva funktioner och derivata',
            genomgangar: ['ma4-3.1', 'ma4-2.7', 'ma4-2.3'],
            fraga: 'Funktionen $f$ har en primitiv funktion $F(x) = 3x \\ln x$ och ' +
                'funktionen $g$ har en primitiv funktion $G(x) = x(\\ln x)^2 + 3x$.\n\n' +
                'Bestäm rötterna till ekvationen $f(x) = g(x)$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Bestäm f genom att derivera F',
                    varfor: 'Att $F$ är en primitiv funktion till $f$ betyder att $F\'(x) = f(x)$. ' +
                        '$3x \\ln x$ är en produkt, så produktregeln används. Derivatan av $\\ln x$ ' +
                        'är $\\dfrac{1}{x}$.',
                    text: '$$f(x) = F\'(x) = 3 \\cdot \\ln x + 3x \\cdot \\dfrac{1}{x} = 3\\ln x + 3$$',
                },
                {
                    rubrik: 'Bestäm g genom att derivera G',
                    varfor: 'Termen $x(\\ln x)^2$ är en produkt. Faktorn $(\\ln x)^2$ deriveras med ' +
                        'kedjeregeln: yttre derivatan $2\\ln x$ gånger inre derivatan $\\dfrac{1}{x}$.',
                    text: '$$g(x) = G\'(x) = 1 \\cdot (\\ln x)^2 + x \\cdot 2\\ln x \\cdot \\dfrac{1}{x} + 3 ' +
                        '= (\\ln x)^2 + 2\\ln x + 3$$',
                },
                {
                    rubrik: 'Ställ upp ekvationen och samla allt i ett led',
                    varfor: 'Subtrahera först $3$ och sedan $3\\ln x$ från båda led. Då försvinner ' +
                        'konstanterna och ekvationen kan faktoriseras.',
                    text: '$$3\\ln x + 3 = (\\ln x)^2 + 2\\ln x + 3$$\n\n' +
                        '$$3\\ln x = (\\ln x)^2 + 2\\ln x$$\n\n' +
                        '$$0 = (\\ln x)^2 - \\ln x$$',
                },
                {
                    rubrik: 'Bryt ut ln x',
                    varfor: 'Båda termerna har faktorn $\\ln x$. Nollproduktmetoden ger sedan två ' +
                        'ekvationer.',
                    text: '$$0 = \\ln x\\,(\\ln x - 1)$$\n\n' +
                        '$$\\ln x = 0 \\qquad \\text{eller} \\qquad \\ln x - 1 = 0$$',
                },
                {
                    rubrik: 'Lös ekvationerna med logaritmens definition',
                    varfor: '$\\ln x = c$ betyder att $x = e^c$. Båda rötterna är positiva, så de ' +
                        'ligger i definitionsmängden för $\\ln x$ ($x > 0$).',
                    text: '$$\\ln x = 0 \\quad \\Longleftrightarrow \\quad x = e^0 = 1$$\n\n' +
                        '$$\\ln x - 1 = 0 \\quad \\Longleftrightarrow \\quad \\ln x = 1 \\quad ' +
                        '\\Longleftrightarrow \\quad x = e^1 = e$$',
                },
            ],
            svar: '$x_1 = 1$ och $x_2 = e$',
            bedomning: [
                ['Godtagbar ansats, bestämmer $G\'(x) = (\\ln x)^2 + \\dfrac{2x \\ln x}{x} + 3$', '+A'],
                ['med i övrigt godtagbar lösning med korrekt svar ($x_1 = 1$ och $x_2 = e$)', '+A'],
            ],
        }
    );
})();

// Fysiklabbet: NP Ma 4 VT 2022, delprov D (uppgift 20–27).
// Digitala verktyg är tillåtna: lösningarna visar GeoGebra-kommandon där
// verktyget gör jobbet, men förklarar alltid matematiken bakom.
// Dataformat: se data/np/RIKTLINJER.md. Figurerna genereras av
// .claude/np-figs/gen-ma4-vt2022-D.js (data/np/ma4-vt2022-figurer-D.js),
// pennlösningarna ligger i data/np/ma4-vt2022-delD-penna.js.
(function () {
    var P = window.NP_PROV && window.NP_PROV['ma4-vt2022'];
    if (!P) return;
    P.uppgifter.push(

        {
            nr: 20, del: 'D', poang: [1, 0, 0], omrade: 'Trigonometri: grader och radianer',
            genomgangar: ['ma4-1.5', 'ma4-1.10'],
            fraga: 'Yosef och Zara ritar kurvan $y = \\sin x$ på sina digitala verktyg. När de ' +
                'jämför sina kurvor upptäcker de att kurvorna ser olika ut. Se figur.\n\n' +
                'Förklara varför kurvornas utseende skiljer sig åt på detta sätt.',
            figur: 'u20',
            steg: [
                {
                    rubrik: 'Se var Yosefs kurva har sin topp',
                    varfor: 'Funktionen $\\sin x$ har sitt största värde $1$ när vinkeln är $90^\\circ$, ' +
                        'eller $\\dfrac{\\pi}{2} \\approx 1{,}57$ i radianer. Yosefs kurva når ' +
                        '$y = 1$ först vid $x = 90$, och den hinner inte ens en halv period på ' +
                        'figurens $100$&nbsp;enheter.',
                    text: 'Yosefs kurva: $\\sin 90^\\circ = 1$, så hans verktyg tolkar $x$ som ett ' +
                        'vinkelmått i **grader**. En hel period är då $360^\\circ$.',
                    figur: 'u20-s1',
                },
                {
                    rubrik: 'Mät perioden på Zaras kurva',
                    varfor: 'Zaras kurva upprepar sig många gånger på samma sträcka. Avståndet ' +
                        'mellan två toppar är drygt $6$&nbsp;enheter, och det är precis ' +
                        '$2\\pi \\approx 6{,}28$, perioden för $\\sin x$ när $x$ mäts i radianer.',
                    text: 'Zaras kurva: perioden är $2\\pi \\approx 6{,}28$, så hennes verktyg ' +
                        'tolkar $x$ som ett vinkelmått i **radianer**. På $100$&nbsp;enheter hinner ' +
                        'kurvan $\\dfrac{100}{2\\pi} \\approx 16$&nbsp;perioder.',
                    figur: 'u20-s2',
                },
                {
                    rubrik: 'Dra slutsatsen',
                    varfor: 'Funktionen är densamma, men verktygen är inställda på olika ' +
                        'vinkelmått. Samma tal $x$ betyder därför olika stora vinklar: $x = 90$ ' +
                        'är $90^\\circ$ för Yosef men $90$&nbsp;radianer (drygt $14$&nbsp;varv) för Zara.',
                    text: 'Kurvorna ser olika ut eftersom verktygen använder olika vinkelmått: ' +
                        'Yosefs verktyg räknar i grader och Zaras i radianer.',
                },
            ],
            svar: 'Verktygen är inställda på olika vinkelmått. Yosefs verktyg räknar i grader ' +
                '(perioden är $360^\\circ$, toppen ligger vid $x = 90$) och Zaras i radianer ' +
                '(perioden är $2\\pi \\approx 6{,}28$).',
            bedomning: [
                ['Godtagbart svar där det framgår att graferna ritas med olika vinkelmått', '+E'],
            ],
        },

        {
            nr: 21, del: 'D', poang: [2, 0, 0], omrade: 'Integraler: area mellan två kurvor',
            genomgangar: ['ma4-3.4', 'ma4-3.1'],
            fraga: 'Figuren visar ett gråmarkerat område som begränsas av $y$-axeln, linjen ' +
                '$x = 1{,}9$ samt kurvorna $y = 3x^2$ och $y = 4x^3 + k$ där $k$ är en positiv ' +
                'konstant.\n\n' +
                'För ett visst värde på $k$ är arean av det gråmarkerade området 13&nbsp;areaenheter.\n\n' +
                'Bestäm detta värde på $k$. Svara med minst en decimal.',
            figur: 'u21',
            steg: [
                {
                    rubrik: 'Teckna arean som en integral',
                    varfor: 'Arean mellan två kurvor är integralen av **övre minus undre** kurva. ' +
                        'Övre kurvan är $y = 4x^3 + k$ och undre $y = 3x^2$, och området sträcker ' +
                        'sig från $y$-axeln ($x = 0$) till linjen $x = 1{,}9$.',
                    text: '$$\\int_{0}^{1{,}9} \\left( 4x^3 + k - 3x^2 \\right) \\mathrm{d}x = 13$$',
                    figur: 'u21-s1',
                },
                {
                    rubrik: 'Bestäm en primitiv funktion',
                    varfor: 'Ta fram den primitiva funktionen term för term. Konstanten $k$ ' +
                        'behandlas som vilket tal som helst: dess primitiva funktion är $kx$.',
                    text: '$$\\Big[ x^4 + kx - x^3 \\Big]_{0}^{1{,}9} = 13$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Den undre gränsen $0$ gör varje term till noll, så bara den övre ' +
                        'gränsen bidrar.',
                    text: '$$1{,}9^4 + 1{,}9k - 1{,}9^3 = 13$$\n\n' +
                        '$$13{,}0321 + 1{,}9k - 6{,}859 = 13$$\n\n' +
                        '$$6{,}1731 + 1{,}9k = 13$$',
                },
                {
                    rubrik: 'Lös ut k',
                    varfor: 'Nu återstår en vanlig förstagradsekvation: subtrahera $6{,}1731$ ' +
                        'från båda led och dividera sedan med $1{,}9$.',
                    text: '$$6{,}1731 + 1{,}9k \\mathbin{\\boldsymbol{-}} \\boldsymbol{6{,}1731} = ' +
                        '13 \\mathbin{\\boldsymbol{-}} \\boldsymbol{6{,}1731}$$\n\n' +
                        '$$1{,}9k = 6{,}8269$$\n\n' +
                        '$$\\dfrac{1{,}9k}{\\boldsymbol{1{,}9}} = \\dfrac{6{,}8269}{\\boldsymbol{1{,}9}}$$\n\n' +
                        '$$k = 3{,}593\\ldots \\approx 3{,}6$$\n\n' +
                        'Med digitalt verktyg går det också direkt, till exempel i GeoGebras ' +
                        'CAS-fönster: `Lös(Integral(4x^3 + k - 3x^2, 0, 1.9) = 13, k)` ger ' +
                        '$k \\approx 3{,}59$.\n\n' +
                        '**Kontroll:** för $k = 3{,}6$ ligger $y = 4x^3 + k$ ovanför $y = 3x^2$ i ' +
                        'hela intervallet, precis som figuren visar.',
                },
            ],
            svar: '$k \\approx 3{,}6$',
            bedomning: [
                ['Godtagbar ansats, till exempel tecknar ekvationen $\\displaystyle\\int_0^{1{,}9} (4x^3 + k - 3x^2)\\,\\mathrm{d}x = 13$', '+E'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($3{,}6$)', '+E'],
            ],
        },

        {
            nr: 22, del: 'D', poang: [3, 0, 0], omrade: 'Trigonometrisk modell och derivata',
            genomgangar: ['ma4-1.15', 'ma4-2.5', 'ma4-2.8'],
            fraga: 'I en solpanel omvandlas energi från solstrålningen till elektricitet.\n\n' +
                'Solveig har satt upp en liten solpanel och mäter hur mycket effekt som den ger ' +
                'under några molnfria dagar. Hon upptäcker att mätvärdena varierar periodiskt och ' +
                'anpassar en sinuskurva till mätvärdena. Ekvationen för sinuskurvan blir ' +
                '$y = 390\\sin(0{,}26x - 2{,}0) + 230$ där $x$ är tiden i timmar från klockan ' +
                '00.00 den 23 juli 2020 och $y$ är effekten i watt (W).\n\n' +
                'Figuren visar hennes mätvärden och den anpassade sinuskurvan.\n\n' +
                '**a)** Bestäm hur stor effekten var klockan 19.00 den 23 juli 2020. Svara med ' +
                'minst två värdesiffror. *Endast svar krävs*\n\n' +
                '**b)** Bestäm förändringshastigheten för effekten klockan 15.30 den 23 juli 2020 ' +
                'mätt i W/h. Svara med minst två värdesiffror.',
            figur: 'u22',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Översätt klockslaget till x',
                    varfor: '$x$ räknas i timmar från midnatt den 23 juli, så klockan 19.00 samma ' +
                        'dag är $x = 19$.',
                    text: '$$x = 19$$',
                },
                {
                    del: 'a',
                    rubrik: 'Sätt in x = 19 i modellen',
                    varfor: 'Effekten vid en viss tid är funktionsvärdet. Räkna i radianer: ' +
                        'vinkeln $0{,}26x - 2{,}0$ är ett rent tal, inte grader.',
                    text: '$$y(19) = 390\\sin(0{,}26 \\cdot 19 - 2{,}0) + 230 = ' +
                        '390\\sin 2{,}94 + 230 = 308{,}08\\ldots \\approx 310$$\n\n' +
                        'Effekten var cirka $310\\ \\mathrm{W}$ (två värdesiffror, som modellens ' +
                        'konstanter $0{,}26$ och $2{,}0$).',
                    figur: 'u22-s1',
                    delsvar: { del: 'a', text: 'Cirka $310\\ \\mathrm{W}$' },
                },
                {
                    del: 'b',
                    rubrik: 'Tolka förändringshastigheten som derivatan',
                    varfor: 'Hur snabbt effekten ändras vid en tidpunkt är derivatan $y\'(x)$ ' +
                        'där. Klockan 15.30 är halv fyra på eftermiddagen, alltså $x = 15{,}5$.',
                    text: '$$\\text{Sökt: } y\'(15{,}5)$$',
                },
                {
                    del: 'b',
                    rubrik: 'Derivera modellen',
                    varfor: 'Derivatan av $\\sin(kx + v)$ är $k\\cos(kx + v)$: inre derivatan $k$ ' +
                        'kommer ut som faktor (kedjeregeln). Konstanten $230$ har derivatan $0$.',
                    text: '$$y\'(x) = 390 \\cdot 0{,}26\\cos(0{,}26x - 2{,}0) = ' +
                        '101{,}4\\cos(0{,}26x - 2{,}0)$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna y′(15,5)',
                    varfor: 'Sätt in $x = 15{,}5$. I GeoGebra skriver man ' +
                        '`f(x) = 390 sin(0.26x - 2) + 230` och sedan `f\'(15.5)`, men samma värde ' +
                        'fås för hand ur derivatan ovan. Enheten blir watt per timme.',
                    text: '$$y\'(15{,}5) = 101{,}4\\cos(0{,}26 \\cdot 15{,}5 - 2{,}0) = ' +
                        '101{,}4\\cos 2{,}03 = -44{,}94\\ldots \\approx -45$$\n\n' +
                        'Minustecknet betyder att effekten minskar: solen är på väg ned på ' +
                        'eftermiddagen. Det stämmer med att kurvan lutar nedåt där i figuren.',
                    figur: 'u22-s2',
                    delsvar: { del: 'b', text: 'Cirka $-45\\ \\mathrm{W/h}$' },
                },
            ],
            svar: '**a)** Cirka $310\\ \\mathrm{W}$&emsp;&emsp;**b)** Cirka $-45\\ \\mathrm{W/h}$',
            bedomning: [
                ['a) Godtagbart svar ($310\\ \\mathrm{W}$)', '+E'],
                ['b) Godtagbar ansats, visar insikt om att derivatan ska bestämmas', '+E'],
                ['b) med i övrigt godtagbar lösning med godtagbart svar ($-45\\ \\mathrm{W/h}$; även svaret $-45$ ges poäng)', '+E'],
            ],
        },

        {
            nr: 23, del: 'D', poang: [0, 2, 0], omrade: 'Integraler: rotationsvolym',
            genomgangar: ['ma4-3.7'],
            fraga: 'Figuren visar ett gråmarkerat område som begränsas av kurvan ' +
                '$y = 9x - x^4 - 7$ och $x$-axeln. Det gråmarkerade området roteras runt ' +
                '$x$-axeln och bildar en rotationskropp.\n\n' +
                'Bestäm volymen av rotationskroppen. Svara med minst två decimaler.',
            figur: 'u23',
            steg: [
                {
                    rubrik: 'Bestäm integrationsgränserna',
                    varfor: 'Området går mellan kurvans två skärningspunkter med $x$-axeln, alltså ' +
                        'nollställena till $9x - x^4 - 7$. Fjärdegradsekvationen löses numeriskt, ' +
                        'till exempel med `NLös(9x - x^4 - 7 = 0)` eller verktyget Nollställen på ' +
                        'grafen. Behåll alla decimaler i verktyget, de används som gränser.',
                    text: '$$9x - x^4 - 7 = 0 \\quad \\Longleftrightarrow \\quad ' +
                        'x_1 = a \\approx 0{,}8307 \\qquad x_2 = b \\approx 1{,}6951$$',
                    figur: 'u23-s1',
                },
                {
                    rubrik: 'Teckna volymen med skivmetoden',
                    varfor: 'Varje tunn skiva vinkelrätt mot $x$-axeln blir vid rotationen en ' +
                        'cylinder med radien $y$ och tjockleken $\\mathrm{d}x$, alltså volymen ' +
                        '$\\pi y^2\\,\\mathrm{d}x$. Volymen är summan av alla skivor från $a$ till $b$.',
                    text: '$$V = \\pi \\int_{a}^{b} y^2\\, \\mathrm{d}x = ' +
                        '\\pi \\int_{a}^{b} \\left( 9x - x^4 - 7 \\right)^2 \\mathrm{d}x$$',
                    figur: 'u23-s2',
                },
                {
                    rubrik: 'Beräkna integralen digitalt',
                    varfor: 'Med gränserna sparade som punkter (eller tal) räknar verktyget ' +
                        'integralen direkt: `pi * Integral((9x - x^4 - 7)^2, a, b)`. Den går också ' +
                        'att räkna för hand genom att utveckla kvadraten, men gränserna är ' +
                        'ändå decimaltal.',
                    text: '$$\\int_{a}^{b} \\left( 9x - x^4 - 7 \\right)^2 \\mathrm{d}x = 1{,}5502\\ldots$$\n\n' +
                        '$$V = \\pi \\cdot 1{,}5502\\ldots = 4{,}8703\\ldots \\approx 4{,}87$$\n\n' +
                        '**Rimlighet:** området är knappt $0{,}9$ brett och som högst $1{,}8$ högt. ' +
                        'En cylinder med radien $1{,}8$ och längden $0{,}9$ har volymen ' +
                        '$\\pi \\cdot 1{,}8^2 \\cdot 0{,}9 \\approx 9$, och kroppen är smalare än ' +
                        'så nästan överallt. Drygt hälften av det är rimligt.',
                },
            ],
            svar: 'Volymen är cirka $4{,}87$&nbsp;volymenheter.',
            bedomning: [
                ['Godtagbar ansats, tecknar en integral för volymen med godtagbara integrationsgränser, till exempel $\\displaystyle\\int_{0{,}8}^{1{,}7} \\pi (9x - x^4 - 7)^2\\,\\mathrm{d}x$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($4{,}87$&nbsp;volymenheter; även svaret $4{,}87$ ges poäng)', '+C'],
            ],
        },

        {
            nr: 24, del: 'D', poang: [0, 2, 0], omrade: 'Täthetsfunktioner',
            genomgangar: ['ma4-3.6', 'ma4-2.6'],
            fraga: 'Eleverna i klass TE19C har varit på föreläsning och är därför sena till ' +
                'efterföljande matematiklektion som började klockan 12.00.\n\n' +
                'Tiden som en elev är sen till matematiklektionen har en sannolikhetsfördelning ' +
                'med täthetsfunktionen $f(t) = 0{,}02t \\cdot e^{-0{,}01t^2}$ där $t$ ' +
                'är antalet minuter som en elev är sen till matematiklektionen.\n\n' +
                'Bestäm hur många av klassens 32&nbsp;elever som hunnit till matematiklektionen ' +
                'klockan 12.05.',
            figur: null,
            steg: [
                {
                    rubrik: 'Teckna sannolikheten som en integral',
                    varfor: 'De som hunnit fram klockan 12.05 är högst $5$ minuter sena. För en ' +
                        'täthetsfunktion är sannolikheten arean under kurvan, alltså integralen ' +
                        'från $t = 0$ till $t = 5$, alltså $P(0 \\leq t \\leq 5)$ som i genomgången.',
                    text: '$$P(0 \\leq t \\leq 5) = \\int_{0}^{5} 0{,}02t \\cdot ' +
                        'e^{-0{,}01t^2}\\, \\mathrm{d}t$$',
                    figur: 'u24-s1',
                },
                {
                    rubrik: 'Hitta en primitiv funktion',
                    varfor: 'Faktorn $0{,}02t$ är precis inre derivatan av exponenten ' +
                        '$-0{,}01t^2$, bortsett från tecknet. Därför är ' +
                        '$F(t) = -e^{-0{,}01t^2}$ en primitiv funktion. Kontrollera med ' +
                        'kedjeregeln: $F\'(t) = -e^{-0{,}01t^2} \\cdot (-0{,}02t) = f(t)$.',
                    text: '$$\\int_{0}^{5} 0{,}02t \\cdot e^{-0{,}01t^2}\\, \\mathrm{d}t = ' +
                        '\\Big[ -e^{-0{,}01t^2} \\Big]_{0}^{5}$$',
                },
                {
                    rubrik: 'Sätt in gränserna',
                    varfor: 'Övre gränsen ger $-e^{-0{,}25}$ och undre gränsen ' +
                        '$-e^{0} = -1$. Med digitalt verktyg: ' +
                        '`Integral(0.02t exp(-0.01t^2), 0, 5)` ger samma värde.',
                    text: '$$P(0 \\leq t \\leq 5) = -e^{-0{,}01 \\cdot 25} - \\left( -e^{0} \\right) = ' +
                        '1 - e^{-0{,}25} = 0{,}2211\\ldots$$',
                },
                {
                    rubrik: 'Räkna om till antal elever',
                    varfor: 'Sannolikheten är andelen av klassen. Antalet blir andelen gånger $32$, ' +
                        'och ett antal elever avrundas till ett heltal.',
                    text: '$$32 \\cdot 0{,}2211\\ldots = 7{,}07\\ldots \\approx 7$$',
                },
            ],
            svar: 'Cirka $7$&nbsp;elever hade hunnit till lektionen klockan 12.05.',
            bedomning: [
                ['Godtagbar ansats, tecknar en relevant integral, till exempel $\\displaystyle\\int_0^5 0{,}02t \\cdot e^{-0{,}01t^2}\\,\\mathrm{d}t$', '+C'],
                ['med i övrigt godtagbar lösning med godtagbart svar ($7$)', '+C'],
            ],
        },

        {
            nr: 25, del: 'D', poang: [1, 1, 3], omrade: 'Trigonometrisk modell och integral',
            genomgangar: ['ma4-1.15', 'ma4-1.4', 'ma4-3.5'],
            fraga: 'Under ett blåsigt dygn kan vindhastigheten vid ett vindkraftverk beskrivas ' +
                'med modellen\n\n' +
                '$$v(x) = 11\\sin(0{,}11x - 0{,}89) + 28, \\quad 0 \\leq x \\leq 24$$\n\n' +
                'där $v$ är vindhastigheten i&nbsp;km/h och $x$ är tiden i timmar från klockan 00.00.\n\n' +
                '**a)** Bestäm den högsta vindhastigheten under dygnet. *Endast svar krävs*\n\n' +
                'Vid vindhastigheter över 36&nbsp;km/h vinklas rotorbladen för att minska slitage.\n\n' +
                '**b)** Bestäm hur lång tid som vindhastigheten är över 36&nbsp;km/h under det ' +
                'aktuella dygnet.\n\n' +
                'Vid vindhastigheter mellan 0 och 36&nbsp;km/h kan mängden elenergi som produceras ' +
                'beräknas med hjälp av sambandet $P(v) = 0{,}42 \\cdot v^3$ där $P(v)$ är mängden ' +
                'producerad elenergi per timme i MJ/h och där $v$ är vindhastigheten i km/h.\n\n' +
                'Vid vindhastigheter över 36&nbsp;km/h är produktionen av elenergi per timme lika stor ' +
                'som för vindhastigheten 36&nbsp;km/h.\n\n' +
                '**c)** Bestäm den totala mängden elenergi som vindkraftverket producerar under ' +
                'dygnet.',
            figur: 'u25',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Använd att sinus som mest är 1',
                    varfor: 'Sinusfaktorn varierar mellan $-1$ och $1$, så $v$ är som störst när ' +
                        '$\\sin(0{,}11x - 0{,}89) = 1$. Men det måste också hända under dygnet: ' +
                        '$0{,}11x - 0{,}89 = \\dfrac{\\pi}{2}$ ger $x \\approx 22{,}4$, som ligger ' +
                        'inom $0 \\leq x \\leq 24$.',
                    text: '$$v_{\\max} = 11 \\cdot 1 + 28 = 39$$',
                    figur: 'u25-s1',
                    delsvar: { del: 'a', text: '$39\\ \\mathrm{km/h}$' },
                },
                {
                    del: 'b',
                    rubrik: 'Ställ upp ekvationen v(x) = 36',
                    varfor: 'Tiden över $36\\ \\mathrm{km/h}$ börjar och slutar där vindhastigheten är exakt ' +
                        '$36\\ \\mathrm{km/h}$. Lös först ut sinusfaktorn: subtrahera $28$ från båda led ' +
                        'och dividera sedan båda led med $11$.',
                    text: '$$11\\sin(0{,}11x - 0{,}89) + 28 = 36$$\n\n' +
                        '$$11\\sin(0{,}11x - 0{,}89) + 28 \\mathbin{\\boldsymbol{-}} \\boldsymbol{28} = ' +
                        '36 \\mathbin{\\boldsymbol{-}} \\boldsymbol{28}$$\n\n' +
                        '$$11\\sin(0{,}11x - 0{,}89) = 8$$\n\n' +
                        '$$\\dfrac{11\\sin(0{,}11x - 0{,}89)}{\\boldsymbol{11}} = \\dfrac{8}{\\boldsymbol{11}}$$\n\n' +
                        '$$\\sin(0{,}11x - 0{,}89) = \\dfrac{8}{11}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös den trigonometriska ekvationen',
                    varfor: 'Sinus har värdet $\\dfrac{8}{11}$ för två vinklar per varv: ' +
                        '$\\arcsin \\dfrac{8}{11} = 0{,}8143\\ldots$ och ' +
                        '$\\pi - 0{,}8143\\ldots = 2{,}3272\\ldots$, plus hela varv $n \\cdot 2\\pi$. ' +
                        'Varje gren löses sedan som en vanlig ekvation: addera $0{,}89$ till båda led ' +
                        'och dividera båda led med $0{,}11$.',
                    text: '$$0{,}11x - 0{,}89 = \\arcsin \\dfrac{8}{11} = 0{,}8143\\ldots$$\n\n' +
                        '$$0{,}11x - 0{,}89 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0{,}89} = ' +
                        '0{,}8143\\ldots \\mathbin{\\boldsymbol{+}} \\boldsymbol{0{,}89}$$\n\n' +
                        '$$0{,}11x = 1{,}7043\\ldots$$\n\n' +
                        '$$\\dfrac{0{,}11x}{\\boldsymbol{0{,}11}} = \\dfrac{1{,}7043\\ldots}{\\boldsymbol{0{,}11}}$$\n\n' +
                        '$$x = 15{,}494\\ldots$$\n\n' +
                        'Ett helt varv $2\\pi$ i vinkeln motsvarar $\\dfrac{2\\pi}{0{,}11} = 57{,}1\\ldots$ ' +
                        'timmar, så alla lösningar i den grenen är\n\n' +
                        '$$x = 15{,}494\\ldots + n \\cdot 57{,}1\\ldots$$\n\n' +
                        'Den andra grenen löses på samma sätt:\n\n' +
                        '$$0{,}11x - 0{,}89 = \\pi - \\arcsin \\dfrac{8}{11} = 2{,}3272\\ldots$$\n\n' +
                        '$$0{,}11x - 0{,}89 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0{,}89} = ' +
                        '2{,}3272\\ldots \\mathbin{\\boldsymbol{+}} \\boldsymbol{0{,}89}$$\n\n' +
                        '$$0{,}11x = 3{,}2172\\ldots$$\n\n' +
                        '$$\\dfrac{0{,}11x}{\\boldsymbol{0{,}11}} = \\dfrac{3{,}2172\\ldots}{\\boldsymbol{0{,}11}}$$\n\n' +
                        '$$x = 29{,}247\\ldots + n \\cdot 57{,}1\\ldots$$\n\n' +
                        'Inom $0 \\leq x \\leq 24$ finns bara $x = 15{,}494\\ldots$ ' +
                        '(Grafiskt i GeoGebra: `A = Skärning(v, y = 36)` ger samma punkt $A$.)',
                },
                {
                    del: 'b',
                    rubrik: 'Läs av när vinden är över 36 km/h',
                    varfor: 'Vid midnatt är $v(0) \\approx 19{,}5$, alltså under $36$. Kurvan ' +
                        'passerar $36$ uppåt vid $x = 15{,}494\\ldots$ och vänder inte ned under ' +
                        '$36$ igen före dygnets slut, eftersom nästa lösning $x = 29{,}247\\ldots$ ' +
                        'ligger efter midnatt ($v(24) \\approx 38{,}8$).',
                    text: '$$24 - 15{,}494\\ldots = 8{,}506\\ldots \\approx 8{,}5\\ \\text{h}$$',
                    figur: 'u25-s2',
                    delsvar: { del: 'b', text: 'Cirka $8{,}5$&nbsp;timmar (från cirka klockan 15.30 till midnatt)' },
                },
                {
                    del: 'c',
                    rubrik: 'Uttryck produktionen per timme som funktion av tiden',
                    varfor: '$P$ beror av vindhastigheten, och vindhastigheten beror av tiden. ' +
                        'Sätt därför in $v(x)$ i $P(v)$, så att produktionen per timme blir en ' +
                        'funktion av $x$. Över $36\\ \\mathrm{km/h}$, alltså efter $x = 15{,}494\\ldots$, är ' +
                        'produktionen konstant.',
                    text: '$$0 \\leq x \\leq 15{,}494\\ldots: \\quad ' +
                        'P = 0{,}42 \\cdot \\left( 11\\sin(0{,}11x - 0{,}89) + 28 \\right)^3$$\n\n' +
                        '$$15{,}494\\ldots < x \\leq 24: \\quad ' +
                        'P = 0{,}42 \\cdot 36^3 = 19\\,595{,}52\\ \\mathrm{MJ/h}$$',
                    figur: 'u25-s3',
                },
                {
                    del: 'c',
                    rubrik: 'Teckna den totala energin',
                    varfor: 'Produktionen per timme (MJ/h) gånger tid (h) ger energi (MJ). När ' +
                        'produktionen ändras hela tiden blir summan en integral, arean under ' +
                        'kurvan i figuren. Den konstanta delen är en rektangel.',
                    text: '$$E = \\int_{0}^{15{,}494\\ldots} 0{,}42 \\cdot \\left( 11\\sin(0{,}11x - 0{,}89) ' +
                        '+ 28 \\right)^3 \\mathrm{d}x + 19\\,595{,}52 \\cdot (24 - 15{,}494\\ldots)$$',
                },
                {
                    del: 'c',
                    rubrik: 'Beräkna och summera',
                    varfor: 'Integralen räknas digitalt, med skärningspunkten $A$ från b) som övre ' +
                        'gräns: `Integral(0.42 (11 sin(0.11x - 0.89) + 28)^3, 0, x(A))`. ' +
                        'Modellens konstanter har två värdesiffror, så svaret avrundas därefter.',
                    text: '$$\\int_{0}^{15{,}494\\ldots} \\ldots \\, \\mathrm{d}x = 150\\,958{,}5\\ldots ' +
                        '\\qquad 19\\,595{,}52 \\cdot 8{,}506\\ldots = 166\\,679{,}5\\ldots$$\n\n' +
                        '$$E = 150\\,958{,}5\\ldots + 166\\,679{,}5\\ldots = 317\\,638\\ldots ' +
                        '\\approx 320\\,000\\ \\mathrm{MJ}$$\n\n' +
                        '**Rimlighet:** i genomsnitt drygt $13\\,000\\ \\mathrm{MJ/h}$ under $24$&nbsp;timmar. ' +
                        'Produktionen ligger mellan cirka $3\\,000\\ \\mathrm{MJ/h}$ och $19\\,600\\ \\mathrm{MJ/h}$, så ' +
                        'genomsnittet är rimligt.',
                    delsvar: { del: 'c', text: 'Cirka $320\\,000\\ \\mathrm{MJ}$' },
                },
            ],
            svar: '**a)** $39\\ \\mathrm{km/h}$&emsp;&emsp;**b)** Cirka $8{,}5$&nbsp;timmar' +
                '&emsp;&emsp;**c)** Cirka $320\\,000\\ \\mathrm{MJ}$',
            bedomning: [
                ['a) Korrekt svar ($39\\ \\mathrm{km/h}$)', '+E'],
                ['b) Godtagbar lösning med godtagbart svar ($8{,}5$&nbsp;timmar)', '+C'],
                ['c) Godtagbar ansats, visar insikt om att $P(v) = 0{,}42 \\cdot v^3$ ska integreras med avseende på $x$', '+A'],
                ['c) med i övrigt godtagbar lösning med godtagbart svar ($320\\,000\\ \\mathrm{MJ}$)', '+A'],
                ['Lösningen (deluppgift b och c) kommuniceras på A-nivå', '+A'],
            ],
        },

        {
            nr: 26, del: 'D', poang: [0, 1, 2], omrade: 'Trigonometrisk modell: bestämma konstanter',
            genomgangar: ['ma4-1.11', 'ma4-1.12', 'ma4-1.15'],
            endastSvar: true,
            fraga: 'Temperaturen i ett kylrum varierar periodiskt med perioden 4,0&nbsp;h, vilket beror ' +
                'på ett krånglande kylaggregat. Temperaturdifferensen mellan den högsta och den ' +
                'lägsta temperaturen är $5{,}2\\ ^\\circ\\mathrm{C}$. Se figur.\n\n' +
                'Klockan 08.30 är temperaturen maximal och en timme senare har den sjunkit till ' +
                '$3{,}9\\ ^\\circ\\mathrm{C}$.\n\n' +
                'Temperaturen i kylrummet kan beskrivas med modellen\n\n' +
                '$$T(t) = A \\cdot \\cos(Bt + C) + D$$\n\n' +
                'där $T(t)$ är temperaturen i $^\\circ\\mathrm{C}$ och $t$ är tiden i timmar från ' +
                'klockan 00.00.\n\n' +
                'Bestäm konstanterna $A$, $B$, $C$ och $D$.',
            figur: 'u26',
            steg: [
                {
                    rubrik: 'Bestäm amplituden A',
                    varfor: 'Amplituden är avståndet från mittlinjen till toppen, alltså halva ' +
                        'skillnaden mellan högsta och lägsta temperatur.',
                    text: '$$A = \\dfrac{5{,}2}{2} = 2{,}6$$',
                },
                {
                    rubrik: 'Bestäm B ur perioden',
                    varfor: 'För $\\cos(Bt + C)$ är perioden $\\dfrac{2\\pi}{B}$ (i radianer). ' +
                        'Perioden ska vara $4{,}0\\ \\mathrm{h}$.',
                    text: '$$\\dfrac{2\\pi}{B} = 4{,}0 \\quad \\Longleftrightarrow \\quad ' +
                        'B = \\dfrac{2\\pi}{4{,}0} = \\dfrac{\\pi}{2} \\approx 1{,}57$$',
                },
                {
                    rubrik: 'Bestäm mittlinjen D en kvarts period efter toppen',
                    varfor: 'En timme är en fjärdedels period. En fjärdedels period efter en topp ' +
                        'har cosinuskurvan gått ned till mittlinjen (där cosinus är noll). ' +
                        'Temperaturen $3{,}9\\ ^\\circ\\mathrm{C}$ klockan 09.30 är alltså mittlinjens ' +
                        'värde.',
                    text: '$$D = 3{,}9$$\n\n' +
                        '(Kontroll: högst $3{,}9 + 2{,}6 = 6{,}5$ och lägst $3{,}9 - 2{,}6 = 1{,}3$, ' +
                        'skillnaden $5{,}2$.)',
                    figur: 'u26-s1',
                },
                {
                    rubrik: 'Bestäm C ur tiden för maximum',
                    varfor: 'Cosinus är som störst, $1$, när vinkeln är $0$ (eller ett helt antal ' +
                        'varv $n \\cdot 2\\pi$). Maximum klockan 08.30 betyder $t = 8{,}5$, så ' +
                        '$B \\cdot 8{,}5 + C$ ska vara $0$ eller ett helt antal varv.',
                    text: '$$\\dfrac{\\pi}{2} \\cdot 8{,}5 + C = n \\cdot 2\\pi ' +
                        '\\quad \\Longleftrightarrow \\quad C = -4{,}25\\pi + n \\cdot 2\\pi$$\n\n' +
                        'Med $n = 2$ blir värdet enklast:\n\n' +
                        '$$C = -4{,}25\\pi + 4\\pi = -\\dfrac{\\pi}{4} \\approx -0{,}79$$\n\n' +
                        '(Även $C = -4{,}25\\pi \\approx -13{,}4$ ger samma kurva.)\n\n' +
                        '**Kontroll** med verktyget: $T(t) = 2{,}6\\cos\\left( \\dfrac{\\pi}{2}t - ' +
                        '\\dfrac{\\pi}{4} \\right) + 3{,}9$ ger $T(8{,}5) = 6{,}5$ (maximum) och ' +
                        '$T(9{,}5) = 3{,}9$.',
                },
            ],
            svar: '$A = 2{,}6$, $B = \\dfrac{\\pi}{2} \\approx 1{,}6$, $C = -\\dfrac{\\pi}{4} \\approx -0{,}8$ ' +
                'och $D = 3{,}9$ (i radianer; i grader blir $B = 90$ och $C = -45$).',
            bedomning: [
                ['Anger godtagbara värden för minst två av konstanterna', '+C'],
                ['med godtagbart värde för ytterligare minst en konstant', '+A'],
                ['med godtagbart svar (till exempel $A = 2{,}6$; $B = 1{,}6$; $C = -0{,}8$ och $D = 3{,}9$ om radianer används; $A = 2{,}6$; $B = 90{,}0$; $C = -45{,}0$ och $D = 3{,}9$ om grader används)', '+A'],
            ],
        },

        {
            nr: 27, del: 'D', poang: [0, 0, 3], omrade: 'Integraler: största intervall',
            genomgangar: ['ma4-3.2', 'ma4-3.3'],
            fraga: 'Låt $C = \\displaystyle\\int_{a}^{b} (7x - x^2 - 10)\\, \\mathrm{d}x$ där $a < b$.\n\n' +
                '**a)** Bestäm värdet av $(b-a)$ då $C$ antar sitt största värde. ' +
                '*Endast svar krävs*\n\n' +
                '**b)** Bestäm vilket värde $(b-a)$ maximalt kan anta då $C = 0$. Svara med ' +
                'minst en decimal.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Bestäm var integranden är positiv',
                    varfor: 'Integralen är arean ovanför $x$-axeln minus arean under den. ' +
                        'Grafen till $f(x) = 7x - x^2 - 10$ är en parabel som vänder nedåt, så den ' +
                        'ligger ovanför $x$-axeln mellan sina nollställen. Multiplicera båda led ' +
                        'med $-1$ så att $x^2$-termen blir positiv, och använd sedan *pq*-formeln.',
                    text: '$$7x - x^2 - 10 = 0$$\n\n' +
                        '$$(7x - x^2 - 10) \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{(-1)} = ' +
                        '0 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{(-1)}$$\n\n' +
                        '$$-7x + x^2 + 10 = 0 \\quad \\Longleftrightarrow \\quad x^2 - 7x + 10 = 0$$\n\n' +
                        '$$x = 3{,}5 \\pm \\sqrt{12{,}25 - 10} = 3{,}5 \\pm 1{,}5$$\n\n' +
                        '$$x_1 = 2 \\qquad x_2 = 5$$',
                },
                {
                    del: 'a',
                    rubrik: 'Välj gränserna som ger störst C',
                    varfor: 'Varje bit mellan $2$ och $5$ bidrar positivt, och varje bit utanför ' +
                        'bidrar negativt. $C$ blir alltså störst när vi integrerar exakt över ' +
                        'det positiva området: $a = 2$ och $b = 5$.',
                    text: '$$b - a = 5 - 2 = 3$$',
                    figur: 'u27-s1',
                    delsvar: { del: 'a', text: '$b - a = 3$' },
                },
                {
                    del: 'b',
                    rubrik: 'Inse att intervallet ska ligga symmetriskt kring x = 3,5',
                    varfor: 'Parabeln är symmetrisk kring $x = 3{,}5$ och är högst där. För en ' +
                        'given längd $b - a$ blir $C$ därför störst när intervallet ligger ' +
                        'symmetriskt kring $3{,}5$: flyttas det åt sidan byts en bit där kurvan ' +
                        'ligger högt mot en bit där den ligger lägre. Det längsta intervall som ' +
                        'kan ge $C = 0$ är alltså det symmetriska, $a = 3{,}5 - h$ och ' +
                        '$b = 3{,}5 + h$, där plusytan och minusytorna precis tar ut varandra.',
                    text: '$$C = \\int_{3{,}5 - h}^{3{,}5 + h} (7x - x^2 - 10)\\, \\mathrm{d}x = 0 ' +
                        '\\qquad b - a = 2h$$',
                    figur: 'u27-s2',
                },
                {
                    del: 'b',
                    rubrik: 'Skriv om integranden kring symmetrilinjen',
                    varfor: 'Med kvadratkomplettering syns symmetrin direkt: ' +
                        '$7x - x^2 - 10 = 2{,}25 - (x - 3{,}5)^2$. Då har ' +
                        '$(x - 3{,}5)^2$ den primitiva funktionen $\\dfrac{(x - 3{,}5)^3}{3}$ ' +
                        '(derivera och kontrollera: inre derivatan är $1$).',
                    text: '$$C = \\Big[ 2{,}25x - \\dfrac{(x - 3{,}5)^3}{3} \\Big]_{3{,}5 - h}^{3{,}5 + h}$$\n\n' +
                        '$$C = 2{,}25 \\cdot 2h - \\left( \\dfrac{h^3}{3} - \\dfrac{(-h)^3}{3} \\right) = ' +
                        '4{,}5h - \\dfrac{2h^3}{3}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Lös ekvationen C = 0',
                    varfor: 'Multiplicera båda led med $3$ så att bråket försvinner, och bryt ' +
                        'sedan ut $h$. Lösningen $h = 0$ är inget intervall ($a < b$), så ' +
                        'parentesen ska vara noll. Med verktyget: ' +
                        '`Lös(Integral(7x - x^2 - 10, 3.5 - h, 3.5 + h) = 0, h)` ger samma resultat.',
                    text: '$$C = 0 \\quad \\Longrightarrow \\quad 4{,}5h - \\dfrac{2h^3}{3} = 0$$\n\n' +
                        '$$\\left( 4{,}5h - \\dfrac{2h^3}{3} \\right) \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{3} = ' +
                        '0 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{3}$$\n\n' +
                        '$$13{,}5h - 2h^3 = 0 \\quad \\Longleftrightarrow \\quad h(13{,}5 - 2h^2) = 0$$\n\n' +
                        '$$13{,}5 - 2h^2 = 0$$\n\n' +
                        '$$13{,}5 - 2h^2 \\mathbin{\\boldsymbol{+}} \\boldsymbol{2h^2} = ' +
                        '0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{2h^2}$$\n\n' +
                        '$$13{,}5 = 2h^2$$\n\n' +
                        '$$\\dfrac{13{,}5}{\\boldsymbol{2}} = \\dfrac{2h^2}{\\boldsymbol{2}}$$\n\n' +
                        '$$6{,}75 = h^2$$\n\n' +
                        '$$h = \\pm\\sqrt{6{,}75} \\quad \\text{och eftersom } h > 0: \\quad ' +
                        'h = \\sqrt{6{,}75} = 2{,}598\\ldots$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna b − a',
                    varfor: 'Intervallet är $h$ åt vardera hållet från $3{,}5$, så längden är $2h$.',
                    text: '$$b - a = 2h = 2\\sqrt{6{,}75} = 5{,}196\\ldots \\approx 5{,}2$$\n\n' +
                        '(Gränserna blir $a \\approx 0{,}90$ och $b \\approx 6{,}10$. Ett längre ' +
                        'intervall ger $C < 0$ hur det än placeras.)',
                    delsvar: { del: 'b', text: '$b - a \\approx 5{,}2$' },
                },
            ],
            svar: '**a)** $b - a = 3$&emsp;&emsp;**b)** $b - a \\approx 5{,}2$',
            bedomning: [
                ['a) Korrekt svar ($3$)', '+A'],
                ['b) Godtagbar ansats, till exempel visar insikt i att integrationsgränserna ska väljas symmetriskt runt symmetrilinjen $x = 3{,}5$', '+A'],
                ['b) med i övrigt godtagbar lösning med godtagbart svar ($5{,}2$)', '+A'],
            ],
        }
    );
})();
