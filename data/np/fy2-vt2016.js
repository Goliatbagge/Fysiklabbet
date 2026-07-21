// Fysiklabbet — Kursprov Fysik 2, våren 2016, delprov A (teoriuppgifter).
// Uppgifter med fullständiga lösningar steg för steg.
//
// Dataformat och regler: se data/np/RIKTLINJER.md och huvudet i
// data/np/ma1c-vt2022.js. Kort: steg = [{ rubrik, varfor?, text, figur?,
// delsvar? }]; deluppgifter får del:'a' (aldrig "a)" i rubriken); varje
// deluppgift avslutas med delsvar; stegnumreringen börjar om per deluppgift.
//
// Delprov B (laborativ uppgift) ingår inte i det frisläppta materialet.
// Figurerna byggs upp i takt med lösningen — krafter och komposanter ritas
// ut en i taget (se t.ex. uppgift 2, 17 och 19).
//
// Källa: Skolverket/Umeå universitet, kursprov Fysik 2 VT 2016 (frisläppt).

window.NP_PROV = window.NP_PROV || {};
window.NP_PROV['fy2-vt2016'] = {
    id: 'fy2-vt2016',
    kurs: 'Fysik nivå 2',
    termin: 'VT 2016',
    namn: 'Kursprov Fysik 2, våren 2016',
    kort: 'Kursprov Fy 2 VT2016',
    intro: 'Det här är kursprovet i Fysik 2 från våren 2016 (Skolverket/Umeå universitet). ' +
        'Här finns delprov A (teoriuppgifter) — delprov B är en laborativ uppgift och ingår ' +
        'inte i det frisläppta materialet. Välj en uppgift, lös den själv, och klicka sedan ' +
        'fram lösningen ett steg i taget. Varje steg förklarar både vad som görs och varför, ' +
        'och figurerna byggs upp i takt med lösningen.',
    kravgranser: 'Provet (delprov A och B) ger totalt 60 poäng varav 20 E-, 21 C- och 19 A-poäng. ' +
        'Poängen skrivs (E/C/A). Gräns för provbetyget: E minst 14 poäng · ' +
        'D minst 23 poäng varav 6 på minst C-nivå · C minst 30 poäng varav 11 på minst C-nivå · ' +
        'B minst 38 poäng varav 5 på A-nivå · A minst 45 poäng varav 9 på A-nivå.',
    delprov: {
        A: {
            tid: '240 minuter',
            hjalpmedel: 'Linjal, formelsamling och digitala hjälpmedel (även dator utan tillgång till kommunikation)',
            hjalpmedelKort: 'Digitala verktyg tillåtna',
            beskrivning: 'Uppgift 1–6 kräver endast ett kort svar eller en kortare redovisning. ' +
                'Uppgift 7–19 kräver fullständiga redovisningar med beräkningar, motiveringar och figurer.',
        },
    },
    uppgifter: [

        // ================= UPPGIFT 1 =================
        {
            nr: 1, del: 'A', poang: [2, 0, 0], omrade: 'Värmestrålning — Stefan–Boltzmanns lag',
            endastSvar: true,
            fraga: 'Med ett teleskop upptäcker forskare en ny exoplanet. Via mätningar fås att planetens ' +
                'emittans är $230\\ \\mathrm{W/m^2}$. Antag att exoplaneten strålar som en svart kropp.\n\n' +
                'Beräkna yttemperaturen för exoplaneten.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp Stefan–Boltzmanns lag',
                    varfor: 'Emittansen $M$ är den effekt planeten strålar ut per kvadratmeter av sin yta. ' +
                        'För en svart kropp bestäms emittansen helt av yttemperaturen $T$ genom ' +
                        'Stefan–Boltzmanns lag — känner vi $M$ kan vi alltså räkna baklänges till $T$.',
                    text: '$$M = \\sigma \\cdot T^4$$',
                },
                {
                    rubrik: 'Lös ut temperaturen',
                    varfor: 'Temperaturen står i fjärde potens, så vi delar med $\\sigma$ och drar ' +
                        'fjärde roten (samma sak som att upphöja till $\\tfrac{1}{4}$). Mätvärdena är ' +
                        'redan i SI-enheter, så temperaturen kommer ut i kelvin.',
                    text: 'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        '\\sigma \\approx 5{,}67 \\cdot 10^{-8}\\ \\mathrm{W/(m^2 \\cdot K^4)}\\ \\text{(Stefan–Boltzmanns konstant)} \\\\ ' +
                        'M = 230\\ \\mathrm{W/m^2} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$T = \\left( \\dfrac{M}{\\sigma} \\right)^{\\frac{1}{4}} = ' +
                        '\\left( \\dfrac{230}{5{,}67 \\cdot 10^{-8}} \\right)^{\\frac{1}{4}}\\ \\mathrm{K} ' +
                        '\\approx 252{,}4\\ \\mathrm{K}$$',
                },
                {
                    rubrik: 'Avrunda och bedöm rimligheten',
                    varfor: 'Emittansen är given med två värdesiffror, så svaret avrundas till två. ' +
                        'En snabb rimlighetskoll: jordens medeltemperatur är cirka $288\\ \\mathrm{K}$, ' +
                        'så $250\\ \\mathrm{K}$ är en kall men fullt rimlig planettemperatur.',
                    text: '$$T \\approx 250\\ \\mathrm{K}$$\n\n(motsvarar ungefär $-23\\ \\mathrm{°C}$)',
                },
            ],
            svar: 'Exoplanetens yttemperatur är cirka $250\\ \\mathrm{K}$.',
            bedomning: [
                ['Godtagbar ansats, t.ex. ställer upp korrekt ekvation för beräkning av $T$', '+E'],
                ['med i övrigt godtagbar lösning och svar ($250\\ \\mathrm{K}$)', '+E'],
            ],
        },

        // ================= UPPGIFT 2 =================
        {
            nr: 2, del: 'A', poang: [1, 0, 0], omrade: 'Cirkulär rörelse — krafter i pendelrörelse',
            endastSvar: true,
            fraga: 'I en film svänger en tecknad seriefigur i ett rep från A till B. I filmen brister ' +
                'repet i läge B (se figur). Förklara varför det i verkligheten är osannolikt att repet ' +
                'brister i läge B.',
            figur: 'u2',
            steg: [
                {
                    rubrik: 'Rita ut tyngdkraften',
                    varfor: 'För att förstå var repet är mest ansträngt jämför vi krafterna i två lägen: ' +
                        'vändläget B och det nedersta läget. Vi börjar med den kraft som alltid finns — ' +
                        'tyngdkraften $F_\\mathrm{G}$. Den är lika stor i båda lägena och pekar rakt nedåt.',
                    text: 'Tyngdkraften $F_\\mathrm{G} = mg$ angriper i figurens tyngdpunkt och är ' +
                        'riktad rakt nedåt — lika stor i läge B som i nedersta läget.',
                    figur: 'u2-s1',
                },
                {
                    rubrik: 'Rita ut spännkraften i repet',
                    varfor: 'Repet kan bara dra längs sin egen riktning — spännkraften $F_\\mathrm{S}$ ' +
                        'pekar alltid från figuren mot upphängningspunkten. Det är den kraften som ' +
                        'avgör om repet brister.',
                    text: 'I läge B pekar $F_\\mathrm{S}$ snett uppåt längs repet. I nedersta läget ' +
                        'pekar $F_\\mathrm{S}$ rakt uppåt, rakt mot tyngdkraften.',
                    figur: 'u2-s2',
                },
                {
                    rubrik: 'Jämför lägena med hjälp av cirkelrörelsen',
                    varfor: 'Figuren rör sig i en cirkelbåge, och en cirkelrörelse kräver en resulterande ' +
                        'kraft riktad in mot cirkelns medelpunkt (centripetalkraft) — ju högre fart, ' +
                        'desto större kraft krävs. Farten är noll i vändläget B men störst längst ner.',
                    text: 'I **läge B** är farten noll — där behövs ingen centripetalkraft alls, och ' +
                        'repet bär bara komposanten av tyngdkraften längs repet: ' +
                        '$F_\\mathrm{S} = F_\\mathrm{G} \\cos\\alpha$, alltså *mindre* än $F_\\mathrm{G}$.\n\n' +
                        'I **nedersta läget** är farten störst. Repet ska där både bära hela tyngdkraften ' +
                        'och dessutom ge centripetalkraften uppåt:\n\n' +
                        '$$F_\\mathrm{S} = F_\\mathrm{G} + \\dfrac{m v^2}{r} > F_\\mathrm{G}$$',
                    figur: 'u2-s3',
                },
            ],
            svar: 'Spännkraften i repet är störst i det nedersta läget av svängningen — där borde repet ' +
                'brista, inte i läge B där farten är noll och spännkraften är som minst.',
            bedomning: [
                ['Godtagbar förklaring, t.ex. att spännkraften är störst i nedersta läget', '+E'],
            ],
        },

        // ================= UPPGIFT 3 =================
        {
            nr: 3, del: 'A', poang: [1, 1, 0], omrade: 'Dopplereffekt — rödförskjutning',
            endastSvar: true,
            fraga: 'Vid uppmätning av spektrallinjer från en stjärna förekommer en rödförskjutning av ' +
                'spektrumet. I diagrammet nedan visas rödförskjutningen för två absorptionslinjer ' +
                '(streckade linjer) för kalcium. Motsvarande icke rödförskjutna våglängder visas i ' +
                'diagrammet (Ca K och Ca H).\n\n' +
                'Rödförskjutningen i diagrammet kan ge information om stjärnan. Två av alternativen ' +
                'A – F är sådan information. Vilka **två**?\n\n' +
                'A. Stjärnans massa<br>B. Stjärnans hastighet<br>' +
                'C. Om stjärnan närmar sig eller avlägsnar sig från jorden<br>' +
                'D. Stjärnans acceleration<br>E. Stjärnans temperatur<br>F. Stjärnans storlek',
            figur: 'u3',
            steg: [
                {
                    rubrik: 'Tolka vad rödförskjutningen betyder',
                    varfor: 'Rödförskjutning är Dopplereffekt för ljus: när en ljuskälla rör sig bort ' +
                        'från oss "dras" vågorna ut och alla våglängder blir längre — spektrallinjerna ' +
                        'flyttas mot den röda änden av spektrumet.',
                    text: 'I diagrammet ligger de uppmätta absorptionslinjerna (streckade) vid *längre* ' +
                        'våglängder än laboratorievärdena Ca K och Ca H. Linjerna är alltså rödförskjutna ' +
                        '— stjärnan **avlägsnar sig** från jorden. Det är alternativ **C**.',
                    figur: 'u3-s1',
                },
                {
                    rubrik: 'Använd förskjutningens storlek',
                    varfor: 'Riktningen ges av åt vilket håll linjerna flyttats — men *hur mycket* de ' +
                        'flyttats bär också information. Ju snabbare källan rör sig, desto större blir ' +
                        'förskjutningen $\\Delta\\lambda$.',
                    text: 'Dopplersambandet $\\dfrac{\\Delta\\lambda}{\\lambda} = \\dfrac{v}{c}$ ger ' +
                        'stjärnans **hastighet** ur den uppmätta förskjutningen. Det är alternativ **B**.\n\n' +
                        'Massa, acceleration, temperatur och storlek kan däremot inte avläsas ur en ' +
                        'rödförskjutning. (Fler än två angivna svar ger inga poäng.)',
                },
            ],
            svar: '**B** (stjärnans hastighet) och **C** (om stjärnan närmar sig eller avlägsnar sig från jorden).',
            bedomning: [
                ['Minst ett korrekt svar, B eller C', '+E'],
                ['med ytterligare ett korrekt svar (B och C)', '+C'],
            ],
        },

        // ================= UPPGIFT 4 =================
        {
            nr: 4, del: 'A', poang: [1, 0, 0], omrade: 'Elektromagnetisk induktion',
            endastSvar: true,
            fraga: 'I vilket eller vilka av följande fall A – D uppstår en elektrisk ström i en ' +
                'horisontellt placerad metallring?\n\n' +
                'A. En ledare med konstant likström går genom ringens centrum.<br>' +
                'B. En vertikalt ställd stavmagnet faller genom ringens centrum.<br>' +
                'C. En vertikalt ställd stavmagnet är placerad i ringens centrum.<br>' +
                'D. En positivt laddad kula är placerad i ringens centrum.',
            figur: null,
            steg: [
                {
                    rubrik: 'Ställ upp villkoret för induktion',
                    varfor: 'En ström induceras i ringen bara om det magnetiska flödet genom ringen ' +
                        '*ändras* med tiden (induktionslagen). Ett konstant fält — hur starkt det än är — ' +
                        'inducerar ingenting.',
                    text: 'Frågan blir alltså: i vilket fall ändras magnetfältet genom ringen?',
                },
                {
                    rubrik: 'Pröva alternativen ett i taget',
                    varfor: 'Vi går igenom fallen och letar efter det enda där flödet genom ringen ändras.',
                    text: '**A.** Konstant likström ger ett konstant magnetfält — inget ändras, ingen ström.\n\n' +
                        '**B.** När magneten *faller* genom ringen ändras magnetfältet genom ringen hela ' +
                        'tiden — flödet ändras och en ström induceras.\n\n' +
                        '**C.** En stillastående magnet ger ett konstant fält — ingen ström.\n\n' +
                        '**D.** En stillastående laddning ger inget magnetfält alls — ingen ström.',
                    figur: 'u4-s1',
                },
            ],
            svar: '**B.** En vertikalt ställd stavmagnet faller genom ringens centrum — en inducerad ' +
                'ström fås då magnetfältet genom ringen förändras.',
            bedomning: [
                ['Korrekt svar (B)', '+E'],
            ],
        },

        // ================= UPPGIFT 5 =================
        {
            nr: 5, del: 'A', poang: [1, 1, 0], omrade: 'Magnetfält kring strömförande ledare',
            endastSvar: true,
            fraga: 'Två långa, raka ledare är placerade vinkelrätt mot varandra i samma plan (se figur). ' +
                'Lika stora strömmar flyter genom dem i angivna riktningar.\n\n' +
                'Markera i figuren var den resulterande magnetiska flödestätheten från de båda ledarna är 0.',
            figur: 'u5',
            steg: [
                {
                    rubrik: 'Bestäm fältriktningen från den vågräta ledaren',
                    varfor: 'Runt en rak ledare cirklar magnetfältet — riktningen fås med högerhandsregeln: ' +
                        'tummen i strömmens riktning, fingrarna visar fältets riktning. Vi märker ut ' +
                        'riktningen (in i eller ut ur planet) i varje kvadrant.',
                    text: 'Den vågräta ledaren har strömmen åt höger. Ovanför ledaren pekar fältet ' +
                        '**ut ur planet** ($\\odot$), nedanför **in i planet** ($\\otimes$).',
                    figur: 'u5-s1',
                },
                {
                    rubrik: 'Bestäm fältriktningen från den lodräta ledaren',
                    varfor: 'Samma högerhandsregel på den andra ledaren — sedan kan vi jämföra ' +
                        'riktningarna kvadrant för kvadrant.',
                    text: 'Den lodräta ledaren har strömmen uppåt. Till höger om ledaren pekar fältet ' +
                        '**in i planet** ($\\otimes$), till vänster **ut ur planet** ($\\odot$).',
                    figur: 'u5-s2',
                },
                {
                    rubrik: 'Hitta punkterna där fälten tar ut varandra',
                    varfor: 'Flödestätheten kan bara bli noll där de två fälten är *motriktade* och ' +
                        '*lika starka*. Fältstyrkan avtar med avståndet till ledaren, så lika starka blir ' +
                        'de precis där avstånden till båda ledarna är lika.',
                    text: 'Motriktade fält finns i kvadranten uppe till höger ($\\odot$ mot $\\otimes$) ' +
                        'och nere till vänster ($\\otimes$ mot $\\odot$). Där avstånden dessutom är lika ' +
                        '— längs diagonalen genom skärningspunkten — tar fälten ut varandra:\n\n' +
                        '$$B_\\mathrm{res} = 0 \\text{ längs linjen } y = x$$',
                    figur: 'u5-s3',
                },
            ],
            svar: 'Flödestätheten är noll längs diagonalen genom skärningspunkten, i de kvadranter där ' +
                'fälten är motriktade (uppe till höger och nere till vänster) — linjen $y = x$ i figuren.',
            bedomning: [
                ['Godtagbar ansats, markerar minst en punkt där flödestätheten är noll (och ingen felaktig punkt)', '+E'],
                ['med godtagbart ritad linje som visar alla punkter där flödestätheten är noll', '+C'],
            ],
        },

        // ================= UPPGIFT 6 =================
        {
            nr: 6, del: 'A', poang: [1, 1, 0], omrade: 'Induktion — virvelströmmar',
            endastSvar: true,
            fraga: 'En induktionshäll fungerar på så sätt att ett varierande magnetfält i hällen påverkar ' +
                'metallen i den kastrull som står på hällen.\n\n' +
                'Vad händer i kastrullens botten när man ställer den på hällen och vilken egenskap hos ' +
                'kastrullen gör att den blir varm?',
            figur: null,
            steg: [
                {
                    rubrik: 'Beskriv vad det varierande fältet gör',
                    varfor: 'Ett magnetfält som *varierar* inducerar strömmar i ledande material som finns ' +
                        'i fältet — det är induktionslagen igen, men nu är "ringen" kastrullens metallbotten.',
                    text: 'Det varierande magnetfältet inducerar strömmar (virvelströmmar) i kastrullens ' +
                        'botten.',
                },
                {
                    rubrik: 'Förklara varför strömmarna värmer kastrullen',
                    varfor: 'En ström genom ett material med resistans utvecklar värme ' +
                        '($P = R \\cdot I^2$) — precis som i ett vanligt värmeelement. Utan resistans ' +
                        'skulle strömmarna inte utveckla någon värme.',
                    text: 'Kastrullens botten har elektriskt motstånd (resistans). När de inducerade ' +
                        'strömmarna flyter genom metallen omvandlas elektrisk energi till värme — ' +
                        'kastrullen blir varm.',
                },
            ],
            svar: 'Det varierande magnetfältet inducerar strömmar i kastrullens botten. Kastrullen har ' +
                'elektriskt motstånd (resistans), så strömmarna utvecklar värme i metallen.',
            bedomning: [
                ['I huvudsak korrekta och utförliga resonemang kring induktion, t.ex. att varierande magnetfält ger upphov till strömmar', '+E'],
                ['med ett resonemang om att det finns ett elektriskt motstånd i kastrullen som leder till att den värms', '+C'],
            ],
        },

        // ================= UPPGIFT 7 =================
        {
            nr: 7, del: 'A', poang: [2, 0, 0], omrade: 'Ljusets brytning',
            fraga: 'Figuren visar hur de tre ljusstrålarna A, B och C infaller mot ett halvcirkelformat ' +
                'genomskinligt fast material.\n\n' +
                '**a)** Vilken av de inkommande strålarna A, B eller C hör ihop med den brutna strålen D? ' +
                'Motivera ditt svar.\n\n' +
                '**b)** Beräkna ljusets hastighet i det genomskinliga materialet.',
            figur: 'u7',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Se var brytningen sker',
                    varfor: 'Strålarna A, B och C går in genom den *böjda* ytan längs radier — de träffar ' +
                        'ytan vinkelrätt och bryts därför inte där. All brytning sker i halvcirkelns ' +
                        'medelpunkt på den plana ytan, där strålen går från materialet ut i luften.',
                    text: 'Alla tre strålarna möts i medelpunkten på den plana ytan. Där gäller ' +
                        'brytningslagen mellan materialet (vinkel $\\alpha_1$ mot normalen) och luften ' +
                        '(vinkel $\\alpha_2 = 38{,}3°$).',
                },
                {
                    del: 'a',
                    rubrik: 'Avgör åt vilket håll strålen bryts',
                    varfor: 'Ljuset går från ett optiskt tätare material till optiskt tunnare luft. Då ökar ' +
                        'ljusets hastighet, och strålen bryts *från* normalen — utfallsvinkeln blir större ' +
                        'än infallsvinkeln.',
                    text: 'Brytningslagen skriven med hastigheter:\n\n' +
                        '$$\\dfrac{\\sin\\alpha_1}{\\sin\\alpha_2} = \\dfrac{v_1}{v_2}$$\n\n' +
                        'Eftersom $v_1 < v_2$ måste $\\alpha_1 < \\alpha_2 = 38{,}3°$. Av vinklarna ' +
                        '$60°$ (A), $45°$ (B) och $26°$ (C) är det bara $26°$ som är mindre än $38{,}3°$.',
                    figur: 'u7-s1',
                    delsvar: { del: 'a', text: 'Stråle **C** hör ihop med den brutna strålen D — ljuset bryts från ' +
                        'normalen när det går mot ett optiskt tunnare medium, så infallsvinkeln måste vara ' +
                        'mindre än $38{,}3°$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Lös ut hastigheten i materialet',
                    varfor: 'Samma brytningslag ger hastigheten i materialet, eftersom vi nu känner båda ' +
                        'vinklarna och ljushastigheten i luft.',
                    text: 'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'v_2 \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}\\ \\text{(ljusets hastighet i luft)} \\\\ ' +
                        '\\alpha_1 = 26° \\\\ ' +
                        '\\alpha_2 = 38{,}3° ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$v_1 = v_2 \\cdot \\dfrac{\\sin\\alpha_1}{\\sin\\alpha_2} = ' +
                        '3{,}00 \\cdot 10^8 \\cdot \\dfrac{\\sin 26°}{\\sin 38{,}3°}\\ \\mathrm{m/s} ' +
                        '\\approx 2{,}1 \\cdot 10^8\\ \\mathrm{m/s}$$',
                    delsvar: { del: 'b', text: 'Ljusets hastighet i det genomskinliga materialet är ' +
                        '$2{,}1 \\cdot 10^8\\ \\mathrm{m/s}$.' },
                },
            ],
            svar: 'a) Stråle C hör ihop med D. b) $v \\approx 2{,}1 \\cdot 10^8\\ \\mathrm{m/s}$.',
            bedomning: [
                ['a) Godtagbar motivering med korrekt svar (C)', '+E'],
                ['b) Godtagbar lösning och svar ($2{,}1 \\cdot 10^8\\ \\mathrm{m/s}$)', '+E'],
            ],
        },

        // ================= UPPGIFT 8 =================
        {
            nr: 8, del: 'A', poang: [2, 1, 0], omrade: 'Experimentell metod — plan pendel',
            fraga: 'Du ska planera ett experiment för att bestämma värdet på tyngdaccelerationen $g$ ' +
                'med hjälp av en plan pendel.\n\n' +
                'Din planering ska vara så tydlig att någon annan kan använda den för att genomföra ' +
                'experimentet. Du har tillgång till en metallkula med krok, snöre, stativ, linjal och ' +
                'tidtagarur.\n\n' +
                'Din planering ska innehålla:\n\n' +
                '- en kortfattad beskrivning av hur försöket ska genomföras,\n' +
                '- en beskrivning av hur dina mätningar ska genomföras,\n' +
                '- de samband och beräkningar som behövs för att bestämma tyngdaccelerationen $g$.',
            figur: null,
            steg: [
                {
                    rubrik: 'Beskriv försöksuppställningen',
                    varfor: 'En plan pendel är en kula i ett snöre som svänger fram och tillbaka med små ' +
                        'utslag. Pendellängden ska mätas till kulans *tyngdpunkt* — det är den längd som ' +
                        'ingår i pendelformeln.',
                    text: 'Fäst metallkulan i snöret och häng upp snöret i stativet. Mät pendellängden ' +
                        '$l$ med linjalen, från upphängningspunkten till kulans tyngdpunkt (kulans mitt). ' +
                        'Sätt pendeln i svängning med små utslag.',
                    figur: 'u8-s1',
                },
                {
                    rubrik: 'Beskriv tidmätningen',
                    varfor: 'Reaktionstiden vid start och stopp av tidtagaruret är den största felkällan. ' +
                        'Mäter vi tiden för många perioder i följd fördelas felet på alla perioderna och ' +
                        'periodtiden blir mycket noggrannare.',
                    text: 'Mät med tidtagaruret tiden för minst $10$ hela svängningar och dela med ' +
                        'antalet — det ger periodtiden $T$. Upprepa försöket med några olika ' +
                        'pendellängder $l$ och samla mätvärdena i en tabell.',
                },
                {
                    rubrik: 'Ange sambandet och lös ut g',
                    varfor: 'Pendelformeln kopplar ihop det vi mätt ($T$ och $l$) med det vi söker ($g$). ' +
                        'Att beräkna $g$ för varje mätpunkt och ta medelvärdet minskar slumpfelens inverkan.',
                    text: 'Svängningstiden för en plan pendel:\n\n' +
                        '$$T = 2\\pi \\sqrt{\\dfrac{l}{g}} \\quad \\Longrightarrow \\quad ' +
                        'g = \\dfrac{4\\pi^2 \\cdot l}{T^2}$$\n\n' +
                        'Beräkna $g$ för alla mätpunkter och bestäm därefter medelvärdet.',
                },
            ],
            svar: 'Se planeringen i stegen: mät pendellängden till kulans tyngdpunkt, ta tiden för minst ' +
                '10 perioder och dela med antalet, upprepa för flera pendellängder, och bestäm $g$ ur ' +
                '$g = 4\\pi^2 l / T^2$ som medelvärde över mätpunkterna.',
            bedomning: [
                ['Godtagbar beskrivning av hur försöket ska genomföras där det framgår att pendellängden och periodtiden behöver mätas', '+E'],
                ['med godtagbar beskrivning av ett försök som ger en bra noggrannhet i mätningen (upprepad mätning med olika pendellängder, mätning över flera perioder eller mätning av längden till tyngdpunkten)', '+E'],
                ['med framtagande av ett godtagbart slututtryck för bestämning av $g$ ($g = 4\\pi^2 l / T^2$)', '+C'],
            ],
        },

        // ================= UPPGIFT 9 =================
        {
            nr: 9, del: 'A', poang: [2, 1, 0], omrade: 'Fotoelektrisk effekt',
            fraga: 'Under ett experiment undersöktes den fotoelektriska effekten då en metallyta belystes ' +
                'med elektromagnetisk strålning. När strålningens våglängd var kortare än $300\\ \\mathrm{nm}$ ' +
                'började elektroner emitteras från metallytan.\n\n' +
                '**a)** Beräkna utträdesarbetet för metallen. Svara i eV.\n\n' +
                '**b)** Beräkna fotoelektronernas rörelseenergi om strålningens våglängd är $200\\ \\mathrm{nm}$.',
            figur: null,
            steg: [
                {
                    del: 'a',
                    rubrik: 'Koppla gränsvåglängden till utträdesarbetet',
                    varfor: 'Vid gränsvåglängden $\\lambda_0 = 300\\ \\mathrm{nm}$ räcker fotonens energi ' +
                        '*precis* till att lösgöra en elektron — all fotonenergi går åt till utträdesarbetet ' +
                        '$E_\\mathrm{U}$ och ingenting blir över till rörelseenergi.',
                    text: '$$E_\\mathrm{U} = h f_0 = h \\cdot \\dfrac{c}{\\lambda_0}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Beräkna utträdesarbetet i joule',
                    varfor: 'Våglängden är given i nanometer — innan vi sätter in den i formeln gör vi ' +
                        'om den till SI-enheten meter. Då vet vi att energin kommer ut i SI-enheten joule.',
                    text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'h \\approx 6{,}626 \\cdot 10^{-34}\\ \\mathrm{Js}\\ \\text{(Plancks konstant)} \\\\ ' +
                        'c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}\\ \\text{(ljusets hastighet)} \\\\ ' +
                        '\\lambda_0 = 300\\ \\mathrm{nm} = 300 \\cdot 10^{-9}\\ \\mathrm{m} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$E_\\mathrm{U} = \\dfrac{6{,}626 \\cdot 10^{-34} \\cdot 3{,}00 \\cdot 10^8}' +
                        '{300 \\cdot 10^{-9}}\\ \\mathrm{J} \\approx 6{,}63 \\cdot 10^{-19}\\ \\mathrm{J}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Gör om till elektronvolt',
                    varfor: 'Svaret efterfrågas i eV. En elektronvolt är energin ' +
                        '$1\\ \\mathrm{eV} \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{J}$, så vi delar ' +
                        'joule-värdet med laddningen $e$.',
                    text: '$$E_\\mathrm{U} = \\dfrac{6{,}63 \\cdot 10^{-19}}{1{,}602 \\cdot 10^{-19}}\\ ' +
                        '\\mathrm{eV} \\approx 4{,}1\\ \\mathrm{eV}$$',
                    delsvar: { del: 'a', text: 'Utträdesarbetet är cirka $4{,}1\\ \\mathrm{eV}$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna fotonens energi vid 200 nm',
                    varfor: 'Kortare våglängd betyder mer energi per foton. Även här gör vi först om ' +
                        'våglängden till SI-enheten meter innan den sätts in i formeln.',
                    text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'h \\approx 6{,}626 \\cdot 10^{-34}\\ \\mathrm{Js}\\ \\text{(Plancks konstant)} \\\\ ' +
                        'c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}\\ \\text{(ljusets hastighet)} \\\\ ' +
                        '\\lambda = 200\\ \\mathrm{nm} = 200 \\cdot 10^{-9}\\ \\mathrm{m} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$E_\\mathrm{foton} = h \\cdot \\dfrac{c}{\\lambda} = ' +
                        '\\dfrac{6{,}626 \\cdot 10^{-34} \\cdot 3{,}00 \\cdot 10^8}{200 \\cdot 10^{-9}}\\ ' +
                        '\\mathrm{J} \\approx 9{,}94 \\cdot 10^{-19}\\ \\mathrm{J}$$',
                    figur: 'u9-s1',
                },
                {
                    del: 'b',
                    rubrik: 'Dra av utträdesarbetet',
                    varfor: 'Skillnaden mellan fotonens energi och utträdesarbetet blir elektronens ' +
                        'rörelseenergi (Einsteins fotoelektriska ekvation): av fotonens energi går ' +
                        '$E_\\mathrm{U}$ åt till att lösgöra elektronen — resten blir rörelseenergi.',
                    text: '$$E_\\mathrm{k} = E_\\mathrm{foton} - E_\\mathrm{U} = ' +
                        '(9{,}94 - 6{,}63) \\cdot 10^{-19}\\ \\mathrm{J} \\approx ' +
                        '3{,}3 \\cdot 10^{-19}\\ \\mathrm{J}$$',
                    delsvar: { del: 'b', text: 'Fotoelektronernas rörelseenergi är ' +
                        '$3{,}3 \\cdot 10^{-19}\\ \\mathrm{J}$ (cirka $2{,}1\\ \\mathrm{eV}$).' },
                },
            ],
            svar: 'a) $E_\\mathrm{U} \\approx 4{,}1\\ \\mathrm{eV}$. ' +
                'b) $E_\\mathrm{k} \\approx 3{,}3 \\cdot 10^{-19}\\ \\mathrm{J}$.',
            bedomning: [
                ['a) Godtagbar ansats, t.ex. ställer upp ett uttryck för utträdesarbetet, $E_\\mathrm{U} = h f_0$', '+E'],
                ['med i övrigt godtagbar lösning och svar ($4{,}1\\ \\mathrm{eV}$)', '+E'],
                ['b) Godtagbar lösning och svar ($3{,}3 \\cdot 10^{-19}\\ \\mathrm{J}$)', '+C'],
            ],
        },

        // ================= UPPGIFT 10 =================
        {
            nr: 10, del: 'A', poang: [2, 0, 1], omrade: 'Värmestrålning — Wiens förskjutningslag',
            fraga: 'Med en digital spektrometer har nedanstående solspektrum tagits upp. På $x$-axeln ' +
                'visas våglängd och på $y$-axeln (relativ) spektral emittans.\n\n' +
                '**a)** Använd diagrammet för att bestämma solens yttemperatur.\n\n' +
                '**b)** Visa med hjälp av diagrammet hur man kan se att det finns väte i solens atmosfär.',
            figur: 'u10',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av våglängden för maximal emittans',
                    varfor: 'Wiens förskjutningslag kopplar ihop *toppens läge* i spektrumet med ' +
                        'temperaturen: ju varmare kropp, desto kortare toppvåglängd. Första steget är ' +
                        'därför att läsa av var kurvan är som högst.',
                    text: 'Kurvan når sitt maximum vid ungefär\n\n$$\\lambda_\\mathrm{max} \\approx 500\\ \\mathrm{nm}$$\n\n' +
                        '(en avläsning mellan $470$ och $520\\ \\mathrm{nm}$ är rimlig).',
                    figur: 'u10-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Använd Wiens förskjutningslag',
                    varfor: 'Med toppvåglängden känd ger Wiens lag temperaturen direkt. Våglängden görs ' +
                        'först om till SI-enheten meter — då kommer temperaturen ut i kelvin.',
                    text: '$$\\lambda_\\mathrm{max} \\cdot T = 2{,}898 \\cdot 10^{-3}\\ \\mathrm{m \\cdot K}$$\n\n' +
                        'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        '\\lambda_\\mathrm{max} \\approx 500\\ \\mathrm{nm} = 500 \\cdot 10^{-9}\\ \\mathrm{m}\\ \\text{(avläst)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$T = \\dfrac{2{,}898 \\cdot 10^{-3}}{500 \\cdot 10^{-9}}\\ \\mathrm{K} \\approx 5800\\ \\mathrm{K}$$',
                    delsvar: { del: 'a', text: 'Solens yttemperatur är cirka $5800\\ \\mathrm{K}$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Identifiera vätets absorptionslinjer i spektrumet',
                    varfor: 'Gaser i solens atmosfär absorberar ljus vid sina egna spektrallinjer. ' +
                        'Väteatomens synliga linjer (Balmerserien) har kända våglängder — hittar vi ' +
                        '"hack" i solspektrumet vid just de våglängderna finns väte i atmosfären.',
                    text: 'Vätets spektrallinjer syns som smala dippar (absorptionslinjer) i spektrumet ' +
                        'vid Balmerseriens våglängder:\n\n' +
                        '$$656\\ \\mathrm{nm}, \\quad 486\\ \\mathrm{nm}, \\quad 434\\ \\mathrm{nm}, ' +
                        '\\quad 410\\ \\mathrm{nm}$$\n\n' +
                        'Diagrammet visar tydliga dippar vid dessa våglängder — alltså finns väte i ' +
                        'solens atmosfär.',
                    figur: 'u10-s2',
                    delsvar: { del: 'b', text: 'Vätets spektrallinjer (Balmerserien: $656$, $486$, $434$ och ' +
                        '$410\\ \\mathrm{nm}$) syns som absorptionslinjer — smala dippar — i solspektrumet.' },
                },
            ],
            svar: 'a) $T \\approx 5800\\ \\mathrm{K}$. b) Vätets Balmerlinjer ($656$, $486$, $434$, ' +
                '$410\\ \\mathrm{nm}$) syns som absorptionslinjer i spektrumet.',
            bedomning: [
                ['a) Godtagbar ansats, tecknar Wiens förskjutningslag och gör en rimlig avläsning av våglängden för maximal spektral emittans ($470$–$520\\ \\mathrm{nm}$)', '+E'],
                ['med i övrigt godtagbar lösning och svar ($5800\\ \\mathrm{K}$)', '+E'],
                ['b) Identifierar minst tre av vätelinjerna med hänvisning till diagrammet', '+A'],
            ],
        },
        // ================= UPPGIFT 11 =================
        {
            nr: 11, del: 'A', poang: [0, 2, 0], omrade: 'de Broglie-våglängd',
            fraga: 'Elektrondiffraktion uppstår då en elektronstråle träffar en kristall. Diffraktion ' +
                'äger rum då elektronernas de Broglievåglängd är jämförbar med avståndet mellan atomerna ' +
                'i kristallen.\n\n' +
                'I en kristall är avståndet mellan atomerna $1{,}65 \\cdot 10^{-10}\\ \\mathrm{m}$. ' +
                'Med vilken spänning måste en elektron accelereras för att de Broglievåglängden ska bli ' +
                '$1{,}65 \\cdot 10^{-10}\\ \\mathrm{m}$?',
            figur: null,
            steg: [
                {
                    rubrik: 'Lös ut hastigheten ur de Broglies samband',
                    varfor: 'de Broglievåglängden kopplar partikelns våglängd till dess rörelsemängd, ' +
                        '$\\lambda = h/(mv)$. Vi vet vilken våglängd vi vill ha — då kan vi räkna ut ' +
                        'vilken hastighet elektronen måste få.',
                    text: '$$\\lambda = \\dfrac{h}{m \\cdot v} \\quad \\Longrightarrow \\quad ' +
                        'v = \\dfrac{h}{m \\cdot \\lambda}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'h \\approx 6{,}626 \\cdot 10^{-34}\\ \\mathrm{Js}\\ \\text{(Plancks konstant)} \\\\ ' +
                        'm \\approx 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}\\ \\text{(elektronens massa)} \\\\ ' +
                        '\\lambda = 1{,}65 \\cdot 10^{-10}\\ \\mathrm{m} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$v = \\dfrac{6{,}626 \\cdot 10^{-34}}{9{,}11 \\cdot 10^{-31} \\cdot 1{,}65 \\cdot 10^{-10}}\\ ' +
                        '\\mathrm{m/s} \\approx 4{,}41 \\cdot 10^6\\ \\mathrm{m/s}$$',
                },
                {
                    rubrik: 'Beräkna elektronens rörelseenergi',
                    varfor: 'Accelerationsspänningen ska ge elektronen precis den här rörelseenergin — ' +
                        'så vi räknar ut hur mycket energi hastigheten motsvarar.',
                    text: '$$E_\\mathrm{k} = \\dfrac{m v^2}{2}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'm \\approx 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}\\ \\text{(elektronens massa)} \\\\ ' +
                        'v \\approx 4{,}41 \\cdot 10^6\\ \\mathrm{m/s}\\ \\text{(beräknad ovan)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$E_\\mathrm{k} = \\dfrac{9{,}11 \\cdot 10^{-31} \\cdot (4{,}41 \\cdot 10^6)^2}{2}\\ \\mathrm{J} ' +
                        '\\approx 8{,}85 \\cdot 10^{-18}\\ \\mathrm{J}$$',
                },
                {
                    rubrik: 'Bestäm accelerationsspänningen',
                    varfor: 'När en laddning $q$ accelereras genom spänningen $U$ får den energin ' +
                        '$E = qU$. Vi löser ut $U$.',
                    text: '$$E = q \\cdot U \\quad \\Longrightarrow \\quad ' +
                        'U = \\dfrac{E}{q}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'E \\approx 8{,}85 \\cdot 10^{-18}\\ \\mathrm{J}\\ \\text{(beräknad ovan)} \\\\ ' +
                        'q \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}\\ \\text{(elementarladdningen)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$U = \\dfrac{8{,}85 \\cdot 10^{-18}}{1{,}602 \\cdot 10^{-19}}\\ ' +
                        '\\mathrm{V} \\approx 55\\ \\mathrm{V}$$',
                },
            ],
            svar: 'Elektronen måste accelereras med spänningen $U \\approx 55\\ \\mathrm{V}$.',
            bedomning: [
                ['Godtagbar ansats, t.ex. beräknar elektronernas hastighet', '+C'],
                ['med i övrigt godtagbar lösning och svar ($55\\ \\mathrm{V}$)', '+C'],
            ],
        },

        // ================= UPPGIFT 12 =================
        {
            nr: 12, del: 'A', poang: [0, 2, 0], omrade: 'Kaströrelse',
            fraga: 'En grupp simhoppare tränar för en uppvisning i en simbassäng med ett hopptorn. För en ' +
                'del hopp vill de ta sats, men det är förstås livsfarligt om simhopparna skulle hoppa över ' +
                'bassängen och slå i kanten på andra sidan.\n\n' +
                'En simhoppare tar sats och gör ett horisontellt uthopp med hastigheten $v$. Finns det ' +
                'någon risk att simhopparen slår i bassängkanten på andra sidan?',
            figur: 'u12',
            steg: [
                {
                    rubrik: 'Dela upp rörelsen i två led',
                    varfor: 'En kaströrelse blir enkel om vi behandlar leden var för sig: i $y$-led är ' +
                        'hoppet ett fritt fall från $5\\ \\mathrm{m}$ (uthoppet är horisontellt, så ' +
                        'starthastigheten i $y$-led är noll), och i $x$-led rör sig hopparen med konstant ' +
                        'hastighet $v$. Tiden är gemensam för båda leden.',
                    text: 'I $y$-led: fritt fall $5{,}0\\ \\mathrm{m}$. I $x$-led: konstant hastighet $v$. ' +
                        'Fallet bestämmer hur länge "flygningen" varar.',
                    figur: 'u12-s1',
                },
                {
                    rubrik: 'Beräkna falltiden ur y-led',
                    varfor: 'Falltiden beror bara på fallhöjden — den är densamma oavsett hur fort ' +
                        'hopparen rör sig i sidled. Det är nyckeln till hela uppgiften.',
                    text: '$$y = \\dfrac{g t^2}{2} \\quad \\Longrightarrow \\quad ' +
                        't = \\sqrt{\\dfrac{2y}{g}}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'y = 5{,}0\\ \\mathrm{m}\\ \\text{(fallhöjden)} \\\\ ' +
                        'g \\approx 9{,}82\\ \\mathrm{m/s^2} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$t = \\sqrt{\\dfrac{2 \\cdot 5{,}0}{9{,}82}}\\ \\mathrm{s} ' +
                        '\\approx 1{,}0\\ \\mathrm{s}$$',
                },
                {
                    rubrik: 'Beräkna vilken fart som krävs i x-led',
                    varfor: 'För att nå andra sidan måste hopparen hinna $12\\ \\mathrm{m}$ i sidled på ' +
                        'den enda sekund fallet varar. Det ger den kritiska utgångsfarten.',
                    text: 'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        's = 12\\ \\mathrm{m}\\ \\text{(bassängens bredd)} \\\\ ' +
                        't \\approx 1{,}009\\ \\mathrm{s}\\ \\text{(beräknad ovan)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$v = \\dfrac{s}{t} = \\dfrac{12}{1{,}009}\\ \\mathrm{m/s} \\approx 12\\ \\mathrm{m/s}$$',
                    figur: 'u12-s2',
                },
                {
                    rubrik: 'Bedöm om farten är möjlig för en människa',
                    varfor: 'Slutsatsen kräver en jämförelse med vad en människa faktiskt kan springa — ' +
                        'först då kan vi svara på om det finns någon risk.',
                    text: 'En hastighet på $12\\ \\mathrm{m/s}$ är högre än medelhastigheten i ett ' +
                        '$100$-meterslopp i världsrekordfart (cirka $10{,}4\\ \\mathrm{m/s}$). Ingen ' +
                        'simhoppare kan alltså springa ut med den farten från ett hopptorn.',
                },
            ],
            svar: 'Nej. För att nå andra sidan krävs den horisontella utgångsfarten $12\\ \\mathrm{m/s}$ — ' +
                'snabbare än världsrekordfart på $100\\ \\mathrm{m}$. Det finns ingen risk att slå i kanten ' +
                'vid ett horisontellt uthopp.',
            bedomning: [
                ['Godtagbar ansats, t.ex. beräknar falltiden, $1{,}009\\ \\mathrm{s}$', '+C'],
                ['med godtagbar hantering av rörelsen i $x$-led och korrekt slutsats (det är ingen risk att slå i kanten)', '+C'],
            ],
        },

        // ================= UPPGIFT 13 =================
        {
            nr: 13, del: 'A', poang: [0, 3, 0], omrade: 'Stående vågor — resonans',
            fraga: 'En orgel och en cello befinner sig i samma rum. Då en orgelpipa ljuder med sin ' +
                'grundton uppstår resonans i en av cellons strängar som då svänger med sin grundsvängning.\n\n' +
                'Orgelpipan, som har längden $0{,}80\\ \\mathrm{m}$, är sluten i ena änden och öppen i den ' +
                'andra. Cellosträngen har längden $60{,}5\\ \\mathrm{cm}$.\n\n' +
                'Beräkna den transversella vågens utbredningshastighet i strängen.\n\n' +
                '*På denna uppgift kommer din lärare särskilt att bedöma hur väl du redovisar din lösning.*',
            figur: 'u13',
            steg: [
                {
                    rubrik: 'Bestäm våglängden i orgelpipan',
                    varfor: 'I en pipa som är sluten i ena änden och öppen i den andra har grundtonen en ' +
                        'nod vid den slutna änden och en buk vid den öppna — det ryms precis en ' +
                        '*kvarts* våglängd i pipan.',
                    text: '$$L_\\mathrm{pipa} = \\dfrac{\\lambda_\\mathrm{luft}}{4} = 0{,}80\\ \\mathrm{m} ' +
                        '\\quad \\Longrightarrow \\quad \\lambda_\\mathrm{luft} = 3{,}20\\ \\mathrm{m}$$',
                    figur: 'u13-s1',
                },
                {
                    rubrik: 'Bestäm våglängden på strängen',
                    varfor: 'En sträng är fast inspänd i båda ändar — grundsvängningen har nod i båda ' +
                        'ändarna och en buk på mitten, så strängen rymmer en *halv* våglängd.',
                    text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'L_\\mathrm{sträng} = 60{,}5\\ \\mathrm{cm} = 0{,}605\\ \\mathrm{m} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$L_\\mathrm{sträng} = \\dfrac{\\lambda_\\mathrm{sträng}}{2} = 0{,}605\\ \\mathrm{m} ' +
                        '\\quad \\Longrightarrow \\quad \\lambda_\\mathrm{sträng} = 1{,}21\\ \\mathrm{m}$$',
                    figur: 'u13-s2',
                },
                {
                    rubrik: 'Utnyttja att frekvenserna är lika vid resonans',
                    varfor: 'Resonansen uppstår just för att orgelpipans ton träffar strängens egen ' +
                        'grundfrekvens — de två svängningarna har alltså *samma frekvens*. Det är den ' +
                        'motivering som binder ihop lösningen. Med $v = f \\lambda$ i båda medierna kan ' +
                        'vi då lösa ut strängens våghastighet.',
                    text: '$$f_\\mathrm{luft} = f_\\mathrm{sträng} \\quad \\Longrightarrow \\quad ' +
                        '\\dfrac{v_\\mathrm{luft}}{\\lambda_\\mathrm{luft}} = ' +
                        '\\dfrac{v_\\mathrm{sträng}}{\\lambda_\\mathrm{sträng}}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'v_\\mathrm{luft} \\approx 340\\ \\mathrm{m/s}\\ \\text{(ljudets hastighet i luft)} \\\\ ' +
                        '\\lambda_\\mathrm{sträng} = 1{,}21\\ \\mathrm{m}\\ \\text{(beräknad ovan)} \\\\ ' +
                        '\\lambda_\\mathrm{luft} = 3{,}20\\ \\mathrm{m}\\ \\text{(beräknad ovan)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$v_\\mathrm{sträng} = \\dfrac{v_\\mathrm{luft} \\cdot \\lambda_\\mathrm{sträng}}' +
                        '{\\lambda_\\mathrm{luft}} = \\dfrac{340 \\cdot 1{,}21}{3{,}20}\\ \\mathrm{m/s} ' +
                        '\\approx 130\\ \\mathrm{m/s}$$',
                },
            ],
            svar: 'Vågens utbredningshastighet i strängen är cirka $130\\ \\mathrm{m/s}$ ' +
                '($0{,}13\\ \\mathrm{km/s}$).',
            bedomning: [
                ['Godtagbar ansats, t.ex. beräknar våglängden i pipan, $3{,}20\\ \\mathrm{m}$, och i strängen, $1{,}21\\ \\mathrm{m}$', '+C'],
                ['med i övrigt godtagbar lösning och svar ($130\\ \\mathrm{m/s}$)', '+C'],
                ['med lösningen väl motiverad utifrån att frekvenserna är lika i båda instrumenten, naturvetenskapligt språk och kommunikation anpassad till syfte och sammanhang', '+C'],
            ],
        },

        // ================= UPPGIFT 14 =================
        {
            nr: 14, del: 'A', poang: [0, 2, 1], omrade: 'Transformatorn',
            fraga: 'Till en elektronikkrets behövs en transformator. Du har fått i uppgift att konstruera ' +
                'en transformator som ska transformera ner växelspänningen från $230\\ \\mathrm{V}$ till en ' +
                'spänning som är högst $12\\ \\mathrm{V}$ och minst $4\\ \\mathrm{V}$.\n\n' +
                'Till din hjälp har du en järnkärna med ok samt spolar som har $10$, $50$, $100$, $500$ ' +
                'och $1000$ varv.\n\n' +
                '**a)** Utred på vilka sätt materielen kan användas för att konstruera en transformator ' +
                'som ger en spänning mellan $4\\ \\mathrm{V}$ och $12\\ \\mathrm{V}$.\n\n' +
                '**b)** Varför behövs järnkärnan och oket för att transformatorn ska bli mer effektiv?',
            figur: 'u14',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Ställ upp transformatorsambandet',
                    varfor: 'Om järnkärnan med ok förmedlar det magnetiska flödet perfekt mellan spolarna ' +
                        'är spänningarna proportionella mot varvtalen. Det ger sekundärspänningen direkt ' +
                        'ur valet av spolar.',
                    text: '$$\\dfrac{U_2}{U_1} = \\dfrac{N_2}{N_1} \\quad \\Longrightarrow \\quad ' +
                        'U_2 = U_1 \\cdot \\dfrac{N_2}{N_1}$$\n\n' +
                        'med kravet $4\\ \\mathrm{V} < U_2 < 12\\ \\mathrm{V}$.',
                },
                {
                    del: 'a',
                    rubrik: 'Pröva varvtalskombinationerna',
                    varfor: 'Kravet betyder att förhållandet $N_2/N_1$ måste ligga mellan $4/230 \\approx 0{,}017$ ' +
                        'och $12/230 \\approx 0{,}052$. Vi prövar kvoterna som går att bilda av spolarna.',
                    text: 'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'U_1 = 230\\ \\mathrm{V} \\\\ ' +
                        'N_1,\\ N_2\\ \\text{väljs bland}\\ 10,\\ 50,\\ 100,\\ 500,\\ 1000\\ \\text{varv} ' +
                        '\\end{array} \\right]$$\n\n' +
                        'Två kombinationer fungerar:\n\n' +
                        '$$N_1 = 500,\\ N_2 = 10: \\quad U_2 = 230 \\cdot \\dfrac{10}{500}\\ \\mathrm{V} = 4{,}6\\ \\mathrm{V}$$\n\n' +
                        '$$N_1 = 1000,\\ N_2 = 50: \\quad U_2 = 230 \\cdot \\dfrac{50}{1000}\\ \\mathrm{V} = 11{,}5\\ \\mathrm{V}$$\n\n' +
                        'Övriga kvoter hamnar utanför intervallet (t.ex. $10/1000$ ger $2{,}3\\ \\mathrm{V}$ — ' +
                        'för lågt; $50/500$ ger $23\\ \\mathrm{V}$ — för högt).',
                    delsvar: { del: 'a', text: 'Två sätt: primärspole $500$ varv med sekundärspole $10$ varv ' +
                        '($U_2 = 4{,}6\\ \\mathrm{V}$), eller primärspole $1000$ varv med sekundärspole $50$ varv ' +
                        '($U_2 = 11{,}5\\ \\mathrm{V}$).' },
                },
                {
                    del: 'b',
                    rubrik: 'Förklara järnkärnans och okets roll',
                    varfor: 'Transformatorn bygger på att primärspolens varierande magnetflöde går genom ' +
                        'sekundärspolen. Järn leder magnetiskt flöde mycket bättre än luft — kärnan och ' +
                        'oket bildar en sluten "flödesväg" mellan spolarna.',
                    text: 'Järnkärnan med ok ökar den magnetiska flödestätheten och leder flödet i en ' +
                        'sluten bana genom båda spolarna. Då läcker mycket lite flöde ut och förlusterna ' +
                        'minskar — transformatorn blir effektivare.',
                    figur: 'u14-s1',
                    delsvar: { del: 'b', text: 'Järnkärnan med ok ökar den magnetiska flödestätheten och leder ' +
                        'flödet genom båda spolarna i en sluten bana, vilket minskar förlusterna.' },
                },
            ],
            svar: 'a) $N_1 = 500$ och $N_2 = 10$ ($4{,}6\\ \\mathrm{V}$) eller $N_1 = 1000$ och ' +
                '$N_2 = 50$ ($11{,}5\\ \\mathrm{V}$). b) Kärnan och oket leder det magnetiska flödet genom ' +
                'båda spolarna och minskar förlusterna.',
            bedomning: [
                ['a) Godtagbart resonemang för att finna en korrekt uppsättning spolar', '+C'],
                ['med i övrigt godtagbar lösning och svar ($N_1 = 500$ och $N_2 = 10$ eller $N_1 = 1000$ och $N_2 = 50$)', '+A'],
                ['b) Godtagbart resonemang kring det magnetiska flödet', '+C'],
            ],
        },

        // ================= UPPGIFT 15 =================
        {
            nr: 15, del: 'A', poang: [2, 1, 2], omrade: 'Gitter och energinivåer',
            fraga: 'I en traditionell gitterspektrometer sitter ett gitter med $600$ linjer/mm. Vid en ' +
                'laboration med ljus från ett okänt ämne ser Stina ljus i andra ordningens spektrum vid ' +
                'vinklarna $30°$, $47°$ och $51°$ från centralmax.\n\n' +
                '**a)** Beräkna våglängderna för det observerade ljuset.\n\n' +
                'De tre observerade emissionerna sker genom övergång till grundtillståndet. Se schematisk bild.\n\n' +
                '**b)** Andra övergångar sker också mellan de energinivåer som visas i figuren. Visa med ' +
                'beräkningar varför det inte var möjligt för Stina att observera dessa vid försöket.',
            figur: 'u15',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Bestäm gitterkonstanten',
                    varfor: 'Gitterkonstanten $d$ är avståndet mellan två linjer i gittret. Med $600$ ' +
                        'linjer per millimeter är avståndet en sexhundradels millimeter.',
                    text: '$$d = \\dfrac{1 \\cdot 10^{-3}}{600}\\ \\mathrm{m} \\approx 1{,}667 \\cdot 10^{-6}\\ \\mathrm{m}$$',
                },
                {
                    del: 'a',
                    rubrik: 'Använd gitterformeln för andra ordningen',
                    varfor: 'Gitterformeln $n\\lambda = d \\sin v$ kopplar vinkeln till våglängden. ' +
                        'Ljuset observerades i *andra* ordningens spektrum, så $n = 2$.',
                    text: '$$\\lambda = \\dfrac{d \\cdot \\sin v}{2}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'd \\approx 1{,}667 \\cdot 10^{-6}\\ \\mathrm{m}\\ \\text{(beräknad ovan)} \\\\ ' +
                        'v = 30°,\\ 47°\\ \\text{respektive}\\ 51° \\\\ ' +
                        'n = 2\\ \\text{(andra ordningen)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$\\lambda_1 = \\dfrac{1{,}667 \\cdot 10^{-6} \\cdot \\sin 30°}{2} \\approx 417\\ \\mathrm{nm} \\approx 420\\ \\mathrm{nm}$$\n\n' +
                        '$$\\lambda_2 = \\dfrac{1{,}667 \\cdot 10^{-6} \\cdot \\sin 47°}{2} \\approx 609\\ \\mathrm{nm} \\approx 610\\ \\mathrm{nm}$$\n\n' +
                        '$$\\lambda_3 = \\dfrac{1{,}667 \\cdot 10^{-6} \\cdot \\sin 51°}{2} \\approx 648\\ \\mathrm{nm} \\approx 650\\ \\mathrm{nm}$$',
                    delsvar: { del: 'a', text: 'Våglängderna är cirka $420\\ \\mathrm{nm}$, $610\\ \\mathrm{nm}$ ' +
                        'och $650\\ \\mathrm{nm}$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Bestäm energinivåerna ur de observerade övergångarna',
                    varfor: 'De tre observerade våglängderna hör till övergångar rakt ner till ' +
                        'grundtillståndet. Fotonens energi $E = hc/\\lambda$ ger då de exciterade ' +
                        'nivåernas energi över grundtillståndet.',
                    text: 'Mätvärden (våglängderna från a) omvandlade till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'h \\approx 6{,}626 \\cdot 10^{-34}\\ \\mathrm{Js}\\ \\text{(Plancks konstant)} \\\\ ' +
                        'c \\approx 3{,}00 \\cdot 10^8\\ \\mathrm{m/s}\\ \\text{(ljusets hastighet)} \\\\ ' +
                        '\\lambda_1 \\approx 417\\ \\mathrm{nm} = 417 \\cdot 10^{-9}\\ \\mathrm{m} \\\\ ' +
                        '\\lambda_2 \\approx 609\\ \\mathrm{nm} = 609 \\cdot 10^{-9}\\ \\mathrm{m} \\\\ ' +
                        '\\lambda_3 \\approx 648\\ \\mathrm{nm} = 648 \\cdot 10^{-9}\\ \\mathrm{m} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$E_1 = \\dfrac{hc}{\\lambda_1} \\approx 4{,}77 \\cdot 10^{-19}\\ \\mathrm{J}, \\quad ' +
                        'E_2 = \\dfrac{hc}{\\lambda_2} \\approx 3{,}26 \\cdot 10^{-19}\\ \\mathrm{J}, \\quad ' +
                        'E_3 = \\dfrac{hc}{\\lambda_3} \\approx 3{,}07 \\cdot 10^{-19}\\ \\mathrm{J}$$',
                },
                {
                    del: 'b',
                    rubrik: 'Beräkna våglängderna för övergångarna mellan de exciterade nivåerna',
                    varfor: 'De återstående övergångarna sker *mellan* de exciterade nivåerna. ' +
                        'Energiskillnaderna är små — och liten energi betyder lång våglängd. Vi beräknar ' +
                        'dem för att kunna jämföra med det synliga området.',
                    text: '$$\\lambda_4 = \\dfrac{hc}{E_1 - E_3} \\approx 1170\\ \\mathrm{nm}, \\quad ' +
                        '\\lambda_5 = \\dfrac{hc}{E_1 - E_2} \\approx 1320\\ \\mathrm{nm}, \\quad ' +
                        '\\lambda_6 = \\dfrac{hc}{E_2 - E_3} \\approx 10\\,500\\ \\mathrm{nm}$$',
                    figur: 'u15-s1',
                },
                {
                    del: 'b',
                    rubrik: 'Jämför med det synliga området',
                    varfor: 'Ögat (och försöket, som byggde på att Stina *såg* ljuset) uppfattar bara ' +
                        'våglängder mellan cirka $400$ och $700\\ \\mathrm{nm}$.',
                    text: 'Alla tre våglängderna $\\lambda_4$, $\\lambda_5$ och $\\lambda_6$ ligger långt ' +
                        'utanför det synliga området ($400$–$700\\ \\mathrm{nm}$) — de ligger i infrarött ' +
                        'och kan inte ses med blotta ögat.',
                    delsvar: { del: 'b', text: 'Övergångarna mellan de exciterade nivåerna ger våglängderna ' +
                        'cirka $1170\\ \\mathrm{nm}$, $1320\\ \\mathrm{nm}$ och $10\\,500\\ \\mathrm{nm}$ — ' +
                        'alla utanför det synliga området, och därför omöjliga för Stina att observera.' },
                },
            ],
            svar: 'a) $420\\ \\mathrm{nm}$, $610\\ \\mathrm{nm}$ och $650\\ \\mathrm{nm}$. ' +
                'b) Övriga övergångar ger $1170$, $1320$ och $10\\,500\\ \\mathrm{nm}$ — utanför det ' +
                'synliga området.',
            bedomning: [
                ['a) Godtagbar ansats, påbörjar en lösning med gitterekvationen $n\\lambda = d \\sin v$ där $n$ eller $d$ är korrekt bestämd', '+E'],
                ['med i övrigt godtagbar lösning och svar ($420\\ \\mathrm{nm}$, $610\\ \\mathrm{nm}$ och $650\\ \\mathrm{nm}$)', '+E'],
                ['b) Godtagbar bestämning av energierna för övergångarna till grundtillståndet', '+C'],
                ['med godtagbar fortsättning, t.ex. beräknar den kortaste våglängden, $1170\\ \\mathrm{nm}$, och motiverar varför de andra våglängderna inte behöver beräknas', '+A'],
                ['med i övrigt godtagbar lösning och svar (våglängderna ligger utanför det synliga området)', '+A'],
            ],
        },

        // ================= UPPGIFT 16 =================
        {
            nr: 16, del: 'A', poang: [0, 1, 3], omrade: 'Experimentell metod — ljudets hastighet',
            fraga: 'Du ska planera ett experiment för att bestämma värdet på ljudets hastighet i luft. ' +
                'Din planering ska vara så tydlig att en klasskamrat kan använda den för att genomföra ' +
                'experimentet.\n\n' +
                'Du har tillgång till måttband, två högtalare, tongenerator med vars hjälp du kan variera ' +
                'högtalarnas frekvens och en mikrofon kopplad till en mätdator som visar ljudnivån.\n\n' +
                'Din planering ska innehålla:\n\n' +
                '- en kortfattad beskrivning med figur av hur försöket ska genomföras,\n' +
                '- en beskrivning av hur dina mätningar ska genomföras,\n' +
                '- de samband som behövs för att noggrant bestämma ljudets hastighet i luft.\n\n' +
                '*På denna uppgift kommer din lärare särskilt att bedöma hur väl du redovisar din lösning.*',
            figur: null,
            steg: [
                {
                    rubrik: 'Beskriv uppställningen med figur',
                    varfor: 'Idén är att låta två högtalare som svänger i fas interferera. När mikrofonen ' +
                        'hör ett minimum eller maximum vet vi exakt hur vägskillnaden förhåller sig till ' +
                        'våglängden — det gör våglängden mätbar med måttband.',
                    text: 'Koppla båda högtalarna till tongeneratorn så att de svänger i fas. Ställ ' +
                        'högtalarna och mikrofonen på en linje, med högtalarna vid samma läge (se figur). ' +
                        'Ställ in tongeneratorn på en given frekvens, till exempel $f = 500\\ \\mathrm{Hz}$.',
                    figur: 'u16-s1',
                },
                {
                    rubrik: 'Beskriv mätningarna',
                    varfor: 'När den bakre högtalaren flyttas ändras vägskillnaden mellan ljudvågorna. ' +
                        'Första ljudminimum uppstår vid vägskillnaden en halv våglängd, första maximum ' +
                        'vid en hel våglängd — avstånden läses av med måttbandet.',
                    text: 'Flytta den bakre högtalaren bakåt tills ett ljudminimum registreras vid ' +
                        'mikrofonen — avståndet mellan högtalarna är då $\\Delta s_1 = \\dfrac{\\lambda}{2}$. ' +
                        'Flytta vidare bakåt till ett ljudmaximum — avståndet är då $\\Delta s_2 = \\lambda$, ' +
                        'och så vidare. Mät avstånden med måttbandet och samla data i en tabell. ' +
                        'Våglängden $\\lambda$ bestäms ur mätserien.',
                },
                {
                    rubrik: 'Ange sambandet och öka noggrannheten',
                    varfor: 'Vågformeln kopplar den uppmätta våglängden och den kända frekvensen till ' +
                        'ljudhastigheten. Genom att upprepa försöket för flera frekvenser (eller flera ' +
                        'max/min-punkter) och ta medelvärdet minskar mätosäkerheten.',
                    text: '$$v = f \\cdot \\lambda$$\n\n' +
                        'Bestäm $v$ för alla mätpunkter och beräkna medelvärdet. Upprepa gärna försöket ' +
                        'med olika frekvenser för ökad noggrannhet.',
                },
            ],
            svar: 'Se planeringen i stegen: två högtalare i fas på en linje med mikrofonen; den bakre ' +
                'flyttas tills min/max registreras ($\\Delta s = \\lambda/2$, $\\lambda$, …); våglängden ' +
                'mäts med måttband och $v = f \\lambda$ ger ljudhastigheten som medelvärde över mätningarna.',
            bedomning: [
                ['Godtagbar beskrivning med figur av hur försöket ska genomföras och vilka mätningar som ska göras', '+C'],
                ['Godtagbar beskrivning av hur ljudhastigheten ska bestämmas i en punkt', '+A'],
                ['Godtagbar beskrivning av hur försöket kan upprepas för olika frekvenser eller i olika punkter för ökad noggrannhet', '+A'],
                ['Eleven redovisar på ett strukturerat sätt hur försöket skall utföras, använder med säkerhet ett naturvetenskapligt språk och lösningen omfattar större delen av uppgiften', '+A'],
            ],
        },

        // ================= UPPGIFT 17 =================
        {
            nr: 17, del: 'A', poang: [0, 0, 3], omrade: 'Masspektrometer — laddade partiklar i fält',
            fraga: 'Institutionen där Anders, Kalle och Ulrika forskar har fått en leverans av argon. ' +
                'De använder en masspektrometer för att bestämma vilka argonisotoper som finns i ' +
                'leveransen. I masspektrometern skickas envärt positiva argonjoner, $\\mathrm{Ar}^+$, ' +
                'genom ett så kallat hastighetsfilter. Sedan går jonerna i en halvcirkelbana i ett ' +
                'homogent magnetfält för att slutligen träffa en fotografisk film. Genom att studera ' +
                'svärtningen på filmen kan de bestämma vilka argonisotoperna är.\n\n' +
                'Figuren visar jonernas bana genom masspektrometern då $E = 25\\ \\mathrm{kV/m}$, ' +
                '$B_1 = 49\\ \\mathrm{mT}$ och $B_2 = 0{,}50\\ \\mathrm{T}$.\n\n' +
                'Förutom svärtningen från den vanligt förekommande isotopen $^{40}\\mathrm{Ar}$ ser de ' +
                'ytterligare en svärtning med halvcirkelradien $r = 4{,}0\\ \\mathrm{dm}$. Vilken ' +
                'argonisotop motsvarar denna svärtning?',
            figur: 'u17',
            steg: [
                {
                    rubrik: 'Rita ut den elektriska kraften i hastighetsfiltret',
                    varfor: 'I hastighetsfiltret verkar två krafter på jonen. Vi ritar ut dem en i taget ' +
                        'och börjar med den elektriska: fältet $E$ pekar nedåt mellan plattorna, och ' +
                        'jonen är positiv, så kraften $F_E = QE$ pekar åt samma håll som fältet.',
                    text: 'Den elektriska kraften på jonen:\n\n$$F_E = Q \\cdot E$$\n\n' +
                        'riktad nedåt i figuren (längs fältet, eftersom laddningen är positiv).',
                    figur: 'u17-s1',
                },
                {
                    rubrik: 'Rita ut den magnetiska kraften — och kräv jämvikt',
                    varfor: 'Magnetfältet $B_1$ pekar in i planet och jonen rör sig åt höger — ' +
                        'högerhandsregeln ger då en magnetisk kraft uppåt, mot den elektriska. Bara joner ' +
                        'där krafterna precis balanserar går rakt fram genom filtret — det är så filtret ' +
                        '"väljer ut" en bestämd hastighet.',
                    text: 'Kraftjämvikt i filtret:\n\n$$F_B = F_E \\quad \\Longrightarrow \\quad ' +
                        'Q v B_1 = Q E \\quad \\Longrightarrow \\quad v = \\dfrac{E}{B_1}$$\n\n' +
                        'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'E = 25\\ \\mathrm{kV/m} = 25\\,000\\ \\mathrm{V/m} \\\\ ' +
                        'B_1 = 49\\ \\mathrm{mT} = 0{,}049\\ \\mathrm{T} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$v = \\dfrac{25\\,000}{0{,}049}\\ \\mathrm{m/s} ' +
                        '\\approx 5{,}1 \\cdot 10^5\\ \\mathrm{m/s}$$\n\n' +
                        'Alla joner som passerar filtret har alltså denna hastighet — oavsett massa.',
                    figur: 'u17-s2',
                },
                {
                    rubrik: 'Låt den magnetiska kraften bli centripetalkraft i B₂',
                    varfor: 'Inne i fältet $B_2$ finns bara den magnetiska kraften kvar. Den står alltid ' +
                        'vinkelrätt mot rörelsen och böjer därför banan till en cirkel — den magnetiska ' +
                        'kraften *är* centripetalkraften. Radien beror på jonens massa: tyngre jon, ' +
                        'större radie.',
                    text: '$$F_\\mathrm{c} = F_{B_2} \\quad \\Longrightarrow \\quad ' +
                        '\\dfrac{m v^2}{r} = Q v B_2$$',
                    figur: 'u17-s3',
                },
                {
                    rubrik: 'Lös ut massan och identifiera isotopen',
                    varfor: 'Med hastigheten från filtret och den uppmätta radien kan massan beräknas. ' +
                        'Radien görs först om från decimeter till SI-enheten meter. Delar vi sedan massan ' +
                        'med atommassenheten $u$ fås masstalet.',
                    text: '$$\\dfrac{m v^2}{r} = Q v B_2 \\quad \\Longrightarrow \\quad m = \\dfrac{Q B_2 r}{v}$$\n\n' +
                        'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'Q \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}\\ \\text{(elementarladdningen)} \\\\ ' +
                        'B_2 = 0{,}50\\ \\mathrm{T} \\\\ ' +
                        'r = 4{,}0\\ \\mathrm{dm} = 0{,}40\\ \\mathrm{m} \\\\ ' +
                        'v \\approx 5{,}1 \\cdot 10^5\\ \\mathrm{m/s}\\ \\text{(beräknad ovan)} \\\\ ' +
                        'u \\approx 1{,}66 \\cdot 10^{-27}\\ \\mathrm{kg}\\ \\text{(atommassenheten)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$m = \\dfrac{1{,}602 \\cdot 10^{-19} \\cdot 0{,}50 \\cdot 0{,}40}{5{,}1 \\cdot 10^5}\\ ' +
                        '\\mathrm{kg} \\approx 6{,}28 \\cdot 10^{-26}\\ \\mathrm{kg}$$\n\n' +
                        '$$\\dfrac{m}{u} = \\dfrac{6{,}28 \\cdot 10^{-26}}{1{,}66 \\cdot 10^{-27}} \\approx 38$$',
                },
            ],
            svar: 'Svärtningen motsvarar isotopen $^{38}\\mathrm{Ar}$.',
            bedomning: [
                ['Godtagbar ansats, t.ex. beräknar hastigheten, $5{,}1 \\cdot 10^5\\ \\mathrm{m/s}$', '+A'],
                ['med godtagbar fortsättning där massan beräknas, $6{,}28 \\cdot 10^{-26}\\ \\mathrm{kg}$', '+A'],
                ['med i övrigt godtagbar lösning och svar ($^{38}\\mathrm{Ar}$)', '+A'],
            ],
        },

        // ================= UPPGIFT 18 =================
        {
            nr: 18, del: 'A', poang: [0, 1, 3], omrade: 'Harmonisk svängning',
            fraga: 'En stålkula hänger i en fjäder som sätts i svängning. Kraften i fjädern mäts under ' +
                'svängningen, se nedan. Fjäderns massa och dämpningen av rörelsen kan försummas.\n\n' +
                '**a)** Beräkna fjäderkonstanten.\n\n' +
                '**b)** Beräkna amplituden för stålkulans svängning.',
            figur: 'u18',
            steg: [
                {
                    del: 'a',
                    rubrik: 'Läs av periodtiden i diagrammet',
                    varfor: 'Fjäderkonstanten når vi via vinkelfrekvensen, och vinkelfrekvensen sitter i ' +
                        'periodtiden. Vi läser därför först av tiden för en hel svängning — till exempel ' +
                        'mellan två närliggande toppar.',
                    text: 'Avläsning ger $T = 1{,}35\\ \\mathrm{s}$, vilket ger\n\n' +
                        '$$\\omega = \\dfrac{2\\pi}{T} \\approx 4{,}654\\ \\mathrm{s^{-1}}$$',
                    figur: 'u18-s1',
                },
                {
                    del: 'a',
                    rubrik: 'Läs av kraften i jämviktsläget och bestäm massan',
                    varfor: 'I jämviktsläget bär fjädern precis kulans tyngd, $F = mg$. Jämviktskraften ' +
                        'ligger mitt emellan kurvans största och minsta värde.',
                    text: 'Kraften pendlar mellan $1{,}9\\ \\mathrm{N}$ och $3{,}3\\ \\mathrm{N}$, så i ' +
                        'jämviktsläget är kraften $2{,}6\\ \\mathrm{N}$.\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'F = 2{,}6\\ \\mathrm{N}\\ \\text{(avläst jämviktskraft)} \\\\ ' +
                        'g \\approx 9{,}82\\ \\mathrm{N/kg} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$m = \\dfrac{F}{g} = \\dfrac{2{,}6}{9{,}82}\\ \\mathrm{kg} \\approx 0{,}265\\ \\mathrm{kg}$$',
                    figur: 'u18-s2',
                },
                {
                    del: 'a',
                    rubrik: 'Lös ut fjäderkonstanten',
                    varfor: 'För en fjädersvängning gäller $\\omega = \\sqrt{k/m}$ — med $\\omega$ och $m$ ' +
                        'kända kan $k$ lösas ut.',
                    text: '$$\\omega = \\sqrt{\\dfrac{k}{m}} \\quad \\Longrightarrow \\quad ' +
                        'k = \\omega^2 \\cdot m$$\n\n' +
                        'Med värdena beräknade ovan:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        '\\omega \\approx 4{,}654\\ \\mathrm{s^{-1}} \\\\ ' +
                        'm \\approx 0{,}265\\ \\mathrm{kg} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$k = 4{,}654^2 \\cdot 0{,}265\\ \\mathrm{N/m} \\approx 5{,}7\\ \\mathrm{N/m}$$',
                    delsvar: { del: 'a', text: 'Fjäderkonstanten är cirka $5{,}7\\ \\mathrm{N/m}$.' },
                },
                {
                    del: 'b',
                    rubrik: 'Bestäm den resulterande kraften i ett vändläge',
                    varfor: 'I svängningens nedre vändläge är fjäderkraften som störst ($3{,}30\\ \\mathrm{N}$) ' +
                        'medan tyngdkraften fortfarande är $2{,}60\\ \\mathrm{N}$ — skillnaden är den ' +
                        'resulterande kraft som driver kulan tillbaka mot jämviktsläget.',
                    text: '$$F_\\mathrm{R} = F_\\mathrm{fjäder} - F_\\mathrm{G} = ' +
                        '(3{,}30 - 2{,}60)\\ \\mathrm{N} = 0{,}70\\ \\mathrm{N}$$',
                    figur: 'u18-s3',
                },
                {
                    del: 'b',
                    rubrik: 'Använd att accelerationen är störst i vändläget',
                    varfor: 'I en harmonisk svängning är accelerationen störst i vändlägena, ' +
                        '$a_\\mathrm{max} = \\omega^2 A$, där utslaget är som störst. Vändläget ligger ' +
                        'precis en amplitud $A$ från jämviktsläget — därför dyker $A$ upp här.',
                    text: '$$F_\\mathrm{R} = m \\cdot a_\\mathrm{max} = m \\cdot \\omega^2 \\cdot A ' +
                        '\\quad \\Longrightarrow \\quad ' +
                        'A = \\dfrac{F_\\mathrm{R}}{m \\cdot \\omega^2}$$\n\n' +
                        'Med värdena beräknade ovan:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'F_\\mathrm{R} = 0{,}70\\ \\mathrm{N} \\\\ ' +
                        'm \\approx 0{,}265\\ \\mathrm{kg} \\\\ ' +
                        '\\omega \\approx 4{,}654\\ \\mathrm{s^{-1}} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$A = \\dfrac{0{,}70}{0{,}265 \\cdot 4{,}654^2}\\ \\mathrm{m} \\approx 0{,}12\\ \\mathrm{m}$$',
                    delsvar: { del: 'b', text: 'Amplituden är cirka $0{,}12\\ \\mathrm{m}$.' },
                },
            ],
            svar: 'a) $k \\approx 5{,}7\\ \\mathrm{N/m}$. b) $A \\approx 0{,}12\\ \\mathrm{m}$.',
            bedomning: [
                ['a) Godtagbar ansats, t.ex. avläser periodtiden och inser att sambandet $T = 2\\pi\\sqrt{m/k}$ ska användas', '+C'],
                ['med i övrigt godtagbar lösning och svar ($5{,}7\\ \\mathrm{N/m}$)', '+A'],
                ['b) Godtagbar ansats, t.ex. bestämmer den resulterande kraften i något vändläge', '+A'],
                ['med i övrigt godtagbar lösning och svar ($0{,}12\\ \\mathrm{m}$)', '+A'],
            ],
        },

        // ================= UPPGIFT 19 =================
        {
            nr: 19, del: 'A', poang: [0, 1, 3], omrade: 'Elektriskt fält — avlänkning av elektroner',
            fraga: 'Katodstrålerör används i en TV av äldre modell, så kallad tjock-TV. Principen för ett ' +
                'katodstrålerör är att elektroner accelereras till hög hastighet för att därefter passera ' +
                'ett homogent elektriskt fält där de avlänkas och träffar en plats på skärmen.\n\n' +
                'Nedan visas en modell för ett sådant rör. Elektronernas hastighet före avlänkningen är ' +
                '$37\\ \\mathrm{Mm/s}$. Det elektriska fältet för avlänkningen av elektronstrålen skapas i ' +
                'ett $3{,}0\\ \\mathrm{cm}$ långt område mellan två plattor. Avståndet mellan plattorna är ' +
                '$4{,}0\\ \\mathrm{cm}$.\n\n' +
                'Beräkna avlänkningsspänningen $U$ för att åstadkomma en avlänkningsvinkel på $30°$, se figur.',
            figur: 'u19',
            steg: [
                {
                    rubrik: 'Beräkna tiden mellan plattorna',
                    varfor: 'I sidled (genom plattorna) påverkas elektronen inte av någon kraft — den ' +
                        'håller konstant hastighet $v_x = 37\\ \\mathrm{Mm/s}$ genom det ' +
                        '$3{,}0\\ \\mathrm{cm}$ långa fältområdet. Tiden där inne styr hur länge fältet ' +
                        'hinner påverka elektronen.',
                    text: 'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        's = 3{,}0\\ \\mathrm{cm} = 0{,}030\\ \\mathrm{m} \\\\ ' +
                        'v_x = 37\\ \\mathrm{Mm/s} = 37 \\cdot 10^6\\ \\mathrm{m/s} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$t = \\dfrac{s}{v_x} = \\dfrac{0{,}030}{37 \\cdot 10^6}\\ \\mathrm{s} ' +
                        '\\approx 8{,}1 \\cdot 10^{-10}\\ \\mathrm{s}$$',
                    figur: 'u19-s1',
                },
                {
                    rubrik: 'Bestäm hastigheten i y-led ur avlänkningsvinkeln',
                    varfor: 'Efter plattorna rör sig elektronen rakt med hastighetskomposanterna $v_x$ ' +
                        'och $v_y$. Avlänkningsvinkeln $30°$ ger förhållandet mellan dem — vi delar upp ' +
                        'hastigheten i komposanter.',
                    text: '$$\\tan 30° = \\dfrac{v_y}{v_x} \\quad \\Longrightarrow \\quad ' +
                        'v_y = v_x \\cdot \\tan 30°$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'v_x = 37 \\cdot 10^6\\ \\mathrm{m/s} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$v_y = 37 \\cdot 10^6 \\cdot \\tan 30°\\ \\mathrm{m/s} ' +
                        '\\approx 21{,}4 \\cdot 10^6\\ \\mathrm{m/s}$$',
                    figur: 'u19-s2',
                },
                {
                    rubrik: 'Rita ut kraften och beräkna accelerationen',
                    varfor: 'Hela hastighetsändringen i $y$-led byggs upp inne mellan plattorna, där den ' +
                        'elektriska kraften verkar. Fältet är homogent, så kraften och accelerationen är ' +
                        'konstanta — elektronen dras mot den positiva plattan.',
                    text: '$$v_y = v_{0y} + at \\quad \\Longrightarrow \\quad ' +
                        'a = \\dfrac{v_y - 0}{t}$$\n\n' +
                        'Mätvärden:\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'v_y \\approx 21{,}4 \\cdot 10^6\\ \\mathrm{m/s}\\ \\text{(beräknad ovan)} \\\\ ' +
                        't \\approx 8{,}1 \\cdot 10^{-10}\\ \\mathrm{s}\\ \\text{(beräknad ovan)} \\\\ ' +
                        'm \\approx 9{,}11 \\cdot 10^{-31}\\ \\mathrm{kg}\\ \\text{(elektronens massa)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$a = \\dfrac{21{,}4 \\cdot 10^6}{8{,}1 \\cdot 10^{-10}}\\ ' +
                        '\\mathrm{m/s^2} \\approx 2{,}6 \\cdot 10^{16}\\ \\mathrm{m/s^2}$$\n\n' +
                        '$$F = m \\cdot a = 9{,}11 \\cdot 10^{-31} \\cdot 2{,}6 \\cdot 10^{16}\\ \\mathrm{N} ' +
                        '\\approx 2{,}4 \\cdot 10^{-14}\\ \\mathrm{N}$$',
                    figur: 'u19-s3',
                },
                {
                    rubrik: 'Gå från kraft till spänning',
                    varfor: 'Kraften kommer från det elektriska fältet: $F = qE$. I ett homogent fält ' +
                        'mellan två plattor med avståndet $d$ är fältstyrkan $E = U/d$ — det ger ' +
                        'spänningen.',
                    text: '$$F = q \\cdot E = q \\cdot \\dfrac{U}{d} \\quad \\Longrightarrow \\quad ' +
                        'U = \\dfrac{F \\cdot d}{q}$$\n\n' +
                        'Mätvärden (efter omvandling till SI-enheter):\n\n' +
                        '$$\\left[ \\begin{array}{l} ' +
                        'F \\approx 2{,}4 \\cdot 10^{-14}\\ \\mathrm{N}\\ \\text{(beräknad ovan)} \\\\ ' +
                        'd = 4{,}0\\ \\mathrm{cm} = 0{,}040\\ \\mathrm{m} \\\\ ' +
                        'q \\approx 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}\\ \\text{(elementarladdningen)} ' +
                        '\\end{array} \\right]$$\n\n' +
                        '$$U = \\dfrac{2{,}4 \\cdot 10^{-14} \\cdot 0{,}040}{1{,}602 \\cdot 10^{-19}}\\ \\mathrm{V} ' +
                        '\\approx 6{,}0\\ \\mathrm{kV}$$',
                },
            ],
            svar: 'Avlänkningsspänningen är $U \\approx 6{,}0\\ \\mathrm{kV}$.',
            bedomning: [
                ['Godtagbar beräkning av passagetiden, $8{,}1 \\cdot 10^{-10}\\ \\mathrm{s}$', '+C'],
                ['med godtagbar beräkning av hastigheten i $y$-led, $21{,}4\\ \\mathrm{Mm/s}$', '+A'],
                ['med godtagbar fortsättning, t.ex. beräknar resulterande kraft i $y$-led, $2{,}4 \\cdot 10^{-14}\\ \\mathrm{N}$', '+A'],
                ['med i övrigt godtagbar lösning och svar ($6{,}0\\ \\mathrm{kV}$)', '+A'],
            ],
        },
    ],
};
