/* i18n/nb/sidor/fysik2-pendel-app.js — norska (bokmål) för simuleringen
 * Plan matematisk pendel. JSX-texten är delad runt <em>/<sub>, så många
 * nycklar är fragment av en mening. Återkopplingen i gissa-läget och
 * försökstexterna översätts med I18N.t (tr) i koden. */
(function () {
    I18N.add({
        // Sidhuvud och delning
        'Plan matematisk pendel — Fysiklabbet': 'Plan matematisk pendel — Fysiklabbet',
        'Plan matematisk pendel — Fysik nivå 2': 'Plan matematisk pendel — Fysikk nivå 2',
        'Mät pendelns periodtid med en ljusgrind, lägg mätpunkterna i ett diagram och läs av tyngdaccelerationen ur lutningen. Prova olika längder, massor och utslag, flytta pendeln till Månen eller gissa vilken okänd planet den hänger på.':
            'Mål perioden til pendelen med en lysport, legg målepunktene inn i et diagram og les av tyngdeakselerasjonen fra stigningstallet. Prøv ulike lengder, masser og utslag, flytt pendelen til Månen eller gjett hvilken ukjent planet den henger på.',
        '/ Plan matematisk pendel': '/ Plan matematisk pendel',
        'Plan matematisk pendel': 'Plan matematisk pendel',

        // Ingressen
        'En liten kula i ett tunt snöre svänger fram och tillbaka. Dra i kulan för att välja utslag och släpp. Ljusgrinden vid jämviktsläget mäter tiden för tio svängningar, och du lägger mätpunkten i diagrammet. Ändra pendelns längd och mät igen: i diagrammet över':
            'En liten kule i en tynn snor svinger fram og tilbake. Dra i kulen for å velge utslag, og slipp. Lysporten ved likevektsstillingen måler tiden for ti svingninger, og du legger målepunktet inn i diagrammet. Endre lengden på pendelen og mål på nytt: i diagrammet med',
        '² mot': '² mot',
        'hamnar punkterna på en rät linje genom origo, och linjens lutning är 4π²/':
            'havner punktene på en rett linje gjennom origo, og stigningstallet til linjen er 4π²/',
        '. Flytta pendeln till Månen, jämför två pendlar eller gissa vilken okänd planet den hänger på.':
            '. Flytt pendelen til Månen, sammenlign to pendler eller gjett hvilken ukjent planet den henger på.',

        // Formelkortet
        'Periodtid': 'Periode',
        'Pendellängd': 'Pendellengde',
        'Tyngdacceleration': 'Tyngdeakselerasjon',

        // Vyväxlaren
        'Vy: 2D, 3D eller pendelvågen': 'Visning: 2D, 3D eller pendelbølgen',
        'Samma pendel i 3D, med krafterna': 'Samme pendel i 3D, med kreftene',
        'Femton pendlar som bildar en våg': 'Femten pendler som danner en bølge',
        'Pendelvågen i 3D': 'Pendelbølgen i 3D',

        // Scenen
        'Ljusgrind': 'Lysport',
        'Tidtagare': 'Tidtaker',
        'Dra i kulan för att välja utslag. Pendeln startar när du släpper.':
            'Dra i kulen for å velge utslag. Pendelen starter når du slipper.',

        // Styrknapparna
        'Släpp pendeln': 'Slipp pendelen',
        'Stega bakåt': 'Gå et steg tilbake',
        'Stega bakåt 0,02 s': 'Gå 0,02 s tilbake',
        'Stega framåt': 'Gå et steg frem',
        'Stega framåt 0,02 s': 'Gå 0,02 s frem',

        // Inställningsrutan
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Krafter': 'Krefter',
        'Formelns kurva': 'Kurven fra formelen',
        'Vinkel': 'Vinkel',
        'Gradskiva': 'Gradskive',
        'Linjal': 'Linjal',
        'Jämförelsependel B': 'Sammenligningspendel B',
        'Svängning': 'Svingning',
        'Odämpad': 'Udempet',
        'Dämpad': 'Dempet',
        'Tidsförlopp': 'Tidsforløp',
        'Långsamt (¼×)': 'Sakte (¼×)',
        'Normalt': 'Normalt',
        'Snabbt (4×)': 'Raskt (4×)',
        'Långsamt': 'Sakte',
        'Snabbt': 'Raskt',
        'Läge': 'Modus',
        'Fritt laboratorium': 'Fritt laboratorium',
        'Okänd planet': 'Ukjent planet',
        'Plats': 'Sted',
        'Färdigt försök': 'Ferdig forsøk',
        'Välj försök': 'Velg forsøk',
        'Färdiga försök': 'Ferdige forsøk',

        // Platser
        'Månen': 'Månen',
        'Mars': 'Mars',
        'Jorden': 'Jorden',
        'Jupiter': 'Jupiter',
        'Valfri': 'Valgfri',
        'Pluto': 'Pluto',

        // Reglagen
        'Utslag': 'Utslag',
        'Massa': 'Masse',
        'Skriv in värde': 'Skriv inn verdi',
        'Pausa och stega fram eller tillbaka med knapparna under scenen. Ändrar du längd, utslag eller plats återgår pendeln till startläget. Massan påverkar inte rörelsen. Väljer du dämpad svängning bromsas pendeln av luftmotståndet, och utslaget avtar för varje svängning.':
            'Sett på pause og gå steg for steg frem eller tilbake med knappene under scenen. Endrer du lengde, utslag eller sted, går pendelen tilbake til startstillingen. Massen påvirker ikke bevegelsen. Velger du dempet svingning, bremses pendelen av luftmotstanden, og utslaget avtar for hver svingning.',

        // Färdiga försök
        'Samma längd, olika massa': 'Samme lengde, ulik masse',
        'Fyrdubbla längden': 'Firedoble lengden',
        'Sekundpendeln': 'Sekundpendelen',
        'Stort utslag (formeln slutar gälla)': 'Stort utslag (formelen slutter å gjelde)',
        'Pendeln på Månen': 'Pendelen på Månen',
        'A har massan 100 g och B massan 400 g, men längd och utslag är lika. Pendlarna svänger i takt: massan ingår inte i <em>T</em> = 2π√(<em>l</em>/<em>g</em>).':
            'A har massen 100 g og B massen 400 g, men lengden og utslaget er like. Pendlene svinger i takt: massen inngår ikke i <em>T</em> = 2π√(<em>l</em>/<em>g</em>).',
        'B är fyra gånger så lång som A (2,00 m mot 0,50 m) och behöver dubbelt så lång tid för en svängning. <em>T</em> växer som √<em>l</em>.':
            'B er fire ganger så lang som A (2,00 m mot 0,50 m) og trenger dobbelt så lang tid på en svingning. <em>T</em> vokser som √<em>l</em>.',
        'Med <em>l</em> = 0,995 m blir <em>T</em> = 2,00 s. Ljusgrinden slås ut en gång per sekund, varje gång pendeln passerar jämviktsläget.':
            'Med <em>l</em> = 0,995 m blir <em>T</em> = 2,00 s. Lysporten gir utslag én gang i sekundet, hver gang pendelen passerer likevektsstillingen.',
        'A släpps från 60° och B från 5°, båda med <em>l</em> = 1,00 m. A hänger efter: formeln gäller bara för små utslag, och vid 60° är perioden cirka 7 % längre.':
            'A slippes fra 60° og B fra 5°, begge med <em>l</em> = 1,00 m. A henger etter: formelen gjelder bare for små utslag, og ved 60° er perioden omtrent 7 % lengre.',
        'På Månen är <em>g</em> = 1,62 m/s². Samma pendel behöver ungefär 2,5 gånger så lång tid: <em>T</em> = 4,94 s.':
            'På Månen er <em>g</em> = 1,62 m/s². Den samme pendelen trenger omtrent 2,5 ganger så lang tid: <em>T</em> = 4,94 s.',

        // Tidtagaren
        'Ljusgrind och tidtagare': 'Lysport og tidtaker',
        'Redo.': 'Klar.',
        'Väntar på första passagen': 'Venter på første passering',
        'Mäter': 'Måler',
        'Klart': 'Ferdig',
        '{n} av 10': '{n} av 10',
        '10 av 10': '10 av 10',
        'Tio svängningar tog': 'Ti svingninger tok',
        's, så': 's, så',
        'Avbryt mätningen': 'Avbryt målingen',
        'Mät 10 svängningar': 'Mål 10 svingninger',
        'Punkten ligger i diagrammet': 'Punktet er lagt inn i diagrammet',
        'Lägg mätpunkt i diagrammet': 'Legg målepunktet inn i diagrammet',

        // Avläsning
        'Avläsning': 'Avlesning',
        'pendellängd': 'pendellengde',
        'utslag nu': 'utslag nå',
        'uppmätt': 'målt',
        'formelns': 'formelens',
        'avvikelse': 'avvik',
        'utslag vid mätningen': 'utslag ved målingen',

        // Diagrammet
        'Mätserie': 'Måleserie',
        'mot': 'mot',
        'Periodtid i kvadrat': 'Periode i andre',
        'mätpunkt': 'målepunkt',
        'stort utslag (över 20°)': 'stort utslag (over 20°)',
        'formelns kurva': 'kurven fra formelen',
        'anpassad linje': 'tilpasset linje',
        'Lägg mätpunkter i diagrammet. Punkterna hamnar på en rät linje genom origo, eftersom':
            'Legg målepunkter inn i diagrammet. Punktene havner på en rett linje gjennom origo, fordi',
        'Lutningen': 'Stigningstallet',
        'Använd sambandet': 'Bruk sammenhengen',
        'för att bestämma': 'for å bestemme',
        'Då är': 'Da er',
        'Kurvan böjer av: fyrdubblas': 'Kurven bøyer av: firedobles',
        'fördubblas': 'så dobles',
        '. Byt till': '. Bytt til',
        'så blir sambandet en rät linje.': 'så blir sammenhengen en rett linje.',
        'Rensa mätserien': 'Tøm måleserien',

        // Gissa-läget
        'Pendeln hänger på en okänd himlakropp. Mät': 'Pendelen henger på et ukjent himmellegeme. Mål',
        'för en eller flera längder, bestäm': 'for én eller flere lengder, bestem',
        'och skriv in det. Ljusgrinden och diagrammet är dina enda mätinstrument.':
            'og skriv det inn. Lysporten og diagrammet er de eneste måleinstrumentene dine.',
        'Ditt värde på g': 'Din verdi for g',
        'Kontrollera': 'Kontroller svaret',
        'Ny okänd planet': 'Ny ukjent planet',
        'Gör en mätning först.': 'Gjør en måling først.',
        'Poäng:': 'Poeng:',
        'Svit:': 'På rad:',
        'Skriv in ett värde på <em>g</em> i m/s².': 'Skriv inn en verdi for <em>g</em> i m/s².',
        'Med <em>l</em> = {l} m och <em>T</em> = {T} s ger <em>g</em> = 4π²·<em>l</em>/<em>T</em>² = 4π² · {l} / {T}² = {g} m/s².':
            'Med <em>l</em> = {l} m og <em>T</em> = {T} s gir <em>g</em> = 4π²·<em>l</em>/<em>T</em>² = 4π² · {l} / {T}² = {g} m/s².',
        'Lös ut <em>g</em> ur <em>T</em> = 2π√(<em>l</em>/<em>g</em>): <em>g</em> = 4π²·<em>l</em>/<em>T</em>².':
            'Løs ut <em>g</em> fra <em>T</em> = 2π√(<em>l</em>/<em>g</em>): <em>g</em> = 4π²·<em>l</em>/<em>T</em>².',
        'Mätningen gjordes med {a}° utslag. Formeln gäller bara för små utslag, så ett värde från så stort utslag blir för lågt.':
            'Målingen ble gjort med {a}° utslag. Formelen gjelder bare for små utslag, så en verdi fra et så stort utslag blir for lav.',
        'Det stämmer. Din pendel hänger på <b>{namn}</b>, där <em>g</em> = {g} m/s².':
            'Det stemmer. Pendelen din henger på <b>{namn}</b>, der <em>g</em> = {g} m/s².',
        'Du får {p} poäng.': 'Du får {p} poeng.',
        'Ditt värde är för litet': 'Verdien din er for liten',
        'Ditt värde är för stort': 'Verdien din er for stor',
        '. Kontrollera att du kvadrerat <em>T</em> och att längden är mätt till kulans tyngdpunkt. Större <em>g</em> ger kortare period.':
            '. Kontroller at du har kvadrert <em>T</em>, og at lengden er målt til tyngdepunktet i kulen. Større <em>g</em> gir kortere periode.',
        'Försök en gång till.': 'Prøv én gang til.',
        'Det stämmer inte. Pendeln hängde på <b>{namn}</b>, där <em>g</em> = {g} m/s².':
            'Det stemmer ikke. Pendelen hang på <b>{namn}</b>, der <em>g</em> = {g} m/s².',

        // Så hänger det ihop
        'Så hänger det ihop': 'Slik henger det sammen',
        'Pendellängden': 'Pendellengden',
        'räknas från upphängningspunkten till kulans tyngdpunkt. Därför går snöret ända fram till pricken i kulans mitt, och måttbandets avläsning görs där.':
            'regnes fra opphengingspunktet til tyngdepunktet i kulen. Derfor går snoren helt frem til prikken midt i kulen, og målebåndet leses av der.',
        'Tyngdkraften': 'Tyngdekraften',
        'delas i en komposant längs snöret och en tangentiell komposant': 'deles i en komponent langs snoren og en tangentiell komponent',
        '. Spännkraften': '. Snordraget',
        'tar upp den första, och bara': 'tar opp den første, og bare',
        'för pendeln mot jämviktsläget.': 'trekker pendelen mot likevektsstillingen.',
        'Massan ingår inte i formeln.': 'Massen inngår ikke i formelen.',
        'är proportionell mot massan, men det är också kulans tröghet, så massan förkortas bort. Prova försöket med samma längd och olika massa.':
            'er proporsjonal med massen, men det er også tregheten til kulen, så massen forkortes bort. Prøv forsøket med samme lengde og ulik masse.',
        'Kvadrerar du formeln får du': 'Kvadrerer du formelen, får du',
        ', en rät linje genom origo med lutningen 4π²/': ', en rett linje gjennom origo med stigningstallet 4π²/',
        '. Läs av lutningen och räkna ut': '. Les av stigningstallet og regn ut',
        'ur den.': 'fra det.',
        'Formeln gäller bara för små utslag, eftersom den bygger på att sin': 'Formelen gjelder bare for små utslag, fordi den bygger på at sin',
        '(i radianer). Vid 23° blir felet cirka 1 %, vid 45° cirka 4 % och vid 60° cirka 7 %. Simuleringen räknar rörelsen exakt, så du ser avvikelsen själv.':
            '(i radianer). Ved 23° blir feilen omtrent 1 %, ved 45° omtrent 4 % og ved 60° omtrent 7 %. Simuleringen regner ut bevegelsen eksakt, så du ser avviket selv.',
        'Sekundpendeln har perioden 2,00 s, så den passerar jämviktsläget en gång per sekund. Vid':
            'Sekundpendelen har perioden 2,00 s, så den passerer likevektsstillingen én gang i sekundet. Ved',
        '= 9,82 m/s² är den knappt en meter lång,': '= 9,82 m/s² er den knapt en meter lang,'
    });
})();
