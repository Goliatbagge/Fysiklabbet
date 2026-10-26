/* i18n/nb/sidor/fysik2-pendel-3d-app.js — norska (bokmål) för simuleringen
 * Pendelvågen i 3D (femton pendlar, och en pendel med krafter). JSX-texten
 * är delad runt <em>/<sub>/<strong>, så många nycklar är fragment av en
 * mening. Etiketterna i 3D-scenen och kameraknappens title översätts med
 * I18N.t (tr) i koden. */
(function () {
    I18N.add({
        // Sidhuvud och delning
        'Pendelvågen i 3D — Fysiklabbet': 'Pendelbølgen i 3D — Fysiklabbet',
        'Pendelvågen i 3D — Fysik nivå 2': 'Pendelbølgen i 3D — Fysikk nivå 2',
        'Femton pendlar hänger bredvid varandra, och ju kortare pendel, desto kortare periodtid. Släpp dem samtidigt och se ormar, vågor och kaos som efter en bestämd tid ordnar sig i en rad igen. Byt himlakropp, utslag och kameravy, eller undersök en enda pendel och dess krafter.':
            'Femten pendler henger ved siden av hverandre, og jo kortere pendel, desto kortere periode. Slipp dem samtidig og se slanger, bølger og kaos som etter en bestemt tid ordner seg på rekke igjen. Bytt himmellegeme, utslag og kameravinkel, eller undersøk én enkelt pendel og kreftene på den.',
        'Femton pendlar med olika längd släpps samtidigt och bildar ormar och vågor som efter en bestämd tid ordnar sig i en rad igen. Se att periodtiden beror på pendelns längd.':
            'Femten pendler med ulik lengde slippes samtidig og danner slanger og bølger som etter en bestemt tid ordner seg på rekke igjen. Se at perioden avhenger av lengden på pendelen.',
        '/ Pendelvågen i 3D': '/ Pendelbølgen i 3D',
        'Pendelvågen i 3D': 'Pendelbølgen i 3D',

        // Ingressen
        'Femton pendlar hänger bredvid varandra, och varje pendel är en aning kortare än grannen. Eftersom':
            'Femten pendler henger ved siden av hverandre, og hver pendel er litt kortere enn naboen. Siden',
        'kortare pendel ger kortare periodtid': 'kortere pendel gir kortere periode',
        'hamnar de snabbt ur takt: kulorna bildar ormar, vågor och till synes kaos. Längderna är räknade så att pendel nummer':
            'kommer de raskt ut av takt: kulene danner slanger, bølger og tilsynelatende kaos. Lengdene er regnet ut slik at pendel nummer',
        'hinner göra precis 12 +': 'rekker å gjøre nøyaktig 12 +',
        'hela svängningar på samma tid': 'hele svingninger på den samme tiden',
        'mönster': 'mønster',
        ', och då står alla kulor i rad igen. Välj': ', og da står alle kulene på rekke igjen. Velg',
        'Rakt ovanifrån': 'Rett ovenfra',
        'för att se vågformen, byt himlakropp och se hur tiden förlängs, eller undersök':
            'for å se bølgeformen, bytt himmellegeme og se hvordan tiden blir lengre, eller undersøk',
        'en enda pendel': 'én enkelt pendel',
        'och dess krafter.': 'og kreftene på den.',

        // Formelkortet
        'Periodtid': 'Periode',
        'Pendellängd': 'Pendellengde',
        'Tyngdacceleration': 'Tyngdeakselerasjon',
        'Längsta pendeln har': 'Den lengste pendelen har',
        'm och': 'm og',
        'm/s², så': 'm/s², så',
        's. Den kortaste har': 's. Den korteste har',
        's. Pendelns massa och utslag ingår inte i formeln.': 's. Massen og utslaget til pendelen inngår ikke i formelen.',
        'Med': 'Med',
        'm/s² ger formeln': 'm/s² gir formelen',
        's. Den gäller vid små utslag. Pendelns massa ingår inte.': 's. Den gjelder ved små utslag. Massen til pendelen inngår ikke.',

        // Vyväxlaren
        'Vy: 2D, 3D eller pendelvågen': 'Visning: 2D, 3D eller pendelbølgen',
        'Plan pendel med ljusgrind och diagram': 'Plan pendel med lysport og diagram',
        'En pendel med krafter i 3D': 'Én pendel med krefter i 3D',
        'Femton pendlar som bildar en våg': 'Femten pendler som danner en bølge',

        // Scenen
        'Byt kameravy': 'Bytt kameravinkel',
        'Byt kameravy: nu {nu}, nästa {nasta}': 'Bytt kameravinkel: nå {nu}, neste {nasta}',
        'Tid sedan släppet {t} s': 'Tid siden slippet {t} s',
        'Tid {t} s': 'Tid {t} s',
        'Alla i rad igen om': 'Alle på rekke igjen om',
        'Dra för att vrida kameran, rulla för att zooma': 'Dra for å dreie kameraen, rull for å zoome',
        'Tidsfart': 'Tempo',
        'Längst:': 'Lengst:',
        'Kortast:': 'Kortest:',

        // Knappar
        'Släpp': 'Slipp',
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',

        // Inställningsrutan
        'Läge': 'Modus',
        'Pendelvågen, femton pendlar': 'Pendelbølgen, femten pendler',
        'En pendel med krafter': 'Én pendel med krefter',
        'Vågformen på bänken': 'Bølgeformen på benken',
        'Skuggor': 'Skygger',
        'Krafterna': 'Kreftene',
        'och': 'og',
        'Komposanter av': 'Komponenter av',
        'Banan': 'Banen',
        'Skugga': 'Skygge',
        'Etiketter': 'Etiketter',
        'Himlakropp': 'Himmellegeme',
        'Kameravy': 'Kameravinkel',
        'Snett': 'Skrått',
        'Ovanifrån': 'Ovenfra',
        'Sidan': 'Siden',
        'Snett framifrån': 'Skrått forfra',
        'Från sidan': 'Fra siden',

        // Reglagen
        'Mönstrets periodtid (': 'Perioden til mønsteret (',
        'Tiden på Jorden. Längderna är valda så att pendel nummer': 'Tiden på Jorden. Lengdene er valgt slik at pendel nummer',
        'gör 12 +': 'gjør 12 +',
        'hela svängningar på den. Ändrar du tiden byts längderna.': 'hele svingninger på den tiden. Endrer du tiden, får pendlene nye lengder.',
        'Pendellängd (': 'Pendellengde (',
        'Mätt till kulans tyngdpunkt.': 'Målt til tyngdepunktet i kulen.',
        'Massa (': 'Masse (',
        'Påverkar krafterna men inte periodtiden.': 'Påvirker kreftene, men ikke perioden.',
        'Utslag (': 'Utslag (',
        'Vid stort utslag blir varje periodtid lika många procent längre än formeln ger, så mönstret kommer tillbaka lite senare.':
            'Ved stort utslag blir hver periode like mange prosent lengre enn formelen gir, så mønsteret kommer tilbake litt senere.',
        'Vid stora utslag blir periodtiden längre än formeln ger.': 'Ved store utslag blir perioden lengre enn formelen gir.',
        'Under 1 går det i slow motion.': 'Under 1 går det i sakte film.',

        // Himlakroppar
        'Himlakropp (tyngdacceleration': 'Himmellegeme (tyngdeakselerasjon',
        'Månen': 'Månen',
        'Mars': 'Mars',
        'Jorden': 'Jorden',
        'Jupiter': 'Jupiter',
        'Pendlarna är byggda för Jorden. På': 'Pendlene er bygd for Jorden. På',
        'är': 'er',
        'm/s², så varje': 'm/s², så hver',
        'blir': 'blir',
        'gånger så lång och hela mönstret tar': 'ganger så lang, og hele mønsteret tar',
        'Det är tyngdaccelerationen': 'Det er tyngdeakselerasjonen',
        'm/s² som dras in i formeln.': 'm/s² som settes inn i formelen.',

        // Avläsningar
        'Avläsningar': 'Avlesninger',
        'Tid sedan släppet': 'Tid siden slippet',
        'Återföreningstid': 'Tid til gjenforening',
        'Periodtidens avvikelse vid utslaget': 'Avvik i perioden ved utslaget',
        'Stapeln fylls tills pendlarna står i rad igen.': 'Søylen fylles helt til pendlene står på rekke igjen.',
        'Utslag': 'Utslag',
        'Tyngdkraft': 'Tyngdekraft',
        'Spännkraft': 'Snordrag',
        'Tangentiell komposant': 'Tangentiell komponent',
        'Komposant längs snöret': 'Komponent langs snoren',
        'Periodtid, formeln': 'Periode, formelen',
        'Periodtid, uppmätt': 'Periode, målt',
        'väntar': 'venter',
        'Pilarnas längd är proportionell mot kraften: 1 N motsvarar 10 cm.': 'Lengden på pilene er proporsjonal med kraften: 1 N tilsvarer 10 cm.',

        // Diagrammet
        'Periodtid mot längd': 'Periode mot lengde',
        'Diagram över periodtiden mot pendelns längd': 'Diagram over perioden mot lengden på pendelen',
        'Varje prick är en pendel, med samma färg som kulan. Dubbel längd ger inte dubbel periodtid, utan':
            'Hver prikk er en pendel, med samme farge som kulen. Dobbel lengde gir ikke dobbel periode, men',
        'växer med kvadratroten ur': 'vokser med kvadratroten av',

        // Tabellen
        'Pendlarna': 'Pendlene',
        'Nr': 'Nr.',
        'Längd': 'Lengde',
        'Svängningar på': 'Svingninger på',

        // Förklaringsrutorna
        'Varför står de i rad igen?': 'Hvorfor står de på rekke igjen?',
        'Pendel nummer': 'Pendel nummer',
        'har periodtiden': 'har perioden',
        '), så den hinner göra ett helt antal svängningar på': '), så den rekker å gjøre et helt antall svingninger på',
        '. Alla pendlar är då tillbaka i sitt startläge samtidigt, även om de mitt i förloppet svänger åt helt olika håll. Efter halva tiden bildar kulorna två vågor, och vid andra bråkdelar av':
            '. Alle pendlene er da tilbake i startstillingen samtidig, selv om de midt i forløpet svinger i helt ulike retninger. Etter halve tiden danner kulene to bølger, og ved andre brøkdeler av',
        'syns fler och fler små vågor tills det ser slumpmässigt ut.': 'vises flere og flere små bølger, helt til det ser tilfeldig ut.',
        'Stort utslag: samma mönster, lite senare': 'Stort utslag: samme mønster, litt senere',
        'Formeln': 'Formelen',
        ') gäller bara när utslaget är litet. Vid 20° är den verkliga periodtiden knappt 1 % längre, och vid 45° ungefär 4 % längre. Men alla pendlar släpps från samma vinkel, så alla blir lika många procent långsammare. Därför står kulorna ändå i rad igen, bara en stund efter':
            ') gjelder bare når utslaget er lite. Ved 20° er den virkelige perioden knapt 1 % lengre, og ved 45° omtrent 4 % lengre. Men alle pendlene slippes fra samme vinkel, så alle blir like mange prosent langsommere. Derfor står kulene likevel på rekke igjen, bare en stund etter',
        '. Avläsningen Återföreningstid räknar med det.': '. Avlesningen Tid til gjenforening tar hensyn til det.',
        'Prova själv': 'Prøv selv',
        'Släpp pendlarna och välj': 'Slipp pendlene og velg',
        ': den svarta linjen på bänken är vågformen. Välj sedan': ': den svarte linjen på benken er bølgeformen. Velg deretter',
        '. Samma pendlar svänger långsammare, eftersom': '. De samme pendlene svinger langsommere, fordi',
        'är mindre, men mönstret återkommer ändå, bara senare. Byt till': 'er mindre, men mønsteret kommer likevel tilbake, bare senere. Bytt til',
        ', ge den ett stort utslag och följ spännkraften': ', gi den et stort utslag og følg snordraget',
        ': den är större i lägsta punkten än när pendeln står stilla. Tyngdkraften': ': det er større i det laveste punktet enn når pendelen står stille. Tyngdekraften',
        'delas i en komposant längs snöret och en tangentiell komposant': 'deles i en komponent langs snoren og en tangentiell komponent',
        ', som är den kraft som driver pendeln mot jämviktsläget. Teorin finns i genomgången':
            ', som er kraften som driver pendelen mot likevektsstillingen. Teorien finnes i gjennomgangen',
        'Plan matematisk pendel': 'Plan matematisk pendel'
    });
})();
