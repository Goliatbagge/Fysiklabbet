/*
  ÄFN – artiklarna. Ordningen styr placeringen: första artikeln (eller den med topp: true)
  blir toppnyhet, de två nästa hamnar under den, resten grupperas per kategori.

  Fält (bara rubrik krävs):
    rubrik        Rubriken
    etikett       Röd förtext i rubriken, t.ex. "AVSLÖJAR" → "AVSLÖJAR: rubrik"
    ingress       Fetstilt inledning
    kategori      Nyheter, Lokalt, Sverige, Världen, Politik, Ekonomi, Vetenskap, Teknik,
                  Hälsa, Sport, Nöje, Kultur, Mat, Resor, Djur, Debatt (eller egen)
    vinjett       Röd liten text ovanför rubriken (annars kategorin)
    reporter, reportertitel, reporterBild
    bild, bildtext, foto, bildFokus ("center top" m.m. för beskärningen i korten)
    brodtext      Stycken åtskilda av tom rad. "## Underrubrik", "> Citat",
                  "[bild: bilder/x.jpg | Bildtext | Fotograf]", **fet**, *kursiv*
    fakta         { rubrik: "Fakta", punkter: ["…", "…"] }
    amnen         ["Ämne", …]
    plus          true → ÄFN+-märke
    topp          true → toppnyhet
    publicerad    "2026-10-02T09:14" (annars sätts en tid strax före sidvisningen)
*/
window.AFN_ARTIKLAR = [
  {
    rubrik: 'Cristiano Ronaldo köper Tiktok – blir ny ägare till plattformen',
    ingress: 'Fotbollsstjärnan sägs ha gjort en av världens största affärer. Nu vill han göra om appen.',
    kategori: 'Sport',
    vinjett: 'Miljardaffären',
    reporter: 'Emma Lindberg',
    bild: 'bilder/ronaldo-tiktok.jpg',
    bildtext: 'Cristiano Ronaldo sägs nu bli ny ägare till Tiktok.',
    foto: 'AFP',
    topp: true,
    brodtext: `**STOCKHOLM.** Den portugisiske fotbollsstjärnan Cristiano Ronaldo har enligt uppgifter köpt den populära sociala medieplattformen Tiktok för flera miljarder dollar. Affären innebär att Ronaldo blir företagets nya ägare och får stort inflytande över plattformens framtida utveckling.

– Jag har alltid gillat att kommunicera med mina fans över hela världen. Tiktok är en fantastisk plattform och jag vill göra den ännu bättre, säger Ronaldo.

Ronaldo planerar att skapa nya funktioner för sport, träning och fotboll. Han vill även ge unga idrottare större möjligheter att visa upp sina talanger.

Nyheten har snabbt blivit viral på sociala medier. Miljontals användare har reagerat på den oväntade affären.

> ”Tiktok är en fantastisk plattform och jag vill göra den ännu bättre.”

## ”Jag ville skapa något nytt”

ÄFN fick en kort intervju med Ronaldo om affären.

**Cristiano, varför valde du att köpa Tiktok?**

– Jag ville skapa något nytt och använda plattformen för att inspirera människor inom sport och träning.

**Vad vill du förändra på Tiktok?**

– Jag vill framför allt ge unga idrottare fler möjligheter att visa upp sina talanger och skapa positivt innehåll.

**Hur mycket kostade affären?**

– Det är en mycket stor investering, men jag tror på plattformens framtid.

**Kommer du själv att använda Tiktok mer?**

– Absolut! Ni kommer nog att få se mycket mer fotboll, träning och roliga videor från mig.

**Vad är ditt första mål som ägare?**

– Att göra Tiktok till en ännu bättre plats för människor som älskar sport och kreativitet.`,
    fakta: {
      rubrik: 'Fakta: Affären',
      punkter: ['**Köpare:** Cristiano Ronaldo', '**Köpt objekt:** Tiktok', '**Affärens värde:** Flera miljarder dollar', '**Planer:** Fokus på sport, träning och unga talanger'],
    },
    amnen: ['Cristiano Ronaldo', 'Tiktok', 'Sociala medier'],
  },
  {
    rubrik: 'Alla skolor ska få gratis elcyklar för elever',
    ingress: 'Elever över hela Sverige kan snart få låna elcyklar gratis. Syftet är att göra det enklare att ta sig till skolan, minska biltrafiken och skapa ett mer miljövänligt sätt att resa.',
    kategori: 'Sverige',
    vinjett: 'Skolan',
    reporter: 'Jonas Ek',
    bild: 'bilder/elcyklar-skolan.jpg',
    bildtext: 'Vid flera skolor finns redan skyltar om de nya lånecyklarna.',
    foto: 'ÄFN',
    brodtext: `Ett nytt förslag innebär att skolor runt om i Sverige ska få ett antal elcyklar som elever kan låna. Cyklarna ska kunna användas både till och från skolan och under vissa skolaktiviteter.

Förslaget har väckt stort intresse bland elever. Många ungdomar bor flera kilometer från skolan och är därför beroende av buss, bil eller skjuts från sina föräldrar.

## Så ska systemet fungera

Elever som vill låna en cykel ska kunna boka den i en app. Där ska eleven kunna se vilka cyklar som är lediga och boka en viss tid.

När eleven kommer till skolan ska cykeln lämnas tillbaka på en särskild plats. Cyklarna ska förvaras i låsta cykelställ för att minska risken för stölder. Skolan ska också kontrollera cyklarna regelbundet så att bromsar, däck och batterier fungerar som de ska.

## Elever tycker att idén är bra

Många elever säger att en elcykel skulle kunna göra skolresan enklare.

– Jag bor ganska långt från skolan och tycker att det skulle vara skönt att kunna cykla utan att bli helt slut. Det skulle också göra det lättare att komma hem efter skolan, säger Elias Andersson, 16 år.

En annan elev tycker att projektet kan vara bra för elever som inte har möjlighet att få skjuts.

– Alla har inte en förälder som kan köra till skolan. Då kan en elcykel ge elever fler möjligheter att ta sig dit själva, säger Sara Nilsson, 15 år.

## Säkerheten kommer först

Trots de positiva reaktionerna finns det frågor om säkerheten. Elcyklar kan komma upp i högre hastigheter än vanliga cyklar, vilket gör det extra viktigt att eleverna kan trafikreglerna.

Därför ska elever enligt förslaget få en kort säkerhetsutbildning innan de får låna en cykel. Hjälm ska vara obligatoriskt.

– Vi vill att eleverna ska känna sig trygga. Därför ska alla få information om trafikregler, hjälm och hur cykeln fungerar innan de får använda den, säger projektledaren Anna Bergström.

## Mindre trafik och bättre miljö

Ett annat mål är att minska antalet bilar runt skolorna. På morgonen kan det ofta bli mycket trafik när föräldrar lämnar sina barn. Om fler elever cyklar kan området runt skolorna bli lugnare och säkrare för både elever och personal.

Projektet har även ett miljömål. Genom att ersätta vissa korta bilresor med cykling kan utsläppen från trafiken minska. Elcyklarna behöver dock laddas, vilket innebär att skolorna behöver ha laddningsplatser för batterierna.

## Det finns också problem

Elcyklar kostar mer än vanliga cyklar, och batterierna behöver laddas och underhållas. Det finns också en risk att cyklar blir stulna eller förstörda. En annan fråga är vilka elever som ska få låna cyklarna om efterfrågan blir större än antalet cyklar.

## Kan börja nästa termin

Om förslaget genomförs ska ett antal skolor först testa systemet under en begränsad period. Efter testet ska skolorna undersöka hur många elever som använde cyklarna och vilka problem som uppstod. Fungerar det bra kan projektet byggas ut till fler skolor.

För många elever skulle gratis elcyklar kunna innebära ett enklare sätt att ta sig till skolan – samtidigt som biltrafiken runt skolorna minskar.`,
    amnen: ['Skolan', 'Elcyklar', 'Miljö'],
  },
  {
    rubrik: 'Man smög in i främmande bubbelpool – blev ”besatt” av familjens gummianka',
    ingress: 'Mitt i natten tog sig en okänd man in på en privat tomt, badade i poolen och bubbelpoolen – och ägnade över tio minuter åt familjens gummianka. Sedan cyklade han iväg med badhanddukar för över 10 000 kronor.',
    kategori: 'Världen',
    vinjett: 'USA',
    reporter: 'Maja Lindqvist',
    bild: 'bilder/gummianka.jpg',
    bildtext: 'En gummianka i en pool. Arkivbild.',
    foto: 'Dorian Wallender (CC BY-SA 2.0)',
    brodtext: `**GEORGIA.** Polisen i Chatham County i den amerikanska delstaten Georgia letar efter en man som natten till den 1 september tog sig in på en privat tomt och använde familjens pool och bubbelpool – helt utan lov.

Allt fångades av husets övervakningskameror. Mannen befann sig på tomten någon gång mellan kvart över två och halv sex på morgonen.

## Tio minuter med ankan

Det som har fått störst uppmärksamhet är vad som hände i bubbelpoolen. Enligt polisen visar videon hur mannen blir *förtjust* i familjens gummianka och ägnar mer än tio minuter åt att intensivt pyssla med den.

> ”Han tog sig in på deras tomt, använde deras bubbelpool, blev besatt av deras gummianka och stal sedan deras poolhanddukar.”

Så sammanfattar Chatham County-polisen händelsen i sitt efterlysningsmeddelande.

## Flydde på cykel

När badet var över tog mannen med sig familjens badhanddukar, värda omkring 1 200 dollar – drygt 10 000 kronor. Sedan försvann han från platsen på en cykel.

Enligt polisen har fallet ”en hel del äckelfaktor”.

Mannen är fortfarande inte identifierad. Polisen ber allmänheten om tips, som kan lämnas anonymt via polisens app eller via Crime Stoppers.`,
    fakta: {
      rubrik: 'Fakta: Händelsen',
      punkter: ['**Var:** Chatham County, Georgia, USA', '**När:** 1 september 2026, mellan 02.15 och 05.30', '**Tid med gummiankan:** över tio minuter', '**Stöldgods:** badhanddukar för cirka 1 200 dollar', '**Flyktfordon:** cykel'],
    },
    amnen: ['USA', 'Polisen', 'Kuriosa'],
  },
  {
    rubrik: 'Kommunen inför kameraövervakning efter ökad skadegörelse',
    ingress: 'Efter en kraftig ökning av skadegörelse i centrum vill Björkstad kommun sätta upp övervakningskameror på flera offentliga platser. Kommunen hoppas att åtgärden både ska förebygga nya brott och göra det lättare för polisen att utreda dem som redan har begåtts.',
    kategori: 'Lokalt',
    vinjett: 'Björkstad',
    reporter: 'Lena Hjort',
    bild: 'bilder/kamera-centrum.jpg',
    bildtext: 'En av de första kamerorna är redan uppsatt vid torget i Björkstads centrum.',
    foto: 'Läsarbild',
    bildFokus: 'center top',
    brodtext: `**BJÖRKSTAD.** Klotter på väggar, förstörda bänkar och skadad belysning har blivit allt vanligare i Björkstads centrum. Nu föreslår kommunen att övervakningskameror ska sättas upp på fyra platser där problemen har varit som störst.

Enligt kommunens sammanställning har antalet anmälda fall av skadegörelse i centrum ökat med omkring 30 procent under det senaste året. Framför allt har busstationen och området runt torget drabbats.

Kommunen räknar med att installationen kommer att kosta ungefär 420 000 kronor. Trots kostnaden menar kommunen att åtgärden kan bli billigare på längre sikt om skadegörelsen minskar.

## ”Vi måste kunna agera”

Anna Lindberg är säkerhetssamordnare på Björkstad kommun och har varit med och tagit fram förslaget om kameraövervakning.

**Varför vill kommunen sätta upp kameror?**

– Vi har sett en tydlig ökning av skadegörelsen på vissa platser. När exempelvis belysning eller annan offentlig egendom förstörs kostar det pengar att reparera, men det påverkar också människor som använder platserna varje dag. Vi behöver därför prova nya sätt att förebygga problemen.

**Tror ni verkligen att kamerorna kommer att minska skadegörelsen?**

– Vi kan förstås inte garantera det. Kameror löser inte alla problem, men de kan ha en förebyggande effekt. Om något ändå händer kan inspelat material dessutom hjälpa till att identifiera vad som har hänt och när det hände.

**Finns det inte en risk att människor känner sig övervakade?**

– Jo, den frågan är viktig. Därför kommer kamerorna bara att placeras på platser där vi har identifierat återkommande problem. Vi vill inte ha kameror överallt. Det ska också finnas tydlig information om var kamerorna finns och hur materialet hanteras.

## Integriteten väcker frågor

Förslaget har samtidigt väckt frågor om personlig integritet. Kritiker menar att människor ska kunna röra sig fritt i centrum utan att känna sig övervakade.

Kommunen uppger att inspelningarna bara ska sparas under en begränsad period och att materialet inte ska användas för andra ändamål än de som anges i kommunens regler. Kamerorna ska framför allt riktas mot offentliga platser där skadegörelse har dokumenterats, och resultatet ska följas upp efter det första året.

– Vi vill kunna se om åtgärden faktiskt gör skillnad. Om problemen inte minskar måste vi vara beredda att tänka om, säger Anna Lindberg.

## Beslut väntas senare i höst

Kommunfullmäktige väntas ta ställning till förslaget senare under hösten. Om det godkänns kan installationen påbörjas under våren.

Tanken är att kameraövervakningen ska kombineras med andra åtgärder, bland annat bättre belysning och ökad närvaro av kommunens personal på kvällstid.

För invånarna återstår nu att se om kamerorna blir en del av Björkstads centrum, eller om förslaget möter tillräckligt stort motstånd för att ändras innan beslutet fattas.`,
    amnen: ['Björkstad', 'Kameraövervakning', 'Brott'],
  },
  {
    rubrik: 'Skolan testar fyradagarsvecka: ”Kan minska elevernas stress”',
    ingress: 'En extra ledig dag i veckan ska ge gymnasieelever mer tid för återhämtning och bättre balans i vardagen. Nu testar en gymnasieskola ett schema där undervisningen samlas på fyra dagar i stället för fem. Men alla är inte övertygade.',
    kategori: 'Sverige',
    vinjett: 'Skolan',
    reporter: 'Sofia Berg',
    bild: 'bilder/fyradagarsvecka.jpg',
    bildtext: 'Med det nya schemat blir fredagen ledig – i stället blir de andra skoldagarna längre.',
    foto: 'ÄFN',
    brodtext: `En gymnasieskola har inlett ett försök med fyradagarsvecka för att undersöka om elever kan få mindre stress utan att studieresultaten försämras. Eleverna är lediga en vardag i veckan, medan lektionerna fördelas över de fyra återstående dagarna.

Bakgrunden är den växande diskussionen om stress och höga krav i skolan. Många elever behöver hinna med lektioner, läxor och prov samtidigt som de försöker få tid till sömn och fritidsaktiviteter. Skolledningen hoppas att en extra ledig dag ska göra vardagen lättare att planera.

## Längre skoldagar ersätter fredagen

För att eleverna fortfarande ska hinna med kursinnehållet blir skoldagarna längre. Lärarna ska planera undervisningen så att eleverna får tid för både genomgångar och självständigt arbete.

Rektorn förklarar att tanken inte är att eleverna ska få mindre undervisning eller lägre krav.

– Vi vill undersöka om det går att organisera skolan på ett annat sätt. Elever behöver både lära sig och få tid att återhämta sig. Om försöket fungerar kan det ge oss viktig kunskap om hur skoldagen kan planeras bättre, säger rektorn.

## Eleverna välkomnar förändringen

Bland eleverna finns både positiva förväntningar och en viss tveksamhet. Elin, som går första året på gymnasiet, tror att den extra lediga dagen kan göra stor skillnad.

– Ibland känns det som att hela veckan går ut på att gå till skolan och sedan plugga inför nästa prov. Med en extra ledig dag skulle jag kunna planera mina läxor bättre och samtidigt hinna göra saker på fritiden, säger hon.

Lucas, som också går på skolan, är mer tveksam.

– Det låter bra att vara ledig en extra dag, men om skoldagarna blir för långa tror jag att det kan bli svårare att koncentrera sig. Man måste se till att eleverna faktiskt orkar med schemat, säger han.

## Kan längre dagar skapa nya problem?

En viktig fråga är om den extra ledigheten verkligen minskar stressen eller bara flyttar arbetsbelastningen till andra dagar. Om eleverna får fler lektioner under varje skoldag kan det bli svårare att hålla koncentrationen uppe.

Även lärarnas arbetssituation behöver följas upp. Ett nytt schema kräver planering och kan påverka både möten, bedömning och kontakten med eleverna.

Skolan ska därför följa upp hur eleverna upplever förändringen och undersöka närvaro och studieresultat under försöksperioden. Först efter utvärderingen avgör skolledningen om modellen ska fortsätta.

## Kan spridas till fler skolor

Om försöket visar positiva resultat kan det inspirera andra skolor att pröva liknande lösningar. Samtidigt finns flera frågor kvar, bland annat hur långa skoldagar eleverna klarar av och hur undervisningen bäst fördelas.

Om fyradagarsveckan blir en framgång återstår att se. Men en sak är tydlig: frågan om hur skolan kan minska stressen utan att försämra undervisningen lär fortsätta att diskuteras.`,
    amnen: ['Skolan', 'Stress', 'Schema'],
  },
  {
    rubrik: 'Gymnasieskola flyttar skolstarten till 09.00',
    ingress: 'Efter flera månaders diskussioner har Västerdalsskolan beslutat att testa en senare skolstart. Från och med vårterminen börjar elevernas första lektion tidigast klockan 09.00. Skolan hoppas på piggare elever och bättre närvaro.',
    kategori: 'Lokalt',
    vinjett: 'Västerdal',
    reporter: 'Oskar Wall',
    bild: 'bilder/vasterdalsskolan.jpg',
    bildtext: 'Från vårterminen blir det sovmorgon för eleverna på Västerdalsskolan.',
    foto: 'Västerdalsskolan',
    brodtext: `**VÄSTERDAL.** Elever som tidigare behövt vara på plats strax före klockan åtta får nu sovmorgon. Västerdalsskolan kommer under vårterminen att testa en ny starttid där undervisningen börjar tidigast klockan 09.00.

Beslutet kommer efter att både elever och personal länge diskuterat skolans tidiga morgnar. Enligt skolledningen har framför allt elevernas trötthet under de första lektionerna varit en återkommande fråga.

– Vi har fått många synpunkter från elever som upplever att de har svårt att koncentrera sig tidigt på morgonen. Därför vill vi testa om en senare start faktiskt kan göra skillnad, säger Maria Ekström, rektor på Västerdalsskolan.

## ”Inte mindre undervisning”

Den nya skolstarten innebär inte att skoldagen blir kortare. I stället flyttas dagens lektioner framåt, och vissa dagar kan eleverna behöva stanna kvar längre på eftermiddagen.

**Varför väljer ni att testa en senare skolstart?**

– Vi vill undersöka om elevernas förutsättningar på morgonen kan förbättras. Om man kommer till skolan väldigt trött kan det vara svårare att koncentrera sig, delta i undervisningen och ta till sig information.

**Finns det en risk att eleverna bara går och lägger sig senare när de får sovmorgon?**

– Absolut, och det är något vi är medvetna om. Skolan kan inte bestämma när eleverna går och lägger sig. Därför vill vi också informera om sömn och rutiner. Testet handlar om att se vad som händer när skoldagen börjar senare, inte om att säga att sovmorgon automatiskt löser alla problem.

**Kommer eleverna att få mindre undervisning?**

– Nej. Undervisningstiden ska vara densamma. Skillnaden är framför allt när skoldagen börjar och slutar.

## Alla är inte positiva

Vissa elever tycker att den senare starten är bra eftersom de får mer tid på morgonen. Andra är oroliga för att skoldagen ska sluta för sent och påverka fritidsaktiviteter, träning och arbete efter skolan.

– Jag tror att det kommer bli skönt att slippa stressa på morgonen. Men om man slutar senare varje dag kan det bli jobbigt med träningar och annat efter skolan, säger eleven Leo Nilsson, 17.

Även lärare har uttryckt både positiva och negativa synpunkter. En senare start kan innebära förändringar i schemat och påverka personalens arbetstider.

## Utvärderas efter vårterminen

Skolan kommer att följa upp testet under hela vårterminen. Bland annat ska närvaro, sena ankomster och elevernas upplevelse av trötthet undersökas. Elever och personal får också svara på en enkät före och efter testperioden.

– Vi vill inte bestämma i förväg att senare skolstart är bättre. Vi vill testa det och sedan titta på resultatet, säger Maria Ekström.

Blir resultatet tydligt bättre kan den senare skolstarten fortsätta även efter vårterminen. Annars kan skolan gå tillbaka till de tidigare tiderna. Den stora frågan för eleverna blir alltså om en timmes extra sömn faktiskt gör någon skillnad under resten av skoldagen.`,
    amnen: ['Västerdal', 'Skolan', 'Sömn'],
  },
  {
    rubrik: 'Kraftig översvämning efter skyfall i Göteborg – gator fyllda med vatten',
    ingress: 'Kraftiga regn har orsakat översvämningar på flera platser i Göteborg. Vägar och trottoarer har täckts av vatten, och räddningstjänsten uppmanar allmänheten att undvika de drabbade områdena.',
    kategori: 'Nyheter',
    vinjett: 'Skyfallet',
    reporter: 'Per Almqvist',
    bild: 'bilder/oversvamning.jpg',
    bildtext: 'Vattnet forsar fram längs gatorna efter nattens skyfall.',
    foto: 'Läsarbild',
    brodtext: `**GÖTEBORG.** Under natten och fredagsmorgonen föll stora mängder regn över Göteborg. Vattnet samlades snabbt på gator och i lågt belägna områden. På vissa platser blev det svårt för trafikanter att ta sig fram, samtidigt som flera boende uttryckte oro över situationen.

– Jag blev förvånad när jag såg hur mycket vatten det var på gatan. Jag har aldrig sett det så här illa tidigare, säger Göteborgsbon Anna Karlsson.

## Räddningstjänsten varnar

De stora regnmängderna har gjort att dagvattensystemen haft svårt att leda bort allt vatten. När regnet faller snabbare än vattnet kan rinna undan ökar risken för översvämningar.

Räddningstjänsten uppmanar människor att hålla sig borta från vattenfyllda vägar och att inte försöka köra genom områden där vattendjupet är okänt.

– Det är viktigt att människor tar situationen på allvar. Vatten på vägar kan vara djupare än det ser ut, och det kan finnas dolda hinder under ytan, säger räddningsledaren.

## Trafiken påverkas

Översvämningen har även påverkat framkomligheten i staden. Bilister har tvingats sänka hastigheten, och i vissa områden kan trafiken behöva ledas om om vägarna blir oframkomliga. Även fotgängare har fått problem på grund av vattenfyllda trottoarer och gångvägar.

## Fortsatt osäkert läge

Hur omfattande konsekvenserna blir beror på hur mycket mer regn som faller och hur snabbt vattnet kan rinna undan. Invånare uppmanas att följa information från Göteborgs Stad och räddningstjänsten.

Flera boende hoppas nu att regnet ska avta så att vattnet kan börja sjunka undan.`,
    amnen: ['Göteborg', 'Väder', 'Översvämning'],
  },
  {
    rubrik: 'Skola överväger förbud mot energidrycker – vill förbättra elevernas hälsa',
    ingress: 'En skola planerar att utreda ett förbud mot energidrycker i skolans lokaler. Bakgrunden är en diskussion om hur koffein påverkar elevernas sömn, koncentration och välmående.',
    kategori: 'Hälsa',
    vinjett: 'Skolan',
    reporter: 'Sofia Berg',
    bild: 'bilder/energidrycker.jpg',
    bildtext: 'Energidrycker är vanliga under skoldagen – nu kan de bli förbjudna.',
    foto: 'ÄFN',
    brodtext: `Frågan om energidrycker bland ungdomar har blivit allt mer aktuell. Nu överväger en skola att införa nya regler för att minska konsumtionen under skoldagen. Förslaget innebär att elever inte längre skulle få dricka energidrycker i klassrummen eller under skolans raster.

Ett eventuellt beslut kan påverka både elevernas raster och vad de får ta med sig till skolan.

## Vill skapa bättre studiemiljö

Tanken bakom förslaget är att skapa en bättre studiemiljö och uppmuntra eleverna att göra mer hälsosamma val. Energidrycker innehåller ofta stora mängder koffein, vilket kan påverka sömnen och orsaka till exempel oro och hjärtklappning hos känsliga personer.

## Delade åsikter bland eleverna

Förslaget väcker olika reaktioner. Vissa elever tycker att ett förbud är onödigt och att de själva borde få bestämma vad de dricker. Andra välkomnar initiativet och anser att skolan bör ta ett större ansvar för elevernas hälsa.

Innan något beslut fattas kan skolan genomföra en enkät för att ta reda på hur eleverna ser på frågan. Därefter ska elevrådet, skolledningen och elevhälsan diskutera vilka åtgärder som är lämpliga.

## ”Vi har inte bestämt oss än”

ÄFN har pratat med en representant för skolan.

**Varför vill ni förbjuda energidrycker?**

– Vi vill att eleverna ska må bättre och kunna koncentrera sig på lektionerna.

**Vad tycker eleverna om förslaget?**

– Vissa tycker att det är bra, medan andra tycker att det är onödigt.

**Kommer förbudet att införas?**

– Vi har inte bestämt oss än, men vi ska diskutera frågan vidare.

## Kan bli ett test

Ett förbud kan först införas som ett test under en begränsad period innan skolan utvärderar resultatet. Då kan man bland annat undersöka hur eleverna upplever reglerna och om information om koffein och sömn leder till mer medvetna val.

Frågan visar hur skolor kan behöva balansera elevernas frihet med ambitionen att skapa en trygg och hälsosam skolmiljö.`,
    amnen: ['Skolan', 'Energidrycker', 'Hälsa'],
  },
  {
    rubrik: 'Skolor kan förändra examinationerna efter AI-boomen – muntliga prov får större roll',
    ingress: 'Artificiell intelligens förändrar hur elever arbetar med skoluppgifter. Nu växer frågan om hur lärare ska kunna avgöra vad eleverna faktiskt kan. Muntliga examinationer och fler uppgifter i klassrummet diskuteras som möjliga lösningar.',
    kategori: 'Teknik',
    vinjett: 'AI i skolan',
    reporter: 'Karin Holm',
    bild: 'bilder/muntliga-prov.jpg',
    bildtext: 'Fler uppgifter kan komma att göras på lektionstid, där läraren kan följa arbetet.',
    foto: 'ÄFN',
    brodtext: `Artificiell intelligens har på kort tid blivit ett verktyg som kan hjälpa elever att sammanfatta texter, förklara komplicerade begrepp och lösa matematiska problem. För många innebär tekniken nya möjligheter att lära sig snabbare och få stöd när läraren inte finns till hands.

Samtidigt ställs skolan inför en utmaning: hur ska lärare kunna bedöma elevernas egna kunskaper när en AI-tjänst kan producera välformulerade svar på några sekunder?

Frågan har blivit särskilt viktig vid skriftliga inlämningar. En text kan vara korrekt, välstrukturerad och innehålla avancerade resonemang utan att det går att avgöra hur mycket eleven själv förstår.

## Muntliga prov som komplement

En möjlig lösning är att förändra hur vissa kunskaper examineras. I stället för att bara bedöma en färdig text kan lärare kombinera skriftliga arbeten med muntliga frågor, kortare prov och uppgifter som görs under lektionstid.

Vid en muntlig examination får eleven förklara hur ett svar har tagits fram, motivera sina slutsatser och svara på följdfrågor. Läraren kan till exempel be en elev förklara varför en matematisk formel fungerar, eller beskriva hur en historisk händelse påverkade samhället.

Men det finns begränsningar. En elev kan förstå ett ämne väl men ha svårt att uttrycka sig muntligt på grund av nervositet. Därför bör muntliga prov inte automatiskt ersätta skriftliga examinationer.

## Forskare: handlar om mer än fusk

Rose Luckin, professor vid University College London, har länge forskat om hur AI kan användas i utbildning och hur tekniken påverkar undervisning och lärande. Hennes forskning visar att diskussionen om AI i skolan handlar om mer än fusk – den handlar också om hur undervisningen kan utformas så att elever utvecklar förståelse, kritiskt tänkande och förmågan att lösa problem på egen hand.

## Processen blir viktigare

Ett centralt problem är att slutprodukten inte alltid visar elevens arbetsprocess. En elev kan använda AI för att få en förklaring och sedan själv lösa liknande uppgifter. En annan kan lämna in ett färdigt AI-svar utan att förstå resonemanget. På papperet kan resultaten se likadana ut.

Därför behöver skolor tydliga riktlinjer för när AI får användas och hur användningen ska redovisas. Bedömningen kan inte heller bygga på misstankar: automatiska AI-detektorer kan ge felaktiga resultat och bör inte ensamma användas som bevis för fusk.

## Mer arbete för lärarna

För eleverna kan förändringen innebära att större vikt läggs vid att förstå innehållet och kunna förklara det med egna ord. För lärarna kan den innebära mer arbete – individuella samtal tar tid, särskilt i stora klasser.

En möjlig kompromiss är korta uppföljningsfrågor efter vissa inlämningar, utvalda uppgifter på lektionstid och vanliga skriftliga prov i kombination.

## Inte skolans fiende

Det är lätt att beskriva AI som ett hot mot utbildningen, men tekniken kan också vara ett stöd. En elev som har svårt för en matematisk metod kan be om en stegvis förklaring, och lärare kan använda tekniken för att skapa övningsmaterial.

En skola som förbjuder all AI riskerar att gå miste om användbara möjligheter. En skola som tillåter allt utan regler riskerar att inte längre kunna bedöma elevernas kunskaper.

Hur framtidens examinationer kommer att se ut återstår att se. Klart är att AI ställer nya frågor om undervisning, bedömning och ansvar.`,
    amnen: ['AI', 'Skolan', 'Prov'],
  },
  {
    rubrik: 'Skövde HC skriver historia – klart för SHL',
    ingress: 'Efter en dramatisk kvalserie är det klart: Skövde HC spelar i SHL nästa säsong. På söndagskvällen säkrade laget avancemanget med en dramatisk seger inför ett fullsatt Billingehov.',
    kategori: 'Sport',
    vinjett: 'Hockey',
    reporter: 'Oskar Wall',
    reportertitel: 'Sportreporter',
    bild: 'bilder/skovde-shl.jpg',
    bildtext: 'Jublet ville aldrig ta slut när Skövde HC var klart för SHL.',
    foto: 'ÄFN',
    brodtext: `**SKÖVDE.** Det var en kväll som få i Skövde kommer att glömma.

Tusentals supportrar hade tagit sig till Billingehov för att följa den avgörande matchen. Förutsättningarna var enkla – Skövde behövde vinna för att ta det historiska steget upp till svensk ishockeys högsta serie.

Och laget levererade.

Efter en jämn första period tog Skövde ledningen tidigt i den andra. Motståndarna kvitterade senare, men med bara minuter kvar av matchen kom det avgörande målet. När slutsignalen gick exploderade arenan i jubel.

## ”Det är svårt att förstå”

Efter matchen var känslorna stora bland spelare, ledare och supportrar. Elias Bergström beskriver kvällen som den största i hans hockeykarriär.

– Det är helt otroligt. Man har drömt om sådana här ögonblick sedan man var liten. Att få göra det tillsammans med det här laget och framför vår publik är svårt att beskriva, säger Bergström.

Vägen till SHL har varit lång, med både motgångar och pressade matcher. Men enligt Bergström har sammanhållningen varit avgörande.

– Vi har aldrig slutat tro på varandra. Även när det har gått emot oss har vi fortsatt jobba. Det är nog det som har gjort skillnaden.

## Ett historiskt ögonblick

På läktarna syntes supportrar med flaggor och halsdukar medan spelarna firade på isen. Många stannade kvar långt efter slutsignalen för att ta in ögonblicket.

Även tränaren hyllade laget.

– Spelarna har lagt ner ett enormt arbete under hela säsongen. De har visat mod, disciplin och framför allt en fantastisk lagkänsla, säger huvudtränaren Johan Lind.

## Nu börjar nästa kapitel

Trots glädjen börjar arbetet inför nästa säsong redan nu. SHL innebär ett betydligt tuffare motstånd. För Skövde HC väntar en sommar där truppen ska byggas, organisationen utvecklas och Billingehov förberedas för SHL-hockey.

Men den här kvällen handlade om något annat. Om spelarna som vägrade ge upp. Om supportrarna som fortsatte tro. Och om en förening som nu har skrivit in sig i Skövdes hockeyhistoria.`,
    amnen: ['Skövde HC', 'SHL', 'Ishockey'],
  },
  {
    rubrik: 'Back avstängd för doping – Skövde HC chockade',
    ingress: 'Backen Albin Ekwall, 17, stängs av i fyra år efter ett positivt dopingprov. Klubben säger sig vara ”djupt skakad”.',
    kategori: 'Sport',
    vinjett: 'Hockey',
    reporter: 'Oskar Wall',
    reportertitel: 'Sportreporter',
    bild: 'bilder/doping.jpg',
    bildtext: 'Provet innehöll ett förbjudet anabolt ämne.',
    foto: 'ÄFN',
    brodtext: `**SKÖVDE.** Skövde HC:s Albin Ekwall har stängts av från all tävlingsverksamhet efter att ett dopingprov från januari innehöll ett förbjudet anabolt ämne. Beskedet kom på torsdagen, när förbundets disciplinnämnd meddelade sitt beslut. Avstängningen gäller i fyra år.

Ekwall, som i vintras var en av lagets mest använda backar, har enligt klubben inte tidigare varit misstänkt för regelbrott. Han har enligt uppgift begärt att få analysera B-provet.

– Det här är ett tungt besked för hela föreningen. Vi tar dopingfrågor på största allvar och kommer att följa processen noga, säger tränaren Lennart Hedqvist.

Hedqvist beskriver Ekwall som en professionell spelare.

– Han har alltid skött träningar och återhämtning exemplariskt. Därför är det här så svårt att ta in. Men regler är regler, och vi måste respektera nämndens beslut.

## Tung stämning i omklädningsrummet

Det var dålig stämning när laget samlades efter träningen.

– Man blir helt tom. Vi har spelat tillsammans i tre säsonger, och jag har svårt att förstå det här, säger lagkaptenen Oskar Brandt.

Forwarden Emil Sjöqvist vill inte spekulera i orsaken.

– Det är inte vår sak att döma. Vi tänker på honom som kompis, men också på hur vi hanterar situationen som lag. Ren idrott är grunden för allt vi gör.

## Kan överklaga

Skövde HC har meddelat att Ekwall inte kommer att delta i någon av lagets aktiviteter under avstängningen. Klubben har också kallat till ett möte med spelartruppen och planerar en genomgång av sina rutiner kring antidoping.

Ekwall själv har inte kommenterat beslutet. Enligt hans advokat överväger han att överklaga.`,
    amnen: ['Skövde HC', 'Doping', 'Ishockey'],
  },
];
