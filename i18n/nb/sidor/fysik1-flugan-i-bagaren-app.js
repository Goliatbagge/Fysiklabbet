/* i18n/nb/sidor/fysik1-flugan-i-bagaren-app.js — norska (bokmål) för
 * simuleringen Flugan i bägaren. Canvas-texten går via oversatt() i sidan. */
(function () {
    I18N.add({
        'Flugan i bägaren — Fysiklabbet': 'Fluen i begeret — Fysiklabbet',
        'Flugan i bägaren — Fysik nivå 1': 'Fluen i begeret — Fysikk nivå 1',
        'En fluga lyfter inne i en bägare som står på en känslig våg — ändras utslaget? Följ luftens nedsvep, vågens utslag och rörelsemängden, i realtid och ultrarapid.':
            'En flue letter inne i et beger som står på en følsom vekt. Endres utslaget? Følg luftens nedstrøm, vektens utslag og bevegelsesmengden, i sanntid og sakte film.',
        '/ Flugan i bägaren': '/ Fluen i begeret',
        'Flugan i bägaren': 'Fluen i begeret',
        'Brandsläckaren i rymden': 'Brannslukkeren i verdensrommet',

        // Formelkortet och ingressen
        'Vågens kraft': 'Kraften fra vekten',
        'Systemets tyngd': 'Systemets tyngde',
        'Rörelsemängdsändring per tid': 'Endring i bevegelsesmengde per tid',
        'En bägare står på en känslig våg, och en fluga sitter på botten. Vad händer med utslaget när flugan lyfter? Vågen i simuleringen får aldrig veta svaret på förhand: den känner bara kontaktkrafter och luftens tryck mot glaset. Kör förloppen, sakta ner till ultrarapid och se hur flugans tyngd tar vägen genom luften ner i bägaren.':
            'Et beger står på en følsom vekt, og en flue sitter på bunnen. Hva skjer med utslaget når fluen letter? Vekten i simuleringen får aldri vite svaret på forhånd: den merker bare kontaktkrefter og luftens trykk mot glasset. Kjør forløpene, senk farten til sakte film og se hvordan fluens tyngde tar veien gjennom luften ned i begeret.',

        // Lägen
        'Läge': 'Modus',
        'Enkelt': 'Enkel',
        'Avancerat': 'Avansert',
        'Arbetssätt': 'Arbeidsmåte',
        'Utforska': 'Utforsk',
        'Förutsäg': 'Forutsi',

        // Scenen och knapparna
        'En glasbägare står på en laboratorievåg. En fluga flyger inne i bägaren, luftens strömning visas som partiklar och vågens utslag ritas i en graf.':
            'Et glassbeger står på en laboratorievekt. En flue flyr inne i begeret, luftstrømmen vises som partikler, og vektens utslag tegnes i en graf.',
        'Ljud på/av': 'Lyd på/av',
        'Stäng av ljudet': 'Slå av lyden',
        'Slå på ljudet': 'Slå på lyden',
        'Flyg': 'Fly',
        'Landa': 'Land',
        'Lock på bägaren': 'Lokk på begeret',
        'Luftströmning': 'Luftstrøm',
        'Tryck mot botten': 'Trykk mot bunnen',
        'Bägare': 'Beger',
        'Nollställ vågen': 'Nullstill vekten',
        'Systemgräns': 'Systemgrense',
        'Hela systemet': 'Hele systemet',
        'Förlopp': 'Forløp',

        // Reglage
        'Uppspelning': 'Avspilling',
        'realtid': 'sanntid',
        'Flugans massa': 'Fluens masse',
        'Lufttäthet': 'Lufttetthet',
        'Hovringshöjd': 'Svevehøyde',
        'Bägarens höjd': 'Begerets høyde',
        'Systemgräns (frilagd kropp)': 'Systemgrense (frilagt legeme)',
        'Ingen': 'Ingen',
        'Bara flugan': 'Bare fluen',
        'Bara luften i bägaren': 'Bare luften i begeret',
        'Hela systemet (bägare + luft + fluga)': 'Hele systemet (beger + luft + flue)',

        // Förloppen
        'Sitter still på botten': 'Sitter stille på bunnen',
        'Flugan står kvar på bägarens botten.': 'Fluen blir stående på bunnen av begeret.',
        'Flugans tyngd går som vanlig kontaktkraft genom benen till botten. Vågen bär hela systemet: bägare, luft och fluga.':
            'Fluens tyngde går som vanlig kontaktkraft gjennom beina til bunnen. Vekten bærer hele systemet: beger, luft og flue.',
        'Lyfter, hovrar och landar': 'Letter, svever og lander',
        'Hela förloppet: avstamp, hovring och landning.': 'Hele forløpet: fraspark, sveving og landing.',
        'Avstampet ger en kort spik uppåt, sedan kommer en lika stor dipp medan luftströmmen byggs upp (0,1–0,2 s) — och under hovringen är utslaget oförändrat. Landningen ger en ny spik. Impulsöverskottet, ytan under avvikelsekurvan, summerar till noll över hela förloppet.':
            'Frasparket gir en kort topp oppover, og deretter kommer en like stor dipp mens luftstrømmen bygges opp (0,1–0,2 s). Under svevingen er utslaget uendret. Landingen gir en ny topp. Impulsoverskuddet, arealet under avvikskurven, summerer seg til null over hele forløpet.',
        'Hovrar stilla i bägaren': 'Svever stille i begeret',
        'Stationär hovring mitt i den slutna bägaren.': 'Stasjonær sveving midt i det lukkede begeret.',
        'Flugan accelererar luft nedåt med ett rörelsemängdsflöde som exakt motsvarar dess tyngd. I en sluten bägare tas hela flödet upp av botten och väggarna — vågen visar samma som när flugan satt still.':
            'Fluen akselererer luft nedover med en bevegelsesmengdestrøm som nøyaktig tilsvarer tyngden dens. I et lukket beger tas hele strømmen opp av bunnen og veggene, og vekten viser det samme som da fluen satt stille.',
        'Stiger med konstant fart': 'Stiger med konstant fart',
        'Flugan klättrar uppåt med jämn hastighet.': 'Fluen klatrer oppover med jevn fart.',
        'Konstant fart betyder acceleration noll — flugans rörelsemängd ändras inte, så vingarna bär exakt tyngden precis som vid hovring. Utslaget är i princip oförändrat. (Den lilla dippen som syns är vakens eftersläpning: luftpelaren under flugan blir längre och hinner lagra lite mer rörelsemängd under klättringen.)':
            'Konstant fart betyr akselerasjon null. Fluens bevegelsesmengde endres ikke, så vingene bærer nøyaktig tyngden, akkurat som ved sveving. Utslaget er i prinsippet uendret. (Den lille dippen som vises, skyldes forsinkelsen i kjølvannet: luftsøylen under fluen blir lengre og rekker å lagre litt mer bevegelsesmengde under klatringen.)',
        'Accelererar uppåt': 'Akselererer oppover',
        'Flugan drar på och ökar farten uppåt.': 'Fluen gir gass og øker farten oppover.',
        'För att accelerera uppåt med a måste vingarna trycka ner luften hårdare än flugans tyngd — utslaget ökar medan accelerationen pågår, med upp till m·a. En del av ökningen når botten med strålens fördröjning och kommer som en efterpuckel när flugan bromsar in där uppe. Impulserna tar ut varandra.':
            'For å akselerere oppover med a må vingene presse luften ned hardere enn fluens tyngde. Utslaget øker mens akselerasjonen pågår, med opptil m·a. En del av økningen når bunnen med strålens forsinkelse og kommer som en etterpukkel når fluen bremser opp der oppe. Impulsene opphever hverandre.',
        'Dyker mot botten': 'Dykker mot bunnen',
        'Flugan accelererar nedåt i en dykning.': 'Fluen akselererer nedover i et dykk.',
        'I dykningen bär vingarna mindre än tyngden — utslaget minskar med m·a. Lägg märke till inbromsningen strax ovanför botten: där ökar utslaget i stället, och impulserna tar ut varandra.':
            'I dykket bærer vingene mindre enn tyngden, og utslaget minker med m·a. Legg merke til oppbremsingen like over bunnen: der øker utslaget i stedet, og impulsene opphever hverandre.',
        'Spelar död — fritt fall': 'Spiller død: fritt fall',
        'Vingarna stannar och flugan faller fritt.': 'Vingene stopper, og fluen faller fritt.',
        'Utan lyftkraft överförs nästan ingenting av flugans tyngd till bägaren — utslaget faller mot −m·g. Dippen växer under fallet: nedsvepet som redan är på väg fortsätter trycka på botten en kort stund (vakens eftersläpning). Vid gränsfarten hade luftmotståndet gjort utslaget oförändrat igen, men dit hinner flugan inte i en kort bägare. Nedslaget ger en kraftig spik som återställer impulsbalansen.':
            'Uten løftekraft overføres nesten ingenting av fluens tyngde til begeret, og utslaget faller mot −m·g. Dippen vokser under fallet: nedstrømmen som allerede er på vei, fortsetter å presse på bunnen en kort stund (forsinkelsen i kjølvannet). Ved grensefarten ville luftmotstanden ha gjort utslaget uendret igjen, men dit rekker ikke fluen i et kort beger. Nedslaget gir en kraftig topp som gjenoppretter impulsbalansen.',
        'Hovrar i mynningen (utan lock)': 'Svever i åpningen (uten lokk)',
        'Öppen bägare — flugan hovrar precis vid kanten.': 'Åpent beger: fluen svever rett ved kanten.',
        'Vid mynningen sprider sig nedsvepet ut i rummet i stället för ner i bägaren — rörelsemängden hamnar på bordet runt omkring. Infångningen f går mot noll och utslaget minskar med nästan hela m·g.':
            'Ved åpningen sprer nedstrømmen seg ut i rommet i stedet for ned i begeret, og bevegelsesmengden havner på bordet omkring. Innfangingen f går mot null, og utslaget minker med nesten hele m·g.',
        'Vakuum i bägaren': 'Vakuum i begeret',
        'Luften pumpas ut — flugan försöker lyfta.': 'Luften pumpes ut, og fluen prøver å lette.',
        'Utan luft finns inget att trycka ner — vingarna ger ingen kraft alls. Flugan kan bara hoppa med benen och faller sedan fritt: under hoppet minskar utslaget med m·g (ingen luft kan föra över tyngden), och avstamp plus nedslag ger spikar som tar ut varandra.':
            'Uten luft er det ingenting å presse ned, så vingene gir ingen kraft i det hele tatt. Fluen kan bare hoppe med beina og faller deretter fritt: under hoppet minker utslaget med m·g (ingen luft kan overføre tyngden), og fraspark pluss nedslag gir topper som opphever hverandre.',

        // Förutsäg-läget
        'Vad visar vågen under förloppet, jämfört med när flugan sitter stilla på botten?':
            'Hva viser vekten under forløpet, sammenlignet med når fluen sitter stille på bunnen?',
        'Ökar': 'Øker',
        'Oförändrat': 'Uendret',
        'Minskar': 'Minker',
        'Du gissade "': 'Du gjettet «',
        '" — titta på grafen …': '». Se på grafen …',
        'Du gissade ”': 'Du gjettet «',
        '” — titta på grafen …': '». Se på grafen …',
        'Rätt! Utslaget ökar.': 'Riktig! Utslaget øker.',
        'Rätt! Utslaget oförändrat — det är oförändrat.': 'Riktig! Utslaget er uendret.',
        'Rätt! Utslaget minskar.': 'Riktig! Utslaget minker.',
        'Inte riktigt — rätt svar är "Ökar".': 'Ikke helt: riktig svar er «Øker».',
        'Inte riktigt — rätt svar är "Oförändrat".': 'Ikke helt: riktig svar er «Uendret».',
        'Inte riktigt — rätt svar är "Minskar".': 'Ikke helt: riktig svar er «Minker».',
        'Rätt! Ökar': 'Riktig! Øker',
        'Rätt! Oförändrat': 'Riktig! Uendret',
        'Rätt! Minskar': 'Riktig! Minker',
        'Fel — rätt svar: Ökar': 'Feil. Riktig svar: Øker',
        'Fel — rätt svar: Oförändrat': 'Feil. Riktig svar: Uendret',
        'Fel — rätt svar: Minskar': 'Feil. Riktig svar: Minker',
        'Nästa förlopp': 'Neste forløp',
        'Rätt:': 'Riktige svar:',
        '— svit: {n}': ' ({n} på rad)',

        // Förklaringen under scenen
        'Så hänger det ihop': 'Slik henger det sammen',
        '"Flugan rör ju inte botten — då försvinner väl dess tyngd?"': '«Fluen rører jo ikke bunnen, så da forsvinner vel tyngden dens?»',
        'Nej. Kraftöverföring kräver inte kontakt med benen: flugans vingar accelererar luft nedåt (Newtons tredje lag — luften trycker upp flugan, flugan trycker ner luften), och i en sluten bägare måste hela det rörelsemängdsflödet till slut tas upp av botten och väggarna. Flugans tyngd går via luften i stället för via benen.':
            'Nei. Kraftoverføring krever ikke kontakt med beina: fluens vinger akselererer luft nedover (Newtons tredje lov: luften presser fluen opp, og fluen presser luften ned), og i et lukket beger må hele denne bevegelsesmengdestrømmen til slutt tas opp av bunnen og veggene. Fluens tyngde går via luften i stedet for via beina.',
        'Vågen visar systemets tyngd': 'Vekten viser systemets tyngde',
        'plus': 'pluss',
        'den totala rörelsemängdsändringen där inne:': 'den totale endringen i bevegelsesmengde der inne:',
        '. Hovrar flugan stationärt ändras ingen rörelsemängd — utslaget är exakt oförändrat. Accelererar flugan uppåt ökar utslaget med':
            '. Svever fluen stasjonært, endres ingen bevegelsesmengde, og utslaget er nøyaktig uendret. Akselererer fluen oppover, øker utslaget med',
        '; faller den fritt minskar det med': '; faller den fritt, minker det med',
        'Öppen eller sluten bägare är hela skillnaden.': 'Åpent eller lukket beger utgjør hele forskjellen.',
        'Sitter flugan djupt ner fångas nedsvepet in även utan lock. Hovrar den vid mynningen sprider sig luftstrålen ut i rummet — rörelsemängden hamnar på bordet i stället, och vågen tappar flugans tyngd. Infångningsfaktorn':
            'Sitter fluen dypt nede, fanges nedstrømmen opp også uten lokk. Svever den ved åpningen, sprer luftstrålen seg ut i rommet. Da havner bevegelsesmengden på bordet i stedet, og vekten mister fluens tyngde. Innfangingsfaktoren',
        'i avläsningarna visar exakt hur stor andel som stannar kvar.': 'i avlesningene viser nøyaktig hvor stor andel som blir igjen.',
        'Trycket som bär flugan är löjligt litet — några hundradels pascal utspritt över botten. Det är inte trycket som "känns", utan rörelsemängdsräkningen som bär hela beviset.':
            'Trykket som bærer fluen, er latterlig lite: noen hundredels pascal fordelt over bunnen. Det er ikke trykket som «merkes», men regnskapet for bevegelsesmengden som bærer hele beviset.',
        'Energi och rörelsemängd är olika saker:': 'Energi og bevegelsesmengde er forskjellige ting:',
        'flugan uträttar hela tiden arbete mot luften och luften värms en aning — men det påverkar inte kraftbalansen. Vågen mäter kraft, inte energi.':
            'fluen utfører hele tiden arbeid på luften, og luften varmes litt opp, men det påvirker ikke kraftbalansen. Vekten måler kraft, ikke energi.',
        'Jämför grafens två kurvor: den grå visar den': 'Sammenlign de to kurvene i grafen: den grå viser den',
        'verkliga kraften': 'faktiske kraften',
        'mot vågen — med vingslagens 200 Hz-rippel och de korta start- och landningsspikarna — medan den röda visar vad den dämpade':
            'mot vekten, med vingeslagenes rippel på 200 Hz og de korte toppene ved start og landing, mens den røde viser hva den dempede',
        'laboratorievågen': 'laboratorievekten',
        'hinner uppfatta. Vågen filtrerar bort alltihop, och det är därför man aldrig ser något hända i ett verkligt klassrumsförsök.':
            'rekker å fange opp. Vekten filtrerer bort alt sammen, og det er derfor man aldri ser noe skje i et virkelig klasseromsforsøk.',

        // Analogier
        'Samma fysik i andra kläder': 'Samme fysikk i andre klær',
        'Svävande magnet på en våg': 'Svevende magnet på en vekt',
        'Låt en magnet sväva över en platta som står på vågen. Ingen kontakt — men vågen visar ändå bådas tyngd. Kraften överförs genom magnetfältet precis som flugans tyngd överförs genom luften.':
            'La en magnet sveve over en plate som står på vekten. Det er ingen kontakt, men vekten viser likevel tyngden av begge. Kraften overføres gjennom magnetfeltet akkurat som fluens tyngde overføres gjennom luften.',
        'Fåglar i en sluten lastbil': 'Fugler i en lukket lastebil',
        'Den klassiska varianten: blir lastbilen lättare när alla fåglar i skåpet lyfter? Nej — så länge fåglarna hovrar trycker deras vingslag ner luften, som trycker mot golvet. Öppna flaket, så åker en del av nedsvepet ut och lastbilen blir faktiskt lite lättare.':
            'Den klassiske varianten: blir lastebilen lettere når alle fuglene i lasterommet letter? Nei. Så lenge fuglene svever, presser vingeslagene deres luften ned, og luften presser mot gulvet. Åpne lasterommet, så forsvinner en del av nedstrømmen ut, og lastebilen blir faktisk litt lettere.',
        'Helikopter i en silo': 'Helikopter i en silo',
        'Samma problem uppskalat: en helikopter som hovrar inne i en jättesilo på en våg ändrar inte utslaget. Hovrar den precis ovanför den öppna siloöppningen går rotorvinden ut över kanterna och utslaget sjunker. Öppet kontra slutet är hela skillnaden.':
            'Samme problem i større skala: et helikopter som svever inne i en kjempesilo på en vekt, endrer ikke utslaget. Svever det like over den åpne siloåpningen, går rotorvinden ut over kantene, og utslaget synker. Åpent kontra lukket utgjør hele forskjellen.',
        'Timglaset på vågen': 'Timeglasset på vekten',
        'Nära släkting med motsatt intuition: ett rinnande timglas väger inte mindre — under den stationära rinningen väger det till och med aningen':
            'En nær slektning med motsatt intuisjon: et timeglass som renner, veier ikke mindre. Mens sanden renner jevnt, veier det til og med litt',
        'mer': 'mer',
        ', eftersom sandpelarens masscentrum bromsas in mot högen där nere. Räkna gärna på det som fortsättningsfråga.':
            ', fordi massesenteret til sandsøylen bremses opp mot haugen der nede. Regn gjerne på det som et oppfølgingsspørsmål.',
        'Fisken i akvariet': 'Fisken i akvariet',
        'En fisk som simmar mitt i vattnet ändrar inte akvariets vikt. Där gör dessutom Arkimedes princip jobbet: fisken väger lika mycket som vattnet den tränger undan, så inte ens djupet spelar någon roll.':
            'En fisk som svømmer midt i vannet, endrer ikke hvor mye akvariet veier. Der gjør dessuten Arkimedes’ prinsipp jobben: fisken veier like mye som vannet den fortrenger, så ikke engang dybden spiller noen rolle.',

        // Modellens begränsningar
        'Modellens begränsningar': 'Begrensningene i modellen',
        'Det här är en fysikaliskt korrekt men förenklad modell — ingen strömningsberäkning (CFD). Lyftkraften kommer ur aktuatorskiveteori (luft accelereras nedåt genom vingarnas svepta yta), luftstrålens väg ner till botten beskrivs med en enda transporttid i stället för ett verkligt hastighetsfält, infångningsfaktorn':
            'Dette er en fysisk korrekt, men forenklet modell uten strømningsberegning (CFD). Løftekraften kommer fra aktuatorskiveteori (luft akselereres nedover gjennom arealet vingene sveiper over), luftstrålens vei ned til bunnen beskrives med én enkelt transporttid i stedet for et virkelig hastighetsfelt, innfangingsfaktoren',
        'är en fenomenologisk parameter, och turbulens saknas helt. Det som däremot är exakt är själva rörelsemängdsbokföringen: identiteten':
            'er en fenomenologisk parameter, og turbulens mangler helt. Det som derimot er eksakt, er selve regnskapet for bevegelsesmengden: identiteten',
        'uppfylls i varje tidssteg, och det är den som bär slutsatserna. Att diskutera var en modell gäller — och var den slutar gälla — är i sig fysik.':
            'er oppfylt i hvert tidssteg, og det er den som bærer konklusjonene. Å diskutere hvor en modell gjelder, og hvor den slutter å gjelde, er i seg selv fysikk.',

        // Sidopanelen i enkelt läge
        'Prova själv': 'Prøv selv',
        'Vågen är nollställd med bägare och luft, så displayen visar bara flugans bidrag, i milligram. Låt flugan lyfta och håll ögonen på siffran.':
            'Vekten er nullstilt med beger og luft, så displayet viser bare fluens bidrag, i milligram. La fluen lette og hold øye med tallet.',
        'Du kan också ta tag i flugan och dra den vart du vill: högre upp, ut över kanten och bort till bänken. Så länge den flyger kvar i bägaren står vågen still på flugans tyngd. Först när den lämnar bägaren sjunker utslaget.':
            'Du kan også ta tak i fluen og dra den dit du vil: høyere opp, ut over kanten og bort til benken. Så lenge den flyr inne i begeret, holder vekten seg på fluens tyngde. Først når den forlater begeret, synker utslaget.',
        'Byt till Avancerat läge för graf, förlopp, reglage, Förutsäg-utmaningar och hela rörelsemängdsbokföringen.':
            'Bytt til avansert modus for graf, forløp, kontroller, forutsigelsesoppgaver og hele regnskapet for bevegelsesmengden.',

        // Bokföringen
        'Bokföring': 'Regnskap',
        'Vågen visar': 'Vekten viser',
        'Flugans tyngd': 'Fluens tyngde',
        'Kontaktkraft mot vågen': 'Kontaktkraft mot vekten',
        'Luftens kraft mot botten och väggar': 'Luftens kraft mot bunn og vegger',
        'Läckage förbi mynningen': 'Lekkasje forbi åpningen',
        'Infångningsfaktor': 'Innfangingsfaktor',
        'Avvikelse': 'Avvik',
        'Impulsöverskott sedan start': 'Impulsoverskudd siden start',
        'Avvikelsen är alltid summan av flugans och luftens rörelsemängdsändring plus läckaget — masscentrumsatsen, uppfylld i varje tidssteg. Impulsöverskottet går mot noll över ett helt förlopp: ytorna över och under nollinjen tar ut varandra. Dra gärna i flugan direkt i scenen — i både höjd- och sidled: lyft den över kanten, ut ur bägaren och bort till bänken. Hovrar den utanför vågen, eller sätter sig på bordet, tappar vågen hela dess tyngd.':
            'Avviket er alltid summen av endringen i bevegelsesmengde for fluen og luften pluss lekkasjen. Det er massesentersetningen, oppfylt i hvert tidssteg. Impulsoverskuddet går mot null over et helt forløp: arealene over og under nullinjen opphever hverandre. Dra gjerne i fluen direkte i scenen, både i høyden og sidelengs: løft den over kanten, ut av begeret og bort til benken. Svever den utenfor vekten, eller setter den seg på bordet, mister vekten hele tyngden dens.',

        // Canvas: vågen och grafen
        'NOLLSTÄLL': 'NULLSTILL',
        'VÅG 0,1 mg': 'VEKT 0,1 mg',
        'övertryck max {p} Pa': 'overtrykk maks {p} Pa',
        'läckage {n} %': 'lekkasje {n} %',
        'VÅGENS UTSLAG': 'VEKTENS UTSLAG',
        'avvikelse från vilovärdet, i µN': 'avvik fra hvileverdien, i µN',
        'verklig kraft': 'faktisk kraft',
        'vågen avstängd': 'vekten avslått',
        'vågen visar': 'vekten viser',
        'fönster {w} s': 'vindu {w} s',

        // Canvas: enkelt läge
        'VÅGEN VISAR': 'VEKTEN VISER',
        'nollställd våg: bara flugans bidrag syns': 'nullstilt vekt: bare fluens bidrag vises',
        'Dra i flugan eller använd knapparna.': 'Dra i fluen eller bruk knappene.',
        'Du styr flugan.': 'Du styrer fluen.',
        'Släpp den där du vill att den ska hovra: inne i bägaren, ovanför kanten eller utanför.':
            'Slipp den der du vil at den skal sveve: inne i begeret, over kanten eller utenfor.',
        'Flugan sitter på bänken.': 'Fluen sitter på benken.',
        'Utanför vågen: utslaget har sjunkit med hela flugans tyngd.': 'Utenfor vekten: utslaget har sunket med hele fluens tyngde.',
        'Flugan sitter på botten.': 'Fluen sitter på bunnen.',
        'Vågen visar flugans tyngd.': 'Vekten viser fluens tyngde.',
        'Flugan sitter på vågen.': 'Fluen sitter på vekten.',
        'Samma utslag som nere i bägaren: den står fortfarande på vågen.': 'Samme utslag som nede i begeret: den står fortsatt på vekten.',
        'Flyger. Ingen skillnad i utslag!': 'Flyr. Ingen forskjell i utslaget!',
        'Vingarna trycker ner luften, och luften för tyngden vidare ner i bägaren.': 'Vingene presser luften ned, og luften fører tyngden videre ned i begeret.',
        'På väg ut ur bägaren.': 'På vei ut av begeret.',
        'En del av luftströmmen missar nu bägaren, och utslaget sjunker.': 'En del av luftstrømmen bommer nå på begeret, og utslaget synker.',
        'Utanför bägaren.': 'Utenfor begeret.',
        'Nedsvepet hamnar på bänken i stället. Vågen känner inte flugan längre.': 'Nedstrømmen havner på benken i stedet. Vekten merker ikke fluen lenger.',
        'Flugan faller.': 'Fluen faller.',
        'Utan lyftkraft når ingen tyngd vågen förrän den landar.': 'Uten løftekraft når ingen tyngde vekten før fluen lander.',

        // Canvas: förloppsstatus
        'Sitter på botten': 'Sitter på bunnen',
        'Avstamp — benen trycker ifrån': 'Fraspark: beina skyver fra',
        'Hoppar (inga fungerande vingar)': 'Hopper (ingen fungerende vinger)',
        'Faller fritt': 'Faller fritt',
        'Lyfter': 'Letter',
        'Hovrar — stationärt': 'Svever stasjonært',
        'Hovrar lågt': 'Svever lavt',
        'Hovrar högt': 'Svever høyt',
        'Dyker': 'Dykker',
        'Bromsar in': 'Bremser opp',
        'Fritt fall — vingarna står stilla': 'Fritt fall: vingene står stille',
        'Hovrar i mynningen': 'Svever i åpningen',
        'Landar': 'Lander',
        'Förloppet klart': 'Forløpet er ferdig',
        'Du styr flugan': 'Du styrer fluen',
        '— pausad': ' (pauset)',
        'ultrarapid 1/{n}': 'sakte film 1/{n}',
        'Uppspelning: {s}': 'Avspilling: {s}',
        'Avvikelse: {v}': 'Avvik: {v}',
        'flugans tyngd {a} µN — infångning f = {b} %': 'fluens tyngde {a} µN, innfanging f = {b} %',

        // Canvas: systemgränser (rad för rad, samma radlängd som svenskan)
        'Systemgräns: bara flugan. Tyngden m·g nedåt och': 'Systemgrense: bare fluen. Tyngden m·g nedover og',
        'lyftkraften T från luften uppåt. Vid hovring är T = m·g': 'løftekraften T fra luften oppover. Ved sveving er T = m·g,',
        '— luften bär flugan, och flugan trycker ner luften.': 'og luften bærer fluen mens fluen presser luften ned.',
        'Systemgräns: luften i bägaren. Flugan trycker ner luften': 'Systemgrense: luften i begeret. Fluen presser luften',
        'med T (blå), och luften trycker mot botten och väggarna': 'ned med T (blå). Luften presser på bunn og vegger med',
        'med rörelsemängdsflödet p/τ (turkos). Stationärt är de lika.': 'bevegelsesmengdestrømmen p/τ (turkis). Stasjonært er de like.',
        'Systemgräns: hela systemet — bägare, luft och fluga.': 'Systemgrense: hele systemet (beger, luft og flue).',
        'Bara två yttre krafter: tyngden M·g och normalkraften N': 'Bare to ytre krefter: tyngden M·g og normalkraften N',
        'från vågen. Så länge ingen rörelsemängd ändras där inne': 'fra vekten. Endres ingen bevegelsesmengde der inne,',
        'är N = M·g, oavsett vad flugan har för sig.': 'er N = M·g, uansett hva fluen holder på med.'
    });
})();
