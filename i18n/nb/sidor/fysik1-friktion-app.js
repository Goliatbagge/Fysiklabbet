/* i18n/nb/sidor/fysik1-friktion-app.js — norska (bokmål) för simuleringen
 * Friktion. */
(function () {
    I18N.add({
        'Friktion — Fysiklabbet': 'Friksjon — Fysiklabbet',
        'Friktion — Fysik nivå 1': 'Friksjon — Fysikk nivå 1',
        'Statisk och dynamisk friktion mellan ytor.': 'Statisk og dynamisk friksjon mellom flater.',
        '/ Friktion': '/ Friksjon',
        'Friktion': 'Friksjon',

        // Ingress (delad runt inline-element)
        'Friktionskraften': 'Friksjonskraften',
        'motverkar rörelse mellan två ytor i kontakt. När du drar i lådan svarar friktionen med en':
            'motvirker bevegelse mellom to flater som er i kontakt. Når du drar i kassen, svarer friksjonen med en',
        'lika stor, motriktad': 'like stor, motsatt rettet',
        'kraft — lådan står still (': 'kraft, og kassen står stille (',
        'statisk friktion': 'statisk friksjon',
        '). Friktionen kan dock bara växa upp till ett maxvärde,': '). Friksjonen kan imidlertid bare vokse opp til en maksimalverdi,',
        '. När dragkraften överstiger det börjar lådan': '. Når trekkraften blir større enn denne, begynner kassen å',
        'glida': 'gli',
        ', och den resulterande kraften ger en acceleration enligt Newtons andra lag. Byt material för att se hur friktionstalet':
            ', og resultantkraften gir en akselerasjon etter Newtons andre lov. Bytt materiale for å se hvordan friksjonstallet',
        'ändrar allt.': 'endrer alt.',

        // Scenen
        'Lådan glider — glidfriktion': 'Kassen glir: glidefriksjon',
        'På gränsen — maximal friktion': 'På grensen: maksimal friksjon',
        'I vila — statisk friktion': 'I ro: statisk friksjon',
        '(åt höger)': '(mot høyre)',
        '(åt vänster)': '(mot venstre)',
        'Dra i reglaget': 'Dra i glidebryteren',
        'och se när lådan släpper. Luftmotstånd försummas.': 'og se når kassen løsner. Vi ser bort fra luftmotstanden.',

        // Inställningsrutan och panelen
        'Normalkraft & tyngdkraft': 'Normalkraft og tyngdekraft',
        'Resulterande kraft': 'Resultantkraft',
        'Material (μ)': 'Materiale (μ)',
        'Material — friktionstal': 'Materiale: friksjonstall',
        'Gummi mot asfalt (torr)': 'Gummi mot asfalt (tørr)',
        'Trä mot trä': 'Tre mot tre',
        'Is mot is': 'Is mot is',
        'Stål mot is': 'Stål mot is',
        'Kardborreband': 'Borrelås',
        'Lådans massa': 'Kassens masse',
        'Dragkraft': 'Trekkraft',
        'Avläsning': 'Avlesning',
        'normalkraft': 'normalkraft',
        'max friktion': 'maksimal friksjon',
        'friktion': 'friksjon',
        'nu': 'nå',
        'resulterande': 'resultantkraft',

        // Formelkortet
        'Maximal friktion': 'Maksimal friksjon',
        'Friktionstal': 'Friksjonstall',
        'Normalkraft': 'Normalkraft',

        // Grafen
        'Friktion mot pålagd kraft': 'Friksjon mot påført kraft',
        'börjar glida': 'begynner å gli',
        'pålagd kraft': 'påført kraft',
        'Friktionen följer dragkraften (': 'Friksjonen følger trekkraften (',
        ') tills den når': ') til den når',
        '. Därefter glider lådan och friktionen är konstant.': '. Deretter glir kassen, og friksjonen er konstant.',

        // Förklaringar
        'Statisk friktion': 'Statisk friksjon',
        'Så länge lådan står still ställer friktionen in sig precis lika stor som dragkraften, fast motriktad — den resulterande kraften är noll. Friktionen är alltså inte ett fast värde, utan växer med dragkraften upp till sitt maximum.':
            'Så lenge kassen står stille, tilpasser friksjonen seg slik at den blir nøyaktig like stor som trekkraften, men motsatt rettet. Resultantkraften er null. Friksjonen har altså ingen fast verdi, men vokser med trekkraften opp til sitt maksimum.',
        'Glidfriktion': 'Glidefriksjon',
        'När dragkraften överstiger': 'Når trekkraften blir større enn',
        'släpper lådan och glider. Då är friktionen konstant (': 'løsner kassen og glir. Da er friksjonen konstant (',
        '), och överskottet': '), og overskuddet',
        'ger accelerationen': 'gir akselerasjonen',
        '. I verkligheten är glidfriktionen oftast något mindre än den maximala statiska friktionen. Det är därför det rycker till när något lossnar.':
            '. I virkeligheten er glidefriksjonen som regel litt mindre enn den maksimale statiske friksjonen. Det er derfor det rykker til når noe løsner.',
        'Friktionstalet': 'Friksjonstallet',
        'beror på vilka material som glider mot varandra och saknar enhet. Stål mot is har mycket lågt':
            'avhenger av hvilke materialer som glir mot hverandre, og har ingen enhet. Stål mot is har svært lavt',
        '(skridskor!), medan kardborreband har': '(skøyter!), mens borrelås har',
        '> 1. Större': '> 1. Større',
        'betyder att det krävs större kraft för att få lådan att glida.': 'betyr at det trengs større kraft for å få kassen til å gli.',

        // Vanliga missuppfattningar
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '”Friktionen är alltid': '«Friksjonen er alltid',
        '.”': '.»',
        'Nej — det är': 'Nei, det er',
        'maxvärdet': 'maksimalverdien',
        '. När lådan står still är friktionen precis lika stor som dragkraften och kan vara mycket mindre än maxvärdet.':
            '. Når kassen står stille, er friksjonen nøyaktig like stor som trekkraften og kan være mye mindre enn maksimalverdien.',
        '”Tyngre föremål har större friktionstal.”': '«Tyngre gjenstander har større friksjonstall.»',
        'Nej —': 'Nei,',
        'beror bara på materialen. Däremot ökar den maximala friktionen med massan, eftersom normalkraften':
            'avhenger bare av materialene. Derimot øker den maksimale friksjonen med massen, fordi normalkraften',
        'blir större.': 'blir større.',
        '”Friktion finns bara när något rör sig.”': '«Friksjon finnes bare når noe beveger seg.»',
        'Nej — den statiska friktionen verkar även på föremål i vila och är just det som hindrar dem från att börja glida.':
            'Nei, den statiske friksjonen virker også på gjenstander i ro, og det er nettopp den som hindrer dem i å begynne å gli.',
        '”Statisk friktion och glidfriktion har samma friktionstal.”': '«Statisk friksjon og glidefriksjon har samme friksjonstall.»',
        'I verkligheten har de flesta materialpar två olika friktionstal, ett statiskt för vila och ett dynamiskt för glidning, och det statiska är oftast störst. Därför krävs det mer kraft att få i gång en glidning än att hålla den i gång. I Fysik nivå 1 förenklas det till ett gemensamt friktionstal':
            'I virkeligheten har de fleste materialpar to ulike friksjonstall, ett statisk for ro og ett dynamisk for gliding, og det statiske er som regel størst. Derfor trengs det mer kraft for å få i gang en gliding enn for å holde den i gang. I Fysikk nivå 1 forenkles dette til ett felles friksjonstall',
        ', och det är så simuleringen räknar.': ', og det er slik simuleringen regner.',
        '”Större kontaktyta ger mer friktion.”': '«Større kontaktflate gir mer friksjon.»',
        'Nej — i modellen': 'Nei, i modellen',
        'ingår bara normalkraften och friktionstalet, inte kontaktytans storlek. En låda ger lika stor friktion oavsett vilken sida den ligger på.':
            'inngår bare normalkraften og friksjonstallet, ikke hvor stor kontaktflaten er. En kasse gir like stor friksjon uansett hvilken side den ligger på.'
    });
})();
