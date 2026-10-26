/* i18n/nb/sidor/fysik2-magnetfalt-spole-app.js — norska (bokmål) för
 * simuleringen Magnetfält i spole. */
(function () {
    I18N.add({
        'Magnetfält i spole — Fysiklabbet': 'Magnetfelt i en spole — Fysiklabbet',
        'Magnetfält i spole — Fysik nivå 2': 'Magnetfelt i en spole — Fysikk nivå 2',
        'En solenoid i 3D som du kan rotera fritt — lindningen syns tydligt och blå strömpilar vandrar längs tråden. Fältlinjerna är homogena inuti och böjer sig runt som hos en stavmagnet. Ändra strömmen I, varvtalet n och spolens längd l och se hur flödestätheten B = μ₀ · n · I/l ändras, och byt strömriktning för att vända fältet och polerna.':
            'En solenoide i 3D som du kan rotere fritt. Viklingen vises tydelig, og blå strømpiler vandrer langs tråden. Feltlinjene er homogene inne i spolen og bøyer seg rundt som hos en stavmagnet. Endre strømmen I, antall vindinger n og lengden l på spolen, og se hvordan flukstettheten B = μ₀ · n · I/l endrer seg. Bytt strømretning for å snu feltet og polene.',
        '/ Magnetfält i spole': '/ Magnetfelt i en spole',
        'Magnetfält i spole': 'Magnetfelt i en spole',

        // Ingressen (en nyckel per textnod)
        'Sätter vi ihop flera strömslingor bildas en': 'Setter vi sammen flere strømsløyfer, får vi en',
        'spole': 'spole',
        '. Fälten från varven samverkar, och inuti en lång rak spole — en': '. Feltene fra vindingene virker sammen, og inne i en lang, rett spole, en',
        'solenoid': 'solenoide',
        '— blir magnetfältet': ', blir magnetfeltet',
        'homogent': 'homogent',
        ': lika stort överallt. Dra i scenen för att rotera spolen i tre dimensioner och studera hur tråden är lindad — de blå prickarna som vandrar längs tråden visar åt vilket håll strömmen går runt spolen, och tillsammans med lindningen avgör det fältets riktning (tumregeln). Ändra strömmen':
            ': like sterkt overalt. Dra i scenen for å rotere spolen i tre dimensjoner og studere hvordan tråden er viklet. De blå prikkene som vandrer langs tråden, viser hvilken vei strømmen går rundt spolen, og sammen med viklingen avgjør det retningen til feltet (høyrehåndsregelen). Endre strømmen',
        ', varvtalet': ', antall vindinger',
        'och spolens längd': 'og spolelengden',
        ', och byt strömriktning för att vända fältet. Vi har byggt en elektromagnet!': ', og bytt strømretning for å snu feltet. Vi har bygget en elektromagnet!',

        // Formelkortet
        'Flödestäthet': 'Flukstetthet',
        'Permeabiliteten': 'Permeabiliteten',
        'Varvtal · ström': 'Vindinger · strøm',
        'Spolens längd': 'Lengden på spolen',

        // Scenen
        'Varv per meter': 'Vindinger per meter',
        'Dra för att rotera — scrolla för att zooma': 'Dra for å rotere, rull for å zoome',
        'Fältlinjer': 'Feltlinjer',
        'Strömriktningen': 'Strømretningen',
        'Polerna (N och S)': 'Polene (N og S)',
        'Spolen': 'Spolen',
        'Byt strömriktning': 'Bytt strømretning',

        // Reglagen
        'Ström (': 'Strøm (',
        'Varvtal (': 'Antall vindinger (',
        'Spolens längd (': 'Lengden på spolen (',
        '{n} varv': '{n} vindinger',
        'Dubbla strömmen ⟹ dubbelt så starkt fält (': 'Dobbelt så stor strøm ⟹ dobbelt så sterkt felt (',
        'Antalet varv i spolen. Fler varv på samma längd ⟹ starkare fält.': 'Antall vindinger i spolen. Flere vindinger på samme lengde ⟹ sterkere felt.',
        'Längre spole med samma varvtal ⟹ glesare varv ⟹ svagare fält.': 'Lengre spole med like mange vindinger ⟹ glisnere vindinger ⟹ svakere felt.',

        // Beräkning och avläsning
        'Beräkning av flödestätheten': 'Beregning av flukstettheten',
        'Exempel 1 ur teorin (600 varv, 7,5 cm, 1,5 A)': 'Eksempel 1 fra teorien (600 vindinger, 7,5 cm, 1,5 A)',
        '600 varv, 7,5 cm, 1,5 A': '600 vindinger, 7,5 cm, 1,5 A',
        'Avläsning': 'Avlesning',
        'i tesla': 'i tesla',
        'varv/m': 'vindinger/m',
        'Ström': 'Strøm',
        'Testa: dubbla spolens längd utan att ändra varvtalet — fältet halveras, eftersom varven glesas ut. Det är kvoten':
            'Prøv: doble lengden på spolen uten å endre antall vindinger. Feltet halveres, fordi vindingene blir glisnere. Det er forholdet',
        '(varv per meter) som avgör, inte varvtalet ensamt.': '(vindinger per meter) som avgjør, ikke antall vindinger alene.',

        // De pedagogiska rutorna
        'Från slinga till solenoid': 'Fra sløyfe til solenoide',
        'Runt en strömförande ledare bildas ett magnetfält. Formas ledaren till en cirkel — en slinga — samverkar fältet från slingans alla delar och blir starkare inuti. Sätter vi ihop många slingor till en spole förstärks fältet ytterligare. En lång rak spole kallas solenoid.':
            'Rundt en strømførende leder dannes det et magnetfelt. Formes lederen til en sirkel, en sløyfe, virker feltet fra alle delene av sløyfen sammen og blir sterkere inni. Setter vi sammen mange sløyfer til en spole, forsterkes feltet ytterligere. En lang, rett spole kalles en solenoide.',
        'Homogent fält inuti': 'Homogent felt inni',
        'Inuti en lång rak spole betraktas magnetfältet som': 'Inne i en lang, rett spole regnes magnetfeltet som',
        '— lika stort överallt. Det syns i modellen: inuti spolen löper fältlinjerna parallellt med spolens axel. Utanför spolen liknar fältet en stavmagnets, med en nordända och en sydända, precis som en stavmagnet. Varje fältlinje är en sluten slinga som går genom spolen och tillbaka runt utsidan.':
            '(altså like sterkt overalt). Det ser du i modellen: inne i spolen går feltlinjene parallelt med aksen til spolen. Utenfor spolen ligner feltet på feltet rundt en stavmagnet, med en nordende og en sørende. Hver feltlinje er en lukket sløyfe som går gjennom spolen og tilbake rundt utsiden.',
        'En elektromagnet': 'En elektromagnet',
        'En strömförande spole är en': 'En strømførende spole er en',
        'elektromagnet': 'elektromagnet',
        '. Fördelen mot en permanentmagnet är att fältets storlek och riktning kan justeras genom att reglera strömmen — prova knappen "Byt strömriktning" och se polerna byta plats. Nackdelen är att den kräver energi.':
            '. Fordelen sammenlignet med en permanent magnet er at styrken og retningen til feltet kan justeres ved å regulere strømmen. Prøv knappen «Bytt strømretning» og se polene bytte plass. Ulempen er at den krever energi.',
        'Tumregeln för spole': 'Høyrehåndsregelen for spole',
        'Magnetfältets riktning genom spolen bestäms enklast med en tumregel: låt': 'Retningen til magnetfeltet gjennom spolen finner du enklest med høyrehåndsregelen: la',
        'fingrarna': 'fingrene',
        'på högerhanden följa strömmens riktning runt spolen — då pekar': 'på høyre hånd følge retningen til strømmen rundt spolen. Da peker',
        'tummen': 'tommelen',
        'i magnetfältets riktning genom spolen. Rotera modellen så att du ser en spolände rakt framifrån och följ de blå strömpilarna runt varven med högerhandens fingrar: tummen pekar då mot samma håll som de röda fältpilarna. Byter strömmen riktning måste handen vändas, och fältet (och polerna) vänder — testa med knappen "Byt strömriktning".':
            'i retningen til magnetfeltet gjennom spolen. Roter modellen slik at du ser den ene enden av spolen rett forfra, og følg de blå strømpilene rundt vindingene med fingrene på høyre hånd. Tommelen peker da samme vei som de røde feltpilene. Bytter strømmen retning, må hånden snus, og feltet (og polene) snur. Prøv med knappen «Bytt strømretning».',
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Fler varv ger alltid starkare fält."': '«Flere vindinger gir alltid sterkere felt.»',
        'Bara om spolen inte samtidigt blir längre. Det är varv per meter,': 'Bare hvis spolen ikke samtidig blir lengre. Det er vindinger per meter,',
        ', som räknas — lindas samma varvtal ut över dubbla längden halveras fältet.': ', som teller. Fordeles like mange vindinger over dobbel lengde, halveres feltet.',
        '"Fältet är starkast vid spolens ändar."': '«Feltet er sterkest ved endene av spolen.»',
        'Nej — inuti en lång rak spole är fältet homogent, lika starkt överallt. Strax utanför ändarna är det tvärtom svagare, och fältlinjerna böjer av som hos en stavmagnet.':
            'Nei. Inne i en lang, rett spole er feltet homogent, like sterkt overalt. Like utenfor endene er det tvert imot svakere, og feltlinjene bøyer av som hos en stavmagnet.',
        '"Spolen är magnetisk även utan ström."': '«Spolen er magnetisk også uten strøm.»',
        'Nej — en luftspole har bara ett magnetfält så länge det går ström genom den. Det är just det som gör elektromagneten användbar: fältet kan slås av och på.':
            'Nei. En luftspole har bare et magnetfelt så lenge det går strøm gjennom den. Det er nettopp det som gjør elektromagneten nyttig: feltet kan slås av og på.'
    });
})();
