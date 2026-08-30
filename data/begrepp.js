/*
 * Fysiklabbet — Begreppsordlista (dataset).
 *
 * Exponerar window.BEGREPP: en array av begreppsposter. Renderas av
 * begrepp.html (hela listan i bokstavsordning, ankare per begrepp) och
 * används av nyheter.html för att AUTOMATISKT göra första förekomsten av
 * varje begrepp i en artikel klickbar (Wikipedia-stil, med popover).
 *
 * Länkningen är helt automatisk: lägg till en post här, så blir begreppet
 * klickbart i ALLA artiklar (även gamla) nästa gång de visas. Skriv alltså
 * ALDRIG manuella <a href="begrepp.html#…">-länkar i artikeltexterna.
 *
 * Fält per post:
 *   id         – unik slug i a–z, 0–9 och bindestreck (blir ankaret
 *                begrepp.html#<id>); å/ä/ö skrivs a/a/o ("mork-energi")
 *   term       – uppslagsordet som det visas (versal första bokstav,
 *                aldrig title case)
 *   former     – ALLA böjningsformer/varianter som ska kännas igen i
 *                artiklarna, i gemener. Flerordsuttryck är ok
 *                ("mörk energi"). Matchningen sker på hela ord (aldrig
 *                inuti sammansättningar), så lista både grundform,
 *                bestämd form, plural och vanliga sammansättningar som
 *                bör länkas ("kristallgittret").
 *   kort       – 1–2 meningar som sammanfattar begreppet. Visas i
 *                popovern i artiklarna och som ingress i ordlistan.
 *   relaterade – (valfri) array av id:n till besläktade begrepp;
 *                visas som "Se även"-länkar.
 *   body       – array av block, samma typer som i data/nyheter.js:
 *                  { type: 'p',    html: '…' }   stycke (inline-HTML ok)
 *                  { type: 'h2',   text: '…' }   mellanrubrik
 *                  { type: 'fact', title: '…', items: ['…', …] }
 *
 * ⚠️ REN TEXT kontra HTML — den vanligaste fällan:
 *   `term`, `kort`, h2-blockens `text` och faktarutans `title` renderas som
 *   REN TEXT (React-textbarn; popovern sätter dem med textContent). Skriver
 *   du HTML där syns den bokstavligt på skärmen — "9,46&nbsp;·&nbsp;10<sup>12</sup>&nbsp;km".
 *   Använd literalt hårt mellanslag (U+00A0) i stället för &nbsp;, och skriv
 *   om exponenter i ord ("knappt tio biljoner kilometer").
 *   Bara p-blockens `html` och faktarutans `items` renderas som HTML — där
 *   hör <em>, <sup>, &nbsp; och länkar hemma. Ingen KaTeX finns på sidan, så
 *   math-block ($x$) fungerar ingenstans. Validatorn kontrollerar detta.
 *
 * Skrivregler (utöver typografireglerna i CLAUDE.md):
 *   – Målgrupp: gymnasieelever. Begreppen ligger ofta ÖVER gymnasienivå —
 *     förklara dem enklare, utförligare och mer pedagogiskt än artikeln
 *     hann göra. Konkreta vardagsjämförelser är guld.
 *   – Varje post ska stå på egna ben (ingen hänvisning till kurser
 *     eller specifika nyhetsartiklar — sidan listar själv var begreppet
 *     förekommer).
 *   – Ordningen i filen kvittar: begrepp.html sorterar alfabetiskt.
 *   – HTML-kontext: exponenter som 10<sup>−9</sup> (äkta minus U+2212),
 *     &nbsp; mellan tal och enhet, kommatecken som decimalavskiljare.
 */
// Tilldelas direkt till window (ingen global `const BEGREPP`) — annars
// krockar filen med sidor som själva vill deklarera en variabel med det
// namnet, och webbläsaren avbryter med "Identifier has already been declared".
window.BEGREPP = [
  {
    id: 'vakuumfluktuation',
    term: 'Vakuumfluktuation',
    former: ['vakuumfluktuation', 'vakuumfluktuationen', 'vakuumfluktuationer', 'vakuumfluktuationerna', 'nollpunktssvängning', 'nollpunktssvängningar', 'nollpunktssvängningarna', 'nollpunktsfluktuation', 'nollpunktsfluktuationer', 'kvantvakuum', 'kvantvakuumet', 'virtuell partikel', 'virtuella partiklar', 'virtuella partiklarna', 'virtuell foton', 'virtuella fotoner'],
    kort: 'Den darrning som finns kvar i ett elektromagnetiskt fält även när all energi tagits bort. Tomrummet är därför aldrig helt stilla, och darrningen ger mätbara effekter på atomer och material.',
    relaterade: ['kvantelektrodynamik', 'casimireffekten', 'absoluta-nollpunkten', 'foton'],
    body: [
      { type: 'p', html: 'Ta bort all materia ur en låda, kyl den till absoluta nollpunkten och släck allt ljus. Enligt klassisk fysik borde det elektromagnetiska fältet inuti då vara exakt noll och stå exakt stilla. Kvantmekaniken tillåter inte det. Heisenbergs obestämdhetsrelation säger att ett fält inte samtidigt kan ha ett bestämt värde och en bestämd förändringstakt, och därför finns alltid en rest kvar: fältet darrar lite, hur mycket man än försöker lugna ner det. Darrningen kallas vakuumfluktuationer, eller nollpunktssvängningar eftersom den finns kvar i systemets lägsta energitillstånd.' },
      { type: 'p', html: 'I kvantelektrodynamiken beskrivs samma sak med ett annat ordval: par av partiklar och antipartiklar bildas ur ingenting, lever en ofattbart kort stund och försvinner igen. De kallas virtuella, eftersom de aldrig kan fångas in och mätas var för sig — de dyker bara upp som mellansteg i räkningen. De två beskrivningarna är samma fysik sedd från två håll.' },
      { type: 'p', html: 'Att detta inte bara är bokföring märks på tre klassiska mätningar. En atom som lyfts till ett högre energitillstånd faller ner igen även i kompakt mörker, och det är fluktuationerna som sätter i gång fallet. Två speglar några nanometer från varandra dras ihop, eftersom vissa svängningar inte får plats i springan mellan dem. Och väteatomens energinivåer ligger en aning fel jämfört med vad en teori utan fluktuationer förutsäger — en skillnad som mättes 1947 och blev startskottet för hela kvantelektrodynamiken.' }
    ]
  },
  {
    id: 'casimireffekten',
    term: 'Casimireffekten',
    former: ['casimireffekten', 'casimireffekt', 'casimirkraften', 'casimirkraft'],
    kort: 'Två speglar som placeras mycket nära varandra dras ihop av en kraft, trots att ingenting finns emellan dem. Kraften kommer av att bara vissa av vakuumets svängningar får plats i springan.',
    relaterade: ['vakuumfluktuation', 'kvantelektrodynamik', 'nanoskala'],
    body: [
      { type: 'p', html: 'Ställ två blanka metallplattor parallellt, någon tiondels mikrometer från varandra, i ett tomrum. Då börjar de dras mot varandra, utan att någon laddning, magnetism eller gravitation värd att tala om är inblandad. Effekten förutsades 1948 av nederländaren Hendrik Casimir och kunde mätas med god noggrannhet först 1997, eftersom kraften är minimal och avstånden måste hållas otroligt jämna.' },
      { type: 'p', html: 'Förklaringen liknar den för en gitarrsträng. En sträng som är fastspänd i båda ändar kan bara svänga med vissa våglängder — de som råkar passa mellan fästpunkterna. På samma sätt kan bara vissa av tomrummets egna svängningar få plats mellan två speglar, medan alla svängningar finns utanför. Det blir alltså trängre inne i springan än utanför, och skillnaden trycker ihop plattorna. Ju närmare de kommer, desto färre svängningar ryms och desto hårdare trycker omgivningen.' },
      { type: 'p', html: 'Kraften är svag men inte oviktig. På de avstånd som gäller inuti mycket små mekaniska konstruktioner kan den få rörliga delar att fastna mot varandra, vilket är ett verkligt bekymmer för mikroskopiska maskiner. Med rätt val av material och omgivning går kraften i vissa fall att vända från dragande till stötande, och just den möjligheten gör den intressant som ett handtag att styra saker med på nanometerskala.' }
    ]
  },
  {
    id: 'kavitet',
    term: 'Kavitet',
    former: ['kavitet', 'kaviteten', 'kaviteter', 'kaviteterna', 'mörk kavitet', 'resonator', 'resonatorn', 'ringresonator', 'ringresonatorn', 'terahertzresonator', 'terahertzresonatorn'],
    kort: 'Ett litet inneslutet utrymme mellan speglar eller metallytor där bara vissa våglängder passar in. Kaviteten bestämmer därmed vilka elektromagnetiska svängningar som alls kan finnas i den.',
    relaterade: ['vakuumfluktuation', 'laser', 'metamaterial', 'terahertzstralning'],
    body: [
      { type: 'p', html: 'En kavitet är i sin enklaste form två speglar som vänder mot varandra. En ljusvåg som studsar fram och tillbaka mellan dem förstärker sig själv bara om den passar jämnt in i mellanrummet; alla andra våglängder släcker ut sig själva efter några varv. Kaviteten fungerar därför som ett urval: den plockar ut ett fåtal tillåtna svängningar ur alla tänkbara. Samma princip finns i ett blåsinstrument, där rörets längd avgör vilken ton som byggs upp.' },
      { type: 'p', html: 'Kaviteter behöver inte se ut som speglar. En metallring med ett litet gap i fungerar som en svängningskrets i miniatyr: strömmen går runt ringen och laddningen samlas i gapet, och ringens storlek bestämmer vilken frekvens som resonerar. Sådana ringar tillverkas mikrometersmå och används i området mellan mikrovågor och infrarött ljus, där vanliga speglar är opraktiska.' },
      { type: 'p', html: 'Det subtila är att en kavitet gör skillnad även när ingenting lyser i den. Eftersom tomrummet självt darrar, och kaviteten bestämmer vilka svängningar som får finnas, ändras också darrningens styrka och fördelning. Ett material som läggs inne i en kavitet möter alltså en annan elektromagnetisk omgivning än utanför — utan att någon energi tillförts. Kaviteter används annars framför allt i lasrar, i optiska klockor och som minne för enskilda fotoner i kvantoptiken.' }
    ]
  },
  {
    id: 'vagfunktion',
    term: 'Vågfunktion',
    former: ['vågfunktion', 'vågfunktionen', 'vågfunktioner', 'vågfunktionerna'],
    kort: 'Den matematiska våg som beskriver en partikel i kvantmekaniken. Kvadraten på dess belopp talar om hur sannolikt det är att hitta partikeln på ett visst ställe.',
    relaterade: ['kvantmekanik', 'molekylorbital', 'tunneleffekt'],
    body: [
      { type: 'p', html: 'En fotboll har en plats. Frågar man var den är finns det ett svar, oavsett om någon tittar. En elektron fungerar inte så. Det närmaste en beskrivning man kommer är en våg som är utsmetad över ett område i rummet, och den vågen kallas vågfunktion. Den skrivs oftast med den grekiska bokstaven psi.' },
      { type: 'p', html: 'Vågfunktionen i sig är inte något man kan se. Det man kan mäta är sannolikheten att hitta partikeln på ett visst ställe, och den fås genom att kvadrera vågfunktionens belopp. Där vågen är stor är chansen god, där den är noll dyker partikeln aldrig upp. Ett viktigt drag är att vågfunktionen kan vara både positiv och negativ. Möts två delar med olika tecken tar de ut varandra, precis som två vattenvågor som möts i motfas — och det är den mekanismen som avgör vilka kemiska bindningar som håller och vilka som inte gör det.' },
      { type: 'p', html: 'Hur vågfunktionen ser ut och hur den ändrar sig med tiden bestäms av Schrödingerekvationen, uppställd 1926. Att lösa den exakt går bara för de allra enklaste systemen, som en enda elektron kring en väteatomkärna. För allt större får man räkna ungefärligt med dator. Vad vågfunktionen egentligen ÄR — en verklig sak eller bara ett räkneverktyg som beskriver vår kunskap — är fysiker fortfarande oense om, hundra år efter att ekvationen skrevs ned.' }
    ]
  },
  {
    id: 'molekylorbital',
    term: 'Molekylorbital',
    former: ['molekylorbital', 'molekylorbitalen', 'molekylorbitaler', 'molekylorbitalerna', 'orbital', 'orbitalen', 'orbitaler', 'orbitalerna', 'elektronmoln', 'elektronmolnet'],
    kort: 'Det område kring en molekyl där en viss elektron håller till, beskrivet som en våg med både positiva och negativa delar.',
    relaterade: ['vagfunktion', 'kvantmekanik', 'halvledare'],
    body: [
      { type: 'p', html: 'I en ensam atom håller elektronerna till i skal och underskal — de klotformade, hantelformade och klöverbladsformade områden som brukar ritas i kemiboken. Sådana områden kallas orbitaler. Ordet är en rest från tiden då man trodde att elektronen gick i bana kring kärnan; i dag betyder det inte en bana utan ett moln, ett område där elektronen kan påträffas.' },
      { type: 'p', html: 'När atomer binder ihop sig till en molekyl smälter deras orbitaler samman till nya, gemensamma. En sådan sträcker sig över flera atomer på en gång, och elektronen tillhör då molekylen snarare än någon enskild atomkärna. Bilderna av dem är färgade i två toner, ofta rött och blått. Färgerna är inte laddning utan tecken: den underliggande vågen är positiv i de röda delarna och negativ i de blåa, och gränsen däremellan är ett område där elektronen aldrig hamnar.' },
      { type: 'p', html: 'De två intressantaste orbitalerna i en molekyl är den högsta som faktiskt rymmer elektroner och den lägsta som står tom. Det är mellan dem det händer saker: absorberar molekylen ljus flyttas en elektron från den ena till den andra, och avståndet i energi mellan dem avgör vilken färg ämnet har, hur lätt det reagerar och hur väl det leder ström. Därför är orbitalernas form långt ifrån en teoretisk kuriositet — den styr både färgämnen, solceller och organisk elektronik.' }
    ]
  },
  {
    id: 'fasproblem',
    term: 'Fasproblemet',
    former: ['fasproblem', 'fasproblemet'],
    kort: 'Svårigheten att en detektor bara kan mäta en vågs styrka, inte om den är positiv eller negativ — och att ungefär halva informationen därmed går förlorad i mätningen.',
    relaterade: ['vagfunktion', 'diffraktion', 'koherens'],
    body: [
      { type: 'p', html: 'Vill man veta hur atomerna sitter i ett kristallkorn eller hur en elektron är fördelad i en molekyl skickar man in strålning och mäter vad som kommer ut åt olika håll. Det man får är ett mönster av ljusa och mörka fläckar. Matematiskt är det mönstret en så kallad fouriertransform av det man söker: samma information, sedd från ett annat håll, och den går i princip att räkna tillbaka.' },
      { type: 'p', html: 'Problemet är att en detektor räknar partiklar eller mäter intensitet, och intensiteten är vågens styrka i kvadrat. Kvadreringen slänger bort tecknet. Var vågen positiv eller negativ när den träffade — låg den i takt med grannen eller i motfas? Den upplysningen, vågens fas, finns inte i mätvärdet. Ungefär hälften av det man behöver för att räkna tillbaka är alltså borta i samma ögonblick som mätningen görs. Det är fasproblemet.' },
      { type: 'p', html: 'Utvägen är att lägga till kunskap man har av andra skäl: föremålet har en viss storlek, det kan inte vara negativt där det ska vara tomt, det har en känd symmetri. En dator kan då gissa en fas, räkna fram vad den skulle ge för mätning, jämföra med den verkliga och justera — om och om igen tills det stämmer. Sådana metoder gav nobelpriset i kemi 1985 och är i dag ryggraden i allt från proteinkristallografi till avbildning av enskilda elektronmoln.' }
    ]
  },
  {
    id: 'hogharmonisk-generering',
    term: 'Högharmonisk generering',
    former: ['högharmonisk generering', 'högharmonisk', 'högharmoniska', 'högharmoniskt', 'övertonsgenerering'],
    kort: 'Ett sätt att göra extremt kortvågigt ljus genom att skjuta en stark laserpuls in i en gas, som svarar med att sända ut ljus med många gånger den ursprungliga frekvensen.',
    relaterade: ['laser', 'foton', 'vaglangd'],
    body: [
      { type: 'p', html: 'En gitarrsträng som knäpps hårt låter inte bara i sin grundton utan också i övertoner — ljud med dubbla, tredubbla och femdubbla frekvensen. Ljus kan bete sig likadant, men det krävs våld för att få det dit. Fokuserar man en tillräckligt kraftig laserpuls in i en tunn stråle av ädelgas blir det elektriska fältet i pulsen jämförbart med det fält som håller fast elektronerna i atomen.' },
      { type: 'p', html: 'Då händer följande, gång på gång under varje svängning: fältet sliter loss en elektron ur atomen, drar i väg den ett stycke, vänder och slungar tillbaka den mot sin egen atomkärna. I krocken lämnas den upptagna energin ifrån sig som en enda foton — med tiotals eller hundratals gånger laserns ursprungliga frekvens. Ut kommer ultraviolett ljus och mjuk röntgen, långt kortvågigare än något material kan lasa fram direkt.' },
      { type: 'p', html: 'Två saker gör tekniken värdefull. Dels får man kortvågigt ljus på ett laboratoriebord i stället för i en acceleratorring stor som ett kvarter. Dels blir pulserna ofattbart korta — ner till attosekunder, alltså miljarddels miljarddels sekunder, vilket är kort nog för att följa hur en elektron rör sig inne i en atom. Just den bedriften belönades med nobelpriset i fysik 2023.' }
    ]
  },
  {
    id: 'elektronmikroskop',
    term: 'Elektronmikroskop',
    former: ['elektronmikroskop', 'elektronmikroskopet', 'elektronmikroskopen',
             'elektronmikroskopi', 'elektronmikroskopin', 'elektronmikroskopet',
             'transmissionselektronmikroskop', 'transmissionselektronmikroskopet',
             'kryoelektronmikroskopi', 'kryoelektronmikroskopin', 'svepelektronmikroskop',
             'svepelektronmikroskopet', 'stråldos', 'stråldosen'],
    kort: 'Ett mikroskop som avbildar med elektroner i stället för ljus. Eftersom en snabb elektron uppträder som en våg med extremt kort våglängd kan den visa detaljer ända ner på atomnivå.',
    relaterade: ['kvantmekanik', 'nanoskala'],
    body: [
      { type: 'p', html: 'Ett vanligt ljusmikroskop tar slut vid ungefär en halv mikrometer. Skälet är inte att linserna är dåliga, utan att ljuset är en våg: detaljer som är mycket mindre än våglängden böjer vågen helt enkelt av sig runt, och de suddas ut. Synligt ljus har en våglängd kring 500&nbsp;nm, vilket är tusen gånger grövre än en enskild molekyl.' },
      { type: 'p', html: 'Elektroner löser problemet, eftersom även de är vågor. Våglängden hos en partikel blir kortare ju större rörelsemängden är, så en elektron som accelererats genom hundra tusen volt får en våglängd på några pikometer — mindre än en atom. I ett elektronmikroskop skjuts en sådan stråle genom eller mot provet, och i stället för glaslinser böjs strålen av magnetiska spolar. Bilden fångas till sist upp av en detektor, eftersom ögat inte kan se elektroner.' },
      { type: 'p', html: 'Det stora hindret är att elektronerna inte bara tittar. Varje elektron som far genom provet kan slå loss elektroner ur molekylerna och bryta kemiska bindningar, så ett biologiskt prov tål bara en viss stråldos innan det förstörs. Därför fryser man ofta provet blixtsnabbt — kryoelektronmikroskopi — och nöjer sig med en brusig bild av mycket få elektroner, som sedan räknas ihop från tusentals likadana molekyler.' }
    ]
  },
  {
    id: 'standardkvantgransen',
    term: 'Standardkvantgränsen',
    former: ['standardkvantgränsen', 'standardkvantgräns', 'standardkvantgränser',
             'skottbrus', 'skottbruset', 'heisenbergskalning', 'heisenbergskalningen'],
    kort: 'Den brusgräns som gäller när varje partikel i en mätning räknas för sig: noggrannheten förbättras bara som roten ur antalet mätningar. Med sammanflätade sonder går gränsen att pressa förbi.',
    relaterade: ['kvantsammanflatning', 'kvantmekanik', 'foton'],
    body: [
      { type: 'p', html: 'Räkna regndroppar i en hink under en minut. Faller det i snitt hundra droppar blir det sällan exakt hundra — utfallet varierar med ungefär tio åt endera hållet, alltså roten ur hundra. Samma slumpmässiga skvalp finns i varje mätning som bygger på att räkna partiklar en och en: fotoner i en kamera, elektroner i ett mikroskop. Fysiker kallar det skottbrus.' },
      { type: 'p', html: 'Följden är en obeveklig växelkurs. Skickar man ett antal partiklar mot det man vill mäta växer signalen i takt med antalet, men bruset växer bara som roten ur antalet. Förhållandet dem emellan blir därför också roten ur antalet, vilket betyder att en dubbelt så noggrann mätning kostar fyra gånger så många partiklar. Den gränsen kallas standardkvantgränsen, och den är inget tecken på slarvig utrustning — den följer av att varje partikel behandlas som en oberoende mätning.' },
      { type: 'p', html: 'Men förutsättningen går att bryta. Om sonderna i stället sammanflätas, så att de bär ett enda gemensamt kvanttillstånd i stället för varsitt eget, kan bidragen läggas ihop koherent. I det idealiserade fallet förbättras noggrannheten då i takt med antalet i stället för med roten ur det, vilket brukar kallas heisenbergskalning. Tekniken används redan i gravitationsvågsdetektorer, där ljuset pressas ihop så att bruset flyttas till en storhet man inte bryr sig om, och prövas i atomklockor och magnetometrar.' }
    ]
  },
  {
    id: 'jonfalla',
    term: 'Jonfälla',
    former: ['jonfälla', 'jonfällan', 'jonfällor', 'jonfällorna', 'jonfälleteknik',
             'jonfälletekniken', 'jonfällebaserad', 'paulfälla', 'paulfällan',
             'paulfällor', 'ytelektrodfälla', 'ytelektrodfällan'],
    kort: 'En anordning som håller kvar enstaka laddade atomer mitt i ett vakuum med elektriska och magnetiska fält, utan att de rör någon vägg. Fångade joner används som qubitar i kvantdatorer och i världens noggrannaste klockor.',
    relaterade: ['penningfalla', 'kvantdator', 'hogladdad-jon'],
    body: [
      { type: 'p', html: 'En ensam jon går inte att förvara i en burk. Den skulle driva mot väggen, plocka upp en elektron och sluta vara en jon. Lösningen är att låta elektriska fält göra jobbet i stället för väggar. Problemet är bara att ett statiskt elektriskt fält aldrig kan hålla en laddning instängd åt alla håll samtidigt — pressas den ihop i två riktningar slipper den undan i den tredje.' },
      { type: 'p', html: 'Den vanligaste utvägen är att låta fältet växla. I en paulfälla byter det elektriska fältet riktning miljontals gånger i sekunden, så att jonen omväxlande pressas ihop och dras isär i olika riktningar. Sammantaget blir effekten en dragning inåt mot mitten, ungefär som en kula som hålls kvar mitt på en snurrande sadelformad yta. Den andra huvudtypen, penningfällan, använder i stället ett kraftigt magnetfält som tvingar jonen i cirkelbanor, plus elektroder i ändarna som stoppar den från att glida ut.' },
      { type: 'p', html: 'Väl fångad kan jonen kylas med laser tills den nästan står stilla, och sedan styras och läsas av med ljuspulser. Det gör fångade joner till ett av de mest utvecklade sätten att bygga qubitar: en enda atom, identisk med alla andra av sitt slag, som kan hållas i ett känt kvanttillstånd i minuter. Samma teknik ligger bakom de optiska klockor som går fel med mindre än en sekund under hela universums ålder.' }
    ]
  },
  {
    id: 'ramslapning',
    term: 'Ramsläpning',
    former: ['ramsläpning', 'ramsläpningen', 'lense-thirring-effekten', 'lense-thirringeffekten', 'gravitomagnetism', 'gravitomagnetismen', 'gravitomagnetisk', 'gravitomagnetiska'],
    kort: 'En roterande massa drar rumtiden runt omkring sig ett litet stycke med i rotationen, som en sked i honung. Effekten gör att banor och snurrande axlar i närheten långsamt vrids åt samma håll som massan roterar.',
    relaterade: ['relativitetsteori'],
    body: [
      { type: 'p', html: 'I Einsteins allmänna relativitetsteori är gravitation inte en kraft utan geometri: massa kröker rummet och tiden omkring sig. Men det räcker inte att veta hur tung en kropp är. Det spelar också roll om den <em>snurrar</em>. En roterande massa river med sig rumtiden en aning i sin egen rotationsriktning, ungefär som en sked som dras runt i en burk honung får honungen närmast skeden att följa med. Det är detta som kallas ramsläpning.' },
      { type: 'p', html: 'Namnet kommer av att det är själva referensramen — de riktningar man mäter mot — som släpas med. Ett gyroskop som hänger fritt i rymden ska enligt gammal fysik peka orubbligt mot samma avlägsna stjärna för alltid. Nära en roterande kropp gör det inte det: axeln vrids långsamt runt. Samma sak händer med en satellitbana, vars plan sakta vrids åt det håll planeten roterar. Kring jorden rör det sig om några hundradels bågsekunder per år, en så liten vinkel att det tog nästan hundra år från förutsägelsen 1918 till att den kunde mätas ordentligt.' },
      { type: 'p', html: 'Effekten kallas ibland gravitomagnetism, eftersom matematiken påminner slående om elläran: en elektrisk laddning som står stilla ger bara ett elektriskt fält, men sätter man den i rörelse tillkommer ett magnetfält. På samma sätt ger en massa i vila bara den vanliga gravitationen, medan en massa i rotation ger ett extra bidrag som saknas i Newtons beskrivning. Kring ett roterande svart hål blir bidraget så starkt att det finns ett område närmast hålet där ingenting alls kan stå stilla i förhållande till fjärran stjärnor, hur kraftigt det än motar emot.' }
    ]
  },
  {
    id: 'hornreflektor',
    term: 'Hörnreflektor',
    former: ['hörnreflektor', 'hörnreflektorn', 'hörnreflektorer', 'hörnreflektorerna', 'retroreflektor', 'retroreflektorn', 'retroreflektorer', 'retroreflektorerna', 'kubhörn', 'kubhörnet'],
    kort: 'Tre speglande ytor monterade som i ett kubhörn, vinkelrätt mot varandra. Ljus som träffar dem kastas tillbaka exakt samma väg som det kom, oavsett från vilket håll det kommer.',
    relaterade: [],
    body: [
      { type: 'p', html: 'En vanlig spegel kastar tillbaka ljuset så att infallsvinkeln blir lika stor som reflektionsvinkeln. Håller man den lite snett åker ljuset åt ett helt annat håll än det kom ifrån. En hörnreflektor löser det genom att sätta ihop tre speglande ytor vinkelrätt mot varandra, precis som de tre väggarna i ett kubhörn. En ljusstråle studsar då mot alla tre i tur och ordning, och det kan visas att strålen efter tredje studsen går tillbaka parallellt med den den kom in i — oavsett hur reflektorn är vriden.' },
      { type: 'p', html: 'Just okänsligheten för vinkel är hela poängen. Cykelreflexen på bakskärmen och de reflekterande punkterna i vägmarkeringar är fulla av små hörnreflektorer i plast, och därför lyser de upp när billyktorna träffar dem, hur bilen än står. Samma sak gäller reflexvästen: den kastar tillbaka ljuset mot föraren i stället för att sprida det åt alla håll.' },
      { type: 'p', html: 'Inom forskningen används de för att mäta avstånd med laser. Geodetiska satelliter är helt täckta av hörnreflektorer av glas, så att ett teleskop på marken kan skicka en kort laserpuls mot dem och få tillbaka ett eko. Ur tiden fram och åter beräknas avståndet, ofta med millimeternoggrannhet. Apollo-besättningarna och de sovjetiska Lunochod-farkosterna ställde upp likadana reflektorpaneler på månen, och de träffas fortfarande av laser från jorden — det är så man vet att månen avlägsnar sig omkring 3,8&nbsp;cm om året.' }
    ]
  },
  {
    id: 'bagsekund',
    term: 'Bågsekund',
    former: ['bågsekund', 'bågsekunden', 'bågsekunder', 'bågsekunderna', 'bågminut', 'bågminuten', 'bågminuter', 'millibågsekund', 'millibågsekunden', 'millibågsekunder', 'millibågsekunderna'],
    kort: 'Ett vinkelmått för mycket små vinklar: en bågsekund är 1/3600 grad. Astronomer anger positioner och skenbara storlekar på himlen i bågminuter, bågsekunder och tusendels bågsekunder.',
    relaterade: [],
    body: [
      { type: 'p', html: 'Ett varv är 360 grader, och en grad räcker långt när man mäter hörn i en triangel. På himlen är den däremot grov: fullmånen är bara ungefär en halv grad bred. Därför delas graden vidare på samma sätt som en timme delas i minuter och sekunder. En grad rymmer 60 bågminuter, och varje bågminut rymmer 60 bågsekunder. En bågsekund är alltså 1/3600 grad. Orden båg- finns med för att skilja vinkelmåtten från tidsenheterna.' },
      { type: 'p', html: 'Hur litet är det? En bågsekund är ungefär den vinkel ett tvåkronorsmynt upptar på knappt fem kilometers avstånd. Ett bra öga skiljer på sin höjd två punkter som ligger omkring 60 bågsekunder isär, och luftens oro gör att ett teleskop på marken sällan får skarpare bilder än en bågsekund utan särskilda knep. Rymdteleskop och radioteleskop som kopplas ihop över kontinenter kommer betydligt längre.' },
      { type: 'p', html: 'När det blir riktigt smått används tusendelar: en millibågsekund är 1/1000 bågsekund, alltså en 3,6-miljondels grad. I den storleksordningen ligger stjärnornas parallax, alltså den lilla förskjutning i skenbart läge som uppstår när jorden hinner till andra sidan av sin bana — och det är också i millibågsekunder per år man mäter hur satellitbanor vrids av relativistiska effekter.' }
    ]
  },
  {
    id: 'gravitationslinsning',
    term: 'Gravitationslinsning',
    former: ['gravitationslinsning', 'gravitationslinsningen', 'gravitationslins', 'gravitationslinsen', 'gravitationslinser', 'gravitationslinserna', 'gravitationslinseffekt', 'gravitationslinseffekten', 'svag gravitationslinsning', 'svaga gravitationslinsningen', 'stark gravitationslinsning', 'linsning', 'linsningen'],
    kort: 'Ljus som passerar nära en tung massa böjs av, så att bilden av det som ligger bakom förskjuts, dras ut eller dubbleras. Effekten gör det möjligt att väga massa som inte syns.',
    relaterade: ['mork-materia', 'galaxhop', 'relativitetsteori'],
    body: [
      { type: 'p', html: 'Ljus går den snabbaste vägen genom rummet — men rummet självt är krökt kring tunga föremål. Passerar en ljusstråle nära en stor massa följer den därför en böjd bana, precis som om den gått genom en glaslins. Ligger en tung galaxhop mellan oss och en avlägsen galax kommer galaxens ljus alltså fram till oss från lite fel håll, och bilden hamnar på fel plats, blir utdragen eller syns i flera exemplar samtidigt.' },
      { type: 'p', html: 'Hur kraftig effekten blir beror på hur mycket massa ljuset passerar och hur nära. I de mest spektakulära fallen — stark linsning — dras bakgrundsgalaxen ut till en lysande båge eller till och med en sluten ring runt den tunga hopen. Betydligt vanligare är svag linsning, där formen bara förvrängs med någon procent. Så små förändringar syns inte på en enskild galax, eftersom galaxer har vitt skilda former från början. Men mäter man tiotusentals galaxer i samma område och de visar sig luta systematiskt åt samma håll, går det att räkna ut hur mycket massa som ligger emellan.' },
      { type: 'p', html: 'Att effekten finns förutsades av Albert Einstein och bekräftades vid en solförmörkelse 1919, då stjärnor nära solskivan visade sig stå en aning fel. I dag är gravitationslinsning ett av de viktigaste verktygen inom astronomin — bland annat för att den mäter <em>all</em> massa, inte bara den som lyser, och därmed avslöjar var den mörka materien finns.' }
    ]
  },
  {
    id: 'rotationskurva',
    term: 'Rotationskurva',
    former: ['rotationskurva', 'rotationskurvan', 'rotationskurvor', 'rotationskurvorna', 'galaxrotation', 'galaxrotationen', 'platt rotationskurva', 'platta rotationskurvor'],
    kort: 'En graf över hur fort stjärnorna i en galax rör sig, ritad mot avståndet till galaxens mitt. Att kurvorna är platta är det klassiska skälet att tro på mörk materia.',
    relaterade: ['mork-materia', 'vintergatan'],
    body: [
      { type: 'p', html: 'I ett solsystem gäller en enkel regel: ju längre ut en planet ligger, desto långsammare rör den sig. Merkurius far fram i 47&nbsp;km/s medan Neptunus lunkar i 5,4&nbsp;km/s. Det följer direkt av gravitationslagen — nästan all massa sitter i mitten, i solen, och dess dragningskraft avtar med avståndet.' },
      { type: 'p', html: 'En galax borde bete sig ungefär likadant, eftersom både stjärnorna och ljuset tätnar kraftigt mot mitten. När astronomer på 1960- och 70-talen mätte farten hos gas och stjärnor allt längre ut i spiralgalaxer väntade de sig därför en kurva som stiger nära mitten och sedan sjunker utåt. Det de fick var en kurva som stiger — och sedan lägger sig platt, med i stort sett samma fart ända ut i utkanterna där knappt något ljus finns kvar.' },
      { type: 'p', html: 'En platt kurva betyder att massan innanför en stjärnas bana fortsätter växa ju längre ut man kommer, trots att ljuset tagit slut. Antingen fungerar gravitationen annorlunda på de här avstånden, eller så är galaxen omgiven av ett stort klot av materia som inte lyser. Den andra tolkningen har fått stöd från flera oberoende håll, och rotationskurvorna räknas i dag som det första riktigt svårslagna beviset för att universum innehåller mer massa än vi kan se.' }
    ]
  },
  {
    id: 'karnfusion',
    term: 'Kärnfusion',
    former: ['kärnfusion', 'kärnfusionen', 'fusion', 'fusionen', 'fusioner', 'fusionerna', 'fusionera', 'fusionerar', 'fusionerade', 'fusionsreaktion', 'fusionsreaktionen', 'fusionsreaktioner', 'fusionsreaktor', 'fusionsreaktorn', 'fusionsreaktorer', 'fusionskraft', 'fusionskraften', 'fusionshastighet', 'fusionshastigheten', 'vätefusion', 'vätefusionen', 'kall fusion', 'kalla fusionen'],
    kort: 'Två lätta atomkärnor slås samman till en tyngre, och en del av massan frigörs som energi. Det är kärnfusion som får solen och alla andra stjärnor att lysa.',
    relaterade: ['coulombbarriar', 'tunneleffekt', 'plasma', 'isotop'],
    body: [
      { type: 'p', html: 'Slår man ihop två lätta atomkärnor till en enda blir resultatet nästan alltid lite lättare än delarna var för sig. Den massa som ”försvinner” har inte försvunnit — den har blivit energi, enligt <em>E</em>&nbsp;=&nbsp;<em>m</em>&nbsp;·&nbsp;<em>c</em><sup>2</sup>. Eftersom ljushastigheten i kvadrat är ett gigantiskt tal räcker en försvinnande liten massförändring för att frigöra oerhört mycket energi. Ett gram väte som fusioneras till helium ger ungefär lika mycket energi som tio ton kol som brinner upp.' },
      { type: 'p', html: 'Haken är att kärnorna måste komma varandra oerhört nära innan sammanslagningen kan ske, och de är alla positivt laddade. Positiva laddningar stöter bort varandra, och avstötningen växer brant på korta avstånd. Därför krävs våldsamma förhållanden: i solens kärna är temperaturen omkring 15&nbsp;miljoner grader och trycket ofattbart högt, och materien är där ett plasma, alltså kärnor och elektroner som rör sig fritt från varandra. Även då är fusion en sällsynt händelse för den enskilda kärnan — solen är effektiv först för att den är enormt stor och har enormt gott om tid.' },
      { type: 'p', html: 'Att bygga en fusionsreaktor på jorden har visat sig svårare än man hoppades på 1950-talet. Det räcker inte att få reaktionerna att ske; man måste hålla kvar det urheta plasmat tillräckligt länge, med magnetfält eller med laserpulser, och få ut mer energi än man stoppar in. Lockelsen är att bränslet — deuterium ur havsvatten — finns i praktiskt taget obegränsad mängd, att processen inte kan skena, och att den inte ger något långlivat radioaktivt avfall av det slag som fission gör.' }
    ]
  },
  {
    id: 'coulombbarriar',
    term: 'Coulombbarriär',
    former: ['coulombbarriär', 'coulombbarriären', 'coulombbarriärer', 'coulombbarriärerna', 'coulombtröskel', 'coulombtröskeln'],
    kort: 'Den energitröskel två atomkärnor måste ta sig förbi för att komma tillräckligt nära varandra för att kunna reagera, eftersom de stöter bort varandra elektriskt hela vägen in.',
    relaterade: ['karnfusion', 'tunneleffekt', 'hogladdad-jon'],
    body: [
      { type: 'p', html: 'Alla atomkärnor är positivt laddade, och lika laddningar stöter bort varandra. Kraften följer Coulombs lag och växer som ett genom avståndet i kvadrat: halveras avståndet fyrdubblas avstötningen. Två kärnor som närmar sig varandra måste alltså arbeta allt hårdare ju längre in de kommer, ungefär som att cykla uppför en backe som blir brantare för varje meter.' },
      { type: 'p', html: 'Men riktigt nära, på ett avstånd av några få kärndiametrar, tar en annan kraft över: den starka kärnkraften, som drar kärnpartiklar till sig med väldig styrka men bara på extremt korta håll. Backen har alltså en topp och stupar sedan brant nedåt på andra sidan. Toppens höjd är coulombbarriären. För två vätekärnor ligger den kring några hundra tusen elektronvolt; för tunga kärnor med många protoner är den många gånger högre.' },
      { type: 'p', html: 'Det märkliga är att barriären inte är någon absolut spärr. Kvantmekaniken tillåter partiklar att ta sig igenom hinder de egentligen inte har råd med, och därför sker kärnreaktioner även vid energier långt under barriärens topp — bara mycket, mycket sällan. Ju lägre energi, desto mer osannolikt, och sambandet är exponentiellt: en halvering av energin kan göra reaktionen tusentals gånger ovanligare. Just den branta kurvan är kärnan i varför fusionsenergi är så svårt att få till på jorden.' }
    ]
  },
  {
    id: 'tunneleffekt',
    term: 'Tunneleffekt',
    former: ['tunneleffekt', 'tunneleffekten', 'tunnling', 'tunnlingen', 'kvanttunnling', 'kvanttunnlingen', 'tunnelsannolikhet', 'tunnelsannolikheten', 'tunnelchans', 'tunnelchansen', 'tunnla', 'tunnlar', 'tunnlade'],
    kort: 'Kvantfysikaliskt fenomen där en partikel tar sig igenom ett hinder som den enligt klassisk fysik inte har energi nog att ta sig över. Det är tunneleffekten som får solen att lysa.',
    relaterade: ['coulombbarriar', 'karnfusion', 'nanoskala'],
    body: [
      { type: 'p', html: 'Rulla en boll mot en kulle. Har den för lite fart rullar den en bit uppför och sedan tillbaka — den kommer aldrig över. Så fungerar vardagen. I kvantvärlden gäller inte riktigt det. En partikel har ingen skarpt bestämd plats utan beskrivs av en vågfunktion som är utsmetad i rummet, och den vågen dör inte tvärt vid hindrets kant. En liten del av den läcker igenom och fortsätter på andra sidan. Det betyder att partikeln ibland helt enkelt dyker upp bortom hindret, utan att någonsin ha befunnit sig på toppen.' },
      { type: 'p', html: 'Chansen är oftast försvinnande liten, och den beror mycket känsligt på hindrets höjd och bredd. Görs barriären bara något smalare kan tunnelsannolikheten öka med många tiopotenser. Därför är effekten helt obetydlig för en fotboll mot en vägg — där skulle man få vänta oändligt mycket längre än universums ålder — men helt avgörande på atomskalan, där hindren är tunna och partiklarna lätta.' },
      { type: 'p', html: 'Utan tunneleffekten skulle solen inte lysa: dess kärna är i själva verket för sval för att vätekärnor ska kunna ta sig över sin ömsesidiga avstötning, och det är tunnlandet som räddar situationen. Effekten förklarar också alfasönderfall, där en heliumkärna smiter ut ur en tung atomkärna som den borde vara instängd i. Och den används tekniskt: i sveptunnelmikroskopet mäts en ström av elektroner som tunnlar mellan en nålspets och en yta, en ström så känslig för avståndet att enskilda atomer kan avbildas.' }
    ]
  },
  {
    id: 'hogladdad-jon',
    term: 'Högladdad jon',
    former: ['högladdad jon', 'högladdade joner', 'högladdad', 'högladdade', 'högladdade jonen', 'högladdade jonerna'],
    kort: 'En atom som fått många eller rentav alla sina elektroner bortslitna och därför bär en kraftigt positiv laddning. De finns naturligt i solens yttre lager och tillverkas på konstgjord väg i acceleratorer och jonkällor.',
    relaterade: ['plasma', 'partikelaccelerator', 'penningfalla', 'kvantelektrodynamik'],
    body: [
      { type: 'p', html: 'En vanlig jon — natriumjonen i ett glas saltvatten — har tappat en enda elektron. En högladdad jon har tappat tio, tjugo eller i ytterlighetsfallet allihop, så att bara den nakna atomkärnan återstår. Skillnaden i svårighetsgrad är enorm. Att lossa den yttersta elektronen ur en atom kostar bara några få elektronvolt, men de innersta elektronerna sitter tätt intill kärnan och känner hela dess positiva laddning på nära håll. För ett tungt grundämne krävs tiotusentals gånger mer energi för att få loss dem.' },
      { type: 'p', html: 'Trots det är högladdade joner ingen laboratoriekuriositet — de dominerar universum. I solens korona, där temperaturen är någon miljon grader, har järnatomerna typiskt förlorat ett tiotal elektroner, och en av koronans karakteristiska gröna spektrallinjer kommer just från järn som saknar tretton elektroner. På jorden skapas de antingen i en jonkälla, där en tät elektronstråle slår bort en elektron i taget, eller genom att atomerna accelereras till nära ljushastigheten och skickas genom en tunn folie som sopar av elektronskalen.' },
      { type: 'p', html: 'Att fysiker gärna vill ha tag på dem beror på två saker. Dels är en kärna med bara en eller ingen elektron kvar det enklaste system som finns att räkna på, samtidigt som det elektriska fältet alldeles intill kärnan är ofattbart starkt — starkare än någon laser kan skapa. Dels bär jonen på en väldig lagrad energi: all den energi som gick åt för att slita bort elektronerna finns kvar tills jonen träffar en yta, då den töms på ett ögonblick i en volym på några nanometer. Den effekten går att använda för att mönstra material i mycket liten skala.' }
    ]
  },
  {
    id: 'penningfalla',
    term: 'Penningfälla',
    former: ['penningfälla', 'penningfällan', 'penningfällor', 'penningfällorna'],
    kort: 'En fälla som håller kvar laddade partiklar mitt i ett vakuum med hjälp av ett starkt magnetfält och ett elektriskt fält. Enstaka joner eller elektroner kan förvaras i månader och mätas med extrem noggrannhet.',
    relaterade: ['hogladdad-jon', 'partikelaccelerator', 'supraledare', 'antimateria'],
    body: [
      { type: 'p', html: 'Hur förvarar man en enda jon? Inte i en burk — den skulle genast driva mot en vägg, ta upp en elektron och sluta vara en jon. Lösningen är att låta fält göra jobbet i stället för väggar. Ett kraftigt magnetfält längs fällans axel tvingar varje laddad partikel att gå i cirkelbanor kring fältlinjerna, och därmed kan den inte ta sig ut åt sidorna.' },
      { type: 'p', html: 'Men magnetfältet räcker inte hela vägen. Den magnetiska kraften verkar alltid vinkelrätt mot rörelsen och kan därför aldrig bromsa en partikel som glider längs med fältlinjen — den skulle helt enkelt spiralera ut genom ändarna. Därför sätter man elektroder i vardera änden och laddar dem så att de stöter bort partikeln tillbaka in mot mitten. Magnetfältet håller den på plats i två riktningar, det elektriska fältet i den tredje, och tillsammans blir partikeln instängd utan att någonsin röra något fast.' },
      { type: 'p', html: 'Namnet kommer från den nederländske fysikern Frans Michel Penning, som använde samma kombination av fält i en vakuummätare. Hans Dehmelt byggde de första fällorna av den här typen och delade Nobelpriset i fysik 1989 för fälltekniken. I hans mest berömda experiment hölls en ensam elektron fångad i månader, vilket gjorde det möjligt att mäta elektronens magnetiska egenskaper med ett dussin korrekta decimaler. I dag används fällorna bland annat till att väga exotiska atomkärnor och till att förvara antimateria vid CERN.' }
    ]
  },
  {
    id: 'kvantelektrodynamik',
    term: 'Kvantelektrodynamik',
    former: ['kvantelektrodynamik', 'kvantelektrodynamiken'],
    kort: 'Teorin för hur ljus och elektriskt laddad materia växelverkar. Den beskriver den elektriska kraften som ett utbyte av fotoner och är den noggrannast prövade teori fysiken har.',
    relaterade: ['kvantmekanik', 'foton', 'standardmodellen', 'antimateria'],
    body: [
      { type: 'p', html: 'Coulombs lag säger att två laddningar drar eller stöter bort varandra på avstånd — men hur vet den ena laddningen att den andra finns där? Kvantelektrodynamikens svar är att de skickar fotoner mellan sig. Den elektriska kraften är helt enkelt ljuspartiklar som kastas fram och tillbaka. Fotonerna kallas virtuella, eftersom de aldrig går att fånga in och mäta; de dyker bara upp som mellansteg i räkningen. Två elektroner som studsar mot varandra gör det alltså inte genom något osynligt gummiband, utan genom ett utbyte.' },
      { type: 'p', html: 'En annan följd är att tomrummet inte är tomt. Partiklar och antipartiklar bubblar hela tiden upp ur vakuumet och försvinner igen innan de hunnit göra av sig. En elektron är därför alltid omgiven av ett myller av sådana kortlivade par, och myllret påverkar hur elektronen uppträder — mycket lite, men mätbart. Det är skälet till att elektronens magnetiska styrka inte är exakt 2, som en enklare teori förutsäger, utan 2,002 319 304 … Beräkningen och mätningen stämmer med varandra på över tio decimaler, vilket gör detta till den skarpaste jämförelsen mellan teori och experiment i hela naturvetenskapen.' },
      { type: 'p', html: 'Teorin fick sin färdiga form på 1940-talet genom Richard Feynman, Julian Schwinger och Sin-Itiro Tomonaga, som delade Nobelpriset 1965. Den fungerar lysande i de förhållandevis svaga elektriska fält vi normalt har omkring oss. Det som fortfarande är obeprövat är motsatta ytterligheten: alldeles intill en tung atomkärna är fältet av storleksordningen 10<sup>16</sup>&nbsp;volt per centimeter, långt bortom vad någon laser kan åstadkomma. Om teorin håller även där vet ingen säkert, och det är därför fysiker lägger ner så mycket möda på att fånga in tunga joner och mäta på dem.' }
    ]
  },
  {
    id: 'viskositet',
    term: 'Viskositet',
    former: ['viskositet', 'viskositeten', 'viskositeter', 'viskositeterna',
             'viskositetsvärde', 'viskositetsvärdet', 'viskositetsgräns',
             'viskositetsgränsen', 'viskositetsintervall', 'viskositetsintervallet',
             'pascalsekund', 'pascalsekunden', 'pascalsekunder'],
    kort: 'Ett mått på hur trögt ett ämne flyter — hur hårt det gör motstånd när skikten inuti det ska glida förbi varandra. Vatten har låg viskositet, honung hög och sten allra högst.',
    relaterade: ['turbulens', 'superfluid'],
    body: [
      { type: 'p', html: 'Rör om i ett glas vatten och skeden möter nästan inget motstånd. Rör om i sirap och du måste ta i. Skillnaden är viskositeten: vätskans inre friktion. Tänk dig vätskan som en trave spelkort. Drar du det översta kortet åt sidan följer kortet under med en aning, och kortet under det en aning mindre. Viskositeten talar om hur stark den kopplingen är — hur stor kraft per ytenhet som krävs för att få två intilliggande skikt att glida förbi varandra med en viss hastighetsskillnad. SI-enheten heter pascalsekund (Pa·s). Luft ligger på omkring 10<sup>−5</sup>&nbsp;Pa·s, vatten på 10<sup>−3</sup>&nbsp;Pa·s, olivolja kring 10<sup>−1</sup>&nbsp;Pa·s och honung runt 10&nbsp;Pa·s.' },
      { type: 'p', html: 'Motståndet kommer av att molekylerna hakar i varandra. I en vätska sitter de tätt och dras till varandra, och för att flyta måste de hela tiden lossa sitt grepp och ta nytt. Värmer man vätskan får molekylerna mer rörelseenergi, greppet lossnar lättare och viskositeten sjunker — därför rinner honung ur burken så mycket villigare efter en stund i varmt vatten. I en gas är det tvärtom. Där finns knappt några bindningar alls; motståndet uppstår i stället genom att snabba molekyler flyger mellan skikten och tar med sig rörelsemängd. Värmer man en gas flyger molekylerna fortare, blandningen går snabbare och viskositeten <em>ökar</em>. Varm luft är alltså trögare än kall.' },
      { type: 'p', html: 'Skalan är enorm. Från luftens 10<sup>−5</sup>&nbsp;Pa·s upp till de allra styvaste bergarterna spänner den över drygt trettio tiopotenser. Beck, det svarta materialet från tjärframställning, ligger kring 10<sup>8</sup>&nbsp;Pa·s: det går att slå sönder med en hammare, men i ett berömt försök i Australien har det droppat ur en tratt ungefär vart tionde år sedan 1927. Glaciäris hamnar på 10<sup>13</sup>–10<sup>17</sup>&nbsp;Pa·s och jordens mantel kring 10<sup>21</sup>&nbsp;Pa·s. Just därför är viskositet alltid knutet till en tidsskala: nästan allting flyter, om man bara har tålamod att vänta tillräckligt länge på det.' }
    ]
  },
  {
    id: 'subduktion',
    term: 'Subduktion',
    former: ['subduktion', 'subduktionen', 'subduktionszon', 'subduktionszonen',
             'subduktionszoner', 'subduktionszonerna', 'subducera', 'subducerar', 'subducerad'],
    kort: 'När en av jordens tektoniska plattor glider ner under en annan och sjunker in i manteln. Där bildas djuphavsgravar, vulkankedjor och de kraftigaste jordbävningarna.',
    relaterade: ['viskositet'],
    body: [
      { type: 'p', html: 'Jordens yttersta skal är inte ett enda stycke utan ett femtontal styva plattor som sakta glider omkring, ungefär lika fort som naglar växer — några centimeter om året. Eftersom jorden inte blir större måste det som skapas någonstans försvinna någon annanstans. Ny havsbottenplatta bildas längs de undervattensryggar där plattor dras isär, och den gamla plattan görs av med genom subduktion: den dyker ner under sin granne och sjunker in i manteln.' },
      { type: 'p', html: 'Vilken platta som åker ner avgörs av tätheten. Havsbottenplattor består av tyngre bergarter än kontinenterna och blir dessutom kallare och tätare med åldern, så det är i stort sett alltid havsbottnen som förlorar. På havsytan syns nedgången som en djuphavsgrav — Marianergraven, jordens djupaste punkt på nästan elva kilometer, är just en sådan. Med sig ner tar plattan vatten som suttit bundet i bergarterna. Vattnet pressas ut på djupet och sänker smältpunkten hos berget ovanför, som delvis smälter och stiger upp. Det är därför vulkankedjor som Andernas och Japans följer subduktionszonerna som ett band.' },
      { type: 'p', html: 'Kontakten mellan de två plattorna kärvar samtidigt som de trycks mot varandra, och när greppet till slut släpper frigörs den upplagrade energin på en gång. Världens allra kraftigaste jordbävningar sitter därför i subduktionszoner, och eftersom brottytan ofta ligger under havet lyfts vattenmassan ovanför och skapar tsunamier. Att en platta över huvud taget kan böja sig nedåt är för övrigt märkligare än det låter: berget är stelt på människors tidsskala, men på miljontals år beter det sig som en oerhört trögflytande vätska.' }
    ]
  },
  {
    id: 'maxwelltid',
    term: 'Maxwelltid',
    former: ['maxwelltid', 'maxwelltiden', 'maxwelltider',
             'maxwells relaxationstid', 'maxwellrelaxationstid', 'relaxationstid', 'relaxationstiden'],
    kort: 'Den tid man måste vänta innan ett material slutar bete sig som en fjäder och börjar bete sig som en trögflytande vätska. Man får den genom att dividera viskositeten med materialets styvhet.',
    relaterade: ['viskositet'],
    body: [
      { type: 'p', html: 'Det finns en leksaksmassa, hoppgummi, som svarar helt olika beroende på hur snabbt man behandlar den. Kastar man en klump i golvet studsar den som en boll. Lämnar man samma klump på bordet över natten har den flutit ut till en pannkaka. Massan är varken fast eller flytande — den är båda, och vilket beteende som visar sig avgörs av tiden. Gränsen mellan de två kallas materialets maxwelltid, efter fysikern James Clerk Maxwell.' },
      { type: 'p', html: 'Bakom ligger en enkel modell: en fjäder och en trög dämpare kopplade efter varandra. Fjädern står för det elastiska, den del som fjädrar tillbaka när kraften släpper. Dämparen står för det trögflytande, den del som ger efter för gott. Snabba påfrestningar hinner bara fjädern reagera på, och materialet känns fast. Långsamma påfrestningar hinner dämparen släppa igenom, och materialet flyter. Maxwelltiden räknas ut genom att dividera viskositeten med styvheten (skjuvmodulen), och den anger var omslaget sker. Påfrestningar som är mycket kortare än maxwelltiden möts av ett fast ämne, påfrestningar som är mycket längre av en vätska.' },
      { type: 'p', html: 'För jordens mantel, med en viskositet kring 10<sup>21</sup>&nbsp;Pa·s och en styvhet kring 10<sup>11</sup>&nbsp;Pa, blir maxwelltiden ungefär 10<sup>10</sup> sekunder — några hundra år. Det förklarar två observationer som annars verkar motsäga varandra. En jordbävningsvåg, som passerar på sekunder, möter ett stelt berg och går rakt igenom. Men Skandinavien, som pressades ner av inlandsisen och blev av med den för tiotusen år sedan, reser sig fortfarande någon centimeter om året — för på den tidsskalan är samma berg en vätska som långsamt rinner tillbaka på plats.' }
    ]
  },
  {
    id: 'absoluta-nollpunkten',
    term: 'Absoluta nollpunkten',
    former: ['absoluta nollpunkten', 'absolut nollpunkt'],
    kort: 'Den lägsta temperatur som över huvud taget kan finnas: −273,15 °C, eller 0 kelvin. Där har partiklarnas värmerörelse i princip helt stannat av.',
    relaterade: ['supraledare', 'superfluid'],
    body: [
      { type: 'p', html: 'Temperatur är egentligen ett mått på hur mycket ett ämnes atomer och molekyler rör sig: i het ånga far vattenmolekylerna omkring i hög fart, i kallt is-vatten kryper de långsamt. Kyler man något blir rörelsen mindre och mindre — och då måste det finnas en botten, en temperatur där rörelsen inte kan bli mindre. Den bottnen kallas den absoluta nollpunkten och ligger vid −273,15&nbsp;°C. Kelvinskalan är byggd så att den börjar precis där: 0&nbsp;K är absoluta nollpunkten, och en grad på kelvinskalan är lika stor som en grad Celsius.' },
      { type: 'p', html: 'Nollpunkten går att komma hur nära som helst — men aldrig att nå exakt. Dels säger termodynamiken att varje kylsteg bara tar bort en del av den värme som finns kvar, dels säger kvantmekaniken att partiklar aldrig kan ligga helt stilla: även vid 0&nbsp;K finns en liten kvarvarande darrning som kallas nollpunktsrörelse. Med laserkylning och magnetfällor har forskare ändå kylt små gasmoln till under en miljarddels kelvin — kallare än någon naturlig plats i universum.' },
      { type: 'p', html: 'Det är nära den absoluta nollpunkten som materiens konstigaste sidor visar sig: metaller som leder ström utan motstånd (supraledning), vätskor som rinner utan friktion (superfluiditet) och gasmoln där tusentals atomer smälter samman till en enda gemensam kvantvåg (Bose–Einstein-kondensat).' }
    ]
  },
  {
    id: 'bose-einstein-kondensat',
    term: 'Bose–Einstein-kondensat',
    former: ['bose–einstein-kondensat', 'bose-einstein-kondensat', 'bose–einstein-kondensatet', 'bose-einstein-kondensatet', 'bose–einstein-kondensaten', 'bose-einstein-kondensaten', 'kondensat', 'kondensatet', 'kondensaten', 'rubidiumkondensat', 'rubidiumkondensatet', 'rubidiumkondensaten', 'kaliumkondensat', 'kaliumkondensatet', 'atomkondensat', 'molekylkondensat', 'molekylkondensatet', 'molekylkondensaten'],
    kort: 'Den kallaste form av materia som går att tillverka: en gas där alla atomer har fallit ner i samma kvanttillstånd och tillsammans beter sig som en enda gemensam våg.',
    relaterade: ['absoluta-nollpunkten', 'boson', 'superfluid', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'I en vanlig gas far atomerna omkring huller om buller, var och en med sin egen fart och sin egen riktning. Ju kallare gasen blir, desto trögare rör de sig — och kyler man tillräckligt hårt händer något som inte har någon motsvarighet i vardagen: atomerna slutar vara enskilda partiklar. I stället samlas de allihop i det lägsta energitillstånd som finns, och hela molnet beskrivs av en enda gemensam kvantvåg. Det är ett Bose–Einstein-kondensat, ibland kallat materiens femte aggregationstillstånd vid sidan av fast, flytande, gas och plasma.' },
      { type: 'p', html: 'Att det över huvud taget är möjligt beror på vilken sorts partiklar atomerna är. Naturens partiklar delas i två familjer: fermioner, som vägrar dela tillstånd med varandra, och bosoner, som tvärtom gärna gör det. Atomer med ett jämnt totalt antal byggstenar räknas som bosoner, och det är bara sådana som kan kondensera. Fenomenet förutsades av Satyendra Nath Bose och Albert Einstein 1924–1925, men först 1995 lyckades någon framställa det i ett laboratorium — med hjälp av laserkylning och magnetfällor, som tillsammans kan pressa ner ett litet gasmoln till några miljarddels grader över den absoluta nollpunkten. Upptäckten gav Nobelpriset i fysik 2001.' },
      { type: 'p', html: 'Ett kondensat är kallare än någon plats som finns naturligt i universum, och just därför användbart. Eftersom alla atomer svänger i takt fungerar molnet som en materievåg som går att dela i två delar, skicka olika vägar och sedan lägga ihop igen — samma trick som med ljus i en interferometer, fast med atomer som har massa och därför känner av tyngdkraften. Sådana mätningar hör i dag till de känsligaste som finns för acceleration, rotation och små skillnader i gravitationen.' }
    ]
  },
  {
    id: 'boson',
    term: 'Boson',
    former: ['boson', 'bosonen', 'bosoner', 'bosonerna'],
    kort: 'En partikel av den familj som gärna samsas i samma kvanttillstånd — motsatsen till fermionerna, som aldrig kan dela tillstånd med varandra.',
    relaterade: ['spinn', 'higgsbosonen', 'bose-einstein-kondensat', 'foton'],
    body: [
      { type: 'p', html: 'Alla partiklar i naturen tillhör en av två familjer, och gränsen mellan dem dras av en egenskap som kallas spinn — ett slags inbyggd rotation som bara kan ha bestämda värden. Partiklar med halvtaligt spinn kallas fermioner: elektroner, protoner och neutroner hör dit. Partiklar med heltaligt spinn kallas bosoner, och dit hör bland annat ljuspartikeln fotonen.' },
      { type: 'p', html: 'Skillnaden i beteende är dramatisk. Två fermioner kan aldrig befinna sig i exakt samma tillstånd samtidigt — det är därför elektronerna i en atom tvingas fördela sig på olika skal i stället för att alla lägga sig innerst, och i förlängningen därför materia tar plats. Bosoner har ingen sådan spärr. Tvärtom blir det mer sannolikt att en boson hamnar i ett visst tillstånd ju fler som redan finns där. Laserns skarpa stråle bygger på just den flockningen: alla fotoner marscherar i takt.' },
      { type: 'p', html: 'Sammansatta objekt räknas efter hur många byggstenar de innehåller. En atom med jämnt totalt antal protoner, neutroner och elektroner beter sig utåt som en boson, och kan därför bilda ett Bose–Einstein-kondensat om den kyls tillräckligt. Med udda antal blir atomen i stället en fermion och vägrar — sådana gaser måste kylas på helt andra sätt, och beter sig då som elektronerna i en metall snarare än som ljus i en laser.' }
    ]
  },
  {
    id: 'ekvivalensprincipen',
    term: 'Ekvivalensprincipen',
    former: ['ekvivalensprincipen', 'ekvivalensprincip', 'ekvivalensprinciper', 'ekvivalensprincipsförsök'],
    kort: 'Påståendet att den massa som gör ett föremål trögt att sätta i rörelse är exakt samma massa som gör det tungt — och därför faller allting lika fort.',
    relaterade: ['relativitetsteori'],
    body: [
      { type: 'p', html: 'Massa dyker upp på två helt olika ställen i fysiken. Dels bestämmer den hur trögt ett föremål är: ju större massa, desto mer kraft krävs för att ändra dess rörelse. Dels bestämmer den hur hårt jorden drar i föremålet. Det finns ingen självklar anledning till att de två talen skulle vara samma sak — men de är det, och det är innebörden av ekvivalensprincipen.' },
      { type: 'p', html: 'Följden är den observation som brukar tillskrivas Galileo Galilei: släpper man två föremål samtidigt landar de samtidigt, hur olika de än är, så länge luftmotståndet inte lägger sig i. En tung sten dras visserligen hårdare av jorden, men den är i exakt samma grad trögare att sätta i rörelse, och de två effekterna tar ut varandra. Den mest sedda demonstrationen gjordes 1971 på månen, där en hammare och en fjäder släpptes framför en tv-kamera och landade i samma ögonblick.' },
      { type: 'p', html: 'Albert Einstein tog principen ett steg längre och gjorde den till grunden för den allmänna relativitetsteorin: eftersom allt faller lika fort går det inte att med något experiment inne i en sluten hiss avgöra om hissen står stilla i ett gravitationsfält eller accelererar ute i rymden. Skulle det någon gång visa sig att två ämnen faller olika fort, om än med en obetydlighet, skulle det peka mot en okänd kraft — och därför mäts saken om och om igen, med allt bättre metoder. Hittills har principen hållit i varje test.' }
    ]
  },
  {
    id: 'atominterferometri',
    term: 'Atominterferometri',
    former: ['atominterferometri', 'atominterferometrin', 'atominterferometer', 'atominterferometern', 'atominterferometrar', 'atominterferometrarna', 'materievåg', 'materievågen', 'materievågor', 'materievågorna'],
    kort: 'En mätmetod där ett moln av atomer behandlas som en våg: den delas i två delar som går olika vägar och läggs ihop igen, och mönstret som uppstår avslöjar minsta skillnad mellan vägarna.',
    relaterade: ['interferens', 'bose-einstein-kondensat', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'Kvantfysikens kanske mest överraskande besked är att materia beter sig som vågor. En atom som rör sig har en våglängd, precis som ljus, och kan därför göra allt som vågor gör: böja av runt hinder, mötas och förstärka varandra, eller mötas och släcka ut varandra. Våglängden är visserligen försvinnande liten för vardagliga föremål, men för en atom som kylts nästan till stillastående blir den fullt mätbar.' },
      { type: 'p', html: 'En atominterferometer utnyttjar detta. I stället för halvgenomskinliga speglar används korta laserpulser, som delar atommolnet så att det tar två vägar samtidigt — en aning högre upp och en aning längre ner, eller åt två håll. En stund senare förs delarna ihop igen. Har de två vägarna varit exakt likvärdiga hamnar atomerna i ett bestämt tillstånd; har den ena vägen varit det allra minsta annorlunda syns det direkt som en förskjutning i mönstret.' },
      { type: 'p', html: 'Eftersom atomer har massa känner de av tyngdkraften, och det gör metoden extremt känslig för acceleration. Med atominterferometrar mäts i dag tyngdaccelerationen med många decimalers noggrannhet, och de används för att kartlägga berggrund, hitta hålrum under mark och navigera utan satellitsignal. Noggrannheten växer snabbt med hur länge atomerna hinner falla fritt — vilket är skälet till att sådana instrument gärna vill upp i tyngdlöshet, där fallet aldrig tar slut.' }
    ]
  },
  {
    id: 'altermagnetism',
    term: 'Altermagnetism',
    former: ['altermagnetism', 'altermagnetismen', 'altermagnet', 'altermagneter', 'altermagneterna', 'altermagnetisk', 'altermagnetiskt', 'altermagnetiska'],
    kort: 'En tredje sorts magnetism, identifierad på 2020-talet: materialet är omagnetiskt utåt som en antiferromagnet, men elektronerna beter sig som i en ferromagnet.',
    relaterade: ['spinn', 'gitter'],
    body: [
      { type: 'p', html: 'I skolan möter man en sorts magnetism: den i kylskåpsmagneter och kompassnålar, som kallas ferromagnetism. Där pekar elektronernas små inbyggda magneter — deras spinn — åt samma håll, och materialet får ett magnetfält utåt. Sedan länge känner fysiken också till antiferromagneter, där grannatomernas spinn pekar åt varsitt håll och tar ut varandra, så att materialet utåt sett är helt omagnetiskt.' },
      { type: 'p', html: 'Altermagneter är något mittemellan — och blev allmänt accepterade som en egen, tredje klass först runt 2022. Precis som i en antiferromagnet pekar grannspinnen åt motsatta håll, så inget magnetfält läcker ut. Men atomerna med motsatt spinn sitter dessutom <em>vridna</em> i förhållande till varandra i kristallgittret, och den vridningen gör att elektroner med olika spinn ändå får olika energi och rör sig olika lätt — precis det som annars är ferromagnetens signum.' },
      { type: 'p', html: 'Kombinationen är het inom forskningsfältet spinntronik, som vill bygga elektronik där informationen bärs av spinn i stället för laddning: altermagneter kan växlas mycket snabbt, störs inte av yttre magnetfält och läcker inga egna fält som stör grannkomponenterna.' }
    ]
  },
  {
    id: 'exciterat-tillstand',
    term: 'Exciterat tillstånd',
    former: ['exciterat tillstånd', 'exciterade tillstånd', 'exciterade tillståndet', 'exciterade tillstånden', 'exciterad', 'exciterat', 'exciterade', 'exciteras', 'excitation', 'excitationen', 'excitationer', 'deexciteras', 'deexcitation'],
    kort: 'Ett tillstånd där en atom, atomkärna eller molekyl bär på mer energi än sitt lägsta möjliga tillstånd — som en uppdragen fjäder som väntar på att få släppa ut sin energi.',
    relaterade: ['spinn'],
    body: [
      { type: 'p', html: 'Elektronerna i en atom kan inte ha vilken energi som helst — de är hänvisade till bestämda energinivåer, ungefär som pinnarna i en stege. Det lägsta steget kallas grundtillståndet, och där ligger atomen om den får vara i fred. Träffas atomen av exakt rätt energiportion — till exempel en ljuspartikel, en foton — kan en elektron lyftas till ett högre steg. Då säger man att atomen är <em>exciterad</em>, eller befinner sig i ett exciterat tillstånd.' },
      { type: 'p', html: 'Ett exciterat tillstånd är nästan alltid kortlivat. Efter en bråkdels sekund faller elektronen tillbaka ner (atomen <em>deexciteras</em>) och energiskillnaden skickas ut som en foton med exakt den våglängd som motsvarar hoppet. Det är därför varje grundämne lyser med sina egna karakteristiska färger — det är så neonskyltar får sitt röda sken, norrskenet sina färger och astronomer kan avgöra vad avlägsna stjärnor består av. Även atomkärnor kan exciteras; när de faller tillbaka skickar de ut gammastrålning.' },
      { type: 'p', html: 'Ordet kommer från engelskans <em>excited state</em> — men på svenska heter det alltid exciterad, aldrig ”upphetsad”.' }
    ]
  },
  {
    id: 'fotonisk-kristall',
    term: 'Fotonisk kristall',
    former: ['fotonisk kristall', 'fotoniska kristaller', 'fotoniska kristallen', 'fotoniska kristallerna'],
    kort: 'Ett material med ett inbyggt, regelbundet mönster i nanostorlek som bestämmer vilka ljusvåglängder som får passera — ett slags kristallgitter för ljus.',
    relaterade: ['gitter', 'interferens', 'metamaterial'],
    body: [
      { type: 'p', html: 'I en vanlig kristall sitter atomerna i ett regelbundet mönster som styr hur elektroner kan röra sig genom materialet — vissa energier är tillåtna, andra förbjudna. En fotonisk kristall gör exakt samma sak, fast för ljus: materialet är uppbyggt av ett regelbundet mönster av två ämnen med olika ljusbrytning, upprepat med ett avstånd i samma storleksordning som ljusets våglängd (några hundra nanometer för synligt ljus).' },
      { type: 'p', html: 'När ljus försöker ta sig igenom mönstret reflekteras små delvågor från varje lager, och för vissa våglängder släcker eller förstärker delvågorna varandra genom interferens. Resultatet blir ”förbjudna band”: våglängder som helt enkelt inte kan färdas genom materialet utan kastas tillbaka. Naturen kom på tricket långt före oss — morphofjärilens metalliskt blå vingar, opalers färgspel och påfågelns stjärtfjädrar får sina färger från mikroskopiska mönster, inte från pigment. Det kallas strukturfärg och bleknar aldrig.' },
      { type: 'p', html: 'Tekniskt används fotoniska kristaller bland annat i specialoptiska fibrer, i effektivare lysdioder och lasrar, och som byggsten i framtida kretsar där ljus i stället för elektroner bär informationen.' }
    ]
  },
  {
    id: 'diffraktion',
    term: 'Diffraktion',
    former: ['diffraktion', 'diffraktionen', 'diffraktera', 'diffrakterar', 'diffrakterat', 'diffraktiv', 'diffraktivt', 'diffraktiva', 'ljusdiffraktion', 'ljusdiffraktionen', 'elektrondiffraktion', 'elektrondiffraktionen', 'röntgendiffraktion', 'röntgendiffraktionen'],
    kort: 'Vågors förmåga att böja av runt kanter och breda ut sig efter en öppning i stället för att gå spikrakt fram. Effekten blir tydlig först när öppningen eller hindret är ungefär lika stort som våglängden.',
    relaterade: ['interferens', 'gitter'],
    body: [
      { type: 'p', html: 'Stå i ett rum bredvid det där någon pratar och du hör vad som sägs, trots att du inte kan se personen. Ljudet kommer inte rakt igenom väggen — det böjer av runt dörrkarmen och sprider sig in i rummet. Samma sak händer med vågorna i en hamn: de smiter in genom hamninloppet och fortsätter som halvcirklar innanför, i stället för att bara fortsätta rakt fram i en smal remsa. Fenomenet kallas diffraktion, och det är något alla vågor gör.' },
      { type: 'p', html: 'Att böjningen sker beror på att varje punkt i vågfronten fungerar som en egen liten källa till nya vågor. Där öppningen är bred tar de nya vågorna nästan ut varandra åt sidorna och vågen fortsätter mest rakt fram. Där öppningen är smal finns det för få punkter för att det ska ske, och vågen vecklar ut sig som en solfjäder. Tumregeln är att avböjningen blir märkbar när öppningen krymper ner mot våglängdens storlek.' },
      { type: 'p', html: 'För ljus är våglängden bara några hundradels mikrometer, och därför märks diffraktionen sällan i vardagen — en dörröppning är miljontals våglängder bred. Men den finns där. Den är förklaringen till färgspelet på en cd-skiva, till varför gatlyktor får taggiga strålar i en kameras bilder, och till varför inget mikroskop kan visa detaljer mycket mindre än ljusets våglängd, hur bra linserna än är. Elektroner och neutroner diffrakterar också, vilket både bevisar att materia har vågegenskaper och används för att kartlägga atomernas placering i kristaller.' }
    ]
  },
  {
    id: 'koherens',
    term: 'Koherens',
    former: ['koherens', 'koherensen', 'koherent', 'koherenta', 'koherent ljus', 'inkoherent', 'inkoherenta', 'inkoherent ljus', 'partiellt koherent', 'koherenslängd', 'koherenslängden'],
    kort: 'Hur väl vågorna i en ljusstråle håller takten med varandra. Koherent ljus har en fast fasrelation mellan olika delar av strålen och kan därför ge tydliga interferensmönster.',
    relaterade: ['interferens', 'laser', 'diffraktion'],
    body: [
      { type: 'p', html: 'Tänk på en läktare där publiken gör vågen. Om alla följer samma taktkänsla rullar vågen jämnt runt arenan — det är koherens. Om var och en reser sig när det faller hen in blir det bara ett myller. Ljus fungerar likadant: vågorna kan svänga i en gemensam takt eller helt oberoende av varandra.' },
      { type: 'p', html: 'En glödlampa och solen ger inkoherent ljus. Där skickar miljarder atomer ut korta vågtåg oberoende av varandra, med slumpmässiga starttider och en salig blandning av våglängder. En laser gör tvärtom: alla atomer förmås att skicka ut sitt ljus i takt, med samma våglängd och samma fas. Sådant ljus kan färdas långt innan takten går förlorad — avståndet kallas koherenslängd och kan vara allt från några mikrometer till många kilometer.' },
      { type: 'p', html: 'Koherensen avgör om interferens går att se. Två koherenta strålar som möts ger ett stabilt mönster av ljusa och mörka band, eftersom vilka delar som förstärker och släcker varandra ligger fast. Två inkoherenta strålar ger också interferens i varje ögonblick, men mönstret hoppar omkring så snabbt att ögat och kameran bara ser ett jämngrått medelvärde. Det är därför precisionsmätningar med interferometrar, holografi och de flesta optiska experiment behöver laserljus — och därför man inte ser interferensränder från två vanliga taklampor.' }
    ]
  },
  {
    id: 'fasforskjutning',
    term: 'Fasförskjutning',
    former: ['fasförskjutning', 'fasförskjutningen', 'fasförskjutningar', 'faskift', 'faskiftet', 'fasfördröjning', 'fasfördröjningen', 'fasfördröjande', 'motfas', 'fasförhållande', 'fasförhållanden', 'fasrelation', 'fasrelationen', 'fasmönster', 'fasmönstret'],
    kort: 'Hur mycket en våg ligger före eller efter en annan i sin svängning. En halv våglängds förskjutning gör att två annars lika vågor släcker ut varandra helt.',
    relaterade: ['interferens', 'koherens', 'diffraktion'],
    body: [
      { type: 'p', html: 'Två barn i varsin gunga kan gunga precis lika högt och lika snabbt och ändå se helt olika ut: antingen åker de fram och tillbaka tillsammans, eller så möts de på mitten hela tiden. Skillnaden är var i svängningen de befinner sig — deras fas. Ligger den ena ett halvt varv efter den andra säger man att de går i motfas.' },
      { type: 'p', html: 'För vågor mäts fasförskjutningen oftast i grader eller i delar av en våglängd. Två vågor i fas har toppar på samma ställen och förstärker varandra; två vågor i motfas har topp mot dal och tar ut varandra. Det vanligaste sättet att skapa en fasförskjutning är att låta den ena vågen gå en längre väg. En extra väglängd på en halv våglängd svarar mot ett halvt varvs förskjutning, en hel våglängd mot ett helt varv — och ett helt varv syns inte alls, eftersom vågen då ser likadan ut igen.' },
      { type: 'p', html: 'Just kopplingen mellan väg och fas gör fasförskjutningen till ett verktyg. Antireflexbehandlingen på ett par glasögon är ett skikt vars tjocklek är vald så att ljuset som studsar på ovansidan och ljuset som studsar på undersidan möts i motfas och släcker varandra. Ljudet i ett par brusreducerande hörlurar tystas på samma sätt, med en motvåg. Och eftersom faskiftet från en given väglängd beror på våglängden fungerar sådana knep bara i ett begränsat färg- eller frekvensband — resten smiter förbi.' }
    ]
  },
  {
    id: 'gitter',
    term: 'Gitter',
    former: ['gitter', 'gittret', 'kristallgitter', 'kristallgittret', 'atomgitter', 'atomgittret', 'metallgitter', 'metallgittret', 'gitterstruktur', 'gitterstrukturen', 'diffraktionsgitter', 'diffraktionsgittret', 'bikakegitter', 'bikakegittret'],
    kort: 'Det regelbundna, upprepade mönster som atomerna bildar i en kristall. Ordet används också om optiska gitter — täta mönster av spalter eller spår som delar upp ljus i sina färger.',
    relaterade: ['fotonisk-kristall', 'interferens', 'tidskristall'],
    body: [
      { type: 'p', html: 'I ett fast ämne som är kristallint — metaller, salt, is, diamant — sitter atomerna inte huller om buller utan i ett strikt geometriskt mönster som upprepar sig i alla riktningar: ett kristallgitter. Gittret avgör många av materialets egenskaper. Att diamant och grafit är så olika trots att båda är rent kol beror helt på hur kolatomernas gitter ser ut. Värme i ett fast ämne är i själva verket vibrationer som fortplantar sig genom gittret, och när elektroner krockar med gittrets vibrationer uppstår elektriskt motstånd.' },
      { type: 'p', html: 'Inom optiken betyder gitter något besläktat men annorlunda: en skiva med tusentals tätt liggande, jämnt fördelade spalter eller spår. När ljus passerar böjs det olika mycket beroende på våglängd, och genom interferens delas ljuset upp i ett skarpt spektrum — mycket skarpare än genom ett prisma. Det är samma effekt som gör att en cd-skivas undersida skimrar i regnbågens färger: de tätt packade dataspåren fungerar som ett gitter.' }
    ]
  },
  {
    id: 'interferens',
    term: 'Interferens',
    former: ['interferens', 'interferensen', 'interferera', 'interfererar', 'interfererade', 'interferensmönster', 'interferensmönstret'],
    kort: 'När två vågor möts och lägger ihop sig: vågtopp på vågtopp förstärker varandra, medan vågtopp på vågdal släcker ut varandra.',
    relaterade: ['fotonisk-kristall', 'gitter'],
    body: [
      { type: 'p', html: 'Släpp två stenar samtidigt i en stilla damm och titta där ringarna korsas: på vissa ställen gungar vattnet extra kraftigt, på andra ligger det nästan stilla. Det är interferens. När två vågor möts adderas de helt enkelt — kommer topp och topp samtidigt blir resultatet en dubbelt så hög topp (konstruktiv interferens), kommer topp och dal samtidigt tar de ut varandra (destruktiv interferens).' },
      { type: 'p', html: 'För ljus är interferensen själva beviset på att ljus är en vågrörelse. Skickas ljus genom två smala spalter bildas ett randmönster av ljusa och mörka band på en skärm bakom — ljust där vågorna förstärker varandra, mörkt där de släcker ut varandra. Samma fenomen ger såpbubblans och oljefläckens skiftande färger: ljus som studsar på hinnans över- och undersida interfererar, och vilka färger som förstärks beror på hinnans tjocklek.' },
      { type: 'p', html: 'Interferens är också ett av fysikens vassaste mätverktyg. Instrument som delar en ljusstråle i två vägar och låter dem mötas igen — interferometrar — kan avslöja väglängdsskillnader mindre än en tusendel av en atomdiameter. Det var så gravitationsvågor upptäcktes 2015.' }
    ]
  },
  {
    id: 'kiralitet',
    term: 'Kiralitet',
    former: ['kiralitet', 'kiraliteten', 'kiral', 'kiralt', 'kirala'],
    kort: 'Egenskapen att skilja sig från sin egen spegelbild — som en höger- och en vänsterhand. Molekyler, kristaller och till och med ljus kan vara kirala.',
    body: [
      { type: 'p', html: 'Håll upp händerna framför dig: de är varandras spegelbilder, men hur du än vrider och vänder går de inte att lägga exakt ovanpå varandra. Ett föremål med den egenskapen kallas kiralt — ordet kommer från grekiskans <em>cheir</em>, hand. En kula eller en slät mugg är däremot inte kiral: dess spegelbild är identisk med originalet.' },
      { type: 'p', html: 'Många molekyler är kirala och finns i en ”höger-” och en ”vänsterversion” med samma atomer i samma ordning. Det låter harmlöst, men kroppens mottagarmolekyler är själva kirala och känner skillnad: molekylen limonen luktar apelsin i den ena spegelformen och terpentinaktigt barr i den andra, och inom läkemedelsutveckling kan spegelformerna ha helt olika medicinsk effekt. Nästan allt liv på jorden använder dessutom bara den ena spegelformen av sina aminosyror — varför är fortfarande en olöst gåta.' },
      { type: 'p', html: 'Även ljus kan vara kiralt: i cirkulärpolariserat ljus skruvar sig det elektriska fältet som en spiral, medurs eller moturs, längs strålens väg. Sådant ljus växelverkar olika starkt med höger- och vänsterversionen av en kiral molekyl, vilket gör det till ett fint verktyg för att skilja spegelformer åt.' }
    ]
  },
  {
    id: 'kosmologiska-konstanten',
    term: 'Kosmologiska konstanten',
    former: ['kosmologiska konstanten', 'kosmologisk konstant'],
    kort: 'En term i Einsteins ekvationer, betecknad Λ (lambda), som ger tomma rymden en inbyggd energi. I dag är den enklaste förklaringen till att universums expansion accelererar.',
    relaterade: ['mork-energi', 'mork-materia'],
    body: [
      { type: 'p', html: 'När Einstein 1917 använde sin allmänna relativitetsteori på hela universum stötte han på ett problem: ekvationerna vägrade att ge det stillastående universum alla på den tiden trodde på — gravitationen borde få allting att dras ihop. Han lade därför till en extra term, den kosmologiska konstanten Λ, som fungerar som ett utåtriktat tryck och kunde hålla universum i balans. När Edwin Hubble sedan visade att universum expanderar ångrade Einstein tillägget djupt.' },
      { type: 'p', html: 'Men konstanten fick en andra chans. 1998 upptäckte två forskarlag, med hjälp av avlägsna supernovor, att universums expansion inte bromsar in — den <em>accelererar</em>. Något måste trycka på, och den enklaste kandidaten visade sig vara just Λ: en konstant energitäthet som finns i själva rymden, så att mer rymd betyder mer utåtriktat tryck. Kosmologins standardmodell heter i dag ΛCDM — lambda plus kall mörk materia.' },
      { type: 'p', html: 'Ett stort olöst problem kvarstår: när partikelfysiker försöker räkna ut hur stor vakuumets energi <em>borde</em> vara hamnar de omkring 10<sup>120</sup> gånger fel jämfört med det uppmätta värdet. Det brukar kallas fysikhistoriens sämsta teoretiska förutsägelse — och är ett tecken på att något grundläggande fortfarande saknas i pusslet.' }
    ]
  },
  {
    id: 'kvantsammanflatning',
    term: 'Kvantsammanflätning',
    former: ['kvantsammanflätning', 'kvantsammanflätningen', 'sammanflätning', 'sammanflätningen', 'sammanflätade', 'sammanflätat', 'sammanflätas', 'kvantsammanflätade', 'kvantsammanflätat'],
    kort: 'Ett kvantfenomen där två partiklar delar ett gemensamt tillstånd, så att en mätning på den ena omedelbart avgör resultatet för den andra — oavsett avståndet mellan dem.',
    relaterade: ['spinn'],
    body: [
      { type: 'p', html: 'När två partiklar skapas tillsammans eller får växelverka kan de hamna i ett gemensamt kvanttillstånd där ingen av dem längre har egna, färdiga egenskaper — bara paret som helhet är bestämt. Mäter man då den ena partikeln, till exempel dess spinn, är det i samma ögonblick avgjort vad en mätning på den andra kommer att ge. Det gäller även om partiklarna hunnit hamna i varsin ände av galaxen.' },
      { type: 'p', html: 'Einstein misstrodde fenomenet och kallade det ”spöklik avståndsverkan” — han menade att partiklarna rimligen måste bära med sig hemliga förutbestämda svar. Men fysikern John Bell visade på 1960-talet att de två förklaringarna går att skilja åt experimentellt, och alla experiment sedan dess har gett kvantmekaniken rätt: korrelationerna är starkare än någon ”hemlig lapp i fickan” kan åstadkomma. Experimenten belönades med Nobelpriset i fysik 2022.' },
      { type: 'p', html: 'Viktigt att veta: sammanflätning kan inte användas för att skicka meddelanden snabbare än ljuset — mätresultaten ser slumpmässiga ut tills de jämförs via en vanlig, ljushastighetsbegränsad kanal. Däremot är sammanflätning själva råvaran i kvantdatorer, kvantkryptering och kvantteleportering.' }
    ]
  },
  {
    id: 'kvasar',
    term: 'Kvasar',
    former: ['kvasar', 'kvasaren', 'kvasarer', 'kvasarerna'],
    kort: 'Kärnan i en avlägsen galax som lyser starkare än hela galaxen omkring den. Ljuset kommer från gas som hettas upp våldsamt när den faller in mot ett supermassivt svart hål.',
    body: [
      { type: 'p', html: 'När radioastronomer på 1960-talet ringade in några starka radiokällor på himlen såg de i teleskopen bara stjärnliknande ljusprickar — objekten döptes till kvasarer, av engelskans <em>quasi-stellar</em>, ”stjärnliknande”. Chocken kom när avstånden mättes: prickarna låg miljarder ljusår bort. För att synas alls på det avståndet måste de lysa hundratals gånger starkare än en hel galax, från ett område inte större än vårt solsystem.' },
      { type: 'p', html: 'Förklaringen är materiens sista resa in i ett supermassivt svart hål. I centrum av kvasarens värdgalax sitter ett svart hål med miljoner till miljarder solmassor. Gas som faller in mot det lägger sig i en snabbt roterande skiva — en ackretionsskiva — där friktionen hettar upp gasen till miljontals grader så att den lyser intensivt över hela spektrumet. Många kvasarer skjuter dessutom ut strålar av partiklar i nära ljushastighet, vinkelrätt mot skivan.' },
      { type: 'p', html: 'Eftersom kvasarernas ljus har rest i miljarder år fungerar de som strålkastare från universums barndom: i deras ljus kan astronomer läsa av vilken gas som fanns mellan galaxerna för länge sedan, och hur tidigt de första jättesvarta hålen hann växa sig stora.' }
    ]
  },
  {
    id: 'metamaterial',
    term: 'Metamaterial',
    former: ['metamaterial', 'metamaterialet', 'metamaterialen'],
    kort: 'Konstgjorda material uppbyggda av små, noggrant utformade byggstenar som ger egenskaper inget naturligt material har — till exempel att bryta ljus åt ”fel” håll.',
    relaterade: ['fotonisk-kristall'],
    body: [
      { type: 'p', html: 'Ett vanligt materials egenskaper bestäms av dess kemi — vilka atomer det består av och hur de binder till varandra. Ett metamaterial fuskar: det byggs upp av små konstgjorda strukturer (metallslingor, stavar, hål) som är mindre än våglängden hos de vågor materialet ska påverka. Vågen kan då inte urskilja de enskilda byggstenarna utan känner bara av deras samlade verkan — och den kan konstrueras nästan fritt. Grekiskans <em>meta</em> betyder ”bortom”: egenskaper bortom de naturliga.' },
      { type: 'p', html: 'Det mest berömda exemplet är negativt brytningsindex: ljus som går in i materialet bryts åt motsatt håll mot vad det gör i vatten eller glas — något inget känt naturligt material klarar. Samma idé ligger bakom experiment med ”osynlighetsmantlar” som leder ljus eller mikrovågor runt ett föremål, superlinser som ser detaljer mindre än ljusets våglängd, och akustiska metamaterial som stoppar ljud som borde ta sig igenom. Principen är alltså inte begränsad till ljus — den fungerar för alla slags vågor.' }
    ]
  },
  {
    id: 'mork-energi',
    term: 'Mörk energi',
    former: ['mörk energi', 'mörka energin'],
    kort: 'Den okända form av energi som får universums expansion att gå allt fortare. Den utgör ungefär 68 % av universums totala energiinnehåll — och ingen vet vad den är.',
    relaterade: ['mork-materia', 'kosmologiska-konstanten'],
    body: [
      { type: 'p', html: 'Att universum expanderar har varit känt sedan 1920-talet, och länge var den självklara frågan hur mycket gravitationen bromsar expansionen. 1998 mätte två forskarlag inbromsningen med hjälp av avlägsna supernovor av en typ vars verkliga ljusstyrka är känd — och fick ett svar ingen väntat sig: expansionen bromsar inte alls, den <em>accelererar</em>. Upptäckten belönades med Nobelpriset i fysik 2011, och ”någonting” som knuffar på expansionen fick arbetsnamnet mörk energi.' },
      { type: 'p', html: 'Mätningar av den kosmiska bakgrundsstrålningen och av hur galaxer klumpar sig ger samma bild: universums energiinnehåll består till ungefär 68&nbsp;% av mörk energi, 27&nbsp;% mörk materia och bara 5&nbsp;% vanlig materia — allt vi någonsin sett i teleskop är alltså en liten minoritetspost. Den enklaste förklaringen är att tomma rymden själv bär en konstant energitäthet (en kosmologisk konstant); djärvare förslag handlar om ett okänt energifält som ändras med tiden.' },
      { type: 'p', html: 'Vilket svar som är rätt avgör bokstavligen universums framtid: en konstant mörk energi ger evig, allt snabbare expansion, medan en föränderlig skulle kunna mattas av — eller växa. Att mäta mörk energi-egenskaperna är därför huvuduppgiften för flera av 2020-talets stora teleskopprojekt.' }
    ]
  },
  {
    id: 'mork-materia',
    term: 'Mörk materia',
    former: ['mörk materia', 'mörka materian', 'mörka materien'],
    kort: 'Osynlig materia som varken sänder ut eller absorberar ljus, men vars gravitation håller ihop galaxerna. Den verkar väga ungefär fem gånger mer än all vanlig materia.',
    relaterade: ['mork-energi', 'kosmologiska-konstanten'],
    body: [
      { type: 'p', html: 'Räknar man ihop allt som syns i en galax — stjärnor, gas, stoft — och jämför med hur fort galaxen roterar, går ekvationen inte ihop: ytterkanterna snurrar så fort att galaxen borde slungas isär. Något osynligt måste bidra med extra gravitation. Astronomen Vera Rubins mätningar av galaxrotation på 1970-talet gjorde problemet omöjligt att vifta bort, och samma osynliga massa syns i dag i hur galaxhopar böjer ljus (gravitationslinsning) och i den kosmiska bakgrundsstrålningens mönster.' },
      { type: 'p', html: 'Det enkla svaret — att det bara är vanlig materia som råkar vara mörk, som döda stjärnor eller gasmoln — har uteslutits: universums tidiga kärnreaktioner sätter en gräns för hur mycket vanlig materia som finns totalt, och den räcker inte på långa vägar. Mörk materia verkar vara något annat: partiklar som känner av gravitation men (nästan) inte något annat, och som aldrig observerats i något laboratorium.' },
      { type: 'p', html: 'Jakten pågår på tre fronter: känsliga detektorer djupt under jord som väntar på att en mörk materia-partikel ska studsa mot en atomkärna, partikelacceleratorer som försöker skapa partiklarna, och teleskop som letar efter strålning från mörk materia som förintar sig själv i rymden. Hittills har alla kommit hem tomhänta — vilket i sig sakta ritar om kartan över vad mörk materia kan vara.' }
    ]
  },
  {
    id: 'neutrino',
    term: 'Neutrino',
    former: ['neutrino', 'neutrinon', 'neutriner', 'neutrinerna', 'antineutrino', 'antineutrinon', 'antineutriner', 'antineutrinerna', 'reaktorantineutrin', 'reaktorantineutriner', 'solneutrin', 'solneutriner', 'elektronneutrino', 'myonneutrino', 'tauneutrino', 'tauneutrinon'],
    kort: 'Universums skyggaste partikel: elektriskt neutral, nästan masslös och passerar rakt genom hela jordklotet utan att märka det. Varje sekund far tiotals miljarder neutriner genom din tumnagel.',
    body: [
      { type: 'p', html: 'Neutriner föds i kärnreaktioner: i solens inre, i kärnkraftverk, i radioaktiva sönderfall och i exploderande stjärnor. De saknar elektrisk laddning och känner varken av elektriska krafter eller den starka kärnkraften — bara den svaga växelverkan och (ytterst lite) gravitationen. Därför flyger de rakt igenom nästan allt: av de tiotals miljarder solneutriner som varje sekund passerar genom en tumnagel fastnar i praktiken ingen. Ett ljusårs­tjockt blylager skulle bara stoppa ungefär hälften.' },
      { type: 'p', html: 'Att alls fånga en neutrino kräver därför enorma detektorer och gott om tålamod: tiotusentals ton ultrarent vatten, is eller specialvätska djupt nere i gruvor eller under Antarktis is, kantade av ljussensorer som väntar på den svaga blixt som uppstår de sällsynta gånger en neutrino ändå träffar en atomkärna.' },
      { type: 'p', html: 'Neutrinerna har redan bjudit på en stor överraskning: de finns i tre sorter, och på vägen från solen byter de skepnad mellan sorterna — de <em>oscillerar</em>. Det är bara möjligt om de har massa, vilket den övriga partikelfysikens standardmodell inte hade förutsett. Upptäckten belönades med Nobelpriset i fysik 2015, och neutrinons exakta massa är fortfarande en av fysikens öppna frågor.' }
    ]
  },
  {
    id: 'plasma',
    term: 'Plasma',
    former: ['plasma', 'plasmat'],
    kort: 'Materiens fjärde tillstånd: en gas så energirik att elektronerna slitits loss från sina atomer. Nästan all synlig materia i universum — stjärnorna — är plasma.',
    body: [
      { type: 'p', html: 'Fast form, vätska, gas — och så plasma. Värmer man en gas tillräckligt, eller utsätter den för starka elektriska fält, slås elektronerna loss från atomerna. Kvar blir en virvlande blandning av fria elektroner och positivt laddade joner. Den blandningen beter sig helt annorlunda än en vanlig gas: den leder elektrisk ström utmärkt, och den både påverkas av och skapar egna magnetfält, vilket ger plasma ett rikt och ofta dramatiskt beteende.' },
      { type: 'p', html: 'Plasma är ovanligt i vår vardag men normen i universum: solen och alla andra stjärnor är gigantiska plasmaklot, och även den tunna materian mellan stjärnorna är till stor del joniserad. Närmare hemmet finns plasma i blixtar, i norrskenet (där partiklar från solen krockar med atmosfären), i lysrörens och neonskyltarnas sken — och i fusionsreaktorer, där ett plasma hetare än solens kärna hålls svävande av magnetfält för att atomkärnor ska kunna smälta samman.' }
    ]
  },
  {
    id: 'skyrmion',
    term: 'Skyrmion',
    former: ['skyrmion', 'skyrmionen', 'skyrmioner', 'skyrmionerna'],
    kort: 'En liten, knutliknande virvel i ett fält — till exempel i ett materials magnetisering — som är förvånansvärt stabil och kan flyttas omkring som en partikel.',
    relaterade: ['spinn'],
    body: [
      { type: 'p', html: 'I vissa magnetiska material kan elektronernas spinn ordna sig i ett litet virvelmönster: i mitten pekar spinnen åt ett håll, längst ut åt motsatt håll, och däremellan vrider de sig mjukt runt. Ett sådant mönster kallas skyrmion, efter den brittiske fysikern Tony Skyrme som beskrev matematiken bakom redan på 1960-talet — då som en modell för atomkärnornas partiklar.' },
      { type: 'p', html: 'Skyrmionens finess är att den är <em>topologiskt skyddad</em>: virveln kan inte slätas ut steg för steg, av samma skäl som en knut på ett rep inte försvinner hur man än drar i ändarna — den måste ”klippas upp”. Det gör skyrmioner ovanligt tåliga mot störningar, samtidigt som de kan vara bara några nanometer små och knuffas runt med svaga elektriska strömmar. Därför utforskas de som databärare i framtida minnen, där ettor och nollor skulle kunna lagras som närvaro eller frånvaro av enskilda skyrmioner.' },
      { type: 'p', html: 'Idén är inte begränsad till magneter: forskare har på senare år skapat optiska skyrmioner — samma slags knutmönster fast i ljusets fält — som kan behålla sin form över anmärkningsvärda avstånd.' }
    ]
  },
  {
    id: 'spinn',
    term: 'Spinn',
    former: ['spinn', 'spinnet', 'elektronspinn', 'elektronspinnet', 'kärnspinn', 'kärnspinnet', 'spinntronik', 'spinntroniken'],
    kort: 'En inbyggd kvantegenskap hos partiklar som gör att de beter sig som små magneter och bär ett eget rörelsemängdsmoment — trots att ingenting faktiskt snurrar.',
    relaterade: ['altermagnetism', 'kvantsammanflatning', 'skyrmion'],
    body: [
      { type: 'p', html: 'Namnet lurar lätt tanken: spinn låter som att partikeln snurrar runt sin egen axel, som en liten jord. Men elektronen har, så vitt fysiken vet, ingen utsträckning alls — det finns inget som kan snurra. Spinn är i stället en medfödd kvantegenskap, lika grundläggande som partikelns laddning och massa: partikeln bär ett inbyggt rörelsemängdsmoment och uppför sig som en pytteliten magnet. För elektronen kan spinnet dessutom bara mätas till två värden, ofta kallade ”upp” och ”ner” — aldrig något mittemellan.' },
      { type: 'p', html: 'Trots sin abstrakta natur formar spinnet världen påtagligt. Att järn kan bli magnetiskt beror på att många elektronspinn ställer in sig åt samma håll. Och att elektroner med samma spinn vägrar dela kvanttillstånd (Pauliprincipen) tvingar atomernas elektroner att stapla sig i skal — vilket ger grundämnena deras kemi och periodiska systemet dess struktur.' },
      { type: 'p', html: 'Spinn är också teknik: magnetkameran på sjukhuset (MR) lyssnar på väteatomkärnornas spinn i kroppen, och forskningsfältet spinntronik utvecklar elektronik där information lagras och skickas med spinnriktningar i stället för elektrisk laddning — snabbare och snålare än dagens kretsar.' }
    ]
  },
  {
    id: 'superfluid',
    term: 'Superfluid',
    former: ['superfluid', 'superfluida', 'superfluidum', 'superfluider', 'superfluiditet', 'superfluiditeten'],
    kort: 'En vätska som flyter helt utan inre friktion. Den kan krypa upp för sitt kärls väggar och rinna genom porer så små att ingen vanlig vätska tar sig igenom.',
    relaterade: ['absoluta-nollpunkten', 'supraledare'],
    body: [
      { type: 'p', html: 'Kyl flytande helium till under 2,17&nbsp;K — drygt två grader över den absoluta nollpunkten — och det förvandlas till något som inte beter sig som en vätska längre. All inre friktion (viskositet) försvinner: sätter man vätskan i rotation snurrar den för evigt, och den rinner obehindrat genom springor så trånga att vanligt flytande helium fastnar. Mest kusligt är krypfilmen: ett tunt skikt superfluid klättrar av sig självt upp längs bägarens insida, över kanten och ner på utsidan, tills bägaren tömt sig själv.' },
      { type: 'p', html: 'Förklaringen är kvantmekanik i stor skala. Vid tillräckligt låg temperatur samlas en stor del av heliumatomerna i ett och samma kvanttillstånd och rör sig som en enda samordnad våg i stället för som myllrande enskilda atomer. Friktion kräver att enskilda partiklar kan knuffas ur takten — men i det gemensamma tillståndet finns inga småknuffar att ta emot, så flödet fortsätter ostört.' },
      { type: 'p', html: 'Superfluiditet är nära släkt med supraledning — som är samma idé fast för elektroner i en metall — och fenomenet dyker upp på oväntade ställen: i neutronstjärnors inre tros neutronerna flyta superfluida, och även ljus kan under rätt förhållanden bete sig som en friktionsfri vätska.' }
    ]
  },
  {
    id: 'magnetometer',
    term: 'Magnetometer',
    former: ['magnetometer', 'magnetometern', 'magnetometrar', 'magnetometrarna', 'magnetometri', 'magnetfältsmätare', 'magnetfältsmätaren'],
    kort: 'Ett instrument som mäter magnetfält. De känsligaste varianterna registrerar fält som är hundratals miljoner gånger svagare än jordens.',
    relaterade: ['squid', 'diamagnetism', 'supraledare'],
    body: [
      { type: 'p', html: 'En magnetometer mäter hur starkt ett magnetfält är, och ofta också åt vilket håll det pekar. Den enklaste modellen har funnits i tusen år och heter kompass: en liten magnet som får vrida sig fritt ställer in sig efter fältet. Mobiltelefonen har en modern släkting inbyggd, ett par kvadratmillimeter kisel som känner av jordens fält så att kartappen vet vilket håll du tittar åt.' },
      { type: 'p', html: 'De vetenskapliga magnetometrarna är av ett helt annat slag. Magnetfält mäts i enheten tesla, och jordens fält är omkring 50&nbsp;mikrotesla — ungefär en tjugotusendels tesla. En kylskåpsmagnet ger några millitesla vid ytan. De känsligaste instrumenten arbetar i stället i femtotesla, som är en miljondels miljarddels tesla, alltså i storleksordningen en miljard gånger svagare än jordens fält. Vid den nivån hörs signaler som annars är omöjliga att uppfatta: strömmarna i en hjärna eller ett hjärta, järnhaltiga mineral djupt nere i berggrunden, eller små föroreningar i ett materialprov.' },
      { type: 'p', html: 'Svårigheten är sällan att förstärka signalen, utan att skilja den från allt annat. En buss som passerar utanför fönstret, en hiss i huset och den elektriska ledningen i väggen ger alla ifrån sig magnetfält som är många tusen gånger starkare än det man vill mäta. Därför byggs de känsligaste mätningarna in i rum med väggar av magnetiskt skyddsmaterial, och därför är det en nyhet i sig varje gång någon lyckas göra en lika känslig mätare som klarar sig utan sådana rum.' }
    ]
  },
  {
    id: 'diamagnetism',
    term: 'Diamagnetism',
    former: ['diamagnetism', 'diamagnetismen', 'diamagnetisk', 'diamagnetiskt', 'diamagnetiska'],
    kort: 'Alla ämnens svaga benägenhet att stötas bort från ett magnetfält i stället för att dras in i det. Effekten är oftast omärklig, men räcker för att få grafit — och grodor — att sväva.',
    relaterade: ['magnetometer', 'supraledare', 'spinn'],
    body: [
      { type: 'p', html: 'De flesta tänker på magnetism som något järn har och trä saknar. I själva verket reagerar allt material på ett magnetfält, bara olika mycket. När fältet slås på ändras elektronernas rörelse i varje atom en aning, och ändringen sker alltid så att atomen bygger upp ett eget litet magnetfält som är riktat <em>mot</em> det yttre. Följden är att ämnet stöts bort från fältet. Det kallas diamagnetism, och det gäller vatten, glas, plast, koppar, kött och nästan allt annat.' },
      { type: 'p', html: 'I järn och andra ferromagnetiska ämnen är effekten helt överröstad av en mycket starkare mekanism som drar materialet in mot fältet i stället. Men i ämnen utan den mekanismen finns bara frånstötningen kvar — och den går faktiskt att se. Pyrolytisk grafit, där kolatomerna ligger ordnade i plana skikt, är ovanligt starkt diamagnetisk, och en tunn flisa av materialet svävar av sig själv några millimeter ovanför en samling starka permanentmagneter, utan kylning och utan ström. 1997 lät fysikern Andre Geim på samma sätt en levande groda flyta fritt i ett fält på omkring 16&nbsp;tesla; grodan består mest av vatten, och vatten är diamagnetiskt.' },
      { type: 'p', html: 'Frånstötningen har en egenskap som gör den ovanligt användbar: den blir starkare ju närmare fältets starkaste punkt föremålet kommer. Ett magnetiskt föremål som balanseras av andra magneter befinner sig alltid i en vinglig jämvikt som spårar ur vid minsta störning, men ett diamagnetiskt material puttar tillbaka åt vilket håll föremålet än råkar glida. Därför används diamagnetiska ytor för att stabilisera svävande föremål i känsliga instrument, där varje kontaktpunkt annars skulle betyda friktion och störningar.' }
    ]
  },
  {
    id: 'squid',
    term: 'SQUID',
    former: ['squid', 'squiden', 'squidar', 'squidarna', 'squidmagnetometer', 'squidmagnetometrar', 'kvantinterferensmagnetometer', 'kvantinterferensmagnetometrar'],
    kort: 'En magnetfältsmätare byggd av en supraledande ring — under årtionden den känsligaste som fanns, men den måste hållas nerkyld till några grader över absoluta nollpunkten.',
    relaterade: ['supraledare', 'magnetometer', 'kvantsammanflatning'],
    body: [
      { type: 'p', html: 'Namnet är en förkortning av engelskans <em>superconducting quantum interference device</em>, ungefär ”supraledande kvantinterferensinstrument”. Hjärtat är en ring av supraledande material, alltså ett material som under en viss temperatur leder ström helt utan motstånd. Ringen är bruten på ett eller två ställen av ett tunt isolerande skikt som strömmen ändå tar sig igenom, tack vare att elektronparen i en supraledare uppför sig som en enda gemensam våg som kan läcka igenom barriären.' },
      { type: 'p', html: 'Det speciella med en sådan ring är att magnetfältet genom den inte kan anta vilket värde som helst. Det kommer i bestämda portioner, ungefär som trappsteg, och strömmen i ringen ändras med en tydlig rytm varje gång fältet ökar med ett steg. Att räkna trappsteg är något man kan göra mycket noggrant, och det är därför en SQUID kan mäta så otroligt svaga fält: ner mot några tiotals femtotesla, alltså miljardtals gånger svagare än jordens magnetfält.' },
      { type: 'p', html: 'Priset är kylningen. Supraledningen försvinner om materialet blir för varmt, så instrumentet måste hållas nerkylt, i praktiken med flytande helium, och behöver dessutom oftast stå i ett magnetiskt avskärmat rum. Det gör en SQUID dyr, tung och besvärlig att flytta — vilket förklarar varför hjärnmagnetkameror finns på ett fåtal sjukhus i världen, och varför forskare länge har letat efter lika känsliga mätare som fungerar i rumstemperatur.' }
    ]
  },
  {
    id: 'supraledare',
    term: 'Supraledare',
    former: ['supraledare', 'supraledaren', 'supraledarna', 'supraledning', 'supraledningen', 'supraledande'],
    kort: 'Ett material som under en viss kritisk temperatur leder ström helt utan elektriskt motstånd — och dessutom trycker ut magnetfält ur sitt inre, så att magneter kan sväva över det.',
    relaterade: ['absoluta-nollpunkten', 'superfluid'],
    body: [
      { type: 'p', html: 'I en vanlig ledare krockar elektronerna ständigt med atomgittrets vibrationer och orenheter — det är det som är elektriskt motstånd, och det som gör att kablar blir varma och energi går förlorad. 1911 upptäckte Heike Kamerlingh Onnes något häpnadsväckande: kyls kvicksilver under 4,2&nbsp;K försvinner motståndet inte bara nästan — det försvinner <em>exakt</em>. En ström som startats i en supraledande ring cirkulerar i åratal utan att mätbart avta.' },
      { type: 'p', html: 'Förklaringen dröjde till 1957: vid låg temperatur parar elektronerna ihop sig två och två till så kallade Cooperpar, och paren rör sig samordnat som en enda gemensam kvantvåg som gittrets vibrationer inte förmår bromsa. Supraledare gör dessutom något mer än att leda perfekt — de motar aktivt ut magnetfält ur sitt inre (Meissnereffekten). Det är därför en magnet kan sväva stabilt ovanför en kyld supraledare, ett av fysikens mest fotograferade partytrick.' },
      { type: 'p', html: 'Supraledande spolar ger de starka magnetfälten i sjukhusens MR-kameror, i partikelacceleratorer och i magnettåg. Den stora drömmen är en supraledare som fungerar i rumstemperatur utan extrema tryck — den skulle revolutionera elnät, motorer och datorer, och jakten på den är ett av materialfysikens hetaste fält.' }
    ]
  },
  {
    id: 'terahertzstralning',
    term: 'Terahertzstrålning',
    former: ['terahertzstrålning', 'terahertzstrålningen', 'terahertzområdet', 'terahertzvågor', 'terahertzljus', 'terahertzgapet', 'terahertzband', 'terahertzbandet', 'terahertz'],
    kort: 'Elektromagnetiska vågor i gränslandet mellan mikrovågor och infrarött ljus — länge så svåra att både skapa och fånga att området kallades ”terahertzgapet”.',
    body: [
      { type: 'p', html: 'Terahertzstrålning är ljusets okända kusin: elektromagnetiska vågor som svänger omkring en biljon gånger per sekund (1&nbsp;THz = 10<sup>12</sup>&nbsp;Hz), med våglängder från någon tiondels millimeter upp till ett par millimeter. På frekvensskalan ligger området inklämt mellan mikrovågorna (radar, mobilnät) och det infraröda ljuset (värmestrålning) — för högt i frekvens för vanlig radioelektronik, för lågt för vanliga lasrar och lampor. Därför släpade tekniken länge efter, och fysiker talade om ”terahertzgapet”.' },
      { type: 'p', html: 'Det är synd, för strålningen har ovanligt användbara egenskaper: den passerar genom kläder, papper, plast och kartong men stoppas av metall och vatten, och den är ofarlig — fotonernas energi är alldeles för låg för att skada molekyler som röntgenstrålning kan (den är icke-joniserande). Dessutom har många molekyler sina karakteristiska vibrationer just i terahertzområdet, så strålningen kan artbestämma ämnen på avstånd.' },
      { type: 'p', html: 'I takt med att källor och detektorer blivit bättre öppnas tillämpningarna: säkerhetsskannrar på flygplatser, kvalitetskontroll av läkemedel och material, avbildning av gamla målningars dolda lager — och snabb trådlös kommunikation, där terahertzbanden pekas ut som en nyckel till framtidens 6G-nät.' }
    ]
  },
  {
    id: 'tidskristall',
    term: 'Tidskristall',
    former: ['tidskristall', 'tidskristallen', 'tidskristaller', 'tidskristallerna'],
    kort: 'En fas av materia som upprepar sig i tiden i stället för i rummet: systemet tickar av sig självt i en stabil rytm, som en kristall vars mönster ligger i tid.',
    relaterade: ['gitter', 'kvantsammanflatning'],
    body: [
      { type: 'p', html: 'En vanlig kristall är materia som ordnat sig i ett mönster som upprepar sig i <em>rummet</em>: atom, mellanrum, atom, mellanrum. 2012 ställde nobelpristagaren Frank Wilczek en till synes enkel fråga: kan materia i stället ordna sig i ett mönster som upprepar sig i <em>tiden</em> — ett tillstånd som spontant börjar ticka, om och om igen, utan att förbruka energi? Idén verkade först strida mot termodynamiken, och i sin ursprungliga form visade den sig mycket riktigt vara omöjlig.' },
      { type: 'p', html: 'Men en variant överlevde granskningen. Om ett kvantsystem knuffas i jämn takt utifrån — till exempel av laserpulser — kan det välja att svara i en <em>annan</em> takt än knuffarna, typiskt varannan puls, och hålla fast vid sin egen rytm hur länge som helst utan att värmas upp. Systemet har då spontant brutit tidens upprepningsmönster, precis som en kristall bryter rummets likformighet. De första tidskristallerna skapades 2016–2017 i kedjor av infångade joner och i diamantdefekter, och senare har de även körts på kvantdatorer.' },
      { type: 'p', html: 'Tidskristaller är än så länge grundforskning, men deras envisa, störningståliga tickande gör dem intressanta som byggstenar i precisionsklockor och som robusta minnen i kvantteknik.' }
    ]
  },
{
    id: 'ljusar',
    term: 'Ljusår',
    former: ['ljusår', 'ljusåret', 'ljusåren'],
    kort: 'Den sträcka ljuset hinner på ett år: knappt tio biljoner kilometer. Trots namnet är ljusåret ett längdmått, inte ett tidsmått.',
    relaterade: ['parsec', 'vintergatan', 'galaxhop'],
    body: [
      { type: 'p', html: 'Ett ljusår låter som en tid men är en sträcka: precis så långt som ljuset hinner färdas på ett år. Ljuset går knappt 300&nbsp;000&nbsp;km i sekunden — sju varv runt jorden medan du säger ordet — och när man låter den farten fortsätta i ett helt år blir sträckan ungefär 9,46&nbsp;·&nbsp;10<sup>12</sup>&nbsp;km, alltså nästan tio biljoner kilometer.' },
      { type: 'p', html: 'Anledningen till att astronomer inte skriver ut kilometrarna är att talen annars blir omöjliga att känna något inför. Närmaste stjärna efter solen, Proxima Centauri, ligger 4,2 ljusår bort. Skrivet i kilometer blir det fyrtio biljoner — ett tal som säger de flesta ingenting. Granngalaxen Andromeda ligger 2,5 miljoner ljusår bort, och de mest avlägsna galaxer teleskopen når syns med ljus som varit på väg i över tretton miljarder år.' },
      { type: 'p', html: 'Just den väntetiden gör måttet extra användbart. Eftersom ljuset behöver tid på sig ser vi aldrig något i rymden som det är just nu, utan som det var när ljuset lämnade det. Solen ser vi med åtta minuters fördröjning, månen med drygt en sekund, och en galax hundra miljoner ljusår bort ser vi som den såg ut för hundra miljoner år sedan. Varje teleskop är därför också en tidsmaskin: ju längre ut man tittar, desto längre bakåt i universums historia ser man.' },
      { type: 'p', html: 'I populärvetenskap är ljusåret det vanligaste avståndsmåttet, men i forskarnas egna artiklar används oftast parsec i stället.' }
    ]
  },
  {
    id: 'parsec',
    term: 'Parsec',
    former: ['parsec', 'kiloparsec', 'megaparsec', 'gigaparsec'],
    kort: 'Astronomernas egen avståndsenhet, ungefär 3,26 ljusår. Den är definierad utifrån hur mycket en stjärna tycks flytta sig på himlen när jorden rör sig runt solen.',
    relaterade: ['ljusar', 'galaxhop', 'magnitud'],
    body: [
      { type: 'p', html: 'En parsec är ungefär 3,26 ljusår, eller drygt 3,09&nbsp;·&nbsp;10<sup>13</sup>&nbsp;km. Det är ett skevt värde, och det beror på att enheten inte är påhittad för att vara rund — den kommer direkt ur den mätning astronomer använder för att bestämma avstånd till närbelägna stjärnor.' },
      { type: 'p', html: 'Håll upp ett finger framför ansiktet och blunda växelvis med höger och vänster öga: fingret verkar hoppa fram och tillbaka mot bakgrunden. Ju närmare fingret är, desto större hopp. Samma sak händer med stjärnorna när jorden hinner till andra sidan av sin bana ett halvår senare — en närbelägen stjärna tycks då ha flyttat sig en aning mot de avlägsna bakgrundsstjärnorna. Halva den lilla vinkeln kallas stjärnans parallax, och en parsec är definierad som avståndet till en stjärna vars parallax är exakt en bågsekund, det vill säga 1/3600 grad. Namnet är helt enkelt en hopslagning av <em>par</em>allax och båg<em>sec</em>und.' },
      { type: 'p', html: 'Fördelen framför ljusåret är att räkningen blir trivial: avståndet i parsec är precis ett dividerat med parallaxen i bågsekunder. Mätvärdet blir avstånd utan omvägar. I praktiken ligger ingen stjärna så nära att parallaxen når en hel bågsekund — rekordhållaren Proxima Centauri har 0,77 bågsekunder och ligger alltså 1,3 parsec bort.' },
      { type: 'p', html: 'För större avstånd används kiloparsec (tusen parsec) inom vår egen galax, megaparsec (en miljon parsec) mellan galaxer och gigaparsec för de allra största kosmologiska skalorna.' }
    ]
  },
  {
    id: 'solmassa',
    term: 'Solmassa',
    former: ['solmassa', 'solmassan', 'solmassor', 'solmassorna'],
    kort: 'Massan hos vår sol, ungefär 330 000 gånger jordens. Används som måttstock när man anger massan hos stjärnor, svarta hål och hela galaxer.',
    relaterade: ['svart-hal', 'supernova', 'vintergatan'],
    body: [
      { type: 'p', html: 'Solen väger ungefär 2&nbsp;·&nbsp;10<sup>30</sup>&nbsp;kg — en tvåa följd av trettio nollor. Det är omkring 333&nbsp;000 gånger jordens massa, och trots att solsystemet rymmer åtta planeter, hundratals månar och otaliga asteroider sitter drygt 99,8&nbsp;% av all massa i solen själv. Allt annat är småsmulor som blev över.' },
      { type: 'p', html: 'Eftersom kilogram blir lika oanvändbart i astronomin som kilometer använder man solen som referens och anger massor i antal solmassor. Att en stjärna väger 30 solmassor säger genast något meningsfullt: den är mycket tyngre än vår sol, kommer att brinna ut på bara några miljoner år och sluta som en supernova. Ett klot av gas måste väga minst omkring 0,08 solmassor för att trycket i mitten ska räcka till att tända vätefusion — under den gränsen blir det bara en ljummen brun dvärg. Uppåt slutar det någonstans över hundra solmassor, där stjärnans eget strålningstryck blåser bort materialet.' },
      { type: 'p', html: 'Måttstocken används långt utanför stjärnornas värld. Ett svart hål bildat ur en döende stjärna väger några till några tiotals solmassor, medan de supermassiva svarta hålen i galaxernas mitt väger miljoner till miljarder. Vintergatans centrala svarta hål ligger på ungefär fyra miljoner solmassor, och hela Vintergatan med sin mörka materia inräknad på storleksordningen 10<sup>12</sup> solmassor.' }
    ]
  },
  {
    id: 'galaxhop',
    term: 'Galaxhop',
    former: ['galaxhop', 'galaxhopen', 'galaxhopar', 'galaxhoparna', 'galaxkluster', 'galaxklustret', 'galaxklustren'],
    kort: 'Hundratals till tusentals galaxer som hålls samman av sin gemensamma gravitation. Galaxhopar är de största strukturer i universum som fortfarande hänger ihop.',
    relaterade: ['mork-materia', 'vintergatan', 'ytljusstyrka'],
    body: [
      { type: 'p', html: 'Galaxer är sällan ensamma. Gravitationen samlar dem i grupper, och de största samlingarna — hundratals eller tusentals galaxer inom ett område som kan mäta över tio miljoner ljusår tvärs över — kallas galaxhopar. Vintergatan tillhör en blygsam samling på några tiotal galaxer, Lokala galaxgruppen, som i sin tur långsamt dras mot den närmaste riktiga hopen: Virgohopen, ungefär 55 miljoner ljusår bort och med över tusen galaxer.' },
      { type: 'p', html: 'Det mest överraskande med en galaxhop är att galaxerna inte är huvudsaken. Mellanrummen är fyllda av extremt tunn gas som gravitationen har hettat upp till mellan tio och hundra miljoner grader. Så het gas lyser inte i synligt ljus utan i röntgen, och den väger mer än alla hopens stjärnor tillsammans. Ändå räcker inte ens det: galaxerna rör sig så snabbt att de borde ha flugit isär för länge sedan om inte något osynligt höll fast dem. Redan 1933 påpekade Fritz Zwicky detta för Comahopen, och i dag räknar man med att omkring 85&nbsp;% av en galaxhops massa är mörk materia.' },
      { type: 'p', html: 'Större strukturer finns — superhopar och det kosmiska nätets långa filament — men de hålls inte samman, utan dras isär av universums expansion. Mitt i en hop sitter oftast en enormt stor elliptisk galax som vuxit sig jättelik genom att sluka sina grannar; de största galaxer som över huvud taget är kända är just sådana hopmittgalaxer.' }
    ]
  },
  {
    id: 'ytljusstyrka',
    term: 'Ytljusstyrka',
    former: ['ytljusstyrka', 'ytljusstyrkan', 'ytljusstyrkor'],
    kort: 'Hur mycket ljus ett utsträckt objekt sänder ut per ytenhet på himlen, oftast angivet i magnituder per kvadratbågsekund. Låg ytljusstyrka betyder svårfotograferat.',
    relaterade: ['magnitud', 'galaxhop'],
    body: [
      { type: 'p', html: 'Två objekt kan skicka lika mycket ljus till teleskopet och ändå se helt olika ut. En stjärna samlar allt sitt ljus i en enda liten punkt och lyser bländande, medan en galax breder ut lika mycket ljus över en fläck som kan vara större än fullmånen — och då blir varje del av fläcken svag. Ytljusstyrka är måttet på just det: ljus per ytenhet på himlen. Den anges i magnituder per kvadratbågsekund, alltså hur ljus en himmelsruta som är en bågsekund gånger en bågsekund är. Eftersom magnitudskalan är omvänd betyder ett högre tal en svagare, mörkare yta.' },
      { type: 'p', html: 'En egenhet med ytljusstyrkan är att den knappt bryr sig om avståndet. Flyttar man en galax dubbelt så långt bort kommer bara en fjärdedel så mycket ljus fram — men galaxen ser samtidigt ut att täcka en fjärdedel så stor yta på himlen, så ljuset per ytenhet blir detsamma. Ett svagt utbrett objekt förblir alltså svagt hur mycket man än närmar sig det med ett större teleskop.' },
      { type: 'p', html: 'Gränsen sätts i stället av att natthimlen själv lyser, av luftglöd i atmosfären, spritt stjärnljus och zodiakljus. På en riktigt mörk plats ligger himmelsbakgrunden runt 22 magnituder per kvadratbågsekund, och det som är svagare än så drunknar helt enkelt i den. Andromedagalaxen breder ut sig över sex gånger fullmånens bredd men syns ändå knappt för blotta ögat, och i en stad med ljusföroreningar, där himlen kan vara tiotals gånger ljusare, försvinner den helt.' }
    ]
  },
  {
    id: 'magnitud',
    term: 'Magnitud',
    former: ['magnitud', 'magnituden', 'magnituder', 'magnituderna', 'magnitudskalan', 'skenbar magnitud', 'absolut magnitud'],
    kort: 'Astronomernas mått på hur ljust ett himmelsobjekt är. Skalan är både omvänd — lägre tal betyder ljusare — och logaritmisk, så att fem magnituder motsvarar en faktor hundra.',
    relaterade: ['ytljusstyrka', 'parsec', 'supernova'],
    body: [
      { type: 'p', html: 'Två saker med magnitudskalan brukar överraska. Den första är att den går åt fel håll: ju lägre tal, desto ljusare objekt, och de allra starkaste får negativa tal. Den andra är att den är logaritmisk — varje steg är en multiplikation, inte ett tillägg.' },
      { type: 'p', html: 'Båda egenheterna är arv från antiken. Omkring 150 f.Kr. delade den grekiske astronomen Hipparchos in stjärnorna i sex klasser efter ögonmått: de ljusaste kallades stjärnor av första storleken, de nätt och jämnt synliga av sjätte storleken. När man långt senare kunde mäta ljus med instrument visade det sig att ögat uppfattar ljusstyrka logaritmiskt, och att steget från första till sjätte storleken råkade motsvara ungefär en faktor hundra. År 1856 låste Norman Pogson fast skalan vid exakt det: fem magnituder ska betyda en faktor 100 i ljusflöde, vilket ger 100<sup>1/5</sup> ≈ 2,512 gånger per magnitudsteg.' },
      { type: 'p', html: 'Några hållpunkter: solen har magnitud −26,7, fullmånen −12,7, den ljusaste stjärnan Sirius −1,5, och blotta ögat når ner till ungefär 6 under mörk himmel. De djupaste teleskopbilderna når omkring magnitud 30, alltså objekt som är runt fyra miljarder gånger ljussvagare än vad ögat klarar.' },
      { type: 'p', html: 'Talen ovan är skenbara magnituder — hur ljust något ser ut härifrån, vilket beror lika mycket på avståndet som på objektet självt. För att jämföra objektens verkliga ljusstyrka används i stället absolut magnitud: hur ljust objektet skulle se ut om det placerades på standardavståndet 10 parsec. Solen, bländande på vår himmel, har absolut magnitud +4,8 och skulle på det avståndet knappt gå att urskilja.' }
    ]
  },
  {
    id: 'vintergatan',
    term: 'Vintergatan',
    former: ['vintergatan'],
    kort: 'Vår egen galax: en stavspiral med hundratals miljarder stjärnor, ungefär 100 000 ljusår tvärs över. Det ljusa bandet på natthimlen är dess skiva sedd inifrån.',
    relaterade: ['svart-hal', 'ljusar', 'solmassa'],
    body: [
      { type: 'p', html: 'Långt från stadsljus syns ett svagt, disigt band tvärs över natthimlen. Det bandet gav Vintergatan sitt namn, och när Galilei 1610 riktade sitt teleskop mot det upptäckte han att dimman i själva verket består av oräkneliga enskilda stjärnor. Förklaringen till bandets form är att vi sitter mitt inne i en tillplattad skiva av stjärnor: tittar vi längs skivans plan ligger hundratusentals stjärnor bakom varandra och flyter ihop till en sammanhängande strimma, tittar vi rakt ut ur skivan ser vi bara enstaka stjärnor mot tom rymd.' },
      { type: 'p', html: 'Vintergatan är en stavspiral — en avlång stav av stjärnor genom mitten, med spiralarmar som lindar ut från stavens ändar. Skivan mäter ungefär 100&nbsp;000 ljusår tvärs över men är bara några tusen ljusår tjock, och rymmer någonstans mellan hundra och fyrahundra miljarder stjärnor. Solen ligger inte i centrum utan ungefär 26&nbsp;000 ljusår ut, i utkanten av en av armarna, och behöver omkring 230 miljoner år för ett varv runt galaxens mitt.' },
      { type: 'p', html: 'I själva centrum sitter ett supermassivt svart hål som kallas Sagittarius&nbsp;A*, efter stjärnbilden Skytten (på latin Sagittarius) som det ligger i sett från jorden. Det väger ungefär fyra miljoner solmassor. Tjocka stoftmoln blockerar allt synligt ljus mot centrum, så hålet upptäcktes i stället genom att man i infrarött ljus följde enskilda stjärnor som svängde runt en osynlig punkt — ett arbete som gav Nobelpriset i fysik 2020. Runt hela skivan finns dessutom ett väldigt klotformigt moln av mörk materia, som står för det mesta av galaxens massa.' }
    ]
  },
{
    id: 'svart-hal',
    term: 'Svart hål',
    former: ['svart hål', 'svarta hål', 'svarta hålet', 'svarta hålen', 'supermassivt svart hål', 'supermassiva svarta hål', 'supermassiva svarta hålet', 'händelsehorisont', 'händelsehorisonten'],
    kort: 'Ett område där så mycket massa packats ihop på så liten plats att inget kan ta sig därifrån — inte ens ljus. Gränsen kallas händelsehorisonten.',
    relaterade: ['kvasar', 'supernova', 'vit-dvarg'],
    body: [
      { type: 'p', html: 'Namnet lurar: ett svart hål är inte ett hål i rymden utan raka motsatsen — ovanligt mycket materia klämd in på ovanligt liten plats. Ju mer massa som trängs ihop, desto starkare blir gravitationen och desto högre fart krävs för att slita sig loss. Pressas materien hårt nog räcker inte ens ljusets hastighet. Den gränsen kallas händelsehorisonten, och innanför den kommer ingenting ut. Solen skulle behöva klämmas ihop till en kula med 3&nbsp;km radie för att bli ett svart hål, jorden till en kula på ett par centimeter.' },
      { type: 'p', html: 'Det finns två sorter. Stjärnmassehål på några till några tiotals solmassor bildas när kärnan i en mycket tung stjärna kollapsar. Supermassiva svarta hål väger miljoner till miljarder solmassor och sitter i mitten av så gott som varje stor galax — Vintergatans heter Sagittarius&nbsp;A* och är omkring 4&nbsp;miljoner solmassor tungt.' },
      { type: 'p', html: 'Eftersom hålet inte lyser upptäcks det genom sin verkan på omgivningen: stjärnor som svänger kring en osynlig punkt, gas som hettas upp till miljontals grader i en ackretionsskiva utanför horisonten, och sedan 2015 gravitationsvågor från svarta hål som krockar. År 2019 publicerades den första bilden av ett — en glödande ring med en mörk skugga i mitten, i galaxen M87.' },
      { type: 'p', html: 'Nära ett litet svart hål är gravitationen mycket starkare vid fötterna än vid huvudet, och skillnaden skulle dra ut ett föremål till en tunn tråd. Helt svarta är de kanske ändå inte: Stephen Hawking visade 1974 att kvantfysiken borde få dem att avge en ytterst svag strålning och långsamt avdunsta — alldeles för svag för att kunna mätas.' }
    ]
  },
  {
    id: 'supernova',
    term: 'Supernova',
    former: ['supernova', 'supernovan', 'supernovor', 'supernovorna', 'supernovaexplosion', 'supernovaexplosionen', 'supernovaexplosioner', 'supernovarest', 'supernovaresten', 'supernovarester', 'kärnkollapssupernova', 'kärnkollapssupernovor'],
    kort: 'En stjärnexplosion som under några veckor kan lysa lika starkt som en hel galax. Bakom namnet döljer sig två helt olika sätt för en stjärna att sprängas.',
    relaterade: ['vit-dvarg', 'svart-hal', 'nova'],
    body: [
      { type: 'p', html: 'En supernova är det våldsammaste en enskild stjärna kan göra: på några dagar tänds en ljuspunkt som kan mäta sig med hela sin galax, för att sedan blekna bort. Kinesiska astronomer noterade en sådan ”gäststjärna” år 1054, och resterna syns i dag som Krabbnebulosan. Två helt olika processer kan ge samma spektakulära resultat.' },
      { type: 'p', html: 'Den ena drabbar mycket tunga stjärnor, från omkring åtta solmassor och uppåt. En sådan stjärna fusionerar sig fram genom allt tyngre grundämnen, men vid järn tar det stopp — järnfusion ger ingen energi tillbaka. Utan strålningstrycket inifrån kollapsar kärnan på sekunder, de yttre lagren studsar, och en skur av neutriner kastar av stjärnans hölje. Kvar i mitten blir en neutronstjärna eller ett svart hål.' },
      { type: 'p', html: 'Den andra sorten, typ&nbsp;Ia, har ingen tung stjärna inblandad. Här drar en vit dvärg till sig materia från en följeslagare tills den närmar sig sin övre massgräns på ungefär 1,4&nbsp;solmassor. Då antänds kolet i hela stjärnan nästan samtidigt och dvärgen sprängs fullständigt — ingen rest blir kvar. Eftersom smällen alltid sker vid nästan samma massa blir ljusstyrkan nästan densamma varje gång, så typ&nbsp;Ia fungerar som standardljuskällor: ser en svag ut ligger den långt bort. Det var så universums accelererande expansion upptäcktes 1998.' },
      { type: 'p', html: 'Supernovor är också en av naturens verkstäder för tunga grundämnen. Stjärnors normala fusion bygger bara upp till järn; guld och uran kräver de extrema neutronflöden som uppstår i explosioner och i krockar mellan neutronstjärnor. Materialet blandas in i nya gasmoln — atomerna i din kropp har varit inuti stjärnor som sprängts.' }
    ]
  },
  {
    id: 'vit-dvarg',
    term: 'Vit dvärg',
    former: ['vit dvärg', 'vita dvärgen', 'vita dvärgar', 'vita dvärgarna', 'vit dvärgstjärna', 'vita dvärgstjärnan', 'vita dvärgstjärnor', 'chandrasekhargränsen'],
    kort: 'Den utbrunna kärna som blir kvar när en stjärna av solens storlek dör: ungefär lika stor som jorden men lika tung som en stjärna.',
    relaterade: ['nova', 'supernova', 'solmassa'],
    body: [
      { type: 'p', html: 'De flesta stjärnor slutar inte med en explosion utan med en tyst avveckling. När solen om ungefär fem miljarder år gjort slut på sitt bränsle sväller den först upp till en röd jätte och puffar sedan av sina yttre gaslager. Kvar blir den nakna, glödheta kärnan — en vit dvärg, ungefär lika stor som jorden men med en stor del av solens massa kvar. Tätheten blir absurd: en tesked av materialet skulle väga flera ton. Omkring 97&nbsp;% av alla stjärnor i Vintergatan går den vägen.' },
      { type: 'p', html: 'Vad hindrar en så tät kropp från att krympa vidare? Inte fusion, den har upphört. I stället ett rent kvantfysikaliskt motstånd som kallas elektrondegenerationstryck: två elektroner kan inte pressas in i exakt samma tillstånd, så när de trängs ihop tvingas de upp i höga farter och trycker tillbaka utåt. Det ger en märklig konsekvens — ju tyngre en vit dvärg är, desto <em>mindre</em> blir den. Vid ungefär 1,4&nbsp;solmassor räcker motståndet inte längre. Den gränsen kallas Chandrasekhargränsen, efter Subrahmanyan Chandrasekhar som räknade fram den på 1930-talet och fick Nobelpriset i fysik 1983.' },
      { type: 'p', html: 'En nybildad vit dvärg kan ha över 100&nbsp;000&nbsp;°C vid ytan, men den producerar ingen ny energi. Den strålar bara bort sitt värmeförråd och svalnar under miljarder år mot att bli en mörk och kall svart dvärg. Ingen sådan finns ännu: universum är bara 13,8&nbsp;miljarder år gammalt, alldeles för ungt. Närmast ligger Sirius&nbsp;B, 8,6&nbsp;ljusår bort.' }
    ]
  },
  {
    id: 'nova',
    term: 'Nova',
    former: ['nova', 'novan', 'novor', 'novorna', 'novautbrott', 'novautbrottet', 'heliumnova', 'heliumnovan', 'heliumnovor'],
    kort: 'Ett utbrott på ytan av en vit dvärg som drar till sig gas från en granne. Stjärnan blossar upp tiotusenfalt — men överlever, till skillnad från vid en supernova.',
    relaterade: ['vit-dvarg', 'supernova'],
    body: [
      { type: 'p', html: 'Namnet kommer från latinets <em>nova stella</em>, ny stjärna. För blotta ögat såg det nämligen precis så ut: på en himmel man kände utantill tändes plötsligt en stjärna som inte funnits där kvällen innan, för att långsamt blekna bort igen. Först på 1900-talet stod det klart att ingenting nytt fötts — det är en gammal, svag stjärna som tillfälligt lyser upp.' },
      { type: 'p', html: 'Scenen är ett dubbelstjärnesystem där en vit dvärg går i bana nära en vanlig stjärna. Dvärgens hårda gravitation drar över vätgas från grannen, och gasen lägger sig som ett allt tjockare lager på ytan. Lagret pressas samman och blir hetare, och när temperaturen i botten når några miljoner grader tänder vätet i fusion. Eftersom materialet är hoppressat kan det inte utvidga sig och svalna av sig självt, så förbränningen skenar: hela skiktet brinner av på sekunder och slungas ut i rymden. Stjärnan kan bli tiotusentals gånger ljusare på ett dygn och tonar sedan bort under veckor eller månader.' },
      { type: 'p', html: 'Det avgörande är att bara det tunna ytlagret sprängs bort — en nova är alltså ingen liten supernova. Den vita dvärgen är oskadd, börjar genast samla på sig ny gas från grannen och kan göra om alltihop. Vissa system är kända återfallsförbrytare som blossar upp med bara några decenniers mellanrum. Är gasen som dras över heliumrik i stället för väterik kan det bli helium som antänds; sådana utbrott kallas heliumnovor och är ovanligare.' }
    ]
  },
  {
    id: 'exoplanet',
    term: 'Exoplanet',
    former: ['exoplanet', 'exoplaneten', 'exoplaneter', 'exoplaneterna', 'exoplanetatmosfär', 'exoplanetatmosfärer', 'het jupiter', 'heta jupitrar', 'superjord', 'superjorden', 'superjordar', 'superjordarna'],
    kort: 'En planet som kretsar kring en annan stjärna än solen. Flera tusen är i dag kända, och de flesta liknar ingenting i vårt eget solsystem.',
    relaterade: ['spektroskopi', 'ljusar'],
    body: [
      { type: 'p', html: 'Att andra stjärnor borde ha planeter gissade man i århundraden, men ända in på 1990-talet var det bara en gissning. En planet lyser inte själv, och den svaga reflex den ger drunknar i stjärnans bländande ljus — som att försöka se en knappnål bredvid en strålkastare flera mil bort. Genombrottet kom 1995, när Michel Mayor och Didier Queloz hittade 51&nbsp;Pegasi&nbsp;b kring en solliknande stjärna. Upptäckten gav dem Nobelpriset i fysik 2019, och sedan dess har listan vuxit till flera tusen bekräftade exoplaneter.' },
      { type: 'p', html: 'Två metoder står för de flesta fynden, och båda studerar stjärnan i stället för planeten. Transitmetoden mäter stjärnans ljusstyrka och väntar på att en planet ska passera framför den: ljuset dippar en aning, regelbundet, varje varv. En jupiterstor planet skymmer ungefär en procent av en solliknande stjärna, en jordstor bara någon hundradels procent. Radialhastighetsmetoden utnyttjar i stället att stjärnan och planeten kretsar kring en gemensam tyngdpunkt, så att stjärnan vaggar. Vaggningen syns som en periodisk förskjutning av färgerna i stjärnans ljus — Jupiter får solen att vagga med omkring 12&nbsp;m/s, ungefär cykelfart.' },
      { type: 'p', html: 'Skörden har varit full av överraskningar. Den allra första är en gasjätte som rundar sin stjärna på fyra dygn — en ”het jupiter”, en planettyp ingen räknat med. Vanligast av allt verkar vara superjordar och små gasplaneter med storlek mellan jordens och Neptunus, alltså precis det som saknas hos oss. Passerar planeten framför sin stjärna filtreras dessutom en gnutta stjärnljus genom dess atmosfär, och av vilka våglängder som försvinner kan astronomer läsa ut vilka gaser den innehåller.' }
    ]
  },
  {
    id: 'komet',
    term: 'Komet',
    former: ['komet', 'kometen', 'kometer', 'kometerna', 'kometkärna', 'kometkärnan', 'kometkärnor', 'kometsvans', 'kometsvansen', 'mörk komet', 'mörka kometer', 'mörka kometen'],
    kort: 'En klump av is och stoft från solsystemets kalla utkanter. Kommer den nära solen förångas isen och bildar ett lysande gasmoln och en svans.',
    relaterade: ['asteroid', 'plasma'],
    body: [
      { type: 'p', html: 'Långt ute i solsystemet, där solen bara är en ljusprick bland andra, ligger miljardtals frusna klumpar kvar sedan planeterna bildades. En kometkärna är typiskt några kilometer stor och består av vattenis och frusna gaser blandat med stoft och sot — den brukar beskrivas som en smutsig snöboll. Kall och kolsvart är den osynlig från jorden; det spektakulära händer först när banan för in den nära solen.' },
      { type: 'p', html: 'Då värms ytan och isen sublimerar, alltså går direkt från fast form till gas utan att smälta först. Gasen strömmar ut och drar med sig stoft, så att kärnan omges av ett lysande dimmoln — en koma — som kan bli hundratusentals kilometer i diameter, långt större än jordklotet. Solens strålning och solvinden knuffar undan gas och stoft till en svans som kan bli tiotals miljoner kilometer lång. Här sitter den vanligaste missuppfattningen: svansen släpar inte efter kometen som röken efter ett tåg, utan pekar <em>bort från solen</em>. På väg ut ur solsystemet färdas kometen alltså med svansen först. Ofta syns två svansar: en böjd av stoft och en rakare av laddad gas.' },
      { type: 'p', html: 'Kometer delas grovt in efter omloppstid. De kortperiodiska varvar solen på mindre än 200&nbsp;år och kommer från det isiga Kuiperbältet utanför Neptunus; Halleys komet återvänder vart 76:e år. De långperiodiska kan ta tiotusentals år på ett varv och kommer från Oorts moln allra längst ut. På senare år har astronomer också ringat in en mellanform, ”mörka kometer”: objekt som ser ut som asteroider utan koma eller svans, men som ändå knuffas ur sin bana av utströmmande gas.' }
    ]
  },
  {
    id: 'asteroid',
    term: 'Asteroid',
    former: ['asteroid', 'asteroiden', 'asteroider', 'asteroiderna', 'asteroidbälte', 'asteroidbältet', 'jordnära asteroid', 'jordnära asteroider'],
    kort: 'En sten- eller metallkropp i bana kring solen, för liten för att kallas planet. De flesta finns i asteroidbältet mellan Mars och Jupiter.',
    relaterade: ['komet'],
    body: [
      { type: 'p', html: 'Asteroider är byggmaterial som blev över. När solsystemet bildades för 4,6&nbsp;miljarder år sedan klumpade stoft och grus ihop sig till allt större kroppar, och på de flesta ställen växte de vidare till planeter. Mellan Mars och Jupiter gick det inte: Jupiters gravitation piskade upp farterna där, så att krockarna krossade i stället för att bygga. Kvar blev ett bälte av spillror i alla storlekar — från Ceres på omkring 940&nbsp;km i diameter, stor nog att räknas som dvärgplanet, ner till stenar på några meter.' },
      { type: 'p', html: 'Trots antalet är bältet inget minfält. Lägger man ihop allt material där blir det bara några procent av månens massa, utspritt över ett enormt område, och avstånden mellan grannarna mäts i miljoner kilometer — rymdsonder passerar rakt igenom utan risk. Eftersom asteroiderna aldrig smälte samman till en planet är de i praktiken fryst ursprungsmaterial, och prover som sonder hämtat hem ger en direkt inblick i hur solsystemet såg ut innan planeterna fanns.' },
      { type: 'p', html: 'Alla håller sig inte i bältet. Över 30&nbsp;000 jordnära asteroider har banor som tar dem in i jordens grannskap, och deras vägar bevakas noga. Metoden är enkel i grunden: mät positionen på himlen vid flera tillfällen, anpassa en bana som följer gravitationens lagar och räkna framåt i tiden. Att hotet är verkligt visar kratern efter den 10&nbsp;km stora kropp som slog ner för 66&nbsp;miljoner år sedan och bidrog till dinosauriernas utdöende. År 2022 testades ett motmedel för första gången: rymdsonden DART kolliderade avsiktligt med asteroiden Dimorphos och kortade dess omloppstid med drygt en halvtimme.' }
    ]
  },
{
    id: 'laser',
    term: 'Laser',
    former: ['laser', 'lasern', 'lasrar', 'lasrarna', 'laserstråle', 'laserstrålen', 'laserstrålar', 'laserpuls', 'laserpulsen', 'laserpulser', 'laserljus', 'laserljuset', 'laserkylning', 'diodlaser', 'diodlasern', 'diodlasrar', 'diodlasrarna', 'precisionslaser', 'precisionslasrar', 'terahertzlaser', 'terahertzlasrar', 'titan-safirlaser', 'titan-safirlasern', 'titan-safirlasrar', 'titan-safirlasrarna', 'fiberlaser', 'fiberlasern', 'fiberlasrar'],
    kort: 'En ljuskälla som skickar ut en smal, skarpt riktad stråle där alla ljusvågor har samma våglängd och svänger i takt. Namnet är en förkortning av engelskans light amplification by stimulated emission of radiation.',
    relaterade: ['foton', 'exciterat-tillstand', 'optisk-fiber'],
    body: [
      { type: 'p', html: 'Tänd en ficklampa och en laserpekare bredvid varandra så syns skillnaden direkt: ficklampans sken sprider ut sig åt alla håll och innehåller alla möjliga färger, medan laserns stråle håller ihop som en tunn nål av en enda färg. Skillnaden sitter i hur ljuset skapas. I en glödlampa skickar varje atom ut sin ljuspartikel för sig, oberoende av grannarna. En laser utnyttjar i stället <em>stimulerad emission</em>, en effekt som Einstein förutsade redan 1917: passerar en foton en atom som redan är exciterad kan den knuffa ner atomen i förtid, och den nya fotonen blir en exakt kopia av den första — samma våglängd, samma riktning, i takt med originalet.' },
      { type: 'p', html: 'För att kopiorna ska hinna bli många sitter det aktiva materialet — en kristall, en gas eller en halvledarbit — mellan två speglar som bildar en resonator. Ljuset studsar fram och tillbaka och förstärks för varje varv. Samtidigt pumpas materialet med energi, från en ström, en blixtlampa eller en annan laser, tills fler atomer befinner sig i det exciterade tillståndet än i grundtillståndet. Det kallas inversion och är nödvändigt: annars skulle ljuset absorberas mer än det förstärks. Den ena spegeln släpper igenom någon procent av ljuset, och det som kommer ut där är laserstrålen.' },
      { type: 'p', html: 'Ljuset får därmed tre ovanliga egenskaper: det är koherent (vågorna svänger i takt), riktat (en stråle som skickas mot månen har breddats till bara några kilometer när den kommer fram) och smalbandigt (i praktiken en enda våglängd). Den första fungerande lasern byggdes 1960. I dag finns de överallt: i streckkodsläsare, i fiberkommunikation, i ögonoperationer och materialbearbetning — och i laboratorier, där laserljus används för att bromsa atomer till nära absoluta nollpunkten.' }
    ]
  },
  {
    id: 'foton',
    term: 'Foton',
    former: ['foton', 'fotonen', 'fotoner', 'fotonerna', 'ljuspartikel', 'ljuspartikeln', 'ljuspartiklar', 'röntgenfoton', 'röntgenfotonen', 'röntgenfotoner', 'röntgenfotonerna'],
    kort: 'Ljusets minsta odelbara energipaket — en partikel utan massa som alltid rör sig med ljusets hastighet. Energin bestäms av ljusets frekvens, alltså av färgen.',
    relaterade: ['vaglangd', 'laser', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Frågan om ljus är en vågrörelse eller en ström av partiklar var länge en av fysikens hetaste stridsfrågor. Svaret blev: både och. När Max Planck och Albert Einstein i början av 1900-talet skulle förklara hur glödande föremål strålar, och hur ljus kan slå loss elektroner ur en metallyta, tvingades de anta att ljusenergin kommer i odelbara portioner. En sådan portion kallas en foton. Energin ges av <em>E</em> = <em>h</em> · <em>f</em>, där <em>f</em> är ljusets frekvens och <em>h</em> är Plancks konstant, ungefär 6,63 · 10<sup>−34</sup>&nbsp;J·s. Blått ljus svänger snabbare än rött, så varje blå foton bär mer energi än en röd.' },
      { type: 'p', html: 'Det viktigaste i formeln är vad som <em>inte</em> står i den: intensiteten. Att skruva upp ljusstyrkan ger fler fotoner per sekund, men varje enskild foton behåller sin energi. Därför kan hur starkt rött ljus som helst vara oförmöget att slå loss en enda elektron ur en metallyta, medan svagt ultraviolett ljus gör det omedelbart. Det är den fotoelektriska effekten, och förklaringen av den gav Einstein nobelpriset för året 1921.' },
      { type: 'p', html: 'Fotonen saknar massa och rör sig alltid med ljusets hastighet, knappt 300&nbsp;000&nbsp;km/s i vakuum. Den kan varken stå still eller bromsas in — bara skapas och absorberas. Ändå beter sig ljus fortfarande som en våg: skickas det genom två smala spalter bildas ett randmönster på skärmen bakom, även om fotonerna skickas i väg en och en. Det kallas våg–partikel-dualitet. Moderna detektorer registrerar enskilda fotoner, och ögat är nästan lika känsligt: en mörkeranpassad stavcell i näthinnan reagerar på några få fotoner.' }
    ]
  },
  {
    id: 'vaglangd',
    term: 'Våglängd',
    former: ['våglängd', 'våglängden', 'våglängder', 'våglängderna'],
    kort: 'Avståndet mellan två närliggande vågtoppar. För ljus avgör våglängden färgen, och tillsammans med ljushastigheten bestämmer den frekvensen.',
    relaterade: ['foton', 'spektroskopi', 'interferens'],
    body: [
      { type: 'p', html: 'Titta på havsvågor som rullar in mot en strand: avståndet från en vågtopp till nästa är vågens våglängd. Samma mått används för alla vågrörelser — ljud, radiovågor, ljus — och betecknas med den grekiska bokstaven <em>λ</em> (lambda). Våglängden hänger ihop med frekvensen, alltså hur många vågtoppar som passerar en punkt varje sekund, genom sambandet <em>c</em> = <em>λ</em> · <em>f</em>. För ljus i vakuum är <em>c</em> ljushastigheten, ungefär 3,00 · 10<sup>8</sup>&nbsp;m/s, och den är densamma för allt ljus. Lång våglängd betyder därför låg frekvens, kort våglängd hög.' },
      { type: 'p', html: 'Hela det elektromagnetiska spektrumet är i grunden samma sorts vågor — bara med olika våglängd. Radiovågor mäts i meter eller kilometer, mikrovågor i centimeter (en mikrovågsugn arbetar kring 12&nbsp;cm), infrarött i mikrometer. Det synliga ljuset upptar en förvånansvärt smal remsa, från omkring 400&nbsp;nm (violett) till omkring 700&nbsp;nm (rött), där en nanometer är 10<sup>−9</sup>&nbsp;m. Ännu kortare är ultraviolett, röntgen och gammastrålning. Eftersom varje fotons energi växer med frekvensen är det just den korta våglängden som gör strålning energirik.' },
      { type: 'p', html: 'Våglängden sätter också en gräns för vad som går att se. Ett vanligt ljusmikroskop kan inte visa detaljer som är mycket mindre än ljusets våglängd — vågen böjer sig helt enkelt runt dem. Vill man se mindre måste man byta till något med kortare våglängd: elektroner i ett elektronmikroskop, eller röntgen när avstånden mellan atomerna i en kristall ska mätas.' }
    ]
  },
  {
    id: 'spektroskopi',
    term: 'Spektroskopi',
    former: ['spektroskopi', 'spektroskopin', 'spektroskopisk', 'spektroskopiskt', 'spektroskopiska', 'spektrum', 'spektrumet', 'spektret', 'spektra', 'spektrometer', 'spektrometern', 'laserspektroskopi', 'fotoelektronspektroskopi'],
    kort: 'Konsten att dela upp ljus efter våglängd och läsa av mönstret av ljusa och mörka linjer. Eftersom varje grundämne har sitt eget linjemönster går det att bestämma vad något består av utan att röra vid det.',
    relaterade: ['vaglangd', 'gitter', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Låter man solljus passera ett prisma eller ett optiskt gitter delas det upp i regnbågens färger efter våglängd. Tittar man riktigt noga på det uppdelade solljuset visar det sig att regnbågen är genomkorsad av smala mörka streck. Joseph von Fraunhofer kartlade hundratals av dem kring 1814 utan att veta vad de var. Förklaringen kom senare: atomerna i solens svalare ytterlager plockar bort exakt de våglängder som svarar mot hopp mellan deras egna energinivåer. Varje grundämne har sin egen uppsättning nivåer — och därmed sitt eget streckkodsliknande fingeravtryck.' },
      { type: 'p', html: 'Att läsa av det mönstret kallas spektroskopi. En het, tunn gas ger ljusa linjer på precis samma våglängder som ett svalare skikt ger mörka. Natrium lyser till exempel i ett gult par vid 589&nbsp;nm — samma gula ton som i gatlyktor och i en flamma man strör salt i. Metoden är så pålitlig att grundämnet helium upptäcktes i solens spektrum 1868, nästan trettio år innan någon hittade det på jorden. Namnet kommer av grekiskans <em>helios</em>, sol.' },
      { type: 'p', html: 'I dag är spektroskopi det viktigaste sättet att undersöka något man aldrig kan besöka. Ur ett spektrum går det att läsa av sammansättning, temperatur, täthet och tryck. Rör sig källan mot eller från oss förskjuts alla linjer i våglängd, ett dopplerskift som avslöjar farten — så upptäcktes både universums expansion och de första exoplaneterna. Sitter källan dessutom i ett magnetfält splittras linjerna, så även fältstyrkan går att mäta på miljarder ljusårs avstånd.' }
    ]
  },
  {
    id: 'optisk-fiber',
    term: 'Optisk fiber',
    former: ['optisk fiber', 'optiska fibern', 'optiska fibrer', 'optiska fibrerna', 'fiberoptik', 'fiberoptiken', 'fiberoptisk', 'fiberoptiska', 'fiberkabel', 'fiberkabeln', 'fiberkablar', 'fiberkommunikation', 'glasfiber', 'glasfibern'],
    kort: 'En hårstråtunn tråd av mycket rent glas som leder ljus långa sträckor genom totalreflektion. Optiska fibrer bär i dag nästan all internettrafik mellan städer och över haven.',
    relaterade: ['laser', 'vaglangd', 'fotonisk-kristall'],
    body: [
      { type: 'p', html: 'Ljus går rakt fram — men i en optisk fiber kan det ledas runt hörn, kilometer efter kilometer. Tricket heter totalreflektion. Fibern har en kärna av mycket rent glas omgiven av en mantel med något lägre brytningsindex. Ljus som träffar gränsytan mellan kärna och mantel tillräckligt snett kastas helt och hållet tillbaka in i kärnan, utan att någon del läcker ut i manteln. Strålen studsar därför fram genom fibern som i en spegeltunnel, oavsett hur kabeln slingrar sig. I den vanligaste typen, enkelmodsfiber, är kärnan bara omkring 9&nbsp;µm i diameter och hela glastråden 125&nbsp;µm — tunnare än ett hårstrå.' },
      { type: 'p', html: 'Hur bra en fiber är anges som dämpning i decibel per kilometer. Modernt fiberglas ligger runt 0,2&nbsp;dB/km, vilket betyder att ungefär hälften av ljuset finns kvar först efter 15&nbsp;km. Så lågt blir värdet bara vid en viss våglängd, 1550&nbsp;nm i det nära infraröda området, där glaset är som allra klarast — därför skickas fibersignaler med osynligt infrarött laserljus i stället för synligt. Sträckor på tio mil eller mer klaras utan att signalen behöver läsas om, och i sjökablarna sitter optiska förstärkare med jämna mellanrum.' },
      { type: 'p', html: 'En enda fiber kan bära dussintals våglängder samtidigt, var och en med sin egen datakanal, vilket ger kapaciteter i storleksordningen terabit per sekund. Fibrer används också som sensorer: ljuset som sprids tillbaka påverkas av töjning, temperatur och vibrationer, så en enda kabel kan känna av jordskalv, tågtrafik eller ett kabelbrott och tala om var längs sträckan det hände.' }
    ]
  },
  {
    id: 'gammastralning',
    term: 'Gammastrålning',
    former: ['gammastrålning', 'gammastrålningen', 'gammastråle', 'gammastrålen', 'gammastrålar', 'gammafoton', 'gammafotonen', 'gammafotoner', 'gammakvanta', 'gammablixt', 'gammablixten', 'gammablixtar', 'gammablixtarna'],
    kort: 'Elektromagnetisk strålning med allra kortast våglängd och högst energi per foton. Den kommer från atomkärnor och från universums våldsammaste händelser, och är kraftigt joniserande.',
    relaterade: ['foton', 'vaglangd', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Gammastrålning ligger allra längst ut i det elektromagnetiska spektrumet: kortast våglängd, högst frekvens och därmed högst energi per foton. Våglängderna är typiskt kortare än 10<sup>−11</sup>&nbsp;m, alltså mindre än en atom, och en enskild gammafoton kan bära omkring en miljon gånger mer energi än en foton synligt ljus. Gränsen mot röntgenstrålning handlar mer om ursprung än om exakt våglängd: röntgen uppstår när elektroner bromsas eller byter energinivå, medan gammastrålning kommer från själva atomkärnan.' },
      { type: 'p', html: 'Den vanligaste källan är radioaktiva sönderfall. Efter ett alfa- eller betasönderfall lämnas den nybildade kärnan ofta i ett exciterat tillstånd, med energi över. När kärnan deexciteras skickas överskottet ut som en gammafoton. Till skillnad från alfa- och betasönderfall ändras då varken antalet protoner eller neutroner — bara kärnans energi. Gammafotoner bildas också när materia och antimateria möts och förintar varandra.' },
      { type: 'p', html: 'Energin räcker gott för att slita loss elektroner ur atomer, alltså jonisera dem, och därmed för att skada arvsmassan i levande celler. Medan alfastrålning stoppas av ett papper och betastrålning av en aluminiumplåt krävs tjockt bly eller betong för att dämpa gammastrålning, och den försvinner aldrig helt utan bara gradvis. Samma genomträngande kraft gör den användbar: strålbehandling där många svaga strålar korsas i en tumör, sterilisering av sjukvårdsmaterial och kryddor, och genomlysning av svetsfogar i rör.' },
      { type: 'p', html: 'De våldsammaste gammakällorna finns i rymden. Gammablixtar — korta utbrott från kollapsande jättestjärnor eller kolliderande neutronstjärnor miljarder ljusår bort — frigör på några sekunder mer energi än solen hinner stråla ut under hela sin livstid. De upptäcktes av en slump på 1960-talet, av amerikanska satelliter som egentligen letade efter hemliga kärnvapenprov.' }
    ]
  },
{
    id: 'kvantmekanik',
    term: 'Kvantmekanik',
    former: ['kvantmekanik', 'kvantmekaniken', 'kvantmekanisk', 'kvantmekaniskt', 'kvantmekaniska', 'kvantfysik', 'kvantfysiken', 'kvanta', 'kvantum', 'kvanttillstånd', 'kvanttillståndet', 'superposition', 'superpositionen', 'obestämdhetsrelationen', 'obestämdhetsrelation'],
    kort: 'Teorin för materiens allra minsta beståndsdelar. Där kommer energi i bestämda portioner, partiklar beter sig som vågor, och naturen svarar med sannolikheter i stället för säkra besked.',
    relaterade: ['kvantsammanflatning', 'foton', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'I början av 1900-talet gick den klassiska fysiken i stå. Den kunde inte förklara varför en glödande kropp lyser som den gör, varför atomerna inte kollapsar, eller varför varje grundämne bara sänder ut vissa bestämda färger. Lösningen visade sig vara lika enkel som omvälvande: på den allra minsta skalan kommer energi inte i en jämn ström utan i bestämda portioner, kvanta. En elektron i en atom kan inte ha vilken energi som helst, lika lite som du kan stå mellan två pinnar på en stege.' },
      { type: 'p', html: 'Kvantmekaniken lade till två saker som strider mot vardagsförnuftet. Det ena är att allt smått har både våg- och partikelegenskaper: skickar man elektroner mot två smala spalter bildas ett randmönster på skärmen bakom, precis som av en vattenvåg — men varje elektron träffar skärmen i en enda punkt, som en kula. Det andra är att teorin bara ger sannolikheter. Man kan räkna ut exakt hur stor chansen är att elektronen hamnar på ett visst ställe, men inte vilket ställe det blir i just det försöket. Obestämdhetsrelationen sätter dessutom en principiell gräns: ju bättre man känner en partikels läge, desto sämre känner man dess rörelsemängd — och det beror inte på slarviga instrument utan på hur naturen är byggd.' },
      { type: 'p', html: 'Varför märks inget av detta när du kastar en boll? För att effekterna skalas av en mycket liten naturkonstant, Plancks konstant <em>h</em> ≈ 6,63&nbsp;·&nbsp;10<sup>−34</sup>&nbsp;J·s. För vardagsföremål blir kvanteffekterna så försvinnande små att den klassiska fysiken räcker gott. Trots sin egendomlighet är kvantmekaniken den mest välprövade teori fysiken har, och den är helt nödvändig för transistorn i varje dator, för lysdioden, lasern och magnetkameran.' }
    ]
  },
  {
    id: 'kvantdator',
    term: 'Kvantdator',
    former: ['kvantdator', 'kvantdatorn', 'kvantdatorer', 'kvantdatorerna', 'qubit', 'qubitar', 'qubitarna', 'kvantbit', 'kvantbiten', 'kvantbitar', 'kvantberäkning', 'kvantberäkningar', 'kvantalgoritm', 'kvantalgoritmer', 'dekoherens', 'dekoherensen'],
    kort: 'En dator som räknar med kvantmekanikens regler. Dess minnesceller, qubits, kan befinna sig i en blandning av 0 och 1 samtidigt — vilket öppnar nya sätt att angripa vissa problem.',
    relaterade: ['kvantsammanflatning', 'kvantmekanik', 'supraledare'],
    body: [
      { type: 'p', html: 'En vanlig dator bygger på bitar som är antingen 0 eller 1, som strömbrytare i två lägen. En kvantdator använder i stället qubits, kvantbitar, som lyder kvantmekanikens regler: en qubit kan befinna sig i en superposition, en blandning av 0 och 1 samtidigt, och flera qubits kan sammanflätas så att de bildar ett enda gemensamt tillstånd. Med <em>n</em> qubits rymmer maskinen därför 2<sup><em>n</em></sup> möjligheter på en gång — redan 300 qubits ger fler kombinationer än det finns atomer i det synliga universum.' },
      { type: 'p', html: 'Men en kvantdator är inte bara en snabbare dator. Läser man av qubitarna kollapsar superpositionen och man får ut ett helt vanligt svar av nollor och ettor. Konsten ligger i att skriva algoritmer där de felaktiga svaren släcker ut varandra genom interferens medan det rätta förstärks, och sådana algoritmer känner man bara till för vissa problemtyper: faktorisering av stora tal (som mycket av dagens kryptering vilar på), simulering av molekyler och kemiska reaktioner, samt vissa sök- och optimeringsproblem. På ordbehandling, videoströmning och det mesta annat är en kvantdator hopplöst underlägsen en vanlig.' },
      { type: 'p', html: 'Det stora hindret heter dekoherens. Ett kvanttillstånd är oerhört skört: minsta värmeskakning eller elektriska brus från omgivningen förstör det på bråkdelar av en sekund. Därför körs de flesta kvantdatorer nedkylda till nära absoluta nollpunkten, och därför krävs felkorrigering, där hundratals eller tusentals fysiska qubits samverkar för att bilda en enda pålitlig ”logisk” qubit. Dagens maskiner har i storleksordningen hundra till tusen brusiga qubits — imponerande, men fortfarande långt ifrån de felkorrigerade maskiner som skulle kunna knäcka verklig kryptering.' }
    ]
  },
  {
    id: 'standardmodellen',
    term: 'Standardmodellen',
    former: ['standardmodellen', 'standardmodell', 'kvark', 'kvarken', 'kvarkar', 'kvarkarna', 'lepton', 'leptonen', 'leptoner', 'leptonerna', 'gluon', 'gluonen', 'gluoner', 'gluonerna', 'fermion', 'fermioner', 'fermionerna', 'elementarpartikel', 'elementarpartiklar', 'elementarpartiklarna', 'nedkvark', 'nedkvarkar', 'uppkvark', 'uppkvarkar', 'pentakvark', 'pentakvarkar'],
    kort: 'Partikelfysikens grundkarta: en lista över materiens minsta byggstenar och de partiklar som förmedlar krafterna mellan dem. Den beskriver tre av naturens fyra krafter — gravitationen står utanför.',
    relaterade: ['higgsbosonen', 'boson', 'neutrino', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'Allt du kan ta på består av atomer, atomerna av elektroner och atomkärnor, och kärnorna av protoner och neutroner. Där tog uppdelningen slut länge — men protoner och neutroner visade sig i sin tur bestå av kvarkar. Standardmodellen är listan där allt detta samlas: tolv materiepartiklar, nämligen sex kvarkar (upp, ner, sär, charm, botten och topp) och sex leptoner (elektronen, myonen, tauonen och deras tre neutriner). De är ordnade i tre generationer, där varje generation är en tyngre kopia av den föregående. Vanlig materia klarar sig med den lättaste: uppkvark, nedkvark och elektron. De tyngre släktingarna sönderfaller nästan omedelbart.' },
      { type: 'p', html: 'Till detta kommer krafternas budbärare. Elektromagnetismen förmedlas av fotonen, den starka kraften som håller ihop atomkärnan av gluoner, och den svaga kraften — den som driver vissa radioaktiva sönderfall — av W- och Z-partiklarna. Sist i uppställningen står higgsbosonen, som hör ihop med det fält som ger de övriga partiklarna massa. Varje materiepartikel har dessutom en antipartikel med motsatt laddning.' },
      { type: 'p', html: 'Standardmodellen är extremt välprövad; vissa av dess förutsägelser stämmer med mätningar på tio värdesiffrors noggrannhet. Ändå vet alla att den är ofullständig. Gravitationen finns inte med alls. Den säger ingenting om mörk materia eller mörk energi, som tillsammans utgör det mesta av universums innehåll. Den förutsåg inte att neutriner har massa. Och den förklarar inte varför universum blev fullt av materia i stället för lika delar materia och antimateria. Standardmodellen är alltså inte slutmålet, utan den bästa karta vi har hittills.' }
    ]
  },
  {
    id: 'baryon',
    term: 'Baryon',
    former: ['baryon', 'baryonen', 'baryoner', 'baryonerna', 'baryontal', 'baryontalet', 'baryontalen', 'antibaryon', 'antibaryonen', 'antibaryoner', 'valenskvark', 'valenskvarken', 'valenskvarkar', 'valenskvarkarna'],
    kort: 'Samlingsnamn för partiklar byggda av tre kvarkar — protonen och neutronen är de två vanliga. Varje baryon tilldelas baryontalet 1, ett bokföringstal som aldrig har observerats ändra sig.',
    relaterade: ['standardmodellen', 'baryonknut', 'stark-vaxelverkan', 'antimateria'],
    body: [
      { type: 'p', html: 'Nästan all massa omkring dig sitter i baryoner. Ordet betyder ungefär ”de tunga” och står för partiklar som är byggda av tre kvarkar, till skillnad från exempelvis pioner som består av en kvark och en antikvark. Protonen (två uppkvarkar och en nedkvark) och neutronen (en uppkvark och två nedkvarkar) är de enda baryoner som är stabila nog att bygga materia av. Det finns ett femtiotal tyngre släktingar med namn som lambda, sigma och omega, men de sönderfaller inom bråkdelar av en mikrosekund.' },
      { type: 'p', html: 'De tre kvarkarna som ger baryonen dess identitet kallas valenskvarkar. Inne i partikeln bubblar dessutom ett hav av kortlivade kvark–antikvarkpar och gluoner, men de tar ut varandra i räkningen: nettot är alltid tre kvarkar. Varje baryon får därför baryontalet 1, och varje antibaryon −1. Alla andra partiklar — elektroner, neutriner, fotoner — har baryontalet 0.' },
      { type: 'p', html: 'Poängen med talet är att det verkar bevaras. I varenda reaktion som någonsin har mätts är summan av baryontalen densamma före och efter. Det är just den regeln som gör protonen odödlig: den är den lättaste baryonen, så det finns ingenting lättare med samma baryontal att sönderfalla till. Regeln är dock ingen härledd naturlag utan ett mönster, och flera teorier bortom standardmodellen förutsäger att den ändå bryts, ytterst sällan. Utan ett sådant brott någon gång i det tidiga universum är det svårt att förklara varför det finns materia men nästan ingen antimateria.' }
    ]
  },
  {
    id: 'baryonknut',
    term: 'Baryonknut',
    former: ['baryonknut', 'baryonknuten', 'baryonknutar', 'gluonknut', 'gluonknuten', 'gluonsträng', 'gluonsträngen', 'gluonsträngar', 'gluonsträngarna'],
    kort: 'En Y-formad punkt inne i en proton eller neutron, där de tre kraftfälten från kvarkarna möts. Enligt en omdiskuterad idé är det knuten, inte kvarkarna, som bär partikelns baryontal.',
    relaterade: ['baryon', 'stark-vaxelverkan', 'standardmodellen'],
    body: [
      { type: 'p', html: 'Kraften mellan två kvarkar avtar inte med avståndet, utan är i stort sett konstant — som ett gummiband. Därför brukar man rita kraftfältet som en smal sträng i stället för som ett fält som breder ut sig. I en partikel med tre kvarkar behövs tre sådana strängar, och de kan inte bara sluta i tomma intet. De måste mötas i en gemensam punkt, och mötespunkten blir en Y-formad knut av gluoner.' },
      { type: 'p', html: 'Knuten föreslogs 1977 i en strängteoretisk beskrivning av hur baryoner hänger ihop. Länge sågs den som en ritteknisk detalj. År 1996 kom förslaget att den kan vara något mer: att det är knuten, och inte de tre kvarkarna, som bär baryontalet. Skillnaden går att pröva, eftersom kvarkarna bär nästan all rörelsemängd medan knuten bär nästan ingen. I en kollision plöjer kvarkarna vidare framåt, medan en knut lätt kan bromsas in och bli kvar mitt i kollisionszonen.' },
      { type: 'p', html: 'Ingen har sett en knut direkt, och det går heller inte — den är inte en partikel som kan fångas i en detektor, utan en egenskap hos kraftfältet inne i en annan partikel. Det man kan göra är att räkna var baryontalet hamnar efter en krock och jämföra med vad de två bilderna förutsäger. Frågan hör till de mest grundläggande som finns i fysiken: vad är det egentligen som gör en proton till en proton?' }
    ]
  },
  {
    id: 'stark-vaxelverkan',
    term: 'Stark växelverkan',
    former: ['stark växelverkan', 'starka växelverkan', 'stark kärnkraft', 'starka kärnkraften', 'starka kraften', 'färgladdning', 'färgladdningen', 'färgladdningar', 'kvantkromodynamik', 'kvantkromodynamiken', 'gluonfält', 'gluonfältet'],
    kort: 'Den kraft som håller ihop kvarkarna inne i protoner och neutroner, och som i förlängningen håller ihop atomkärnan. Den är starkast av naturens fyra krafter men når bara några få kärndiametrar.',
    relaterade: ['baryon', 'baryonknut', 'standardmodellen', 'karnfusion'],
    body: [
      { type: 'p', html: 'En atomkärna borde inte finnas. Protonerna i den är positivt laddade och stöter bort varandra kraftfullt på så korta avstånd. Att kärnan ändå håller ihop beror på en kraft som är ungefär hundra gånger starkare än den elektriska, men som bara verkar över ungefär en kärndiameter. Den kallas den starka växelverkan. Egentligen verkar den mellan kvarkarna inne i protoner och neutroner; det som håller ihop kärnpartiklarna med varandra är ett slags läckage av den kraften utanför partiklarnas kant.' },
      { type: 'p', html: 'Kraftens bärare heter gluoner, och den egenskap de reagerar på kallas färgladdning. Namnet har ingenting med färg att göra — det är bara en etikett för tre sorters laddning, ungefär som plus och minus i elektriciteten men med tre varianter i stället för två. Teorin för alltihop heter kvantkromodynamik. Det märkliga är att gluonerna själva bär färgladdning, till skillnad från fotonen som är elektriskt neutral. Därför drar kraftfältet ihop sig till smala strängar i stället för att breda ut sig.' },
      { type: 'p', html: 'Det ger kraften dess mest kända egenhet: den avtar inte med avståndet. Drar man i en kvark växer energin i fältet stadigt, tills det finns tillräckligt mycket energi för att skapa ett nytt kvarkpar — och i stället för en lös kvark står man med två partiklar. En ensam kvark har därför aldrig observerats. Energin i det här fältet svarar dessutom för omkring 99 procent av protonens massa; kvarkarnas egen massa är närmast försumbar i sammanhanget.' }
    ]
  },
  {
    id: 'isobar',
    term: 'Isobar',
    former: ['isobar', 'isobaren', 'isobarer', 'isobarerna', 'isobarkärna', 'isobarkärnor'],
    kort: 'Två atomkärnor som innehåller lika många kärnpartiklar totalt, men olika många protoner. De väger nästan exakt lika mycket och är ändå olika grundämnen.',
    relaterade: ['isotop', 'baryon', 'radioaktivt-sonderfall'],
    body: [
      { type: 'p', html: 'En atomkärna beskrivs med två tal: antalet protoner, som avgör vilket grundämne det är, och det totala antalet kärnpartiklar. Isotoper av samma grundämne har lika många protoner men olika många neutroner. Isobarer är det motsatta greppet: de har samma totala antal kärnpartiklar men olika många protoner, och är alltså olika grundämnen med nästan samma massa. Rutenium-96 och zirkonium-96 är ett par — båda har 96 kärnpartiklar, men rutenium har 44 protoner och zirkonium 40.' },
      { type: 'p', html: 'Ofta hänger isobarer ihop genom betasönderfall. När en neutron i en kärna omvandlas till en proton, eller tvärtom, ändras antalet protoner medan totalantalet är oförändrat — kärnan hoppar alltså till sin granne i isobarkedjan. Bland isobarerna med ett givet masstal finns i regel bara en eller två som är stabila; de övriga sönderfaller i riktning mot dem.' },
      { type: 'p', html: 'I acceleratorförsök är isobarer värdefulla just för att de går att jämföra. Kör man två sådana kärnor i samma maskin, med samma detektor och samma inställningar, är den enda väsentliga skillnaden mellan försöken hur mycket elektrisk laddning som är inblandad. Nästan alla felkällor tar ut sig själva i jämförelsen, och det som blir kvar i skillnaden kan tillskrivas laddningen. Det är ett vanligt sätt att pressa fram precision där en enskild mätning skulle drunkna i osäkerheter.' }
    ]
  },
  {
    id: 'higgsbosonen',
    term: 'Higgsbosonen',
    former: ['higgsbosonen', 'higgsboson', 'higgsbosoner', 'higgspartikeln', 'higgspartikel', 'higgsfältet', 'higgsfält', 'higgsmekanismen', 'higgsmekanism'],
    kort: 'Partikeln som avslöjade higgsfältet — det osynliga fält som fyller hela rymden och ger elementarpartiklarna deras massa. Den hittades vid CERN 2012, nästan femtio år efter att den förutsagts.',
    relaterade: ['standardmodellen', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'På 1960-talet hade fysikerna ett problem. Teorin för den svaga kraften fungerade vackert så länge alla partiklar var masslösa — men verkligheten är inte masslös. År 1964 föreslog flera forskargrupper, bland dem Peter Higgs samt François Englert och Robert Brout, en utväg: ett osynligt fält som fyller hela rymden. Partiklar som växelverkar starkt med fältet bromsas upp och beter sig som om de vore tunga, medan partiklar som knappt känner av fältet — som fotonen — förblir masslösa och far fram med ljusets hastighet. Bilden man brukar använda är en sirapsliknande sörja: vissa partiklar kilar rakt igenom, andra kämpar sig fram.' },
      { type: 'p', html: 'Ett fält som verkligen finns måste också gå att skaka igång, och krusningen på higgsfältet är higgsbosonen. Att skaka fram en enda kräver enorm energi samlad på en punkt, och det var en av huvuduppgifterna för partikelacceleratorn LHC vid CERN. I juli 2012 kunde två oberoende experiment meddela att de sett en ny partikel med massan omkring 125&nbsp;GeV — higgsbosonen. Året därpå gick Nobelpriset i fysik till Higgs och Englert. Partikeln lever bara ungefär 10<sup>−22</sup>&nbsp;sekunder och ses aldrig direkt, utan spåras genom mönstret i de lättare partiklar den sönderfaller till.' },
      { type: 'p', html: 'En vanlig missuppfattning är att higgsfältet ger massa åt allt. Det ger massa åt elementarpartiklarna: kvarkar, elektroner samt W- och Z-partiklarna. Men nästan all massa i din kropp sitter i protoner och neutroner, och omkring 99&nbsp;% av deras massa kommer från energin i den starka kraft som binder kvarkarna samman — inte från higgsfältet. Utan higgsfältet skulle du ändå inte finnas: atomer kräver elektroner med massa.' }
    ]
  },
  {
    id: 'antimateria',
    term: 'Antimateria',
    former: ['antimateria', 'antimaterian', 'antipartikel', 'antipartikeln', 'antipartiklar', 'antipartiklarna', 'positron', 'positronen', 'positroner', 'positronerna', 'antiproton', 'antiprotoner', 'antiväte', 'antivätet', 'antiatom', 'antiatomer', 'annihilation', 'annihilationen'],
    kort: 'Materiens spegelbild: till varje partikel finns en antipartikel med samma massa men motsatt laddning. Möts de förintas båda och blir ren energi.',
    relaterade: ['standardmodellen', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'När Paul Dirac 1928 skrev ner en ekvation som förenade kvantmekaniken med relativitetsteorin fick han på köpet med en uppsättning lösningar som verkade beskriva elektroner med positiv laddning. I stället för att stryka dem tog han dem på allvar — och 1932 hittade Carl Anderson just en sådan partikel i den kosmiska strålningen. Den kallas positron och är elektronens antipartikel: exakt samma massa, exakt lika stor laddning, men med motsatt tecken. Samma sak gäller alla andra partiklar. Det finns antiprotoner, antineutroner och till och med hela antiväteatomer, som tillverkas några i taget vid CERN.' },
      { type: 'p', html: 'Det dramatiska händer när materia möter antimateria. Partikelparet förintas, och hela massan omvandlas till energi enligt <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup>, oftast som två gammafotoner som far åt var sitt håll. Det är den effektivaste energiomvandling naturen känner till — men helt oanvändbar som energikälla, eftersom det kostar långt mer energi att tillverka antimaterian än man någonsin får ut av den. All antimateria som mänskligheten hittills framställt väger tillsammans mindre än ett miljondels gram.' },
      { type: 'p', html: 'Ändå är antimateria vardag på sjukhus. PET-kameran, positronemissionstomografen, bygger på den: patienten får ett spårämne som sönderfaller och sänder ut positroner, varje positron förintas nästan omedelbart mot en elektron i vävnaden, och de två gammafotonerna som skickas ut åt precis motsatta håll fångas upp av en ring av detektorer som räknar ut var förintelsen skedde.' },
      { type: 'p', html: 'Den stora olösta frågan är varför det finns någon materia alls. I det tidiga universum borde materia och antimateria ha bildats i lika delar och sedan förintat varandra fullständigt, så att bara strålning återstod. Ändå är allt omkring oss byggt av materia. Någonstans måste naturen ha behandlat de två sidorna en aning olika, och den lilla obalansen letar fysiker efter i minutiösa jämförelser mellan partiklar och deras antipartiklar.' }
    ]
  },
  {
    id: 'partikelaccelerator',
    term: 'Partikelaccelerator',
    former: ['partikelaccelerator', 'partikelacceleratorn', 'partikelacceleratorer', 'partikelacceleratorerna', 'lagringsring', 'lagringsringen', 'lagringsringar', 'lagringsringarna', 'acceleratorn', 'acceleratorer', 'acceleratorerna', 'synkrotron', 'synkrotronen', 'synkrotroner', 'synkrotronljus', 'synkrotronljuset', 'cyklotron', 'cyklotronen', 'kollisionsenergi', 'kollisionsenergin', 'protonsynkrotron', 'protonsynkrotronen', 'synkrocyklotron', 'synkrocyklotronen'],
    kort: 'En maskin som driver upp laddade partiklar till nära ljushastigheten med elektriska fält och styr dem med magneter. Används för att utforska materiens minsta byggstenar — men allra mest inom sjukvård och materialforskning.',
    relaterade: ['standardmodellen', 'higgsbosonen', 'antimateria', 'elektronvolt'],
    body: [
      { type: 'p', html: 'Principen är enkel och gammal: en laddad partikel i ett elektriskt fält känner en kraft och accelereras. Bildröret i en gammaldags tv var faktiskt en liten accelerator — elektroner som fick fart av en spänning och slog i skärmen. Skillnaden i en forskningsanläggning är att partiklarna får passera samma accelererande fält om och om igen. I en ringaccelerator böjer kraftfulla elektromagneter partikelknippet runt ett cirkelformat vakuumrör, medan snabbt växlande elektriska fält ger en knuff varje varv. Efter miljontals varv rör sig partiklarna med bara några miljondels procent lägre fart än ljuset.' },
      { type: 'p', html: 'Energin anges i elektronvolt (eV) — den energi en elektron får av en volts spänning. Världens största maskin, LHC vid CERN, ligger i en tunnel med 27&nbsp;km omkrets och krockar protoner med en sammanlagd energi på drygt 13&nbsp;TeV, alltså över 13&nbsp;·&nbsp;10<sup>12</sup>&nbsp;eV. Hög energi behövs av två skäl. Dels beter sig snabba partiklar som vågor med kort våglängd, och bara korta vågor kan avbilda små detaljer — acceleratorn är i den meningen ett mikroskop. Dels kan energin enligt <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup> omvandlas till nya, tyngre partiklar som annars bara fanns i universums första ögonblick.' },
      { type: 'p', html: 'Partikelfysik är ändå en liten minoritet av verksamheten. Av världens tiotusentals acceleratorer används de allra flesta till helt andra saker: strålbehandling av cancer, tillverkning av kortlivade spårämnen till medicinska undersökningar, härdning av plaster och sterilisering av utrustning. En särskilt viktig gren är synkrotronljuskällor, där elektroner som tvingas runt en ring sänder ut extremt intensivt röntgenljus. Det ljuset används för att kartlägga proteiners form, se vad som händer inuti ett batteri under drift och till och med läsa texten i förkolnade antika bokrullar utan att rulla upp dem.' }
    ]
  },
  {
    id: 'elektronvolt',
    term: 'Elektronvolt',
    former: ['elektronvolt', 'elektronvolten', 'elektronvolter', 'elektronvolterna',
             'kiloelektronvolt', 'kiloelektronvolten', 'kiloelektronvolter',
             'megaelektronvolt', 'megaelektronvolten', 'megaelektronvolter',
             'megaelektronvolterna', 'gigaelektronvolt', 'gigaelektronvolten',
             'gigaelektronvolter', 'gigaelektronvolterna', 'teraelektronvolt',
             'teraelektronvolten', 'teraelektronvolter'],
    kort: 'Energienheten som används när man räknar på enskilda partiklar: den energi en elektron får när den passerar spänningen en volt. Den är försvinnande liten i vardagsmått — en enda joule motsvarar drygt sex triljoner elektronvolt.',
    relaterade: ['partikelaccelerator', 'foton', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Joule är en utmärkt enhet för sådant vi kan ta på, men hopplös i partiklarnas värld. En enda elektron bär så lite energi att talen fylls av nollor: 0,000000000000000000160&nbsp;J för det allra vanligaste fallet. Fysiker gör därför som alla andra som arbetar med små saker — byter måttstock. En elektronvolt (eV) är den energi en elektron får när den accelereras genom spänningen en volt.' },
      { type: 'p', html: 'Definitionen är alltså inte en abstrakt omräkning utan en beskrivning av något man faktiskt gör i labbet. Kopplar du en elektron mellan polerna på ett vanligt 1,5&nbsp;V-batteri och låter den falla genom spänningen har den fått 1,5&nbsp;eV. Släpper du den genom 396&nbsp;miljoner volt har den fått 396&nbsp;megaelektronvolt. Just därför är enheten så bekväm: det man ställer in på spänningsaggregatet är också det tal man skriver ner som energi. Omräknat blir 1&nbsp;eV ungefär 1,602&nbsp;·&nbsp;10<sup>−19</sup>&nbsp;J. Att lyfta ett äpple en meter kostar runt en joule — drygt sex triljoner elektronvolt.' },
      { type: 'p', html: 'Med prefixen kilo (k), mega (M), giga (G) och tera (T) täcker enheten hela naturens skala med små, läsbara tal. En foton i synligt ljus bär omkring 2–3&nbsp;eV, ungefär lika mycket som binder ihop en molekyl — det är därför just synligt ljus kan driva kemi som fotosyntes och syn. Röntgenfotoner ligger på tiotusentals eV, alltså några tiotals keV, och river därför loss elektroner ur atomer. Ur en sönderfallande atomkärna kommer några MeV, vilket är miljontals gånger mer än ur en kemisk reaktion — hela skillnaden mellan kärnkraft och eldning i ett enda tal. Och i de största acceleratorerna krockar protoner med flera TeV.' },
      { type: 'p', html: 'Enheten används också för massa, vilket kan verka underligt tills man tar Einsteins samband <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup> på allvar: massa är en form av energi, så en massa kan anges genom den energi den motsvarar. En elektron har massan 511&nbsp;keV/<em>c</em><sup>2</sup> och en proton 938&nbsp;MeV/<em>c</em><sup>2</sup>. Skrivsättet gör det direkt avläsbart hur mycket rörelseenergi som krävs för att skapa en viss partikel ur ingenting — vilket är precis den räkning en partikelfysiker gör hela dagarna.' }
    ]
  },
  {
    id: 'radioaktivt-sonderfall',
    term: 'Radioaktivt sönderfall',
    former: ['radioaktivt sönderfall', 'radioaktivitet', 'radioaktiviteten', 'radioaktiv', 'radioaktivt', 'radioaktiva', 'sönderfall', 'sönderfallet', 'sönderfaller', 'sönderfalla', 'halveringstid', 'halveringstiden', 'halveringstider', 'halveringstiderna', 'alfastrålning', 'alfasönderfall', 'betastrålning', 'betasönderfall', 'alfasönderfallet', 'betasönderfallet'],
    kort: 'Instabila atomkärnor omvandlas spontant och gör sig av med energi genom att sända ut strålning. När det sker för en enskild kärna går inte att förutsäga — men för en stor mängd kärnor följer det en exakt lag.',
    relaterade: ['isotop', 'gammastralning', 'neutrino'],
    body: [
      { type: 'p', html: 'En atomkärna hålls ihop av den starka kärnkraften, som drar, medan protonernas positiva laddningar stöter bort varandra. Blir blandningen av protoner och neutroner ogynnsam blir kärnan instabil och ombildar sig förr eller senare spontant till något som ligger stabilare till. Det sker på tre huvudsätt. Vid alfasönderfall spottar kärnan ut ett fast paket av två protoner och två neutroner, alltså en heliumkärna. Vid betasönderfall omvandlas en neutron till en proton eller tvärtom, och en elektron eller positron kastas ut tillsammans med en neutrino. Vid gammasönderfall behåller kärnan sina partiklar men gör sig av med överskottsenergi som en energirik foton.' },
      { type: 'p', html: 'Det märkliga är slumpen. Kärnor åldras inte, och ingen enskild kärna går att förutsäga: en atom som legat orörd i en miljard år har exakt samma chans att sönderfalla under nästa sekund som en nybildad. Ändå blir en stor samling kärnor fullständigt förutsägbar. Efter en halveringstid återstår ungefär hälften, efter två halveringstider en fjärdedel, efter tre en åttondel. Halveringstiderna spänner över ofattbara skalor: vissa konstgjorda kärnor lever bråkdelar av en miljondels sekund, medan uran-238 har halveringstiden 4,5&nbsp;miljarder år — ungefär jordens ålder, vilket är just därför det fortfarande finns uran i berggrunden.' },
      { type: 'p', html: 'Regelbundenheten gör sönderfall till en klocka. Kol-14 bildas hela tiden i atmosfären och tas upp av allt levande. När organismen dör slutar påfyllningen och halten sjunker med halveringstiden 5&nbsp;730&nbsp;år, vilket låter arkeologer datera fynd upp till omkring 50&nbsp;000&nbsp;år bakåt. Inom sjukvården används i stället avsiktligt kortlivade ämnen som spårämnen: de ges i mycket små mängder, följs utifrån med detektorer och har hunnit klinga av inom några timmar.' }
    ]
  },
  {
    id: 'isotop',
    term: 'Isotop',
    former: ['isotop', 'isotopen', 'isotoper', 'isotoperna', 'isotopisk', 'isotopiska', 'isotopförhållande', 'isotopförhållandet', 'isotopförhållanden', 'nuklid', 'nuklider', 'deuterium', 'deuteron', 'deuteronen', 'deuteroner', 'deuteronerna', 'tritium', 'tungt vatten', 'väteisotop', 'väteisotopen', 'väteisotoper', 'väteisotoperna', 'moderisotop', 'moderisotopen', 'radiumisotop', 'radiumisotoper', 'radiumisotoperna'],
    kort: 'Atomer av samma grundämne men med olika många neutroner i kärnan. De uppför sig nästan likadant kemiskt, men skiljer sig i massa och i hur stabila de är.',
    relaterade: ['radioaktivt-sonderfall', 'spektroskopi'],
    body: [
      { type: 'p', html: 'Vilket grundämne en atom tillhör bestäms helt av antalet protoner i kärnan: sex protoner betyder kol, åtta betyder syre, 92 betyder uran. Antalet neutroner är däremot inte låst. Kolatomer finns med sex, sju eller åtta neutroner och kallas då kol-12, kol-13 och kol-14 efter det sammanlagda antalet kärnpartiklar. Sådana varianter av samma grundämne kallas isotoper. Eftersom kemin styrs av elektronerna, och elektronantalet följer protonerna, beter sig isotoperna nästan identiskt kemiskt — de ingår i samma föreningar och deltar i samma reaktioner.' },
      { type: 'p', html: 'Två saker skiljer dem åt. Den ena är massan, vilket märks tydligast bland de lättaste ämnena: vanligt väte har en ensam proton i kärnan, deuterium har en proton och en neutron och är alltså ungefär dubbelt så tungt, och tritium med två neutroner nästan tre gånger så tungt. Tungt vatten, där väteatomerna är deuterium, är faktiskt mätbart tyngre än vanligt vatten. Den andra skillnaden är stabiliteten. Av de omkring 3&nbsp;000 kända isotoperna är bara ungefär 250 stabila; resten är radioaktiva och sönderfaller förr eller senare. Kol-12 ligger kvar för alltid, medan kol-14 har halveringstiden 5&nbsp;730&nbsp;år.' },
      { type: 'p', html: 'Just för att isotoper är kemiskt lika men fysiskt olika blir de utmärkta spår att följa. Vatten med den tyngre syreisotopen syre-18 avdunstar något trögare än vatten med syre-16, så förhållandet mellan de två i iskärnor och havssediment berättar hur varmt det var för tiotusentals år sedan. Kol- och kväveisotoper i benrester avslöjar vad en människa åt för tusentals år sedan, och i sjukvården används kortlivade isotoper för att följa hur ett organ arbetar i realtid.' }
    ]
  },
{
    id: 'halvledare',
    term: 'Halvledare',
    former: ['halvledare', 'halvledaren', 'halvledarna', 'halvledarmaterial', 'halvledarmaterialet', 'halvledarkomponent', 'halvledarkomponenter', 'halvledarindustrin', 'bandgap', 'bandgapet', 'dopning', 'dopningen', 'dopad', 'dopat', 'dopade', 'pn-övergång', 'pn-övergången'],
    kort: 'Ett material som leder ström sämre än en metall men bättre än en isolator — och där ledningsförmågan dessutom går att styra. Det är styrbarheten som gör all modern elektronik möjlig.',
    relaterade: ['gitter', 'nanoskala', 'supraledare'],
    body: [
      { type: 'p', html: 'Sorterar man material efter hur bra de leder ström hamnar metallerna i ena änden och isolatorerna i den andra: koppar släpper igenom ström nästan hur lätt som helst, glas och gummi inte alls. Mittemellan ligger halvledarna, med kisel som den stora arbetshästen. Det intressanta är inte att de leder ”lagom”, utan att ledningsförmågan går att <em>styra</em>: samma bit kisel kan gå från att knappt leda alls till att leda bra, beroende på temperatur, ljus eller en pålagd spänning.' },
      { type: 'p', html: 'Förklaringen ligger i bandgapet. Elektronerna i ett fast ämne kan bara ha vissa energier, och mellan de energier där de sitter fastlåsta i sina bindningar och de där de kan vandra fritt finns ett tomrum: bandgapet. I en isolator är gapet så brett att nästan ingen elektron orkar över, i en metall finns inget gap alls, och i en halvledare räcker en knuff av värme eller ljus. Dessutom går det att smutsa ner kislet med avsikt, så kallad dopning: en främmande atom på en miljon kiselatomer räcker. Har den en elektron för mycket blir det n-typ, med rörliga elektroner i överskott; en för lite ger p-typ, där tomma platser beter sig som positiva laddningar.' },
      { type: 'p', html: 'Skarven mellan n-dopat och p-dopat material, pn-övergången, är den verkliga uppfinningen. Den släpper fram ström åt bara ett håll — det är en diod. Tre skikt på varandra blir en transistor: en strömbrytare utan rörliga delar som kan slås av och på miljarder gånger per sekund. Lyser övergången när ström passerar är det en lysdiod; faller ljus in i stället är det en solcell. Ett modernt processorchip rymmer tiotals miljarder transistorer på en yta mindre än en tumnagel.' }
    ]
  },
  {
    id: 'nanoskala',
    term: 'Nanoskala',
    former: ['nanoskala', 'nanoskalan', 'nanometer', 'nanometern', 'nanoteknik', 'nanotekniken', 'nanostruktur', 'nanostrukturer', 'nanopartikel', 'nanopartiklar', 'nanopartiklarna'],
    kort: 'Storleksordningen några miljarddels meter, där enstaka atomer och molekyler är byggstenarna. Väl kända material får ofta helt nya egenskaper när de krymps ner hit.',
    relaterade: ['halvledare', 'metamaterial', 'fotonisk-kristall'],
    body: [
      { type: 'p', html: 'En nanometer är en miljarddels meter: 1&nbsp;nm = 10<sup>−9</sup>&nbsp;m. Tumregeln är att ungefär tio atomer på rad blir en nanometer. Ett människohårstrå är omkring 80&nbsp;000&nbsp;nm tjockt — en nanometer förhåller sig alltså till hårstrået ungefär som hårstrået till en fotbollsplan. DNA-spiralen är ett par nanometer bred och ett virus några tiotals till ett par hundra. Med nanoskalan menas vanligen storlekar från ungefär 1 till 100&nbsp;nm.' },
      { type: 'p', html: 'Att material beter sig annorlunda här beror på två saker. Dels blir ytan viktig: i en guldtacka sitter så gott som alla atomer skyddade inne i materialet, medan en partikel på några nanometer har en stor del av sina atomer i ytan, med lösa bindningar som gärna reagerar. Dels tar kvanteffekterna över — en elektron instängd i ett så litet utrymme kan bara ha vissa bestämda energier, och vilka beror på utrymmets storlek. Därför är guld gult och trögreaktivt i vanlig storlek men rubinrött och en effektiv katalysator som nanopartiklar. Samma princip ger kvantprickar: halvledarkorn som lyser i en färg som bestäms av kornets storlek, större korn rött och mindre blått.' },
      { type: 'p', html: 'Ett vanligt ljusmikroskop hjälper inte — synligt ljus har en våglängd på runt 500&nbsp;nm och är alltså grövre än det man vill titta på. I stället används elektronmikroskop och sveptunnelmikroskop, där en nål känner sig fram över ytan och till och med kan putta enskilda atomer på plats. Nanotekniken sitter redan i solkrämer, smutsavvisande ytor, katalysatorer och i datorchipp, där de minsta detaljerna mäts i tiotals nanometer.' }
    ]
  },
  {
    id: 'relativitetsteori',
    term: 'Relativitetsteori',
    former: ['relativitetsteori', 'relativitetsteorin', 'speciella relativitetsteorin', 'allmänna relativitetsteorin', 'relativistisk', 'relativistiskt', 'relativistiska', 'tidsdilatation', 'tidsdilatationen', 'längdkontraktion', 'längdkontraktionen', 'rumtid', 'rumtiden'],
    kort: 'Einsteins två teorier om rum, tid och gravitation: den speciella (1905) om vad som händer nära ljusets hastighet, och den allmänna (1915) som beskriver gravitation som en krökning av rumtiden.',
    relaterade: ['svart-hal', 'kosmologiska-konstanten', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'Den speciella relativitetsteorin, som Einstein lade fram 1905, vilar på ett enda envist mätresultat: ljus i vakuum rör sig med samma fart, ungefär 300&nbsp;000&nbsp;km/s, oavsett hur den som mäter rör sig. Kastar du en boll framåt från ett tåg läggs bollens och tågets fart ihop — men riktar du en ficklampa framåt blir ljusets fart exakt densamma. För att det ska gå ihop måste något annat ge vika, och det som ger vika är tiden och längden. En klocka i hög fart går långsammare sett utifrån (tidsdilatation) och ett föremål blir kortare i sin färdriktning (längdkontraktion). Det är inga synvillor: myoner som bildas högt uppe i atmosfären hinner ner till marken trots att de borde ha sönderfallit långt innan. Ur samma teori följer att massa är en form av energi, <em>E</em> = <em>m</em> · <em>c</em><sup>2</sup>.' },
      { type: 'p', html: 'Tio år senare kom fortsättningen. I den allmänna relativitetsteorin från 1915 är gravitation inte en kraft som drar i saker på avstånd, utan ren geometri: massa och energi kröker rumtiden — rummets tre riktningar och tiden sammanvävda till en helhet — och föremål följer den rakaste möjliga vägen genom krökningen. Bilden av en tung kula som gröper ur en studsmatta fångar en del av saken, men bara en del, för det är inte bara rummet som kröks: klockor går långsammare djupt nere i ett gravitationsfält.' },
      { type: 'p', html: 'Båda teorierna har provats hårt och hållit. Vid solförmörkelsen 1919 mättes hur stjärnljus böjs av när det passerar solen. GPS-satelliternas klockor går omkring 38 miljondels sekunder fel per dygn jämfört med klockor på marken, och utan relativistisk korrigering skulle positionerna glida flera kilometer om dagen. 2015 fångades gravitationsvågor från två kolliderande svarta hål — krusningar i själva rumtiden, förutsagda hundra år tidigare.' }
    ]
  },
  {
    id: 'topologiskt-skydd',
    term: 'Topologiskt skydd',
    former: ['topologiskt skydd', 'topologiskt skyddad', 'topologiskt skyddat', 'topologiskt skyddade', 'topologisk', 'topologiskt', 'topologiska', 'topologi', 'topologin', 'topologisk isolator', 'topologiska isolatorer', 'kanttillstånd'],
    kort: 'När en egenskap bestäms av en helhetsform i stället för av detaljerna blir den nästan omöjlig att förstöra — som knuten på ett rep, som sitter kvar hur mycket man än drar och vrider.',
    relaterade: ['skyrmion', 'supraledare', 'kvantdator'],
    body: [
      { type: 'p', html: 'Slå en knut på ett rep och knyt sedan ihop ändarna till en ögla. Nu kan du dra, vrida och skaka hur mycket du vill: knuten glider omkring och byter form, men den försvinner aldrig. Enda sättet att bli av med den är att klippa av repet. Antalet knutar är ett exempel på en topologisk egenskap — något som bara beror på hur saker hänger ihop, inte på exakta mått eller mjuka formförändringar. Topologiskt sett är en kaffekopp och en ringformad kaka samma sak: båda har precis ett hål.' },
      { type: 'p', html: 'Samma logik dyker upp i material. Vissa kvanttillstånd bär på ett tal som av matematiska skäl bara kan vara ett helt tal — 0, 1, 2 och så vidare — och ett helt tal kan inte ändras lite grann. Orenheter, ojämna kanter, en stöt eller värmerörelse kan skaka om tillståndet men inte ändra dess tal, för det skulle kräva ett helt hopp och därmed mycket energi. Tillståndet är topologiskt skyddat, och därför ovanligt tåligt.' },
      { type: 'p', html: 'Ett tydligt exempel är den topologiska isolatorn: den leder inte alls ström i sitt inre, men längs kanten finns tillstånd som leder utmärkt och som tar sig förbi hinder utan att strömmen studsar tillbaka. Ett annat är skyrmioner, små virvlar i ett magnetiskt mönster som går att flytta men inte att jämna ut, och som därför testas som robusta minnesceller. Störst hopp knyts kanske till kvantdatorer, vars stora problem är just hur ömtåliga kvanttillstånden är. Nobelpriset i fysik 2016 gick till David Thouless, Duncan Haldane och Michael Kosterlitz för den matematiska beskrivningen av sådana tillstånd.' }
    ]
  },
  {
    id: 'termoelektrisk-effekt',
    term: 'Termoelektrisk effekt',
    former: ['termoelektrisk effekt', 'termoelektriska effekten', 'termoelektrisk', 'termoelektriskt', 'termoelektriska', 'termoelektricitet', 'termoelektriciteten', 'seebeckeffekten', 'seebeck-effekten', 'peltiereffekten', 'peltier-effekten', 'peltierelement', 'termoelement', 'termoelementet'],
    kort: 'En temperaturskillnad över ett material ger upphov till en elektrisk spänning — och omvänt kan en ström pumpa värme, så att ena sidan blir kall och den andra varm.',
    relaterade: ['halvledare', 'nanoskala', 'isotop'],
    body: [
      { type: 'p', html: 'Värm ena änden av en metallstav och håll den andra kall. Laddningsbärarna i den varma änden rör sig häftigare än de i den kalla och sprider sig därför nedåt i temperatur, tills det samlats ett litet överskott av laddning i den kalla änden. Då finns en spänning mellan ändarna, helt utan batteri. Det kallas seebeckeffekten efter Thomas Seebeck, som upptäckte den 1821. Spänningen är liten — några tiotals miljondels volt per grads temperaturskillnad — så i praktiken kopplas två olika material ihop till en slinga.' },
      { type: 'p', html: 'Effekten går också att köra baklänges. Driver man i stället en ström genom skarven mellan två sådana material bär laddningsbärarna med sig värme från den ena sidan till den andra: ena sidan kyls ner, den andra blir varm. Det är peltiereffekten, upptäckt 1834, och ett peltierelement är alltså en värmepump utan rörliga delar, köldmedium eller ljud — bra i små kylskåp och för att kyla bildsensorer.' },
      { type: 'p', html: 'Vanligast är termoelementet: två hopsvetsade trådar av olika metall som mäter temperatur från djupt minusgradigt till långt över tusen grader, och som sitter i ugnar, motorer och processindustri överallt. Mest spektakulärt används effekten i rymden. En radioisotopgenerator innehåller en klump plutonium-238 som håller sig varm av sitt eget radioaktiva sönderfall, och termoelektriska element gör temperaturskillnaden mot rymdkylan till elektricitet — utan solpaneler och utan en enda rörlig del. Voyagersonderna har drivits så sedan 1977. Haken är verkningsgraden, bara några få procent: ett bra termoelektriskt material ska leda ström bra men värme dåligt, och i de flesta material följs de två egenskaperna åt. Att bryta det sambandet, till exempel med nanostrukturer som bromsar värmen men släpper fram laddningarna, är fältets stora utmaning.' }
    ]
  },
  {
    id: 'turbulens',
    term: 'Turbulens',
    former: ['turbulens', 'turbulensen', 'turbulent', 'turbulenta', 'turbulent flöde', 'laminär', 'laminärt', 'laminära', 'laminärt flöde'],
    kort: 'Det virvlande, kaotiska tillstånd en gas eller vätska hamnar i när flödet blir tillräckligt snabbt. Rörelsen lyder kända lagar men går ändå inte att förutsäga i detalj.',
    relaterade: ['superfluid', 'plasma'],
    body: [
      { type: 'p', html: 'Titta på röken från ett nyss släckt ljus. Precis ovanför veken stiger den som en slät, nästan orörlig strimma — laminärt flöde, där gasen rör sig i parallella skikt som glider förbi varandra utan att blandas. Några centimeter längre upp bryts strimman plötsligt upp i virvlar som slingrar in i varandra i ett mönster som aldrig upprepar sig. Det är övergången till turbulens. Om ett flöde blir turbulent avgörs av farten, av områdets storlek och av mediets inre friktion, viskositeten: snabbt, stort och tunnflytande ger turbulens, medan långsamt, litet och trögflytande — tänk honung — håller sig laminärt.' },
      { type: 'p', html: 'Kännetecknet är virvlar i alla storlekar samtidigt. De stora bryts upp i mindre, som bryts upp i ännu mindre, i en kaskad nedåt tills virvlarna är så små att den inre friktionen gör om deras rörelse till värme. Blandningen blir därför mycket effektiv — en droppe mjölk sprider sig direkt i omrört kaffe — och motståndet ökar dramatiskt, eftersom en stor del av energin går åt till att röra om i mediet i stället för att driva något framåt. Just därför läggs så mycket möda på att hålla flödet laminärt kring flygplansvingar, båtskrov och tävlingscyklister.' },
      { type: 'p', html: 'Turbulens är ändå inte laglös: rörelsen lyder ekvationer som varit kända sedan 1800-talet. Problemet är att lösningarna är extremt känsliga för startvillkoren — en försumbar skillnad i början växer till ett helt annat virvelmönster en stund senare, och ingen dator kan hålla reda på varenda liten virvel i ett verkligt flöde. Därför har väderprognoser en bortre gräns, därför går luftgropar inte att förutsäga i detalj, och därför räknar ingenjörer med ungefärliga modeller. Att ens bevisa att ekvationerna alltid har snälla lösningar är ett av matematikens berömda millennieproblem, och turbulens brukar kallas det sista stora olösta problemet i den klassiska fysiken.' }
    ]
  },
  {
    id: 'rodforskjutning',
    term: 'Rödförskjutning',
    former: ['rödförskjutning', 'rödförskjutningen', 'rödförskjutningar',
             'rödförskjuten', 'rödförskjutet', 'rödförskjutna', 'rödförskjuts'],
    kort: 'Att ljuset från ett avlägset objekt sträcks ut mot längre våglängder, alltså mot rött. Det är astronomins viktigaste mått på hur långt bort och hur långt tillbaka i tiden något ligger.',
    relaterade: ['vaglangd', 'kvasar', 'mork-energi', 'ljusar'],
    body: [
      { type: 'p', html: 'Alla känner igen effekten från en ambulans som kör förbi: sirenen låter ljusare när den närmar sig och mörkare när den avlägsnar sig, eftersom ljudvågorna trycks ihop framför bilen och dras ut bakom den. Ljus beter sig likadant. Ett föremål som rör sig bort från oss får sitt ljus utsträckt till längre våglängder — mot den röda änden av spektrumet — och det kallas rödförskjutning. Rör det sig i stället mot oss trycks ljuset ihop och blir blåförskjutet.' },
      { type: 'p', html: 'Att det går att mäta beror på att varje grundämne sänder ut och absorberar ljus vid sina alldeles egna våglängder, som ett strimmigt fingeravtryck i spektrumet. Astronomer letar upp det mönstret i ljuset från en avlägsen galax och ser hur långt hela mönstret har glidit mot rött. Förskjutningen anges med bokstaven <em>z</em>: en galax med <em>z</em>&nbsp;=&nbsp;1 syns i ljus vars våglängd har fördubblats på vägen.' },
      { type: 'p', html: 'För avlägsna galaxer är förklaringen dock inte riktigt att de far iväg genom rymden. Det är rymden själv som växer medan ljuset är på väg, och ljusvågen sträcks ut med den. Edwin Hubble upptäckte 1929 att ju längre bort en galax ligger, desto mer rödförskjutet är dess ljus — det första beviset för att universum expanderar. Därför fungerar <em>z</em> i praktiken som både avståndsmått och tidsmaskin: de mest avlägsna galaxer teleskopen hittills nått ligger över <em>z</em>&nbsp;=&nbsp;14, och deras ljus lämnade dem när universum var några hundra miljoner år gammalt. Den kosmiska bakgrundsstrålningen är ännu extremare, omkring <em>z</em>&nbsp;=&nbsp;1100.' },
      { type: 'p', html: 'Det finns också en helt annan sorts rödförskjutning som inte har med rörelse att göra: ljus som klättrar bort från något mycket tungt förlorar energi och blir rödare på köpet. Den gravitationella rödförskjutningen är liten vid jordytan men fullt mätbar, och nära ett svart håls händelsehorisont blir den dramatisk.' }
    ]
  },
  {
    id: 'astronomisk-enhet',
    term: 'Astronomisk enhet',
    former: ['astronomisk enhet', 'astronomiska enheter', 'astronomiska enheten',
             'astronomiska enheterna'],
    kort: 'Avståndet mellan jorden och solen, knappt 150 miljoner km. Det är måttstocken astronomer använder inom solsystemet, där ljusår blir orimligt stora.',
    relaterade: ['ljusar', 'parsec', 'asteroid', 'komet'],
    body: [
      { type: 'p', html: 'Avstånd i rymden spänner över så många storleksordningar att ett enda mått inte räcker. Ljusår passar mellan stjärnorna, men inne i vårt eget solsystem blir de löjligt stora — hela avståndet ut till Neptunus är bara en halv tusendels ljusår. Därför använder astronomer i stället jordens eget avstånd till solen som måttstock och kallar det en astronomisk enhet, förkortad au. Sedan 2012 är den exakt definierad till 149&nbsp;597&nbsp;870&nbsp;700 meter, alltså knappt 150&nbsp;miljoner&nbsp;km.' },
      { type: 'p', html: 'Fördelen är att solsystemet plötsligt går att överblicka. Mars ligger 1,5&nbsp;au från solen, Jupiter 5,2&nbsp;au och Neptunus 30&nbsp;au. Kuiperbältet, där de flesta kometer håller till, sträcker sig från ungefär 30 till 50&nbsp;au. Rymdsonden Voyager&nbsp;1, som lämnade jorden 1977, har passerat 160&nbsp;au. Ett ljusår motsvarar drygt 63&nbsp;000&nbsp;au — först då börjar det bli tal om grannstjärnor.' },
      { type: 'p', html: 'Enheten säger också något om tid. Ljuset behöver ungefär 8&nbsp;minuter och 20&nbsp;sekunder för att färdas en astronomisk enhet, vilket är precis så gammal bilden av solen är när den når din näthinna. Att över huvud taget mäta upp avståndet var länge ett av astronomins svåraste problem; i dag görs det med radarekon mot planeter och med hur rymdsonders signaler fördröjs på vägen hem.' }
    ]
  },
  {
    id: 'fotosfar',
    term: 'Fotosfär',
    former: ['fotosfär', 'fotosfären', 'fotosfärer', 'fotosfären hos solen',
             'solens fotosfär'],
    kort: 'Det tunna skikt i en stjärna där gasen äntligen blir genomskinlig och ljuset kan lämna den. Det är stjärnans synliga ”yta” — men den består av gas, inte av något fast.',
    relaterade: ['korona', 'granulation', 'plasma', 'svart-hal'],
    body: [
      { type: 'p', html: 'Solen har ingen yta i den mening en planet har. Den är gas rakt igenom, allt tätare ju längre in man kommer. Ändå ser den ut att ha en knivskarp kant på himlen, och det beror på fotosfären: det skikt där gasen till slut blir så gles att ljuset kan ta sig ut utan att absorberas på nytt. Ovanför det skiktet är solen genomskinlig, under det ogenomträngligt — och gränsen däremellan är bara några hundra kilometer tjock, vilket på en klotformig gasboll med 1,4&nbsp;miljoner kilometers diameter motsvarar skalet på ett äpple.' },
      { type: 'p', html: 'Det är fotosfären man ser på varje bild av solen och det är dess temperatur, omkring 5&nbsp;500&nbsp;°C, som avgör solljusets färg. Skiktet är i ständig rörelse: het gas väller upp underifrån, strålar bort sin energi i rymden, svalnar och sjunker tillbaka. Solfläckar är områden i fotosfären där starka magnetfält bromsar den rörelsen, så att gasen där blir ett par tusen grader svalare och därför ser mörk ut i jämförelse.' },
      { type: 'p', html: 'Alla stjärnor har en fotosfär, och dess temperatur är just vad astronomer menar när de talar om en stjärnas temperatur. En röd dvärg har en fotosfär på kanske 3&nbsp;000&nbsp;°C, en het blå stjärna över 30&nbsp;000&nbsp;°C. Eftersom fotosfären är det enda av stjärnan vi ser direkt måste allt vi vet om det som händer längre in läsas ut ur den — ur dess ljus, dess svängningar och dess magnetfält.' }
    ]
  },
  {
    id: 'korona',
    term: 'Korona',
    former: ['korona', 'koronan', 'koronor', 'solkorona', 'solkoronan',
             'stjärnkorona', 'stjärnkoronan'],
    kort: 'En stjärnas yttersta atmosfär — hos solen en tunn, miljongradig gasslöja som bara syns för blotta ögat vid en total solförmörkelse.',
    relaterade: ['fotosfar', 'plasma', 'granulation'],
    body: [
      { type: 'p', html: 'Utanför solens synliga yta fortsätter solen, fast så tunt att den drunknar i ytans bländande sken. Först när månen täcker solskivan helt vid en total solförmörkelse träder den fram: en pärlemorskimrande krans av strimmor och slöjor som sträcker sig flera solradier ut i rymden. Det är koronan, solens yttersta atmosfär. Gasen där är oerhört tunn — långt tunnare än det bästa vakuum som går att göra i ett laboratorium — men den lyser ändå, eftersom den är extremt het.' },
      { type: 'p', html: 'Och det är just hettan som är gåtan. Solens yta håller omkring 5&nbsp;500&nbsp;°C, men några tusen kilometer längre ut stiger temperaturen till över en miljon grader. Att det blir varmare längre bort från värmekällan låter bakvänt, och vore omöjligt om värmen bara leddes utåt på vanligt vis. Energin måste alltså bäras dit på något annat sätt. Sedan 1940-talet, då de miljongradiga temperaturerna först avslöjades genom märkliga spektrallinjer, har misstankarna riktats mot solens magnetfält: vågor som fortplantar sig längs fältlinjerna, och otaliga små omkopplingar i fältet som frigör energi.' },
      { type: 'p', html: 'Koronan angår oss mer än den kanske verkar. Den avger hela tiden en ström av laddade partiklar, solvinden, och ibland slungas väldiga moln av korongas ut i rymden. Träffar ett sådant moln jorden får vi norrsken — men också magnetiska stormar som kan störa satelliter, radiotrafik, navigationssystem och i värsta fall elnät. Att förstå vad som värmer och driver koronan är därför inte bara en akademisk fråga.' }
    ]
  },
  {
    id: 'granulation',
    term: 'Granulation',
    former: ['granulation', 'granulationen', 'granul', 'granulen', 'granuler',
             'granulerna', 'solgranul', 'solgranuler'],
    kort: 'Det bubbelmönster som täcker solens yta: ljusa celler av uppåtströmmande het gas, åtskilda av mörkare fåror där gasen svalnat och sjunker tillbaka.',
    relaterade: ['fotosfar', 'plasma', 'korona', 'turbulens'],
    body: [
      { type: 'p', html: 'Titta på gröt som håller på att koka, eller på misosoppa i en skål. Ytan delas upp i celler: mitt i varje cell väller het vätska upp underifrån, breder ut sig åt sidorna, svalnar och sjunker ner igen längs cellens kant. Solens yta gör exakt samma sak, i gigantisk skala. Mönstret kallas granulation, och de enskilda cellerna granuler.' },
      { type: 'p', html: 'En granul är mellan ungefär 500 och 2&nbsp;000&nbsp;kilometer bred — en enda av dem kan alltså vara längre än Sverige. Mitten är ljus därför att gasen där kommer direkt underifrån och är några hundra grader hetare, och kanterna mörka därför att gasen där har hunnit svalna. Hela mönstret ritas om på några minuter: en granul lever i storleksordningen tio minuter innan den bryts upp och ersätts. Vid varje ögonblick finns det ett par miljoner granuler på solskivan.' },
      { type: 'p', html: 'Granulationen är den synliga toppen av konvektionszonen, det yttre tredjedelslagret av solen där energin transporteras utåt genom att gasen strömmar i stället för att strålningen letar sig fram. Fenomenet är därför en direkt fingervisning om hur solen fungerar under ytan. De mörka fårorna mellan granulerna spelar dessutom en särskild roll: där trängs solens magnetfält ihop till smala, starka knippen, och där sker mycket av det som kopplar samman ytan med atmosfären ovanför.' }
    ]
  },
  {
    id: 'kelvin-helmholtz-instabilitet',
    term: 'Kelvin–Helmholtz-instabilitet',
    former: ['kelvin–helmholtz-instabilitet', 'kelvin–helmholtz-instabiliteten',
             'kelvin–helmholtz-instabiliteter', 'kelvin–helmholtz-instabiliteterna',
             'kelvin-helmholtz-instabilitet', 'kelvin-helmholtz-instabiliteten',
             'kelvin-helmholtz-instabiliteter', 'kelvin-helmholtz-instabiliteterna'],
    kort: 'Det som händer när två skikt av gas eller vätska glider förbi varandra med olika fart: gränsen mellan dem krusar sig, vågorna växer och rullar ihop sig till virvlar.',
    relaterade: ['turbulens', 'plasma', 'granulation', 'viskositet'],
    body: [
      { type: 'p', html: 'Blås över ytan på en kopp kaffe och du har startat den. När två skikt glider förbi varandra med olika fart är gränsytan mellan dem instabil: den minsta krusning växer av sig själv. Anledningen är att strömmen som passerar över krusningens topp måste ta en längre väg och därför går fortare — och där farten är högre är trycket lägre. Det lägre trycket suger upp toppen ytterligare, som gör krusningen större, som ökar farthopet ännu mer. Vågen växer tills den kröker sig framåt och rullar ihop sig till en rad virvlar, alla lika stora och lika spiralformade.' },
      { type: 'p', html: 'Det är därför vind reser vågor på en sjö och därför en flagga fladdrar i stället för att hänga rakt ut i vinden. Ibland ritas mönstret också upp på himlen: när ett fuktigt luftskikt glider under ett torrare och snabbare kondenserar vattnet i vågtopparna, och resultatet blir en rad likadana krökta vågmoln — läroboksbilden av fenomenet. William Thomson, senare lord Kelvin, och Hermann von Helmholtz beskrev matematiken bakom det 1868 respektive 1871, och deras villkor talar om exakt hur stor fartskillnaden måste vara för att en krusning av en given storlek ska växa i stället för att dö ut.' },
      { type: 'p', html: 'I rymden är instabiliteten närmast överallt, men med en extra ingrediens: magnetfält. Ett elektriskt ledande gasmoln släpar med sig fältlinjerna, och ett fält längs strömriktningen verkar som en spänd gummisnodd som motverkar krökningen — därför kan magnetfält både dämpa och forma virvlarna. Fenomenet är iakttaget där solvinden stryker längs jordens magnetfält, längs gränserna mellan Jupiters och Saturnus molnband, i gasmoln kring unga stjärnor, och sedan 2026 även på solens egen yta. Betydelsen är att instabiliteten styckar stora, långsamma strömmar i allt mindre virvlar; först på de allra minsta skalorna kan rörelseenergin bli värme.' }
    ]
  },
  {
    id: 'kolvattenacceleration',
    term: 'Kölvattenacceleration',
    former: ['kölvattenacceleration', 'kölvattenaccelerationen', 'kölvattenfält',
             'kölvattenfältet', 'kölvattenvåg', 'kölvattenvågen', 'plasmaaccelerator',
             'plasmaacceleratorn', 'plasmaacceleratorer', 'plasmaacceleratorerna',
             'plasmaacceleration', 'plasmaaccelerationen', 'plasmavåg', 'plasmavågen',
             'plasmavågor', 'plasmavågorna', 'enstegsaccelerator', 'enstegsacceleratorn',
             'enstegsacceleratorer', 'enstegsacceleratorerna'],
    kort: 'Ett sätt att ge laddade partiklar enorm fart på mycket kort sträcka: en kraftig laserpuls skjuts genom ett plasma och lämnar efter sig en våg av laddning, som elektroner kan surfa på.',
    relaterade: ['plasma', 'partikelaccelerator', 'laser'],
    body: [
      { type: 'p', html: 'En vanlig accelerator knuffar partiklarna framåt med elektriska fält inuti metallhålrum. Det sätter en gräns: blir fältet för starkt slår det gnistor mellan metallytorna. Därför måste maskinerna vara långa — hundratals meter, ibland kilometer — för att summan av många måttliga knuffar ska bli en hög energi.' },
      { type: 'p', html: 'Kölvattenacceleration kringgår gränsen genom att byta ut metallen mot ett plasma, alltså en gas vars atomer redan slitits isär i fria elektroner och positiva joner. Ett plasma kan inte slå gnistor, för det är just en gnista. När en extremt kort och intensiv laserpuls far genom plasmat trycker dess ljus undan de lätta elektronerna åt sidorna, medan de tunga jonerna blir kvar. Bakom pulsen bildas en bubbla som är nästan tömd på elektroner, och de undanträngda elektronerna faller tillbaka i ett skal runt den. Bubblan följer med pulsen framåt som kölvattnet efter en båt — därav namnet.' },
      { type: 'p', html: 'Skillnaden i laddning mellan bubblans inre och skalet ger ett elektriskt fält som är tusentals gånger starkare än vad ett metallhålrum tål. En elektron som råkar fångas in i bubblans bakre del dras med och kan på några millimeter få lika mycket energi som den annars hade behövt tiotals meter för. Toshiki Tajima och John Dawson föreslog idén 1979, men först på 2000-talet fanns lasrar korta och starka nog att förverkliga den. Svårigheterna i dag handlar mindre om att nå hög energi än om att få strålen jämn: alla elektroner ska helst ha nästan samma energi och hålla ihop i en smal stråle.' }
    ]
  },
  {
    id: 'grupphastighet',
    term: 'Grupphastighet',
    former: ['grupphastighet', 'grupphastigheten', 'gruppfart', 'gruppfarten',
             'fashastighet', 'fashastigheten'],
    kort: 'Farten hos en vågpuls som helhet — att skilja från fashastigheten, som är farten hos de enskilda vågtopparna inuti pulsen. De två är sällan lika stora.',
    relaterade: ['vaglangd', 'plasma', 'optisk-fiber'],
    body: [
      { type: 'p', html: 'Kasta en sten i en damm och titta noga på ringen som breder ut sig. Ringen som helhet rör sig med en viss fart, men vågtopparna inuti den rör sig med en annan: de föds i ringens bakkant, vandrar framåt genom knippet och försvinner i framkanten. Knippets fart kallas grupphastighet, de enskilda toppornas fart fashastighet.' },
      { type: 'p', html: 'Skillnaden uppstår så fort vågor med olika våglängd färdas olika fort i mediet. En verklig ljuspuls är nämligen aldrig en enda ren våglängd utan en blandning av många, och det är blandningen som formar pulsen. Går de olika våglängderna i otakt förskjuts pulsens tyngdpunkt i en annan takt än vågtopparnas — precis som en klunga cyklister kan förflytta sig långsammare än de enskilda cyklisterna, om de hela tiden växlar om vem som ligger först.' },
      { type: 'p', html: 'Att hålla isär de två farterna är avgörande i praktiken. Det är alltid grupphastigheten som bär energi och information, och den kan aldrig överstiga ljushastigheten i vakuum. Fashastigheten får däremot gärna göra det: i ett plasma glider vågtopparna fram fortare än ljuset samtidigt som pulsen som helhet kryper fram långsammare, och ingen naturlag tar skada av det — en ensam vågtopp bär ingenting med sig. I en optisk fiber är det grupphastigheten som avgör hur snabbt en datapuls når fram, och skillnaden mellan olika våglängders grupphastighet som gör att pulsen breddas och till slut flyter ihop med nästa.' }
    ]
  },
  {
    id: 'axiparabola',
    term: 'Axiparabola',
    former: ['axiparabola', 'axiparabolan', 'axiparabolor', 'axiparabolorna',
             'axiparaboler', 'axiparabolspegel', 'axiparabolspegeln'],
    kort: 'En spegel som är slipad så att olika delar av ytan har olika brännvidd. I stället för att samla ljuset i en enda punkt drar den ut fokus till en lång, smal linje.',
    relaterade: ['laser', 'kolvattenacceleration', 'grupphastighet'],
    body: [
      { type: 'p', html: 'En vanlig hålspegel — eller ett förstoringsglas — har en enda brännvidd: allt ljus som träffar ytan samlas i samma punkt. Där blir det mycket ljusstarkt, men bara i en mycket kort sträcka längs strålen. Flyttar man en skärm någon tiondels millimeter framåt eller bakåt är den skarpa fläcken redan borta. För en stark laserpuls är det ett verkligt problem: det man vill använda pulsen till, till exempel att driva en våg genom en gas, hinner knappt börja innan ljuset spretar isär igen.' },
      { type: 'p', html: 'En axiparabola löser det genom att ge upp den enda brännpunkten. Ytan är slipad så att brännvidden växer utåt: ljus som träffar närmast mitten samlas strax framför spegeln, ljus som träffar en bit längre ut samlas lite längre bort, och ljuset från ytterkanten längst bort av alla. Varje ring i spegeln har alltså sin egen brännpunkt, och tillsammans lägger de fokus efter varandra på en rak linje som kan vara många millimeter lång — tusen gånger längre än den vanliga spegelns. Priset är att ljuset måste delas upp på hela sträckan i stället för att samlas på ett ställe, och att den skarpa fläcken får svaga ringar omkring sig i stället för att vara en ren prick.' },
      { type: 'p', html: 'Det verkligt användbara är att den ljusstarkaste punkten inte står stilla. Ljuset till de olika brännpunkterna har olika lång väg att gå och kommer alltså fram vid olika tidpunkter, så den ljusa fläcken sveper framåt längs linjen. Hur fort den sveper bestäms av spegelns form och kan ställas in — den kan till och med fås att gå fortare än ljuset, eftersom en fokuspunkt inte är ett föremål utan bara en plats där ljus från olika håll råkar mötas samtidigt. Ett sådant styrbart, vandrande fokus kallas flygande fokus, och används bland annat för att låta en plasmavåg hålla jämna steg med de elektroner som ska surfa på den. Namnet kommer av att spegeln kombinerar en <em>axicon</em> — en konformad optik som ger utdraget fokus — med en parabolspegel; formen beskrevs 2019.' }
    ]
  },
  {
    id: 'karnskugga',
    term: 'Kärnskugga',
    former: ['kärnskugga', 'kärnskuggan', 'kärnskuggor', 'kärnskuggorna', 'umbra', 'umbran'],
    kort: 'Den innersta delen av en skugga, dit inget ljus alls från ljuskällan når. Står du i månens kärnskugga är solen helt täckt.',
    relaterade: ['halvskugga', 'korona', 'fotosfar'],
    body: [
      { type: 'p', html: 'En skugga har skarp kant bara om ljuskällan är en punkt. Verkliga ljuskällor har utsträckning — solen är en skiva på himlen, en lampa är en glödande yta — och då delar sig skuggan i två zoner. I den yttre når ljus från en del av källan fram, men inte från hela: det är halvskuggan. I den inre når inget ljus alls fram, eftersom det skuggande föremålet skymmer hela källan sett därifrån. Den inre zonen kallas kärnskugga, eller umbra på latin.' },
      { type: 'p', html: 'Skillnaden är lätt att se hemma. Håll handen tätt över ett bord med taklampan tänd och skuggan blir mörk och skarp — bordet ligger i kärnskuggan. Lyft handen mot taket och skuggan blir stor, suddig och grå: nu ligger nästan hela bordet i halvskuggan, där en del av lampans lysande yta fortfarande syns förbi handen. Kärnskuggan är en kon som pekar bort från ljuskällan och tar slut på ett bestämt avstånd.' },
      { type: 'p', html: 'Just den avslutningen är det som avgör om en solförmörkelse blir total. Månens kärnskugga är precis så lång att spetsen nätt och jämnt når fram till jordytan — ibland gör den det inte alls, och då ser man i stället en ljus ring runt månen. Där konen träffar jorden blir fläcken bara några hundra kilometer bred, och den sveper fram över jordytan i tusentals kilometer i timmen. Därför är en total solförmörkelse alltid något som gäller ett smalt band, medan halvskuggan täcker en halv kontinent.' }
    ]
  },
  {
    id: 'halvskugga',
    term: 'Halvskugga',
    former: ['halvskugga', 'halvskuggan', 'halvskuggor', 'halvskuggorna', 'penumbra', 'penumbran'],
    kort: 'Den yttre, grå delen av en skugga, dit ljus från en del av ljuskällan når men inte från hela. I månens halvskugga ser man solen delvis täckt.',
    relaterade: ['karnskugga', 'fotosfar'],
    body: [
      { type: 'p', html: 'Ställ dig i en skugga från en lampa med stor lysande yta och titta uppåt. I skuggans mitt är lampan helt dold, men en bit ut åt sidan tittar en kant av den fram. Där är det inte mörkt, bara dunklare — en del av ljuset når fram, resten är blockerat. Den zonen kallas halvskugga, eller penumbra. Den är alltid ljusare i ytterkanten än in mot mitten, vilket är hela förklaringen till att skuggor har suddiga kanter.' },
      { type: 'p', html: 'Hur bred halvskuggan blir beror på hur stor ljuskällan ser ut från föremålet och hur långt bort skärmen ligger. En liten LED nära en hand ger en nästan knivskarp skugga; en molnig himmel, som lyser från alla håll, ger nästan ingen skugga alls utan bara en svag mörkning. Fotografer utnyttjar detta medvetet när de sätter en stor mjuk skärm framför en lampa för att bli av med hårda skuggkanter.' },
      { type: 'p', html: 'Vid en solförmörkelse är det halvskuggan som de allra flesta hamnar i. Månen skymmer då bara en del av solskivan, och hur stor del beror på var i halvskuggan man står — nära mitten nästan allt, längst ut nästan ingenting. Eftersom ögat uppfattar ljusstyrka ungefär logaritmiskt märks det förvånansvärt lite: även när fyra femtedelar av solen är borta ser en sommarkväll ganska normal ut.' }
    ]
  },
  {
    id: 'meteor',
    term: 'Meteor',
    former: ['meteor', 'meteoren', 'meteorer', 'meteorerna', 'stjärnfall', 'stjärnfallet', 'meteorsvärm', 'meteorsvärmen', 'meteorsvärmar', 'meteorsvärmarna', 'meteorskur', 'meteorskuren', 'meteoroid', 'meteoroider', 'meteorit', 'meteoriten', 'meteoriter'],
    kort: 'Ljusstrimman efter ett stoftkorn som brinner upp högt i atmosfären. Själva kornet heter meteoroid, och det som eventuellt når marken heter meteorit.',
    relaterade: ['komet', 'asteroid', 'plasma'],
    body: [
      { type: 'p', html: 'Ett stjärnfall är inte en stjärna och inte heller en sten som glöder av friktion i vanlig mening. Det som kommer in är oftast ett korn i storleksordningen ett sandkorn, och det färdas i tiotals kilometer per sekund. På ungefär tio mils höjd är luften fortfarande extremt tunn, men i den farten hinner kornet ändå slå in i luftmolekylerna så våldsamt att både kornet och luften framför det slits sönder till glödande, joniserad gas. Ljusstrimman vi ser är den gasen som lyser — därför syns strimman långt bredare än det lilla kornet.' },
      { type: 'p', html: 'Tre ord som lätt blandas ihop håller isär saken: kornet ute i rymden är en <em>meteoroid</em>, ljusfenomenet i atmosfären är en <em>meteor</em>, och den klump som mot förmodan överlever hela vägen ner till marken är en <em>meteorit</em>. De allra flesta meteoroider förångas fullständigt på några sekunder, och det enda som når marken är mikroskopiskt stoft som dalar ner under veckor.' },
      { type: 'p', html: 'Ibland kommer meteorerna i skurar. En komet som passerat nära solen lämnar ett band av stoft längs sin bana, och när jorden varje år korsar bandet vid samma tid får vi en meteorsvärm. Eftersom kornen i en svärm rör sig parallellt ser strimmorna ut att stråla ut från en enda punkt på himlen, precis som järnvägsspår tycks mötas vid horisonten. Den punkten kallas radiant, och svärmen får namn efter stjärnbilden den ligger i.' }
    ]
  },
  {
    id: 'perseiderna',
    term: 'Perseiderna',
    former: ['perseiderna', 'perseider', 'perseidsvärmen', 'perseidsvärm'],
    kort: 'Årets mest tillförlitliga meteorsvärm, som kulminerar kring den 12 augusti. Stoftet kommer från kometen 109P/Swift–Tuttle.',
    relaterade: ['meteor', 'komet'],
    body: [
      { type: 'p', html: 'Varje år i mitten av augusti passerar jorden genom ett band av stoft som kometen 109P/Swift–Tuttle lämnat efter sig under tusentals varv kring solen. Kometkärnan själv är omkring 26&nbsp;kilometer bred och kommer tillbaka in i det inre solsystemet först på 2120-talet, men skräpet ligger kvar längs hela banan. Kornen möter atmosfären i ungefär 59&nbsp;km/s, vilket är snabbt även med meteormått, och därför är perseiderna kända för ovanligt många ljusstarka strimmor.' },
      { type: 'p', html: 'Namnet kommer av att strimmorna tycks stråla ut från stjärnbilden Perseus. Det är ett perspektivfenomen: kornen rör sig i själva verket parallellt, och eftersom Perseus står lågt i nordost på kvällen och klättrar under natten blir det fler synliga meteorer ju närmare gryningen man kommer. Man tittar därför inte mot radianten utan gärna en bit vid sidan av den, där strimmorna hinner bli längre.' },
      { type: 'p', html: 'Antalet meteorer per timme brukar anges som ett så kallat zenitalt timtal. Det är ett beräknat idealvärde: hur många en observatör skulle se om radianten stod rakt upp och himlen vore helt mörk och klar. Verkligheten bjuder nästan aldrig på det, så det praktiska utfallet blir betydligt lägre — några tiotal i timmen är en god natt. Månens fas avgör mycket: infaller kulminationen vid fullmåne dränks de svaga meteorerna i månsken, medan en nymåne ger perfekt mörker.' }
    ]
  },
  {
    id: 'protostjarna',
    term: 'Protostjärna',
    former: ['protostjärna', 'protostjärnan', 'protostjärnor', 'protostjärnorna', 'protostellär', 'protostellärt', 'protostellära'],
    kort: 'En stjärna som håller på att bildas: en tät klump i ett kollapsande gasmoln som redan lyser av sammanpressningens värme, men ännu inte har tänt någon kärnreaktion i mitten.',
    relaterade: ['ackretionsskiva', 'rorelsemangdsmoment', 'karnfusion', 'plasma'],
    body: [
      { type: 'p', html: 'Stjärnor bildas inte ur tomma intet utan ur kalla, mörka moln av gas och stoft. Ett sådant moln hänger ihop så länge gastrycket orkar bära upp tyngden, men får det en knuff — från en närpasserande stjärna, en tryckvåg från en supernova — kan en del av det ge vika och börja falla ihop mot sin egen mittpunkt. Klumpen som växer i mitten är protostjärnan.' },
      { type: 'p', html: 'Den lyser redan, men av fel skäl. All gas som störtar inåt tappar lägesenergi, och den energin blir värme. Protostjärnan glöder alltså av sammanpressning, inte av kärnreaktioner, och strålar mest i infrarött eftersom den fortfarande ligger begravd i det stoft som är på väg ner mot den. Först när mitten hettats upp till omkring tio miljoner grader börjar vätekärnor slås samman till helium, och då — och inte förr — är den en riktig stjärna.' },
      { type: 'p', html: 'Steget däremellan tar hundratusentals till miljontals år, och det är en stökig period. Gasen kan inte falla rakt in, eftersom den snurrar, utan lägger sig först i en platt skiva runt klumpen. Ur mitten skjuter samtidigt smala strålar av gas ut åt två håll längs rotationsaxeln. Det är i den här fasen planeter börjar klumpa ihop sig i skivan, så en protostjärna är i praktiken ett solsystem under uppbyggnad.' }
    ]
  },
  {
    id: 'ackretionsskiva',
    term: 'Ackretionsskiva',
    former: ['ackretionsskiva', 'ackretionsskivan', 'ackretionsskivor', 'ackretionsskivorna', 'ackretion', 'ackretionen'],
    kort: 'En roterande skiva av gas och stoft på väg in mot en tung central kropp — en ung stjärna, en vit dvärg eller ett svart hål. Friktionen i skivan hettar upp materien så att den lyser.',
    relaterade: ['protostjarna', 'rorelsemangdsmoment', 'svart-hal', 'kvasar'],
    body: [
      { type: 'p', html: 'Materia som dras mot en tung kropp faller nästan aldrig rakt in. Den har nästan alltid en aning sidled i rörelsen från början, och när avståndet krymper förstärks den rörelsen — precis som en konståkare snurrar fortare när armarna dras in. Resultatet är att gasen missar målet och i stället går i bana runt det. Bidragen från alla håll jämnar med tiden ut varandra utom i ett plan, och kvar blir en platt, snurrande skiva.' },
      { type: 'p', html: 'I skivan går den inre delen fortare än den yttre, så gaslagren gnider mot varandra. Friktionen gör två saker samtidigt: den omvandlar rörelseenergi till värme, och den flyttar rörelse utåt så att gasen närmast mitten kan sjunka lite djupare. Skivan matar alltså kroppen i mitten långsamt, och lyser under tiden. Hur het den blir beror på hur tung kroppen är: kring en ung stjärna handlar det om några hundra till några tusen grader, kring ett svart hål om miljontals.' },
      { type: 'p', html: 'Just därför är ackretionsskivor ofta det enda man ser av objekt som annars är osynliga. Ett svart hål sänder inte ut något ljus alls, men skivan utanför lyser starkt i röntgen. Många skivor skjuter dessutom ut smala strålar av materia vinkelrätt mot skivplanet, drivna av magnetfält som skivans rotation vrider upp — ett mönster som återkommer i allt från nyfödda stjärnor till hela galaxers ljusstarka kärnor.' }
    ]
  },
  {
    id: 'rorelsemangdsmoment',
    term: 'Rörelsemängdsmoment',
    former: ['rörelsemängdsmoment', 'rörelsemängdsmomentet', 'impulsmoment', 'impulsmomentet', 'rotationsrörelsemängd'],
    kort: 'Ett mått på hur mycket rotation ett system innehåller — massan, farten och avståndet till rotationsaxeln multiplicerat. Storheten kan inte försvinna, bara flyttas någon annanstans.',
    relaterade: ['ackretionsskiva', 'protostjarna', 'spinn'],
    body: [
      { type: 'p', html: 'Att stoppa något som snurrar är svårare ju tyngre det är, ju fortare det går och ju längre ut från axeln massan sitter. De tre sakerna slås ihop i en enda storhet: rörelsemängdsmomentet. En cykelhjulsfälg och en lika tung klump i navet har helt olika rörelsemängdsmoment vid samma varvtal, eftersom fälgens massa sitter långt ut.' },
      { type: 'p', html: 'Det avgörande är att storheten är bevarad. I ett system som inget yttre vrider på kan rörelsemängdsmomentet varken skapas eller förstöras — bara fördelas om. Det är därför en konståkare snurrar snabbare när armarna dras in: massan kommer närmare axeln, och farten måste öka för att produkten ska hålla sig konstant. Samma sak får en pirueterande dykare att rotera fortare i hopkrupen ställning.' },
      { type: 'p', html: 'I astronomin är bevarandet ofta ett hinder snarare än ett kuriosum. Ett gasmoln som faller ihop till en stjärna snurrar allt fortare ju mindre det blir, och till slut går den innersta gasen så fort runt att den inte kan falla längre inåt. Stjärnan kan inte bli färdig förrän rotationen skickats i väg någon annanstans — ut i en skiva, eller ut med de gasstrålar som unga stjärnor skjuter ut längs sin axel.' }
    ]
  },
  {
    id: 'polarisation',
    term: 'Polarisation',
    former: ['polarisation', 'polarisationen', 'polariserad', 'polariserat', 'polariserade', 'linjärt polariserad', 'linjär polarisation', 'cirkulär polarisation', 'polarisationsriktning', 'polarisationsriktningen', 'polarisationsgrad', 'polarisationsgraden', 'cirkulärpolariserat', 'cirkulärpolariserad', 'linjärpolariserat', 'linjärpolariserad'],
    kort: 'Vilken riktning en ljusvågs elektriska fält svänger i. Vanligt ljus svänger huller om buller åt alla håll, men speglingar, spridning och magnetfält kan sortera fram en riktning.',
    relaterade: ['foton', 'vaglangd', 'kiralitet'],
    body: [
      { type: 'p', html: 'Ljus är en våg där ett elektriskt fält svänger fram och tillbaka tvärs mot färdriktningen. Tänk på ett rep som någon vickar på: du kan vicka det upp och ner, i sidled eller i vilken vinkel som helst däremellan. Den vinkeln är ljusets polarisationsriktning. En glödlampa eller solen sänder ut oräkneliga vågor med slumpmässiga riktningar samtidigt, och sammanlagt blir ljuset opolariserat — ingen riktning är vanligare än någon annan.' },
      { type: 'p', html: 'Vissa förlopp sorterar. Ett polarisationsfilter släpper bara igenom svängningar i en riktning, ungefär som ett galler av spjälor. Ljus som studsar snett mot en vattenyta eller en våt asfalt blir till stor del polariserat i sidled, vilket är hela idén bakom polariserade solglasögon: de har spjälorna ställda upp och ner och släcker därför reflexerna. Även ljus som sprids i himlen blir delvis polariserat, något humlor och honungsbin använder för att navigera.' },
      { type: 'p', html: 'Inom astronomin är polarisationen ofta det enda spår som finns av något osynligt. Stoftkorn som ställer in sig efter ett magnetfält, eller molekyler som strålar i ett magnetiserat gasmoln, sänder ut ljus som är en aning polariserat, med en riktning som är kopplad till fältets. Andelen kan vara nere på någon enstaka procent, men mäter man den över ett helt område träder magnetfältets form fram — utan att någon någonsin sett fältet i sig.' }
    ]
  },
  {
    id: 'hyperfinstruktur',
    term: 'Hyperfinstruktur',
    former: ['hyperfinstruktur', 'hyperfinstrukturen', 'hyperfinstrukturer', 'hyperfin', 'hyperfina', 'hyperfinnivå', 'hyperfinnivåer', 'hyperfinnivåerna', 'hyperfinövergång', 'hyperfinövergången', 'hyperfinövergångar', 'hyperfinsplittring', 'hyperfinsplittringen'],
    kort: 'En ytterst liten uppdelning av en atoms energinivåer, orsakad av att atomkärnan har ett eget magnetfält och en laddning som inte sitter i en enda punkt. Uppdelningen gör att varje spektrallinje egentligen är ett knippe linjer.',
    relaterade: ['spektroskopi', 'kvadrupolmoment', 'spinn'],
    body: [
      { type: 'p', html: 'En atoms elektroner får bara ha vissa bestämda energier, och när en elektron hoppar mellan två av dem sänds eller absorberas ljus med en bestämd våglängd. Det är de hoppen som ger grundämnena deras streckkodsliknande spektrum. Tittar man tillräckligt noga visar det sig dock att en enskild ”linje” inte är en linje alls, utan flera mycket tätt liggande linjer. Den finaste av dessa uppdelningar kallas hyperfinstruktur.' },
      { type: 'p', html: 'Orsaken sitter i kärnan. En atomkärna med udda antal kärnpartiklar beter sig som en liten magnet och har dessutom en positiv laddning som är utsmetad över ett litet område i stället för samlad i en punkt. Elektronerna närmast kärnan känner av båda sakerna: kärnans magnetfält drar lite olika beroende på hur elektronens och kärnans magnetnålar är riktade mot varandra, och en avlång laddningsfördelning drar annorlunda än en klotrund. Varje energinivå spjälkas därför upp i ett antal nivåer som ligger nästan, men inte riktigt, på samma energi. Skillnaderna är futtiga — ofta en miljondel av avståndet mellan de vanliga nivåerna — men fullt mätbara med en tillräckligt smalbandig laser.' },
      { type: 'p', html: 'Just för att uppdelningen kommer från kärnan är den ett fönster in i den. Ur hur brett knippet är går kärnans magnetism att räkna fram, och ur hur linjerna ligger inbördes går kärnans form att bestämma — utan att någon behöver komma i närheten av kärnan. Hyperfinstrukturen har också praktisk nytta: övergången mellan de två hyperfinnivåerna i cesium svarar mot en frekvens på 9&nbsp;192&nbsp;631&nbsp;770&nbsp;Hz, och det är precis det talet som i dag definierar en sekund.' }
    ]
  },
  {
    id: 'kvadrupolmoment',
    term: 'Kvadrupolmoment',
    former: ['kvadrupolmoment', 'kvadrupolmomentet', 'kvadrupolmomenten', 'kvadrupol', 'kvadrupolen', 'elektriskt kvadrupolmoment', 'elektriska kvadrupolmomentet'],
    kort: 'Ett mått på hur mycket en laddningsfördelning avviker från att vara klotrund. Positivt värde betyder utdragen som en rugbyboll, negativt betyder tillplattad som en lins, och noll betyder en perfekt kula.',
    relaterade: ['hyperfinstruktur', 'aktinid', 'spinn'],
    body: [
      { type: 'p', html: 'Ett laddat föremål påverkar sin omgivning på olika sätt beroende på hur laddningen är fördelad. Det enklaste är den sammanlagda laddningen — långt bort ser vilken laddningsklump som helst ut som en punkt. Nästa steg är dipolmomentet, som beskriver om plus och minus ligger åtskilda åt olika håll. Steget efter det heter kvadrupolmoment, och det är först där formen börjar synas.' },
      { type: 'p', html: 'Kvadrupolmomentet svarar på frågan: är laddningen utsmetad som ett klot, eller är den utdragen åt något håll? Ett klot ger noll. Är fördelningen utdragen längs sin rotationsaxel, som en rugbyboll, blir kvadrupolmomentet positivt; är den tillplattad som en lins blir det negativt. Ju kraftigare avvikelsen är, desto större blir talet. Effekten på omgivningen är svag och avtar snabbt med avståndet, vilket är precis därför den bara märks riktigt nära laddningen.' },
      { type: 'p', html: 'Inom kärnfysiken är det här det viktigaste sättet att få reda på hur en atomkärna ser ut. Kärnan går inte att avbilda, men elektronerna som passerar genom och intill den känner av dess kvadrupolmoment, och det syns som en liten förskjutning av atomens energinivåer. Många tunga kärnor visar sig vara påtagligt utdragna, och formen är inte en detalj: den avgör bland annat hur benägen kärnan är att spontant falla isär i två delar.' }
    ]
  },
  {
    id: 'aktinid',
    term: 'Aktinid',
    former: ['aktinid', 'aktiniden', 'aktinider', 'aktiniderna', 'aktinoid', 'aktinoider', 'fermium', 'fermiumet', 'einsteinium', 'californium', 'supertungt grundämne', 'supertunga grundämnen', 'transuran', 'transuraner', 'transuranerna'],
    kort: 'De femton grundämnena från aktinium till lawrencium, längst ner i det periodiska systemet. Alla är radioaktiva, och de tyngsta av dem finns inte i naturen utan måste tillverkas.',
    relaterade: ['isotop', 'radioaktivt-sonderfall', 'kvadrupolmoment'],
    body: [
      { type: 'p', html: 'Längst ner i det periodiska systemet står en rad som ofta bryts ut och placeras för sig: aktiniderna, de femton ämnena med atomnummer 89 till 103, från aktinium till lawrencium. De hör ihop därför att de fyller på samma svårtillgängliga elektronskal och därför beter sig kemiskt ganska likt. Torium och uran finns i berggrunden, plutonium i spårmängder, men allt tyngre än så är i praktiken människotillverkat.' },
      { type: 'p', html: 'Gemensamt för hela gruppen är att kärnorna är radioaktiva. Ju fler protoner en kärna har, desto hårdare trycker deras inbördes elektriska frånstötning isär den, och till slut vinner frånstötningen över den starka kraft som håller ihop kärnpartiklarna. Livslängderna faller därför dramatiskt uppåt i listan: uran-238 har en halveringstid på 4,5 miljarder år, medan flera fermiumisotoper klarar sig i timmar eller mindre. Utöver alfa- och betasönderfall dyker ett nytt sätt att gå sönder upp — spontan fission, där kärnan helt enkelt delar sig i två ungefär lika stora delar.' },
      { type: 'p', html: 'De tyngsta aktiniderna tillverkas genom att ett tungt ämne bombarderas med neutroner i en reaktor. Varje infångad neutron kan följas av ett betasönderfall som höjer grundämnesnumret med ett steg, och på så vis kan man klättra uppåt — men bara till en gräns. Vid fermium, nummer 100, tar metoden slut, eftersom nästa steg i kedjan sönderfaller alldeles för snabbt. Tyngre ämnen än så måste i stället byggas genom att slå ihop två kärnor i en accelerator, och då bildas de en atom i taget.' }
    ]
  },
  {
    id: 'chockvag',
    term: 'Chockvåg',
    former: ['chockvåg', 'chockvågen', 'chockvågor', 'chockvågorna', 'stötvåg', 'stötvågen', 'stötvågor', 'stötvågorna', 'chockkomprimera', 'chockkomprimerad', 'chockkomprimerat', 'chockkomprimerade', 'chockkompression', 'chockkompressionen'],
    kort: 'En tryckvåg som går fortare än ljudet i materialet den färdas genom. I stället för att bygga upp trycket mjukt slår den till som en vägg: tryck, densitet och temperatur hoppar nästan omedelbart till ett nytt värde.',
    relaterade: ['plasma', 'laser'],
    body: [
      { type: 'p', html: 'En vanlig ljudvåg är en mild förtätning som vandrar genom luft, vatten eller ett fast ämne. Trycket stiger en aning, sjunker tillbaka, och materialet är oförändrat efteråt. Men en förtätning färdas fortare där ämnet redan är hoptryckt, och det får en kraftig våg att hinna ikapp sig själv: framkanten brantar upp tills den är i praktiken lodrät. Då har man en chockvåg. Det är ljudbangen från ett överljudsplan, tryckvågen från en explosion och smällen när en piska knäpper.' },
      { type: 'p', html: 'Det som gör chockvågen speciell är att den inte bara flyttar materialet, den ändrar det. En partikel som vågen passerar går på bråkdelen av en miljondels sekund från ett tillstånd till ett annat: högre tryck, högre densitet och betydligt högre temperatur. Uppvärmningen är oundviklig — en del av rörelseenergin blir kvar som värme i stället för att lämnas tillbaka. Därför kan en tillräckligt kraftig chockvåg smälta, förånga eller till och med jonisera ett ämne den går igenom.' },
      { type: 'p', html: 'Just den egenskapen gör chockvågor till ett av få sätt att studera materia vid tryck som annars bara finns inne i planeter och stjärnor. I laboratoriet skapas de genom att en laserpuls förångar ytan på ett prov, så att resten trycks inåt av rekylen, eller genom att extremt starka magnetfält slungar en metallplatta mot provet. Tillståndet varar bara en miljarddels sekund innan allt faller isär, så alla mätinstrument måste utlösas i samma ögonblick.' }
    ]
  },
  {
    id: 'fasdiagram',
    term: 'Fasdiagram',
    former: ['fasdiagram', 'fasdiagrammet', 'fasdiagrammen', 'smältkurva', 'smältkurvan', 'smältkurvor', 'faslinje', 'faslinjen', 'faslinjer', 'trippelpunkt', 'trippelpunkten'],
    kort: 'En karta över vilken form ett ämne antar — fast, flytande eller gas — vid olika tryck och temperaturer. Linjerna på kartan visar exakt var ämnet byter form.',
    relaterade: ['absoluta-nollpunkten', 'plasma'],
    body: [
      { type: 'p', html: 'Vatten kokar vid 100&nbsp;°C, men bara vid normalt lufttryck. På ett högt berg kokar det tidigare, i en tryckkokare senare. Kokpunkten är alltså inte en egenskap hos vattnet ensamt, utan hos vattnet vid ett visst tryck. Ritar man upp trycket på ena axeln och temperaturen på den andra får man en karta där varje punkt svarar mot ett tryck och en temperatur, och där man kan färglägga vilken form ämnet har just där. Den kartan är ett fasdiagram.' },
      { type: 'p', html: 'Kartan delas av linjer. Smältkurvan skiljer det fasta från det flytande, ångkurvan skiljer vätska från gas, och där alla tre möts ligger trippelpunkten — det enda tryck och den enda temperatur där ämnet kan vara fast, flytande och gasformigt samtidigt. Att korsa en linje kostar energi utan att temperaturen ändras: all tillförd värme går åt till att bryta bindningarna i stället för att öka rörelsen.' },
      { type: 'p', html: 'De flesta ämnens smältkurva lutar uppåt åt höger — höjer man trycket krävs högre temperatur för att smälta. Vatten är det berömda undantaget och lutar åt andra hållet, eftersom is tar större plats än vattnet det bildas av. Vid riktigt höga tryck kan dessutom helt nya fasta former dyka upp, med atomerna staplade på ett annat sätt, så att ett fasdiagram ofta har långt fler områden än de tre man först väntar sig.' }
    ]
  },
  {
    id: 'isjatte',
    term: 'Isjätte',
    former: ['isjätte', 'isjätten', 'isjättar', 'isjättarna', 'isjätteplanet', 'isjätteplaneten', 'diamantregn', 'diamantregnet'],
    kort: 'En planet av Neptunus och Uranus typ: betydligt större än jorden, men uppbyggd mest av vatten, metan och ammoniak i stället för av väte och helium som gasjättarna.',
    relaterade: ['exoplanet', 'fasdiagram'],
    body: [
      { type: 'p', html: 'I vårt solsystem finns fyra stora planeter bortom asteroidbältet, men de är inte av samma sort. Jupiter och Saturnus består nästan helt av väte och helium och kallas gasjättar. Neptunus och Uranus är mindre och tyngre per volym, och huvuddelen av deras massa är i stället vatten, metan och ammoniak. Astronomerna kallar de ämnena ”is”, trots att det inte är någon is i vardaglig mening — därav namnet isjätte.' },
      { type: 'p', html: 'Namnet lurar. Inne i en isjätte är det varmt: temperaturen räknas i tusentals grader och trycket i miljontals gånger jordens lufttryck. Vattnet där är varken is eller vätska i vanlig bemärkelse utan en het, tät och elektriskt ledande vätska. Att den leder ström är förmodligen förklaringen till planeternas märkligt sneda och krokiga magnetfält, som inte alls är prydligt riktade som jordens.' },
      { type: 'p', html: 'Under de förhållandena förväntas metanet brytas sönder. Kolet som blir över kan klumpa ihop sig till kristaller som sjunker inåt genom den lättare omgivningen — ett ”diamantregn”, som har återskapats i laboratorium men aldrig setts direkt. Ingen sond har flugit in i en isjätte, så nästan allt vi tror oss veta om deras inre kommer från beräkningar plus högtrycksförsök på jorden. Utanför solsystemet verkar planeter i den här storleksklassen dessutom vara den allra vanligaste sorten.' }
    ]
  },
  {
    id: 'invers-betasonderfall',
    term: 'Invers betasönderfall',
    former: ['invers betasönderfall', 'inverst betasönderfall', 'invers betaomvandling'],
    kort: 'Reaktionen som gör det möjligt att alls fånga en antineutrino: den träffar en proton, gör om den till en neutron och skickar i väg en positron. Nästan alla neutrinodetektorer vid kärnkraftverk bygger på den.',
    relaterade: ['neutrino', 'radioaktivt-sonderfall', 'antimateria', 'scintillator'],
    body: [
      { type: 'p', html: 'Vid ett vanligt betasönderfall gör en neutron inne i en atomkärna om sig till en proton, och ut flyger en elektron och en antineutrino. Invers betasönderfall är samma sak baklänges: en antineutrino kommer utifrån, träffar en fri proton — alltså en vätekärna — och omvandlar den till en neutron, samtidigt som en positron flyger i väg. Namnet ”invers” syftar just på att reaktionen läses åt andra hållet.' },
      { type: 'p', html: 'Detta är det vanligaste sättet att upptäcka antineutriner, och skälet är att reaktionen lämnar ett spår som är svårt att förväxla med något annat. Först förintas positronen mot en elektron i omgivningen och det blir en ljusblixt. Neutronen, som saknar laddning, driver sedan omkring i vätskan i några mikrosekunder innan en atomkärna fångar in den och sänder ut gammastrålning — en andra blixt. Två blixtar på rätt avstånd i tid och rum är en signatur som slumpmässigt brus ytterst sällan lyckas härma. För att förkorta väntan mellan blixtarna blandar man ofta i gadolinium eller litium, ämnen som är särskilt giriga på neutroner.' },
      { type: 'p', html: 'Reaktionen har ett pris: den kräver en viss minsta energi. Neutronen är tyngre än protonen, och positronen ska dessutom skapas ur ingenting, så antineutrinon måste ha minst omkring 1,8 megaelektronvolt för att reaktionen ska kunna ske alls. Alla antineutriner med mindre energi än så passerar rakt igenom detektorn utan att synas — och det är merparten av dem. En detektor av det här slaget ser alltså bara toppen av flödet.' }
    ]
  },
  {
    id: 'klyvningsprodukt',
    term: 'Klyvningsprodukt',
    former: ['klyvningsprodukt', 'klyvningsprodukten', 'klyvningsprodukter', 'klyvningsprodukterna', 'klyvningsrest', 'klyvningsrester', 'klyvningsresterna', 'fissionsprodukt', 'fissionsprodukten', 'fissionsprodukter', 'fissionsprodukterna'],
    kort: 'Bitarna som blir kvar när en tung atomkärna som uran klyvs. De är nästan alltid radioaktiva, och det är de — inte uranet — som gör använt kärnbränsle farligt och varmt i århundraden.',
    relaterade: ['radioaktivt-sonderfall', 'isotop', 'neutrino'],
    body: [
      { type: 'p', html: 'När en urankärna träffas av en neutron och klyvs delar den inte upp sig i två lika halvor. Den spricker på ett slumpartat sätt, och resultatet blir två mellanstora kärnor av vitt skilda slag — strontium, jod, cesium, cerium, rutenium och ett par hundra andra möjligheter. Just dessa bitar kallas klyvningsprodukter.' },
      { type: 'p', html: 'Nästan alla är radioaktiva, och orsaken är enkel att förstå. Tunga kärnor behöver proportionellt fler neutroner än lätta för att hålla ihop. När en tung kärna klyvs ärver bitarna den tunga kärnans neutronöverskott, och de hamnar därför med för många neutroner för sin storlek. Kärnan rättar till obalansen genom betasönderfall: en neutron görs om till en proton, och ut flyger en elektron och en antineutrino. Ofta krävs flera sådana steg i rad innan kärnan blivit stabil.' },
      { type: 'p', html: 'Det är detta som gör att en avstängd reaktor inte blir kall. Kedjereaktionen upphör inom sekunder, men klyvningsprodukterna fortsätter sönderfalla och avge värme — de första timmarna med flera procent av den effekt reaktorn hade i drift, vilket är skälet till att kylningen aldrig får sluta fungera. Halveringstiderna spänner över hela skalan: sekunder för somliga, årtionden för strontium-90 och cesium-137, som är de som dominerar efter att årtiondena gått.' }
    ]
  },
  {
    id: 'scintillator',
    term: 'Scintillator',
    former: ['scintillator', 'scintillatorn', 'scintillatorer', 'scintillatorerna', 'scintillatorvätska', 'scintillatorvätskan', 'vätskescintillator', 'vätskescintillatorn', 'scintillation', 'scintillationen'],
    kort: 'Ett ämne som blinkar till med en liten ljusglimt varje gång en partikel far igenom det. Genom att mäta glimtarna kan man räkna partiklar som annars är helt osynliga.',
    relaterade: ['invers-betasonderfall', 'neutrino', 'radioaktivt-sonderfall'],
    body: [
      { type: 'p', html: 'En laddad partikel som far genom ett material knuffar till elektronerna i atomerna den passerar och lämnar dem i ett exciterat tillstånd. I de flesta ämnen blir energin till värme och försvinner. I en scintillator går en del av den i stället tillbaka som synligt ljus när elektronerna faller ner till sina ursprungliga energinivåer. Resultatet är en glimt som varar någon miljarddels sekund — svag, men mätbar.' },
      { type: 'p', html: 'Runt scintillatorn sitter därför ljuskänsliga rör som förvandlar ett fåtal ljuspartiklar till en elektrisk puls stor nog att registrera. Ju starkare glimt, desto mer energi lämnade partikeln efter sig, så scintillatorn mäter inte bara att något hänt utan också ungefär hur energirikt det var. Materialet kan vara en genomskinlig kristall, en plast eller en vätska.' },
      { type: 'p', html: 'Just vätskan är vanlig i de stora experimenten, av det enkla skälet att den går att ha mycket av: en tank fylls med tiotals eller tusentals kubikmeter, och hela volymen blir på en gång måltavla och mätinstrument. Det behövs när partiklarna man jagar nästan aldrig växelverkar. Vätskan kan dessutom blandas med tillsatser som gadolinium, som fångar in neutroner och gör att just neutronhändelser sticker ut. Mindre scintillatorer sitter i sjukhusens gammakameror och i handburna strålningsmätare.' }
    ]
  },
  {
    id: 'myon',
    term: 'Myon',
    former: ['myon', 'myonen', 'myoner', 'myonerna', 'kosmisk myon', 'kosmiska myoner', 'myonspår'],
    kort: 'En tyngre släkting till elektronen, ungefär 207 gånger så tung. Den lever bara ett par miljondels sekunder, men regnar ständigt ner över oss från kosmisk strålning — omkring en per sekund genom en utsträckt handflata.',
    relaterade: ['neutrino', 'standardmodellen', 'invers-betasonderfall'],
    body: [
      { type: 'p', html: 'Myonen är en av standardmodellens tolv materiepartiklar. Den har exakt samma laddning som elektronen och beter sig i stort sett likadant, men väger omkring 207 gånger mer. När den upptäcktes 1936 var den så oväntad att fysikern Isidor Rabi lär ha frågat: ”Vem beställde den?” Ingen hade sett något behov av en tyngre kopia av elektronen, och frågan varför naturen ändå har tre generationer av materiepartiklar är fortfarande obesvarad.' },
      { type: 'p', html: 'Myoner bildas högt uppe i atmosfären när partiklar från rymden krockar med luftmolekyler. De är instabila och sönderfaller efter i genomsnitt ett par miljondels sekunder — så kort tid att de även i nästan ljusets hastighet borde hinna någon halvkilometer innan de var borta. Ändå når de marken i stora mängder. Förklaringen är relativitetsteorin: sett från vårt perspektiv går myonens inre klocka långsammare, och sett från myonens eget perspektiv är sträckan ner till marken hoptryckt. Kosmiska myoner är därför ett av de tydligaste vardagsbevisen för att tid och längd inte är absoluta.' },
      { type: 'p', html: 'För den som bygger känsliga detektorer djupt under jord är samma myoner ett problem. De tränger igenom berg bättre än någon annan laddad partikel och slår loss neutroner och kortlivade kärnor i omgivningen, vilket kan ge signaler som liknar dem man letar efter. Därför förläggs experimenten i gruvor och tunnlar, omges av vetoskikt som larmar när en myon passerar, och räknar bort den tid då en myon nyss varit framme. Samma genomträngningsförmåga används också med flit: genom att mäta hur många myoner som tar sig igenom ett föremål kan man röntga sådant som pyramider och vulkaner.' }
    ]
  },

  {
    id: 'kosmisk-stralning',
    term: 'Kosmisk strålning',
    former: ['kosmisk strålning', 'kosmiska strålningen', 'kosmiska strålar', 'kosmiska strålarna', 'kosmiska partiklar', 'kosmiska partiklarna'],
    kort: 'Laddade partiklar — mest protoner — som kommer farande genom rymden med enorma hastigheter och ständigt regnar ner över jorden. Namnet är missvisande: det handlar inte om strålning i vanlig mening utan om partiklar.',
    relaterade: ['pevatron', 'myon', 'supernova', 'elektronvolt', 'vintergatan'],
    body: [
      { type: 'p', html: 'Trots namnet är kosmisk strålning inte ljus. Det är materia: ungefär nio partiklar av tio är protoner, resten är tyngre atomkärnor och en liten andel elektroner. De rör sig så nära ljusets hastighet att en enda partikel kan bära lika mycket rörelseenergi som ett fallande riskorn — all den energin samlad i en enda atomkärna. Namnet fastnade på 1920-talet, innan någon visste vad det var för något.' },
      { type: 'p', html: 'Att partiklarna är laddade får en obehaglig följd för den som vill veta varifrån de kommer. Rymden mellan stjärnorna är genomdragen av svaga magnetfält, och ett magnetfält böjer av en laddad partikel. Efter miljontals års irrfärd genom galaxen har en kosmisk proton bytt riktning så många gånger att den anländer från ett helt slumpmässigt håll. Man kan alltså räkna partiklarna men inte peka ut deras hem. Det är därför astronomer i stället letar efter gammastrålningen som uppstår där partiklarna accelereras — gammafotoner är oladdade och går rakt fram.' },
      { type: 'p', html: 'De partiklar som faktiskt når marken är sällan originalen. Högt uppe i atmosfären krockar den kosmiska partikeln med en luftmolekyl, och ur krocken sprutar en kaskad av nya partiklar som i sin tur krockar vidare — ett partikelregn som kan vara flera kilometer brett när det når marken. Det mesta som passerar genom din kropp just nu är sådana andrahandspartiklar, framför allt myoner.' }
    ]
  },

  {
    id: 'pevatron',
    term: 'PeVatron',
    former: ['pevatron', 'pevatronen', 'pevatroner', 'pevatronerna', 'protonpevatron', 'protonpevatroner'],
    kort: 'Ett naturligt objekt i rymden som klarar av att accelerera partiklar till en biljard elektronvolt eller mer — ungefär hundra gånger kraftigare än de största acceleratorer människan byggt.',
    relaterade: ['kosmisk-stralning', 'partikelaccelerator', 'elektronvolt', 'supernova', 'gammastralning'],
    body: [
      { type: 'p', html: 'Namnet är ihopsatt av PeV — peta-elektronvolt, alltså 10<sup>15</sup>&nbsp;elektronvolt — och ändelsen från äldre acceleratornamn som Bevatron och Tevatron. En PeVatron är helt enkelt något ute i rymden som gör samma sak som en partikelaccelerator, fast bättre. Protonerna i den största maskin människan byggt, LHC vid CERN, får omkring en hundrafemtiondels PeV var.' },
      { type: 'p', html: 'Varför just den energin är intressant beror på en knyck i statistiken. Sorterar man kosmiska partiklar efter energi faller antalet stadigt, men nära 10<sup>15</sup>&nbsp;elektronvolt viker kurvan av brantare. Böjen kallas knäet, och den vanliga tolkningen är att den egna galaxens acceleratorer inte orkar högre. Att hitta objekten som når ända dit är därför att hitta gränsfallen — de kraftfullaste maskiner vår galax har.' },
      { type: 'p', html: 'Man ser dem aldrig direkt. Själva partiklarna kommer fram utan adress, så jakten går ut på att leta efter gammastrålning med extremt hög energi och sedan avgöra om det är protoner eller elektroner som ligger bakom. De två alternativen ger nästan samma ljus, och att skilja dem åt kräver ofta att man jämför flera olika sorters mätningar av samma fläck på himlen. Drygt fyrtio kandidater i Vintergatan är kända; bara en handfull är någorlunda säkert avgjorda.' }
    ]
  },

  {
    id: 'pion',
    term: 'Pion',
    former: ['pion', 'pionen', 'pioner', 'pionerna', 'neutral pion', 'neutrala pioner', 'pionsönderfall'],
    kort: 'En kortlivad partikel som bildas när protoner och atomkärnor krockar hårt. Den neutrala varianten faller nästan omedelbart sönder till två gammafotoner, och är därför den lilla mellanhand som avslöjar var i rymden protoner accelereras.',
    relaterade: ['pevatron', 'gammastralning', 'standardmodellen', 'foton'],
    body: [
      { type: 'p', html: 'Pionen är den lättaste av de partiklar som byggs av en kvark och en antikvark. Den finns i tre varianter: en positivt laddad, en negativt laddad och en neutral. Alla tre är instabila. Den neutrala pionen är den bråttomaste av dem — den existerar i ungefär 10<sup>−16</sup>&nbsp;sekunder innan den faller sönder, oftast till exakt två gammafotoner.' },
      { type: 'p', html: 'Just det sönderfallet gör pionen användbar långt utanför partikelfysiken. När en snabb proton krockar med en atomkärna i gasen mellan stjärnorna bildas pioner, och de neutrala förvandlas genast till gammastrålning. Ser man alltså gammastrålning från ett moln av gas kan det vara ett kvitto på att protoner far omkring där. Fördelningen av strålningens energier har till och med en igenkännbar form som brukar kallas pionpuckeln, och den är svår att förväxla med något annat.' },
      { type: 'p', html: 'Historiskt var pionen efterlängtad. Hideki Yukawa förutsade 1935 en partikel som skulle förmedla den kraft som håller ihop atomkärnan, och räknade ut ungefär hur tung den måste vara. Det dröjde till 1947 innan pionen hittades i kosmisk strålning på ett bergstopp i Pyrenéerna — och när den väl var funnen fick Yukawa Nobelpriset.' }
    ]
  },

  {
    id: 'invers-comptonspridning',
    term: 'Invers comptonspridning',
    former: ['invers comptonspridning', 'invers comptonspridningen', 'comptonspridning', 'comptonspridningen', 'compton-spridning'],
    kort: 'När en mycket snabb elektron krockar med en ljuspartikel och sparkar upp den till mycket högre energi. Vanligt ljus kan på det viset förvandlas till röntgen- eller gammastrålning.',
    relaterade: ['foton', 'gammastralning', 'pevatron', 'kosmisk-stralning'],
    body: [
      { type: 'p', html: 'Vanlig Comptonspridning upptäcktes 1923: skjuter man röntgenstrålning mot en stillastående elektron studsar strålningen i väg med lite lägre energi, eftersom en del av den gått åt till att sätta elektronen i rörelse. Det var ett av de tydligaste bevisen för att ljus uppträder som partiklar och inte bara som vågor.' },
      { type: 'p', html: 'Vänder man på rollerna vänder också energiflödet. Är det i stället elektronen som far fram i nästan ljusets hastighet, och fotonen som ligger stilla och är energifattig, så är det elektronen som förlorar och fotonen som vinner. En foton av vanligt synligt ljus, eller till och med av den svaga kosmiska bakgrundsstrålningen, kan då kastas upp till röntgen- eller gammaenergier i en enda krock. Därav namnet: invers, alltså omvänd.' },
      { type: 'p', html: 'Processen är en av de vanligaste förklaringarna till varför det lyser i gamma på håll ute i universum, kring pulsarer, aktiva galaxkärnor och chockvågor efter stjärnexplosioner. Det gör den också till en irriterande dubbelgångare: gammastrålning från snabba elektroner kan se förvillande lik ut den som kommer av att protoner krockar med gas, och att avgöra vilken av processerna man ser är ett återkommande problem i högenergiastrofysiken.' }
    ]
  },

  {
    id: 'elementarladdning',
    term: 'Elementarladdning',
    former: ['elementarladdning', 'elementarladdningen', 'elementarladdningar', 'elementarladdningarna'],
    kort: 'Den minsta fria elektriska laddning som finns i naturen. All laddning man kan mäta på ett föremål är ett helt antal sådana, och elektronens och protonens laddning är precis en var.',
    relaterade: ['kvasipartikel', 'kvant-halleffekten', 'grafen'],
    body: [
      { type: 'p', html: 'Elektrisk laddning går inte att dela hur fint som helst. En elektron bär en negativ laddning av en bestämd storlek, en proton en lika stor positiv, och allt laddat man kan hålla i handen har en laddning som är ett helt antal gånger den storleken. Man kan ha två, sjutton eller en miljard elementarladdningar på en ballong — men aldrig två och en halv. Storheten betecknas med bokstaven <em>e</em>.' },
      { type: 'p', html: 'Att det förhåller sig så visades i början av 1900-talet av Robert Millikan, som lät små oljedroppar falla mellan två laddade plattor och justerade spänningen tills en droppe stod stilla i luften. Då balanserar den elektriska kraften tyngdkraften exakt, och droppens laddning går att räkna ut. När han samlat tillräckligt många droppar visade det sig att laddningarna aldrig låg hur som helst, utan alltid nära en multipel av ett och samma litet tal.' },
      { type: 'p', html: 'Sedan 2019 är elementarladdningen inte längre någonting man mäter upp, utan ett tal som är bestämt en gång för alla: den är exakt 1,602&nbsp;176&nbsp;634&nbsp;·&nbsp;10<sup>−19</sup>&nbsp;coulomb, och det är i stället amperen som definieras utifrån den. Det finns ett känt undantag från odelbarheten: kvarkarna inuti protoner och neutroner bär en tredjedels eller två tredjedelars elementarladdning. Men en ensam kvark går inte att plocka ut, så någon fri bråkdelsladdning stöter man aldrig på.' }
    ]
  },

  {
    id: 'fonon',
    term: 'Fonon',
    former: ['fonon', 'fononen', 'fononer', 'fononerna', 'fononsignal', 'fononsignalen'],
    kort: 'Den minsta portion av skakning som får plats i ett fast material. Ljud och värme i en kristall räknas som ett myller av sådana portioner, ungefär som ljus räknas i fotoner.',
    relaterade: ['kvasipartikel', 'foton', 'halvledare', 'absoluta-nollpunkten'],
    body: [
      { type: 'p', html: 'Slå på ena änden av en järnstång så hörs ljudet i den andra. Det som färdas är ingen materia utan en skakning: atomerna sitter kvar på sina platser i kristallen och guppar bara fram och tillbaka kring dem, medan själva rörelsemönstret vandrar vidare. En sådan skakning kan inte ha vilken styrka som helst. Precis som ljusenergi kommer i portioner som kallas fotoner, kommer skakningsenergin i ett fast material i bestämda portioner. En sådan portion kallas fonon.' },
      { type: 'p', html: 'Att räkna skakningar som partiklar är först och främst ett knep som gör räknandet möjligt. Ett gram metall innehåller så ofattbart många atomer att ingen kan följa dem en och en, men om deras gemensamma vibrationer beskrivs som ett gäng fononer som far omkring i kristallen, studsar mot varandra och mot orenheter, går det att räkna ut hur materialet leder värme och ljud. Ju fler fononer, desto varmare är materialet: temperatur är i den här bilden helt enkelt ett mått på hur mycket kristallen skakar.' },
      { type: 'p', html: 'Just därför blir fononer ett mätverktyg när man kyler ner något nästan hela vägen till den absoluta nollpunkten. I en iskall kristall är skakningen nästan borta, och då räcker det att en enda atomkärna får en knuff för att ett litet knippe fononer ska ge sig av genom gittret. Känsliga detektorer mäter den svaga värmepuls skakningen ger upphov till, och kan på så sätt registrera enskilda partiklar som annars inte skulle lämna något spår alls.' }
    ]
  },

  {
    id: 'wimp',
    term: 'WIMP',
    former: ['wimp', 'wimpen', 'wimpar', 'wimparna', 'wimp-jakt', 'wimp-jakten', 'wimp-jakterna'],
    kort: 'En av de mest studerade kandidaterna till vad mörk materia består av: en tung partikel som knappt bryr sig om vanlig materia, men som ändå kan stöta till en atomkärna en sällsynt gång.',
    relaterade: ['mork-materia', 'rotationskurva', 'standardmodellen', 'fonon'],
    body: [
      { type: 'p', html: 'Namnet är en engelsk förkortning för <em>weakly interacting massive particle</em>, alltså ungefär ”tung partikel som växelverkar svagt”. Det är inte namnet på en upptäckt partikel utan på en hel familj av tänkbara partiklar, med två gemensamma drag: de har rejält med massa, gärna i storleksordningen tio till tusen protonmassor, och de känner varken av den elektriska kraften eller den starka kraften. Därför far de rakt igenom vanlig materia utan att bromsas eller lysa.' },
      { type: 'p', html: 'Idén blev populär eftersom den löser två problem på en gång. Räknar man ut hur många sådana partiklar som borde ha blivit över från det tidiga universum landar man, för massor i just det området, nära den mängd mörk materia som astronomerna faktiskt mäter upp. Samtidigt förutsade flera teorier bortom den kända partikelfysiken partiklar med precis de egenskaperna. Sammanträffandet var lockande nog att bygga ett halvt sekel av experiment kring.' },
      { type: 'p', html: 'Sökandet går ut på att vänta. Om partiklarna finns strömmar de hela tiden genom jorden, och någon enstaka gång bör en av dem träffa en atomkärna i en detektor så att kärnan studsar i väg. Ingen har sett en sådan träff än, och de känsligaste experimenten har efterhand uteslutit stora delar av det område där partiklarna borde ha funnits. Därför riktas sökandet numera allt oftare mot betydligt lättare partiklar, som ger så små knuffar att äldre detektorer aldrig hade kunnat märka dem.' }
    ]
  },

  {
    id: 'kvasipartikel',
    term: 'Kvasipartikel',
    former: ['kvasipartikel', 'kvasipartikeln', 'kvasipartiklar', 'kvasipartiklarna'],
    kort: 'Ett mönster i hur väldigt många partiklar rör sig tillsammans, som beter sig precis som om det vore en egen partikel med bestämd plats, massa och laddning — fast det inte är gjort av något eget.',
    relaterade: ['kvant-halleffekten', 'elementarladdning', 'topologiskt-skydd'],
    body: [
      { type: 'p', html: 'Titta på en våg som rullar över en sjö. Vågen rör sig från en strand till en annan, den har en riktning och en fart, och den kan studsa mot en klippa. Ändå färdas inget vatten med den — vattnet guppar bara upp och ner på stället. Vågen är ett mönster, inte ett ting. Det är precis den sortens sak en kvasipartikel är, fast i ett material fullt av elektroner eller atomer.' },
      { type: 'p', html: 'Poängen med att kalla mönstret för en partikel är att räknandet blir enormt mycket enklare. Ett gram metall innehåller så många elektroner att ingen dator i världen kan hålla reda på dem var för sig. Men om deras gemensamma rörelser går att beskriva som ett fåtal kvasipartiklar som far omkring nästan oberoende av varandra, då kan man använda samma sorts fysik som för vanliga partiklar. Ljud i ett fast material behandlas till exempel som kvasipartiklar som kallas fononer, och ett hål där en elektron saknas i en halvledare behandlas som en positivt laddad partikel — det är så transistorer beskrivs.' },
      { type: 'p', html: 'Det märkliga är att kvasipartiklar kan ha egenskaper som ingen riktig partikel har. I vissa tvådimensionella elektronsystem i starka magnetfält uppträder krusningar som bär en tredjedel av en elektrons laddning, trots att ingen elektron har delats. De kan också reagera på att byta plats med varandra på sätt som varken elektroner eller ljuspartiklar gör. Just den egenheten är det som gör dem intressanta för framtidens beräkningsmaskiner.' }
    ]
  },

  {
    id: 'kvant-halleffekten',
    term: 'Kvant-Halleffekten',
    former: ['kvant-halleffekten', 'kvant-halleffekt', 'kvanthalleffekten', 'kvanthalleffekt', 'halleffekten', 'halleffekt', 'kvant-halltillstånd', 'kvant-halltillståndet', 'fyllnadsfaktor', 'fyllnadsfaktorn'],
    kort: 'Vad som händer när elektroner tvingas in i ett tunt skikt, kyls nästan till absoluta nollpunkten och utsätts för ett starkt magnetfält: de ordnar sig i ett stelt kvanttillstånd där resistansen antar exakta, bestämda värden.',
    relaterade: ['kvasipartikel', 'elementarladdning', 'grafen', 'tunneleffekt'],
    body: [
      { type: 'p', html: 'Skickar man en ström genom en metallplatta och lägger ett magnetfält vinkelrätt mot plattan trycks laddningarna åt sidan, så att det uppstår en spänning tvärs över strömriktningen. Det är den vanliga Halleffekten, känd sedan 1879, och den spänningen växer jämnt när magnetfältet ökar. Så ser det ut i vardagen.' },
      { type: 'p', html: 'Klaus von Klitzing upptäckte 1980 att det slutar se ut så under extrema förhållanden. Är elektronerna instängda i ett skikt så tunt att de bara kan röra sig i två riktningar, är temperaturen nära absoluta nollpunkten och magnetfältet mycket starkt, växer spänningen inte längre jämnt. Den hoppar mellan platåer och står helt still däremellan. På varje platå har resistansen ett värde som bara beror på två naturkonstanter och ett heltal — inte på materialet, inte på provbitens form och inte på hur noggrant någon tillverkat den. Exaktheten är så stor att effekten används som världens normal för elektrisk resistans.' },
      { type: 'p', html: 'Två år senare hittades platåer som svarade mot bråktal i stället för heltal, och det var en långt större överraskning: den varianten går inte att förklara med elektroner som rör sig var för sig, utan bara med att alla elektroner låser sig i ett gemensamt tillstånd. Talet som säger vilket tillstånd systemet hamnat i kallas fyllnadsfaktor. I de tillstånd där fyllnadsfaktorn är ett bråk uppstår krusningar som bär bråkdelar av en elektronladdning, och både heltalsvarianten och bråkvarianten har belönats med varsitt Nobelpris i fysik, 1985 respektive 1998.' }
    ]
  },

  {
    id: 'grafen',
    term: 'Grafen',
    former: ['grafen', 'grafenet', 'tvålagersgrafen', 'grafenskikt', 'grafenskiktet', 'grafenlager', 'grafenlagret'],
    kort: 'Ett enda lager kolatomer, ordnade i ett honungskaksmönster. Det är det tunnaste material som går att tillverka — en atom tjockt — och samtidigt ett av de starkaste och mest elektriskt ledande.',
    relaterade: ['kvant-halleffekten', 'kvasipartikel', 'nanoskala'],
    body: [
      { type: 'p', html: 'Grafit, alltså det svarta i en blyertspenna, består av tunna skivor kolatomer som ligger löst staplade på varandra. Att skivorna glider isär är hela anledningen till att en penna lämnar ett streck på papperet. Ett enda sådant skikt, en atom tjockt, kallas grafen. Atomerna sitter i ett sexkantigt mönster som ser ut som ett honungskakemönster eller ett hönsnät.' },
      { type: 'p', html: 'Länge trodde man att ett material som var en atom tjockt omöjligen kunde vara stabilt — det borde vecka ihop sig. År 2004 visade Andre Geim och Konstantin Novoselov att det gick, med en metod som är närmast pinsamt enkel: de tryckte en bit tejp mot en grafitbit och drog av, om och om igen, tills bara ett enda lager satt kvar. Sex år senare fick de Nobelpriset i fysik för upptäckten.' },
      { type: 'p', html: 'Egenskaperna är extrema åt flera håll samtidigt. Grafen är starkare än stål i förhållande till sin vikt, leder ström och värme utmärkt och är nästan genomskinligt. För fysiker är det dessutom en ovanligt ren lekplats: elektronerna kan bara röra sig i två riktningar, de rör sig ovanligt obehindrat, och lägger man två lager på varandra går materialets egenskaper att styra med en pålagd spänning. Därför används grafen ofta som provbit när man vill studera hur elektroner beter sig kollektivt.' }
    ]
  },
  {
    id: 'neutronstjarna',
    term: 'Neutronstjärna',
    former: ['neutronstjärna', 'neutronstjärnan', 'neutronstjärnor', 'neutronstjärnorna', 'pulsar', 'pulsaren', 'pulsarer', 'pulsarerna'],
    kort: 'Den hoppressade kärna som blir kvar när en tung stjärna exploderat. Den väger mer än solen men är bara ett par mil bred, vilket gör den till det tätaste föremål som finns utan att vara ett svart hål.',
    relaterade: ['supernova', 'magnetar', 'svart-hal'],
    body: [
      { type: 'p', html: 'En stjärna håller ihop genom en dragkamp: gravitationen drar allt inåt, medan trycket från fusionen i mitten trycker utåt. När bränslet tar slut i en stjärna som väger mer än ungefär åtta gånger solen upphör mottrycket på några sekunder, och kärnan faller ihop. De yttre lagren studsar ut i en supernova. Det som ligger kvar i mitten är en neutronstjärna.' },
      { type: 'p', html: 'Sammanpressningen är svår att ta in. Ungefär en och en halv solmassa hamnar i en kula som är omkring två mil tvärs över — ungefär en storstads bredd. Materialet är så tätt att atomerna inte längre finns kvar som atomer: elektronerna har tryckts in i protonerna, och kvar är i huvudsak neutroner tätt packade som i en enda jättelik atomkärna. En tesked av materialet skulle väga ett par miljarder ton. Ytans gravitation är hundratals miljarder gånger starkare än jordens.' },
      { type: 'p', html: 'Kollapsen bevarar två saker från den ursprungliga stjärnan: rotationen och magnetfältet, båda hopträngda till en mycket mindre kropp. Därför snurrar en nyfödd neutronstjärna ofta flera varv i sekunden, och den har ett magnetfält miljardtals gånger starkare än solens. Sitter magnetaxeln snett kan strålningen svepa förbi jorden som ljuset från en fyr, och då kallas stjärnan pulsar. De upptäcktes 1967 av Jocelyn Bell Burnell, som först skämtsamt märkte signalen ”LGM-1” — för ”little green men”, innan det stod klart att den kom från en roterande stjärnrest.' }
    ]
  },
  {
    id: 'magnetar',
    term: 'Magnetar',
    former: ['magnetar', 'magnetaren', 'magnetarer', 'magnetarerna'],
    kort: 'En sällsynt sorts neutronstjärna med det starkaste magnetfält som är känt i universum, tusen gånger kraftigare än hos vanliga neutronstjärnor. Fältet är så starkt att det spräcker stjärnans skorpa och driver våldsamma strålningsutbrott.',
    relaterade: ['neutronstjarna', 'gammastralning', 'polarisation'],
    body: [
      { type: 'p', html: 'Av alla neutronstjärnor som är kända är ett par dussin av ett eget slag. De snurrar långsammare än de andra, några sekunder per varv i stället för bråkdelar av en sekund, och de bromsar in ovanligt snabbt. Förklaringen är deras magnetfält, som är omkring tusen gånger starkare än hos en vanlig neutronstjärna. Sådana stjärnor kallas magnetarer.' },
      { type: 'p', html: 'Fältstyrkan är svår att jämföra med något i vardagen. En kylskåpsmagnet ligger på några hundradels tesla och en sjukhusmagnetkamera på några tesla, medan en magnetars yta kan nå tiotals miljarder tesla. Ett fält av den storleken är inte längre bara starkt, utan börjar förändra fysiken omkring sig: atomer dras ut till tunna spolar, och till och med det tomma rummet får optiska egenskaper det annars inte har.' },
      { type: 'p', html: 'Fältet är också stjärnans undergång. Det är inte i jämvikt utan omorganiserar sig ryckvis, och när det gör det spricker den stenhårda skorpan och energi frigörs i utbrott av röntgen- och gammastrålning. Ett enda sådant utbrott kan på en tiondels sekund stråla ut mer energi än solen gör på hundratusen år; ett utbrott år 2004 var starkt nog att märkbart störa jordens övre atmosfär, trots att källan låg femtiotusen ljusår bort. Eftersom fältet tär på sig självt varar magnetarstadiet bara i storleksordningen tiotusen år, varefter stjärnan lugnar ner sig till en vanlig neutronstjärna.' }
    ]
  },
  {
    id: 'ballistiska-fotoner',
    term: 'Ballistiska fotoner',
    former: ['ballistiska fotoner', 'ballistiska fotonerna', 'ballistisk foton', 'ballistiska fotonen', 'ballistisk', 'ballistiska'],
    kort: 'De ljuspartiklar som tar sig rakt igenom ett grumligt material utan att studsa mot något på vägen. De är få, men de är de enda som bär med sig en skarp bild av vad som fanns bakom.',
    relaterade: ['fyrvagsblandning'],
    body: [
      { type: 'p', html: 'Lys med en ficklampa mot handflatan i mörker och fingrarna glöder rött. Ljuset tar sig alltså igenom, men bilden av lampan är borta. Förklaringen är att nästan varje ljuspartikel har krockat med tusentals celler och bytt riktning om och om igen, ungefär som en biljardboll på ett bord fullt av andra bollar. Ett sådant ljus kallas diffust: det säger att något lyser, men inte vad.' },
      { type: 'p', html: 'En liten andel av ljuset klarar sig ändå fram utan en enda krock. De partiklarna kallas ballistiska, efter en kula som går rakt fram, och de har kvar all information om riktningen de kom ifrån. Skulle man kunna plocka ut bara dem ur röran skulle bilden bli skarp igen. Problemet är att de kan vara färre än en på en miljon.' },
      { type: 'p', html: 'Det finns ändå ett sätt att skilja dem åt: tiden. Ljus rör sig med ändlig fart, så en omväg kostar tid. De ballistiska partiklarna gick den kortaste möjliga vägen och kommer därför fram först, medan de kringstudsande släpar efter med en biljondels sekund eller mer. Den som kan öppna och stänga en slutare tillräckligt fort får alltså med sig bilden men slipper suddet. Just den idén ligger bakom flera metoder för att avbilda genom dimma, mjölkiga vätskor och levande vävnad.' }
    ]
  },
  {
    id: 'epsilon-nara-noll',
    term: 'Epsilon-nära-noll',
    former: ['epsilon-nära-noll', 'epsilon nära noll', 'epsilon-nära-noll-material', 'epsilon-nära-noll-materialet', 'permittivitet', 'permittiviteten'],
    kort: 'Ett tillstånd där ett material nästan inte alls svarar elektriskt på en ljusvåg av en viss våglängd. Materialet blir då ovanligt känsligt för starkt ljus, så att en ljusstråle kan styras med en annan.',
    relaterade: ['ballistiska-fotoner', 'fyrvagsblandning', 'metamaterial'],
    body: [
      { type: 'p', html: 'Hur ett material påverkar ljus beskrivs av dess permittivitet, som brukar betecknas med den grekiska bokstaven epsilon. Storheten talar om hur starkt materialets elektroner förskjuts av ljusvågens elektriska fält. I glas och vatten är den ordentligt större än noll, och ljuset saktar ner och bryts på det välkända sättet.' },
      { type: 'p', html: 'I vissa material passerar permittiviteten genom noll vid en bestämd våglängd. Det gäller framför allt genomskinliga metalloxider som leder ström, till exempel indiumtennoxid, där gränsen ligger i det nära infraröda området. Där svarar materialet knappt alls elektriskt på ljuset, och de vanliga tumreglerna slutar gälla: vågen får en mycket lång våglängd inuti materialet och fasen ändras nästan inte alls när ljuset tar sig igenom.' },
      { type: 'p', html: 'Det intressanta är vad som händer när ljuset är starkt. Nära den här punkten blir materialets svar kraftigt olinjärt, alltså inte längre proportionellt mot ljusets styrka. En intensiv laserpuls kan då ändra materialets optiska egenskaper på några femtosekunder, och en annan stråle som passerar samtidigt påverkas. Man kan alltså styra ljus med ljus, i ett skikt som bara är några hundra nanometer tjockt. Egenskapen används i försök med extremt snabba optiska omkopplare, frekvensomvandling och avbildning genom grumliga material.' }
    ]
  },
  {
    id: 'fyrvagsblandning',
    term: 'Fyrvågsblandning',
    former: ['fyrvågsblandning', 'fyrvågsblandningen', 'olinjär optik', 'olinjära optiken'],
    kort: 'En optisk process där tre ljusvågor växelverkar i ett material och tillsammans skapar en fjärde våg med en ny frekvens. Den fungerar bara när ljuset är mycket starkt.',
    relaterade: ['epsilon-nara-noll', 'ballistiska-fotoner'],
    body: [
      { type: 'p', html: 'Två ljusstrålar som korsar varandra i luft går rakt igenom varandra utan att märka något. Ljus växelverkar nämligen inte med ljus. Men inne i ett material kan strålarna påverka varandra indirekt: den ena strålen rubbar materialets elektroner, och den andra strålen känner av att materialet har ändrat sig. Vid vanliga ljusstyrkor är effekten försvinnande liten, men i en kort och intensiv laserpuls blir den mätbar. Området kallas olinjär optik.' },
      { type: 'p', html: 'Fyrvågsblandning är ett av de tydligaste exemplen. Tre ljusvågor växelverkar i materialet och skapar tillsammans en fjärde. Energin bevaras hela tiden, så den nya vågens fotonenergi är summan eller skillnaden av de andras. Läggs tre lika stora fotonenergier ihop får den nya fotonen tre gånger så hög frekvens, vilket betyder en tredjedel så lång våglängd: infrarött ljus kan på det sättet komma ut som synligt grönt.' },
      { type: 'p', html: 'Eftersom processen kräver att alla vågorna finns på samma ställe samtidigt fungerar den också som ett tidtagarur. Skickar man in en styrpuls som varar hundra femtosekunder blir den nya vågen till bara under de hundra femtosekunderna, och ingenting annat som passerar filmen syns. Fyrvågsblandning används därför både för att skapa nya laserfärger, för att förstärka signaler i optiska fibrer och som ultrasnabb slutare.' }
    ]
  },
  {
    id: 'lidar',
    term: 'Lidar',
    former: ['lidar', 'lidarn', 'lidarsystem', 'lidarsystemet', 'lidarsystemen'],
    kort: 'En avståndsmätare som skickar ut korta laserpulser och tar tid på ekot. Den bygger upp en tredimensionell karta av omgivningen, punkt för punkt.',
    relaterade: ['ballistiska-fotoner'],
    body: [
      { type: 'p', html: 'Namnet är bildat efter radar, men i stället för radiovågor används ljus. En lidar skickar i väg en mycket kort laserpuls, väntar på att den ska studsa mot något och komma tillbaka, och mäter hur lång tid det tog. Eftersom ljusets fart är känd ger tiden avståndet direkt: ljuset hinner ungefär 30&nbsp;cm på en miljarddels sekund, så en tur och retur på en miljarddels sekund betyder att föremålet står 15&nbsp;cm bort.' },
      { type: 'p', html: 'Genom att svepa strålen över omgivningen, eller skicka ut tusentals strålar samtidigt, byggs ett moln av mätpunkter upp — en tredimensionell bild av allt inom räckhåll. Självkörande fordon använder det för att se var bilar och gångtrafikanter finns, arkeologer för att hitta byggnader under tät skog, och satelliter för att mäta isarnas tjocklek på några centimeter när.' },
      { type: 'p', html: 'Den stora svagheten är dimma, snöfall och damm. Då studsar pulsen mot droppar redan på vägen ut, ekot dränks i det spridda ljuset och räckvidden faller kraftigt. Att skilja det ljus som verkligen kom från målet från allt annat är därför ett av de mest aktiva forskningsområdena kring tekniken.' }
    ]
  },
  {
    id: 'vakuumdubbelbrytning',
    term: 'Vakuumdubbelbrytning',
    former: ['vakuumdubbelbrytning', 'vakuumdubbelbrytningen', 'dubbelbrytning', 'dubbelbrytningen', 'dubbelbrytande', 'kritiska fältstyrkan', 'kritisk fältstyrka', 'vakuumresonans', 'vakuumresonansen'],
    kort: 'Kvantfysikens förutsägelse att ett mycket starkt magnetfält gör tomrummet till ett optiskt material, som bryter ljus olika mycket beroende på hur ljusvågen svänger. Effekten förutsades 1936 och har aldrig kunnat framställas i ett laboratorium.',
    relaterade: ['kvantelektrodynamik', 'polarisation', 'magnetar'],
    body: [
      { type: 'p', html: 'Vissa kristaller, som kalcit, har olika brytningsförmåga åt olika håll. Lägger man en kalcitbit över en textrad ser man två rader i stället för en, eftersom ljus som svänger i den ena riktningen bryts annorlunda än ljus som svänger i den andra. Egenskapen kallas dubbelbrytning, och den kräver normalt ett material med en inre ordning — atomer som sitter uppradade åt ett bestämt håll.' },
      { type: 'p', html: 'Enligt kvantelektrodynamiken kan även ett tomrum få en sådan ordning. Vakuum är nämligen inte stilla: par av elektroner och positroner uppstår hela tiden, existerar en ofattbart kort stund och försvinner igen. Vanligtvis märks de inte alls. Men i ett tillräckligt starkt magnetfält hinner paren rikta in sig efter fältet innan de slocknar, och då har tomrummet en riktning. Ljus som svänger längs fältet möter något annat än ljus som svänger tvärs över det, och de två går fram olika fort. Werner Heisenberg och Hans Euler räknade ut detta 1936.' },
      { type: 'p', html: 'Problemet är hur starkt fältet måste vara. Effekten blir påtaglig först i närheten av den kritiska fältstyrkan, ungefär fyra miljarder tesla — omkring hundra miljoner gånger mer än de kraftigaste magneter som byggts på jorden. Laboratorieförsök försöker i stället samla ihop en försvinnande liten effekt genom att skicka laserljus fram och tillbaka tusentals gånger genom en magnet, men signalen har hittills varit för svag. Därför riktas hoppet mot magnetarer, vars ytfält ligger flera gånger över den kritiska gränsen och som därmed är de enda kända platserna där fenomenet borde vara tydligt.' }
    ]
  },
  {
    id: 'kvantprick',
    term: 'Kvantprick',
    former: ['kvantprick', 'kvantpricken', 'kvantprickar', 'kvantprickarna', 'kvantpricksskärm', 'kvantpricksskärmar'],
    kort: 'En kristall så liten att elektronerna inuti den bara får ha vissa bestämda energier. Storleken bestämmer då vilken färg pricken kan absorbera och sända ut.',
    relaterade: ['nanoskala', 'kvantmekanik'],
    body: [
      { type: 'p', html: 'En kvantprick är en kristall av halvledarmaterial med en diameter på några nanometer — så liten att den rymmer kanske några tusen atomer. Vid den storleken får elektronerna inuti inte längre röra sig fritt. De är instängda på alla håll, ungefär som en boll i en mycket liten låda, och en instängd partikel kan bara ha vissa bestämda energier. Kvantpricken beter sig därför mer som en jättelik konstgjord atom än som en bit vanligt material.' },
      { type: 'p', html: 'Det praktiska med saken är att avstånden mellan de tillåtna energierna beror på hur stor lådan är. Krymper pricken flyttas nivåerna längre isär, och då krävs mer energi — alltså kortare våglängd — för att lyfta en elektron. Samma ämne kan på så vis göras att lysa rött, grönt eller blått enbart genom att prickarna tillverkas i olika storlek. Färgen sitter i geometrin, inte i kemin, vilket är ovanligt.' },
      { type: 'p', html: 'Kvantprickar sitter i dag i tv-apparater och datorskärmar, där de ger renare och mättade färger än vanliga vita lysdioder med filter. De används också som lysande markörer i biologiska prov, i solceller och i infraröda detektorer, där prickar av till exempel kvicksilvertellurid kan ställas in på att fånga just den våglängd man är ute efter. Nobelpriset i kemi 2023 gick till upptäckten och framställningen av dem.' }
    ]
  },
  {
    id: 'uppkonvertering',
    term: 'Uppkonvertering',
    former: ['uppkonvertering', 'uppkonverteringen', 'uppkonvertera', 'uppkonverterar', 'uppkonverterad', 'uppkonverterat', 'uppkonverterare'],
    kort: 'Att göra om ljus med låg fotonenergi till ljus med högre, till exempel infrarött till synligt. Den extra energin måste alltid komma någonstans ifrån.',
    relaterade: ['kvantprick', 'exciterat-tillstand'],
    body: [
      { type: 'p', html: 'Ljus kommer i paket, och varje paket bär en bestämd energi som hänger ihop med våglängden: ju längre våg, desto mindre energi per foton. Infrarött ljus har därför för klena fotoner för att synas, hur mycket av det som än strömmar in. Uppkonvertering är samlingsnamnet på knep som gör om sådana svaga fotoner till kraftigare, kortvågigare fotoner som ögat eller en billig kiselsensor kan uppfatta.' },
      { type: 'p', html: 'Energi kan inte skapas ur ingenting, så räkenskapen måste gå ihop. I ett rent optiskt fall får ett material ta emot två eller tre svaga fotoner och skicka ut en enda kraftig i stället — antalet minskar medan den samlade energin bevaras. I en elektrisk uppkonverterare är det i stället en pålagd spänning som betalar för det utsända ljuset, och den infraröda fotonen fungerar bara som avtryckare som avgör var och när ljuset ska tändas.' },
      { type: 'p', html: 'Verkningsgraden är nästan alltid det svåra: bara en liten andel av de infraröda fotonerna resulterar i en synlig. Ändå är tekniken lockande, eftersom den flyttar informationen till våglängder där detektorer är billiga och känsliga. Den prövas i mörkerseende, i bildgivare för värmestrålning och i solceller, där sådant ljus som annars passerar rakt igenom skulle kunna lyftas upp till en energi cellen faktiskt kan ta vara på.' }
    ]
  },
  {
    id: 'kvark-gluonplasma',
    term: 'Kvark-gluonplasma',
    former: ['kvark-gluonplasma', 'kvark-gluonplasman', 'kvark-gluonplasmat', 'kvarkgluonplasma', 'kvarkgluonplasman', 'urmateria', 'urmaterien'],
    kort: 'Ett materietillstånd så hett och tätt att kvarkarna och gluonerna inte längre sitter fast inuti varsin proton eller neutron, utan rör sig fritt om varandra. Universum bestod av det under sina första miljondels sekunder.',
    relaterade: ['standardmodellen', 'stark-vaxelverkan', 'plasma', 'baryon'],
    body: [
      { type: 'p', html: 'Under vanliga förhållanden kommer en kvark aldrig loss. Kraften mellan två kvarkar avtar nämligen inte med avståndet utan är i stort sett konstant, som ett gummiband, så ju längre isär man drar dem desto mer energi krävs. Till slut blir energin så stor att ett nytt kvarkpar bildas ur den, och man står där med två partiklar i stället för en lös kvark. Kvarkarna är därför alltid inlåsta, tre och tre i protoner och neutroner eller två och två i lättare partiklar.' },
      { type: 'p', html: 'Låsningen går ändå att bryta, men bara genom att angripa hela klumpen på en gång. Pressas materia ihop tillräckligt hårt och värms upp tillräckligt mycket börjar kärnpartiklarna överlappa varandra, och då blir det meningslöst att fråga vilken proton en viss kvark tillhör. Kvar blir en gemensam soppa av kvarkar och gluoner: en kvark-gluonplasma. Namnet plasma används för att tillståndet liknar en vanlig plasma, där elektronerna slitits loss från atomerna — här är det kvarkarna som slitits loss från kärnpartiklarna.' },
      { type: 'p', html: 'Universum var fyllt av kvark-gluonplasma under sina allra första miljondels sekunder, innan det svalnade tillräckligt för att protoner och neutroner skulle kunna bildas. I dag återskapas tillståndet i partikelacceleratorer genom att atomkärnor skjuts mot varandra i nästan ljusets hastighet. Droppen som bildas är mindre än en atomkärna och faller sönder nästan omedelbart, så den kan aldrig observeras direkt — allt man har att gå på är de tusentals partiklar som slungas ut, och riktningarna de flyger i. Mätningarna visar att plasman inte alls beter sig som en gas utan flyter som en vätska, dessutom med den lägsta inre friktion som är känd i naturen.' }
    ]
  },
  {
    id: 'elliptiskt-flode',
    term: 'Elliptiskt flöde',
    former: ['elliptiskt flöde', 'elliptiska flödet', 'anisotropt flöde', 'anisotropa flödet', 'triangulärt flöde', 'triangulära flödet'],
    kort: 'Ett mått på hur ojämnt partiklarna sprutas ut åt olika håll efter en kollision mellan två atomkärnor. Ojämnheten visar att materien som bildades flöt som en vätska — och vilken form krocken hade.',
    relaterade: ['kvark-gluonplasma', 'partikelaccelerator'],
    body: [
      { type: 'p', html: 'När två atomkärnor träffar varandra snett är det bara en del av dem som möts. Överlappet blir format som en mandel: brett åt ett håll, smalt åt det andra. Vad som händer sedan beror helt på vad materien i mitten är för något. Är den ett moln av partiklar som far rakt fram utan att bry sig om varandra, spelar formen ingen roll — då flyger lika många partiklar åt alla håll.' },
      { type: 'p', html: 'Är materien i stället en sammanhängande vätska uppstår ett tryck, och trycket faller snabbast där vägen ut är kortast. Fler partiklar slungas därför ut åt mandelns smala håll än åt det breda. Skillnaden mäts som ett tal, och eftersom mönstret har två motsatta riktningar kallas det elliptiskt flöde och betecknas <em>v</em><sub>2</sub>. Motsvarande tal för ett tresidigt mönster kallas triangulärt flöde, <em>v</em><sub>3</sub>, och kommer av att kärnpartiklarna aldrig ligger helt jämnt fördelade utan ger krocken små slumpmässiga ojämnheter.' },
      { type: 'p', html: 'Måttet har blivit ett av de viktigaste verktygen i studiet av heta kärnkollisioner, av två skäl. Ett starkt flöde är i sig ett tecken på att en vätska bildats. Och eftersom mönstret formas av krockens geometri går det att vända på resonemanget och läsa av något om själva kärnorna: en avlång kärna ger en plattare mandel än en rund, och alltså ett kraftigare flöde.' }
    ]
  },
  {
    id: 'akustisk-levitation',
    term: 'Akustisk levitation',
    former: ['akustisk levitation', 'akustiska levitationen', 'levitation', 'levitationen', 'akustisk levitator', 'akustiska levitatorn', 'levitator', 'levitatorn', 'levitatorer'],
    kort: 'Att hålla ett litet föremål svävande fritt i luften med hjälp av mycket starkt ljud, oftast ultraljud. Kraften kommer av att ljudtrycket är olika stort på föremålets olika sidor.',
    relaterade: ['besselstrale'],
    body: [
      { type: 'p', html: 'Ljud är tryckvariationer. När en ljudvåg passerar pressas luften omväxlande ihop och tunnas ut, och ett föremål som ligger i vägen får därför lite olika tryck på olika sidor. I vardagens ljudstyrkor är skillnaden alldeles för liten för att märkas. Skruvas ljudet upp tillräckligt mycket blir den däremot stor nog att bära ett litet och lätt föremål rakt upp mot tyngdkraften.' },
      { type: 'p', html: 'Det svåra är inte att lyfta något, utan att få det att stanna. Lösningen är nästan alltid en stående våg: två ljudvågor som möts från motsatta håll bildar ett mönster som står stilla i luften, med ställen där trycket svänger häftigt och ställen där det knappt ändras alls. De stillsamma ställena kallas tryckknutar, och ett litet föremål som glider åt sidan knuffas tillbaka in i knuten av trycket runt omkring. Knutarna ligger på ett halvt våglängdsavstånd från varandra, vilket med vanligt 40&nbsp;kHz-ultraljud blir drygt fyra millimeter. Därför ser man ibland flera droppar sväva i en lodrät rad, en i varje knut.' },
      { type: 'p', html: 'Nyttan ligger i att provet aldrig rör vid någonting. En droppe i ett provrör kan förorenas av glaset och börjar gärna kristallisera från kärlets yta, medan en droppe som svävar fritt bara har luft omkring sig. Metoden används därför för att studera hur ämnen kristalliserar, torkar och blandas, och den fungerar bara på små och lätta föremål: millimeterstora droppar, korn och flagor. En kaffekopp går inte att lyfta med ljud.' }
    ]
  },
  {
    id: 'besselstrale',
    term: 'Besselstråle',
    former: ['besselstråle', 'besselstrålen', 'besselstrålar', 'besselstrålarna'],
    kort: 'En stråle av ljus eller ljud som behåller sin bredd i stället för att spridas ut, och som dessutom sluter sig igen bakom ett hinder. Den byggs upp av vågor som kommer in snett från alla håll och möts längs en gemensam mittlinje.',
    relaterade: ['akustisk-levitation'],
    body: [
      { type: 'p', html: 'En vanlig stråle breder ut sig. Ficklampans ljuskägla blir bredare och svagare ju längre bort man lyser, och detsamma gäller ljud från en högtalare. Orsaken är diffraktion: en våg som pressas ihop i sidled får oundvikligen betala för det med att sprida sig framåt.' },
      { type: 'p', html: 'En besselstråle kringgår problemet genom att aldrig vara ihoppressad från början. Den byggs i stället av vågor som färdas snett inåt från alla håll, längs ytan av en kon, och som möts längs konens mittlinje. Där förstärker de varandra och bildar en smal, intensiv kärna, omgiven av allt svagare ringar. Eftersom mittlinjen hela tiden matas med nytt tillskott från sidorna behåller kärnan sin bredd sträcka efter sträcka, i stället för att tunnas ut. Mönstret av ringar beskrivs matematiskt av en så kallad besselfunktion, uppkallad efter den tyske astronomen och matematikern Friedrich Bessel, och det är därifrån namnet kommer.' },
      { type: 'p', html: 'Samma egenskap ger strålen ett andra kännetecken: den läker. Ställer man ett litet hinder mitt i kärnan skuggas visserligen mittlinjen strax bakom hindret, men lite längre fram har vågorna från sidorna hunnit fylla på igen och strålen ser ut som förut. Perfekta besselstrålar skulle kräva oändligt mycket effekt och finns bara på papperet, men goda efterlikningar går att göra över begränsade sträckor, och de används i dag i allt från laserbearbetning och mikroskopi till att flytta små föremål med ultraljud.' }
    ]
  },
  {
    id: 'aerogel',
    term: 'Aerogel',
    former: ['aerogel', 'aerogelen', 'aerogeler', 'kiselaerogel', 'kiselaerogelen'],
    kort: 'Ett fast material som till största delen består av luft, framställt genom att vätskan i en gel byts mot gas utan att strukturen faller ihop. Det är bland de lättaste fasta ämnen som finns.',
    relaterade: [],
    body: [
      { type: 'p', html: 'En gel är ett finmaskigt nätverk av fast material med vätska i alla hålrum, ungefär som gelé. Låter man vätskan avdunsta på vanligt sätt drar ytspänningen ihop nätverket och kvar blir en hopsjunken klump. Knepet bakom aerogel är att få bort vätskan utan att den någonsin bildar en yta som kan dra: materialet torkas under högt tryck, i ett tillstånd där gränsen mellan vätska och gas inte längre finns. Då står nätverket kvar precis som det var, med luft i stället för vätska i hålrummen.' },
      { type: 'p', html: 'Resultatet blir ett fast ämne som till 90–99&nbsp;procent består av luft. Den vanligaste sorten görs av kiseldioxid, samma ämne som glas, och väger några tiotals kilogram per kubikmeter — bara ett trettiotal gånger mer än luften själv. En bit ser ut som ett fruset rökmoln och känns nästan viktlös i handen, men bär ändå långt mer än sin egen tyngd.' },
      { type: 'p', html: 'Eftersom hålrummen är mindre än sträckan en luftmolekyl hinner färdas mellan två krockar leds värme mycket dåligt genom materialet, och aerogel är därför ett av de bästa isolermaterial som finns. Det har använts i rymdsonder för att fånga upp stoftkorn utan att de brinner upp, som isolering i marsfordon, och i byggnader där tunna väggar ändå ska hålla värmen kvar.' }
    ]
  },
  {
    id: 'parametrisk-resonans',
    term: 'Parametrisk resonans',
    former: ['parametrisk resonans', 'parametriska resonansen', 'parametriskt driven', 'parametriskt drivna', 'parametrisk pendel', 'parametriska pendeln', 'parametrisk förstärkning'],
    kort: 'Att en svängning växer sig starkare därför att någon av systemets egna egenskaper ändras i takt med svängningen, i stället för att en yttre kraft knuffar på. Att pumpa en gunga är det vanligaste exemplet.',
    relaterade: [],
    body: [
      { type: 'p', html: 'Det finns två sätt att få en svängning att växa. Det ena är att knuffa: någon utifrån trycker på i rätt ögonblick, gång på gång. Det andra är att ändra själva systemet — dess längd, dess styvhet, dess tröghet — i takt med att det svänger. Det andra sättet kallas parametrisk resonans, eftersom det är en parameter i systemet som ändras och inte en yttre kraft som läggs till.' },
      { type: 'p', html: 'Gungan är skolexemplet. Den som står upp i gungan och reser sig när den passerar sitt lägsta läge drar sin egen tyngdpunkt närmare upphängningen, alltså kortar pendeln, just när kraften i kedjan är som störst. I vändläget, där farten är noll och kraften liten, sätter hon sig ner igen och förlänger pendeln. Arbetet som läggs in när kraften är stor är större än det som lämnas tillbaka när den är liten, och skillnaden blir ny energi i svängningen. Ingen har knuffat.' },
      { type: 'p', html: 'Ett kännetecken är takten. Vid en vanlig knuff ska knuffarna komma en gång per svängning, alltså med samma frekvens som svängningen. Vid parametrisk resonans ska parametern i stället ändras <em>två</em> gånger per svängning — en gång vid varje passage genom mittläget. Ett annat kännetecken är att det inte hjälper att börja: en gunga som står helt stilla går inte att pumpa i gång, eftersom det inte finns någon svängning att förstärka. Samma princip används bland annat i vissa förstärkare inom elektroniken och optiken, där ett svagt insignalsvar förstärks genom att ett medium ändras i takt med signalen.' }
    ]
  },
  {
    id: 'optimal-styrning',
    term: 'Optimal styrning',
    former: ['optimal styrning', 'optimala styrningen', 'styrteori', 'styrteorin', 'reglerteori', 'reglerteorin', 'optimal reglering', 'tidsoptimal', 'tidsoptimala'],
    kort: 'Grenen av matematiken som söker det allra bästa sättet att styra ett system över tid, till exempel den snabbaste vägen till ett mål när det finns gränser för vad styrningen får göra.',
    relaterade: [],
    body: [
      { type: 'p', html: 'Många problem handlar inte om ett enda val, utan om en följd av val som sträcker sig över tid. Hur ska en raket gasa för att nå omloppsbanan med minst bränsle? När ska ett tåg bromsa för att stanna mjukt men i tid? Hur ska en person i en gunga röra sig för att komma högst? I samtliga fall finns ett system som utvecklas enligt kända lagar, en styrsignal som får ändras löpande, och ett mått på vad som är bra. Att hitta den bästa styrsignalen kallas optimal styrning.' },
      { type: 'p', html: 'Det svåra är att gränserna nästan alltid är verkliga. Motorn har en maxeffekt, benen en högsta hastighet, bromsen en gräns. Utan sådana gränser blir svaret ofta orimligt: gasa oändligt hårt i ett oändligt kort ögonblick. Med dem blir lösningen i stället typiskt en växling mellan ytterlägen — full gas ett tag, sedan ingenting, sedan full broms. Sådana lösningar kallas bang-bang-styrning, och de är förvånansvärt vanliga.' },
      { type: 'p', html: 'En besläktad metod är förstärkningsinlärning, där ingen räknar ut svaret i förväg. I stället får en dator pröva sig fram om och om igen och belönas när det går bra, ungefär som ett barn lär sig gunga. De två angreppssätten leder ofta till samma strategi, och när de gör det är det ett gott tecken på att strategin verkligen är den bästa och inte bara den man råkade hitta.' }
    ]
  },
  {
    id: 'elektrisk-dipol',
    term: 'Elektrisk dipol',
    former: ['elektrisk dipol', 'elektriska dipoler', 'dipol', 'dipolen', 'dipoler', 'dipolerna', 'dipolmoment', 'dipolmomentet', 'dipolmomenten', 'dipolväxelverkan', 'elektriska dipolen'],
    kort: 'Ett föremål vars positiva och negativa laddning sitter en liten bit ifrån varandra, så att ena änden blir plusare och den andra minusare — utan att helheten är laddad.',
    relaterade: ['bose-einstein-kondensat', 'kvantdroppe'],
    body: [
      { type: 'p', html: 'En vattenmolekyl är utåt sett oladdad: den har lika många protoner som elektroner. Ändå beter den sig inte som något neutralt. Syreatomen drar elektronerna hårdare till sig än väteatomerna gör, så syreänden blir en aning negativ och väteänden en aning positiv. Molekylen har blivit en <em>elektrisk dipol</em> — en liten laddningsstav med plus i ena änden och minus i den andra.' },
      { type: 'p', html: 'Hur sned laddningsfördelningen är mäts med dipolmomentet. Det räknas ut som laddningens storlek gånger avståndet mellan tyngdpunkterna för plus- och minusladdningen, och anges ofta i enheten debye. Vatten ligger på ungefär 1,85&nbsp;debye. Molekyler byggda av två olika alkalimetaller, som natrium och rubidium, kan komma upp i det dubbla eller mer, eftersom elektronerna där dras påfallande snett.' },
      { type: 'p', html: 'Två dipoler känner av varandra på ett sätt som beror på hur de är vända. Ligger de i linje, plus mot minus, dras de ihop. Ligger de sida vid sida med samma ände åt samma håll, stöter de bort varandra. Kraften avtar dessutom långsammare med avståndet än kraften mellan två hela laddningar gör i ett neutralt material, vilket gör dipolgaser till ett populärt verktyg när fysiker vill studera partiklar som påverkar varandra på långt håll.' },
      { type: 'fact', title: 'Dipoler i vardagen', items: [
        'Mikrovågsugnen värmer mat genom att vrida vattnets dipoler fram och tillbaka miljardtals gånger i sekunden.',
        'Att vatten löser salt beror på att vattendipolerna lägger sig runt varje jon och drar isär kristallen.',
        'En laddad ballong lyfter små pappersbitar därför att den först gör pappret till en dipol och sedan drar i den.'
      ] }
    ]
  },
  {
    id: 'kvantdroppe',
    term: 'Kvantdroppe',
    former: ['kvantdroppe', 'kvantdroppen', 'kvantdroppar', 'kvantdropparna'],
    kort: 'Ett moln av extremt kalla partiklar som håller ihop av sig självt, utan kärl och utan väggar, ungefär som en vattendroppe — fast miljontals gånger tunnare.',
    relaterade: ['bose-einstein-kondensat', 'elektrisk-dipol', 'superfluid'],
    body: [
      { type: 'p', html: 'En vattendroppe behåller sin form utan behållare. Molekylerna dras mot varandra och ytan drar ihop sig så långt den kan. En gas gör tvärtom: släpper man den fri breder den ut sig tills den fyller rummet. Under mycket speciella förhållanden kan ett ultrakallt gasmoln ändå bete sig som droppen — det håller ihop av sig självt när fällan som höll det stängs av. Ett sådant moln kallas kvantdroppe.' },
      { type: 'p', html: 'Att den inte faller ihop till en punkt är det märkliga. Dragningen mellan partiklarna vill pressa samman molnet, men kvantmekaniken sätter emot. Ju trängre partiklarna packas, desto mer osäker blir deras rörelsemängd, och det motsvarar en energi som stiger när volymen minskar. Det uppstår alltså ett inre mottryck som inte har något med värme att göra — det finns kvar också vid temperaturer nära den absoluta nollpunkten. Vid en viss storlek balanserar de två effekterna varandra, och droppen får en bestämd storlek.' },
      { type: 'p', html: 'Droppar av det här slaget har gjorts både av starkt magnetiska atomer och av molekyler med ett stort elektriskt dipolmoment. De är ofantligt mycket tunnare än vatten — tätheten kan vara mindre än en miljondel av luftens — men de har ändå en yta, en ytspänning och en form. Fysiker studerar dem för att de ligger i gränslandet mellan gas och vätska, där de vanliga formlerna för utspädda gaser inte längre gäller.' }
    ]
  },
  {
    id: 'forangningskylning',
    term: 'Förångningskylning',
    former: ['förångningskylning', 'förångningskylningen', 'förångningskyla', 'förångning', 'förångningen'],
    kort: 'Metoden att kyla något genom att låta de snabbaste partiklarna slippa ut. De som blir kvar har lägre medelenergi, alltså lägre temperatur.',
    relaterade: ['absoluta-nollpunkten', 'bose-einstein-kondensat'],
    body: [
      { type: 'p', html: 'Blås på en kopp hett kaffe och den svalnar. Skälet är inte främst att luften är sval, utan att de vattenmolekyler som råkar ha allra mest fart lämnar ytan och försvinner. Kvar i koppen blir de långsammare molekylerna, och eftersom temperatur är ett mått på medelrörelsen har kaffet blivit kallare. Samma sak händer när svetten avdunstar från huden.' },
      { type: 'p', html: 'Fysiker som arbetar med ultrakalla gaser använder exakt samma knep, fast med full kontroll. Atomerna eller molekylerna hålls i en fälla av laserljus eller magnetfält. Sedan sänks fällans kant, långsamt och i lagom takt, så att bara de energirikaste hinner klättra över och rymma. De som är kvar krockar med varandra och fördelar om energin, tills fördelningen åter är jämn men vid en lägre temperatur. Så upprepas det, steg för steg.' },
      { type: 'p', html: 'Priset är att provet krymper. Det är fullt normalt att bara någon procent av partiklarna finns kvar när slutmålet nåtts, men de som är kvar kan vara miljarddels grader från den absoluta nollpunkten — kallare än något som uppmätts naturligt någonstans. Metoden fungerar bara om partiklarna hinner krocka med varandra många gånger utan att gå förlorade på andra sätt, och det är just den balansen som gör steget särskilt svårt för molekyler, som lätt fastnar i varandra när de möts.' }
    ]
  },
  {
    id: 'lagrangepunkt',
    term: 'Lagrangepunkt',
    former: ['lagrangepunkt', 'lagrangepunkten', 'lagrangepunkter', 'lagrangepunkterna', 'librationspunkt', 'librationspunkten'],
    kort: 'En av fem platser i ett system med två stora himlakroppar där ett litet föremål kan följa med i banan utan att sacka efter eller rusa i förväg. Rymdteleskop parkeras ofta i den som ligger rakt bort från solen sett från jorden.',
    body: [
      { type: 'p', html: 'Ju längre från solen ett föremål går, desto svagare drar solen i det och desto längre tid tar ett varv. Jorden behöver ett år, Mars nästan två. Ett rymdskepp som placeras en bit utanför jordbanan borde därför halka efter jorden mer och mer. Men några särskilda platser är undantag: där ligger jorden så till att dess egen dragning läggs till (eller dras ifrån) solens med precis så mycket att varvet ändå tar ett år. Föremålet följer då med jorden runt solen som om det satt fast i den.' },
      { type: 'p', html: 'Sådana platser finns det fem av i varje system med två stora kroppar, och de brukar numreras L1 till L5. L1 ligger mellan solen och jorden, L2 rakt bakom jorden sett från solen, L3 på andra sidan solen, och L4 och L5 i själva jordbanan, en sjättedels varv före respektive efter jorden. De tre första är ostadiga som en kula på en sadel: minsta knuff åt sidan växer, så en farkost där måste tända motorerna med jämna mellanrum för att inte driva bort. L4 och L5 är i stället stabila, och i Jupiters L4 och L5 har det med tiden samlats tusentals asteroider, de så kallade trojanerna.' },
      { type: 'p', html: 'Punkterna är uppkallade efter Joseph-Louis Lagrange, som på 1770-talet räknade fram dem ur gravitationslagen. I dag är L2 i systemet sol–jord den populäraste adressen för rymdteleskop, drygt 1,5 miljoner kilometer från oss. Där ligger solen, jorden och månen åt samma håll, så ett enda solskydd räcker för att hålla allt varmt och lysande utanför synfältet. Teleskopen står inte exakt i punkten utan sveper runt den i en vid bana, bland annat för att slippa hamna i jordens skugga.' }
    ]
  }
];
