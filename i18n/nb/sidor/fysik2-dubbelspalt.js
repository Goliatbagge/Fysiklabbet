/* i18n/nb/sidor/fysik2-dubbelspalt.js — norska (bokmål) för simuleringen
 * Dubbelspaltexperimentet (3D och planvy). */
(function () {
    I18N.add({
        // ---- Sidhuvud och brödsmula ----
        'Dubbelspaltexperimentet — Fysiklabbet': 'Dobbeltspalteeksperimentet — Fysiklabbet',
        'Dubbelspaltexperimentet — Fysik nivå 2': 'Dobbeltspalteeksperimentet — Fysikk nivå 2',
        'Dubbelspaltexperimentet i 3D eller som planvy ovanifrån, med en växlingsknapp emellan. Vågytan visar hur de två vågsystemen bakom spalterna förstärker och släcker ut varandra, skärmen fångar mönstret som ljusband eller som partiklar en i taget, och en detektor vid spalterna visar hur banden försvinner så snart vägen observeras. Ändra våglängd, spaltavstånd och skärmavstånd, mät vägskillnaden med ett klick och se gitterformeln n · λ = d · sin α i scenen.':
            'Dobbeltspalteeksperimentet i 3D eller som planvisning ovenfra, med en knapp for å bytte mellom dem. Bølgeflaten viser hvordan de to bølgesystemene bak spaltene forsterker hverandre og slukker hverandre ut, skjermen fanger opp mønsteret som lyse striper eller som partikler én om gangen, og en detektor ved spaltene viser hvordan stripene forsvinner så snart veien observeres. Endre bølgelengde, spalteavstand og skjermavstand, mål veiforskjellen med ett klikk og se gitterformelen n · λ = d · sin α i scenen.',
        '/ Dubbelspaltexperimentet': '/ Dobbeltspalteeksperimentet',
        'Dubbelspaltexperimentet': 'Dobbeltspalteeksperimentet',

        // ---- Ingressen ----
        'En laser lyser mot en platta med två smala spalter, och på skärmen bakom uppstår': 'En laser lyser mot en plate med to smale spalter, og på skjermen bak oppstår',
        'interferensmönstret': 'interferensmønsteret',
        ': ljusa band där vågorna från de två spalterna kommer i fas och mörka där de släcker ut varandra. Vågytan på golvet visar hur de två vågsystemen breder ut sig och möts, och banden på skärmen ligger exakt där vågtopparna träffar den. Med knappen uppe till vänster växlar du mellan':
            ': lyse striper der bølgene fra de to spaltene kommer i fase, og mørke der de slukker hverandre ut. Bølgeflaten på gulvet viser hvordan de to bølgesystemene brer seg ut og møtes, og stripene på skjermen ligger nøyaktig der bølgetoppene treffer den. Med knappen oppe til venstre bytter du mellom',
        'och en': 'og en',
        'planvy rakt ovanifrån': 'planvisning rett ovenfra',
        ', som figurerna i genomgången. Byt till': ', som figurene i gjennomgangen. Bytt til',
        'en partikel i taget': 'én partikkel om gangen',
        'och se samma mönster växa fram, prick för prick. Sätt sedan en': 'og se det samme mønsteret vokse fram, prikk for prikk. Sett deretter en',
        'vid spalterna som registrerar vilken spalt varje partikel går genom, och se banden försvinna: mäts vägen beter sig partikeln som en partikel, mäts den inte som en våg. Klicka på skärmen för att mäta vägskillnaden, och kryssa i maximilinjerna för att se gitterformeln ritad i rummet.':
            'ved spaltene som registrerer hvilken spalte hver partikkel går gjennom, og se stripene forsvinne: måles veien, oppfører partikkelen seg som en partikkel, måles den ikke, som en bølge. Klikk på skjermen for å måle veiforskjellen, og kryss av for maksimumslinjene for å se gitterformelen tegnet i rommet.',

        // ---- Formelkortet ----
        'Ordning': 'Orden',
        'Våglängd': 'Bølgelengde',
        'Spaltavstånd': 'Spalteavstand',
        'Avböjningsvinkel': 'Avbøyningsvinkel',
        'Första ordningens maximum (': 'Første ordens maksimum (',
        '= 1) med de aktuella värdena: sin': '= 1) med de gjeldende verdiene: sin',
        ', alltså': ', altså',
        '°. På skärmen': '°. På skjermen',
        'µm bort hamnar det': 'µm unna havner det',
        'µm från centralmaximum.': 'µm fra sentralmaksimumet.',
        '. Det är mer än 1, så inget första maximum finns: våglängden är längre än spaltavståndet och bara centralmaximum blir kvar.':
            '. Det er mer enn 1, så det finnes ikke noe første maksimum: bølgelengden er lengre enn spalteavstanden, og bare sentralmaksimumet blir igjen.',

        // ---- Scenen ----
        'Vy: 3D eller planvy': 'Visning: 3D eller planvisning',
        'Planvy rakt ovanifrån': 'Planvisning rett ovenfra',
        'Byt kameravy': 'Bytt kameravinkel',
        'Byt kameravy: nu {nu}, nästa {nasta}': 'Bytt kameravinkel: nå {nu}, neste {nasta}',
        'Snett framifrån': 'Skrått forfra',
        'Ovanifrån': 'Ovenfra',
        'Mot skärmen': 'Mot skjermen',
        'träffar': 'treff',
        'på skärmen': 'på skjermen',
        'genom A:': 'gjennom A:',
        '· genom B:': '· gjennom B:',
        'Dra för att vrida kameran · rulla för att zooma · klicka på skärmen för att mäta vägskillnaden': 'Dra for å dreie kameraen · rull for å zoome · klikk på skjermen for å måle veiforskjellen',
        'Planvy ovanifrån · klicka på skärmen för att mäta vägskillnaden': 'Planvisning ovenfra · klikk på skjermen for å måle veiforskjellen',
        // etiketter i scenen (sprites och canvas)
        'Dubbelspalt': 'Dobbeltspalte',
        'Skärm': 'Skjerm',

        // ---- Inställningsrutan och sidopanelens kort ----
        'Visa inställningar': 'Vis innstillinger',
        'Dölj inställningar': 'Skjul innstillinger',
        'Källa': 'Kilde',
        'Laser (ljus)': 'Laser (lys)',
        'Skickar': 'Sender',
        'Vågor': 'Bølger',
        'En partikel i taget': 'Én partikkel om gangen',
        'Vid spalterna': 'Ved spaltene',
        'Ingen mätning (verkligt försök)': 'Ingen måling (virkelig forsøk)',
        'Detektor: vilken spalt?': 'Detektor: hvilken spalte?',
        'Tankeexperiment: vanliga små kulor': 'Tankeeksperiment: vanlige små kuler',
        'Vågyta': 'Bølgeflate',
        'Maximilinjer och': 'Maksimumslinjer og',
        'Intensitetskurva': 'Intensitetskurve',
        'Spalter': 'Spalter',
        'Spalt A öppen': 'Spalte A åpen',
        'Spalt B öppen': 'Spalte B åpen',
        'Fart': 'Tempo',
        'Spaltbredd': 'Spaltebredde',
        'Skärmavstånd': 'Skjermavstand',
        'Partiklar per sekund': 'Partikler per sekund',
        'Färdiga försök': 'Ferdige forsøk',
        'Utgångsläge': 'Utgangsoppsett',
        'Två fält': 'To felt',
        'Kameravy': 'Kameravinkel',
        'Snett': 'Skrått',
        'Rensa skärmen': 'Tøm skjermen',
        'Ta bort markören': 'Fjern markøren',

        // ---- Reglagen ----
        'Våglängd (': 'Bølgelengde (',
        'Spaltavstånd (': 'Spalteavstand (',
        'Spaltbredd (': 'Spaltebredde (',
        'Skärmavstånd (': 'Skjermavstand (',
        'Elektronernas de Broglie-våglängd. Med <em>λ</em> = <em>h</em>/(<em>m</em> · <em>v</em>) svarar den mot farten {v} m/s.':
            'Elektronenes de Broglie-bølgelengde. Med <em>λ</em> = <em>h</em>/(<em>m</em> · <em>v</em>) svarer den til farten {v} m/s.',
        'Ljusets våglängd. Färgen i scenen följer med: {f} THz just nu.': 'Lysets bølgelengde. Fargen i scenen følger med: {f} THz akkurat nå.',
        'Avståndet mellan spalternas mitt. Större avstånd ger tätare band på skärmen.': 'Avstanden mellom midten av spaltene. Større avstand gir tettere striper på skjermen.',
        'Varje spalts bredd. Smalare spalter sprider ljuset mer, så att fler band blir synliga; bredare spalter samlar ljuset i mitten.':
            'Bredden på hver spalte. Smalere spalter sprer lyset mer, slik at flere striper blir synlige; bredere spalter samler lyset i midten.',
        'Avståndet från plattan till skärmen. Vinklarna ändras inte, men banden hamnar längre isär på en avlägsen skärm.':
            'Avstanden fra platen til skjermen. Vinklene endres ikke, men stripene havner lenger fra hverandre på en skjerm langt unna.',
        'Hur tätt källan skickar partiklar. Med få per sekund ser du varje träff för sig; med många växer mönstret fram på några sekunder.':
            'Hvor tett kilden sender partikler. Med få per sekund ser du hvert treff for seg; med mange vokser mønsteret fram på noen sekunder.',

        // ---- Färdiga försök ----
        'Ställer in alla reglage med ett klick.': 'Stiller inn alle kontrollene med ett klikk.',
        'Två skilda fält': 'To atskilte felt',
        'visar det gränsfall där detektorn ger två åtskilda fält: breda spalter långt isär, kort våglängd och skärmen nära.':
            'viser det grensetilfellet der detektoren gir to atskilte felt: brede spalter langt fra hverandre, kort bølgelengde og skjermen nær.',
        'Elektroner en i taget': 'Elektroner én om gangen',

        // ---- Avläsningar ----
        'Avläsningar': 'Avlesninger',
        'Första maximum': 'Første maksimum',
        'finns ej': 'finnes ikke',
        'Avstånd centralmax till 1:a max': 'Avstand fra sentralmaksimum til 1. maksimum',
        'Maxima på skärmen': 'Maksima på skjermen',
        'st': 'stk.',
        'Elektronernas fart': 'Elektronenes fart',
        'Ljusets frekvens': 'Lysets frekvens',

        // ---- Vägskillnaden ----
        'Vägskillnad': 'Veiforskjell',
        'Klicka på en punkt på skärmen i scenen. Då ritas vägarna från spalt A och spalt B till punkten, och vägskillnaden Δ':
            'Klikk på et punkt på skjermen i scenen. Da tegnes veiene fra spalte A og spalte B til punktet, og veiforskjellen Δ',
        'jämförs med våglängden: hela våglängder ger maximum, halva ger minimum.': 'sammenlignes med bølgelengden: hele bølgelengder gir maksimum, halve gir minimum.',
        'Från spalt A,': 'Fra spalte A,',
        'Från spalt B,': 'Fra spalte B,',
        'Vägskillnad Δ': 'Veiforskjell Δ',
        'i våglängder': 'i bølgelengder',
        'Vägskillnaden är {m} hel våglängd: vågorna från A och B kommer i fas, konstruktiv interferens. Maximum av ordningen n = {m}.':
            'Veiforskjellen er {m} hel bølgelengde: bølgene fra A og B kommer i fase, konstruktiv interferens. Maksimum av orden n = {m}.',
        'Vägskillnaden är {m} hela våglängder: vågorna från A och B kommer i fas, konstruktiv interferens. Maximum av ordningen n = {m}.':
            'Veiforskjellen er {m} hele bølgelengder: bølgene fra A og B kommer i fase, konstruktiv interferens. Maksimum av orden n = {m}.',
        'Vägskillnaden är {k} + ½ våglängder: vågtopp från den ena spalten möter vågdal från den andra, destruktiv interferens. Här är det mörkt (en nodlinje).':
            'Veiforskjellen er {k} + ½ bølgelengder: bølgetopp fra den ene spalten møter bølgebunn fra den andre, destruktiv interferens. Her er det mørkt (en nodelinje).',
        'Varken helt i fas eller helt i motfas: vågorna förstärker varandra delvis. Flytta markören mot ett ljust band eller ett mörkt.':
            'Verken helt i fase eller helt i motfase: bølgene forsterker hverandre delvis. Flytt markøren mot en lys stripe eller en mørk.',

        // ---- Intensitetsdiagrammet ----
        'Intensiteten längs skärmen': 'Intensiteten langs skjermen',
        'Intensiteten längs skärmen med maxima markerade': 'Intensiteten langs skjermen med maksima markert',
        'Ljusstyrkan tvärs över skärmen, med maxima markerade. Läget': 'Lysstyrken på tvers av skjermen, med maksima markert. Posisjonen',
        'räknas från centralmaximum. Den breda kupan som dämpar de yttre banden kommer av diffraktionen i varje enskild spalt.':
            'regnes fra sentralmaksimumet. Den brede puklen som demper de ytre stripene, kommer av diffraksjonen i hver enkelt spalte.',

        // ---- Vad visar vågytan? ----
        'Vad visar vågytan?': 'Hva viser bølgeflaten?',
        'Vågytan är samma bild som vattenvågorna i genomgången, fast i tre dimensioner: en plan våg kommer från vänster, och varje spalt blir en ny vågkälla som sänder ut halvcirkelformade vågfronter. Bakom plattan överlappar de två vågsystemen. Där vågtopp möter vågtopp blir utslaget dubbelt så stort, där vågtopp möter vågdal blir det noll.':
            'Bølgeflaten er det samme bildet som vannbølgene i gjennomgangen, bare i tre dimensjoner: en plan bølge kommer fra venstre, og hver spalte blir en ny bølgekilde som sender ut halvsirkelformede bølgefronter. Bak platen overlapper de to bølgesystemene. Der bølgetopp møter bølgetopp, blir utslaget dobbelt så stort, og der bølgetopp møter bølgebunn, blir det null.',
        'Titta ovanifrån, i 3D med kameravyn eller i planvyn, och följ de lugna stråken där ytan är nästan stilla: det är nodlinjerna, och de träffar skärmen precis i de mörka banden. Mellan dem ligger maximilinjerna, där vågen slår som högst hela vägen fram till skärmens ljusa band.':
            'Se ovenfra, i 3D med kameravinkelen eller i planvisningen, og følg de rolige sonene der flaten er nesten stille: det er nodelinjene, og de treffer skjermen akkurat i de mørke stripene. Mellom dem ligger maksimumslinjene, der bølgen slår høyest hele veien fram til de lyse stripene på skjermen.',

        // ---- En partikel i taget ----
        'Skruva ner till några partiklar per sekund. Varje foton eller elektron träffar skärmen i': 'Skru ned til noen få partikler per sekund. Hvert foton eller elektron treffer skjermen i',
        'en enda punkt': 'ett eneste punkt',
        ', som en partikel. Men punkterna hamnar inte var som helst: efter några hundra träffar har de ritat exakt samma band som vågorna gav. Var en enskild partikel landar går inte att förutsäga, bara sannolikheten, och sannolikheten är vågens intensitet.':
            ', som en partikkel. Men punktene havner ikke hvor som helst: etter noen hundre treff har de tegnet nøyaktig de samme stripene som bølgene ga. Hvor en enkelt partikkel lander, kan ikke forutsies, bare sannsynligheten, og sannsynligheten er intensiteten til bølgen.',
        'Välj': 'Velg',
        'för att se hur det': 'for å se hvordan det',
        'hade sett ut om': 'ville ha sett ut hvis',
        'ljus och elektroner inte hade någon vågnatur alls, utan vore små kulor som skjuts en och en: varje kula går genom den ena spalten eller den andra och fortsätter rakt fram, så det blir två smala streck, ett bakom varje spalt och lika brett som spalten, och inga mörka band. Det är alltså inte ett verkligt utfall utan en jämförelse, och det är just skillnaden mot det verkliga mönstret som visar att partiklarna beter sig som vågor.':
            'lys og elektroner ikke hadde noen bølgenatur i det hele tatt, men var små kuler som skytes ut én og én: hver kule går gjennom den ene spalten eller den andre og fortsetter rett fram, så det blir to smale streker, én bak hver spalte og like bred som spalten, og ingen mørke striper. Det er altså ikke et virkelig utfall, men en sammenligning, og det er nettopp forskjellen fra det virkelige mønsteret som viser at partiklene oppfører seg som bølger.',

        // ---- Detektor vid spalterna ----
        'Detektor vid spalterna': 'Detektor ved spaltene',
        'Två givare sätts intill spalterna, och varje gång en partikel passerar blinkar lampan vid den spalt den gick genom. Nu har varje partikel en bestämd väg, och den flyger synligt från sin spalt till skärmen. Räkna in träffarna: ungefär hälften genom A, hälften genom B, och på skärmen finns':
            'To sensorer settes ved siden av spaltene, og hver gang en partikkel passerer, blinker lampen ved spalten den gikk gjennom. Nå har hver partikkel en bestemt vei, og den flyr synlig fra sin spalte til skjermen. Tell treffene: omtrent halvparten gjennom A, halvparten gjennom B, og på skjermen finnes det',
        'inga mörka band längre': 'ingen mørke striper lenger',
        '. Mönstret är i stället summan av de två spalternas egna diffraktionsmönster, ett brett ljust fält.': '. Mønsteret er i stedet summen av de to spaltenes egne diffraksjonsmønstre, et bredt lyst felt.',
        'Detta är det verkliga experimentets mest berömda resultat. Observeras vägen beter sig elektronen som en partikel som gått genom en spalt; observeras den inte går den som en våg genom båda och interfererar med sig själv. Det är inte detektorns knuff som suddar ut banden, utan att informationen om vägen finns: en mätning som kunde avslöja spalten räcker, hur skonsam den än är. Att det inte blir två skarpa streck beror på att partikeln fortfarande har sin våglängd och diffrakterar genom den spalt den passerar: spalterna är smala i förhållande till avståndet mellan dem, så varje spalts eget ljus sprids ut över hela skärmen. Så är det också i verkliga försök, både med laser och med elektroner. Två åtskilda fält kräver att varje spalts diffraktionsbredd, ungefär':
            'Dette er det mest berømte resultatet fra det virkelige eksperimentet. Observeres veien, oppfører elektronet seg som en partikkel som har gått gjennom én spalte; observeres den ikke, går elektronet som en bølge gjennom begge og interfererer med seg selv. Det er ikke detektorens dytt som visker ut stripene, men at informasjonen om veien finnes: en måling som kunne avsløre spalten, er nok, uansett hvor skånsom den er. At det ikke blir to skarpe streker, skyldes at partikkelen fortsatt har sin bølgelengde og diffrakteres gjennom spalten den passerer: spaltene er smale i forhold til avstanden mellom dem, så lyset fra hver spalte spres ut over hele skjermen. Slik er det også i virkelige forsøk, både med laser og med elektroner. To atskilte felt krever at diffraksjonsbredden til hver spalte, omtrent',
        ', är mindre än spaltavståndet': ', er mindre enn spalteavstanden',
        '. Det färdiga försöket': '. Det ferdige forsøket',
        'ställer in just det: breda spalter långt isär, kort våglängd och skärmen nära.': 'stiller inn akkurat det: brede spalter langt fra hverandre, kort bølgelengde og skjermen nær.',

        // ---- Gitterformeln i scenen ----
        'Gitterformeln i scenen': 'Gitterformelen i scenen',
        'Kryssa i': 'Kryss av for',
        'Maximilinjer': 'Maksimumslinjer',
        '. Från mitten mellan spalterna går en linje till varje ljust band, och vinkeln mellan centrallinjen och linjen till första maximet är avböjningsvinkeln':
            '. Fra midten mellom spaltene går det en linje til hver lyse stripe, og vinkelen mellom sentrallinjen og linjen til det første maksimumet er avbøyningsvinkelen',
        '. Gitterformeln säger att sin': '. Gitterformelen sier at sin',
        ': längre våglängd eller mindre spaltavstånd ger större vinklar och glesare band.': ': lengre bølgelengde eller mindre spalteavstand gir større vinkler og glisnere striper.',
        'Prova: dra våglängden från blått till rött och se banden glida isär medan färgen ändras. Dra sedan ihop spalterna, så sprids banden ännu mer. Blir':
            'Prøv: dra bølgelengden fra blått til rødt og se stripene gli fra hverandre mens fargen endres. Flytt deretter spaltene nærmere hverandre, så spres stripene enda mer. Blir',
        'större än': 'større enn',
        'försvinner sidomaxima helt, precis som formeln förutsäger, eftersom sin': 'forsvinner sidemaksimaene helt, akkurat som formelen forutsier, fordi sin',
        'aldrig kan bli större än 1.': 'aldri kan bli større enn 1.',

        // ---- Täck för en spalt ----
        'Täck för en spalt': 'Dekk til én spalte',
        'Stäng spalt B. Kvar blir en enkelspalt, och interferensbanden försvinner: skärmen visar i stället ett brett, mjukt centralt maximum med svaga sidomaxima, diffraktionsmönstret från en enda spalt. Öppna spalten igen och banden är tillbaka, inne i samma breda kupa.':
            'Lukk spalte B. Da står du igjen med en enkeltspalte, og interferensstripene forsvinner: skjermen viser i stedet et bredt, mykt sentralt maksimum med svake sidemaksima, diffraksjonsmønsteret fra én enkelt spalte. Åpne spalten igjen, og stripene er tilbake, inne i den samme brede puklen.',
        'Det är därför de yttre banden i dubbelspaltmönstret alltid är svagare: varje spalts diffraktion bestämmer hur mycket ljus som når ut åt sidorna, och dubbelspaltens interferens delar upp det ljuset i band. Med smalare spalter (mindre':
            'Det er derfor de ytre stripene i dobbeltspaltemønsteret alltid er svakere: diffraksjonen i hver spalte bestemmer hvor mye lys som når ut til sidene, og interferensen i dobbeltspalten deler opp dette lyset i striper. Med smalere spalter (mindre',
        ') blir kupan bredare och fler band syns.': ') blir puklen bredere, og flere striper blir synlige.',

        // ---- Om storleken i scenen ----
        'Om storleken i scenen': 'Om størrelsen i scenen',
        'Scenen är i mikrometerskala: spalterna sitter några mikrometer isär och skärmen står några tiotal mikrometer bort, där den i en vanlig laboration står tusen gånger längre bort. Alla mått är riktiga, och gitterformeln gäller precis som vanligt. Den lilla uppställningen är vald för att vinklarna ska bli stora nog att se: med en labbdubbelspalt på 0,1 mm och en skärm 2 m bort är första maximets vinkel bara 0,4°, och vågorna på golvet skulle vara omöjliga att urskilja. Elektronernas våglängd i scenen svarar mot ganska långsamma elektroner, kring tusen meter per sekund. I det klassiska elektronexperimentet är elektronerna mycket snabbare, våglängden bara någon tusendel så lång och spalterna därför mycket smalare, men bilden är densamma.':
            'Scenen er i mikrometerskala: spaltene sitter noen mikrometer fra hverandre, og skjermen står noen titalls mikrometer unna, mens den i en vanlig laboratorieøvelse står tusen ganger lenger unna. Alle mål er riktige, og gitterformelen gjelder akkurat som vanlig. Det lille oppsettet er valgt for at vinklene skal bli store nok til å se: med en vanlig dobbeltspalte på 0,1 mm og en skjerm 2 m unna er vinkelen til det første maksimumet bare 0,4°, og bølgene på gulvet ville vært umulige å skjelne. Elektronenes bølgelengde i scenen svarer til ganske langsomme elektroner, rundt tusen meter per sekund. I det klassiske elektroneksperimentet er elektronene mye raskere, bølgelengden bare en tusendel så lang og spaltene derfor mye smalere, men bildet er det samme.',

        // ---- Vanliga missuppfattningar ----
        'Vanliga missuppfattningar': 'Vanlige misoppfatninger',
        '"Banden uppstår för att partiklarna krockar med varandra."': '«Stripene oppstår fordi partiklene kolliderer med hverandre.»',
        'Mönstret växer fram också när partiklarna skickas en i taget, med lång tid emellan. Varje partikel interfererar med sig själv, inte med andra.':
            'Mønsteret vokser fram også når partiklene sendes én om gangen, med lang tid imellom. Hver partikkel interfererer med seg selv, ikke med andre.',
        '"Ljuset går genom den ena spalten eller den andra."': '«Lyset går gjennom den ene spalten eller den andre.»',
        'Om det vore så skulle mönstret bli summan av två enkelspaltmönster, utan mörka band. Täck för en spalt i taget och lägg ihop bilderna: det blir aldrig dubbelspaltens mönster.':
            'Hvis det var slik, ville mønsteret blitt summen av to enkeltspaltemønstre, uten mørke striper. Dekk til én spalte om gangen og legg sammen bildene: det blir aldri mønsteret fra dobbeltspalten.',
        '"Längre skärmavstånd ger större vinklar."': '«Lengre skjermavstand gir større vinkler.»',
        'Vinklarna bestäms enbart av': 'Vinklene bestemmes bare av',
        'och': 'og',
        '. Ett längre avstånd gör bara att samma vinklar ger större avstånd på skärmen,': '. En lengre avstand gjør bare at de samme vinklene gir større avstander på skjermen,',
        '"Med detektor blir partikeln en kula som går rakt fram, så skärmen visar två streck."': '«Med detektor blir partikkelen en kule som går rett fram, så skjermen viser to streker.»',
        'Nej. Detektorn tar bort interferensen mellan de två vägarna, men partikeln har kvar sin våglängd och diffrakterar genom den spalt den faktiskt passerar, precis som i enkelspaltförsöket. Därför blir fältet brett. Två smala streck är kul-tankeexperimentets bild, där vågnaturen är helt borttagen. Först med breda spalter långt isär, kort våglängd och en nära skärm blir varje spalts eget mönster smalt nog för att synas som två skilda fält.':
            'Nei. Detektoren fjerner interferensen mellom de to veiene, men partikkelen har fortsatt sin bølgelengde og diffrakteres gjennom spalten den faktisk passerer, akkurat som i enkeltspalteforsøket. Derfor blir feltet bredt. To smale streker er bildet fra tankeeksperimentet med kuler, der bølgenaturen er helt fjernet. Først med brede spalter langt fra hverandre, kort bølgelengde og en skjerm nær blir mønsteret fra hver spalte smalt nok til å vises som to atskilte felt.',
        '"Detektorn stör partikeln mekaniskt, därför försvinner banden."': '«Detektoren forstyrrer partikkelen mekanisk, derfor forsvinner stripene.»',
        'Det avgörande är inte hur hårt detektorn påverkar partikeln utan att den ger information om vägen. Så snart det i princip går att veta vilken spalt partikeln tog finns inga två vägar att lägga ihop, och interferensen uteblir. Tas informationen bort kommer banden tillbaka.':
            'Det avgjørende er ikke hvor hardt detektoren påvirker partikkelen, men at den gir informasjon om veien. Så snart det i prinsippet er mulig å vite hvilken spalte partikkelen tok, finnes det ikke to veier å legge sammen, og interferensen uteblir. Fjernes informasjonen, kommer stripene tilbake.',
        '"Mörkt betyder att ljuset försvann."': '«Mørkt betyr at lyset forsvant.»',
        'Energin försvinner inte. Den som saknas i de mörka banden finns i de ljusa: interferensen flyttar ljuset, den förstör det inte.':
            'Energien forsvinner ikke. Den som mangler i de mørke stripene, finnes i de lyse: interferensen flytter lyset, den ødelegger det ikke.'
    });
})();
