/* i18n/nb/sidor/fysik2-dubbelkon-app.js — norska (bokmål) för simuleringen
 * Dubbelkonen som rullar uppför. Löptexten är delad i textnoder runt
 * <em>/<strong>, en nyckel per textnod. */
(function () {
    I18N.add({
        // Sidhuvud och metadata
        'Dubbelkonen som rullar uppför — Fysiklabbet': 'Dobbeltkjeglen som ruller oppover — Fysiklabbet',
        'Dubbelkonen som rullar uppför — Fysik nivå 2': 'Dobbeltkjeglen som ruller oppover — Fysikk nivå 2',
        'Interaktiv 3D-simulering av den klassiska demonstrationen där en dubbelkon ser ut att rulla uppför en lutande bana. Skenorna går isär, kontaktpunkterna vandrar mot konens spetsar och tyngdpunkten sjunker fastän banan stiger. Jämför med cylindern som rullar nedåt, ändra lutningen och hitta gränsen där illusionen bryts.':
            'Interaktiv 3D-simulering av den klassiske demonstrasjonen der en dobbeltkjegle ser ut til å rulle oppover en skrå bane. Skinnene går fra hverandre, kontaktpunktene vandrer mot spissene på kjeglen, og tyngdepunktet synker selv om banen stiger. Sammenlign med sylinderen som ruller nedover, endre helningen og finn grensen der illusjonen brytes.',
        'En dubbelkon släpps vid den låga änden av en V-formad bana och rullar mot den höga. 3D-simulering som avslöjar illusionen: tyngdpunkten sjunker hela vägen, eftersom kontaktpunkterna vandrar ut mot konens spetsar när skenorna går isär.':
            'En dobbeltkjegle slippes i den lave enden av en V-formet bane og ruller mot den høye. 3D-simulering som avslører illusjonen: tyngdepunktet synker hele veien, fordi kontaktpunktene vandrer ut mot spissene på kjeglen når skinnene går fra hverandre.',
        '/ Dubbelkonen som rullar uppför': '/ Dobbeltkjeglen som ruller oppover',
        'Dubbelkonen som rullar uppför': 'Dobbeltkjeglen som ruller oppover',
        'Gaffelbalansen': 'Gaffelbalansen',

        // Ingressen
        'En dubbelkon släpps vid den låga änden av en V-formad bana och rullar, till synes av sig själv, upp mot den höga änden. En vanlig cylinder på samma bana rullar nedåt som förväntat. Hemligheten är att banans skenor går isär: kontaktpunkterna vandrar ut mot konens smala spetsar, så att':
            'En dobbeltkjegle slippes i den lave enden av en V-formet bane og ruller, tilsynelatende av seg selv, opp mot den høye enden. En vanlig sylinder på den samme banen ruller nedover, som ventet. Hemmeligheten er at skinnene i banen går fra hverandre: kontaktpunktene vandrer ut mot de smale spissene på kjeglen, slik at',
        'tyngdpunkten sjunker hela vägen': 'tyngdepunktet synker hele veien',
        'fastän skenornas överkant stiger. Dra föremålet dit du vill, släpp det och följ tyngdpunktens spår.':
            'selv om overkanten av skinnene stiger. Dra gjenstanden dit du vil, slipp den og følg sporet etter tyngdepunktet.',

        // Formelkortet
        'Konens halva toppvinkel': 'Halve toppvinkelen til kjeglen',
        'Halva öppningsvinkeln': 'Halve åpningsvinkelen',
        'Banans lutning': 'Helningen til banen',
        'När olikheten är uppfylld sjunker tyngdpunkten mot den breda änden och dubbelkonen rullar':
            'Når ulikheten er oppfylt, synker tyngdepunktet mot den brede enden, og dobbeltkjeglen ruller',
        '"uppför"': '«oppover»',
        'banan. Med de aktuella värdena: tan': 'banen. Med de nåværende verdiene: tan',
        '°, så konen rullar': '°, så kjeglen ruller',
        'mot den breda, höga änden': 'mot den brede, høye enden',
        'nedåt mot spetsen': 'nedover mot spissen',

        // Scenen
        'Dra föremålet längs banan · dra i scenen för att vrida kameran': 'Dra gjenstanden langs banen · dra i scenen for å dreie kameraet',
        'Rakt från sidan': 'Rett fra siden',
        'Återställ vyn rakt från sidan': 'Tilbakestill visningen rett fra siden',
        'Tyngdpunkt': 'Tyngdepunkt',
        'Vågrät startnivå': 'Vannrett startnivå',

        // Verktygen
        'Föremål': 'Gjenstand',
        'Dubbelkon': 'Dobbeltkjegle',
        'Cylinder': 'Sylinder',
        'Tyngdpunktens spår': 'Sporet etter tyngdepunktet',
        'Kontaktpunkter': 'Kontaktpunkter',
        'Fart': 'Fart',
        'Släpp': 'Slipp',
        'Banans lutning (': 'Helningen til banen (',
        'Halva öppningsvinkeln (': 'Halve åpningsvinkelen (',
        'Hur brant skenornas överkant stiger mot den breda änden. Gränsen för dubbelkonen går vid':
            'Hvor bratt overkanten av skinnene stiger mot den brede enden. Grensen for dobbeltkjeglen går ved',
        '≈ {v}° med den aktuella öppningsvinkeln.': '≈ {v}° med den nåværende åpningsvinkelen.',
        'Hur snabbt skenorna går isär. Större vinkel flyttar kontaktpunkterna snabbare ut mot spetsarna, så att tyngdpunkten sjunker brantare.':
            'Hvor raskt skinnene går fra hverandre. En større vinkel flytter kontaktpunktene raskere ut mot spissene, slik at tyngdepunktet synker brattere.',

        // Avläsningar
        'Avläsningar': 'Avlesninger',
        'Tyngdpunktens höjd': 'Høyden til tyngdepunktet',
        'cm över bordet': 'cm over bordet',
        'Läge längs banan': 'Posisjon langs banen',
        'Kritisk lutning': 'Kritisk helning',
        'Illusionen håller': 'Illusjonen holder',
        ': tyngdpunkten sjunker mot den breda änden, så dubbelkonen rullar "uppför" banan.':
            ': tyngdepunktet synker mot den brede enden, så dobbeltkjeglen ruller «oppover» banen.',
        'Illusionen bruten': 'Illusjonen er brutt',
        ': banan är brantare än gränsen, tyngdpunkten skulle stiga mot den breda änden, och dubbelkonen rullar nedåt.':
            ': banen er brattere enn grensen, tyngdepunktet ville ha steget mot den brede enden, og dobbeltkjeglen ruller nedover.',

        // Grafen
        'Höjden längs banan': 'Høyden langs banen',
        'Skenornas överkant (streckad) stiger, men dubbelkonens tyngdpunkt (grön) sjunker: kontaktradien krymper snabbare än skenorna hinner stiga. Byt till cylindern och se dess tyngdpunktskurva stiga parallellt med skenorna.':
            'Overkanten av skinnene (stiplet) stiger, men tyngdepunktet til dobbeltkjeglen (grønt) synker: kontaktradien krymper raskere enn skinnene rekker å stige. Bytt til sylinderen og se tyngdepunktskurven stige parallelt med skinnene.',
        'Graf: skenornas överkant stiger längs banan medan tyngdpunktens höjd för det valda föremålet ritas som egen kurva. För dubbelkonen sjunker kurvan mot den breda änden.':
            'Graf: overkanten av skinnene stiger langs banen, mens høyden til tyngdepunktet for den valgte gjenstanden tegnes som en egen kurve. For dobbeltkjeglen synker kurven mot den brede enden.',
        'läge (cm)': 'posisjon (cm)',
        'skenans överkant': 'overkanten av skinnen',
        'tyngdpunkten': 'tyngdepunktet',

        // Meddelanden när föremålet stannat
        'Konen har stannat vid den breda, höga änden.': 'Kjeglen har stoppet ved den brede, høye enden.',
        'Kontaktpunkterna har nått nästan ända ut till spetsarna, där kontaktradien är liten: nu måste konen snurra många varv för varje centimeter framåt, och rörelseenergin räcker inte längre. Tyngdpunkten har sjunkit hela vägen hit. Tryck på':
            'Kontaktpunktene har nådd nesten helt ut til spissene, der kontaktradien er liten: nå må kjeglen snurre mange runder for hver centimeter fremover, og den kinetiske energien strekker ikke lenger til. Tyngdepunktet har sunket hele veien hit. Trykk på',
        'Konen': 'Kjeglen',
        'Cylindern': 'Sylinderen',
        'rullade ned till banans spets.': 'rullet ned til spissen av banen.',
        'Med lutningen': 'Med helningen',
        '° är banan brantare än gränsen': '° er banen brattere enn grensen',
        '°: skenornas stigning vinner över kontaktradiens krympning, tyngdpunkten skulle stiga mot den breda änden, och konen rullar därför nedåt precis som cylindern.':
            '°: stigningen til skinnene vinner over krympingen av kontaktradien, tyngdepunktet ville ha steget mot den brede enden, og kjeglen ruller derfor nedover akkurat som sylinderen.',
        'Cylinderns kontaktradie är lika stor överallt, så dess tyngdpunkt följer skenornas lutning. Den rullar alltid mot den låga spetsen, hur banan än ser ut.':
            'Kontaktradien til sylinderen er like stor overalt, så tyngdepunktet følger helningen til skinnene. Den ruller alltid mot den lave spissen, uansett hvordan banen ser ut.',
        'Tryck på': 'Trykk på',

        // Pedagogiska kort
        'Varför rullar den uppför?': 'Hvorfor ruller den oppover?',
        'Det gör den inte, egentligen. Ett föremål som rullar fritt söker sig alltid dit dess':
            'Det gjør den egentlig ikke. En gjenstand som ruller fritt, søker seg alltid dit',
        'tyngdpunkt': 'tyngdepunktet',
        'kommer lägst, och det som avgör tyngdpunktens höjd är inte skenornas överkant utan var på föremålet skenorna bär upp det.':
            'kommer lavest, og det som avgjør høyden til tyngdepunktet, er ikke overkanten av skinnene, men hvor på gjenstanden skinnene bærer den.',
        'Vid banans spets sitter skenorna tätt ihop och bär dubbelkonen nära dess tjocka mitt: tyngdpunkten ligger då en hel konradie ovanför skenorna. Mot den breda änden går skenorna isär, kontaktpunkterna glider ut mot de smala spetsarna, och konen sjunker ner mellan skenorna. Kryssa i':
            'Ved spissen av banen sitter skinnene tett sammen og bærer dobbeltkjeglen nær den tykke midten: tyngdepunktet ligger da en hel kjegleradius over skinnene. Mot den brede enden går skinnene fra hverandre, kontaktpunktene glir ut mot de smale spissene, og kjeglen synker ned mellom skinnene. Kryss av for',
        'och följ de röda prickarna: de vandrar utåt medan den gröna tyngdpunkten sjunker under den vågräta startnivån.':
            'og følg de røde prikkene: de vandrer utover mens det grønne tyngdepunktet synker under det vannrette startnivået.',
        'Cylindern avslöjar skillnaden': 'Sylinderen avslører forskjellen',
        'En cylinder är lika tjock överallt. Var skenorna än rör den är kontaktradien densamma, så dess tyngdpunkt ligger alltid på samma höjd över skenorna och följer deras lutning exakt: stiger skenorna med 3° stiger cylinderns tyngdpunkt med 3°.':
            'En sylinder er like tykk overalt. Uansett hvor skinnene berører den, er kontaktradien den samme, så tyngdepunktet ligger alltid i samme høyde over skinnene og følger helningen deres nøyaktig: stiger skinnene med 3°, stiger tyngdepunktet til sylinderen med 3°.',
        'Därför rullar cylindern alltid mot den låga spetsen, precis som intuitionen säger. Släpp båda föremålen från samma startläge och se dem rulla åt varsitt håll: samma bana, samma tyngdkraft, men två olika former, och det är formen som bestämmer vart tyngdpunkten kan sjunka.':
            'Derfor ruller sylinderen alltid mot den lave spissen, akkurat som intuisjonen sier. Slipp begge gjenstandene fra samme startposisjon og se dem rulle hver sin vei: samme bane, samme tyngdekraft, men to ulike former, og det er formen som bestemmer hvor tyngdepunktet kan synke.',
        'Villkoret, med siffror': 'Betingelsen, med tall',
        'På avståndet': 'Ved avstanden',
        'från spetsen har skenorna gått isär så att de rör konen på det axiella avståndet':
            'fra spissen har skinnene gått så langt fra hverandre at de berører kjeglen i den aksiale avstanden',
        'från mitten. Där är konens radie mindre: den har krympt med': 'fra midten. Der er radien til kjeglen mindre: den har krympet med',
        '. Samtidigt har skenornas överkant stigit med': '. Samtidig har overkanten av skinnene steget med',
        '. Tyngdpunkten sjunker alltså precis när radien krymper snabbare än skenorna stiger: tan':
            '. Tyngdepunktet synker altså nettopp når radien krymper raskere enn skinnene stiger: tan',
        'Konen i simuleringen har halva toppvinkeln': 'Kjeglen i simuleringen har halv toppvinkel',
        '° blir gränsen': '° blir grensen',
        '°: gör banan brantare än så, och illusionen bryts. Prova med glidaren':
            '°: gjør du banen brattere enn det, brytes illusjonen. Prøv med glidebryteren',
        ', och lägg märke till att konen saktar in och stannar av sig själv vid den breda änden. När kontaktpunkterna når de smala spetsarna måste konen snurra fortare och fortare för varje centimeter, och till slut går all rörelseenergi åt till snurrandet.':
            ', og legg merke til at kjeglen bremser opp og stopper av seg selv ved den brede enden. Når kontaktpunktene når de smale spissene, må kjeglen snurre fortere og fortere for hver centimeter, og til slutt går all den kinetiske energien med til snurringen.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Dubbelkonen rullar uppför backen."': '«Dobbeltkjeglen ruller oppover bakken.»',
        'Skenornas överkant stiger, men det är inte den ett rullande föremål bryr sig om. Konens tyngdpunkt sjunker hela vägen, så rörelsen är helt vanlig: nedåt i lägesenergi, precis som en kula som rullar nedför en backe.':
            'Overkanten av skinnene stiger, men det er ikke den en rullende gjenstand bryr seg om. Tyngdepunktet til kjeglen synker hele veien, så bevegelsen er helt vanlig: nedover i potensiell energi, akkurat som en kule som ruller ned en bakke.',
        '"Det måste finnas en dold motor eller magnet."': '«Det må finnes en skjult motor eller magnet.»',
        'Demonstrationen drivs enbart av tyngdkraften. Att den känns omöjlig beror på att ögat läser skenornas kant som "backen" och inte ser att föremålet samtidigt sjunker ner mellan skenorna.':
            'Demonstrasjonen drives bare av tyngdekraften. At den virker umulig, skyldes at øyet leser kanten av skinnene som «bakken» og ikke ser at gjenstanden samtidig synker ned mellom skinnene.',
        '"Energin ökar eftersom konen tar fart uppåt."': '«Energien øker fordi kjeglen får fart oppover.»',
        'Energiprincipen gäller som vanligt: den rörelseenergi konen vinner kommer från lägesenergin som frigörs när tyngdpunkten sjunker. Höjden som räknas är tyngdpunktens, inte skenornas.':
            'Energiprinsippet gjelder som vanlig: den kinetiske energien kjeglen vinner, kommer fra den potensielle energien som frigjøres når tyngdepunktet synker. Høyden som teller, er høyden til tyngdepunktet, ikke til skinnene.',

        // Prova själv hemma
        'Prova själv hemma': 'Prøv selv hjemme',
        'Tejpa ihop två likadana trattar mot varandra, mynning mot mynning, så får du en dubbelkon. Bygg banan av två linjaler eller lister som möts i en spets: lägg spetsen på bordet och de breda ändarna på ett par böcker, så att kanterna stiger några grader. Lägg dubbelkonen vid spetsen och släpp. Fungerar det inte direkt är banan antingen för brant eller öppningsvinkeln för liten, precis som villkoret ovan säger. Titta sedan från sidan, i ögonhöjd med banan: då syns det tydligt att konens mitt faktiskt sjunker medan den rullar "uppför".':
            'Teip sammen to like trakter mot hverandre, åpning mot åpning, så får du en dobbeltkjegle. Bygg banen av to linjaler eller lister som møtes i en spiss: legg spissen på bordet og de brede endene på et par bøker, slik at kantene stiger noen grader. Legg dobbeltkjeglen ved spissen og slipp. Fungerer det ikke med en gang, er banen enten for bratt eller åpningsvinkelen for liten, akkurat som betingelsen ovenfor sier. Se deretter fra siden, i øyehøyde med banen: da ser du tydelig at midten av kjeglen faktisk synker mens den ruller «oppover».'
    });
})();
