/* i18n/nb/sidor/fysik1-newtons-andra-app.js — norska (bokmål) för
 * simuleringen Newtons andra lag. Texten med inbäddade beteckningar är
 * delad i en nyckel per textnod (se SIMULERINGAR.md). */
(function () {
    I18N.add({
        'Newtons andra lag — Fysiklabbet': 'Newtons andre lov — Fysiklabbet',
        'Newtons andra lag — Fysik nivå 1': 'Newtons andre lov — Fysikk nivå 1',
        'F = m · a — lägg en kraft på en kärra och se accelerationen. Ändra objektets massa och kraftens storlek.':
            'F = m · a: legg en kraft på en vogn og se akselerasjonen. Endre massen til gjenstanden og størrelsen på kraften.',
        '/ Newtons andra lag': '/ Newtons andre lov',
        'Newtons andra lag': 'Newtons andre lov',
        'Utan luftmotstånd': 'Uten luftmotstand',
        'Med luftmotstånd': 'Med luftmotstand',

        // Ingressen
        'Den': '',  // «Resultantkraften» står först i den norska meningen
        'resulterande kraften': 'Resultantkraften',
        'på en kropp ger kroppen en': 'på et legeme gir legemet en',
        'acceleration': 'akselerasjon',
        'i kraftens riktning. Ju större massa, desto svårare är det att ändra kroppens hastighet. Kärran har fyra hjul och drivs av':
            'i kraftens retning. Jo større masse, desto vanskeligere er det å endre hastigheten til legemet. Vognen har fire hjul og drives av',
        'två motorer': 'to motorer',
        ': en driver det vänstra hjulparet i bilden (drivkraft': ': én driver det venstre hjulparet i bildet (drivkraft',
        ') och en det högra (drivkraft': ') og én det høyre (drivkraft',
        '). Ställ in varje kraft åt vänster eller höger och se hur de': '). Still inn hver kraft mot venstre eller høyre, og se hvordan de',
        'adderas': 'adderes',
        '(eller tar ut varandra) till en': '(eller opphever hverandre) til en',
        'resulterande kraft': 'resultantkraft',
        'som bestämmer accelerationen, och därmed hur farten ändras.': 'som bestemmer akselerasjonen, og dermed hvordan farten endres.',
        'I läget': 'I modusen',
        'med luftmotstånd': 'med luftmotstand',
        'tillkommer en bromsande kraft': 'kommer det i tillegg en bremsende kraft',
        'som växer med kvadraten på farten. Farten närmar sig då en': 'som vokser med kvadratet av farten. Farten nærmer seg da en',
        'toppfart': 'toppfart',
        ', där luftmotståndet tar ut den pålagda kraften.': ', der luftmotstanden opphever den påførte kraften.',
        'Slå på': 'Slå på',
        'luftmotstånd': 'luftmotstand',
        'för att se hur farten i stället planar ut mot en toppfart.': 'for å se hvordan farten i stedet flater ut mot en toppfart.',

        // Formelkortet
        'Resulterande kraft': 'Resultantkraft',
        'Massa': 'Masse',
        'Acceleration': 'Akselerasjon',

        // Scenen
        '(kärra + låda)': '(vogn + kasse)',
        '= 0 ⟺ konstant hastighet': '= 0 ⟺ konstant hastighet',
        'Luftmotståndet växer med kvadraten på farten.': 'Luftmotstanden vokser med kvadratet av farten.',
        'Luftmotstånd försummas.': 'Det ses bort fra luftmotstand.',
        'Visa krafter': 'Vis krefter',
        'Visa resulterande kraft': 'Vis resultantkraft',
        'Visa acceleration': 'Vis akselerasjon',
        'Visa hastighet': 'Vis hastighet',
        'Visa luftpartiklar': 'Vis luftpartikler',
        'Massa (kärra + låda)': 'Masse (vogn + kasse)',
        'Drivkraft': 'Drivkraft',
        'Greppets tak:': 'Grensen for grepet:',
        'N per hjulpar (': 'N per hjulpar (',

        // Reglagen i sidopanelen
        '₁ (◀ vänster / höger ▶)': '₁ (◀ venstre / høyre ▶)',
        '₂ (◀ vänster / höger ▶)': '₂ (◀ venstre / høyre ▶)',
        'Greppet sätter taket: varje hjulpar kan som mest ge': 'Grepet setter grensen: hvert hjulpar kan maksimalt gi',
        'N innan hjulen slirar (friktionstal': 'N før hjulene slurer (friksjonstall',
        '= 0,8). Öka massan för att få större grepp.': '= 0,8). Øk massen for å få bedre grep.',
        'Motorerna orkar högst': 'Motorene klarer høyst',
        'N var. Greppet räcker till': 'N hver. Grepet rekker til',
        'N per hjulpar (friktionstal': 'N per hjulpar (friksjonstall',
        'Styrning': 'Styring',
        'Avläsning': 'Avlesning',
        'resulterande': 'resultant',
        'accel.': 'akselerasjon',
        'fart': 'fart',

        // Så hänger det ihop
        'Så hänger det ihop': 'Slik henger det sammen',
        'Luftmotståndet': 'Luftmotstanden',
        '² växer med kvadraten på farten och är riktat mot rörelsen. Allteftersom farten ökar minskar den resulterande kraften, och farten närmar sig en':
            '² vokser med kvadratet av farten og er rettet mot bevegelsen. Etter hvert som farten øker, minker resultantkraften, og farten nærmer seg en',
        '. Vid toppfarten tar luftmotståndet ut den pålagda kraften (': '. Ved toppfarten opphever luftmotstanden den påførte kraften (',
        '= 0), och accelerationen är noll.': '= 0), og akselerasjonen er null.',
        'Accelerationen är konstant så länge krafterna inte ändras, och hastigheten ändras då jämnt. Gör du den resulterande kraften till noll (':
            'Akselerasjonen er konstant så lenge kreftene ikke endres, og hastigheten endres da jevnt. Gjør du resultantkraften lik null (',
        '= 0) blir accelerationen noll och kärran rullar vidare med': '= 0), blir akselerasjonen null, og vognen ruller videre med',
        'konstant': 'konstant',
        'hastighet (Newtons första lag). Lägg den resulterande kraften mot rörelsen för att bromsa.': 'hastighet (Newtons første lov). Legg resultantkraften mot bevegelsen for å bremse.',
        'Proportionalitetskonstanten är': 'Proporsjonalitetskonstanten er',
        '= 0,032 N per (m/s)². Vid 25 m/s ger luftmotståndet 0,032 · 25² N = 20 N, lika mycket som en motor som mest orkar ge. I övrigt bortser modellen från rullmotstånd och friktion i hjullagren.':
            '= 0,032 N per (m/s)². Ved 25 m/s gir luftmotstanden 0,032 · 25² N = 20 N, like mye som en motor maksimalt klarer å gi. Ellers ser modellen bort fra rullemotstand og friksjon i hjullagrene.',
        'Modellen bortser från luftmotstånd, rullmotstånd och friktion i hjullagren, så drivkrafterna':
            'Modellen ser bort fra luftmotstand, rullemotstand og friksjon i hjullagrene, så drivkreftene',
        'och': 'og',
        'är de enda horisontella krafterna på ekipaget. Massan': 'er de eneste horisontale kreftene på systemet. Massen',
        'är hela ekipagets, kärra och låda tillsammans. Drivkrafterna är själva greppet: de statiska friktionskrafterna mellan hjulen och marken. En kraft motriktad rörelsen betyder att motorn bromsar; hjulen fortsätter då rulla åt samma håll medan farten sjunker. Den bromsande motorn tar emot energi, som blir värme, eller elenergi om motorn går som generator. Så bromsar en elbil med motorn. Pekar':
            'er massen til hele systemet, vogn og kasse sammen. Drivkreftene er selve grepet: de statiske friksjonskreftene mellom hjulene og bakken. En kraft rettet mot bevegelsen betyr at motoren bremser; hjulene fortsetter da å rulle samme vei mens farten synker. Den bremsende motoren tar imot energi, som blir til varme, eller til elektrisk energi hvis motoren går som generator. Slik bremser en elbil med motoren. Peker',
        'åt var sitt håll drar motorerna dragkamp, som att gasa och bromsa samtidigt. Är summan':
            'i hver sin retning, holder motorene på med tautrekking, som å gi gass og bremse samtidig. Er summen',
        'noll ändras inte hastigheten. Står kärran stilla förblir den stilla, och hjulen med den: de sitter i samma vagn och rullar utan att slira, så de snurrar alltid lika fort och åt samma håll. Greppet har en gräns. Kärran har fyra hjul, två i varje hjulpar, och varje motor driver ett hjulpar. Friktionskraften på ett hjulpar kan aldrig bli större än':
            'null, endres ikke hastigheten. Står vognen stille, forblir den stille, og hjulene med den: de sitter på samme vogn og ruller uten å slure, så de snurrer alltid like fort og samme vei. Grepet har en grense. Vognen har fire hjul, to i hvert hjulpar, og hver motor driver ett hjulpar. Friksjonskraften på et hjulpar kan aldri bli større enn',
        ', där': ', der',
        'är normalkraften från marken på hjulparet. Ekipagets tyngdpunkt ligger mitt emellan hjulparen, så normalkraften på varje hjulpar är hälften av tyngden. Med friktionstalet':
            'er normalkraften fra bakken på hjulparet. Tyngdepunktet til systemet ligger midt mellom hjulparene, så normalkraften på hvert hjulpar er halvparten av tyngden. Med friksjonstallet',
        '= 0,8, ett typiskt värde för gummihjul mot torrt underlag, kan en motor därför ge högst':
            '= 0,8, en typisk verdi for gummihjul mot tørt underlag, kan en motor derfor gi høyst',
        ', både när den driver och när den bromsar. Mer kraft än så får hjulen att slira, så reglagen går inte längre. I verkligheten omfördelas normalkrafterna när kärran accelererar: det hjulpar som ligger bakom tyngdpunkten, sett i accelerationens riktning, pressas hårdare mot marken och det andra lättare. Modellen bortser från det. Normalkrafterna är ändå tillsammans alltid':
            ', både når den driver, og når den bremser. Mer kraft enn det får hjulene til å slure, så kontrollene går ikke lenger. I virkeligheten fordeles normalkreftene om når vognen akselererer: det hjulparet som ligger bak tyngdepunktet, sett i akselerasjonens retning, presses hardere mot bakken og det andre lettere. Modellen ser bort fra det. Normalkreftene er likevel til sammen alltid',
        ', så accelerationen kan aldrig bli större än': ', så akselerasjonen kan aldri bli større enn',
        '≈ 7,9 m/s², hur lätt ekipaget än är.': '≈ 7,9 m/s², uansett hvor lett systemet er.',

        // Pedagogiska rutor
        'Kraft och massa': 'Kraft og masse',
        'Dubbelt så stor kraft ger dubbelt så stor acceleration. Dubbelt så stor massa ger hälften så stor acceleration. Sambandet är':
            'Dobbelt så stor kraft gir dobbelt så stor akselerasjon. Dobbelt så stor masse gir halvparten så stor akselerasjon. Sammenhengen er',
        'är den resulterande kraften.': 'er resultantkraften.',
        'Riktning': 'Retning',
        'Accelerationen pekar alltid åt samma håll som den resulterande kraften. Pekar den resulterande kraften mot rörelsen bromsas kroppen in. Ligger kraften kvar byter kroppen sedan riktning och accelererar åt andra hållet.':
            'Akselerasjonen peker alltid samme vei som resultantkraften. Peker resultantkraften mot bevegelsen, bremses legemet ned. Virker kraften fortsatt, skifter legemet deretter retning og akselererer den andre veien.',
        'Enheten newton': 'Enheten newton',
        '1 N är den resulterande kraft som ger massan 1 kg accelerationen 1 m/s². Alltså är 1 N = 1 kg·m/s², vilket följer direkt ur':
            '1 N er den resultantkraften som gir massen 1 kg akselerasjonen 1 m/s². Altså er 1 N = 1 kg·m/s², noe som følger direkte av',
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”Kraft ger fart.”': '«Kraft gir fart.»',
        'Nej, en resulterande kraft ger': 'Nei, en resultantkraft gir',
        ', alltså en': ', altså en',
        'ändring': 'endring',
        'av hastigheten. En konstant resulterande kraft får hastigheten att ändras hela tiden, inte att vara konstant.':
            'av hastigheten. En konstant resultantkraft får hastigheten til å endre seg hele tiden, ikke til å være konstant.',
        '”Ingen kraft betyder att kroppen stannar.”': '«Ingen kraft betyr at legemet stopper.»',
        'Nej, utan resulterande kraft fortsätter kroppen med konstant hastighet (Newtons första lag). I läget utan luftmotstånd rullar kärran vidare när den resulterande kraften är noll.':
            'Nei, uten resultantkraft fortsetter legemet med konstant hastighet (Newtons første lov). I modusen uten luftmotstand ruller vognen videre når resultantkraften er null.',
        '”Tunga föremål accelererar lika lätt som lätta.”': '«Tunge gjenstander akselererer like lett som lette.»',
        'Nej, vid samma resulterande kraft får det tyngre föremålet mindre acceleration, eftersom':
            'Nei, ved samme resultantkraft får den tyngre gjenstanden mindre akselerasjon, fordi'
    });
})();
