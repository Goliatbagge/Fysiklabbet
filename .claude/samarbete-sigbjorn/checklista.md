# Simuleringar till Sigbjørn Hals bok (Fysikk 1)

Sigbjørn skickade 2026-10-26 bokens innehållsförteckning (7 kapitel, 40
delkapitel) och bad om resurser till så många delkapitel som möjligt. Målet
(beslut 2026-10-27): **varje delkapitel ska ha en egen simuleringssida på
Fysiklabbet**, och vi fyller luckorna en i taget. Sigbjørn anpassar själv
färger och typsnitt till bokens appar, märker dem med Sams namn och
översätter till bokmål, så simuleringarna byggs på svenska som vanligt.

Ribban: snygga, moderna, enkla att använda och byggda för att eleven ska
lära sig något. 3D bara när det tillför något, annars 2D.

Bocka av med `[x]`. Varje simulering går igenom hela processen längst ned
innan den räknas som klar.

---

## Del 1: Nya simuleringar (luckorna)

Ordningen är förslaget att arbeta i. Fysiklabbet-avsnittet är där
simuleringen länkas i katalogen och vars beteckningar den ska följa.

| # | Bokens delkapitel | Fysiklabbet-avsnitt | Idé (preliminär) | 2D/3D | Klar |
|---|---|---|---|---|---|
| 1 | 5.1 Arbeid | fy1-4.1 Energi, intro och arbete | Dra en låda med en kraft som kan vinklas: *W* = *F* · *s* · cos *α*, arbetet som area under *F*–*s*-grafen, nollarbete när kraften är vinkelrät | 2D | [x] |
| 2 | 5.5 Tap av mekanisk energi | fy1-4.9 Arbete med friktion | Släde/vagn med friktion: energistaplar där lägesenergi + rörelseenergi minskar och "värme" växer lika mycket | 2D (3D övervägs) | [x] |
| 3 | 5.6 Virkningsgrad og effekt | fy1-4.5 Effekt, fy1-4.6 Verkningsgrad | Motor/kran som lyfter last: tillförd och nyttig energi, effekt som energi per tid, verkningsgrad som energiflöde (sankeydiagram) | 2D | [x] |
| 4 | 3.7 Sammensatte systemer | fy1-3.10 Trissor | Två kroppar med snöre över trissa (låda på bord + hängande vikt, Atwood): friläggning av varje kropp, gemensam acceleration, spännkraften | 2D | [x] |
| 5 | 6.3 Trykk i væsker og rør | fy1-5.3 Vätsketryck (+ 5.8 Pascals princip) | Vätsketryck mot djup, kommunicerande kärl, U-rörsmanometer och hydraulisk press | 2D | [x] |
| 6 | 7.4 Termofysikkens første lov | fy1-6.5 Termodynamikens huvudsatser | Gas i cylinder med kolv: värme in, arbete ut, Δ*U* = *Q* − *W* (tecken enligt teorin) med partiklar som rör sig | 2D eller 3D | [x] |
| 7 | 7.5 Energikvalitet og termofysikkens andre lov | fy1-6.5 Termodynamikens huvudsatser | Varmt och kallt i kontakt: energin sprids men går aldrig tillbaka av sig själv; värmemaskinens maximala verkningsgrad | 2D | [x] |
| 8 | 6.5 Strømninger i rør | saknas (nytt stoff för Fysiklabbet) | Rör med förträngning: strömlinjer med partiklar, kontinuitet, Bernoulli (tryckrör som visar lägre tryck där farten är högre), och Reynolds försök med färgstrimma som går från laminär till turbulent strömning | 2D | [x] |
| 9 | 1.1 Å tenke fysikk | fy1-1.1 Fysik som ämne | Den hypotetisk-deduktiva metoden: ställ en hypotes om ett försök (till exempel vad pendelns period beror på), pröva den och se flödesschemat i boken tändas steg för steg; falsifierbarhet och reproducerbarhet | 2D | [x] |
| 10 | 1.3 Formler | fy1-1.2 Storheter, enheter och prefix | Formelverkstad: "snu formler" med operationer på båda sidor i bokens färger (grönt multiplicera, lila dividera, rött subtrahera, blått addera), formeltriangeln med fingret, enhetskontroll | 2D | [x] |

### Frågor till Sigbjørn innan nr 8–10 byggs

- [x] Vad tar 6.5 Strømninger i rør upp? Svar 2026-10-28: Bernoullis ekvation samt laminär och turbulent strömning. Delkapitlet ligger utanför boken som PDF (QR-kod), och han vill ha en animation som gör stoffet intuitivt.
- [x] Vad tar 1.1 Å tenke fysikk och 1.3 Formler upp? Svar 2026-10-28 i bilagan "Hva de ulike kapitlene handler om" (kapitlens lärandemål). 1.3: formler och enheter, att snu formler och lösa ut en variabel som står inne i formeln.
- [x] Bokens beteckningar: bilagan visar dem med färgkodning per kapitel (bland annat *G*, *N*, *R* som vektorer i kapitel 3, armen *r* i kapitel 4, ΔU = Q + W i kapitel 7). Fråga honom vid tveksamhet.

---

## Del 2: Inbäddade simuleringar som ska få egna sidor

De finns redan som simuleringar i teoriavsnitten, men saknar en egen sida
att länka till från boken.

| # | Simulering | Finns i | Bokens delkapitel | Klar |
|---|---|---|---|---|
| 11 | Vältning (kloss som lutas tills den välter) | fy2-1.2, fy2-1.3 | 4.1 Likevekt, 4.5 Gjenstander som står på skrå | [x] |
| 12 | Linjalen på två fingrar | fy2-1.2 | 4.1 Likevekt | [x] |
| 13 | Lodlinjen (tyngdpunkt med lod) | fy2-1.3 | 4.1 Likevekt | [x] |
| 14 | Numerisk modellering (kalkylbladet + stegkastet) | fy2-1.9 | 2.6 Matematisk modellering av bevegelse | [x] |

---

## Del 3: Förstärkning där det finns något men inte helt rätt

Tas när del 1 och 2 är klara.

| # | Bokens delkapitel | Det som finns | Vad som saknas | Klar |
|---|---|---|---|---|
| 15 | 7.3 Kalorimetri | Uppvärmning och avsvalning | En kalorimeter där två ämnen blandas och sluttemperaturen förutsägs | [x] |
| 16 | 1.2 Målinger og usikkerhet | Enhetskollen (delvis) | Mätosäkerhet: upprepade mätningar, medelvärde och spridning. Sigbjørn har egen app, stäm av först | [ ] |

---

## Status: nr 1, Arbete (`fysik1-arbete-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-01-arbete.md`); vinklar över 90° bara i Utforska, 1 J-brickor i labbskala
- [x] Rörelsemotorn med test: `node .claude/test-arbete-motor.js` (källan i `arbete-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: scen, arbetsruta, energifack, åtta färdiga försök, gissa-läge (räkna och jämför), Utforska
- [x] Inkopplad: katalog fy1-4.1, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn
- [x] Fysikgranskning (agenten pedagog) och språkgranskning (korrekturlasare), rättningarna införda
- [x] `node data/build-nyheter-og.js` för sitemapen (körd i en ren worktree på main)
- [x] Sam testar och godkänner (2026-10-27: startläget i Lyfta gav inget lyft, rättat)
- [x] Commit och push till `main` (d4fda6fb)
- [ ] Länken till Sigbjørn

## Status: nr 2, Förlust av mekanisk energi (`fysik1-energiforluster-app.html`)

- [x] Koncept godkänt (2026-10-27): två ramper och läget Dra uppför
- [x] Rörelsemotorn med test: `node .claude/test-klossbana-motor.js` (källan i `klossbana-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: U-bana med utbytbara remsor, värmekamera, energidiagram, energifack, tio färdiga försök, gissa-läge i två nivåer, Dra uppför med arbetsruta
- [x] Inkopplad: katalog fy1-4.9, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, språk, mobil-scen, fs-btn
- [x] Fysikgranskning och språkgranskning, rättningarna införda (bland annat att brickorna nu bevaras exakt)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (8b23c412, tillsammans med rättningen i Arbetsbänken)
- [ ] Länken till Sigbjørn

## Status: nr 3, Effekt och verkningsgrad (`fysik1-effekt-verkningsgrad-app.html`)

- [x] Koncept godkänt (2026-10-27): utan U · I, Emilia i trappan som färdigt försök i läget Lyft
- [x] Modellen med test: `node .claude/test-effekt-motor.js` (källan i `effekt-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: energiflödesdiagram med joulebrickor, Lyft (motor med vinsch, energimätare, stoppur, E–t-diagram), Emilia i trappan, Apparater (tidsratt, kWh, kronor, värmekamera), tio färdiga försök, gissa-läge
- [x] Inkopplad: katalog fy1-4.5 och fy1-4.6 (`?lage=apparater`), `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, språk, mobil-scen, fs-btn
- [x] Fysikgranskning och språkgranskning, rättningarna införda
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (5a2e13b7)
- [ ] Länken till Sigbjørn
- [ ] Att överväga: teorin i fy1-4.6 säger att LED-lampan lägger nästan all energi i synligt ljus. Verkliga LED-lampor ligger på cirka 30–40 %, och simuleringen använder 38 %.

## Status: nr 4, Sammansatta system (`fysik1-trissor-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-04-sammansatta-system.md`): alla fyra uppställningarna, trissornas massa och friktion försummade
- [x] Rörelsemotorn med test: `node .claude/test-trissor-motor.js` (källan i `trissor-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: fyra uppställningar (över bordet, Atwood, kloss och vikt, tre föremål), klickbar systemgräns, dynamometrar i snörena, kraftstaplar, ljusgrind, spärr före släppet, formelkort som följer det valda systemet, färdiga försök, gissa-läge
- [x] Inkopplad: katalog fy1-3.10, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn
- [x] Fysikgranskning och språkgranskning, rättningarna införda (spärren före släppet, formelkortet följer rörelseriktningen, vagnen blev en kloss med glidfriktion)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (ea4fa37a)
- [ ] Länken till Sigbjørn

## Status: nr 5, Tryck i vätskor och rör (`fysik1-vatsketryck-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-05-vatsketryck.md`): tre lägen i en sida, lufttrycket som kryssruta, arbetsrutan i Hydraulpressen
- [x] Tryckmotorn med test: `node .claude/test-tryck-motor.js` (källan i `tryck-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: Trycksonden (akvarium och djup cistern, U-rörsmanometer, vätskepelare, diagram över tryck och djup), Kärlens form (fyra kärl, kranar, staplar för bottentryck och massa), Hydraulpressen (tre tryckmätare, mätur, arbetsruta), åtta färdiga försök, gissa-läge med tre frågetyper
- [x] Inkopplad: katalog fy1-5.3 och fy1-5.8 (`?lage=pascal`), `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn
- [x] Fysikgranskning och språkgranskning, rättningarna införda (krafterna i pressen i skala mot varandra, arbetet som går till rörelseenergi, bilen 2 ton som i Exempel 1, massa och tyngd isärhållna, sonden flyttbar i sidled)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (64b6ffb0)
- [ ] Länken till Sigbjørn

## Status: nr 6, Termodynamikens första huvudsats (`fysik1-forsta-huvudsatsen-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-06-forsta-huvudsatsen.md`): ΔU = Q + W med arbetet på gasen, simuleringen först och teorin senare, p–V-diagrammet dolt från början
- [x] Gasmotorn med test: `node .claude/test-gas-motor.js` (källan i `gas-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: gascylinder med partiklar, värmeplatta som värmer och kyler, isolering, kolv som kan låsas, släppas eller tryckas ned, joulebrickor mellan Q, W och U, räkneverk, p–V-diagram, fem färdiga försök, gissa-läge
- [x] Inkopplad: katalog fy1-6.5, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn
- [x] Fysikgranskning och språkgranskning, rättningarna införda (värmeutbyte med rummet så att snabbt och långsamt skiljer sig, p–V-diagrammet ritar trycket mot kolven, luften ovanför kolven nämns, cykelslangen i stället för sprayflaskan)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (77b9a0f7)
- [ ] Länken till Sigbjørn
- [ ] Att göra senare: teorin i fy1-6.5 får formeln ΔU = Q + W (sätter igång uppdateringskedjan)

## Status: nr 7, Energins kvalitet och andra huvudsatsen (`fysik1-andra-huvudsatsen-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-07-andra-huvudsatsen.md`): båda lägena, η_max = 1 − T_k/T_v och diagrammet över antalet sätt
- [x] Motorn med test: `node .claude/test-varme-motor.js` (källan i `varme-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: två block som utbyter energibrickor på måfå (Einsteinkristaller, två partiklar väljs helt på måfå), temperatur över tid, antalet sätt, snabbspolning; värmemaskin och värmepump med brickor efter kvalitet; sex färdiga försök; gissa-läge
- [x] Inkopplad: `href2` på fy1-6.5 (bredvid Gaskolven), `data/simuleringar.js` med egna namn och sökord för båda, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn
- [x] Fysikgranskning och språkgranskning, rättningarna införda (blind dynamik i stället för Metropolis, fladdret förklarat, värmepumpens gräns i formelkortet, 10²⁵ atomer, entropin kan tillfälligt minska)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (6f2fb3e7)
- [x] Ny design (2026-10-29): atomgitter i kopparblocken som lyser efter energin, isolerad låda, datalogger, räknare genom kontaktytan, kulan på berget av fördelningar; kolvmaskin med svänghjul, energiband med gränsen för W, verkningsgradsmätare och kvalitetsstege; norsk översättning
- [ ] Länken till Sigbjørn

## Status: nr 11, Vältning (`fysik2-valtning-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-11-valtning.md`): båda lägena, den generella formeln tan α_v = (b/2)/h_T när en last läggs i klossen, normalkraften som vandrar
- [x] Motorn med test: `node .claude/test-valt-motor.js` (källan i `valt-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: luta klossen för hand (rotation kring hörnet), klossen på en planka som vevas upp (glider eller välter), last högt eller lågt, kartan "Glider eller välter?", fyra underlag, sju färdiga försök, gissa-läge (vinkel samt glida eller välta)
- [x] Inkopplad: `href3` på fy2-1.3 (efter gaffelbalansen och dubbelkonen), `data/simuleringar.js` med eget namn och sökord, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; gissatestet `%TEMP%\pptr-test\valt-gissa.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (veven går vidare under glidningen, startläget så att breda klossar står på plankan, F_N på bänken, "last" i stället för "vikt", stoppkloss vid gångjärnet, kraftvärden, gränsfallet förklarat, F_G blå)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (9713e01d)
- [ ] Länken till Sigbjørn

## Status: nr 12, Linjalen på två fingrar (`fysik2-linjalen-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-12-linjalen.md`): ett μ för eleven (glidfriktion 0,3; vilofriktionen 0,5 i en fördjupningsruta), dra isär som sista försök, kvast, basebollträ och biljardkö
- [x] Motorn med test: `node .claude/test-linjal-motor.js` (källan i `linjal-motor.js`, inklistrad i sidan)
- [x] Sidan byggd: dra ihop och dra isär, normalkrafterna som staplar med strecket "byte", spåret längs föremålet över tiden, fyra föremål och en vikt, fem färdiga försök, gissa-läge (var möts fingrarna, vilket finger glider först)
- [x] Inkopplad: `href2` på fy2-1.2 (efter brädan på två bockar), `data/simuleringar.js` med eget namn och sökord, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; gissatestet `%TEMP%\pptr-test\lin-gissa.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (hävarmarna kring Q som i teorin, F_P = F_G · l_G / l_P, friktionskrafterna lika stora och gränsen som skiljer, tyngdpunkten alltid mellan fingrarna, friktionspilar med beteckning, fallets tröghetsmoment)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (59b17bb7)
- [ ] Länken till Sigbjørn
- [x] Teorin i fy2-1.2 rättad (demonstrationen och sammanfattningen): fingret närmast tyngdpunkten *tål* större friktionskraft; krafterna är lika stora
- [ ] Att göra: skärmläsartexten i `minisim.js` (typ linjal) säger fortfarande "därmed mindre friktion"

## Status: nr 13, Tyngdpunkt och lodlinje (`fysik2-lodlinjen-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-13-lodlinjen.md`): stöd för `href4` på fy2-1.3, Sverigekartan och en egen form att rita
- [x] `href4` i `section-nav.js`, `data/sok.js`, `verify-sok.js` och `verify-sim-vaxlare.js` (skriptet `href4.py` i scratchpad gör samma ändring i push-worktree)
- [x] Motorn med test: `node .claude/test-tyngdpunkt-motor.js` (källan i `tyngdpunkt-motor.js`; Sverigekartan ur Natural Earth 1:50m, fastlandet, förenklad)
- [x] Sidan byggd: skivan hänger i en spik med ett lod och svänger som en dämpad fysisk pendel, rita av lodet från flera hål, F_G och hävarmen l_G, fem former (oregelbunden, L, hästsko, Sverige, egen ritad), nålspetsen sedd uppifrån, fem färdiga försök, gissa-läge
- [x] Inkopplad: `href4` på fy2-1.3, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; interaktionstestet `%TEMP%\pptr-test	p-test.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (försöken väntar tills skivan hänger still, mindre rityta så att egna former ryms, l_G-etiketten och måttlinjen i fri yta, momenttexten under svängningen, rutan om Sveriges mittpunkt med 1947 års nålmetod)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (532c934c)
- [ ] Länken till Sigbjørn

## Status: nr 14, Stegmetoden (`fysik2-stegmetoden-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-14-stegmetoden.md`): alla tre lägena, knappen som kopierar kalkylbladet och formler i svensk Excel-stil
- [x] Motorn med test: `node .claude/test-steg-motor.js` (återskapar teorins tabell i fy2-1.9 exakt; kalkylbladets formler räknas om och jämförs med motorn)
- [x] Sidan byggd: kalkylbladet ihopkopplat med banan (formelraden, markerade celler, kopiera till Excel), jämförelse av sju tidssteg med felkartan, fallet med tennisboll och badmintonboll och gränshastigheten, sex färdiga försök, gissa-läge (felet med halva tidssteget, gränshastigheten)
- [x] Inkopplad: `href` på fy2-1.9, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; testet `%TEMP%\pptr-test\steg-gissa.js` (gissa och kopiering)
- [x] Fysikgranskning och språkgranskning, rättningarna införda (varning när tidssteget är längre än bromstiden, förklaring till felkartan med luftmotstånd, missuppfattningen om lätta bollar, kastvidden i scenen, formelkortet med rakt bråkstreck och a_y, fallets tyngdpunkt och nedslagsfart)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (4c34f8a5)
- [ ] Länken till Sigbjørn
- [ ] Fråga till Sam: teorin fy2-1.9 föreslår cellen G2 för tidssteget i tipsrutan, men simuleringens blad har tidssteget i J2 (G är *a*_y); och "de värdesiffror du bryr dig om" i tipsrutan

## Status: nr 15, Kalorimetern (`fysik1-kalorimetri-app.html`)

- [x] Koncept godkänt (2026-10-27, `koncept-15-kalorimetri.md`): alla tre lägena (även isen), energiförlusterna avslagna från början, djuplänken `?lage=is` från fy1-6.3
- [x] Motorn med test: `node .claude/test-kalorimeter-motor.js` (exempel 2 i fy1-6.2 och fy1-6.3, kopparbiten, isbiten som smälter helt, vatten som fryser, energibevarandet med koppen och läckaget)
- [x] Sidan byggd: kalorimetern med bägare, kastrull och isskål, energivågen med joulebrickor, *T*–*t*-diagrammet, "Vart energin tar vägen", riktig kalorimeter, sex färdiga försök, gissa-läge (sluttemperaturen, den okända metallen)
- [x] Inkopplad: `href2` på fy1-6.2, `href` med `?lage=is` på fy1-6.3, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; testet `%TEMP%\pptr-test\kal-gissa.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (den riktiga kalorimeterns avvikelse åt båda hållen, allt eller en del av vattnet fryser, isen står på exakt 0 °C, c · m för båda kropparna i formelkortet, en mening om att blandningen visas långsamt, per kilogram och grad, tusental med hårt mellanslag, språkrättningar i återkopplingen och korten)
- [x] Sam testar och godkänner (2026-10-27)
- [x] Commit och push till `main` (9c105811)
- [ ] Länken till Sigbjørn

## Status: nr 10, Formelverkstaden (`fysik1-formelverkstaden-app.html`)

- [x] Koncept (`koncept-10-formelverkstaden.md`): Sam bad 2026-10-29 att alla återstående simuleringar byggs här, så konceptet godkändes inte separat
- [x] Algebramotorn med test: `node .claude/test-formel-motor.js` (källan i `formel-motor.js`; alla 54 utlösningar i 15 formler, felsvaren, enheterna)
- [x] Sidan byggd: Verkstaden (operationer i bokens färger, op-rad och förenklad rad, tips, Visa lösningen, Kontrollen med exemplets värden, Gör bara i vänster led, Enhetskontrollen), Formeltriangeln med fingret, åtta färdiga försök, gissa-läge (Vilket uttryck är rätt?, Hitta felet)
- [x] Inkopplad: `href` på fy1-1.2, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; skärmdumpstestet `%TEMP%\pptr-test\formel-shot.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (kvadrera ett negativt led, realistiska teckenfel, talet 2 bland felsvaren, tal först i produkten, roten och tecknet, Kontrollen med tecken och enhet, mellanledet under roten, Hitta felet svårare, "addera till båda led")
- [x] Ny språkregel `addera-bada-led` i `verify-sprak.js`; den hittade samma fel i `ma2c-2.4`, rättat
- [ ] Sam testar och godkänner
- [ ] Commit och push till `main`
- [ ] Länken till Sigbjørn

## Status: nr 9, Pröva en hypotes (`fysik1-hypotesprovet-app.html`)

- [x] Koncept (`koncept-09-hypotesprovet.md`), byggt utan separat godkännande (se nr 10)
- [x] Motorn med test: `node .claude/test-pendel-motor.js` (källan i `pendel-motor.js`; exakt period, RK4, mätning med reaktionstid och felmätningar, rättvisa par och 3σ)
- [x] Sidan byggd: pendel på stativ med gradskiva och stoppur, flödesschemat (observation, hypotes, försök, stöds hypotesen?, styrks, lag eller teori efter flera försök), fyra hypoteser varav en inte går att pröva, mättabell där mätningar stryks, diagram med modellen, sex färdiga försök, gissa-läge (Förutsäg utfallet, Rättvist försök?)
- [x] Inkopplad: `href` på fy1-1.1, `data/simuleringar.js`, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; testet `%TEMP%\pptr-test\pendel-shot.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (lag först efter flera styrkta försök, tre utfall, texter ur elevens egna värden, felmätning mot mätosäkerhet, problemställning, falsifierbar, reproducerbar)
- [ ] Sam testar och godkänner
- [ ] Commit och push till `main`
- [ ] Länken till Sigbjørn

## Status: nr 8, Strömning i rör (`fysik1-stromning-app.html`)

- [x] Koncept: röret med förträngning (kontinuitet, Bernoulli, standrör, vattenskivor, tryckstaplar, undertryck) och Reynolds försök (färgad tråd, Re-skala, hastighetsprofil, tryckfall), byggt utan separat godkännande (se nr 10)
- [x] Motorn med test: `node .claude/test-stromning-motor.js` (källan i `stromning-motor.js`)
- [x] Sidan byggd, med åtta färdiga försök och gissa-läge (Var är trycket lägst?, Laminärt eller turbulent?)
- [x] Inkopplad: `href2` på fy1-5.3, `data/simuleringar.js` med egna namn och sökord för båda, `UPDATES`, `verify-navigation.js`
- [x] Verifierare: navigation, no-white-outline, sök, sim-växlare, analytics, språk, mobil-scen, fs-btn; testet `%TEMP%\pptr-test\strom-shot.js`
- [x] Fysikgranskning och språkgranskning, rättningarna införda (undertryck bara när trycket är under lufttrycket, höjden v²/(2g) vid standrören, punkterna heter 1, 2 och 3, modellens förenklingar och att verkligt vatten här är turbulent, riktvärden för Re, kritisk fart, ny gissningsuppgift där trycket i 2 räknas ut, formelkortet radbryts på mobilen, ritloopen utan React)
- [ ] Sam testar och godkänner
- [ ] Commit och push till `main`
- [ ] Länken till Sigbjørn

## Process för varje simulering

Kopiera blocket under rubriken för den simulering som byggs.

**Förberedelse**
- [ ] Läs Fysiklabbet-avsnittets teori och PDF i `Genomgångar/`; skriv upp beteckningar, enheter och formler
- [ ] Kolla hur PhET och andra visar momentet, och välj medvetet ett eget koncept
- [ ] Konceptskiss enligt 5/5-arbetssättet: labbscen, en pedagogisk centerpiece som förklarar *varför*, gissa-läge, färdiga försök
- [ ] Beslut om 2D eller 3D, med motivering
- [ ] Sam godkänner konceptet innan bygget börjar

**Bygge**
- [ ] Fysikmotorn skriven och kontrollerad numeriskt (gränsfall, bevarade storheter)
- [ ] Sidan byggd enligt simuleringsmönstret: navigation, breadcrumb, formelkort med ordetiketter, sidopanel
- [ ] Fullskärm med inställningsrutan uppe till höger, hopfällbar; mobil-docken (`sim-dock.js`)
- [ ] Gissa-läge och färdiga försök
- [ ] Meta-taggar, Cloudflare-taggen, `feedback.js`

**Inkoppling**
- [ ] Länkad i `data/katalog.js` (`href`/`href2`/`href3`) med nyckelord
- [ ] Post i `data/simuleringar.js` med eget namn och egna nyckelord
- [ ] Rad i `UPDATES` i `index.html`
- [ ] Inlagd i `.claude/verify-navigation.js`

**Granskning**
- [ ] Verifierarna: navigation, no-white-outline, fs-btn, mobil-scen, sök, sim-växlare, sitemap, analytics, språk
- [ ] Skärmdumpar: bred skärm, fullskärm, mobil 390 px (normalläge och fullskärm)
- [ ] Fysikgranskning (`granska-fysik` / agenten `pedagog`) och test (agenten `testare`)
- [ ] Språkgranskning (agenten `korrekturlasare`)
- [ ] Sam testar och godkänner

**Leverans**
- [ ] Commit och push till `main`
- [ ] Länken skickad till Sigbjørn (Sam skickar själv)
- [ ] Bockad i tabellen ovan
