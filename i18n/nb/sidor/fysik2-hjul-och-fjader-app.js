/* i18n/nb/sidor/fysik2-hjul-och-fjader-app.js — norska (bokmål) för
 * simuleringen Hjulet och fjädern (2D). Scenen ritas av minisim.js
 * (typ hjulprojektion); dess texter ligger här. */
(function () {
    I18N.add({
        'Hjulet och fjädern — Fysiklabbet': 'Hjulet og fjæren — Fysiklabbet',
        'Hjulet och fjädern — Fysik nivå 2': 'Hjulet og fjæren — Fysikk nivå 2',
        'En lampa lyser på ett snurrande cykelhjul, och skuggan av ett stift på hjulet rör sig upp och ned på väggen i exakt samma takt som en vikt i en fjäder. Se hur en harmonisk svängning är projektionen av en cirkelrörelse, och hur grafen blir en sinuskurva.':
            'En lampe lyser på et sykkelhjul som snurrer, og skyggen av en pinne på hjulet beveger seg opp og ned på veggen i nøyaktig samme takt som et lodd i en fjær. Se hvordan en harmonisk svingning er projeksjonen av en sirkelbevegelse, og hvordan grafen blir en sinuskurve.',
        '/ Hjulet och fjädern': '/ Hjulet og fjæren',
        'Hjulet och fjädern': 'Hjulet og fjæren',
        'Hjulet och fjädern i 3D': 'Hjulet og fjæren i 3D',
        'Jämförelse av svängningar': 'Sammenligning av svingninger',
        'Läge, hastighet och acceleration': 'Posisjon, hastighet og akselerasjon',
        'Harmonisk svängning': 'Harmonisk svingning',

        // Ingress
        'En lampa lyser på ett cykelhjul som snurrar med jämn fart. Ett stift sitter på hjulet på avståndet':
            'En lampe lyser på et sykkelhjul som snurrer med jevn fart. En pinne sitter på hjulet i avstand',
        'från navet, och stiftets skugga på väggen rör sig upp och ned i precis samma takt som vikten i fjädern bredvid. En harmonisk svängning är alltså projektionen av en cirkelrörelse på en linje. Grafen till höger ritar upp läget':
            'fra navet, og skyggen av pinnen på veggen beveger seg opp og ned i nøyaktig samme takt som loddet i fjæren ved siden av. En harmonisk svingning er altså projeksjonen av en sirkelbevegelse på en linje. Grafen til høyre tegner posisjonen',
        'mot tiden': 'mot tiden',
        ', och kurvan blir en sinuskurva.': ', og kurven blir en sinuskurve.',
        'Vy: 3D eller 2D': 'Visning: 3D eller 2D',
        'Samma försök i 3D': 'Samme forsøk i 3D',

        // Scenen (minisim.js, hjulprojektion)
        'Lampa': 'Lampe',
        'Vägg': 'Vegg',
        'Snurra hjulet': 'Snurr hjulet',
        'Visa vinkeln': 'Vis vinkelen',
        'Visa graf': 'Vis graf',
        'Visa lampa': 'Vis lampe',
        'Periodtid': 'Periode',
        'Periodtid i sekunder': 'Periode i sekunder',
        'Visa försöket i 3D': 'Vis forsøket i 3D',
        'Tillbaka till den plana figuren': 'Tilbake til den plane figuren',
        'Växla mellan 3D och plan figur': 'Bytt mellom 3D og plan figur',
        'Ett cykelhjul med ett stift på radien A snurrar med jämn fart. En lampa till vänster lyser på hjulet och kastar stiftets skugga på en vägg, och skuggan rör sig upp och ned i takt med en vikt som svänger i en fjäder bredvid. En graf till höger ritar viktens läge y mot tiden t som en sinuskurva.':
            'Et sykkelhjul med en pinne på radien A snurrer med jevn fart. En lampe til venstre lyser på hjulet og kaster skyggen av pinnen på en vegg, og skyggen beveger seg opp og ned i takt med et lodd som svinger i en fjær ved siden av. En graf til høyre tegner posisjonen y til loddet mot tiden t som en sinuskurve.',
        '3D-simulering: ett cykelhjul med ett stift snurrar i ljuset från en lampa, och stiftets skugga på väggen följer vikten i fjädern. Dra i scenen för att vrida kameran. Fullskärmsknappen uppe till vänster i scenen öppnar simuleringen i fullskärm.':
            '3D-simulering: et sykkelhjul med en pinne snurrer i lyset fra en lampe, og skyggen av pinnen på veggen følger loddet i fjæren. Dra i scenen for å dreie kameraet. Fullskjermknappen øverst til venstre i scenen åpner simuleringen i fullskjerm.',

        // Förklaringsrutor
        'Varför blir det en sinuskurva?': 'Hvorfor blir det en sinuskurve?',
        'Stiftet sitter på radien': 'Pinnen sitter på radien',
        'och har vridits vinkeln': 'og er dreid en vinkel',
        'från den vågräta radien. Höjden över navet är då': 'fra den vannrette radien. Høyden over navet er da',
        '. Hjulet snurrar med vinkelhastigheten': '. Hjulet snurrer med vinkelfarten',
        ', så vinkeln växer som': ', så vinkelen øker som',
        ', och därför blir': ', og derfor blir',
        'Periodtid och vinkelhastighet': 'Periode og vinkelfart',
        'Ett varv på hjulet är en hel svängning för vikten. Ett varv är 2π radianer, så':
            'En runde på hjulet er en hel svingning for loddet. En runde er 2π radianer, så',
        '. Ändra periodtiden med glidaren och se att både hjulet och vikten går fortare eller långsammare tillsammans.':
            '. Endre perioden med glidebryteren og se at både hjulet og loddet går fortere eller langsommere sammen.',
        'Prova själv': 'Prøv selv',
        'Slå av lampan och tänk dig att du bara ser hjulet från sidan: då ser stiftet ut att röra sig rakt upp och ned, precis som vikten. Pausa när stiftet står längst upp och längst ned. Där vänder vikten, och där är grafen som högst och lägst.':
            'Slå av lampen og se for deg at du bare ser hjulet fra siden: da ser det ut som om pinnen beveger seg rett opp og ned, akkurat som loddet. Sett på pause når pinnen står helt øverst og helt nederst. Der snur loddet, og der er grafen høyest og lavest.',
        'Teorin finns i genomgången': 'Teorien finnes i gjennomgangen'
    });
})();
