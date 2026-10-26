/* i18n/nb/sidor/fysik1-stralning-genomtranglighet.js — norska (bokmål) för
 * simuleringen Strålnings genomtränglighet. */
(function () {
    I18N.add({
        'Strålnings genomtränglighet — Fysiklabbet': 'Strålingens gjennomtrengningsevne — Fysiklabbet',
        'Strålnings genomtränglighet — Fysik nivå 1': 'Strålingens gjennomtrengningsevne — Fysikk nivå 1',
        'Alfa, beta och gamma genom textil, aluminium och bly.': 'Alfa, beta og gamma gjennom tekstil, aluminium og bly.',
        '/ Strålnings genomtränglighet': '/ Strålingens gjennomtrengningsevne',
        'Strålnings genomtränglighet': 'Strålingens gjennomtrengningsevne',
        'Undersök hur alfa-, beta- och gammastrålning passerar genom olika material. Dra preparatet, hindret och GM-röret i scenen; räknaren registrerar de partiklar som tar sig igenom.':
            'Undersøk hvordan alfa-, beta- og gammastråling går gjennom ulike materialer. Dra preparatet, hinderet og GM-røret i scenen; telleren registrerer partiklene som kommer seg gjennom.',

        // Scenen (canvas)
        'GM-rör': 'GM-rør',
        'Preparat': 'Preparat',

        // Inställningsrutan och sidopanelen
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Visning': 'Visning',
        'Visa partiklar': 'Vis partikler',
        'Strålkälla': 'Strålekilde',
        'Hinder': 'Hinder',
        'Aktivitet': 'Aktivitet',
        'GM-räknare': 'GM-teller',
        'Registreringar': 'Registreringer',
        'Räkningar/min': 'Tellinger/min',
        'Tid': 'Tid',
        'Tid (s)': 'Tid (s)',
        'Nollställ räknaren': 'Nullstill telleren',
        'Ingen källa': 'Ingen kilde',
        'Alfastrålare (α)': 'Alfastråler (α)',
        'Betastrålare (β)': 'Betastråler (β)',
        'Gammastrålare (γ)': 'Gammastråler (γ)',
        'Heliumkärna, laddning +2': 'Heliumkjerne, ladning +2',
        'Elektron, laddning −1': 'Elektron, ladning −1',
        'Foton, oladdad': 'Foton, uten ladning',
        'Inget hinder': 'Uten hinder',
        'Textil': 'Tekstil',
        'Tunn aluminium': 'Tynt aluminium',
        'Tunn bly': 'Tynt bly',
        'Tjock bly': 'Tykt bly',
        'Genomtränglighet': 'Gjennomtrengningsevne',

        // Översiktstabellen
        'Genomtränglighet: översikt': 'Gjennomtrengningsevne: oversikt',
        'Strålning': 'Stråling',
        'Passerar': 'Slipper gjennom',
        'Delvis': 'Delvis',
        'Stoppas': 'Stoppes',

        // Förklaringsrutan
        'Fysiken bakom genomtränglighet': 'Fysikken bak gjennomtrengningsevnen',
        'Välj en strålkälla för att starta simuleringen. Bakgrundsstrålning registreras alltid av GM-röret.':
            'Velg en strålekilde for å starte simuleringen. Bakgrunnsstråling registreres alltid av GM-røret.',
        'Alfapartiklar (heliumkärnor, laddning +2) är tunga och joniserande. Utan hinder når nästan alla GM-röret. Räckvidd i luft: bara några centimeter.':
            'Alfapartikler (heliumkjerner, ladning +2) er tunge og ioniserende. Uten hinder når nesten alle frem til GM-røret. Rekkevidde i luft: bare noen få centimeter.',
        'Alfapartiklar stoppas effektivt av {hinder}. Alfastrålning kan stoppas av ett papper eller av huden. Det är intern exponering som är farlig. Genomtränglighet: {pct} %.':
            'Alfapartikler stoppes effektivt av {hinder}. Alfastråling kan stoppes av et papirark eller av huden. Det er intern eksponering som er farlig. Gjennomtrengningsevne: {pct} %.',
        'Betapartiklar (elektroner, laddning −1) är lättare och snabbare än alfapartiklar. Räckvidd i luft: upp till några meter.':
            'Betapartikler (elektroner, ladning −1) er lettere og raskere enn alfapartikler. Rekkevidde i luft: opptil noen meter.',
        'Betastrålning passerar nästan obehindrat genom textil ({pct} % transmission). Klädsel skyddar knappt mot beta.':
            'Betastråling går nesten uhindret gjennom tekstil ({pct} % transmisjon). Klær beskytter knapt mot beta.',
        'Betapartiklar absorberas helt i {hinder}. Aluminium på några millimeter räcker för att stoppa de flesta betapartiklar. Genomtränglighet: {pct} %.':
            'Betapartikler absorberes helt i {hinder}. Noen millimeter aluminium er nok til å stoppe de fleste betapartiklene. Gjennomtrengningsevne: {pct} %.',
        'Gammastrålning är elektromagnetisk strålning (fotoner) med mycket hög energi. Den har ingen elektrisk laddning och är svår att stoppa.':
            'Gammastråling er elektromagnetisk stråling (fotoner) med svært høy energi. Den har ingen elektrisk ladning og er vanskelig å stoppe.',
        'Gammastrålning passerar nästan opåverkat genom {hinder} ({pct} % transmission). Det krävs täta, tunga material som bly eller betong.':
            'Gammastråling går nesten upåvirket gjennom {hinder} ({pct} % transmisjon). Det kreves tette, tunge materialer som bly eller betong.',
        'Tunn bly minskar gammastrålningen kraftigt, till {pct} % transmission. Bly är effektivt på grund av sin höga atomvikt och densitet: elektronerna i blyatomerna växelverkar med fotonerna.':
            'Tynt bly svekker gammastrålingen kraftig, til {pct} % transmisjon. Bly er effektivt fordi det har høy atommasse og stor tetthet: elektronene i blyatomene vekselvirker med fotonene.',
        'Tjock bly absorberar nästan all gammastrålning ({pct} % transmission kvarstår). Tjockt bly eller betong används som strålskärm runt reaktorer och röntgenrum.':
            'Tykt bly absorberer nesten all gammastråling ({pct} % transmisjon er igjen). Tykt bly eller betong brukes som strålingsskjerm rundt reaktorer og røntgenrom.',
        'Alfastrålning (α)': 'Alfastråling (α)',
        'Betastrålning (β)': 'Betastråling (β)',
        'Gammastrålning (γ)': 'Gammastråling (γ)',
        'Helium-4-kärna (2 protoner och 2 neutroner). Stor massa, hög jonisationsförmåga, kort räckvidd. Stoppas av några centimeter luft eller ett papper.':
            'Helium-4-kjerne (2 protoner og 2 nøytroner). Stor masse, høy ioniseringsevne, kort rekkevidde. Stoppes av noen få centimeter luft eller et papirark.',
        'Elektron eller positron med hög hastighet. Större räckvidd än alfa, men stoppas av några millimeter aluminium eller plast.':
            'Elektron eller positron med høy fart. Lengre rekkevidde enn alfa, men stoppes av noen millimeter aluminium eller plast.',
        'Elektromagnetisk strålning (fotoner). Ingen massa och ingen laddning, och därför extremt genomträngande. Kräver tjockt bly eller betong för avskärmning.':
            'Elektromagnetisk stråling (fotoner). Ingen masse og ingen ladning, og derfor ekstremt gjennomtrengende. Krever tykt bly eller betong for skjerming.',
        'Bakgrundsstrålning:': 'Bakgrunnsstråling:',
        'Det finns alltid en liten mängd naturlig joniserande strålning från marken, byggnadsmaterial och kosmisk strålning. GM-röret registrerar cirka 1–3 impulser per 10 sekunder oavsett hinder. Det syns i räknaren även utan strålkälla.':
            'Det finnes alltid en liten mengde naturlig ioniserende stråling fra bakken, bygningsmaterialer og kosmisk stråling. GM-røret registrerer omtrent 1–3 pulser per 10 sekunder uansett hinder. Det vises på telleren også uten strålekilde.'
    });
})();
