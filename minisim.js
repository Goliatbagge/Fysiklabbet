/* minisim.js — minisimuleringar inbäddade i teorigenomgångar.
 *
 * En minisimulering är en liten, superlättillgänglig interaktiv demo som
 * bäddas in direkt i ett teoriavsnitt (enklare än de fristående
 * simuleringssidorna). Bäddas in i teori-markdown med ett ::: minisim-block:
 *
 *   ::: minisim
 *   typ: tomtebloss
 *   :::
 *
 * preprocessBlocks() i katalog.html/avsnitt.html gör om blocket till
 *   <div class="lab-minisim" data-minisim-src="<base64 av rå blocktext>"></div>
 * och efter render anropas window.FYSIKMINISIM.mountAll(container) som här
 * bygger widgeten. Blocket skyddas i data/teori/build.js (ingen NBSP/term-
 * transform) och hoppas över av TTS-manuset (export-manus.html).
 *
 * Fält i konfigurationen (en per rad, "nyckel: värde"):
 *   typ:    vilken minisimulering som ska byggas (OBLIGATORISKT).
 *           Tillgängliga typer: tomtebloss, centrifug, cirkularrorelse,
 *           eulersdisk, fjaderpendel, skiftnyckel, valtning, gaffelbalans,
 *           gaffelbalans3d, dubbelkon, linjal, fodelsedag, talmangder,
 *           magnetpoler, magnetdelning, koniskpendel, kastvektorer,
 *           snettkast, skjutochslapp, kanonvagn, galton, kalkylblad,
 *           kopplade-fjadrar, lodlinje, hjulprojektion, svangningsgrafer,
 *           periodtid (fy2-2.4: m, k och A mot periodtiden),
 *           pendelperiod (fy2-2.5: l, m, g och α mot pendelns periodtid),
 *           stegkast (fy2-1.9: kaströrelsen med stegmetoden),
 *           vinkelrata (ma1c-4.7: lutningstrappan vrids ett kvarts varv),
 *           pennprovet (ma1c-4.8: en lodrät penna dras över två grafer, vilken är en funktion?),
 *           varmekansla (fy1-6.1: handen på en aluminium- och en plastplatta, värmen som lämnar handen),
 *           smaltrace (fy1-6.1: isbitar på aluminium och plast, vilken smälter först?),
 *           pulsvag (fy2-2.7, visa: puls | vag: rep från en person till ett träd),
 *           vagtyp (fy2-2.7, visa: transversell | longitudinell),
 *           ytvag (fy2-2.7, visa: vatten | rayleigh: partiklarnas banor i en ytvåg),
 *           fasvag (fy2-2.7: stående våg med partiklar i fas och i motfas),
 *           vagstallning (fy2-2.7: en puls vandrar nedåt i en hängande vågställning),
 *           blixtljud (fy2-2.10: ljudets hastighet, blixt/fyrverkeri och tumregeln 3 s per km;
 *                      visa: fyrverkeri startar med fyrverkeriet)
 *   titel:  liten rubrik ovanför scenen (valfritt).
 *
 * Widgeten är ren vanilla-JS (ingen React) och har egen intern CSS.
 *
 * ── typ: tomtebloss ──────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.5 (Cirkulär rörelse): ett tomtebloss fäst i en
 * skruvdragare, i mörker. Tänd tomteblosset — gnistorna sprutar åt alla
 * håll. Starta skruvdragaren — tomteblosset roterar snabbt och gnistorna
 * lämnar banan TANGENTIELLT i rörelsens riktning (inte radiellt utåt),
 * eftersom varje gnista behåller spetsens hastighet i frigörelseögonblicket
 * (Newtons första lag). Gnistornas utkastfart (~tiotals px/s) är liten
 * jämfört med spetsens banfart (ω·r, tusentals px/s), så strålen blir en
 * tangent till cirkeln. Kryssrutan "Visa spår" ritar gnistornas banor som
 * en lång exponering (långsamt borttonande spårlager), så att man i
 * efterhand ser att spåren är TANGENTER till cirkeln — och pausknappen
 * fryser spåren för avläsning.
 *
 * TEMA: minisimuleringar ska generellt gå i laboranstemat — ljus
 * pappersbakgrund med ett blått kollegieblocks-rutnät, som om simuleringen
 * låg ritad på ett anteckningsblock (kortklass ms-ljus + drawPaper()).
 * Tomteblosset är UNDANTAGET: det kräver mörker för ljuseffekten.
 *
 * ── typ: stegkast ────────────────────────────────────────────────────────
 * Simuleringen i fy2-1.9 (Numerisk simulering av kaströrelse): kastet
 * räknas med stegmetoden (Eulers metod), ett tidssteg i taget, med eller
 * utan luftmotstånd (tennisboll, F_luft = k · v²). Blå punkter och raka
 * sträckor för stegen, grå streckad kastparabel utan luftmotstånd som
 * jämförelse, hastighet (grön) och acceleration (röd) i aktuell punkt och
 * en tabell med de senaste stegen. Glidare för tidssteg, vinkel, fart och k.
 *
 * ── typ: hjulprojektion ──────────────────────────────────────────────────
 * Demonstrationen ur fy2-2.3 (Harmonisk svängning): ett stift på ett
 * snurrande cykelhjul belyses från sidan, och stiftets skugga på en vägg rör
 * sig upp och ned i takt med en vikt i en fjäder bredvid. Vinkeln α = ω · t
 * räknas från den vågräta radien, så att y = A · sin(ω · t); en streckad
 * vågrät linje binder stift, skugga, vikt och grafens punkt till samma höjd.
 * Glidare för periodtiden, kryssrutor för vinkeln och grafen. Ren SVG i
 * laboranstemat, inget ljud. Knappen "3D" (till höger om fullskärmsknappen) byter scenen mot den
 * färdiga 3D-simuleringen fysik2-hjul-och-fjader-3d-app.html i en iframe
 * (?embed=1&mini=1), som kortets reglage styr med postMessage.
 *
 * ── typ: svangningsgrafer ────────────────────────────────────────────────
 * Andra demonstrationen i fy2-2.3: en vikt svänger i en fjäder (A = 0,10 m,
 * T = 2,0 s) medan graferna för läge y, hastighet v och acceleration a
 * ritas upp under två perioder, med en lodrät markör som binder ihop samma
 * ögonblick i alla tre. Pilarna för v (grön) och a (röd) på vikten är
 * skalenliga, färgerna som i genomgångens figur. Starta/Pausa, Börja om,
 * Ultrarapid; info-raden visar y, v och a med enhet. Kryssrutor tänder och
 * släcker varje graf, och en tidsglidare (0 till 2T) pausar och låter
 * eleven dra tiden fram och tillbaka; den lodräta markören i graferna går
 * också att dra direkt. När markören når högerkanten flyter tidsaxeln med
 * (graferna fortsätter); glidaren ställer tillbaka den fasta axeln 0–2T. Ren SVG, inget ljud.
 *
 * ── typ: magnetpoler / magnetdelning ────────────────────────────────────
 * Stavmagneterna ur fy2-3.1 (Magnetism och magnetfält). magnetpoler: två
 * magneter på rutat papper som dras i sidled — lika poler mot varandra
 * skjuter undan den andra magneten, olika poler drar ihop dem så att de
 * klickar fast i varandra; knappar (eller dubbelklick) vänder en magnet.
 * magnetdelning: en hel magnet som slits itu (dra i ena halvan) eller
 * delas med knappen — brottytorna får nya poler, bitarna dras ihop igen,
 * och varje bit kan delas igen (upp till fyra). Gemensam motor: varje
 * magnet är ett par punktpoler, kraften summeras över polparen (∝ 1/r²),
 * den dragna magneten följer pekaren och de fria styrs av kraft +
 * vilofriktion + glidfriktion + oelastisk kontakt. Blå pilar visar
 * nettokraften på varje magnet. Ljus pappersscen, inget ljud.
 *
 * ── typ: centrifug ───────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.5 (Cirkulär rörelse): en blöt tvättsvamp i en
 * centrifug (roterande korg utan lock, sedd rakt uppifrån, ritad på
 * papperstemat med rutnät). Blöt svampen
 * och starta centrifugen — vattendropparna pressas ut genom korgväggen och
 * lämnar banan TANGENTIELLT i rörelsens riktning (inte radiellt utåt),
 * eftersom varje droppe behåller svampens hastighet i frigörelseögonblicket
 * (Newtons första lag). Droppens lilla radiella läckfart (~tiotals px/s) är
 * försumbar mot banfarten (ω·r, tusentals px/s), så banan blir en tangent
 * till cirkeln. Varvtalsglidare, pausknapp som fryser bilden, "Ultrarapid"
 * för slow motion, "Visa spår" (dropparnas banor som långsamt borttonande
 * spårlager — tangenterna syns i efterhand), fullskärm samt syntetiserat
 * ljud (motorton som följer varvtalet + vattenfräs som följer
 * utslungningen — inga ljudfiler).
 *
 * ── typ: cirkularrorelse ─────────────────────────────────────────────────
 * Bilen i cirkelbana ur fy2-1.5 (Cirkulär rörelse): den fristående
 * simuleringen fysik2-cirkular-rorelse-app.html inbäddad via en iframe
 * (?embed=1&mini=1 — mini-läget visar bara scenen), samma mönster som
 * gaffelbalans3d/dubbelkon. Växlaren uppe till höger på scenen byter
 * situation mellan Cirkelbana (bilen sedd rakt uppifrån — friktionskraften
 * utgör centripetalkraften), Bilbana (sluten bana ovanifrån med en vid och
 * en snäv kurva — kraft bara i kurvorna, sladd när greppet inte räcker),
 * Loop (bilen från sidan — normalkraften och tyngdkraften utgör
 * tillsammans centripetalkraften) och Krön och dal (från sidan —
 * normalkraften minskar på krönet, ökar i dalen, bilen lättar över
 * gränsfarten). Kortets verktyg (Pausa/Fortsätt, Börja om och
 * fartglidaren, som byter roll med situationen) styr sidan med
 * postMessage; sidan rapporterar tillbaka sitt läge, och info-raden visar
 * aktuell centripetalkraft (cirkelbanan), kraften som krävs i den snäva
 * kurvan mot största friktionskraft (bilbanan), gränsfarten längst ned
 * (loopen) respektive gränsfarten på krönet. FULLSKÄRM startas med
 * scenens egen .fs-btn inne i iframen och ger exakt originalsimuleringens
 * fullskärmsläge med alla verktyg.
 *
 * ── typ: koniskpendel ────────────────────────────────────────────────────
 * Den översta figuren i fy2-1.7 (Konisk pendel) som rörlig figur: samma
 * uppställning som den tidigare statiska ::: figur-SVG:n (tak, snöre,
 * lodlinje, cirkelbana, vikt, r, l, α, F_G och F_S), men vikten sveper runt
 * i den vågräta cirkeln och snöret, radien, vinkelbågen och kraftpilarna
 * följer med. Rörelsen går i verklig tid ur genomgångens formel
 * T = 2π√(l·cos α / g) med snörlängden 1,5 m; glidaren för α visar att en
 * större vinkel ger kortare periodtid, och info-raden visar T. Figuren
 * startar stillastående ("Sätt i rörelse"/"Pausa", "Börja om", kryssrutan
 * "Visa krafter"). Ren SVG i laboranstemat med kollegierutnät, inget ljud,
 * ingen fullskärm.
 *
 * ── typ: kastvektorer ────────────────────────────────────────────────────
 * Hjälpfiguren i fy2-1.8 (Kaströrelse) som interaktiv figur: kastparabeln
 * med hastighetsvektorerna i fem punkter — v_0x (röd, konstant), v_y (röd,
 * ändras) och den resulterande hastigheten v (blå) med vinklarna α_0
 * (utgångs- och landningsvinkel), α_1 och α_2.
 * Tre kryssrutor under figuren ("Visa hastighet i x-led", "Visa hastighet i
 * y-led", "Visa total hastighet") tänder och släcker varsitt lager, så att
 * eleven kan titta på EN led i taget i stället för alla vektorer på en gång.
 * Ren SVG i laboranstemat, inget ljud, ingen fullskärm. Geometrin är samma
 * som den tidigare statiska ::: figur-SVG:n (samma koordinater och färger
 * som simuleringen fysik2-rorelse-app.html använder).
 *
 * ── typ: snettkast ───────────────────────────────────────────────────────
 * Bollen som kastas ur fy2-1.8 (Kaströrelse): den fristående simuleringen
 * fysik2-rorelse-app.html inbäddad via en iframe (?embed=1&mini=1 —
 * mini-läget visar bara scenen), samma mönster som cirkularrorelse. Kortets
 * verktyg (Kasta/Pausa/Fortsätt, Börja om samt glidarna Utkastvinkel och
 * Utgångshastighet) styr sidan med postMessage ({ fysikKast: … }); sidan
 * rapporterar tillbaka sitt läge ({ fysikKastStatus: … }) och info-raden
 * visar tid och fart under kastet, kastvidd och stighöjd efter nedslaget.
 * Utgångsläget är genomgångens Exempel 1 (15 m/s, 50°). FULLSKÄRM startas
 * med scenens egen .fs-btn inne i iframen och ger exakt originalets
 * fullskärmsläge med alla verktyg.
 *
 * ── typ: skjutochslapp ───────────────────────────────────────────────────
 * Demonstrationen "Skjut och släpp samtidigt" ur fy2-1.8 (Kaströrelse,
 * specialfallet horisontellt kast): två likadana kulor vid kanten av ett
 * 0,80 m högt bord (samma höjd som Exempel 3). Skjut och släpp: en
 * fjäderbelastad utskjutare knuffar den ena kulan ut vågrätt i samma
 * ögonblick som släppklon öppnas kring den andra. Båda faller enligt
 * y = −g·t²/2 och träffar golvet samtidigt, efter √(2h/g) = 0,40 s; bara den
 * skjutna rör sig i x-led. "Visa spår" ritar blixtbilder med lika
 * tidsavstånd (0,05 s) och binder ihop paren med streckade vågräta linjer:
 * samma höjd i varje ögonblick. "Visa hastighet" ritar v_x (konstant) och
 * v_y (växer lika för båda). Glidaren sätter utgångshastigheten, Ultrarapid
 * saktar ned fyra gånger, och ett ENDA ljud hörs vid nedslaget. Ljust kort i
 * laboranstemat, canvas, fullskärm.
 *
 * ── typ: kanonvagn ───────────────────────────────────────────────────────
 * Den klassiska kanonvagnen ur fy2-1.8 (Kaströrelse): en vagn rullar med
 * konstant fart på en rak bana och skjuter, när den passerar
 * avfyringsmärket, en boll rakt upp ur en fjäderkanon. Bollen följer en
 * kastparabel men behåller vagnens hastighet i x-led, eftersom ingen kraft
 * verkar i sidled, och landar därför i tratten på vagnen som hunnit rulla
 * vidare. En streckad lodrät linje binder bollen till tratten under hela
 * flygningen. Glidare för vagnens fart (0–2 m/s; 0 ger ett rakt kast upp
 * och ned) och kanonens utgångsfart (2–4 m/s), "Visa spår" (bollens bana
 * som prickar med lika tidsavstånd), "Visa hastighet" (v_x och v_y på
 * bollen, v på vagnen: v_x är alltid lika lång som vagnens v), Ultrarapid,
 * syntetiserat skott- och träffljud, fullskärm. Ljust kort i laboranstemat.
 *
 * ── typ: eulersdisk ──────────────────────────────────────────────────────
 * Demonstrationen ur fy1-4.4 (Energiprincipen): en blankpolerad metalldisk
 * ("Eulers disk") som snurras på en spegelblank sockel. Disken rullar på
 * sin kant och vaggar runt, runt — och när lutningsvinkeln α sjunker (och
 * tyngdpunkten med den) stiger vaggningens varvtal enligt rulldiskens
 * Ω = √(4g/(R·sin α)): lägesenergin omvandlas till rörelseenergi, precis
 * som demonstrationen i genomgången beskriver. Lutningen avtar med
 * Moffatts lag α ∝ (T−t)^(2/3), så förloppet slutar i den karakteristiska
 * finalen där vaggningen rusar i frekvens och disken abrupt lägger sig
 * platt med ett skallrande ljud. Markören på diskens ansikte visar diskens
 * EGEN rotation, ψ̇ = Ω(1−cos α) — den nästan står stilla på slutet medan
 * vaggningen rasar, precis som i verkligheten. Kryssrutan "Visa spår"
 * ritar kontaktpunktens bana på sockeln (en långsamt borttonande ring som
 * vidgas när disken planar ut), "Visa energi" ritar staplar för läges-,
 * rörelse- och värmeenergi (summan konstant — energiprincipen), och
 * "Ultrarapid" gör slutrusningen synlig. Syntetiserat ljud via Web Audio:
 * en ringande ton vars frekvens och tremolo följer vaggningens varvtal,
 * plus skallret när disken lägger sig — inga ljudfiler. Ritad i
 * laboranstemat (papper med kollegierutnät) med disken i pseudo-3D:
 * kromgradienter, spegelbild i sockeln och rörelseoskärpa vid hög fart.
 *
 * ── typ: fjaderpendel ────────────────────────────────────────────────────
 * Demonstrationen ur fy2-2.1 (Hookes lag): en vikt som hänger i en
 * spiralfjäder från taket. Dra i vikten (eller tryck "Dra ner och släpp")
 * så pendlar den harmoniskt kring jämviktsläget y = 0, mellan vändlägena
 * +A och −A. Kryssrutor visar hastighetsvektorn v (blå) och accelerations-
 * vektorn a (röd) — pillängderna är skalenliga mot storheternas belopp, så
 * eleven ser att farten är störst i jämviktsläget (a = 0 där) och att
 * accelerationen är störst i vändlägena (v = 0 där), alltid riktad mot
 * jämviktsläget. Ritad i laboranstemat (ljust papper med rutnät), samma
 * färger som teorifigurerna: v = #2563c9, a = #c0392b. Pausknapp,
 * "Ultrarapid" och fullskärm som övriga minisims; inget ljud.
 * Med `visa: krafter` byts vektorerna mot krafterna på vikten: fjäder-
 * kraften F_fj (uppåt från kontaktpunkten mot fjädern, växer med
 * förlängningen), tyngdkraften F_G (från tyngdpunkten, konstant) och den
 * resulterande kraften F_R (streckad, bredvid vikten, F_R = −k · y).
 * Alla tre skalenliga i samma skala; bara den resulterande kraften är
 * ikryssad från början. Jämviktslinjen har etiketten "Jämviktsläge" i båda varianterna.
 *
 * ── typ: linjal ──────────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.2 (Mer kraftmoment): en linjal vilar vågrätt på
 * två pekfingrar. "Dra ihop fingrarna" — BÅDA fingrarna förs mot mitten
 * (som när man gör försöket själv), och linjalen åker med det finger som
 * håller fast: fingret närmast tyngdpunkten bär större normalkraft och
 * därmed större friktionskraft, så det FJÄRMARE fingret glider mot
 * linjalen. När det glidande fingret kommit tillräckligt nära
 * tyngdpunkten (kvoten N_glid/N_fast ≥ μs/μk) byter fingrarna roll,
 * växelvis, tills de möts — och linjalen har då förskjutit sig så att
 * tyngdpunkten ligger precis mitt emellan dem.
 * Skalenliga normalkraftspilar (blå, pillängd ∝ N, från kontaktytan uppåt
 * genom linjalen) bär förklaringen. Kryssrutan "Lägg en vikt på linjalen"
 * lägger en flyttbar (draggbar) mässingsvikt på linjalen som förskjuter
 * tyngdpunkten — fingrarna möts då i det NYA tyngdpunktsläget. "Visa
 * tyngdpunkten" markerar läget i förväg; annars avslöjas det först när
 * fingrarna möts. Ritad i laboranstemat; pausknapp, "Ultrarapid" och
 * fullskärm som övriga minisims; inget ljud.
 *
 * ── typ: linjaltrio ─────────────────────────────────────────────────────
 * Teoriavsnittet fy2-1.3 (Stabilitet): tre likadana linjaler
 * uppspikade på tre olika sätt, som interaktiv spegel av figuren med
 * kulan i skålen/på kullen/på golvet (panelerna ligger i tredjedelar så
 * att de hamnar rakt under figurens paneler). Vänster: spik genom
 * ÖVERKANTEN — dämpad pendel som gungar tillbaka till utgångsläget
 * (stabil). Mitten: spik genom NEDERKANTEN — står upprätt, men minsta
 * vinkel får den att välta tills dess ände slår i marklinjen (labil) —
 * spiken sitter en bit ovanför marken, så linjalen blir stående snett
 * lutad på sin ände (stoppvinkeln PHI_STOP löses ur geometrin, med
 * linjalens halva bredd inräknad så att hörnet inte går genom marken).
 * En liten studs, och knappen "Ställ upp linjalerna igen" reser den. Höger: spik genom TYNGDPUNKTEN — snurrar som en propeller
 * av en knuff (släppfarten följer med från draget) och blir kvar i det
 * läge där den stannar (indifferent). Dra i linjalerna med pekare/touch
 * (grepp nära spiken ignoreras — vinkeln är odefinierad där). Ritad i
 * laboranstemat; fullskärm som övriga minisims; inget ljud, ingen
 * rAF-loop i viloläge (somnat() släcker den när allt står stilla).
 *
 * ── typ: valtning ────────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.3 (Stabilitet): en kloss på ett vågrätt underlag
 * tippas kring ett av sina nedre hörn — som när man tippar klossen för
 * hand. Underlaget lutas aldrig, så glidfriktion spelar ingen roll.
 * Klossen lutas genom att man TAR TAG i dess överkant (pekare/touch) och
 * drar åt valfritt håll — vinkeln är signerad (positiv åt höger, negativ
 * åt vänster) och vridningspunkten är det nedre hörn klossen tippar mot.
 * När pekaren släpps SLÄPPS KLOSSEN AUTOMATISKT och man ser åt vilket
 * håll den faller. En glidare (−70° till 70°) plus "Släpp klossen" finns
 * kvar som precisionsväg; en kloss som faller kan också fångas mitt i
 * fallet med pekaren. Från klossens tyngdpunkt (grön prick) pekar
 * tyngdkraftens pil rakt nedåt — en kraftvektor med KONSTANT längd
 * (skalenlig mot klossens massa), som gärna får gå igenom golvytan;
 * stödytan är markerad lila på marken och vridningspunkten
 * (hörnet) med en prick. Faller pilen innanför vridningspunkten faller
 * klossen tillbaka (med en liten studs), hänger den utanför — lutningen
 * har passerat den kritiska vinkeln tan α = b/h där tyngdpunkten står
 * rakt ovanför hörnet — välter klossen med fysikalisk vinkelacceleration.
 * Knappval mellan "Hög kloss" (välter redan vid ≈23°) och "Låg kloss"
 * (kräver ≈62°) gör stabilitetspoängen jämförbar. Ritad i laboranstemat;
 * "Ultrarapid" och fullskärm som övriga minisims; inget ljud.
 *
 * ── typ: gaffelbalans ────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.3 (Stabilitet): det klassiska balanstricket
 * — två gafflar trycks fast i en kork, en nål sticks igenom, och hela bygget
 * balanserar på nålspetsen mot den ytterst smala kanten av ett mynt som står
 * på högkant i en flaskkork. Gafflarnas tunga skaft hänger NEDÅT och drar
 * systemets tyngdpunkt till en punkt strax UNDER stödpunkten — därför rättar
 * tyngdkraftens moment till varje lutning i stället för att välta bygget,
 * precis tvärtom mot klossen i typ: valtning. Ta tag i en gaffel och luta
 * bygget (eller tryck "Knuffa till") — det vaggar tillbaka som en pendel
 * kring stödpunkten. Glidaren ändrar gaffelvinkeln: lyfts gafflarna över den
 * kritiska vinkeln (≈36°) hamnar tyngdpunkten ovanför stödpunkten och bygget
 * faller av myntet. Skalan till höger visar tyngdpunktens läge i millimeter
 * relativt stödpunkten, med nollstrecket på samma höjd som stödpunkten i
 * scenen. Fysikmodellen (massor, längder, tröghetsmoment) är IDENTISK med
 * den fristående simuleringen fysik2-gaffelbalans-app.html. Ritad i
 * laboranstemat; "Ultrarapid" och fullskärm som övriga minisims; inget ljud.
 *
 * ── typ: gaffelbalans3d ──────────────────────────────────────────────────
 * 3D-varianten av gaffelbalansen: den fristående simuleringen
 * fysik2-gaffelbalans-app.html inbäddad som minisimulering via en iframe
 * (?embed=1&mini=1 — mini-läget visar bara scenen). Kortet har de
 * väsentliga verktygen (Knuffa till, Snurra, Börja om, glidaren
 * Gaffelvinkel) som styr sidan med postMessage; sidan rapporterar
 * tillbaka fallen/stabil/period/varvtal till kortets info-rad.
 * Fullskärm startas med scenens egen .fs-btn inne i iframen och ger
 * exakt originalsimuleringens fullskärmsläge, med alla verktyg.
 *
 * ── typ: dubbelkon ───────────────────────────────────────────────────────
 * Demonstrationen ur fy2-1.3 (Stabilitet): dubbelkonen som ser ut att
 * rulla uppför en lutande, V-formad bana. Den fristående simuleringen
 * fysik2-dubbelkon-app.html inbäddad som minisimulering via en iframe
 * (?embed=1&mini=1 — mini-läget visar bara scenen), samma mönster som
 * gaffelbalans3d. Kortet har de väsentliga verktygen (Släpp, Börja om,
 * växeln Dubbelkon/Cylinder och glidaren Banans lutning) som styr sidan
 * med postMessage; sidan rapporterar tillbaka läget (rullar mot breda
 * änden / rullar nedåt / stannade) till kortets info-rad. Fullskärm
 * startas med scenens egen .fs-btn inne i iframen och ger exakt
 * originalsimuleringens fullskärmsläge, med alla verktyg.
 *
 * ── typ: fodelsedag ──────────────────────────────────────────────────────
 * Fördjupningen i ma1c-5.8 (Komplementhändelse): sannolikheten att minst två
 * personer i en grupp delar födelsedag, ritad som funktion av gruppens
 * storlek. Dra den röda punkten längs kurvan (eller använd glidaren) och läs
 * av sannolikheten och antalet möjliga par för varje gruppstorlek — kurvan
 * passerar 50 % redan vid 23 personer. Kryssrutan "Jämför med DIN
 * födelsedag" lägger in kurvan 1 − (364/365)^(n−1); avståndet mellan
 * kurvorna är hela förklaringen till att paradoxen känns omöjlig. Ritad i
 * laboranstemat men med grafens eget rutnät i stället för kollegierutorna
 * (två rutnät ovanpå varandra gör en graf oläslig); inget ljud.
 *
 * ── typ: talmangder ──────────────────────────────────────────────────────
 * Figuren i ma1c-1.1 (Talmängder och negativa tal): talmängderna ℕ ⊂ ℤ ⊂
 * ℚ ⊂ ℝ som ovaler inuti varandra — men interaktiv. Pekar man på en
 * talmängd "poppar" den: ringen tonas i mängdens egen färg, konturen blir
 * kraftigare och symbolen växer. Klickar man på en mängd låses markeringen,
 * FLER exempeltal tonas fram inne i just den ringen, och en panel under
 * figuren förklarar mängden (beteckning, beskrivning, ringens exempel och
 * hur mängden ingår i de större). Klick på samma mängd igen släpper
 * markeringen. Regionerna är tangentbordsnåbara (tab + Enter/mellanslag).
 * Ritad i laboranstemat (SVG på papper med kollegierutnät); inga knappar,
 * inget ljud, ingen fullskärm — figuren ÄR interaktionen.
 *
 * ── typ: galton ──────────────────────────────────────────────────────────
 * Galtonbrädan i ma2c-6.5 (Normalfördelning): kulor faller genom en bräda
 * av trä och glas och staplas i facken så att klockformen växer fram, med
 * normalkurvan och 68–95-regeln som steg 2 och 3. Brädan BOR i
 * data/visualiseringar/ma2c-6.5.js (avsnittets flik Visualisering); typen
 * här laddar den modulen vid behov och monterar samma bräda i teorin, så
 * att den bara finns på ett ställe. Ändra alltså brädan där, inte här.
 *
 * ── typ: lodlinje ──────────────────────────────────────────────────────
 * fy2-1.3 (Stabilitet): en oregelbunden skiva hänger i en spik bredvid ett
 * lod. Tyngdpunkten, lodlinjen och F_G ritas ut; vrid skivan och släpp, så
 * svänger den tills tyngdpunkten hänger rakt under spiken. "Rita av lodet"
 * + "Byt upphängningspunkt" hittar tyngdpunkten där linjerna korsas.
 *
 * ── typ: kopplade-fjadrar ────────────────────────────────────────────────
 * fy2-2.2: en fjäder, två seriekopplade och två parallellkopplade likadana
 * fjädrar bredvid varandra. "Häng i vikterna" hänger samma massa i alla tre
 * (parallellt mitt under stången) och markerar förlängningen; "Sätt i svängning"
 * visar periodtiderna. Motorn bor i kopplade-fjadrar.js och delas med läget
 * "Kopplade fjädrar" i fysik2-hookes-lag-app.html (?lage=kopplade).
 */
(function () {
    'use strict';

    // ── Svensk sifferformatering (komma, noll utan decimaler) ─────────────
    function fmt(v, decimals) {
        var s = v.toFixed(decimals == null ? 1 : decimals);
        if (parseFloat(s) === 0) return '0';
        return s.replace('.', ',');
    }

    // ── Intern CSS (injiceras en gång) ────────────────────────────────────
    var FONT = '"Poppins", system-ui, sans-serif';
    var CSS = [
        '.minisim-card{background:#07090f;border:1px solid #2a2f3a;border-radius:6px;',
        '  padding:10px 10px 12px;max-width:560px;margin:0 auto;user-select:none;-webkit-user-select:none;}',
        '.minisim-title{font-family:' + FONT + ';font-size:15px;letter-spacing:.04em;',
        '  color:#cfd4de;text-align:center;margin:2px 0 8px;font-style:normal;}',
        '.minisim-scene{position:relative;border-radius:4px;overflow:hidden;}',
        '.minisim-canvas{display:block;width:100%;height:auto;border-radius:4px;cursor:default;}',
        '.minisim-controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:10px;font-style:normal;}',
        '.minisim-btn{appearance:none;border:1px solid #3a4150;border-radius:4px;background:#151a24;',
        '  color:#dde2ec;font-family:' + FONT + ';font-size:14px;line-height:1;',
        '  padding:9px 14px;cursor:pointer;transition:background .15s,border-color .15s;}',
        '.minisim-btn:hover{background:#1d2432;border-color:#4a5468;}',
        '.minisim-btn:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        '.minisim-btn.ms-primar{background:#b8531f;border-color:#d06a30;color:#fff4e8;}',
        '.minisim-btn.ms-primar:hover{background:#c95f26;}',
        '.minisim-btn:disabled{opacity:.45;cursor:default;}',
        '.minisim-check{display:inline-flex;align-items:center;gap:6px;color:#aab1bf;font-size:13.5px;',
        '  font-family:' + FONT + ';cursor:pointer;font-style:normal;}',
        '.minisim-check input{accent-color:#c95f26;width:15px;height:15px;cursor:pointer;}',
        '.minisim-info{margin-left:auto;color:#8a93a5;font-size:13px;font-variant-numeric:tabular-nums;',
        '  font-family:' + FONT + ';font-style:normal;white-space:nowrap;}',
        /* Längre info-text (hela meningar, som i magnetsimuleringarna):
           egen rad under knapparna och får radbrytas. */
        '.minisim-info.ms-brod{white-space:normal;flex-basis:100%;margin-left:0;line-height:1.35;}',
        '.minisim-slider-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:10px;font-style:normal;}',
        '.minisim-slider-lbl{color:#aab1bf;font-size:13.5px;font-family:' + FONT + ';white-space:nowrap;}',
        /* Gränsfartsmarkering (typ: cirkularrorelse): streck med triangel
           vid den fart där bilen lättar, klarar loopen eller tappar
           greppet. Positionen räknas på trackens bredd, alltså glidarens
           bredd minus tummens 16 px. */
        '.ms-sl-wrap{position:relative;display:flex;align-items:center;flex:1 1 120px;min-width:50px;}',
        '.ms-sl-wrap .minisim-slider{flex:1 1 auto;width:100%;}',
        '.ms-sl-mark{position:absolute;top:50%;transform:translate(-50%,-50%);',
        '  display:none;flex-direction:column;align-items:center;pointer-events:none;}',
        '.ms-sl-mark i{display:block;width:2px;height:15px;border-radius:1px;background:#c8324a;opacity:0.9;}',
        '.ms-sl-mark b{display:block;width:0;height:0;border-left:4px solid transparent;',
        '  border-right:4px solid transparent;border-top:5px solid #c8324a;}',
        '.ms-sl-mark .ms-sl-cap{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);',
        '  margin-bottom:2px;white-space:nowrap;font-size:9px;font-weight:600;letter-spacing:0.05em;',
        '  text-transform:uppercase;line-height:1;color:#c8324a;font-family:' + FONT + ';}',
        '.minisim-slider-row.ms-sl-marked{margin-top:22px;}',
        '.minisim-slider-val{color:#dde2ec;font-size:13.5px;font-family:' + FONT + ';',
        '  font-variant-numeric:tabular-nums;white-space:nowrap;min-width:74px;text-align:right;}',
        '.minisim-slider{flex:1 1 120px;min-width:50px;appearance:none;-webkit-appearance:none;height:4px;border-radius:2px;',
        '  background:#2a2f3a;outline:none;cursor:pointer;}',
        '.minisim-slider::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:16px;height:16px;',
        '  border-radius:50%;background:#c95f26;border:2px solid #07090f;cursor:pointer;}',
        '.minisim-slider::-moz-range-thumb{width:12px;height:12px;border-radius:50%;',
        '  background:#c95f26;border:2px solid #07090f;cursor:pointer;}',
        '.minisim-slider:focus-visible{outline:2px solid #7aa2e0;outline-offset:4px;}',
        /* Fullskärmsknapp — samma utseende som .fs-btn på sims-sidorna
           (vit cirkel, ink-ikon, uppe till vänster på scenen). */
        '.minisim-fsbtn{position:absolute;top:8px;left:8px;width:40px;height:40px;border-radius:50%;',
        '  display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.92);',
        '  color:#0f1620;border:none;cursor:pointer;padding:0;z-index:5;',
        '  box-shadow:0 1px 4px rgba(0,0,0,0.35);}',
        '.minisim-fsbtn:hover{background:#fff;}',
        '.minisim-fsbtn:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        /* Ljudknapp — samma cirkelstil, uppe till höger på scenen. */
        '.minisim-sndbtn{position:absolute;top:8px;right:8px;width:40px;height:40px;border-radius:50%;',
        '  display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.92);',
        '  color:#0f1620;border:none;cursor:pointer;padding:0;z-index:5;',
        '  box-shadow:0 1px 4px rgba(0,0,0,0.35);}',
        '.minisim-sndbtn:hover{background:#fff;}',
        '.minisim-sndbtn:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        /* Fullskärm: mörkt rum, scenen centrerad, kontrollerna under. */
        '.minisim-card:fullscreen{max-width:none;border:none;border-radius:0;display:flex;',
        '  flex-direction:column;align-items:center;justify-content:center;background:#04060b;',
        '  padding:16px;gap:4px;}',
        '.minisim-card:fullscreen .minisim-scene{width:min(100%,calc((100vh - 150px)*' + (560 / 430) + '));}',
        '.minisim-card:fullscreen .minisim-controls,',
        '.minisim-card:fullscreen .minisim-slider-row{width:min(92vw,640px);}',
        '.minisim-card:-webkit-full-screen{max-width:none;border:none;border-radius:0;display:flex;',
        '  flex-direction:column;align-items:center;justify-content:center;background:#04060b;',
        '  padding:16px;gap:4px;}',
        '.minisim-card:-webkit-full-screen .minisim-scene{width:min(100%,calc((100vh - 150px)*' + (560 / 430) + '));}',
        '.minisim-card:-webkit-full-screen .minisim-controls,',
        '.minisim-card:-webkit-full-screen .minisim-slider-row{width:min(92vw,640px);}',
        /* Ljus temavariant (laborans papper) — standard för minisims som
           inte kräver mörker. Läggs som extra klass på kortet: ms-ljus. */
        '.minisim-card.ms-ljus{background:#f9f5ec;border-color:#d8cdb8;}',
        '.minisim-card.ms-ljus .minisim-title{color:#1f2530;}',
        '.minisim-card.ms-ljus .minisim-scene{border:1px solid #ddd3c0;}',
        '.minisim-card.ms-ljus .minisim-btn{background:#fdfaf3;border-color:#c9bfa9;color:#1f2530;}',
        '.minisim-card.ms-ljus .minisim-btn:hover{background:#f3ecdd;border-color:#b4a88e;}',
        '.minisim-card.ms-ljus .minisim-btn.ms-primar{background:#b8531f;border-color:#a04617;color:#fff4e8;}',
        '.minisim-card.ms-ljus .minisim-btn.ms-primar:hover{background:#c95f26;}',
        /* Vald-markering för växelknappar (t.ex. klossform i valtning) —
           ms-primar är reserverad för huvudåtgärden. */
        '.minisim-card.ms-ljus .minisim-btn.ms-vald{border-color:#b8531f;color:#8a3c12;background:#f7e7d8;}',
        '.minisim-card.ms-ljus .minisim-check{color:#4a5160;}',
        '.minisim-card.ms-ljus .minisim-info{color:#6a7180;}',
        '.minisim-card.ms-ljus .minisim-slider-lbl{color:#4a5160;}',
        '.minisim-card.ms-ljus .minisim-slider-val{color:#1f2530;}',
        '.minisim-card.ms-ljus .minisim-slider{background:#d8cdb8;}',
        '.minisim-card.ms-ljus .minisim-slider::-webkit-slider-thumb{border-color:#f9f5ec;}',
        '.minisim-card.ms-ljus .minisim-slider::-moz-range-thumb{border-color:#f9f5ec;}',
        '.minisim-card.ms-ljus .minisim-fsbtn,',
        '.minisim-card.ms-ljus .minisim-sndbtn{box-shadow:0 1px 4px rgba(15,22,32,0.22);',
        '  border:1px solid #d8cdb8;}',
        '.minisim-card.ms-ljus:fullscreen{background:#f2ebdc;}',
        '.minisim-card.ms-ljus:-webkit-full-screen{background:#f2ebdc;}',
        /* typ: talmangder — interaktiv talmängdsfigur. Varje mängd är en
           <g class="ms-tm-grupp"> med mängdens färg i CSS-variabeln --tmf;
           hover/vald styr tint, konturvikt, symbol-popp och extra-talen. */
        '.ms-tm-scene{background:linear-gradient(180deg,#f7f2e8,#ece3d2);}',
        '.ms-tm-svg{display:block;width:100%;height:auto;}',
        '.ms-tm-region{fill:var(--tmf);fill-opacity:0;pointer-events:fill;cursor:pointer;',
        '  transition:fill-opacity .18s ease;outline:none;}',
        '.ms-tm-grupp.ms-tm-hover .ms-tm-region{fill-opacity:.12;}',
        '.ms-tm-grupp.ms-tm-vald .ms-tm-region{fill-opacity:.2;}',
        '.ms-tm-ellips{transition:stroke .18s ease,stroke-width .18s ease;pointer-events:none;}',
        '.ms-tm-grupp.ms-tm-hover .ms-tm-ellips,',
        '.ms-tm-grupp.ms-tm-vald .ms-tm-ellips{stroke:var(--tmf);stroke-width:2.6;}',
        '.ms-tm-sym{transition:transform .18s ease,fill .18s ease;pointer-events:none;',
        '  transform-box:fill-box;transform-origin:center;}',
        '.ms-tm-grupp.ms-tm-hover .ms-tm-sym,',
        '.ms-tm-grupp.ms-tm-vald .ms-tm-sym{transform:scale(1.35);fill:var(--tmf);}',
        '.ms-tm-extra{opacity:0;transition:opacity .35s ease;pointer-events:none;}',
        '.ms-tm-grupp.ms-tm-vald .ms-tm-extra{opacity:1;}',
        '.ms-tm-panel{margin-top:10px;font-family:' + FONT + ';font-style:normal;',
        '  font-size:14px;line-height:1.55;color:#2c3340;background:#fdfaf3;',
        '  border:1px solid #ddd3c0;border-radius:4px;padding:10px 13px;min-height:82px;}',
        '.ms-tm-panel b{color:inherit;}',
        /* (.lab-minisim-marginalen ligger i styles-laborans.css, som
           .lab-graf/.lab-handskrift.) Neutralisera ev. ärvd kursiv stil. */
        '.minisim-iframe{display:block;width:100%;aspect-ratio:560/430;border:0;',
        '  border-radius:4px;background:#eef0ee;}',
        /* Situationsväxlare (typ: cirkularrorelse) — uppe till höger på
           scenen, samma stil som simuleringssidornas sim-switch (mörk
           aktiv flik på ljus botten). Krockar inte med iframens .fs-btn,
           som sitter uppe till vänster. */
        '.ms-sitvaxel{position:absolute;top:8px;right:8px;z-index:5;display:flex;',
        '  border-radius:6px;overflow:hidden;border:1px solid #c9bfa9;',
        '  box-shadow:0 1px 4px rgba(15,22,32,0.22);}',
        '.ms-sitvaxel button{appearance:none;border:none;margin:0;padding:8px 13px;',
        '  font-family:' + FONT + ';font-size:12.5px;font-weight:600;line-height:1;',
        '  cursor:pointer;background:rgba(255,255,255,0.92);color:#1f2530;font-style:normal;}',
        '.ms-sitvaxel button:hover{background:#fff;}',
        '.ms-sitvaxel button + button{border-left:1px solid #c9bfa9;}',
        '.ms-sitvaxel button.ms-aktiv{background:#0f1620;color:#f3eee4;cursor:default;}',
        '.ms-sitvaxel button:focus-visible{outline:2px solid #7aa2e0;outline-offset:2px;}',
        /* Smal skärm: fyra knappar ryms inte i scenens hörn (de täckte
           halva bilden på 390 px). Växlaren blir då en egen rad under
           scenen, med knapparna jämnt fördelade i bredd. */
        '@media (max-width:600px){',
        '  .ms-sitvaxel{position:static;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));',
        '    margin-top:6px;box-shadow:none;}',
        '  .ms-sitvaxel button{padding:8px 4px;font-size:12px;}',
        '  .ms-sitvaxel button:nth-child(n+3){border-top:1px solid #c9bfa9;}',
        '  .ms-sitvaxel button:nth-child(3){border-left:none;}',
        '}',
        /* typ: kastvektorer — hjälpfiguren i fy2-1.8 med tre lager som
           kryssrutorna tänder och släcker. Kortet är bredare (ms-bred) så
           att figuren får sin fulla bredd (593 px) och etiketterna sin
           storlek. */
        '.minisim-card.ms-bred{max-width:664px;}',
        '.ms-kv-scene{background:linear-gradient(180deg,#f7f2e8,#ece3d2);padding:8px 4px 4px;}',
        '.ms-kv-svg{display:block;width:100%;max-width:593px;height:auto;margin:0 auto;font-style:normal;}',
        '.ms-kv-lager{transition:opacity .2s ease;}',
        '.ms-kv-lager.ms-dold{opacity:0;visibility:hidden;}',
        /* SVG-scener med fullskärm (msFullskarm): scenen så stor som höjden
           tillåter, med plats för verktygen under. --ms-asp = bredd/höjd. */
        '.minisim-card.ms-svgfs:fullscreen{justify-content:center;}',
        '.minisim-card.ms-svgfs:fullscreen .minisim-scene{width:min(100%,calc((100vh - var(--ms-fs-ctrl,220px))*var(--ms-asp,1.8)));}',
        '.minisim-card.ms-svgfs:fullscreen .ms-kv-svg{max-width:none!important;width:100%;height:auto;}',
        '.minisim-card.ms-svgfs:fullscreen .minisim-info{width:min(92vw,640px);}',
        /* ms-brod har flex-basis:100 %, som i fullskärmens kolumn blir hela höjden och trycker ihop scenen */
        '.minisim-card:fullscreen .minisim-info.ms-brod,.minisim-card:-webkit-full-screen .minisim-info.ms-brod{flex-basis:auto;}',
        '.minisim-card.ms-svgfs:fullscreen .minisim-scene,.minisim-card.ms-svgfs:-webkit-full-screen .minisim-scene{flex-shrink:0;}',
        '.minisim-card.ms-svgfs:-webkit-full-screen .minisim-scene{width:min(100%,calc((100vh - var(--ms-fs-ctrl,220px))*var(--ms-asp,1.8)));}',
        '.minisim-card.ms-svgfs:-webkit-full-screen .ms-kv-svg{max-width:none!important;width:100%;height:auto;}',
        /* periodtid: knapparna och glidarna ligger på scenens papper, under
           figuren, så att reglage och svängning hör ihop. Smal skärm: en
           glidare per rad. */
        '.ms-pt-panel{display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1.3fr) minmax(0,1fr);gap:4px 16px;align-items:end;' +
            'margin:2px 10px 4px;padding-top:8px;border-top:1px dashed rgba(31,37,48,0.18);font-family:' + FONT + ';}',
        '.ms-pt-knappar{display:flex;flex-direction:column;gap:4px;}',
        '.ms-pt-knappar .minisim-btn{padding:5px 12px;font-size:13px;}',
        '.ms-pt-cell{display:flex;flex-direction:column;gap:2px;min-width:0;}',
        '.ms-pt-topp{display:flex;justify-content:space-between;gap:8px;font-size:13px;color:#4a5160;white-space:nowrap;}',
        '.ms-pt-topp b{font-weight:500;color:#1f2530;}',
        '.ms-pt-cell .minisim-slider{width:100%;flex:none;margin:6px 0 4px;}',
        '.ms-pp-panel{grid-template-columns:auto minmax(0,1fr) minmax(0,1fr);gap:4px 20px;}',
        '.ms-pp-panel .ms-pt-knappar{grid-row:span 2;align-self:center;}',
        '@media (max-width:600px){.ms-pt-panel{grid-template-columns:minmax(0,1fr);gap:6px;}.ms-pt-knappar{flex-direction:row;}}',
        /* typ: stegkast — teckenförklaring och stegtabell under scenen */
        '.ms-sk-legend{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:8px;font-family:' + FONT + ';',
        '  font-size:13px;color:#4a5160;font-style:normal;}',
        '.ms-sk-legend span{display:inline-flex;align-items:center;gap:6px;}',
        '.ms-sk-legend i{display:inline-block;width:18px;height:3px;border-radius:1px;}',
        '.ms-sk-legend i.ms-sk-streck{height:0;border-top:2px dashed #7c828c;}',
        '.minisim-slider-row.ms-sk-av{opacity:.45;}',
        '.ms-sk-tabwrap{margin-top:8px;overflow-x:auto;border:1px solid #ddd3c0;border-radius:4px;background:#fdfaf3;}',
        '.ms-sk-tab{border-collapse:collapse;width:100%;margin:0!important;font-family:' + FONT + ';font-size:12.5px;',
        '  font-variant-numeric:tabular-nums;color:#1f2530;font-style:normal;white-space:nowrap;}',
        '.ms-sk-tab th,.ms-sk-tab td{padding:4px 8px;text-align:right;border-bottom:1px solid #ece3d2;}',
        '.ms-sk-tab th{font-weight:600;color:#4a5160;background:#f3ecdd;}',
        '.ms-sk-tab tr.ms-sk-akt td{background:#e6eefb;font-weight:600;}',
        '.ms-sk-not{margin-top:6px;font-size:12.5px;}',
        /* Fullskärm (typ: stegkast): kortet rymmer mycket mer än scenen
           (reglage, tabell), så den vanliga kolumnen klämde ihop scenen.
           Bred skärm: scenen så stor som höjden tillåter till vänster och
           verktygen i en skrollbar panel till höger. Stående eller smal
           skärm: scenen överst och panelen under, och kortet skrollar. */
        '.minisim-card.ms-sk:fullscreen{flex-direction:row;align-items:center;justify-content:center;gap:20px;padding:16px;}',
        '.minisim-card.ms-sk:-webkit-full-screen{flex-direction:row;align-items:center;justify-content:center;gap:20px;padding:16px;}',
        '.minisim-card.ms-sk:fullscreen .minisim-scene{flex:0 0 auto;width:min(calc(100vw - 540px),calc((100vh - 40px)*var(--ms-asp,2)));}',
        '.minisim-card.ms-sk:-webkit-full-screen .minisim-scene{flex:0 0 auto;width:min(calc(100vw - 540px),calc((100vh - 40px)*var(--ms-asp,2)));}',
        '.minisim-card.ms-sk:fullscreen .ms-sk-panel{flex:0 0 480px;width:480px;max-height:calc(100vh - 32px);overflow-y:auto;padding-right:4px;}',
        '.minisim-card.ms-sk:-webkit-full-screen .ms-sk-panel{flex:0 0 480px;width:480px;max-height:calc(100vh - 32px);overflow-y:auto;padding-right:4px;}',
        '.minisim-card.ms-sk:fullscreen .ms-sk-panel .minisim-controls{width:auto;}',
        '.minisim-card.ms-sk:-webkit-full-screen .ms-sk-panel .minisim-controls{width:auto;}',
        '.minisim-card.ms-sk:fullscreen .ms-sk-panel .minisim-slider-row{width:auto;}',
        '.minisim-card.ms-sk:-webkit-full-screen .ms-sk-panel .minisim-slider-row{width:auto;}',
        '.minisim-card.ms-sk:fullscreen .ms-sk-panel .minisim-info{width:auto;}',
        '.minisim-card.ms-sk:-webkit-full-screen .ms-sk-panel .minisim-info{width:auto;}',
        '.minisim-card.ms-sk:fullscreen .ms-sk-tab th,.minisim-card.ms-sk:fullscreen .ms-sk-tab td{padding:4px 5px;}',
        '.minisim-card.ms-sk:-webkit-full-screen .ms-sk-tab th,.minisim-card.ms-sk:-webkit-full-screen .ms-sk-tab td{padding:4px 5px;}',
        '@media (max-width:900px),(orientation:portrait){',
        '.minisim-card.ms-sk:fullscreen{flex-direction:column;align-items:stretch;justify-content:flex-start;overflow-y:auto;}',
        '.minisim-card.ms-sk:-webkit-full-screen{flex-direction:column;align-items:stretch;justify-content:flex-start;overflow-y:auto;}',
        '.minisim-card.ms-sk:fullscreen .minisim-scene{width:100%;flex:0 0 auto;}',
        '.minisim-card.ms-sk:-webkit-full-screen .minisim-scene{width:100%;flex:0 0 auto;}',
        '.minisim-card.ms-sk:fullscreen .ms-sk-panel{flex:0 0 auto;width:100%;max-height:none;overflow:visible;}',
        '.minisim-card.ms-sk:-webkit-full-screen .ms-sk-panel{flex:0 0 auto;width:100%;max-height:none;overflow:visible;}',
        '}',
        /* typ: blixtljud (fy2-2.10): svarsraden i gissa-läget */
        '.ms-bl-svar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:10px;font-family:' + FONT + ';font-size:14px;color:#dde2ec;font-style:normal;}',
        '.ms-bl-svar label{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;}',
        '.ms-bl-svar input{width:72px;padding:7px 8px;border-radius:4px;border:1px solid #3a4150;background:#0d111a;color:#f2c94c;font:600 15px ' + FONT + ';text-align:right;}',
        '.ms-bl-svar input:focus{outline:2px solid #7aa2e0;outline-offset:1px;}',
        '.ms-bl-info{margin-top:10px;line-height:1.45;font-size:14px;color:#aab1bf;}',
        '.ms-bl-info b{color:#f2c94c;font-weight:600;}',
        '.ms-bl-avl{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px;font-family:' + FONT + ';font-size:14px;color:#8a93a5;font-style:normal;font-variant-numeric:tabular-nums;}',
        '.ms-bl-avl b{font-weight:600;font-size:16px;}',
        '.minisim-card.ms-bl .minisim-btn.ms-vald{border-color:#d06a30;color:#ffd9bf;background:#2a1a12;}',
        '.minisim-card.ms-bl:fullscreen .ms-bl-svar,.minisim-card.ms-bl:-webkit-full-screen .ms-bl-svar{width:min(92vw,640px);}',
        '.minisim-card.ms-bl:fullscreen .minisim-scene,.minisim-card.ms-bl:-webkit-full-screen .minisim-scene{width:100%;}',
        '.lab-minisim p{margin:0;}'
    ].join('\n');

    function injectCss() {
        if (document.getElementById('minisim-style')) return;
        var st = document.createElement('style');
        st.id = 'minisim-style';
        st.textContent = CSS;
        document.head.appendChild(st);
    }

    // ── Konfigparser ("nyckel: värde" per rad) ────────────────────────────
    function parseConfig(src) {
        var cfg = {};
        src.split('\n').forEach(function (line) {
            var m = line.match(/^([a-zåäöA-ZÅÄÖ_][\wåäöÅÄÖ]*)\s*:\s*(.*)$/);
            if (m) cfg[m[1].toLowerCase()] = m[2].trim();
        });
        return cfg;
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: tomtebloss
    // ══════════════════════════════════════════════════════════════════════
    function buildTomtebloss(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var CX = W / 2, CY = H / 2 - 22;   // rotationscentrum (chucken)
        var R0 = 118;                      // tomteblossets fulla längd (px)
        var R_SLUT = 40;                   // brinnpunkt-radie där blosset tar slut
        var BURN_RATE = 2.1;               // px/s som brinnpunkten kryper inåt
        var GRAV = 300;                    // px/s²
        var DRAG = 3.6;                    // luftmotstånd (1/s)
        var MAX_P = 2600;                  // partikeltak

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'Ett tomtebloss fäst i en skruvdragare, i mörker. När skruvdragaren ' +
            'roterar lämnar gnistorna cirkelbanan tangentiellt i rörelsens riktning.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);

        // Ljudknapp (högtalare / överstruken högtalare)
        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        sndBtn.innerHTML = ICON_SND_ON;
        scene.appendChild(sndBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var tandBtn = document.createElement('button');
        tandBtn.type = 'button';
        tandBtn.className = 'minisim-btn ms-primar';
        tandBtn.textContent = 'Tänd tomteblosset';

        var drillBtn = document.createElement('button');
        drillBtn.type = 'button';
        drillBtn.className = 'minisim-btn';
        drillBtn.textContent = 'Starta skruvdragaren';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var nyBtn = document.createElement('button');
        nyBtn.type = 'button';
        nyBtn.className = 'minisim-btn';
        nyBtn.textContent = 'Nytt tomtebloss';
        nyBtn.style.display = 'none';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var trailLbl = document.createElement('label');
        trailLbl.className = 'minisim-check';
        var trailCb = document.createElement('input');
        trailCb.type = 'checkbox';
        trailLbl.appendChild(trailCb);
        trailLbl.appendChild(document.createTextNode('Visa spår'));

        var info = document.createElement('span');
        info.className = 'minisim-info';
        info.textContent = 'Varvtal: 0 varv/s';

        controls.appendChild(tandBtn);
        controls.appendChild(drillBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(nyBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(trailLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        // Varvtalsglidare — styr skruvdragarens (mål)varvtal i varv/s.
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Varvtal';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0.5';
        slider.max = '6';
        slider.step = '0.1';
        slider.value = '4.2';
        slider.setAttribute('aria-label', 'Skruvdragarens varvtal i varv per sekund');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function targetOmega() { return 2 * Math.PI * parseFloat(slider.value); }
        function syncSliderVal() {
            sliderVal.textContent = (window.I18N ? I18N.t('{v} varv/s', { v: fmt(parseFloat(slider.value), 1) }) : fmt(parseFloat(slider.value), 1) + ' varv/s');
        }
        syncSliderVal();

        // ── Canvas-uppsättning ────────────────────────────────────────────
        // Backing-storen följer den VISADE storleken (skarp även i
        // fullskärm); all ritning sker i logiska koordinater (W × H).
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Spårlager ("Visa spår") ───────────────────────────────────────
        // Gnistornas banor ackumuleras på en egen offscreen-canvas i logiska
        // koordinater (2× för skärpa) och tonas långsamt bort — som en lång
        // exponering. Då syns det i efterhand att gnistorna lämnar
        // cirkelbanan TANGENTIELLT, inte radiellt.
        var TRAIL_SS = 2;
        var trailCanvas = document.createElement('canvas');
        trailCanvas.width = W * TRAIL_SS;
        trailCanvas.height = H * TRAIL_SS;
        var tctx = trailCanvas.getContext('2d');
        tctx.setTransform(TRAIL_SS, 0, 0, TRAIL_SS, 0, 0);
        tctx.lineCap = 'round';
        var trailFadeAcc = 0;

        function clearTrails() {
            tctx.save();
            tctx.setTransform(1, 0, 0, 1, 0, 0);
            tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
            tctx.restore();
        }
        function fadeTrails(dt) {
            // tonas i klumpar om ≥0,05 alfa — mindre steg avrundas bort
            trailFadeAcc += 0.22 * dt;
            if (trailFadeAcc < 0.05) return;
            tctx.globalCompositeOperation = 'destination-out';
            tctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, trailFadeAcc).toFixed(3) + ')';
            tctx.fillRect(0, 0, W, H);
            tctx.globalCompositeOperation = 'source-over';
            trailFadeAcc = 0;
        }

        // ── Tillstånd ─────────────────────────────────────────────────────
        var lit = false;        // brinner blosset?
        var burnt = false;      // har det brunnit ut?
        var drillOn = false;
        var paused = false;     // fryst bild — gnistorna står stilla i luften
        var theta = -Math.PI / 2;   // blossets vinkel (rakt upp från chucken)
        var omega = 0;              // rad/s
        var burnR = R0;             // brinnpunktens radie
        var particles = [];
        var emitAcc = 0;            // ackumulerad bråkdels-emission
        var flick = 1;              // flimmerfaktor för glöden
        var running = false;        // rAF-loop aktiv?
        var visible = true;         // syns i viewport?
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowCb.checked ? 0.25 : 1; }

        // ── Ljud (Web Audio, helt syntetiserat — inga ljudfiler) ──────────
        // Motorton: två oscillatorer vars frekvens följer varvtalet.
        // Sprak: procedurellt genererad crackle-buffer (fizz + slumpvisa
        // knallar med exponentiella svansar) som loopas genom ett högpass.
        // I ultrarapid pitchas båda ner. Skapas lazy vid första knapptryck
        // (webbläsarnas autoplay-policy kräver en användargest).
        var AC = window.AudioContext || window.webkitAudioContext;
        var audio = null;
        var soundOn = true;

        function makeCrackleBuffer(actx) {
            var sr = actx.sampleRate;
            var len = Math.floor(sr * 2);
            var buf = actx.createBuffer(1, len, sr);
            var d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.05; // fräs
            for (var n = 0; n < 700; n++) {                                      // knallar
                var pos = Math.floor(Math.random() * (len - sr * 0.03));
                var amp = 0.25 + Math.random() * 0.75;
                var tau = sr * (0.0008 + Math.random() * 0.004);
                var dur = Math.floor(tau * 6);
                for (var k = 0; k < dur; k++) {
                    d[pos + k] += (Math.random() * 2 - 1) * amp * Math.exp(-k / tau);
                }
            }
            for (i = 0; i < len; i++) d[i] = Math.tanh(d[i]);                    // mjuk topp
            return buf;
        }

        function ensureAudio() {
            if (audio || !AC) return;
            var actx = new AC();
            var master = actx.createGain();
            master.gain.value = 0.6;
            master.connect(actx.destination);
            // motor
            var motorGain = actx.createGain();
            motorGain.gain.value = 0;
            var motorFilt = actx.createBiquadFilter();
            motorFilt.type = 'lowpass';
            motorFilt.frequency.value = 1600;
            motorFilt.Q.value = 1.5;
            var o1 = actx.createOscillator();
            o1.type = 'sawtooth';
            o1.frequency.value = 80;
            var o2 = actx.createOscillator();
            o2.type = 'square';
            o2.frequency.value = 162;
            var o2g = actx.createGain();
            o2g.gain.value = 0.3;
            o1.connect(motorFilt);
            o2.connect(o2g);
            o2g.connect(motorFilt);
            motorFilt.connect(motorGain);
            motorGain.connect(master);
            o1.start();
            o2.start();
            // sprak
            var crackleGain = actx.createGain();
            crackleGain.gain.value = 0;
            var hp = actx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 1700;
            var src = actx.createBufferSource();
            src.buffer = makeCrackleBuffer(actx);
            src.loop = true;
            src.connect(hp);
            hp.connect(crackleGain);
            crackleGain.connect(master);
            src.start();
            audio = { ctx: actx, master: master, motorGain: motorGain,
                      o1: o1, o2: o2, crackleGain: crackleGain, crackleSrc: src };
        }

        function resumeAudio() {
            ensureAudio();
            if (audio && audio.ctx.state === 'suspended') audio.ctx.resume();
        }

        function updateAudio() {
            if (!audio) return;
            var t = audio.ctx.currentTime;
            var ts = timeScale();
            var active = soundOn && visible && !document.hidden && !paused;
            // motorton — gain och frekvens följer det faktiska varvtalet
            var revs = Math.abs(omega) / (2 * Math.PI);
            var mg = (active && revs > 0.05) ? Math.min(0.5, 0.1 + revs * 0.09) : 0;
            audio.motorGain.gain.setTargetAtTime(mg, t, 0.06);
            var f = (55 + revs * 48) * (0.35 + 0.65 * ts);
            audio.o1.frequency.setTargetAtTime(f, t, 0.06);
            audio.o2.frequency.setTargetAtTime(f * 2.02, t, 0.06);
            // sprak — följer glödens flimmer, tystnar när blosset dör
            var cg = (active && lit) ? (0.32 + 0.22 * flick) : 0;
            audio.crackleGain.gain.setTargetAtTime(cg, t, 0.05);
            audio.crackleSrc.playbackRate.setTargetAtTime(ts < 1 ? 0.45 : 1, t, 0.1);
        }

        // ── Partiklar ─────────────────────────────────────────────────────
        function spawnSpark(x, y, vx, vy, main) {
            if (particles.length >= MAX_P) return;
            var life = main ? (0.28 + Math.random() * 0.65)
                            : (0.10 + Math.random() * 0.22);
            particles.push({
                x: x, y: y, px: x, py: y, vx: vx, vy: vy,
                age: 0, life: life,
                w: main ? (0.9 + Math.random() * 1.1) : (0.6 + Math.random() * 0.6),
                // andel av livet där gnistan ev. "poppar" i en stjärna
                popAt: (Math.random() < 0.42 && main) ? (0.55 + Math.random() * 0.35) : 2,
                main: main
            });
        }

        // Utkastfart för glödande partiklar ur brinnzonen (låga farter
        // dominerar). Riktningen är likformig åt alla håll.
        function ejectVel() {
            var a = Math.random() * 2 * Math.PI;
            var s = 40 + 240 * Math.random() * Math.random();
            return { vx: Math.cos(a) * s, vy: Math.sin(a) * s };
        }

        function emit(dt, thPrev) {
            if (!lit) return;
            var rate = 230 + 3.8 * Math.abs(omega);
            emitAcc += rate * dt;
            var n = Math.floor(emitAcc);
            emitAcc -= n;
            for (var i = 0; i < n; i++) {
                // fördela emissionen längs bågen som spetsen svepte under
                // frame:en, så gnistregnet blir jämnt även vid hög fart
                var f = Math.random();
                var th = thPrev + (theta - thPrev) * f;
                var x = CX + burnR * Math.cos(th);
                var y = CY + burnR * Math.sin(th);
                // KÄRNFYSIKEN: gnistan ärver spetsens tangentiella hastighet
                // (ω·r vinkelrätt mot radien) + en liten slumpvis utkastfart.
                var vtx = -Math.sin(th) * omega * burnR;
                var vty = Math.cos(th) * omega * burnR;
                var ev = ejectVel();
                spawnSpark(x, y, vtx + ev.vx, vty + ev.vy, true);
            }
        }

        function stepParticles(dt) {
            var kd = Math.exp(-DRAG * dt);
            var trails = trailCb.checked;
            if (trails) {
                tctx.strokeStyle = 'rgba(255,196,120,0.22)';
                tctx.lineWidth = 1;
            }
            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                p.px = p.x; p.py = p.y;
                p.vx *= kd;
                p.vy = p.vy * kd + GRAV * dt;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.age += dt;
                if (trails && p.main) {
                    tctx.beginPath();
                    tctx.moveTo(p.px, p.py);
                    tctx.lineTo(p.x, p.y);
                    tctx.stroke();
                }
                var t = p.age / p.life;
                if (t >= p.popAt) {
                    // gnistan brister i en liten stjärna av kortlivade barn
                    var nk = 4 + Math.floor(Math.random() * 4);
                    for (var k = 0; k < nk; k++) {
                        var a = Math.random() * 2 * Math.PI;
                        var s = 40 + Math.random() * 130;
                        spawnSpark(p.x, p.y,
                            p.vx * 0.25 + Math.cos(a) * s,
                            p.vy * 0.25 + Math.sin(a) * s, false);
                    }
                    particles.splice(i, 1);
                    continue;
                }
                if (t >= 1 || p.x < -60 || p.x > W + 60 || p.y > H + 60 || p.y < -60) {
                    particles.splice(i, 1);
                }
            }
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function drawBackground() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#04060b';
            ctx.fillRect(0, 0, W, H);
            // svag vinjett — extra mörka hörn
            var g = ctx.createRadialGradient(CX, CY, 60, CX, CY, 420);
            g.addColorStop(0, 'rgba(14,17,26,0.55)');
            g.addColorStop(1, 'rgba(0,0,0,0.72)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }

        function roundRect(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        }

        function drawDrill() {
            // Skruvdragare sedd rakt framifrån: chuck i rotationscentrum,
            // växelhus bakom, pistolgrepp nedåt med batteripack i botten.
            ctx.globalCompositeOperation = 'source-over';

            // handtag (lätt lutning åt höger nedåt)
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(0.10);
            ctx.fillStyle = '#101319';
            ctx.strokeStyle = '#1e232d';
            ctx.lineWidth = 1.5;
            roundRect(-17, 22, 34, 132, 10);
            ctx.fill(); ctx.stroke();
            // avtryckare
            roundRect(13, 48, 10, 26, 5);
            ctx.fillStyle = '#0c0f14';
            ctx.fill();
            // batteripack
            roundRect(-42, 146, 86, 34, 7);
            ctx.fillStyle = '#0e1117';
            ctx.fill(); ctx.stroke();
            ctx.restore();

            // växelhus
            ctx.beginPath();
            ctx.arc(CX, CY, 27, 0, 2 * Math.PI);
            ctx.fillStyle = '#151922';
            ctx.fill();
            ctx.strokeStyle = '#232937';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // chuck med tre backar som roterar med blosset
            ctx.beginPath();
            ctx.arc(CX, CY, 16, 0, 2 * Math.PI);
            ctx.fillStyle = '#1c212b';
            ctx.fill();
            ctx.strokeStyle = '#2c3342';
            ctx.stroke();
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(theta);
            ctx.strokeStyle = '#343c4e';
            ctx.lineWidth = 2.4;
            for (var k = 0; k < 3; k++) {
                var a = k * 2 * Math.PI / 3;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 5, Math.sin(a) * 5);
                ctx.lineTo(Math.cos(a) * 13, Math.sin(a) * 13);
                ctx.stroke();
            }
            ctx.restore();
            ctx.beginPath();
            ctx.arc(CX, CY, 3.4, 0, 2 * Math.PI);
            ctx.fillStyle = '#3c4456';
            ctx.fill();
        }

        function drawStickAt(th, alpha) {
            var cosT = Math.cos(th), sinT = Math.sin(th);
            // ometänd/kvarvarande del: chucken → brinnpunkten (grå sats)
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#767a82';
            ctx.lineWidth = 4.6;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(CX + 16 * cosT, CY + 16 * sinT);
            ctx.lineTo(CX + burnR * cosT, CY + burnR * sinT);
            ctx.stroke();
            // utbrunnen del: brinnpunkten → spetsen (tunn naken tråd)
            ctx.strokeStyle = '#3a3e46';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(CX + burnR * cosT, CY + burnR * sinT);
            ctx.lineTo(CX + R0 * cosT, CY + R0 * sinT);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        function drawStick() {
            // Rörelseoskärpa vid hög fart: spökbilder tätt bakåt längs bågen.
            // Oskärpan speglar den VISUELLA rotationen per bildruta, så i
            // ultrarapid (timeScale < 1) krymper den i motsvarande grad.
            var wVis = Math.abs(omega) * timeScale();
            var n = Math.min(9, Math.floor(wVis / 3));
            var stepA = Math.sign(omega) * wVis * 0.0045;
            for (var i = n; i >= 1; i--) {
                drawStickAt(theta - stepA * i, 0.07);
            }
            drawStickAt(theta, 1);
        }

        function drawGlow() {
            if (!lit) return;
            var tx = CX + burnR * Math.cos(theta);
            var ty = CY + burnR * Math.sin(theta);
            ctx.globalCompositeOperation = 'lighter';
            // vid snabb rotation: svag glödring längs spetsens cirkelbana
            // (tröghet i ögat — som en lång exponering)
            var ring = Math.min(0.14, Math.abs(omega) / 190);
            if (ring > 0.015) {
                ctx.strokeStyle = 'rgba(255,185,105,' + ring.toFixed(3) + ')';
                ctx.lineWidth = 7;
                ctx.beginPath();
                ctx.arc(CX, CY, burnR, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = 'rgba(255,220,160,' + (ring * 0.6).toFixed(3) + ')';
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }
            // rumsljus — det varma skenet som lyser upp skruvdragaren/mörkret
            var g = ctx.createRadialGradient(tx, ty, 4, tx, ty, 330);
            g.addColorStop(0, 'rgba(255,190,110,' + (0.16 * flick).toFixed(3) + ')');
            g.addColorStop(0.35, 'rgba(255,150,70,' + (0.055 * flick).toFixed(3) + ')');
            g.addColorStop(1, 'rgba(255,120,40,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            // brinnpunktens bländande kärna
            var c = ctx.createRadialGradient(tx, ty, 0, tx, ty, 26);
            c.addColorStop(0, 'rgba(255,255,245,' + (0.95 * flick).toFixed(3) + ')');
            c.addColorStop(0.25, 'rgba(255,220,150,' + (0.55 * flick).toFixed(3) + ')');
            c.addColorStop(1, 'rgba(255,160,60,0)');
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.arc(tx, ty, 26, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }

        function sparkStyle(t) {
            // vit → guld → orange → matt röd med falnande alfa
            if (t < 0.18) return 'rgba(255,252,240,';
            if (t < 0.5) return 'rgba(255,215,130,';
            if (t < 0.8) return 'rgba(255,160,64,';
            return 'rgba(220,90,40,';
        }

        function drawParticles() {
            ctx.globalCompositeOperation = 'lighter';
            ctx.lineCap = 'round';
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var t = p.age / p.life;
                var a = (1 - t) * (p.main ? 0.9 : 0.8);
                var col = sparkStyle(t);
                ctx.strokeStyle = col + a.toFixed(3) + ')';
                ctx.lineWidth = p.w;
                ctx.beginPath();
                ctx.moveTo(p.px, p.py);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                if (p.main && t < 0.4) {
                    ctx.fillStyle = 'rgba(255,255,235,' + (0.5 * (1 - t)).toFixed(3) + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.w * 0.8, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            ctx.globalCompositeOperation = 'source-over';
        }

        function render() {
            drawBackground();
            drawDrill();
            drawStick();
            drawGlow();
            if (trailCb.checked) {
                ctx.globalCompositeOperation = 'lighter';
                ctx.drawImage(trailCanvas, 0, 0, W, H);
                ctx.globalCompositeOperation = 'source-over';
            }
            drawParticles();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            var thPrev = theta;
            // skruvdragaren: mjuk uppspolning / utrullning mot glidarens mål
            var target = drillOn ? targetOmega() : 0;
            var k = drillOn ? 3.2 : 1.8;
            omega += (target - omega) * Math.min(1, k * dt);
            if (!drillOn && Math.abs(omega) < 0.02) omega = 0;
            theta += omega * dt;

            if (lit) {
                burnR -= BURN_RATE * dt;
                flick = 0.75 + 0.25 * Math.random();
                if (burnR <= R_SLUT) {
                    lit = false;
                    burnt = true;
                    burnR = R_SLUT;
                    syncUi();
                }
            }
            emit(dt, thPrev);
            stepParticles(dt);
            if (trailCb.checked) fadeTrails(dt);
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            updateAudio();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return lit || Math.abs(omega) > 0.02 || particles.length > 0;
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            info.textContent = (window.I18N ? I18N.t('Varvtal: {v} varv/s', { v: fmt(Math.abs(omega) / (2 * Math.PI), 1) }) : 'Varvtal: ' + fmt(Math.abs(omega) / (2 * Math.PI), 1) + ' varv/s');
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            tandBtn.style.display = (!lit && !burnt) ? '' : 'none';
            nyBtn.style.display = burnt ? '' : 'none';
            drillBtn.textContent = drillOn ? 'Stoppa skruvdragaren' : 'Starta skruvdragaren';
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
        }

        tandBtn.addEventListener('click', function () {
            lit = true;
            burnt = false;
            paused = false;
            resumeAudio();
            syncUi();
            kick();
        });
        drillBtn.addEventListener('click', function () {
            drillOn = !drillOn;
            paused = false;
            resumeAudio();
            syncUi();
            kick();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            updateAudio();  // tysta direkt vid paus
            if (!paused) kick();
            else render();  // frys exakt den bild som visas
        });
        nyBtn.addEventListener('click', function () {
            burnR = R0;
            burnt = false;
            lit = true;
            paused = false;
            particles.length = 0;
            resumeAudio();
            syncUi();
            kick();
        });
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            if (soundOn) resumeAudio();
            updateAudio();
        });
        slowCb.addEventListener('change', kick);
        trailCb.addEventListener('change', function () {
            if (!trailCb.checked) clearTrails();
            render();
            kick();
        });
        slider.addEventListener('input', function () {
            syncSliderVal();
            kick();
        });

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                updateAudio();  // tysta när widgeten skrollas ur bild
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            updateAudio();
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-skriptet i .shots/)
        card._audioState = function () { return audio ? audio.ctx.state : 'none'; };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: centrifug
    // ══════════════════════════════════════════════════════════════════════
    function buildCentrifug(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var CX = W / 2, CY = H / 2;        // rotationscentrum (korgens nav)
        var R_WALL = 150;                  // korgväggens radie
        var R_SVAMP = 126;                 // svampens mittradie (pressad mot väggen)
        var SVAMP_ARC = 0.40;              // vinkel som svampen upptar längs väggen
        var DRAG = 0.55;                   // luftmotstånd på dropparna (1/s)
        var OMEGA_MIN = 1.2;               // rad/s innan vattnet börjar pressas ut
        var VATTEN_TOT = 620;              // droppar i en fullblöt svamp
        var MAX_P = 1400;                  // partikeltak

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En blöt tvättsvamp i en roterande centrifugkorg, sedd rakt uppifrån. ' +
            'När centrifugen roterar lämnar vattendropparna cirkelbanan ' +
            'tangentiellt i rörelsens riktning.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);

        // Ljudknapp (högtalare / överstruken högtalare)
        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        sndBtn.innerHTML = ICON_SND_ON;
        scene.appendChild(sndBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var blotBtn = document.createElement('button');
        blotBtn.type = 'button';
        blotBtn.className = 'minisim-btn ms-primar';
        blotBtn.textContent = 'Blöt svampen';

        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn';
        startBtn.textContent = 'Starta centrifugen';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var trailLbl = document.createElement('label');
        trailLbl.className = 'minisim-check';
        var trailCb = document.createElement('input');
        trailCb.type = 'checkbox';
        trailLbl.appendChild(trailCb);
        trailLbl.appendChild(document.createTextNode('Visa spår'));

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(blotBtn);
        controls.appendChild(startBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(trailLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        // Varvtalsglidare — styr centrifugens (mål)varvtal i varv/s.
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Varvtal';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0.5';
        slider.max = '5';
        slider.step = '0.1';
        slider.value = '3';
        slider.setAttribute('aria-label', 'Centrifugens varvtal i varv per sekund');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function targetOmega() { return 2 * Math.PI * parseFloat(slider.value); }
        function syncSliderVal() {
            sliderVal.textContent = (window.I18N ? I18N.t('{v} varv/s', { v: fmt(parseFloat(slider.value), 1) }) : fmt(parseFloat(slider.value), 1) + ' varv/s');
        }
        syncSliderVal();

        // ── Canvas-uppsättning (samma mönster som tomteblosset) ───────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Spårlager ("Visa spår") ───────────────────────────────────────
        // Dropparnas banor ackumuleras på en egen offscreen-canvas (2× för
        // skärpa) och tonas långsamt bort — som en lång exponering. Då syns
        // det i efterhand att dropparna lämnar cirkelbanan TANGENTIELLT.
        var TRAIL_SS = 2;
        var trailCanvas = document.createElement('canvas');
        trailCanvas.width = W * TRAIL_SS;
        trailCanvas.height = H * TRAIL_SS;
        var tctx = trailCanvas.getContext('2d');
        tctx.setTransform(TRAIL_SS, 0, 0, TRAIL_SS, 0, 0);
        tctx.lineCap = 'round';
        var trailFadeAcc = 0;

        function clearTrails() {
            tctx.save();
            tctx.setTransform(1, 0, 0, 1, 0, 0);
            tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
            tctx.restore();
        }
        function fadeTrails(dt) {
            // tonas i klumpar om ≥0,05 alfa — mindre steg avrundas bort
            trailFadeAcc += 0.16 * dt;
            if (trailFadeAcc < 0.05) return;
            tctx.globalCompositeOperation = 'destination-out';
            tctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, trailFadeAcc).toFixed(3) + ')';
            tctx.fillRect(0, 0, W, H);
            tctx.globalCompositeOperation = 'source-over';
            trailFadeAcc = 0;
        }

        // ── Tillstånd ─────────────────────────────────────────────────────
        var wet = 0;                // vatten kvar i svampen, 0–1 (startar torr)
        var spinOn = false;
        var paused = false;         // fryst bild — dropparna står stilla i luften
        var theta = -Math.PI / 2;   // svampens vinkel (rakt upp från navet)
        var omega = 0;              // rad/s
        var particles = [];
        var emitAcc = 0;            // ackumulerad bråkdels-emission
        var emitRateSm = 0;         // glättad utslungningstakt (för ljudet)
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        // Svampens porer — slumpas EN gång så mönstret inte flimrar.
        var pores = [];
        for (var pi = 0; pi < 15; pi++) {
            pores.push({
                r: -16 + Math.random() * 32,     // radiellt läge i svampen
                s: -25 + Math.random() * 50,     // tangentiellt läge
                rad: 1.4 + Math.random() * 2.2
            });
        }

        function timeScale() { return slowCb.checked ? 0.25 : 1; }

        // ── Ljud (Web Audio, helt syntetiserat — inga ljudfiler) ──────────
        // Motorton: två oscillatorer vars frekvens följer varvtalet.
        // Vattenfräs: loopad vitbrus-buffer genom högpass, gain följer den
        // glättade utslungningstakten. Skapas lazy vid första knapptryck.
        var AC = window.AudioContext || window.webkitAudioContext;
        var audio = null;
        var soundOn = true;

        function makeNoiseBuffer(actx) {
            var sr = actx.sampleRate;
            var len = Math.floor(sr * 1.5);
            var buf = actx.createBuffer(1, len, sr);
            var d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
            return buf;
        }

        function ensureAudio() {
            if (audio || !AC) return;
            var actx = new AC();
            var master = actx.createGain();
            master.gain.value = 0.55;
            master.connect(actx.destination);
            // motor
            var motorGain = actx.createGain();
            motorGain.gain.value = 0;
            var motorFilt = actx.createBiquadFilter();
            motorFilt.type = 'lowpass';
            motorFilt.frequency.value = 1300;
            motorFilt.Q.value = 1.2;
            var o1 = actx.createOscillator();
            o1.type = 'sawtooth';
            o1.frequency.value = 60;
            var o2 = actx.createOscillator();
            o2.type = 'square';
            o2.frequency.value = 121;
            var o2g = actx.createGain();
            o2g.gain.value = 0.3;
            o1.connect(motorFilt);
            o2.connect(o2g);
            o2g.connect(motorFilt);
            motorFilt.connect(motorGain);
            motorGain.connect(master);
            o1.start();
            o2.start();
            // vattenfräs
            var sprayGain = actx.createGain();
            sprayGain.gain.value = 0;
            var hp = actx.createBiquadFilter();
            hp.type = 'highpass';
            hp.frequency.value = 1500;
            var src = actx.createBufferSource();
            src.buffer = makeNoiseBuffer(actx);
            src.loop = true;
            src.connect(hp);
            hp.connect(sprayGain);
            sprayGain.connect(master);
            src.start();
            audio = { ctx: actx, master: master, motorGain: motorGain,
                      o1: o1, o2: o2, sprayGain: sprayGain, spraySrc: src };
        }

        function resumeAudio() {
            ensureAudio();
            if (audio && audio.ctx.state === 'suspended') audio.ctx.resume();
        }

        function updateAudio() {
            if (!audio) return;
            var t = audio.ctx.currentTime;
            var ts = timeScale();
            var active = soundOn && visible && !document.hidden && !paused;
            // motorton — gain och frekvens följer det faktiska varvtalet
            var revs = Math.abs(omega) / (2 * Math.PI);
            var mg = (active && revs > 0.05) ? Math.min(0.45, 0.08 + revs * 0.08) : 0;
            audio.motorGain.gain.setTargetAtTime(mg, t, 0.06);
            var f = (48 + revs * 44) * (0.35 + 0.65 * ts);
            audio.o1.frequency.setTargetAtTime(f, t, 0.06);
            audio.o2.frequency.setTargetAtTime(f * 2.02, t, 0.06);
            // vattenfräs — följer utslungningstakten, tystnar när svampen är torr
            var sg = active ? Math.min(0.4, emitRateSm / 260) : 0;
            audio.sprayGain.gain.setTargetAtTime(sg, t, 0.08);
            audio.spraySrc.playbackRate.setTargetAtTime(ts < 1 ? 0.5 : 1, t, 0.1);
        }

        // ── Droppar ───────────────────────────────────────────────────────
        function spawnDrop(th) {
            if (particles.length >= MAX_P) return;
            // droppen lämnar korgväggen någonstans längs svampens bredd
            var a = th + (Math.random() - 0.5) * SVAMP_ARC;
            var x = CX + R_WALL * Math.cos(a);
            var y = CY + R_WALL * Math.sin(a);
            // KÄRNFYSIKEN: droppen ärver svampens tangentiella hastighet
            // (ω·r vinkelrätt mot radien) + en liten radiell läckfart.
            var vtx = -Math.sin(a) * omega * R_WALL;
            var vty = Math.cos(a) * omega * R_WALL;
            var leak = 25 + 80 * Math.random() * Math.random();
            particles.push({
                x: x, y: y, px: x, py: y,
                vx: vtx + Math.cos(a) * leak + (Math.random() - 0.5) * 30,
                vy: vty + Math.sin(a) * leak + (Math.random() - 0.5) * 30,
                age: 0, life: 1.6,
                w: 1.1 + Math.random() * 1.1
            });
        }

        function emit(dt, thPrev) {
            if (wet <= 0) return 0;
            // vattnet pressas ut först när rotationen övervinner svampens
            // förmåga att hålla kvar det — takten växer med varvtalet
            var excess = Math.max(0, Math.abs(omega) - OMEGA_MIN);
            var rate = excess * 7 * (0.3 + 0.7 * wet);
            if (rate <= 0) return 0;
            emitAcc += rate * dt;
            var n = Math.floor(emitAcc);
            emitAcc -= n;
            for (var i = 0; i < n; i++) {
                // fördela emissionen längs bågen som svampen svepte under
                // frame:en, så duschen blir jämn även vid hög fart
                var f = Math.random();
                spawnDrop(thPrev + (theta - thPrev) * f);
            }
            wet = Math.max(0, wet - rate * dt / VATTEN_TOT);
            if (wet === 0) syncUi();
            return rate;
        }

        function stepParticles(dt) {
            var kd = Math.exp(-DRAG * dt);
            var trails = trailCb.checked;
            if (trails) {
                tctx.strokeStyle = 'rgba(43,105,180,0.20)';
                tctx.lineWidth = 1.1;
            }
            for (var i = particles.length - 1; i >= 0; i--) {
                var p = particles[i];
                p.px = p.x; p.py = p.y;
                p.vx *= kd;
                p.vy *= kd;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.age += dt;
                if (trails) {
                    tctx.beginPath();
                    tctx.moveTo(p.px, p.py);
                    tctx.lineTo(p.x, p.y);
                    tctx.stroke();
                }
                if (p.age >= p.life ||
                    p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
                    particles.splice(i, 1);
                }
            }
        }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            ctx.globalCompositeOperation = 'source-over';
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            // rutnätet — som om simuleringen låg på ett kollegieblock
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function drawBasket() {
            ctx.globalCompositeOperation = 'source-over';
            // korgens botten — ljus metall mot pappret
            var g = ctx.createRadialGradient(CX, CY, 20, CX, CY, R_WALL);
            g.addColorStop(0, '#fdfaf3');
            g.addColorStop(1, '#efe7d5');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(CX, CY, R_WALL, 0, 2 * Math.PI);
            ctx.fill();
            // ekrar som roterar med korgen
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(theta);
            ctx.strokeStyle = '#a8aeb8';
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            for (var k = 0; k < 4; k++) {
                var a = k * Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 18, Math.sin(a) * 18);
                ctx.lineTo(Math.cos(a) * (R_WALL - 5), Math.sin(a) * (R_WALL - 5));
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawWall() {
            // korgväggen ritas EFTER svampen så den ser pressad ut mot väggen
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.arc(CX, CY, R_WALL, 0, 2 * Math.PI);
            ctx.strokeStyle = '#1f2530';
            ctx.lineWidth = 7;
            ctx.stroke();
            // perforeringen (hålen vattnet slungas ut genom) roterar med korgen
            ctx.fillStyle = '#ece3d2';
            for (var k = 0; k < 30; k++) {
                var a = theta + k * 2 * Math.PI / 30;
                ctx.beginPath();
                ctx.arc(CX + R_WALL * Math.cos(a), CY + R_WALL * Math.sin(a),
                        2.1, 0, 2 * Math.PI);
                ctx.fill();
            }
            // navet
            ctx.beginPath();
            ctx.arc(CX, CY, 14, 0, 2 * Math.PI);
            ctx.fillStyle = '#2a3140';
            ctx.fill();
            ctx.strokeStyle = '#1f2530';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(CX, CY, 3.2, 0, 2 * Math.PI);
            ctx.fillStyle = '#dfd6c2';
            ctx.fill();
        }

        function lerpByte(a, b, t) { return Math.round(a + (b - a) * t); }

        function drawSpongeAt(th, alpha) {
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(th);
            ctx.globalAlpha = alpha;
            // torr svamp är blekgul, blöt är mörkare och mättad
            var fill = 'rgb(' + lerpByte(226, 199, wet) + ',' +
                                lerpByte(211, 168, wet) + ',' +
                                lerpByte(148, 74, wet) + ')';
            ctx.fillStyle = fill;
            ctx.strokeStyle = 'rgba(20,16,6,0.55)';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            // rundad rektangel med långsidan tangentiellt (x = radiellt)
            var x0 = R_SVAMP - 20, y0 = -31, w = 40, h = 62, r = 9;
            ctx.moveTo(x0 + r, y0);
            ctx.arcTo(x0 + w, y0, x0 + w, y0 + h, r);
            ctx.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
            ctx.arcTo(x0, y0 + h, x0, y0, r);
            ctx.arcTo(x0, y0, x0 + w, y0, r);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // porer
            ctx.fillStyle = 'rgba(60,48,16,0.4)';
            for (var i = 0; i < pores.length; i++) {
                ctx.beginPath();
                ctx.arc(R_SVAMP + pores[i].r, pores[i].s, pores[i].rad, 0, 2 * Math.PI);
                ctx.fill();
            }
            // blank vattenglans när svampen är blöt
            if (wet > 0.02) {
                ctx.fillStyle = 'rgba(96,156,224,' + (0.26 * wet).toFixed(3) + ')';
                ctx.beginPath();
                ctx.moveTo(x0 + r, y0);
                ctx.arcTo(x0 + w, y0, x0 + w, y0 + h, r);
                ctx.arcTo(x0 + w, y0 + h, x0, y0 + h, r);
                ctx.arcTo(x0, y0 + h, x0, y0, r);
                ctx.arcTo(x0, y0, x0 + w, y0, r);
                ctx.closePath();
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.restore();
        }

        function drawSponge() {
            // Rörelseoskärpa vid hög fart: spökbilder tätt bakåt längs bågen.
            var wVis = Math.abs(omega) * timeScale();
            // svag ring längs svampens bana (tröghet i ögat, som lång exponering)
            var ring = Math.min(0.12, wVis / 200);
            if (ring > 0.015) {
                ctx.strokeStyle = 'rgba(170,132,40,' + ring.toFixed(3) + ')';
                ctx.lineWidth = 42;
                ctx.beginPath();
                ctx.arc(CX, CY, R_SVAMP, 0, 2 * Math.PI);
                ctx.stroke();
            }
            var n = Math.min(9, Math.floor(wVis / 3));
            var stepA = Math.sign(omega) * wVis * 0.0045;
            for (var i = n; i >= 1; i--) {
                drawSpongeAt(theta - stepA * i, 0.07);
            }
            drawSpongeAt(theta, 1);
        }

        function drawParticles() {
            // mörkblå droppar mot ljust papper — ingen additiv blending
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineCap = 'round';
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var t = p.age / p.life;
                var a = (1 - t) * 0.9;
                ctx.strokeStyle = 'rgba(43,105,180,' + a.toFixed(3) + ')';
                ctx.lineWidth = p.w;
                ctx.beginPath();
                ctx.moveTo(p.px, p.py);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
                if (t < 0.5) {
                    ctx.fillStyle = 'rgba(21,70,135,' + (0.75 * (1 - t)).toFixed(3) + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.w * 0.85, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }

        function render() {
            drawBackground();
            if (trailCb.checked) {
                // mörkblå spår mot ljust papper — ingen additiv blending.
                // Ritas UNDER korgen så att inga spår hamnar över dess insida;
                // tangenterna ligger ändå helt utanför cirkeln.
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(trailCanvas, 0, 0, W, H);
            }
            drawBasket();
            drawSponge();
            drawWall();
            drawParticles();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            var thPrev = theta;
            // centrifugen: mjuk uppspolning / utrullning mot glidarens mål
            var target = spinOn ? targetOmega() : 0;
            var k = spinOn ? 2.6 : 1.4;
            omega += (target - omega) * Math.min(1, k * dt);
            if (!spinOn && Math.abs(omega) < 0.02) omega = 0;
            theta += omega * dt;

            var rate = emit(dt, thPrev);
            emitRateSm += (rate - emitRateSm) * Math.min(1, 6 * dt);
            stepParticles(dt);
            if (trailCb.checked) fadeTrails(dt);
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            updateAudio();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return Math.abs(omega) > 0.02 || particles.length > 0;
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            info.textContent = (window.I18N ? I18N.t('Varvtal: {v} varv/s · Vatten: {p} %', { v: fmt(Math.abs(omega) / (2 * Math.PI), 1), p: Math.round(wet * 100) }) : 'Varvtal: ' + fmt(Math.abs(omega) / (2 * Math.PI), 1) +
                ' varv/s · Vatten: ' + Math.round(wet * 100) + ' %');
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            blotBtn.disabled = wet > 0.95;
            startBtn.textContent = spinOn ? 'Stoppa centrifugen' : 'Starta centrifugen';
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
        }

        blotBtn.addEventListener('click', function () {
            wet = 1;
            paused = false;
            resumeAudio();
            syncUi();
            render();
            updateInfo();
            kick();
        });
        startBtn.addEventListener('click', function () {
            spinOn = !spinOn;
            paused = false;
            resumeAudio();
            syncUi();
            kick();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            updateAudio();  // tysta direkt vid paus
            if (!paused) kick();
            else render();  // frys exakt den bild som visas
        });
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            if (soundOn) resumeAudio();
            updateAudio();
        });
        slowCb.addEventListener('change', kick);
        trailCb.addEventListener('change', function () {
            if (!trailCb.checked) clearTrails();
            render();
            kick();
        });
        slider.addEventListener('input', function () {
            syncSliderVal();
            kick();
        });

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                updateAudio();
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            updateAudio();
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-skriptet i .shots/)
        card._audioState = function () { return audio ? audio.ctx.state : 'none'; };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: eulersdisk
    // ══════════════════════════════════════════════════════════════════════
    function buildEulersdisk(node, cfg) {
        var W = 560, H = 430;          // logisk ritstorlek
        var CX = W / 2;                // sockelns mitt i sidled
        var BY = 300;                  // sockelns ovansida (kontaktplanet z = 0)
        var KY = 0.30, KZ = 0.95;      // projektion: djup- och höjdfaktor
        var RB = 190;                  // sockelns radie (3D-enheter = px i x-led)
        var SH = 26;                   // sockelns synliga sidohöjd
        var R3 = 110;                  // diskens radie i ritenheter
        var TH = 9;                    // diskens tjocklek i ritenheter
        var R_M = 0.037;               // diskens verkliga radie (m) — klassisk leksak
        var G = 9.82;                  // tyngdfaktor (N/kg)
        var AL0 = 70 * Math.PI / 180;  // startlutning (som när man snurrar för hand)
        var AL_END = 0.9 * Math.PI / 180; // lutning där disken abrupt lägger sig
        var T_ROLL = 40;               // sekunder från snurr till final
        var OMEGA_CAP = 300;           // rad/s-tak (skyddar ljud/rendering)

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En blank metalldisk, en så kallad Eulers disk, som rullar runt på ' +
            'sin kant på en spegelblank sockel. När lutningen minskar och ' +
            'tyngdpunkten sjunker ökar vaggningens varvtal — lägesenergi ' +
            'omvandlas till rörelseenergi — tills disken abrupt lägger sig.');
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);

        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        sndBtn.innerHTML = ICON_SND_ON;
        scene.appendChild(sndBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var spinBtn = document.createElement('button');
        spinBtn.type = 'button';
        spinBtn.className = 'minisim-btn ms-primar';
        spinBtn.textContent = 'Snurra disken';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var trailLbl = document.createElement('label');
        trailLbl.className = 'minisim-check';
        var trailCb = document.createElement('input');
        trailCb.type = 'checkbox';
        trailLbl.appendChild(trailCb);
        trailLbl.appendChild(document.createTextNode('Visa spår'));

        var energyLbl = document.createElement('label');
        energyLbl.className = 'minisim-check';
        var energyCb = document.createElement('input');
        energyCb.type = 'checkbox';
        energyCb.checked = true;
        energyLbl.appendChild(energyCb);
        energyLbl.appendChild(document.createTextNode('Visa energi'));

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(spinBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(trailLbl);
        controls.appendChild(energyLbl);
        controls.appendChild(info);
        card.appendChild(controls);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som centrifugen) ────────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // Spårlager: kontaktpunktens bana på sockeln (tonas långsamt bort så
        // man ser den AKTUELLA, vidgande cirkeln — inte 1 600 varv gammalt
        // bläck).
        var TRAIL_SS = 2;
        var trailCanvas = document.createElement('canvas');
        trailCanvas.width = W * TRAIL_SS;
        trailCanvas.height = H * TRAIL_SS;
        var tctx = trailCanvas.getContext('2d');
        tctx.setTransform(TRAIL_SS, 0, 0, TRAIL_SS, 0, 0);
        tctx.lineCap = 'round';
        var trailFadeAcc = 0;
        function clearTrails() {
            tctx.save();
            tctx.setTransform(1, 0, 0, 1, 0, 0);
            tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
            tctx.restore();
        }
        function fadeTrails(dt) {
            trailFadeAcc += 0.30 * dt;
            if (trailFadeAcc < 0.05) return;
            tctx.globalCompositeOperation = 'destination-out';
            tctx.fillStyle = 'rgba(0,0,0,' + Math.min(1, trailFadeAcc).toFixed(3) + ')';
            tctx.fillRect(0, 0, W, H);
            tctx.globalCompositeOperation = 'source-over';
            trailFadeAcc = 0;
        }

        // ── Tillstånd ─────────────────────────────────────────────────────
        // Faser: vila (platt, orörd) → uppsnurr (handen reser och snurrar
        // disken) → rull (Moffatt-avklingande lutning) → stopp (den abrupta
        // finalen) → slut (platt igen, all energi har blivit värme).
        var phase = 'vila';
        var tPhase = 0, tRoll = 0;
        var al = 0;                 // lutningsvinkel α (rad)
        var om = 0;                 // vaggningens vinkelfart Ω (rad/s)
        var phi = -Math.PI / 2;     // kontaktpunktens azimut
        var psi = 0.6;              // markörens vinkel på diskens ansikte
        var alStop = 0, omStop = 0; // frysvärden vid stoppfasens start
        var ep = 0, ek = 0, ev = 0; // energiandelar (av totala mekaniska)
        var paused = false;
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowCb.checked ? 0.25 : 1; }
        function omegaOf(a) {
            // rulldiskens precessionsfart: Ω = √(4g/(R·sin α))
            return Math.min(OMEGA_CAP, Math.sqrt(4 * G / (R_M * Math.sin(Math.max(a, 1e-4)))));
        }

        // ── Ljud (Web Audio, helt syntetiserat — inga ljudfiler) ──────────
        // Ringande ton vars frekvens följer vaggningens varvtal, med tremolo
        // i vaggningstakten (wa-wa-wa-wa som tätnar) och en svag rullbrus-
        // botten. Skallret när disken lägger sig spelas som korta brusskurar.
        var AC = window.AudioContext || window.webkitAudioContext;
        var audio = null;
        var soundOn = true;

        function makeNoiseBuffer(actx) {
            var sr = actx.sampleRate;
            var len = Math.floor(sr * 1.5);
            var buf = actx.createBuffer(1, len, sr);
            var d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
            return buf;
        }

        function ensureAudio() {
            if (audio || !AC) return;
            var actx = new AC();
            var master = actx.createGain();
            master.gain.value = 0.55;
            master.connect(actx.destination);
            // ringtonen (grundton + oharmonisk metallpartial)
            var humGain = actx.createGain();
            humGain.gain.value = 0;
            var trem = actx.createGain();
            trem.gain.value = 0.55;
            var o1 = actx.createOscillator();
            o1.type = 'sine';
            o1.frequency.value = 220;
            var o2 = actx.createOscillator();
            o2.type = 'sine';
            o2.frequency.value = 220 * 2.76;
            var o2g = actx.createGain();
            o2g.gain.value = 0.30;
            o1.connect(trem);
            o2.connect(o2g);
            o2g.connect(trem);
            trem.connect(humGain);
            humGain.connect(master);
            o1.start();
            o2.start();
            // tremolo i vaggningstakten
            var lfo = actx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = 2;
            var lfoG = actx.createGain();
            lfoG.gain.value = 0.42;
            lfo.connect(lfoG);
            lfoG.connect(trem.gain);
            lfo.start();
            // rullbrus
            var noiseGain = actx.createGain();
            noiseGain.gain.value = 0;
            var bp = actx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = 1600;
            bp.Q.value = 1.6;
            var src = actx.createBufferSource();
            src.buffer = makeNoiseBuffer(actx);
            src.loop = true;
            src.connect(bp);
            bp.connect(noiseGain);
            noiseGain.connect(master);
            src.start();
            audio = { ctx: actx, master: master, humGain: humGain,
                      o1: o1, o2: o2, lfo: lfo, noiseGain: noiseGain,
                      noiseBuf: src.buffer };
        }

        function resumeAudio() {
            ensureAudio();
            if (audio && audio.ctx.state === 'suspended') audio.ctx.resume();
        }

        function updateAudio() {
            if (!audio) return;
            var t = audio.ctx.currentTime;
            var ts = timeScale();
            var spinning = phase === 'uppsnurr' || phase === 'rull' || phase === 'stopp';
            var active = soundOn && visible && !document.hidden && !paused && spinning;
            var revs = om / (2 * Math.PI);
            var hg = (active && revs > 0.3) ? Math.min(0.5, 0.06 + revs * 0.009) : 0;
            audio.humGain.gain.setTargetAtTime(hg, t, 0.05);
            var f = (100 + revs * 22) * (0.35 + 0.65 * ts);
            audio.o1.frequency.setTargetAtTime(f, t, 0.05);
            audio.o2.frequency.setTargetAtTime(f * 2.76, t, 0.05);
            audio.lfo.frequency.setTargetAtTime(Math.max(0.5, revs * ts), t, 0.05);
            var ng = active ? Math.min(0.16, 0.015 + revs * 0.002) : 0;
            audio.noiseGain.gain.setTargetAtTime(ng, t, 0.07);
        }

        function playClatter() {
            // det skallrande "brrrp" när disken abrupt lägger sig platt
            if (!audio || !soundOn) return;
            var actx = audio.ctx;
            var t0 = actx.currentTime;
            var offs = [0, 0.07, 0.16, 0.28, 0.42];
            var gains = [0.55, 0.44, 0.30, 0.17, 0.08];
            for (var i = 0; i < offs.length; i++) {
                var src = actx.createBufferSource();
                src.buffer = audio.noiseBuf;
                var bp = actx.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.value = 1500 - i * 160;
                bp.Q.value = 2.5;
                var g = actx.createGain();
                g.gain.setValueAtTime(gains[i], t0 + offs[i]);
                g.gain.exponentialRampToValueAtTime(0.001, t0 + offs[i] + 0.10);
                src.connect(bp);
                bp.connect(g);
                g.connect(audio.master);
                src.start(t0 + offs[i]);
                src.stop(t0 + offs[i] + 0.13);
            }
            // dov duns i botten
            var th = actx.createOscillator();
            th.type = 'sine';
            th.frequency.setValueAtTime(110, t0);
            th.frequency.exponentialRampToValueAtTime(55, t0 + 0.22);
            var tg = actx.createGain();
            tg.gain.setValueAtTime(0.4, t0);
            tg.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);
            th.connect(tg);
            tg.connect(audio.master);
            th.start(t0);
            th.stop(t0 + 0.3);
        }

        // ── Geometri och projektion ───────────────────────────────────────
        function project(x, y, z, refl) {
            if (refl) z = -z;
            return { x: CX + x, y: BY + y * KY - z * KZ };
        }

        // Diskens rand: X(t) = C + R(cos t·e1 + sin t·e2) där e1 pekar från
        // kontaktpunkten upp mot centrum i diskplanet och e2 är den vågräta
        // tangenten. Kontaktpunkten ligger på P = R·cos α·(cos φ, sin φ, 0).
        function diskFrame(ph, a) {
            var ca = Math.cos(a), sa = Math.sin(a);
            var cf = Math.cos(ph), sf = Math.sin(ph);
            return {
                n:  { x: sa * cf, y: sa * sf, z: ca },
                e1: { x: -ca * cf, y: -ca * sf, z: sa },
                e2: { x: -sf, y: cf, z: 0 },
                C:  { x: 0, y: 0, z: R3 * sa }
            };
        }

        var N_RIM = 48;
        function rimPoints(fr, offN, refl) {
            var pts = [];
            for (var i = 0; i < N_RIM; i++) {
                var t = i * 2 * Math.PI / N_RIM;
                var ct = Math.cos(t), st = Math.sin(t);
                var x = fr.C.x + R3 * (ct * fr.e1.x + st * fr.e2.x) + offN * fr.n.x;
                var y = fr.C.y + R3 * (ct * fr.e1.y + st * fr.e2.y) + offN * fr.n.y;
                var z = fr.C.z + R3 * (ct * fr.e1.z + st * fr.e2.z) + offN * fr.n.z;
                pts.push(project(x, y, z, refl));
            }
            return pts;
        }

        function tracePath(c, pts) {
            c.beginPath();
            c.moveTo(pts[0].x, pts[0].y);
            for (var i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
            c.closePath();
        }

        // Ritar disken (eller dess spegelbild) för given azimut/lutning.
        function drawDisk(c, ph, a, ps, alpha, refl) {
            var fr = diskFrame(ph, a);
            var top = rimPoints(fr, 0, refl);
            var bot = rimPoints(fr, -TH, refl);
            c.globalAlpha = alpha;
            // undersida + kanten — mörk stålton
            tracePath(c, bot);
            c.fillStyle = '#23272e';
            c.fill();
            // ovansidan — krom: gradient från ljus himmel-/pappersreflex till
            // mörk metall, längs skärmens lodräta led över ansiktet
            var yMin = Infinity, yMax = -Infinity, i;
            for (i = 0; i < top.length; i++) {
                if (top[i].y < yMin) yMin = top[i].y;
                if (top[i].y > yMax) yMax = top[i].y;
            }
            if (yMax - yMin < 2) yMax = yMin + 2;
            var g = c.createLinearGradient(0, yMin, 0, yMax);
            if (refl) {
                g.addColorStop(0, '#6e737b');
                g.addColorStop(0.55, '#b9bab6');
                g.addColorStop(1, '#e8e7e2');
            } else {
                g.addColorStop(0, '#f6f5f0');
                g.addColorStop(0.42, '#cfcfcb');
                g.addColorStop(0.58, '#8d939b');
                g.addColorStop(1, '#5c626b');
            }
            tracePath(c, top);
            c.fillStyle = g;
            c.fill();
            c.strokeStyle = 'rgba(30,34,40,0.55)';
            c.lineWidth = 1.1;
            c.stroke();
            // markören på ansiktet — visar diskens EGEN (långsamma) rotation
            var Cp = project(fr.C.x, fr.C.y, fr.C.z, refl);
            var mx = fr.C.x + 0.92 * R3 * (Math.cos(ps) * fr.e1.x + Math.sin(ps) * fr.e2.x);
            var my = fr.C.y + 0.92 * R3 * (Math.cos(ps) * fr.e1.y + Math.sin(ps) * fr.e2.y);
            var mz = fr.C.z + 0.92 * R3 * (Math.cos(ps) * fr.e1.z + Math.sin(ps) * fr.e2.z);
            var Mp = project(mx, my, mz, refl);
            c.strokeStyle = 'rgba(15,22,32,0.30)';
            c.lineWidth = 2;
            c.lineCap = 'round';
            c.beginPath();
            c.moveTo(Cp.x, Cp.y);
            c.lineTo(Mp.x, Mp.y);
            c.stroke();
            // borstad sektor bakom markören
            c.beginPath();
            c.moveTo(Cp.x, Cp.y);
            for (i = 0; i <= 8; i++) {
                var tt = ps + i * 0.06;
                var sx = fr.C.x + 0.92 * R3 * (Math.cos(tt) * fr.e1.x + Math.sin(tt) * fr.e2.x);
                var sy = fr.C.y + 0.92 * R3 * (Math.cos(tt) * fr.e1.y + Math.sin(tt) * fr.e2.y);
                var sz = fr.C.z + 0.92 * R3 * (Math.cos(tt) * fr.e1.z + Math.sin(tt) * fr.e2.z);
                var Sp = project(sx, sy, sz, refl);
                c.lineTo(Sp.x, Sp.y);
            }
            c.closePath();
            c.fillStyle = 'rgba(15,22,32,0.07)';
            c.fill();
            // glansstråk längs den övre randen
            if (!refl) {
                var hiIdx = 0;
                for (i = 1; i < top.length; i++) if (top[i].y < top[hiIdx].y) hiIdx = i;
                c.strokeStyle = 'rgba(255,255,255,0.75)';
                c.lineWidth = 1.7;
                c.beginPath();
                for (i = -7; i <= 7; i++) {
                    var p = top[(hiIdx + i + N_RIM) % N_RIM];
                    if (i === -7) c.moveTo(p.x, p.y);
                    else c.lineTo(p.x, p.y);
                }
                c.stroke();
            }
            c.globalAlpha = 1;
        }

        // ── Sockeln (spegelblank piedestal, som en riktig Eulers disk-bas) ─
        function baseTopEllipse(c) {
            c.beginPath();
            c.ellipse(CX, BY, RB, RB * KY, 0, 0, 2 * Math.PI);
        }

        function drawBase() {
            // sidan
            var g = ctx.createLinearGradient(CX - RB, 0, CX + RB, 0);
            g.addColorStop(0, '#3a3f47');
            g.addColorStop(0.18, '#83898f');
            g.addColorStop(0.34, '#2c3138');
            g.addColorStop(0.52, '#9aa0a6');
            g.addColorStop(0.72, '#31363d');
            g.addColorStop(0.88, '#6e747b');
            g.addColorStop(1, '#282c33');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.moveTo(CX - RB, BY);
            ctx.lineTo(CX - RB, BY + SH);
            ctx.ellipse(CX, BY + SH, RB, RB * KY, 0, Math.PI, 0, true);
            ctx.lineTo(CX + RB, BY);
            ctx.ellipse(CX, BY, RB, RB * KY, 0, 0, Math.PI, false);
            ctx.closePath();
            ctx.fill();
            // ovansidan — spegeln
            var tg = ctx.createLinearGradient(CX - RB * 0.7, BY - RB * KY, CX + RB * 0.7, BY + RB * KY);
            tg.addColorStop(0, '#fdfdfb');
            tg.addColorStop(0.5, '#e2e3e0');
            tg.addColorStop(1, '#c2c4c3');
            baseTopEllipse(ctx);
            ctx.fillStyle = tg;
            ctx.fill();
            ctx.strokeStyle = 'rgba(40,44,51,0.65)';
            ctx.lineWidth = 1.4;
            ctx.stroke();
        }

        // ── Energistaplar (energiprincipen: summan är konstant) ───────────
        function subLabel(x, y, sub, color) {
            ctx.fillStyle = color;
            ctx.font = 'italic 13px Poppins, system-ui, sans-serif';
            ctx.fillText('E', x, y);
            ctx.font = '10px Poppins, system-ui, sans-serif';
            ctx.fillText(sub, x + 9, y + 3);
        }

        function drawEnergy() {
            if (!energyCb.checked) return;
            var bars = [
                { f: ep, c: '#2563c9', l: 'p' },
                { f: ek, c: '#c0392b', l: 'k' },
                { f: ev, c: '#8a6d1c', l: 'v' }
            ];
            // hålls till vänster om sockeln (vars vänstra kant når x = 90)
            var x0 = 20, bw = 14, gap = 26, maxh = 104, y0 = H - 34;
            ctx.strokeStyle = 'rgba(15,22,32,0.5)';
            ctx.lineWidth = 1.2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x0 - 8, y0 + 0.5);
            ctx.lineTo(x0 + gap * 2 + bw + 8, y0 + 0.5);
            ctx.stroke();
            for (var i = 0; i < bars.length; i++) {
                var b = bars[i];
                var h = Math.max(0, Math.min(1, b.f)) * maxh;
                var x = x0 + i * gap;
                if (h > 0.5) {
                    ctx.fillStyle = b.c;
                    ctx.fillRect(x, y0 - h, bw, h);
                    ctx.strokeStyle = 'rgba(15,22,32,0.35)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x + 0.5, y0 - h + 0.5, bw - 1, h - 1);
                }
                subLabel(x + 1, y0 + 16, b.l, 'rgba(15,22,32,0.75)');
            }
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function drawBackground() {
            ctx.globalCompositeOperation = 'source-over';
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function render() {
            drawBackground();
            drawBase();
            // allt som ligger PÅ spegeln klipps till dess ellips:
            // spår, mjuk skugga och diskens spegelbild
            ctx.save();
            baseTopEllipse(ctx);
            ctx.clip();
            if (trailCb.checked) {
                ctx.drawImage(trailCanvas, 0, 0, W, H);
            }
            var sc = project(0, 0, 0, false);
            var shR = R3 * (0.35 + 0.65 * Math.cos(al));
            var sg = ctx.createRadialGradient(sc.x, sc.y, 0, sc.x, sc.y, shR);
            sg.addColorStop(0, 'rgba(20,24,30,0.22)');
            sg.addColorStop(1, 'rgba(20,24,30,0)');
            ctx.fillStyle = sg;
            ctx.beginPath();
            ctx.ellipse(sc.x, sc.y, shR, shR * KY * 1.4, 0, 0, 2 * Math.PI);
            ctx.fill();
            if (al > 0.002) drawDisk(ctx, phi, al, psi, 0.22, true);
            ctx.restore();
            // rörelseoskärpa: spökbilder strax bakåt längs vaggningen
            var wVis = om * timeScale();
            if (wVis > 15) {
                var back = Math.min(0.5, wVis * 0.004);
                drawDisk(ctx, phi - back, al, psi, 0.12, false);
                drawDisk(ctx, phi - back * 2, al, psi, 0.10, false);
            }
            drawDisk(ctx, phi, al, psi, 1, false);
            drawEnergy();
        }

        // ── Spårritning (kontaktpunkten, deldelad längs bågen) ────────────
        function drawTrailArc(phPrev, phNow, a) {
            var rc = R3 * Math.cos(a);
            var d = phNow - phPrev;
            var n = Math.min(48, Math.max(1, Math.ceil(Math.abs(d) / 0.18)));
            tctx.strokeStyle = 'rgba(170,124,32,0.5)';
            tctx.lineWidth = 1.6;
            tctx.beginPath();
            for (var i = 0; i <= n; i++) {
                var ph = phPrev + d * i / n;
                var p = project(rc * Math.cos(ph), rc * Math.sin(ph), 0, false);
                if (i === 0) tctx.moveTo(p.x, p.y);
                else tctx.lineTo(p.x, p.y);
            }
            tctx.stroke();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function smoothstep(p) { return p * p * (3 - 2 * p); }

        function step(dt) {
            var phiPrev = phi;
            if (phase === 'uppsnurr') {
                tPhase += dt;
                var p = Math.min(1, tPhase / 0.6);
                var s = smoothstep(p);
                al = AL0 * s;
                om = omegaOf(Math.max(al, 0.05)) * s;
                if (p >= 1) { phase = 'rull'; tRoll = 0; }
            } else if (phase === 'rull') {
                tRoll += dt;
                // Moffatts lag: lutningen dör som (T − t)^(2/3) — långsamt
                // först, rusande på slutet
                var f = Math.max(0, 1 - tRoll / T_ROLL);
                al = AL0 * Math.pow(f, 2 / 3);
                om = omegaOf(al);
                ev = 0.10 * (tRoll / T_ROLL);
                if (al <= AL_END) {
                    phase = 'stopp';
                    tPhase = 0;
                    alStop = al;
                    omStop = om;
                    playClatter();
                }
            } else if (phase === 'stopp') {
                tPhase += dt;
                al = alStop * Math.exp(-9 * tPhase);
                om = omStop * Math.exp(-8 * tPhase);
                ev = 0.10 + 0.90 * Math.min(1, tPhase / 0.55);
                if (tPhase > 0.8) {
                    phase = 'slut';
                    al = 0;
                    om = 0;
                    ev = 1;
                    syncUi();
                }
            }
            phi += om * dt;
            // diskens egen rotation: ψ̇ = Ω(1 − cos α) — nästan stilla i finalen
            psi += om * (1 - Math.cos(al)) * dt;
            if (phase === 'vila') {
                ep = 0; ek = 0; ev = 0;   // orörd disk — ingen energi i spel
            } else {
                ep = 0.6 * Math.sin(al) / Math.sin(AL0);
                ek = Math.max(0, 1 - ep - ev);
            }
            if (trailCb.checked && om > 0.01 && al > 0.002) {
                drawTrailArc(phiPrev, phi, al);
                fadeTrails(dt);
            }
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            updateAudio();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return phase === 'uppsnurr' || phase === 'rull' || phase === 'stopp';
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            info.textContent = 'Lutning: ' + fmt(al * 180 / Math.PI, 0) + '°' +
                ' · Varvtal: ' + fmt(om / (2 * Math.PI), 1) + ' varv/s';
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            spinBtn.textContent = (phase === 'vila' || phase === 'slut')
                ? 'Snurra disken' : 'Snurra om';
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
            pausBtn.disabled = phase === 'vila' || phase === 'slut';
        }

        spinBtn.addEventListener('click', function () {
            phase = 'uppsnurr';
            tPhase = 0;
            tRoll = 0;
            phi = -Math.PI / 2;
            psi = 0.6;
            ev = 0;
            paused = false;
            clearTrails();
            resumeAudio();
            syncUi();
            kick();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            updateAudio();
            if (!paused) kick();
            else render();
        });
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            if (soundOn) resumeAudio();
            updateAudio();
        });
        slowCb.addEventListener('change', kick);
        trailCb.addEventListener('change', function () {
            if (!trailCb.checked) clearTrails();
            render();
            kick();
        });
        energyCb.addEventListener('change', function () {
            render();
            kick();
        });

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                updateAudio();
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            updateAudio();
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-skript i .shots/)
        card._eulerState = function () {
            return { phase: phase, al: al, om: om, ep: ep, ek: ek, ev: ev,
                     audio: audio ? audio.ctx.state : 'none' };
        };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: fjaderpendel
    // ══════════════════════════════════════════════════════════════════════
    function buildFjaderpendel(node, cfg) {
        var W = 560, H = 430;           // logisk ritstorlek
        var CX = 312;                   // fjäderns/viktens x-läge
        var CEIL_Y = 34;                // takets underkant
        var EQ_Y = 248;                 // viktens mittpunkt i jämviktsläget
        var Y_MAX = 92;                 // största tillåtna elongation (px)
        var PX_PER_CM = 12;             // skala för avläsningen (px per cm)
        var MASS_W = 38, MASS_H = 34;   // viktens mått
        var T_PERIOD = 2.2;             // svängningstid (s)
        var OMEGA = 2 * Math.PI / T_PERIOD;
        var A_DEFAULT = 66;             // "Dra ner och släpp"-amplitud (px)
        var L_VEC = 84;                 // pillängd vid maximal storhet (px)
        var COL_V = '#2563c9';          // hastighetens färg (som teorifiguren)
        var COL_A = '#c0392b';          // accelerationens färg (som teorifiguren)
        var INK = '#1f2530';
        // Variant "krafter": krafterna på vikten i stället för v och a.
        var KRAFTER = cfg.visa === 'krafter';
        var COL_F = '#c0392b';          // krafternas färg (som F_R i teorifiguren)
        var L_STAT = 140;               // fjäderns förlängning i jämviktsläget (px)
        var F_SKALA = 0.5;              // pillängd per px förlängning (F = k · Δl)

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', KRAFTER ?
            'En vikt som hänger i en spiralfjäder från taket. Dra i vikten och ' +
            'släpp så pendlar den kring jämviktsläget. Kryssrutor visar ' +
            'fjäderkraften, tyngdkraften och den resulterande kraften på vikten. ' +
            'Tyngdkraften är konstant, fjäderkraften växer med förlängningen och ' +
            'den resulterande kraften är alltid riktad mot jämviktsläget.' :
            'En vikt som hänger i en spiralfjäder från taket. Dra i vikten och ' +
            'släpp så pendlar den kring jämviktsläget. Kryssrutor visar ' +
            'hastighetsvektorn och accelerationsvektorn: farten är störst i ' +
            'jämviktsläget och noll i vändlägena, accelerationen är störst i ' +
            'vändlägena, noll i jämviktsläget och alltid riktad mot jämviktsläget.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var slappBtn = document.createElement('button');
        slappBtn.type = 'button';
        slappBtn.className = 'minisim-btn ms-primar';
        slappBtn.textContent = 'Dra ner och släpp';

        var stoppBtn = document.createElement('button');
        stoppBtn.type = 'button';
        stoppBtn.className = 'minisim-btn';
        stoppBtn.textContent = 'Nollställ';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(slappBtn);
        controls.appendChild(stoppBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        // Rad 2: visningsval (vektorer) + ultrarapid.
        var toggles = document.createElement('div');
        toggles.className = 'minisim-controls';

        function makeCheck(text, checked, accent) {
            var lbl = document.createElement('label');
            lbl.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = checked;
            if (accent) cb.style.accentColor = accent;
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(text));
            return { lbl: lbl, cb: cb };
        }
        var vChk = null, aChk = null, fjChk = null, gChk = null, rChk = null;
        if (KRAFTER) {
            fjChk = makeCheck('Fjäderkraft', false, COL_F);
            gChk = makeCheck('Tyngdkraft', false, COL_F);
            rChk = makeCheck('Resulterande kraft', true, COL_F);
            toggles.appendChild(fjChk.lbl);
            toggles.appendChild(gChk.lbl);
            toggles.appendChild(rChk.lbl);
        } else {
            vChk = makeCheck('Visa hastighet', true, COL_V);
            aChk = makeCheck('Visa acceleration', true, COL_A);
            toggles.appendChild(vChk.lbl);
            toggles.appendChild(aChk.lbl);
        }
        var slowChk = makeCheck('Ultrarapid', false, null);
        toggles.appendChild(slowChk.lbl);
        card.appendChild(toggles);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisims) ────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        // Elongationen y räknas POSITIV UPPÅT från jämviktsläget (som i
        // genomgången); skärmens y-axel pekar nedåt, så skärmläget är
        // EQ_Y - y. Svängningen beräknas analytiskt (y = A·cos φ) så att
        // amplituden aldrig driver.
        var mode = 'rest';          // 'rest' | 'drag' | 'svang'
        var A = 0;                  // amplitud (px)
        var ph = 0;                 // fas (rad)
        var yDrag = 0;              // elongation under pågående drag
        var paused = false;
        var dragging = false;
        var dragPtr = -1;
        var dragOffset = 0;         // greppunktens avstånd från viktens mitt
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowChk.cb.checked ? 0.25 : 1; }
        function elong() {
            if (mode === 'drag') return yDrag;
            if (mode === 'svang') return A * Math.cos(ph);
            return 0;
        }
        function veloc() {
            return mode === 'svang' ? -A * OMEGA * Math.sin(ph) : 0;
        }
        function accel() { return -OMEGA * OMEGA * elong(); }
        function massCY() { return EQ_Y - elong(); }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        // Text med blandad stil: parts = [{ t: '+', it: false }, ...].
        // align: 'left' | 'right' (mot angivet x).
        function drawMixed(x, y, parts, align, size, color) {
            var widths = [], total = 0, i;
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].it ? 'italic ' : '') + size + 'px ' + FONT;
                widths[i] = ctx.measureText(parts[i].t).width;
                total += widths[i];
            }
            var cx = align === 'right' ? x - total : x;
            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].it ? 'italic ' : '') + size + 'px ' + FONT;
                ctx.fillText(parts[i].t, cx, y);
                cx += widths[i];
            }
        }

        function drawCeiling() {
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(150, CEIL_Y);
            ctx.lineTo(475, CEIL_Y);
            ctx.stroke();
            // snedstreck ovanför taket (fast yta)
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var x = 160; x <= 475; x += 15) {
                ctx.moveTo(x, CEIL_Y);
                ctx.lineTo(x - 9, CEIL_Y - 9);
            }
            ctx.stroke();
        }

        function drawGuides() {
            var yTop = null, yBot = null;
            if (mode === 'svang' && A > 0) { yTop = EQ_Y - A; yBot = EQ_Y + A; }
            if (mode === 'drag' && Math.abs(yDrag) > 4) {
                yTop = EQ_Y - Math.abs(yDrag);
                yBot = EQ_Y + Math.abs(yDrag);
            }
            // jämviktsläget y = 0 — heldragen
            ctx.strokeStyle = '#7c828c';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(160, EQ_Y);
            ctx.lineTo(452, EQ_Y);
            ctx.stroke();
            drawMixed(152, EQ_Y + 4,
                [{ t: 'y', it: true }, { t: ' = 0', it: false }],
                'right', 14, INK);
            drawMixed(458, EQ_Y + 5, [{ t: 'Jämviktsläge', it: false }],
                'left', 14, INK);
            // vändlägena ±A — streckade
            if (yTop !== null) {
                ctx.strokeStyle = '#9aa0a6';
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 4]);
                ctx.beginPath();
                ctx.moveTo(160, yTop);
                ctx.lineTo(452, yTop);
                ctx.moveTo(160, yBot);
                ctx.lineTo(452, yBot);
                ctx.stroke();
                ctx.setLineDash([]);
                drawMixed(152, yTop + 4,
                    [{ t: '+', it: false }, { t: 'A', it: true }],
                    'right', 14, INK);
                drawMixed(152, yBot + 4,
                    [{ t: '−', it: false }, { t: 'A', it: true }],
                    'right', 14, INK);
            }
        }

        function drawSpring() {
            var massTop = massCY() - MASS_H / 2;
            var y0 = CEIL_Y, y1 = massTop;
            var N = 13;                       // antal sicksack-ben
            var lead = 7;                     // raka ändbitar
            var span = (y1 - lead) - (y0 + lead);
            ctx.strokeStyle = '#7c828c';
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.beginPath();
            ctx.moveTo(CX, y0);
            ctx.lineTo(CX, y0 + lead);
            for (var i = 1; i <= N; i++) {
                var xx = (i === N) ? CX : (i % 2 ? CX + 9 : CX - 9);
                ctx.lineTo(xx, y0 + lead + span * i / N);
            }
            ctx.lineTo(CX, y1);
            ctx.stroke();
        }

        function drawMass() {
            var cy = massCY();
            var x0 = CX - MASS_W / 2, y0 = cy - MASS_H / 2, r = 4;
            ctx.beginPath();
            ctx.moveTo(x0 + r, y0);
            ctx.arcTo(x0 + MASS_W, y0, x0 + MASS_W, y0 + MASS_H, r);
            ctx.arcTo(x0 + MASS_W, y0 + MASS_H, x0, y0 + MASS_H, r);
            ctx.arcTo(x0, y0 + MASS_H, x0, y0, r);
            ctx.arcTo(x0, y0, x0 + MASS_W, y0, r);
            ctx.closePath();
            ctx.fillStyle = '#6ba3d6';
            ctx.fill();
            ctx.strokeStyle = '#2f6db0';
            ctx.lineWidth = 1.6;
            ctx.stroke();
        }

        // Lodrät vektorpil: skaftet slutar vid pilhuvudets bas (linecap
        // butt), spets i änden. sgn > 0 = uppåt (skärmens -y).
        function drawVector(x, yTail, len, sgn, color, letter, labelSide) {
            if (len < 6) return;
            var yTip = yTail - sgn * len;
            var head = Math.max(9, Math.min(14, len * 0.5));
            var yBase = yTip + sgn * head;
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x, yTail);
            ctx.lineTo(x, yBase);
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x, yTip);
            ctx.lineTo(x - 5.5, yBase);
            ctx.lineTo(x + 5.5, yBase);
            ctx.closePath();
            ctx.fill();
            // etikett vid spetsen, ut från vikten i fri yta
            var ly = yTip + (sgn > 0 ? -6 : 16);
            drawMixed(labelSide === 'left' ? x - 10 : x + 10, ly,
                [{ t: letter, it: true }],
                labelSide === 'left' ? 'right' : 'left', 16, color);
        }

        // Kraftpil med index-etikett (F med upprätt index) bredvid spetsen.
        // sgn > 0 = uppåt. dashed = resultant (streckat skaft).
        function drawForce(x, yTail, len, sgn, sub, labelSide, dashed) {
            if (len < 6) return;
            var yTip = yTail - sgn * len;
            var head = Math.max(9, Math.min(14, len * 0.5));
            var yBase = yTip + sgn * head;
            ctx.strokeStyle = COL_F;
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            ctx.setLineDash(dashed ? [6, 4] : []);
            ctx.beginPath();
            ctx.moveTo(x, yTail);
            ctx.lineTo(x, yBase);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = COL_F;
            ctx.beginPath();
            ctx.moveTo(x, yTip);
            ctx.lineTo(x - 5.5, yBase);
            ctx.lineTo(x + 5.5, yBase);
            ctx.closePath();
            ctx.fill();
            // etiketten bredvid pilhuvudet, i fri yta
            var ly = yTip + (sgn > 0 ? 12 : -2);
            ctx.font = 'italic 16px ' + FONT;
            var wF = ctx.measureText('F').width;
            ctx.font = '12px ' + FONT;
            var wS = ctx.measureText(sub).width;
            var x0 = labelSide === 'left' ? x - 10 - wF - wS : x + 10;
            ctx.fillStyle = COL_F;
            ctx.textAlign = 'left';
            ctx.font = 'italic 16px ' + FONT;
            ctx.fillText('F', x0, ly);
            ctx.font = '12px ' + FONT;
            ctx.fillText(sub, x0 + wF, ly + 4);
        }

        function drawForces() {
            var cy = massCY();
            var y = elong();                      // positiv uppåt
            // fjäderkraften: uppåt från kontaktpunkten mot fjädern
            if (fjChk.cb.checked) {
                drawForce(CX, cy - MASS_H / 2, (L_STAT - y) * F_SKALA, 1,
                    'fj', 'right', false);
            }
            // tyngdkraften: nedåt från tyngdpunkten (markerad med prick)
            if (gChk.cb.checked) {
                drawForce(CX, cy, L_STAT * F_SKALA, -1, 'G', 'right', false);
                ctx.fillStyle = COL_F;
                ctx.beginPath();
                ctx.arc(CX, cy, 2.6, 0, 2 * Math.PI);
                ctx.fill();
            }
            // resulterande kraften F_R = −k · y: streckad, bredvid vikten
            if (rChk.cb.checked && Math.abs(y) * F_SKALA >= 6) {
                drawForce(CX - MASS_W / 2 - 16, cy, Math.abs(y) * F_SKALA,
                    y > 0 ? -1 : 1, 'R', 'left', true);
            }
        }

        function drawVectors() {
            if (KRAFTER) { drawForces(); return; }
            var cy = massCY();
            var v = veloc(), a = accel();
            // skalenligt: pillängd ∝ belopp, samma referens (full
            // elongation Y_MAX) för båda storheterna
            if (vChk.cb.checked && mode === 'svang') {
                var Lv = Math.abs(v) / (OMEGA * Y_MAX) * L_VEC;
                var sv = v > 0 ? 1 : -1;
                // hastighetspilen startar vid viktens KANT i pilens riktning
                var tailV = cy - sv * MASS_H / 2;
                drawVector(CX - 11, tailV, Lv, sv, COL_V, 'v', 'left');
            }
            if (aChk.cb.checked && (mode === 'svang' || mode === 'drag')) {
                var La = Math.abs(a) / (OMEGA * OMEGA * Y_MAX) * L_VEC;
                var sa = a > 0 ? 1 : -1;
                var tailA = cy - sa * MASS_H / 2;
                drawVector(CX + 11, tailA, La, sa, COL_A, 'a', 'right');
            }
        }

        function render() {
            ctx.globalCompositeOperation = 'source-over';
            drawBackground();
            drawGuides();
            drawCeiling();
            drawSpring();
            drawMass();
            drawVectors();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            if (mode === 'svang') {
                ph += OMEGA * dt;
                if (ph > 2 * Math.PI) ph -= 2 * Math.PI;
            }
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return mode === 'svang';
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            var cm = elong() / PX_PER_CM;
            var s = fmt(Math.abs(cm), 1);
            var sign = s === '0' ? '' : (cm > 0 ? '+' : '−');
            info.textContent = 'Elongation: ' + sign + s + ' cm';
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
            pausBtn.disabled = mode !== 'svang';
            stoppBtn.disabled = mode === 'rest';
        }

        slappBtn.addEventListener('click', function () {
            mode = 'svang';
            A = A_DEFAULT;
            ph = Math.PI;      // startar i nedre vändläget (y = −A, v = 0)
            paused = false;
            syncUi();
            kick();
        });
        stoppBtn.addEventListener('click', function () {
            mode = 'rest';
            A = 0;
            paused = false;
            syncUi();
            render();
            updateInfo();
        });
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            if (!paused) kick();
            else render();      // frys exakt den bild som visas
        });
        [vChk, aChk, fjChk, gChk, rChk].forEach(function (c) {
            if (c) c.cb.addEventListener('change', function () { render(); });
        });
        slowChk.cb.addEventListener('change', kick);

        // ── Dra i vikten (pekare/touch/mus) ───────────────────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function overMass(p) {
            return Math.abs(p.x - CX) < MASS_W / 2 + 16 &&
                   Math.abs(p.y - massCY()) < MASS_H / 2 + 16;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overMass(p)) return;
            e.preventDefault();
            dragging = true;
            dragPtr = e.pointerId;
            dragOffset = p.y - massCY();
            yDrag = elong();
            mode = 'drag';
            paused = false;
            A = 0;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            syncUi();
            render();
            updateInfo();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overMass(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            var y = EQ_Y - (p.y - dragOffset);   // elongation, positiv uppåt
            yDrag = Math.max(-Y_MAX, Math.min(Y_MAX, y));
            render();
            updateInfo();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
            if (Math.abs(yDrag) < 4) {
                mode = 'rest';
                A = 0;
            } else {
                A = Math.abs(yDrag);
                ph = yDrag > 0 ? 0 : Math.PI;    // släpps i vila (v = 0)
                mode = 'svang';
            }
            syncUi();
            render();
            updateInfo();
            kick();
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Litet test-handtag (används av e2e-/skärmdumpsskript i .shots/):
        // frys svängningen i ett exakt fasläge.
        card._setPhase = function (newA, newPh) {
            mode = 'svang';
            A = newA;
            ph = newPh;
            paused = true;
            syncUi();
            render();
            updateInfo();
        };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: skiftnyckel
    //  Mini-varianten av fysik2-skiftnyckel-app.html: en skiftnyckel greppar
    //  en trög mutter, kraften F angriper skaftet och kan vridas ett helt
    //  varv genom att dra i pilspetsen. Hävarmen (det vinkelräta avståndet
    //  från vridningspunkten till kraftens riktningslinje) och kraftmomentet
    //  M = F · l uppdateras i realtid. Statisk scen — ritas om vid drag,
    //  ingen rAF-loop behövs.
    // ══════════════════════════════════════════════════════════════════════
    function buildSkiftnyckel(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var P = { x: 140, y: 205 };        // vridningspunkten (mutterns mitt)
        var S = 1.6, ROT = -10;            // grafikens skala/vridning (som stora simmen)
        var HANDLE_DEG = 12;               // skaftets riktning (22° i grafiken + ROT)
        var RAD = Math.PI / 180;
        var U = { x: Math.cos(HANDLE_DEG * RAD), y: Math.sin(HANDLE_DEG * RAD) };
        var D = 0.25;                      // kraftens angreppspunkt (m från muttern)
        var PXM = 860;                     // px per meter (0,40 m ≈ 344 px längs skaftet)
        var F_N = 34;                      // kraftens storlek (N) — fast i minisimmen
        var L_ARROW = 92;                  // kraftpilens längd (px)
        var G = { x: P.x + D * PXM * U.x, y: P.y + D * PXM * U.y };
        var COL_F = '#2563c9', COL_ARM = '#0d9488', INK = '#1f2530';

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En skiftnyckel greppar en mutter. Vridningspunkten i mutterns mitt ' +
            'är markerad med en röd prick. Kraften F angriper skaftet och kan ' +
            'vridas ett helt varv genom att dra i pilspetsen. Kraftens streckade ' +
            'riktningslinje och hävarmen — det vinkelräta avståndet från ' +
            'vridningspunkten till riktningslinjen — ritas om i realtid, och ' +
            'kraftmomentet M lika med F gånger l visas med rotationsriktning.');
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisimmar) ──────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var alpha = 65;                    // vinkel mot skaftet (grader, 0–360, moturs)
        var dragging = false, dragPtr = -1;

        function forceDir() {
            var c = Math.cos(alpha * RAD), s = Math.sin(alpha * RAD);
            return { x: U.x * c + U.y * s, y: -U.x * s + U.y * c };
        }

        // ── Skiftnyckelgrafiken — samma paths som teorifigurerna ──────────
        var PATH_HEX = new Path2D('M95.9 104.1 L82.7 114.8 L66.8 108.7 L64.1 91.9 L77.3 81.2 L93.2 87.3 Z');
        var PATH_BODY = new Path2D('M 62.8,75.9 Q 62.3,73 64.1,71 Q 78.5,68.5 103.2,71 Q 113.4,72.3 118,77.2 Q 130,90.4 130.3,106.6 Q 131,107.5 132.8,108.3 L 283,169 A 6.5 6.5 0 0 1 278.4,181.1 L 126.1,125.7 Q 120.3,124.2 114.8,127.4 L 108.1,142 Q 105.6,148.5 98.1,145.7 L 89.7,142.4 Q 84.1,140.3 86.3,134.7 L 102.9,91.3 L 62.8,75.9 Z');
        var PATH_WORM = new Path2D('M 93.4,129.9 L 102.8,133.5 Q 106.1,134.8 104.8,138 L 103.5,141.3 Q 102.3,144.6 99,143.3 L 89.7,139.7 Q 86.4,138.5 87.7,135.2 L 88.9,132 Q 90.2,128.7 93.4,129.9 Z');
        var PATH_JAW = new Path2D('M 52.4,102.9 L 95.3,119.4 L 89.8,133.9 Q 88.5,137.2 85,135.3 Q 65.3,125 53.4,108.7 Q 50.9,105.6 52.4,102.9 Z');
        var WORM_LINES = [[94.8, 131.5, 91.7, 139.5], [97.6, 132.6, 94.5, 140.5],
                          [100.4, 133.7, 97.3, 141.6], [103.2, 134.7, 100.1, 142.7]];

        function drawWrench() {
            ctx.save();
            ctx.translate(P.x, P.y);
            ctx.scale(S, S);
            ctx.rotate(ROT * RAD);
            ctx.translate(-80, -98);
            ctx.lineJoin = 'round';
            ctx.fillStyle = '#cfd4da';
            ctx.strokeStyle = '#7c828c';
            ctx.lineWidth = 1.4;
            ctx.fill(PATH_HEX);
            ctx.stroke(PATH_HEX);
            ctx.fillStyle = '#b3b9c1';
            ctx.strokeStyle = '#6b7178';
            ctx.fill(PATH_BODY);
            ctx.stroke(PATH_BODY);
            ctx.fillStyle = '#969ea7';
            ctx.strokeStyle = '#666c74';
            ctx.lineWidth = 1.3;
            ctx.fill(PATH_WORM);
            ctx.stroke(PATH_WORM);
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            for (var i = 0; i < WORM_LINES.length; i++) {
                ctx.moveTo(WORM_LINES[i][0], WORM_LINES[i][1]);
                ctx.lineTo(WORM_LINES[i][2], WORM_LINES[i][3]);
            }
            ctx.stroke();
            ctx.fillStyle = '#a6adb5';
            ctx.strokeStyle = '#6b7178';
            ctx.lineWidth = 1.4;
            ctx.fill(PATH_JAW);
            ctx.stroke(PATH_JAW);
            ctx.restore();
        }

        // ── Ritverktyg ────────────────────────────────────────────────────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
            for (var y = 26; y < H; y += 26) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
            ctx.stroke();
        }

        function arrow(x1, y1, x2, y2, color, width, head, dash) {
            var ang = Math.atan2(y2 - y1, x2 - x1);
            var len = Math.hypot(x2 - x1, y2 - y1);
            if (len < 1) return;
            var h = Math.max(8, Math.min(head, len * 0.9));
            var bx = x2 - h * 0.82 * Math.cos(ang);
            var by = y2 - h * 0.82 * Math.sin(ang);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.lineCap = 'butt';
            ctx.setLineDash(dash || []);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(bx, by);
            ctx.stroke();
            ctx.setLineDash([]);
            var hw = 0.42;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - h * Math.cos(ang - hw), y2 - h * Math.sin(ang - hw));
            ctx.lineTo(x2 - h * Math.cos(ang + hw), y2 - h * Math.sin(ang + hw));
            ctx.closePath();
            ctx.fill();
        }

        // text i delar — kursiva variabler, rak omgivande text (Poppins)
        function drawParts(parts, x, y, size, color, align) {
            var widths = [], total = 0, i;
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].i ? 'italic ' : '') + '600 ' + size + 'px Poppins, sans-serif';
                widths[i] = ctx.measureText(parts[i].t).width;
                total += widths[i];
            }
            var cx = align === 'center' ? x - total / 2 : (align === 'right' ? x - total : x);
            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            for (i = 0; i < parts.length; i++) {
                ctx.font = (parts[i].i ? 'italic ' : '') + '600 ' + size + 'px Poppins, sans-serif';
                ctx.fillText(parts[i].t, cx, y);
                cx += widths[i];
            }
        }

        function tipPos() {
            var f = forceDir();
            return { x: G.x + L_ARROW * f.x, y: G.y + L_ARROW * f.y };
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function render() {
            var f = forceDir();
            var sinA = Math.sin(alpha * RAD);
            var l = D * Math.abs(sinA);
            var M = F_N * l;
            var medurs = sinA < -1e-9;
            var moturs = sinA > 1e-9;
            var tip = tipPos();

            drawBackground();
            drawWrench();

            // rotationsbåge kring muttern — pilspetsen i rörelsens riktning
            var rot0 = -78 * RAD, rot1 = -192 * RAD, rR = 46;
            ctx.save();
            ctx.globalAlpha = (moturs || medurs) ? 0.85 : 0.3;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2.2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.arc(P.x, P.y, rR, rot1, rot0);   // canvas ritar medurs rot1→rot0
            ctx.stroke();
            var endAng = medurs ? rot0 : rot1;
            var sgn = medurs ? -1 : 1;
            var ex = P.x + rR * Math.cos(endAng), ey = P.y + rR * Math.sin(endAng);
            var vx = sgn * Math.sin(endAng), vy = -sgn * Math.cos(endAng);
            ctx.fillStyle = INK;
            ctx.beginPath();
            ctx.moveTo(ex + vx * 10, ey + vy * 10);
            ctx.lineTo(ex - vy * 5, ey + vx * 5);
            ctx.lineTo(ex + vy * 5, ey - vx * 5);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            // vridningspunkten — röd prick + etikett i fri yta
            ctx.strokeStyle = 'rgba(31,37,48,0.7)';
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(P.x - 34, P.y - 66);
            ctx.lineTo(P.x - 7, P.y - 13);
            ctx.stroke();
            ctx.fillStyle = '#d13b2e';
            ctx.beginPath();
            ctx.arc(P.x, P.y, 4.4, 0, 2 * Math.PI);
            ctx.fill();
            drawParts([{ t: 'Vridningspunkt' }], P.x - 38, P.y - 74, 13, INK, 'center');

            // kraftens riktningslinje + hävarmen
            ctx.save();
            ctx.globalAlpha = 0.7;
            ctx.strokeStyle = COL_F;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([8, 5]);
            ctx.beginPath();
            ctx.moveTo(G.x - 700 * f.x, G.y - 700 * f.y);
            ctx.lineTo(G.x + 700 * f.x, G.y + 700 * f.y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            var lpx = l * PXM;
            if (lpx > 7) {
                // fotpunkten: vinkelrät projektion av P på riktningslinjen
                var tproj = -(D * PXM) * (U.x * f.x + U.y * f.y);
                var foot = { x: G.x + tproj * f.x, y: G.y + tproj * f.y };
                var m = { x: (P.x - foot.x) / lpx, y: (P.y - foot.y) / lpx };
                arrow(P.x, P.y, foot.x, foot.y, COL_ARM, 2.4, 9, [7, 5]);
                arrow(foot.x, foot.y, P.x, P.y, COL_ARM, 2.4, 9, [7, 5]);
                // rät vinkel vid fotpunkten
                ctx.strokeStyle = INK;
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(foot.x + 8 * m.x, foot.y + 8 * m.y);
                ctx.lineTo(foot.x + 8 * m.x + 8 * f.x, foot.y + 8 * m.y + 8 * f.y);
                ctx.lineTo(foot.x + 8 * f.x, foot.y + 8 * f.y);
                ctx.stroke();
                // etikettens plats: strax bortom fotpunkten; nära 90°/270° ligger
                // hävarmen längs skaftet — då i stället vid mitten, på motsatt
                // sida mot kraften. Hamnar bortom-fot-läget nära pilspetsen
                // eller angreppspunkten flyttas etiketten också till mittläget.
                var n = { x: m.y, y: -m.x };
                var uDot = n.x * U.x + n.y * U.y;
                var lx = foot.x - 44 * m.x, ly = foot.y - 44 * m.y;
                var nearArrow = Math.hypot(lx - tip.x, ly - tip.y) < 64 ||
                                Math.hypot(lx - G.x, ly - G.y) < 44;
                if (Math.abs(uDot) < 0.2 || nearArrow) {
                    var n2 = { x: m.y, y: -m.x };
                    if (Math.abs(uDot) < 0.2) {
                        // motsatt kraftens sida (fri yta ovan/under skaftet)
                        if (n2.x * f.x + n2.y * f.y > 0) n2 = { x: -n2.x, y: -n2.y };
                    } else {
                        // kraftens sida — bort från skaftet
                        if (n2.x * f.x + n2.y * f.y < 0) n2 = { x: -n2.x, y: -n2.y };
                    }
                    lx = P.x + 0.55 * (foot.x - P.x) + 32 * n2.x;
                    ly = P.y + 0.55 * (foot.y - P.y) + 32 * n2.y;
                }
                drawParts([{ t: 'Hävarm ' }, { t: 'l', i: true }, { t: ' = ' + fmt(l, 2) + ' m' }],
                          lx, ly + 4, 13, COL_ARM, 'center');
            } else {
                drawParts([{ t: 'Hävarm ' }, { t: 'l', i: true },
                           { t: ' = 0 — riktningslinjen går genom vridningspunkten' }],
                          P.x + 24, P.y + 112, 12.5, COL_ARM, 'left');
            }

            // kraften F med draghandtag i spetsen
            arrow(G.x, G.y, tip.x, tip.y, COL_F, 5, 16);
            ctx.fillStyle = COL_F;
            ctx.beginPath();
            ctx.arc(G.x, G.y, 4.6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = 'rgba(37,99,201,0.13)';
            ctx.strokeStyle = COL_F;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, 11, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            // F-etikett strax bortom spetsen, vinkelrätt ut från riktningslinjen
            var away = { x: tip.x - P.x, y: tip.y - P.y };
            var perp = { x: f.y, y: -f.x };
            var aDot = perp.x * away.x + perp.y * away.y;
            if (Math.abs(aDot) < 8) { if (perp.y > 0) perp = { x: -perp.x, y: -perp.y }; }
            else if (aDot < 0) perp = { x: -perp.x, y: -perp.y };
            var po = Math.abs(aDot) < 8 ? 30 : 15;
            drawParts([{ t: 'F', i: true }, { t: ' = ' + fmt(F_N, 0) + ' N' }],
                      tip.x + 24 * f.x + po * perp.x, tip.y + 24 * f.y + po * perp.y + 4,
                      13.5, COL_F, perp.x >= 0 ? 'left' : 'right');

            // avläsning överst + ledtråd nederst
            var riktn = moturs ? ' (moturs)' : medurs ? ' (medurs)' : '';
            drawParts([{ t: 'M', i: true }, { t: ' = ' }, { t: 'F', i: true }, { t: ' · ' },
                       { t: 'l', i: true },
                       { t: ' = ' + fmt(F_N, 0) + ' · ' + fmt(l, 2) + ' = ' + fmt(M, 1) + ' Nm' + riktn }],
                      W / 2, 28, 15, INK, 'center');
            ctx.font = '500 12px Poppins, sans-serif';
            ctx.fillStyle = '#6a7180';
            ctx.textAlign = 'left';
            ctx.fillText('Dra i pilspetsen och vrid kraften — hela varvet runt.', 12, H - 12);
        }

        // ── Drag i pilspetsen ─────────────────────────────────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) * W / r.width,
                     y: (e.clientY - r.top) * H / r.height };
        }
        function overTip(p) {
            var tip = tipPos();
            return Math.hypot(p.x - tip.x, p.y - tip.y) < 26;
        }
        function setAlphaFrom(p) {
            var a = HANDLE_DEG - Math.atan2(p.y - G.y, p.x - G.x) / RAD;
            alpha = ((a % 360) + 360) % 360;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overTip(p)) return;
            e.preventDefault();
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            setAlphaFrom(p);
            render();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overTip(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            setAlphaFrom(p);
            render();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            render();
        });

        // Poppins kan laddas efter första render — rita om när fonterna är klara.
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
            document.fonts.ready.then(function () { render(); });
        }

        // Test-handtag för skärmdumpsskript: ställ vinkeln exakt.
        card._setAlpha = function (a) { alpha = ((a % 360) + 360) % 360; render(); };

        render();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: valtning
    // ══════════════════════════════════════════════════════════════════════
    // Demonstrationen ur fy2-1.3 (Stabilitet): en kloss står på ett vågrätt
    // underlag och tippas kring ett av sina nedre hörn — som när man
    // tippar klossen för hand (underlaget lutas aldrig, så glidfriktion
    // spelar ingen roll). Man TAR TAG i klossens överkant och drar åt
    // valfritt håll; när pekaren släpps släpps klossen automatiskt.
    // Vinkeln phi är SIGNERAD: positiv = tippning åt höger kring nedre
    // högra hörnet, negativ = åt vänster kring nedre vänstra. Från
    // klossens tyngdpunkt (grön prick) pekar tyngdkraftens pil rakt nedåt
    // med konstant längd. Faller pilen innanför vridningspunkten faller
    // klossen tillbaka, faller den utanför välter klossen. Två
    // klossformer: hög/smal (välter tidigt) och låg/bred
    // (kräver stor lutning). Ritad i laboranstemat.
    function buildValtning(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var CX = 280;                      // basens mittpunkt (klossen kan välta åt båda hållen)
        var GROUND_Y = 354;                // marklinjen (underlaget, alltid vågrätt)
        var TILT_MAX = 70;                 // glidarens maxlutning (grader)
        var DRAG_MAX = 88;                 // dragets maxlutning (grader)
        var GPX = 1500;                    // "g" i px/s² för vältdynamiken
        var RAD = Math.PI / 180;
        var INK = '#1f2530';
        var COL_STOD = '#8b5cf6';          // stödytan (som teorifigurerna)
        var COL_TP = '#2e9e4f';            // tyngdpunkten (grön, som figurerna)
        var SHAPES = {
            hog: { b: 64, h: 150 },        // hög/smal — välter vid ≈23°
            lag: { b: 120, h: 64 }         // låg/bred — välter först vid ≈62°
        };
        // Tyngdkraftspilens längd: skalenlig mot klossens massa (∝ arean),
        // så att den höga klossens pil är längre än den lågas. Konstant
        // under hela lutningen — en kraftvektor byter inte belopp. Pilen
        // får gärna gå igenom golvytan, men spetsen måste rymmas i
        // canvasen: värsta läget är den höga klossen liggande (tyngd-
        // punkten 32 px över marken) → 354 − 32 + 100 = 422 < H.
        var FG_K = 100 / (64 * 150);       // px per areaenhet

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En kloss står på ett vågrätt underlag. Ta tag i klossens ' +
            'överkant och dra för att tippa den åt valfritt håll — när du ' +
            'släpper taget släpps klossen. Från klossens tyngdpunkt pekar ' +
            'tyngdkraftens pil rakt nedåt, lika lång hur mycket klossen än ' +
            'lutas. Släpps klossen medan pilen faller innanför ' +
            'vridningspunkten faller den tillbaka — faller pilen utanför ' +
            'välter klossen. En hög smal kloss välter vid liten lutning, en ' +
            'låg bred kräver mycket större lutning.');
        // Draget i klossens överkant är i huvudsak vågrätt: pan-y låter
        // fingret fortfarande scrolla sidan i höjdled, medan vågräta
        // rörelser når vår pointer-hantering.
        canvas.style.touchAction = 'pan-y';
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var slappBtn = document.createElement('button');
        slappBtn.type = 'button';
        slappBtn.className = 'minisim-btn ms-primar';
        slappBtn.textContent = 'Släpp klossen';

        var hogBtn = document.createElement('button');
        hogBtn.type = 'button';
        hogBtn.className = 'minisim-btn ms-vald';
        hogBtn.textContent = 'Hög kloss';

        var lagBtn = document.createElement('button');
        lagBtn.type = 'button';
        lagBtn.className = 'minisim-btn';
        lagBtn.textContent = 'Låg kloss';

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(slappBtn);
        controls.appendChild(hogBtn);
        controls.appendChild(lagBtn);
        controls.appendChild(omBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        // Lutningsglidare
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Lutning';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = String(-TILT_MAX);
        slider.max = String(TILT_MAX);
        slider.step = '0.5';
        slider.value = '0';
        slider.setAttribute('aria-label',
            'Klossens lutning i grader — negativt lutar åt vänster, positivt åt höger');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisimmar) ──────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        // "Handen" (drag i överkanten, eller glidaren) håller klossen i den
        // SIGNERADE vinkeln phi: positiv = tippad åt höger kring nedre
        // högra hörnet, negativ = åt vänster kring nedre vänstra. Släpps
        // taget (pekarsläpp eller "Släpp klossen") tar fysiken över:
        // klossen roterar fritt kring sitt hörn och faller tillbaka eller
        // välter beroende på var tyngdpunktens lodlinje hänger.
        var shape = SHAPES.hog;
        var mode = 'hall';                 // 'hall' | 'anim' | 'ligger'
        var phi = 0;                       // klossens lutning (rad, signerad)
        var phiVel = 0;                    // vinkelfart under 'anim' (rad/s)
        var dir = 1;                       // tippriktning vid släpp (+1 höger, −1 vänster)
        var animTips = false;              // åt vilket håll släppet slutar
        var tippedAt = 0;                  // |lutningen| (grader) då klossen släpptes
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function critRad() { return Math.atan(shape.b / shape.h); }
        function timeScale() { return slowCb.checked ? 0.3 : 1; }
        function pivotX() { return phi >= 0 ? CX + shape.b / 2 : CX - shape.b / 2; }

        // En punkt (lx, ly) i klossens canvas-lokala system (origo i den
        // aktiva vridningspunkten, ly negativ uppåt) hamnar efter
        // rotationen phi i världen på
        //   (pivotX + lx·cos phi − ly·sin phi, GROUND_Y + lx·sin phi + ly·cos phi)
        function cogWorld() {
            var lx = phi >= 0 ? -shape.b / 2 : shape.b / 2;
            var ly = -shape.h / 2;
            var c = Math.cos(phi), s = Math.sin(phi);
            return { x: pivotX() + lx * c - ly * s,
                     y: GROUND_Y + lx * s + ly * c };
        }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function drawGround() {
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(60, GROUND_Y);
            ctx.lineTo(500, GROUND_Y);
            ctx.stroke();
            // snedstreck under marken (fast yta)
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var x = 70; x <= 500; x += 15) {
                ctx.moveTo(x, GROUND_Y);
                ctx.lineTo(x - 9, GROUND_Y + 9);
            }
            ctx.stroke();
        }

        function drawAngle() {
            var deg = Math.abs(phi) / RAD;
            if (deg < 3) return;
            // bågen i den aktiva vridningspunkten: marklinjen (bort från
            // klossen) är det undre benet, klossens lyfta underkant det
            // övre. Höger tipp: mark åt vänster; vänster tipp: mark åt höger.
            var pvx = pivotX();
            var mid;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            if (phi >= 0) {
                ctx.arc(pvx, GROUND_Y, 44, Math.PI, Math.PI + phi, false);
                mid = Math.PI + phi / 2;
            } else {
                ctx.arc(pvx, GROUND_Y, 44, 0, phi, true);
                mid = phi / 2;
            }
            ctx.stroke();
            // gradtal på bisektrisen, strax utanför bågen — bara när kilen
            // är bred nog för texten (glidarens avläsning finns alltid)
            if (deg >= 10) {
                ctx.fillStyle = INK;
                ctx.font = '14px ' + FONT;
                ctx.textAlign = 'center';
                ctx.fillText(Math.round(deg) + '°',
                    pvx + Math.cos(mid) * 74, GROUND_Y + Math.sin(mid) * 74 + 5);
            }
        }

        function drawBlock() {
            var xl = CX - shape.b / 2, xr = CX + shape.b / 2;
            // stödytan (lila) på marken — klossens kontaktsträcka: hela
            // basen när den står/ligger plant, annars bara vridningspunkten
            var flat = Math.abs(phi) < 0.01 || mode === 'ligger';
            if (flat) {
                var b0, b1;
                if (mode === 'ligger') {
                    // liggande på sin sida, åt det håll den välte
                    b0 = phi > 0 ? xr : xl - shape.h;
                    b1 = phi > 0 ? xr + shape.h : xl;
                } else {
                    b0 = xl;
                    b1 = xr;
                }
                ctx.strokeStyle = COL_STOD;
                ctx.lineWidth = 5;
                ctx.lineCap = 'butt';
                ctx.beginPath();
                ctx.moveTo(b0, GROUND_Y);
                ctx.lineTo(b1, GROUND_Y);
                ctx.stroke();
            }
            // klossen — vrids kring den aktiva vridningspunkten: nedre
            // högra hörnet vid phi > 0, nedre vänstra vid phi < 0
            var pvx = pivotX();
            var x0 = phi >= 0 ? -shape.b : 0;   // klossens vänsterkant lokalt
            ctx.save();
            ctx.translate(pvx, GROUND_Y);
            ctx.rotate(phi);
            ctx.fillStyle = '#e8d3ae';
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 2;
            ctx.fillRect(x0, -shape.h, shape.b, shape.h);
            ctx.strokeRect(x0, -shape.h, shape.b, shape.h);
            // träådring — svaga linjer längs klossens långsida
            ctx.strokeStyle = 'rgba(138,106,58,0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (shape.h >= shape.b) {
                ctx.moveTo(x0 + shape.b * 0.32, -shape.h + 8);
                ctx.lineTo(x0 + shape.b * 0.26, -8);
                ctx.moveTo(x0 + shape.b * 0.68, -shape.h + 10);
                ctx.lineTo(x0 + shape.b * 0.74, -10);
            } else {
                ctx.moveTo(x0 + 8, -shape.h * 0.36);
                ctx.lineTo(x0 + shape.b - 8, -shape.h * 0.30);
                ctx.moveTo(x0 + 10, -shape.h * 0.70);
                ctx.lineTo(x0 + shape.b - 10, -shape.h * 0.74);
            }
            ctx.stroke();
            ctx.restore();
            // vridningspunkten markeras när klossen är lyft ur planläget
            if (!flat || mode === 'ligger') {
                ctx.fillStyle = INK;
                ctx.beginPath();
                ctx.arc(pvx, GROUND_Y, 3.4, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        // Tyngdkraften: pil rakt nedåt från tyngdpunkten. Pilen är en
        // KRAFTVEKTOR, så längden är konstant (∝ klossens massa) och
        // ändras aldrig när klossen lutas — den får gärna gå igenom
        // golvytan. Att den alltid pekar lodrätt är hela poängen: hänger
        // den innanför vridningspunkten faller klossen tillbaka, utanför
        // välter den.
        function fgLen() { return FG_K * shape.b * shape.h; }
        function drawPointer() {
            var cog = cogWorld();
            var endY = cog.y + fgLen();
            var headLen = 9;
            ctx.strokeStyle = '#3a4049';
            ctx.lineWidth = 2.4;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(cog.x, cog.y);
            ctx.lineTo(cog.x, endY - headLen);
            ctx.stroke();
            ctx.fillStyle = '#3a4049';
            ctx.beginPath();
            ctx.moveTo(cog.x, endY);
            ctx.lineTo(cog.x - 4.5, endY - headLen);
            ctx.lineTo(cog.x + 4.5, endY - headLen);
            ctx.closePath();
            ctx.fill();
            // tyngdpunkten (grön prick, som teorifigurerna)
            ctx.fillStyle = COL_TP;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cog.x, cog.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        function render() {
            drawBackground();
            drawGround();
            drawBlock();
            drawAngle();
            drawPointer();
        }

        // ── Simulationssteg (endast efter "Släpp klossen") ────────────────
        function step(dt) {
            if (mode !== 'anim') return;
            // fri rotation kring vridningspunkten: vinkelaccelerationen
            // följer tyngdpunktens hävarm — noll när tyngdpunkten står rakt
            // ovanför hörnet (|phi| = kritiska vinkeln), tillbakadrivande
            // innanför, vältande utanför. dir speglar dynamiken åt vänster.
            var r = Math.hypot(shape.b, shape.h) / 2;
            var acc = dir * GPX / r * Math.sin(dir * phi - critRad());
            phiVel += acc * dt;
            phi += phiVel * dt;
            if (dir * phi >= Math.PI / 2) {
                // klossen landar på sin sida
                phi = dir * Math.PI / 2;
                phiVel = 0;
                mode = 'ligger';
                syncUi();
            } else if (dir * phi <= 0) {
                // klossen slår i underlaget — en liten dämpad studs
                phi = 0;
                phiVel = -phiVel * 0.22;
                if (Math.abs(phiVel) < 0.3) {
                    phiVel = 0;
                    mode = 'hall';
                    slider.value = '0';
                    syncUi();
                }
            }
        }

        function shouldRun() {
            if (!visible || document.hidden) return false;
            return mode === 'anim';
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            sliderVal.textContent = fmt(phi / RAD, 1).replace('-', '−') + '°';
            if (mode === 'anim') {
                info.textContent = animTips ? 'Klossen välter!'
                                            : 'Klossen faller tillbaka';
            } else if (mode === 'ligger') {
                info.textContent = 'Välte vid ' + fmt(tippedAt, 1) + '°';
            } else if (Math.abs(phi) < 0.01) {
                info.textContent = 'Klossen står stabilt';
            } else if (Math.abs(phi) < critRad()) {
                info.textContent = 'Faller tillbaka om du släpper';
            } else {
                info.textContent = 'Välter om du släpper';
            }
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            slappBtn.disabled = !(mode === 'hall' && Math.abs(phi) > 0.01);
            slider.disabled = mode !== 'hall';
        }
        function setShape(key) {
            shape = SHAPES[key];
            hogBtn.className = 'minisim-btn' + (key === 'hog' ? ' ms-vald' : '');
            lagBtn.className = 'minisim-btn' + (key === 'lag' ? ' ms-vald' : '');
            if (mode !== 'hall') {
                mode = 'hall';
                phi = 0;
                phiVel = 0;
                slider.value = '0';
            }
            syncUi();
            render();
            updateInfo();
        }
        hogBtn.addEventListener('click', function () { setShape('hog'); });
        lagBtn.addEventListener('click', function () { setShape('lag'); });
        // Lämna över klossen till fysiken — från knappen eller pekarsläppet
        function release() {
            if (mode !== 'hall' || Math.abs(phi) <= 0.01) return;
            dir = phi > 0 ? 1 : -1;
            mode = 'anim';
            phiVel = 0;
            animTips = Math.abs(phi) > critRad();
            tippedAt = Math.abs(phi) / RAD;
            syncUi();
            updateInfo();
            kick();
        }
        slappBtn.addEventListener('click', release);
        omBtn.addEventListener('click', function () {
            mode = 'hall';
            phi = 0;
            phiVel = 0;
            slider.value = '0';
            syncUi();
            render();
            updateInfo();
        });
        slider.addEventListener('input', function () {
            if (mode !== 'hall') return;
            phi = parseFloat(slider.value) * RAD;
            syncUi();
            render();
            updateInfo();
        });
        slowCb.addEventListener('change', kick);

        // ── Ta tag i klossens överkant och tippa (pekare/touch/mus) ───────
        // Greppet lagras i klossens eget system relativt BASENS MITT
        // (u längs basen, v uppåt som negativ canvas-y) — det är oberoende
        // av vilken vridningspunkt som är aktiv, så greppet överlever att
        // klossen dras genom lodrätt läge och byter tipphåll.
        var dragging = false, dragPtr = -1, grabU = 0, grabV = 0;
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function blockLocal(p) {
            // pekarens läge i klossens system, relativt basens mitt
            var pvx = pivotX();
            var dx = p.x - pvx, dy = p.y - GROUND_Y;
            var c = Math.cos(phi), s = Math.sin(phi);
            return { u: dx * c + dy * s + (phi >= 0 ? shape.b / 2 : -shape.b / 2),
                     v: -dx * s + dy * c };
        }
        function overTop(p) {
            // klossens övre del (med lite marginal för touch)
            var q = blockLocal(p);
            return Math.abs(q.u) <= shape.b / 2 + 8 &&
                   q.v >= -shape.h - 10 && q.v <= -shape.h * 0.4;
        }
        function dragAngle(p) {
            // vinkeln som lägger greppunkten under pekaren: prova först
            // tippning åt höger (högra hörnet som pivot), annars åt vänster
            function angFor(side) {
                var pvx = CX + side * shape.b / 2;
                var lx = grabU - side * shape.b / 2;
                var a = Math.atan2(p.y - GROUND_Y, p.x - pvx) -
                        Math.atan2(grabV, lx);
                while (a > Math.PI) a -= 2 * Math.PI;
                while (a < -Math.PI) a += 2 * Math.PI;
                return a;
            }
            var a = angFor(1);
            if (a >= 0) return Math.min(a, DRAG_MAX * RAD);
            a = angFor(-1);
            if (a <= 0) return Math.max(a, -DRAG_MAX * RAD);
            return 0;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overTop(p)) return;
            e.preventDefault();
            var q = blockLocal(p);
            grabU = Math.max(-shape.b / 2, Math.min(shape.b / 2, q.u));
            grabV = Math.max(-shape.h, Math.min(-4, q.v));
            mode = 'hall';                 // fångar även en fallande kloss
            phiVel = 0;
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            syncUi();
            render();
            updateInfo();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overTop(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            phi = dragAngle(p);
            slider.value = String(phi / RAD);
            syncUi();
            render();
            updateInfo();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
            // pekarsläpp = klossen släpps automatiskt
            release();
            if (mode === 'hall') {         // släppt nära 0° — bara städa UI
                slider.value = String(phi / RAD);
                syncUi();
                render();
                updateInfo();
            }
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag: tyngdkraftspilens aktuella geometri (samma
        // funktioner som drawPointer använder), för att kunna mäta att
        // längden är konstant och att spetsen ryms i canvasen.
        card._fg = function () {
            var c = cogWorld();
            return { x: c.x, y: c.y, len: fgLen(), endY: c.y + fgLen(), H: H };
        };

        // Test-handtag för skärmdumpsskript: ställ lutning/läge exakt.
        // tiltDeg är signerad — negativ lutar/välter åt vänster.
        card._set = function (tiltDeg, newMode) {
            mode = newMode || 'hall';
            dir = tiltDeg < 0 ? -1 : 1;
            phi = (mode === 'ligger' ? dir * 90 : tiltDeg) * RAD;
            phiVel = 0;
            animTips = Math.abs(tiltDeg) * RAD > critRad();
            tippedAt = Math.abs(tiltDeg);
            slider.value = String(Math.max(-TILT_MAX, Math.min(tiltDeg, TILT_MAX)));
            syncUi();
            render();
            updateInfo();
        };

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: gaffelbalans
    // ══════════════════════════════════════════════════════════════════════
    // Demonstrationen ur fy2-1.3 (Stabilitet): det klassiska
    // balanstricket — två gafflar trycks fast i en kork, en nål sticks
    // igenom korken, och hela bygget balanserar på nålspetsen mot den
    // smala kanten av ett mynt som står på högkant i en flaskkork.
    // Gafflarnas tunga skaft hänger NEDÅT och drar systemets tyngdpunkt
    // till en punkt strax UNDER stödpunkten — därför rättar tyngdkraftens
    // moment till varje lutning i stället för att välta bygget, precis
    // tvärtom mot klossen i vältningsdemonstrationen.
    // Ta tag i en gaffel och luta bygget (eller tryck "Knuffa till") —
    // det vaggar tillbaka som en pendel kring stödpunkten. Glidaren
    // ändrar gaffelvinkeln: lyfter man gafflarna över den kritiska
    // vinkeln (≈36°) hamnar tyngdpunkten ovanför stödpunkten och bygget
    // faller. Skalan till höger visar tyngdpunktens läge i millimeter
    // relativt stödpunkten — den lilla storheten som avgör allt.
    // Fysikmodellen (massor, längder, tröghetsmoment) är IDENTISK med den
    // fristående simuleringen fysik2-gaffelbalans-app.html. Ritad i
    // laboranstemat; "Ultrarapid" och fullskärm som övriga minisims.
    function buildGaffelbalans(node, cfg) {
        var W = 560, H = 430;              // logisk ritstorlek
        var PIVX = 230, PIVY = 150;        // stödpunkten: nålspetsen på myntkanten
        var SCALE = 1100;                  // px per meter i scenen
        var RAD = Math.PI / 180;
        var INK = '#1f2530';
        var COL_TP = '#2e9e4f';            // tyngdpunkten (grön, som teorifigurerna)
        var COL_FG = '#2563c9';            // tyngdkraften (blå, som teorifigurerna)
        var COL_RISK = '#c8324a';
        var STEEL = '#d4d9de', STEEL_K = '#8f96a0';
        var CORK_F = '#cbab7a', CORK_K = '#8a6a3a';
        var DRAG_MAX = 0.30;               // rad — så mycket handen kan luta bygget
        var SLIP = 0.40;                   // rad — nålspetsen glider av myntkanten
        var GPX = 1500;                    // px/s² i fallanimationen
        var DAMP = 0.35;                   // dämpning i vippningen (1/s)

        // ── Fysikmodell (SI-enheter) ──────────────────────────────────────
        // IDENTISK med fysik2-gaffelbalans-app.html. Stödpunkten är origo,
        // positiv y uppåt. Gaffelvinkeln beta räknas nedåt från vågrätt.
        var PHYS = {
            g: 9.82,
            mNeedle: 0.0005, yNeedle: 0.0175,   // synlig nål 3,5 cm, tp på mitten
            mCork: 0.003,    yCork: 0.050,      // korkens mitt 5,0 cm över spetsen
            mFork: 0.045,                        // per gaffel
            forkAttachY: 0.045,                  // gaffelns fäste i korken
            forkAttachX: 0.011,                  // korkens radie
            forkCmDist: 0.080                    // gaffelns tp, avstånd från fästet
        };
        function derived(betaDeg) {
            var P = PHYS;
            var b = betaDeg * RAD;
            var xF = P.forkAttachX + P.forkCmDist * Math.cos(b);
            var yF = P.forkAttachY - P.forkCmDist * Math.sin(b);
            var M = P.mNeedle + P.mCork + 2 * P.mFork;
            var yCm = (P.mNeedle * P.yNeedle + P.mCork * P.yCork + 2 * P.mFork * yF) / M;
            // Tröghetsmoment kring stödpunkten för vippningen (gaffelplanets
            // mod — den långsamma, synliga rörelsen).
            var I = P.mNeedle * P.yNeedle * P.yNeedle + P.mCork * P.yCork * P.yCork +
                    2 * P.mFork * (xF * xF + yF * yF);
            var stable = yCm < 0;
            var omega0 = stable ? Math.sqrt(M * P.g * (-yCm) / I) : 0;
            return { M: M, yCm: yCm, I: I, stable: stable,
                     omega0: omega0, period: stable ? 2 * Math.PI / omega0 : 0 };
        }
        // Kritisk gaffelvinkel (y_cm = 0) — samma uttryck som i simuleringen
        var BETA_CRIT = Math.asin(
            (PHYS.mNeedle * PHYS.yNeedle + PHYS.mCork * PHYS.yCork +
             2 * PHYS.mFork * PHYS.forkAttachY) /
            (2 * PHYS.mFork * PHYS.forkCmDist)) / RAD;

        // Bygget i px (lokalt system med origo i stödpunkten, y negativ uppåt)
        var ATT_X = PHYS.forkAttachX * SCALE;      // 12,1
        var ATT_Y = PHYS.forkAttachY * SCALE;      // 49,5
        var FORK_L = 2 * PHYS.forkCmDist * SCALE;  // 176 — tp mitt på gaffeln
        var CK_W = 12, CK_TOP = -74, CK_BOT = -38;
        var FG_LEN = 78;                   // tyngdkraftspilen — konstant belopp

        // Myntet och flaskan (världskoordinater, står stilla)
        var COIN_X = PIVX, COIN_RY = 36, COIN_Y = PIVY + COIN_RY, COIN_RX = 17, COIN_T = 3.5;

        // Skalan till höger: tyngdpunktens läge i mm relativt stödpunkten.
        // Nollstrecket ligger på SAMMA höjd som stödpunkten i scenen.
        var SC_L = 500, SC_R = 542, SC_PPMM = 4.4;
        var SC_TOP = PIVY - 20 * SC_PPMM, SC_BOT = PIVY + 30 * SC_PPMM;
        function scY(mm) {
            return Math.max(SC_TOP, Math.min(SC_BOT, PIVY - mm * SC_PPMM));
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'Två gafflar sitter fast i en kork som en nål är stucken genom. ' +
            'Nålspetsen vilar på den smala kanten av ett mynt som står på ' +
            'högkant i en flaskkork. Gafflarnas skaft hänger nedåt, så ' +
            'systemets tyngdpunkt hamnar strax under nålspetsen — den gröna ' +
            'pricken med tyngdkraftens blå pil. Ta tag i en gaffel och luta ' +
            'bygget, eller knuffa till det: det vaggar tillbaka i stället för ' +
            'att välta. Lyfter du gafflarna över den kritiska vinkeln hamnar ' +
            'tyngdpunkten ovanför stödpunkten och bygget faller. Skalan till ' +
            'höger visar tyngdpunktens läge i millimeter över eller under ' +
            'stödpunkten.');
        canvas.style.touchAction = 'pan-y';
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var knuffBtn = document.createElement('button');
        knuffBtn.type = 'button';
        knuffBtn.className = 'minisim-btn ms-primar';
        knuffBtn.textContent = 'Knuffa till';

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';

        var slowLbl = document.createElement('label');
        slowLbl.className = 'minisim-check';
        var slowCb = document.createElement('input');
        slowCb.type = 'checkbox';
        slowLbl.appendChild(slowCb);
        slowLbl.appendChild(document.createTextNode('Ultrarapid'));

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(knuffBtn);
        controls.appendChild(omBtn);
        controls.appendChild(slowLbl);
        controls.appendChild(info);
        card.appendChild(controls);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Gaffelvinkel';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '10';
        slider.max = '60';
        slider.step = '1';
        slider.value = '45';
        slider.setAttribute('aria-label',
            'Gaffelvinkel i grader nedåt från vågrätt — små vinklar lyfter ' +
            'tyngdpunkten över stödpunkten så att bygget faller');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        // ── Canvas-uppsättning ────────────────────────────────────────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var beta = 45;                     // gaffelvinkel (grader nedåt)
        var theta = 0;                     // byggets lutning kring stödpunkten (rad)
        var omega = 0;                     // vinkelfart (rad/s)
        var mode = 'sving';                // 'hall' | 'sving' | 'fall' | 'fallen'
        var fx = 0, fy = 0, vy = 0, vx = 0;   // fallets förskjutning
        var knuffSida = 1;
        var running = false, visible = true, lastTs = 0, rafId = 0;
        var D = derived(beta);

        function timeScale() { return slowCb.checked ? 0.25 : 1; }

        // Deterministiska korkprickar (aldrig slumpade per bildruta)
        var seed = 7;
        function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
        var corkDots = [], bottleDots = [];
        for (var i = 0; i < 26; i++) {
            corkDots.push([-CK_W + 2 + rnd() * (2 * CK_W - 4),
                           CK_TOP + 4 + rnd() * (CK_BOT - CK_TOP - 8),
                           0.7 + rnd() * 1.3]);
        }
        for (var j = 0; j < 18; j++) {
            bottleDots.push([-19 + rnd() * 38, 224 + rnd() * 30, 0.7 + rnd() * 1.2]);
        }

        // ── Bakgrund (laboranstema: papper med kollegieblocks-rutnät) ─────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        // ── Flaskan med korken och myntet på högkant ──────────────────────
        function drawBottle() {
            ctx.save();
            ctx.translate(PIVX, 0);
            // glaset: hals, skuldra och den övre delen av buken (fortsätter
            // ut ur bilden nedåt)
            ctx.beginPath();
            ctx.moveTo(-25, 258);
            ctx.lineTo(-25, 306);
            ctx.bezierCurveTo(-40, 322, -66, 340, -68, 372);
            ctx.lineTo(-68, H);
            ctx.lineTo(68, H);
            ctx.lineTo(68, 372);
            ctx.bezierCurveTo(66, 340, 40, 322, 25, 306);
            ctx.lineTo(25, 258);
            ctx.closePath();
            ctx.fillStyle = '#3a8f56';
            ctx.fill();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.8;
            ctx.stroke();
            // ljusstrimma i glaset
            ctx.strokeStyle = 'rgba(180,220,190,0.45)';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(-15, 272);
            ctx.lineTo(-15, 300);
            ctx.bezierCurveTo(-28, 318, -52, 338, -55, 372);
            ctx.lineTo(-55, H - 6);
            ctx.stroke();
            // mynningsring
            ctx.fillStyle = '#357f4d';
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.rect(-29, 252, 58, 12);
            ctx.fill();
            ctx.stroke();
            // korken i flaskhalsen, med skåran där myntet står
            ctx.fillStyle = CORK_F;
            ctx.strokeStyle = CORK_K;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.rect(-22, 218, 44, 40);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'rgba(138,106,58,0.40)';
            for (var k = 0; k < bottleDots.length; k++) {
                var d = bottleDots[k];
                ctx.beginPath();
                ctx.arc(d[0], d[1], d[2], 0, 2 * Math.PI);
                ctx.fill();
            }
            // skåran som myntet står i
            ctx.fillStyle = '#6b5230';
            ctx.fillRect(-2.6, 218, 5.2, 9);
            ctx.restore();
        }

        function drawCoin() {
            // baksidan (myntets tjocklek syns som en mörkare skära)
            ctx.fillStyle = '#c8a24a';
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.ellipse(COIN_X + COIN_T, COIN_Y, COIN_RX, COIN_RY, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            // räfflad kant på den synliga skäran
            ctx.strokeStyle = 'rgba(90,66,28,0.55)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var r = -0.8; r <= 0.8; r += 0.26) {
                var ey = COIN_Y + r * COIN_RY;
                var ex = COIN_RX * Math.sqrt(Math.max(0, 1 - r * r));
                ctx.moveTo(COIN_X + COIN_T + ex - 3.8, ey);
                ctx.lineTo(COIN_X + COIN_T + ex, ey);
            }
            ctx.stroke();
            // framsidan
            var g = ctx.createLinearGradient(COIN_X - COIN_T - COIN_RX, 0,
                                             COIN_X - COIN_T + COIN_RX, 0);
            g.addColorStop(0, '#dcb95f');
            g.addColorStop(0.4, '#fdf3cf');
            g.addColorStop(1, '#e2c06a');
            ctx.fillStyle = g;
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.ellipse(COIN_X - COIN_T, COIN_Y, COIN_RX, COIN_RY, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            // prägling: en svag inre ring
            ctx.strokeStyle = 'rgba(138,106,58,0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(COIN_X - COIN_T, COIN_Y, COIN_RX * 0.62, COIN_RY * 0.74,
                        0, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // ── Bygget: nål, gafflar och kork ─────────────────────────────────
        function drawFork(sign, b) {
            var L = FORK_L;
            ctx.save();
            ctx.translate(sign * ATT_X, -ATT_Y);
            ctx.scale(sign, 1);
            ctx.rotate(b);
            var pts = [[-14, 2.2], [0.10 * L, 3.0], [0.45 * L, 4.6],
                       [0.60 * L, 3.0], [0.68 * L, 2.4], [0.74 * L, 7.2],
                       [0.80 * L, 8.4]];
            ctx.beginPath();
            ctx.moveTo(pts[0][0], -pts[0][1]);
            for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], -pts[i][1]);
            for (var k = pts.length - 1; k >= 0; k--) ctx.lineTo(pts[k][0], pts[k][1]);
            ctx.closePath();
            ctx.fillStyle = STEEL;
            ctx.fill();
            ctx.strokeStyle = STEEL_K;
            ctx.lineWidth = 1;
            ctx.stroke();
            // klorna
            var centers = [-6.4, -2.1, 2.1, 6.4];
            for (var t = 0; t < centers.length; t++) {
                var c = centers[t];
                ctx.beginPath();
                ctx.moveTo(0.78 * L, c - 1.5);
                ctx.lineTo(L - 11, c - 1.5);
                ctx.lineTo(L, c);
                ctx.lineTo(L - 11, c + 1.5);
                ctx.lineTo(0.78 * L, c + 1.5);
                ctx.closePath();
                ctx.fillStyle = STEEL;
                ctx.fill();
                ctx.stroke();
            }
            // dager längs skaftet
            ctx.strokeStyle = 'rgba(255,255,255,0.55)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(0.06 * L, -1.2);
            ctx.lineTo(0.55 * L, -2.4);
            ctx.stroke();
            ctx.restore();
        }

        function drawNeedle() {
            ctx.strokeStyle = '#868d97';
            ctx.lineWidth = 2.6;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(0, -9);
            ctx.lineTo(0, -86);
            ctx.stroke();
            // spetsen (vilar i stödpunkten)
            ctx.fillStyle = '#8f96a0';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-1.6, -10);
            ctx.lineTo(1.6, -10);
            ctx.closePath();
            ctx.fill();
            // nålsögat
            ctx.strokeStyle = '#8f96a0';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(0, -80, 1.5, 3.6, 0, 0, 2 * Math.PI);
            ctx.stroke();
        }

        function drawCork() {
            var r = 4;
            ctx.beginPath();
            ctx.moveTo(-CK_W + r, CK_TOP);
            ctx.lineTo(CK_W - r, CK_TOP);
            ctx.quadraticCurveTo(CK_W, CK_TOP, CK_W, CK_TOP + r);
            ctx.lineTo(CK_W, CK_BOT - r);
            ctx.quadraticCurveTo(CK_W, CK_BOT, CK_W - r, CK_BOT);
            ctx.lineTo(-CK_W + r, CK_BOT);
            ctx.quadraticCurveTo(-CK_W, CK_BOT, -CK_W, CK_BOT - r);
            ctx.lineTo(-CK_W, CK_TOP + r);
            ctx.quadraticCurveTo(-CK_W, CK_TOP, -CK_W + r, CK_TOP);
            ctx.closePath();
            ctx.fillStyle = CORK_F;
            ctx.fill();
            ctx.strokeStyle = CORK_K;
            ctx.lineWidth = 1.6;
            ctx.stroke();
            ctx.fillStyle = 'rgba(138,106,58,0.42)';
            for (var i = 0; i < corkDots.length; i++) {
                var d = corkDots[i];
                ctx.beginPath();
                ctx.arc(d[0], d[1], d[2], 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        // Tyngdpunktens läge i världen (bygget roterat theta kring
        // stödpunkten och, under fallet, förskjutet)
        function cogWorld() {
            var ly = -D.yCm * SCALE;       // lokal y (negativ = ovanför stödpunkten)
            var c = Math.cos(theta), s = Math.sin(theta);
            return { x: PIVX + fx - ly * s, y: PIVY + fy + ly * c };
        }

        function drawAssembly() {
            ctx.save();
            ctx.translate(PIVX + fx, PIVY + fy);
            ctx.rotate(theta);
            drawNeedle();
            drawFork(1, beta * RAD);
            drawFork(-1, beta * RAD);
            drawCork();
            ctx.restore();
        }

        // Tyngdkraften: pil rakt nedåt från tyngdpunkten, med KONSTANT
        // längd — byggets massa ändras aldrig, bara tyngdpunktens läge.
        function drawGravity() {
            var c = cogWorld();
            var endY = c.y + FG_LEN, head = 10;
            ctx.strokeStyle = COL_FG;
            ctx.fillStyle = COL_FG;
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(c.x, endY - head);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(c.x, endY);
            ctx.lineTo(c.x - 5, endY - head);
            ctx.lineTo(c.x + 5, endY - head);
            ctx.closePath();
            ctx.fill();
            // etiketten i fri pappersyta till vänster om pilen
            ctx.font = '11px ' + FONT;
            ctx.textAlign = 'right';
            ctx.fillText('G', c.x - 24, c.y + 44);
            var gw = ctx.measureText('G').width;
            ctx.font = 'italic 15px ' + FONT;
            ctx.fillText('F', c.x - 24 - gw, c.y + 40);
            // tyngdpunkten (grön prick)
            ctx.fillStyle = COL_TP;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(c.x, c.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        function drawPivot() {
            // lodlinjen genom stödpunkten — tyngdpunkten hänger mot den
            ctx.strokeStyle = 'rgba(31,37,48,0.45)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(PIVX, PIVY - 26);
            ctx.lineTo(PIVX, PIVY + 96);
            ctx.stroke();
            ctx.setLineDash([]);
            if (mode !== 'fall' && mode !== 'fallen') {
                ctx.fillStyle = INK;
                ctx.beginPath();
                ctx.arc(PIVX, PIVY, 3.2, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        // ── Skalan: tyngdpunktens läge relativt stödpunkten ───────────────
        function drawScale() {
            var mm = D.yCm * 1000;
            ctx.font = '14px ' + FONT;
            ctx.textAlign = 'center';
            ctx.fillStyle = INK;
            ctx.fillText('Tyngdpunkten', 500, SC_TOP - 16);
            // banden
            ctx.fillStyle = 'rgba(200,50,74,0.13)';
            ctx.fillRect(SC_L, SC_TOP, SC_R - SC_L, PIVY - SC_TOP);
            ctx.fillStyle = 'rgba(46,158,79,0.14)';
            ctx.fillRect(SC_L, PIVY, SC_R - SC_L, SC_BOT - PIVY);
            ctx.font = '11.5px ' + FONT;
            ctx.fillStyle = '#5a6170';
            ctx.save();
            ctx.translate(458, (SC_TOP + PIVY) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('välter', 0, 0);
            ctx.restore();
            ctx.save();
            ctx.translate(458, (PIVY + SC_BOT) / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('stabilt', 0, 0);
            ctx.restore();
            // axeln med gradering
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.4;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(SC_L, SC_TOP);
            ctx.lineTo(SC_L, SC_BOT);
            ctx.stroke();
            ctx.font = '12px ' + FONT;
            ctx.textAlign = 'right';
            ctx.lineWidth = 1;
            for (var v = 20; v >= -30; v -= 10) {
                var y = PIVY - v * SC_PPMM;
                ctx.beginPath();
                ctx.moveTo(SC_L - 5, y);
                ctx.lineTo(SC_L, y);
                ctx.stroke();
                ctx.fillStyle = '#5a6170';
                ctx.fillText(v > 0 ? '+' + v : (v < 0 ? '−' + (-v) : '0'), SC_L - 8, y + 4);
            }
            // nollstrecket ligger på stödpunktens höjd i scenen
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(SC_L - 5, PIVY);
            ctx.lineTo(SC_R, PIVY);
            ctx.stroke();
            ctx.font = '11.5px ' + FONT;
            ctx.fillStyle = '#5a6170';
            ctx.textAlign = 'right';
            ctx.fillText('stödpunkt', SC_L - 8, PIVY + 17);
            // markören
            var my = scY(mm);
            var col = D.stable ? COL_TP : COL_RISK;
            ctx.strokeStyle = col;
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(SC_L, my);
            ctx.lineTo(SC_R, my);
            ctx.stroke();
            ctx.fillStyle = col;
            ctx.beginPath();
            ctx.arc(SC_L + 9, my, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.stroke();
            // värdet under skalan
            ctx.font = '15px ' + FONT;
            ctx.textAlign = 'center';
            ctx.fillStyle = col;
            ctx.fillText((mm < 0 ? '−' : '+') + fmt(Math.abs(mm), 1) + ' mm',
                         (SC_L + SC_R) / 2, SC_BOT + 20);
        }

        function render() {
            drawBackground();
            drawBottle();
            drawCoin();
            drawPivot();
            drawAssembly();
            drawGravity();
            drawScale();
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        // Vippningen är en pendel kring stödpunkten: tyngdpunkten ligger
        // rakt under (eller över) stödpunkten på avståndet |y_cm|, så
        //   I · α'' = M · g · y_cm · sin α.
        // Ligger tyngdpunkten UNDER stödpunkten (y_cm < 0) är momentet
        // återställande och bygget vaggar tillbaka; ligger den ÖVER växer
        // lutningen i stället, och nålspetsen glider till slut av myntkanten.
        function step(dt) {
            if (mode === 'fall') {
                theta += omega * dt;
                vy += GPX * dt;
                fy += vy * dt;
                fx += vx * dt;
                if (fy > 300) { mode = 'fallen'; syncUi(); }
                return;
            }
            if (mode !== 'sving') return;
            if (!D.stable && Math.abs(theta) < 0.004) theta = 0.004;
            var acc = D.M * PHYS.g * D.yCm * Math.sin(theta) / D.I - DAMP * omega;
            omega += acc * dt;
            theta += omega * dt;
            if (Math.abs(theta) > SLIP) {
                mode = 'fall';
                vy = 0;
                vx = (theta > 0 ? 1 : -1) * 40;
                omega = (theta > 0 ? 1 : -1) * Math.max(1.6, Math.abs(omega));
                syncUi();
            }
        }

        function shouldRun() {
            if (!visible || document.hidden) return false;
            if (mode === 'fall') return true;
            if (mode !== 'sving') return false;
            return !D.stable || Math.abs(theta) > 1e-4 || Math.abs(omega) > 1e-4;
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            sliderVal.textContent = Math.round(beta) + '°';
            if (mode === 'fallen') {
                info.textContent = 'Bygget föll av myntet';
            } else if (mode === 'fall') {
                info.textContent = 'Nålen glider av myntkanten';
            } else if (!D.stable) {
                info.textContent = 'Tyngdpunkten hamnar över stödpunkten';
            } else {
                info.textContent = 'Stabilt — perioden ' + fmt(D.period, 1) + ' s';
            }
        }

        function syncUi() {
            knuffBtn.disabled = (mode === 'fall' || mode === 'fallen');
        }

        function reset() {
            theta = 0; omega = 0; fx = 0; fy = 0; vy = 0; vx = 0;
            mode = 'sving';
            syncUi();
            render();
            updateInfo();
            kick();
        }

        knuffBtn.addEventListener('click', function () {
            if (mode === 'fall' || mode === 'fallen') return;
            mode = 'sving';
            omega += knuffSida * 0.8;
            knuffSida = -knuffSida;
            syncUi();
            kick();
        });
        omBtn.addEventListener('click', reset);
        slider.addEventListener('input', function () {
            beta = parseFloat(slider.value);
            D = derived(beta);
            if (mode === 'fallen') { reset(); return; }
            render();
            updateInfo();
            kick();
        });
        slowCb.addEventListener('change', kick);

        // ── Ta tag i bygget och luta det ──────────────────────────────────
        var dragging = false, dragPtr = -1, grabAng = 0;
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) * W / r.width,
                     y: (e.clientY - r.top) * H / r.height };
        }
        // pekarens läge i byggets eget system (origo i stödpunkten)
        function localPos(p) {
            var dx = p.x - PIVX, dy = p.y - PIVY;
            var c = Math.cos(theta), s = Math.sin(theta);
            return { x: dx * c + dy * s, y: -dx * s + dy * c };
        }
        function overRig(p) {
            if (mode === 'fall' || mode === 'fallen') return false;
            var q = localPos(p);
            if (Math.abs(q.x) <= CK_W + 8 && q.y >= CK_TOP - 8 && q.y <= 4) return true;
            var b = beta * RAD;
            for (var sign = -1; sign <= 1; sign += 2) {
                var ux = sign * Math.cos(b), uy = Math.sin(b);
                var rx = q.x - sign * ATT_X, ry = q.y + ATT_Y;
                var t = rx * ux + ry * uy;
                var d = Math.abs(rx * uy - ry * ux);
                if (t >= 0 && t <= FORK_L + 6 && d <= 13) return true;
            }
            return false;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overRig(p)) return;
            e.preventDefault();
            grabAng = Math.atan2(p.x - PIVX, -(p.y - PIVY)) - theta;
            mode = 'hall';
            omega = 0;
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            syncUi();
            render();
            updateInfo();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overRig(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            var a = Math.atan2(p.x - PIVX, -(p.y - PIVY)) - grabAng;
            while (a > Math.PI) a -= 2 * Math.PI;
            while (a < -Math.PI) a += 2 * Math.PI;
            theta = Math.max(-DRAG_MAX, Math.min(DRAG_MAX, a));
            render();
            updateInfo();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
            mode = 'sving';                // släpper man taget tar fysiken över
            omega = 0;
            syncUi();
            updateInfo();
            kick();
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag för skärmdumps- och mätskript
        // starta = true släpper bygget (kör igång fysiken) i stället för att
        // frysa läget för en skärmdump
        card._set = function (betaDeg, thetaDeg, starta) {
            beta = betaDeg;
            slider.value = String(betaDeg);
            D = derived(beta);
            theta = (thetaDeg || 0) * RAD;
            omega = 0; fx = 0; fy = 0; vy = 0; vx = 0;
            mode = 'sving';
            syncUi();
            render();
            updateInfo();
            if (starta) kick();
        };
        card._state = function () {
            var c = cogWorld();
            return { beta: beta, thetaDeg: theta / RAD, mode: mode,
                     yCmMm: D.yCm * 1000, stable: D.stable, period: D.period,
                     betaCrit: BETA_CRIT, cog: c, fgEndY: c.y + FG_LEN, W: W, H: H };
        };

        syncUi();
        render();
        updateInfo();
        kick();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: gaffelbalans3d
    // ══════════════════════════════════════════════════════════════════════
    // 3D-varianten av gaffelbalansen: den fristående simuleringen
    // fysik2-gaffelbalans-app.html inbäddad som minisimulering via en
    // iframe (?embed=1&mini=1). I mini-läget visar sidan BARA scenen;
    // de väsentliga verktygen — Knuffa till, Snurra, Börja om och
    // glidaren Gaffelvinkel — bor här i minisim-kortet och styr sidan
    // med postMessage. Sidan rapporterar tillbaka sitt läge
    // (fallen/stabil/period/varvtal) till kortets info-rad.
    // FULLSKÄRM startas med scenens egen .fs-btn INNE i iframen (en
    // fullskärmsknapp i kortet kan inte skicka vidare klickgesten till
    // iframen) och ger då EXAKT originalsimuleringens fullskärmsläge:
    // kryssrutorna uppe till höger, styrknapparna, glidarpanelen i
    // underkant och scen-tipset. Kräver allow="fullscreen" på iframen.
    // (Canvas-varianten typ: gaffelbalans finns kvar ovan.)
    function buildGaffelbalans3d(node, cfg) {
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var iframe = document.createElement('iframe');
        iframe.className = 'minisim-iframe';
        // Cache-buster (samma __CB som katalogen använder): utan den kunde
        // webbläsaren servera en gammal version av den inbäddade sidan i
        // upp till tio minuter efter en push, fast teorin runt omkring var
        // ny (Snett kast, 2026-09-07).
        iframe.src = 'fysik2-gaffelbalans-app.html?embed=1&mini=1&v=' + (window.__CB || Date.now());
        iframe.setAttribute('allowfullscreen', '');
        iframe.allow = 'fullscreen';
        iframe.loading = 'lazy';
        iframe.title =
            '3D-simulering: två gafflar i en kork balanserar på en nålspets ' +
            'mot kanten av ett mynt på högkant. Dra i scenen för att vrida ' +
            'kameran, klicka på korken för en knuff och på ett gaffelskaft ' +
            'för ett snurr. Fullskärmsknappen uppe till vänster i scenen ' +
            'öppnar simuleringen i fullskärm med alla verktyg.';
        scene.appendChild(iframe);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        function sanda(cmd, value) {
            try {
                iframe.contentWindow.postMessage(
                    { fysikGaffel: cmd, value: value }, location.origin);
            } catch (e) { /* iframen inte laddad ännu */ }
        }

        var knuffBtn = document.createElement('button');
        knuffBtn.type = 'button';
        knuffBtn.className = 'minisim-btn ms-primar';
        knuffBtn.textContent = 'Knuffa till';
        knuffBtn.addEventListener('click', function () { sanda('knuffa'); });

        var snurrBtn = document.createElement('button');
        snurrBtn.type = 'button';
        snurrBtn.className = 'minisim-btn';
        snurrBtn.textContent = 'Snurra';
        snurrBtn.addEventListener('click', function () { sanda('snurra'); });

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        omBtn.addEventListener('click', function () { sanda('reset'); });

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(knuffBtn);
        controls.appendChild(snurrBtn);
        controls.appendChild(omBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Gaffelvinkel';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '10';
        slider.max = '70';
        slider.step = '1';
        slider.value = '50';
        slider.setAttribute('aria-label',
            'Gaffelvinkel i grader nedåt från vågrätt — små vinklar lyfter ' +
            'tyngdpunkten över stödpunkten så att bygget faller');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderVal.textContent = '50°';
        slider.addEventListener('input', function () {
            sliderVal.textContent = slider.value + '°';
            sanda('beta', parseFloat(slider.value));
        });
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        // Lägesrapporten från sidan i iframen → kortets info-rad
        window.addEventListener('message', function (e) {
            if (e.source !== iframe.contentWindow) return;
            var st = e.data && e.data.fysikGaffelStatus;
            if (!st) return;
            if (st.fallen) {
                info.textContent = 'Det välte — tryck Börja om';
            } else if (!st.stable) {
                info.textContent = st.forksOn
                    ? 'Tyngdpunkten hamnar över stödpunkten'
                    : 'Utan gafflar: instabilt';
            } else if (st.spinF >= 0.3) {
                info.textContent = 'Snurrar ' + fmt(st.spinF, 1) + ' varv/s';
            } else {
                info.textContent = 'Stabilt — perioden ' + fmt(st.period, 1) + ' s';
            }
        });
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: dubbelkon
    // ══════════════════════════════════════════════════════════════════════
    // Dubbelkonen som ser ut att rulla uppför: den fristående simuleringen
    // fysik2-dubbelkon-app.html inbäddad som minisimulering via en iframe
    // (?embed=1&mini=1) — samma mönster som gaffelbalans3d. Kortets verktyg
    // (Släpp, Börja om, växeln Dubbelkon/Cylinder, glidaren Banans lutning)
    // styr sidan med postMessage, och sidan rapporterar tillbaka sitt läge
    // till info-raden. FULLSKÄRM startas med scenens egen .fs-btn INNE i
    // iframen och ger då exakt originalsimuleringens fullskärmsläge.
    function buildDubbelkon(node, cfg) {
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var iframe = document.createElement('iframe');
        iframe.className = 'minisim-iframe';
        iframe.src = 'fysik2-dubbelkon-app.html?embed=1&mini=1&v=' + (window.__CB || Date.now());
        iframe.setAttribute('allowfullscreen', '');
        iframe.allow = 'fullscreen';
        iframe.loading = 'lazy';
        iframe.title =
            '3D-simulering: en dubbelkon på en lutande, V-formad bana rullar ' +
            'mot den höga änden eftersom tyngdpunkten ändå sjunker. Dra i ' +
            'scenen för att vrida kameran och dra föremålet längs banan. ' +
            'Fullskärmsknappen uppe till vänster i scenen öppnar ' +
            'simuleringen i fullskärm med alla verktyg.';
        scene.appendChild(iframe);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        function sanda(cmd, value) {
            try {
                iframe.contentWindow.postMessage(
                    { fysikDubbelkon: cmd, value: value }, location.origin);
            } catch (e) { /* iframen inte laddad ännu */ }
        }

        var slappBtn = document.createElement('button');
        slappBtn.type = 'button';
        slappBtn.className = 'minisim-btn ms-primar';
        slappBtn.textContent = 'Släpp';
        slappBtn.addEventListener('click', function () { sanda('slapp'); });

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        omBtn.addEventListener('click', function () { sanda('reset'); });

        var objekt = 'kon';
        var bytBtn = document.createElement('button');
        bytBtn.type = 'button';
        bytBtn.className = 'minisim-btn';
        bytBtn.textContent = 'Byt till cylinder';
        bytBtn.addEventListener('click', function () {
            objekt = objekt === 'kon' ? 'cyl' : 'kon';
            bytBtn.textContent = objekt === 'kon'
                ? 'Byt till cylinder' : 'Byt till dubbelkon';
            sanda('objekt', objekt);
        });

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(slappBtn);
        controls.appendChild(omBtn);
        controls.appendChild(bytBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Banans lutning';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0';
        slider.max = '8';
        slider.step = '0.5';
        slider.value = '3';
        slider.setAttribute('aria-label',
            'Banans lutning i grader — brantare än den kritiska vinkeln ' +
            'rullar även dubbelkonen nedåt');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderVal.textContent = '3°';
        slider.addEventListener('input', function () {
            sliderVal.textContent = String(slider.value).replace('.', ',') + '°';
            sanda('lutning', parseFloat(slider.value));
        });
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        // Lägesrapporten från sidan i iframen → kortets info-rad
        window.addEventListener('message', function (e) {
            if (e.source !== iframe.contentWindow) return;
            var st = e.data && e.data.fysikDubbelkonStatus;
            if (!st) return;
            if (st.stopped && st.stopReason === 'bred') {
                info.textContent = 'Stannade vid den breda, höga änden';
            } else if (st.stopped) {
                info.textContent = 'Rullade ned till spetsen';
            } else if (st.objekt === 'cyl') {
                info.textContent = 'Cylindern rullar alltid nedåt';
            } else if (st.up) {
                info.textContent = 'Tyngdpunkten sjunker mot den breda änden';
            } else {
                info.textContent = 'För brant bana: konen rullar nedåt';
            }
        });
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: cirkularrorelse
    // ══════════════════════════════════════════════════════════════════════
    // Bilen i cirkelbana: den fristående simuleringen
    // fysik2-cirkular-rorelse-app.html inbäddad som minisimulering via en
    // iframe (?embed=1&mini=1) — samma mönster som gaffelbalans3d/dubbelkon.
    // Växlaren uppe till höger på scenen byter situation mellan Cirkelbana
    // och Bilbana (ovanifrån) samt Loop och Krön och dal (från sidan).
    // Kortets verktyg (Pausa/Fortsätt, Börja om, fartglidaren) styr sidan
    // med postMessage, och sidan rapporterar tillbaka sitt läge till
    // info-raden: centripetalkraften (cirkelbanan), kraften som krävs i den
    // snäva kurvan mot greppets max (bilbanan), gränsfarten längst ned
    // (loopen) och gränsfarten på krönet. FULLSKÄRM startas med scenens egen .fs-btn INNE i
    // iframen och ger då exakt originalsimuleringens fullskärmsläge.
    function buildCirkularrorelse(node, cfg) {
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var iframe = document.createElement('iframe');
        iframe.className = 'minisim-iframe';
        iframe.src = 'fysik2-cirkular-rorelse-app.html?embed=1&mini=1&v=' + (window.__CB || Date.now());
        // scenens viewBox är 820×540 — låt iframen ha samma proportion så
        // att SVG:n fyller ytan utan brevlådekanter
        iframe.style.aspectRatio = '820 / 540';
        iframe.setAttribute('allowfullscreen', '');
        iframe.allow = 'fullscreen';
        iframe.loading = 'lazy';
        iframe.title =
            'Simulering: en bil kör med konstant fart i en cirkelbana, sedd ' +
            'rakt uppifrån — kraftpilen pekar hela tiden in mot centrum. ' +
            'Växlaren uppe till höger byter till en bilbana med två kurvor, ' +
            'en loop sedd från sidan eller en väg över krön och genom dal. ' +
            'Fullskärmsknappen uppe till vänster i scenen öppnar ' +
            'simuleringen i fullskärm med alla verktyg.';
        scene.appendChild(iframe);

        function sanda(cmd, value) {
            try {
                iframe.contentWindow.postMessage(
                    { fysikCirkular: cmd, value: value }, location.origin);
            } catch (e) { /* iframen inte laddad ännu */ }
        }

        // Tusentalsavgränsat heltal med hårt mellanslag (för krafter i N)
        function fmtT(n) {
            var s = String(Math.round(n));
            return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        // ── Situationsväxlaren uppe till höger på scenen ──────────────────
        var lage = 'cirkel';            // 'cirkel' | 'bana' | 'loop' | 'kron'
        var LAGEN = ['cirkel', 'bana', 'loop', 'kron'];
        // farten v delas av cirkelbanan, bilbanan och krön/dal; loopen har
        // sin egen fart längst ned
        var sistaV = 8, sistaV0 = 21;
        var running = true;

        var vaxel = document.createElement('div');
        vaxel.className = 'ms-sitvaxel';
        var knappar = {};
        [['cirkel', 'Cirkelbana'], ['bana', 'Bilbana'], ['loop', 'Loop'], ['kron', 'Krön och dal']]
            .forEach(function (k) {
                var b = document.createElement('button');
                b.type = 'button';
                b.textContent = k[1];
                b.addEventListener('click', function () { byt(k[0]); });
                knappar[k[0]] = b;
                vaxel.appendChild(b);
            });
        scene.appendChild(vaxel);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var korBtn = document.createElement('button');
        korBtn.type = 'button';
        korBtn.className = 'minisim-btn ms-primar';
        korBtn.textContent = 'Pausa';
        korBtn.addEventListener('click', function () {
            running = !running;
            korBtn.textContent = running ? 'Pausa' : 'Fortsätt';
            sanda(running ? 'kor' : 'paus');
        });

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        omBtn.addEventListener('click', function () {
            running = true;
            korBtn.textContent = 'Pausa';
            sanda('reset');
        });

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(korBtn);
        controls.appendChild(omBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        // ── Fartglidaren (byter roll med situationen) ─────────────────────
        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.step = '0.1';
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        var sliderWrap = document.createElement('span');
        sliderWrap.className = 'ms-sl-wrap';
        var sliderMark = document.createElement('span');
        sliderMark.className = 'ms-sl-mark';
        sliderMark.innerHTML = '<span class="ms-sl-cap">Gränsfart</span><b></b><i></i>';
        sliderWrap.appendChild(slider);
        sliderWrap.appendChild(sliderMark);
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(sliderWrap);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function visaFart(v) { sliderVal.textContent = fmt(v, 1) + ' m/s'; }

        // Markeringen sätts ut där situationens gränsfart ligger, och göms
        // när gränsen hamnar utanför glidarens intervall.
        function visaGrans(g) {
            var min = parseFloat(slider.min), max = parseFloat(slider.max);
            if (!isFinite(g) || g < min || g > max) {
                sliderMark.style.display = 'none';
                sliderRow.classList.remove('ms-sl-marked');
                return;
            }
            var p = (g - min) / (max - min);
            sliderMark.style.display = 'flex';
            sliderMark.style.left = 'calc(8px + (100% - 16px) * ' + p + ')';
            sliderRow.classList.add('ms-sl-marked');
            // nära ändarna flödar ordet inåt i stället för att centreras
            var cap = sliderMark.firstChild;
            cap.style.left = p > 0.8 ? 'auto' : (p < 0.2 ? '0' : '50%');
            cap.style.right = p > 0.8 ? '0' : 'auto';
            cap.style.transform = (p < 0.2 || p > 0.8) ? 'none' : 'translateX(-50%)';
        }

        // Ställer om växlare, glidare och etikett efter situationen —
        // används både vid klick här och när läget byts inne i iframen
        // (fullskärmens radioknappar).
        function visaLage() {
            LAGEN.forEach(function (k) { knappar[k].classList.toggle('ms-aktiv', lage === k); });
            if (lage !== 'loop') {
                sliderLbl.textContent = lage === 'kron' ? 'Fart' : 'Banhastighet';
                slider.min = '2'; slider.max = '15';
                slider.value = String(sistaV);
                slider.setAttribute('aria-label',
                    lage === 'cirkel'
                        ? 'Banhastighet i meter per sekund — större fart kräver större centripetalkraft'
                        : lage === 'bana'
                        ? 'Banhastighet i meter per sekund — räcker inte greppet i kurvan fortsätter bilen rakt fram'
                        : 'Fart i meter per sekund — över gränsfarten lättar bilen från krönet');
                visaFart(sistaV);
            } else {
                sliderLbl.textContent = 'Fart längst ned';
                slider.min = '8'; slider.max = '24';
                slider.value = String(sistaV0);
                slider.setAttribute('aria-label',
                    'Bilens fart längst ned i loopen i meter per sekund — ' +
                    'under gränsfarten släpper bilen från banan');
                visaFart(sistaV0);
            }
        }

        function byt(nytt) {
            if (lage === nytt) return;
            lage = nytt;
            sliderMark.style.display = 'none';
            sliderRow.classList.remove('ms-sl-marked');
            running = true;
            korBtn.textContent = 'Pausa';
            visaLage();
            sanda('situation', nytt);
        }
        slider.addEventListener('input', function () {
            var v = parseFloat(slider.value);
            visaFart(v);
            if (lage !== 'loop') { sistaV = v; sanda('fart', v); }
            else { sistaV0 = v; sanda('fart0', v); }
        });

        visaLage();

        // Lägesrapporten från sidan i iframen → växlare, glidare, info-rad
        window.addEventListener('message', function (e) {
            if (e.source !== iframe.contentWindow) return;
            var st = e.data && e.data.fysikCirkularStatus;
            if (!st) return;
            if (LAGEN.indexOf(st.mode) >= 0 && st.mode !== lage) {
                lage = st.mode;
                visaLage();
            }
            if (typeof st.running === 'boolean' && st.running !== running) {
                running = st.running;
                korBtn.textContent = running ? 'Pausa' : 'Fortsätt';
            }
            // synka glidaren om farten ändrats inne i iframen (fullskärm) —
            // men aldrig medan användaren själv drar i den
            if (document.activeElement !== slider) {
                if (lage !== 'loop' && isFinite(st.v) && Math.abs(st.v - sistaV) > 0.049) {
                    sistaV = st.v; slider.value = String(st.v); visaFart(st.v);
                } else if (lage === 'loop' && isFinite(st.v0) && Math.abs(st.v0 - sistaV0) > 0.049) {
                    sistaV0 = st.v0; slider.value = String(st.v0); visaFart(st.v0);
                }
            }
            info.style.color = '';
            // bilbanans info är en hel mening — egen rad som får radbrytas
            info.classList.toggle('ms-brod', lage === 'bana');
            if (lage === 'cirkel' && isFinite(st.FC)) {
                info.innerHTML = '<em>F</em><sub>C</sub> = ' + fmtT(st.FC) + ' N';
            } else if (lage === 'bana' && isFinite(st.FC2) && isFinite(st.Fmax)) {
                // kraften den snäva kurvan kräver mot vad greppet kan ge
                info.textContent = 'Snäva kurvan: ' + fmtT(st.FC2) + ' N krävs, greppet ger ' +
                    fmtT(st.Fmax) + ' N';
                if (st.FC2 > st.Fmax) info.style.color = '#c8324a';
            } else if (lage === 'loop' && isFinite(st.vcrit)) {
                info.textContent = 'Gränsfart längst ned: ' + fmt(st.vcrit, 1) + ' m/s';
            } else if (lage === 'kron' && isFinite(st.vKant)) {
                // bilen lättar där krönbågen börjar, alltså under roten ur (g · r)
                info.textContent = 'Gränsfart: bilen lättar vid ' + fmt(st.vKant, 1) + ' m/s';
            }
            visaGrans(lage === 'bana' ? st.vGrepp
                : lage === 'loop' ? st.vcrit
                : lage === 'kron' ? st.vKant : NaN);
        });
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: linjal
    // ══════════════════════════════════════════════════════════════════════
    function buildLinjal(node, cfg) {
        var W = 560, H = 430;           // logisk ritstorlek
        // Linjalens geometri anges i LINJALENS eget system; på skärmen ritas
        // den förskjuten med offseten xr, eftersom linjalen "åker med" det
        // finger som håller fast medan båda fingrarna förs mot mitten.
        var R_X0 = 100, R_X1 = 460;     // linjalens vänstra/högra ände
        var R_TOP = 238, R_BOT = 264;   // linjalens över-/underkant
        var PX_PER_CM = (R_X1 - R_X0) / 30;   // 30 cm-linjal
        var MID = (R_X0 + R_X1) / 2;    // linjalens mitt (tyngdpunkt utan vikt)
        var X1_START = 124, X2_START = 452;   // fingrarnas startlägen (skärm)
        var FINGER_W = 30;              // fingertoppens bredd (platt ellips)
        var FINGER_H = 24;              // fingertoppens höjd
        var MEET_GAP = FINGER_W + 2;    // fingrarna "möts" vid detta gap
        var MU_S = 0.5, MU_K = 0.3;     // vilo- resp. glidfriktionstal
        var V_FINGER = 30;              // varje fingers fart mot mitten (px/s)
        var M_VIKT = 0.5;               // viktens massa i linjalmassor
        var N_LEN = 120;                // total pillängd för linjalens tyngd
        var COL_N = '#2563c9';          // normalkraftens färg (som teorin)
        var INK = '#1f2530';
        var SKIN = '#ecc19c', SKIN_D = '#b98a5e';

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En linjal vilar vågrätt på två pekfingrar. När fingrarna dras mot ' +
            'varandra glider alltid det finger som är längst från tyngdpunkten, ' +
            'eftersom det bär mindre normalkraft och därmed mindre friktion. ' +
            'Fingrarna turas om att glida och möts till slut precis under ' +
            'linjalens tyngdpunkt.');
        scene.appendChild(canvas);

        // Fullskärmsknapp — samma ikon som .fs-btn på simuleringssidorna.
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';

        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn ms-primar';
        startBtn.textContent = 'Dra ihop fingrarna';

        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';

        var pausBtn = document.createElement('button');
        pausBtn.type = 'button';
        pausBtn.className = 'minisim-btn';
        pausBtn.textContent = 'Pausa';

        var info = document.createElement('span');
        info.className = 'minisim-info';

        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        controls.appendChild(pausBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        // Rad 2: visningsval.
        var toggles = document.createElement('div');
        toggles.className = 'minisim-controls';
        function makeCheck(text, checked, accent) {
            var lbl = document.createElement('label');
            lbl.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = checked;
            if (accent) cb.style.accentColor = accent;
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(text));
            return { lbl: lbl, cb: cb };
        }
        var nChk = makeCheck('Visa normalkrafterna', true, COL_N);
        var viktChk = makeCheck('Lägg en vikt på linjalen', false, null);
        var tpChk = makeCheck('Visa tyngdpunkten', false, null);
        var slowChk = makeCheck('Ultrarapid', false, null);
        toggles.appendChild(nChk.lbl);
        toggles.appendChild(viktChk.lbl);
        toggles.appendChild(tpChk.lbl);
        toggles.appendChild(slowChk.lbl);
        card.appendChild(toggles);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisims) ────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var mode = 'rest';          // 'rest' | 'kor' | 'klar'
        var x1 = X1_START;          // vänstra fingrets läge (skärm)
        var x2 = X2_START;          // högra fingrets läge (skärm)
        var xr = 0;                 // linjalens förskjutning på skärmen
        var slid = 2;               // vilket finger som GLIDER MOT LINJALEN
        var xw = 380;               // viktens läge (i linjalens system)
        var paused = false;
        var dragging = false;
        var dragPtr = -1;
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        function timeScale() { return slowChk.cb.checked ? 0.25 : 1; }
        function viktPa() { return viktChk.cb.checked; }
        // Tyngdpunktens läge i linjalens system: linjalen (massa 1) + ev.
        // vikten (massa M_VIKT).
        function tyngdX() {
            return viktPa() ? (MID + M_VIKT * xw) / (1 + M_VIKT) : MID;
        }
        // …och på skärmen (linjalen är förskjuten xr).
        function tyngdScreenX() { return tyngdX() + xr; }
        // Normalkrafternas andelar av totala tyngden (momentjämvikt kring
        // motstående finger): fingret NÄRMAST tyngdpunkten bär störst andel.
        function frac1() { return (x2 - tyngdScreenX()) / (x2 - x1); }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        function rr(x, y, w, h, r) {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        }

        function drawLinjal() {
            // träfärgad skollinjal med cm-gradering
            rr(R_X0, R_TOP, R_X1 - R_X0, R_BOT - R_TOP, 3);
            ctx.fillStyle = '#f0e2b8';
            ctx.fill();
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 1.4;
            ctx.stroke();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            for (var cm = 0; cm <= 30; cm++) {
                var x = R_X0 + cm * PX_PER_CM;
                var len = (cm % 5 === 0) ? 9 : 5.5;
                ctx.moveTo(x, R_TOP);
                ctx.lineTo(x, R_TOP + len);
            }
            ctx.stroke();
            ctx.fillStyle = INK;
            ctx.font = '9px ' + FONT;
            ctx.textAlign = 'center';
            for (cm = 5; cm <= 25; cm += 5) {
                ctx.fillText(String(cm), R_X0 + cm * PX_PER_CM, R_BOT - 4);
            }
        }

        function drawVikt() {
            if (!viktPa()) return;
            // mässingsvikt (labbvikt med knopp) stående på linjalen
            rr(xw - 15, R_TOP - 30, 30, 30, 3);
            ctx.fillStyle = '#c8a24a';
            ctx.fill();
            ctx.strokeStyle = '#8a6a2a';
            ctx.lineWidth = 1.4;
            ctx.stroke();
            rr(xw - 5, R_TOP - 39, 10, 9, 2);
            ctx.fillStyle = '#c8a24a';
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle = 'rgba(138,106,42,0.55)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(xw - 11, R_TOP - 24);
            ctx.lineTo(xw + 11, R_TOP - 24);
            ctx.stroke();
        }

        function drawTyngdpunkt() {
            if (!(tpChk.cb.checked || mode === 'klar')) return;
            var xc = tyngdScreenX();    // ritas i skärmkoordinater
            // Etiketten läggs i fri yta: ovanför vikten om den är nära, och
            // ovanför varje normalkraftspil vars spets ligger inom textens
            // bredd (annars hamnar texten på pilen när fingrarna närmar sig).
            var yLbl = R_TOP - 22;
            if (viktPa() && Math.abs(xc - (xw + xr)) < 64) yLbl = R_TOP - 54;
            if (nChk.cb.checked) {
                var tot = (1 + (viktPa() ? M_VIKT : 0)) * N_LEN;
                var f1 = frac1();
                var arms = [[x1, f1 * tot], [x2, (1 - f1) * tot]];
                for (var i = 0; i < 2; i++) {
                    if (Math.abs(arms[i][0] - xc) < 46) {
                        yLbl = Math.min(yLbl, R_BOT - arms[i][1] - 16);
                    }
                }
                yLbl = Math.max(14, yLbl);
            }
            ctx.fillStyle = INK;
            ctx.beginPath();
            ctx.arc(xc, (R_TOP + R_BOT) / 2, 2.8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(xc, R_TOP - 2);
            ctx.lineTo(xc, yLbl + 6);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.font = '13px ' + FONT;
            ctx.textAlign = 'center';
            ctx.fillText('Tyngdpunkt', xc, yLbl);
        }

        // En stiliserad fingertopp sedd rakt framifrån: en platt ellips i
        // hudton vars ovansida trycker mot linjalens undersida — avsiktligt
        // enkel (ingen hel hand), med en mjuk skuggbåge i underkanten och en
        // liten ljusare reflex som ger volym.
        function drawFinger(fx) {
            var rx = FINGER_W / 2, ry = FINGER_H / 2;
            var cy = R_BOT + ry - 1;    // lätt "intryckt" mot linjalen
            ctx.fillStyle = SKIN;
            ctx.strokeStyle = SKIN_D;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.ellipse(fx, cy, rx, ry, 0, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            // skuggbåge i underkanten (volym)
            ctx.strokeStyle = 'rgba(185,138,94,0.45)';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.ellipse(fx, cy - 1, rx - 4.5, ry - 4.5, 0, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.stroke();
            // liten ljus reflex uppe till vänster
            ctx.strokeStyle = 'rgba(255,240,220,0.8)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(fx, cy + 1, rx - 4.5, ry - 4.5, 0, 1.15 * Math.PI, 1.55 * Math.PI);
            ctx.stroke();
        }

        // Rörelsestrimmor bakom det glidande fingret (dir = rörelseriktning).
        function drawStreaks(fx, dir) {
            ctx.strokeStyle = 'rgba(31,37,48,0.30)';
            ctx.lineWidth = 1.6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var k = 0; k < 3; k++) {
                var y = R_BOT + 16 + k * 11;
                var x0 = fx - dir * (20 + k * 4);
                ctx.moveTo(x0, y);
                ctx.lineTo(x0 - dir * (14 - k * 3), y);
            }
            ctx.stroke();
        }

        // "F" med N-subscript (normalkraftens beteckning) intill pilspetsen.
        function drawFN(x, y, align, color) {
            ctx.fillStyle = color;
            ctx.font = 'italic 15px ' + FONT;
            var wF = ctx.measureText('F').width;
            var x0 = align === 'right'
                ? x - wF - 7
                : x;
            ctx.textAlign = 'left';
            ctx.fillText('F', x0, y);
            ctx.font = '10px ' + FONT;
            ctx.fillText('N', x0 + wF, y + 3);
        }

        // Skalenlig normalkraftspil: från kontaktytan (fingertoppen) uppåt
        // genom linjalen, längd ∝ N. side: -1 = etikett åt vänster.
        function drawNormal(x, len, side) {
            len = Math.max(10, len);
            var yTail = R_BOT, yTip = yTail - len;
            var head = Math.max(9, Math.min(14, len * 0.5));
            var yBase = yTip + head;
            ctx.strokeStyle = COL_N;
            ctx.lineWidth = 3;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x, yTail);
            ctx.lineTo(x, yBase);
            ctx.stroke();
            ctx.fillStyle = COL_N;
            ctx.beginPath();
            ctx.moveTo(x, yTip);
            ctx.lineTo(x - 5.5, yBase);
            ctx.lineTo(x + 5.5, yBase);
            ctx.closePath();
            ctx.fill();
            drawFN(x + side * 10, yTip + 12, side < 0 ? 'right' : 'left', COL_N);
        }

        function drawNormals() {
            if (!nChk.cb.checked) return;
            var tot = (1 + (viktPa() ? M_VIKT : 0)) * N_LEN;
            var f1 = frac1();
            drawNormal(x1, f1 * tot, -1);
            drawNormal(x2, (1 - f1) * tot, 1);
        }

        function render() {
            drawBackground();
            drawFinger(x1);
            drawFinger(x2);
            // linjalen (och vikten som står på den) ritas förskjuten xr —
            // den följer med det finger som håller fast
            ctx.save();
            ctx.translate(xr, 0);
            drawLinjal();
            drawVikt();
            ctx.restore();
            drawTyngdpunkt();
            if (mode === 'kor') {
                if (slid === 1) drawStreaks(x1, 1);
                else drawStreaks(x2, -1);
            }
            drawNormals();
        }

        // ── Simulationssteg (stick–slip) ──────────────────────────────────
        // BÅDA fingrarna förs mot mitten med farten V_FINGER — som när man
        // gör försöket själv. Linjalen följer med det finger som håller fast
        // (störst normalkraft → friktionen räcker), medan det andra fingret
        // GLIDER mot linjalen. Glidande finger byts när dess glidfriktion
        // hunnit ikapp det fastnande fingrets vilofriktion:
        // μk·N_glid ≥ μs·N_fast.
        function step(dt) {
            if (mode !== 'kor') return;
            var f1 = frac1(), f2 = 1 - f1;
            if (slid === 1 && MU_K * f1 >= MU_S * f2) slid = 2;
            else if (slid === 2 && MU_K * f2 >= MU_S * f1) slid = 1;
            x1 += V_FINGER * dt;
            x2 -= V_FINGER * dt;
            // linjalen åker med det FASTNANDE fingret (motsatt det glidande)
            xr += (slid === 1 ? -1 : 1) * V_FINGER * dt;
            xr = Math.max(4 - R_X0, Math.min(W - 4 - R_X1, xr));
            if (x2 - x1 <= MEET_GAP) {
                var mitt = (x1 + x2) / 2;
                x1 = mitt - MEET_GAP / 2;
                x2 = mitt + MEET_GAP / 2;
                // tyngdpunkten hamnar exakt mitt emellan fingrarna
                xr = mitt - tyngdX();
                mode = 'klar';
                syncUi();
            }
        }

        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }

        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return mode === 'kor';
        }

        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        function updateInfo() {
            if (mode === 'kor') {
                info.textContent = slid === 1 ? 'Vänster finger glider'
                                              : 'Höger finger glider';
            } else if (mode === 'klar') {
                info.textContent = 'Tyngdpunkten hittad!';
            } else {
                info.textContent = 'Fingrarna står stilla';
            }
        }

        // ── UI-logik ──────────────────────────────────────────────────────
        function syncUi() {
            pausBtn.textContent = paused ? 'Fortsätt' : 'Pausa';
            pausBtn.disabled = mode !== 'kor';
            startBtn.disabled = mode !== 'rest';
            omBtn.disabled = mode === 'rest';
        }

        function reset() {
            mode = 'rest';
            x1 = X1_START;
            x2 = X2_START;
            xr = 0;
            paused = false;
            syncUi();
            render();
            updateInfo();
        }

        startBtn.addEventListener('click', function () {
            if (mode !== 'rest') return;
            // fingret längst från tyngdpunkten (minst normalkraft och därmed
            // minst friktion) börjar glida
            slid = frac1() < 0.5 ? 1 : 2;
            mode = 'kor';
            paused = false;
            syncUi();
            kick();
        });
        omBtn.addEventListener('click', reset);
        pausBtn.addEventListener('click', function () {
            paused = !paused;
            syncUi();
            if (!paused) kick();
            else render();
        });
        nChk.cb.addEventListener('change', render);
        tpChk.cb.addEventListener('change', render);
        slowChk.cb.addEventListener('change', kick);
        // Att lägga på/ta av vikten flyttar tyngdpunkten — börja om från
        // startläget så att fingrarna säkert står på var sin sida om den.
        viktChk.cb.addEventListener('change', reset);

        // ── Dra vikten längs linjalen (pekare/touch/mus) ──────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function overVikt(p) {
            // vikten står på linjalen och ritas förskjuten xr
            return viktPa() && Math.abs(p.x - (xw + xr)) < 22 &&
                   p.y > R_TOP - 48 && p.y < R_BOT;
        }
        function clampVikt(x) {
            // x i linjalens system
            var lo = R_X0 + 16, hi = R_X1 - 16;
            if (mode === 'kor') {
                // tyngdpunkten måste stanna mellan fingrarna (skärm → linjal)
                lo = Math.max(lo, ((1 + M_VIKT) * (x1 + 12 - xr) - MID) / M_VIKT);
                hi = Math.min(hi, ((1 + M_VIKT) * (x2 - 12 - xr) - MID) / M_VIKT);
            }
            return Math.max(lo, Math.min(hi, x));
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overVikt(p)) return;
            e.preventDefault();
            if (mode === 'klar') reset();   // flyttad vikt = nytt försök
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overVikt(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            xw = clampVikt(p.x - xr);
            if (!running) { render(); updateInfo(); }
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'default';
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag för skärmdumpsskript: frys ett läge mitt i förloppet.
        card._setLage = function (nx1, nx2, nslid, nxr) {
            x1 = nx1;
            x2 = nx2;
            slid = nslid;
            xr = nxr || 0;
            mode = 'kor';
            paused = true;
            syncUi();
            render();
            updateInfo();
        };

        syncUi();
        render();
        updateInfo();
    }

    // ── typ: linjaltrio ─────────────────────────────────────────────────
    // (dokumenterad i filhuvudet)
    function buildLinjaltrio(node, cfg) {
        var W = 660, H = 300;              // logisk ritstorlek (tre paneler)
        var PW = W / 3;                    // panelbredd — tredjedelar, så att
                                           // panelerna hamnar rakt under
                                           // kulfigurens tre paneler i teorin
        var GROUND_Y = 252;                // gemensam marklinje
        var RL = 150, RW = 16;             // linjalens längd och bredd
        var GPX = 1500;                    // "g" i px/s² (som valtning)
        var RAD = Math.PI / 180;
        var INK = '#1f2530';

        // Pendelkonstant för en stav spikad nära ena änden:
        // alfa = -(g·d/(L²/12 + d²))·sin(theta), d = spik → tyngdpunkt.
        var D_END = RL / 2 - 10;           // spiken sitter 10 px från änden
        var K_END = GPX * D_END / (RL * RL / 12 + D_END * D_END);   // ≈ 16 s⁻²

        // De tre linjalerna. vil = riktningen i viloläget (enhetsvektor som
        // vinkel), fran/till = linjalens utsträckning längs riktningen
        // räknat från spiken (positivt = åt vilo-riktningens håll).
        var PANELS = [
            { namn: 'stabil', pivot: { x: PW * 0.5, y: 48 },
              fran: -10, till: RL - 10, typ: 'Stabil', etikett: 'Spikad i överkant' },
            { namn: 'labil', pivot: { x: PW * 1.5, y: 176 },
              fran: -10, till: RL - 10, typ: 'Labil', etikett: 'Spikad i nederkant' },
            { namn: 'indifferent', pivot: { x: PW * 2.5, y: 150 },
              fran: -RL / 2, till: RL / 2, typ: 'Indifferent', etikett: 'Spikad i tyngdpunkten' }
        ];
        // Den labila linjalen sitter spikad en bit ovanför marken och
        // stannar när dess ÄNDE slår i marklinjen. Stoppvinkeln löses ur
        // -till·cos(phi) + (RW/2)·|sin(phi)| = pivothöjden över marken,
        // så att även linjalens nedre hörn vilar precis på linjen.
        var PHI_STOP = (function () {
            var h = GROUND_Y - PANELS[1].pivot.y, till = RL - 10;
            var phi = Math.PI / 2;
            while (phi < Math.PI &&
                   -till * Math.cos(phi) + (RW / 2) * Math.abs(Math.sin(phi)) < h) {
                phi += 0.001;
            }
            return phi;                    // ≈ 2,18 rad (≈ 125°)
        })();

        // Vinkeln th mäts från VILOLÄGET: stabil hänger rakt ned (0 = ned),
        // labil står rakt upp (0 = upp), indifferent börjar stående (0 = upp
        // men utan betydelse — spiken går genom tyngdpunkten).
        // ang() räknar om till skärmvinkel: åt vilket håll "till"-änden pekar.
        function restDir(i) { return i === 0 ? Math.PI / 2 : -Math.PI / 2; }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'Tre likadana linjaler är uppspikade på tre olika sätt. Den ' +
            'vänstra hänger i en spik genom överkanten: dras den åt sidan ' +
            'gungar den tillbaka och stannar i sitt utgångsläge. Den ' +
            'mittersta är uppspikad genom nederkanten en bit ovanför marken: ' +
            'vid minsta lilla vinkel välter den tills änden slår i marken. ' +
            'Den högra har spiken rakt ' +
            'genom tyngdpunkten: den snurrar som en propeller när man drar ' +
            'i den och blir kvar i det läge där den stannar.');
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn ms-primar';
        omBtn.textContent = 'Ställ upp linjalerna igen';
        var info = document.createElement('span');
        info.className = 'minisim-info';
        info.textContent = 'Dra i en linjal och släpp, eller ge den högra en knuff.';
        controls.appendChild(omBtn);
        controls.appendChild(info);
        card.appendChild(controls);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisims) ────────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        // th[i] = vinkel från viloläget (rad), om[i] = vinkelhastighet.
        var th = [0, 0, 0];
        var om = [0, 0, 0];
        var lying = false;                 // den labila ligger på marken
        var dragging = -1;                 // panelindex som dras, annars −1
        var dragPtr = -1;
        var grabOfs = 0;
        var lastDrag = null;               // { t, th } för att skatta fart
        var dragVel = 0;
        var running = false;
        var visible = true;
        var lastTs = 0;
        var rafId = 0;

        // ── Fysik ─────────────────────────────────────────────────────────
        function step(dt) {
            // Stabil: dämpad pendel som gungar tillbaka till utgångsläget.
            if (dragging !== 0) {
                var a0 = -K_END * Math.sin(th[0]) - 1.4 * om[0];
                om[0] += a0 * dt;
                th[0] += om[0] * dt;
                if (Math.abs(th[0]) < 0.02 && Math.abs(om[0]) < 0.06) {
                    th[0] = 0;
                    om[0] = 0;
                }
            }
            // Labil: samma pendel fast UPPOCHNED — varje avvikelse växer.
            if (dragging !== 1 && !(lying && Math.abs(om[1]) < 0.001)) {
                var a1 = K_END * Math.sin(th[1]) - 0.15 * om[1];
                om[1] += a1 * dt;
                th[1] += om[1] * dt;
                var lim = PHI_STOP;        // änden slår i marken
                if (th[1] >= lim || th[1] <= -lim) {
                    th[1] = th[1] > 0 ? lim : -lim;
                    if (Math.abs(om[1]) > 0.5) {
                        om[1] = -0.22 * om[1];     // liten studs
                    } else {
                        om[1] = 0;
                        lying = true;
                    }
                }
            }
            // Indifferent: fri rotation kring tyngdpunkten, mild friktion i
            // spikhålet — propellern snurrar av sig och BLIR KVAR där den
            // stannar (inget läge är bättre än något annat).
            if (dragging !== 2) {
                om[2] -= 0.6 * om[2] * dt;
                th[2] += om[2] * dt;
                if (Math.abs(om[2]) < 0.05) om[2] = 0;
            }
        }

        function somnat() {
            return th[0] === 0 && om[0] === 0 &&
                   om[1] === 0 && (lying || th[1] === 0) &&
                   om[2] === 0 && dragging < 0;
        }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
            // marklinje med snedstreck (bara mittpanelen behöver marken,
            // men en genomgående linje håller ihop scenen)
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(14, GROUND_Y);
            ctx.lineTo(W - 14, GROUND_Y);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(31,37,48,0.45)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            for (var gx = 24; gx < W - 14; gx += 20) {
                ctx.moveTo(gx, GROUND_Y + 1);
                ctx.lineTo(gx - 8, GROUND_Y + 9);
            }
            ctx.stroke();
        }

        function drawRuler(i) {
            var P = PANELS[i];
            ctx.save();
            ctx.translate(P.pivot.x, P.pivot.y);
            ctx.rotate(th[i]);
            // lokalt system: viloriktningen är inbakad i rektangeln (nedåt
            // för den hängande, uppåt för de andra), så rotationen är alltid
            // bara vinkeln från viloläget
            var ned = restDir(i) === Math.PI / 2;
            var y0 = ned ? P.fran : -P.till;
            var y1 = ned ? P.till : -P.fran;
            ctx.beginPath();
            var r = 3;
            ctx.moveTo(-RW / 2 + r, y0);
            ctx.arcTo(RW / 2, y0, RW / 2, y1, r);
            ctx.arcTo(RW / 2, y1, -RW / 2, y1, r);
            ctx.arcTo(-RW / 2, y1, -RW / 2, y0, r);
            ctx.arcTo(-RW / 2, y0, RW / 2, y0, r);
            ctx.closePath();
            ctx.fillStyle = '#f0e2b8';
            ctx.fill();
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 1.4;
            ctx.stroke();
            // cm-gradering längs ena kanten (30 cm på 150 px)
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            for (var cm = 0; cm <= 30; cm++) {
                var yy = y0 + cm * (RL / 30);
                if (yy < y0 || yy > y1) continue;
                var len = (cm % 5 === 0) ? 7 : 4;
                ctx.moveTo(-RW / 2, yy);
                ctx.lineTo(-RW / 2 + len, yy);
            }
            ctx.stroke();
            ctx.restore();
            // spiken (stålgrå med mörk kant), ovanpå linjalen
            ctx.beginPath();
            ctx.arc(P.pivot.x, P.pivot.y, 4.4, 0, 2 * Math.PI);
            ctx.fillStyle = '#9aa2ad';
            ctx.fill();
            ctx.strokeStyle = '#3d434d';
            ctx.lineWidth = 1.3;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(P.pivot.x - 1.2, P.pivot.y - 1.2, 1.2, 0, 2 * Math.PI);
            ctx.fillStyle = '#e8ebef';
            ctx.fill();
        }

        function render() {
            drawBackground();
            for (var i = 0; i < 3; i++) drawRuler(i);
            // etiketter under marklinjen, en per panel. Canvasen skalas ned
            // rejält på mobil, så teckenstorleken räknas upp mot en ungefär
            // konstant skärmstorlek — men aldrig så att texten spränger
            // sin panel.
            ctx.fillStyle = INK;
            ctx.textAlign = 'center';
            var kf = Math.max(1, Math.min(1.8, W / (canvas.clientWidth || W)));
            // jämviktstypen ovanför respektive linjal
            ctx.font = '600 ' + (14 * kf) + 'px ' + FONT;
            for (i = 0; i < 3; i++) {
                ctx.fillText(PANELS[i].typ, PW * (i + 0.5), 24);
            }
            for (i = 0; i < 3; i++) {
                var fs = 13 * kf;
                ctx.font = fs + 'px ' + FONT;
                var b = ctx.measureText(PANELS[i].etikett).width;
                if (b > PW - 18) {
                    fs = fs * (PW - 18) / b;
                    ctx.font = fs + 'px ' + FONT;
                }
                ctx.fillText(PANELS[i].etikett, PW * (i + 0.5), H - 14);
            }
        }

        // ── Pekare: dra i en linjal, släpp — eller knuffa propellern ──────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) / r.width * W,
                     y: (e.clientY - r.top) / r.height * H };
        }
        // avstånd från punkt till linjalens mittlinje (i skärmläge);
        // linjalens "till"-ände pekar åt skärmvinkeln restDir + th
        function distToRuler(p, i) {
            var P = PANELS[i];
            var a = restDir(i) + th[i];
            var ux = Math.cos(a), uy = Math.sin(a);
            var rx = p.x - P.pivot.x, ry = p.y - P.pivot.y;
            var s = rx * ux + ry * uy;                   // längs linjalen
            s = Math.max(P.fran, Math.min(P.till, s));
            var qx = P.pivot.x + ux * s, qy = P.pivot.y + uy * s;
            return { d: Math.hypot(p.x - qx, p.y - qy), s: s };
        }
        function pointerTheta(p, i) {
            var P = PANELS[i];
            var a = Math.atan2(p.y - P.pivot.y, p.x - P.pivot.x);
            var d = a - restDir(i);
            while (d > Math.PI) d -= 2 * Math.PI;
            while (d < -Math.PI) d += 2 * Math.PI;
            return d;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            var i = Math.max(0, Math.min(2, Math.floor(p.x / PW)));
            var hit = distToRuler(p, i);
            if (hit.d > 30 || Math.abs(hit.s) < 14) return;   // inte på linjalen (eller för nära spiken)
            e.preventDefault();
            dragging = i;
            dragPtr = e.pointerId;
            grabOfs = pointerTheta(p, i) - th[i];
            om[i] = 0;
            dragVel = 0;
            lastDrag = { t: performance.now(), th: th[i] };
            if (i === 1) lying = false;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            kick();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (dragging < 0) {
                var over = false;
                for (var i = 0; i < 3; i++) {
                    var h = distToRuler(p, i);
                    if (h.d <= 30 && Math.abs(h.s) >= 14) { over = true; break; }
                }
                canvas.style.cursor = over ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            var j = dragging;
            var ny = pointerTheta(p, j) - grabOfs;
            while (ny - th[j] > Math.PI) ny -= 2 * Math.PI;
            while (ny - th[j] < -Math.PI) ny += 2 * Math.PI;
            if (j === 0) ny = Math.max(-2.4, Math.min(2.4, ny));
            if (j === 1) ny = Math.max(-PHI_STOP, Math.min(PHI_STOP, ny));
            var now = performance.now();
            if (lastDrag && now > lastDrag.t) {
                dragVel = 0.6 * dragVel +
                          0.4 * (ny - th[j]) / ((now - lastDrag.t) / 1000);
            }
            lastDrag = { t: now, th: ny };
            th[j] = ny;
            if (!running) render();
        });
        function endDrag(e) {
            if (dragging < 0 || e.pointerId !== dragPtr) return;
            var j = dragging;
            dragging = -1;
            dragPtr = -1;
            canvas.style.cursor = 'default';
            // släppfart: propellern (och pendeln) får med sig knuffen
            om[j] = Math.max(-14, Math.min(14, dragVel));
            if (j === 1) lying = Math.abs(th[1]) >= PHI_STOP - 0.001 && om[1] === 0;
            kick();
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        omBtn.addEventListener('click', function () {
            th = [0, 0, 0];
            om = [0, 0, 0];
            lying = false;
            dragging = -1;
            render();
            kick();
        });

        // ── Loop ──────────────────────────────────────────────────────────
        function shouldRun() {
            if (!visible || document.hidden) return false;
            return !somnat();
        }
        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045);
            step(dt);
            render();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }
        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag för skärmdumps-/verifieringsskript.
        card._trio = {
            get: function () { return { th: th.slice(), om: om.slice(), lying: lying, philim: PHI_STOP, dragging: dragging, running: running, visible: visible, rafId: rafId }; },
            set: function (i, vinkelDeg, fart) {
                th[i] = vinkelDeg * RAD;
                om[i] = fart || 0;
                if (i === 1) lying = Math.abs(th[1]) >= PHI_STOP - 0.001 && !fart;
                render();
                kick();
            }
        };

        render();
    }

    // ── typ: fodelsedag ───────────────────────────────────────────────────
    // Fördjupningen i ma1c-5.8 (Komplementhändelse): sannolikheten att minst
    // två personer i en grupp delar födelsedag, som funktion av gruppens
    // storlek. Eleven drar den röda punkten längs kurvan (eller använder
    // glidaren) och läser av P för varje gruppstorlek — poängen är att se
    // hur brant kurvan stiger och att 50 % passeras redan vid 23 personer.
    //
    // Kryssrutan "Jämför med DIN födelsedag" lägger in kurvan
    // 1 − (364/365)^(n−1), alltså sannolikheten att någon delar just din dag.
    // Skillnaden mellan de två kurvorna ÄR förklaringen till paradoxen: den
    // blå räknar alla n(n−1)/2 par, den orange bara de n−1 par du själv
    // ingår i.
    //
    // Ritad i laboranstemat, men med grafens EGET rutnät (var 10:e person,
    // var 25:e procent) i stället för kollegieblocksrutorna — två rutnät
    // ovanpå varandra gör en graf oläslig. Ingen rAF-loop i viloläge: allt
    // ritas om vid interaktion, och tweenen när man hoppar till 23 personer
    // stänger av sig själv när den är framme.
    function buildFodelsedag(node, cfg) {
        // Till skillnad från de andra minisimuleringarna ritas den här i
        // CSS-PIXLAR i stället för en fast 560×430-rymd. Skälet är texten:
        // inne i en ::: fördjupning-ruta får widgeten bara ~250 px på en
        // telefon, och en fast rymd hade krympt varje etikett med faktor 0,45
        // (en 15 px-siffra blir 7 px — oläsbar). Nu är 1 ritenhet = 1 CSS-px,
        // så avläsningen är lika stor på mobilen som på datorn.
        //
        // PAD_T håller y-skalans översta tal och y-etiketten UNDER
        // fullskärmsknappen, som äger scenens övre vänstra hörn (40 px på
        // 8,8 — husregel). Knappen är lika stor i CSS-px på alla skärmar,
        // vilket är just därför toppmarginalen måste mätas i CSS-px.
        var PAD_L = 40, PAD_R = 18, PAD_T = 62, PAD_B = 48;
        var W = 560, H = 430;                      // sätts av layout()
        var PX0 = PAD_L, PX1 = W - PAD_R;          // x för n = 0 … n = NMAX
        var PY0 = H - PAD_B, PY1 = PAD_T;          // y för 0 % … 100 %
        var NMAX = 70;
        var INK = '#1f2530', INK_SOFT = '#5a6270';
        var GRID = 'rgba(96,130,175,0.28)';
        var BLUE = '#2563c9', RED = '#c8324a', GREEN = '#4a7d3a', ORANGE = '#b8531f';

        // Sannolikheten att minst två av n personer delar födelsedag —
        // komplementhändelsen, precis som i genomgången:
        // 1 − 365/365 · 364/365 · … · (365−n+1)/365
        function pDela(n) {
            var q = 1;
            for (var k = 0; k < n; k++) q *= (365 - k) / 365;
            return 1 - q;
        }
        // Sannolikheten att någon av de övriga delar DIN födelsedag.
        function pDin(n) { return n < 2 ? 0 : 1 - Math.pow(364 / 365, n - 1); }
        function antalPar(n) { return n * (n - 1) / 2; }

        function X(n) { return PX0 + n / NMAX * (PX1 - PX0); }
        function Y(p) { return PY0 - p * (PY0 - PY1); }   // p som andel 0–1

        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        // Draget är rent vågrätt: pan-y låter fingret fortfarande scrolla
        // sidan i höjdled, medan vågräta rörelser når vår pointer-hantering
        // i stället för att ätas av webbläsarens egen panorering.
        canvas.style.touchAction = 'pan-y';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'Graf över sannolikheten att minst två personer i en grupp delar ' +
            'födelsedag, som funktion av antalet personer. Kurvan stiger brant, ' +
            'passerar 50 procent vid 23 personer och närmar sig 100 procent runt ' +
            '60 personer. Dra den röda punkten längs kurvan för att läsa av ' +
            'sannolikheten vid andra gruppstorlekar.');
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        // Rad 1: glidaren (samma värde som punkten — ger tangentbordsstyrning).
        var srow = document.createElement('div');
        srow.className = 'minisim-slider-row';
        var slbl = document.createElement('span');
        slbl.className = 'minisim-slider-lbl';
        slbl.textContent = 'Antal personer';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '1';
        slider.max = String(NMAX);
        slider.step = '1';
        slider.value = '23';
        slider.setAttribute('aria-label', 'Antal personer i gruppen');
        var sval = document.createElement('span');
        sval.className = 'minisim-slider-val';
        srow.appendChild(slbl);
        srow.appendChild(slider);
        srow.appendChild(sval);
        card.appendChild(srow);

        // Rad 2: snabbval + jämförelsekurva + kommentar.
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var btn23 = document.createElement('button');
        btn23.type = 'button';
        btn23.className = 'minisim-btn ms-primar';
        btn23.textContent = 'Visa 23 personer';
        var dinLbl = document.createElement('label');
        dinLbl.className = 'minisim-check';
        var dinCb = document.createElement('input');
        dinCb.type = 'checkbox';
        dinCb.style.accentColor = ORANGE;
        dinLbl.appendChild(dinCb);
        dinLbl.appendChild(document.createTextNode('Jämför med DIN födelsedag'));
        var info = document.createElement('span');
        info.className = 'minisim-info';
        // Avläsningen i klartext: enda vägen in för en skärmläsare (canvas
        // är bara en bild), och på smal skärm den enda avläsningen som visas.
        info.setAttribute('aria-live', 'polite');
        info.style.whiteSpace = 'normal';
        controls.appendChild(btn23);
        controls.appendChild(dinLbl);
        controls.appendChild(info);
        card.appendChild(controls);
        node.appendChild(card);

        var ctx = canvas.getContext('2d');
        // Ritrymden följer elementets faktiska bredd. På en smal skärm görs
        // grafen dessutom STÅENDE — annars blir plotytan bara ett par
        // centimeter hög när fullskärmsknappens toppmarginal och x-axelns
        // etiketter tagit sitt.
        function smal() { return W < 430; }
        function layout() {
            var cssW = Math.round(canvas.clientWidth || 560);
            W = Math.max(240, Math.min(760, cssW || 560));
            var kvot = W < 400 ? 1.3 : (W < 480 ? 1.0 : 430 / 560);
            H = Math.round(W * kvot);
            PX0 = PAD_L;
            PX1 = W - PAD_R;
            PY0 = H - PAD_B;
            PY1 = PAD_T;
            // Trångt: glidarens egen etikett får stryka på foten (raden
            // säger ändå "st"), och avläsningsraden lägger sig på egen rad
            // i stället för att klippas i högerkanten.
            slbl.style.display = smal() ? 'none' : '';
            info.style.marginLeft = smal() ? '0' : 'auto';
            info.style.flexBasis = smal() ? '100%' : '';
        }
        function resizeCanvas() {
            layout();
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var n = 23;              // vald gruppstorlek (heltal — diskret storhet)
        var animFrom = 23, animTo = 23, animT = 1, rafId = 0;
        var dragging = false, dragPtr = -1;

        // ── Rendering ─────────────────────────────────────────────────────
        function drawPaper() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }

        function drawGrid() {
            ctx.strokeStyle = GRID;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var k = 10; k <= NMAX; k += 10) {
                ctx.moveTo(Math.round(X(k)) + 0.5, PY1 - 4);
                ctx.lineTo(Math.round(X(k)) + 0.5, PY0);
            }
            for (var p = 0.25; p <= 1.0001; p += 0.25) {
                ctx.moveTo(PX0, Math.round(Y(p)) + 0.5);
                ctx.lineTo(PX1 + 4, Math.round(Y(p)) + 0.5);
            }
            ctx.stroke();
        }

        // Axlar med pilspets BARA åt det positiva hållet (husregel).
        function drawAxes() {
            ctx.strokeStyle = INK;
            ctx.fillStyle = INK;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(PX0 - 8, PY0);
            ctx.lineTo(PX1 + 14, PY0);
            ctx.moveTo(PX0, PY0 + 8);
            ctx.lineTo(PX0, PY1 - 16);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(PX1 + 22, PY0);
            ctx.lineTo(PX1 + 12, PY0 - 4.5);
            ctx.lineTo(PX1 + 12, PY0 + 4.5);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(PX0, PY1 - 24);
            ctx.lineTo(PX0 - 4.5, PY1 - 14);
            ctx.lineTo(PX0 + 4.5, PY1 - 14);
            ctx.closePath();
            ctx.fill();

            ctx.font = '12px ' + FONT;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            // Var tionde person ryms inte i sidled på en telefon.
            var steg = W < 400 ? 20 : 10;
            for (var k = steg; k <= NMAX; k += steg) ctx.fillText(String(k), X(k), PY0 + 8);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            for (var p = 0.25; p <= 1.0001; p += 0.25) {
                ctx.fillText(String(Math.round(p * 100)), PX0 - 7, Y(p));
            }
            ctx.textAlign = 'right';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText('antal personer', PX1 + 18, PY0 + 40);
            // y-etikett: variabeln P kursiv, resten rakt (husets typografi).
            // x = PX0 + 18 håller rubriken till höger om fullskärmsknappen.
            // På smal skärm kortas svansen — den långa varianten skulle
            // annars skjuta ut genom högerkanten.
            var kursiv = 'italic 13px ' + FONT, rakt = '13px ' + FONT;
            var svans = W < 430 ? ' (%)' : '(minst två delar) (%)';
            ctx.textAlign = 'left';
            ctx.font = kursiv;
            ctx.fillText('P', PX0 + 18, PY1 - 18);
            var wP = ctx.measureText('P').width;
            ctx.font = rakt;
            ctx.fillText(svans, PX0 + 18 + wP + 1, PY1 - 18);
        }

        function drawHalvlinje() {
            ctx.save();
            ctx.strokeStyle = GREEN;
            ctx.lineWidth = 1.6;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(PX0, Y(0.5));
            ctx.lineTo(PX1 + 4, Y(0.5));
            ctx.stroke();
            ctx.restore();
            ctx.fillStyle = GREEN;
            ctx.font = '12px ' + FONT;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            ctx.fillText('50 %', PX1 + 2, Y(0.5) + 6);
        }

        function drawKurva(fn, color, bredd) {
            ctx.strokeStyle = color;
            ctx.lineWidth = bredd;
            ctx.lineJoin = 'round';
            ctx.beginPath();
            for (var k = 0; k <= NMAX; k++) {
                var x = X(k), y = Y(fn(k));
                if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        function drawPunkt(nv, fn, color, stor) {
            var x = X(nv), y = Y(fn(nv));
            ctx.save();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(x, PY0);
            ctx.lineTo(x, y);
            ctx.moveTo(PX0, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.restore();
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, stor ? 6.5 : 4.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Avläsningen ligger i scenens övre vänstra del — ytan över kurvan
        // där till vänster är alltid fri, oavsett var punkten står. Ren text
        // på pappret: ingen ruta och ingen halo (husregel för ljus botten).
        // Bara på bred skärm: där är ytan över kurvan uppe till vänster
        // säkert fri. På en smal, stående graf skär kurvan rakt igenom den —
        // då står avläsningen i klartext under scenen i stället.
        function drawAvlasning(nv) {
            if (smal()) return;
            var x = PX0 + 12, y = PY1 + 15;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = INK;
            ctx.font = '600 14px ' + FONT;
            ctx.fillText(nv + (nv === 1 ? ' person' : ' personer'), x, y);
            ctx.fillStyle = BLUE;
            ctx.font = '600 18px ' + FONT;
            ctx.fillText(fmt(pDela(nv) * 100, 1) + ' %', x, y + 24);
            ctx.fillStyle = INK_SOFT;
            ctx.font = '12px ' + FONT;
            var par = antalPar(nv);
            ctx.fillText(par + (par === 1 ? ' möjligt par' : ' möjliga par'), x, y + 44);
            if (dinCb.checked) {
                ctx.fillStyle = ORANGE;
                ctx.font = '600 13px ' + FONT;
                ctx.fillText('din dag: ' + fmt(pDin(nv) * 100, 1) + ' %', x, y + 64);
            }
        }

        function visadN() {
            if (animT >= 1) return n;
            var e = 1 - Math.pow(1 - animT, 3);     // mjuk inbromsning
            return Math.round(animFrom + (animTo - animFrom) * e);
        }

        function render() {
            var nv = visadN();
            drawPaper();
            drawGrid();
            drawHalvlinje();
            drawAxes();
            if (dinCb.checked) drawKurva(pDin, ORANGE, 2);
            drawKurva(pDela, BLUE, 2.6);
            if (dinCb.checked) drawPunkt(nv, pDin, ORANGE, false);
            drawPunkt(nv, pDela, RED, true);
            drawAvlasning(nv);
        }

        function updateUi() {
            var nv = visadN();
            sval.textContent = nv + ' st';
            var par = antalPar(nv);
            info.textContent = nv + (nv === 1 ? ' person · ' : ' personer · ') +
                fmt(pDela(nv) * 100, 1) + ' % · ' +
                par + (par === 1 ? ' möjligt par' : ' möjliga par') +
                (dinCb.checked ? ' · din dag: ' + fmt(pDin(nv) * 100, 1) + ' %' : '');
        }

        function draw() { render(); updateUi(); }

        // ── Tween till ett valt antal (knappen) ───────────────────────────
        function frame() {
            rafId = 0;
            animT = Math.min(1, animT + 0.055);
            draw();
            if (animT < 1) rafId = requestAnimationFrame(frame);
        }
        function animeraTill(mal) {
            animFrom = visadN();
            animTo = mal;
            n = mal;
            slider.value = String(mal);
            animT = animFrom === animTo ? 1 : 0;
            if (!rafId) rafId = requestAnimationFrame(frame);
        }
        function sattN(nyN) {
            nyN = Math.max(1, Math.min(NMAX, Math.round(nyN)));
            if (nyN === n && animT >= 1) return;
            n = nyN;
            animT = 1;
            if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
            slider.value = String(n);
            draw();
        }

        slider.addEventListener('input', function () { sattN(parseInt(slider.value, 10)); });
        btn23.addEventListener('click', function () { animeraTill(23); });
        dinCb.addEventListener('change', draw);

        // ── Dra punkten (pekare/touch/mus) ────────────────────────────────
        // Hela ritytan tar emot draget, inte bara den lilla pricken — på en
        // telefon är punkten annars nästan omöjlig att träffa.
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function iPlot(p) {
            return p.x > PX0 - 16 && p.x < PX1 + 16 && p.y > PY1 - 20 && p.y < PY0 + 16;
        }
        function nAvX(x) { return (x - PX0) / (PX1 - PX0) * NMAX; }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!iPlot(p)) return;
            e.preventDefault();
            dragging = true;
            dragPtr = e.pointerId;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            sattN(nAvX(p.x));
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = iPlot(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            sattN(nAvX(p.x));
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            canvas.style.cursor = 'grab';
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            draw();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () { resizeCanvas(); draw(); });

        // Test-handtag för skärmdumpsskript.
        card._setN = function (v) { sattN(v); };

        draw();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: talmangder
    // ══════════════════════════════════════════════════════════════════════
    var tmRaknare = 0;
    function buildTalmangder(node, cfg) {
        tmRaknare++;
        var gridId = 'ms-tm-grid-' + tmRaknare;

        // Samma geometri som den gamla statiska figuren i ma1c-1.1.
        // Ordningen yttre → inre: regionerna ritas i den ordningen så att
        // de inre ringarna hamnar överst i träffytan (evenodd-hålet i en
        // ring släpper igenom pekaren till ringen under).
        var SETS = [
            { id: 'R', sym: 'ℝ', symX: 40, symY: 132, symSize: 17,
              e: [225, 120, 218, 113], inre: [255, 126, 165, 84],
              farg: '#7b52c4', namn: 'Reella tal',
              aria: 'Reella tal, R. Klicka för fler exempel.',
              besk: 'Alla tal som finns på tallinjen. Här ingår även de ' +
                    'irrationella talen — tal som inte kan skrivas som bråk ' +
                    'och vars decimalutveckling är oändlig utan att upprepa sig.',
              ring: 'I den yttersta ringen ligger tal som är reella men inte ' +
                    'rationella: π, √3, √2 och −π.',
              kedja: 'ℝ rymmer alla de andra talmängderna: ℚ, ℤ och ℕ.',
              extra: [{ t: '√2', x: 80, y: 120 }, { t: '−π', x: 150, y: 40 }] },
            { id: 'Q', sym: 'ℚ', symX: 118, symY: 136, symSize: 16,
              e: [255, 126, 165, 84], inre: [290, 130, 112, 60],
              farg: '#2563c9', namn: 'Rationella tal',
              aria: 'Rationella tal, Q. Klicka för fler exempel.',
              besk: 'Alla tal som kan skrivas som ett bråk — en kvot av två ' +
                    'heltal. Även tal med ändligt antal decimaler, som 0,25, ' +
                    'är rationella.',
              ring: 'Mellan ℚ och ℤ ligger rationella tal som inte är heltal: ' +
                    '<sup>2</sup>⁄<sub>3</sub>, −<sup>5</sup>⁄<sub>9</sub>, ' +
                    '0,25 och −1,5.',
              kedja: 'Alla heltal och naturliga tal är också rationella.',
              extra: [{ t: '0,25', x: 168, y: 130 }, { t: '−1,5', x: 240, y: 58 }] },
            { id: 'Z', sym: 'ℤ', symX: 202, symY: 140, symSize: 15,
              e: [290, 130, 112, 60], inre: [322, 133, 62, 38],
              farg: '#1f7a4d', namn: 'Heltal',
              aria: 'Heltal, Z. Klicka för fler exempel.',
              besk: 'Samtliga heltal — de negativa, nollan och de positiva.',
              ring: 'Mellan ℤ och ℕ ligger de negativa heltalen: −2, −7, ' +
                    '−11 och −573.',
              kedja: 'Alla naturliga tal är också heltal, och varje heltal ' +
                     'är i sin tur rationellt och reellt.',
              extra: [{ t: '−7', x: 300, y: 86 }, { t: '−573', x: 300, y: 185 }] },
            { id: 'N', sym: 'ℕ', symX: 273, symY: 142, symSize: 14,
              e: [322, 133, 62, 38], inre: null,
              farg: '#c0392b', namn: 'Naturliga tal',
              aria: 'Naturliga tal, N. Klicka för fler exempel.',
              besk: 'Alla icke-negativa heltal: 0, 1, 2, 3 … och så vidare.',
              ring: 'I den innersta ringen ser du de naturliga talen 0, 2, ' +
                    '6, 9 och 31.',
              kedja: 'Varje naturligt tal är också ett heltal (ℤ), ett ' +
                     'rationellt tal (ℚ) och ett reellt tal (ℝ).',
              extra: [{ t: '0', x: 302, y: 148 }, { t: '31', x: 338, y: 114 }] }
        ];

        // En ellips som sluten path-subbana (för evenodd-ringar).
        function ellipsPath(e) {
            var cx = e[0], cy = e[1], rx = e[2], ry = e[3];
            return 'M ' + (cx - rx) + ' ' + cy +
                   ' a ' + rx + ' ' + ry + ' 0 1 0 ' + (2 * rx) + ' 0' +
                   ' a ' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0 Z';
        }

        var svgDelar = [];
        svgDelar.push(
            '<svg class="ms-tm-svg" viewBox="5 5 442 232" ' +
            'xmlns="http://www.w3.org/2000/svg" ' +
            'font-family="Poppins, system-ui, sans-serif" ' +
            'aria-label="Talmängderna som ovaler inuti varandra: den största ' +
            'ovalen är de reella talen R, inuti den de rationella talen Q, ' +
            'sedan heltalen Z och innerst de naturliga talen N. Peka och ' +
            'klicka på en talmängd för fler exempel.">');
        // Kollegieblocks-rutnät (papperstonen ligger som CSS-gradient på scenen).
        svgDelar.push(
            '<defs><pattern id="' + gridId + '" width="24" height="24" ' +
            'patternUnits="userSpaceOnUse">' +
            '<path d="M24 0H0V24" fill="none" stroke="rgba(37,99,201,0.10)" ' +
            'stroke-width="1"/></pattern></defs>' +
            '<rect x="5" y="5" width="442" height="232" fill="url(#' + gridId + ')"/>');

        SETS.forEach(function (s) {
            var d = ellipsPath(s.e) + (s.inre ? ' ' + ellipsPath(s.inre) : '');
            svgDelar.push(
                '<g class="ms-tm-grupp" data-tm="' + s.id + '" style="--tmf:' + s.farg + '">' +
                '<path class="ms-tm-region" fill-rule="evenodd" d="' + d + '" ' +
                'role="button" tabindex="0" aria-pressed="false" ' +
                'aria-label="' + s.aria + '"/>' +
                '<ellipse class="ms-tm-ellips" cx="' + s.e[0] + '" cy="' + s.e[1] +
                '" rx="' + s.e[2] + '" ry="' + s.e[3] +
                '" fill="none" stroke="#1f2530" stroke-width="1.6"/>' +
                '<text class="ms-tm-sym" x="' + s.symX + '" y="' + s.symY +
                '" font-size="' + s.symSize + '" font-weight="600" fill="#1f2530">' +
                s.sym + '</text>' +
                '<g class="ms-tm-extra" fill="' + s.farg + '" font-size="14" ' +
                'font-weight="600" text-anchor="middle">' +
                s.extra.map(function (p) {
                    return '<text x="' + p.x + '" y="' + p.y + '">' + p.t + '</text>';
                }).join('') +
                '</g></g>');
        });

        // Exempeltalen ur den gamla figuren — alltid synliga, i bläck.
        svgDelar.push(
            '<g fill="#1f2530" pointer-events="none">' +
            '<text x="62" y="66" font-size="16" text-anchor="middle">π</text>' +
            '<text x="60" y="190" font-size="15" text-anchor="middle">√3</text>' +
            '<text x="140" y="81" font-size="13" text-anchor="middle">2</text>' +
            '<line x1="132" y1="85.5" x2="148" y2="85.5" stroke="#1f2530" stroke-width="1.2"/>' +
            '<text x="140" y="99" font-size="13" text-anchor="middle">3</text>' +
            '<text x="124" y="172" font-size="14" text-anchor="end">−</text>' +
            '<text x="136" y="163" font-size="13" text-anchor="middle">5</text>' +
            '<line x1="128" y1="167.5" x2="144" y2="167.5" stroke="#1f2530" stroke-width="1.2"/>' +
            '<text x="136" y="181" font-size="13" text-anchor="middle">9</text>' +
            '<text x="243" y="97" font-size="15" text-anchor="middle">−11</text>' +
            '<text x="237" y="168" font-size="15" text-anchor="middle">−2</text>' +
            '<text x="303" y="125" font-size="15" text-anchor="middle">2</text>' +
            '<text x="329" y="153" font-size="15" text-anchor="middle">6</text>' +
            '<text x="352" y="128" font-size="15" text-anchor="middle">9</text>' +
            '</g></svg>');

        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-tm-scene';
        scene.innerHTML = svgDelar.join('');
        card.appendChild(scene);

        var panel = document.createElement('div');
        panel.className = 'ms-tm-panel';
        card.appendChild(panel);

        var STANDARDTEXT =
            'Talmängderna ligger inuti varandra: varje naturligt tal är också ' +
            'ett heltal, varje heltal är också ett rationellt tal och varje ' +
            'rationellt tal är också ett reellt tal. ' +
            '<b>Peka på figuren och klicka på en talmängd</b> för att se fler ' +
            'tal som ingår i den.';

        var vald = null;
        function visaPanel(s) {
            if (!s) { panel.innerHTML = STANDARDTEXT; return; }
            panel.innerHTML =
                '<b style="color:' + s.farg + '">' + s.sym + ' — ' + s.namn +
                '</b><br>' + s.besk + ' ' + s.ring + ' ' + s.kedja;
        }
        visaPanel(null);

        var grupper = scene.querySelectorAll('.ms-tm-grupp');
        function valj(id) {
            vald = (vald === id) ? null : id;
            var valdSet = null;
            for (var i = 0; i < grupper.length; i++) {
                var g = grupper[i];
                var traff = g.getAttribute('data-tm') === vald;
                g.classList.toggle('ms-tm-vald', traff);
                g.querySelector('.ms-tm-region')
                 .setAttribute('aria-pressed', traff ? 'true' : 'false');
            }
            SETS.forEach(function (s) { if (s.id === vald) valdSet = s; });
            visaPanel(valdSet);
        }

        for (var i = 0; i < grupper.length; i++) {
            (function (g) {
                var id = g.getAttribute('data-tm');
                var region = g.querySelector('.ms-tm-region');
                region.addEventListener('pointerenter', function () {
                    g.classList.add('ms-tm-hover');
                });
                region.addEventListener('pointerleave', function () {
                    g.classList.remove('ms-tm-hover');
                });
                region.addEventListener('focus', function () {
                    g.classList.add('ms-tm-hover');
                });
                region.addEventListener('blur', function () {
                    g.classList.remove('ms-tm-hover');
                });
                region.addEventListener('click', function () { valj(id); });
                region.addEventListener('keydown', function (ev) {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        valj(id);
                    }
                });
            })(grupper[i]);
        }

        // Test-handtag för skärmdumpsskript.
        card._valj = valj;

        node.appendChild(card);
    }

    // ── Register + publikt API ────────────────────────────────────────────

    // ══════════════════════════════════════════════════════════════════════
    //  typ: kastvektorer
    // ══════════════════════════════════════════════════════════════════════
    // Hjälpfiguren i fy2-1.8 som interaktiv figur: samma SVG som den gamla
    // ::: figur-figuren, men vektorerna ligger i tre lager (x-led, y-led,
    // total hastighet) som kryssrutorna under figuren tänder och släcker.
    // Vinkelbågarna α_0, α_1, α_2 hör till den totala hastigheten (det är dess
    // vinkel de visar) och "v_y = 0" i högsta punkten till y-lagret.
    function buildKastvektorer(node, cfg) {
        var INK = '#1f2530', ROD = '#c0392b', BLA = '#2563c9', AXEL = '#38bdf8';
        var FONT_ATTR = 'font-size="15"';

        // Hjälpare för etiketterna: kursiv v + upprätt index
        function vLbl(x, y, anchor, sub, color) {
            return '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor + '" ' + FONT_ATTR +
                ' fill="' + color + '"><tspan font-style="italic">v</tspan>' +
                (sub ? '<tspan font-size="11" dy="3">' + sub + '</tspan>' : '') + '</text>';
        }
        // Pil (skaftet slutar vid pilhuvudets bas, butt-ändar)
        function pil(x1, y1, x2, y2, color, w, head) {
            var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
            var bx = x2 - ux * head, by = y2 - uy * head, hw = head * 0.47;
            var r = function (v) { return Math.round(v * 10) / 10; };
            return '<line x1="' + r(x1) + '" y1="' + r(y1) + '" x2="' + r(bx) + '" y2="' + r(by) +
                '" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="butt"/>' +
                '<polygon points="' + r(bx - uy * hw) + ',' + r(by + ux * hw) + ' ' + r(x2) + ',' + r(y2) +
                ' ' + r(bx + uy * hw) + ',' + r(by - ux * hw) + '" fill="' + color + '"/>';
        }
        // Vinkelbåge med medelpunkt i hörnet (x,y) från riktningen a1 till a2
        // (radianer i SVG:s y-nedåt-system), tätt samplad
        function bage(x, y, r, a1, a2) {
            var pts = [];
            for (var i = 0; i <= 14; i++) {
                var a = a1 + (a2 - a1) * i / 14;
                pts.push((x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1));
            }
            return '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + INK + '" stroke-width="1.2"/>';
        }
        // Vinkelns beteckning: kursiv α + upprätt sifferindex, som alla
        // andra variabler i figuren. α_0 är utgångs- och landningsvinkeln
        // (samma vinkel, av symmetrin), α_1 och α_2 punkterna däremellan.
        function vinkelLbl(x, y, sub) {
            return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="14" fill="' + INK + '">' +
                '<tspan font-style="italic">α</tspan>' +
                '<tspan font-size="10" dy="3">' + sub + '</tspan></text>';
        }

        // Geometrin: origo (64,182), topp (236,70), nedslag (408,182)
        var OX = 64, OY = 182, PX = 236, HW = 172, HH = 112;
        function yAv(x) { var u = (x - PX) / HW; return OY - HH * (1 - u * u); }
        var kurva = [];
        for (var i = 0; i <= 60; i++) {
            var xx = OX + (2 * HW) * i / 60;
            kurva.push(xx.toFixed(1) + ',' + yAv(xx).toFixed(1));
        }
        // Fem punkter med vy-längd (px, uppåt positiv); vx är alltid VX
        var VX = 46;
        var punkter = [
            { x: 64,  vy: 60,  xs: '0x', ys: '0y', vs: '0', vinkel: '0' },
            { x: 150, vy: 30,  xs: '0x', ys: 'y',  vs: '',  vinkel: '1' },
            { x: 236, vy: 0,   xs: '0x', ys: 'y',  vs: '',  vinkel: '' },
            { x: 322, vy: -30, xs: '0x', ys: 'y',  vs: '',  vinkel: '2' },
            { x: 408, vy: -60, xs: '0x', ys: '0y', vs: '0', vinkel: '0' },
        ];
        var LX = [[114, 198], [200, 114], [286, 63], [372, 101], [458, 178]];
        var LY = [[58, 126], [144, 66], null, [316, 132], [402, 246]];
        var LV = [[104, 112, 'end'], [194, 60, 'end'], null, [373, 142, 'start'], [459, 256, 'start']];
        var LVINKEL = [[98, 176], [183, 94], null, [355, 114], [442, 200]];

        var bas = '', lagerX = '', lagerY = '', lagerV = '', lagerVhjalp = '';
        // axlar med pilspets bara åt det positiva hållet
        bas += '<line x1="64" y1="182" x2="474" y2="182" stroke="' + AXEL + '" stroke-width="1.6"/>' +
               '<polygon points="474,178 484,182 474,186" fill="' + AXEL + '"/>' +
               '<line x1="64" y1="182" x2="64" y2="40" stroke="' + AXEL + '" stroke-width="1.6"/>' +
               '<polygon points="60,40 64,30 68,40" fill="' + AXEL + '"/>' +
               '<text x="481" y="200" text-anchor="end" ' + FONT_ATTR + ' fill="' + INK + '"><tspan font-style="italic">x</tspan></text>' +
               '<text x="73" y="38" text-anchor="start" ' + FONT_ATTR + ' fill="' + INK + '"><tspan font-style="italic">y</tspan></text>';
        // tyngdaccelerationen g
        bas += pil(86, 52, 86, 84, INK, 2, 8) +
               '<text x="92" y="72" text-anchor="start" ' + FONT_ATTR + ' fill="' + INK + '"><tspan font-style="italic">g</tspan></text>';
        bas += '<polyline points="' + kurva.join(' ') + '" fill="none" stroke="' + INK + '" stroke-width="2"/>';

        punkter.forEach(function (p, idx) {
            var x = p.x, y = yAv(x);
            bas += '<circle cx="' + x + '" cy="' + y.toFixed(1) + '" r="3" fill="' + INK + '"/>';
            // x-led
            lagerX += pil(x, y, x + VX, y, ROD, 2.6, 9);
            lagerX += vLbl(LX[idx][0], LX[idx][1], 'start', p.xs, ROD);
            // y-led
            if (p.vy !== 0) {
                lagerY += pil(x, y, x, y - p.vy, ROD, 2.6, 9);
                lagerY += vLbl(LY[idx][0], LY[idx][1], 'end', p.ys, ROD);
            } else {
                lagerY += '<text x="232" y="60" text-anchor="middle" font-size="14" fill="' + INK + '">' +
                          '<tspan font-style="italic">v</tspan><tspan font-size="11" dy="3">y</tspan>' +
                          '<tspan dy="-3"> = 0</tspan></text>';
            }
            // total hastighet + vinkelbåge mot vågräta axeln
            if (p.vy === 0) {
                // I högsta punkten är v vågrät och lika med v_0x: den blå
                // pilen ritas ändå, ovanpå den röda, så att lagret "total
                // hastighet" visar v i alla fem punkter.
                lagerV += pil(x, y, x + VX, y, BLA, 3, 10);
                lagerV += vLbl(268, 62, "middle", "", BLA);
            } else {
                // Streckad horisontell hjälplinje där x-axeln inte själv är
                // horisontalen: visar vad vinkeln mäts mot.
                if (idx === 1 || idx === 3) {
                    lagerVhjalp += "<line x1=\"" + x + "\" y1=\"" + y.toFixed(1) + "\" x2=\"" + (x + 44) +
                              "\" y2=\"" + y.toFixed(1) + "\" stroke=\"" + INK +
                              "\" stroke-width=\"1\" stroke-dasharray=\"3 3\" opacity=\"0.7\"/>";
                }
                lagerV += pil(x, y, x + VX, y - p.vy, BLA, 3, 10);
                lagerV += vLbl(LV[idx][0], LV[idx][1], LV[idx][2], p.vs, BLA);
                var ang = Math.atan2(-p.vy, VX);          // v-riktningen i SVG-vinkel
                var r = (idx === 0 || idx === 4) ? 26 : 24;
                lagerV += p.vy > 0 ? bage(x, y, r, ang, 0) : bage(x, y, r, 0, ang);
                lagerV += vinkelLbl(LVINKEL[idx][0], LVINKEL[idx][1], p.vinkel);
            }
        });

        var svg = '<svg class="ms-kv-svg" viewBox="30 28 468 236" width="593" height="299" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="Kastparabel i ett xy-diagram. En boll följer en parabel från origo till nedslag. ' +
            'Vid fem punkter visas den konstanta vågräta hastigheten (röd), den varierande lodräta ' +
            'hastigheten (röd) och den resulterande hastigheten (blå). I högsta punkten är hastigheten ' +
            'i y-led noll. Kryssrutorna under figuren tänder och släcker de tre vektortyperna.">' +
            bas +
            // hjälplinjerna ligger UNDER pilarna (annars ser de röda pilarna
            // streckade ut) men tänds och släcks med lagret v
            '<g class="ms-kv-lager" data-lager="v-hjalp">' + lagerVhjalp + '</g>' +
            '<g class="ms-kv-lager" data-lager="x">' + lagerX + '</g>' +
            '<g class="ms-kv-lager" data-lager="y">' + lagerY + '</g>' +
            '<g class="ms-kv-lager" data-lager="v">' + lagerV + '</g>' +
            '</svg>';

        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = svg;
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        function kryss(txt, lager) {
            var lbl = document.createElement('label');
            lbl.className = 'minisim-check';
            var inp = document.createElement('input');
            inp.type = 'checkbox';
            inp.checked = true;
            var gs = scene.querySelectorAll('.ms-kv-lager[data-lager="' + lager + '"], ' +
                                            '.ms-kv-lager[data-lager="' + lager + '-hjalp"]');
            inp.addEventListener('change', function () {
                gs.forEach(function (g) { g.classList.toggle('ms-dold', !inp.checked); });
            });
            lbl.appendChild(inp);
            lbl.appendChild(document.createTextNode(txt));
            controls.appendChild(lbl);
        }
        kryss('Visa hastighet i x-led', 'x');
        kryss('Visa hastighet i y-led', 'y');
        kryss('Visa total hastighet', 'v');
        card.appendChild(controls);
        node.appendChild(card);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: koniskpendel
    // ══════════════════════════════════════════════════════════════════════
    // Den översta figuren i fy2-1.7 (Konisk pendel) som rörlig figur: samma
    // uppställning som den tidigare statiska ::: figur-SVG:n (tak, snöre,
    // lodlinje, cirkelbana, vikt, r, l, α, F_G och F_S), men vikten sveper
    // runt i den vågräta cirkeln och snöret, radien och kraftpilarna följer
    // med. Rörelsen går i verklig tid ur genomgångens egen formel: med
    // snörlängden 1,5 m är T = 2π√(l·cos α / g), och glidaren för α
    // visar hur en större vinkel ger en kortare periodtid. Ren SVG i
    // laboranstemat (papper med kollegierutnät), inget ljud, ingen
    // fullskärm. Figuren startar stillastående i samma läge som den
    // statiska figuren hade; "Sätt i rörelse" startar den.
    var kpRaknare = 0;
    function buildKoniskpendel(node, cfg) {
        var INK = '#1f2530', GREY = '#7c828c', BLA = '#2563c9', RUTA = '#2563c9';
        var G = 9.82, L_M = 1.5;                 // snörlängd i meter
        var PX_PER_M = 100;
        var PX = 234, PY = 34;                   // fästet i taket
        var L = L_M * PX_PER_M;                  // snörlängd i px
        var FG = 44;                             // tyngdkraftens pillängd (px)
        var alfa = 30 * Math.PI / 180;
        var FI0 = 0.30;                          // startläge: till höger, snett framför
        var fi = FI0;
        var visaKrafter = true;
        var spelar = false;
        var id = 'ms-kp-rutnat-' + (++kpRaknare);

        function r1(v) { return Math.round(v * 10) / 10; }
        function pil(x1, y1, x2, y2, color, w, head) {
            var dx = x2 - x1, dy = y2 - y1, Ln = Math.hypot(dx, dy) || 1, ux = dx / Ln, uy = dy / Ln;
            var bx = x2 - ux * head, by = y2 - uy * head, hw = head * 0.47;
            return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(bx) + '" y2="' + r1(by) +
                '" stroke="' + color + '" stroke-width="' + w + '" stroke-linecap="butt"/>' +
                '<polygon points="' + r1(bx - uy * hw) + ',' + r1(by + ux * hw) + ' ' + r1(x2) + ',' + r1(y2) +
                ' ' + r1(bx + uy * hw) + ',' + r1(by - ux * hw) + '" fill="' + color + '"/>';
        }
        function kraftLbl(x, y, anchor, sub) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="16" fill="' + BLA + '">' +
                '<tspan font-style="italic">F</tspan><tspan font-size="12" dy="3">' + sub + '</tspan></text>';
        }
        function varLbl(x, y, anchor, t, size) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="' + (size || 16) +
                '" fill="' + INK + '"><tspan font-style="italic">' + t + '</tspan></text>';
        }

        // Fast bakgrund: rutnät, tak med skraffering
        var bas = '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="' + RUTA + '" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="0" y="0" width="468" height="272" fill="url(#' + id + ')"/>' +
            '<line x1="' + (PX - 64) + '" y1="' + PY + '" x2="' + (PX + 64) + '" y2="' + PY + '" stroke="' + INK + '" stroke-width="1.8"/>';
        for (var hx = PX - 60; hx <= PX + 60; hx += 8) {
            bas += '<line x1="' + hx + '" y1="' + PY + '" x2="' + (hx - 7) + '" y2="' + (PY - 7) +
                '" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>';
        }

        function rita() {
            var r = L * Math.sin(alfa), h = L * Math.cos(alfa);
            var CX = PX, CY = PY + h, RY = 0.26 * r;
            var wx = CX + r * Math.cos(fi), wy = CY + RY * Math.sin(fi);
            var s = '';
            // lodlinje och cirkelbana
            s += '<line x1="' + CX + '" y1="' + PY + '" x2="' + CX + '" y2="' + r1(CY) + '" stroke="' + GREY +
                '" stroke-width="1.2" stroke-dasharray="4 3"/>';
            s += '<ellipse cx="' + CX + '" cy="' + r1(CY) + '" rx="' + r1(r) + '" ry="' + r1(RY) +
                '" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="2 3"/>';
            // radien C → vikten, med etiketten r förskjuten vinkelrätt från linjen
            s += '<line x1="' + CX + '" y1="' + r1(CY) + '" x2="' + r1(wx) + '" y2="' + r1(wy) + '" stroke="' + GREY +
                '" stroke-width="1.2" stroke-dasharray="4 3"/>';
            var rmx = (CX + wx) / 2, rmy = (CY + wy) / 2;
            var rdx = wx - CX, rdy = wy - CY, rl = Math.hypot(rdx, rdy) || 1;
            var nx = rdy / rl, ny = -rdx / rl;             // normal, pekar "uppåt" när vikten är till höger
            if (ny > 0) { nx = -nx; ny = -ny; }
            if (rl > 26) s += varLbl(rmx + nx * 11, rmy + ny * 11 + 5, 'middle', 'r', 15);
            // snöret och etiketten l (förskjuten ut från lodlinjen)
            s += '<line x1="' + PX + '" y1="' + PY + '" x2="' + r1(wx) + '" y2="' + r1(wy) + '" stroke="' + INK + '" stroke-width="1.6"/>';
            var smx = (PX + wx) / 2, smy = (PY + wy) / 2;
            var sdx = wx - PX, sdy = wy - PY, sl = Math.hypot(sdx, sdy) || 1;
            var lnx = sdy / sl, lny = -sdx / sl;           // normal till snöret
            if ((wx - PX) * lnx < 0) { lnx = -lnx; lny = -lny; }   // ut från lodlinjen
            if (Math.abs(wx - PX) < 8) { lnx = 1; lny = 0; }
            var lx = PX + 0.36 * (wx - PX), ly = PY + 0.36 * (wy - PY);
            s += varLbl(lx + lnx * 13, ly + lny * 13 + 5, 'middle', 'l');
            // vinkelbågen vid fästet, mellan lodlinjen och snöret
            var a0 = Math.PI / 2, a1 = Math.atan2(wy - PY, wx - PX);
            var pts = [];
            for (var i = 0; i <= 14; i++) {
                var a = a0 + (a1 - a0) * i / 14;
                pts.push(r1(PX + 32 * Math.cos(a)) + ',' + r1(PY + 32 * Math.sin(a)));
            }
            s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>';
            var am = (a0 + a1) / 2;
            s += '<text x="' + r1(PX + 46 * Math.cos(am)) + '" y="' + r1(PY + 46 * Math.sin(am) + 5) +
                '" text-anchor="middle" font-size="15" fill="' + INK + '">α</text>';
            // vikten
            s += '<circle cx="' + r1(wx) + '" cy="' + r1(wy) + '" r="9" fill="#b8bec6" stroke="' + INK + '" stroke-width="1.4"/>';
            s += '<circle cx="' + r1(wx) + '" cy="' + r1(wy) + '" r="2.6" fill="' + INK + '"/>';
            // krafterna: F_G rakt ned, F_S längs snöret mot fästet, skalenliga
            if (visaKrafter) {
                var FS = FG / Math.cos(alfa);
                s += pil(wx, wy, wx, wy + FG, BLA, 3.2, 11);
                var lblx = wx + 6, lbla = 'start';
                s += kraftLbl(lblx, wy + FG + 6, lbla, 'G');
                var ux = (PX - wx) / sl, uy = (PY - wy) / sl;
                var tx = wx + ux * FS, ty = wy + uy * FS;
                s += pil(wx, wy, tx, ty, BLA, 3.2, 11);
                // etiketten på snörets utsida, i höjd med pilspetsen
                var ex = tx - lnx * 12, ey = ty - lny * 12 + 5;
                s += kraftLbl(ex, ey, lnx >= 0 ? 'end' : 'start', 'S');
            }
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="80 14 308 250" width="593" height="481" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En konisk pendel: ett snöre fäst i taket gör vinkeln alfa mot lodlinjen, och ' +
            'pendelvikten sveper runt i en vågrät cirkel med radien r. Tyngdkraften nedåt och ' +
            'spännkraften längs snöret är inritade och följer med vikten runt.">' +
            bas + '<g class="ms-kp-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-kp-dyn');
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn ms-primar';
        startBtn.textContent = 'Sätt i rörelse';
        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        var kraftLblEl = document.createElement('label');
        kraftLblEl.className = 'minisim-check';
        var kraftCb = document.createElement('input');
        kraftCb.type = 'checkbox';
        kraftCb.checked = true;
        kraftLblEl.appendChild(kraftCb);
        kraftLblEl.appendChild(document.createTextNode('Visa krafter'));
        var info = document.createElement('span');
        info.className = 'minisim-info';
        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        controls.appendChild(kraftLblEl);
        controls.appendChild(info);
        card.appendChild(controls);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.innerHTML = 'Utslagsvinkel <em>α</em>';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '5'; slider.max = '65'; slider.step = '1'; slider.value = '30';
        slider.setAttribute('aria-label', 'Snörets vinkel mot lodlinjen i grader');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function periodtid() { return 2 * Math.PI * Math.sqrt(L_M * Math.cos(alfa) / G); }
        function fmt(v, d) { return v.toFixed(d).replace('.', ','); }
        function syncInfo() {
            sliderVal.textContent = slider.value + '°';
            info.textContent = 'Snörlängd 1,5 m, periodtid T = ' + fmt(periodtid(), 2) + ' s';
        }

        // ── Animation ─────────────────────────────────────────────────────
        var raf = null, senast = 0, synlig = true;
        function steg(nu) {
            raf = null;
            if (!spelar || !synlig) return;
            var dt = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            fi += dt * 2 * Math.PI / periodtid();
            if (fi > Math.PI * 2) fi -= Math.PI * 2;
            rita();
            raf = requestAnimationFrame(steg);
        }
        function kor() { if (!raf && spelar && synlig) { senast = 0; raf = requestAnimationFrame(steg); } }
        function setSpelar(v) {
            spelar = v;
            startBtn.textContent = spelar ? 'Pausa' : 'Sätt i rörelse';
            startBtn.classList.toggle('ms-primar', !spelar);
            if (spelar) kor();
        }
        startBtn.addEventListener('click', function () { setSpelar(!spelar); });
        omBtn.addEventListener('click', function () {
            setSpelar(false);
            fi = FI0;
            slider.value = '30';
            alfa = Math.PI / 6;
            syncInfo();
            rita();
        });
        kraftCb.addEventListener('change', function () { visaKrafter = kraftCb.checked; rita(); });
        slider.addEventListener('input', function () {
            alfa = parseFloat(slider.value) * Math.PI / 180;
            syncInfo();
            rita();
        });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                synlig = entries[0].isIntersecting;
                if (synlig) kor();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        syncInfo();
        rita();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: snettkast
    // ══════════════════════════════════════════════════════════════════════
    // Bollen som kastas ur fy2-1.8: den fristående simuleringen
    // fysik2-rorelse-app.html inbäddad via en iframe (?embed=1&mini=1 —
    // mini-läget visar bara scenen). Kortets verktyg styr sidan med
    // postMessage; sidan rapporterar tillbaka sitt läge till info-raden.
    // Samma mönster som cirkularrorelse.
    function buildSnettkast(node, cfg) {
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var iframe = document.createElement('iframe');
        iframe.className = 'minisim-iframe';
        iframe.src = 'fysik2-rorelse-app.html?embed=1&mini=1&v=' + (window.__CB || Date.now());
        iframe.style.aspectRatio = '3 / 2';   // scenens proportion i simuleringen
        iframe.setAttribute('allowfullscreen', '');
        iframe.allow = 'fullscreen';
        iframe.loading = 'lazy';
        iframe.title =
            'Simulering: en tennisboll kastas i ett snett kast på rutat papper. ' +
            'Röda pilar visar hastigheten i x-led och y-led, en blå pil den totala ' +
            'hastigheten. Fullskärmsknappen uppe till vänster i scenen öppnar ' +
            'simuleringen i fullskärm med alla verktyg.';
        scene.appendChild(iframe);
        card.appendChild(scene);

        function sanda(cmd, value) {
            try {
                iframe.contentWindow.postMessage({ fysikKast: cmd, value: value }, location.origin);
            } catch (e) { /* iframen inte laddad ännu */ }
        }

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var kastBtn = document.createElement('button');
        kastBtn.type = 'button';
        kastBtn.className = 'minisim-btn ms-primar';
        kastBtn.textContent = 'Kasta';
        kastBtn.addEventListener('click', function () { sanda('primar'); });
        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        omBtn.addEventListener('click', function () { sanda('reset'); });
        // Stegverktyget: i pausat läge stegas kastet en bildruta i taget,
        // framåt och bakåt, för att hitta exakt det läge man är ute efter.
        function stegKnapp(txt, ikon, cmd) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn';
            b.disabled = true;
            b.title = txt + ' en bildruta (ett pågående kast pausas)';
            b.setAttribute('aria-label', txt + ' en bildruta');
            b.innerHTML = ikon;
            b.addEventListener('click', function () { sanda(cmd); });
            return b;
        }
        var IK_BAK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
                     '<rect x="4" y="5" width="2.8" height="14"/><path d="M19 5v14L8.5 12z"/></svg>';
        var IK_FRAM = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
                      '<rect x="17.2" y="5" width="2.8" height="14"/><path d="M5 5v14l10.5-7z"/></svg>';
        var bakBtn = stegKnapp('Stega bakåt', IK_BAK, 'stegbak');
        var framBtn = stegKnapp('Stega framåt', IK_FRAM, 'stegfram');
        var info = document.createElement('span');
        info.className = 'minisim-info';
        controls.appendChild(kastBtn);
        controls.appendChild(bakBtn);
        controls.appendChild(framBtn);
        controls.appendChild(omBtn);
        controls.appendChild(info);
        card.appendChild(controls);

        // Glidarrad: etikett, glidare, värde
        function glidare(lblTxt, min, max, step, start, visa, aria, cmd) {
            var row = document.createElement('div');
            row.className = 'minisim-slider-row';
            var lbl = document.createElement('span');
            lbl.className = 'minisim-slider-lbl';
            lbl.textContent = lblTxt;
            var sl = document.createElement('input');
            sl.type = 'range';
            sl.className = 'minisim-slider';
            sl.min = String(min); sl.max = String(max); sl.step = String(step);
            sl.value = String(start);
            sl.setAttribute('aria-label', aria);
            var val = document.createElement('span');
            val.className = 'minisim-slider-val';
            val.textContent = visa(start);
            sl.addEventListener('input', function () {
                var v = parseFloat(sl.value);
                val.textContent = visa(v);
                sanda(cmd, v);
            });
            // glidare + värde hålls ihop, så att en smal skärm bryter raden
            // EFTER etiketten och inte mellan glidaren och värdet
            var par = document.createElement("span");
            par.style.cssText = "display:flex;flex:1 1 170px;align-items:center;gap:10px;min-width:0;";
            par.appendChild(sl); par.appendChild(val);
            row.appendChild(lbl); row.appendChild(par);
            card.appendChild(row);
            return { sl: sl, val: val, visa: visa };
        }
        var vinkel = glidare('Utkastvinkel', 0, 90, 1, 50,
            function (v) { return fmt(v, 0) + '°'; },
            'Utkastvinkel i grader mot marken', 'vinkel');
        var fart = glidare('Utgångshastighet', 1, 30, 0.5, 15,
            function (v) { return fmt(v, 1) + ' m/s'; },
            'Utgångshastighet i meter per sekund', 'fart');
        node.appendChild(card);

        // Lägesrapporten från sidan i iframen → knapp, glidare, info-rad
        window.addEventListener('message', function (e) {
            if (e.source !== iframe.contentWindow) return;
            var st = e.data && e.data.fysikKastStatus;
            if (!st) return;
            kastBtn.textContent = st.status === 'running' ? 'Pausa'
                                : st.status === 'paused' ? 'Fortsätt'
                                : st.status === 'finished' ? 'Kasta igen' : 'Kasta';
            framBtn.disabled = !st.canFwd;
            bakBtn.disabled = !st.canBack;
            if (st.status === 'finished' && st.xmax != null) {
                info.textContent = 'kastvidd ' + fmt(st.xmax, 2) + ' m · stighöjd ' + fmt(st.ymax, 2) + ' m';
            } else if (st.status === 'running' || st.status === 'paused') {
                info.textContent = 't = ' + fmt(st.t, 2) + ' s · v = ' + fmt(st.v, 1) + ' m/s';
            } else {
                info.textContent = '';
            }
            // synka glidarna om värdena ändrats inne i iframen (fullskärm) —
            // men aldrig medan användaren själv drar i dem
            [[vinkel, st.angle], [fart, st.v0]].forEach(function (par) {
                var g = par[0], v = par[1];
                if (typeof v !== 'number' || document.activeElement === g.sl) return;
                if (parseFloat(g.sl.value) !== v) { g.sl.value = String(v); g.val.textContent = g.visa(v); }
            });
        });
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: magnetpoler / magnetdelning
    // ══════════════════════════════════════════════════════════════════════
    // Stavmagneterna ur fy2-3.1 (Magnetism och magnetfält) som man kan ta
    // i. Båda typerna bygger på samma motor: varje magnet är ett par
    // punktpoler (+1 i nordändan, −1 i sydändan) och kraften mellan två
    // magneter är summan av de fyra polparens Coulomb-liknande krafter
    // (∝ 1/r², mjukad nära kontakt). Det ger automatiskt rätt tecken i
    // alla lägen: lika poler mot varandra repellerar, olika attraherar —
    // och två bitar av en delad magnet dras ihop igen, eftersom de nya
    // polerna vid brottytan är olika.
    // Magneten man drar i följer pekaren (kinematisk); de övriga är fria
    // och styrs av magnetkraften, vilofriktion (de rör sig inte förrän
    // kraften är stor nog), glidfriktion och en oelastisk kontakt — därför
    // "klickar" de ihop och stannar. Blå kraftpilar ovanför magneterna
    // visar nettokraften på var och en (längd ∝ √F, så små krafter syns).
    //   magnetpoler:   två magneter med lika poler mot varandra från start.
    //                  "Vänd vänstra"/"Vänd högra" roterar en magnet ett
    //                  halvt varv (även dubbelklick/dubbeltryck på den).
    //   magnetdelning: en hel magnet. Ta tag i ena halvan och dra isär —
    //                  den spricker på mitten och brottytorna får nya
    //                  poler: en sydända där nordändan var kvar, en
    //                  nordända på den andra biten. "Dela på mitten" delar
    //                  alla bitar igen (upp till fyra), och de dras ihop
    //                  till en kedja av små magneter — poler uppträder
    //                  alltid parvis.
    function buildMagneter(node, cfg, variant) {
        var W = 560, H = 210;              // logisk ritstorlek
        var AXIS_Y = 122;                  // magneternas mittlinje (under fullskärmsknappen även på mobil)
        var MH = 40;                       // magnetens höjd
        var MARG = 24;                     // väggarna (magneterna stannar här)
        var INK = '#1f2530';
        var COL_N = '#c0392b', COL_S = '#cfd4da', COL_KANT = '#5d646e';
        var COL_S_TXT = '#3a3f47', COL_KRAFT = '#2563c9';
        var delning = variant === 'delning';
        var HEL_LEN = 240, MIN_LEN = 60;   // hela magneten / minsta bit (max 4 bitar)
        var PAR_LEN = 120;                 // magneterna i polparet
        // Kraftmodell (px, px/s²; massa 1). K vald så att kontaktkraften
        // mellan två 120-magneter blir ≈ 7 000 px/s² och kraften vid ett
        // 65 px stort gap ungefär motsvarar vilofriktionen: magneterna
        // börjar röra sig först när de kommer nära varandra.
        var K = 1000000, R0 = 12;
        var F_STAT = 120, F_GLID = 100, DAMP = 0.8;
        var TEAR = 18;                     // så långt töjs den hela magneten innan den spricker
        var V_MAX = 700;

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', delning
            ? 'En stavmagnet med röd nordända och grå sydända ligger på ett ' +
              'rutat papper. Ta tag i ena halvan och dra isär, eller tryck ' +
              'Dela på mitten: magneten spricker och brottytorna får nya ' +
              'poler, så att varje bit blir en egen magnet med nordända och ' +
              'sydända. Bitarna dras ihop igen eftersom olika poler möts vid ' +
              'brottet. Varje bit kan delas igen, upp till fyra bitar.'
            : 'Två stavmagneter med röd nordända och grå sydända ligger på ' +
              'ett rutat papper och kan dras i sidled. Är lika poler vända ' +
              'mot varandra skjuts den andra magneten undan när man för dem ' +
              'ihop; är olika poler vända mot varandra dras de ihop och ' +
              'fastnar i varandra. Blå pilar visar kraften på varje magnet. ' +
              'Knapparna vänder en magnet ett halvt varv.');
        canvas.style.touchAction = 'pan-y';
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        function mkBtn(text, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
            b.textContent = text;
            controls.appendChild(b);
            return b;
        }
        var delaBtn = null, vandVBtn = null, vandHBtn = null;
        if (delning) {
            delaBtn = mkBtn('Dela på mitten', 'ms-primar');
        } else {
            vandVBtn = mkBtn('Vänd vänstra');
            vandHBtn = mkBtn('Vänd högra');
        }
        var omBtn = mkBtn('Börja om');
        var info = document.createElement('span');
        info.className = 'minisim-info ms-brod';
        controls.appendChild(info);
        card.appendChild(controls);
        node.appendChild(card);

        // ── Canvas-uppsättning (samma mönster som övriga minisimmar) ──────
        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        // En magnet: x = vänsterkant, len, polL = +1 om nordändan är till
        // vänster (−1 om sydändan), bl/br = brottyta i vänster/höger ände,
        // v = fart (px/s), hel = den ursprungliga hela magneten (kan
        // slitas itu med pekaren), stretch = töjning under sådant drag,
        // flip = pågående vändning {t, dur}.
        var mags = [];
        var drag = null;                   // {m, off, ptr, side, x0, pv, lx, lt}
        var klick = null;                  // {x, t} liten kontaktmarkering
        var lastTap = { m: null, t: 0 };
        var running = false, visible = true, lastTs = 0, rafId = 0;

        function mkMag(x, len, polL, bl, br, hel) {
            return { x: x, len: len, polL: polL, bl: !!bl, br: !!br,
                     v: 0, hel: !!hel, stretch: 0, flip: null };
        }
        function reset() {
            drag = null;
            klick = null;
            if (delning) {
                mags = [mkMag((W - HEL_LEN) / 2, HEL_LEN, 1, false, false, true)];
            } else {
                mags = [mkMag(120, PAR_LEN, -1, false, false, false),
                        mkMag(W - 120 - PAR_LEN, PAR_LEN, 1, false, false, false)];
            }
            syncUi();
            render();
            updateInfo();
        }
        function sorted() {
            return mags.slice().sort(function (a, b) { return a.x - b.x; });
        }
        function polR(m) { return -m.polL; }
        function cx(m) { return m.x + m.len / 2; }

        // ── Krafter: summan över alla polpar (1D längs mittlinjen) ────────
        function forceOn(m) {
            var F = 0;
            var pb = [[m.x, m.polL], [m.x + m.len, polR(m)]];
            for (var i = 0; i < mags.length; i++) {
                var o = mags[i];
                if (o === m) continue;
                var pa = [[o.x, o.polL], [o.x + o.len, polR(o)]];
                // Magneterna ligger på rad och kan inte gå in i varandra,
                // så riktningen "bort från o" ges av mittpunkterna — inte
                // av polparets eget avstånd, som vid kontakt är noll (eller
                // efter ett flyttalsöverlapp pekar åt fel håll och vänder
                // attraktion till repulsion för ett par i kontakt).
                var sgn = cx(m) > cx(o) ? 1 : -1;
                for (var j = 0; j < 2; j++) {
                    for (var k = 0; k < 2; k++) {
                        var d = sgn * (pb[k][0] - pa[j][0]);
                        var r = Math.max(0, d) + R0;
                        F += K * pa[j][1] * pb[k][1] / (r * r) * sgn;
                    }
                }
            }
            return F;
        }

        // ── Kontakter och väggar (magneterna kan inte gå in i varandra) ──
        function atLeftWall(m) { return m.x <= MARG + 0.01; }
        function atRightWall(m) { return m.x + m.len >= W - MARG - 0.01; }
        function walls(m) {
            if (m.x < MARG) { m.x = MARG; if (m.v < 0) m.v = 0; }
            if (m.x + m.len > W - MARG) { m.x = W - MARG - m.len; if (m.v > 0) m.v = 0; }
        }
        function ev(m) {                   // "effektiv" fart: den dragna följer pekaren
            return (drag && m === drag.m) ? drag.pv : m.v;
        }
        function push(a, b, ov) {          // a till vänster om b, överlapp ov > 0
            var aFix = drag && a === drag.m, bFix = drag && b === drag.m;
            if (aFix && !bFix) {
                if (atRightWall(b)) { a.x -= ov; } else { b.x += ov; }
            } else if (bFix && !aFix) {
                if (atLeftWall(a)) { b.x += ov; } else { a.x -= ov; }
            } else if (!aFix && !bFix) {
                if (atRightWall(b)) { a.x -= ov; }
                else if (atLeftWall(a)) { b.x += ov; }
                else { a.x -= ov / 2; b.x += ov / 2; }
            }
        }
        function resolve(dt) {
            var ms = sorted();
            var i, it, ov;
            // 1. Lägen: ingen får ligga inne i en granne eller utanför väggarna.
            for (it = 0; it < 4; it++) {
                for (i = 0; i < ms.length - 1; i++) {
                    ov = ms[i].x + ms[i].len - ms[i + 1].x;
                    if (ov > 0) push(ms[i], ms[i + 1], ov);
                }
                for (i = 0; i < ms.length; i++) walls(ms[i]);
                for (i = ms.length - 1; i > 0; i--) {
                    ov = ms[i - 1].x + ms[i - 1].len - ms[i].x;
                    if (ov > 0) push(ms[i - 1], ms[i], ov);
                }
                for (i = 0; i < ms.length; i++) walls(ms[i]);
            }
            // 2. Farter: magneter i kontakt som rör sig MOT varandra (eller
            // hålls ihop) bildar ett kluster och får gemensam fart — medel-
            // farten (lika massor), så att rörelsemängden bevaras och de
            // inre magnetkrafterna, som är parvis motriktade, tar ut
            // varandra exakt. Utan detta driver en kedja av bitar iväg.
            // Ett par som rör sig ISÄR (repulsion) lämnas i fred.
            var k = 0;
            while (k < ms.length) {
                var grupp = [ms[k]];
                while (k + 1 < ms.length) {
                    var a = ms[k], b = ms[k + 1];
                    var gap = b.x - (a.x + a.len);
                    if (gap > 0.01 || ev(a) < ev(b)) break;
                    grupp.push(b);
                    k++;
                }
                k++;
                if (grupp.length < 2) continue;
                var dragged = null, sum = 0, j;
                for (j = 0; j < grupp.length; j++) {
                    if (drag && grupp[j] === drag.m) dragged = grupp[j];
                    sum += grupp[j].v;
                }
                var v = dragged ? drag.pv : sum / grupp.length;
                // glidfriktionen bromsar klustret som helhet — de enskilda
                // farterna har motsatta tecken (de inre krafterna), så den
                // friktion som redan dragits av var för sig tar ut sig i
                // medelvärdet i stället för att bromsa
                if (!dragged && dt) {
                    var glid = F_GLID * dt;
                    if (Math.abs(v) <= glid) v = 0;
                    else v -= (v > 0 ? 1 : -1) * glid;
                }
                // mot en vägg stannar hela klustret
                if ((v < 0 && atLeftWall(grupp[0])) ||
                    (v > 0 && atRightWall(grupp[grupp.length - 1]))) v = 0;
                for (j = 0; j < grupp.length; j++) {
                    if (grupp[j] !== dragged) grupp[j].v = v;
                }
            }
        }

        // ── Simulationssteg ───────────────────────────────────────────────
        function step(dt) {
            var i, m;
            // alla krafter räknas FÖRE någon flyttas — annars ser den andra
            // magneten i ett par redan den förstas nya läge, och paret får
            // en liten nettofart som aldrig dör ut
            var Fs = [];
            for (i = 0; i < mags.length; i++) Fs.push(forceOn(mags[i]));
            for (i = 0; i < mags.length; i++) {
                m = mags[i];
                if (m.flip) {
                    m.flip.t += dt;
                    if (m.flip.t >= m.flip.dur) m.flip = null;
                }
                if (drag && m === drag.m) continue;
                var F = Fs[i];
                if (Math.abs(m.v) < 2 && Math.abs(F) < F_STAT) {
                    m.v = 0;               // vilofriktionen håller kvar den
                    continue;
                }
                m.v += F * dt;
                var glid = F_GLID * dt;
                if (Math.abs(m.v) <= glid) m.v = 0;
                else m.v -= (m.v > 0 ? 1 : -1) * glid;
                m.v *= Math.exp(-DAMP * dt);
                m.v = Math.max(-V_MAX, Math.min(V_MAX, m.v));
                m.x += m.v * dt;
            }
            // "klick": en fri magnet som når kontakt med fart
            var ms = sorted();
            for (i = 0; i < ms.length - 1; i++) {
                var a = ms[i], b = ms[i + 1];
                var gap = b.x - (a.x + a.len);
                if (gap <= 0 && Math.abs(a.v - b.v) > 60 && !klick) {
                    klick = { x: b.x - gap / 2, t: 0 };
                }
            }
            resolve(dt);
            if (klick) {
                klick.t += dt;
                if (klick.t > 0.3) klick = null;
            }
        }

        function anyMoving() {
            for (var i = 0; i < mags.length; i++) {
                if (mags[i].v !== 0 || mags[i].flip) return true;
            }
            return false;
        }
        function shouldRun() {
            if (!visible || document.hidden) return false;
            return !!drag || anyMoving() || !!klick;
        }
        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045);
            step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }
        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }

        // ── Åtgärder ──────────────────────────────────────────────────────
        function flip(m) {
            if (m.flip) return;
            m.polL = -m.polL;
            var b = m.bl; m.bl = m.br; m.br = b;
            m.flip = { t: 0, dur: 0.38 };
            kick();
        }
        // Dela en magnet på mitten: brottytorna får nya poler av sig
        // själva (nordändan blir kvar på ena biten, sydändan på den
        // andra, och varje bit får den motsatta polen vid brottet).
        function split(m, sep, grabbed) {
            var half = m.len / 2;
            var left = mkMag(m.x, half, m.polL, m.bl, true, false);
            var right = mkMag(m.x + half + sep, half, m.polL, true, m.br, false);
            left.v = m.v - (grabbed ? 0 : 90);
            right.v = m.v + (grabbed ? 0 : 90);
            var idx = mags.indexOf(m);
            mags.splice(idx, 1, left, right);
            return { left: left, right: right };
        }
        function splitAll() {
            var list = mags.slice();
            var n = 0;
            for (var i = 0; i < list.length; i++) {
                if (list[i].len >= 2 * MIN_LEN && !list[i].flip) { split(list[i], 8, false); n++; }
            }
            if (n) { klick = null; kick(); }
            syncUi();
            updateInfo();
        }
        function canSplit() {
            for (var i = 0; i < mags.length; i++) if (mags[i].len >= 2 * MIN_LEN) return true;
            return false;
        }
        function syncUi() {
            if (delaBtn) {
                delaBtn.disabled = !canSplit();
                delaBtn.textContent = mags.length === 1 && mags[0].hel ? 'Dela på mitten' : 'Dela igen';
            }
        }

        // ── Rendering (laboranstema: papper med kollegieblocks-rutnät) ────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) {
                ctx.moveTo(x + 0.5, 0);
                ctx.lineTo(x + 0.5, H);
            }
            for (var y = 26; y < H; y += 26) {
                ctx.moveTo(0, y + 0.5);
                ctx.lineTo(W, y + 0.5);
            }
            ctx.stroke();
        }

        // Konturen som polygon (medurs från övre vänstra hörnet). En
        // brottyta ritas taggig; samma tandning i båda bitarna vid ett
        // brott, så att de passar ihop som pusselbitar.
        var TAND = [[0, 0], [4.8, 7.2], [-2.4, 14.4], [4.8, 21.6], [-2.4, 28.8], [0, 36]];
        function outline(x, len, bl, br) {
            var top = AXIS_Y - MH / 2, xr = x + len;
            var pts = [], i;
            if (br) {
                for (i = 0; i < TAND.length; i++) pts.push([xr + TAND[i][0], top + TAND[i][1] * MH / 36]);
            } else {
                pts.push([xr, top], [xr, top + MH]);
            }
            if (bl) {
                for (i = TAND.length - 1; i >= 0; i--) pts.push([x + TAND[i][0], top + TAND[i][1] * MH / 36]);
            } else {
                pts.push([x, top + MH], [x, top]);
            }
            return pts;
        }
        function tracePath(pts) {
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
            ctx.closePath();
        }
        // Ritar en stav (eller halva den hela magneten under töjning):
        // x, len, färgen i vänster respektive höger halva, bokstäver.
        function drawBar(x, len, polL, bl, br, letters) {
            var top = AXIS_Y - MH / 2;
            var pts = outline(x, len, bl, br);
            ctx.save();
            tracePath(pts);
            ctx.clip();
            ctx.fillStyle = polL > 0 ? COL_N : COL_S;
            ctx.fillRect(x - 8, top, len / 2 + 8, MH);
            ctx.fillStyle = polL > 0 ? COL_S : COL_N;
            ctx.fillRect(x + len / 2, top, len / 2 + 8, MH);
            ctx.restore();
            tracePath(pts);
            ctx.strokeStyle = COL_KANT;
            ctx.lineWidth = 1.4;
            ctx.lineJoin = 'round';
            ctx.stroke();
            if (letters) {
                ctx.font = '600 ' + (len >= 100 ? 19 : 16) + 'px Poppins, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var lx = x + len / 4, rx = x + 3 * len / 4;
                ctx.fillStyle = polL > 0 ? '#ffffff' : COL_S_TXT;
                ctx.fillText(polL > 0 ? 'N' : 'S', lx, AXIS_Y + 1);
                ctx.fillStyle = polL > 0 ? COL_S_TXT : '#ffffff';
                ctx.fillText(polL > 0 ? 'S' : 'N', rx, AXIS_Y + 1);
            }
        }
        function easeOut(u) { return 1 - Math.pow(1 - u, 3); }
        function drawMagnet(m) {
            var half = m.len / 2;
            if (m.hel && m.stretch > 0 && drag && drag.m === m) {
                // den hela magneten töjs: halvorna glider isär vid mitten
                // (ännu inga nya poler — de finns först när den spruckit)
                var s = m.stretch, side = drag.side;
                var xl = m.x + (side < 0 ? -s : 0), xr = m.x + half + (side > 0 ? s : 0);
                drawBar(xl, half, m.polL, false, true, false);
                drawBar(xr, half, -m.polL, true, false, false);
                ctx.font = '600 19px Poppins, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = m.polL > 0 ? '#ffffff' : COL_S_TXT;
                ctx.fillText(m.polL > 0 ? 'N' : 'S', xl + half / 2, AXIS_Y + 1);
                ctx.fillStyle = m.polL > 0 ? COL_S_TXT : '#ffffff';
                ctx.fillText(m.polL > 0 ? 'S' : 'N', xr + half / 2, AXIS_Y + 1);
                return;
            }
            if (m.flip) {
                var ang = Math.PI * (1 - easeOut(Math.min(1, m.flip.t / m.flip.dur)));
                ctx.save();
                ctx.translate(cx(m), AXIS_Y);
                ctx.rotate(ang);
                ctx.translate(-cx(m), -AXIS_Y);
                drawBar(m.x, m.len, m.polL, m.bl, m.br, true);
                ctx.restore();
                return;
            }
            drawBar(m.x, m.len, m.polL, m.bl, m.br, true);
        }

        // Kraftpil ovanför magneten: svansen över magnetens mitt, längd
        // ∝ √|F| (så att även svaga krafter syns), begränsad så att den
        // aldrig når in över grannens pil.
        function arrowLen(F) { return 90 * Math.sqrt(Math.min(1, Math.abs(F) / 7000)); }
        function drawArrows() {
            var ms = sorted();
            var y = AXIS_Y - MH / 2 - 18;
            for (var i = 0; i < ms.length; i++) {
                var m = ms[i];
                if (m.flip || (m.hel && m.stretch > 0)) continue;
                var F = forceOn(m);
                var L = arrowLen(F);
                if (L < 7) continue;
                var dir = F > 0 ? 1 : -1;
                var nb = dir > 0 ? ms[i + 1] : ms[i - 1];
                if (nb) L = Math.min(L, Math.abs(cx(nb) - cx(m)) / 2 - 4);
                if (L < 7) continue;
                var x0 = cx(m), x1 = x0 + dir * L;
                var hd = Math.min(9, L * 0.6);
                ctx.strokeStyle = COL_KRAFT;
                ctx.fillStyle = COL_KRAFT;
                ctx.lineWidth = 2.4;
                ctx.lineCap = 'butt';
                ctx.beginPath();
                ctx.moveTo(x0, y);
                ctx.lineTo(x1 - dir * hd, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(x1 - dir * hd, y - 4.5);
                ctx.lineTo(x1 - dir * hd, y + 4.5);
                ctx.closePath();
                ctx.fill();
            }
        }
        function drawKlick() {
            if (!klick) return;
            var u = klick.t / 0.3;
            var r0 = 8 + 14 * u, r1 = r0 + 7 * (1 - u);
            ctx.strokeStyle = 'rgba(31,37,48,' + (0.8 * (1 - u)).toFixed(2) + ')';
            ctx.lineWidth = 1.6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (var k = 0; k < 6; k++) {
                var a = -Math.PI / 2 + (k - 2.5) * 0.42;
                var y0 = AXIS_Y - MH / 2;
                ctx.moveTo(klick.x + r0 * Math.cos(a), y0 + r0 * Math.sin(a));
                ctx.lineTo(klick.x + r1 * Math.cos(a), y0 + r1 * Math.sin(a));
            }
            ctx.stroke();
        }
        function hintText() {
            if (delning) {
                if (mags.length === 1 && mags[0].hel) return 'Ta tag i ena halvan och dra isär magneten.';
                return 'Dra i bitarna. Dubbelklicka på en bit för att vända den.';
            }
            return 'Dra i magneterna. Dubbelklicka på en magnet för att vända den.';
        }
        function drawHint() {
            // nederst till vänster (uppe till vänster sitter fullskärms-
            // knappen); på en smal telefon blir texten oläsligt liten och
            // hoppas över — info-raden under kortet säger samma sak
            if ((canvas.clientWidth || W) < 440) return;
            ctx.font = '13px Poppins, system-ui, sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = 'rgba(31,37,48,0.72)';
            ctx.fillText(hintText(), 14, H - 12);
        }
        function render() {
            drawBackground();
            drawHint();
            drawArrows();
            var ms = sorted();
            for (var i = 0; i < ms.length; i++) drawMagnet(ms[i]);
            drawKlick();
        }

        function facing() {
            // polerna som är vända mot varandra i det närmaste paret
            var ms = sorted();
            if (ms.length < 2) return null;
            var best = null;
            for (var i = 0; i < ms.length - 1; i++) {
                var gap = ms[i + 1].x - (ms[i].x + ms[i].len);
                if (!best || gap < best.gap) best = { a: ms[i], b: ms[i + 1], gap: gap };
            }
            best.lika = polR(best.a) === best.b.polL;
            return best;
        }
        function updateInfo() {
            var f = facing();
            if (delning) {
                if (!f) {
                    info.textContent = 'En hel magnet. Ta tag i ena halvan och dra isär den, eller tryck Dela på mitten.';
                } else if (mags.length === 2) {
                    info.textContent = 'Två bitar, och båda har fått en nordända och en sydända.';
                } else {
                    info.textContent = mags.length + ' bitar, var och en med nordända och sydända. Poler uppträder alltid parvis.';
                }
                return;
            }
            if (!f) { info.textContent = ''; return; }
            if (f.lika) {
                info.textContent = f.gap > 70
                    ? 'Lika poler mot varandra. Dra dem närmare varandra.'
                    : 'Lika poler mot varandra: magneterna repellerar.';
            } else {
                info.textContent = f.gap <= 0.5
                    ? 'Magneterna sitter ihop: olika poler attraherar.'
                    : (f.gap > 70 ? 'Olika poler mot varandra. Dra dem närmare varandra.'
                                  : 'Olika poler mot varandra: magneterna attraherar.');
            }
        }

        // ── Pekare: ta tag i en magnet och dra i sidled ───────────────────
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * W / r.width,
                y: (e.clientY - r.top) * H / r.height
            };
        }
        function hit(p) {
            if (Math.abs(p.y - AXIS_Y) > MH / 2 + 10) return null;
            for (var i = 0; i < mags.length; i++) {
                var m = mags[i];
                if (p.x >= m.x - 6 && p.x <= m.x + m.len + 6) return m;
            }
            return null;
        }
        canvas.addEventListener('pointerdown', function (e) {
            if (e.button && e.button !== 0) return;
            var p = logicalPos(e);
            var m = hit(p);
            if (!m) return;
            e.preventDefault();
            var now = performance.now();
            // dubbelklick/dubbeltryck vänder magneten (e.detail täcker
            // musens dubbelklick, tidsfönstret täcker två snabba tryck)
            if (!m.hel && (e.detail >= 2 || (lastTap.m === m && now - lastTap.t < 350))) {
                lastTap = { m: null, t: 0 };
                flip(m);
                return;
            }
            lastTap = { m: m, t: now };
            if (m.flip) return;
            drag = { m: m, off: p.x - m.x, ptr: e.pointerId, x0: m.x,
                     side: p.x < cx(m) ? -1 : 1, pv: 0, lx: p.x, lt: now };
            m.v = 0;
            m.stretch = 0;
            canvas.style.cursor = 'grabbing';
            try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
            kick();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!drag) {
                canvas.style.cursor = hit(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== drag.ptr) return;
            var m = drag.m;
            var now = performance.now();
            var dt = Math.max(0.004, (now - drag.lt) / 1000);
            drag.pv = 0.6 * drag.pv + 0.4 * (p.x - drag.lx) / dt;
            drag.lx = p.x;
            drag.lt = now;
            var nx = p.x - drag.off;
            if (m.hel) {
                // dra utåt från mitten → magneten töjs och spricker;
                // dra åt andra hållet → hela magneten glider med
                var pull = drag.side * (nx - m.x);
                if (pull <= 0) {
                    m.x = nx;
                    m.stretch = 0;
                } else if (pull < TEAR) {
                    m.stretch = pull;
                } else {
                    var parts = split(m, 0, true);
                    var grabbed = drag.side > 0 ? parts.right : parts.left;
                    var other = drag.side > 0 ? parts.left : parts.right;
                    grabbed.x += drag.side * TEAR;   // där halvan redan ritades
                    drag.off = p.x - grabbed.x;
                    drag.m = grabbed;
                    other.v = -drag.side * 40;       // den andra halvan rycker till
                    klick = null;
                    syncUi();
                }
            } else {
                m.x = nx;
            }
            resolve();
            kick();
        });
        function endDrag(e) {
            if (!drag || e.pointerId !== drag.ptr) return;
            var m = drag.m;
            m.stretch = 0;
            m.v = m.hel ? 0 : Math.max(-V_MAX, Math.min(V_MAX, drag.pv));
            drag = null;
            canvas.style.cursor = 'default';
            kick();
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Knappar ───────────────────────────────────────────────────────
        if (delaBtn) delaBtn.addEventListener('click', splitAll);
        if (vandVBtn) vandVBtn.addEventListener('click', function () { flip(sorted()[0]); });
        if (vandHBtn) vandHBtn.addEventListener('click', function () { flip(sorted()[1]); });
        omBtn.addEventListener('click', reset);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
            kick();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () {
            resizeCanvas();
            if (!running) render();
        });

        // Pausa när widgeten inte syns (lång teorisida) eller fliken göms.
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) kick();
        });

        // Test-handtag för skärmdumps- och fysikskript.
        card._mags = function () { return mags; };
        card._force = forceOn;
        card._step = function (dt) { step(dt); render(); updateInfo(); };
        card._split = splitAll;
        card._flip = function (i) { flip(sorted()[i]); };
        card._dbg = function () { return { running: running, visible: visible, rafId: rafId, drag: !!drag, hidden: document.hidden }; };

        reset();
    }
    function buildMagnetpoler(node, cfg) { buildMagneter(node, cfg, 'poler'); }
    function buildMagnetdelning(node, cfg) { buildMagneter(node, cfg, 'delning'); }

    // ══════════════════════════════════════════════════════════════════════
    //  Gemensam kortbyggare för de två kastdemonstrationerna i fy2-1.8
    // ══════════════════════════════════════════════════════════════════════
    // Ljust kort (laboranstemat) med canvas, fullskärmsknapp och ljudknapp —
    // samma DOM som centrifugen, men samlad i en helper så att de två
    // demonstrationerna nedan slipper upprepa den.
    function kastKort(node, cfg, W, H, ariaLabel) {
        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var ICON_SND_ON =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var ICON_SND_OFF =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';

        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', ariaLabel);
        scene.appendChild(canvas);
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        sndBtn.innerHTML = ICON_SND_ON;
        scene.appendChild(sndBtn);
        card.appendChild(scene);
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        card.appendChild(controls);
        node.appendChild(card);

        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        function drawBackground() {
            ctx.globalCompositeOperation = 'source-over';
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
            for (var y = 26; y < H; y += 26) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
            ctx.stroke();
        }

        // Ljud: korta syntetiserade smällar (inga ljudfiler). Skapas lazy.
        var AC = window.AudioContext || window.webkitAudioContext;
        var actx = null;
        var soundOn = true;
        function ensureAudio() {
            if (actx || !AC) return;
            actx = new AC();
        }
        function resumeAudio() {
            ensureAudio();
            if (actx && actx.state === 'suspended') actx.resume();
        }
        // en kort, dov smäll (kula mot golv, boll i tratt) — brusskur genom
        // bandpass med snabb avklingning
        function small(freq, gain, dur) {
            if (!soundOn || !actx || actx.state !== 'running') return;
            var sr = actx.sampleRate;
            var len = Math.floor(sr * dur);
            var buf = actx.createBuffer(1, len, sr);
            var d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
            }
            var src = actx.createBufferSource();
            src.buffer = buf;
            var bp = actx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = freq;
            bp.Q.value = 1.4;
            var g = actx.createGain();
            g.gain.value = gain;
            src.connect(bp); bp.connect(g); g.connect(actx.destination);
            src.start();
        }
        sndBtn.addEventListener('click', function () {
            soundOn = !soundOn;
            sndBtn.innerHTML = soundOn ? ICON_SND_ON : ICON_SND_OFF;
            sndBtn.title = soundOn ? 'Ljud av' : 'Ljud på';
            if (soundOn) resumeAudio();
        });

        // Fullskärm
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        var onFs = null;
        fsBtn.addEventListener('click', function () {
            if (!isFs()) {
                (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            if (onFs) onFs();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);

        // Standardverktyg
        function knapp(txt, primar) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (primar ? ' ms-primar' : '');
            b.textContent = txt;
            controls.appendChild(b);
            return b;
        }
        function kryss(txt, checked) {
            var lbl = document.createElement('label');
            lbl.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = !!checked;
            lbl.appendChild(cb);
            lbl.appendChild(document.createTextNode(txt));
            controls.appendChild(lbl);
            return cb;
        }
        function glidare(lblTxt, min, max, step, start, visa, aria) {
            var row = document.createElement('div');
            row.className = 'minisim-slider-row';
            var lbl = document.createElement('span');
            lbl.className = 'minisim-slider-lbl';
            lbl.textContent = lblTxt;
            var sl = document.createElement('input');
            sl.type = 'range';
            sl.className = 'minisim-slider';
            sl.min = String(min); sl.max = String(max); sl.step = String(step);
            sl.value = String(start);
            sl.setAttribute('aria-label', aria);
            var val = document.createElement('span');
            val.className = 'minisim-slider-val';
            val.textContent = visa(start);
            sl.addEventListener('input', function () { val.textContent = visa(parseFloat(sl.value)); });
            var par = document.createElement('span');
            par.style.cssText = 'display:flex;flex:1 1 170px;align-items:center;gap:10px;min-width:0;';
            par.appendChild(sl); par.appendChild(val);
            row.appendChild(lbl); row.appendChild(par);
            card.appendChild(row);
            return sl;
        }
        function infoRad() {
            var info = document.createElement('span');
            info.className = 'minisim-info';
            controls.appendChild(info);
            return info;
        }

        // Pil med spets i änden (vektorpil) — skaftet slutar vid huvudets bas.
        function pil(x1, y1, x2, y2, color, lw) {
            var dx = x2 - x1, dy = y2 - y1;
            var L = Math.hypot(dx, dy);
            if (L < 4) return;
            var ux = dx / L, uy = dy / L;
            var hl = Math.min(11, L * 0.6), hw = 4.5;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = lw || 3;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2 - ux * hl, y2 - uy * hl);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x2 - ux * hl - uy * hw, y2 - uy * hl + ux * hw);
            ctx.lineTo(x2 - ux * hl + uy * hw, y2 - uy * hl - ux * hw);
            ctx.closePath();
            ctx.fill();
        }

        return {
            card: card, canvas: canvas, ctx: ctx, controls: controls,
            resizeCanvas: resizeCanvas, drawBackground: drawBackground,
            knapp: knapp, kryss: kryss, glidare: glidare, infoRad: infoRad,
            pil: pil, small: small, resumeAudio: resumeAudio,
            setOnFs: function (f) { onFs = f; }
        };
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: skjutochslapp
    // ══════════════════════════════════════════════════════════════════════
    // Demonstrationen "Skjut och släpp samtidigt" ur fy2-1.8 (Kaströrelse,
    // specialfallet horisontellt kast): två likadana kulor vid kanten av ett
    // 0,80 m högt bord. En fjäderbelastad utskjutare knuffar den ena ut
    // vågrätt i samma ögonblick som släppklon öppnas kring den andra. Båda
    // följer y = −g·t²/2 i y-led — bara den skjutna rör sig i x-led — så de
    // träffar golvet samtidigt (efter √(2h/g) = 0,40 s, som Exempel 3).
    // Blixtbilderna ("Visa spår") fryser båda kulorna med lika tidsavstånd
    // och binder ihop paren med streckade vågräta linjer: samma höjd i varje
    // ögonblick. "Visa hastighet" ritar v_x (konstant) och v_y (växer lika
    // för båda). Ett enda ljud hörs vid nedslaget.
    function buildSkjutochslapp(node, cfg) {
        var W = 560, H = 430;
        var G = 9.82;
        var PX_M = 300;                       // px per meter
        var H_BORD = 0.80;                    // bordets höjd (m), som Exempel 3
        var FLOOR_Y = 392;
        var TOP_Y = FLOOR_Y - H_BORD * PX_M;  // 152
        var EDGE_X = 132;                     // bordskantens x
        var R = 9;                            // kulradie (px)
        var STROBE = 0.05;                    // s mellan blixtbilder
        var V_SCALE = 22;                     // px per m/s för hastighetspilar
        var INK = '#1f2530', GREY = '#7c828c', RED = '#c0392b', BLUE = '#2563c9';
        var T_LAND = Math.sqrt(2 * H_BORD / G);

        var K = kastKort(node, cfg, W, H,
            'Två kulor vid kanten av ett bord på rutat papper. En utskjutare ' +
            'knuffar den ena kulan vågrätt medan den andra släpps rakt ned i ' +
            'samma ögonblick. Kulorna faller lika fort och träffar golvet ' +
            'samtidigt; blixtbilder visar att de hela tiden är på samma höjd.');
        var ctx = K.ctx;
        var startBtn = K.knapp('Skjut och släpp', true);
        var omBtn = K.knapp('Börja om', false);
        var slowCb = K.kryss('Ultrarapid', false);
        var trailCb = K.kryss('Visa spår', true);
        var velCb = K.kryss('Visa hastighet', false);
        var info = K.infoRad();
        var v0Sl = K.glidare('Utgångshastighet', 0.5, 3, 0.1, 2.5,
            function (v) { return fmt(v, 1) + ' m/s'; },
            'Den skjutna kulans utgångshastighet i meter per sekund');

        // ── Tillstånd ─────────────────────────────────────────────────────
        var xA0 = EDGE_X - R, y0 = TOP_Y - R;   // skjuten kula, på bordet
        var xB0 = EDGE_X + R + 12;              // släppt kula, i klon utanför kanten
        var started = false, paused = false, landed = false;
        var t = 0;                              // simulerad tid sedan starten
        var v0 = 2.5;
        var strobes = [];                       // { xA, y, xB } vid k·STROBE
        var nextStrobe = STROBE;
        var running = false, visible = true, lastTs = 0, rafId = 0;

        function timeScale() { return slowCb.checked ? 0.25 : 1; }
        function posA(tt) { return { x: xA0 + v0 * tt * PX_M, y: y0 + 0.5 * G * tt * tt * PX_M }; }
        function posB(tt) { return { x: xB0, y: y0 + 0.5 * G * tt * tt * PX_M }; }

        function reset() {
            started = false; paused = false; landed = false;
            t = 0; strobes = []; nextStrobe = STROBE;
            syncUi(); render(); updateInfo();
        }

        function step(dt) {
            if (!started || landed) return;
            t += dt;
            while (nextStrobe <= Math.min(t, T_LAND) + 1e-9) {
                var a = posA(nextStrobe), b = posB(nextStrobe);
                strobes.push({ xA: a.x, y: a.y, xB: b.x, t: nextStrobe });
                nextStrobe += STROBE;
            }
            if (t >= T_LAND) {
                t = T_LAND;
                landed = true;
                K.small(900, 0.9, 0.09);      // EN smäll — båda landar samtidigt
                syncUi();
            }
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function kula(x, y, color) {
            ctx.beginPath();
            ctx.arc(x, y, R, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = INK;
            ctx.stroke();
            // liten glansfläck
            ctx.beginPath();
            ctx.arc(x - R * 0.35, y - R * 0.35, R * 0.28, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.55)';
            ctx.fill();
        }

        function render() {
            K.drawBackground();
            ctx.font = '13px ' + FONT;
            ctx.textBaseline = 'alphabetic';
            var pushOut = started && t < 0.08 ? 1 : 0;   // utskjutarens slag
            var a = started ? posA(t) : { x: xA0, y: y0 };
            var b = started ? posB(t) : { x: xB0, y: y0 };

            // golvet med skraffering och en skala i meter från bordskanten
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(14, FLOOR_Y + 0.5); ctx.lineTo(W - 14, FLOOR_Y + 0.5);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var hx = 22; hx < W - 14; hx += 12) {
                ctx.moveTo(hx, FLOOR_Y + 1); ctx.lineTo(hx - 7, FLOOR_Y + 8);
            }
            ctx.stroke();
            ctx.fillStyle = GREY;
            ctx.textAlign = 'center';
            for (var m = 0; m <= 1.25; m += 0.25) {
                var sx = EDGE_X + m * PX_M;
                if (sx > W - 20) break;
                ctx.beginPath();
                ctx.moveTo(sx + 0.5, FLOOR_Y + 10); ctx.lineTo(sx + 0.5, FLOOR_Y + (m % 0.5 === 0 ? 18 : 14));
                ctx.strokeStyle = GREY;
                ctx.stroke();
                if (m % 0.5 === 0) ctx.fillText(fmt(m, 1) + ' m', sx, FLOOR_Y + 32);
            }

            // bordet: skiva + två ben
            ctx.fillStyle = '#d9c39a';
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.rect(24, TOP_Y - 6, EDGE_X - 24, 6);
            ctx.fill(); ctx.stroke();
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(38, TOP_Y); ctx.lineTo(38, FLOOR_Y);
            ctx.moveTo(EDGE_X - 12, TOP_Y); ctx.lineTo(EDGE_X - 12, FLOOR_Y);
            ctx.stroke();
            // höjdmått h = 0,80 m mellan benen
            ctx.strokeStyle = GREY;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(79.5, TOP_Y + 10); ctx.lineTo(79.5, FLOOR_Y - 10);
            ctx.stroke();
            ctx.fillStyle = GREY;
            ctx.beginPath(); ctx.moveTo(79.5, TOP_Y + 1); ctx.lineTo(76, TOP_Y + 10); ctx.lineTo(83, TOP_Y + 10); ctx.fill();
            ctx.beginPath(); ctx.moveTo(79.5, FLOOR_Y - 1); ctx.lineTo(76, FLOOR_Y - 10); ctx.lineTo(83, FLOOR_Y - 10); ctx.fill();
            ctx.fillStyle = INK;
            ctx.textAlign = 'center';
            ctx.font = 'italic 13px ' + FONT;
            ctx.fillText('h', 79.5, (TOP_Y + FLOOR_Y) / 2 - 4);
            ctx.font = '13px ' + FONT;
            ctx.fillText('0,80 m', 79.5, (TOP_Y + FLOOR_Y) / 2 + 14);

            // utskjutaren: låda med fjäder och tryckplatta
            var bx0 = 42, bx1 = xA0 - R - 6, by0 = TOP_Y - 6 - 30, by1 = TOP_Y - 6;
            ctx.fillStyle = '#b8bec6';
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.rect(bx0, by0, bx1 - bx0, by1 - by0);
            ctx.fill(); ctx.stroke();
            var plateX = pushOut ? xA0 - R - 1 : bx1 - 8;
            var sy = (by0 + by1) / 2;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(bx0 + 6, sy);
            var nseg = 9;
            for (var i = 1; i <= nseg; i++) {
                var zx = bx0 + 6 + (plateX - 3 - bx0 - 6) * i / nseg;
                ctx.lineTo(zx, sy + (i % 2 ? -7 : 7));
            }
            ctx.lineTo(plateX - 3, sy);
            ctx.stroke();
            ctx.fillStyle = INK;
            ctx.fillRect(plateX - 3, by0 + 4, 4, by1 - by0 - 8);
            // släppklon: arm över kanten + två klor
            var armY = by0;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(bx1, armY + 6); ctx.lineTo(xB0, armY + 6);
            ctx.stroke();
            var open = started ? 1 : 0;
            ctx.lineWidth = 2;
            [-1, 1].forEach(function (sgn) {
                var kx = xB0 + sgn * (R + 3);
                var ang = open ? sgn * 0.6 : 0;
                ctx.beginPath();
                ctx.moveTo(kx, armY + 6);
                ctx.lineTo(kx + Math.sin(ang) * 22, armY + 6 + Math.cos(ang) * 22);
                ctx.stroke();
            });

            // blixtbilder ("Visa spår"): par av lägen med lika tidsavstånd,
            // bundna med en streckad vågrät linje — samma höjd
            if (trailCb.checked && strobes.length) {
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1;
                strobes.forEach(function (s) {
                    ctx.strokeStyle = 'rgba(31,37,48,0.45)';
                    ctx.beginPath();
                    ctx.moveTo(Math.min(s.xA, s.xB), s.y + 0.5);
                    ctx.lineTo(Math.max(s.xA, s.xB), s.y + 0.5);
                    ctx.stroke();
                });
                ctx.setLineDash([]);
                strobes.forEach(function (s) {
                    ctx.beginPath(); ctx.arc(s.xA, s.y, R * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(192,57,43,0.22)'; ctx.fill();
                    ctx.strokeStyle = 'rgba(192,57,43,0.7)'; ctx.lineWidth = 1; ctx.stroke();
                    ctx.beginPath(); ctx.arc(s.xB, s.y, R * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(37,99,201,0.22)'; ctx.fill();
                    ctx.strokeStyle = 'rgba(37,99,201,0.7)'; ctx.stroke();
                });
            }

            // kulorna
            kula(a.x, a.y, RED);
            kula(b.x, b.y, BLUE);

            // hastighetspilar från kulans KANT (hastighet, inte kraft)
            if (velCb.checked && started && !landed) {
                var vy = G * t;
                K.pil(a.x + R, a.y, a.x + R + v0 * V_SCALE, a.y, RED, 3);
                K.pil(a.x, a.y + R, a.x, a.y + R + vy * V_SCALE, RED, 3);
                K.pil(b.x, b.y + R, b.x, b.y + R + vy * V_SCALE, BLUE, 3);
                ctx.fillStyle = RED;
                ctx.textAlign = 'left';
                ctx.font = 'italic 13px ' + FONT;
                ctx.fillText('v', a.x + R + v0 * V_SCALE + 6, a.y + 4);
                ctx.font = '10px ' + FONT;
                ctx.fillText('x', a.x + R + v0 * V_SCALE + 14, a.y + 8);
                if (vy * V_SCALE > 14) {
                    ctx.font = 'italic 13px ' + FONT;
                    ctx.fillText('v', a.x + 6, a.y + R + vy * V_SCALE + 2);
                    ctx.font = '10px ' + FONT;
                    ctx.fillText('y', a.x + 14, a.y + R + vy * V_SCALE + 6);
                    ctx.fillStyle = BLUE;
                    ctx.font = 'italic 13px ' + FONT;
                    ctx.fillText('v', b.x + 6, b.y + R + vy * V_SCALE + 2);
                    ctx.font = '10px ' + FONT;
                    ctx.fillText('y', b.x + 14, b.y + R + vy * V_SCALE + 6);
                }
            }

            // förklaring uppe till höger + tid
            ctx.font = '13px ' + FONT;
            ctx.textAlign = 'right';
            // förklaringen ligger till vänster om ljudknappen (uppe till höger)
            ctx.fillStyle = RED;
            ctx.fillText('skjuts vågrätt', W - 64, 24);
            ctx.fillStyle = BLUE;
            ctx.fillText('släpps', W - 64, 42);
            ctx.textAlign = 'center';
            ctx.fillStyle = INK;
            ctx.font = '15px ' + FONT;
            ctx.fillText('t = ' + fmt(t, 2) + ' s', W / 2, 30);

            // nedslaget: var landade den skjutna kulan?
            if (landed) {
                ctx.font = '13px ' + FONT;
                ctx.fillStyle = RED;
                ctx.textAlign = 'center';
                ctx.fillText('x = ' + fmt(v0 * T_LAND, 2) + ' m', a.x, FLOOR_Y - R * 2 - 6);
            }
        }

        function updateInfo() {
            if (landed) {
                info.textContent = 'Båda träffade golvet efter ' + fmt(T_LAND, 2) +
                    ' s. Den skjutna kulan hann ' + fmt(v0 * T_LAND, 2) + ' m ut.';
                info.classList.add('ms-brod');
            } else {
                info.classList.remove('ms-brod');
                info.textContent = started ? 'Falltid: ' + fmt(t, 2) + ' s' : '';
            }
        }

        // ── Loop ──────────────────────────────────────────────────────────
        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }
        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return started && (!landed || t < 0.1);
        }
        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }
        function syncUi() {
            startBtn.textContent = !started ? 'Skjut och släpp'
                                 : landed ? 'Skjut och släpp'
                                 : paused ? 'Fortsätt' : 'Pausa';
            v0Sl.disabled = started && !landed;
        }

        startBtn.addEventListener('click', function () {
            K.resumeAudio();
            if (!started || landed) {
                reset();
                v0 = parseFloat(v0Sl.value);
                started = true;
                K.small(2200, 0.35, 0.05);    // fjäderns smäll
            } else {
                paused = !paused;
            }
            syncUi();
            render();
            kick();
        });
        omBtn.addEventListener('click', reset);
        slowCb.addEventListener('change', kick);
        trailCb.addEventListener('change', render);
        velCb.addEventListener('change', render);
        v0Sl.addEventListener('input', function () {
            if (!started || landed) { v0 = parseFloat(v0Sl.value); if (landed) reset(); }
        });
        K.setOnFs(function () { render(); kick(); });
        window.addEventListener('resize', function () { K.resizeCanvas(); if (!running) render(); });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(K.card);
        }
        document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: kanonvagn
    // ══════════════════════════════════════════════════════════════════════
    // Den klassiska "kanonvagnen" ur fy2-1.8 (Kaströrelse): en vagn rullar
    // med konstant fart på en rak bana och avfyrar, när den passerar
    // avfyringsmärket, en boll RAKT UPP ur en fjäderkanon. Sedd från salen
    // följer bollen en kastparabel, men eftersom ingen kraft verkar i x-led
    // behåller den vagnens hastighet i x-led hela tiden — och landar i
    // tratten på vagnen, som under tiden rullat vidare. Bollen och tratten
    // har alltid samma x (streckad lodrät linje under flygningen).
    // "Visa spår" ritar bollens bana som prickar med lika tidsavstånd,
    // "Visa hastighet" ritar v_x och v_y på bollen och v på vagnen: v_x är
    // lika lång i varje ögonblick och lika med vagnens fart.
    function buildKanonvagn(node, cfg) {
        var W = 560, H = 430;
        var G = 9.82;
        var PX_M = 200;                       // px per meter
        var RAIL_Y = 352;                     // banans överkant
        var TRIG_X = 118;                     // avfyringsmärket
        var CART_W = 64, CART_H = 24, WHEEL_R = 7;
        var TUBE_W = 14, TUBE_H = 30;
        var R = 7;                            // bollradie
        var V_SCALE = 22;                     // px per m/s
        var TRAIL_DT = 0.04;
        var INK = '#1f2530', GREY = '#7c828c', RED = '#c0392b', BLUE = '#2563c9';

        var K = kastKort(node, cfg, W, H,
            'En vagn med en fjäderkanon rullar med konstant fart längs en bana ' +
            'på rutat papper. När vagnen passerar avfyringsmärket skjuts en ' +
            'boll rakt upp. Bollen följer en kastparabel men behåller vagnens ' +
            'hastighet i sidled och landar i tratten på vagnen.');
        var ctx = K.ctx;
        var startBtn = K.knapp('Starta vagnen', true);
        var omBtn = K.knapp('Börja om', false);
        var slowCb = K.kryss('Ultrarapid', false);
        var trailCb = K.kryss('Visa spår', true);
        var velCb = K.kryss('Visa hastighet', false);
        var info = K.infoRad();
        var vSl = K.glidare('Vagnens fart', 0, 2, 0.1, 1.0,
            function (v) { return fmt(v, 1) + ' m/s'; },
            'Vagnens fart i meter per sekund');
        var uSl = K.glidare('Kanonens utgångsfart', 2, 4, 0.1, 3.0,
            function (v) { return fmt(v, 1) + ' m/s'; },
            'Bollens utgångsfart rakt uppåt i meter per sekund');

        // ── Tillstånd ─────────────────────────────────────────────────────
        var X_START = 40;                     // vagnens mitt vid start
        var X_STOP = W - 52;                  // stannar här
        var cartX = X_START;
        var v = 1.0, u = 3.0;
        var started = false, paused = false, done = false;
        var fired = false, caught = false;
        var tFly = 0;                         // tid sedan avfyringen
        var fireX = 0;                        // vagnens x vid avfyringen
        var trail = [], nextTrail = 0;
        var running = false, visible = true, lastTs = 0, rafId = 0;
        var mouthY = RAIL_Y - WHEEL_R * 2 - CART_H - TUBE_H;   // trattens mynning

        function timeScale() { return slowCb.checked ? 0.25 : 1; }
        function tFlight() { return 2 * u / G; }
        function ballPos(tt) {
            return { x: fireX + v * tt * PX_M,
                     y: mouthY - R - (u * tt - 0.5 * G * tt * tt) * PX_M };
        }

        function reset() {
            started = false; paused = false; done = false;
            fired = false; caught = false; tFly = 0;
            cartX = X_START; trail = []; nextTrail = 0;
            syncUi(); render(); updateInfo();
        }

        function step(dt) {
            if (!started || done) return;
            cartX += v * dt * PX_M;
            if (!fired && cartX >= TRIG_X) {
                // avfyra exakt när märket passeras (ingen bildrutefördröjning)
                var over = (cartX - TRIG_X) / (v * PX_M || 1);
                fired = true;
                fireX = TRIG_X;
                tFly = v > 0 ? over : 0;
                K.small(1600, 0.45, 0.07);
            } else if (fired && !caught) {
                tFly += dt;
            }
            if (fired && !caught) {
                while (nextTrail <= Math.min(tFly, tFlight()) + 1e-9) {
                    var p = ballPos(nextTrail);
                    trail.push(p);
                    nextTrail += TRAIL_DT;
                }
                if (tFly >= tFlight()) {
                    caught = true;
                    tFly = tFlight();
                    cartX = fireX + v * tFly * PX_M;     // synka exakt
                    K.small(500, 0.7, 0.1);
                    syncUi();
                }
            }
            if (cartX >= X_STOP || (caught && v === 0)) {
                cartX = Math.min(cartX, X_STOP);
                done = true;
                syncUi();
            }
        }

        // ── Rendering ─────────────────────────────────────────────────────
        function render() {
            K.drawBackground();
            ctx.font = '13px ' + FONT;
            ctx.textBaseline = 'alphabetic';

            // banan
            ctx.strokeStyle = INK;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(14, RAIL_Y + 0.5); ctx.lineTo(W - 14, RAIL_Y + 0.5);
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var hx = 22; hx < W - 14; hx += 12) {
                ctx.moveTo(hx, RAIL_Y + 2); ctx.lineTo(hx - 7, RAIL_Y + 9);
            }
            ctx.stroke();
            // avfyringsmärket
            ctx.strokeStyle = GREY;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(TRIG_X + 0.5, RAIL_Y + 12); ctx.lineTo(TRIG_X + 0.5, RAIL_Y + 30);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = GREY;
            ctx.textAlign = 'center';
            ctx.fillText('avfyring', TRIG_X, RAIL_Y + 44);

            var cy = RAIL_Y - WHEEL_R;             // hjulens centrum
            var bodyTop = RAIL_Y - WHEEL_R * 2 - CART_H;
            var ball = fired ? (caught ? null : ballPos(tFly)) : null;

            // bollens spår
            if (trailCb.checked && trail.length) {
                trail.forEach(function (p) {
                    ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(192,57,43,0.45)'; ctx.fill();
                });
            }

            // vagnen: kaross, hjul, kanonrör med tratt
            ctx.fillStyle = '#d9c39a';
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.rect(cartX - CART_W / 2, bodyTop, CART_W, CART_H);
            ctx.fill(); ctx.stroke();
            [-1, 1].forEach(function (sgn) {
                var wx = cartX + sgn * (CART_W / 2 - 12);
                ctx.beginPath(); ctx.arc(wx, cy, WHEEL_R, 0, Math.PI * 2);
                ctx.fillStyle = '#b8bec6'; ctx.fill(); ctx.stroke();
                // eker som roterar med rullningen (v·t / r)
                var ang = (cartX - X_START) / WHEEL_R;
                ctx.beginPath();
                ctx.moveTo(wx - Math.cos(ang) * WHEEL_R, cy - Math.sin(ang) * WHEEL_R);
                ctx.lineTo(wx + Math.cos(ang) * WHEEL_R, cy + Math.sin(ang) * WHEEL_R);
                ctx.stroke();
            });
            // kanonröret
            ctx.fillStyle = '#b8bec6';
            ctx.beginPath();
            ctx.rect(cartX - TUBE_W / 2, mouthY + 8, TUBE_W, TUBE_H - 8);
            ctx.fill(); ctx.stroke();
            // tratten (öppen uppåt)
            ctx.fillStyle = '#b8bec6';
            ctx.beginPath();
            ctx.moveTo(cartX - TUBE_W / 2, mouthY + 8);
            ctx.lineTo(cartX - TUBE_W, mouthY - 2);
            ctx.lineTo(cartX + TUBE_W, mouthY - 2);
            ctx.lineTo(cartX + TUBE_W / 2, mouthY + 8);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            // bollen i röret före skottet / i tratten efter
            if (!fired || caught) {
                ctx.beginPath();
                ctx.arc(cartX, mouthY + (caught ? 2 : 12), R, 0, Math.PI * 2);
                ctx.fillStyle = RED; ctx.fill();
                ctx.strokeStyle = INK; ctx.lineWidth = 1.4; ctx.stroke();
            }

            // bollen i luften + streckad lodrät linje ned till tratten
            if (ball) {
                ctx.strokeStyle = 'rgba(31,37,48,0.5)';
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(ball.x + 0.5, ball.y + R + 2); ctx.lineTo(ball.x + 0.5, mouthY - 4);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath(); ctx.arc(ball.x, ball.y, R, 0, Math.PI * 2);
                ctx.fillStyle = RED; ctx.fill();
                ctx.strokeStyle = INK; ctx.lineWidth = 1.4; ctx.stroke();
                if (velCb.checked) {
                    var vy = u - G * tFly;           // positiv uppåt
                    if (v > 0) {
                        K.pil(ball.x + R, ball.y, ball.x + R + v * V_SCALE, ball.y, RED, 3);
                        ctx.fillStyle = RED; ctx.textAlign = 'left';
                        ctx.font = 'italic 13px ' + FONT;
                        ctx.fillText('v', ball.x + R + v * V_SCALE + 6, ball.y + 4);
                        ctx.font = '10px ' + FONT;
                        ctx.fillText('x', ball.x + R + v * V_SCALE + 14, ball.y + 8);
                    }
                    if (Math.abs(vy) * V_SCALE > 6) {
                        var y1 = vy > 0 ? ball.y - R : ball.y + R;
                        var y2 = y1 - vy * V_SCALE;
                        K.pil(ball.x, y1, ball.x, y2, RED, 3);
                        ctx.fillStyle = RED; ctx.textAlign = 'left';
                        ctx.font = 'italic 13px ' + FONT;
                        ctx.fillText('v', ball.x + 6, y2 + (vy > 0 ? -2 : 4));
                        ctx.font = '10px ' + FONT;
                        ctx.fillText('y', ball.x + 14, y2 + (vy > 0 ? 2 : 8));
                    }
                }
            }
            // vagnens hastighet
            if (velCb.checked && started && v > 0 && !done) {
                var fx = cartX + CART_W / 2;
                var fy = bodyTop + CART_H / 2;
                K.pil(fx, fy, fx + v * V_SCALE, fy, RED, 3);
                ctx.fillStyle = RED; ctx.textAlign = 'left';
                ctx.font = 'italic 13px ' + FONT;
                ctx.fillText('v', fx + v * V_SCALE + 6, fy + 4);
            }

            // tid
            ctx.textAlign = 'center';
            ctx.fillStyle = INK;
            ctx.font = '15px ' + FONT;
            if (fired) ctx.fillText('t = ' + fmt(Math.min(tFly, tFlight()), 2) + ' s efter skottet', W / 2, 30);
        }

        function updateInfo() {
            if (caught) {
                var s = v * tFlight();
                info.textContent = 'Träff i tratten! På ' + fmt(tFlight(), 2) +
                    ' s rullade vagnen ' + fmt(s, 2) + ' m, och bollen rörde sig lika långt i x-led.';
                info.classList.add('ms-brod');
            } else {
                info.classList.remove('ms-brod');
                info.textContent = started ? 'Vagnen: ' + fmt(v, 1) + ' m/s' : '';
            }
        }

        // ── Loop ──────────────────────────────────────────────────────────
        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            dt = Math.min(dt, 0.045) * timeScale();
            if (!paused) step(dt);
            render();
            updateInfo();
            if (shouldRun()) {
                running = true;
                rafId = requestAnimationFrame(frame);
            } else {
                running = false;
                lastTs = 0;
            }
        }
        function shouldRun() {
            if (!visible || document.hidden || paused) return false;
            return started && !done;
        }
        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }
        function syncUi() {
            startBtn.textContent = !started || done ? 'Starta vagnen'
                                 : paused ? 'Fortsätt' : 'Pausa';
            vSl.disabled = started && !done;
            uSl.disabled = started && !done;
        }

        startBtn.addEventListener('click', function () {
            K.resumeAudio();
            if (!started || done) {
                reset();
                v = parseFloat(vSl.value);
                u = parseFloat(uSl.value);
                started = true;
                if (v === 0) {
                    // vagnen står vid märket: skjut direkt
                    cartX = TRIG_X;
                }
            } else {
                paused = !paused;
            }
            syncUi();
            render();
            kick();
        });
        omBtn.addEventListener('click', reset);
        slowCb.addEventListener('change', kick);
        trailCb.addEventListener('change', render);
        velCb.addEventListener('change', render);
        vSl.addEventListener('input', function () { if (!started || done) { v = parseFloat(vSl.value); if (done) reset(); } });
        uSl.addEventListener('input', function () { if (!started || done) { u = parseFloat(uSl.value); if (done) reset(); } });
        K.setOnFs(function () { render(); kick(); });
        window.addEventListener('resize', function () { K.resizeCanvas(); if (!running) render(); });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(K.card);
        }
        document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });

        syncUi();
        render();
        updateInfo();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: galton — monterar visualiseringen ma2c-6.5 (Galtonbrädan)
    // ══════════════════════════════════════════════════════════════════════
    var galtonLaddning = null;
    function buildGalton(node) {
        var NYCKEL = 'ma2c-6.5';
        node.classList.add('lab-minisim-galton');
        function montera() {
            var vis = window.VISUALISERINGAR && window.VISUALISERINGAR[NYCKEL];
            if (!vis) { node.textContent = 'Kunde inte ladda Galtonbrädan.'; return; }
            var host = document.createElement('div');
            node.appendChild(host);
            vis.mount(host, { inbaddad: true });
        }
        if (window.VISUALISERINGAR && window.VISUALISERINGAR[NYCKEL]) { montera(); return; }
        if (!galtonLaddning) {
            galtonLaddning = new Promise(function (resolve) {
                var s = document.createElement('script');
                s.src = 'data/visualiseringar/' + NYCKEL + '.js?v=' + (window.__CB || '');
                s.onload = resolve;
                s.onerror = resolve;
                document.head.appendChild(s);
            });
        }
        galtonLaddning.then(montera);
    }

    /* typ: kalkylblad — animerat kalkylblad i Google Kalkylark-stil som
     * klickas fram steg för steg (textlösningen till Exempel 1 i ma1c-3.4).
     * Motorn ligger i minisim-kalkylblad.js och laddas först när blocket
     * finns på sidan, precis som Galtonbrädan. */
    var kalkylLaddning = null;
    function buildKalkylblad(node, cfg) {
        node.classList.add('lab-minisim-kalkylblad');
        function montera() {
            if (!window.FYSIKKALKYLBLAD) { node.textContent = 'Kunde inte ladda kalkylbladet.'; return; }
            window.FYSIKKALKYLBLAD.mount(node, cfg);
        }
        if (window.FYSIKKALKYLBLAD) { montera(); return; }
        if (!kalkylLaddning) {
            kalkylLaddning = new Promise(function (resolve) {
                var s = document.createElement('script');
                s.src = 'minisim-kalkylblad.js?v=' + (window.__CB || '');
                s.onload = resolve;
                s.onerror = resolve;
                document.head.appendChild(s);
            });
        }
        kalkylLaddning.then(montera);
    }

    /* typ: kopplade-fjadrar — en fjäder, två seriekopplade och två
     * parallellkopplade fjädrar bredvid varandra (fy2-2.2). Motorn ligger i
     * kopplade-fjadrar.js och delas med läget "Kopplade fjädrar" i
     * fysik2-hookes-lag-app.html; den laddas först när blocket finns. */
    var koppladeLaddning = null;
    function buildKoppladeFjadrar(node, cfg) {
        function montera() {
            if (!window.FYSIKKOPPLADEFJADRAR) { node.textContent = 'Kunde inte ladda simuleringen.'; return; }
            window.FYSIKKOPPLADEFJADRAR.mount(node, cfg);
        }
        if (window.FYSIKKOPPLADEFJADRAR) { montera(); return; }
        if (!koppladeLaddning) {
            koppladeLaddning = new Promise(function (resolve) {
                var s = document.createElement('script');
                s.src = 'kopplade-fjadrar.js?v=' + (window.__CB || '');
                s.onload = resolve;
                s.onerror = resolve;
                document.head.appendChild(s);
            });
        }
        koppladeLaddning.then(montera);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: lodlinje
    // ══════════════════════════════════════════════════════════════════════
    // fy2-1.3 (Stabilitet), stycket som definierar tyngdpunkt och lodlinje:
    // en oregelbunden träskiva hänger i en spik (upphängningspunkten). Ett
    // lod hänger i samma spik. Tyngdpunkten (grön prick) ritas ut med sin
    // lodlinje (streckad) och tyngdkraften F_G längs den. Man tar tag i
    // skivan och vrider den (eller använder glidaren): lodlinjen förblir
    // lodrät men hamnar vid sidan av upphängningspunkten, och när skivan
    // släpps svänger den tillbaka tills tyngdpunkten hänger rakt under
    // spiken, då lodlinjen och lodets snöre sammanfaller. "Rita av lodet"
    // ritar lodets snöre som en blyertslinje på skivan, och "Byt
    // upphängningspunkt" hänger skivan i nästa hål. Två linjer korsar
    // varandra i tyngdpunkten (det klassiska sättet att hitta den), vilket
    // syns bäst med "Visa tyngdpunkten" avbockad. Fysiken är en fysisk
    // pendel: alfa'' = −g·d/(k² + d²) · sin(alfa − alfa_jv) med dämpning,
    // där d är avståndet spik–tyngdpunkt och k skivans tröghetsradie kring
    // tyngdpunkten (räknad ur polygonen). Ritad i laboranstemat.
    function buildLodlinje(node, cfg) {
        var W = 560, H = 420;
        var NX = 280, NY = 64;             // spiken (upphängningspunkten)
        var GPX = 1500;                    // "g" i px/s²
        var DAMP = 1.1;                    // dämpning (1/s)
        var RAD = Math.PI / 180;
        var INK = '#1f2530';
        var COL_TP = '#2e9e4f';
        var COL_FG = '#2563c9';
        var BOB_Y = 372;                   // lodets spets

        // Skivan: oregelbunden polygon, flyttas så att tyngdpunkten
        // (arean-centroiden) hamnar i origo.
        var RAW = [[-96, -46], [-18, -98], [70, -84], [128, -6],
                   [92, 64], [6, 92], [-62, 70], [-118, 22]];
        var poly = (function () {
            var A = 0, cx = 0, cy = 0, i, n = RAW.length;
            for (i = 0; i < n; i++) {
                var p = RAW[i], q = RAW[(i + 1) % n];
                var cr = p[0] * q[1] - q[0] * p[1];
                A += cr; cx += (p[0] + q[0]) * cr; cy += (p[1] + q[1]) * cr;
            }
            A /= 2; cx /= 6 * A; cy /= 6 * A;
            return RAW.map(function (p) { return [p[0] - cx, p[1] - cy]; });
        })();
        // tröghetsradie² kring tyngdpunkten (polär andra moment / area)
        var K2 = (function () {
            var A = 0, J = 0, n = poly.length;
            for (var i = 0; i < n; i++) {
                var p = poly[i], q = poly[(i + 1) % n];
                var cr = p[0] * q[1] - q[0] * p[1];
                A += cr / 2;
                J += cr * (p[0] * p[0] + p[0] * q[0] + q[0] * q[0] +
                           p[1] * p[1] + p[1] * q[1] + q[1] * q[1]) / 12;
            }
            return J / A;
        })();
        // Tre hål nära kanten, en bit in från hörnen
        var HOLES = [1, 3, 6].map(function (i) {
            var p = poly[i], L = Math.hypot(p[0], p[1]);
            return [p[0] * (L - 20) / L, p[1] * (L - 20) / L];
        });

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        if (cfg.titel) {
            var t = document.createElement('div');
            t.className = 'minisim-title';
            t.textContent = cfg.titel;
            card.appendChild(t);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En oregelbunden träskiva hänger i en spik, och ett lod hänger i ' +
            'samma spik. Skivans tyngdpunkt är en grön prick, och lodlinjen ' +
            'genom den är streckad, med tyngdkraften längs linjen. Vrid ' +
            'skivan och släpp: lodlinjen är alltid lodrät, och skivan ' +
            'svänger tillbaka tills tyngdpunkten hänger rakt under spiken. ' +
            'Då sammanfaller lodlinjen med lodets snöre.');
        canvas.style.touchAction = 'pan-y';
        scene.appendChild(canvas);

        var ICON_EXPAND =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var ICON_COMPRESS =
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        var fsBtn = document.createElement('button');
        fsBtn.type = 'button';
        fsBtn.className = 'minisim-fsbtn';
        fsBtn.setAttribute('aria-label', 'Fullskärm');
        fsBtn.title = 'Fullskärm';
        fsBtn.innerHTML = ICON_EXPAND;
        scene.appendChild(fsBtn);
        card.appendChild(scene);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        function mkBtn(txt, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
            b.textContent = txt;
            controls.appendChild(b);
            return b;
        }
        var ritaBtn = mkBtn('Rita av lodet', 'ms-primar');
        var bytBtn = mkBtn('Byt upphängningspunkt');
        var omBtn = mkBtn('Börja om');
        card.appendChild(controls);

        // Visningsval på egen rad: varje del av figuren kan tändas och
        // släckas för sig (alla tända från början).
        var checks = document.createElement('div');
        checks.className = 'minisim-controls';
        function mkCheck(txt) {
            var l = document.createElement('label');
            l.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = true;
            l.appendChild(cb);
            l.appendChild(document.createTextNode(txt));
            checks.appendChild(l);
            return cb;
        }
        var tpCb = mkCheck('Visa tyngdpunkten');
        var llCb = mkCheck('Visa lodlinjen');
        var fgCb = mkCheck('Visa tyngdkraften');
        var lodCb = mkCheck('Visa lod');
        var etCb = mkCheck('Visa etiketter');
        var ALLA_CB = [tpCb, llCb, fgCb, lodCb, etCb];
        var info = document.createElement('span');
        info.className = 'minisim-info ms-brod';
        checks.appendChild(info);
        card.appendChild(checks);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.textContent = 'Vrid skivan';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '-90';
        slider.max = '90';
        slider.step = '1';
        slider.value = '0';
        slider.setAttribute('aria-label',
            'Vrid skivan kring spiken, i grader från jämviktsläget. Skivan släpps när du släpper glidaren.');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        var ctx = canvas.getContext('2d');
        function resizeCanvas() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var cssW = canvas.clientWidth || W;
            var scale = cssW / W * dpr;
            var bw = Math.round(W * scale), bh = Math.round(H * scale);
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw;
                canvas.height = bh;
            }
            ctx.setTransform(scale, 0, 0, scale, 0, 0);
        }
        resizeCanvas();

        // ── Tillstånd ─────────────────────────────────────────────────────
        var hole = 0;                      // index i HOLES
        var alpha = 0;                     // skivans vridning (rad, canvas-medurs positiv)
        var omega = 0;                     // vinkelfart (rad/s)
        var held = false;                  // handen (drag/glidare) håller skivan
        var lines = [];                    // avritade lodlinjer i skivans system
        var running = false, visible = true, lastTs = 0, rafId = 0;

        function hp() { return HOLES[hole]; }
        function dist() { var h = hp(); return Math.hypot(h[0], h[1]); }
        // jämviktsvinkeln: tyngdpunkten rakt under spiken
        function alphaEq() { var h = hp(); return Math.PI / 2 - Math.atan2(-h[1], -h[0]); }
        function wrap(a) {
            while (a > Math.PI) a -= 2 * Math.PI;
            while (a < -Math.PI) a += 2 * Math.PI;
            return a;
        }
        function dev() { return wrap(alpha - alphaEq()); }
        // skivans lokala punkt → världen
        function toWorld(p) {
            var h = hp(), c = Math.cos(alpha), s = Math.sin(alpha);
            var x = p[0] - h[0], y = p[1] - h[1];
            return { x: NX + x * c - y * s, y: NY + x * s + y * c };
        }
        function toLocal(x, y) {
            var h = hp(), c = Math.cos(alpha), s = Math.sin(alpha);
            var dx = x - NX, dy = y - NY;
            return [dx * c + dy * s + h[0], -dx * s + dy * c + h[1]];
        }
        function cog() { return toWorld([0, 0]); }
        function atRest() { return !held && Math.abs(dev()) < 0.6 * RAD && Math.abs(omega) < 0.05; }

        // ── Rendering ─────────────────────────────────────────────────────
        function drawBackground() {
            var g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, '#f7f2e8');
            g.addColorStop(1, '#ece3d2');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(96,130,175,0.20)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = 26; x < W; x += 26) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); }
            for (var y = 26; y < H; y += 26) { ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); }
            ctx.stroke();
        }
        function drawStand() {
            // stativarm från höger kant fram till spiken
            ctx.fillStyle = '#9aa2ad';
            ctx.strokeStyle = '#5a616b';
            ctx.lineWidth = 1.4;
            ctx.fillRect(NX - 16, NY - 30, W - NX + 20, 12);
            ctx.strokeRect(NX - 16, NY - 30, W - NX + 20, 12);
            // spikens hållare ned till spiken
            ctx.fillRect(NX - 3, NY - 18, 6, 16);
            ctx.strokeRect(NX - 3, NY - 18, 6, 16);
        }
        function platePath() {
            ctx.beginPath();
            for (var i = 0; i < poly.length; i++) {
                var w = toWorld(poly[i]);
                if (i === 0) ctx.moveTo(w.x, w.y); else ctx.lineTo(w.x, w.y);
            }
            ctx.closePath();
        }
        function drawPlate() {
            platePath();
            ctx.fillStyle = '#e8d3ae';
            ctx.fill();
            // träådring och blyertslinjer klipps till skivan
            ctx.save();
            platePath();
            ctx.clip();
            ctx.strokeStyle = 'rgba(138,106,58,0.30)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var k = -4; k <= 4; k++) {
                var a = toWorld([-160, k * 24 + 6]), b = toWorld([160, k * 24 - 6]);
                ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            }
            ctx.stroke();
            ctx.strokeStyle = '#4a4f57';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            for (var j = 0; j < lines.length; j++) {
                var L = lines[j];
                var p0 = toWorld([L.px - L.dx * 400, L.py - L.dy * 400]);
                var p1 = toWorld([L.px + L.dx * 400, L.py + L.dy * 400]);
                ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y);
            }
            ctx.stroke();
            ctx.restore();
            platePath();
            ctx.strokeStyle = '#8a6a3a';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.stroke();
            // hålen
            for (var i = 0; i < HOLES.length; i++) {
                var w = toWorld(HOLES[i]);
                ctx.fillStyle = '#c9b38b';
                ctx.strokeStyle = '#8a6a3a';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(w.x, w.y, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        }
        function drawLod() {
            ctx.strokeStyle = '#3a4049';
            ctx.lineWidth = 1.2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(NX, NY);
            ctx.lineTo(NX, BOB_Y - 26);
            ctx.stroke();
            // lodet: mässingskropp med spets nedåt
            ctx.fillStyle = '#c9a24a';
            ctx.strokeStyle = '#7a5d1e';
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(NX - 4, BOB_Y - 26);
            ctx.lineTo(NX + 4, BOB_Y - 26);
            ctx.lineTo(NX + 9, BOB_Y - 14);
            ctx.lineTo(NX, BOB_Y);
            ctx.lineTo(NX - 9, BOB_Y - 14);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            if (!etCb.checked) return;
            ctx.fillStyle = INK;
            ctx.font = '15px ' + FONT;
            ctx.textAlign = 'left';
            ctx.fillText('Lod', NX + 14, BOB_Y - 8);
        }
        function drawNail() {
            ctx.fillStyle = '#d13b2e';
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(NX, NY, 3.6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            if (!etCb.checked) return;
            ctx.fillStyle = INK;
            ctx.font = '15px ' + FONT;
            ctx.textAlign = 'left';
            ctx.fillText('Upphängningspunkt', NX + 16, NY - 38);
        }
        // Etiketterna läggs på den sida som vänder bort från lodets snöre
        function cogSide() {
            var c = cog();
            return (c.x - NX >= 4) ? 1 : -1;
        }
        function drawLodlinje() {
            if (!llCb.checked) return;
            var c = cog(), side = cogSide();
            // streckad lodrät linje genom tyngdpunkten, hela höjden
            ctx.strokeStyle = COL_TP;
            ctx.lineWidth = 2;
            ctx.setLineDash([7, 5]);
            ctx.beginPath();
            ctx.moveTo(c.x, 0);
            ctx.lineTo(c.x, H);
            ctx.stroke();
            ctx.setLineDash([]);
            if (!etCb.checked) return;
            ctx.fillStyle = COL_TP;
            ctx.font = '600 15px ' + FONT;
            ctx.textAlign = side > 0 ? 'left' : 'right';
            ctx.fillText('Lodlinje', c.x + side * 8, H - 14);
        }
        function drawFG() {
            if (!fgCb.checked) return;
            var c = cog(), side = cogSide();
            var len = 70, head = 11, endY = c.y + len;
            ctx.strokeStyle = COL_FG;
            ctx.lineWidth = 3.2;
            ctx.lineCap = 'butt';
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(c.x, endY - head);
            ctx.stroke();
            ctx.fillStyle = COL_FG;
            ctx.beginPath();
            ctx.moveTo(c.x, endY);
            ctx.lineTo(c.x - 5.5, endY - head);
            ctx.lineTo(c.x + 5.5, endY - head);
            ctx.closePath();
            ctx.fill();
            // F_G vid spetsen (beteckningen hör till pilen, inte till etiketterna)
            ctx.font = 'italic 17px ' + FONT;
            var lx = c.x + side * 10, ly = endY + 2;
            var fw = ctx.measureText('F').width;
            ctx.textAlign = 'left';
            if (side > 0) {
                ctx.fillText('F', lx, ly);
                ctx.font = '12px ' + FONT;
                ctx.fillText('G', lx + fw + 1, ly + 4);
            } else {
                ctx.font = '12px ' + FONT;
                var gw = ctx.measureText('G').width;
                ctx.fillText('G', lx - gw, ly + 4);
                ctx.font = 'italic 17px ' + FONT;
                ctx.fillText('F', lx - gw - 1 - fw, ly);
            }
        }
        function drawCog() {
            if (!tpCb.checked) return;
            var c = cog(), side = cogSide();
            ctx.fillStyle = COL_TP;
            ctx.strokeStyle = INK;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(c.x, c.y, 5.5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            if (!etCb.checked) return;
            // "Tyngdpunkt" utanför skivan (inte på träet), med en tunn
            // ledlinje till pricken, på sidan bort från lodets snöre
            ctx.font = '15px ' + FONT;
            var tw = ctx.measureText('Tyngdpunkt').width;
            var ext = c.x;
            for (var i = 0; i < poly.length; i++) {
                var w = toWorld(poly[i]);
                ext = side > 0 ? Math.max(ext, w.x) : Math.min(ext, w.x);
            }
            var tx = ext + side * 16;
            if (side < 0 && tx - tw < 6) { side = 1; tx = c.x + 12; }
            if (side > 0 && tx + tw > W - 6) tx = Math.max(c.x + 12, W - 6 - tw);
            var ty = c.y - 14;
            ctx.strokeStyle = 'rgba(31,37,48,0.7)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(c.x + side * 7, c.y - 2);
            ctx.lineTo(tx - side * 4, ty - 5);
            ctx.stroke();
            ctx.fillStyle = INK;
            ctx.textAlign = side > 0 ? 'left' : 'right';
            ctx.fillText('Tyngdpunkt', tx, ty);
        }
        function render() {
            drawBackground();
            drawStand();
            drawPlate();
            drawLodlinje();
            drawFG();
            drawCog();
            if (lodCb.checked) drawLod();
            drawNail();
        }

        function updateInfo() {
            var d = dev() / RAD;
            sliderVal.textContent = fmt(d, 0).replace('-', '−') + '°';
            var txt;
            if (atRest()) {
                if (!tpCb.checked && lodCb.checked)
                    txt = 'Skivan hänger still. Rita av lodet, byt upphängningspunkt och rita igen: där linjerna korsar varandra ligger tyngdpunkten.';
                else if (lodCb.checked)
                    txt = 'Skivan hänger still: tyngdpunkten ligger rakt under upphängningspunkten, och lodlinjen sammanfaller med lodets snöre.';
                else
                    txt = 'Skivan hänger still: tyngdpunkten ligger rakt under upphängningspunkten.';
            } else if (held) {
                txt = 'Lodlinjen är fortfarande lodrät men går vid sidan av upphängningspunkten. Släpp, så vrider tyngdkraften tillbaka skivan.';
            } else {
                txt = 'Skivan svänger tills tyngdpunkten hänger rakt under upphängningspunkten.';
            }
            if (lines.length >= 2) txt += ' Linjerna på skivan korsar varandra i tyngdpunkten.';
            info.textContent = txt;
            ritaBtn.disabled = !atRest() || !lodCb.checked;
        }

        // ── Fysik ─────────────────────────────────────────────────────────
        function step(dt) {
            if (held) return;
            var d = dist();
            var w2 = GPX * d / (K2 + d * d);
            var n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
            for (var i = 0; i < n; i++) {
                omega += (-w2 * Math.sin(dev()) - DAMP * omega) * h;
                alpha += omega * h;
            }
            if (Math.abs(dev()) < 0.05 * RAD && Math.abs(omega) < 0.01) {
                alpha = alphaEq();
                omega = 0;
            }
        }
        function shouldRun() {
            return visible && !document.hidden && !held &&
                   (Math.abs(dev()) > 0 || Math.abs(omega) > 0);
        }
        function frame(ts) {
            rafId = 0;
            var dt = lastTs ? (ts - lastTs) / 1000 : 0.016;
            lastTs = ts;
            step(Math.min(dt, 0.045));
            render();
            updateInfo();
            if (shouldRun()) { running = true; rafId = requestAnimationFrame(frame); }
            else { running = false; lastTs = 0; }
        }
        function kick() {
            if (running || rafId) return;
            lastTs = 0;
            running = true;
            rafId = requestAnimationFrame(frame);
        }
        function redraw() { render(); updateInfo(); }

        // ── Knappar och glidare ───────────────────────────────────────────
        ritaBtn.addEventListener('click', function () {
            if (!atRest()) return;
            // lodets snöre (lodrätt genom spiken) i skivans eget system
            var a = toLocal(NX, NY), b = toLocal(NX, NY + 1);
            lines.push({ px: a[0], py: a[1], dx: b[0] - a[0], dy: b[1] - a[1] });
            redraw();
        });
        bytBtn.addEventListener('click', function () {
            // skivan behåller sin vridning men hängs i nästa hål och svänger
            hole = (hole + 1) % HOLES.length;
            omega = 0;
            held = false;
            slider.value = '0';
            redraw();
            kick();
        });
        omBtn.addEventListener('click', function () {
            hole = 0;
            lines = [];
            held = false;
            omega = 0;
            alpha = alphaEq();
            slider.value = '0';
            ALLA_CB.forEach(function (cb) { cb.checked = true; });
            redraw();
        });
        ALLA_CB.forEach(function (cb) { cb.addEventListener('change', redraw); });
        slider.addEventListener('input', function () {
            held = true;
            omega = 0;
            alpha = alphaEq() + parseFloat(slider.value) * RAD;
            redraw();
        });
        slider.addEventListener('change', function () {
            held = false;
            slider.value = '0';
            redraw();
            kick();
        });

        // ── Ta tag i skivan och vrid den kring spiken ─────────────────────
        var dragging = false, dragPtr = -1, lastAng = 0;
        function logicalPos(e) {
            var r = canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) * W / r.width,
                     y: (e.clientY - r.top) * H / r.height };
        }
        function overPlate(p) {
            // punkt-i-polygon i skivans eget system
            var q = toLocal(p.x, p.y), inside = false;
            for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                var a = poly[i], b = poly[j];
                if ((a[1] > q[1]) !== (b[1] > q[1]) &&
                    q[0] < (b[0] - a[0]) * (q[1] - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
            }
            return inside && Math.hypot(p.x - NX, p.y - NY) > 14;
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logicalPos(e);
            if (!overPlate(p)) return;
            e.preventDefault();
            dragging = true;
            dragPtr = e.pointerId;
            held = true;
            omega = 0;
            lastAng = Math.atan2(p.y - NY, p.x - NX);
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = 'grabbing';
            redraw();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logicalPos(e);
            if (!dragging) {
                canvas.style.cursor = overPlate(p) ? 'grab' : 'default';
                return;
            }
            if (e.pointerId !== dragPtr) return;
            var a = Math.atan2(p.y - NY, p.x - NX);
            alpha += wrap(a - lastAng);
            lastAng = a;
            slider.value = String(Math.max(-90, Math.min(90, dev() / RAD)));
            redraw();
        });
        function endDrag(e) {
            if (!dragging || e.pointerId !== dragPtr) return;
            dragging = false;
            dragPtr = -1;
            held = false;
            canvas.style.cursor = 'default';
            slider.value = '0';
            redraw();
            kick();
        }
        canvas.addEventListener('pointerup', endDrag);
        canvas.addEventListener('pointercancel', endDrag);

        // ── Fullskärm ─────────────────────────────────────────────────────
        function isFs() {
            return document.fullscreenElement === card ||
                   document.webkitFullscreenElement === card;
        }
        fsBtn.addEventListener('click', function () {
            if (!isFs()) (card.requestFullscreen || card.webkitRequestFullscreen).call(card);
            else (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        });
        function onFsChange() {
            var fs = isFs();
            fsBtn.innerHTML = fs ? ICON_COMPRESS : ICON_EXPAND;
            fsBtn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
            resizeCanvas();
            render();
        }
        document.addEventListener('fullscreenchange', onFsChange);
        document.addEventListener('webkitfullscreenchange', onFsChange);
        window.addEventListener('resize', function () { resizeCanvas(); if (!running) render(); });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                visible = entries[0].isIntersecting;
                if (visible) kick();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        document.addEventListener('visibilitychange', function () { if (!document.hidden) kick(); });
        if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
            document.fonts.ready.then(function () { render(); });
        }

        // Test-handtag för skärmdumpsskript: vrid skivan (grader från
        // jämvikt) och håll den, välj hål, rita av linjer.
        card._set = function (devDeg, holeIx, nLines) {
            lines = [];
            for (var i = 0; i < (nLines || 0); i++) {
                hole = i % HOLES.length;
                alpha = alphaEq();
                var a = toLocal(NX, NY), b = toLocal(NX, NY + 1);
                lines.push({ px: a[0], py: a[1], dx: b[0] - a[0], dy: b[1] - a[1] });
            }
            hole = holeIx || 0;
            alpha = alphaEq() + (devDeg || 0) * RAD;
            omega = 0;
            held = !!devDeg;
            redraw();
        };

        alpha = alphaEq();
        redraw();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: hjulprojektion
    // ══════════════════════════════════════════════════════════════════════
    // Demonstrationen ur fy2-2.3 (Harmonisk svängning): ett stift på ett
    // snurrande cykelhjul belyses från sidan, och stiftets skugga på väggen
    // rör sig upp och ned exakt i takt med vikten i fjädern bredvid.
    // Stiftet sitter på radien A, hjulet vrids med vinkelhastigheten ω, och
    // vinkeln α = ω · t räknas från den vågräta radien (som i genomgångens
    // härledningsfigur), så att y = A · sin(ω · t). En streckad vågrät linje
    // binder stift, skugga, vikt och grafens aktuella punkt till samma höjd.
    // Fullskärmsknapp för SVG-scenerna (hjulprojektion, svangningsgrafer):
    // samma ikon och plats som .fs-btn, kortet går i fullskärm och scenen
    // skalas efter höjden (CSS-klassen ms-svgfs).
    function msFullskarm(card, scene, asp, ctrlH) {
        var UT = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 9V3h6"/><path d="M21 9V3h-6"/><path d="M3 15v6h6"/><path d="M21 15v6h-6"/></svg>';
        var IN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M9 3v6H3"/><path d="M15 21v-6h6"/><path d="M21 9h-6V3"/><path d="M3 15h6v6"/></svg>';
        card.classList.add('ms-svgfs');
        card.style.setProperty('--ms-asp', String(asp));
        if (ctrlH) card.style.setProperty('--ms-fs-ctrl', ctrlH + 'px');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'minisim-fsbtn';
        btn.setAttribute('aria-label', 'Fullskärm');
        btn.title = 'Fullskärm';
        btn.innerHTML = UT;
        scene.appendChild(btn);
        function arFs() { return (document.fullscreenElement || document.webkitFullscreenElement) === card; }
        btn.addEventListener('click', function () {
            if (!arFs()) {
                var req = card.requestFullscreen || card.webkitRequestFullscreen;
                if (req) { try { var pr = req.call(card); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} }
            } else {
                (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            }
        });
        function byt() {
            var fs = arFs();
            btn.innerHTML = fs ? IN : UT;
            btn.title = fs ? 'Lämna fullskärm' : 'Fullskärm';
        }
        document.addEventListener('fullscreenchange', byt);
        document.addEventListener('webkitfullscreenchange', byt);
    }

    var hpRaknare = 0;
    function buildHjulprojektion(node, cfg) {
        var INK = '#1f2530', GREY = '#9aa0a6', BLA = '#2563c9', RUTA = '#2563c9', AXEL = '#38bdf8';
        var CY = 150, A = 80;                    // jämviktsläge och amplitud (px)
        var HX = 120, RIM = 96;                  // hjulets nav och däckets radie
        var VX = 250;                            // väggens mitt
        var FX = 320, FTAK = 24;                 // fjäderns fäste
        var MW = 32, MH = 26;                    // viktens mått
        var GX0 = 384, GX1 = 584, FONSTER = 6;   // grafens t-axel (px) och tidsfönster (s)
        var T = 2;                               // periodtid (s)
        var alfa = 0, tid = 0, spelar = false;
        var visaVinkel = true, visaGraf = true;
        var hist = [];                           // [{t, y}] för grafen
        var id = 'ms-hp-rutnat-' + (++hpRaknare);

        function r1(v) { return Math.round(v * 10) / 10; }
        function fmt(v, d) {
            var s = v.toFixed(d);
            if (parseFloat(s) === 0) return '0';
            return s.replace('.', ',').replace('-', '−');
        }
        function lbl(x, y, anchor, inner, size, color) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '">' + inner + '</text>';
        }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }

        // ── Fast bakgrund: rutnät, referenslinjer, vägg, tak, axlar ──────
        var bas = '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="' + RUTA + '" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="-60" y="0" width="660" height="290" fill="url(#' + id + ')"/>';
        // lampan till vänster och ljuskäglan mot hjulet och väggen: det är
        // den som kastar stiftets skugga på väggen
        bas += '<defs><linearGradient id="' + id + '-ljus" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0" stop-color="#f6c84c" stop-opacity="0.55"/>' +
            '<stop offset="1" stop-color="#f6c84c" stop-opacity="0.16"/></linearGradient></defs>';
        bas += '<g class="ms-hp-lampa">';
        bas += '<polygon points="-12,124 ' + (VX - 7) + ',44 ' + (VX - 7) + ',256 -12,176" fill="url(#' + id + '-ljus)"/>';
        bas += '<line x1="-26" y1="170" x2="-26" y2="252" stroke="#3d434d" stroke-width="3"/>' +
            '<rect x="-44" y="250" width="36" height="6" rx="2" fill="#3d434d"/>' +
            '<polygon points="-42,138 -14,124 -14,176 -42,162" fill="#4a515c" stroke="#2b2f36" stroke-width="1.4" stroke-linejoin="round"/>' +
            '<rect x="-48" y="136" width="8" height="28" rx="2" fill="#2b2f36"/>' +
            '<line x1="-13" y1="125" x2="-13" y2="175" stroke="#f2b632" stroke-width="4" stroke-linecap="round"/>';
        bas += lbl(-26, 276, 'middle', 'Lampa', 13, '#6a7180') + '</g>';
        [CY - A, CY, CY + A].forEach(function (yy) {
            bas += '<line x1="262" y1="' + yy + '" x2="' + GX1 + '" y2="' + yy + '" stroke="' + GREY +
                '" stroke-width="1" stroke-dasharray="5 4" opacity="0.8"/>';
        });
        // väggen som skuggan faller på
        bas += '<rect x="' + (VX - 7) + '" y="44" width="14" height="212" fill="#e3dccd" stroke="#b9ae97" stroke-width="1"/>';
        bas += lbl(VX, 276, 'middle', 'Vägg', 13, '#6a7180');
        // fjäderns tak med skraffering
        bas += '<line x1="' + (FX - 30) + '" y1="' + FTAK + '" x2="' + (FX + 30) + '" y2="' + FTAK + '" stroke="' + INK + '" stroke-width="1.8"/>';
        for (var hx = FX - 26; hx <= FX + 28; hx += 8) {
            bas += '<line x1="' + hx + '" y1="' + FTAK + '" x2="' + (hx - 7) + '" y2="' + (FTAK - 7) +
                '" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>';
        }
        // grafens axlar: pilspets bara åt det positiva hållet
        var graf = '<line x1="' + GX0 + '" y1="250" x2="' + GX0 + '" y2="52" stroke="' + AXEL + '" stroke-width="1.6"/>' +
            '<polygon points="' + (GX0 - 4) + ',52 ' + GX0 + ',42 ' + (GX0 + 4) + ',52" fill="' + AXEL + '"/>' +
            '<line x1="' + GX0 + '" y1="' + CY + '" x2="' + (GX1 + 2) + '" y2="' + CY + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
            '<polygon points="' + (GX1 + 2) + ',' + (CY - 4) + ' ' + (GX1 + 12) + ',' + CY + ' ' + (GX1 + 2) + ',' + (CY + 4) + '" fill="' + AXEL + '"/>' +
            lbl(GX0 - 7, 50, 'end', it('y'), 15) +
            lbl(GX1 + 12, CY + 20, 'end', it('t'), 15) +
            lbl(GX0 - 6, CY - A + 5, 'end', it('A'), 14) +
            lbl(GX0 - 6, CY + 5, 'end', '0', 14) +
            lbl(GX0 - 6, CY + A + 5, 'end', '−' + it('A'), 14) +
            lbl(GX1 + 10, 32, 'end', it('y') + ' = ' + it('A') + ' · sin(' + it('ω') + ' · ' + it('t') + ')', 14, BLA);

        function fjader(yTopp) {
            // ledare, tio jämna varv, ledare
            var y0 = FTAK, y1 = yTopp, L = y1 - y0, led = 6, n = 10;
            var pts = [FX + ',' + r1(y0), FX + ',' + r1(y0 + led)];
            var spole = L - 2 * led;
            for (var i = 0; i < n * 2; i++) {
                var yy = y0 + led + spole * (i + 0.5) / (n * 2);
                pts.push(r1(FX + (i % 2 ? -11 : 11)) + ',' + r1(yy));
            }
            pts.push(FX + ',' + r1(y1 - led), FX + ',' + r1(y1));
            return '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#7c828c" stroke-width="1.6" stroke-linejoin="round"/>';
        }

        function rita() {
            var s = '';
            var yv = A * Math.sin(alfa);            // elongation i px, uppåt positiv
            var yy = CY - yv;                        // skärmkoordinat
            var px = HX + A * Math.cos(alfa);
            // grafens punkt
            var gx = null, gy = yy;
            if (visaGraf) {
                var t0 = Math.max(0, tid - FONSTER);
                gx = GX0 + (tid - t0) / FONSTER * (GX1 - GX0);
            }
            // ljusstrålen/höjdlinjen: stift → skugga → vikt → graf
            s += '<line x1="' + r1(px) + '" y1="' + r1(yy) + '" x2="' + r1(gx !== null ? gx : FX + MW / 2) + '" y2="' + r1(yy) +
                '" stroke="' + BLA + '" stroke-width="1.2" stroke-dasharray="4 3" opacity="0.85"/>';
            // hjulet: däck, fälg, ekrar som vrids med α, nav
            s += '<circle cx="' + HX + '" cy="' + CY + '" r="' + RIM + '" fill="none" stroke="#2b2f36" stroke-width="7"/>';
            s += '<circle cx="' + HX + '" cy="' + CY + '" r="' + (RIM - 7) + '" fill="none" stroke="#8b929c" stroke-width="2"/>';
            for (var k = 0; k < 16; k++) {
                var v = alfa + k * Math.PI / 8;
                s += '<line x1="' + r1(HX + 9 * Math.cos(v)) + '" y1="' + r1(CY - 9 * Math.sin(v)) +
                    '" x2="' + r1(HX + (RIM - 8) * Math.cos(v)) + '" y2="' + r1(CY - (RIM - 8) * Math.sin(v)) +
                    '" stroke="#a9afb8" stroke-width="1"/>';
            }
            s += '<circle cx="' + HX + '" cy="' + CY + '" r="9" fill="#d6d0c3" stroke="' + INK + '" stroke-width="1.4"/>';
            // vinkeln α: vågrät radie, radie till stiftet, båge
            if (visaVinkel) {
                var am = ((alfa % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                s += '<line x1="' + HX + '" y1="' + CY + '" x2="' + (HX + A) + '" y2="' + CY + '" stroke="' + INK + '" stroke-width="1.2" stroke-dasharray="3 3"/>';
                s += '<line x1="' + HX + '" y1="' + CY + '" x2="' + r1(px) + '" y2="' + r1(yy) + '" stroke="' + INK + '" stroke-width="2"/>';
                if (am > 0.12) {
                    var pts = [], N = Math.max(4, Math.ceil(am / 0.08));
                    for (var i = 0; i <= N; i++) {
                        var a = am * i / N;
                        pts.push(r1(HX + 26 * Math.cos(a)) + ',' + r1(CY - 26 * Math.sin(a)));
                    }
                    s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>';
                    if (am > 0.4) {
                        var b = am / 2;
                        s += lbl(HX + 40 * Math.cos(b), CY - 40 * Math.sin(b) + 5, 'middle', it('α'), 15);
                    }
                }
                // etiketten A längs radien, på sidan bort från bågen
                var nx = -Math.sin(alfa), ny = -Math.cos(alfa);
                s += lbl(HX + 0.62 * A * Math.cos(alfa) + nx * 11, CY - 0.62 * A * Math.sin(alfa) + ny * 11 + 5, 'middle', it('A'), 14);
            }
            // stiftet
            s += '<circle cx="' + r1(px) + '" cy="' + r1(yy) + '" r="6.5" fill="' + BLA + '" stroke="#163f86" stroke-width="1.4"/>';
            // skuggan på väggen
            s += '<ellipse cx="' + VX + '" cy="' + r1(yy) + '" rx="5" ry="7" fill="rgba(15,22,32,0.62)"/>';
            // fjädern och vikten
            s += fjader(yy - MH / 2);
            s += '<rect x="' + (FX - MW / 2) + '" y="' + r1(yy - MH / 2) + '" width="' + MW + '" height="' + MH +
                '" rx="3" fill="#6ba3d6" stroke="#2f6db0" stroke-width="1.5"/>';
            // grafen
            if (visaGraf) {
                var t0 = Math.max(0, tid - FONSTER), kurva = [];
                for (var j = 0; j < hist.length; j++) {
                    if (hist[j].t < t0) continue;
                    kurva.push(r1(GX0 + (hist[j].t - t0) / FONSTER * (GX1 - GX0)) + ',' + r1(CY - hist[j].y));
                }
                if (kurva.length > 1) {
                    s += '<polyline points="' + kurva.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="2.2" stroke-linejoin="round"/>';
                }
                s += '<circle cx="' + r1(gx) + '" cy="' + r1(gy) + '" r="4" fill="' + BLA + '"/>';
            }
            dyn.innerHTML = s;
            grafLager.style.display = visaGraf ? '' : 'none';
            var grader = Math.round((((alfa % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * 180 / Math.PI) % 360;
            info.textContent = 'ω = 2π/T = ' + fmt(2 * Math.PI / T, 2) + ' rad/s,  α = ω · t = ' + grader + '°,  y = ' +
                fmt(Math.sin(alfa), 2) + ' · A';
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" style="max-width:100%" viewBox="-52 12 648 274" width="664" height="281" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="Ett cykelhjul med ett stift på radien A snurrar med jämn fart. En lampa till vänster ' +
            'lyser på hjulet och ' +
            'kastar stiftets skugga på en vägg, och skuggan rör sig upp och ned i takt med en vikt som ' +
            'svänger i en fjäder bredvid. En graf till höger ritar viktens läge y mot tiden t som en sinuskurva.">' +
            bas + '<g class="ms-hp-graf">' + graf + '</g><g class="ms-hp-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-hp-dyn');
        var grafLager = scene.querySelector('.ms-hp-graf');
        var lampLager = scene.querySelector('.ms-hp-lampa');
        card.appendChild(scene);
        msFullskarm(card, scene, 648 / 274, 200);

        // 3D-vyn: den fristående simuleringen fysik2-hjul-och-fjader-3d-app.html
        // inbäddad i en iframe (?embed=1&mini=1, bara scenen), samma mönster
        // som gaffelbalans3d. Kortets knappar, kryssrutor och glidare styr den
        // med postMessage. Iframen skapas först när 3D-vyn väljs.
        var tre = false, iframe = null, tre3dScene = null;
        function sanda(cmd, value) {
            if (!iframe) return;
            try { iframe.contentWindow.postMessage({ fysikHjul: cmd, value: value }, location.origin); }
            catch (e) { /* iframen inte laddad ännu */ }
        }
        function sandaAllt() {
            sanda('T', T);
            sanda('visa', { ljus: lampCk.cb.checked, vinkel: visaVinkel, graf: visaGraf });
            sanda('spela', spelar);
        }
        function bytVy(v) {
            tre = v;
            if (tre && !iframe) {
                tre3dScene = document.createElement('div');
                tre3dScene.className = 'minisim-scene';
                iframe = document.createElement('iframe');
                iframe.className = 'minisim-iframe';
                iframe.style.aspectRatio = '16 / 10';
                iframe.src = 'fysik2-hjul-och-fjader-3d-app.html?embed=1&mini=1&v=' + (window.__CB || Date.now());
                iframe.setAttribute('allowfullscreen', '');
                iframe.allow = 'fullscreen';
                iframe.title = '3D-simulering: ett cykelhjul med ett stift snurrar i ljuset från en lampa, och ' +
                    'stiftets skugga på väggen följer vikten i fjädern. Dra i scenen för att vrida kameran. ' +
                    'Fullskärmsknappen uppe till vänster i scenen öppnar simuleringen i fullskärm.';
                iframe.addEventListener('load', sandaAllt);
                tre3dScene.appendChild(iframe);
                card.insertBefore(tre3dScene, scene.nextSibling);
            }
            scene.style.display = tre ? 'none' : '';
            if (tre3dScene) tre3dScene.style.display = tre ? '' : 'none';
            info.style.display = tre ? 'none' : '';
            // Växlingsknappen följer med till den synliga scenen, alltid till
            // höger om fullskärmsknappen (i 3D sitter den inne i iframen på 14,14)
            (tre ? tre3dScene : scene).appendChild(dimBtn);
            dimBtn.style.top = tre ? '14px' : '8px';
            dimBtn.style.left = tre ? '60px' : '53px';
            dimBtn.textContent = tre ? '2D' : '3D';
            dimBtn.title = tre ? 'Tillbaka till den plana figuren' : 'Visa försöket i 3D';
            dimBtn.setAttribute('aria-pressed', tre ? 'true' : 'false');
            if (tre) { sandaAllt(); } else { kor(); rita(); }
        }

        function mkBtn(text, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
            b.textContent = text;
            return b;
        }
        function mkCheck(text, on) {
            var l = document.createElement('label');
            l.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = on;
            l.appendChild(cb);
            l.appendChild(document.createTextNode(text));
            return { label: l, cb: cb };
        }
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var startBtn = mkBtn('Snurra hjulet', 'ms-primar');
        var omBtn = mkBtn('Börja om');
        var vinkelCk = mkCheck('Visa vinkeln', true);
        var grafCk = mkCheck('Visa graf', true);
        var lampCk = mkCheck('Visa lampa', true);
        // 3D-knappen uppe till vänster på scenen, till höger om fullskärmsknappen
        var dimBtn = document.createElement('button');
        dimBtn.type = 'button';
        dimBtn.className = 'minisim-fsbtn';
        dimBtn.style.left = '53px';
        dimBtn.style.font = '600 13px Poppins, system-ui, sans-serif';
        dimBtn.textContent = '3D';
        dimBtn.title = 'Visa försöket i 3D';
        dimBtn.setAttribute('aria-label', 'Växla mellan 3D och plan figur');
        dimBtn.setAttribute('aria-pressed', 'false');
        scene.appendChild(dimBtn);
        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        controls.appendChild(vinkelCk.label);
        controls.appendChild(grafCk.label);
        controls.appendChild(lampCk.label);
        card.appendChild(controls);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'minisim-slider-row';
        var sliderLbl = document.createElement('span');
        sliderLbl.className = 'minisim-slider-lbl';
        sliderLbl.innerHTML = 'Periodtid <em>T</em>';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '1'; slider.max = '4'; slider.step = '0.5'; slider.value = '2';
        slider.setAttribute('aria-label', 'Periodtid i sekunder');
        var sliderVal = document.createElement('span');
        sliderVal.className = 'minisim-slider-val';
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);

        var info = document.createElement('div');
        info.className = 'minisim-info';
        info.style.marginTop = '6px';
        card.appendChild(info);
        node.appendChild(card);

        function syncSlider() { sliderVal.textContent = fmt(T, 1) + ' s'; }

        // ── Animation ─────────────────────────────────────────────────────
        var raf = null, senast = 0, synlig = true;
        function steg(nu) {
            raf = null;
            if (!spelar || !synlig || tre) return;
            var dt = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            tid += dt;
            alfa += dt * 2 * Math.PI / T;
            hist.push({ t: tid, y: A * Math.sin(alfa) });
            while (hist.length && hist[0].t < tid - FONSTER - 0.5) hist.shift();
            rita();
            raf = requestAnimationFrame(steg);
        }
        function kor() { if (!raf && spelar && synlig) { senast = 0; raf = requestAnimationFrame(steg); } }
        function setSpelar(v) {
            spelar = v;
            startBtn.textContent = spelar ? 'Pausa' : (tid > 0 ? 'Fortsätt' : 'Snurra hjulet');
            startBtn.classList.toggle('ms-primar', !spelar);
            if (spelar) kor();
            sanda('spela', spelar);
        }
        function nollstall() {
            alfa = 0; tid = 0;
            hist = [{ t: 0, y: 0 }];
        }
        startBtn.addEventListener('click', function () { setSpelar(!spelar); });
        omBtn.addEventListener('click', function () {
            nollstall();
            setSpelar(false);
            sanda('reset');
            rita();
        });
        function sandaVisa() { sanda('visa', { ljus: lampCk.cb.checked, vinkel: visaVinkel, graf: visaGraf }); }
        vinkelCk.cb.addEventListener('change', function () { visaVinkel = vinkelCk.cb.checked; rita(); sandaVisa(); });
        lampCk.cb.addEventListener('change', function () {
            lampLager.style.display = lampCk.cb.checked ? '' : 'none';
            sandaVisa();
        });
        grafCk.cb.addEventListener('change', function () { visaGraf = grafCk.cb.checked; rita(); sandaVisa(); });
        dimBtn.addEventListener('click', function () { bytVy(!tre); });
        slider.addEventListener('input', function () {
            T = parseFloat(slider.value);
            syncSlider();
            sanda('T', T);
            rita();
        });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                synlig = entries[0].isIntersecting;
                if (synlig) kor();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        nollstall();
        syncSlider();
        rita();
        setSpelar(true);                         // startar av sig själv
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: svangningsgrafer
    // ══════════════════════════════════════════════════════════════════════
    // Andra demonstrationen i fy2-2.3: en vikt svänger i en fjäder medan
    // graferna för läge y, hastighet v och acceleration a ritas upp under
    // två perioder. En lodrät markör binder ihop de tre graferna i samma
    // ögonblick, och pilarna på vikten visar v och a skalenligt.
    // A = 0,10 m och T = 2,0 s, positiv riktning uppåt, t = 0 när vikten
    // passerar jämviktsläget uppåt (som i genomgången).
    var sgRaknare = 0;
    function buildSvangningsgrafer(node, cfg) {
        var INK = '#1f2530', GREY = '#9aa0a6', RUTA = '#2563c9', AXEL = '#38bdf8';
        var COL_Y = '#2563c9', COL_V = '#4f9d55', COL_A = '#c0392b';
        var A_M = 0.10, T = 2.0, OM = 2 * Math.PI / T;
        var FX = 70, FTAK = 22, CY = 168, APX = 66;     // fjäder: x, tak, jämvikt, amplitud (px)
        var MW = 36, MH = 28, PILMAX = 46;
        var GX0 = 196, GX1 = 572;                        // grafernas t-axel (två perioder)
        var PANEL = [{ c: 62, f: COL_Y, n: 'y' }, { c: 168, f: COL_V, n: 'v' }, { c: 274, f: COL_A, n: 'a' }];
        var PAMP = 32;
        var tid = 0, t0 = 0, spelar = false, ultra = false, visaPilar = true;
        var visa = [true, true, true];          // kryssrutorna för y, v och a
        var id = 'ms-sg-rutnat-' + (++sgRaknare);

        function r1(v) { return Math.round(v * 10) / 10; }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function fmt(v, d) {
            var s = v.toFixed(d);
            if (parseFloat(s) === 0) return '0';
            return s.replace('.', ',').replace('-', '−');
        }
        function pil(x, y1, y2, color) {
            var dir = y2 < y1 ? -1 : 1, L = Math.abs(y2 - y1);
            if (L < 3) return '';
            var head = Math.min(10, L), by = y2 - dir * head;
            return '<line x1="' + r1(x) + '" y1="' + r1(y1) + '" x2="' + r1(x) + '" y2="' + r1(by) +
                '" stroke="' + color + '" stroke-width="3" stroke-linecap="butt"/>' +
                '<polygon points="' + r1(x - 5) + ',' + r1(by) + ' ' + r1(x) + ',' + r1(y2) + ' ' + r1(x + 5) + ',' + r1(by) +
                '" fill="' + color + '"/>';
        }
        // t0 = tidsaxelns början. Den står på 0 tills markören når högerkanten,
        // sedan flyter axeln med tiden (graferna fortsätter i stället för att
        // börja om). Glidaren för tiden ställer tillbaka den fasta axeln 0–2T.
        function tx(t) { return GX0 + (t - t0) / (2 * T) * (GX1 - GX0); }

        // ── Fast bakgrund ────────────────────────────────────────────────
        var bas = '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="' + RUTA + '" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="0" y="-40" width="600" height="380" fill="url(#' + id + ')"/>';
        bas += '<line x1="' + (FX - 32) + '" y1="' + FTAK + '" x2="' + (FX + 32) + '" y2="' + FTAK + '" stroke="' + INK + '" stroke-width="1.8"/>';
        for (var hx = FX - 28; hx <= FX + 30; hx += 8) {
            bas += '<line x1="' + hx + '" y1="' + FTAK + '" x2="' + (hx - 7) + '" y2="' + (FTAK - 7) +
                '" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>';
        }
        // jämviktsläge och vändlägen vid fjädern
        [CY - APX, CY, CY + APX].forEach(function (yy, i) {
            bas += '<line x1="' + (FX - 44) + '" y1="' + yy + '" x2="' + (FX + 60) + '" y2="' + yy + '" stroke="' + GREY +
                '" stroke-width="1" stroke-dasharray="5 4"/>';
            bas += lbl(FX + 64, yy + 5, 'start', i === 1 ? '0' : (i === 0 ? it('A') : '−' + it('A')), 13, '#4a5160');
        });
        // tre grafer med gemensam t-axel
        PANEL.forEach(function (p, i) {
            bas += '<line x1="' + GX0 + '" y1="' + (p.c + 44) + '" x2="' + GX0 + '" y2="' + (p.c - 40) + '" stroke="' + AXEL + '" stroke-width="1.5"/>' +
                '<polygon points="' + (GX0 - 4) + ',' + (p.c - 40) + ' ' + GX0 + ',' + (p.c - 49) + ' ' + (GX0 + 4) + ',' + (p.c - 40) + '" fill="' + AXEL + '"/>' +
                '<line x1="' + GX0 + '" y1="' + p.c + '" x2="' + (GX1 + 6) + '" y2="' + p.c + '" stroke="' + AXEL + '" stroke-width="1.5"/>' +
                '<polygon points="' + (GX1 + 6) + ',' + (p.c - 4) + ' ' + (GX1 + 15) + ',' + p.c + ' ' + (GX1 + 6) + ',' + (p.c + 4) + '" fill="' + AXEL + '"/>' +
                lbl(GX0 - 8, p.c - 34, 'end', it(p.n), 16, p.f) +
                lbl(GX1 + 15, p.c + 18, 'end', it('t'), 14);
        });
        // etiketten för k halva perioder: T/2, T, 3T/2, 2T …
        function tEtikett(k) {
            if (k % 2) return (k === 1 ? '' : k) + it('T') + '/2';
            return (k === 2 ? '' : (k / 2)) + it('T');
        }

        function fjader(yTopp) {
            var y0 = FTAK, y1 = yTopp, led = 6, n = 10, spole = y1 - y0 - 2 * led;
            var pts = [FX + ',' + y0, FX + ',' + (y0 + led)];
            for (var i = 0; i < n * 2; i++) {
                pts.push(r1(FX + (i % 2 ? -11 : 11)) + ',' + r1(y0 + led + spole * (i + 0.5) / (n * 2)));
            }
            pts.push(FX + ',' + r1(y1 - led), FX + ',' + r1(y1));
            return '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#7c828c" stroke-width="1.6" stroke-linejoin="round"/>';
        }

        function rita() {
            var s = '';
            var fas = OM * tid;
            var yr = Math.sin(fas), vr = Math.cos(fas), ar = -Math.sin(fas);   // relativa värden
            var my = CY - APX * yr;
            // fjäder och vikt
            s += fjader(my - MH / 2);
            s += '<rect x="' + (FX - MW / 2) + '" y="' + r1(my - MH / 2) + '" width="' + MW + '" height="' + MH +
                '" rx="3" fill="#6ba3d6" stroke="#2f6db0" stroke-width="1.5"/>';
            // v och a: skalenliga mot sina maxvärden, från viktens kant i pilens riktning
            if (visaPilar) {
                var vy0 = vr > 0 ? my - MH / 2 : my + MH / 2, ay0 = ar > 0 ? my - MH / 2 : my + MH / 2;
                var vx = FX - 9, ax = FX + 9;
                s += pil(vx, vy0, vy0 - vr * PILMAX, COL_V);
                s += pil(ax, ay0, ay0 - ar * PILMAX, COL_A);
                if (Math.abs(vr) > 0.12) s += lbl(FX - 28, vy0 - vr * PILMAX + (vr > 0 ? 10 : 4), 'end', it('v'), 15, COL_V);
                if (Math.abs(ar) > 0.12) s += lbl(FX + 28, ay0 - ar * PILMAX + (ar > 0 ? 10 : 4), 'start', it('a'), 15, COL_A);
            }
            // kurvorna från axelns början fram till nu
            if (tid > t0 + 2 * T) t0 = tid - 2 * T;
            var cx = tx(tid);
            var fns = [function (t) { return Math.sin(OM * t); }, function (t) { return Math.cos(OM * t); },
                       function (t) { return -Math.sin(OM * t); }];
            // stödlinjer och etiketter vid varje halv period (flyttar med axeln)
            for (var k = Math.ceil(t0 / (T / 2) + 1e-6); k * T / 2 <= t0 + 2 * T + 1e-6; k++) {
                var gxk = tx(k * T / 2);
                PANEL.forEach(function (p) {
                    s += '<line x1="' + r1(gxk) + '" y1="' + (p.c - PAMP - 4) + '" x2="' + r1(gxk) + '" y2="' + (p.c + PAMP + 4) +
                        '" stroke="' + GREY + '" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.7"/>';
                });
                if (gxk < GX1 - 22) s += lbl(gxk, PANEL[2].c + PAMP + 22, 'middle', tEtikett(k), 13, '#4a5160');
            }
            PANEL.forEach(function (p, i) {
                if (!visa[i]) return;
                var N = Math.max(1, Math.ceil((tid - t0) / (2 * T) * 160)), pts = [];
                for (var j = 0; j <= N; j++) {
                    var t = t0 + (tid - t0) * j / N;
                    pts.push(r1(tx(t)) + ',' + r1(p.c - PAMP * fns[i](t)));
                }
                if (N > 1) s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + p.f + '" stroke-width="2.2" stroke-linejoin="round"/>';
            });
            s += '<line x1="' + r1(cx) + '" y1="' + (PANEL[0].c - 42) + '" x2="' + r1(cx) + '" y2="' + (PANEL[2].c + 42) +
                '" stroke="' + INK + '" stroke-width="1" stroke-dasharray="4 3" opacity="0.55"/>';
            // handtag: markören går att dra i sidled för att ändra tiden
            var hy = PANEL[0].c - 42;
            s += '<polygon points="' + r1(cx - 7) + ',' + (hy - 10) + ' ' + r1(cx + 7) + ',' + (hy - 10) + ' ' + r1(cx) + ',' + hy +
                '" fill="' + INK + '" opacity="0.7"/>';
            PANEL.forEach(function (p, i) {
                if (!visa[i]) return;
                s += '<circle cx="' + r1(cx) + '" cy="' + r1(p.c - PAMP * fns[i](tid)) + '" r="4.2" fill="' + p.f + '"/>';
            });
            dyn.innerHTML = s;
            if (!dragar) { tSlider.value = String(Math.min(tid, 2 * T)); }
            tVal.textContent = fmt(tid, 2) + ' s';
            info.textContent = 't = ' + fmt(tid, 2) + ' s,  y = ' + fmt(A_M * yr, 3) + ' m,  v = ' +
                fmt(OM * A_M * vr, 2) + ' m/s,  a = ' + fmt(OM * OM * A_M * ar, 2) + ' m/s²';
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="14 -26 584 360" width="620" height="382" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En vikt svänger i en fjäder. Bredvid ritas tre grafer upp samtidigt: läget y, ' +
            'hastigheten v och accelerationen a mot tiden t. En lodrät markör visar samma ögonblick i alla tre.">' +
            bas + '<g class="ms-sg-dyn"></g>' +
            '<rect class="ms-sg-drag" x="' + (GX0 - 8) + '" y="' + (PANEL[0].c - 60) + '" width="' + (GX1 - GX0 + 16) +
            '" height="' + (PANEL[2].c - PANEL[0].c + 104) + '" fill="transparent" style="cursor:ew-resize;touch-action:pan-y"/></svg>';
        var dyn = scene.querySelector('.ms-sg-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 584 / 360, 230);

        function mkBtn(text, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
            b.textContent = text;
            return b;
        }
        function mkCheck(text, on) {
            var l = document.createElement('label');
            l.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = on;
            l.appendChild(cb);
            l.appendChild(document.createTextNode(text));
            return { label: l, cb: cb };
        }
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var startBtn = mkBtn('Starta', 'ms-primar');
        var omBtn = mkBtn('Börja om');
        var ultraCk = mkCheck('Ultrarapid', false);
        var pilCk = mkCheck('Visa v och a på vikten', true);
        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        controls.appendChild(ultraCk.label);
        controls.appendChild(pilCk.label);
        card.appendChild(controls);

        // kryssrutor för de tre graferna
        var visaRad = document.createElement('div');
        visaRad.className = 'minisim-controls';
        var grafCk = [['Läge ', 'y'], ['Hastighet ', 'v'], ['Acceleration ', 'a']].map(function (d, i) {
            var c = mkCheck('', true);
            var sp = document.createElement('span');
            sp.innerHTML = d[0] + '<em>' + d[1] + '</em>';
            sp.style.color = PANEL[i].f;
            c.label.appendChild(sp);
            c.cb.addEventListener('change', function () { visa[i] = c.cb.checked; rita(); });
            visaRad.appendChild(c.label);
            return c;
        });
        card.appendChild(visaRad);

        // glidare för tiden: dra fram och tillbaka och läs av graferna
        var tRad = document.createElement('div');
        tRad.className = 'minisim-slider-row';
        var tLblEl = document.createElement('span');
        tLblEl.className = 'minisim-slider-lbl';
        tLblEl.innerHTML = 'Tid <em>t</em>';
        var tSlider = document.createElement('input');
        tSlider.type = 'range';
        tSlider.className = 'minisim-slider';
        tSlider.min = '0'; tSlider.max = String(2 * T); tSlider.step = '0.01'; tSlider.value = '0';
        tSlider.setAttribute('aria-label', 'Tiden i sekunder');
        var tVal = document.createElement('span');
        tVal.className = 'minisim-slider-val';
        tRad.appendChild(tLblEl);
        tRad.appendChild(tSlider);
        tRad.appendChild(tVal);
        card.appendChild(tRad);
        var dragar = false;
        // dra i den lodräta markören (eller var som helst i graferna)
        var svgEl = scene.querySelector('svg'), dragYta = scene.querySelector('.ms-sg-drag'), drar = false;
        function tidUrPekare(ev) {
            var pt = svgEl.createSVGPoint();
            pt.x = ev.clientX; pt.y = ev.clientY;
            var m = svgEl.getScreenCTM();
            if (!m) return;
            var x = pt.matrixTransform(m.inverse()).x;
            tid = t0 + Math.max(0, Math.min(2 * T, (x - GX0) / (GX1 - GX0) * 2 * T));
            if (spelar) setSpelar(false);
            startBtn.textContent = tid > 0 ? 'Fortsätt' : 'Starta';
            rita();
        }
        dragYta.addEventListener('pointerdown', function (ev) {
            drar = true;
            try { dragYta.setPointerCapture(ev.pointerId); } catch (e) {}
            tidUrPekare(ev);
            ev.preventDefault();
        });
        dragYta.addEventListener('pointermove', function (ev) { if (drar) tidUrPekare(ev); });
        dragYta.addEventListener('pointerup', function () { drar = false; });
        dragYta.addEventListener('pointercancel', function () { drar = false; });
        tSlider.addEventListener('input', function () {
            dragar = true;
            if (spelar) setSpelar(false);
            tid = parseFloat(tSlider.value);
            t0 = 0;                              // glidaren ger den fasta axeln 0–2T
            startBtn.textContent = tid > 0 ? 'Fortsätt' : 'Starta';
            rita();
            dragar = false;
        });

        var info = document.createElement('div');
        info.className = 'minisim-info';
        info.style.marginTop = '6px';
        card.appendChild(info);
        node.appendChild(card);

        // ── Animation ─────────────────────────────────────────────────────
        var raf = null, senast = 0, synlig = true;
        function steg(nu) {
            raf = null;
            if (!spelar || !synlig) return;
            var dt = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            tid += dt * (ultra ? 0.25 : 1);
            rita();
            raf = requestAnimationFrame(steg);
        }
        function kor() { if (!raf && spelar && synlig) { senast = 0; raf = requestAnimationFrame(steg); } }
        function setSpelar(v) {
            spelar = v;
            startBtn.textContent = spelar ? 'Pausa' : (tid > 0 ? 'Fortsätt' : 'Starta');
            startBtn.classList.toggle('ms-primar', !spelar);
            if (spelar) kor();
        }
        startBtn.addEventListener('click', function () { setSpelar(!spelar); });
        omBtn.addEventListener('click', function () { tid = 0; t0 = 0; setSpelar(false); rita(); });
        ultraCk.cb.addEventListener('change', function () { ultra = ultraCk.cb.checked; });
        pilCk.cb.addEventListener('change', function () { visaPilar = pilCk.cb.checked; rita(); });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                synlig = entries[0].isIntersecting;
                if (synlig) kor();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        rita();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: periodtid
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.4 (Svängningstid i fjäder): en vikt svänger i en fjäder med
    // periodtiden T = 2π · √(m/k). Tre glidare (massa, fjäderkonstant,
    // amplitud) ändrar svängningen medan den pågår, och en graf ritar läget
    // mot tiden. Mellan de två senaste topparna i grafen sitter en måttlinje
    // med den UPPMÄTTA periodtiden: eleven ser att den ändras med m och k
    // men står still när amplituden ändras. Fasen räknas fortlöpande, så
    // svängningen hoppar aldrig när en glidare dras. Vikten ritas större ju
    // tyngre den är och fjädern grövre ju styvare den är. Jämviktsläget
    // hålls på samma höjd (den statiska förlängningen ritas inte).
    var ptRaknare = 0;
    function buildPeriodtid(node, cfg) {
        var INK = '#1f2530', GREY = '#9aa0a6', BLA = '#2563c9', RUTA = '#2563c9', AXEL = '#38bdf8', MATT = '#0f8a7e';
        var FX = 124, FTAK = 22, CY = 158, PXCM = 7;     // fjäder, tak, jämviktsläge, px per cm
        var GX0 = 216, GX1 = 500, FONSTER = 4;          // grafens t-axel och tidsfönster (s)
        var m = 0.100, k = 11, A = 5.0;                 // kg, N/m, cm
        var fas = 0, tid = 0, spelar = false;
        var drar = false, dragY = 0, dragits = false;                  // vikten hålls i handen (px, uppåt positiv)
        var hist = [], toppar = [];                     // [{t, y}] och topparnas tider
        var id = 'ms-pt-rutnat-' + (++ptRaknare);

        function T() { return 2 * Math.PI * Math.sqrt(m / k); }
        function r1(v) { return Math.round(v * 10) / 10; }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '">' + inner + '</text>';
        }
        function fmt(v, d) {
            var s = v.toFixed(d);
            if (parseFloat(s) === 0) return '0';
            return s.replace('.', ',').replace('-', '−');
        }

        // ── Fast bakgrund ────────────────────────────────────────────────
        var bas = '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="' + RUTA + '" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="0" y="-10" width="620" height="330" fill="url(#' + id + ')"/>';
        bas += '<line x1="' + (FX - 34) + '" y1="' + FTAK + '" x2="' + (FX + 34) + '" y2="' + FTAK + '" stroke="' + INK + '" stroke-width="1.8"/>';
        for (var hx = FX - 30; hx <= FX + 32; hx += 8) {
            bas += '<line x1="' + hx + '" y1="' + FTAK + '" x2="' + (hx - 7) + '" y2="' + (FTAK - 7) +
                '" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>';
        }
        bas += '<line x1="' + (FX - 40) + '" y1="' + CY + '" x2="' + (FX + 40) + '" y2="' + CY + '" stroke="' + GREY +
            '" stroke-width="1" stroke-dasharray="5 4"/>';
        // grafens axlar: pilspets bara åt det positiva hållet
        bas += '<line x1="' + GX0 + '" y1="' + (CY + 84) + '" x2="' + GX0 + '" y2="' + (CY - 96) + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
            '<polygon points="' + (GX0 - 4) + ',' + (CY - 96) + ' ' + GX0 + ',' + (CY - 106) + ' ' + (GX0 + 4) + ',' + (CY - 96) + '" fill="' + AXEL + '"/>' +
            '<line x1="' + GX0 + '" y1="' + CY + '" x2="' + (GX1 + 4) + '" y2="' + CY + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
            '<polygon points="' + (GX1 + 4) + ',' + (CY - 4) + ' ' + (GX1 + 14) + ',' + CY + ' ' + (GX1 + 4) + ',' + (CY + 4) + '" fill="' + AXEL + '"/>' +
            lbl(GX0 - 8, CY - 92, 'end', it('y'), 15) +
            lbl(GX1 + 14, CY + 20, 'end', it('t'), 15);

        function fjader(yTopp) {
            var y0 = FTAK, y1 = yTopp, led = 6, n = 10, spole = y1 - y0 - 2 * led;
            var pts = [FX + ',' + y0, FX + ',' + (y0 + led)];
            for (var i = 0; i < n * 2; i++) {
                pts.push(r1(FX + (i % 2 ? -12 : 12)) + ',' + r1(y0 + led + spole * (i + 0.5) / (n * 2)));
            }
            pts.push(FX + ',' + r1(y1 - led), FX + ',' + r1(y1));
            var bredd = 1.1 + (k - 5) / 35 * 2.4;          // styvare fjäder ritas grövre
            return '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#6f7680" stroke-width="' +
                r1(bredd) + '" stroke-linejoin="round"/>';
        }

        function rita() {
            var s = '';
            var yPx = drar ? dragY : A * PXCM * Math.sin(fas);
            var my = CY - yPx;
            var sida = Math.max(20, Math.min(46, 30 * Math.cbrt(m / 0.1)));
            s += fjader(my - sida / 2);
            s += '<rect x="' + r1(FX - sida / 2) + '" y="' + r1(my - sida / 2) + '" width="' + r1(sida) + '" height="' + r1(sida) +
                '" rx="3" fill="#6ba3d6" stroke="#2f6db0" stroke-width="1.5"/>';
            if (!dragits) s += lbl(FX, CY + 88, 'middle', 'Dra i vikten', 13, '#4a5160');
            // grafen: tidsfönstret flyter med när kurvan når högerkanten
            var t0 = Math.max(0, tid - FONSTER);
            function tx(t) { return GX0 + (t - t0) / FONSTER * (GX1 - GX0); }
            var kurva = [];
            for (var j = 0; j < hist.length; j++) {
                if (hist[j].t < t0) continue;
                kurva.push(r1(tx(hist[j].t)) + ',' + r1(CY - hist[j].y));
            }
            if (kurva.length > 1) {
                s += '<polyline points="' + kurva.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="2.2" stroke-linejoin="round"/>';
            }
            s += '<line x1="' + (FX + sida / 2 + 4) + '" y1="' + r1(my) + '" x2="' + r1(tx(tid)) + '" y2="' + r1(my) +
                '" stroke="' + BLA + '" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>';
            s += '<circle cx="' + r1(tx(tid)) + '" cy="' + r1(my) + '" r="4" fill="' + BLA + '"/>';
            // måttlinje mellan de två senaste topparna: den uppmätta periodtiden
            var n = toppar.length;
            if (n >= 2 && toppar[n - 2].t >= t0) {
                var xa = tx(toppar[n - 2].t), xb = tx(toppar[n - 1].t);
                var ya = CY - toppar[n - 2].y, yb = CY - toppar[n - 1].y;
                var ym = CY - 84;
                s += '<line x1="' + r1(xa) + '" y1="' + r1(ya - 5) + '" x2="' + r1(xa) + '" y2="' + (ym - 6) + '" stroke="' + MATT + '" stroke-width="1" stroke-dasharray="3 3"/>';
                s += '<line x1="' + r1(xb) + '" y1="' + r1(yb - 5) + '" x2="' + r1(xb) + '" y2="' + (ym - 6) + '" stroke="' + MATT + '" stroke-width="1" stroke-dasharray="3 3"/>';
                if (xb - xa > 16) {
                    s += '<line x1="' + r1(xa + 7) + '" y1="' + ym + '" x2="' + r1(xb - 7) + '" y2="' + ym + '" stroke="' + MATT + '" stroke-width="1.6" stroke-linecap="butt"/>';
                    s += '<polygon points="' + r1(xa) + ',' + ym + ' ' + r1(xa + 8) + ',' + (ym - 4) + ' ' + r1(xa + 8) + ',' + (ym + 4) + '" fill="' + MATT + '"/>';
                    s += '<polygon points="' + r1(xb) + ',' + ym + ' ' + r1(xb - 8) + ',' + (ym - 4) + ' ' + r1(xb - 8) + ',' + (ym + 4) + '" fill="' + MATT + '"/>';
                }
                var mx = Math.max(GX0 + 50, Math.min(GX1 - 50, (xa + xb) / 2));
                s += lbl(mx, ym - 9, 'middle', it('T') + ' = ' + fmt(toppar[n - 1].t - toppar[n - 2].t, 2) + ' s', 14, MATT);
            }
            dyn.innerHTML = s;
            info.innerHTML = 'Periodtid enligt formeln: <em>T</em> = ' + fmt(T(), 2) + ' s';
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="40 10 480 240" width="620" height="310" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En vikt svänger i en fjäder. En graf till höger ritar viktens läge y mot tiden t, ' +
            'och en måttlinje mellan de två senaste topparna visar den uppmätta periodtiden T.">' +
            bas + '<g class="ms-pt-dyn"></g>' +
            '<rect class="ms-pt-grepp" x="' + (FX - 44) + '" y="' + (FTAK + 4) + '" width="88" height="' + (CY + 96 - FTAK) +
            '" fill="transparent" style="cursor:grab;touch-action:none"/></svg>';
        var dyn = scene.querySelector('.ms-pt-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 480 / 240, 300);

        // knappar och glidare i en panel PÅ scenen, under figuren
        var panel = document.createElement('div');
        panel.className = 'ms-pt-panel';
        scene.appendChild(panel);
        var controls = document.createElement('div');
        controls.className = 'ms-pt-knappar';
        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn';
        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        panel.appendChild(controls);

        function glidare(namn, bet, min, max, steg, varde, visa, satt) {
            var rad = document.createElement('div');
            rad.className = 'ms-pt-cell';
            var topp = document.createElement('div');
            topp.className = 'ms-pt-topp';
            var l = document.createElement('span');
            l.innerHTML = namn + ' <em>' + bet + '</em>';
            var sl = document.createElement('input');
            sl.type = 'range';
            sl.className = 'minisim-slider';
            sl.min = String(min); sl.max = String(max); sl.step = String(steg); sl.value = String(varde);
            sl.setAttribute('aria-label', namn);
            var v = document.createElement('b');
            v.textContent = visa(varde);
            sl.addEventListener('input', function () {
                var x = parseFloat(sl.value);
                satt(x);
                v.textContent = visa(x);
                rita();
            });
            topp.appendChild(l); topp.appendChild(v);
            rad.appendChild(topp); rad.appendChild(sl);
            panel.appendChild(rad);
            return { sl: sl, v: v, visa: visa };
        }
        glidare('Massa', 'm', 50, 1000, 50, 100,
            function (x) { return fmt(x, 0) + ' g'; }, function (x) { m = x / 1000; });
        glidare('Fjäderkonstant', 'k', 5, 40, 1, 11,
            function (x) { return fmt(x, 0) + ' N/m'; }, function (x) { k = x; });
        var aGlid = glidare('Amplitud', 'A', 1, 10, 0.5, 5,
            function (x) { return fmt(x, 1) + ' cm'; }, function (x) { A = x; });

        var info = document.createElement('div');
        info.className = 'minisim-info';
        info.style.marginTop = '6px';
        card.appendChild(info);
        node.appendChild(card);

        // ── Animation ─────────────────────────────────────────────────────
        var raf = null, senast = 0, synlig = true;
        function steg(nu) {
            raf = null;
            if (!spelar || !synlig) return;
            var dt = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            if (drar) {
                // vikten följer handen; grafen ritar handens rörelse
                tid += dt;
                hist.push({ t: tid, y: dragY });
                while (hist.length && hist[0].t < tid - FONSTER - 0.5) hist.shift();
                rita();
                raf = requestAnimationFrame(steg);
                return;
            }
            var fore = Math.floor((fas - Math.PI / 2) / (2 * Math.PI));
            tid += dt;
            fas += dt * 2 * Math.PI / T();
            var efter = Math.floor((fas - Math.PI / 2) / (2 * Math.PI));
            if (efter > fore) {
                // toppens tidpunkt interpoleras inom tidssteget
                var fasTopp = Math.PI / 2 + 2 * Math.PI * efter;
                var tTopp = tid - (fas - fasTopp) / (2 * Math.PI / T());
                toppar.push({ t: tTopp, y: A * PXCM });
                if (toppar.length > 40) toppar.shift();
            }
            hist.push({ t: tid, y: A * PXCM * Math.sin(fas) });
            while (hist.length && hist[0].t < tid - FONSTER - 0.5) hist.shift();
            rita();
            raf = requestAnimationFrame(steg);
        }
        function kor() { if (!raf && spelar && synlig) { senast = 0; raf = requestAnimationFrame(steg); } }
        function setSpelar(v) {
            spelar = v;
            startBtn.textContent = spelar ? 'Pausa' : (tid > 0 ? 'Fortsätt' : 'Starta');
            startBtn.classList.toggle('ms-primar', !spelar);
            if (spelar) kor();
        }
        function nollstall() { fas = 0; tid = 0; hist = [{ t: 0, y: 0 }]; toppar = []; }
        startBtn.addEventListener('click', function () { setSpelar(!spelar); });
        omBtn.addEventListener('click', function () { nollstall(); setSpelar(false); rita(); });

        // ── Dra vikten upp eller ned och släpp ────────────────────────────
        // Medan vikten hålls följer den pekaren (högst 10 cm från jämvikts-
        // läget). Släpps den startar svängningen från vila i vändläget:
        // amplituden blir avståndet till jämviktsläget, och glidaren för
        // amplituden följer med.
        var svgEl = scene.querySelector('svg'), grepp = scene.querySelector('.ms-pt-grepp');
        function yUrPekare(ev) {
            var pt = svgEl.createSVGPoint();
            pt.x = ev.clientX; pt.y = ev.clientY;
            var mtx = svgEl.getScreenCTM();
            if (!mtx) return dragY;
            var y = CY - pt.matrixTransform(mtx.inverse()).y;
            return Math.max(-10 * PXCM, Math.min(10 * PXCM, y));
        }
        grepp.addEventListener('pointerdown', function (ev) {
            drar = true;
            dragits = true;
            dragY = yUrPekare(ev);
            grepp.style.cursor = 'grabbing';
            try { grepp.setPointerCapture(ev.pointerId); } catch (e) {}
            toppar = [];
            if (!spelar) setSpelar(true);
            rita();
            ev.preventDefault();
        });
        grepp.addEventListener('pointermove', function (ev) {
            if (!drar) return;
            dragY = yUrPekare(ev);
            rita();
        });
        function slapp() {
            if (!drar) return;
            drar = false;
            grepp.style.cursor = 'grab';
            A = Math.abs(dragY) / PXCM;
            var n = Math.floor((fas - Math.PI / 2) / (2 * Math.PI));
            // vändläget: överst är fasen π/2, nederst 3π/2 (samma varv)
            fas = Math.PI / 2 + 2 * Math.PI * n + (dragY >= 0 ? 0 : Math.PI);
            if (dragY >= 0 && A > 0) toppar.push({ t: tid, y: A * PXCM });
            var ag = Math.max(1, Math.min(10, Math.round(A * 2) / 2));
            aGlid.sl.value = String(ag);
            aGlid.v.textContent = aGlid.visa(Math.round(A * 10) / 10);
            rita();
        }
        grepp.addEventListener('pointerup', slapp);
        grepp.addEventListener('pointercancel', slapp);
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                synlig = entries[0].isIntersecting;
                if (synlig) kor();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        nollstall();
        rita();
        setSpelar(false);                        // startar pausad
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: pendelperiod
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.5 (Plan matematisk pendel): en kula i ett snöre svänger, och en
    // graf till höger ritar utslagsvinkeln α mot tiden. Mellan de två senaste
    // vändlägena åt höger sitter en måttlinje med den UPPMÄTTA periodtiden,
    // och raden under scenen visar vad formeln T = 2π · √(l/g) ger. Fyra
    // glidare: pendellängd l, massa m, plats (tyngdaccelerationen g) och
    // utslagsvinkel α. Rörelsen räknas EXAKT (α'' = −(g/l) · sin α, RK4),
    // inte med småvinkelapproximationen, så att eleven ser att massan aldrig
    // spelar roll, att T följer √l och 1/√g, och att den uppmätta periodtiden
    // börjar dra ifrån formelns värde när utslaget blir stort. Samma upplägg
    // och panel som typen periodtid (fy2-2.4). Kulan går att dra ut och
    // släppa. Längden ritas i fast skala, så att längre pendlar syns längre.
    var ppRaknare = 0;
    function buildPendelperiod(node, cfg) {
        var INK = '#1f2530', GREY = '#9aa0a6', BLA = '#2563c9', RUTA = '#2563c9', AXEL = '#38bdf8', MATT = '#0f8a7e';
        // Bred skärm: pendeln till vänster och grafen till höger. Smalt kort
        // (telefon): pendeln överst och grafen under, så att båda blir stora.
        var PY = 24, PXM = 85, PXGRAD = 1.25;           // tak, px per meter, px per grad
        var PX, GX0, GX1, CY, VBW, VBH, smal = null;
        var PLATSER = [
            { namn: 'Månen', g: 1.62 }, { namn: 'Mars', g: 3.71 },
            { namn: 'Jorden', g: 9.82 }, { namn: 'Jupiter', g: 24.8 }
        ];
        var l = 1.0, m = 0.2, plats = 2, amp = 10;      // m, kg, index, grader
        var th = amp * Math.PI / 180, om = 0;            // vinkel (rad) och vinkelhastighet
        var tid = 0, spelar = false, fonster = 6;
        var drar = false, dragits = false;
        var hist = [], toppar = [];
        var id = 'ms-pp-rutnat-' + (++ppRaknare);

        function g() { return PLATSER[plats].g; }
        function Tformel() { return 2 * Math.PI * Math.sqrt(l / g()); }
        function r1(v) { return Math.round(v * 10) / 10; }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '">' + inner + '</text>';
        }
        function fmt(v, d) {
            var s = v.toFixed(d);
            if (parseFloat(s) === 0) return '0';
            return s.replace('.', ',').replace('-', '−');
        }
        function nyttFonster() {
            // tidsfönstret rymmer ungefär två och en halv period
            fonster = Math.max(4, Math.min(18, Math.ceil(Tformel() * 2.6)));
        }

        // ── Fast bakgrund (byggs om när layouten byts) ────────────────────
        function basSvg() {
        var bas = '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="' + RUTA + '" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="-10" y="-10" width="' + (VBW + 20) + '" height="' + (VBH + 20) + '" fill="url(#' + id + ')"/>';
        bas += '<line x1="' + (PX - 36) + '" y1="' + PY + '" x2="' + (PX + 36) + '" y2="' + PY + '" stroke="' + INK + '" stroke-width="1.8"/>';
        for (var hx = PX - 32; hx <= PX + 34; hx += 8) {
            bas += '<line x1="' + hx + '" y1="' + PY + '" x2="' + (hx - 7) + '" y2="' + (PY - 7) +
                '" stroke="' + INK + '" stroke-width="1" stroke-linecap="round"/>';
        }
        // grafens axlar: pilspets bara åt det positiva hållet
        bas += '<line x1="' + GX0 + '" y1="' + (CY + 86) + '" x2="' + GX0 + '" y2="' + (CY - 92) + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
            '<polygon points="' + (GX0 - 4) + ',' + (CY - 92) + ' ' + GX0 + ',' + (CY - 102) + ' ' + (GX0 + 4) + ',' + (CY - 92) + '" fill="' + AXEL + '"/>' +
            '<line x1="' + GX0 + '" y1="' + CY + '" x2="' + (GX1 + 4) + '" y2="' + CY + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
            '<polygon points="' + (GX1 + 4) + ',' + (CY - 4) + ' ' + (GX1 + 14) + ',' + CY + ' ' + (GX1 + 4) + ',' + (CY + 4) + '" fill="' + AXEL + '"/>' +
            lbl(GX0 - 8, CY - 88, 'end', it('α'), 15) +
            lbl(GX1 + 14, CY + 20, 'end', it('t'), 15);
        return bas;
        }

        function rita() {
            var s = '';
            var L = l * PXM;
            var a = amp * Math.PI / 180;
            // lodlinjen och den streckade banan mellan vändlägena
            s += '<line x1="' + PX + '" y1="' + PY + '" x2="' + PX + '" y2="' + r1(PY + L + 16) +
                '" stroke="' + GREY + '" stroke-width="1" stroke-dasharray="5 4"/>';
            var bana = [];
            for (var i = 0; i <= 40; i++) {
                var v = -a + (i / 40) * 2 * a;
                bana.push(r1(PX + L * Math.sin(v)) + ',' + r1(PY + L * Math.cos(v)));
            }
            s += '<polyline points="' + bana.join(' ') + '" fill="none" stroke="' + GREY + '" stroke-width="1.2" stroke-dasharray="2 3"/>';
            // snöre och kula; kulan ritas större ju tyngre den är
            var bx = PX + L * Math.sin(th), by = PY + L * Math.cos(th);
            var r = Math.max(6, Math.min(15, 9 * Math.cbrt(m / 0.2)));
            s += '<line x1="' + PX + '" y1="' + PY + '" x2="' + r1(bx) + '" y2="' + r1(by) + '" stroke="' + INK + '" stroke-width="1.5"/>';
            s += '<circle cx="' + PX + '" cy="' + PY + '" r="2.4" fill="' + INK + '"/>';
            s += '<circle cx="' + r1(bx) + '" cy="' + r1(by) + '" r="' + r1(r) + '" fill="#6ba3d6" stroke="#2f6db0" stroke-width="1.5"/>';
            // pendellängden: etikett mitt på snöret, på den sida som är fri
            var sida = th >= 0 ? -1 : 1;
            s += lbl(PX + L / 2 * Math.sin(th) + sida * 10, PY + L / 2 * Math.cos(th) + 5, sida < 0 ? 'end' : 'start', it('l'), 15);
            // uppmaning vid kulan tills någon dragit i den: på den sida om
            // kulan som vetter bort från snöret, annars på andra sidan
            if (!dragits) {
                var grans = smal ? VBW - 4 : GX0 - 12, hoger = th >= 0 && bx + r + 72 < grans;
                if (th < 0 && bx - r - 72 < 4) hoger = true;
                s += lbl(hoger ? bx + r + 8 : bx - r - 8, by + 5, hoger ? 'start' : 'end', 'Dra i mig', 14, '#4a5160');
            }
            // grafen: tidsfönstret flyter med när kurvan når högerkanten
            var t0 = Math.max(0, tid - fonster);
            function tx(t) { return GX0 + (t - t0) / fonster * (GX1 - GX0); }
            function ty(rad) { return CY - rad * 180 / Math.PI * PXGRAD; }
            var kurva = [];
            for (var j = 0; j < hist.length; j++) {
                if (hist[j].t < t0) continue;
                kurva.push(r1(tx(hist[j].t)) + ',' + r1(ty(hist[j].a)));
            }
            if (kurva.length > 1) {
                s += '<polyline points="' + kurva.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="2.2" stroke-linejoin="round"/>';
            }
            s += '<circle cx="' + r1(tx(tid)) + '" cy="' + r1(ty(th)) + '" r="4" fill="' + BLA + '"/>';
            // måttlinje mellan de två senaste vändlägena åt höger
            var n = toppar.length;
            if (n >= 2 && toppar[n - 2].t >= t0) {
                var xa = tx(toppar[n - 2].t), xb = tx(toppar[n - 1].t);
                var ya = ty(toppar[n - 2].a), yb = ty(toppar[n - 1].a);
                var ym = CY - 86;
                s += '<line x1="' + r1(xa) + '" y1="' + r1(ya - 5) + '" x2="' + r1(xa) + '" y2="' + (ym - 6) + '" stroke="' + MATT + '" stroke-width="1" stroke-dasharray="3 3"/>';
                s += '<line x1="' + r1(xb) + '" y1="' + r1(yb - 5) + '" x2="' + r1(xb) + '" y2="' + (ym - 6) + '" stroke="' + MATT + '" stroke-width="1" stroke-dasharray="3 3"/>';
                if (xb - xa > 16) {
                    s += '<line x1="' + r1(xa + 7) + '" y1="' + ym + '" x2="' + r1(xb - 7) + '" y2="' + ym + '" stroke="' + MATT + '" stroke-width="1.6" stroke-linecap="butt"/>';
                    s += '<polygon points="' + r1(xa) + ',' + ym + ' ' + r1(xa + 8) + ',' + (ym - 4) + ' ' + r1(xa + 8) + ',' + (ym + 4) + '" fill="' + MATT + '"/>';
                    s += '<polygon points="' + r1(xb) + ',' + ym + ' ' + r1(xb - 8) + ',' + (ym - 4) + ' ' + r1(xb - 8) + ',' + (ym + 4) + '" fill="' + MATT + '"/>';
                }
                var mx = Math.max(GX0 + 62, Math.min(GX1 - 62, (xa + xb) / 2));
                s += lbl(mx, ym - 9, 'middle', 'Uppmätt ' + it('T') + ' = ' + fmt(toppar[n - 1].t - toppar[n - 2].t, 2) + ' s', 14, MATT);
            }
            dyn.innerHTML = s;
            info.innerHTML = 'Periodtid enligt formeln: <em>T</em> = 2π · √(<em>l</em>/<em>g</em>) = ' + fmt(Tformel(), 2) + ' s';
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En kula i ett snöre svänger fram och tillbaka. En graf till höger ritar utslagsvinkeln ' +
            'mot tiden, och en måttlinje mellan de två senaste vändlägena visar den uppmätta periodtiden T.">' +
            '<g class="ms-pp-bas"></g><g class="ms-pp-dyn"></g>' +
            '<rect class="ms-pp-grepp" fill="transparent" style="cursor:grab;touch-action:none"/></svg>';
        var dyn = scene.querySelector('.ms-pp-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 620 / 250, 300);
        var svgRot = scene.querySelector('svg');
        function lagUt() {
            var nySmal = card.clientWidth > 0 && card.clientWidth < 480;
            if (nySmal === smal) return;
            smal = nySmal;
            if (smal) { PX = 180; GX0 = 40; GX1 = 324; CY = 318; VBW = 360; VBH = 418; }
            else { PX = 172; GX0 = 356; GX1 = 590; CY = 124; VBW = 620; VBH = 250; }
            svgRot.setAttribute('viewBox', '0 0 ' + VBW + ' ' + VBH);
            svgRot.setAttribute('width', String(VBW));
            svgRot.setAttribute('height', String(VBH));
            card.style.setProperty('--ms-asp', String(VBW / VBH));
            scene.querySelector('.ms-pp-bas').innerHTML = basSvg();
            var gr = scene.querySelector('.ms-pp-grepp');
            gr.setAttribute('x', '0'); gr.setAttribute('y', String(PY + 4));
            gr.setAttribute('width', String(smal ? VBW : GX0 - 20));
            gr.setAttribute('height', String(smal ? 206 : 246 - PY));
            if (dyn.innerHTML) rita();
        }

        var panel = document.createElement('div');
        panel.className = 'ms-pt-panel ms-pp-panel';
        scene.appendChild(panel);
        var controls = document.createElement('div');
        controls.className = 'ms-pt-knappar';
        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.className = 'minisim-btn';
        var omBtn = document.createElement('button');
        omBtn.type = 'button';
        omBtn.className = 'minisim-btn';
        omBtn.textContent = 'Börja om';
        controls.appendChild(startBtn);
        controls.appendChild(omBtn);
        panel.appendChild(controls);

        function glidare(namn, bet, min, max, steg, varde, visa, satt) {
            var rad = document.createElement('div');
            rad.className = 'ms-pt-cell';
            var topp = document.createElement('div');
            topp.className = 'ms-pt-topp';
            var lb = document.createElement('span');
            lb.innerHTML = namn + (bet ? ' <em>' + bet + '</em>' : '');
            var sl = document.createElement('input');
            sl.type = 'range';
            sl.className = 'minisim-slider';
            sl.min = String(min); sl.max = String(max); sl.step = String(steg); sl.value = String(varde);
            sl.setAttribute('aria-label', namn);
            var v = document.createElement('b');
            v.textContent = visa(varde);
            sl.addEventListener('input', function () {
                var x = parseFloat(sl.value);
                satt(x);
                v.textContent = visa(x);
                rita();
            });
            topp.appendChild(lb); topp.appendChild(v);
            rad.appendChild(topp); rad.appendChild(sl);
            panel.appendChild(rad);
            return { sl: sl, v: v, visa: visa };
        }
        // Byts l eller g mitt i svängningen behålls vinkeln, och vinkel-
        // hastigheten skalas med √(g/l), så att utslaget blir detsamma.
        function bytFrekvens(fn) {
            var w0 = Math.sqrt(g() / l);
            fn();
            om *= Math.sqrt(g() / l) / w0;
            toppar = [];
            nyttFonster();
        }
        glidare('Pendellängd', 'l', 0.2, 2, 0.05, l,
            function (x) { return fmt(x, 2) + ' m'; }, function (x) { bytFrekvens(function () { l = x; }); });
        glidare('Massa', 'm', 50, 1000, 50, m * 1000,
            function (x) { return fmt(x, 0) + ' g'; }, function (x) { m = x / 1000; });
        glidare('Plats', '', 0, 3, 1, plats,
            function (x) { var p = PLATSER[x]; return p.namn + ', ' + fmt(p.g, 2) + ' m/s²'; },
            function (x) { bytFrekvens(function () { plats = x; }); });
        var aGlid = glidare('Utslag', 'α', 2, 60, 1, amp,
            function (x) { return fmt(x, 0) + '°'; },
            function (x) { amp = x; slappIVandlage(); });

        var info = document.createElement('div');
        info.className = 'minisim-info';
        info.style.marginTop = '6px';
        info.style.whiteSpace = 'normal';
        card.appendChild(info);
        node.appendChild(card);
        lagUt();
        if ('ResizeObserver' in window) new ResizeObserver(lagUt).observe(card);

        // ── Fysik: α'' = −(g/l) · sin α, ett RK4-steg ─────────────────────
        function acc(a) { return -g() / l * Math.sin(a); }
        function rk4(h) {
            var k1a = om, k1o = acc(th);
            var k2a = om + h / 2 * k1o, k2o = acc(th + h / 2 * k1a);
            var k3a = om + h / 2 * k2o, k3o = acc(th + h / 2 * k2a);
            var k4a = om + h * k3o, k4o = acc(th + h * k3a);
            th += h / 6 * (k1a + 2 * k2a + 2 * k3a + k4a);
            om += h / 6 * (k1o + 2 * k2o + 2 * k3o + k4o);
        }
        // Kulan släpps från vila i det högra vändläget (eller vänstra om den
        // drogs ut åt vänster). Ett vändläge åt höger är en topp i grafen.
        function slappIVandlage(vinkel) {
            th = vinkel != null ? vinkel : amp * Math.PI / 180;
            om = 0;
            toppar = th > 0 ? [{ t: tid, a: th }] : [];
        }

        // ── Animation ─────────────────────────────────────────────────────
        var raf = null, senast = 0, synlig = true;
        function steg(nu) {
            raf = null;
            if (!spelar || !synlig) return;
            var dt = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            tid += dt;
            if (!drar && dt > 0) {
                var n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
                for (var i = 0; i < n; i++) {
                    var omFore = om;
                    rk4(h);
                    if (omFore > 0 && om <= 0) {
                        // vändläge åt höger: tidpunkten interpoleras inom delsteget
                        var f = omFore / (omFore - om);
                        toppar.push({ t: tid - dt + (i + f) * h, a: th });
                        if (toppar.length > 40) toppar.shift();
                    }
                }
            }
            hist.push({ t: tid, a: th });
            while (hist.length && hist[0].t < tid - 18.5) hist.shift();
            rita();
            raf = requestAnimationFrame(steg);
        }
        function kor() { if (!raf && spelar && synlig) { senast = 0; raf = requestAnimationFrame(steg); } }
        function setSpelar(v) {
            spelar = v;
            startBtn.textContent = spelar ? 'Pausa' : (tid > 0 ? 'Fortsätt' : 'Starta');
            startBtn.classList.toggle('ms-primar', !spelar);
            if (spelar) kor();
        }
        function nollstall() { tid = 0; slappIVandlage(); hist = [{ t: 0, a: th }]; nyttFonster(); }
        startBtn.addEventListener('click', function () { setSpelar(!spelar); });
        omBtn.addEventListener('click', function () { nollstall(); setSpelar(false); rita(); });

        // ── Dra ut kulan och släpp ────────────────────────────────────────
        var svgEl = scene.querySelector('svg'), grepp = scene.querySelector('.ms-pp-grepp');
        function vinkelUrPekare(ev) {
            var pt = svgEl.createSVGPoint();
            pt.x = ev.clientX; pt.y = ev.clientY;
            var mtx = svgEl.getScreenCTM();
            if (!mtx) return th;
            var p = pt.matrixTransform(mtx.inverse());
            var v = Math.atan2(p.x - PX, Math.max(1, p.y - PY));
            return Math.max(-60, Math.min(60, v * 180 / Math.PI)) * Math.PI / 180;
        }
        grepp.addEventListener('pointerdown', function (ev) {
            drar = true;
            dragits = true;
            th = vinkelUrPekare(ev);
            om = 0;
            grepp.style.cursor = 'grabbing';
            try { grepp.setPointerCapture(ev.pointerId); } catch (e) {}
            toppar = [];
            if (!spelar) setSpelar(true);
            rita();
            ev.preventDefault();
        });
        grepp.addEventListener('pointermove', function (ev) {
            if (!drar) return;
            th = vinkelUrPekare(ev);
            rita();
        });
        function slapp() {
            if (!drar) return;
            drar = false;
            grepp.style.cursor = 'grab';
            amp = Math.max(2, Math.round(Math.abs(th) * 180 / Math.PI));
            aGlid.sl.value = String(amp);
            aGlid.v.textContent = aGlid.visa(amp);
            slappIVandlage(th);
            rita();
        }
        grepp.addEventListener('pointerup', slapp);
        grepp.addEventListener('pointercancel', slapp);
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                synlig = entries[0].isIntersecting;
                if (synlig) kor();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        nollstall();
        rita();
        setSpelar(false);                        // startar pausad
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: stegkast
    // ══════════════════════════════════════════════════════════════════════
    // Simuleringen i fy2-1.9 (Numerisk simulering av kaströrelse): kastet
    // räknas med stegmetoden (Eulers metod) precis som i genomgångens
    // formelruta: läget i nästa steg räknas med hastigheten i stegets
    // början, hastigheten med accelerationen i stegets början. Med
    // luftmotstånd (tennisboll, m = 57 g, F_luft = k·v²) är
    //   a_x = −k·v·v_x/m,  a_y = −g − k·v·v_y/m.
    // Varje steg ritas som en blå punkt med en rak sträcka till nästa; den
    // grå streckade kurvan är den exakta kastparabeln utan luftmotstånd, så
    // att felet och luftmotståndets verkan syns direkt. I den aktuella
    // punkten visas hastigheten (grön, från bollens kant) och accelerationen
    // (röd, från tyngdpunkten). En tabell under scenen visar de senaste
    // stegen som raderna i ett kalkylblad. "Ta ett steg" stegar ett
    // tidssteg i taget, "Kör" spelar upp kastet i verklig tid. Glidare för
    // tidssteget, utkastvinkeln, utgångsfarten och luftmotståndets konstant.
    // Skalan (lika i båda led) väljs om när parametrarna ändras, så att både
    // den simulerade banan och kastparabeln ryms. Ren SVG i laboranstemat.
    var skRaknare = 0;
    function buildStegkast(node, cfg) {
        var INK = '#1f2530', GREY = '#7c828c', BLA = '#2563c9', GRN = '#1e8449', ROD = '#c0392b';
        var RUTA = '#2563c9', AXEL = '#38bdf8';
        // smal teorispalt (telefon): smalare ritfönster och större text, så
        // att skaltal och etiketter går att läsa när scenen krymps
        var smal = (node.clientWidth || 600) < 480;
        // (på smal skärm börjar y-axeln under fullskärmsknappen, som täcker
        // scenens övre vänstra hörn)
        var W = smal ? 400 : 600, H = smal ? 380 : 300;
        var PL = smal ? 50 : 46, PR = 34, PT = smal ? 104 : 26, PB = smal ? 40 : 34;
        var FS = smal ? 18 : 13, FV = smal ? 21 : 15;
        var G = 9.82, MASSA = 0.057;
        var p = { dt: 0.1, alfa: 45, v0: 20, luft: false, k: 0.0012, vektorer: true };
        var bana = null, n = 0, spelar = false, klock = 0;
        var skala = 1, ox = PL, oy = H - PB, tick = 1;
        var id = 'ms-sk-rutnat-' + (++skRaknare);

        function r1(v) { return Math.round(v * 10) / 10; }
        function fmt(v, d) {
            var s = v.toFixed(d);
            if (parseFloat(s) === 0) return '0';
            return s.replace('.', ',').replace('-', '−');
        }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color) {
            return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 14) + '" fill="' + (color || INK) + '">' + inner + '</text>';
        }
        function pil(x1, y1, x2, y2, col, w) {
            var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
            if (L < 4) return '';
            var ux = dx / L, uy = dy / L, h = Math.min(10, L * 0.6), hw = h * 0.5;
            var bx = x2 - ux * h, by = y2 - uy * h;
            return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(bx) + '" y2="' + r1(by) +
                '" stroke="' + col + '" stroke-width="' + (w || 2.6) + '" stroke-linecap="butt"/>' +
                '<polygon points="' + r1(bx - uy * hw) + ',' + r1(by + ux * hw) + ' ' + r1(x2) + ',' + r1(y2) + ' ' +
                r1(bx + uy * hw) + ',' + r1(by - ux * hw) + '" fill="' + col + '"/>';
        }
        function X(x) { return ox + x * skala; }
        function Y(y) { return oy - y * skala; }

        // ── Fysiken: hela kastet med stegmetoden ─────────────────────────
        function rakna() {
            var a = p.alfa * Math.PI / 180;
            var vx = p.v0 * Math.cos(a), vy = p.v0 * Math.sin(a), x = 0, y = 0, t = 0;
            var km = p.luft ? p.k / MASSA : 0;
            var pts = [], ymax = 0;
            for (var i = 0; i < 6000; i++) {
                var v = Math.hypot(vx, vy);
                var ax = -km * v * vx, ay = -G - km * v * vy;
                pts.push({ t: t, x: x, y: y, vx: vx, vy: vy, ax: ax, ay: ay });
                if (i > 0 && y < 0) break;
                ymax = Math.max(ymax, y);
                var nx = x + vx * p.dt, ny = y + vy * p.dt;
                vx += ax * p.dt; vy += ay * p.dt;
                x = nx; y = ny; t += p.dt;
            }
            var L = pts.length, A = pts[L - 2], B = pts[L - 1];
            var f = A.y / (A.y - B.y);
            var T = 2 * p.v0 * Math.sin(a) / G;
            bana = { pts: pts, landX: A.x + f * (B.x - A.x), ymax: ymax,
                     exX: p.v0 * Math.cos(a) * T, exY: Math.pow(p.v0 * Math.sin(a), 2) / (2 * G), exT: T };
            // skalan: lika i båda led, så att båda banorna ryms
            var xm = Math.max(bana.exX, bana.landX, 1), ym = Math.max(bana.exY, bana.ymax, 0.5);
            skala = Math.min((W - PL - PR) / xm, (H - PT - PB) / ym);
            ox = PL; oy = H - PB;
            var steg = [0.5, 1, 2, 5, 10, 20, 50];
            tick = steg[steg.length - 1];
            for (var s = 0; s < steg.length; s++) if (steg[s] * skala >= (smal ? 58 : 44)) { tick = steg[s]; break; }
        }

        // ── Ritning ───────────────────────────────────────────────────────
        function rita() {
            var s = '';
            var xEnd = W - PR + 14, yTop = PT - 14;
            // skalstreck och tal: talen står på sin plats, under axeln
            for (var tx = tick; X(tx) <= W - PR - 8; tx += tick) {
                s += '<line x1="' + r1(X(tx)) + '" y1="' + oy + '" x2="' + r1(X(tx)) + '" y2="' + (oy + 5) + '" stroke="' + AXEL + '" stroke-width="1.4"/>';
                // inget skaltal där axelns etikett x (m) står
                if (X(tx) + FS < xEnd - FS * 2.9) s += lbl(X(tx), oy + FS + 6, 'middle', fmt(tx, tick < 1 ? 1 : 0), FS, INK);
            }
            for (var ty = tick; Y(ty) >= PT + 8; ty += tick) {
                s += '<line x1="' + (ox - 5) + '" y1="' + r1(Y(ty)) + '" x2="' + ox + '" y2="' + r1(Y(ty)) + '" stroke="' + AXEL + '" stroke-width="1.4"/>';
                s += lbl(ox - 9, Y(ty) + FS * 0.35, 'end', fmt(ty, tick < 1 ? 1 : 0), FS, INK);
            }
            // axlar, pilspets bara åt det positiva hållet
            s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (xEnd - 8) + '" y2="' + oy + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
                '<polygon points="' + (xEnd - 8) + ',' + (oy - 4) + ' ' + xEnd + ',' + oy + ' ' + (xEnd - 8) + ',' + (oy + 4) + '" fill="' + AXEL + '"/>' +
                '<line x1="' + ox + '" y1="' + oy + '" x2="' + ox + '" y2="' + (yTop + 8) + '" stroke="' + AXEL + '" stroke-width="1.6"/>' +
                '<polygon points="' + (ox - 4) + ',' + (yTop + 8) + ' ' + ox + ',' + yTop + ' ' + (ox + 4) + ',' + (yTop + 8) + '" fill="' + AXEL + '"/>';
            s += lbl(xEnd, oy + FS + 6, 'end', it('x') + ' (m)', FS, INK);
            s += lbl(ox + 9, yTop + FS * 0.7, 'start', it('y') + ' (m)', FS, INK);
            s += lbl(ox - 9, oy + FS * 0.35, 'end', '0', FS, INK);

            // kastparabeln utan luftmotstånd (exakt), tätt samplad
            var kp = [];
            var a = p.alfa * Math.PI / 180;
            for (var i = 0; i <= 120; i++) {
                var t = bana.exT * i / 120;
                kp.push(r1(X(p.v0 * Math.cos(a) * t)) + ',' + r1(Y(p.v0 * Math.sin(a) * t - G * t * t / 2)));
            }
            s += '<polyline points="' + kp.join(' ') + '" fill="none" stroke="' + GREY + '" stroke-width="1.5" stroke-dasharray="5 4"/>';

            // stegmetoden: en rak sträcka per steg
            var P = bana.pts, L = P.length, landat = n >= L - 1;
            for (var j = 1; j <= n; j++) {
                var x2 = P[j].x, y2 = P[j].y;
                if (y2 < 0) { var f = P[j - 1].y / (P[j - 1].y - y2); x2 = P[j - 1].x + f * (x2 - P[j - 1].x); y2 = 0; }
                s += '<line x1="' + r1(X(P[j - 1].x)) + '" y1="' + r1(Y(P[j - 1].y)) + '" x2="' + r1(X(x2)) + '" y2="' + r1(Y(y2)) +
                    '" stroke="' + BLA + '" stroke-width="2.2" stroke-linecap="round"/>';
            }
            var pr = n > 60 ? 1.7 : n > 25 ? 2.4 : 3.2;
            for (j = 0; j <= Math.min(n, L - 2); j++) {
                s += '<circle cx="' + r1(X(P[j].x)) + '" cy="' + r1(Y(P[j].y)) + '" r="' + pr + '" fill="' + BLA + '"/>';
            }
            // bollen
            var bx = landat ? X(bana.landX) : X(P[n].x), by = landat ? Y(0) - 6 : Y(P[n].y);
            if (p.vektorer && !landat) {
                var cur = P[n], v = Math.hypot(cur.vx, cur.vy), aa = Math.hypot(cur.ax, cur.ay);
                var Lv = Math.min(120, 3.2 * v), La = Math.min(120, 3.6 * aa);
                var uvx = cur.vx / v, uvy = -cur.vy / v;
                var vs = [bx + 7 * uvx, by + 7 * uvy], vt = [vs[0] + Lv * uvx, vs[1] + Lv * uvy];
                s += pil(vs[0], vs[1], vt[0], vt[1], GRN);
                // etiketten vid spetsen, förskjuten åt den sida av pilen som
                // vetter bort från banan (banan böjer av nedåt)
                var lx = vt[0] + 6 * uvx + 12 * uvy, ly = vt[1] + 6 * uvy - 12 * uvx;
                s += lbl(lx, ly + FV * 0.35, 'middle', it('v'), FV, GRN);
                var uax = cur.ax / aa, uay = -cur.ay / aa, at = [bx + La * uax, by + La * uay];
                s += pil(bx, by, at[0], at[1], ROD);
                s += lbl(at[0] + (uax >= 0 ? 6 : -6), at[1] + 14, uax >= 0 ? 'start' : 'end', it('a'), FV, ROD);
            }
            s += '<circle cx="' + r1(bx) + '" cy="' + r1(by) + '" r="6" fill="#d9e36b" stroke="' + INK + '" stroke-width="1.3"/>';
            dyn.innerHTML = s;

            // tabellen: de senaste stegen
            var rader = '';
            for (j = Math.max(0, n - 4); j <= n; j++) {
                var q = P[j];
                rader += '<tr' + (j === n ? ' class="ms-sk-akt"' : '') + '><td>' + j + '</td><td>' + fmt(q.t, 2) + '</td><td>' +
                    fmt(q.x, 2) + '</td><td>' + fmt(q.y, 2) + '</td><td>' + fmt(q.vx, 2) + '</td><td>' + fmt(q.vy, 2) +
                    '</td><td>' + fmt(q.ax, 2) + '</td><td>' + fmt(q.ay, 2) + '</td></tr>';
            }
            tbody.innerHTML = rader;

            if (landat) {
                info.innerHTML = 'Bollen landar mellan steg ' + (L - 2) + ' och ' + (L - 1) + '. Kastvidd ungefär ' +
                    fmt(bana.landX, 2) + ' m. Utan luftmotstånd, exakt: ' + fmt(bana.exX, 2) + ' m.';
            } else {
                info.innerHTML = 'Steg ' + n + ', <em>t</em> = ' + fmt(P[n].t, 2) + ' s. Utan luftmotstånd är kastvidden exakt ' +
                    fmt(bana.exX, 2) + ' m.';
            }
            stegBtn.disabled = landat;
            korBtn.textContent = spelar ? 'Pausa' : landat ? 'Kör igen' : (n > 0 ? 'Fortsätt' : 'Kör');
            korBtn.classList.toggle('ms-primar', !spelar);
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred ms-sk';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En kaströrelse räknad med stegmetoden. Blå punkter med raka sträckor visar bollens läge i varje ' +
            'tidssteg, och en grå streckad kurva visar kastparabeln utan luftmotstånd. I bollens aktuella läge visar en grön ' +
            'pil hastigheten och en röd pil accelerationen.">' +
            '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="' + RUTA + '" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="url(#' + id + ')"/>' +
            '<g class="ms-sk-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-sk-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, W / H, 380);
        // Allt under scenen ligger i en panel: i fullskärm hamnar den bredvid
        // scenen (bred skärm) eller under den (stående skärm), se .ms-sk i CSS.
        var panel = document.createElement('div');
        panel.className = 'ms-sk-panel';
        card.appendChild(panel);

        var legend = document.createElement('div');
        legend.className = 'ms-sk-legend';
        legend.innerHTML = '<span><i style="background:' + BLA + '"></i>Stegmetoden</span>' +
            '<span><i class="ms-sk-streck"></i>Utan luftmotstånd, exakt</span>' +
            '<span><i style="background:' + GRN + '"></i>Hastighet <em>v</em></span>' +
            '<span><i style="background:' + ROD + '"></i>Acceleration <em>a</em></span>';
        panel.appendChild(legend);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        function knapp(txt) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn';
            b.textContent = txt;
            controls.appendChild(b);
            return b;
        }
        var korBtn = knapp('Kör');
        var stegBtn = knapp('Ta ett steg');
        var omBtn = knapp('Börja om');
        function kryss(txt, varde, satt) {
            var l = document.createElement('label');
            l.className = 'minisim-check';
            var inp = document.createElement('input');
            inp.type = 'checkbox';
            inp.checked = varde;
            inp.addEventListener('change', function () { satt(inp.checked); });
            l.appendChild(inp);
            l.appendChild(document.createTextNode(txt));
            controls.appendChild(l);
            return inp;
        }
        kryss('Luftmotstånd', p.luft, function (v) { p.luft = v; kRad.classList.toggle('ms-sk-av', !v); kSl.disabled = !v; nyttKast(); });
        kryss('Visa vektorer', p.vektorer, function (v) { p.vektorer = v; rita(); });
        panel.appendChild(controls);

        function glidare(namnHtml, min, max, steg, varde, visa, satt) {
            var rad = document.createElement('div');
            rad.className = 'minisim-slider-row';
            var l = document.createElement('span');
            l.className = 'minisim-slider-lbl';
            l.innerHTML = namnHtml;
            var sl = document.createElement('input');
            sl.type = 'range';
            sl.className = 'minisim-slider';
            sl.min = String(min); sl.max = String(max); sl.step = String(steg); sl.value = String(varde);
            sl.setAttribute('aria-label', l.textContent);
            var v = document.createElement('span');
            v.className = 'minisim-slider-val';
            v.textContent = visa(varde);
            sl.addEventListener('input', function () {
                var x = parseFloat(sl.value);
                satt(x);
                v.textContent = visa(x);
                nyttKast();
            });
            var par = document.createElement('span');
            par.style.cssText = 'display:flex;flex:1 1 170px;align-items:center;gap:10px;min-width:0;';
            par.appendChild(sl); par.appendChild(v);
            rad.appendChild(l); rad.appendChild(par);
            panel.appendChild(rad);
            return { rad: rad, sl: sl };
        }
        glidare('Tidssteg Δ<em>t</em>', 0.02, 0.5, 0.01, p.dt,
            function (x) { return fmt(x, 2) + ' s'; }, function (x) { p.dt = x; });
        glidare('Utkastvinkel <em>α</em>', 10, 80, 1, p.alfa,
            function (x) { return fmt(x, 0) + '°'; }, function (x) { p.alfa = x; });
        glidare('Utgångsfart <em>v</em><sub>0</sub>', 5, 35, 1, p.v0,
            function (x) { return fmt(x, 0) + ' m/s'; }, function (x) { p.v0 = x; });
        var kG = glidare('Luftmotståndets konstant <em>k</em>', 0.0002, 0.004, 0.0001, p.k,
            function (x) { return fmt(x, 4) + ' kg/m'; }, function (x) { p.k = x; });
        var kRad = kG.rad, kSl = kG.sl;
        kRad.classList.add('ms-sk-av');
        kSl.disabled = true;

        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '8px';
        panel.appendChild(info);

        var tabWrap = document.createElement('div');
        tabWrap.className = 'ms-sk-tabwrap';
        tabWrap.innerHTML = '<table class="ms-sk-tab"><thead><tr><th><em>n</em></th><th><em>t</em> (s)</th>' +
            '<th><em>x</em> (m)</th><th><em>y</em> (m)</th><th><em>v</em><sub>x</sub> (m/s)</th>' +
            '<th><em>v</em><sub>y</sub> (m/s)</th><th><em>a</em><sub>x</sub> (m/s²)</th><th><em>a</em><sub>y</sub> (m/s²)</th>' +
            '</tr></thead><tbody></tbody></table>';
        var tbody = tabWrap.querySelector('tbody');
        panel.appendChild(tabWrap);
        var not = document.createElement('div');
        not.className = 'minisim-info ms-brod ms-sk-not';
        not.innerHTML = 'Bollen är en tennisboll med massan 57 g. Med luftmotstånd är ' +
            '<em>a</em><sub>x</sub> = −<em>k</em> · <em>v</em> · <em>v</em><sub>x</sub> / <em>m</em> och ' +
            '<em>a</em><sub>y</sub> = −<em>g</em> − <em>k</em> · <em>v</em> · <em>v</em><sub>y</sub> / <em>m</em>.';
        panel.appendChild(not);
        node.appendChild(card);

        // ── Uppspelning ───────────────────────────────────────────────────
        var raf = null, senast = 0, synlig = true;
        function sista() { return bana.pts.length - 1; }
        function nyttKast() {
            // tiden står kvar där den var; stegnumret räknas om för det nya tidssteget
            var tNu = bana ? bana.pts[n].t : 0;
            rakna();
            n = Math.min(sista(), Math.floor(tNu / p.dt + 1e-9));
            klock = n * p.dt;
            if (n >= sista()) spelar = false;
            rita();
        }
        function ruta(nu) {
            raf = null;
            if (!spelar || !synlig) return;
            var d = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            klock += d;
            n = Math.min(sista(), Math.floor(klock / p.dt + 1e-9));
            if (n >= sista()) spelar = false;
            rita();
            if (spelar) raf = requestAnimationFrame(ruta);
        }
        function kor() { if (!raf && spelar && synlig) { senast = 0; raf = requestAnimationFrame(ruta); } }
        korBtn.addEventListener('click', function () {
            if (spelar) { spelar = false; rita(); return; }
            if (n >= sista()) { n = 0; klock = 0; }
            spelar = true;
            rita();
            kor();
        });
        stegBtn.addEventListener('click', function () {
            spelar = false;
            n = Math.min(sista(), n + 1);
            klock = n * p.dt;
            rita();
        });
        omBtn.addEventListener('click', function () { spelar = false; n = 0; klock = 0; rita(); });
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                synlig = entries[0].isIntersecting;
                if (synlig) kor();
            }, { threshold: 0.05 });
            io.observe(card);
        }
        rakna();
        rita();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: vinkelrata
    // ══════════════════════════════════════════════════════════════════════
    // ma1c-4.7 (Vinkelräta linjer, överkurs): en blå linje genom punkten
    // P = (3, 2) med lutningstrappan 1 steg åt höger och k₁ steg upp. Samma
    // trappa vriden ett kvarts varv moturs kring P ligger på den gröna,
    // vinkelräta linjen: 1 steg upp och k₁ steg åt vänster, så att
    // k₂ = −1/k₁. Eleven väljer k₁ med glidaren eller genom att dra i den
    // blå linjen; "Vrid trappan 90°" låter en kopia av den blå trappan
    // svänga över till den gröna linjen. k₁ = 0 visar undantaget: den gröna
    // linjen blir lodrät och saknar k-värde. Etiketterna vid trappornas
    // steg vrids med trappan, så att de aldrig hamnar på den andra linjen.
    function buildVinkelrata(node, cfg) {
        var INK = '#1f2530', BLA = '#2563c9', GRON = '#3f7a2e', ORANGE = '#b8531f';
        var GRID = 'rgba(31,37,48,0.15)';
        var U = 40, XMIN = -1, XMAX = 7, YMIN = -2, YMAX = 6, PX = 3, PY = 2;
        // k₁-värden som glidaren stegar mellan (täljare, nämnare). Listan är
        // sluten under k → −1/k, så att även k₂ alltid är ett "snällt" bråk.
        var KV = [[-3, 1], [-2, 1], [-3, 2], [-1, 1], [-2, 3], [-1, 2], [-1, 3], [0, 1],
                  [1, 3], [1, 2], [2, 3], [1, 1], [3, 2], [2, 1], [3, 1]];
        var ix = 13;                 // k₁ = 2 från början
        var visaTrappor = true, visaGron = true;
        var vrid = -1;               // −1: ingen vridning pågår, annars 0…1
        var rafId = 0;

        function X(x) { return (x - XMIN) * U; }
        function Y(y) { return (YMAX - y) * U; }
        function r1(v) { return Math.round(v * 10) / 10; }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function minus(s) { return String(s).replace('-', '−'); }
        function kVal(i) { return KV[i][0] / KV[i][1]; }
        function ln(x1, y1, x2, y2, col, w, extra) {
            return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) +
                '" stroke="' + col + '" stroke-width="' + w + '"' + (extra || '') + '/>';
        }
        // Bråk i SVG: täljare över nämnare med rakt streck, centrerat i (cx, cy)
        function svgTal(n, d, cx, cy, col, fs) {
            if (d === 1) {
                return '<text x="' + r1(cx) + '" y="' + r1(cy + fs * 0.36) + '" font-size="' + fs +
                    '" text-anchor="middle" fill="' + col + '">' + n + '</text>';
            }
            var f = fs * 0.82, w = f * 0.62 + 6;
            return '<text x="' + r1(cx) + '" y="' + r1(cy - 3) + '" font-size="' + f + '" text-anchor="middle" fill="' + col + '">' + n + '</text>' +
                ln(cx - w / 2, cy, cx + w / 2, cy, col, 1.3) +
                '<text x="' + r1(cx) + '" y="' + r1(cy + f * 0.78 + 2) + '" font-size="' + f + '" text-anchor="middle" fill="' + col + '">' + d + '</text>';
        }
        // HTML-bråk för avläsningen
        function htmlTal(n, d, neg) {
            var t = neg ? '−' : '';
            if (d === 1) return t + n;
            return t + '<span style="display:inline-flex;flex-direction:column;align-items:center;' +
                'vertical-align:middle;line-height:1.05;font-size:0.92em;margin:0 1px">' +
                '<span style="padding:0 2px">' + n + '</span>' +
                '<span style="border-top:1.5px solid currentColor;padding:0 2px">' + d + '</span></span>';
        }

        // ── Fast bakgrund: rutnät, axlar, skalvärden ───────────────────────
        var bas = '', x, y;
        for (x = XMIN; x <= XMAX; x++) bas += ln(X(x), Y(YMAX), X(x), Y(YMIN), GRID, 1);
        for (y = YMIN; y <= YMAX; y++) bas += ln(X(XMIN), Y(y), X(XMAX), Y(y), GRID, 1);
        bas += ln(X(XMIN), Y(0), X(XMAX) + 6, Y(0), INK, 1.6) +
            '<polygon points="' + (X(XMAX) + 16) + ',' + Y(0) + ' ' + (X(XMAX) + 6) + ',' + (Y(0) - 4.5) + ' ' +
            (X(XMAX) + 6) + ',' + (Y(0) + 4.5) + '" fill="' + INK + '"/>';
        bas += ln(X(0), Y(YMIN), X(0), Y(YMAX) - 6, INK, 1.6) +
            '<polygon points="' + X(0) + ',' + (Y(YMAX) - 16) + ' ' + (X(0) - 4.5) + ',' + (Y(YMAX) - 6) + ' ' +
            (X(0) + 4.5) + ',' + (Y(YMAX) - 6) + '" fill="' + INK + '"/>';
        bas += '<text x="' + (X(XMAX) + 14) + '" y="' + (Y(0) + 19) + '" font-size="15" text-anchor="end" fill="' + INK + '">' + it('x') + '</text>';
        bas += '<text x="' + (X(0) + 9) + '" y="' + (Y(YMAX) - 6) + '" font-size="15" fill="' + INK + '">' + it('y') + '</text>';
        for (x = XMIN; x <= XMAX - 1; x++) {
            if (x === 0) continue;
            bas += '<text x="' + X(x) + '" y="' + (Y(0) + 16) + '" font-size="12" text-anchor="middle" fill="' + INK + '">' + minus(x) + '</text>';
        }
        for (y = YMIN; y <= YMAX - 1; y++) {
            if (y === 0) continue;
            bas += '<text x="' + (X(0) - 6) + '" y="' + (Y(y) + 4) + '" font-size="12" text-anchor="end" fill="' + INK + '">' + minus(y) + '</text>';
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var W = X(XMAX) + 22, H = Y(YMIN);
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="-22 -24 ' + (W + 22) + ' ' + (H + 30) + '" width="593" height="' +
            Math.round(593 * (H + 30) / (W + 22)) + '" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="Ett koordinatsystem med en blå linje och en grön linje som skär varandra i rät vinkel i punkten (3, 2). ' +
            'Den blå linjens trappsteg går 1 steg åt höger och k1 steg upp. Samma trappsteg vridet ett kvarts varv ligger på den gröna linjen: ' +
            '1 steg upp och k1 steg åt vänster.">' +
            '<defs><clipPath id="ms-vr-klipp-' + (++vrRaknare) + '"><rect x="' + X(XMIN) + '" y="' + Y(YMAX) + '" width="' +
            (X(XMAX) - X(XMIN)) + '" height="' + (Y(YMIN) - Y(YMAX)) + '"/></clipPath></defs>' +
            bas + '<g class="ms-vr-dyn"></g>' +
            '<rect x="' + X(XMIN) + '" y="' + Y(YMAX) + '" width="' + (X(XMAX) - X(XMIN)) + '" height="' + (Y(YMIN) - Y(YMAX)) +
            '" fill="transparent" class="ms-vr-drag" style="cursor:grab;touch-action:pan-y"/></svg>';
        var klippId = 'ms-vr-klipp-' + vrRaknare;
        var dyn = scene.querySelector('.ms-vr-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, (W + 22) / (H + 30), 200);

        var info = document.createElement('div');
        info.className = 'minisim-info';
        info.style.fontSize = '15px';
        info.style.lineHeight = '1.9';
        info.style.color = INK;
        card.appendChild(info);

        var rad = document.createElement('div');
        rad.className = 'minisim-slider-row';
        var sLbl = document.createElement('span');
        sLbl.className = 'minisim-slider-lbl';
        sLbl.textContent = 'Blå linjens lutning';
        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'minisim-slider';
        slider.min = '0';
        slider.max = String(KV.length - 1);
        slider.step = '1';
        slider.value = String(ix);
        slider.setAttribute('aria-label', 'Den blå linjens riktningskoefficient k1');
        var sVal = document.createElement('span');
        sVal.className = 'minisim-slider-val';
        rad.appendChild(sLbl);
        rad.appendChild(slider);
        rad.appendChild(sVal);
        card.appendChild(rad);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var vridBtn = document.createElement('button');
        vridBtn.type = 'button';
        vridBtn.className = 'minisim-btn ms-primar';
        vridBtn.textContent = 'Vrid trappan 90°';
        controls.appendChild(vridBtn);
        function mkCheck(txt, on) {
            var l = document.createElement('label');
            l.className = 'minisim-check';
            var cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = on;
            l.appendChild(cb);
            l.appendChild(document.createTextNode(txt));
            controls.appendChild(l);
            return cb;
        }
        var trCb = mkCheck('Visa trappstegen', true);
        var grCb = mkCheck('Visa den vinkelräta linjen', true);
        card.appendChild(controls);
        node.appendChild(card);

        // ── Ritning ───────────────────────────────────────────────────────
        // Linjen genom P i riktningen (dx, dy), klippt till rutnätet
        function linje(dx, dy, col, w, extra) {
            var L = 30 / Math.hypot(dx, dy);
            return ln(X(PX - dx * L), Y(PY - dy * L), X(PX + dx * L), Y(PY + dy * L), col, w,
                (extra || '') + ' clip-path="url(#' + klippId + ')"');
        }
        // Trappan i lokala koordinater (a = steget längs, b = steget upp),
        // vriden vinkeln v (rad, moturs) kring P. Etiketterna vrids med.
        function rot(p, v) {
            var c = Math.cos(v), s = Math.sin(v);
            return [PX + p[0] * c - p[1] * s, PY + p[0] * s + p[1] * c];
        }
        function trappa(k, v, col, fill, etiketter) {
            var n = KV[ix][0], d = KV[ix][1];
            var a = rot([1, 0], v), b = rot([1, k], v), o = [PX, PY];
            var s = '';
            if (fill && k !== 0) {
                s += '<polygon points="' + r1(X(o[0])) + ',' + r1(Y(o[1])) + ' ' + r1(X(a[0])) + ',' + r1(Y(a[1])) + ' ' +
                    r1(X(b[0])) + ',' + r1(Y(b[1])) + '" fill="' + fill + '"/>';
            }
            var dash = ' stroke-dasharray="6 4" stroke-linecap="butt"';
            s += ln(X(o[0]), Y(o[1]), X(a[0]), Y(a[1]), col, 2.2, dash);
            if (k !== 0) s += ln(X(a[0]), Y(a[1]), X(b[0]), Y(b[1]), col, 2.2, dash);
            if (!etiketter) return s;
            // "1" vid steget längs: på andra sidan om stegets mitt än trappan
            // när trappan är smal (|k| < 1), annars inne i trappan.
            var sida = k >= 0 ? 1 : -1;
            var inne = Math.abs(k) >= 1;
            var e1 = rot([0.55, (inne ? 0.28 : -0.4) * sida], v);
            s += svgTal(1, 1, X(e1[0]), Y(e1[1]), col, 16);
            if (k !== 0) {
                // |k| vid steget upp: utanför trappan, på den sida som vänder bort från P
                // en flack trappa: etiketten sänks så att den går fri från linjen
                var e2 = rot([1 + (d === 1 ? 0.26 : 0.34), k / 2 - (inne ? 0 : 0.3 * sida)], v);
                s += svgTal(Math.abs(n), d, X(e2[0]), Y(e2[1]), col, 16);
            }
            return s;
        }
        // Rät vinkel-markering i P mellan riktningarna (1, k) och (−k, 1)
        function ratVinkel(k) {
            var L = Math.hypot(1, k), ux = 1 / L, uy = k / L, vx = -k / L, vy = 1 / L, m = 0.3;
            var p1 = [PX + ux * m, PY + uy * m], p2 = [p1[0] + vx * m, p1[1] + vy * m], p3 = [PX + vx * m, PY + vy * m];
            return '<polyline points="' + r1(X(p1[0])) + ',' + r1(Y(p1[1])) + ' ' + r1(X(p2[0])) + ',' + r1(Y(p2[1])) + ' ' +
                r1(X(p3[0])) + ',' + r1(Y(p3[1])) + '" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
        }

        function rita() {
            var k = kVal(ix), n = KV[ix][0], d = KV[ix][1];
            var s = '';
            var visG = grCb.checked, visT = trCb.checked;
            if (visG) s += linje(-k, 1, GRON, 2.4);
            s += linje(1, k, BLA, 2.4);
            if (visT) {
                s += trappa(k, 0, BLA, 'rgba(37,99,201,0.12)', true);
                if (visG && vrid < 0) s += trappa(k, Math.PI / 2, GRON, 'rgba(63,122,46,0.14)', true);
            }
            if (vrid >= 0) {
                // kopian av den blå trappan svänger över till den gröna linjen
                var e = vrid < 0.5 ? 2 * vrid * vrid : 1 - Math.pow(-2 * vrid + 2, 2) / 2;
                s += trappa(k, e * Math.PI / 2, ORANGE, 'rgba(184,83,31,0.14)', vrid > 0.98);
            }
            if (visG) s += ratVinkel(k);
            s += '<circle cx="' + X(PX) + '" cy="' + Y(PY) + '" r="3.6" fill="' + INK + '"/>';
            dyn.innerHTML = s;

            // avläsningen
            var k1 = htmlTal(Math.abs(n), d, n < 0);
            sVal.innerHTML = '<em>k</em>₁ = ' + k1;
            var txt = '<span style="color:' + BLA + ';font-weight:600">Blå linje: <em>k</em>₁ = ' + k1 + '</span>';
            if (n === 0) {
                txt += '&emsp;<span style="color:' + GRON + ';font-weight:600">Grön linje: lodrät, saknar <em>k</em>-värde</span>' +
                    '<br><span style="color:#4a5160">En vågrät och en lodrät linje är vinkelräta, men produktregeln går inte att använda här.</span>';
            } else {
                // k₂ = −d/n
                var k2 = htmlTal(d, Math.abs(n), n > 0);
                txt += '&emsp;<span style="color:' + GRON + ';font-weight:600">Grön linje: <em>k</em>₂ = ' + k2 + '</span>' +
                    '<br><em>k</em>₁ · <em>k</em>₂ = ' + (n < 0 ? '(' + k1 + ')' : k1) + ' · ' + (n > 0 ? '(' + k2 + ')' : k2) +
                    ' = <strong>−1</strong>';
            }
            info.innerHTML = txt;
        }

        function animera() {
            var t0 = 0, DUR = 1300;
            cancelAnimationFrame(rafId);
            function steg(ts) {
                if (!t0) t0 = ts;
                vrid = Math.min(1, (ts - t0) / DUR);
                rita();
                if (vrid < 1) { rafId = requestAnimationFrame(steg); return; }
                setTimeout(function () { vrid = -1; rita(); }, 900);
            }
            rafId = requestAnimationFrame(steg);
        }
        vridBtn.addEventListener('click', function () {
            if (!trCb.checked) trCb.checked = true;
            animera();
        });
        slider.addEventListener('input', function () { ix = +slider.value; vrid = -1; rita(); });
        trCb.addEventListener('change', rita);
        grCb.addEventListener('change', rita);

        // Dra i den blå linjen: närmaste k i listan efter vinkeln från P
        var svgEl = scene.querySelector('svg'), dragYta = scene.querySelector('.ms-vr-drag'), drar = false;
        function svgPunkt(e) {
            var pt = svgEl.createSVGPoint();
            pt.x = e.clientX; pt.y = e.clientY;
            var m = svgEl.getScreenCTM();
            return m ? pt.matrixTransform(m.inverse()) : null;
        }
        function fran(e) {
            var p = svgPunkt(e);
            if (!p) return;
            var dx = p.x / U + XMIN - PX, dy = YMAX - p.y / U - PY;
            if (Math.hypot(dx, dy) < 0.3) return;
            if (dx < 0) { dx = -dx; dy = -dy; }
            var vinkel = Math.atan2(dy, dx), bast = ix, minD = 9;
            for (var i = 0; i < KV.length; i++) {
                var dv = Math.abs(Math.atan(kVal(i)) - vinkel);
                if (dv < minD) { minD = dv; bast = i; }
            }
            if (bast !== ix) { ix = bast; slider.value = String(ix); vrid = -1; rita(); }
        }
        dragYta.addEventListener('pointerdown', function (e) {
            drar = true;
            dragYta.style.cursor = 'grabbing';
            if (dragYta.setPointerCapture) dragYta.setPointerCapture(e.pointerId);
            fran(e);
        });
        dragYta.addEventListener('pointermove', function (e) { if (drar) fran(e); });
        function slapp() { drar = null; dragYta.style.cursor = 'grab'; }
        dragYta.addEventListener('pointerup', slapp);
        dragYta.addEventListener('pointercancel', slapp);

        // Test-handtag för skärmdumpsskript
        card._set = function (i, v) { ix = i; slider.value = String(i); vrid = v == null ? -1 : v; rita(); };
        rita();
    }
    var vrRaknare = 0;

    // ══════════════════════════════════════════════════════════════════════
    //  Gemensamma hjälpare för vågsimuleringarna (pulsvag, vagtyp)
    // ══════════════════════════════════════════════════════════════════════
    function vgR1(v) { return Math.round(v * 10) / 10; }
    function vgBtn(text, cls) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
        b.textContent = text;
        return b;
    }
    function vgCheck(text, on) {
        var l = document.createElement('label');
        l.className = 'minisim-check';
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = on;
        l.appendChild(cb);
        l.appendChild(document.createTextNode(text));
        return { label: l, cb: cb };
    }
    function vgRutnat(id, x, y, w, h) {
        return '<defs><pattern id="' + id + '" width="20" height="20" patternUnits="userSpaceOnUse">' +
            '<path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2563c9" stroke-width="0.6" opacity="0.13"/></pattern></defs>' +
            '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#' + id + ')"/>';
    }
    // vågrät pil (skaftet slutar vid huvudets bas)
    function vgPilX(x1, x2, y, color, w) {
        var dir = x2 > x1 ? 1 : -1, head = 9, bx = x2 - dir * head;
        return '<line x1="' + vgR1(x1) + '" y1="' + vgR1(y) + '" x2="' + vgR1(bx) + '" y2="' + vgR1(y) +
            '" stroke="' + color + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="butt"/>' +
            '<polygon points="' + vgR1(bx) + ',' + vgR1(y - 4.5) + ' ' + vgR1(x2) + ',' + vgR1(y) + ' ' +
            vgR1(bx) + ',' + vgR1(y + 4.5) + '" fill="' + color + '"/>';
    }
    // måttpil med spets i båda ändar (partikelns rörelseområde)
    function vgDubbelpil(x1, y1, x2, y2, color) {
        var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, h = 7, b = 3.6;
        function huvud(px, py, sx, sy) {
            var bx = px - sx * h, by = py - sy * h;
            return '<polygon points="' + vgR1(bx - sy * b) + ',' + vgR1(by + sx * b) + ' ' + vgR1(px) + ',' + vgR1(py) + ' ' +
                vgR1(bx + sy * b) + ',' + vgR1(by - sx * b) + '" fill="' + color + '"/>';
        }
        return '<line x1="' + vgR1(x1 + ux * h) + '" y1="' + vgR1(y1 + uy * h) + '" x2="' + vgR1(x2 - ux * h) + '" y2="' +
            vgR1(y2 - uy * h) + '" stroke="' + color + '" stroke-width="1.8" stroke-linecap="butt"/>' +
            huvud(x2, y2, ux, uy) + huvud(x1, y1, -ux, -uy);
    }
    // rAF-slinga som pausar när kortet inte syns
    function vgLoop(card, tick) {
        var raf = null, senast = 0, synlig = true, igang = false;
        function steg(nu) {
            raf = null;
            if (!igang || !synlig) return;
            var dt = senast ? Math.min(0.05, (nu - senast) / 1000) : 0;
            senast = nu;
            tick(dt);
            raf = requestAnimationFrame(steg);
        }
        function kor() { if (!raf && igang && synlig) { senast = 0; raf = requestAnimationFrame(steg); } }
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (e) { synlig = e[0].isIntersecting; if (synlig) kor(); }, { threshold: 0.05 });
            io.observe(card);
        }
        return { satt: function (v) { igang = v; if (v) kor(); }, igang: function () { return igang; } };
    }

    // Spela/pausa-knapp och tidsglidare (0 … max s) för vågsimuleringarna.
    // Glidaren pausar och ställer tiden, så att vågen går att frysa i ett läge.
    function vgTid(max, hamta, satt) {
        var PLAY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4 L20 12 L7 20 Z"/></svg>';
        var PAUS = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
            '<rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>';
        var btn = vgBtn('');
        btn.style.display = 'inline-flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '6px';
        var rad = document.createElement('div');
        rad.className = 'minisim-slider-row';
        var lblEl = document.createElement('span');
        lblEl.className = 'minisim-slider-lbl';
        lblEl.innerHTML = 'Tid <em>t</em>';
        var sl = document.createElement('input');
        sl.type = 'range';
        sl.className = 'minisim-slider';
        sl.min = '0'; sl.max = String(max); sl.step = '0.01'; sl.value = '0';
        sl.setAttribute('aria-label', 'Tiden i sekunder');
        var val = document.createElement('span');
        val.className = 'minisim-slider-val';
        rad.appendChild(lblEl);
        rad.appendChild(sl);
        rad.appendChild(val);
        var loop = null, drar = false, visatLage = null;
        function fmt(v) { var x = v.toFixed(2); return parseFloat(x) === 0 ? '0' : x.replace('.', ','); }
        function visa() {
            var t = ((hamta() % max) + max) % max;
            if (!drar) sl.value = String(t);
            val.textContent = fmt(t) + ' s';
            var p = !!(loop && loop.igang());
            if (p !== visatLage) {
                visatLage = p;
                btn.innerHTML = (p ? PAUS : PLAY) + '<span>' + (p ? 'Pausa' : 'Spela') + '</span>';
                btn.classList.toggle('ms-primar', !p);
            }
        }
        function spela(v) { if (loop) loop.satt(v); visa(); }
        btn.addEventListener('click', function () { spela(!(loop && loop.igang())); });
        sl.addEventListener('input', function () {
            drar = true;
            if (loop) loop.satt(false);
            satt(parseFloat(sl.value));
            drar = false;
            visa();
        });
        return { btn: btn, rad: rad, visa: visa, spela: spela, koppla: function (l) { loop = l; } };
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: pulsvag  (visa: puls | vag)
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.7 (Pulser, vågor och utbredningshastighet): en person håller i
    // ena änden av ett rep som går till ett träd. Ersätter genomgångens två
    // stillbilder och går av sig själv, utan knappar.
    //   puls: handen gör EN svängning (upp och tillbaka), ett ensamt vågberg
    //         vandrar mot trädet och försvinner där; efter en kort paus
    //         skickas nästa puls.
    //   vag:  handen svänger upp och ned hela tiden med frekvensen 1,0 Hz,
    //         och pulserna följer på varandra som en fortskridande våg.
    // Vågbergen i de två lägena är exakt lika (halv sinusperiod, samma fart),
    // så att sambandet "våg = pulser i jämn takt" syns. Modell: fortskridande
    // våg y(s, t) = D(t − s/v), där D är handens utslag. Vågen ska vara
    // FORTSKRIDANDE (ingen reflex): den klingar av mot trädet i stället.
    var pvRaknare = 0;
    function buildPulsvag(node, cfg) {
        var INK = '#1f2530', ROD = '#c0392b', REP = '#8a5a2b';
        var vag = /^v/i.test(cfg.visa || '');
        var X0 = 116, XT = 578, L = XT - X0, Y0 = 150, A = 34;   // repets början, trädet, vilolinje, amplitud
        var V = 150, F = 1.0, TP = 1 / F, AVKLING = 70;         // px/s, Hz, s, avklingning vid trädet (px)
        var CYKEL = 0.4 + TP / 2 + L / V + 1.2;                  // en puls + paus innan nästa
        var tid = vag ? 0 : 0;
        var id = 'ms-pv-rutnat-' + (++pvRaknare);

        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        // handens utslag (−1 … 1) vid tiden t
        function D(t) {
            if (vag) return Math.sin(2 * Math.PI * F * t);
            var u = t - 0.4;
            return (u > 0 && u < TP / 2) ? Math.sin(2 * Math.PI * F * u) : 0;
        }
        function repY(s, t) {
            var w = Math.min(1, (L - s) / AVKLING);
            w = w * w * (3 - 2 * w);                         // mjuk avklingning in mot trädet
            return Y0 - A * w * D(t - s / V);
        }

        // ── fast bakgrund: mark, träd ────────────────────────────────────
        var bas = vgRutnat(id, 0, 0, 640, 250);
        bas += '<line x1="0" y1="226" x2="640" y2="226" stroke="#6f8f4e" stroke-width="2"/>';
        for (var gx = 6; gx < 640; gx += 14) {
            bas += '<line x1="' + gx + '" y1="226" x2="' + (gx + 3) + '" y2="219" stroke="#6f8f4e" stroke-width="1.2" stroke-linecap="round"/>';
        }
        bas += '<path d="M 574 226 L 578 140 Q 584 120 590 140 L 596 226 Z" fill="#8a6a3a" stroke="#6b4f28" stroke-width="1.2"/>' +
            '<path d="M 584 132 Q 572 110 556 104" fill="none" stroke="#6b4f28" stroke-width="5" stroke-linecap="round"/>' +
            '<path d="M 588 128 Q 604 106 618 100" fill="none" stroke="#6b4f28" stroke-width="5" stroke-linecap="round"/>';
        [[586, 70, 34, '#5a9a4e'], [556, 92, 26, '#4f8c45'], [616, 90, 26, '#4f8c45'], [570, 56, 22, '#68a85a'],
         [604, 54, 22, '#68a85a'], [588, 40, 18, '#74b366']].forEach(function (c) {
            bas += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + c[3] + '"/>';
        });
        bas += '<ellipse cx="585" cy="' + Y0 + '" rx="12" ry="4" fill="none" stroke="' + REP + '" stroke-width="3"/>';

        function person(yh) {
            var s = '';
            s += '<path d="M 58 168 L 52 224 M 70 168 L 78 224" stroke="#34495e" stroke-width="9" stroke-linecap="round" fill="none"/>' +
                '<path d="M 46 225 L 58 225 M 74 225 L 87 225" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
            s += '<rect x="50" y="110" width="30" height="62" rx="12" fill="#5b7ea6" stroke="#46658a" stroke-width="1.2"/>';
            s += '<path d="M 56 120 Q 46 146 54 166" stroke="#4d6d92" stroke-width="8" stroke-linecap="round" fill="none"/>';
            s += '<circle cx="65" cy="94" r="13" fill="#f0c39c" stroke="#c99a72" stroke-width="1.2"/>' +
                '<path d="M 52 92 Q 54 77 67 79 Q 79 80 78 92 Q 72 84 62 86 Q 56 87 52 92 Z" fill="#5a3d26"/>' +
                '<circle cx="71" cy="94" r="1.4" fill="' + INK + '"/>';
            // främre arm: axel → armbåge → hand som håller repets ände
            var hx = X0 - 6, ex = 88, ey = 140 + (yh - Y0) * 0.45;
            s += '<path d="M 66 118 L ' + vgR1(ex) + ' ' + vgR1(ey) + ' L ' + vgR1(hx) + ' ' + vgR1(yh) +
                '" stroke="#5b7ea6" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
            s += '<circle cx="' + vgR1(hx + 2) + '" cy="' + vgR1(yh) + '" r="7" fill="#f0c39c" stroke="#c99a72" stroke-width="1.2"/>';
            return s;
        }

        function rita() {
            var s = '';
            var t = vag ? tid : (tid % CYKEL);
            var yh = Y0 - A * D(t);
            var pts = [];
            for (var x = X0; x <= XT; x += 3) pts.push(vgR1(x) + ',' + vgR1(repY(x - X0, t)));
            pts.push(XT + ',' + Y0);
            s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + REP + '" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/>';
            s += person(yh);
            if (!vag) {
                // "puls" och v-pil följer med vågberget
                var sc = V * (t - 0.4 - TP / 4);
                if (sc > 40 && sc < L - 90) {
                    var xc = X0 + sc;
                    s += lbl(xc, Y0 - A - 30, 'middle', 'puls', 15, INK, ' font-weight="600"');
                    s += vgPilX(xc - 18, xc + 22, Y0 - A - 14, ROD, 2.4) + lbl(xc + 28, Y0 - A - 9, 'start', it('v'), 16, ROD);
                }
            } else {
                // fast etikett över repet: en våg är pulser i jämn takt
                s += lbl(300, 62, 'middle', 'fortskridande våg', 15, INK, ' font-weight="600"');
                s += vgPilX(380, 430, 57, ROD, 2.4) + lbl(436, 62, 'start', it('v'), 16, ROD);
            }
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="20 30 616 206" width="640" height="214" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="' +
            (vag ? 'En person skakar ett rep upp och ned i jämn takt. Pulserna följer på varandra och bildar en ' +
                   'fortskridande våg som rör sig åt höger mot ett träd.'
                 : 'En person gör en enda svängning med handen. Ett ensamt vågberg, en puls, vandrar längs repet ' +
                   'åt höger mot ett träd.') + '">' +
            bas + '<g class="ms-pv-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-pv-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 616 / 206, 150);
        var tk = vgTid(vag ? 2 * TP : CYKEL, function () { return tid; }, function (t) { tid = t; rita(); });
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        controls.appendChild(tk.btn);
        card.appendChild(controls);
        card.appendChild(tk.rad);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        info.textContent = vag
            ? 'Handen svänger upp och ned med frekvensen f = 1,0 Hz, alltså en ny puls varje sekund. Pulserna bildar en våg.'
            : 'Handen gör en enda svängning, och ett ensamt vågberg vandrar längs repet. Det är en puls.';
        card.appendChild(info);
        node.appendChild(card);

        var loop = vgLoop(card, function (dt) { tid += dt; rita(); tk.visa(); });
        tk.koppla(loop);
        card._set = function (t) { tid = t; rita(); tk.visa(); };
        rita();
        tk.spela(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: vagtyp  (visa: transversell | longitudinell)
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.7: en fortskridande våg åt höger i ett medium av partiklar. EN
    // partikel är markerad i signalfärg, och en måttpil visar dess
    // rörelseområde runt viloläget (grå streckmarkering).
    //   transversell:  partiklarna på en rad svänger upp och ned,
    //                  y = A · sin(ω · t − k · x); den röda partikeln rör sig
    //                  vinkelrätt mot utbredningsriktningen.
    //   longitudinell: partiklar i ett rutnät svänger fram och tillbaka,
    //                  ξ = A · sin(ω · t − k · x); förtätningar och
    //                  förtunningar vandrar åt höger medan den röda
    //                  partikeln bara pendlar kring sitt viloläge.
    // Kryssrutan "Följ en vågtopp"/"Följ en förtätning" sätter en markör som
    // åker med vågen, så att skillnaden mellan vågens och partikelns rörelse
    // syns. Starta/Pausa, Ultrarapid.
    var vtRaknare = 0;
    function buildVagtyp(node, cfg) {
        var INK = '#1f2530', ROD = '#c0392b', SIGNAL = '#e8590c', PART = '#5b7ea6', GREY = '#8a919b';
        var longi = /^long/i.test(cfg.visa || '');
        var LAMBDA = 200, T = 2.4, K = 2 * Math.PI / LAMBDA, OM = 2 * Math.PI / T;
        var tid = 0.6 * T, ultra = false, folj = true;
        var id = 'ms-vt-rutnat-' + (++vtRaknare);
        var W = 640, H = longi ? 220 : 210;

        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }

        // ── parametrar per vågtyp ────────────────────────────────────────
        var cols = [], rows, AMP, YC, XR;
        if (!longi) {
            AMP = 38; YC = 118; rows = [YC];
            for (var x = 40; x <= 600; x += 16) cols.push(x);
            XR = 312;                                  // den röda partikelns viloläge
        } else {
            AMP = 14; YC = 132; rows = [];
            for (var r = 0; r < 7; r++) rows.push(84 + r * 16);
            for (var x2 = 34; x2 <= 606; x2 += 11) cols.push(x2);
            XR = 309;
        }
        var RAD = 3 - 1;                               // rad-index för den röda partikeln (longitudinell)
        // stabil, liten spridning i viloläget så att mediet ser ut som luft
        var jit = [];
        var seed = 7;
        function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
        rows.forEach(function () { jit.push(cols.map(function () { return longi ? (rnd() - 0.5) * 3 : 0; })); });

        var bas = vgRutnat(id, 0, 0, W, H);
        // vågens utbredningsriktning
        bas += vgPilX(470, 560, 28, ROD, 2.6) + lbl(566, 33, 'start', it('v'), 16, ROD) +
            lbl(462, 33, 'end', 'vågens utbredningsriktning', 13, ROD);
        if (!longi) {
            bas += '<line x1="30" y1="' + YC + '" x2="610" y2="' + YC + '" stroke="' + GREY + '" stroke-width="1" stroke-dasharray="5 4"/>';
            // den röda partikelns rörelseområde
            bas += vgDubbelpil(XR, YC - AMP, XR, YC + AMP, SIGNAL) +
                lbl(XR, YC + AMP + 26, 'middle', 'partikelns rörelse', 13, SIGNAL);
        } else {
            bas += vgDubbelpil(XR - AMP, 204, XR + AMP, 204, SIGNAL) +
                lbl(XR + AMP + 10, 209, 'start', 'partikelns rörelse', 13, SIGNAL);
            bas += '<line x1="' + XR + '" y1="76" x2="' + XR + '" y2="196" stroke="' + GREY + '" stroke-width="1" stroke-dasharray="3 4"/>';
        }

        function rita() {
            var s = '';
            var fas = OM * tid;
            if (!longi) {
                // tunn tråd som binder ihop partiklarna
                var pts = [];
                for (var x = 30; x <= 610; x += 4) pts.push(x + ',' + vgR1(YC - AMP * Math.sin(fas - K * x)));
                s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#b9c4d2" stroke-width="1.4"/>';
                if (folj) {
                    // vågtoppen: fas − k·x = π/2 → x = (fas − π/2)/k (+ n·λ); välj den som ligger närmast 1/3 in
                    var xt = (fas - Math.PI / 2) / K;
                    xt = ((xt % LAMBDA) + LAMBDA) % LAMBDA;
                    for (var n = 0; n < 4; n++) {
                        var xx = xt + n * LAMBDA;
                        if (xx < 36 || xx > 604) continue;
                        s += '<polygon points="' + vgR1(xx - 6) + ',' + (YC - AMP - 18) + ' ' + vgR1(xx + 6) + ',' + (YC - AMP - 18) + ' ' +
                            vgR1(xx) + ',' + (YC - AMP - 9) + '" fill="' + INK + '" opacity="0.75"/>';
                    }
                    s += lbl(70, YC - AMP - 26, 'middle', 'vågtopp', 12, '#4a5160');
                }
                cols.forEach(function (x) {
                    if (x === XR) return;
                    s += '<circle cx="' + x + '" cy="' + vgR1(YC - AMP * Math.sin(fas - K * x)) + '" r="5" fill="' + PART + '" stroke="#3f6189" stroke-width="1"/>';
                });
                var yr = YC - AMP * Math.sin(fas - K * XR);
                s += '<line x1="' + (XR - 9) + '" y1="' + YC + '" x2="' + (XR + 9) + '" y2="' + YC + '" stroke="' + SIGNAL + '" stroke-width="1.6" opacity="0.6"/>';
                s += '<circle cx="' + XR + '" cy="' + vgR1(yr) + '" r="7.5" fill="' + SIGNAL + '" stroke="#9c3a06" stroke-width="1.4"/>';
            } else {
                if (folj) {
                    // förtätning där cos(fas − k·x) = 1, förtunning där = −1
                    var xc = fas / K;
                    xc = ((xc % LAMBDA) + LAMBDA) % LAMBDA;
                    for (var n2 = -1; n2 < 4; n2++) {
                        var xa = xc + n2 * LAMBDA, xb = xa + LAMBDA / 2;
                        if (xa > 60 && xa < 580) {
                            s += '<rect x="' + vgR1(xa - 24) + '' + '" y="76" width="48" height="120" rx="6" fill="#2563c9" opacity="0.07"/>';
                            s += lbl(xa, 66, 'middle', 'förtätning', 12, '#2f5aa8');
                        }
                        if (xb > 60 && xb < 580) s += lbl(xb, 66, 'middle', 'förtunning', 12, '#6b7280');
                    }
                }
                rows.forEach(function (y, ri) {
                    cols.forEach(function (x, ci) {
                        if (ri === RAD && x === XR) return;
                        var xs = x + jit[ri][ci] + AMP * Math.sin(fas - K * x);
                        s += '<circle cx="' + vgR1(xs) + '" cy="' + vgR1(y + jit[ri][(ci + 3) % cols.length]) + '" r="3.4" fill="' + PART + '"/>';
                    });
                });
                var xr = XR + AMP * Math.sin(fas - K * XR);
                s += '<circle cx="' + vgR1(xr) + '" cy="' + rows[RAD] + '" r="6.5" fill="' + SIGNAL + '" stroke="#9c3a06" stroke-width="1.4"/>';
            }
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        var vb = longi ? '14 14 620 206' : '14 14 620 182';
        var vbH = longi ? 206 : 182;
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="' + vb + '" width="640" height="' + Math.round(640 * vbH / 620) + '" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="' +
            (longi ? 'Longitudinell våg: partiklarna svänger fram och tillbaka i samma riktning som vågen går, åt höger. ' +
                     'Förtätningar och förtunningar vandrar åt höger medan den markerade partikeln bara pendlar kring sitt viloläge.'
                   : 'Transversell våg: partiklarna svänger upp och ned medan vågen går åt höger. ' +
                     'Den markerade partikeln rör sig vinkelrätt mot vågens utbredningsriktning.') + '">' +
            bas + '<g class="ms-vt-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-vt-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 620 / vbH, 110);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var tk = vgTid(T, function () { return tid; }, function (t) { tid = t; rita(); });
        var startBtn = tk.btn;
        var ultraCk = vgCheck('Ultrarapid', false);
        var foljCk = vgCheck(longi ? 'Markera förtätningar' : 'Markera vågtopparna', true);
        controls.appendChild(startBtn);
        controls.appendChild(ultraCk.label);
        controls.appendChild(foljCk.label);
        card.appendChild(controls);
        card.appendChild(tk.rad);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        info.textContent = longi
            ? 'Vågen går åt höger. Den orange partikeln rör sig fram och tillbaka i samma riktning, men följer inte med vågen.'
            : 'Vågen går åt höger, men den orange partikeln rör sig bara upp och ned, vinkelrätt mot vågens riktning.';
        card.appendChild(info);
        node.appendChild(card);

        var loop = vgLoop(card, function (dt) { tid += dt * (ultra ? 0.25 : 1); rita(); tk.visa(); });
        tk.koppla(loop);
        function setSpelar(v) { tk.spela(v); }
        ultraCk.cb.addEventListener('change', function () { ultra = ultraCk.cb.checked; });
        foljCk.cb.addEventListener('change', function () { folj = foljCk.cb.checked; rita(); });
        card._set = function (t) { tid = t; rita(); tk.visa(); };
        rita();
        setSpelar(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: ytvag  (visa: vatten | rayleigh)
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.7, rutan "Fler typer av vågor": en ytvåg går åt höger genom ett
    // rutnät av partiklar. Två partiklar är markerade, en vid ytan och en
    // längre ned, med sina banor (streckade) och en pil som visar varvets
    // riktning. Startar direkt; Pausa och Ultrarapid.
    //   vatten:   djupvattenvåg. x = x₀ − a(z) · sin(k·x₀ − ω·t),
    //             y = a(z) · cos(k·x₀ − ω·t), a(z) = A · e^(−k·z).
    //             Båda partiklarna går i cirkelbanor medurs (framåt i
    //             vågtoppen), den undre med mindre radie.
    //   rayleigh: Rayleigh-våg i ett fast material (Poissons tal 0,25).
    //             U(z) ∝ e^(−0,8475·kz) − 0,5773 · e^(−0,3933·kz),
    //             W(z) ∝ −0,8475 · e^(−0,8475·kz) + 1,4679 · e^(−0,3933·kz).
    //             Vid ytan går partikeln i en ellips MOTURS (bakåt i
    //             vågtoppen); under djupet kz ≈ 1,21 (≈ 0,19 λ) byter U
    //             tecken och partikeln går medurs.
    var ytRaknare = 0;
    function buildYtvag(node, cfg) {
        var INK = '#1f2530', ROD = '#c0392b', C1 = '#e8590c', C2 = '#b0247a';
        var ray = /^ray/i.test(cfg.visa || '');
        var LAMBDA = 240, K = 2 * Math.PI / LAMBDA, T = 3.0, OM = 2 * Math.PI / T;
        var YS = 96;                                   // ytans viloläge
        var tid = 0, ultra = false;
        var id = 'ms-yt-rutnat-' + (++ytRaknare);
        var DX = ray ? 16 : 14, DZ = ray ? 16 : 15;
        var xs = [], zs = [];
        for (var x = -24; x <= 664; x += DX) xs.push(x);
        for (var z = 0; z <= (ray ? 150 : 120); z += DZ) zs.push(z);

        // förskjutning (dx, dy uppåt) vid viloläge (x0, z) och fas φ = k·x0 − ω·t
        var A = 22, S = 40;
        function U(z) { var a = K * z; return S * (Math.exp(-0.8475 * a) - 0.5773 * Math.exp(-0.3933 * a)); }
        function Wz(z) { var a = K * z; return S * (-0.8475 * Math.exp(-0.8475 * a) + 1.4679 * Math.exp(-0.3933 * a)); }
        function las(x0, z, t) {
            var f = K * x0 - OM * t;
            if (!ray) { var a = A * Math.exp(-K * z); return [x0 - a * Math.sin(f), YS + z - a * Math.cos(f)]; }
            return [x0 + U(z) * Math.sin(f), YS + z - Wz(z) * Math.cos(f)];
        }
        // de två markerade partiklarna och deras banor
        var M1 = { x: 222, z: 0, c: C1 }, M2 = { x: 446, z: ray ? 2.9 / K : 30, c: C2 };
        M2.z = Math.round(M2.z / DZ) * DZ;
        M1.x = xs.reduce(function (b, v) { return Math.abs(v - M1.x) < Math.abs(b - M1.x) ? v : b; });
        M2.x = xs.reduce(function (b, v) { return Math.abs(v - M2.x) < Math.abs(b - M2.x) ? v : b; });
        function radier(m) {
            if (!ray) { var a = A * Math.exp(-K * m.z); return [a, a, 1]; }
            var u = U(m.z), w = Wz(m.z);
            return [Math.abs(u), Math.abs(w), u > 0 ? -1 : 1];      // +1 = medurs, −1 = moturs
        }

        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        // etikett i en liten pappersruta, så att den går att läsa ovanpå rutnätet
        function ruta(x, y, anchor, text, color) {
            var w = text.length * 6.5 + 12, x0 = anchor === 'start' ? x - 6 : (anchor === 'end' ? x - w + 6 : x - w / 2);
            return '<rect x="' + vgR1(x0) + '" y="' + vgR1(y - 14) + '" width="' + vgR1(w) + '" height="20" rx="4" fill="#f7f2e8" stroke="' + color + '" stroke-width="1"/>' +
                lbl(x, y, anchor, text, 12.5, color, ' font-weight="600"');
        }
        function bana(m) {
            var r = radier(m), cx = m.x, cy = YS + m.z, s = '';
            s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + vgR1(r[0]) + '" ry="' + vgR1(r[1]) + '" fill="none" stroke="' + m.c +
                '" stroke-width="1.8" stroke-dasharray="4 3"/>';
            // pilhuvuden i toppen och botten som visar varvets riktning
            [[-1, r[2]], [1, -r[2]]].forEach(function (p) {
                var py = cy + p[0] * r[1], d = p[1];
                s += '<polygon points="' + vgR1(cx - d * 5) + ',' + vgR1(py - 4.5) + ' ' + vgR1(cx + d * 6) + ',' + vgR1(py) + ' ' +
                    vgR1(cx - d * 5) + ',' + vgR1(py + 4.5) + '" fill="' + m.c + '"/>';
            });
            return s;
        }

        var bas = vgRutnat(id, 0, 0, 640, 280);
        bas += vgPilX(470, 560, 30, ROD, 2.6) + lbl(566, 35, 'start', it('v'), 16, ROD) +
            lbl(462, 35, 'end', 'vågens utbredningsriktning', 13, ROD);
        var dynId = 'ms-yt-dyn';

        function rita() {
            var s = '';
            var yta = xs.map(function (x0) { return las(x0, 0, tid); });
            var botten = YS + zs[zs.length - 1] + 14;
            var poly = yta.map(function (p) { return vgR1(p[0]) + ',' + vgR1(p[1]); }).join(' ');
            s += '<polygon points="' + poly + ' 664,' + botten + ' -24,' + botten + '" fill="' + (ray ? '#e3d3b4' : '#cfe3f3') + '"/>';
            if (ray) {
                // rutnätet i det fasta materialet
                var rader = zs.map(function (z) { return xs.map(function (x0) { return las(x0, z, tid); }); });
                rader.forEach(function (r) {
                    s += '<polyline points="' + r.map(function (p) { return vgR1(p[0]) + ',' + vgR1(p[1]); }).join(' ') +
                        '" fill="none" stroke="#a08055" stroke-width="1"/>';
                });
                xs.forEach(function (x0, ci) {
                    s += '<polyline points="' + rader.map(function (r) { return vgR1(r[ci][0]) + ',' + vgR1(r[ci][1]); }).join(' ') +
                        '" fill="none" stroke="#a08055" stroke-width="1"/>';
                });
                // djupet där rörelsen byter riktning
                var zb = 1.209 / K;
                s += '<line x1="0" y1="' + vgR1(YS + zb) + '" x2="640" y2="' + vgR1(YS + zb) + '" stroke="#6b5636" stroke-width="1.2" stroke-dasharray="7 5" opacity="0.7"/>';
                s += ruta(24, YS + zb + 5, 'start', 'här byter rörelsen riktning', '#5a4528');
            } else {
                zs.forEach(function (z) {
                    xs.forEach(function (x0) {
                        var p = las(x0, z, tid);
                        s += '<circle cx="' + vgR1(p[0]) + '" cy="' + vgR1(p[1]) + '" r="2.4" fill="#3f78ad" opacity="' + (z ? 0.75 : 1) + '"/>';
                    });
                });
            }
            s += '<polyline points="' + poly + '" fill="none" stroke="' + (ray ? '#6b5636' : '#2b6cb0') + '" stroke-width="2.2"/>';
            [M1, M2].forEach(function (m) {
                s += bana(m);
                var p = las(m.x, m.z, tid), cx = m.x, cy = YS + m.z;
                s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + vgR1(p[0]) + '" y2="' + vgR1(p[1]) + '" stroke="' + m.c + '" stroke-width="1.4"/>';
                s += '<circle cx="' + cx + '" cy="' + cy + '" r="1.8" fill="' + m.c + '"/>';
                s += '<circle cx="' + vgR1(p[0]) + '" cy="' + vgR1(p[1]) + '" r="6.5" fill="' + m.c + '" stroke="' + INK + '" stroke-width="1.1"/>';
            });
            // etiketter vid de markerade partiklarna
            var r1 = radier(M1), r2 = radier(M2);
            s += lbl(M1.x, YS - Math.max(r1[1], 22) - 24, 'middle', 'vid ytan: ' + (r1[2] > 0 ? 'medurs' : 'moturs'), 13, C1, ' font-weight="600"');
            s += ruta(M2.x + Math.max(r2[0], 8) + 16, YS + M2.z + (ray ? 5 : 30), 'start', 'längre ner: ' + (r2[2] > 0 ? 'medurs' : 'moturs'), C2);
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        var vbH = 264 - 14;
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="0 14 640 ' + vbH + '" width="640" height="' + vbH + '" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="' +
            (ray ? 'Rayleigh-våg i marken som går åt höger. En partikel vid ytan rör sig i en ellips moturs, och en partikel ' +
                   'längre ned rör sig i en smalare ellips medurs.'
                 : 'Vattenvåg som går åt höger. En partikel vid ytan rör sig i en cirkel medurs, och en partikel längre ned ' +
                   'rör sig i en mindre cirkel åt samma håll.') + '">' +
            bas + '<g class="' + dynId + '"></g></svg>';
        var dyn = scene.querySelector('.' + dynId);
        card.appendChild(scene);
        msFullskarm(card, scene, 640 / vbH, 110);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var tk = vgTid(T, function () { return tid; }, function (t) { tid = t; rita(); });
        var startBtn = tk.btn;
        var ultraCk = vgCheck('Ultrarapid', false);
        controls.appendChild(startBtn);
        controls.appendChild(ultraCk.label);
        card.appendChild(controls);
        card.appendChild(tk.rad);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        info.textContent = ray
            ? 'Vid ytan går partikeln runt i en ellips moturs, längre ned i en smalare ellips medurs. Ingen partikel följer med vågen.'
            : 'Båda partiklarna går runt i cirklar åt samma håll, medurs. Längre ned blir cirkeln mindre. Ingen partikel följer med vågen.';
        card.appendChild(info);
        node.appendChild(card);

        var loop = vgLoop(card, function (dt) { tid += dt * (ultra ? 0.25 : 1); rita(); tk.visa(); });
        tk.koppla(loop);
        function setSpelar(v) { tk.spela(v); }
        ultraCk.cb.addEventListener('change', function () { ultra = ultraCk.cb.checked; });
        card._set = function (t) { tid = t; rita(); tk.visa(); };
        rita();
        setSpelar(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: fasvag
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.7, under meningen om fas och motfas: en stående våg på en sträng
    // mellan två fästen, y = A · sin(k · x) · cos(ω · t), med fem bukar
    // (strängen är 2,5 λ lång). Två partiklar i buk 1 och 3 är orange och
    // svänger I FAS (alltid samma läge, samma riktning); två partiklar i buk
    // 2 och 5 är lila och svänger I MOTFAS (alltid motsatt läge och
    // riktning). Klammer ovanför och under strängen säger "i fas" och
    // "i motfas", och små pilar på de markerade partiklarna visar åt vilket
    // håll de rör sig just nu. Startar direkt; Pausa och Ultrarapid.
    var fvRaknare = 0;
    function buildFasvag(node, cfg) {
        var INK = '#1f2530', GREY = '#8a919b', PART = '#5b7ea6', C1 = '#e8590c', C2 = '#9c36b5';
        var X0 = 44, X1 = 596, LAMBDA = (X1 - X0) / 2.5, K = 2 * Math.PI / LAMBDA;
        var YC = 124, A = 46, T = 2.4, OM = 2 * Math.PI / T;
        var tid = 0.15 * T, ultra = false;
        var id = 'ms-fv-rutnat-' + (++fvRaknare);
        var IFAS = [X0 + LAMBDA / 4, X0 + 5 * LAMBDA / 4];        // buk 1 och 3
        var MOTFAS = [X0 + 3 * LAMBDA / 4, X0 + 9 * LAMBDA / 4];  // buk 2 och 5

        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function yv(x, t) { return YC - A * Math.sin(K * (x - X0)) * Math.cos(OM * t); }
        // klammer mellan två x-lägen, öppen mot strängen (dir = 1 nedåt, −1 uppåt)
        function klammer(xa, xb, y, dir, color, text) {
            var s = '<path d="M ' + vgR1(xa) + ' ' + (y + dir * 9) + ' L ' + vgR1(xa) + ' ' + y + ' L ' + vgR1(xb) + ' ' + y +
                ' L ' + vgR1(xb) + ' ' + (y + dir * 9) + '" fill="none" stroke="' + color + '" stroke-width="1.8"/>';
            var xm = (xa + xb) / 2, ty = dir > 0 ? y - 8 : y + 19;
            s += lbl(xm, ty, 'middle', text, 15, color, ' font-weight="600"');
            return s;
        }
        function pilY(x, y0, dy, color) {
            if (Math.abs(dy) < 6) return '';
            var dir = dy > 0 ? 1 : -1, y2 = y0 + dy, by = y2 - dir * 7;
            return '<line x1="' + vgR1(x) + '" y1="' + vgR1(y0) + '" x2="' + vgR1(x) + '" y2="' + vgR1(by) + '" stroke="' + color +
                '" stroke-width="2.4" stroke-linecap="butt"/><polygon points="' + vgR1(x - 4.5) + ',' + vgR1(by) + ' ' + vgR1(x) + ',' +
                vgR1(y2) + ' ' + vgR1(x + 4.5) + ',' + vgR1(by) + '" fill="' + color + '"/>';
        }

        var bas = vgRutnat(id, 0, 0, 640, 260);
        // fästena i ändarna
        [[X0, -1], [X1, 1]].forEach(function (f) {
            var xx = f[0] + f[1] * 6;
            bas += '<rect x="' + (f[1] < 0 ? xx - 10 : xx) + '" y="' + (YC - 34) + '" width="10" height="68" fill="#8d96a3" stroke="#5f6773" stroke-width="1"/>';
        });
        // höljet ±A · sin(kx) (streckat) och viloläget
        var upp = [], ned = [];
        for (var x = X0; x <= X1; x += 4) {
            var e = A * Math.sin(K * (x - X0));
            upp.push(x + ',' + vgR1(YC - e));
            ned.push(x + ',' + vgR1(YC + e));
        }
        bas += '<polyline points="' + upp.join(' ') + '" fill="none" stroke="' + GREY + '" stroke-width="1" stroke-dasharray="4 4"/>' +
            '<polyline points="' + ned.join(' ') + '" fill="none" stroke="' + GREY + '" stroke-width="1" stroke-dasharray="4 4"/>' +
            '<line x1="' + X0 + '" y1="' + YC + '" x2="' + X1 + '" y2="' + YC + '" stroke="' + GREY + '" stroke-width="0.8" opacity="0.6"/>';
        bas += klammer(IFAS[0], IFAS[1], YC - A - 26, 1, C1, 'i fas');
        bas += klammer(MOTFAS[0], MOTFAS[1], YC + A + 26, -1, C2, 'i motfas');

        function rita() {
            var s = '';
            var pts = [];
            for (var x = X0; x <= X1; x += 3) pts.push(x + ',' + vgR1(yv(x, tid)));
            s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="#b9c4d2" stroke-width="1.6"/>';
            for (var xb = X0 + 12; xb < X1 - 4; xb += LAMBDA / 16) {
                var mark = [IFAS[0], IFAS[1], MOTFAS[0], MOTFAS[1]].some(function (m) { return Math.abs(m - xb) < 2; });
                if (mark) continue;
                s += '<circle cx="' + vgR1(xb) + '" cy="' + vgR1(yv(xb, tid)) + '" r="4.2" fill="' + PART + '" stroke="#3f6189" stroke-width="1"/>';
            }
            [[IFAS, C1], [MOTFAS, C2]].forEach(function (g) {
                g[0].forEach(function (x) {
                    var y = yv(x, tid);
                    // hastigheten dy/dt (i px/s) som en kort pil bredvid partikeln
                    var v = A * Math.sin(K * (x - X0)) * OM * Math.sin(OM * tid);
                    s += pilY(x + 14, y, v * 0.22, g[1]);
                    s += '<circle cx="' + vgR1(x) + '" cy="' + vgR1(y) + '" r="7.5" fill="' + g[1] + '" stroke="' + INK + '" stroke-width="1.1"/>';
                });
            });
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="14 30 612 190" width="640" height="199" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En stående våg på en sträng. Två orange partiklar svänger i fas: de är alltid i samma läge och rör sig åt ' +
            'samma håll. Två lila partiklar svänger i motfas: de är alltid i motsatt läge och rör sig åt motsatt håll.">' +
            bas + '<g class="ms-fv-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-fv-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 612 / 190, 110);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var tk = vgTid(T, function () { return tid; }, function (t) { tid = t; rita(); });
        var startBtn = tk.btn;
        var ultraCk = vgCheck('Ultrarapid', false);
        controls.appendChild(startBtn);
        controls.appendChild(ultraCk.label);
        card.appendChild(controls);
        card.appendChild(tk.rad);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        info.textContent = 'De orange partiklarna svänger i fas: de är alltid i samma läge och rör sig åt samma håll. ' +
            'De lila svänger i motfas: när den ena är högst upp är den andra längst ned.';
        card.appendChild(info);
        node.appendChild(card);

        var loop = vgLoop(card, function (dt) { tid += dt * (ultra ? 0.25 : 1); rita(); tk.visa(); });
        tk.koppla(loop);
        function setSpelar(v) { tk.spela(v); }
        ultraCk.cb.addEventListener('change', function () { ultra = ultraCk.cb.checked; });
        card._set = function (t) { tid = t; rita(); tk.visa(); };
        rita();
        setSpelar(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: staendevag
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.9 (Stående vågor i strängar), demonstrationen: ett snöre går från
    // en vibrator på labbänken över en trissa med en hängande vikt. Eleven
    // ökar vibratorns frekvens med glidaren (eller med − och +) och ser att
    // snöret bara svänger kraftigt vid vissa frekvenser: en buk vid
    // grundtonen f₁ = 12 Hz, två bukar vid 24 Hz, tre vid 36 Hz och fyra vid
    // 48 Hz. Mellan dem darrar snöret knappt.
    // Modell: stationär lösning för en dämpad sträng som drivs i ena änden
    // (x = 0, utslag a · cos ωt) och sitter fast i den andra (x = L):
    //   y(x, t) = a · Re[ sin(k(L − x)) / sin(kL) · e^(iωt) ],
    //   k = (ω / v)(1 − iζ),
    // där dämpningen ζ gör förstärkningen ändlig vid resonans (≈ 1/(nπζ)).
    // ζ minskar svagt med n, så att alla bukarna blir ungefär lika höga.
    // Snöret svänger med vibratorns verkliga frekvens. Vid 12–48 Hz hinner
    // skärmen bara visa några få bilder per period, så varje bild ritar
    // snöret i flera lägen utspridda över bildens visningstid (rörelse-
    // oskärpa), och över höga frekvenser får fasen en slumpvis förskjutning
    // så att snöret inte ser ut att stå still (stroboskopeffekt). Det ger
    // det suddiga, skimrande band man ser i verkligheten. Kryssrutan
    // Ultrarapid visar i stället snöret i slow motion, skarpt. Profilen glider mot sitt nya läge med tidskonstanten TAU, så
    // att svängningen byggs upp och klingar av i stället för att hoppa.
    var svRaknare = 0;
    function buildStaendevag(node, cfg) {
        var INK = '#1f2530', GREY = '#8a919b', SNORE = '#c0392b', BAND = '#e9a99f', BLA = '#2563c9';
        var X0 = 96, X1 = 548, YC = 112, ADRIV = 5;            // snörets ändar, viloläge, vibratorns utslag (px)
        var F1 = 12, FMIN = 2, FMAX = 52, STEG = 0.2, TAU = 0.35;
        var NPKT = 181, VISFREKV = 0.9;                         // punkter längs snöret, takt i ultrarapid (Hz)
        var NOSK = 5, BILD = 1 / 60;                             // lägen per bild, en bilds visningstid (s)
        var f = 4, tid = 0, visaNB = false, ultra = false;
        var id = 'ms-sv-rutnat-' + (++svRaknare);
        var aktRe = new Float64Array(NPKT), aktIm = new Float64Array(NPKT);
        var malRe = new Float64Array(NPKT), malIm = new Float64Array(NPKT);

        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function fmt(v) { var s = v.toFixed(1); return parseFloat(s) === 0 ? '0' : s.replace('.', ','); }
        function narmasteN() { return Math.max(1, Math.round(f / F1)); }
        function zeta() { return 0.035 / Math.pow(narmasteN(), 0.8); }
        // ligger frekvensen så nära en egenfrekvens att snöret svänger kraftigt?
        function iResonans() {
            var n = Math.round(f / F1);
            return n >= 1 && Math.abs(f - n * F1) <= n * F1 * zeta() * 1.6;
        }
        // målprofilen P(s) = sin(c(1 − s)) / sin(c), c = α − iβ, s = x / L
        function raknaMal() {
            var al = Math.PI * f / F1, be = al * zeta();
            var dr = Math.sin(al) * Math.cosh(be), di = -Math.cos(al) * Math.sinh(be);
            var d2 = dr * dr + di * di;
            for (var i = 0; i < NPKT; i++) {
                var u = 1 - i / (NPKT - 1);
                var nr = Math.sin(al * u) * Math.cosh(be * u), ni = -Math.cos(al * u) * Math.sinh(be * u);
                malRe[i] = (nr * dr + ni * di) / d2;
                malIm[i] = (ni * dr - nr * di) / d2;
            }
        }

        // ── fast bakgrund: labbänk, vibrator, trissa med vikt ────────────
        var bas = vgRutnat(id, 0, 0, 640, 240);
        bas += '<rect x="0" y="204" width="640" height="36" fill="#c9a26b"/>' +
            '<line x1="0" y1="204" x2="640" y2="204" stroke="#8a6a3a" stroke-width="2"/>';
        for (var gx = 18; gx < 640; gx += 46) {
            bas += '<path d="M ' + gx + ' 214 q 14 3 30 0" fill="none" stroke="#a8824e" stroke-width="1" opacity="0.7"/>';
        }
        // vibratorn: låda med etikett och sladd
        bas += '<rect x="56" y="150" width="80" height="54" rx="6" fill="#4a5568" stroke="#2d3748" stroke-width="1.4"/>' +
            '<circle cx="74" cy="186" r="5" fill="#2d3748"/><circle cx="118" cy="186" r="5" fill="#2d3748"/>' +
            '<rect x="88" y="144" width="16" height="7" rx="2" fill="#2d3748"/>' +
            lbl(96, 170, 'middle', 'vibrator', 11.5, '#f1f3f6', ' font-weight="600"') +
            '<path d="M 56 194 Q 34 196 30 204" fill="none" stroke="#2d3748" stroke-width="2.4"/>';
        // bordskanten med trissan och vikten
        bas += '<rect x="556" y="140" width="10" height="64" fill="#8d96a3" stroke="#5f6773" stroke-width="1"/>' +
            '<line x1="561" y1="' + (YC + 12) + '" x2="561" y2="140" stroke="#5f6773" stroke-width="4"/>' +
            '<circle cx="561" cy="' + (YC + 12) + '" r="13" fill="#b8c0cc" stroke="#5f6773" stroke-width="1.6"/>' +
            '<circle cx="561" cy="' + (YC + 12) + '" r="3" fill="#5f6773"/>' +
            '<path d="M ' + X1 + ' ' + YC + ' A 13 13 0 0 1 574 ' + (YC + 12) + '" fill="none" stroke="' + SNORE + '" stroke-width="2.4"/>' +
            '<line x1="574" y1="' + (YC + 12) + '" x2="574" y2="160" stroke="' + SNORE + '" stroke-width="2.4"/>' +
            '<rect x="562" y="160" width="24" height="30" rx="3" fill="#6b7280" stroke="#374151" stroke-width="1.2"/>' +
            '';
        bas += '<line x1="' + X0 + '" y1="' + YC + '" x2="' + X1 + '" y2="' + YC + '" stroke="' + GREY + '" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.7"/>';

        function rita() {
            var s = '';
            // faserna som ritas i den här bilden
            var faser = [];
            if (ultra) {
                faser.push(2 * Math.PI * VISFREKV * tid);
            } else {
                var jit = Math.max(0, Math.min(1, (f - 6) / 8));
                var bas0 = 2 * Math.PI * f * tid + jit * Math.random() * 2 * Math.PI;
                var sprid = Math.min(2 * Math.PI, 2 * Math.PI * f * BILD);
                for (var q = 0; q < NOSK; q++) faser.push(bas0 + sprid * q / (NOSK - 1));
            }
            var upp = [], ned = [], linjer = faser.map(function () { return []; });
            var maxEnv = 0;
            for (var i = 0; i < NPKT; i++) {
                var x = X0 + (X1 - X0) * i / (NPKT - 1);
                var env = ADRIV * Math.sqrt(aktRe[i] * aktRe[i] + aktIm[i] * aktIm[i]);
                if (env > maxEnv) maxEnv = env;
                upp.push(vgR1(x) + ',' + vgR1(YC - env));
                ned.unshift(vgR1(x) + ',' + vgR1(YC + env));
                for (var j = 0; j < faser.length; j++) {
                    linjer[j].push(vgR1(x) + ',' + vgR1(YC - ADRIV * (aktRe[i] * Math.cos(faser[j]) - aktIm[i] * Math.sin(faser[j]))));
                }
            }
            // det suddiga bandet som ögat ser när snöret svänger snabbt
            s += '<polygon points="' + upp.join(' ') + ' ' + ned.join(' ') + '" fill="' + BAND + '" opacity="' + (ultra ? 0.45 : 0.55) + '"/>';
            var op = ultra ? 1 : 0.42;
            linjer.forEach(function (pts) {
                s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + SNORE + '" stroke-width="2.4" stroke-linejoin="round" opacity="' + op + '"/>';
            });
            // vibratorns stav följer snörets ände
            faser.forEach(function (th) {
                var yEnd = YC - ADRIV * (aktRe[0] * Math.cos(th) - aktIm[0] * Math.sin(th));
                s += '<g opacity="' + (ultra ? 1 : 0.5) + '"><line x1="' + X0 + '" y1="144" x2="' + X0 + '" y2="' + vgR1(yEnd + 3) +
                    '" stroke="#2d3748" stroke-width="4" stroke-linecap="butt"/>' +
                    '<circle cx="' + X0 + '" cy="' + vgR1(yEnd) + '" r="4" fill="#2d3748"/></g>';
            });
            // noder (N) och bukar (B) när en stående våg har byggts upp
            if (visaNB && iResonans() && maxEnv > 18) {
                var n = Math.round(f / F1), dx = (X1 - X0) / n;
                for (var k = 1; k < n; k++) {
                    s += lbl(X0 + k * dx, YC + 26, 'middle', 'N', 14, BLA, ' font-weight="700"');
                }
                for (var b = 0; b < n; b++) {
                    s += lbl(X0 + (b + 0.5) * dx, YC + maxEnv + 20, 'middle', 'B', 14, BLA, ' font-weight="700"');
                }
                s += lbl(X1 - 4, YC + 26, 'end', 'N', 14, BLA, ' font-weight="700"');
            }
            s += lbl(X1 + 26, 46, 'end', '<tspan font-style="italic">f</tspan> = ' + fmt(f) + ' Hz', 17, INK, ' font-weight="600"');
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="20 24 600 198" width="640" height="211" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="Ett snöre går från en vibrator över en trissa med en vikt. När vibratorns frekvens ökas svänger ' +
            'snöret kraftigt vid vissa frekvenser, med en, två, tre eller fyra bukar.">' +
            bas + '<g class="ms-sv-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-sv-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 600 / 198, 130);

        var row = document.createElement('div');
        row.className = 'minisim-slider-row';
        var sLbl = document.createElement('span');
        sLbl.className = 'minisim-slider-lbl';
        sLbl.textContent = 'Frekvens';
        var minusBtn = vgBtn('−');
        var plusBtn = vgBtn('+');
        minusBtn.setAttribute('aria-label', 'Sänk frekvensen 0,2 Hz');
        plusBtn.setAttribute('aria-label', 'Höj frekvensen 0,2 Hz');
        var sl = document.createElement('input');
        sl.type = 'range';
        sl.className = 'minisim-slider';
        sl.min = String(FMIN); sl.max = String(FMAX); sl.step = String(STEG); sl.value = String(f);
        sl.setAttribute('aria-label', 'Vibratorns frekvens i hertz');
        var par = document.createElement('span');
        par.style.cssText = 'display:flex;flex:1 1 220px;align-items:center;gap:8px;min-width:0;';
        par.appendChild(minusBtn); par.appendChild(sl); par.appendChild(plusBtn);
        row.appendChild(sLbl); row.appendChild(par);
        card.appendChild(row);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var nbCk = vgCheck('Visa noder och bukar', false);
        var ultraCk = vgCheck('Ultrarapid', false);
        controls.appendChild(nbCk.label);
        controls.appendChild(ultraCk.label);
        ultraCk.cb.addEventListener('change', function () { ultra = ultraCk.cb.checked; rita(); });
        card.appendChild(controls);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        card.appendChild(info);
        node.appendChild(card);

        var senasteInfo = '';
        function uppdateraInfo() {
            var t = iResonans()
                ? 'Snöret svänger kraftigt: en stående våg. Öka frekvensen och leta efter nästa.'
                : 'Snöret darrar knappt. Öka frekvensen långsamt tills det börjar svänga kraftigt.';
            if (t !== senasteInfo) { info.textContent = t; senasteInfo = t; }
        }
        function sattF(v) {
            f = Math.max(FMIN, Math.min(FMAX, Math.round(v / STEG) * STEG));
            sl.value = String(f);
            raknaMal();
            uppdateraInfo();
        }
        sl.addEventListener('input', function () { sattF(parseFloat(sl.value)); });
        minusBtn.addEventListener('click', function () { sattF(f - STEG); });
        plusBtn.addEventListener('click', function () { sattF(f + STEG); });
        nbCk.cb.addEventListener('change', function () { visaNB = nbCk.cb.checked; rita(); });

        var loop = vgLoop(card, function (dt) {
            tid += dt;
            var w = 1 - Math.exp(-dt / TAU);
            for (var i = 0; i < NPKT; i++) {
                aktRe[i] += (malRe[i] - aktRe[i]) * w;
                aktIm[i] += (malIm[i] - aktIm[i]) * w;
            }
            rita();
        });
        card._set = function (fr, t) {
            sattF(fr);
            for (var i = 0; i < NPKT; i++) { aktRe[i] = malRe[i]; aktIm[i] = malIm[i]; }
            tid = t || 0;
            rita();
        };
        sattF(f);
        for (var j = 0; j < NPKT; j++) { aktRe[j] = malRe[j]; aktIm[j] = malIm[j]; }
        rita();
        loop.satt(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: gitarrton
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.9, demonstrationen "Frekvens och ton": en gitarr sedd framifrån.
    // Eleven drar ett finger längs halsen (eller stegar med − och +) och
    // slår an A-strängen. Fingret trycker ned strängen precis bakom ett band,
    // som när man tar en ton på en riktig gitarr, och kommer in från de tunna
    // strängarnas sida. Strängen svänger mellan bandet och stallet med en
    // buk (grundtonen), så att den svängande längden l är en halv våglängd.
    // Utbredningshastigheten v är densamma hela tiden, så f = v / λ ökar när
    // l och λ blir kortare, och tonen som spelas upp blir ljusare.
    // Fysik: mensur 0,65 m, öppen A-sträng 110 Hz ⇒ v = f · λ = 143 m/s.
    // Band n ger l = 0,65 / 2^(n/12) och f = 110 · 2^(n/12) (tempererad
    // stämning, så som banden sitter på en riktig gitarr).
    // Ljud: syntetiserat med Web Audio (övertoner med avklingning), inga
    // ljudfiler. Strängen ritas i slow motion med sitt suddiga band.
    var gtRaknare = 0;
    function buildGitarrton(node, cfg) {
        var INK = '#1f2530', BLA = '#2563c9', SNORE = '#c0392b';
        var NUT = 92, MENS = 470, SAD = NUT + MENS, NMAX = 12;
        var L0 = 0.65, F0 = 110, V = F0 * 2 * L0;
        var SY = [96, 106, 116, 126, 136, 146], AKT = 4;        // strängarnas y, A-strängen (index)
        var band = 0, tid = 0, slag = -10, AMAX = 15, TAUV = 1.8, VISF = 1.1;
        var id = 'ms-gt-' + (++gtRaknare);

        function bandX(n) { return NUT + MENS * (1 - Math.pow(2, -n / 12)); }
        function klamX(n) { return n === 0 ? (NUT + bandX(1)) / 2 - 4 : bandX(n) - 8; }
        // fingret ritas i egna koordinater med toppen i origo och handen
        // uppåt, och vrids så att det lutar som ett finger som böjs ned
        // över halsen; nageln syns eftersom vi ser fingrets ovansida
        function finger(x, ytopp, nere) {
            var s = '';
            if (nere) s += '<ellipse cx="' + vgR1(x + 1) + '" cy="' + vgR1(ytopp + 3) + '" rx="10" ry="4" fill="#1a1008" opacity="0.45"/>';
            s += '<g transform="translate(' + vgR1(x) + ' ' + vgR1(ytopp) + ') rotate(12)">' +
                '<path d="M -9 -9 C -9.8 -45 -11.5 -95 -13.5 -140 L 12.5 -140 C 11 -95 10 -45 9 -9 A 9 9.5 0 0 1 -9 -9 Z" ' +
                'fill="#efc29c" stroke="#b9845c" stroke-width="1.3"/>' +
                '<path d="M -5 -22 C -5.5 -60 -6 -100 -6.5 -138" fill="none" stroke="#f8dcc4" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>' +
                '<path d="M 6.5 -18 C 6.8 -60 7.2 -100 7.8 -138" fill="none" stroke="#d9a47c" stroke-width="2.5" opacity="0.55"/>' +
                '<path d="M -6.2 -4.5 Q 0 0.5 6.2 -4.5 L 6.6 -19 Q 0 -22.5 -6.6 -19 Z" fill="#f7ddd0" stroke="#d6a287" stroke-width="1"/>' +
                '<path d="M -4.6 -16.5 Q 0 -18.6 4.6 -16.5" fill="none" stroke="#fbeee6" stroke-width="1.6" stroke-linecap="round"/>' +
                '<path d="M -8 -36 Q 0 -32.5 8 -36 M -7.5 -41 Q 0 -38 7.5 -41" fill="none" stroke="#b9845c" stroke-width="1" opacity="0.8"/>' +
                '<path d="M -9 -92 Q 0 -88 9 -92" fill="none" stroke="#b9845c" stroke-width="1" opacity="0.7"/>' +
                '</g>';
            return s;
        }
        function lang() { return L0 / Math.pow(2, band / 12); }
        function frekv() { return F0 * Math.pow(2, band / 12); }
        function fmt(v, d) { var s = v.toFixed(d); return parseFloat(s) === 0 ? '0' : s.replace('.', ','); }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }

        // ── fast bakgrund: kropp, ljudhål, hals, band, stall ─────────────
        var bas = vgRutnat(id, 0, 0, 660, 260);
        bas += '<path d="M 360 121 C 360 40 450 34 500 58 C 540 74 560 44 610 44 C 668 44 668 198 610 198 ' +
            'C 560 198 540 168 500 184 C 450 208 360 202 360 121 Z" fill="#e3b778" stroke="#9c6b34" stroke-width="2"/>';
        bas += '<circle cx="452" cy="121" r="34" fill="#3b2a1a" stroke="#9c6b34" stroke-width="5"/>';
        bas += '<path d="M 20 100 L 74 92 L 74 150 L 20 142 Z" fill="#6b4423" stroke="#4a2e17" stroke-width="1.4"/>';
        [104, 117, 130].forEach(function (y) {
            bas += '<circle cx="34" cy="' + y + '" r="4" fill="#c9ccd1" stroke="#6b7280"/><circle cx="58" cy="' + y + '" r="4" fill="#c9ccd1" stroke="#6b7280"/>';
        });
        bas += '<rect x="74" y="88" width="' + (bandX(19) - 74) + '" height="66" fill="#4a2e17"/>';
        bas += '<rect x="' + (NUT - 4) + '" y="88" width="5" height="66" fill="#efe6d2"/>';
        for (var n = 1; n <= 19; n++) {
            bas += '<rect x="' + vgR1(bandX(n) - 1.2) + '" y="88" width="2.4" height="66" fill="#c9ccd1"/>';
        }
        [3, 5, 7, 9].forEach(function (n) {
            bas += '<circle cx="' + vgR1((bandX(n) + bandX(n - 1)) / 2) + '" cy="121" r="3.4" fill="#efe6d2" opacity="0.8"/>';
        });
        var x12 = (bandX(12) + bandX(11)) / 2;
        bas += '<circle cx="' + vgR1(x12) + '" cy="106" r="3.4" fill="#efe6d2" opacity="0.8"/><circle cx="' + vgR1(x12) + '" cy="136" r="3.4" fill="#efe6d2" opacity="0.8"/>';
        bas += '<rect x="' + (SAD - 16) + '" y="86" width="40" height="70" rx="6" fill="#4a2e17"/>' +
            '<rect x="' + (SAD - 2) + '" y="90" width="4" height="62" fill="#efe6d2"/>';
        // band-nummer under halsen
        for (var m = 1; m <= NMAX; m++) {
            if ((m % 2 === 1 && m < 11) || m === 12) bas += lbl((bandX(m) + bandX(m - 1)) / 2, 172, 'middle', String(m), 11, '#6a7180');
        }
        bas += lbl(48, 172, 'middle', 'band', 11, '#6a7180');

        function rita() {
            var s = '';
            var xk = klamX(band), x0 = band === 0 ? NUT : bandX(band);
            var dt = tid - slag, amp = dt >= 0 ? AMAX * Math.exp(-dt / TAUV) : 0;
            var c = Math.cos(2 * Math.PI * VISF * Math.max(0, dt));
            for (var i = 0; i < SY.length; i++) {
                var y = SY[i], w = 1.1 + i * 0.35, col = i === AKT ? SNORE : '#d9d2c3';
                if (i !== AKT || amp < 0.15) {
                    s += '<line x1="74" y1="' + y + '" x2="' + SAD + '" y2="' + y + '" stroke="' + col + '" stroke-width="' + vgR1(w) + '"/>';
                    continue;
                }
                s += '<line x1="74" y1="' + y + '" x2="' + vgR1(x0) + '" y2="' + y + '" stroke="' + col + '" stroke-width="' + vgR1(w) + '"/>';
                var upp = [], ned = [], pts = [];
                for (var k = 0; k <= 60; k++) {
                    var x = x0 + (SAD - x0) * k / 60, e = amp * Math.sin(Math.PI * k / 60);
                    upp.push(vgR1(x) + ',' + vgR1(y - e)); ned.unshift(vgR1(x) + ',' + vgR1(y + e));
                    pts.push(vgR1(x) + ',' + vgR1(y - e * c));
                }
                s += '<polygon points="' + upp.join(' ') + ' ' + ned.join(' ') + '" fill="' + SNORE + '" opacity="0.3"/>';
                s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="' + vgR1(w) + '"/>';
            }
            // fingret: trycker på A-strängen, eller lyft över halsen vid öppen sträng
            s += '<g class="ms-gt-finger" style="cursor:grab">' +
                finger(xk, band === 0 ? 74 : SY[AKT] - 1, band !== 0) + '</g>';
            // måttlinje för den svängande längden, under halsen
            var ym = 192;
            s += '<line x1="' + vgR1(x0) + '" y1="160" x2="' + vgR1(x0) + '" y2="' + (ym + 6) + '" stroke="#8a919b" stroke-width="1" stroke-dasharray="3 3"/>' +
                '<line x1="' + SAD + '" y1="160" x2="' + SAD + '" y2="' + (ym + 6) + '" stroke="#8a919b" stroke-width="1" stroke-dasharray="3 3"/>';
            s += vgDubbelpil(x0, ym, SAD, ym, BLA);
            s += lbl((x0 + SAD) / 2, ym + 20, 'middle', it('l') + ' = ' + it('λ') + '/2 = ' + fmt(lang(), 2) + ' m', 15, BLA, ' font-weight="600"');
            s += lbl(640, 30, 'end', it('f') + ' = ' + fmt(frekv(), 0) + ' Hz', 17, INK, ' font-weight="600"');
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="10 10 640 214" width="640" height="214" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En gitarr där ett finger trycker ned en sträng och kan flyttas längs halsen. När fingret flyttas mot ljudhålet blir ' +
            'den svängande delen av strängen kortare, våglängden kortare och tonen ljusare.">' +
            bas + '<g class="ms-gt-dyn"></g></svg>';
        var svg = scene.querySelector('svg');
        var dyn = scene.querySelector('.ms-gt-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 640 / 214, 120);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var slaBtn = vgBtn('Slå an', 'ms-primar');
        var minusBtn = vgBtn('Flytta fingret vänster');
        var plusBtn = vgBtn('Flytta fingret höger');
        controls.appendChild(slaBtn);
        controls.appendChild(minusBtn);
        controls.appendChild(plusBtn);
        card.appendChild(controls);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        card.appendChild(info);
        node.appendChild(card);

        function uppdateraInfo() {
            var l = lang();
            info.innerHTML = (band === 0 ? 'Öppen sträng. ' : 'Fingret på band ' + band + '. ') + 'Svängande längd <em>l</em> = ' + fmt(l, 2) + ' m, våglängd <em>λ</em> = 2 · <em>l</em> = ' +
                fmt(2 * l, 2) + ' m, frekvens <em>f</em> = <em>v</em> / <em>λ</em> = ' + fmt(V, 0) + ' / ' + fmt(2 * l, 2) +
                ' = ' + fmt(frekv(), 0) + ' Hz. Utbredningshastigheten <em>v</em> = ' + fmt(V, 0) + ' m/s är densamma hela tiden.';
        }

        // ── ljud ──────────────────────────────────────────────────────────
        var actx = null;
        function spela(f) {
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            if (!actx) actx = new AC();
            if (actx.state === 'suspended') actx.resume();
            var t0 = actx.currentTime;
            var master = actx.createGain();
            master.gain.value = 0.35;
            master.connect(actx.destination);
            for (var h = 1; h <= 8; h++) {
                var o = actx.createOscillator(), g = actx.createGain();
                o.type = 'sine';
                o.frequency.value = f * h;
                var peak = 0.5 / Math.pow(h, 1.1) * (h === 1 ? 1 : 0.8);
                g.gain.setValueAtTime(0.0001, t0);
                g.gain.exponentialRampToValueAtTime(peak, t0 + 0.006);
                g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.2 / Math.sqrt(h));
                o.connect(g); g.connect(master);
                o.start(t0); o.stop(t0 + 3.3);
            }
        }
        function sla() { slag = tid; spela(frekv()); rita(); }
        function sattBand(n) {
            n = Math.max(0, Math.min(NMAX, n));
            if (n === band) return;
            band = n;
            slag = -10;                          // fingret dämpar strängen
            uppdateraInfo();
            rita();
        }
        slaBtn.addEventListener('click', sla);
        minusBtn.addEventListener('click', function () { sattBand(band - 1); });
        plusBtn.addEventListener('click', function () { sattBand(band + 1); });

        // dra fingret; ett klick på strängen slår an den
        function svgX(e) {
            var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
            return vb.x + (e.clientX - r.left) / r.width * vb.width;
        }
        function svgY(e) {
            var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
            return vb.y + (e.clientY - r.top) / r.height * vb.height;
        }
        var drar = false;
        svg.addEventListener('pointerdown', function (e) {
            var x = svgX(e), y = svgY(e);
            if (Math.abs(x - klamX(band)) < 18 && y > 10 && y < (band === 0 ? 84 : 144)) {
                drar = true;
                try { svg.setPointerCapture(e.pointerId); } catch (er) {}
                e.preventDefault();
            } else if (x > (band === 0 ? NUT : bandX(band)) + 6 && x < SAD && y > 86 && y < 156) {
                sla();
            }
        });
        svg.addEventListener('pointermove', function (e) {
            if (!drar) return;
            var x = svgX(e), best = 0, bd = 1e9;
            for (var n = 0; n <= NMAX; n++) {
                var d = Math.abs(x - klamX(n));
                if (d < bd) { bd = d; best = n; }
            }
            sattBand(best);
        });
        function slapp() { drar = null; }
        svg.addEventListener('pointerup', slapp);
        svg.addEventListener('pointercancel', slapp);
        svg.style.touchAction = 'pan-y';

        var loop = vgLoop(card, function (dt) { tid += dt; rita(); });
        card._set = function (n, t) { band = n; uppdateraInfo(); tid = 10; slag = 10 - (t || 0); rita(); };
        uppdateraInfo();
        rita();
        loop.satt(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: vagstallning
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.7, demonstrationen "Puls och våg": en vågställning som hänger
    // lodrätt i ett stativ. Vågräta stavar med en röd kula i ena änden sitter
    // på två lodräta trådar. Den översta staven vrids fram och tillbaka en
    // gång, och vridningen vandrar NEDÅT som en puls medan varje stav bara
    // vrider sig kring den lodräta axeln (sett framifrån åt höger/vänster).
    // Vinkeln φ(s, t) = φ₀ + Φ(t − s/v), där s är avståndet från toppen och Φ
    // är en halv sinusperiod. Stavarna ritas i en sned projektion (bakre änden
    // något högre) och den närmaste änden ritas sist. Pulsen klingar av mot
    // nedre änden (ingen reflex) och upprepas efter en paus.
    var vsRaknare = 0;
    function buildVagstallning(node, cfg) {
        var INK = '#1f2530', ROD = '#c0392b';
        var CX = 300, YT = 52, N = 30, DY = 11, R = 74, SNED = 0.32;
        var PHI0 = -0.32, AMAX = 1.5, TAU = 1.3, V = 100;
        var LNG = (N - 1) * DY, CYKEL = 0.4 + TAU + LNG / V + 1.4;
        var tid = 0;
        var id = 'ms-vs-rutnat-' + (++vsRaknare);

        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 15) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function vrid(u) { return (u > 0 && u < TAU) ? AMAX * Math.sin(Math.PI * u / TAU) : 0; }
        function phi(s, t) {
            var w = Math.min(1, (LNG + 6 - s) / 60);
            w = w * w * (3 - 2 * w);
            return PHI0 + w * vrid(t - 0.4 - s / V);
        }

        // ── stativet ────────────────────────────────────────────────────
        var bas = vgRutnat(id, 0, 0, 640, 420);
        var PX = CX + 112;
        bas += '<rect x="' + (PX - 7) + '" y="250" width="14" height="164" rx="3" fill="#5f84a8" stroke="#46658a" stroke-width="1"/>' +
            '<line x1="' + PX + '" y1="250" x2="' + PX + '" y2="26" stroke="#9aa3ad" stroke-width="3"/>' +
            '<circle cx="' + (PX - 9) + '" cy="262" r="5" fill="#2b2f36"/>' +
            '<line x1="' + (CX - 10) + '" y1="34" x2="' + (PX + 4) + '" y2="34" stroke="#8a929c" stroke-width="4" stroke-linecap="round"/>' +
            '<rect x="' + (PX - 12) + '" y="27" width="24" height="15" rx="2" fill="#5f84a8" stroke="#46658a" stroke-width="1"/>' +
            '<rect x="' + (CX - 8) + '" y="30" width="16" height="10" rx="2" fill="#5f84a8"/>';
        // trådarna som stavarna sitter på
        bas += '<line x1="' + (CX - 3) + '" y1="38" x2="' + (CX - 3) + '" y2="' + (YT + LNG + 14) + '" stroke="#d9d2c2" stroke-width="1.4"/>' +
            '<line x1="' + (CX + 3) + '" y1="38" x2="' + (CX + 3) + '" y2="' + (YT + LNG + 14) + '" stroke="#d9d2c2" stroke-width="1.4"/>';

        function stav(i, t) {
            var s = i * DY, y = YT + s, p = phi(s, t);
            var c = Math.cos(p), sn = Math.sin(p);
            // röd ände (+) och metallände (−); djup z = R · sin φ (positivt = mot betraktaren)
            var xr = CX + R * c, yr = y - SNED * R * sn, zr = R * sn;
            var xm = CX - R * c, ym = y + SNED * R * sn;
            var ut = '';
            function rodande() {
                var k = 1 + zr / R * 0.12;
                return '<circle cx="' + vgR1(xr) + '" cy="' + vgR1(yr) + '" r="' + vgR1(5.6 * k) + '" fill="#9aa3ad" stroke="#6b737d" stroke-width="0.8"/>' +
                    '<circle cx="' + vgR1(xr + (c > 0 ? 1.6 : -1.6)) + '" cy="' + vgR1(yr) + '" r="' + vgR1(4.4 * k) + '" fill="#e23b2e"/>';
            }
            function metall() {
                var k = 1 - zr / R * 0.12;
                return '<circle cx="' + vgR1(xm) + '" cy="' + vgR1(ym) + '" r="' + vgR1(4.4 * k) + '" fill="#a9b1ba" stroke="#6b737d" stroke-width="0.8"/>';
            }
            var linje = '<line x1="' + vgR1(xm) + '" y1="' + vgR1(ym) + '" x2="' + vgR1(xr) + '" y2="' + vgR1(yr) +
                '" stroke="#8d96a1" stroke-width="2.6" stroke-linecap="round"/>' +
                '<rect x="' + (CX - 6) + '" y="' + vgR1(y - 2.5) + '" width="12" height="5" rx="2" fill="#e9e4d6" stroke="#c9c1ad" stroke-width="0.6"/>';
            // den bortre änden först, sedan staven, sist den närmaste änden
            if (zr >= 0) ut = metall() + linje + rodande();
            else ut = rodande() + linje + metall();
            return { y: y, z: Math.abs(zr), svg: ut };
        }

        function rita() {
            var t = ((tid % CYKEL) + CYKEL) % CYKEL, s = '';
            for (var i = 0; i < N; i++) s += stav(i, t).svg;
            // "puls" och v-pil nedåt följer vridningens mitt
            var sc = V * (t - 0.4 - TAU / 2);
            if (sc > 10 && sc < LNG - 30) {
                var y = YT + sc, x = CX - R - 40;
                s += lbl(x, y - 14, 'end', 'puls', 15, INK, ' font-weight="600"');
                s += '<line x1="' + (x - 14) + '" y1="' + vgR1(y - 6) + '" x2="' + (x - 14) + '" y2="' + vgR1(y + 22) + '" stroke="' + ROD + '" stroke-width="2.4"/>' +
                    '<polygon points="' + (x - 18.5) + ',' + vgR1(y + 22) + ' ' + (x - 14) + ',' + vgR1(y + 31) + ' ' + (x - 9.5) + ',' + vgR1(y + 22) + '" fill="' + ROD + '"/>' +
                    lbl(x - 4, y + 22, 'start', it('v'), 16, ROD);
            }
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="120 14 400 404" width="420" height="424" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En vågställning hänger lodrätt i ett stativ. Den översta staven vrids, och en puls vandrar nedåt ' +
            'medan varje stav bara vrider sig så att ändarna rör sig åt höger och vänster.">' +
            bas + '<g class="ms-vs-dyn"></g></svg>';
        var dyn = scene.querySelector('.ms-vs-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 400 / 404, 150);
        scene.querySelector('svg').style.maxWidth = '420px';
        var tk = vgTid(CYKEL, function () { return tid; }, function (t) { tid = t; rita(); });
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        controls.appendChild(tk.btn);
        card.appendChild(controls);
        card.appendChild(tk.rad);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        info.textContent = 'Pulsen rör sig nedåt, men varje stav vrider sig bara på stället så att kulorna rör sig åt höger och vänster.';
        card.appendChild(info);
        node.appendChild(card);

        var loop = vgLoop(card, function (dt) { tid += dt; rita(); tk.visa(); });
        tk.koppla(loop);
        card._set = function (t) { tid = t; rita(); tk.visa(); };
        rita();
        tk.spela(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: pennprovet
    // ══════════════════════════════════════════════════════════════════════
    // ma1c-4.8 (Funktion och funktionsvärde): två grafer bredvid varandra,
    // den ena en funktion och den andra inte. En penna ligger lodrätt över
    // båda koordinatsystemen på samma x-värde; eleven drar den i sidled och
    // ser skärningspunkterna markeras och räknas. Sedan väljer eleven vilken
    // graf som är en funktion och får en förklaring med ett x-värde där den
    // andra grafen skärs mer än en gång. "Svep med pennan" drar pennan över
    // hela fönstret, "Nya grafer" byter till nästa par. Kurvorna samplas
    // tätt ur sina samband, och skärningarna räknas ur samma polylinjer.
    function buildPennprovet(node, cfg) {
        var INK = '#1f2530', BLA = '#2563c9', ROD = '#c8324a', GRON = '#3f7a2e', PRICK = '#b8531f';
        var GRID = 'rgba(31,37,48,0.15)';
        var U = 22, LIM = 6, N = ++ppRaknare;

        // Kurvor i matematiska koordinater: listor av polylinjer
        function avX(f, a, b) {          // y = f(x)
            var p = [], x;
            for (x = a; x <= b + 1e-9; x += 0.02) p.push([x, f(x)]);
            return [p];
        }
        function avY(g, a, b) {          // x = g(y)
            var p = [], y;
            for (y = a; y <= b + 1e-9; y += 0.02) p.push([g(y), y]);
            return [p];
        }
        function cirkel(cx, cy, r) {
            var p = [], i, n = 720;
            for (i = 0; i <= n; i++) { var t = 2 * Math.PI * i / n; p.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); }
            return [p];
        }
        var PAR = [
            { fn: avX(function (x) { return 0.5 * x * x - 2; }, -6.5, 6.5),
              ej: avY(function (y) { return 0.5 * y * y - 2; }, -6.5, 6.5) },
            { fn: avX(function (x) { return x * x * x / 8 - x; }, -6.5, 6.5),
              ej: avY(function (y) { return y * y * y / 8 - y; }, -6.5, 6.5) },
            { fn: avX(function (x) { return 2 * Math.sqrt(Math.max(0, x + 4)) - 2; }, -4, 6.5),
              ej: cirkel(0, 1, 3.5) },
            { fn: avX(function (x) { return 3 - Math.abs(x); }, -6.5, 6.5),
              ej: avY(function (y) { return 3 - Math.abs(y); }, -6.5, 6.5) }
        ];
        var par = 0, fnForst = false;    // fnForst: graf A är funktionen
        var pennX = 1.5, svarat = false, rafId = 0;

        function X(x) { return (x + LIM) * U; }
        function Y(y) { return (LIM - y) * U; }
        function r1(v) { return Math.round(v * 10) / 10; }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function minus(v) { return String(v).replace('-', '−'); }
        function fmt(v) {
            var s = v.toFixed(1);
            if (parseFloat(s) === 0) return '0';
            return s.replace('.0', '').replace('.', ',').replace('-', '−');
        }
        function ln(x1, y1, x2, y2, col, w, extra) {
            return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(x2) + '" y2="' + r1(y2) +
                '" stroke="' + col + '" stroke-width="' + w + '"' + (extra || '') + '/>';
        }
        // y-värdena där den lodräta linjen x = a skär kurvan (dubbletter bort)
        function skarning(kurva, a) {
            var ys = [], i, j;
            for (i = 0; i < kurva.length; i++) {
                var p = kurva[i];
                for (j = 1; j < p.length; j++) {
                    var x1 = p[j - 1][0], x2 = p[j][0];
                    if (x1 === x2 || (x1 - a) * (x2 - a) > 0) continue;
                    var y = p[j - 1][1] + (p[j][1] - p[j - 1][1]) * (a - x1) / (x2 - x1);
                    if (Math.abs(y) > LIM) continue;
                    var ny = true;
                    for (var k = 0; k < ys.length; k++) if (Math.abs(ys[k] - y) < 0.08) { ny = false; break; }
                    if (ny) ys.push(y);
                }
            }
            return ys;
        }
        // Ett heltal (närmast 0 först) där kurvan skärs mer än en gång
        function exempelX(kurva) {
            for (var d = 0; d <= LIM; d++) {
                if (skarning(kurva, d).length > 1) return d;
                if (d && skarning(kurva, -d).length > 1) return -d;
            }
            return 0;
        }
        function bana(kurva) {
            var s = '';
            for (var i = 0; i < kurva.length; i++) {
                var p = kurva[i], d = '';
                for (var j = 0; j < p.length; j++) d += (j ? ' L' : 'M') + r1(X(p[j][0])) + ',' + r1(Y(p[j][1]));
                s += '<path d="' + d + '" fill="none" stroke="' + BLA + '" stroke-width="2.4" stroke-linejoin="round"/>';
            }
            return s;
        }

        // ── Fast bakgrund: rutnät, axlar och skalvärden ────────────────────
        var bas = '', v;
        for (v = -LIM; v <= LIM; v++) {
            bas += ln(X(v), Y(LIM), X(v), Y(-LIM), GRID, 1);
            bas += ln(X(-LIM), Y(v), X(LIM), Y(v), GRID, 1);
        }
        bas += ln(X(-LIM), Y(0), X(LIM) + 6, Y(0), INK, 1.6) +
            '<polygon points="' + (X(LIM) + 16) + ',' + Y(0) + ' ' + (X(LIM) + 6) + ',' + (Y(0) - 4.5) + ' ' +
            (X(LIM) + 6) + ',' + (Y(0) + 4.5) + '" fill="' + INK + '"/>';
        bas += ln(X(0), Y(-LIM), X(0), Y(LIM) - 6, INK, 1.6) +
            '<polygon points="' + X(0) + ',' + (Y(LIM) - 16) + ' ' + (X(0) - 4.5) + ',' + (Y(LIM) - 6) + ' ' +
            (X(0) + 4.5) + ',' + (Y(LIM) - 6) + '" fill="' + INK + '"/>';
        bas += '<text x="' + (X(LIM) + 16) + '" y="' + (Y(0) + 19) + '" font-size="15" text-anchor="end" fill="' + INK + '">' + it('x') + '</text>';
        bas += '<text x="' + (X(0) + 9) + '" y="' + (Y(LIM) - 6) + '" font-size="15" fill="' + INK + '">' + it('y') + '</text>';
        for (v = -4; v <= 4; v += 2) {
            if (!v) continue;
            bas += '<text x="' + X(v) + '" y="' + (Y(0) + 16) + '" font-size="12" text-anchor="middle" fill="' + INK + '">' + minus(v) + '</text>';
            bas += '<text x="' + (X(0) - 6) + '" y="' + (Y(v) + 4) + '" font-size="12" text-anchor="end" fill="' + INK + '">' + minus(v) + '</text>';
        }

        // ── DOM ───────────────────────────────────────────────────────────
        if (!document.getElementById('ms-pp-css')) {
            var st = document.createElement('style');
            st.id = 'ms-pp-css';
            st.textContent =
                '.ms-pp-rad{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center;}' +
                '.ms-pp-panel{flex:1 1 250px;min-width:0;max-width:330px;}' +
                '.ms-pp-namn{font:600 15px Poppins,system-ui,sans-serif;color:#1f2530;text-align:center;margin:2px 0 0;}' +
                '.ms-pp-svg{display:block;width:100%;height:auto;touch-action:pan-y;cursor:ew-resize;font-style:normal;}' +
                '.ms-pp-antal{font:14px Poppins,system-ui,sans-serif;text-align:center;min-height:1.5em;margin:0 0 2px;}' +
                '.minisim-card.ms-svgfs:fullscreen .ms-pp-panel,.minisim-card.ms-svgfs:-webkit-full-screen .ms-pp-panel{max-width:none;}';
            document.head.appendChild(st);
        }
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var VBX = -16, VBY = -26, VBW = X(LIM) + 40, VBH = Y(-LIM) + 34;
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        var rad = document.createElement('div');
        rad.className = 'ms-pp-rad';
        scene.appendChild(rad);
        var paneler = ['A', 'B'].map(function (namn, i) {
            var p = document.createElement('div');
            p.className = 'ms-pp-panel';
            p.innerHTML = '<div class="ms-pp-namn">Graf ' + namn + '</div>' +
                '<svg class="ms-pp-svg" viewBox="' + VBX + ' ' + VBY + ' ' + VBW + ' ' + VBH + '" width="300" height="' +
                Math.round(300 * VBH / VBW) + '" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
                'aria-label="Graf ' + namn + ' i ett koordinatsystem med en lodrät penna som kan dras i sidled.">' +
                '<defs><clipPath id="ms-pp-' + N + '-' + i + '"><rect x="0" y="0" width="' + X(LIM) + '" height="' + Y(-LIM) + '"/></clipPath></defs>' +
                bas + '<g class="ms-pp-kurva" clip-path="url(#ms-pp-' + N + '-' + i + ')"></g><g class="ms-pp-penna"></g>' +
                '<rect x="' + VBX + '" y="' + VBY + '" width="' + VBW + '" height="' + VBH + '" fill="transparent" class="ms-pp-drag"/></svg>' +
                '<div class="ms-pp-antal"></div>';
            rad.appendChild(p);
            return { svg: p.querySelector('svg'), kurvG: p.querySelector('.ms-pp-kurva'),
                     pennG: p.querySelector('.ms-pp-penna'), antal: p.querySelector('.ms-pp-antal') };
        });
        card.appendChild(scene);
        msFullskarm(card, scene, (2 * VBW + 20) / (VBH + 50), 230);

        var info = document.createElement('div');
        info.className = 'minisim-info';
        info.style.fontSize = '15px';
        info.style.lineHeight = '1.6';
        info.style.whiteSpace = 'normal';
        info.style.color = INK;
        card.appendChild(info);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        function mkBtn(txt, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
            b.textContent = txt;
            controls.appendChild(b);
            return b;
        }
        var svarA = mkBtn('Graf A är en funktion', 'ms-primar');
        var svarB = mkBtn('Graf B är en funktion', 'ms-primar');
        var svepBtn = mkBtn('Svep med pennan');
        var nyBtn = mkBtn('Nya grafer');
        card.appendChild(controls);
        node.appendChild(card);

        // ── Ritning ───────────────────────────────────────────────────────
        function kurvor() {
            var p = PAR[par];
            return fnForst ? [p.fn, p.ej] : [p.ej, p.fn];
        }
        // Pennan: suddgummi och metallhylsa upptill, spetsad udd nedtill
        function penna(a) {
            var px = X(a), w = 11, h = w / 2, top = VBY + 2, udd = Y(-LIM) + 4;
            var s = '<g opacity="0.82">';
            s += '<rect x="' + r1(px - h) + '" y="' + top + '" width="' + w + '" height="14" rx="3" fill="#e58a9b"/>';
            s += '<rect x="' + r1(px - h) + '" y="' + (top + 12) + '" width="' + w + '" height="9" fill="#a9adb3"/>';
            s += ln(px - h, top + 15, px + h, top + 15, '#7d8187', 1) + ln(px - h, top + 18, px + h, top + 18, '#7d8187', 1);
            s += '<rect x="' + r1(px - h) + '" y="' + (top + 21) + '" width="' + w + '" height="' + r1(udd - 26 - top - 21) + '" fill="#e9b52e"/>';
            s += '<rect x="' + r1(px - 1.6) + '" y="' + (top + 21) + '" width="3.2" height="' + r1(udd - 26 - top - 21) + '" fill="#d29e1e"/>';
            s += '<polygon points="' + r1(px - h) + ',' + r1(udd - 26) + ' ' + r1(px + h) + ',' + r1(udd - 26) + ' ' +
                r1(px + 1.8) + ',' + r1(udd - 7) + ' ' + r1(px - 1.8) + ',' + r1(udd - 7) + '" fill="#efd3a6"/>';
            s += '<polygon points="' + r1(px - 1.8) + ',' + r1(udd - 7) + ' ' + r1(px + 1.8) + ',' + r1(udd - 7) + ' ' +
                r1(px) + ',' + r1(udd) + '" fill="#3b3e44"/>';
            return s + '</g>';
        }
        function ritaKurvor() {
            var k = kurvor();
            paneler[0].kurvG.innerHTML = bana(k[0]);
            paneler[1].kurvG.innerHTML = bana(k[1]);
        }
        function rita() {
            var k = kurvor();
            paneler.forEach(function (p, i) {
                var ys = skarning(k[i], pennX), s = penna(pennX);
                ys.forEach(function (y) {
                    s += '<circle cx="' + r1(X(pennX)) + '" cy="' + r1(Y(y)) + '" r="5.5" fill="' + PRICK + '" stroke="' + INK + '" stroke-width="1.4"/>';
                });
                p.pennG.innerHTML = s;
                var n = ys.length;
                p.antal.innerHTML = n === 0 ? '<span style="color:#4a5160">Pennan skär inte grafen här</span>' :
                    n === 1 ? 'Pennan skär grafen <strong>1 gång</strong>' :
                    '<span style="color:' + ROD + '">Pennan skär grafen <strong>' + n + ' gånger</strong></span>';
            });
            if (!svarat) {
                info.innerHTML = 'Pennan ligger vid <em>x</em> = ' + fmt(pennX) +
                    '. Dra den i sidled och välj sedan vilken graf som är en funktion.';
            }
        }
        function satt(a) {
            pennX = Math.max(-LIM, Math.min(LIM, Math.round(a * 10) / 10));
            rita();
        }
        function svara(valdeA) {
            cancelAnimationFrame(rafId);
            svarat = true;
            var ratt = valdeA === fnForst;
            var fnNamn = fnForst ? 'A' : 'B', ejNamn = fnForst ? 'B' : 'A';
            var ex = exempelX(PAR[par].ej);
            satt(ex);
            var n = skarning(PAR[par].ej, ex).length;
            info.innerHTML = (ratt ? '<strong style="color:' + GRON + '">Rätt.</strong> ' :
                '<strong style="color:' + ROD + '">Inte riktigt.</strong> ') +
                'Graf ' + fnNamn + ' är en funktion: var du än håller pennan skär den grafen högst en gång. ' +
                'Graf ' + ejNamn + ' är ingen funktion. Vid <em>x</em> = ' + fmt(ex) + ' skär pennan den ' +
                (n === 2 ? 'två' : n === 3 ? 'tre' : String(n)) + ' gånger, så där hör flera <em>y</em>-värden till samma <em>x</em>-värde.';
        }
        function nyaGrafer() {
            cancelAnimationFrame(rafId);
            par = (par + 1) % PAR.length;
            fnForst = Math.random() < 0.5;
            svarat = false;
            ritaKurvor();
            satt(1.5);
        }
        function svep() {
            cancelAnimationFrame(rafId);
            var t0 = 0, DUR = 4000;
            function steg(ts) {
                if (!t0) t0 = ts;
                var u = Math.min(1, (ts - t0) / DUR);
                satt(-LIM + 2 * LIM * u);
                if (u < 1) rafId = requestAnimationFrame(steg);
            }
            rafId = requestAnimationFrame(steg);
        }
        svarA.addEventListener('click', function () { svara(true); });
        svarB.addEventListener('click', function () { svara(false); });
        svepBtn.addEventListener('click', svep);
        nyBtn.addEventListener('click', nyaGrafer);

        // Dra pennan: var som helst i ett av koordinatsystemen
        paneler.forEach(function (p) {
            var yta = p.svg.querySelector('.ms-pp-drag'), drar = false;
            function fran(e) {
                var pt = p.svg.createSVGPoint();
                pt.x = e.clientX; pt.y = e.clientY;
                var m = p.svg.getScreenCTM();
                if (!m) return;
                var q = pt.matrixTransform(m.inverse());
                satt(q.x / U - LIM);
            }
            yta.addEventListener('pointerdown', function (e) {
                cancelAnimationFrame(rafId);
                drar = true;
                if (yta.setPointerCapture) yta.setPointerCapture(e.pointerId);
                fran(e);
            });
            yta.addEventListener('pointermove', function (e) { if (drar) fran(e); });
            yta.addEventListener('pointerup', function () { drar = false; });
            yta.addEventListener('pointercancel', function () { drar = false; });
        });

        // Test-handtag för skärmdumpsskript
        card._set = function (i, a, forst) { par = i; fnForst = !!forst; svarat = false; ritaKurvor(); satt(a); };
        card._svara = svara;
        ritaKurvor();
        rita();
    }
    var ppRaknare = 0;

    // ══════════════════════════════════════════════════════════════════════
    //  typ: snurrslang
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.10, demonstrationen "Öppen pipa": en räfflad plastslang som hålls
    // i ena änden och snurras runt som en propeller. Slangen är en öppen pipa
    // med längden l = 0,75 m, så tonerna är f = n · v / (2l) med v = 340 m/s
    // (227, 453 och 680 Hz). Luften sugs ut genom slangen fortare ju fortare
    // den snurrar, och räfflorna sätter igång en ton först när luftens fart
    // räcker för pipans grundton. Under det varvtalet (1,05 varv/s) hörs bara
    // sus. Därefter går tonen direkt över i nästa när farten ökar, utan tyst
    // glapp, precis som med en riktig slang: grundtonen upp till 2,25 varv/s,
    // första övertonen upp till 3,75 varv/s och andra övertonen därovanför.
    // Varvtalet styrs med glidaren eller genom att dra slangen runt med
    // musen/fingret. Ljudet syntetiseras med Web Audio: tonen (grundsvängning
    // + några övertoner, lätt dopplervibrato i takt med varvet) och ett
    // bandpassfiltrerat brus för suset.
    var ssRaknare = 0;
    function buildSnurrslang(node, cfg) {
        var INK = '#1f2530', BLA = '#2563c9', GUL = '#f2c81c', GULM = '#b8920a';
        var L = 0.75, V = 340, RPSMAX = 5, GRANS = [1.05, 2.25, 3.75, 5];
        var HX = 190, HY = 156, R = 138;                       // navet och slangens längd i px
        var PX0 = 372, PX1 = 622, PY = 118;                    // den raka slangen i panelen
        var BX0 = 40, BX1 = 620, BY = 322;                     // varvtalsskalan
        var rps = 0, mal = 0, vinkel = -Math.PI / 2, tid = 0;
        var ljudPa = true, drar = false, dragVinkel = 0, dragTid = 0;
        var id = 'ms-ss-' + (++ssRaknare);

        function fmt(v, d) { var s = v.toFixed(d); return parseFloat(s) === 0 ? '0' : s.replace('.', ','); }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 14) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function ton() {                                       // 0 = ingen ton, annars n
            if (rps < GRANS[0]) return 0;
            return rps < GRANS[1] ? 1 : rps < GRANS[2] ? 2 : 3;
        }
        function frekv(n) { return n * V / (2 * L); }
        function bx(v) { return BX0 + (BX1 - BX0) * v / RPSMAX; }
        var NAMN = ['', 'Grundton', 'Första övertonen', 'Andra övertonen'];

        // ── fast bakgrund: rutnät, varvtalsskalan ─────────────────────────
        var bas = vgRutnat(id, 0, 0, 660, 362);
        for (var n = 1; n <= 3; n++) {
            var a = bx(GRANS[n - 1]), b = bx(GRANS[n]);
            bas += '<rect x="' + vgR1(a) + '" y="' + (BY - 9) + '" width="' + vgR1(b - a) + '" height="18" fill="' + BLA + '" opacity="' + [0, 0.12, 0.2, 0.28][n] + '"/>';
            if (n > 1) bas += '<line x1="' + vgR1(a) + '" y1="' + (BY - 9) + '" x2="' + vgR1(a) + '" y2="' + (BY + 9) + '" stroke="' + BLA + '" stroke-width="1.2"/>';
            bas += lbl((a + b) / 2, BY - 15, 'middle', NAMN[n].toLowerCase(), 12, BLA, ' font-weight="600"');
        }
        bas += '<line x1="' + BX0 + '" y1="' + BY + '" x2="' + BX1 + '" y2="' + BY + '" stroke="' + INK + '" stroke-width="1.6"/>';
        for (var v = 0; v <= RPSMAX; v++) {
            bas += '<line x1="' + bx(v) + '" y1="' + (BY - 4) + '" x2="' + bx(v) + '" y2="' + (BY + 4) + '" stroke="' + INK + '" stroke-width="1.3"/>';
            bas += lbl(bx(v), BY + 18, 'middle', String(v), 12, '#6a7180');
        }
        bas += lbl(BX1 + 6, BY + 18, 'start', 'varv/s', 12, '#6a7180');
        // armen, som håller i slangen nedanför navet
        bas += '<path d="M -10 282 C 50 262 118 222 ' + (HX - 14) + ' ' + (HY + 18) + '" fill="none" stroke="#4b5563" stroke-width="34" stroke-linecap="round"/>' +
            '<path d="M -10 282 C 50 262 118 222 ' + (HX - 14) + ' ' + (HY + 18) + '" fill="none" stroke="#6b7280" stroke-width="34" stroke-dasharray="2 5" stroke-linecap="butt" opacity="0.5"/>';
        // panelens fasta delar: slangens väggar, måttlinje
        bas += lbl((PX0 + PX1) / 2, 40, 'middle', 'Stående våg i slangen', 13, '#6a7180', ' font-weight="600"');
        bas += '<line x1="' + PX0 + '" y1="' + (PY - 26) + '" x2="' + PX1 + '" y2="' + (PY - 26) + '" stroke="' + INK + '" stroke-width="2"/>' +
            '<line x1="' + PX0 + '" y1="' + (PY + 26) + '" x2="' + PX1 + '" y2="' + (PY + 26) + '" stroke="' + INK + '" stroke-width="2"/>';
        bas += vgDubbelpil(PX0, PY + 44, PX1, PY + 44, '#6a7180');
        bas += lbl((PX0 + PX1) / 2, PY + 62, 'middle', it('l') + ' = 0,75 m', 13, '#6a7180');

        function slangPunkter(th, bojning) {
            var p = [];
            for (var k = 0; k <= 24; k++) {
                var s = k / 24, a = th - bojning * s * s, r = 14 + (R - 14) * s;
                p.push(vgR1(HX + r * Math.cos(a)) + ',' + vgR1(HY + r * Math.sin(a)));
            }
            return p.join(' ');
        }
        function slang(th, bojning, op) {
            var pts = slangPunkter(th, bojning);
            return '<g opacity="' + op + '">' +
                '<polyline points="' + pts + '" fill="none" stroke="' + GULM + '" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>' +
                '<polyline points="' + pts + '" fill="none" stroke="' + GUL + '" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>' +
                '<polyline points="' + pts + '" fill="none" stroke="' + GULM + '" stroke-width="13" stroke-dasharray="1.4 3.2" opacity="0.55"/>' +
                '</g>';
        }

        function rita() {
            var s = '', n = ton(), bojning = 0.35 * Math.min(1, rps / 4);
            // rörelseoskärpa: en svag skiva och några skuggor bakom slangen
            if (rps > 0.4) {
                s += '<circle cx="' + HX + '" cy="' + HY + '" r="' + R + '" fill="' + GUL + '" opacity="' + vgR1(Math.min(0.22, rps * 0.05) * 100) / 100 + '"/>';
                var spann = Math.min(2.2, rps * 0.5);
                for (var i = 5; i >= 1; i--) s += slang(vinkel - spann * i / 5, bojning, 0.13);
            }
            s += slang(vinkel, bojning, 1);
            // handen runt slangens inre ände
            s += '<ellipse cx="' + HX + '" cy="' + HY + '" rx="21" ry="19" fill="#efc29c" stroke="#b9845c" stroke-width="1.4"/>' +
                '<path d="M ' + (HX - 12) + ' ' + (HY - 9) + ' Q ' + HX + ' ' + (HY - 15) + ' ' + (HX + 12) + ' ' + (HY - 9) +
                ' M ' + (HX - 13) + ' ' + (HY - 1) + ' Q ' + HX + ' ' + (HY - 6) + ' ' + (HX + 13) + ' ' + (HY - 1) +
                ' M ' + (HX - 12) + ' ' + (HY + 7) + ' Q ' + HX + ' ' + (HY + 3) + ' ' + (HX + 12) + ' ' + (HY + 7) +
                '" fill="none" stroke="#b9845c" stroke-width="1.1" opacity="0.8"/>';
            // stående våg i den raka slangen: buk i båda öppningarna
            if (n) {
                var upp = [], ned = [], lin = [], A = 20, c = Math.cos(2 * Math.PI * 1.2 * tid);
                for (var k = 0; k <= 80; k++) {
                    var x = PX0 + (PX1 - PX0) * k / 80, e = A * Math.cos(n * Math.PI * k / 80);
                    upp.push(vgR1(x) + ',' + vgR1(PY - e)); ned.unshift(vgR1(x) + ',' + vgR1(PY + e));
                    lin.push(vgR1(x) + ',' + vgR1(PY - e * c));
                }
                s += '<polygon points="' + upp.join(' ') + ' ' + ned.join(' ') + '" fill="' + BLA + '" opacity="0.16"/>';
                s += '<polyline points="' + upp.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="1.6"/>';
                s += '<polyline points="' + ned.reverse().join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="1.6" opacity="0.5"/>';
                s += '<polyline points="' + lin.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="2.4"/>';
                s += lbl((PX0 + PX1) / 2, 200, 'middle', NAMN[n] + ', ' + it('n') + ' = ' + n, 15, INK, ' font-weight="600"');
                s += lbl((PX0 + PX1) / 2, 224, 'middle', it('λ') + ' = ' + fmt(2 * L / n, 2) + ' m     ' + it('f') + ' = ' + fmt(frekv(n), 0) + ' Hz', 15, BLA, ' font-weight="600" xml:space="preserve"');
            } else {
                s += '<line x1="' + PX0 + '" y1="' + PY + '" x2="' + PX1 + '" y2="' + PY + '" stroke="#9aa0a6" stroke-width="1" stroke-dasharray="5 4"/>';
                s += lbl((PX0 + PX1) / 2, 200, 'middle', rps < 0.2 ? 'Slangen står still' : 'Ingen ton än, bara sus', 15, '#6a7180', ' font-weight="600"');
            }
            // markören på varvtalsskalan
            var mx = bx(rps);
            s += '<polygon points="' + vgR1(mx - 6) + ',' + (BY + 26) + ' ' + vgR1(mx) + ',' + (BY + 9) + ' ' + vgR1(mx + 6) + ',' + (BY + 26) + '" fill="' + INK + '"/>';
            dyn.innerHTML = s;
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="0 10 660 347" width="660" height="347" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="En hand snurrar en gul räfflad plastslang runt som en propeller. Vid ett visst varvtal ljuder grundtonen, ' +
            'vid ett högre varvtal första övertonen och vid ett ännu högre andra övertonen. Bredvid visas den stående vågen i slangen.">' +
            bas + '<g class="ms-ss-dyn"></g></svg>';
        var svg = scene.querySelector('svg');
        var dyn = scene.querySelector('.ms-ss-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 660 / 347, 130);

        var row = document.createElement('div');
        row.className = 'minisim-slider-row';
        var sLbl = document.createElement('span');
        sLbl.className = 'minisim-slider-lbl';
        sLbl.textContent = 'Varvtal';
        var sl = document.createElement('input');
        sl.type = 'range';
        sl.className = 'minisim-slider';
        sl.min = '0'; sl.max = String(RPSMAX); sl.step = '0.05'; sl.value = '0';
        sl.setAttribute('aria-label', 'Varvtal i varv per sekund');
        var val = document.createElement('span');
        val.className = 'minisim-slider-val';
        row.appendChild(sLbl); row.appendChild(sl); row.appendChild(val);
        card.appendChild(row);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var stoppBtn = vgBtn('Stanna');
        var ljudBtn = vgBtn('Stäng av ljudet');
        controls.appendChild(stoppBtn);
        controls.appendChild(ljudBtn);
        card.appendChild(controls);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.style.marginTop = '6px';
        card.appendChild(info);
        node.appendChild(card);

        var senasteInfo = '';
        function uppdateraInfo() {
            var n = ton(), t;
            if (rps < 0.2) t = 'Dra i glidaren, eller ta tag i slangen och snurra den runt, och lyssna.';
            else if (!n) t = 'Luften susar genom slangen, men farten räcker inte för att sätta igång grundtonen än. Snurra fortare.';
            else t = NAMN[n] + ': slangen rymmer ' + (n === 1 ? 'en halv våglängd' : n === 2 ? 'en hel våglängd' : 'tre halva våglängder') +
                ', <em>l</em> = ' + n + ' · <em>λ</em>/2, så <em>λ</em> = ' + fmt(2 * L / n, 2) + ' m och <em>f</em> = <em>v</em>/<em>λ</em> = ' +
                V + '/' + fmt(2 * L / n, 2) + ' = ' + fmt(frekv(n), 0) + ' Hz.';
            if (t !== senasteInfo) { info.innerHTML = t; senasteInfo = t; }
            val.textContent = fmt(rps, 1) + ' varv/s';
        }

        // ── ljud ──────────────────────────────────────────────────────────
        var actx = null, master = null, tonG = null, oscs = [], susG = null, susF = null;
        function startaLjud() {
            if (actx) { if (actx.state === 'suspended') actx.resume(); return; }
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            actx = new AC();
            master = actx.createGain(); master.gain.value = ljudPa ? 1 : 0; master.connect(actx.destination);
            tonG = actx.createGain(); tonG.gain.value = 0; tonG.connect(master);
            [1, 2, 3, 4].forEach(function (h) {
                var o = actx.createOscillator(), g = actx.createGain();
                o.type = 'sine'; o.frequency.value = 227 * h;
                g.gain.value = [0, 0.5, 0.16, 0.07, 0.03][h];
                o.connect(g); g.connect(tonG); o.start();
                oscs.push({ o: o, h: h });
            });
            var len = actx.sampleRate * 2, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
            var src = actx.createBufferSource(); src.buffer = buf; src.loop = true;
            susF = actx.createBiquadFilter(); susF.type = 'bandpass'; susF.frequency.value = 900; susF.Q.value = 0.7;
            susG = actx.createGain(); susG.gain.value = 0;
            src.connect(susF); susF.connect(susG); susG.connect(master); src.start();
        }
        var tonN = 0, tonAmp = 0;
        function ljudSteg(dt) {
            if (!actx) return;
            var t = actx.currentTime, n = ton();
            if (n) tonN = n;
            tonAmp += ((n ? 0.22 : 0) - tonAmp) * Math.min(1, dt * 14);
            // dopplervibrato: spetsen rör sig mot och från lyssnaren en gång per varv
            var dopp = 1 + 0.012 * Math.min(1, rps / 3) * Math.sin(vinkel);
            oscs.forEach(function (x) { x.o.frequency.setTargetAtTime(frekv(tonN || 1) * x.h * dopp, t, 0.01); });
            var svaj = 1 + 0.25 * Math.sin(vinkel);
            tonG.gain.setTargetAtTime(tonAmp * svaj, t, 0.02);
            susG.gain.setTargetAtTime(Math.min(0.09, rps * 0.02) * svaj, t, 0.03);
            susF.frequency.setTargetAtTime(500 + rps * 260, t, 0.05);
        }
        ljudBtn.addEventListener('click', function () {
            ljudPa = !ljudPa;
            ljudBtn.textContent = ljudPa ? 'Stäng av ljudet' : 'Sätt på ljudet';
            startaLjud();
            if (master) master.gain.setTargetAtTime(ljudPa ? 1 : 0, actx.currentTime, 0.03);
        });
        sl.addEventListener('input', function () { startaLjud(); mal = parseFloat(sl.value); });
        stoppBtn.addEventListener('click', function () { mal = 0; sl.value = '0'; });

        // ta tag i slangen och snurra den runt navet
        function svgPunkt(e) {
            var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
            return { x: vb.x + (e.clientX - r.left) / r.width * vb.width, y: vb.y + (e.clientY - r.top) / r.height * vb.height };
        }
        svg.addEventListener('pointerdown', function (e) {
            var p = svgPunkt(e), dx = p.x - HX, dy = p.y - HY;
            if (dx * dx + dy * dy > (R + 14) * (R + 14)) return;
            startaLjud();
            drar = true; dragVinkel = Math.atan2(dy, dx); dragTid = performance.now();
            try { svg.setPointerCapture(e.pointerId); } catch (er) {}
            e.preventDefault();
        });
        svg.addEventListener('pointermove', function (e) {
            if (!drar) return;
            var p = svgPunkt(e), a = Math.atan2(p.y - HY, p.x - HX), nu = performance.now();
            var d = a - dragVinkel;
            if (d > Math.PI) d -= 2 * Math.PI;
            if (d < -Math.PI) d += 2 * Math.PI;
            var dtd = Math.max(0.008, (nu - dragTid) / 1000);
            var fart = Math.min(RPSMAX, Math.abs(d) / dtd / (2 * Math.PI));
            mal = mal + (fart - mal) * Math.min(1, dtd * 6);
            vinkel += d;
            dragVinkel = a; dragTid = nu;
            sl.value = String(mal);
        });
        function slapp() { drar = null; }
        svg.addEventListener('pointerup', slapp);
        svg.addEventListener('pointercancel', slapp);
        svg.style.touchAction = 'pan-y';

        var loop = vgLoop(card, function (dt) {
            tid += dt;
            rps += (mal - rps) * Math.min(1, dt * (drar ? 10 : 2.5));
            if (Math.abs(rps - mal) < 0.005) rps = mal;
            if (!drar) vinkel += 2 * Math.PI * rps * dt;
            vinkel %= 2 * Math.PI;
            ljudSteg(dt);
            uppdateraInfo();
            rita();
        });
        card._set = function (v, a) { mal = rps = v; vinkel = a || 0.4; tid = 0.1; uppdateraInfo(); rita(); };
        uppdateraInfo();
        rita();
        loop.satt(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: pipton
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.10, figurerna över piporna: en eller flera pipor (cfg.toner, till
    // exempel "1" eller "2, 3") med den stående vågen; cfg.sluten och
    // cfg.halvoppen ger slutna respektive halvöppna pipor. Vid varje rör sitter
    // två små runda knappar: spela/pausa, som sätter luften i svängning så att
    // man ser bukarna svänga och noderna stå still, och en högtalare som
    // stänger av eller sätter på rörets ton. Pipans längd är 0,75 m och
    // v = 340 m/s. Bara en ton spelas åt gången på hela sidan: startar man
    // ljudet i ett rör stängs ljudet i det rör som spelade av (dess högtalare
    // visas överkryssad), medan vågen där fortsätter att röra sig.
    // Pipans längd skrivs med rakt bråkstreck: l = λ/2, l = λ, l = 3 · λ/2.
    var ppActx = null, ppSpelar = null;
    function ppTysta(mute) {
        if (!ppSpelar) return;
        var p = ppSpelar, t = ppActx.currentTime;
        ppSpelar = null;
        p.g.gain.cancelScheduledValues(t);
        p.g.gain.setValueAtTime(p.g.gain.value, t);
        p.g.gain.linearRampToValueAtTime(0, t + 0.08);
        p.o.forEach(function (o) { o.stop(t + 0.1); });
        if (mute) p.r.ljud = false;
        p.knappar();
    }
    function buildPipton(node, cfg) {
        var INK = '#1f2530', BLA = '#2563c9', GRA = '#8a919b';
        var L = 0.75, V = 340, X0 = 70, X1 = 360, H = 96, A = 30, KX = 47;
        var toner = String(cfg.toner || '1').split(',').map(function (s) { return parseInt(s, 10); })
            .filter(function (n) { return n >= 1 && n <= 6; });
        if (!toner.length) toner = [1];
        var JA = /^(ja|1|true)$/i;
        var sluten = JA.test(String(cfg.sluten || '')), halv = JA.test(String(cfg.halvoppen || ''));
        // förskjutningen längs pipan, u = 0 … 1 från vänster öppning
        function form(n, u) {
            if (halv) return Math.cos((2 * n - 1) * Math.PI * u / 2);
            return sluten ? Math.sin(n * Math.PI * u) : Math.cos(n * Math.PI * u);
        }
        function noder(n) {
            var u = [];
            if (halv) for (var k = 0; k < n; k++) u.push((2 * k + 1) / (2 * n - 1));
            else if (sluten) for (var j = 0; j <= n; j++) u.push(j / n);
            else for (var i = 0; i < n; i++) u.push((i + 0.5) / n);
            return u;
        }
        var NAMN = ['', 'grundtonen', 'första övertonen', 'andra övertonen', 'tredje övertonen', 'fjärde övertonen', 'femte övertonen'];
        var ror = toner.map(function (n) { return { n: n, tid: 0, igang: false, ljud: true }; });
        function fmt(v, d) { var s = v.toFixed(d); return parseFloat(s) === 0 ? '0' : s.replace('.', ','); }
        function frekv(n) { return halv ? (2 * n - 1) * V / (4 * L) : n * V / (2 * L); }
        function txt(x, y, anchor, inner, color) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="13" fill="' +
                (color || INK) + '">' + inner + '</text>';
        }
        // l = n·λ/2 högerställt mot x = 436 med mittlinjen på y (bråkstrecket)
        function langd(n, y) {
            var IT = '<tspan font-style="italic">', E = '</tspan>', s = '', xR = 436;
            var c = halv ? 2 * n - 1 : n, d = halv ? 4 : 2;
            var g = c % d === 0 ? d : (d === 4 && c % 2 === 0 ? 2 : 1);
            c /= g; d /= g;
            if (d === 1) return txt(xR, y + 4.5, 'end', IT + 'l' + E + ' = ' + (c > 1 ? c + ' · ' : '') + IT + 'λ' + E);
            var bw = 12, bx = xR - bw;                         // bråket λ över d
            s += '<line x1="' + vgR1(bx) + '" y1="' + y + '" x2="' + xR + '" y2="' + y + '" stroke="' + INK + '" stroke-width="1.2"/>';
            s += txt(bx + bw / 2, y - 3.5, 'middle', IT + 'λ' + E);
            s += txt(bx + bw / 2, y + 13, 'middle', String(d));
            s += txt(bx - 4, y + 4.5, 'end', IT + 'l' + E + ' = ' + (c > 1 ? c + ' · ' : ''));
            return s;
        }

        var bas = '';
        toner.forEach(function (n, i) {
            var y0 = i * H;
            bas += '<text x="62" y="' + (y0 + 19) + '" font-size="12" fill="' + INK + '">' + NAMN[n] + ' (' +
                '<tspan font-style="italic">n</tspan> = ' + n + ')</text>';
            bas += '<line x1="' + X0 + '" y1="' + (y0 + 28) + '" x2="' + X1 + '" y2="' + (y0 + 28) + '" stroke="#9aa0a6" stroke-width="2.4"/>' +
                '<line x1="' + X0 + '" y1="' + (y0 + 96) + '" x2="' + X1 + '" y2="' + (y0 + 96) + '" stroke="#9aa0a6" stroke-width="2.4"/>' +
                '<line x1="' + X0 + '" y1="' + (y0 + 62) + '" x2="' + X1 + '" y2="' + (y0 + 62) + '" stroke="#9aa0a6" stroke-width="1" stroke-dasharray="5 4"/>';
            var upp = [], ned = [];
            for (var k = 0; k <= 120; k++) {
                var x = X0 + (X1 - X0) * k / 120, e = A * form(n, k / 120);
                upp.push(vgR1(x) + ',' + vgR1(y0 + 62 - e)); ned.push(vgR1(x) + ',' + vgR1(y0 + 62 + e));
            }
            bas += '<polyline points="' + upp.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="1.4" opacity="0.35"/>' +
                '<polyline points="' + ned.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="1.4" opacity="0.35"/>';
            if (sluten) bas += '<line x1="' + X0 + '" y1="' + (y0 + 28) + '" x2="' + X0 + '" y2="' + (y0 + 96) + '" stroke="#9aa0a6" stroke-width="2.4"/>';
            if (sluten || halv) bas += '<line x1="' + X1 + '" y1="' + (y0 + 28) + '" x2="' + X1 + '" y2="' + (y0 + 96) + '" stroke="#9aa0a6" stroke-width="2.4"/>';
            noder(n).forEach(function (u) {
                bas += '<circle cx="' + vgR1(X0 + (X1 - X0) * u) + '" cy="' + (y0 + 62) + '" r="2.6" fill="' + INK + '"/>';
            });
            bas += langd(n, y0 + 50);
            bas += txt(436, y0 + 86, 'end', '<tspan font-style="italic">f</tspan> = ' + fmt(frekv(n), 0) + ' Hz', BLA);
        });
        // två knappar vid varje rör: spela/pausa överst, högtalaren under
        ror.forEach(function (r, i) {
            ['spela', 'ljud'].forEach(function (k, j) {
                bas += '<g class="ms-pp-knapp" data-i="' + i + '" data-k="' + k + '" role="button" tabindex="0" ' +
                    'transform="translate(' + KX + ' ' + (i * H + 47 + j * 30) + ')" style="cursor:pointer"></g>';
            });
        });

        function rita() {
            var s = '';
            ror.forEach(function (r, i) {
                var n = r.n, y0 = i * H, c = Math.cos(2 * Math.PI * 2.2 * frekv(n) / frekv(1) * r.tid), pts = [];
                for (var k = 0; k <= 120; k++) {
                    var x = X0 + (X1 - X0) * k / 120, e = A * form(n, k / 120) * c;
                    pts.push(vgR1(x) + ',' + vgR1(y0 + 62 - e));
                }
                s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="2.6" stroke-linejoin="round"/>';
            });
            dyn.innerHTML = s;
        }

        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus';
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        var vbH = toner.length * H + 6;
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="30 8 412 ' + vbH + '" width="602" height="' + Math.round(vbH * 602 / 412) + '" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif">' +
            '<title>' + (halv ? 'Halvöppen pipa' : sluten ? 'Sluten pipa' : 'Öppen pipa') + ' med den stående vågen för ' + toner.map(function (n) { return NAMN[n]; }).join(' och ') +
            (halv ? '. Buk i öppningen och nod vid den slutna änden.' : sluten ? '. Noder vid båda ändarna.' : '. Bukar i båda öppningarna.') + '</title>' +
            '<g class="ms-pp-dyn"></g>' + bas + '</svg>';
        var dyn = scene.querySelector('.ms-pp-dyn');
        var knappEl = Array.prototype.slice.call(scene.querySelectorAll('.ms-pp-knapp'));
        card.appendChild(scene);
        node.appendChild(card);

        function ikon(k, r) {
            var spelar = !!(ppSpelar && ppSpelar.r === r), s;
            if (k === 'spela') {
                s = '<circle r="12" fill="' + (r.igang ? BLA : '#ffffff') + '" stroke="' + (r.igang ? BLA : '#b8bfc9') + '" stroke-width="1.4"/>';
                var c = r.igang ? '#ffffff' : INK;
                s += r.igang ? '<rect x="-4.6" y="-5.2" width="3.2" height="10.4" rx="0.8" fill="' + c + '"/><rect x="1.4" y="-5.2" width="3.2" height="10.4" rx="0.8" fill="' + c + '"/>'
                    : '<path d="M -3 -6 L 6 0 L -3 6 Z" fill="' + c + '" stroke="' + c + '" stroke-width="1.2" stroke-linejoin="round"/>';
                return s;
            }
            var col = r.ljud ? (spelar ? BLA : INK) : GRA;
            s = '<circle r="12" fill="#ffffff" stroke="' + (spelar ? BLA : '#b8bfc9') + '" stroke-width="1.4"/>' +
                '<path d="M -7 -2.6 L -4.2 -2.6 L 0 -6 L 0 6 L -4.2 2.6 L -7 2.6 Z" fill="' + col + '" stroke="' + col + '" stroke-width="1" stroke-linejoin="round"/>';
            if (r.ljud) s += '<path d="M 2.8 -3 A 4.2 4.2 0 0 1 2.8 3 M 4.8 -5.6 A 7.6 7.6 0 0 1 4.8 5.6" fill="none" stroke="' + col + '" stroke-width="1.5" stroke-linecap="round"/>';
            else s += '<path d="M 2.6 -3.4 L 7.4 3.4 M 7.4 -3.4 L 2.6 3.4" stroke="' + col + '" stroke-width="1.6" stroke-linecap="round"/>';
            return s;
        }
        function knappar() {
            knappEl.forEach(function (g) {
                var r = ror[+g.getAttribute('data-i')], k = g.getAttribute('data-k'), namn = NAMN[r.n];
                g.innerHTML = ikon(k, r);
                if (k === 'spela') {
                    g.setAttribute('aria-label', (r.igang ? 'Pausa vågen för ' : 'Starta vågen för ') + namn);
                    g.setAttribute('aria-pressed', r.igang ? 'true' : 'false');
                } else {
                    g.setAttribute('aria-label', (r.ljud ? 'Stäng av ljudet för ' : 'Sätt på ljudet för ') + namn);
                    g.setAttribute('aria-pressed', r.ljud ? 'false' : 'true');
                }
            });
        }

        function spela(r) {
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            if (ppSpelar && ppSpelar.r !== r) ppTysta(true);   // föregående rör tystnar
            if (ppSpelar) return;
            if (!ppActx) ppActx = new AC();
            if (ppActx.state === 'suspended') ppActx.resume();
            var t = ppActx.currentTime, g = ppActx.createGain(), os = [];
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.28, t + 0.06);
            g.connect(ppActx.destination);
            [[1, 1], [2, 0.18], [3, 0.08]].forEach(function (h) {
                var o = ppActx.createOscillator(), hg = ppActx.createGain();
                o.type = 'sine'; o.frequency.value = frekv(r.n) * h[0]; hg.gain.value = h[1];
                o.connect(hg); hg.connect(g); o.start(t); os.push(o);
            });
            ppSpelar = { r: r, g: g, o: os, knappar: knappar };
        }
        var loop = vgLoop(card, function (dt) {
            ror.forEach(function (r) { if (r.igang) r.tid += dt; });
            rita();
        });
        function tryck(g) {
            var r = ror[+g.getAttribute('data-i')], k = g.getAttribute('data-k');
            if (k === 'spela') {
                r.igang = !r.igang;
                if (r.igang && r.ljud) spela(r);
                else if (!r.igang && ppSpelar && ppSpelar.r === r) ppTysta(false);
            } else {
                r.ljud = !r.ljud;
                if (!r.ljud && ppSpelar && ppSpelar.r === r) ppTysta(false);
                else if (r.ljud && r.igang) spela(r);
            }
            loop.satt(ror.some(function (x) { return x.igang; }));
            knappar();
            rita();
        }
        knappEl.forEach(function (g) {
            g.addEventListener('click', function () { tryck(g); });
            g.addEventListener('keydown', function (e) {
                if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); tryck(g); }
            });
        });
        card._set = function (t) { ror.forEach(function (r) { r.igang = true; r.tid = t; }); knappar(); rita(); };
        knappar();
        rita();
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: provror
    // ══════════════════════════════════════════════════════════════════════
    // fy2-2.10, demonstrationen "Halvöppen pipa": man blåser över öppningen
    // på ett provrör (här genom ett sugrör) och grundtonen hörs. Luftpelaren är en halvöppen pipa
    // med buk i öppningen och nod vid botten (eller vattenytan), så
    // l = λ/4 och f = v/(4l) med v = 340 m/s. Röret är 16 cm; häller man i
    // vatten blir luftpelaren kortare och tonen högre. Man blåser så länge
    // knappen Blås (eller röret/sugröret) hålls nedtryckt. Ljudet är en sinuston
    // på f plus ett smalbandigt brus kring samma frekvens, så att det låter
    // luftigt som en flaska man blåser i.
    var prRaknare = 0;
    function buildProvror(node, cfg) {
        var INK = '#1f2530', BLA = '#2563c9', GLAS = '#7c8a99';
        var V = 340, L0 = 0.16, VMAX = 0.10;
        var RX = 290, RW = 40, TOP = 74, BOT = 274;           // röret: x-mitt, innerbredd, öppning, botten
        var PXM = 200 / L0;                                    // px per meter längs röret
        var vatten = 0, blaser = false, styrka = 0, tid = 0;
        var id = 'ms-pr-' + (++prRaknare);
        function fmt(v, d) { var s = v.toFixed(d); return parseFloat(s) === 0 ? '0' : s.replace('.', ','); }
        function it(t) { return '<tspan font-style="italic">' + t + '</tspan>'; }
        function lbl(x, y, anchor, inner, size, color, extra) {
            return '<text x="' + vgR1(x) + '" y="' + vgR1(y) + '" text-anchor="' + anchor + '" font-size="' +
                (size || 14) + '" fill="' + (color || INK) + '"' + (extra || '') + '>' + inner + '</text>';
        }
        function langd() { return L0 - vatten; }
        function frekv() { return V / (4 * langd()); }
        function ytaY() { return BOT - vatten * PXM; }

        var bas = vgRutnat(id, 0, 0, 660, 310);
        // ställ av trä
        bas += '<rect x="' + (RX - 70) + '" y="250" width="140" height="12" rx="3" fill="#c9965a" stroke="#8a6033" stroke-width="1.2"/>' +
            '<rect x="' + (RX - 70) + '" y="290" width="140" height="10" rx="3" fill="#b5834a" stroke="#8a6033" stroke-width="1.2"/>' +
            '<rect x="' + (RX - 64) + '" y="262" width="8" height="28" fill="#b5834a"/><rect x="' + (RX + 56) + '" y="262" width="8" height="28" fill="#b5834a"/>';
        // ett randigt sugrör som blåser luft rakt över öppningen
        var SX0 = 108, SX1 = RX - RW / 2 - 8, SY = 61, SR = 5.5;
        bas += '<defs><pattern id="' + id + '-rand" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">' +
            '<rect width="5" height="13" fill="#d0473d"/></pattern></defs>' +
            '<g transform="rotate(4 ' + SX1 + ' ' + SY + ')">' +
            '<rect x="' + SX0 + '" y="' + (SY - SR) + '" width="' + (SX1 - SX0) + '" height="' + (2 * SR) + '" rx="2" fill="#f4f1ea"/>' +
            '<rect x="' + SX0 + '" y="' + (SY - SR) + '" width="' + (SX1 - SX0) + '" height="' + (2 * SR) + '" rx="2" fill="url(#' + id + '-rand)" opacity="0.9"/>' +
            '<rect x="' + SX0 + '" y="' + (SY - SR) + '" width="' + (SX1 - SX0) + '" height="' + (2 * SR) + '" rx="2" fill="none" stroke="#8a6f66" stroke-width="1.2"/>' +
            '<ellipse cx="' + SX1 + '" cy="' + SY + '" rx="2.4" ry="' + (SR - 0.6) + '" fill="#5a4a46"/></g>';
        bas += lbl((SX0 + SX1) / 2, SY - 14, 'middle', 'sugrör', 12, '#6a7180');
        // panelens rubrik och formel med rakt bråkstreck
        var PX = 510;
        bas += lbl(PX, 50, 'middle', 'Halvöppen pipa', 13, '#6a7180', ' font-weight="600"');
        bas += lbl(PX, 74, 'middle', 'buk i öppningen, nod vid botten', 12, '#6a7180');
        bas += '<line x1="' + (PX + 2) + '" y1="110" x2="' + (PX + 16) + '" y2="110" stroke="' + INK + '" stroke-width="1.2"/>' +
            lbl(PX + 9, 105, 'middle', it('λ'), 16) + lbl(PX + 9, 126, 'middle', '4', 16) +
            lbl(PX - 2, 115.5, 'end', it('l') + ' = ', 16);

        function rita() {
            var s = '', yv = ytaY(), A = 15 * styrka, c = Math.cos(2 * Math.PI * 3 * tid);
            // vattnet
            if (vatten > 0.001) {
                s += '<path d="M ' + (RX - RW / 2) + ' ' + vgR1(yv) + ' L ' + (RX + RW / 2) + ' ' + vgR1(yv) + ' L ' + (RX + RW / 2) + ' ' + BOT +
                    ' A ' + (RW / 2) + ' ' + (RW / 2) + ' 0 0 1 ' + (RX - RW / 2) + ' ' + BOT + ' Z" fill="#9cc3ea" opacity="0.75"/>';
                s += '<line x1="' + (RX - RW / 2) + '" y1="' + vgR1(yv) + '" x2="' + (RX + RW / 2) + '" y2="' + vgR1(yv) + '" stroke="#5b8fc7" stroke-width="1.4"/>';
            }
            // stående våg i luftpelaren: buk i öppningen, nod vid botten/vattenytan
            if (styrka > 0.02) {
                var h = yv - TOP, hoger = [], vanster = [], lin = [];
                for (var k = 0; k <= 50; k++) {
                    var y = TOP + h * k / 50, e = A * Math.cos(Math.PI / 2 * k / 50);
                    hoger.push(vgR1(RX + e) + ',' + vgR1(y)); vanster.unshift(vgR1(RX - e) + ',' + vgR1(y));
                    lin.push(vgR1(RX + e * c) + ',' + vgR1(y));
                }
                s += '<polygon points="' + hoger.join(' ') + ' ' + vanster.join(' ') + '" fill="' + BLA + '" opacity="0.15"/>';
                s += '<polyline points="' + lin.join(' ') + '" fill="none" stroke="' + BLA + '" stroke-width="2.4"/>';
                s += '<circle cx="' + RX + '" cy="' + vgR1(yv) + '" r="2.8" fill="' + INK + '"/>';
                s += lbl(RX - RW / 2 - 8, TOP + 14, 'end', 'buk', 12, '#6a7180') + lbl(RX - RW / 2 - 8, yv - 2, 'end', 'nod', 12, '#6a7180');
            }
            // luftströmmen över öppningen
            if (styrka > 0.02) {
                for (var i = 0; i < 6; i++) {
                    var fas = (tid * 2.4 + i / 6) % 1, x0 = SX1 + 4 + fas * 120, yy = SY + 1 + ((i % 3) - 1) * 4 * (0.4 + fas) + fas * 4;
                    s += '<path d="M ' + vgR1(x0) + ' ' + vgR1(yy) + ' q 9 -3 18 0" fill="none" stroke="' + BLA + '" stroke-width="1.6" stroke-linecap="round" opacity="' +
                        vgR1(styrka * (1 - fas) * 0.8 * 100) / 100 + '"/>';
                }
            }
            // provröret av glas
            s += '<path d="M ' + (RX - RW / 2 - 3) + ' ' + (TOP - 4) + ' L ' + (RX - RW / 2) + ' ' + TOP + ' L ' + (RX - RW / 2) + ' ' + BOT +
                ' A ' + (RW / 2) + ' ' + (RW / 2) + ' 0 0 0 ' + (RX + RW / 2) + ' ' + BOT + ' L ' + (RX + RW / 2) + ' ' + TOP + ' L ' + (RX + RW / 2 + 3) + ' ' + (TOP - 4) +
                '" fill="none" stroke="' + GLAS + '" stroke-width="2.6" stroke-linejoin="round"/>' +
                '<line x1="' + (RX - RW / 2 + 6) + '" y1="' + (TOP + 10) + '" x2="' + (RX - RW / 2 + 6) + '" y2="' + (BOT - 6) + '" stroke="#ffffff" stroke-width="3" opacity="0.6" stroke-linecap="round"/>';
            // måttlinje för luftpelaren till höger om röret
            var mx = RX + RW / 2 + 26;
            s += '<line x1="' + (RX + RW / 2 + 6) + '" y1="' + TOP + '" x2="' + (mx + 6) + '" y2="' + TOP + '" stroke="#8a919b" stroke-width="1" stroke-dasharray="3 3"/>' +
                '<line x1="' + (RX + RW / 2 + 6) + '" y1="' + vgR1(yv) + '" x2="' + (mx + 6) + '" y2="' + vgR1(yv) + '" stroke="#8a919b" stroke-width="1" stroke-dasharray="3 3"/>';
            s += vgDubbelpil(mx, TOP, mx, yv, BLA);
            s += lbl(mx + 10, (TOP + yv) / 2 + 5, 'start', it('l') + ' = ' + fmt(langd() * 100, 0) + ' cm', 14, BLA, ' font-weight="600"');
            // avläsning i panelen
            s += lbl(PX, 162, 'middle', it('λ') + ' = 4 · ' + it('l') + ' = ' + fmt(4 * langd(), 2) + ' m', 15, INK);
            s += lbl(PX, 190, 'middle', it('f') + ' = ' + it('v') + '/' + it('λ') + ' = ' + fmt(frekv(), 0) + ' Hz', 17, styrka > 0.02 ? BLA : INK, ' font-weight="600"');
            s += lbl(PX, 226, 'middle', styrka > 0.02 ? 'Grundtonen hörs' : 'Håll in Blås', 14, '#6a7180', ' font-weight="600"');
            dyn.innerHTML = s;
        }

        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.innerHTML = '<svg class="ms-kv-svg" viewBox="40 10 620 295" width="620" height="295" ' +
            'xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" ' +
            'aria-label="Någon blåser genom ett sugrör över öppningen på ett provrör, och grundtonen hörs. I röret visas den stående vågen med buk i öppningen ' +
            'och nod vid botten. Häller man i vatten blir luftpelaren kortare och tonen högre.">' + bas + '<g class="ms-pr-dyn"></g></svg>';
        var svg = scene.querySelector('svg');
        var dyn = scene.querySelector('.ms-pr-dyn');
        card.appendChild(scene);
        msFullskarm(card, scene, 620 / 295, 130);

        var row = document.createElement('div');
        row.className = 'minisim-slider-row';
        var sLbl = document.createElement('span');
        sLbl.className = 'minisim-slider-lbl';
        sLbl.textContent = 'Vatten i röret';
        var sl = document.createElement('input');
        sl.type = 'range';
        sl.className = 'minisim-slider';
        sl.min = '0'; sl.max = String(VMAX * 100); sl.step = '0.5'; sl.value = '0';
        sl.setAttribute('aria-label', 'Vattnets höjd i röret i centimeter');
        var val = document.createElement('span');
        val.className = 'minisim-slider-val';
        row.appendChild(sLbl); row.appendChild(sl); row.appendChild(val);
        card.appendChild(row);

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var blasBtn = vgBtn('Håll in för att blåsa', 'ms-primar');
        blasBtn.style.touchAction = 'none';
        controls.appendChild(blasBtn);
        card.appendChild(controls);
        node.appendChild(card);

        // ── ljud ──────────────────────────────────────────────────────────
        var actx = null, tonG = null, osc = null, brusG = null, brusF = null;
        function startaLjud() {
            if (actx) { if (actx.state === 'suspended') actx.resume(); return; }
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            actx = new AC();
            var master = actx.createGain(); master.gain.value = 1; master.connect(actx.destination);
            tonG = actx.createGain(); tonG.gain.value = 0; tonG.connect(master);
            osc = actx.createOscillator(); osc.type = 'sine'; osc.frequency.value = frekv();
            osc.connect(tonG); osc.start();
            var len = actx.sampleRate * 2, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
            for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
            var src = actx.createBufferSource(); src.buffer = buf; src.loop = true;
            brusF = actx.createBiquadFilter(); brusF.type = 'bandpass'; brusF.frequency.value = frekv(); brusF.Q.value = 18;
            brusG = actx.createGain(); brusG.gain.value = 0;
            src.connect(brusF); brusF.connect(brusG); brusG.connect(master); src.start();
        }
        function ljudSteg() {
            if (!actx) return;
            var t = actx.currentTime, f = frekv();
            osc.frequency.setTargetAtTime(f * (1 + 0.003 * Math.sin(2 * Math.PI * 5 * tid)), t, 0.02);
            brusF.frequency.setTargetAtTime(f, t, 0.02);
            tonG.gain.setTargetAtTime(0.2 * styrka * styrka, t, 0.03);
            brusG.gain.setTargetAtTime(0.9 * styrka, t, 0.03);
        }
        function blas(v) { if (v) startaLjud(); blaser = v; blasBtn.classList.toggle('ms-primar', !v); }
        blasBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); blas(true); try { blasBtn.setPointerCapture(e.pointerId); } catch (er) {} });
        ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) { blasBtn.addEventListener(ev, function () { blas(false); }); });
        blasBtn.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); blas(true); } });
        blasBtn.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') blas(false); });
        // man kan också hålla in på sugröret eller röret
        svg.addEventListener('pointerdown', function (e) {
            var r = svg.getBoundingClientRect(), vb = svg.viewBox.baseVal;
            var x = vb.x + (e.clientX - r.left) / r.width * vb.width;
            if (x > 420) return;
            blas(true);
            try { svg.setPointerCapture(e.pointerId); } catch (er) {}
        });
        ['pointerup', 'pointercancel'].forEach(function (ev) { svg.addEventListener(ev, function () { blas(false); }); });
        svg.style.touchAction = 'pan-y';
        sl.addEventListener('input', function () { vatten = parseFloat(sl.value) / 100; visaVal(); rita(); });
        function visaVal() { val.textContent = fmt(vatten * 100, 1) + ' cm'; }

        var loop = vgLoop(card, function (dt) {
            tid += dt;
            styrka += ((blaser ? 1 : 0) - styrka) * Math.min(1, dt * (blaser ? 9 : 6));
            if (styrka < 0.002) styrka = 0;
            ljudSteg();
            rita();
        });
        card._set = function (v, st) { vatten = v; styrka = st; tid = 0.1; sl.value = String(v * 100); visaVal(); rita(); };
        visaVal();
        rita();
        loop.satt(true);
    }

    // ─────────────────────────────────────────────────────────────────────
    //  Värmeledning: "Känslan av värme" och "Smältrace" (fy1-6.1)
    // ─────────────────────────────────────────────────────────────────────
    //  Ritas på canvas i blå kulspets på rutat papper, samma stil som de egna
    //  animationerna i Labbfolket-filmen "Plåten som känns kallare". Verktygen
    //  nedan delas av de två typerna.
    function kvVerktyg(x) {
        var BLA = '#2b5ca8', INK = '#0f1620', ROD = '#c8324a', GRA = '#3f4a5c';
        var HUD = '#fbf3e6', VIT = '#ffffff', LJBLA = '#e3edf7', LJBLA2 = '#cfdeee', TRA = '#f6ebd5';
        var FONT = 'Poppins, system-ui, sans-serif';
        function slump(fro) { var a = fro >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
        function klamp(u) { return Math.min(1, Math.max(0, u)); }
        function mjuk(u) { return u * u * (3 - 2 * u); }
        function lerp(a, b, u) { return a + (b - a) * u; }
        // kulspetslinje: huvudstreck och ett tunt, lätt förskjutet andra drag
        function blak(p, w, col, alfa) {
            x.save(); x.globalAlpha *= (alfa === undefined ? 1 : alfa);
            x.strokeStyle = col || BLA; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; x.stroke(p);
            x.globalAlpha *= 0.32; x.lineWidth = w * 0.55; x.translate(0.7, 0.45); x.stroke(p);
            x.restore();
        }
        function fyll(p, col, alfa) { x.save(); x.globalAlpha *= (alfa === undefined ? 1 : alfa); x.fillStyle = col; x.fill(p); x.restore(); }
        function skraff(p, vinkel, steg, col, w, alfa, bbox) {
            var x0 = bbox[0], y0 = bbox[1], x1 = bbox[2], y1 = bbox[3];
            x.save(); x.clip(p); x.strokeStyle = col; x.lineWidth = w; x.globalAlpha *= alfa;
            var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) / 2 + 10;
            var ux = Math.cos(vinkel), uy = Math.sin(vinkel), nx = -uy, ny = ux;
            x.beginPath();
            for (var s = -R; s <= R; s += steg) { x.moveTo(cx + nx * s - ux * R, cy + ny * s - uy * R); x.lineTo(cx + nx * s + ux * R, cy + ny * s + uy * R); }
            x.stroke(); x.restore();
        }
        function poly(pts, oppen) { var p = new Path2D(); pts.forEach(function (q, i) { if (i) p.lineTo(q[0], q[1]); else p.moveTo(q[0], q[1]); }); if (!oppen) p.closePath(); return p; }
        function rundPoly(pts, r) {
            var p = new Path2D(), n = pts.length;
            var s = [(pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2]; p.moveTo(s[0], s[1]);
            for (var i = 0; i < n; i++) { var a = pts[i], b = pts[(i + 1) % n]; p.arcTo(a[0], a[1], b[0], b[1], r); }
            p.closePath(); return p;
        }
        function text(s, px, py, size, col, align, vikt) {
            x.font = (vikt || 600) + ' ' + size + 'px ' + FONT; x.fillStyle = col || INK; x.textAlign = align || 'center'; x.textBaseline = 'alphabetic';
            x.fillText(s, px, py);
        }
        function papper(W, H) {
            var gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#f7f2e8'); gr.addColorStop(1, '#ece3d2');
            x.fillStyle = gr; x.fillRect(0, 0, W, H);
            x.strokeStyle = 'rgba(147,174,199,.45)'; x.lineWidth = 1;
            x.beginPath();
            for (var i = 0; i <= H; i += 25) { x.moveTo(0, i + 0.5); x.lineTo(W, i + 0.5); }
            for (var j = 0; j <= W; j += 25) { x.moveTo(j + 0.5, 0); x.lineTo(j + 0.5, H); }
            x.stroke();
            var r = slump(7); x.fillStyle = 'rgba(120,100,70,.05)';
            for (var k = 0; k < W * H / 1400; k++) x.fillRect(r() * W, r() * H, 2, 2);
        }
        // böjd värmepil med huvud (k skalar pilen)
        function vagPil(x0, y0, x1, y1, amp, u, col, w, k) {
            if (u <= 0) return;
            var pts = [];
            for (var i = 0; i <= 30; i++) { var s = i / 30; pts.push([lerp(x0, x1, s) + amp * Math.sin(s * Math.PI * 2.5), lerp(y0, y1, s)]); }
            var n = Math.max(2, Math.round(pts.length * u)), del = pts.slice(0, n);
            blak(poly(del, true), w, col);
            var a = del[del.length - 2], b = del[del.length - 1];
            var L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])) || 1, ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, h = 26 * k, bb = 15 * k;
            fyll(poly([[b[0] + ux * 8 * k, b[1] + uy * 8 * k], [b[0] - ux * h - uy * bb, b[1] - uy * h + ux * bb], [b[0] - ux * h + uy * bb, b[1] - uy * h - ux * bb]]), col);
        }
        // Handen från sidan, platt liggande. Handloven i (x0, Y0), handflatan
        // vilar på linjen y = Y0. hud (0 = sval, 1 = varm) färgar handflatan.
        function hand(x0, Y0, s, lyft, hud) {
            var l = lyft;
            x.save(); x.translate(x0, Y0); x.scale(s, s);
            function lw(v) { return v / s; }
            var kropp = new Path2D();
            kropp.moveTo(-360, -230 * l); kropp.quadraticCurveTo(-160, -60 * l, -22, -7); kropp.quadraticCurveTo(-6, 0, 20, 0);
            kropp.lineTo(398, 0); kropp.bezierCurveTo(428, 0, 442, -12, 433, -25);
            kropp.quadraticCurveTo(382, -42, 302, -55); kropp.quadraticCurveTo(266, -73, 228, -79);
            kropp.quadraticCurveTo(128, -100, 42, -101); kropp.quadraticCurveTo(-130, -100 - 90 * l, -330, -101 - 249 * l);
            kropp.closePath();
            fyll(kropp, HUD);
            x.save(); x.clip(kropp);
            if (hud !== undefined) {
                // hudens temperatur: varm ton som blir blå när huden svalnar
                var gr = x.createLinearGradient(0, 0, 0, -120);
                var rr = Math.round(lerp(43, 214, hud)), gg = Math.round(lerp(92, 96, hud)), bl = Math.round(lerp(168, 70, hud));
                var a0 = 0.18 + 0.32 * Math.abs(hud - 0.5) * 2;
                gr.addColorStop(0, 'rgba(' + rr + ',' + gg + ',' + bl + ',' + a0.toFixed(3) + ')');
                gr.addColorStop(1, 'rgba(' + rr + ',' + gg + ',' + bl + ',0)');
                x.fillStyle = gr; x.fillRect(-60, -130, 520, 135);
            }
            var sk = new Path2D(); sk.moveTo(-360, -150 * l); sk.quadraticCurveTo(-150, -20 * l, 30, -18); sk.lineTo(420, -10); sk.lineTo(420, 10); sk.lineTo(-360, 10); sk.closePath();
            skraff(sk, -0.7, 9, BLA, lw(1.1), 0.45, [-400, -400, 460, 20]);
            x.restore();
            blak(kropp, lw(2.6), BLA);
            var tum = new Path2D();
            tum.moveTo(66, -62); tum.quadraticCurveTo(150, -60, 226, -42); tum.bezierCurveTo(252, -36, 254, -14, 233, -10);
            tum.quadraticCurveTo(160, -12, 88, -28); tum.quadraticCurveTo(70, -40, 66, -62); tum.closePath();
            fyll(tum, HUD); blak(tum, lw(2.3), BLA);
            var nagel = new Path2D(); nagel.moveTo(222, -34); nagel.quadraticCurveTo(240, -32, 241, -18); blak(nagel, lw(1.7), BLA);
            var fl = new Path2D();
            fl.moveTo(298, -36); fl.quadraticCurveTo(360, -30, 418, -22);
            fl.moveTo(312, -20); fl.quadraticCurveTo(370, -14, 404, -10);
            fl.moveTo(414, -30); fl.quadraticCurveTo(430, -28, 431, -17);
            fl.moveTo(242, -70); fl.quadraticCurveTo(250, -62, 262, -66);
            fl.moveTo(272, -63); fl.quadraticCurveTo(280, -56, 292, -59);
            blak(fl, lw(1.7), BLA);
            // ärmen: uppkavlad labbrock
            var W = [-8, -52], E = [-330, -52 - 238 * l], L = Math.sqrt((E[0] - W[0]) * (E[0] - W[0]) + (E[1] - W[1]) * (E[1] - W[1]));
            var u = [(E[0] - W[0]) / L, (E[1] - W[1]) / L], n = [-u[1], u[0]];
            function pt(d, b) { return [W[0] + u[0] * d + n[0] * b, W[1] + u[1] * d + n[1] * b]; }
            var arm = poly([pt(205, -70), pt(205, 66), pt(620, 120), pt(620, -120)]);
            fyll(arm, VIT); blak(arm, lw(2.6), BLA);
            var rull = rundPoly([pt(188, -76), pt(188, 72), pt(250, 82), pt(250, -86)], 14);
            fyll(rull, VIT); blak(rull, lw(2.6), BLA);
            var veck = new Path2D();
            [[206, -60, 214, 40], [226, -70, 232, 58], [300, -90, 330, 20], [360, -60, 410, 70]].forEach(function (v) {
                var p1 = pt(v[0], v[1]), p2 = pt(v[2], v[3]);
                veck.moveTo(p1[0], p1[1]); veck.quadraticCurveTo((p1[0] + p2[0]) / 2 + 6, (p1[1] + p2[1]) / 2, p2[0], p2[1]);
            });
            blak(veck, lw(1.5), BLA, 0.7);
            x.restore();
            return [x0 + 20 * s, x0 + 400 * s];
        }
        return { BLA: BLA, INK: INK, ROD: ROD, GRA: GRA, VIT: VIT, LJBLA: LJBLA, LJBLA2: LJBLA2, TRA: TRA,
                 slump: slump, klamp: klamp, mjuk: mjuk, lerp: lerp, blak: blak, fyll: fyll, skraff: skraff,
                 poly: poly, rundPoly: rundPoly, text: text, papper: papper, vagPil: vagPil, hand: hand };
    }
    // Kort med en canvas i logiska mått W × H (skalas med CSS, ritas skarpt)
    function kvKort(node, cfg, W, H, aria) {
        var card = document.createElement('div');
        card.className = 'minisim-card ms-ljus ms-bred';
        if (cfg.titel) {
            var tEl = document.createElement('div');
            tEl.className = 'minisim-title';
            tEl.textContent = cfg.titel;
            card.appendChild(tEl);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene ms-kv-scene';
        scene.style.padding = '0';
        var cv = document.createElement('canvas');
        var R = 1.6;
        cv.width = Math.round(W * R); cv.height = Math.round(H * R);
        cv.className = 'ms-kv-svg';
        cv.style.maxWidth = '664px';
        cv.setAttribute('role', 'img');
        cv.setAttribute('aria-label', aria);
        scene.appendChild(cv);
        card.appendChild(scene);
        msFullskarm(card, scene, W / H, 110);
        var x = cv.getContext('2d');
        x.setTransform(R, 0, 0, R, 0, 0);
        // logiska koordinater ur en pekarhändelse
        function punkt(e) {
            var r = cv.getBoundingClientRect();
            return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H];
        }
        return { card: card, scene: scene, cv: cv, x: x, punkt: punkt };
    }
    function kvFmt(v, d) { var s = v.toFixed(d); return parseFloat(s) === 0 ? '0' : s.replace('.', ','); }

    //  typ: varmekansla
    //  Handen läggs på en aluminiumplatta och en plastplatta, båda 20 °C, i
    //  genomskärning. Handens hud har 25 °C (som i genomgången). Två kroppar
    //  med olika temperatur som läggs mot varandra får en kontakttemperatur
    //      T_k = (e_hud · T_hud + e_platta · T_platta) / (e_hud + e_platta)
    //  där e = √(λ · ρ · c) är värmeinträngningstalet: hud cirka 1 100,
    //  aluminium 24 000 (λ 237 W/(m·K), ρ 2 700 kg/m³, c 900 J/(kg·K)) och
    //  plast cirka 570 (λ 0,19, ρ 1 300, c 1 300). Huden svalnar alltså till
    //  20,2 °C på aluminiumet men bara till 23,3 °C på plasten. Värmen som
    //  lämnat en handflata på 50 cm² efter tiden t är
    //      Q = 2 · ΔT · e_eff · √(t / π) · A,  e_eff = e_hud · e_p / (e_hud + e_p)
    //  Varje röd prick är ett värmepaket; de släpps i takt med värmeflödet
    //  (proportionellt mot e_eff / √t) och vandrar slumpmässigt i plattan med
    //  plattans temperaturledningstal (aluminium 97 mm²/s, plast 0,11 mm²/s)
    //  i tvärsnittets förstoring, 10 px per mm.
    function buildVarmekansla(node, cfg) {
        // smal skärm: plattorna under varandra i stället för bredvid
        var smal = (node.getBoundingClientRect().width || 664) < 520;
        var W = smal ? 500 : 1000, H = smal ? 1140 : 600;
        var K = kvKort(node, cfg, W, H, 'Två händer läggs på en aluminiumplatta och en plastplatta som båda har temperaturen 20 grader. ' +
            'Röda prickar visar värmen som strömmar från handen in i plattan. Aluminiumet leder bort värmen snabbt och sprider den, ' +
            'och huden svalnar till drygt 20 grader. Plasten leder värmen långsamt, och huden håller nästan 23 grader.');
        var x = K.x, V = kvVerktyg(x);
        var T_HUD = 25, T_PL = 20, E_HUD = 1100, AREA = 0.005, SKALA = 0.74, PT = 360, PB = 440;
        var kol = [
            { x0: 0, namn: 'Aluminiumplatta', e: 24000, D: 97 * 100, liv: 2.6 },
            { x0: 500, namn: 'Plastplatta', e: 570, D: 0.11 * 100, liv: 5 }
        ];
        kol.forEach(function (k) {
            k.eff = E_HUD * k.e / (E_HUD + k.e);
            k.Tk = (E_HUD * T_HUD + k.e * T_PL) / (E_HUD + k.e);
            k.ned = 0; k.mal = 0; k.tk = 0; k.hud = T_HUD; k.Q = 0; k.prickar = []; k.skuld = 0;
            k.HX = k.x0 + 78; k.PX0 = k.x0 + 24; k.PX1 = k.x0 + 476;
        });
        // varje platta ritas i sina egna koordinater och flyttas på plats
        function flytta(c, i) { if (smal) c.translate(-kol[i].x0, i === 0 ? -10 : 560); }
        // det som aldrig ändras ritas en gång
        var bg = document.createElement('canvas'); bg.width = K.cv.width; bg.height = K.cv.height;
        (function () {
            var bx = bg.getContext('2d'); bx.setTransform(K.cv.width / W, 0, 0, K.cv.height / H, 0, 0);
            var B = kvVerktyg(bx);
            B.papper(W, H);
            kol.forEach(function (k, i) {
                bx.save(); flytta(bx, i);
                // bänken
                var bk = new Path2D(); bk.rect(k.x0, PB, 500, 42); B.fyll(bk, B.TRA);
                B.skraff(bk, -0.75, 12, B.BLA, 1.1, 0.35, [k.x0, PB, k.x0 + 500, PB + 42]);
                var bl = new Path2D(); bl.moveTo(k.x0, PB + 42); bl.lineTo(k.x0 + 500, PB + 42); B.blak(bl, 2.6, B.BLA);
                var p = new Path2D(); p.rect(k.PX0, PT, k.PX1 - k.PX0, PB - PT);
                if (i === 0) {
                    B.fyll(p, B.LJBLA); B.skraff(p, -0.785, 14, B.BLA, 1.3, 0.5, [k.PX0, PT, k.PX1, PB]);
                } else {
                    B.fyll(p, '#e4f1e9');
                    B.skraff(p, -0.785, 22, '#3a7d5c', 1.1, 0.35, [k.PX0, PT, k.PX1, PB]);
                    B.skraff(p, 0.785, 22, '#3a7d5c', 1.1, 0.35, [k.PX0, PT, k.PX1, PB]);
                }
                B.blak(p, 3, B.BLA);
                B.text(k.namn, k.x0 + 250, 46, 30, B.INK, 'center', 700);
                B.text('20 °C från början', k.x0 + 250, 78, 21, B.GRA, 'center', 500);
                bx.restore();
            });
            var mitt = new Path2D();
            if (smal) { mitt.moveTo(30, 572); mitt.lineTo(470, 572); } else { mitt.moveTo(500, 100); mitt.lineTo(500, PT - 20); }
            B.blak(mitt, 1.6, B.BLA, 0.35);
        })();

        function gauss() { var u = Math.random() || 1e-9, v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
        function steg(dt) {
            kol.forEach(function (k) {
                var fart = 2.2;
                k.ned = V.klamp(k.ned + (k.mal ? 1 : -1) * dt * fart);
                var kontakt = k.ned >= 1;
                if (kontakt) {
                    k.tk += dt;
                    // huden närmar sig kontakttemperaturen (kort tidskonstant)
                    k.hud += (k.Tk - k.hud) * Math.min(1, dt / 0.25);
                    k.Q = 2 * (T_HUD - T_PL) * k.eff * Math.sqrt(k.tk / Math.PI) * AREA;
                    var takt = 0.0285 * k.eff / Math.sqrt(Math.max(0.2, k.tk));
                    k.skuld += takt * dt;
                    var x0 = k.HX + 20 * SKALA + 8, x1 = k.HX + 400 * SKALA - 8;
                    while (k.skuld >= 1) { k.skuld -= 1; k.prickar.push({ x: V.lerp(x0, x1, Math.random()), y: PT + 6, a: 0 }); }
                } else {
                    k.hud += (T_HUD - k.hud) * Math.min(1, dt / 2.5);
                }
                var sd = Math.sqrt(2 * k.D * dt);
                k.prickar.forEach(function (p) {
                    p.a += dt;
                    p.x += sd * gauss(); p.y += sd * gauss();
                    if (p.x < k.PX0 + 7) p.x = 2 * (k.PX0 + 7) - p.x;
                    if (p.x > k.PX1 - 7) p.x = 2 * (k.PX1 - 7) - p.x;
                    if (p.y < PT + 6) p.y = 2 * (PT + 6) - p.y;
                    if (p.y > PB - 7) p.y = 2 * (PB - 7) - p.y;
                    p.x = Math.min(k.PX1 - 7, Math.max(k.PX0 + 7, p.x)); p.y = Math.min(PB - 7, Math.max(PT + 6, p.y));
                });
                k.prickar = k.prickar.filter(function (p) { return p.a < k.liv; });
            });
        }
        function rita() {
            x.setTransform(1, 0, 0, 1, 0, 0);
            x.drawImage(bg, 0, 0);
            x.setTransform(K.cv.width / W, 0, 0, K.cv.height / H, 0, 0);
            kol.forEach(function (k, i) {
                x.save(); flytta(x, i);
                // värmepaketen i plattan
                k.prickar.forEach(function (p) {
                    x.save(); x.globalAlpha = Math.min(1, p.a * 6) * (1 - V.mjuk(V.klamp((p.a - k.liv * 0.65) / (k.liv * 0.35))));
                    var d = new Path2D(); d.arc(p.x, p.y, 5, 0, 7); V.fyll(d, V.ROD); V.blak(d, 1.3, V.INK, 0.8); x.restore();
                });
                var lyft = 85 * (1 - V.mjuk(k.ned)), Y0 = PT - lyft;
                x.save(); var cl = new Path2D(); cl.rect(k.x0 + 2, 90, 496, PB - 90); x.clip(cl);
                var hudU = V.klamp((k.hud - T_PL) / (T_HUD - T_PL));
                V.hand(k.HX, Y0, SKALA, 0.55, hudU);
                x.restore();
                // värmepilar genom handflatan, starkare när flödet är stort
                if (k.ned >= 1) {
                    var styrka = Math.min(1, k.eff / 1052 / Math.sqrt(Math.max(0.3, k.tk / 2)));
                    x.save(); x.globalAlpha = 0.35 + 0.65 * styrka;
                    [k.HX + 85, k.HX + 180].forEach(function (px, j) {
                        V.vagPil(px, Y0 - 92, px, Y0 + 10, 5, V.mjuk(V.klamp(k.tk * 2.5 - j * 0.3)), V.ROD, 2.2 + 3.2 * styrka, 0.42);
                    });
                    x.restore();
                }
                // ledtext när handen är lyft
                if (k.ned <= 0 && !k.mal) {
                    V.text('Klicka för att', k.x0 + 432, 314, 19, V.GRA, 'center', 600);
                    V.text('lägga handen', k.x0 + 432, 338, 19, V.GRA, 'center', 600);
                }
                // avläsningar under bänken
                var drop = T_HUD - k.hud, kansla = drop > 3 ? 'känns kall' : (drop > 1 ? 'känns sval' : '');
                var hudCol = drop > 1 ? (drop > 3 ? V.BLA : '#5b6fa0') : V.INK;
                V.text('Huden ' + kvFmt(k.hud, 1) + ' °C' + (kansla ? ', ' + kansla : ''), k.x0 + 250, 528, 27, hudCol, 'center', 700);
                V.text('Värme från handen: ' + kvFmt(k.Q, 0) + ' J', k.x0 + 250, 566, 23, V.GRA, 'center', 600);
                x.restore();
            });
        }

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var bada = vgBtn('Lägg båda händerna', 'ms-primar');
        var om = vgBtn('Börja om');
        controls.appendChild(bada); controls.appendChild(om);
        K.card.appendChild(controls);
        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod';
        info.textContent = 'Händerna har 25 °C och plattorna 20 °C. Varje röd prick är ett paket värme som lämnar handen.';
        K.card.appendChild(info);
        node.appendChild(K.card);

        function etikett() { bada.textContent = (kol[0].mal && kol[1].mal) ? 'Lyft båda händerna' : 'Lägg båda händerna'; }
        function satt(k, v) { if (v && !k.mal) { k.tk = 0; k.Q = 0; k.skuld = 0; } k.mal = v ? 1 : 0; }
        bada.addEventListener('click', function () {
            var ned = !(kol[0].mal && kol[1].mal);
            kol.forEach(function (k) { satt(k, ned); }); etikett();
        });
        om.addEventListener('click', function () {
            kol.forEach(function (k) { k.mal = 0; k.ned = 0; k.tk = 0; k.Q = 0; k.hud = T_HUD; k.prickar = []; k.skuld = 0; }); etikett(); rita();
        });
        K.cv.addEventListener('click', function (e) {
            var p = K.punkt(e), k = kol[(smal ? p[1] < 570 : p[0] < 500) ? 0 : 1];
            satt(k, !k.mal); etikett();
        });
        K.cv.style.cursor = 'pointer';
        var loop = vgLoop(K.card, function (dt) { steg(dt); rita(); });
        K.card._set = function (ned, t) {
            kol.forEach(function (k) { satt(k, ned); });
            for (var i = 0; i < Math.round(t * 30); i++) steg(1 / 30);
            etikett(); rita();
        };
        rita();
        loop.satt(true);
    }

    //  typ: smaltrace
    //  En isbit (2 cm, 0 °C, 7,3 g) på en aluminiumplatta och en på en
    //  plastplatta, båda 20 °C. Isen smälter av värmen som leds upp från
    //  plattan och av luften runt om (värmeövergångstal 12 W/(m²·K), luftens
    //  strömning och strålningen tillsammans). Aluminiumplattan (15 × 15 × 1 cm,
    //  546 J/K) räknas som en kropp med en enda temperatur: den leder värme
    //  till isen genom den tunna vattenfilmen under biten (8 000 W/(m²·K)) och
    //  svalnar lite på köpet. Plasten leder så dåligt att bara ett tunt skikt
    //  under isen hinner ge ifrån sig värme:
    //      P = ΔT · e_plast · A / √(π · t),  e_plast ≈ 570
    //  Smältvattnet breder ut sig som en pöl (1 mm djup) och hämtar värme från
    //  luften och plattan över hela sin yta (12 + 15 W/(m²·K)), som det lämnar
    //  vidare till isen. Smältvärmet är 334 J/g. Isen på aluminiumet är borta
    //  efter cirka 1,4 minuter, på plasten efter cirka 21 minuter, i nivå med
    //  klassrumsförsöket. Klockan visar den simulerade tiden; den går fem
    //  gånger fortare än verkligheten (40 gånger med Snabbspola).
    function buildSmaltrace(node, cfg) {
        var smal = (node.getBoundingClientRect().width || 664) < 520;
        var W = smal ? 500 : 1000, H = smal ? 815 : 600;
        var K = kvKort(node, cfg, W, H, 'En isbit ligger på en aluminiumplatta och en annan på en plastplatta, båda med rumstemperatur. ' +
            'Ett stoppur visar tiden. Isbiten på aluminiumet smälter på en och en halv minut till en vattenpöl, medan isbiten på plasten håller i ungefär tjugo minuter.');
        var x = K.x, V = kvVerktyg(x);
        var M0 = 917 * 8e-6 * 1000, LS = 334, S0 = 0.02, H_LUFT = 12, H_POL = 15, FILM = 0.001, H_KONT = 8000, C_AL = 546, G_LUFT_AL = 0.3, E_PL = 570;
        var OY = 450, PH = 22;
        var plattor = [
            { ox: 30, namn: 'Aluminiumplatta', al: true },
            { ox: 520, namn: 'Plastplatta', al: false }
        ];
        var tid = 0, gar = false, snabb = false;
        function nollstall() {
            tid = 0; gar = false;
            plattor.forEach(function (p) { p.m = M0; p.T = 20; p.P = 0; p.klar = null; p.prickar = []; p.skuld = 0; });
        }
        nollstall();
        function P3(p, X, Z, Hh) { return [p.ox + X + Z * 0.4, OY - Z * 0.42 - Hh]; }
        // smal skärm: plattorna under varandra, var och en med sin bänk
        function flytta(c, i) { if (smal) c.translate(30 - plattor[i].ox, i === 0 ? -55 : 235); }
        function bank(B, x0, x1) {
            var bak = new Path2D(); bak.moveTo(x0, OY - 150); bak.lineTo(x1, OY - 150); B.blak(bak, 2, B.BLA, 0.45);
            var fr = new Path2D(); fr.rect(x0, OY + 4, x1 - x0, 34); B.fyll(fr, B.LJBLA, 0.6);
            B.skraff(fr, -0.8, 10, B.BLA, 1.1, 0.35, [x0, OY, x1, OY + 40]);
            var fk = new Path2D(); fk.moveTo(x0, OY + 4); fk.lineTo(x1, OY + 4); fk.moveTo(x0, OY + 38); fk.lineTo(x1, OY + 38); B.blak(fk, 2.4, B.BLA);
        }

        var bg = document.createElement('canvas'); bg.width = K.cv.width; bg.height = K.cv.height;
        (function () {
            var bx = bg.getContext('2d'); bx.setTransform(K.cv.width / W, 0, 0, K.cv.height / H, 0, 0);
            var B = kvVerktyg(bx);
            B.papper(W, H);
            if (!smal) bank(B, 0, W);
            plattor.forEach(function (p, i) {
                bx.save(); flytta(bx, i);
                if (smal) bank(B, p.ox - 30, p.ox + 470);
                function Q(X, Z, Hh) { return [p.ox + X + Z * 0.4, OY - Z * 0.42 - Hh]; }
                var X1 = 340, Z1 = 230;
                // skugga på bänken
                var sk = B.poly([Q(X1, 0, 0), Q(X1 + 26, 18, 0), Q(X1 + 26, Z1 + 8, 0), Q(20, Z1 + 8, 0), Q(0, Z1, 0)]);
                B.skraff(sk, 0.9, 7, B.BLA, 1.1, 0.35, [p.ox - 10, OY - 140, p.ox + 480, OY + 4]);
                var f = B.poly([Q(0, 0, 0), Q(X1, 0, 0), Q(X1, 0, PH), Q(0, 0, PH)]);
                var s = B.poly([Q(X1, 0, 0), Q(X1, Z1, 0), Q(X1, Z1, PH), Q(X1, 0, PH)]);
                var t = B.poly([Q(0, 0, PH), Q(X1, 0, PH), Q(X1, Z1, PH), Q(0, Z1, PH)]);
                if (p.al) {
                    B.fyll(s, '#bcd0e6'); B.fyll(f, B.LJBLA2); B.fyll(t, B.LJBLA);
                    var gl = new Path2D(), r = B.slump(3);
                    for (var k = 0; k < 6; k++) { var a = Q(40 + k * 50 + r() * 10, 30, PH), b = Q(70 + k * 50 + r() * 10, 190, PH); gl.moveTo(a[0], a[1]); gl.lineTo(b[0], b[1]); }
                    bx.save(); bx.strokeStyle = '#ffffff'; bx.lineWidth = 5; bx.globalAlpha = 0.85; bx.stroke(gl); bx.restore();
                    var gl2 = new Path2D(); for (var k2 = 0; k2 < 4; k2++) { var a2 = Q(60 + k2 * 75, 50, PH), b2 = Q(85 + k2 * 75, 160, PH); gl2.moveTo(a2[0], a2[1]); gl2.lineTo(b2[0], b2[1]); }
                    B.blak(gl2, 1.2, B.BLA, 0.45);
                    B.skraff(f, -0.785, 9, B.BLA, 1, 0.45, [p.ox, OY - 30, p.ox + 350, OY]);
                } else {
                    B.fyll(s, '#c6ddd0'); B.fyll(f, '#d6e9de'); B.fyll(t, '#e8f3ec');
                    var sh = new Path2D(); var a3 = Q(30, 200, PH), b3 = Q(300, 200, PH); sh.moveTo(a3[0], a3[1]); sh.lineTo(b3[0], b3[1]);
                    bx.save(); bx.strokeStyle = '#ffffff'; bx.lineWidth = 6; bx.globalAlpha = 0.7; bx.stroke(sh); bx.restore();
                    B.skraff(f, -0.785, 12, '#3a7d5c', 1, 0.35, [p.ox, OY - 30, p.ox + 350, OY]);
                    B.skraff(f, 0.785, 12, '#3a7d5c', 1, 0.35, [p.ox, OY - 30, p.ox + 350, OY]);
                }
                B.blak(t, 2.6, B.BLA); B.blak(f, 2.3, B.BLA); B.blak(s, 2.3, B.BLA);
                B.text(p.namn, p.ox + 215, OY + 82, 28, B.INK, 'center', 700);
                bx.restore();
            });
        })();

        function steg(dts) {
            tid += dts;
            plattor.forEach(function (p) {
                if (p.m <= 0) { p.P = 0; return; }
                var s = S0 * Math.pow(p.m / M0, 1 / 3), A = s * s, Pplatta;
                if (p.al) {
                    Pplatta = H_KONT * A * p.T;
                    p.T += (-Pplatta + G_LUFT_AL * (20 - p.T)) * dts / C_AL;
                } else {
                    Pplatta = 20 * E_PL * A / Math.sqrt(Math.PI * Math.max(tid, 1));
                }
                var Pluft = H_LUFT * 5 * A * 20;
                var Ppol = (H_LUFT + H_POL) * (M0 - p.m) / 1e6 / FILM * 20;
                p.P = Pplatta;
                p.m -= (Pplatta + Pluft + Ppol) * dts / LS;
                if (p.m <= 0.01 * M0) { p.m = 0; p.klar = tid; }
            });
        }
        function tidText(t) {
            var m = Math.floor(t / 60), s = Math.floor(t - 60 * m);
            if (m >= 60) { var h = Math.floor(m / 60); return h + ' h ' + (m - 60 * h) + ' min'; }
            return m + ' min ' + (s < 10 ? '0' : '') + s + ' s';
        }
        function isbit(p, f) {
            var X = 175, Z = 115, Hh = PH, S = 108;
            var w = S * (0.55 + 0.45 * Math.sqrt(f)), h = S * 0.62 * f, d = S * (0.55 + 0.45 * Math.sqrt(f));
            var c = P3(p, X, Z, Hh), R = 26 + 74 * (1 - f);
            if (1 - f > 0.01) {
                var pol = new Path2D(); pol.ellipse(c[0] + 4, c[1] - 2, R * 1.15, R * 0.5, -0.08, 0, 7);
                V.fyll(pol, '#d9e8f6', 0.9); V.blak(pol, 2, V.BLA, 0.8);
                var gl = new Path2D(); gl.ellipse(c[0] - R * 0.35, c[1] - R * 0.15, R * 0.4, R * 0.12, -0.1, Math.PI * 1.1, Math.PI * 1.7);
                x.save(); x.strokeStyle = '#ffffff'; x.lineWidth = 3.5; x.stroke(gl); x.restore();
            }
            if (f <= 0.005) return;
            var r = Math.max(1, Math.min(4 + 10 * (1 - f), h * 0.28, w * 0.18));
            var X0 = X - w / 2, X1 = X + w / 2, Z0 = Z - d / 2, Z1 = Z + d / 2;
            var fr = V.rundPoly([P3(p, X0, Z0, Hh), P3(p, X1, Z0, Hh), P3(p, X1, Z0, Hh + h), P3(p, X0, Z0, Hh + h)], r);
            var si = V.rundPoly([P3(p, X1, Z0, Hh), P3(p, X1, Z1, Hh), P3(p, X1, Z1, Hh + h), P3(p, X1, Z0, Hh + h)], r * 0.6);
            var to = V.rundPoly([P3(p, X0, Z0, Hh + h), P3(p, X1, Z0, Hh + h), P3(p, X1, Z1, Hh + h), P3(p, X0, Z1, Hh + h)], r * 0.8);
            V.fyll(si, '#c9dcef'); V.fyll(fr, '#dceaf7'); V.fyll(to, '#f1f7fd');
            V.blak(si, 2.3, V.BLA); V.blak(fr, 2.3, V.BLA); V.blak(to, 2.3, V.BLA);
            var a = P3(p, X0 + w * 0.18, Z0, Hh + h * 0.75), b = P3(p, X0 + w * 0.18, Z0, Hh + h * 0.3);
            x.save(); x.strokeStyle = '#ffffff'; x.lineWidth = 4.5; x.lineCap = 'round'; x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(b[0], b[1]); x.stroke(); x.restore();
            var bb = P3(p, X0 + w * 0.65, Z0, Hh + h * 0.55); var bl = new Path2D(); bl.arc(bb[0], bb[1], 4 * Math.sqrt(f), 0, 7); V.blak(bl, 1.4, V.BLA, 0.6);
            if (f < 0.97) {
                var dd = P3(p, X1, Z0, Hh + h * 0.35), dr = new Path2D();
                dr.moveTo(dd[0], dd[1] - 7); dr.quadraticCurveTo(dd[0] + 7, dd[1] + 3, dd[0], dd[1] + 7); dr.quadraticCurveTo(dd[0] - 7, dd[1] + 3, dd[0], dd[1] - 7);
                V.fyll(dr, '#d9e8f6'); V.blak(dr, 1.6, V.BLA);
            }
        }
        function stoppur(cx, cy, t) {
            var k = new Path2D(); k.arc(cx, cy, 44, 0, 7); V.fyll(k, V.VIT); V.blak(k, 3.2, V.BLA);
            var kr = new Path2D(); kr.roundRect(cx - 10, cy - 64, 20, 16, 4); V.fyll(kr, V.VIT); V.blak(kr, 2.6, V.BLA);
            var tk = new Path2D();
            for (var i = 0; i < 12; i++) { var a = i / 12 * 2 * Math.PI, L = i % 3 ? 5 : 10; tk.moveTo(cx + Math.sin(a) * 36, cy - Math.cos(a) * 36); tk.lineTo(cx + Math.sin(a) * (36 - L), cy - Math.cos(a) * (36 - L)); }
            V.blak(tk, 2, V.INK);
            var v = 2 * Math.PI * (t % 60) / 60, vis = new Path2D(); vis.moveTo(cx, cy); vis.lineTo(cx + Math.sin(v) * 30, cy - Math.cos(v) * 30); V.blak(vis, 3.2, V.ROD);
            var m = new Path2D(); m.arc(cx, cy, 4, 0, 7); V.fyll(m, V.INK);
        }
        function rita(dt) {
            x.setTransform(1, 0, 0, 1, 0, 0);
            x.drawImage(bg, 0, 0);
            x.setTransform(K.cv.width / W, 0, 0, K.cv.height / H, 0, 0);
            plattor.forEach(function (p, i) {
                x.save(); flytta(x, i);
                var f = p.m / M0;
                // värme som leds upp i isen: fler prickar när effekten är större
                if (dt && gar && p.m > 0) {
                    p.skuld += 0.55 * p.P * dt;
                    while (p.skuld >= 1) { p.skuld -= 1; p.prickar.push({ X: 175 + (Math.random() - 0.5) * 70, Z: 115 + (Math.random() - 0.5) * 50, a: 0, fas: Math.random() * 6 }); }
                }
                if (dt) p.prickar.forEach(function (q) { q.a += dt; });
                p.prickar = p.prickar.filter(function (q) { return q.a < 1.1; });
                isbit(p, f);
                p.prickar.forEach(function (q) {
                    var c = P3(p, q.X, q.Z, PH);
                    x.save(); x.globalAlpha = 0.9 * Math.sin(Math.PI * q.a / 1.1);
                    var d = new Path2D(); d.arc(c[0] + 5 * Math.sin(q.a * 6 + q.fas), c[1] - 40 * q.a, 4.5, 0, 7);
                    V.fyll(d, V.ROD); V.blak(d, 1.2, V.INK, 0.7); x.restore();
                });
                var rad = p.klar !== null ? 'Smälte på ' + tidText(p.klar) : 'Kvar av isbiten: ' + Math.round(f * 100) + ' %';
                V.text(rad, p.ox + 215, OY + 118, 24, p.klar !== null ? V.ROD : V.GRA, 'center', 600);
                x.restore();
            });
            stoppur(W / 2, 82, tid);
            V.text(tidText(tid), W / 2, 158, 24, V.INK, 'center', 700);
            if (!gar && tid === 0) {
                if (smal) {
                    V.text('Båda plattorna och luften har 20 °C.', W / 2, 192, 20, V.GRA, 'center', 500);
                    V.text('Isen har 0 °C.', W / 2, 216, 20, V.GRA, 'center', 500);
                } else V.text('Båda plattorna och luften har 20 °C. Isen har 0 °C.', W / 2, 214, 21, V.GRA, 'center', 500);
            }
        }

        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var start = vgBtn('Starta', 'ms-primar');
        var om = vgBtn('Börja om');
        var sn = vgCheck('Snabbspola', false);
        controls.appendChild(start); controls.appendChild(om); controls.appendChild(sn.label);
        K.card.appendChild(controls);
        node.appendChild(K.card);
        function etikett() { start.textContent = gar ? 'Paus' : (tid > 0 ? 'Fortsätt' : 'Starta'); }
        function vaxla() {
            if (plattor[0].m <= 0 && plattor[1].m <= 0) return;
            gar = !gar; etikett();
        }
        start.addEventListener('click', vaxla);
        K.cv.addEventListener('click', vaxla);
        K.cv.style.cursor = 'pointer';
        om.addEventListener('click', function () { nollstall(); etikett(); rita(0); });
        sn.cb.addEventListener('change', function () { snabb = sn.cb.checked; });
        var loop = vgLoop(K.card, function (dt) {
            if (gar) {
                var dts = dt * (snabb ? 40 : 5), n = Math.ceil(dts / 0.5);
                for (var i = 0; i < n; i++) steg(dts / n);
                if (plattor[0].m <= 0 && plattor[1].m <= 0) { gar = false; etikett(); }
            }
            rita(dt);
        });
        K.card._set = function (t) {
            nollstall();
            var n = Math.round(t / 0.5); for (var i = 0; i < n; i++) steg(0.5);
            gar = false; etikett(); rita(0);
        };
        rita(0);
        loop.satt(true);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  typ: blixtljud (fy2-2.10: ljudets hastighet, blixt och åska)
    // ══════════════════════════════════════════════════════════════════════
    // En natt på slätten. En blixt slår ned (eller en fyrverkeripjäs brister)
    // på avståndet s från en person. Ljuset når fram efter s/c, ljudet efter
    // s/v, och ljudvågens front ritas som en ring som växer i verklig fart.
    // Längs marken står en kilometerskala, och när ringen passerar ett
    // kilometerstreck skrivs tiden ut under det: ungefär 3 s per km, alltså
    // tumregeln i genomgången. Ljudets fart följer lufttemperaturen
    // (v = 331,3 + 0,606 · T m/s). Mörk scen är motiverad: blixten och
    // fyrverkeriet syns i mörker. Gissa-läget visar bara att himlen lyser
    // upp bakom molnen; eleven ser stoppuret, hör mullret och uppskattar
    // avståndet. Ljudet är syntetiserat (Web Audio), inga ljudfiler.
    function buildBlixtljud(node, cfg) {
        var W = 640, H = 380, GY = 312;          // logisk storlek, markens y
        var XO = 596;                            // personens x från början
        var xo = XO;                             // personens x (dragbar)
        var XMIN = 20, XMAX = W - 24;            // gränser för källan och personen
        var PXKM = 82;                           // px per km
        var SMAX = 6.5, SMIN = 0.3;
        var HFYR = 0.5;                          // fyrverkeriets brisanshöjd (km)
        var C_LJUS = 2.998e8;
        var GUL = '#f2c94c', TXT = '#dfe4ee', DIM = '#8a93a5';
        var FONT_C = 'Poppins, system-ui, sans-serif';

        var typ = cfg.visa === 'fyrverkeri' ? 'fyr' : 'blixt';
        var s = 3.0;                             // avstånd (km), rak linje
        var T = 15;                              // lufttemperatur (°C)
        var snabb = false;
        var gissa = false, gissaKlar = false, poang = 0, forsok = 0;
        var tEv = null;                          // tid sedan nedslaget (s), null = inget
        var hord = false;                        // har ljudet nått fram?
        var gnistor = [];
        var bolt = null;
        var pop = 0;                             // "Muller!"-textens ålder

        function v() { return 331.3 + 0.606 * T; }
        function hojd() { return typ === 'fyr' ? HFYR : 0; }
        function sMin() { return typ === 'fyr' ? HFYR + 0.2 : SMIN; }
        function sh() { var h = hojd(); return Math.sqrt(Math.max(0, s * s - h * h)); }
        function x0() { return xo - sh() * PXKM; }
        function y0() { return GY - hojd() * PXKM; }
        function tS() { return s * 1000 / v(); }
        function tL() { return s * 1000 / C_LJUS; }
        // Åskan skapas längs HELA blixtkanalen (returslaget hettar upp den i
        // praktiken samtidigt). Kanalen ritas lodrät från marken upp till
        // molnbasen YMOLN. Första ljudet kommer från nedslagspunkten (s/v),
        // det sista från kanalens topp, √(s² + h²)/v. Skillnaden är en stor
        // del av varför det mullrar i flera sekunder.
        var YMOLN = 96;
        function hKanal() { return (GY - YMOLN) / PXKM; }
        function sTopp() { var a = sh(), h = hKanal(); return Math.sqrt(a * a + h * h); }
        function tSista() { return typ === 'blixt' ? sTopp() * 1000 / v() : tS(); }

        function f(vv, d) {
            var t = vv.toFixed(d);
            if (parseFloat(t) === 0) return '0';
            t = t.replace('.', ',').replace('-', '−');
            var p = t.split(',');
            p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            return p.join(',');
        }
        function fLjus(t) {
            var d = Math.ceil(-Math.log10(t)) + 1;
            return f(t, Math.min(9, Math.max(1, d)));
        }

        // ── DOM ───────────────────────────────────────────────────────────
        var card = document.createElement('div');
        card.className = 'minisim-card ms-bred ms-bl';
        if (cfg.titel) {
            var tt = document.createElement('div');
            tt.className = 'minisim-title';
            tt.textContent = cfg.titel;
            card.appendChild(tt);
        }
        var scene = document.createElement('div');
        scene.className = 'minisim-scene';
        var canvas = document.createElement('canvas');
        canvas.className = 'minisim-canvas';
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label',
            'En person står ute en mörk kväll. En bit bort slår en blixt ned. Ljuset når personen nästan ' +
            'direkt, medan ljudvågen sprider sig som en växande ring och når fram först efter flera sekunder.');
        scene.appendChild(canvas);
        var sndBtn = document.createElement('button');
        sndBtn.type = 'button';
        sndBtn.className = 'minisim-sndbtn';
        sndBtn.setAttribute('aria-label', 'Ljud på/av');
        sndBtn.title = 'Ljud av';
        var SND_PA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
        var SND_AV = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/>' +
            '<line x1="16" y1="9" x2="22" y2="15"/><line x1="22" y1="9" x2="16" y2="15"/></svg>';
        sndBtn.innerHTML = SND_PA;
        scene.appendChild(sndBtn);
        card.appendChild(scene);
        msFullskarm(card, scene, W / H, 250);
        var avl = document.createElement('div');
        avl.className = 'ms-bl-avl';
        card.appendChild(avl);

        function knapp(text, cls) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'minisim-btn' + (cls ? ' ' + cls : '');
            b.textContent = text;
            return b;
        }
        var controls = document.createElement('div');
        controls.className = 'minisim-controls';
        var startBtn = knapp('Blixten slår ned', 'ms-primar');
        var blixtBtn = knapp('Åska', 'ms-vald');
        var fyrBtn = knapp('Fyrverkeri');
        var gissaBtn = knapp('Gissa avståndet');
        var snabbLbl = document.createElement('label');
        snabbLbl.className = 'minisim-check';
        var snabbCb = document.createElement('input');
        snabbCb.type = 'checkbox';
        snabbLbl.appendChild(snabbCb);
        snabbLbl.appendChild(document.createTextNode('Snabbspola'));
        controls.appendChild(startBtn);
        controls.appendChild(blixtBtn);
        controls.appendChild(fyrBtn);
        controls.appendChild(gissaBtn);
        controls.appendChild(snabbLbl);
        card.appendChild(controls);

        function glidRad(lblHtml, min, max, step, val, aria) {
            var rad = document.createElement('div');
            rad.className = 'minisim-slider-row';
            var l = document.createElement('span');
            l.className = 'minisim-slider-lbl';
            l.innerHTML = lblHtml;
            var sl = document.createElement('input');
            sl.type = 'range';
            sl.className = 'minisim-slider';
            sl.min = String(min); sl.max = String(max); sl.step = String(step); sl.value = String(val);
            sl.setAttribute('aria-label', aria);
            var vEl = document.createElement('span');
            vEl.className = 'minisim-slider-val';
            rad.appendChild(l); rad.appendChild(sl); rad.appendChild(vEl);
            card.appendChild(rad);
            return { rad: rad, sl: sl, val: vEl };
        }
        var gS = glidRad('Avstånd <em>s</em>', SMIN, SMAX, 0.1, s, 'Avståndet till blixten i kilometer');
        var gT = glidRad('Lufttemperatur', -20, 35, 1, T, 'Luftens temperatur i grader Celsius');
        gT.val.style.minWidth = '150px';

        var svar = document.createElement('div');
        svar.className = 'ms-bl-svar';
        svar.style.display = 'none';
        svar.innerHTML = '<label><span class="ms-bl-fraga">Hur långt bort slog blixten ned?</span> <input type="text" inputmode="decimal" ' +
            'autocomplete="off" aria-label="Ditt svar i kilometer"> km</label>';
        var svarIn = svar.querySelector('input');
        var svarBtn = knapp('Svara', 'ms-primar');
        var nyBtn = knapp('Ny omgång');
        var avslutaBtn = knapp('Tillbaka');
        svar.appendChild(svarBtn);
        svar.appendChild(nyBtn);
        svar.appendChild(avslutaBtn);
        card.appendChild(svar);

        var info = document.createElement('div');
        info.className = 'minisim-info ms-brod ms-bl-info';
        card.appendChild(info);
        node.appendChild(card);

        // ── Canvas ────────────────────────────────────────────────────────
        var ctx = canvas.getContext('2d');
        var tk = 1;                              // textförstoring på smal skärm
        var smal = false;                        // smal skärm: avläsningen under scenen
        // I fullskärm fyller scenen hela bredden: höjden H är fast, och den
        // logiska bredden W räknas fram ur skärmens proportioner (minst 640).
        // Allt som står utspritt i sidled (stjärnor, moln, träd, gräs,
        // personen och blixten i förstapersonsvyn) flyttas med.
        var W0 = W;
        function byggBredd(nyW) {
            var f = nyW / W;
            function skala(lista) { for (var i = 0; i < lista.length; i++) lista[i].x *= f; }
            [stjarnor, molnKlot, fpTrad, fpGras].forEach(skala);
            fpX *= f;
            if (fpBolt) { fpBolt.pts.forEach(function (p) { p.x *= f; }); fpBolt.grenar.forEach(function (g) { g.forEach(function (p) { p.x *= f; }); }); }
            gnistor.forEach(function (g) { g.x *= f; });
            xo += nyW - W;
            XO = nyW - (W0 - 596);
            W = nyW;
            XMAX = W - 24;
        }
        function onskadBredd() {
            if ((document.fullscreenElement || document.webkitFullscreenElement) !== card) return W0;
            var ovrigt = 0;
            for (var i = 0; i < card.children.length; i++) {
                var el = card.children[i];
                if (el !== scene && el.offsetParent !== null) ovrigt += el.offsetHeight + 10;
            }
            var hojdKvar = Math.max(200, window.innerHeight - ovrigt - 24);
            var bredd = scene.clientWidth || W;
            return Math.max(W0, Math.round(H * bredd / hojdKvar));
        }
        function resize() {
            var dpr = Math.min(2, window.devicePixelRatio || 1);
            var nyW = onskadBredd();
            if (Math.abs(nyW - W) > 1) byggBredd(nyW);
            var cssW = canvas.clientWidth || W;
            tk = Math.max(1.12, Math.min(2.3, (W0 / cssW) * 0.85));
            smal = cssW < 460;
            var sc = cssW / W * dpr;
            var bw = Math.round(W * sc), bh = Math.round(H * sc);
            if (canvas.width !== bw || canvas.height !== bh) { canvas.width = bw; canvas.height = bh; }
            ctx.setTransform(sc, 0, 0, sc, 0, 0);
        }

        // fasta stjärnor och kullar (frö så att de ser likadana ut varje gång)
        var frö = 7;
        function rnd() { frö = (frö * 16807) % 2147483647; return (frö - 1) / 2147483646; }
        var stjarnor = [];
        for (var i = 0; i < 90; i++) stjarnor.push({ x: rnd() * W, y: rnd() * (GY - 40), r: 0.4 + rnd() * 1.0, a: 0.25 + rnd() * 0.6 });
        var kulle = [];
        for (i = 0; i <= 64; i++) {
            var xx = i * W / 64;
            kulle.push(GY - 10 - 12 * Math.sin(xx / 90 + 1) - 7 * Math.sin(xx / 37 + 2) - 4 * rnd());
        }

        function font(px, bold) { return (bold ? '600 ' : '') + (px * tk) + 'px ' + FONT_C; }

        function ritaHimmel(blixtljus) {
            var g = ctx.createLinearGradient(0, 0, 0, GY);
            g.addColorStop(0, '#04070f');
            g.addColorStop(0.65, '#101830');
            g.addColorStop(1, '#2a2840');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, GY);
            for (var k = 0; k < stjarnor.length; k++) {
                var st = stjarnor[k];
                ctx.globalAlpha = st.a * (1 - Math.min(1, blixtljus));
                ctx.fillStyle = '#e8ecf5';
                ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
            }
            ctx.globalAlpha = 1;
            if (typ === 'blixt') ritaMoln(blixtljus);
            if (blixtljus > 0) {
                ctx.fillStyle = 'rgba(190,205,255,' + (0.38 * blixtljus) + ')';
                ctx.fillRect(0, 0, W, GY);
            }
            // kullar
            ctx.fillStyle = '#0d1322';
            ctx.beginPath();
            ctx.moveTo(0, GY);
            for (var k2 = 0; k2 < kulle.length; k2++) ctx.lineTo(k2 * W / 64, kulle[k2]);
            ctx.lineTo(W, GY);
            ctx.closePath();
            ctx.fill();
            // mark
            var gm = ctx.createLinearGradient(0, GY, 0, H);
            gm.addColorStop(0, '#141a26');
            gm.addColorStop(1, '#07090f');
            ctx.fillStyle = gm;
            ctx.fillRect(0, GY, W, H - GY);
            ctx.strokeStyle = '#2c3446';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(0, GY + 0.5); ctx.lineTo(W, GY + 0.5); ctx.stroke();
        }

        var molnKlot = [];
        for (i = 0; i < 26; i++) molnKlot.push({ x: rnd() * (W + 80) - 40, y: 34 + rnd() * 54, r: 34 + rnd() * 40 });
        function ritaMoln(ljus) {
            for (var k = 0; k < molnKlot.length; k++) {
                var m = molnKlot[k];
                var g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
                var a = 0.55 + 0.4 * ljus;
                var c = ljus > 0 ? '120,130,170' : '30,36,54';
                g.addColorStop(0, 'rgba(' + c + ',' + a + ')');
                g.addColorStop(1, 'rgba(' + c + ',0)');
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill();
            }
        }

        // ── Blixt: slumpad sicksacklinje med grenar ───────────────────────
        function nyBlixt() {
            var pts = [{ x: x0() + (Math.random() - 0.5) * 30, y: 96 }];
            var n = 18;
            for (var k = 1; k <= n; k++) {
                var tY = 96 + (GY - 96) * k / n;
                var tX = pts[0].x + (x0() - pts[0].x) * k / n + (k < n ? (Math.random() - 0.5) * 22 : 0);
                pts.push({ x: tX, y: tY });
            }
            var grenar = [];
            for (var b = 0; b < 3; b++) {
                var start = 3 + Math.floor(Math.random() * 9);
                var p = pts[start], gp = [p], dir = Math.random() < 0.5 ? -1 : 1;
                for (var j = 1; j < 6; j++) gp.push({ x: gp[j - 1].x + dir * (6 + Math.random() * 10), y: gp[j - 1].y + 8 + Math.random() * 8 });
                grenar.push(gp);
            }
            return { pts: pts, grenar: grenar };
        }
        function ritaLinje(pts, w, col) {
            ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
            for (var k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
            ctx.stroke();
        }
        // blixtens ljusstyrka under de första 0,6 s (tre urladdningar)
        function blixtStyrka(t) {
            if (t < 0 || t > 0.6) return 0;
            var a = 0;
            [[0, 1], [0.12, 0.7], [0.28, 0.85]].forEach(function (u) {
                var d = t - u[0];
                if (d >= 0) a = Math.max(a, u[1] * Math.exp(-d / 0.05));
            });
            return a;
        }

        // ── Fyrverkeri ────────────────────────────────────────────────────
        var FARGER = ['#ffb347', '#ff6b6b', '#7fd1ff', '#c6ff7a', '#ffd84d', '#e7a6ff'];
        function brisera() {
            gnistor = [];
            var fa = FARGER[Math.floor(Math.random() * FARGER.length)];
            var fb = FARGER[Math.floor(Math.random() * FARGER.length)];
            for (var k = 0; k < 110; k++) {
                var a = Math.random() * 6.283, sp = 26 + Math.random() * 44;
                gnistor.push({ x: x0(), y: y0(), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, c: k % 2 ? fa : fb, liv: 1.6 + Math.random() * 1.2, age: 0 });
            }
        }
        function stegGnistor(dt) {
            for (var k = gnistor.length - 1; k >= 0; k--) {
                var p = gnistor[k];
                p.vx *= Math.exp(-1.6 * dt); p.vy = p.vy * Math.exp(-1.6 * dt) + (p.g || 22) * dt;
                p.x += p.vx * dt; p.y += p.vy * dt; p.age += dt;
                if (p.age > p.liv || p.y > (p.mark || GY)) gnistor.splice(k, 1);
            }
        }

        // ── Person ────────────────────────────────────────────────────────
        // Personen ritas nästan i skala: en verklig människa (1,8 m) vore
        // 0,15 px hög med 82 px/km, så hon blir bara en liten ljus figur
        // på 5 px. Greppytan för att dra i henne är större än figuren.
        var HUVUD = 5;                           // huvudets höjd över marken (px)
        function ritaPerson() {
            var x = xo, y = GY;
            ctx.strokeStyle = '#d6dce8';
            ctx.lineCap = 'round';
            ctx.lineWidth = 1.3;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - HUVUD + 1.2); ctx.stroke();
            ctx.fillStyle = '#e9edf5';
            ctx.beginPath(); ctx.arc(x, y - HUVUD, 1.1, 0, 6.283); ctx.fill();
            if (hord && pop < 2.2) {
                // ljudbågar vid örat
                ctx.strokeStyle = 'rgba(242,201,76,' + Math.max(0, 1 - pop / 2.2) + ')';
                ctx.lineWidth = 1.6;
                for (var k = 0; k < 3; k++) {
                    ctx.beginPath();
                    ctx.arc(x, y - HUVUD, 6 + k * 5 + (pop * 8) % 5, Math.PI * 0.8, Math.PI * 1.2);
                    ctx.stroke();
                }
            }
        }

        // ── Kilometerskala längs marken ───────────────────────────────────
        // Strecken står på avståndet km från smällen (rak linje), så att varje
        // kilometer alltid tar km · 1000 / v sekunder, även för fyrverkeriet.
        function passeradTid(km) { return km * 1000 / v(); }
        function ritaSkala() {
            var x = x0();
            ctx.strokeStyle = '#5b6578';
            ctx.lineWidth = 1.2;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            var max = Math.floor(s + 1e-6), h = hojd();
            for (var km = 0; km <= max; km++) {
                if (km > 0 && km <= h) continue;
                var px = x + Math.sqrt(Math.max(0, km * km - h * h)) * PXKM;
                ctx.beginPath(); ctx.moveTo(px, GY + 1); ctx.lineTo(px, GY + 8); ctx.stroke();
                if (km === 0) continue;
                ctx.fillStyle = DIM;
                ctx.font = font(12.5);
                ctx.fillText(km + ' km', px, GY + 10 + 13 * tk);
                var tp = passeradTid(km);
                if (tEv !== null && tEv >= tp) {
                    ctx.fillStyle = GUL;
                    ctx.font = font(12.5, true);
                    ctx.fillText(f(tp, 1) + ' s', px, GY + 14 + 28 * tk);
                }
            }
        }

        // ── Avståndslinje ─────────────────────────────────────────────────
        function ritaAvstand() {
            var ax = x0(), ay = y0(), bx = xo, by = GY - HUVUD;
            ctx.setLineDash([4, 5]);
            ctx.strokeStyle = 'rgba(223,228,238,0.55)';
            ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx - 3, by); ctx.stroke();
            ctx.setLineDash([]);
            var mx = (ax + bx) / 2, my = (ay + by) / 2 - 10 * tk;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = TXT;
            ctx.font = 'italic ' + (15 * tk) + 'px ' + FONT_C;
            var rest = ' = ' + f(s, 1) + ' km';
            ctx.font = (15 * tk) + 'px ' + FONT_C;
            var wR = ctx.measureText(rest).width;
            ctx.font = 'italic ' + (15 * tk) + 'px ' + FONT_C;
            var wS = ctx.measureText('s').width;
            var x1 = mx - (wS + wR) / 2;
            ctx.textAlign = 'left';
            ctx.fillText('s', x1, my);
            ctx.font = (15 * tk) + 'px ' + FONT_C;
            ctx.fillText(rest, x1 + wS, my);
        }

        // ── Vågfronten ────────────────────────────────────────────────────
        function ritaRing() {
            var slut = tSista();
            if (tEv === null || tEv <= 0 || tEv > slut + 1.2) return;
            var rr = v() * tEv / 1000 * PXKM;
            var alfa = tEv > slut ? Math.max(0, 1 - (tEv - slut) / 1.2) : 1;
            var x = x0();
            ctx.save();
            ctx.beginPath(); ctx.rect(0, 0, W, GY); ctx.clip();
            function front() {
                ctx.beginPath();
                if (typ === 'blixt') {
                    // kapsel kring kanalen: lodräta sidor och en halvcirkel upptill
                    ctx.moveTo(x - rr, GY + 2);
                    ctx.lineTo(x - rr, YMOLN);
                    ctx.arc(x, YMOLN, rr, Math.PI, 2 * Math.PI);
                    ctx.lineTo(x + rr, GY + 2);
                } else {
                    ctx.arc(x, y0(), rr, 0, 6.283);
                }
            }
            // mjuk bakkant: några breda, svaga streck innanför fronten
            for (var k = 1; k <= 3; k++) {
                ctx.save();
                ctx.lineWidth = 7 * k;
                ctx.strokeStyle = 'rgba(242,201,76,' + (0.05 * alfa) + ')';
                front(); ctx.stroke();
                ctx.restore();
            }
            ctx.strokeStyle = 'rgba(242,201,76,' + (0.95 * alfa) + ')';
            ctx.lineWidth = 2.4;
            front(); ctx.stroke();
            ctx.restore();
        }

        // ── Avläsningsrutan ───────────────────────────────────────────────
        function ritaAvlasning() {
            var rader;
            var tid = tEv === null ? null : Math.min(Math.max(0, tEv), tS());
            if (gissa) {
                rader = [[typ === 'fyr' ? 'Tid sedan det brast' : 'Tid sedan blixten', tid === null ? '' : f(tid, 1) + ' s', GUL]];
            } else {
                rader = [
                    ['Ljuset syns efter', (tEv !== null && tEv >= 0) ? fLjus(tL()) + ' s' : '', TXT],
                    ['Ljudet hörs efter', tid === null ? '' : f(tid, 1) + ' s', GUL]
                ];
            }
            avl.style.display = smal ? '' : 'none';
            if (smal) {
                avl.innerHTML = rader.map(function (r) {
                    return '<span>' + r[0] + ' <b style="color:' + r[2] + '">' + (r[1] || '–') + '</b></span>';
                }).join('');
                return;
            }
            var lh = 22 * tk, pad = 10 * tk;
            ctx.font = font(13);
            var wL = 0;
            rader.forEach(function (r) { wL = Math.max(wL, ctx.measureText(r[0]).width); });
            ctx.font = font(17, true);
            var wV = ctx.measureText(gissa ? '00,0 s' : '0,0000000 s').width;
            var bw = wL + wV + pad * 3, bh = rader.length * lh + pad * 1.4;
            var bx = W - bw - 56, by = 10;
            if (bx < 60) { bx = 56; by = 56; }
            ctx.fillStyle = 'rgba(6,9,16,0.72)';
            ctx.strokeStyle = 'rgba(120,130,150,0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(bx, by, bw, bh, 6); else ctx.rect(bx, by, bw, bh);
            ctx.fill(); ctx.stroke();
            rader.forEach(function (r, k) {
                var yy = by + pad * 0.7 + lh * (k + 0.72);
                ctx.textAlign = 'left';
                ctx.fillStyle = DIM;
                ctx.font = font(13);
                ctx.fillText(r[0], bx + pad, yy);
                ctx.textAlign = 'right';
                ctx.fillStyle = r[2];
                ctx.font = font(17, true);
                ctx.fillText(r[1], bx + bw - pad, yy);
            });
        }

        // "Pang!" står där fyrverkeriet exploderade, och texten är mindre ju
        // längre bort explosionen är (som ljudet, som också blir svagare)
        function pangStorlek() { return Math.max(11, Math.min(30, 34 / (0.6 + 0.35 * s))); }
        function ritaPang(x, y, pt) {
            ctx.font = font(pt, true);
            var bredd = ctx.measureText('Pang!').width;
            x = Math.max(8 + bredd / 2, Math.min(W - 8 - bredd / 2, x));
            y = Math.max(pt + 4, y);
            var sk = 1 + 0.15 * Math.exp(-pop * 6);
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.translate(x, y);
            ctx.scale(sk, sk);
            ctx.fillText('Pang!', 0, 0);
            ctx.restore();
        }
        function ritaPop() {
            if (!hord || pop > 2.2) return;
            var a = Math.max(0, Math.min(1, (2.2 - pop) / 0.6));
            ctx.globalAlpha = a;
            ctx.fillStyle = GUL;
            if (typ === 'fyr') {
                var pt = pangStorlek();
                ritaPang(x0(), y0() - 0.9 * pt, pt);
            } else {
                ctx.textAlign = 'right';
                ctx.textBaseline = 'alphabetic';
                ctx.font = font(22, true);
                var sk = 1 + 0.15 * Math.exp(-pop * 6);
                ctx.save();
                ctx.translate(Math.min(W - 10, xo + 40), GY - 62);
                ctx.scale(sk, sk);
                ctx.fillText('Muller!', 0, 0);
                ctx.restore();
            }
            ctx.globalAlpha = 1;
        }

        function ritaKalla() {
            var x = x0();
            if (typ === 'blixt') {
                var st = tEv === null ? 0 : blixtStyrka(tEv);
                if (!gissa && bolt && st > 0.02) {
                    ritaLinje(bolt.pts, 7, 'rgba(160,180,255,' + 0.35 * st + ')');
                    bolt.grenar.forEach(function (gp) { ritaLinje(gp, 1.6, 'rgba(220,228,255,' + 0.8 * st + ')'); });
                    ritaLinje(bolt.pts, 2.4, 'rgba(250,252,255,' + st + ')');
                }
                if (!gissa || gissaKlar) {
                    // nedslagspunkten: en liten markering på marken
                    ctx.fillStyle = gissaKlar ? GUL : '#6f7a90';
                    ctx.beginPath(); ctx.arc(x, GY, 3.2, 0, 6.283); ctx.fill();
                }
            } else {
                // raket på väg upp (t < 0) och brisad
                if (tEv !== null && tEv < 0) {
                    var u = 1 + tEv / 1.1;        // 0 → 1
                    var yy = GY - (GY - y0()) * u;
                    var g = ctx.createLinearGradient(x, GY, x, yy);
                    g.addColorStop(0, 'rgba(255,190,120,0)');
                    g.addColorStop(1, 'rgba(255,210,150,0.9)');
                    ctx.strokeStyle = g; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(x, Math.min(GY, yy + 60)); ctx.lineTo(x, yy); ctx.stroke();
                    ctx.fillStyle = '#ffe2b0';
                    ctx.beginPath(); ctx.arc(x, yy, 2.2, 0, 6.283); ctx.fill();
                }
                if (tEv !== null && tEv >= 0 && tEv < 0.4) {
                    var a = 1 - tEv / 0.4;
                    var gg = ctx.createRadialGradient(x, y0(), 0, x, y0(), 70);
                    gg.addColorStop(0, 'rgba(255,240,210,' + 0.9 * a + ')');
                    gg.addColorStop(1, 'rgba(255,200,140,0)');
                    ctx.fillStyle = gg;
                    ctx.beginPath(); ctx.arc(x, y0(), 70, 0, 6.283); ctx.fill();
                }
                for (var k = 0; k < gnistor.length; k++) {
                    var p = gnistor[k];
                    ctx.globalAlpha = Math.max(0, 1 - p.age / p.liv);
                    ctx.fillStyle = p.c;
                    ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
                }
                ctx.globalAlpha = 1;
                // avfyrningsrör på marken
                ctx.fillStyle = '#5a4636';
                ctx.fillRect(x - 3, GY - 7, 6, 7);
            }
        }

        // ── Förstapersonsvy (gissa-läget) ─────────────────────────────────
        // Man står själv på slätten och tittar mot horisonten. Allt ritas i
        // perspektiv med brännvidden FP (px): något på höjden h km och
        // avståndet s km syns FP · h / s px ovanför horisonten. En nära blixt
        // går därför ända upp i molnen, en avlägsen är en liten tråd nere vid
        // horisonten, och ett avlägset fyrverkeri brister lågt och litet.
        var YH = 286, FP = 260;
        var fpX = W / 2, fpBolt = null, fpRaknare = 0;
        var fpTrad = [], fpGras = [], fpKulle = [];
        (function () {
            var x = 0;
            while (x < W) {
                var ht = 3 + rnd() * 9;
                if (rnd() < 0.55) fpTrad.push({ x: x, h: ht, w: ht * (0.35 + rnd() * 0.15) });
                x += 3 + rnd() * 14;
            }
            for (var k = 0; k < 170; k++) fpGras.push({ x: rnd() * W, h: 6 + rnd() * 26, lut: (rnd() - 0.5) * 9 });
            for (var k2 = 0; k2 <= 40; k2++) fpKulle.push(YH - 3 - 6 * Math.sin(k2 / 4.2 + 0.7) * Math.sin(k2 / 9 + 2) - 3 * rnd());
        })();
        function fpSkala() { return FP / s; }                  // px per km på avståndet s
        function nyBlixtFP() {
            var k = fpSkala(), topp = Math.max(-12, YH - k * hKanal());
            var kk = Math.min(k, 330);               // sidledes utslag växer inte i det oändliga
            var n = 22, pts = [{ x: fpX + (Math.random() - 0.5) * 0.3 * kk, y: topp }];
            for (var i = 1; i <= n; i++) {
                var y = topp + (YH - topp) * i / n;
                var x = pts[0].x + (fpX - pts[0].x) * i / n + (i < n ? (Math.random() - 0.5) * 0.16 * kk : 0);
                pts.push({ x: x, y: y });
            }
            var grenar = [];
            for (var b = 0; b < 4; b++) {
                var st = 2 + Math.floor(Math.random() * 12), gp = [pts[st]], dir = Math.random() < 0.5 ? -1 : 1;
                for (var j = 1; j < 6; j++) gp.push({ x: gp[j - 1].x + dir * (0.04 + Math.random() * 0.06) * kk, y: gp[j - 1].y + (0.05 + Math.random() * 0.05) * kk });
                grenar.push(gp);
            }
            return { pts: pts, grenar: grenar, w: Math.max(1.1, Math.min(9, 4 / s)) };
        }
        function brisaraFP() {
            gnistor = [];
            var k = fpSkala(), cx = fpX, cy = YH - k * HFYR;
            var fa = FARGER[Math.floor(Math.random() * FARGER.length)];
            var fb = FARGER[Math.floor(Math.random() * FARGER.length)];
            for (var i = 0; i < 160; i++) {
                var a = Math.random() * 6.283, sp = (0.15 + Math.random() * 0.17) * k;
                gnistor.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, c: i % 2 ? fa : fb,
                    liv: 1.8 + Math.random() * 1.2, age: 0, g: 0.035 * k, rad: Math.max(0.7, Math.min(2.2, 2.6 / s)), mark: YH + 40 });
            }
        }
        function ritaFP(ljus) {
            var k = fpSkala();
            // himmel
            var g = ctx.createLinearGradient(0, 0, 0, YH);
            g.addColorStop(0, '#03060d');
            g.addColorStop(1, typ === 'blixt' ? '#161b2b' : '#1c2136');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, YH);
            if (typ === 'fyr') {
                for (var i = 0; i < stjarnor.length; i++) {
                    var st = stjarnor[i];
                    if (st.y > YH - 20) continue;
                    ctx.globalAlpha = st.a;
                    ctx.fillStyle = '#e8ecf5';
                    ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
                }
                ctx.globalAlpha = 1;
            } else {
                // molntäcke: ett lager på molnbasens höjd, lägre ju längre bort
                for (var m = 0; m < molnKlot.length; m++) {
                    var mk = molnKlot[m];
                    var yy = mk.y * 1.5 - 10;
                    var gr = ctx.createRadialGradient(mk.x, yy, 0, mk.x, yy, mk.r * 1.6);
                    gr.addColorStop(0, 'rgba(26,31,46,0.95)');
                    gr.addColorStop(1, 'rgba(26,31,46,0)');
                    ctx.fillStyle = gr;
                    ctx.beginPath(); ctx.arc(mk.x, yy, mk.r * 1.6, 0, 6.283); ctx.fill();
                }
                if (ljus > 0) {
                    // blixten lyser upp molnen inifrån, starkast närmast
                    var styrka = ljus * Math.min(1, 2.2 / (0.8 + s));
                    var cy = Math.max(30, YH - k * hKanal());
                    var gl = ctx.createRadialGradient(fpX, cy, 0, fpX, cy, 260);
                    gl.addColorStop(0, 'rgba(200,210,255,' + 0.75 * styrka + ')');
                    gl.addColorStop(1, 'rgba(200,210,255,0)');
                    ctx.fillStyle = gl;
                    ctx.fillRect(0, 0, W, YH);
                    ctx.fillStyle = 'rgba(170,185,235,' + 0.18 * styrka + ')';
                    ctx.fillRect(0, 0, W, H);
                    if (s < 1) {
                        ctx.fillStyle = 'rgba(225,230,255,' + 0.45 * ljus * (1 - s) / 0.7 + ')';
                        ctx.fillRect(0, 0, W, H);
                    }
                }
            }
            // avlägsna kullar och trädrand vid horisonten
            ctx.fillStyle = '#0a0e18';
            ctx.beginPath(); ctx.moveTo(0, YH + 1);
            for (var q = 0; q < fpKulle.length; q++) ctx.lineTo(q * W / (fpKulle.length - 1), fpKulle[q]);
            ctx.lineTo(W, YH + 1); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#070a12';
            for (var t = 0; t < fpTrad.length; t++) {
                var tr = fpTrad[t];
                ctx.beginPath(); ctx.moveTo(tr.x - tr.w, YH + 1); ctx.lineTo(tr.x, YH - tr.h); ctx.lineTo(tr.x + tr.w, YH + 1); ctx.closePath(); ctx.fill();
            }
            // blixten (framför trädranden, den står närmare än horisonten)
            if (typ === 'blixt' && fpBolt && tEv !== null) {
                var bs = blixtStyrka(tEv);
                if (bs > 0.02) {
                    ritaLinje(fpBolt.pts, fpBolt.w * 4, 'rgba(160,180,255,' + 0.3 * bs + ')');
                    fpBolt.grenar.forEach(function (gp) { ritaLinje(gp, fpBolt.w * 0.55, 'rgba(225,232,255,' + 0.8 * bs + ')'); });
                    ritaLinje(fpBolt.pts, fpBolt.w, 'rgba(250,252,255,' + bs + ')');
                }
            }
            // fyrverkeriet
            if (typ === 'fyr' && tEv !== null) {
                var yb = YH - k * HFYR;
                if (tEv < 0) {
                    var u = 1 + tEv / 1.1, yr = YH - (YH - yb) * u;
                    ctx.strokeStyle = 'rgba(255,205,150,0.75)';
                    ctx.lineWidth = Math.max(0.8, 1.6 / Math.sqrt(s));
                    ctx.beginPath(); ctx.moveTo(fpX, Math.min(YH, yr + 0.15 * k)); ctx.lineTo(fpX, yr); ctx.stroke();
                }
                if (tEv >= 0 && tEv < 0.5) {
                    var a2 = 1 - tEv / 0.5, rg = 0.45 * k;
                    var gg = ctx.createRadialGradient(fpX, yb, 0, fpX, yb, rg);
                    gg.addColorStop(0, 'rgba(255,240,210,' + 0.9 * a2 + ')');
                    gg.addColorStop(1, 'rgba(255,200,140,0)');
                    ctx.fillStyle = gg;
                    ctx.beginPath(); ctx.arc(fpX, yb, rg, 0, 6.283); ctx.fill();
                }
                for (var p2 = 0; p2 < gnistor.length; p2++) {
                    var gn = gnistor[p2];
                    ctx.globalAlpha = Math.max(0, 1 - gn.age / gn.liv);
                    ctx.fillStyle = gn.c;
                    ctx.beginPath(); ctx.arc(gn.x, gn.y, gn.rad || 1.6, 0, 6.283); ctx.fill();
                }
                ctx.globalAlpha = 1;
            }
            // marken framför en, med gräs i förgrunden
            var gm = ctx.createLinearGradient(0, YH, 0, H);
            gm.addColorStop(0, '#0c111b');
            gm.addColorStop(1, '#04060a');
            ctx.fillStyle = gm;
            ctx.fillRect(0, YH + 1, W, H - YH);
            if (ljus > 0 && typ === 'blixt') {
                ctx.fillStyle = 'rgba(150,165,215,' + 0.12 * ljus * Math.min(1, 2.2 / (0.8 + s)) + ')';
                ctx.fillRect(0, YH + 1, W, H - YH);
            }
            ctx.strokeStyle = '#010204';
            ctx.lineWidth = 1.4;
            ctx.lineCap = 'round';
            for (var gi = 0; gi < fpGras.length; gi++) {
                var gb = fpGras[gi];
                ctx.beginPath(); ctx.moveTo(gb.x, H + 2); ctx.quadraticCurveTo(gb.x + gb.lut * 0.3, H - gb.h * 0.6, gb.x + gb.lut, H - gb.h); ctx.stroke();
            }
            // det man hör
            if (hord && pop < 2.4) {
                var a3 = Math.max(0, Math.min(1, (2.4 - pop) / 0.6));
                ctx.globalAlpha = a3;
                ctx.fillStyle = GUL;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'alphabetic';
                if (typ === 'fyr') {
                    var pt2 = pangStorlek();
                    ritaPang(fpX, YH - k * HFYR - 0.9 * pt2, pt2);
                } else {
                    ctx.font = font(26, true);
                    var sk = 1 + 0.15 * Math.exp(-pop * 6);
                    ctx.save(); ctx.translate(W / 2, H - 46); ctx.scale(sk, sk);
                    ctx.fillText('Mullrrr …', 0, 0);
                    ctx.restore();
                }
                ctx.globalAlpha = 1;
            }
        }

        function rita() {
            resize();
            ctx.clearRect(0, 0, W, H);
            var ljus = 0;
            if (tEv !== null) {
                if (typ === 'blixt') ljus = blixtStyrka(tEv) * (gissa ? 1.3 : 1);
                else if (tEv >= 0 && tEv < 0.4) ljus = 0.35 * (1 - tEv / 0.4);
            }
            if (gissa) { ritaFP(Math.min(1, ljus)); ritaAvlasning(); return; }
            ritaHimmel(Math.min(1, ljus));
            var visaGeometri = !gissa || gissaKlar;
            if (visaGeometri) ritaSkala();
            ritaKalla();
            if (visaGeometri) { ritaRing(); ritaAvstand(); }
            ritaPerson();
            ritaPop();
            ritaAvlasning();
        }

        // ── Ljud (Web Audio) ──────────────────────────────────────────────
        var AC = window.AudioContext || window.webkitAudioContext;
        var actx = null, ljudPa = true, brus = null;
        // Fyrverkeriets smäll och åskan är inspelade ljudeffekter (skapade i
        // ElevenLabs, media/ljud/). Åskan finns i två sorter: nära (skarp
        // knall och sedan muller) och långt bort (bara ett dovt, rullande
        // muller). Alla tonar ut till tystnad. Filerna hämtas först när
        // ljudet väcks; tills de laddats, eller om hämtningen misslyckas,
        // används det syntetiserade ljudet nedan.
        var fyrBuf = [], askaNara = [], askaFjarran = [];
        function laddaLjud(url, lista) {
            fetch(url).then(function (res) { return res.ok ? res.arrayBuffer() : Promise.reject(); })
                .then(function (ab) {
                    return new Promise(function (ok, fel) { actx.decodeAudioData(ab, ok, fel); });
                })
                .then(function (buf) { lista.push(buf); })
                .catch(function () {});
        }
        function laddaFyr() {
            if (!window.fetch) return;
            laddaLjud('media/ljud/fyrverkeri-1.mp3', fyrBuf);
            laddaLjud('media/ljud/aska-nara-1.mp3', askaNara);
            laddaLjud('media/ljud/aska-nara-2.mp3', askaNara);
            laddaLjud('media/ljud/aska-fjarran-1.mp3', askaFjarran);
            laddaLjud('media/ljud/aska-fjarran-2.mp3', askaFjarran);
        }
        function slump(lista) { return lista[Math.floor(Math.random() * lista.length)]; }
        function vakna() {
            if (!AC) return;
            if (!actx) {
                actx = new AC();
                laddaFyr();
                var len = actx.sampleRate * 5;
                brus = actx.createBuffer(1, len, actx.sampleRate);
                var d = brus.getChannelData(0), last = 0;
                for (var k = 0; k < len; k++) { last = 0.97 * last + 0.03 * (Math.random() * 2 - 1); d[k] = last * 6; }
            }
            if (actx.state === 'suspended') actx.resume();
        }
        // Pågående ljud tonas ut när en ny gissningsomgång startas
        var utgangar = [];
        function tystna() {
            if (!actx) return;
            var t = actx.currentTime;
            utgangar.forEach(function (ut) {
                ut.gain.cancelScheduledValues(t);
                ut.gain.setValueAtTime(ut.gain.value, t);
                ut.gain.linearRampToValueAtTime(0, t + 0.25);
            });
            utgangar = [];
        }
        function small() {
            if (!actx || !ljudPa) return;
            var t0 = actx.currentTime + 0.01;
            var ut = actx.createGain();
            ut.connect(actx.destination);
            utgangar.push(ut);
            var styrka = Math.min(1, 1.6 / (0.6 + s));
            var src = actx.createBufferSource();
            src.buffer = brus;
            var lp = actx.createBiquadFilter();
            lp.type = 'lowpass';
            var g = actx.createGain();
            g.gain.setValueAtTime(0, t0);
            var askLista = s < 2.2 ? askaNara : askaFjarran;
            if (typ === 'blixt' && !askLista.length) askLista = askaNara.length ? askaNara : askaFjarran;
            if (typ === 'blixt' && askLista.length) {
                // inspelad åska: nära en skarp knall och sedan muller, långt
                // bort bara muller. Luften dämpar de höga frekvenserna mer ju
                // längre ljudet går, så åskan blir dovare och svagare.
                var as = actx.createBufferSource();
                as.buffer = slump(askLista);
                as.playbackRate.value = (s < 2.2 ? 1 : 0.95) * (0.94 + Math.random() * 0.1);
                var alp = actx.createBiquadFilter();
                alp.type = 'lowpass';
                alp.frequency.value = Math.min(16000, 9000 / (0.4 + 0.6 * s));
                alp.Q.value = 0.5;
                var ag = actx.createGain();
                ag.gain.value = s < 0.9 ? 1.8 : Math.min(1, 1.3 * styrka);
                as.connect(alp); alp.connect(ag);
                if (s < 0.9) {
                    var komp = actx.createDynamicsCompressor();
                    komp.threshold.value = -10; komp.ratio.value = 8; komp.attack.value = 0.002; komp.release.value = 0.25;
                    ag.connect(komp); komp.connect(ut);
                } else ag.connect(ut);
                as.start(t0);
            } else if (typ === 'blixt') {
                // mullret: lågpass som blir mörkare med avståndet, ojämnt avklingande
                lp.frequency.value = 900 / (0.6 + 0.5 * s);
                var dur = Math.max(1.6, tSista() - tS()) + 1.2, tt = t0;
                g.gain.linearRampToValueAtTime(styrka * (s < 1.5 ? 1 : 0.6), t0 + 0.04);
                while (tt < t0 + dur) {
                    tt += 0.15 + Math.random() * 0.35;
                    g.gain.linearRampToValueAtTime(styrka * (0.25 + 0.75 * Math.random()) * Math.exp(-(tt - t0) / dur * 2.2), tt);
                }
                g.gain.linearRampToValueAtTime(0, tt + 0.4);
                if (s < 1.5) {     // nära: en skarp knall först
                    var src2 = actx.createBufferSource();
                    src2.buffer = brus;
                    var hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 900;
                    var g2 = actx.createGain();
                    g2.gain.setValueAtTime(styrka * 1.4, t0);
                    g2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);
                    src2.connect(hp); hp.connect(g2); g2.connect(ut);
                    src2.start(t0); src2.stop(t0 + 0.4);
                }
                src.connect(lp); lp.connect(g); g.connect(ut);
                src.start(t0, Math.random()); src.stop(tt + 0.5);
            } else if (fyrBuf.length) {
                // inspelad smäll: luften dämpar de höga frekvenserna mer på
                // långt håll, så smällen blir dovare och svagare med avståndet
                var ks = actx.createBufferSource();
                ks.buffer = slump(fyrBuf);
                ks.playbackRate.value = 0.94 + Math.random() * 0.12;
                var klp = actx.createBiquadFilter();
                klp.type = 'lowpass';
                klp.frequency.value = Math.min(16000, 14000 / (0.5 + s));
                klp.Q.value = 0.5;
                var kg = actx.createGain();
                kg.gain.value = Math.min(0.9, 1.2 * styrka);
                ks.connect(klp); klp.connect(kg); kg.connect(ut);
                ks.start(t0);
            } else {
                lp.frequency.value = 1400 / (0.6 + 0.4 * s);
                g.gain.linearRampToValueAtTime(styrka * 1.5, t0 + 0.008);
                g.gain.exponentialRampToValueAtTime(0.001, t0 + 1.1);
                src.connect(lp); lp.connect(g); g.connect(ut);
                src.start(t0, Math.random()); src.stop(t0 + 1.2);
                var o = actx.createOscillator(), og = actx.createGain();
                o.frequency.setValueAtTime(90, t0); o.frequency.exponentialRampToValueAtTime(38, t0 + 0.4);
                og.gain.setValueAtTime(styrka * 0.8, t0); og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
                o.connect(og); og.connect(ut); o.start(t0); o.stop(t0 + 0.55);
            }
        }
        sndBtn.addEventListener('click', function () {
            ljudPa = !ljudPa;
            sndBtn.innerHTML = ljudPa ? SND_PA : SND_AV;
            sndBtn.title = ljudPa ? 'Ljud av' : 'Ljud på';
            if (ljudPa) vakna();
        });

        // ── Förlopp ───────────────────────────────────────────────────────
        var loop = vgLoop(card, function (dt) {
            var k = snabb ? 5 : 1;
            if (tEv !== null) {
                var fore = tEv;
                tEv += dt * k;
                if (typ === 'fyr' && fore < 0 && tEv >= 0) { if (gissa && !gissaKlar) brisaraFP(); else brisera(); }
                if (!hord && tEv >= tS()) { hord = true; pop = 0; small(); klart(); }
            }
            if (hord) pop += dt;
            stegGnistor(dt * k);
            rita();
            var aktiv = tEv !== null && (!hord || pop < 2.5 || tEv < tSista() + 1.3 || gnistor.length);
            if (!aktiv) loop.satt(false);
        });

        function starta() {
            vakna();
            hord = false; pop = 0; gnistor = [];
            bolt = typ === 'blixt' ? nyBlixt() : null;
            fpBolt = (gissa && typ === 'blixt') ? nyBlixtFP() : null;
            tEv = typ === 'fyr' ? -1.1 : 0;
            visaInfo();
            loop.satt(true);
        }
        function nollstall() {
            tEv = null; hord = false; gnistor = []; pop = 0;
            loop.satt(false);
            rita();
            visaInfo();
        }

        function visaInfo() {
            var vv = Math.round(v());
            if (gissa) {
                if (gissaKlar) return;
                info.textContent = tEv === null ? '' :
                    (hord ? 'Ljudet var framme efter ' + f(tS(), 1) + ' s. ' + fraga() + ' Ljudets hastighet är ' + vv + ' m/s.'
                          : (typ === 'fyr' ? 'Fyrverkeriet brast. Vänta på smällen och läs av tiden.'
                                           : 'Himlen lyste upp. Vänta på mullret och läs av tiden.'));
                return;
            }
            if (tEv === null) {
                info.textContent = 'Ljudet färdas med ' + vv + ' m/s i luft som är ' + f(T, 0) + ' °C. Dra i personen eller ' +
                    (typ === 'fyr' ? 'fyrverkeriet' : 'nedslagsplatsen') + ', eller ändra avståndet, och tryck på knappen.';
            } else if (!hord) {
                info.textContent = 'Ljuset är redan framme. Ljudvågen sprider sig åt alla håll med ' + vv + ' m/s.';
            }
        }
        function klart() {
            if (gissa) { visaInfo(); svarIn.disabled = false; svarBtn.disabled = false; try { svarIn.focus({ preventScroll: true }); } catch (e) {} return; }
            var t = tS(), tR = Math.round(t * 10) / 10;
            var txt = 'Ljudet behövde ' + f(t, 1) + ' s för ' + f(s, 1) + ' km, alltså ungefär ' +
                f(t / s, 1) + ' s per kilometer. Tumregeln ger ' + f(tR, 1) + ' s / 3 ≈ ' +
                f(tR / 3, 1) + ' km.';
            if (typ === 'blixt') {
                txt += ' Mullret varar länge eftersom ljudet skapas längs hela blixten. Ljudet från blixtens topp, ' +
                    f(hKanal(), 1) + ' km upp, har ' + f(sTopp(), 1) + ' km att gå och kommer fram ' +
                    f(tSista() - t, 1) + ' s senare.';
            }
            info.innerHTML = txt;
        }

        // ── Kontroller ────────────────────────────────────────────────────
        function syncVal() {
            // ryms inte källan till vänster flyttas personen åt höger
            if (x0() < XMIN) xo = Math.min(XMAX, XMIN + sh() * PXKM);
            gS.sl.min = String(sMin());
            if (s < sMin()) s = sMin();
            gS.sl.value = String(s);
            gS.val.textContent = f(s, 1) + ' km';
            gT.val.textContent = f(T, 0) + ' °C, v = ' + Math.round(v()) + ' m/s';
            startBtn.textContent = typ === 'fyr' ? 'Skjut upp raketen' : 'Blixten slår ned';
            blixtBtn.classList.toggle('ms-vald', typ === 'blixt');
            fyrBtn.classList.toggle('ms-vald', typ === 'fyr');
        }
        startBtn.addEventListener('click', starta);
        blixtBtn.addEventListener('click', function () { typ = 'blixt'; syncVal(); nollstall(); });
        fyrBtn.addEventListener('click', function () { typ = 'fyr'; syncVal(); nollstall(); });
        snabbCb.addEventListener('change', function () { snabb = snabbCb.checked; });
        gS.sl.addEventListener('input', function () { s = parseFloat(gS.sl.value); syncVal(); nollstall(); });
        gT.sl.addEventListener('input', function () {
            T = parseFloat(gT.sl.value); syncVal();
            if (tEv === null || hord) { nollstall(); } else visaInfo();
        });

        // gissa-läget
        function fraga() { return typ === 'fyr' ? 'Hur långt bort brast fyrverkeriet?' : 'Hur långt bort slog blixten ned?'; }
        // "Ny omgång" syns hela tiden i gissningsläget, så att man kan hoppa
        // över en omgång utan att gissa. Ett hoppat försök räknas inte.
        var runda = 0;
        function gissaRunda() {
            var denna = ++runda;
            tystna();
            gissa = true; gissaKlar = false;
            // Ungefär var fjärde blixt slår ned riktigt nära (0,3–0,8 km), med
            // stor blixt och kraftig knall. Övriga 0,8–6,0 km.
            if (typ === 'blixt' && Math.random() < 0.25) s = Math.round((SMIN + Math.random() * 0.5) * 10) / 10;
            else s = Math.round((0.8 + Math.random() * 5.2) * 10) / 10;
            xo = XO;
            fpX = 130 + Math.random() * (W - 260);
            gnistor = []; fpBolt = null;
            svar.querySelector('.ms-bl-fraga').textContent = fraga();
            syncVal();
            [startBtn, blixtBtn, fyrBtn, gissaBtn].forEach(function (b) { b.style.display = 'none'; });
            gS.rad.style.display = 'none';
            gT.sl.disabled = true;
            svar.style.display = '';
            svarIn.value = ''; svarIn.disabled = true; svarBtn.disabled = true;
            svarBtn.style.display = ''; nyBtn.style.display = '';
            tEv = null; hord = false; pop = 0; rita();
            info.textContent = typ === 'fyr' ? 'Titta mot horisonten …' : 'Titta på himlen …';
            setTimeout(function () { if (gissa && !gissaKlar && denna === runda) starta(); }, 900 + Math.random() * 900);
        }
        function avslutaGissa() {
            runda++;
            tystna();
            gissa = false; gissaKlar = false;
            [startBtn, blixtBtn, fyrBtn, gissaBtn].forEach(function (b) { b.style.display = ''; });
            gS.rad.style.display = '';
            gT.sl.disabled = false;
            svar.style.display = 'none';
            syncVal(); nollstall();
        }
        function bedom() {
            var g = parseFloat(String(svarIn.value).replace(',', '.').replace(/\s/g, ''));
            if (!isFinite(g)) { svarIn.focus(); return; }
            forsok++;
            var ok = Math.abs(g - s) <= Math.max(0.3, 0.1 * s);
            if (ok) poang++;
            gissaKlar = true;
            gnistor = [];
            svarIn.disabled = true; svarBtn.style.display = 'none'; nyBtn.style.display = '';
            var t = tS(), tR = Math.round(t * 10) / 10, vv = Math.round(v());
            info.innerHTML = (ok ? '<b>Bra uppskattat.</b> ' : '<b>Inte riktigt.</b> ') +
                (typ === 'fyr' ? 'Fyrverkeriet brast ' : 'Blixten slog ned ') + f(s, 1) + ' km bort. <em>s</em> = <em>v</em> · <em>t</em> = ' +
                vv + ' m/s · ' + f(tR, 1) + ' s ≈ ' + f(vv * tR / 1000, 1) + ' km. ' +
                'Tumregeln ger ' + f(tR, 1) + ' / 3 ≈ ' + f(tR / 3, 1) + ' km. ' +
                'Poäng: ' + poang + ' av ' + forsok + '.';
            rita();
        }
        gissaBtn.addEventListener('click', gissaRunda);
        nyBtn.addEventListener('click', gissaRunda);
        avslutaBtn.addEventListener('click', avslutaGissa);
        svarBtn.addEventListener('click', bedom);
        svarIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') bedom(); });

        // dra i källan (nedslagsplatsen eller fyrverkeriet) eller i personen
        // längs marken; det man inte drar i står still
        var drar = null;
        function logX(e) {
            var r = canvas.getBoundingClientRect();
            return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
        }
        function naraKalla(p) { return Math.abs(p.x - x0()) < 26 && p.y > (typ === 'fyr' ? y0() - 40 : 90) && p.y < GY + 14; }
        function naraPerson(p) { return Math.abs(p.x - xo) < 20 && p.y > GY - 52 && p.y < GY + 14; }
        function nara(p) {
            if (gissa) return null;
            var a = naraKalla(p), b = naraPerson(p);
            if (a && b) return Math.abs(p.x - xo) < Math.abs(p.x - x0()) ? 'person' : 'kalla';
            return b ? 'person' : (a ? 'kalla' : null);
        }
        canvas.addEventListener('pointerdown', function (e) {
            var p = logX(e);
            var vad = nara(p);
            if (!vad) return;
            drar = vad;
            try { canvas.setPointerCapture(e.pointerId); } catch (er) {}
            e.preventDefault();
        });
        canvas.addEventListener('pointermove', function (e) {
            var p = logX(e);
            if (!drar) { canvas.style.cursor = nara(p) ? 'grab' : 'default'; return; }
            canvas.style.cursor = 'grabbing';
            var h = hojd(), shN, sN;
            if (drar === 'person') {
                // källan står still, personen flyttas och avståndet följer med
                var kx = x0();
                shN = Math.max(0, (Math.min(XMAX, p.x) - kx) / PXKM);
                sN = Math.sqrt(shN * shN + h * h);
                s = Math.round(Math.max(sMin(), Math.min(SMAX, sN)) * 10) / 10;
                xo = Math.min(XMAX, kx + sh() * PXKM);
                s = Math.round(Math.sqrt(Math.pow((xo - kx) / PXKM, 2) + h * h) * 10) / 10;
            } else {
                shN = Math.max(0, (xo - Math.max(XMIN, p.x)) / PXKM);
                sN = Math.sqrt(shN * shN + h * h);
                s = Math.round(Math.max(sMin(), Math.min(SMAX, sN)) * 10) / 10;
            }
            syncVal();
            nollstall();
        });
        function slapp() { drar = null; canvas.style.cursor = 'default'; }
        canvas.addEventListener('pointerup', slapp);
        canvas.addEventListener('pointercancel', slapp);
        canvas.style.touchAction = 'pan-y';

        window.addEventListener('resize', function () { if (!loop.igang()) rita(); });
        document.addEventListener('fullscreenchange', function () { setTimeout(rita, 60); });
        document.addEventListener('webkitfullscreenchange', function () { setTimeout(rita, 60); });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!loop.igang()) rita(); });

        syncVal();
        visaInfo();
        rita();
    }

    var TYPES = { tomtebloss: buildTomtebloss, centrifug: buildCentrifug,
                  stegkast: buildStegkast,
                  svangningsgrafer: buildSvangningsgrafer,
                  periodtid: buildPeriodtid,
                  pendelperiod: buildPendelperiod,
                  hjulprojektion: buildHjulprojektion,
                  'kopplade-fjadrar': buildKoppladeFjadrar,
                  cirkularrorelse: buildCirkularrorelse,
                  kastvektorer: buildKastvektorer,
                  koniskpendel: buildKoniskpendel,
                  snettkast: buildSnettkast,
                  skjutochslapp: buildSkjutochslapp,
                  kanonvagn: buildKanonvagn,
                  eulersdisk: buildEulersdisk,
                  fjaderpendel: buildFjaderpendel, skiftnyckel: buildSkiftnyckel,
                  valtning: buildValtning, gaffelbalans: buildGaffelbalans,
                  gaffelbalans3d: buildGaffelbalans3d,
                  dubbelkon: buildDubbelkon,
                  linjal: buildLinjal, linjaltrio: buildLinjaltrio,
                  fodelsedag: buildFodelsedag, talmangder: buildTalmangder,
                  magnetpoler: buildMagnetpoler, magnetdelning: buildMagnetdelning,
                  galton: buildGalton, kalkylblad: buildKalkylblad,
                  lodlinje: buildLodlinje,
                  vinkelrata: buildVinkelrata, pennprovet: buildPennprovet,
                  vagstallning: buildVagstallning, pulsvag: buildPulsvag, vagtyp: buildVagtyp,
                  ytvag: buildYtvag, fasvag: buildFasvag,
                  staendevag: buildStaendevag, gitarrton: buildGitarrton,
                  snurrslang: buildSnurrslang, pipton: buildPipton, provror: buildProvror,
                  varmekansla: buildVarmekansla, smaltrace: buildSmaltrace,
                  blixtljud: buildBlixtljud };

    function decodeSrc(b64) {
        try { return decodeURIComponent(escape(atob(b64))); }
        catch (e) { try { return atob(b64); } catch (e2) { return ''; } }
    }

    function mountAll(root) {
        if (!root) return;
        var nodes = root.querySelectorAll('.lab-minisim[data-minisim-src]:not([data-minisim-mounted])');
        if (nodes.length) injectCss();
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            node.setAttribute('data-minisim-mounted', '1');
            // Översätts även när teorin runt omkring är märkt .no-i18n (i18n.js).
            node.classList.add('i18n-ja');
            var cfg = parseConfig(decodeSrc(node.getAttribute('data-minisim-src')));
            var build = cfg.typ && TYPES[cfg.typ];
            if (!build) { node.textContent = 'Okänd minisimulering.'; continue; }
            try { build(node, cfg); }
            catch (e) { node.textContent = 'Kunde inte bygga minisimuleringen.'; }
        }
    }

    window.FYSIKMINISIM = { mountAll: mountAll, parseConfig: parseConfig };
})();
