/* i18n/nb/sidor/fysik2-ljudniva-app.js — norska (bokmål) för simuleringen
 * Intensitet och ljudnivå. */
(function () {
    I18N.add({
        // ---- Sidhuvud och metadata ----
        'Intensitet och ljudnivå — Fysiklabbet': 'Intensitet og lydnivå — Fysiklabbet',
        'Intensitet och ljudnivå — Fysik nivå 2': 'Intensitet og lydnivå — Fysikk nivå 2',
        'En punktformig ljudkälla och en lyssnare du kan dra i. Ändra utsänd effekt och avstånd och se hur ljudintensiteten I = P/(4π · r²) och ljudnivån L = 10 · lg(I/I₀) ändras — med en decibelskala från hörbarhetsgräns till smärtgräns. Dubbla avståndet ger −6 dB, dubbla effekten +3 dB.':
            'En punktformet lydkilde og en lytter du kan dra i. Endre utsendt effekt og avstand og se hvordan lydintensiteten I = P/(4π · r²) og lydnivået L = 10 · lg(I/I₀) endrer seg, med en desibelskala fra høregrense til smertegrense. Dobbel avstand gir −6 dB, dobbel effekt +3 dB.',
        '/ Intensitet och ljudnivå': '/ Intensitet og lydnivå',
        'Intensitet och ljudnivå': 'Intensitet og lydnivå',

        // ---- Ingressen ----
        'En punktformig ljudkälla sänder ut effekten': 'En punktformet lydkilde sender ut effekten',
        'jämnt fördelad i alla riktningar. På avståndet': 'jevnt fordelt i alle retninger. Ved avstanden',
        'har effekten spridits ut över en sfär med arean 4': 'har effekten spredt seg ut over en kuleflate med arealet 4',
        '² — ljudintensiteten': '². Lydintensiteten',
        'är effekten per kvadratmeter av den sfären. Dra i lyssnaren (eller använd reglagen) och se hur intensiteten och ljudnivån':
            'er effekten per kvadratmeter av denne kuleflaten. Dra i lytteren (eller bruk kontrollene) og se hvordan intensiteten og lydnivået',
        'i decibel ändras med avståndet och effekten.': 'i desibel endrer seg med avstanden og effekten.',

        // ---- Formelkortet ----
        'Ljudintensitet': 'Lydintensitet',
        'Utsänd effekt': 'Utsendt effekt',
        'Sfärens area': 'Kuleflatens areal',
        'Ljudnivå': 'Lydnivå',
        'Hörbarhetsgränsen': 'Høregrensen',

        // ---- Inställningsrutan ----
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Vågfronter': 'Bølgefronter',
        'Sfären med radien': 'Kuleflaten med radius',
        'Decibelskala': 'Desibelskala',
        'Utsänd effekt (': 'Utsendt effekt (',
        'Avstånd (': 'Avstand (',

        // ---- Scenen ----
        'ljudkälla': 'lydkilde',
        'lyssnare': 'lytter',
        'hörbarhetsgräns': 'høregrense',
        'viskning': 'hvisking',
        'samtal': 'samtale',
        'hörselskaderisk': 'fare for hørselsskade',
        'smärtgräns': 'smertegrense',
        'Ta tag i lyssnaren och dra för att ändra avståndet': 'Ta tak i lytteren og dra for å endre avstanden',

        // ---- Sidopanelen ----
        'Reglaget är logaritmiskt: från 1 mW till 100 W. Dubbla effekten ⟹ +3 dB.':
            'Kontrollen er logaritmisk: fra 1 mW til 100 W. Dobbel effekt ⟹ +3 dB.',
        'Avstånd till källan (': 'Avstand til kilden (',
        'Dubbla avståndet ⟹ intensiteten fjärdedelas (−6 dB).': 'Dobbel avstand ⟹ intensiteten blir en firedel (−6 dB).',
        'Beräkning av intensitet och ljudnivå': 'Beregning av intensitet og lydnivå',
        'Effekt 5,0 W, avstånd 10 m': 'Effekt 5,0 W, avstand 10 m',
        'Exempel 1 ur teorin (5,0 W på 10 m avstånd)': 'Eksempel 1 fra teorien (5,0 W i 10 m avstand)',
        'Avläsning': 'Avlesning',
        'Sfärens area 4': 'Kuleflatens areal 4',
        'Testa: ställ': 'Prøv: sett',
        'på 10 m och läs av. Dubbla sedan till 20 m — intensiteten fjärdedelas men ljudnivån sjunker bara 6 dB. Dubbla i stället effekten — då ökar nivån med 3 dB.':
            'til 10 m og les av. Doble den så til 20 m: intensiteten blir en firedel, men lydnivået synker bare 6 dB. Doble i stedet effekten, så øker nivået med 3 dB.',

        // ---- Förklaringsrutorna ----
        'Samma effekt — större sfär': 'Samme effekt, større kuleflate',
        'Ljudkällan sänder ut samma effekt oavsett var du står. Men på dubbla avståndet har sfären som effekten fördelas på fyra gånger så stor area (':
            'Lydkilden sender ut den samme effekten uansett hvor du står. Men i dobbel avstand har kuleflaten som effekten fordeles på, fire ganger så stort areal (',
        '²) — så intensiteten blir en fjärdedel. Det är därför det snabbt blir tystare när du går bort från en högtalare.':
            '²), så intensiteten blir en firedel. Det er derfor det fort blir stillere når du går bort fra en høyttaler.',
        'Decibelskalan är logaritmisk': 'Desibelskalaen er logaritmisk',
        'En ökning med ungefär 3 dB motsvarar en': 'En økning på omtrent 3 dB tilsvarer en',
        'fördubbling': 'dobling',
        'av intensiteten. En differens på 30 dB motsvarar 10 fördubblingar — alltså 2':
            'av intensiteten. En forskjell på 30 dB tilsvarer 10 doblinger, altså 2',
        '= 1 024 gånger. Ljudnivån 40 dB är därför inte 4 gånger så stark som 10 dB, utan över 1 000 gånger starkare!':
            '= 1 024 ganger. Lydnivået 40 dB er derfor ikke 4 ganger så sterkt som 10 dB, men over 1 000 ganger sterkere!',
        'Från hörbarhetsgräns till smärtgräns': 'Fra høregrense til smertegrense',
        'Örat hör ner till': 'Øret hører ned til',
        'W/m² — det är 0 dB. Smärtgränsen går vid ungefär 1 W/m², alltså 120 dB. Däremellan ryms hela vår ljudvärld: en viskning kring 20 dB, ett samtal kring 60 dB och risk för hörselskada från 85 dB vid långvarig exponering.':
            'W/m², og det er 0 dB. Smertegrensen går ved omtrent 1 W/m², altså 120 dB. Mellom disse ligger hele lydverdenen vår: en hvisking rundt 20 dB, en samtale rundt 60 dB og fare for hørselsskade fra 85 dB ved langvarig eksponering.',

        // ---- Var kommer formlerna ifrån? ----
        'Var kommer formlerna ifrån?': 'Hvor kommer formlene fra?',
        'Ljudintensiteten definieras som den energi vågen transporterar per sekund genom tvärsnittsarean 1 m², alltså':
            'Lydintensiteten er definert som den energien bølgen transporterer per sekund gjennom et tverrsnitt med arealet 1 m², altså',
        '. Sänds ljudet ut likformigt i alla riktningar fördelas effekten på ytan av en sfär med arean':
            '. Sendes lyden ut jevnt i alle retninger, fordeles effekten på en kuleflate med arealet',
        ', vilket ger': ', som gir',
        '. Ljudnivån infördes för att slippa hantera så små tal — och för att bättre stämma överens med hur vi upplever ljudstyrka. Den jämför intensiteten med hörbarhetsgränsen':
            '. Lydnivået ble innført for å slippe å regne med så små tall, og for at det bedre skal stemme med hvordan vi opplever lydstyrke. Det sammenligner intensiteten med høregrensen',
        'på en logaritmisk skala:': 'på en logaritmisk skala:',
        ', där 0 dB motsvarar hörbarhetsgränsen.': ', der 0 dB tilsvarer høregrensen.',

        // ---- Vanliga missuppfattningar ----
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"På dubbla avståndet är ljudet hälften så starkt."': '«I dobbel avstand er lyden halvparten så sterk.»',
        'Nej — intensiteten avtar med kvadraten på avståndet, så dubbla avståndet ger en fjärdedels intensitet (−6 dB).':
            'Nei. Intensiteten avtar med kvadratet av avstanden, så dobbel avstand gir en firedel av intensiteten (−6 dB).',
        '"40 dB är dubbelt så starkt som 20 dB."': '«40 dB er dobbelt så sterkt som 20 dB.»',
        'Nej — 20 dB mer betyder 100 gånger större intensitet. Decibelskalan är logaritmisk: varje steg på 10 dB är en tiodubbling.':
            'Nei. 20 dB mer betyr 100 ganger så stor intensitet. Desibelskalaen er logaritmisk: hvert trinn på 10 dB er en tidobling.',
        '"0 dB betyder att det inte finns något ljud."': '«0 dB betyr at det ikke finnes noen lyd.»',
        'Nej — 0 dB är hörbarhetsgränsen, den svagaste intensitet örat kan uppfatta (':
            'Nei. 0 dB er høregrensen, den svakeste intensiteten øret kan oppfatte (',
        'W/m²). Ljud kan till och med ha negativ ljudnivå — det är bara för svagt för att höras.':
            'W/m²). Lyd kan til og med ha negativt lydnivå. Den er bare for svak til å bli hørt.'
    });
})();
