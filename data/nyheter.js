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
 *   title     – rubrik (svensk meningsform, inte title case)
 *   deck      – ingress (1–2 meningar, sammanfattar nyheten)
 *   category  – ett ord, t.ex. "Partikelfysik", "Kosmologi", "Kvantfysik"
 *   readingTime – t.ex. "4 min"
 *   image     – sökväg till bild (nyheter/bilder/…)
 *   imageAlt  – alt-text
 *   imageCredit – bildkälla/licens ELLER "Illustration: Fysiklabbet (AI-genererad)"
 *   tags      – array med nyckelord (gemener)
 *   sources   – array av { name, url } (nyhetskällor, ALLTID minst en)
 *   research  – { citation, url } direktlänk till originalforskningen (om möjlig), annars null
 *   body      – array av block:
 *                 { type: 'p',    html: '…' }   stycke (inline-HTML: <em>, <a>, &nbsp; ok)
 *                 { type: 'h2',   text: '…' }   mellanrubrik
 *                 { type: 'quote',html: '…', cite: '…' }
 *                 { type: 'fact', title: '…', items: ['…', …] }   faktaruta
 */
window.NYHETER = [
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
      { type: "p", html: "Just medan du läser den här meningen susar omkring hundra biljoner neutriner rakt genom din tumnagel. De bryr sig inte det minsta om dig — eller om jorden, för den delen. De allra flesta passerar tvärs igenom hela planeten utan att ens nudda en enda atom. Neutrinen är universums mest asociala partikel, och just därför en av de allra svåraste att studera." },
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
      { type: "p", html: "Neutriner och standardmodellen hör hemma i den moderna fysiken i Fysik 2 — och energinivåer, fotoner och atomkärnor som du möter där är samma värld som JUNO utforskar på allra minsta skala." }
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
      { type: "p", html: "Hur ström möter motstånd i vanliga ledare hör hemma i ellära — det kan du utforska i Fysiklabbets ellära-simuleringar, där en supraledare vore specialfallet ”noll resistans”." }
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
      { type: "p", html: "Kvantfysikens grunder — att ljus och materia uppträder som både vågor och partiklar — möter du i Fysik 2. Testa gärna Fysiklabbets simulering av den fotoelektriska effekten." }
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
      { type: "p", html: "Standardmodellen är fysikens bästa karta över materiens minsta byggstenar och de krafter som binder dem samman. Den siffra man oftast får höra är <strong>17</strong>: tolv materiepartiklar (elektron, myon, tau, tre sorters neutriner och sex kvarkar), fyra kraftbärare (foton, W, Z och gluon) — och så Higgspartikeln på toppen." },
      { type: "h2", text: "Materia och krafter" },
      { type: "p", html: "De tolv materiepartiklarna kallas <em>fermioner</em>. Vardagsmaterien är egentligen ganska enkel: protoner och neutroner är byggda av upp- och nedkvarkar, och runt atomkärnan kretsar elektroner. Resten — myoner, tau och de tyngre kvarkarna — är instabila kusiner som mest dyker upp i partikelacceleratorer och i kosmisk strålning. Kraftbärarna kallas <em>bosoner</em>: fotonen förmedlar elektromagnetismen, gluonen den starka kärnkraften, och W och Z den svaga kraften. Higgspartikeln är speciell — det är växelverkan med Higgsfältet som ger de övriga partiklarna deras massa." },
      { type: "h2", text: "Men sen blir det krångligt" },
      { type: "p", html: "Räkneövningen ser enkel ut, men den skenar snabbt iväg. För varje partikel finns en antipartikel — vips är vi uppe i 30. Gluonen visar sig dessutom vara inte en utan åtta, var och en med sin egen kombination av ”färgladdning” (den starka kraftens motsvarighet till elektrisk laddning) — 37. Varje kvark finns i sin tur i tre färger — 61. Räknar man även in att partiklar kan vara vänster- eller högerhänta, och kraftbärarnas olika polarisationer, landar man på 118." },
      { type: "p", html: "Och vill man vara riktigt petig och räkna kvantfältens ”frihetsgrader” — för i grunden är partiklar bara små krusningar i underliggande fält som fyller hela rymden — spottar matematiken ur sig det underbart absurda svaret <strong>995,5</strong>. Ja, en halv. Eller som essäns författare Natalie Wolchover sammanfattar det hela: kvantfältteori är ”obegripligt svårt”." },
      { type: "h2", text: "Vem bryr sig om exakt antal?" },
      { type: "p", html: "Poängen är inte att fastna vid en siffra, utan att se hur djupt naturens skenbara enkelhet vilar på något betydligt mer mångbottnat. Frågan ”hur många?” tvingar fram följdfrågan ”vad menar vi egentligen med <em>en partikel</em>?” — och just där, i glappet mellan vår vardagsbild av små kulor och kvantfältteorins verklighet, börjar den riktigt intressanta fysiken." },
      { type: "fact", title: "Standardmodellen i korthet", items: [
        "12 materiepartiklar (fermioner) + 4 kraftbärare (bosoner) + Higgs = 17.",
        "Higgspartikeln, som ger de andra partiklarna deras massa, bekräftades vid CERN 2012.",
        "Materia och antimateria förintar varandra vid kontakt och blir ren energi — därför är antimateria så svårt att lagra.",
        "Gravitationen saknas helt i standardmodellen — hur den passar in är en av fysikens största olösta gåtor."
      ]},
      { type: "p", html: "Materiens minsta byggstenar och atomkärnans inre hör till den moderna fysiken i Fysik 2 — samma kärnfysik som möter dig i Fysiklabbets simuleringar om sönderfall och energinivåer." }
    ]
  },

  {
    id: "2026-06-14-mork-energi",
    date: "2026-06-14",
    title: "Mörk energi överlever attacken — universum fortsätter accelerera",
    deck: "Förra året hävdade en uppmärksammad studie att den mörka energin kanske var en synvilla. Nu har två Nobelpristagare granskat siffrorna — och hittat två rejäla räknefel.",
    category: "Kosmologi",
    readingTime: "6 min",
    image: "nyheter/bilder/2026-06-14-mork-energi.jpg",
    imageAlt: "Kosmisk visualisering av ett accelererande, expanderande universum där galaxer glider isär över ett rutnät av rymdtid som sträcks ut.",
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
      { type: "p", html: "Hur ljus och våglängder avslöjar vilka ämnen som finns kan du utforska i Fysiklabbets simuleringar om spektrallinjer och emissionsspektrum." }
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
