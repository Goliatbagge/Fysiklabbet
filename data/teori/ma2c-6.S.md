---
id: ma2c-6.S
title: Sammanfattning
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.S'
---

# Sammanfattning — Statistik

Det här kapitlet handlade om att beskriva och tolka statistiskt material. Du
har sett hur en datamängd sammanfattas med lägesmått som medelvärde, median
och typvärde, och hur dess spridning beskrivs med variationsbredd, lådagram,
kvartilavstånd och standardavvikelse. Du har också sett hur
normalfördelningen används för att uppskatta andelar, samt hur linjär och
andra regressionsmodeller används för att hitta och beskriva samband mellan
två variabler. Genomgående används digitala verktyg som Geogebra för
beräkningarna. Du ska efter kapitlet kunna välja rätt läges- och
spridningsmått för en given situation, tolka lådagram och
normalfördelningskurvor, samt ta fram och tolka en regressionsmodell.

## Begrepp att kunna

- **lägesmått**: ett sammanfattande värde för ett statistiskt material; de
  vanligaste är medelvärde, median och typvärde.
- **medelvärde**: summan av alla värden delat med antalet värden; det
  vanligaste lägesmåttet, men känsligt för enstaka extremvärden.
- **median**: värdet i mitten när alla värden sorterats i storleksordning
  (medelvärdet av de två mittersta om antalet är jämnt); ofta bättre än
  medelvärdet vid sned fördelning.
- **typvärde**: det värde som förekommer flest gånger; det enda lägesmåttet
  som går att använda även på data som inte är siffror.
- **frekvens**: hur många gånger ett visst värde, eller en viss klass,
  förekommer i en datamängd.
- **klass och klassmitt**: vid intervallindelad data (t.ex. i ett
  histogram) räknas varje värde som om det låg i sin klassmitt, intervallets
  mittpunkt.
- **variationsbredd**: skillnaden mellan det största och det minsta värdet
  i en datamängd; det enklaste spridningsmåttet.
- **kvartil ($Q_1$, $Q_2$, $Q_3$)**: de tre värden som delar en sorterad
  datamängd i fyra lika stora delar; $Q_2$ är samma sak som medianen.
- **lådagram**: diagram som visar minsta värdet, $Q_1$, medianen, $Q_3$ och
  största värdet; en "låda" mellan kvartilerna med "morrhår" ut till minsta
  och största värdet.
- **kvartilavstånd**: skillnaden mellan övre och nedre kvartil, $Q_3 - Q_1$;
  lådans bredd i lådagrammet, ett mått på spridningen i mitten av
  materialet.
- **percentil**: ett värde som en given andel av datamängden ligger under;
  t.ex. anger $p_{90}$ gränsen för de $10\ \%$ högsta värdena.
- **standardavvikelse ($\sigma$, $s$)**: hur mycket värdena i genomsnitt
  avviker från medelvärdet; $\sigma$ används vid totalundersökning och $s$
  vid stickprovsundersökning.
- **normalfördelning ($\mu$, $\sigma$)**: en symmetrisk fördelning kring
  medelvärdet $\mu$ där andelen värden inom ett givet antal
  standardavvikelser $\sigma$ alltid är densamma.
- **korrelation och korrelationskoefficient ($r$)**: hur starkt två
  variabler hänger ihop, avläst i ett spridningsdiagram; $r$ ligger mellan
  −1 (perfekt negativ) och 1 (perfekt positiv), och $0$ betyder ingen
  korrelation.
- **regressionslinje och regressionsmodell**: regressionslinjen är den
  räta linje som bäst beskriver ett linjärt samband (linjär regression);
  andra samband beskrivs i stället med en exponentiell, potens- eller
  andragradsmodell, och $r^2$-värdet avgör vilken modell som passar bäst.

## Formler

::: formel "Kapitlets formler"
**Medelvärde**

$$
\text{medelvärde} = \frac{\text{summan av alla värden}}{\text{antalet värden}}
$$

**Variationsbredd**

$$
\text{variationsbredd} = \text{största värdet} - \text{minsta värdet}
$$

**Kvartilavstånd**

$$
\text{kvartilavstånd} = \text{övre kvartil} - \text{nedre kvartil}
$$

Kvartilavståndet skrivs ofta $Q_3 - Q_1$.

**Standardavvikelse**

$$
\sigma = \sqrt{\frac{(x_1 - \bar{x})^{2} + (x_2 - \bar{x})^{2} + \ldots + (x_n - \bar{x})^{2}}{n}}
$$

$$
s = \sqrt{\frac{(x_1 - \bar{x})^{2} + (x_2 - \bar{x})^{2} + \ldots + (x_n - \bar{x})^{2}}{n - 1}}
$$

där

- $\sigma$ = standardavvikelse vid totalundersökning
- $s$ = standardavvikelse vid stickprovsundersökning
- $\bar{x}$ = medelvärdet
- $n$ = antalet värden

I den här kursen beräknas standardavvikelsen med ett digitalt verktyg, inte
för hand.

**Regressionsmodeller**

- Linjär: $y = kx + m$ — rät linje, konstant ökning eller minskning.
- Exponentiell: $y = C \cdot a^{x}$ — liten förändring i början, stor i
  slutet (eller tvärtom).
- Potens: $y = C \cdot x^{a}$ — kurva som vänder och går genom origo.
- Polynom (grad 2): $y = a x^{2} + b x + c$ — kurva som vänder, inte
  nödvändigtvis genom origo.

där

- $r$ = korrelationskoefficienten (mellan −1 och 1)
- $r^2$ = kvadraten på korrelationskoefficienten (mellan 0 och 1)

Ju närmare 1 (eller −1 för $r$) dessa värden ligger, desto bättre beskriver
modellen punkterna.
:::

## Viktiga samband och metoder

- Välj lägesmått efter sammanhanget: medelvärde är standard, men om enstaka
  extremvärden (uteliggare) drar med sig medelvärdet är medianen ofta mer
  representativ.
- Typvärdet är det enda lägesmåttet som fungerar även för data som inte är
  siffror, t.ex. bilmärken eller färger.
- I klassindelat material (t.ex. i ett histogram) räknas varje värde som om
  det låg i sin klassmitt när medelvärdet ska beräknas.
- I ett lådagram innehåller varje del — vänster morrhår, vänstra lådan,
  högra lådan och höger morrhår — alltid $25\ \%$ av värdena; en bred del
  betyder stor spridning i det området, en smal del liten spridning.
- Percentiler generaliserar kvartiler till hundradelar: $p_{90}$ är gränsen
  under vilken $90\ \%$ av värdena ligger, och beräknas med digitalt
  verktyg (i Geogebra: kommandot Percentil).
- Standardavvikelsen mäter hur mycket värdena i genomsnitt avviker från
  medelvärdet: större spridning ger större standardavvikelse, ingen
  spridning alls ger standardavvikelsen $0$.
- Normalfördelningskurvans klassiska procentsatser är värda att kunna
  utantill: $34{,}1\ \%$ av värdena ligger inom en standardavvikelse från
  $\mu$ åt vardera hållet, ytterligare $13{,}6\ \%$ ligger i nästa steg
  (mellan en och två standardavvikelser), och bara $2{,}3\ \%$ ligger mer
  än två standardavvikelser bort. Ju mindre spridningen är, desto högre och
  smalare blir kurvan — även om medelvärdet $\mu$ är detsamma.
- I Geogebras Envariabelanalys läser du av $n$, medelvärde, min, $Q_1$,
  median, $Q_3$ och max i samma tabell; sannolikhetskalkylatorn används i
  stället för att räkna ut andelar i en normalfördelning givet $\mu$ och
  $\sigma$.
- Ett spridningsdiagram visar om ett samband finns mellan två variabler:
  stark korrelation ger punkter tätt intill en linje, svag korrelation ger
  mer utspridda punkter; lutningen avgör om korrelationen är positiv eller
  negativ.
- Korrelationskoefficienten $r$ mäter styrkan i ett linjärt samband, medan
  $r^2$-värdet används för att jämföra hur väl olika regressionsmodeller
  (linjär, exponentiell, potens, polynom) passar samma punkter — modellen
  med $r^2$ närmast 1 är bäst anpassad.
- Kom ihåg att Geogebra kräver decimalpunkt i stället för decimalkomma när
  tal matas in, t.ex. 165,5 → 165.5.

## Figurer värda att minnas

Ett lådagram med de fem viktiga värdena — minsta värdet, nedre kvartil
$Q_1$, medianen $Q_2$, övre kvartil $Q_3$ och största värdet. Varje del
innehåller $25\ \%$ av materialet:

::: figur
<svg viewBox="22 44 166 102" width="166" height="102" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett lådagram: en låda från nedre kvartilen Q1 till övre kvartilen Q3 med medianen Q2 som streck i lådan, och morrhår ut till lägsta och högsta värdet. Varje del innehåller 25 procent av värdena."><line x1="29.2" y1="90" x2="66" y2="90" stroke="#1f2530" stroke-width="1.4"/><line x1="144.2" y1="90" x2="181" y2="90" stroke="#1f2530" stroke-width="1.4"/><line x1="29.2" y1="82" x2="29.2" y2="98" stroke="#1f2530" stroke-width="1.4"/><line x1="181" y1="82" x2="181" y2="98" stroke="#1f2530" stroke-width="1.4"/><rect x="66" y="70" width="78.2" height="40" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.4"/><line x1="112" y1="70" x2="112" y2="110" stroke="#1f2530" stroke-width="1.6"/><text x="66" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₁</text><text x="112" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₂</text><text x="144" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₃</text><line x1="30" y1="120" x2="65" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="120" x2="111" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="113" y1="120" x2="143" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="120" x2="180" y2="120" stroke="#1f2530" stroke-width="1"/><text x="47" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="89" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="128" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="162" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text></svg>
:::

Normalfördelningskurvan och dess klassiska procentsatser kring medelvärdet
$\mu$ och standardavvikelsen $\sigma$:

::: figur
<svg viewBox="4 22 286 134" width="286" height="134" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En normalfördelningskurva med markerade intervall: 34,1 procent mellan medelvärdet och en standardavvikelse åt vardera håll, 13,6 procent mellan en och två standardavvikelser och 2,3 procent utanför två standardavvikelser."><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 30,127.7 L 40,125.6 L 50,122 L 60,116.5 L 70,108.4 L 80,97.5 L 90,84.2 L 100,69.4 L 110,54.5 L 120,41.8 L 130,33.1 L 140,30 L 150,33.1 L 160,41.8 L 170,54.5 L 180,69.4 L 190,84.2 L 200,97.5 L 210,108.4 L 220,116.5 L 230,122 L 240,125.6 L 250,127.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="60" y1="116.5" x2="60" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="100" y1="69.4" x2="100" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="180" y1="69.4" x2="180" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="220" y1="116.5" x2="220" y2="130" stroke="#1f2530" stroke-width="1"/><text x="120" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><text x="160" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><text x="80" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><text x="200" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><text x="34" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><text x="246" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − 2<tspan font-style="italic">σ</tspan></text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − <tspan font-style="italic">σ</tspan></text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + <tspan font-style="italic">σ</tspan></text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + 2<tspan font-style="italic">σ</tspan></text></svg>
:::

Fyra typiska kurvformer som hjälper dig avgöra vilken regressionsmodell som
passar en punktsamling:

::: figur
<svg viewBox="0 0 540 120" width="540" height="120" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Fyra typkurvor: en rät linje, en exponentialkurva som stiger allt brantare, en potenskurva som vänder i origo och en parabel som vänder utan att gå genom origo."><line x1="8" y1="90" x2="120" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="14" y1="96" x2="14" y2="8" stroke="#1f2530" stroke-width="1.2"/><line x1="20" y1="82" x2="112" y2="18" stroke="#2563c9" stroke-width="1.8"/><text x="64" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Linjär</text><line x1="143" y1="90" x2="255" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="149" y1="96" x2="149" y2="8" stroke="#1f2530" stroke-width="1.2"/><path d="M 152,84 Q 225,76 245,14" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="199" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Exponentiell</text><line x1="278" y1="90" x2="390" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="290" y1="96" x2="290" y2="8" stroke="#1f2530" stroke-width="1.2"/><path d="M 290,90 Q 345,90 378,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><circle cx="290" cy="90" r="2.4" fill="#2563c9"/><text x="334" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Potens</text><line x1="413" y1="90" x2="525" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="419" y1="96" x2="419" y2="8" stroke="#1f2530" stroke-width="1.2"/><path d="M 428,20 Q 470,132 516,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="469" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Polynom</text></svg>
:::

## Inför provet

- Kan du förklara skillnaden mellan medelvärde, median och typvärde, och
  avgöra vilket som är lämpligast i ett givet fall?
- Vet du hur man beräknar medelvärdet för klassindelat material med hjälp
  av klassmitter?
- Kan du för hand bestämma variationsbredd, kvartilerna $Q_1$, $Q_2$ och
  $Q_3$, samt kvartilavståndet för en datamängd?
- Kan du rita och tolka ett lådagram, och förklara att varje del innehåller
  $25\ \%$ av värdena?
- Vet du vad en percentil är, och kan du bestämma en given percentil (t.ex.
  $p_{90}$) med Geogebra?
- Kan du förklara vad standardavvikelsen mäter, och skillnaden mellan
  $\sigma$ (totalundersökning) och $s$ (stickprovsundersökning)?
- Kan du använda Geogebras Envariabelanalys för att ta fram $n$,
  medelvärde, min, kvartiler, median, max och standardavvikelse?
- Känner du till normalfördelningskurvans procentsatser ($34{,}1\ \%$,
  $13{,}6\ \%$ och $2{,}3\ \%$) och kan du använda dem för att uppskatta
  andelar?
- Kan du använda Geogebras sannolikhetskalkylator för att bestämma en andel
  i en normalfördelning, givet $\mu$ och $\sigma$?
- Kan du avgöra om en korrelation är stark eller svag, och positiv eller
  negativ, utifrån ett spridningsdiagram?
- Kan du ta fram en regressionslinjes ekvation och korrelationskoefficienten
  $r$ med digitalt verktyg, och använda ekvationen för att uppskatta
  värden?
- Vet du hur man med hjälp av $r^2$-värdet avgör vilken regressionsmodell —
  linjär, exponentiell, potens eller polynom — som passar en punktsamling
  bäst?
