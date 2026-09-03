/*
 * Fysiklabbet — Nyheter (dataset).
 *
 * Exponerar window.NYHETER: en array av nyhetsartiklar, NYAST FÖRST.
 * Renderas av nyheter.html (lista + enskild artikel via ?id=).
 *
 * Hur en artikel läggs till sköts av nyhetsagenten — se
 * .claude/agents/nyhetsagent.md samt kö/logg i .claude/nyheter/.
 *
 * Fält per artikel:
 *   id        – unik slug, formatet "ÅÅÅÅ-MM-DD-kort-titel" (= URL ?id=)
 *   date      – publiceringsdatum "ÅÅÅÅ-MM-DD"
 *   time      – (valfritt) publiceringsklockslag "HH:MM" på publiceringsdagen;
 *               artikeln döljs av datumgrinden tills klockslaget passerats
 *               (utelämnat = publiceras vid midnatt)
 *   title     – rubrik (svensk meningsform, inte title case)
 *   deck      – ingress (1–2 meningar, sammanfattar nyheten)
 *   category  – ett ord, t.ex. "Partikelfysik", "Kosmologi", "Kvantfysik"
 *   readingTime – t.ex. "4 min"
 *   image     – sökväg till huvudbild (nyheter/bilder/…). ALDRIG ett schema,
 *               en principskiss eller ett mätdiagram — huvudbilden är det
 *               enda läsaren ser i listan och i delningskortet, och ska vara
 *               ett foto/en äkta observationsbild/en illustration. Figurer ur
 *               studien läggs i stället som 'image'-block i body, med
 *               bildtext. Se .claude/agents/nyhetsagent.md, Bildregler punkt 1.
 *   imageAlt  – alt-text
 *   imageCredit – bildkälla/licens ELLER "Illustration: Fysiklabbet (AI-genererad)"
 *   tags      – array med nyckelord (gemener)
 *   sources   – array av { name, url } (nyhetskällor, ALLTID minst en)
 *   research  – { citation, url } direktlänk till originalforskningen (om möjlig), annars null
 *   larare    – (valfritt, UTVÄRDERAS) { moment: [{label, href?}], fragor: [str] }
 *               "För läraren"-ruta: 2–3 diskussionsfrågor och vilka moment
 *               nyheten hör till. Renderas UNDER källorna, alltså UTANFÖR
 *               artikeltexten — artikeln själv måste förbli fristående och
 *               får aldrig hänvisa till kurserna (se nyhetsagentens regler).
 *               Frågorna ska kräva resonemang, inte faktakoll: sikta på
 *               "varför fungerar vetenskapen så här", inte "vad stod det".
 *               `href` är valfri; utan den blir momentet bara en etikett.
 *               OBS: `fragor` och `label` renderas som REN TEXT — skriv
 *               literalt hårt mellanslag (U+00A0), aldrig `&nbsp;` (då syns
 *               entiteten bokstavligt på skärmen). Samma sak gäller `title`,
 *               `deck`, `imageAlt`, `imageCredit`, `research.citation`,
 *               h2-blockens `text`, faktarutans `title`, citatets `cite`
 *               samt bild-/videoblockens `alt` och `credit`. Endast fälten
 *               `html`, faktarutans `items` och bildtexternas `caption` är
 *               HTML — där hör `&nbsp;`, `<em>` och `<sup>` hemma.
 *   audio     – (valfritt) sökväg till en poddfil. Utelämnas oftast: lägg bara
 *               ljudfilen som nyheter/podd/<id>.<ext> så hittar spelaren den.
 *               Se nyheter/podd/README.md för det manuella NotebookLM-flödet.
 *   body      – array av block:
 *                 { type: 'p',    html: '…' }   stycke (inline-HTML: <em>, <a>, &nbsp; ok)
 *                 { type: 'h2',   text: '…' }   mellanrubrik
 *                 { type: 'quote',html: '…', cite: '…' }
 *                 { type: 'fact', title: '…', items: ['…', …] }   faktaruta
 *                 { type: 'image', src: 'nyheter/bilder/<id>-2.jpg',
 *                   alt: '…', caption: '…', credit: '…' }        bild i brödtexten
 *                 { type: 'video', src: 'media/video/<namn>.mp4',
 *                   poster: 'media/video/<namn>.jpg', ratio: '4:3',
 *                   title: '…', caption: '…', credit: '…', url: '…' }
 *                   inbäddat FRITT videoklipp i brödtexten. Används när
 *                   artikeln refererar till filmmaterial som är fritt
 *                   tillgängligt (public domain/CC) — läsaren ska kunna
 *                   titta direkt, inte behöva leta. src = självhostad mp4
 *                   (beställs via .github/videoorder.txt → media/video/,
 *                   FÖRSTAHANDSVALET — tredjeparts-iframes har visat sig
 *                   opålitliga i mobilen), poster = affischbild. Alternativt
 *                   embed = iframe-URL (archive.org/embed/<id> eller
 *                   youtube-nocookie.com/embed/<id>) när självhosting inte
 *                   går. ratio utelämnad = 16:9, url = extern länk till
 *                   originalet (visas som "Se filmen i original") — länka
 *                   DIREKT till filmens egen sida, inte till en startsida.
 *                   Bädda ALDRIG in upphovsrättsskyddat material — då används
 *                   i stället en vanlig <a>-länk i brödtexten. Blocket läggs
 *                   intill det ställe i artikeln som refererar till filmen.
 *                   Refererar en faktaruta filmen: lägg videon som fältet
 *                   `video: {…}` PÅ fact-blocket (samma fält som ovan) — då
 *                   renderas den inuti den vita rutan, direkt under
 *                   punkterna, i stället för som en lös figur under rutan.
 *                   Ange gärna BÅDE src och embed — embed är reserv som gör
 *                   att en äldre cachad nyheter.html också kan visa filmen.
 *
 * Flera bilder per artikel: har nyheten fler än en fri pressbild får (och bör)
 * de extra bilderna läggas in som 'image'-block mellan styckena i body. Den
 * första bilden ligger kvar i `image`/`imageAlt`/`imageCredit` (toppbild +
 * delningsbild). Extra bilder namnges `nyheter/bilder/<id>-2.jpg`, `-3.jpg` …
 * AI-genererade bilder skapas ENDAST när ingen fri riktig bild finns — och då
 * bara en enda (kostnad). Se .claude/agents/nyhetsagent.md, Bildregler.
 */
const NYHETER_ALL = [
  {
    id: "2026-09-03-fallet-som-aldrig-tar-slut",
    date: "2026-09-03",
    title: "Två sorters rubidium har fallit sida vid sida i 280 dygn — och ingen av dem kom först",
    deck: "Ombord på den kinesiska rymdstationen har ett 37 kilo tungt laboratorium släppt två isotoper om och om igen. Någon skillnad i deras fall går inte att se, precis som Einstein förutsade.",
    category: "Relativitetsteori",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-09-03-fallet-som-aldrig-tar-slut.jpg",
    imageAlt: "En astronaut i vit rymddräkt arbetar utanför den kinesiska rymdstationen, med de orangeröda solpanelerna och jorden i bakgrunden.",
    imageCredit: "Foto: China Manned Space Engineering Office (CC BY 4.0)",
    tags: ["relativitetsteori", "gravitation", "fritt fall", "ekvivalensprincipen", "tröghet", "massa", "atominterferometri", "rymdstation", "mekanik", "precisionsmätning"],
    sources: [
      { name: "Phys.org: Physicists test the weak equivalence principle in an orbiting space station", url: "https://phys.org/news/2026-09-physicists-weak-equivalence-principle-orbiting.html" },
      { name: "npj Microgravity: instrumentet ombord på rymdstationen", url: "https://www.nature.com/articles/s41526-023-00306-y" },
      { name: "Classical and Quantum Gravity: slutresultatet från MICROSCOPE", url: "https://iopscience.iop.org/article/10.1088/1361-6382/ac84be" }
    ],
    research: {
      citation: "Dan-Fang Zhang med flera, ”In-orbit test of the weak equivalence principle with atom interferometry”, Science Advances 12 (35), 2026. DOI 10.1126/sciadv.aeh4502",
      url: "https://doi.org/10.1126/sciadv.aeh4502"
    },
    body: [
      { type: 'p', html: 'Släpp en hammare och en fjäder samtidigt, och fjädern dröjer sig kvar i luften. Ta bort luften, och de landar i samma ögonblick. Det är en av fysikens äldsta och mest svårsmälta iakttagelser, och den demonstrerades på månen 1971 av astronauten David Scott inför en tv-kamera.' },
      { type: 'p', html: 'Att det stämmer ungefär är alltså avgjort sedan länge. Frågan som fysiker fortfarande ställer är hur exakt det stämmer. Hittar någon en dag två ämnen som faller olika fort, om än med en obetydlighet, faller en av grundstenarna under den allmänna relativitetsteorin — och då finns det något i naturen som ingen känner till.' },

      { type: 'h2', text: 'Två massor som råkar vara lika stora' },
      { type: 'p', html: 'Massan uppträder i två helt skilda roller. I Newtons andra lag, $F = m \\cdot a$, står den för trögheten: hur svårt det är att ändra ett föremåls rörelse. I tyngdkraften, $F_\\mathrm{G} = m \\cdot g$, står den i stället för hur hårt jorden drar. Det är två olika egenskaper, och ingenting säger på förhand att de ska mätas med samma tal.' },
      { type: 'p', html: 'Sätter man ihop de två sambanden för ett fallande föremål blir accelerationen $a = \\dfrac{m_\\mathrm{g}}{m_\\mathrm{t}} \\cdot g$, där $m_\\mathrm{g}$ är den tunga massan och $m_\\mathrm{t}$ den tröga. Är kvoten densamma för allt som finns faller allting lika fort, och massan försvinner helt ur ekvationen. Det påståendet kallas den svaga ekvivalensprincipen, och Einstein gjorde det till utgångspunkt i stället för till en tillfällighet.' },
      { type: 'p', html: 'Hur väl två ämnen håller sig till principen mäts med Eötvösparametern, accelerationsskillnaden delad med medelaccelerationen: $\\eta = \\dfrac{2(a_1 - a_2)}{a_1 + a_2}$. Faller de exakt lika fort blir $\\eta$ noll, och varje experiment sedan slutet av 1800-talet har fått just noll, med allt fler decimaler.' },

      { type: 'h2', text: 'Ett laboratorium som aldrig slutar falla' },
      { type: 'p', html: 'Problemet med fallförsök på jorden är att fallet tar slut. Även i ett tiotal meter högt falltorn hinner ett föremål bara vara i luften ett par sekunder, och noggrannheten växer snabbt med falltiden. Därför har fysiker länge velat flytta mätningen till en omloppsbana.' },
      { type: 'p', html: 'En vanlig missuppfattning är att tyngdkraften vore borta där uppe. Det är den inte. På den kinesiska rymdstationens höjd, drygt 400&nbsp;km, är tyngdaccelerationen fortfarande ungefär 8,7&nbsp;m/s<sup>2</sup>, nästan nio tiondelar av värdet vid marken. Skillnaden är att stationen, bänken, astronauterna och atomerna faller åt samma håll samtidigt och därför inte trycker mot varandra. Tyngdlösheten är ett fritt fall som aldrig når marken, eftersom stationen rör sig så fort i sidled att den ständigt missar jorden.' },
      { type: 'image', src: 'nyheter/bilder/2026-09-03-fallet-som-aldrig-tar-slut-2.jpg', alt: 'Den kinesiska rymdstationen fotograferad bakifrån mot svart rymd, med de två laboratoriemodulerna utsträckta åt var sitt håll från kärnmodulen.', caption: 'Rymdstationen sedd bakifrån. I en av laboratoriemodulerna står det skåp där fallförsöket sitter monterat.', credit: 'Foto: China Manned Space Engineering Office (CC BY 4.0)' },
      { type: 'p', html: 'Instrumentet är förvånansvärt litet: en låda på 46 × 33 × 26&nbsp;cm som väger omkring 37&nbsp;kg. Den sköts upp med rymdfarkosten Tianzhou-5 i november 2022 och monterades en månad senare in i stationens särskilda skåp för mikrogravitation. Skåpet är byggt för att dämpa skakningarna från fläktar, pumpar och besättning ner mot en tiomiljondel av tyngdaccelerationen vid marken, och det är det som gör mätningen möjlig: fallet ska störas av så lite som möjligt utom av tyngdkraften själv.' },

      { type: 'h2', text: 'Atomerna delas i två och läggs ihop igen' },
      { type: 'p', html: 'Det som släpps är inte hammare och fjäder utan två moln av rubidiumatomer: rubidium-85 och rubidium-87, alltså samma grundämne med olika många neutroner i kärnan. Molnen laserkyls till 6,6 respektive 4,5 miljondels grader över den absoluta nollpunkten, vilket får atomerna att röra sig så långsamt att de beter sig som vågor.' },
      { type: 'p', html: 'Sedan får varje moln, ungefär 300 miljoner atomer, en serie korta laserpulser. Den första delar molnet så att det tar två vägar samtidigt, en andra vänder tillbaka delarna, och en tredje lägger ihop dem igen. Har vägarna varit exakt likvärdiga hamnar atomerna i ett bestämt tillstånd; har den ena accelererat det allra minsta annorlunda syns det som en förskjutning i mönstret. Delningen varar 50 millisekunder, och samma laserstråle betjänar båda isotoperna, så att skakningar och laserbrus stör mätningarna lika mycket och räknas bort när skillnaden tas fram.' },
      { type: 'p', html: 'Under 280 dygn samlades över 9&nbsp;700 par av sådana mönster in. Facit blev $\\eta = (-2{,}7 \\pm 4{,}7) \\cdot 10^{-7}$ — med andra ord noll, inom mätosäkerheten. De två isotoperna föll lika fort så långt instrumentet kan se, och det är tusen gånger noggrannare än vad tidigare atomförsök i tyngdlöshet har mäktat med.' },

      { type: 'h2', text: 'Ändå långt kvar till rekordet' },
      { type: 'p', html: 'Här är det värt att vara noggrann med vad som faktiskt har slagits. Det här är inte världens känsligaste test av ekvivalensprincipen, inte i närheten. Torsionsvågar på marken når ner till <span style="white-space:nowrap">10<sup>−13</sup></span>, en atominterferometer i ett tio meter högt falltorn vid Stanford nådde <span style="white-space:nowrap">10<sup>−12</sup></span>, och den franska satelliten MICROSCOPE vägde 2022 en platinavikt mot en titanvikt och kom ner till <span style="white-space:nowrap">10<sup>−15</sup></span>. Det nya resultatet är miljontals gånger grövre än det bästa som finns.' },
      { type: 'p', html: 'Forskarlaget skriver det själva rakt ut: mätningen är i första hand ett principbevis. Poängen är att en atominterferometer, som annars kräver ett tungt optiskt bord och ständig omjustering, har gått att driva i knappt ett år i omloppsbana med lasrar, vakuumkammare och magnetfällor intakta.' },
      { type: 'p', html: 'Målet ligger långt fram: en noggrannhet kring <span style="white-space:nowrap">10<sup>−17</sup></span>, hundra gånger bättre än MICROSCOPE. Dit krävs tre saker som laget pekar ut. En farkost som skärmas från luftmotstånd och strålningstryck så att den verkligen bara faller. Ännu kallare atommoln. Och framför allt en delning som varar sekunder i stället för hundradelar — vilket är just det tyngdlöshet är bra för, och just det som ingen ännu har visat sig klara där uppe.' },
      { type: 'p', html: 'Hittar någon på den nivån ett $\\eta$ som inte är noll vore det den första sprickan i den allmänna relativitetsteorin på hundra år, och en tråd att dra i för alla som letar efter en femte naturkraft. Fortsätter det bli noll är också det ett besked: då har en av fysikens djärvaste förenklingar hållit i ytterligare tio decimaler.' },

      { type: 'fact', title: 'Talen bakom försöket', items: [
        'Fallande ämnen: rubidium-85 och rubidium-87, kylda till 6,6 respektive 4,5 miljondels grader över absoluta nollpunkten.',
        'Antal atomer per försök: omkring 340 respektive 290 miljoner.',
        'Tid som varje atommoln går två vägar samtidigt: 50&nbsp;ms.',
        'Mätperiod: 280 dygn, mer än 9&nbsp;700 par av interferensmönster.',
        'Uppmätt kvarvarande acceleration längs mätriktningen under försöket: (2,7 ± 0,6)&nbsp;·&nbsp;10<sup>−4</sup>&nbsp;m/s<sup>2</sup>.',
        'Resultat: Eötvösparametern (−2,7 ± 4,7)&nbsp;·&nbsp;10<sup>−7</sup>, alltså förenlig med noll.'
      ] },

      { type: 'p', html: 'Studien publicerades i <em>Science Advances</em> den 28 augusti 2026 av 25 forskare vid Chinese Academy of Sciences institut för precisionsmätning i Wuhan, med Ming-Sheng Zhan som ansvarig.' }
    ]
  },
  {
    id: "2026-09-02-solljuset-som-flatar-samman",
    date: "2026-09-02",
    title: "Alla var överens om att det krävdes en laser — nu har vanligt solljus fått fotoner att flätas samman",
    deck: "Solljus är rörigt ljus: alla färger på en gång, alla riktningar, ingen ordning i tiden. Ändå har ett lag från Ottawa och Erlangen fått det att klyva fotoner inne i en kristall, och paren som kom ut klarade det test som skiljer kvantfysiken från all vardaglig fysik.",
    category: "Kvantfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-09-02-solljuset-som-flatar-samman.jpg",
    imageAlt: "En man sitter utomhus på en gräsplan bredvid ett svart mörkläggningstält. Intill honom står ett stort fyrkantigt linsplan monterat på ett motoriserat stativ, riktat mot solen. Runt omkring står blå avspärrningsstaket och höstgula träd.",
    imageCredit: "Foto: Jasvinder Brar, Max-Planck-Institut für die Physik des Lichts. Cheng Li vid försöksuppställningen utomhus; fresnellinsen sitter på en solföljande motor och detektorerna står i mörkläggningstältet.",
    tags: ["kvantfysik", "kvantsammanflätning", "foton", "optik", "polarisation", "solljus", "koherens", "bells olikhet", "nedkonvertering", "kvantkryptering"],
    sources: [
      { name: "Optica — Researchers generate quantum entanglement using sunlight (pressmeddelande 6 augusti 2026)", url: "https://www.optica.org/about/newsroom/news_releases/2026/researchers_generate_quantum_entanglement_using_sunlight/" },
      { name: "Physics World — Researchers harness sunlight to generate quantum entanglement (25 augusti 2026)", url: "https://physicsworld.com/a/researchers-harness-sunlight-to-generate-quantum-entanglement/" },
      { name: "Max-Planck-Institut für die Physik des Lichts — Quantum entanglement generated by sunlight for the first time", url: "https://www.mpl.mpg.de/news/article/quantum-entanglement-generated-by-sunlight-for-the-first-time" },
      { name: "Phys.org — Sunlight-powered setup generates quantum entanglement", url: "https://phys.org/news/2026-08-sunlight-powered-setup-generates-quantum.html" }
    ],
    research: {
      citation: "Cheng Li, Jasvinder Brar, Michael Küblböck, Jeremy Upham, Hanieh Fattahi, Robert W. Boyd, ”Generating quantum entanglement from sunlight”, Optica 13, 1508–1514 (2026), DOI 10.1364/OPTICA.601797. Förhandsversion: arXiv:2602.15655.",
      url: "https://doi.org/10.1364/OPTICA.601797"
    },
    body: [
      { type: 'p', html: 'Receptet på sammanflätade fotoner har sett likadant ut i decennier. Ta en laser, skicka strålen genom en kristall av rätt sort och vänta. Då och då försvinner en foton ur strålen, och två nya dyker upp i dess ställe med ungefär halva energin var. De två är från den stunden bundna till varandra på ett sätt som ingen vardaglig fysik kan efterlikna: mäter man den ena är svaret för den andra avgjort i samma ögonblick.' },
      { type: 'p', html: 'Processen kallas spontan parametrisk nedkonvertering, och lasern har hela tiden ansetts oumbärlig. Nu har ett lag från University of Ottawa och Max-Planck-Institut für die Physik des Lichts i Erlangen bytt ut den mot solen. Arbetet är publicerat i tidskriften <em>Optica</em>.' },
      { type: 'h2', text: 'Var sammanflätningen egentligen sitter' },
      { type: 'p', html: 'Klyvningen styrs av energiprincipen. En foton bär energin $E = \\dfrac{h \\cdot c}{\\lambda}$, alltså mer ju kortare våglängden är. I försöket plockades ett smalt band blått ljus ut kring våglängden 405&nbsp;nm, där varje foton bär omkring 3,1&nbsp;eV. Ur kristallen kom fotoner med våglängden 810&nbsp;nm, dubbelt så lång och därmed med halva energin, 1,5&nbsp;eV. Två sådana går precis jämnt ut mot den blå foton som försvann. Ingenting skapas, ingenting förloras.' },
      { type: 'p', html: 'Skälet till att alla utgick från en laser är att solljus saknar det som kallas koherens. Laserns vågtoppar går i takt, både i rummet och i tiden. Solljuset gör motsatsen: färgerna är blandade, riktningarna är blandade, och fasen kastas om hela tiden. Just den oredan antogs slå sönder sammanflätningen.' },
      { type: 'p', html: 'Lagets nyckelinsikt är att oredan sitter i fel egenskaper. Sammanflätningen som byggs upp här ligger nämligen i fotonernas polarisation, alltså i vilket plan ljusets elektriska fält svänger, och den egenskapen går att städa upp för sig. Ett polarisationsfilter gör solljus lika välordnat i svängningsriktning som en laserstråle, hur rörigt det än förblir i färg och riktning.' },
      { type: 'quote', html: 'Så länge pumpstrålen är perfekt polariserad borde dess spatiala eller temporala inkoherens inte hindra att polarisationssammanflätning uppstår.', cite: 'Cheng Li, University of Ottawa (översatt från engelska)' },
      { type: 'h2', text: 'En lins stor som ett fönster och en kon av glas' },
      { type: 'p', html: 'Den praktiska svårigheten är en annan: solljus är utspätt. För att få tillräckligt många fotoner ner i en kristall som är några millimeter stor byggde Hanieh Fattahis grupp en samlare helt i glas. Ytterst sitter en fresnellins på 1&nbsp;m&nbsp;×&nbsp;1,4&nbsp;m, alltså en ljusinsamlande yta på 1,4&nbsp;m², monterad på en motor som följer solen över himlen.' },
      { type: 'p', html: 'Ljuset går sedan genom ett filter som släpper fram ett band på bara 1,5&nbsp;nm kring 405&nbsp;nm, och vidare in i en massiv kon av kvartsglas: 69&nbsp;mm lång, 23&nbsp;mm i inloppet och 1,5&nbsp;mm i utloppet. Inne i konen studsar ljuset mot glasets insida genom totalreflexion och trängs ihop mot spetsen. Där väntar en optisk fiber med 50&nbsp;mikrometers kärna, ungefär hälften så bred som ett hårstrå, som leder det sista stycket fram till kristallen.' },
      { type: 'image', src: 'nyheter/bilder/2026-09-02-solljuset-som-flatar-samman-2.jpg', alt: 'Illustration i rymdmiljö. En rund lins ovanför jordklotet samlar solljus i en blå stråle, som går genom en kon in i en mörk kristallkub. Ur kubens andra sida kommer två röda strålar, sammanbundna av en lysande åtta.', caption: 'Konstnärlig gestaltning av principen: solljus samlas in, koncentreras genom en kon och klyvs i kristallen till par av fotoner som hör ihop. Tanken är att en satellit skulle kunna göra sina krypteringsnycklar av det solljus som ändå finns.', credit: 'Illustration: Florian Sterl, via Optica.' },
      { type: 'p', html: 'Kristallen är 10&nbsp;mm lång och av typen ppKTP, kaliumtitanylfosfat med en inbyggd periodisk struktur som gör att klyvningen samlar sig i rätt riktning. Den sitter inne i en ringformad uppställning, en så kallad Sagnacinterferometer, där ljuset går varvet runt åt båda hållen samtidigt. Det är den konstruktionen som gör att fotonparen kommer ut i ett sammanflätat polarisationstillstånd i stället för i ett bestämt.' },
      { type: 'p', html: 'Effekten som till slut nådde kristallen var 100–200&nbsp;nW. Det är ungefär tiotusendelen av en laserpekare.' },
      { type: 'h2', text: 'Provet är en olikhet från 1964' },
      { type: 'p', html: 'Att två fotoner ger samma svar när man mäter dem bevisar ingenting i sig. Två strumpor ur samma par är också alltid lika, utan minsta kvantfysik inblandad. Skillnaden syns först när man mäter i flera olika riktningar och jämför hur starka sambanden är. John Bell visade 1964 att varje förklaring där fotonerna bär med sig färdiga, hemliga svar har ett tak för hur starka de sambanden kan bli. Gränsen kallas Bells olikhet. Sammanräknat i ett tal $S$ kommer en sådan förklaring aldrig över $S = 2$. Kvantmekaniken tillåter upp till $S = 2\\sqrt{2} \\approx 2{,}83$.' },
      { type: 'p', html: 'Solljusparen hamnade på $S = 2{,}54 \\pm 0{,}22$. Taket är alltså passerat, men marginalen är blygsam: överskridandet är knappt två och en halv gånger mätosäkerheten. Tillståndets överensstämmelse med det eftersträvade sammanflätade tillståndet mättes samtidigt till 0,939&nbsp;±&nbsp;0,027, alltså knappt 94&nbsp;procent. Varje mätpunkt fick två minuter, och två detektorutslag räknades som ett par om de kom inom en nanosekund från varandra.' },
      { type: 'p', html: 'Utbytet var magert i absoluta tal. Räknat per milliwatt pumpeffekt registrerade uppställningen omkring 1&nbsp;600 par i sekunden, vilket med de dryga hundra nanowatt som fanns att tillgå betyder att detektorerna tickade i storleksordningen ett par var fjärde sekund. Men just den jämförelsen är den viktiga: normerad mot pumpeffekt och bandbredd ligger solljusets utbyte i nivå med laserns. Solen är inte en sämre pumpkälla, bara en svagare.' },
      { type: 'h2', text: 'Tältet, motorn och klockan tre på natten' },
      { type: 'p', html: 'Att flytta ut ett kvantoptiskt försök på en gräsplan medför problem som inget optiskt bord har. Uppställningen måste följa solen hela tiden, den påverkas av vind och temperatur, och framför allt dränks enstaka fotoner lätt i vanligt dagsljus. Till en början löstes det med schemat: studenterna började mäta vid tretiden på natten för att utnyttja mörkret. Först senare byggdes detektordelen in i ett mörkläggningstält.' },
      { type: 'p', html: 'Nästa steg blir att packa ihop alltsammans till något som tål att stå ute på riktigt. Att bygga in delarna i varandra i stället för att ställa dem bredvid varandra väntas ge både stabilare mekanik och bättre verkningsgrad.' },
      { type: 'p', html: 'Lockelsen ligger i vad man slipper. En laser i en satellit måste förses med ström, kylas och hållas i gång, och varje sådan del är något som kan gå sönder. Solljus finns redan där, gratis och utan avbrott.' },
      { type: 'quote', html: 'Solljus är en riklig och pålitlig resurs i många miljöer, särskilt i rymden. Att kunna alstra kvantsammanflätade fotoner direkt ur solljus skulle kunna ge enklare och mer motståndskraftiga kvantsystem för satelliter och framtida rymdfärder.', cite: 'Hanieh Fattahi, Max-Planck-Institut für die Physik des Lichts (översatt från engelska)' },
      { type: 'fact', title: 'Visste du?', items: [
        'Klyvningen är sällsynt. I en vanlig uppställning blir bara någon foton på miljontals till ett par; resten går rakt igenom kristallen utan att något händer.',
        'En fresnellins är en vanlig lins som delats upp i ringar och plattats till. Den fungerar optiskt ungefär som en tjock lins men väger en bråkdel, och togs fram för fyrarnas skull på 1820-talet.',
        'Filtret släppte fram ett band på 1,5&nbsp;nm ur solljusets omkring 300&nbsp;nm breda synliga spektrum. Långt över 99&nbsp;procent av det insamlade ljuset kastades alltså bort innan det ens nådde kristallen.',
        'Kvantkryptering bygger på att sammanflätade par inte går att avlyssna obemärkt. En tjuvlyssnare måste mäta, och en mätning förstör tillståndet på ett sätt som avsändare och mottagare kan upptäcka när de jämför en del av sina resultat.'
      ] }
    ]
  },
  {
    id: "2026-09-01-hundra-ganger-vidare-blick",
    date: "2026-09-01",
    title: "Samma spegel som Hubble men hundra gånger vidare blick — Roman ska mäta hur klumpig den mörka materien är",
    deck: "NASA:s nya rymdteleskop lämnade Kennedy Space Center i söndags och är på väg mot en punkt 1,5 miljoner kilometer från jorden. Frågan det ska svara på är inte om den mörka materien finns, utan vad den består av — och det avgörs av hur tidigt materien hann klumpa ihop sig.",
    category: "Astronomi",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-09-01-hundra-ganger-vidare-blick.jpg",
    imageAlt: "En Falcon Heavy-raket syns som en smal mörk silhuett rakt framför solskivan under uppstigningen. Avgasstrålen böjer sig i ett brett, gnistrande band nedåt genom gyllene moln.",
    imageCredit: "Foto: NASA/John Kraus",
    tags: ["astronomi", "kosmologi", "mörk materia", "mörk energi", "teleskop", "gravitationslinsning", "lagrangepunkt", "gravitation", "cirkulär rörelse", "infrarött", "rymdfart", "fysik 1", "fysik 2"],
    sources: [
      { name: "NASA — presskit för Nancy Grace Roman Space Telescope (augusti 2026)", url: "https://assets.science.nasa.gov/content/dam/science/missions/rst/education/aug%20Roman%20Press%20Kit-508compliant.pdf" },
      { name: "NASA — Roman-bloggen: uppskjutningen den 30 augusti 2026", url: "https://science.nasa.gov/blogs/roman/2026/08/30/nasas-roman-space-telescope-launches/" },
      { name: "NASA — uppdragssidan för Roman", url: "https://science.nasa.gov/mission/roman-space-telescope/" },
      { name: "Caltech/IPAC — Wide Field Instrument, tekniska data", url: "https://roman.ipac.caltech.edu/page/wfi" },
      { name: "Space.com — direktrapportering från uppskjutningen", url: "https://www.space.com/news/live/nancy-grace-roman-telescope-live-updates-nasa-readies-roman-for-launch-august-30-2026" }
    ],
    research: {
      citation: "Roman Observations Time Allocation Committee, ”Final Report and Recommendations”, NASA (24 april 2025) — rapporten som fastställde omfattningen på Romans tre kärnundersökningar",
      url: "https://roman.gsfc.nasa.gov/science/ccs/ROTAC-Report-20250424-v3.pdf"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 3.5 Gravitationslagen", href: "katalog.html?id=fy1-3.5" },
        { label: "Fysik nivå 2 · 1.6 Energi och gravitation i cirkelbanor", href: "katalog.html?id=fy2-1.6" },
        { label: "Fysik nivå 2 · 5.1 Universums struktur", href: "katalog.html?id=fy2-5.1" }
      ],
      fragor: [
        "En punkt som L2 finns bara därför att två himlakroppars dragning råkar summera till precis den centripetalacceleration ett varv om året kräver. Vad händer med ett föremål som placeras en bit vid sidan av punkten, och varför måste ett teleskop där ändå tända motorerna med jämna mellanrum?",
        "Roman mäter inte den mörka materien direkt, utan hur ljuset från miljardtals galaxer böjs på vägen hit. Vad är det egentligen som mäts i ett sådant försök, och vilka antaganden om galaxernas naturliga former måste hålla för att slutsatsen ska gälla?",
        "Är partiklarna i den mörka materien lätta och snabba hinner de rusa ur de minsta gravitationsgroparna innan något samlats där. Hur kan tidpunkten för när de första strukturerna bildades då fungera som en mätning av en partikels massa?"
      ]
    },
    body: [
      { type: 'p', html: 'Klockan 13.26 svensk tid i söndags lyfte en Falcon Heavy från startplatta 39A vid Kennedy Space Center i Florida. Raketens första steg består av tre sammankopplade kärnor med sammanlagt 27 motorer, och de två yttre stängde av sina motorer efter två och en halv minut och vände tillbaka mot marken för att landa nära startplatsen. Trettioen minuter efter lyftet släppte översta steget sin last: Nancy Grace Roman-teleskopet, uppkallat efter NASA:s första chefsastronom.' },
      { type: 'p', html: 'Därmed började en tre månader lång driftsättning. Först ut är solpanelerna och solskyddet, därefter antennen och locket framför optiken, och ett par veckor in i resan väcks huvudinstrumentet. Nya bilder väntas i början av 2027.' },
      { type: 'quote', html: 'När det väl lyfter kommer det att göra sådant som i dag är omöjligt.', cite: 'Shawn Domagal-Goldman, chef för NASA:s astrofysikavdelning, vid en presskonferens i juli' },

      { type: 'h2', text: 'Platsen där jorden hjälper till att hålla takten' },
      { type: 'p', html: 'Målet är L2, den andra lagrangepunkten i systemet sol–jord: en plats ungefär 1,5&nbsp;miljoner kilometer från oss, rakt bort från solen sett. Det är nästan fyra gånger så långt som till månen, och samma trakt som James Webb-teleskopet håller till i.' },
      { type: 'p', html: 'Att en sådan plats alls finns följer av två samband. Ett föremål i cirkelbana kring solen behöver en centripetalacceleration som gravitationen ska stå för, och ju längre ut man kommer, desto svagare blir dragningen och desto längre tid tar ett varv. Ett ensamt föremål 1,5&nbsp;miljoner kilometer utanför jordbanan skulle behöva knappt 371 dygn på sitt varv, alltså drygt fem dygn mer än jorden. Det skulle sacka efter och lämnas kvar.' },
      { type: 'p', html: 'Men där ute drar jorden också, åt exakt samma håll som solen. Lägger man ihop de två dragningarna räcker de precis till ett varv på ett år:' },
      { type: 'p', html: '$$\\dfrac{G \\cdot M_{\\mathrm{sol}}}{(R + d)^2} + \\dfrac{G \\cdot M_{\\mathrm{jord}}}{d^2} = \\dfrac{4\\pi^2 (R + d)}{T^2}$$' },
      { type: 'p', html: 'Här är $R$ avståndet sol–jord, $d$ avståndet jord–teleskop och $T$ ett år. Löser man ut $d$ hamnar man på ungefär $1{,}5 \\cdot 10^{9}\\ \\mathrm{m}$. Där, och bara där, följer teleskopet jorden runt solen utan att halka efter, och det behöver nästan inget bränsle för att stanna kvar.' },
      { type: 'p', html: 'Läget har ett andra skäl. Roman ser i infrarött ljus, och infraröda teleskop störs av allt varmt i närheten, eftersom värme lyser i just det området. Från L2 ligger solen, jorden och månen åt samma håll, så ett enda solskydd räcker för att hålla dem alla utanför synfältet.' },
      { type: 'image', src: 'nyheter/bilder/2026-09-01-hundra-ganger-vidare-blick-2.jpg', alt: 'Rymdteleskopet står upprätt i en renrumshall med hopfällda, kopparfärgade solpaneler överst och silverglänsande värmeisolering nedanför. På var sida står de två svarta halvorna av raketens noskåpa uppställda i blå ställningar.', caption: 'Roman i renrummet vid Kennedy Space Center den 21 augusti, strax innan raketens noskåpa slöts om teleskopet. Solpanelerna sitter hopfällda överst.', credit: 'Foto: NASA/Sydney Rohde' },

      { type: 'h2', text: 'Samma spegel, en helt annan blick' },
      { type: 'p', html: 'Huvudspegeln är 2,4&nbsp;meter bred, exakt lika stor som Hubbles och därför lika skarpsynt. Den väger däremot bara 186&nbsp;kilogram, mindre än en fjärdedel av föregångarens.' },
      { type: 'p', html: 'Skillnaden sitter i synfältet. Varje exponering täcker 0,281&nbsp;kvadratgrader, alltså drygt en fullmånes yta på himlen, och det är minst hundra gånger mer än Hubble fångar i ett svep. Bakom optiken sitter 18 detektorer, var och en stor som ett saltkex och med 16,8&nbsp;miljoner bildpunkter: sammanlagt 300&nbsp;megapixel som känner ljus mellan 0,48 och 2,3&nbsp;mikrometer, alltså från gränsen till det synliga och en bit in i det infraröda.' },
      { type: 'p', html: 'Det ger data i mängder. Varje dygn skickas 1,4&nbsp;terabyte ner till markstationer i New Mexico, Australien och Japan, och under de fem år som är uppdragets grundplan väntas det bli 20&nbsp;petabyte. Allt släpps fritt så snart det behandlats, utan någon period då den som beställt mätningen har ensamrätt.' },

      { type: 'h2', text: 'Frågan är inte om, utan hur klumpig' },
      { type: 'p', html: 'Allt som lyser, alltså stjärnor, gas och galaxer, utgör bara ungefär en femtedel av materien i universum. Resten drar men syns inte, och den enda tråd som leder dit är just dragningen.' },
      { type: 'p', html: 'Massa kröker rummet, och ljus som passerar nära en tung ansamling böjs av. Bakgrundsgalaxernas former dras därför ut med någon enstaka procent. På en enskild galax går det inte att se, eftersom galaxer har vitt skilda former från början, men mäter man en miljard av dem framträder ett mönster av grannar som lutar systematiskt åt samma håll. Ur mönstret går massan att räkna baklänges, också den del som aldrig lyser.' },
      { type: 'p', html: 'Det verkligt intressanta är när klumparna bildades. Består den mörka materien av tunga, tröga partiklar faller de lätt ner i minsta lilla gravitationsgrop: små strukturer bildas tidigt och växer sedan samman till stora. Är partiklarna i stället lätta och snabba rusar de ur groparna igen innan något hunnit samlas där, ungefär som en het gas vägrar att dra ihop sig, och de minsta klumparna blir aldrig av. Då dröjer galaxbildningen.' },
      { type: 'p', html: 'Roman ska därför göra den mest detaljerade tredimensionella kartan hittills över var materien finns och när den samlades. Den största av de tre kärnundersökningarna täcker 5&nbsp;100&nbsp;kvadratgrader, ungefär 12&nbsp;% av himlen, och mäter läge och form hos mer än en miljard galaxer tillbaka till en tid då universum var omkring två miljarder år gammalt. Tidpunkten för strukturernas framväxt blir på så sätt ett mått på vad partikeln väger och hur fort den rör sig, utan att någon någonsin ser en enda av dem.' },
      { type: 'p', html: 'Samma bilder bär dessutom på svaret till en andra fråga. Genom att fånga exploderande stjärnor av typen Ia, som alla lyser ungefär lika starkt och därför fungerar som avståndsmätare, och genom att mäta de ringar i galaxfördelningen som tryckvågor i det tidiga universums plasma lämnade efter sig, ska Roman följa hur utvidgningen ändrat takt. Den mörka materien drar ihop, den mörka energin trycker isär, och båda avtecknar sig i samma karta.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Med allt utfällt är Roman 12,7&nbsp;meter långt och väger omkring 8&nbsp;000&nbsp;kilogram, ungefär som en turistbuss.',
        'De 1,4&nbsp;terabyten per dygn är den största datamängden från något NASA-uppdrag inom astrofysiken hittills.',
        'Ingen kan i dag serva ett teleskop vid L2, men Roman är ändå byggt för att kunna tankas. Det är bränslet som sätter gränsen för hur länge det kan arbeta.',
        'Vid sidan av den mörka materien väntas uppdraget hitta omkring 100&nbsp;000 nya planeter kring andra stjärnor.'
      ] }
    ]
  },
  {
    id: "2026-08-31-spinnvagor-i-rorelse",
    date: "2026-08-31",
    title: "Vågen går rakt genom magneten utan att flytta en enda atom — nu har den fångats ner till 67 nanometers våglängd",
    deck: "En spinnvåg är en krusning i atomernas magnetiska riktningar, och den skulle kunna bära information genom ett material utan att någon ström flyter. Ett europeiskt forskarlag har byggt en röntgenmetod som avbildar sådana vågor direkt, och såg då en process som ingen hade sett förut.",
    category: "Magnetism",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-31-spinnvagor-i-rorelse.jpg",
    imageAlt: "En svart, spegelblank kristall med många plana fasetter, fotograferad mot vit bakgrund. Kristallen är ungefär formad som en tillplattad kula och har några små röda fläckar kvar på ytan.",
    imageCredit: "Foto: Krizu / Wikimedia Commons (CC BY-SA 3.0). Bilden visar en enkristall av yttriumjärngranat, samma material som filmen i försöket var gjord av.",
    tags: ["magnetism", "magnon", "spinnvåg", "vågor", "spinn", "yttriumjärngranat", "röntgenstrålning", "synkrotron", "diffraktion", "materialfysik", "parametrisk resonans"],
    sources: [
      { name: "Physics World — X-ray camera catches spin waves in the act (augusti 2026)", url: "https://physicsworld.com/a/x-ray-camera-catches-spin-waves-in-the-act/" },
      { name: "Max-Born-Institut — Magnon momentum microscopy: a new window into nanoscale spin-wave physics", url: "https://mbi-berlin.de/research/highlights/details/magnon-momentum-microscopy-a-new-window-into-nanoscale-spin-wave-physics" },
      { name: "Helmholtz-Zentrum Berlin — pressmeddelande 8 juni 2026", url: "https://www.helmholtz-berlin.de/pubbin/news_seite?nid=34186&sprache=en&seitenid=" },
      { name: "EPFL — A new window into the hidden world of spin waves", url: "https://actu.epfl.ch/news/a-new-window-into-the-hidden-world-of-spin-waves/" }
    ],
    research: {
      citation: "Steffen Wittrock, Christopher Klose, Salvatore Perna, Korbinian Baumgaertl, Andrea Mucchietto, Michael Schneider, Josefin Fuchs, Victor Deinhart, Tamer Karaman, Dirk Grundler, Stefan Eisebitt, Bastian Pfau, Daniel Schick, ”Soft-X-ray momentum microscopy of nonlinear magnon interactions”, Nature Physics 22, 1160–1165, publicerad online 5 juni 2026, DOI 10.1038/s41567-026-03318-z (CC BY 4.0). Förhandsversion: arXiv:2504.20958v3 (CC BY 4.0).",
      url: "https://doi.org/10.1038/s41567-026-03318-z"
    },
    body: [
      { type: 'p', html: 'Inuti en magnet är varje atom en liten magnet i sig, med en egen riktning. I ett välordnat material pekar de alla åt samma håll. Rubbar man en enda av dem så att den börjar vackla drar den med sig sina grannar, och vacklandet vandrar vidare genom materialet som en krusning på vatten. Ingen atom flyttar sig någonstans. Det som färdas är riktningen.' },
      { type: 'p', html: 'Krusningen kallas spinnvåg, och precis som ljuset kommer i portioner som heter fotoner kommer den i portioner som heter magnoner. På senare år har de blivit en av de mer lovande idéerna för att bygga kretsar som klarar sig utan ström: en signal som bärs av magnoner flyttar ingen laddning, och då uppstår inte heller den värme som tvingar fram fläktar och kylflänsar i varje dator.' },
      { type: 'h2', text: 'Problemet har varit att se dem' },
      { type: 'p', html: 'Haken är att de mest intressanta spinnvågorna är korta och snabba. Ju kortare våglängd, desto mer styrs vågen av de utbyteskrafter som håller grannatomernas riktningar samman, och desto närmare magnetismens egen kärna kommer man. Men strax under hundra nanometer tar mätmetoderna slut. Optiska metoder begränsas av ljusets egen våglängd, som är många gånger längre än den våg man vill mäta. Röntgenmikroskop som ritar upp vågen punkt för punkt begränsas i stället av sina linser och av hur korta ljusblixtar de kan leverera.' },
      { type: 'p', html: 'Ett lag lett från Max Born-institutet i Berlin, tillsammans med Helmholtz-Zentrum Berlin, universitetet Federico&nbsp;II i Neapel och EPFL i Lausanne, har nu tagit en annan väg. I stället för att rita upp vågen där den befinner sig mäter de på en gång vilka våglängder och riktningar som finns i provet. Resultatet publicerades i <em>Nature Physics</em>.' },
      { type: 'h2', text: 'Läs av avtrycket i stället för vågen' },
      { type: 'p', html: 'Metoden vilar på en gammal idé. En spinnvåg gör materialets magnetisering periodiskt olika på olika ställen, ungefär som räfflorna i ett optiskt gitter. Skickar man röntgenstrålning rakt genom provet böjs den därför av i bestämda vinklar, och avböjningsvinkeln säger direkt hur lång vågen är och åt vilket håll den går. Man mäter alltså aldrig vågen själv, bara det avtryck den lämnar i strålen.' },
      { type: 'p', html: 'För att avböjningen ska bli mätbar ställs fotonernas energi in på 708&nbsp;eV, exakt där järnatomerna i provet absorberar som kraftigast och kontrasten mot magnetismen blir störst. En liten skärm mitt i strålgången fångar upp den ostörda strålen, så att bara det svaga avböjda ljuset når detektorn. Kvar på bilden blir ett par ljusa fläckar: spinnvågen, avläst i ett enda svep.' },
      { type: 'p', html: 'Provet var en film av yttriumjärngranat, hundra nanometer tunn, det material som nästan all magnonforskning utgår från. Vågorna sattes i gång elektriskt med en mikrovågsledare och ett gitter av 200&nbsp;nanometer breda permalloystrimlor. Mätningarna gjordes vid två synkrotroner: BESSY&nbsp;II i Berlin och PETRA&nbsp;III i Hamburg.' },
      { type: 'h2', text: 'Känsligheten blev den första överraskningen' },
      { type: 'p', html: 'Laget kunde direkt driva och läsa av vågor med våglängden 79&nbsp;nanometer, vid drivfrekvensen 12,1&nbsp;GHz. Det betyder att varje atoms magnetiska riktning svängde drygt tolv miljarder varv i sekunden, samtidigt som mönstret upprepade sig var åttionde nanometer. Vågor som uppstod av sig själva inne i materialet kom ännu längre ner, till omkring 67&nbsp;nanometer.' },
      { type: 'p', html: 'Lika viktigt var hur lite som behövdes. En tydlig signal syntes på en halv minuts mätning redan vid mikrovågseffekten −34&nbsp;dBm, alltså mindre än en miljondels watt. Ett röntgenmikroskop av det äldre slaget hade behövt mer än tusen gånger så mycket effekt för att alls skilja vågen från bruset på ett systerprov.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-31-spinnvagor-i-rorelse-2.jpg', alt: 'Tre mätbilder bredvid varandra. I den vänstra syns bara två små prickar, i den mittersta har prickarna blivit en sluten oval ring, och i den högra ligger flera ovala ringar innanför och utanför varandra.', caption: 'Samma drivfrekvens, 8,84&nbsp;GHz, med effekten uppskruvad från vänster till höger. Först finns bara den insända vågen, som två prickar. Sedan sluter sig prickarna till en ellips: magnoner åt alla håll. Längst till höger har det tillkommit flera ringar, vid övertoner och undertoner av drivfrekvensen. Läget i bilden anger vågens riktning och våglängd, inte var i provet den finns.', credit: 'Figur: Wittrock med flera, arXiv:2504.20958v3 / Nature Physics 22, 1160–1165 (2026), CC BY 4.0. Beskuren.' },
      { type: 'h2', text: 'Ringen som inte skulle vara där' },
      { type: 'p', html: 'Vid låg effekt uppträdde precis det väntade: två fläckar, en på var sida, från den våg som skickats in. Vreds effekten upp bytte bilden karaktär. Fläckarna slöt sig till en ellips.' },
      { type: 'p', html: 'Ringen betyder att det plötsligt fanns magnoner åt alla håll, inte bara åt det håll som drevs. Förklaringen laget räknade fram är en fyrmagnonprocess: två magnoner ur den drivna vågen krockar och ersätts av två nya, som går åt andra håll men tillsammans bär samma energi och samma rörelsemängd som de gamla. Ellipsen är helt enkelt alla de riktningar som råkar ha rätt frekvens. Att den blir en ellips och inte en cirkel beror på att en spinnvåg rör sig olika fort längs magnetfältet och tvärs över det.' },
      { type: 'p', html: 'Och det stannade inte vid en ring. Drevs provet i stället vid 2,38&nbsp;GHz lade sig flera ellipser innanför och utanför varandra, vid två, tre och fyra gånger drivfrekvensen. Skruvades effekten upp ännu mer vid 8,84&nbsp;GHz dök ringar upp vid åttondelar av frekvensen, både under och över den. Övertoner är välkända från varje svängning som drivs hårt nog, från en gitarrsträng till en högtalare som distar. Att se dem lägga sig som ringar av magnonriktningar var däremot nytt.' },
      { type: 'quote', html: 'Sådana icke-linjära växelverkningar är välkända för likformiga spinnvågsmoder. Men vi upptäckte en mer allmän sorts fyrmagnonspridning, där även vandrande magnoner är inblandade.', cite: 'Salvatore Perna, universitetet Federico II i Neapel, som tog fram den teoretiska modellen (översatt från engelska)' },
      { type: 'p', html: 'Att kunna se de här processerna är mer än en kuriositet. Icke-linjära växelverkningar är just det som gör att en signal kan påverka en annan, och därmed det som skulle krävas för att bygga något som räknar med magnoner i stället för med elektriska strömmar. Hittills har de fått slutas fram ur indirekta mätningar. Nu ligger de på en bild.' },
      { type: 'p', html: 'Metoden har heller ingen inbyggd övre gräns för frekvensen, till skillnad från de flesta alternativ. Det öppnar för att följa magnoner ända upp i terahertzområdet, tusen gånger snabbare än de gigahertz som mätts här. Det är också där de vore som mest användbara.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Yttriumjärngranat, med formeln Y<sub>3</sub>Fe<sub>5</sub>O<sub>12</sub>, dämpar magnetiska svängningar sämre än något annat känt material. Därför hinner en spinnvåg vandra långt innan den dör ut, och därför är materialet magnonforskningens motsvarighet till labbråttan.',
        'Röntgenfotonerna i försöket hade energin 708&nbsp;eV, drygt trehundra gånger mer än en foton av grönt ljus.',
        'En magnon bär ingen elektrisk laddning alls. Det den flyttar är rörelsemängdsmoment, alltså själva spinnet, och det är därför en magnonkrets slipper resistansvärme.',
        'Ett magnetfält på 30&nbsp;mT, ungefär sexhundra gånger jordmagnetfältet vid marken, höll atomernas riktningar på plats medan vågorna skickades genom filmen.'
      ] }
    ]
  },
  {
    id: "2026-08-30-droppen-utan-karl",
    date: "2026-08-30",
    title: "500 molekyler kyldes till tjugo miljarddels grad över nollpunkten — sedan höll de ihop som en droppe helt utan kärl",
    deck: "Ett forskarlag i Hongkong har fått natrium–rubidium-molekyler att bilda ett Bose–Einstein-kondensat, och kan dessutom vrida på hur hårt molekylerna drar i varandra. Vrider man tillräckligt långt slutar gasen att breda ut sig och drar i stället ihop sig till en självbunden droppe.",
    category: "Kvantfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-30-droppen-utan-karl.jpg",
    imageAlt: "En glascell i ultrahögvakuum sedd rakt framifrån, omgiven av runda metallflänsar och optiska fönster. Mitt inne i cellen lyser ett litet rödaktigt moln av laserkylda atomer.",
    imageCredit: "Foto: Balping / Wikimedia Commons (CC BY-SA 4.0). Bilden visar ett annat laboratoriums fälla för ultrakalla rubidiumatomer, inte försöket i artikeln.",
    tags: ["kvantfysik", "bose-einstein-kondensat", "ultrakalla molekyler", "laserkylning", "absoluta nollpunkten", "dipol", "kvantdroppe", "aggregationstillstånd", "mikrovågor", "atomfysik"],
    sources: [
      { name: "Phys.org — Physicists create Bose–Einstein condensate from ultracold polar molecules (30 juli 2026)", url: "https://phys.org/news/2026-07-physicists-boseeinstein-condensate-ultracold-polar.html" },
      { name: "Dajun Wangs forskargrupp, The Chinese University of Hong Kong", url: "https://www.phy.cuhk.edu.hk/~djwang/" },
      { name: "Nature — Observation of Bose–Einstein condensation of dipolar molecules (det första molekylkondensatet, NaCs, 2024)", url: "https://www.nature.com/articles/s41586-024-07492-z" }
    ],
    research: {
      citation: "Zhaopeng Shi, Zerong Huang, Fulin Deng, Wei-Jian Jin, Su Yi, Tao Shi, Dajun Wang, ”Bose–Einstein condensate of ultracold sodium–rubidium molecules with tunable dipolar interactions”, Nature Physics, publicerad online 9 juli 2026, DOI 10.1038/s41567-026-03362-9. Förhandsversion: arXiv:2508.20518 (CC BY 4.0).",
      url: "https://doi.org/10.1038/s41567-026-03362-9"
    },
    body: [
      { type: 'p', html: 'Kyl en gas tillräckligt mycket och något underligt händer. Vid några miljarddels grad över absoluta nollpunkten slutar partiklarna att vara enskilda partiklar. De faller alla ner i exakt samma kvanttillstånd och beter sig i stället som en enda våg, ett så kallat Bose–Einstein-kondensat. Med atomer lyckades det första gången 1995. Med hela molekyler har det varit betydligt svårare, och det är först de senaste åren som det gått alls.' },
      { type: 'p', html: 'Nu har ett lag lett av Dajun Wang vid The Chinese University of Hong Kong, tillsammans med teoretiker under Tao Shi vid Kinesiska vetenskapsakademins institut för teoretisk fysik, gjort ett kondensat av natrium–rubidium-molekyler. Resultatet publicerades i <em>Nature Physics</em> i juli.' },
      { type: 'h2', text: 'Molekyler är klibbiga' },
      { type: 'p', html: 'Skälet till att atomer var lättare är prosaiskt: två kalla atomer studsar oftast bara mot varandra, medan två kalla molekyler gärna fastnar i varandra. Krockar de på nära håll försvinner de ur fällan, och den förlusten går snabbare än nedkylningen hinner arbeta. Fysikerna kallar det tvåkroppsförluster.' },
      { type: 'p', html: 'Det spelar roll eftersom sista biten av nedkylningen sker genom förångning, precis som när kaffe svalnar. Man sänker kanten på den optiska fälla som håller molekylerna, låter de snabbaste rymma över kanten och låter resten fördela om energin mellan sig. Kvar blir färre molekyler, men kallare. Metoden fungerar bara om de nyttiga krockarna är många fler än de skadliga.' },
      { type: 'h2', text: 'Två mikrovågsfält som håller molekylerna ifrån varandra' },
      { type: 'p', html: 'Knepet laget använde kallas dubbel mikrovågsskärmning. Två mikrovågsfält, ett cirkulärpolariserat och ett linjärpolariserat, ställs in strax vid sidan av molekylens lägsta rotationsövergång. Fälten får molekylerna att stöta bort varandra på långt håll, så att de sällan kommer nära nog för att fastna. Förlusterna sjönk flera gånger om jämfört med skärmning med ett enda fält, medan de nyttiga krockarna blev kvar.' },
      { type: 'p', html: 'Sedan kunde förångningen göra sitt arbete. Ur ett moln vid $734\\ \\mathrm{nK}$ återstod till slut omkring 500 molekyler vid $20{,}3\\ \\mathrm{nK}$, alltså tjugo miljarddels grad över absoluta nollpunkten. Bara en bråkdel överlevde, men det som återstod hade blivit så mycket kallare att fasrymdstätheten, det mått som avgör om kvantfysiken tar över, steg från 0,008 till 1,7. Vid ungefär $20\\ \\mathrm{nK}$ passerades gränsen, och som mest låg 70&nbsp;% av molekylerna i kondensatet.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-30-droppen-utan-karl-2.jpg', alt: 'Ett optiskt bord fullt av speglar, linser och hållare i svart och silver, monterat i två våningar i ett ljust laboratorium.', caption: 'Bakom varje moln av ultrakalla partiklar ligger ett bord som det här: dussintals lasrar, speglar och linser som måste hålla sina inställningar på bråkdelen av en våglängd.', credit: 'Foto: Tomasz Kawalec / Wikimedia Commons (CC BY-SA 4.0). Bilden visar en uppställning för kylning av rubidiumatomer vid ett annat laboratorium.' },
      { type: 'h2', text: 'Ratten som ändrar hur molekylerna känner varandra' },
      { type: 'p', html: 'Det verkligt nya sitter i vad som händer sedan. En natrium–rubidium-molekyl är elektriskt sned: natriumänden är svagt positiv och rubidiumänden svagt negativ. Den är alltså en liten elektrisk dipol, med ett dipolmoment på 3,2&nbsp;debye. Sådana dipoler drar i varandra på långt håll, och kraften beror på hur de är vända mot varandra.' },
      { type: 'p', html: 'Genom att bara ändra frekvensen på det ena mikrovågsfältet kunde laget skruva på styrkan i den växelverkan. Det är ovanligt: i en vanlig gas är krafterna mellan partiklarna det de är. Här finns en ratt.' },
      { type: 'h2', text: 'En droppe som håller ihop utan kärl' },
      { type: 'p', html: 'Vrids ratten förbi ett visst läge slutar molnet att bete sig som en gas. Släpper man normalt en kall gas fri breder den ut sig åt alla håll. Men förbi gränsen gjorde molnet motsatsen: när fällan stängdes av krympte det i sidled i stället för att växa. Molekylerna höll ihop av sig själva, utan väggar, utan yta, utan behållare. Det är en kvantdroppe.' },
      { type: 'p', html: 'Droppen var trettio gånger tätare än gasen den kom ur och levde i ungefär en fjärdedels sekund, mot drygt två sekunder för kondensatet i gasfas. Att den alls håller ihop beror på en fin balans: dipolerna drar ihop den, medan kvantmekanikens egna fluktuationer trycker emot och hindrar den från att kollapsa till en punkt.' },
      { type: 'quote', html: 'Även om det här inte är det första molekylkondensatet visar vårt arbete att förångningskylning med mikrovågsdämpade förluster kan vara en mer allmän väg till Bose–Einstein-kondensation av polära molekyler.', cite: 'Tao Shi och Dajun Wang, artikelns seniorförfattare, till Phys.org' },
      { type: 'p', html: 'Det första molekylkondensatet gjordes 2024 med natrium–cesium vid Columbia University. Att metoden nu fungerat på ett andra ämne är själva poängen: receptet tycks gå att flytta vidare till fler molekylslag.' },
      { type: 'p', html: 'Nästa steg är större och mer långlivade prover. Med bara 500 molekyler blir varje mätning tunn, och forskarna vill kunna undersöka hur droppen svänger och vad som händer i dess inre. En sak misstänker de redan: att den kan vara så tät att den mer liknar flytande helium än en tunn gas.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Ett Bose–Einstein-kondensat brukar kallas materiens femte aggregationstillstånd, vid sidan av fast, flytande, gas och plasma.',
        'Droppen innehöll omkring 6&nbsp;·&nbsp;10<sup>13</sup> molekyler per kubikcentimeter, några miljondelar av tätheten i luften omkring dig.',
        'Absoluta nollpunkten, 0&nbsp;K eller −273,15&nbsp;°C, går inte att nå. Men 20 miljarddels grad ifrån är kallare än något som uppmätts naturligt någonstans i universum.'
      ] }
    ]
  },
  {
    id: "2026-08-29-jakten-under-jorden",
    date: "2026-08-29",
    title: "Kallare än rymden och två kilometer ner i en nickelgruva — nu lyssnar 24 kristaller efter mörk materia",
    deck: "Experimentet SuperCDMS SNOLAB har börjat samla sina första mätdata. Det letar efter partiklar så lätta att knuffen de kan ge en atomkärna motsvarar ett tiotal elektronvolt, och för att höra den måste allt annat tystas.",
    category: "Partikelfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-29-jakten-under-jorden.jpg",
    imageAlt: "En av SuperCDMS detektorenheter: en sexkantig dosa i blank koppar, med guldfärgade kretsband längs sidan, stående på en vit duk i ett renrum.",
    imageCredit: "Foto: SNOLAB (godkänd pressbild)",
    tags: ["mörk materia", "partikelfysik", "astropartikelfysik", "supercdms", "snolab", "fonon", "kryogenik", "supraledare", "elastisk stöt", "bakgrundsstrålning"],
    sources: [
      { name: "SLAC National Accelerator Laboratory — SuperCDMS SNOLAB begins preliminary phase of dark matter hunt (26 augusti 2026)", url: "https://www6.slac.stanford.edu/news/2026-08-26-supercdms-snolab-begins-preliminary-phase-dark-matter-hunt" },
      { name: "Phys.org — Deep underground, SuperCDMS begins hunting light dark matter with 24 cryogenic crystals (27 augusti 2026)", url: "https://phys.org/news/2026-08-deep-underground-supercdms-dark-cryogenic.html" },
      { name: "University of Florida — UF physicists part of effort toward first-ever detection of dark matter (augusti 2026)", url: "https://news.ufl.edu/2026/08/dark-matter-experiment/" },
      { name: "SNOLAB — om anläggningen och dämpningen av den kosmiska strålningen", url: "https://www.snolab.ca/facility/about-the-facilities/" },
      { name: "SuperCDMS — samarbetets egen presentation av experimentet", url: "https://supercdms.slac.stanford.edu/" }
    ],
    research: {
      citation: "R. Agnese med flera (SuperCDMS-samarbetet, 97 författare), ”Projected sensitivity of the SuperCDMS SNOLAB experiment”, Physical Review D 95, 082002 (2017), publicerad 7 april 2017, DOI 10.1103/PhysRevD.95.082002",
      url: "https://doi.org/10.1103/PhysRevD.95.082002"
    },
    body: [
      { type: 'p', html: 'Ungefär 85 % av all materia i universum är av ett slag som ingen någonsin har sett. Den lyser inte, den kastar ingen skugga, och den går rakt igenom både bergmassiv och människokroppar utan att lämna spår. Att den finns där vet astronomerna ändå, eftersom galaxernas ytterkanter roterar alldeles för fort för att hållas kvar av bara den massa som syns i teleskopen.' },
      { type: 'p', html: 'Sedan i augusti pågår ett av världens känsligaste försök att fånga den. Två kilometer under markytan, i nickelgruvan Creighton utanför Sudbury i Ontario, har experimentet SuperCDMS SNOLAB börjat samla sina allra första mätdata. Bakom det står 28 institutioner med SLAC National Accelerator Laboratory som ledande laboratorium.' },
      { type: 'h2', text: 'Tjugofyra kristaller som ska känna en enda knuff' },
      { type: 'p', html: 'Hjärtat i anläggningen är 24 ultrarena kristaller av kisel och germanium, var och en ungefär så stor som en ishockeypuck. Träffar en partikel av mörk materia en atomkärna inne i en kristall studsar kärnan i väg, och rekylen sprider sig genom kristallgittret som en svag skakning: ett knippe fononer, ljudets minsta beståndsdelar i ett fast material. Samtidigt slits några laddningar loss. Båda signalerna läses av med supraledande sensorer, som bara fungerar när det är extremt kallt, och därför sitter kristallerna i ett kylskåp som hålls kallare än rymden mellan stjärnorna.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-29-jakten-under-jorden-2.jpg', alt: 'En lång, skinande ren korridor djupt nere i en gruva, med vitt golv, eltavlor längs ena väggen och rör i taket.', caption: 'Labbet ligger inne i en arbetande nickelgruva, men är inrett som ett renrum: varje dammkorn bär spår av naturligt radioaktiva ämnen.', credit: 'Foto: SNOLAB (godkänd pressbild)' },
      { type: 'h2', text: 'Allt annat måste tystas' },
      { type: 'p', html: 'Svårigheten är inte att bygga en känslig detektor. Svårigheten är att en så känslig detektor hör allting annat också. Berget ovanför labbet dämpar den kosmiska strålningen med en faktor 50 miljoner, ner till ungefär en kosmisk partikel per fyra kvadratmeter och dygn, men det räcker inte. Runt kristallerna ligger därför skal av koppar, polyeten, ultrarent bly och en spärr mot radon, plus en skärm av mumetall som håller undan jordens magnetfält.' },
      { type: 'p', html: 'Blyet är historiens egen gåva till fysiken. Nytillverkat bly innehåller alltid en rest av den radioaktiva isotopen bly-210, som har en halveringstid på drygt 22 år. I blytackor som legat som fartygsballast på Medelhavets botten sedan antiken har den resten hunnit sönderfalla nästan helt, och just sådant bly ligger nu som tunna plattor i taket på SuperCDMS skyddshölje.' },
      { type: 'h2', text: 'Ju lättare partikel, desto mindre knuff' },
      { type: 'p', html: 'SuperCDMS är byggt för <em>lätt</em> mörk materia: partiklar med massor under omkring tio protonmassor, alltså klart under det område där de klassiska WIMP-jakterna har letat. Att de är svårare att upptäcka följer av samma stötlära som gäller för biljardbollar. Vid en elastisk stöt mot en kärna i vila kan en partikel med massan $m$ som mest lämna ifrån sig andelen $\\dfrac{4mM}{(m+M)^2}$ av sin rörelseenergi, där $M$ är kärnans massa. Är $m$ mycket mindre än $M$ blir andelen försvinnande liten, precis som när en ärta kastas mot ett bowlingklot.' },
      { type: 'p', html: 'Räknar man med den fart på ungefär 230 km/s som brukar antas för mörk materia i vår del av Vintergatan, kan en partikel med en protons massa i bästa fall lämna ifrån sig omkring 15 elektronvolt till en germaniumkärna. Det är i den storleksordningen kristallerna måste kunna höra, och det är också skälet till att kisel finns vid sidan av germanium: kiselkärnan är lättare, så samma partikel kan ge den ungefär två och en halv gånger så mycket energi.' },
      { type: 'h2', text: 'Ett år av tålmodigt lyssnande återstår' },
      { type: 'p', html: 'Den inledande fasen pågår till i höst. Sedan värms anläggningen upp för att kylsystemet och brusnivån ska trimmas, ett arbete som väntas pågå in i slutet av året, innan detektorerna sätts i gång för ett helt år av mätningar vid full känslighet från 2027.' },
      { type: 'quote', html: 'Även i den här tidiga fasen har våra känsligaste detektorer möjlighet att ge banbrytande upptäckter. Samtidigt förbereder och testar vi hela systemet, och lär oss hur detektorerna och kylningen fungerar tillsammans.', cite: 'Tina Cartaro, driftansvarig för SuperCDMS vid SLAC' },
      { type: 'p', html: 'Samarbetets talesperson Priscilla Cushman, professor vid University of Minnesota, säger att detektorerna kommer att undersöka områden där de allra lättaste partiklarna av mörk materia kan tänkas finnas, med en känslighet som inte nåtts tidigare.' },
      { type: 'p', html: 'Skulle ingenting alls dyka upp är även det ett resultat. Varje år utan träff stryker ytterligare en bit av den karta där den mörka materien fortfarande kan gömma sig, och tvingar teoretikerna att leta på nya ställen.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Ingången till labbet ligger på 6 800 fots nivå i gruvan. Därifrån återstår 1,8 km att gå innan man är framme.',
        'Berget dämpar den kosmiska strålningen med en faktor 50 miljoner, ner till ungefär en kosmisk partikel per fyra kvadratmeter och dygn.',
        'Hela anläggningen drivs som renrum, med 5 000 m<sup>2</sup> renrumsyta under jord.'
      ] }
    ]
  },
  {
    id: "2026-08-28-gungan-som-gar-runt",
    date: "2026-08-28",
    title: "Gungan går ett helt varv runt sitt eget fäste — och lyftet kommer inte från benen",
    deck: "I den estniska sporten kiiking pumpar utövaren en sju meter lång stålgunga tills den passerar rakt över sitt fäste. Ett forskarlag har nu räknat fram den bästa möjliga tekniken, och den handlar mindre om styrka än om att göra rätt sak i exakt rätt ögonblick.",
    category: "Mekanik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-28-gungan-som-gar-runt.jpg",
    imageAlt: "En kiikingutövare högt uppe på två gula stålarmar, nästan vågrätt ute i luften, ovanför en ställning av lodräta stolpar och vajrar.",
    imageCredit: "Foto: Eesti Kiikingi Liit / Wikimedia Commons (CC BY-SA 3.0)",
    tags: ["mekanik", "pendel", "energi", "kiiking", "parametrisk resonans", "optimal styrning", "cirkulär rörelse", "luftmotstånd"],
    sources: [
      { name: "Phys.org — The physics of kiiking, Estonia's extreme sport of swinging (27 augusti 2026)", url: "https://phys.org/news/2026-08-physics-kiiking-estonia-extreme-sport.html" },
      { name: "Journal of Nonlinear Science 36, artikel 84 — Optimal Strategies for Kiiking: Active Pumping to Invert a Swing (publicerad 15 juli 2026)", url: "https://doi.org/10.1007/s00332-026-10267-7" },
      { name: "arXiv:2308.06818 — förhandsversionen med hela modellen, parametrarna och jämförelsen med videodata", url: "https://arxiv.org/abs/2308.06818" },
      { name: "Guinness World Records — Longest successful 360° kiiking swing (male)", url: "https://www.guinnessworldrecords.com/world-records/longest-kiiking-swing-shaft-successfully-acheived-men" }
    ],
    research: {
      citation: "Petur Bryde, Ian C. Davenport, L. Mahadevan, ”Optimal Strategies for Kiiking: Active Pumping to Invert a Swing”, Journal of Nonlinear Science 36, artikel 84 (2026), publicerad 15 juli 2026, DOI 10.1007/s00332-026-10267-7",
      url: "https://doi.org/10.1007/s00332-026-10267-7"
    },
    body: [
      { type: 'p', html: 'Alla som har suttit i en gunga vet hur man gör. Man lutar sig bakåt och framåt, eller reser sig och sätter sig, och för varje gång går det lite högre. Ingen behöver få det förklarat. Ändå är det som händer allt annat än självklart: ingen knuffar, ingen tar spjärn mot marken, och ändå växer utslaget varv för varv.' },
      { type: 'p', html: 'I Estland har den vardagliga rörelsen drivits till sin yttersta gräns. Sporten heter kiiking, efter det estniska ordet <em>kiik</em> som betyder just gunga, och växte fram under 1990-talet. Utövaren står på en plattform med fötterna fastspända, håller i två styva stålarmar i stället för kedjor, och pumpar genom att omväxlande resa sig och gå ner i knäböj. Målet är att komma hela vägen runt: gungan ska passera rakt över sitt eget fäste och fullborda ett varv. Ju längre armar, desto svårare. Världsrekordet för herrar står sedan 2022 på 7,43&nbsp;m.' },
      { type: 'p', html: 'I <em>Journal of Nonlinear Science</em> har Petur Bryde, Ian C. Davenport och L. Mahadevan vid Harvard University tagit sig an sporten med mekanik och styrteori. De ställer upp den enklast tänkbara modellen av en kiikinggunga, räknar fram den teoretiskt bästa strategin, och jämför den med filmer av fem tävlande.' },
      { type: 'h2', text: 'En pendel som ändrar sin egen längd' },
      { type: 'p', html: 'Modellen är en pendel, men inte den vanliga sorten med fast längd. När utövaren reser sig flyttas kroppens tyngdpunkt in mot fästet, och när hon går ner i knäböj flyttas den ut igen. Pendelns effektiva längd $l$ ändras alltså hela tiden, och det är det enda som driver systemet. Ingen kraft kommer utifrån.' },
      { type: 'p', html: 'Takten är dubbel mot svängningens. Ett fullständigt stå-huka-varv hinns med två gånger under varje svängningsperiod, en gång för varje passage genom det lägsta läget. En svängning som hålls i gång genom att en av systemets egna egenskaper ändras periodiskt, i stället för genom en yttre knuff, kallas parametriskt driven. Gungan är läroboksexemplet.' },
      { type: 'h2', text: 'Därför lönar det sig att resa sig längst ner' },
      { type: 'p', html: 'Varför rörelsen tillför energi syns tydligast om man ser efter hur hårt armarna drar i olika delar av svängningen. I det lägsta läget ska de inte bara bära utövarens tyngd, utan också tvinga henne runt en krökt bana. Kraften längs armen blir där $F = m \\cdot g + \\dfrac{m \\cdot v^2}{l}$, alltså tyngden plus det som cirkelrörelsen kräver. Att resa sig just där betyder att dra sig själv en bit inåt mot fästet mot precis den kraften, och arbetet blir därefter.' },
      { type: 'p', html: 'I vändlägena är det tvärtom. Farten är noll, så hela cirkelrörelsedelen faller bort. Kvar finns bara tyngdkraftens komposant längs armen, $m \\cdot g \\cdot \\cos\\alpha$ räknat från lodlinjen, och den är liten vid stora utslag. Har gungan dessutom passerat vågrätt läge pekar komposanten in mot fästet i stället för ut från det, och då är det inte längre en kostnad att sträcka ut sig utan ett litet tillskott. Skillnaden mellan cykelns två halvor stannar kvar i systemet som ny energi.' },
      { type: 'p', html: 'Det är också förklaringen till något som annars ser omöjligt ut. Det mesta av det som lyfter utövaren de sista meterna kommer inte direkt från benen i det ögonblicket, utan är energi som lagts in nära botten under tidigare varv och som finns kvar i gungans rörelse.' },
      { type: 'quote', html: 'Idrottaren påtvingar inte omvärlden någon rörelse. I stället lär sig idrottaren att samarbeta med omvärldens dynamik.', cite: 'L. Mahadevan, professor vid Harvard University' },
      { type: 'h2', text: 'Den bästa strategin är girig' },
      { type: 'p', html: 'Med modellen på plats blev frågan vilken tidsplan som tar gungan runt på kortast tid. Svaret gav laget med optimal styrning, den gren av matematiken som handlar om att välja en styrsignal så bra som möjligt över ett helt förlopp. Resultatet var en överraskning i sin enkelhet: den tidsoptimala lösningen sammanfaller i praktiken med en girig algoritm, alltså en som bara maximerar energivinsten i slutet av varje enskild cykel utan att tänka på nästa.' },
      { type: 'p', html: 'I klartext: res dig så snabbt du överhuvudtaget kan när gungan passerar sitt lägsta läge, och huka dig i vändlägena där rörelsen nästan har stannat. Det är också precis vad de tävlande på filmerna gör. Laget lät dessutom en algoritm för förstärkningsinlärning pröva sig fram från noll, med belöning bara för att komma runt. Den hittade samma strategi.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-28-gungan-som-gar-runt-2.jpg', alt: 'Fem höga kiikinggungor i olika färger på en gräsäng med granskog och stackmoln bakom. En utövare hänger upp och ner högst upp på en av dem.', caption: 'Kiikinggungor av olika längd på en tävling i Estland. Armarna är av stål och kan förlängas mellan försöken — det är armens längd som avgör svårighetsgraden.', credit: 'Foto: Eesti Kiikingi Liit / Wikimedia Commons (CC BY-SA 3.0)' },
      { type: 'h2', text: 'Kroppen sätter gränserna' },
      { type: 'p', html: 'Skillnaden mellan en matematisk pendel och en människa är att människan har gränser, och det är där modellen blir intressant. Ur filmerna mätte laget att en utövare reser sig med som mest ungefär 1,4&nbsp;m/s, och som effektgräns använde de den toppeffekt på omkring 5&nbsp;000&nbsp;W som uppmätts för ben som sträcks explosivt i ett hopp. Själva längdändringen är också begränsad: i modellen rör sig tyngdpunkten mellan fyra och åtta procent av armens längd åt vardera hållet, alltså mellan knappt tre decimeter och drygt en halv meter på en sju meter lång arm.' },
      { type: 'p', html: 'En detalj i konstruktionen är avgörande. En vanlig gunga hänger i kedjor, och en kedja kan bara dra. Den som vill runt på en kedjegunga måste därför passera högsta punkten med minst farten $v = \\sqrt{g \\cdot r}$, annars slaknar kedjan och man faller. Kiikinggungans armar är styva och kan trycka lika väl som dra. Därmed finns inget fartkrav alls i toppen: det räcker att energin nätt och jämnt bär hela vägen upp till det upp-och-nedvända läget, så tippar gungan över av sig själv. Hela sporten är en ren energifråga.' },
      { type: 'p', html: 'Villkoret för kedjegungan går att räkna på, och räkningen är en klassiker i fysikkursen. I genomgången om <a class="artikel-lank" href="katalog.html?id=fy2-1.6&amp;block=den-fatala-gungan">energi och gravitation i cirkelbanor i Fysik nivå 2</a> finns exemplet Den fatala gungan, där en gunga med banradien 2,5&nbsp;m ska ta sig runt ett helt varv och minsta farten i det översta läget ska bestämmas.' },
      { type: 'h2', text: 'Luften sätter taket' },
      { type: 'p', html: 'Utan luftmotstånd hade det inte funnits någon övre gräns alls. Varje cykel skulle lägga till lite energi, och med tillräckligt många försök skulle vilken armlängd som helst gå att ta runt. Luftmotståndet ändrar bilden, eftersom det tar tillbaka mer och mer ju fortare gungan går. Först när motståndet räknades in stämde modellen kvantitativt med videodata — både med de försök som lyckades och med de två som misslyckades och stannade en bit under toppen.' },
      { type: 'p', html: 'Slutsatsen är att det för varje utövare finns en längsta arm som överhuvudtaget är möjlig, och att den gränsen inte går att köpa sig förbi med mer muskler. Över den längden vinner luftmotståndet varje cykel, hur stor effekt benen än utvecklar. Rekordjakten i sporten har alltså en fysikalisk bortre vägg, inte bara en träningsmässig.' },
      { type: 'quote', html: 'Det som utifrån ser ut som en enkel rytmisk rörelse är en elegant lösning på ett komplicerat styrproblem som omfattar tajmning, kraftutveckling, tyngdkraft, tröghet och luftmotstånd.', cite: 'Petur Bryde, förstaförfattare' },
      { type: 'p', html: 'Därmed hamnar lekplatsens gunga och ett tävlingsredskap i samma modell. Barnet som reser sig i botten och lutar sig tillbaka i vändläget har hittat samma lösning som den giriga algoritmen, utan att kunna en enda av ekvationerna.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Kiiking uppfanns i Estland av Ado Kosk. Den första gungan med justerbara armar byggdes 1996, och armarna kan förlängas mellan försöken — tävlingen går ut på att klara den längsta arm man förmår.',
        'Pendelns kända svängningstid $T = 2\\pi\\sqrt{\\frac{l}{g}}$ gäller bara för små utslag. Ju större utslaget blir, desto längre tid tar varje sväng, och nära det upp-och-nedvända läget växer tiden över alla gränser.',
        'Samma knep fungerar på vilken gunga som helst: stå upp när du passerar det lägsta läget och huka dig i vändlägena. Sitter du ner gör du samma sak genom att luta överkroppen fram och tillbaka.',
        'Att tillföra energi genom att ändra ett system i takt med dess egen svängning är inte unikt för gungor. Samma princip används i partikelacceleratorer, där ett elektriskt fält växlar riktning i takt med att partiklarna kommer varv efter varv.'
      ] }
    ]
  },
  {
    id: "2026-08-27-ljudet-som-lyfter",
    date: "2026-08-27",
    title: "Kulan svävar fyra decimeter ovanför högtalaren — och ingenting annat än ljud håller den uppe",
    deck: "Akustisk levitation har hittills krävt att föremålet kläms fast mellan två ultraljudskällor, och räckvidden har stannat vid några centimeter. Ett forskarlag har nu hållit en polystyrenkula svävande nästan fyra decimeter från en enda källa, genom att forma ljudet till en stråle som vägrar breda ut sig.",
    category: "Akustik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-27-ljudet-som-lyfter.jpg",
    imageAlt: "En liten ljusblå plastkula svävar fritt i luften ovanför en skålformad uppställning med hundratals ultraljudsgivare på ett laboratoriebord fullt av kablar och mätinstrument.",
    imageCredit: "Foto: Tatsuki Fushimi / Wikimedia Commons (CC BY-SA 4.0). Bilden visar en tidigare uppställning för akustisk levitation, inte den nya strålen.",
    tags: ["akustik", "ultraljud", "akustisk levitation", "stående våg", "vågor", "besselstråle", "ljudtryck"],
    sources: [
      { name: "Phys.org — Narrow ultrasonic beam enables stable 3D levitation six times farther than before (25 augusti 2026)", url: "https://phys.org/news/2026-08-narrow-ultrasonic-enables-stable-3d.html" },
      { name: "Mirage News — Ultrasonic beam boosts acoustic levitation 6x (pressmeddelandet från University of Tsukuba och University of Bristol i återpublicering, 25 augusti 2026)", url: "https://www.miragenews.com/ultrasonic-beam-boosts-acoustic-levitation-6x-1733497/" },
      { name: "Physical Review Letters 137, 094001 — Midair Single-Sided Acoustic Levitation in High-Pressure Regions of Zero-Order Bessel Beams (24 augusti 2026)", url: "https://journals.aps.org/prl/abstract/10.1103/pfkh-4x7j" },
      { name: "arXiv:2412.15539 — förhandsversionen med hela metoddelen och samtliga mätvärden", url: "https://arxiv.org/abs/2412.15539" }
    ],
    research: {
      citation: "Yusuke Koroyasu, Christopher Stone, Yoichi Ochiai, Takayuki Hoshi, Bruce W. Drinkwater, Tatsuki Fushimi, ”Midair Single-Sided Acoustic Levitation in High-Pressure Regions of Zero-Order Bessel Beams”, Physical Review Letters 137, 094001 (2026), publicerad 24 augusti 2026, DOI 10.1103/pfkh-4x7j",
      url: "https://doi.org/10.1103/pfkh-4x7j"
    },
    body: [
      { type: 'p', html: 'Ljud är tryckvariationer i luft. Trycket stiger och sjunker en aning när en våg passerar, och det räcker för att sätta trumhinnan i rörelse. Görs ljudet tillräckligt starkt räcker det också för att bära ett litet föremål mot tyngdkraften. Fenomenet kallas akustisk levitation och har varit känt sedan 1930-talet, men det har alltid haft samma begränsning: föremålet måste sitta inneslutet mellan två ljudkällor, eller mellan en källa och en reflektor, och det får aldrig komma särskilt långt bort.' },
      { type: 'p', html: 'Ett forskarlag vid University of Tsukuba i Japan och University of Bristol i Storbritannien har nu tagit bort halva uppställningen. I <em>Physical Review Letters</em> den 24&nbsp;augusti redovisar de en fälla som håller en polystyrenkula stilla på upp till 397&nbsp;mm avstånd från en enda ljudkälla, med ingenting alls på andra sidan. Med den ensidiga metod som hittills använts, en så kallad tvillingfälla, stannade motsvarande räckvidd vid 66,7&nbsp;mm — knappt en sjättedel så långt.' },
      { type: 'h2', text: 'Föremålet sitter där ljudet är som svagast' },
      { type: 'p', html: 'Den vanliga sortens akustiska levitator bygger på en stående våg. Två motriktade vågor med samma frekvens lägger sig ovanpå varandra och bildar ett mönster som står stilla i rummet: på vissa ställen slår trycket kraftigt fram och tillbaka, på andra ställen tar de två vågorna alltid ut varandra så att trycket knappt ändras alls. De stillsamma ställena kallas tryckknutar.' },
      { type: 'p', html: 'Avståndet mellan knutarna följer direkt av våglängden, som i sin tur ges av $\\lambda = \\dfrac{v}{f}$. Med ljudhastigheten $v \\approx 343\\ \\mathrm{m/s}$ och de $40\\ \\mathrm{kHz}$ som givarna arbetar med blir våglängden ungefär 8,6&nbsp;mm, och knutarna ligger på halva den sträckan, alltså drygt fyra millimeter isär. Ett litet och lätt föremål som råkar hamna bredvid en knut knuffas tillbaka in i den av det omgivande övertrycket. Där ligger det sedan kvar och svävar, som en pärla i en osynlig skål.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-27-ljudet-som-lyfter-2.jpg', alt: 'Sju fotografier av små föremål som svävar fritt i luften: en vit droppe, en myra, färgade plastbitar, en elektronikkomponent, klickar av ketchup och senap, en lodrät rad med fem vattendroppar och ett sockerkorn.', caption: 'Föremål som hålls svävande av en stående våg i en konventionell levitator. Raden med fem vattendroppar (f) visar tryckknutarna rakt ovanför varandra, en droppe i varje.', credit: 'Foto: Asier Marzo, Adrian Barnes och Bruce W. Drinkwater / Wikimedia Commons (CC BY 4.0)' },
      { type: 'h2', text: 'Med bara en källa rinner kraften ut' },
      { type: 'p', html: 'Så länge ljudet kommer från två håll är saken enkel. Tas den ena sidan bort försvinner både den stående vågen och den symmetri som höll föremålet på plats. Det som är kvar blir dessutom svagare för varje centimeter, eftersom en vanlig ljudstråle breder ut sig och tunnas ut när den går framåt.' },
      { type: 'quote', html: 'I en vanlig akustisk levitator är det ljudvågorna från motsatta håll som stabiliserar föremålet inne i apparaten. Kraften som håller föremålet på plats blir svagare ju längre bort från källan det kommer.', cite: 'Bruce Drinkwater, professor vid University of Bristol' },
      { type: 'h2', text: 'En stråle som inte breder ut sig' },
      { type: 'p', html: 'Lösningen blev en besselstråle av nollte ordningen. Den byggs upp av ljud som kommer in snett från alla håll, längs en kon, och möts längs en gemensam mittlinje. Resultatet är ett smalt område med högt tryck rakt längs axeln, omgivet av allt svagare ringar. Till skillnad från en vanlig stråle behåller mönstret sin bredd i stället för att spridas ut. Sådana strålar beskrevs teoretiskt i optiken 1987 och har en egenhet till: hamnar ett hinder i vägen sluter sig strålen igen ett stycke längre fram, eftersom mittlinjen hela tiden fylls på från sidorna.' },
      { type: 'p', html: 'I försöket formades strålen av en fyrkantig platta med 16&nbsp;·&nbsp;16 ultraljudsgivare, alltså 256 stycken, där varje givare kunde ges sin egen fördröjning. Genom att välja fördröjningarna rätt lät sig konens vinkel ställas in, och i huvudförsöken var den 20&nbsp;grader.' },
      { type: 'h2', text: 'Fällan ligger i övertrycket, inte i knuten' },
      { type: 'p', html: 'Det märkliga med resultatet är var kulan hamnar. I en stående våg samlas partiklarna i tryckknutarna, alltså där trycket varierar minst. Här sitter kulan tvärtom mitt i strålens allra kraftigaste område.' },
      { type: 'p', html: 'Förklaringen ligger i att ljudet trycker på ett svävande föremål på två olika sätt samtidigt. Den ena kraften beror på hur trycket ändrar sig från plats till plats, och på hur lätt föremålet låter sig pressas ihop jämfört med luften. Den andra beror på hur luftens rörelse ändrar sig från plats till plats, och på skillnaden i densitet. De två drar åt olika håll, och i en stående våg vinner den första. Men i en besselstråle med tillräckligt flack konvinkel, och med ett föremål som är extremt lätt, tar den andra över och gör mittlinjen till en stabil plats. Polystyrenkulan i försöket hade densiteten 40,4&nbsp;kg/m³, alltså bara ett trettiotal gånger tätare än luften omkring.' },
      { type: 'h2', text: 'Vad mätningarna visade' },
      { type: 'p', html: 'Kulan var 1,5&nbsp;mm i diameter och kunde hållas stilla var som helst mellan 141 och 397&nbsp;mm från plattan, ett arbetsområde på drygt 25&nbsp;cm, eller uttryckt i våglängder från 16,5 till 46,6. I sidled gick den att flytta nästan tio centimeter. Rörelsen sköttes utan att någonting mekaniskt rörde sig: genom att luta strålen upp till tio grader åt vardera hållet flyttades kulan i sidled med ungefär 5,7&nbsp;cm/s, och genom att ändra konens vinkel mellan 15 och 25&nbsp;grader åkte den upp och ner med 4,3&nbsp;cm/s.' },
      { type: 'p', html: 'Laget höll dessutom flera föremål svävande samtidigt, prövade sådant som inte alls är runt — ett teblad, en skiva av kiselaerogel och en flaga potatisstärkelse — och lät kulan sväva kvar med ett hinder inskjutet mellan plattan och kulan. Det sista är strålens självläkning i praktiken.' },
      { type: 'quote', html: 'Eftersom vår teknik möjliggör beröringsfri hantering på långt avstånd i öppna miljöer räknar vi med att metoden kan komma till användning för automatiserade experiment, tredimensionella bildskärmar och hantering av ömtåliga material och farliga ämnen.', cite: 'Tatsuki Fushimi, professor vid University of Tsukuba' },
      { type: 'h2', text: 'Vad det duger till' },
      { type: 'p', html: 'Poängen med att slippa den andra ljudkällan är att fällan då kan riktas in i ett utrymme i stället för att omsluta det. Ett prov behöver aldrig vidröra en behållarvägg, vilket är hela idén bakom behållarlös hantering: en droppe som svävar fritt kan varken förorenas av kärlet eller börja kristallisera från dess yta.' },
      { type: 'p', html: 'Begränsningarna ska dock inte skrivas bort. Försöken gjordes med millimeterstora och mycket lätta föremål, och det är just den låga densiteten som gör mittlinjen stabil. Om samma grepp går att sträcka till tätare material, som en vattendroppe, är ännu inte visat. Men steget från sju centimeter till fyra decimeter är stort nog för att flytta akustisk levitation från en apparat man stoppar in något i, till ett verktyg man riktar.' },
      { type: 'fact', title: 'Visste du?', items: [
        'De 40&nbsp;kHz som givarna arbetar med ligger långt över hörselns övre gräns, som för unga öron går vid ungefär 20&nbsp;kHz. En akustisk levitator är alltså ljudlös, trots att det är ljudet som bär.',
        'Besselstrålar är uppkallade efter den tyske astronomen och matematikern Friedrich Bessel. Att de kan förverkligas som strålar som inte breder ut sig visades i optiken 1987, av J. Durnin med kollegor.',
        'Ljudhastigheten i luft beror på temperaturen och är omkring 343&nbsp;m/s vid 20&nbsp;°C. Kyls luften ner sjunker den, och våglängden — och därmed avståndet mellan tryckknutarna — krymper med den.',
        'Akustisk levitation används i dag bland annat för att studera hur läkemedelsämnen kristalliserar utan att en behållarvägg stör förloppet.'
      ] }
    ]
  },
  {
    id: "2026-08-26-vakuumet-som-hjalper-till",
    date: "2026-08-26",
    title: "Fysiker höjde en supraledares gräns utan att röra materialet — de byggde om tomrummet omkring den",
    deck: "Niobdiselenid leder ström utan motstånd först när det kylts till några grader över absoluta nollpunkten. Genom att lägga provet inuti en liten metallring, som formar om vakuumets egna fluktuationer, har ett forskarlag flyttat gränsen uppåt med drygt fem procent — utan att tillföra någon energi alls.",
    category: "Kvantfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-26-vakuumet-som-hjalper-till.jpg",
    imageAlt: "En liten svart magnet svävar fritt i luften ovanför en nedkyld supraledande skiva, omgiven av vit dimma från den kalla gasen.",
    imageCredit: "Foto: Mai-Linh Doan / Wikimedia Commons (CC BY-SA 3.0)",
    tags: ["kvantfysik", "supraledning", "vakuumfluktuationer", "kvantelektrodynamik", "terahertz", "materialfysik", "kritisk temperatur"],
    sources: [
      { name: "Phys.org — Vacuum-fluctuation-enhanced superconductivity demonstrated for the first time (24 augusti 2026)", url: "https://phys.org/news/2026-08-vacuum-fluctuation-superconductivity.html" },
      { name: "Chinese Academy of Sciences — Researchers achieve first experimental demonstration of vacuum-fluctuation-enhanced superconductivity (pressmeddelande 19 augusti 2026)", url: "https://english.cas.cn/newsroom/research-news/202608/t20260819_1188615.shtml" },
      { name: "Nature — Evidence for vacuum-enhanced superconductivity in NbSe2 (19 augusti 2026)", url: "https://www.nature.com/articles/s41586-026-11037-x" },
      { name: "arXiv:2608.14784 — No-go theorem and routes towards cavity-enhanced superconductivity (Qing-Dong Jiang, 14 augusti 2026)", url: "https://arxiv.org/abs/2608.14784" },
      { name: "arXiv:2606.19171 — Cavity-enhanced superconductivity in the two-dimensional limit of NbSe2 (H. Zhang med flera, 17 juni 2026, förhandspublicering)", url: "https://arxiv.org/abs/2606.19171" }
    ],
    research: {
      citation: "Zheyan Wang, Gabriel Cardoso, Liu Yang, Xun Gong, Chi Zhang, Yufei Zhu, Dongbo Zhang, Nan Pan, Hongbing Cai, Yong P. Chen, Qing-Dong Jiang, Guanghui Cheng, Frank Wilczek, Changgan Zeng, ”Evidence for vacuum-enhanced superconductivity in NbSe2”, Nature (2026), publicerad online 19 augusti 2026, DOI 10.1038/s41586-026-11037-x",
      url: "https://doi.org/10.1038/s41586-026-11037-x"
    },
    body: [
      { type: 'p', html: 'En supraledare leder ström helt utan motstånd — men bara under en viss temperatur. Ovanför den gränsen är materialet en alldeles vanlig, ofta ganska medelmåttig ledare. Hela jakten på användbara supraledare handlar därför om att skjuta gränsen uppåt, och receptet har i hundra år varit detsamma: ändra materialet. Ny kemi, andra grundämnen, tryck på hundratusentals atmosfärer, korta laserpulser som skakar om atomerna.' },
      { type: 'p', html: 'Ett forskarlag har nu i stället låtit materialet vara i fred och byggt om det tomrum som omger det. Resultatet, publicerat i <em>Nature</em> den 19&nbsp;augusti, är att den kritiska temperaturen hos niobdiselenid, NbSe<sub>2</sub>, steg med upp till 5,4&nbsp;procent. Ingen yttre drivning tillfördes — ingen laser, ingen mikrovågspuls, ingen extra energi. Det enda som ändrades var vilka svängningar vakuumet runt omkring tilläts ha.' },
      { type: 'h2', text: 'Vakuum är inte ingenting' },
      { type: 'p', html: 'Heisenbergs obestämdhetsrelation säger att ett elektromagnetiskt fält inte samtidigt kan ha värdet exakt noll och ändra sig exakt noll. Också i sitt lägsta energitillstånd finns därför en rest av aktivitet kvar: fältet darrar. I kvantelektrodynamikens språk beskrivs darrningen som virtuella partiklar som oupphörligt bildas och försvinner igen. Ett tomrum är med andra ord inte stilla, utan ett sjudande hav av fluktuationer.' },
      { type: 'p', html: 'Det är ingen lös spekulation, utan något som mätts på flera oberoende sätt. Att en exciterad atom förr eller senare faller ner till grundtillståndet, även i kompakt mörker där ingenting kan träffa den, beror på vakuumfluktuationerna. Att två speglar några nanometer från varandra dras ihop av en kraft utan avsändare — Casimireffekten — kommer av att vissa svängningar helt enkelt inte får plats i springan mellan dem. Och att väteatomens energinivåer ligger en aning fel jämfört med Diracs ekvation, den så kallade Lambskiftningen, var 1947 det mätvärde som tvingade fram hela kvantelektrodynamiken.' },
      { type: 'h2', text: 'En ring som ställer om tomrummet' },
      { type: 'p', html: 'Problemet är att fluktuationerna i fri rymd är alldeles för svaga för att märkas i något så stort och stökigt som en materialbit. Lösningen blev en delad ringresonator: en liten mikrometerstor metallring med ett gap i, med sin resonans kring en terahertz. Det är hundratals gånger högre frekvens än den en mobiltelefon sänder på.' },
      { type: 'p', html: 'En resonator tillför ingen strålning. Den bestämmer bara vilka svängningar som alls kan finnas i sin närhet, och hur kraftiga de blir. Jämförelsen ligger nära ett rums akustik: rummet skapar inget ljud, men avgör vilka toner som förstärks och vilka som dör bort. Ringen gör samma sak med vakuumets nollpunktssvängningar. Eftersom inget ljus skickas in kallas den en mörk kavitet — det enda som ändras är bakgrunden.' },
      { type: 'quote', html: 'Vakuumfluktuationer i fri rymd är i allmänhet för svaga för att ge observerbara effekter i makroskopiska system. För att komma runt den begränsningen införde vi en terahertzresonator. En sådan mörk kavitet kan forma om den elektromagnetiska omgivningen och kraftigt förstärka vakuumfluktuationerna.', cite: 'Zeng Changgan, professor vid University of Science and Technology of China' },
      { type: 'h2', text: 'Vad mätningen visade' },
      { type: 'p', html: 'NbSe<sub>2</sub> är ett skiktat material som går att flaga av till flingor några atomlager tunna, ungefär som grafit. I bulkform blir det supraledande under omkring 7&nbsp;K, alltså 7&nbsp;grader över absoluta nollpunkten, och gränsen sjunker ju tunnare flingan är. Laget jämförde systematiskt likadana prov innanför och utanför ringen. Inne i kaviteten steg den kritiska temperaturen — som mest 5,4&nbsp;procent, i ett prov på sex atomlager. Nära övergången ökade dessutom både den ström och det magnetfält materialet tålde innan supraledningen bröt samman, och där var skillnaden stor.' },
      { type: 'p', html: 'Den sortens resultat måste tåla misstänksamhet, eftersom en tunn flinga klämd mot en metallstruktur kan ändra sig av fullständigt banala skäl. Forskarna varierade därför kavitetens form och resonansfrekvens, provets tjocklek, det isolerande materialet omkring och metallremsorna i sig. På så vis kunde de avfärda töjning, materialförsämring, ojämnheter i provet och avskärmning från metallen. Det avgörande fyndet var att förstärkningen har en resonanstopp: den är som störst när kavitetens frekvens ligger rätt, och avtar åt båda hållen. En mekanisk eller kemisk bieffekt hade inte brytt sig det minsta om vilken frekvens ringen råkar ha.' },
      { type: 'p', html: 'Tolkningen bygger på Ginzburg–Landau-teorin, standardverktyget för att beskriva ett supraledande tillstånd i stort. Enligt den utbyter supraledaren virtuella fotoner med kaviteten, och utbytet sänker det supraledande tillståndets energi — vilket är just det som gör tillståndet stabilt upp till en högre temperatur. Toppen uppstår när kavitetsmodens energi råkar matcha de lågenergetiska svängningarna i supraledaren själv.' },
      { type: 'quote', html: 'I det mesta av den praktiska fysiken är vakuum bara den passiva scen som fenomenen utspelar sig på. Det här arbetet visar att bakgrunden själv kan bli en aktör — konstruerad för att förstärka supraledning och forma om hur kvantmateria beter sig.', cite: 'Frank Wilczek, professor vid Massachusetts Institute of Technology' },
      { type: 'h2', text: 'Ett teorem som säger nej' },
      { type: 'p', html: 'Samtidigt är saken långt ifrån avgjord — och den mest intressanta invändningen kommer inifrån laget självt. En av artikelns egna medförfattare, Qing-Dong Jiang, lade i mitten av augusti ut en teoretisk uppsats som bevisar ett no-go-teorem. I den enklaste beskrivningen av en kavitet består vakuumets bidrag av två delar, en som motverkar supraledning och en som gynnar den, och den gynnsamma kan aldrig bli störst. Slutsatsen blir att vakuumfluktuationer i en passiv kavitet borde trycka ner den kritiska temperaturen i stället för att lyfta den.' },
      { type: 'p', html: 'Teoremet är dock inte ett motargument utan snarare en ritning. Uppsatsen pekar ut exakt två vägar förbi förbudet, och båda kräver att kaviteten får tag i ytterligare någon kollektiv rörelse i materialet: antingen en svängning som förstärker den gynnsamma delen, eller att kaviteten försvagar en konkurrerande ordning som annars tar plats från supraledningen. Vilken av vägarna som är i spel i NbSe<sub>2</sub> är fortfarande obesvarat.' },
      { type: 'p', html: 'Hur öppen frågan är syns i att ett helt annat forskarlag, vid Nanyang Technological University i Singapore, i somras rapporterade en liknande effekt i samma material: i ett dubbellager steg gränsen från 3,02&nbsp;K till 3,41&nbsp;K mot en kavitet som resonerar vid 0,92&nbsp;THz, och effekten växte ju tunnare provet blev. Deras beräkningar pekar i stället ut en omfördelning av kopplingen mellan elektronerna och gittrets svängningar som orsak. Det arbetet är än så länge en förhandspublicering och har inte kollegialt granskats.' },
      { type: 'h2', text: 'En ratt, inte en revolution' },
      { type: 'p', html: 'Storleken på effekten ska inte överdrivas. 5,4&nbsp;procent av några få kelvin är någon tiondels grad, och NbSe<sub>2</sub> behöver flytande helium precis som förut. Det intressanta är inte talet utan handtaget: ett sätt att ändra ett materials kvanttillstånd utan att röra vid det, lysa på det eller mata in energi i det. Fungerar knepet på ett material fungerar det i princip på fler — och då har tomrummet blivit ännu en parameter att skruva på, vid sidan av temperatur, tryck och kemisk sammansättning.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Casimirkraften förutsades 1948 av nederländaren Hendrik Casimir och kunde mätas med god noggrannhet först 1997. Samma forskargrupp som står bakom det nya försöket har tidigare visat att kraften kan växla från dragande till stötande med hjälp av ett magnetfält.',
        'Att en magnet kan sväva ovanför en nedkyld supraledare beror på Meissnereffekten: supraledaren motar ut magnetfältet ur sitt inre, och det fält den då bygger upp bär magnetens tyngd.',
        'Frank Wilczek fick nobelpriset i fysik 2004, tillsammans med David Gross och David Politzer, för upptäckten av den asymptotiska friheten i den starka växelverkan — alltså att kvarkar rör sig nästan fritt när de kommer riktigt nära varandra.',
        'Terahertzstrålning ligger i gränslandet mellan mikrovågor och infrarött ljus. En terahertz betyder 10<sup>12</sup> svängningar per sekund, vilket motsvarar en våglängd på ungefär 0,3&nbsp;mm.'
      ] }
    ]
  },
  {
    id: "2026-08-25-vagfunktionen-fotograferad",
    date: "2026-08-25",
    title: "Elektronmolnet i kemiboken är uträknat, inte sett — nu har ett forskarlag fotograferat ett i tre dimensioner",
    deck: "Fysiker i Göttingen har återskapat hela den tredimensionella vågfunktionen för en elektron i en organisk molekyl, med detaljer finare än avståndet mellan molekylens kolatomer. Tidigare krävdes en synkrotronanläggning för saken — nu räcker en laseruppsättning på ett bordsstativ.",
    category: "Kvantfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-25-vagfunktionen-fotograferad.jpg",
    imageAlt: "Illustration av en molekylorbital som lyser i röda och blåa lober ovanför en blankpolerad silverkristall, träffad av en smal violett ljusstråle i ett mörkt laboratorium.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "vågfunktion", "molekylorbital", "fotoelektrisk effekt", "fotoelektronspektroskopi", "elektroner", "laser", "ultraviolett"],
    sources: [
      { name: "Phys.org — Molecular orbitals imaged in 3D, opening path to femtosecond videos (4 augusti 2026)", url: "https://phys.org/news/2026-08-molecular-orbitals-imaged-3d-path.html" },
      { name: "EurekAlert! — Zooming in: Electron orbitals photographed in 3D (Georg-August-Universität Göttingen, pressmeddelande 4 augusti 2026)", url: "https://www.eurekalert.org/news-releases/1138815" },
      { name: "ScienceDaily — Scientists just imaged the hidden quantum shape of a molecule (24 augusti 2026)", url: "https://www.sciencedaily.com/releases/2026/08/260822015213.htm" },
      { name: "arXiv:2502.18269 — fri fulltext med hela metoddelen (CC BY 4.0)", url: "https://arxiv.org/abs/2502.18269" }
    ],
    research: {
      citation: "W. Bennecke, T. L. Dinh, J. P. Bange, D. Schmitt, M. Merboldt, L. Weinhagen, B. van Wingerden, F. Frassetto, L. Poletto, M. Reutzel, D. Steil, D. R. Luke, S. Mathias, G. S. M. Jansen, ”Table-top three-dimensional photoemission orbital tomography with a femtosecond extreme ultraviolet light source”, Nature Communications 17, 5457 (2026), publicerad online 19 juni 2026, DOI 10.1038/s41467-026-74308-1 (öppet tillgänglig, CC BY 4.0)",
      url: "https://doi.org/10.1038/s41467-026-74308-1"
    },
    body: [
      { type: 'p', html: 'De färgglada elektronmolnen i kemiboken — de där hantelformade och klöverbladsformade figurerna som visar var en elektron håller till — är inga fotografier. De är uträknade. Bakom varje sådan bild ligger en lösning till Schrödingerekvationen, och det man ritar upp är en vågfunktion: den matematiska storhet som bestämmer hur sannolikt det är att hitta elektronen på ett visst ställe. Själva vågfunktionen går inte att avläsa med ett instrument.' },
      { type: 'quote', html: 'Vågfunktionen är en grundläggande storhet i kvantmekaniken, men den kan inte observeras eller mätas direkt.', cite: 'Stefan Mathias, professor i fysik vid Göttingens universitet' },
      { type: 'p', html: 'Ett forskarlag vid Göttingens universitet har nu ändå lyckats återskapa en hel vågfunktion i tre dimensioner — den yttersta, lösast bundna elektronbanan i en organisk pigmentmolekyl med det otympliga namnet PTCDA, utlagd som ett enda molekyllager på en silverkristall. Upplösningen blev ungefär 0,75&nbsp;ångström, alltså 75&nbsp;miljarddels millimeter. Det är finare än de omkring 1,4&nbsp;ångström som skiljer molekylens kolatomer åt.' },
      { type: 'h2', text: 'Den fotoelektriska effekten som mätinstrument' },
      { type: 'p', html: 'Metoden börjar i ett fenomen från 1905: lyser man på ett material med tillräckligt kortvågigt ljus slås elektroner ut ur det. Fotonens energi går till att lossa elektronen, och det som blir över följer med som rörelseenergi, $E_\\mathrm{k} = h \\cdot f - W$, där $W$ är det arbete som krävs för att slita loss elektronen.' },
      { type: 'p', html: 'Det avgörande är att elektronen inte bara bär med sig en energi utan också en riktning. Mäter man både hur snabbt och åt vilket håll varje utsläppt elektron flyger, bygger man upp en karta över elektronernas rörelsemängd — och den kartan är vågfunktionens fouriertransform, alltså samma information sedd från ett annat håll. Sambandet upptäcktes 2009 och har sedan dess kallats fotoemissionsorbitaltomografi. Haken har varit att en enda ljusfrekvens bara ger ett tunt skal ur den tredimensionella kartan. För att fylla rummet måste man byta frekvens om och om igen, och då har det krävts en synkrotron — en acceleratorring stor som ett kvarter, med kö för mättid.' },
      { type: 'p', html: 'Göttingenlaget byggde i stället sin ljuskälla på ett laboratoriebord. En kraftig infraröd fiberlaser fokuseras i en argonstråle, där gasens atomer svarar med att skicka tillbaka övertoner till den inskjutna frekvensen — högharmonisk generering. Ut kommer ultrakorta pulser av extremt ultraviolett ljus, ställbara mellan 13 och 71&nbsp;elektronvolt. Tio av frekvenserna användes i mätningarna, mellan 20,5 och 63,8&nbsp;elektronvolt, och elektronerna fångades upp av ett rörelsemängdsmikroskop som registrerar riktning och energi för varje enskild elektron på en gång.' },
      { type: 'h2', text: 'Halva informationen går förlorad på vägen' },
      { type: 'p', html: 'Här dyker kvantfysikens klassiska bekymmer upp. En detektor kan bara räkna elektroner, och antalet elektroner motsvarar vågfunktionens belopp i kvadrat. Tecknet — eller mer exakt fasen, det som avgör var vågen är positiv och var den är negativ — finns inte med i den räkningen. Ungefär hälften av informationen saknas alltså så snart mätvärdet är taget. Samma sak plågar röntgenkristallografin, där svårigheten kallas fasproblemet.' },
      { type: 'p', html: 'Lösningen var matematisk. Tillsammans med matematiker i samma stad skrev fysikerna en algoritm som söker den vågfunktion som både stämmer med mätdata och uppfyller några självklara villkor: elektronen ska hålla sig inom molekylens utsträckning, och orbitalen ska ha molekylens egen symmetri. Algoritmen ställer upp villkoren som geometriska mängder och studsar lösningen mellan dem tills den hamnar där de överlappar. Då faller både fasen och de delar av rummet som aldrig mättes på plats.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-25-vagfunktionen-fotograferad-2.jpg', alt: 'Figur i fem paneler: mätdata på halvklotformade skal, den återskapade orbitalen i rörelsemängdsrummet och i vanligt rum som röda och blåa lober, samt två jämförelser mot beräkningar.', caption: 'Till vänster mätdata: varje ljusfrekvens ger ett tunt halvklotformat skal i rörelsemängdsrummet, och det mesta däremellan är tomt. I mitten och till höger den färdiga orbitalen — rött och blått är vågfunktionens två tecken. Längst ned jämförs resultatet med vad kvantmekanisk beräkning förutspår.', credit: 'Figur: Bennecke med flera, Nature Communications 17, 5457 (2026) (CC BY 4.0)' },
      { type: 'h2', text: 'Sju mätningar räckte' },
      { type: 'p', html: 'Vinsten är inte bara att utrustningen får plats i ett vanligt labb. Eftersom algoritmen klarar gles data behövs betydligt färre mätningar än förr: sju frekvenser gav en tillförlitlig bild, och i gynnsamma fall räckte fyra. Varje sådan mätning tog ungefär två timmar, så en hel tredimensionell orbital kunde plockas fram på en arbetsdag — i stället för genom en utdragen mätkampanj vid en synkrotron.' },
      { type: 'p', html: 'Facit blev gott. Den återskapade orbitalen stämde väl med vad kvantmekanisk beräkning förutspår för den fria molekylen, både i molekylens eget plan och vinkelrätt ut från det, ända in på var elektrontätheten toppar på vägen ut från ytan — ungefär 0,8&nbsp;ångström upp. Poängen med den jämförelsen är att teorin aldrig matades in i återskapandet. Bilden kommer från mätningen, och beräkningen står kvar som en oberoende kontroll i stället för som en ingrediens.' },
      { type: 'h2', text: 'Nästa steg är film' },
      { type: 'p', html: 'Det som gör nyheten större än en enskild vacker bild är att ljuskällan ger pulser på några tiotals femtosekunder. En femtosekund är en miljondels miljarddels sekund, och det är ungefär på den tiden som en kemisk bindning hinner brytas eller en elektron flytta över till en grannmolekyl. Med en puls som sätter i gång förloppet och en andra puls som avbildar det en aning senare kan samma händelse spelas in bildruta för bildruta.' },
      { type: 'p', html: 'Med andra ord: en stroboskopfilm av en vågfunktion i rörelse. Vad som händer med elektronmolnet i det ögonblick en molekyl absorberar ljus — i ett solcellsmaterial, i ett färgämne, i en kemisk reaktion — har hittills varit något man räknat sig fram till. Nu finns ett verktyg som kan titta efter.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Att lysa på ett material och mäta de utsläppta elektronerna är samma slags försök som gav Albert Einstein nobelpriset i fysik 1921. Han fick det inte för relativitetsteorin, utan för förklaringen av just den fotoelektriska effekten.',
        'En ångström är 10<sup>−10</sup>&nbsp;meter och är uppkallad efter uppsalafysikern Anders Ångström, som på 1860-talet kartlade solens spektrum. Enheten är ungefär lagom stor för en atom.',
        'Högharmonisk generering, tekniken bakom bordsstativets ultravioletta pulser, är grunden för attosekundfysiken — området som gav Pierre Agostini, Ferenc Krausz och Anne L’Huillier nobelpriset i fysik 2023.',
        'PTCDA är släkt med de röda perylenpigment som används i bil- och tryckfärger. Just den molekylen har blivit fysikernas provkanin för organiska halvledare, eftersom den lägger sig självmant i prydliga lager på en metallyta.'
      ] }
    ]
  },
  {
    id: "2026-08-24-kvantmikroskopet",
    date: "2026-08-24",
    title: "Varje elektron som skärper bilden skadar också provet — nu vill fysiker låta en kvantdator läsa av mikroskopet",
    deck: "Ett österrikiskt forskarlag föreslår att bygga in en jonfälla med enstaka kalciumjoner mitt i strålgången i ett elektronmikroskop. Tanken är att varje elektron ska lämna sin information hos en qubit i stället för i en vanlig detektor — och att bilden därmed ska kunna bli skarpare av färre elektroner.",
    category: "Kvantfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-24-kvantmikroskopet.jpg",
    imageAlt: "En forskare i vit rock sitter i ett blåbelyst rum framför ett transmissionselektronmikroskop och tittar på en kornig svartvit bild på skärmen bredvid.",
    imageCredit: "Foto: Reneegas1 / Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["kvantfysik", "kvantdator", "elektronmikroskop", "jonfälla", "sammanflätning", "qubit", "mätteknik", "elektroner"],
    sources: [
      { name: "Phys.org — Quantum computer microscope is set to significantly improve electron microscopy (23 augusti 2026)", url: "https://phys.org/news/2026-08-quantum-microscope-significantly-electron-microscopy.html" },
      { name: "TU Wien — The quantum computer microscope (pressmeddelande 18 augusti 2026)", url: "https://www.tuwien.at/en/tu-wien/news/news-articles/news/das-quantencomputer-mikroskop" },
      { name: "arXiv:2601.11446 — Coupling free electrons to a trapped-ion quantum computer (fri fulltext, CC BY 4.0)", url: "https://arxiv.org/abs/2601.11446" }
    ],
    research: {
      citation: "E. Pescoller, S. Beltrán-Romero, S. Egginger, N. Jungwirth, M. Zanetti, D. Hornof, M. S. Seifner, I. Březinová, P. Haslinger, T. Juffmann, J. Kofler, P. Schindler, D. Rätzel, ”Coupling free electrons to a trapped-ion quantum computer”, Physical Review Letters (2026), publicerad online 16 juli 2026, DOI 10.1103/w6t7-9txs. Fri förhandsversion: arXiv:2601.11446 (CC BY 4.0)",
      url: "https://doi.org/10.1103/w6t7-9txs"
    },
    body: [
      { type: 'p', html: 'Vill man se en enskild proteinmolekyl duger inte synligt ljus. Våglängden ligger kring 500&nbsp;nm, tusen gånger grövre än det man vill titta på, och vågen böjer sig helt enkelt runt föremålet. Därför byter man ut ljuset mot elektroner. En elektron som accelererats genom 100&nbsp;000&nbsp;volt uppträder som en våg med en våglängd på ungefär 3,7&nbsp;pm — nästan tusen gånger kortare än avståndet mellan atomerna i ett fast material.' },
      { type: 'p', html: 'Priset är att elektronerna inte bara tittar. Varje elektron som passerar provet kan slå loss en annan elektron ur en molekyl, bryta en bindning eller flytta en atom. Ett biologiskt prov — en cell, ett virus, en frusen proteinlösning — tål bara en viss stråldos innan det man ville avbilda har slutat se ut som sig självt. Och eftersom bildens skärpa i grunden är en statistikfråga hamnar man i en rävsax: fler elektroner ger en tydligare bild av ett alltmer förstört prov.' },
      { type: 'p', html: 'Ett forskarlag från TU Wien, Wiens universitet, Johannes Kepler-universitetet i Linz och Innsbrucks universitet föreslår nu en väg runt rävsaxen. I stället för att skicka fler elektroner vill de få ut mer information ur varje enskild elektron — genom att låta den tala med en kvantdator på vägen.' },
      { type: 'h2', text: 'En jonfälla mitt i strålgången' },
      { type: 'p', html: 'Förslaget går ut på att montera in en liten jonfälla i mikroskopets kolonn, i ett plan där bilden av provet återskapas. I fällan hålls enstaka kalciumjoner svävande omkring hundra mikrometer ovanför ett chip, fångade av elektriska växelfält och nedkylda med laser tills de nästan står stilla. Samma sorts joner används redan i dag som qubitar i kvantdatorer, där de manipuleras och läses av med laserpulser.' },
      { type: 'p', html: 'Elektronen krockar aldrig med jonen. Den passerar bara förbi på nära håll, och den elektriska frånstötningen räcker för att knuffa till jonen en aning. Knuffen är löjligt liten — men om jonen först försatts i en superposition, alltså i två svängningstillstånd på en gång, blir följden att de två delarna får olika fas. Elektronen och jonen delar därefter ett gemensamt kvanttillstånd: de är sammanflätade. Informationen som elektronen bär med sig från provet finns nu också hos qubiten, och kan hämtas ut genom att jonen belyses och får lysa tillbaka.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-24-kvantmikroskopet-2.jpg', alt: 'Principskiss i tre paneler: ett elektronmikroskop med en inbyggd jonfälla, en elektron som passerar en fångad jon i en potentialgrop, och ett energinivådiagram för kalciumjonen.', caption: 'Forskarnas principskiss. Till vänster mikroskopet med jonfällan inmonterad, i mitten elektronen som passerar den fångade jonen och förskjuter dess svängningstillstånd i fas, till höger de energinivåer i kalciumjonen som bär själva qubiten.', credit: 'Figur: Pescoller med flera, arXiv:2601.11446 (CC BY 4.0)' },
      { type: 'h2', text: 'Varför färre elektroner kan räcka' },
      { type: 'p', html: 'I ett vanligt elektronmikroskop landar varje elektron i en detektor och räknas för sig. Elektronerna kommer oberoende av varandra, och bruset i en sådan räkning följer en välkänd regel: skickar man $N$ elektroner växer signalen som $N$ medan bruset växer som $\\sqrt{N}$. Skärpan förbättras alltså bara som roten ur antalet — vill man ha ett dubbelt så bra värde krävs fyra gånger så många elektroner. Gränsen kallas standardkvantgränsen och är inget tekniskt fel som går att konstruera bort; den följer av att varje elektron mäts var för sig.' },
      { type: 'p', html: 'Kopplingen till jonen bryter just den förutsättningen. Eftersom växelverkan är koherent kan fasskiften från flera elektroner läggas ihop i ett och samma kvanttillstånd i stället för att summeras som oberoende mätvärden. I det idealiserade fallet förbättras då noggrannheten som $N$ i stället för som $\\sqrt{N}$ — det som inom mätfysiken kallas heisenbergskalning. Skillnaden är inte kosmetisk: den betyder att samma bildkvalitet skulle kunna nås med väsentligt lägre stråldos, alltså med ett prov som fortfarande är helt.' },
      { type: 'quote', html: 'Kvantfysiken låter oss komma förbi de statistiska gränser som begränsar vanliga elektronmikroskop.', cite: 'Elias Pescoller, doktorand vid TU Wien och studiens förstaförfattare' },
      { type: 'p', html: 'Den springande punkten är om en enda elektron alls ger ett avläsbart utslag, eller om effekten drunknar. Lagets beräkningar pekar åt rätt håll: för långsamma elektroner, med energier mellan 100&nbsp;eV och 1&nbsp;keV, hamnar sannolikheten att qubiten byter tillstånd i storleksordningen 0,1 till 1. Enstaka elektroner räcker alltså för att sätta ett tydligt avtryck i kvantdatorn.' },
      { type: 'h2', text: 'Kvar står bygget' },
      { type: 'p', html: 'Det här är än så länge räknat, inte byggt. Studien är kollegialt granskad och publicerad i <em>Physical Review Letters</em>, men den beskriver ett förslag med tillhörande teori — ingen apparat har ännu satt en fri elektron i förbindelse med en fångad jon. Och hindren på vägen är av det handfasta slaget.' },
      { type: 'p', html: 'Jonfällan behöver ett vakuum kring 10<sup>−9</sup>&nbsp;mbar för att jonerna ska hållas kvar och kvanttillstånden överleva, vilket är hårdare än i ett vanligt mikroskop. Fällans elektroder drivs dessutom med växelspänningar på upp till 50&nbsp;volt, som skulle böja av elektronstrålen om den passerade vid fel tillfälle. Lösningen författarna föreslår är att skicka elektronerna i ultrakorta pulser, tajmade till de ögonblick — ungefär vart femtionde nanosekund — då växelfältet går genom noll. Till sist är det trångt: mellan mikroskopets poldelar finns bara några millimeter, så hela fällan måste rymmas på en chipyta kring 15&nbsp;×&nbsp;25&nbsp;millimeter — knappt ett frimärke.' },
      { type: 'p', html: 'Nästa steg är just den byggnationen. Vid TU Wiens elektronmikroskopicentrum ska en jonfällebaserad kvantdator från Philipp Schindlers grupp i Innsbruck monteras in i ett elektronmikroskop. Lyckas det handlar vinsten inte bara om skarpare bilder av virus och proteiner, utan om en princip: att fria elektroner kan användas som kvantsonder, sammanflätade med annan materia. Författarna pekar själva ut att samma koppling i förlängningen skulle kunna prövas på andra styrda laddade partiklar — ända upp till protonerna i en accelerator.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Att elektroner beter sig som vågor förutsades av Louis de Broglie 1924 och bekräftades tre år senare, när elektroner spreds mot en nickelkristall och gav samma sorts mönster som röntgenstrålning. Hela elektronmikroskopin vilar på den upptäckten.',
        'Nobelpriset i kemi 2017 gick till Jacques Dubochet, Joachim Frank och Richard Henderson för kryoelektronmikroskopi, där provet fryses så snabbt att vattnet blir glasartat i stället för att bilda iskristaller. Metoden finns till just för att biologiska prov tål så lite strålning.',
        'Nobelpriset i fysik 2012 delades av David Wineland och Serge Haroche för metoder att mäta och styra enskilda kvantsystem utan att förstöra dem. Winelands verktyg var fångade joner, kylda med laser — samma teknik som nu föreslås flytta in i mikroskopet.',
        'En elektron som accelererats genom 100&nbsp;000&nbsp;volt färdas i drygt halva ljushastigheten. Sträckan genom mikroskopets kolonn tillryggalägger den på några miljarddels sekunder.'
      ] }
    ]
  },
  {
    id: "2026-08-23-rumtiden-vrids",
    date: "2026-08-23",
    title: "Jorden drar rumtiden runt med sig när den snurrar — nu är effekten uppmätt tio gånger noggrannare än förut",
    deck: "Två metallklot i bana runt jorden, träffade av laserpulser från marken i tre år, har fångat en av de märkligaste förutsägelserna i Einsteins gravitationsteori: en roterande massa vrider själva rumtiden med sig. Osäkerheten är nere på promillenivå, och någon avvikelse från teorin syns inte.",
    category: "Relativitetsteori",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-23-rumtiden-vrids.jpg",
    imageAlt: "Ett smalt, knallgrönt laserstrålspår skär snett uppåt genom en stjärntät natthimmel där Vintergatans ljusband anas.",
    imageCredit: "Foto: Meraj Chhaya / Wikimedia Commons (CC BY 2.0)",
    tags: ["relativitetsteori", "gravitation", "rumtid", "ramsläpning", "satelliter", "einstein", "astronomi", "laser"],
    sources: [
      { name: "Physics World (17 augusti 2026)", url: "https://physicsworld.com/a/frame-dragging-measurement-around-the-earth-sets-new-precision-record/" },
      { name: "Phys.org — Frame-dragging observations validate Einstein yet again", url: "https://phys.org/news/2026-07-validate-einstein.html" },
      { name: "eoPortal — LARES-2 (Laser Relativity Satellite-2)", url: "https://www.eoportal.org/satellite-missions/lares-2" },
      { name: "NASA/ILRS — LAGEOS-1", url: "https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/lag1_general.html" }
    ],
    research: {
      citation: "I. Ciufolini, A. Paolozzi, E. C. Pavlis, J. C. Ries med flera (bland dem R. Penrose), ”LARES-2 satellite measures frame-dragging effect around the Earth”, Nature 655, 332–335 (2026), publicerad online 8 juli 2026, DOI 10.1038/s41586-026-10715-0",
      url: "https://doi.org/10.1038/s41586-026-10715-0"
    },
    body: [
      { type: 'p', html: 'Snurra en sked i en burk honung, så följer honungen med runt. Enligt den allmänna relativitetsteorin gör en roterande himlakropp något liknande med rummet och tiden omkring sig: jorden släpar rumtiden en aning med sig varje gång den vrider sig kring sin axel. Fenomenet räknades ut redan 1918 av de två österrikiska fysikerna Josef Lense och Hans Thirring, och kallas ramsläpning.' },
      { type: 'p', html: 'Att effekten finns har fysiker varit tämligen övertygade om i decennier. Att mäta <em>hur stor</em> den är har varit betydligt svårare. Nu har ett internationellt lag bestämt den kring jorden med en relativ osäkerhet på promillenivå &mdash; ungefär en tiopotens bättre än något tidigare mått någonstans i solsystemet. Resultatet publicerades i <em>Nature</em> i somras och lyftes på nytt i mitten av augusti.' },
      { type: 'h2', text: 'Knappt två meter om året' },
      { type: 'p', html: 'En satellit i bana runt jorden märker ramsläpningen som en långsam vridning av hela sitt banplan, i samma riktning som jorden roterar. För de två satelliter mätningen bygger på ligger vridningen på drygt 30&nbsp;millibågsekunder per år vardera &mdash; tillsammans 61,3. En millibågsekund är en tusendels bågsekund, och en bågsekund är 1/3600&nbsp;grad. Vinkeln motsvarar ungefär en enkrona &mdash; 19,5&nbsp;mm i diameter &mdash; betraktad från 66&nbsp;kilometers håll, och i den takten skulle banplanet behöva omkring 21&nbsp;miljoner år på sig för att hinna ett helt varv.' },
      { type: 'p', html: 'Räknat i sträcka blir saken aningen mer gripbar, men bara aningen. Vid banradien drygt 12&nbsp;000&nbsp;km innebär 30&nbsp;millibågsekunder att banplanet glider knappt två meter i sidled under ett helt år. Det är den rörelsen som ska plockas fram &mdash; hos en satellit som samtidigt far fram i flera kilometer per sekund.' },
      { type: 'h2', text: 'Golfbollar av metall' },
      { type: 'p', html: 'Metoden kallas satellitlaseravståndsmätning. Ett teleskop på marken skickar en kort laserpuls mot satelliten, vars yta är täckt av hörnreflektorer: små prismor med den bekväma egenskapen att de kastar tillbaka ljuset exakt samma väg som det kom, oavsett från vilket håll det träffar. Cykelreflexen på bakskärmen bygger på precis samma knep. Ur tiden fram och åter faller avståndet ut, eftersom ljusets hastighet är känd.' },
      { type: 'quote', html: 'Genom att mäta hur lång tid det tar för laserljuset att komma tillbaka kan vi bestämma satellitens läge mycket precist.', cite: 'Ignazio Ciufolini, som ledde arbetet, verksam vid Kinesiska vetenskapsakademins institut för fysik och matematik i Wuhan' },
      { type: 'p', html: 'Laget samlade in ungefär 200&nbsp;000 sådana avståndsmätningar mellan juli 2022 och juni 2025 &mdash; drygt tusen dygn &mdash; med en noggrannhet kring en millimeter per mätning.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-23-rumtiden-vrids-2.jpg', alt: 'Ett metallklot mot svart bakgrund, tätt besatt med hundratals runda, facetterade glasprismor så att ytan liknar en golfboll.', caption: 'LAGEOS-1, uppskjuten 1976: ett massivt klot av mässing med aluminiumskal, 60&nbsp;cm i diameter och 411&nbsp;kg tungt, besatt med 426 hörnreflektorer. Satelliten bär ingen elektronik alls &mdash; den finns bara till för att kasta tillbaka laserljus.', credit: 'Foto: NASA / Wikimedia Commons (public domain)' },
      { type: 'p', html: 'Den nyare satelliten i paret heter LARES-2 och sköts upp av italienska rymdorganisationen den 13&nbsp;juli 2022, på Vega-C-raketens jungfrufärd. Det är ett klot av nickellegeringen Inconel, 424&nbsp;mm i diameter och 295&nbsp;kg tungt, med 303 hörnreflektorer. Den orimliga tätheten är själva poängen: ju mer massa per ytenhet, desto mindre knuffas satelliten omkring av restatmosfär, solstrålningstryck och annat som stör en ren gravitationsmätning. Den är, kort sagt, byggd för att ligga så nära en fritt fallande punktmassa som ett verkligt föremål kan komma.' },
      { type: 'h2', text: 'Tricket: två banor som tar ut varandra' },
      { type: 'p', html: 'Här kommer problemet som gjort mätningen så svår. Jorden är inget klot utan tillplattad vid polerna, och den utbuktande ekvatorsvulsten får satellitbanor att vrida sig på precis samma sätt som ramsläpningen gör &mdash; fast flera miljoner gånger kraftigare. Den relativistiska signalen ligger alltså begravd under en newtonsk effekt som är enormt mycket större, och som dessutom inte är känd till sista decimalen.' },
      { type: 'p', html: 'Lösningen är elegant. Den newtonska vridningen från jordens tillplattning är proportionell mot cosinus för banans lutning mot ekvatorn, medan ramsläpningen inte bryr sig om lutningen alls. Väljer man därför två satelliter på samma höjd med lutningar som tillsammans blir 180&nbsp;grader &mdash; LAGEOS ligger på 109,84° och LARES-2 på 70,16° &mdash; får de motsatt tecken på cosinus. Lägger man ihop de båda banplanens vridning tar den newtonska störningen ut sig själv, medan de två relativistiska bidragen adderas. Det är därför måttet redovisas som en summa, 61,3&nbsp;millibågsekunder per år, i stället för satellit för satellit.' },
      { type: 'p', html: 'Kvar finns de störningar som inte låter sig avfärdas lika snyggt. Den besvärligaste visade sig vara tidvattnet: månens och solens dragning väcker en tidvattenkomponent som kallas K1, vars period ligger obehagligt nära satellitbanornas egen och därför härmar den sökta signalen. Att skilja de två åt beskriver Ciufolini som den svåraste delen av hela arbetet. Som bieffekt gav analysen bättre värden på just de tidvattenkomponenterna &mdash; ett relativitetsförsök som råkade förbättra geofysiken på vägen.' },
      { type: 'h2', text: 'Vad resultatet stänger dörren för' },
      { type: 'p', html: 'Det uppmätta värdet stämmer med Einsteins förutsägelse inom den snäva felmarginalen. Att bekräfta en hundra år gammal teori låter kanske odramatiskt, men det är skärpan som är nyheten. Tidigare bestämningar med LAGEOS-satelliterna landade på några procents osäkerhet, och rymdsonden Gravity Probe B &mdash; som mätte samma fenomen på ett helt annat sätt, genom hur axlarna på fyra ultraprecisa gyroskop vred sig &mdash; nådde omkring 19&nbsp;% när slutresultatet kom 2011.' },
      { type: 'p', html: 'Skärpan har ett syfte bortom bokföringen. Flera föreslagna alternativ till Einsteins teori, framtagna bland annat för att förklara varför universums utvidgning accelererar, skiljer sig från den allmänna relativitetsteorin just i storleken på ramsläpningen. Så länge mätfelet låg på procentnivå fanns gott om plats för sådana modeller att gömma sig i. Med en promille krymper utrymmet rejält &mdash; författarna pekar särskilt ut de skalär-tensor-utvidgningar som går under namnet Chern&ndash;Simons-gravitation.' },
      { type: 'p', html: 'Alla är inte helt övertygade om felmarginalen. Fysikern Lorenzo Iorio, som länge granskat den här sortens experiment, har invänt att de två banorna inte är riktigt så perfekt spegelvända som idealfallet kräver &mdash; höjder, lutningar och excentriciteter skiljer sig något &mdash; och att osäkerheten i jordens tillplattning därför kan läcka in i resultatet längs fler vägar än de som räknats. Diskussionen om exakt hur litet felet är lär pågå ett tag till. Att effekten finns och har rätt storleksordning är däremot inte omstritt.' },
      { type: 'p', html: 'Runt jorden är ramsläpningen en kuriositet på ett par meter om året. Runt ett roterande svart hål är samma fenomen brutalt: där dras rumtiden med så hårt att ingenting kan stå stilla i förhållande till de avlägsna stjärnorna, hur kraftigt det än motar emot. Det är samma ekvationer och samma effekt &mdash; bara med en massa och en rotation som gör den omöjlig att missa. Att den nu går att mäta till promillen i vår egen bakgård gör att modellerna av det extrema fallet vilar på fastare mark.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Bland studiens fjorton författare finns Roger Penrose, som fick Nobelpriset i fysik 2020 för sitt arbete om svarta hål.',
        'Hörnreflektorer används också på månen. Apollo-besättningarna och de sovjetiska Lunochod-farkosterna lämnade efter sig reflektorpaneler som fortfarande träffas av laser från jorden, och som visat att månen avlägsnar sig omkring 3,8&nbsp;cm om året.',
        'LAGEOS-1 bär en plakett formgiven av Carl Sagan. Satelliten väntas falla ner först om många miljoner år, och plaketten visar kontinenternas läge då, nu och långt tillbaka i tiden &mdash; ett meddelande till den som råkar hitta den.',
        'Ramsläpning kallas ibland gravitomagnetism, eftersom matematiken påminner om hur en elektrisk laddning i rörelse ger upphov till ett magnetfält. En roterande massa ger på motsvarande sätt ett gravitationellt bidrag som en vilande massa saknar.'
      ] }
    ]
  },
  {
    id: "2026-08-22-lilla-smallen",
    date: "2026-08-22",
    title: "Urmaterien från universums första ögonblick har återskapats i de minsta atomkärnor någon prövat — och den kom ut formad som en kägla",
    deck: "I tjugo år har det krävts bly för att koka fram kvark-gluonplasma, materien som fyllde universum de första miljondelarna av en sekund. Nu har LHC lyckats med kärnor som bara rymmer 16 respektive 20 kärnpartiklar — och strömmen av partiklar som rann ut visade att neonkärnan inte är rund inuti utan avlång, som en bowlingkägla.",
    category: "Partikelfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-22-lilla-smallen.jpg",
    imageAlt: "Den knallröda, åttkantiga magneten kring ALICE-detektorn fyller en stor bergsal under jord, omgiven av gröna räcken, betongblock och gula travershissar.",
    imageCredit: "Foto: Miljenko Šuljić / Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["partikelfysik", "kärnfysik", "kvark-gluonplasma", "cern", "lhc", "alice", "atomkärnan", "kosmologi"],
    sources: [
      { name: "Københavns Universitet, Niels Bohr-institutet (pressmeddelande 20 augusti 2026)", url: "https://news.ku.dk/all_news/2026/08/researchers-create-a-little-big-bang-bowling-pin-shaped-nuclei-shed-new-light-on-the-universes-first-moments" },
      { name: "Phys.org (21 augusti 2026, om ALICE-mätningen)", url: "https://phys.org/news/2026-08-big-bowling-pin-nuclei-universe.html" },
      { name: "Phys.org (21 augusti 2026, om CMS-mätningen)", url: "https://phys.org/news/2026-08-lhc-collisions-reveal-oxygen-neon.html" },
      { name: "CERN Courier — First oxygen and neon collisions at the LHC", url: "https://cerncourier.com/first-oxygen-and-neon-collisions-at-the-lhc/" }
    ],
    research: {
      citation: "ALICE-samarbetet, ”Evidence of Nuclear Geometry-Driven Anisotropic Flow in OO and Ne-Ne Collisions at sqrt(sNN) = 5.36 TeV”, Physical Review Letters 137, 082301 (2026), DOI 10.1103/gymp-vp87. Preprint: arXiv:2509.06428 (CC BY 4.0). Den oberoende parallellmätningen: CMS-samarbetet, ”Observation of Long-Range Collective Flow in OO and NeNe Collisions and Implications for Nuclear Structure Studies”, Physical Review Letters 137 (2026), DOI 10.1103/26wx-tg6f, arXiv:2510.02580",
      url: "https://doi.org/10.1103/gymp-vp87"
    },
    body: [
      { type: 'p', html: 'Under de första miljondelarna av en sekund efter Big Bang fanns inga atomkärnor, inga protoner och inga neutroner. Universum var fyllt av något annat: en het, tät soppa där kvarkarna och gluonerna — de byggstenar som annars sitter inlåsta inuti protoner och neutroner — rörde sig fritt om varandra. Materietillståndet kallas kvark-gluonplasma, och det är den äldsta form av materia fysiken känner till.' },
      { type: 'p', html: 'Sedan början av 2000-talet går det att göra om. Receptet: skjut två blykärnor mot varandra i nästan ljusets hastighet och låt dem krocka. I den lilla droppe som bildas smälter kärnpartiklarna upp, kvarkarna kommer loss, och droppen flyter isär på omkring 10<sup>−23</sup>&nbsp;sekunder. Blyet har hela tiden ansetts nödvändigt — det behövdes 208 kärnpartiklar för att få tillräckligt mycket materia på tillräckligt liten yta.' },
      { type: 'p', html: 'Nu har den gränsen flyttats rejält. Under elva dagar sommaren 2025 lät CERN för första gången LHC krocka syrekärnor mot syrekärnor och neonkärnor mot neonkärnor, vid energin $\\sqrt{s_\\mathrm{NN}} = 5{,}36\\ \\mathrm{TeV}$ per kärnpartikelpar. Beteckningen ser värre ut än den är: indexet NN säger att energin gäller ett enskilt par kärnpartiklar, en ur vardera kärnan, och inte hela kärnkrocken, medan rottecknet sitter där för att storheten $s$ är definierad som energin i kvadrat. Kvar blir alltså vad två mötande kärnpartiklar har att omsätta mellan sig — 5,36 teraelektronvolt, drygt fem biljoner elektronvolt. Syre-16 rymmer 16 kärnpartiklar, neon-20 rymmer 20. Det är en tiondel eller mindre av vad en blykärna rymmer. Ändå bildades plasman.' },
      { type: 'quote', html: 'Vi har flyttat gränsen för hur små atomkärnorna kan vara och ändå återskapa den här urmaterien — det man skulle kunna kalla en liten Big Bang.', cite: 'You Zhou, docent vid Niels Bohr-institutet, som ledde ALICE-analysen' },
      { type: 'h2', text: 'Droppen är borta på ett ögonblick — ändå går den att mäta' },
      { type: 'p', html: 'Ingen ser plasman. Den hinner varken fotograferas eller vidröras, och det enda som når detektorn är de tusentals partiklar som droppen sprutar ut när den faller sönder. Men riktningarna de flyger i bär på information, och det är hela knepet.' },
      { type: 'p', html: 'När två kärnor träffar varandra snett överlappar de i ett område format som en mandel. Är materien i mitten en verklig vätska, som flyter, blir tryckskillnaden i mandelns smala led brantare än i det långa — och då slungas fler partiklar ut åt det smala hållet. Ojämnheten i utflödet mäts som ett tal som kallas elliptiskt flöde, $v_2$. Ett moln av oberoende partiklar som aldrig krockar med varandra skulle inte ge något sådant mönster alls. En vätska gör det.' },
      { type: 'p', html: 'ALICE-detektorn samlade in ungefär 3&nbsp;miljarder syrekollisioner och 400&nbsp;miljoner neonkollisioner, och i båda systemen växer $v_2$ på precis det sätt en vätskemodell förutsäger, med ett tydligt beroende av hur rakt på kärnorna träffade varandra. Något liknande hade aldrig setts i krockar mellan enstaka protoner. CMS-detektorn såg samma sak, oberoende, i sina egna data.' },
      { type: 'image', src: 'nyheter/bilder/2026-08-22-lilla-smallen-2.jpg', alt: 'Insidan av en stor cylindrisk detektor: en blå, tårtbitsindelad ändplatta i metall med hundratals kabelringar och stödbalkar, sedd snett framifrån.', caption: 'Ändplattan på ALICE:s spårkammare, den gasfyllda cylinder där de utslungade partiklarnas banor läses av. Det är riktningarna på dessa spår som bär informationen om kollisionens form.', credit: 'Foto: Stefan A. Gärtner / Wikimedia Commons (CC BY-SA 3.0)' },
      { type: 'h2', text: 'Käglan och pyramiden' },
      { type: 'p', html: 'Det verkligt oväntade kom när de två kärnsorterna jämfördes. Neonkollisionerna gav ett större elliptiskt flöde än syrekollisionerna: kvoten mellan dem toppar kring 1,08 i de allra rakaste krockarna och sjunker till omkring 1,05 en bit därifrån. Åtta procent låter futtigt, men osäkerheten på just kvoten ligger inom 1,5&nbsp;%, så skillnaden är verklig.' },
      { type: 'p', html: 'Förklaringen sitter i kärnornas inre form. Kärnfysikens modeller beskriver syre-16 som fyra tätt bundna heliumklumpar placerade i hörnen på en pyramid — en tetraeder — medan neon-20 snarare ser ut som en heliumklump som sitter fast på en syrekärna. Resultatet är en avlång kropp, och liknelsen kärnfysikerna själva använder är en bowlingkägla. En kägla som träffas på snedden ger en plattare mandel än en pyramid gör, alltså ett kraftigare utflöde åt sidorna.' },
      { type: 'quote', html: 'Partiklarna från urmaterien styrs direkt av atomkärnans geometriska form.', cite: 'Emil Gorm Dahlbæk Nielsen, postdoktor vid Niels Bohr-institutet' },
      { type: 'p', html: 'Här finns en finess som är lätt att missa. En syre- eller neonkärna i sitt grundtillstånd har ingen bestämd riktning i rummet — mätt utifrån är den fullkomligt rund. Den avlånga formen finns bara i kärnans inre struktur, och den pekar åt ett slumpmässigt håll i varje enskild kärna. Att den ändå går att komma åt beror på tempot: kärnan behöver mellan hundra och tusen gånger längre tid på sig för att vrida sig än vad en kollision tar. Under själva krocken står formen därför stilla, som en frusen ögonblicksbild, och statistiken över miljarder krockar plockar fram den.' },
      { type: 'h2', text: 'Varför syre och neon, av allt i periodiska systemet' },
      { type: 'p', html: 'Valet var inte slumpartat. Frågan fysikerna vill komma åt är var gränsen går för att en vätska alls ska kunna bildas. I droppen måste partiklarna hinna krocka med varandra många gånger innan alltihop flyger isär, annars uppstår aldrig något tryck att tala om. Blykollisioner ligger med god marginal på rätt sida om den gränsen och protonkollisioner långt på fel sida. Syre och neon förväntades ligga ungefär mitt emellan, alltså precis där det är intressant att titta.' },
      { type: 'p', html: 'Att det blev just dessa två grundämnen har också en praktisk sida. Kosmisk strålning som träffar jordens atmosfär möter till stor del syrekärnor, och för att tolka vad de gigantiska partikelskurar som följer egentligen betyder behövs mätdata från precis den sortens krockar. Sommarens elva dagar gav sådana data för första gången.' },
      { type: 'p', html: 'Något återstår att förstå. Det triangulära flödet $v_3$, som mäter en tresidig obalans i utflödet, stämmer inte lika väl med beräkningarna som det elliptiska gör. Innan den luckan är täppt går det inte att räkna bakvägen från kollisionsdata till exakta mått på kärnornas form. Att två helt oberoende detektorer vid samma accelerator ser samma mönster gör däremot huvudslutsatsen svår att komma ifrån.' },
      { type: 'p', html: 'Kvar står något som få hade väntat sig av ett och samma försök: det säger både något om hur materien betedde sig strax efter universums födelse och något om hur kärnpartiklarna sitter arrangerade inuti en helt vanlig neonatom.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Kvarkar kommer aldrig loss en och en. Ju längre isär man drar två kvarkar, desto hårdare drar gluonfältet tillbaka — till slut går det åt så mycket energi att ett nytt kvarkpar bildas i stället. Enda sättet att befria dem är att värma upp och pressa ihop hela klumpen på en gång, som i en kvark-gluonplasma.',
        'Bly-208 är dubbelt magisk: både antalet protoner (82) och antalet neutroner (126) fyller precis ett helt skal. Sådana kärnor är ovanligt stabila och nästan perfekt runda.',
        'Att atomkärnor kan ha andra former än klot visades av bland andra Aage Bohr, som fick Nobelpriset i fysik 1975 för sitt arbete vid samma institut som nu lett ALICE-analysen.',
        'Heliumkärnan — två protoner och två neutroner — är så hårt bunden att den fungerar som en byggkloss i lätta kärnor. Syre-16 kan beskrivas som fyra sådana klossar, neon-20 som fem.'
      ] },
      { type: 'p', html: 'Båda mätningarna publicerades i <em>Physical Review Letters</em>. ALICE-arbetet fick dessutom tidskriftens egen redaktionella utmärkelse ”Editors’ Suggestion”.' }
    ]
  },
  {
    id: "2026-08-21-infrarod-farg",
    date: "2026-08-21",
    title: "Ögat kan inte se värmestrålning — nu finns ett par glasögon som målar den i rött och cyan",
    deck: "Mörkerseende har alltid varit grönt eller gråtonat, eftersom en infraröd bild inte bär någon färg ögat kan läsa. Ett skikt kvantprickar ovanpå en organisk lysdiod ger nu varje infraröd våglängd sin egen kulör — i ett par genomskinliga glasögon som väger 23 gram.",
    category: "Fotonik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-21-infrarod-farg.jpg",
    imageAlt: "Ett par tunna glasögon står på en mörk labbänk. Genom det ena glaset syns rummet bakom i lysande rött och cyan, som om värmestrålning gjorts synlig, medan det andra glaset är klart.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["fotonik", "optik", "infrarött", "kvantprickar", "lysdiod", "syn", "nanoteknik"],
    sources: [
      { name: "Physics World (20 augusti 2026)", url: "https://physicsworld.com/a/upconverting-colloidal-quantum-dots-bring-colour-vision-to-the-infrared/" },
      { name: "Tech Xplore (3 augusti 2026)", url: "https://techxplore.com/news/2026-08-prototype-glasses-infrared-vision.html" },
      { name: "Popular Science (om samma studie)", url: "https://www.popsci.com/technology/infrared-glasses-human-eyesight/" },
      { name: "Crossref (volym, artikelnummer, författarlista, publiceringsdatum)", url: "https://api.crossref.org/works/10.1126/sciadv.aed0245" }
    ],
    research: {
      citation: "Chengchang Fu, Jintao Zou, Xiaoxue Yang, Qun Hao, Xin Tang och Ge Mu, ”Multispectral infrared-to-full-color upconversion expanding human vision”, Science Advances 12 (31), eaed0245 (2026)",
      url: "https://doi.org/10.1126/sciadv.aed0245"
    },
    body: [
      { type: 'p', html: 'Allt som är varmare än sin omgivning lyser. En människa, en nyss avstängd spisplatta, en katt under en buske — alla skickar de ut infraröd strålning dygnet runt, i mängder. Vi ser bara ingenting av det. Ögats synliga fönster är smalt, ungefär 400 till 700&nbsp;nm, och utanför det är världen kolsvart hur mycket den än strålar.' },
      { type: 'p', html: 'Med hjälpmedel går det förstås att se värmestrålning, och har gjort länge, men bilden har alltid haft samma brist: den kommer i en enda färg. Mörkerglasögon lyser grönt, och värmekameror målar i falska färger som en dator lagt på i efterhand — i båda fallen är det bara styrkan i signalen som syns, aldrig vilken infraröd våglängd strålningen faktiskt hade. Ett forskarlag vid Beijing Institute of Technology rapporterar nu en omvandlare som gör något annat — den låter den infraröda våglängden själv bestämma vilken färg ögat får se.' },
      { type: 'h2', text: 'Varför värmestrålning aldrig når fram' },
      { type: 'p', html: 'Att ögat missar det infraröda beror inte på att strålningen är för svag. Den är för lågenergisk per ljuspartikel. Energin i en foton ges av $E = \\dfrac{h \\cdot c}{\\lambda}$, alltså desto mindre ju längre våglängden är. En foton med våglängden 2&nbsp;µm bär omkring $0{,}62\\ \\mathrm{eV}$, medan färgämnet i näthinnans tappar och stavar behöver närmare $2\\ \\mathrm{eV}$ för att ändra form och utlösa en nervsignal.' },
      { type: 'p', html: 'Skillnaden går inte att kompensera med styrka. Miljarder infraröda fotoner uträttar lika lite som en enda — var och en av dem är för klen. Det behövs något som tar emot de svaga fotonerna och skickar vidare kraftigare i deras ställe.' },
      { type: 'h2', text: 'Prickar så små att storleken blir en färg' },
      { type: 'p', html: 'Fångstsidan i den nya konstruktionen består av kvantprickar av kvicksilvertellurid — nanokristaller så små att elektronerna inuti dem tvingas in i bestämda energinivåer, ungefär som i en atom. Vilka våglängder pricken kan absorbera bestäms då inte bara av vilket ämne den är gjord av utan också av hur stor den är, och den saken går att styra i tillverkningen. Materialet i studien tar upp infrarött ända bortom 2&nbsp;µm.' },
      { type: 'p', html: 'Ovanpå detektorskiktet sitter en organisk lysdiod med två olika lysande lager, ett rött och ett cyanfärgat. Laddningarna som den infraröda fotonen frigör leds upp i dioden, och tunna barriärer i lagren avgör var de får återförenas och skicka ut sitt ljus. Långvågigt, svagt infrarött tänder bara det röda lagret; kortvågigare och starkare tänder även det cyanfärgade. Färgen blir därmed en avläsning av vilken sorts infrarött som kommer in, inte bara av hur mycket.' },
      { type: 'quote', html: 'De exciterade laddningsbärarna transporteras och återförenas i olika lysande lager tack vare de hålfångande barriärer som byggts in i lagren.', cite: 'Xin Tang, Beijing Institute of Technology, en av studiens ansvariga forskare' },
      { type: 'p', html: 'Namnet på tricket är uppkonvertering, men det ska inte läsas som att energi skapas ur ingenting. Lysdioden drivs av en pålagd spänning, och den infraröda fotonen fungerar som en avtryckare som släpper fram det ljus spänningen betalar för. Verkningsgraden visar hur svårt det är: 3,85&nbsp;% av de infraröda fotonerna ger upphov till en synlig foton, alltså knappt fyra av hundra. Ljusstyrkan räcker ändå gott — över 700&nbsp;cd/m², i nivå med en ljusstark mobilskärm.' },
      { type: 'h2', text: 'Tjugotre gram på näsan' },
      { type: 'p', html: 'För att pröva saken byggde laget ett par lätta, halvgenomskinliga glasögon på 23&nbsp;gram, med omvandlaren i det ena glaset. Bäraren ser rummet som vanligt genom glaset samtidigt som den infraröda bilden ligger inlagd ovanpå i färg. Försöken gjordes med figurer och rörliga föremål som belystes med infrarött ljus, och konturerna kom fram skarpt.' },
      { type: 'p', html: 'Poängen med färgerna är mätbar. Förmågan att skilja små skillnader i den infraröda signalen blev över hundra gånger bättre än i ett vanligt enfärgat läge — inte för att detektorn blev känsligare, utan för att ögat är betydligt bättre på att skilja kulörer åt än på att bedöma om något är lite ljusare eller lite mörkare.' },
      { type: 'h2', text: 'Vad som återstår' },
      { type: 'p', html: 'Det här är en prototyp på en labbänk, inte en produkt. Ett enda öga täcks, verkningsgraden är låg, och kvicksilvertellurid är inte ett material man utan vidare sätter på tusentals människors ansikten. Forskarna pekar ändå ut ett andra spår som är både mer långsökt och mer lockande: en omvandlare tunn nog att placeras mot näthinnan och stimulera dess ljuskänsliga celler direkt, som en konstgjord synreceptor för den som förlorat sina egna.' },
      { type: 'p', html: 'Kvar står en fin liten tankeställare. Gropormar, vampyrfladdermöss och vissa skalbaggar har sedan länge egna organ för att känna av värmestrålning, medan vårt eget synsinne stannade vid regnbågens färger. Nu ligger skillnaden i ett skikt nanokristaller, inte i evolutionen.' },
      { type: 'fact', title: 'Visste du?', items: [
        'En fotons energi hänger ihop med våglängden: 400&nbsp;nm motsvarar ungefär 3,1&nbsp;eV, 700&nbsp;nm ungefär 1,8&nbsp;eV och 2&nbsp;µm bara 0,62&nbsp;eV. Det är därför blått ljus kan starta kemiska reaktioner som rött inte rår på.',
        'Mörkerglasögon lyser grönt av en anledning: ögat är som känsligast kring 555&nbsp;nm, så en given mängd ljus syns bäst just där.',
        'Kvantprickar är så små att elektronerna inuti dem bara får ha bestämda energier. Storleken blir då en ratt för färgen — samma princip används i kvantpricksskärmar.',
        'Gropormar som skallerormar har en grop på var sida om nosen med ett membran som känner av värmestrålning. Den informationen vävs samman med synintrycken i hjärnan.'
      ] },
      { type: 'p', html: 'Arbetet publicerades i <em>Science Advances</em> och lyftes fram på nytt av <em>Physics World</em> i augusti.' }
    ]
  },
  {
    id: "2026-08-20-ljusslutaren",
    date: "2026-08-20",
    title: "Slutaren som står öppen en biljondels sekund — så plockas ljuset som inte gått vilse ut ur dimman",
    deck: "I dimma och i vävnad studsar nästan allt ljus fram och tillbaka innan det når fram, och bilden dränks i gröt. Ett skikt metalloxid tunnare än en tusendels millimeter fungerar nu som en slutare som hinner öppna och stänga igen innan det bortspridda ljuset ens har kommit fram.",
    category: "Optik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-20-ljusslutaren.jpg",
    imageAlt: "Ett optiskt bord i ett mörklagt laboratorium. En röd laserstråle far genom dimma från vänster och träffar en tunn genomskinlig platta i ett svart hållarfäste, där en grön ljuspunkt lyser upp och en skarp grön stråle fortsätter åt höger.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["optik", "laser", "ljus", "spridning", "avbildning", "lidar"],
    sources: [
      { name: "University of Rochester (pressmeddelande, 17 augusti 2026)", url: "https://www.rochester.edu/newscenter/lidar-systems-cancer-imaging-time-gating-technology-715012/" },
      { name: "Phys.org (17 augusti 2026)", url: "https://phys.org/news/2026-08-gating-technique-deep-tissue-dense.html" },
      { name: "arXiv:2503.21113 (förhandsversion, CC BY 4.0 — metoddel och mätvärden)", url: "https://arxiv.org/abs/2503.21113" },
      { name: "Light: Science & Applications (uppföljaren med maskininlärning, 21 juli 2026)", url: "https://doi.org/10.1038/s41377-026-02375-6" }
    ],
    research: {
      citation: "Yang Xu, Saumya Choudhary, Long D. Nguyen, Matthew Klein, Shivashankar Vangala, J. Keith Miller, Eric G. Johnson, Joshua R. Hendrickson, M. Zahirul Alam och Robert W. Boyd, ”Epsilon-near-zero time-gate for high-fidelity spatial information transfer through dynamic scattering media”, Nature Communications 17, 5674 (2026)",
      url: "https://doi.org/10.1038/s41467-026-71039-1"
    },
    body: [
      { type: 'p', html: 'Slå på helljuset i tät dimma och sikten blir sämre, inte bättre. Ljuset försvinner inte — det tar bara aldrig den väg du hoppades på. Varje liten vattendroppe kastar strålarna åt ett nytt håll, och det som når ögat är en jämngrå vägg av ljus som varit överallt utom där du tittade. Samma sak händer i hud och vävnad: rött och infrarött ljus tar sig faktiskt flera centimeter in i kroppen, men det kommer ut som ett diffust sken utan minsta spår av vad det passerade på vägen.' },
      { type: 'p', html: 'Ett lag optikforskare vid University of Rochester har nu byggt ett sätt att sortera bort allt det där — och sorteringen görs inte efter färg eller riktning, utan efter ankomsttid.' },
      { type: 'h2', text: 'Fotonerna som gick rakaste vägen' },
      { type: 'p', html: 'När en kort ljuspuls skickas in i dimma delar den upp sig i två sällskap. En liten andel fotoner slinker rakt igenom utan att träffa något; de kallas <em>ballistiska</em> och bär hela bilden av det som ligger bakom. Resten studsar runt bland dropparna och kommer fram lite senare, från alla möjliga håll, som ett efterföljande brus.' },
      { type: 'p', html: 'Och ”lite senare” är hela poängen. Ljus rör sig med ändlig fart, så en omväg kostar tid enligt $s = c \\cdot t$. På 100&nbsp;femtosekunder — en tiondels biljondels sekund — hinner ljus i luft bara 30&nbsp;µm, ungefär en tredjedels hårstrå. En slutare som öppnar precis när de ballistiska fotonerna anländer och stänger igen inom en biljondels sekund släpper alltså in bilden och stänger ute gröten.' },
      { type: 'p', html: 'Problemet har alltid varit att bygga en sådan slutare. Ingen mekanisk kamerakonstruktion i världen rör sig så fort.' },
      { type: 'h2', text: 'En slutare byggd av ljus' },
      { type: 'p', html: 'Lösningen är ett skikt av indiumtennoxid, samma genomskinliga och strömledande material som sitter i pekskärmar, här bara några hundra nanometer tjockt. Vid en viss våglängd — omkring 1&nbsp;515&nbsp;nm för just den här filmen — går materialets elektriska permittivitet nästan ner till noll — materialet sägs vara epsilon-nära-noll. I det tillståndet reagerar materialet ovanligt kraftigt på starkt ljus, och det blir möjligt att styra ljus med ljus.' },
      { type: 'p', html: 'Forskarna lyser in bilden med en infraröd puls på 1&nbsp;550&nbsp;nm och skickar samtidigt in en styrpuls på 100&nbsp;fs. Bara i det ögonblick de två pulserna överlappar i filmen sker en fyrvågsblandning där energin från tre infraröda fotoner läggs ihop till en enda ny foton — med tre gånger så hög frekvens och därmed våglängden 517&nbsp;nm, alltså grönt synligt ljus. Utanför det ögonblicket händer ingenting. Grinden är öppen kortare än en biljondels sekund.' },
      { type: 'quote', html: 'Tidsgrindning fungerar i princip som slutaren i en kamera. I en vanlig kamera är slutaren mekanisk — när den öppnas kommer ljus in, och när den stängs stoppas ljuset. Här använder vi ljus för att styra ljus.', cite: 'Yang Xu, doktor i optik vid University of Rochester och studiens förstaförfattare' },
      { type: 'h2', text: 'Grönt i stället för infrarött — och en bild som slutar flimra' },
      { type: 'p', html: 'Att bilden byter färg på vägen är ingen bieffekt utan en av vinsterna. Infraröda kameror bygger på dyra halvledare som indiumgalliumarsenid, medan grönt ljus läses av vilken vanlig kiselsensor som helst — samma sorts chip som i en mobilkamera. Försöken lästes just av med en enkel svartvit kiselkamera.' },
      { type: 'p', html: 'Den andra vinsten syns när det som skymmer sikten är i rörelse, som verklig dimma eller strömmande blod. Då flimrar en vanlig bild kraftigt från ögonblick till ögonblick. Med tidsgrinden dämpades det flimret med två tiopotenser, alltså ungefär hundra gånger. Forskarna provade både frostade glasskivor av två olika grovlekar och en vätska full av rörliga plastkulor på några mikrometer — laboratoriets ersättning för dimma och vävnad. Bilden av ett testmönster gick från oläslig till skarp.' },
      { type: 'p', html: 'Kvar finns två hinder. Omvandlingen är extremt ineffektiv: bara ungefär en foton på åttiotusen tar sig igenom som grön. Och synfältet är litet. Det senare har laget angripit tillsammans med forskare vid UCLA, som lärde ett neuronnät fysiken bakom avbildningen och därmed kunde räcka ut bilden över en betydligt större yta än grinden själv täcker.' },
      { type: 'h2', text: 'Vad det kan bli' },
      { type: 'p', html: 'De tilltänkta användningarna ligger där spritt ljus i dag sätter gränsen: bilddiagnostik som vill se djupare in i vävnad, och lidar i självkörande fordon, som mäter avstånd med laserpulser och tappar räckvidd så fort dimman lägger sig. Ingetdera är demonstrerat än — försöken är gjorda på ett optiskt bord, inte på en dimmig landsväg eller en patient. Men principen bakom är slående enkel: när ljuset inte längre kan sorteras på färg eller riktning, sortera det på klockan.' },
      { type: 'fact', title: 'Visste du?', items: [
        'Ljus färdas ungefär 0,3&nbsp;mm på en pikosekund (en biljondels sekund) och 30&nbsp;µm på 100&nbsp;femtosekunder. Ljusets ändliga fart blir därmed en linjal för mycket korta sträckor.',
        'Indiumtennoxid är genomskinligt och leder ström samtidigt, vilket är ovanligt. Därför sitter det som osynliga elektroder i pekskärmar och solceller.',
        'Att lägga ihop tre fotoners energi till en ger tre gånger så hög frekvens: 1&nbsp;550&nbsp;nm delat på tre blir 517&nbsp;nm, som ögat uppfattar som grönt.',
        'Rött och nära-infrarött ljus tar sig längst in i mänsklig vävnad. Det är därför pulsoximetern på fingret lyser rött.'
      ] },
      { type: 'p', html: 'Arbetet publicerades i <em>Nature Communications</em> och uppföljningen med maskininlärning i <em>Light: Science &amp; Applications</em>. Bakom det står Robert Boyds laboratorium i Rochester, som enligt universitetet arbetat med tidsgrindning i över tio år.' }
    ]
  },
  {
    id: "2026-08-19-tomrummets-dubbelbrytning",
    date: "2026-08-19",
    title: "Tomrummet är inte tomt — kring en död stjärna beter sig rymden som en kristall",
    deck: "Kvantfysiken har i nittio år påstått att ett tillräckligt starkt magnetfält gör själva vakuumet till ett optiskt material som delar upp ljuset. Ingen har kunnat bygga ett sådant fält på jorden. Nu har tre teleskop tillsammans mätt något kring en magnetar som är svårt att förklara på något annat sätt.",
    category: "Astrofysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-19-tomrummets-dubbelbrytning.jpg",
    imageAlt: "Illustration av en magnetar: ett bländande blåvitt klot mot svart stjärnhimmel, omgivet av vida blå bågar som markerar magnetfältets linjer. Ur klotet skjuter två strålar snett uppåt höger, och två genomskinliga koner med vågmönster inuti visar var radiovågorna respektive röntgenstrålningen sänds ut.",
    imageCredit: "Illustration: NASA/Pablo Garcia (public domain), beskuren",
    tags: ["astrofysik", "kvantfysik", "kvantelektrodynamik", "magnetar", "neutronstjärna", "polarisation", "magnetfält", "röntgenstrålning", "vakuum", "optik"],
    sources: [
      { name: "NASA — NASA’s IXPE May Have Proven 90-Year-Old Theory (pressmeddelande 5 augusti 2026)", url: "https://science.nasa.gov/missions/ixpe/nasas-ixpe-may-have-proven-90-year-old-theory/" },
      { name: "ScienceDaily — Scientists may have finally proved that ”empty” space isn’t really empty", url: "https://www.sciencedaily.com/releases/2026/08/260815065007.htm" },
      { name: "CSIRO/ATNF — X-ray and radio evidence for vacuum birefringence", url: "https://www.atnf.csiro.au/daily-picture/2026/08/07/x-ray-and-radio-evidence-for-vacuum-birefringence/" },
      { name: "Nature — originalartikeln", url: "https://doi.org/10.1038/s41586-026-10859-z" },
      { name: "arXiv:2509.19446 — förhandsversionen med hela metoddelen och alla mätvärden", url: "https://arxiv.org/abs/2509.19446" }
    ],
    research: {
      citation: "R. E. Stewart, H. Dinh Thi, G. Younes, M. E. Lower, M. G. Baring, M. Negro, F. Camilo, J. B. Coley, T. Enoto, A. K. Harding, W. C. G. Ho, C.-P. Hu, P. Kaaret, P. Scholz, A. Van Kooten, Z. Wadiasingh, ”Vacuum birefringence and the polarized X-ray emission from a radio magnetar”, Nature, publicerad online 5 augusti 2026 (DOI 10.1038/s41586-026-10859-z). Förhandsversion: arXiv:2509.19446",
      url: "https://doi.org/10.1038/s41586-026-10859-z"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 — magnetfält och magnetisk flödestäthet" },
        { label: "Fysik nivå 2 — ljus som elektromagnetisk våg" },
        { label: "Fysik nivå 1 — stjärnornas slutstadier och atomkärnan" }
      ],
      fragor: [
        "Forskarna kan inte se vakuumet bryta ljuset. De ser bara att strålningen är mer ordnad än den borde vara, och att ingen av de vanliga modellerna klarar av att förklara det. När räcker ett ”ingenting annat fungerar” som stöd för en teori, och när är det i stället ett tecken på att någon förklaring ännu saknas?",
        "Effekten kräver magnetfält långt bortom de starkaste vi kan bygga. Vad innebär det för vetenskapen att vissa förutsägelser bara går att pröva på objekt vi aldrig kan besöka, och där försöket inte går att göra om?",
        "Mätningen bygger på tre helt olika instrument: två rymdteleskop för röntgen och en radioantenn på marken. Vad tillför radiomätningen, som inte hade gått att få ut ur de två andra?"
      ]
    },
    body: [
      { type: 'p', html: 'Ett vakuum är per definition ingenting: inga atomer, inga molekyler, inget som ljuset kan studsa emot. Ljus som färdas genom tomrum ska därför färdas rakt, med en och samma hastighet, oavsett hur vågen råkar svänga.' },
      { type: 'p', html: 'Kvantfysiken håller inte med. Enligt kvantelektrodynamiken bubblar tomrummet ständigt av par av elektroner och positroner som lånar energi, existerar en ofattbart kort stund och försvinner igen. Vanligtvis märks de inte. Men lägg ett tillräckligt starkt magnetfält över tomrummet, och paren hinner ställa in sig efter fältet innan de slocknar. Vakuumet får då en struktur — och struktur är precis vad optiska material är gjorda av.' },
      { type: 'p', html: 'Werner Heisenberg och hans student Hans Euler räknade ut konsekvensen redan 1936: ett magnetiserat vakuum ska bryta ljus olika mycket beroende på hur ljusvågen svänger, alldeles som en kalcitkristall gör. Håller man en sådan kristall över en textrad ser man två rader. Fenomenet heter dubbelbrytning, och i vakuum har det aldrig kunnat visas.' },
      { type: 'p', html: 'Ett lag med Rachael Stewart vid George Washington University i spetsen rapporterar nu i <em>Nature</em> den hittills starkaste indikationen på att det ändå sker — inte i ett laboratorium, utan runt kvarlevan efter en död stjärna.' },

      { type: 'h2', text: 'Varför ingen kan göra försöket på jorden' },
      { type: 'p', html: 'Effekten blir påtaglig först i närheten av den kritiska fältstyrkan, $B_\\mathrm{c} \\approx 4{,}4 \\cdot 10^{9}\\ \\mathrm{T}$. Det är ett tal utan motstycke i mänsklig teknik. En magnetkamera på ett sjukhus arbetar vid några tesla, och de kraftigaste labbmagneter som finns når några tiotal. Vi ligger alltså inte en faktor tio från målet, utan ungefär hundra miljoner.' },
      { type: 'p', html: 'Försök har gjorts ändå. I experiment som PVLAS i Italien har laserljus i tjugo år skickats fram och tillbaka tusentals gånger genom en stark magnet, för att en försvinnande liten effekt ska hinna samlas ihop till något mätbart. Signalen är fortfarande för svag. Vill man se dubbelbrytning i vakuum får man alltså leta upp någon annan som redan har fältet.' },

      { type: 'h2', text: 'Stjärnan som har fältet' },
      { type: 'p', html: 'När en tung stjärna har bränt slut kollapsar dess kärna. Kvar blir en neutronstjärna: mer massa än solen packad i en kula på ett par mil, så tät att en tesked av materialet skulle väga ett par miljarder ton. En liten grupp av dem har dessutom magnetfält långt bortom det vanliga, och kallas magnetarer.' },
      { type: 'p', html: 'Studiens objekt heter 1E 1547.0−5408, ligger omkring 15&nbsp;000 ljusår bort och snurrar ett varv på 2,09&nbsp;s. Vid ytan är dess magnetfält ungefär $2{,}2 \\cdot 10^{10}\\ \\mathrm{T}$ — drygt sju miljarder gånger starkare än en magnetkamera, och ungefär fem gånger över den kritiska fältstyrkan. Om dubbelbrytning i vakuum över huvud taget förekommer i naturen, så förekommer den här.' },
      { type: 'p', html: 'Stjärnan har ytterligare en egenskap som visade sig avgörande: den lyser starkt både i röntgen och i radio, vilket är sällsynt bland magnetarer.' },

      { type: 'h2', text: 'Tre teleskop, elva dygn' },
      { type: 'p', html: 'Mellan den 26 mars och den 5 april 2025 riktades tre instrument mot stjärnan samtidigt. NASA:s IXPE, som är byggt för att mäta åt vilket håll röntgenstrålning svänger, samlade 499,5&nbsp;ks — knappt 140&nbsp;timmars effektiv mättid. NICER ombord på rymdstationen höll reda på stjärnans rotation, och Murriyang, den 64&nbsp;m breda radioskålen i Parkes i Australien, lyssnade i bandet 2,5–4,0&nbsp;GHz. Det var första gången någon mätt polarisationen hos en magnetar i radio och röntgen samtidigt.' },
      { type: 'p', html: 'Strålningen visade sig vara påfallande välordnad. Över hela bandet 2–8&nbsp;keV var 46&nbsp;±&nbsp;4&nbsp;% av röntgenljuset polariserat åt ett och samma håll, och i det mjukaste bandet steg andelen till omkring 60&nbsp;%. Under vissa delar av rotationen nådde den 74&nbsp;±&nbsp;11&nbsp;%. Det är ungefär två och en halv gånger mer än vad andra magnetarer brukar visa.' },

      { type: 'h2', text: 'Varför mätvärdet är svårt att förklara bort' },
      { type: 'p', html: 'Höga värden är i sig inget bevis. Det avgörande var vad radioteleskopet bidrog med. Ur hur radiovågornas svängningsriktning vrider sig under ett varv går stjärnans geometri att räkna fram, och den visade sig ovanlig: magnetaxeln lutar bara ett par grader mot rotationsaxeln, och vi tittar nästan rakt ner i den ena magnetpolen.' },
      { type: 'p', html: 'Just den geometrin gör mätningen besvärlig att förklara. Tittar man rakt ner i en magnetpol ser man en yta där fältet pekar åt alla håll runt mitten. Ljus från olika delar av ytan skulle då svänga åt olika håll och till stor del ta ut varandra, så att den sammanlagda polarisationen blev låg — i praktiken nära noll under delar av varvet. I stället var den hög hela varvet igenom.' },
      { type: 'p', html: 'Dubbelbrytning i vakuum löser knuten. Är tomrummet runt stjärnan optiskt aktivt följer varje ljusstråles svängningsriktning det lokala magnetfältet ut genom magnetosfären, i stället för att ligga kvar som den var vid ytan. Först långt ute, där fältet tunnats ut och blivit i det närmaste enhetligt över hela synfältet, släpper kopplingen. Ljus som lämnade ytan åt vilket håll som helst når därför fram med sina svängningar inbördes uppradade. Sorteringen sker alltså på vägen, inte vid utsändningen.' },
      { type: 'p', html: 'Laget körde sina data mot simuleringar både med och utan den effekten. Utan blev anpassningen dålig, med blev den god. Ett ytterligare tecken finns i hur polarisationen dippar mellan 3&nbsp;keV och 4&nbsp;keV, ungefär där teorin placerar en resonans som får ljusets två svängningsmoder att byta plats med varandra.' },
      { type: 'quote', html: 'Vår modell säger att man måste ha med dubbelbrytning i vakuum runt neutronstjärnan för att återge de uppmätta röntgenpolarisationerna och samtidigt klara de villkor radioobservationerna sätter.', cite: 'Hoa Dinh Thi, Rice University, en av studiens huvudförfattare' },

      { type: 'h2', text: 'Fortfarande ett indicium' },
      { type: 'p', html: 'Forskarna själva, och NASA i sitt pressmeddelande, väljer sina ord med omsorg: mätningen <em>kan</em> vara den första direkta observationen av effekten. Det är inte samma sak som att saken är avgjord.' },
      { type: 'p', html: 'Invändningarna är kända och rimliga. Ovanför omkring 4&nbsp;keV blir signalen svag och slutsatserna osäkra. Jämförelsen mellan data och teori vilar på en modell av stjärnans yta och atmosfär som i sig innehåller antaganden. Och det finns en oförklarad förskjutning mellan var radiopulsen och röntgenpulsen infaller, som antingen betyder att strålningen sänds ut på olika höjd eller att magnetfältet inte är fullt så prydligt som modellen förutsätter.' },
      { type: 'p', html: 'Vad som skulle avgöra saken är känt: en djupare mätning som fångar dippen vid vakuumresonansen med bättre säkerhet, samma mönster hos fler magnetarer, eller — någon gång — ett laboratorium som lyckas. Tills dess står påståendet på ett indicium som är starkt, men ett indicium.' },
      { type: 'p', html: 'Det är ändå värt att stanna upp vid vad som mättes. Ljuset lämnade stjärnan för femtontusen år sedan, passerade genom ett område där tomrummet självt kanske uppträdde som glas, och landade till slut i en detektor i omloppsbana kring jorden.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Kalcit, eller isländsk spat, var det första dubbelbrytande materialet som beskrevs vetenskapligt. Vikingarna har föreslagits ha använt kristallen som ”solsten” för att hitta solens läge en mulen dag — men det är en hypotes, inte något som är belagt.',
        'Att ljus kan påverka ljus i tomrum har faktiskt setts på jorden, fast på ett annat sätt: 2017 rapporterade ATLAS-experimentet vid LHC att två fotoner kan studsa mot varandra i de starka elektriska fälten kring blyjoner som passerar tätt förbi. Det är samma underliggande kvanteffekt.',
        'IXPE sköts upp i december 2021 och var det första röntgenpolarimetriska teleskopet på decennier. Föregångaren OSO-8 gjorde motsvarande mätningar på 1970-talet, och därefter låg tekniken i praktiken nere i fyrtio år.',
        'Magnetarer är korta episoder i en stjärnas liv. Fälten är så starka att de bryter ner sig själva, och efter kanske tiotusen år har magnetaren mattats av till en helt vanlig neutronstjärna.'
      ] }
    ]
  },
  {
    id: "2026-08-18-tredjedels-laddning",
    date: "2026-08-18",
    title: "En elektron går inte att dela — ändå har fysiker nu räknat tredjedelar av en i en bit grafen",
    deck: "Elementarladdningen är fysikens minsta valör: all laddning kommer i hela sådana. Men i ett tvådimensionellt elektronhav nära absoluta nollpunkten dyker det upp objekt som bär en tredjedel av den. Ett lag vid EPFL har byggt en pytteliten kulle i grafen som räknar dem, en i taget.",
    category: "Kvantfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-18-tredjedels-laddning.jpg",
    imageAlt: "Illustration: ett tvådimensionellt honungskaksmönster av kolatomer sträcker sig mot horisonten i mörkblått. Mitt i mönstret höjer sig en ljus kupol, och en lysande gulorange ring löper runt kupolens fot. Ovanifrån faller svaga blå strimmor ner mot ytan.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "elementarladdning", "grafen", "kvasipartiklar", "kvant-halleffekten", "magnetfält", "tunneleffekt", "topologisk materia", "kvantdator", "ellära"],
    sources: [
      { name: "Phys.org — Graphene device measures fractional electric charges carried by some of quantum physics' strangest objects", url: "https://phys.org/news/2026-08-graphene-device-fractional-electric-quantum.html" },
      { name: "Mirage News — EPFL:s pressmeddelande i återpublicering, ”How do you measure one third of an electron?”", url: "https://www.miragenews.com/how-do-you-measure-one-third-of-electron-1728104/" },
      { name: "Nature Physics — originalartikeln", url: "https://doi.org/10.1038/s41567-026-03412-2" },
      { name: "arXiv:2509.04209 — förhandsversionen med hela metoddelen (CC BY 4.0)", url: "https://arxiv.org/abs/2509.04209" }
    ],
    research: {
      citation: "M. Di Luca, E. Hajigeorgiou, Z. Zhou, T. Lotrič, T. Feng, K. Watanabe, T. Taniguchi, S. H. Simon, M. Banerjee, ”Quantum Hall antidot as a fractional coulombmeter”, Nature Physics, publicerad 14 augusti 2026 (DOI 10.1038/s41567-026-03412-2). Förhandsversion: arXiv:2509.04209 (CC BY 4.0)",
      url: "https://doi.org/10.1038/s41567-026-03412-2"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 — 7.1 Laddning och influens", href: "katalog.html?id=fy1-7.1" },
        { label: "Fysik nivå 2 — magnetisk kraft på laddade partiklar", href: "fysik2-laddade-partiklar-app.html" }
      ],
      fragor: [
        "Ingen har fångat in en kvasipartikel och vägt den. Slutsatsen om en tredjedels laddning bygger på hur tätt en elektrisk signal upprepar sig. Vad krävs för att en indirekt mätning ska räknas som ett svar på frågan ”hur stor är laddningen”?",
        "Elementarladdningen brukar beskrivas som odelbar. Kvasipartiklarna delar inte någon elektron, utan uppstår ur många elektroners gemensamma rörelse. Var går gränsen mellan en riktig partikel och ett mönster som beter sig som en partikel?",
        "Samma mätning har gjorts förut med betydligt mer komplicerad utrustning. Varför är det värt att publicera ett enklare sätt att mäta något som redan är känt?"
      ]
    },
    body: [
      { type: 'p', html: 'Elektrisk laddning kommer i hela valörer. Ladda upp en ballong mot håret, gnid en glasstav mot siden eller mät strömmen genom en lampa — hur du än gör blir laddningen ett helt antal elementarladdningar, $e = 1{,}602 \\cdot 10^{-19}\\ \\mathrm{C}$. Robert Millikan visade det för drygt hundra år sedan genom att låta små oljedroppar sväva i ett elektriskt fält, och sedan dess har ingen hittat en fri laddning som är mindre. En halv elektron finns inte att köpa.' },
      { type: 'p', html: 'Ändå har fysiker vid EPFL i Lausanne just publicerat en mätserie där instrumentet gång på gång svarar ”en tredjedel”. Och de har inte delat någon elektron.' },

      { type: 'h2', text: 'När elektronerna slutar vara enskilda' },
      { type: 'p', html: 'Knepet är att tvinga in elektronerna i ett tillstånd där de inte längre går att räkna en och en. Fångar man dem i ett skikt som är så tunt att de bara kan röra sig i två riktningar, kyler ner alltihop till en hundradels grad över absoluta nollpunkten och sätter på ett magnetfält hundratusentals gånger starkare än jordens, slutar elektronerna bete sig som ett myller av oberoende partiklar. De organiserar sig i stället i ett enda stelt, ordnat kvanttillstånd — en sorts elektronvätska.' },
      { type: 'p', html: 'Det är kvant-Halleffekten, och den är känd sedan 1980. Det märkliga upptäcktes två år senare: i vissa av dessa tillstånd svarar vätskan på en störning inte genom att flytta en hel elektron, utan genom att skicka i väg en liten krusning som bär exakt en tredjedel av en elektrons laddning. Robert Laughlin förklarade 1983 varför, och han delade Nobelpriset i fysik 1998 med Horst Störmer och Daniel Tsui för just detta.' },
      { type: 'p', html: 'Krusningarna kallas kvasipartiklar. De består inte av något — de <em>är</em> ett mönster i hur miljarder elektroner rör sig tillsammans, ungefär som en våg på en sjö inte är gjord av något annat än vatten som redan fanns där. Men mönstret uppför sig som en partikel: det har en bestämd plats, det kan flyttas, det kan studsa, och det bär en bestämd laddning. Bara att laddningen är en bråkdel av den minsta laddning som existerar.' },

      { type: 'h2', text: 'En kulle mitt i elektronhavet' },
      { type: 'p', html: 'Att mäta en sådan laddning har hittills krävt känsliga instrument och gott om tålamod — antingen genom att lyssna på det svaga bruset i strömmen, eftersom bruset avslöjar hur stora paket laddningen kommer i, eller genom att bygga en interferometer där kvasipartiklarna får gå två vägar och störa varandra. Bägge metoderna fungerar, och bägge är svåra.' },
      { type: 'p', html: 'Laget kring Mitali Banerjee vid Laboratoriet för kvantfysik, topologi och korrelationer på EPFL valde en annan väg. De byggde sitt elektronhav i tvålagersgrafen — två atomtunna skikt av kolatomer — inbäddat mellan skivor av bornitrid och omgivet av elektroder av grafit. Med elektroderna reste de sedan en liten elektrisk kulle mitt i havet: ett område dit kvasipartiklarna inte kommer in. En sådan kulle kallas en antidot, ungefär som en kvantprick vänd ut och in. Den var omkring 190&nbsp;nanometer i diameter — några hundra gånger tunnare än ett hårstrå. Hela chipet kyldes till ungefär 0,01&nbsp;K och sattes i magnetfält på mellan 5&nbsp;T och 13,5&nbsp;T.' },
      { type: 'p', html: 'Runt kullen springer kvasipartiklarna i slutna banor, och där kommer kvantmekaniken in. En laddad partikel som går ett varv runt ett inneslutet magnetfält får sin våg fasförskjuten — Aharonov–Bohm-effekten. Skruvar man långsamt upp magnetfältet eller spänningen på elektroderna passerar banan därför omväxlande genom lägen där det är lätt respektive svårt för en kvasipartikel att tunnla tvärs över kullen. Resultatet är en elektrisk signal som svänger fram och tillbaka, fullständigt regelbundet, med en tick för varje kvasipartikel som tar sig över.' },
      { type: 'p', html: 'Och det är i takten svaret sitter. Hur mycket magnetfält eller spänning som krävs mellan två tick beror direkt på hur stor laddning den tunnlande krusningen bär. En bärare med liten laddning ger tätare tick. Antidoten blir därmed en laddningsmätare som avläses med en helt vanlig ledningsförmågemätning — en fraktionell coulombmeter, som forskarna kallar den i artikelns titel.' },

      { type: 'image', src: 'nyheter/bilder/2026-08-18-tredjedels-laddning-2.jpg', alt: 'Två paneler. Till vänster en tredimensionell ritning av chipet: ett rutmönstrat grafenskikt mellan blå och lila plattor, med guldfärgade kontakter och en röd ringformad bana kring ett hål i mitten. Till höger ett svartvitt elektronmikroskopfoto av det färdiga chipet, färglagt i lila, gult och blått, med mätinstrument inritade runt om.', caption: 'Till vänster försökets uppbyggnad: grafenskiktet mellan bornitrid, med den ringformade banan runt antidoten. Till höger det verkliga chipet i svepelektronmikroskop, färglagt i efterhand, med mätkretsen inritad.', credit: 'Bild: M. Di Luca m.fl., arXiv:2509.04209 (CC BY 4.0), beskuren' },

      { type: 'h2', text: 'Vad mätaren svarade' },
      { type: 'p', html: 'Elektronvätskan kan låsa sig i många olika ordnade tillstånd, och vilket det blir styrs av hur många elektroner som finns per magnetisk flödesvirvel. Det talet kallas fyllnadsfaktor och skrivs $\\nu$ (ny). Vid $\\nu = 2$ är två nivåer prydligt fyllda; det är i de tillstånd där $\\nu$ är ett bråk som de fraktionella laddningarna dyker upp.' },
      { type: 'p', html: 'Antidoten fick avläsa flera av dem. Vid $\\nu = 4/3$, $5/3$ och $7/3$ svarade den en tredjedels elektronladdning, alltså ungefär $5{,}3 \\cdot 10^{-20}\\ \\mathrm{C}$. Vid $\\nu = 2/3$ blev svaret två tredjedelar, och vid $\\nu = 3/5$ tre femtedelar. Ett av tillstånden vägrade ge ett entydigt besked: vid $\\nu = 8/3$ visade mätningen tecken på både en tredjedel och två tredjedelar samtidigt. Forskarna går igenom flera möjliga förklaringar — bland annat att kanten på elektronvätskan kan ha en mer sammansatt struktur där, och att två olika sorters tunnling pågår parallellt — utan att slå fast vilken som stämmer.' },
      { type: 'p', html: 'Att en mätning inte ger ett rent svar är för övrigt inte ett misslyckande. Det är oftast där nästa försök börjar.' },
      { type: 'quote', html: 'Samma geometri skulle också kunna användas som byggsten i en topologisk kvantdator.', cite: 'Mario Di Luca, EPFL, förstaförfattare till studien' },

      { type: 'h2', text: 'Varför en enklare mätare spelar roll' },
      { type: 'p', html: 'Citatet syftar på att kvasipartiklarna i de här tillstånden inte bara har udda laddning. De har också en annan egenskap: byter man plats på två av dem minns systemet att det skett. I en tänkt topologisk kvantdator skulle information lagras i just sådana ombytesmönster, vilket skulle göra den okänslig för de småstörningar som är dagens kvantdatorers värsta fiende — fast då krävs en mer svårfångad sort av kvasipartiklar än dem som mätts här. Att bygga en sådan maskin ligger dock långt fram, och det här försöket är inte ett steg på vägen dit utan ett bättre instrument för att undersöka materialen den skulle kräva.' },
      { type: 'p', html: 'Det är också hela poängen. Antidoten är liten, den styrs elektriskt, och den avläses med en mätning vilket välutrustat lågtemperaturlabb som helst redan behärskar. Forskarna påpekar att samma upplägg borde gå att flytta över till andra tvådimensionella material än grafen. Ett enklare instrument gör inte en ny upptäckt i sig — men det gör att fler kan leta.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Kvasipartiklarna bryter inte mot regeln att laddning kommer i hela elementarladdningar. Räknar man ihop hela elektronvätskan är summan alltid ett helt antal — bråkdelarna finns bara i de krusningar systemet kan bilda.',
        'Grafen är ett enda lager kolatomer i ett honungskaksmönster, och det tillverkades första gången genom att man drog av lager efter lager från en grafitbit med tejp. Metoden gav Andre Geim och Konstantin Novoselov Nobelpriset i fysik 2010.',
        'Vid 0,01&nbsp;K är chipet kallare än något som finns naturligt i universum. Rymdens bakgrundsstrålning håller 2,7&nbsp;K, alltså nästan trehundra gånger varmare.',
        'Kvant-Halleffekten är så exakt att resistansen i de fyllda tillstånden bara beror på två naturkonstanter, Plancks konstant och elementarladdningen. Sedan 1990 används den därför som internationell normal för elektrisk resistans.'
      ] }
    ]
  },
  {
    id: "2026-08-17-gluonknuten-i-protonen",
    date: "2026-08-17",
    title: "Protonens identitet sitter kanske inte i kvarkarna — utan i en Y-formad knut av gluoner",
    deck: "Läroboken säger att en protons baryontal är jämnt fördelat på dess tre kvarkar, en tredjedel på var och en. Nu har STAR-detektorn vid Brookhaven mätt hur baryontalet flyttar sig i partikelkrockar, och det rör sig nästan dubbelt så villigt som kvarkarna kan förklara. Kandidaten som blir kvar är en gammal och underlig idé: en knut av gluoner.",
    category: "Partikelfysik",
    readingTime: "7 min",
    image: "nyheter/bilder/2026-08-17-gluonknuten-i-protonen.jpg",
    imageAlt: "STAR-detektorn vid Relativistic Heavy Ion Collider sedd underifrån: en husstor apparat i blå och gula stålsektioner, tätt packad med kabelknippen, rör och elektronik, med en byggnadsställning framför.",
    imageCredit: "Foto: Z22 / Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["partikelfysik", "kvarkar", "gluoner", "proton", "baryontal", "stark växelverkan", "standardmodellen", "partikelaccelerator", "antimateria", "fysik 1"],
    sources: [
      { name: "Brookhaven National Laboratory — Gluons may play central role in baryon number conservation", url: "https://www.bnl.gov/newsroom/news.php?a=122692" },
      { name: "Rice University — Scientists uncover new clue to how protons maintain their identity", url: "https://news.rice.edu/news/2026/scientists-uncover-new-clue-how-protons-maintain-their-identity" },
      { name: "EurekAlert! — Gluons carry a proton's baryon number", url: "https://www.eurekalert.org/news-releases/1139404" },
      { name: "ScienceDaily — referat av samma studie", url: "https://www.sciencedaily.com/releases/2026/08/260815064805.htm" },
      { name: "Science — originalartikeln", url: "https://doi.org/10.1126/science.ads5962" }
    ],
    research: {
      citation: "STAR-samarbetet, ”Tracking the baryon number with nuclear collisions”, Science 393 (6812), s. 727–731, publicerad 13 augusti 2026 (DOI 10.1126/science.ads5962). Preprint: arXiv:2408.15441 (CC BY 4.0)",
      url: "https://doi.org/10.1126/science.ads5962"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 — 9.1 Atomkärnan", href: "katalog.html?id=fy1-9.1" },
        { label: "Fysik nivå 1 — 9.2 Massdefekt och bindningsenergi", href: "katalog.html?id=fy1-9.2" },
        { label: "Simulering — Laddade partiklar i magnetfält", href: "fysik2-laddade-partiklar-app.html" }
      ],
      fragor: [
        "Ingen har sett en gluonknut. Slutsatsen bygger på att de vanliga modellerna inte klarar av att beskriva två mätningar samtidigt. Hur stark är en sådan slutsats jämfört med en direkt observation?",
        "Försöket jämför två atomkärnor som väger lika mycket men har olika många protoner. Varför blir en jämförelse mellan två nästan identiska system ofta säkrare än en enda noggrann mätning?",
        "Bevarandet av baryontalet är ingen lag som någon har härlett, utan ett mönster som alltid har hållit i alla försök. Vad krävs för att fysiker ska våga lita på en sådan regel, och vad skulle få dem att överge den?"
      ]
    },
    body: [
      { type: 'p', html: 'Protonen är det mest uthålliga föremål vi känner till. Försök att fånga en proton i färd med att falla sönder har pågått i decennier utan att någon enda har setts göra det, och gränsen har pressats till att en genomsnittlig proton måste leva längre än 10<sup>34</sup>&nbsp;år. Universum har hittills existerat i knappt 1,4&nbsp;·&nbsp;10<sup>10</sup>&nbsp;år. Protonen är alltså inte bara långlivad, den är i praktiken evig — och det är tur, för allt som finns är byggt av dem.' },
      { type: 'p', html: 'Förklaringen som brukar ges är ett bokföringstal: baryontalet. Men vad i protonen det är som faktiskt <em>bär</em> det talet har ingen kunnat visa. Ett lag inom STAR-samarbetet vid Brookhaven National Laboratory har nu mätt hur baryontalet förflyttar sig när atomkärnor krockar, och svaret pekar bort från kvarkarna.' },

      { type: 'h2', text: 'Ett tal som aldrig får ändras' },
      { type: 'p', html: 'Protoner och neutroner, och deras tyngre släktingar, kallas baryoner. Var och en av dem tilldelas baryontalet $B = 1$, deras antipartiklar $B = -1$, och alla andra partiklar — elektroner, neutriner, fotoner — noll. Regeln är att summan är densamma före och efter varje reaktion som någonsin har observerats.' },
      { type: 'p', html: 'Det är den regeln som låser fast protonen. Den är den lättaste av alla baryoner, så det finns ingenting lättare med $B = 1$ att sönderfalla till. En proton som blev till en positron och en pion skulle bryta mot bokföringen, och därför sker det inte — trots att ingenting annat i fysikens lagar hindrar det, och trots att energiräkningen skulle gå ihop galant.' },
      { type: 'p', html: 'Sedan kvarkmodellen kom på 1960-talet har svaret på var talet sitter varit rakt fram: en baryon består av tre valenskvarkar, och var och en av dem bär $\\dfrac{1}{3}$ av baryontalet. Tre tredjedelar blir en hel. Det står i läroböckerna och det fungerar utmärkt för att räkna ut vilka reaktioner som är tillåtna. Frågan är om det är sant.' },

      { type: 'h2', text: 'Rossi och Veneziano såg en knut' },
      { type: 'p', html: 'Kvarkar sitter ihop genom den starka växelverkan, och kraften mellan dem beter sig inte som gravitation eller elektriska krafter. Den avtar inte med avståndet — den är i stort sett konstant, som om kvarkarna satt fast i varsitt gummiband. Drar man isär dem växer energin i bandet tills det går av, och i brottytan bildas ett nytt kvarkpar. Därför finns aldrig en ensam kvark.' },
      { type: 'p', html: 'I en baryon finns tre sådana band, och de måste mötas någonstans. Rossi och Veneziano påpekade 1977 att mötespunkten är ett eget objekt: en Y-formad knut där tre gluonsträngar går ihop. Den kallas baryonknut, på engelska <em>baryon junction</em>. År 1996 tog Dmitri Kharzeev — i dag verksam vid Stony Brook University och Brookhaven — steget att föreslå att det är knuten, inte kvarkarna, som bär baryontalet. Uppsatsens titel var en fråga: kan gluoner spåra baryontalet?' },
      { type: 'p', html: 'Skillnaden är inte akademisk, för de två kandidaterna beter sig helt olika i en krock. Valenskvarkarna bär huvuddelen av rörelsemängden och plöjer i stort sett rakt fram genom kollisionen. Knuten är en gluonstruktur som bär nästan ingen rörelsemängd alls och som därför är lätt att stoppa. Om det är knuten som bär baryontalet ska talet alltså kunna bromsas in och lämnas kvar mitt i kollisionszonen — långt ifrån de framrusande kvarkarna.' },

      { type: 'h2', text: 'Två kärnor som väger lika men laddar olika' },
      { type: 'p', html: 'Problemet är att mäta baryontal och elektrisk laddning var för sig. I vanlig materia följs de åt: protonen bär både en positiv laddning och ett baryontal. STAR-laget löste det med ett trick som acceleratorn redan hade data för — krockar mellan så kallade isobarer.' },
      { type: 'p', html: 'Rutenium-96 och zirkonium-96 innehåller lika många kärnpartiklar, 96 stycken, men olika många protoner: 44 respektive 40. Två system som väger lika mycket och innehåller lika många baryoner, men skiljer sig med fyra enheter i laddning. Kör man dem i samma accelerator med samma detektor och samma inställningar tar det mesta som kan gå fel ut sig självt i jämförelsen.' },
      { type: 'p', html: 'Sedan räknades vad som blev kvar mitt emellan strålarna: hur mycket baryontal ($B$) som stannat där, dividerat med skillnaden i elektrisk laddning ($\\Delta Q$) mellan de två systemen. Om kvarkarna bär baryontalet ska de två storheterna transporteras lika villigt, och kvoten hamna på 1. Mätningen gav 1,84&nbsp;±&nbsp;0,02 (statistiskt) ±&nbsp;0,09 (systematiskt) ±&nbsp;0,16 (från sönderfall av andra partiklar). Simuleringsprogram som bygger på valenskvarkar landar ännu lägre, mellan 0,5 och 0,7.' },
      { type: 'p', html: 'Baryontalet flyttade sig alltså in mot mitten nästan dubbelt så lätt som laddningen. Något annat än kvarkarna hade tagit det dit.' },

      { type: 'image', src: 'nyheter/bilder/2026-08-17-gluonknuten-i-protonen-2.jpg', alt: 'Detektorbild av en frontalkrock mellan två guldkärnor: tusentals färgade spår strålar ut från en punkt i mitten och bildar ett tätt blågrönt solfjädermönster inom detektorns tolvkantiga ram.', caption: 'En av de första fullenergikrockarna mellan guldkärnor i STAR-detektorn. Varje spår är en partikel som bildats i kollisionen; det är i det här myllret baryontalet ska bokföras.', credit: 'Bild: Brookhaven National Laboratory / STAR (CC BY 2.0), beskuren' },

      { type: 'h2', text: 'Fotonen som slog mot guld' },
      { type: 'p', html: 'En enda mätning räcker inte, så laget gjorde ett andra försök av ett helt annat slag. När två guldkärnor passerar tätt förbi varandra utan att träffa kan det elektriska fältet kring den ena skicka i väg en foton som slår in i den andra. Det blir en mycket renare kollision: ljus mot kärna, vid en rörelseenergi som i medeltal motsvarar omkring 9&nbsp;GeV i mötet mellan fotonen och en enskild kärnpartikel.' },
      { type: 'p', html: 'Här mättes i stället hur överskottet av protoner fördelar sig i längdled, alltså hur långt bort från strålriktningen baryontalet hamnar. Fördelningen avtar ungefär som en avtagande exponentialfunktion, och brantheten sammanfattas i ett tal, $\\alpha_B$. Modeller som lägger baryontalet hos valenskvarkarna förutsäger en brantare kurva än den som uppmättes. Knutbilden förutsäger i stället ett värde mellan 0,42 och 1. Mätningen gav $\\alpha_B = 1{,}04 \\pm 0{,}22$.' },
      { type: 'p', html: 'I vanliga krockar mellan guldkärnor, och i krockar mellan enskilda protoner, ligger samma tal kring 0,64&nbsp;±&nbsp;0,05 respektive 0,65&nbsp;±&nbsp;0,08 — också de inom knutbildens intervall. Två olika sorters försök, i två olika delar av apparaten, drar alltså åt samma håll.' },

      { type: 'h2', text: 'Vad som egentligen är visat' },
      { type: 'p', html: 'Det är värt att vara noggrann med vad slutsatsen består av. Ingen har sett en gluonknut. Det som har hänt är att två oberoende mätningar tillsammans inte går att beskriva med modeller där baryontalet sitter i valenskvarkarna, medan bilden med en knut klarar båda. Artikeln i <em>Science</em>, publicerad 13 augusti och undertecknad av över fyrahundra forskare, formulerar det försiktigt: resultaten talar <em>emot</em> valenskvarkbilden.' },
      { type: 'quote', html: 'Våra resultat stöder starkt tanken att baryontalet hellre bärs och transporteras av gluoner — partiklarna som håller ihop kvarkarna — när de är arrangerade i just den här konfigurationen.', cite: 'Zhangbu Xu, Kent State University och Brookhaven National Laboratory' },
      { type: 'p', html: 'Om det håller är det en omskrivning av en av de mest grundläggande bilderna i fysiken: protonen som tre kvarkar med varsin tredjedel av identiteten. I stället skulle identiteten sitta i själva sammanhållningen — i kraftfältet mellan kvarkarna snarare än i kvarkarna.' },
      { type: 'p', html: 'Det finns en större fråga i bakgrunden. Universum innehåller materia men nästan ingen antimateria, och för att den obalansen ska ha kunnat uppstå måste baryontalet ha ändrats någon gång i det tidiga universum. Att veta vad som bär talet är ett rimligt första steg mot att förstå hur det kan ha brutits.' },
      { type: 'p', html: 'Svaret får dröja. RHIC sköt sina sista strålar den 6&nbsp;februari 2026, efter ett kvarts sekel, och anläggningen byggs nu om till en ny maskin — Electron-Ion Collider — där elektroner ska skickas mot atomkärnor för att kartlägga just gluonerna. De första försöken väntas i början av 2030-talet. Frågan om knuten finns är då trettio år gammal, och den datan är redan insamlad.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Kvarkarnas egen massa svarar för omkring en procent av protonens massa. Resten är energin i gluonfältet som håller ihop dem — i praktiken väger du mest bindningsenergi.',
        'Baryontalets bevarande är ingen härledd lag. Det är ett mönster som aldrig har brutits i något försök, och som därför har fått status av regel. Flera teorier bortom standardmodellen förutsäger att det ändå bryts, ytterst sällan.',
        'En enda kvark går inte att plocka ut. Drar man i den växer energin i kraftfältet tills det räcker till ett nytt kvarkpar, och man står med två partiklar i stället för en lös kvark.',
        'Artikeln har fler än 400 författare. Det är normalt inom experimentell partikelfysik: hela samarbetet står som författare, i bokstavsordning, oavsett vem som gjorde vad.'
      ] }
    ]
  },
  {
    id: "2026-08-16-protonaccelerator-i-ornen",
    date: "2026-08-16",
    title: "Något i stjärnbilden Örnen slungar i väg protoner hundra gånger hårdare än LHC — nu vet fysikerna att det verkligen är protoner",
    deck: "Vintergatan har ett fåtal naturliga acceleratorer som driver upp partiklar till en biljard elektronvolt. Problemet har varit att gammastrålningen de sänder ut ser likadan ut oavsett om det är protoner eller elektroner som accelereras. Ett japanskt lag har nu jämfört femton års gammadata med en kartläggning av gasmolnen i samma riktning — och mönstren följs åt.",
    category: "Astropartikelfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-16-protonaccelerator-i-ornen.jpg",
    imageAlt: "Hela himlen i gammastrålning, avbildad som en blå oval med ett lysande gulrött band tvärs över mitten: Vintergatans skiva. Enskilda ljuspunkter är starka gammakällor.",
    imageCredit: "Bild: NASA:s Scientific Visualization Studio / NASA, DOE och Fermi LAT-samarbetet (public domain)",
    tags: ["astrofysik", "astropartikelfysik", "kosmisk strålning", "gammastrålning", "partikelaccelerator", "elektronvolt", "supernova", "vintergatan", "fysik 2"],
    sources: [
      { name: "Hiroshima University — A source of extremely high-energy particles in the Milky Way identified", url: "https://www.hiroshima-u.ac.jp/en/news/98115" },
      { name: "Phys.org — A source of extremely high-energy particles in the Milky Way identified", url: "https://phys.org/news/2026-07-source-extremely-high-energy-particles.html" },
      { name: "ScienceDaily — referat av samma studie", url: "https://www.sciencedaily.com/releases/2026/07/260731034150.htm" },
      { name: "The Astrophysical Journal — originalartikeln", url: "https://doi.org/10.3847/1538-4357/ae680d" }
    ],
    research: {
      citation: "T. Mizuno, H. Sano, T. Murase, T. Oka, H. Suzuki, N. Nakahara, ”Hadronic Scenario for Galactic PeVatron LHAASO J1912+1014u Supported by Fermi-LAT γ-Ray Data and FUGIN CO Data”, The Astrophysical Journal 1006:77, publicerad 16 juli 2026 (DOI 10.3847/1538-4357/ae680d). Preprint: arXiv:2605.02208 (CC BY 4.0)",
      url: "https://doi.org/10.3847/1538-4357/ae680d"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 — 3.4 Laddade partiklar i magnetfält", href: "katalog.html?id=fy2-3.4" },
        { label: "Fysik nivå 1 — 9.1 Atomkärnan (elektronvolt som energienhet)", href: "katalog.html?id=fy1-9.1" },
        { label: "Simulering — Laddade partiklar i magnetfält", href: "fysik2-laddade-partiklar-app.html" }
      ],
      fragor: [
        "Ingen har fångat en enda partikel från den här källan. Ändå påstår forskarna att det är protoner och inte elektroner som accelereras. Vad är det egentligen som utgör beviset, och hur starkt är det?",
        "Att INTE hitta något — röntgenstrålningen som lyste med sin frånvaro — vägde tungt i slutsatsen. Hur kan en utebliven mätning bära lika mycket information som en mätning som ger utslag?",
        "Laget kunde inte peka ut vilket objekt som är acceleratorn, bara att den finns. Är en upptäckt fullständig då, eller är den halv?"
      ]
    },
    body: [
      { type: 'p', html: 'Varje sekund passerar laddade partiklar från rymden genom din kropp. De flesta är protoner, de har färdats i tusentals år genom Vintergatan, och de kallas kosmisk strålning. De allra energirikaste av dem bär omkring en biljard elektronvolt — 10<sup>15</sup>&nbsp;eV, eller en peta-elektronvolt, PeV. Det är ungefär hundrafemtio gånger mer än vad protonerna i LHC vid CERN har när de skickas runt i acceleratorringen.' },
      { type: 'p', html: 'Frågan som har hängt i luften i decennier är enkel att ställa och svår att besvara: <em>var</em> i vår galax får partiklarna den energin? Objekt som klarar av det kallas PeVatroner, och de är sällsynta. Nu har ett lag lett från Hiroshima University pekat ut en av dem — och, viktigare, visat vilken sorts partikel den accelererar.' },

      { type: 'h2', text: 'Ett knä i spektrumet' },
      { type: 'p', html: 'Räknar man kosmiska partiklar och sorterar dem efter energi får man en kurva som faller stadigt — tills den nära 10<sup>15</sup>&nbsp;eV plötsligt viker av brantare. Böjen kallas knäet, och den brukar tolkas som att galaxens egna acceleratorer tar slut där: kraftigare partiklar än så antas komma utifrån. PeV är alltså inte ett godtyckligt tal utan Vintergatans egen övre gräns.' },
      { type: 'p', html: 'Den kinesiska anläggningen LHAASO, ett detektorfält som täcker en kvadratkilometer på 4&nbsp;400&nbsp;meters höjd i Sichuan, har rapporterat 43 källor som sänder ut gammastrålning i det så kallade sub-PeV-området. Var och en av dem är en kandidat till att vara en PeVatron. En av dem heter LHAASO J1912+1014u och ligger i stjärnbilden Örnen, inte långt från Altair. Den är utsträckt: mer än en grad tvärs över, alltså dubbelt så bred som fullmånen på himlen.' },

      { type: 'h2', text: 'Två misstänkta som lämnar samma spår' },
      { type: 'p', html: 'Här börjar svårigheten. Gammastrålning är inte laddad, så den går rakt fram och pekar tillbaka mot sin källa — till skillnad från de kosmiska partiklarna själva, som magnetfälten i galaxen böjer av så grundligt att all riktningsinformation är borta när de når oss. Gammastrålningen är därför enda sättet att se var acceleratorn ligger. Men den avslöjar inte utan vidare <em>vad</em> som accelereras.' },
      { type: 'p', html: 'Två helt olika processer ger nämligen samma sorts ljus. I det ena fallet krockar snabba protoner med atomkärnor i interstellär gas. Ur krocken kommer neutrala pioner, kortlivade partiklar som nästan omedelbart faller sönder till två gammafotoner. Det kallas det hadroniska scenariot. I det andra fallet accelereras i stället elektroner, som sparkar upp energin hos vanliga ljuspartiklar de råkar träffa — invers Comptonspridning, det leptoniska scenariot. Utifrån räknar man inte partiklar. Man ser bara gammastrålning.' },

      { type: 'h2', text: 'Gasen pekade ut protonerna' },
      { type: 'p', html: 'Lagets grepp var att skaffa fram fler sorters data om samma fläck på himlen. Femton års mätningar från NASA:s rymdteleskop Fermi och dess huvudinstrument LAT plockades fram, i energiområdet 0,4–409,6&nbsp;GeV — alltså långt under det LHAASO ser, och i en del av spektrumet där bakgrunden från Vintergatans diffusa strålning är besvärlig. Genom att förbättra modellen för den bakgrunden kunde forskarna få fram ett tydligt överskott av gammastrålning i just den riktningen.' },
      { type: 'p', html: 'Sedan lades överskottet bredvid en helt annan karta: FUGIN, en genomsökning av Vintergatans plan efter kolmonoxid, gjord med det 45&nbsp;meter breda radioteleskopet i Nobeyama i Japan. Kolmonoxid är en spårgas — den lyser där det finns täta molekylmoln, och visar alltså var gasen är som tjockast.' },
      { type: 'p', html: 'De två kartorna följdes åt. Där gasen var tät lyste gammastrålningen starkt, och där gasen tunnades ut avtog den. Det är precis vad man väntar sig om strålningen uppstår när protoner krockar med gas: ju mer gas, desto fler krockar. En elektronbaserad källa har ingen anledning att bry sig om var gasmolnen råkar ligga.' },

      { type: 'image', src: 'nyheter/bilder/2026-08-16-protonaccelerator-i-ornen-2.jpg', alt: 'Ett stort vitt parabolformat radioteleskop lutat mot en blå himmel, omgivet av barrskog och låga observatoriebyggnader.', caption: 'Radioteleskopet i Nobeyama i Japan, 45 meter i diameter. Dess kartläggning av kolmonoxid i Vintergatans plan visade var gasmolnen ligger — kartan som avgjorde tolkningen.', credit: 'Foto: Lapinov / Wikimedia Commons (CC BY 4.0)' },

      { type: 'h2', text: 'Elektronerna orkar inte hela vägen' },
      { type: 'p', html: 'Två andra iakttagelser pekade åt samma håll. Den ena är att gammastrålningen sträcker sig obruten över ett enormt energiområde: från drygt hundra biljoner elektronvolt (10<sup>14</sup>&nbsp;eV) ner till 400&nbsp;miljoner elektronvolt. Elektroner har svårt att hålla igång ett så brett och så platt spektrum, eftersom de förlorar energi snabbt — de kyls, som fysikerna säger. Överskottet i GeV-området har ett hårt spektrum med fotonindex omkring 2,1, och det passar dåligt med elektroner som hunnit tappa fart.' },
      { type: 'p', html: 'Den andra iakttagelsen är en icke-observation. Snabba elektroner i ett magnetfält lyser oundvikligen i röntgen. Mätningar med rymdteleskopet Chandra sätter en sträng övre gräns för hur mycket diffus röntgenstrålning som får finnas i området — och den gränsen är låg. Elektronerna som skulle behövas finns helt enkelt inte där. Kvar står protonerna.' },

      { type: 'h2', text: 'Så mycket energi krävs det' },
      { type: 'p', html: 'Ur mätningarna kunde laget räkna baklänges till hur mycket rörelseenergi som måste sitta i protonerna: mellan 10<sup>49</sup> och 5&nbsp;·&nbsp;10<sup>49</sup>&nbsp;erg, alltså ungefär 10<sup>42</sup>–5&nbsp;·&nbsp;10<sup>42</sup>&nbsp;joule, beroende på vilket avstånd man antar. Det låter ofattbart, men i sammanhanget är det blygsamt: en supernovaexplosion frigör i storleksordningen 10<sup>44</sup>&nbsp;joule. Ett par procent av en enda stjärnexplosion räcker alltså.' },
      { type: 'p', html: 'Vilket objekt som gör jobbet är fortfarande inte klarlagt. Källan har tidigare föreslagits vara en supernovarest eller en pulsarvindnebulosa, och i närheten ligger pulsaren PSR&nbsp;J1913+1011. Avståndet är osäkert på ett sätt som är typiskt för den här sortens arbete: gasen i riktningen rör sig med två olika hastigheter, och beroende på vilken av dem som hör ihop med källan hamnar den antingen omkring 5&nbsp;500 ljusår bort eller flera gånger längre.' },
      { type: 'p', html: 'Att det är protoner som slungas i väg därifrån är däremot svårt att komma undan — och det gör LHAASO J1912+1014u till en av de få platser i Vintergatan där vi vet att naturen driver en partikelaccelerator som får mänsklighetens största maskin att framstå som ett övningsexemplar.' },
      { type: 'quote', html: 'Det här resultatet är en laginsats. Det finns ett gammalt japanskt ordspråk: en pil är lätt att bryta, men tre pilar i knippe är det inte.', cite: 'Tsunefumi Mizuno, Hiroshima University' },

      { type: 'fact', title: 'Visste du?', items: [
        'En enda kosmisk proton på 1&nbsp;PeV bär omkring 1,6&nbsp;·&nbsp;10<sup>−4</sup>&nbsp;J — ungefär lika mycket rörelseenergi som ett riskorn som ramlar ner från en bordskant. Skillnaden är att riskornet väger tiotusen miljarder miljarder gånger mer.',
        'Kosmisk strålning kommer inte i raka linjer. Galaxens magnetfält böjer av de laddade partiklarna så mycket att de kan irra omkring i miljontals år innan de når oss, och all information om varifrån de kom är då borta.',
        'Gasen kring källan är ändå extremt tunn: omkring 10 protoner per kubikcentimeter. Ett lika bra vakuum går inte att åstadkomma i ett jordiskt laboratorium — men på flera hundra ljusårs sträcka blir det ändå tillräckligt mycket materia att krocka med.',
        'Enheten erg som används i astrofysiken är ingen SI-enhet: 1&nbsp;erg = 10<sup>−7</sup>&nbsp;J. Den lever kvar av tradition, ungefär som sjömil till sjöss.'
      ] }
    ]
  },
  {
    id: "2026-08-15-spokglod-fran-avstallt-karnkraftverk",
    date: "2026-08-15",
    title: "Reaktorerna stod stilla — ändå räknade detektorn hundra neutriner ur bränslet",
    deck: "När ett kärnkraftverk stängs av dör kedjereaktionen på några sekunder. Men klyvningsresterna i bränslet fortsätter sönderfalla i åratal och sänder ut en svag ström av antineutriner. Nu har den efterglöden mätts för första gången — från en detektor 400 meter från två stillastående franska reaktorer.",
    category: "Partikelfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-15-spokglod-fran-avstallt-karnkraftverk.jpg",
    imageAlt: "Kärnkraftverket Chooz sett från en skogsklädd höjd: två breda kyltorn med vita ångplymer och två kupolformade reaktorbyggnader i en grön floddal.",
    imageCredit: "Foto: Raimond Spekking / Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["partikelfysik", "kärnfysik", "neutrino", "antineutrino", "radioaktivt sönderfall", "betasönderfall", "halveringstid", "kärnkraft", "detektor", "fysik 1"],
    sources: [
      { name: "Max-Planck-Institut für Kernphysik — First measurement of antineutrinos from spent nuclear fuel", url: "https://www.mpi-hd.mpg.de/mpi/en/public-relations/news/news-item/first-measurement-of-antineutrinos-from-spent-nuclear-fuel" },
      { name: "Phys.org — First measurement of antineutrinos from spent nuclear fuel confirms emissions persist after reactor shutdown", url: "https://phys.org/news/2026-08-antineutrinos-spent-nuclear-fuel-emissions.html" },
      { name: "Physical Review Letters — originalartikeln", url: "https://doi.org/10.1103/dr26-j19g" }
    ],
    research: {
      citation: "Double Chooz-samarbetet, ”First measurement of neutrino emissions from spent nuclear fuel by the Double Chooz experiment”, Physical Review Letters 137, 061803, publicerad 4 augusti 2026 (DOI 10.1103/dr26-j19g). Preprint: arXiv:2510.04869",
      url: "https://doi.org/10.1103/dr26-j19g"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 — 9.1 Atomkärnan", href: "katalog.html?id=fy1-9.1" },
        { label: "Fysik nivå 1 — 9.3 Radioaktivt sönderfall", href: "katalog.html?id=fy1-9.3" },
        { label: "Fysik nivå 1 — 9.4 Aktivitet och halveringstid", href: "katalog.html?id=fy1-9.4" },
        { label: "Simulering — Aktivitet och halveringstid", href: "fysik1-halveringstid.html" }
      ],
      fragor: [
        "Laget räknade 106 händelser där beräkningen sa 88, och kallar det ett utmärkt resultat. Vad är det som avgör om en skillnad mellan mätning och förutsägelse är ett brus eller en upptäckt?",
        "De kortlivade kärnorna som sänder ut den mätbara strålningen har halveringstider på sekunder och minuter, ändå finns de kvar i bränsle som legat i tio år. Hur går det ihop?",
        "Signalen är mindre än en procent av vad reaktorn ger i drift, och detektorn ligger bara 115 meter vattenekvivalenter under marken. Vilka krav ställer det på hur man skiljer en verklig händelse från en falsk?"
      ]
    },
    body: [
      { type: 'p', html: 'Ett kärnkraftverk som stängs av blir aldrig riktigt tyst. Kedjereaktionen upphör inom sekunder när styrstavarna åker in, men bränslet är då fullt av klyvningsrester — atomkärnor som blev över när uran och plutonium sprack, och som är instabila. De fortsätter sönderfalla i månader, år och årtionden. Varje sådant betasönderfall skickar i väg en antineutrino.' },
      { type: 'p', html: 'Att den efterglöden finns har fysiker vetat i decennier. Ingen hade mätt den. Nu har Double Chooz-experimentet vid kärnkraftverket Chooz B i franska Ardennerna gjort det, och resultatet publicerades i <em>Physical Review Letters</em> den 4 augusti.' },

      { type: 'h2', text: 'Mindre än en procent av signalen' },
      { type: 'p', html: 'Detektorn byggdes för något helt annat. Double Chooz var ett oscillationsexperiment: två i det närmaste identiska detektorer, en 400&nbsp;meter och en 1,05&nbsp;km från reaktorhärdarna, som mellan 2011 och 2017 jämförde antineutrinoflödet på de två avstånden för att mäta hur neutriner byter skepnad på vägen.' },
      { type: 'p', html: 'Det gav en sidoeffekt. Vid sällsynta tillfällen stod båda reaktorerna stilla samtidigt för bränslebyte eller underhåll — ovanligt, eftersom de två härdarna normalt byter bränsle omlott — och då stod en färdig, välkalibrerad neutrinodetektor och tittade rakt på ett avstängt kraftverk. Under 2017 inträffade fyra sådana perioder på sammanlagt 24,4&nbsp;dygn. Efter avdrag för den tid då detektorn var blockerad av kosmiska myoner återstod 17,2&nbsp;dygns mättid för den närmaste detektorn.' },
      { type: 'p', html: 'Hur svag signalen är framgår av jämförelsen: vid full effekt registrerade samma detektor omkring 900&nbsp;neutrinohändelser per dygn. Efterglöden efter avstängning motsvarar mindre än en procent av det.' },
      { type: 'p', html: 'Detektorns hjärta var 10,3&nbsp;m³ vätskescintillator med 1&nbsp;gram gadolinium per liter, omgivet av ytterligare 22,6&nbsp;m³ oblandad scintillatorvätska och en tank med mineralolja, allt betraktat av 390 ljuskänsliga rör.' },

      { type: 'h2', text: 'Två blixtar med mikrosekunder emellan' },
      { type: 'p', html: 'En antineutrino känner varken av elektriska krafter eller den starka kärnkraften. Den kan passera genom hela jordklotet utan att märka det, och den enda anledningen till att man alls kan fånga någon är att det passerar ofantligt många. Fångstmetoden heter invers betasönderfall: antineutrinon träffar en proton i vätskan och omvandlar den till en neutron, samtidigt som en positron flyger i väg, $\\bar{\\nu}_e + p \\rightarrow e^+ + n$.' },
      { type: 'quote', html: 'Antineutriner växelverkar bara ytterst sällan med materia. Men när en av dem växelverkar inne i Double Chooz-detektorn uppstår en karakteristisk dubbel ljussignal som går att skilja från bakgrundshändelser.', cite: 'Thierry Lasserre, Max-Planck-Institut für Kernphysik' },
      { type: 'p', html: 'Positronen möter nästan omedelbart en elektron och de förintar varandra — det ger den första ljusblixten. Neutronen studsar omkring i vätskan i några mikrosekunder tills en gadoliniumkärna fångar in den och sänder ut gammastrålning — den andra blixten. Det är just tidsavståndet mellan de två blixtarna, tillsammans med hur nära varandra de sker, som skiljer en äkta antineutrino från slumpmässigt brus.' },
      { type: 'p', html: 'Metoden har ett pris. Reaktionen kräver en antineutrinoenergi på minst $1{,}8\\ \\mathrm{MeV}$, så merparten av alla antineutriner som lämnar bränslet är osynliga för detektorn. Bara de allra energirikaste sönderfallen syns.' },

      { type: 'h2', text: 'Moderkärnan håller takten' },
      { type: 'p', html: 'Vilka kärnor är det då som lyser? Direkt efter avstängningen bidrar hundratals olika klyvningsprodukter, men efter några timmar tar ett fåtal över. Efter några månader står tre kortlivade kärnor för nästan alltihop ovanför detektorns tröskel: yttrium-90 ($2{,}28\\ \\mathrm{MeV}$), rodium-106 (halveringstid 30,1&nbsp;s, $3{,}54\\ \\mathrm{MeV}$) och praseodym-144 (17,3&nbsp;min, $3{,}00\\ \\mathrm{MeV}$).' },
      { type: 'p', html: 'Där uppstår en skenbar motsägelse. Kärnor med halveringstider på sekunder och minuter borde vara borta för länge sedan i bränsle som legat i åratal. Förklaringen är att de fylls på hela tiden. Var och en av dem har en långlivad moderkärna som sakta sönderfaller till den: cerium-144 med 285&nbsp;dygns halveringstid, rutenium-106 med 372&nbsp;dygn och strontium-90 med 28,9&nbsp;år. Det är moderkärnan som bestämmer takten — dotterkärnan sönderfaller i praktiken i samma stund den bildas. Efter tio år svarar yttrium-90 ensam för mer än 90&nbsp;% av flödet.' },

      { type: 'image', src: 'nyheter/bilder/2026-08-15-spokglod-fran-avstallt-karnkraftverk-2.jpg', alt: 'Blick ned i en bassäng med använt kärnbränsle i en reaktorhall: bränsleknippen står i ett rutmönster under klart vatten, med en gul travers över och människor i skyddshjälmar i förgrunden.', caption: 'Bassäng för använt kärnbränsle vid kärnkraftverket Brunswick i USA. Enligt beräkningarna kom 44 procent av den förväntade signalen från bassänger som denna, vid sidan av härdarna.', credit: 'Foto: U.S. Nuclear Regulatory Commission (public domain)' },

      { type: 'p', html: 'Signalen kommer nämligen från två håll. Dels från bränsle som fortfarande sitter kvar i härdarna, dels från de knippen som redan plockats ut och står och kyls i vattenbassänger intill. Beräkningarna ger 56 procent från härdarna och 44 procent från bassängerna. Balansen förskjuts med tiden: härdarna dominerar de första dygnen, medan bassängerna — där knippen med vitt skilda kyltider samlas — tar över ju längre stilleståndet varar.' },

      { type: 'h2', text: '106 mot 88' },
      { type: 'p', html: 'I energiintervallet 1–3&nbsp;MeV, där efterglöden förväntas vara som tydligast, räknade den närmaste detektorn 106&nbsp;±&nbsp;18 kandidater. Beräkningen, byggd på simuleringar av vilka klyvningsprodukter som fanns i bränslet och hur de sönderfaller, gav 88&nbsp;±&nbsp;7. Utslaget mot noll motsvarar 5,9 standardavvikelser, och mätningen stämmer med förutsägelsen både i antal och i hur händelserna fördelar sig över energin.' },
      { type: 'p', html: 'Siffran 106 är vad som återstår sedan bakgrunden räknats bort från 244 registrerade händelser. Det är där svårigheten ligger. Detektorn befinner sig relativt grunt — motsvarande 115&nbsp;meter vatten under markytan — så kosmiska myoner slår igenom och skapar snabba neutroner och kortlivade kärnor som härmar signalen nästan perfekt.' },
      { type: 'quote', html: 'Hittills har experiment med reaktorantineutriner främst inriktat sig på reaktorer i drift, där flödet är mycket större. Att upptäcka den lilla kvarvarande signalen efter avstängning krävde exceptionellt låga bakgrunder och noggranna analysmetoder som Double Chooz-samarbetet utvecklat under många år.', cite: 'Anthony Onillon, Max-Planck-Institut für Kernphysik' },
      { type: 'p', html: 'Ett tidigare försök visar hur tunn marginalen är. En analys av 7,5&nbsp;dygns avstängningsdata från 2011 och 2012, med enbart den bortre detektorn, gav ungefär 20 kandidater — för få för att säga något om vare sig antal eller energifördelning.' },

      { type: 'h2', text: 'Att inventera bränsle utan att öppna dörren' },
      { type: 'p', html: 'Bakom det hela ligger en idé som är nästan femtio år gammal. Antineutriner går inte att skärma av, inte att härma och inte att stänga inne: de bär direkt vittnesbörd om vilka kärnreaktioner som pågår, oavsett vad någon påstår i en rapport. Tanken att använda dem för att övervaka reaktorer formulerades av Lev Mikaelyan och Aleksandr Borovoj 1978 och prövades första gången vid kraftverket Rivne 1985.' },
      { type: 'p', html: 'Sedan dess har metoden handlat om reaktorer i drift. Det nya resultatet visar att en detektor kan säga något även när anläggningen står stilla — exempelvis bekräfta hur mycket använt bränsle som faktiskt finns i bassängerna, eller uppskatta den kvarvarande värmeeffekten i en härd efter en olycka. Med 17,2&nbsp;dygns data och hundra händelser är det ännu långt till ett praktiskt verktyg. Men det som tidigare bara var uträknat har nu blivit uppmätt.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Chooz B har två tryckvattenreaktorer på 4,25&nbsp;GW värmeeffekt vardera, med 205 bränsleknippen i varje härd.',
        'Antineutrinon måste ha minst $1{,}8\\ \\mathrm{MeV}$ för att kunna fångas genom invers betasönderfall. Nästan 99&nbsp;% av den mätbara efterglöden ligger under $3\\ \\mathrm{MeV}$.',
        'Neutriner går inte att skärma av. Ett blylager tjockt som ett ljusår skulle stoppa ungefär hälften av dem.',
        'Double Chooz lades ned 2017. Datan från de fyra stilleståndsperioderna det året har alltså legat och väntat på en analys som ingen från början planerat för.'
      ] }
    ]
  },
  {
    id: "2026-08-14-diamant-i-flytande-kol",
    date: "2026-08-14",
    title: "Diamant flyter i sin egen smälta — laserförsök stänger en tjugo år gammal lucka mellan mätning och teori",
    deck: "Ett laserskott förångade ytterlagret på en pytteliten diamant och skickade en tryckvåg rakt genom den: omkring tio miljoner atmosfärer, hetare än solens yta, alltihop på en miljarddels sekund. Först nu stämmer den uppmätta smälttemperaturen med kvantmekanikens beräkningar — och mätningen bekräftar att diamant beter sig som vatten: den fasta formen flyter ovanpå vätskeformen.",
    category: "Materialfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-14-diamant-i-flytande-kol.jpg",
    imageAlt: "Laserhallen vid Omega-anläggningen: långa metallrör i knallblå stativ löper genom en smal hall med orange golv och rack av elektronik längs väggarna.",
    imageCredit: "Foto: Daniel Penfield / Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["materialfysik", "diamant", "kol", "högtryck", "densitet", "fasövergång", "fusion", "laser", "neptunus", "uranus", "fysik 1", "fysik 2"],
    sources: [
      { name: "Lawrence Livermore National Laboratory — Melting diamond could unlock triple fusion gain and the secrets of ice giant planets", url: "https://www.llnl.gov/article/54801/melting-diamond-could-unlock-triple-fusion-gain-secrets-ice-giant-planets" },
      { name: "Phys.org — Melting diamond could unlock triple fusion gain and the secrets of ice giant planets", url: "https://phys.org/news/2026-08-diamond-triple-fusion-gain-secrets.html" },
      { name: "Nature Physics — originalartikeln", url: "https://www.nature.com/articles/s41567-026-03413-1" }
    ],
    research: {
      citation: "Marius Millot, Federica Coppari, Amy Lazicki, Yong-Jae Kim, Otto L. Landen, Vladimir A. Smalyuk, Peter M. Celliers och Jon H. Eggert, ”Diamond melting in shock compression experiments at 1 TPa pressures”, Nature Physics, publicerad 13 augusti 2026 (DOI 10.1038/s41567-026-03413-1)",
      url: "https://doi.org/10.1038/s41567-026-03413-1"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 — 5.1 Densitet", href: "katalog.html?id=fy1-5.1" },
        { label: "Fysik nivå 1 — 5.2 Tryck och tryckkraft", href: "katalog.html?id=fy1-5.2" },
        { label: "Fysik nivå 1 — 6.3 Faser och fasövergångar", href: "katalog.html?id=fy1-6.3" },
        { label: "Simulering — Densitet", href: "fysik1-densitet-app.html" }
      ],
      fragor: [
        "I tjugo år låg mätvärdet och beräkningen omkring 20 % från varandra, och båda lägren stod fast vid sitt. Vad är det som avgör vilken sida som till slut får ge sig — och varför räckte det inte att bara räkna om?",
        "Samma diamant, samma tryck och samma temperatur gav olika resultat beroende på om den träffades av en enda chockvåg eller flera. Vad betyder det för tanken att ett ämnes tillstånd bestäms av tryck och temperatur allena?",
        "Slutsatsen om diamantens smältpunkt vilar på ett svagt röntgenmönster som fanns i ungefär en miljarddels sekund. Vad krävs för att en så kort och svag signal ska duga som bevis?"
      ]
    },
    body: [
      { type: 'p', html: 'Diamant är ett av de hårdaste material vi känner till, och ett av de mest motsträviga. Men allt smälter om man pressar och hettar upp det tillräckligt — även diamant. Frågan är bara vid vilken temperatur, och där har experiment och beräkningar varit oense i tjugo år. Nu har ett forskarlag vid Lawrence Livermore National Laboratory i Kalifornien mätt om saken, med ett resultat som ligger i stort sett ovanpå det datorsimuleringarna hela tiden förutsagt.' },
      { type: 'p', html: 'Frågan är inte akademisk. Diamant är materialet i den lilla kapsel som omsluter bränslet i laserdriven fusionsforskning, och kol antas kristallisera djupt inne i isjättarna Neptunus och Uranus. På båda ställena utsätts ämnet för tryck som saknar all vardaglig motsvarighet.' },

      { type: 'h2', text: 'Tio miljoner atmosfärer på en miljarddels sekund' },
      { type: 'p', html: 'Försöken gjordes vid Omega-anläggningen på Laboratory for Laser Energetics vid University of Rochester. Principen är brutalt enkel: en kraftig laserpuls förångar det yttersta lagret på ett litet diamantprov. Ångan skjuter utåt, och enligt Newtons tredje lag trycks resten av provet lika hårt inåt. Det som far genom diamanten är en chockvåg.' },
      { type: 'p', html: 'Trycket bakom vågen nådde omkring $1\\ \\mathrm{TPa}$, alltså 10<sup>12</sup>&nbsp;Pa — ungefär tio miljoner gånger lufttrycket vid havsytan, grovt räknat tre gånger trycket i jordens innersta kärna och mer än i mittpunkten av Neptunus och Uranus. Temperaturen översteg solytans.' },
      { type: 'quote', html: 'Vi kunde ta pyttesmå diamantprover och chockkomprimera dem till temperaturer hetare än solens yta och tryck högre än i Neptunus och Uranus mittpunkter — och ändå mäta atomstruktur, temperatur, densitet och optisk reflektivitet.', cite: 'Marius Millot, fysiker vid Lawrence Livermore National Laboratory' },
      { type: 'p', html: 'Haken är att tillståndet inte varar. Det hoptryckta provet håller sig i ungefär en miljarddels sekund innan vågen passerat och allt faller isär. Hela mätningen — röntgendiffraktionen som avslöjar hur atomerna sitter, temperaturen, densiteten — måste rymmas i det fönstret.' },

      { type: 'h2', text: 'Isbitens hemlighet, fast med kol' },
      { type: 'p', html: 'Densitet är massa per volym, $\\rho = \\dfrac{m}{V}$. Nästan alla ämnen krymper när de stelnar: den fasta formen blir tätare än vätskan och sjunker i sin egen smälta. Vatten är det berömda undantaget. Is har densiteten 0,92&nbsp;g/cm³ mot vattnets 1,00&nbsp;g/cm³, och därför flyter isbitarna i glaset.' },
      { type: 'p', html: 'För tjugo år sedan visade Jon Eggert och kollegor vid samma laboratorium att kol under extremt tryck gör likadant: diamantens densitet <em>ökar</em> när den smälter. Vätskan är alltså tätare än kristallen.' },
      { type: 'quote', html: 'Flytande vatten är tätare än is, vilket gör att isbitar flyter. Jons upptäckt betyder att diamant skulle flyta i flytande kol vid höga tryck.', cite: 'Marius Millot' },
      { type: 'p', html: 'De nya mätningarna bekräftar den slutsatsen. Vätskan är dessutom metallisk — kolatomerna släpper ifrån sig elektroner som kan röra sig fritt, ungefär som i en metall. Det syns i hur väl provet speglar ljus, och just den optiska reflektiviteten var en av storheterna laget mätte under den korta stunden.' },

      { type: 'image', src: 'nyheter/bilder/2026-08-14-diamant-i-flytande-kol-2.jpg', alt: 'Neptunus som en jämnt blå glob mot svart bakgrund, med ljusa slöjformade moln och en mörk oval storm strax söder om ekvatorn.', caption: 'Neptunus fotograferad av rymdsonden Voyager 2 år 1989. Djupt inne i isjättar som denna tros kol kristallisera till diamant och sjunka mot centrum.', credit: 'Foto: NASA/JPL (public domain)' },

      { type: 'p', html: 'Just isjättarna är ett av skälen till att någon över huvud taget bryr sig om kolets smältkurva. I Neptunus och Uranus inre bryts metan sönder av trycket, och kolet antas klumpa ihop sig till kristaller som faller inåt — ett ”diamantregn”. Att kristallerna sjunker där men flyter på rent flytande kol är ingen motsägelse: inne i planeten faller de genom en mycket lättare blandning av väte, metan och het ”is”, inte genom smält kol.' },
      { type: 'p', html: 'Eftersom försöken nådde förbi trycket i isjättarnas mittpunkter finns det nu ett mätunderlag som modellerna av planeternas inre kan vila på i stället för ren extrapolation.' },

      { type: 'h2', text: 'Tusen grader fel' },
      { type: 'p', html: 'De gamla mätningarna var ett landmärke i sitt fält, men de lämnade efter sig ett problem som inte gick att vifta bort: uppmätt och beräknad smälttemperatur skilde sig åt med omkring 20 %.' },
      { type: 'quote', html: 'Oavsett vad teoretikerna gjorde — även med de mest avancerade simuleringsteknikerna — kunde de inte återskapa experimenten.', cite: 'Marius Millot' },
      { type: 'p', html: 'Med kraftigt förbättrade mätinstrument vid Rochester föll gåtan. Den nya smälttemperaturen stämmer nästan perfekt med simuleringarna, och det var alltså mätningen som legat fel hela tiden — med mer än tusen grader.' },
      { type: 'p', html: 'Avgörande var att laget för första gången kunde följa en chockkomprimerad diamant med röntgendiffraktion ända fram till smältningen. Det är svårare än det låter. Kol är en liten och lätt atom som sprider få röntgenfotoner, så signalen man ska fånga under sin miljarddels sekund är svag.' },
      { type: 'quote', html: 'Det var frustrerande att upptäcka att våra ursprungliga temperaturmätningar låg mer än tusen grader fel, men det är spännande att se en så dramatisk förbättring av datakvaliteten med våra nya instrument. Ännu bättre: vår ursprungliga slutsats om smältningen har nu bekräftats direkt med röntgendiffraktion.', cite: 'Jon Eggert, fysiker vid Lawrence Livermore National Laboratory' },

      { type: 'h2', text: 'Ingen mellanstation på vägen' },
      { type: 'p', html: 'Den andra oenigheten gällde vägen till vätskan. Vid Sandia National Laboratories har man pressat ihop diamant med hjälp av extremt starka magnetfält, och de försöken lämnade spår som antydde att kolet tar ett mellansteg: från diamantstruktur till en annan kristallstruktur, och först därefter till vätska. Simuleringar gav samma bild, men ingen hade kunnat mäta atomernas placering direkt och avgöra saken.' },
      { type: 'p', html: 'De nya röntgenmätningarna visar inget sådant mellansteg. Kolet behåller sin diamantstruktur ända fram till smältningen.' },
      { type: 'quote', html: 'Vi tror att det beror på att provet inte hinner ändra sig när det bara utsätts för en enda chockvåg. Det förblir fångat i diamantstrukturen.', cite: 'Marius Millot' },
      { type: 'p', html: 'Det är i sig ett resultat värt att stanna vid. Materialets svar beror inte bara på hur högt trycket och temperaturen är, utan på <em>hur</em> det pressats dit — på vägen genom fasdiagrammet, inte bara på slutpunkten.' },

      { type: 'h2', text: 'Därför bryr sig fusionsforskarna' },
      { type: 'p', html: 'I laserdriven fusion driver kraftiga laserpulser chockvågor inåt genom en liten diamantkapsel. Kapseln imploderar och pressar ihop bränslet inuti till de tryck och temperaturer som krävs för att atomkärnor ska smälta samman.' },
      { type: 'p', html: 'För att implosionen ska bli jämn måste den första chockvågen smälta diamanten till en slät, likformig vätska. Blir smältningen ofullständig växer ojämnheterna under implosionen och reaktionen tynar bort. Därför har man tagit det säkra före det osäkra och använt en förhållandevis kraftig första chock.' },
      { type: 'quote', html: 'Vårt arbete visar att vi skulle kunna använda något långsammare inledande chockvågor och ändå få diamanten att smälta helt i våra implosioner. Det är spännande, eftersom en långsammare chock skulle göra fusionsbränslet mer hoptryckbart. Det ökar i sin tur den största energiutvinning vi kan få ut med samma laserenergi.', cite: 'Marius Millot' },
      { type: 'p', html: 'Hur mycket? Beräkningarna pekar på en tredubbling av energiutbytet — förutsatt att övriga felkällor går att hålla i schack. Det är alltså en förutsägelse, inte ett uppmätt resultat, och nästa steg blir att pröva den.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Trycket i försöken, omkring 10<sup>12</sup>&nbsp;Pa, motsvarar ungefär tio miljoner gånger lufttrycket vid havsytan.',
        'Det hoptryckta tillståndet varade omkring en miljarddels sekund. På den tiden hinner ljuset bara 30&nbsp;cm.',
        'Diamant och grafit består av exakt samma sorts atomer. Hela skillnaden — hårdast respektive så mjukt att det lossnar mot papper — sitter i hur kolatomerna är staplade.',
        'Härnäst vill laget pressa diamant vid National Ignition Facility för att se var gränsen går när provet träffas av flera chockvågor i följd.'
      ] }
    ]
  },
  {
    id: "2026-08-13-rugbybollen-i-atomkarnan",
    date: "2026-08-13",
    title: "Ingen har sett in i en atomkärna — ändå vet fysiker nu att kärnan i grundämne 100 är formad som en rugbyboll",
    deck: "Provet vägde mindre än en biljondels gram och halverades var tjugonde timme. Ändå har ett forskarlag med förstaförfattare i Göteborg lyckats läsa av formen på fermiumkärnan — inte genom att titta på den, utan på ljuset från elektronerna runt omkring. På köpet föll ett mätvärde från 2005 som egentligen var fysikaliskt omöjligt.",
    category: "Kärnfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-13-rugbybollen-i-atomkarnan.jpg",
    imageAlt: "Bränsleelement i djupt vatten, sedda snett uppifrån. Vattnet lyser i intensivt blått av Tjerenkovstrålning, och ett av elementen glöder betydligt starkare än de övriga.",
    imageCredit: "Foto: Oak Ridge National Laboratory (CC BY 2.0)",
    tags: ["kärnfysik", "atomkärna", "fermium", "isotoper", "spektroskopi", "laser", "hyperfinstruktur", "periodiska systemet", "fysik 1", "fysik 2"],
    sources: [
      { name: "Johannes Gutenberg-universitetet Mainz — Laser spectroscopy helps reveal hidden nuclei properties in fermium", url: "https://press.uni-mainz.de/laser-spectroscopy-helps-reveal-hidden-nuclei-properties-in-fermium/" },
      { name: "Phys.org — Laser spectroscopy helps reveal hidden nuclear properties in fermium", url: "https://phys.org/news/2026-08-laser-spectroscopy-reveal-hidden-nuclear.html" },
      { name: "EurekAlert! — pressmeddelandet i original", url: "https://www.eurekalert.org/news-releases/1139277" },
      { name: "Physical Review Letters — originalartikeln", url: "https://journals.aps.org/prl/abstract/10.1103/2813-b49x" },
      { name: "arXiv:2511.20921 — fritt tillgänglig förhandsversion med hela metoddelen", url: "https://arxiv.org/abs/2511.20921" }
    ],
    research: {
      citation: "M. Urquiza-González, M. Stemmler, T. E. Albrecht, B. Bally och M. Bender m.fl. (39 författare), ”High-Resolution Laser Spectroscopy on the Hyperfine Structure of 255Fm (Z = 100)”, Physical Review Letters 136, 192501, 15 maj 2026 (DOI 10.1103/2813-b49x)",
      url: "https://doi.org/10.1103/2813-b49x"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 — 9.1 Atomkärnan", href: "katalog.html?id=fy1-9.1" },
        { label: "Fysik nivå 1 — 9.4 Aktivitet och halveringstid", href: "katalog.html?id=fy1-9.4" },
        { label: "Fysik nivå 2 — 4.7 Spektrallinjer", href: "katalog.html?id=fy2-4.7" },
        { label: "Simulering — Spektrallinjer", href: "fysik2-spektrallinjer.html" }
      ],
      fragor: [
        "Ingen har sett fermiumkärnan. Slutsatsen om dess form vilar på ett mönster av spektrallinjer plus kvantmekaniska beräkningar av elektronmolnet. Vad krävs för att en sådan indirekt kedja ska räknas som en mätning — och vad skulle behöva vara fel för att slutsatsen skulle falla?",
        "Det gamla värdet från 2005 låg utanför vad den enklaste kärnmodellen tillåter, men fanns ändå kvar i tabellverken i över tjugo år. Varför plockas inte ett sådant värde bort direkt, och vad säger det om hur mätdata används i forskningen?",
        "Provet innehöll som mest omkring en miljard atomer och halverades var tjugonde timme. Vilka krav ställer det på en mätmetod, och varför räcker det inte att bara mäta längre för att få bättre precision?"
      ]
    },
    body: [
      { type: 'p', html: 'Det finns en gräns för hur långt in i det lilla man kan titta. En atom är omkring 10<sup>−10</sup>&nbsp;m tvärs över, vilket redan är långt bortom vad något ljusmikroskop klarar. Kärnan inne i atomen är ytterligare tiotusen gånger mindre. Att fotografera den är uteslutet. Ändå har en internationell forskargrupp nu kunnat slå fast att kärnan i fermium-255 inte är rund. Den är utdragen — formad som en rugbyboll.' },

      { type: 'h2', text: 'Grundämnet som tar slut i vågskålen' },
      { type: 'p', html: 'Fermium är grundämne nummer 100, uppkallat efter Enrico Fermi, och det tyngsta ämne som över huvud taget går att framställa i vägbara mängder. Även då rör det sig om pikogram. Allt tyngre än så tillverkas atom för atom, i antal som räknas på fingrarna.' },
      { type: 'p', html: 'Att få fram tillräckligt med fermium-255 tog flera år och tre länder. Råvaran var 34&nbsp;ng einsteinium-254 — 8,8&nbsp;·&nbsp;10<sup>13</sup> atomer — från Oak Ridge National Laboratory i USA. Provet bestrålades med neutroner i sju dygn i högflödesreaktorn vid Institut Laue-Langevin i Grenoble, fick svalna i fyra dygn och fördes till Mainz i Tyskland. Kvar fanns 7,5&nbsp;·&nbsp;10<sup>10</sup> atomer einsteinium-255.' },
      { type: 'p', html: 'Den isotopen har halveringstiden 39,8&nbsp;dygn och fungerade som en outsinlig kran: den sönderfaller till största delen genom betasönderfall, där en neutron i kärnan görs om till en proton så att ämnet stiger ett steg i det periodiska systemet — från nummer 99 till nummer 100. Med jämna mellanrum separerades den färska fermiumfraktionen kemiskt, droppades på en zirkoniumfolie och torkades in. Varje färdigt prov innehöll mellan 10<sup>8</sup> och 10<sup>9</sup> atomer, alltså mindre än en biljondels gram. Och eftersom fermium-255 självt har halveringstiden 20&nbsp;timmar tickade klockan från första sekunden.' },

      { type: 'h2', text: 'Formen läses av i elektronernas ljus' },
      { type: 'p', html: 'Tricket är att kärnan aldrig är ensam. Runt den kretsar elektronerna, och några av dem passerar rakt genom kärnområdet. Där känner de av två saker som en punktformig laddning aldrig skulle ge upphov till: kärnans eget magnetfält, och det faktum att dess positiva laddning inte sitter samlad i en punkt utan är utsmetad i en bestämd form.' },
      { type: 'p', html: 'Båda sakerna rubbar elektronernas energinivåer. Rubbningen är ytterst liten, men den finns: varje nivå spjälkas upp i ett knippe närliggande nivåer, en hyperfinstruktur, och varje spektrallinje blir därmed ett helt mönster av tätt liggande linjer. Hur brett mönstret är styrs av kärnans magnetiska dipolmoment. Hur linjerna ligger inbördes styrs av dess elektriska kvadrupolmoment — måttet på hur mycket laddningen avviker från en perfekt kula. Ett positivt kvadrupolmoment betyder en kärna som är utdragen längs sin axel, ett negativt en som är tillplattad. Ungefär som att avgöra formen på en sten under en presenning genom att titta på hur duken buktar.' },
      { type: 'p', html: 'Fermium-255 har kärnspinnet $I = 7/2$, vilket gör att varje atomär energinivå delas i åtta hyperfinnivåer. I de två övergångar laget använde — vid 398,4&nbsp;nm och 398,2&nbsp;nm, alltså violett ljus — väntas 22 respektive 21 linjekomponenter. Laget lyckades skilja ut 15 av de 22 och 13 av de 21.' },

      { type: 'h2', text: 'En laser som korsar atomstrålen på tvären' },
      { type: 'p', html: 'Mätningen gjordes vid masseparatorn RISIKO i Mainz. Provet värmdes till omkring 900&nbsp;°C så att fermiumatomerna ångade av fria. Två titan-safirlasrar riktades mot atomerna: den första ställdes in på en bestämd hyperfinövergång, den andra hade bara en uppgift — att slita loss en elektron från just de atomer som den första lasern redan hade träffat. Bara de blev joner. Jonerna accelererades till 30&nbsp;keV, sorterades efter massa i en magnet och räknades sedan en och en i en detektor. Genom att svepa den första laserns frekvens och räkna joner vid varje steg byggdes spektrumet upp punkt för punkt.' },
      { type: 'p', html: 'Det svåraste var att inte sudda ut linjerna innan de ens hunnit synas. En atom som rör sig mot lasern möter ljuset med något högre frekvens än en som rör sig bort — dopplereffekten, samma sak som gör att en ambulanssiren låter ljusare på väg mot en. I en het ånga far atomerna åt alla håll, och linjerna smetas ut till en enda suddig puckel. Lösningen heter PI-LIST: den mätande lasern skickas in vinkelrätt mot atomstrålen, så att atomernas hastighet längs laserstrålen nästan är noll. Dopplerbreddningen krympte därmed till ungefär 50&nbsp;MHz. Det som blev kvar av linjebredden — 230&nbsp;MHz i den ena övergången och 350&nbsp;MHz i den andra — berodde mest på att lasern måste köras hårt för att över huvud taget ge tillräckligt med signal från så få atomer.' },

      { type: 'h2', text: 'Rugbybollen — och värdet som var omöjligt' },
      { type: 'p', html: 'Ur linjemönstret, kombinerat med kvantmekaniska beräkningar av hur elektronmolnet ser ut hos just fermium, föll två tal ut. Det elektriska kvadrupolmomentet blev $Q_S = +5{,}84 \\pm 0{,}13\\ \\mathrm{eb}$ (elektronbarn) — stort och positivt, vilket betyder en kraftigt och stabilt utdragen kärna. Det magnetiska dipolmomentet blev $\\mu = -0{,}75 \\pm 0{,}05\\ \\mu_\\mathrm{N}$, räknat i kärnmagnetoner, den naturliga enheten för magnetism hos atomkärnor.' },
      { type: 'p', html: 'Det senare talet är samtidigt en rättelse. Ett tidigare försök från 2005, gjort med betydligt sämre upplösning, hade gett ett värde som låg bortom den så kallade Schmidt-gränsen. Den gränsen följer av den enklaste tänkbara skalmodellen, där hela kärnans magnetism antas komma från en enda oparad neutron; för fermium-255 hamnar den vid $-1{,}913\\ \\mu_\\mathrm{N}$, exakt det värde en fri neutron har. Ett mätvärde utanför gränsen är alltså inte bara ovanligt, utan svårt att få ihop över huvud taget — och ändå stod det kvar i tabellverken i över tjugo år. Den nya mätningen landar tryggt innanför.' },
      { type: 'p', html: 'Att det nya värdet håller stöds av grannkärnan californium-253, som har lika många neutroner, 155, och nästan exakt samma två värden: $\\mu = -0{,}731 \\pm 0{,}035\\ \\mu_\\mathrm{N}$ och $Q_S = 5{,}53 \\pm 0{,}51\\ \\mathrm{eb}$. Överensstämmelsen tyder på att det är samma neutronbana som ger upphov till magnetismen i båda kärnorna.' },

      { type: 'h2', text: 'Varför formen avgör kärnans öde' },
      { type: 'p', html: 'Hos de allra tyngsta kärnorna hänger formen ihop med hur väl de står emot spontan fission — att helt enkelt falla isär i två delar av sig själva. Där ligger också nyckeln till en av kärnfysikens öppna frågor: hur långt kan det periodiska systemet sträcka sig? Att förutsäga var eventuella långlivade supertunga grundämnen finns kräver modeller av kärnans inre, och modeller måste stämmas av mot verkligheten.' },
      { type: 'p', html: 'Två sådana modeller prövades mot de nya mätvärdena. Den ena, byggd på Hartree–Fock–Bogoljubov-metoden, hamnade inom fem procent av båda de uppmätta värdena. Den andra överskattade det magnetiska momentet med ungefär 25&nbsp;procent och kvadrupolmomentet med omkring 6&nbsp;procent. Skillnaden är precis den sorts besked teoretiker behöver för att veta vilken beskrivning som bär.' },
      { type: 'p', html: 'Fermium-255 blir därmed en referenspunkt att mäta mot i fortsättningen. Nästa steg väntar redan: en uppgraderad apparatur vid GSI i Darmstadt och en ny anläggningsdel vid acceleratorn GANIL i Frankrike ska göra samma sorts mätning möjlig på kärnor som är ännu tyngre — och ännu mer kortlivade.' },

      { type: 'fact', title: 'Visste du?', items: [
        'Fermium upptäcktes inte i ett laboratorium utan i resterna efter det första vätebombsprovet, Ivy Mike, 1952. Grannen einsteinium hittades i samma stoft.',
        'Råvaran till hela försöket vägde 34&nbsp;ng. Det låter som många atomer — 8,8&nbsp;·&nbsp;10<sup>13</sup> stycken — men är i storleksordningen en tiotusendel av antalet atomer i ett enda saltkorn.',
        'Ljuset som användes hade våglängderna 398,4&nbsp;nm och 398,2&nbsp;nm, alltså violett, precis i kanten av vad ögat uppfattar.',
        'Bakom artikeln står 39 forskare vid 18 institutioner i sju länder. Förstaförfattaren, Mitzi Urquiza-González, arbetar vid Göteborgs universitet.'
      ] }
    ]
  },
  {
    id: "2026-08-12-magnetisk-tratt",
    date: "2026-08-12",
    title: "Runt den nyfödda stjärnans gasstråle ligger magnetfältet lindat som en fjäder — och det är fjädern som skjuter i väg gasen",
    deck: "Sedan 1980-talet har teorin sagt att unga stjärnor gör sig av med sin rotation genom gasstrålar som ett vridet magnetfält både driver och håller ihop. Nu har radioteleskopet ALMA mätt det fältet kring en stjärna under bildning 960 ljusår bort — och fått den elektriska strömmen som håller uppe det på köpet.",
    category: "Astronomi",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-12-magnetisk-tratt.jpg",
    imageAlt: "Konstnärlig gestaltning av en ung stjärna: en glödande, dammig skiva sedd snett uppifrån, och ur dess mitt skjuter en smal gasstråle upp åt vänster. Runt strålen ligger vita spirallinjer lindade som en utdragen fjäder, mot ett rödbrunt stjärnstoftsmoln.",
    imageCredit: "Illustration: NSF/AUI/NSF NRAO/M. Weiss (CC BY 4.0)",
    tags: ["astronomi", "stjärnbildning", "protostjärna", "magnetfält", "elektromagnetism", "polarisation", "radioastronomi", "alma", "fysik 2"],
    sources: [
      { name: "NSF NRAO — Twisted physics: astronomers solve 30-year-old stellar mystery", url: "https://public.nrao.edu/news/twisted-physics-astronomers-solve-30-year-old-stellar-mystery/" },
      { name: "Phys.org — Twisted magnetic field around newborn star confirms decades-old jet theory", url: "https://phys.org/news/2026-08-magnetic-field-newborn-star-decades.html" },
      { name: "Nature Communications — Unveiling dominant toroidal magnetic fields in a protostellar outflow", url: "https://www.nature.com/articles/s41467-026-75950-5" },
      { name: "arXiv:2604.12597 — förhandsversion med hela metoddelen", url: "https://arxiv.org/abs/2604.12597" }
    ],
    research: {
      citation: "T.-C. Ching, Z.-Y. Li, Q. Zhang, J. M. Girart, S.-P. Lai, C.-F. Lee, D. Li, R. Rao och E. Momjian, ”Unveiling dominant toroidal magnetic fields in a protostellar outflow”, Nature Communications, 11 augusti 2026 (DOI 10.1038/s41467-026-75950-5)",
      url: "https://doi.org/10.1038/s41467-026-75950-5"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 — 5.6 Stjärnbildning", href: "katalog.html#fy2-5.6" },
        { label: "Fysik nivå 2 — 3.1 Magnetism och magnetfält", href: "katalog.html#fy2-3.1" },
        { label: "Fysik nivå 2 — 3.2 Magnetfält kring lång rak ledare", href: "katalog.html#fy2-3.2" },
        { label: "Simulering — Magnetfält kring lång rak ledare", href: "fysik2-magnetfalt-app.html" }
      ],
      fragor: [
        "Ingen har sett magnetfältet i sig — det som mättes var att en halv procent av radiovågorna från kolmonoxid svängde i en viss riktning. Vad krävs för att ett sådant indirekt spår ska räknas som ett bevis, och vilka andra antaganden vilar slutsatsen på?",
        "Runt en rak ledare bildar magnetfältet cirklar, och här ligger fältet i cirklar runt gasstrålen. Vad säger det om vad som måste finnas inuti strålen — och varför är just det svårt att få ihop med att rymden brukar beskrivas som tom?",
        "Gasstrålarna bär bort rotation så att stjärnan ska kunna växa färdigt. Diskutera vilka andra situationer i fysiken där ett system måste göra sig av med något för att kunna nå ett lägre, stabilare tillstånd."
      ]
    },
    body: [
      { type: "p", html: "En stjärna föds ur ett gasmoln som faller ihop av sin egen tyngd, och det som sätter käppar i hjulet är rotationen. Molnet snurrar en aning från början, och precis som en konståkare snurrar fortare när armarna dras in snurrar molnet fortare ju mindre det blir. Till slut går den innersta gasen så fort runt att den inte kan falla vidare inåt. Den lägger sig i en roterande skiva runt den blivande stjärnan — en ackretionsskiva — och blir liggande där." },
      { type: "p", html: "Ska stjärnan bli färdig måste alltså någon ta hand om rotationen. Den misstänkte har länge varit de gasstrålar som nyfödda stjärnor skjuter ut åt två håll längs sin rotationsaxel: de bär i väg rörelsemängdsmoment, och gasen som blir kvar kan falla in. Men vad skjuter i väg strålarna, och vad håller ihop dem till smala pelare i stället för att låta dem yra ut åt alla håll? Svaret har sedan 1980- och 1990-talen stått i läroböckerna — magnetfältet — utan att någon kunnat mäta det på plats." },
      { type: "p", html: "Det har nu ett internationellt lag lett av Tao-Chung Ching, tidigare Jansky-stipendiat vid det amerikanska radioobservatoriet NSF NRAO, gjort. Med teleskopanläggningen ALMA i norra Chile kartlade de fältet runt gasströmmen från NGC 1333 IRAS 4A, ett par nyfödda stjärnor inbäddade i Perseusmolnet omkring 960&nbsp;ljusår bort. Resultaten publicerades den 11&nbsp;augusti i <em>Nature Communications</em>." },

      { type: "quote", html: "”För första gången har de här ALMA-observationerna fångat den osynliga tratten av magnetfält. Det är spännande, för det bevisar en decenniegammal teori om hur stjärnor som vår egen sol föds och skjuter i väg mäktiga kosmiska strålar.”", cite: "Tao-Chung Ching, NSF NRAO" },

      { type: "h2", text: "Fältlinjer som vrids till ringar" },
      { type: "p", html: "Gasen närmast en ung stjärna är inte helt neutral. Kosmisk strålning slår loss elektroner här och var, och även om bara ungefär en partikel på en miljon bär laddning räcker det för att gasen ska hänga fast i magnetfältet och släpa med sig fältlinjerna när den rör sig." },
      { type: "p", html: "Från början går fältlinjerna rakt igenom skivan, ut från stjärnan som ekrarna i ett hjul. När skivan snurrar dras deras yttre ändar med i rotationen medan de inre sitter fast, och linjerna vrids upp till en spiral — ungefär som när man skruvar på en telefonsladd. Det ger fältet en ny riktning: en komponent som går <em>runt</em> strålen, i ringar vinkelrätt mot dess färdriktning." },
      { type: "p", html: "Och en fältlinje som ligger i en ring vill dra ihop sig, precis som gummisnodden runt en blombukett. Den kramar gasen inåt mot axeln och håller ihop strömmen till en smal pelare, samtidigt som vridningen fortplantar sig utåt och knuffar gasen framåt. Ett fält i ringar är alltså både motorn och formen — men bara om det verkligen ligger på det viset, och det var just det ingen kunnat visa." },

      { type: "h2", text: "Så mäter man ett fält som ingen kan se" },
      { type: "p", html: "Ett magnetfält i rymden skickar inte ut något ljus. Det man kan komma åt är hur fältet påverkar ljuset från något annat — här kolmonoxidmolekylerna i gasen, som lyser i millimetervågor. I en magnetiserad omgivning fördelas molekylernas energitillstånd en aning ojämnt, och strålningen de sänder ut blir svagt linjärt polariserad, med svängningsriktningen låst till fältets riktning. Effekten förutsades 1981 och är oerhört liten: här handlade det om en halv procent av strålningen." },
      { type: "p", html: "Att fånga något så svagt kräver en mycket stor teleskopanläggning, och ALMA:s upplösning i den här mätningen — motsvarande 147&nbsp;×&nbsp;99 astronomiska enheter, alltså ungefär hundra till hundrafemtio gånger avståndet mellan jorden och solen — var omkring 30&nbsp;gånger skarpare än vad tidigare kartläggningar orkat med." },

      { type: "h2", text: "Fältet låg tvärs över strålen" },
      { type: "p", html: "Resultatet blev tydligt: de uppmätta fältriktningarna låg nästan vinkelrätt mot utflödets axel längs hela dess längd, och följde gasens rotation. Det är signaturen av ett fält lindat i ringar. Ett fält som i stället gick längs med strålen skulle ha gett polarisation i en annan riktning, och en betydligt svagare sådan än den som mättes." },
      { type: "p", html: "Styrkan landade på mellan 0,3 och 6,0 tusendels gauss, alltså mellan 30 och 600&nbsp;nanotesla. Det låter försvinnande lite: jordens magnetfält vid marken är ungefär en halv gauss — närmare hundra gånger mer än det starkaste som mättes här, och närmare tusen gånger mer än det svagaste. En kylskåpsmagnet är starkare än jordens fält igen. Men i den tunna rymdgasen är det gott om kraft. Fältet var starkast nära stjärnan — över 3&nbsp;tusendels gauss på 300&nbsp;astronomiska enheters avstånd, under 2&nbsp;tusendels gauss vid 500." },
      { type: "p", html: "Ett sätt att avgöra om ett fält är starkt <em>nog</em> är att jämföra hur fort störningar rör sig i det med hur fort gasen rör sig. Den hastigheten, Alfvénhastigheten, blev här omkring 4,1&nbsp;km/s på 400 astronomiska enheters avstånd — praktiskt taget exakt gasens egen rotationsfart på samma ställe, 4,0&nbsp;km/s. Fältet hinner alltså med. Det kan både styra och driva utflödet, som i sin helhet rör sig utåt med ungefär 10&nbsp;km/s." },

      { type: "h2", text: "Ampères lag, 960 ljusår bort" },
      { type: "p", html: "Ett vridet magnetfält kommer inte gratis. Redan på 1820-talet visade André-Marie Ampère att fältet kring en strömförande ledare bildar cirklar runt den, och i modern form säger sambandet att fältets vridning i en punkt är proportionell mot strömtätheten just där. Ligger fältet i ringar måste det alltså flyta en ström längs strålen." },
      { type: "p", html: "Laget vände på steken och räknade fram vridningen ur sina egna mätpunkter, och jämförde den med hur mycket laddning som fanns tillgänglig på samma ställen — uppskattat ur gasens täthet och joniseringsgrad. Punkterna föll på en rät linje, med en statistisk säkerhet på 3,3 standardavvikelser. Linjens lutning ger den storhet som annars är nästan omöjlig att komma åt: hur fort elektronerna glider förbi jonerna. Svaret blev $v = 5{,}9 \\pm 1{,}8\\ \\mathrm{m/s}$ — cykelfart." },
      { type: "p", html: "Det är alltså inte fråga om något dramatiskt strömrytande. Men laddningarna är många, volymen är svindlande, och summan räcker för att hålla uppe fältet. Framför allt öppnar knepet en ny väg: den som kan mäta polarisationen i ett stjärnbildningsområde kan hädanefter också uppskatta strömmarna i det." },

      { type: "quote", html: "”Vi visste att IRAS 4A var ett läroboksfall: för 20 år sedan, i ett arbete publicerat i <em>Science</em> 2006, fann vi att den här regionen följde den teoretiskt väntade magnetiskt drivna kollapsen.”", cite: "Josep Miquel Girart, Institut de Ciències de l’Espai (ICE-CSIC) och IEEC" },

      { type: "h2", text: "Samma knep i det stora och det lilla" },
      { type: "p", html: "Bilden som växer fram är att en stjärna inte kan födas utan att samtidigt kasta ut en del av sig själv, och att magnetfältet är verktyget. Mekanismen som nu mätts kring en nyfödd stjärna är i grunden densamma som astronomer tror ligger bakom de långt större strålarna från materia på väg ner i svarta hål — en snurrande skiva, ett fält som vrids upp av rotationen, och en stråle som skjuts ut längs axeln. Att den håller på skalan några hundra astronomiska enheter runt en stjärna som knappt börjat lysa gör det rimligare att den också håller där ingen kommer att kunna mäta." },

      { type: "fact", title: "Kort om mätningen", items: [
        "Målet: NGC 1333 IRAS 4A, ett par stjärnor under bildning i Perseusmolnet, omkring 960&nbsp;ljusår från jorden.",
        "Metoden: ALMA mätte den svaga linjära polarisationen — cirka 0,5&nbsp;% — hos millimetervågorna från kolmonoxid i utflödet.",
        "Fyndet: fältriktningarna låg nästan vinkelrätt mot utflödets axel, alltså lindade i ringar runt det, med styrkan 0,3–6,0 tusendels gauss (30–600&nbsp;nanotesla).",
        "Bonusen: en rät linje mellan fältets vridning och strömtätheten gav elektronernas drifthastighet i förhållande till jonerna, 5,9&nbsp;±&nbsp;1,8&nbsp;m/s.",
        "Betydelsen: den första upplösta mätningen av ett sådant fält kring en protostjärna, och ett direkt stöd för att gasstrålarna drivs magnetiskt."
      ] }
    ]
  },
  {
    id: "2026-08-11-spegeln-som-ljuger",
    date: "2026-08-11",
    title: "Fysiker har byggt en spegel som ljuger — vad man än håller framför den svarar den med en åtta",
    deck: "Ytan ser slät ut men är kuperad i steg som mäts i ljusets våglängder. Ett lag vid UCLA visade tio olika handskrivna siffror för sin spegel, och varje gång kom samma bild tillbaka. Mönstret räknades fram med maskininlärning — men själva förvandlingen sker i ljusets egen gång genom det.",
    category: "Optik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-11-spegeln-som-ljuger.jpg",
    imageAlt: "En bildmatris. Översta raden visar tio vita handskrivna siffror, 0 till 9, mot svart bakgrund. Under dem ligger fyra rader kamerabilder i rött, grönt, blått och blandfärg — och i varenda ruta syns samma sak: en handskriven åtta.",
    imageCredit: "Bild: Y. Li, S. Chen, B. Bai och A. Ozcan, Nature Communications 2026 (CC BY 4.0)",
    tags: ["optik", "ljus", "diffraktion", "interferens", "vågor", "laser", "våglängd", "maskininlärning", "fysik 2"],
    sources: [
      { name: "Phys.org — ”Lying mirror” uses structured surfaces to conceal optical information", url: "https://phys.org/news/2026-08-mirror-surfaces-conceal-optical.html" },
      { name: "Nature Communications — Lying mirror using structured surfaces (öppet tillgänglig)", url: "https://www.nature.com/articles/s41467-026-76488-2" },
      { name: "arXiv:2410.15521 — Lying mirror (förhandsversion med metoddel)", url: "https://arxiv.org/abs/2410.15521" }
    ],
    research: {
      citation: "Y. Li, S. Chen, B. Bai och A. Ozcan, ”Lying mirror using structured surfaces”, Nature Communications, 7 augusti 2026 (DOI 10.1038/s41467-026-76488-2, CC BY 4.0)",
      url: "https://doi.org/10.1038/s41467-026-76488-2"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 — 4.2 Ljus, diffraktion och interferens", href: "katalog.html#fy2-4.2" },
        { label: "Fysik nivå 2 — 2.14 Diffraktion och interferens", href: "katalog.html#fy2-2.14" },
        { label: "Fysik nivå 2 — 4.1 Elektromagnetiska vågor och ljus", href: "katalog.html#fy2-4.1" },
        { label: "Simulering — Vågsimulator", href: "fysik2-vagsimulator.html" }
      ],
      fragor: [
        "En skrattspegel och den här spegeln ändrar båda ljusets fas. Varför känner man ändå igen sig i den ena men inte i den andra? Vad är det som skiljer en mjuk faskurva över hela ytan från abrupta hopp mellan grannrutor?",
        "Mönstrets rutor är ungefär en halv våglängd breda. Vad skulle hända med spegelns förmåga att dölja om rutorna i stället var en tiondels millimeter breda — alltså hundratals våglängder — och varför?",
        "Ett neuronnät kunde återskapa originalbilderna när det fått se omkring 10 000 par av in- och utbild. Betyder det att spegeln misslyckas med sin uppgift? Diskutera skillnaden mellan att dölja något för en betraktare och att göra det omöjligt att återskapa."
      ]
    },
    body: [
      { type: "p", html: "Ett tivolis skrattspeglar ljuger, men de ljuger klumpigt. Den buktande ytan drar ut en på längden eller trycker ihop en på bredden, och man känner ändå igen sig. Ett forskarlag vid University of California, Los Angeles har nu byggt något annat: en spegel som inte förvränger motivet utan byter ut det. Vad man än håller framför den kommer samma bild tillbaka." },
      { type: "p", html: "I försöket visade laget tio handskrivna siffror, 0 till 9, för sin spegel — bilder som den aldrig hade mött när den konstruerades. Kameran på andra sidan fångade tio gånger samma sak: en handskriven åtta. Det fungerade i rött, grönt och blått ljus var för sig ($\\lambda = 600$, 550 respektive 480&nbsp;nm) och när alla tre färgerna lyste samtidigt. Arbetet publicerades den 7&nbsp;augusti i <em>Nature Communications</em>." },

      { type: "quote", html: "”I stället för att bara förvränga en spegelbild är den ljugande spegeln konstruerad för att optiskt ersätta den visuella informationen från många olika, okända motiv med ett förutbestämt vilseledande mönster.”", cite: "Aydogan Ozcan, UCLA, till Phys.org" },

      { type: "h2", text: "Varför en vanlig spegel inte kan ljuga" },
      { type: "p", html: "En slät spegel bevarar bilden därför att den bevarar vågens form. Ljuset från varje punkt på ett föremål når spegeln som en vågfront, kastas tillbaka enligt reflexionslagen och behåller sina inbördes fasförhållanden — vilken del av vågen som ligger före och vilken som släpar efter. Det är den informationen ögat sedan tolkar som en bild." },
      { type: "p", html: "En buktig spegel ändrar visserligen också fasen, men mjukt och gradvis över ytan: hela vågfronten böjs som en enhet, så bilden förstoras, förminskas eller sträcks ut. Motivet finns kvar. För att verkligen radera det måste fasen ändras abrupt, ruta för ruta, på en skala som är jämförbar med ljusets våglängd." },

      { type: "h2", text: "Ett mönster i våglängdens skala" },
      { type: "p", html: "Det är precis vad den ljugande spegeln gör. I grundutförandet sitter ett rutmönster av 120&nbsp;×&nbsp;120 fält framför en vanlig spegel, och varje fält fördröjer ljuset en egen bestämd bit. Fälten är ungefär en halv våglängd breda — för grönt ljus knappt 0,3&nbsp;mikrometer. Hela anordningen, från mönstret till spegelytan bakom, sträcker sig bara 53,3 våglängder i djupled — med samma gröna ljus knappt tre hundradels millimeter." },
      { type: "p", html: "Fasförskjutningen kommer av en ren vägskillnad. En spegelruta som ligger höjden $h$ lägre än sina grannar tvingar ljuset att gå sträckan $2h$ längre, ner och upp igen, vilket svarar mot faskiftet $\\Delta\\varphi = \\dfrac{2\\pi \\cdot 2h}{\\lambda}$. Ligger rutan en kvarts våglängd djupare kommer ljuset därifrån tillbaka i motfas mot grannarnas och släcker ut dem. Att uttrycket innehåller $\\lambda$ är också skälet till att ett mönster som ljuger perfekt i rött ljus inte automatiskt gör det i blått — varje färg måste vägas in när mönstret räknas fram." },
      { type: "p", html: "Sedan sköter diffraktionen resten. Ljuset från varje enskild ruta breder ut sig när det fortsätter framåt, så varje punkt i bildplanet får bidrag från hela ytan. Vad som blir ljust och vad som blir mörkt avgörs av hur alla dessa delvågor interfererar. Med över tiotusen fördröjningar att skruva på finns tillräckligt många frihetsgrader för att bygga nästan vilket utfall som helst." },

      { type: "h2", text: "Datorn räknade ut mönstret, ljuset gör jobbet" },
      { type: "p", html: "Vilken fördröjning varje ruta skulle ha togs fram med maskininlärning. Laget skickade tusentals bilder — klädesplagg, siffror, klotter — genom en datormodell av spegeln och justerade mönstret steg för steg tills utbilden liknade måltavlan så mycket som möjligt, mätt som korrelationen mellan de två." },
      { type: "p", html: "Poängen är att spegeln inte lär sig bilderna utantill. Testad med nya, osedda bilder av samma slag nådde de tre modellerna korrelationerna 0,97, 0,97 och 0,95 mot måltavlan. En spegel som bara tränats på klädesplagg klarade sig till och med bra på fotografier ur en helt annan bilddatabas — korrelation 0,92 — trots att den aldrig mött något liknande. Den tålde dessutom att motivet vreds, flyttades, skalades om eller doldes i brus, den var okänslig för ljusets polarisation, och den fungerade inom ±5 grader från den tänkta betraktningsvinkeln." },
      { type: "p", html: "När mönstret väl är tillverkat behövs varken ström eller beräkningar. Omvandlingen sker under ljusets egen färd genom mönstret — spegeln är en helt passiv bit optik." },

      { type: "image", src: "nyheter/bilder/2026-08-11-spegeln-som-ljuger-2.jpg", alt: "Ett optiskt bord fotograferat rakt uppifrån, med laser, polarisator, stråldelare och en liten mikrospegelmodul. Till höger en förstoring av spegelns yta som ett grynigt gråskalemönster.", caption: "Uppställningen sedd uppifrån: lasern kommer in från höger, motivet läggs in i strålen vid ingångsplanet och stråldelaren skickar det reflekterade ljuset ner mot kameran. Till höger syns mönstret som lades på mikrospegelytan — det ser ut som brus, men varje ruta har en uträknad fördröjning.", credit: "Bild: Y. Li, S. Chen, B. Bai och A. Ozcan, Nature Communications 2026 (CC BY 4.0)" },

      { type: "h2", text: "Från simulering till optiskt bord" },
      { type: "p", html: "Själva försöket gjordes med en enklare variant, där mönstret lagts direkt på spegelytan utan mellanrum. Rollen spelades av en matris med 150&nbsp;×&nbsp;150 rörliga mikrospeglar — samma sorts mikromekanik som sitter i bildchippet i en videoprojektor, men här ställd så att varje spegel skjuts i djupled och ändrar ljusets väglängd, i stället för att vippa undan det. Motivet visades som ett fasmönster på en ljusmodulator, och en kamera fångade utbilden. Varianten utan mellanrum är enklare att bygga och lättare att rikta in, men den presterar sämre: i simuleringarna sjönk korrelationerna till 0,87, 0,84 och 0,79, eftersom ljuset inte längre hinner breda ut sig mellan de två passagerna genom mönstret." },
      { type: "p", html: "Laget byggde också en bredbandig version, tränad över hela intervallet 520–570&nbsp;nm. Den höll korrelationen över 0,85 i ett ännu bredare band, 500–600&nbsp;nm — alltså även vid färger den aldrig tränats på." },

      { type: "h2", text: "Men det är ingen kryptering" },
      { type: "p", html: "Forskarna angrep sin egen konstruktion för att se hur väl den egentligen döljer. De lät ett neuronnät träna på par av in- och utbilder och försöka räkna sig tillbaka till originalet. Med ett litet träningsunderlag kom nätet inte åt originalens finare detaljer; vid omkring 500 par började de träda fram; och med ungefär 10&nbsp;000 par återskapade nätet originalbilderna i god kvalitet." },
      { type: "p", html: "Slutsatsen är alltså inte att informationen förintats, utan att den flyttats någon annanstans än till det öga eller den kamera som tittar. Det räcker för kamouflage. Det räcker inte som säkerhetsgaranti." },
      { type: "p", html: "Och det är fortfarande långt till en spegel att hänga i hallen. Försöket krävde koherent laserljus, ett motiv som visades elektroniskt i strålens väg och en kamera i ett noga inställt bildplan, och utbilderna mätte bråkdelar av en millimeter. Att samma princip skulle fungera i vanligt, spretigt dagsljus har laget än så länge bara visat i simuleringar." },

      { type: "fact", title: "Kort om den ljugande spegeln", items: [
        "Består av en vanlig reflekterande spegel plus ett mönster av fasfördröjande fält, vart och ett ungefär en halv våglängd brett.",
        "Mönstret räknas fram med maskininlärning, men själva omvandlingen är rent optisk — ingen ström och inga beräkningar när den väl är tillverkad.",
        "I försöket blev tio olika handskrivna siffror alla till samma åtta, i rött (600&nbsp;nm), grönt (550&nbsp;nm) och blått (480&nbsp;nm) ljus.",
        "Tål vridning, förflyttning, skalning och brus i motivet, och fungerar inom ±5 graders betraktningsvinkel.",
        "Ett neuronnät med omkring 10&nbsp;000 träningspar kunde ändå återskapa originalbilderna — döljandet är kamouflage, inte kryptering."
      ] }
    ]
  },
  {
    id: "2026-08-10-solformorkelse-sverige",
    date: "2026-08-10",
    title: "På onsdag tar månen fyra femtedelar av solen — och nästan ingen kommer att se det på ljuset",
    deck: "Den 12 augusti skyms drygt 80 procent av solskivan sett från Sverige, strax före solnedgången. Det är den största solförmörkelsen här sedan 2015. Ögat kommer knappt att märka att något händer — och just därför är det farligare än det låter att kika upp.",
    category: "Astronomi",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-10-solformorkelse-sverige.jpg",
    imageAlt: "En djupt förmörkad sol står som en tunn orange skära strax över havshorisonten. Solskäran speglar sig i vattnet, och till vänster syns silhuetten av en fyr mot en gråblå gryningshimmel.",
    imageCredit: "Foto: NASA/Aubrey Gemignani (public domain)",
    tags: ["astronomi", "solförmörkelse", "solen", "månen", "optik", "geometri", "ljus", "meteorer", "perseiderna", "ögonskydd", "fysik 1", "fysik 2"],
    sources: [
      { name: "Astroinfo.se — Partiell solförmörkelse 12 augusti 2026", url: "https://www.astroinfo.se/2026-08-12-partiell-solformorkelse/" },
      { name: "NASA — Eclipses During 2026 (Fred Espenak)", url: "https://eclipse.gsfc.nasa.gov/OH/OH2026.html" },
      { name: "Instituto Geográfico Nacional — Eclipse total de Sol de 12 de agosto de 2026", url: "https://eclipses.ign.es/eclipse-total-sol-de-12-de-agosto-2026.html" },
      { name: "NASA — Eclipse safety", url: "https://science.nasa.gov/eclipses/safety/" },
      { name: "Populär Astronomi — Dubbelt himmelskådespel", url: "https://www.popularastronomi.se/2026/06/dubbelt-himmelskadespel-solformorkelse-och-meteorskur-samma-dag/" },
      { name: "International Meteor Organization — Perseiderna", url: "https://www.imo.net/resources/calendar/" }
    ],
    research: null,
    larare: {
      moment: [
        { label: "Simulering — Solförmörkelse", href: "fysik2-solformorkelse.html" },
        { label: "Fysik nivå 2 — 5.3 Månens faser och förmörkelser", href: "katalog.html#fy2-5.3" },
        { label: "Fysik nivå 2 — 5.2 Mäta avstånd i rymden", href: "katalog.html#fy2-5.2" },
        { label: "Fysik nivå 2 — 4.1 Elektromagnetiska vågor och ljus", href: "katalog.html#fy2-4.1" }
      ],
      fragor: [
        "Samma förmörkelse beskrivs på olika håll som 81 procent och som 86 procent. Båda talen är riktigt uträknade. Vad säger det om hur man bör läsa en procentuppgift i en nyhetstext, och vilken av de två är mest relevant för hur ljust det blir ute?",
        "Månen är ungefär 400 gånger mindre än solen och råkar samtidigt stå ungefär 400 gånger närmare. Vore det ett problem för vetenskapen om den slumpen inte fanns — alltså skulle vi veta mindre om solen då, eller bara se mindre?",
        "Ögat klarar inte av att avgöra när solen är farlig att titta på, eftersom både obehaget och pupillreflexen styrs av hur ljust det känns. Vilka andra situationer känner ni till där en kroppslig varningssignal saknas just när risken är som störst — och hur hanterar man det?"
      ]
    },
    body: [
      { type: "p", html: "Onsdagen den 12 augusti skjuter månen in sig framför solen, och för första gången på elva år blir bortfallet stort nog att någon skulle kunna ana det. Från Sverige är förmörkelsen partiell: månen tar en bit ur solskivan, aldrig hela. Den börjar strax före kvart i sju på kvällen längst i norr och strax efter klockan tio över sju i Skåne, kulminerar mellan ungefär 19.40 och 20.05 beroende på var man står, och pågår i en och en halv till knappt två timmar." },
      { type: "p", html: "Enligt beräkningarna hos Astroinfo skyms som mest 83,3&nbsp;procent av solens yta i Malmö, 83,0&nbsp;procent i Göteborg, 80,9&nbsp;procent i Stockholm och 81,7&nbsp;procent i Kiruna. Det är den största solförmörkelsen över Sverige sedan mars 2015. Haken är höjden: när förmörkelsen är som djupast står solen bara runt fem grader över horisonten i södra Sverige — en halv knytnäve på utsträckt arm. Utan fri sikt åt väster blir det ingen förmörkelse alls, och längst i sydost hinner solen gå ner medan månen fortfarande ligger kvar över den." },

      { type: "widget", widget: "formorkelse-sverige" },

      { type: "h2", text: "En skugga som bara är 294 kilometer bred" },
      { type: "p", html: "Månens skugga har två delar. Ytterst ligger halvskuggan, där månen skymmer en del av solskivan — den är tusentals kilometer bred, och det är i den Sverige hamnar. Innerst ligger kärnskuggan, där månen täcker solen helt. Den är den 12 augusti bara 294&nbsp;kilometer bred där den träffar jordytan, och den sveper från Sibirien över Arktis, östra Grönland och västra Island, ut över Atlanten och in över norra Spanien." },
      { type: "p", html: "Djupast blir förmörkelsen klockan 17.46 världstid vid en punkt i havet knappt fem mil väster om Island, där totaliteten varar 2&nbsp;minuter och 18&nbsp;sekunder. I Spanien inträffar den strax efter halv nio svensk tid — samma klockslag som här, eftersom länderna delar tidszon — men där slocknar solen helt i drygt en och en halv minut. Även spanjorerna får kämpa med horisonten: solen står 12&nbsp;grader upp i A&nbsp;Coruña, omkring 8&nbsp;grader i Oviedo och Zaragoza och futtiga 2&nbsp;grader på Mallorca." },
      { type: "p", html: "Det är den första totala solförmörkelsen över det europeiska fastlandet sedan 1999, och den första över Spanien sedan 1905. Sverige fick sin senaste den 30&nbsp;juni 1954. Nästa gång kärnskuggan sveper över landet är den 16&nbsp;oktober 2126." },

      { type: "image", src: "nyheter/bilder/2026-08-10-solformorkelse-sverige-2.jpg", alt: "En svart månskiva täcker solen. Runt kanten syns en tunn pärlemorskimrande krans, och i nederkanten blixtrar en enda bländande ljuspunkt fram.", caption: "Det som Sverige missar: sekunden då den sista solstrimman försvinner bakom månen och koronan träder fram. Bilden är tagen vid den totala solförmörkelsen över Oregon 2017.", credit: "Foto: NASA/Aubrey Gemignani (public domain)" },

      { type: "h2", text: "Slumpen som gör totala förmörkelser möjliga" },
      { type: "p", html: "Att månen över huvud taget kan täcka solen är en tillfällighet. Solen är ungefär 400&nbsp;gånger större i diameter än månen, och råkar just nu stå ungefär 400&nbsp;gånger längre bort. Därför ser båda ut att vara omkring en halv grad breda på himlen — ungefär som en ärta på drygt en meters håll. Den 12 augusti är månskivan knappt fyra procent bredare än solskivan, tillräckligt för att täcka den helt, men bara nätt och jämnt." },
      { type: "p", html: "Att det inte blir förmörkelse vid varje nymåne beror på att månens bana lutar drygt fem grader mot jordens bana runt solen. För det mesta passerar månen alltså strax ovanför eller nedanför solskivan sett från oss. Bara när nymånen infaller nära en av de två punkter där banorna korsas hamnar de tre kropparna på tillräckligt rak linje." },

      { type: "h2", text: "81 procent eller 86 — båda stämmer" },
      { type: "p", html: "Olika källor uppger olika värden för samma förmörkelse, och de har alla rätt. Det ena måttet är hur stor <em>andel av solens yta</em> som är dold; det andra är hur långt in över solskivan månens kant har trängt, mätt <em>längs diametern</em>. I Malmö är det första 83,3&nbsp;procent och det andra 86,2&nbsp;procent. Skillnaden är ren geometri: den kvarvarande ljusa skäran är tunn men lång, och en tunn skära rymmer mer yta än vad ögonmåttet längs diametern antyder. När något beskrivs i procent är det alltså värt att fråga: procent av vad?" },

      { type: "h2", text: "Fyra femtedelar borta — och ändå ljust" },
      { type: "p", html: "Den som inte vet om förmörkelsen kommer med stor sannolikhet att missa den. Direkt solljus ger omkring 100&nbsp;000&nbsp;lux; med 81&nbsp;procent av solen borta återstår ungefär 19&nbsp;000&nbsp;lux, vilket fortfarande är en ljus mulen dag. Ögat mäter inte ljus linjärt utan ungefär logaritmiskt — samma egenskap som låter oss se både i månsken och i middagssol — så ett bortfall på fyra femtedelar upplevs som en aning grådaskigt, inte som skymning. Först över ungefär 99&nbsp;procent börjar det kännas som att kvällen kommit på fel tid." },
      { type: "p", html: "Det är den upplevelsen som gör en förmörkelse riskabel. Den smala solskära som är kvar lyser tiotusentals gånger starkare än fullmånen, men eftersom omgivningen inte känns bländande försvinner den reflex som annars får oss att vända bort blicken. Näthinnan saknar dessutom smärtreceptorer: en skada gör inte ont när den sker, utan visar sig som en suddig fläck mitt i synfältet timmar senare, och kan bli bestående." },

      { type: "h2", text: "Så tittar du utan att bränna näthinnan" },
      { type: "p", html: "Godkända förmörkelseglasögon följer standarden ISO&nbsp;12312-2 och släpper igenom högst 0,00032&nbsp;procent av solljuset — mindre än en trehundratusendel — samtidigt som de stoppar ultraviolett och infraröd strålning. Vanliga solglasögon släpper igenom i storleksordningen tio procent av ljuset — tiotusentals gånger för mycket — och duger inte, hur mörka de än är. Och glasögonen får aldrig kombineras med kikare, teleskop eller kameraobjektiv: optiken samlar ihop solljuset och bränner rakt igenom filtret på ett ögonblick." },

      { type: "image", src: "nyheter/bilder/2026-08-10-solformorkelse-sverige-3.jpg", alt: "En person på en strand bär vita förmörkelseglasögon av papp med mörka filter och tittar snett uppåt mot himlen.", caption: "Förmörkelseglasögon är inte solglasögon — filtret ska släppa igenom mindre än en trehundratusendel av solljuset.", credit: "Foto: NASA/Aubrey Gemignani (public domain)" },

      { type: "p", html: "Det säkraste sättet kräver ingen utrustning alls. Stick ett litet hål i en kartongbit, vänd hålet mot solen och fånga upp ljuset på ett papper i skuggan bakom: hålet fungerar som en enkel kamera och avbildar solen. Bilden blir $d = L \\cdot \\alpha$ stor, där $L$ är avståndet mellan hål och papper och $\\alpha \\approx 0{,}0093$ är solens vinkelstorlek i radianer — två meter ger alltså en solskiva på knappt två centimeter, tydligt naggad i kanten. Samma sak sker gratis under ett lövträd, där varje glugg mellan bladen kastar sin egen lilla solskära på marken." },

      { type: "h2", text: "Samma natt faller perseiderna" },
      { type: "p", html: "Att meteorsvärmen perseiderna kulminerar natten mellan den 12 och 13 augusti, precis när himlen är helt månlös, är ingen slump. En solförmörkelse kan bara inträffa vid nymåne — månen måste stå mellan jorden och solen — och vid nymåne finns det inget månljus kvar att blekna ut de svagaste meteorerna med. Årets bästa förmörkelse och årets bästa meteornatt hänger alltså ihop." },
      { type: "p", html: "Perseiderna är stoft som kometen 109P/Swift–Tuttle lämnat efter sig längs sin bana. Kornen är oftast inte större än ett sandkorn, men de möter jordens atmosfär i omkring 59&nbsp;km/s och glöder upp på 80–100&nbsp;kilometers höjd. Under en riktigt mörk himmel kan det bli 60–100 meteorer i timmen efter midnatt. Det talet förutsätter dock idealiska förhållanden — de högsta värdena som brukar citeras gäller en helt mörk himmel med svärmens utstrålningspunkt rakt ovanför, vilket nästan aldrig är fallet. Räkna hellre med några tiotal i timmen, och med att de blir fler ju närmare gryningen man orkar hålla ut." },

      { type: "fact", title: "Solförmörkelsen 12 augusti 2026", items: [
        "Partiell i hela Sverige: 80–83&nbsp;procent av solens yta skyms, mest i Skåne.",
        "Maximum mellan ungefär 19.40 (Kiruna) och 20.05 (Malmö) — solen står då bara några grader över horisonten.",
        "Total i ett 294&nbsp;kilometer brett band över Arktis, östra Grönland, västra Island och norra Spanien.",
        "Längsta totalitet: 2&nbsp;minuter och 18&nbsp;sekunder, i havet väster om Island.",
        "Sveriges senaste totala solförmörkelse inträffade 1954; nästa kommer 2126.",
        "Titta aldrig direkt mot solen utan filter enligt ISO&nbsp;12312-2 — och aldrig genom kikare eller teleskop, ens med sådana glasögon."
      ] }
    ]
  },
  {
    id: "2026-08-09-flygande-fokus",
    date: "2026-08-09",
    title: "Elektronerna sprang alltid i från vågen de surfade på — nu har fysiker lärt laserns fokus att flyga i kapp dem",
    deck: "I en laserdriven plasmaaccelerator får elektroner surfa på en våg av laddning och kan nå enorm fart på några millimeter. Haken är att vågen alltid är en aning långsammare än surfarna. Ett lag i Rochester har nu format en laserpuls vars ljusstarkaste punkt förflyttar sig framåt med precis ljushastighet — och fick därmed ut elektroner med mer än dubbelt så hög energi som gränsen tillåter.",
    category: "Partikelfysik",
    readingTime: "7 min",
    image: "nyheter/bilder/2026-08-09-flygande-fokus.jpg",
    imageAlt: "En forskare i blå skyddsrock, hårnät och mörka laserskyddsglasögon justerar en optisk komponent på ett laserbord inne i ett laboratorium. Mitt på komponenten lyser en grön laserpunkt, och i bakgrunden syns den runda öppningen till en stor vakuumkammare.",
    imageCredit: "Foto: Lawrence Livermore National Laboratory (pressbild)",
    tags: ["partikelfysik", "acceleratorfysik", "plasma", "laser", "optik", "elektron", "elektriska fält", "kölvattenacceleration", "ljushastighet", "elektronvolt", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-08-flying-focus-laser-key-limitation.html" },
      { name: "Laboratory for Laser Energetics, University of Rochester", url: "https://www.lle.rochester.edu/news/flying-focus-laser-plasma-acceleration/" },
      { name: "Nature Physics (studien, fritt tillgänglig)", url: "https://www.nature.com/articles/s41567-026-03352-x" }
    ],
    research: {
      citation: "C. D. Arrowsmith, K. G. Miller m.fl., ”Dephasingless laser wakefield acceleration of electrons using a flying focus”, Nature Physics (10 juli 2026)",
      url: "https://doi.org/10.1038/s41567-026-03352-x"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 7.10 Elektriska fält och elektrisk fältstyrka", href: "katalog.html#fy1-7.10" },
        { label: "Fysik nivå 1 · 8.1 Relativitetsteori", href: "katalog.html#fy1-8.1" },
        { label: "Fysik nivå 2 · 2.7 Pulser, vågor och utbredningshastighet", href: "katalog.html#fy2-2.7" }
      ],
      fragor: [
        "Den ljusstarkaste punkten i ett flygande fokus kan fås att röra sig fortare än ljuset, utan att någon naturlag bryts. Vad är det egentligen som inte får överskrida ljushastigheten — och hur avgör man om något ”rör sig” i den meningen?",
        "Effekten uppträdde bara i ett smalt tätintervall. Ett resultat som kräver att man träffar rätt på en hundradel kan ses både som ett tecken på svaghet och som ett starkt stöd för teorin. Vilket är det här, och varför?",
        "Forskarna kallar själva resultatet ett principbevis, inte en färdig accelerator, och redovisar öppet att strålen har stor energispridning och liten laddning. Varför är det värt att publicera ett resultat som ännu är sämre än de bästa befintliga acceleratorerna?"
      ]
    },
    body: [
      { type: "p", html: "Idén är gammal och lockande: skjut i väg en kort, våldsamt intensiv laserpuls genom en gas, och låt elektroner surfa på vågen som bildas bakom den. Fälten i en sådan plasmavåg är tusentals gånger starkare än i en vanlig accelerator, så på några millimeter kan elektronerna få lika mycket fart som de annars behöver tiotals meter för. Haken har hela tiden varit densamma: surfarna hinner i kapp vågen." },
      { type: "p", html: "I en studie i <em>Nature Physics</em> rapporterar ett lag vid University of Rochesters Laboratory for Laser Energetics att de kommit runt det. Genom att forma laserpulsen så att dess ljusstarkaste punkt förflyttar sig framåt med precis ljushastighet fick de ut elektroner med energin $396 \\pm 14\\ \\mathrm{MeV}$ ur en plasmasträcka på 7&nbsp;millimeter. Den klassiska gränsen för samma sträcka ligger på $185\\ \\mathrm{MeV}$." },

      { type: "h2", text: "Varför metallrör inte räcker" },
      { type: "p", html: "En konventionell accelerator driver partiklarna framåt med elektriska fält i metallhålrum, där en radiovåg svänger fram och tillbaka. Fältet kan inte göras hur starkt som helst: blir det för kraftigt slår det gnistor mellan metallytorna, och hela hålrummet slutar fungera. I praktiken hamnar taket kring några tiotals megavolt per meter. En elektron som ska nå 400&nbsp;megaelektronvolt behöver därför drygt tio meter rör." },
      { type: "p", html: "Ett plasma har inte det problemet. Gasen är redan sönderdelad i fria elektroner och positiva joner, så det finns ingenting kvar att slå sönder — en gnista är just en gas som blir plasma, och där har det redan hänt. Ett laserdrivet plasma kan bära fält på över 1&nbsp;GV/cm, alltså 100&nbsp;000&nbsp;megavolt per meter." },

      { type: "h2", text: "Vågen bakom pulsen" },
      { type: "p", html: "Själva laserpulsen accelererar inte elektronerna direkt. Den sliter först loss dem från atomerna och skapar sitt eget plasma. Sedan knuffar ljustrycket från pulsen undan de fria elektronerna åt sidorna, medan jonerna — tusentals gånger tyngre — knappt hinner röra sig under de femtosekunder pulsen varar." },
      { type: "p", html: "Bakom pulsen blir det därför en bubbla nästan tömd på elektroner, med de positiva jonerna kvar. De undanknuffade elektronerna svänger tillbaka och samlas i ett tunt skal runt bubblan. Laddningsuppdelningen mellan skalet och jonerna sätter upp ett väldigt elektriskt fält inuti bubblan, och eftersom bubblan följer med pulsen framåt bildar den ett kölvatten — precis som vågen bakom en båt. Några elektroner fångas in i bubblans bakre del och dras med. Det är där accelerationen sker, och det är den processen som gett metoden namnet kölvattenacceleration. Toshiki Tajima och John Dawson föreslog den redan 1979." },

      { type: "h2", text: "Problemet: elektronerna hinner i kapp" },
      { type: "p", html: "En infångad elektron är uppe i nästan ljusets fart efter en bråkdel av en millimeter. Bubblan, däremot, rör sig med laserpulsens grupphastighet, och ljus i ett plasma går alltid en aning långsammare än i vakuum. Skillnaden är futtig, men den samlas på hög." },
      { type: "p", html: "Millimeter för millimeter glider elektronknippet framåt inuti bubblan. Till slut passerar det mitten och hamnar i den främre halvan, där fältet pekar åt andra hållet och bromsar i stället för att driva på. Accelerationen tar slut — på engelska <em>dephasing</em>, att elektronerna hamnar i otakt med vågen." },
      { type: "p", html: "Det vanliga motmedlet är att späda ut plasmat. Ju glesare gas, desto närmare ljushastigheten kommer grupphastigheten, och desto längre hinner elektronerna innan de hamnar i otakt. Så har dagens bästa enstegsacceleratorer nått 10&nbsp;GeV. Men fältstyrkan avtar samtidigt som roten ur tätheten, så vinsten äts upp: att nå 100&nbsp;GeV den vägen skulle kräva ungefär tio meter plasma och orimligt mycket laserenergi." },

      { type: "h2", text: "Ett fokus som flyger" },
      { type: "p", html: "Lösningen laget använde heter flygande fokus, och den börjar i en spegel som kallas axiparabola. Till skillnad från en vanlig hålspegel har den olika brännvidd på olika avstånd från mitten: ljus som träffar nära centrum samlas i en punkt strax framför spegeln, ljus som träffar ytterkanten samlas längre bort. I stället för en enda fokuspunkt får man en utdragen fokuslinje, i det här fallet 7&nbsp;millimeter lång." },
      { type: "image", src: "nyheter/bilder/2026-08-09-flygande-fokus-2.jpg", alt: "Schematisk ritning av försöket. Till vänster en stor rund spegel, axiparabolan, som kastar en röd, konformad laserstråle mot en liten gascell i mitten. Ur cellen fortsätter ett blått elektronknippe genom en folie in mellan polerna på en stor spektrometermagnet, som böjer av elektronerna ner mot en bildplatta. Infällda diagram visar spegelns brännvidd, tre bilder av den ringformade fokusfläcken och en interferensmätning av plasmats täthet.", caption: "Försöket från spegel till mätning. Axiparabolan till vänster drar ut fokus till en 7&nbsp;millimeter lång linje inne i gascellen, där plasmavågen bildas. Elektronerna fortsätter ut genom en folie och böjs av i spektrometermagneten, som sorterar dem efter energi på bildplattorna längst till höger.", credit: "Figur: C. D. Arrowsmith m.fl., Nature Physics (2026), CC BY-NC-ND 4.0" },
      { type: "p", html: "Eftersom ljuset från de olika ringarna når sina respektive fokuspunkter vid olika tidpunkter sveper den ljusstarkaste punkten framåt längs linjen. Farten hos den punkten bestäms i första hand av spegelns form — inte av hur snabbt en ljuspuls tar sig genom plasmat. Den går alltså att ställa in, och forskarna ställde in den på exakt ljushastigheten i vakuum. Då rör sig plasmavågen lika fort som elektronerna, och de kan aldrig glida fram i bubblan." },
      { type: "p", html: "Att en ljuspunkt förflyttar sig med ljusets fart, eller till och med fortare, bryter inte mot någon naturlag. Punkten är ingen sak utan ett möte: den uppstår där ljus från olika delar av spegeln råkar komma fram samtidigt. Samma sak händer i en sax — skärningspunkten mellan bladen kan svepa längs saxen fortare än bladen själva rör sig, utan att någonting alls färdas i den farten. Ingen materia och inget meddelande följer med punkten." },
      { type: "p", html: "Metoden föreslogs teoretiskt 2020, men det har varit en öppen fråga om den fungerar i praktiken. Axiparabolans fokusfläck är inte en prydlig prick utan har ringar runt sig, och ringarna driver egna småvågor i plasmat som kan stjäla energi ur pulsen och förvrida bubblan." },

      { type: "h2", text: "Ett smalt fönster i tätheten" },
      { type: "p", html: "Försöket gjordes på lasersystemet MTW-OPAL vid laboratoriet, med pulser på 21&nbsp;femtosekunder och 4&nbsp;joule. Gascellen fylldes med en blandning av 95&nbsp;% väte och 5&nbsp;% argon. Vätet joniseras lätt och bildar själva plasmavågen. Argonets inre elektroner sitter hårdare och slits loss först i pulsens allra intensivaste ögonblick — alltså mitt inne i vågen, precis där de behöver hamna för att fångas in. Tätheten mättes med interferometri vid varje skott, och elektronernas energi lästes av med en spektrometermagnet som böjer av dem olika mycket beroende på hur snabba de är." },
      { type: "p", html: "Vid tätheten $n_\\mathrm{e} = (5{,}0 \\pm 0{,}5) \\cdot 10^{18}\\ \\mathrm{cm^{-3}}$ nådde elektronerna $396 \\pm 14\\ \\mathrm{MeV}$ — mer än dubbelt så mycket som de $185\\ \\mathrm{MeV}$ som otakten annars sätter stopp vid. Effekten fanns bara i ett smalt intervall, mellan 4,5 och 5,4&nbsp;·&nbsp;10<sup>18</sup>&nbsp;elektroner per kubikcentimeter." },
      { type: "p", html: "Det smala fönstret är i sig ett kvitto på förklaringen. Ljuset på väg till de olika fokuspunkterna passerar ju genom plasmat, så tätheten påverkar ändå fokuspunktens fart en aning. Bara vid en viss täthet blir farten exakt ljushastigheten. Var plasmat glesare försvann laddningen — bubblans bakkant hann i kapp elektronerna och kastade ut dem åt sidorna. Var det tätare kom elektronerna i otakt ändå, om än senare än vanligt." },
      { type: "image", src: "nyheter/bilder/2026-08-09-flygande-fokus-3.jpg", alt: "Sex vågräta mätremsor under varandra, en för varje plasmatäthet, med elektronernas energi på den vågräta axeln. I de tre mellersta remsorna syns en tydlig, samlad fläck långt till höger om den streckade linje som markerar den klassiska gränsen. I den översta och de två understa remsorna är signalen utsmetad och slutar tidigare.", caption: "Mätningen, remsa för remsa. Varje rad är ett skott vid en viss plasmatäthet, och den streckade linjen markerar den klassiska gränsen. I de tre mellersta tätheterna sitter en samlad fläck mer än dubbelt så långt till höger — där har elektronerna fortsatt att accelerera långt efter att de borde ha stannat av.", credit: "Figur: C. D. Arrowsmith m.fl., Nature Physics (2026), CC BY-NC-ND 4.0" },
      { type: "p", html: "Forskarna är öppna med att strålen ännu inte är någon skönhet. Topparna mellan 300 och 400&nbsp;MeV innehåller omkring sex miljoner elektroner, en laddning på 0,9&nbsp;pikocoulomb, och energispridningen är bred. Höjde de pulsenergin från 4,0 till 4,8&nbsp;joule försvann fördubblingen: pulsen började dra ihop sig själv i plasmat och förstörde bubblan. Och räknar man på fältstyrkan borde 7&nbsp;millimeter ha gett en hel gigaelektronvolt — simuleringarna visar att knippet stannar av i perioder på vägen, eftersom vågens fart ännu inte är perfekt anpassad." },

      { type: "h2", text: "Hundra gigaelektronvolt på en halvmeter" },
      { type: "p", html: "Det är skalningen framåt som gör resultatet intressant. Enligt lagets beräkningar skulle samma princip kunna ge 100&nbsp;GeV på under en meter plasma — mot omkring 13&nbsp;meter för traditionell kölvattenacceleration, en tjugofaldig förkortning. 100&nbsp;GeV är samma energi som elektronerna hade i LEP, acceleratorn som fram till år 2000 gick i den 27&nbsp;kilometer långa ringen vid CERN där LHC ligger i dag." },
      { type: "quote", html: "”Som experimentell forskare stöter man ibland på saker som inte blir som man tänkt sig. Men det här var ett av de där härliga tillfällena när mätdatan började komma in precis som förutsagt.”", cite: "Charlie Arrowsmith, förstaförfattare, till Phys.org" },
      { type: "p", html: "Nästa steg är en andra specialslipad spegel, en så kallad echelon, som ska styra ljusets ankomsttider längs fokuslinjen ännu noggrannare. Då kan vågens fart matchas mot elektronerna i detalj, så att knippet kan placeras i den starkaste delen av fältet i stället för att glida omkring. Anläggningen som ska pröva det, NSF-OPAL, byggs vid samma laboratorium och ska ge två laserstrålar på 25&nbsp;petawatt vardera." },
      { type: "p", html: "Om det håller hela vägen skulle en accelerator som i dag kräver en tunnel få plats i ett laboratorium — och användas till annat än partikelkrockar: kompakta källor för positroner, myoner och gammastrålning, och experiment där man låter en elektronstråle möta en annan laserpuls för att pröva om kvantelektrodynamiken håller även i de allra starkaste fält vi kan tillverka." },

      { type: "fact", title: "Visste du?", items: [
        "Idén är från 1979. Toshiki Tajima och John Dawson skissade då i en kort artikel hur en laserpuls kan väcka en plasmavåg som elektroner surfar på. Det dröjde till 2004 innan tre lag oberoende av varandra kunde visa strålar där elektronerna faktiskt höll ihop i en smal energitopp i stället för att spridas över alla energier.",
        "En elektronvolt är den energi en elektron får när den passerar en volts spänning. De 396&nbsp;megaelektronvolterna motsvarar alltså en färd genom 396 miljoner volt — hopvikt till sju millimeter.",
        "Ljus i ett plasma är en dubbelnatur: pulsen som helhet kryper fram långsammare än ljushastigheten, medan vågtopparna inuti den glider framåt fortare än ljuset. Det senare är tillåtet eftersom en enskild vågtopp inte bär med sig vare sig energi eller information."
      ] }
    ]
  },
  {
    id: "2026-08-08-svavande-magnet",
    date: "2026-08-08",
    title: "En magnet mindre än ett knappnålshuvud svävar fritt i vakuum — och känner av fält en och en halv miljard gånger svagare än jordens",
    deck: "De känsligaste magnetfältsmätarna kräver flytande helium eller ett magnetiskt avskärmat rum. Ett lag från Peking och Mainz har i stället låtit en pytteliten permanentmagnet hänga fritt i luften och läst av hur den vrider sig — med en laserstråle, vid rumstemperatur, mitt i jordens eget magnetfält.",
    category: "Magnetism",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-08-svavande-magnet.jpg",
    imageAlt: "En levande groda svävar fritt i luften inne i det lodräta röret hos en kraftig elektromagnet. Grodan hänger med utsträckta ben mitt i den ljusa, cirkelrunda öppningen, utan att vidröra någonting.",
    imageCredit: "Foto: Lijnis Nelemans/High Field Magnet Laboratory, Radboud University (CC BY-SA 3.0)",
    tags: ["magnetism", "magnetfält", "magnetometer", "diamagnetism", "sensor", "laser", "kraftmoment", "resonans", "supraledare", "mätteknik", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-08-tiny-magnet-ultrafaint-magnetic-fields.html" },
      { name: "Science (tidskriftsartikeln)", url: "https://www.science.org/doi/10.1126/science.adx1707" },
      { name: "arXiv (fritt tillgänglig version av studien)", url: "https://arxiv.org/abs/2504.21524" }
    ],
    research: {
      citation: "Wei Ji, Changhao Xu, Guofeng Qu och Dmitry Budker, ”Levitated sensor for magnetometry in ambient environment”, Science 393, 607–610 (6 augusti 2026)",
      url: "https://doi.org/10.1126/science.adx1707"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 3.1 Magnetism och magnetfält", href: "katalog.html#fy2-3.1" },
        { label: "Fysik nivå 2 · 1.1 Kraftmoment", href: "katalog.html#fy2-1.1" },
        { label: "Fysik nivå 2 · 2.6 Resonans", href: "katalog.html#fy2-2.6" }
      ],
      fragor: [
        "Sensorn är som känsligast i ett smalt frekvensband kring 305 hertz och betydligt trubbigare utanför det. Varför kan en mätare bli bättre av att vara kräsen med vilka signaler den svarar på — och vilka mätuppgifter blir den då oanvändbar för?",
        "Grafitplattan behövs för att magneten ska sväva stabilt, men det var samtidigt grafiten som gav det största bruset. Hur går man till väga när den komponent man inte kan ta bort är den som stör mest? Jämför med hur laget faktiskt löste det.",
        "En kompassnål vrider sig mot norr, och samma kraftmoment är det som får sensormagneten att röra sig. Varför blir en fritt svävande magnet så mycket känsligare än en kompassnål på en spets — trots att fysiken bakom vridningen är densamma?"
      ]
    },
    body: [
      { type: "p", html: "I en vakuumkammare hänger en liten skiva av magnetiskt material fritt i luften. Den är 0,82&nbsp;millimeter i diameter och 0,38&nbsp;millimeter tjock — mindre än ett knappnålshuvud. Ingenting rör vid den: ingen tråd, ingen fjäder, ingen spets att balansera på. En laserstråle träffar skivans blanka ovansida och studsar vidare mot en detektor några meter bort." },
      { type: "p", html: "Skivan är en magnetometer, alltså en mätare av magnetfält, och enligt en studie i tidskriften <em>Science</em> hör den till de känsligaste som byggts. Den reagerar på fältändringar ner mot 32&nbsp;femtotesla, $3{,}2 \\cdot 10^{-14}\\ \\mathrm{T}$. Jordens magnetfält är omkring $50\\ \\mathrm{\\mu T}$. Sensorn känner alltså av fält som är ungefär en och en halv miljard gånger svagare än det som får en kompassnål att peka norrut." },
      { type: "p", html: "Fackuttrycket för känsligheten är $32\\ \\mathrm{fT}/\\sqrt{\\mathrm{Hz}}$ — ”32&nbsp;femtotesla per kvadratrot-hertz”. Det är ett mått på hur mycket brus mätaren själv bidrar med: mäter man i en sekund syns signaler ner till omkring 32&nbsp;femtotesla, och mäter man i hundra sekunder sjunker gränsen till en tiondel av det. Slumpmässigt brus medelvärdesbildas nämligen bort med tiden, medan en verklig signal ligger kvar." },

      { type: "h2", text: "Varför en magnet inte kan sväva av sig själv" },
      { type: "p", html: "Att få en magnet att stå stilla i luften är svårare än det låter. Samuel Earnshaw bevisade redan 1842 att ett system av laddningar inte kan hållas i stabil jämvikt av enbart sina egna krafter, och samma slutsats gäller magnetiska dipoler i ett fast magnetfält. Man kan visserligen balansera tyngdkraften med en magnet ovanför — men jämvikten blir som en kula på toppen av en kulle: minsta lilla knuff åt sidan, och magneten far i väg." },
      { type: "p", html: "Undantaget heter diamagnetism. Allt material påverkas svagt av ett magnetfält, och i ett diamagnetiskt ämne induceras ett magnetiskt moment riktat <em>mot</em> fältet, så att ämnet stöts bort i stället för att dras in. Oftast är effekten försvinnande liten. Men i pyrolytisk grafit, där kolatomerna ligger ordnade i plana skikt, är den stark nog att synas med blotta ögat." },
      { type: "p", html: "Forskarna utnyttjade båda sakerna på en gång. En kraftig lyftmagnet ovanför bär sensorskivans tyngd, och en platta av pyrolytisk grafit strax under stöter bort den så fort den försöker driva åt sidan. Tillsammans blir det en verklig, stabil jämvikt — magneten hänger fritt utan att röra vid någonting." },
      { type: "image", src: "nyheter/bilder/2026-08-08-svavande-magnet-2.jpg", alt: "Två foton av samma försök. Uppifrån syns en mörk fyrkantig grafitflisa som svävar över fyra guldfärgade kubformade magneter på en stålplatta. Från sidan syns tydligt en luftspalt mellan flisan och magneterna.", caption: "Diamagnetisk frånstötning i klassrumsformat: en flisa pyrolytisk grafit svävar över fyra neodymmagneter, utan något som håller uppe den. Det är samma frånstötning som stabiliserar den svävande sensormagneten — fast där sitter grafiten under och magneten ovanpå.", credit: "Foto: Splarka / Wikimedia Commons (public domain)" },

      { type: "h2", text: "Från svävning till mätning" },
      { type: "p", html: "En magnet i ett magnetfält känner av ett kraftmoment. Pekar fältet inte åt samma håll som magnetens eget magnetiska moment $m$ vrids den mot fältet med momentet $M = m \\cdot B \\cdot \\sin \\alpha$ — samma vridning som riktar in en kompassnål mot norr." },
      { type: "p", html: "I den svävande skivan sitter magnetiseringen låst i kristallgittret. Elektronernas spinn kan inte vrida sig undan på egen hand utan att dra med sig hela skivan, och därför översätts varje liten ändring i det yttre fältet till en vridning av hela magneten. Vridningen läses av optiskt: laserstrålen studsar mot skivan och träffar en fyrdelad fotodiod först efter 3,4&nbsp;meter. Ju längre den optiska armen är, desto större blir utslaget på detektorn för en och samma lilla vinkeländring — samma trick som när man riktar en ficklampa mot en avlägsen vägg och ser strålen svepa långa sträckor vid minsta ryck i handen." },
      { type: "image", src: "nyheter/bilder/2026-08-08-svavande-magnet-3.jpg", alt: "Schematisk ritning av försöksuppställningen: en laser skickar en stråle genom linser och speglar in i en vakuumkammare, där den studsar mot en liten sensormagnet som svävar mellan en lyftmagnet ovanför och en grafitplatta under, och vidare ut till en fyrdelad fotodiod. Ett inzoomat foto i nedre vänstra hörnet visar den verkliga magneten ovanför grafiten, med en skalstock på 500 mikrometer.", caption: "Uppställningen i genomskärning. Laserstrålen leds in i vakuumkammaren, studsar mot sensormagneten som svävar mellan lyftmagneten ovanför och grafitplattan under, och fortsätter ut till den fyrdelade fotodioden. Infällt nere till vänster: ett foto av den verkliga sensormagneten ovanför grafiten, med en skalstock på 500&nbsp;mikrometer.", credit: "Figur: Wei Ji m.fl., arXiv:2504.21524 (CC BY 4.0)" },
      { type: "p", html: "Att magneten svävar är avgörande för känsligheten. Utan upphängning finns nästan ingenting som dämpar vridningen, och skivan blir en utomordentligt god svängare: resonansfrekvensen ligger kring 305&nbsp;hertz och Q-värdet på ungefär 12&nbsp;000, vilket betyder att resonanstoppen bara är 0,025&nbsp;hertz bred. Ett magnetfält som pulserar i precis den takten bygger därför upp svängningen gång på gång, tills även ett obetydligt kraftmoment ger ett läsbart utslag. Resonansfrekvensen går dessutom att flytta mellan 260 och 318&nbsp;hertz genom att ändra ett statiskt fält, så att mätaren kan ställas in på den takt signalen har." },

      { type: "h2", text: "Bruset som satt gränsen" },
      { type: "p", html: "Grafitplattan som håller svävningen stabil visade sig samtidigt vara sensorns värsta fiende. Grafit leder ström, och i varje ledare rör sig elektronerna slumpmässigt av ren värmerörelse. Rörelserna bildar små virvelströmmar, och varje sådan ström har sitt eget magnetfält. Sorlet av dem — magnetiskt Johnsonbrus — låg på 110&nbsp;femtotesla per kvadratrot-hertz och dränkte allt som var svagare." },
      { type: "p", html: "Lösningen var enkel i princip och knepig i praktiken: grafiten maldes till pulver och bakades ihop med epoxi till en ny platta. Kornen ligger då elektriskt isolerade från varandra, så att virvelströmmarna stängs in i varje enskilt korn i stället för att löpa runt i stora slingor. Bruset sjönk till 30&nbsp;femtotesla per kvadratrot-hertz, en minskning med drygt 70&nbsp;%, utan att den diamagnetiska frånstötningen gick förlorad. Kvar blev bara mindre bidrag: krockar med de luftmolekyler som ändå finns i kammaren, vid ett tryck på 0,025&nbsp;millibar — ungefär en fyrtiotusendel av lufttrycket vid marken — och vibrationer från omgivningen." },

      { type: "h2", text: "Rumstemperatur är hela poängen" },
      { type: "p", html: "Känslighet i den här klassen är inte ny i sig. SQUID-magnetometrar, som bygger på supraledande ringar, når omkring 20&nbsp;femtotesla per kvadratrot-hertz — men de måste kylas med flytande helium till några grader över absoluta nollpunkten. Atomära magnetometrar av så kallad SERF-typ är minst lika känsliga, men kräver i stället uppvärmd alkalimetallånga och fungerar bara i fält nära noll, alltså inne i ett magnetiskt avskärmat rum. Båda är dyra, skrymmande och svårflyttade." },
      { type: "p", html: "Den svävande magneten behöver ingetdera. Den arbetar vid rumstemperatur och mitt i jordens magnetfält, vilket är den egentliga nyheten: samma prestanda, utan kryoteknik och utan avskärmat rum." },
      { type: "quote", html: "”Vi uppnådde en känslighet på 32&nbsp;femtotesla per kvadratrot-hertz, vilket räcker för en lång rad tillämpningar inom biologi, kemi och grundläggande fysik. Den matchar prestandan hos supraledande kvantinterferensinstrument och atomära magnetometrar, men har fördelen att fungera vid rumstemperatur och i jordens magnetfält.”", cite: "Ur sammanfattningen av studien i Science" },
      { type: "p", html: "Det finns en hake, och forskarna är öppna med den. Den höga känsligheten gäller i ett smalt band kring resonansen. Utanför det är sensorn betydligt trubbigare — omkring 200&nbsp;pikotesla per kvadratrot-hertz mellan 80 och 200&nbsp;hertz, och kring en nanotesla under 15&nbsp;hertz. Mätaren passar alltså bäst för signaler som svänger i en känd takt, och sämre för att följa ett långsamt driftande fält." },
      { type: "p", html: "Vad ska man då ha den till? Både hjärtat och hjärnan alstrar magnetfält när nerv- och muskelceller leder ström. Hjärnans signaler ligger typiskt mellan 50 och 500&nbsp;femtotesla, hjärtats i storleksordningen hundra gånger starkare — och i dag krävs kylda sensorer i avskärmade rum för att fånga dem. Samma slags mätare används också i grundforskningen, där de får leta efter fält som enligt de kända naturlagarna inte borde finnas alls: svaga signaler från mörk materia, eller från hittills okända krafter mellan partiklars spinn." },

      { type: "fact", title: "Visste du?", items: [
        "Diamagnetism räcker för att få levande varelser att sväva. 1997 lät fysikern Andre Geim en groda flyta fritt i ett magnetfält på omkring 16&nbsp;tesla — vatten är svagt diamagnetiskt, och grodan består mest av vatten. Experimentet gav honom ett Ig Nobelpris år 2000, tio år innan han fick det riktiga Nobelpriset för upptäckten av grafen.",
        "En tesla är ett mycket starkt magnetfält. En kylskåpsmagnet ger några millitesla vid ytan, en magnetkamera på sjukhus 1,5–3&nbsp;tesla, och jordens fält bara omkring 50&nbsp;mikrotesla. En femtotesla är en miljondels miljarddels tesla.",
        "Kvadratroten i enheten är ingen krånglighet för sakens skull. Slumpmässigt brus växer med kvadratroten ur mätbandbredden, vilket är samma sak som att bruset minskar med kvadratroten ur mättiden: fyra gånger längre mätning ger dubbelt så bra känslighet."
      ] }
    ]
  },
  {
    id: "2026-08-07-virvlar-pa-solens-yta",
    date: "2026-08-07",
    title: "Solens yta visar sig vara täckt av små virvlar — och de kan förklara varför atmosfären ovanför är miljoner grader het",
    deck: "Världens största solteleskop har avbildat solytan med 19 kilometers upplösning. Överallt där magnetfältet möter den kokande gasen kröker sig kanterna till fjäderlika fransar med små virvlar i. Instabiliteten räknades ut på papper redan på 1800-talet, men har aldrig setts på en stjärna förrän nu.",
    category: "Astrofysik",
    readingTime: "7 min",
    image: "nyheter/bilder/2026-08-07-virvlar-pa-solens-yta.jpg",
    imageAlt: "Närbild av solens yta i orange och gult. Ljusa, oregelbundet bubbelformade celler skiljs åt av mörkare fåror, och längs cellernas kanter sitter täta rader av fjäderlika fransar som böjer sig åt sidan som vindpinade grässtrån.",
    imageCredit: "Bild: NSF/NSO/AURA/MPS",
    tags: ["astrofysik", "astronomi", "solen", "plasma", "magnetfält", "kelvin-helmholtz", "turbulens", "solteleskop", "korona", "rymdväder", "diffraktion", "fysik 1", "fysik 2"],
    sources: [
      { name: "National Solar Observatory (pressmeddelande)", url: "https://nso.edu/press-release/nsf-inouye-solar-telescope-enables-major-discovery-of-a-hidden-solar-process/" },
      { name: "Max-Planck-Gesellschaft", url: "https://www.mpg.de/26900660/tiny-vortices-discovered-on-the-sun-s-surface" },
      { name: "Phys.org", url: "https://phys.org/news/2026-08-tiny-vortices-sun-surface.html" },
      { name: "EurekAlert! (AAAS)", url: "https://www.eurekalert.org/news-releases/1138745" },
      { name: "ABC News / AP", url: "https://abcnews.com/Technology/wireStory/new-images-sun-show-surface-finest-detail-135390713" }
    ],
    research: {
      citation: "David Kuridze, Friedrich Wöger m.fl., ”Ubiquitous Kelvin–Helmholtz instabilities driving plasma mixing on the Sun”, Nature (5 augusti 2026)",
      url: "https://doi.org/10.1038/s41586-026-10871-3"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 6.1 Värme och temperatur", href: "katalog.html#fy1-6.1" },
        { label: "Fysik nivå 2 · 3.1 Magnetism och magnetfält", href: "katalog.html#fy2-3.1" },
        { label: "Fysik nivå 2 · 2.14 Diffraktion och interferens", href: "katalog.html#fy2-2.14" }
      ],
      fragor: [
        "Instabiliteten var uträknad på papper i över hundrafemtio år innan någon såg den på en stjärna. Vad tillför en observation när teorin redan har förutsagt fenomenet — och vad hade det betytt om bilderna hade visat något annat?",
        "Solens yta håller omkring 5 500 °C, medan atmosfären ovanför är över en miljon grader. Varför är det inte ett brott mot termodynamikens andra huvudsats att det blir hetare längre bort från värmekällan? Vilken sorts energitransport måste man i så fall tänka sig?",
        "Gränsen 19 kilometer sitter i ljusets vågnatur, inte i kamerans kvalitet. Vad går då att förbättra med bättre elektronik, och vad går inte? Vilka vägar återstår för den som vill se ännu mindre detaljer på solen?"
      ]
    },
    body: [
      { type: "p", html: "På toppen av vulkanen Haleakalā på Hawaii står ett teleskop med en fyra meter bred spegel riktad rakt mot solen. Med det har ett internationellt forskarlag tagit den skarpaste bild av solens yta som någonsin gjorts. De minsta detaljer som går att skilja ut i den är omkring 19&nbsp;kilometer stora — på ett föremål som befinner sig 150&nbsp;miljoner kilometer bort." },
      { type: "p", html: "Bilden visar ett landskap som ingen har sett förut. Överallt där solens magnetfält tränger upp genom ytan är kanterna fransiga och krusiga som fjäderkanter, och i fransarna sitter små virvlar. I tidskriften <em>Nature</em> skriver laget att virvlarna är Kelvin–Helmholtz-instabiliteter, och att de kan vara en pusselbit i en av solfysikens envisaste gåtor." },

      { type: "h2", text: "Ytan kokar" },
      { type: "p", html: "Det vi kallar solens yta är fotosfären, det tunna skikt där gasen äntligen blir genomskinlig nog att släppa ut sitt ljus. Något fast underlag finns inte: fotosfären är ett plasma på omkring 5&nbsp;500&nbsp;°C, alltså en gas så het att elektronerna har slitits loss från atomkärnorna." },
      { type: "p", html: "Skiktet kokar, ungefär som gröt i en kastrull. Het gas stiger upp från djupet, breder ut sig på ytan, strålar bort sin energi i rymden, svalnar och sjunker ner igen. Uppåtströmmarna syns som ljusa celler, granuler, på mellan 500 och 2&nbsp;000&nbsp;kilometer i diameter — en enda sådan bubbla kan alltså vara längre än Sverige. Nedåtströmmarna bildar de mörkare, svalare fårorna mellan dem." },

      { type: "h2", text: "Vind som reser vågor" },
      { type: "p", html: "När två skikt av en gas eller vätska glider förbi varandra med olika fart är gränsytan mellan dem instabil. Uppstår den minsta krusning måste strömmen som passerar över krusningens topp ta en längre väg och går därför fortare. Där farten är högre är trycket lägre, så toppen sugs uppåt ytterligare — krusningen blir en våg, vågen växer och rullar till slut ihop sig i en virvel." },
      { type: "p", html: "Det är samma mekanism som gör att vind reser vågor på en sjö, att flaggor fladdrar i stället för att hänga rakt ut i vinden, och som ibland ritar en rad av likadana krökta vågmoln över himlen. Fenomenet är uppkallat efter William Thomson, senare lord Kelvin, och Hermann von Helmholtz, som beskrev det matematiskt 1868 respektive 1871." },
      { type: "quote", html: "”Gränsytan kan bli instabil och utveckla vågliknande virvlar som växer tills de bryts sönder — inte helt olikt vågorna ute på en sjö eller på havet en blåsig dag.”", cite: "Friedrich Wöger, National Solar Observatory" },

      { type: "h2", text: "Magnetfältet ritar gränsen" },
      { type: "p", html: "Ett plasma leder elektrisk ström utmärkt, och därför följs plasma och magnetfält åt: gasen släpar med sig fältlinjerna, och fältlinjerna håller emot gasen. I de mörka fårorna mellan granulerna trängs solens magnetfält ihop till smala knippen där det är många gånger starkare än i omgivningen. Just där, längs knippenas kanter, möts gas som rör sig olika fort — precis det förhållande instabiliteten kräver." },
      { type: "p", html: "På bilderna avslöjar den sig på två sätt. Magnetknippenas kanter är deformerade och vågiga i stället för släta, och tvärs över dem löper ultrafina mörka streck på några tiotals kilometers skala. Virvlarna själva mäter från 19&nbsp;kilometer, teleskopets undre gräns, upp till omkring 170&nbsp;kilometer." },
      { type: "image", src: "nyheter/bilder/2026-08-07-virvlar-pa-solens-yta-2.jpg", alt: "Samma orangefärgade solyta, med en inringad detalj förstorad i en cirkel uppe till höger. I förstoringen syns hur den ljusa kanten mellan två celler böjer sig i en rad krökta flikar. En skalstock i cirkeln motsvarar 100 kilometer.", caption: "Utsnitt ur den nya bilden. I förstoringen syns hur gränsen mellan två granuler krökt sig till en rad virvlar — skalstocken motsvarar 100&nbsp;kilometer, ungefär en timmes bilfärd på motorväg.", credit: "Bild: NSF/NSO/AURA/MPS" },
      { type: "p", html: "För att vara säkra på tolkningen jämförde laget bilderna med datorsimuleringar av magnetiserat plasma i solens atmosfär, gjorda med programmet MURaM. Simuleringarna gav samma mönster, och därmed kunde forskarna för första gången slå fast att det verkligen är Kelvin–Helmholtz-instabiliteter man ser på en stjärnyta." },
      { type: "quote", html: "”De nyupptäckta plasmavirvlarna visar på ett slående sätt hur ytterst små processer — vid gränsen för vad vi över huvud taget kan urskilja med tillgänglig teknik — i hög grad avgör vår stjärnas beskaffenhet.”", cite: "Sami K. Solanki, chef för Max Planck-institutet för solsystemforskning" },

      { type: "h2", text: "Gåtan om den heta koronan" },
      { type: "p", html: "Solens yta håller alltså omkring 5&nbsp;500&nbsp;°C. Men solens yttersta atmosfär, koronan, är över en miljon grader — den pärlemorskimrande krans som blir synlig runt den svarta månskivan vid en total solförmörkelse. Att det blir hetare ju längre bort man kommer från värmekällan låter som en omöjlighet, och vore det också om värmen leddes uppåt på vanligt vis. Energin måste i stället bäras dit på något annat sätt, och misstankarna har länge riktats mot magnetfältet." },
      { type: "p", html: "Problemet är att energin ska bli värme till slut, och stora, långsamma rörelser värmer ingenting. Den måste först styckas ner i allt mindre virvlar tills skalan är så liten att gasens inre friktion kan omvandla rörelsen till värme. Just den nedbrytningen är instabiliteten skicklig på." },
      { type: "quote", html: "”Kelvin–Helmholtz-instabiliteten är ett riktigt effektivt sätt för solen att bryta ner stora plasmaströmmar till mindre rörelser. Finns den i systemet blir det mycket lättare att sätta i gång en energikaskad ner mot mikroskopiska skalor — och väl där kan energin enkelt frigöras som värme.”", cite: "David Kuridze, National Solar Observatory" },
      { type: "p", html: "Samma magnetiska energi driver solens utbrott. När uppdämda fältstrukturer plötsligt gör om sig kastas strålning och laddade partiklar ut i rymden, och träffar de jorden kan de störa satelliter, radiotrafik och elnät. Hur utbrotten utlöses kallar Kuridze en av de stora frontlinjerna i modern solfysik." },

      { type: "h2", text: "Nitton kilometer är fysikens gräns, inte teknikens" },
      { type: "p", html: "Att skärpan stannar just vid 19&nbsp;kilometer beror inte på att kameran är för dålig. Det är ljusets vågnatur som sätter stoppet: ljus som passerar en öppning böjs, och två punkter som ligger för nära varandra smetas ihop till en enda fläck. Den minsta vinkel två punkter kan ha mellan sig och ändå synas åtskilda ges av" },
      { type: "p", html: "$$\\alpha \\approx 1{,}22 \\cdot \\dfrac{\\lambda}{D}$$" },
      { type: "p", html: "där $\\lambda$ är ljusets våglängd och $D$ spegelns diameter. Bilderna togs i violett ljus, $\\lambda = 416\\ \\mathrm{nm}$, med en spegel på $D = 4{,}0\\ \\mathrm{m}$, vilket ger $\\alpha \\approx 1{,}3 \\cdot 10^{-7}$ radianer. Multiplicerat med avståndet till solen, $1{,}5 \\cdot 10^{11}\\ \\mathrm{m}$, blir det knappt 19&nbsp;kilometer. Teleskopet arbetar alltså på sin teoretiska gräns, och den enda vägen till ännu finare detaljer går genom en ännu större spegel." },
      { type: "p", html: "Att virvlarna skulle finnas var väntat. Att de skulle finnas överallt var det inte — och just det, säger Kuridze, var vad laget minst av allt hade räknat med. Utomstående kollegor har fastnat mer för hur bilderna ser ut: solfysikern Ruizhu Chen vid Stanforduniversitetet, som inte deltog i arbetet, tycker att de fransiga virvlarna påminner om de virvlande himlarna i van Goghs <em>Stjärnenatt</em>." },

      { type: "fact", title: "Visste du?", items: [
        "Koronan går inte att se för blotta ögat annat än vid en total solförmörkelse. Nästa inträffar den 12&nbsp;augusti&nbsp;2026 och drar fram över östra Grönland, västra Island och norra Spanien, med som mest 2&nbsp;minuter och 18&nbsp;sekunder i totalt mörker.",
        "Kelvin–Helmholtz-instabiliteten är långt ifrån bara ett solfenomen. Den formar vågmolnen i jordens atmosfär, virvlarna längs Jupiters och Saturnus molnband, och krusningarna där solvinden stryker längs jordens magnetfält.",
        "Fotosfären är bara några hundra kilometer tjock, på en gasboll med 1,4&nbsp;miljoner kilometers diameter. Det är därför solen har en så knivskarp kant på himlen trots att den inte har någon yta i vanlig mening."
      ] }
    ]
  },
  {
    id: "2026-08-06-kvantlabb-i-fritt-fall",
    date: "2026-08-06",
    title: "Kvantlabbet som får plats i en raket släpper två sorters atomer samtidigt — och stoppar knuffen som ser ut som ett brott mot naturlagen",
    deck: "Rubidium och kalium, nedkylda till några hundra miljarddels grader över absoluta nollpunkten, ska falla exakt lika fort. Problemet var att magnetfällan gav dem varsin liten skjuts på vägen ut. Lösningen blev att stänga av strömmarna i fel ordning — med åttio miljondels sekunders mellanrum.",
    category: "Kvantfysik",
    readingTime: "8 min",
    image: "nyheter/bilder/2026-08-06-kvantlabb-i-fritt-fall.jpg",
    imageAlt: "En sondraket lyfter i vinterskymning från Esrange utanför Kiruna. Raketen har just lämnat rampen och stiger ur en bred eldkvast som lyser upp snötyngda granar och en radiomast intill startplatsen, med skogsklädda fjällsidor i disigt blågrått bakgrundsljus.",
    imageCredit: "Foto: Swedish Space Corporation (pressbild)",
    tags: ["kvantfysik", "bose-einstein-kondensat", "ultrakalla atomer", "fritt fall", "ekvivalensprincipen", "tyngdlöshet", "laserkylning", "magnetfält", "rymdfysik", "fysik 1", "fysik 2"],
    sources: [
      { name: "Johannes Gutenberg-universitetet Mainz (pressmeddelande)", url: "https://press.uni-mainz.de/high-precision-laser-system-enables-record-flux-of-quantum-gas-mixtures/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-08-miniaturized-laser-technology-paves-fundamental.html" },
      { name: "Scientific Frontline", url: "https://www.sflorg.com/2026/08/qs08052601.html" },
      { name: "Einstein-Elevator, Leibniz-universitetet Hannover (HITec)", url: "https://www.hitec.uni-hannover.de/en/large-scale-equipment/einstein-elevator" },
      { name: "Swedish Space Corporation om raketstarten från Esrange", url: "https://sscspace.com/universes-coldest-particles-from-esrange-rocket-maius/" }
    ],
    research: {
      citation: "Baptist Piest m.fl., ”Apparatus for quantum-mixture research in microgravity”, Nature Communications (28 juli 2026)",
      url: "https://doi.org/10.1038/s41467-026-75968-9"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 2.4 Acceleration och fritt fall", href: "katalog.html#fy1-2.4" },
        { label: "Fysik nivå 1 · 3.2 Newtons andra lag", href: "katalog.html#fy1-3.2" },
        { label: "Fysik nivå 2 · 4.6 Våg-partikeldualitet och de Broglies hypotes", href: "katalog.html#fy2-4.6" }
      ],
      fragor: [
        "Att alla föremål faller lika fort har testats i fyrahundra år, och varje gång har det stämt. Ändå bygger forskare allt dyrare apparater för att mäta samma sak en gång till. Vad är det egentligen man hoppas hitta — och vad skulle det betyda om en mätning en dag inte stämde?",
        "Störningen i experimentet ser exakt likadan ut som det man letar efter: två atomsorter som får olika hastighet. Hur kan man då veta vilket som är vilket? Vad är det i forskarnas metod som skiljer den kända störningen från en okänd effekt?",
        "Ett falltorn ger fyra sekunder tyngdlöshet, en sondraket nästan sex minuter och rymdstationen i princip hur länge som helst — men i den ordningen växer också kostnaden och risken enormt. Vilka frågor är värda ett raketskott, och vilka går att svara på i ett torn?"
      ]
    },
    body: [
      { type: "p", html: "Ett fyrtio meter högt betongtorn på Leibniz-universitetets område i Hannover ser inte mycket ut för världen. Inuti skjuts en gondol uppåt av linjärmotorer av samma slag som driver berg-och-dalbanor, släpps fri och faller. Under fyra sekunder är allt ombord tyngdlöst, med en kvarvarande acceleration mindre än en miljondel av tyngdaccelerationen. Sedan fångas gondolen upp, sänks ner och gör om det — upp till 300 gånger på ett dygn." },
      { type: "p", html: "I gondolen låg vid ett av de falltillfällena ett komplett kvantlaboratorium, byggt för att sitta i en sondraket. Mitt i apparaten, inne i en vakuumkammare, svävade två moln av atomer: ungefär 20&nbsp;000 rubidiumatomer och lika många kaliumatomer, nedkylda till några hundra miljarddels grader över den absoluta nollpunkten." },
      { type: "p", html: "Ett internationellt forskarlag lett från Leibniz-universitetet i Hannover rapporterar i tidskriften <em>Nature Communications</em> att apparaten tillverkar sådana blandningar snabbare än någon jämförbar utrustning tidigare. Minst lika viktigt är det andra resultatet: laget har fått bukt med en systematisk störning som annars hotar att förstöra hela poängen med experimentet." },

      { type: "h2", text: "Materia som blir en enda våg" },
      { type: "p", html: "Ett Bose–Einstein-kondensat är den kallaste form av materia som går att tillverka. Kyler man en gas av rätt sorts atomer tillräckligt hårt slutar de bete sig som enskilda partiklar. I stället faller de alla ner i samma, lägsta kvanttillstånd och beskrivs av en enda gemensam våg — tiotusentals atomer som svänger i takt, ungefär som ljuspartiklarna i en laserstråle." },
      { type: "p", html: "Tillståndet förutsades av Satyendra Nath Bose och Albert Einstein redan 1924–1925, men det dröjde till 1995 innan någon lyckades framställa det i ett laboratorium — en bedrift som belönades med Nobelpriset i fysik 2001. Det som gör kondensat användbara utanför den rena grundforskningen är att de är materievågor: de kan delas i två delar, skickas olika vägar och sedan läggas ihop igen, precis som ljus i en interferometer. Och en materievåg känner av tyngdkraften." },

      { type: "h2", text: "Sju lasrar, ett atomchip och 2,3 sekunder" },
      { type: "p", html: "Apparaten heter MAIUS-B och är i praktiken ett fysiklaboratorium hoppressat till en raketkropp. Atomerna kommer från två små ugnar och fångas först i en tvådimensionell magnetooptisk fälla, som skickar vidare en kall stråle av rubidium- och kaliumatomer till en andra kammare. Där hålls de av fyra laserstrålar, tre spolpar och ett så kallat atomchip — en trelagerskrets med guldledare, ungefär tre gånger tre centimeter stor, vars magnetfält formar själva fällan." },
      { type: "image", src: "nyheter/bilder/2026-08-06-kvantlabb-i-fritt-fall-2.jpg", alt: "Överst en genomskärning av en röd raketkropp där hela nyttolasten syns inifrån: sektioner med batterier, laserelektronik, lasersystem, en inramad fysikmodul, strömdrivare och en ombordsdator. Nederst en detaljerad ritning av fysikmodulen med magnetskärm, ugnar, källkammare, vetenskapskammare, atomchip och pumpsystem, samt tre små skisser som visar hur modulen kan vridas i förhållande till tyngdkraftens riktning.", caption: "Hela laboratoriet, hoptryckt till en raketkropp. Överst nyttolasten i genomskärning — batterier, laserelektronik, lasersystem, fysikmodulen (streckad ram), strömdrivare och ombordsdator. Nederst fysikmodulen i detalj, och längst till höger de tre lutningar modulen kunde vridas till i förhållande till tyngdkraften.", credit: "Figur: B. Piest m.fl., Nature Communications (2026), CC BY 4.0" },
      { type: "p", html: "Ljuset kommer från sju separata diodlasrar, inställda på 767,7&nbsp;nm för kalium-41 och 780,2&nbsp;nm för rubidium-87, och leds fram i optiska fibrer. Optikbänkarna, byggda vid Johannes Gutenberg-universitetet i Mainz tillsammans med Humboldt-universitetet i Berlin och Ferdinand-Braun-Institut, är tillverkade av glaskeramen Zerodur, ett material som knappt ändrar storlek när temperaturen växlar." },
      { type: "quote", html: "”Vår uppgift var att utveckla de optiska gränssnitten mellan lasermodulerna och vakuumsystemet — de som krävs för att kyla och styra atomerna.”", cite: "André Wenzlawski, Johannes Gutenberg-universitetet Mainz" },
      { type: "quote", html: "”Den stabiliteten är avgörande för att behålla den exakta kontrollen över atomerna även under de extrema mekaniska påfrestningarna vid en raketuppskjutning och vid växlande temperaturer.”", cite: "André Wenzlawski, Johannes Gutenberg-universitetet Mainz" },
      { type: "p", html: "Kylningen sker i steg. Laserljuset bromsar först atomerna ner till 43&nbsp;miljondels kelvin för 26&nbsp;miljoner kaliumatomer och 10&nbsp;miljondels kelvin för 940&nbsp;miljoner rubidiumatomer. Sedan tar magnetfällan över, och under 1,7&nbsp;sekunder kokas de hetaste rubidiumatomerna bort med mikrovågor — samma princip som när kaffet i muggen svalnar av att ångan lämnar den. Kaliumatomerna kyls inte alls direkt; de kolliderar bara med rubidiumet och följer med nedåt i temperatur. Metoden kallas sympatisk kylning." },
      { type: "p", html: "Resultatet är upp till 250&nbsp;000 atomer i ett rent rubidiumkondensat, eller ungefär 20&nbsp;000 atomer i vardera kondensatet när blandningen ställs in symmetriskt. Hela cykeln, från tom kammare till färdig blandning, tar 2,3&nbsp;sekunder. Det är det värdet som är nyheten: antalet atomer per beredningscykel — flödet — är omkring tio gånger högre än i andra kompakta och flyttbara uppställningar." },

      { type: "h2", text: "Därför två sorters atomer" },
      { type: "p", html: "Att alls bry sig om att göra två kondensat samtidigt har ett bestämt skäl. Ett föremåls tyngd är proportionell mot dess massa, $F_\\mathrm{G} = m \\cdot g$, medan accelerationen är kraften delad med massan, $a = \\dfrac{F}{m}$. Sätts det första in i det andra försvinner massan, och kvar blir bara $a = g$: allt faller lika fort, oavsett vad det väger och vad det är gjort av." },
      { type: "p", html: "Einstein gjorde den observationen till en av hörnstenarna i den allmänna relativitetsteorin. Ekvivalensprincipen säger att den massa som gör ett föremål trögt att sätta i rörelse och den massa som gör det tungt är exakt samma sak. Skulle de skilja sig åt, om än med en obetydlighet, faller inte alla ämnen lika fort — och stora delar av den moderna fysiken skulle behöva skrivas om." },
      { type: "p", html: "Testet består i att släppa två föremål av olika ämnen samtidigt och jämföra deras acceleration. Skillnaden brukar anges med Eötvösparametern, $\\eta = \\dfrac{2(a_1 - a_2)}{a_1 + a_2}$, som är noll om principen håller. Den skarpaste mätningen hittills gjordes av den franska satelliten MICROSCOPE, som 2022 kunde slå fast att $\\eta$ för titan och platina inte är större än ungefär 10<sup>−15</sup> — en miljondels miljarddel." },
      { type: "p", html: "Nästa generation vill göra samma jämförelse med atomer i stället för metallcylindrar, och läsa av resultatet med atominterferometri. Då blir provmassorna två olika grundämnen, och mätnoggrannheten växer snabbt med hur länge atomerna hinner falla fritt. På ett laboratoriebord räcker fallet någon tiondels sekund. I tyngdlöshet finns ingen sådan gräns — vilket är hela skälet till att apparaturen byggs för raketer och rymdstationer." },

      { type: "h2", text: "Knuffen som ser ut som ett brott mot naturlagen" },
      { type: "p", html: "Här dyker problemet upp. Atomerna hålls på plats av ett magnetfält, och för att släppa dem stängs strömmarna av. Men ingenting stängs av ögonblickligt. Ledarna på atomchipet tömmer sin ström på några tiotals miljondels sekunder, de yttre spolarna behöver nästan en tusendels sekund, och dessutom induceras virvelströmmar i kopparhållaren och titankammaren som drar ut förloppet ytterligare. Under den bråkdelen av en millisekund känner atomerna fortfarande av en magnetisk kraft på väg ut." },
      { type: "p", html: "Båda atomsorterna sitter i tillstånd med samma magnetiska moment, så kraften på dem är lika stor. Men rubidium-87 väger drygt dubbelt så mycket som kalium-41, och enligt $a = \\dfrac{F}{m}$ ger samma kraft då större acceleration åt den lättare atomen. Kaliumet får en hårdare knuff än rubidiumet, molnen lämnar fällan med olika hastighet — och det är exakt den signal ett brott mot ekvivalensprincipen skulle ge. Störningen är alltså förklädd till upptäckt." },
      { type: "p", html: "Lösningen laget hittade är enkel att beskriva och besvärlig att ställa in: stäng inte av allt samtidigt. Genom att lägga in en justerbar fördröjning mellan avstängningen av det snabba chipet och de tröga spolarna kan de två knuffarna fås att peka åt var sitt håll och ta ut varandra. Forskarna skannade fördröjningen och letade upp nollgenomgången, som ligger vid ungefär 80&nbsp;miljondels sekund." },
      { type: "p", html: "Vid den inställningen uppmättes i falltornet en kvarvarande hastighetsskillnad på 1,5&nbsp;±&nbsp;0,7&nbsp;mm/s, medan modellen förutsäger 0,3&nbsp;±&nbsp;0,7&nbsp;mm/s. I den betydligt svagare fälla som ett skarpt ekvivalensprincipsförsök skulle använda dämpas effekten dessutom med ytterligare en tiopotens. Med en styrelektronik som håller reda på tiden ner till hundra miljarddels sekunder skulle skillnaden landa på omkring 1,2&nbsp;µm/s — långt under vad tidigare experiment rapporterat, och tillräckligt lågt för mätningar i klassen 10<sup>−15</sup>." },

      { type: "h2", text: "I tyngdlöshet lägger sig molnen på varandra" },
      { type: "p", html: "Tyngdkraften märks också på ett andra, mer bildmässigt sätt. På marken sjunker det tyngre rubidiumet en aning djupare ner i fällan än kaliumet, och eftersom atomerna dessutom stöter bort varandra hamnar de två kondensaten ovanpå varandra i stället för i varandra. På bilderna av molnen syns de som två tydligt åtskilda klumpar, uppradade längs lodlinjen." },
      { type: "p", html: "För att skilja den effekten från de magnetiska knuffarna monterade laget hela fysikmodulen i en vridbar ram och lutade den i steg om 2,5&nbsp;grader, ända till 75&nbsp;grader, utan att ändra något annat i sekvensen. Tyngdkraften bytte då riktning i förhållande till atomchipet medan magnetfälten stod stilla." },
      { type: "image", src: "nyheter/bilder/2026-08-06-kvantlabb-i-fritt-fall-3.jpg", alt: "Fyra mätpaneler i rad. De tre vänstra, märkta Ground, visar kaliummolnet i cyan och rubidiummolnet i rött som två skilda fläckar ovanför varandra, med tyngdkraftens riktning utritad som en pil i olika lutningar. Den högra panelen, märkt Microgravity, visar i stället ett enda runt moln där de båda färgerna ligger centrerade i varandra.", caption: "Absorptionsbilder av de två kondensaten efter fri expansion. På marken (till vänster) skiljs kalium-41 och rubidium-87 åt längs tyngdkraftens riktning, oavsett hur apparaten lutas. I tyngdlöshet (till höger) ligger molnen i stället centrerade i varandra.", credit: "Figur: B. Piest m.fl., Nature Communications (2026), CC BY 4.0 — beskuren" },
      { type: "p", html: "I fritt fall försvinner nedsjunkningen helt, och bilderna visar i stället ett enda moln där de båda atomsorterna ligger centrerade i varandra. Hela förloppet räknades i efterhand igenom med de kopplade ekvationer som beskriver hur två växelverkande kondensat utvecklas i rummet, utan en enda fri parameter att skruva på — och simuleringen träffade mätningarna." },

      { type: "h2", text: "Nästa anhalt: rymden" },
      { type: "p", html: "Apparaten är byggd för att lyfta, och den har gjort det. Föregångaren MAIUS-1 sköts upp i januari 2017 från Esrange utanför Kiruna och blev det första Bose–Einstein-kondensat som någonsin tillverkats i rymden. MAIUS-B flög i sin tur inom kampanjen MAIUS-2, som lämnade Esrange klockan 08.30 den 2 december 2023, nådde 234&nbsp;kilometers höjd och gav drygt fem minuters tyngdlöshet." },
      { type: "p", html: "Under den flygningen bildades rubidiumkondensaten som planerat och kunde studeras i fritt fall, medan kaliumkondensatet uteblev. Mätningarna som nu publiceras kommer därför inte från raketen utan från laboratoriet och från falltornet i Hannover — där apparaten går att köra om och om igen, och där den dessutom kommer tillbaka hel." },
      { type: "p", html: "Nästa steg är BECCAL, ett tysk-amerikanskt atomlaboratorium som ska sitta permanent på den internationella rymdstationen, och på längre sikt föreslagna satellituppdrag som STE-QUEST. Forskarnas egen slutsats är att det som saknades inte var idéerna, utan atomerna: tillräckligt många, tillräckligt ofta, och släppta utan att någon knuffar dem." },

      { type: "fact", title: "Visste du?", items: [
        "Falltornet Einstein-Elevator i Hannover skjuter i väg en gondol som rymmer utrustning på 1,7&nbsp;meter i diameter och 2&nbsp;meter i höjd, med upp till 1&nbsp;000 kilo last. Bara gondolen töms på luft, inte hela tornet — och det är därför den hinner med hundratals flygningar per dygn i stället för en handfull.",
        "Zerodur, materialet i optikbänkarna, har en värmeutvidgning nära noll. En meterlång stav växer mindre än en hundradels millimeter om den värms hundra grader — vilket är skälet till att samma glaskeram används i spegelunderlag till stora teleskop.",
        "Både rubidium-87 och kalium-41 är bosoner, alltså partiklar som gärna samsas i samma kvanttillstånd. Det är just den egenskapen som gör att de kan bilda kondensat; en gas av fermioner vägrar och måste kylas på helt andra sätt.",
        "Den mest berömda demonstrationen av att allt faller lika fort gjordes 1971 på månen, där Apollo 15:s befälhavare David Scott släppte en hammare och en falkfjäder framför tv-kameran. Utan luft att bromsa fjädern landade de samtidigt — se filmen här nedanför."
      ],
      video: { src: "media/video/apollo15-hammare-fjader.mp4",
        poster: "media/video/apollo15-hammare-fjader.jpg", ratio: "4:3",
        embed: "https://archive.org/embed/FeatherHammerDropOnMoon",
        title: "Apollo 15: hammaren och fjädern släpps på månen",
        caption: "David Scott släpper hammaren och falkfjädern på månen, i slutet av Apollo 15:s sista månpromenad 1971.",
        credit: "Film: NASA (public domain)",
        url: "https://archive.org/details/FeatherHammerDropOnMoon" } }
    ]
  },
  {
    id: "2026-08-05-rubin-mork-materia",
    date: "2026-08-05",
    title: "Kameran som ska väga det osynliga — i tio år ska Rubin-observatoriet fotografera samma himmel om och om igen",
    deck: "På en bergstopp i Chile tar världens största digitalkamera en ny bild av natthimlen ungefär var fyrtionde sekund. Den första vetenskapliga bilden rymmer över en halv miljon galaxer — men det egentliga målet är att kartlägga något som aldrig kommer att synas på någon bild.",
    category: "Astronomi",
    readingTime: "7 min",
    image: "nyheter/bilder/2026-08-05-rubin-mork-materia.jpg",
    imageAlt: "Djup astronomisk bild av COSMOS-fältet. Hela bildrutan är fylld av tusentals ljuspunkter mot svart bakgrund — de flesta är avlägsna galaxer, vita, blåaktiga eller orange, några så stora att spiralform och utdragen skiva går att ana. Ett fåtal skarpa stjärnor i förgrunden hör till Vintergatan, och längs kanterna ligger svaga slöjor av lysande stoft.",
    imageCredit: "Foto: NSF–DOE Vera C. Rubin Observatory/NOIRLab/SLAC/AURA (CC BY 4.0)",
    tags: ["astronomi", "kosmologi", "mörk materia", "gravitation", "galaxer", "teleskop", "gravitationslinsning", "rotationskurva", "supernova", "fysik 1", "fysik 2"],
    sources: [
      { name: "Vera C. Rubin Observatory (pressmeddelande)", url: "https://rubinobservatory.org/news/action-rubin-lsst-begins" },
      { name: "NSF NOIRLab (pressmeddelande)", url: "https://noirlab.edu/public/news/noirlab2618/" },
      { name: "SLAC National Accelerator Laboratory", url: "https://www6.slac.stanford.edu/news/2026-07-31-doe-nsf-rubin-observatory-opens-deep-window-famous-cosmic-field" },
      { name: "Rubin Observatory — Early Data Preview 2", url: "https://rubinobservatory.org/events/edp2-release" },
      { name: "Phys.org", url: "https://phys.org/news/2026-08-rubin-observatory-deep-window-famous.html" }
    ],
    research: {
      citation: "Željko Ivezić m.fl., ”LSST: From Science Drivers to Reference Design and Anticipated Data Products”, The Astrophysical Journal 873:111 (2019) — genomgångens referensdesign och vetenskapliga mål",
      url: "https://doi.org/10.3847/1538-4357/ab042c"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 3.5 Gravitationslagen", href: "katalog.html#fy1-3.5" },
        { label: "Fysik nivå 2 · 1.6 Energi och gravitation i cirkelbanor", href: "katalog.html#fy2-1.6" },
        { label: "Fysik nivå 2 · 5.1 Universums struktur", href: "katalog.html#fy2-5.1" }
      ],
      fragor: [
        "Rotationskurvorna kan förklaras på två sätt: antingen finns det massa vi inte ser, eller så gäller inte gravitationslagen ute vid galaxernas kanter. Nästan alla astronomer valde det första. Vad är det som gör att man hellre lägger till en okänd ingrediens än ändrar en lag som fungerar överallt annars — och vad skulle krävas för att göra det omvända valet rimligt?",
        "Enskilda galaxer får sin form förvrängd med någon procent av gravitationslinsningen, men galaxer har högst olika form från början. Ändå går det att mäta massan. Hur kan en effekt som är omöjlig att se på ett objekt bli mätbar på en miljard objekt — och vad är det metoden egentligen antar om galaxernas naturliga former?",
        "Teleskopet är byggt för att ta om samma bild i tio år i stället för att titta extra länge på utvalda objekt. Vilken sorts upptäckter blir möjliga med den strategin som annars vore omöjliga, och vad förlorar man på att aldrig rikta instrumentet mot något särskilt?"
      ]
    },
    body: [
      { type: "p", html: "Natten till den 30&nbsp;juni i år började ett teleskop uppe i de chilenska Anderna, drygt 2&nbsp;600 meter över havet, göra precis det som det ska göra varenda klar natt i tio år framåt: ta en bild av himlen, vrida sig några grader, ta en till." },
      { type: "p", html: "Anläggningen heter Vera C. Rubin Observatory och finansieras av den amerikanska forskningsmyndigheten National Science Foundation tillsammans med landets energidepartement. Teleskopets huvudspegel är 8,4&nbsp;meter i diameter, och i brännpunkten sitter LSST-kameran: 3&nbsp;200&nbsp;megapixel fördelade på 189 bildsensorer, en apparat stor som en liten bil. Varje exponering täcker en bit himmel som rymmer ungefär 40&nbsp;fullmånar, en ny bild blir klar ungefär var 40:e sekund, och på några få nätter hinner teleskopet runt hela den södra stjärnhimlen. Det blir omkring 20&nbsp;terabyte data per natt." },
      { type: "p", html: "Programmet kallas Legacy Survey of Space and Time, LSST, och går ut på en enda sak: att fotografera samma himmel om och om igen i tio år." },
      { type: "quote", html: "”I dag börjar vi filma den största kosmiska film som någonsin gjorts.”", cite: "Brian Stone, tillförordnad chef för National Science Foundation" },
      { type: "p", html: "Att det blev just nu berodde inte på en invigningsdag utan på en avprickad lista. Beslutet att formellt starta genomgången fattades, enligt observatoriets ledning, efter en period av systemoptimering och en noggrann genomgång av teknisk beredskap, datasystemens prestanda och vetenskaplig validering — efter ungefär ett kvarts sekel av planering, bygge och intrimning." },

      { type: "h2", text: "En bild byggd av hundratals bilder" },
      { type: "p", html: "Den 31&nbsp;juli kom det första vetenskapliga datapaketet från den färdiga kameran, kallat Early Data Preview 2, och med det en bild av det så kallade COSMOS-fältet i stjärnbilden Sextanten. Bilden är inte en enda exponering utan hundratals staplade på varandra, tagna mellan april 2025 och januari 2026." },
      { type: "p", html: "I den finns mer än 500&nbsp;000 galaxer och mer än 50&nbsp;000 stjärnor: spiraler med tunna armar, släta elliptiska galaxer, kolliderande galaxpar som dragit ut varandra i trassliga former, och svagt röda fläckar så avlägsna att ljuset varit på väg mot oss under en stor del av universums historia." },
      { type: "p", html: "Valet av fält är ingen slump. COSMOS pekar bort från Vintergatans dammiga plan, så sikten ut ur vår egen galax är ovanligt fri, och området har kartlagts av det ena teleskopet efter det andra i tjugo år. Det gör det till en måttstock: ser Rubin samma saker som alla andra, fast svagare och djupare, då fungerar apparaten." },

      { type: "h2", text: "Kvinnan som såg att något fattades" },
      { type: "p", html: "Observatoriet är uppkallat efter Vera Rubin, den amerikanska astronom vars mätningar på 1970-talet gjorde frågan om mörk materia omöjlig att vifta bort. Tillsammans med instrumentbyggaren Kent Ford delade hon upp ljuset från lysande gasmoln i spiralgalaxer i dess våglängder och läste av hur spektrallinjerna förskjutits av dopplereffekten. Ur förskjutningen följde hur fort gasen rörde sig — och framför allt hur farten berodde på avståndet till galaxens mitt." },
      { type: "p", html: "Vad de borde ha sett följer direkt ur Newtons gravitationslag. För en stjärna i cirkelbana ska gravitationen vara precis den centripetalkraft som håller kvar den i banan, alltså $\\dfrac{G \\cdot M \\cdot m}{r^2} = \\dfrac{m \\cdot v^2}{r}$, och löser man ut farten blir den $v = \\sqrt{\\dfrac{G \\cdot M}{r}}$. Ligger massan samlad i mitten ska farten alltså sjunka ju längre ut man kommer. Så gör planeterna i vårt eget solsystem: Merkurius rusar fram i 47&nbsp;km/s, Neptunus lunkar i 5,4&nbsp;km/s." },
      { type: "p", html: "Galaxerna vägrade. I Andromedagalaxen, där paret mätte farten i 67 utvalda gasmoln, och sedan i tio spiralgalaxer till, låg hastigheten nästan konstant ända ut i utkanterna — där det knappt finns något ljus kvar att mäta på." },
      { type: "image", src: "nyheter/bilder/2026-08-05-rubin-mork-materia-2.png", alt: "Diagram med avståndet från galaxens mitt på den vågräta axeln och stjärnornas banfart på den lodräta. En streckad kurva stiger snabbt och avtar sedan utåt — den förväntade farten om bara den synliga massan fanns. En heldragen kurva stiger och planar sedan ut på en hög, nästan konstant nivå — den uppmätta farten. Skillnaden mellan kurvorna växer utåt.", caption: "En platt rotationskurva innebär att den inneslutna massan fortsätter växa ungefär proportionellt mot radien — långt utanför den lysande delen av galaxen.", credit: "Illustration: Fysiklabbet" },
      { type: "p", html: "En platt rotationskurva har en obehaglig konsekvens. Ska farten hållas uppe måste massan innanför banan fortsätta växa ungefär i takt med radien, också där ljuset tagit slut. Antingen gäller alltså inte gravitationslagen på galaxskala, eller så ligger galaxerna inbäddade i något som väger många gånger mer än allt vi ser — och som inte lyser." },

      { type: "h2", text: "Att fotografera det man inte kan se" },
      { type: "p", html: "Mörk materia sänder inte ut ljus, absorberar inte ljus och reflekterar inte ljus. Det enda den gör är att dra. Och det är precis den egenskapen Rubin-observatoriet är byggt för att utnyttja." },
      { type: "p", html: "Massa kröker rummet, och ljus som passerar tillräckligt nära böjs av. Ligger en tung ansamling materia mellan oss och en avlägsen galax blir bilden av bakgrundsgalaxen därför lite utdragen, ungefär som ett föremål sett genom en ojämn glasruta. Fenomenet kallas gravitationslinsning. I sällsynta, spektakulära fall dras galaxen ut till en lysande båge — men i det stora flertalet fall handlar det om någon enstaka procents förvrängning, alltså långt mindre än skillnaden mellan två galaxers naturliga former." },
      { type: "image", src: "nyheter/bilder/2026-08-05-rubin-mork-materia-3.jpg", alt: "Schematisk illustration mot mörk stjärnhimmel: en svagt lysande, diffus klotformig massa i mitten, omgiven av små avlägsna galaxer. Galaxerna längst ut har vanliga runda och ovala former, medan de närmare den osynliga massan är utdragna till bågar som böjer sig runt den, som om de setts genom en ojämn glaslins.", caption: "Principen, kraftigt överdriven: bakgrundsgalaxernas former dras ut runt en tung massa i förgrunden. I verkligheten rör det sig oftast om någon procents förvrängning, som bara syns statistiskt.", credit: "Illustration: Fysiklabbet" },
      { type: "p", html: "Därför fungerar metoden bara statistiskt. Mäter man formen på tillräckligt många galaxer och letar efter en gemensam, systematisk skevhet — grannar som lutar åt samma håll — går det att räkna baklänges till hur massan är fördelad längs synlinjen, inklusive den del av massan som inte lyser. ”Tillräckligt många” är här ungefär 20&nbsp;miljarder galaxer, vilket är vad genomgången väntas katalogisera under sina tio år." },

      { type: "h2", text: "Poängen med att göra om det" },
      { type: "p", html: "Den andra halvan av idén är tiden. Varje ny bild jämförs automatiskt med tidigare bilder av samma himmelsfläck, och allt som skiljer sig — en ljuspunkt som tillkommit, en som slocknat, en som flyttat sig — skickas ut som ett larm till astronomer världen över inom någon minut. När genomgången går för full maskin väntas larmen bli miljontals varje natt." },
      { type: "p", html: "Det som ändrar sig är också det mest upplysande: exploderande stjärnor, asteroider som kryper fram mot stjärnbakgrunden, galaxkärnor som plötsligt blossar upp. Supernovor av en viss typ har dessutom en känd ljusstyrka och fungerar därför som avståndsmätare — det är med dem man följer hur universums utvidgning ändrat takt, alltså den mörka energin." },
      { type: "quote", html: "”Rubin-observatoriet är en upptäcktsmaskin.”", cite: "Leanne Guy, Vera C. Rubin Observatory" },

      { type: "fact", title: "Visste du?", items: [
        "En enda bild från LSST-kameran skulle behöva 378 4K-skärmar för att visas i full upplösning.",
        "Huvudspegeln är samtidigt teleskopets tredje spegel — båda spegelytorna är slipade ur ett och samma glasblock, med den yttre ringen och den inre skivan krökta på olika sätt.",
        "Kameran har sex filter, från ultraviolett till nära infrarött, och byter mellan dem mitt under natten på ett par minuter.",
        "Trots sin storlek vrider sig teleskopet till nästa fält och står stilla igen på några sekunder. Utan det hade en ny bild var 40:e sekund varit omöjlig."
      ] },

      { type: "p", html: "Tio år är lång tid, och det mesta som ska komma ut ur observatoriet är ännu bara en plan. Men arbetsordningen är ovanlig: i stället för att en forskare bokar tid för att titta på ett bestämt objekt fotograferas allt, hela tiden, och frågorna ställs i efterhand — även de frågor ingen kommit på än." }
    ]
  },
  {
    id: "2026-08-04-fusion-i-metall",
    date: "2026-08-04",
    title: "Fusionen som vägrar slockna — inne i metallfolier smälter atomkärnor samman långt under den energi där teorin säger stopp",
    deck: "Ju trögare två atomkärnor möts, desto snabbare rasar chansen att de smälter samman. Så beter sig fria kärnor — men i folier av palladium och titan planar kurvan ut i stället för att dö. Utbytet blir över en triljon gånger, en etta med arton nollor, större än teorin för nakna kärnor förutsäger.",
    category: "Kärnfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-08-04-fusion-i-metall.jpg",
    imageAlt: "En smal blåvit stråle av joner färdas genom mörkret och träffar en tunn metallfolie. Bakom folien syns metallens kristallgitter som stora silverfärgade kulor i ett regelbundet rutmönster, med små lysande cyanfärgade kärnor inpackade i mellanrummen. Vid en av gitterplatserna lyser en varm orange blixt.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kärnfysik", "fusion", "deuterium", "coulombkraft", "tunneleffekt", "materialfysik", "palladium", "neutroner", "energi", "fysik 1", "fysik 2"],
    sources: [
      { name: "Physics World", url: "https://physicsworld.com/a/nuclear-fusion-persists-at-ultralow-energies-inside-metal-foils/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-materials-fusion-reaction.html" },
      { name: "Lawrence Berkeley National Laboratory (pressmeddelande)", url: "https://newscenter.lbl.gov/2026/07/23/when-it-comes-to-fusion-materials-matter/" }
    ],
    research: {
      citation: "Micah E. Karahadian, Matthew Colborne, Arun Persaud, Thomas Schenkel och Jeremy N. Munday, ”Enhanced nuclear fusion in the sub-keV energy regime”, Nature Communications (2026)",
      url: "https://doi.org/10.1038/s41467-026-74421-1"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 9.2 Massdefekt och bindningsenergi", href: "katalog.html#fy1-9.2" },
        { label: "Fysik nivå 1 · 7.2 Krafter mellan laddningar och Coulombs lag", href: "katalog.html#fy1-7.2" },
        { label: "Fysik nivå 1 · 9.1 Atomkärnan", href: "katalog.html#fy1-9.1" }
      ],
      fragor: [
        "Ser man bara till den elektriska avstötningen är solens kärna alldeles för sval för att väte ska kunna fusionera. Ändå lyser solen. Vad säger det om skillnaden mellan att något är omöjligt och att det är osannolikt — och varför spelar osannolikheten så liten roll just i solen?",
        "Forskarna mäter både en neutron och en proton, med två detektorer som arbetar oberoende av varandra, trots att en enda detektor räcker för att se att något har hänt. Varför är det värt besväret? Vad är det en ensam mätning inte skulle kunna utesluta?",
        "Reaktionerna är en faktor tio upphöjt till arton vanligare än väntat, men forskarna säger själva att det inte duger till energiproduktion. Hur kan båda påståendena vara sanna samtidigt? Vad skiljer en relativ jämförelse från ett absolut värde?"
      ]
    },
    body: [
      { type: "p", html: "Att slå ihop två atomkärnor är svårt av ett enda skäl: båda är positivt laddade och stöter bort varandra. Ju närmare de kommer, desto hårdare knuffar de ifrån sig — och den starka kärnkraft som ska hålla dem samman tar inte vid förrän på ett avstånd av storleksordningen en biljondels millimeter." },
      { type: "p", html: "Därför krävs fart. I solens kärna, vid omkring 15&nbsp;miljoner grader, rör sig kärnorna så snabbt att de ibland lyckas, och i en framtida fusionsreaktor ska ett plasma bli ännu hetare. Sänker man i stället energin rasar fusionshastigheten: varje steg nedåt gör reaktionen inte lite ovanligare, utan många tiopotenser ovanligare." },
      { type: "p", html: "Ett forskarlag vid University of California, Davis och Lawrence Berkeley National Laboratory rapporterar nu i tidskriften <em>Nature Communications</em> att den regeln inte gäller överallt. Inne i tunna folier av palladium och titan slutade fusionen falla. Under omkring 2,5&nbsp;keV planade utbytet ut och la sig på en nivå som teorin för fria kärnor säger borde vara i praktiken noll." },

      { type: "h2", text: "Berget som två kärnor måste ta sig förbi" },
      { type: "p", html: "Kärnorna i experimentet är deuteroner — kärnan i deuterium, den tyngre väteisotop som har en proton och en neutron. Två deuteroner bär varsin positiv elementarladdning, och den elektriska kraften mellan dem växer som $\\dfrac{1}{r^2}$ när avståndet krymper. Energitröskeln de måste ta sig förbi kallas coulombbarriären, och för två deuteroner ligger den på storleksordningen hundratals keV." },
      { type: "p", html: "Att kärnorna ändå smälter samman vid långt lägre energier beror på kvantmekaniken. En partikel har ingen skarpt bestämd plats, och det finns en liten men fullt verklig sannolikhet att den helt enkelt dyker upp på andra sidan barriären utan att någonsin ha haft energi nog att klättra över den. Fenomenet heter tunneleffekt, och det är därför solen lyser trots att dess kärna strikt taget är alldeles för sval för uppgiften." },
      { type: "p", html: "Priset är att sannolikheten sjunker exponentiellt när energin minskar. Det är den branta kurvan som gör fusionskraft så svår att förverkliga — och det är den kurvan som nu visat sig ha ett golv." },

      { type: "h2", text: "Elektrokemi på ena sidan, jonstråle på den andra" },
      { type: "p", html: "Apparaten är en dubbelkammare med folien som vägg mellan två världar." },
      { type: "quote", html: "”En sorts membranreaktor som kombinerar en elektrokemisk cell med en deuteriumjonstråle.”", cite: "Thomas Schenkel, Lawrence Berkeley National Laboratory, i Physics World" },
      { type: "p", html: "På ena sidan står en elektrokemisk cell med tungt vatten, där deuterium pressas in i metallen ungefär som vid vanlig elektrolys. Palladium har den ovanliga egenskapen att kunna suga upp väte i mängder som vida överstiger vad metallens egen volym verkar rymma — atomerna sätter sig i hålrummen mellan metallatomerna utan att gittret faller isär. På andra sidan råder vakuum, och där skjuts en stråle av deuteriumjoner mot folien med noggrant inställd energi." },
      { type: "p", html: "Varje jon som träffar möter alltså en metall som redan är full av deuterium. Smälter två kärnor samman blir resultatet ett av två, ungefär lika ofta: antingen helium-3 plus en neutron, eller tritium plus en proton. Både neutronen och protonen far i väg med flera MeV och fångas upp av var sin detektor — två oberoende sätt att bekräfta att en reaktion verkligen ägt rum." },

      { type: "h2", text: "Kurvan som vägrade falla" },
      { type: "p", html: "Genom att vrida ner jonstrålens energi steg för steg kunde laget följa fusionsutbytet ända in i det område där det borde ha försvunnit. Det gjorde det inte." },
      { type: "quote", html: "”Utbytet planade ut när vi sänkte jonenergin ytterligare.”", cite: "Thomas Schenkel, Lawrence Berkeley National Laboratory, i Physics World" },
      { type: "p", html: "Platån dök upp i både palladium och titan. Jämfört med vad teorin för nakna, fria kärnor förutsäger vid samma energi var utbytet mer än 10<sup>18</sup> gånger större — en triljon, alltså en etta med arton nollor efter sig. Att dessutom fylla på metallen med extra deuterium från den elektrokemiska sidan ungefär fördubblade antalet reaktioner." },

      { type: "h2", text: "Elektronerna som skymmer avståndet" },
      { type: "p", html: "Den mest etablerade förklaringen heter skärmning. En deuteron inne i en metall är inte naken: den är omgiven av metallens rörliga ledningselektroner, vars negativa laddning tar udden av avstötningen mellan två kärnor. Barriären blir både lägre och smalare, och eftersom tunnelsannolikheten beror så känsligt på barriärens form kan en blygsam sänkning ge en enorm ökning av reaktionerna." },
      { type: "p", html: "Att effekten finns har varit känt sedan 1990-talet. Problemet är att den uppmätta skärmningen i metaller genomgående varit kraftigare än beräkningarna kan förklara — och en platå som ligger helt still när energin sjunker är svår att få ihop med enbart skärmning. Jeremy Munday, professor vid UC&nbsp;Davis och studiens korresponderande författare, pekar i stället på att en metall är en betydligt rörigare miljö än ett plasma." },
      { type: "quote", html: "”Metallgitter innehåller elektroner, defekter och lokalt koncentrerat deuterium, som alla kan samverka och skapa reaktionsmiljöer som inte finns i ett vanligt plasma.”", cite: "Jeremy Munday, University of California, Davis" },
      { type: "p", html: "Vad som faktiskt bär upp platån — skärmningen, skador som jonstrålen själv orsakar i gittret, eller att deuteriumatomerna klumpar ihop sig på vissa platser — är just den fråga gruppen nu säger sig vilja svara på." },

      { type: "h2", text: "Nej, det handlar inte om kall fusion" },
      { type: "p", html: "Ordet fusion i en metallbit väcker minnen av 1989, då Martin Fleischmann och Stanley Pons påstod sig ha fått atomkärnor att smälta samman spontant i en elektrolyscell vid rumstemperatur. Ingen lyckades upprepa försöket, och kall fusion blev under lång tid ett uttryck man helst inte sa högt på en fysikinstitution." },
      { type: "p", html: "Det som skiljer det nya arbetet är att ingenting påstås ske av sig självt. Energin tillförs uttryckligen utifrån, av jonstrålen, och varje reaktion räknas av detektorer som mäter precis de partiklar fusionen ska ge ifrån sig. Det anmärkningsvärda är inte att fusion sker, utan hur mycket oftare den sker än väntat — och forskarna är noga med proportionerna." },
      { type: "quote", html: "”Det här är en enorm relativ ökning, även om den absoluta fusionshastigheten fortfarande är alldeles för låg för energiproduktion.”", cite: "Jeremy Munday, University of California, Davis, i Physics World" },
      { type: "p", html: "Någon energikälla blir det alltså inte. Det närmaste praktiska användningsområdet är i stället kompakta neutronkällor: apparater som producerar neutroner på beställning och används för att genomlysa gods i hamnar, undersöka materials inre struktur och tillverka isotoper för sjukvården. Får man fler neutroner ur samma insats genom att välja rätt material, kan sådana apparater göras mindre och snålare." },
      { type: "p", html: "På längre sikt är poängen större än så: att materialet runt en kärnreaktion inte behöver vara en passiv behållare som ska stå emot påfrestningarna, utan kan vara en aktiv del av själva reaktionen. Var den tanken tar slut vet ingen än." },
      { type: "quote", html: "”Vi har sett att vi kan öka fusionshastigheten — men var går gränsen?”", cite: "Jeremy Munday, University of California, Davis" },

      { type: "fact", title: "Visste du?", items: [
        "Deuterium finns naturligt i allt vatten: ungefär en av 6&nbsp;400 väteatomer i havet är deuterium. Tungt vatten, där båda väteatomerna är deuterium, är omkring 11&nbsp;% tyngre än vanligt vatten — en isbit av tungt vatten sjunker i ett glas vanligt vatten.",
        "Att palladium suger i sig väte upptäcktes av kemisten Thomas Graham 1866. Metallen kan ta upp hundratals gånger sin egen volym vätgas, och används än i dag som filter för att rena väte: vätet slinker igenom gittret, alla andra gaser stannar utanför.",
        "Solens kärna håller omkring 15&nbsp;miljoner grader, vilket motsvarar en typisk partikelenergi på drygt 1&nbsp;keV — lägre än energierna i det här experimentet, och långt under coulombbarriären. Utan tunneleffekten hade solen aldrig börjat lysa.",
        "Neutronen från deuterium–deuterium-fusion får alltid 2,45&nbsp;MeV i rörelseenergi. Just det värdet fungerar som ett fingeravtryck: mäter man neutroner med precis den energin vet man vilken reaktion som ägt rum."
      ]}
    ]
  },

  {
    id: "2026-08-03-bromsade-atomkarnor",
    date: "2026-08-03",
    title: "Fysiker skickar i väg nakna atomkärnor i 90 000 kilometer per sekund — och lyckas sedan bromsa dem till nästan stillastående",
    deck: "Enda sättet att få bort alla arton elektroner från en argonatom är att skjuta i väg den i nästan en tredjedel av ljusets hastighet och köra den genom en folie. Men mätningarna man sedan vill göra kräver att kärnan står stilla. Nu har ett tyskt forskarlag klarat hela vägen tillbaka — och i fällan mött jonerna med ett moln av kalla elektroner.",
    category: "Atomfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-03-bromsade-atomkarnor.jpg",
    imageAlt: "En lång, smal acceleratorhall med grönt golv. Utmed hela vänstra väggen står en rad enorma cylindriska vakuumtankar i lila-violett metall, sammankopplade i en obruten linje som försvinner bort mot bildens djup. Ovanpå tankarna sitter täta rader av rör, kablar och kopplingar.",
    imageCredit: "Foto: Alexander Blecher, Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["atomfysik", "kärnfysik", "joner", "penningfälla", "magnetfält", "elektriska fält", "rörelseenergi", "acceleratorfysik", "kvantelektrodynamik", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-electron-cooling-highly-ions-penning.html" },
      { name: "TU Darmstadt (pressmeddelande)", url: "https://www.tu-darmstadt.de/universitaet/aktuelles_meldungen/einzelansicht_572416.en.jsp" },
      { name: "GSI Helmholtzzentrum für Schwerionenforschung — HITRAP", url: "https://www.gsi.de/en/work/research/appamml/atomic-quantum-fundamental-physics/experimental-facilities/hitrap" }
    ],
    research: {
      citation: "S. Rausch m.fl., ”Deceleration of Accelerator-Produced and In-Trap Electron Cooling of Highly Charged Ions”, Physical Review X 16, 031022 (2026)",
      url: "https://doi.org/10.1103/961c-j3p5"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 3.4 Laddade partiklar i magnetfält", href: "katalog.html#fy2-3.4" },
        { label: "Fysik nivå 1 · 7.10 Elektriska fält och elektrisk fältstyrka", href: "katalog.html#fy1-7.10" },
        { label: "Fysik nivå 1 · 4.3 Rörelseenergi", href: "katalog.html#fy1-4.3" }
      ],
      fragor: [
        "Samma acceleratorkaviteter kan både ge fart och bromsa — det enda som skiljer är i vilket ögonblick partikeln kommer. Vilka andra fysikaliska system känner ni till där tajmningen, och inte styrkan, avgör om något får energi eller förlorar den?",
        "I fällan hålls jonerna på plats i sidled av ett magnetfält och i längdled av ett elektriskt fält. Varför räcker det inte med magnetfältet ensamt? Vad är det den magnetiska kraften aldrig kan göra?",
        "Elektronerna i fällan gör sig av med energi genom att stråla, eftersom de hela tiden accelereras när magnetfältet tvingar runt dem i cirklar. Jonerna, som är tiotusentals gånger tyngre, strålar nästan ingenting. Hur förklarar det att man kyler jonerna via elektronerna i stället för att bara vänta ut jonerna själva?"
      ]
    },
    body: [
      { type: "p", html: "Fysiken har ett återkommande problem: de allra exaktaste mätningarna kräver att man studerar något som står stilla, medan det enda sättet att över huvud taget tillverka det man vill mäta på ofta är att köra det i väggen i vansinnig fart. Sällan är motsättningen så skarp som när man vill ha en helt naken atomkärna." },
      { type: "p", html: "Att plocka bort de yttersta elektronerna ur en atom är enkelt — det gör kemin varje gång ett salt löser sig i vatten. Men de innersta elektronerna sitter hårt, och för att få bort dem allihop finns i praktiken bara en metod: accelerera hela atomen till en stor del av ljusets hastighet och skicka den genom en tunn folie. Elektronerna sopas av, och kvar flyger den nakna kärnan." },
      { type: "p", html: "I en studie i tidskriften <em>Physical Review X</em> beskriver nu en grupp vid Technische Universität Darmstadt och GSI Helmholtzzentrum für Schwerionenforschung hur de tagit sådana kärnor hela vägen tillbaka: bromsat dem från acceleratorfart, fångat dem i en fälla och kylt dem med elektroner. Delar av den kedjan hade aldrig genomförts förut." },

      { type: "h2", text: "Nakna kärnor i 90 000 kilometer per sekund" },
      { type: "p", html: "Jonerna som användes var argon-36 med samtliga arton elektroner bortslitna — alltså atomkärnor med arton protoner och arton neutroner och ingenting annat. De producerades vid en rörelseenergi på 45&nbsp;MeV per nukleon, vilket motsvarar drygt 30&nbsp;procent av ljusets hastighet, ungefär 90&nbsp;000&nbsp;km/s." },
      { type: "quote", html: "”I experimentet vi genomförde använde vi argonjoner som vi hade slitit bort alla elektroner från, så att bara de nakna atomkärnorna återstod.”", cite: "Simon Rausch, Technische Universität Darmstadt" },
      { type: "p", html: "I den farten går det inte att mäta något med hög precision. Partikeln passerar mätutrustningen på ett ögonblick, och den höga farten förskjuter och breddar dessutom alla de spektrallinjer man skulle vilja läsa av. Vill man ha exakthet måste kärnan stå stilla — så jonerna måste bromsas lika hårt som de nyss accelererats." },

      { type: "h2", text: "En accelerator som går baklänges" },
      { type: "p", html: "Bromsningen sker i tre steg vid anläggningen HITRAP. Först i lagringsringen ESR, som tar ner energin till 4&nbsp;MeV per nukleon. Sedan i en linjär struktur som pressar den vidare till omkring 0,5&nbsp;MeV per nukleon, och till sist i en radiofrekvenskvadrupol som lämnar ifrån sig jonerna vid 6&nbsp;keV per nukleon — knappt 1&nbsp;100&nbsp;km/s. Rörelseenergin har då sjunkit med nästan fyra tiopotenser." },
      { type: "quote", html: "”Produktionen skedde vid omkring 30&nbsp;procent av ljusets hastighet, och innan vi kunde fånga jonerna måste vi först sänka deras rörelseenergi med ungefär en faktor 10&nbsp;000.”", cite: "Simon Rausch, Technische Universität Darmstadt" },
      { type: "p", html: "Knepet är att en accelerator inte behöver byggas om för att bli en broms. De snabbt växlande elektriska fälten i acceleratorns kaviteter puttar en partikel framåt om den anländer i rätt ögonblick — och bakåt om den anländer i fel. Det är samma sak som med en gunga: exakt samma knuff ger fart eller tar bort fart beroende på när den läggs in. Genom att förskjuta tajmningen ett halvt varv gör man om maskinen till en bromssträcka." },

      { type: "h2", text: "En fälla av magnetfält på tvären och elfält på längden" },
      { type: "p", html: "Målet för resan är en Penningfälla, som håller fast laddade partiklar med två fält samtidigt. Ett kraftigt magnetfält — här 6&nbsp;T från en supraledande magnet, ungefär fyra gånger så starkt som i en vanlig magnetkamera på sjukhus — tvingar jonerna att gå i cirklar och hindrar dem från att driva ut åt sidorna. Den magnetiska kraften verkar däremot alltid vinkelrätt mot rörelsen och kan aldrig stoppa något på längden, så där behövs något annat: elektroder i vardera änden som laddas upp och stöter bort de positiva jonerna." },
      { type: "p", html: "Fällan i det här experimentet mäter 387&nbsp;mm mellan de två fångstelektroderna, och jonerna fångas i flykten. Knippet får flyga in genom en ände som ligger öppen, och innan det hinner ut igen slås spänningen på — dörren stängs bakom dem. Där låg de nakna argonkärnorna kvar i flera sekunder." },

      { type: "h2", text: "Kylning med ett moln av elektroner" },
      { type: "p", html: "Att vara fångad är inte samma sak som att vara stilla. Jonerna studsar fortfarande fram och tillbaka mellan fällans ändar med betydande energi, och den energin måste bort. Lösningen är att låta dem dela fälla med ungefär 10<sup>9</sup> elektroner. Fällan är nästlad: den har en potentialgrop som passar positiva joner och en annan som passar negativa elektroner, och de två groparna överlappar så att partiklarna blandas." },
      { type: "p", html: "Där tar Coulombkraften vid. Varje gång en snabb jon passerar nära en elektron knuffar de på varandra, och energi läcker från den tunga jonen till den lätta elektronen — ungefär som när en het sten läggs i kallt vatten, fast vattnet i det här fallet är en gas av elektroner." },
      { type: "image", src: "nyheter/bilder/2026-08-03-bromsade-atomkarnor-2.jpg",
        alt: "En stor gul cylindrisk tank i en acceleratorhall, omgiven av ett svart stålstativ, gula kopplingsskåp, kablar och varningsskyltar för högspänning. På tankens sida står med stora svarta bokstäver ELECTRON-COOLER.",
        caption: "En elektronkylare vid GSI:s acceleratoranläggning i Darmstadt. Grundtanken är densamma som i den nya fällan: ett moln av kalla elektroner får ta hand om de tunga jonernas överskottsenergi.",
        credit: "Foto: Alexander Blecher, Wikimedia Commons (CC BY-SA 4.0)" },
      { type: "p", html: "Men varför förblir elektronerna kalla? Därför att de är så lätta. En elektron som tvingas runt i cirklar av magnetfältet accelereras oavbrutet, och en accelererad laddning sänder ut strålning. Elektrongasen strålar därför hela tiden bort sin energi och sjunker tillbaka mot fällans egen temperatur, medan jonerna — tiotusentals gånger tyngre — knappt strålar alls. Elektronerna blir en kylare som aldrig behöver bytas." },
      { type: "p", html: "På den vägen kan jonerna föras ner mot omkring 10&nbsp;eV, och med ytterligare en teknik vidare mot de ungefär 4&nbsp;K som råder inne i den supraledande magneten. Själva kylsteget demonstrerades med joner från en lokal jonkälla vid fällan, medan bromsningen och infångningen gjordes med joner från acceleratorn. Tillsammans betyder de två resultaten att hela kedjan nu finns på plats." },

      { type: "h2", text: "Varför det är värt besväret" },
      { type: "p", html: "En atomkärna utan elektroner, eller med bara en enda kvar, är på samma gång det enklaste och det mest extrema system fysiker kan få tag på. Enkelt, eftersom det inte finns någon trängsel av elektroner som grumlar räkningarna. Extremt, eftersom det elektriska fältet alldeles intill en tung kärna är av storleksordningen 10<sup>16</sup>&nbsp;V/cm — långt starkare än vad världens kraftigaste lasrar kan åstadkomma." },
      { type: "p", html: "Där blir det möjligt att pröva kvantelektrodynamiken, teorin för hur ljus och laddning växelverkar, i ett område där den aldrig testats ordentligt. Håller teorins förutsägelser om elektronens magnetiska egenskaper och om de finaste detaljerna i energinivåerna även under sådana förhållanden — eller spricker något? Långsamma högladdade joner efterfrågas dessutom inom materialforskningen, där de hittills helt enkelt inte gått att få tag på." },

      { type: "fact", title: "Visste du?", items: [
        "Penningfällan är uppkallad efter den nederländske fysikern Frans Michel Penning. Hans Dehmelt, som utvecklade fälltekniken, delade Nobelpriset i fysik 1989 just för jonfällor.",
        "Energi per nukleon (MeV/u) är ett praktiskt mått i acceleratorvärlden. Eftersom både rörelseenergin och massan växer i takt med antalet kärnpartiklar motsvarar ett visst värde alltid samma fart, oavsett hur tung kärnan är.",
        "Argon-36 är en sällsynt stabil isotop — bara omkring 0,33&nbsp;% av luftens argon. Resten är nästan uteslutande argon-40, som bildas när kalium-40 i berggrunden sönderfaller.",
        "Fällans magnetfält på 6&nbsp;T är ungefär 120&nbsp;000 gånger starkare än jordens magnetfält, det som får en kompassnål att ställa in sig."
      ]}
    ]
  },

  {
    id: "2026-08-02-viskositetens-ovre-grans",
    date: "2026-08-02",
    title: "Berg rinner — men bara nästan. Nu har en geofysiker räknat ut var gränsen mellan flytande och stelt går",
    deck: "Vatten rinner lätt, honung trögt, glaciärer knappt märkbart. Men någonstans slutar ”trögflytande” att betyda något alls, och materialet är helt enkelt stelt. Efter att ha stått svarslös inför sina egna studenter har Masaki Yoshida vid Ritsumeikan University i Japan satt ett värde på var den gränsen går.",
    category: "Geofysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-02-viskositetens-ovre-grans.jpg",
    imageAlt: "En vägskärning i ett kuperat medelhavslandskap. I bergväggen syns ljusa och mörka stenlager som är hopveckade i vågor, öglor och skarpa knyckar, som om lagren en gång varit mjuka. Ovanför skärningen växer buskar och gles gräsmark, nedanför löper en asfaltsväg.",
    imageCredit: "Foto: Catherine Christopoulou, Wikimedia Commons (CC BY-SA 4.0)",
    tags: ["mekanik", "geofysik", "viskositet", "vätskor", "plattektonik", "jordens inre", "materialfysik", "tryck", "fysik 1", "fysik 2"],
    sources: [
      { name: "Physics World", url: "https://physicsworld.com/a/geophysicist-identifies-a-maximum-practical-viscosity/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-earth-deepest-upper-limit-viscosity.html" },
      { name: "Ritsumeikan University (pressmeddelande)", url: "https://en.ritsumei.ac.jp/news/detail/?id=1174" }
    ],
    research: {
      citation: "Masaki Yoshida, ”Upper bound of viscosity from a geophysical perspective”, Physics of Fluids 38, 063117 (2026)",
      url: "https://doi.org/10.1063/5.0335802"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 1.2 Storheter, enheter och prefix", href: "katalog.html#fy1-1.2" },
        { label: "Fysik nivå 1 · 3.6 Friktion", href: "katalog.html#fy1-3.6" },
        { label: "Fysik nivå 1 · 5.2 Tryck och tryckkraft", href: "katalog.html#fy1-5.2" }
      ],
      fragor: [
        "Beck går att slå sönder med en hammare, men rinner till en droppe ungefär vart tionde år. Är det ett fast ämne eller en vätska? Vad avgör svaret — materialet, eller hur länge man tittar på det?",
        "Laboratoriets formler fungerade bra vid de temperaturer de prövats vid, men gav ett svar med sjuttio nollor när de användes långt utanför det området. Vad säger det om att använda en modell utanför sitt giltighetsområde? Hur skulle ni kunna märka att ni gjort just det?",
        "Ljusets hastighet är ett verkligt tak: inget kan gå fortare. Yoshidas viskositetsgräns är av ett annat slag — större värden är inte omöjliga, de slutar bara betyda något. Vilken sorts gräns är mest användbar för en fysiker, och varför?"
      ]
    },
    body: [
      { type: "p", html: "Häll upp ett glas vatten, så rinner det ut på ett ögonblick. Häll upp honung, och du får vänta. Häll upp beck — den becksvarta resten från tjärframställning — och du får vänta i tio år på en enda droppe. Storheten som skiljer dem åt heter viskositet, betecknas med den grekiska bokstaven $\\eta$ (eta) och mäter hur mycket ett ämne bråkar emot när det tvingas flyta. Luft ligger på omkring 10<sup>−5</sup>&nbsp;Pa·s, vatten på 10<sup>−3</sup>&nbsp;Pa·s och honung kring 10&nbsp;Pa·s." },
      { type: "p", html: "Men vad händer i andra änden av skalan? Finns det ett tak — en punkt där ett ämne är så trögflytande att det inte är flytande längre? Masaki Yoshida, professor vid Ritsumeikan University i Japan, menar att det gör det. I en studie i tidskriften <em>Physics of Fluids</em> lägger han taket vid omkring 10<sup>30</sup>&nbsp;Pa·s — ungefär 10<sup>33</sup> gånger vattnets viskositet. Ovanför den gränsen, skriver han, är det inte längre meningsfullt att kalla ett material trögflytande. Då är det stelt." },

      { type: "h2", text: "Allt rinner, om man bara väntar tillräckligt länge" },
      { type: "p", html: "Gränsen mellan fast och flytande är luddigare än den verkar. Det mest tålmodiga beviset står i en glasmonter vid University of Queensland i Australien. År 1927 värmde fysikern Thomas Parnell beck till en vätska, hällde den i en tratt och lät den stelna. Beck går att slå sönder med en hammare som om det vore glas. Ändå har nio droppar sedan dess sakta tänjt sig loss och fallit ner i bägaren under tratten, den senaste i april 2014. Ur droppfallen har beckets viskositet kunnat räknas ut: omkring 2,3&nbsp;·&nbsp;10<sup>8</sup>&nbsp;Pa·s, alltså cirka 230&nbsp;miljarder gånger trögare än vatten." },
      { type: "p", html: "Samma sak gäller is. En glaciär ser ut som ett stillastående block, men den kryper nedför dalen, och dess viskositet ligger någonstans mellan 10<sup>13</sup> och 10<sup>17</sup>&nbsp;Pa·s beroende på temperatur, påfrestning och iskristallernas struktur. Och samma sak gäller sten. Jordens mantel — de tusentals kilometer heta bergarter som ligger under skorpan — är fast material, och seismiska vågor går rakt igenom den som genom en solid kropp. Ändå vältrar den runt i långsamma konvektionsceller på miljontals år." },
      { type: "image", src: "nyheter/bilder/2026-08-02-viskositetens-ovre-grans-2.jpg",
        alt: "Satellitbild rakt uppifrån över ett snötäckt bergsområde. Flera isströmmar rinner ihop till en bred glaciärtunga, och de mörka gruslinjerna på isen är hopveckade i stora, mjuka öglor. Nedre delen av bilden lyser klarröd där växtligheten finns.",
        caption: "Susitna Glacier i Alaska sedd från satellit. De mörka banden är sten och grus som isen dragit med sig — och som veckats ihop där isströmmar med olika fart flutit samman. Bilden är tagen i falska färger, där växtlighet återges röd.",
        credit: "Bild: Jesse Allen och Robert Simmon, NASA Earth Observatory (ASTER/Terra), public domain" },
      { type: "p", html: "Att även sten kan flyta syns med blotta ögat i vägskärningar där bergets lager ligger hopveckade i mjuka öglor. De vecken bildades djupt nere i jordskorpan, under högt tryck och hög temperatur, i en takt av kanske några millimeter om året. Det avgörande är alltså hur länge man tittar: ett material som verkar stenhårt under en sekund kan vara påtagligt flytande under en miljon år. Viskositet är därför alltid knuten till en tidsskala — och det är precis där Yoshidas problem började." },

      { type: "h2", text: "Formeln gav ett svar med sjuttio nollor" },
      { type: "p", html: "I laboratorier går det att klämma och vrida på bergartsprover och mäta hur de deformeras. Ur sådana försök får geologer fram samband som beskriver hur trögt ett visst mineral flyter vid ett visst tryck och en viss temperatur. Sambanden är extremt känsliga för just temperaturen: kyler man ner materialet skjuter viskositeten i höjden." },
      { type: "p", html: "Problemet uppstår när man använder sambanden vid jordytan, där berget är svalt. Då spottar formlerna ur sig svindlande värden — Physics World anger storleksordningen 10<sup>70</sup>&nbsp;Pa·s för de tektoniska plattorna. Ett material med den viskositeten skulle aldrig hinna röra sig ur fläcken, inte under universums hela livstid. Ändå ser vi plattorna böja sig och dyka ner i manteln vid subduktionszonerna, år efter år." },
      { type: "quote", html: "”Jag insåg att jag inte kunde förklara för mina studenter varför plattor med så hög viskositet böjs och sjunker ner i manteln.”", cite: "Masaki Yoshida, Ritsumeikan University, i Physics World" },

      { type: "h2", text: "Tre tidsskalor, ett svar" },
      { type: "p", html: "Yoshidas grepp var att inte lita på en enda metod, utan att ringa in svaret från tre håll som täcker vitt skilda tidsspann." },
      { type: "p", html: "Först satellitmätningar av hur markytan faktiskt deformeras, år efter år i decennier. De visar att plattornas stabila inre delar har effektiva viskositeter på omkring 10<sup>24</sup>&nbsp;Pa·s eller mer, och att töjningshastigheterna kan vara nere på 10<sup>−9</sup> per år — en miljarddels formförändring per år. Den högsta viskositet som över huvud taget går att observera på det viset landar kring 10<sup>28</sup>&nbsp;Pa·s." },
      { type: "p", html: "Sedan laboratorieförsöken, som deformerar bergarter under timmar till år. Yoshida gick igenom deformationssambanden för de mineral som bygger upp jordens inre — olivin, klinopyroxen, diopsid, anortit och kvarts — vid realistiska tryck och temperaturer. Och till sist datorsimuleringar av mantelkonvektion och plattrörelser över miljontals år. De spåren pekade mot samma tak: 10<sup>30±2</sup>&nbsp;Pa·s." },

      { type: "h2", text: "Varför gränsen ligger just där" },
      { type: "p", html: "Bakom värdet ligger en ganska enkel tanke. Ett material som både kan fjädra tillbaka som ett gummiband och sakta flyta som sirap har en karakteristisk tid, Maxwelltiden, som säger hur länge man måste vänta innan flytandet tar över från fjädrandet. Den får man genom att dividera viskositeten med materialets styvhet." },
      { type: "p", html: "För bergarter är styvheten omkring 10<sup>11</sup>&nbsp;Pa. Sätter man in en viskositet på 10<sup>30</sup>&nbsp;Pa·s hamnar Maxwelltiden på storleksordningen 10<sup>19</sup>&nbsp;sekunder — hundratals miljarder år, alltså mer än femtio gånger jordens ålder på 4,5&nbsp;miljarder år. Ett sådant material hinner aldrig flyta märkbart, hur länge planeten än får stå. Den samlade deformationen blir försumbar, och då är ”trögflytande vätska” helt enkelt fel beskrivning: kroppen är stel." },
      { type: "quote", html: "”Det föreslagna övre viskositetsintervallet är ett tidsskaleberoende kriterium, ovanför vilket ett material beter sig som en i praktiken stel kropp i stället för som ett deformerbart, trögflytande kontinuum.”", cite: "Masaki Yoshida, ur pressmaterialet till studien" },

      { type: "h2", text: "Varför det spelar roll" },
      { type: "p", html: "Ett tak för viskositeten är inte bara en kuriositet. Varje datorsimulering av jordens inre måste ge plattorna ett viskositetsvärde, och väljer man ett orimligt högt fastnar hela modellen i det tillstånd geofysiker kallar stelt lock: ett obrutet, orörligt ytskal helt utan plattgränser — ungefär som Mars har i dag. Med ett realistiskt tak blir det i stället möjligt att räkna på hur ett sådant lock kan spricka upp och börja röra sig. Yoshida menar själv att frågan om varför plattrörelsen på jorden kom i gång efter att det stela locket bildats hänger nära ihop med hans resultat." },
      { type: "p", html: "Om taket verkligen ligger vid 10<sup>30</sup>&nbsp;Pa·s får framtida mätningar och modeller avgöra. Osäkerheten på två tiopotenser åt vardera hållet är stor — men den är i alla fall ändlig, vilket 10<sup>70</sup> aldrig var." },

      { type: "fact", title: "Visste du?", items: [
        "En pascalsekund (Pa·s) är SI-enheten för viskositet. Den anger hur stor skjuvspänning som krävs för att få intilliggande skikt i ett material att glida förbi varandra med en viss hastighetsskillnad.",
        "Beckdroppsförsöket vid University of Queensland startade 1927 och har på nästan hundra år gett nio droppar. Det finns beck kvar i tratten för mer än ett sekel till.",
        "Jordens mantel har en viskositet kring 10<sup>21</sup>&nbsp;Pa·s, ungefär 10<sup>24</sup> gånger vattnets. Ändå rör sig materialet i den i samma takt som naglar växer — några centimeter om året.",
        "Åt andra hållet finns också en gräns. Det kvark-gluonplasma som skapas när tunga atomkärnor krockar i partikelacceleratorer är det mest lättflytande ämne vi känner till, och tros ligga nära en teoretisk undre gräns för hur liten inre friktion ett ämne kan ha."
      ]}
    ]
  },

  {
    id: "2026-08-01-storsta-galaxen",
    date: "2026-08-01",
    title: "Astronomer hittar äntligen ytterkanten på universums största kända galax — 1,7 miljoner ljusår tvärs över, och den växer fortfarande",
    deck: "Vintergatan är ungefär 100 000 ljusår bred. Galaxen IC 1101 är sjutton gånger så stor — men exakt var den tar slut har ingen kunnat säga, eftersom en galax inte har någon skarp kant. Nu har ett forskarlag på Kanarieöarna samlat drygt åtta timmars ljus med ett teleskop på La Palma, räknat bort ljusspillet från 250 förgrundsstjärnor och för första gången pekat ut gränsen.",
    category: "Astronomi",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-08-01-storsta-galaxen.jpg",
    imageAlt: "Tre bilder av samma galax bredvid varandra, tagna med olika djup. Längst till vänster (SDSS) syns ett brusigt blåaktigt fält där galaxen bara anas som ett svagt ljust dis. I mitten (DESI Legacy Survey) framträder galaxen tydligare som ett avlångt gulvitt ljussken omgivet av mindre galaxer. Längst till höger (INT) syns den djupaste bilden, där galaxens ljus breder ut sig märkbart längre ut över ett kornigt fält av små blå och gula punkter.",
    imageCredit: "Bild: C. Marrero-de la Rosa m.fl. (2026), arXiv:2607.15340 (CC BY 4.0)",
    tags: ["astronomi", "galaxer", "kosmologi", "teleskop", "ljusår", "galaxhopar", "optik", "gravitation", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-astronomers-full-size-largest-galaxy.html" },
      { name: "arXiv (förhandspublicering, Instituto de Astrofísica de Canarias)", url: "https://arxiv.org/abs/2607.15340" }
    ],
    research: {
      citation: "C. Marrero-de la Rosa, I. Trujillo, M. Montes m.fl., ”How large can galaxies be? Ultra-deep imaging of IC 1101, the most extended known galaxy”, arXiv:2607.15340 (förhandspublicering, 2026)",
      url: "https://doi.org/10.48550/arXiv.2607.15340"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 1.2 Storheter, enheter och prefix", href: "katalog.html#fy1-1.2" },
        { label: "Fysik nivå 2 · mätnoggrannhet och systematiska fel" }
      ],
      fragor: [
        "Galaxen har ingen skarp kant — ljuset bara tunnas ut. Ändå anger forskarna en diameter. Vad är det egentligen de har mätt, och vad måste man komma överens om innan ett sådant värde betyder något?",
        "Ju längre man exponerar, desto svagare ljus syns — och desto längre ut verkar galaxen sträcka sig. Betyder det att galaxen växer när vi tittar bättre, eller att vår mätning gör det? Vad säger det om skillnaden mellan ett föremål och en mätning av det?",
        "Forskarna räknade bort ljuset från över 250 förgrundsstjärnor innan de litade på resultatet. Vad skulle hända med den uppmätta kanten om de räknade bort för mycket? För lite? Vilken sorts fel är det — slumpmässigt eller systematiskt?"
      ]
    },
    body: [
      { type: "p", html: "Var slutar en galax? Frågan låter enkel, men den är förvånansvärt svår att besvara. En galax är ingen boll med en yta — den är hundratals miljarder stjärnor som blir glesare och glesare utåt, tills ljuset till slut drunknar i natthimlens eget svaga sken. Nu har ett forskarlag lett från Instituto de Astrofísica de Canarias tagit de djupaste bilderna någonsin av IC 1101, den mest utsträckta galax vi känner till, och för första gången kunnat peka ut var den faktiskt tar slut: omkring 260&nbsp;kiloparsec ut från mitten, vilket ger en diameter på ungefär 1,7&nbsp;miljoner ljusår." },

      { type: "h2", text: "Sjutton Vintergator på bredden" },
      { type: "p", html: "IC 1101 ligger ungefär en miljard ljusår bort, mitt i galaxhopen Abell 2029. Den är vad astronomer kallar hopens ljusstarkaste galax: den tunga jätten i mitten av en galaxhop, som under miljarder år har slukat sina grannar. Med en diameter på omkring 520&nbsp;kiloparsec är den runt sjutton gånger bredare än Vintergatan, som mäter ungefär 100&nbsp;000 ljusår tvärs över. Stjärnorna innanför den nyfunna kanten väger tillsammans omkring 3,4&nbsp;biljoner solmassor (3,4&nbsp;·&nbsp;10<sup>12</sup>) — ungefär femtio gånger mer stjärnmassa än hela Vintergatan." },

      { type: "h2", text: "Problemet: en galax har ingen skarp kant" },
      { type: "p", html: "Att IC 1101 är enorm har varit känt länge. Redan 1991 följde astronomer dess ljus ut till drygt 600&nbsp;kiloparsec, men ingen kunde avgöra hur mycket av det svaga skenet som var galaxen själv och hur mycket som var det diffusa ljushav av stjärnor som slitits loss ur andra galaxer och driver fritt mellan hopens medlemmar. För att komma vidare använde forskarna ett kantbegrepp som utvecklats under de senaste åren: en galax kant är inte ett tvärt slut, utan ett tydligt brott i hur snabbt ljuset avtar utåt — ett brott som dessutom brukar sammanfalla med att färgen och formen ändrar sig på samma ställe. Gränsen markerar var galaxens egen stjärnkropp övergår i den yttre kappa som byggts upp av material den ätit upp." },

      { type: "h2", text: "Drygt åtta timmar — och 250 stjärnor som måste bort" },
      { type: "p", html: "Bilderna togs med Wide Field Camera på det 2,5&nbsp;m stora Isaac Newton-teleskopet på La Palma, i två färgfilter och med sammanlagt drygt åtta timmars exponering. Slutresultatet når ner till omkring 30&nbsp;magnituder per kvadratbågsekund — ett mått på ytljusstyrka som innebär att de svagaste partierna lyser flera tusen gånger svagare än den mörka natthimlen själv." },
      { type: "p", html: "Den stora svårigheten på den nivån är inte att samla ihop tillräckligt med ljus, utan att bli av med fel ljus. Varje ljusstark stjärna i förgrunden smetar ut ett svagt sken över hela bildfältet, och det skenet är lätt att förväxla med en galax yttersta utkanter. Forskarna byggde därför en noggrann modell av precis hur teleskopet sprider ljuset från en enda punktkälla — kalibrerad på allt från svaga stjärnor till en riktigt ljusstark referensstjärna — och räknade sedan bort bidraget från över 250 förgrundsstjärnor innan de vågade tro på det som blev kvar." },

      { type: "h2", text: "Åtta svaga skuggor avslöjar en pågående måltid" },
      { type: "p", html: "När stjärnljuset var borträknat framträdde åtta svaga, osymmetriska strukturer runt galaxen. Flera av dem ligger precis där röntgenobservationer har visat att den heta gasen i galaxhopen skvalpar runt i ett spiralmönster — ett tecken på att hopens centrum har skakats om av en tidigare kollision. Strukturerna tolkas som spår av material som fortfarande är på väg in i IC 1101." },
      { type: "image", src: "nyheter/bilder/2026-08-01-storsta-galaxen-2.jpg",
        alt: "En djup astronomisk bild i mörka toner där de ljusstarka förgrundsstjärnorna räknats bort. I vänstra halvan syns IC 1101 som ett stort avlångt gulvitt ljussken, omgivet av dussintals mindre galaxer som gula och blå fläckar mot ett kornigt fält. Vita pilar märkta med bokstäverna A till H pekar ut svaga, diffusa strukturer runt om galaxen.",
        caption: "Med förgrundsstjärnornas ljus borträknat framträder åtta svaga strukturer (A–H) runt IC 1101 — spår av material som galaxen fortfarande drar till sig.",
        credit: "Bild: C. Marrero-de la Rosa m.fl. (2026), arXiv:2607.15340 (CC BY 4.0)" },
      { type: "quote", html: "”Med en bekräftad diameter på omkring 520 kiloparsec står IC 1101 som den största galax som är känd hittills. Ändå visar dess utkanter tydliga tecken på pågående massuppbyggnad, vilket tyder på att dess utsträckning fortfarande växer.”", cite: "Ur studien, Marrero-de la Rosa m.fl. (2026)" },

      { type: "h2", text: "Hur stor kan en galax bli?" },
      { type: "p", html: "Studiens titel är just den frågan, och svaret verkar tills vidare vara: större än så här har vi ännu inte sett — men taket är inte nått. IC 1101 lägger sig i den absoluta ytterkanten av det samband mellan massa och storlek som galaxer i allmänhet följer, och den sitter på den plats i universum där en galax har allra bäst förutsättningar att växa. Abell 2029 väger sammanlagt omkring 8,5&nbsp;·&nbsp;10<sup>14</sup> solmassor, och hopens medlemmar faller sakta in mot mitten där jätten väntar. Galaxer växer nämligen inte i första hand genom att bilda nya stjärnor, utan genom att äta varandra." },
      { type: "p", html: "Resultatet ligger tills vidare som en förhandspublicering på arXiv och har ännu inte genomgått en vetenskaplig tidskrifts kollegiala granskning." },

      { type: "fact", title: "Visste du?", items: [
        "En parsec är ungefär 3,26&nbsp;ljusår och en kiloparsec 1&nbsp;000 parsec, alltså drygt 3&nbsp;260&nbsp;ljusår. IC 1101:s 520&nbsp;kiloparsec motsvarar därmed cirka 1,7&nbsp;miljoner ljusår.",
        "Ljuset behöver 1,7&nbsp;miljoner år på sig för att ta sig tvärs över IC 1101. Samma resa rakt genom Vintergatan klaras av på omkring 100&nbsp;000 år.",
        "Vissa radiogalaxer sprutar ut jetstrålar och lober som sträcker sig över mer än tio miljoner ljusår och är alltså vidare än IC 1101 — men de består av utströmmande plasma, inte av stjärnor. Bland galaxernas stjärnkroppar är IC 1101 rekordhållaren.",
        "Ytljusstyrka mäts i magnituder per kvadratbågsekund. Skalan är omvänd: ju högre tal, desto svagare ljus — och fem steg uppåt motsvarar hundra gånger svagare sken."
      ]}
    ]
  },

  {
    id: "2026-07-31-fotonisk-tidskristall",
    date: "2026-07-31",
    title: "Fysiker bygger en kristall som upprepar sig i tiden i stället för i rummet — och halverar hur mycket energi ljuset läcker på vägen",
    deck: "En vanlig kristall — som salt eller diamant — upprepar exakt samma mönster om och om igen genom rummet. Nu har ett internationellt forskarlag för första gången byggt kristallens tidsmässiga motsvarighet: ett material vars optiska egenskaper i stället upprepar sig i tiden — och använt det för att nästan halvera hur mycket energi terahertzljus förlorar på väg genom det.",
    category: "Vågor",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-31-fotonisk-tidskristall.jpg",
    imageAlt: "En konstnärlig gestaltning i ett mörkt rum: en gulorange ljusvåg med tydliga vågtoppar rör sig in från vänster mot en genomskinlig kub uppbyggd av ett nätverk av blå och rödaktiga vågmönster, prickad med ljusa punkter. Bilden illustrerar hur en terahertzpuls sätter en fotonisk tidskristall i svängning.",
    imageCredit: "Bild: B. Schröder/HZDR (pressbild, konstnärlig gestaltning)",
    tags: ["optik", "vågor", "terahertz", "metamaterial", "plasmon", "halvledare", "laser", "kristaller", "fysik 2"],
    sources: [
      { name: "Helmholtz-Zentrum Dresden-Rossendorf, HZDR (pressmeddelande)", url: "https://www.hzdr.de/db/Cms?pNid=99&pOid=78295" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-photonic-crystals-ultrafast-terahertz-range.html" },
      { name: "EurekAlert!", url: "https://www.eurekalert.org/news-releases/1138063" }
    ],
    research: {
      citation: "T. Guo et al., ”Plasmonic metamaterial time crystal”, Nature (2026)",
      url: "https://doi.org/10.1038/s41586-026-10825-9"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 2.3 Harmonisk svängning", href: "katalog.html#fy2-2.3" },
        { label: "Fysik nivå 2 · 2.6 Resonans", href: "katalog.html#fy2-2.6" },
        { label: "Fysik nivå 2 · 4.1 Elektromagnetiska vågor och ljus", href: "katalog.html#fy2-4.1" }
      ],
      fragor: [
        "En vanlig kristall upprepar sitt mönster i rummet. Här upprepas i stället materialets egenskaper i tiden. Vad betyder ”periodisk” egentligen — och varför är det inte självklart att en period i tiden ska ge samma sorts effekter som en period i rummet?",
        "Efter en stund vände energiförlusterna till förstärkning: ljuset kom ut starkare än man väntat. Betyder det att energi skapades? Var kommer energin ifrån, och vad i uppställningen måste man titta på för att svara?",
        "Att driva systemet exakt en gång per ljusvåg är avgörande — vid fel takt händer ingenting. Vilket vardagligt fenomen bygger på samma princip, och vad avgör där hur mycket energi som byggs upp?"
      ]
    },
    body: [
      { type: "p", html: "En vanlig kristall — ett saltkorn, en diamant, is i en fönsterruta — är byggd av atomer som upprepar exakt samma mönster om och om igen genom rummet. Den regelbundenheten är själva grunden för hur kristaller styr allt från ljus till elektroner. Nu har ett internationellt forskarlag, lett från École polytechnique i Frankrike tillsammans med Collège de France och Helmholtz-Zentrum Dresden-Rossendorf (HZDR) i Tyskland, för första gången byggt kristallens tidsmässiga motsvarighet: ett material vars optiska egenskaper upprepar sig i tiden i stället för i rummet. Studien, publicerad i tidskriften <em>Nature</em> den 30&nbsp;juli 2026, visar att ljus som färdas genom materialet läcker mindre än hälften så mycket energi som väntat." },

      { type: "h2", text: "En kristall som upprepar sig i tiden, inte i rummet" },
      { type: "p", html: "Fotoniska kristaller — konstgjorda material med ett periodiskt mönster i mikrometerskala — har använts i årtionden för att styra ljus, ungefär som ett vanligt kristallgitter av atomer styr elektroner: vissa våglängder studsar tillbaka, andra släpps rakt igenom. Idén bakom den nya studien är att göra samma sak, fast med tiden som den periodiska variabeln i stället för rummet. I stället för att bygga strukturen i rader och kolumner genom materialet fick forskarna materialets optiska egenskaper — hur starkt det bryter och reflekterar ljus — att svänga upp och ner om och om igen, exakt en gång per ljusvåg." },

      { type: "h2", text: "Ett galler av guld ovanpå en halvledarkristall" },
      { type: "p", html: "Testbädden är ett så kallat metamaterial: ett konstgjort material vars egenskaper kommer från en noggrant designad mikrostruktur snarare än från de enskilda atomerna. Ovanpå en några millimeter stor kristall av indium-antimonid — en halvledare med ovanligt lättrörliga elektroner — lade forskarna ett tunt isolerande lager och därpå ett galler av guldremsor, var och en tunnare än ett hårstrå. Under remsorna kan elektronerna i halvledaren svänga kollektivt fram och tillbaka som en så kallad ytplasmon: en vågrörelse hos elektronernas laddning som är instängd nära ytan och kopplar mycket starkt till ljus." },
      { type: "p", html: "För att sätta systemet i svängning använde forskarna TELBE, en anläggning vid HZDR:s elektronaccelerator ELBE som kan skicka ut extremt kraftfulla och fasstabila pulser av terahertzljus — ljus med en frekvens någonstans mellan mikrovågor och infrarött. En puls vid 0,69&nbsp;THz (ungefär 690&nbsp;miljarder svängningar per sekund) med ett toppfält på omkring 40&nbsp;kV/cm fick elektronerna att accelerera så hårt att deras effektiva massa — hur trögt de rör sig genom materialet — periodvis förändrades med upp till 80&nbsp;%, exakt i takt med ljusvågens svängningar. Den regelbundna, periodiska förändringen är precis det som definierar en tidskristall." },
      { type: "quote", html: "”Genom att utvidga fotoniska kristaller från rummet till tiden öppnar vi en ny dimension för att kontrollera ljus — och en ny väg mot förstärkning och lasereffekt.”", cite: "Tingwen Guo, doktorand och försteförfattare till studien, École polytechnique" },

      { type: "h2", text: "Från läckage till förstärkning" },
      { type: "p", html: "Normalt läcker en ytplasmon energi som värme nästan lika fort som den bildas — ungefär som en studsande boll som tappar fart för varje studs. Men efter omkring 21&nbsp;pikosekunder (21 biljondels sekunder) av den periodiska drivningen passerade systemet en kritisk gräns i sin fysik, vad forskarna kallar en exceptionell punkt, där förlusterna vände till en inbyggd förstärkning. Energiförlusterna minskade med omkring 50&nbsp;%, vilket syns i att den så kallade linjebredden hos ytplasmonen — ett mått på hur snabbt svängningen dör ut — smalnade av från omkring 70 till 40&nbsp;gigahertz. Teoretiker vid Collège de France kunde återskapa hela förloppet i en matematisk modell, en karta som forskarna nu kan använda för att förutsäga och styra effekten i framtida experiment." },
      { type: "quote", html: "”TELBE:s unika förmåga att generera terahertzpulser med högt fält och stabil fas var avgörande. Utan den här infrastrukturen hade det varit omöjligt att uppnå den koherenta, ultrasnabba modulering som krävs för tidskristall-tillståndet.”", cite: "Jan-Christoph Deinert, ansvarig för TELBE-anläggningen, HZDR" },

      { type: "h2", text: "Ett gap som väntar på att fyllas" },
      { type: "p", html: "Terahertzljus befinner sig i vad fysiker brukar kalla terahertzgapet: ett frekvensband som är för snabbt för vanlig elektronik och för långsamt för vanlig optik, vilket gör det ovanligt svårt att både skapa, förstärka och styra. Ändå är det just det bandet som framtidens höghastighetskommunikation och ultrasnabba optiska databehandling behöver ta sig an. En förstärkningseffekt som uppstår ur materialets egen periodicitet, i stället för från en traditionell laserpump, skulle kunna bli grunden för kompakta terahertzlasrar som fungerar vid rumstemperatur — något som i dag kräver dyr utrustning nedkyld till några kelvin över absoluta nollpunkten." },
      { type: "quote", html: "”Terahertzområdet utgör gränslandet mellan elektronikens och fotonikens teknologier. Det är fullt av möjligheter för både vetenskapen och samhället, men fortfarande tekniskt underutvecklat jämfört med sina elektriska och fotoniska motsvarigheter.”", cite: "Yannis Laplace, forskare vid École polytechnique, Laboratoriet för bestrålade fasta ämnen (LSI)" },

      { type: "fact", title: "Visste du?", items: [
        "Terahertzgapet: ljus med frekvenser mellan ungefär 0,1 och 10&nbsp;THz ligger i ett ingenmansland mellan elektronikens och optikens verktygslådor — notoriskt svårt att både skapa och styra.",
        "Namnet ”tidskristall” myntades redan 2012 av fysikern Frank Wilczek, men för en helt annan idé: kvantsystem vars grundtillstånd spontant upprepar sig i tiden utan någon yttre påverkan, en variant som några år senare byggdes i bland annat kvantdatorer. Den ”fotoniska tidskristallen” i den här studien delar bara namnet — här är det en yttre laserpuls, inte spontan symmetribrytning, som tvingar fram periodiciteten.",
        "TELBE-anläggningen drivs av ELBE, en partikelaccelerator vid HZDR som normalt används för allt från kärnfysik till materialforskning."
      ]}
    ]
  },

  {
    id: "2026-07-30-hattformens-kirala-ljus",
    date: "2026-07-30",
    title: "Matematikens ökända ”hatt”-form gömmer en extra hemlighet — den får ljus att bilda mönster som aldrig speglar sig själva",
    deck: "2023 chockade en hobbymatematiker världen med en enda kakelform som kan täcka ett golv i oändlighet utan att mönstret någonsin upprepas — en lösning på det femtio år gamla Einstein-problemet i matematiken. Nu har fysiker i Tokyo skickat laserljus genom nanostrukturer byggda av samma form och upptäckt att den bryter mot en optisk grundregel: ljuset som diffrakteras bildar ett mönster som aldrig går att lägga exakt ovanpå sin egen spegelbild.",
    category: "Optik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-30-hattformens-kirala-ljus.jpg",
    imageAlt: "En bild i två delar. Till vänster syns hattformens aperiodiska kakelmönster i rosa och ljusblått, med svarta konturlinjer mellan de trettonsidiga bitarna. Till höger syns det verkliga diffraktionsmönster som uppstod när forskarna sköt laserljus genom en nanostor version av samma mönster: ett virvlande, pinwheel-likt mönster av gröna, röda och blå ljusstrålar som strålar ut från en ljusstark gulvit mittpunkt mot en svart bakgrund.",
    imageCredit: "Bild: Institute of Industrial Science, The University of Tokyo (pressbild)",
    tags: ["optik", "vågor", "diffraktion", "kiralitet", "kvasikristaller", "matematik", "nanoteknik", "polarisation", "fysik 1", "fysik 2"],
    sources: [
      { name: "Institute of Industrial Science, The University of Tokyo (pressmeddelande)", url: "https://www.iis.u-tokyo.ac.jp/en/news/5114" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-einstein-problem-reveals-unexpected-physics.html" },
      { name: "EurekAlert!", url: "https://www.eurekalert.org/news-releases/1137592" }
    ],
    research: {
      citation: "Y. Moritake, M. Takiguchi, T. Aihara, M. Notomi, ”Chiral diffraction from aperiodic monotile structure”, Nature Communications 17, 6085 (2026)",
      url: "https://doi.org/10.1038/s41467-026-75023-7"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 2.14 Diffraktion och interferens", href: "katalog.html#fy2-2.14" },
        { label: "Fysik nivå 2 · 4.2 Ljus, diffraktion och interferens", href: "katalog.html#fy2-4.2" },
        { label: "Symmetri och geometri" }
      ],
      fragor: [
        "Ett vanligt gitter har ett mönster som upprepar sig, och ger skarpa ljuspunkter i bestämda riktningar. Hattmönstret upprepar sig aldrig — ändå syns ett tydligt mönster i det diffrakterade ljuset. Vad säger det om vad ljuset egentligen ”läser av” i strukturen?",
        "Formen är kiral: den går inte att lägga ovanpå sin spegelbild. Ge exempel på kirala föremål i vardagen. Varför kan just den egenskapen ge olika svar för höger- och vänstervridet ljus, när mönstrets storlek är densamma åt båda hållen?",
        "Formen upptäcktes 2023 av en hobbymatematiker som löste ett rent matematiskt pussel, utan tanke på optik. Fysiken hittades först tre år senare, av någon som byggde formen och lyste på den. Vad säger det om förhållandet mellan matematik och fysik — och om att forska på sådant som ännu inte har någon användning?"
      ]
    },
    body: [
      { type: "p", html: "I mars 2023 chockade den brittiske hobbymatematikern David Smith vetenskapsvärlden med en enda kakelform, kallad ”hatten”, som kan täcka ett golv i oändlighet utan att mönstret någonsin upprepar sig — en lösning på det femtio år gamla ”Einstein-problemet” i matematiken. Nu har fysiker vid Tokyos universitet skickat laserljus genom nanostora mönster byggda av just den formen, och upptäckt att den gömmer på en helt egen optisk effekt: ljuset som studsar ut bildar ett mönster som aldrig går att lägga exakt ovanpå sin egen spegelbild. Studien publicerades i tidskriften <em>Nature Communications</em> den 30&nbsp;juli 2026." },

      { type: "h2", text: "En enda form som aldrig upprepar sig" },
      { type: "p", html: "En vanlig kakelplatta — en sexkant i ett bikakemönster eller en kvadrat i ett schackbräde — täcker ett golv i ett mönster som upprepar sig regelbundet hur långt man än fortsätter. Matematiker har länge undrat om det går att hitta en enda form som gör motsatsen: täcker ett obegränsat plan utan att mönstret någonsin upprepas exakt, oavsett hur man vrider och speglar formen. Frågan kallas Einstein-problemet — inte efter fysikern Albert Einstein, utan ett ordskämt på tyskans <em>ein Stein</em>, ”en sten” eller ”en bricka”. I mars 2023 löste Smith gåtan tillsammans med matematikerna Craig Kaplan, Joseph Myers och Chaim Goodman-Strauss: en trettonsidig form, ”hatten”, byggd av åtta likadana fyrhörningar (så kallade kites) hämtade ur ett hexagonalt bikakegitter." },
      { type: "quote", html: "”Det som är särskilt fascinerande med hattformen är att mönstret ser oregelbundet ut vid första anblicken, men i själva verket är uppbyggt utifrån ett bikakegitter.”", cite: "Yuto Moritake, docent och försteförfattare till studien, Institute of Industrial Science, Tokyos universitet" },

      { type: "h2", text: "Laser genom en nanostor hatt" },
      { type: "p", html: "Forskarlaget, lett av Moritake och professor Masaya Notomi vid Institute of Industrial Science, ville se om formens ovanliga geometri också kunde ge upphov till ny fysik. De tillverkade nanostora mönster av hattformen i kiselnitridfilmer med elektronstrålelitografi — en teknik som ritar mönster med en styrd stråle av elektroner i stället för ljus, för att nå ner till skalor tusen gånger tunnare än ett hårstrå. När forskarna sedan sköt laserljus genom strukturerna böjdes ljuset av (diffrakterade) i tydliga, virvlande ”pinwheel”-mönster — ett beteende som aldrig setts i vanliga kvasikristaller." },
      { type: "quote", html: "”Vi fann att diffraktionsmönstren själva blir kirala, eftersom strukturen saknar spegelsymmetri. Den här typen av optiskt svar skiljer sig fundamentalt från det man ser i vanliga kvasikristallina material.”", cite: "Masaya Notomi, professor, Institute of Industrial Science, Tokyos universitet" },

      { type: "h2", text: "En händighet du kan se i ljuset" },
      { type: "p", html: "Kiralitet betyder att ett föremål inte går att lägga exakt ovanpå sin egen spegelbild — precis som en vänsterhand aldrig riktigt passar i en högerhandske. De flesta kvasikristallina mönster, som de berömda Penrose-mosaikerna, har en inbyggd spegelsymmetri som gör att de ser likadana ut oavsett hur man vänder på dem. Hattmönstret saknar den symmetrin, och forskarna visade att det faktiskt syns i ljuset: diffraktionsmönstret ändrades beroende på både riktningen och den cirkulära polarisationen (vridriktningen) hos det infallande laserljuset, och en spegelvänd kopia av samma nanostruktur gav ett spegelvänt optiskt svar — en symmetristyrd effekt som varken kräver magnetfält eller exotiska material, bara formens egen geometri." },
      { type: "quote", html: "”De här resultaten öppnar en ny forskningsriktning kring mötet mellan kvasiperiodisk ordning och kiralitet. Hattmönster ger en plattform för att utforska optiska fenomen som uppstår ur samspelet mellan symmetri, kiralitet och aperiodicitet.”", cite: "Yuto Moritake" },

      { type: "h2", text: "Från matematisk nyfikenhet till framtida optik" },
      { type: "p", html: "Forskarna hoppas att hattinspirerade mönster kan bli användbara i teknik som styr och manipulerar ljus, till exempel komponenter för polarisationskontroll och avancerade optiska enheter. Framför allt är fyndet ett exempel på hur en till synes abstrakt, ren matematisk upptäckt — en enda form som löser en pusselgåta — kan visa sig gömma helt ny, oväntad fysik så snart någon faktiskt bygger den i verkligheten och skiner ljus på den." },

      { type: "fact", title: "Visste du?", items: [
        "Namnet ”Einstein-problemet” har inget med fysikern Albert Einstein att göra — det är ett ordskämt på tyskans <em>ein Stein</em>, ”en sten” (eller ”en bricka”), eftersom problemet handlar om att hitta EN enda kakelform.",
        "Hattformen upptäcktes av hobbymatematikern David Smith, som experimenterade med pappersutklipp för hand innan han tog hjälp av tre professionella matematiker för att bevisa att formen verkligen aldrig upprepar sig.",
        "Kiselnitridfilmerna forskarna använde mönstrades med elektronstrålelitografi — samma sorts nanotillverkningsteknik som används för att rita mönster i datorchip."
      ]}
    ]
  },

  {
    id: "2026-07-29-neutronernas-spegelvarld",
    date: "2026-07-29",
    title: "Forskare letar efter en dold spegelvärld i 25 miljarder neutroner — och hittar inget spår",
    deck: "En snart sjuttio år gammal hypotes i partikelfysiken föreslår att varje partikel har en osynlig spegelpartner i en parallell materievärld som bara märks via gravitationen — och som räknas som en kandidat för mörk materia. Vid Paul Scherrer-institutet i Schweiz har forskare med hittills oöverträffad precision letat efter tecken på att neutroner läcker in i denna spegelvärld, genom att studera omkring 25 miljarder neutroner under flera månader — utan att hitta ett enda spår.",
    category: "Partikelfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-29-neutronernas-spegelvarld.jpg",
    imageAlt: "Forskarna Bernhard Lauss (till vänster, i svart t-shirt med rosa nyckelband) och Geza Zsigmond (till höger, i mörkblå t-shirt) studerar utrustningen vid Paul Scherrer-institutets ultrakalla neutronkälla i Schweiz. Lauss pekar uppåt mot rostfria stålrör och ventiler i apparaturen, medan Zsigmond ser i samma riktning. I bakgrunden syns fler delar av anläggningen med blåa ventiler och stora tankar.",
    imageCredit: "Foto: Markus Fischer/Paul Scherrer Institute PSI (pressbild)",
    tags: ["partikelfysik", "kärnfysik", "modern fysik", "mörk materia", "neutroner", "symmetri", "kvantfysik", "grundläggande fysik", "fysik 2"],
    sources: [
      { name: "Paul Scherrer Institute PSI (pressmeddelande)", url: "https://www.psi.ch/en/news/media-releases/neutrons-dont-disappear-into-the-mirror-world" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-ultracold-neutrons-dont-mirror-world.html" }
    ],
    research: {
      citation: "N. J. Ayres et al., ”New high-sensitivity search for neutron to mirror-neutron oscillations at the PSI UCN source”, Physical Review Letters (2026)",
      url: "https://doi.org/10.1103/2qck-n6mb"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 9.1 Atomkärnan", href: "katalog.html#fy1-9.1" },
        { label: "Fysik nivå 2 · 4.6 Våg-partikeldualitet och de Broglies hypotes", href: "katalog.html#fy2-4.6" },
        { label: "Naturvetenskapligt arbetssätt — hypotesprövning" }
      ],
      fragor: [
        "Experimentet hittade ingenting. Ändå publicerades det i en av fysikens mest ansedda tidskrifter. På vilket sätt är ett nollresultat ett resultat — och varför är det ofta svårare att få publicerat än ett fynd?",
        "För att ett nollresultat ska betyda något måste forskarna veta hur litet något de skulle ha kunnat se. Varför räcker det inte att säga ”vi hittade inget”? Jämför med att leta efter en nyckel i gräset med respektive utan ficklampa.",
        "Hypotesen om en spegelvärld väcktes för att naturen visade sig bryta mot en symmetri man trodde var självklar. Är det god vetenskap att uppfinna en osynlig värld för att rädda en symmetri? Vad skulle krävas för att idén ska förkastas helt?"
      ]
    },
    body: [
      { type: "p", html: "Ibland är den mest spännande vetenskapliga upptäckten att inte hitta någonting alls. Vid Paul Scherrer-institutet (PSI) i Schweiz har forskare under flera månader fångat och räknat omkring 25&nbsp;miljarder ultrakalla neutroner i jakten på tecken på en hypotetisk, gömd spegelvärld av materia. Resultatet, publicerat i <em>Physical Review Letters</em> den 28&nbsp;juli 2026, är entydigt: inget spår av spegelvärlden syntes — vilket utesluter en tidigare misstänkt anomali med rekordprecision." },

      { type: "h2", text: "En spegelbild av hela universum" },
      { type: "p", html: "Idén om en spegelvärld går tillbaka till 1950-talet. När fysiker 1957 experimentellt visade att den svaga kärnkraften bryter mot spegelsymmetri, paritet — naturens lagar ser alltså inte likadana ut i en spegel som i verkligheten — föreslog teoretiker en lösning: kanske finns det en helt separat uppsättning partiklar, spegelelektroner, spegelprotoner och spegelneutroner, som tillsammans med vår vanliga materia återställer symmetrin i universum som helhet. Spegelpartiklarna skulle växelverka med vår värld nästan uteslutande via gravitationen, vilket också gör dem till en föreslagen kandidat för mörk materia — den osynliga massa som håller ihop galaxer men som aldrig har observerats direkt." },
      { type: "quote", html: "”I grunden känner de båda partikeltyperna bara av varandras närvaro genom gravitationskraften.”", cite: "Geza Zsigmond, forskare vid PSI Center for Neutron and Muon Sciences" },

      { type: "h2", text: "Neutronen som kan försvinna" },
      { type: "p", html: "Gravitationen är en alldeles för svag kraft för att mäta enskilda partiklar med, så forskarna behövde ett annat sätt att komma åt hypotesen. Lösningen låg i en av kvantmekanikens mer bisarra möjligheter: om en spegelneutron existerar och är nästan identisk med den vanliga neutronen, skulle en neutron i princip kunna oscillera fram och tillbaka mellan de två tillstånden — försvinna in i spegelvärlden ett ögonblick och dyka upp igen i vår värld strax därpå. Ett sådant läckage vore i praktiken mätbart: fångar man en samling neutroner i en behållare skulle några av dem sakta men säkert försvinna in i spegelvärlden och aldrig komma tillbaka, som ett läckage i en tät tank." },
      { type: "quote", html: "”Det går inte att bevisa att spegelpartiklar existerar enbart genom gravitationsväxelverkan. Därför inriktade vi oss i stället på en annan egenskap hos dem — att neutrala partiklar borde kunna oscillera fram och tillbaka mellan vår vanliga materievärld och spegelvärlden.”", cite: "Bernhard Lauss, gruppledare för ultrakall neutronfysik, PSI Center for Neutron and Muon Sciences" },

      { type: "h2", text: "25 miljarder neutroner i en fälla av stål" },
      { type: "p", html: "Tillsammans med ETH Zürich och Jagellonska universitetet i Krakow byggde forskarna en fälla av icke-magnetiskt rostfritt stål vid PSI:s källa för ultrakalla neutroner. Där bromsas neutroner ner så mycket att de rör sig i en takt jämförbar med gångfart och kan studsa mot väggarna i en behållare i stället för att flyga rakt igenom den. Var femte minut fångade forskarna omkring 1,5&nbsp;miljoner ultrakalla neutroner i behållaren, lät dem sitta instängda i cirka 200&nbsp;sekunder och räknade sedan hur många som fanns kvar. Under experimentets gång varierade de systematiskt styrkan hos ett omgivande magnetfält, mellan 5 och 109&nbsp;μT (bara någon procent av jordens eget magnetfält), eftersom teorin förutspår att oscillationen skulle förstärkas vid en viss fältstyrka där energinivåerna i vår värld och spegelvärlden matchar varandra. Proceduren upprepades om och om igen under flera månader, tills forskarna sammanlagt hade studerat omkring 25&nbsp;miljarder neutroner." },

      { type: "h2", text: "Inget läckage — ett nej som pekar framåt" },
      { type: "p", html: "Resultatet blev entydigt: neutronerna försvann inte snabbare än vad redan kända effekter, som neutronens naturliga radioaktiva sönderfall, förutspår — oavsett vilken magnetfältstyrka forskarna testade. Mätningen är särskilt betydelsefull eftersom tidigare experiment vid institutet Laue-Langevin i Frankrike hade väckt ny spekulation om just en sådan anomali. PSI:s mätning, med hittills oöverträffad precision, utesluter nu det tidigare misstänkta området med 99,98&nbsp;% konfidens." },
      { type: "quote", html: "”Vi såg inga som helst tecken på sådana oscillationer.”", cite: "Bernhard Lauss" },
      { type: "p", html: "Ett nollresultat kan låta som en anti-klimax, men i fysiken är det ofta lika värdefullt som en upptäckt. Genom att stänga en dörr tvingas teoretiker leta efter andra förklaringar till mörk materia, och om spegelvärldshypotesen fortfarande ska hålla måste den formuleras om för att undvika precis det experiment PSI-teamet nu har genomfört. Resultatet, som byggde på två doktorsavhandlingar vid ETH Zürich och flera studenters arbete, sätter samtidigt ett nytt riktmärke för framtida sökningar efter oscillerande neutroner världen över." },
      { type: "quote", html: "”Genom att begränsa utrymmet för vissa spekulationer visar vi de teoretiska fysikerna att de måste utforska nya vägar.”", cite: "Geza Zsigmond" },

      { type: "fact", title: "Visste du?", items: [
        "Ultrakalla neutroner rör sig så långsamt — bara några meter per sekund, ungefär gångfart — att de kan studsa mot väggarna i en behållare i stället för att flyga rakt igenom dem, vilket gör det möjligt att fånga och räkna dem en och en.",
        "Idén om spegelpartiklar föreslogs på 1950-talet, efter att fysikerna Chien-Shiung Wu och medarbetare 1957 experimentellt visade att den svaga kärnkraften bryter mot spegelsymmetri (paritet) — ett av de mest överraskande resultaten i modern fysik.",
        "Neutronen har en egen liten gåta sedan tidigare: mätt instängd i en behållare (som i det här experimentet) verkar den i genomsnitt leva några sekunder kortare än när den mäts i en stråle av fritt flygande neutroner — en avvikelse som ännu inte är fullt förklarad."
      ]}
    ]
  },

  {
    id: "2026-07-28-ljusets-envagsgata",
    date: "2026-07-28",
    title: "Forskare bryter en av ljusets grundregler — med en film som läser ”Y” framifrån och ”N” bakifrån",
    deck: "Normalt spelar det ingen roll åt vilket håll ljus passerar genom ett material — resultatet blir detsamma. Forskare vid Cornell University har nu visat att tunna filmer av vanliga halvledarkristaller kan bryta den regeln, så att samma film ser fullständigt olika ut beroende på om man betraktar den framifrån eller bakifrån.",
    category: "Optik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-28-ljusets-envagsgata.jpg",
    imageAlt: "Doktoranden Thomas Ugras (till vänster) och professor Richard Robinson undersöker halvledarprover i ett materialvetenskapligt laboratorium vid Cornell University. Ugras bär en blå skyddshandske och placerar ett prov i en mätapparat medan Robinson, i rutig skjorta och glasögon, ser på.",
    imageCredit: "Foto: Allison Usavage/Duffield Engineering, Cornell University (pressbild)",
    tags: ["optik", "vågor", "ljus", "polarisation", "kiralitet", "halvledare", "nanomaterial", "fotonik", "kvantteknik", "fysik 1", "fysik 2"],
    sources: [
      { name: "Cornell Chronicle (pressmeddelande)", url: "https://news.cornell.edu/stories/2026/07/researchers-break-light-symmetry-simple-materials" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-simple-semiconductor-front-symmetry.html" }
    ],
    research: {
      citation: "T. J. Ugras et al., ”Non-reciprocal linearly polarized light in simple media”, Nature Materials (2026)",
      url: "https://doi.org/10.1038/s41563-026-02660-0"
    },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 4.4 Ljusets brytning", href: "katalog.html#fy2-4.4" },
        { label: "Fysik nivå 2 · 2.8 Reflexion, transmission och stående vågor", href: "katalog.html#fy2-2.8" },
        { label: "Fysik nivå 2 · 4.1 Elektromagnetiska vågor och ljus", href: "katalog.html#fy2-4.1" }
      ],
      fragor: [
        "En envägsspegel i ett förhörsrum släpper ju också igenom ljus åt ett håll men inte åt det andra. Ändå bryter den INTE mot regeln forskarna bröt. Vad är det egentligen som skiljer — vad beror envägsspegelns effekt på?",
        "Regeln säger att ljus ska bete sig likadant åt båda hållen genom ett material. Varför är det en så djupt rotad förväntan i fysiken? Fundera på vad som skulle hända med energin om man enkelt kunde bygga ett material som släpper igenom ljus åt ena hållet men blockerar det åt det andra.",
        "Effekten uppstod när två svaga fenomen gjordes ungefär lika starka och började samverka. Varför kan ”lika starka” vara mer avgörande än ”så starka som möjligt”? Kan ni komma på andra fall i fysiken där två effekter måste balanseras för att något nytt ska hända?"
      ]
    },
    body: [
      { type: "p", html: "Det finns en regel som gäller för nästan allt ljus som passerar genom vanliga material: det spelar ingen roll åt vilket håll ljuset går. Skickar man in ljus framifrån och bakifrån får man exakt samma resultat. Regeln kallas optisk reciprocitet, och den sitter så djupt i de flesta material att man normalt måste ta till kraftiga magnetfält eller avancerade konstgjorda nanostrukturer, metamaterial, för att bryta den. Nu har forskare vid Cornell University i USA visat att den går att bryta med betydligt enklare medel — tunna filmer av vanliga halvledarkristaller, tillverkade genom att låta dem självorganisera sig i en lösning. Studien publicerades i tidskriften <em>Nature Materials</em> den 27&nbsp;juli 2026." },

      { type: "h2", text: "En osynlig envägsgata för ljus" },
      { type: "p", html: "Den vanligaste tillämpningen av brutet reciprocitet är den optiska isolatorn: en komponent som släpper igenom laserljus i en riktning men blockerar det i den motsatta, ungefär som en backventil för ljus. Isolatorer skyddar känsliga lasrar mot störande reflexer som annars skulle studsa tillbaka in i dem, men de bygger nästan alltid på magneto-optiska material som måste omges av ett yttre magnetfält — opraktiskt att klämma in i en liten fotonisk krets. Forskarlaget, lett av doktoranden Thomas Ugras och professor Richard Robinson, ville se om samma sorts effekt gick att få fram utan magneter, i material som redan är enkla att tillverka." },
      { type: "quote", html: "”Föreställ dig persienner där solljus kommer in genom de vågräta ribborna, men att samma persienner, sedda från andra hållet, släpper igenom ljuset som om ribborna stod lodrätt — helt omvänt. Normalt krävs komplicerade metamaterial eller yttre magnetfält för det beteendet, men vi visar att det går att uppnå i enkla, lösningsprocessade halvledar-nanokluster.”", cite: "Richard Robinson, professor i materialvetenskap och teknik, Cornell University" },

      { type: "h2", text: "Snurrande nanokristaller i lösning" },
      { type: "p", html: "Nyckeln var något forskargruppen kallar <em>magic-size clusters</em> — nanokristaller med ett så exakt antal atomer att de blir ovanligt stabila och självmant ordnar sig i spiralformade strukturer, tillverkade av kadmiumsulfid, kadmiumselenid eller kadmiumtellurid. Spiralformen gör materialet kiralt: precis som en vänsterhand aldrig går att lägga exakt ovanpå en högerhand går en kiral kristallstruktur inte att överlappa med sin spegelbild. Kirala material är sedan tidigare kända för att absorbera vänster- och högercirkulärt polariserat ljus olika mycket, så kallad cirkulär dikroism, men den effekten är normalt mycket svagare än materialets vanliga, riktningsberoende absorption av rakt polariserat ljus, linjär dikroism. Ugras upptäckte att när de två effekterna görs ungefär lika starka i samma material samverkar de i stället med varandra — och resultatet blir just den riktningsberoende asymmetri som persienn-liknelsen beskriver." },

      { type: "h2", text: "En film som läser ”Y” framifrån och ”N” bakifrån" },
      { type: "p", html: "För att visa hur påtaglig effekten kan bli mönstrade forskarna en film där olika delar hade olika kiral vridriktning och orientering. Resultatet var en yta som visar helt olika mönster beroende på från vilket håll den betraktas." },
      { type: "quote", html: "”Kontrollerar och mönstrar man ett material på ett underlag, och varierar dess kirala vridriktning och orientering i rummet, går det att skapa en film som ser olika ut beroende på om den betraktas framifrån eller bakifrån. Vi har gjort en film som läser ’Y’ framifrån och ’N’ bakifrån. Konceptet går lätt att bygga ut, till exempel för att skapa hologram med unikt utseende åt varje håll.”", cite: "Thomas Ugras, doktorand och försteförfattare till studien, Cornell University" },

      { type: "h2", text: "Från hologram till kvantteknik" },
      { type: "p", html: "Forskarna pekar ut flera möjliga tillämpningar: skärmar och hologram som visar olika bilder beroende på betraktningsvinkel, optisk kryptering där ett meddelande bara går att läsa från ett håll, kompakta fotoniska komponenter som styr ljussignaler i en bestämd riktning utan magneter, och polarisationsbaserad kvantteknik. Det mest slående är enligt Robinson ändå inte att man hittat ett nytt exotiskt material, utan att den ovanliga optiska egenskapen kan uppstå i material forskare redan vet hur man tillverkar i stor skala — vilket öppnar ett betydligt bredare fält för morgondagens icke-reciproka fotonik." },

      { type: "fact", title: "Visste du?", items: [
        "Optisk reciprocitet, ibland kallad Helmholtz reciprocitet, gäller matematiskt för praktiskt taget alla vanliga material — den bryts normalt bara av magnetfält, tidsvarierande fält eller olinjära effekter.",
        "Kadmiumsulfid, kadmiumselenid och kadmiumtellurid är väletablerade halvledare som redan används i bland annat solceller och lysdioder.",
        "Kiralitet betyder att ett föremål inte går att lägga exakt ovanpå sin spegelbild — precis som en hand. Ordet kommer av grekiskans <em>cheir</em>, ”hand”."
      ]}
    ]
  },

  {
    id: "2026-07-27-zink-70-magnetisk-gata",
    date: "2026-07-27",
    title: "Fysiker löser en decennier gammal gåta i atomkärnan — och skärper receptet för hur guld bildas i rymden",
    deck: "I decennier har vissa atomkärnor avgett fler lågenergetiska gammastrålar än teorin kunnat förklara. Nu har ett internationellt forskarlag lett från Michigan State University spårat överskottet till magnetiska – inte elektriska – övergångar inuti kärnan zink-70, ett fynd som kan skärpa beräkningarna av hur tunga grundämnen som guld och platina bildas i supernovor och kolliderande neutronstjärnor.",
    category: "Kärnfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-27-zink-70-magnetisk-gata.jpg",
    imageAlt: "Vetenskaplig illustration av atomkärnan zink-70 som ett klot av röda och blå kulor (protoner och neutroner), med gula magnetfältlinjer som böjer sig kring kärnan och fyra vågiga gammastrålar (märkta med den grekiska bokstaven gamma) som strålar ut åt olika håll mot en mörkblå bakgrund.",
    imageCredit: "Illustration: Facility for Rare Isotope Beams (FRIB), Michigan State University (pressbild)",
    tags: ["kärnfysik", "atomfysik", "gammastrålning", "magnetism", "nukleosyntes", "astrofysik", "neutronstjärnor", "supernova", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-magnetic-clues-atomic-nuclei-elements.html" },
      { name: "SciTechDaily", url: "https://scitechdaily.com/scientists-solve-a-decades-old-mystery-inside-atomic-nuclei/" },
      { name: "Facility for Rare Isotope Beams, Michigan State University (pressrum)", url: "https://frib.msu.edu/news-center" }
    ],
    research: { citation: "E. K. Ronning et al., ”Magnetic Character of the Low-Energy Enhancement in 70Zn”, Nature (2026)", url: "https://doi.org/10.1038/s41586-026-10758-3" },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 9.1 Atomkärnan", href: "katalog.html#fy1-9.1" },
        { label: "Fysik nivå 2 · 4.8 Bohrs atommodell och energinivåer", href: "katalog.html#fy2-4.8" },
        { label: "Fysik nivå 1 · 9.2 Massdefekt och bindningsenergi", href: "katalog.html#fy1-9.2" }
      ],
      fragor: [
        "En exciterad atom sänder ut synligt ljus när den faller till ett lägre tillstånd. En exciterad atomkärna gör samma sak, men fotonerna har miljontals gånger högre energi. Vad säger den skillnaden om hur energinivåerna inuti kärnan förhåller sig till dem i elektronskalen?",
        "Forskarna kunde inte mäta ”elektrisk eller magnetisk” direkt. I stället jämförde de två olika vägar in i samma kärna och konstaterade att resultatet blev likadant. Hur kan en jämförelse avgöra en fråga som ingen enskild mätning kunde svara på?",
        "En detalj om vilken sorts strålning en kärna sänder ut ändrar hur mycket guld modellerna förutsäger att universum ska innehålla. Följ kedjan bakåt: varför påverkar sannolikheten för gammautsändning hur tunga grundämnen som hinner byggas upp?"
      ]
    },
    body: [
      { type: "p", html: "Djupt inne i en atomkärna gömmer sig en av kärnfysikens mest ihärdiga gåtor. I decennier har forskare sett att vissa atomkärnor, när de faller ner från ett exciterat tillstånd, sänder ut betydligt fler lågenergetiska gammafotoner än teorin förutspår – ett fenomen som fått namnet lågenergiförhöjning (<em>low-energy enhancement</em>, LEE). Ingen har kunnat visa exakt vad som orsakar överskottet. Nu har ett internationellt forskarlag, lett från Facility for Rare Isotope Beams (FRIB) vid Michigan State University i USA, spårat gåtan till dess källa i atomkärnan zink-70: överskottet beror på magnetiska, inte elektriska, övergångar. Studien publicerades i tidskriften <em>Nature</em> den 24&nbsp;juli 2026." },

      { type: "h2", text: "En strålning som inte borde finnas" },
      { type: "p", html: "En atomkärna som nyss bildats i en kärnreaktion, eller som just genomgått ett radioaktivt sönderfall, befinner sig ofta i ett exciterat, energirikt tillstånd. På vägen ner till sitt mest stabila grundtillstånd sänder den ut energiöverskottet som gammastrålning – elektromagnetisk strålning med fotonenergier hundratusentals till miljontals gånger högre än synligt ljus. Varje sådan övergång klassificeras som antingen <em>elektrisk</em> eller <em>magnetisk</em>, beroende på vad som förändras inuti kärnan. Vid en elektrisk övergång omfördelas kärnans positiva laddning – protonerna förskjuts i förhållande till varandra. Vid en magnetisk övergång är det i stället partiklarnas egen inbyggda magnetism, deras spinn och rörelse i banor, som byter riktning. Teoretiska modeller förutsäger noga hur ofta vardera typen ska inträffa vid olika energier. Men i experiment dyker det gång på gång upp fler gammafotoner vid låga energier än någon modell klarar av att räkna fram – och ingen har kunnat säga med säkerhet om överskottet är elektriskt eller magnetiskt till sin natur." },
      { type: "quote", html: "”Den här lågenergiförhöjningen förutsågs inte av teorin, så det var något av en chock för forskarsamhället när den först observerades.”", cite: "Eleanor Ronning, huvudförfattare till studien, tidigare doktorand vid FRIB/Michigan State University, numera postdoktor vid INFN i Padova, Italien" },

      { type: "h2", text: "Två olika vägar in i samma kärna" },
      { type: "p", html: "För att komma åt svaret behövde forskarna ett sätt att skilja de elektriska och magnetiska bidragen åt – något ingen tidigare lyckats göra tillräckligt rent för zink-70. Lösningen byggde på ett smart trick med kärnans moderisotop, koppar-70. Precis som en atomkärna kan ha flera exciterade tillstånd finns koppar-70 i två varianter: dess vanliga grundtillstånd och ett långlivat, energirikt så kallat isomertillstånd. Båda sönderfaller genom betasönderfall – en neutron omvandlas till en proton och kärnan skickar iväg en elektron – till samma dotterkärna, zink-70, men de fyller upp olika energinivåer i den nybildade kärnan. Genom att jämföra gammastrålningen från de två sönderfallsvägarna fick forskarna två oberoende fönster in i exakt samma atomkärna." },
      { type: "p", html: "Vid FRIB separerades de två koppar-70-tillstånden med hjälp av anläggningens precisionsinstrument LEBIT (Low Energy Beam and Ion Trap) – en så kallad Penningfälla som normalt används för att väga atomkärnor med extrem noggrannhet, men som forskarna nu för första gången använde för att rena fram enbart det önskade tillståndet ur jonstrålen. Gammastrålningen som sedan sändes ut fångades upp av detektorn SuN (Summing NaI), och forskarna räknade fram varje sönderfallsvägs så kallade gammastrålningsstyrkefunktion – ett mått på hur troligt det är att kärnan sänder ut en gammafoton vid en given energi – med två oberoende analysmetoder som kontrollerade varandra." },

      { type: "h2", text: "Magnetismen vinner" },
      { type: "p", html: "När de två styrkefunktionerna jämfördes gav de forskarna sitt svar. Hade lågenergiförhöjningen varit elektrisk till sin natur borde den ha sett olika ut beroende på vilket av de två koppartillstånden som sönderfallit, eftersom elektriska övergångar är känsliga för hur kärnans protoner är fördelade i just det tillståndet. I stället var förhöjningen praktiskt taget identisk längs båda vägarna in i zink-70 – ett tydligt fingeravtryck för en magnetisk övergång, som saknar den känsligheten. Resultatet gav forskarna det första direkta experimentella beviset för att lågenergiförhöjningen i zink-70 domineras av magnetisk dipolstrålning." },
      { type: "quote", html: "”Vi använde en ny experimentell teknik som kombinerar specialiserade instrument på ett sätt som i praktiken utnyttjade hela anläggningen.”", cite: "Sean Liddick, professor vid FRIB och Michigan State University, Ronnings handledare" },

      { type: "h2", text: "Kärnfysikens svar formar stjärnornas periodiska system" },
      { type: "p", html: "Upptäckten är mer än en detalj i kärnfysikens karta. Grundämnen tyngre än järn kan inte bildas genom vanlig fusion inuti en stjärna – det kräver i stället att atomkärnor fångar in neutroner, en efter en, i en snabb kedjereaktion som kallas r-processen. Den äger rum i universums mest extrema miljöer: supernovaexplosioner och kolliderande neutronstjärnor. Varje gång en kärna fångar en neutron blir den tyngre och mer energirik, och måste göra sig av med överskottsenergin som just gammastrålning innan den hinner fånga nästa neutron. Hur troligt det är att detta sker – särskilt vid låga energier, där lågenergiförhöjningen gör sig som starkast gällande – styr alltså takten i hela kedjan, ända upp till de tyngsta grundämnena som guld, platina och uran. Har teoretiska modeller fel typ av strålning i sina beräkningar riskerar hela den förutsagda mängden av dessa grundämnen att bli fel. Med facit i hand – magnetisk, inte elektrisk, strålning – kan kärnfysiker nu bygga mer träffsäkra modeller för hur universums tyngsta atomer en gång skapades." },

      { type: "fact", title: "Visste du?", items: [
        "Gammastrålning är den mest energirika formen av elektromagnetisk strålning – samma familj som synligt ljus och radiovågor, men med fotonenergier hundratusentals till miljontals gånger högre.",
        "Studien byggde på ett samarbete mellan 25 institutioner i USA, Kanada, Italien, Tyskland, Norge och Sydkorea.",
        "Nästan alla grundämnen tyngre än järn i universum – guld och platina inräknat – tros ha bildats via r-processens snabba neutroninfångning i kolliderande neutronstjärnor och supernovor."
      ]}
    ]
  },

  {
    id: "2026-07-26-altermagnetism",
    date: "2026-07-26",
    title: "Fysiker hedras för en tredje sorts magnetism — dold i över hundra år",
    deck: "I mer än ett sekel har magnetiska material delats in i två familjer: ferromagneter, som kylskåpsmagneten, och antiferromagneter, som inte drar till sig ett gem. Nu tilldelas tre forskare ett av Europas finaste fysikpris för att ha bevisat att det finns en tredje, tidigare dold klass — altermagnetism.",
    category: "Magnetism",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-26-altermagnetism.jpg",
    imageAlt: "Vetenskaplig illustration av en altermagnetisk kristallstruktur: rosa och turkosa droppformade ytor (isospinn-densitet) sväller upp ovanför ett gitter av lila och blå atomkulor, vridna i förhållande till varandra i stället för spegelvända.",
    imageCredit: "Illustration: Libor Šmejkal / Johannes Gutenberg-universitetet Mainz (pressbild)",
    tags: ["ellära", "magnetism", "spinntronik", "kristallfysik", "kondenserade materiens fysik", "elektroner", "spinn", "europhysics-priset", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-prize-honors-discovery-altermagnetism-fundamental.html" },
      { name: "Johannes Gutenberg-universitetet Mainz (pressmeddelande)", url: "https://press.uni-mainz.de/2026-europhysics-prize-honors-discovery-of-a-third-fundamental-class-of-magnetism/" },
      { name: "European Physical Society (officiellt tillkännagivande)", url: "https://eps.org/2026-eps-europhysics-prize-for-outstanding-achievement-in-condensed-matter-physics-announced/" }
    ],
    research: { citation: "L. Šmejkal, J. Sinova, T. Jungwirth, ”Beyond Conventional Ferromagnetism and Antiferromagnetism: A Phase with Nonrelativistic Spin and Crystal Rotation Symmetry”, Physical Review X 12, 031042 (2022)", url: "https://doi.org/10.1103/PhysRevX.12.031042" },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 3.1 Magnetism och magnetfält", href: "katalog.html#fy2-3.1" },
        { label: "Fysik nivå 1 · 7.3 Elektrisk ström", href: "katalog.html#fy1-7.3" },
        { label: "Vetenskaplig klassificering" }
      ],
      fragor: [
        "En altermagnet har inget yttre magnetfält alls — den drar inte till sig ett gem — men är ändå strikt magnetiskt ordnad inuti. Hur kan något vara magnetiskt ordnat utan att vi märker det utifrån? Vad är det egentligen vi mäter när vi håller upp en magnet mot ett material?",
        "Skillnaden mot en vanlig antiferromagnet är att grannatomernas omgivning är vriden i stället för spegelvänd. Varför kan en så liten geometrisk detalj ge helt andra egenskaper, när själva spinnen är ordnade likadant?",
        "Materialen fanns redan och hade studerats i decennier — det som var nytt var att någon insåg att de utgör en egen klass. När är det befogat att införa en ny kategori i naturvetenskapen, och när är det bara ett specialfall av något känt? Vad vinner forskningen på en ny indelning?"
      ]
    },
    body: [
      { type: "p", html: "I mer än hundra år har fysiker delat in magnetiska material i två väletablerade familjer: ferromagneter, som kylskåpsmagneten hemma i köket, och antiferromagneter, som inte drar till sig ett gem men ändå är strikt ordnade på atomnivå. Nu tilldelas tre forskare 2026 års Europhysics-pris — ett av Europas mest ansedda utmärkelser inom kondenserade materiens fysik, utdelat av European Physical Society — för att ha bevisat att det finns en tredje, tidigare dold klass av magnetism. Priset offentliggjordes 24&nbsp;juli 2026 och går till Jairo Sinova vid Johannes Gutenberg-universitetet i Mainz, samt Libor Šmejkal och Tomas Jungwirth vid Fysikinstitutet vid Tjeckiska vetenskapsakademin i Prag." },

      { type: "h2", text: "Två kända sorters magnetism" },
      { type: "p", html: "Varje elektron bär på en egen liten magnetisk kompassnål: dess spinn. I ett ferromagnetiskt material, som järn, pekar alla dessa spinn åt samma håll och lägger ihop sig till ett kraftfullt yttre magnetfält. I ett antiferromagnetiskt material pekar spinnen hos grannatomerna i stället åt motsatt håll och släcker ut varandra fullständigt, så att materialet varken drar till sig eller stöts bort av en vanlig magnet. I över hundra år antog fysiker att de här två mönstren — samverkande eller motverkande spinn — var allt som fanns att hitta." },

      { type: "h2", text: "Den gömda tredje sorten" },
      { type: "p", html: "Altermagneter har, precis som antiferromagneter, ingen nettomagnetisering: spinn upp och spinn ner tar ut varandra helt. Skillnaden ligger i kristallens geometri. Hos en vanlig antiferromagnet omges atomen med spinn upp av exakt samma atommönster som atomen med spinn ner — bara spegelvänt eller förskjutet i sidled. Hos en altermagnet är omgivningen i stället vriden, roterad ett bestämt antal grader jämfört med sin motsvarighet. Den till synes obetydliga skillnaden får elektronernas energitillstånd att dela upp sig efter spinnriktning, precis som i en ferromagnet — trots att materialet utåt sett är helt magnetiskt neutralt." },
      { type: "quote", html: "”Att upptäcka att en helt ny magnetisk fas hade legat dold i mer än hundra år visar att även de mest utforskade områdena inom fysiken fortfarande kan rymma grundläggande överraskningar.”", cite: "Jairo Sinova, professor vid Johannes Gutenberg-universitetet Mainz, en av pristagarna" },

      { type: "h2", text: "Från symmetriteori till riktiga kristaller" },
      { type: "p", html: "Sinova, Šmejkal och Jungwirth lade fram en fullständig symmetriklassificering av altermagnetism 2022, i en artikel i <em>Physical Review X</em>, och pekade samtidigt ut mer än 200 kandidatmaterial. Förutsägelsen bekräftades snabbt: forskargrupper världen över mätte den spinnuppdelade elektronstrukturen experimentellt, bland annat i manganditellurid (MnTe) och kromantimonid (CrSb), med hjälp av fotoelektronspektroskopi och elektriska transportmätningar. Sedan dess har fältet vuxit explosionsartat — enligt prismotiveringen har det ursprungliga arbetet redan inspirerat mer än 1&nbsp;000 uppföljande studier." },

      { type: "h2", text: "Varför det spelar roll för framtidens elektronik" },
      { type: "p", html: "Vanlig elektronik lagrar och flyttar information genom att styra elektroners laddning. Spinntronik försöker i stället utnyttja elektronernas spinnriktning, vilket kan ge snabbare kretsar som slösar mindre energi. Problemet har varit att välja mellan två alternativ som båda har en nackdel: ferromagneter ger spinnpolariserad ström men läcker ett störande magnetfält som gör det svårt att packa komponenter tätt, medan antiferromagneter är kompakta och okänsliga för yttre magnetfält men saknar just den spinnpolariserade strömmen elektroniken behöver. Altermagneter tycks kunna kombinera fördelarna hos båda: inget läckande magnetfält, men ändå en spinnpolariserad ström och magnetisk växling som kan ske långt snabbare än i dagens material — egenskaper som gör dem till en lovande kandidat för nästa generations minnen och logikkretsar." },

      { type: "fact", title: "Visste du?", items: [
        "Spinn är elektronens egen inbyggda rörelsemängdsmoment — ofta liknat vid en mikroskopisk kompassnål som antingen pekar ”upp” eller ”ner”.",
        "Mer än 200 material har föreslagits vara altermagneter sedan 2022, och forskningsfältet har redan gett upphov till över 1&nbsp;000 vetenskapliga uppföljningsstudier.",
        "Priset delas ut i september 2026 vid konferensen CMD32 i Graz, Österrike — samma prisserie har delats ut sedan 1975."
      ]}
    ]
  },

  {
    id: "2026-07-25-varmestralar",
    date: "2026-07-25",
    title: "Forskare får värme att bete sig som ljus i en optisk fiber — vid rumstemperatur",
    deck: "I vanliga material sprids värme åt alla håll, ungefär som ringar på vattnet. I en kristall av bor-arsenid har forskare vid University of California, Los Angeles i stället sett värmen forma sig till skarpa, riktade strålar — ett beteende som tidigare bara observerats nära den absoluta nollpunkten.",
    category: "Termodynamik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-25-varmestralar.jpg",
    imageAlt: "Ett falskfärgat värmekartsbild i orange och gult som visar hur värme sprider sig i ett kristallprov av bor-arsenid vid 300 K: sex skarpa, mörka strålar strålar ut symmetriskt från en central mörk punkt, med en skala som visar 100 nanometer.",
    imageCredit: "Bild: H-Lab, UCLA Samueli School of Engineering (pressbild)",
    tags: ["termodynamik", "vågor", "värme", "fononer", "kristallfysik", "halvledare", "bor-arsenid", "nanoteknik", "värmeledning", "fysik 1", "fysik 2"],
    sources: [
      { name: "UCLA Samueli School of Engineering (pressmeddelande)", url: "https://newsroom.ucla.edu/releases/ucla-engineers-observe-quantum-heat-waves-room-temperature" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-quantum-room-temperature.html" }
    ],
    research: { citation: "M. Li, H. Wu, Z. Qin, C. Su, H. D. Nguyen, Y. Hu, ”Phonon focusing at room temperature”, Nature Physics (2026)", url: "https://doi.org/10.1038/s41567-026-03335-y" },
    larare: {
      moment: [
        { label: "Fysik nivå 1 · 6.1 Värme och temperatur", href: "katalog.html#fy1-6.1" },
        { label: "Fysik nivå 2 · 2.7 Pulser, vågor och utbredningshastighet", href: "katalog.html#fy2-2.7" },
        { label: "Fysik nivå 2 · 2.10 Ljudvågor och stående vågor i rör", href: "katalog.html#fy2-2.10" }
      ],
      fragor: [
        "Värme i ett fast material är atomernas vibrationer. Varför sprider sig värme normalt åt alla håll, trots att varje enskild vibration rör sig i en bestämd riktning? Vad är det som suddar ut riktningen?",
        "I bor-arsenid krockar vibrationerna ovanligt sällan, och då behåller de sin riktning. Jämför med att gå rakt fram genom en folktom korridor respektive genom en fullpackad festlokal. Hur långt hinner man i vardera fallet innan man tappat sin ursprungliga riktning?",
        "Vi säger att värme ”leds bort”. Om värmen i stället kan styras längs bestämda banor — vad förändras då i hur man skulle designa kylningen av en processor? Vilken av storheterna temperatur och värme är det egentligen som transporteras?"
      ]
    },
    body: [
      { type: "p", html: "Värme brukar sprida sig åt alla håll på en gång, ungefär som ringar på vattnet efter en sten. Men i en kristall av halvledarmaterialet bor-arsenid har forskare vid University of California, Los Angeles (UCLA) sett värmen bete sig helt annorlunda: den samlar sig i skarpa, riktade strålar som skjuter ut längs bestämda riktningar i kristallgittret — ett beteende som tidigare bara har setts vid temperaturer nära den absoluta nollpunkten. Nu har forskarna, ledda av professor Yongjie Hu, för första gången observerat fenomenet vid rumstemperatur. Studien publicerades i tidskriften <em>Nature Physics</em> den 23&nbsp;juli." },

      { type: "h2", text: "Värme som ljud i ett fast ämne" },
      { type: "p", html: "Värme i ett fast material transporteras av fononer — kvantiserade ljudvågor som uppstår när atomerna i kristallgittret vibrerar kollektivt. Ju varmare materialet är, desto mer vibrerar atomerna, och det är just vibrationerna som vandrar vidare genom kristallen och för värmen framåt. Normalt krockar fononerna hela tiden med varandra, med föroreningar och med gittrets egna oregelbundenheter. Varje krock slumpar om riktningen, och efter otaliga krockar har all information om ursprungsriktningen gått förlorad — värmen sprids diffust åt alla håll, ungefär som doften av nybryggt kaffe sprids i ett rum." },

      { type: "h2", text: "Ett ovanligt tyst kristallgitter" },
      { type: "p", html: "Bor-arsenid är ett undantag. Hans forskargrupp upptäckte redan 2018 att materialet har en ovanligt hög värmeledningsförmåga, och orsaken är att dess fononer sprids betydligt mer sällan än i de flesta andra material. Med en nyutvecklad metod för att kartlägga temperatur i nanoskala kunde forskarna nu jämföra hur värmen rör sig i vanliga material med hur den rör sig i bor-arsenid. I vanliga material bildade värmen cirkelrunda mönster, precis som väntat. I bor-arsenid bildade den i stället skarpa strålar som pekade längs kristallens egna symmetririktningar — sex, åtta eller fyra strålar, beroende på vilket kristallplan forskarna undersökte." },
      { type: "quote", html: "”Det här är en grundläggande observation som gör att vi kan tänka nytt kring hur värme hanteras. Genom att göra det möjligt att styra, fokusera och omfördela värme med nanometerprecision vid rumstemperatur lägger upptäckten grunden för det forskarna kallar kvantvärmeteknik.”", cite: "Yongjie Hu, professor i maskin- och rymdteknik, UCLA" },

      { type: "h2", text: "Som ljus i en optisk fiber" },
      { type: "p", html: "Strålarna höll ihop över en sträcka av omkring en mikrometer — en tusendels millimeter — och forskarna tror att effekten kan sträcka sig ännu längre, uppemot tiotals mikrometer. Det är fortfarande en mikroskopisk sträcka, men fullt tillräcklig för många av dagens elektroniska, fotoniska och kvantbaserade komponenter. Forskarna liknar effekten vid hur en optisk fiber leder ljus längs en bestämd bana i stället för att låta det spridas fritt: i bor-arsenid tycks kristallgittret på samma sätt kunna leda värme längs förutbestämda banor. Att fenomenet visar sig hålla i sig vid 300&nbsp;K — omkring 27&nbsp;°C, alltså vanlig rumstemperatur — och inte bara nära 0&nbsp;K, är det som gör upptäckten praktiskt användbar." },

      { type: "h2", text: "Svalare chip och känsligare sensorer" },
      { type: "p", html: "Överhettning är ett växande problem i allt tätare packad elektronik, inte minst i kretsarna som driver AI-beräkningar. Kan värme styras längs bestämda banor i stället för att bara ledas bort efter att den redan spridit sig ut, öppnas nya sätt att kyla mikroelektronik, rymdelektronik och framtida kvantkomponenter mer effektivt. Hu pekar också på möjligheten att finjustera hur fononer växelverkar med elektroner och andra energibärare — en väg mot känsligare sensorer och stabilare kvantinformationsteknik." },

      { type: "fact", title: "Visste du?", items: [
        "Fononer är kvantiserade ljudvågor i ett fast material — ett sätt att beskriva hur atomerna i ett kristallgitter vibrerar kollektivt, med samma vågmatematik som beskriver andra vågrörelser.",
        "300&nbsp;K motsvarar cirka 27&nbsp;°C. Fenomenet, som kallas fononfokusering, har tidigare bara observerats vid temperaturer nära absoluta nollpunkten, 0&nbsp;K (−273,15&nbsp;°C).",
        "Bor-arsenid visade sig ha extremt hög värmeledningsförmåga redan 2018, i en studie från samma forskargrupp publicerad i tidskriften Science."
      ]}
    ]
  },

  {
    id: "2026-07-24-fryst-optisk-fiber",
    date: "2026-07-24",
    time: "09:00",
    title: "Forskare fryser en optisk fiber till −196 °C — och kopplar ihop ljus och ljud tusen gånger starkare",
    deck: "En vätskefylld optisk fiber blir spröd och svårhanterlig i en vanlig labbmiljö. Genom att frysa den i flytande kväve har forskare vid Max Planck-institutet för ljusets fysik i Tyskland i stället gjort den robust — och samtidigt kopplat ihop ljus och ljud mer än tusen gånger starkare än i en vanlig glasfiber.",
    category: "Vågor",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-24-fryst-optisk-fiber.jpg",
    imageAlt: "Konstnärlig 3D-illustration av en genomskinlig, frostig optisk fiber där en röd ljusvåg färdas genom kärnan och fortsätter ut som en fri vågform i luften ovanför fibern.",
    imageCredit: "Illustration: Philipp Denghe / Max Planck Institute for the Science of Light (pressbild)",
    tags: ["vågor", "optik", "ljud", "brillouin-spridning", "materialfysik", "fotonik", "kvantteknik", "fiberoptik", "termodynamik", "fysik 2"],
    sources: [
      { name: "idw-online (pressmeddelande, Max Planck-institutet för ljusets fysik)", url: "https://idw-online.de/en/news874871" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-frozen-fiber-couples-strongly-standard.html" }
    ],
    research: { citation: "S. Seiderer, A. Geilen, L. Sliwa, L. Gan, X. Qi, M. Chemnitz, M. A. Schmidt, B. Stiller, ”Giant Brillouin gain in frozen CS₂ capillaries”, Optica 13, 1415–1422 (2026)", url: "https://doi.org/10.1364/OPTICA.600056" },
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 2.10 Ljudvågor och stående vågor i rör", href: "katalog.html#fy2-2.10" },
        { label: "Fysik nivå 2 · 2.7 Pulser, vågor och utbredningshastighet", href: "katalog.html#fy2-2.7" },
        { label: "Fysik nivå 2 · 4.1 Elektromagnetiska vågor och ljus", href: "katalog.html#fy2-4.1" }
      ],
      fragor: [
        "Ljudvågorna i fibern svänger i gigahertzområdet — miljontals gånger snabbare än vad örat kan uppfatta. På vilket sätt är det ändå ljud? Vad är det som avgör om en vågrörelse ska kallas ljud, och vad har frekvensen med saken att göra?",
        "Texten säger först att vätskans mjuka struktur kopplar starkare till ljus än stelt glas gör. Sedan fryser forskarna vätskan till fast form — och kopplingen blir ännu starkare. Är det en motsägelse? Vad skulle behöva stämma om båda påståendena ska kunna vara sanna samtidigt?",
        "Minnet fungerar genom att en ljussignal tillfälligt lagras som en ljudvåg och läses av igen. Varför är det praktiskt att växla från ljus till ljud för att lagra något en kort stund? Jämför utbredningshastigheterna."
      ]
    },
    body: [
      { type: "p", html: "En optisk fiber med flytande kärna är känslig utrustning — vätskan läcker, avdunstar och gör fibern svår att hantera utanför ett kontrollerat laboratorium. Forskare vid Max Planck-institutet för ljusets fysik (MPL) i Erlangen, tillsammans med Leibniz universitet i Hannover och Leibniz-institutet för fotonisk teknik i Jena, har löst det problemet på ett oväntat sätt: genom att frysa vätskan till is. Resultatet, publicerat i tidskriften <em>Optica</em> den 20&nbsp;juli, är en fiber som inte bara blir robust och lätthanterlig utan som dessutom kopplar samman ljus och ljud mer än 1&nbsp;000 gånger starkare än en vanlig glasfiber." },

      { type: "h2", text: "En glaskapillär fylld med flytande koldisulfid" },
      { type: "p", html: "Fibern är i grunden en tunn glaskapillär, fylld med den flytande kemikalien koldisulfid (CS₂) i stället för fiberns vanliga fasta glaskärna. En sådan vätskefylld fiber (förkortat LiCOF, liquid-core optical fiber) leder ljus ungefär som en vanlig fiber, men vätskans mjukare, mer eftergivliga struktur gör att ljuset kopplar mycket starkare till materialets naturliga ljudvågor än vad stelt glas tillåter. Kopplingen kallas Brillouin-Mandelstam-spridning, efter fysikerna Léon Brillouin och Leonid Mandelstam som båda förutspådde fenomenet på 1920-talet: ljus som färdas genom ett material kan växelverka med materialets egna, extremt högfrekventa ljudvågor — så kallat hypersoniskt ljud, med frekvenser i gigahertzområdet, långt bortom det mänskliga örats gräns på omkring 20&nbsp;kilohertz." },

      { type: "h2", text: "Fryst till is — men fortfarande en ledare för både ljus och ljud" },
      { type: "p", html: "Problemet med vätskefyllda fibrer har varit att de är bräckliga och svåra att koppla samman med annan utrustning. Forskarnas lösning var att kyla en sektion av fibern i flytande kväve, ner till −196&nbsp;°C — långt under koldisulfidens fryspunkt på omkring −112&nbsp;°C — så att vätskekärnan övergår i fast, glasartad is." },
      { type: "quote", html: "”Den springande punkten är att den frusna delen av fibern behåller sin förmåga att leda ljus. Och inte nog med det — både den flytande och den frusna delen av fibern leder också hypersoniska ljudvågor.”", cite: "Simon Seiderer, doktorand och en av försteförfattarna, Max Planck-institutet för ljusets fysik" },
      { type: "p", html: "Överraskningen var att kopplingen mellan ljus och ljud inte försvagades av frysningen — den förstärktes kraftigt. Forskargruppen mätte en Brillouin-förstärkning på 434&nbsp;W<sup>−1</sup>m<sup>−1</sup> (en förstärkningskoefficient per watt pumpeffekt och meter fiber), med en smal bandbredd på bara 24&nbsp;megahertz — mer än tusen gånger starkare än kopplingen i en vanlig, fast glasfiber." },
      { type: "quote", html: "”Genom att frysa vätskekärnan har vi skapat en helt ny fysikalisk plattform som ger extrema olinjäriteter samtidigt som den är enkel att hantera.”", cite: "Birgit Stiller, forskningsgruppledare, Max Planck-institutet för ljusets fysik" },

      { type: "h2", text: "Ett minne byggt av ljudvågor" },
      { type: "p", html: "Som ett praktiskt test byggde forskarna ett så kallat optoakustiskt minne: en komponent som lagrar en ljussignal genom att tillfälligt omvandla den till en ljudvåg i fibern och sedan läsa av den igen. Tack vare den starka kopplingen kunde minnet drivas med omkring hundra gånger lägre effekt än jämförbara komponenter — ett steg mot fotonik som slösar betydligt mindre energi." },
      { type: "quote", html: "”Att demonstrera ett väldigt effektivt optoakustiskt minne är ett fantastiskt första steg. Men den här nivån av koppling mellan ljus och ljud öppnar inte bara nya möjligheter för neuromorf databehandling, utan också för kvantinformationsbehandling, mikrovågsfotonik och högprecisionssensorer.”", cite: "Birgit Stiller, Max Planck-institutet för ljusets fysik" },

      { type: "h2", text: "Vad kan tekniken användas till?" },
      { type: "p", html: "Neuromorf databehandling är ett sätt att bygga datorkretsar som efterliknar hjärnans nätverk av nervceller, ofta med målet att spara ström jämfört med vanliga processorer. En stark, lätthanterlig koppling mellan ljus och ljud i en fiber som dessutom går att skarva ihop med vanlig fiberoptik kan också göra det enklare att bygga känsliga sensorer, eller att skicka de bräckliga kvanttillstånd som framtida kvantdatorer och kvantnätverk behöver utan att de störs av omgivningens brus." },

      { type: "fact", title: "Visste du?", items: [
        "Koldisulfid (CS₂) är en flyktig, brandfarlig vätska som fryser till en glasartad, transparent is vid omkring −112&nbsp;°C — långt över de −196&nbsp;°C forskarna kylde ner till med flytande kväve.",
        "Brillouin-spridning förutspåddes teoretiskt redan 1922 av den franske fysikern Léon Brillouin, långt innan lasern ens hade uppfunnits.",
        "Ljudvågorna som kopplas till ljuset i fibern svänger i gigahertzfrekvenser — mer än 100&nbsp;000 gånger snabbare än det mänskliga örat kan uppfatta som ton."
      ]}
    ]
  },

  {
    id: "2026-07-23-heliumnova-kulor",
    date: "2026-07-23",
    time: "09:00",
    title: "Astronomer löser 25 år gammal novagåta — och hittar mystiska ”kulor” av gas ingen sett förut",
    deck: "V445 Puppis är den enda kända heliumnovan i Vintergatan — en stjärnexplosion år 2000 som till skillnad från alla andra kända novor helt saknade väte. En doktorand vid University of Warwick har nu, med hjälp av flera av världens största teleskop, bekräftat orsaken — och samtidigt upptäckt snabba klumpar av gas som aldrig setts i någon annan nova.",
    category: "Astronomi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-23-heliumnova-kulor.jpg",
    imageAlt: "Ett vetenskapligt falskfärgsfoto från rymdteleskopet Hubble som visar en symmetrisk, fjärilsformad struktur i orange och lila mot svart bakgrund — de två motsatta gasloberna kring stjärnsystemet V445 Puppis, med en skala som visar 0,1 ljusår.",
    imageCredit: "Foto: NASA/ESA (rymdteleskopet Hubble), John Mills / University of Warwick (pressbild, NAM2026)",
    tags: ["astronomi", "mekanik", "newtons lagar", "krafter", "novor", "vita dvärgar", "dubbelstjärnor", "spektroskopi", "doppler-effekt", "fysik 1", "fysik 2"],
    sources: [
      { name: "Royal Astronomical Society (pressmeddelande, NAM2026)", url: "https://ras.ac.uk/news-and-press/news/mystery-bullets-spotted-only-stellar-explosion-its-kind-milky-way" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-mysterious-gas-bullets-milky-helium.html" }
    ],
    research: null,
    larare: {
      moment: [
        { label: "Fysik nivå 2 · 2.12 Ljudfrekvens och dopplereffekt", href: "katalog.html#fy2-2.12" },
        { label: "Fysik nivå 2 · 4.7 Spektrallinjer", href: "katalog.html#fy2-4.7" },
        { label: "Fysik nivå 1 · 3.5 Gravitationslagen", href: "katalog.html#fy1-3.5" }
      ],
      fragor: [
        "Gaskulorna är tusentals ljusår bort och alldeles för små för att synas som föremål. Ändå anges deras fart till 8 940 km/s. Hur kan man mäta hastigheten hos något man inte kan följa med blicken? Vad i ljuset bär informationen?",
        "Att spektrumet saknade väte var det som gjorde explosionen unik — universums vanligaste grundämne lyste med sin frånvaro. Varför är det så avslöjande att ett ämne INTE syns i ett spektrum, och vad kan man dra för slutsats om stjärnan som gasen kom ifrån?",
        "Gasen accelererades till ungefär 3 % av ljushastigheten. Uppskatta rörelseenergin hos ett kilo sådan gas och jämför med något vardagligt — en bil på motorvägen, en sprängladdning. Vad säger jämförelsen om vilken sorts process som måste ligga bakom?"
      ]
    },
    body: [
      { type: "p", html: "I 25&nbsp;år har astronomer klurat på en gåta: varför saknade stjärnexplosionen som lyste upp stjärnbilden Aktern (Puppis) i december år 2000 helt och hållet väte, universums absolut vanligaste grundämne? Nu, vid Royal Astronomical Societys nationella astronomimöte (NAM2026) i Birmingham, har doktoranden John Mills vid University of Warwick lagt fram svaret — och samtidigt en ny gåta. Objektet, katalogiserat som V445&nbsp;Puppis, är den enda bekräftade heliumnovan i hela Vintergatan." },

      { type: "h2", text: "En nova helt utan väte" },
      { type: "p", html: "En vanlig nova uppstår när en vit dvärg — resten av en utbränd stjärna, ungefär jordstor men med en massa i klass med solens — suger gas från en närliggande följeslagarstjärna. Gasen, oftast väterik, lägger sig i ett allt tätare lager på den vita dvärgens yta tills trycket och temperaturen blir så höga att en okontrollerad kärnreaktion tänds: en nova. V445&nbsp;Puppis stack ut redan från början genom att dess spektrum helt saknade väte." },
      { type: "quote", html: "”V445 Puppis har länge stuckit ut bland novor genom sin fullständiga avsaknad av väte. Hur kunde en sådan händelse vara helt utan universums vanligaste grundämne?”", cite: "John Mills, doktorand, University of Warwick" },

      { type: "h2", text: "Dammet som till slut lade sig" },
      { type: "p", html: "Svaret dröjde eftersom explosionen år 2000 spydde ut enorma mängder stoft, som i praktiken dolde stjärnsystemet bakom ett tjockt dammoln i över tjugo år. Först nu, när dammet gradvis klarnat, har Mills och kollegor kunnat kombinera bilder från rymdteleskopet Hubble, infraröda mätningar från europeiska sydobservatoriets Very Large Telescope, spektroskopi från Southern African Large Telescope och ljuskurvor från NASA:s planetjägare TESS för att lista ut vad som döljer sig i systemets mitt: en vit dvärg som stjäl material — inte från en vanlig stjärna, utan från en extremt sällsynt heliumstjärna, en stjärna som redan bränt slut på vätet i sin kärna. De två stjärnorna kretsar om varandra på bara 3,7&nbsp;dygn." },
      { type: "quote", html: "”Explosionens utflöde har nu falnat tillräckligt för att vi ska kunna undersöka dess ursprung, och vi kan därför bekräfta att stjärnsystemet faktiskt består av en vit dvärg som suger material från en extremt sällsynt stjärntyp som kallas en heliumstjärna.”", cite: "John Mills, University of Warwick" },

      { type: "h2", text: "Kulor av gas i nästan 3 % av ljusets hastighet" },
      { type: "p", html: "Men bilderna avslöjade också något ingen väntat sig: kompakta klumpar av trolig syrerik gas, ”kulor”, som skjuts ut från explosionsplatsen i upp till 20&nbsp;miljoner miles i timmen — omkring 8&nbsp;940&nbsp;km/s, nästan 3,0&nbsp;% av ljusets hastighet. Sådana höghastighetsklumpar har aldrig setts i någon annan nova, vare sig väterik eller heliumrik." },
      { type: "quote", html: "”Ursprunget till de här ’kulorna’ är ett mysterium. Vi misstänker att de uppstod efter själva utbrottet, men den här typen av ’kulor’ har inte observerats i någon annan nova.”", cite: "John Mills, University of Warwick" },

      { type: "h2", text: "En gåta löst, en ny gåta född" },
      { type: "p", html: "Fyndet presenterades vid NAM2026 och är ännu inte publicerat i en granskad vetenskaplig tidskrift, men bygger på flera års systematiska observationer med några av världens mest kraftfulla teleskop. Att äntligen kunna bekräfta vad som orsakade en av de mest särpräglade stjärnexplosioner som observerats i vår galax är i sig en framgång — men de snabba gaskulorna, och kraften som måste ha krävts för att accelerera dem till nästan tre procent av ljusets hastighet, ger astronomer en ny fråga att jaga svaret på." },
      { type: "quote", html: "”De skyldiga bakom det här galaktiska utbrottet har varit ett ihållande mysterium under de senaste 25&nbsp;åren, vilket gör det väldigt spännande att kunna bekräfta att den här heliumnovan var resultatet av att en heliumstjärna föll ner på en vit dvärg.”", cite: "John Mills, University of Warwick" },

      { type: "fact", title: "Visste du?", items: [
        "V445 Puppis ligger omkring 20&nbsp;000 ljusår bort i stjärnbilden Aktern (Puppis) — ljuset vi ser av explosionen lämnade stjärnan flera tusen år innan de första pyramiderna byggdes.",
        "Den vita dvärgen i systemet väger mer än 1,3&nbsp;gånger så mycket som solen, nära gränsen (1,38&nbsp;solmassor) där en vit dvärg blir så tung att den kan kollapsa i en supernovaexplosion.",
        "20&nbsp;miljoner miles i timmen motsvarar omkring 8&nbsp;940&nbsp;km/s — snabbt nog för att tillryggalägga ett helt varv runt jorden (40&nbsp;075&nbsp;km) på omkring 4,5&nbsp;sekunder."
      ]}
    ]
  },

  {
    id: "2026-07-22-elektronfyren",
    date: "2026-07-22",
    title: "Forskare bygger en ”elektronfyr” — två laserfärger styr strömmen utan spänning",
    deck: "Normalt krävs en pålagd elektrisk spänning för att driva en riktad ström av elektroner genom en halvledare. Fysiker vid University of Michigan har byggt en komponent där två samverkande färger av laserljus gör jobbet helt själva — och kan svepa strömmens riktning runt som ljuskäglan från en fyr.",
    category: "Kvantfysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-22-elektronfyren.jpg",
    imageAlt: "Datorrenderad illustration av en genomskinlig, skålformad halvledarkomponent på ett kristallgitter, med två spiralformade rosa laserstrålar som möts ovanför den och en gyllene ström av ljuspartiklar som strömmar ut åt ena hållet mot en av fyra guldfärgade elektroder.",
    imageCredit: "Illustration: Yiming Gong / University of Michigan (pressbild)",
    tags: ["kvantfysik", "ellära", "optik", "halvledare", "laser", "interferens", "fotoström", "modern fysik", "fysik 2"],
    sources: [
      { name: "University of Michigan News (pressmeddelande)", url: "https://news.umich.edu/electron-lighthouse-illuminates-new-physics/" },
      { name: "Newswise (referat av pressmeddelandet)", url: "https://www.newswise.com/articles/electron-lighthouse-illuminates-new-physics" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-lasers-aim-electron-currents-semiconductor.html" }
    ],
    research: { citation: "Y. Gong, K. Wang, S. T. Cundiff, ”Directional Photocurrent Generated by Quantum Interference Control”, Physical Review Letters (2026)", url: "https://doi.org/10.1103/3v91-5pzf" },
    body: [
      { type: "p", html: "För att få elektroner att strömma åt ett bestämt håll genom en halvledare brukar man behöva koppla på en elektrisk spänning, precis som i vilket batteridrivet kretskort som helst. Fysiker vid University of Michigan, ledda av professor Steven Cundiff och doktoranden Yiming Gong, har nu visat att det går att hoppa över spänningen helt. Genom att låta två olikfärgade laserpulser mötas i en halvledarkomponent kan de driva fram en riktad elektronström med enbart ljus — och genom att vrida ljusets polarisation kan de svepa strömmens riktning runt, ungefär som ljuskäglan från en fyr. Resultatet publicerades i <em>Physical Review Letters</em> den 21&nbsp;juli." },

      { type: "h2", text: "Ljuset gör mer än att sätta fart på strömmen" },
      { type: "p", html: "Att belysa en halvledare med laserljus och få loss strömförande elektroner är i sig inget nytt — det är själva grundprincipen bakom solceller. Det ovanliga är riktningen. Normalt sprids de elektroner som lossnar åt alla håll, utan någon föredragen riktning, om inget elektriskt fält finns där för att styra dem." },
      { type: "quote", html: "”Så här fungerar det normalt inte … man kan faktiskt liksom spruta ut elektronerna i en bestämd riktning utan att lägga på något elektriskt fält.”", cite: "Steven Cundiff, professor i fysik, University of Michigan" },

      { type: "h2", text: "Två vägar till samma mål" },
      { type: "p", html: "Tricket bygger på kvantmekanisk interferens. Forskarna sköt in ljus i två färger samtidigt i en tunn skiva av aluminiumgalliumarsenid (Al<sub>0,28</sub>Ga<sub>0,72</sub>As), med pulser bara omkring 85&nbsp;femtosekunder korta. Elektronerna i materialet kan nå samma slutgiltiga energitillstånd via två olika ”vägar”: antingen genom att absorbera två fotoner av den ena färgen, eller tre fotoner av den andra. Eftersom de båda ljusfälten är i fas med varandra (koherenta) interfererar de två vägarna kvantmekaniskt — precis som två vågor i vatten kan förstärka eller släcka ut varandra beroende på hur vågtopparna möts. För elektroner som skulle röra sig i en viss riktning förstärker de båda vägarna varandra, medan de släcker ut varandra för elektroner på väg åt motsatt håll. Nettoresultatet blir en ström av elektroner i en bestämd riktning, utan att något elektriskt fält behövt knuffa på." },
      { type: "quote", html: "”Ljuset slår inte bara på strömmen längre — det siktar den också.”", cite: "Steven Cundiff, University of Michigan" },

      { type: "h2", text: "En roterbar elektronstråle" },
      { type: "p", html: "Fenomenet, känt som kvantinterferenskontroll, demonstrerades första gången redan på 1990-talet i en enklare variant (en färg och dess overton). Den nya, skarpare versionen — där tre fotoner konkurrerar med två — förutspåddes teoretiskt av fysikern John Sipe vid University of Toronto, som visade att den skulle ge en betydligt smalare, mer riktningsbestämd elektronstråle än den enklare varianten." },
      { type: "quote", html: "”Den här förutsägelsen var direkt drivande för mitt arbete.”", cite: "Yiming Gong, doktorand, University of Michigan" },
      { type: "p", html: "Med hjälp av renrumsanläggningen Lurie Nanofabrication Facility byggde Gong en komponent med två par mikroskopiska elektroder, vinkelräta mot varandra, för att läsa av strömmen i två riktningar samtidigt. Genom att rotera polarisationen hos de två laserfärgerna 90&nbsp;grader kunde forskarna se strömsignalen försvinna från det ena elektrodparet och dyka upp i det andra — ett direkt bevis på att det verkligen är ljusets polarisation, inte något annat, som styr elektronernas färdriktning." },
      { type: "quote", html: "”Vi kunde knacka på det optiska bordet och se strömmen svara omedelbart.”", cite: "Yiming Gong, University of Michigan" },

      { type: "h2", text: "Grundforskning med möjliga tillämpningar" },
      { type: "p", html: "Experimentet är i första hand ett bevis för ett tidigare oobserverat fysikaliskt fenomen, inte en färdig produkt. Men en ström som styrs enbart av ljusets färg och polarisation — utan ledningar, batterier eller pålagd spänning — skulle kunna bana väg för nya sätt att mäta och avbilda ljus, snabbare telekommunikation och komponenter som kodar mer information i en och samma ljussignal." },

      { type: "fact", title: "Visste du?", items: [
        "Att styra strömriktning med två ljusfärger utan spänning demonstrerades första gången redan 1996–1997, i en enklare variant med en foton mot två. Den nya versionen, med två fotoner mot tre, ger en betydligt skarpare riktad ”stråle” av elektroner.",
        "En femtosekund är en miljondels miljarddels sekund (10<sup>−15</sup>&nbsp;s). De 85&nbsp;femtosekunder korta laserpulserna hinner knappt röra sig någonstans innan de är över — ljus färdas bara omkring 25&nbsp;mikrometer, ungefär en tredjedels hårstrå, på den tiden.",
        "Namnet ”elektronfyr” syftar på att elektronstrålens riktning kan svepas runt kontinuerligt genom att man roterar ljusets polarisationsvinkel — precis som en fyrs roterande lampa sveper sin ljuskägla över havet."
      ]}
    ]
  },

  {
    id: "2026-07-21-kolnanoror-kroppsvarme",
    date: "2026-07-21",
    title: "Forskare stoppar kolnanorören från att klumpa ihop sig — och slår rekord i att omvandla kroppsvärme till el",
    deck: "Kolnanorör har i över tjugo år setts som en nästan perfekt byggsten för böjliga generatorer som omvandlar kroppsvärme direkt till elektricitet — lätta, ledande och tåliga. Ändå har nanorörens envisa tendens att klumpa ihop sig bromsat utvecklingen. Nu har forskare vid Queensland University of Technology i Australien konstruerat en molekyl som håller nanorören isär, satt ett nytt prestandarekord och byggt en böjlig generator som drivs av kroppsvärme.",
    category: "Termodynamik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-21-kolnanoror-kroppsvarme.jpg",
    imageAlt: "Sju forskare från QUT — bland dem Shanshan Zhou i rött längst fram och professor Zhi-Gang Chen till vänster om henne — står och ler tillsammans i ett laboratorium med vetenskaplig utrustning i bakgrunden.",
    imageCredit: "Foto: Queensland University of Technology (QUT), pressbild",
    tags: ["termodynamik", "ellära", "seebeck-effekten", "termoelektricitet", "materialfysik", "kolnanorör", "energiomvandling", "nanoteknik", "ledningsförmåga", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-molecules-carbon-nanotubes-clumping-electricity.html" },
      { name: "Mirage News (referat av QUT:s pressmeddelande)", url: "https://www.miragenews.com/qut-breakthrough-shatters-carbon-nanotube-limits-1712607/" }
    ],
    research: { citation: "S. Zhou, X.-L. Shi, M. Li, W. Chen, T. Cao, N.-H. Li, M. Zhang, P. Sonar, Q. Liu, Z.-G. Chen, ”Radical-Mediated Dispersion Breaks Aggregation Limits in Carbon Thermoelectrics”, Angewandte Chemie International Edition (2026)", url: "https://doi.org/10.1002/anie.4937600" },
    body: [
      { type: "p", html: "Kolnanorör — cylindrar av kol bara några enstaka nanometer i diameter — har i över 20&nbsp;år setts som en nästan idealisk byggsten för böjliga generatorer som omvandlar värme direkt till el. De är lätta, mycket goda elektriska ledare och tåliga nog att böjas och vikas om och om igen. Ändå har den praktiska nyttan uteblivit, eftersom nanorören envist klumpar ihop sig till trassliga knippen så fort de bearbetas till ett fungerande material. Nu har forskare vid Queensland University of Technology (QUT) i Australien hittat ett sätt att hålla dem isär — och samtidigt satt ett nytt rekord för hur effektivt kolnanorör kan omvandla värme till elektricitet. Resultatet publicerades den 20&nbsp;juli i tidskriften <em>Angewandte Chemie International Edition</em>." },

      { type: "h2", text: "Värme blir spänning" },
      { type: "p", html: "Fenomenet bakom upptäckten kallas den termoelektriska effekten, eller Seebeck-effekten efter den tyske fysikern Thomas Johann Seebeck som upptäckte den redan 1821. Kopplas ena änden av en elektrisk ledare till något varmt och den andra till något svalt uppstår en spänningsskillnad mellan ändarna: laddningsbärarna vid den varma sidan rör sig i genomsnitt snabbare och diffunderar mot den kalla sidan, vilket bygger upp ett elektriskt fält längs ledaren. Ju bättre ett material leder både värme och elektricitet, desto mer spänning går att pressa ur en given temperaturskillnad. Kroppens egen hud, några grader varmare än luften omkring den, räcker i princip för att driva en sådan generator — helt utan batteri." },

      { type: "h2", text: "Hindret som stått i vägen i tjugo år" },
      { type: "p", html: "Enligt professor Zhi-Gang Chen, chef för QUT:s forskningsnav för nollutsläppselproduktion, har forskare länge sett kolnanorör som en nästan idealisk kandidat för böjliga, kroppsburna generatorer — men ett envist problem har stått i vägen." },
      { type: "quote", html: "”Kolnanorör är lätta, böjliga och elektriskt ledande — i åratal har forskare sett dem som en nästan idealisk kandidat för kroppsburna termoelektriska enheter. Men deras tendens att klumpa ihop sig har kraftigt begränsat deras prestanda.”", cite: "Zhi-Gang Chen, professor och chef för ARC-forskningsnavet för nollutsläppselproduktion, QUT" },
      { type: "p", html: "Problemet sitter i de svaga, klibbiga krafterna (van der Waals-krafter) mellan intilliggande nanorör, som får dem att fastna vid varandra i oregelbundna knippen så fort materialet ska formas. Varje skarv mellan två hopklumpade rör fungerar som en flaskhals för de elektroner som ska transportera strömmen vidare — ungefär som en trafikstockning vid varje påfart till en motorväg. Resultatet blir ett material med sämre elektrisk ledningsförmåga än de enskilda nanorören egentligen har, vilket i sin tur sänker hur mycket el som går att pressa ur en given temperaturskillnad." },

      { type: "h2", text: "En molekyl som håller nanorören isär" },
      { type: "p", html: "QUT-doktoranden Shanshan Zhou, försteförfattare till studien, och hennes kollegor löste problemet med en metod de kallar radikalmedierad dispersion. I stället för att justera befintliga tekniker konstruerade forskarna en ny molekyl, kallad OTN, som reagerar med nanorörens yta via extremt reaktionsbenägna molekylfragment, så kallade radikaler. Molekylerna lägger sig som ett tunt, jämnt skal runt varje enskilt nanorör och håller dem mekaniskt åtskilda — utan att störa det nätverk av kolatomer som gör nanoröret till en så god elektrisk ledare." },
      { type: "quote", html: "”I stället för att förbättra befintliga metoder kom vi på ett helt nytt sätt att hindra kolnanorören från att fastna i varandra — ett problem som varit ett stort hinder för forskare i flera år.”", cite: "Shanshan Zhou, doktorand och försteförfattare, QUT" },
      { type: "p", html: "Resultatet, skriver forskarna, är den bästa termoelektriska prestanda som någonsin uppmätts för ett material av kolnanorör — ett riktmärke fältet strävat efter i över 20&nbsp;år." },

      { type: "h2", text: "Testad med kroppsvärme och upprepade vikningar" },
      { type: "p", html: "För att visa att metoden fungerar i praktiken byggde forskargruppen en böjlig termoelektrisk generator av det nya materialet och lät den omvandla kroppsvärme till elektricitet. Prototypen höll måttet även efter upprepad böjning och vikning — en förutsättning för allt som ska sitta tätt mot en handled eller vävas in i ett klädesplagg." },
      { type: "quote", html: "”Föreställ dig hälsoövervakande sensorer, smarta textilier eller andra kroppsburna elektroniska prylar som ständigt hämtar energi ur din egen kroppsvärme, i stället för att vara beroende av vanliga batterier.”", cite: "Zhi-Gang Chen, QUT" },
      { type: "p", html: "Forskargruppen pekar också på tillämpningar bortom kläder: samma princip skulle kunna fånga upp spillvärme från industriprocesser eller driva sensorer i uppkopplade prylar (sakernas internet) — situationer där en liten, konstant temperaturskillnad annars bara går förlorad som outnyttjad värme." },

      { type: "fact", title: "Visste du?", items: [
        "Ett enskilt kolnanorör kan vara bara någon enstaka nanometer i diameter — omkring 50&nbsp;000 gånger smalare än ett människohår — men leder ändå ström anmärkningsvärt bra för sin vikt.",
        "Seebeck-effekten upptäcktes 1821 när Thomas Johann Seebeck kopplade ihop två olika metaller i en sluten slinga och märkte att en kompassnål i närheten böjde av så fort skarvarna hade olika temperatur — han trodde först att han upptäckt en form av magnetism, inte elektricitet.",
        "Människohudens yttemperatur ligger normalt runt 33&nbsp;°C, några grader varmare än rumstemperaturen omkring den — precis den lilla temperaturskillnaden en kroppsvärmedriven generator är tänkt att utnyttja."
      ]}
    ]
  },

  {
    id: "2026-07-20-morka-kometen-1998sh2",
    date: "2026-07-20",
    title: "En ”asteroid” har i 27 år dolt att den egentligen är en komet med sin egen lilla raketmotor",
    deck: "Det jordnära objektet 1998 SH2 spårades som en helt vanlig asteroid i 27 år. Men vid ett nära möte med jorden i augusti 2025 hamnade det 19 standardavvikelser fel jämfört med den bana gravitationen ensam förutspår — en gåta som forskare vid NASA och ESO nu har löst med några av världens största teleskop: 1998 SH2 är i själva verket en sällsynt ”mörk komet”, med en osynlig gasutströmning som fungerar som en egen liten raketmotor.",
    category: "Astronomi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-20-morka-kometen-1998sh2.jpg",
    imageAlt: "Konstnärlig bild av en mörk, krater­täckt, oregelbunden kropp i rymden med en svag, ljusgrå gassvans som sträcker sig bort från en gulaktig stjärna längst ner till höger i bilden, mot en stjärnbeströdd bakgrund.",
    imageCredit: "Bild: NASA/JPL-Caltech (pressbild)",
    tags: ["astronomi", "mekanik", "newtons lagar", "krafter", "asteroider", "kometer", "jordnära objekt", "neo", "planetärt försvar", "gravitation", "omloppsbana", "fysik 1", "fysik 2"],
    sources: [
      { name: "NASA/JPL (pressmeddelande)", url: "https://www.jpl.nasa.gov/news/nasa-study-finds-near-earth-asteroid-is-actually-comet/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-asteroid-unexplained-orbital-shift-dark.html" },
      { name: "NASA — bakgrund om mörka kometer", url: "https://www.nasa.gov/solar-system/comets/nasa-researchers-discover-more-dark-comets/" }
    ],
    research: { citation: "D. Farnocchia, O. R. Hainaut, D. Z. Seligman et al., ”Non-gravitational acceleration indicative of cometary activity of near-Earth object”, Nature Astronomy (2026)", url: "https://doi.org/10.1038/s41550-026-02913-7" },
    body: [
      { type: "p", html: "I 27&nbsp;år låg det prydligt katalogiserat som en helt vanlig sten i rymden: det jordnära objektet 1998&nbsp;SH2, upptäckt 1998 och sedan dess spårat vid åtskilliga passager förbi jorden. Men den 28&nbsp;augusti 2025, när objektet svepte förbi på omkring 3&nbsp;miljoner kilometers avstånd — knappt åtta gånger så långt som till månen — befann det sig inte alls där banberäkningarna sa att det skulle vara. Avvikelsen motsvarade 19&nbsp;standardavvikelser, en felmarginal så stor att den omöjligen kunde förklaras med mätfel eller gravitationens finjusteringar. Nu, i en studie publicerad i tidskriften <em>Nature Astronomy</em>, har forskare vid NASA:s Jet Propulsion Laboratory (JPL) och European Southern Observatory (ESO) löst gåtan: 1998&nbsp;SH2 är ingen asteroid. Det är en komet — och det har den varit hela tiden." },

      { type: "h2", text: "En kraft utöver gravitationen" },
      { type: "p", html: "Banan för ett objekt i solsystemet bestäms i grunden av en enda kraft: gravitationen från solen och planeterna, som astronomer kan räkna ut med extrem precision. För en vanlig, inert asteroid stämmer förutsägelsen så gott som perfekt år efter år. Men en komet är inte inert. När dess is värms av solen övergår den direkt från fast form till gas, sublimering, och gasen strömmar ut i rymden i en riktning som beror på var solljuset träffar starkast. Enligt Newtons tredje lag — kraft möts av motkraft — ger den utströmmande gasen kometkärnan en liten men ihållande knuff åt motsatt håll: i praktiken en egen, naturlig raketmotor. Den knuffen är precis den typen av ”icke-gravitationella” störning som långsamt får en bana att driva bort från den rent gravitationella förutsägelsen." },

      { type: "quote", html: "”När vi mätte upp de icke-gravitationella störningarna i banan för 1998&nbsp;SH2 och insåg att de inte var förenliga med att det var en asteroid, misstänkte vi att objektet kunde vara en aktiv komet.”", cite: "Davide Farnocchia, navigationsingenjör, NASA:s Center for Near-Earth Object Studies (JPL)" },

      { type: "h2", text: "Jakten på en osynlig svans" },
      { type: "p", html: "Problemet var att ingen kunde se någon kometaktivitet alls. En vanlig komet avslöjar sig på långt håll genom sin ljusa koma — gasmolnet runt kärnan — och sin karakteristiska svans. 1998&nbsp;SH2 visade ingetdera i vanliga bilder, vilket var precis det som gjorde objektet till ett mysterium snarare än en enkel omklassificering. Forskarna vände sig därför till några av världens största teleskop: Canada-France-Hawaii-teleskopet (3,6&nbsp;m) på Mauna Kea, ESO:s Danska teleskopet (1,5&nbsp;m) i Chile och till sist ESO:s Very Large Telescope (VLT, 8,2&nbsp;m) på Cerro Paranal. Genom att stapla många långa exponeringar ovanpå varandra kunde astronomerna till slut plocka fram en extremt svag koma och en smal svans, mer än 20&nbsp;bågsekunder lång — osynlig för mindre instrument, men otvetydig i VLT:s djupa bilder." },

      { type: "quote", html: "”Bilderna vi samlade in från de här observatorierna visade en svag men tydlig svans, vilket bekräftade att 1998&nbsp;SH2 faktiskt är en komet. Så fungerar vetenskap — man formulerar en hypotes och sätter sig sedan för att testa den.”", cite: "Olivier Hainaut, astronom, European Southern Observatory" },

      { type: "h2", text: "En ny, mörk klass av objekt" },
      { type: "p", html: "1998&nbsp;SH2, som nu även fått kometbeteckningen P/1998&nbsp;SH2, tillhör en klass forskare kallar mörka kometer: kroppar som rör sig som kometer men som är för svaga eller för avlägsna för att någonsin visa en synlig koma eller svans i vanliga översiktsobservationer. Den första kända mörka kometen, asteroiden 2003&nbsp;RM, fick sin bana kartlagd redan 2016 utan att gravitationen ensam kunde förklara den, men det dröjde till 2023 innan mönstret gavs ett namn och sju sådana objekt bekräftats. År 2024 fördubblades listan till 14 kända mörka kometer, indelade i två grupper: mindre ”inre” mörka kometer, tiotals meter i diameter eller mindre med nära cirkulära banor nära jorden, och betydligt större ”yttre” mörka kometer, hundratals meter eller mer med avlångare banor som liknar Jupiterfamiljens kometer. Med 1998&nbsp;SH2 har listan nu blivit ännu längre." },

      { type: "h2", text: "Varför det spelar roll för planetförsvaret" },
      { type: "p", html: "Upptäckten är mer än en kuriositet. Riskberäkningar för jordnära objekt förutsätter att banan går att förutsäga långt in i framtiden med hög precision, en förutsägelse som hittills utgått från att de allra flesta objekten är gravitationellt trogna asteroider utan egna krafter. Om en del av dem i själva verket är mörka kometer med en dold, ihållande liten kraft som gradvis flyttar banan, blir de långsiktiga prognoserna mindre säkra än man trott — särskilt för objekt som, precis som 1998&nbsp;SH2, går flera år mellan varje observationstillfälle. NASA understryker att sannolikheten för att just 1998&nbsp;SH2 ska träffa jorden fortfarande är noll; upptäckten handlar om att förbättra metoderna för alla jordnära objekt, inte om ett akut hot." },

      { type: "quote", html: "”Det här arbetet visar hur viktigt det är att fortlöpande följa jordnära objekt. På grund av utgasningen störs kometers rörelse betydligt mer än asteroiders.”", cite: "Davide Farnocchia, JPL" },

      { type: "fact", title: "Visste du?", items: [
        "Standardavvikelse (σ) mäter hur långt ett uppmätt värde ligger från det väntade utfallet. Inom partikelfysiken räknas fem standardavvikelser som gränsen för en bekräftad upptäckt (så avgjordes Higgspartikeln 2012) — 19&nbsp;standardavvikelser gör slumpmässiga mätfel praktiskt taget uteslutna som förklaring.",
        "1998&nbsp;SH2 kretsar kring solen på 4,5&nbsp;år. Det spårades noggrant fram till 2016, men hann sedan gå två hela varv obevakat innan nästa nära möte med jorden avslöjade avvikelsen 2025.",
        "Namnet ”mörk komet” myntades så sent som 2023 — innan dess klassades objekten helt enkelt som ovanliga asteroider, precis som 1998&nbsp;SH2 självt gjorde i 27&nbsp;år."
      ]}
    ]
  },

  {
    id: "2026-07-19-tour-de-france-aerodynamik",
    date: "2026-07-19",
    title: "Valet av följebil kan avgöra Tour de France — fysiker mäter den osynliga knuffen bakom cyklisten",
    deck: "En ny studie från Heriot-Watt University i Skottland visar att bilen som kör tätt bakom en tempolopp-cyklist ger ett mätbart aerodynamiskt lyft — och att storleken på lyftet nästan helt avgörs av bilens form. Inför tisdagens enda individuella tempolopp i årets Tour de France varnar forskarna för att skillnaden mellan olika följebilar kan bli tillräckligt stor för att avgöra loppet.",
    category: "Mekanik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-19-tour-de-france-aerodynamik.jpg",
    imageAlt: "Åtta gråskaliga 3D-datormodeller av bilar och skåpbilar, alla med tävlingscyklar monterade på taket, uppställda i ett rutnät mot vit bakgrund — fordonstyperna som testades i vindtunnelstudien.",
    imageCredit: "Bild: Heriot-Watt University (pressbild)",
    tags: ["mekanik", "krafter", "luftmotstånd", "aerodynamik", "tryck", "newtons lagar", "vindtunnel", "strömningsmekanik", "cykling", "tour de france", "fysik 1"],
    sources: [
      { name: "Heriot-Watt University (pressmeddelande)", url: "https://www.hw.ac.uk/news/2026/study-finds-choice-of-team-car-could-decide-the-tour-de-france" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-choice-team-car-de-france.html" },
      { name: "road.cc", url: "https://road.cc/news/could-this-years-tour-de-france-time-trial-be-decided-by-the-size-of-the-team-car-expert-proposes-a-maximum-cda-value-for-team-cars-and-extended-following-distances-after-research-finds-larger" }
    ],
    research: { citation: "B. Blocken, ”Cyclist aerodynamic resistance is influenced by the type of the following team car”, forskningsrapport, Heriot-Watt University / Ansys (2026)", url: "https://www.urbanphysics.net/Article_DiffVehicles_BBlocken.pdf" },
    body: [
      { type: "p", html: "På tisdag avgörs det enda individuella tempoloppet i årets Tour de France: 26,1&nbsp;km längs Genèvesjöns strand mellan Évian-les-Bains och Thonon-les-Bains. Men enligt en ny studie från Heriot-Watt University i Skottland kan resultatet påverkas av något som knappt syns i tv-sändningen — vilken bil som kör tätt bakom respektive cyklist. Forskarna, ledda av professor Bert Blocken som är chef för universitetets flygtekniska forskargrupp, har med hjälp av datorsimuleringar och vindtunnelmätningar visat att en följebil ger cyklisten ett mätbart lyft i ryggen, och att lyftets storlek nästan enbart beror på bilens form." },

      { type: "h2", text: "Tryckbubblan som håller cyklisten tillbaka" },
      { type: "p", html: "Luftmotstånd uppstår genom en kombination av två tryckzoner: en zon av övertryck framför kroppen som trycker den bakåt, och en sugzon i vaken bakom som drar tillbaka den. Ett fordon som kör tätt bakom skapar samma effekt, fast i mycket större skala — och de två tryckzonerna kan delvis ta ut varandra." },
      { type: "quote", html: "”När en cyklist kör bildas en zon av övertryck framför kroppen som håller den tillbaka, och en sugzon bakom som drar tillbaka den — det är detta som ger luftmotstånd. En bil skapar samma effekt, fast i mycket större skala. Den trycker framför sig en stor bubbla av övertryck, och när bilen kör tätt bakom en cyklist tar den bubblan delvis ut sugzonen bakom föraren, vilket ger cyklisten ett märkbart lyft.”", cite: "Bert Blocken, professor i flygteknik, Heriot-Watt University" },

      { type: "h2", text: "Åtta bilar i vindtunneln" },
      { type: "p", html: "Forskarlaget, som arbetat tillsammans med mjukvaruföretaget Ansys, testade åtta olika fordonstyper: en liten Mercedes Smart Fortwo, en Jaguar F-Type, en typisk stationsvagn, en typisk SUV, den skåpiga terrängbilen Ineos Grenadier samt tre skåpbilar. Resultatet visade att fördelen bara beror på två saker: avståndet till cyklisten och ett enda tal som beskriver bilens luftmotstånd, den så kallade CdA — dragkoefficienten multiplicerad med bilens tvärsnittsarea. Ju större och klumpigare bil, desto högre CdA och desto större knuff får cyklisten framför." },
      { type: "p", html: "Vid bara en meters avstånd sjönk cyklistens luftmotstånd med nästan 14&nbsp;procent i mätningarna. Vid tio meters avstånd — närmare det avstånd följebilar faktiskt håller under lopp — gav en typisk stationsvagn cyklisten en tidsvinst på 2,3&nbsp;sekunder över hela den 26,1&nbsp;km långa banan, medan den betydligt skrymmande Ineos Grenadier gav mer än dubbelt så mycket: 5,5&nbsp;sekunder." },
      { type: "quote", html: "”Man kan tycka att det är små tal, men tempolopp på elitnivå avgörs ibland med en tiondels sekund, till och med en hundradels. I det sammanhanget är de här vinsterna enorma. De skulle kunna avgöra vem som vinner tempoloppet i Tour de France.”", cite: "Bert Blocken, Heriot-Watt University" },

      { type: "h2", text: "Regeln som inte räcker till" },
      { type: "p", html: "Cykelns internationella förbund UCI utökade redan 2023 minimiavståndet mellan följebil och cyklist från 10 till 25&nbsp;meter, efter en tidigare studie av samma forskargrupp om cyklar som transporterats på bilarnas tak. Målet var uttalat att följebilar inte skulle påverka cyklisternas prestation alls. Den nya studien visar att effekten fortfarande märks långt bortom 25&nbsp;meter — enligt Blocken faller fördelen snabbt av med avståndet, men når aldrig noll, inte ens vid 30&nbsp;meter." },
      { type: "p", html: "Blocken föreslår två åtgärder: dels ett tak för hur högt CdA-värde en följebil får ha, så att inget lag kan vinna en orättvis fördel bara genom att välja ett klumpigare fordon, dels att avståndsregeln faktiskt kontrolleras — helst genom att öka minimiavståndet till 40–50&nbsp;meter. Resultaten är ännu inte sakkunniggranskade i en vetenskaplig tidskrift utan redovisas i en forskningsrapport som skickats till UCI; det är den tredje studien i en serie om cykelaerodynamik som Blockens forskargrupp publicerat sedan 2023." },

      { type: "fact", title: "Visste du?", items: [
        "Luftmotståndet på en cyklist växer ungefär med hastigheten i kvadrat — dubbla farten ger fyra gånger så stort motstånd. Det är därför aerodynamik spelar en så mycket större roll i ett snabbt, plant tempolopp än i en långsam bergsetapp.",
        "CdA — dragkoefficienten $C_\\mathrm{d}$ multiplicerad med tvärsnittsarean $A$ — är samma typ av storhet som beskriver luftmotståndet hos allt från bilar och cyklister till fallskärmshoppare.",
        "Tempoloppet mellan Évian-les-Bains och Thonon-les-Bains är i år den enda individuella tempoetappen i Tour de France och kör längs stranden av Genèvesjön, med en väntad snittfart över 50&nbsp;km/h för de snabbaste förarna."
      ]}
    ]
  },

  {
    id: "2026-07-18-radium-molekyler",
    date: "2026-07-18",
    title: "Fysiker bäddar in radioaktivt radium i en sockerklump — och kyler ner det till några kelvin över absoluta nollpunkten",
    deck: "Vid Caltech har forskare för första gången lyckats bygga molekyler av det sällsynta, radioaktiva grundämnet radium och kyla ner dem till några enstaka kelvin. Knepet för att hantera det farliga ämnet är lånat från godistillverkningen — och molekylerna ska nu bli extremt känsliga kvantsensorer i jakten på svaret på en av fysikens största olösta frågor: varför universum är fyllt av materia, men nästan helt tomt på antimateria.",
    category: "Kärnfysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-18-radium-molekyler.jpg",
    imageAlt: "Ett tätt nätverk av blå, orange och röda kablar samt optiska speglar, linser och detektorer på ett svart optikbord i ett fysiklaboratorium.",
    imageCredit: "Foto: Hutzler Lab/Caltech (pressbild)",
    tags: ["kärnfysik", "atomfysik", "radioaktivitet", "halveringstid", "antimateria", "symmetri", "modern fysik", "molekylfysik", "laserspektroskopi", "fysik 1", "fysik 2"],
    sources: [
      { name: "Caltech (pressmeddelande)", url: "https://www.caltech.edu/about/news/cold-radioactive-molecules-prepped-and-readied-for-physics-discoveries" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-cold-radioactive-molecules-prepped-readied.html" }
    ],
    research: { citation: "C. J. Conn, P. Yu, M. I. Howard, Y. Yang, C. Zhang, A. Jadbabaie, A. Gorou, A. N. Gaiser, T. C. Steimle, L. Cheng, N. R. Hutzler, ”Production and spectroscopy of cold radioactive molecules”, Science (2026)", url: "https://doi.org/10.1126/science.aea9413" },
    body: [
      { type: "p", html: "Radium är ett av naturens mest ökända grundämnen — det radioaktiva ämne som gjorde Marie och Pierre Curie berömda när de upptäckte det 1898, och som senare gav självlysande urtavlor innan strålningsfaran blev känd. Nu har forskare vid Caltech i Kalifornien gjort något ingen lyckats med tidigare: byggt molekyler av radium, kylt ner dem till några enstaka kelvin över absoluta nollpunkten och studerat dem med laser i en apparat som får plats på ett vanligt labbord. Resultatet, publicerat i tidskriften <em>Science</em> den 16&nbsp;juli, är ett steg mot att besvara en av fysikens största olösta frågor: varför universum överhuvudtaget innehåller materia." },

      { type: "h2", text: "Ett recept lånat från godistillverkningen" },
      { type: "p", html: "Radium är sällsynt, extremt radioaktivt och svårt att hantera i ren form — precis den sortens ämne fysiker helst vill hålla på avstånd. Forskargruppen, ledd av professor Nick Hutzler, löste problemet genom att bädda in radiumet i en klibbig sörja: radium blandades med vatten och socker (senare bytt mot sötningsmedlet xylitol), och vattnet fick avdunsta. Klumpen placerades på en bit guldfolie i en vakuumkammare, kyld med heliumgas till omkring −268&nbsp;°C — bara några grader över absoluta nollpunkten (0&nbsp;K = −273,15&nbsp;°C). Laserpulser sparkade loss enstaka radiumatomer ur klumpen, som reagerade med gaser i kammaren och bildade tre nya molekyler: radiummonohydroxid, radiummonodeuteroxid och radiummonofluorid." },

      { type: "quote", html: "”Vi ville bädda in det i något vi kunde hantera — i praktiken en tjock, trögflytande sörja.”", cite: "Nick Hutzler, professor i fysik, Caltech" },

      { type: "h2", text: "En päronformad atomkärna" },
      { type: "p", html: "Varför just radium? Svaret ligger i atomkärnans form. De flesta atomkärnor är antingen klotrunda som en apelsin eller något avlånga som en amerikansk fotboll, förklarar Hutzler. Radiums kärna hör till en sällsynt tredje kategori: den är päronformad, med mer massa i den ena änden än den andra. Den asymmetrin gör kärnan extremt känslig för minimala avvikelser från de symmetrier som fysikens standardmodell bygger på — avvikelser som skulle kunna förklara varför universum, enligt teorin, borde innehålla lika delar materia och antimateria, men i praktiken domineras nästan helt av materia." },

      { type: "quote", html: "”Päronformade atomkärnor är asymmetriska och förstärker dramatiskt de signaler vi letar efter för att förklara obalansen mellan materia och antimateria.”", cite: "Nick Hutzler, Caltech" },

      { type: "h2", text: "En molekyl som antenn" },
      { type: "p", html: "Att fånga en så subtil signal kräver en förstärkare, och det är här molekylerna kommer in. Elektronerna i en molekyl som radiummonofluorid upplever ett mycket starkare elektriskt fält kring atomkärnan än vad en fri radiumatom skulle ge upphov till, vilket gör att molekylen fungerar ungefär som en antenn: den förstärker de svaga signaler forskarna hoppas kunna mäta. Med precisionslasrar kunde forskarna sedan läsa av molekylernas energinivåer i detalj — samma sorts laserspektroskopi som används för att kartlägga atomers och molekylers spektrallinjer, fast tillämpad på ett av de mest svårhanterliga grundämnena som finns." },

      { type: "h2", text: "Fler isotoper väntar" },
      { type: "p", html: "Nästa steg är att upprepa experimentet med radiumisotoperna 223 och 225, som också har kärnspinn och därför kan avslöja ännu fler typer av symmetribrott. De nedkylda molekylerna är nu redo att användas i regelrätta kvantprecisionsmätningar, och metoden går i princip att återanvända för andra radioaktiva grundämnen — ett bordsstort alternativ till att jaga ny fysik i kilometerlånga partikelacceleratorer." },

      { type: "fact", title: "Visste du?", items: [
        "Radium upptäcktes av Marie och Pierre Curie 1898 och blev, tillsammans med polonium, ett av de första bevisen för att ett grundämne kan omvandlas till ett annat genom radioaktivt sönderfall.",
        "Isotopen som användes i studien, radium-226, har en halveringstid på cirka 1&nbsp;600 år och sönderfaller genom alfasönderfall till den radioaktiva ädelgasen radon-222.",
        "Molekylerna hölls vid 4–7&nbsp;kelvin under experimentet — bara några enstaka grader över absoluta nollpunkten, den lägsta temperatur som är fysikaliskt möjlig (0&nbsp;K = −273,15&nbsp;°C)."
      ]}
    ]
  },

  {
    id: "2026-07-17-hannibal-alperna",
    date: "2026-07-17",
    time: "09:00",
    title: "Fysiker räknar ut vilket bergspass Hannibal tog över Alperna — och varför elefanterna klarade sig bäst",
    deck: "En ny studie i tidskriften PNAS räknar ut den exakta energikostnaden, i terajoule, för Hannibals berömda härfärd över Alperna år 218 f.Kr. — och pekar ut vilket av fyra tänkbara bergspass som var billigast att ta sig över. Beräkningarna visar samtidigt varför hans 37 krigselefanter klarade påfrestningen mycket bättre än soldaterna.",
    category: "Mekanik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-17-hannibal-alperna.jpg",
    imageAlt: "Målning i mörka, dramatiska toner: en väldig svart stormsky välver sig över ett karg bergslandskap medan solen bryter igenom som en gul skiva, och en armé av små, knappt urskiljbara soldater kämpar sig fram i dalen nedanför.",
    imageCredit: "Bild: J. M. W. Turner, ”Snow Storm: Hannibal and his Army Crossing the Alps” (1812), Tate, London — public domain (Wikimedia Commons)",
    tags: ["mekanik", "arbete", "energi", "lägesenergi", "effekt", "verkningsgrad", "energiprincipen", "arkeologi", "biomekanik", "fysik 1"],
    sources: [
      { name: "Physics World", url: "https://physicsworld.com/a/study-reveals-the-energy-cost-of-hannibals-alpine-crossing/" },
      { name: "EurekAlert! (University of Oxford / iDiv, pressmeddelande)", url: "https://www.eurekalert.org/news-releases/1134397" }
    ],
    research: { citation: "E. Berti, F. Vollrath, ”Energy costs of Hannibal's alpine crossing”, Proceedings of the National Academy of Sciences 123 (28) (2026)", url: "https://doi.org/10.1073/pnas.2612764123" },
    body: [
      { type: "p", html: "År 218&nbsp;f.Kr. ledde den karthagiske fältherren Hannibal sin här — tiotusentals soldater, tusentals hästar och 37 krigselefanter — över Alperna för att anfalla Rom norrifrån, en av antikens mest berömda militära bedrifter. Men exakt vilket bergspass han valde har historiker och arkeologer tvistat om i över 2&nbsp;100 år. Nu har Emilio Berti vid Tyska centret för integrativ biodiversitetsforskning (iDiv) och Friedrich Schiller-universitetet i Jena, tillsammans med Fritz Vollrath vid University of Oxford, angripit frågan med ett ovanligt verktyg: fysikens energiräkning. I tidskriften <em>Proceedings of the National Academy of Sciences</em> (PNAS) räknar de ut hur mycket energi arméns 40&nbsp;000 man, 7&nbsp;000 hästar och 37 elefanter skulle ha förbrukat på var och en av fyra tänkbara vägar över bergen." },

      { type: "h2", text: "Fyra pass, fyra energinotor" },
      { type: "p", html: "Col du Clapier har länge varit historikernas favorit, men senare års geologiska och filologiska bevis har i stället pekat mot det högre och brantare Col de la Traversette, 2&nbsp;947&nbsp;m över havet. Forskarna räknade ut den totala energikostnaden för hela armén på varje rutt — i praktiken hur mycket <em>arbete</em> som krävs för att flytta varje kropps massa längs terrängens lutning, sträcka för sträcka. Resultatet: Traversette fick den lägsta totalnotan, 5,42&nbsp;TJ (terajoule — 5,42 följt av tolv nollor joule) för hela armén. Col de Montgenèvre kostade 11&nbsp;% mer, Col du Clapier 16&nbsp;% mer och Col du Mont Cenis hela 19&nbsp;% mer. Trots att Traversette är det högsta av de fyra passen var det alltså det mest direkta — och därför billigast i energi, vilket illustrerar att arbetet $W$ beror lika mycket på hur långt man vandrar som på hur högt man klättrar." },

      { type: "quote", html: "”Att tillämpa kunskap från studier av afrikanska elefanters energiförbrukning i Kenya ger en helt ny dimension åt den långvariga debatten om Hannibals väg över Alperna.”", cite: "Fritz Vollrath, University of Oxford" },

      { type: "h2", text: "Elefanterna klarade sig bäst" },
      { type: "p", html: "Energimodellen kalibrerades mot verkliga fältmätningar av hur mycket energi levande afrikanska elefanter förbrukar per kilo kroppsmassa i olika terräng — data insamlad av naturvårdsorganisationen Save the Elephants i Kenya. Samma modell skalades sedan upp till soldater och hästar. Resultatet visar en tydlig skillnad i hur väl olika kroppar klarade påfrestningen: på Traversette-rutten förlorade soldaterna omkring 19&nbsp;% av sina fettreserver och hästarna 11&nbsp;%, medan elefanterna kom undan med bara 4&nbsp;%. Det stämmer väl med den historiska bilden av att en stor del av Hannibals soldater dog eller blev stridsodugliga under fjällpassagen, medan de flesta elefanterna tog sig över levande." },

      { type: "quote", html: "”Den nya analysen tar inte bort all osäkerhet, men den stärker fallet för Traversette-rutten genom att visa att den bättre klarade av att flytta en stor armé med elefanter genom extremt krävande alpin terräng.”", cite: "Emilio Berti, iDiv / Friedrich Schiller-universitetet i Jena" },

      { type: "h2", text: "Matsäcken vägde 233 ton" },
      { type: "p", html: "Att förbränna 5,42&nbsp;TJ kräver betydligt mer mat än vad den rena lägesenergin (höjden man klättrar) antyder, eftersom kroppens muskler bara omvandlar en bråkdel av matens energi till nyttigt arbete — resten blir värme (människokroppens verkningsgrad ligger på omkring 20&nbsp;%). Forskarna uppskattar att enbart soldaternas matsäck, om den huvudsakligen bestod av kolhydrater, skulle ha vägt omkring 233&nbsp;ton på Traversette-rutten. En vuxen elefant på tre ton äter normalt omkring 200&nbsp;kg foder om dagen i det vilda — för att helt kompensera energin som gick åt i Alperna skulle den ha behövt lägga 5–6 extra timmar på att beta varje dygn." },

      { type: "fact", title: "Visste du?", items: [
        "Fördelar man arméns totala energiförbrukning, 5,42&nbsp;TJ, jämnt över de cirka 15 dygn som marschen tros ha tagit blir det en snitteffekt på omkring 4,2&nbsp;MW för hela kolonnen — effekt är energi per tid, $P = \\dfrac{\\Delta E}{\\Delta t}$, här applicerad på en hel antik armé i stället för en glödlampa.",
        "Redan den grekiske historikern Polybios, som skrev om det andra puniska kriget bara några decennier efter att det utspelade sig, diskuterade vilken väg Hannibal tagit — debatten om rutten är alltså nästan lika gammal som händelsen själv.",
        "Målningen ovan, ”Snow Storm: Hannibal and his Army Crossing the Alps” av J.&nbsp;M.&nbsp;W. Turner (1812), föreställer just denna färd — målad drygt 2&nbsp;000 år efter händelsen och över 200 år innan fysiker till sist räknade ut vilket bergspass som troligen var billigast."
      ]}
    ]
  },

  {
    id: "2026-07-16-neutronlins",
    date: "2026-07-16",
    time: "09:00",
    title: "Neutroner får sin första riktiga lins — sju gånger skarpare bild av ett batteri",
    deck: "Vid Paul Scherrer-institutet i Schweiz har forskare byggt den första lins som kan fokusera neutroner av olika våglängder till en och samma punkt — en så kallad akromatisk lins. Genom att kombinera brytning och diffraktion i en enda komponent kunde de förstora bilden av ett litiumjonbatteris inre struktur sju gånger, med batteriet placerat sex meter från detektorn.",
    category: "Optik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-16-neutronlins.jpg",
    imageAlt: "Två forskare skakar hand och håller upp en liten komponent framför en vit industribyggnad med den stora röda texten SINQ, den schweiziska spallationsneutronkällan vid Paul Scherrer-institutet.",
    imageCredit: "Foto: Paul Scherrer Institute PSI/Markus Fischer (pressbild)",
    tags: ["optik", "brytning", "diffraktion", "neutroner", "lins", "våg-partikeldualitet", "materialfysik", "batteriforskning", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-world-neutron-lens-sharp-focus.html" },
      { name: "Scientific Frontline (referat av PSI:s pressmeddelande)", url: "https://www.sflorg.com/2026/07/phy07142601.html" }
    ],
    research: { citation: "M. R. Dhanalakshmi Veeraraj, D. Qu, H.-Y. Chen, J. Vila-Comamala et al., ”An achromatic neutron lens”, Nature Communications (2026)", url: "https://doi.org/10.1038/s41467-026-74925-w" },
    body: [
      { type: "p", html: "En stråle av neutroner avslöjar sådant som röntgenstrålning inte kan — neutroner studsar knappt på tunga metallatomer men fastnar desto mer i lätta grundämnen som väte och litium, vilket gör dem perfekta för att se rakt igenom en motor eller ett batterihölje. Problemet har länge varit skärpan: en neutronstråle innehåller nästan alltid neutroner med många olika våglängder blandade, och ingen lins har kunnat fokusera alla dessa våglängder till en och samma punkt. Nu har forskare vid Paul Scherrer-institutet (PSI) i Schweiz löst det. Den 14 juli presenterade de i tidskriften <em>Nature Communications</em> världens första akromatiska neutronlins." },

      { type: "h2", text: "Samma fel som i en billig kikare" },
      { type: "p", html: "Felet kallas kromatisk aberration och är välkänt från vanlig optik: en enkel glaslins bryter olika färger olika mycket, så en bild av en ljuskälla får färgade kanter i stället för att bli skarp. Kameralinser löser det genom att kombinera två sorters glas i en akromatisk lins, där felen från den ena glasbiten tar ut felen från den andra. Neutroner har haft samma problem, fast värre — det har helt enkelt inte funnits någon fokuserande lins alls för dem. Forskarna har därför tvingats lägga provet nästan an mot detektorn för att hålla bilden skarp, vilket satt en hård gräns för både upplösningen och hur stora föremål som gått att avbilda." },

      { type: "h2", text: "Brytning och diffraktion i samma komponent" },
      { type: "p", html: "PSI-forskarnas lösning kombinerar två sätt att böja av en stråle. Den ena delen består av precisionsslipade, linsformade element i diamant som bryter neutronstrålen ungefär som en glaslins böjer av ljus. Den andra delen är ett mönster av koncentriska ringar av nickel, tunnare än 200&nbsp;nanometer där de är som smalast, som fungerar som ett runt diffraktionsgitter och böjer strålen genom diffraktion i stället. De två effekterna sprider ut våglängderna åt motsatta håll, så när de kombineras i rätt proportion tar felen ut varandra — precis som i den akromatiska kameralinsen, fast med brytning och diffraktion i stället för två sorters glas. Resultatet blev en upplösning under 20&nbsp;mikrometer, även med provet placerat långt från detektorn." },

      { type: "h2", text: "Byggd i ett nyöppnat renrum" },
      { type: "p", html: "De extremt fina nickelringarna tillverkades med elektronstråle-litografi i PSI:s nyinvigda renrumsanläggning PICO, medan diamantstrukturerna tillverkades av det schweiziska företaget Synova. Linsen är resultatet av ett samarbete mellan institutets röntgenoptik-grupp — samma grupp som redan 2022 byggde världens första akromatiska röntgenlins — och neutronavbildningsgruppen vid den schweiziska spallationsneutronkällan SINQ, som tillsammans anpassade grundidén till en helt annan typ av strålning." },

      { type: "quote", html: "”Avsaknaden av en sådan lins har hållit tillbaka neutronavbildningen i decennier.”", cite: "Joan Vila-Comamala, Paul Scherrer-institutet" },

      { type: "h2", text: "En logotyp och ett batteri på håll" },
      { type: "p", html: "Forskarna testade först linsen på en 3&nbsp;millimeter stor PSI-logotyp placerad 6&nbsp;meter från detektorn — ett avstånd som utan lins hade krävt centimeter, eller till och med millimeter, för samma skärpa. Sedan riktade de linsen mot ett vanligt litiumjonbatteri, fortfarande 6&nbsp;meter bort, och förstorade bilden av batteriets hoprullade, skiktade elektrodstruktur 7&nbsp;gånger." },

      { type: "quote", html: "”Det här är bara början. Vi ser redan sätt att förbättra linsen ytterligare.”", cite: "Mano Raj Dhanalakshmi Veeraraj, Paul Scherrer-institutet" },

      { type: "h2", text: "Från batterier till ugnar under tryck" },
      { type: "p", html: "Att provet kan sitta långt från detektorn öppnar för att filma processer inuti skrymmande utrustning som tidigare inte gått att avbilda skarpt — ugnar, kryostater och tryckkärl, till exempel. Målet på längre sikt är ett riktigt neutronmikroskop. Fyndet är också ett fint exempel på neutronens dubbla natur: samma partikel bryts som en klassisk stråle men böjer av genom diffraktion som en våg — precis den våg-partikeldualitet som de Broglies hypotes beskriver." },

      { type: "fact", title: "Visste du?", items: [
        "Neutronavbildning fungerar som röntgen, fast tvärtom: neutroner interagerar med atomkärnor i stället för elektronmoln, så de ser rakt igenom tunga metaller men fastnar i lätta grundämnen som väte och litium — perfekt för att studera batterier inifrån.",
        "Samma forskargrupp vid PSI byggde redan 2022 världens första akromatiska röntgenlins — neutronlinsen bygger på samma grundidé, fast överförd till en helt annan typ av strålning.",
        "En mikrometer är en tusendels millimeter. Linsens finaste nickelringar är bara några hundra nanometer breda — omkring tusen gånger tunnare än ett människohår."
      ]}
    ]
  },

  {
    id: "2026-07-15-varmekappa-3d",
    date: "2026-07-15",
    title: "Ny värmekappa gömmer föremål för infraröd strålning — i alla riktningar",
    deck: "Forskare vid University of Illinois Urbana-Champaign och Tekniska universitetet i Danmark har byggt den första tredimensionella ”värmekappan” som fungerar oavsett varifrån värmen kommer. I ett av testerna gömde de ett äpple i en kappa formad som ett päron — en värmekamera riktad mot föremålet visade bara en jämnt tempererad päronform.",
    category: "Termodynamik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-15-varmekappa-3d.jpg",
    imageAlt: "Fyra silvergrå 3D-printade metallgitterstrukturer i mjukt rundade, organiska former, fotograferade mot svart bakgrund — prototyper av den tredimensionella värmekappan.",
    imageCredit: "Foto: University of Illinois Urbana-Champaign (pressbild)",
    tags: ["termodynamik", "värmeledning", "värmestrålning", "infraröd kamera", "metamaterial", "3d-printing", "osynlighetsmantel", "fysik 1"],
    sources: [
      { name: "University of Illinois News Bureau (pressmeddelande)", url: "https://news.illinois.edu/new-3d-thermal-cloak-hides-objects-from-heat-in-any-direction/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-3d-thermal-cloak.html" }
    ],
    research: { citation: "W. Li, Y. Wang, O. Sigmund, X. S. Zhang, ”Free-form thermal cloaks in three dimensions”, Nature Communications (2026)", url: "https://doi.org/10.1038/s41467-026-73167-0" },
    body: [
      { type: "p", html: "Tänk dig att du riktar en värmekamera mot ett äpple format som ett päron — och att kameran bara visar en jämnt tempererad päronform, utan minsta spår av äpplet som egentligen gömmer sig inuti. Precis det har forskare vid University of Illinois Urbana-Champaign och Tekniska universitetet i Danmark (DTU) lyckats med. I tidskriften <em>Nature Communications</em> presenterar de den första tredimensionella ”värmekappan” som gör föremål osynliga för infraröd strålning, oavsett från vilket håll värmen kommer." },

      { type: "h2", text: "Värme som leds runt, inte blockeras" },
      { type: "p", html: "En vanlig missuppfattning är att man gömmer värme genom att isolera bort den, ungefär som i en termos. Kappan bygger i stället på en gren av fysiken som kallas transformationstermotik: i stället för att blockera värmeflödet leder materialet det runt det gömda föremålet, i en exakt uträknad omväg. Resultatet är att temperaturfältet utanför kappan ser precis likadant ut som om föremålet inte fanns där alls — värmeenergin fortsätter rakt igenom, som om ytan var tom (värme strömmar ju alltid från varmt till kallt och kan transporteras genom ledning, strålning och strömning)." },

      { type: "h2", text: "Ett gitter av aluminium fyllt med gummi" },
      { type: "p", html: "Nyckeln till att få tekniken att fungera i tre dimensioner — och åt alla håll samtidigt — är ett hybridmaterial. Forskarlaget, med Shelly Zhang vid University of Illinois i spetsen tillsammans med postdoktor Weichen Li, doktoranden Yibo Wang och professor Ole Sigmund vid DTU, 3D-printade ett finmaskigt gitter av aluminium, som leder värme mycket bra, och göt sedan in ett gummiliknande material med låg värmeledningsförmåga i mellanrummen. Genom att variera hur tätt gittret är på olika ställen i strukturen kan forskarna finjustera värmeledningsförmågan i varje liten volymdel för sig — precis den kombination av egenskaper som krävs för att böja värmeflödet runt vilket föremål som helst." },

      { type: "quote", html: "”En riktig värmekappa bör fungera oavsett varifrån värmen kommer. Vår enhet kan gömma ett komplext tredimensionellt föremål i oändligt många riktningar, samtidigt som temperaturen inuti hålls stabil och skyddad.”", cite: "Shelly Zhang, University of Illinois Urbana-Champaign" },

      { type: "h2", text: "En päronformad kappa gömmer ett äpple" },
      { type: "p", html: "Tidigare värmekappor i tre dimensioner har nästan alltid fungerat åt bara ett håll, ungefär som en skärm värmen måste träffa rakt framifrån för att luras. Genom att kombinera gittertekniken med matematiska verktyg som kallas sfäriska övertoner — samma slags matematik som beskriver hur ljud och gravitation sprids i klotsymmetriska mönster — kunde forskarna skapa kappor med betydligt mer komplicerade former än tidigare, allt från ett människoansikte till vanliga frukter. I ett av experimenten placerade de ett äpple i en kappa formad som ett päron: riktades en värmekamera mot föremålet syntes bara en jämn, päronformad temperaturbild, utan minsta antydan om vad som egentligen dolde sig inuti." },

      { type: "h2", text: "Nästa steg: smarta värmekappor" },
      { type: "p", html: "I labbet testade forskarna prototyperna genom att placera dem mellan en varm och en kall yta och filma med infraröda kameror hur temperaturfältet betedde sig. Utanför kappan var temperaturmönstret opåverkat, som om föremålet inte fanns, medan temperaturen inuti hölls stabil och skyddad från de extrema förhållandena utanför. Tänkbara tillämpningar handlar om att skydda värmekänslig elektronik och batterier från överhettning, eller att dölja värmekänsliga föremål från infraröda sensorer. Nästa steg, säger Zhang, är att göra kapporna aktiva." },

      { type: "quote", html: "”Vårt mål är att bygga kappor som inte bara gömmer och skyddar, utan som aktivt kan styra värmen på användbara sätt.”", cite: "Shelly Zhang, University of Illinois Urbana-Champaign" },

      { type: "fact", title: "Visste du?", items: [
        "Metoden kallas transformationstermotik och är värmelärans motsvarighet till transformationsoptik, som redan på 2000-talet användes för att designa de första (tvådimensionella) osynlighetsmantlarna för synligt ljus.",
        "En värmekamera avläser infraröd strålning — den värmestrålning som alla föremål med en temperatur över absoluta nollpunkten (−273&nbsp;°C) hela tiden sänder ut.",
        "Forskarna vill härnäst bygga ”aktiva” värmekappor som inte bara döljer värme utan själva kan styra den dit den behövs — till exempel för att kyla känsliga batterier i farkoster och elektronik."
      ]}
    ]
  },

  {
    id: "2026-07-14-baklanges-sprinkler",
    date: "2026-07-14",
    title: "Så snurrar en sprinkler som suger i sig vatten — gåtan från 1883 är äntligen löst",
    deck: "Vad händer om man kör en trädgårdssprinkler baklänges, så att vatten sugs in i stället för sprutas ut? Frågan ställdes redan 1883 och gjorde till och med Richard Feynman så nyfiken att han sprängde en glasbehållare i ett misslyckat labbförsök på 1940-talet. Nu har matematiker vid New York University, ledda av Leif Ristroph, byggt en rad olika ”sprinklerleksaker” i böjda rörformer och löst gåtan i tidskriften PNAS: en baklängeskörd sprinkler snurrar visserligen, men av ett helt annat skäl än den vanliga — och omkring 50 gånger långsammare.",
    category: "Mekanik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-14-baklanges-sprinkler.jpg",
    imageAlt: "Färglagt höghastighetsfoto uppifrån av vattenflödena inuti en baklängeskörd sprinkler: fyra virvlande spiralmönster i rosa, lila och orange möts i ett klart gult kryss mitt i bilden.",
    imageCredit: "Foto: NYU:s Applied Mathematics Laboratory (pressbild, EurekAlert!)",
    tags: ["mekanik", "newtons tredje lag", "rörelsemängd", "strömningsmekanik", "vätskor", "vridmoment", "raketprincipen", "fysik 1", "fysik 2"],
    sources: [
      { name: "EurekAlert! (New York University, pressmeddelande)", url: "https://www.eurekalert.org/news-releases/1135491" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-silly-sprinklers-reverse-unravel-decades.html" }
    ],
    research: { citation: "J. E. Smith, M. Zuo, W. Kuhlke, B. Sprinkle, L. Ristroph, ”Geometry controls momentum flux in the sprinkler problem”, PNAS 123 (30) (2026)", url: "https://doi.org/10.1073/pnas.2537479123" },
    body: [
      { type: "p", html: "De flesta har sett en vanlig gräsmatte-sprinkler snurra runt medan den sprutar vatten över gräset — ett läroboksexempel på hur en reaktionskraft kan sätta något i rörelse, precis som hos en raket. Men vad händer om man vänder på alltihop och tvingar in vatten i sprinklern i stället, så att den suger i sig vatten genom de böjda armarna snarare än att spruta ut det? Snurrar den fortfarande, och i så fall åt vilket håll? Frågan har irriterat fysiker i över 140&nbsp;år — och har nu äntligen fått ett tydligt svar, publicerat i tidskriften <em>Proceedings of the National Academy of Sciences</em> (PNAS) av ett forskarlag vid New York University (NYU)." },

      { type: "h2", text: "En gåta som sprängde en glasbehållare" },
      { type: "p", html: "Problemet dök första gången upp 1883, då den österrikiske fysikern Ernst Mach beskrev det i sin klassiska bok om mekanik och bara konstaterade att sprinklern inte visade någon tydlig rotation. Frågan blev sedan ordentligt känd tack vare Richard Feynman, som doktorand vid Princeton University på 1940-talet byggde ett eget försök i universitetets cyklotronlaboratorium. Enligt ett vittnesmål från kollegan Edward Creutz ryckte sprinklerhuvudet bara till en aning och stod sedan still hur mycket trycket än ökades — tills glasbehållaren med vatten till slut small sönder. Feynman fick aldrig något ordentligt svar på sin egen fråga." },

      { type: "h2", text: "Sprinklerleksaker i olika former" },
      { type: "p", html: "Forskarlaget, med Leif Ristroph vid NYU:s Courant Institute i spetsen, byggde en rad olika ”sprinklerleksaker” — genomskinliga rör böjda i olika mönster: en helt rak variant, spiraler, rör som krokar tillbaka på sig själva och flera andra geometrier. Varje modell monterades på ett extremt friktionsfritt lager och kördes både framlänges (vatten sprutas ut) och baklänges (vatten sugs in), medan höghastighetskameror och färgat vatten fångade hur strömmarna rörde sig både inne i och utanför sprinklerhuvudet." },

      { type: "quote", html: "”Det här arbetet ger det experimentella svaret på Feynmans sprinklerproblem, genom att visa — för flera olika sprinklerformer — hur vattenflödenas rörelsemängdsmoment driver sprinklerns rotation.”", cite: "Leif Ristroph, New York University" },

      { type: "h2", text: "Framlänges en raket, baklänges nästan ingenting" },
      { type: "p", html: "Framlänges fungerar sprinklern precis som en roterande raket: vattenstrålarna som sprutar ut ur armarnas mynningar trycker tillbaka på sprinklern enligt Newtons tredje lag och får den att snurra. Baklänges finns det inga strålar som sprutar ut någonstans — men djupt inne, där armarna möts i ett litet nav, bildas det ändå strålar av det inströmmande vattnet. Dessa inre strålar krockar med varandra, men inte exakt mitt i prick — och just den lilla sneda träffen ger en nettokraft som får sprinklern att rotera, fast åt motsatt håll jämfört med framlänges-fallet. Eftersom mekanismen är så mycket mer indirekt snurrar en baklängeskörd sprinkler omkring 50&nbsp;gånger långsammare än en vanlig, vid jämförbara vattenflöden." },

      { type: "h2", text: "Två gamla teorier föll — en tredje höll hela vägen" },
      { type: "p", html: "De olika sprinklerformerna gjorde det möjligt att skilja mellan konkurrerande förklaringar som cirkulerat sedan Machs dagar. Mach själv trodde att vattnet utanför sprinklern virvlar åt ett håll och sprinklern åt det andra — en teori som de nya mätningarna motbevisar. Feynmans egen idé, som fokuserade på flödet längst ut på armarna, höll inte heller: den yttre delen av flödet visade sig knappt påverka rotationen. Det som till slut förklarade alla sprinklerformernas beteende — i både framlänges- och baklängesläge — var i stället rörelsemängden hos de inre vattenstrålarna, vad forskarna kallar momentum flux-teorin." },

      { type: "quote", html: "”Våra resultat ger en säkrare förståelse för hur komponenter reagerar på strömmande vätskor och gaser — kunskap som kan vägleda framtida tekniska framsteg för apparater, som turbiner, som omvandlar sådana flöden till energi.”", cite: "Brennan Sprinkle, Colorado School of Mines" },

      { type: "h2", text: "Från trädgårdsleksak till framtidens turbiner" },
      { type: "p", html: "Fyndet är mer än en kuriositet för fysiknördar. Alla apparater som omvandlar strömmande luft eller vatten till rörelse eller kraft — från vattenturbiner till vindkraftverk — bygger på samma samspel mellan geometrins form och flödets rörelsemängd. Genom att reda ut exakt vilken mekanism som styr en så välkänd pryl som en trädgårdssprinkler hoppas forskarna kunna bidra med kunskap som är till nytta långt utanför trädgården." },

      { type: "fact", title: "Visste du?", items: [
        "Ernst Mach, som ställde sprinklerfrågan redan 1883, är samma fysiker som gett namn åt machtalet — förhållandet mellan en farkosts hastighet och ljudets hastighet.",
        "Trots att Richard Feynman aldrig löste sprinklergåtan själv delade han Nobelpriset i fysik 1965 — men för ett helt annat område, kvantelektrodynamiken.",
        "Namnet ”silly sprinklers” syftar på att forskarnas modeller är släkt med de böjda plaströrs-sprinklers som säljs som barnleksaker för att svalka sig en varm sommardag."
      ]}
    ]
  },

  {
    id: "2026-07-13-karnvapen-i-rymden",
    date: "2026-07-13",
    title: "En liten satellit ska kunna avslöja gömda kärnvapen i rymden — med hjälp av jordens egen strålning",
    deck: "MIT-forskaren Areg Danagoulian har i tidskriften Nature visat hur en detektor, inte större än en tjock uppslagsbok, skulle kunna avslöja om en satellit bär på ett kärnvapen — genom att räkna de neutroner som slås loss när jordens naturliga strålningsbälten träffar tunga atomkärnor som uran och plutonium. Metoden kan ge 1967 års rymdfördrag, som helt saknar kontrollmekanism, sina första verkliga tänder.",
    category: "Kärnfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-13-karnvapen-i-rymden.jpg",
    imageAlt: "Illustration av en liten kubformad satellit med guldfolie och solpaneler i rymden, med tunna vita linjer som konvergerar mot den och gnistrande partikelspår, framför jordklotet omgivet av två svagt lysande gröngula ringar som föreställer Van Allen-bältena, mot en stjärnbeströdd bakgrund.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kärnfysik", "modern fysik", "radioaktivitet", "neutroner", "spallation", "van allen-bältena", "rymdfysik", "partikeldetektor", "jordmagnetiska fältet", "kärnvapen", "fysik 1", "fysik 2"],
    sources: [
      { name: "MIT News (pressmeddelande)", url: "https://news.mit.edu/2026/mit-researcher-proposes-way-to-detect-nuclear-weapons-in-space-0708" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-space-sensor-hidden-nuclear-weapons.html" }
    ],
    research: { citation: "A. Danagoulian, ”Verification of the Outer Space Treaty with Cosmic Protons”, Nature (2026)", url: "https://doi.org/10.1038/s41586-026-10783-2" },
    body: [
      { type: "p", html: "Sedan 1967 har det funnits en internationell överenskommelse om att aldrig placera kärnvapen i jordens omloppsbana. Men rymdfördraget har alltid haft en svaghet: ingen har haft något sätt att kontrollera att det faktiskt hålls — en satellit går inte att inspektera som ett fartyg i en hamn. Nu föreslår kärnfysikern Areg Danagoulian vid MIT en lösning i tidskriften <em>Nature</em>, och den kräver varken tillstånd eller inspektörer ombord: låt jordens egen strålning göra jobbet." },

      { type: "h2", text: "En osynlig ring av fångade partiklar" },
      { type: "p", html: "Runt jorden ligger två bälten av laddade partiklar som jordens magnetfält har fångat in — de så kallade Van Allen-bältena — samma jordmagnetiska fält som skyddar oss från strålning uppe vid polerna. I det inre bältet far protoner runt med energier på uppemot en gigaelektronvolt — alltså miljarder elektronvolt, långt mer än energin hos fotonerna i en vanlig röntgenbild. Danagoulians idé är att låta en misstänkt satellit passera rakt igenom denna naturliga partikelstråle, och se vad som händer när protonerna träffar en gömd last av klyvbart material." },

      { type: "h2", text: "En regnskur av neutroner" },
      { type: "p", html: "Träffar en sådan energirik proton en tung atomkärna, till exempel uran eller plutonium, kan kärnan splittras i en process som kallas spallation — samma princip som ger neutroner vid Europeiska spallationskällan (ESS) i Lund, där protoner i stället skjuts mot ett mål av volfram. En vanlig satellit innehåller nästan inga tunga atomkärnor att klyva på det viset, så en plötslig skur av neutroner blir ett tydligt fingeravtryck av gömt klyvbart material." },

      { type: "quote", html: "”När en energirik proton slår in i grundämnen med högt atomnummer, som uran och plutonium, kan varje proton slå loss något i stil med 40 neutroner.”", cite: "Areg Danagoulian, MIT" },

      { type: "h2", text: "Diamant sorterar bort bruset" },
      { type: "p", html: "Danagoulians föreslagna detektor är inte större än en tjock uppslagsbok och byggd för att rymmas i en så kallad 9U CubeSat — en liten satellit i standardformat. Den använder två paneler av scintillatorer, material som blixtrar till i ljus när en partikel träffar dem, inklämda mellan skikt av syntetisk diamant. Diamantskikten sorterar bort protoner och elektroner så att bara neutronerna räknas, och de två panelernas inbördes läge gör det möjligt att räkna ut varifrån neutronerna kom — och därmed skilja en riktad skur från en misstänkt satellit från det jämna bruset av bakgrundsstrålning." },

      { type: "h2", text: "99 procents säkerhet — om avståndet är rätt" },
      { type: "p", html: "Enligt beräkningarna i studien kan detektorn avslöja ett gömt kärnvapen med 99&nbsp;% säkerhet om den befinner sig inom cirka 4&nbsp;km från den misstänkta satelliten i ungefär en vecka. Kommer den närmare, inom 1&nbsp;km, räcker en enda timmes mätning — och med flera detektorer samtidigt kan tiden kortas ytterligare." },

      { type: "quote", html: "”Man kan fejka underrättelser, men man kan inte fejka fysik.”", cite: "Areg Danagoulian, MIT" },

      { type: "h2", text: "Ett fördrag utan tänder" },
      { type: "p", html: "Rymdfördraget från 1967 har skrivits under av 118 länder, däribland USA, Ryssland och Kina, men saknar en mekanism för att kontrollera efterlevnaden. Frågan är långt ifrån akademisk: när USA 1962 detonerade en kärnladdning 400&nbsp;km över Stilla havet, i testet Starfish Prime, slogs flera dåtida satelliter ut av strålningen som frigjordes. Och 2022 sköt Ryssland upp satelliten Kosmos 2553 i en ovanlig bana rakt igenom den mest strålningsintensiva delen av det inre Van Allen-bältet — en bana som amerikanska tjänstemän 2024 offentligt kopplade till ett misstänkt program för kärnvapenbestyckade satellitvapen. Ryssland förnekar att något sådant program finns." },

      { type: "h2", text: "Bara ett förslag — än så länge" },
      { type: "p", html: "Danagoulian betonar själv att ingen sådan detektor ännu har byggts eller testats på riktigt — studien är en teoretisk genomförbarhetsstudie. ”Jag skriver i artikeln att det här inte är ett fullständigt bevisat system. Syftet är att visa forskarsamhället att det är vetenskapligt möjligt”, säger han. Nästa steg, hoppas han, är att nationella forskningslaboratorier bygger vidare på idén — och att den med tiden blir ett verktyg som beslutsfattare faktiskt litar på." },

      { type: "fact", title: "Visste du?", items: [
        "Van Allen-bältena upptäcktes 1958 av den amerikanske fysikern James Van Allen, med en Geigermätare ombord på USA:s första satellit, Explorer 1.",
        "En CubeSat byggs av standardiserade kubar om 10 cm i sidled — en ”9U”-satellit består av nio sådana kubar, ungefär i storlek med en resväska.",
        "Namnet spallation kommer av engelskans ”to spall”, att flisa av — precis som en proton kan flisa loss neutroner ur en tung atomkärna."
      ]}
    ]
  },

  {
    id: "2026-07-12-syntetiskt-svart-hal",
    date: "2026-07-12",
    title: "Ett stillastående kretskort får radiovågor att bli starkare — med ett knep lånat från svarta hål",
    deck: "Forskare vid CUNY Advanced Science Research Center i New York har i tidskriften Nature återskapat en av relativitetsteorins mest exotiska förutsägelser: att ett tillräckligt snabbt roterande föremål kan ge energi till en förbipasserande våg i stället för att bara reflektera den. Genom att låta en ring av elektroniska komponenter växla egenskaper i exakt rätt takt fick de radiovågor att uppträda som om de mötte ett föremål som snurrade snabbare än ljuset — och vågorna kom ut nästan sex gånger starkare än de gick in, utan att en enda del i kretsen någonsin rörde sig.",
    category: "Vågor",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-12-syntetiskt-svart-hal.jpg",
    imageAlt: "Konstnärlig målning i mörka toner: en ring med små kvadratiska noder omger en virvlande spiral i blått och orange, med vågmönster som strålar ut åt vänster i blått och åt höger i orange mot en stjärnbeströdd bakgrund.",
    imageCredit: "Illustration: Dalila Pasotti och Hadiseh Nasari / CUNY Advanced Science Research Center (pressbild, EurekAlert!)",
    tags: ["vågor", "elektromagnetism", "relativitetsteori", "svarta hål", "resonans", "metamaterial", "radiovågor", "energi", "modern fysik", "fysik 2"],
    sources: [
      { name: "EurekAlert! (CUNY Advanced Science Research Center, pressmeddelande)", url: "https://www.eurekalert.org/news-releases/1135209" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-synthetic-rotation-black-hole-energy.html" }
    ],
    research: { citation: "H. Nasari, H. Moussa, A. Alù et al., ”Observation of Floquet rotational super-radiance”, Nature (2026)", url: "https://doi.org/10.1038/s41586-026-10725-y" },
    body: [
      { type: "p", html: "1969 föreslog den brittiske fysikern Roger Penrose något som lät som ett skämt från naturen själv: ett roterande svart hål kan ge bort energi. Skickar man ett föremål i rätt bana genom <em>ergosfären</em> — den virvlande zonen utanför själva händelsehorisonten där rumtiden själv dras med i rotationen — och låter det klyvas i två delar där inne, kan den ena delen komma ut med mer rörelseenergi än hela föremålet hade från början. Två år senare, 1971, generaliserade den sovjetiske fysikern Jakov Zeldovitj idén till vågor: en tillräckligt snabbt roterande, absorberande cylinder borde kunna förstärka en radiovåg som studsar mot den, i stället för att bara dämpa den. Fenomenet kallas i dag <em>superradians</em>, eller Penrose–Zeldovitj-processen. Nu har forskare vid Advanced Science Research Center, en del av CUNY Graduate Center i New York (CUNY ASRC), byggt en apparat som återskapar just den fysiken — utan ett enda roterande föremål. Studien publicerades den 8&nbsp;juli i tidskriften <em>Nature</em>." },

      { type: "h2", text: "En ring som aldrig snurrar en enda grad" },
      { type: "p", html: "Problemet med att pröva Zeldovitjs idé i verkligheten är uppenbart: få saker går att snurra tillräckligt fort för att ge en mätbar effekt, och ingenting med massa kan snurra snabbare än ljuset. Forskarlaget, lett av Andrea Alù tillsammans med Hadiseh Nasari och Hady Moussa, löste problemet genom att aldrig snurra någonting alls. De byggde i stället en ring av tre elektroniska resonatorer — kretskomponenter som svänger vid en bestämd frekvens, ungefär som en gitarrsträng svänger vid sin egenfrekvens — och lät varje resonators egenskaper växla i tur och ordning med hjälp av <em>varaktordioder</em>, kondensatorer vars förmåga att lagra laddning går att styra elektriskt med en spänning. Växlingen vandrar runt ringen i ett fast mönster, ungefär som en åskådarvåg som sveper runt en fullsatt arena utan att en enda person lämnar sin plats. För en radiovåg som möter ringen är skillnaden mot en verkligt roterande kropp omöjlig att märka — men eftersom det bara är ett tidsschema som vandrar, inte massa som rör sig, går det att sätta mönstrets hastighet hur högt som helst, långt förbi ljushastigheten $c$. Tekniken kallas <em>Floquet-modulering</em>, efter den franske 1800-talsmatematikern Gaston Floquet, som studerade just system med periodiskt föränderliga egenskaper." },

      { type: "h2", text: "Radiovågorna kom ut starkare än de gick in" },
      { type: "p", html: "Forskarna skickade in en radiosignal på 100&nbsp;MHz med rätt <em>vinkelegenskaper</em> — samma sak som avgör åt vilket håll en våg ”snurrar” kring sin färdriktning — och mätte i bästa fall en förstärkning på 7,8&nbsp;dB. Omräknat i effekt betyder det att signalen kom ut omkring sex gånger starkare än den gick in. Energin kom inte från signalen själv, utan från den yttre krets som driver den vandrande moduleringen runt ringen — en roll som motsvarar det roterande svarta hålets egen rörelseenergi i Penrose ursprungliga tankeexperiment." },

      { type: "quote", html: "”Vågor med rätt vinkelegenskaper hämtar energi ur den syntetiska, tidsstyrda rotationen — det ger en helt ny form av bredbandig, riktad förstärkning.”", cite: "Andrea Alù, CUNY Advanced Science Research Center" },

      { type: "h2", text: "Ett tryggt labb för extrema fenomen" },
      { type: "p", html: "Ingen hävdar att en radiokrets på ett skrivbord i New York bevisar exakt hur riktiga svarta hål beter sig — de äkta exemplaren styrs av Einsteins allmänna relativitetsteori i krökt rumtid, inte av varaktordioder (ett stillastående svart hål omges av en händelsehorisont; det roterande fallet, med sin ergosfär, är ett steg mer komplext). Men matematiken som beskriver hur en våg vinner energi av en tillräckligt snabb rotation är densamma i båda fallen, vilket gör den elektroniska ringen till en ovanligt tillgänglig sandlåda för idéer som annars bara går att undersöka på astronomiskt avstånd — eller inte alls. Forskarna pekar själva ut trådlös kommunikation och radar som möjliga tillämpningar: en förstärkare utan vare sig rörliga delar eller en extern strömkälla kopplad direkt till signalvägen." },

      { type: "quote", html: "”Det här experimentet flyttar tankar om extrem rotationsdynamik från teori till praktik, och skapar en mångsidig experimentell plattform för fenomen i gränslandet mellan astrofysik, vågfysik och kvantvetenskap.”", cite: "Hadiseh Nasari, CUNY Advanced Science Research Center" },

      { type: "fact", title: "Visste du?", items: [
        "Roger Penrose delade Nobelpriset i fysik 2020 för att ha visat att bildandet av svarta hål är en oundviklig konsekvens av Einsteins allmänna relativitetsteori — samma teori som ligger bakom idén om att ett roterande svart hål kan ge bort energi.",
        "Namnet Floquet-modulering kommer från den franske matematikern Gaston Floquet, som redan på 1880-talet studerade lösningar till ekvationer med periodiskt varierande koefficienter — helt utan tanke på svarta hål eller radiovågor.",
        "En förstärkning på 7,8 dB motsvarar att vågens effekt blev omkring sex gånger så stor som innan — jämför med hur till exempel en förstärkares volym ofta anges just i decibel."
      ]}
    ]
  },

  {
    id: "2026-07-11-boehms-borstar",
    date: "2026-07-11",
    title: "Forskare avslöjar ett dolt mönster i ögat med skräddarsytt ljus — och vill göra det till ett nytt ögontest",
    deck: "De flesta har aldrig lagt märke till det, men långt ute i synfältets periferi döljer sig ett svagt, tvåflikigt ljusmönster som bara dyker upp när ljuset är polariserat. Forskare vid University at Buffalo och University of Waterloo har nu, med en teknik hämtad från kvantoptiken, förstärkt mönstret till tydliga figurer med flera flikar. Studien, publicerad i Proceedings of the National Academy of Sciences, är ett första steg mot ett helt nytt sätt att undersöka näthinnans hälsa.",
    category: "Optik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-11-boehms-borstar.jpg",
    imageAlt: "Sex bildrutor mot svart bakgrund, var och en med en grönt lysande ring omgiven av vita, pilspetsliknande flikar som strålar ut symmetriskt — förstärkta versioner av det entoptiska mönstret Boehms borstar, med olika antal flikar i varje bildruta.",
    imageCredit: "Illustration: Dusan Sarenac/University at Buffalo (CC BY 4.0)",
    tags: ["optik", "vågor", "polarisation", "ljus", "kvantoptik", "strukturerat ljus", "synen", "näthinnan", "medicinsk fysik", "entoptiskt fenomen", "fysik 2"],
    sources: [
      { name: "University at Buffalo (pressmeddelande)", url: "https://www.buffalo.edu/news/releases/2026/07/quantum-eye-test.html" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-quantum-optics-rare-visual-phenomenon.html" }
    ],
    research: { citation: "D. Pushin, D. Sarenac et al., ”Topological Expansion of Boehm's Brushes via Structured Light”, Proceedings of the National Academy of Sciences (2026)", url: "https://doi.org/10.1073/pnas.2532243123" },
    body: [
      { type: "p", html: "Titta länge mot en jämnt vit yta eller en ljusgrå datorskärm, och håll blicken lite vid sidan om det du egentligen tittar på. Hos de flesta människor dyker det då upp, långt ute i synfältets periferi, en svag, flimrande fläck med två motsatta lober — ett mönster nästan ingen lägger märke till, och som bara existerar inne i det egna ögat. Fenomenet kallas <em>Boehms borstar</em>, och det är ett av kroppens mest förbisedda sinnesintryck: ett bevis på att ögat, utan att vi vet om det, faktiskt kan uppfatta åt vilket håll ljus är polariserat. Nu har forskare vid University at Buffalo och University of Waterloo, med en teknik hämtad från kvantoptiken, förstärkt det bleka mönstret till tydliga, mångflikiga figurer — ett resultat publicerat i tidskriften <em>Proceedings of the National Academy of Sciences</em> (PNAS) som forskarna hoppas kan bli grunden för ett helt nytt slags ögontest." },

      { type: "h2", text: "Ljus som svänger åt ett bestämt håll" },
      { type: "p", html: "Vanligt dagsljus svänger åt alla håll på en gång, men ljus som studsat mot vatten eller glasrutor, eller strötts av luftens molekyler på himlen, blir delvis <em>polariserat</em> — det elektriska fältet svänger då huvudsakligen åt ett bestämt håll, vinkelrätt mot ljusets färdriktning (det är just den vinkelräta svängningen som gör ljus till en tvärvåg som går att polarisera — till skillnad från exempelvis ljud). Människoögat saknar ett eget ”polarisationsfilter” av det slag många insekter har, men det gömmer ändå två svaga, medfödda sätt att ana polarisationsriktningen. Det mest kända är <em>Haidingers borste</em>, en gulaktig, timglasformad fläck mitt i synfältet som den österrikiske fysikern Wilhelm Haidinger beskrev redan 1844, och som beror på färgade pigment i gula fläcken mitt i näthinnan. Boehms borstar, beskrivet av Gundo von Boehm så sent som 1940, är dess mindre kända kusin: det uppstår i stället långt ute i synfältets periferi och anses bero på att polariserat ljus sprids olika mycket i de tunna vävnadslagren längst ut i näthinnan." },

      { type: "h2", text: "Ljus skräddarsytt efter ögats egen geometri" },
      { type: "p", html: "För att förstärka det annars nästan omärkliga mönstret använde forskarlaget så kallat <em>strukturerat ljus</em> — en teknik utvecklad inom kvantoptiken, där ljusets polarisationsriktning varierar systematiskt över själva ljusstrålens tvärsnitt i stället för att vara densamma överallt. Genom att forma denna variation så att den speglar näthinnans egen, radiella symmetri kunde forskarna byta ut det svaga, tvåflikiga mönstret mot betydligt ljusare figurer med ett varierande antal flikar, beroende på hur ljuset skräddarsyddes (se bilden ovan för några av de mönster som uppmättes i studien)." },

      { type: "h2", text: "Från ja/nej-fråga till mätbart test" },
      { type: "p", html: "Ett dussin friska frivilliga fick titta in i en uppställning som till det yttre påminde om en vanlig synundersökning, vid optometriinstitutionen på University of Waterloo. I stället för att bara fråga om personen såg mönstret eller inte lät forskarna kontrasten justeras automatiskt tills varje persons egen tröskel för att upptäcka det hittades — och mätte samtidigt hur många flikar personen såg, hur mycket kontrast som krävdes, och var i synfältet mönstret dök upp. Resultatet: mönstret var lättast att upptäcka en bit ut från synfältets mitt, precis där Boehms borstar förväntas uppstå." },

      { type: "quote", html: "”Vårt strukturerade ljus gjorde de normalt svaga, tvåflikiga mönstren ljusare och lättare att se, med ett varierande antal flikar.”", cite: "Dusan Sarenac, University at Buffalo" },

      { type: "h2", text: "Nästa steg: sjuka ögon" },
      { type: "p", html: "Eftersom Boehms borstar uppstår just i näthinnans egna vävnadslager finns en förhoppning om att mönstret förändras om vävnaden är skadad. Forskarnas nästa steg är därför att testa metoden på patienter med näthinnesjukdomar, till exempel åldersförändringar i gula fläcken (makuladegeneration), för att se om skadade områden gör att mönstret upplevs annorlunda. Går det att visa ett sådant samband kan ett enkelt, snabbt seendetest med strukturerat ljus i bästa fall bli ett billigt komplement till dagens tyngre bildtagningsutrustning på ögonkliniker." },

      { type: "fact", title: "Visste du?", items: [
        "Du kan själv leta efter Haidingers borste: titta mot en jämnt ljus, vit yta eller en molnfri himmel och håll utkik efter en svag, gulaktig timglasformad fläck som rör sig med blicken.",
        "Bin och många andra insekter navigerar delvis med hjälp av himlens polarisationsmönster — en förmåga som människans öga bara anar via svaga, entoptiska mönster som Boehms borstar.",
        "Mönstret i studien uppstår genom så kallad Mie-spridning, då ljus sprids av strukturer ungefär lika stora som våglängden — en annan spridningsprocess än den Rayleigh-spridning som ger himlen dess blå färg."
      ]}
    ]
  },

  {
    id: "2026-07-10-frost-isbroar",
    date: "2026-07-10",
    title: "Forskare avslöjar hur frost sprider sig — via mikroskopiska isbroar som svävar fritt i luften",
    deck: "En forskargrupp vid University of Illinois Urbana-Champaign har för första gången filmat i tre dimensioner hur frost egentligen sprider sig mellan vattendroppar. Ibland kryper isen längs ytan, men på vissa material bygger den i stället osynliga broar av is som svävar fritt i luften — en upptäckt, publicerad i Nature Physics, som nästan kan fördubbla tiden innan kylskåp och luftkonditionering fryser igen.",
    category: "Termodynamik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-10-frost-isbroar.jpg",
    imageAlt: "Makronärbild av vita, kantiga iskristaller (rimfrost) som växer tätt tillsammans mot en svart bakgrund, med skarpt ljus som glittrar i kristallernas fasetter.",
    imageCredit: "Foto: W.carter (Wikimedia Commons, CC BY-SA 4.0)",
    tags: ["termodynamik", "värmelära", "fasövergångar", "deposition", "frost", "vätning", "hydrofob", "superhydrofob", "värmeledning", "materialfysik", "kylteknik", "fysik 1"],
    sources: [
      { name: "Physics World", url: "https://physicsworld.com/a/frost-spreads-across-surfaces-via-suspended-ice-bridges/" },
      { name: "EurekAlert! (University of Illinois Urbana-Champaign, pressmeddelande)", url: "https://www.eurekalert.org/news-releases/1130602" }
    ],
    research: { citation: "S. Yang, F. Chu, V. Ganesan et al., ”Growth and control of suspended ice bridges during sessile droplet freezing”, Nature Physics (2026)", url: "https://doi.org/10.1038/s41567-026-03296-2" },
    body: [
      { type: "p", html: "Två vattendroppar ligger sida vid sida på en kall yta. Den ena har redan frusit till is, den andra är fortfarande flytande — fast långt under 0&nbsp;°C, i det som kallas ett underkylt tillstånd. På bara några sekunder växer en tunn, nästan osynlig bro av is mellan dem. Forskare vid University of Illinois Urbana-Champaign har nu för första gången filmat i tre dimensioner hur sådana ”isbroar” bildas — och upptäckt att de ibland kryper längs ytan, ibland svävar fritt i luften ovanför den. Skillnaden, publicerad i tidskriften <em>Nature Physics</em>, visar sig vara nyckeln till att bromsa hur snabbt frost täcker en yta." },

      { type: "h2", text: "Ångan väljer den redan frusna droppen" },
      { type: "p", html: "Anledningen till att en bro alls bildas ligger i en skillnad i mättnadsångtryck — det tryck vattenånga har när luften precis är mättad — mellan flytande vatten och is vid samma temperatur under noll grader. Underkylt, flytande vatten har ett högre mättnadsångtryck än is vid samma temperatur, så vattenmolekyler avdunstar lättare från den flytande droppen än de sitter kvar på den redan frusna. Ångan diffunderar genom luften och övergår direkt till is på den frusna droppens yta — en fasövergång som kallas <em>deposition</em>, samma princip som ger rimfrost på gräs kalla nätter. Resultatet blir en tunn, växande tråd av is som till slut når hela vägen fram och fryser den flytande droppen också. På så sätt sprider sig frosten vidare, droppe för droppe, i en kedjereaktion över ytan." },

      { type: "h2", text: "Fuktavvisande ytor styr bron ut i luften" },
      { type: "p", html: "Med en teknik som kallas fokalplansskiftande avbildning, kombinerad med höghastighetsmikroskopi, kunde forskarlaget för första gången se broarna från sidan i stället för uppifrån — och upptäckte att ytans <em>vätningsegenskaper</em> avgör var bron växer. På en vanlig, fuktvänlig (hydrofil) yta ligger dropparna platta och breda, och isbron växer längs själva ytan, i kontakt med det kalla underlaget hela vägen. På en kraftigt fuktavvisande (superhydrofob) yta — där dropparna i stället bildar nästan perfekta klot, ungefär som daggdroppar på ett lotusblad — tvingas bron i stället växa uppåt och ut i fri luft mellan dropptopparna, utan att någonsin röra själva ytan. Forskarna fann att övergången sker vid en kontaktvinkel på ungefär 105°: droppar som är rundare än så ger nästan alltid en svävande bro." },

      { type: "h2", text: "Luften isolerar — och bromsar tillväxten" },
      { type: "p", html: "Skillnaden visade sig vara avgörande för hur snabbt frosten sprider sig. En bro som ligger an mot den kalla ytan leder bort värme snabbt, vilket håller ångtrycksskillnaden mellan broens spets och den flytande droppen hög — och bron fortsätter växa i rask takt. En svävande bro omges i stället av luft, en betydligt sämre värmeledare än det fasta underlaget. Spetsen på en svävande bro blir därför varmare i takt med att den växer, ångtrycksskillnaden som driver tillväxten krymper, och hela processen bromsas självmant in. Mätningarna visade att svävande broar växte över 80&nbsp;% långsammare än broar i kontakt med ytan." },

      { type: "quote", html: "”Vår studie visar att ytans vätningsegenskaper är den avgörande parameter som styr övergången mellan de två sätten att växa på.”", cite: "Siyan Yang, University of Illinois Urbana-Champaign" },

      { type: "h2", text: "Nästan dubbelt så lång tid innan kylan tar över" },
      { type: "p", html: "Upptäckten är mer än ett labbcuriosum. Forskarna testade en superhydrofob ytbeläggning på fullskaliga, kommersiella värmeväxlare av den typ som sitter i luftkonditionering, kylskåp och bilars kylsystem — och tiden innan frost helt täckte ytan blev nästan dubbelt så lång som på en obehandlad yta. Frost på en värmeväxlare försämrar värmeöverföringen och tvingar systemet att lägga energi på återkommande avfrostning, så insikten om isbroarnas geometri kan ge ingenjörer ett helt nytt grepp: att inte bara fördröja att is börjar bildas, utan att aktivt styra hur den sedan sprider sig vidare. Forskarna pekar själva ut flygplansvingar och kylsystem som exempel på ytor där några extra minuter utan frost kan göra stor skillnad." },

      { type: "fact", title: "Visste du?", items: [
        "Frost bildas genom deposition — vattenånga övergår direkt till is utan att passera vätskefasen på vägen, exakt samma fasövergång som ger rimfrost på gräs och bilrutor kalla nätter.",
        "Superhydrofoba ytor, som får vatten att bilda nästan runda droppar, är ofta inspirerade av lotusbladets självrengörande yta — den så kallade lotuseffekten.",
        "Isbroarna i studien var bara några tiotal mikrometer breda, tunnare än ett människohår, och hann bildas helt på under en halv minut."
      ]}
    ]
  },

  {
    id: "2026-07-09-skort-eller-segt-glas",
    date: "2026-07-09",
    title: "Fysiker knäcker gåtan om varför vissa glas spricker tvärt — och andra ger efter mjukt",
    deck: "En ny studie från Tata Institute of Fundamental Research i Hyderabad (TIFRH) visar att en och samma materialegenskap — hur snabbt ett ämne blir trögflytande när det kyls till glas — avgör om det brister plötsligt eller ger efter mjukt under belastning. Upptäckten, publicerad i Nature Communications, gäller långt fler material än fönsterglas: metaller, plaster, skum och geler kan alla vara ”glas” i fysikens mening.",
    category: "Materialfysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-09-skort-eller-segt-glas.jpg",
    imageAlt: "Makrofoto av en glasskiva som brustit i ett stjärnformat mönster, med tunna sprickor som strålar ut från en central islagspunkt och korsas av koncentriska ringsprickor — ett klassiskt exempel på skört brott.",
    imageCredit: "Foto: Jiří Zelenka (Wikimedia Commons, CC BY-SA 4.0)",
    tags: ["materialfysik", "mekanik", "glas", "amorfa material", "brottmekanik", "spänning-töjning", "sträckgräns", "hookes lag", "simulering", "fysik 1", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-glasses-suddenly-deform-smoothly.html" },
      { name: "EurekAlert! (TIFR Hyderabad, pressmeddelande)", url: "https://www.eurekalert.org/news-releases/1135355" }
    ],
    research: { citation: "R. Chatterjee, M. Adhikari, S. Karmakar, ”Role of fragility of the glass formers in the yielding transition under oscillatory shear”, Nature Communications (2026)", url: "https://doi.org/10.1038/s41467-026-71157-w" },
    body: [
      { type: "p", html: "En tallrik som far i golvet splittras på ett ögonblick i tiotals vassa skärvor. En plastlinjal går nästan att böja dubbelt utan att gå sönder. Båda räknas som <em>glas</em> i fysikens mening — och nu har forskare vid Tata Institute of Fundamental Research i Hyderabad (TIFRH) hittat en förvånansvärt enkel förklaring till varför vissa glas brister tvärt medan andra ger efter mjukt. Studien, publicerad i tidskriften <em>Nature Communications</em>, pekar ut en enda materialegenskap — dess ”fragilitet” — som avgörande för om utfallet blir skört eller segt." },

      { type: "h2", text: "Glas är mer än fönsterrutor" },
      { type: "p", html: "I fysikens mening är ett glas vilket fast ämne som helst där atomerna eller molekylerna har frusit fast i ett oordnat mönster i stället för att packa sig i en regelbunden kristallstruktur. Det sker när en vätska kyls så snabbt att partiklarna inte hinner ordna sig innan rörelsen avstannar helt. Utöver vanligt fönsterglas räknas därför en lång rad vardagliga material dit: vissa metallegeringar, plaster, skum, geler och till och med mjuka material som emulsioner och koloider. Alla kan uppträda helt olika under påfrestning — vissa ger efter mjukt och smidigt (segt beteende), andra håller emot och brister sedan tvärt utan förvarning (skört beteende)." },

      { type: "h2", text: "Stark eller skör vätska — långt innan glaset stelnat" },
      { type: "p", html: "Redan innan ett glas ens bildas skiljer forskare på ”starka” och ”sköra” vätskor, en klassificering som den amerikansk-australiske kemisten C.&nbsp;Austen Angell myntade på 1980-talet. När en vätska kyls mot sin glasövergång måste partiklarna ta sig över energibarriärer för att kunna röra på sig. I sköra vätskor växer barriärerna snabbt vid nedkylning, så viskositeten (trögflutenheten) skjuter i höjden redan vid en liten temperatursänkning. I starka vätskor växer barriärerna mer stegvis, så viskositeten ökar jämnare i stället. Forskarna Roni Chatterjee och Monoj Adhikari, i Smarajit Karmakars forskargrupp vid TIFRH, ställde en enkel fråga: styr samma egenskap även hur det färdiga, stelnade glaset beter sig när man böjer, drar eller trycker på det?" },

      { type: "h2", text: "Simulerad töjning fram och tillbaka" },
      { type: "p", html: "Med storskaliga datorsimuleringar byggde forskarna modeller av fyra sorters glasbildande system — metalliska glas, molekylära glas, kornformiga (granulära) system och nätverksbildande, kvartsliknande glas — vid en rad olika temperaturer. Varje modellmaterial utsattes sedan för upprepad fram-och-tillbaka-töjning (så kallad oscillerande skjuvning) med varierande amplitud, medan forskarna avläste hur den mekaniska spänningen (kraft per ytenhet — inte att förväxla med elektrisk spänning) förändrades med töjningen, den relativa formändringen. Precis som i den raka, inledande delen av ett fjäderdiagram — där Hookes lag gäller — ökade spänningen till en början proportionellt mot töjningen. Vid ett visst värde, <em>sträckgränsen</em>, nådde spänningen ett maximum — och just där skilde sig materialen åt. Ett stort spänningsfall direkt efter sträckgränsen är kännetecknet för skört brott; ett litet fall betyder i stället att materialet fortsätter flyta segt vidare." },

      { type: "h2", text: "Energibarriärerna avgör fallhöjden" },
      { type: "p", html: "Mönstret visade sig hänga ihop exakt med fragiliteten. I sköra glas växer energibarriärerna snabbt vid nedkylning, vilket tvingar fram allt större töjning innan materialet ger efter — och en större lagrad spänning ger ett större fall när brottet väl kommer: skört beteende. I starka glas ökar barriärerna mer stegvis, sträckgränsen förblir nästan oförändrad även vid djupare nedkylning, och spänningsfallet blir litet: segt beteende. I sitt pressmaterial illustrerar forskargruppen själva ytterligheterna med två vardagliga bilder: en fönsterruta som spricker i ett nät av sprickor, och smör som mjukt ger efter för en kniv utan att gå sönder." },

      { type: "h2", text: "Nästa steg: skräddarsydda material" },
      { type: "p", html: "Insikten är mer än en kuriositet. Ingenjörer väljer redan material efter hur de beter sig vid belastning — en bilruta ska helst spricka i trubbiga korn snarare än vassa skärvor, medan en bärande stålbalk absolut inte får brista utan förvarning. Genom att koppla ihop hur ett material stelnar till glas med hur det sedan brister hoppas forskarna kunna förutsäga, och kanske till och med skräddarsy, ett materials hållfasthet redan innan det tillverkas — bara genom att styra kylhastigheten." },

      { type: "fact", title: "Visste du?", items: [
        "Även metaller kan bli ”glas”: kyls en metallegering tillräckligt snabbt — för vissa legeringar krävs uppemot en miljon grader per sekund — hinner atomerna aldrig kristallisera. Sådana metalliska glas används bland annat i vissa golfklubbor och i transformatorkärnor, tack vare sin höga hållfasthet och låga energiförluster.",
        "Klassificeringen ”stark” och ”skör” vätska visualiseras i det så kallade Angell-diagrammet, en av glasfysikens mest citerade figurer — uppkallat efter kemisten som införde begreppen på 1980-talet.",
        "Sträckgränsen är samma begrepp som ingenjörer använder för stål och andra konstruktionsmaterial: den spänning där materialet slutar återgå till sin ursprungsform och i stället börjar deformeras permanent."
      ]}
    ]
  },

  {
    id: "2026-07-08-optisk-nal",
    date: "2026-07-08",
    title: "Forskare formar ljus till en nål — och ser nästan nio gånger djupare in i ögat",
    deck: "En ultratunn platt lins, bara omkring 7 mikrometer tjock, fokuserar ljus till en extremt smal och samtidigt ovanligt lång stråle — en så kallad optisk nål. Kombinerad med den ögonundersökningsteknik som kallas optisk koherenstomografi gav linsen nästan nio gånger djupare bilder utan att tappa skärpan, enligt en ny studie från Sun Yat-sen University.",
    category: "Optik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-08-optisk-nal.jpg",
    imageAlt: "Illustration av en tunn diffraktiv lins med koncentriska ringformade mikrostrukturer som fokuserar en ljusstråle till en extremt smal och lång nål av ljus, riktad mot en stiliserad tvärsnittsbild av ett människoöga i bakgrunden.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["optik", "diffraktion", "interferens", "vågor", "lins", "metalins", "oct", "medicinsk fysik", "våglängd", "ljus", "fysik 2"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-07-ultrathin-lens-focuses-optical-needle.html" },
      { name: "Optica — Optics Letters (sammanfattning)", url: "https://opg.optica.org/ol/abstract.cfm?doi=10.1364%2FOL.597598" }
    ],
    research: { citation: "J. Huang, Z. Duan, P. Xiao, H. Liang, ”Optical Needle with Narrow Lateral Focal Width and Extended Longitudinal Focal Depth Enabled by Multi-Level Diffractive Lens”, Optics Letters (2026)", url: "https://doi.org/10.1364/OL.597598" },
    body: [
      { type: "p", html: "En helt platt skiva av glas, bara omkring 7&nbsp;mikrometer tjock — tunnare än ett tiondels hårstrå — kan forma en ljusstråle till något som liknar en nål: extremt smal, och ändå fokuserad över en ovanligt lång sträcka. Forskare vid Sun Yat-sen University i Kina har byggt en sådan lins och kombinerat den med optisk koherenstomografi (OCT), tekniken ögonläkare använder för att fotografera ögats inre lager för lager. Resultatet, presenterat i en studie som antagits för publicering i tidskriften <em>Optics Letters</em>, gav nästan nio gånger djupare bilder utan att tappa skärpan." },

      { type: "h2", text: "En inbyggd avvägning i all optik" },
      { type: "p", html: "En vanlig lins tvingas välja mellan skärpa och räckvidd. Ju hårdare ljus fokuseras till en liten punkt, desto kortare sträcka håller fokuseringen i sig innan strålen böjer av och sprids igen — en konsekvens av att ljus är en våg och alltid <em>diffrakterar</em> en aning. Samma avvägning gör OCT besvärligt: tekniken kan visa strukturer på olika djup i till exempel näthinnan, men har historiskt haft svårt att samtidigt fånga riktigt fina detaljer alldeles vid vävnadens yta." },

      { type: "h2", text: "En lins byggd av trappsteg" },
      { type: "p", html: "Forskarlaget, lett av Haowen Liang, löste avvägningen genom att helt lämna den klassiska buktade linsen. I stället ritade de en platt skiva uppbyggd av miljontals mikroskopiska, trappstegsformade strukturer — en så kallad diffraktiv lins, som böjer ljuset med mönster i stället för med en krökt glasyta. Med datorstödd optimering finjusterade forskarna varje enskild struktur för att forma ljuset till en <em>optisk nål</em>: en stråle som hålls extremt smal över en ovanligt lång sträcka. De invecklade mönstren tillverkades sedan med en avancerad teknik som brukar kallas 3D-laserskrivning, som ristar strukturer med en precision under själva ljusets våglängd." },

      { type: "h2", text: "Nästan nio gånger djupare" },
      { type: "p", html: "I experimenten fokuserade den 7&nbsp;mikrometer tjocka linsen ljus med våglängder mellan 800 och 900&nbsp;nanometer till en nål med en genomsnittlig bredd på bara 2,4&nbsp;mikrometer — samtidigt som fokus höll sig skarpt över hela 2,64&nbsp;mm, ett djup omkring 1&nbsp;100 gånger större än nålens bredd. Ett människohår är omkring 70&nbsp;mikrometer tjockt; skalar man upp nålens mått till samma bredd skulle den hålla sig lika skarp över nästan 8&nbsp;centimeter, i stället för att tappa fokus efter någon millimeter som en vanlig lins gör. När forskarna bytte ut den vanliga fokuseringslinsen i ett OCT-system mot den nya diffraktiva linsen ökade avbildningsdjupet med nästan en faktor nio, jämfört med ett system som gav samma sidledsupplösning på traditionellt sätt." },

      { type: "quote", html: "”Även om OCT kan avbilda strukturer på olika djup har tekniken svårare att fånga riktigt fina detaljer på vävnadens yta. Med den optiska nålen går det att få skarpa, högupplösta bilder av både ytan och djupet samtidigt — vilket kan avslöja detaljer som är svåra att se med konventionella system.”", cite: "Haowen Liang, Sun Yat-sen University" },

      { type: "h2", text: "Från ögonbotten till mobilkameran" },
      { type: "p", html: "Liang ser i första hand en tillämpning inom ögonsjukvård: en skarpare bild av både näthinnans yta och dess djupare lager skulle kunna hjälpa läkare upptäcka sjukdomar tidigare och ställa säkrare diagnoser. Men samma grepp — att ersätta tung, buktad optik med en tunn, mönstrad skiva — öppnar enligt forskarna också för enklare och billigare avbildningssystem i vardagliga prylar som mobilkameror, utan att offra bildkvaliteten. Nästa steg är att göra den optiska nålen dynamiskt justerbar, så att dess form och intensitet kan anpassas efter vad som ska avbildas." },

      { type: "fact", title: "Visste du?", items: [
        "En diffraktiv lins böjer ljus med hjälp av mikroskopiska mönster i stället för genom en krökt glasyta — samma princip som ger diffraktionsmönstret bakom ett vanligt optiskt gitter.",
        "Optisk koherenstomografi (OCT) mäter avstånd i vävnad genom ljusets interferens, med en precision på någon mikrometer — lite som ett ultraljud, fast med ljus i stället för ljud.",
        "Namnet ”optisk nål” syftar på strålens form: extremt smal och samtidigt ovanligt lång i förhållande till sin bredd, ungefär som en riktig synål — fast av ljus."
      ]}
    ]
  },

  {
    id: "2026-07-07-elektronens-rymdtidsgrans",
    date: "2026-07-07",
    title: "Forskare bygger världens snabbaste elektronkamera — och stöter på en gräns mellan rum och tid",
    deck: "Genom att ersätta sveptunnelmikroskopets vanliga spänning med två extremt korta ljuspulser har tyska fysiker för första gången fångat exakt det ögonblick en enskild elektron tunnlar genom en energibarriär. Resultatet, publicerat i Nature Photonics, visar en tydlig kompromiss mellan hur exakt man kan veta var elektronen är och när den rör sig.",
    category: "Kvantfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-07-elektronens-rymdtidsgrans.jpg",
    imageAlt: "Illustration av ett sveptunnelmikroskops vassa metallspets som svävar över en enskild kopparatom på en silverkristall, med ett blåglödande vågliknande moln som symboliserar elektronens kvantmekaniska tunnling genom gapet, medan en gyllene ljuspuls anländer från vänster.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "modern fysik", "tunneleffekten", "heisenbergs osäkerhetsprincip", "sveptunnelmikroskop", "stm", "attosekundfysik", "våg-partikeldualitet", "laser", "nanoteknik", "optik", "atomfysik"],
    sources: [
      { name: "Regensburg Center for Ultrafast Nanoscopy (pressmeddelande)", url: "https://run-regensburg.de/2026/07/03/ultrafast-stm-at-the-run-reaches-the-quantum-mechanical-space-time-limit-for-the-first-time/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-ultrafast-scanning-tunneling-microscopy-quantum.html" }
    ],
    research: { citation: "S. Maier et al., ”Tracking electrons at the space-time limit”, Nature Photonics (2026)", url: "https://doi.org/10.1038/s41566-026-01932-0" },
    body: [
      { type: "p", html: "En vass metallspets svävar bara någon atombredd ovanför en enda kopparatom, placerad på en silverkristall. I glappet mellan dem tunnlar elektroner rakt igenom en energibarriär de enligt klassisk fysik aldrig borde kunna korsa — ett rent kvantmekaniskt fenomen. Nu har fysiker vid universitetet i Regensburg, i samarbete med Max Planck-institutet för materiens struktur och dynamik i Hamburg, för första gången fångat exakt det ögonblick en enskild elektron gör detta, med en tidsupplösning på attosekunder: miljarddels miljarddelar av en sekund. Resultatet, publicerat i tidskriften <em>Nature Photonics</em>, avslöjar samtidigt något oväntat — en gräns i själva verkligheten. Ju säkrare forskarna vet <em>när</em> elektronen rör sig, desto osäkrare blir det <em>var</em> den befinner sig." },

      { type: "h2", text: "Ett mikroskop byggt på en kvantgenväg" },
      { type: "p", html: "Sveptunnelmikroskopet (STM) uppfanns i början av 1980-talet av Gerd Binnig och Heinrich Rohrer vid IBM i Zürich — en uppfinning som gav dem Nobelpriset i fysik 1986. Principen bygger helt på tunneleffekten: förs en ledande spets tillräckligt nära en yta börjar elektroner tunnla genom det tomma gapet emellan, trots att de enligt klassisk fysik saknar tillräcklig energi för att ta sig över barriären. Tunnelströmmen är extremt känslig för avståndet mellan spets och yta, vilket gör att man kan avläsa ytan atom för atom — STM var det första instrumentet som lät forskare se enskilda atomer med egna ögon." },

      { type: "h2", text: "Ljuspulser i stället för spänning" },
      { type: "p", html: "Vanligtvis drivs tunnelströmmen av en konstant spänning. Forskarlaget, med Simon Maier som försteförfattare tillsammans med bland andra Jascha Repp och Rupert Huber, ersatte i stället spänningen med två extremt korta ljusvågscykler från en laser och lät tidsintervallet mellan pulserna styra exakt när elektronen tunnlar. ”Genom att variera tidsintervallet mellan de två laserpulserna kan vi direkt se hur elektronerna svarar”, säger Maier. Genom att finjustera fördröjningen i steg om attosekunder kunde forskarna både utlösa och tidsbestämma enskilda tunnelhändelser med en precision som aldrig tidigare uppnåtts i ett verkligt rumsligt mikroskop." },

      { type: "h2", text: "Ju säkrare i tid, desto osäkrare i rum" },
      { type: "p", html: "Teoretiska simuleringar från Angel Rubios grupp vid Max Planck-institutet i Hamburg visade att elektronen inte reagerar på ljusfältet exakt samtidigt som det slår till. ”Elektronen följer inte ljusfältet direkt, utan med en liten fördröjning på 500&nbsp;attosekunder”, förklarar Rubio. Men den mest intressanta upptäckten ligger i vad som händer när elektronen exciteras: den vinner extra energi — och just den energin sprider ut dess vågpaket i rummet." },

      { type: "quote", html: "”Ju mer exakt vi vill fastställa elektronens position i tiden, desto mer energi måste vi tillföra. Och som en följd sprids elektronens vågpaket ut mer i rummet.”", cite: "Raffael Spachtholz, medförfattare, Universitetet i Regensburg" },

      { type: "p", html: "Kompromissen påminner om ett välbekant fenomen från kvantfysiken: Heisenbergs osäkerhetsprincip, som säger att man aldrig kan känna till både en partikels exakta position och dess rörelsemängd samtidigt. Det nya är att forskarna nu, för första gången, har fångat motsvarande kompromiss mellan rum och tid direkt i en enda verklig elektron — inte bara som en rad i en lärobok, utan som en mätbar bild i ett riktigt mikroskop." },

      { type: "h2", text: "En biljon ampere på en nanometeryta" },
      { type: "p", html: "När elektronernas vågpaket klämdes samman i tid nådde strömmen genom mikroskopets spets extrema toppvärden: upp till en biljon (10<sup>12</sup>) ampere per kvadratcentimeter, koncentrerat till en yta bara någon atom bred — grovt räknat en miljard gånger tätare ström än vad en vanlig kopparledning i väggen klarar av. Jascha Repp vill använda de attosekundsnabba vågpaketen för att studera kemiska reaktioner i realtid: ”Vi vill använda sådana vågpaket för att selektivt utlösa kemiska reaktioner och se, på de relevanta längd- och tidsskalorna, hur kemiska bindningar bryts eller omformas.” Rupert Huber blickar i stället mot framtidens elektronik — insikterna skulle enligt honom kunna driva morgondagens kretsar vid elektronrörelsens egen hastighetsgräns, ”hundratusentals gånger snabbare än dagens dominerande CMOS-teknik”, den kiselbaserade transistortekniken som sitter i praktiskt taget alla dagens datorer och mobiler." },

      { type: "fact", title: "Visste du?", items: [
        "En attosekund (10<sup>−18</sup>&nbsp;s) förhåller sig till en sekund ungefär som en sekund förhåller sig till universums ålder, 13,8&nbsp;miljarder år — så beskrivs skalan ofta inom attosekundfysiken, som belönades med Nobelpriset i fysik 2023.",
        "Sveptunnelmikroskopet är, mer än 40&nbsp;år efter att det uppfanns, fortfarande ett av få instrument som kan se och flytta enskilda atomer en och en.",
        "Tunneleffekten är samma kvantfenomen som gör att alfapartiklar ibland kan ta sig ut ur en atomkärna trots att de enligt klassisk fysik borde vara instängda — grunden för det radioaktiva alfasönderfallet."
      ]}
    ]
  },

  {
    id: "2026-07-06-aldsta-kvasarerna",
    date: "2026-07-06",
    title: "Euclid hittar de mest avlägsna kvasarerna som någonsin bekräftats",
    deck: "Det europeiska rymdteleskopet Euclid har hittat 31 tidigare okända kvasarer från universums linda, däribland två nya rekordhållare vars ljus färdats i över 13 miljarder år. Fynden mer än fördubblar på ett enda år antalet kända kvasarer från denna avlägsna epok — och hjälper astronomer förstå hur universums första jättelika svarta hål hann växa så snabbt.",
    category: "Astronomi",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-06-aldsta-kvasarerna.jpg",
    imageAlt: "Himlakarta i Mollweide-projektion med Vintergatans ljusa stjärnband som ett bälte tvärs över mitten. Två oregelbundna blå fält uppe till vänster och nere till höger markerar de delar av himlen som Euclid kartlagt, med gula prickar för nyupptäckta kvasarer och två röda prickar för de mest avlägsna rekordhållarna.",
    imageCredit: "Bild: ESA/Euclid/Euclid Consortium/NASA/Planck Collaboration/A. Mellinger (CC BY-SA 3.0 IGO)",
    tags: ["astronomi", "kosmologi", "kvasar", "svarta hål", "rödförskjutning", "euclid", "esa", "reionisering", "big bang", "modern fysik", "supermassiva svarta hål", "rymden"],
    sources: [
      { name: "ESA — Euclid (pressmeddelande)", url: "https://www.esa.int/Science_Exploration/Space_Science/Euclid/Euclid_discovers_the_most_ancient_quasar_in_the_Universe" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-euclid-ancient-quasars-universe.html" }
    ],
    research: { citation: "D. Yang et al., ”Euclid: Discovery of 31 new quasars at 6.6 < z < 7.8”, Astronomy & Astrophysics (2026)", url: "https://doi.org/10.1051/0004-6361/202658883" },
    body: [
      { type: "p", html: "Ljuset hade redan varit på väg i över 13&nbsp;miljarder år när det till slut fångades av ett rymdteleskop i omloppsbana runt jorden. Det europeiska rymdteleskopet Euclid har hittat 31 tidigare okända kvasarer från universums linda — bland dem två nya rekordhållare, de mest avlägsna kvasarer som någonsin bekräftats. Fynden, publicerade i tidskriften <em>Astronomy &amp; Astrophysics</em>, mer än fördubblar på ett enda år antalet kända kvasarer från denna extremt tidiga epok — en uppgift som tidigare tagit över ett decennium att uppnå." },

      { type: "h2", text: "Ett kortvarigt jättebloss kring ett svart hål" },
      { type: "p", html: "En kvasar är ingen egen sorts himlakropp, utan en kort och intensiv fas i en galaxs liv. I centrum av nästan varje galax — även vår egen Vintergatan — sitter ett supermassivt svart hål. Ibland faller stora mängder gas och stoft in mot hålet i en roterande skiva, hettas upp till flera miljoner grader av friktion och gravitation, och lyser då upp starkare än hela den omgivande galaxen tillsammans. Det är den fasen som kallas kvasar, och de mest avlägsna som Euclid nu hittat sköt ut ljus med en sammanlagd ljusstyrka på omkring en biljon solar." },

      { type: "h2", text: "Rödförskjutningen avslöjar både avstånd och ålder" },
      { type: "p", html: "Universum expanderar, och ju längre resa ljuset gjort desto mer har dess våglängd sträckts ut på vägen — ljuset förskjuts mot den röda änden av spektrumet. Astronomer mäter denna rödförskjutning med talet $z$, och ett värde på $z = 7{,}77$ betyder att våglängden har sträckts ut till nästan nio gånger sin ursprungliga längd. De två nya rekordhållarna, EUCL J172902.75+641018.1 ($z = 7{,}77$) och EUCL J125308.55+705432.3 ($z = 7{,}69$), knappar om den tidigare rekordhållaren från 2021 ($z = 7{,}64$) och tar oss tillbaka till en tid då universum bara var omkring 670&nbsp;miljoner år gammalt — ynka 5&nbsp;% av dagens ålder på 13,8&nbsp;miljarder år. Båda objekten befinner sig mer än 13&nbsp;miljarder ljusår bort." },

      { type: "h2", text: "Ett mörk materia-teleskop som råkar vara perfekt för kvasarjakt" },
      { type: "p", html: "Euclid sköts upp i juli 2023 med huvuduppdraget att kartlägga hur galaxer är fördelade över en tredjedel av himlen, för att kartlägga mörk materia och mörk energi. Men samma kombination av stort synfält, hög upplösning och känslig infraröd syn gör teleskopet ovanligt bra även på att fånga sällsynta, extremt avlägsna objekt som annars försvinner i mängden. Forskarna, ledda av Daming Yang vid Leidens universitet i Nederländerna, sökte igenom Euclids breda himmelskartläggning med tre oberoende urvalsmetoder — bland annat maskininlärning — för att plocka ut kandidater, och bekräftade sedan 31 av dem som riktiga kvasarer med uppföljande spektroskopi från några av världens största markbaserade teleskop: Keck-observatoriet på Hawaii, Magellan-teleskopen i Chile och Large Binocular Telescope i Arizona, under drygt tjugo observationsnätter 2024–2025." },
      { type: "p", html: "”Euclid är en verklig game changer”, säger Yang. ”Tidigare kunde vi bara hitta en handfull av de allra ljusstarkaste uråldriga kvasarerna, men Euclid låter oss söka mycket effektivare över enorma delar av himlen och fånga betydligt svagare ljus. Det är ett unikt verktyg för kvasarjakt.”" },

      { type: "h2", text: "Svarta hål som verkar ha vuxit för fort" },
      { type: "p", html: "Att hitta så massiva, ljusstarka svarta hål bara några hundra miljoner år efter Big Bang är i sig ett problem för teorin: ett svart hål växer normalt genom att sluka gas i en takt som begränsas av sitt eget strålningstryck, och det tar tid att bygga upp en massa på miljarder solmassor den vägen. En av de nya kvasarerna har visat sig ha ett svart hål på bara omkring 40&nbsp;miljoner solmassor — en bråkdel av de flera miljarder solmassor som tidigare kända rekordhållare vägt in på. Att Euclid nu även kan fånga in denna typ av svagare, lättare kvasarer ger forskarna ett mycket bredare urval att pröva sina teorier om tidig galaxutveckling mot. ”Det här fyndet mer än fördubblar antalet kvasarer vi känner till som är så uråldriga”, säger Antonio La Marca, forskare vid ESA. ”Euclid-teamet har för första gången tagit en riktig folkräkning av kvasarer vid universums gryning.”" },

      { type: "quote", html: "”Uråldriga kvasarer är sällsynta fynd. De är intressanta i sig själva, men fungerar också som tidsmaskiner som låter oss utforska det tidiga universum och förstå hur de första generationerna av galaxer uppstod.”", cite: "Valeria Pettorino, ESA:s projektforskare för Euclid" },

      { type: "h2", text: "Ljus genom kosmisk dimma" },
      { type: "p", html: "Kvasarernas extrema ljusstyrka fungerar dessutom som ett bakljus genom kosmisk dimma. På vägen hit har ljuset passerat gas som ännu inte hunnit joniseras helt av de första stjärnorna och galaxerna — den så kallade reioniseringsepoken, då universum övergick från kallt och mörkt till hett och joniserat. Genom att studera exakt vilka våglängder som absorberats av vätgasen på vägen kan astronomer kartlägga hur och när universum till slut blev genomskinligt för ljus — en process som hänger ihop med atomers energinivåer och spektrallinjer — samma fysik som ligger bakom hur varje grundämne sätter sitt eget avtryck i ljuset." },

      { type: "fact", title: "Visste du?", items: [
        "Rödförskjutningen $z = 7{,}77$ betyder att kvasarens ljus har sträckts ut till nästan nio gånger sin ursprungliga våglängd på sin 13&nbsp;miljarder år långa resa hit.",
        "Namn som EUCL J172902.75+641018.1 är inget slumpmässigt — siffrorna anger objektets position på himlen (rektascension och deklination), ungefär som ett postnummer för stjärnhimlen.",
        "Euclids himmelskartläggning ska till slut täcka en tredjedel av himlen och pågår fram till 2029 — kartan i bilden ovan visar bara den del som var klar i augusti 2025, så fler uråldriga kvasarer väntas dyka upp."
      ]}
    ]
  },

  {
    id: "2026-07-05-super-puff-planeter",
    date: "2026-07-05",
    title: "Två jätteplaneter visar sig vara lättare än sockervadd",
    deck: "Astronomer har bekräftat ett sällsynt planetpar runt stjärnan TOI-791 — nästan lika stora som Jupiter, men med en densitet ner mot en trettiofemtedel av gasjättens egen. De hör till de mest extremt uppblåsta ”super-puff”-planeterna som någonsin hittats, och ett ovanligt bra laboratorium för att förstå hur jätteplaneter föds.",
    category: "Astronomi",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-07-05-super-puff-planeter.jpg",
    imageAlt: "NASA-illustration av den ljusa stjärnan TOI-791 i bakgrunden med de två jätteplaneterna TOI-791 b och c i förgrunden, avbildade som blåtonade klot mot en stjärnbeströdd rymd.",
    imageCredit: "Illustration: NASA/Daniel Rutter",
    tags: ["astronomi", "exoplaneter", "densitet", "gravitation", "tess", "nasa", "jupiter", "resonans", "keplers lagar", "rymden", "toi-791"],
    sources: [
      { name: "NASA — TESS-uppdraget (pressmeddelande)", url: "https://science.nasa.gov/missions/tess/nasas-tess-mission-reveals-the-puffiest-planets-ever-found/" },
      { name: "University of Oxford (pressmeddelande)", url: "https://www.ox.ac.uk/news/2026-06-24-researchers-discover-pair-of-giant-super-puff-planets-lighter-than-candy-floss" },
      { name: "Phys.org", url: "https://phys.org/news/2026-06-super-puff-planets-lighter-candy.html" }
    ],
    research: { citation: "G. Dransfield et al., ”ASTEP confirmation of a pair of long-period Jupiter-sized planets with extremely low densities transiting TOI-791”, Monthly Notices of the Royal Astronomical Society (2026)", url: "https://arxiv.org/abs/2606.30016" },
    body: [
      { type: "p", html: "Drygt 1&nbsp;110&nbsp;ljusår bort, i den obskyra sydliga stjärnbilden Volans (”den flygande fisken”), kretsar en stjärna med två planeter som trotsar sunt förnuft. Båda är ungefär lika stora som Jupiter — men bara en bråkdel så tunga. Ny forskning, publicerad i <em>Monthly Notices of the Royal Astronomical Society</em>, visar att paret TOI-791&nbsp;b och TOI-791&nbsp;c har en densitet så låg att den ligger under sockervaddens. Det gör dem till några av de mest extremt uppblåsta ”super-puff”-planeterna som någonsin bekräftats." },

      { type: "h2", text: "En planet lättare än sockervadd" },
      { type: "p", html: "Densitet beskriver hur mycket massa som ryms i en given volym, $\\rho = \\dfrac{m}{V}$, och mäts vanligen i kilogram per kubikmeter eller — som här — gram per kubikcentimeter. Jorden har en snittdensitet på ungefär 5,5&nbsp;g/cm³, medan gasjätten Jupiter, byggd nästan enbart av väte och helium, ligger på 1,33&nbsp;g/cm³. TOI-791&nbsp;b och c slår båda med marginal: 0,038 respektive 0,047&nbsp;g/cm³ — lägre än de cirka 0,05&nbsp;g/cm³ som en klase sockervadd brukar väga in på. ”De här två planeterna har en densitet jämförbar med en fin klick rakskum, färskt ur burken”, konstaterar astronomen George Dransfield vid University of Oxford, som ledde studien." },

      { type: "h2", text: "Jupiterstora — men nästan tomma inuti" },
      { type: "p", html: "TOI-791&nbsp;b har en radie på 0,993&nbsp;Jupiterradier — praktiskt taget identisk storlek — men väger bara 9,5&nbsp;jordmassor, motsvarande 3,0&nbsp;% av Jupiters massa. Den yttre planeten, TOI-791&nbsp;c, är till och med något större än Jupiter (1,155&nbsp;Jupiterradier) men väger ändå bara 18,6&nbsp;jordmassor, eller 5,9&nbsp;% av Jupiters massa. Jupiter är med andra ord mellan 28 och 35 gånger tätare än sina båda uppblåsta kusiner runt TOI-791 — en stjärna av spektraltyp F7, något hetare, större och yngre än solen." },

      { type: "h2", text: "En gravitationell dragkamp avslöjade vikten" },
      { type: "p", html: "Att mäta en avlägsen planets radie är förhållandevis enkelt: NASA:s rymdteleskop TESS registrerar hur mycket stjärnans ljus dämpas när planeten passerar framför den. Massan är desto knepigare att komma åt utan att kunna väga planeten direkt. Lösningen stavas gravitation: TOI-791&nbsp;b och c befinner sig nästan exakt i en 5:3-resonans — för var femte varv den inre planeten gör runt stjärnan hinner den yttre nästan exakt tre. Den ständiga gravitationsdragningen mellan de två planeterna får deras passager framför stjärnan att komma tidigare eller senare än en enkel omloppsbana skulle förutspå, med avvikelser på upp till 50&nbsp;minuter. Genom att analysera dessa tidsavvikelser (så kallade <em>transit timing variations</em>) kunde forskarna räkna fram exakt hur tunga planeterna faktiskt är — utan ett enda vägningsinstrument i sikte." },

      { type: "h2", text: "Ett teleskop i ständigt mörker" },
      { type: "p", html: "Upptäckten började redan 2019, då den ideella satsningen Planet Hunters TESS — där tusentals volontärer letar planetsignaler i TESS offentliga data — flaggade den första svaga ljusdippen från TOI-791. Planet c dök upp i data först 2023. Men för att fånga båda planeternas fullständiga, elva timmar långa passager krävdes långa sammanhängande observationsfönster, något TESS sällan erbjuder från sin omloppsbana. Lösningen blev ASTEP, ett 0,4&nbsp;meter stort teleskop vid den franskt-italienska forskningsstationen Concordia på Antarktis inland, där flera månaders sammanhängande polarnatt gav astronomerna det mörker de behövde — tre fullständiga passager av planet b och en av planet c." },

      { type: "quote", html: "”Det främsta skälet till att de här planeterna är intressanta att studera är att vi inte förväntade oss att se dem alls. De utgör ett pussel för oss att lösa om hur jätteplaneter som Jupiter — och super-puffarna — bildas.”", cite: "Jon Jenkins, NASA:s Ames Research Center" },

      { type: "h2", text: "Vad göms i det uppblåsta molnet?" },
      { type: "p", html: "Vad som exakt gör TOI-791&nbsp;b och c så extremt lätta är inte klarlagt, men en ledande hypotes pekar mot enorma atmosfärer av väte och helium, sannolikt uppblåsta redan när planeterna bildades långt ute i sitt planetsystem. Dransfield spekulerar i att molnen på nära håll sannolikt skulle se vita eller blå ut snarare än sockervaddens rosa. Färre än 40 super-puff-planeter är kända bland de nästan 6&nbsp;300 bekräftade exoplaneter som hittills hittats, och TOI-791 hör till bara fem kända system där mer än en sådan planet kretsar runt samma stjärna. ”Det här systemet är ett unikt laboratorium för att förstå hur super-puff-planeter bildas och utvecklas”, säger medförfattaren Amaury Triaud vid University of Birmingham." },

      { type: "fact", title: "Visste du?", items: [
        "TOI-791 b och c är låsta i en sällsynt 5:3-banresonans med en så kallad superperiod på över 88&nbsp;år — tiden det tar innan mönstret av tidsavvikelser upprepar sig.",
        "Densitetsformeln $\\rho = \\dfrac{m}{V}$ är samma som avgör om ett föremål flyter eller sjunker i vatten.",
        "TESS samlade in 1&nbsp;122&nbsp;dygns observationsdata över sju år innan planeternas exakta banor och massor kunde fastställas."
      ]}
    ]
  },

  {
    id: "2026-07-04-solstorm-norrsken",
    date: "2026-07-04",
    title: "En kraftig solstorm har nått jorden — chans till norrsken över stora delar av Sverige i sommarnatten",
    deck: "En ovanligt aktiv solfläcksgrupp small av med en X-klassad röntgenblixt i tisdags kväll och slungade ut ett moln av magnetiserad plasma mot jorden. Nu mäter NOAA en måttlig geomagnetisk storm som kan tänja norrskenszonen långt söderut — mitt i sommarens ljusaste nätter.",
    category: "Rymdväder",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-04-solstorm-norrsken.jpg",
    imageAlt: "Solen avbildad i extremt ultraviolett ljus i turkosa nyanser, med en intensivt vit ljusblixt uppe till höger som markerar utbrottet av en kraftig solflamma, samt en tunn ljusstråle som sträcker sig ner från utbrottsplatsen.",
    imageCredit: "Foto: NASA/SDO (Solar Dynamics Observatory)",
    tags: ["rymdväder", "norrsken", "aurora", "solstorm", "cme", "solfläck", "jordmagnetiska fältet", "magnetfält", "geomagnetisk storm", "kp-index", "elektromagnetism", "rymden"],
    sources: [
      { name: "NASA — Solar Cycle 25 (bloggen)", url: "https://science.nasa.gov/blogs/solar-cycle-25/2026/06/30/sun-releases-strong-flare-11/" },
      { name: "NOAA — Space Weather Prediction Center", url: "https://www.spaceweather.gov/news/moderate-geomagnetic-storm-watch-03-july-utc" },
      { name: "The Watchers", url: "https://watchers.news/2026/07/01/x1-1-solar-flare-produces-earth-directed-cme-g2-geomagnetic-storm-watch-issued-for-july-3/" }
    ],
    research: null,
    body: [
      { type: "p", html: "Tisdag kväll small en ovanligt aktiv solfläcksgrupp av med en kraftig röntgenblixt, och resterna av utbrottet har nu nått jorden. Natten mot lördagen den 4&nbsp;juli nådde den geomagnetiska stormen sin hittills kraftigaste fas, och ytterligare stötar väntas komma in de närmaste dygnen. Följden kan bli norrsken långt söder om sin vanliga hemvist vid polcirkeln — mitt i den ljusaste tiden på året, bara några veckor efter sommarsolståndet." },

      { type: "h2", text: "En het fläck på solen small av" },
      { type: "p", html: "Källan är den aktiva regionen AR4479, en magnetiskt djupt komplicerad solfläcksgrupp som klassas ”beta-gamma-delta” — den mest invecklade kategori en solfläcksgrupp kan få. Under ett dygn sköt den ut ett tiotal kraftiga flammor i M-klass, men klockan 20:50 UTC (22:50 svensk sommartid) small den betydligt starkare X1,1-flamman av. Flammor klassas efter styrkan hos röntgenstrålningen de sänder ut, i bokstavsordningen A, B, C, M och X, där varje steg motsvarar ungefär tio gånger mer energi — en X-flamma tillhör alltså den allra kraftigaste kategorin. Bilden ovan, tagen av NASA:s rymdteleskop Solar Dynamics Observatory i extremt ultraviolett ljus, visar den intensivt vita ljusblixten i samma ögonblick som den briserade." },

      { type: "h2", text: "Ett moln av magnetiserad plasma" },
      { type: "p", html: "Explosionen slungade också ut ett så kallat halo-CME (<em>coronal mass ejection</em>) — ett moln av flera miljarder ton magnetiserad plasma som sprids åt alla håll från solen, i det här fallet rakt mot jorden. Utbrottet syntes första gången i ett rymdteleskops koronografbilder redan klockan 21:45 UTC, och radioekon av den framrusande stötvågen användes för att uppskatta molnets hastighet till omkring 1500&nbsp;km/s — nästan 5,4 miljoner km/h." },
      { type: "p", html: "NOAA:s rymdväderscentral (Space Weather Prediction Center, SWPC) utfärdade snabbt en varning för en måttlig geomagnetisk storm, nivå G2 på myndighetens femgradiga skala från G1 till G5. Stormen mäts med det så kallade Kp-indexet, som anger hur mycket jordens magnetfält rubbas utifrån magnetometrar över hela jordklotet. Enligt SWPC:s senaste prognos väntades Kp-värdet natten mot lördagen nå upp mot 5,67 — i övre delen av G2-intervallet — innan aktiviteten sjunker under dagen. Ytterligare två plasmamoln som slungades ut den 1–2&nbsp;juli väntas nå jorden omkring den 5&nbsp;juli, så himlen kan fortsätta röra på sig ännu några dygn." },

      { type: "h2", text: "Så tänds himlen" },
      { type: "p", html: "Norrsken uppstår när laddade partiklar från solvinden fångas in av jordens magnetfält. Nära polerna pekar fältlinjerna nästan rakt ner mot marken i stället för att böja av partiklarna åt sidan, så där kan de tränga ner i den övre atmosfären i stället för att studsa bort. På vägen ner krockar partiklarna med syre- och kväveatomer och för över energi till atomernas elektroner, som hoppar upp till högre energinivåer. När elektronerna sedan faller tillbaka sänds ljus ut med en färg som motsvarar precis det energisteget — exakt den mekanism som Bohrs atommodell beskriver. Syre ger det klassiska gröna skenet på 100–250&nbsp;kilometers höjd och ett svagare rött sken högre upp, medan kväve bidrar med inslag av blått och lila i de kraftigaste stormarna." },

      { type: "h2", text: "Ljusa sommarnätter i vägen" },
      { type: "p", html: "En storm i den här klassen brukar tänja ut norrskenszonen långt söder om sin vanliga plats kring polcirkeln — under en stark G3-storm har norrsken synts så långt söderut som i amerikanska delstater som Kansas och Maryland. I Sverige skulle en lika kraftig storm i teorin kunna göra norrsken synligt långt söder om Norrland. Problemet i juli är ljuset: bara några veckor efter sommarsolståndet blir det aldrig riktigt mörkt i norra Sverige, och även längre söderut är nätterna korta. Bäst chans finns strax efter midnatt, i mörker långt från stadsljus — men de riktigt säkra korten kommer först när nätterna mörknar igen till hösten. Med solcykel 25 fortfarande nära sitt maximum lär fler tillfällen komma." },

      { type: "fact", title: "Visste du?", items: [
        "Solflammor klassas efter styrkan på röntgenstrålningen i bokstavsklasserna A, B, C, M och X, där varje bokstav motsvarar omkring tio gånger mer energi än den föregående. En X1,1-flamma ligger alltså strax över gränsen till den mest kraftfulla klassen.",
        "G-skalan för geomagnetiska stormar går från G1 (mindre störning) till G5 (extrem storm) och motsvarar Kp-index 5 till 9.",
        "Solcykel 25 — solens elva år långa aktivitetscykel — befinner sig fortfarande nära sitt maximum, vilket gör kraftiga flammor och stormar som denna vanligare just nu än de brukar vara."
      ]}
    ]
  },

  {
    id: "2026-07-03-vintergatans-spiralarmar",
    date: "2026-07-03",
    title: "Ekon av röntgenljus visar att Vintergatans yttre spiralarmar ligger längre bort än vi trott",
    deck: "Genom att mäta hur ringar av spritt röntgenljus från tre enorma stjärnexplosioner har vuxit över tid har astronomer räknat fram de mest exakta avstånden hittills till Vintergatans yttersta spiralarmar. Två av dem visar sig ligga upp till tio procent längre bort än man trott.",
    category: "Astronomi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-03-vintergatans-spiralarmar.jpg",
    imageAlt: "Schematisk illustration av en gammablixts röntgenljus som når ett rymdteleskop dels direkt via en rak linje, dels efter att ha spridits i ett stoftmoln längs en böjd, prickad linje, med svaga ekoringar kring blixtens position nära teleskopet.",
    imageCredit: "Illustration: Fysiklabbet",
    tags: ["astronomi", "vintergatan", "gammablixt", "röntgenstrålning", "elektromagnetiska vågor", "ljus", "avståndsmätning", "interstellärt stoft", "spiralarmar", "rymden"],
    sources: [
      { name: "NASA — Chandra X-ray Observatory (pressmeddelande)", url: "https://chandra.si.edu/press/26_releases/press_070126.html" },
      { name: "ESA — XMM-Newton", url: "https://www.esa.int/Science_Exploration/Space_Science/XMM-Newton/XMM-Newton_helps_revise_distance_to_outer_spiral_arms" },
      { name: "Phys.org", url: "https://phys.org/news/2026-07-xmm-newton-chandra-distance-milky.html" }
    ],
    research: { citation: "B. Vaia et al., ”Accurate distances of the Galactic spiral arms from dust-scattered X-ray emission of gamma-ray bursts”, Astronomy & Astrophysics (2026)", url: "https://www.aanda.org/articles/aa/full_html/2026/06/aa57431-25/aa57431-25.html" },
    body: [
      { type: "p", html: "När en av universums mäktigaste explosioner briserar slocknar den för blotta ögat på någon minut — men dess röntgenljus fortsätter att studsa runt bland Vintergatans stoftmoln i veckor efteråt. Genom att följa de svaga ringar av spritt röntgenljus som denna eftersläpning skapar har ett internationellt forskarlag nu mätt de mest exakta avstånden hittills till några av galaxens yttersta spiralarmar. Två av dem visar sig ligga upp till 10&nbsp;% längre bort än man trott." },

      { type: "h2", text: "En gammablixt lyser upp stoftet" },
      { type: "p", html: "Källan till ljuset är en gammablixt (på engelska <em>gamma-ray burst</em>, GRB) — en av universums mest energirika händelser, som uppstår när en massiv stjärna kollapsar eller två neutronstjärnor smälter samman. Blixten sänder ut en flodvåg av röntgenstrålning, elektromagnetisk vågrörelse precis som synligt ljus men med mycket kortare våglängd. Det mesta av strålningen når jorden i en rak linje. En liten del studsar i stället mot damm- och stoftmoln mellan stjärnorna och tar en omväg innan den anländer." },

      { type: "h2", text: "Ett eko av röntgenljus" },
      { type: "p", html: "Omvägen tar tid — på samma sätt som ekot av ett rop kommer efter det direkta ljudet. Ju längre bort ett stoftmoln ligger längs synlinjen, desto längre blir omvägen och desto senare anländer det spridda ljuset. Eftersom fotonerna sprids åt alla håll bildar de en ring runt gammablixtens position på himlen — en ring som sakta växer i takt med att allt mer avböjt ljus hinner fram. Genom att mäta hur snabbt ringen sväller, och kombinera det med ljusets kända hastighet $c \\approx 2{,}998 \\cdot 10^{8}\\ \\mathrm{m/s}$, kan avståndet till stoftmolnet räknas fram med ren geometri — utan några antaganden om hur galaxen roterar." },

      { type: "h2", text: "Tre blixtar, en kartläggning" },
      { type: "p", html: "Forskarna, ledda av doktoranden Beatrice Vaia vid IUSS Pavia och universitetet i Trento i Italien, kombinerade röntgenbilder från både ESA:s rymdteleskop XMM-Newton och NASA:s Chandra av tre gammablixtar: GRB&nbsp;031203 (2003), GRB&nbsp;160623A (2016) och den enormt ljusstarka GRB&nbsp;221009A (2022) — en blixt så kraftfull att den fått smeknamnet <em>the BOAT</em>, ”Brightest Of All Time”, den starkaste som någonsin registrerats. Ringarna i röntgenbilderna gick att koppla till stoftmoln i tre av Vintergatans spiralarmar: Perseusarmen, Yttre armen och Yttre Scutum–Centaurus-armen." },

      { type: "quote", html: "”Det här är ett mycket direkt sätt att mäta avstånden till Vintergatans spiralarmar exakt — en metod som enbart bygger på geometri.”", cite: "Beatrice Vaia, IUSS Pavia och universitetet i Trento, försteförfattare till studien" },

      { type: "p", html: "De flesta tidigare avståndsmätningar bygger i stället på antaganden om hur Vintergatan roterar, påpekar Vaia — antaganden som blir alltmer osäkra ju längre ut mot galaxens utkant man kommer." },

      { type: "h2", text: "Vintergatan lite större än väntat" },
      { type: "p", html: "Resultatet: avståndet till Perseusarmen stämde väl med tidigare uppskattningar, men både Yttre armen och Yttre Scutum–Centaurus-armen — två av de mest avlägsna kända strukturerna i vår egen galax, på bortre sidan av den galaktiska kärnan — visade sig ligga upp till 10&nbsp;% längre bort än man trott. Det låter som en liten justering, men i en galax som är omkring 100&nbsp;000 ljusår i diameter motsvarar tio procent tusentals ljusår." },

      { type: "h2", text: "Fysiken bakom mätningen" },
      { type: "p", html: "Metoden bygger på samma princip som all avståndsmätning med vågor: en känd våghastighet, en uppmätt tidsfördröjning och det enkla sambandet mellan hastighet, tid och sträcka — här tillämpat på röntgenstrålning i stället för synligt ljus, och på tusentals ljusår i stället för meter." },

      { type: "fact", title: "Visste du?", items: [
        "GRB 221009A, ”the BOAT”, var så kraftfull att den mättade instrument på flera rymdteleskop. Den kom från en döende stjärna i en galax cirka 2,4 miljarder ljusår bort — men dess röntgeneko syntes ändå tydligt genom vår egen galaxs stoftmoln, bara några tusen ljusår från solen.",
        "Röntgenstrålning har våglängder på ungefär 0,01–10 nanometer, hundratusentals gånger kortare än synligt ljus — därför krävs särskilda rymdteleskop som XMM-Newton och Chandra för att fånga den.",
        "Solen sitter inte i någon av Vintergatans stora spiralarmar utan i en mindre ”sporre” kallad Orionarmen, mellan de större Sagittarius- och Perseusarmarna."
      ]}
    ]
  },

  {
    id: "2026-07-02-cern-specialartikel",
    date: "2026-07-02",
    title: "Inne i CERN: sju decennier av partiklar, Nobelpris och en och annan mård",
    deck: "Från ett fredsprojekt i krigets skugga till Higgspartikeln och World Wide Web — och en och annan baguette, mård och rädsla för svarta hål på vägen. Följ med på en resa genom sjuttio år vid världens största fysiklaboratorium.",
    category: "Fördjupning",
    readingTime: "13 min",
    image: "nyheter/bilder/2026-07-02-cern-special.jpg",
    imageAlt: "Flygbild över CERN:s huvudanläggning i Meyrin på gränsen mellan Schweiz och Frankrike — ett stort område med forskningsbyggnader och verkstäder omgivet av åkrar, med den runda träkupolen Globen synlig till höger.",
    imageCredit: "Foto: Bernd Gross / Wikimedia Commons (CC0)",
    tags: ["cern", "partikelfysik", "lhc", "higgspartikeln", "standardmodellen", "antimateria", "world wide web", "historia", "modern fysik", "nobelpris", "specialartikel"],
    sources: [
      { name: "CERN — Vår historia", url: "https://home.cern/about/who-we-are/our-history/" },
      { name: "CERN — Webbens födelse", url: "https://home.cern/science/computing/birth-web" },
      { name: "Wikipedia — CERN", url: "https://en.wikipedia.org/wiki/CERN" }
    ],
    research: null,
    body: [
      { type: "p", html: "Djupt under vetefälten på gränsen mellan Schweiz och Frankrike ligger världens största maskin. I en 27&nbsp;kilometer lång ringtunnel jagar protoner varandra i nästan ljusets hastighet för att krocka och — för ett ögonblick — återskapa förhållanden som rådde en bråkdels sekund efter Big Bang. Ovanpå, i en labyrint av kontor, verkstäder och hallar, arbetar tusentals forskare från hela världen. Det här är CERN, och dess historia är på många sätt också berättelsen om den moderna fysiken." },

      { type: "h2", text: "Ett laboratorium byggt för fred" },
      { type: "p", html: "CERN föddes ur andra världskrigets ruiner. Europas fysiker hade skingrats, många hade flytt till USA, och en handfull framsynta forskare — bland dem italienaren Edoardo Amaldi och fransmannen Louis de Broglie — drömde om ett gemensamt europeiskt laboratorium som både kunde hejda kompetensflykten och ena en sönderslagen kontinent kring fredlig grundforskning. Den 29&nbsp;september 1954 trädde konventionen i kraft sedan tolv länder ratificerat den, och organisationen var ett faktum." },
      { type: "p", html: "Namnet bär spår av sitt ursprung. Bokstäverna <strong>CERN</strong> kommer från det provisoriska rådets franska namn, <em>Conseil Européen pour la Recherche Nucléaire</em> — Europeiska rådet för kärnforskning. När rådet upplöstes och den permanenta organisationen bildades bytte den namn till <em>Europeiska organisationen för kärnforskning</em>, men den inarbetade förkortningen fick leva kvar. Laboratoriet förlades till Meyrin, en förort strax nordväst om Genève, där anläggningen än i dag breder ut sig på båda sidor om landsgränsen." },
      { type: "p", html: "Den förste generaldirektören blev schweizaren <em>Felix Bloch</em>, Nobelpristagare 1952, som lade grundstenen till laboratoriet sommaren 1955. I dag har CERN ett tjugotal medlemsländer och sysselsätter omkring 2&nbsp;700 anställda. Dit reser dessutom drygt 12&nbsp;000 gästforskare — i CERN-jargong kallade <em>users</em> — från institutioner i fler än 80 länder. Det gör CERN till ett av de mest internationella ställen som finns; i lunchmatsalen blandas dussintals språk." },

      { type: "h2", text: "Sverige var med från början" },
      { type: "p", html: "Sverige är inget bihang till CERN, utan ett av de <strong>tolv grundarländerna</strong> från 1954 — tillsammans med Belgien, Danmark, Frankrike, Grekland, Italien, Jugoslavien, Nederländerna, Norge, Schweiz, Storbritannien och Västtyskland. Svenska forskare, ingenjörer och studenter har sedan dess varit djupt inblandade i experimenten, och svensk industri har levererat teknik till acceleratorerna. För den som drömmer om partikelfysik är CERN alltså inte en avlägsen utländsk institution, utan ett laboratorium som Sverige har varit med och byggt och betalat i över sjuttio år." },

      { type: "h2", text: "En kedja av allt större maskiner" },
      { type: "p", html: "LHC kom inte från ingenstans. Den är den senaste länken i en kedja av allt kraftfullare acceleratorer, där varje ny maskin ofta återanvänder den föregående som en första knuff åt partiklarna. Det började med <em>synkrocyklotronen</em> 1957, CERN:s första accelerator, följd av <em>protonsynkrotronen</em> (PS) som 1959 en kort tid var världens energirikaste maskin. År 1971 byggde CERN <em>Intersecting Storage Rings</em> — världens första krockare, där två partikelstrålar möttes rakt framifrån — och 1976 kom den stora <em>SPS</em> (Super Proton Synchrotron)." },
      { type: "p", html: "Innan LHC grävdes den 27&nbsp;kilometer långa ringtunneln ut för <em>LEP</em> (Large Electron-Positron Collider), som från 1989 till 2000 krockade elektroner mot sina antipartiklar, positroner. Det är samma tunnel som LHC använder i dag: när LEP monterades ner flyttade man in de supraledande magneter som styr protonerna. Varje protonstråle i LHC får först fart i den gamla PS:en och SPS:en innan den skickas in i den stora ringen — sju decenniers acceleratorbygge som samarbetar." },

      { type: "h2", text: "Upptäckterna som formade fysiken" },
      { type: "p", html: "CERN:s maskiner har gång på gång skrivit om läroböckerna. Redan 1973 såg bubbelkammaren <em>Gargamelle</em> de första spåren av <em>neutrala strömmar</em> — en förutsägelse från teorin som förenar elektromagnetism och den svaga kärnkraften. Tio år senare, 1983, fångade experimenten UA1 och UA2 de tunga <em>W-</em> och <em>Z-partiklarna</em>, som bär den svaga kraften. Upptäckten gav Carlo Rubbia och Simon van der Meer Nobelpriset redan året efter; van der Meers metod att ”kyla” och packa ihop antipartikelstrålar var det som gjorde bragden möjlig." },
      { type: "p", html: "När LEP tändes 1989 kunde forskarna, genom att mäta Z-partikelns sönderfall, visa något förbluffande: det finns exakt <strong>tre</strong> lätta neutrinoslag i naturen, inte fyra eller fem. Det talet — mätt till 2,984&nbsp;±&nbsp;0,008 — betyder att materiens byggstenar kommer i just tre ”familjer”. CERN har också varit antimateriens främsta hemvist: de allra första antiväteatomerna skapades här 1995, och 2010 lyckades <em>ALPHA</em>-experimentet för första gången fånga och hålla kvar antiväte i en magnetfälla länge nog för att studera det." },
      { type: "p", html: "Men den mest kända upptäckten kom den <strong>4&nbsp;juli 2012</strong>. Då meddelade experimenten ATLAS och CMS att de funnit <em>Higgspartikeln</em> vid en massa på ungefär 125&nbsp;GeV — den sista saknade pusselbiten i standardmodellen och beviset för mekanismen som ger andra partiklar massa. Året efter delade Peter Higgs och François Englert Nobelpriset. Sedan dess har LHC fortsatt överraska: 2015 hittade LHCb-experimentet <em>pentakvarkar</em> (partiklar av fem kvarkar), och 2023 visade ALPHA att antimateria faller <em>nedåt</em> i tyngdkraftsfältet precis som vanlig materia — ett svar på en fråga fysikerna grubblat på i årtionden." },
      { type: "quote", html: "”Som lekman skulle jag säga: jag tror att vi har den. Håller ni med?”", cite: "Rolf-Dieter Heuer, CERN:s dåvarande generaldirektör, när Higgsupptäckten tillkännagavs den 4 juli 2012" },

      { type: "h2", text: "Och så uppfanns webben på köpet" },
      { type: "p", html: "Ett av CERN:s mest omvälvande bidrag har ingenting med partiklar att göra. I mars 1989 skrev en brittisk mjukvaruingenjör vid namn <strong>Tim Berners-Lee</strong> ett förslag om hur laboratoriets forskare skulle kunna dela dokument mellan sina datorer. Hans chef klottrade i marginalen: <em>”Vague but exciting”</em> — vagt men spännande. Ur det förslaget växte <strong>World Wide Web</strong>." },
      { type: "p", html: "Berners-Lee byggde den första webbläsaren, den första webbservern och de första webbsidorna på en dator på CERN. Världens första webbplats, <em>info.cern.ch</em>, gick i luften i december 1990 och beskrev själva webbprojektet. Det avgörande beslutet kom den 30&nbsp;april 1993: CERN släppte webbtekniken fri, helt utan avgifter, i det som kallas <em>public domain</em>. Att koden gjordes gratis för alla att använda och bygga vidare på är en av de främsta anledningarna till att webben exploderade och blev vår tids kanske viktigaste uppfinning. Nästa gång du öppnar en webbläsare kan du alltså tacka ett fysiklaboratorium." },

      { type: "h2", text: "När allt nästan tog slut innan det börjat" },
      { type: "p", html: "Den 10&nbsp;september 2008 var en global mediehändelse. För första gången skickades en protonstråle hela vägen runt LHC-ringen, och tidningar över hela världen rapporterade om jättemaskinen. Sedan, bara nio dagar senare, small det. En dålig lödfog i en elektrisk koppling mellan två magneter gav upphov till en ljusbåge som slet upp heliumkylningen. Omkring sex ton flytande helium läckte ut explosivt, 53 supraledande magneter skadades och tunneln sotades ner." },
      { type: "p", html: "Reparationen — och ett helt nytt skyddssystem för att förhindra att det upprepades — tog över ett år. LHC kom inte igång på riktigt förrän den 20&nbsp;november 2009. Det var ett rejält bakslag, men också en läxa i ödmjukhet: en maskin med nästan tiotusen magneter kylda till −271&nbsp;°C tål inga slarviga lödfogar." },

      { type: "h2", text: "Neutrinerna som verkade springa fortare än ljuset" },
      { type: "p", html: "Hösten 2011 skakades fysikvärlden av ett omöjligt resultat. Experimentet <em>OPERA</em> hade skickat neutriner 730&nbsp;kilometer rakt genom berggrunden från CERN till laboratoriet Gran Sasso i Italien — och de tycktes komma fram omkring 60&nbsp;nanosekunder för tidigt, alltså snabbare än ljuset. Om det stämde skulle Einsteins relativitetsteori, en av fysikens grundpelare, vara i gungning." },
      { type: "p", html: "Men OPERA-forskarna ropade aldrig ”vi har slagit Einstein”. Tvärtom: de kunde inte hitta felet själva, så de lade fram mätningen offentligt och bad hela världen att granska den. Och felet fanns där. En fiberoptisk kabel till en klocka satt inte ordentligt fastskruvad, vilket förvanskade tidmätningen. När kabeln väl dragits åt — och ett annat experiment, ICARUS, gjort en oberoende mätning — visade det sig att neutrinerna höll sig prydligt under ljushastigheten. I juni 2012 var saken avgjord. Ingenting hade sprungit fortare än ljuset, men fysiken hade visat upp sig från sin bästa sida: ett uppseendeväckande påstående, offentlig granskning och en ärlig rättelse." },

      { type: "h2", text: "En baguette, en mård och rädslan för svarta hål" },
      { type: "p", html: "CERN:s historia rymmer också sådant som får forskarna att skratta i efterhand. I november 2009 tappade en fågel — troligen en uggla — en bit baguette rakt ner på ett utomhusställverk. Brödet orsakade en kortslutning som störde kylningen till en del av magneterna. Ryktet växte snabbt till att ett franskbröd nästan sänkt världens dyraste maskin, men sanningen är mer beskedlig: LHC stod stilla utan stråle just då, allt var åter i ordning inom några timmar och ingen skada skedde. Fågeln kom undan — utan sin lunch." },
      { type: "p", html: "Värre gick det för de <em>stenmårdar</em> som 2016 tog sig in på anläggningen. Vid ett tillfälle klättrade en mård upp på en transformator på 66&nbsp;000&nbsp;volt och slog ut acceleratorn i ungefär en vecka; senare samma år kortslöt en ung mård strömmen till ALICE-experimentet. Djuret överlevde inte — men fick ett oväntat efterliv: dess kvarlevor visas i dag på ett naturhistoriskt museum i Rotterdam, i en utställning om djur som mött sitt öde på minnesvärda sätt." },
      { type: "p", html: "Allvarligast av allt var kanske rädslan bland allmänheten. Inför starten 2008 spreds farhågan att LHC skulle skapa ett litet svart hål som slukade jorden. Två män lämnade till och med in en stämning i USA för att stoppa maskinen, och några forskare fick ta emot hotmejl. CERN:s säkerhetsgrupp visade lugnt varför det var ofarligt: kosmisk strålning med långt högre energi träffar jorden, solen och månen oavbrutet sedan miljarder år tillbaka, utan att några katastrofala svarta hål har bildats. LHC startade. Jorden finns kvar." },

      { type: "h2", text: "Fysiken bakom kollisionerna" },
      { type: "p", html: "Bakom all denna storslagenhet ligger grundläggande fysik. Att hålla protonerna kvar i sin cirkelbana är ett klassiskt exempel på magnetismens verkan: en laddad partikel som far genom ett magnetfält känner <em>Lorentzkraften</em>, $F = q \\cdot v \\times B$, riktad vinkelrätt mot både farten och fältet. Det är precis den kraften som tvingar in partikeln i en cirkel i stället för att låta den fortsätta rakt fram. Själva krockarna, där rörelseenergi blir till nya partiklars massa, vilar på Einsteins samband mellan energi och massa, $E = mc^2$. CERN är, kort sagt, grundläggande fysik uppskruvad till max." },

      { type: "fact", title: "Visste du?", items: [
        "Higgsupptäckten presenterades 2012 i typsnittet Comic Sans. På Twitter blev ”Comic Sans” snabbt ett större samtalsämne än själva partikeln.",
        "Smeknamnet ”gudspartikeln” kommer från en boktitel. Författaren ville egentligen kalla Higgspartikeln ”the goddamn particle” — den förbaskade partikeln, för att den var så svår att hitta — men förlaget ändrade det.",
        "CERN tillverkar antimateria på riktigt, precis som i Dan Browns <em>Änglar och demoner</em> — men bara några miljarddels gram. Att samla ihop ett enda gram skulle ta miljarder år.",
        "När CERN 1993 släppte webbtekniken fri och gratis lade laboratoriet grunden till hela det internet vi använder i dag."
      ]}
    ]
  },

  {
    id: "2026-07-02-lhc-stanger-av",
    date: "2026-07-02",
    title: "Världens största partikelaccelerator stängs av i fyra år — ska komma tillbaka tio gånger starkare",
    deck: "Efter arton år av protonkrockar och en Higgsupptäckt som gav Nobelpriset har CERN stängt av Large Hadron Collider för sin tredje stora ombyggnad. När maskinen startar igen 2030 ska den ge upp till tio gånger fler kollisioner i jakten på mörk materia och ny fysik.",
    category: "Partikelfysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-02-lhc-stanger-av.jpg",
    imageAlt: "Tekniker i hjälm och varselväst arbetar i en av CERN:s underjordiska hallar bland kranar, stora kryogena rör och blå elskåp under ombyggnaden av Large Hadron Collider.",
    imageCredit: "Foto: CERN",
    tags: ["partikelfysik", "cern", "lhc", "higgspartikeln", "standardmodellen", "mörk materia", "magnetfält", "modern fysik", "partikelaccelerator", "cirkulär rörelse"],
    sources: [
      { name: "CERN (pressmeddelande)", url: "https://home.cern/cern-bids-farewell-to-the-lhc-and-enters-long-shutdown-3/" },
      { name: "Physics World", url: "https://physicsworld.com/a/cern-says-large-hadron-collider-has-exceeded-every-expectation-as-it-shuts-down-ahead-of-major-upgrade/" },
      { name: "Phys.org", url: "https://phys.org/news/2026-06-world-largest-particle-smasher-halts.html" }
    ],
    research: null,
    body: [
      { type: "p", html: "Lördagen den 27&nbsp;juni klockan 06:00 dumpade operatörerna vid CERN de sista protonstrålarna i Large Hadron Collider (LHC) — världens största partikelaccelerator. Efter arton år av kollisioner, en Higgspartikel och ett Nobelpris går maskinen nu in i sin tredje stora ombyggnadspaus: fyra års renovering innan den vaknar upp 2030 som en kraftfullare version, High-Luminosity LHC (HL-LHC)." },

      { type: "h2", text: "En 27 kilometer lång ring under jorden" },
      { type: "p", html: "LHC är en 27&nbsp;kilometer lång cirkulär tunnel omkring 100&nbsp;meter under gränsen mellan Schweiz och Frankrike. Där drivs protoner runt av fler än 9&nbsp;000 supraledande magneter, kylda till 1,9&nbsp;K (−271&nbsp;°C) — kallare än den kosmiska bakgrundsstrålningen ute i rymden (2,7&nbsp;K). Vid full fart hinner protonerna 11&nbsp;245 varv i sekunden i 99,9999991&nbsp;% av ljusets hastighet, tvingade i sin cirkelbana av de starka magnetfälten." },
      { type: "quote", html: "”LHC har överträffat varje förväntan. I nästan två decennier har den omformat vår förståelse av universum.”", cite: "Oliver Brüning, CERN:s direktör för acceleratorer och teknik" },

      { type: "h2", text: "Från kollision till Nobelpris" },
      { type: "p", html: "Den 4&nbsp;juli 2012 meddelade experimenten ATLAS och CMS att de hittat Higgspartikeln — beviset för den mekanism som ger andra partiklar massa. Fyndet gav Peter Higgs och François Englert Nobelpriset i fysik redan året efter. Sedan starten 2008 har LHC dessutom bidragit till upptäckten av fler än 85 nya hadroner — sammansatta partiklar av kvarkar — och satt allt tätare gränser för var ny, okänd fysik skulle kunna gömma sig." },

      { type: "h2", text: "Fyra år för tio gånger fler kollisioner" },
      { type: "p", html: "Under ombyggnaden, kallad <em>Long Shutdown 3</em>, ska cirka 1,2&nbsp;kilometer av acceleratorns magneter och annan utrustning plockas bort och ersättas. Notan landar på ungefär 1,2&nbsp;miljarder schweizerfranc (cirka 1,5&nbsp;miljarder dollar). Målet är att öka <em>luminositeten</em> — ett mått på hur många kollisioner som sker per sekund — med upp till tio gånger. Vid varje möte mellan de tätt packade protonbuntarna sker i dag omkring 60&nbsp;kollisioner samtidigt; efter ombyggnaden väntas det bli 140–200, och detektorerna måste då hantera fler än 5&nbsp;miljarder växelverkningar i sekunden." },
      { type: "quote", html: "”Det här är ett mycket viktigt ögonblick. Från och med måndagen går vi in i en ny fas.”", cite: "Markus Zerlauth, projektchef för HL-LHC" },
      { type: "p", html: "Delar av injektorkedjan — de mindre acceleratorer som förbereder protonerna innan de skickas in i LHC-ringen — börjar tas i drift igen redan från 2028. Men det är först 2030 som själva LHC-ringen vaknar till liv igen, nu som HL-LHC, för att köra i ungefär ett decennium. Med tio gånger fler kollisioner räknar forskarna med att kunna producera omkring 380&nbsp;miljoner Higgspartiklar, jämfört med 55&nbsp;miljoner hittills — data nog för att mäta Higgspartikelns egenskaper med långt större precision och söka efter tecken på mörk materia, som utgör ungefär 27&nbsp;procent av universums innehåll." },

      { type: "h2", text: "Fysiken bakom strålen" },
      { type: "p", html: "Att hålla protonerna på sin cirkelbana är ett klassiskt exempel på magnetismens verkan: en laddad partikel som rör sig genom ett magnetfält påverkas av Lorentzkraften, $F = q \\cdot v \\times B$, riktad vinkelrätt mot både rörelsen och fältet — precis den kraft som får en laddad partikel att svänga in i en cirkelbana i stället för att fortsätta rakt fram. Kollisionerna själva, där rörelseenergi omvandlas till nya partiklars massa, bygger på Einsteins samband mellan energi och massa, $E = mc^2$." },

      { type: "fact", title: "Visste du?", items: [
        "Protonerna i LHC hinner 11&nbsp;245 varv runt ringen varje sekund — i 99,9999991&nbsp;% av ljusets hastighet.",
        "Vid 1,9&nbsp;K (−271&nbsp;°C) är LHC:s magneter kallare än rymden mellan galaxerna, där den kosmiska bakgrundsstrålningen håller 2,7&nbsp;K.",
        "Higgspartikeln, som ger andra partiklar massa, upptäcktes den 4&nbsp;juli 2012 — nästan exakt fjorton år före dagens stängning.",
        "Nästa gång LHC krockar protoner på allvar är 2030. Fram till dess pågår ombyggnaden dygnet runt, med tusentals tekniker och forskare inblandade."
      ]}
    ]
  },

  {
    id: "2026-07-01-grafen-supraledning",
    date: "2026-07-01",
    title: "Grafit döljer fyra supraledande tillstånd — och magnetfält gör dem starkare",
    deck: "MIT-forskargrupp har hittat fyra distinkta former av supraledning i ett grafen-arrangemang som förekommer naturligt i grafit. Det mest häpnadsväckande: tre av tillstånden trotsar starka magnetfält och förstärks av dem, trots att magnetfält normalt dödar supraledning.",
    category: "Modern fysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-07-01-grafen-supraledning.jpg",
    imageAlt: "Grafisk illustration av tre supraledande tillstånd i romboedrisk pentalagers grafen — tre varianter av elektronparning visualiseras i rött, grönt och blått som Cooperpar flödar utan motstånd.",
    imageCredit: "Illustration: Amy Pan, RLE/MIT (CC BY-NC-ND)",
    tags: ["supraledning", "grafen", "grafit", "magnetfält", "modern fysik", "kondenserade materiens fysik", "materialfysik", "kvantfysik", "cooperpar"],
    sources: [
      { name: "MIT News", url: "https://news.mit.edu/2026/graphene-can-hold-multiple-states-of-superconductivity-0629" },
      { name: "Phys.org", url: "https://phys.org/news/2026-06-graphene-multiple-states-superconductivity.html" }
    ],
    research: {
      citation: "J. Seo, A. A. Cotten, S. Ye et al., “Family of magnetic field-boosted superconductors in rhombohedral graphene”, Nature (2026)",
      url: "https://doi.org/10.1038/s41586-026-10815-x"
    },
    body: [
      { type: "p", html: "Grafiten i en blyertspenna — det svarta, mjuka mineralet som lämnar spår på papper — innehåller ett av materialfysikens senaste under. MIT-forskargruppen ledd av Long Ju har hittat fyra separata former av supraledning i ett ovanligt lager-arrangemang av grafen som förekommer naturligt i grafit. Det mest häpnadsväckande: tre av tillstånden överlever kraftiga magnetfält och förstärks av dem, trots att magnetfält normalt dödar supraledning." },

      { type: "h2", text: "Grafen och grafit — ett atomlager skiljer dem åt" },
      { type: "p", html: "Grafen är ett enda lager kolatomer i ett hexagonalt mönster, likt en vaxkaka. Staplas tusentals sådana lager på varandra uppstår grafit — trots namnet innehåller blyertspennans “blyerts” inte ett gram bly, bara kol. I de allra flesta prover staplas lagren i en vanlig AB-ordning (Bernal-stappling). Men i grafit finns även en mer ovanlig variant: romboedrisk stappling, där varje nytt lager förskjuts lite mer åt sidan, som stegen på en spiraltrappa. Det är i just fyra eller fem sådana trappstegsstaplade lager — romboedrisk pentalagers grafen — som MIT-teamet nu gjort sina fynd." },
      { type: "quote", html: "“Folk kanske antar att det här är ett enkelt, ointressant kolmaterial.”", cite: "Long Ju, associerad professor i fysik, MIT" },

      { type: "h2", text: "Magnetfältet förstärker i stället för att döda" },
      { type: "p", html: "Supraledning uppstår när elektroner vid extremt låga temperaturer bildar par — Cooperpar — och rör sig igenom materialet utan motstånd alls. Normalt har supraledare en akilleshäl: magnetfält sliter sönder elektronparen och bryter supraledningen, en effekt känd som Pauligränsen. I Long Jus experiment riktades magnetfält på upp till 9&nbsp;tesla vinkelrätt mot grafen-skiktet — ungefär 180&nbsp;000 gånger jordens magnetfält. I stället för att kollapsa hände det motsatta: den kritiska temperaturen ökade från 55&nbsp;millikelvin till ungefär 90&nbsp;millikelvin, och materialet klarade 50–60&nbsp;procent mer ström innan supraledningen bröt samman. För att sätta temperaturen i perspektiv: 55&nbsp;millikelvin är 0,055&nbsp;kelvin ovanför den absoluta nollpunkten (−273&nbsp;°C) — det är lika kallt som chipen i de mest avancerade kvantdatorerna." },
      { type: "p", html: "Förklaringen tros ligga i att elektronparen i dessa tillstånd bildas med sina spinn parallella i stället för antiparallella — ett ovanligt arrangemang kallat triplett-parning. Det gör att magnetfältet, som normalt sliter sönder paren, i stället tenderar att stabilisera dem. “Ur ett grundläggande fysikperspektiv är det väldigt exotiskt att ett magnetfält inte dödar supraledningen”, säger Ju." },

      { type: "h2", text: "Fyra tillstånd som väljs med ett spänningsreglage" },
      { type: "p", html: "De fyra supraledande tillstånden inträder vid olika elektrontätheter i materialet, och tätheten styrs via elektroder med ett spänningsreglage. Forskarna kan bokstavligen “byta kanal” bland tillstånden. Junseok Seo, en av de ledande forskarstudentsförfattarna, sammanfattar: “Vi kan styra det enklaste av alla kemiska ämnen — kol — och strukturellt förändra det.” Att ett och samma material kan hysa fyra varianter av supraledning är i sig exceptionellt; de flesta kända supraledare har bara en. Fundet öppnar möjligheten att en dag designa supraledare med specifika egenskaper på beställning, utan att behöva byta material." },

      { type: "h2", text: "Supraledning och magnetism" },
      { type: "p", html: "Supraledning hör till den moderna fysiken: fenomenet att elektrisk resistans sjunker till exakt noll nedan en kritisk temperatur. Magnetfältets roll knyter an till <strong>elektromagnetismen</strong>. Att magnetfält kan förstärka snarare än döda supraledning berör begreppet spinn — elektronernas kvantmekaniska inre tillstånd. Materialet ger dessutom en elegant länk till kolatomens bindningsegenskaper och kristallstrukturer, teman som återkommer i kemi och materialteknik." },

      { type: "fact", title: "Visste du?", items: [
        "Grafen — ett enda atomlager av kol — är ett av de starkaste material som finns trots att det är bara en atom tjockt. Grafenforskarna Andre Geim och Konstantin Novoselov fick nobelpriset i fysik 2010.",
        "Romboedrisk stappling (ABC-stappling) är sällsynt i naturlig grafit, där den vanligare AB-staplningen dominerar. Att hitta och isolera just de romboedriska bitarna kräver stor precision.",
        "Pauligränsen är det magnetfält vid vilket ett supraledande material normalt kollapsar. MIT-experimentet överstiger denna gräns med tiofaldig marginal.",
        "Supraledning i grafen-system fick sin start med “magiska vinkeln” 2018, då MIT-forskargrupper visade att två lätt vridna grafenlager mot varandra ger upphov till supraledning — i samma forskningstradition som det nu aktuella arbetet."
      ]}
    ]
  },

  {
    id: "2026-06-30-citronplanet-av-kol",
    date: "2026-06-30",
    title: "Webb-teleskopet hittar en citronformad planet med atmosfär av rent kol",
    deck: "Runt en snurrande neutronstjärna har James Webb-teleskopet upptäckt en värld som ingen teori kan förklara: en Jupiterstor planet deformerad till en citron, insvept i sotmoln och kanske med en kärna av diamant.",
    category: "Astrofysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-30-citronplanet-av-kol.jpg",
    imageAlt: "Illustration av en citronformad, mörk planet med sotiga moln som kretsar tätt kring en blåskimrande pulsar i rymden.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["astrofysik", "exoplanet", "james webb", "pulsar", "neutronstjärna", "spektroskopi", "tidvattenkrafter", "kol", "astronomi"],
    sources: [
      { name: "NASA Science (Webb)", url: "https://science.nasa.gov/missions/webb/nasas-webb-observes-exoplanet-whose-composition-defies-explanation/" },
      { name: "University of Chicago", url: "https://news.uchicago.edu/story/nasas-webb-telescope-finds-bizarre-atmosphere-lemon-shaped-exoplanet" }
    ],
    research: {
      citation: "M. Zhang et al., “A Carbon-rich Atmosphere on the Pulsar Planet PSR J2322−2650b”, The Astrophysical Journal Letters (2025)",
      url: "https://science.nasa.gov/missions/webb/nasas-webb-observes-exoplanet-whose-composition-defies-explanation/"
    },
    body: [
      { type: "p", html: "Ibland hittar astronomerna något så märkligt att de själva tappar hakan. Så blev det när NASA:s <strong>James Webb-teleskop</strong> riktades mot planeten <strong>PSR&nbsp;J2322−2650b</strong>: en Jupiterstor värld med en atmosfär gjord av nästan rent kol, kläckt i sotmoln och kanske med diamanter i sitt inre. Ingen känd teori förklarar hur en sådan planet kan finnas." },

      { type: "h2", text: "En planet i en dödsstjärnas grepp" },
      { type: "p", html: "Planeten kretsar inte kring en vanlig stjärna utan kring en <strong>pulsar</strong> — en snabbt roterande neutronstjärna, resten av en utbränd jättestjärna som kollapsat till en stadsstor klump av extremt tät materia. Planeten ligger oerhört nära sin pulsar och rusar runt den på bara 7,8&nbsp;timmar. Den enorma tyngdkraften drar och tänjer planeten så att den inte är rund utan formad som en <em>citron</em> — samma sorts tidvattenkraft som får jordens hav att stiga och sjunka, fast hejdlöst mycket starkare." },

      { type: "h2", text: "En atmosfär som inte borde finnas" },
      { type: "p", html: "Det verkligt häpnadsväckande är vad atmosfären består av. När Webb delade upp planetens ljus i ett spektrum saknades de molekyler man brukar se på heta jätteplaneter — vatten, koldioxid, metan. I stället dök <strong>molekylärt kol</strong> upp: kedjor av två och tre kolatomer (C₂ och C₃) som bara kan dominera när syre och kväve är så gott som helt borta. En sådan kolrik atmosfär har aldrig setts på någon av de cirka 150 planeter forskarna hittills kartlagt." },
      { type: "quote", html: "Det var en fullständig överraskning. Jag minns att vår gemensamma reaktion när vi fick ner datan var: ”Vad i hela friden är det här?”", cite: "Peter Gao, Carnegie Earth and Planets Laboratory" },
      { type: "p", html: "Atmosfären är dessutom fylld av <strong>sotmoln</strong>, och djupt inne i planeten kan kolet under det enorma trycket pressas samman till <strong>diamant</strong>. En planet av sot och ädelstenar, format som en citron, runt en stjärnas lik — det låter som science fiction, men det är en verklig värld i vår galax." },

      { type: "h2", text: "Spektroskopi och tidvattenkrafter" },
      { type: "p", html: "Upptäckten bygger på <strong>spektroskopi</strong> — att läsa av vilka ämnen som finns i en atmosfär genom de mörka absorptionslinjer de lämnar i ljuset. Grundtanken är enkel: varje grundämne har sitt eget fingeravtryck i ljuset. Planetens citronform är ren <strong>gravitation och tidvattenkrafter</strong>, och att kol kan bli diamant djupt inne är ett exempel på hur <strong>tryck och temperatur</strong> styr ett ämnes faser." },

      { type: "fact", title: "Planeten i korthet", items: [
        "Namn: PSR J2322−2650b — en planet med ungefär Jupiters massa.",
        "Kretsar kring en pulsar (neutronstjärna) på bara 7,8 timmar.",
        "Atmosfär av molekylärt kol (C₂ och C₃) — aldrig tidigare sett på en exoplanet.",
        "Tidvattenkrafterna tänjer ut planeten till en citronform.",
        "Sotmoln i atmosfären och möjligen diamant i det inre."
      ]}
    ]
  },

  {
    id: "2026-06-29-enkelriktat-ljud",
    date: "2026-06-29",
    title: "Forskare bygger en ”enkelriktad gata” för ljudets minsta byggstenar",
    deck: "Tre fysiker vid japanska RIKEN har visat hur kvantiserade ljudpaket — fononer — kan fås att synkronisera bara åt ett håll. Knepet är tåligt mot brus och kan göra framtidens kvantdatorer mer pålitliga.",
    category: "Kvantfysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-29-enkelriktat-ljud.jpg",
    imageAlt: "Abstrakt illustration av vibrationsvågor som rör sig åt ett håll genom ett rutmönstrat kristallgitter, med en spärr som blockerar motsatt riktning.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "fononer", "ljud", "vågor", "synkronisering", "kvantdator", "akustik", "modern fysik"],
    sources: [
      { name: "RIKEN", url: "https://www.riken.jp/en/news_pubs/research_news/rr/20260424_1/index.html" },
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260611024619.htm" }
    ],
    research: {
      citation: "F. Nori, A. Miranowicz, D.-G. Lai, “Nonreciprocal quantum synchronization”, Nature Communications (2026)",
      url: "https://www.riken.jp/en/news_pubs/research_news/rr/20260424_1/index.html"
    },
    body: [
      { type: "p", html: "Redan 1665 låg den nederländske fysikern Christiaan Huygens sjuk i sängen och lade märke till något konstigt: två pendelur som hängde på samma vägg ställde efter ett tag in sig i exakt motfas, helt av sig själva. Det var den första beskrivningen av <strong>synkronisering</strong> — fenomenet att svängande system som kopplas ihop faller i takt. Nu har forskare lyckats få fenomenet att fungera <em>bara åt ett håll</em>." },

      { type: "h2", text: "Vad är en fonon?" },
      { type: "p", html: "På samma sätt som ljus kommer i små energipaket — <em>fotoner</em> — kommer vibrationer och ljud i kvantiserade paket som kallas <strong>fononer</strong>. När atomerna i ett fast material svänger fram och tillbaka kan man beskriva svängningarna som en svärm av fononer. De bär ljud, värme och vibrationer genom materialet, och i pyttesmå mekaniska kvantsystem kan enstaka fononer styras nästan en i taget." },

      { type: "h2", text: "Synkronisering med en spärr" },
      { type: "p", html: "Vanligtvis är synkronisering en <em>ömsesidig</em> historia: påverkar A på B, så påverkar B också A. Forskarna vid RIKEN:s center för kvantdatorer — Franco Nori, Adam Miranowicz och Deng-Gao Lai — har i stället konstruerat ett system där fononerna synkroniseras när ljus eller ett magnetfält läggs på <strong>från ett håll</strong>, men inte när det läggs på från motsatt håll. Det fungerar som en enkelriktad gata, eller som en <strong>diod</strong> i en elektrisk krets: signalen släpps fram åt ett håll och stoppas åt det andra." },
      { type: "p", html: "Det smarta är att metoden är ovanligt <strong>robust</strong>. Den fortsätter att fungera även när komponenterna har småfel från tillverkningen eller störs av brus från omgivningen — precis de problem som annars brukar sänka känsliga kvantknep i praktiken." },

      { type: "h2", text: "Varför spelar det roll?" },
      { type: "p", html: "Kvantdatorer behöver komponenter som leder information åt ett bestämt håll utan att eko och störningar studsar tillbaka och förstör de ömtåliga kvanttillstånden. Sådana enkelriktade komponenter finns redan för ljus och mikrovågor, men de kräver ofta skrymmande magneter. En robust, enkelriktad fonon-synkronisering skulle kunna bli en byggsten i mer pålitliga och lättare skalbara kvantdatorer." },

      { type: "h2", text: "Svängningar och synkronisering" },
      { type: "p", html: "Synkronisering hör hemma i läran om <strong>svängningar och resonans</strong>. Huygens pendelur, en gunga som man pumpar i takt och två högtalare som hamnar i fas är alla samma grundfenomen. Fononerna knyter dessutom an till <strong>vågor</strong> och till den moderna fysikens idé att även ljud och vibrationer ytterst är kvantiserade — byggda av odelbara paket, precis som ljuset." },

      { type: "fact", title: "Visste du?", items: [
        "Christiaan Huygens kallade pendelurens samspel för en ”udda sympati” när han upptäckte det 1665.",
        "En fonon är till ljud och vibrationer vad en foton är till ljus — det minsta möjliga ”paketet” av svängningsenergi.",
        "Att något bara fungerar åt ett håll kallas ickeömsesidighet (engelska nonreciprocity) och är samma princip som gör en diod till en envägsventil för ström."
      ]}
    ]
  },

  {
    id: "2026-06-28-superstabil-laser",
    date: "2026-06-28",
    title: "Superstabil laser vid rumstemperatur ska göra framtidens atomur ännu exaktare",
    deck: "Brittiska forskare har byggt en laser vars frekvens knappt vacklar alls — utan att behöva kylas till nära absoluta nollpunkten. Den banar väg för nästa generations atomur och en ny definition av sekunden.",
    category: "Metrologi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-28-superstabil-laser.jpg",
    imageAlt: "Illustration av en röd laserstråle som studsar mellan två speglar i en lång optisk kavitet och bildar ett stående vågmönster.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["metrologi", "laser", "optik", "atomur", "tidmätning", "optisk kavitet", "stående våg", "si-enheter", "precision"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-06-room-temperature-laser-stability-cm.html" }
    ],
    research: {
      citation: "National Physical Laboratory (NPL) m.fl., “Room-temperature optical reference cavity with 4×10⁻¹⁷ fractional instability”, Optica (2026)",
      url: "https://doi.org/10.1364/optica.591175"
    },
    body: [
      { type: "p", html: "Hur bygger man en klocka som är så noggrann att den inte tappar en sekund på miljarder år? Svaret börjar inte med kugghjul utan med <strong>ljus</strong> — och med en laser som håller sin ton extremt stabil. Forskare vid brittiska <strong>National Physical Laboratory</strong> har nu satt rekord: en laser så stabil att dess frekvens bara vacklar med ungefär <strong>4 × 10<sup>−17</sup></strong> — fyra delar på hundra biljarder." },

      { type: "h2", text: "Lasern är klockans pendel" },
      { type: "p", html: "Ett <strong>optiskt atomur</strong> fungerar genom att en laser ställs in mot atomernas naturliga svängningar, ungefär som man stämmer en gitarrsträng mot en stämgaffel. Atomerna håller takten, men det är lasern som räknar svängningarna — och därför kan klockan aldrig bli stabilare än lasern själv. För att stabilisera lasern låser man den till en <strong>optisk kavitet</strong>: två speglar med en exakt bestämd sträcka emellan, där ljuset studsar fram och tillbaka och bildar en <strong>stående våg</strong>. Avståndet mellan speglarna måste hållas otroligt konstant — minsta lilla skälvning förskjuter tonen." },

      { type: "h2", text: "Slipper kylas till absoluta nollpunkten" },
      { type: "p", html: "Hittills har den allra högsta stabiliteten krävt att kaviteten kyls ner med skrymmande kryogena system, nära absoluta nollpunkten, för att hejda värmens småskakningar. Det nya rekordet sattes i stället med en 68&nbsp;cm lång kavitet vid <strong>vanlig rumstemperatur</strong>. Det gör tekniken enklare, billigare och möjlig att flytta ut ur de mest specialiserade laboratorierna." },

      { type: "h2", text: "Mot en ny sekund" },
      { type: "p", html: "Sedan 1967 definieras en sekund utifrån mikrovågssvängningar i cesiumatomer. Optiska atomur, som räknar ljusets mycket snabbare svängningar, är på väg att bli omkring hundra gånger noggrannare — så pass att forskarvärlden planerar att <strong>omdefiniera sekunden</strong> med dem. En stabilare laser låter ett sådant ur nå sin fulla precision snabbare. För att ge en känsla för stabiliteten: ett ur som höll den här takten skulle inte gå mer än någon enstaka sekund fel under universums hela ålder på 13,8&nbsp;miljarder år." },

      { type: "h2", text: "Stående vågor och tid" },
      { type: "p", html: "Kaviteten är ett praktexempel på <strong>stående vågor</strong>: precis som en gitarrsträng eller en orgelpipa bara svänger med vissa toner som passar in mellan ändpunkterna, ”passar” bara vissa ljusvågor in mellan speglarna. Nyheten knyter också an till <strong>frekvens och periodtid</strong> och till hur vi över huvud taget definierar tid — ett tema som leder vidare till relativitetsteorin, där tidens gång inte ens är densamma överallt." },

      { type: "fact", title: "Visste du?", items: [
        "Ett optiskt atomur är så känsligt att det tickar olika fort om man lyfter det någon decimeter — högre upp i jordens gravitationsfält går tiden mätbart fortare, precis som Einstein förutsade.",
        "Sekunden har definierats av cesiumatomer sedan 1967. Snart kan den i stället definieras av optiska atomur.",
        "I en optisk kavitet studsar ljuset fram och tillbaka tusentals gånger och bildar en stående våg — samma fysik som tonerna på en gitarrsträng, fast med ljus i stället för en sträng."
      ]}
    ]
  },

  {
    id: "2026-06-27-kallaste-platsen-i-rymden",
    date: "2026-06-27",
    title: "På en av rymdens kallaste platser skapar NASA en femte form av materia",
    deck: "Ombord på rymdstationen, i ett labb stort som ett kylskåp, kyler NASA atomer till bara en hårsmån över absoluta nollpunkten — och har efter en uppgradering skapat de största kvantmolnen någonsin i omloppsbana.",
    category: "Termodynamik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-27-kallaste-platsen-i-rymden.jpg",
    imageAlt: "Illustration av ett blåskimrande, lysande kvantmoln av ultrakalla atomer som svävar fritt inuti en teknisk apparat ombord på rymdstationen.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["termodynamik", "absoluta nollpunkten", "bose-einstein-kondensat", "kvantfysik", "materievågor", "rymden", "iss", "kylning"],
    sources: [
      { name: "NASA / JPL", url: "https://www.jpl.nasa.gov/news/nasas-quantum-lab-aboard-space-station-gets-chilly-upgrade/" },
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260622091507.htm" }
    ],
    research: null,
    body: [
      { type: "p", html: "I skolan får man lära sig tre former av materia — fast, flytande och gas — och kanske en fjärde: plasma. Men det finns en <strong>femte</strong>, som bara uppstår på de allra kallaste platserna i universum. Just nu tillverkas den ombord på Internationella rymdstationen, i ett instrument som NASA styr på distans från jorden." },

      { type: "h2", text: "Den femte formen av materia" },
      { type: "p", html: "När en gas av atomer kyls till nästan <strong>absoluta nollpunkten</strong> (−273,15&nbsp;°C, den lägsta tänkbara temperaturen) händer något märkligt: atomerna tappar nästan all sin rörelse och smälter samman till ett enda, gemensamt kvanttillstånd. De slutar bete sig som många små kulor och börjar uppföra sig som en enda stor <strong>materievåg</strong>. Tillståndet kallas ett <strong>Bose–Einstein-kondensat</strong> och förutsades av Albert Einstein och Satyendra Nath Bose redan på 1920-talet — men kunde framställas först 1995." },

      { type: "h2", text: "Ett kylskåp i omloppsbana" },
      { type: "p", html: "NASA:s <strong>Cold Atom Lab</strong> är ungefär lika stort som ett litet kylskåp och kyler sina atomer till under −237&nbsp;°C, alltså bara någon hårsmån över absoluta nollpunkten. I april 2026 kom en ny modul upp till stationen, och astronauten Jessica Meir installerade uppgraderingen i maj. En omkonstruerad <strong>magnetfälla</strong> kan nu forma kvantmolnen på nya sätt, och labbet skapar enligt NASA de största Bose–Einstein-kondensaten det någonsin gjort — uppåt fem gånger större än tidigare." },
      { type: "quote", html: "Vid de allra kallaste temperaturerna beter sig materia helt annorlunda än något vi någonsin upplevt.", cite: "Jason Williams, projektforskare för Cold Atom Lab, NASA/JPL" },

      { type: "h2", text: "Varför just i rymden?" },
      { type: "p", html: "På jorden faller de iskalla atommolnen snabbt ner på grund av tyngdkraften, och experimentet är över på ett ögonblick. I rymdstationens <strong>tyngdlöshet</strong> svävar molnen i stället fritt och kan studeras mycket längre — flera sekunder i stället för bråkdelar — och kylas till ännu lägre temperaturer. Det ger forskarna en unik chans att undersöka kvantfysik och att göra extremt noggranna mätningar av tid, gravitation och rörelse." },

      { type: "h2", text: "Värmelära och kvantvågor" },
      { type: "p", html: "Nyheten knyter ihop två fält. <strong>Värmeläran</strong> handlar om temperatur som ett mått på partiklarnas rörelse — ju kallare, desto stillare atomer, ända ner till absoluta nollpunkten där rörelsen är som minst. Den <strong>moderna fysiken</strong> förklarar varför atomer vid den gränsen börjar uppträda som vågor: varje partikel har en våglängd, och när atomerna kyls blir vågorna så stora att de överlappar och flyter ihop till ett enda kvanttillstånd." },

      { type: "fact", title: "Visste du?", items: [
        "Absoluta nollpunkten, −273,15 °C (0 kelvin), är den lägsta temperatur som kan finnas — där är partiklarnas rörelse som allra minst.",
        "Cold Atom Lab är ungefär lika stort som ett litet kylskåp och styrs på distans från NASA:s laboratorium på jorden.",
        "I tyngdlöshet faller inte de kalla atomerna ner, så de kan studeras i sekunder i stället för bråkdelar av en sekund — en jättefördel jämfört med labb på jorden."
      ]}
    ]
  },

  {
    id: "2026-06-26-laser-i-mankrater",
    date: "2026-06-26",
    title: "Världens stabilaste laser kan byggas i en kolsvart månkrater — för att ge månen en egen tid",
    deck: "I de eviga skuggorna vid månens sydpol, där det är runt 50 kelvin kallt, vill den amerikanske fysikern Jun Ye placera en optisk kavitet av kisel. Den skulle kunna bli grunden för det första atomuret på en annan himlakropp — och för en gemensam måntid.",
    category: "Metrologi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-26-laser-i-mankrater.jpg",
    imageAlt: "Illustration av en laserapparat nere i en kolsvart, isig krater vid månens sydpol, med en smal stråle riktad uppåt mot rymden och jorden synlig vid horisonten.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["metrologi", "laser", "optik", "atomur", "tidmätning", "optisk kavitet", "stående våg", "månen", "relativitetsteori", "navigation", "astronomi"],
    sources: [
      { name: "NIST", url: "https://www.nist.gov/news-events/news/2026/05/shooting-moon-ultrastable-lasers-dark-craters-could-enable-lunar-navigation" },
      { name: "Phys.org", url: "https://phys.org/news/2026-05-dark-lunar-craters-host-ultrastable.html" }
    ],
    research: {
      citation: "Z. Z. Hu, J. Ye m.fl., ”Lunar silicon cavity”, Proceedings of the National Academy of Sciences (2026)",
      url: "https://www.pnas.org/doi/10.1073/pnas.2604438123"
    },
    body: [
      { type: "p", html: "Snart ska människor åter sätta sin fot på månen, och då uppstår en oväntad fråga: <em>vad är klockan</em> där uppe? För att rovers, landare och satelliter ska kunna navigera och prata med varandra behöver månen en egen, exakt tid. Nu föreslår fysikern <strong>Jun Ye</strong> och hans kollegor en uppseendeväckande lösning — att bygga världens mest stabila laser nere i en av månens kolsvarta, evigt skuggade kratrar." },

      { type: "h2", text: "Varför behöver månen en egen klocka?" },
      { type: "p", html: "Tiden går faktiskt inte lika fort på månen som på jorden. Enligt <strong>Einsteins relativitetsteori</strong> påverkas en klockas gång av både fart och tyngdkraft, och eftersom månen har svagare gravitation tickar en klocka där uppe en aning fortare — ungefär <strong>56 miljondels sekund per dygn</strong> snabbare än på jorden. Det låter försumbart, men för ett navigationssystem av GPS-typ, där ljuset hinner färdas 300&nbsp;meter på en miljondels sekund, blir felet snabbt ohållbart. Därför arbetar rymdorganisationerna på en gemensam <strong>måntid</strong> — och en sådan tidsskala kräver i slutänden ett atomur på plats." },

      { type: "h2", text: "Den kallaste och mörkaste platsen" },
      { type: "p", html: "Vid månens sydpol finns kratrar vars botten <strong>aldrig</strong> nås av solljus. I dessa ”permanent skuggade områden” är det bland det kallaste man känner till i hela solsystemet — bara runt <strong>50&nbsp;kelvin</strong> (omkring −223&nbsp;°C). Eftersom det varken finns sol, luft eller markskakningar att störas av, kan en apparat dessutom stråla bort sin egen restvärme rätt ut i rymden och passivt kylas ända ner till omkring <strong>16&nbsp;kelvin</strong>. Just vid den temperaturen slutar kisel att krympa och utvidgas när temperaturen vacklar lite — en idealisk byggsten för något som måste hålla exakt mått." },

      { type: "h2", text: "En laser låst till en kristall av kisel" },
      { type: "p", html: "Hjärtat i förslaget är en <strong>optisk kavitet</strong>: ett block av kisel med en spegel i var ände. Ljuset studsar fram och tillbaka mellan speglarna och bildar en <strong>stående våg</strong>, och bara ljusvågor som passar exakt mellan speglarna förstärks. En vanlig laser ”låses” sedan till kaviteten så att dess färg — dess frekvens — blir extremt stabil. Eftersom avståndet mellan speglarna knappt rör sig i den iskalla, orörliga kratern, skulle resultatet kunna bli <strong>den stabilaste laser som någonsin byggts</strong>, betydligt bättre än de bästa på jorden." },
      { type: "quote", html: "Så fort jag förstod vad de permanent skuggade områdena kan erbjuda kände jag att det vore den mest ideala miljön för en superstabil laser.", cite: "Jun Ye, NIST och JILA" },

      { type: "h2", text: "Vad man skulle kunna göra med den" },
      { type: "p", html: "En sådan laser är inte bara en kuriositet. Den skulle kunna bli motorn i det <strong>första optiska atomuret på en annan himlakropp</strong> och därmed ge månen en master­klocka att synkronisera allt efter. Den öppnar för ett <strong>GPS-liknande navigationssystem</strong> för farkoster på månytan, för att mäta avstånd mellan satelliter med oerhörd precision, och — kopplad ihop med instrument på jorden — för att bygga jättelika teleskop, jaga <strong>gravitationsvågor</strong> och testa relativitetsteorin ännu skarpare." },

      { type: "h2", text: "Värme, vågor och relativitet" },
      { type: "p", html: "Förslaget binder ihop flera fält. Att kisel slutar utvidgas vid en viss temperatur hör till <strong>värmeläran</strong> och materialens <strong>längdutvidgning</strong>. Kaviteten är ett rent exempel på <strong>stående vågor</strong> — precis som en gitarrsträng bara klingar med vissa toner ”passar” bara vissa ljusvågor in mellan speglarna. Och att en klocka går olika fort beroende på var den befinner sig är själva kärnan i <strong>relativitetsteorin</strong>: tiden är inte densamma överallt." },

      { type: "fact", title: "Visste du?", items: [
        "Månens evigt skuggade kratrar hör till de kallaste platserna i solsystemet, omkring 50 kelvin — kallare än Plutos yta.",
        "En klocka på månen går ungefär 56 miljondels sekund per dygn fortare än en klocka på jorden, eftersom tyngdkraften är svagare där.",
        "Kisel har en temperatur (kring 16 kelvin) där det varken utvidgas eller krymper när temperaturen ändras en aning — perfekt för en kavitet som måste hålla exakt längd.",
        "Förslaget kommer från samma forskargrupp som byggt några av världens noggrannaste atomur på jorden."
      ]}
    ]
  },

  {
    id: "2026-06-25-asteroid-1997-nc1",
    date: "2026-06-25",
    title: "Kilometerstor asteroid sveper förbi jorden i helgen — närmast på 400 år",
    deck: "Den potentiellt farliga asteroiden 152637 (1997 NC1) passerar jorden lördag den 27 juni på 2,56 miljoner kilometers avstånd. Det är dess närmaste besök sedan före år 1600 — men det är ingen fara: den missar oss med nästan sju gånger avståndet till månen.",
    category: "Astronomi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-25-asteroid-1997-nc1.jpg",
    imageAlt: "Illustration av en mörk, oregelbunden asteroid som passerar förbi jorden mot en stjärnbeströdd rymdbakgrund.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["astronomi", "asteroid", "jordnära objekt", "neo", "gravitation", "omloppsbana", "kepler", "planetärt försvar", "rymden"],
    sources: [
      { name: "NASA/JPL Goldstone-radar (DSS)", url: "https://echo.jpl.nasa.gov/asteroids/1997nc1.2026.goldstone.planning.html" },
      { name: "The Virtual Telescope Project", url: "https://www.virtualtelescope.eu/2026/03/24/potentially-hazardous-asteroid-152637-1997-nc1-close-encounter-online-observation-27-june-2026/" },
      { name: "Space Reference", url: "https://www.spacereference.org/asteroid/152637-1997-nc1" }
    ],
    research: {
      citation: "NASA/JPL Center for Near-Earth Object Studies (CNEOS), Small-Body Database: 152637 (1997 NC1)",
      url: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=152637"
    },
    body: [
      { type: "p", html: "Lördagen den 27 juni får jorden ett ovanligt närgånget besök. Asteroiden <strong>152637 (1997&nbsp;NC1)</strong> — ett stenblock nästan en kilometer i diameter — passerar oss på bara 2,56&nbsp;miljoner kilometers avstånd. Det låter mycket, men i astronomiska mått är det ett snävt förbiflyg: det är det närmaste den här asteroiden har varit jorden sedan <em>före år 1600</em>, så långt tillbaka som man hittills kunnat räkna ut dess bana." },

      { type: "h2", text: "Nära — men fullständigt ofarligt" },
      { type: "p", html: "Det första man bör veta är att det inte finns någon som helst kollisionsrisk. Asteroiden missar jorden med ungefär <strong>6,7 gånger avståndet till månen</strong> (månen ligger i snitt 384&nbsp;000&nbsp;km bort). Astronomer har följt 1997&nbsp;NC1 sedan den upptäcktes den 5&nbsp;juli 1997 och kan förutsäga dess bana med stor precision många hundra år framåt och bakåt i tiden." },
      { type: "quote", html: "Mötet är nära, men säkert — det finns inga risker alls för vår planet. Ett liknande närmande av en asteroid av den här storleken inträffar i genomsnitt vart tionde år.", cite: "The Virtual Telescope Project" },
      { type: "p", html: "Närmast är asteroiden klockan 13.16 svensk tid på lördagen. Då rör den sig förbi oss med en relativ hastighet på nästan 9&nbsp;km/s — drygt 32&nbsp;000&nbsp;km/h. Nästa lika nära passage dröjer ända till år 2133." },

      { type: "h2", text: "Varför kallas den ”potentiellt farlig”?" },
      { type: "p", html: "1997&nbsp;NC1 är klassad som en <strong>potentiellt farlig asteroid</strong> (på engelska <em>potentially hazardous asteroid</em>, PHA). Det låter dramatiskt, men beteckningen är en ren bokföringsregel, inte en varning för en nära förestående krock. En asteroid får stämpeln om den uppfyller två villkor: den ska vara större än ungefär 140&nbsp;meter, och dess bana ska kunna föra den närmare jorden än 0,05&nbsp;astronomiska enheter (cirka 7,5&nbsp;miljoner kilometer) någon gång." },
      { type: "p", html: "Med sina knappt 900&nbsp;meter klarar 1997&nbsp;NC1 båda kriterierna med marginal. Klassningen betyder helt enkelt att det är ett objekt värt att hålla noga koll på under lång tid — inte att en kollision är på gång." },

      { type: "h2", text: "En asteroid som lever innanför jordens bana" },
      { type: "p", html: "1997&nbsp;NC1 tillhör <strong>Aten-gruppen</strong> av jordnära asteroider. Det är en familj vars omloppsbanor till största delen ligger <em>innanför</em> jordens bana, närmare solen. Asteroiden varvar solen på bara 294&nbsp;dygn — alltså snabbare än jordens år — på ett medelavstånd av 0,86&nbsp;astronomiska enheter. Banan är samtidigt så pass tillplattad (elliptisk) att den ibland korsar jordens bana, och det är då de här mötena kan ske." },
      { type: "p", html: "Att ett så här stort objekt passerar relativt nära är ett guldläge för forskarna. NASA planerar att studsa radarvågor mot asteroiden med <strong>Goldstone-radarn</strong> i Kaliforniens öken: en 34-metersantenn skickar ut en radarsignal (7&nbsp;190&nbsp;MHz) och en annan antenn fångar upp ekot. Ur ekot kan man läsa av asteroidens form, storlek och rotation — som en sorts radarfotografering av en himlakropp 2,5&nbsp;miljoner kilometer bort." },

      { type: "h2", text: "Gravitation och Keplers lagar" },
      { type: "p", html: "Asteroidens bana är ett rent skolexempel på <strong>gravitation och Keplers lagar</strong>. Det är solens dragningskraft, beskriven av Newtons gravitationslag, som tvingar in asteroiden i en elliptisk bana — precis som planeterna. Keplers tredje lag binder ihop banans storlek med omloppstiden: ju närmare solen en kropp i snitt ligger, desto kortare blir dess ”år”. Att 1997&nbsp;NC1:s omloppstid är 294&nbsp;dygn — kortare än jordens 365 — följer direkt av att dess bana är mindre än jordens." },
      { type: "p", html: "Och själva förbiflygningen illustrerar ett knep från <strong>rörelseläran</strong>: det som spelar roll för hur nära två kroppar möts är inte deras hastigheter var för sig, utan deras <em>relativa</em> hastighet och riktning. Jorden och asteroiden rör sig båda i tiotals km/s runt solen, men det är skillnaden mellan deras rörelser som avgör hur snabbt asteroiden tycks svepa förbi oss." },

      { type: "fact", title: "Asteroiden i siffror", items: [
        "Diameter: ungefär 0,9 km (uppskattningar spänner mellan 0,7 och 1,6 km).",
        "Närmaste avstånd: 2,56 miljoner km = 6,7 månavstånd, lördag 27 juni 2026.",
        "Relativ hastighet vid passagen: nästan 9 km/s (ca 32 000 km/h).",
        "Omloppstid runt solen: 294 dygn — kortare än jordens år.",
        "Upptäckt: 5 juli 1997. Nästa lika nära passage: år 2133."
      ]}
    ]
  },

  {
    id: "2026-06-24-optiska-skyrmioner",
    date: "2026-06-24",
    title: "200 år gammalt ljusexperiment skapar virvlande mönster som kan revolutionera datorminnen",
    deck: "Genom att rikta en laser mot en liten skiva har forskare i Singapore framställt exotiska ljusmönster kallade optiska skyrmioner — med en metod som bygger på samma diffraktionsfenomen som avgjorde striden om ljusets natur på 1800-talet.",
    category: "Optik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-24-optiska-skyrmioner.jpg",
    imageAlt: "Illustration av virvlande ljusmönster med koncentriska ringar och en central ljuspunkt, inspirerad av optiska skyrmioner och diffraktion.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["optik", "diffraktion", "skyrmioner", "ljus", "vågfysik", "poisson-fläcken", "topologi", "fotonik", "datalagring"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-06-scientists-optical-skyrmions-century-phenomenon.html" },
      { name: "Mirage News / NTU Singapore", url: "https://www.miragenews.com/ancient-light-technique-crafts-complex-patterns-1697467/" }
    ],
    research: {
      citation: "J. Yao et al., “Optical skyrmions in Poisson spots”, Optica (2026)",
      url: "https://doi.org/10.1364/optica.591840"
    },
    body: [
      { type: "p", html: "Vad har en ljusfläck från 1818, en igelkotts taggar och framtidens datorer gemensamt? Svaret heter <strong>optiska skyrmioner</strong> — virvlande mönster i ljusets egenskaper som forskare nu lyckats framställa med en förvånansvärt enkel metod. Allt som behövdes var en laser och en pytteliten skiva." },

      { type: "h2", text: "En fläck som räddade vågteorin" },
      { type: "p", html: "Historien börjar med en av fysikens mest berömda tvister. År 1818 lämnade den franske ingenjören Augustin Fresnel in sin vågteori om ljus till en tävling utlyst av Franska vetenskapsakademin. Den strikta juryledamoten Siméon Poisson — själv övertygad om att ljus bestod av partiklar — räknade på Fresnels teori och drog en slutsats som han menade var absurd: bakom en liten rund skiva borde det, mitt i skuggan, uppstå en <em>ljus fläck</em>. En sådan punkt hade aldrig observerats, och Poisson ansåg att förutsägelsen begravde vågteorin en gång för alla." },
      { type: "p", html: "Men kollegan François Arago bestämde sig för att göra experimentet. Resultatet? Fläcken fanns där, precis som Fresnels ekvationer förutsade. Det fenomen som var tänkt att krossa vågteorin blev i stället dess starkaste bevis. Sedan dess kallas ljuspunkten <strong>Poisson-fläcken</strong> (eller Aragos fläck) och är ett klassiskt skolexempel på <strong>diffraktion</strong> — ljusvågornas förmåga att böja sig runt hinder." },

      { type: "h2", text: "Igelkottar av ljus" },
      { type: "p", html: "Nu har forskare vid Nanyang Technological University (NTU) i Singapore, ledda av professor Shen Yijie, upptäckt att samma gamla fläck kan göra mycket mer än att bevisa att ljus är en våg. När de riktade en laser mot en liten cirkulär skiva och studerade det diffrakterade ljuset fann de att det spontant bildade <strong>skyrmioner</strong> — topologiska mönster som liknar en igelkotts taggmönster, där ljusets polarisation och fältriktning vrider sig på ett ordnat sätt runt en central punkt." },
      { type: "p", html: "Skyrmioner (uppkallade efter kärnfysikern Tony Skyrme) är ett hett forskningsområde inom materialfysik, där magnetiska skyrmioner redan används i experimentella minnen. <strong>Optiska</strong> skyrmioner — samma typ av struktur fast gjord av ljus — har tidigare bara kunnat skapas med dyra, specialtillverkade metamaterial. Att de nu dyker upp i ett simpelt diffraktionsexperiment kom som en överraskning." },
      { type: "quote", html: "Det anmärkningsvärda är att optiska skyrmioner nu kan skapas med en enkel effekt där ljus böjer sig runt ett föremål, utan dyra, komplexa metamaterial eller högt specialiserade tekniker.", cite: "Shen Yijie, NTU Singapore" },

      { type: "h2", text: "Fyra mönster på en gång" },
      { type: "p", html: "Det som gör upptäckten extra intressant är att Poisson-fläcken inte bara genererade <em>en</em> typ av skyrmion, utan <strong>fyra stycken samtidigt</strong>: spinn-skyrmioner, Stokes-skyrmioner, elfälts-skyrmioner och magnetfälts-skyrmioner. Varje typ beskriver hur en viss egenskap hos ljuset — rotation, polarisation, elektriskt fält respektive magnetfält — vrider sig i rummet." },
      { type: "p", html: "Att kunna jämföra fyra skyrmiontyper i ett och samma system ger forskarna en unik möjlighet att studera kopplingarna mellan ljusets olika fysikaliska egenskaper. Resultaten, publicerade i tidskriften <em>Optica</em>, kan på sikt leda till nya sätt att lagra data, bygga optiska kretsar och skicka information med ljus." },

      { type: "h2", text: "Varför spelar det roll?" },
      { type: "p", html: "Skyrmioner är topologiskt skyddade — ett matematiskt sätt att säga att deras struktur är robust och inte lätt går sönder av störningar. Det gör dem intressanta som informationsbärare. Medan ett vanligt magnetiskt bit (0&nbsp;eller&nbsp;1) kan flippa av termiskt brus, sitter en skyrmion fast i sin form som en knut man inte kan lösa utan att klippa repet. Optiska skyrmioner kan potentiellt bära information med ljusets hastighet och med samma stabilitet." },
      { type: "p", html: "Att metoden dessutom är billig och enkel — en laser och en skiva, inget mer — innebär att fler forskargrupper världen över nu kan börja experimentera med dessa ljusmönster. Det är en av de saker som avgör om en upptäckt stannar i laboratoriet eller faktiskt når ut i verkliga tillämpningar." },

      { type: "h2", text: "Diffraktion och interferens" },
      { type: "p", html: "Fenomenet bottnar i <strong>vågfysik och optik</strong>. Diffraktion — att ljusvågor böjer sig runt hinder och kan interferera konstruktivt och destruktivt — är samma princip som förklarar enkelspaltexperiment och interferensmönster. Poisson-fläcken är ett slående exempel: den ljusa punkten mitt i skuggan uppstår för att ljusvågor som böjer sig runt skivans alla kanter anländer i fas i centrumpunkten och förstärker varandra." },

      { type: "fact", title: "Visste du?", items: [
        "Poisson-fläcken var tänkt att motbevisa vågteorin men blev i stället dess starkaste stöd. Det gör den till ett av vetenskapshistoriens bästa exempel på hur ett motbevis kan slå tillbaka.",
        "Skyrmioner är uppkallade efter den brittiske fysikern Tony Skyrme, som på 1960-talet föreslog topologiska strukturer som modell för protoner och neutroner.",
        "Magnetiska skyrmioner i tunna filmer kan vara så små som några tiotals nanometer — ungefär en tusendel av tjockleken på ett hårstrå — och anses lovande för nästa generations datorminnen.",
        "Diffraktion förklarar också varför du kan höra ljud runt ett hörn men inte se runt det: ljudvågornas våglängd (decimeter till meter) är jämförbar med hörnet, medan ljusets våglängd (några hundra nanometer) är alldeles för kort för att böja märkbart runt vardagliga föremål."
      ]}
    ]
  },

  {
    id: "2026-06-23-superfluid-ljus",
    date: "2026-06-23",
    title: "Små objekt simmar uppströms i en superfluid av ljus",
    deck: "Forskare har fått ett litet hinder att röra sig mot strömmen i en strömmande superfluid gjord av ljus. Hemligheten: virvelpar som slungas bakåt ger en rekyl framåt — ungefär som en bläckfisk som sprutar sig genom vattnet.",
    category: "Kvantoptik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-23-superfluid-ljus.jpg",
    imageAlt: "Illustration av en mörk sfär i en strömmande ljusfluid, omgiven av virvelmönster som bildas i kölvattnet.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantoptik", "superfluid", "vätskefysik", "kvantfysik", "virvlar", "ljus", "vågpartikeldualitet", "modern fysik"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-06-tiny-superfluid.html" },
      { name: "arXiv (preprint)", url: "https://arxiv.org/abs/2512.09028" }
    ],
    research: {
      citation: "M. Baker-Rasooli, T. Aladjidi, T. D. Ferreira, A. Bramati, M. Albert, P.-É. Larré, Q. Glorieux, “Swimming against a superfluid flow: Self-propulsion via vortex-antivortex shedding in a quantum fluid of light”, Physical Review Letters (2026)",
      url: "https://doi.org/10.1103/ndj1-1j89"
    },
    body: [
      { type: "p", html: "Tänk dig att du släpper en kork i en ström. Den flyter med, självklart. Men vad händer om korken plötsligt börjar paddla <em>uppströms</em> — helt av sig själv, utan motor eller segel? I en vanlig vätska vore det absurt, men i en <strong>superfluid av ljus</strong> har ett internationellt forskarlag nu observerat exakt det fenomenet." },

      { type: "h2", text: "Ljus som flödar utan friktion" },
      { type: "p", html: "En superfluid är ett tillstånd där partiklar rör sig helt utan friktion. Det mest kända exemplet är flytande helium nedkylt till nära den absoluta nollpunkten (−273,15&nbsp;°C), som kan klättra uppför väggarna på ett kärl. Men superfluider kan även skapas av <em>ljus</em>. Forskarna lät en laserstråle passera genom en varm gas av rubidium-87-atomer. Nära vissa optiska resonanser börjar fotonerna i strålen växelverka med varandra via atomerna — och ljuset börjar uppföra sig som en tvådimensionell kvantfluid som flödar utan motstånd." },
      { type: "p", html: "Nyckelbegreppet är den <strong>kritiska hastigheten</strong>, formulerad av den sovjetiske fysikern Lev Landau på 1940-talet. Så länge superfluiden rör sig förbi ett hinder långsammare än denna tröskel, flödar den runt hindret utan att tappa energi — noll friktion, noll motstånd. Men överskrids den kritiska hastigheten bryts superfluiditeten och det bildas virvlar i vätskan." },

      { type: "h2", text: "Virvelpar som raketmotor" },
      { type: "p", html: "Det var just i detta överkritiska område som överraskningen dök upp. Forskarna vid Sorbonne-universitetet, universitetet i Porto, Côte d&rsquo;Azur-universitetet och Paris-Saclay-universitetet placerade ett litet, rörligt hinder i ljusfluiden med hjälp av en andra laserstråle som lokalt ändrade gasens brytningsindex. När flödet överskred den kritiska hastigheten började hindret inte bara stanna — det rörde sig <em>mot</em> strömmen." },
      { type: "p", html: "Mekanismen visade sig vara kvantiserade <strong>virvelpar</strong>. I hindrets kölvatten bildas par av virvlar som snurrar åt motsatt håll (en virvel och en antivirvel). Varje gång ett sådant par slungas nedströms får hindret en rekyl uppströms — precis som en raket som kastar ut avgaser bakåt för att driva sig framåt. Effekten är periodisk: par efter par skjuts ut, och den sammanlagda impulsen driver hindret stadigt mot strömmen." },
      { type: "quote", html: "Det här djupt kontraintuitiva fenomenet ändrade helt vårt fokus. Det som skulle vara en standardverifiering av den kritiska hastigheten blev en fascinerande undersökning av uppströmssimning.", cite: "Pierre-Élie Larré, Paris-Saclay-universitetet" },

      { type: "h2", text: "En bläckfisk i kvantvärlden" },
      { type: "p", html: "Forskarna jämför mekanismen med hur biologiska organismer kan utnyttja turbulens i sitt kölvatten för att spara energi — som en fisk som surfar på virvlarna bakom sin kompis, eller en bläckfisk som sprutar vatten bakåt för framdrivning. Skillnaden är att hindret i ljusfluiden gör det <em>passivt</em>: det behöver ingen egen energikälla utan exploaterar kvantfluidens inneboende dynamik." },
      { type: "p", html: "Resultatet binder samman tre forskningsfält som sällan möts: <strong>kvanthydrodynamik</strong> (hur kvantvätskor flödar), <strong>klassisk fluiddynamik</strong> (virvlar och turbulens i vardagliga vätskor) och <strong>aktiv materia</strong> (självdrivna partiklar, som bakterier som simmar). Att samma princip — framdrivning via virvelutsändning — dyker upp i alla tre världarna antyder att den är djupt fundamental." },

      { type: "h2", text: "Mot självstyrande ljuskomponenter" },
      { type: "p", html: "På sikt kan upptäckten leda till praktiska tillämpningar. Forskarna pekar på möjligheten att bygga små ljusdrivna optiska komponenter som navigerar genom optiska kretsar utan extern styrning — självgående partiklar i ljusets kvantfluid. Det kan bli relevant för framtidens kvantteknologi och optiska datorer." },
      { type: "p", html: "Studien, publicerad i <em>Physical Review Letters</em>, berör flera fält samtidigt: superfluiditet och fasövergångar hör till <strong>termodynamiken</strong>, virvelbildning till <strong>vätskefysiken</strong>, och ljusets vågbeteende i ett ickelinjärt medium till <strong>modern fysik och kvantoptik</strong>." },

      { type: "fact", title: "Visste du?", items: [
        "Superfluiditet upptäcktes 1937 i flytande helium-4 vid temperaturer under 2,17&nbsp;K (−270,98&nbsp;°C). Pyotr Kapitsa fick Nobelpriset i fysik 1978 för sin forskning om fenomenet.",
        "Ljus beter sig vanligtvis inte som en vätska — fotoner växelverkar normalt inte med varandra. Men i speciella medier, som rubidiumånga, kan foton–foton-interaktioner uppstå och skapa kollektiva fenomen.",
        "Landaus kritiska hastighet kan jämföras med ljudhastigheten i en gas: under den hastigheten kan inget störa vätskan, över den uppstår \"stötvågor\" i form av virvlar.",
        "Virvel–antivirvelpar i superfluider är kvantiserade — varje virvel bär exakt en enhet av cirkulationskvantum, till skillnad från virvlar i vanligt vatten som kan ha vilken styrka som helst."
      ]}
    ]
  },

  {
    id: "2026-06-22-kosmologiska-konstanten",
    date: "2026-06-22",
    title: "Einsteins ”största tabbe” kan äntligen ha en förklaring",
    deck: "Fysiker vid Brown University visar att rumtidens matematiska form kan skydda den kosmologiska konstanten från kvantfluktuationer — med samma mekanism som gör kvanthalleffekten så exakt. Resultatet kan vara ett steg mot att lösa det största gapet mellan teori och observation i hela fysikens historia.",
    category: "Kosmologi",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-22-kosmologiska-konstanten.jpg",
    imageAlt: "Illustration av rumtidens krökning visualiserad som ett böjt, lysande rutnät med galaxer utspridda över ytan, mot en djupblå rymdbakgrund.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kosmologi", "kvantgravitation", "kosmologiska konstanten", "mörk energi", "einstein", "kvanthalleffekten", "topologi", "relativitetsteori"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260619020516.htm" },
      { name: "Brown University", url: "https://www.brown.edu/news/2026-04-20/cosmological-constant-problem" },
      { name: "Phys.org", url: "https://phys.org/news/2026-05-quantum-gravity-cosmological-constant-similar.html" }
    ],
    research: {
      citation: "S. Alexander, H. Bernardo, A. Hui, ”Cosmological Constant from Quantum Gravitational θ Vacua and the Gravitational Hall Effect”, Physical Review Letters 136, 151501 (2026)",
      url: "https://doi.org/10.1103/rzz5-p4f4"
    },
    body: [
      { type: "p", html: "År 1917 lade Albert Einstein till en extra term i sina ekvationer för allmän relativitetsteori. Han kallade den den <strong>kosmologiska konstanten</strong>, och dess enda uppgift var att hålla universum stillastående — precis som de flesta fysiker på den tiden antog att det var. Tolv år senare visade Edwin Hubble att galaxerna rör sig bort från oss: universum expanderar. Einstein strök sin konstant och ska enligt legenden ha kallat den sitt ”största misstag”." },
      { type: "p", html: "Men historien tog en ny vändning 1998, när två forskargrupper oberoende av varandra upptäckte att universums expansion <em>accelererar</em>. Något drev isär galaxerna allt snabbare. Plötsligt behövdes Einsteins kosmologiska konstant igen — fast nu som ett mått på den mystiska <strong>mörk energi</strong> som utgör ungefär 68&nbsp;% av universums totala energiinnehåll." },

      { type: "h2", text: "Fysikens största sifferproblem" },
      { type: "p", html: "Här börjar det riktiga huvudbrottet. Kvantfältteori — den teori som beskriver partiklar och krafter på den minsta skalan — förutsäger att det tomma rummet kryllar av fluktuationer som borde ge den kosmologiska konstanten ett enormt värde. Hur enormt? Ungefär 10<sup>120</sup>&nbsp;gånger större än vad astronomerna faktiskt observerar. Det är en etta följd av 120&nbsp;nollor, och diskrepansen brukar beskrivas som den största kvantitativa felslutningen i teorifysikens historia." },
      { type: "p", html: "Trots årtionden av försök har ingen kunnat förklara varför det observerade värdet är så litet. Standardfysiken saknar helt enkelt en mekanism som kan skydda konstanten från alla de kvantfluktuationer som borde blåsa upp den." },

      { type: "h2", text: "Topologiskt skydd — som kvanthalleffekten" },
      { type: "p", html: "Nu presenterar tre fysiker vid Brown University — Stephon Alexander, Heliudson Bernardo och Aaron Hui — ett möjligt svar. I en artikel publicerad i <em>Physical Review Letters</em> visar de att inom ett specifikt kvantgravitationstillstånd, det så kallade <strong>Chern–Simons–Kodama-tillståndet</strong> (CSK), blir den kosmologiska konstanten <em>topologiskt skyddad</em>." },
      { type: "p", html: "Topologi handlar om matematiska egenskaper som inte ändras när man böjer eller sträcker ett objekt — tänk att en munk och en kaffekopp båda har ett hål och därför är topologiskt likvärdiga. I kvanthalleffekten, som upptäcktes på 1980-talet, leder denna typ av topologiskt skydd till att en elektrisk ledningsförmåga låses fast vid exakta värden, oavsett hur smutsigt eller ofullkomligt materialet är. Det är en av de mest precisa mätningar som överhuvudtaget finns inom fysiken." },
      { type: "p", html: "Forskargruppen visar att samma matematiska struktur kan gälla för rumtiden själv. Precis som topologin i kvanthalleffekten låser ledningsförmågan, kan rumtidens topologi låsa den kosmologiska konstanten vid diskreta, kvantiserade värden — och därmed göra den immun mot de kvantfluktuationer som annars borde förstöra den." },
      { type: "quote", html: "Alla kvantperturbationer som borde blåsa upp den kosmologiska konstantens värde görs overksamma av denna topologi.", cite: "Stephon Alexander, Brown University" },

      { type: "h2", text: "Långt kvar till hela svaret" },
      { type: "p", html: "Resultatet är teoretiskt — det finns ännu inget experiment som direkt testar mekanismen. Forskarna betonar själva att ”det riktiga arbetet ligger i detaljerna” och att mycket återstår innan man kan visa att just detta tillstånd verkligen beskriver vårt universum. Men idén att topologin hos rumtiden kan spela samma roll för den kosmologiska konstanten som den spelar för kvanthalleffekten öppnar en helt ny infallsvinkel på ett problem som trotsat fysikerna i över ett halvsekel." },
      { type: "p", html: "Studien knyter samman två av fysikens stora pelare — allmän relativitetsteori och kvantmekanik — inom ett och samma teoretiska ramverk, och rör vid allt från gravitation och energi till modern kvantmekanik." },

      { type: "fact", title: "Visste du?", items: [
        "Den kosmologiska konstanten betecknas med det grekiska tecknet Λ (lambda) och har enheten m<sup>−2</sup>. Den beskriver energitätheten i det tomma rummet.",
        "Kvanthalleffekten gav Klaus von Klitzing Nobelpriset i fysik 1985. Ledningsförmågan kvantiseras i exakta steg — så precisa att de numera definierar enheten ohm.",
        "Mörk energi utgör cirka 68&nbsp;% av universums energiinnehåll, mörk materia 27&nbsp;% och vanlig materia bara ungefär 5&nbsp;%. Vi vet fortfarande inte vad mörk energi egentligen är.",
        "Einsteins ekvationer för allmän relativitetsteori publicerades 1915 och förutsade bland annat gravitationsvågor, svarta hål och universums expansion — samtliga bekräftade genom observationer."
      ]}
    ]
  },

  {
    id: "2026-06-21-kvantgivare-mork-materia",
    date: "2026-06-21",
    title: "Ny kvantgivare öppnar ett fönster mot mörk materia och gravitationsvågor",
    deck: "Forskare vid Imperial College London har byggt en prototyp som visar att två atominterferometrar kan eliminera brus och mäta vid kvantfysikens absoluta gräns. Tekniken kan bli nyckeln till att upptäcka mörk materia och gravitationsvågor i ett frekvensband som dagens detektorer inte når.",
    category: "Kvantfysik",
    readingTime: "4 min",
    image: "nyheter/bilder/2026-06-21-kvantgivare-mork-materia.jpg",
    imageAlt: "Illustration av en atominterferometer i ett fysiklaboratorium, med två vertikala vakuumkammare som innehåller lysande moln av ultrakalla atomer, sammankopplade av gröna laserstrålar på ett optiskt bord.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "atomfysik", "gravitationsvågor", "mörk materia", "interferometri", "kvantgivare", "partikelfysik", "astronomi"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-06-quantum-sensor-major-obstacle-dark.html" },
      { name: "Imperial College London", url: "https://www.imperial.ac.uk/news/articles/natural-sciences/physics/2026/new-quantum-experiment-overcomes-major-obstacle-in-search-for-dark-matter-and-gravitational-waves/" },
      { name: "Nature", url: "https://www.nature.com/articles/s41586-026-10617-1" }
    ],
    research: {
      citation: "C. F. A. Baynham m.fl., “A prototype differential atom interferometer for fundamental physics”, Nature (2026)",
      url: "https://doi.org/10.1038/s41586-026-10617-1"
    },
    body: [
      { type: "p", html: "Ungefär 85&nbsp;procent av all materia i universum är osynlig. Den syns inte i teleskop, den lyser inte — men den drar i galaxer med sin gravitation och håller ihop kosmiska strukturer som annars borde flyga isär. Fysiker kallar den <strong>mörk materia</strong>, och trots årtionden av sökande har ingen fångat en enda partikel av den. Nu har ett brittiskt forskarlag tagit ett viktigt steg mot en helt ny typ av detektor." },

      { type: "h2", text: "Atomer som mätinstrument" },
      { type: "p", html: "Experimentet, publicerat i <em>Nature</em> den 17&nbsp;juni 2026, bygger på en teknik som kallas <strong>atominterferometri</strong>. Principen påminner om det klassiska dubbelspaltexperimentet: precis som ljusvågor kan delas och sedan föras samman för att bilda interferensmönster, kan även atomer behandlas som vågor. En laser delar ett moln av ultrakalla strontium-87-atomer i två delar, låter dem färdas längs olika vägar och sammanför dem igen. Den minsta förändring i atomernas rörelse — orsakad av till exempel en passerande gravitationsvåg eller en växelverkan med en mörk-materia-partikel — lämnar ett mätbart avtryck i interferensmönstret." },
      { type: "p", html: "Problemet är att lasern själv introducerar brus. Dess fasfluktuationer är så stora att de dränker den svaga signalen man letar efter. Det är ungefär som att försöka höra en viskning på en rockkonsert." },

      { type: "h2", text: "Två interferometrar slår ut bruset" },
      { type: "p", html: "Lösningen som forskargruppen vid Imperial College London demonstrerar är elegant: de använder <em>två</em> atominterferometrar, åtskilda i rummet men belysta av <strong>samma</strong> laser. Laserbruset påverkar båda interferometrarna lika — det är gemensamt — medan en verklig signal (från gravitationsvågor eller mörk materia) ger upphov till en liten skillnad mellan de två mätningarna. Genom att jämföra resultaten tar det gemensamma bruset ut sig, och kvar blir bara signalen." },
      { type: "p", html: "I sin tabletop-prototyp injicerade forskarna avsiktligt kraftigt extrabrus för att simulera förhållandena i framtida kilometerslånga detektorer. Varje enskild interferometer överväldigades av bruset — men när de två mätningarna jämfördes kunde en tydlig signal fortfarande utvinnas. Systemet nådde den så kallade <strong>standardkvantgränsen</strong> (SQL) — den fundamentala undre gränsen för mätosäkerhet som kvantmekaniken tillåter." },
      { type: "quote", html: "Vi har tagit några av de mest precisa instrument som någonsin byggts — atomklockor och atominterferometrar — och visat att de kan användas för att öppna helt nya fönster mot universums osynliga delar.", cite: "Richard Hobson, Imperial College London" },

      { type: "h2", text: "Jakt på det ohörbara" },
      { type: "p", html: "Gravitationsvågsdetektorer som LIGO och Virgo lyssnar i frekvensområdet ovanför cirka 10&nbsp;Hz. Den planerade rymddetektorn LISA ska täcka frekvenser under 0,1&nbsp;Hz. Mellan dessa band — det så kallade <strong>mellanbandet</strong> runt 0,01–1&nbsp;Hz — finns ett gap där inget befintligt instrument är känsligt. Här kan gravitationsvågor från svarta hål i det tidiga universum gömma sig, och här kan signaler från ultralättviktiga mörk-materia-kandidater dyka upp." },
      { type: "p", html: "Det är precis detta gap som atominterferometrar av nästa generation siktar på att fylla. Prototypen vid Imperial College ingår i <strong>AION</strong>-samarbetet (<em>Atom Interferometer Observatory and Network</em>), som förenar åtta brittiska universitet och laboratorier. Planen är att skala upp tekniken stegvis: först en 10-metersversion, sedan en 100-metersanläggning som ska stå klar i början av 2030-talet. Parallellt driver Fermilab i USA det besläktade MAGIS-projektet, och vid CERN diskuteras en ännu längre version kallad AICE." },

      { type: "fact", title: "Visste du?", items: [
        "Mörk materia utgör cirka 85&nbsp;% av universums totala massa, men har aldrig observerats direkt — vi vet att den finns bara genom dess gravitationella påverkan på synlig materia.",
        "Atominterferometri utnyttjar att atomer beter sig som vågor (vågpartikeldualiteten) — samma kvantmekaniska princip som dubbelspaltexperimentet.",
        "Strontium-87 valdes för att det har en extremt smal optisk klockövergång — samma egenskap som gör det till grunden i världens bästa atomklockor.",
        "AION-samarbetets långsiktiga mål är en 100&nbsp;meter lång atominterferometer — men redan den nuvarande tabletop-prototypen har bevisat att grundprincipen fungerar."
      ]},
      { type: "p", html: "Atominterferometri förenar vågrörelselära, interferens och kvantfysik i ett och samma instrument. Resultatet visar att kvantmekaniken inte bara beskriver den lilla världen: den kan bli vårt skarpaste verktyg för att lyssna på universums mest svårfångade signaler." }
    ]
  },

  {
    id: "2026-06-20-gravastjarna-miniuniversum",
    date: "2026-06-20",
    title: "En döende stjärna kan föda ett helt nytt universum",
    deck: "Två fysiker i Frankfurt har för första gången visat hur en kollapsande jättestjärna kan bli något annat än ett svart hål — en så kallad gravastjärna, fylld med mörk energi och med ett expanderande miniuniversum i sitt inre.",
    category: "Astrofysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-20-gravastjarna-miniuniversum.jpg",
    imageAlt: "En massiv stjärna som kollapsar inåt med glödande orange yttre lager, medan en lysande blå sfär med spiralgalaxer expanderar i dess centrum — en illustration av ett miniuniversum som föds inne i stjärnan.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["astrofysik", "gravitationsfysik", "svarta hål", "gravastjärnor", "mörk energi", "allmän relativitetsteori", "kosmologi"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260614011846.htm" },
      { name: "Phys.org", url: "https://phys.org/news/2026-06-collapsing-stars-spawn-mini-universes.html" },
      { name: "Goethe-Universität Frankfurt", url: "https://www.uni-frankfurt.de/en/newsroom/meldungen/pressemitteilungen/2026/urknall-im-innern-eines-sterns-wie-ein-gravastern-entsteht" }
    ],
    research: {
      citation: "D. Jampolski & L. Rezzolla, “Formation of gravastars”, Physical Review D 113 (2026)",
      url: "https://doi.org/10.1103/c6lw-nx7k"
    },
    body: [
      { type: "p", html: "När en massiv stjärna har bränt sitt sista kärnbränsle finns ingen kraft kvar att stå emot gravitationen. Stjärnan kollapsar. Standardsvaret i läroböckerna: den bildar ett svart hål, ett objekt så kompakt att inte ens ljus kan undkomma, med en singularitet i centrum där alla kända fysikaliska lagar slutar gälla. Men tänk om det finns en annan utgång?" },
      { type: "p", html: "Två teoretiska fysiker vid Goethe-universitetet i Frankfurt — doktoranden Daniel Jampolski och professor Luciano Rezzolla — har hittat den första <strong>dynamiska lösningen</strong> till Einsteins fältekvationer som beskriver hur en kollapsande stjärna kan bli något helt annat: en <em>gravastjärna</em>. Resultatet publicerades i <em>Physical Review D</em> den 11&nbsp;juni 2026." },

      { type: "h2", text: "Ett svart hål utan svart hål" },
      { type: "p", html: "Begreppet gravastjärna (från engelskans <em>gravastar</em>, gravitational vacuum star) föreslogs redan 2001 av fysikerna Pawel Mazur och Emil Mottola. Idén: ett ultrakompakt objekt som utifrån ser nästan identiskt ut med ett svart hål — lika massivt, lika kompakt — men som saknar de två egenskaper som gör svarta hål så besvärliga för fysiken." },
      { type: "p", html: "För det första har en gravastjärna ingen <strong>singularitet</strong>, den punkt där densiteten formellt blir oändlig och ekvationerna sprängs. För det andra saknar den en <strong>händelsehorisont</strong>, den osynliga gräns varifrån ingenting kan återvända. I stället är gravastjärnans inre fyllt med mörk energi — samma mystiska kraft som driver universums accelererande expansion — och den energin utövar ett utåtriktat tryck som stabiliserar strukturen." },
      { type: "p", html: "Problemet var att ingen kunde visa <em>hur</em> en gravastjärna faktiskt skulle uppstå ur en kollapsande stjärna. Alla tidigare lösningar var statiska — de beskrev färdiga gravastjärnor men inte processen som skapar dem. Det är ungefär som att visa en bild på ett färdigbakat bröd utan att ha receptet." },

      { type: "h2", text: "Urknall inuti en stjärna" },
      { type: "p", html: "Jampolski hittade receptet under sitt examensarbete. Hans lösning beskriver ett häpnadsväckande scenario: när stjärnan har kollapsat nästan till den punkt där ett svart hål skulle bildas, uppstår ett embryonalt miniuniversum i den komprimerade materien. Det miniuniversumet genomgår sin egen urknall — en expansion driven av mörk energi som trycker utåt och motverkar gravitationens inåtriktade drag." },
      { type: "quote", html: "Urknallen i det framväxande universumet kan utvecklas först när stjärnan redan har kollapsat nästan till den punkt där den skulle bli ett svart hål.", cite: "Daniel Jampolski, Goethe-universitetet" },
      { type: "p", html: "Resultatet är en jämvikt: expansionen balanserar kollapsen, och singulariteten bildas aldrig. Kvar står en stabil gravastjärna — ett objekt som för en utomstående observatör ser ut precis som ett svart hål, men som i sitt inre rymmer en helt annan fysik." },

      { type: "h2", text: "Varför hatar fysiker singulariteter?" },
      { type: "p", html: "Singulariteter är fysikens motsvarighet till ett felmeddelande. De signalerar att våra teorier når sin gräns — att vi saknar en pusselbit. De flesta fysiker tror att singulariteter egentligen inte existerar i naturen utan är en artefakt av att den allmänna relativitetsteorin inte räcker hela vägen. En teori som förutsäger oändligheter har sannolikt ett hål. Gravastjärnan erbjuder en elegant utväg: den behåller det som gör svarta hål så fascinerande — den extrema kompaktheten — men undviker den punkt där fysiken kraschar." },
      { type: "p", html: "Rezzolla betonar att forskningen handlar om att hålla dörren öppen: ”Det är avgörande att behålla ett opartiskt förhållningssätt till det vi inte vet, och utforska både den vedertagna visdomen och de mer exotiska tolkningarna.”" },

      { type: "h2", text: "Kan vi någonsin avgöra skillnaden?" },
      { type: "p", html: "Om en gravastjärna ser ut precis som ett svart hål utifrån, hur ska vi då veta vilken sorts objekt vi observerar? Svaret kan ligga i <strong>gravitationsvågor</strong>. När två ultrakompakta objekt kolliderar och smälter samman vibrerar det sammanslagna objektet — ett fenomen som kallas ringning. Ringningens frekvenser beror på objektets inre struktur. Ett svart hål ringer på ett sätt, en gravastjärna på ett annat. Dessutom saknar en gravastjärna händelsehorisont, vilket betyder att gravitationsvågor kan studsa mot dess yta och skapa svaga <strong>ekon</strong> — en signal som LIGO och framtida detektorer aktivt letar efter." },

      { type: "fact", title: "Visste du?", items: [
        "En gravastjärna har ingen händelsehorisont — till skillnad från ett svart hål kan ljus i princip undkomma från precis utanför dess yta.",
        "Begreppet föreslogs 2001 av Pawel Mazur och Emil Mottola, men det saknades en förklaring av hur en gravastjärna faktiskt kunde bildas — tills nu.",
        "Ordet gravastar är en förkortning av gravitational vacuum star (gravitationell vakuumstjärna).",
        "Forskningen gjordes av Daniel Jampolski som en del av hans examensarbete — ett exempel på att banbrytande teoretisk fysik kan komma tidigt i karriären."
      ]},
      { type: "p", html: "Oavsett om framtida observationer bekräftar gravastjärnor eller inte, påminner upptäckten om att Einsteins allmänna relativitetsteori fortfarande kan överraska oss — mer än hundra år efter att ekvationerna skrevs." }
    ]
  },

  {
    id: "2026-06-19-kvantsammanflatning-kristall",
    date: "2026-06-19",
    title: "En kristall du kan hålla i handen är kvantsammanflätad",
    deck: "Fysiker i Wien har för första gången mätt storskalig kvantsammanflätning i en centimeterstor kristall av en så kallad konstig metall. Minst nio kvantobjekt agerar kollektivt inne i materialet — som en osynlig orkester utan dirigent.",
    category: "Kvantfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-19-kvantsammanflatning-kristall.jpg",
    imageAlt: "En liten facetterad metallkristall på en mörk polerad yta, omgiven av svaga lysande trådar som symboliserar kvantsammanflätning mellan atomer i materialet.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "kvantsammanflätning", "kondenserad materia", "konstiga metaller", "supraledning", "modern fysik"],
    sources: [
      { name: "Phys.org", url: "https://phys.org/news/2026-06-high-degree-quantum-entanglement-centimeter.html" },
      { name: "TU Wien", url: "https://www.tuwien.at/en/tu-wien/news/news-articles/news/quantenverschraenkung-schroedingers-ameisenhaufen" },
      { name: "Physics World", url: "https://physicsworld.com/a/strange-metals-get-their-strangeness-from-quantum-entanglement/" }
    ],
    research: {
      citation: "F. Mazza m.fl., “Quantum Fisher information in a strange metal”, Nature Physics (2026)",
      url: "https://doi.org/10.1038/s41567-026-03298-0"
    },
    body: [
      { type: "p", html: "Kvantsammanflätning brukar förknippas med enstaka partiklar i extremt avancerade laboratorier. Nu visar ett internationellt forskarlag att fenomenet inte alls är begränsat till den skalan. I en kristall av cerium, palladium och kisel — stor nog att ligga bekvämt i handflatan — har de påvisat att minst nio kvantobjekt agerar kollektivt, som om de vore ett enda sammanhängande system. Upptäckten publicerades i <em>Nature Physics</em> den 16&nbsp;juni 2026." },
      { type: "p", html: "Kristallen tillhör en grupp material som fysiker kallar <strong>konstiga metaller</strong> (engelska: <em>strange metals</em>). Trots namnet handlar det inte om science fiction utan om ett av kondenserade materiens hårdaste nötter — material vars elektriska egenskaper trotsar de teorier som fungerar utmärkt för vanliga metaller som koppar och guld." },

      { type: "h2", text: "Vad gör en metall konstig?" },
      { type: "p", html: "I en vanlig metall rör sig elektronerna ungefär som en gas av oberoende partiklar. Motståndet ökar med temperaturen på ett förutsägbart sätt, och vid låga temperaturer platåar det. Fysiker har förstått det sedan 1930-talet." },
      { type: "p", html: "Men i konstiga metaller stiger det elektriska motståndet <em>linjärt</em> med temperaturen ända från nära absoluta nollpunkten, utan någon platå. Det bryter mot standardteorin. Ännu märkligare: flera av dessa material har en supraledande fas, där de vid tillräckligt låg temperatur plötsligt leder ström helt utan motstånd. I över trettio år har ingen kunnat förklara beteendet fullt ut. Kristallen som undersöktes, Ce₃Pd₂₀Si₆, tillhör denna gåtfulla familj." },

      { type: "h2", text: "Schrödingers myrstack" },
      { type: "p", html: "Forskargruppen vid TU Wien i Österrike, ledd av professor Silke Bühler-Paschen, tog ett nytt grepp på problemet. I stället för att försöka sätta hela kristallen i en Schrödinger-katt-liknande superposition — vilket vore praktiskt omöjligt — ställde de en annan fråga: är kristallens beståndsdelar <em>kollektivt</em> kvantsammanflätade?" },
      { type: "p", html: "Bühler-Paschen liknar det vid en myrstack. Stör man en bit av stacken reagerar inte bara de myror som sitter just där, utan hela kolonin, som om den vore en enda organism. Samma mönster hittade forskargruppen i kristallen — fast på kvantnivå." },
      { type: "p", html: "Doktoranden Federico Mazza genomförde experimenten vid Institut Laue-Langevin (ILL) i Grenoble, en av världens kraftfullaste neutronkällor. Genom att bombardera kristallen med neutroner och mäta hur den svarade kunde teamet beräkna den så kallade <strong>kvantfisherinformationen</strong> — ett mått på hur känsligt ett kvantsystem reagerar på en störning. Om partiklarna vore oberoende skulle svaret vara begränsat. Men om de är sammanflätade reagerar hela systemet starkare än summan av sina delar." },
      { type: "p", html: "Resultatet var tydligt. Mazza sammanfattar: ”Analysen visar ett svar som inte kan förklaras av oberoende partiklar. I stället agerar grupper av minst nio kvantobjekt kollektivt.” Det är direkt bevis för storskalig, så kallad <em>multipartit</em>, kvantsammanflätning i ett fast material man kan hålla i handen." },

      { type: "h2", text: "Ledtråden till det konstiga beteendet" },
      { type: "p", html: "Upptäckten gör mer än att flytta gränsen för var vi kan observera kvantsammanflätning. Den ger en direkt ledtråd till <em>varför</em> konstiga metaller beter sig så — konstigt. Redan 2025 visade samma grupp, i samarbete med Rice University i USA, att strömmen genom en konstig metall flödar med ovanligt lite brus, som om elektronerna koordinerade sig sinsemellan. Den nya studien pekar på att just sammanflätningen är mekanismen bakom den koordinationen." },
      { type: "quote", html: "Stark sammanflätning verkar vara direkt kopplad till de konstiga metallernas ovanliga beteende.", cite: "Fakher Assaad, teoretisk fysiker, Würzburgs universitet" },
      { type: "p", html: "Och det finns en praktisk dimension. Flera konstiga metaller har supraledande faser — de kan leda ström helt utan motstånd. Att förstå sammanflätningens roll kan öppna vägen för bättre supraledare och kanske, en dag, för kvantteknologi baserad på fasta material i stället för isolerade partiklar i vakuum." },

      { type: "fact", title: "Visste du?", items: [
        "Kvantsammanflätning innebär att partiklar delar ett gemensamt kvanttillstånd — mäter du en partikel vet du omedelbart något om den andra, oavsett avstånd.",
        "Kristallen som undersöktes, Ce₃Pd₂₀Si₆, består av cerium (Ce), palladium (Pd) och kisel (Si) — grundämnen du kanske inte stöter på varje dag, men som tillsammans bildar ett av fysikens mest mystiska material.",
        "Experimenten utfördes med neutroner vid Institut Laue-Langevin i Grenoble, Frankrike — en av världens mest intensiva neutronkällor, där forskare från över 40 länder studerar materiens innersta struktur.",
        "Kvantfisherinformationen mäter hur känsligt ett kvantsystem reagerar på störningar. Hög känslighet avslöjar att partiklarna inte agerar var för sig utan är sammanflätade."
      ]},
      { type: "p", html: "Kvantsammanflätning och superposition hör till den moderna fysikens mest gäckande fenomen. Upptäckten visar att kvantvärlden inte bara finns i läroböckernas tankeexperiment — den kan gömma sig i en kristall på ditt skrivbord." }
    ]
  },

  {
    id: "2026-06-18-juno-neutrinodetektor",
    date: "2026-06-18",
    title: "Världens skarpaste neutrinoöga öppnas — 700 meter under jorden",
    deck: "I en jättelik glaskula fylld med 20 000 ton genomskinlig vätska, djupt under södra Kina, har neutrinoobservatoriet JUNO gjort sina första mätningar. På bara 59 dagar slog det alla tidigare experiment tillsammans.",
    category: "Partikelfysik",
    readingTime: "6 min",
    image: "nyheter/bilder/juno-detektor.jpg",
    imageAlt: "Illustration av en enorm sfärisk neutrinodetektor i en bergsal, klädd på insidan med tusentals glödande sensorer, med en liten människa på en gångbro för att visa skalan.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["partikelfysik", "modern fysik", "neutriner", "standardmodellen", "kosmologi"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260612032026.htm" },
      { name: "Chinese Academy of Sciences", url: "https://english.cas.cn/newsroom/headlines/202606/t20260611_1161560.shtml" }
    ],
    research: {
      citation: "The JUNO Collaboration, ”Measurement of reactor neutrino oscillation with the first JUNO data”, Nature 654 (2026)",
      url: "https://www.nature.com/articles/s41586-026-10538-z"
    },
    body: [
      { type: "p", html: "Just medan du läser den här meningen susar hundratals miljarder neutriner rakt genom din tumnagel. De bryr sig inte det minsta om dig — eller om jorden, för den delen. De allra flesta passerar tvärs igenom hela planeten utan att ens nudda en enda atom. Neutrinen är universums mest asociala partikel, och just därför en av de allra svåraste att studera." },
      { type: "p", html: "Men nu har fysikerna fått ett osedvanligt skarpt verktyg. Den 10&nbsp;juni 2026 publicerade <em>Nature</em> de första resultaten från <strong>JUNO</strong> — Jiangmen Underground Neutrino Observatory — ett gigantiskt detektorbygge 700&nbsp;meter under marken i södra Kina. Och redan med sina första veckors data har det ställt sig i främsta ledet bland världens neutrinoexperiment." },

      { type: "h2", text: "En glaskula stor som ett tolvvåningshus" },
      { type: "p", html: "Hjärtat i JUNO är en genomskinlig akrylsfär med 35,4&nbsp;meters diameter — ungefär lika hög som ett tolvvåningshus — fylld med 20&nbsp;000&nbsp;ton specialvätska. Vätskan är en så kallad scintillator: den lyser till med en svag ljusblixt i samma stund som en neutrino råkar krocka med den. Sfären hänger inuti en stålkonstruktion på 41,1&nbsp;meter och är i sin tur nedsänkt i en 44&nbsp;meter djup vattenbassäng som skärmar av störande strålning från omgivningen." },
      { type: "p", html: "För att fånga de ytterst svaga ljusblixtarna stirrar nästan 45&nbsp;000 ljuskänsliga ”ögon” in mot vätskan: omkring 20&nbsp;000 stora och 25&nbsp;600 mindre så kallade fotomultiplikatorer, som kan förstärka en handfull ljuspartiklar till en mätbar elektrisk signal. Att bygga något så enormt och samtidigt så rent från radioaktiva föroreningar är en bedrift i sig — minsta lilla bakgrundsstrålning skulle annars dränka signalen. Nobelpristagaren Arthur McDonald konstaterar att JUNO ”uppnått exceptionell radioaktiv renhet, energiupplösning och stabilitet”." },

      { type: "h2", text: "Partiklar som byter skepnad" },
      { type: "p", html: "Neutriner finns i tre ”smaker”: elektron-, myon- och tauneutrino. Det märkliga är att en neutrino kan <em>byta smak</em> medan den färdas — den startar som den ena sorten och kan anlända som en annan. Fenomenet kallas neutrinooscillation, och det var själva upptäckten av att neutriner oscillerar som visade att de faktiskt har en (om än pytteliten) massa. Den insikten belönades med Nobelpriset i fysik 2015 — som delades av just Arthur McDonald, mannen bakom citatet ovan." },
      { type: "p", html: "JUNO mäter hur antineutriner från närliggande kärnkraftverk oscillerar på sin väg till detektorn. Reaktorerna sprutar ut ett jämnt flöde av antineutriner, och genom att räkna hur många som tycks ”försvinna” (alltså byta smak) vid olika energier kan forskarna kartlägga oscillationen i detalj. Med bara 59&nbsp;dagars data — insamlade mellan 26&nbsp;augusti och 2&nbsp;november 2025 — bestämde man två av oscillationens nyckeltal med en skärpa som är <strong>1,6&nbsp;gånger bättre</strong> än alla tidigare experiment under flera decennier <em>tillsammans</em>. Inte illa för ett experiment som knappt hunnit värma upp." },
      { type: "quote", html: "Det här första resultatet markerar gryningen för nästa era av precisa mätningar av neutrinooscillation.", cite: "Ledarartikel i Nature" },

      { type: "h2", text: "Varför bryr vi oss om de här spökpartiklarna?" },
      { type: "p", html: "JUNO:s stora mål är att lösa neutrinernas <strong>massordning</strong>: vilken av de tre neutrinerna som är lättast och vilken som är tyngst. Det låter som en parentes, men svaret är en pusselbit i några av fysikens största frågor — bland annat varför universum består av materia snarare än antimateria. Hade materia och antimateria bildats i exakt lika delar vid Big Bang skulle de ha utplånat varandra fullständigt, och varken stjärnor eller vi skulle finnas. Något måste ha gett materien ett pyttelitet övertag, och neutrinerna är bland huvudmisstänkta." },
      { type: "p", html: "Och JUNO ska göra långt mer än så. Samma detektor kommer att fånga neutriner från solen, från jordens inre, från atmosfären — och, om vi har tur, från en exploderande stjärna någonstans i vår galax. En enda närbelägen supernova skulle på några sekunder ge fler neutriner än experimentet annars samlar in på flera år. Den som vill vara med och titta får hålla utkik: nästa skörd av resultat väntas redan sommaren 2026." },

      { type: "fact", title: "Visste du?", items: [
        "Cirka 100 biljoner neutriner från solen passerar genom din kropp varje sekund — dygnet runt, året om.",
        "En neutrino kan flyga genom ett ljusår av bly och ändå ha god chans att komma ut på andra sidan.",
        "Neutrinen föreslogs redan 1930 av Wolfgang Pauli, som kallade den ”en desperat utväg” — men det dröjde 26 år innan någon lyckades fånga en.",
        "Upptäckten att neutriner oscillerar — och alltså har massa — gav Takaaki Kajita och Arthur McDonald Nobelpriset i fysik 2015."
      ]},
      { type: "p", html: "Neutriner och standardmodellen hör till den moderna fysikens kärna — och energinivåer, fotoner och atomkärnor är samma värld som JUNO utforskar på allra minsta skala." }
    ]
  },

  {
    id: "2026-06-17-supraledning-nanoytor",
    date: "2026-06-17",
    title: "Knöligt underlag lurar supraledaren att tåla mer",
    deck: "Genom att rynka ytan under en hårfin supraledande film fick forskare vid Chalmers materialet att leda ström utan motstånd vid högre temperatur och i starkare magnetfält — ett litet trick med stora konsekvenser.",
    category: "Materialfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-17-supraledning.jpg",
    imageAlt: "En liten kubformad magnet svävar fritt ovanför en kall supraledare medan vit kväveånga virvlar runt — den klassiska Meissnereffekten.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["materialfysik", "supraledning", "ellära", "magnetism", "kvantfysik"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260617032211.htm" }
    ],
    research: {
      citation: "F. Lombardi m.fl., ”Boosting superconductivity in ultrathin YBa₂Cu₃O₇₋δ films via nanofaceted substrates”, Nature Communications 17 (2026)",
      url: "https://doi.org/10.1038/s41467-025-67500-2"
    },
    body: [
      { type: "p", html: "En supraledare är ett material som leder elektrisk ström helt utan motstånd — ingen energi går förlorad som värme på vägen. I en vanlig kopparkabel knuffar elektronerna hela tiden emot atomerna och tappar energi (det är därför en laddare blir varm). I en supraledare glider strömmen i stället fram utan minsta friktion. Haken är att de flesta supraledare bara fungerar vid fruktansvärt låga temperaturer, nära den absoluta nollpunkten vid omkring −273&nbsp;°C. Att knuffa upp den temperaturen, om så bara med några grader, är en av materialfysikens heligaste graler." },
      { type: "h2", text: "Tricket: rynka underlaget" },
      { type: "p", html: "Forskargruppen ledd av Floriana Lombardi vid Chalmers tog en film av kupratet YBCO (yttrium-barium-kopparoxid) — bara några atomlager tjock — och lade den ovanpå ett underlag av magnesiumoxid. Men först mönstrade de underlagets yta med ett landskap av pyttesmå åsar och dalar, mindre än en miljondels hårstrå breda. När den supraledande filmen sedan växer ovanpå tvingas dess atomer lägga sig till rätta efter det mönstret." },
      { type: "p", html: "Det subtila knepet förändrar den elektroniska miljön precis i gränsskiktet mellan underlag och film — och det visade sig stärka supraledningen. Materialet förblev supraledande vid både högre temperatur och i kraftigare magnetfält än annars. ”Genom att ändra underlagets ytdesign kunde vi påverka de supraledande egenskaperna”, säger Lombardi. Arbetet gjordes tillsammans med RISE och internationella partner och publicerades i <em>Nature Communications</em>." },
      { type: "h2", text: "Varför är magnetfält ett problem?" },
      { type: "p", html: "Starka magnetfält är supraledningens naturliga fiende — höj fältet tillräckligt och supraledningen bryter samman. Det är ett verkligt bekymmer, för många av de mest spännande tillämpningarna handlar just om kraftiga magnetfält: magnetkameror (MR) på sjukhus, partikelacceleratorer och de gigantiska magneterna i framtidens fusionsreaktorer. En supraledare som tål både högre temperatur <em>och</em> starkare fält är därför dubbelt värdefull." },
      { type: "h2", text: "Drömmen om rumstemperatur" },
      { type: "p", html: "Varje grad närmare rumstemperatur gör tekniken billigare och enklare. Dagens supraledare måste kylas med flytande kväve eller helium, vilket är dyrt och otympligt. En supraledare som fungerade vid vanlig rumstemperatur skulle kunna revolutionera elnäten (ingen energi förlorad i ledningarna), elektroniken och transporten — tänk svävande tåg som lyfts av magnetfält. Chalmersforskarnas resultat är inte den slutgiltiga lösningen, men det pekar ut en ny väg att putta gränsen i rätt riktning." },
      { type: "fact", title: "Visste du?", items: [
        "I en supraledare flyter strömmen utan minsta motstånd — en ström som en gång satts igång i en sluten supraledande ring kan i princip rulla vidare nästan i evighet.",
        "Supraledare stöter bort magnetfält (Meissnereffekten). Därför kan en magnet sväva fritt ovanför en kall supraledare, precis som på bilden ovan.",
        "Fenomenet upptäcktes 1911 av Heike Kamerlingh Onnes, som kylde kvicksilver till omkring −269 °C och såg motståndet plötsligt försvinna helt."
      ]},
      { type: "p", html: "Hur ström möter motstånd i vanliga ledare hör hemma i elläran — en supraledare är specialfallet ”noll resistans”, där elektronerna flödar helt utan energiförluster." }
    ]
  },

  {
    id: "2026-06-16-schrodingers-katt",
    date: "2026-06-16",
    title: "Schrödingers katt får en ny, ännu konstigare släkting",
    deck: "Fysiker i Oxford har byggt en kvantmekanisk ”katt” av byggstenar som själva är genomkvantiga — ett tillstånd ingen tidigare lyckats skapa, och som kan göra framtidens kvantdatorer mer feltåliga.",
    category: "Kvantfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-16-schrodingers-katt.jpg",
    imageAlt: "Abstrakt visualisering av en kvantmekanisk superposition: en ljuspunkt som delar sig i två överlappande, genomskinliga vågtillstånd.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kvantfysik", "modern fysik", "kvantdator", "superposition", "schrödingers katt"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260614011848.htm" },
      { name: "University of Oxford", url: "https://www.physics.ox.ac.uk/news/oxford-physicists-create-new-family-schrodingers-cat-states" }
    ],
    research: {
      citation: "S. Saner m.fl., ”Generating Arbitrary Superpositions of Nonclassical Quantum Harmonic Oscillator States”, Physical Review X (2026)",
      url: "https://doi.org/10.1103/k1xk-yt42"
    },
    body: [
      { type: "p", html: "Erwin Schrödinger menade allvar med sitt berömda tankeexperiment. Enligt kvantmekaniken kan ett system befinna sig i en <em>superposition</em> — flera tillstånd samtidigt — ända tills någon mäter det. Schrödinger drog idén till sin spets: en katt i en låda, kopplad till en kvantmekanisk utlösare, skulle då vara både levande och död på en gång. I labbet kallar fysiker varje sådan ”både–och”-superposition av ett större system för ett <em>katt-tillstånd</em>." },
      { type: "p", html: "Nu har ett team vid University of Oxford skapat en helt ny familj av sådana tillstånd. Vanligtvis bygger man katt-tillstånd genom att lägga ihop enkla, nästan klassiska vågpaket. Oxfordgruppen gjorde i stället superpositioner av komponenter som var och en redan är djupt kvantmekaniska — så kallade hoptryckta (”squeezed”) tillstånd, och till och med tri- och kvadhoptryckta varianter. En sorts kvantkatt vars beståndsdelar själva är ovanligt kattlika, om man så vill." },
      { type: "h2", text: "Hur gör man en katt av joner?" },
      { type: "p", html: "Experimentet bygger på <em>fångade joner</em> — enskilda atomer som hålls svävande i elektriska fält och knuffas med laserpulser. Genom skräddarsydda växelverkningar och mätningar mitt under förloppet kunde forskarna ”skulptera” superpositionen till nästan vilken form de ville: styra storlek, orientering och avstånd mellan delarna. Att tillstånden verkligen var kvantmekaniska bekräftades av deras interferensmönster och så kallad Wigner-negativitet — ett fingeravtryck som klassisk fysik helt enkelt inte kan härma. Studien publicerades i <em>Physical Review X</em>." },
      { type: "h2", text: "Varför vill man ha en konstigare katt?" },
      { type: "p", html: "De nya tillstånden visade sig vara betydligt mer motståndskraftiga mot fel. Och fel är kvantdatorernas akilleshäl: kvantinformation är ömtålig och rubbas av minsta lilla brus från omgivningen. Ett tillstånd som tål mer störning innan det kollapsar är därför guld värt — för felrättning, för känsliga mätinstrument och för kvantdatorer som faktiskt går att lita på. Och ju rikare verktygslåda av kvanttillstånd forskarna har att välja bland, desto fler vägar finns det att bygga robust kvantteknik." },
      { type: "p", html: "Det är värt att stanna upp vid hur långt fysiken kommit: det Schrödinger 1935 tog upp som en absurd tankelek — för att <em>visa</em> hur befängd kvantmekaniken verkar — bygger forskarna i dag avsiktligt i laboratoriet, atom för atom." },
      { type: "fact", title: "Visste du?", items: [
        "Schrödinger hittade på sin katt 1935 — inte för att han trodde på odöda katter, utan för att visa hur orimlig superpositionen verkar när man blåser upp den till vardagsstorlek.",
        "En superposition kollapsar så fort den ”mäts” av omgivningen. Att hålla ett kvanttillstånd ostört länge nog är en av kvantdatorbyggandets allra största utmaningar.",
        "Fångade joner är en av de ledande plattformarna för att bygga kvantdatorer — vid sidan av supraledande kretsar."
      ]},
      { type: "p", html: "Kvantfysikens grunder — att ljus och materia uppträder som både vågor och partiklar, och att energin är kvantiserad — är själva förutsättningen för att kunna styra enskilda joner så exakt som experimentet kräver." }
    ]
  },

  {
    id: "2026-06-15-elementarpartiklar",
    date: "2026-06-15",
    title: "Hur många elementarpartiklar finns det — 17, 61 eller 995,5?",
    deck: "Det låter som en enkel fråga med ett enkelt svar. Det är det inte. En essä i Quanta Magazine visar hur räkningen skenar iväg ju noggrannare man tittar.",
    category: "Partikelfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-15-elementarpartiklar.jpg",
    imageAlt: "Visualisering av en högenergikollision där lysande, böjda partikelspår spiralar utåt från en central punkt mot svart bakgrund.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["partikelfysik", "modern fysik", "standardmodellen", "kvarkar", "higgs"],
    sources: [
      { name: "Quanta Magazine", url: "https://www.quantamagazine.org/how-many-elementary-particles-are-there-really-20260615/" }
    ],
    research: null,
    body: [
      { type: "p", html: "Standardmodellen är fysikens bästa karta över materiens minsta byggstenar och de krafter som binder dem samman. Det tal man oftast får höra är <strong>17</strong>: tolv materiepartiklar (elektron, myon, tau, tre sorters neutriner och sex kvarkar), fyra kraftbärare (foton, W, Z och gluon) — och så Higgspartikeln på toppen." },
      { type: "h2", text: "Materia och krafter" },
      { type: "p", html: "De tolv materiepartiklarna kallas <em>fermioner</em>. Vardagsmaterien är egentligen ganska enkel: protoner och neutroner är byggda av upp- och nedkvarkar, och runt atomkärnan kretsar elektroner. Resten — myoner, tau och de tyngre kvarkarna — är instabila kusiner som mest dyker upp i partikelacceleratorer och i kosmisk strålning. Kraftbärarna kallas <em>bosoner</em>: fotonen förmedlar elektromagnetismen, gluonen den starka kärnkraften, och W och Z den svaga kraften. Higgspartikeln är speciell — det är växelverkan med Higgsfältet som ger de övriga partiklarna deras massa." },
      { type: "h2", text: "Men sen blir det krångligt" },
      { type: "p", html: "Räkneövningen ser enkel ut, men den skenar snabbt iväg. För varje partikel finns en antipartikel — vips är vi uppe i 30. Gluonen visar sig dessutom vara inte en utan åtta, var och en med sin egen kombination av ”färgladdning” (den starka kraftens motsvarighet till elektrisk laddning) — 37. Varje kvark finns i sin tur i tre färger — 61. Räknar man även in att partiklar kan vara vänster- eller högerhänta, och kraftbärarnas olika polarisationer, landar man på 118." },
      { type: "p", html: "Och vill man vara riktigt petig och räkna kvantfältens ”frihetsgrader” — för i grunden är partiklar bara små krusningar i underliggande fält som fyller hela rymden — spottar matematiken ur sig det underbart absurda svaret <strong>995,5</strong>. Ja, en halv. Eller som essäns författare Natalie Wolchover sammanfattar det hela: kvantfältteori är ”obegripligt svårt”." },
      { type: "h2", text: "Vem bryr sig om exakt antal?" },
      { type: "p", html: "Poängen är inte att fastna vid ett tal, utan att se hur djupt naturens skenbara enkelhet vilar på något betydligt mer mångbottnat. Frågan ”hur många?” tvingar fram följdfrågan ”vad menar vi egentligen med <em>en partikel</em>?” — och just där, i glappet mellan vår vardagsbild av små kulor och kvantfältteorins verklighet, börjar den riktigt intressanta fysiken." },
      { type: "fact", title: "Standardmodellen i korthet", items: [
        "12 materiepartiklar (fermioner) + 4 kraftbärare (bosoner) + Higgs = 17.",
        "Higgspartikeln, som ger de andra partiklarna deras massa, bekräftades vid CERN 2012.",
        "Materia och antimateria förintar varandra vid kontakt och blir ren energi — därför är antimateria så svårt att lagra.",
        "Gravitationen saknas helt i standardmodellen — hur den passar in är en av fysikens största olösta gåtor."
      ]},
      { type: "p", html: "Materiens minsta byggstenar och atomkärnans inre hör till den moderna fysikens kärnområden — samma kärnfysik som styr radioaktivt sönderfall och atomernas energinivåer." }
    ]
  },

  {
    id: "2026-06-14-mork-energi",
    date: "2026-06-14",
    title: "Mörk energi överlever attacken — universum fortsätter accelerera",
    deck: "Förra året hävdade en uppmärksammad studie att den mörka energin kanske var en synvilla. Nu har två Nobelpristagare granskat beräkningarna — och hittat två rejäla räknefel.",
    category: "Kosmologi",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-06-14-mork-energi.jpg",
    imageAlt: "Kosmisk visualisering av ett accelererande, expanderande universum där galaxer glider isär över ett rutnät av rumtid som sträcks ut.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["kosmologi", "astronomi", "mörk energi", "supernova", "universums expansion"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260612032030.htm" },
      { name: "SciTechDaily", url: "https://scitechdaily.com/astronomers-confirm-dark-energy-after-shock-challenge-rocked-cosmology/" }
    ],
    research: {
      citation: "P. Wiseman, A. Riess, B. Schmidt m.fl., ”Still Accelerating: Type Ia supernova cosmology is robust to host galaxy age evolution”, Monthly Notices of the Royal Astronomical Society (2026)",
      url: "https://doi.org/10.1093/mnras/stag797"
    },
    body: [
      { type: "p", html: "Sedan slutet av 1990-talet vet vi något häpnadsväckande: universums expansion bromsar inte in, den <em>accelererar</em>. Den okända kraft som tycks driva på har fått namnet mörk energi, och den utgör enligt mätningarna ungefär 70&nbsp;% av allt som finns. Upptäckten gav 2011 års Nobelpris i fysik." },
      { type: "h2", text: "Måttstockar i mörkret" },
      { type: "p", html: "Men hur vet vi över huvud taget att universum accelererar? Nyckeln är en särskild sorts stjärnexplosion: <strong>supernovor av typ Ia</strong>. De uppstår när en vit dvärgstjärna samlar på sig för mycket massa och sprängs — och det fina är att de alltid lyser ungefär lika starkt. De fungerar därför som <em>standardljus</em>, kosmiska måttstockar. Ser en sådan supernova ljussvag ut är den långt borta; jämför man ljusstyrkan med hur mycket ljuset töjts ut (rödförskjutits) på vägen hit kan man räkna ut hur expansionen ändrats över tid. 1998 gjorde två oberoende forskarlag samma omtumlande upptäckt: expansionen ökar." },
      { type: "h2", text: "Den sensationella attacken" },
      { type: "p", html: "År 2025 publicerade en grupp vid Yonsei-universitetet i Sydkorea en studie som skakade fältet. De hävdade att supernovorna inte var fullt så pålitliga måttstockar som man trott — att de förändras systematiskt beroende på åldern hos den galax de sitter i — och att accelerationen därmed kunde vara en synvilla. Om det stämde behövdes ingen mörk energi alls. En sensationell tanke, och den fick stor uppmärksamhet." },
      { type: "h2", text: "Men det höll inte" },
      { type: "p", html: "Ett internationellt team lett av Phil Wiseman vid University of Southampton, med Nobelpristagarna Adam Riess och Brian Schmidt bland författarna, gick tillbaka till exakt samma data. De hittade två avgörande misstag. Dels hade den koreanska gruppen blandat ihop <em>galaxens</em> ålder med den <em>exploderande stjärnans</em> ålder — två helt olika saker. Dels hade man hoppat över en standardkorrigering som tar hänsyn till värdgalaxens massa. När båda felen rättades kom accelerationen tillbaka, hel och oskadd. ”Kris avvärjd”, som ett brittiskt forskarsällskap sammanfattade det. Rebuttalen publicerades i <em>Monthly Notices of the Royal Astronomical Society</em>." },
      { type: "h2", text: "Varför är det här viktigt?" },
      { type: "p", html: "Att forskare kontrollräknar och rättar varandras misstag är inte ett tecken på att vetenskapen är trasig — det är precis så den ska fungera. Ett extraordinärt påstående kräver extraordinära bevis, och här höll de inte. Den mörka energin förblir samtidigt ett av fysikens största mysterier: vi vet att den finns och ungefär hur stark den är, men inte <em>vad</em> den är. Det gör den inte mindre verklig — bara desto mer spännande." },
      { type: "fact", title: "Visste du?", items: [
        "Mörk energi och mörk materia utgör tillsammans omkring 95 % av universums innehåll. Den vanliga materien — stjärnor, planeter, du och jag — är bara resten.",
        "En typ Ia-supernova kan under en kort tid lysa lika starkt som en hel galax med miljarder stjärnor.",
        "Att universum accelererar upptäcktes oberoende av två forskarlag 1998, genom att studera ljuset från avlägsna supernovor."
      ]}
    ]
  },

  {
    id: "2026-06-13-wasp-121b",
    date: "2026-06-13",
    title: "En planet med två helt olika skymningar",
    deck: "Rymdteleskopet James Webb har studerat den glödheta jätteplaneten WASP-121b och upptäckt att dess morgon- och kvällssida ser helt olika ut — med vindar som släpar värme runt klotet och vatten som slits isär av hettan.",
    category: "Astronomi",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-13-wasp-121b.jpg",
    imageAlt: "En glödhet gasjätte sedd från rymden, till hälften i lysande orange dagsida och till hälften i sval blå nattsida, med en skarp gräns mellan dem.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["astronomi", "exoplaneter", "james webb", "atmosfär", "spektroskopi"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260611024559.htm" },
      { name: "Max Planck Institute for Astronomy", url: "https://www.mpia.de/news/science/2026-04-wasp-121-b" }
    ],
    research: {
      citation: "C. Gapp m.fl., ”Atmospheric asymmetries in WASP-121 b revealed by rotational transits detected with JWST”, Nature Astronomy (2026)",
      url: "https://doi.org/10.1038/s41550-026-02887-6"
    },
    body: [
      { type: "p", html: "WASP-121b är en så kallad het jupiter: en gasjätte som ligger så nära sin stjärna att ett ”år” bara är drygt ett dygn långt. Den är dessutom bunden så att samma sida alltid vetter mot stjärnan — evig dag på den ena halvan, evig natt på den andra. Planeten ligger omkring 880&nbsp;ljusår bort och hör till de mest extrema världar vi känner till." },
      { type: "h2", text: "Morgon och kväll — men inte som hemma" },
      { type: "p", html: "När Webb analyserade ljuset som silade genom planetens atmosfär såg forskarna att gränsen mellan dag och natt inte är symmetrisk. Kvällssidan är hetare och mer uppblåst än morgonsidan, eftersom kraftiga vindar bär med sig värme österut från den ständigt solbelysta dagsidan. På kvällssidan syntes också en starkare signal av kolmonoxid, medan det på den svalare morgonsidan fanns tecken på moln av — bokstavligen — mineraler. På dagsidan är hettan så våldsam att vattenmolekyler slits isär i sina beståndsdelar." },
      { type: "p", html: "Skillnaden mellan de två sidorna är dramatisk: enligt mätningarna skiljer det uppemot tusen grader mellan morgon och kväll. Att över huvud taget kunna skilja på morgon och kväll hos en planet flera hundra ljusår bort hade varit ren science fiction för bara ett decennium sedan." },
      { type: "h2", text: "Hur ser man en planet man inte ens kan se?" },
      { type: "p", html: "Webb tittar inte rakt på planeten — den är alldeles för ljussvag intill sin bländande stjärna. I stället mäter teleskopet hur stjärnans ljus färgas när det passerar genom planetens atmosfär på väg mot oss. Olika ämnen suger åt sig olika våglängder, och ur det mönstret kan forskarna läsa av vad atmosfären innehåller — en sorts kosmisk fingeravtrycksanalys som kallas spektroskopi." },
      { type: "p", html: "Knepet den här gången var att utnyttja att planeten hinner vrida sig en aning medan den glider in framför och bakom stjärnan. Då avtecknar sig morgon- och kvällssidans atmosfär var för sig i ljuset, och forskarna kunde kartlägga de två gränszonerna separat — ett slags ”rotationstransit”." },
      { type: "fact", title: "Visste du?", items: [
        "WASP-121b är så het att den glöder — temperaturen på dagsidan når flera tusen grader.",
        "Eftersom planeten alltid vänder samma sida mot stjärnan har den evig dag på ena halvan och evig natt på den andra, precis som månen alltid vänder samma sida mot jorden.",
        "Metoden att läsa av ett ämnes ljus-fingeravtryck är samma princip som avslöjar vilka grundämnen en avlägsen stjärna består av."
      ]},
      { type: "p", html: "Att varje grundämne sänder ut ljus i sitt eget mönster av våglängder — ett slags optiskt fingeravtryck — är grunden för spektroskopin, ett av fysikens mest kraftfulla verktyg för att ta reda på vad materia består av." }
    ]
  },

  {
    id: "2026-06-12-jordens-hav",
    date: "2026-06-12",
    title: "Var kom jordens hav ifrån? Kanske gjorde jorden dem själv",
    deck: "Länge trodde forskarna att vattnet kom hit med kometer, sedan med asteroider. Nu lutar allt mer åt att en stor del av jordens vatten var hemmagjort från första början.",
    category: "Planetfysik",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-12-jordens-hav.jpg",
    imageAlt: "Den unga jorden sedd från rymden, delvis täckt av mörkblå nybildade hav och vita moln, med vulkanisk glöd och några iskalla kometer i fjärran.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["planetfysik", "astronomi", "geofysik", "vatten", "kometer"],
    sources: [
      { name: "Quanta Magazine", url: "https://www.quantamagazine.org/where-did-earth-get-its-oceans-maybe-it-made-them-itself-20260612/" }
    ],
    research: null,
    body: [
      { type: "p", html: "Jorden är en blå planet — men varifrån kom egentligen allt vatten? Frågan är knepigare än den låter. När jorden bildades för drygt 4,5&nbsp;miljarder år sedan var den glödhet, täckt av ett hav av smält sten, och vatten borde ha kokat bort. Ändå har vi i dag oceaner som täcker större delen av klotet. Något måste ha tillfört vattnet — eller bevarat det." },
      { type: "h2", text: "Kometer, asteroider — eller jorden själv?" },
      { type: "p", html: "Den länge populäraste idén var att vattnet levererades utifrån, av iskalla kometer som kraschade in i den unga jorden. Ett sätt att testa det är att jämföra ”vattnets fingeravtryck”: förhållandet mellan vanligt väte och dess tyngre kusin deuterium. Olika reservoarer i solsystemet har olika sådana förhållanden, så det fungerar som ett ursprungsmärke. Mätningar av kometen 12P/Pons–Brooks visade ett förhållande förvånansvärt likt havens — så kometer kan ha bidragit trots allt." },
      { type: "p", html: "Men en växande skara forskare menar, enligt en genomgång i Quanta Magazine, att jorden delvis kan ha tillverkat sitt eget vatten. Väte som låg bundet djupt inne i den unga planeten kan ha reagerat med syre från bergarterna och bildat vatten <em>inifrån</em>. I så fall hade jorden en del av sitt vatten hemmagjort redan från start, utan att behöva vänta på leverans från rymden." },
      { type: "h2", text: "Antagligen lite av allt" },
      { type: "p", html: "Sannolikt är svaret en blandning: kometer, asteroider <em>och</em> hemmaproduktion, i proportioner forskarna fortfarande tvistar om. Och vattnet har inte legat stilla sedan dess — det har formats om av miljarder år av geologi, vulkanism, atmosfär och liv. Att reda ut historien är som att läsa en deckare där bevisen blandats om gång på gång." },
      { type: "h2", text: "Varför spelar det roll?" },
      { type: "p", html: "Vatten är förutsättningen för liv som vi känner det. Förstår vi hur jorden fick sina hav förstår vi också bättre hur vanligt — eller ovanligt — det är att en planet blir beboelig. Och det är precis den frågan som driver jakten på liv kring andra stjärnor." },
      { type: "fact", title: "Visste du?", items: [
        "Deuterium är ”tungt väte” — en väteatom med en extra neutron i kärnan. Vatten gjort av deuterium kallas tungt vatten.",
        "Förhållandet mellan deuterium och vanligt väte fungerar som ett kemiskt fingeravtryck som kan avslöja var ett visst vatten en gång kom ifrån.",
        "Den unga jorden var länge täckt av ett glödande hav av magma — flytande vatten kunde inte finnas kvar förrän ytan svalnat."
      ]}
    ]
  },

  {
    id: "2026-06-11-konstgjord-fotosyntes",
    date: "2026-06-11",
    title: "Ett konstgjort blad som sköter sig självt",
    deck: "Forskare i Japan har byggt en apparat som gör bränsle av solljus, vatten och koldioxid — och som ställer in sig själv efter solen, helt utan batterier eller styrelektronik.",
    category: "Energi",
    readingTime: "5 min",
    image: "nyheter/bilder/2026-06-11-konstgjord-fotosyntes.jpg",
    imageAlt: "Ett slätt, bladliknande element nedsänkt i klart vatten i solsken, med fina strömmar av gasbubblor som stiger från ytan.",
    imageCredit: "Illustration: Fysiklabbet (AI-genererad)",
    tags: ["energi", "solenergi", "konstgjord fotosyntes", "termodynamik", "solbränsle"],
    sources: [
      { name: "ScienceDaily", url: "https://www.sciencedaily.com/releases/2026/06/260611024601.htm" },
      { name: "EurekAlert", url: "https://www.eurekalert.org/news-releases/1131391" }
    ],
    research: {
      citation: "Y. Matsubara, H. Kawakami, Y. Kajita, Y. Amao, ”Chemical maximum-power-point tracking system for stabilized liquid solar-fuel production”, EES Solar (2026)",
      url: "https://doi.org/10.1039/D5EL00177C"
    },
    body: [
      { type: "p", html: "Växterna har gjort det i miljarder år: fångat solljus och förvandlat vatten och koldioxid till energirikt bränsle. Att härma det konststycket — <em>konstgjord fotosyntes</em> — är en dröm för alla som vill lagra solenergi som kemiskt bränsle i stället för i tunga batterier. Bränsle går att lagra länge, transportera och tanka, precis som vi redan gör med bensin." },
      { type: "h2", text: "Problemet med en nyckfull sol" },
      { type: "p", html: "En hake har varit att solen är ombytlig. Ett moln drar förbi, ljuset dippar, och en solcell som driver en kemisk reaktion hamnar genast i otakt. En solcell levererar nämligen mest effekt i en alldeles bestämd ”arbetspunkt”, och glider den ur den punkten sjunker verkningsgraden snabbt. Hittills har man behövt batterier, omvandlare och särskild styrelektronik för att hålla cellen rätt — dyrt och krångligt." },
      { type: "p", html: "Teamet vid Osaka Metropolitan University löste det med en elektrolysör som reglerar sig själv. När den värms upp ändrar den sina egna elektriska egenskaper på ett sätt som automatiskt håller solcellen kvar i sin bästa arbetspunkt — den jagar alltså den optimala punkten med hjälp av kemin i stället för elektronik. Apparaten omvandlar koldioxid och vatten till myrsyra, ett flytande bränsle, och håller produktionen jämn även när ljuset skiftar. Resultaten publicerades i tidskriften <em>EES Solar</em>." },
      { type: "h2", text: "Vad ska man med myrsyra till?" },
      { type: "p", html: "Myrsyra kan användas som flytande bränsle, men ses framför allt som en lovande <em>vätebärare</em> — ett säkert och behändigt sätt att lagra och frakta vätgas i flytande form. Att det fungerar i praktiken visade forskarna under världsutställningen Expo 2025 i Osaka, där systemet tillverkade tillräckligt med myrsyra för att driva en liten modell-diorama på plats." },
      { type: "h2", text: "Varför är det smart?" },
      { type: "p", html: "Genom att bygga in regleringen direkt i kemin blir hela systemet enklare, billigare och tåligare — färre dyra komponenter som kan gå sönder. Det är ett litet men elegant steg mot målet att kunna tanka framtiden med ingenting annat än solljus, luft och vatten." },
      { type: "fact", title: "Visste du?", items: [
        "Myrsyran som apparaten tillverkar finns på riktigt i myror — det är delvis därför ett myrbett svider.",
        "I fotosyntesen lagras egentligen solljusets energi i molekylernas kemiska bindningar — samma grundidé som ett laddat batteri, fast i molekylform.",
        "Att hålla en solcell i dess bästa arbetspunkt kallas på engelska maximum power point tracking — här sköts det av kemin själv i stället för av elektronik."
      ]}
    ]
  }
];

/*
 * Datumgrind (schemalagd publicering).
 * Artiklar med ett FRAMTIDA datum ligger redan i listan men visas inte
 * förrän deras datum har inträffat enligt besökarens lokala klocka. Det gör
 * att man kan förbereda flera dagars nyheter i förväg, committa/pusha dem en
 * gång, och låta var och en "aktiveras" automatiskt på sitt datum — utan att
 * något behöver köras lokalt (sidan ligger statiskt på GitHub Pages).
 *
 * window.NYHETER       = endast publicerade artiklar (det konsumenterna läser)
 * window.NYHETER_ALL   = hela listan inkl. framtida (för verktyg/förhandsvisning)
 */
(function () {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  const nowStamp = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate())
    + 'T' + p(d.getHours()) + ':' + p(d.getMinutes());
  window.NYHETER_ALL = NYHETER_ALL;
  // ISO-strängar (ÅÅÅÅ-MM-DDTHH:MM) → lexikografisk jämförelse = kronologisk.
  // Valfritt fält `time: "HH:MM"` per artikel = publiceringsklockslag på
  // publiceringsdagen (utelämnat → midnatt, som tidigare).
  window.NYHETER = NYHETER_ALL.filter((a) => (a.date + 'T' + (a.time || '00:00')) <= nowStamp);
})();
