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
 *            stegvis: true, hand: false, tankar: true }  — STANDARD är att
 *            bara pennan ritas (användarbeslut 2026-07-28); hand:true
 *            ritar handen som håller pennan  — stegvis=false ger gamla
 *            beteendet (allt skrivs i en följd). tankar:false startar i
 *            läget "Utan tankar" (se nedan).
 *
 *   Lösningar MED tankebubblor får en inställningsruta uppe till höger
 *   på arket med radioknapparna "Med tankar"/"Utan tankar" (användar-
 *   önskemål 2026-07-30). "Utan tankar" bygger om tidslinjen från en
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
 * (ca x > paperW−210, y < 90 inkl. bulor) är reserverat för inställnings-
 * rutan och helskärmsknappen — lägg aldrig en bubbla där. Kontrollera
 * alltid i skärmdump.
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
    'c': { w: 54, strokes: [[[55, 57], [41, 48], [27, 53], [20, 68], [22, 85], [36, 97], [52, 90]]] },
    /* gradtecken: liten ring i versalhöjd (45°) */
    '°': { w: 40, strokes: [[[30, 12], [22, 17], [20, 26], [26, 33], [35, 31], [38, 22], [31, 13]]] },
    /* ungefär lika med: två vågiga streck (avrundningar) */
    '≈': { w: 88, strokes: [[[20, 50], [33, 44], [48, 53], [63, 60], [76, 53]],
                            [[20, 74], [33, 68], [48, 77], [63, 84], [76, 77]]] },
    "'": { w: 24, strokes: [[[27, 8], [19, 30]]] },
    '<': { w: 76, strokes: [[[64, 40], [24, 66], [64, 92]]] },
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
  var OPS = { '+': 1, '-': 1, '=': 1, '≈': 1, '<': 1, '⇒': 1, '⟺': 1 };

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
    var prevBase = null, prevBaseX = x, scriptAnchor = null;
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
        if (scriptAnchor == null) scriptAnchor = x;
        /* övre integralgräns: in över krokens topp, inte helt till höger —
         * minskar också luften fram till integranden */
        var ax = (prevBase === '∫') ? scriptAnchor - 0.13 * F : scriptAnchor;
        var nx = placeGlyph(sc, ax, sb, s * 0.62, out, color);
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
  function valueBracket(acts, rows, x0, yTop, s, F) {
    var rs = 0.8;                            /* något mindre än huvudraderna */
    var ss = s * rs, sF = F * rs;
    var rowAdv = 1.5 * sF;
    var widths = rows.map(function (r) { return stringAdvance(r, ss, sF); });
    var wMax = Math.max.apply(null, widths);
    var tick = 0.34 * sF;                    /* klammerklackarnas längd */
    var yA = yTop - 0.95 * sF;               /* klammerns över-/underkant */
    var yB = yTop + (rows.length - 1) * rowAdv + 0.4 * sF;
    var xT = x0 + tick + 0.45 * sF;          /* radernas vänsterkant */
    var xR = xT + wMax + 0.45 * sF + tick;   /* högerklammerns streck */
    /* vänsterklammern [ : klack, lodrätt streck, klack */
    acts.push({ kind: 'stroke', pts: humanize([[x0 + tick, yA], [x0, yA]]) });
    acts.push({ kind: 'stroke', pts: humanize([[x0, yA], [x0, yB]]) });
    acts.push({ kind: 'stroke', pts: humanize([[x0, yB], [x0 + tick, yB]]) });
    acts.push({ kind: 'pause', ms: 160 });
    var boxes = rows.map(function (r, i) {
      var yi = yTop + i * rowAdv;
      placeString(r, xT, yi, ss, sF, acts);
      acts.push({ kind: 'pause', ms: 140 });
      return [xT, xT + widths[i], yi, sF];
    });
    /* högerklammern ] */
    acts.push({ kind: 'stroke', pts: humanize([[xR - tick, yA], [xR, yA]]) });
    acts.push({ kind: 'stroke', pts: humanize([[xR, yA], [xR, yB]]) });
    acts.push({ kind: 'stroke', pts: humanize([[xR, yB], [xR - tick, yB]]) });
    return { boxes: boxes, yEnd: yTop + (rows.length - 1) * rowAdv };
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
                   gungbrada: layoutGunga, skiftnyckel: layoutSkiftnyckel,
                   spett: layoutSpett, brada: layoutBrada };
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
    paperDiv.appendChild(svg);

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
    var tankar = opts.tankar !== false;
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
        tNow = target; render(tNow); followPen(boost > 1); stop(); return;
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
      [['Med tankar', true], ['Utan tankar', false]].forEach(function (val) {
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
      if (document.fullscreenElement !== wrap) { scrollTarget = null; return; }
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
