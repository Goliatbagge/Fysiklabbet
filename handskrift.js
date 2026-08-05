/* handskrift.js — animerad handskriven räknelösning.
 *
 * Visar HUR en lösning skrivs för hand: en blyertspenna skriver
 * tecken för tecken, streck för streck, på ett rutat papper. Tänkt att
 * bäddas in i teorigenomgångarna (senare via ett ::: handskrift-block,
 * samma mönster som graf.js).
 *
 * API:
 *   window.HANDSKRIFT.mount(el, spec, opts) -> controller
 *
 *   spec = array av rader (= STEG; ett klick skriver en rad). En rad är:
 *     - en sträng: "5x+3=23"  (skrivs tecken för tecken)
 *     - en array av segment:
 *         "5x+3"                 vanlig text (grafit)
 *         {t:"-3", c:1}          färgad text (c:1 = blåpenna — används för
 *                                "det man gör på båda sidor")
 *         {frac:["5x","5"]}      bråk med rakt divisionsstreck
 *                                (skrivordning: täljare → streck → nämnare);
 *                                fc:1 gör streck + nämnare blå.
 *         {cont:1}               FÖRSTA segmentet i en rad: raden fortsätter
 *                                på FÖREGÅENDE rads baslinje (kollegieblock-
 *                                stil, "… = … = …") i stället för på ny rad —
 *                                men är fortfarande ett eget klicksteg.
 *
 *   opts = { speed: 1, autostart: false, instant: false, at: ms|null,
 *            stegvis: true, hand: false, tankar: false }  — STANDARD är att
 *            bara pennan ritas (användarbeslut 2026-07-28); hand:true
 *            ritar handen som håller pennan  — stegvis=false ger gamla
 *            beteendet (allt skrivs i en följd). STANDARD är läget
 *            "Utan tankar" (användarönskemål 2026-08-02); tankar:true
 *            startar i "Med tankar" (se nedan).
 *
 *   Lösningar MED tankebubblor får en inställningsruta uppe till höger
 *   på arket med radioknapparna "Utan tankar"/"Med tankar" — "Utan tankar"
 *   överst och förvald (användarönskemål 2026-07-30 + 2026-08-02).
 *   "Utan tankar" bygger om tidslinjen från en
 *   aktlista där bubbelstegen filtrerats bort — samma pennstreck, färre
 *   klicksteg — och behåller positionen i lösningen (redan skrivna rader
 *   står kvar). Lösningar utan bubblor får ingen ruta.
 *
 *   controller = { play, pause, restart, setSpeed, jumpToEnd, spela,
 *                  steg, nasta, forra, boundaries }
 *
 *   STEGNING (användarönskemål 2026-07-30): pilknappar ligger stickande i
 *   arkets vänster-/högerkant vid halva skärmhöjden — man ska aldrig
 *   behöva rulla ned till knappraden för att stega. Bottenraden har därför
 *   inga Nästa/Föregående-knappar (bara Skriv/Paus, Börja om, Tempo).
 *   Piltangent höger/vänster stegar också fram/tillbaka — i den SENAST
 *   ANVÄNDA widgeten (hovring/klick avgör när flera ligger på samma sida).
 *
 * REGEL (figurscener, t.ex. hage/gungbrada): i de handritade DIAGRAMMEN
 * (till skillnad från algebra-raderna) ritas grundscenen — streckgubbar,
 * bräda/vägg/hage-linjer, skraffering — alltid i grafit. Alla
 * ANTECKNINGAR som läggs ovanpå scenen i form av EN VEKTOR (kraftpilar,
 * måttpilar/hävarmar — både pilskaft och pilspets) eller ETT TAL/VÄRDE
 * (massor som "80 kg", mått som "l_B=2,0 m", "60−2x") ritas i STÄLLET
 * med blåpennan (BLUE). Namnetiketter på objekt ("Mur") och rena
 * hjälplinjer utan pilspets (streckade projektionslinjer) räknas inte
 * som vektor/tal och förblir grafit. Syftet är att synligt skilja "given
 * data/vektorer" från den ritade scenen.
 *
 * REGEL (TANKEBUBBLOR SKYMMER ALDRIG NÅGOT): en tankebubbla får aldrig
 * ligga över figuren, en skriven rad eller något annat på arket — varken
 * molnet eller dess bulor (radie upp till ~25). Bubblor som hör till en
 * FIGUR läggs UNDER figuren (`figurBubble()`), inte intryckta bredvid
 * den i högermarginalen: pressar man in dem vid sidan hamnar molnet ändå
 * på figurens ytterdelar (användarbeslut 2026-07-29). Bubblor vid
 * räkneraderna läggs där NÄSTA rad ska hamna. Båda ytorna är ännu tomma
 * och bubblan är ett eget steg som tonar ut innan något ritas där.
 * Omvänt får en bubbla heller aldrig SKYMMAS: arkets ÖVRE HÖGRA HÖRN
 * är reserverat för inställningsrutan och helskärmsknappen — lägg aldrig
 * en bubbla där. ⚠️ Rutan är HTML och behåller sin pixelstorlek när
 * arket krymper, så PÅ MOBIL täcker den en mycket större del av arket
 * än på desktop: räkna med x > paperW−310 (≈420) och y < 150 (inkl.
 * bulor) som förbjudet område, INTE bara desktopens ~210×90. Detta
 * gäller ALLT som ritas på arket i det hörnet — även blå figur-
 * anteckningar, etiketter och tallinjemarkeringar, inte bara bubblor
 * ("23" på olikhets-tallinjen hamnade bakom rutan i mobil, påpekat
 * 2026-08-04). Kontrollera alltid i skärmdump.
 *
 * REGEL (INSÄTTNING): varje gång något SÄTTS IN i något annat — ett
 * värde i en funktion/formel, ett uttryck i en ekvation, mätvärden i ett
 * samband — ska handen göra en hjälpande gest FÖRE den nya raden skrivs:
 * den ringar först in VÄRDET/VÄRDENA där de står (t.ex. raden "x = 15",
 * eller måtten i figuren) och sedan UTTRYCKET de sätts in i (t.ex.
 * "A(x) = 60x − 2x²"), med blåpennan och en kort paus mellan ringarna.
 * Ringarna står kvar medan insättningsraden skrivs och fejdas ut när den
 * är klar. Syftet är att eleven ska SE var siffrorna kommer ifrån och vart
 * de tar vägen — det är den vanligaste punkten där man tappar tråden.
 * Använd helpers: `substRings(acts, [[x0, x1, yBas, F, opt], …])` och
 * `fadeRings(acts, ringar)`; spara x-gränserna när raderna skrivs
 * (`placeString` returnerar slut-x). Gäller ALLA layouter — bygger du en
 * ny scen med en insättning ska gesten finnas med.
 *
 * UNDANTAG: värden som hämtas ur en MÄTVÄRDESKLAMMER ringas INTE in
 * (användarbeslut 2026-07-29) — klammern står direkt ovanför insättnings-
 * raden och gör redan jobbet. Ringar är till för värden som står
 * utspridda (i figuren eller i en tidigare rad).
 *
 * REGEL (BUBBELTEXT — INGA TANKSTRECK): en tankebubbla får ALDRIG
 * innehålla tankstreck (—). I en text full av formler läses strecket som
 * ett minustecken (påpekat 2026-07-29). Dela i stället meningen med
 * punkt, komma eller kolon — men sätt ALDRIG ett skiljetecken direkt
 * efter en kursiv variabel: kursiva l, g och x växer ihop med kolon och
 * komma till en obegriplig glyf. Låt formeln avsluta raden i stället
 * ("hävarmen: M = F · l") eller skjut in text efter den ("F = m · g i
 * båda leden.").
 *
 * REGEL (MOMENT MOTURS/MEDURS): moment skrivs som i svensk
 * kurslitteratur — ett M med en VRIDPIL ovanför: moturs och medurs.
 * Pennan har två kombinerande tecken för det, `↺` och `↻`, som ritas
 * ovanpå föregående bokstav utan eget advance. Momentjämvikt skrivs
 * alltså `M↺=M↻`, inte `M_1=M_2`.
 *
 * REGEL (BETECKNINGAR I FIGURER, fysikuppgifter): en storhet vi KÄNNER
 * skrivs med beteckningen framför värdet — "m_P = 80 kg", "l_B = 2,0 m",
 * aldrig bara "80 kg". En storhet vi SÖKER skrivs med enbart beteckningen
 * — "l_P", aldrig "l_P = ?" (användarbeslut 2026-07-29). Beteckningen är
 * det som binder ihop figuren med räkneraderna; frågetecknet tillför
 * inget.
 *
 * REGEL (MÄTVÄRDESKLAMMER, fysikuppgifter): när den sökta variabeln har
 * lösts ut skrivs ALLA mätvärden upp i en hög klammer [ … ] — ett värde
 * per rad, omvandlade till SI-enheter vid behov (omvandlingen skrivs då
 * ut i raden, t.ex. "l=25 cm=0,25 m") — INNAN de sätts in i uttrycket.
 * Samma princip som exempeluppgifterna och övningarnas lösningsförslag i
 * teorin (\left[ \begin{array}{l} … \end{array} \right]-listorna).
 * Använd helpern `valueBracket(acts, rader, x0, yTop, s, F)`. INGA ringar
 * vid klammerskrivningen: att cirkla in källvärdena i figuren innan varje
 * rad skrivs blev för utdraget (användarönskemål 2026-07-30) — klammern
 * ÄR gesten som samlar värdena. Insättningsraden skrivs också UTAN
 * ringar (klammern ligger direkt ovanför). Var siffrorna kommer ifrån
 * förklaras i stället i klammer-bubblan. Gäller ALLA fysikscener.
 * ENHETER VID DELUTRÄKNING I KLAMMERN (användarönskemål 2026-07-30): när
 * en klammerrad sätter in värden i en formel (F_G = m·g) skrivs enheten
 * ut vid VARJE tal — "F_G=m·g=20 kg·9,82 N/kg=196,4 N" ('/'-glyf finns).
 * Detta gäller ENDAST i klammern; i insättningsraden därefter (värdena
 * ur klammern in i huvudformeln) skrivs talen som vanligt utan enheter.
 *
 * ⚠️ KLAMMERN KOMMER DIREKT UNDER FORMELN FÖR DEN SÖKTA STORHETEN
 * (uttryckligt användarkrav 2026-08-02, efter fel i fjader-scenen).
 * Ordningen är ALLTID, utan undantag:
 *   (1) rubrik + formel med den sökta variabeln utlöst (a = F_R/m),
 *   (2) mätvärdesklammern,
 *   (3) insättningsraden.
 * Är en storhet i formeln INTE given (t.ex. F_R) får den ALDRIG en egen
 * rubrik + formelrad + egen klammer + egen uträkningsrad FÖRE huvud-
 * formeln — den beräknas i stället som en DELUTRÄKNING PÅ SIN RAD INUTI
 * huvudformelns klammer, med sin formel och med enheter vid varje tal:
 *   [ F_R=−k·y=−30,6875 N/m·(−0,050 m)=1,534... N
 *     m=250 g=0,250 kg                             ]
 * (samma mönster som F_G=m·g-raderna). En hel lösningsdel består alltså
 * av EN formel + EN klammer + EN insättning — aldrig en kedja av
 * hjälpformler med egna klamrar. Ryms inte en lång deluträkningsrad på
 * arket: skriv klammern något mindre med valueBracket-optet {rs:0.75},
 * inte radbrytning. Referensimpl: layoutFjader b).
 *
 * REGEL (DIVISION MED VÅGRÄTT STRECK, användarkrav 2026-08-02): i ALLA
 * handskrivna uträkningar — klammerrader, marginalanteckningar,
 * huvudrader — ritas division som ett BRÅK med vågrätt divisionsstreck,
 * ALDRIG med snedstreck ("k·A²/2", "33 varv/60 s" eller "30/2" får inte
 * förekomma i pennskrift). Snedstrecket används ENBART inuti enheter
 * (N/m, m/s, varv/min). I en klammer skrivs bråket som segment-rad i
 * valueBracket: ['E_1=', {frac:['k·A_1^2','2']}, '=35 J'] — bråkrader
 * får automatiskt extra radhöjd. Referensimpl: layoutDampning
 * (klammern), layoutLpskiva (frekvensraden + radie-anteckningen).
 * TÄLJARE MED NEDSTAPEL OCH NÄMNARE MED EXPONENT: en täljare som slutar
 * på g, y, j eller p (t.ex. T²·g) får sin svans rakt igenom bråkstrecket,
 * och en nämnare med exponent (4π²) trycker upp exponenten i strecket.
 * fracH/valueBracket lyfter därför täljaren respektive sänker nämnaren
 * automatiskt — skriv bråket som vanligt, men granska i skärmdump.
 *
 * REGEL (FÖRKORTNING SKRIVS I TVÅ DRAG, användarönskemål 2026-08-05):
 * när ett bråk förkortas får pennan ALDRIG skriva det färdiga uttrycket
 * ("5/5" över "20/5") i ett svep. Den skriver i stället, i denna ordning:
 *   1. bråket som det står — 5/20, med rakt divisionsstreck,
 *   2. drar ut bråkstrecket en bit åt höger så att divisionen får plats,
 *   3. lägger till "/5" i TÄLJAREN med blåpennan,
 *   4. lägger till "/5" i NÄMNAREN med blåpennan,
 * och därefter fortsätter raden som vanligt ("=1/4"). Poängen är att
 * eleven ska hinna se VILKET bråk som förkortas, och att exakt samma
 * division läggs på i båda leden — inte få ett hopskrivet uttryck
 * serverat. Allt är ETT klicksteg; pauserna mellan dragen bär ordningen.
 * Helper: `fracReduce(numS, denS, divS, x0, yb)` i mathTools. Gäller
 * ALLA scener — bygger du en ny förkortning ska den använda helpern,
 * aldrig fracSeg. (Förlängning, "·4" i båda leden, skrivs fortsatt med
 * fracSeg: där är hela det förlängda bråket en ny uppskrivning av bråket
 * bredvid, inte en ändring av något som redan står på raden.)
 *
 * REGEL (DIVIDERA BORT EN GEMENSAM FAKTOR — BARA fysikuppgifter): när
 * samma faktor står i båda leden (t.ex. g i m_P·g·l_P = m_B·g·l_B) delas
 * den bort genom att STRYKAS med ett snett streck direkt i den redan
 * skrivna raden, varefter nästa rad skrivs utan faktorn. Divisionen
 * skrivs alltså INTE ut som bråk med faktorn i nämnaren. Formellt lite
 * slarvigt, men det är så man redovisar i fysikkursen (användarbeslut
 * 2026-07-29). Blåpennan används, eftersom det är något som görs på båda
 * sidor om likhetstecknet. I MATTEscener gäller motsatsen — där skrivs
 * divisionen ut i båda led som vanligt (se hage-scenen). Helper:
 * `strikeThrough(x0, w, yBas)`.
 *
 * SPRÅKREGEL: i TEXT (tankebubblor, förklaringar) heter det alltid
 * "dividera bort" — aldrig "stryka bort" — även om pennan rent visuellt
 * gör en strykning (användarbeslut 2026-07-29). Det är divisionen som är
 * det matematiska innehållet; strykningen är bara hur man skriver ned den.
 *
 * REGEL (SVARSRAD, fysikuppgifter): svaret skrivs som enbart mätetal och
 * enhet — "Svar: 0,75 m" — ALDRIG med beteckningen framför ("Svar:
 * l_P = 0,75 m"). Frågan har redan sagt vad som söks (användarbeslut
 * 2026-07-29). Deluppgiftsbokstaven skrivs INTE heller ut i svarsraden
 * ("Svar: 0,12 kN", inte "Svar b): 0,12 kN") — raden står redan under
 * sin deluppgift (användarönskemål 2026-07-30). I mattescener skrivs
 * svaret som uppgiften kräver.
 * UNDANTAG (användarönskemål 2026-08-02): frågar uppgiften efter FLERA
 * storheter i samma deluppgift skrivs beteckningen ut för varje värde så
 * att svaren går att skilja åt — "Svar: F_C=9,0 N och F_S=7,0 N", inte
 * "Svar: 9,0 N och 7,0 N". Utan beteckningarna säger raden inte vilken
 * kraft som är vilken. Referensimpl: layoutVertikalcirkel a) och b).
 *
 * REGEL (INLEDANDE MOTIVERING): en formel kan föregås av en kort rubrik/
 * motivering i TEXT som handen skriver i grafit — och då skrivs formeln
 * DIREKT UNDER i SAMMA klicksteg, ingen steggräns emellan (användar-
 * önskemål 2026-07-30). Motiveringen skrivs mindre (0,62·F, som
 * figuretiketter) och är en del av redovisningen: den står kvar även i
 * "Utan tankar", till skillnad från tankebubblorna. Ge formeln extra
 * radavstånd när den har höga tecken — momentpilarna kräver ~1,8·F ned
 * till formelbaslinjen, annars nuddar de motiveringens nedstaplar (j, g).
 * SKRIV KORT (användarönskemål 2026-07-30): eleverna ska inte tröttas ut
 * med mer skrivet än nödvändigt. För en "basic" formel för en storhet
 * eller lag räcker BARA NAMNET som rubrik — "Kraftmoment", inte "Formeln
 * för kraftmoment"; "Momentjämvikt", inte "Momentjämvikt ger". Utveckla
 * texten bara när det behöver motiveras VARFÖR formeln får ställas upp.
 *
 * REGEL (FIGURORIENTERING, användarönskemål 2026-07-30): finns en
 * ursprunglig uppgiftsfigur ritas handens figur med SAMMA orientering
 * som den (skiftnyckeln snett med muttern uppe till höger — inte
 * "tillrättalagd" vågrätt). En omorienterad figur är fysikaliskt
 * korrekt men förvirrar elever som jämför med uppgiftens bild.
 * Referensimpl: layoutSkiftnyckel (u/n-enhetsvektorer + P()-helper).
 *
 * REGEL (OMSKRIVNING MED EKVIVALENSPIL, användarönskemål 2026-07-30):
 * när en formel bara SKRIVS OM/"möbleras om" (en variabel löses ut, ett
 * led flyttas) skrivs omskrivningen med ⟺ i FORTSÄTTNING på samma rad
 * om den får plats: "F_P+F_Q=F_G ⟺ F_P=F_G−F_Q",
 * "F_Q·l_Q=F_G·l_G ⟺ F_Q=F_G·l_G/l_Q". Ny rad tas ENDAST när papperet
 * inte räcker till. Nya rader är för nya TANKESTEG (substitution som
 * F=m·g, insättning av värden, uträkning) — inte för ommöblering.
 * Gäller generellt, alla scener.
 *
 * REGEL (ALTERNATIVA LÖSNINGAR, användarönskemål 2026-07-30): har en
 * uppgift flera rimliga lösningsvägar visas den ENKLASTE lösningen
 * FÖRST och alternativet efteråt. Varje lösning inleds med en kort
 * metodrubrik i grafit (0,62·F) — "Med kraftjämvikt", "Med moment-
 * jämvikt" — så att eleven vet vilken metod som används innan lösningen
 * börjar. Alternativet avslutas UTAN ny svarsrad (svaret är redan
 * givet); en bubbla konstaterar att metoderna ger samma svar.
 * Referensimpl: layoutBrada c).
 *
 * REGEL (HÄRLEDDA MÅTT MOTIVERAS, användarönskemål 2026-07-30): ett
 * mått som inte står direkt i uppgiften (t.ex. hävarmen till tyngd-
 * kraften när tyngdpunkten sitter mitt på brädan) får aldrig bara dyka
 * upp i figuren — det motiveras med en kort handskriven anteckning/
 * uträkning i fri yta bredvid figuren INNAN måttet ritas ("Tyngdpunkten:
 * mitt på brädan, 3,0 m in. l_G=3,0-1,5=1,5 m"). Anteckningen hör till
 * sitt mått: byts vridningspunkten fejdas den ut med måtten och en ny
 * skrivs. Referensimpl: layoutBrada.
 *
 * REGEL (RIMLIGHETSBEDÖMNING, fysikuppgifter): innan svarsraden skrivs
 * ska en tankebubbla ALLTID göra en rimlighetsbedömning av resultatet
 * (t.ex. "Pappa ska sitta närmare än barnet — rimligt, han är ju
 * tyngre!"). Att stanna upp och pröva svarets rimlighet är elevens bästa
 * skydd mot slarvfel. Gäller ALLA fysikscener.
 *
 * REGEL (AVRUNDNING, användarönskemål 2026-07-30): avrunda ALDRIG i
 * mellanled. Ett värde med många decimaler skrivs oavrundat med tre
 * punkter och VANLIGT likhetstecken ("l=1,0·cos 45°=0,707..."), och
 * det oavrundade värdet följer med i klammern och insättningen
 * ("M=800·0,707...=565,685... Nm"). Först i det ALLRA SISTA steget
 * avrundas svaret, med ≈, till så många värdesiffror som det ingående
 * mätvärde som har MINST antal värdesiffror (här 1,0 m → två). En
 * tankebubbla motiverar avrundningen. Punktglyfen '.' finns i GLYPHS.
 * Avrundningen är en FORTSÄTTNING på uträkningsraden och skrivs på SAMMA
 * rad så långt papperet räcker ("=117,84 N ≈ 120 N"). Radbryt ENDAST när
 * högerkanten tar slut, och bryt då FÖRE ett led (nya raden börjar med
 * operatorn: "≈ 570 Nm..." eller "= 0,12 kN") — vänsterledet (M, F_Q)
 * upprepas ALDRIG på den nya raden.
 *
 * REGEL (TRIGONOMETRISK UPPSTÄLLNING, användarönskemål 2026-07-30): när
 * en trig-ekvation ställs upp ur en figur (cos v = närliggande katet /
 * hypotenusan osv.) byggs kvoten DEL FÖR DEL med två samverkande gester:
 *   1. Ordet för delen ("närliggande katet", "hypotenusan") TONAR IN
 *      bredvid täljaren respektive nämnaren medan kvoten ställs upp, och
 *      tonar ut när nästa steg börjar. Byggsten: note-objekt
 *      {note:1, x, y, text, anchor, wins:[]} — en tonande Poppins-
 *      etikett som visas/döljs med show/hide (samma fönstermekanik som
 *      bubblorna, men utan moln). Noterna är del av uppställningen och
 *      står kvar även i "Utan tankar".
 *   2. INNAN pennan skriver delen i kvoten gör den ett TORRSVEP längs
 *      motsvarande sträcka i FIGUREN: pennspetsen dras mot papperet
 *      parallellt rakt på sidan, utan att lämna bläck (akt
 *      {kind:'sweep', pts: humanize([p1, p2])}). Närliggande kateten
 *      sveps innan täljaren skrivs, hypotenusan innan nämnaren.
 *      (Ersatte inringning av sidorna 2026-07-30 på användarens begäran;
 *      ringAlongPts finns kvar för andra behov.)
 * Dessutom ringas VINKELN (bågen + gradtalet) in i figuren INNAN
 * trigfunktionen skrivs — det är den vinkeln som "närliggande"/
 * "motstående" relaterar till (godkänt förslag 2026-07-30).
 * Eleven ska SE vilken sida i triangeln som blir täljare och vilken som
 * blir nämnare. Gäller alla scener där en trigfunktion ställs upp ur en
 * figur — för sin med ordet "motstående katet", för tan med "motstående
 * katet"/"närliggande katet". Referensimpl: layoutSpett.
 *
 * REGEL (TONANDE ORD VID MOMENTLAGEN): när momentlagen M↺=M↻ skrivs
 * tonar orden "moturs"/"medurs" in under respektive momentpil (note-
 * objekt) när ledet skrivits, och ut när nästa steg börjar (godkänt
 * förslag 2026-07-30). Referensimpl: layoutGunga.
 *
 * Teckenuppsättningen är en egen enstreckad "handstil": varje tecken är
 * definierat som en lista pennstreck (punkter i en 100-enheters box,
 * baslinje y=100). Strecken ritas i naturlig skrivordning och får små
 * slumpvariationer (jitter, rotation, baslinjehopp) så att två femmor
 * aldrig blir exakt likadana — som riktig handskrift.
 */
(function () {
  'use strict';
  if (window.HANDSKRIFT) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var INK = '#4a4a4a';          // grafit
  var BLUE = '#2b5ca8';         // blåpenna — "det man gör på båda sidor"

  /* KONSEKVENT SKRIFTSTORLEK (uttryckligt önskemål 2026-07-29): pennan
   * ska skriva LIKA STORT i alla uppgifter. Alla ark har därför samma
   * fasta bredd i viewBox-enheter (PAPER_W) och all skrift samma storlek
   * (FSIZE). Eftersom arken renderas i samma CSS-bredd blir skriften då
   * exakt lika stor på skärmen oavsett uppgift. Scenerna får INTE klampa
   * eller välja egen storlek, och opts.fontSize är borttagen ur API:t.
   *
   * En HUVUDRAD (räkneraden) skrivs ALLTID i F rakt av — aldrig i F*0,9
   * e.d. Just en sådan faktor i linjegraf-scenen gjorde att uppgifterna
   * fortfarande skrevs olika stort (påpekat 2026-07-29); den mindre
   * storleken var den önskade, så FSIZE sänktes 32 → 29 och faktorn togs
   * bort. Delvis mindre skrift (tabellrubriker, axelsiffror, klammer) är
   * fortfarande OK — det är huvudraderna som måste vara lika. */
  var FSIZE = 29;               // skriftstorlek — samma i ALLA uppgifter
  var PAPER_W = 730;            // arkets bredd — samma i ALLA uppgifter
  var PAPER = '#faf6ec';
  var GRID = '#93aec7';
  var LABINK = '#0f1620';

  /* ---------------- handstil: enstreckade glyfer ----------------
   * Punkter i 100-boxen: y=10 överkant (versal/siffra), y=100 baslinje,
   * gemener börjar vid ~y=48 (x-höjd). w = teckenbredd (advance).
   * Strecken listas i naturlig skrivordning. */
  var GLYPHS = {
    '0': { w: 84, strokes: [[[50, 12], [31, 22], [24, 54], [31, 87], [50, 97], [67, 87], [74, 54], [67, 22], [50, 12]]] },
    '1': { w: 58, strokes: [[[30, 30], [48, 13], [48, 100]]] },
    '2': { w: 84, strokes: [[[27, 32], [33, 15], [51, 10], [66, 17], [69, 33], [60, 54], [42, 76], [27, 95], [40, 92], [70, 93]]] },
    '3': { w: 84, strokes: [[[28, 20], [46, 10], [63, 16], [67, 30], [57, 46], [45, 51], [60, 55], [71, 70], [65, 89], [45, 99], [27, 90]]] },
    '4': { w: 84, strokes: [[[54, 12], [30, 58], [27, 66], [74, 66]], [[60, 16], [60, 100]]] },
    '5': { w: 84, strokes: [[[36, 12], [30, 48], [44, 41], [59, 43], [70, 55], [71, 72], [61, 90], [41, 98], [26, 88]], [[36, 12], [68, 12]]] },
    '6': { w: 84, strokes: [[[62, 14], [43, 26], [30, 48], [25, 72], [31, 90], [50, 98], [65, 89], [68, 72], [57, 59], [39, 60], [28, 71]]] },
    '7': { w: 80, strokes: [[[26, 14], [70, 13], [49, 58], [39, 100]]] },
    '8': { w: 84, strokes: [[[50, 12], [32, 19], [28, 35], [43, 49], [63, 61], [69, 79], [57, 95], [38, 95], [27, 79], [35, 61], [54, 49], [67, 35], [64, 19], [50, 12]]] },
    '9': { w: 84, strokes: [[[68, 26], [53, 12], [34, 17], [26, 35], [33, 51], [52, 56], [66, 47], [69, 28]], [[69, 26], [64, 68], [55, 100]]] },
    'x': { w: 80, strokes: [[[24, 50], [37, 60], [64, 93], [70, 100]], [[66, 50], [53, 65], [30, 95], [24, 100]]] },
    '+': { w: 88, strokes: [[[22, 66], [74, 66]], [[48, 41], [48, 92]]] },
    '-': { w: 76, strokes: [[[22, 66], [70, 66]]] },
    '=': { w: 88, strokes: [[[22, 56], [74, 55]], [[22, 76], [74, 76]]] },
    'S': { w: 66, strokes: [[[68, 20], [52, 10], [33, 15], [27, 31], [38, 46], [57, 57], [67, 72], [59, 90], [36, 98], [22, 86]]] },
    'v': { w: 56, strokes: [[[24, 52], [38, 94], [44, 100], [57, 74], [66, 52]]] },
    'a': { w: 62, strokes: [[[61, 57], [47, 48], [31, 55], [25, 73], [30, 90], [46, 98], [60, 89]], [[62, 50], [62, 84], [66, 97], [72, 94]]] },
    'r': { w: 46, strokes: [[[27, 50], [29, 100]], [[29, 64], [38, 53], [50, 47], [57, 52]]] },
    ':': { w: 34, strokes: [[[26, 58], [27, 60]], [[26, 88], [27, 90]]] },
    ' ': { w: 46, strokes: [] },
    'd': { w: 68, strokes: [[[58, 58], [45, 49], [31, 56], [26, 73], [31, 89], [46, 97], [58, 87]], [[61, 12], [60, 80], [63, 95], [70, 93]]] },
    'y': { w: 62, strokes: [[[24, 52], [32, 72], [42, 96]], [[64, 52], [52, 88], [38, 118], [26, 130]]] },
    /* teckenminus (U+2212): tight, utan operator-luft — för −3 i tabeller/axlar */
    '−': { w: 40, strokes: [[[18, 66], [42, 66]]] },
    /* integraltecken: hög S-kurva, från -13 (över versalhöjd) till 113 */
    '∫': { w: 54, strokes: [[[64, -4], [58, -12], [50, -13], [45, -5], [44, 14], [43, 45], [42, 75], [40, 96], [37, 108], [29, 113], [21, 108], [19, 99]]] },
    /* klamrar för primitiv funktion: höga, med korta serifer */
    '[': { w: 50, strokes: [[[48, 2], [33, 3], [34, 104], [49, 105]]] },
    ']': { w: 50, strokes: [[[30, 2], [45, 3], [44, 104], [29, 105]]] },
    'A': { w: 80, strokes: [[[22, 100], [46, 12], [70, 100]], [[32, 68], [61, 68]]] },
    'M': { w: 88, strokes: [[[22, 100], [25, 14], [47, 72], [69, 14], [72, 100]]] },
    'u': { w: 66, strokes: [[[24, 52], [25, 82], [32, 96], [46, 92], [56, 80]], [[58, 52], [60, 100]]] },
    'b': { w: 64, strokes: [[[26, 12], [27, 100]], [[27, 60], [40, 50], [54, 56], [58, 74], [52, 92], [38, 98], [27, 90]]] },
    'm': { w: 72, strokes: [[[23, 52], [24, 100]], [[24, 66], [32, 52], [41, 56], [42, 100]], [[42, 66], [50, 52], [59, 56], [60, 100]]] },
    'F': { w: 68, strokes: [[[32, 12], [28, 100]], [[32, 12], [70, 11]], [[30, 54], [62, 54]]] },
    'P': { w: 66, strokes: [[[32, 12], [28, 100]], [[32, 12], [58, 11], [68, 22], [67, 37], [55, 48], [30, 50]]] },
    'Q': { w: 84, strokes: [[[50, 12], [31, 22], [24, 54], [31, 87], [50, 97], [67, 87], [74, 54], [67, 22], [50, 12]], [[54, 80], [71, 103]]] },
    'T': { w: 64, strokes: [[[14, 13], [62, 12]], [[38, 13], [36, 100]]] },
    'G': { w: 78, strokes: [[[68, 20], [52, 10], [33, 16], [24, 34], [22, 56], [26, 78], [39, 95], [56, 97], [67, 86], [68, 62]], [[48, 62], [69, 62]]] },
    'B': { w: 68, strokes: [[[32, 12], [28, 100]], [[32, 12], [56, 11], [65, 21], [63, 34], [52, 44], [30, 46]], [[30, 46], [58, 47], [68, 60], [67, 80], [54, 96], [28, 100]]] },
    'l': { w: 42, strokes: [[[30, 10], [29, 80], [33, 97], [41, 94]]] },
    'g': { w: 64, strokes: [[[58, 57], [45, 49], [31, 56], [26, 73], [31, 89], [46, 97], [58, 88]], [[60, 50], [62, 86], [60, 112], [50, 126], [36, 124], [30, 114]]] },
    /* tillagda gemener (2026-07-29, för figur-etiketterna "basen"/"höjden") */
    /* 'e' ritas som handstil: tvärstrecket först (vänster→höger), sedan
     * runt över toppen och ner runt bottnen med utsläpp åt höger. Ögat
     * mellan tvärstrecket och toppbågen måste vara HÖGT (~24 enheter) —
     * pennan är 0,062·F bred oavsett teckenstorlek, så i halvstora
     * etiketter ("basen"/"höjden") fylls ett litet öga igen och e:et blir
     * en klump. Sänk aldrig tvärstrecket mot toppbågen. */
    'e': { w: 62, strokes: [[[20, 76], [56, 70], [55, 57], [42, 48], [29, 53], [21, 68], [22, 83], [33, 95], [47, 97], [59, 86]]] },
    's': { w: 54, strokes: [[[52, 58], [35, 50], [24, 57], [27, 67], [43, 72], [54, 81], [49, 92], [33, 98], [19, 89]]] },
    'n': { w: 66, strokes: [[[24, 52], [25, 100]], [[25, 60], [36, 50], [48, 50], [58, 60], [59, 100]]] },
    'h': { w: 68, strokes: [[[26, 10], [27, 100]], [[27, 62], [38, 50], [50, 50], [60, 60], [61, 100]]] },
    'j': { w: 40, strokes: [[[30, 52], [29, 110], [24, 124], [14, 122]], [[29, 20], [30, 22]]] },
    'o': { w: 60, strokes: [[[54, 60], [42, 49], [28, 53], [22, 68], [24, 85], [38, 96], [52, 92], [58, 76], [54, 60]]] },
    'ö': { w: 60, strokes: [[[54, 60], [42, 49], [28, 53], [22, 68], [24, 85], [38, 96], [52, 92], [58, 76], [54, 60]], [[32, 28], [33, 30]], [[48, 28], [49, 30]]] },
    'k': { w: 60, strokes: [[[28, 10], [28, 100]], [[58, 48], [40, 70], [30, 74]], [[38, 66], [60, 100]]] },
    /* gemena p: nedstapel + bukt (som b men med underlängd) */
    'p': { w: 64, strokes: [[[26, 52], [27, 126]], [[27, 62], [40, 50], [54, 56], [58, 74], [52, 92], [38, 98], [27, 90]]] },
    'K': { w: 72, strokes: [[[27, 12], [26, 100]], [[66, 12], [40, 54], [30, 60]], [[40, 54], [68, 100]]] },
    /* tillagda 2026-07-30 (för inledande motiveringar som "Momentjämvikt
     * ger") */
    't': { w: 48, strokes: [[[31, 24], [29, 78], [33, 95], [44, 91]], [[17, 50], [47, 48]]] },
    'f': { w: 50, strokes: [[[54, 18], [45, 12], [37, 20], [34, 44], [33, 100]], [[19, 52], [49, 50]]] },
    'i': { w: 40, strokes: [[[29, 52], [28, 82], [32, 97], [40, 93]], [[28, 30], [29, 32]]] },
    'ä': { w: 62, strokes: [[[61, 57], [47, 48], [31, 55], [25, 73], [30, 90], [46, 98], [60, 89]], [[62, 50], [62, 84], [66, 97], [72, 94]], [[34, 30], [35, 32]], [[52, 30], [53, 32]]] },
    'å': { w: 62, strokes: [[[61, 57], [47, 48], [31, 55], [25, 73], [30, 90], [46, 98], [60, 89]], [[62, 50], [62, 84], [66, 97], [72, 94]], [[45, 18], [38, 21], [36, 28], [41, 34], [49, 33], [52, 26], [46, 19]]] },
    ',': { w: 30, strokes: [[[26, 90], [28, 98], [21, 112]]] },
    /* punkt på baslinjen — för "0,707..." (oavrundat värde, tre punkter) */
    '.': { w: 28, strokes: [[[24, 92], [26, 94]]] },
    /* snedstreck för sammansatta enheter (N/kg, m/s) */
    '/': { w: 52, strokes: [[[46, 8], [16, 102]]] },
    '?': { w: 68, strokes: [[[26, 30], [33, 14], [50, 10], [63, 17], [66, 31], [58, 45], [47, 53], [45, 64]], [[45, 86], [46, 88]]] },
    '(': { w: 42, strokes: [[[36, 8], [26, 34], [23, 60], [26, 85], [36, 106]]] },
    ')': { w: 42, strokes: [[[22, 8], [32, 34], [35, 60], [32, 85], [22, 106]]] },
    '·': { w: 34, strokes: [[[27, 60], [28, 62]]] },
    'N': { w: 78, strokes: [[[22, 100], [25, 12], [66, 97], [69, 10]]] },
    /* versalt C (2026-08-02, för F_C i cirkulär rörelse): som G men utan
     * tvärstrecket och med öppnare mun — granskad sida vid sida med G,
     * gemena c och parentesen ( så att de inte förväxlas */
    'C': { w: 74, strokes: [[[68, 22], [52, 10], [32, 15], [22, 33], [19, 56],
                             [23, 79], [36, 96], [55, 98], [69, 86]]] },
    'c': { w: 54, strokes: [[[55, 57], [41, 48], [27, 53], [20, 68], [22, 85], [36, 97], [52, 90]]] },
    /* gradtecken: liten ring i versalhöjd (45°) */
    '°': { w: 40, strokes: [[[30, 12], [22, 17], [20, 26], [26, 33], [35, 31], [38, 22], [31, 13]]] },
    /* ungefär lika med: två vågiga streck (avrundningar) */
    '≈': { w: 88, strokes: [[[20, 50], [33, 44], [48, 53], [63, 60], [76, 53]],
                            [[20, 74], [33, 68], [48, 77], [63, 84], [76, 77]]] },
    /* tillagda 2026-08-02 (fy2-1.3 Period, frekvens, radianer och vinkel-
     * hastighet): grekiska ω/α/π samt versalerna H, V, L och gemena z. */
    /* omega: två skålar öppna uppåt som möts i en spets på mitten */
    'ω': { w: 92, strokes: [[[24, 52], [15, 68], [17, 86], [29, 97], [41, 90],
                             [46, 72], [51, 90], [63, 97], [75, 86], [77, 68],
                             [68, 52]]] },
    /* alfa efter den italiska matte-formen (KaTeX/Computer Modern): en
     * STOR, rund, sluten ÖGLA och ett HÖGERSTRECK som möter öglan i en
     * spets upptill, buktar ut och löper TÄTT UTMED öglans högersida
     * (bara ~15 enheters glapp) och avslutas med en KROK åt höger vid
     * baslinjen. Fyra former förkastades 2026-08-02 innan denna: öppen
     * skål + lodrät stapel, sluten skål + kort diagonal, skål +
     * högerstreck som vek tillbaka in i botten (blev ett 'o'), och rund
     * skål + långt ben snett ned åt höger. De tre första lästes som
     * gemena 'a' eller 'o'. Felet i alla var att högerdelen SKÖT IVÄG
     * från öglan i stället för att hugga intill den — det är närheten
     * plus kroken som gör formen grekisk. Ändra aldrig glappet till ett
     * utfallande ben igen. Granska nya glyfer sida vid sida med den
     * bokstav de kan förväxlas med (labb: .shots/hk13-alfa-lab.html). */
    'α': { w: 94, strokes: [[[57, 53], [45, 46], [29, 49], [18, 61], [16, 77],
                             [22, 93], [35, 101], [50, 97], [58, 86], [60, 68],
                             [55, 54]],
                            [[56, 50], [66, 60], [74, 73], [74, 88], [70, 98],
                             [79, 100], [86, 94]]] },
    /* pi: tvärstreck först, sedan vänsterbenet och högerbenet med fot */
    'π': { w: 92, strokes: [[[14, 54], [82, 51]],
                            [[34, 54], [28, 100]],
                            [[64, 54], [63, 90], [72, 100]]] },
    'H': { w: 84, strokes: [[[26, 12], [21, 100]], [[72, 11], [67, 100]],
                            [[23, 56], [70, 54]]] },
    'V': { w: 82, strokes: [[[20, 12], [44, 100], [70, 11]]] },
    'L': { w: 66, strokes: [[[30, 12], [26, 100], [66, 97]]] },
    'z': { w: 66, strokes: [[[22, 52], [62, 50], [22, 98], [64, 95]]] },
    /* E som F med bottenstreck — jämför med F vid granskning */
    'E': { w: 68, strokes: [[[32, 12], [28, 100]], [[32, 12], [68, 11]],
                            [[30, 54], [60, 54]], [[28, 100], [66, 98]]] },
    /* D (2026-08-03, för rubriken "Derivera …"): stapel + hel bukt från
     * toppen runt till foten — jämför med B och P vid granskning: B har
     * två bukter, P bara en halv */
    'D': { w: 80, strokes: [[[32, 12], [28, 100]],
                            [[32, 12], [58, 14], [72, 32], [73, 60],
                             [62, 86], [43, 98], [28, 100]]] },
    /* R som P med ett ben snett ned åt höger */
    'R': { w: 72, strokes: [[[32, 12], [28, 100]],
                            [[32, 12], [58, 11], [68, 22], [67, 37], [55, 48], [30, 50]],
                            [[46, 49], [70, 100]]] },
    /* J: toppstreck + stapel som svänger av åt vänster i en krok */
    'J': { w: 64, strokes: [[[26, 13], [66, 12]],
                            [[50, 12], [49, 68], [44, 91], [31, 98], [20, 88]]] },
    /* w: som v fast dubbelt — jämför med v vid granskning */
    'w': { w: 84, strokes: [[[16, 52], [26, 93], [32, 100], [42, 70],
                             [46, 70], [54, 98], [59, 100], [70, 74], [78, 52]]] },
    /* stort delta (Δl i Hookes lag): sluten triangel i EN penndragning */
    'Δ': { w: 78, strokes: [[[21, 100], [44, 13], [47, 13], [72, 98], [21, 100]]] },
    "'": { w: 24, strokes: [[[27, 8], [19, 30]]] },
    '<': { w: 76, strokes: [[[64, 40], [24, 66], [64, 92]]] },
    /* '>' som spegelvänt '<' (2026-08-04, ma1c-1.1 olikhetstecken) —
     * granskad sida vid sida med '<' och '7' så att de inte förväxlas */
    '>': { w: 76, strokes: [[[24, 40], [64, 66], [24, 92]]] },
    /* implikationspil ⇒: två parallella streck + spets */
    '⇒': { w: 96, strokes: [[[20, 56], [64, 57]], [[20, 74], [64, 73]], [[60, 44], [80, 65], [60, 88]]] },
    /* ekvivalenspil ⟺: två parallella streck + spets åt båda hållen.
     * Bred advance med luft åt båda hållen — raden ska inte bli kompakt
     * kring pilen (användarönskemål 2026-07-30) */
    '⟺': { w: 158, strokes: [[[54, 56], [104, 57]], [[54, 74], [104, 73]],
                              [[58, 44], [38, 65], [58, 88]],
                              [[100, 44], [120, 65], [100, 88]]] },
    /* MOMENTPILAR (svensk kurslitteratur): moment moturs/medurs skrivs som
     * ett M med en vridpil ÖVER bokstaven. Pilarna är KOMBINERANDE tecken
     * — de har inget advance och placeString ritar dem ovanför föregående
     * glyf (se där). Bågen går från den ena änden över toppen till den
     * andra, med pilspetsen i färdriktningen: ↺ slutar till vänster
     * (moturs på skärmen), ↻ till höger (medurs). */
    '↺': { w: 88, strokes: [[[90, 92], [78, 74], [60, 64], [40, 64], [22, 74], [10, 92]],
                            [[29, 85], [10, 92], [10, 72]]] },
    '↻': { w: 88, strokes: [[[10, 92], [22, 74], [40, 64], [60, 64], [78, 74], [90, 92]],
                            [[71, 85], [90, 92], [90, 72]]] }
  };
  var COMBINING = { '↺': 1, '↻': 1 };   /* ritas ovanpå föregående tecken */
  var OPS = { '+': 1, '-': 1, '=': 1, '≈': 1, '<': 1, '>': 1, '⇒': 1, '⟺': 1 };

  /* Senast skrivna klammergränser (position för övre/undre gräns) — så
   * att insättningssteget kan ringa in dem med en pedagogisk gest. */
  var LASTLIM = { sup: null, sub: null };

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function el(name, attrs, parent) {
    var e = document.createElementNS(SVGNS, name);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* Catmull–Rom → kubisk bezier, ger mjuka naturliga kurvor. */
  function pathFrom(pts) {
    var d = 'M' + pts[0][0].toFixed(2) + ' ' + pts[0][1].toFixed(2);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1],
          p3 = pts[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + c1x.toFixed(2) + ' ' + c1y.toFixed(2) + ',' +
           c2x.toFixed(2) + ' ' + c2y.toFixed(2) + ',' +
           p2[0].toFixed(2) + ' ' + p2[1].toFixed(2);
    }
    return d;
  }

  /* Ett tvåpunktsstreck (rak linje) får en mittpunkt med liten vinkelrät
   * avvikelse — handskrivna "raka" streck är aldrig helt raka. */
  function humanize(pts) {
    if (pts.length !== 2) return pts;
    var a = pts[0], b = pts[1];
    var dx = b[0] - a[0], dy = b[1] - a[1];
    var L = Math.hypot(dx, dy) || 1;
    var nx = -dy / L, ny = dx / L;
    var bow = rnd(-1, 1) * Math.min(0.022 * L, 2.2) + rnd(-0.6, 0.6);
    return [a, [(a[0] + b[0]) / 2 + nx * bow, (a[1] + b[1]) / 2 + ny * bow], b];
  }

  /* Placera ett tecken: skala, lätt lutning, jitter, rotation.
   * Returnerar nästa x. Strecken läggs i out-listan. */
  function placeGlyph(ch, x, baseline, s, out, color) {
    var g = GLYPHS[ch];
    if (!g) return x + 40 * s;
    var rot = rnd(-0.022, 0.022);
    var dyPx = rnd(-1.4, 1.4) * s;
    var cx = x + g.w * s / 2, cy = baseline - 45 * s;
    var cosR = Math.cos(rot), sinR = Math.sin(rot);
    g.strokes.forEach(function (stroke) {
      var pts = stroke.map(function (p) {
        var u = p[0] + rnd(-1.1, 1.1);
        var v = p[1] + rnd(-1.1, 1.1);
        u += (100 - v) * 0.055;               /* svag högerlutning */
        var X = x + u * s, Y = baseline + (v - 100) * s + dyPx;
        var rx = cx + (X - cx) * cosR - (Y - cy) * sinR;
        var ry = cy + (X - cx) * sinR + (Y - cy) * cosR;
        return [rx, ry];
      });
      out.push({ kind: 'stroke', pts: humanize(pts), color: color });
    });
    out.push({ kind: 'pause', ms: 60 });
    return x + g.w * s + 1.5;
  }

  function textWidth(str, s) {
    var w = 0;
    for (var i = 0; i < str.length; i++) {
      var g = GLYPHS[str[i]];
      w += (g ? g.w : 40) * s + 1.5;
      if (OPS[str[i]]) w += 2 * 0.3 * s * 100 * 0.4; /* op-luft (approx) */
    }
    return w;
  }

  /* Skriv en teckensträng, med luft kring binära operatorer.
   * ^c = upphöjt (exponent/övre gräns), _c = nedsänkt (undre gräns).
   * Efter ∫ och ] placeras gränserna högt/lågt (integralgränser resp.
   * klammergränser) och staplas i samma x-kolumn. */
  function placeString(str, x, baseline, s, F, out, color) {
    var prevBase = null, prevBaseX = x, scriptAnchor = null, scriptX = null;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '^' || ch === '_') {
        var sc = str[++i];
        if (sc == null) break;
        var sub = ch === '_';
        var sb;
        if (prevBase === '∫') sb = baseline + (sub ? 0.22 : -0.95) * F;
        else if (prevBase === ']') sb = baseline + (sub ? 0.30 : -0.78) * F;
        else sb = baseline + (sub ? 0.15 : -0.5) * F;
        if (prevBase === '∫' && sub) {
          /* undre integralgräns: till VÄNSTER om krokens nederdel */
          var aw = (GLYPHS[sc] ? GLYPHS[sc].w : 40) * s * 0.62;
          placeGlyph(sc, prevBaseX - aw * 0.85, sb, s * 0.62, out, color);
          continue;
        }
        /* FLERTECKENSINDEX (2026-08-02, för x_max/y_max): upphöjda och
         * nedsänkta tecken flödar vidare i VAR SIN x-kolumn (skriv
         * 'x_m_a_x'), medan sup+sub efter ] fortsatt staplas i samma
         * kolumn (klammergränser ]^3_1) eftersom kolumnerna startar på
         * samma anker. */
        if (scriptAnchor == null) {
          scriptAnchor = x;
          scriptX = { sup: x, sub: x };
        }
        var dir = sub ? 'sub' : 'sup';
        /* övre integralgräns: in över krokens topp, inte helt till höger —
         * minskar också luften fram till integranden */
        var ax = (prevBase === '∫' && scriptX[dir] === scriptAnchor)
          ? scriptX[dir] - 0.13 * F : scriptX[dir];
        var nx = placeGlyph(sc, ax, sb, s * 0.62, out, color);
        scriptX[dir] = nx;
        if (prevBase === ']') {
          LASTLIM[sub ? 'sub' : 'sup'] =
            [(scriptAnchor + nx) / 2, sb - 0.28 * F];
        }
        x = Math.max(x, nx);
        continue;
      }
      /* kombinerande tecken (momentpilarna ↺ ↻): ritas ÖVER föregående
       * glyf och flyttar inte skrivpositionen framåt */
      if (COMBINING[ch]) {
        placeGlyph(ch, prevBaseX, baseline - 0.95 * F, s, out, color);
        continue;
      }
      scriptAnchor = null;
      if (OPS[ch]) { x += 0.26 * F; }
      prevBaseX = x;
      x = placeGlyph(ch, x, baseline, s, out, color);
      if (OPS[ch]) { x += 0.26 * F; out.push({ kind: 'pause', ms: 110 }); }
      if (ch !== ' ') prevBase = ch;
    }
    return x;
  }

  function stringAdvance(str, s, F) {
    var x = 0;
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      if (ch === '^' || ch === '_') {
        var sc = str[++i];
        var sg = GLYPHS[sc];
        x += (sg ? sg.w : 40) * s * 0.62 + 1.5;
        continue;
      }
      if (COMBINING[ch]) continue;         /* momentpil: inget advance */
      var g = GLYPHS[ch];
      x += (g ? g.w : 40) * s + 1.5;
      if (OPS[ch]) x += 0.52 * F;
    }
    return x;
  }

  /* ---------------- layout av hela lösningen ---------------- */
  function layout(spec, F) {
    var s = F / 100;
    var padL = 30, padT = 26;
    var acts = [];          /* stroke/pause i skrivordning */
    var y = padT + 0.95 * F;
    var maxW = 0;
    var lastBase = y;

    var pendingRing = null;
    var prevEndX = padL, prevBaseY = null;
    spec.forEach(function (line, li) {
      var segs = typeof line === 'string' ? [line] : line;
      var cont = Array.isArray(segs) && segs.length &&
        segs[0] && typeof segs[0] === 'object' && segs[0].cont;
      if (cont) segs = segs.slice(1);
      var hasFrac = segs.some(function (sg) { return sg && sg.frac; });
      var textAll = segs.map(function (sg) {
        return typeof sg === 'string' ? sg : (sg && sg.t) || '';
      }).join('');
      var hasTall = /[∫\[]/.test(textAll);   /* integraltecken/klamrar */
      var x;
      if (cont && prevBaseY != null) {
        /* fortsättningsrad: samma baslinje, liten lucka efter förra uttrycket */
        y = prevBaseY;
        x = prevEndX + 0.38 * F;
      } else {
        if (hasFrac) y += 0.55 * F;
        else if (hasTall) y += 0.45 * F;
        x = padL;
      }

      segs.forEach(function (sg) {
        if (typeof sg === 'string') {
          x = placeString(sg, x, y, s, F, acts);
        } else if (sg && sg.frac) {
          var num = sg.frac[0], den = sg.frac[1];
          var fCol = sg.fc ? BLUE : null;    /* fc: streck + nämnare i blått */
          var nw = stringAdvance(num, s, F), dw = stringAdvance(den, s, F);
          var w = Math.max(nw, dw) + 0.3 * F;
          var ybar = y - 0.34 * F;
          placeString(num, x + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
          acts.push({ kind: 'pause', ms: 130 });
          acts.push({ kind: 'stroke', pts: humanize([[x, ybar], [x + w, ybar]]),
                      color: fCol });
          acts.push({ kind: 'pause', ms: 130 });
          placeString(den, x + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, fCol);
          x += w + 1.5;
        } else if (sg && sg.brack) {
          /* hög klammer som rymmer ett bråk: {brack:'['} resp.
           * {brack:']', sub:'1', sup:'3'} — används när primitiva
           * funktionen skrivs med regeln (t.ex. [2x²/2]₁³) */
          var T = y - 1.42 * F, B = y + 0.72 * F;
          var bw = 0.34 * F;
          var jit = function (p) { return [p[0] + rnd(-1, 1), p[1] + rnd(-1, 1)]; };
          if (sg.brack === '[') {
            acts.push({ kind: 'stroke', pts: [jit([x + bw, T]), jit([x + 2, T + 2]),
              jit([x + 3, B - 2]), jit([x + bw + 1, B])] });
            x += bw + 0.16 * F;
          } else {
            acts.push({ kind: 'stroke', pts: [jit([x, T]), jit([x + bw - 2, T + 2]),
              jit([x + bw - 3, B - 2]), jit([x + 1, B])] });
            x += bw + 0.10 * F;
            acts.push({ kind: 'pause', ms: 80 });
            var bx = x, nx1 = x, nx2 = x;
            if (sg.sup != null) {
              nx1 = placeGlyph(sg.sup, bx, T + 0.45 * F, s * 0.62, acts);
              LASTLIM.sup = [(bx + nx1) / 2, T + 0.17 * F];
            }
            if (sg.sub != null) {
              nx2 = placeGlyph(sg.sub, bx, B + 0.30 * F, s * 0.62, acts);
              LASTLIM.sub = [(bx + nx2) / 2, B + 0.02 * F];
            }
            x = Math.max(nx1, nx2);
          }
        } else if (sg && sg.ring) {
          /* pedagogisk cirkelrörelse: ringa in senaste klammergränsen
           * ({ring:'sup'} = övre, {ring:'sub'} = undre) med blåpennan;
           * ringen bleknar när nästa ring ritas eller raden är klar */
          var lim = LASTLIM[sg.ring];
          if (lim) {
            if (pendingRing) acts.push({ kind: 'fade', ref: pendingRing });
            pendingRing = { kind: 'stroke',
              pts: ringPts(lim[0], lim[1], 0.34 * F, 0.46 * F), color: BLUE };
            acts.push(pendingRing);
            acts.push({ kind: 'pause', ms: 260 });
          }
        } else if (sg && sg.t != null) {
          x = placeString(sg.t, x, y, s, F, acts, sg.c ? BLUE : null);
        }
      });
      if (pendingRing) {
        acts.push({ kind: 'fade', ref: pendingRing });
        pendingRing = null;
      }

      /* svarsrader ("Svar: …") stryks under när de är färdigskrivna */
      var firstText = typeof line === 'string' ? line
        : (typeof segs[0] === 'string' ? segs[0] : '');
      if (/^Svar/.test(firstText)) {
        acts.push({ kind: 'pause', ms: 220 });
        acts.push({ kind: 'stroke',
          pts: underlinePts(padL - 2, x - 0.10 * F, y, F) });
      }

      maxW = Math.max(maxW, x);
      var bottom = hasFrac ? y + 0.75 * F : (hasTall ? y + 0.35 * F : y);
      lastBase = cont ? Math.max(lastBase, bottom) : bottom;
      prevEndX = x;
      prevBaseY = y;
      acts.push({ kind: 'pause', ms: 240 });
      acts.push({ kind: 'lineEnd' });        /* steggräns: här pausas stegvis läge */
      acts.push({ kind: 'pause', ms: 320 });
      y = lastBase + 1.7 * F;
    });

    return { acts: acts, contentW: maxW, lastBase: lastBase, padL: padL };
  }

  /* ---------------- scen: "från ekvation till graf" ----------------
   * Kollegieblock-disposition: sambandet överst, värdetabellen till
   * vänster med EN HANDSKRIVEN UTRÄKNING bredvid varje rad (ingen
   * tankebubbla som hinner försvinna), koordinatsystemet UNDER tabellen.
   * Före varje insättning ringar blåpennan in radens x-värde i tabellen
   * och x:et i sambandet ("nu sätter jag in detta här"). Varje tanke-
   * bubbla är ett EGET steg (visas ensam; tonar ut när nästa steg
   * börjar). Steg: samband → bubbla → tabellram → en tabellrad per steg
   * (ring + uträkning + y-värde) → bubbla → koordinatsystem + skala →
   * bubbla → punkter → bubbla → linjal + rät linje.
   * cfg = { typ:'linjegraf', k, m, xs:[...] }                          */
  function layoutLinjegraf(cfg, F) {
    var s = F / 100;
    var acts = [];
    var k = cfg.k, m = cfg.m;
    var xs = cfg.xs || [-3, -2, -1, 0, 1, 2, 3];
    var ys = xs.map(function (x) { return k * x + m; });

    function num(v) { return v < 0 ? '−' + (-v) : '' + v; }
    /* uträkningen bredvid tabellraden: "y=−2·(−3)+3=6+3=9" */
    function calcNote(x, yv) {
      var kx = x < 0 ? num(k) + '·(' + num(x) + ')' : num(k) + '·' + x;
      var mT = (m >= 0 ? '+' : '-') + Math.abs(m);
      return 'y=' + kx + mT + '=' + num(k * x) + mT + '=' + num(yv);
    }

    /* --- geometri: tabell + uträkningar överst, koordinatsystem under --- */
    var u = 27;                              /* 1 enhet = 1 ruta */
    var tx = 30, ty = 74, colW = 62, rowH = 34;
    var tw = 2 * colW, th = (xs.length + 1) * rowH;
    var noteX = tx + tw + 14;                /* uträkningarna börjar här */
    var ox = 243, oy = 648;                  /* origo på rutnätslinjer, under tabellen */
    var xmin = Math.min.apply(null, xs), xmax = Math.max.apply(null, xs);
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);

    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    /* tankebubbla som EGET steg: bubblan visas ensam och steget slutar;
     * vid nästa steg tonar den ut medan skrivandet börjar */
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }

    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var bIntro = bubble(246, 40, 208, [
      [['Jag gör en värdetabell']],
      [['och väljer några']],
      [['x', 1], ['-värden kring 0.']]
    ]);
    var bScale = bubble(26, ty + th + 16, 280, [
      [['x', 1], ['-axeln måste rymma ' + num(xmin) + ' till ' + num(xmax) + ',']],
      [['y', 1], ['-axeln ' + num(ymin) + ' till ' + num(ymax) + '.']]
    ]);
    var bPoint = bubble(285, 400, 240, [
      [['Raden med ', 0], ['x', 1], [' = ' + num(xs[0]) + ' och ', 0], ['y', 1],
       [' = ' + num(ys[0])]],
      [['ger punkten (' + num(xs[0]) + ', ' + num(ys[0]) + ').']]
    ]);
    var bLinjal = bubble(264, 420, 246, [
      [['Punkterna ligger på en rät linje.']],
      [['Jag drar den med linjalen.']]
    ]);
    /* ---- steg 1: sambandet skrivs upp ----
     * full F (ingen 0,9-faktor) — huvudrader skrivs lika stort i alla
     * uppgifter, se KONSEKVENT SKRIFTSTORLEK */
    var xx = placeString('y=' + num(k), tx, 46, s, F, acts);
    var exA = xx;
    xx = placeString('x', xx, 46, s, F, acts);
    var eqXc = (exA + xx) / 2;               /* mitten av x:et i sambandet */
    placeString((m >= 0 ? '+' : '-') + Math.abs(m), xx, 46, s, F, acts);
    stepEnd();

    /* ---- steg 2: tankebubblan (eget steg) ---- */
    tanke(bIntro);

    /* ---- steg 3: tabellram + rubriker ---- */
    line([tx, ty], [tx + tw, ty]);                       /* tabellram */
    line([tx + tw, ty], [tx + tw, ty + th]);
    line([tx + tw, ty + th], [tx, ty + th]);
    line([tx, ty + th], [tx, ty]);
    line([tx + colW, ty], [tx + colW, ty + th]);         /* kolumnlinje */
    var ri;
    for (ri = 1; ri <= xs.length; ri++) {                /* radlinjer */
      line([tx, ty + rowH * ri], [tx + tw, ty + rowH * ri]);
    }
    pause(150);
    var whx = stringAdvance('x', s * 0.62, F * 0.62);
    var why = stringAdvance('y', s * 0.62, F * 0.62);
    placeString('x', tx + colW / 2 - whx / 2, ty + rowH - 10, s * 0.62, F * 0.62, acts);
    placeString('y', tx + colW + colW / 2 - why / 2, ty + rowH - 10, s * 0.62, F * 0.62, acts);
    stepEnd();

    /* ---- steg 4–10: EN tabellrad per steg ----
     * x-värdet skrivs, blåpennan ringar in det och x:et i sambandet
     * ("detta sätts in här"), uträkningen antecknas till höger om raden
     * och först då skrivs y-värdet in i kolumnen. */
    xs.forEach(function (x, i) {
      var base = ty + rowH * (i + 2) - 10;
      var rowCy = ty + rowH * (i + 1) + rowH / 2;
      var sx = num(x), sy = num(ys[i]);
      var wx = stringAdvance(sx, s * 0.62, F * 0.62);
      placeString(sx, tx + colW / 2 - wx / 2, base, s * 0.62, F * 0.62, acts);
      pause(180);
      var rA = { kind: 'stroke',
                 pts: ringPts(tx + colW / 2, rowCy, colW / 2 - 5, 13.5),
                 color: BLUE };
      acts.push(rA);
      pause(260);
      var rB = { kind: 'stroke', pts: ringPts(eqXc, 46 - 0.25 * F, 15, 12),
                 color: BLUE };
      acts.push(rB);
      pause(280);
      placeString(calcNote(x, ys[i]), noteX, base, s * 0.55, F * 0.55, acts);
      pause(180);
      var wy = stringAdvance(sy, s * 0.62, F * 0.62);
      placeString(sy, tx + colW + colW / 2 - wy / 2, base, s * 0.62, F * 0.62, acts);
      acts.push({ kind: 'fade', ref: rA });
      acts.push({ kind: 'fade', ref: rB });
      stepEnd();
    });

    /* ---- steg 11: skal-bubblan (eget steg) — den tonar ut när
     * axlarna börjar ritas, så den hinner aldrig ligga i vägen ---- */
    tanke(bScale);

    /* ---- steg 12: koordinatsystem + skala ---- */
    var xa0 = ox + (xmin - 0.6) * u, xa1 = ox + (xmax + 0.8) * u;
    var ya0 = oy - (ymax + 0.8) * u, ya1 = oy - (ymin - 0.6) * u;
    line([xa0, oy], [xa1, oy]);                          /* x-axel + pil */
    line([xa1 - 8, oy - 5], [xa1 + 1, oy]);
    line([xa1 - 8, oy + 5], [xa1 + 1, oy]);
    line([ox, ya1], [ox, ya0]);                          /* y-axel + pil */
    line([ox - 5, ya0 + 8], [ox, ya0 - 1]);
    line([ox + 5, ya0 + 8], [ox, ya0 - 1]);
    placeGlyph('x', xa1 + 4, oy + 22, s * 0.6, acts);    /* axeletiketter */
    placeGlyph('y', ox + 10, ya0 + 4, s * 0.6, acts);
    pause(200);
    /* skala: skalstreck + tal vid 1 och sedan vart femte steg.
     * Talen skrivs KONSEKVENT under x-axeln resp. vänster om y-axeln. */
    function tickVals(minV, maxV) {
      var vals = [];
      if (maxV >= 1) vals.push(1);
      var v;
      for (v = 5; v <= maxV; v += 5) vals.push(v);
      for (v = -5; v >= minV; v -= 5) vals.push(v);
      return vals;
    }
    var str, w;
    tickVals(xmin, xmax).forEach(function (v) {          /* skala på x */
      line([ox + v * u, oy - 4], [ox + v * u, oy + 4]);  /* skalstreck */
      str = num(v);
      w = stringAdvance(str, s * 0.45, F * 0.45);
      placeString(str, ox + v * u - w / 2, oy + 23, s * 0.45, F * 0.45, acts);
      acts.push({ kind: 'pause', ms: 90 });
    });
    pause(150);
    tickVals(ymin, ymax).forEach(function (v) {          /* skala på y */
      line([ox - 4, oy - v * u], [ox + 4, oy - v * u]);
      str = num(v);
      w = stringAdvance(str, s * 0.45, F * 0.45);
      placeString(str, ox - 8 - w, oy - v * u + 5, s * 0.45, F * 0.45, acts);
      acts.push({ kind: 'pause', ms: 90 });
    });
    stepEnd();

    /* ---- steg 11: pricka in punkterna ----
     * Vid varje punkt tonar STRECKADE HJÄLPLINJER in — lodrätt ned till
     * x-värdet på x-axeln och vågrätt till y-värdet på y-axeln — så att
     * eleven ser varför punkten hamnar just där. De tonar ut när nästa
     * punkt prickas in. */
    /* hjälpsiffrans pennstreck förrenderas (den tonar in med linjerna,
     * handen ritar den inte) */
    function guideLabel(str, gx, gy) {
      var tmp = [];
      placeString(str, gx, gy, s * 0.45, F * 0.45, tmp);
      return tmp.filter(function (a) { return a.kind === 'stroke'; })
                .map(function (a) { return a.pts; });
    }
    var scaleX = tickVals(xmin, xmax), scaleY = tickVals(ymin, ymax);
    var prevGuide = null;
    tanke(bPoint);                      /* punkt-bubblan är ett eget steg */
    xs.forEach(function (x, i) {
      var rcy = ty + rowH * (i + 1) + rowH / 2;
      /* ringa in raden med blåpennan */
      var ring = { kind: 'stroke', pts: ringPts(tx + tw / 2, rcy, tw / 2 + 8, 14.5),
                   color: BLUE };
      acts.push(ring);
      pause(200);
      var px = ox + x * u, py = oy - ys[i] * u;
      if (prevGuide) acts.push({ kind: 'hide', obj: prevGuide });
      var guide = { guide: 1, px: px, py: py, ox: ox, oy: oy, wins: [],
                    labels: [] };
      /* hjälpsiffror vid axlarna — men inte för tal som redan står på
       * skalan (t.ex. 1 och 5) och inte för 0 */
      if (x !== 0 && scaleX.indexOf(x) < 0) {
        var wgx = stringAdvance(num(x), s * 0.45, F * 0.45);
        guide.labels = guide.labels.concat(
          guideLabel(num(x), px - wgx / 2, oy + 23));
      }
      if (ys[i] !== 0 && scaleY.indexOf(ys[i]) < 0) {
        var wgy = stringAdvance(num(ys[i]), s * 0.45, F * 0.45);
        guide.labels = guide.labels.concat(
          guideLabel(num(ys[i]), ox - 8 - wgy, py + 5));
      }
      acts.push({ kind: 'show', obj: guide });
      prevGuide = guide;
      pause(220);
      /* prick på punkten — liten tät spiral som fyller igen */
      acts.push({ kind: 'stroke', pts: dotPts(px, py) });
      acts.push({ kind: 'fade', ref: ring });
      pause(200);
    });
    pause(400);
    if (prevGuide) acts.push({ kind: 'hide', obj: prevGuide });
    stepEnd();

    /* ---- linjal-bubblan (eget steg), sedan linjal + rät linje ---- */
    tanke(bLinjal);
    var ex0 = xmin - 0.2, ex1 = xmax + 0.2;
    var lp1 = [ox + ex0 * u, oy - (k * ex0 + m) * u];
    var lp2 = [ox + ex1 * u, oy - (k * ex1 + m) * u];
    var ruler = { ruler: 1, x1: lp1[0], y1: lp1[1], x2: lp2[0], y2: lp2[1],
                  wins: [] };
    acts.push({ kind: 'jump', to: [ox + xmax * u + 50, oy + 60] });  /* hämtar linjalen */
    pause(250);
    acts.push({ kind: 'show', obj: ruler });
    pause(550);
    acts.push({ kind: 'stroke', pts: [lp1, lp2] });      /* exakt rak — mot linjalen */
    pause(350);
    acts.push({ kind: 'hide', obj: ruler });
    pause(400);
    acts.push({ kind: 'lineEnd' });
    pause(200);

    return { acts: acts, contentW: 500, lastBase: ya1 + 6, padL: tx };
  }

  /* ---------------- scen: extremvärdesproblem "hästhagen" ----------------
   * Exempel 2 ur ma3c-4.6 (maximal area): geometrisk figur (mur + hage +
   * måttpilar) ritas först, sedan a) areafunktion och b) derivering,
   * nollställe, insättning, andraderivata och svar. VARJE skriven rad är
   * ett eget klicksteg (ett "skipklick" ska aldrig hoppa över mer än den
   * rad man är på), och varje tankebubbla är också ett EGET steg. */
  function layoutHage(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    /* tankebubbla som EGET steg: bubblan visas ensam och steget slutar;
     * vid nästa steg tonar den ut medan skrivandet börjar */
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    /* pilspets som följer bågens SLUTRIKTNING: benen läggs symmetriskt
     * kring tangenten vid spetsen, så spetsen pekar dit bågen pekar */
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }

    /* ---- steg 1: figuren ---- */
    var fx = padL, fy = 40;
    var murW = 272, murH = 26;
    var hx = fx + 36, hy = fy + murH, hw = 200, hh = 104;

    /* y=100, INTE högre upp: arkets övre högra hörn är reserverat för
     * inställningsrutan ("Med/Utan tankar") + helskärmsknappen — en bubbla
     * där skyms av rutan (samma REGEL som att bubblor aldrig skymmer:
     * de får heller aldrig SKYMMAS). Bulorna når ~25 px över rektangeln,
     * så toppen måste ligga under ca y=90. */
    var b1 = bubble(346, 100, 236, [
      [['Först ritar jag en figur!']],
      [['Muren blir hagens ena sida.']],
      [['Där behövs inget stängsel.']]
    ]);
    var b2 = bubble(346, 100, 240, [
      [['Stängslet räcker till tre sidor:']],
      [['x', 1], [' + ', 0], ['x', 1], [' + (60 − 2', 0], ['x', 1], [') = 60 meter.']]
    ]);
    tanke(b1);
    line([fx, fy], [fx + murW, fy]);                       /* muren */
    line([fx, fy + murH], [fx + murW, fy + murH]);
    line([fx, fy], [fx, fy + murH]);
    line([fx + murW, fy], [fx + murW, fy + murH]);
    var hxi;
    for (hxi = 0; hxi < 8; hxi++) {                        /* skraffering */
      var xh = fx + 10 + hxi * 33;
      if (Math.abs(xh - (fx + murW / 2)) < 40) continue;   /* plats för "Mur" */
      line([xh + 11, fy + 3], [xh, fy + murH - 3]);
    }
    var wMur = stringAdvance('Mur', s * 0.55, F * 0.55);
    placeString('Mur', fx + murW / 2 - wMur / 2, fy + murH - 7, s * 0.55, F * 0.55, acts);
    pause(200);
    line([hx, hy], [hx, hy + hh]);                         /* hagen: tre sidor */
    line([hx, hy + hh], [hx + hw, hy + hh]);
    line([hx + hw, hy + hh], [hx + hw, hy]);
    stepEnd();
    tanke(b2);
    /* måttpilar + mått ÄR vektorer/tal (se REGEL i filhuvudet) → blått */
    var lx = hx - 16, rx = hx + hw + 16, by = hy + hh + 18;
    line([lx, hy + 8], [lx, hy + hh - 8], BLUE);           /* måttpil vänster */
    line([lx - 4, hy + 15], [lx, hy + 7], BLUE);
    line([lx + 4, hy + 15], [lx, hy + 7], BLUE);
    line([lx - 4, hy + hh - 15], [lx, hy + hh - 7], BLUE);
    line([lx + 4, hy + hh - 15], [lx, hy + hh - 7], BLUE);
    placeGlyph('x', lx - 26, hy + hh / 2 + 6, s * 0.6, acts, BLUE);
    line([rx, hy + 8], [rx, hy + hh - 8], BLUE);           /* måttpil höger */
    line([rx - 4, hy + 15], [rx, hy + 7], BLUE);
    line([rx + 4, hy + 15], [rx, hy + 7], BLUE);
    line([rx - 4, hy + hh - 15], [rx, hy + hh - 7], BLUE);
    line([rx + 4, hy + hh - 15], [rx, hy + hh - 7], BLUE);
    placeGlyph('x', rx + 8, hy + hh / 2 + 6, s * 0.6, acts, BLUE);
    line([hx + 8, by], [hx + hw - 8, by], BLUE);           /* måttpil botten */
    line([hx + 15, by - 4], [hx + 7, by], BLUE);
    line([hx + 15, by + 4], [hx + 7, by], BLUE);
    line([hx + hw - 15, by - 4], [hx + hw - 7, by], BLUE);
    line([hx + hw - 15, by + 4], [hx + hw - 7, by], BLUE);
    var wBot = stringAdvance('60−2x', s * 0.6, F * 0.6);
    placeString('60−2x', hx + hw / 2 - wBot / 2, by + 24, s * 0.6, F * 0.6, acts, BLUE);
    /* enheten uppe till höger i figuren */
    var wEnh = stringAdvance('(m)', s * 0.55, F * 0.55);
    placeString('(m)', fx + murW - wEnh + 8, fy - 8, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- steg 2: a) areafunktionen skrivs upp ----
     * Pedagogiska krullklamrar i blått: "basen" över (60-2x), "höjden"
     * över x, ritade ovanför uttrycket. De fejdas ut som grupp när nästa
     * steg börjar (se braceGroup + fade-eventen precis före tanke(b3b)). */
    var y = by + 114;
    var adv = 1.7 * F;
    /* Bubblorna ligger under senast skrivna rad (2026-07-29) — de tonar ut
     * innan nästa rad skrivs, så platsen är ledig. LUFT MOT RADEN OVANFÖR:
     * bulorna når BUBBLE_R[1] = 25 px över molnrektangeln, så toppen läggs
     * 0,28·F (underlängd) + 33 px under föregående baslinje. Skriv aldrig
     * egna offsets på fri hand — de blir tajta (påpekat 2026-07-29). */
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    var b3 = bubble(120, bubbleTop(by + 24), 226, [
      [['Rektangelns area:']],
      [['basen · höjden']]
    ]);
    tanke(b3);
    function brace(x0, x1, label) {
      /* Klammerns fötter måste ligga med LUFT ovanför tecknen: versaler och
       * siffror når ~0,86·F över baslinjen (glyfen v=14→100 skalas med F/100)
       * plus jitter. 1,05·F ger ~6 px marginal — lägre värden lägger
       * klammern direkt på siffrorna. */
      var pad = 4, yTop = y - 1.05 * F, h = 0.30 * F;
      var st = { kind: 'stroke', pts: bracePts(x0 - pad, x1 + pad, yTop, h),
                 color: BLUE };
      acts.push(st);
      pause(110);
      var group = [st], before = acts.length;
      var lw = stringAdvance(label, s * 0.5, F * 0.5);
      placeString(label, (x0 + x1) / 2 - lw / 2, yTop - h * 1.18 - 10,
                  s * 0.5, F * 0.5, acts, BLUE);
      for (var i = before; i < acts.length; i++) {
        if (acts[i].kind === 'stroke') group.push(acts[i]);
      }
      pause(150);
      return group;
    }
    var xx = placeString('a) A(x)=(', padL, y, s, F, acts);
    var s60 = xx; xx = placeString('60', xx, y, s, F, acts);
    var c60 = (s60 + xx) / 2;
    xx = placeString('-', xx, y, s, F, acts);
    var s2x = xx; xx = placeString('2x', xx, y, s, F, acts);
    var c2x = (s2x + xx) / 2;
    var pEnd = xx;                        /* slutet av "60-2x"-uttrycket */
    xx = placeString(')·', xx, y, s, F, acts);
    var sxm = xx; xx = placeString('x', xx, y, s, F, acts);
    var cxm = (sxm + xx) / 2;
    var xEnd = xx;                        /* slutet av höjdfaktorn "x" */
    var braceGroup = brace(s60, pEnd, 'basen').concat(brace(sxm, xEnd, 'höjden'));
    stepEnd();

    /* ---- steg 3: distributiva bågpilar + utvecklingen ---- */
    var b3b = bubble(120, bubbleTop(y), 252, [
      /* inget skiljetecken direkt efter kursiv variabel — "x:et" växer
        * ihop till "x.et" (påpekat 2026-07-29) */
      [['Distributiva lagen: ', 0], ['x', 1], [' multipliceras', 0]],
      [['med båda termerna!']]
    ]);
    braceGroup.forEach(function (st) { acts.push({ kind: 'fade', ref: st }); });
    tanke(b3b);
    /* bågpil x → 60, sedan termen 60x; bågpil x → 2x, sedan −2x² */
    var yArc = y - 0.98 * F;
    var m1x = (cxm + c60) / 2, m1y = yArc - 30;
    acts.push({ kind: 'stroke',
      pts: [[cxm, yArc], [m1x, m1y], [c60 + 5, yArc - 3]] });
    arrowHead(c60 + 5, yArc - 3, m1x, m1y, 11);
    pause(300);
    y += adv;
    xx = placeString('=60x', padL, y, s, F, acts);
    pause(350);
    var m2x = (cxm + c2x) / 2, m2y = yArc - 18;
    acts.push({ kind: 'stroke',
      pts: [[cxm + 6, yArc], [m2x, m2y], [c2x + 5, yArc - 3]] });
    arrowHead(c2x + 5, yArc - 3, m2x, m2y, 11);
    pause(300);
    placeString('-2x^2', xx, y, s, F, acts);
    stepEnd();

    /* ---- steg 4: svaret på a) ----
     * Skrivs i två placeString så att areafunktionens x-gränser kan sparas
     * — det är DEN handen ringar in vid insättningen i steg 12. */
    y += adv;
    var xSvar = placeString('Svar: ', padL, y, s, F, acts);
    var xe = placeString('A(x)=60x-2x^2', xSvar, y, s, F, acts);
    var boxAx = [xSvar, xe, y, F, { ry: 0.82 * F, cy: y - 0.46 * F }];
    underline(xe, y);
    stepEnd();

    /* ---- steg 5–6: b) derivera och sätt derivatan till noll ---- */
    y += adv + 18;
    var b4 = bubble(120, bubbleTop(y - adv - 18), 236, [
      [['Största arean? Derivera']],
      [['och sätt ', 0], ["A'", 1], ['(', 0], ['x', 1], [') = 0!']]
    ]);
    tanke(b4);
    placeString("b) A'(x)=60-4x", padL, y, s, F, acts);
    stepEnd();
    y += adv;
    placeString('60-4x=0', padL, y, s, F, acts);
    stepEnd();

    /* ---- steg 7–11: lös ekvationen — ALLA mellansteg, rad för rad ---- */
    y += adv + 18;
    var b4b = bubble(120, bubbleTop(y - adv - 18), 248, [
      [['Vågskålsmetoden: addera 4', 0], ['x', 1]],
      [['och dela sedan båda leden med 4.']]
    ]);
    tanke(b4b);
    xx = placeString('60-4x', padL, y, s, F, acts);
    xx = placeString('+4x', xx, y, s, F, acts, BLUE);
    xx = placeString('=', xx, y, s, F, acts);
    xx = placeString('0', xx, y, s, F, acts);
    placeString('+4x', xx, y, s, F, acts, BLUE);
    stepEnd();
    y += adv;
    placeString('60=4x', padL, y, s, F, acts);
    stepEnd();
    y += adv + 0.55 * F;
    /* bråkraden 60/4 = 4x/4 med blått streck + nämnare (som i vågskåls-demot) */
    var fracH = function (numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: BLUE });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, BLUE);
      return x0 + w + 1.5;
    };
    xx = fracH('60', '4', padL, y);
    xx = placeString('=', xx, y, s, F, acts);
    fracH('4x', '4', xx, y);
    stepEnd();
    y += adv + 0.65 * F;
    placeString('15=x', padL, y, s, F, acts);
    stepEnd();
    y += adv;
    var xE15 = placeString('x=15', padL, y, s, F, acts);
    var box15 = [padL, xE15, y, F];
    stepEnd();

    /* ---- steg 12–13: insättning i A(x) ----
     * INSÄTTNINGSGEST (se REGEL i filhuvudet): ring först runt värdet
     * "x = 15", sedan runt areafunktionen på svarsraden — därefter
     * skrivs den insatta raden. Ringarna fejdas ut när raden är klar. */
    y += adv + 18;
    var b5 = bubble(120, bubbleTop(y - adv - 18), 240, [
      [['Hur stor är arean då?']],
      [['In med ', 0], ['x', 1], [' = 15 i ', 0], ['A', 1], ['(', 0], ['x', 1], [')!']]
    ]);
    tanke(b5);
    var ringar = substRings(acts, [box15, boxAx]);
    placeString('A(15)=60·15-2·15^2', padL, y, s, F, acts);
    fadeRings(acts, ringar);
    stepEnd();
    y += adv;
    placeString('=900-450=450', padL, y, s, F, acts);
    stepEnd();

    /* ---- steg 14–15: karaktär + svar ---- */
    y += adv + 18;
    var b6 = bubble(120, bubbleTop(y - adv - 18), 244, [
      [['Max eller min? Kolla tecknet på']],
      [['andraderivatan: negativt = max!']]
    ]);
    tanke(b6);
    placeString("A''(x)=−4<0⇒max", padL, y, s, F, acts);
    stepEnd();
    y += adv;
    xe = placeString('Svar: 450 m^2', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 566, lastBase: y + 14, padL: padL };
  }

  /* ---------------- mätvärdesklammer (se REGEL i filhuvudet) ---------
   * Skriver alla mätvärden i en hög klammer [ … ], ett värde per rad,
   * efter att den sökta variabeln lösts ut och INNAN värdena sätts in.
   * rows = strängar som 'm_B=30 kg' — behövs SI-omvandling skrivs den ut
   * i raden ('l=25 cm=0,25 m'). Returnerar { boxes, yEnd } där boxes[i]
   * är rad i:s ringbox för insättningsgesten och yEnd sista radens
   * baslinje. Klammern skrivs som handen gör det: vänsterklammern först,
   * sedan raderna uppifrån och ned, sist högerklammern. */
  function valueBracket(acts, rows, x0, yTop, s, F, opt) {
    /* opt.rs: radskala — 0,8 som standard (något mindre än huvudraderna);
     * en lång deluträkningsrad som annars inte ryms på arket får skrivas
     * något mindre (0,75 räcker för fjader-scenens F_R-rad).
     *
     * En rad är en sträng ELLER en array av segment: strängar och
     * {frac:['täljare','nämnare']} — bråk med VÅGRÄTT divisionsstreck
     * (se REGEL DIVISION MED VÅGRÄTT STRECK; snedstreck i uträkningar är
     * förbjudet). Bråkrader får automatiskt extra radhöjd. */
    var rs = (opt && opt.rs) || 0.8;
    var ss = s * rs, sF = F * rs;
    function segsOf(r) { return typeof r === 'string' ? [r] : r; }
    function fracW(sg) {
      return Math.max(stringAdvance(sg.frac[0], ss, sF),
                      stringAdvance(sg.frac[1], ss, sF)) + 0.3 * sF;
    }
    function rowW(r) {
      return segsOf(r).reduce(function (w, sg) {
        return w + (typeof sg === 'string'
          ? stringAdvance(sg, ss, sF) : fracW(sg) + 1.5);
      }, 0);
    }
    function hasFrac(r) {
      return segsOf(r).some(function (sg) { return typeof sg !== 'string'; });
    }
    var widths = rows.map(rowW);
    var wMax = Math.max.apply(null, widths);
    /* radbaslinjer: en bråkrad kräver luft för täljaren ovanför sig och
     * nämnaren under sig */
    var ys = [], yCur = yTop;
    rows.forEach(function (r, i) {
      if (i > 0) {
        yCur += 1.5 * sF + (hasFrac(r) ? 0.7 * sF : 0) +
                (hasFrac(rows[i - 1]) ? 0.55 * sF : 0);
      }
      ys.push(yCur);
    });
    var tick = 0.34 * sF;                    /* klammerklackarnas längd */
    var yA = yTop - (hasFrac(rows[0]) ? 1.55 : 0.95) * sF;
    var yB = ys[ys.length - 1] +
             (hasFrac(rows[rows.length - 1]) ? 1.15 : 0.4) * sF;
    var xT = x0 + tick + 0.45 * sF;          /* radernas vänsterkant */
    var xR = xT + wMax + 0.45 * sF + tick;   /* högerklammerns streck */
    /* vänsterklammern [ : klack, lodrätt streck, klack */
    acts.push({ kind: 'stroke', pts: humanize([[x0 + tick, yA], [x0, yA]]) });
    acts.push({ kind: 'stroke', pts: humanize([[x0, yA], [x0, yB]]) });
    acts.push({ kind: 'stroke', pts: humanize([[x0, yB], [x0 + tick, yB]]) });
    acts.push({ kind: 'pause', ms: 160 });
    var boxes = rows.map(function (r, i) {
      var yi = ys[i];
      var x = xT;
      segsOf(r).forEach(function (sg) {
        if (typeof sg === 'string') {
          x = placeString(sg, x, yi, ss, sF, acts);
        } else {
          var ybar = yi - 0.34 * sF;
          var nw = stringAdvance(sg.frac[0], ss, sF),
              dw = stringAdvance(sg.frac[1], ss, sF);
          var w = Math.max(nw, dw) + 0.3 * sF;
          /* täljare med nedstapel (g, y, j, p) lyfts, annars skär svansen
           * rakt igenom divisionsstrecket */
          var ny = /[gyjp]/.test(sg.frac[0]) ? -0.36 : -0.14;
          placeString(sg.frac[0], x + (w - nw) / 2, ybar + ny * sF,
                      ss, sF, acts);
          acts.push({ kind: 'pause', ms: 120 });
          acts.push({ kind: 'stroke',
            pts: humanize([[x, ybar], [x + w, ybar]]) });
          acts.push({ kind: 'pause', ms: 120 });
          placeString(sg.frac[1], x + (w - dw) / 2, ybar + 1.04 * sF,
                      ss, sF, acts);
          x += w + 1.5;
        }
      });
      acts.push({ kind: 'pause', ms: 140 });
      return [xT, xT + widths[i], yi, sF];
    });
    /* högerklammern ] */
    acts.push({ kind: 'stroke', pts: humanize([[xR - tick, yA], [xR, yA]]) });
    acts.push({ kind: 'stroke', pts: humanize([[xR, yA], [xR, yB]]) });
    acts.push({ kind: 'stroke', pts: humanize([[xR, yB], [xR - tick, yB]]) });
    return { boxes: boxes, yEnd: ys[ys.length - 1] };
  }

  /* ---------------- rotecken (√) ----------------
   * Roten ritas som EN penndragning, som för hand: kort ansats, ned till
   * spetsen, upp till vinculumet och vågrätt över HELA innehållet, med en
   * liten avslutande nedåtklack. Ingen glyf — vinculumets längd beror på
   * innehållet, så mät innehållet med stringAdvance (eller bråkets bredd)
   * FÖRST och rita innehållet EFTER rottecknet på returnerad x-position.
   * x = teckenets vänsterkant, yBase = radens baslinje, contentW =
   * innehållets bredd. opt = { yTop, yBot, color } — skicka högre yTop och
   * lägre yBot när innehållet är ett bråk (standard passar en radhög
   * teckensträng som '9,82·0,80'). */
  function rootSign(acts, x, yBase, contentW, F, opt) {
    opt = opt || {};
    var yTop = opt.yTop != null ? opt.yTop : yBase - 1.18 * F;
    var yBot = opt.yBot != null ? opt.yBot : yBase + 0.14 * F;
    var yMid = yBase - 0.42 * F;
    var xV = x + 0.46 * F;                    /* där vinculumet börjar */
    var xE = xV + contentW + 0.22 * F;        /* vinculumets slut */
    var pts = [
      [x, yMid],
      [x + 0.10 * F, yMid - 0.05 * F],
      [x + 0.26 * F, yBot],
      [xV, yTop],
      [(xV + xE) / 2, yTop + rnd(-1.2, 1.2)],
      [xE, yTop],
      [xE + 0.03 * F, yTop + 0.14 * F]
    ].map(function (p) { return [p[0] + rnd(-0.8, 0.8), p[1] + rnd(-0.8, 0.8)]; });
    acts.push({ kind: 'stroke', pts: pts, color: opt.color || null });
    acts.push({ kind: 'pause', ms: 110 });
    return xV + 0.10 * F;                     /* innehållets startposition */
  }

  /* ================ MATTESCENER: Ma 1c kapitel 1 ================
   * Pennlösningar till exempeluppgifterna i ma1c-1.1 (Talmängder och
   * negativa tal) och ma1c-1.2 (Bråk). OBS: fysikreglerna om mätvärdes-
   * klammer, rimlighetsbubbla och svarsrad utan beteckning gäller INTE
   * här — matteprocedurerna följer i stället teorigenomgångens egen
   * redovisning: räkneraden skrivs om steg för steg på samma rad
   * (kollegieblock-stil), det man GÖR med uttrycket (teckenbyte,
   * förlängning, förkortning) markeras med blåpennan, och svaret skrivs
   * som uppgiften kräver (t.ex. ett bråk eller en olikhet).
   *
   * Gemensamt mönster: tankebubbla (eget steg) → rad → svarsrad med
   * dubbelstrecksram. Bubblor läggs under senast skrivna rad
   * (bubbleTop) och aldrig i arkets övre högra hörn (se REGEL). */

  /* ---------------- scen: rationellt tal (ma1c-1.1 ex 1) ----------------
   * "Ange ett rationellt tal som inte är ett heltal." Pennan väljer 1/3,
   * markerar talet på en tallinje mellan 0 och 1 (markeringen är en
   * anteckning av ett VÄRDE → blåpennan) och drar slutsatsen. */
  function layoutTalmangd(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* ---- steg 1: välj ett bråk ---- */
    var b1 = bubble(120, 40, 246, [
      [['Ett rationellt tal kan']],
      [['skrivas som ett bråk. Jag']],
      [['väljer en tredjedel.']]
    ]);
    tanke(b1);
    var y = 100;
    fracH('1', '3', padL, y);
    stepEnd();

    /* ---- steg 2: markera talet på tallinjen ---- */
    var b2 = bubble(120, bubbleTop(y + 1.04 * F), 250, [
      [['Är det ett heltal? Jag']],
      [['markerar talet på tallinjen.']]
    ]);
    tanke(b2);
    var ty = 236;                             /* tallinjens y */
    var x0 = 110, u = 360;                    /* 0 vid x0, 1 enhet = u px */
    line([x0 - 20, ty], [x0 + u + 32, ty]);   /* tallinjen + pilar åt båda håll */
    line([x0 + u + 22, ty - 5], [x0 + u + 32, ty]);
    line([x0 + u + 22, ty + 5], [x0 + u + 32, ty]);
    line([x0 - 10, ty - 5], [x0 - 20, ty]);
    line([x0 - 10, ty + 5], [x0 - 20, ty]);
    pause(120);
    [0, 1].forEach(function (v) {             /* heltalen 0 och 1 */
      line([x0 + v * u, ty - 7], [x0 + v * u, ty + 7]);
      var str = '' + v;
      var w = stringAdvance(str, s * 0.5, F * 0.5);
      placeString(str, x0 + v * u - w / 2, ty + 26, s * 0.5, F * 0.5, acts);
    });
    [1 / 3, 2 / 3].forEach(function (v) {     /* tredjedelarna */
      line([x0 + v * u, ty - 4], [x0 + v * u, ty + 4]);
    });
    stepEnd();
    /* markeringen (ett VÄRDE) i blått: prick + litet bråk ovanför */
    var mx = x0 + u / 3;
    acts.push({ kind: 'stroke', pts: dotPts(mx, ty), color: BLUE });
    pause(150);
    var k = 0.55, mybar = ty - 34;
    var mw = Math.max(stringAdvance('1', s * k, F * k),
                      stringAdvance('3', s * k, F * k)) + 0.3 * F * k;
    placeString('1', mx - mw / 2 +
      (mw - stringAdvance('1', s * k, F * k)) / 2, mybar - 0.14 * F * k,
      s * k, F * k, acts, BLUE);
    acts.push({ kind: 'stroke',
      pts: humanize([[mx - mw / 2, mybar], [mx + mw / 2, mybar]]), color: BLUE });
    placeString('3', mx - mw / 2 +
      (mw - stringAdvance('3', s * k, F * k)) / 2, mybar + 1.04 * F * k,
      s * k, F * k, acts, BLUE);
    stepEnd();

    /* ---- steg 3: slutsats + svar ---- */
    var b3 = bubble(120, bubbleTop(ty + 26), 262, [
      [['En tredjedel ligger mellan']],
      [['0 och 1. Alltså är det inte']],
      [['ett heltal!']]
    ]);
    tanke(b3);
    y = 356;
    var xe = placeString('Svar: ', padL, y, s, F, acts);
    xe = fracH('1', '3', xe, y);
    underline(xe, y + 0.95 * F);
    stepEnd();

    return { acts: acts, contentW: 520, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: olikhetstecken (ma1c-1.1 ex 2) ----------------
   * "Sätt ut < eller > mellan talen: a) 23 19, b) −20 −3." En tallinje
   * per deluppgift; de båda talen markeras med blåpennan (givna VÄRDEN)
   * och tecknet sätts ut i svarsraden. */
  function layoutOlikhet(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* en tallinje med pilar åt båda håll, heltalssteg och etiketter.
     * marks = [värde, ...] markeras med blå prick + blå siffra OVANFÖR. */
    function tallinje(ty, vMin, vMax, x0, u, labels, marks) {
      var xa = x0 - 20, xb = x0 + (vMax - vMin) * u + 32;
      line([xa, ty], [xb, ty]);
      line([xb - 10, ty - 5], [xb, ty]);
      line([xb - 10, ty + 5], [xb, ty]);
      line([xa + 10, ty - 5], [xa, ty]);
      line([xa + 10, ty + 5], [xa, ty]);
      pause(120);
      for (var v = vMin; v <= vMax; v++) {
        var x = x0 + (v - vMin) * u;
        var big = labels.indexOf(v) >= 0;
        line([x, ty - (big ? 6 : 4)], [x, ty + (big ? 6 : 4)]);
      }
      labels.forEach(function (v) {
        var str = (v < 0 ? '−' + (-v) : '' + v);
        var w = stringAdvance(str, s * 0.5, F * 0.5);
        placeString(str, x0 + (v - vMin) * u - w / 2, ty + 25,
                    s * 0.5, F * 0.5, acts);
        pause(80);
      });
      stepEnd();
      marks.forEach(function (v) {
        var x = x0 + (v - vMin) * u;
        acts.push({ kind: 'stroke', pts: dotPts(x, ty), color: BLUE });
        pause(150);
        var str = (v < 0 ? '−' + (-v) : '' + v);
        var w = stringAdvance(str, s * 0.55, F * 0.55);
        placeString(str, x - w / 2, ty - 14, s * 0.55, F * 0.55, acts, BLUE);
        pause(120);
      });
      stepEnd();
    }

    /* ---- a) 23 eller 19 ----
     * Tallinjen ligger så långt ned (ty=170) att de blå markeringarna
     * OVANFÖR den (baslinje ty−14) hamnar under inställningsrutans
     * mobilzon y<150 — se REGEL i filhuvudet ("23" hamnade bakom rutan
     * på mobil, påpekat 2026-08-04). */
    var bA = bubble(120, 40, 258, [
      [['a) Jag ritar tallinjen.']],
      [['Talet längst till höger']],
      [['är det största talet.']]
    ]);
    tanke(bA);
    placeString('a)', padL, 62, s * 0.62, F * 0.62, acts);
    pause(200);
    tallinje(170, 15, 25, 80, 48, [15, 20, 25], [19, 23]);
    var bA2 = bubble(120, bubbleTop(196), 264, [
      [['23 ligger till höger om 19.']],
      [['Olikhetstecknet gapar mot']],
      [['det största talet!']]
    ]);
    tanke(bA2);
    var y = 262;
    var xe = placeString('Svar: 23>19', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- b) −20 eller −3 ---- */
    var bB = bubble(120, bubbleTop(y), 268, [
      [['b) Ju längre till vänster ett']],
      [['tal ligger, desto mindre']],
      [['är det.']]
    ]);
    tanke(bB);
    placeString('b)', padL, 336, s * 0.62, F * 0.62, acts);
    pause(200);
    tallinje(400, -21, 1, 66, 23, [-20, -15, -10, -5, 0], [-20, -3]);
    var bB2 = bubble(120, bubbleTop(426), 262, [
      [['−20 ligger längst till']],
      [['vänster och är alltså']],
      [['det minsta talet.']]
    ]);
    tanke(bB2);
    y = 492;
    xe = placeString('Svar: (−20)<(−3)', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 600, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: addition/subtraktion av negativa tal
   * (ma1c-1.1 ex 3): a) 4−(−9), b) 25+(−10). Teckenparet ringas in med
   * blåpennan medan bubblan förklarar regeln, och omskrivningen
   * fortsätter på SAMMA rad (kollegieblock-stil). Det nya tecknet som
   * ersätter paret skrivs med blåpennan. */
  function layoutNegadd(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* ---- a) 4−(−9) ----
     * Omskrivningen skrivs på EGEN rad som börjar med '=' (kollegie-
     * block-stil) — på samma rad hade radslutet nått in i inställnings-
     * rutans mobilzon x>420, y<150 (se REGEL i filhuvudet). */
    var y = 64;
    var xx = placeString('a) 4', padL, y, s, F, acts);
    var r0 = xx;
    xx = placeString('-(−', xx, y, s, F, acts);
    var r1 = xx;
    placeString('9)', xx, y, s, F, acts);
    stepEnd();
    var ringA = { kind: 'stroke', pts: ringBox(r0, r1, y, F), color: BLUE };
    acts.push(ringA);
    pause(260);
    var bA = bubble(120, bubbleTop(y), 262, [
      [['Två minustecken ihop!']],
      [['Lika tecken ersätts med']],
      [['ett plustecken.']]
    ]);
    tanke(bA);
    y += 1.7 * F;
    xx = placeString('=4', padL + 30, y, s, F, acts);
    xx = placeString('+', xx, y, s, F, acts, BLUE);
    xx = placeString('9', xx, y, s, F, acts);
    placeString('=13', xx, y, s, F, acts);
    acts.push({ kind: 'fade', ref: ringA });
    stepEnd();
    y += 1.7 * F;
    var xe = placeString('Svar: 13', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- b) 25+(−10) ---- */
    var bB = bubble(120, bubbleTop(y), 260, [
      [['b) Plus och minus ihop.']],
      [['Olika tecken ersätts med']],
      [['ett minustecken.']]
    ]);
    tanke(bB);
    y += 2.4 * F;
    xx = placeString('b) 25', padL, y, s, F, acts);
    var q0 = xx;
    xx = placeString('+(−', xx, y, s, F, acts);
    var q1 = xx;
    placeString('10)', xx, y, s, F, acts);
    stepEnd();
    var ringB = { kind: 'stroke', pts: ringBox(q0, q1, y, F), color: BLUE };
    acts.push(ringB);
    pause(260);
    y += 1.7 * F;
    xx = placeString('=25', padL + 30, y, s, F, acts);
    xx = placeString('-', xx, y, s, F, acts, BLUE);
    xx = placeString('10', xx, y, s, F, acts);
    placeString('=15', xx, y, s, F, acts);
    acts.push({ kind: 'fade', ref: ringB });
    stepEnd();
    y += 1.7 * F;
    xe = placeString('Svar: 15', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: multiplikation/division av negativa tal
   * (ma1c-1.1 ex 4): a) 4·(−3), b) (−5)·(−9), c) 35/(−7), d) (−42)/(−7).
   * Divisionerna skrivs som bråk med vågrätt streck (se REGEL). */
  function layoutNegmult(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }
    var adv = 1.7 * F;

    /* ---- a) 4·(−3) ---- */
    var bA = bubble(120, 40, 250, [
      [['a) Olika tecken ger ett']],
      [['negativt svar.']]
    ]);
    tanke(bA);
    var y = 96;
    placeString('a) 4·(−3)=−12', padL, y, s, F, acts);
    stepEnd();
    y += adv;
    var xe = placeString('Svar: −12', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- b) (−5)·(−9) ---- */
    var bB = bubble(120, bubbleTop(y), 264, [
      [['b) Minus gånger minus ger']],
      [['plus. Lika tecken ger ett']],
      [['positivt svar!']]
    ]);
    tanke(bB);
    y += 2.4 * F;
    placeString('b) (−5)·(−9)=45', padL, y, s, F, acts);
    stepEnd();
    y += adv;
    xe = placeString('Svar: 45', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- c) 35/(−7) som bråk ---- */
    var bC = bubble(120, bubbleTop(y), 256, [
      [['c) Samma teckenregler']],
      [['gäller vid division: olika']],
      [['tecken ger minus.']]
    ]);
    tanke(bC);
    y += 2.4 * F + 0.55 * F;
    var xx = placeString('c) ', padL, y, s, F, acts);
    xx = fracH('35', '−7', xx, y);
    placeString('=−5', xx, y, s, F, acts);
    stepEnd();
    y += adv + 0.65 * F;
    xe = placeString('Svar: −5', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- d) (−42)/(−7) som bråk ---- */
    var bD = bubble(120, bubbleTop(y), 256, [
      [['d) Lika tecken ger plus,']],
      [['även vid division.']]
    ]);
    tanke(bD);
    y += 2.4 * F + 0.55 * F;
    xx = placeString('d) ', padL, y, s, F, acts);
    xx = fracH('−42', '−7', xx, y);
    placeString('=6', xx, y, s, F, acts);
    stepEnd();
    y += adv + 0.65 * F;
    xe = placeString('Svar: 6', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 480, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: termometern (ma1c-1.1 ex 5) ----------------
   * "Beräkna (−5) − 3." Vanligaste felet: eleven läser det som minus
   * gånger minus och svarar 8. Termometern ritas som grundscen (grafit);
   * startnivån, sänkningen och slutnivån är ANTECKNINGAR av värden →
   * blåpennan (se REGEL i filhuvudet). */
  function layoutTermometer(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* termometerns geometri: grader d → y-nivå */
    var tubeL = 104, tubeR = 124, tubeC = (tubeL + tubeR) / 2;
    function lvl(d) { return 78 + (2 - d) * 15; }

    /* ---- steg 1: rita termometern (grundscen i grafit) ----
     * Bubblan ligger under mobilzonen y<150 (se REGEL i filhuvudet) —
     * arket är ännu tomt, så den kan lika gärna ligga lägre. */
    var b1 = bubble(240, 180, 264, [
      [['Termometern visar −5 grader']],
      [['och temperaturen sjunker']],
      [['3 grader.']]
    ]);
    tanke(b1);
    line([tubeL, lvl(2.6)], [tubeL, lvl(-9.6)]);       /* röret */
    line([tubeR, lvl(2.6)], [tubeR, lvl(-9.6)]);
    pause(120);
    /* kulan längst ned: cirkel med överlapp */
    var bx = tubeC, by = lvl(-9.6) + 15, br = 16;
    var kp = [];
    for (var i = 0; i <= 20; i++) {
      var a = -1.2 + (i / 20) * Math.PI * 2.15;
      kp.push([bx + Math.cos(a) * (br + rnd(-1.2, 1.2)),
               by + Math.sin(a) * (br + rnd(-1.2, 1.2))]);
    }
    acts.push({ kind: 'stroke', pts: kp });
    pause(150);
    for (var d = 2; d >= -9; d--) {                    /* gradstreck */
      line([tubeR, lvl(d)], [tubeR + (d % 5 === 0 ? 12 : 7), lvl(d)]);
    }
    placeString('0', tubeR + 18, lvl(0) + 6, s * 0.5, F * 0.5, acts);
    stepEnd();

    /* ---- steg 2: blå anteckningar — start, sänkning, slut ---- */
    var b2 = bubble(280, 210, 258, [
      [['Jag startar på −5 och går']],
      [['3 steg nedåt på skalan.']]
    ]);
    tanke(b2);
    line([tubeL - 8, lvl(-5)], [tubeR + 8, lvl(-5)], BLUE);   /* startnivån */
    placeString('−5', tubeR + 18, lvl(-5) + 6, s * 0.55, F * 0.55, acts, BLUE);
    pause(200);
    var ax = tubeR + 62;                               /* pil 3 steg nedåt */
    line([ax, lvl(-5)], [ax, lvl(-8)], BLUE);
    arrowHead(ax, lvl(-8), ax, lvl(-5), 9, BLUE);
    placeString('−3', ax + 10, (lvl(-5) + lvl(-8)) / 2 + 6,
                s * 0.55, F * 0.55, acts, BLUE);
    pause(200);
    line([tubeL - 8, lvl(-8)], [tubeR + 8, lvl(-8)], BLUE);   /* slutnivån */
    placeString('−8', tubeR + 18, lvl(-8) + 6, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- steg 3: varning + uträkning ---- */
    var b3 = bubble(280, bubbleTop(lvl(-9.6)), 272, [
      [['Se upp! Svaret är inte 8.']],
      [['Tecknen står inte ihop, så']],
      [['det är en vanlig subtraktion.']]
    ]);
    tanke(b3);
    var y = 388;
    placeString('(−5)-3=−8', padL, y, s, F, acts);
    stepEnd();
    y += 1.7 * F;
    var xe = placeString('Svar: −8', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 570, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: förkorta ett bråk (ma1c-1.2 ex 1) ----------
   * "Förkorta 6/15 med 3." Bråket skrivs först som det står, sedan dras
   * bråkstrecket ut och divisionen med 3 läggs till i täljare och
   * nämnare med blåpennan — se REGEL (FÖRKORTNING SKRIVS I TVÅ DRAG).
   * Slutformen är teorigenomgångens egen uppställning, 6/3 över 15/3. */
  function layoutForkorta(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL;

    /* ---- steg 1: dividera täljare och nämnare med 3 ---- */
    var b1 = T.bubble(120, 40, 262, [
      [['Att förkorta med 3 betyder']],
      [['att täljare och nämnare']],
      [['divideras med 3.']]
    ]);
    T.tanke(b1);
    var y = 104;
    var xx = T.fracH('6', '15', padL, y);
    xx = T.str('=', xx, y);
    xx = T.fracReduce('6', '15', '/3', xx, y);
    T.stepEnd();

    /* ---- steg 2: resultatet ---- */
    var b2 = T.bubble(120, T.bubbleTop(y + 1.04 * F), 256, [
      [['Bråkets värde ändras inte,']],
      [['bara hur det skrivs.']]
    ]);
    T.tanke(b2);
    xx = T.str('=', xx, y);
    xx = T.fracH('2', '5', xx, y);
    T.stepEnd();

    /* ---- svar ---- */
    y += 1.7 * F + 1.1 * F;
    var xe = T.str('Svar: ', padL, y);
    xe = T.fracH('2', '5', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 470, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: förläng ett bråk (ma1c-1.2 ex 2) ----------
   * "Förläng 2/3 så att nämnaren blir 12." Multiplikationen med 4 i
   * täljare och nämnare skrivs med blåpennan. */
  function layoutForlanga(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function fracSeg(numSegs, denSegs, x0, yb) {
      function segW(segs) {
        var w = 0;
        segs.forEach(function (sg) { w += stringAdvance(sg[0], s, F); });
        return w;
      }
      var nw = segW(numSegs), dw = segW(denSegs);
      var w = Math.max(nw, dw) + 0.3 * F;
      var ybar = yb - 0.34 * F;
      var x = x0 + (w - nw) / 2;
      numSegs.forEach(function (sg) {
        x = placeString(sg[0], x, ybar - 0.14 * F, s, F, acts, sg[1] || null);
      });
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      x = x0 + (w - dw) / 2;
      denSegs.forEach(function (sg) {
        x = placeString(sg[0], x, ybar + 1.04 * F, s, F, acts, sg[1] || null);
      });
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* ---- steg 1: hur mycket ska nämnaren växa? ---- */
    var b1 = bubble(120, 40, 254, [
      [['Vad ska 3 multipliceras']],
      [['med för att bli 12?']],
      [['Jo, med 4!']]
    ]);
    tanke(b1);
    var y = 104;
    var xx = fracH('2', '3', padL, y);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracSeg([['2'], ['·4', BLUE]], [['3'], ['·4', BLUE]], xx, y);
    stepEnd();

    /* ---- steg 2: resultatet ---- */
    var b2 = bubble(120, bubbleTop(y + 1.04 * F), 268, [
      [['Täljare och nämnare måste']],
      [['multipliceras med samma tal,']],
      [['annars ändras värdet.']]
    ]);
    tanke(b2);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracH('8', '12', xx, y);
    stepEnd();

    /* ---- svar ---- */
    y += 1.7 * F + 1.1 * F;
    var xe = placeString('Svar: ', padL, y, s, F, acts);
    xe = fracH('8', '12', xe, y);
    underline(xe, y + 0.95 * F);
    stepEnd();

    return { acts: acts, contentW: 500, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: jämföra bråk (ma1c-1.2 ex 3) ----------
   * "Vilket bråk är störst: 4/9 eller 3/7?" Båda bråken förlängs till
   * samma nämnare 63 (förlängningsfaktorerna med blåpennan), täljarna
   * jämförs och slutsatsen skrivs med olikhetstecken. */
  function layoutJamfora(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function fracSeg(numSegs, denSegs, x0, yb) {
      function segW(segs) {
        var w = 0;
        segs.forEach(function (sg) { w += stringAdvance(sg[0], s, F); });
        return w;
      }
      var nw = segW(numSegs), dw = segW(denSegs);
      var w = Math.max(nw, dw) + 0.3 * F;
      var ybar = yb - 0.34 * F;
      var x = x0 + (w - nw) / 2;
      numSegs.forEach(function (sg) {
        x = placeString(sg[0], x, ybar - 0.14 * F, s, F, acts, sg[1] || null);
      });
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      x = x0 + (w - dw) / 2;
      denSegs.forEach(function (sg) {
        x = placeString(sg[0], x, ybar + 1.04 * F, s, F, acts, sg[1] || null);
      });
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }
    var adv = 1.7 * F;

    /* ---- steg 1: förläng första bråket ---- */
    var b1 = bubble(120, 40, 280, [
      [['Olika nämnare! Jag förlänger']],
      [['varje bråk med det andra']],
      [['bråkets nämnare.']]
    ]);
    tanke(b1);
    var y = 104;
    var xx = fracH('4', '9', padL, y);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracSeg([['4'], ['·7', BLUE]], [['9'], ['·7', BLUE]], xx, y);
    xx = placeString('=', xx, y, s, F, acts);
    fracH('28', '63', xx, y);
    stepEnd();

    /* ---- steg 2: förläng andra bråket ---- */
    y += adv + 1.6 * F;
    xx = fracH('3', '7', padL, y);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracSeg([['3'], ['·9', BLUE]], [['7'], ['·9', BLUE]], xx, y);
    xx = placeString('=', xx, y, s, F, acts);
    fracH('27', '63', xx, y);
    stepEnd();

    /* ---- steg 3: jämför täljarna ---- */
    var b2 = bubble(120, bubbleTop(y + 1.04 * F), 272, [
      [['Samma nämnare! Nu jämför']],
      [['jag täljarna: 28 är större']],
      [['än 27.']]
    ]);
    tanke(b2);
    y += adv + 1.6 * F;
    xx = fracH('28', '63', padL, y);
    xx = placeString('>', xx, y, s, F, acts);
    fracH('27', '63', xx, y);
    stepEnd();

    /* ---- svar ---- */
    var b3 = bubble(120, bubbleTop(y + 1.04 * F), 262, [
      [['Alltså är fyra niondelar']],
      [['det största bråket.']]
    ]);
    tanke(b3);
    y += adv + 1.1 * F;
    var xe = placeString('Svar: ', padL, y, s, F, acts);
    xe = fracH('4', '9', xe, y);
    underline(xe, y + 0.95 * F);
    stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ================ MATTESCENER: Ma 1c 1.3–1.5 ================
   * Pennlösningar till exempeluppgifterna i ma1c-1.3 (Addition och
   * subtraktion av bråk), ma1c-1.4 (Multiplikation och division av bråk)
   * och ma1c-1.5 (Tal i decimalform). Samma regler som mattescenerna
   * ovan: räkningen skrivs om steg för steg i kollegieblock-stil, det man
   * GÖR med uttrycket (förlänger, förkortar, inverterar) skrivs med
   * blåpennan, division ritas ALLTID med vågrätt bråkstreck (aldrig
   * snedstreck — se REGEL i filhuvudet) och svaret ramas in.
   *
   * De elva scenerna nedan delar sina byggstenar via mathTools(F) i
   * stället för att upprepa samma sextio rader helper-kod elva gånger.
   * Innehållet i verktygslådan är detsamma som scenerna ovan har var för
   * sig — plus bigFrac() (bråk i bråk) och strike() (förkortning av en
   * gemensam faktor i täljare och nämnare). */
  function mathTools(F) {
    var s = F / 100, acts = [], padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    /* Bubblan läggs UNDER senast skrivna rad. `dyn` = hur långt ned den
     * radens bläck når, mätt i F: 0,28 för en vanlig rad, ~1,05 för en rad
     * med bråk och ~1,4 för en inramad svarsrad med bråk. Molnbulorna
     * sticker ut ~25 px ovanför rektangeln; de 33 px som läggs på täcker
     * det (se REGEL: en bubbla får aldrig ligga över en skriven rad). */
    function bubbleTop(prevBase, dyn) {
      return prevBase + (dyn == null ? 0.28 : dyn) * F + 33;
    }
    /* skriv en sträng; sc skalar skriften (1 = huvudrad, 0,62 = etikett) */
    function str(t, x, yb, col, sc) {
      sc = sc == null ? 1 : sc;
      return placeString(t, x, yb, s * sc, F * sc, acts, col || null);
    }
    function adv(t, sc) {
      sc = sc == null ? 1 : sc;
      return stringAdvance(t, s * sc, F * sc);
    }
    /* gångertecken mellan två bråk: '·' är ingen OPS-glyf och får därför
     * ingen automatisk luft — utan den klistrar bråkstrecken ihop sig */
    function mul(x, yb) { return str('·', x + 0.10 * F, yb) + 0.10 * F; }
    function fracW(numS, denS) {
      return Math.max(adv(numS), adv(denS)) + 0.3 * F;
    }
    /* bråk med rakt divisionsstreck; skrivordning täljare → streck →
     * nämnare, precis som för hand. col färgar hela bråket. */
    function fracH(numS, denS, x0, yb, col) {
      var ybar = yb - 0.34 * F;
      var nw = adv(numS), dw = adv(denS);
      var w = Math.max(nw, dw) + 0.3 * F;
      str(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, col);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: col || null });
      pause(130);
      str(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, col);
      return x0 + w + 1.5;
    }
    /* bråk där täljare/nämnare byggs av segment [text, färg] — så att
     * "det man gör" (·4, /3 …) kan skrivas med blåpennan */
    function segW(segs) {
      var w = 0;
      segs.forEach(function (sg) { w += adv(sg[0]); });
      return w;
    }
    function fracSeg(numSegs, denSegs, x0, yb) {
      var nw = segW(numSegs), dw = segW(denSegs);
      var w = Math.max(nw, dw) + 0.3 * F;
      var ybar = yb - 0.34 * F;
      var x = x0 + (w - nw) / 2;
      numSegs.forEach(function (sg) {
        x = str(sg[0], x, ybar - 0.14 * F, sg[1] || null);
      });
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      x = x0 + (w - dw) / 2;
      denSegs.forEach(function (sg) {
        x = str(sg[0], x, ybar + 1.04 * F, sg[1] || null);
      });
      return x0 + w + 1.5;
    }
    /* FÖRKORTNING I TVÅ DRAG — se REGEL i filhuvudet. Bråket skrivs
     * först som det står, sedan dras bråkstrecket ut och divisionen
     * (divS, t.ex. '/5') läggs till i täljare och nämnare med blåpennan.
     * Täljare och nämnare står kvar där de hamnade i det ursprungliga,
     * smalare bråket — precis som när man klämmer in divisionen för hand. */
    function fracReduce(numS, denS, divS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = adv(numS), dw = adv(denS);
      var w0 = Math.max(nw, dw) + 0.3 * F;
      var yNum = ybar - 0.14 * F, yDen = ybar + 1.04 * F;
      var xNum = x0 + (w0 - nw) / 2, xDen = x0 + (w0 - dw) / 2;
      /* 1. bråket som det står */
      str(numS, xNum, yNum);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w0, ybar]]) });
      pause(130);
      str(denS, xDen, yDen);
      pause(340);
      /* 2. dra ut bråkstrecket; draget börjar strax innanför det gamla
       *    slutet så att skarven inte syns som ett glapp */
      var ew = adv(divS);
      var w1 = Math.max(xNum + nw + ew, xDen + dw + ew) - x0 + 0.15 * F;
      acts.push({ kind: 'stroke',
        pts: humanize([[x0 + w0 - 0.12 * F, ybar], [x0 + w1, ybar]]) });
      pause(320);
      /* 3–4. divisionen i täljaren, sedan i nämnaren */
      str(divS, xNum + nw, yNum, BLUE);
      pause(300);
      str(divS, xDen + dw, yDen, BLUE);
      return x0 + w1 + 1.5;
    }
    /* BRÅK I BRÅK — ett långt huvudstreck med ett litet bråk (eller ett
     * ensamt tal) över och under. Delarna anges som ['3','4'] respektive
     * '5'. Delarnas mittlinjer läggs 1,18·F från huvudstrecket, precis
     * utanför det lilla bråkets egen halvhöjd (~1,05·F) — annars nuddar
     * en nämnare huvudstrecket. Hela uttrycket når 2,57·F ovanför och
     * 1,89·F nedanför raden, så ge en bigFrac-rad extra radavstånd. */
    function bigFrac(num, den, x0, yb, opt) {
      opt = opt || {};
      function partW(p) { return Array.isArray(p) ? fracW(p[0], p[1]) : adv(p); }
      var w = Math.max(partW(num), partW(den)) + 0.62 * F;
      var ybar = yb - 0.34 * F;
      function part(p, mid, col) {
        var px = x0 + (w - partW(p)) / 2;
        if (Array.isArray(p)) fracH(p[0], p[1], px, mid + 0.34 * F, col);
        else str(p, px, mid + 0.45 * F, col);
      }
      part(num, ybar - 1.18 * F, opt.numCol);
      pause(150);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(150);
      part(den, ybar + 1.18 * F, opt.denCol);
      return x0 + w + 1.5;
    }
    /* förkortning: ett snett blått streck genom en faktor som finns i
     * både täljare och nämnare, som när man stryker för hand */
    function strike(x0, x1, yb, down, up) {
      line([x0 - 0.10 * F, yb + (down == null ? 0.30 : down) * F],
           [x1 + 0.10 * F, yb - (up == null ? 0.72 : up) * F], BLUE);
    }
    /* blå inringning av ett textparti på en rad; returnerar strecket så
     * att det kan fejdas ut med {kind:'fade', ref: …} */
    function ring(x0, x1, yb, opt) {
      var st = { kind: 'stroke', pts: ringBox(x0, x1, yb, F, opt), color: BLUE };
      acts.push(st);
      return st;
    }
    function fade(st) { acts.push({ kind: 'fade', ref: st }); }

    return { acts: acts, s: s, padL: padL, pause: pause, line: line,
             bubble: bubble, stepEnd: stepEnd, tanke: tanke,
             underline: underline, bubbleTop: bubbleTop, str: str, adv: adv,
             mul: mul, fracW: fracW, fracH: fracH, fracSeg: fracSeg,
             fracReduce: fracReduce, bigFrac: bigFrac, strike: strike, ring: ring, fade: fade };
  }

  /* ---------------- scen: samma nämnare (ma1c-1.3 ex 1) ----------------
   * a) 1/13 + 2/13 och b) 19/6 − 5/6. Nämnaren är redan gemensam, så
   * täljarna räknas ihop och nämnaren står kvar; i b) förkortas svaret
   * med 2 (divisionen skrivs med blåpennan i båda leden av bråkstrecket). */
  function layoutSamnamnare(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- a) 1/13 + 2/13 ---- */
    var bA = T.bubble(120, 40, 262, [
      [['a) Nämnarna är redan lika!']],
      [['Då adderar jag täljarna och']],
      [['behåller nämnaren.']]
    ]);
    T.tanke(bA);
    y = 150;
    xx = T.str('a) ', padL, y);
    xx = T.fracH('1', '13', xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('2', '13', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('1+2', '13', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('3', '13', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('3', '13', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) 19/6 − 5/6 ---- */
    var bB = T.bubble(120, T.bubbleTop(y, 1.4), 266, [
      [['b) Samma sak vid subtraktion:']],
      [['täljarna dras ifrån varandra,']],
      [['nämnaren står kvar.']]
    ]);
    T.tanke(bB);
    y += 3.8 * F;
    xx = T.str('b) ', padL, y);
    xx = T.fracH('19', '6', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('5', '6', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('19-5', '6', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('14', '6', xx, y);
    T.stepEnd();

    var bB2 = T.bubble(120, T.bubbleTop(y, 1.05), 258, [
      [['14 och 6 är båda jämna, så']],
      [['bråket går att förkorta med 2.']]
    ]);
    T.tanke(bB2);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('14', '6', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('7', '3', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('7', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: olika nämnare (ma1c-1.3 ex 2) ----------------
   * a) 3/5 − 7/20 med metod 1 (förläng det minsta bråket upp till den
   * största nämnaren) och b) 2/5 + 1/3 med metod 2 (förläng varje bråk
   * med det andra bråkets nämnare). Förlängningsfaktorerna skrivs med
   * blåpennan. */
  function layoutOlikanamnare(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- a) metod 1 ---- */
    var bA = T.bubble(120, 40, 268, [
      [['a) Olika nämnare! 5 blir 20']],
      [['om jag förlänger med 4,']],
      [['eftersom 5·4=20.']]
    ]);
    T.tanke(bA);
    y = 150;
    xx = T.str('a) ', padL, y);
    xx = T.fracH('3', '5', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('7', '20', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracSeg([['3'], ['·4', BLUE]], [['5'], ['·4', BLUE]], xx, y);
    xx = T.str('-', xx, y);
    T.fracH('7', '20', xx, y);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('12', '20', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('7', '20', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('12-7', '20', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('5', '20', xx, y);
    T.stepEnd();

    var bA2 = T.bubble(120, T.bubbleTop(y, 1.05), 262, [
      [['5 går i både 5 och 20, så']],
      [['jag förkortar med 5.']]
    ]);
    T.tanke(bA2);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('5', '20', '/5', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '4', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('1', '4', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) metod 2 ---- */
    var bB = T.bubble(120, T.bubbleTop(y, 1.4), 272, [
      [['b) 3 kan inte multipliceras']],
      [['med ett heltal och bli 5.']],
      [['Då förlänger jag varje bråk']],
      [['med det andra bråkets nämnare.']]
    ]);
    T.tanke(bB);
    y += 4.1 * F;
    xx = T.str('b) ', padL, y);
    xx = T.fracH('2', '5', xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('1', '3', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracSeg([['2'], ['·3', BLUE]], [['5'], ['·3', BLUE]], xx, y);
    xx = T.str('+', xx, y);
    T.fracSeg([['1'], ['·5', BLUE]], [['3'], ['·5', BLUE]], xx, y);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('6', '15', xx, y);
    xx = T.str('+', xx, y);
    xx = T.fracH('5', '15', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('6+5', '15', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('11', '15', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('11', '15', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: minsta gemensamma nämnaren (ma1c-1.3 ex 3) ---
   * Multiplerna till 10 och 6 skrivs upp i varsin kolumn, den första
   * multipel som dyker upp i BÅDA ringas in med blåpennan (MGN = 30) och
   * sedan räknas 7/10 − 1/6 ut med 30 som gemensam nämnare. Bubblan om
   * kolumnerna läggs UNDER dem, aldrig intryckt bredvid (se REGEL). */
  function layoutMgn(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;
    var M10 = ['10', '20', '30', '40', '50', '60', '70', '80'];
    var M6 = ['6', '12', '18', '24', '30', '36', '42', '48'];

    /* ---- steg 1: två kolumner med multiplar ---- */
    var b1 = T.bubble(120, 40, 274, [
      [['Jag skriver upp multiplarna']],
      [['till 10 och till 6 i varsin']],
      [['kolumn och letar efter den']],
      [['första som finns i båda.']]
    ]);
    T.tanke(b1);
    var cy0 = 200, rowH = 31, c1 = 80, c2 = 380;
    T.str('Multiplar av 10', c1, cy0 - 36, null, 0.62);
    T.pause(160);
    T.str('Multiplar av 6', c2, cy0 - 36, null, 0.62);
    T.pause(200);
    var box10 = null, box6 = null;
    M10.forEach(function (m, i) {
      var x1 = T.str(m, c1, cy0 + i * rowH, null, 0.62);
      if (m === '30') box10 = [c1, x1, cy0 + i * rowH];
      T.pause(90);
    });
    T.stepEnd();
    M6.forEach(function (m, i) {
      var x1 = T.str(m, c2, cy0 + i * rowH, null, 0.62);
      if (m === '30') box6 = [c2, x1, cy0 + i * rowH];
      T.pause(90);
    });
    T.stepEnd();

    /* ---- steg 2: ringa in 30 i båda kolumnerna ---- */
    T.ring(box10[0], box10[1], box10[2],
           { ry: 0.48 * F, cy: box10[2] - 0.27 * F });
    T.pause(280);
    T.ring(box6[0], box6[1], box6[2],
           { ry: 0.48 * F, cy: box6[2] - 0.27 * F });
    T.stepEnd();

    y = cy0 + 7 * rowH;                    /* sista raden i kolumnerna */
    var b2 = T.bubble(120, T.bubbleTop(y), 262, [
      [['30 är den första multipeln']],
      [['som finns i båda kolumnerna.']]
    ]);
    T.tanke(b2);
    y += 2.6 * F;
    T.str('MGN=30', padL, y);
    T.stepEnd();

    /* ---- steg 3: förläng båda bråken till nämnaren 30 ---- */
    var b3 = T.bubble(120, T.bubbleTop(y), 274, [
      [['10·3=30 och 6·5=30, så jag']],
      [['förlänger med 3 respektive 5.']]
    ]);
    T.tanke(b3);
    y += 3.4 * F;
    xx = T.fracH('7', '10', padL, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('1', '6', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracSeg([['7'], ['·3', BLUE]], [['10'], ['·3', BLUE]], xx, y);
    xx = T.str('-', xx, y);
    T.fracSeg([['1'], ['·5', BLUE]], [['6'], ['·5', BLUE]], xx, y);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('21', '30', xx, y);
    xx = T.str('-', xx, y);
    xx = T.fracH('5', '30', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('21-5', '30', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('16', '30', xx, y);
    T.stepEnd();

    var b4 = T.bubble(120, T.bubbleTop(y, 1.05), 254, [
      [['16 och 30 är jämna —']],
      [['förkorta med 2!']]
    ]);
    T.tanke(b4);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('16', '30', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('8', '15', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('8', '15', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 620, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: blandad form → bråkform (ma1c-1.3 ex 4) ------
   * a) 1 4/5 och b) 3 1/7. Talet framför bråket multipliceras med
   * nämnaren och täljaren adderas — den uträkningen är det man GÖR med
   * talet, så täljaren skrivs med blåpennan. */
  function layoutBrakform(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- a) 1 4/5 ---- */
    var bA = T.bubble(120, 40, 276, [
      [['a) Talet framför bråket (1)']],
      [['gånger nämnaren (5), plus']],
      [['täljaren (4). Allt delat']],
      [['med nämnaren.']]
    ]);
    T.tanke(bA);
    y = 175;
    xx = T.str('a) 1', padL, y);
    xx = T.fracH('4', '5', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracSeg([['1·5+4', BLUE]], [['5']], xx, y);
    xx = T.str('=', xx, y);
    T.fracH('9', '5', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('9', '5', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) 3 1/7 ---- */
    var bB = T.bubble(120, T.bubbleTop(y, 1.4), 264, [
      [['b) Precis som i a-uppgiften:']],
      [['3·7 och sedan plus 1.']]
    ]);
    T.tanke(bB);
    y += 3.8 * F;
    xx = T.str('b) 3', padL, y);
    xx = T.fracH('1', '7', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracSeg([['3·7+1', BLUE]], [['7']], xx, y);
    xx = T.str('=', xx, y);
    T.fracH('22', '7', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('22', '7', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 520, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: multiplikation av bråk (ma1c-1.4 ex 1) -------
   * a) 8/3 · 7/2 (täljare gånger täljare, nämnare gånger nämnare, svaret
   * förkortas med 2) och b) 3 · 4/5 (heltalet gånger TÄLJAREN). */
  function layoutBrakmult(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- a) 8/3 · 7/2 ---- */
    var bA = T.bubble(120, 40, 272, [
      [['a) Täljare gånger']],
      [['täljare, nämnare gånger']],
      [['nämnare.']]
    ]);
    T.tanke(bA);
    y = 150;
    xx = T.str('a) ', padL, y);
    xx = T.fracH('8', '3', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('7', '2', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('8·7', '3·2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('56', '6', xx, y);
    T.stepEnd();

    var bA2 = T.bubble(120, T.bubbleTop(y, 1.05), 258, [
      [['56 och 6 är jämna, så jag']],
      [['förkortar svaret med 2.']]
    ]);
    T.tanke(bA2);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('56', '6', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('28', '3', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('28', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) 3 · 4/5 ---- */
    var bB = T.bubble(120, T.bubbleTop(y, 1.4), 274, [
      [['b) Ett heltal gånger ett bråk:']],
      [['heltalet multipliceras med']],
      [['täljaren. Nämnaren står kvar.']]
    ]);
    T.tanke(bB);
    y += 3.8 * F;
    xx = T.str('b) 3', padL, y);
    xx = T.mul(xx, y);
    xx = T.fracH('4', '5', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('3·4', '5', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('12', '5', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('12', '5', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: faktorisera först (ma1c-1.4 ex 2) ------------
   * 7/36 · 6/21 ger stora tal i nämnaren. Täljare och nämnare
   * faktoriseras (blåpennan skriver om nämnaren) och de faktorer som
   * finns i BÅDA förkortas bort — stryks hela täljaren blir 1 kvar. */
  function layoutFaktorisera(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- steg 1: multiplicera ihop täljare och nämnare ---- */
    var b1 = T.bubble(120, 40, 276, [
      [['Talen blir stora om jag']],
      [['räknar ut nämnaren direkt.']],
      [['Jag faktoriserar i stället!']]
    ]);
    T.tanke(b1);
    y = 160;
    xx = T.fracH('7', '36', padL, y);
    xx = T.mul(xx, y);
    xx = T.fracH('6', '21', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('7·6', '36·21', xx, y);
    T.stepEnd();

    /* ---- steg 2: faktorisera nämnaren ---- */
    var b2 = T.bubble(120, T.bubbleTop(y, 1.05), 268, [
      [['36=6·6 och 21=7·3. Nu syns']],
      [['både 7 och 6 i nämnaren!']]
    ]);
    T.tanke(b2);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    var nx0 = xx;
    T.fracSeg([['7·6']], [['6·6·7·3', BLUE]], xx, y);
    T.stepEnd();

    /* ---- steg 3: förkorta bort 7 och 6 ----
     * strykningarnas x-lägen räknas ur segmentbredderna på exakt samma
     * sätt som fracSeg placerade tecknen */
    var b3 = T.bubble(120, T.bubbleTop(y, 1.05), 278, [
      [['7 och 6 finns i både täljare']],
      [['och nämnare, så de förkortas']],
      [['bort. I täljaren blir 1 kvar.']]
    ]);
    T.tanke(b3);
    var wNum = T.adv('7·6'), wDen = T.adv('6·6·7·3');
    var fw = Math.max(wNum, wDen) + 0.3 * F;
    var ybar = y - 0.34 * F;
    var xNum = nx0 + (fw - wNum) / 2, xDen = nx0 + (fw - wDen) / 2;
    var yNum = ybar - 0.14 * F, yDen = ybar + 1.04 * F;
    T.strike(xNum, xNum + wNum, yNum, 0.08, 0.86);        /* hela täljaren */
    T.pause(260);
    var d7 = xDen + T.adv('6·6·');                        /* 7:an i nämnaren */
    T.strike(d7, d7 + T.adv('7'), yDen);
    T.pause(220);
    var d6 = xDen + T.adv('6·');                          /* andra 6:an */
    T.strike(d6, d6 + T.adv('6'), yDen);
    T.pause(260);
    T.str('1', xNum + wNum / 2 - T.adv('1', 0.62) / 2, yNum - 0.9 * F,
          BLUE, 0.62);
    T.stepEnd();

    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracH('1', '6·3', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '18', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('1', '18', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 540, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: division med bråk (ma1c-1.4 ex 3) ------------
   * a) (3/4)/(2/5), b) (4/5)/(2/7), c) 5/(3/4) och d) (2/3)/12. Samma
   * regel varje gång: byt division mot multiplikation och INVERTERA
   * bråket i nämnaren — det inverterade bråket skrivs med blåpennan.
   * Uppgiften skriver b)–d) med snett divisionstecken; på pappret ritas
   * division alltid med vågrätt streck (se REGEL i filhuvudet), och
   * bubblan i b) kopplar ihop de två skrivsätten. */
  function layoutBrakdiv(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- a) (3/4)/(2/5) ---- */
    var bA = T.bubble(120, 40, 280, [
      [['a) Division med bråk: byt']],
      [['till multiplikation och vänd']],
      [['upp och ned på bråket i']],
      [['nämnaren.']]
    ]);
    T.tanke(bA);
    y = 215;
    xx = T.str('a) ', padL, y);
    xx = T.bigFrac(['3', '4'], ['2', '5'], xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('3', '4', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('5', '2', xx, y, BLUE);
    xx = T.str('=', xx, y);
    T.fracH('15', '8', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('15', '8', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- b) (4/5)/(2/7) ---- */
    var bB = T.bubble(120, T.bubbleTop(y, 1.4), 282, [
      [['b) Snett divisionstecken']],
      [['betyder samma sak. Jag ritar']],
      [['det som ett stort bråkstreck.']]
    ]);
    T.tanke(bB);
    y += 5.4 * F;
    xx = T.str('b) ', padL, y);
    xx = T.bigFrac(['4', '5'], ['2', '7'], xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('4', '5', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('7', '2', xx, y, BLUE);
    xx = T.str('=', xx, y);
    T.fracH('28', '10', xx, y);
    T.stepEnd();

    y += 3.8 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('28', '10', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('14', '5', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('14', '5', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- c) 5/(3/4) ---- */
    var bC = T.bubble(120, T.bubbleTop(y, 1.4), 278, [
      [['c) Ett heltal är också ett']],
      [['bråk. Skriver jag 5 som en']],
      [['femma delat med ett blir']],
      [['regeln precis densamma.']]
    ]);
    T.tanke(bC);
    y += 6.0 * F;
    xx = T.str('c) ', padL, y);
    xx = T.bigFrac('5', ['3', '4'], xx, y);
    xx = T.str('=', xx, y);
    xx = T.bigFrac(['5', '1'], ['3', '4'], xx, y, { numCol: BLUE });
    xx = T.str('=', xx, y);
    xx = T.fracH('5', '1', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('4', '3', xx, y, BLUE);
    xx = T.str('=', xx, y);
    T.fracH('20', '3', xx, y);
    T.stepEnd();

    y += 3.4 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('20', '3', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    /* ---- d) (2/3)/12 ---- */
    var bD = T.bubble(120, T.bubbleTop(y, 1.4), 276, [
      [['d) Nu står heltalet i']],
      [['nämnaren. Inverterat blir']],
      [['12 till ett delat med 12.']]
    ]);
    T.tanke(bD);
    y += 5.4 * F;
    xx = T.str('d) ', padL, y);
    xx = T.bigFrac(['2', '3'], '12', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('2', '3', xx, y);
    xx = T.mul(xx, y);
    xx = T.fracH('1', '12', xx, y, BLUE);
    xx = T.str('=', xx, y);
    T.fracH('2', '36', xx, y);
    T.stepEnd();

    y += 3.8 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('2', '36', '/2', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('1', '18', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: ', padL, y);
    xe = T.fracH('1', '18', xe, y);
    T.underline(xe, y + 0.95 * F);
    T.stepEnd();

    return { acts: acts, contentW: 640, lastBase: y + 1.9 * F, padL: padL };
  }

  /* ---------------- scen: bråkdel av något (ma1c-1.4 ex 4) -------------
   * "Hur mycket är 5/7 av 63 kr?" En bråkdel AV något är en
   * multiplikation; 63 hamnar i täljaren och 7 förkortas bort. */
  function layoutBrakdel(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- steg 1: "av" betyder gånger ---- */
    var b1 = T.bubble(120, 40, 268, [
      [['En bråkdel AV något']],
      [['betyder att jag ska']],
      [['multiplicera med den.']]
    ]);
    T.tanke(b1);
    y = 165;
    xx = T.fracH('5', '7', padL, y);
    xx = T.mul(xx, y);
    xx = T.str('63', xx, y);
    xx = T.str('=', xx, y);
    T.fracH('5·63', '7', xx, y);
    T.stepEnd();

    /* ---- steg 2: förkorta med 7 ---- */
    var b2 = T.bubble(120, T.bubbleTop(y, 1.05), 264, [
      [['63 är delbart med 7, så jag']],
      [['förkortar bråket med 7.']]
    ]);
    T.tanke(b2);
    y += 3.3 * F;
    xx = T.str('=', padL + 30, y);
    xx = T.fracReduce('5·63', '7', '/7', xx, y);
    xx = T.str('=', xx, y);
    xx = T.fracH('5·9', '1', xx, y);
    xx = T.str('=', xx, y);
    T.str('45', xx, y);
    T.stepEnd();

    y += 2.8 * F;
    xe = T.str('Svar: 45 kr', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 580, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: avrundning (ma1c-1.5 ex 1) -------------------
   * 61,4738 avrundat till a) tiondelar, b) ental och c) tiotal.
   * Avrundningssiffran ringas in med blåpennan och siffran EFTER den
   * stryks under — det är den som avgör om avrundningssiffran höjs eller
   * behålls. */
  function layoutAvrundning(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xe;
    var TAL = '61,4738';

    /* skriv "x) 61,4738" och returnera varje siffras x-gränser */
    function talrad(prefix, yb) {
      var x = T.str(prefix, padL, yb), pos = [];
      for (var i = 0; i < TAL.length; i++) {
        var x0 = x;
        x = T.str(TAL[i], x, yb);
        pos.push([x0, x]);
      }
      return pos;
    }
    /* Ringa avrundningssiffran (index i) och stryk under den siffra som
     * avgör avrundningen (index j). Indexen anges var för sig eftersom
     * decimaltecknet ligger emellan i b): entalssiffran är index 1 och
     * nästa SIFFRA index 3, inte 2. Markeringarna står kvar — de är
     * lösningens motivering, inte en övergående gest. */
    function marker(pos, i, j, yb) {
      T.ring(pos[i][0], pos[i][1], yb);
      T.pause(260);
      T.line([pos[j][0] + 2, yb + 0.30 * F],
             [pos[j][1] - 2, yb + 0.30 * F], BLUE);
    }

    /* ---- a) tiondelar ---- */
    var bA = T.bubble(120, 40, 274, [
      [['a) Tiondelssiffran är 4.']],
      [['Siffran efter är 7, och 5']],
      [['eller mer betyder uppåt.']]
    ]);
    T.tanke(bA);
    y = 150;
    var posA = talrad('a) ', y);
    T.stepEnd();
    marker(posA, 3, 4, y);                  /* 4 är tiondelssiffran, sedan 7 */
    T.stepEnd();
    y += 2.0 * F;
    T.str('≈61,5', padL + 30, y);
    T.stepEnd();
    y += 1.8 * F;
    xe = T.str('Svar: 61,5', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- b) ental ---- */
    var bB = T.bubble(120, T.bubbleTop(y, 0.5), 280, [
      [['b) Entalssiffran är 1.']],
      [['Siffran efter är 4, alltså']],
      [['mindre än 5 — ettan behålls.']]
    ]);
    T.tanke(bB);
    y += 3.0 * F;
    var posB = talrad('b) ', y);
    T.stepEnd();
    marker(posB, 1, 3, y);                  /* 1 är entalssiffran, sedan 4 */
    T.stepEnd();
    y += 2.0 * F;
    T.str('≈61', padL + 30, y);
    T.stepEnd();
    var bB2 = T.bubble(120, T.bubbleTop(y), 288, [
      [['Se upp! Jag avrundar alltid']],
      [['från ursprungstalet. Två steg']],
      [['via 61,5 hade gett 62, fel.']]
    ]);
    T.tanke(bB2);
    y += 1.8 * F;
    xe = T.str('Svar: 61', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    /* ---- c) tiotal ---- */
    var bC = T.bubble(120, T.bubbleTop(y, 0.5), 276, [
      [['c) Tiotalssiffran är 6.']],
      [['Siffran efter är 1, så 6:an']],
      [['behålls och entalet blir 0.']]
    ]);
    T.tanke(bC);
    y += 3.0 * F;
    var posC = talrad('c) ', y);
    T.stepEnd();
    marker(posC, 0, 1, y);                  /* 6 är tiotalssiffran, sedan 1 */
    T.stepEnd();
    y += 2.0 * F;
    T.str('≈60', padL + 30, y);
    T.stepEnd();
    y += 1.8 * F;
    xe = T.str('Svar: 60', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 520, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: värdesiffror (ma1c-1.5 ex 2) -----------------
   * Bokens framsida 19,5 cm × 24 cm. Arean räknas ut exakt, faktorernas
   * värdesiffror räknas (talen ringas in med blåpennan medan de räknas)
   * och svaret avrundas till det minsta antalet — två värdesiffror. */
  function layoutVardesiffror(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- steg 1: uppställning + uträkning ---- */
    var b1 = T.bubble(120, 40, 272, [
      [['Framsidan är en']],
      [['rektangel, så arean']],
      [['är bas gånger höjd.']]
    ]);
    T.tanke(b1);
    y = 145;
    T.str('Framsidans area', padL, y, null, 0.62);
    y += 1.5 * F;
    T.str('Area=bas·höjd', padL, y);
    T.stepEnd();

    y += 2.0 * F;
    xx = T.str('=', padL + 30, y);
    var x19 = xx;
    xx = T.str('19,5', xx, y);
    var x19e = xx;
    xx = T.mul(xx, y);
    var x24 = xx;
    xx = T.str('24', xx, y);
    var x24e = xx;
    T.str('=468 cm^2', xx, y);
    T.stepEnd();

    /* ---- steg 2: räkna värdesiffrorna i faktorerna ---- */
    var b2 = T.bubble(120, T.bubbleTop(y), 286, [
      [['Multiplikation! Då styr talet']],
      [['med färre värdesiffror hur']],
      [['svaret ska avrundas.']]
    ]);
    T.tanke(b2);
    var r1 = T.ring(x19, x19e, y);
    T.pause(280);
    var r2 = T.ring(x24, x24e, y);
    T.pause(280);
    y += 1.9 * F;
    T.str('19,5 har 3 värdesiffror', padL + 30, y, null, 0.62);
    T.pause(200);
    y += 1.1 * F;
    T.str('24 har 2 värdesiffror', padL + 30, y, null, 0.62);
    T.fade(r1);
    T.fade(r2);
    T.stepEnd();

    /* ---- steg 3: avrunda till två värdesiffror ---- */
    var b3 = T.bubble(120, T.bubbleTop(y), 280, [
      [['Minst är två värdesiffror,']],
      [['så 468 avrundas till 470.']]
    ]);
    T.tanke(b3);
    y += 2.4 * F;
    T.str('≈470 cm^2', padL + 30, y);
    T.stepEnd();

    y += 2.0 * F;
    xe = T.str('Svar: 470 cm^2', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 560, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: decimaler vid subtraktion (ma1c-1.5 ex 3) ----
   * Brädan 1,73 m minus 1,3 m. Vid addition och subtraktion är det
   * antalet DECIMALER som styr avrundningen, inte värdesiffrorna. */
  function layoutDecimaler(cfg, F) {
    var T = mathTools(F), acts = T.acts, padL = T.padL, y, xx, xe;

    /* ---- steg 1: räkna ut vad som blir kvar ---- */
    var b1 = T.bubble(120, 40, 276, [
      [['Brädbiten som blir kvar']],
      [['är brädan minus det']],
      [['jag sågar av.']]
    ]);
    T.tanke(b1);
    y = 145;
    T.str('Brädbitens längd', padL, y, null, 0.62);
    y += 1.5 * F;
    var x173 = padL;
    xx = T.str('1,73', padL, y);
    var x173e = xx;
    xx = T.str(' m', xx, y);
    xx = T.str('-', xx, y);
    var x13 = xx;
    xx = T.str('1,3', xx, y);
    var x13e = xx;
    xx = T.str(' m', xx, y);
    T.str('=0,43 m', xx, y);
    T.stepEnd();

    /* ---- steg 2: räkna decimalerna i talen ---- */
    var b2 = T.bubble(120, T.bubbleTop(y), 288, [
      [['Subtraktion! Då styr talet']],
      [['med minst antal decimaler.']]
    ]);
    T.tanke(b2);
    var r1 = T.ring(x173, x173e, y);
    T.pause(280);
    var r2 = T.ring(x13, x13e, y);
    T.pause(280);
    y += 1.9 * F;
    T.str('1,73 har 2 decimaler', padL + 30, y, null, 0.62);
    T.pause(200);
    y += 1.1 * F;
    T.str('1,3 har 1 decimal', padL + 30, y, null, 0.62);
    T.fade(r1);
    T.fade(r2);
    T.stepEnd();

    /* ---- steg 3: avrunda till en decimal ---- */
    var b3 = T.bubble(120, T.bubbleTop(y), 276, [
      [['Minst är en decimal, så']],
      [['0,43 avrundas till 0,4.']]
    ]);
    T.tanke(b3);
    y += 2.4 * F;
    T.str('≈0,4 m', padL + 30, y);
    T.stepEnd();

    y += 2.0 * F;
    xe = T.str('Svar: 0,4 m', padL, y);
    T.underline(xe, y);
    T.stepEnd();

    return { acts: acts, contentW: 520, lastBase: y + 0.9 * F, padL: padL };
  }

  /* ---------------- scen: kraftmoment "gungbrädan" ----------------
   * Exempel 3 ur Fysik nivå 2, 1.1 Kraftmoment (momentjämvikt): pappa
   * 80 kg och barn 30 kg på en gungbräda. Handmetoden: rita först det
   * man VET (bräda, vridningspunkt med prick, streckgubbar — man behöver
   * inte vara konstnär!), rita sedan TILLÄGG i figuren (tyngdkrafterna
   * som skalenliga pilar, hävarmarnas måttlinjer) och räkna till sist
   * rad för rad. Varje rad/figurtillägg är ett eget klicksteg, och
   * varje tankebubbla är också ett EGET steg. */
  function layoutGunga(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    /* handritad streckad linje: korta segment med luckor */
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    /* figurbubbla: läggs UNDER figuren (användarbeslut 2026-07-29), i den
     * ännu tomma ytan där räkneraderna sedan hamnar — bubblan är ett eget
     * steg och tonar ut innan något skrivs där. Tidigare pressades den in
     * bredvid figuren i högermarginalen, men då hamnade molnet ändå på
     * brädan och etiketten "30 kg": hellre under figuren än intryckt
     * bredvid den. Samma x som räknebubblorna, så bubblorna vandrar
     * lodrätt nedför arket i stället för att hoppa i sidled. */
    var FIGB_Y = 300;                        /* under figurens måttlinjer */
    function figurBubble(w, lines) {
      return bubble(120, FIGB_Y, w, lines);
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    /* tankebubbla som EGET steg: bubblan visas ensam och steget slutar;
     * vid nästa steg tonar den ut medan skrivandet börjar */
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    /* handritad cirkel (streckgubbe-huvud) */
    function circle(cx, cy, r) {
      var pts = [];
      for (var i = 0; i <= 10; i++) {
        var a = -1.2 + (i / 10) * Math.PI * 2.12;
        pts.push([cx + Math.cos(a) * (r + rnd(-0.8, 0.8)),
                  cy + Math.sin(a) * (r + rnd(-0.8, 0.8))]);
      }
      acts.push({ kind: 'stroke', pts: pts });
    }
    /* stryk bort en faktor: snett streck nedifrån vänster upp åt höger
     * genom tecknet (x0 = teckenets vänsterkant, w = dess bredd, yBas =
     * radens baslinje). Går en bit utanför glyfen i båda ändar, som när
     * man stryker för hand. */
    function strikeThrough(x0, w, yBas) {
      line([x0 - 0.16 * F, yBas + 0.32 * F],
           [x0 + w + 0.16 * F, yBas - 0.68 * F], BLUE);
    }
    /* bråk med rakt streck; col färgar streck + nämnare (division i blått) */
    function fracH(numS, denS, x0, yb, col) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: col || null });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, col || null);
      return x0 + w + 1.5;
    }

    /* --- figurens geometri --- */
    var plankY = 150, plankB = 158;         /* brädans över-/underkant */
    var plankL = 60, plankR = 380;
    var pivX = 220;                          /* vridningspunkten */
    var papX = 150, barnX = 350;             /* pappa resp. barn sitter här */
    var dimY = 258;                          /* måttlinjens nivå */

    /* ---- steg 1: rita det vi vet — bräda, vridningspunkt, personer ---- */
    /* Kort och saklig: kommentera VAD figuren visar, inte att en enkel
     * figur duger (användarbeslut 2026-07-29 — principen stämmer, men
     * den behöver inte skrivas ut). */
    var b1 = figurBubble(250, [
      [['Ritar en figur.']],
      [['Pricken är vridningspunkten.']]
    ]);
    tanke(b1);
    line([plankL, plankY], [plankR, plankY]);            /* brädan */
    line([plankL, plankB], [plankR, plankB]);
    line([plankL, plankY], [plankL, plankB]);
    line([plankR, plankY], [plankR, plankB]);
    pause(120);
    line([pivX, plankB], [pivX - 22, plankB + 44]);      /* stödet (triangel) */
    line([pivX - 22, plankB + 44], [pivX + 22, plankB + 44]);
    line([pivX + 22, plankB + 44], [pivX, plankB]);
    acts.push({ kind: 'stroke', pts: dotPts(pivX, plankY + 4) }); /* vridningspunkt */
    pause(180);
    /* pappa (större streckgubbe, vänster, vänd åt höger) */
    circle(papX, 96, 13);
    line([papX, 109], [papX, 148]);                      /* bål */
    line([papX, 118], [papX + 15, 146]);                 /* arm mot brädan */
    line([papX, 147], [papX + 18, 147]);                 /* lår */
    line([papX + 18, 147], [papX + 19, 168]);            /* underben */
    /* KÄNDA storheter i figuren skrivs med BETECKNING framför värdet
      * (m_P = 80 kg), okända med enbart beteckningen (l_P) — se REGEL i
      * filhuvudet. */
    var w80 = stringAdvance('m_P=80 kg', s * 0.55, F * 0.55);
    placeString('m_P=80 kg', papX - w80 / 2, 74, s * 0.55, F * 0.55, acts, BLUE);
    /* figurens mätvärden ringas in vid insättningen (REGEL: insättning) */
    var box80 = [papX - w80 / 2, papX + w80 / 2, 74, F * 0.55];
    pause(150);
    /* barnet (mindre streckgubbe, höger, vänd åt vänster) */
    circle(barnX, 109, 10);
    line([barnX, 119], [barnX, 148]);
    line([barnX, 126], [barnX - 12, 146]);
    line([barnX, 147], [barnX - 14, 147]);
    line([barnX - 14, 147], [barnX - 15, 163]);
    var w30 = stringAdvance('m_B=30 kg', s * 0.55, F * 0.55);
    placeString('m_B=30 kg', barnX - w30 / 2, 90, s * 0.55, F * 0.55, acts, BLUE);
    var box30 = [barnX - w30 / 2, barnX + w30 / 2, 90, F * 0.55];
    stepEnd();

    /* ---- steg 2: tillägg — tyngdkrafterna som skalenliga pilar ---- */
    var b2 = figurBubble(252, [
      [['Tyngdkrafterna ', 0], ['F', 1], [' = ', 0], ['m', 1], [' · ', 0],
       ['g', 1], [' vrider']],
      [['brädan åt varsitt håll. Pappa är']],
      [['tyngre, så hans pil ritas längre!']]
    ]);
    tanke(b2);
    /* pil ∝ massa: 1 px per kg — pappas pil ritas från tyngdpunkten.
     * Kraftvektorn (skaft + spets) och dess etikett är en vektor/tal-
     * annotering (se REGEL i filhuvudet) → blått; tyngdpunktspricken
     * förblir grafit (del av grundscenen). */
    acts.push({ kind: 'stroke', pts: dotPts(papX, 148) });
    line([papX, 148], [papX, 228 - 10], BLUE);
    arrowHead(papX, 228, papX, 148, 11, BLUE);
    placeString('F_P', papX + 12, 240, s * 0.62, F * 0.62, acts, BLUE);
    pause(200);
    acts.push({ kind: 'stroke', pts: dotPts(barnX, 148) });
    line([barnX, 148], [barnX, 178 - 9], BLUE);
    arrowHead(barnX, 178, barnX, 148, 10, BLUE);
    placeString('F_B', barnX + 10, 190, s * 0.62, F * 0.62, acts, BLUE);
    stepEnd();

    /* ---- steg 3: tillägg — hävarmarna som måttlinjer ---- */
    var b3 = figurBubble(252, [
      [['Hävarmen är avståndet från']],
      [['vridningspunkten till kraftens']],
      [['riktningslinje.']]
    ]);
    tanke(b3);
    dash([pivX, plankB + 46], [pivX, dimY]);             /* projektionslinjer (grafit) */
    dash([papX, 232], [papX, dimY]);
    dash([barnX, 182], [barnX, dimY]);
    pause(150);
    /* måttpilar + hävarmsvärden ÄR vektorer/tal (se REGEL) → blått */
    line([papX + 10, dimY], [pivX - 12, dimY], BLUE);    /* måttlinje vänster */
    arrowHead(papX, dimY, papX + 16, dimY, 9, BLUE);
    arrowHead(pivX - 4, dimY, pivX - 20, dimY, 9, BLUE);
    /* OKÄND storhet: bara beteckningen, inget "= ?" efter */
    var wLp = stringAdvance('l_P', s * 0.62, F * 0.62);
    placeString('l_P', (papX + pivX) / 2 - 9 - wLp / 2, 282, s * 0.62, F * 0.62, acts, BLUE);
    pause(150);
    line([pivX + 12, dimY], [barnX - 10, dimY], BLUE);   /* måttlinje höger */
    arrowHead(pivX + 4, dimY, pivX + 20, dimY, 9, BLUE);
    arrowHead(barnX, dimY, barnX - 16, dimY, 9, BLUE);
    var wLb = stringAdvance('l_B=2,0 m', s * 0.62, F * 0.62);
    var xLb = (pivX + barnX) / 2 + 9 - wLb / 2;
    placeString('l_B=2,0 m', xLb, 282, s * 0.62, F * 0.62, acts, BLUE);
    var boxLb = [xLb, xLb + wLb, 282, F * 0.62];
    stepEnd();

    /* ---- beräkningen, rad för rad ---- */
    var y = 348;
    var adv = 1.7 * F;
    var bx = 340, bw = 290;

    /* Bubblorna ligger under senast skrivna rad (önskemål 2026-07-29) —
     * de är egna steg som tonar ut innan nästa rad skrivs, så de får
     * ligga där raden sedan hamnar. LUFT MOT RADEN OVANFÖR: molnbulorna
     * når BUBBLE_R[1] = 25 px över molnrektangeln, så toppen läggs
     * 0,28·F (radens underlängd) + 33 px under föregående baslinje —
     * annars ligger bubblan tajt mot texten (påpekat 2026-07-29).
     * bubbleTop() räknar ut det; skriv aldrig egna offsets på fri hand. */
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    var b4 = bubble(120, bubbleTop(287), bw, [
      [['Momentjämvikt: momentet moturs']],
      [['är lika stort som momentet medurs.']]
    ]);
    tanke(b4);
    /* INLEDANDE MOTIVERING (se REGEL i filhuvudet): motiveringen skrivs i
     * grafit och formeln DIREKT UNDER — allt i SAMMA klicksteg. 1,8·F ned
     * till formelraden så att momentpilarna går fria från j/g-staplarna. */
    placeString('Momentjämvikt', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.8 * F;
    /* TONANDE ORD (godkänt förslag 2026-07-30): "moturs"/"medurs" tonar
     * in under respektive momentpil när dess led skrivits, och ut när
     * nästa steg börjar — påminner om vad pilarna betyder. */
    var wM = stringAdvance('M', s, F);
    var noteMot = { note: 1, x: padL + wM / 2, y: y + 0.78 * F,
                    text: 'moturs', fs: 15, wins: [] };
    var xEq = placeString('M↺', padL, y, s, F, acts);
    acts.push({ kind: 'show', obj: noteMot });
    pause(320);
    var xM2 = placeString('=', xEq, y, s, F, acts);
    var noteMed = { note: 1, x: xM2 + wM / 2, y: y + 0.78 * F,
                    text: 'medurs', fs: 15, wins: [] };
    placeString('M↻', xM2, y, s, F, acts);
    acts.push({ kind: 'show', obj: noteMed });
    pause(420);
    stepEnd();
    acts.push({ kind: 'hide', obj: noteMot });
    acts.push({ kind: 'hide', obj: noteMed });

    y += adv;
    var b5 = bubble(120, bubbleTop(y - adv), bw, [
      /* skiljetecken ALDRIG direkt efter en kursiv variabel — kursiva l
        * och g växer ihop med kolon/komma till en obegriplig glyf. Låt
        * formeln avsluta raden i stället. */
      [['Ett moment är kraften gånger']],
      [['hävarmen: ', 0], ['M', 1], [' = ', 0], ['F', 1], [' · ', 0], ['l', 1]]
    ]);
    tanke(b5);
    placeString('F_P·l_P=F_B·l_B', padL, y, s, F, acts);
    stepEnd();

    y += adv;
    var b6 = bubble(120, bubbleTop(y - adv), bw, [
      [['Tyngdkraften byter jag ut mot']],
      [['F', 1], [' = ', 0], ['m', 1], [' · ', 0], ['g', 1],
       [' i båda leden.', 0]]
    ]);
    tanke(b6);
    placeString('m_P·g·l_P=m_B·g·l_B', padL, y, s, F, acts);
    stepEnd();

    /* STRYKA BORT EN GEMENSAM FAKTOR (fysikkonvention, se REGEL i
     * filhuvudet): g finns som faktor i båda leden — i stället för att
     * skriva ut divisionen som bråk stryks g helt enkelt bort i båda led,
     * direkt i den redan skrivna raden. Blåpennan, eftersom det är något
     * som görs på BÅDA sidor om likhetstecknet. */
    var yG = y;                                    /* raden där g står */
    var gx1 = padL + stringAdvance('m_P·', s, F);
    var gx2 = padL + stringAdvance('m_P·g·l_P=m_B·', s, F);
    var gw = stringAdvance('g', s, F) - 1.5;
    /* svansen pekar NEDÅT i den ännu tomma ytan (som de andra rad-
     * bubblorna) — riktad mot raden ovanför skulle tankecirklarna lägga
     * sig ovanpå den skrivna raden (REGEL: bubblor skymmer aldrig något) */
    var b7 = bubble(140, bubbleTop(yG), bw, [
      [['g', 1], [' finns som faktor i båda leden,', 0]],
      [['så den kan divideras bort!']]
    ]);
    tanke(b7);
    strikeThrough(gx1, gw, yG);
    pause(260);
    strikeThrough(gx2, gw, yG);
    stepEnd();

    y += adv + 0.55 * F;
    var xRen = placeString('m_P·l_P=m_B·l_B', padL, y, s, F, acts);
    stepEnd();

    var b8 = bubble(140, bubbleTop(y), bw, [
      [['Dela med pappans massa så att']],
      [['hävarmen blir ensam kvar.']]
    ]);
    tanke(b8);
    /* OMSKRIVNING (se REGEL): ⟺ och fortsätt på samma rad */
    var xx = placeString('⟺l_P=', xRen, y, s, F, acts);
    var xFormel = fracH('m_B·l_B', 'm_P', xx, y);
    /* hela hävarmsformeln — det uttryck värdena sätts in i (REGEL) */
    var boxFormel = [padL, xFormel, y, F, { ry: 1.15 * F, cy: y - 0.32 * F }];
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL i filhuvudet): alla mätvärden
     * skrivs upp i en klammer innan de sätts in — omvandlade till SI-
     * enheter vid behov (här är de redan i kg och m). Inga ringar vid
     * klammerskrivningen (se REGEL MÄTVÄRDESKLAMMER). */
    y += adv + 0.9 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Innan insättningen: skriv upp alla']],
      [['mätvärden i en klammer, omgjorda']],
      [['till SI-enheter när det behövs!']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, ['m_B=30 kg', 'l_B=2,0 m', 'm_P=80 kg'],
                            padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var b9 = bubble(140, bubbleTop(klam.yEnd + 0.32 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(b9);
    /* UNDANTAG från insättningsgesten (användarbeslut 2026-07-29): när
     * värdena hämtas ur MÄTVÄRDESKLAMMERN ringas de INTE in. Klammern är
     * i sig gesten — den samlar värdena direkt ovanför insättningsraden,
     * så ringarna tillför inget och skräpar bara ned raderna. Ringar
     * används alltså när värdena står utspridda (i figuren, i en tidigare
     * rad), inte när de redan står uppradade i en klammer. */
    xx = placeString('l_P=', padL, y, s, F, acts);
    xx = fracH('30·2,0', '80', xx, y);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracH('60', '80', xx, y);
    placeString('=0,75 m', xx, y, s, F, acts);
    stepEnd();

    y += adv + 0.65 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL i filhuvudet): tankebubblan prövar
     * alltid svarets rimlighet INNAN svarsraden skrivs. */
    var b10 = bubble(120, bubbleTop(y - adv), bw, [
      [['Pappa ska sitta närmare än barnet.']],
      [['Rimligt, han är ju tyngre!']]
    ]);
    tanke(b10);
    /* SVARSRAD, fysik: bara mätetal + enhet — ingen beteckning framför
     * (användarbeslut 2026-07-29). "Svar: 0,75 m", inte "Svar: l_P=0,75 m". */
    var xe = placeString('Svar: 0,75 m', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: kraftmoment "skiftnyckeln" ----------------
   * Exempel 1 ur Fysik nivå 2, 1.1 Kraftmoment: en kraft på 34 N verkar
   * vinkelrätt mot en skiftnyckel 0,25 m från muttern. Handmetoden: rita
   * det man vet (skaft, mutter med prick = vridningspunkten), lägg till
   * kraftpilen och hävarmens måttlinje i blått, och räkna sedan rad för
   * rad med mätvärdesklammer före insättningen. */
  function layoutSkiftnyckel(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 278;                       /* under figuren (se gungbrädan) */
    function figurBubble(w, lines) {
      return bubble(120, FIGB_Y, w, lines);
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function circle(cx, cy, r) {
      var pts = [];
      for (var i = 0; i <= 10; i++) {
        var a = -1.2 + (i / 10) * Math.PI * 2.12;
        pts.push([cx + Math.cos(a) * (r + rnd(-0.8, 0.8)),
                  cy + Math.sin(a) * (r + rnd(-0.8, 0.8))]);
      }
      acts.push({ kind: 'stroke', pts: pts });
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri ---
     * FIGURORIENTERING (se REGEL): originalfiguren har nyckeln SNETT med
     * muttern uppe till höger och kraften vinkelrät mot skaftet — samma
     * orientering ritas här (35° lutning), inte en "tillrättalagd"
     * vågrät nyckel. u = enhetsvektor mutter→handtag, n = vinkelrät
     * (kraftens riktning, snett nedåt höger). */
    var ca = Math.cos(35 * Math.PI / 180), sa = Math.sin(35 * Math.PI / 180);
    var ux = -ca, uy = sa;                 /* mutter → handtag (ned-vänster) */
    var nx = sa, ny = ca;                  /* vinkelrät, kraftens riktning */
    var mutX = 356, mutY = 72, mutR = 16;  /* muttern = vridningspunkten */
    function P(fromX, fromY, du, dn) {     /* punkt: bas + du·u + dn·n */
      return [fromX + du * ux + dn * nx, fromY + du * uy + dn * ny];
    }
    var grip = P(mutX, mutY, 226, 0);      /* kraftens angreppspunkt */
    var hEnd = P(mutX, mutY, 258, 0);      /* handtagets ände */
    var junc = P(mutX, mutY, 18, 0);       /* skaftets möte med muttern */

    /* ---- steg 1: rita det vi vet — skaft, mutter, vridningspunkt ---- */
    var b1 = figurBubble(250, [
      [['Ritar en figur. Pricken i muttern']],
      [['är vridningspunkten.']]
    ]);
    tanke(b1);
    line(P(hEnd[0], hEnd[1], 0, -8), P(junc[0], junc[1], 0, -8)); /* skaftet */
    line(P(hEnd[0], hEnd[1], 0, 8), P(junc[0], junc[1], 0, 8));
    line(P(hEnd[0], hEnd[1], 0, -8), P(hEnd[0], hEnd[1], 0, 8));
    pause(120);
    circle(mutX, mutY, mutR);                            /* muttern */
    acts.push({ kind: 'stroke', pts: dotPts(mutX, mutY) }); /* vridningspunkt */
    stepEnd();

    /* ---- steg 2: tillägg — kraften och vridriktningen ---- */
    var b2 = figurBubble(252, [
      [['Kraften drar vinkelrätt mot']],
      [['skaftet — nyckeln vrider moturs.']]
    ]);
    tanke(b2);
    /* kraftpil + värde är vektor/tal-annotering (se REGEL) → blått;
     * pilen utgår från skaftets kant i kraftens riktning (vinkelrätt) */
    var fTip = P(grip[0], grip[1], 0, 72);
    line(P(grip[0], grip[1], 0, 8), P(grip[0], grip[1], 0, 62), BLUE);
    arrowHead(fTip[0], fTip[1], grip[0], grip[1], 10, BLUE);
    var wF = stringAdvance('F=34 N', s * 0.62, F * 0.62);
    placeString('F=34 N', fTip[0] + 14, fTip[1] + 1, s * 0.62, F * 0.62, acts, BLUE);
    var boxF = [fTip[0] + 14, fTip[0] + 14 + wF, fTip[1] + 1, F * 0.62];
    pause(200);
    /* vridriktningspil (moturs) — del av scenen, grafit */
    var arc = [], th;
    for (th = -55; th <= 65; th += 15) {
      var a = th * Math.PI / 180;
      arc.push([mutX + 27 * Math.cos(a), mutY - 27 * Math.sin(a)]);
    }
    acts.push({ kind: 'stroke', pts: arc });
    var tipA = arc[arc.length - 1];
    arrowHead(tipA[0], tipA[1], tipA[0] + 18.1, tipA[1] + 8.5, 9);
    stepEnd();

    /* ---- steg 3: tillägg — hävarmen som måttlinje (parallell med
     * skaftet, förskjuten ut i fri yta ovanför-vänster) ---- */
    var b3 = figurBubble(252, [
      [['Kraften är vinkelrät mot skaftet,']],
      [['så hävarmen är hela avståndet']],
      [['in till vridningspunkten.']]
    ]);
    tanke(b3);
    dash(P(grip[0], grip[1], 0, -12), P(grip[0], grip[1], 0, -30));
    dash(P(mutX, mutY, 0, -20), P(mutX, mutY, 0, -30));  /* projektioner */
    pause(150);
    /* måttpil + hävarmsvärde är vektor/tal (se REGEL) → blått */
    var dimG = P(grip[0], grip[1], 0, -34);   /* ände vid greppet */
    var dimM = P(mutX, mutY, 0, -34);         /* ände vid muttern */
    line(P(dimG[0], dimG[1], -10, 0), P(dimM[0], dimM[1], 12, 0), BLUE);
    arrowHead(dimG[0], dimG[1], P(dimG[0], dimG[1], -16, 0)[0],
              P(dimG[0], dimG[1], -16, 0)[1], 9, BLUE);
    arrowHead(P(dimM[0], dimM[1], 4, 0)[0], P(dimM[0], dimM[1], 4, 0)[1],
              P(dimM[0], dimM[1], 20, 0)[0], P(dimM[0], dimM[1], 20, 0)[1],
              9, BLUE);
    /* etiketten vågrätt i den fria ytan uppe till vänster om måttlinjen */
    var wL = stringAdvance('l=0,25 m', s * 0.62, F * 0.62);
    var xL = 122;
    placeString('l=0,25 m', xL, 96, s * 0.62, F * 0.62, acts, BLUE);
    var boxL = [xL, xL + wL, 96, F * 0.62];
    stepEnd();

    /* ---- beräkningen, rad för rad ---- */
    var y = 340;
    var adv = 1.7 * F;
    var bw = 290;

    var b4 = bubble(120, bubbleTop(230), bw, [
      [['Momentet är kraften gånger']],
      [['hävarmen: ', 0], ['M', 1], [' = ', 0], ['F', 1], [' · ', 0], ['l', 1]]
    ]);
    tanke(b4);
    /* INLEDANDE MOTIVERING (se REGEL): motivering + formel i SAMMA steg */
    placeString('Kraftmoment', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.45 * F;
    placeString('M=F·l', padL, y, s, F, acts);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL): inga ringar vid
     * klammerskrivningen ---- */
    y += adv + 0.9 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Innan insättningen: skriv upp alla']],
      [['mätvärden i en klammer, omgjorda']],
      [['till SI-enheter när det behövs!']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, ['F=34 N', 'l=0,25 m'], padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var b9 = bubble(140, bubbleTop(klam.yEnd + 0.32 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(b9);
    /* värden ur klammern ringas INTE in (se UNDANTAG i filhuvudet) */
    placeString('M=34·0,25=8,5 Nm', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.65 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var b10 = bubble(120, bubbleTop(y - adv), bw, [
      [['En fjärdedel av 34 är ungefär']],
      [['8,5. Och kraften vrider moturs,']],
      [['så momentet är positivt!']]
    ]);
    tanke(b10);
    var xe = placeString('Svar: 8,5 Nm moturs', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: kraftmoment "spettet mot stenen" ----------------
   * Exempel 2 ur Fysik nivå 2, 1.1 Kraftmoment: ett spett på 1,0 m lutar
   * 45° mot marken, en kraft på 800 N verkar lodrätt nedåt i övre änden.
   * Poängen: hävarmen är INTE spettets längd utan det vinkelräta
   * avståndet från vridningspunkten till kraftens riktningslinje —
   * trigonometri (cos 45°) före insättningen. */
  function layoutSpett(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 315;                       /* under figurens måttlinje */
    function figurBubble(w, lines) {
      return bubble(120, FIGB_Y, w, lines);
    }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }
    /* bråk med rakt streck (samma som gungbrädan) */
    function fracH(numS, denS, x0, yb, col) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]),
                  color: col || null });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts, col || null);
      return x0 + w + 1.5;
    }

    /* --- figurens geometri: 45°-lutning, pivot vid stenens fot --- */
    var groundY = 200, pivX = 115, topX = 235, topY = 80;
    var dimY = 248;                          /* måttlinjens nivå */

    /* ---- steg 1: rita det vi vet — mark, sten, spett, vinkel ---- */
    var b1 = figurBubble(252, [
      [['Ritar en figur. Pricken vid']],
      [['stenens fot är vridningspunkten.']]
    ]);
    tanke(b1);
    line([50, groundY], [420, groundY]);                 /* marken */
    pause(120);
    acts.push({ kind: 'stroke',                          /* stenen */
      pts: [[62, groundY], [68, 182], [82, 170], [100, 172],
            [112, 186], [117, groundY]] });
    pause(120);
    line([pivX, groundY], [topX, topY]);                 /* spettet */
    acts.push({ kind: 'stroke', pts: dotPts(pivX, groundY) }); /* vridningspunkt */
    pause(150);
    var arc = [], th;                                    /* 45°-bågen */
    for (th = 0; th <= 45; th += 15) {
      var a = th * Math.PI / 180;
      arc.push([pivX + 30 * Math.cos(a), groundY - 30 * Math.sin(a)]);
    }
    acts.push({ kind: 'stroke', pts: arc });
    /* givna värden i figuren är tal-anteckningar (se REGEL) → blått */
    placeString('45°', 152, 191, s * 0.55, F * 0.55, acts, BLUE);
    pause(150);
    placeString('1,0 m', 118, 112, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- steg 2: tillägg — kraften ---- */
    var b2 = figurBubble(252, [
      [['Kraften 800 N drar lodrätt']],
      [['nedåt i spettets övre ände.']]
    ]);
    tanke(b2);
    line([topX, topY], [topX, 150 - 10], BLUE);
    arrowHead(topX, 150, topX, topY, 10, BLUE);
    var wF = stringAdvance('F=800 N', s * 0.62, F * 0.62);
    placeString('F=800 N', topX + 14, 158, s * 0.62, F * 0.62, acts, BLUE);
    var boxF = [topX + 14, topX + 14 + wF, 158, F * 0.62];
    stepEnd();

    /* ---- steg 3: tillägg — riktningslinjen och hävarmen ---- */
    var b3 = figurBubble(252, [
      [['Hävarmen är inte 1,0 m! Den är']],
      [['avståndet från vridningspunkten']],
      [['till kraftens riktningslinje.']]
    ]);
    tanke(b3);
    dash([topX, 153], [topX, dimY - 4]);                 /* riktningslinjen */
    pause(120);
    line([topX - 9, groundY], [topX - 9, groundY - 9]);  /* rät vinkel-markering */
    line([topX - 9, groundY - 9], [topX, groundY - 9]);
    pause(120);
    dash([pivX, groundY + 5], [pivX, dimY - 4]);         /* projektion från pivoten */
    pause(150);
    line([pivX + 10, dimY], [topX - 12, dimY], BLUE);    /* måttlinjen */
    arrowHead(pivX, dimY, pivX + 16, dimY, 9, BLUE);
    arrowHead(topX - 4, dimY, topX - 20, dimY, 9, BLUE);
    /* OKÄND storhet: bara beteckningen (se REGEL) */
    placeString('l', (pivX + topX) / 2 - 5, 276, s * 0.62, F * 0.62, acts, BLUE);
    stepEnd();

    /* ---- beräkningen, rad för rad ---- */
    var y = 372;
    var adv = 1.7 * F;
    var bw = 290;

    var b4 = bubble(120, bubbleTop(280), bw, [
      [['Momentet är kraften gånger']],
      [['hävarmen: ', 0], ['M', 1], [' = ', 0], ['F', 1], [' · ', 0], ['l', 1]]
    ]);
    tanke(b4);
    placeString('Kraftmoment', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.45 * F;
    placeString('M=F·l', padL, y, s, F, acts);
    stepEnd();

    /* ---- mätvärdesklammern — uträkningen av l görs INUTI klammern ----
     * Strukturregeln (användarönskemål 2026-07-30): Figur → Formel →
     * Klammer (mätvärden i SI, INKLUSIVE deluträkningar som hävarmen) →
     * Insättning → Uträkning → Avrundning → Svar. Deluträkningen skrivs
     * som i textlösningen: cos 45°=l/1,0 ⟺ l=1,0·cos 45°=0,707... m */
    y += adv + 0.9 * F;
    var ssK = 0.8 * s, sFK = 0.8 * F;     /* klammerrader: 0.8 av huvudskala */
    var tick = 0.34 * sFK;
    var yK1 = y, yK2 = y + 2.5 * sFK;     /* rad 1 / rad 2 (med bråk) */
    var yKA = yK1 - 0.95 * sFK, yKB = yK2 + 1.1 * sFK;
    var xT = padL + tick + 0.45 * sFK;

    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Innan insättningen: skriv upp alla']],
      [['mätvärden i en klammer, omgjorda']],
      [['till SI-enheter när det behövs!']]
    ]);
    tanke(bK);
    /* vänsterklammern + rad 1 */
    acts.push({ kind: 'stroke', pts: humanize([[padL + tick, yKA], [padL, yKA]]) });
    acts.push({ kind: 'stroke', pts: humanize([[padL, yKA], [padL, yKB]]) });
    acts.push({ kind: 'stroke', pts: humanize([[padL, yKB], [padL + tick, yKB]]) });
    pause(160);
    var xRow1 = placeString('F=800 N', xT, yK1, ssK, sFK, acts);
    stepEnd();

    /* rad 2: hävarmen ur triangeln — TRIG-UPPSTÄLLNING (se REGEL) */
    var b5 = bubble(140, bubbleTop(yK1), bw, [
      [['Rätvinklig triangel! ', 0], ['l', 1], [' är närliggande', 0]],
      [['katet till 45° och hypotenusan']],
      [['är 1,0 m. Då används cosinus.']]
    ]);
    tanke(b5);
    /* Först ringas 45°-VINKELN in i figuren (godkänt förslag 2026-07-30):
     * det är den vinkeln som "närliggande"/"motstående" relaterar till,
     * och cos av just den vinkeln som nu ska skrivas. */
    var ringVinkel = { kind: 'stroke', pts: ringPts(166, 186, 40, 20),
                       color: BLUE };
    acts.push(ringVinkel);
    pause(420);
    var xx = placeString('cos 45°=', xT, yK2, ssK, sFK, acts);
    var ybar = yK2 - 0.34 * sFK;
    var nw = stringAdvance('l', ssK, sFK), dw = stringAdvance('1,0', ssK, sFK);
    var fw = Math.max(nw, dw) + 0.3 * sFK;
    var noteX = xx + fw + 0.6 * sFK;
    var noteNar = { note: 1, x: noteX, y: ybar - 0.14 * sFK, fs: 14,
                    text: 'närliggande katet', anchor: 'start', wins: [] };
    var noteHyp = { note: 1, x: noteX, y: ybar + 1.04 * sFK, fs: 14,
                    text: 'hypotenusan', anchor: 'start', wins: [] };
    /* täljaren: ordet in → torrsvep längs måttlinjen med l → skriv l */
    acts.push({ kind: 'show', obj: noteNar });
    pause(320);
    acts.push({ kind: 'sweep',
                pts: humanize([[pivX + 8, dimY], [topX - 10, dimY]]) });
    pause(380);
    placeString('l', xx + (fw - nw) / 2, ybar - 0.14 * sFK, ssK, sFK, acts);
    pause(130);
    acts.push({ kind: 'stroke', pts: humanize([[xx, ybar], [xx + fw, ybar]]) });
    pause(130);
    /* nämnaren: ordet in → torrsvep längs spettet (hypotenusan, 1,0 m)
     * → skriv 1,0. Svepet går nedifrån vinkeln upp mot kraften. */
    acts.push({ kind: 'show', obj: noteHyp });
    pause(320);
    acts.push({ kind: 'sweep',
                pts: humanize([[pivX + 4, groundY - 4], [topX, topY + 5]]) });
    pause(380);
    placeString('1,0', xx + (fw - dw) / 2, ybar + 1.04 * sFK, ssK, sFK, acts);
    /* orden tonar ut INNAN lösnings-kedjan skrivs på deras plats */
    pause(300);
    acts.push({ kind: 'hide', obj: noteNar });
    acts.push({ kind: 'hide', obj: noteHyp });
    pause(340);
    /* AVRUNDA ALDRIG i mellanled (se REGEL): "0,707..." med tre punkter
     * och vanligt likhetstecken — ≈ först i sista steget */
    var xRow2 = placeString('⟺l=1,0·cos 45°=0,707... m',
                            xx + fw + 0.15 * sFK, yK2, ssK, sFK, acts);
    /* högerklammern */
    var xKR = Math.max(xRow1, xRow2) + 0.45 * sFK + tick;
    pause(160);
    acts.push({ kind: 'stroke', pts: humanize([[xKR - tick, yKA], [xKR, yKA]]) });
    acts.push({ kind: 'stroke', pts: humanize([[xKR, yKA], [xKR, yKB]]) });
    acts.push({ kind: 'stroke', pts: humanize([[xKR, yKB], [xKR - tick, yKB]]) });
    fadeRings(acts, [ringVinkel]);
    stepEnd();
    y = yK2;

    y += adv + 1.2 * F;
    var b9 = bubble(140, bubbleTop(yK2 + 0.32 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(b9);
    placeString('M=800·0,707...=565,685... Nm', padL, y, s, F, acts);
    stepEnd();

    y += adv;
    var bAvr = bubble(140, bubbleTop(y - adv), bw, [
      [['Först NU avrundar jag! Värdet']],
      [['med minst antal värdesiffror']],
      [['(1,0 m) har två — då får svaret']],
      [['också två: 570 Nm.']]
    ]);
    tanke(bAvr);
    /* fortsättning på raden ovanför — M upprepas INTE, raden börjar med ≈
     * (radbrytning vid ≈ är ok, användarönskemål 2026-07-30) */
    placeString('≈570 Nm=0,57 kNm', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.65 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var b10 = bubble(120, bubbleTop(y - adv), bw, [
      [['Hävarmen är kortare än spettet,']],
      [['så momentet blir mindre än']],
      [['800 Nm. Rimligt!']]
    ]);
    tanke(b10);
    var xe = placeString('Svar: 0,57 kNm', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: "bräda på två bockar" (fy2-1.2 Exempel 1) ----
   * En bräda (20 kg, 6,0 m) ligger på två bockar: P 1,5 m från vänstra
   * änden, Q 2,0 m från högra (P–Q = 2,5 m, tyngdpunkten mitt på).
   * a) kraftfigur, b) kraften i Q med P som vridningspunkt, c) kraften i
   * P med Q som vridningspunkt. Poängen: vridningspunkten VÄLJS så att
   * den okända kraft man inte söker får hävarmen 0. Följer struktur-
   * regeln — tyngdkraftens deluträkning (m·g) görs INUTI mätvärdes-
   * klammern, och i c) ringas F_G-värdet från b):s klammer in ("sedan
   * tidigare"). Figurens orientering följer original-PDF:en (mått
   * ovanför brädan, skalenliga kraftpilar, F_G genom marken); hävarms-
   * måtten läggs i fri yta under marken och FEJDAS UT när vridnings-
   * punkten byts i c) — nya hävarmar ritas för den nya punkten. */
  function layoutBrada(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    /* figur-bubblorna läggs i den FRIA ytan till höger om figuren —
     * under figuren börjar beräkningsraderna, och c):s figurbubbla visas
     * sent när raderna redan är skrivna (bubblor skymmer aldrig något) */
    function figurBubble(lines) { return bubble(455, 96, 240, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }
    /* måttlinje med dubbelpil (utan etikett — de placeras fritt) */
    function dimArrow(x1, x2, yy) {
      line([x1 + 10, yy], [x2 - 10, yy], BLUE);
      arrowHead(x1, yy, x1 + 16, yy, 9, BLUE);
      arrowHead(x2, yy, x2 - 16, yy, 9, BLUE);
    }

    /* --- figurens geometri: 60 px per meter --- */
    var bT = 148, bB = 158;                /* brädans över-/underkant */
    var bL = 70, bR = 430;                 /* ändar (6,0 m) */
    var pX = 160, tpX = 250, qX = 310;     /* P, tyngdpunkten, Q */
    var gY = 228;                          /* marken */
    var dimTop = 68;                       /* måttlinjen ovanför (original) */
    var dimB1 = 262, dimB2 = 286;          /* hävarmsmåtten under marken */

    /* ---- steg 1: rita det vi vet — bräda, bockar, mått ---- */
    var b1 = figurBubble([
      [['Ritar av figuren:']],
      [['brädan på två bockar,']],
      [['stöden P och Q.']]
    ]);
    tanke(b1);
    line([bL, bT], [bR, bT]);              /* brädan */
    line([bL, bB], [bR, bB]);
    line([bL, bT], [bL, bB]);
    line([bR, bT], [bR, bB]);
    pause(120);
    [pX, qX].forEach(function (x) {        /* bockarna (A-form) */
      line([x, bB], [x - 24, gY]);
      line([x, bB], [x + 24, gY]);
      line([x - 15, 196], [x + 15, 196]);
    });
    pause(120);
    line([56, gY], [444, gY]);             /* marken med skraffering */
    for (var hx = 66; hx <= 434; hx += 24) {
      line([hx, gY], [hx - 9, gY + 11]);
    }
    pause(150);
    acts.push({ kind: 'stroke', pts: dotPts(pX, 153) });  /* stödpunkterna */
    acts.push({ kind: 'stroke', pts: dotPts(qX, 153) });
    placeString('P', pX - 22, 140, s * 0.55, F * 0.55, acts);
    placeString('Q', qX - 26, 140, s * 0.55, F * 0.55, acts);
    pause(150);
    /* måtten ovanför som i uppgiftsfiguren — tal-annotering → blått */
    dash([bL, 142], [bL, dimTop + 6]);
    dash([pX, 134], [pX, dimTop + 6]);
    dash([qX, 134], [qX, dimTop + 6]);
    dash([bR, 142], [bR, dimTop + 6]);
    dimArrow(bL, pX, dimTop);
    dimArrow(pX, qX, dimTop);
    dimArrow(qX, bR, dimTop);
    var w15 = stringAdvance('1,5 m', s * 0.55, F * 0.55);
    placeString('1,5 m', (bL + pX) / 2 - w15 / 2, 60, s * 0.55, F * 0.55, acts, BLUE);
    var w25 = stringAdvance('2,5 m', s * 0.55, F * 0.55);
    placeString('2,5 m', (pX + qX) / 2 - w25 / 2, 60, s * 0.55, F * 0.55, acts, BLUE);
    var w20 = stringAdvance('2,0 m', s * 0.55, F * 0.55);
    placeString('2,0 m', (qX + bR) / 2 - w20 / 2, 60, s * 0.55, F * 0.55, acts, BLUE);
    pause(150);
    /* brädans massa (given i texten) — skrivs in i figuren */
    var wMa = stringAdvance('m=20 kg', s * 0.55, F * 0.55);
    placeString('m=20 kg', 318, 128, s * 0.55, F * 0.55, acts, BLUE);
    var boxM = [318, 318 + wMa, 128, F * 0.55];
    stepEnd();

    /* ---- steg 2: a) — krafterna, skalenliga (0,45 px/N) ---- */
    var b2 = figurBubble([
      [['a) Tyngdkraft i tyngd-']],
      [['punkten, stödkrafter']],
      [['vid P och Q. Närmast']],
      [['tyngdpunkten bär mest']],
      [['— skalenliga pilar!']]
    ]);
    tanke(b2);
    placeString('a)', padL, 116, s * 0.62, F * 0.62, acts);
    pause(200);
    acts.push({ kind: 'stroke', pts: dotPts(tpX, 153) }); /* tyngdpunkten */
    line([tpX, 153], [tpX, 241 - 11], BLUE);              /* F_G ∝ 196 N */
    arrowHead(tpX, 241, tpX, 153, 11, BLUE);
    placeString('F_G', tpX + 10, 250, s * 0.62, F * 0.62, acts, BLUE);
    pause(200);
    line([pX, bT], [pX, 113 + 10], BLUE);                 /* F_P ∝ 79 N */
    arrowHead(pX, 113, pX, bT, 10, BLUE);
    var wFP = stringAdvance('F_P', s * 0.62, F * 0.62);
    placeString('F_P', pX - 12 - wFP, 108, s * 0.62, F * 0.62, acts, BLUE);
    pause(150);
    line([qX, bT], [qX, 95 + 10], BLUE);                  /* F_Q ∝ 118 N */
    arrowHead(qX, 95, qX, bT, 10, BLUE);
    placeString('F_Q', qX + 12, 92, s * 0.62, F * 0.62, acts, BLUE);
    stepEnd();

    /* ---- steg 3: b) — vridningspunkt P + hävarmsmått ---- */
    var b3 = figurBubble([
      [['b) Två okända krafter!']],
      [['Väljer P som vridnings-']],
      [['punkt — då får kraften']],
      [['i P hävarmen 0.']]
    ]);
    tanke(b3);
    var ringP = { kind: 'stroke', pts: ringPts(pX, 150, 17, 14), color: BLUE };
    acts.push(ringP);
    pause(380);
    var bDim0 = acts.length;               /* allt härefter fejdas i c) */
    dash([pX, 232], [pX, dimB2 + 6]);      /* projektioner */
    dash([qX, 232], [qX, dimB1 + 6]);
    dash([tpX, 246], [tpX, dimB2 + 6]);
    pause(150);
    dimArrow(pX, qX, dimB1);               /* hävarmen till kraften i Q */
    var wLQ = stringAdvance('l_Q=2,5 m', s * 0.55, F * 0.55);
    placeString('l_Q=2,5 m', qX + 14, dimB1 + 5, s * 0.55, F * 0.55, acts, BLUE);
    var boxLQ = [qX + 14, qX + 14 + wLQ, dimB1 + 5, F * 0.55];
    pause(200);
    /* ANTECKNING i fri yta till höger om figuren (användarönskemål
     * 2026-07-30): motivera VARFÖR hävarmen till tyngdkraften är 1,5 m —
     * inte självklart för en elev. Fejdas ut med b):s hävarmar i c). */
    placeString('Tyngdpunkten: mitt på', 450, 262, s * 0.62, F * 0.62, acts);
    placeString('brädan, 3,0 m in.', 450, 287, s * 0.62, F * 0.62, acts);
    placeString('l_G=3,0-1,5=1,5 m', 450, 315, s * 0.62, F * 0.62, acts);
    pause(300);
    dimArrow(pX, tpX, dimB2);              /* hävarmen till tyngdkraften */
    var wLG = stringAdvance('l_G=1,5 m', s * 0.55, F * 0.55);
    var xLG = (pX + tpX) / 2 - wLG / 2;
    placeString('l_G=1,5 m', xLG, dimB2 + 22, s * 0.55, F * 0.55, acts, BLUE);
    var boxLG = [xLG, xLG + wLG, dimB2 + 22, F * 0.55];
    var bDims = acts.slice(bDim0).filter(function (a) {
      return a.kind === 'stroke';
    });
    stepEnd();

    /* ---- beräkningen b), rad för rad ---- */
    var y = 392;
    var adv = 1.7 * F;
    var bw = 290;

    var b4 = bubble(120, bubbleTop(312), bw, [
      [['Momentjämvikt: momentet moturs']],
      [['är lika stort som momentet medurs.']]
    ]);
    tanke(b4);
    placeString('b) Momentjämvikt', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.8 * F;
    var wMg = stringAdvance('M', s, F);
    var noteMot = { note: 1, x: padL + wMg / 2, y: y + 0.78 * F,
                    text: 'moturs', fs: 15, wins: [] };
    var xEq = placeString('M↺', padL, y, s, F, acts);
    acts.push({ kind: 'show', obj: noteMot });
    pause(320);
    var xM2 = placeString('=', xEq, y, s, F, acts);
    var noteMed = { note: 1, x: xM2 + wMg / 2, y: y + 0.78 * F,
                    text: 'medurs', fs: 15, wins: [] };
    placeString('M↻', xM2, y, s, F, acts);
    acts.push({ kind: 'show', obj: noteMed });
    pause(420);
    stepEnd();
    acts.push({ kind: 'hide', obj: noteMot });
    acts.push({ kind: 'hide', obj: noteMed });

    y += adv + 0.55 * F;
    var b5 = bubble(120, bubbleTop(y - adv), bw, [
      [['Ett moment är kraften gånger']],
      [['hävarmen: ', 0], ['M', 1], [' = ', 0], ['F', 1], [' · ', 0], ['l', 1]]
    ]);
    tanke(b5);
    var xMom = placeString('F_Q·l_Q=F_G·l_G', padL, y, s, F, acts);
    stepEnd();

    var b6 = bubble(140, bubbleTop(y), bw, [
      [['Delar båda leden med hävarmen']],
      [['så att kraften blir ensam kvar.']]
    ]);
    tanke(b6);
    /* OMSKRIVNING (se REGEL): ⟺ och fortsätt på samma rad */
    var xx = placeString('⟺F_Q=', xMom, y, s, F, acts);
    fracH('F_G·l_G', 'l_Q', xx, y);
    stepEnd();

    /* mätvärdesklammern — tyngdkraftens deluträkning görs INUTI
     * klammern (strukturregeln), på sin egen rad */
    y += adv + 0.9 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Mätvärden i klammer! Tyngd-']],
      [['kraften räknas ut direkt här,']],
      [['med ', 0], ['g', 1], [' = 9,82 N/kg.', 0]]
    ]);
    tanke(bK);
    var klam = valueBracket(acts,
      ['F_G=m·g=20 kg·9,82 N/kg=196,4 N', 'l_G=1,5 m', 'l_Q=2,5 m'],
      padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var b9 = bubble(140, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(b9);
    xx = placeString('F_Q=', padL, y, s, F, acts);
    xx = fracH('196,4·1,5', '2,5', xx, y);
    var xIns = placeString('=117,84 N', xx, y, s, F, acts);
    stepEnd();

    var bAvr = bubble(140, bubbleTop(y), bw, [
      [['Avrundar först NU: minst antal']],
      [['värdesiffror är två — då får']],
      [['svaret två: 120 N.']]
    ]);
    tanke(bAvr);
    /* avrundningen fortsätter på SAMMA rad så långt papperet räcker —
     * radbryt först när högerkanten tar slut (användarönskemål
     * 2026-07-30); prefix-ledet =0,12 kN får inte plats och bryts ned */
    placeString('≈120 N', xIns, y, s, F, acts);
    y += adv;
    placeString('=0,12 kN', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.65 * F;
    var b10 = bubble(120, bubbleTop(y - adv), bw, [
      [['Q är närmast tyngdpunkten och']],
      [['ska bära mer än hälften av']],
      [['tyngden ~200 N. Rimligt!']]
    ]);
    tanke(b10);
    var xe = placeString('Svar: 0,12 kN', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- c) — ENKLASTE LÖSNINGEN FÖRST (se REGEL ALTERNATIVA
     * LÖSNINGAR): kraftjämvikt, eftersom kraften i Q redan är känd ur
     * b). Metodrubrik före varje lösning så att eleven vet vilken metod
     * som används innan lösningen börjar. ---- */
    y += adv + 0.9 * F;
    var bcA = bubble(120, bubbleTop(y - adv), bw, [
      [['c) Enklast: kraftjämvikt!']],
      [['Krafterna uppåt bär tillsammans']],
      [['hela tyngdkraften — och kraften']],
      [['i Q vet vi redan från b).']]
    ]);
    tanke(bcA);
    placeString('c) Med kraftjämvikt', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.45 * F;
    /* "uppåt"/"nedåt" tonar in under respektive led (samma mönster som
     * moturs/medurs vid momentlagen) */
    var xU1 = placeString('F_P+F_Q', padL, y, s, F, acts);
    var noteUpp = { note: 1, x: (padL + xU1) / 2, y: y + 0.78 * F,
                    text: 'uppåt', fs: 15, wins: [] };
    acts.push({ kind: 'show', obj: noteUpp });
    pause(320);
    var xU2 = placeString('=', xU1, y, s, F, acts);
    var xU3 = placeString('F_G', xU2, y, s, F, acts);
    var noteNed = { note: 1, x: (xU2 + xU3) / 2, y: y + 0.78 * F,
                    text: 'nedåt', fs: 15, wins: [] };
    acts.push({ kind: 'show', obj: noteNed });
    pause(420);
    /* OMSKRIVNING (se REGEL): utlösningen är bara en ommöblering →
     * ⟺ och fortsätt på samma rad */
    placeString('⟺F_P=F_G-F_Q', xU3, y, s, F, acts);
    stepEnd();
    acts.push({ kind: 'hide', obj: noteUpp });
    acts.push({ kind: 'hide', obj: noteNed });

    y += adv + 0.9 * F;
    var bcK1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Båda värdena är redan uträknade']],
      [['i b) — oavrundade förstås!']]
    ]);
    tanke(bcK1);
    var klamC1 = valueBracket(acts, ['F_G=196,4 N', 'F_Q=117,84 N'],
                              padL, y, s, F);
    stepEnd();
    y = klamC1.yEnd;

    y += adv + 1.2 * F;
    var bc9a = bubble(140, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bc9a);
    var xC1 = placeString('F_P=196,4-117,84=78,56 N', padL, y, s, F, acts);
    stepEnd();

    var bcAvr1 = bubble(140, bubbleTop(y), bw, [
      [['Avrundat: 80 N. Rimligt att P']],
      [['bär minst — den sitter längst']],
      [['från tyngdpunkten!']]
    ]);
    tanke(bcAvr1);
    placeString('≈80 N', xC1, y, s, F, acts);
    stepEnd();

    y += adv + 0.65 * F;
    var xe2 = placeString('Svar: 80 N', padL, y, s, F, acts);
    underline(xe2, y);
    stepEnd();

    /* ---- alternativ lösning: momentjämvikt — vridningspunkten byts
     * till Q, b):s hävarmar fejdas ut och de nya ritas ---- */
    var bc1 = figurBubble([
      [['Det går också med']],
      [['momentlagen: välj Q som']],
      [['vridningspunkt — då']],
      [['försvinner kraften i Q!']]
    ]);
    tanke(bc1);
    fadeRings(acts, bDims.concat([ringP]));
    pause(400);
    var ringQ = { kind: 'stroke', pts: ringPts(qX, 150, 17, 14), color: BLUE };
    acts.push(ringQ);
    pause(380);
    dash([pX, 232], [pX, dimB1 + 6]);
    dash([qX, 232], [qX, dimB2 + 6]);
    dash([tpX, 246], [tpX, dimB2 + 6]);
    pause(150);
    dimArrow(pX, qX, dimB1);               /* hävarmen till kraften i P */
    var wLP = stringAdvance('l_P=2,5 m', s * 0.55, F * 0.55);
    placeString('l_P=2,5 m', qX + 14, dimB1 + 5, s * 0.55, F * 0.55, acts, BLUE);
    var boxLP = [qX + 14, qX + 14 + wLP, dimB1 + 5, F * 0.55];
    pause(200);
    /* anteckning: motivera nya hävarmen till tyngdkraften (som i b) */
    placeString('Q: 1,5+2,5=4,0 m in,', 450, 262, s * 0.62, F * 0.62, acts);
    placeString('tyngdpunkten 3,0 m in.', 450, 287, s * 0.62, F * 0.62, acts);
    placeString('l_G=4,0-3,0=1,0 m', 450, 315, s * 0.62, F * 0.62, acts);
    pause(300);
    dimArrow(tpX, qX, dimB2);              /* nya hävarmen till tyngdkraften */
    var wLG2 = stringAdvance('l_G=1,0 m', s * 0.55, F * 0.55);
    var xLG2 = (tpX + qX) / 2 - wLG2 / 2;
    placeString('l_G=1,0 m', xLG2, dimB2 + 22, s * 0.55, F * 0.55, acts, BLUE);
    var boxLG2 = [xLG2, xLG2 + wLG2, dimB2 + 22, F * 0.55];
    stepEnd();

    y += adv + 0.9 * F;
    placeString('Med momentjämvikt', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.8 * F;
    placeString('M↺=M↻', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.55 * F;
    var xMom2 = placeString('F_G·l_G=F_P·l_P', padL, y, s, F, acts);
    stepEnd();

    /* OMSKRIVNING (se REGEL): ⟺ och fortsätt på samma rad */
    xx = placeString('⟺F_P=', xMom2, y, s, F, acts);
    fracH('F_G·l_G', 'l_P', xx, y);
    stepEnd();

    /* klammern i c): F_G hämtas "sedan tidigare" ur b) — bubblan
     * förklarar det; inga ringar vid klammerskrivningen (se REGEL) */
    y += adv + 0.9 * F;
    var bcK = bubble(140, bubbleTop(y - adv), bw, [
      [['Tyngdkraften är redan uträknad']],
      [['i b) — jag återanvänder värdet!']]
    ]);
    tanke(bcK);
    var klam2 = valueBracket(acts,
      ['F_G=196,4 N', 'l_G=1,0 m', 'l_P=2,5 m'], padL, y, s, F);
    stepEnd();
    y = klam2.yEnd;

    y += adv + 1.2 * F;
    var bc9 = bubble(140, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bc9);
    xx = placeString('F_P=', padL, y, s, F, acts);
    xx = fracH('196,4·1,0', '2,5', xx, y);
    xx = placeString('=78,56 N', xx, y, s, F, acts);
    stepEnd();

    /* alternativet avslutas UTAN ny svarsrad (svaret är redan givet) —
     * bubblan konstaterar att metoderna ger samma svar */
    var bcAvr = bubble(140, bubbleTop(y), bw, [
      [['Avrundat: 80 N — momentlagen']],
      [['ger samma svar!']]
    ]);
    tanke(bcAvr);
    placeString('≈80 N', xx, y, s, F, acts);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: vinkelhastighet "karusellen" ----------------
   * Exempel 1 ur Fysik nivå 2, 1.3 Period, frekvens, radianer och
   * vinkelhastighet: en karusell roterar ett varv på 10 s — a) vinkel-
   * hastigheten i grader/s, b) i rad/s. Poängen är att SAMMA formel
   * ω = α/t används i båda deluppgifterna; det enda som byts ut är hur
   * ett helt varv mäts (360° respektive 2π rad). Omvandlingen skrivs
   * därför ut i b):s mätvärdesklammer (α=360°=2π), precis som en
   * SI-omvandling. */
  function layoutKarusell(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 300;                       /* under figuren */
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    /* hel cirkel med lite överlapp — karusellen sedd uppifrån */
    function ringShape(cx, cy, r, color) {
      var pts = [];
      for (var i = 0; i <= 24; i++) {
        var a = -1.1 + (i / 24) * Math.PI * 2.14;
        pts.push([cx + Math.cos(a) * (r + rnd(-1.3, 1.3)),
                  cy + Math.sin(a) * (r + rnd(-1.3, 1.3))]);
      }
      acts.push({ kind: 'stroke', pts: pts, color: color || null });
    }
    /* bråk med rakt divisionsstreck (samma helper som spett/bräda) */
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: karusellen uppifrån --- */
    var cx = 205, cy = 172, R = 92, Rr = 108;   /* Rr = rotationsbågen */
    function onArc(deg, rad) {
      var a = deg * Math.PI / 180;
      return [cx + Math.cos(a) * rad, cy - Math.sin(a) * rad];
    }

    /* ---- steg 1: rita det vi vet — karusellen uppifrån ---- */
    var b1 = figurBubble(258, [
      [['Ritar karusellen uppifrån.']],
      [['Pricken i mitten är axeln som']],
      [['den snurrar kring.']]
    ]);
    tanke(b1);
    ringShape(cx, cy, R);
    pause(120);
    [0, 60, 120].forEach(function (d) {        /* tre diametrar = sex ekrar */
      line(onArc(d, R), onArc(d + 180, R));
    });
    pause(120);
    acts.push({ kind: 'stroke', pts: dotPts(cx, cy) });
    stepEnd();

    /* ---- steg 2: tillägg — rotationen och tiden för ett varv ---- */
    var b2 = figurBubble(262, [
      [['Ett helt varv tar 10 sekunder.']],
      [['Jag följer en av gondolerna och']],
      [['ritar rotationen som en pil.']]
    ]);
    tanke(b2);
    acts.push({ kind: 'stroke', pts: dotPts(cx + R, cy) });   /* gondolen */
    pause(150);
    var arc = [], th;
    for (th = -32; th <= 118; th += 15) arc.push(onArc(th, Rr));
    acts.push({ kind: 'stroke', pts: arc });
    var tipA = arc[arc.length - 1], preA = arc[arc.length - 2];
    arrowHead(tipA[0], tipA[1], preA[0], preA[1], 10);
    pause(150);
    /* tal-annoteringar (se REGEL) → blått */
    placeString('1 varv', 340, 96, s * 0.55, F * 0.55, acts, BLUE);
    pause(150);
    placeString('t=10 s', 340, 124, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- a) vinkelhastigheten i grader per sekund ---- */
    var y = 358;
    var adv = 1.7 * F;
    var bw = 292;

    var bA = bubble(120, bubbleTop(276), bw, [
      [['a) Vinkelhastigheten är vinkeln']],
      [['kroppen vridit sig, dividerad']],
      [['med tiden: ', 0], ['ω', 1], [' = ', 0], ['α', 1], [' / ', 0], ['t', 1]]
    ]);
    tanke(bA);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('a) Vinkelhastighet', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;                          /* extra luft: formeln är ett bråk */
    var xx = placeString('ω=', padL, y, s, F, acts);
    fracH('α', 't', xx, y);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL) ---- */
    y += adv + 0.9 * F;
    var bK1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Ett helt varv är 360 grader,']],
      [['och det tar 10 sekunder.']]
    ]);
    tanke(bK1);
    var klam1 = valueBracket(acts, ['α=360°', 't=10 s'], padL, y, s, F);
    stepEnd();
    y = klam1.yEnd;

    y += adv + 1.2 * F;
    var bI1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI1);
    xx = placeString('ω=', padL, y, s, F, acts);
    xx = fracH('360°', '10', xx, y);
    placeString('=36°/s', xx, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR1 = bubble(120, bubbleTop(y - adv), bw, [
      [['Ett tiondels varv per sekund,']],
      [['alltså en tiondel av 360°.']],
      [['36 grader per sekund stämmer!']]
    ]);
    tanke(bR1);
    var xe = placeString('Svar: 36°/s', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    /* ---- b) samma sak, men i radianer ---- */
    y += adv + 0.9 * F;
    var bB = bubble(120, bubbleTop(y - adv), bw, [
      [['b) Samma formel, men nu mäts']],
      [['varvet i radianer i stället för']],
      [['i grader.']]
    ]);
    tanke(bB);
    placeString('b) Vinkelhastighet i radianer', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    xx = placeString('ω=', padL, y, s, F, acts);
    fracH('α', 't', xx, y);
    stepEnd();

    y += adv + 0.9 * F;
    var bK2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Ett helt varv är 2π rad. Det']],
      [['skrivs om i klammern, precis']],
      [['som en enhetsomvandling.']]
    ]);
    tanke(bK2);
    var klam2 = valueBracket(acts, ['α=360°=2π', 't=10 s'], padL, y, s, F);
    stepEnd();
    y = klam2.yEnd;

    y += adv + 1.2 * F;
    var bI2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Sätter in värdena och förkortar']],
      [['bråket så långt det går.']]
    ]);
    tanke(bI2);
    xx = placeString('ω=', padL, y, s, F, acts);
    xx = fracH('2π', '10', xx, y);
    xx = placeString('=', xx, y, s, F, acts);
    xx = fracH('π', '5', xx, y);
    var xIns = placeString('=0,628... rad/s', xx, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL): fortsättning på samma rad om papperet
     * räcker, annars ny rad som börjar med ≈ */
    var bAvr = bubble(140, bubbleTop(y), bw, [
      [['Först NU avrundar jag. Tiden']],
      [['10 s har två värdesiffror, så']],
      [['svaret får två: 0,63 rad/s.']]
    ]);
    tanke(bAvr);
    var avrS = '≈0,63 rad/s';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      /* raden ovanför innehåller bråk — nämnaren sticker ned 1,04·F under
       * baslinjen, så fortsättningsraden behöver extra luft */
      y += adv + 0.8 * F;
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 0.9 * F;
    var bR2 = bubble(120, bubbleTop(y - adv), bw, [
      [['En radian är ungefär 57°, och']],
      [['36°/s är alltså knappt en radian']],
      [['per sekund. Rimligt!']]
    ]);
    tanke(bR2);
    xe = placeString('Svar: 0,63 rad/s', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: fart i cirkulär bana "LP-skivan" ------------
   * Exempel 2 ur Fysik nivå 2, 1.3: en LP-skiva med diametern 30 cm
   * snurrar 33 varv/minut; ett suddgummi ligger 5,0 cm från ytterkanten.
   * Två fällor som figuren ska göra synliga: (1) det är RADIEN, inte
   * diametern, som räknas, och (2) suddgummits BANRADIE är inte skivans
   * radie utan 15 cm − 5,0 cm. Skivans radie är ett härlett mått och
   * motiveras därför med en anteckning bredvid figuren innan måttet
   * ritas (se REGEL om härledda mått). Vinkelhastigheten räknas ut inuti
   * mätvärdesklammern, som deluträkningarna i bräd-scenen. */
  function layoutLpskiva(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 330;                       /* under figurens måttlinjer */
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function dimArrow(x1, x2, yy) {         /* måttlinje med dubbelpil */
      line([x1 + 10, yy], [x2 - 10, yy], BLUE);
      arrowHead(x1, yy, x1 + 16, yy, 9, BLUE);
      arrowHead(x2, yy, x2 - 16, yy, 9, BLUE);
    }
    function ringShape(cx, cy, r) {
      var pts = [];
      for (var i = 0; i <= 24; i++) {
        var a = -1.1 + (i / 24) * Math.PI * 2.14;
        pts.push([cx + Math.cos(a) * (r + rnd(-1.3, 1.3)),
                  cy + Math.sin(a) * (r + rnd(-1.3, 1.3))]);
      }
      acts.push({ kind: 'stroke', pts: pts });
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: 8,53 px per cm (skivans radie 15 cm) ---
     * Diametern måttsätts PÅ den vågräta diameterlinjen inne i skivan i
     * stället för på en måttlinje ovanför. Den varianten provades först
     * men kräver lodräta projektionslinjer utmed skivans sidor, och de
     * korsar oundvikligen varje rotationsbåge man lägger utanför kanten.
     * Här är ytan ovanför och till höger om skivan i stället helt fri. */
    var cx = 193, cy = 168, R = 128, PXCM = R / 15;
    var xL = cx - R, xRim = cx + R;          /* skivans vänstra/högra kant */
    var xSudd = cx + 10 * PXCM;              /* suddgummits banradie 10 cm */
    /* De två måtten ligger på VAR SIN nivå. Kedjade på samma nivå möts
     * deras pilspetsar i xSudd, och eftersom 5,0 cm bara är ~43 px blir
     * de två motriktade spetsarna ett ✕ i stället för ett måttbyte. */
    var dimY = 232, dimY2 = 276;

    /* ---- steg 1: rita det vi vet — skivan och diametern ---- */
    var b1 = figurBubble(258, [
      [['Ritar skivan uppifrån. Pricken']],
      [['i mitten är axeln den snurrar']],
      [['kring, och tvärs över är 30 cm.']]
    ]);
    tanke(b1);
    ringShape(cx, cy, R);
    pause(120);
    acts.push({ kind: 'stroke', pts: dotPts(cx, cy) });
    pause(150);
    dimArrow(xL, xRim, cy);                  /* diametern som måttlinje */
    placeString('d=30 cm', xL + 30, cy - 14, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- steg 2: tillägg — rotationen ---- */
    var b2 = figurBubble(258, [
      [['Skivan snurrar 33 varv varje']],
      [['minut. Det blir frekvensen,']],
      [['fast per minut i stället för']],
      [['per sekund.']]
    ]);
    tanke(b2);
    var arc = [], th;
    for (th = 55; th >= 12; th -= 8.6) {     /* medurs, som en skivtallrik */
      var a = th * Math.PI / 180;
      arc.push([cx + Math.cos(a) * (R + 20), cy - Math.sin(a) * (R + 20)]);
    }
    acts.push({ kind: 'stroke', pts: arc });
    var tipA = arc[arc.length - 1], preA = arc[arc.length - 2];
    arrowHead(tipA[0], tipA[1], preA[0], preA[1], 10);
    pause(150);
    /* KÄND storhet → beteckningen framför värdet (se REGEL). Enheten är
     * inte SI ännu; omvandlingen till Hz görs i mätvärdesklammern. */
    placeString('f=33 varv/min', 358, 108, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- steg 3: skivans radie är ett HÄRLETT MÅTT (se REGEL) och
     * motiveras med en anteckning i fri yta innan den används ---- */
    var b3 = figurBubble(262, [
      [['Det är radien som behövs, inte']],
      [['diametern. Antecknar den vid']],
      [['sidan av figuren.']]
    ]);
    tanke(b3);
    placeString('Skivans radie:', 452, 186, s * 0.62, F * 0.62, acts);
    pause(200);
    /* divisionen ritas som BRÅK med vågrätt streck (se REGEL DIVISION
     * MED VÅGRÄTT STRECK) — aldrig "30/2" med snedstreck */
    (function () {
      var sA = s * 0.62, fA = F * 0.62;
      var x0 = 452, yb = 220;
      var ybar = yb - 0.34 * fA;
      var nw = stringAdvance('30', sA, fA), dw = stringAdvance('2', sA, fA);
      var w = Math.max(nw, dw) + 0.3 * fA;
      placeString('30', x0 + (w - nw) / 2, ybar - 0.14 * fA, sA, fA, acts);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      placeString('2', x0 + (w - dw) / 2, ybar + 1.04 * fA, sA, fA, acts);
      placeString('=15 cm', x0 + w + 0.1 * fA, yb, sA, fA, acts);
    })();
    stepEnd();

    /* ---- steg 4: tillägg — suddgummit och banradien ---- */
    var b4 = figurBubble(262, [
      [['Suddgummit ligger 5,0 cm från']],
      [['kanten. Banradien ', 0], ['r', 1], [' är alltså']],
      [['kortare än skivans radie.']]
    ]);
    tanke(b4);
    /* suddgummit som en liten rektangel på banan */
    line([xSudd - 11, cy - 8], [xSudd + 11, cy - 8]);
    line([xSudd + 11, cy - 8], [xSudd + 11, cy + 8]);
    line([xSudd + 11, cy + 8], [xSudd - 11, cy + 8]);
    line([xSudd - 11, cy + 8], [xSudd - 11, cy - 8]);
    pause(200);
    dash([cx, cy + 8], [cx, dimY - 6]);      /* projektioner ned till måtten */
    dash([xSudd, cy + 12], [xSudd, dimY2 - 6]);
    dash([xRim, cy + 6], [xRim, dimY2 - 6]);
    pause(150);
    dimArrow(cx, xSudd, dimY);
    /* OKÄND storhet: bara beteckningen (se REGEL). Etiketten dras in mot
     * skivans mitt — mitt under måttlinjen hamnar den annars på cirkel-
     * randen (etiketter aldrig på linjer). */
    placeString('r', cx + 30, dimY + 26, s * 0.62, F * 0.62, acts, BLUE);
    pause(200);
    dimArrow(xSudd, xRim, dimY2);
    placeString('5,0 cm', xRim + 16, dimY2 + 6, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- beräkningen, rad för rad ---- */
    var y = 400;
    var adv = 1.7 * F;
    var bw = 292;

    var bF = bubble(120, bubbleTop(306), bw, [
      [['Farten i banan är vinkel-']],
      [['hastigheten gånger banradien:']],
      [['', 0], ['v', 1], [' = ', 0], ['ω', 1], [' · ', 0], ['r', 1]]
    ]);
    tanke(bF);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('Fart i cirkulär bana', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.45 * F;
    placeString('v=ω·r', padL, y, s, F, acts);
    stepEnd();

    /* ---- mätvärdesklammern: frekvensen, vinkelhastigheten och
     * banradien räknas ut INUTI klammern (se REGEL) ---- */
    y += adv + 0.9 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Varken ', 0], ['ω', 1], [' eller ', 0], ['r', 1], [' är givna, så de']],
      [['räknas ut i klammern. Frekvensen']],
      [['först, sedan vinkelhastigheten.']]
    ]);
    tanke(bK);
    /* frekvensen är en DIVISION → bråk med vågrätt streck (se REGEL
     * DIVISION MED VÅGRÄTT STRECK), inte "33 varv/60 s" med snedstreck */
    var klam = valueBracket(acts, [
      ['f=', { frac: ['33 varv', '60 s'] }, '=0,55 Hz'],
      'ω=2π·f=2π·0,55 Hz=1,1π rad/s',
      'r=15 cm-5,0 cm=10 cm=0,10 m'
    ], padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var bI = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI);
    var xIns = placeString('v=1,1π·0,10=0,345... m/s', padL, y, s, F, acts);
    stepEnd();

    var bAvr = bubble(140, bubbleTop(y), bw, [
      [['Först NU avrundar jag. Måtten']],
      [['har två värdesiffror, så svaret']],
      [['får två: 0,35 m/s.']]
    ]);
    tanke(bAvr);
    var avrS = '≈0,35 m/s';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      y += adv;
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 0.9 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR = bubble(120, bubbleTop(y - adv), bw, [
      [['Suddgummits varv är bara']],
      [['2π·0,10 ≈ 0,63 m långt, och det']],
      [['tar drygt 1,8 s. Några tiondels']],
      [['meter per sekund är rimligt!']]
    ]);
    tanke(bR);
    var xe = placeString('Svar: 0,35 m/s', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: konisk pendel "slänggungan" (fy2-1.5 Ex 1) --
   * Stolar i 5,0 m långa kedjor bildar 30° mot lodlinjen — hur lång tid
   * tar ett varv? En formel-insättningsuppgift: figuren ska bära att
   * vinkeln mäts MOT LODLINJEN och att banradien inte behövs. Perioden T
   * är sökt och skrivs med enbart beteckningen vid rotationspilen
   * (se REGEL BETECKNINGAR I FIGURER). Första scenen med rottecknet:
   * rotSign() ritas FÖRE innehållet (vinculumlängden mäts i förväg). */
  function layoutSlanggunga(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 300;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: tak, kedja 30° mot lodlinjen, cirkelbana --- */
    var fx = 222, fy = 64;                    /* kedjans fäste i taket */
    var KL = 184;                             /* kedjans längd i px */
    var gx = fx + KL * Math.sin(Math.PI / 6); /* gungan (314, 223) */
    var gy = fy + KL * Math.cos(Math.PI / 6);
    var erx = gx - fx, ery = 20;              /* cirkelbanans ellips */

    /* ---- steg 1: rita det vi vet — tak, kedja, gunga, bana ---- */
    var b1 = figurBubble(258, [
      [['Ritar taket, kedjan och den']],
      [['vågräta cirkeln som gungan']],
      [['sveper runt i.']]
    ]);
    tanke(b1);
    line([fx - 102, fy], [fx + 108, fy]);     /* taket */
    for (var hx = fx - 94; hx <= fx + 104; hx += 16) {
      line([hx, fy], [hx - 8, fy - 9]);       /* skraffering */
    }
    pause(140);
    dash([fx, fy], [fx, gy + 2]);             /* lodlinjen */
    pause(140);
    line([fx, fy], [gx, gy]);                 /* kedjan */
    pause(140);
    /* cirkelbanan: streckad ellips (perspektiv uppifrån-snett) */
    (function () {
      var pts = [];
      for (var i = 0; i <= 72; i++) {
        var t = (i / 72) * Math.PI * 2;
        pts.push([fx + Math.cos(t) * (erx + rnd(-1, 1)),
                  gy + Math.sin(t) * (ery + rnd(-0.8, 0.8))]);
      }
      for (var k = 0; k + 2 < pts.length; k += 4) {
        acts.push({ kind: 'stroke', pts: pts.slice(k, k + 3) });
      }
    })();
    pause(140);
    /* gungan: liten ring + prick */
    (function () {
      var pts = [];
      for (var i = 0; i <= 10; i++) {
        var a = -1.2 + (i / 10) * Math.PI * 2.12;
        pts.push([gx + Math.cos(a) * (9 + rnd(-0.7, 0.7)),
                  gy + Math.sin(a) * (9 + rnd(-0.7, 0.7))]);
      }
      acts.push({ kind: 'stroke', pts: pts });
    })();
    acts.push({ kind: 'stroke', pts: dotPts(gx, gy) });
    stepEnd();

    /* ---- steg 2: annoteringar — vinkeln, längden och sökta T ---- */
    var b2 = figurBubble(262, [
      [['Skriver in det jag vet: vinkeln']],
      [['30° mot lodlinjen och kedjans']],
      [['längd 5,0 m. Tiden för ett varv']],
      [['är perioden ', 0], ['T', 1]]
    ]);
    tanke(b2);
    /* vinkelbågen mellan lodlinjen och kedjan (tal/vinkel → blått) */
    (function () {
      var pts = [];
      for (var i = 0; i <= 8; i++) {
        var t = (i / 8) * Math.PI / 6;        /* 0..30° från lodlinjen */
        pts.push([fx + Math.sin(t) * 52 + rnd(-0.8, 0.8),
                  fy + Math.cos(t) * 52 + rnd(-0.8, 0.8)]);
      }
      acts.push({ kind: 'stroke', pts: pts, color: BLUE });
    })();
    placeString('30°', 224, 162, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    placeString('l=5,0 m', 262, 102, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    /* rotationspil längs banan + sökta storheten T (bara beteckningen) */
    (function () {
      var pts = [];
      for (var i = 0; i <= 8; i++) {
        var t = Math.PI * (0.78 - (i / 8) * 0.42);   /* front, vänster→höger */
        pts.push([fx + Math.cos(t) * (erx + 12),
                  gy + Math.sin(t) * (ery + 8)]);
      }
      acts.push({ kind: 'stroke', pts: pts, color: BLUE });
      var tip = pts[pts.length - 1], pre = pts[pts.length - 2];
      arrowHead(tip[0], tip[1], pre[0], pre[1], 9, BLUE);
    })();
    placeString('T', 268, 282, s * 0.62, F * 0.62, acts, BLUE);
    stepEnd();

    /* ---- beräkningen ---- */
    var y = 356;
    var adv = 1.7 * F;
    var bw = 292;

    var bF = bubble(120, bubbleTop(288), bw, [
      [['Formeln för konisk pendel ger']],
      [['perioden direkt. Varken massan']],
      [['eller banradien behövs!']]
    ]);
    tanke(bF);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('Konisk pendel', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.35 * F;                            /* formeln har rot + bråk */
    var xx = placeString('T=2π', padL, y, s, F, acts);
    var nw = stringAdvance('l·cos α', s, F), dw = stringAdvance('g', s, F);
    var fw = Math.max(nw, dw) + 0.3 * F;
    var xs = rootSign(acts, xx, y, fw, F,
                      { yTop: y - 1.55 * F, yBot: y + 1.3 * F });
    fracH('l·cos α', 'g', xs, y);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL) ---- */
    y += adv + 1.35 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Alla mätvärden i en klammer.']],
      [['Allt är redan i SI-enheter.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, ['l=5,0 m', 'α=30°', 'g≈9,82 m/s^2'],
                            padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.35 * F;
    var bI = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI);
    xx = placeString('T=2π', padL, y, s, F, acts);
    var nw2 = stringAdvance('5,0·cos 30°', s, F),
        dw2 = stringAdvance('9,82', s, F);
    var fw2 = Math.max(nw2, dw2) + 0.3 * F;
    var xs2 = rootSign(acts, xx, y, fw2, F,
                       { yTop: y - 1.55 * F, yBot: y + 1.3 * F });
    var xe2 = fracH('5,0·cos 30°', '9,82', xs2, y);
    var xIns = placeString('=4,172... s', xe2, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL): fortsättning på samma rad om möjligt.
     * Raden ovanför har rot + bråk — extra lucka till bubblan.
     * Gränsen är bläckbaserad (PAPER_W−6 ≈ 8 px marginal när advance-
     * måttets efterluft räknats bort): utnyttja HELA arkets bredd innan
     * raden bryts (användarönskemål 2026-08-02). */
    var bAvr = bubble(140, bubbleTop(y + 1.35 * F), bw, [
      [['Först NU avrundar jag. Både']],
      [['5,0 m och 30° har två']],
      [['värdesiffror: svaret får två.']]
    ]);
    tanke(bAvr);
    var avrS = '≈4,2 s';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;                     /* raden ovanför har rot+bråk */
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.35 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR = bubble(120, bubbleTop(y - adv), bw, [
      [['Drygt fyra sekunder för ett']],
      [['varv i en slänggunga. Det']],
      [['låter lagom!']]
    ]);
    tanke(bR);
    var xe = placeString('Svar: 4,2 s', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: vertikal cirkel "vikt i snöre" (fy2-1.4 Ex 1)
   * En 200-gramsvikt i ett 80 cm långt snöre snurras i en vertikal
   * cirkel. a) F_C och F_S i övre läget (6,0 m/s), b) samma i nedre
   * läget (14 m/s), c) minsta farten i övre läget utan att snöret
   * slaknar. Figurens poäng: spännkraften och tyngdkraften pekar åt
   * SAMMA håll i övre läget men åt OLIKA håll i nedre — riktningspilarna
   * ritas i blått vid respektive vikt precis innan kraftekvationen
   * ställs upp. I b) ringas F_G "sedan tidigare" ur a):s klammer
   * (brada-mönstret) och i c) divideras massan bort med strykningar
   * (REGEL DIVIDERA BORT). */
  function layoutVertikalcirkel(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 366;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    /* pil med skaft + spets (kraftpil) */
    function arrow(p1, p2, color) {
      line(p1, p2, color);
      arrowHead(p2[0], p2[1], p1[0], p1[1], 10, color);
    }
    function rect(x0, y0, x1, y1) {
      line([x0, y0], [x1, y0]);
      line([x1, y0], [x1, y1]);
      line([x1, y1], [x0, y1]);
      line([x0, y1], [x0, y0]);
    }
    function strikeThrough(x0, w, yBas) {
      line([x0 - 0.16 * F, yBas + 0.32 * F],
           [x0 + w + 0.16 * F, yBas - 0.68 * F], BLUE);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri --- */
    var cx = 215, cy = 168, R = 104;
    var sqT = { x: 215, y: 64 };              /* vikten i övre läget */
    var sqB = { x: 215, y: 272 };             /* vikten i nedre läget */

    /* ---- steg 1: rita det vi vet — cirkelbanan, snöret, vikterna ---- */
    var b1 = figurBubble(262, [
      [['Ritar cirkelbanan med vikten i']],
      [['översta och nedersta läget.']],
      [['Snöret är banans radie, 80 cm.']]
    ]);
    tanke(b1);
    /* streckad cirkelbana */
    (function () {
      var pts = [];
      for (var i = 0; i <= 72; i++) {
        var t = (i / 72) * Math.PI * 2 - Math.PI / 2;
        pts.push([cx + Math.cos(t) * (R + rnd(-1, 1)),
                  cy + Math.sin(t) * (R + rnd(-1, 1))]);
      }
      for (var k = 0; k + 2 < pts.length; k += 4) {
        acts.push({ kind: 'stroke', pts: pts.slice(k, k + 3) });
      }
    })();
    pause(140);
    acts.push({ kind: 'stroke', pts: dotPts(cx, cy) });   /* centrum */
    pause(140);
    line([cx, cy], [sqT.x, sqT.y + 9]);       /* snöret upp/ned */
    line([cx, cy], [sqB.x, sqB.y - 9]);
    pause(140);
    rect(sqT.x - 9, sqT.y - 9, sqT.x + 9, sqT.y + 9);
    rect(sqB.x - 9, sqB.y - 9, sqB.x + 9, sqB.y + 9);
    pause(140);
    placeString('övre läget', 240, 60, s * 0.55, F * 0.55, acts);
    placeString('nedre läget', 240, 290, s * 0.55, F * 0.55, acts);
    pause(140);
    /* radien som streckad vågrät linje, etiketten UTANFÖR cirkeln till
     * höger (fri yta — inne i cirkeln krockar den med kraftpilarna och
     * nära randen med cirkelstrecken) */
    dash([cx + 8, cy], [cx + R, cy]);
    placeString('r=80 cm', cx + R + 12, cy + 6, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    var y = 430;
    var adv = 1.7 * F;
    var bw = 292;

    /* ---- a) riktningarna i övre läget ---- */
    var bA = figurBubble(262, [
      [['a) I översta läget pekar BÅDE']],
      [['spännkraften och tyngdkraften']],
      [['nedåt, in mot cirkelns mitt.']]
    ]);
    tanke(bA);
    arrow([207, 76], [207, 140], BLUE);       /* F_S längs snöret */
    placeString('F_S', 158, 112, s * 0.55, F * 0.55, acts, BLUE);
    pause(180);
    acts.push({ kind: 'stroke', pts: dotPts(215, 64), color: BLUE });
    arrow([215, 64], [215, 108], BLUE);       /* F_G från tyngdpunkten */
    placeString('F_G', 231, 100, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    var bF1 = bubble(120, bubbleTop(370), bw, [
      [['Centripetalkraften är den']],
      [['resulterande kraften in mot']],
      [['mitten: ', 0], ['F', 1], [' = ', 0], ['m', 1], [' · ', 0],
       ['v', 1], ['²/', 0], ['r', 1]]
    ]);
    tanke(bF1);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('a) Centripetalkraft i övre läget', padL, y,
                s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    var xx = placeString('F_C=', padL, y, s, F, acts);
    fracH('m·v^2', 'r', xx, y);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL) ---- */
    y += adv + 1.1 * F;
    var bK1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Massan och radien görs om']],
      [['till SI-enheter i klammern:']],
      [['kilogram och meter.']]
    ]);
    tanke(bK1);
    var klam1 = valueBracket(acts,
      ['m=200 g=0,200 kg', 'v=6,0 m/s', 'r=80 cm=0,80 m'], padL, y, s, F);
    stepEnd();
    y = klam1.yEnd;

    y += adv + 1.2 * F;
    var bI1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI1);
    xx = placeString('F_C=', padL, y, s, F, acts);
    var xe1 = fracH('0,200·6,0^2', '0,80', xx, y);
    placeString('=9,0 N', xe1 + 0.15 * F, y, s, F, acts);
    stepEnd();

    /* ---- kraftekvationen i övre läget ---- */
    y += adv + 1.2 * F;
    var bE1 = bubble(120, bubbleTop(y - adv), bw, [
      [['Tillsammans utgör de två']],
      [['krafterna centripetalkraften.']],
      [['Spännkraften löses ut.']]
    ]);
    tanke(bE1);
    placeString('Kraftekvation i övre läget', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    placeString('F_S+F_G=F_C⟺F_S=F_C-F_G', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bK2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Tyngdkraften räknas ut direkt']],
      [['i klammern: ', 0], ['F', 1], [' = ', 0], ['m', 1], [' · ', 0],
       ['g', 1]]
    ]);
    tanke(bK2);
    var klam2 = valueBracket(acts,
      ['F_C=9,0 N', 'F_G=m·g=0,200 kg·9,82 N/kg=1,964 N'], padL, y, s, F);
    stepEnd();
    y = klam2.yEnd;

    y += adv + 1.0 * F;
    var bI2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI2);
    var xIns1 = placeString('F_S=9,0-1,964=7,036 N', padL, y, s, F, acts);
    stepEnd();

    var bAvr1 = bubble(140, bubbleTop(y), bw, [
      [['Först nu avrundar jag. Farten']],
      [['6,0 m/s har två värdesiffror,']],
      [['så svaret får två: 7,0 N.']]
    ]);
    tanke(bAvr1);
    placeString('≈7,0 N', xIns1, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR1 = bubble(120, bubbleTop(y - adv), bw, [
      [['Spännkraften är mindre än 9,0 N']],
      [['eftersom tyngdkraften hjälper']],
      [['till nedåt. Rimligt!']]
    ]);
    tanke(bR1);
    /* två sökta storheter → beteckningen ut i svarsraden (se UNDANTAG) */
    var xeA = placeString('Svar: F_C=9,0 N och F_S=7,0 N', padL, y, s, F, acts);
    underline(xeA, y);
    stepEnd();

    /* ---- b) riktningarna i nedre läget ---- */
    y += adv + 1.2 * F;
    var bB = bubble(120, bubbleTop(y - adv), bw, [
      [['b) I nedersta läget pekar']],
      [['spännkraften uppåt mot mitten,']],
      [['men tyngdkraften nedåt.']]
    ]);
    tanke(bB);
    arrow([207, 260], [207, 190], BLUE);      /* F_S uppåt längs snöret */
    placeString('F_S', 158, 225, s * 0.55, F * 0.55, acts, BLUE);
    pause(180);
    acts.push({ kind: 'stroke', pts: dotPts(215, 272), color: BLUE });
    arrow([215, 272], [215, 328], BLUE);      /* F_G från tyngdpunkten */
    placeString('F_G', 231, 318, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    placeString('b) Centripetalkraft i nedre läget', padL, y,
                s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    xx = placeString('F_C=', padL, y, s, F, acts);
    fracH('m·v^2', 'r', xx, y);
    stepEnd();

    y += adv + 1.1 * F;
    var bK3 = bubble(140, bubbleTop(y - adv), bw, [
      [['Samma massa och radie som i']],
      [['a), men nu är farten 14 m/s.']]
    ]);
    tanke(bK3);
    var klam3 = valueBracket(acts,
      ['m=0,200 kg', 'v=14 m/s', 'r=0,80 m'], padL, y, s, F);
    stepEnd();
    y = klam3.yEnd;

    y += adv + 1.2 * F;
    var bI3 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI3);
    xx = placeString('F_C=', padL, y, s, F, acts);
    var xe3 = fracH('0,200·14^2', '0,80', xx, y);
    placeString('=49 N', xe3 + 0.15 * F, y, s, F, acts);
    stepEnd();

    y += adv + 1.2 * F;
    var bE2 = bubble(120, bubbleTop(y - adv), bw, [
      [['Nu drar tyngdkraften åt fel']],
      [['håll: resultanten in mot mitten']],
      [['är skillnaden mellan krafterna.']]
    ]);
    tanke(bE2);
    placeString('Kraftekvation i nedre läget', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    placeString('F_S-F_G=F_C⟺F_S=F_C+F_G', padL, y, s, F, acts);
    stepEnd();

    /* insättning: F_G ringas "sedan tidigare" ur a):s klammer (samma
     * mönster som brada c) — klammervärden ringas annars aldrig, men det
     * här värdet hämtas från en ANNAN deluppgifts klammer långt upp */
    y += adv + 0.9 * F;
    var bRing = bubble(140, bubbleTop(y - adv), bw, [
      [['Tyngdkraften 1,964 N är redan']],
      [['uträknad i klammern i a). Jag']],
      [['ringar in värdet där.']]
    ]);
    tanke(bRing);
    var rings = substRings(acts, [klam2.boxes[1]]);
    var xIns2 = placeString('F_S=49+1,964=50,964 N', padL, y, s, F, acts);
    fadeRings(acts, rings);
    stepEnd();

    var bAvr2 = bubble(140, bubbleTop(y), bw, [
      [['Farten 14 m/s har två']],
      [['värdesiffror, så svaret']],
      [['avrundas till 51 N.']]
    ]);
    tanke(bAvr2);
    placeString('≈51 N', xIns2, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR2 = bubble(120, bubbleTop(y - adv), bw, [
      [['Här måste snöret både bära']],
      [['tyngden och svänga vikten,']],
      [['och farten är hög. Störst']],
      [['kraft i nedre läget, rimligt!']]
    ]);
    tanke(bR2);
    var xeB = placeString('Svar: F_C=49 N och F_S=51 N', padL, y, s, F, acts);
    underline(xeB, y);
    stepEnd();

    /* ---- c) gränsfallet: snöret slaknar ---- */
    y += adv + 1.2 * F;
    var bC = bubble(120, bubbleTop(y - adv), bw, [
      [['c) Vid minsta farten slaknar']],
      [['snöret precis i toppen. Då är']],
      [['spännkraften noll och tyngd-']],
      [['kraften ensam centripetalkraft.']]
    ]);
    tanke(bC);
    placeString('c) Gränsfall: F_S=0 i övre läget', padL, y,
                s * 0.62, F * 0.62, acts);
    pause(300);
    /* SKISS (användarönskemål 2026-08-02): banan + översta läget, med
     * F_G inritad och F_S=0 utskrivet — så att man SER att tyngdkraften
     * är enda kraften och ensam utgör centripetalkraften */
    var scx = 150, scy = y + 116, scr = 60;
    (function () {
      var pts = [];
      for (var i = 0; i <= 48; i++) {
        var t = (i / 48) * Math.PI * 2 - Math.PI / 2;
        pts.push([scx + Math.cos(t) * (scr + rnd(-1, 1)),
                  scy + Math.sin(t) * (scr + rnd(-1, 1))]);
      }
      for (var k = 0; k + 2 < pts.length; k += 4) {
        acts.push({ kind: 'stroke', pts: pts.slice(k, k + 3) });
      }
    })();
    pause(140);
    acts.push({ kind: 'stroke', pts: dotPts(scx, scy) });   /* centrum */
    pause(140);
    rect(scx - 9, scy - scr - 9, scx + 9, scy - scr + 9);   /* vikten */
    pause(160);
    acts.push({ kind: 'stroke', pts: dotPts(scx, scy - scr), color: BLUE });
    arrow([scx, scy - scr], [scx, scy - scr + 52], BLUE);   /* F_G ensam */
    placeString('F_G', scx - 48, scy - scr + 54, s * 0.55, F * 0.55,
                acts, BLUE);
    pause(160);
    placeString('F_S=0', scx + 22, scy - scr - 14, s * 0.55, F * 0.55,
                acts, BLUE);
    stepEnd();

    y = scy + scr + 1.75 * F;
    placeString('F_G=F_C', padL, y, s, F, acts);
    stepEnd();

    y += adv + 1.1 * F;
    var bSub = bubble(140, bubbleTop(y - adv), bw, [
      [['Båda krafterna byts mot sina']],
      [['formler.']]
    ]);
    tanke(bSub);
    var xg = placeString('m·g=', padL, y, s, F, acts);
    /* bråket ritas manuellt så att täljar-m:ets läge kan sparas till
     * strykningen */
    var nwc = stringAdvance('m·v^2', s, F), dwc = stringAdvance('r', s, F);
    var fwc = Math.max(nwc, dwc) + 0.3 * F;
    var ybarC = y - 0.34 * F;
    var numX = xg + (fwc - nwc) / 2;
    placeString('m·v^2', numX, ybarC - 0.14 * F, s, F, acts);
    pause(130);
    acts.push({ kind: 'stroke', pts: humanize([[xg, ybarC], [xg + fwc, ybarC]]) });
    pause(130);
    placeString('r', xg + (fwc - dwc) / 2, ybarC + 1.04 * F, s, F, acts);
    stepEnd();

    /* DIVIDERA BORT massan (se REGEL): stryks i båda leden med blåpennan.
     * Raden ovanför är ett bråk — nämnaren sticker ned ~1,1·F under
     * baslinjen, så bubblan behöver extra lucka. */
    var bStr = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Massan finns i båda leden och']],
      [['divideras bort. Minsta farten']],
      [['beror alltså inte på massan!']]
    ]);
    tanke(bStr);
    var wM = stringAdvance('m', s, F);
    strikeThrough(padL, wM, y);
    pause(260);
    strikeThrough(numX, wM, ybarC - 0.14 * F);
    stepEnd();

    /* omskrivningen: ⟺ och fortsätt på samma rad (se REGEL) */
    y += adv + 1.3 * F;
    xx = placeString('g=', padL, y, s, F, acts);
    xx = fracH('v^2', 'r', xx, y);
    placeString('⟺v^2=g·r⟺v=', xx + 0.15 * F, y, s, F, acts);
    var xv = stringAdvance('⟺v^2=g·r⟺v=', s, F) + xx + 0.15 * F;
    var cw = stringAdvance('g·r', s, F);
    var xsC = rootSign(acts, xv, y, cw, F);
    placeString('g·r', xsC, y, s, F, acts);
    stepEnd();

    y += adv + 1.1 * F;
    var bK4 = bubble(140, bubbleTop(y - adv), bw, [
      [['Bara två mätvärden behövs:']],
      [['tyngdaccelerationen och radien.']]
    ]);
    tanke(bK4);
    var klam4 = valueBracket(acts, ['g≈9,82 m/s^2', 'r=0,80 m'],
                             padL, y, s, F);
    stepEnd();
    y = klam4.yEnd;

    y += adv + 1.0 * F;
    var bI4 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI4);
    xx = placeString('v=', padL, y, s, F, acts);
    var cw1 = stringAdvance('9,82·0,80', s, F);
    var xs1 = rootSign(acts, xx, y, cw1, F);
    xx = placeString('9,82·0,80', xs1, y, s, F, acts);
    xx = placeString('=', xx + 0.22 * F, y, s, F, acts);
    var cw2 = stringAdvance('7,856', s, F);
    var xs2b = rootSign(acts, xx, y, cw2, F);
    placeString('7,856', xs2b, y, s, F, acts);
    stepEnd();

    /* uträkningen fortsätter på ny rad (radbryt FÖRE ett led, se REGEL) */
    y += adv;
    var xIns3 = placeString('=2,803... m/s', padL, y, s, F, acts);
    stepEnd();

    var bAvr3 = bubble(140, bubbleTop(y), bw, [
      [['Radien 0,80 m har två']],
      [['värdesiffror: svaret avrundas']],
      [['till 2,8 m/s.']]
    ]);
    tanke(bAvr3);
    placeString('≈2,8 m/s', xIns3, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR3 = bubble(120, bubbleTop(y - adv), bw, [
      [['Klart mindre än farten 6,0 m/s']],
      [['i a), där snöret fortfarande']],
      [['var spänt i toppen. Rimligt!']]
    ]);
    tanke(bR3);
    var xeC = placeString('Svar: 2,8 m/s', padL, y, s, F, acts);
    underline(xeC, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: kastparabel "Elin sparkar en boll" -----------
   * (fy2-1.6 Exempel 1) Boll med 15 m/s i 50° mot marken. a) tid till
   * högsta punkten (v_y = 0), b) stighöjd, c) kastvidd, d) fart i ned-
   * slaget via Pythagoras. Figuren ritas skalenligt ur fysiken (apex-
   * höjden i px följer y_max/x_max ≈ 0,30, vilket ger startlutningen
   * 50°). Mätvärdesklammern skrivs EN gång i a) och återanvänds i b)–d)
   * (bubblan påminner om var värdena står — värden ur en klammer ringas
   * aldrig, se REGEL MÄTVÄRDESKLAMMER). Flerteckensindexen y_max/x_max
   * skrivs 'y_m_a_x' (flödande subscript-kolumn, se placeString). */
  function layoutKastboll(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 336;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function arrow(p1, p2, color) {
      line(p1, p2, color);
      arrowHead(p2[0], p2[1], p1[0], p1[1], 10, color);
    }
    function dimArrow(x1, x2, yy) {
      line([x1 + 10, yy], [x2 - 10, yy], BLUE);
      arrowHead(x1, yy, x1 + 16, yy, 9, BLUE);
      arrowHead(x2, yy, x2 - 16, yy, 9, BLUE);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: mark + parabel (apexhöjd 125 px ger 50°
     * startlutning på 420 px kastvidd — skalenligt med 6,7/23 m) --- */
    var gY = 252, x0 = 70, x1 = 490, apexY = gY - 125;
    function parY(x) {
      return gY - 4 * 125 * (x - x0) * (x1 - x) / ((x1 - x0) * (x1 - x0));
    }

    /* ---- steg 1: rita det vi vet ---- */
    var b1 = figurBubble(262, [
      [['Ritar marken och kastbanan.']],
      [['Bollen sparkas iväg med 15 m/s']],
      [['i 50° vinkel mot marken.']]
    ]);
    tanke(b1);
    line([44, gY], [560, gY]);                /* marken */
    for (var hx = 60; hx <= 550; hx += 42) {
      line([hx, gY], [hx - 9, gY + 9]);       /* skraffering under marken */
    }
    pause(140);
    (function () {                            /* kastbanan, en mjuk kurva */
      var pts = [];
      for (var px = x0; px <= x1; px += 15) pts.push([px, parY(px)]);
      acts.push({ kind: 'stroke', pts: pts });
    })();
    pause(140);
    acts.push({ kind: 'stroke', pts: dotPts(x0, gY - 3) });   /* bollen */
    pause(160);
    /* utgångshastigheten: pil från bollens KANT i 50° (vektor → blått) */
    arrow([x0 + 3, gY - 7],
          [x0 + 75 * Math.cos(50 * Math.PI / 180),
           gY - 4 - 75 * Math.sin(50 * Math.PI / 180)], BLUE);
    placeString('v_0=15 m/s', 26, 166, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    /* vinkelbågen mot marken */
    (function () {
      var pts = [];
      for (var i = 0; i <= 8; i++) {
        var t = (i / 8) * 50 * Math.PI / 180;
        pts.push([x0 + Math.cos(t) * 40 + rnd(-0.8, 0.8),
                  gY - 4 - Math.sin(t) * 40 + rnd(-0.8, 0.8)]);
      }
      acts.push({ kind: 'stroke', pts: pts, color: BLUE });
    })();
    placeString('50°', 116, 236, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    var y = 396;
    var adv = 1.7 * F;
    var bw = 292;

    /* ---- a) tid till högsta punkten ---- */
    var bA1 = figurBubble(262, [
      [['a) I banans högsta punkt är']],
      [['hastigheten i y-led exakt noll.']],
      [['Det ger en ekvation för tiden!']]
    ]);
    tanke(bA1);
    acts.push({ kind: 'stroke', pts: dotPts((x0 + x1) / 2, apexY),
                color: BLUE });
    placeString('v_y=0', 252, 108, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    var bA2 = bubble(120, bubbleTop(340), bw, [
      [['Formeln för hastigheten i']],
      [['y-led innehåller tiden.']],
      [['Den löses ut!']]
    ]);
    tanke(bA2);
    placeString('a) Hastighet i y-led', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    placeString('v_y=v_0·sin α-g·t', padL, y, s, F, acts);
    stepEnd();

    /* omskrivningen får inte plats på samma rad — ny rad som börjar
     * med ⟺ (se REGEL OMSKRIVNING MED EKVIVALENSPIL) */
    y += adv + 0.55 * F;
    var xx = placeString('⟺t=', padL, y, s, F, acts);
    fracH('v_0·sin α-v_y', 'g', xx, y);
    stepEnd();

    y += adv + 1.1 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Alla mätvärden i en klammer,']],
      [['med noll som hastighet i y-led']],
      [['i högsta punkten.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts,
      ['v_0=15 m/s', 'α=50°', 'v_y=0', 'g≈9,82 m/s^2'], padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var bI1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI1);
    xx = placeString('t=', padL, y, s, F, acts);
    var xeA = fracH('15·sin 50°-0', '9,82', xx, y);
    var xInsA = placeString('=1,170... s', xeA + 0.15 * F, y, s, F, acts);
    stepEnd();

    /* raden ovanför är ett bråk — extra lucka till bubblan */
    var bAvrA = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Först nu avrundar jag: två']],
      [['värdesiffror, som mätvärdena.']]
    ]);
    tanke(bAvrA);
    var avrA = '≈1,2 s';
    if (xInsA + stringAdvance(avrA, s, F) < PAPER_W - 6) {
      placeString(avrA, xInsA, y, s, F, acts);
    } else {
      y += adv + 0.9 * F;
      placeString(avrA, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 0.9 * F;
    var bRA = bubble(120, bubbleTop(y - adv), bw, [
      [['Drygt en sekund upp till']],
      [['toppen. Det låter lagom för']],
      [['en hård spark.']]
    ]);
    tanke(bRA);
    var xsvA = placeString('Svar: 1,2 s', padL, y, s, F, acts);
    underline(xsvA, y);
    stepEnd();

    /* ---- b) stighöjden ---- */
    y += adv + 1.1 * F;
    var bB = bubble(120, bubbleTop(y - adv), bw, [
      [['b) Stighöjden har en egen']],
      [['formel. Mätvärdena står redan']],
      [['i klammern i a).']]
    ]);
    tanke(bB);
    placeString('b) Stighöjd', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    xx = placeString('y_m_a_x=', padL, y, s, F, acts);
    fracH('v_0^2·sin^2 α', '2g', xx, y);
    stepEnd();

    y += adv + 1.2 * F;
    var bI2 = bubble(140, bubbleTop(y - adv), bw, [
      [['In med värdena. Sinus i']],
      [['kvadrat: räkna ut sinus först,']],
      [['kvadrera sedan.']]
    ]);
    tanke(bI2);
    xx = placeString('y_m_a_x=', padL, y, s, F, acts);
    var xeB = fracH('15^2·sin^2 50°', '2·9,82', xx, y);
    var xInsB = placeString('=6,722... m', xeB + 0.15 * F, y, s, F, acts);
    stepEnd();

    var bAvrB = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Avrundar till två värdesiffror:']],
      [['6,7 m.']]
    ]);
    tanke(bAvrB);
    var avrB = '≈6,7 m';
    if (xInsB + stringAdvance(avrB, s, F) < PAPER_W - 6) {
      placeString(avrB, xInsB, y, s, F, acts);
    } else {
      y += adv + 0.9 * F;
      placeString(avrB, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 0.9 * F;
    var bRB = bubble(120, bubbleTop(y - adv), bw, [
      [['Nästan sju meter upp, högre']],
      [['än ett tvåvåningshus. En']],
      [['riktigt hård spark, rimligt.']]
    ]);
    tanke(bRB);
    var xsvB = placeString('Svar: 6,7 m', padL, y, s, F, acts);
    underline(xsvB, y);
    stepEnd();

    /* ---- c) kastvidden ---- */
    y += adv + 1.1 * F;
    var bC1 = bubble(120, bubbleTop(y - adv), bw, [
      [['c) Bollen landar i samma höjd']],
      [['som den startar. Då gäller']],
      [['formeln för kastvidd. Måttet']],
      [['ritas in i figuren.']]
    ]);
    tanke(bC1);
    /* kastvidden som måttlinje under marken (mått → blått) */
    dash([x0, gY + 12], [x0, gY + 30]);
    dash([x1, gY + 12], [x1, gY + 30]);
    dimArrow(x0, x1, gY + 34);
    placeString('x_m_a_x', 254, gY + 62, s * 0.62, F * 0.62, acts, BLUE);
    stepEnd();

    placeString('c) Kastvidd', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    xx = placeString('x_m_a_x=', padL, y, s, F, acts);
    fracH('v_0^2·sin(2α)', 'g', xx, y);
    stepEnd();

    y += adv + 1.2 * F;
    var bI3 = bubble(140, bubbleTop(y - adv), bw, [
      [['Dubbla vinkeln inuti sinus!']],
      [['Värdena ur klammern i a).']]
    ]);
    tanke(bI3);
    xx = placeString('x_m_a_x=', padL, y, s, F, acts);
    var xeC = fracH('15^2·sin(2·50°)', '9,82', xx, y);
    var xInsC = placeString('=22,564... m', xeC + 0.15 * F, y, s, F, acts);
    stepEnd();

    var bAvrC = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Två värdesiffror: 23 m.']]
    ]);
    tanke(bAvrC);
    var avrC = '≈23 m';
    if (xInsC + stringAdvance(avrC, s, F) < PAPER_W - 6) {
      placeString(avrC, xInsC, y, s, F, acts);
    } else {
      y += adv + 0.9 * F;
      placeString(avrC, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 0.9 * F;
    var bRC = bubble(120, bubbleTop(y - adv), bw, [
      [['23 meter är en lång men fullt']],
      [['rimlig spark, ungefär en']],
      [['fjärdedel av en fotbollsplan.']]
    ]);
    tanke(bRC);
    var xsvC = placeString('Svar: 23 m', padL, y, s, F, acts);
    underline(xsvC, y);
    stepEnd();

    /* ---- d) farten i nedslaget ---- */
    y += adv + 1.1 * F;
    var bD1 = bubble(120, bubbleTop(y - adv), bw, [
      [['d) Farten är resultanten av']],
      [['hastigheterna i x-led och']],
      [['y-led. Pythagoras sats!']]
    ]);
    tanke(bD1);
    placeString('d) Fart i nedslaget', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.9 * F;
    xx = placeString('v=', padL, y, s, F, acts);
    var cwD = stringAdvance('v_x^2+v_y^2', s, F);
    var xsD = rootSign(acts, xx, y, cwD, F, { yTop: y - 1.32 * F });
    placeString('v_x^2+v_y^2', xsD, y, s, F, acts);
    stepEnd();

    y += adv + 0.7 * F;
    var bD2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Kastet är symmetriskt, så']],
      [['bollen är i luften dubbelt så']],
      [['länge som upp till toppen.']]
    ]);
    tanke(bD2);
    placeString('t=2·1,170...=2,340... s', padL, y, s, F, acts);
    stepEnd();

    y += adv;
    var bD3 = bubble(140, bubbleTop(y - adv), bw, [
      [['Farten i x-led är konstant']],
      [['under hela kastet.']]
    ]);
    tanke(bD3);
    placeString('v_x=15·cos 50°=9,641... m/s', padL, y, s, F, acts);
    stepEnd();

    y += adv;
    var bD4 = bubble(140, bubbleTop(y - adv), bw, [
      [['Hastigheten i y-led vid ned-']],
      [['slaget fås ur formeln i a),']],
      [['med hela flygtiden insatt.']]
    ]);
    tanke(bD4);
    placeString('v_y=15·sin 50°-9,82·2,340...', padL, y, s, F, acts);
    y += adv;
    placeString('=−11,488... m/s', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.8 * F;
    var bD5 = bubble(140, bubbleTop(y - adv), bw, [
      [['Minustecknet visar att rörelsen']],
      [['är riktad nedåt. I kvadraten']],
      [['försvinner tecknet.']]
    ]);
    tanke(bD5);
    xx = placeString('v=', padL, y, s, F, acts);
    var cwD2 = stringAdvance('9,641...^2+11,488...^2', s, F);
    var xsD2 = rootSign(acts, xx, y, cwD2, F, { yTop: y - 1.32 * F });
    placeString('9,641...^2+11,488...^2', xsD2, y, s, F, acts);
    stepEnd();

    y += adv;
    var xInsD = placeString('=14,997... m/s', padL, y, s, F, acts);
    stepEnd();

    var bAvrD = bubble(140, bubbleTop(y), bw, [
      [['Två värdesiffror: 15 m/s.']]
    ]);
    tanke(bAvrD);
    placeString('≈15 m/s', xInsD, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bRD = bubble(120, bubbleTop(y - adv), bw, [
      [['Precis samma fart som i']],
      [['utsparken! Så är det alltid']],
      [['när start och landning sker']],
      [['i samma höjd.']]
    ]);
    tanke(bRD);
    var xsvD = placeString('Svar: 15 m/s', padL, y, s, F, acts);
    underline(xsvD, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: kast från höjd (fy2-1.6 Exempel 2) -----------
   * En boll kastas med 25 m/s i 40° från 1,6 m höjd — hur långt blir
   * kastet? Kärnan: y-ekvationen blir en ANDRAGRADSEKVATION som löses
   * med digitalt hjälpmedel; den negativa roten stryks (blåpennan) och
   * den positiva ringas in i insättningsgesten när den sätts in i
   * x-ekvationen (värdet står i en RAD, inte i klammern — då gäller
   * ring-regeln). Starthöjden är överdriven i skissen (skalenlig vore
   * 13 px) men måttsätts korrekt med 1,6 m. */
  function layoutKasthojd(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 336;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function arrow(p1, p2, color) {
      line(p1, p2, color);
      arrowHead(p2[0], p2[1], p1[0], p1[1], 10, color);
    }
    function dimArrowH(x1, x2, yy) {
      line([x1 + 10, yy], [x2 - 10, yy], BLUE);
      arrowHead(x1, yy, x1 + 16, yy, 9, BLUE);
      arrowHead(x2, yy, x2 - 16, yy, 9, BLUE);
    }
    function dimArrowV(xx, y1, y2) {
      line([xx, y1 + 8], [xx, y2 - 8], BLUE);
      arrowHead(xx, y1, xx, y1 + 13, 8, BLUE);
      arrowHead(xx, y2, xx, y2 - 13, 8, BLUE);
    }
    function strikeThrough(x0, w, yBas) {
      line([x0 - 0.16 * F, yBas + 0.32 * F],
           [x0 + w + 0.16 * F, yBas - 0.68 * F], BLUE);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: kastet börjar 1,6 m (34 px, överdrivet)
     * ovanför marken och landar på marken --- */
    var gY = 252, lx = 95, ly = 218;
    var apexX = 330, apexY = 115;
    var aPar = (ly - apexY) / ((lx - apexX) * (lx - apexX));
    var landX = apexX + Math.sqrt((gY - apexY) / aPar);   /* ≈ 601 */
    function parY(x) { return apexY + aPar * (x - apexX) * (x - apexX); }

    /* ---- steg 1: rita det vi vet ---- */
    var b1 = figurBubble(262, [
      [['Ritar marken, kastbanan och']],
      [['startpunkten en bit ovanför']],
      [['marken.']]
    ]);
    tanke(b1);
    line([36, gY], [648, gY]);                /* marken */
    for (var hx = 52; hx <= 640; hx += 46) {
      line([hx, gY], [hx - 9, gY + 9]);
    }
    pause(140);
    dash([lx, gY], [lx, ly]);                 /* lodrätt streck vid starten */
    pause(140);
    (function () {                            /* kastbanan */
      var pts = [];
      for (var px = lx; px <= landX; px += 16) pts.push([px, parY(px)]);
      pts.push([landX, gY]);
      acts.push({ kind: 'stroke', pts: pts });
    })();
    pause(140);
    acts.push({ kind: 'stroke', pts: dotPts(lx, ly) });   /* bollen */
    stepEnd();

    /* ---- steg 2: annoteringar ---- */
    var b2 = figurBubble(266, [
      [['Skriver in utgångsfarten,']],
      [['vinkeln och höjden 1,6 m.']],
      [['Kastlängden ', 0], ['x', 1], [' är den sökta']],
      [['sträckan längs marken.']]
    ]);
    tanke(b2);
    /* höjden som lodrät måttlinje (mått → blått) */
    dash([lx - 3, ly], [66, ly]);
    dimArrowV(62, ly, gY);
    placeString('1,6 m', 10, 210, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    /* utgångshastigheten från bollens kant + vinkelbåge mot vågrät */
    arrow([lx + 4, ly - 3],
          [lx + 62 * Math.cos(40 * Math.PI / 180),
           ly - 62 * Math.sin(40 * Math.PI / 180)], BLUE);
    placeString('v_0=25 m/s', 14, 150, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    dash([lx + 6, ly], [lx + 66, ly]);        /* vågrät referens */
    (function () {
      var pts = [];
      for (var i = 0; i <= 8; i++) {
        var t = (i / 8) * 40 * Math.PI / 180;
        pts.push([lx + Math.cos(t) * 38 + rnd(-0.8, 0.8),
                  ly - Math.sin(t) * 38 + rnd(-0.8, 0.8)]);
      }
      acts.push({ kind: 'stroke', pts: pts, color: BLUE });
    })();
    placeString('40°', 140, 206, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    /* kastlängden: sökt storhet → bara beteckningen (se REGEL) */
    dash([lx, gY + 6], [lx, gY + 30]);
    dash([landX, gY + 6], [landX, gY + 30]);
    dimArrowH(lx, landX, gY + 34);
    placeString('x', 340, gY + 62, s * 0.62, F * 0.62, acts, BLUE);
    stepEnd();

    var y = 396;
    var adv = 1.7 * F;
    var bw = 292;

    /* ---- läget i x-led (dit tiden sedan sätts in) ---- */
    var bF = bubble(120, bubbleTop(330), bw, [
      [['Kastlängden får jag ur läget']],
      [['i x-led. Men först behövs']],
      [['tiden som bollen är i luften!']]
    ]);
    tanke(bF);
    placeString('Läge i x-led', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    var xFx0 = padL;
    var xFx1 = placeString('x=v_0·cos α·t', padL, y, s, F, acts);
    var yFx = y;
    stepEnd();

    /* ---- läget i y-led ger tiden ---- */
    y += adv + 0.6 * F;
    var bY = bubble(120, bubbleTop(y - adv), bw, [
      [['Tiden fås ur y-led. Med origo']],
      [['där bollen släpps ligger']],
      [['marken nere på ', 0], ['y', 1], [' = −1,6 m.']]
    ]);
    tanke(bY);
    placeString('Läge i y-led', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    var xx = placeString('y=v_0·sin α·t-', padL, y, s, F, acts);
    fracH('g·t^2', '2', xx, y);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL) ---- */
    y += adv + 1.1 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Alla mätvärden i klammern.']],
      [['Nedslaget sker när ', 0], ['y', 1], [' är']],
      [['minus 1,6 m.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts,
      ['y=−1,6 m', 'v_0=25 m/s', 'α=40°', 'g≈9,82 m/s^2'], padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var bI = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i y-ekvationen.']]
    ]);
    tanke(bI);
    xx = placeString('−1,6=25·sin 40°·t-', padL, y, s, F, acts);
    fracH('9,82·t^2', '2', xx, y);
    stepEnd();

    /* ---- andragradsekvation → digitalt hjälpmedel ---- */
    y += adv + 1.3 * F;
    var bPQ = bubble(140, bubbleTop(y - adv), bw, [
      [['En andragradsekvation! Den']],
      [['löser jag med ett digitalt']],
      [['hjälpmedel, i CAS-läget.']]
    ]);
    tanke(bPQ);
    var xNeg0 = padL;
    var xNeg1 = placeString('t=−0,097 s', padL, y, s, F, acts);
    var yRot = y;
    placeString(' eller ', xNeg1, y, s, F, acts);
    var xPos0 = xNeg1 + stringAdvance(' eller ', s, F);
    var xPos1 = placeString('t=3,369... s', xPos0, y, s, F, acts);
    stepEnd();

    /* den negativa roten förkastas — stryks med blåpennan */
    var bNeg = bubble(140, bubbleTop(y), bw, [
      [['Tid kan inte vara negativ!']],
      [['Den lösningen förkastas.']]
    ]);
    tanke(bNeg);
    strikeThrough(xNeg0, xNeg1 - xNeg0 - 0.16 * F, y);
    stepEnd();

    /* ---- tiden in i x-ekvationen — INSÄTTNINGSGEST (se REGEL):
     * värdet står i en RAD (inte i klammern), så det ringas in, liksom
     * uttrycket det sätts in i ---- */
    y += adv + 0.7 * F;
    var bIns = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu in med tiden i formeln för']],
      [['läget i x-led. Jag ringar in']],
      [['värdet och formeln.']]
    ]);
    tanke(bIns);
    var rings = substRings(acts, [
      [xPos0, xPos1, yRot, F],
      [xFx0, xFx1, yFx, F]
    ]);
    placeString('x=25·cos 40°·3,369...', padL, y, s, F, acts);
    fadeRings(acts, rings);
    stepEnd();

    y += adv;
    var xIns = placeString('=64,530... m', padL, y, s, F, acts);
    stepEnd();

    var bAvr = bubble(140, bubbleTop(y), bw, [
      [['Först nu avrundar jag. Två']],
      [['värdesiffror räcker: 65 m.']]
    ]);
    tanke(bAvr);
    placeString('≈65 m', xIns, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR = bubble(120, bubbleTop(y - adv), bw, [
      [['Bollen är i luften i nästan']],
      [['3,4 sekunder och far snabbt']],
      [['framåt. Drygt 60 meter är']],
      [['rimligt!']]
    ]);
    tanke(bR);
    var xe = placeString('Svar: 65 m', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: vikt i fjäder "Hookes lag" (fy2-2.1 Ex 1)
   * En vikt på 250 g förlänger en fjäder 8,0 cm; vikten dras sedan ned
   * 5,0 cm och släpps. a) fjäderkonstanten ur Hookes lag (kraften är
   * viktens tyngd — kraftjämvikt), b) accelerationen i släppögonblicket
   * via F_R = −k·y och Newtons andra lag. Figuren: tak, fjäder och vikt
   * med två streckade nivåer (fjäderns slut utan vikt resp. jämvikts-
   * läget) och Δl-måttpil; neddragningen ritas in i blått först i b).
   * Fjäderkonstanten hämtas "sedan tidigare" ur a):s uträkning (bubblan
   * förklarar, inga ringar vid klammerskrivningen — se REGEL). F_R-värdet
   * ringas däremot in i raden ovanför när det sätts in i a=F_R/m
   * (vertikalcirkel-mönstret: värde ur en tidigare RAD, inte ur
   * klammern). */
  function layoutFjader(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 300;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function arrow(p1, p2, color) {
      line(p1, p2, color);
      arrowHead(p2[0], p2[1], p1[0], p1[1], 10, color);
    }
    function rect(x0, y0, x1, y1) {
      line([x0, y0], [x1, y0]);
      line([x1, y0], [x1, y1]);
      line([x1, y1], [x0, y1]);
      line([x0, y1], [x0, y0]);
    }
    /* lodrät måttpil med spets i BÅDA ändar (som Δl i teorifiguren) */
    function measureV(x, yA, yB, color) {
      line([x, yA + 5], [x, yB - 5], color);
      arrowHead(x, yA, x, yA + 18, 9, color);
      arrowHead(x, yB, x, yB - 18, 9, color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri --- */
    var fx = 240, takY = 56;
    var endU = 106;                           /* fjäderns slut UTAN vikt */
    var endL = 162;                           /* fjäderns slut MED vikt
                                                 (jämviktsläget); 56 px =
                                                 8,0 cm → 7 px/cm */

    /* ---- steg 1: rita det vi vet — tak, fjäder, vikt, nivålinjer ---- */
    var b1 = figurBubble(262, [
      [['Ritar taket, fjädern och vikten.']],
      [['Utan vikt slutar fjädern vid den']],
      [['övre streckade linjen.']]
    ]);
    tanke(b1);
    line([150, takY], [330, takY]);           /* taket */
    for (var hx = 158; hx <= 330; hx += 16) {
      line([hx, takY], [hx - 8, takY - 9]);   /* skraffering */
    }
    pause(140);
    /* fjädern: sicksack i EN penndragning */
    (function () {
      var n = 7, yTop = takY + 6, yBot = endL - 6;
      var step = (yBot - yTop) / (2 * n);
      var pts = [[fx, takY], [fx, yTop]];
      for (var k = 1; k <= 2 * n - 1; k++) {
        pts.push([fx + (k % 2 ? 13 : -13), yTop + k * step]);
      }
      pts.push([fx, yBot]);
      pts.push([fx, endL]);
      acts.push({ kind: 'stroke', pts: pts });
    })();
    pause(140);
    rect(fx - 14, endL, fx + 14, endL + 28);  /* vikten */
    pause(140);
    dash([fx + 16, endU], [340, endU]);       /* nivå utan vikt */
    dash([fx + 16, endL], [340, endL]);       /* jämviktsläget */
    pause(140);
    placeString('utan vikt', 358, 100, s * 0.55, F * 0.55, acts);
    placeString('jämviktsläge', 358, 166, s * 0.55, F * 0.55, acts);
    stepEnd();

    /* ---- steg 2: annoteringar — massan och förlängningen (blått) ---- */
    var b2 = figurBubble(262, [
      [['Skriver in det jag vet: vikten']],
      [['250 g förlänger fjädern 8,0 cm']],
      [['ned till jämviktsläget.']]
    ]);
    tanke(b2);
    placeString('m=250 g', 96, 184, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    measureV(334, endU, endL, BLUE);
    placeString('Δl=8,0 cm', 346, 128, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- a) Hookes lag ---- */
    var y = 372;
    var adv = 1.7 * F;
    var bw = 292;

    var bF1 = bubble(120, bubbleTop(296), bw, [
      [['Vikten hänger stilla: fjäder-']],
      [['kraften är lika stor som tyngden.']],
      [['Hookes lag kopplar kraften till']],
      [['förlängningen.']]
    ]);
    tanke(bF1);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('a) Hookes lag', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    var xx = placeString('F=k·Δl⟺k=', padL, y, s, F, acts);
    fracH('F', 'Δl', xx, y);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL) ---- */
    y += adv + 1.1 * F;
    var bK1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Kraften på fjädern är viktens']],
      [['tyngd. Den räknas ut direkt i']],
      [['klammern.']]
    ]);
    tanke(bK1);
    var klam1 = valueBracket(acts,
      ['F=m·g=0,250 kg·9,82 N/kg=2,455 N', 'Δl=8,0 cm=0,080 m'],
      padL, y, s, F);
    stepEnd();
    y = klam1.yEnd;

    y += adv + 1.2 * F;
    var bI1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI1);
    xx = placeString('k=', padL, y, s, F, acts);
    var xe1 = fracH('2,455', '0,080', xx, y);
    var xIns1 = placeString('=30,6875 N/m', xe1 + 0.15 * F, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL): fortsättning på samma rad om möjligt */
    var bAvr1 = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Förlängningen 8,0 cm har två']],
      [['värdesiffror: svaret får två.']]
    ]);
    tanke(bAvr1);
    var avrA = '≈31 N/m';
    if (xIns1 + stringAdvance(avrA, s, F) < PAPER_W - 6) {
      placeString(avrA, xIns1, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;
      placeString(avrA, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.0 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR1 = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Tyngden 2,5 N gav 8 cm']],
      [['förlängning. Då stämmer det att']],
      [['en hel meter kräver drygt 30 N!']]
    ]);
    tanke(bR1);
    var xeA = placeString('Svar: 31 N/m', padL, y, s, F, acts);
    underline(xeA, y);
    stepEnd();

    /* ---- b) neddragningen ritas in i figuren ---- */
    y += adv + 1.2 * F;
    var bB = bubble(120, bubbleTop(y - adv), bw, [
      [['b) Vikten dras ned 5,0 cm under']],
      [['jämviktsläget. Elongationen']],
      [['räknas negativ nedåt.']]
    ]);
    tanke(bB);
    arrow([fx - 18, endL + 34], [fx - 18, endL + 72], BLUE);
    dash([fx + 16, endL + 73], [340, endL + 73]);
    placeString('y=−5,0 cm', 348, endL + 78, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    var bF2 = bubble(120, bubbleTop(y - 1.15 * F), bw, [
      [['Accelerationen fås ur Newtons']],
      [['andra lag. Då behöver jag den']],
      [['resulterande kraften på vikten.']]
    ]);
    tanke(bF2);
    placeString('b) Newtons andra lag', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    xx = placeString('F_R=m·a⟺a=', padL, y, s, F, acts);
    fracH('F_R', 'm', xx, y);
    stepEnd();

    /* ---- mätvärdesklammern DIREKT under formeln (se REGEL KLAMMERN
     * KOMMER DIREKT UNDER FORMELN): F_R är inte given, så den beräknas
     * som deluträkning PÅ SIN RAD INUTI klammern — med formeln F_R=−k·y
     * och enheter utsatta vid varje tal. Fjäderkonstanten hämtas
     * oavrundad ur a). Raden är lång → klammern i 0,75-skala. */
    y += adv + 1.1 * F;
    var bK2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Kraften är inte given: den']],
      [['räknas ut direkt i klammern med']],
      [['formeln för resulterande kraft.']],
      [['Fjäderkonstanten tar jag']],
      [['oavrundad från a).']]
    ]);
    tanke(bK2);
    var klam2 = valueBracket(acts,
      ['F_R=−k·y=−30,6875 N/m·(−0,050 m)=1,534... N',
       'm=250 g=0,250 kg'],
      padL, y, s, F, { rs: 0.75 });
    stepEnd();
    y = klam2.yEnd;

    y += adv + 1.2 * F;
    var bI2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Kraften blev positiv: den pekar']],
      [['uppåt, mot jämviktsläget. Nu']],
      [['sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI2);
    xx = placeString('a=', padL, y, s, F, acts);
    var xe2 = fracH('1,534...', '0,250', xx, y);
    var xIns2 = placeString('=6,1375 m/s^2', xe2 + 0.15 * F, y, s, F, acts);
    stepEnd();

    var bAvr2 = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Neddragningen 5,0 cm har två']],
      [['värdesiffror: accelerationen']],
      [['avrundas till 6,1 m/s².']]
    ]);
    tanke(bAvr2);
    var avrB = '≈6,1 m/s^2';
    if (xIns2 + stringAdvance(avrB, s, F) < PAPER_W - 6) {
      placeString(avrB, xIns2, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;
      placeString(avrB, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.0 * F;
    var bR2 = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Drygt hälften av tyngd-']],
      [['accelerationen 9,82. En mjuk']],
      [['fjäder ger en mjuk knuff,']],
      [['rimligt!']]
    ]);
    tanke(bR2);
    var xeB = placeString('Svar: 6,1 m/s^2', padL, y, s, F, acts);
    underline(xeB, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: energi i fjäder (fy2-2.2 Ex 1) --------------
   * En fjäder med k = 45 N/m dras ut 20 cm. Potentiella energin i
   * a) nedre vändläget, b) övre vändläget, c) jämviktsläget. Figuren:
   * fjäder med vikten i nedre vändläget och TRE streckade nivåer (övre
   * vändläge, jämviktsläge, nedre vändläge) med amplituden måttsatt.
   * Poängen är lägesresonemanget: i vändlägena är ALL energi potentiell
   * (E_p = E = k·A²/2), i jämviktsläget är den 0 — b) och c) besvaras
   * utan ny räkning. */
  function layoutFjaderenergi(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 300;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function rect(x0, y0, x1, y1) {
      line([x0, y0], [x1, y0]);
      line([x1, y0], [x1, y1]);
      line([x1, y1], [x0, y1]);
      line([x0, y1], [x0, y0]);
    }
    function measureV(x, yA, yB, color) {
      line([x, yA + 5], [x, yB - 5], color);
      arrowHead(x, yA, x, yA + 18, 9, color);
      arrowHead(x, yB, x, yB - 18, 9, color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: jämvikt y=150, amplitud 56 px = 20 cm --- */
    var fx = 240, takY = 56;
    var yEq = 150, A = 56;
    var yUp = yEq - A, yDn = yEq + A;         /* övre/nedre vändläget */

    /* ---- steg 1: rita det vi vet ---- */
    var b1 = figurBubble(266, [
      [['Ritar fjädern med vikten i nedre']],
      [['vändläget. Jämviktsläget och']],
      [['vändlägena blir streckade linjer.']]
    ]);
    tanke(b1);
    line([150, takY], [330, takY]);           /* taket */
    for (var hx = 158; hx <= 330; hx += 16) {
      line([hx, takY], [hx - 8, takY - 9]);
    }
    pause(140);
    (function () {                            /* fjädern ned till vikten */
      var n = 8, yTop = takY + 6, yBot = yDn - 6;
      var step = (yBot - yTop) / (2 * n);
      var pts = [[fx, takY], [fx, yTop]];
      for (var k = 1; k <= 2 * n - 1; k++) {
        pts.push([fx + (k % 2 ? 13 : -13), yTop + k * step]);
      }
      pts.push([fx, yBot]);
      pts.push([fx, yDn]);
      acts.push({ kind: 'stroke', pts: pts });
    })();
    pause(140);
    rect(fx - 14, yDn, fx + 14, yDn + 28);    /* vikten i nedre vändläget */
    pause(140);
    dash([fx + 16, yUp], [430, yUp]);
    dash([fx + 16, yEq], [430, yEq]);
    dash([fx + 16, yDn], [430, yDn]);
    pause(140);
    placeString('övre vändläge', 438, yUp + 5, s * 0.55, F * 0.55, acts);
    placeString('jämviktsläge', 438, yEq + 5, s * 0.55, F * 0.55, acts);
    placeString('nedre vändläge', 438, yDn + 5, s * 0.55, F * 0.55, acts);
    stepEnd();

    /* ---- steg 2: annoteringar (blått) ---- */
    var b2 = figurBubble(262, [
      [['Skriver in det jag vet: fjäder-']],
      [['konstanten och amplituden,']],
      [['utdraget 20 cm.']]
    ]);
    tanke(b2);
    placeString('k=45 N/m', 96, 120, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    measureV(350, yEq, yDn, BLUE);
    placeString('A=20 cm', 362, yEq + 36, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- a) energin i nedre vändläget ---- */
    var y = 372;
    var adv = 1.7 * F;
    var bw = 292;

    var bF1 = bubble(120, bubbleTop(282), bw, [
      [['a) I ett vändläge står vikten']],
      [['stilla. Rörelseenergin är noll:']],
      [['ALL energi är potentiell.']]
    ]);
    tanke(bF1);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('a) Fjäderns totala energi', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    var xx = placeString('E_p=E=', padL, y, s, F, acts);
    fracH('k·A^2', '2', xx, y);
    stepEnd();

    /* ---- mätvärdesklammern (se REGEL) ---- */
    y += adv + 1.1 * F;
    var bK1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Amplituden görs om till meter']],
      [['i klammern.']]
    ]);
    tanke(bK1);
    var klam1 = valueBracket(acts, ['k=45 N/m', 'A=20 cm=0,20 m'],
                             padL, y, s, F);
    stepEnd();
    y = klam1.yEnd;

    y += adv + 1.2 * F;
    var bI1 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI1);
    xx = placeString('E_p=', padL, y, s, F, acts);
    var xe1 = fracH('45·0,20^2', '2', xx, y);
    placeString('=0,90 J', xe1 + 0.15 * F, y, s, F, acts);
    stepEnd();

    y += adv + 1.2 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR1 = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Knappt en joule, ungefär som']],
      [['att lyfta ett litet äpple en']],
      [['meter. Rimligt för en fjäder!']]
    ]);
    tanke(bR1);
    var xeA = placeString('Svar: 0,90 J', padL, y, s, F, acts);
    underline(xeA, y);
    stepEnd();

    /* ---- b) övre vändläget: samma amplitud, ingen ny räkning ---- */
    y += adv + 1.2 * F;
    var bB = bubble(120, bubbleTop(y - adv), bw, [
      [['b) Vändlägena ligger lika långt']],
      [['från jämviktsläget. Energin är']],
      [['lika stor i båda.']]
    ]);
    tanke(bB);
    placeString('b) Samma amplitud i båda vändlägena', padL, y,
                s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    var xeB = placeString('Svar: 0,90 J', padL, y, s, F, acts);
    underline(xeB, y);
    stepEnd();

    /* ---- c) jämviktsläget ---- */
    y += adv + 1.0 * F;
    var bC = bubble(120, bubbleTop(y - adv), bw, [
      [['c) I jämviktsläget har vikten']],
      [['störst fart. All energi är']],
      [['rörelseenergi, den potentiella']],
      [['är noll.']]
    ]);
    tanke(bC);
    placeString('c) Jämviktsläget', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    placeString('E_p=0', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var xeC = placeString('Svar: 0', padL, y, s, F, acts);
    underline(xeC, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: dämpad svängning (fy2-2.2 Ex 2) -------------
   * En fjäder med k = 28 kN/m: amplituden är 5,0 cm i första övre
   * vändläget och 2,5 cm i det andra. Hur mycket energi blir värme
   * under första svängningen? Figuren ritas med SAMMA orientering som
   * uppgiftens amplitud-tid-diagram (se REGEL FIGURORIENTERING): en
   * avklingande kurva med de två övre vändlägena markerade. Värmen är
   * skillnaden i total energi, E_värme = E₁ − E₂ (flerteckensindexet
   * skrivs 'E_v_ä_r_m_e', se placeString). */
  function layoutDampning(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 250;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- diagrammets geometri: axelkors i (90, 140), första övre
     * vändläget i x=140 (5,0 cm = 70 px), period 190 px --- */
    var ox = 90, oy = 140;
    var x1 = 140, P = 190, A1px = 70;
    function curveY(x) {
      var ph = (x - x1) / P * Math.PI * 2;
      var amp = A1px * Math.pow(0.5, (x - x1) / P);
      return oy - amp * Math.cos(ph);
    }

    /* ---- steg 1: diagrammet (grafit) ---- */
    var b1 = figurBubble(266, [
      [['Ritar diagrammet ur uppgiften:']],
      [['en dämpad svängning som tappar']],
      [['höjd för varje period.']]
    ]);
    tanke(b1);
    line([ox, 210], [ox, 48]);                /* y-axeln */
    arrowHead(ox, 44, ox, 60, 9);
    line([ox - 6, oy], [556, oy]);            /* t-axeln */
    arrowHead(560, oy, 546, oy, 9);
    pause(140);
    placeString('A (cm)', 102, 50, s * 0.55, F * 0.55, acts);
    placeString('t (s)', 516, 166, s * 0.55, F * 0.55, acts);
    pause(140);
    /* kurvan: SAMMANHÄNGANDE penndrag som delar ändpunkt (till skillnad
     * från de streckade cirkelbanorna) — en dämpad kurva är en heldragen
     * linje, inte en hjälplinje */
    (function () {
      var pts = [];
      for (var x = 96; x <= 500; x += 6) pts.push([x, curveY(x)]);
      for (var k = 0; k + 1 < pts.length; k += 9) {
        acts.push({ kind: 'stroke', pts: pts.slice(k, k + 10) });
      }
    })();
    stepEnd();

    /* ---- steg 2: vändlägena markeras (blått) ---- */
    var b2 = figurBubble(266, [
      [['Amplituden är 5,0 cm i första']],
      [['övre vändläget och 2,5 cm i']],
      [['det andra.']]
    ]);
    tanke(b2);
    acts.push({ kind: 'stroke', pts: dotPts(x1, oy - A1px), color: BLUE });
    placeString('A_1=5,0 cm', 162, 74, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    acts.push({ kind: 'stroke', pts: dotPts(x1 + P, oy - A1px / 2), color: BLUE });
    placeString('A_2=2,5 cm', 350, 96, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- beräkningen ---- */
    var y = 320;
    var adv = 1.7 * F;
    var bw = 292;

    var bE = bubble(120, bubbleTop(246), bw, [
      [['Mellan vändlägena försvinner']],
      [['mekanisk energi. Skillnaden har']],
      [['blivit värme.']]
    ]);
    tanke(bE);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('Energiförlusten blir värme', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.55 * F;
    placeString('E_v_ä_r_m_e=E_1-E_2', padL, y, s, F, acts);
    stepEnd();

    /* ---- mätvärdesklammern DIREKT under formeln (se REGEL KLAMMERN
     * KOMMER DIREKT UNDER FORMELN): E_1 och E_2 är inte givna, så de
     * beräknas PÅ SINA RADER INUTI klammern med energiformeln — med
     * enheter vid varje tal. Divisionen ritas som BRÅK med vågrätt
     * streck via valueBrackets {frac:…}-segment (se REGEL DIVISION MED
     * VÅGRÄTT STRECK). */
    y += adv + 1.4 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['I vändlägena är all energi']],
      [['potentiell. Energierna räknas']],
      [['ut direkt i klammern med']],
      [['energiformeln, i newton och']],
      [['meter.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, [
      ['E_1=', { frac: ['k·A_1^2', '2'] }, '=',
       { frac: ['28000 N/m·(0,050 m)^2', '2'] }, '=35 J'],
      ['E_2=', { frac: ['k·A_2^2', '2'] }, '=',
       { frac: ['28000 N/m·(0,025 m)^2', '2'] }, '=8,75 J']
    ], padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.2 * F;
    var bI = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in energierna ur']],
      [['klammern. Halva amplituden gav']],
      [['bara en fjärdedel av energin!']]
    ]);
    tanke(bI);
    var xIns = placeString('E_v_ä_r_m_e=35-8,75=26,25 J', padL, y, s, F, acts);
    stepEnd();

    var bAvr = bubble(140, bubbleTop(y), bw, [
      [['Amplituderna har två']],
      [['värdesiffror: svaret avrundas']],
      [['till 26 J.']]
    ]);
    tanke(bAvr);
    var avrS = '≈26 J';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      y += adv;
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 0.9 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR = bubble(120, bubbleTop(y - adv), bw, [
      [['Tre fjärdedelar av energin']],
      [['försvann på en enda svängning.']],
      [['Kraftigt dämpat, precis som']],
      [['kurvan visar!']]
    ]);
    tanke(bR);
    var xe = placeString('Svar: 26 J', padL, y, s, F, acts);
    underline(xe, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: harmonisk svängning (fy2-2.3 Ex 1) ----------
   * y = 0,15 sin(10t): amplitud, svängningstid, hastighet som funktion av
   * t, maximal fart och acceleration. Figuren är ett y–t-diagram där de
   * två sökta storheterna A och T är måttsatta med ENBART sin beteckning
   * (se REGEL BETECKNINGAR I FIGURER) och uppgiftens samband står i blått.
   * Poängen i a) är JÄMFÖRELSEN med grundformen y = A·sin(ω·t): de två
   * sambanden skrivs under varandra och blåpennan ringar in 0,15 mot A
   * (insättningsgest, se REGEL). Ur samma jämförelse hämtas ω = 10 rad/s
   * till klammern i b). c)–e) är deriveringar utan mätvärden och har
   * därför ingen klammer — det finns inga värden att sätta in. */
  function layoutHarmonisk(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 288;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    /* måttpil med spets i BÅDA ändar (yA ovanför yB resp. xA till vänster) */
    function measureV(x, yA, yB, color) {
      line([x, yA + 5], [x, yB - 5], color);
      arrowHead(x, yA, x, yA + 18, 9, color);
      arrowHead(x, yB, x, yB - 18, 9, color);
    }
    function measureH(xA, xB, y, color) {
      line([xA + 5, y], [xB - 5, y], color);
      arrowHead(xA, y, xA + 18, y, 9, color);
      arrowHead(xB, y, xB - 18, y, 9, color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- diagrammets geometri: origo (96, 152), amplitud 70 px,
     * period 180 px; kurvan y = A·sin(ω·t) startar i origo --- */
    var ox = 96, oy = 152, Apx = 70, P = 180;
    function curveY(x) {
      return oy - Apx * Math.sin((x - ox) / P * Math.PI * 2);
    }
    var top1 = ox + P / 4;                    /* första krönet (amplituden) */
    /* perioden mäts DALBOTTEN till DALBOTTEN, inte krön till krön: krönet
     * är upptaget av amplitudmåttet, och två mått i samma x-kolumn lägger
     * projektionslinjen rakt ovanpå amplitudpilen */
    var bot1 = ox + 3 * P / 4, bot2 = bot1 + P;

    /* ---- steg 1: diagrammet (grafit) ---- */
    var b1 = figurBubble(268, [
      [['Ritar en svängning: läget ', 0], ['y', 1], [' som', 0]],
      [['funktion av tiden ', 0], ['t', 1]],
      [['Kurvan blir en sinuskurva.']]
    ]);
    tanke(b1);
    line([ox, 250], [ox, 62]);                /* y-axeln */
    arrowHead(ox, 58, ox, 74, 9);
    line([ox - 8, oy], [552, oy]);            /* t-axeln */
    arrowHead(556, oy, 542, oy, 9);
    pause(140);
    placeString('y (m)', 108, 72, s * 0.55, F * 0.55, acts);
    placeString('t (s)', 508, 178, s * 0.55, F * 0.55, acts);
    pause(140);
    (function () {
      var pts = [];
      for (var x = ox; x <= 528; x += 6) pts.push([x, curveY(x)]);
      for (var k = 0; k + 1 < pts.length; k += 9) {
        acts.push({ kind: 'stroke', pts: pts.slice(k, k + 10) });
      }
    })();
    stepEnd();

    /* ---- steg 2: uppgiftens samband + de sökta måtten (blått) ---- */
    var b2 = figurBubble(272, [
      [['Skriver in sambandet ur']],
      [['uppgiften. Amplituden ', 0], ['A', 1], [' och', 0]],
      [['perioden ', 0], ['T', 1], [' är det jag söker,', 0]],
      [['så de får bara sin beteckning.']]
    ]);
    tanke(b2);
    placeString('y=0,15 sin(10t)', 330, 66, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    measureV(140, curveY(top1), oy, BLUE);    /* amplituden */
    placeString('A', 150, 124, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    dash([bot1, curveY(bot1) + 8], [bot1, 248]);   /* projektioner */
    dash([bot2, curveY(bot2) + 8], [bot2, 248]);
    measureH(bot1, bot2, 254, BLUE);          /* perioden, dal till dal */
    placeString('T', (bot1 + bot2) / 2 - 6, 246, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- a) jämförelse med grundformen ---- */
    var y = 336;
    var adv = 1.7 * F;
    var bw = 292;

    var bF1 = bubble(120, bubbleTop(258), bw, [
      [['Sambandet har samma form som']],
      [['den allmänna formeln för en']],
      [['harmonisk svängning. Då kan jag']],
      [['läsa av ', 0], ['A', 1], [' genom att jämföra.', 0]]
    ]);
    tanke(bF1);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('a) Jämför med grundformen', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.9 * F;
    var yGen = y;
    var xa0 = placeString('y=', padL, yGen, s, F, acts);
    var xa1 = placeString('A', xa0, yGen, s, F, acts);
    var xa2 = placeString('·sin(', xa1, yGen, s, F, acts);
    var xa3 = placeString('ω', xa2, yGen, s, F, acts);
    placeString('·t)', xa3, yGen, s, F, acts);
    stepEnd();

    var yGiv = yGen + adv;
    var bG = bubble(140, bubbleTop(yGen), bw, [
      [['Skriver uppgiftens samband rakt']],
      [['under, så att delarna hamnar']],
      [['mot varandra.']]
    ]);
    tanke(bG);
    var xg0 = placeString('y=', padL, yGiv, s, F, acts);
    var xg1 = placeString('0,15', xg0, yGiv, s, F, acts);
    var xg2 = placeString(' sin(', xg1, yGiv, s, F, acts);
    var xg3 = placeString('10', xg2, yGiv, s, F, acts);
    placeString('t)', xg3, yGiv, s, F, acts);
    stepEnd();

    /* INSÄTTNINGSGEST (se REGEL): talet framför sinus ringas in, sedan
     * platsen det hör hemma på i grundformen */
    y = yGiv + adv + 0.2 * F;
    var bA = bubble(140, bubbleTop(yGiv), bw, [
      [['Talet framför sinus står på']],
      [['amplitudens plats.']]
    ]);
    tanke(bA);
    var rings = substRings(acts, [[xg0, xg1, yGiv, F], [xa0, xa1, yGen, F]]);
    var xeAmp = placeString('A=0,15 m=15 cm', padL, y, s, F, acts);
    fadeRings(acts, rings);
    stepEnd();

    y += adv;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR1 = bubble(120, bubbleTop(y - adv), bw, [
      [['15 cm åt vardera hållet. Ungefär']],
      [['en handsbredd, rimligt för en']],
      [['vikt i en fjäder!']]
    ]);
    tanke(bR1);
    xeAmp = placeString('Svar: 15 cm', padL, y, s, F, acts);
    underline(xeAmp, y);
    stepEnd();

    /* ---- b) svängningstiden ---- */
    y += adv + 1.2 * F;
    var bF2 = bubble(140, bubbleTop(y - adv - 0.5 * F), bw, [
      [['Perioden sitter i vinkel-']],
      [['hastigheten. Jag löser ut ', 0], ['T', 1], [' ur', 0]],
      [['sambandet mellan dem.']]
    ]);
    tanke(bF2);
    placeString('b) Vinkelhastighet och period', padL, y,
                s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.1 * F;
    var xb = placeString('ω=', padL, y, s, F, acts);
    xb = fracH('2π', 'T', xb, y);
    xb = placeString('⟺T=', xb + 0.12 * F, y, s, F, acts);
    fracH('2π', 'ω', xb, y);
    stepEnd();

    /* ---- mätvärdesklammern DIREKT under formeln (se REGEL) ---- */
    y += adv + 1.3 * F;
    var bK2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Jämförelsen i a) gav också']],
      [['vinkelhastigheten: talet']],
      [['framför ', 0], ['t', 1], [' inne i sinus.', 0]]
    ]);
    tanke(bK2);
    var klam2 = valueBracket(acts, ['ω=10 rad/s'], padL, y, s, F);
    stepEnd();
    y = klam2.yEnd;

    y += adv + 1.3 * F;
    var bI2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdet ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI2);
    var xi2 = placeString('T=', padL, y, s, F, acts);
    var xe2 = fracH('2π', '10', xi2, y);
    var xIns2 = placeString('=0,628... s', xe2 + 0.15 * F, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL): fortsättning på samma rad om den ryms */
    var bAvr2 = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Först nu avrundar jag. Talen']],
      [['i sambandet har två']],
      [['värdesiffror: svaret får två.']]
    ]);
    tanke(bAvr2);
    var avrB = '≈0,63 s';
    if (xIns2 + stringAdvance(avrB, s, F) < PAPER_W - 6) {
      placeString(avrB, xIns2, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;
      placeString(avrB, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.0 * F;
    var bR2 = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Drygt en halv sekund per']],
      [['svängning. Det ser ut som en']],
      [['fjäder som guppar, rimligt!']]
    ]);
    tanke(bR2);
    var xeB = placeString('Svar: 0,63 s', padL, y, s, F, acts);
    underline(xeB, y);
    stepEnd();

    /* ---- c) hastigheten som funktion av tiden ---- */
    y += adv + 1.2 * F;
    var bF3 = bubble(140, bubbleTop(y - adv), bw, [
      [['Hastigheten är hur snabbt läget']],
      [['ändras: derivatan av ', 0], ['y', 1]],
      [['Glöm inte den inre derivatan!']]
    ]);
    tanke(bF3);
    placeString('c) Derivera läget', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.7 * F;
    placeString("v=y'=10·0,15 cos(10t)", padL, y, s, F, acts);
    stepEnd();

    y += adv;
    var bC2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Faktorerna framför cosinus']],
      [['slås ihop.']]
    ]);
    tanke(bC2);
    placeString('=1,5 cos(10t)', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR3 = bubble(120, bubbleTop(y - adv), bw, [
      [['Cosinus är 1 i jämviktsläget']],
      [['och 0 i vändlägena. Precis så']],
      [['rör sig en fjädervikt!']]
    ]);
    tanke(bR3);
    var xeC = placeString('Svar: v=1,5 cos(10t) m/s', padL, y, s, F, acts);
    underline(xeC, y);
    stepEnd();

    /* ---- d) maximala farten ---- */
    y += adv + 1.2 * F;
    var bF4 = bubble(140, bubbleTop(y - adv), bw, [
      [['Farten är störst när cosinus är']],
      [['som störst, alltså 1. Det sker']],
      [['i jämviktsläget.']]
    ]);
    tanke(bF4);
    placeString('d) Farten är störst då cos(10t)=1', padL, y,
                s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.7 * F;
    placeString('v_m_a_x=1,5·1=1,5 m/s', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR4 = bubble(120, bubbleTop(y - adv), bw, [
      [['1,5 m/s är gånghastighet.']],
      [['Rimligt för en vikt som guppar']],
      [['15 cm åt vardera hållet!']]
    ]);
    tanke(bR4);
    var xeD = placeString('Svar: 1,5 m/s', padL, y, s, F, acts);
    underline(xeD, y);
    stepEnd();

    /* ---- e) accelerationen som funktion av tiden ---- */
    y += adv + 1.2 * F;
    var bF5 = bubble(140, bubbleTop(y - adv), bw, [
      [['Accelerationen är hur snabbt']],
      [['hastigheten ändras. Det är']],
      [['derivatan av ', 0], ['v', 1]]
    ]);
    tanke(bF5);
    placeString('e) Derivera hastigheten', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 1.7 * F;
    placeString("a=v'=−10·1,5 sin(10t)", padL, y, s, F, acts);
    stepEnd();

    y += adv;
    var bE2 = bubble(140, bubbleTop(y - adv), bw, [
      [['Faktorerna framför sinus slås']],
      [['ihop.']]
    ]);
    tanke(bE2);
    placeString('=−15 sin(10t)', padL, y, s, F, acts);
    stepEnd();

    y += adv + 0.9 * F;
    var bR5 = bubble(120, bubbleTop(y - adv), bw, [
      [['Minustecknet betyder att']],
      [['accelerationen alltid pekar mot']],
      [['jämviktsläget. Så måste det vara']],
      [['i en svängning!']]
    ]);
    tanke(bR5);
    var xeE = placeString('Svar: a=−15 sin(10t) m/s^2', padL, y, s, F, acts);
    underline(xeE, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: periodtid i fjäder (fy2-2.4 Ex 1) -----------
   * En 100-gramsvikt förlänger fjädern 9,0 cm; den dras ned ytterligare
   * 5,0 cm och släpps. Periodtiden söks. Figuren är samma fjäderfigur som
   * i 2.1: tak, fjäder, vikt och två streckade nivåer med förlängningen
   * måttsatt, plus neddragningen. Poängen är att AMPLITUDEN inte behövs —
   * perioden beror bara på massan och fjäderkonstanten (bubblan säger
   * det). Fjäderkonstanten är inte given och beräknas därför som en
   * deluträkning PÅ SIN RAD INUTI klammern med Hookes lag och enheter vid
   * varje tal (se REGEL KLAMMERN KOMMER DIREKT UNDER FORMELN); raden är
   * lång, så klammern skrivs i 0,7-skala. */
  function layoutPeriodfjader(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 300;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function arrow(p1, p2, color) {
      line(p1, p2, color);
      arrowHead(p2[0], p2[1], p1[0], p1[1], 10, color);
    }
    function rect(x0, y0, x1, y1) {
      line([x0, y0], [x1, y0]);
      line([x1, y0], [x1, y1]);
      line([x1, y1], [x0, y1]);
      line([x0, y1], [x0, y0]);
    }
    function measureV(x, yA, yB, color) {
      line([x, yA + 5], [x, yB - 5], color);
      arrowHead(x, yA, x, yA + 18, 9, color);
      arrowHead(x, yB, x, yB - 18, 9, color);
    }
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      placeString(numS, x0 + (w - nw) / 2, ybar - 0.14 * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + 1.04 * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: 7 px/cm, 9,0 cm förlängning = 63 px --- */
    var fx = 240, takY = 56;
    var endU = 100;                           /* fjäderns slut UTAN vikt */
    var endL = 163;                           /* jämviktsläget med vikten */

    /* ---- steg 1: rita det vi vet — tak, fjäder, vikt, nivålinjer ---- */
    var b1 = figurBubble(266, [
      [['Ritar taket, fjädern och vikten.']],
      [['Utan vikt slutar fjädern vid den']],
      [['övre streckade linjen.']]
    ]);
    tanke(b1);
    line([150, takY], [330, takY]);           /* taket */
    for (var hx = 158; hx <= 330; hx += 16) {
      line([hx, takY], [hx - 8, takY - 9]);   /* skraffering */
    }
    pause(140);
    (function () {                            /* fjädern i EN penndragning */
      var n = 7, yTop = takY + 6, yBot = endL - 6;
      var step = (yBot - yTop) / (2 * n);
      var pts = [[fx, takY], [fx, yTop]];
      for (var k = 1; k <= 2 * n - 1; k++) {
        pts.push([fx + (k % 2 ? 13 : -13), yTop + k * step]);
      }
      pts.push([fx, yBot]);
      pts.push([fx, endL]);
      acts.push({ kind: 'stroke', pts: pts });
    })();
    pause(140);
    rect(fx - 14, endL, fx + 14, endL + 28);  /* vikten */
    pause(140);
    dash([fx + 16, endU], [340, endU]);
    dash([fx + 16, endL], [340, endL]);
    pause(140);
    placeString('utan vikt', 358, 94, s * 0.55, F * 0.55, acts);
    placeString('jämviktsläge', 358, 167, s * 0.55, F * 0.55, acts);
    stepEnd();

    /* ---- steg 2: annoteringar — massan, förlängningen, neddragningen -- */
    var b2 = figurBubble(268, [
      [['Skriver in det jag vet: 100 g']],
      [['förlänger fjädern 9,0 cm, och']],
      [['sedan dras vikten ned 5,0 cm.']]
    ]);
    tanke(b2);
    placeString('m=100 g', 96, 184, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    measureV(334, endU, endL, BLUE);
    placeString('Δl=9,0 cm', 346, 126, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    arrow([fx - 18, endL + 34], [fx - 18, endL + 69], BLUE);
    dash([fx + 16, endL + 70], [340, endL + 70]);
    placeString('A=5,0 cm', 348, endL + 75, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- periodtiden ---- */
    var y = 372;
    var adv = 1.7 * F;
    var bw = 292;

    var bF = bubble(120, bubbleTop(292), bw, [
      [['Perioden beror bara på massan']],
      [['och fjäderkonstanten. Ampli-']],
      [['tuden 5,0 cm behövs alltså inte']],
      [['alls!']]
    ]);
    tanke(bF);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('Periodtid för vikt i fjäder', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.35 * F;                            /* formeln har rot + bråk */
    var xx = placeString('T=2π', padL, y, s, F, acts);
    var nw = stringAdvance('m', s, F), dw = stringAdvance('k', s, F);
    var fw = Math.max(nw, dw) + 0.3 * F;
    var xs = rootSign(acts, xx, y, fw, F,
                      { yTop: y - 1.55 * F, yBot: y + 1.3 * F });
    fracH('m', 'k', xs, y);
    stepEnd();

    /* ---- mätvärdesklammern DIREKT under formeln (se REGEL): fjäder-
     * konstanten är inte given och räknas ut på sin rad i klammern med
     * Hookes lag, med enheter vid varje tal. Raden är lång → 0,7-skala. */
    y += adv + 1.5 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Fjäderkonstanten är inte given.']],
      [['Den räknas ut direkt i klammern']],
      [['med Hookes lag: kraften på']],
      [['fjädern är viktens tyngd.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, [
      'm=100 g=0,100 kg',
      ['k=', { frac: ['m·g', 'Δl'] }, '=',
       { frac: ['0,100 kg·9,82 N/kg', '0,090 m'] }, '=10,911... N/m']
    ], padL, y, s, F, { rs: 0.7 });
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.6 * F;
    var bI = bubble(140, bubbleTop(y - adv - 0.2 * F), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln. Fjäder-']],
      [['konstanten tar jag oavrundad.']]
    ]);
    tanke(bI);
    var xi = placeString('T=2π', padL, y, s, F, acts);
    var nw2 = stringAdvance('0,100', s, F),
        dw2 = stringAdvance('10,911...', s, F);
    var fw2 = Math.max(nw2, dw2) + 0.3 * F;
    var xs2 = rootSign(acts, xi, y, fw2, F,
                       { yTop: y - 1.55 * F, yBot: y + 1.3 * F });
    var xe = fracH('0,100', '10,911...', xs2, y);
    var xIns = placeString('=0,601... s', xe, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL): fortsättning på samma rad om den ryms */
    var bAvr = bubble(140, bubbleTop(y + 1.35 * F), bw, [
      [['Först nu avrundar jag.']],
      [['Förlängningen 9,0 cm har två']],
      [['värdesiffror: svaret får två.']]
    ]);
    tanke(bAvr);
    var avrS = '≈0,60 s';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.0 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['En liten vikt i en mjuk fjäder']],
      [['guppar ungefär två gånger i']],
      [['sekunden. Rimligt!']]
    ]);
    tanke(bR);
    var xeS = placeString('Svar: 0,60 s', padL, y, s, F, acts);
    underline(xeS, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: massa för given period (fy2-2.4 Ex 2) -------
   * En fjäder med k = 0,14 kN/m ska svänga med perioden 0,20 s — hur stor
   * massa? Formeln kvadreras och massan löses ut (omskrivningen skrivs i
   * FORTSÄTTNING på samma rad med ⟺, se REGEL). Massan är den SÖKTA
   * storheten och skrivs därför i figuren med enbart sin beteckning. */
  function layoutMassafjader(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 290;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function arrow(p1, p2, color) {
      line(p1, p2, color);
      arrowHead(p2[0], p2[1], p1[0], p1[1], 10, color);
    }
    function rect(x0, y0, x1, y1) {
      line([x0, y0], [x1, y0]);
      line([x1, y0], [x1, y1]);
      line([x1, y1], [x0, y1]);
      line([x0, y1], [x0, y0]);
    }
    /* nämnare MED EXPONENT (4π²) skrivs en aning lägre (exponenten reser
     * sig 0,56·F över nämnarens baslinje och nuddar annars bråkstrecket),
     * och en täljare med NEDSTAPEL (g, y, j, p) lyfts på samma sätt —
     * annars går g:ets svans rakt igenom divisionsstrecket */
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      var dy = /\^/.test(denS) ? 1.26 : 1.04;
      var ny = /[gyjp]/.test(numS) ? -0.36 : -0.14;
      placeString(numS, x0 + (w - nw) / 2, ybar + ny * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + dy * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri --- */
    var fx = 240, takY = 56, endL = 168;

    /* ---- steg 1: rita det vi vet — tak, fjäder, vikt ---- */
    var b1 = figurBubble(266, [
      [['Ritar taket, fjädern och den']],
      [['vikt som ska hängas i den.']]
    ]);
    tanke(b1);
    line([150, takY], [330, takY]);
    for (var hx = 158; hx <= 330; hx += 16) {
      line([hx, takY], [hx - 8, takY - 9]);
    }
    pause(140);
    (function () {
      var n = 7, yTop = takY + 6, yBot = endL - 6;
      var step = (yBot - yTop) / (2 * n);
      var pts = [[fx, takY], [fx, yTop]];
      for (var k = 1; k <= 2 * n - 1; k++) {
        pts.push([fx + (k % 2 ? 13 : -13), yTop + k * step]);
      }
      pts.push([fx, yBot]);
      pts.push([fx, endL]);
      acts.push({ kind: 'stroke', pts: pts });
    })();
    pause(140);
    rect(fx - 14, endL, fx + 14, endL + 28);
    stepEnd();

    /* ---- steg 2: annoteringar (blått) ---- */
    var b2 = figurBubble(272, [
      [['Skriver in fjäderkonstanten och']],
      [['perioden. Massan ', 0], ['m', 1], [' är det jag', 0]],
      [['söker, så den får bara sin']],
      [['beteckning.']]
    ]);
    tanke(b2);
    placeString('k=0,14 kN/m', 72, 118, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    placeString('m', fx - 40, endL + 22, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    arrow([304, endL + 2], [304, endL - 36], BLUE);      /* svänger upp */
    arrow([304, endL + 26], [304, endL + 64], BLUE);     /* och ner */
    placeString('T=0,20 s', 318, endL + 20, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* ---- massan ---- */
    var y = 368;
    var adv = 1.7 * F;
    var bw = 292;

    var bF = bubble(120, bubbleTop(284), bw, [
      [['Formeln för perioden innehåller']],
      [['massan. Jag ställer upp den och']],
      [['löser ut ', 0], ['m', 1]]
    ]);
    tanke(bF);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('Periodtid för vikt i fjäder', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.35 * F;
    var xx = placeString('T=2π', padL, y, s, F, acts);
    var nw = stringAdvance('m', s, F), dw = stringAdvance('k', s, F);
    var fw = Math.max(nw, dw) + 0.3 * F;
    var xs = rootSign(acts, xx, y, fw, F,
                      { yTop: y - 1.55 * F, yBot: y + 1.3 * F });
    fracH('m', 'k', xs, y);
    stepEnd();

    /* OMSKRIVNING MED EKVIVALENSPIL (se REGEL): kvadreringen och
     * utlösningen ryms på samma rad */
    y += adv + 1.3 * F;
    var bQ = bubble(140, bubbleTop(y - adv - 0.4 * F), bw, [
      [['Massan sitter under ett']],
      [['rottecken. Jag kvadrerar båda']],
      [['led för att få bort roten, och']],
      [['löser sedan ut ', 0], ['m', 1]]
    ]);
    tanke(bQ);
    placeString('Kvadrera båda led', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    var xq = placeString('T^2=4π^2·', padL, y, s, F, acts);
    xq = fracH('m', 'k', xq, y);
    xq = placeString('⟺m=', xq + 0.12 * F, y, s, F, acts);
    fracH('T^2·k', '4π^2', xq, y);
    stepEnd();

    /* ---- mätvärdesklammern DIREKT under formeln (se REGEL) ---- */
    y += adv + 1.5 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Fjäderkonstanten görs om till']],
      [['newton per meter i klammern.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, ['T=0,20 s', 'k=0,14 kN/m=140 N/m'],
                            padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.5 * F;
    var bI = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI);
    var xi = placeString('m=', padL, y, s, F, acts);
    var xe = fracH('0,20^2·140', '4π^2', xi, y);
    var xIns = placeString('=0,141... kg', xe + 0.15 * F, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL) */
    var bAvr = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Först nu avrundar jag. Både']],
      [['0,20 s och 0,14 kN/m har två']],
      [['värdesiffror: svaret får två.']]
    ]);
    tanke(bAvr);
    var avrS = '≈0,14 kg=140 g';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.0 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['En styv fjäder och en lätt vikt']],
      [['ger snabba svängningar. Fem']],
      [['svängningar i sekunden,']],
      [['rimligt!']]
    ]);
    tanke(bR);
    var xeS = placeString('Svar: 0,14 kg (140 g)', padL, y, s, F, acts);
    underline(xeS, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ---------------- scen: sekundpendeln (fy2-2.5 Ex 1) ----------------
   * Hur lång är en pendel där tiden mellan vändlägena är 1,00 s? Figuren
   * följer teorins pendelfigur: tak med skraffering, snöre, kula och en
   * streckad cirkelbåge med de två vändlägena. Periodtiden är ett HÄRLETT
   * MÅTT (1,00 s är bara en HALV period) och motiveras därför med en kort
   * anteckning i fri yta bredvid figuren INNAN den används (se REGEL).
   * Formeln kvadreras och pendellängden löses ut på samma rad med ⟺. */
  function layoutSekundpendel(cfg, F) {
    var s = F / 100;
    var acts = [];
    var padL = 30;

    function pause(ms) { acts.push({ kind: 'pause', ms: ms }); }
    function line(p1, p2, color) {
      acts.push({ kind: 'stroke', pts: humanize([p1, p2]), color: color || null });
    }
    function dashPts(pts) {                   /* streckad kurva ur punktlista */
      for (var i = 0; i + 1 < pts.length; i += 2) {
        line(pts[i], pts[i + 1]);
      }
    }
    function dash(p1, p2) {
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var L = Math.hypot(dx, dy) || 1;
      var n = Math.max(2, Math.round(L / 14));
      for (var i = 0; i < n; i++) {
        var t0 = i / n, t1 = t0 + 0.55 / n;
        line([p1[0] + dx * t0, p1[1] + dy * t0],
             [p1[0] + dx * t1, p1[1] + dy * t1]);
      }
    }
    function bubble(x, y, w, lines) {
      return { bubble: 1, x: x, y: y, w: w, lines: lines, wins: [] };
    }
    var FIGB_Y = 300;
    function figurBubble(w, lines) { return bubble(120, FIGB_Y, w, lines); }
    function stepEnd() { pause(240); acts.push({ kind: 'lineEnd' }); pause(320); }
    function tanke(b) {
      acts.push({ kind: 'show', obj: b });
      stepEnd();
      acts.push({ kind: 'hide', obj: b });
      pause(300);
    }
    function underline(xEnd, y) {
      pause(220);
      acts.push({ kind: 'stroke',
        pts: underlinePts(padL - 2, xEnd - 0.10 * F, y, F) });
    }
    function arrowHead(tipX, tipY, fromX, fromY, len, color) {
      var dx = tipX - fromX, dy = tipY - fromY;
      var L = Math.hypot(dx, dy) || 1;
      dx /= L; dy /= L;
      var a = 28 * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
      line([tipX - (dx * ca - dy * sa) * len, tipY - (dx * sa + dy * ca) * len],
           [tipX, tipY], color);
      line([tipX - (dx * ca + dy * sa) * len, tipY - (-dx * sa + dy * ca) * len],
           [tipX, tipY], color);
    }
    function ring(cx, cy, r, color) {         /* liten öppen cirkel */
      var pts = [];
      for (var i = 0; i <= 11; i++) {
        var a = -1.2 + (i / 11) * Math.PI * 2.12;
        pts.push([cx + Math.cos(a) * (r + rnd(-0.7, 0.7)),
                  cy + Math.sin(a) * (r + rnd(-0.7, 0.7))]);
      }
      acts.push({ kind: 'stroke', pts: pts, color: color || null });
    }
    /* nämnare MED EXPONENT (4π²) skrivs en aning lägre (exponenten reser
     * sig 0,56·F över nämnarens baslinje och nuddar annars bråkstrecket),
     * och en täljare med NEDSTAPEL (g, y, j, p) lyfts på samma sätt —
     * annars går g:ets svans rakt igenom divisionsstrecket */
    function fracH(numS, denS, x0, yb) {
      var ybar = yb - 0.34 * F;
      var nw = stringAdvance(numS, s, F), dw = stringAdvance(denS, s, F);
      var w = Math.max(nw, dw) + 0.3 * F;
      var dy = /\^/.test(denS) ? 1.26 : 1.04;
      var ny = /[gyjp]/.test(numS) ? -0.36 : -0.14;
      placeString(numS, x0 + (w - nw) / 2, ybar + ny * F, s, F, acts);
      pause(130);
      acts.push({ kind: 'stroke', pts: humanize([[x0, ybar], [x0 + w, ybar]]) });
      pause(130);
      placeString(denS, x0 + (w - dw) / 2, ybar + dy * F, s, F, acts);
      return x0 + w + 1.5;
    }
    function bubbleTop(prevBase) { return prevBase + 0.28 * F + 33; }

    /* --- figurens geometri: fäste (236, 52), snöre 152 px, utslag 26° --- */
    var px = 236, py = 52, PL = 152;
    var vin = 26 * Math.PI / 180;
    var bob = [px, py + PL];
    var vL = [px - PL * Math.sin(vin), py + PL * Math.cos(vin)];
    var vR = [px + PL * Math.sin(vin), py + PL * Math.cos(vin)];

    /* ---- steg 1: rita pendeln (grafit) ---- */
    var b1 = figurBubble(268, [
      [['Ritar pendeln: fästet i taket,']],
      [['snöret och kulan. Den streckade']],
      [['bågen visar hur kulan svänger']],
      [['mellan vändlägena.']]
    ]);
    tanke(b1);
    line([px - 90, py], [px + 90, py]);       /* taket */
    for (var hx = px - 82; hx <= px + 90; hx += 16) {
      line([hx, py], [hx - 8, py - 9]);       /* skraffering */
    }
    pause(140);
    line([px, py], bob);                      /* snöret i lodläget */
    acts.push({ kind: 'stroke', pts: dotPts(px, py) });
    ring(bob[0], bob[1], 10);                 /* kulan */
    acts.push({ kind: 'stroke', pts: dotPts(bob[0], bob[1]) });
    pause(140);
    dash([px, py], vL);                       /* vändlägena */
    dash([px, py], vR);
    ring(vL[0], vL[1], 9);
    ring(vR[0], vR[1], 9);
    pause(140);
    (function () {                            /* streckad cirkelbåge */
      var pts = [];
      for (var i = 0; i <= 28; i++) {
        var a = -vin + (i / 28) * 2 * vin;
        pts.push([px + Math.sin(a) * (PL + 16) + rnd(-0.8, 0.8),
                  py + Math.cos(a) * (PL + 16) + rnd(-0.8, 0.8)]);
      }
      dashPts(pts);
    })();
    stepEnd();

    /* ---- steg 2: annoteringar (blått) + härlett mått (grafit) ---- */
    var b2 = figurBubble(272, [
      [['Tiden 1,00 s gäller från det ena']],
      [['vändläget till det andra.']],
      [['Pendellängden ', 0], ['l', 1], [' är det jag', 0]],
      [['söker.']]
    ]);
    tanke(b2);
    placeString('l', px + 12, py + 84, s * 0.55, F * 0.55, acts, BLUE);
    pause(160);
    /* måttpil längs bågen mellan vändlägena, med spets i båda ändar */
    (function () {
      var pts = [];
      for (var i = 0; i <= 16; i++) {
        var a = -vin * 0.86 + (i / 16) * 1.72 * vin;
        pts.push([px + Math.sin(a) * (PL + 34), py + Math.cos(a) * (PL + 34)]);
      }
      for (var k = 0; k + 1 < pts.length; k++) line(pts[k], pts[k + 1], BLUE);
      arrowHead(pts[0][0], pts[0][1], pts[2][0], pts[2][1], 9, BLUE);
      arrowHead(pts[16][0], pts[16][1], pts[14][0], pts[14][1], 9, BLUE);
    })();
    placeString('1,00 s', px - 26, py + PL + 62, s * 0.55, F * 0.55, acts, BLUE);
    stepEnd();

    /* HÄRLETT MÅTT (se REGEL): periodtiden står inte i uppgiften —
     * motiveras med en anteckning i fri yta bredvid figuren */
    var b3 = figurBubble(276, [
      [['Ena vändläget till det andra är']],
      [['bara en HALV svängning. Hela']],
      [['perioden är dubbelt så lång.']]
    ]);
    tanke(b3);
    placeString('Halva perioden: 1,00 s', 424, 116, s * 0.62, F * 0.62, acts);
    placeString('T=2·1,00=2,00 s', 424, 146, s * 0.62, F * 0.62, acts);
    stepEnd();

    /* ---- pendellängden ---- */
    var y = 372;
    var adv = 1.7 * F;
    var bw = 292;

    var bF = bubble(120, bubbleTop(292), bw, [
      [['Formeln för pendelns periodtid']],
      [['innehåller pendellängden.']],
      [['Massan spelar ingen roll!']]
    ]);
    tanke(bF);
    /* INLEDANDE MOTIVERING (se REGEL): rubrik + formel i SAMMA steg */
    placeString('Matematisk pendel', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.35 * F;
    var xx = placeString('T=2π', padL, y, s, F, acts);
    var nw = stringAdvance('l', s, F), dw = stringAdvance('g', s, F);
    var fw = Math.max(nw, dw) + 0.3 * F;
    var xs = rootSign(acts, xx, y, fw, F,
                      { yTop: y - 1.55 * F, yBot: y + 1.3 * F });
    fracH('l', 'g', xs, y);
    stepEnd();

    /* OMSKRIVNING MED EKVIVALENSPIL (se REGEL) */
    y += adv + 1.3 * F;
    var bQ = bubble(140, bubbleTop(y - adv - 0.4 * F), bw, [
      [['Längden sitter under ett']],
      [['rottecken. Jag kvadrerar båda']],
      [['led för att få bort roten, och']],
      [['löser sedan ut ', 0], ['l', 1]]
    ]);
    tanke(bQ);
    placeString('Kvadrera båda led', padL, y, s * 0.62, F * 0.62, acts);
    pause(300);
    y += 2.0 * F;
    var xq = placeString('T^2=4π^2·', padL, y, s, F, acts);
    xq = fracH('l', 'g', xq, y);
    xq = placeString('⟺l=', xq + 0.12 * F, y, s, F, acts);
    fracH('T^2·g', '4π^2', xq, y);
    stepEnd();

    /* ---- mätvärdesklammern DIREKT under formeln (se REGEL) ---- */
    y += adv + 1.5 * F;
    var bK = bubble(140, bubbleTop(y - adv), bw, [
      [['Periodtiden är dubbla tiden']],
      [['mellan vändlägena, precis som']],
      [['anteckningen vid figuren visar.']]
    ]);
    tanke(bK);
    var klam = valueBracket(acts, ['T=2·1,00 s=2,00 s', 'g≈9,82 m/s^2'],
                            padL, y, s, F);
    stepEnd();
    y = klam.yEnd;

    y += adv + 1.5 * F;
    var bI = bubble(140, bubbleTop(y - adv), bw, [
      [['Nu sätter jag in värdena ur']],
      [['klammern i formeln.']]
    ]);
    tanke(bI);
    var xi = placeString('l=', padL, y, s, F, acts);
    var xe = fracH('2,00^2·9,82', '4π^2', xi, y);
    var xIns = placeString('=0,9949... m', xe + 0.15 * F, y, s, F, acts);
    stepEnd();

    /* AVRUNDNING (se REGEL) */
    var bAvr = bubble(140, bubbleTop(y + 1.1 * F), bw, [
      [['Först nu avrundar jag. Tiden']],
      [['1,00 s har tre värdesiffror:']],
      [['svaret får tre.']]
    ]);
    tanke(bAvr);
    var avrS = '≈0,995 m=99,5 cm';
    if (xIns + stringAdvance(avrS, s, F) < PAPER_W - 6) {
      placeString(avrS, xIns, y, s, F, acts);
    } else {
      y += adv + 1.0 * F;
      placeString(avrS, padL, y, s, F, acts);
    }
    stepEnd();

    y += adv + 1.0 * F;
    /* RIMLIGHETSBEDÖMNING (se REGEL) före svarsraden */
    var bR = bubble(120, bubbleTop(y - adv + 0.32 * F), bw, [
      [['Ungefär en meter, som pendeln i']],
      [['ett golvur. Just så långa är de,']],
      [['och de tickar en gång i']],
      [['sekunden!']]
    ]);
    tanke(bR);
    var xeS = placeString('Svar: 99,5 cm', padL, y, s, F, acts);
    underline(xeS, y);
    stepEnd();

    return { acts: acts, contentW: 660, lastBase: y + 40, padL: padL };
  }

  /* ifylld prick: tät spiral inåt — ser ut som en ritad punkt */
  function dotPts(cx, cy) {
    var pts = [];
    for (var i = 0; i <= 11; i++) {
      var a = (i / 11) * Math.PI * 3.6 + rnd(-0.2, 0.2);
      var r = 3.4 - i * 0.22;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
  }

  /* handritad inringnings-ellips: punkter runt varvet med jitter */
  function ringPts(cx, cy, rx, ry) {
    var pts = [];
    for (var i = 0; i <= 13; i++) {
      var a = -0.6 + (i / 13) * Math.PI * 2.15;   /* börjar snett, överlapp */
      pts.push([cx + Math.cos(a) * (rx + rnd(-2, 2)),
                cy + Math.sin(a) * (ry + rnd(-1.5, 1.5))]);
    }
    return pts;
  }

  /* handritad ring LÄNGS en lutande sträcka (t.ex. en triangelsida):
   * ellipsen roteras till sträckans riktning. `off` förskjuter ringen
   * vinkelrätt (positivt = åt normalens håll) så att en etikett bredvid
   * sidan också ryms i ringen. Se REGEL (TRIGONOMETRISK UPPSTÄLLNING). */
  function ringAlongPts(p1, p2, ry, off) {
    var cx = (p1[0] + p2[0]) / 2, cy = (p1[1] + p2[1]) / 2;
    var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    var L = Math.hypot(dx, dy) || 1;
    var ux = dx / L, uy = dy / L, nx = uy, ny = -ux;
    cx += (off || 0) * nx; cy += (off || 0) * ny;
    var rx = L / 2 + 12;
    var pts = [];
    for (var i = 0; i <= 15; i++) {
      var a = -0.6 + (i / 15) * Math.PI * 2.15;
      var ex = Math.cos(a) * (rx + rnd(-2, 2));
      var ey = Math.sin(a) * (ry + rnd(-1.5, 1.5));
      pts.push([cx + ex * ux + ey * nx, cy + ex * uy + ey * ny]);
    }
    return pts;
  }

  /* ---------------- insättningsgest (se REGEL i filhuvudet) ----------
   * Ringen läggs runt ett textparti på en rad: x0/x1 = partiets vänstra
   * och högra kant, yBase = radens baslinje. `opt` = { ry, cy } när
   * partiet är högre än en vanlig rad (bråk, exponenter) eller sitter
   * på annan höjd (figuretiketter). */
  function ringBox(x0, x1, yBase, F, opt) {
    opt = opt || {};
    var ry = opt.ry != null ? opt.ry : 0.72 * F;
    var cy = opt.cy != null ? opt.cy : yBase - 0.40 * F;
    return ringPts((x0 + x1) / 2, cy, (x1 - x0) / 2 + 0.18 * F, ry);
  }

  /* Ritar insättningsgesten: en ring per box i ordning (först värdet/
   * värdena, sist uttrycket de sätts in i) med blåpennan, med en kort
   * paus mellan ringarna så att ögat hinner följa med. Returnerar
   * stroke-listan — fejda ut den med fadeRings() när den insatta raden
   * är skriven. box = [x0, x1, yBase, F, opt?]. */
  function substRings(acts, boxes) {
    var rings = [];
    boxes.forEach(function (b, i) {
      if (i) acts.push({ kind: 'pause', ms: 240 });
      var st = { kind: 'stroke', pts: ringBox(b[0], b[1], b[2], b[3], b[4]),
                 color: BLUE };
      acts.push(st);
      rings.push(st);
    });
    acts.push({ kind: 'pause', ms: 420 });
    return rings;
  }

  function fadeRings(acts, rings) {
    acts.push({ kind: 'pause', ms: 260 });
    rings.forEach(function (st) { acts.push({ kind: 'fade', ref: st }); });
  }

  /* Understrykning av svarsrader: en avlång "rektangel" med mycket låg
   * höjd — som när man ramar in svaret med två tätt liggande streck —
   * i stället för ett enkelt streck (uttryckligt önskemål 2026-07-29).
   * Ritas som EN obruten penndragning: topp → höger kortsida → botten →
   * vänster kortsida, tillbaka till start.
   *
   * ⚠️ Perimetern samplas JÄMNT (~16 px mellan punkterna) — dubblera
   * ALDRIG hörnpunkten för att få skarpt hörn. pathFrom() är en uniform
   * Catmull-Rom: kontrollpunkten i p1 är (p2 − p0)/6, så ett
   * nollängdssegment (hörnet två gånger) ger en kontrollpunkt som sticker
   * ut ~halva lådbredden/6 utanför hörnet, och kurvan gör en tydlig tagg
   * utanför lådan (syntes som ett utstick nere till vänster). Med jämnt
   * avstånd blir överslaget bara några px. Jittret per punkt är själva
   * poängen — strecket ska se handdraget ut. */
  function underlinePts(x0, x1, y, F) {
    var yTop = y + 0.26 * F, yBot = yTop + 0.15 * F;
    var horn = [[x0, yTop], [x1, yTop], [x1, yBot], [x0, yBot], [x0, yTop]];
    var steg = 16, pts = [];
    for (var i = 0; i < horn.length - 1; i++) {
      var a = horn[i], b = horn[i + 1];
      var n = Math.max(1, Math.round(
        Math.hypot(b[0] - a[0], b[1] - a[1]) / steg));
      for (var k = 0; k < n; k++) {
        var t = k / n;
        pts.push([a[0] + (b[0] - a[0]) * t + rnd(-0.55, 0.55),
                  a[1] + (b[1] - a[1]) * t + rnd(-0.45, 0.45)]);
      }
    }
    pts.push([x0 + rnd(-0.4, 0.4), yTop + rnd(-0.4, 0.4)]);
    return pts;
  }

  /* handritad "krullklammer" (överklammer): två pucklar med en spets i
   * mitten, som en vanlig klammer { roterad 90° och lagd ovanpå ett
   * uttryck. x0/x1 = klammerns fötter (på tecknens breddgräns), yTop =
   * fotnivå (strax ovanför tecknen), h = hur högt pucklarna/spetsen
   * reser sig ovanför yTop. Används för pedagogiska bas/höjd-etiketter. */
  function bracePts(x0, x1, yTop, h) {
    var w = x1 - x0, xm = (x0 + x1) / 2;
    var raw = [
      [x0, yTop],
      [x0 + w * 0.08, yTop - h * 0.65],
      [xm - w * 0.16, yTop - h * 0.92],
      [xm - w * 0.045, yTop - h * 0.7],
      [xm, yTop - h * 1.18],
      [xm + w * 0.045, yTop - h * 0.7],
      [xm + w * 0.16, yTop - h * 0.92],
      [x1 - w * 0.08, yTop - h * 0.65],
      [x1, yTop]
    ];
    return raw.map(function (p) {
      return [p[0] + rnd(-0.8, 0.8), p[1] + rnd(-0.8, 0.8)];
    });
  }

  /* ---------------- handen med pennan ----------------
   * Ritas i eget koordinatsystem med pennspetsen i (0,0).
   * Fingrar/handflata byggs av "kapslar": två <line> med runda ändar
   * ovanpå varandra (kant + hud) — ger konturerade rundade former. */
  var SKIN = '#eec6a2', SKINEDGE = '#c99b73';

  /* Rita en grupp kapslar i två pass: först alla konturer, sedan alla
   * hudfyllningar — inre konturer täcks och gruppen får EN silhuett. */
  function capsuleGroup(parent, parts) {
    parts.forEach(function (p) {
      el('line', { x1: p[0], y1: p[1], x2: p[2], y2: p[3], stroke: SKINEDGE,
                   'stroke-width': p[4] + 3, 'stroke-linecap': 'round' }, parent);
    });
    parts.forEach(function (p) {
      el('line', { x1: p[0], y1: p[1], x2: p[2], y2: p[3], stroke: SKIN,
                   'stroke-width': p[4], 'stroke-linecap': 'round' }, parent);
    });
  }

  function buildHand(scale) {
    var hand = el('g', { 'class': 'hk-hand' });
    var g = el('g', { transform: 'scale(' + scale + ')' }, hand);

    /* mycket diskret skugga under handen */
    el('ellipse', { cx: 82, cy: 22, rx: 54, ry: 19, fill: '#000',
                    opacity: 0.045 }, g);

    /* handmassa: handled + handflata + böjda fingrar som EN silhuett */
    capsuleGroup(g, [
      [98, 8, 152, 44, 46],     /* handled/arm */
      [58, -26, 94, 4, 54],     /* handflata  */
      [34, -6, 54, -17, 16],    /* långfinger (böjt) */
      [42, 3, 62, -9, 16],      /* ringfinger */
      [51, 12, 68, 1, 15]       /* lillfinger */
    ]);
    /* diskreta skiljelinjer mellan de böjda fingrarna */
    el('line', { x1: 40, y1: -13, x2: 47, y2: 0, stroke: SKINEDGE,
                 'stroke-width': 1.3, opacity: 0.55,
                 'stroke-linecap': 'round' }, g);
    el('line', { x1: 49, y1: -4, x2: 56, y2: 8, stroke: SKINEDGE,
                 'stroke-width': 1.3, opacity: 0.55,
                 'stroke-linecap': 'round' }, g);

    /* pennan — ritas längs +x i en grupp roterad -50° (upp åt höger).
     * Ligger OVANPÅ de böjda fingrarna men UNDER tumme + pekfinger.
     * Delarna sparas i hand._pencil så att pennan kan "bytas" till en
     * blåpenna när det som skrivs härnäst är blått. */
    var pg = el('g', { transform: 'rotate(-50)' }, g);
    var pTip = el('path', { d: 'M0 0 L9 -3 L9 3 Z', fill: '#4e4c48' }, pg); /* stift */
    el('path', { d: 'M9 -3 L23 -6.5 L23 6.5 L9 3 Z', fill: '#ead2a9',
                 stroke: '#c9a976', 'stroke-width': 0.7 }, pg);             /* trä */
    var pBarrel = el('rect', { x: 23, y: -6.5, width: 92, height: 13,
                 fill: '#e9a83f', stroke: '#c08624',
                 'stroke-width': 0.8 }, pg);                                /* skaft */
    var pHi = el('line', { x1: 24, y1: -2.2, x2: 115, y2: -2.2,
                 stroke: '#f6c56d', 'stroke-width': 2.2 }, pg);
    var pLo = el('line', { x1: 24, y1: 2.4, x2: 115, y2: 2.4,
                 stroke: '#c9882a', 'stroke-width': 2.2 }, pg);
    el('rect', { x: 115, y: -6.8, width: 9, height: 13.6, fill: '#b9bdc6' }, pg);
    el('rect', { x: 124, y: -6.2, width: 13, height: 12.4, rx: 5,
                 fill: '#e8a09b' }, pg);
    hand._pencil = { tip: pTip, barrel: pBarrel, hi: pHi, lo: pLo };

    /* greppet: tumme + pekfinger som EN silhuett ovanpå pennan */
    capsuleGroup(g, [
      [46, -14, 21, -16, 15],   /* tumme, korsar skaftet */
      [37, -52, 12, -28, 14]    /* pekfinger, vilar längs skaftets ovansida */
    ]);

    return hand;
  }

  /* Bara pennan, ingen hand (opts.hand === false): samma penna i samma
   * vinkel med spetsen i (0,0) — allt annat (rörelser, lyft, pennbyte)
   * fungerar oförändrat. Diskret liten skugga vid spetsen. */
  function buildPencil(scale) {
    var hand = el('g', { 'class': 'hk-hand' });
    var g = el('g', { transform: 'scale(' + scale + ')' }, hand);
    el('ellipse', { cx: 10, cy: 6, rx: 16, ry: 5, fill: '#000',
                    opacity: 0.05 }, g);
    var pg = el('g', { transform: 'rotate(-50)' }, g);
    var pTip = el('path', { d: 'M0 0 L9 -3 L9 3 Z', fill: '#4e4c48' }, pg);
    el('path', { d: 'M9 -3 L23 -6.5 L23 6.5 L9 3 Z', fill: '#ead2a9',
                 stroke: '#c9a976', 'stroke-width': 0.7 }, pg);
    var pBarrel = el('rect', { x: 23, y: -6.5, width: 92, height: 13,
                 fill: '#e9a83f', stroke: '#c08624',
                 'stroke-width': 0.8 }, pg);
    var pHi = el('line', { x1: 24, y1: -2.2, x2: 115, y2: -2.2,
                 stroke: '#f6c56d', 'stroke-width': 2.2 }, pg);
    var pLo = el('line', { x1: 24, y1: 2.4, x2: 115, y2: 2.4,
                 stroke: '#c9882a', 'stroke-width': 2.2 }, pg);
    el('rect', { x: 115, y: -6.8, width: 9, height: 13.6, fill: '#b9bdc6' }, pg);
    el('rect', { x: 124, y: -6.2, width: 13, height: 12.4, rx: 5,
                 fill: '#e8a09b' }, pg);
    hand._pencil = { tip: pTip, barrel: pBarrel, hi: pHi, lo: pLo };
    return hand;
  }

  /* ---------------- tankebubbla ----------------
   * "Det man tänker men inte skriver" — tryckt text i ett serietidnings-
   * moln (uttryckligt önskemål 2026-07-29): FÅ men STORA bulor med
   * KRAFTIG mörk kontur, och en svans av TRE krympande små cirklar mot
   * den som tänker.
   *
   * Texten sätts i SAMMA typsnitt som sidans brödtext (Poppins,
   * användarbeslut 2026-07-29) — inte i ett eget handskrivet typsnitt.
   *
   * KONTUREN RITAS SOM EN ENDA SAMMANHÄNGANDE BANA (unionen av bulorna),
   * och molnet har TRANSPARENT insida. Tidigare ritades bulorna som hela
   * cirklar som täcktes av vita fyllningscirklar + en vit rektangel bakom
   * texten; den vita ytan lade sig då ovanpå konturen där bulorna glesnade,
   * så molnkanten blev avkapad (påpekat 2026-07-29). Med en unionsbana
   * finns ingen övertäckande fyllning alls, och pappret (med sina rutor)
   * syns rakt igenom bubblan. Bulorna ligger i ett lager ÖVER handen. */
  var BUBBLE_FONT = "Poppins,system-ui,sans-serif";
  var BUBBLE_STEP = 36;         /* avstånd mellan bulornas medelpunkter */
  var BUBBLE_R = [20, 25];      /* bulradie — summan av två MÅSTE > STEP,
                                 * annars glappar unionen isär */
  /* marginal mellan molnREKTANGELN och arkkanten — molnbulorna sticker ut
   * upp till ~25 px (+ halva konturen) utanför rektangeln */
  var BUBBLE_EDGE = 30;
  function makeBubble(o) {
    var g = el('g', { opacity: 0 });
    o._g = g;
    buildBubble(o);
    return g;
  }

  /* Molnet ritas ur o.w — men textens faktiska bredd går bara att mäta
   * efter att svg:n hamnat i DOM:en. fitBubble() nedan mäter och bygger
   * om bubblan bredare om texten sticker ut. */
  function buildBubble(o) {
    var g = o._g;
    var lineH = 24, fs = 18;
    var h = o.lines.length * lineH + 18;   /* tight: ~10 px över/under */
    var cx = o.x + o.w / 2, cy = o.y + h / 2;
    /* INGEN svans: de tre krympande tankecirklarna är borttagna
     * (användarbeslut 2026-07-29). De pekade ut "den som tänker", men på
     * ett ark utan person fyllde de ingen funktion och var det som oftast
     * hamnade ovanpå figuren. Bubblorna har därför bara molnet. */
    /* molnbulor längs rektangelns kant — få och stora (seriestil).
     * ceil (inte round) på antalet: annars kan avståndet bli större än
     * BUBBLE_STEP så att två grannbulor inte skär varandra och konturen
     * glappar isär. */
    var bumps = [];
    function walkEdge(x1, y1, x2, y2) {
      var len = Math.hypot(x2 - x1, y2 - y1);
      var n = Math.max(1, Math.ceil(len / BUBBLE_STEP));
      for (var i = 0; i < n; i++) {
        bumps.push([x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n,
                    rnd(BUBBLE_R[0], BUBBLE_R[1])]);
      }
    }
    walkEdge(o.x, o.y, o.x + o.w, o.y);
    walkEdge(o.x + o.w, o.y, o.x + o.w, o.y + h);
    walkEdge(o.x + o.w, o.y + h, o.x, o.y + h);
    walkEdge(o.x, o.y + h, o.x, o.y);
    el('path', { d: cloudPath(bumps, cx, cy), fill: 'none', stroke: LABINK,
                 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    o._texts = [];
    /* raderna CENTRERAS i molnet (uttryckligt önskemål 2026-07-29) */
    o.lines.forEach(function (ln, i) {
      var t = el('text', { x: o.x + o.w / 2, y: o.y + 24 + lineH * i,
                           'text-anchor': 'middle',
                           'font-family': BUBBLE_FONT,
                           'font-size': fs, fill: LABINK }, g);
      ln.forEach(function (seg) {
        var sp = document.createElementNS(SVGNS, 'tspan');
        if (seg[1]) sp.setAttribute('font-style', 'italic');
        sp.textContent = seg[0];
        t.appendChild(sp);
      });
      o._texts.push(t);
    });
  }

  /* Molnkonturen = UNIONEN av bulorna, som EN bana: för varje bula ritas
   * bara bågen från skärningspunkten med föregående bula till skärnings-
   * punkten med nästa. De inre bågarna kommer alltså aldrig med, så
   * molnet behöver ingen övertäckande fyllning — insidan blir transparent
   * och konturen sammanhängande. Bulorna ligger medurs (topp → höger →
   * botten → vänster) i skärmens y-nedåt-system, så varje båge går medurs
   * (sweep-flagga 1). */
  function cloudPath(b, cx, cy) {
    var n = b.length, pts = [], i;
    for (i = 0; i < n; i++) pts.push(outerCross(b[i], b[(i + 1) % n], cx, cy));
    var d = 'M' + pts[n - 1][0].toFixed(1) + ' ' + pts[n - 1][1].toFixed(1);
    for (i = 0; i < n; i++) {
      var c = b[i], p0 = pts[(i + n - 1) % n], p1 = pts[i];
      var a0 = Math.atan2(p0[1] - c[1], p0[0] - c[0]);
      var a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
      var da = a1 - a0;
      while (da < 0) da += 2 * Math.PI;
      d += 'A' + c[2].toFixed(1) + ' ' + c[2].toFixed(1) + ' 0 ' +
           (da > Math.PI ? 1 : 0) + ' 1 ' +
           p1[0].toFixed(1) + ' ' + p1[1].toFixed(1);
    }
    return d + 'Z';
  }

  /* Den av två cirklars skärningspunkter som ligger LÄNGST från molnets
   * mitt (= den yttre). Skär de inte varandra faller punkten tillbaka på
   * radikallinjen, så banan hänger ihop även då. */
  function outerCross(c1, c2, cx, cy) {
    var dx = c2[0] - c1[0], dy = c2[1] - c1[1];
    var d = Math.hypot(dx, dy) || 1e-6;
    var ux = dx / d, uy = dy / d;
    var a = (d * d + c1[2] * c1[2] - c2[2] * c2[2]) / (2 * d);
    var hh = Math.sqrt(Math.max(0, c1[2] * c1[2] - a * a));
    var mx = c1[0] + a * ux, my = c1[1] + a * uy;
    var p1 = [mx - hh * uy, my + hh * ux];
    var p2 = [mx + hh * uy, my - hh * ux];
    return Math.hypot(p1[0] - cx, p1[1] - cy) >=
           Math.hypot(p2[0] - cx, p2[1] - cy) ? p1 : p2;
  }

  /* Mät den renderade texten och bygg om molnet så att det passar EXAKT
   * (12 px marginal per sida) — både bredare om texten sticker ut och
   * SMALARE om layoutens gissade bredd gav onödig luft (uttryckligt
   * önskemål 2026-07-29: så lite marginal runt texten som möjligt).
   * Kräver att svg:n redan ligger i DOM:en (getComputedTextLength).
   * Körs igen på document.fonts.ready eftersom fontbytet ändrar bredden. */
  function fitBubble(o, paperW) {
    if (!o._texts || !o._texts.length) return;
    var need = 0;
    o._texts.forEach(function (t) {
      var w = 0;
      try { w = t.getComputedTextLength(); } catch (e) { w = 0; }
      if (w > need) need = w;
    });
    if (!need) return;
    var want = Math.ceil(need) + 24;
    if (Math.abs(want - o.w) < 1) return;
    o.w = want;
    /* bubblan flyttas in i arket bara om den skulle sticka ut */
    if (o.x + o.w > paperW - BUBBLE_EDGE) {
      o.x = Math.max(8, paperW - BUBBLE_EDGE - o.w);
    }
    while (o._g.firstChild) o._g.removeChild(o._g.firstChild);
    buildBubble(o);
  }

  /* ---------------- tonande textnot (note-objekt) ----------------
   * En liten Poppins-etikett som tonar in vid ett moment och ut vid
   * nästa (show/hide, samma fönstermekanik som bubblorna) — utan moln.
   * Används t.ex. för "närliggande katet"/"hypotenusan" bredvid en
   * trig-kvot, se REGEL (TRIGONOMETRISK UPPSTÄLLNING). Ritas inte av
   * pennan; den "bara finns" som en påminnelse. */
  function makeNote(o) {
    var g = el('g', { opacity: 0 });
    var t = el('text', { x: o.x, y: o.y,
                         'text-anchor': o.anchor || 'middle',
                         'font-family': BUBBLE_FONT,
                         'font-size': o.fs || 16,
                         fill: o.color || BLUE }, g);
    t.textContent = o.text;
    return g;
  }

  /* ---------------- hjälplinjer vid punktplottning ----------------
   * Streckade linjer från punkten lodrätt till x-axeln och vågrätt till
   * y-axeln — tonar in när punkten prickas och ut när nästa prickas.
   * Ritas inte av handen (de är "tänkta" linjer), ligger UNDER handen. */
  function makeGuide(o) {
    var g = el('g', { opacity: 0 });
    if (Math.abs(o.px - o.ox) > 1) {         /* ingen linje ovanpå en axel */
      el('line', { x1: o.px, y1: o.py, x2: o.px, y2: o.oy, stroke: LABINK,
                   'stroke-width': 1.5, 'stroke-dasharray': '5 4',
                   opacity: 0.5 }, g);
    }
    if (Math.abs(o.py - o.oy) > 1) {
      el('line', { x1: o.px, y1: o.py, x2: o.ox, y2: o.py, stroke: LABINK,
                   'stroke-width': 1.5, 'stroke-dasharray': '5 4',
                   opacity: 0.5 }, g);
    }
    /* hjälpsiffror i handstil (förrenderade pennstreck, lite ljusare) */
    (o.labels || []).forEach(function (pts) {
      el('path', { d: pathFrom(pts), fill: 'none', stroke: INK,
                   'stroke-width': 2, 'stroke-linecap': 'round',
                   'stroke-linejoin': 'round', opacity: 0.78 }, g);
    });
    return g;
  }

  /* ---------------- linjal ----------------
   * Halvtransparent plastlinjal längs linjen som ska dras; överkanten
   * ligger exakt på linjen, kroppen under. */
  function makeRuler(o) {
    var ang = Math.atan2(o.y2 - o.y1, o.x2 - o.x1) * 180 / Math.PI;
    var len = Math.hypot(o.x2 - o.x1, o.y2 - o.y1);
    var g = el('g', { opacity: 0,
                      transform: 'translate(' + o.x1 + ' ' + o.y1 + ') ' +
                                 'rotate(' + ang.toFixed(2) + ')' });
    el('rect', { x: -26, y: 2, width: len + 52, height: 36, rx: 4,
                 fill: '#e9eff6', 'fill-opacity': 0.82,
                 stroke: '#8fa5bc', 'stroke-width': 1.2 }, g);
    for (var xx = -13.5, i = 0; xx <= len + 27; xx += 13.5, i++) {
      el('line', { x1: xx, y1: 3, x2: xx, y2: 3 + (i % 2 ? 6 : 10),
                   stroke: '#7b90a6', 'stroke-width': 1 }, g);
    }
    return g;
  }

  /* ---------------- "Utan tankar": filtrera bort bubbelstegen ----------
   * Tar bort varje tankebubblas steg ur aktlistan: från show till
   * motsvarande hide (inklusive steggränsen däremellan och pausen efter).
   * Bubbelsteg ritar inga streck (tanke()-mönstret garanterar det), så
   * strecklistan är identisk med och utan tankar — bara tidslinjen och
   * antalet klicksteg skiljer. */
  function actsUtanTankar(src) {
    var out = [];
    for (var i = 0; i < src.length; i++) {
      var a = src[i];
      if (a.kind === 'show' && a.obj && a.obj.bubble) {
        var j = i + 1;
        while (j < src.length &&
               !(src[j].kind === 'hide' && src[j].obj === a.obj)) j++;
        if (j + 1 < src.length && src[j + 1].kind === 'pause') j++;
        i = j;
        continue;
      }
      out.push(a);
    }
    return out;
  }

  /* ---------------- CSS (injiceras en gång) ---------------- */
  function injectCSS() {
    if (document.getElementById('hk-style')) return;
    /* bubbeltypsnittet (Patrick Hand — "snällt" handskrivet, med åäö)
     * laddas av widgeten själv så att det finns var den än monteras */
    if (!document.getElementById('hk-bubblefont')) {
      var lnk = document.createElement('link');
      lnk.id = 'hk-bubblefont';
      lnk.rel = 'stylesheet';
      lnk.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap';
      document.head.appendChild(lnk);
    }
    var st = document.createElement('style');
    st.id = 'hk-style';
    st.textContent =
      '.hk-wrap{max-width:760px;margin:0 auto;position:relative;' +
        'font-family:Poppins,system-ui,sans-serif}' +
      /* navpilar: stickande i vänster-/högerkanten vid halva skärmhöjden —
       * railen spänner hela widgeten, knappen är sticky i den så att den
       * följer med när man rullar (aldrig behöva rulla ned för att stega) */
      /* railen börjar under helskärmsknappen/inställningsrutan (uppe till
       * höger) — annars landar sticky-pilen ovanpå dem när widgeten ligger
       * högt upp i vyn (påpekat 2026-07-30) */
      '.hk-navrail{position:absolute;top:56px;bottom:0;pointer-events:none;z-index:6}' +
      '.hk-navrail.hk-left{left:2px}' +
      '.hk-navrail.hk-right{right:2px}' +
      /* max 26 px bred + 2 px kant: skriften börjar vid padL=30 — knappen
       * får inte nå in över radernas första tecken/svarsramen */
      '.hk-nav{position:sticky;top:calc(50vh - 26px);pointer-events:auto;' +
        'display:flex;align-items:center;justify-content:center;' +
        'width:26px;height:52px;border-radius:10px;background:' + PAPER + ';' +
        'border:1.5px solid rgba(15,22,32,.55);color:' + LABINK + ';' +
        'cursor:pointer;padding:0;opacity:.75;transition:background .15s,opacity .15s}' +
      '.hk-nav:hover{background:#efe8d8;opacity:1}' +
      '.hk-nav:disabled{opacity:.18;cursor:default}' +
      '.hk-nav:disabled:hover{background:' + PAPER + '}' +
      '.hk-paper{position:relative;border-radius:12px;overflow:hidden;cursor:pointer;' +
        'box-shadow:0 2px 10px rgba(15,22,32,.10),0 1px 3px rgba(15,22,32,.08);' +
        'border:1px solid rgba(15,22,32,.12);background:' + PAPER + '}' +
      '.hk-paper svg{display:block;width:100%;height:auto}' +
      '.hk-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}' +
      /* MOBIL: svg:n bredare än rutan + sidledsskroll med pennföljning —
       * annars krymper handskriften till oläslighet på smal skärm */
      '@media (max-width:600px){.hk-paper .hk-scroll svg{width:160%;max-width:none}}' +
      /* helskärmsknappen följer widgetens eget formspråk (samma kant,
       * botten och radie som hk-btn-knapparna) — diskret uppe till höger */
      '.hk-fsbtn{position:absolute;top:10px;right:10px;width:32px;height:32px;' +
        'border-radius:8px;background:' + PAPER + ';' +
        'border:1.5px solid rgba(15,22,32,.55);color:' + LABINK + ';' +
        'display:flex;align-items:center;justify-content:center;cursor:pointer;' +
        'padding:0;opacity:.75;transition:background .15s,opacity .15s;z-index:5}' +
      '.hk-fsbtn:hover{background:#efe8d8;opacity:1}' +
      '.hk-fsbtn svg{width:14px;height:14px}' +
      /* inställningsruta (tankebubblor på/av) — samma formspråk som
       * fs-knappen, direkt till vänster om den uppe till höger */
      '.hk-settings{position:absolute;top:10px;right:52px;z-index:5;' +
        'background:' + PAPER + ';border:1.5px solid rgba(15,22,32,.55);' +
        'border-radius:8px;padding:6px 12px;display:flex;flex-direction:column;' +
        'gap:3px;opacity:.9}' +
      '.hk-settings:hover{opacity:1}' +
      '.hk-settings label{display:flex;align-items:center;gap:6px;' +
        'font-size:12.5px;font-weight:600;color:' + LABINK + ';' +
        'cursor:pointer;white-space:nowrap;user-select:none}' +
      '.hk-settings input{accent-color:' + LABINK + ';margin:0;cursor:pointer}' +
      /* helskärm (presentation): arket fyller skärmens BREDD (stor text),
       * sidan rullar på höjden och följer pennan; knappraden ligger fast
       * i underkanten */
      '.hk-wrap:fullscreen,.hk-wrap:-webkit-full-screen{max-width:none;' +
        'background:linear-gradient(160deg,#f2ecdf,#e9e0cd);display:flex;' +
        'flex-direction:column;align-items:center;justify-content:flex-start;' +
        'padding:12px 12px 84px;overflow-y:auto;overflow-x:hidden}' +
      '.hk-wrap:fullscreen .hk-paper,.hk-wrap:-webkit-full-screen .hk-paper' +
        '{flex:0 0 auto}' +
      '.hk-wrap:fullscreen .hk-fsbtn,.hk-wrap:-webkit-full-screen .hk-fsbtn' +
        '{position:fixed;top:12px;right:12px}' +
      '.hk-wrap:fullscreen .hk-settings,.hk-wrap:-webkit-full-screen .hk-settings' +
        '{position:fixed;top:12px;right:56px}' +
      /* helskärm: railen fixeras mot skärmen (en absolut rail i den
       * rullande wrappen når bara första skärmhöjden — sticky-knappen
       * skulle fastna i railens botten efter en skärms rullning) */
      '.hk-wrap:fullscreen .hk-navrail,.hk-wrap:-webkit-full-screen .hk-navrail' +
        '{position:fixed}' +
      '.hk-wrap:fullscreen .hk-controls,.hk-wrap:-webkit-full-screen .hk-controls' +
        '{position:fixed;left:0;right:0;bottom:0;margin:0;padding:10px 18px;' +
        'justify-content:center;background:rgba(243,238,228,.93);' +
        'border-top:1px solid rgba(15,22,32,.15)}' +
      '.hk-controls{display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap}' +
      '.hk-btn{border:1.5px solid ' + LABINK + ';background:' + PAPER + ';color:' + LABINK + ';' +
        'border-radius:8px;padding:6px 18px;font-weight:600;font-size:14px;cursor:pointer;' +
        'font-family:inherit;transition:background .15s,color .15s}' +
      '.hk-btn:hover{background:#efe8d8}' +
      '.hk-btn:disabled{opacity:.4;cursor:default}' +
      '.hk-btn:disabled:hover{background:' + PAPER + '}' +
      '.hk-btn.hk-active,.hk-btn.hk-active:hover{background:' + LABINK + ';color:' + PAPER + '}' +
      '.hk-speed{display:flex;gap:4px;align-items:center;margin-left:auto}' +
      '.hk-speed-label{font-size:12.5px;color:rgba(15,22,32,.62);margin-right:2px}' +
      '.hk-sbtn{border:1.5px solid rgba(15,22,32,.35);background:' + PAPER + ';color:' + LABINK + ';' +
        'border-radius:7px;padding:3px 9px;font-weight:600;font-size:12.5px;cursor:pointer;' +
        'font-family:inherit}' +
      '.hk-sbtn.hk-active{background:' + LABINK + ';color:' + PAPER + ';border-color:' + LABINK + '}' +
      /* växeln "Med penna"/"Som text" ovanför arket (se mountAll) */
      '.hk-vyval{display:flex;gap:8px;align-items:center;margin:0 0 12px;flex-wrap:wrap}' +
      '.hk-vyval-label{font-size:12.5px;color:rgba(15,22,32,.62);margin-right:2px}';
    document.head.appendChild(st);
  }

  /* ---------------- piltangenter ----------------
   * Höger/vänster piltangent stegar fram/tillbaka i den SENAST ANVÄNDA
   * widgeten (hovring eller klick sätter ACTIVE) — flera widgets kan
   * ligga på samma sida, och utan aktiv-begreppet skulle alla stega
   * samtidigt. Formulärelement (radioknapparna!) behåller sina
   * piltangenter via target-filtret. */
  var ACTIVE = null;
  document.addEventListener('keydown', function (e) {
    if (!ACTIVE) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var tg = e.target;
    if (tg && /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName)) return;
    e.preventDefault();
    if (e.key === 'ArrowRight') ACTIVE.fwd(); else ACTIVE.back();
  });

  /* ---------------- mount ---------------- */
  var UID = 0;   /* unika radiogruppnamn (flera widgets per sida) */
  function mount(container, spec, opts) {
    opts = opts || {};
    var F = FSIZE;   /* alltid samma — se KONSEKVENT SKRIFTSTORLEK ovan */
    var speed = opts.speed || 1;
    injectCSS();

    var SCENES = { linjegraf: layoutLinjegraf, hage: layoutHage,
                   talmangd: layoutTalmangd, olikhet: layoutOlikhet,
                   negadd: layoutNegadd, negmult: layoutNegmult,
                   termometer: layoutTermometer, forkorta: layoutForkorta,
                   forlanga: layoutForlanga, jamfora: layoutJamfora,
                   samnamnare: layoutSamnamnare,
                   olikanamnare: layoutOlikanamnare, mgn: layoutMgn,
                   brakform: layoutBrakform, brakmult: layoutBrakmult,
                   faktorisera: layoutFaktorisera, brakdiv: layoutBrakdiv,
                   brakdel: layoutBrakdel, avrundning: layoutAvrundning,
                   vardesiffror: layoutVardesiffror,
                   decimaler: layoutDecimaler,
                   gungbrada: layoutGunga, skiftnyckel: layoutSkiftnyckel,
                   spett: layoutSpett, brada: layoutBrada,
                   karusell: layoutKarusell, lpskiva: layoutLpskiva,
                   vertikalcirkel: layoutVertikalcirkel,
                   slanggunga: layoutSlanggunga,
                   kastboll: layoutKastboll, kasthojd: layoutKasthojd,
                   fjader: layoutFjader, fjaderenergi: layoutFjaderenergi,
                   dampning: layoutDampning, harmonisk: layoutHarmonisk,
                   periodfjader: layoutPeriodfjader,
                   massafjader: layoutMassafjader,
                   sekundpendel: layoutSekundpendel };
    var L = (spec && !Array.isArray(spec) && SCENES[spec.typ])
      ? SCENES[spec.typ](spec, F) : layout(spec, F);

    /* svg är "skrivbordet": papperet + extra marginal höger/nedåt så att
     * handen får rum att sticka ut utanför papperskanten. Bredden är
     * ALLTID PAPER_W (samma ark för alla uppgifter) — annars renderas
     * skriften olika stort på skärmen (se KONSEKVENT SKRIFTSTORLEK). */
    var paperW = Math.max(L.contentW + 70, PAPER_W);
    var paperH = L.lastBase + 0.5 * F + 20;
    var W = paperW, H = paperH + 1.9 * F;   /* extra luft under sista raden */

    var wrap = document.createElement('div');
    wrap.className = 'hk-wrap';
    var paperDiv = document.createElement('div');
    paperDiv.className = 'hk-paper';
    paperDiv.title = 'Klicka för nästa steg';
    wrap.appendChild(paperDiv);

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H,
                          'aria-label': 'Handskriven lösning' });
    /* MOBIL: på smal skärm görs svg:n bredare än arket (media query i
     * injectCSS) och skrollas i sidled i en egen container — annars blir
     * handskriften för liten att läsa (användarönskemål 2026-07-30).
     * Skrollern ligger INUTI paperDiv så att de absoluta kontrollerna
     * (helskärm, tankar-rutan) inte följer med i sidledsskrollen.
     * Pennföljning i x-led: se render(); snapX() vid steggränser. */
    var scroller = document.createElement('div');
    scroller.className = 'hk-scroll';
    paperDiv.appendChild(scroller);
    scroller.appendChild(svg);
    /* vid steggräns: visa radens början — men står en tankebubbla framme
     * (t.ex. i den fria ytan till höger om figuren) centreras DEN i vyn,
     * annars läses steget utan sin bubbla på mobilen */
    function snapX() {
      if (scroller.scrollWidth - scroller.clientWidth < 8) return;
      var target = 0;
      for (var i = 0; i < objs.length; i++) {
        var o = objs[i];
        if (!o.bubble) continue;
        if (winOpacity(o.wins, tNow) > 0.5) {
          var scx = svg.clientWidth / W;
          target = Math.max(0, (o.x + (o.w || 200) / 2) * scx -
                               scroller.clientWidth / 2);
          break;
        }
      }
      scroller.scrollLeft = target;
    }

    /* defs: rutmönster + blyertsfilter */
    var defs = el('defs', null, svg);
    var pat = el('pattern', { id: 'hkGrid', width: 27, height: 27,
                              patternUnits: 'userSpaceOnUse' }, defs);
    el('path', { d: 'M27 0 H0 V27', fill: 'none', stroke: GRID,
                 'stroke-width': 1, opacity: 0.22 }, pat);
    var filt = el('filter', { id: 'hkPencil', x: '-5%', y: '-5%',
                              width: '110%', height: '110%' }, defs);
    el('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.9,
                         numOctaves: 2, seed: 7, result: 'n' }, filt);
    el('feDisplacementMap', { 'in': 'SourceGraphic', in2: 'n',
                              scale: 1.5 }, filt);

    el('rect', { x: 0, y: 0, width: W, height: H, fill: PAPER }, svg);
    el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#hkGrid)' }, svg);

    /* bläckgruppen: alla streck, dolda tills de "skrivs" */
    var inkG = el('g', { fill: 'none', stroke: INK, 'stroke-width': F * 0.062,
                         'stroke-linecap': 'round', 'stroke-linejoin': 'round',
                         opacity: 0.9, filter: 'url(#hkPencil)' }, svg);

    var strokes = [];
    L.acts.forEach(function (a) {
      if (a.kind !== 'stroke') return;
      var attrs = { d: pathFrom(a.pts) };
      if (a.color) attrs.stroke = a.color;
      a.path = el('path', attrs, inkG);
      strokes.push(a);
    });

    /* objekt i två lager: linjalen UNDER handen (handen ritar på den),
     * tankebubblorna ÖVER handen (får aldrig skymmas) */
    var objs = [];
    var rulerG = el('g', null, svg);
    var hand = (opts.hand === true) ? buildHand(F / 40) : buildPencil(F / 40);
    svg.appendChild(hand);
    var bubbleG = el('g', null, svg);
    L.acts.forEach(function (a) {
      if (a.kind !== 'show' || a.obj.el) return;
      a.obj.el = a.obj.bubble ? makeBubble(a.obj)
        : a.obj.note ? makeNote(a.obj)
        : a.obj.guide ? makeGuide(a.obj) : makeRuler(a.obj);
      ((a.obj.bubble || a.obj.note) ? bubbleG : rulerG).appendChild(a.obj.el);
      objs.push(a.obj);
    });

    /* container in i DOM före mätning (getTotalLength kräver rendering) */
    container.appendChild(wrap);
    objs.forEach(function (o) { if (o.bubble) fitBubble(o, paperW); });
    /* Poppins kan laddas asynkront — mät om när typsnittet är på plats
     * (fitBubble vidgar bara, så en extra körning är ofarlig). */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        objs.forEach(function (o) { if (o.bubble) fitBubble(o, paperW); });
      });
    }
    strokes.forEach(function (a) {
      a.len = a.path.getTotalLength();
      a.path.setAttribute('stroke-dasharray', (a.len + 2) + ' ' + (a.len + 2));
      a.path.setAttribute('stroke-dashoffset', a.len + 2);
    });

    /* ---------------- tidslinje ----------------
     * Byggs om när tankeläget växlas: "Utan tankar" använder en filtrerad
     * aktlista utan bubbelstegen. Strecken (DOM:en) är desamma i båda
     * lägena — bubbelsteg ritar inga streck — så bara tiderna görs om. */
    var DRAW = 0.155;    /* px per ms  (~155 px/s, behagligt tempo) */
    var LIFT = 0.55;     /* px per ms vid pennlyft */
    var SWEEP = 0.19;    /* px per ms vid torrsvep längs en figursträcka */
    var stegvis = opts.stegvis !== false;
    var tankar = opts.tankar === true;   /* standard: "Utan tankar" */
    var events = [];
    var boundaries = [];   /* tider där stegvis uppspelning pausar —
                              MUTERAS på plats (controllern delar referensen) */
    var TOTAL = 0;
    var startPos = [W / 2, H / 2];

    function buildTimeline(actsArr) {
      events = [];
      boundaries.length = 0;
      strokes.forEach(function (a) {
        a._t0 = Infinity; a._t1 = Infinity;
        a.fade0 = null; a.fade1 = null;
        a.path.removeAttribute('opacity');
      });
      objs.forEach(function (o) { o.wins.length = 0; });
      var t = 350;
      var pen = null;
      var drew = false;   /* skrevs något sedan förra steggränsen? */

      actsArr.forEach(function (a) {
        if (a.kind === 'lineEnd') {
          /* handen dras bort åt höger vid steggränsen så att den inte
           * skymmer det nyskrivna medan man läser — men bara om något
           * faktiskt skrevs (rena tankebubbel-steg lämnar handen i vila) */
          if (pen && drew) {
            var rest = [W + 40, Math.min(pen[1] + 60, H - 20)];
            events.push({ type: 'move', t0: t, t1: t + 550, from: pen, to: rest });
            t += 550;
            pen = rest;
          }
          boundaries.push(t);
          drew = false;
          return;
        }
        if (a.kind === 'show') { a.obj.wins.push([t, Infinity]); return; }
        if (a.kind === 'hide') {
          var wl = a.obj.wins;
          if (wl.length) wl[wl.length - 1][1] = t;
          return;
        }
        if (a.kind === 'fade') { a.ref.fade0 = t; a.ref.fade1 = t + 600; return; }
        if (a.kind === 'jump') {
          if (pen) {
            var jd = Math.hypot(a.to[0] - pen[0], a.to[1] - pen[1]);
            var jdur = Math.max(100, Math.min(520, jd / LIFT));
            events.push({ type: 'move', t0: t, t1: t + jdur, from: pen, to: a.to });
            t += jdur;
          }
          pen = a.to.slice();
          return;
        }
        if (a.kind === 'pause') {
          if (pen) { events.push({ type: 'wait', t0: t, t1: t + a.ms, at: pen }); }
          t += a.ms;
          return;
        }
        if (a.kind === 'sweep') {
          /* torrsvep: pennspetsen dras längs sträckan PÅ papperet men
           * lämnar inget bläck — pekgest som visar en sträcka i figuren */
          var sp = a.pts;
          var sLen = 0, cum = [0];
          for (var si = 1; si < sp.length; si++) {
            sLen += Math.hypot(sp[si][0] - sp[si - 1][0],
                               sp[si][1] - sp[si - 1][1]);
            cum.push(sLen);
          }
          if (pen) {
            var sd = Math.hypot(sp[0][0] - pen[0], sp[0][1] - pen[1]);
            if (sd > 1.5) {
              var sdur = Math.max(80, Math.min(480, sd / LIFT));
              events.push({ type: 'move', t0: t, t1: t + sdur,
                            from: pen, to: [sp[0][0], sp[0][1]] });
              t += sdur;
            }
          }
          var tdur = Math.max(260, sLen / SWEEP);
          events.push({ type: 'trace', t0: t, t1: t + tdur, pts: sp,
                        len: sLen, cum: cum,
                        to: [sp[sp.length - 1][0], sp[sp.length - 1][1]] });
          t += tdur;
          pen = [sp[sp.length - 1][0], sp[sp.length - 1][1]];
          return;
        }
        var start = [a.pts[0][0], a.pts[0][1]];
        var end = [a.pts[a.pts.length - 1][0], a.pts[a.pts.length - 1][1]];
        if (pen) {
          var d = Math.hypot(start[0] - pen[0], start[1] - pen[1]);
          if (d > 1.5) {
            var mdur = Math.max(80, Math.min(480, d / LIFT));
            events.push({ type: 'move', t0: t, t1: t + mdur, from: pen, to: start });
            t += mdur;
          }
        }
        var dur = Math.max(55, a.len / DRAW);
        events.push({ type: 'draw', t0: t, t1: t + dur, a: a });
        t += dur;
        pen = end;
        drew = true;
      });
      /* handen glider av papperet när allt är klart */
      var exitTo = [W + 60, L.lastBase + 2 * F];
      events.push({ type: 'move', t0: t, t1: t + 800, from: pen || [W / 2, H / 2],
                    to: exitTo });
      TOTAL = t + 800;
      /* sista radens steggräns slopas: sista steget löper ut i handens sorti */
      boundaries.pop();

      /* penColor per event: vad pennan skriver/ska skriva härnäst — pennan
       * "byts" till blåpennan redan under lyftet fram till ett blått streck */
      var upcoming = null;
      for (var bi = events.length - 1; bi >= 0; bi--) {
        var bev = events[bi];
        if (bev.type === 'draw') upcoming = bev.a.color || null;
        bev.penCol = upcoming;
      }
      startPos = strokes.length
        ? [strokes[0].pts[0][0], strokes[0].pts[0][1]] : [W / 2, H / 2];
      /* koppla drawtider till strecken */
      events.forEach(function (ev) {
        if (ev.type === 'draw') { ev.a._t0 = ev.t0; ev.a._t1 = ev.t1; }
      });
    }
    buildTimeline(tankar ? L.acts : actsUtanTankar(L.acts));

    /* ---------------- uppspelning ---------------- */
    var tNow = 0, playing = false, rafId = null, lastTs = null;
    var boost = 1;   /* > 1 = snabbspolning av resten av steget (klick) */

    function penPosAt(time) {
      var pos = startPos, lift = 0;
      var col = events.length ? events[0].penCol : null;
      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        if (time >= ev.t1) {
          pos = ev.type === 'draw'
            ? [ev.a.pts[ev.a.pts.length - 1][0], ev.a.pts[ev.a.pts.length - 1][1]]
            : (ev.to || ev.at);
          col = i + 1 < events.length ? events[i + 1].penCol : null;
          continue;
        }
        if (time < ev.t0) break;
        var p = (time - ev.t0) / (ev.t1 - ev.t0);
        if (ev.type === 'draw') {
          var pt = ev.a.path.getPointAtLength(p * ev.a.len);
          pos = [pt.x, pt.y];
        } else if (ev.type === 'move') {
          var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; /* ease */
          pos = [ev.from[0] + (ev.to[0] - ev.from[0]) * e,
                 ev.from[1] + (ev.to[1] - ev.from[1]) * e];
          lift = Math.sin(Math.PI * p);
        } else if (ev.type === 'trace') {
          /* torrsvep: följ polylinjen med jämn fart och mjuk start/stopp,
           * pennan kvar mot papperet (lift = 0) */
          var et = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          var dist = et * ev.len;
          var k = 0;
          while (k < ev.pts.length - 2 && ev.cum[k + 1] < dist) k++;
          var segL = ev.cum[k + 1] - ev.cum[k] || 1;
          var f = (dist - ev.cum[k]) / segL;
          pos = [ev.pts[k][0] + (ev.pts[k + 1][0] - ev.pts[k][0]) * f,
                 ev.pts[k][1] + (ev.pts[k + 1][1] - ev.pts[k][1]) * f];
        } else { pos = ev.at; }
        col = ev.penCol;
        break;
      }
      return { pos: pos, lift: lift, col: col };
    }

    /* byt penna: grafit ↔ blåpenna (stift + skaft tintas) */
    var pencilBlue = null;
    function setPencil(blue) {
      if (blue === pencilBlue) return;
      pencilBlue = blue;
      var pc = hand._pencil;
      pc.tip.setAttribute('fill', blue ? BLUE : '#4e4c48');
      pc.barrel.setAttribute('fill', blue ? '#4b79c4' : '#e9a83f');
      pc.barrel.setAttribute('stroke', blue ? '#2a5194' : '#c08624');
      pc.hi.setAttribute('stroke', blue ? '#84a9e0' : '#f6c56d');
      pc.lo.setAttribute('stroke', blue ? '#2e569c' : '#c9882a');
    }

    function winOpacity(wins, time) {
      var o = 0;
      for (var i = 0; i < wins.length; i++) {
        var a = wins[i][0], b = wins[i][1];
        if (time < a) continue;
        if (time < b) o = Math.max(o, Math.min(1, (time - a) / 260));
        else o = Math.max(o, Math.max(0, 1 - (time - b) / 260));
      }
      return o;
    }

    function render(time) {
      for (var i = 0; i < strokes.length; i++) {
        var a = strokes[i];
        var full = a.len + 2;
        var off;
        if (time >= a._t1) off = 0;
        else if (time <= a._t0) off = full;
        else off = full * (1 - (time - a._t0) / (a._t1 - a._t0));
        a.path.setAttribute('stroke-dashoffset', off);
        if (a.fade0 != null) {
          var fo = time <= a.fade0 ? 1 : (time >= a.fade1 ? 0
            : 1 - (time - a.fade0) / (a.fade1 - a.fade0));
          a.path.setAttribute('opacity', fo);
        }
      }
      for (var j = 0; j < objs.length; j++) {
        objs[j].el.setAttribute('opacity', winOpacity(objs[j].wins, time));
      }
      var pp = penPosAt(time);
      setPencil(pp.col === BLUE);
      /* före start (tomt ark) syns ingen hand; den tonar in när skrivandet
       * börjar */
      hand.setAttribute('opacity', time <= 0 ? 0 : Math.min(1, time / 260));
      var wob = (time < TOTAL - 800)
        ? Math.sin(time * 0.011) * 1.4 : 0;
      var lx = pp.pos[0] + pp.lift * 2;
      var ly = pp.pos[1] - pp.lift * 9;
      hand.setAttribute('transform',
        'translate(' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ') ' +
        'rotate(' + (wob - pp.lift * 4).toFixed(2) + ')');
      /* mobil sidledsskroll (se .hk-scroll): följ pennan i x-led med
       * dödzon. Handens viloläge (W+40) jagas inte — klampa till arket. */
      if (scroller.scrollWidth - scroller.clientWidth > 8) {
        var scx = svg.clientWidth / W;
        var px = Math.min(pp.pos[0], W - 40) * scx;
        var vw = scroller.clientWidth;
        var dead = 0.24 * vw;
        var on = px - scroller.scrollLeft;
        if (on > vw - dead) scroller.scrollLeft = px - vw + dead;
        else if (on < dead) scroller.scrollLeft = Math.max(0, px - dead);
      }
    }

    var target = TOTAL;   /* i stegvis läge: nästa steggräns */

    function nextTarget() {
      if (!stegvis) return TOTAL;
      for (var i = 0; i < boundaries.length; i++) {
        if (boundaries[i] > tNow + 1) return boundaries[i];
      }
      return TOTAL;
    }

    function frame(ts) {
      if (!playing) return;
      if (lastTs != null) tNow += (ts - lastTs) * speed * boost;
      lastTs = ts;
      if (tNow >= target) {
        tNow = target; render(tNow); followPen(boost > 1);
        snapX();               /* mobil: visa radens början vid steggräns */
        stop(); return;
      }
      render(tNow);
      followPen(false);
      rafId = requestAnimationFrame(frame);
    }

    function play() {
      if (playing || tNow >= TOTAL) return;   /* klar lösning står kvar —
                                                 omstart bara via "Börja om" */
      boost = 1;
      target = nextTarget();
      playing = true; lastTs = null;
      rafId = requestAnimationFrame(frame);
      updateBtns();
    }
    function stop() {
      playing = false; lastTs = null; boost = 1;
      if (rafId) cancelAnimationFrame(rafId);
      updateBtns();
    }
    function restart() { tNow = 0; render(0); if (!playing) play(); }
    function jumpToEnd() { stop(); tNow = TOTAL; render(TOTAL); followPen(true); updateBtns(); }
    /* nästa steg — eller, om ett steg håller på att skrivas, SNABBSPOLA
     * resten av steget (animeras ultrasnabbt, hoppar inte dit på 0 s) */
    function stepFwd() {
      if (playing) boost = 14;
      else play();
    }
    /* föregående steg: hoppa tillbaka till närmast föregående steggräns
     * (mitt i ett steg: till stegets början) och visa läget direkt */
    function stepBack() {
      stop();
      var t0 = 0;
      for (var i = 0; i < boundaries.length; i++) {
        if (boundaries[i] < tNow - 1) t0 = boundaries[i];
      }
      tNow = t0;
      render(tNow);
      followPen(true);
      updateBtns();
    }

    /* ---------------- kontroller ---------------- */
    var ctrls = document.createElement('div');
    ctrls.className = 'hk-controls';
    var playBtn = document.createElement('button');
    playBtn.className = 'hk-btn';
    playBtn.textContent = 'Skriv';
    playBtn.addEventListener('click', function () {
      if (playing) stop(); else play();
    });
    var againBtn = document.createElement('button');
    againBtn.className = 'hk-btn';
    againBtn.textContent = 'Börja om';
    againBtn.addEventListener('click', restart);
    ctrls.appendChild(playBtn);
    ctrls.appendChild(againBtn);

    var spWrap = document.createElement('span');
    spWrap.className = 'hk-speed';
    var spLbl = document.createElement('span');
    spLbl.className = 'hk-speed-label';
    spLbl.textContent = 'Tempo';
    spWrap.appendChild(spLbl);
    /* "Ultra" = varje steg skrivs i snabbspolningsfart (användarönskemål
     * 2026-07-30) — samma faktor som boost, så ultratempot och ett
     * skipklick ser likadana ut */
    var speeds = [[0.75, '0,75×'], [1, '1×'], [1.5, '1,5×'], [2, '2×'],
                  [14, 'Ultra']];
    var sBtns = [];
    speeds.forEach(function (sp) {
      var b = document.createElement('button');
      b.className = 'hk-sbtn' + (sp[0] === speed ? ' hk-active' : '');
      b.textContent = sp[1];
      b.addEventListener('click', function () {
        speed = sp[0];
        sBtns.forEach(function (x) { x.classList.remove('hk-active'); });
        b.classList.add('hk-active');
      });
      sBtns.push(b);
      spWrap.appendChild(b);
    });
    ctrls.appendChild(spWrap);
    wrap.appendChild(ctrls);

    /* navpilar i kanterna (se STEGNING i filhuvudet): railen spänner hela
     * widgeten, knappen ligger sticky vid halva skärmhöjden */
    function navBtn(dir) {
      var rail = document.createElement('div');
      rail.className = 'hk-navrail ' + (dir < 0 ? 'hk-left' : 'hk-right');
      var b = document.createElement('button');
      b.className = 'hk-nav';
      b.title = dir < 0 ? 'Föregående steg (vänsterpil)'
                        : 'Nästa steg (högerpil)';
      b.setAttribute('aria-label', b.title);
      b.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"' +
        ' stroke="currentColor" stroke-width="2.4" stroke-linecap="round"' +
        ' stroke-linejoin="round"><path d="' +
        (dir < 0 ? 'M15 4 7 12l8 8' : 'M9 4l8 8-8 8') + '"/></svg>';
      b.addEventListener('click', dir < 0 ? stepBack : stepFwd);
      rail.appendChild(b);
      wrap.appendChild(rail);
      return b;
    }
    var navPrev = navBtn(-1), navNext = navBtn(1);

    /* piltangenterna styr senast använda widget (se ACTIVE ovan) */
    var keyApi = { fwd: stepFwd, back: stepBack };
    if (!ACTIVE) ACTIVE = keyApi;
    wrap.addEventListener('pointerenter', function () { ACTIVE = keyApi; });
    wrap.addEventListener('pointerdown', function () { ACTIVE = keyApi; });

    function atBoundary() {
      for (var i = 0; i < boundaries.length; i++) {
        if (Math.abs(boundaries[i] - tNow) < 2) return true;
      }
      return false;
    }

    function updateBtns() {
      var klar = tNow >= TOTAL;
      playBtn.style.display = klar ? 'none' : '';   /* klar: bara Börja om */
      playBtn.textContent = playing ? 'Paus' : (tNow > 0 ? 'Fortsätt' : 'Skriv');
      playBtn.classList.toggle('hk-active', playing);
      navPrev.disabled = tNow <= 0;
      navNext.disabled = klar;
      paperDiv.style.cursor = klar ? 'default' : 'pointer';
      paperDiv.title = klar ? '' : 'Klicka för nästa steg';
    }

    /* klick var som helst på papperet: nästa steg / snabbspola steget */
    paperDiv.addEventListener('click', stepFwd);

    /* ---------------- inställningsruta: "Med/Utan tankar" ----------------
     * Växlingen bygger om tidslinjen och återtar positionen via det senast
     * färdigskrivna strecket — strecken är identiska i båda lägena, så
     * allt som redan skrivits står kvar. Därefter snäpps tiden fram till
     * nästa steggräns, men bara om inget streck ritas däremellan (annars
     * vore det ett hopp framåt i lösningen). */
    function setTankar(on) {
      if (on === tankar) return;
      var klar = tNow >= TOTAL;
      stop();
      var idx = -1;
      for (var i = 0; i < strokes.length; i++) {
        if (strokes[i]._t1 <= tNow) idx = i; else break;
      }
      tankar = on;
      buildTimeline(on ? L.acts : actsUtanTankar(L.acts));
      if (klar) tNow = TOTAL;
      else if (idx < 0) tNow = 0;
      else {
        tNow = strokes[idx]._t1;
        for (var j = 0; j < boundaries.length; j++) {
          if (boundaries[j] >= tNow) {
            var b = boundaries[j];
            var ritas = events.some(function (ev) {
              return ev.type === 'draw' && ev.t0 > tNow && ev.t1 <= b + 1;
            });
            if (!ritas) tNow = b;
            break;
          }
        }
      }
      target = TOTAL;
      render(tNow);
      followPen(true);
      updateBtns();
    }

    /* Rutan visas bara när lösningen har tankebubblor (användarönskemål
     * 2026-07-30). Radiogruppens namn måste vara unikt per widget —
     * flera widgets ligger på samma sida. */
    if (objs.some(function (o) { return o.bubble; })) {
      var setBox = document.createElement('div');
      setBox.className = 'hk-settings';
      setBox.addEventListener('click', function (e) {
        e.stopPropagation();               /* inte ett stegklick på arket */
      });
      var radioName = 'hk-tankar-' + (++UID);
      /* "Utan tankar" överst — den är standardläget */
      [['Utan tankar', false], ['Med tankar', true]].forEach(function (val) {
        var lab = document.createElement('label');
        var inp = document.createElement('input');
        inp.type = 'radio';
        inp.name = radioName;
        inp.checked = val[1] === tankar;
        inp.addEventListener('change', function () {
          if (inp.checked) setTankar(val[1]);
        });
        lab.appendChild(inp);
        lab.appendChild(document.createTextNode(val[0]));
        setBox.appendChild(lab);
      });
      paperDiv.appendChild(setBox);
    }

    /* ---------------- helskärm (presentation för klass) ----------------
     * Kanonisk fullskärmsikon (samma som simuleringarnas fs-btn). Hela
     * widgeten fullskärmas; arket skalas om så att det ryms på skärmen. */
    var ICO_EXPAND = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"' +
      ' stroke="currentColor" stroke-width="2.2" stroke-linecap="round"' +
      ' stroke-linejoin="round"><path d="M3 9V3h6"/><path d="M21 9V3h-6"/>' +
      '<path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
    var ICO_COMPRESS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"' +
      ' stroke="currentColor" stroke-width="2.2" stroke-linecap="round"' +
      ' stroke-linejoin="round"><path d="M9 3v6H3"/><path d="M15 21v-6h6"/>' +
      '<path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
    var fsBtn = document.createElement('button');
    fsBtn.className = 'hk-fsbtn';
    fsBtn.title = 'Helskärm';
    fsBtn.setAttribute('aria-label', 'Helskärm');
    fsBtn.innerHTML = ICO_EXPAND;
    fsBtn.addEventListener('click', function (e) {
      e.stopPropagation();                 /* inte ett stegklick */
      if (document.fullscreenElement === wrap) document.exitFullscreen();
      else if (wrap.requestFullscreen) wrap.requestFullscreen();
    });
    paperDiv.appendChild(fsBtn);

    function fitFS() {
      var fs = document.fullscreenElement === wrap;
      fsBtn.innerHTML = fs ? ICO_COMPRESS : ICO_EXPAND;
      fsBtn.title = fs ? 'Lämna helskärm' : 'Helskärm';
      if (fs) {
        /* stor men inte gigantisk: fyll bredden upp till ett skaltak */
        var availW = window.innerWidth - 36;
        var sc = Math.min(availW / W, 1.35);
        svg.style.width = Math.round(W * sc) + 'px';
        svg.style.height = Math.round(H * sc) + 'px';
      } else {
        svg.style.width = '';
        svg.style.height = '';
      }
      followPen(true);
    }
    document.addEventListener('fullscreenchange', fitFS);
    window.addEventListener('resize', fitFS);

    /* håll pennan i sikte i helskärm — med DÖDZON så att vyn ligger
     * stilla medan handen skriver: rulla först när pennan närmar sig
     * skärmens under-/överkant, och glid då till ett fast mål (känns
     * som att man flyttar blicket, inte som sjögång) */
    var scrollTarget = null;
    /* manuell rullning vinner: släpp målet tills pennan lämnar dödzonen */
    wrap.addEventListener('wheel', function () { scrollTarget = null; },
      { passive: true });
    wrap.addEventListener('touchmove', function () { scrollTarget = null; },
      { passive: true });
    function followPen(instant) {
      if (document.fullscreenElement !== wrap) {
        scrollTarget = null;
        if (instant) snapX();  /* mobil: hopp/steg → visa radens början */
        return;
      }
      var sc = svg.clientWidth / W;
      var pp = penPosAt(Math.min(tNow, TOTAL - 810));  /* ej slutglidningen */
      var py = pp.pos[1] * sc;
      var vh = window.innerHeight;
      var maxScroll = Math.max(0, wrap.scrollHeight - vh);
      function clampT(t) { return Math.max(0, Math.min(t, maxScroll)); }
      if (instant) {
        scrollTarget = clampT(py - 0.45 * vh);
        wrap.scrollTop = scrollTarget;
        return;
      }
      var onScreen = py - wrap.scrollTop;
      if (onScreen > 0.72 * vh || onScreen < 0.12 * vh) {
        scrollTarget = clampT(py - 0.40 * vh);
      }
      if (scrollTarget != null && Math.abs(scrollTarget - wrap.scrollTop) > 1) {
        wrap.scrollTop += (scrollTarget - wrap.scrollTop) * 0.08;
      }
    }

    render(0);
    updateBtns();
    if (opts.instant) jumpToEnd();
    else if (opts.at != null) { tNow = opts.at; render(tNow); updateBtns(); }
    else if (opts.autostart) play();

    /* steg(i): hoppa direkt till slutet av steg i (0-indexerat). Används av
     * skärmdumpsharnesset i .shots/ för att granska ett enskilt steg — och
     * är praktiskt när ett block ska öppnas mitt i en genomgång. */
    function steg(i) {
      stop();
      tNow = boundaries.length
        ? boundaries[Math.max(0, Math.min(i, boundaries.length - 1))] : 0;
      render(tNow);
      followPen(true);
      updateBtns();
    }

    return { play: play, pause: stop, restart: restart,
             setSpeed: function (v) { speed = v; },
             jumpToEnd: jumpToEnd, spela: play, nasta: stepFwd,
             forra: stepBack, steg: steg, boundaries: boundaries };
  }

  /* ---------------- lösningsvy: "Med penna" / "Som text" --------------
   * Ett ::: textlosning-block DIREKT EFTER handskrift-blocket i md:n
   * renderas som <div class="lab-block lab-block-textlosning"> och
   * innehåller samma lösning som vanlig text (går genom den ordinarie
   * markdown-pipelinen, så KaTeX, termtips och dyslexi-/bionic-läget
   * fungerar). mountAll parar ihop widgeten med textblocket och sätter
   * en växel ovanför arket. Valet gäller ALLA exempel på sidan och
   * kommer ihåg mellan besök via localStorage — den som föredrar
   * textlösningar ska slippa växla i varje exempel. */
  var VIEW_KEY = 'hkLosningsvy';
  var PAIRS = [];
  function getView() {
    try {
      return localStorage.getItem(VIEW_KEY) === 'text' ? 'text' : 'penna';
    } catch (e) { return 'penna'; }
  }
  function setView(v) {
    try { localStorage.setItem(VIEW_KEY, v); } catch (e) {}
    /* rensa par vars DOM försvunnit (React kan ha renderat om sidan) */
    PAIRS = PAIRS.filter(function (p) {
      return document.body.contains(p.hkDiv);
    });
    PAIRS.forEach(applyView);
  }
  function applyView(p) {
    var text = getView() === 'text';
    p.wrapEl.style.display = text ? 'none' : '';
    p.textEl.style.display = text ? '' : 'none';
    p.pennaBtn.classList.toggle('hk-active', !text);
    p.textBtn.classList.toggle('hk-active', text);
    if (text && p.ctl && p.ctl.pause) p.ctl.pause();
  }
  function buildVyval(div, ctl) {
    var textEl = div.nextElementSibling;
    if (!(textEl && textEl.classList &&
          textEl.classList.contains('lab-block-textlosning'))) return;
    var wrapEl = div.querySelector('.hk-wrap');
    if (!wrapEl) return;
    var row = document.createElement('div');
    row.className = 'hk-vyval';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Välj hur lösningen visas');
    var lbl = document.createElement('span');
    lbl.className = 'hk-vyval-label';
    lbl.textContent = 'Lösning';
    row.appendChild(lbl);
    function vyBtn(txt, v, title) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'hk-btn';
      b.textContent = txt;
      b.title = title;
      b.addEventListener('click', function () { setView(v); });
      row.appendChild(b);
      return b;
    }
    var pair = {
      hkDiv: div, wrapEl: wrapEl, textEl: textEl, ctl: ctl,
      pennaBtn: vyBtn('Med penna', 'penna',
        'Se hur lösningen skrivs för hand, steg för steg'),
      textBtn: vyBtn('Som text', 'text',
        'Visa lösningen som vanlig text')
    };
    div.insertBefore(row, div.firstChild);
    PAIRS.push(pair);
    applyView(pair);
  }

  /* ---------------- mountAll: ::: handskrift-block i teorin ----------
   * Teorisidorna (katalog.html/avsnitt.html) gör om ett
   *
   *   ::: handskrift
   *   typ: gungbrada
   *   :::
   *
   * -block till <div class="lab-handskrift" data-handskrift-src="b64">
   * (samma mönster som ::: graf → graf.js). mountAll hittar
   * platshållarna, tolkar config-raderna (nyckel: värde; numeriska
   * värden och listor konverteras) och monterar widgeten. Idempotent —
   * en redan monterad div hoppas över (React kan rendera om). */
  function mountAll(root) {
    var divs = (root || document).querySelectorAll(
      '.lab-handskrift[data-handskrift-src]');
    Array.prototype.forEach.call(divs, function (div) {
      if (div.__hkMounted) return;
      div.__hkMounted = true;
      var cfg = {};
      try {
        var src = decodeURIComponent(escape(atob(
          div.getAttribute('data-handskrift-src'))));
        src.split('\n').forEach(function (ln) {
          var m = ln.match(/^\s*([a-zåäö]+)\s*:\s*(.+?)\s*$/i);
          if (!m) return;
          var v = m[2];
          if (/^-?\d+(?:[.,]\d+)?$/.test(v)) {
            v = parseFloat(v.replace(',', '.'));
          } else if (/^-?\d[\d\s.,;-]*$/.test(v) && /[,;]/.test(v)) {
            v = v.split(/[,;]\s*/).map(function (t) {
              return parseFloat(t.replace(',', '.'));
            });
          }
          cfg[m[1].toLowerCase()] = v;
        });
      } catch (e) { return; }
      if (!cfg.typ) return;
      var ctl = mount(div, cfg, {});
      buildVyval(div, ctl);
    });
  }

  window.HANDSKRIFT = { mount: mount, mountAll: mountAll, version: 1 };
})();
