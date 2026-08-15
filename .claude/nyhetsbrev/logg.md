# Nyhetsbrevslogg

Ett inlägg per brev, nyast överst. Skrivs av `nyhetsbrev`-agenten i steg 7.

Format:

```
## ÅÅÅÅ-MM-DD — "Ämnesrad"
- Nyheter: <artikel-id:n som togs med>
- Nytt på sajten: <punkterna i korthet>
- Teaser: <vad som utlovades inför nästa vecka>
```

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
