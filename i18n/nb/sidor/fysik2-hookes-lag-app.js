/* i18n/nb/sidor/fysik2-hookes-lag-app.js — norska (bokmål) för
 * simuleringen Hookes lag, med läget Kopplade fjädrar (?lage=kopplade).
 * Canvas-texten i kopplade-fjadrar.js (namnen och antal svängningar)
 * översätts med I18N.t och har sina nycklar här. */
(function () {
    I18N.add({
        'Hookes lag — Fysiklabbet': 'Hookes lov — Fysiklabbet',
        'Hookes lag — Fysik nivå 2': 'Hookes lov — Fysikk nivå 2',
        'En vikt i en spiralfjäder. Ställ in belastande kraft och fjäderkonstant, dra vikten ur jämviktsläget och släpp — visa fjäderkraft, resulterande kraft, hastighet, acceleration och jämviktsläge, med odämpad eller dämpad svängning (F = k · Δl, F_R = −k · y).':
            'Et lodd i en spiralfjær. Still inn belastende kraft og fjærkonstant, dra loddet ut av likevektsstillingen og slipp. Vis fjærkraft, resultantkraft, hastighet, akselerasjon og likevektsstilling, med udempet eller dempet svingning (F = k · Δl, F_R = −k · y).',
        '/ Hookes lag': '/ Hookes lov',
        'Hookes lag': 'Hookes lov',
        'Fjäderenergi och kopplade fjädrar': 'Fjærenergi og koblede fjærer',
        'Harmonisk svängning': 'Harmonisk svingning',

        // Lägesval
        'Välj läge': 'Velg modus',
        'En fjäder': 'Én fjær',
        'Kopplade fjädrar': 'Koblede fjærer',

        // Ingress
        'En vikt hänger i en spiralfjäder. Ju större kraft': 'Et lodd henger i en spiralfjær. Jo større kraften',
        'som belastar fjädern, desto större blir förlängningen Δ': 'som belaster fjæren er, desto større blir forlengelsen Δ',
        '— det är': 'ifølge',
        '. Ta tag i vikten, dra den ur jämviktsläget och släpp, så börjar den svänga. Visa krafterna, hastigheten och accelerationen och se att den resulterande kraften alltid är riktad mot jämviktsläget.':
            '. Ta tak i loddet, dra det ut av likevektsstillingen og slipp, så begynner det å svinge. Vis kreftene, hastigheten og akselerasjonen, og se at resultantkraften alltid er rettet mot likevektsstillingen.',

        // Formelkortet
        'Kraft': 'Kraft',
        'Fjäderkonstant': 'Fjærkonstant',
        'Förlängning': 'Forlengelse',
        'Resulterande kraft': 'Resultantkraft',
        'Elongation': 'Utslag',

        // Inställningsrutan och scenen
        'Fjäderkraft': 'Fjærkraft',
        'fjäder': 'fjær',
        'Tyngdkraft': 'Tyngdekraft',
        'Hastighet': 'Hastighet',
        'Acceleration': 'Akselerasjon',
        'Jämviktsläge (': 'Likevektsstilling (',
        'Jämviktsläge': 'Likevektsstilling',
        'Förlängning Δ': 'Forlengelse Δ',
        'Svängning': 'Svingning',
        'Odämpad (harmonisk)': 'Udempet (harmonisk)',
        'Dämpad': 'Dempet',
        'Tempo': 'Tempo',
        'Ultrarapid (en femtedel av normal fart)': 'Sakte film (en femtedel av normal fart)',
        'Ta tag i vikten, dra och släpp — den börjar svänga': 'Ta tak i loddet, dra og slipp, så begynner det å svinge',

        // Reglage
        'Belastande kraft (': 'Belastende kraft (',
        'Vikten belastar fjädern med sin tyngd,': 'Loddet belaster fjæren med tyngden sin,',
        ', så viktens massa är': ', så massen til loddet er',
        'Fjäderkonstant (': 'Fjærkonstant (',
        'Ett mått på hur "hård" fjädern är — ju större': 'Et mål på hvor «stiv» fjæren er: jo større',
        ', desto mer kraft krävs för att dra ut den.': ', desto mer kraft trengs for å dra den ut.',

        // Avläsning
        'Avläsning (positiv riktning: uppåt)': 'Avlesning (positiv retning: oppover)',
        'I jämviktsläget:': 'I likevektsstillingen:',
        'och': 'og',
        'Två krafter — en resultant': 'To krefter gir én resultant',
        'På vikten verkar': 'På loddet virker',
        'fjäderkraften': 'fjærkraften',
        'uppåt och': 'oppover og',
        'tyngdkraften': 'tyngdekraften',
        'nedåt. Tillsammans bildar de den': 'nedover. Sammen gir de',
        'resulterande kraften': 'resultantkraften',
        ', som alltid pekar mot jämviktsläget — minustecknet betyder att kraften har motsatt riktning mot elongationen.':
            ', som alltid peker mot likevektsstillingen. Minustegnet betyr at kraften har motsatt retning av utslaget.',

        // Förklaringsrutor
        'Jämviktsläget': 'Likevektsstillingen',
        'När vikten hänger i vila är tyngdkraften lika stor som fjäderkraften — den resulterande kraften är 0. Ur förlängningen kan vi bestämma tyngden på det som hänger i fjädern:':
            'Når loddet henger i ro, er tyngdekraften like stor som fjærkraften, og resultantkraften er 0. Ut fra forlengelsen kan vi bestemme tyngden av det som henger i fjæren:',
        '. Det är den principen en': '. Det er dette prinsippet et',
        'dynamometer': 'dynamometer',
        'bygger på, som används för att mäta krafter.': 'bygger på, og det brukes til å måle krefter.',
        'Elongationen har tecken': 'Utslaget har fortegn',
        'Viktens läge i förhållande till jämviktsläget betecknas': 'Posisjonen til loddet i forhold til likevektsstillingen betegnes',
        'och kallas': 'og kalles',
        'elongation': 'utslag',
        '< 0 betyder att vikten är under jämviktsläget,': '< 0 betyr at loddet er under likevektsstillingen,',
        '> 0 att den är över. Avståndet mellan ett vändläge och jämviktsläget kallas': '> 0 at det er over. Avstanden mellom et vendepunkt og likevektsstillingen kalles',
        'amplitud': 'amplitude',
        'Fart och acceleration': 'Fart og akselerasjon',
        'Farten är som störst i': 'Farten er størst i',
        'jämviktsläget': 'likevektsstillingen',
        '— där finns ingen resulterande kraft som bromsar — och 0 i vändlägena. Accelerationen':
            '(der er det ingen resultantkraft som bremser) og 0 i vendepunktene. Akselerasjonen',
        'är tvärtom som störst i': 'er tvert imot størst i',
        'vändlägena': 'vendepunktene',
        '(där resultanten är som störst) och 0 i jämviktsläget. Slå på pilarna för':
            '(der resultanten er størst) og 0 i likevektsstillingen. Slå på pilene for',
        'och jämför!': 'og sammenlign!',
        'Dämpad eller harmonisk svängning?': 'Dempet eller harmonisk svingning?',
        'I verkligheten minskar amplituden och vikten stannar till slut — en sådan avtagande svängning kallas':
            'I virkeligheten minker amplituden, og loddet stopper til slutt. En slik avtagende svingning kalles',
        'dämpad svängning': 'dempet svingning',
        'och beror på energiförluster i form av värme i fjädern. Tar vi bort energiförlusterna fortsätter vikten att pendla oförändrat mellan samma vändlägen, med oförändrad amplitud — en':
            'og skyldes energitap i form av varme i fjæren. Fjerner vi energitapet, fortsetter loddet å pendle uendret mellom de samme vendepunktene, med uendret amplitude. Det er en',
        'harmonisk svängning': 'harmonisk svingning',
        '. I uppgifter bortser vi från energiförluster, om inte annat anges. Växla mellan lägena med radioknapparna uppe till höger i scenen.':
            '. I oppgaver ser vi bort fra energitap hvis ikke annet er oppgitt. Bytt mellom modusene med radioknappene øverst til høyre i scenen.',
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Fjäderkraften är alltid lika med tyngdkraften."': '«Fjærkraften er alltid lik tyngdekraften.»',
        'Det gäller bara i jämviktsläget. Under svängningen varierar fjäderkraften med förlängningen (':
            'Det gjelder bare i likevektsstillingen. Under svingningen varierer fjærkraften med forlengelsen (',
        ') — det är just skillnaden mot tyngdkraften som ger resultanten': '). Det er nettopp forskjellen mellom den og tyngdekraften som gir resultanten',
        '"Accelerationen är störst där farten är störst."': '«Akselerasjonen er størst der farten er størst.»',
        'Tvärtom: i jämviktsläget är farten maximal men accelerationen 0, och i vändlägena är farten 0 men accelerationen maximal.':
            'Tvert imot: i likevektsstillingen er farten maksimal, men akselerasjonen 0, og i vendepunktene er farten 0, men akselerasjonen maksimal.',
        '"Elongationen mäts från fjäderns olastade läge."': '«Utslaget måles fra fjærens ubelastede stilling.»',
        'Nej —': 'Nei,',
        'mäts från': 'måles fra',
        '(där vikten hänger i vila). Förlängningen Δ': '(der loddet henger i ro). Forlengelsen Δ',
        'mäts däremot från fjäderns olastade längd.': 'måles derimot fra fjærens ubelastede lengde.',

        // Läget Kopplade fjädrar
        'Tre upphängningar med likadana fjädrar: en ensam fjäder, två seriekopplade och två parallellkopplade. Häng samma massa i alla tre och jämför förlängningarna. Sätt dem sedan i svängning och se vilken som svänger snabbast.':
            'Tre oppheng med like fjærer: én fjær alene, to seriekoblede og to parallellkoblede. Heng samme masse i alle tre og sammenlign forlengelsene. Sett dem deretter i svingning og se hvilken som svinger raskest.',
        'Serie': 'Serie',
        'Parallellt': 'Parallelt',
        'Resulterande fjäderkonstant': 'Resulterende fjærkonstant',
        'Antal fjädrar': 'Antall fjærer',
        'Häng i vikterna': 'Heng på loddene',
        'Ta bort vikterna': 'Ta av loddene',
        'Sätt i svängning': 'Sett i svingning',
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Periodtid': 'Periode',
        'Massa (': 'Masse (',
        'Massa i varje upphängning (': 'Masse i hvert oppheng (',
        'Samma vikt hänger i alla tre upphängningarna. Parallellt hänger den mitt under stången.':
            'Det samme loddet henger i alle tre oppheng. I parallellkoblingen henger det midt under stangen.',
        'Fjäderkonstant för varje fjäder (': 'Fjærkonstant for hver fjær (',
        'Alla fjädrar är likadana och har samma fjäderkonstant.': 'Alle fjærene er like og har samme fjærkonstant.',
        'En fjäder, två seriekopplade och två parallellkopplade fjädrar bredvid varandra med samma massa i varje upphängning.':
            'Én fjær, to seriekoblede og to parallellkoblede fjærer ved siden av hverandre, med samme masse i hvert oppheng.',
        'Avläsning': 'Avlesning',
        'Seriekoppling': 'Seriekobling',
        'Parallellkoppling': 'Parallellkobling',
        '{n} svängning': '{n} svingning',
        '{n} svängningar': '{n} svingninger',
        'Mjukare svänger långsammare': 'Mykere svinger langsommere',
        'Periodtiden är': 'Perioden er',
        '. Seriekopplingen har halva fjäderkonstanten och svänger därför √2 ≈ 1,4 gånger långsammare än en ensam fjäder. Parallellkopplingen har dubbla fjäderkonstanten och svänger 1,4 gånger snabbare.':
            '. Seriekoblingen har halvparten så stor fjærkonstant og svinger derfor √2 ≈ 1,4 ganger langsommere enn én fjær alene. Parallellkoblingen har dobbelt så stor fjærkonstant og svinger 1,4 ganger raskere.',
        'Fjädrarna sitter efter varandra, så varje fjäder bär hela tyngden och förlängs lika mycket som när den hänger ensam. Med':
            'Fjærene sitter etter hverandre, så hver fjær bærer hele tyngden og forlenges like mye som når den henger alene. Med',
        'fjädrar blir förlängningen': 'fjærer blir forlengelsen',
        'gånger så stor, och kopplingen är': 'ganger så stor, og koblingen er',
        'mjukare': 'mykere',
        'Fjädrarna sitter bredvid varandra och delar på tyngden. Var och en förlängs bara en':
            'Fjærene sitter ved siden av hverandre og deler på tyngden. Hver av dem forlenges bare en',
        '-del så mycket, och kopplingen är': '-del så mye, og koblingen er',
        'styvare': 'stivere',
        'Samma massa överallt': 'Samme masse overalt',
        'Samma vikt hänger i alla tre upphängningarna. I parallellkopplingen hänger den mitt under stången, så att fjädrarna delar lika på tyngden. Det är alltså bara kopplingen som skiljer dem åt.':
            'Det samme loddet henger i alle tre oppheng. I parallellkoblingen henger det midt under stangen, slik at fjærene deler likt på tyngden. Det er altså bare koblingen som skiller dem fra hverandre.'
    });
})();
