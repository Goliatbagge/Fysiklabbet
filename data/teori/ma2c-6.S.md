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
  som går att använda även på data som inte är tal.
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

På den här nivån beräknas standardavvikelsen med ett digitalt verktyg, inte
för hand.

**Regressionsmodeller**

- Linjär: $y = kx + m$ — rät linje, konstant ökning eller minskning.
- Exponentiell: $y = C \cdot a^{x}$ — liten förändring i början, stor i
  slutet (eller tvärtom).
- Potens: $y = C \cdot x^{a}$ — kurva som vänder och går genom origo.
- Polynom (grad 2): $y = a x^{2} + b x + c$ — kurva som vänder, inte
  nödvändigtvis genom origo.

där

- $r$ = korrelationskoefficient (mellan −1 och 1)
- $r^2$ = kvadraten på korrelationskoefficienten (mellan 0 och 1)

Ju närmare 1 (eller −1 för $r$) dessa värden ligger, desto bättre beskriver
modellen punkterna.
:::

## Viktiga samband och metoder

- Välj lägesmått efter sammanhanget: medelvärde är standard, men om enstaka
  extremvärden (uteliggare) drar med sig medelvärdet är medianen ofta mer
  representativ.
- Typvärdet är det enda lägesmåttet som fungerar även för data som inte är
  tal, till exempel bilmärken eller färger.
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
<svg viewBox="22 44 166 102" width="287" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett lådagram: en låda från nedre kvartilen Q1 till övre kvartilen Q3 med medianen Q2 som streck i lådan, och morrhår ut till lägsta och högsta värdet. Varje del innehåller 25 procent av värdena. Peka eller tryck på en del av lådagrammet så visas vad den betyder." style="overflow:visible"><style>.m62-s{cursor:pointer;outline:none}.m62-s .m62-ln{transition:stroke-width .18s ease}.m62-s:hover .m62-ln,.m62-s:focus .m62-ln{stroke-width:3}.m62-s .m62-box{transition:fill .18s ease}.m62-s:hover .m62-box,.m62-s:focus .m62-box{fill:#79aacb}.m62-s .m62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m62-s:hover .m62-lbl,.m62-s:focus .m62-lbl{opacity:1}</style><g class="m62-s" tabindex="0"><rect x="24" y="78" width="44" height="24" fill="transparent"/><line class="m62-ln" x1="29.2" y1="90" x2="66" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="29.2" y1="82" x2="29.2" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="22" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="43" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Lägsta</text><text x="43" y="117" font-size="9" text-anchor="middle" fill="#1f2530">värdet</text></g></g><g class="m62-s" tabindex="0"><rect x="140" y="78" width="46" height="24" fill="transparent"/><line class="m62-ln" x1="144.2" y1="90" x2="181" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="181" y1="82" x2="181" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="146" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="167" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Högsta</text><text x="167" y="117" font-size="9" text-anchor="middle" fill="#1f2530">värdet</text></g></g><g class="m62-s" tabindex="0"><rect class="m62-box" x="66" y="70" width="78.2" height="40" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="72" y="79" width="66" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">Mittersta 50 %</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">av värdena</text></g></g><g class="m62-s" tabindex="0"><rect x="105" y="68" width="14" height="44" fill="transparent"/><line class="m62-ln" x1="112" y1="70" x2="112" y2="110" stroke="#1f2530" stroke-width="1.6"/><g class="m62-lbl"><rect x="76" y="79" width="58" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">Medianen</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">(mittvärdet)</text></g></g><text x="66" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₁</text><text x="112" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₂</text><text x="144" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₃</text><line x1="30" y1="120" x2="65" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="120" x2="111" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="113" y1="120" x2="143" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="120" x2="180" y2="120" stroke="#1f2530" stroke-width="1"/><text x="47" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="89" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="128" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="162" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text></svg>

Peka eller tryck på en del av lådagrammet så visas vad den betyder.
:::

Normalfördelningskurvan och dess klassiska procentsatser kring medelvärdet
$\mu$ och standardavvikelsen $\sigma$:

::: figur
<svg viewBox="4 22 286 134" width="515" height="241" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En normalfördelningskurva med markerade intervall: 34,1 procent mellan medelvärdet och en standardavvikelse åt vardera håll, 13,6 procent mellan en och två standardavvikelser och 2,3 procent utanför två standardavvikelser. Peka eller tryck på ett intervall så färgas området och den samlade andelen visas." style="overflow:visible"><style>.m65-s{cursor:pointer;outline:none}.m65-s .m65-om{fill:#8fb8d8;opacity:0;transition:opacity .18s ease}.m65-s:hover .m65-om,.m65-s:focus .m65-om{opacity:.45}.m65-s .m65-pc{transition:fill .18s ease}.m65-s:hover .m65-pc,.m65-s:focus .m65-pc{fill:#c8324a;font-weight:600}.m65-s .m65-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m65-s:hover .m65-lbl,.m65-s:focus .m65-lbl{opacity:1}</style><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 22,128.7 L 24,128.5 L 26,128.3 L 28,128 L 30,127.7 L 32,127.4 L 34,127 L 36,126.6 L 38,126.1 L 40,125.6 L 42,125 L 44,124.4 L 46,123.7 L 48,122.9 L 50,122 L 52,121.1 L 54,120.1 L 56,119 L 58,117.8 L 60,116.5 L 62,115.1 L 64,113.6 L 66,111.9 L 68,110.2 L 70,108.4 L 72,106.4 L 74,104.4 L 76,102.2 L 78,99.9 L 80,97.5 L 82,95 L 84,92.5 L 86,89.8 L 88,87 L 90,84.2 L 92,81.3 L 94,78.4 L 96,75.4 L 98,72.4 L 100,69.3 L 102,66.3 L 104,63.3 L 106,60.3 L 108,57.4 L 110,54.5 L 112,51.7 L 114,49 L 116,46.5 L 118,44 L 120,41.8 L 122,39.6 L 124,37.7 L 126,35.9 L 128,34.4 L 130,33.1 L 132,32 L 134,31.1 L 136,30.5 L 138,30.1 L 140,30 L 142,30.1 L 144,30.5 L 146,31.1 L 148,32 L 150,33.1 L 152,34.4 L 154,35.9 L 156,37.7 L 158,39.6 L 160,41.8 L 162,44 L 164,46.5 L 166,49 L 168,51.7 L 170,54.5 L 172,57.4 L 174,60.3 L 176,63.3 L 178,66.3 L 180,69.3 L 182,72.4 L 184,75.4 L 186,78.4 L 188,81.3 L 190,84.2 L 192,87 L 194,89.8 L 196,92.5 L 198,95 L 200,97.5 L 202,99.9 L 204,102.2 L 206,104.4 L 208,106.4 L 210,108.4 L 212,110.2 L 214,111.9 L 216,113.6 L 218,115.1 L 220,116.5 L 222,117.8 L 224,119 L 226,120.1 L 228,121.1 L 230,122 L 232,122.9 L 234,123.7 L 236,124.4 L 238,125 L 240,125.6 L 242,126.1 L 244,126.6 L 246,127 L 248,127.4 L 250,127.7 L 252,128 L 254,128.3 L 256,128.5 L 258,128.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="60" y1="116.5" x2="60" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="100" y1="69.4" x2="100" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="180" y1="69.4" x2="180" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="220" y1="116.5" x2="220" y2="130" stroke="#1f2530" stroke-width="1"/><g class="m65-s" tabindex="0"><rect x="20" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="20,130 20,128.9 30,127.7 40,125.6 50,122 60,116.5 60,130"/><text class="m65-pc" x="34" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><g class="m65-lbl"><rect x="4" y="30" width="112" height="15" rx="4" fill="#f3eee4"/><text x="60" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Utanför <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 4,6 %</text></g></g><g class="m65-s" tabindex="0"><rect x="60" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="60,130 60,116.5 70,108.4 80,97.5 90,84.2 100,69.4 100,130"/><text class="m65-pc" x="80" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><g class="m65-lbl"><rect x="8" y="30" width="108" height="15" rx="4" fill="#f3eee4"/><text x="62" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 95,4 %</text></g></g><g class="m65-s" tabindex="0"><rect x="100" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="100,130 100,69.4 110,54.5 120,41.8 130,33.1 140,30 140,130"/><text class="m65-pc" x="120" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><g class="m65-lbl"><rect x="16" y="30" width="100" height="15" rx="4" fill="#f3eee4"/><text x="66" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± <tspan font-style="italic">σ</tspan>: 68,2 %</text></g></g><g class="m65-s" tabindex="0"><rect x="140" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="140,130 140,30 150,33.1 160,41.8 170,54.5 180,69.4 180,130"/><text class="m65-pc" x="160" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34,1 %</text><g class="m65-lbl"><rect x="164" y="30" width="100" height="15" rx="4" fill="#f3eee4"/><text x="214" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± <tspan font-style="italic">σ</tspan>: 68,2 %</text></g></g><g class="m65-s" tabindex="0"><rect x="180" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="180,130 180,69.4 190,84.2 200,97.5 210,108.4 220,116.5 220,130"/><text class="m65-pc" x="200" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13,6 %</text><g class="m65-lbl"><rect x="164" y="30" width="108" height="15" rx="4" fill="#f3eee4"/><text x="218" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Inom <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 95,4 %</text></g></g><g class="m65-s" tabindex="0"><rect x="220" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="220,130 220,116.5 230,122 240,125.6 250,127.7 260,128.9 260,130"/><text class="m65-pc" x="246" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2,3 %</text><g class="m65-lbl"><rect x="164" y="30" width="112" height="15" rx="4" fill="#f3eee4"/><text x="220" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Utanför <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 4,6 %</text></g></g><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − 2<tspan font-style="italic">σ</tspan></text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − <tspan font-style="italic">σ</tspan></text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + <tspan font-style="italic">σ</tspan></text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + 2<tspan font-style="italic">σ</tspan></text></svg>

Peka eller tryck på ett intervall så färgas området och den samlade
andelen visas.
:::

Fyra typiska kurvformer som hjälper dig avgöra vilken regressionsmodell som
passar en punktsamling:

::: figur
<svg viewBox="0 0 540 120" width="664" height="148" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Fyra typkurvor: en rät linje, en exponentialkurva som stiger allt brantare, en potenskurva som vänder i origo och en parabel som vänder utan att gå genom origo. Peka eller tryck på en kurva så visas modellens ekvation." style="overflow:visible"><style>.m67-s{cursor:pointer;outline:none}.m67-s .m67-kv{transition:stroke-width .18s ease}.m67-s:hover .m67-kv,.m67-s:focus .m67-kv{stroke-width:3.2}.m67-s .m67-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m67-s:hover .m67-lbl,.m67-s:focus .m67-lbl{opacity:1}</style><g class="m67-s" tabindex="0"><rect x="0" y="0" width="128" height="120" fill="transparent"/><line x1="8" y1="90" x2="120" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="14" y1="96" x2="14" y2="8" stroke="#1f2530" stroke-width="1.2"/><line class="m67-kv" x1="20" y1="82" x2="112" y2="18" stroke="#2563c9" stroke-width="1.8"/><text x="64" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Linjär</text><g class="m67-lbl"><rect x="18" y="10" width="66" height="15" rx="4" fill="#f3eee4"/><text x="22" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">k</tspan><tspan font-style="italic">x</tspan> + <tspan font-style="italic">m</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="135" y="0" width="128" height="120" fill="transparent"/><line x1="143" y1="90" x2="255" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="149" y1="96" x2="149" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 152,84 Q 225,76 245,14" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="199" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Exponentiell</text><g class="m67-lbl"><rect x="153" y="10" width="62" height="15" rx="4" fill="#f3eee4"/><text x="157" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">C</tspan> · <tspan font-style="italic">a</tspan><tspan font-style="italic" font-size="7" dy="-4">x</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="270" y="0" width="128" height="120" fill="transparent"/><line x1="278" y1="90" x2="390" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="290" y1="96" x2="290" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 290,90 Q 345,90 378,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><circle cx="290" cy="90" r="2.4" fill="#2563c9"/><text x="334" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Potens</text><g class="m67-lbl"><rect x="294" y="10" width="62" height="15" rx="4" fill="#f3eee4"/><text x="298" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">C</tspan> · <tspan font-style="italic">x</tspan><tspan font-style="italic" font-size="7" dy="-4">a</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="405" y="0" width="135" height="120" fill="transparent"/><line x1="413" y1="90" x2="525" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="419" y1="96" x2="419" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 428,20 Q 470,132 516,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="469" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Polynom</text><g class="m67-lbl"><rect x="426" y="34" width="94" height="15" rx="4" fill="#f3eee4"/><text x="431" y="45" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">a</tspan><tspan font-style="italic">x</tspan><tspan font-size="7" dy="-4">2</tspan><tspan dy="4"> + </tspan><tspan font-style="italic">b</tspan><tspan font-style="italic">x</tspan> + <tspan font-style="italic">c</tspan></text></g></g></svg>

Peka eller tryck på en kurva så visas modellens ekvation.
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
