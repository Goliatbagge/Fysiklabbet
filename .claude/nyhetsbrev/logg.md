# Nyhetsbrevslogg

Ett inlägg per brev, nyast överst. Skrivs av `nyhetsbrev`-agenten i steg 7.

Format:

```
## ÅÅÅÅ-MM-DD — "Ämnesrad"
- Nyheter: <artikel-id:n som togs med>
- Nytt på sajten: <punkterna i korthet>
- Teaser: <vad som utlovades inför nästa vecka>
```

## 2026-08-16 — "Kraftverket var avstängt. Ändå kom neutrinerna."
- Status: utkast skrivet lördag 2026-08-15 (den schemalagda körningen samma
  morgon misslyckades — molnsessionen saknade repo-åtkomst), för utskick
  söndag 2026-08-16 kl 17.00. Brevperiod 2026-08-03 till 2026-08-15, alltså
  TVÅ veckor, eftersom brevet 2026-08-09 aldrig skickades.
- Nyheter: 2026-08-15-spokglod-fran-avstallt-karnkraftverk (hjälte),
  2026-08-14-diamant-i-flytande-kol + 2026-08-11-spegeln-som-ljuger
  (miniatyrer); rugbybollen i atomkärnan, magnetiska tratten och solvirvlarna
  som textlänkar. Bortvalda denna gång: bromsade atomkärnor, fusion i metall,
  rubin/mörk materia, kvantlabb i fritt fall, svävande magnet, flygande fokus,
  solförmörkelseartikeln (den ligger i stället bakom sajtpunkten om
  simuleringen).
- Nytt på sajten: solförmörkelsesimuleringen + förmörkelserna i genomgången om
  månens faser (med skärmdump), Matematik nivå 1b, pennlösningar till alla
  exempel i Fysik 1 och 2 samt Matematik 1c, och en "kort och gott"-rad med
  magnetism-simuleringarna, Flyta eller sjunka, resonans, tomteblosset,
  enhetskollen och de 36 nya kraftövningarna.
- Bilder: nedskalade brevkopior av tre nyhetsbilder
  (nyheter/brev/2026-08-16-spokglod-hero.jpg, -diamant.jpg, -spegeln.jpg;
  originalen var 250–730 kB styck, för tunga för ett mejl) samt ny skärmdump
  nyheter/brev/2026-08-16-solformorkelse-totalitet.jpg (totaliteten med korona,
  stjärnor och Venus, reglagepanelen ihopfälld).
- Veckans tips: fullskärmsläget i simuleringarna (krok: terminsstart,
  projektor)
- Teaser: PeVatron-uppslaget i nyhetskön (objektet i Örnen som accelererar
  protoner)
- OBS: 634 ord brödtext, samma längd som förra utkastet — motiverat av att
  brevet täcker två veckor. Miljönot: CDN:erna (unpkg, Tailwind) var blockerade
  i molnsessionen, så React-simuleringarna renderade inte förrän react/react-dom/
  babel hämtats via npm och lagts i .shots/vendor/ med CDN-URL:erna
  ompekade i en temporär kopia av sim-sidan. Skärmdumpen togs med playwright
  (globalt installerat), inte med chrome --screenshot, som bara gav tom scen.

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
