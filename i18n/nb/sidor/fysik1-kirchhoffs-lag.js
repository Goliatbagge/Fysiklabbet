/* i18n/nb/sidor/fysik1-kirchhoffs-lag.js — norska (bokmål) för simuleringen
 * Kirchhoffs första lag. */
(function () {
    I18N.add({
        'Kirchhoffs första lag — Fysiklabbet': 'Kirchhoffs første lov — Fysiklabbet',
        'Kirchhoffs första lag — Fysik nivå 1': 'Kirchhoffs første lov — Fysikk nivå 1',
        'Hur strömmar fördelas i en förgreningspunkt — Kirchhoffs lagar.': 'Hvordan strømmen fordeler seg i et forgreningspunkt: Kirchhoffs lover.',
        'Kirchhoffs första lag': 'Kirchhoffs første lov',
        'Summan av alla strömmar som går in i en förgreningspunkt är lika med summan av alla strömmar som lämnar punkten.':
            'Summen av alle strømmer som går inn i et forgreningspunkt, er lik summen av alle strømmer som forlater punktet.',

        // Schemat
        'Kopplingsschema': 'Koblingsskjema',
        'Förgreningspunkt': 'Forgreningspunkt',
        'Ström in': 'Strøm inn',
        'Ström ut': 'Strøm ut',
        'in': 'inn',
        'ut': 'ut',

        // Kontroller
        'Konfiguration': 'Konfigurasjon',
        '1 in, 2 ut': '1 inn, 2 ut',
        '2 in, 2 ut': '2 inn, 2 ut',
        '2 in, 1 ut': '2 inn, 1 ut',
        'En ledning in till förgreningspunkten och två ledningar ut': 'Én ledning inn til forgreningspunktet og to ledninger ut',
        'Två ledningar in till förgreningspunkten och två ledningar ut': 'To ledninger inn til forgreningspunktet og to ledninger ut',
        'Två ledningar in till förgreningspunkten och en ledning ut': 'To ledninger inn til forgreningspunktet og én ledning ut',
        'Strömmar in (grön)': 'Strømmer inn (grønn)',
        'Strömmar ut (orange)': 'Strømmer ut (oransje)',
        '₁ (in)': '₁ (inn)',
        '₂ (in)': '₂ (inn)',
        '(ut)': '(ut)',
        '✓ Lagen är alltid uppfylld - strömmarna balanseras automatiskt!': '✓ Loven er alltid oppfylt: strømmene balanseres automatisk!',
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',

        // Förklaringen
        'Om Kirchhoffs första lag': 'Om Kirchhoffs første lov',
        'Kirchhoffs första lag, även kallad': 'Kirchhoffs første lov, også kalt',
        'strömlagen': 'strømloven',
        'eller': 'eller',
        'nodlagen': 'knutepunktloven',
        ', säger att den totala strömmen som flödar in i en förgreningspunkt måste vara lika med den totala strömmen som flödar ut.':
            ', sier at den totale strømmen som går inn i et forgreningspunkt, må være lik den totale strømmen som går ut.',
        'Summan av strömmar in = Summan av strömmar ut': 'Summen av strømmer inn = summen av strømmer ut',
        'Detta är en konsekvens av': 'Dette er en konsekvens av',
        'laddningsbevarande': 'ladningsbevaring',
        '– elektrisk laddning kan varken skapas eller förstöras. Om mer ström flödade in än ut skulle laddning ackumuleras i förgreningspunkten, vilket inte sker i verkligheten.':
            '(elektrisk ladning kan verken skapes eller ødelegges). Hvis mer strøm gikk inn enn ut, ville ladning hope seg opp i forgreningspunktet, og det skjer ikke i virkeligheten.',
        'Praktiska tillämpningar': 'Praktiske anvendelser',
        'Hemkretsar': 'Strømkretser i hjemmet',
        'I ett hushåll delas strömmen upp till olika uttag och lampor. Strömmen som går in i säkringsskåpet är summan av alla strömmar som används i hemmet.':
            'I en husholdning deles strømmen opp til ulike stikkontakter og lamper. Strømmen som går inn i sikringsskapet, er summen av alle strømmene som brukes i hjemmet.',
        'Parallellkoppling': 'Parallellkobling',
        'I en parallellkoppling delas strömmen upp mellan grenarna. Kirchhoffs lag hjälper oss beräkna hur stor ström som går genom varje gren.':
            'I en parallellkobling deles strømmen opp mellom grenene. Kirchhoffs lov hjelper oss å regne ut hvor stor strøm som går gjennom hver gren.',
        'Felsökning': 'Feilsøking',
        'Elektriker använder Kirchhoffs lag för att hitta fel i kretsar. Om strömmarna inte balanserar finns det ett läckage eller kortslutning någonstans.':
            'Elektrikere bruker Kirchhoffs lov for å finne feil i kretser. Hvis strømmene ikke går i balanse, finnes det en lekkasje eller en kortslutning et sted.',

        // Övningsläget
        'Beräkna den okända strömmen': 'Regn ut den ukjente strømmen',
        'Poäng': 'Poeng',
        'Vad är den okända strömmen?': 'Hva er den ukjente strømmen?',
        'Kontrollera': 'Kontroller svaret',
        '🔄 Ny uppgift': '🔄 Ny oppgave',
        '🎉 Rätt!': '🎉 Riktig!',
        '💡 Nästan!': '💡 Nesten!',
        'Rätt svar:': 'Riktig svar:',
        'Kom ihåg:': 'Husk:',
        'Fantastiskt! Du behärskar Kirchhoffs lag!': 'Fantastisk! Du behersker Kirchhoffs lov!',
        'Helt rätt! Du är en riktig elexpert!': 'Helt riktig! Du er en ekte strømekspert!',
        'Bravo! Strömmen flödar rätt i dina beräkningar!': 'Bravo! Strømmen flyter riktig i beregningene dine!',
        'Utmärkt! Kirchhoff skulle vara stolt!': 'Utmerket! Kirchhoff ville vært stolt!',
        'Perfekt! Du har koll på strömbalansen!': 'Perfekt! Du har kontroll på strømbalansen!',
        'Tänk på att summan av strömmarna IN måste vara lika med summan av strömmarna UT. Strömmarna ut är totalt {n} A.':
            'Husk at summen av strømmene INN må være lik summen av strømmene UT. Strømmene ut er til sammen {n} A.',
        'Tänk på att summan av strömmarna UT måste vara lika med summan av strömmarna IN. Strömmarna in är totalt {n} A.':
            'Husk at summen av strømmene UT må være lik summen av strømmene INN. Strømmene inn er til sammen {n} A.'
    });
})();
