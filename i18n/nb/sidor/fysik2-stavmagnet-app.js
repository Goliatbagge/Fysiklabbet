/* i18n/nb/sidor/fysik2-stavmagnet-app.js — norska (bokmål) för
 * simuleringen Stavmagnetens magnetfält (2D och 3D). */
(function () {
    I18N.add({
        'Stavmagnetens magnetfält — Fysiklabbet': 'Magnetfeltet rundt en stavmagnet — Fysiklabbet',
        'Stavmagnetens magnetfält — Fysik nivå 2': 'Magnetfeltet rundt en stavmagnet — Fysikk nivå 2',
        'Utforska magnetfältet kring en stavmagnet i både 2D och 3D. Dra magneten över en platta med kompassnålar, strö järnfilspån över fältet och följ fältlinjerna från nordända till sydända — eller rotera hela fältbilden fritt i tre dimensioner. Vänd magneten och se varje kompassnål svänga in sig i den nya fältriktningen.':
            'Utforsk magnetfeltet rundt en stavmagnet i både 2D og 3D. Dra magneten over en plate med kompassnåler, strø jernfilspon over feltet og følg feltlinjene fra nordende til sørende, eller roter hele feltbildet fritt i tre dimensjoner. Snu magneten og se hver kompassnål svinge seg inn i den nye feltretningen.',
        'Utforska magnetfältet kring en stavmagnet i både 2D och 3D. Dra magneten över en platta med kompassnålar, strö järnfilspån över fältet och följ fältlinjerna från nordända till sydända — eller rotera hela fältbilden fritt i tre dimensioner.':
            'Utforsk magnetfeltet rundt en stavmagnet i både 2D og 3D. Dra magneten over en plate med kompassnåler, strø jernfilspon over feltet og følg feltlinjene fra nordende til sørende, eller roter hele feltbildet fritt i tre dimensjoner.',
        '/ Stavmagnetens magnetfält': '/ Magnetfeltet rundt en stavmagnet',
        'Stavmagnetens magnetfält': 'Magnetfeltet rundt en stavmagnet',
        'Stavmagnetens fält': 'Feltet rundt en stavmagnet',
        'Attraktion och repulsion': 'Tiltrekning og frastøting',

        // Ingressen
        'Kraftfältet runt en magnet kallas': 'Kraftfeltet rundt en magnet kalles',
        'magnetfält': 'magnetfelt',
        ', och det ritas med': ', og det tegnes med',
        'fältlinjer': 'feltlinjer',
        'som går ut ur': 'som går ut fra',
        'nordändan': 'nordenden',
        'och in i': 'og inn i',
        'sydändan': 'sørenden',
        '. I': '. I',
        '2D-läget': '2D-modus',
        'ligger magneten på en platta med kompassnålar — dra magneten över plattan och se varje nål svänga in sig i fältets riktning, strö järnfilspån över fältet och flytta provkompassen dit du vill mäta. I':
            'ligger magneten på en plate med kompassnåler. Dra magneten over platen og se hver nål svinge seg inn i feltets retning, strø jernfilspon over feltet og flytt prøvekompasset dit du vil måle. I',
        '3D-läget': '3D-modus',
        'roterar du fritt runt magneten och ser att fältet inte är en platt figur utan finns i hela rummet. Vänd magneten och se hela fältbilden slå om.':
            'roterer du fritt rundt magneten og ser at feltet ikke er en flat figur, men finnes i hele rommet. Snu magneten og se hele feltbildet slå om.',

        // Scenen
        'Fältet vid provkompassen': 'Feltet ved prøvekompasset',
        'mycket starkt': 'svært sterkt',
        'starkt': 'sterkt',
        'måttligt': 'moderat',
        'svagt': 'svakt',
        'Dra i magneten och i provkompassen': 'Dra i magneten og i prøvekompasset',
        'Dra för att rotera — scrolla för att zooma': 'Dra for å rotere, rull for å zoome',
        'Vy': 'Visning',
        '2D — platta': '2D: plate',
        '3D — rummet': '3D: rommet',
        'Fältlinjer': 'Feltlinjer',
        'Kompassnålar': 'Kompassnåler',
        'Järnfilspån': 'Jernfilspon',
        'Provkompass': 'Prøvekompass',
        'Polerna (N och S)': 'Polene (N og S)',
        'Vänd magneten': 'Snu magneten',

        // Utforska
        'Utforska': 'Utforsk',
        'Dra magneten': 'Dra magneten',
        'över plattan — kompassnålarna svänger in sig i fältets riktning, precis som i demonstrationen i genomgången.':
            'over platen. Kompassnålene svinger seg inn i feltets retning, akkurat som i demonstrasjonen i gjennomgangen.',
        'Flytta provkompassen': 'Flytt prøvekompasset',
        'runt magneten och läs av hur fältet blir svagare ju längre bort från polerna den står.':
            'rundt magneten og les av hvordan feltet blir svakere jo lenger unna polene det står.',
        'och se varje nål slå om — fältets riktning definieras av åt vilket håll kompassens nordända pekar.':
            'og se hver nål slå om. Feltets retning defineres av hvilken vei nordenden på kompasset peker.',
        'Slå på järnfilspånen': 'Slå på jernfilsponene',
        'och jämför mönstret med fältlinjerna — spånen blir små kompassnålar som lägger sig längs fältet.':
            'og sammenlign mønsteret med feltlinjene. Sponene blir små kompassnåler som legger seg langs feltet.',
        'Byt till 3D': 'Bytt til 3D',
        'och rotera runt magneten: fältet finns i hela rummet, inte bara i pappersplanet.':
            'og roter rundt magneten: feltet finnes i hele rommet, ikke bare i papirplanet.',

        // Fältlinjernas spelregler
        'Fältlinjernas spelregler': 'Spillereglene for feltlinjer',
        'Utanför magneten går fältlinjerna': 'Utenfor magneten går feltlinjene',
        'ut ur nordändan': 'ut fra nordenden',
        'och': 'og',
        'in i sydändan': 'inn i sørenden',
        '; inuti magneten sluter de sig från syd till nord. Varje fältlinje är en':
            '; inne i magneten lukker de seg fra sør til nord. Hver feltlinje er en',
        'sluten kurva': 'lukket kurve',
        'utan början och slut.': 'uten begynnelse og slutt.',
        'Ju tätare fältlinjer, desto kraftigare magnetfält': 'Jo tettere feltlinjer, desto sterkere magnetfelt',
        '— tätast är de närmast polerna.': '(tettest er de nærmest polene).',
        'korsar aldrig varandra': 'krysser aldri hverandre',
        '— i varje punkt har fältet en enda riktning.': '(i hvert punkt har feltet bare én retning).',
        'En liten kompass i fältet ställer sin': 'Et lite kompass i feltet stiller',
        'nordända längs fältets riktning': 'nordenden sin langs feltets retning',
        '— det är så riktningen definieras.': '(det er slik retningen defineres).',

        // De pedagogiska rutorna
        'Kompassen definierar riktningen': 'Kompasset definerer retningen',
        'Placeras en liten kompass i magnetfältet definieras fältets riktning som den riktning kompassens nordända pekar åt. Rutnätet av kompassnålar i 2D-läget är just demonstrationen ur genomgången: en stavmagnet på en platta med kompassnålar, där nålarna tillsammans ritar upp fältbilden.':
            'Plasseres et lite kompass i magnetfeltet, defineres feltets retning som den retningen nordenden på kompasset peker. Rutenettet av kompassnåler i 2D-modus er nettopp demonstrasjonen fra gjennomgangen: en stavmagnet på en plate med kompassnåler, der nålene til sammen tegner opp feltbildet.',
        'Fältet finns i hela rummet': 'Feltet finnes i hele rommet',
        'På papperet ritas fältet som en platt figur, men magnetfältet finns runt om magneten åt alla håll — det ser du i 3D-läget, där samma fältlinjebild går igen i varje plan genom magnetens axel. Det motsvarar demonstrationen med järnfilspån i en trögflytande vätska, som visar fältet i tre dimensioner.':
            'På papiret tegnes feltet som en flat figur, men magnetfeltet finnes rundt magneten i alle retninger. Det ser du i 3D-modus, der det samme feltlinjebildet går igjen i hvert plan gjennom magnetens akse. Det tilsvarer demonstrasjonen med jernfilspon i en tyktflytende væske, som viser feltet i tre dimensjoner.',
        'Poler uppträder alltid parvis': 'Poler opptrer alltid parvis',
        'Nordändan är markerad röd och sydändan vit. Delas en stavmagnet på mitten fås inte en ensam nordända och en ensam sydända — utan två nya, kortare magneter med var sitt polpar. Det går aldrig att skapa en magnet med endast en pol.':
            'Nordenden er markert rød og sørenden hvit. Deles en stavmagnet på midten, får man ikke en enslig nordende og en enslig sørende, men to nye, kortere magneter med hvert sitt polpar. Det går aldri an å lage en magnet med bare én pol.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Fältlinjerna är verkliga trådar."': '«Feltlinjene er virkelige tråder.»',
        'Nej — de är ett sätt att rita fältet. Fältet finns i varje punkt runt magneten; linjerna visar riktningen, och tätheten mellan dem visar styrkan.':
            'Nei, de er en måte å tegne feltet på. Feltet finnes i hvert punkt rundt magneten; linjene viser retningen, og tettheten mellom dem viser styrken.',
        '"Fältet tar slut där linjerna slutar i bilden."': '«Feltet tar slutt der linjene slutter i bildet.»',
        'Nej — fältet fortsätter utåt och blir bara svagare och svagare. Flytta provkompassen långt bort: nålen ställer fortfarande in sig, fast fältet är svagt.':
            'Nei, feltet fortsetter utover og blir bare svakere og svakere. Flytt prøvekompasset langt bort: nålen stiller seg fortsatt inn, selv om feltet er svakt.',
        '"En pilspets i linjens ände visar var fältet slutar."': '«En pilspiss i enden av linjen viser hvor feltet slutter.»',
        'Pilarna sitter mitt på linjerna och visar bara fältets riktning — utanför magneten från nordända till sydända.':
            'Pilene sitter midt på linjene og viser bare feltets retning: utenfor magneten fra nordende til sørende.',
        '"Bara magnetens ändar har ett fält."': '«Bare endene av magneten har et felt.»',
        'Fältet finns överallt runt magneten, men det är starkast vid polerna — där är fältlinjerna som tätast.':
            'Feltet finnes overalt rundt magneten, men det er sterkest ved polene, der feltlinjene er tettest.'
    });
})();
