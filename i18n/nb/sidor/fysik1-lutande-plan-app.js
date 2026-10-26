/* i18n/nb/sidor/fysik1-lutande-plan-app.js — norska (bokmål) för
 * simuleringen Lutande plan. */
(function () {
    I18N.add({
        'Lutande plan — Fysiklabbet': 'Skråplan — Fysiklabbet',
        'Lutande plan — Fysik nivå 1': 'Skråplan — Fysikk nivå 1',
        'Låda (med friktion) och vagn (utan energiförluster) på ett lutande plan. Justera vinkel, massa och friktionstal, dela upp tyngdkraften i komposanter och se när lådan börjar glida.':
            'Kasse (med friksjon) og vogn (uten energitap) på et skråplan. Juster vinkel, masse og friksjonstall, del opp tyngdekraften i komponenter og se når kassen begynner å gli.',
        '/ Lutande plan': '/ Skråplan',
        'Lutande plan': 'Skråplan',

        // Ingressen (delad runt inline-element)
        'På ett lutande plan delas tyngdkraften upp i två komposanter: en': 'På et skråplan deles tyngdekraften opp i to komponenter: én',
        'parallell': 'parallell',
        'med planet som drar föremålet nedför (': 'med planet som trekker gjenstanden nedover (',
        '), och en': '), og én',
        'vinkelrät': 'vinkelrett',
        'mot planet (': 'på planet (',
        ') som balanseras av normalkraften': ') som balanseres av normalkraften',
        '. En': '. En',
        'vagn': 'vogn',
        'rullar fritt (inga energiförluster) medan en': 'ruller fritt (uten energitap), mens en',
        'låda': 'kasse',
        'hålls kvar av friktionen — ända tills lutningen blir så brant att drivkraften nedför överstiger den maximala friktionen. Öka vinkeln':
            'holdes på plass av friksjonen helt til helningen blir så bratt at drivkraften nedover blir større enn den maksimale friksjonen. Øk vinkelen',
        'och se när lådan släpper.': 'og se når kassen begynner å gli.',

        // Formelkortet
        'Komposant nedför': 'Komponent nedover',
        'Massa': 'Masse',
        'Tyngdfaktor': 'Tyngdeakselerasjon',
        'sin lutningsvinkel': 'sin helningsvinkel',

        // Scenen
        'Vågrätt — vagnen står still': 'Vannrett: vognen står stille',
        'Vagnen rullar fritt nedför — inga energiförluster': 'Vognen ruller fritt nedover uten energitap',
        'Lådan glider — glidfriktion': 'Kassen glir: glidefriksjon',
        'På gränsen — maximal statisk friktion': 'På grensen: maksimal statisk friksjon',
        'I vila — statisk friktion håller emot': 'I ro: statisk friksjon holder igjen',
        'Dra det översta hörnet för att ändra lutningen': 'Dra det øverste hjørnet for å endre helningen',
        '. Luftmotstånd försummas.': '. Vi ser bort fra luftmotstand.',

        // Inställningsrutan och reglagen
        'Krafter': 'Krefter',
        'Dela upp tyngdkraften': 'Del opp tyngdekraften',
        'Acceleration': 'Akselerasjon',
        'Objekt': 'Objekt',
        'Låda (med friktion)': 'Kasse (med friksjon)',
        'Vagn (inga energiförluster)': 'Vogn (uten energitap)',
        'Vy': 'Visning',
        'Spegelvänd': 'Speilvend',
        'Lutningsvinkel': 'Helningsvinkel',
        'Friktionstal': 'Friksjonstall',
        'Skriv in värde': 'Skriv inn verdi',
        'Objekt på planet': 'Objekt på planet',
        'Vagn': 'Vogn',
        'inga energiförluster': 'uten energitap',
        'Låda': 'Kasse',
        'med friktion': 'med friksjon',
        'Visa i scenen': 'Vis i scenen',
        'Komposanter': 'Komponenter',
        'Avläsning': 'Avlesning',
        'nedför': 'nedover',
        'normal': 'normal',
        'friktion': 'friksjon',
        'accel. (m/s²)': 'aksel. (m/s²)',

        // Diagrammet
        'Drivkraft & maxfriktion mot vinkeln': 'Drivkraft og maksimal friksjon som funksjon av vinkelen',
        'glider →': 'glir →',
        'lutningsvinkel': 'helningsvinkel',
        'kraft (N)': 'kraft (N)',
        'Drivkraften nedför (': 'Drivkraften nedover (',
        ') växer med vinkeln,': ') øker med vinkelen,',
        'medan maxfriktionen (': 'mens den maksimale friksjonen (',
        ') avtar. Där de korsas (tan': ') avtar. Der de krysser hverandre (tan',
        ') börjar lådan glida.': ') begynner kassen å gli.',
        'och vagnen, som rullar utan energiförluster, kommer i rörelse vid minsta lutning.':
            'og vognen, som ruller uten energitap, kommer i bevegelse ved minste helning.',

        // Förklaringskorten
        'Tyngdkraften delas upp': 'Tyngdekraften deles opp',
        'Tyngdkraften': 'Tyngdekraften',
        'pekar alltid rakt ned. På planet är det praktiskt att dela upp den i en komposant':
            'peker alltid rett ned. På planet er det praktisk å dele den opp i én komponent',
        'längs': 'langs',
        'planet (': 'planet (',
        ') och en': ') og én',
        '). Bara den parallella komposanten kan sätta föremålet i rörelse.': '). Bare den parallelle komponenten kan sette gjenstanden i bevegelse.',
        'Vagn utan energiförluster': 'Vogn uten energitap',
        'Vagnens lätta hjul rullar utan energiförluster, så inget bromsar vagnen: den accelererar nedför så fort planet lutar. Accelerationen blir':
            'Vognens lette hjul ruller uten energitap, så ingenting bremser vognen: den akselererer nedover så snart planet har en helning. Akselerasjonen blir',
        ', oberoende av massan: en tung och en lätt vagn rullar lika fort.': ', uavhengig av massen: en tung og en lett vogn ruller like fort.',
        'Låda med friktion': 'Kasse med friksjon',
        'Friktionen håller lådan kvar så länge': 'Friksjonen holder kassen på plass så lenge',
        '. Vid gränsen gäller tan': '. Ved grensen gjelder tan',
        '. Därefter glider lådan med accelerationen': '. Deretter glir kassen med akselerasjonen',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”Normalkraften är lika med tyngdkraften.”': '«Normalkraften er lik tyngdekraften.»',
        'Nej — på ett lutande plan balanserar normalkraften bara den vinkelräta komposanten:':
            'Nei. På et skråplan balanserer normalkraften bare den vinkelrette komponenten:',
        ', alltså mindre än': ', altså mindre enn',
        '”Tyngre föremål glider lättare.”': '«Tyngre gjenstander glir lettere.»',
        'Nej — gränsen för glidning beror bara på vinkeln och friktionstalet (tan': 'Nei. Grensen for gliding avhenger bare av vinkelen og friksjonstallet (tan',
        '), inte på massan. Både drivkraften och maxfriktionen är proportionella mot': '), ikke av massen. Både drivkraften og den maksimale friksjonen er proporsjonale med',
        ', så massan ”stryks bort”.': ', så massen «forkortes bort».',
        '”En tung vagn rullar fortare nedför.”': '«En tung vogn ruller fortere nedover.»',
        'Nej — när inget bromsar är accelerationen': 'Nei. Når ingenting bremser, er akselerasjonen',
        'för alla massor. Massan påverkar kraften, men inte accelerationen.': 'for alle masser. Massen påvirker kraften, men ikke akselerasjonen.',
        '”Vagnen rullar utan friktion.”': '«Vognen ruller uten friksjon.»',
        'Rullning': 'Rulling',
        'kräver': 'krever',
        'faktiskt friktion: det är den statiska friktionen mellan hjul och underlag som får hjulen att snurra. Den uträttar dock inget arbete, så det rätta idealfallet är en vagn':
            'faktisk friksjon: det er den statiske friksjonen mellom hjul og underlag som får hjulene til å rulle. Den utfører likevel ikke noe arbeid, så det riktige idealtilfellet er en vogn',
        'utan energiförluster': 'uten energitap',
        '”Friktionen är alltid': '«Friksjonen er alltid',
        '.”': '.»',
        'Nej — det är maxvärdet. Står lådan still är friktionen precis lika stor som drivkraften nedför, och kan vara mindre.':
            'Nei, det er maksimalverdien. Når kassen står stille, er friksjonen nøyaktig like stor som drivkraften nedover, og den kan være mindre.',
        '”Lådan glider med samma friktionstal som höll den kvar.”': '«Kassen glir med det samme friksjonstallet som holdt den på plass.»',
        'I verkligheten har de flesta materialpar två friktionstal, ett statiskt för vila och ett dynamiskt för glidning, och det statiska är oftast störst. Här räknar vi, som i kursen, med ett gemensamt':
            'I virkeligheten har de fleste materialpar to friksjonstall, ett statisk for ro og ett dynamisk for gliding, og det statiske er som regel størst. Her regner vi, som i kurset, med et felles'
    });
})();
