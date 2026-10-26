/* i18n/nb/sidor/fysik2-pipor-app.js — norska (bokmål) för simuleringen
 * Ljudvågor och stående vågor i pipor. JSX-texten är delad runt
 * <em>/<strong>, så många nycklar är fragment av en mening. Tonens namn
 * (TONE_NAMES) översätts med I18N.t (tr) i koden. */
(function () {
    I18N.add({
        // Sidhuvud och delning
        'Ljudvågor och stående vågor i pipor — Fysiklabbet': 'Lydbølger og stående bølger i piper — Fysiklabbet',
        'Ljudvågor och stående vågor i pipor — Fysik nivå 2': 'Lydbølger og stående bølger i piper — Fysikk nivå 2',
        'Stående vågor i öppna, halvöppna och slutna pipor. Välj piptyp, ändra pipans längd och tonens ordningsnummer, se noderna och bukarna flytta sig — och spela tonen! Med luftpartiklarna framme syns att ljudvågen egentligen är longitudinell fast den ritas som transversell (l = n · λ/2 respektive l = (2n − 1) · λ/4).':
            'Stående bølger i åpne, halvåpne og lukkede piper. Velg pipetype, endre lengden på pipen og ordenstallet til tonen, se nodene og bukene flytte seg, og spill av tonen! Med luftpartiklene synlige ser du at lydbølgen egentlig er longitudinal, selv om den tegnes som transversal (l = n · λ/2 og l = (2n − 1) · λ/4).',
        '/ Ljudvågor och stående vågor i pipor': '/ Lydbølger og stående bølger i piper',
        'Ljudvågor och stående vågor i pipor': 'Lydbølger og stående bølger i piper',

        // Ingressen
        'När luft sätts i rörelse i en pipa uppstår en stående våg. Vid': 'Når luft settes i bevegelse i en pipe, oppstår det en stående bølge. Ved',
        'öppna ändar': 'åpne ender',
        'bildas alltid': 'dannes det alltid',
        'bukar': 'buker',
        '(luften kan svänga maximalt) och vid': '(luften kan svinge maksimalt), og ved',
        'slutna ändar': 'lukkede ender',
        'noder': 'noder',
        '(luften kan inte svänga). Välj piptyp, ändra pipans längd': '(luften kan ikke svinge). Velg pipetype, endre lengden på pipen',
        'och tonens ordningsnummer': 'og ordenstallet til tonen',
        ', läs av våglängden': ', les av bølgelengden',
        'och frekvensen': 'og frekvensen',
        '— och lyssna på tonen! Ljudvågen är longitudinell men ritas som transversell, för det är enklare och tydligare.':
            'og lytt til tonen! Lydbølgen er longitudinal, men tegnes som transversal, fordi det er enklere og tydeligere.',

        // Formelkortet
        'Öppen/sluten pipa': 'Åpen/lukket pipe',
        'Halvöppen pipa': 'Halvåpen pipe',
        'Pipans längd': 'Lengden på pipen',
        'Ordningsnr · våglängd': 'Ordenstall · bølgelengde',
        'Utbredningshastighet': 'Bølgefart',
        'Frekvens': 'Frekvens',
        'Våglängd': 'Bølgelengde',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Piptyp': 'Pipetype',
        'Öppen (båda ändar öppna)': 'Åpen (begge ender åpne)',
        'Halvöppen (en öppen, en sluten)': 'Halvåpen (én åpen, én lukket)',
        'Sluten (båda ändar slutna)': 'Lukket (begge ender lukket)',
        'Noder och bukar': 'Noder og buker',
        'Måttlinjer (': 'Målepiler (',
        'och': 'og',
        'Luftpartiklar (longitudinellt)': 'Luftpartikler (longitudinalt)',

        // Reglagen
        'Pipans längd (': 'Lengden på pipen (',
        'Ton (': 'Tone (',
        'Längre pipa ger längre våglängd — och därmed lägre frekvens (mörkare ton).': 'Lengre pipe gir lengre bølgelengde og dermed lavere frekvens (dypere tone).',
        '= 1 är grundtonen. Varje överton lägger till en buk inuti pipan.': '= 1 er grunntonen. Hver overtone legger til en buk inne i pipen.',
        'grundtonen': 'grunntonen',
        'första övertonen': 'første overtone',
        'andra övertonen': 'andre overtone',
        'tredje övertonen': 'tredje overtone',
        'Tysta tonen': 'Stopp tonen',
        'Spela tonen': 'Spill av tonen',

        // Scenen
        'nod': 'node',
        'buk': 'buk',
        'Svängningen visas kraftigt fördröjd — den verkliga frekvensen är': 'Svingningen vises i kraftig sakte film. Den virkelige frekvensen er',

        // Beräkning och avläsning
        'Beräkning av våglängd och frekvens': 'Beregning av bølgelengde og frekvens',
        'Halvöppen pipa, 24 cm, första övertonen': 'Halvåpen pipe, 24 cm, første overtone',
        'Exempel 1 ur teorin (halvöppen pipa, 24 cm, första övertonen)': 'Eksempel 1 fra teorien (halvåpen pipe, 24 cm, første overtone)',
        'Öppen pipa, 39 cm, grundtonen 440 Hz': 'Åpen pipe, 39 cm, grunntonen 440 Hz',
        'Exempel 2 ur teorin (öppen pipa för 440 Hz)': 'Eksempel 2 fra teorien (åpen pipe for 440 Hz)',
        'Avläsning': 'Avlesning',
        'Längd i våglängder': 'Lengde i bølgelengder',
        'Ljudets hastighet i luft räknas som': 'Lydfarten i luft regnes som',
        '≈ 340 m/s. Spela tonen och dra i längd-reglaget — så hör du hur en kortare pipa ger en högre ton.':
            '≈ 340 m/s. Spill av tonen og dra i lengdekontrollen, så hører du hvordan en kortere pipe gir en høyere tone.',

        // Pedagogiska rutor
        'Buk vid öppen ände, nod vid sluten': 'Buk ved åpen ende, node ved lukket ende',
        'Vid en öppen ände kan luften svänga fritt — där blir det alltid en': 'Ved en åpen ende kan luften svinge fritt. Der blir det alltid en',
        '. Vid en sluten ände kan luften inte röra sig alls — där blir det alltid en': '. Ved en lukket ende kan luften ikke bevege seg i det hele tatt. Der blir det alltid en',
        '. Dessa randvillkor avgör vilka våglängder som får plats i pipan, och därmed vilka toner den kan ge.':
            '. Disse randbetingelsene avgjør hvilke bølgelengder som får plass i pipen, og dermed hvilke toner den kan gi.',
        'Grundton och övertoner': 'Grunntone og overtoner',
        'Den längsta stående våg som ryms ger': 'Den lengste stående bølgen som får plass, gir',
        '= 1). När fler bukar uppstår inuti pipan uppkommer': '= 1). Når flere buker oppstår inne i pipen, får vi',
        'övertoner': 'overtoner',
        'med högre frekvens (': 'med høyere frekvens (',
        '= 2, 3, …). Att blåsa hårdare i en flöjt, eller svinga ett plaströr fortare, hoppar upp till nästa överton.':
            '= 2, 3, …). Blåser du hardere i en fløyte eller svinger et plastrør fortere, hopper tonen opp til neste overtone.',
        'Longitudinell — men ritas transversell': 'Longitudinal, men tegnes transversal',
        'Ljud är en longitudinell våg: luften svänger fram och tillbaka': 'Lyd er en longitudinal bølge: luften svinger frem og tilbake',
        'längs': 'langs',
        'pipan, inte upp och ned. Kurvan i figuren visar hur stort utslaget är i varje punkt. Slå på':
            'pipen, ikke opp og ned. Kurven i figuren viser hvor stort utslaget er i hvert punkt. Slå på',
        'luftpartiklarna': 'luftpartiklene',
        'och se den verkliga rörelsen — störst vid bukarna, stilla vid noderna.': 'og se den virkelige bevegelsen: størst ved bukene, i ro ved nodene.',

        // Var kommer formlerna ifrån?
        'Var kommer formlerna ifrån?': 'Hvor kommer formlene fra?',
        'Avståndet mellan två närliggande bukar (eller två närliggande noder) är alltid en halv våglängd, och avståndet mellan en buk och närmaste nod är en fjärdedels våglängd. I en öppen pipa sitter bukar i båda ändarna och i en sluten pipa noder i båda ändarna — i båda fallen ryms då ett helt antal halva våglängder i pipan:':
            'Avstanden mellom to nabobuker (eller to nabonoder) er alltid en halv bølgelengde, og avstanden mellom en buk og nærmeste node er en kvart bølgelengde. I en åpen pipe sitter det buker i begge endene, og i en lukket pipe noder i begge endene. I begge tilfellene får det da plass et helt antall halve bølgelengder i pipen:',
        '. I en halvöppen pipa sitter en buk i ena änden och en nod i den andra, så där ryms ett udda antal fjärdedels våglängder:':
            '. I en halvåpen pipe sitter det en buk i den ene enden og en node i den andre, så der får det plass et odde antall kvarte bølgelengder:',
        '. Frekvensen fås sedan ur': '. Frekvensen får du deretter fra',
        'med': 'med',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Kurvan visar att luften rör sig upp och ned."': '«Kurven viser at luften beveger seg opp og ned.»',
        'Nej — ljudvågen är longitudinell. Kurvan är bara ett bekvämt sätt att rita hur stort utslaget är på olika ställen; luften själv svänger i pipans längdriktning.':
            'Nei, lydbølgen er longitudinal. Kurven er bare en praktisk måte å tegne hvor stort utslaget er på ulike steder. Selve luften svinger i lengderetningen til pipen.',
        '"Längre pipa ger högre ton."': '«Lengre pipe gir høyere tone.»',
        'Tvärtom — längre pipa rymmer en längre våglängd, och längre våglängd betyder lägre frekvens. Det är därför en kontrabas är större än en fiol och orgelns baspipor är flera meter långa.':
            'Tvert imot. En lengre pipe gir plass til en lengre bølgelengde, og lengre bølgelengde betyr lavere frekvens. Det er derfor en kontrabass er større enn en fiolin, og basspipene i et orgel er flere meter lange.',
        '"Ljud kan färdas genom vakuum."': '«Lyd kan bevege seg gjennom vakuum.»',
        'Nej — ljud består av täthetsvariationer i ett material och kräver partiklar att sätta i rörelse. I rymden är det knäpptyst.':
            'Nei, lyd består av variasjoner i tettheten i et stoff og trenger partikler som kan settes i bevegelse. I verdensrommet er det helt stille.'
    });
})();
