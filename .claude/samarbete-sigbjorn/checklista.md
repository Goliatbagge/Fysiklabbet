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
| 5 | 6.3 Trykk i væsker og rør | fy1-5.3 Vätsketryck (+ 5.8 Pascals princip) | Vätsketryck mot djup, kommunicerande kärl, U-rörsmanometer och hydraulisk press | 2D | [ ] |
| 6 | 7.4 Termofysikkens første lov | fy1-6.5 Termodynamikens huvudsatser | Gas i cylinder med kolv: värme in, arbete ut, Δ*U* = *Q* − *W* (tecken enligt teorin) med partiklar som rör sig | 2D eller 3D | [ ] |
| 7 | 7.5 Energikvalitet og termofysikkens andre lov | fy1-6.5 Termodynamikens huvudsatser | Varmt och kallt i kontakt: energin sprids men går aldrig tillbaka av sig själv; värmemaskinens maximala verkningsgrad | 2D | [ ] |
| 8 | 6.5 Strømninger i rør | saknas (nytt stoff för Fysiklabbet) | Kontinuitetsekvationen (smalare rör ger högre fart), eventuellt tryckfall/Bernoulli. **Kräver bokens innehåll först** | 2D | [ ] |
| 9 | 1.1 Å tenke fysikk | fy1-1.1 Fysik som ämne | Storleksordningar: zooma från atom till universum, uppskatta och jämföra. **Stäm av vad boken tar upp** | 2D | [ ] |
| 10 | 1.3 Formler | fy1-1.2 Storheter, enheter och prefix | Formelverkstad: dra i storheterna och se proportionalitet, enhetskontroll, lös ut en storhet. **Stäm av vad boken tar upp** | 2D | [ ] |

### Frågor till Sigbjørn innan nr 8–10 byggs

- [ ] Vad tar 6.5 Strømninger i rør upp (kontinuitet, Bernoulli, viskositet)?
- [ ] Vad tar 1.1 Å tenke fysikk och 1.3 Formler upp?
- [ ] Bokens beteckningar för de storheter simuleringarna visar (för hans översättning)

---

## Del 2: Inbäddade simuleringar som ska få egna sidor

De finns redan som simuleringar i teoriavsnitten, men saknar en egen sida
att länka till från boken.

| # | Simulering | Finns i | Bokens delkapitel | Klar |
|---|---|---|---|---|
| 11 | Vältning (kloss som lutas tills den välter) | fy2-1.2, fy2-1.3 | 4.1 Likevekt, 4.5 Gjenstander som står på skrå | [ ] |
| 12 | Linjalen på två fingrar | fy2-1.2 | 4.1 Likevekt | [ ] |
| 13 | Lodlinjen (tyngdpunkt med lod) | fy2-1.3 | 4.1 Likevekt | [ ] |
| 14 | Numerisk modellering (kalkylbladet + stegkastet) | fy2-1.9 | 2.6 Matematisk modellering av bevegelse | [ ] |

---

## Del 3: Förstärkning där det finns något men inte helt rätt

Tas när del 1 och 2 är klara.

| # | Bokens delkapitel | Det som finns | Vad som saknas | Klar |
|---|---|---|---|---|
| 15 | 7.3 Kalorimetri | Uppvärmning och avsvalning | En kalorimeter där två ämnen blandas och sluttemperaturen förutsägs | [ ] |
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
- [x] Commit och push till `main`
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
