/* i18n/nb/sidor/fysik2-ledare-magnetfalt-app.js — norska (bokmål) för
 * simuleringen Strömförande ledare i magnetfält. */
(function () {
    I18N.add({
        // Sidhuvud och delning
        'Strömförande ledare i magnetfält — Fysiklabbet': 'Strømførende leder i magnetfelt — Fysiklabbet',
        'Strömförande ledare i magnetfält — Fysik nivå 2': 'Strømførende leder i magnetfelt — Fysikk nivå 2',
        'En ledare i tvärsnitt mellan en nordända och en sydända. Ändra flödestäthet, ström och ledarens längd och se kraften F = B · I · l ändras — byt ström- och fältriktning och kontrollera med högerhandsregeln. Slå på det resulterande fältet och se varför ledaren puttas mot den svaga sidan: tätare fältlinjer på ena sidan, glesare på den andra. Växla mellan 2D-tvärsnittet och en roterbar 3D-vy som visar hela ledaren mellan polerna.':
            'En leder i tverrsnitt mellom en nordende og en sørende. Endre flukstetthet, strøm og lederens lengde og se kraften F = B · I · l endre seg. Bytt strøm- og feltretning og kontroller med høyrehåndsregelen. Slå på det resulterende feltet og se hvorfor lederen dyttes mot den svake siden: tettere feltlinjer på den ene siden, glisnere på den andre. Veksle mellom 2D-tverrsnittet og en 3D-visning som kan roteres og viser hele lederen mellom polene.',
        '/ Strömförande ledare i magnetfält': '/ Strømførende leder i magnetfelt',
        'Strömförande ledare i magnetfält': 'Strømførende leder i magnetfelt',

        // Ingressen
        'En ledare med strömmen': 'En leder med strømmen',
        'ligger vinkelrätt mot magnetfältet mellan en nordända och en sydända — du ser ledarens tvärsnitt. Ledaren påverkas av kraften':
            'ligger vinkelrett på magnetfeltet mellom en nordende og en sørende. Du ser tverrsnittet av lederen. Lederen påvirkes av kraften',
        ', vars riktning ges av högerhandsregeln. Byt strömriktning och fältriktning och se kraften vända — och slå på "Resulterande fältet" för att se varför: fältet blir tätare på ena sidan av ledaren och glesare på den andra. Växla till 3D-vyn för att se hela ledaren mellan polerna och rotera scenen fritt.':
            ', der retningen er gitt av høyrehåndsregelen. Bytt strømretning og feltretning og se kraften snu. Slå på «Resulterende felt» for å se hvorfor: feltet blir tettere på den ene siden av lederen og glisnere på den andre. Bytt til 3D-visningen for å se hele lederen mellom polene og rotere scenen fritt.',

        // Formelkortet
        'Kraft på ledaren': 'Kraft på lederen',
        'Flödestäthet': 'Flukstetthet',
        'Ström': 'Strøm',
        'Ledarens längd': 'Lederens lengde',
        'vinkelrätt mot ledaren': 'vinkelrett på lederen',

        // Scenen
        'strömmen ut ur planet (prick)': 'strømmen ut av planet (prikk)',
        'strömmen in i planet (kryss)': 'strømmen inn i planet (kryss)',
        'Dra för att rotera — scrolla för att zooma': 'Dra for å rotere, rull for å zoome',
        'Kraft': 'Kraft',
        'Riktning': 'Retning',
        'uppåt': 'oppover',
        'nedåt': 'nedover',

        // Inställningsrutan
        'Vy': 'Visning',
        '2D — tvärsnitt': '2D: tverrsnitt',
        '3D — hela ledaren': '3D: hele lederen',
        'Strömmen': 'Strømmen',
        'Mot dig (ut ur planet)': 'Mot deg (ut av planet)',
        'Ut ur planet (prick)': 'Ut av planet (prikk)',
        'Bort från dig (in i planet)': 'Bort fra deg (inn i planet)',
        'In i planet (kryss)': 'Inn i planet (kryss)',
        'Magnetfältet': 'Magnetfeltet',
        'Åt höger (N till vänster)': 'Mot høyre (N til venstre)',
        'Åt vänster (N till höger)': 'Mot venstre (N til høyre)',
        'Kraften': 'Kraften',
        'Resulterande fältet': 'Resulterende felt',

        // Reglagen
        'Flödestäthet (': 'Flukstetthet (',
        'Ström (': 'Strøm (',
        'Ledarens längd (': 'Lederens lengde (',
        'Starkare fält ⟹ större kraft (': 'Sterkere felt ⟹ større kraft (',
        'Större ström ⟹ större kraft (': 'Større strøm ⟹ større kraft (',
        'Längden av den del av ledaren som är inne i fältet (vinkelrätt mot planet).': 'Lengden av den delen av lederen som er inne i feltet (vinkelrett på planet).',

        // Beräkning och avläsning
        'Beräkning av kraften': 'Beregning av kraften',
        'B = 1,4 T (beräknat i exemplet), I = 2,2 A, l = 25 mm ⟹ F ≈ 77 mN': 'B = 1,4 T (beregnet i eksemplet), I = 2,2 A, l = 25 mm ⟹ F ≈ 77 mN',
        'Exempel 2 ur teorin (1,4 T, 2,2 A, 25 mm)': 'Eksempel 2 fra teorien (1,4 T, 2,2 A, 25 mm)',
        'Avläsning': 'Avlesning',
        'Kraftens riktning': 'Retningen til kraften',
        'Testa högerhandsregeln: tummen i strömmens riktning (ut ur/in i planet), pekfingret i fältets riktning — långfingret ger kraftens riktning. Byt sedan strömriktning i scenen och kontrollera att kraften vänder.':
            'Prøv høyrehåndsregelen: tommelen i retningen til strømmen (ut av eller inn i planet), pekefingeren i retningen til feltet. Da gir langfingeren retningen til kraften. Bytt så strømretning i scenen og kontroller at kraften snur.',

        // Förklaringsrutorna
        'Högerhandsregeln': 'Høyrehåndsregelen',
        'Samma högerhandsregel som för laddningar:': 'Samme høyrehåndsregel som for ladninger:',
        'tummen': 'tommelen',
        'är strömriktningen': 'er strømretningen',
        'pekfingret': 'pekefingeren',
        'magnetfältet': 'magnetfeltet',
        'och': 'og',
        'långfingret': 'langfingeren',
        'kraften': 'kraften',
        '. I en strömförande ledare är det de många ledningselektronernas magnetiska krafter som tillsammans ger kraften på hela ledaren.':
            '. I en strømførende leder er det de magnetiske kreftene på de mange ledningselektronene som til sammen gir kraften på hele lederen.',
        'Det resulterande fältet': 'Det resulterende feltet',
        'Ledaren befinner sig i två magnetfält samtidigt: det homogena fältet mellan polerna och sitt eget cirkulära fält. På ena sidan av ledaren samverkar fälten (tätare fältlinjer), på den andra motverkar de varandra (glesare). Kraften går åt det håll där det resulterande fältet är som':
            'Lederen befinner seg i to magnetfelt samtidig: det homogene feltet mellom polene og sitt eget sirkulære felt. På den ene siden av lederen forsterker feltene hverandre (tettere feltlinjer), på den andre motvirker de hverandre (glisnere). Kraften virker i den retningen der det resulterende feltet er',
        'svagast': 'svakest',
        '— det starka fältet "puttar" ledaren.': '(det sterke feltet «dytter» lederen).',
        'Två parallella ledare': 'To parallelle ledere',
        'Två strömförande ledare påverkar varandra, eftersom den ena ligger i den andras magnetfält:':
            'To strømførende ledere påvirker hverandre, fordi den ene ligger i magnetfeltet til den andre:',
        'med': 'med',
        '. Strömmar åt': '. Strømmer i',
        'samma håll': 'samme retning',
        'ger en attraherande kraft, motriktade strömmar en repellerande.': 'gir en tiltrekkende kraft, motsatt rettede strømmer en frastøtende.',

        // Var kommer formeln ifrån?
        'Var kommer formeln ifrån?': 'Hvor kommer formelen fra?',
        'Den magnetiska kraften på en enskild laddning är': 'Den magnetiske kraften på en enkelt ladning er',
        '. Under tiden Δ': '. I løpet av tiden Δ',
        'passerar laddningen': 'tilbakelegger ladningen',
        'en sträcka': 'en strekning',
        'av ledaren, med hastigheten': 'av lederen, med hastigheten',
        '. Sätter vi in detta får vi': '. Setter vi inn dette, får vi',
        '— tidsintervallet förkortas bort och kvar står kraften på hela ledarstycket.':
            '(tidsintervallet forkortes bort, og det som står igjen, er kraften på hele lederstykket).',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Kraften pekar längs fältlinjerna."': '«Kraften peker langs feltlinjene.»',
        'Nej — kraften är vinkelrät både mot fältet och mot strömmen. Det är därför den pekar uppåt eller nedåt i scenen fast fältet går i sidled.':
            'Nei. Kraften står vinkelrett både på feltet og på strømmen. Derfor peker den oppover eller nedover i scenen selv om feltet går sidelengs.',
        '"Ledaren måste röra sig för att påverkas."': '«Lederen må bevege seg for å bli påvirket.»',
        'Nej — ledaren ligger stilla. Det räcker att laddningarna': 'Nei. Lederen ligger i ro. Det holder at ladningene',
        'inuti': 'inni',
        'den rör sig, alltså att det går en ström.': 'den beveger seg, altså at det går en strøm.',
        '"En ledare parallell med fältet påverkas också."': '«En leder parallell med feltet påvirkes også.»',
        'Nej — då är strömmens riktning och fältets riktning inte vinkelräta, och kraften blir noll. Formeln':
            'Nei. Da står ikke strømretningen og feltretningen vinkelrett på hverandre, og kraften blir null. Formelen',
        'gäller när': 'gjelder når',
        'är vinkelrät mot ledaren.': 'står vinkelrett på lederen.'
    });
})();
