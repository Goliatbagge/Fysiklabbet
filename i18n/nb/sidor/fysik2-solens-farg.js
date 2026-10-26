/* i18n/nb/sidor/fysik2-solens-farg.js — norska (bokmål) för simuleringen
 * Solens färg (Rayleighspridning). */
(function () {
    I18N.add({
        'Solens färg — Fysiklabbet': 'Solens farge — Fysiklabbet',
        'Solens färg — Fysik nivå 2': 'Solens farge — Fysikk nivå 2',
        'Rayleighspridning — varför solen skiftar färg över dagen.': 'Rayleigh-spredning: hvorfor solen skifter farge i løpet av dagen.',
        '/ Solens färg': '/ Solens farge',
        'Solens färg': 'Solens farge',
        'Varför är solen vit mitt på dagen men glödande röd vid solnedgång? Dra reglaget eller tryck på play och låt solen vandra över himlen — solens färg beräknas i realtid utifrån Rayleigh-spridning genom atmosfären.':
            'Hvorfor er solen hvit midt på dagen, men glødende rød ved solnedgang? Dra i glidebryteren eller trykk på play og la solen vandre over himmelen. Solens farge beregnes i sanntid ut fra Rayleigh-spredning gjennom atmosfæren.',
        '© 2025 Fysiklabbet. Skapad för gymnasieelever.': '© 2025 Fysiklabbet. Laget for elever i videregående skole.',

        // Kontroller
        'Tid på dygnet': 'Tid på døgnet',
        'Soluppgång': 'Soloppgang',
        'Förmiddag': 'Formiddag',
        'Middag': 'Midt på dagen',
        'Solnedgång': 'Solnedgang',

        // Avläsningar
        'Solhöjd': 'Solhøyde',
        'Luftmassa': 'Luftmasse',
        'Kasten-Young airmass': 'Luftmasse etter Kasten og Young',
        'Under horisonten': 'Under horisonten',
        'Djupt röd': 'Dyprød',
        'Glödande röd-orange': 'Glødende rødoransje',
        'Varm orange': 'Varm oransje',
        'Gulorange': 'Guloransje',
        'Gulvit': 'Gulhvit',
        'Varm vit': 'Varm hvit',
        'Nära vit': 'Nesten hvit',
        'RGB (': 'RGB (',

        // Fysiken bakom
        'Fysiken bakom': 'Fysikken bak',
        'Rayleigh-spridning': 'Rayleigh-spredning',
        'Blått ljus (440 nm) sprids ≈ 6× mer än rött (650 nm).': 'Blått lys (440 nm) spres ≈ 6× mer enn rødt (650 nm).',
        'Transmission genom atmosfären': 'Transmisjon gjennom atmosfæren',
        'τ är atmosfärens optiska tjocklek vid våglängden λ.': 'τ er atmosfærens optiske tykkelse ved bølgelengden λ.',
        'Vid zenit: M = 1. Vid horisonten: M ≈ 38 (Kasten-Young).': 'I senit: M = 1. Ved horisonten: M ≈ 38 (Kasten og Young).',
        'Varför blir solen röd vid horisonten?': 'Hvorfor blir solen rød ved horisonten?',
        'När solen står högt passerar dess strålar genom ungefär en luftmassa atmosfär — då sprids ett måttligt antal blå fotoner ur den direkta strålen och det räcker inte för att förändra färgen nämnvärt. När solen närmar sig horisonten måste ljuset däremot korsa':
            'Når solen står høyt, går strålene gjennom omtrent én luftmasse atmosfære. Da spres et moderat antall blå fotoner ut av den direkte strålen, og det er ikke nok til å endre fargen nevneverdig. Når solen nærmer seg horisonten, må lyset derimot krysse',
        'mycket': 'mye',
        'mer luft — upp till cirka 38 luftmassor. Eftersom Rayleigh-spridningen är starkt våglängdsberoende (∝ 1/λ⁴) försvinner då nästan allt blått och mycket av det gröna, medan det röda ljuset slipper igenom.':
            'mer luft, opptil omtrent 38 luftmasser. Siden Rayleigh-spredningen er sterkt avhengig av bølgelengden (∝ 1/λ⁴), forsvinner nesten alt det blå og mye av det grønne, mens det røde lyset slipper gjennom.',
        'Varför är himlen blå?': 'Hvorfor er himmelen blå?',
        'Samma spridningsfenomen som förskjuter solen mot rött gör himlen blå. Det blå ljuset som sprids ur den direkta solstrålen behöver ta vägen någonstans — och det når oss från hela himlen istället för från solen. Vid solnedgången blir himlen nära horisonten orange och rosa av samma anledning, medan zenit förblir ganska mörkblå.':
            'Det samme spredningsfenomenet som forskyver solen mot rødt, gjør himmelen blå. Det blå lyset som spres ut av den direkte solstrålen, må havne et sted, og det når oss fra hele himmelen i stedet for fra solen. Ved solnedgang blir himmelen nær horisonten oransje og rosa av samme grunn, mens senit forblir ganske mørkeblå.',
        'Hur färgen beräknas': 'Hvordan fargen beregnes',
        'Simuleringen startar med solens spektrum approximerat som svartkroppsstrålning vid 5778 K. För varje våglängd i intervallet 380–720 nm beräknas transmissionen':
            'Simuleringen starter med solens spekter tilnærmet som svartlegemestråling ved 5778 K. For hver bølgelengde i intervallet 380–720 nm beregnes transmisjonen',
        ', där τ(λ) följer Rayleighs lag. Det filtrerade spektrumet integreras mot CIE 1931-färgmatchningsfunktionerna för att få XYZ, som sedan omvandlas till sRGB. Resultatet är solens verkliga färg — inte en artistisk tolkning.':
            ', der τ(λ) følger Rayleighs lov. Det filtrerte spekteret integreres mot fargetilpasningsfunksjonene i CIE 1931 for å få XYZ, som deretter regnes om til sRGB. Resultatet er solens virkelige farge, ikke en kunstnerisk tolkning.'
    });
})();
