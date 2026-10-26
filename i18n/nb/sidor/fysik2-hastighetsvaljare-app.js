/* i18n/nb/sidor/fysik2-hastighetsvaljare-app.js — norska (bokmål) för
 * simuleringen Hastighetsväljare och masspektrometer. */
(function () {
    I18N.add({
        'Hastighetsväljare och masspektrometer — Fysiklabbet': 'Hastighetsvelger og massespektrometer — Fysiklabbet',
        'Hastighetsväljare och masspektrometer — Fysik nivå 2': 'Hastighetsvelger og massespektrometer — Fysikk nivå 2',
        'Partiklar med olika fart skjuts in mellan två laddade plattor — bara de med hastigheten v = 𝔼/B går rakt fram genom hålet, resten sorteras bort. På andra sidan böjer magnetfältet partikeln i en halvcirkel mot en fotografisk plåt, och ur banradien vägs partikeln (m = q · B · r/v). Prova elektron, proton, deuteron och alfapartikel.':
            'Partikler med ulik fart skytes inn mellom to ladde plater. Bare de med hastigheten v = 𝔼/B går rett fram gjennom hullet, resten sorteres bort. På den andre siden bøyer magnetfeltet partikkelen i en halvsirkel mot en fotografisk plate, og ut fra baneradien veies partikkelen (m = q · B · r/v). Prøv elektron, proton, deuteron og alfapartikkel.',
        '/ Hastighetsväljare och masspektrometer': '/ Hastighetsvelger og massespektrometer',
        'Hastighetsväljare och masspektrometer': 'Hastighetsvelger og massespektrometer',

        // Ingressen (delad runt inline-element)
        'Laddade partiklar skjuts in mellan två laddade plattor, där ett elektriskt fält 𝔼 och ett magnetiskt fält':
            'Ladde partikler skytes inn mellom to ladde plater, der et elektrisk felt 𝔼 og et magnetfelt',
        'drar åt varsitt håll. Bara partiklar med exakt hastigheten': 'drar hver sin vei. Bare partikler med nøyaktig hastigheten',
        'går rakt fram genom hålet — resten sorteras bort. På andra sidan finns bara magnetfältet kvar: partikeln böjs i en halvcirkel och träffar en fotografisk plåt. Ur banradien':
            'går rett fram gjennom hullet. Resten sorteres bort. På den andre siden er bare magnetfeltet igjen: partikkelen bøyes i en halvsirkel og treffer en fotografisk plate. Ut fra baneradien',
        'kan partikeln': 'kan partikkelen',
        'vägas': 'veies',

        // Formelkortet
        'Hastighet': 'Hastighet',
        'Elektriskt fält': 'Elektrisk felt',
        'Flödestäthet': 'Flukstetthet',
        'Massa': 'Masse',
        'Laddning · flödestäthet · radie': 'Ladning · flukstetthet · radius',
        'väljaren:': 'i velgeren:',
        '— spektrometern:': 'og i spektrometeret:',

        // Scenen
        'elektronkanon': 'elektronkanon',
        'jonkälla': 'ionekilde',
        'fotografisk plåt': 'fotografisk plate',
        'skala i spektrometern': 'skala i spektrometeret',
        'Utvald hastighet': 'Utvalgt hastighet',
        'Banradie': 'Baneradius',
        'Uppmätt massa': 'Målt masse',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Partikel': 'Partikkel',
        'Elektron': 'Elektron',
        'Proton': 'Proton',
        'Deuteron': 'Deuteron',
        'Alfapartikel': 'Alfapartikkel',
        'Krafterna och hastigheten': 'Kreftene og hastigheten',
        'Banradien': 'Baneradien',
        'Elektriskt fält (𝔼)': 'Elektrisk felt (𝔼)',
        'Flödestäthet (': 'Flukstetthet (',

        // Sidopanelen
        'Starkare 𝔼 ⟹ högre utvald hastighet (': 'Sterkere 𝔼 ⟹ høyere utvalgt hastighet (',
        'Starkare': 'Sterkere',
        '⟹ lägre utvald hastighet och mindre banradie.': '⟹ lavere utvalgt hastighet og mindre baneradius.',
        'Beräkning': 'Beregning',
        '(spektrometern "väger" partikeln)': '(spektrometeret «veier» partikkelen)',
        'Avläsning': 'Avlesning',
        'Elektriskt fält 𝔼': 'Elektrisk felt 𝔼',
        'Titta på partiklarna i väljaren: de för snabba böjs av åt magnetkraftens håll (':
            'Se på partiklene i velgeren: de som er for raske, bøyes av i retningen til den magnetiske kraften (',
        'växer med farten), de för långsamma åt elkraftens håll. Bara de med':
            'vokser med farten), og de som er for langsomme, bøyes av i retningen til den elektriske kraften. Bare de med',
        'går rakt.': 'går rett fram.',

        // Så väljs hastigheten
        'Så väljs hastigheten': 'Slik velges hastigheten',
        'I väljaren verkar två krafter på partikeln: den elektriska kraften': 'I velgeren virker to krefter på partikkelen: den elektriske kraften',
        'och den magnetiska kraften': 'og den magnetiske kraften',
        ', riktade åt varsitt håll. De är exakt lika stora när': ', rettet hver sin vei. De er nøyaktig like store når',
        ', alltså när': ', altså når',
        '. Laddningen': '. Ladningen',
        'förkortas bort — väljaren fungerar likadant för alla laddade partiklar.': 'forkortes bort, så velgeren virker likt for alle ladde partikler.',

        // Så vägs partikeln
        'Så vägs partikeln': 'Slik veies partikkelen',
        'Efter hålet finns bara magnetfältet kvar. Den magnetiska kraften är alltid vinkelrät mot rörelsen och blir en centripetalkraft:':
            'Etter hullet er bare magnetfeltet igjen. Den magnetiske kraften står alltid vinkelrett på bevegelsen og blir en sentripetalkraft:',
        '. Den fotografiska plåten registrerar träffen på avståndet 2': '. Den fotografiske platen registrerer treffet i avstanden 2',
        'från hålet — och med känt': 'fra hullet, og med kjent',
        'ger det massan': 'gir det massen',

        // Deuteron eller alfapartikel?
        'Deuteron eller alfapartikel?': 'Deuteron eller alfapartikkel?',
        'Prova deuteronen (massan 2 u, laddningen +e) och alfapartikeln (massan 4 u, laddningen +2e): de får':
            'Prøv deuteronet (massen 2 u, ladningen +e) og alfapartikkelen (massen 4 u, ladningen +2e): de får',
        'samma banradie': 'samme baneradius',
        '! Radien beror på kvoten': '! Radien avhenger av forholdet',
        ', inte på massan ensam. En masspektrometer mäter alltså egentligen massa per laddning — därför behöver man veta partikelns laddning för att få fram massan.':
            ', ikke av massen alene. Et massespektrometer måler altså egentlig masse per ladning. Derfor må man kjenne ladningen til partikkelen for å finne massen.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Snabbare partiklar böjs mer i magnetfältet."': '«Raskere partikler bøyes mer i magnetfeltet.»',
        'Tvärtom — banradien': 'Tvert imot: baneradien',
        ') växer med farten. En snabbare partikel går i en': ') vokser med farten. En raskere partikkel går i en',
        'större': 'større',
        'cirkel.': 'sirkel.',
        '"Hastighetsväljaren ger partiklarna rätt fart."': '«Hastighetsvelgeren gir partiklene riktig fart.»',
        'Nej — den ändrar inte farten på dem som passerar, den': 'Nei, den endrer ikke farten til dem som passerer. Den',
        'sorterar bort': 'sorterer bort',
        'alla som inte redan har farten': 'alle som ikke allerede har farten',
        '. De krockar med plattorna.': '. De kolliderer med platene.',
        '"Magnetkraften bromsar partikeln i spektrometern."': '«Den magnetiske kraften bremser partikkelen i spektrometeret.»',
        'Nej — kraften är alltid vinkelrät mot hastigheten och uträttar inget arbete. Farten är konstant; bara riktningen ändras.':
            'Nei, kraften står alltid vinkelrett på hastigheten og utfører ikke noe arbeid. Farten er konstant, bare retningen endres.'
    });
})();
