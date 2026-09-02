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
 *           magnetpoler, magnetdelning
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
 * utgör centripetalkraften) och Loop (bilen från sidan — normalkraften och
 * tyngdkraften utgör tillsammans centripetalkraften). Kortets verktyg
 * (Pausa/Fortsätt, Börja om och fartglidaren, som byter roll med
 * situationen) styr sidan med postMessage; sidan rapporterar tillbaka sitt
 * läge, och info-raden visar aktuell centripetalkraft (cirkelbanan)
 * respektive gränsfarten längst ned (loopen). FULLSKÄRM startas med
 * scenens egen .fs-btn inne i iframen och ger exakt originalsimuleringens
 * fullskärmsläge med alla verktyg.
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
        /* typ: kastvektorer — hjälpfiguren i fy2-1.8 med tre lager som
           kryssrutorna tänder och släcker. Kortet är bredare (ms-bred) så
           att figuren får sin fulla bredd (593 px) och etiketterna sin
           storlek. */
        '.minisim-card.ms-bred{max-width:664px;}',
        '.ms-kv-scene{background:linear-gradient(180deg,#f7f2e8,#ece3d2);padding:8px 4px 4px;}',
        '.ms-kv-svg{display:block;width:100%;max-width:593px;height:auto;margin:0 auto;font-style:normal;}',
        '.ms-kv-lager{transition:opacity .2s ease;}',
        '.ms-kv-lager.ms-dold{opacity:0;visibility:hidden;}',
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
            sliderVal.textContent = fmt(parseFloat(slider.value), 1) + ' varv/s';
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
            info.textContent = 'Varvtal: ' + fmt(Math.abs(omega) / (2 * Math.PI), 1) + ' varv/s';
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
            sliderVal.textContent = fmt(parseFloat(slider.value), 1) + ' varv/s';
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
            info.textContent = 'Varvtal: ' + fmt(Math.abs(omega) / (2 * Math.PI), 1) +
                ' varv/s · Vatten: ' + Math.round(wet * 100) + ' %';
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
        var vChk = makeCheck('Visa hastighet', true, COL_V);
        var aChk = makeCheck('Visa acceleration', true, COL_A);
        var slowChk = makeCheck('Ultrarapid', false, null);

        toggles.appendChild(vChk.lbl);
        toggles.appendChild(aChk.lbl);
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

        function drawVectors() {
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
        vChk.cb.addEventListener('change', function () { render(); });
        aChk.cb.addEventListener('change', function () { render(); });
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
        iframe.src = 'fysik2-gaffelbalans-app.html?embed=1&mini=1';
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
        iframe.src = 'fysik2-dubbelkon-app.html?embed=1&mini=1';
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
    // (bilen sedd rakt uppifrån) och Loop (bilen från sidan). Kortets
    // verktyg (Pausa/Fortsätt, Börja om, fartglidaren) styr sidan med
    // postMessage, och sidan rapporterar tillbaka sitt läge: i cirkelbanan
    // visar info-raden aktuell centripetalkraft, i loopen gränsfarten
    // längst ned. FULLSKÄRM startas med scenens egen .fs-btn INNE i
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
        iframe.src = 'fysik2-cirkular-rorelse-app.html?embed=1&mini=1';
        // scenens viewBox är 820×540 — låt iframen ha samma proportion så
        // att SVG:n fyller ytan utan brevlådekanter
        iframe.style.aspectRatio = '820 / 540';
        iframe.setAttribute('allowfullscreen', '');
        iframe.allow = 'fullscreen';
        iframe.loading = 'lazy';
        iframe.title =
            'Simulering: en bil kör med konstant fart i en cirkelbana, sedd ' +
            'rakt uppifrån — kraftpilen pekar hela tiden in mot centrum. ' +
            'Växlaren uppe till höger byter till en loop sedd från sidan. ' +
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
        var lage = 'cirkel';            // 'cirkel' | 'loop'
        var sistaV = 8, sistaV0 = 21;   // senast valda fart per situation
        var running = true;

        var vaxel = document.createElement('div');
        vaxel.className = 'ms-sitvaxel';
        var cirkelBtn = document.createElement('button');
        cirkelBtn.type = 'button';
        cirkelBtn.textContent = 'Cirkelbana';
        var loopBtn = document.createElement('button');
        loopBtn.type = 'button';
        loopBtn.textContent = 'Loop';
        vaxel.appendChild(cirkelBtn);
        vaxel.appendChild(loopBtn);
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
        sliderRow.appendChild(sliderLbl);
        sliderRow.appendChild(slider);
        sliderRow.appendChild(sliderVal);
        card.appendChild(sliderRow);
        node.appendChild(card);

        function visaFart(v) { sliderVal.textContent = fmt(v, 1) + ' m/s'; }

        // Ställer om växlare, glidare och etikett efter situationen —
        // används både vid klick här och när läget byts inne i iframen
        // (fullskärmens radioknappar).
        function visaLage() {
            cirkelBtn.classList.toggle('ms-aktiv', lage === 'cirkel');
            loopBtn.classList.toggle('ms-aktiv', lage === 'loop');
            if (lage === 'cirkel') {
                sliderLbl.textContent = 'Banhastighet';
                slider.min = '2'; slider.max = '15';
                slider.value = String(sistaV);
                slider.setAttribute('aria-label',
                    'Banhastighet i meter per sekund — större fart kräver ' +
                    'större centripetalkraft');
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
            running = true;
            korBtn.textContent = 'Pausa';
            visaLage();
            sanda('situation', nytt);
        }
        cirkelBtn.addEventListener('click', function () { byt('cirkel'); });
        loopBtn.addEventListener('click', function () { byt('loop'); });

        slider.addEventListener('input', function () {
            var v = parseFloat(slider.value);
            visaFart(v);
            if (lage === 'cirkel') { sistaV = v; sanda('fart', v); }
            else { sistaV0 = v; sanda('fart0', v); }
        });

        visaLage();

        // Lägesrapporten från sidan i iframen → växlare, glidare, info-rad
        window.addEventListener('message', function (e) {
            if (e.source !== iframe.contentWindow) return;
            var st = e.data && e.data.fysikCirkularStatus;
            if (!st) return;
            if ((st.mode === 'cirkel' || st.mode === 'loop') && st.mode !== lage) {
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
                if (lage === 'cirkel' && isFinite(st.v) && Math.abs(st.v - sistaV) > 0.049) {
                    sistaV = st.v; slider.value = String(st.v); visaFart(st.v);
                } else if (lage === 'loop' && isFinite(st.v0) && Math.abs(st.v0 - sistaV0) > 0.049) {
                    sistaV0 = st.v0; slider.value = String(st.v0); visaFart(st.v0);
                }
            }
            if (lage === 'cirkel' && isFinite(st.FC)) {
                info.innerHTML = '<em>F</em><sub>C</sub> = ' + fmtT(st.FC) + ' N';
            } else if (lage === 'loop' && isFinite(st.vcrit)) {
                info.textContent = 'Gränsfart längst ned: ' + fmt(st.vcrit, 1) + ' m/s';
            }
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
        iframe.src = 'fysik2-rorelse-app.html?embed=1&mini=1';
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

    var TYPES = { tomtebloss: buildTomtebloss, centrifug: buildCentrifug,
                  cirkularrorelse: buildCirkularrorelse,
                  kastvektorer: buildKastvektorer,
                  snettkast: buildSnettkast,
                  eulersdisk: buildEulersdisk,
                  fjaderpendel: buildFjaderpendel, skiftnyckel: buildSkiftnyckel,
                  valtning: buildValtning, gaffelbalans: buildGaffelbalans,
                  gaffelbalans3d: buildGaffelbalans3d,
                  dubbelkon: buildDubbelkon,
                  linjal: buildLinjal, linjaltrio: buildLinjaltrio,
                  fodelsedag: buildFodelsedag, talmangder: buildTalmangder,
                  magnetpoler: buildMagnetpoler, magnetdelning: buildMagnetdelning };

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
            var cfg = parseConfig(decodeSrc(node.getAttribute('data-minisim-src')));
            var build = cfg.typ && TYPES[cfg.typ];
            if (!build) { node.textContent = 'Okänd minisimulering.'; continue; }
            try { build(node, cfg); }
            catch (e) { node.textContent = 'Kunde inte bygga minisimuleringen.'; }
        }
    }

    window.FYSIKMINISIM = { mountAll: mountAll, parseConfig: parseConfig };
})();
