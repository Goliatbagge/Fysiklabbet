---
id: ma1b-3.S
title: Sammanfattning
course: Matematik nivå 1b
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.S'
---

<!-- OBS: egen 1b-version, baserad på motsvarande ma1c-fil. Ändras
     kapitlets GEMENSAMMA innehåll i 1c-sammanfattningen: gör samma
     ändring här (bara de här tre sammanfattningarna är egna filer —
     allt annat delas via MA1B_ALIAS i data/katalog.js). -->

# Sammanfattning — Procentuella förändringar

Det här kapitlet handlade om att räkna med procentuella förändringar: hur
andelar anges som procent, promille och ppm, hur en förändringsfaktor gör
att ett nytt värde kan räknas ut i ett enda steg, och hur upprepade
förändringar (t.ex. flera års ränta) kombineras till en total
förändringsfaktor. Med indextal jämförde vi priser och löner med ett
basår — konsumentprisindex (KPI) mäter prisnivån och gör att belopp kan
räknas om mellan olika års penningvärden. Kapitlet visade också hur ett
kalkylblad används för att beräkna behållning vid sparande och för att
bygga en amorteringsplan vid lån. Du ska efter kapitlet kunna räkna med
andelar, förändringsfaktorer, index och ränta, samt bygga
kalkylbladsformler med relativa och låsta cellreferenser.

## Begrepp att kunna

- **procent (%)**: hundradel; $1\ \% = \dfrac{1}{100} = 0{,}01$.
- **promille (‰)**: tusendel; $1\ \text{‰} = \dfrac{1}{1\,000} = 0{,}001$.
- **ppm (parts per million)**: miljondel;
  $1\ \text{ppm} = \dfrac{1}{1\,000\,000} = 0{,}000\,001$.
- **andel**: delen genom det hela, angiven i bråk- eller decimalform.
- **förändringsfaktor**: talet man multiplicerar det gamla värdet med för
  att direkt få det nya värdet vid en procentuell förändring.
- **total förändringsfaktor**: produkten av flera förändringsfaktorer vid
  upprepade förändringar.
- **indextal**: ett värde angivet i förhållande till ett basår, som en
  procentuell jämförelse utan procenttecken; basåret har alltid index 100.
- **basår**: det år som valts som jämförelsepunkt i en indexserie.
- **konsumentprisindex (KPI)**: SCB:s indextal över den allmänna
  prisnivån på hushållens varor och tjänster, med 1980 som basår.
- **inflation**: att den allmänna prisnivån stiger (KPI ökar), så att
  pengarna räcker till mindre.
- **ränta**: ersättning eller kostnad för lånade pengar, oftast angiven i
  procent (räntesats).
- **årsränta**: den procentsats med vilken ett belopp växer (eller
  kostar) per år; det som avses om enbart "ränta" nämns.
- **behållning**: beloppet som finns på ett sparkonto vid en given
  tidpunkt.
- **kalkylblad, cell**: verktyg (t.ex. Google Kalkylark, Excel) uppbyggt
  av celler namngivna med kolumnbokstav + radnummer (t.ex. B3); en formel
  i en cell inleds alltid med likhetstecknet =.
- **fyllnadshandtag**: verktyget i kalkylbladets nedre högra cellhörn som
  kopierar en formel neråt i en kolumn.
- **relativ och låst cellreferens**: en relativ referens (`B2`) ändras när
  formeln kopieras till en ny rad; en låst referens (`$B$12`) hålls fast.
- **lån**: pengar som lånas, från t.ex. en bank, och som ska betalas
  tillbaka.
- **amortera / amortering**: återbetalning av själva lånebeloppet
  (skulden).
- **räntesats**: räntan uttryckt i procent av skulden.
- **rak amortering**: samma amorteringsbelopp betalas vid varje
  inbetalning, så räntan (och därmed hela inbetalningen) minskar efter
  hand som skulden minskar.

## Formler

::: formel "Kapitlets formler"
**Procent, promille och ppm**

$$
1\ \% = \frac{1}{100} = 0{,}01
\qquad
1\ \text{‰} = \frac{1}{1\,000} = 0{,}001
\qquad
1\ \text{ppm} = \frac{1}{1\,000\,000} = 0{,}000\,001
$$

**Andel**

$$
\text{andel} = \frac{\text{delen}}{\text{hela}}
$$

där andelen anges i bråk- eller decimalform (kan räknas om till procent,
promille eller ppm).

**Förändringsfaktor**

$$
\text{förändringsfaktor} = \frac{\text{nya värdet}}{\text{gamla värdet}}
\quad\Longleftrightarrow\quad
\text{nya värdet} = \text{förändringsfaktor} \cdot \text{gamla värdet}
$$

där det man **jämför med** motsvarar det gamla värdet.

**Total förändringsfaktor vid upprepade förändringar**

$$
\text{total förändringsfaktor}
= \text{förändringsfaktor}_1 \cdot \text{förändringsfaktor}_2 \cdot \ldots
$$

Är alla förändringsfaktorer lika stora (t.ex. samma ränta varje år) blir
den totala förändringsfaktorn en potens:

$$
\text{nytt värde} = \text{gammalt värde} \cdot \text{förändringsfaktor}^{\,n}
$$

där *n* = antal upprepningar (t.ex. antal år).

**Indextal**

$$
\text{index} = \frac{\text{värdet}}{\text{värdet under basåret}} \cdot 100
$$

**Omräkning med index**

$$
\text{nytt belopp} = \text{gammalt belopp} \cdot
\frac{\text{index nya året}}{\text{index gamla året}}
$$

**Ränta vid lån**

$$
\text{årsränta} = \text{räntesats} \cdot \text{skuld}
$$

där räntesatsen är angiven i decimalform. Betalas lånet av månadsvis
divideras årsräntan med 12:

$$
\text{ränta per månad} = \frac{\text{årsränta}}{12}
$$

**Inbetalning vid lån**

$$
\text{inbetalning} = \text{amortering} + \text{ränta}
$$
:::

## Viktiga samband och metoder

- Vid en andelsberäkning måste delen och det hela ha **samma enhet** innan
  de sätts in i formeln — gör t.ex. om kilogram till gram innan du
  dividerar.
- Procenttriangeln är ett minnesstöd: står storheterna bredvid varandra
  ska de multipliceras, står de över varandra ska de divideras.
- Förändringsfaktorn fås genom att lägga ändringen i procentform till (vid
  ökning) eller dra ifrån (vid minskning) 100 %, och sedan skriva om till
  decimalform: $+5\ \% \to 1{,}05$, $-25\ \% \to 0{,}75$.
- Vid jämförelser ("hur många procent mer/mindre") motsvarar det du
  **jämför med** alltid det gamla värdet — byter du jämförelseobjekt får
  du ett annat procenttal (18 kr mot 22 kr ger inte samma svar som 22 kr
  mot 18 kr).
- En ökning med $x\ \%$ följd av en minskning med $x\ \%$ ger **inte**
  tillbaka samma värde, eftersom minskningen räknas på ett redan
  förändrat (större) belopp.
- Vid upprepade lika stora förändringar (t.ex. samma ränta år efter år)
  multipliceras samma förändringsfaktor med sig själv flera gånger, vilket
  ger en potens: förändringsfaktor upphöjt till antalet perioder.
- Ett indextal delat med 100 är förändringsfaktorn från basåret: index
  175 betyder faktorn 1,75, alltså 75 % över basårets värde.
- Kvoten mellan två års indextal är förändringsfaktorn **mellan de två
  åren** — så räknas ett belopp om från ett års penningvärde till ett
  annat, t.ex. med KPI.
- I ett kalkylblad låses en cellreferens som ska vara oförändrad i alla
  rader med dollartecken (`$B$12`), medan en referens som ska ändras per
  rad (`B2`) lämnas relativ.
- Vid årligt sparande med insättning varje period kombineras tillväxt
  (multiplikation med förändringsfaktorn) och ny insättning (addition) i
  samma cellformel, t.ex. `=B2*1,028+5000`.
- Vid ett lån betalar man vid varje inbetalning både **amortering**
  (avbetalning av skulden) och **ränta** (kostnaden för lånet); räntan
  beräknas på den skuld som återstår och minskar därför efter hand vid
  rak amortering.
- Anges räntan som årsränta men betalningarna sker månadsvis, ska
  räntesatsen (eller den beräknade årsräntan) delas med 12 innan den
  används i månadsberäkningen.
- En kolumn med alla inbetalningar summeras enkelt i kalkylbladet med
  SUM-funktionen, t.ex. `=SUM(D2:D61)`, för att få lånets totala kostnad.

## Figurer värda att minnas

Procenttriangeln sammanfattar sambandet mellan delen, andelen och det
hela — täck över den storhet du söker, så visar triangeln formeln:

::: figur
<svg viewBox="16 6 288 152" width="342" height="181" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Procenttriangeln: en triangel med ordet delen i toppen och orden andelen gånger hela i botten, åtskilda av ett vågrätt streck. Delen är lika med andelen gånger hela, andelen är delen genom hela och hela är delen genom andelen."><polygon points="160,10 20,150 300,150" fill="#fdfaf3" stroke="#1f2530" stroke-width="1.5"/><line x1="75" y1="95" x2="245" y2="95" stroke="#1f2530" stroke-width="1.5"/><text x="160" y="72" font-size="16" font-weight="600" text-anchor="middle" fill="#1f2530">delen</text><text x="160" y="132" font-size="16" font-weight="600" text-anchor="middle" fill="#1f2530">andelen · hela</text></svg>

Triangeln sammanfattar: delen = andelen · hela,
andelen = delen/hela och hela = delen/andelen.
:::

## Inför provet

- Kan du förklara skillnaden mellan procent, promille och ppm, och räkna
  om mellan bråkform, decimalform och de olika enheterna?
- Kan du bestämma andelen, delen eller det hela när två av de tre är
  kända, t.ex. med hjälp av procenttriangeln?
- Kan du bestämma en förändringsfaktor utifrån en procentuell ökning
  eller minskning, och vet du att en minskning ger en faktor mindre än 1?
- Kan du använda förändringsfaktorn för att räkna ut ett nytt värde
  direkt, utan mellansteg?
- Vet du att man vid jämförelser alltid utgår från det man **jämför med**
  som "gamla värdet", och att svaret beror på vilket håll man jämför?
- Kan du förklara varför en ökning med $x\ \%$ följd av en minskning med
  samma $x\ \%$ inte ger tillbaka ursprungsvärdet?
- Kan du räkna ut en total förändringsfaktor vid flera upprepade
  förändringar, t.ex. flera års sparande med samma ränta?
- Kan du bestämma ett indextal ur ett värde och basårets värde, och
  tolka vad t.ex. index 132 betyder?
- Vet du vad konsumentprisindex mäter, och kan du med två års KPI räkna
  om ett belopp till ett annat års penningvärde?
- Kan du bygga ett kalkylblad som beräknar behållningen på ett sparkonto
  år för år, och vet du skillnaden mellan en relativ (`B2`) och en låst
  (`$B$12`) cellreferens?
- Kan du bygga ett kalkylblad för ett återkommande sparande där både
  tillväxt och ny insättning ingår i samma formel?
- Vet du skillnaden mellan amortering och ränta vid ett lån, och att
  räntan beräknas på den skuld som återstår?
- Kan du räkna om en årsränta till en månadsränta och sätta upp ett
  kalkylblad som visar skuld, ränta och inbetalning månad för månad vid
  rak amortering?
- Kan du summera en kolumn i ett kalkylblad, t.ex. med SUM-funktionen,
  för att få lånets totala kostnad?
