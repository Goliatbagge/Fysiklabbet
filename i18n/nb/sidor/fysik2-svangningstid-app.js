/* i18n/nb/sidor/fysik2-svangningstid-app.js — norska (bokmål) för
 * simuleringen Svängningstid i fjäder. */
(function () {
    I18N.add({
        // Sidhuvud och metadata
        'Svängningstid i fjäder — Fysiklabbet': 'Svingetid for fjærpendel — Fysiklabbet',
        'Svängningstid i fjäder — Fysik nivå 2': 'Svingetid for fjærpendel — Fysikk nivå 2',
        'En vikt som svänger i en spiralfjäder, med en y–t-graf där perioden markeras direkt i kurvan. Ändra massa, fjäderkonstant och amplitud och se hur T = 2π · √(m/k) styr svängningen — och jämför med en vikt med halva amplituden för att se att perioden inte beror på amplituden.':
            'Et lodd som svinger i en spiralfjær, med en y–t-graf der perioden markeres direkte i kurven. Endre masse, fjærkonstant og amplitude og se hvordan T = 2π · √(m/k) styrer svingningen, og sammenlign med et lodd med halve amplituden for å se at perioden ikke avhenger av amplituden.',
        '/ Svängningstid i fjäder': '/ Svingetid for fjærpendel',
        'Svängningstid i fjäder': 'Svingetid for fjærpendel',

        // Ingressen
        'Hur lång tid tar en svängning för en vikt som hänger i en fjäder? Perioden beror':
            'Hvor lang tid tar en svingning for et lodd som henger i en fjær? Perioden avhenger',
        'enbart': 'bare',
        'på viktens massa': 'av loddets masse',
        'och på fjäderkonstanten': 'og av fjærkonstanten',
        '— den beror': 'og altså',
        'inte': 'ikke',
        'på svängningens amplitud. Ändra': 'av amplituden til svingningen. Endre',
        'och amplituden': 'og amplituden',
        'med reglagen (eller dra i vikten och släpp) och läs av perioden': 'med kontrollene (eller dra i loddet og slipp) og les av perioden',
        'i grafen.': 'i grafen.',

        // Formelkortet
        'Periodtid': 'Periode',
        'Massa': 'Masse',
        'Fjäderkonstant': 'Fjærkonstant',
        'Vinkelhastighet': 'Vinkelfart',

        // Scenen och inställningsrutan
        'Frekvens': 'Frekvens',
        'Ta tag i vikten, dra och släpp — eller styr amplituden med reglaget': 'Ta tak i loddet, dra og slipp, eller styr amplituden med glidebryteren',
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Jämviktsläge (': 'Likevektsstilling (',
        'Jämviktsläge': 'Likevektsstilling',
        'Markera perioden': 'Marker perioden',
        'Jämförelsevikt (halva amplituden)': 'Sammenligningslodd (halve amplituden)',
        'Amplitud': 'Amplitude',

        // Reglagen
        'Massa (': 'Masse (',
        'Fjäderkonstant (': 'Fjærkonstant (',
        'Amplitud (': 'Amplitude (',
        'Tyngre vikt svänger långsammare — och fjädern töjs mer i jämviktsläget.': 'Et tyngre lodd svinger langsommere, og fjæren strekkes mer i likevektsstillingen.',
        'Ju styvare fjäder (större': 'Jo stivere fjær (større',
        '), desto kortare period.': '), desto kortere periode.',
        'Hur långt från jämviktsläget vikten släpps. Påverkar': 'Hvor langt fra likevektsstillingen loddet slippes. Påvirker',
        'perioden!': 'perioden!',

        // Beräkning och avläsning
        'Beräkning av perioden': 'Beregning av perioden',
        'Massa 100 g, fjäderkonstant 11 N/m, dras ner 5,0 cm': 'Masse 100 g, fjærkonstant 11 N/m, trekkes ned 5,0 cm',
        'Ställ in exempel 1 ur teorin (100-gramsvikt, dras ner 5,0 cm)': 'Still inn eksempel 1 fra teorien (lodd på 100 gram, trekkes ned 5,0 cm)',
        'Avläsning': 'Avlesning',
        'Förlängning i jämvikt Δ': 'Forlengelse i likevekt Δ',
        'Perioden beror bara på': 'Perioden avhenger bare av',
        'och': 'og',
        '— inte på amplituden': 'og ikke av amplituden',
        '. Slå på': '. Slå på',
        'jämförelsevikten': 'sammenligningsloddet',
        'uppe till höger och se att båda vikterna svänger i takt, fast utslagen är olika stora.':
            'oppe til høyre og se at begge loddene svinger i takt, selv om utslagene er ulike store.',

        // De pedagogiska rutorna
        'Tyngre vikt — längre period': 'Tyngre lodd, lengre periode',
        'Perioden växer med roten ur massan,': 'Perioden vokser med kvadratroten av massen,',
        '. En fyra gånger så tung vikt ger alltså dubbelt så lång period — inte fyra gånger så lång. Dra i massareglaget och se hur kurvan i grafen sträcks ut.':
            '. Et fire ganger så tungt lodd gir altså dobbelt så lang periode, ikke fire ganger så lang. Dra i glidebryteren for massen og se hvordan kurven i grafen strekkes ut.',
        'Styvare fjäder — kortare period': 'Stivere fjær, kortere periode',
        'Fjäderkonstanten står under bråkstrecket:': 'Fjærkonstanten står under brøkstreken:',
        '. En styvare fjäder drar tillbaka vikten med större kraft, så svängningen går snabbare — en fyra gånger så styv fjäder halverar perioden.':
            '. En stivere fjær trekker loddet tilbake med større kraft, så svingningen går raskere. En fire ganger så stiv fjær halverer perioden.',
        'Amplituden spelar ingen roll': 'Amplituden spiller ingen rolle',
        'Större amplitud betyder längre väg per svängning — men också större återförande kraft och högre fart. Effekterna tar ut varandra exakt, så perioden blir densamma. Testa med jämförelsevikten som svänger med halva amplituden!':
            'Større amplitude betyr lengre vei per svingning, men også større tilbakeførende kraft og høyere fart. Virkningene opphever hverandre nøyaktig, så perioden blir den samme. Prøv med sammenligningsloddet, som svinger med halve amplituden!',

        // Var kommer formeln ifrån?
        'Var kommer formeln ifrån?': 'Hvor kommer formelen fra?',
        'Från avsnitt 1.3 vet vi redan att periodtiden och vinkelhastigheten hänger ihop:':
            'Fra delkapittel 1.3 vet vi allerede at perioden og vinkelfarten henger sammen:',
        '. Det som behövs är alltså ett uttryck för': '. Det vi trenger, er altså et uttrykk for',
        '. Den resulterande kraften i en fjädersvängning ger en acceleration enligt Newtons andra lag,':
            '. Resultantkraften i en fjærsvingning gir en akselerasjon etter Newtons andre lov,',
        '. I en harmonisk svängning är accelerationen i varje läge': '. I en harmonisk svingning er akselerasjonen i hver posisjon',
        ', och sedan tidigare vet vi att den resulterande kraften i varje läge är':
            ', og fra før vet vi at resultantkraften i hver posisjon er',
        '. Sätter vi de två uttrycken lika och dividerar med −': '. Vi setter de to uttrykkene lik hverandre, dividerer med −',
        'får vi': 'og får',
        ', det vill säga': ', det vil si',
        '. Insatt i': '. Satt inn i',
        'ger det formeln': 'gir det formelen',
        '. Hela härledningen finns steg för steg i teorigenomgången för avsnitt 2.4.':
            '. Hele utledningen står trinn for trinn i teorigjennomgangen for delkapittel 2.4.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Större amplitud ger längre period."': '«Større amplitude gir lengre periode.»',
        'Nej — amplituden finns inte med i formeln. Vikten hinner den längre vägen exakt lika fort eftersom kraften (och farten) också blir större. Jämförelsevikten visar det direkt.':
            'Nei, amplituden er ikke med i formelen. Loddet tilbakelegger den lengre veien på nøyaktig like lang tid fordi kraften (og farten) også blir større. Sammenligningsloddet viser det direkte.',
        '"Tyngdkraften ingår i formeln."': '«Tyngdekraften inngår i formelen.»',
        'Nej — tyngdfaktorn': 'Nei, tyngdeakselerasjonen',
        'påverkar bara': 'påvirker bare',
        'var': 'hvor',
        'jämviktsläget hamnar, inte perioden. Samma vikt i samma fjäder svänger lika fort på månen som på jorden. (Jämför med den plana pendeln i avsnitt 2.5, där':
            'likevektsstillingen havner, ikke perioden. Det samme loddet i den samme fjæren svinger like fort på månen som på jorden. (Sammenlign med den plane pendelen i delkapittel 2.5, der',
        'faktiskt ingår.)': 'faktisk inngår.)',
        '"Dubbel massa ger dubbel period."': '«Dobbel masse gir dobbel periode.»',
        'Nej — perioden växer med': 'Nei, perioden vokser med',
        'roten ur': 'kvadratroten av',
        'massan: dubbel massa ger √2 ≈ 1,4 gånger så lång period. Först fyrdubblad massa dubblar perioden.':
            'massen: dobbel masse gir √2 ≈ 1,4 ganger så lang periode. Først når massen firedobles, dobles perioden.'
    });
})();
