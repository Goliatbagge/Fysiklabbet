/* i18n/nb/sidor/fysik2-induktion-app.js — norska (bokmål) för
 * simuleringen Induktion och inducerad spänning. */
(function () {
    I18N.add({
        'Induktion och inducerad spänning — Fysiklabbet': 'Induksjon og indusert spenning — Fysiklabbet',
        'Induktion och inducerad spänning — Fysik nivå 2': 'Induksjon og indusert spenning — Fysikk nivå 2',
        'Dra en ledare genom ett magnetfält och se den inducerade spänningen e = l · v · B uppstå — men bara medan ledaren rör sig! Elektronerna knuffas av den magnetiska kraften mot ena änden tills kraftjämvikt råder, ändarna laddas upp och polariteten byter håll när rörelsen vänder.':
            'Dra en leder gjennom et magnetfelt og se den induserte spenningen e = l · v · B oppstå, men bare mens lederen beveger seg! Elektronene skyves av den magnetiske kraften mot den ene enden til det er kraftlikevekt, endene lades opp, og polariteten skifter retning når bevegelsen snur.',
        '/ Induktion och inducerad spänning': '/ Induksjon og indusert spenning',
        'Induktion och inducerad spänning': 'Induksjon og indusert spenning',

        // Ingress
        'När en ledare rör sig i ett magnetfält påverkas ledningselektronerna av en magnetisk kraft som knuffar dem mot ena änden — det uppstår en':
            'Når en leder beveger seg i et magnetfelt, påvirkes ledningselektronene av en magnetisk kraft som skyver dem mot den ene enden. Det oppstår en',
        'inducerad spänning': 'indusert spenning',
        'ems': 'ems',
        ', mellan ledarens ändar. Dra i ledaren själv eller låt den röra sig automatiskt, och se att spänningen bara finns':
            ', mellom endene av lederen. Dra i lederen selv eller la den bevege seg automatisk, og se at spenningen bare finnes',
        'medan ledaren rör sig': 'mens lederen beveger seg',
        '. Vid vändningarna byter polariteten håll!': '. Ved vendingene skifter polariteten retning!',

        // Formelkortet
        'Inducerad spänning': 'Indusert spenning',
        'Ledarens längd': 'Lederens lengde',
        'Hastighet': 'Hastighet',
        'Flödestäthet': 'Flukstetthet',
        'gäller när': 'gjelder når',
        'och': 'og',
        'är vinkelräta mot varandra': 'står vinkelrett på hverandre',

        // Scenen och inställningsrutan
        '(in i planet)': '(inn i planet)',
        '(ut ur planet)': '(ut av planet)',
        'Ta tag i ledaren och dra den upp och ner': 'Ta tak i lederen og dra den opp og ned',
        'Magnetfältet': 'Magnetfeltet',
        'In i planet (kryss)': 'Inn i planet (kryss)',
        'Ut ur planet (prickar)': 'Ut av planet (prikker)',
        'Krafterna på en elektron': 'Kreftene på et elektron',
        'Laddningarna vid ändarna': 'Ladningene ved endene',

        // Reglage
        'Hastighet (': 'Hastighet (',
        'Fortare rörelse ⟹ större inducerad spänning (': 'Raskere bevegelse ⟹ større indusert spenning (',
        'Flödestäthet (': 'Flukstetthet (',
        'Starkare fält ⟹ större inducerad spänning.': 'Sterkere felt ⟹ større indusert spenning.',
        'Ledarens längd (': 'Lederens lengde (',
        'Längre ledare ⟹ större inducerad spänning.': 'Lengre leder ⟹ større indusert spenning.',

        // Beräkning och avläsning
        'Beräkning av inducerad spänning': 'Beregning av indusert spenning',
        'Beräkningen använder ledarens hastighet just nu — pausa eller håll ledaren stilla så blir spänningen 0.':
            'Beregningen bruker hastigheten til lederen akkurat nå. Sett på pause eller hold lederen i ro, så blir spenningen 0.',
        'Exempel 1 ur teorin (20 cm, 80 cm/s, 0,85 mT)': 'Eksempel 1 fra teorien (20 cm, 80 cm/s, 0,85 mT)',
        'Avläsning': 'Avlesning',
        'Hastighet just nu': 'Hastighet akkurat nå',
        'Testa: dra ledaren nedåt och titta på laddningarna — dra den sedan uppåt. Plus- och minusändarna byter plats, precis som galvanometerns utslag byter håll i demonstrationen.':
            'Prøv: dra lederen nedover og se på ladningene, og dra den deretter oppover. Pluss- og minusendene bytter plass, akkurat som utslaget på galvanometeret skifter retning i demonstrasjonen.',

        // Förklaringsrutor
        'Rörelse krävs': 'Bevegelse er nødvendig',
        'En ström induceras': 'En strøm induseres',
        'endast då magnet och ledare rör sig i förhållande till varandra': 'bare når magnet og leder beveger seg i forhold til hverandre',
        '. Står ledaren stilla i fältet händer ingenting — prova att pausa eller hålla ledaren stilla i simuleringen och se att spänningen blir 0.':
            '. Står lederen i ro i feltet, skjer det ingenting. Prøv å sette på pause eller holde lederen i ro i simuleringen, og se at spenningen blir 0.',
        'Varför laddas ändarna upp?': 'Hvorfor lades endene opp?',
        'När ledaren rör sig följer ledningselektronerna med — laddningar som rör sig i ett magnetfält påverkas av den magnetiska kraften':
            'Når lederen beveger seg, følger ledningselektronene med. Ladninger som beveger seg i et magnetfelt, påvirkes av den magnetiske kraften',
        '(högerhandsregeln; kom ihåg att elektronernas rörelse motsvarar en ström åt motsatt håll). Elektronerna samlas i ena änden, som blir negativ, medan den andra änden blir positiv.':
            '(høyrehåndsregelen; husk at bevegelsen til elektronene svarer til en strøm i motsatt retning). Elektronene samles i den ene enden, som blir negativ, mens den andre enden blir positiv.',
        'Kraftjämvikt': 'Kraftlikevekt',
        'Laddningsuppdelningen skapar ett elektriskt fält i ledaren som ger en motriktad elektrisk kraft':
            'Ladningsseparasjonen skaper et elektrisk felt i lederen som gir en motsatt rettet elektrisk kraft',
        'på elektronerna. Nästan omedelbart blir': 'på elektronene. Nesten umiddelbart blir',
        '— kraftjämvikt — och laddningsvandringen upphör. Det är i det läget spänningen är':
            '(kraftlikevekt), og ladningsvandringen stopper. Det er i denne tilstanden at spenningen er',
        'Varför just e = l · v · B?': 'Hvorfor akkurat e = l · v · B?',
        'Vid kraftjämvikt är': 'Ved kraftlikevekt er',
        ', alltså': ', altså',
        'där 𝔼 är den elektriska fältstyrkan i ledaren. Laddningen förkortas bort:':
            'der 𝔼 er den elektriske feltstyrken i lederen. Ladningen forkortes bort:',
        '. Fältstyrkan i ledaren är spänningen per längd,': '. Feltstyrken i lederen er spenningen per lengde, så vi har',
        '— och löser vi ut': 'og dermed for',
        'får vi': 'uttrykket',
        '. Formeln gäller när': '. Formelen gjelder når',
        'är vinkelräta mot varandra.': 'står vinkelrett på hverandre.',
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Det räcker att ledaren är i ett starkt magnetfält."': '«Det holder at lederen er i et sterkt magnetfelt.»',
        'Nej — utan relativ rörelse induceras ingen spänning alls. En magnet som ligger stilla i en spole ger inget utslag på galvanometern.':
            'Nei, uten relativ bevegelse induseres det ingen spenning i det hele tatt. En magnet som ligger i ro i en spole, gir ikke noe utslag på galvanometeret.',
        '"Det spelar ingen roll åt vilket håll ledaren rör sig."': '«Det spiller ingen rolle hvilken vei lederen beveger seg.»',
        'Riktningen avgör polariteten: byter rörelsen håll byter plus- och minusändarna plats. Rör sig ledaren längs sin egen riktning induceras ingen spänning alls (elektronerna trycks då inte tvärs över ledaren).':
            'Retningen avgjør polariteten: skifter bevegelsen retning, bytter pluss- og minusendene plass. Beveger lederen seg langs sin egen retning, induseres det ingen spenning i det hele tatt (elektronene skyves da ikke på tvers av lederen).',
        '"Den inducerade spänningen växer så länge ledaren rör sig."': '«Den induserte spenningen vokser så lenge lederen beveger seg.»',
        'Nej — kraftjämvikten ställer in sig nästan omedelbart, och vid konstant fart är spänningen konstant:':
            'Nei, kraftlikevekten innstiller seg nesten umiddelbart, og ved konstant fart er spenningen konstant:'
    });
})();
