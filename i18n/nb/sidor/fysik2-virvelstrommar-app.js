/* i18n/nb/sidor/fysik2-virvelstrommar-app.js — norska (bokmål) för
 * simuleringen Virvelströmmar. Löptexten är delad i textnoder runt
 * <em>/<strong>, en nyckel per textnod. */
(function () {
    I18N.add({
        // Sidhuvud och metadata
        'Virvelströmmar — Fysiklabbet': 'Virvelstrømmer — Fysiklabbet',
        'Virvelströmmar — Fysik nivå 2': 'Virvelstrømmer — Fysikk nivå 2',
        'En aluminiumpendel svänger genom ett magnetfält och bromsas in av inducerade virvelströmmar — enligt Lenz lag motverkar de alltid sin orsak. Justera flödestätheten, slå av elektromagneten mitt i svängningen och byt till en platta med spår för att se bromsningen nästan försvinna. Rörelseenergin blir värme, precis som i en induktionshäll.':
            'En aluminiumspendel svinger gjennom et magnetfelt og bremses opp av induserte virvelstrømmer. Ifølge Lenz’ lov motvirker de alltid årsaken sin. Juster flukstettheten, slå av elektromagneten midt i svingningen og bytt til en plate med spor for å se bremsingen nesten forsvinne. Den kinetiske energien blir til varme, akkurat som i en induksjonstopp.',
        '/ Virvelströmmar': '/ Virvelstrømmer',
        'Virvelströmmar': 'Virvelstrømmer',
        // Avsnittsraden (simuleringarnas namn)
        'Virvelströmmar i en pendel': 'Virvelstrømmer i en pendel',
        'Magneten i kopparröret': 'Magneten i kobberrøret',

        // Ingressen
        'En aluminiumpendel svänger fram och tillbaka genom ett magnetfält. När plattan rör sig i fältet induceras cirkulerande strömmar —':
            'En aluminiumspendel svinger frem og tilbake gjennom et magnetfelt. Når platen beveger seg i feltet, induseres det sirkulerende strømmer. Slike',
        'virvelströmmar': 'virvelstrømmer',
        '— som enligt Lenz lag motverkar rörelsen: pendeln bromsas in och stannar. Slå av elektromagneten och pendeln svänger fritt igen. Byt till plattan med spår och se att bromsningen blir mycket svagare.':
            'motvirker ifølge Lenz’ lov bevegelsen: pendelen bremses opp og stopper. Slå av elektromagneten, så svinger pendelen fritt igjen. Bytt til platen med spor og se at bremsingen blir mye svakere.',

        // Principkortet
        'Lenz lag': 'Lenz’ lov',
        'De inducerade strömmarna får alltid en sådan riktning att de': 'De induserte strømmene får alltid en slik retning at de',
        'motverkar orsaken': 'motvirker årsaken',
        'till sin uppkomst.': 'til at de oppstår.',
        'Cirkulerande strömmar som motverkar rörelse eller ändring av magnetfält kallas': 'Sirkulerende strømmer som motvirker bevegelse eller endring av magnetfelt, kalles',

        // Scenen och inställningsrutan
        'elektromagnetens fält (in i planet)': 'feltet fra elektromagneten (inn i planet)',
        'Pendelplatta': 'Pendelplate',
        'Hel platta': 'Hel plate',
        'Platta med spår': 'Plate med spor',
        'Magnetfält': 'Magnetfelt',
        'Elektromagneten på': 'Elektromagneten på',
        'Virvelströmmarna': 'Virvelstrømmene',
        'Bromsande kraften': 'Bremsekraften',
        'Hastigheten': 'Hastigheten',
        'Släpp pendeln': 'Slipp pendelen',
        'Plattans fart': 'Platens fart',
        'Utslag': 'Utslag',

        // Reglagen
        'Flödestäthet (': 'Flukstetthet (',
        'Startvinkel': 'Startvinkel',
        'Bromsningen växer snabbt med fältet (dubbelt': 'Bremsingen øker raskt med feltet (dobbelt',
        '⟹ fyra gånger så stark broms).': '⟹ fire ganger så sterk brems).',
        'Vinkeln pendeln släpps ifrån.': 'Vinkelen pendelen slippes fra.',

        // Avläsningen
        'Avläsning': 'Avlesning',
        'Flödestäthet': 'Flukstetthet',
        'Platta': 'Plate',
        'med spår': 'med spor',
        'hel': 'hel',
        'Prova: släpp pendeln med magneten avstängd och slå på den mitt i svängningen — pendeln fastnar nästan direkt när plattan är i fältet. Rörelseenergin blir värme i plattan.':
            'Prøv: slipp pendelen med magneten slått av, og slå den på midt i svingningen. Pendelen stopper nesten med en gang når platen er i feltet. Den kinetiske energien blir til varme i platen.',

        // Därför bromsas pendeln
        'Därför bromsas pendeln': 'Derfor bremses pendelen',
        'När plattan rör sig genom fältet ändras det magnetiska flödet genom olika delar av plattan, och strömmar induceras. Strömmarna som befinner sig i magnetfältet blir enligt högerhandsregeln uppåtriktade, och kraften på dem blir':
            'Når platen beveger seg gjennom feltet, endres den magnetiske fluksen gjennom ulike deler av platen, og det induseres strømmer. Strømmene som befinner seg i magnetfeltet, blir ifølge høyrehåndsregelen rettet oppover, og kraften på dem blir',
        'motriktad rörelsen': 'motsatt bevegelsesretningen',
        '. Utanför fältet sluter sig strömmarna fritt i "virvlar" — därav namnet virvelströmmar.': '. Utenfor feltet lukker strømmene seg fritt i «virvler», derav navnet virvelstrømmer.',

        // Därför hjälper spåren
        'Därför hjälper spåren': 'Derfor hjelper sporene',
        'I plattan med spår kan virvelströmmarna inte virvla lika fritt — spåren skär av strömbanorna så att bara små strömslingor får plats. Mindre strömmar ger mindre bromsande kraft. Samma knep används åt andra hållet i transformatorer: järnkärnan byggs av tunna, isolerade plåtar (lameller) just för att':
            'I platen med spor kan ikke virvelstrømmene virvle like fritt. Sporene skjærer over strømbanene, slik at bare små strømsløyfer får plass. Mindre strømmer gir mindre bremsekraft. Det samme trikset brukes omvendt i transformatorer: jernkjernen bygges av tynne, isolerte plater (lameller) nettopp for å',
        'hindra': 'hindre',
        'oönskade virvelströmmar.': 'uønskede virvelstrømmer.',

        // Önskade och oönskade
        'Önskade och oönskade': 'Ønskede og uønskede',
        'Önskade virvelströmmar': 'Ønskede virvelstrømmer',
        'utnyttjas i induktionsspisar (värmer kokkärlets botten) och i magnetbromsar, till exempel vid "fritt fall"-åkattraktioner på nöjesparker — bromsen fungerar utan kontakt och kan aldrig "släppa".':
            'utnyttes i induksjonstopper (varmer opp bunnen av kokekaret) og i magnetbremser, for eksempel i fritt fall-attraksjoner i fornøyelsesparker. Bremsen virker uten kontakt og kan aldri «slippe».',
        'Oönskade virvelströmmar': 'Uønskede virvelstrømmer',
        'finns i växelströmsapparater och ger förluster i form av värme.': 'finnes i vekselstrømsapparater og gir tap i form av varme.',

        // Så fungerar en induktionshäll
        'Så fungerar en induktionshäll': 'Slik fungerer en induksjonstopp',
        'Växelström genom en kopparspole': 'Vekselstrøm gjennom en kobberspole',
        'i hällen skapar ett växlande magnetfält. Vägguttagets 50 Hz räcker inte — frekvensen ökas först nästan 1 000 gånger, till närmare 50 kHz.':
            'i koketoppen skaper et vekslende magnetfelt. De 50 Hz fra stikkontakten er ikke nok, så frekvensen økes først nesten 1 000 ganger, til nærmere 50 kHz.',
        'En kastrull ställs på hällen.': 'En kjele settes på koketoppen.',
        'Svängningarna i magnetfältet inducerar virvelströmmar i kokkärlets botten. För att det ska fungera måste metallen "känna av" svängningarna — alltså vara magnetisk.':
            'Svingningene i magnetfeltet induserer virvelstrømmer i bunnen av kokekaret. For at det skal fungere, må metallet «merke» svingningene, altså være magnetisk.',
        'På grund av den så kallade': 'På grunn av den såkalte',
        'skinneffekten': 'skinneffekten',
        'koncentreras virvelströmmarna till ett tunt skikt nära metallens yta. Då ökar det elektriska motståndet, vilket leder till värmeutveckling.':
            'konsentreres virvelstrømmene i et tynt sjikt nær overflaten av metallet. Da øker den elektriske resistansen, noe som fører til varmeutvikling.',
        'Magnetisk hysteres': 'Magnetisk hysterese',
        ', ett slags magnetisk tröghet, bidrar också: varje svängning i fältet ändrar kokkärlets magnetisering, och trögheten i materialet gör att den snabba förändringen alstrar värme.':
            ', en slags magnetisk treghet, bidrar også: hver svingning i feltet endrer magnetiseringen av kokekaret, og tregheten i materialet gjør at den raske endringen utvikler varme.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Magneten attraherar aluminiumet."': '«Magneten tiltrekker aluminiumet.»',
        'Nej — aluminium är omagnetiskt och dras inte mot en stillastående magnet. Bromskraften uppstår bara när plattan':
            'Nei. Aluminium er umagnetisk og trekkes ikke mot en magnet som står i ro. Bremsekraften oppstår bare når platen',
        'rör sig': 'beveger seg',
        'i fältet, och den är alltid motriktad rörelsen (åt båda hållen).': 'i feltet, og den virker alltid mot bevegelsen (i begge retninger).',
        '"Energin försvinner."': '«Energien forsvinner.»',
        'Nej — pendelns rörelseenergi omvandlas via virvelströmmarna till värme i plattan. Det är exakt så en induktionshäll värmer kastrullen.':
            'Nei. Den kinetiske energien til pendelen omdannes via virvelstrømmene til varme i platen. Det er nøyaktig slik en induksjonstopp varmer opp kjelen.',
        '"Spåren gör plattan lättare, därför svänger den längre."': '«Sporene gjør platen lettere, derfor svinger den lenger.»',
        'Nej — det är inte massan som avgör, utan att spåren skär av strömbanorna så att virvelströmmarna (och därmed bromskraften) blir små.':
            'Nei. Det er ikke massen som avgjør, men at sporene skjærer over strømbanene, slik at virvelstrømmene (og dermed bremsekraften) blir små.'
    });
})();
