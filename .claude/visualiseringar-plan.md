# Plan: Interaktiva matematikvisualiseringar

Idébank + arkitektur för "Visualisering"-kortet i matematikkurserna (ma1c,
ma2c, ma3c, ma4). Sammanställd 2026-07-11 ur brainstorm med pedagogagent,
matematikexpertagent och egna kompletteringar. **Detta är masterlistan —
bocka av med [x] när en visualisering är byggd och inkopplad.**

## Syfte

Interaktiva, visuella, pedagogiska "aha-maskiner" för utvalda matteavsnitt —
i samma anda som fysiksimuleringarna. Inte på varje avsnitt, bara där
interaktionen AVSLÖJAR matematiken (inte bara illustrerar den). Skiljer sig
från `::: graf`-blocken (som redan täcker "parameter → grafens utseende"):
en visualisering är ett rikare, skräddarsytt verktyg med stegvis uppbyggnad,
dragbara objekt, prediktionsmoment och koppling algebra ↔ geometri ↔ graf.

## Designprinciper (gäller varje visualisering)

1. **Gissa först** — där det passar: eleven avger en förutsägelse (klick/
   ritning/val) innan sanningen visas. Fel intuition måste motbevisas av
   elevens egen gissning för att ersättas.
2. **Lager/steg** — bygg upp i steg ("Nästa"-knapp eller kryssrutor): visa
   grundfiguren → interaktionen → formeln → generaliseringen. Rotations-
   kroppsexemplet: rita → rotera → skiva → summera → formel.
3. **Live-koppling formel ↔ bild** — värden i formeln (KaTeX) uppdateras i
   realtid när man drar; term i formel ↔ del i figur färgkodas ihop.
4. **Dragbara objekt** framför enbart glidare där det går (punkter på
   kurvor/cirklar, vektorpilar, datapunkter, kordor).
5. **Invarians som upplevelse** — många satser ÄR ett påstående om att något
   inte ändras när man drar (randvinkeln, kordaprodukten, a/sin A). Låt
   eleven dra och se värdet stå blick stilla.
6. **Laborans-estetik** — papperstema, ink-färger, Poppins, inga emojis,
   decimalkomma, kursiva variabler/raka enheter, samma beteckningar som
   teorigenomgången (synk-regeln i CLAUDE.md gäller fullt ut).
7. **Touch-vänligt** — pointer events, generösa träffytor; testa smal skärm.

## Teknisk arkitektur (BESLUTAD OCH BYGGD i piloten 2026-07-11)

- **Kort i katalogen**: `lab-card` i `katalog.html` bredvid Teori/
  Exit ticket/Övningar. Tag: `Utforska`, titel: `Visualisering`, meta:
  visualiseringens namn. Vy `view === 'visualisering'`. **Kortet renderas
  bara när avsnittet HAR en visualisering** (till skillnad från Exit
  ticket/Övningar som visar "Kommer snart") — majoriteten av avsnitt ska
  inte ha något kort alls, annars blir det 150 döda kort.
- **Manifest**: `data/visualiseringar/index.js` →
  `window.VISUALISERINGAR_INDEX = { 'ma3c-2.3': { titel, beskrivning, fil }, … }`
  laddas av katalog.html vid start (litet, bara metadata).
- **Moduler**: en fil per visualisering, `data/visualiseringar/<id>.js`,
  lazy-laddad av `<Visualisering>`-komponenten i katalog.html först när
  kortet klickas (script-tag + Promise-cache). Registrerar
  `window.VISUALISERINGAR['<teori-id>'] = { mount(el) }`;
  `mount()` returnerar `{ destroy() }` (React-effektens cleanup anropar den).
  Vanilla JS + SVG i graf.js-stil; KaTeX via `window.katex` (finns redan).
- **En visualisering kan delas av flera avsnitt** — modulen registrerar sig
  för flera id:n och manifestet pekar alla id:n på samma fil (piloten täcker
  ma3c-2.1, 2.2 och 2.3).
- **Hash-djuplänk**: `#ma3c-2.3:visualisering` (view-regexen i katalog.html).
- **CSS**: `.lab-vis-*` i `styles-laborans.css` (steg-pills, instruktion,
  legend, formelrader med safe-center + overflow-scroll) och återanvända
  `.lab-graf-*`-klasser (card, scene, svg, slider, num, foot, reset, check).
- **Testverktyg**: `.shots/vis-runner.html?id=<id>&step=N&h=..&a=..&sweep=1&facit=1&debug=1`
  monterar en modul fristående och klickar/sätter värden för headless-
  skärmdumpar av varje steg. OBS: headless Chrome har minsta fönsterbredd
  500 px — en "420 px"-dump renderas i 500 och beskärs till 420 (ser ut som
  overflow men är det inte; kolla `debug=1`-utskriften).
- Fullskärmsknapp (`fs-btn`) enligt sim-mönstret om en framtida scen vinner
  på det (piloten behövde ingen).
- Öppen fråga: ska visualiseringarna även dyka upp i presentationsläget?
  (Troligen ja, samma mount-API — beslutas senare.)

## Våg 1 — börja här (högst aha-faktor × genomförbarhet)

1. [x] **Sekanten blir tangent** (ma3c-2.1–2.3) — PILOT, klar 2026-07-11
2. [x] **Enhetscirkeln rullas ut** (ma3c-6.2, ma4-1.2, ma4-1.10, ma4-1.5)
3. [x] **Kvadrerings- och konjugatregeln som areor** (ma2c-2.1)
4. [x] **Riemann-kläm: arean under kurvan** (ma3c-5.3, ma4-3.2)
5. [x] **Galtonbrädan** (ma2c-6.5, koppling ma1c-5.5)
6. [x] **Rotationskroppar steg för steg** (ma4-3.7, ma4-3.8)
7. [x] **Komplex multiplikation, de Moivre och z^n = w** (ma4-4.5–4.9)
8. [x] **Tärningsverkstaden: utfallsrum + stora talens lag** (ma1c-5.4–5.5)
9. [x] **Randvinkeljakten** (ma2c-4.11)
10. [x] **Minsta kvadratmetoden med riktiga kvadrater** (ma2c-6.6)
11. [x] **Hitta talet e** (ma3c-3.4)
12. [x] **Fundamentalsatsen: arean har en lutning** (ma3c-5.4)

---

## Idébank

Format per idé: kärninsikt → interaktion → missuppfattning som adresseras.

### Ma1c — taluppfattning och algebra

- [x] **Bråkverkstaden** (ma1c-1.2–1.4). KLAR 2026-07-12, `ma1c-1.3.js`. Bråk som area/stapel; addition
  kräver gemensam nämnare — dra i uppdelningen tills bitarna är lika stora
  och se `1/3 + 1/4` bli `4/12 + 3/12`; multiplikation `a/b · c/d` som
  rektangelarea i en enhetskvadrat (raster b × d); division som "hur många
  gånger ryms?". Missuppfattning: täljare+täljare/nämnare+nämnare.
- [x] **Potenstrappan ner till a⁰ och a⁻ⁿ** (ma1c-1.6–1.7). KLAR 2026-07-11, `ma1c-1.6.js`. Trappa av
  staplar 2⁴, 2³, … där varje steg nedåt = "÷2"; eleven kliver själv förbi
  2¹ och nästa steg MÅSTE bli 1, sedan 1/2, 1/4. Basglidare. Insikt:
  a⁰ = 1 är mönstrets tvingande fortsättning, inte en definition.
- [x] **Exponentglidaren** (ma1c-1.8). Kontinuerlig glidare för n i xⁿ
  (−2 → 3): grafen morfar mjukt hyperbel → konstant → rot → linje →
  parabel; x^(1/2) = √x faller ut som punkt på samma kontinuum.
- [x] **Grundpotensform: zoomresan** (ma1c-1.9). Zoomglidare från 10⁻¹⁰ m
  (atom) till 10²⁶ m (universum) med SVG-vinjetter per dekad; aktuell skala
  visas hela tiden som a·10ⁿ. Sökuppdrag: "ställ in 3·10⁸ m". Insikt:
  exponenten är en position, multiplikation med 10 = ett zoomsteg.
- [x] **Ekvationsvågen** (ma1c-2.5–2.7). KLAR 2026-07-11, `ma1c-2.5.js` (id: 2.5, 2.6). Balansvåg med x-lådor och
  tal-vikter; eleven drar bort lika mycket från båda skålarna, delar i lika
  högar; vågen tippar direkt vid fusk; algebra-raden synkas per handling.
  Nivåer med x på båda sidor och negativa "ballongvikter". Missuppfattning:
  "flytta över, byt tecken" som magi.
- [x] **Faktorisering som areapussel** (ma1c-2.4, ma2c-2.2, ma2c-2.3). KLAR 2026-07-12, `ma2c-2.2.js`. Bygg
  x² + 5x + 6 av en x²-kvadrat, x-remsor och enhetsrutor; pussla ihop dem
  till en rektangel — sidorna ÄR faktorerna (x+2)(x+3). Nollprodukt:
  arean = 0 bara när en sida = 0.
- [x] **Olikhetens vändpunkt** (ma1c-2.11). KLAR 2026-07-12, `ma1c-2.11.js`. Olikhet + tallinje med skuggad
  lösningsmängd; vid "multiplicera med −1" ANIMERAS tallinjen som spegling
  kring 0 — skuggningen följer med, olikhetstecknet roterar synkront.
  Testpunkt dras och lyser grönt/rött. Insikt: teckenvändningen är en
  spegling, inte en regel.
- [x] **Talföljdsverkstaden** (ma1c-2.13). KLAR 2026-07-12, `ma1c-2.13.js` (prickmönster ur genomgången). Tändsticksmönster byggs för
  n = 1, 2, 3 … (glidare till 20); nya stickor per steg lyser (differensen
  = koefficienten); eleven bygger formeln av brickor (n, ×, +, siffror) och
  testar mot figuren — fel formel ger synlig avvikelse vid stora n.

### Ma1c — procent och funktioner

- [x] **Faktorkedjan** (ma1c-3.2–3.3). KLAR 2026-07-11, `ma1c-3.2.js`. Startbelopp som stapel; eleven
  kedjar dragbara faktor-brickor (×1,20; ×0,80; …) och ser stapeln
  transformeras stegvis. Huvudnummer som prediktion: "+20 % följt av −20 %
  — tillbaka på start?" (0,96!). n-glidare för upprepad faktor →
  exponentialkurvan växer fram. Missuppfattning: procent adderas.
- [x] **Ränta på ränta: sparande och lån** (ma1c-3.4–3.5). Två synkade
  vyer: insättningar/amorteringar som staplar + total som kurva;
  jämför linjär (utan ränta) mot exponentiell; dra räntesats och månadsspar
  och se sluttiden/slutbeloppet live. Prediktionsmoment: "dubbla räntan —
  dubblas slutbeloppet?" (nej, mer!).
- [x] **Definitions- och värdemängd som highlight** (ma1c-4.9). Dra ett
  intervall på x-axeln → motsvarande y-intervall lyser på kurvan och
  y-axeln; testa funktion med lucka (1/x). Missuppfattning: blandar ihop
  vilken mängd som hör till vilken axel.

### Ma1c — statistik och sannolikhet

- [x] **Opinionsmätaren: urval och felmarginal** (ma1c-5.1–5.2). KLAR 2026-07-12, `ma1c-5.1.js`. En dold
  population (10 000 prickar, andel p okänd); eleven drar stickprov med
  valbar storlek n och får skattningar; upprepa och se skattningarna
  spridas; felmarginalen krymper som 1/√n (dra n och se intervallet).
  Snedvridet urval som läge (fråga bara i ena hörnet av populationen).
- [x] **Korrelationens lekplats** (ma1c-5.3). KLAR 2026-07-12, `ma1c-5.3.js`. Måla/dra punkter
  fritt med r-mätare live. Utmaningar: "skapa r ≈ 0,9", "skapa ett
  UPPENBART samband med r ≈ 0" (parabel!), "flytta EN punkt så r går
  0,2 → 0,8". Galleri med dold tredje variabel (glass ↔ drunkningar,
  färgas efter temperatur vid klick). Insikt: r mäter bara linjärt;
  korrelation ≠ kausalitet.
- [x] **Tärningsverkstaden** (KLAR 2026-07-11, `ma1c-5.4.js`) (ma1c-5.4–5.5). VÅG 1. Två delar: (a) kasta
  tärning/mynt med +1/+100/+10 000-knappar, relativ frekvens plottas mot
  teoretisk linje — stabiliseras "på längden"; detektivläge med riggat mynt
  (bestäm dolt p); fälla-fråga efter 5 klavar i rad: "är krona skyldig att
  komma nu?". (b) Utfallsrum: 6×6-rutnät för två tärningar, klicka och
  markera en händelse ("summan är 7") — sannolikheten visas som bråk,
  decimaltal och procent. Missuppfattningar: gambler's fallacy; att
  summa 7 och summa 2 är lika sannolika.
- [x] **Träddiagram-byggaren** (ma1c-5.6–5.8). KLAR 2026-07-11, `ma1c-5.7.js`. Eleven bygger trädet gren
  för gren; växel med/utan återläggning ändrar andra nivåns sannolikheter
  automatiskt; produkten längs en väg räknas live med färgade grenar;
  komplementhändelsen som "alla vägar utom denna" (1 − P lyser).
  Missuppfattning: glömmer att sannolikheter ändras utan återläggning.

### Ma1c — trigonometri och vektorer

- [x] **Vektorpromenaden** (ma1c-6.5–6.8). KLAR 2026-07-11, `ma1c-6.5.js`. Dra vektorer på rutnät;
  komposanter som streckad trappa med v·cos α / v·sin α utskrivet;
  additionsläge spets-till-svans där eleven ordnar om vektorerna med
  drag-and-drop och ser resultanten stå still (kommutativitet);
  subtraktion som riktningsbyte-toggle. Uppdrag: "nå skattkistan med
  exakt två vektorer med längd 5". Missuppfattning: vektoraddition =
  addera längderna.

### Ma2c — ekvationssystem och andragrad

- [x] **Ekvationssystemets tre öden** (ma2c-1.1–1.4). KLAR 2026-07-11, `ma2c-1.1.js`. Två dragbara linjer;
  skärningspunkten följer med; synkad algebrapanel visar substitutions-/
  additionsstegen med aktuella tal live. Uppdrag: "gör systemet olösligt"
  → vid parallella linjer kollapsar algebran till "0 = 5" som pulserar.
  Insikt: grafisk och algebraisk metod är samma sak från två håll.
- [x] **Kvadrerings- och konjugatregeln som areor** (ma2c-2.1). VÅG 1 — KLAR 2026-07-11, `ma2c-2.1.js`.
  Dra a och b: kvadraten (a+b)² delas i a², b² och TVÅ ab-rektanglar med
  färgkodning mot formelns termer. Konjugatläge: b²-hörnet klipps ur
  a²-kvadraten och remsan flyttas (av eleven) till en (a+b)(a−b)-rektangel.
  Sifferläge: "räkna 19·21 i huvudet" = 20² − 1². Missuppfattning:
  (a+b)² = a² + b² — den missade termen 2ab blir bokstavligt synlig.
- [x] **Kvadratkomplettering som bygge** (ma2c-2.4). KLAR 2026-07-11, `ma2c-2.4.js` (id: 2.4, 2.5). Kvadrat x·x + remsa
  p·x; "vik"-reglage klyver remsan och sveper halvan runt hörnet; det
  saknade hörnet (p/2)² blinkar; algebra-raden byggs term för term ända
  fram till pq-formeln. Insikt: formeln är minnesbilden av en rörelse.
- [x] **Diskriminantens gränsland** (ma2c-2.6 + ma4-4.3). KLAR 2026-07-11, `ma2c-2.6.js`.
  Glidare p, q: överst parabeln, under rötterna som punkter i ett KOMPLEXT
  plan. Dra q uppåt: rötterna glider mot varandra på reella axeln, möts
  (dubbelrot/tangering) och viker sedan av vinkelrätt ut i komplexa planet
  som konjugatpar. Diskriminantmätare med färgkod. Insikt: "saknar reell
  lösning" = rötterna smiter ut ur reella axeln.
- [x] **Rotekvationens falska rot** (ma2c-2.8). KLAR 2026-07-12, `ma2c-2.8.js`. √x och x−2 ritas; bredvid
  de kvadrerade graferna där en EXTRA skärningspunkt dykt upp, markerad
  "falsk rot". Insikt: kvadrering glömmer tecken → prövning obligatorisk.
- [x] **Kastparabelns tre klädnader** (ma2c-3.1–3.3). KLAR 2026-07-11, `ma2c-3.1.js` ("Parabelns tre klädnader"). EN parabel, tre
  formler (faktorform, vertexform, allmän form); tre draghandtag på kurvan
  — nollställena styr faktorformen, vertex styr vertexformen, y-skärningen
  styr c; den styrda formen lyser, övriga räknas om gråtonat; symmetri-
  linjen alltid synlig. Insikt: samma parabel, olika avläsbara hemligheter.

### Ma2c — geometri

- [x] **Pythagoras areapussel** (ma2c-4.5). KLAR 2026-07-11, `ma2c-4.5.js`. Kvadraterna a², b², c² på
  triangelns sidor; eleven flyttar pusselbitar från de två små kvadraterna
  in i den stora (klassiskt omflyttningsbevis); dra det räta hörnet och se
  att pusslet bara går ihop vid 90° (koppling till cosinussatsen).
- [x] **Vinkelsummans promenad** (ma2c-4.2). En pil vandrar längs
  triangelns/månghörningens rand och vrider sig vid varje hörn; efter ett
  varv har den vridit sig exakt 360° → yttervinkelsumman; inre vinkelsumma
  (n−2)·180° faller ut. Dra hörnen fritt — summan står still.
- [x] **Likformighetens tre exponenter** (ma2c-4.7–4.8, ma1c-4.11).
  Skalfaktorglidare k: längd ×k, area ×k², volym ×k³ som tre separerande
  kurvor. Prediktion: "dubbla sidan — hur många småfigurer ryms?" → figuren
  fylls med exakt k² kopior. Missuppfattning: area skalar linjärt.
- [x] **Topptriangelsatsen** (ma2c-4.9). Dra den parallella transversalen
  upp/ner; segmentlängder mäts live och kvoterna står stilla; toggla
  "lyft ut" topptriangeln och lägg den bredvid i samma skala.
- [x] **SSA-tvetydigheten: hur många trianglar?** (ma2c-4.10). KLAR 2026-07-12, `ma2c-4.10.js`.
  Fast sida + fast vinkel; den pendlande sidan ritas som cirkelbåge som
  sveper över baslinjen — 2 skärningar (två trianglar i olika färg),
  tangering (1, rätvinklig) eller miss (0). Insikt: därför är SSA inget
  kongruensfall och sinussatsen tvetydig.
- [x] **Randvinkeljakten** (ma2c-4.11). VÅG 1 — KLAR 2026-07-11, `ma2c-4.11.js`. Gissa först: "vad händer
  med vinkeln i P när du drar P längs bågen?" Dra: värdet står blick
  stilla, spårlinje visar alla lägen. Toggle medelpunktsvinkel: kvoten 2,0
  live. Dra P till diametern → 90° (Tales sats). Dra P till andra bågen →
  supplementvinkeln.
- [x] **Kordasatsen: rektangeln som vägrar ändra area** (ma2c-4.12). KLAR 2026-07-11, `ma2c-4.12.js`.
  Rotera en korda genom en fast punkt P: segmenten a, b ändras dramatiskt
  men produktrektangeln a·b bredvid behåller sin AREA (morfar men behåller
  ytan). Dra P → ny konstant. Andra korda för direkt jämförelse.

### Ma2c — logaritmer och statistik

- [x] **Logaritmen som exponentjakt + spegling** (ma2c-5.2–5.3, 5.6). KLAR 2026-07-12, `ma2c-5.2.js`. Dra en
  punkt på 10^x; spegelpunkten över y = x ritar log-kurvan som spår;
  koordinatpar byter plats live. Uppdrag: "lös 10^x = 500 genom att dra"
  → x ≈ 2,7, sedan knappen "exakt: lg 500". Basglidare (2, e, 10).
- [x] **Räknestickan: logaritmlagarna i trä** (ma2c-5.4). KLAR 2026-07-11, `ma2c-5.4.js` (id: 5.4, 5.5). Två dragbara
  log-graderade linjaler; eleven räknar 2,3 · 3,1 på riktigt genom att
  skjuta — och ser sträckorna lg a + lg b adderas som färgade segment.
  Lägen: potenslagen (n kopior av segmentet), division (skjut åt andra
  hållet). Insikt: lagarna är exakt det som får mekanismen att fungera.
- [x] **Lådagrammet som lever** (ma2c-6.1–6.2). KLAR 2026-07-12, `ma2c-6.2.js`. Dragbara datapunkter med
  lådagram + medelvärdesmarkör live; dra en punkt till extremvärde: medel
  rusar, medianen ligger kvar. Uppdrag: "gör två datamängder med SAMMA
  lådagram men helt olika utseende" (lådans blinda fläck).
- [x] **Standardavvikelsen i handen** (ma2c-6.4). Dragbara punkter på
  tallinje; μ som markör, σ som skuggat band; kvadraterna på avvikelserna
  syns svagt (koppling till formeln); dra ut en outlier och se σ svälla.
  Missuppfattning: σ = variationsbredd.
- [x] **Galtonbrädan** (KLAR 2026-07-11, `ma2c-6.5.js`) (ma2c-6.5). VÅG 1. Kulor studsar vänster/höger genom
  spikrader; histogram byggs i realtid; glidare för antal kulor (10→10 000)
  och rader; formen stabiliseras mot klockkurvan; överlagra normalkurvan.
  Prediktion: "gissa slutformen" före körning. Lager: 68–95–99,7-zonerna
  med μ- och σ-glidare (procenttalen står stilla när kurvan flyttas/breddas).
- [x] **Minsta kvadratmetoden med riktiga kvadrater** (KLAR 2026-07-11, `ma2c-6.6.js`) (ma2c-6.6–6.7).
  VÅG 1. Fas 1: eleven lägger sin EGEN linje; varje residual ritas som
  bokstavlig kvadrat, totalarea som mätare. Fas 2: "minimera"-knappen
  animerar linjen till regressionslinjen; elevens poäng = hur nära hen kom.
  Dra en outlier: arean växer kvadratiskt → därför styr outliers så hårt.
  Lager: byt modell (linjär/exponentiell/potens) och jämför residualareor.

### Ma3c — gränsvärden och derivata

- [x] **Rationella uttryckets hål** (ma3c-1.1, ma3c-1.4). KLAR 2026-07-12, `ma3c-1.4.js`. Grafen av
  (x²−1)/(x−1) = linjen x+1 med punkterat hål; dra x-markören mot 1 från
  båda håll med live-tabell (0,99 → 1,99 …); zoom kring hålet; toggle
  "faktorisera" stryker gemensam faktor med animation. Insikt: gränsvärdet
  finns fast värdet saknas.
- [x] **Sekanten blir tangent** (ma3c-2.1–2.3). VÅG 1 — PILOT, KLAR
  2026-07-11 (`data/visualiseringar/ma3c-2.3.js`). f(x) = x², a = 5 som i
  genomgångens Exempel 1 (f′(5) = 10). Fyra steg: 1) Sekanten (dragbara
  punkter P/Q + h-glidare, Δ-triangel med h och f(a+h) − f(a)),
  2) Ändringskvoten (kedjeformeln med aktuella värden, grön som sekanten),
  3) Gränsvärdet (knappen "Låt h gå mot 0" animerar, tangenten röd streckad,
  lim-formeln), 4) Derivatan (prickspår (a, k) i undre koordinatsystem +
  facit-linjen f′(x) = 2x). Missuppfattning: tangent och derivata som två
  orelaterade begrepp.
- [x] **Deriverbarhets-mikroskopet** (ma3c-2.5). KLAR 2026-07-11, `ma3c-2.5.js`. Klicka en punkt på vald
  kurva (sin x, x², |x|, x^(1/3)); cirkulär lins med zoom ×1 → ×1000;
  släta kurvor rätas ut till en linje (lutningen ÄR derivatan), |x| i 0
  förblir ett V oavsett zoom; vänster-/högerlutning visas (−1 vs +1).
  Gissa först: "kommer den att räta ut sig?"
- [x] **Rita derivatan själv** (ma3c-3.1–3.2, ma4-2.5). KLAR 2026-07-12, `ma3c-3.1.js`. Given kurva;
  tangent glider med lutningsmätare; eleven RITAR sin gissning av
  f′-kurvan i ett tomt system under; "plotta"-knappen låter lutnings-
  punkterna falla ner och den riktiga kurvan växa fram — elevens gissning
  ligger kvar som spöklinje. cos x uppenbarar sig ur sin x.
- [x] **Hitta talet e** (KLAR 2026-07-11, `ma3c-3.4.js`) (ma3c-3.4–3.5). VÅG 1. Glidare för basen a
  (1,5 → 4): kurvorna a^x och dess (numeriska) derivata ritas — röd under
  blå vid a = 2, över vid a = 3; uppdraget är att hitta basen där de
  sammanfaller (≈ 2,718). Lager: kvoten D(a^x)/a^x som konstant = ln a.
  Gissa först: "närmare 2 eller 3?" Insikt: e är lösningen på ett
  sökproblem, inte ett godtyckligt tal.

### Ma3c — kurvkonstruktion och integraler

- [x] **Konkavitetsbilen** (ma3c-4.1–4.5). KLAR 2026-07-11, `ma3c-4.1.js` (täcker även f/f′/f″-synk via mätarna). En bil kör längs kurvan
  (positionsglidare); instrumentpanel med lutningsmätare (f′) och
  rattvridnings-indikator (f″); teckentabellen byggs upp LIVE i takt med
  färden; extrempunkter och inflexionspunkter flaggas vid passage.
  Insikt: teckentabellen är en körjournal, inte död bokföring.
- [x] **Tre synkade grafer: f, f′, f″** (ma3c-4.4). Lodrät linje dras i
  x-led över tre staplade grafer; konvex/konkav färgkodas på f samtidigt
  som tecknen på f″ lyser. Missuppfattning: blandar växande/avtagande (f′)
  med buktar upp/ner (f″).
- [x] **Extremvärdesfabriken: lådan** (ma3c-4.6–4.7, ma4-2.9). KLAR 2026-07-11, `ma3c-4.6.js`. Dra
  hörnklippet x på ett kartongark; arket viks till låda i enkel
  3D-projektion, volymen visas; (x, V(x)) prickas i en graf som fylls av
  elevens egen utforskning; gissa först var maximum ligger; toggle V′(x)
  bekräftar med nollställe. Fler scenarier: staket mot vägg, burk med
  minimal plåtarea.
- [x] **Primitivornas parallellskara** (ma3c-5.1–5.2). KLAR 2026-07-12, `ma3c-5.1.js`. f given överst;
  under: F(x) + C med C-glidare, hela skaran som spår; tangenter på TRE av
  skarans kurvor samtidigt — alla parallella, lutning = f(x). Uppdrag:
  "hitta den primitiva som går genom (1, 3)" — dra C tills kurvan snäpper.
  Insikt: +C är en fysisk frihetsgrad, inte ett straffpoäng-mysterium.
- [x] **Riemann-kläm** (KLAR 2026-07-11, `ma3c-5.3.js`) (ma3c-5.3, ma4-3.2). VÅG 1. Glidare för antal
  staplar n (1→200); radioval vänster/höger/mitt/trapets; visa över- OCH
  undersumma samtidigt i två färger — differensen som krympande stapel.
  Gissa arean först. Insikt: integralen är gränsvärdet av en summa;
  ∫-tecknet betyder summa.
- [x] **Fundamentalsatsen: arean har en lutning** (ma3c-5.4). VÅG 1 — KLAR 2026-07-11, `ma3c-5.4.js`.
  Dra x-markören: arean 0→x skuggas och A(x) plottas i undre systemet;
  vid markören visas "f(x) = 2,3" och "A:s lutning nu = 2,3" sida vid sida
  — alltid lika. Där f < 0 krymper A synligt. Gissa först: "var växer A
  snabbast?"
- [x] **Kurvor emellan: skannern** (ma3c-5.6, ma4-3.4). KLAR 2026-07-12, `ma3c-5.6.js`. En vertikal
  skanner dras över området mellan två kurvor; vid varje läge visas
  stapeln (övre − undre) med höjd utskriven; bakom skannern fylls arean;
  vid korsning byter stapeln färg (teckenbyte → dela upp integralen);
  skärningspunkterna snäpps som gränsförslag.
- [x] **Integralen som resemätare** (ma3c-5.7, ma4-3.5). KLAR 2026-07-11, `ma3c-5.7.js`. Dragbar
  v(t)-kurva; play: bilen kör, arean skuggas i takt med färden, vägmätaren
  = areavärdet; negativ v: bilen backar, röd area, sträcka vs total resa
  skiljs åt. Uppdrag: "forma kurvan så bilen är tillbaka på start efter
  10 s" (integralen = 0). Insikt: enheter multipliceras, m/s · s = m.

### Ma3c/Ma4 — trigonometri

- [x] **Enhetscirkeln rullas ut** (ma3c-6.2, ma4-1.2, ma4-1.5, ma4-1.10).
  VÅG 1 — KLAR 2026-07-11, `ma3c-6.2.js`. Dra punkten runt cirkeln; en tråd förbinder punktens höjd med en
  penna som ritar sinuskurvan; bågen punkten passerat visas som markerad
  längd på x-axeln — radianer = utrullad båge, gratis. Kryssrutor sin/cos/
  tan. Lager (ma4-1.5): "radien som måttband" — böj radien längs bågen,
  räknaren tickar 1, 2, 3 … 6 hela + 0,28 ≈ 2π per varv, oberoende av
  radie.
- [x] **Trig-ekvationens alla lösningar** (ma3c-6.3–6.4, ma4-1.3–1.4). KLAR 2026-07-11, `ma3c-6.3.js`.
  Dra linjen y = k: i enhetscirkeln lyser de TVÅ strålarna (speglade i
  y-axeln); i grafen prickas alla skärningar, färgade per familj
  (v + n·360° blå, 180° − v + n·360° röd); dra k mot 1 → familjerna
  smälter ihop; över 1 → tomt. Insikt: den "glömda lösningen" är en
  spegling, inte en regel.
- [x] **Areasatsen: höjden fälls upp** (ma3c-6.5). KLAR 2026-07-12, `ma3c-6.5.js`. Dra vinkeln C mellan
  sidorna a, b; höjden b·sin C som fallande lod; arean mot C plottas
  parallellt — en sinusbåge med max vid 90°. Gissa först: "vilken vinkel
  ger störst area?"
- [x] **Sinussatsen på omskrivna cirkeln** (ma3c-6.6, ma3c-6.8). KLAR 2026-07-11, `ma3c-6.6.js`. Triangel
  med hörnen dragbara PÅ sin omskrivna cirkel; a/sin A, b/sin B, c/sin C
  avläses live — alltid identiska; dra ett hörn längs bågen: vinkeln fryst
  (randvinkelsatsen!); glidare för R visar kvoten = 2R.
- [x] **Cosinussatsen = Pythagoras + korrektion** (ma3c-6.7). KLAR 2026-07-12, `ma3c-6.7.js`. Kvadraterna
  a², b², c² som areor + korrektionsytan −2ab·cos C (röd dras bort vid
  C < 90°, grön läggs till vid C > 90°); dra C genom 90°: korrektionen
  krymper till noll och Pythagoras blinkar fram som specialfall.
- [x] **Tangenten på tan-linjen** (ma4-1.13). KLAR 2026-07-12, `ma4-1.13.js`. Enhetscirkel med vertikal
  tangentlinje i (1, 0); strålen från origo förlängs till skärning — höjden
  ÄR tan v, plottas simultant; nära 90° rusar skärningen mot oändligheten
  (asymptot som rörelsefenomen); efter 180° samma linje igen → perioden π.
- [x] **Additionsformlerna i rektangeln** (ma4-1.8). KLAR 2026-07-12, `ma4-1.8.js` (id: 1.8, 1.9). Vinkelglidare α, β;
  klassiska tvåtriangel-figuren i en rektangel med varje segment färgkodat
  (sin α·cos β grönt, cos α·sin β orange); hovra en term i formeln →
  segmentet pulserar; specialfall α = β ger dubbla vinkeln-formeln.
  Missuppfattning: sin(α+β) = sin α + sin β.
- [x] **a·sin x + b·cos x är alltid en sinus** (ma4-1.14). KLAR 2026-07-11, `ma4-1.14.js`. Vänster: dragbar
  vektor (a, b); höger: kurvan + (toggle) c·sin(x + v); dra spetsen: kurvan
  formas live, c = vektorns längd (måttsatt), v = dess vinkel; rotera med
  konstant längd → ren fasförskjutning. Insikt: amplituden är √(a²+b²),
  aldrig a + b.

### Ma4 — derivator och asymptoter

- [x] **Kedjeregeln som tre kopplade tallinjer** (ma4-2.3–2.4). KLAR 2026-07-11, `ma4-2.3.js`. Tre
  vertikala tallinjer x → u = g(x) → y = f(u); dra en Δx-klamp: bilderna
  Δu och Δy visas som färgade segment med förstoringarna "×g′(x)" och
  "×f′(u)" utskrivna; totalfaktorn = produkten. Dra x-punkten: faktorerna
  ändras live. Förval: sin(x²), e^(2x), (3x+1)⁵. Missuppfattning: glömmer
  inre derivatan.
- [x] **Produktregeln som växande rektangel** (ma4-2.7). KLAR 2026-07-11, `ma4-2.7.js`. Rektangel med
  sidor f(x) och g(x); dra Δx: tillskottet delas i remsorna f·Δg och g·Δf
  plus hörnet Δf·Δg; dra Δx → 0: hörnets ANDEL går mot noll (procentmätare).
  Jämför med felsvaret f′·g′. Kvotregeln som lager 2. Missuppfattning:
  derivatan av produkt = produkten av derivator.
- [x] **Sneda asymptoter genom utzoomning** (ma4-2.12–2.14). KLAR 2026-07-11, `ma4-2.12.js`. Knapp "dela":
  polynomdivisionen animeras till kvot + rest/nämnare, kvotlinjen ritas
  streckad; zoomglidare ×1 → ×50: kurvan smälter ihop med linjen medan
  restens värde visas som krympande stapel vid dragbar x-markör; vertikala
  asymptoter som inzoomningsläge vid nämnarens nollställe.

### Ma4 — integraler och komplexa tal

- [x] **Täthetsfunktionen föds ur histogrammet** (ma4-3.6). KLAR 2026-07-11, `ma4-3.6.js`. 500 datapunkter
  regnar ner i ett histogram; glidare för klassbredd 20 cm → 0,5 cm:
  staplarna smalnar och en slät kurva träder fram (normerad, totalarea = 1);
  dra gränser a, b: skuggad area = faktisk andel punkter som landade där.
  Fälla: "P(exakt 178,0 cm)?" — kläm ihop intervallet, arean → 0.
  Missuppfattning: sannolikhet = kurvans höjd.
- [x] **Rotationskroppar steg för steg** (ma4-3.7–3.8). VÅG 1 — KLAR 2026-07-11, `ma4-3.7.js`. Steg:
  1) välj/rita kurvan, 2) dra rotationsglidaren 0°–360° som sveper fram
  kroppen i 3D-projektion, 3) skiva: n-glidare visar cylinderskivorna,
  varje skiva kan lyftas ut och visas ensam med volymen π·f(x)²·Δx,
  4) summera: stapelsumman konvergerar mot integralvärdet, formeln byggs
  term för term. Kring y-axeln: skivorna blir RINGAR med area π(R²−r²) —
  eget utforskningsläge. Gissa först: "vilken axel ger störst volym?"
- [x] **Komplexa planet: multiplikation som rotation + skalning** (KLAR 2026-07-11, `ma4-4.5.js`, täcker även de Moivre + zⁿ = w)
  (ma4-4.5–4.7). VÅG 1 (svit). Dra visarna z och w: produkten ritas live;
  vinkelbågarna staplas synligt (argumenten adderas), beloppen
  multipliceras på en skalstapel. Lager: ett rutnät med inbäddad F-figur
  transformeras av w ↦ z·w — multiplikation är en avbildning av hela
  planet. Missuppfattning: komplex multiplikation som "FOIL utan mening".
- [x] **de Moivre-spiralen och n:te rötterna** (ma4-4.8–4.9). KLAR 2026-07-11 — ingår i `ma4-4.5.js` (steg 3–4). Knapp
  "upphöj": z, z², z³ … ritas som spiral av visare med lika vinkelsteg.
  z^n = w: dra w fritt, de n rötterna ritas som regelbunden n-hörning;
  dra w ett helt varv runt origo → polygonen roterar bara 1/n varv (aha:
  därför n rötter). Klick på en rot animerar z → z² → … → z^n tills den
  landar på w. Missuppfattning: z^n = w har en lösning.
- [x] **Eulers formel: den vinkelräta hastigheten** (ma4-4.10). KLAR 2026-07-12, `ma4-4.10.js`. Dra t:
  punkten e^(it) med positionsvisare och hastighetspil (alltid vinkelrät,
  lika lång — multiplikation med i); jämförelseläge: samma regel med reell
  tillväxt (hastighet = position → e^t-stråle rakt ut) mot imaginär
  (vinkelrät → cirkel), två partiklar sida vid sida. Insikt: varför banan
  blir en cirkel — den vinkelräta puffen ändrar aldrig avståndet till origo.

---

## Arbetsgång per visualisering

1. Läs teoriavsnittet i `data/teori/` — beteckningar, exempel och
   svårighetsnivå ska speglas exakt (synk-regeln).
2. Bygg modulen i `data/visualiseringar/<id>.js`; uppdatera manifestet.
3. Skärmdumpsverifiera enligt CLAUDE.md-checklistan (etiketter, konturer,
   kursivering, decimalkomma) + testa touch/smal skärm + fullskärm.
4. Kör verifierare (`verify-no-white-outline.js` m.fl. i tillämpliga delar).
5. Bocka av i denna fil och nämn i "Senaste uppdateringar" på startsidan
   när en större grupp är klar.

## Öppna frågor (beslutas vid pilot)

- Exakt kort-design (tag "Utforska"? metatext?).
- Visualiseringar i presentationsläget — samma mount-API bör räcka.
- Ska fysikkurserna också kunna få inline-visualiseringar via samma system
  på sikt (utöver befintliga simuleringssidor)?
