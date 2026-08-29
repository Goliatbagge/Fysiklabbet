# Nyhetsbrevslogg

Ett inlägg per brev, nyast överst. Skrivs av `nyhetsbrev`-agenten i steg 7.

Format:

```
## ÅÅÅÅ-MM-DD — "Ämnesrad"
- Nyheter: <artikel-id:n som togs med>
- Nytt på sajten: <punkterna i korthet>
- Teaser: <vad som utlovades inför nästa vecka>
```

## 2026-08-30 — "Kallare än rymden, två kilometer ner"
- Status: **UPPLAGD i EmailOctopus 2026-08-29** som kampanjen "Nyhetsbrev nr 3 -
  2026-08-30" (avsändare Fysiklabbet <kontakt@fysiklabbet.se>, ämnesrad och
  preheader ur utkastet, HTML inklistrad med {{PreviewText}}-diven, alla tre
  bilder verifierade som laddade i förhandsvisningen). Listan har 17
  prenumeranter. Förhandsvisningen lämnades öppen vid "Send as test".
  ÅTERSTÅR för användaren: testskick och schemaläggning till söndag 06.00
  svensk tid (tidszonen default:ar till London!). Delivery står just nu på
  "Send immediately" och måste bytas till "Send at a specific time".
- Ordvits inlagd på användarens begäran 2026-08-29, efter flug-stycket:
  "har du hört om den senaste flugan? En flugsimulator." Skriven med punkt,
  inte utropstecken, enligt tonregeln om torr underdrift.
- Rättelse före uppladdning: `Bose&ndash;Einstein` i teaserstycket byttes mot
  bindestreck. verify-nyhetsbrev.js räknar varje en/em-streck som tankstreck,
  även när det binder ihop två namn.
- Status: UTKAST skrivet 2026-08-29 (lördag, inom 08.00-deadline). Tänkt
  utskick söndag 2026-08-30 kl 06.00 svensk tid. Brevperiod (nyheter)
  2026-08-24 till 2026-08-29; sajtuppdateringar sedan förra brevets datum
  2026-08-23. Skrivet i en molnsession utan tillgång till CDN:erna
  (unpkg/cdnjs/tailwind blockerade av organisationens nätverkspolicy, samma
  begränsning som 2026-08-23) — därför inga nya skärmdumpar av React-
  simuleringarna (flugan i bägaren, gaffelbalansen, dubbelkonen) denna
  vecka. Bildsättningen vilar helt på tre riktiga nyhetsfoton (hjälte +
  två miniatyrer); "Nytt på Fysiklabbet" är textlänkar utan bild.
  **588 ord, längre än riktlängden 250–450 — ovanligt innehållsrik vecka**
  (6 nyhetsartiklar i brevperioden i stället för sedvanliga 3–4, plus fyra
  sajtuppdateringar), samma typ av avvikelse som brevet 2026-08-09.
  **⚠️ FYND under arbetet, SEDAN LÖST:** sessionen körde på arbetsgrenen
  `claude/amazing-faraday-canq6g`, som vid start låg 74 commits FÖRE `main`
  (main:s HEAD var `bec51f0`, daterad 2026-08-24) — main saknade alltså
  nyhetsartiklarna 2026-08-25 till 2026-08-29 (fem av brevets sex
  artiklar, inklusive hjälten), `fysik2-dubbelkon-app.html`, delar av
  `fysik2-gaffelbalans-app.html`/`fysik1-flugan-i-bagaren-app.html`,
  Eulers disk-minisimen, fysikprovet Fysik 2 VT 2016, pennlösnings-
  kompletteringen (132/132) och teckenstorleks-glidaren, alltihop länkat
  i brevet. Under sessionens gång (efter ett `git fetch origin main`)
  visade det sig att arbetsgrenen redan hade mergats och forcepushats till
  `origin/main` av någon annan (main:s HEAD blev `007c3ec`, identiskt med
  sessionens egen HEAD) — så när nyhetsbrevsfilerna committades nedan
  fanns hela veckans innehåll redan på main. Kontrollera ändå själv, som
  sista säkerhetskoll före schemaläggning, att de tre nya bilderna i
  `nyheter/brev/` och utkastfilen faktiskt syns på fysiklabbet.se.
- Nyheter: 2026-08-29-jakten-under-jorden (hjälte — dagens artikel,
  publicerad 03:15 samma morgon, obligatorisk enligt uppdraget),
  2026-08-28-gungan-som-gar-runt + 2026-08-27-ljudet-som-lyfter
  (miniatyrer). Läs även: 2026-08-26-vakuumet-som-hjalper-till,
  2026-08-25-vagfunktionen-fotograferad, 2026-08-24-kvantmikroskopet
  (samtliga listade, ingen artikel utelämnad).
- Nytt på sajten: Flugan i bägaren (ny simulering, Newtons tredje lag,
  fy1-3.3, Förutsäg-läge), balanstricken i Mer kraftmoment (gaffelbalansen
  + dubbelkonen, båda 3D), fysikprovet Fysik 2 VT 2016 och milstolpen
  132/132 pennlösningar på de nationella proven, samt teckenstorleks-
  glidaren i presentationsläget (planerat.md, lanserad 2026-08-28,
  avklarad genom detta brev).
- Bilder: nyheter/brev/2026-08-30-detektor-hero.jpg (beskuren från
  nyheter/bilder/2026-08-29-jakten-under-jorden.jpg, 60 kB),
  -kiiking-thumb.jpg och -levitation-thumb.jpg (kvadratiska miniatyrer ur
  veckans nyhetsbilder, 33+37 kB). Inga simuleringsskärmdumpar, se status
  ovan.
- Veckans tips: inbäddade filmer i teorin (senast "tipsad" 2026-08-09, men
  det brevet skickades aldrig, så tipset var osagt). Länkad till
  fy2-2.6 (Resonans, Tacoma Narrows-bron) i stället för standardlänken
  fy1-2.4, som en tematisk brygga till veckans gung-/resonansartikel.
- Teaser: nyhetskö-uppslaget om Bose–Einstein-kondensatet av polära
  molekyler (natrium–rubidium, Dajun Wangs grupp), avslutat med "Vi läser
  på." Uppslaget flyttat till toppen av ko.md och märkt med teaser-skuld,
  publiceras senast onsdag 2026-09-02. Ingen egen sajt-/simulerings-teaser
  denna vecka (brevet var redan långt).
- ÅTERSTÅR: användarens granskning, testskick och schemaläggning i
  EmailOctopus (kom ihåg tidszonen, default London, 06.00 där blir 07.00
  svensk tid). Se fyndet ovan om huvudgrenen för en sista länkkontroll.
- OBS: `SendUserFile`-verktyget fanns inte i den här molnsessionen (varken
  direkt eller sökbart bland deferred tools) — förhandsvisningen visades i
  stället inline i sessionen (Read-verktyget på den beskurna JPEG:en,
  680 px bred). Filen ligger kvar lokalt i sessionens scratchpad, inte i
  repot. Om ett SendUserFile-liknande verktyg finns tillgängligt för
  användaren i den vanliga klienten bör förhandsvisningen skickas därifrån.

## 2026-08-23 — "Neonkärnan är formad som en kägla"
- Status: UTKAST skrivet 2026-08-22 (lördag, klart gott om marginal före 08.00-deadline).
  Tänkt utskick söndag 2026-08-23 kl 06.00 svensk tid. Brevperiod (nyheter)
  2026-08-17 till 2026-08-22; sajtuppdateringar sedan förra utkastets datum
  2026-08-16 (git log --since="2026-08-16", eftersom föregående brev redan
  frystes innan de sista 08-16-commiten hann med). Skrivet i en molnsession
  utan tillgång till CDN:erna (jsdelivr/unpkg/cdnjs blockerade av
  organisationens nätverkspolicy) — därför inga nya skärmdumpar av
  React/Three.js-simuleringar denna vecka (försök gjordes på
  fysik2-neutronstjarna.html men canvasen renderade tomt utan Three.js).
  Bildsättningen vilar i stället helt på riktiga nyhetsfoton, vilket gav ett
  starkt resultat ändå (ALICE-detektorns röda magnet som hjältebild).
- Nyheter: 2026-08-22-lilla-smallen (hjälte — dagens artikel, publicerad
  03:15 samma morgon, obligatorisk enligt uppdraget), 2026-08-19-tomrummets-dubbelbrytning
  + 2026-08-17-gluonknuten-i-protonen (miniatyrer). Bortvalda: 2026-08-21-infrarod-farg
  och 2026-08-20-ljusslutaren (båda AI-illustrerade och tunnare på egen krok
  för gymnasiefysiken), 2026-08-18-tredjedels-laddning (kvantfysik låg nära
  gluonknuten tematiskt, en av de två fick stryka på foten).
- Nytt på sajten: Neutronstjärnan i skala (ny 3D-simulering i fy2-5.5,
  Svarta hål — jorden och en skalenlig neutronstjärna, kameraflygning,
  huvudpunkten med CTA-knapp), 64 interaktiva teori-figurer i matematiken
  (alla fem nivåer, peka/tryck-interaktion), fördjupningskortets nya
  interaktiva födelsedagskurva (uppfyller planerat.md-punkten om att
  fördjupningen hör hemma i "Nytt på sajten"), solförmörkelseartikelns
  interaktiva karta ort för ort. Bortvalt: sim-växlaren mellan Cirkulär
  rörelse/Tomtebloss (för litet för att ta plats bredvid de fyra andra).
- Bilder: nyheter/brev/2026-08-23-alice-detektor-hero.jpg (beskuren från
  nyheter/bilder/2026-08-22-lilla-smallen.jpg, 137 kB), -magnetar-thumb.jpg
  och -star-detektor-thumb.jpg (miniatyrer ur befintliga nyhetsbilder,
  25+59 kB). Inga nya skärmdumpar denna vecka, se status ovan.
- Veckans tips: exit tickets (senast tipsad 2026-08-09, men det brevet
  skickades aldrig — tipset var alltså osagt sedan tidigare. Krok:
  terminsstart, "kolla att genomgången satt"). Länkad till fy1-9.1 (Atomkärnan)
  som en tematisk brygga till veckans kärnfysiknyheter.
- Teaser: fler fördjupningar på gång i matematik och fysik (öppen
  formulering, belagd i planerat.md, inget datumlöfte). Ingen
  nyhetskö-teaser denna vecka, så "Vi läser på."-signaturen används inte.
- ÅTERSTÅR: användarens granskning + godkännande, ny push av bilderna i
  nyheter/brev/ till main (denna gren har ~40 andra opushade commits som
  mergas separat), testskick och schemaläggning i EmailOctopus (kom ihåg
  tidszonen — default London, 06.00 där blir 07.00 svensk tid).

## 2026-08-23 — "Neonkärnan är formad som en kägla"
- Status: UPPLAGD i EmailOctopus 2026-08-22 som kampanjen "Nyhetsbrev nr 2 -
  2026-08-23" (avsändare Fysiklabbet <kontakt@fysiklabbet.se>, ämnesrad +
  preheader ur utkastet, HTML inklistrad med {{PreviewText}}-div, alla tre
  bilder verifierade i förhandsvisningen). Listan har vuxit från 4 till **16**
  prenumeranter. ÅTERSTÅR för användaren: schemaläggning till söndag 06.00
  svensk tid (tidszonen default:ar till London!).
- Nyheter: 2026-08-22-lilla-smallen (hjälte),
  2026-08-19-tomrummets-dubbelbrytning + 2026-08-17-gluonknuten-i-protonen
  (miniatyrer). **Nytt upplägg från och med detta brev:** exakt TRE nyheter
  lyfts, och veckans övriga listas som korta klickbara rader under "Läs även"
  — här 2026-08-21-infrarod-farg, 2026-08-20-ljusslutaren,
  2026-08-18-tredjedels-laddning och 2026-08-16-protonaccelerator-i-ornen
  (den sista infriar förra brevets PeVatron-teaser). Regeln är inskriven som
  punkt 3 i "Brevets delar" i .claude/agents/nyhetsbrev.md.
- Nytt på sajten: neutronstjärnesimuleringen (jorden och neutronstjärnan i
  samma skala, med flyg-till-knapp), 64 interaktiva teori-figurer i
  matematiken, födelsedagsparadoxens fördjupning med dragbar kurva, och
  solförmörkelseartikelns interaktiva Sverigekarta.
- Bilder: nyheter/brev/2026-08-23-alice-detektor-hero.jpg (134 kB),
  -magnetar-thumb.jpg (24 kB) och -star-detektor-thumb.jpg (57 kB).
- Veckans tips: exit tickets (krok: terminen i full gång).
- Teaser: (1) fler fördjupningar på gång i både matematiken och fysiken
  (öppen formulering, ur planerat.md); (2) NYHETSUPPSLAG: ramsläpningen,
  jorden som vrider rumtiden med sig, mätt till ett par tiondels procent
  (LARES-2/LAGEOS, Ciufolini m.fl., Nature 655, 332–335). Avslutas med
  signaturen "Vi läser på." **TEASER-SKULD: nyhetsagenten måste publicera
  uppslaget senast onsdag 2026-08-26.** Posten ligger överst i ko.md,
  märkt [BREVTEASER].
- **Kedjefel upptäckt 2026-08-22:** brevet hade först INGEN nyhetsteaser och
  därmed ingen "Vi läser på." — sajt-teasern om fördjupningarna räknades som
  uppfylld punkt 6. Orsak: nyhetsagenten hade ingen plikt att peka ut ett
  uppslag åt brevet, och brevagentens teaser var formellt valfri. Åtgärdat i
  tre lager: steg 2b i nyhetsagent.md (märk alltid ett uppslag [BREVTEASER]),
  obligatorisk nyhetsteaser i punkt 6 i nyhetsbrev.md, och den nya
  .claude/verify-nyhetsbrev.js som fäller brev utan "Vi läser på.".
- Användarens ändringar 2026-08-22 efter första genomläsningen: kortare
  anslag, "komplext talplan" i stället för "Argand-diagram", bråklänken
  flyttad från ma1c-1.1 till ma1c-1.2, och "du har väl inte glömt" i tipset.
- **Anslaget skärpt 2026-08-22 (efter att kampanjen redan lagts upp):**
  "tomrummet inte är tomt" var ingen nyhet (vakuumfluktuationer är
  läroboksstoff) och byttes mot det som faktiskt mättes, "tomrummet självt
  bryter ljus när magnetfältet blir starkt nog"; andra ledet fick "rund
  inuti". **Kampanjen i EmailOctopus har därmed gammal HTML** och måste
  uppdateras i Content-steget innan testskick och schemaläggning.

## 2026-08-16 — "Reaktorn var avstängd. Detektorn såg den ändå."
- Status: SCHEMALAGT i EmailOctopus för söndag 2026-08-16 kl 06.00 svensk tid
  (användaren valde 06.00 i stället för 17.00: morgonpigga läser i lugn och ro
  inför måndagen — detta är ny standardtid framåt). Brevperiod 2026-08-03
  till 2026-08-15, alltså TVÅ veckor, eftersom brevet 2026-08-09 aldrig
  skickades. **Detta är det första brev som faktiskt går ut till
  prenumeranter** (2026-08-02 var ett testbrev, 2026-08-09 ställdes in) —
  därför är brevet skrivet som ett premiärbrev: sidhuvudet säger "Nyhetsbrev
  nr 1", anslaget välkomnar och önskar god start på läsåret, och avslutet
  tackar för att man blev en av de första.
- Två konkurrerande utkast fanns för samma datum: ett som pushades
  2026-08-15 (commit 9570885) och ett som kom in som patch. Patchversionen
  valdes, eftersom den pushade öppnade med "Sedan förra brevet har det hunnit
  gå två veckor ... fylligare än vanligt", vilket är obegripligt för en läsare
  som aldrig fått ett brev. Två saker återfördes dock från den pushade
  versionen: hjältebilden pekar på den nedskalade brevkopian
  (nyheter/brev/2026-08-16-spokglod-hero.jpg, 101 kB) i stället för originalet
  i nyheter/bilder/ (246 kB, för tungt för ett mejl), och sidfoten säger
  "simuleringar, teori och övningar i fysik och matematik" i stället för
  "fysiksimuleringar för gymnasiet" — brevets egen toppnyhet är ju att
  matematiken fått en nivå till.
- Nyheter: 2026-08-15-spokglod-fran-avstallt-karnkraftverk (hjälte),
  2026-08-14-diamant-i-flytande-kol + 2026-08-13-rugbybollen-i-atomkarnan
  (miniatyrer). Bortvalda denna gång: spegeln som ljuger, magnetiska tratten,
  solvirvlarna, bromsade atomkärnor, fusion i metall, rubin/mörk materia,
  kvantlabb i fritt fall, svävande magnet, flygande fokus,
  solförmörkelseartikeln (den ligger i stället bakom sajtpunkten om
  simuleringen).
- Nytt på sajten: Matematik nivå 1b leder sektionen med egen rubrik och knapp
  (5 kapitel, 54 avsnitt — kontrollerat mot katalogen), sedan
  solförmörkelsesimuleringen med skärmdump, pennlösningarna till alla exempel
  i Fysik 1 och 2 samt Matematik 1c, och en "kort och gott"-rad med
  stavmagneten, Flyta eller sjunka, resonansen och enhetskollen.
- Bilder: nyheter/brev/2026-08-16-spokglod-hero.jpg (från förra utkastet),
  -omega-laserhall.jpg, -tjerenkovglod.jpg och -solformorkelse.jpg (24 sekunder
  före totaliteten). Kvar i mappen men OANVÄNDA av det här brevet:
  -diamant.jpg, -spegeln.jpg och -solformorkelse-totalitet.jpg, som hörde till
  det bortvalda utkastet.
- Veckans tips: sökrutan (krok: länka en elev rakt in i rätt avsnitt mitt i en
  lektion). Fullskärmsläget, som var tips i det bortvalda utkastet, är alltså
  fortfarande osagt.
- Teaser: PeVatron-uppslaget i nyhetskön (objektet i Örnen som accelererar
  protoner)
- EmailOctopus: kampanjen "Nyhetsbrev nr 1 - 2026-08-16" upplagd 2026-08-15
  (avsändare Fysiklabbet <kontakt@fysiklabbet.se>, ämnesrad + preheader ur
  utkastet, HTML inklistrad med {{PreviewText}}-div, alla fyra bilder
  verifierade i förhandsvisningen). ÅTERSTÅR för användaren: testskick +
  schemaläggning (tidszonen default:ar till London!). Schemalagt av
  användaren 2026-08-15 till söndag 06.00.
  Flödet är dokumenterat som slash-kommandot /brev-till-octopus.

## 2026-08-09 — "Solytan har fransar — och en magnet som svävar"
- Status: **ALDRIG SKICKAT.** Skrevs för utskick söndag 2026-08-09 kl 17.00,
  men användaren avstod eftersom listan ännu inte hade några prenumeranter.
  **Konsekvenser för nästa brev:** (1) ingen har sett detta innehåll, så
  brevperioden börjar 2026-08-03 (dagen efter förra brevet) och inte
  2026-08-10 — magnetism-simuleringarna, Flyta eller sjunka, tomteblosset,
  resonansen, enhetskollen och filmerna är alltså fortfarande osagda;
  (2) teasern nedan är inte utlovad till någon och behöver inte följas upp;
  (3) återanvänds text härifrån måste den skrivas om utan tankstreck
  (regeln infördes 2026-08-09, se agentens instruktioner) — ämnesraden och
  brödtexten nedan bryter mot den.
- Nyheter: 2026-08-07-virvlar-pa-solens-yta (hjälte), 2026-08-08-svavande-magnet
  + 2026-08-05-rubin-mork-materia (miniatyrer); bromsade atomkärnor, fusion i
  metall, kvantlabb i fritt fall som textlänkar
- Nytt på sajten: två magnetism-simuleringar (stavmagnetens fält + attraktion och
  repulsion, med skärmdump), Flyta eller sjunka ombyggd (flytkarta + gissa-läge),
  tomtebloss-minisimen (uppfyller förra veckans teaser), resonans-simuleringen,
  enhetskoll per kapitel, de inbäddade filmerna (Apollo 15 + Tacoma Narrows)
- Bilder: nyhetsbilderna (live) + nyheter/brev/2026-08-09-stavmagnet-falt.jpg
  (skärmdump med fältlinjer, kompassnålar och järnfilspån samtidigt) och
  nyheter/brev/2026-08-09-svavande-grafit.jpg (beskuren ur artikelns andra bild)
- Veckans tips: exit tickets (krok: skolstarten)
- Teaser: PeVatron-uppslaget i nyhetskön (objektet i Örnen som accelererar protoner)
- OBS: 634 ord, längre än riktlängden 250–450 — ovanligt innehållsrik vecka

## 2026-08-02 — "Berg som rinner och en galax som aldrig tar slut"
- Status: TESTBREV (skrivet 2026-08-04 i efterhand, som exempel på formatet)
- Nyheter: 2026-08-02-viskositetens-ovre-grans (hjälte), 2026-08-01-storsta-galaxen
  + 2026-07-28-ljusets-envagsgata (miniatyrer); tidskristall, spegelvärld,
  hattform, zink-70 som textlänkar
- Nytt på sajten: pennlösningar (handskrift, med skärmdump), begreppsordlistan
  + teoriavsnittens egna adresser, "För läraren"-rutan, nyhetsbrevets premiär
- Bilder: nyhetsbilderna (live) + nyheter/brev/2026-08-02-pennlosning-karusell.jpg
- Veckans tips: repetitionspaketen (krok: skolstarten)
- Teaser: tomtebloss-minisimen i fy2-1.4 (skeppad 2026-08-03 — uppfylld)
