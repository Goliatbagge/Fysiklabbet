/* i18n/nb/sidor/fysik2-konisk-pendel-app.js — norska (bokmål) för
 * simuleringen Konisk pendel. JSX-texten är delad runt <em>/<sub>, så
 * många nycklar är fragment av en mening. */
(function () {
    I18N.add({
        'Konisk pendel — Fysiklabbet': 'Konisk pendel — Fysiklabbet',
        'Konisk pendel — Fysik nivå 2': 'Konisk pendel — Fysikk nivå 2',
        'Interaktiv 3D-simulering — vrid, zooma och visa krafter. Kan växlas till jämförelse med harmonisk svängning och plan pendel.':
            'Interaktiv 3D-simulering: vri, zoom og vis krefter. Kan byttes til en sammenligning med harmonisk svingning og plan pendel.',
        'Konisk pendel': 'Konisk pendel',
        '/ Konisk pendel': '/ Konisk pendel',

        // Ingressen
        'En massa snurrar i en vågrät cirkel medan snöret sveper ut en kon. Snöret kan aldrig bli vågrätt. Utforska hur vinkeln':
            'En masse går rundt i en vannrett sirkel mens snoren beskriver en kjegle. Snoren kan aldri bli vannrett. Utforsk hvordan vinkelen',
        ', perioden och spännkraften beror på vinkelhastigheten': ', perioden og snordraget avhenger av vinkelfarten',
        '— och upptäck att massan inte påverkar vinkeln.': 'og oppdag at massen ikke påvirker vinkelen.',

        // Formelkortet
        'Konvinkel': 'Kjeglevinkel',
        'Tyngdfaktor': 'Tyngdeakselerasjon',
        'Vinkelhast.² · längd': 'Vinkelfart² · lengde',
        'Omloppstid': 'Omløpstid',
        'Snörlängd · cosinus': 'Snorlengde · cosinus',
        'Spännkraft': 'Snordrag',
        'Tyngdkraft': 'Tyngdekraft',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Visa krafter': 'Vis krefter',
        'Komposanter': 'Komponenter',
        'Nettokraft': 'Resultantkraft',
        'Geometri': 'Geometri',
        'Vinkel': 'Vinkel',
        'Kon': 'Kjegle',
        '▶ Spela': '▶ Spill av',
        '❚❚ Pausa': '❚❚ Pause',
        'Dra för att rotera · scrolla för att zooma': 'Dra for å rotere · rull for å zoome',

        // Reglagen
        'Vinkelhastighet (': 'Vinkelfart (',
        'Snörlängd (': 'Snorlengde (',
        'Massa (': 'Masse (',
        'Tyngdfaktor (': 'Tyngdeakselerasjon (',
        'styr systemet — vinkeln': 'styrer systemet, og vinkelen',
        'ställer in sig själv.': 'stiller seg inn av seg selv.',
        'Testa: ändra massan — vad händer med vinkeln och perioden?': 'Prøv: endre massen. Hva skjer med vinkelen og perioden?',

        // För låg vinkelhastighet
        'Pendeln hänger rakt ned.': 'Pendelen henger rett ned.',
        'Vinkelhastigheten är för låg — det krävs': 'Vinkelfarten er for lav. Det kreves',
        'rad/s för att massan ska lyfta och börja gå i cirkel.': 'rad/s for at massen skal løfte seg og begynne å gå i sirkel.',

        // Beräknade värden
        'Beräknade värden': 'Beregnede verdier',
        'Radie': 'Radius',
        'Höjd': 'Høyde',
        'Banfart': 'Banefart',
        'Lodrät jämvikt:': 'Loddrett likevekt:',

        // Grafen
        '📈 Vinkeln mot vinkelhastigheten': '📈 Vinkelen mot vinkelfarten',
        'Kurvan visar': 'Kurven viser',
        ')). När': ')). Når',
        'ökar närmar sig': 'øker, nærmer',
        '90° men når det aldrig — det skulle kräva oändlig spännkraft.': 'seg 90°, men når aldri helt dit. Det ville kreve et uendelig stort snordrag.',
        '90° (nås aldrig)': '90° (nås aldri)',

        // Oberoende av massan
        '💡 Oberoende av massan': '💡 Uavhengig av massen',
        'Eftersom': 'Siden',
        ') och': ') og',
        'inte innehåller massan, är omloppstiden': 'ikke inneholder massen, er omløpstiden',
        'oberoende av massan': 'uavhengig av massen',
        '— precis som för en vanlig pendel. Dra i mass-reglaget och se att': 'akkurat som for en vanlig pendel. Dra i glidebryteren for massen og se at',
        'och': 'og',
        'inte ändras (men spännkraften gör det!).': 'ikke endres (men snordraget gjør det!).',
        'Gränsfall': 'Grensetilfelle',
        's — samma som en': 's, det samme som for en',
        'plan pendel': 'plan pendel',
        'med längden': 'med lengden',

        // Vanliga missuppfattningar
        '⚠️ Vanliga missuppfattningar': '⚠️ Vanlige misoppfatninger',
        '"Centrifugalkraften drar utåt."': '«Sentrifugalkraften drar utover.»',
        'I markens (inertial)system finns bara två krafter: spännkraften och tyngdkraften. Centrifugalkraft är en skenkraft som bara dyker upp om man räknar i det roterande systemet.':
            'I et system som står fast på bakken (et inertialsystem), virker det bare to krefter: snordraget og tyngdekraften. Sentrifugalkraft er en fiktiv kraft som bare dukker opp hvis man regner i det roterende systemet.',
        '"Spännkraften är lika med': '«Snordraget er lik',
        '."': '.»',
        'Nej —': 'Nei.',
        'är alltid': 'er alltid',
        'större': 'større',
        'än': 'enn',
        'när': 'når',
        '> 0, eftersom snöret också måste ge den horisontella centripetalkraften.': '> 0, fordi snoren også må gi den horisontale sentripetalkraften.',
        '"Tyngre massa ger större vinkel."': '«Større masse gir større vinkel.»',
        'Massan påverkar inte': 'Massen påvirker ikke',
        'alls — bara': 'i det hele tatt. Bare',
        'gör det. Tyngre massa ökar däremot spännkraften.': 'gjør det. Større masse øker derimot snordraget.',

        // Centrifugalregulatorn
        '⚙️ Verklig tillämpning: centrifugalregulatorn': '⚙️ Praktisk anvendelse: sentrifugalregulatoren',
        'James Watt använde 1788 en centrifugalregulator (governor) för att styra ångmaskiner: två koniska pendlar kopplade till ångventilen. När maskinen gick för fort ökade':
            'James Watt brukte i 1788 en sentrifugalregulator (governor) til å styre dampmaskiner: to koniske pendler koblet til dampventilen. Når maskinen gikk for fort, økte',
        ', vinkeln': ', vinkelen',
        'blev större och vikterna lyftes — vilket strypte ångtillförseln och saktade ned maskinen. Exakt den fysik du ser här, omsatt till automatisk reglering.':
            'ble større og loddene ble løftet. Det strupet damptilførselen og bremset maskinen. Det er nøyaktig den fysikken du ser her, omsatt til automatisk regulering.'
    });
})();
