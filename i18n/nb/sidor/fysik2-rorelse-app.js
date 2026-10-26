/* i18n/nb/sidor/fysik2-rorelse-app.js — norska (bokmål) för simuleringen
 * Snett kast. */
(function () {
    I18N.add({
        // ---- Sidhuvud och metadata ----
        'Snett kast — Fysiklabbet': 'Skrått kast — Fysiklabbet',
        'Snett kast — Fysik nivå 2': 'Skrått kast — Fysikk nivå 2',
        'Kasta en tennisboll i ett snett kast och följ hastighetsvektorerna: hastigheten i x-led är konstant, hastigheten i y-led ändras av tyngdaccelerationen. Ändra utkastvinkel, utgångshastighet och utkasthöjd, stega bildruta för bildruta, slå på luftmotstånd eller kasta på månen.':
            'Kast en tennisball i et skrått kast og følg hastighetsvektorene: hastigheten i x-retning er konstant, hastigheten i y-retning endres av tyngdeakselerasjonen. Endre kastevinkel, starthastighet og kastehøyde, gå frem bilde for bilde, slå på luftmotstand eller kast på månen.',
        '/ Snett kast': '/ Skrått kast',
        'Snett kast': 'Skrått kast',

        // ---- Ingressen ----
        'En tennisboll kastas med utgångshastigheten': 'En tennisball kastes med starthastigheten',
        'i vinkeln': 'i vinkelen',
        'mot marken och följer en': 'mot bakken og følger en',
        'kastparabel': 'kasteparabel',
        '. Rörelsen delas upp i två oberoende delar: i': '. Bevegelsen deles opp i to uavhengige deler: i',
        '-led är hastigheten': '-retning er hastigheten',
        'konstant': 'konstant',
        '-led ändras den hela tiden av tyngdaccelerationen': '-retning endres den hele tiden av tyngdeakselerasjonen',
        '. Kasta, pausa och stega bildruta för bildruta, visa hastighetsvektorerna en led i taget, slå på luftmotstånd eller ta med bollen till månen.':
            '. Kast, sett på pause og gå frem bilde for bilde, vis hastighetsvektorene én retning om gangen, slå på luftmotstand eller ta med ballen til månen.',

        // ---- Formelkortet ----
        'Hastighet i x-led': 'Hastighet i x-retning',
        'Hastighet i y-led': 'Hastighet i y-retning',
        'Utgångshastighet': 'Starthastighet',
        'Vinkel': 'Vinkel',
        'Tyngdacceleration': 'Tyngdeakselerasjon',
        'Tid': 'Tid',
        'cos': 'cos',
        'sin': 'sin',
        '· cos': '· cos',
        'max': 'max',
        '² · sin (2': '² · sin (2',

        // ---- Scenen ----
        'En tennisboll kastas i ett snett kast på rutat papper. Röda pilar visar hastigheten i x-led och y-led, en blå pil den totala hastigheten.':
            'En tennisball kastes i et skrått kast på rutepapir. Røde piler viser hastigheten i x-retning og y-retning, og en blå pil viser den totale hastigheten.',
        'Luftmotstånd påslaget: banan är inte längre en symmetrisk parabel.': 'Luftmotstand slått på: banen er ikke lenger en symmetrisk parabel.',
        'Luftmotståndet försummas. Hastigheten i x-led är konstant hela vägen.': 'Vi ser bort fra luftmotstanden. Hastigheten i x-retning er konstant hele veien.',

        // ---- Inställningsrutan ----
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Hastighet i': 'Hastighet i',
        '-led': '-retning',
        'Total hastighet': 'Total hastighet',
        'Koordinataxlar': 'Koordinatakser',
        'Symmetrilinje': 'Symmetrilinje',
        'Luftmotstånd': 'Luftmotstand',
        'Luftmotståndets storlek (': 'Størrelsen på luftmotstanden (',
        'Utkastvinkel (': 'Kastevinkel (',
        'Utgångshastighet (': 'Starthastighet (',
        'Utkasthöjd (': 'Kastehøyde (',
        'Tyngdacceleration (': 'Tyngdeakselerasjon (',
        'Skriv in värde': 'Skriv inn verdi',

        // ---- Kastet ----
        'Kastet': 'Kastet',
        'Utkastvinkel': 'Kastevinkel',
        'Utkasthöjd': 'Kastehøyde',
        'Kasta': 'Kast',
        'Kasta igen': 'Kast igjen',
        'Stega bakåt': 'Gå et steg tilbake',
        'Stega framåt': 'Gå et steg frem',
        'Stega bakåt en bildruta': 'Gå ett bilde bakover',
        'Stega framåt en bildruta': 'Gå ett bilde fremover',
        'Pilknapparna stegar kastet en bildruta (': 'Pilknappene flytter kastet ett bilde (',
        'ms) i taget; ett pågående kast pausas då. Visningsval, luftmotstånd och ultrarapid väljs i rutan uppe till höger på scenen.':
            'ms) om gangen; et kast som pågår, settes da på pause. Visningsvalg, luftmotstand og sakte film velges i boksen øverst til høyre på scenen.',

        // ---- Tyngdaccelerationen ----
        'Tyngdaccelerationen': 'Tyngdeakselerasjonen',
        'eller välj en himlakropp': 'eller velg et himmellegeme',
        'Solen': 'Solen',
        'Merkurius': 'Merkur',
        'Venus': 'Venus',
        'Jorden': 'Jorden',
        'Månen': 'Månen',
        'Mars': 'Mars',
        'Jupiter': 'Jupiter',
        'Saturnus': 'Saturn',
        'Uranus': 'Uranus',
        'Neptunus': 'Neptun',

        // ---- Avläsning ----
        'Avläsning': 'Avlesning',
        'tid': 'tid',
        'läge': 'posisjon',
        'hastighet': 'hastighet',
        'fart': 'fart',
        'stighöjd': 'stigehøyde',
        'kastvidd': 'kastelengde',
        'tid i luften': 'tid i luften',

        // ---- Förklaringskorten ----
        'Två oberoende rörelser': 'To uavhengige bevegelser',
        'Ingen kraft verkar i': 'Ingen kraft virker i',
        '-led när luftmotståndet försummas, så': '-retning når vi ser bort fra luftmotstanden, så',
        'är lika stor hela vägen. I': 'er like stor hele veien. I',
        '-led verkar bara tyngdkraften: bollen bromsas på väg upp, står stilla i höjdled i högsta punkten och accelererar sedan nedåt, precis som vid fritt fall. Pausa kastet och stega fram bildruta för bildruta, så ser du att den röda pilen i':
            '-retning virker bare tyngdekraften: ballen bremses på vei opp, står stille i vertikal retning i det høyeste punktet og akselererer deretter nedover, akkurat som ved fritt fall. Sett kastet på pause og gå frem bilde for bilde, så ser du at den røde pilen i',
        '-led aldrig ändrar längd.': '-retning aldri endrer lengde.',
        'Symmetrin kring högsta punkten': 'Symmetrien om det høyeste punktet',
        'Startar och slutar kastet i samma höjd är parabeln symmetrisk kring sin högsta punkt: tiden upp är lika lång som tiden ned, och bollen slår i marken med samma fart som den kastades med, fast riktad snett nedåt. Kryssa i symmetrilinjen efter nedslaget. Med luftmotstånd bryts symmetrin: bollen faller brantare än den steg. Luftmotståndet startar på ballongnivå; dra ned det mot en tennisbolls (0,01) och se skillnaden krympa.':
            'Starter og slutter kastet i samme høyde, er parabelen symmetrisk om sitt høyeste punkt: tiden opp er like lang som tiden ned, og ballen treffer bakken med samme fart som den ble kastet med, men rettet skrått nedover. Kryss av for symmetrilinjen etter nedslaget. Med luftmotstand brytes symmetrien: ballen faller brattere enn den steg. Luftmotstanden starter på ballongnivå; dra den ned mot nivået for en tennisball (0,01) og se forskjellen krympe.',
        'Vinkeln avgör kastvidden': 'Vinkelen avgjør kastelengden',
        'Kastvidden': 'Kastelengden',
        'är störst vid 45°, och två vinklar som ligger lika långt från 45° ger samma vidd: prova 30° och 60°. Dubblar du utgångshastigheten blir kastet fyra gånger så långt, och på månen, där':
            'er størst ved 45°, og to vinkler som ligger like langt fra 45°, gir samme kastelengde: prøv 30° og 60°. Dobler du starthastigheten, blir kastet fire ganger så langt, og på månen, der',
        'är en sjättedel av jordens, sex gånger så långt.': 'er en sjettedel av verdien på jorden, seks ganger så langt.',

        // ---- Vanliga missuppfattningar ----
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”I högsta punkten står bollen stilla.”': '«I det høyeste punktet står ballen stille.»',
        'Bara hastigheten i': 'Bare hastigheten i',
        '-led är noll där. Bollen rör sig fortfarande framåt med': '-retning er null der. Ballen beveger seg fortsatt fremover med',
        ', och den totala hastigheten är som minst men inte noll. Accelerationen är dessutom lika stor som överallt annars:':
            ', og den totale hastigheten er på sitt minste, men ikke null. Akselerasjonen er dessuten like stor som overalt ellers:',
        ', riktad rakt nedåt.': ', rettet rett nedover.',
        '”Bollen bromsas av tyngdkraften även i sidled.”': '«Ballen bremses av tyngdekraften også sidelengs.»',
        'Tyngdkraften är riktad rakt nedåt och påverkar bara rörelsen i': 'Tyngdekraften er rettet rett nedover og påvirker bare bevegelsen i',
        '-led. Att kastet ändå tar slut beror på att bollen når marken, inte på att den saktar in i':
            '-retning. At kastet likevel tar slutt, skyldes at ballen når bakken, ikke at den bremser opp i',
        '-led.': '-retning.',
        '”Ett tyngre föremål landar tidigare.”': '«En tyngre gjenstand lander tidligere.»',
        'Utan luftmotstånd följer alla föremål samma bana oavsett massa, eftersom accelerationen':
            'Uten luftmotstand følger alle gjenstander samme bane uansett masse, fordi akselerasjonen',
        'är densamma. Det är luftmotståndet som gör att en ballong och en tennisboll får olika banor.':
            'er den samme. Det er luftmotstanden som gjør at en ballong og en tennisball får ulike baner.',
        '”Formeln för kastvidd gäller alltid.”': '«Formelen for kastelengde gjelder alltid.»',
        'Den gäller bara när kastet startar och slutar i samma höjd. Ställ in en utkasthöjd och jämför: bollen landar längre bort än formeln säger, och då måste tiden lösas ut ur':
            'Den gjelder bare når kastet starter og slutter i samme høyde. Still inn en kastehøyde og sammenlign: ballen lander lenger unna enn formelen sier, og da må tiden løses ut av',
        '-ekvationen först.': '-likningen først.'
    });
})();
