/* i18n/nb/sidor/fysik2-satellitbana-app.js — norska (bokmål) för
 * simuleringen Satellit i omloppsbana. */
(function () {
    I18N.add({
        // Sidhuvud och delning
        'Satellit i omloppsbana — Fysiklabbet': 'Satellitt i omløpsbane — Fysiklabbet',
        'Satellit i omloppsbana — Fysik nivå 2': 'Satellitt i omløpsbane — Fysikk nivå 2',
        'Skjut upp en satellit runt jorden: ställ in höjd och fart och se om banan blir en cirkel, en ellips, en krasch mot jordytan eller en flykt bort från jorden. Gravitationskraften, hastigheten, den förutsagda banan och energierna visas live, med rymdteleskopet Hubble som utgångsläge.':
            'Skyt opp en satellitt rundt jorden: still inn høyde og fart og se om banen blir en sirkel, en ellipse, et krasj mot jordoverflaten eller en flukt bort fra jorden. Gravitasjonskraften, hastigheten, den forutsagte banen og energiene vises direkte, med romteleskopet Hubble som utgangspunkt.',
        '/ Satellit i omloppsbana': '/ Satellitt i omløpsbane',
        'Satellit i omloppsbana': 'Satellitt i omløpsbane',

        // Ingress
        'En satellit hålls kvar i sin bana av en enda kraft:': 'En satellitt holdes i banen sin av én eneste kraft:',
        'gravitationskraften': 'gravitasjonskraften',
        'från jorden. I en cirkelbana är den exakt den': 'fra jorden. I en sirkelbane er den nøyaktig den',
        'centripetalkraft': 'sentripetalkraften',
        'som krävs, och det ger en bestämd fart för varje höjd. Skjut upp satelliten med en annan fart och se vad som händer: för långsamt faller den inåt i en ellips, eller störtar mot jordytan, och för snabbt stiger den utåt i en ellips eller lämnar jorden för gott. Utgångsläget är genomgångens exempel med rymdteleskopet Hubble.':
            'som trengs, og det gir en bestemt fart for hver høyde. Skyt opp satellitten med en annen fart og se hva som skjer: for sakte faller den innover i en ellipse eller styrter mot jordoverflaten, og for fort stiger den utover i en ellipse eller forlater jorden for godt. Utgangspunktet er eksemplet fra gjennomgangen med romteleskopet Hubble.',

        // Formelkortet
        'Gravitationskraft': 'Gravitasjonskraft',
        'Grav.konst. · massa · jordens massa': 'Grav.konst. · masse · jordens masse',
        'Avstånd²': 'Avstand²',
        'Centripetalkraft': 'Sentripetalkraft',
        'Massa · fart²': 'Masse · fart²',
        'Banradie': 'Baneradius',
        'Cirkelbana': 'Sirkelbane',
        'Fart²': 'Fart²',
        'Grav.konst. · jordens massa': 'Grav.konst. · jordens masse',

        // Scenen: fartskalan
        'Kraschbana': 'Krasjbane',
        'perigeum {d} under jordytan': 'perigeum {d} under jordoverflaten',
        'Ellipsbana, för långsam för cirkel': 'Ellipsebane, for lav fart til sirkelbane',
        'faller inåt men missar jorden, perigeum {d}': 'faller innover, men bommer på jorden, perigeum {d}',
        'gravitationskraften är exakt den centripetalkraft som krävs': 'gravitasjonskraften er nøyaktig den sentripetalkraften som trengs',
        'Ellipsbana, för snabb för cirkel': 'Ellipsebane, for høy fart til sirkelbane',
        'stiger utåt och kommer tillbaka, apogeum {d}': 'stiger utover og kommer tilbake, apogeum {d}',
        'Flyktbana': 'Unnslippingsbane',
        'farten når flykthastigheten, satelliten återvänder aldrig': 'farten når unnslippingshastigheten, satellitten kommer aldri tilbake',
        'krasch': 'krasj',
        'cirkelfart': 'sirkelfart',
        'flykthastighet': 'unnslippingshastighet',
        'Satelliten störtade mot jordytan efter': 'Satellitten styrtet mot jordoverflaten etter',
        '. Tryck Börja om.': '. Trykk Start på nytt.',
        'Satelliten är nu mer än 60 jordradier bort och kommer aldrig tillbaka.': 'Satellitten er nå mer enn 60 jordradier borte og kommer aldri tilbake.',
        'dygn': 'døgn',
        'Sedd rakt ovanifrån nordpolen. Jorden och banan är i skala, satelliten är förstorad. Luftmotstånd försummas.':
            'Sett rett ovenfra, over Nordpolen. Jorden og banen er i riktig målestokk, satellitten er forstørret. Vi ser bort fra luftmotstand.',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Hastighet': 'Hastighet',
        'Förutsagd bana': 'Forutsagt bane',
        'Spår': 'Spor',
        'Cirkelbana för jämförelse': 'Sirkelbane til sammenligning',
        'Avstånd': 'Avstand',
        'Jordens rotation': 'Jordens rotasjon',
        'Färdiga försök': 'Ferdige forsøk',

        // Reglage
        'Höjd över jordytan (': 'Høyde over jordoverflaten (',
        'Fart vid uppskjutningen (': 'Fart ved oppskytingen (',
        'Satellitens massa (': 'Satellittens masse (',
        'Tidsförkortning': 'Tidskomprimering',
        'Förstoring': 'Forstørrelse',
        'Skriv in värde': 'Skriv inn verdi',
        'Sätt cirkelfart (': 'Sett sirkelfart (',
        'Sätt flykthastighet (': 'Sett unnslippingshastighet (',
        'Ändrar du höjden eller farten startar satelliten om från startpunkten, rakt ovanför jorden i bilden, med hastigheten riktad åt vänster: motsols sett från norr, samma håll som jorden roterar. Massan påverkar kraften och energierna men inte banan.':
            'Endrer du høyden eller farten, starter satellitten på nytt fra startpunktet, rett over jorden i bildet, med hastigheten rettet mot venstre: mot klokka sett fra nord, samme vei som jorden roterer. Massen påvirker kraften og energiene, men ikke banen.',

        // Färdiga försök
        'Rymdteleskopet Hubble, exemplet i genomgången: 7 560 m/s på 590 km höjd.': 'Romteleskopet Hubble, eksemplet i gjennomgangen: 7 560 m/s i 590 km høyde.',
        'Rymdstationen ISS': 'Romstasjonen ISS',
        'Den internationella rymdstationen på 420 km höjd, ett varv på drygt 90 minuter.': 'Den internasjonale romstasjonen i 420 km høyde, et omløp på drøyt 90 minutter.',
        'GPS-satellit': 'GPS-satellitt',
        'En GPS-satellit på 20 200 km höjd går två varv om dygnet.': 'En GPS-satellitt i 20 200 km høyde fullfører to omløp i døgnet.',
        'Geostationär': 'Geostasjonær',
        'På 35 786 km höjd tar ett varv lika lång tid som jordens rotation, 23 h 56 min: satelliten står stilla över samma punkt på ekvatorn. Förstora bilden och följ kontinenten under satelliten när jorden snurrar.':
            'I 35 786 km høyde tar et omløp like lang tid som jordens rotasjon, 23 h 56 min: satellitten står stille over samme punkt på ekvator. Forstørr bildet og følg kontinentet under satellitten mens jorden snurrer.',
        'Månens avstånd': 'Månens avstand',
        'En satellit på månens avstånd, 384 400 km från jordens medelpunkt, behöver bara 1 020 m/s och tar 27 dygn på ett varv.':
            'En satellitt i samme avstand som månen, 384 400 km fra jordens sentrum, trenger bare 1 020 m/s og bruker 27 døgn på et omløp.',

        // Avläsning
        'Avläsning just nu': 'Avlesning akkurat nå',
        'fart': 'fart',
        'höjd över jordytan': 'høyde over jordoverflaten',
        'gravitationskraft': 'gravitasjonskraft',
        'acceleration': 'akselerasjon',
        'cirkelfart på denna höjd': 'sirkelfart i denne høyden',
        'flykthastighet på denna höjd': 'unnslippingshastighet i denne høyden',
        'omloppstid': 'omløpstid',
        'tid sedan uppskjutningen': 'tid siden oppskytingen',
        'under ytan': 'under overflaten',
        'lägsta höjd (perigeum)': 'laveste høyde (perigeum)',
        'högsta höjd (apogeum)': 'høyeste høyde (apogeum)',
        'rörelseenergi': 'kinetisk energi',
        'lägesenergi': 'potensiell energi',
        'total energi': 'total energi',
        'banans excentricitet': 'banens eksentrisitet',

        // Vad avgör banan?
        'Vad avgör banan?': 'Hva avgjør banen?',
        'Enbart farten på den givna höjden. Cirkelfarten är': 'Bare farten i den gitte høyden. Sirkelfarten er',
        'här, flykthastigheten': 'her, unnslippingshastigheten',
        ', och under': ', og under',
        'når banan ned under jordytan. Just nu:': 'når banen ned under jordoverflaten. Akkurat nå:',
        'kraschbana': 'krasjbane',
        'ellipsbana med perigeum under startpunkten': 'ellipsebane med perigeum under startpunktet',
        'cirkelbana': 'sirkelbane',
        'ellipsbana med apogeum över startpunkten': 'ellipsebane med apogeum over startpunktet',
        'flyktbana': 'unnslippingsbane',

        // Pedagogiska sektioner
        'Gravitationen är centripetalkraften': 'Gravitasjonen er sentripetalkraften',
        'Det finns ingen extra kraft som håller satelliten i banan. Gravitationskraften pekar hela tiden mot jordens medelpunkt, och i en cirkelbana är den precis så stor som centripetalkraften':
            'Det finnes ingen ekstra kraft som holder satellitten i banen. Gravitasjonskraften peker hele tiden mot jordens sentrum, og i en sirkelbane er den nøyaktig så stor som sentripetalkraften',
        'kräver. Sätter man': 'krever. Med',
        'försvinner satellitens massa ur ekvationen: banan beror bara på höjden och farten, aldrig på hur tung satelliten är.':
            'forsvinner satellittens masse fra likningen: banen avhenger bare av høyden og farten, aldri av hvor tung satellitten er.',
        'För långsamt och för snabbt': 'For sakte og for fort',
        'Med lägre fart än cirkelfarten räcker inte hastigheten i sidled för att missa jorden lika bra: satelliten faller inåt, ökar farten och kommer tillbaka upp i en ellips, om den inte hinner träffa jordytan först. Med högre fart stiger den utåt, bromsas av gravitationen och vänder i apogeum. Når farten flykthastigheten, √2 gånger cirkelfarten, är den totala energin noll eller positiv och satelliten kommer aldrig tillbaka.':
            'Med lavere fart enn sirkelfarten er ikke hastigheten sidelengs stor nok til å bomme like godt på jorden: satellitten faller innover, øker farten og kommer opp igjen i en ellipse, hvis den ikke rekker å treffe jordoverflaten først. Med høyere fart stiger den utover, bremses av gravitasjonen og snur i apogeum. Når farten når unnslippingshastigheten, √2 ganger sirkelfarten, er den totale energien null eller positiv, og satellitten kommer aldri tilbake.',
        'Lägesenergin långt från jorden': 'Den potensielle energien langt fra jorden',
        'Nära jordytan duger': 'Nær jordoverflaten holder det med',
        ', men uppe i en bana ändras': ', men oppe i en bane endres',
        'med höjden. Avläsningen använder därför nollnivån oändligt långt bort och': 'med høyden. Avlesningen bruker derfor nullnivået uendelig langt borte og',
        '. Summan': '. Summen',
        'är konstant längs hela banan, och dess tecken avgör om satelliten är bunden till jorden (negativ) eller fri (noll eller positiv).':
            'er konstant langs hele banen, og fortegnet avgjør om satellitten er bundet til jorden (negativ) eller fri (null eller positiv).',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”Satelliten är tyngdlös eftersom gravitationen inte når dit upp.”': '«Satellitten er vektløs fordi gravitasjonen ikke når så høyt opp.»',
        'På Hubbles höjd är gravitationskraften fortfarande 84 procent av kraften vid jordytan. Satelliten och allt i den faller fritt hela tiden, det är därför astronauterna svävar.':
            'I Hubbles høyde er gravitasjonskraften fortsatt 84 prosent av kraften ved jordoverflaten. Satellitten og alt i den faller fritt hele tiden, og det er derfor astronautene svever.',
        '”En tyngre satellit behöver högre fart.”': '«En tyngre satellitt trenger høyere fart.»',
        'Nej. Massan står i både gravitationskraften och centripetalkraften och kan divideras bort. Prova att ändra massan: kraften ändras, men banan är densamma.':
            'Nei. Massen står i både gravitasjonskraften og sentripetalkraften og kan divideres bort. Prøv å endre massen: kraften endres, men banen er den samme.',
        '”Om satelliten bromsas faller den rakt ned.”': '«Hvis satellitten bremses, faller den rett ned.»',
        'Den behåller nästan hela sin fart i sidled och följer i stället en ellips inåt. Först om perigeum hamnar under jordytan störtar den, och då i en lång, flack bana, inte lodrätt.':
            'Den beholder nesten hele farten sidelengs og følger i stedet en ellipse innover. Først hvis perigeum havner under jordoverflaten, styrter den, og da i en lang, flat bane, ikke loddrett.',
        '”Flykthastigheten är farten som krävs för att komma ut i rymden.”': '«Unnslippingshastigheten er farten som trengs for å komme ut i verdensrommet.»',
        'Den är farten som krävs för att aldrig komma tillbaka, oavsett hur långt man färdas. En raket som ska nå en bana behöver betydligt mindre än så.':
            'Den er farten som trengs for aldri å komme tilbake, uansett hvor langt man reiser. En rakett som skal nå en bane, trenger betydelig mindre enn det.'
    });
})();
