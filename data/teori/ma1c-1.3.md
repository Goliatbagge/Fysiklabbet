---
id: ma1c-1.3
title: Addition och subtraktion av bråk
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.3'
---

# Addition och subtraktion av bråk

När du ska addera (+) och subtrahera (−) bråk underlättar det om samtliga
bråk har **samma nämnare** innan beräkningen utförs.

::: formel "Addition och subtraktion av bråk"
Om bråken har

- **samma nämnare**: addera/subtrahera täljarna, behåll nämnaren. Förkorta
  om möjligt.
- **olika nämnare**: förläng ett eller flera av bråken, så att samtliga bråk
  får samma nämnare. Sedan utför du beräkningen.
:::

::: exempel "Exempel 1 — Samma nämnare"
**Beräkna<br>a) $\dfrac{1}{13} + \dfrac{2}{13}$&emsp;&emsp;b) $\dfrac{19}{6} - \dfrac{5}{6}$**

::: handskrift
typ: samnamnare
:::

::: textlosning
**a)** Bråken har redan samma nämnare — addera täljarna och behåll nämnaren:

$$
\frac{1}{13} + \frac{2}{13} = \frac{1 + 2}{13} = \frac{3}{13}
$$

**Svar:** $\dfrac{3}{13}$

**b)** Subtrahera täljarna, behåll nämnaren — och förkorta svaret:

$$
\frac{19}{6} - \frac{5}{6} = \frac{19 - 5}{6} = \frac{14}{6} = \frac{14/2}{6/2} = \frac{7}{3}
$$

**Svar:** $\dfrac{7}{3}$
:::
:::

## Hitta en gemensam nämnare

::: formel "Hitta en gemensam nämnare"
**Metod 1:** Förläng bråket med den minsta nämnaren, så att nämnaren blir
densamma som i bråket med den största nämnaren.

**Metod 2:** Om metod 1 inte fungerar: förläng det första bråket med
nämnaren i det andra bråket, och förläng det andra bråket med nämnaren i det
första bråket. Detta ger alltid en gemensam nämnare — men inte
nödvändigtvis den *minsta* gemensamma nämnaren.
:::

::: exempel "Exempel 2 — Olika nämnare"
**Beräkna<br>a) $\dfrac{3}{5} - \dfrac{7}{20}$&emsp;&emsp;b) $\dfrac{2}{5} + \dfrac{1}{3}$**

::: handskrift
typ: olikanamnare
:::

::: textlosning
**a)** Vi kan förlänga bråket med den minsta nämnaren (5), så att nämnaren
blir densamma som i bråket med den största nämnaren (20), genom att förlänga
det med 4 (eftersom $5 \cdot 4 = 20$):

$$
\frac{3}{5} - \frac{7}{20} = \frac{3 \cdot 4}{5 \cdot 4} - \frac{7}{20}
= \frac{12}{20} - \frac{7}{20} = \frac{12 - 7}{20} = \frac{5}{20}
= \frac{5/5}{20/5} = \frac{1}{4}
$$

**Svar:** $\dfrac{1}{4}$

**b)** Den minsta nämnaren här är 3. Men vi kan inte multiplicera 3 med ett
heltal så att det blir 5 — metod 1 fungerar inte. Vi använder då metod 2 och
förlänger båda bråken med varandras nämnare: vi förlänger $\dfrac{2}{5}$ med
3 och $\dfrac{1}{3}$ med 5. Detta ger

$$
\frac{2}{5} + \frac{1}{3} = \frac{2 \cdot 3}{5 \cdot 3} + \frac{1 \cdot 5}{3 \cdot 5}
= \frac{6}{15} + \frac{5}{15} = \frac{6 + 5}{15} = \frac{11}{15}
$$

**Svar:** $\dfrac{11}{15}$
:::
:::

::: formel "Hitta minsta gemensamma nämnaren (MGN)"
1. Skriv upp nämnarna i varsin kolumn och fyll kolumnerna med deras
   multiplar, ca 8 st.
2. Den första multipeln som dyker upp i båda kolumnerna är den minsta
   gemensamma nämnaren.

**OBS!** Denna metod blir tungrodd när nämnarna är stora. Då finns en
annan metod, primtalsfaktorisering, som vi går igenom härnäst.
:::

::: exempel "Exempel 3 — Minsta gemensamma nämnaren"
**Bestäm den minsta gemensamma nämnaren till 10 och 6 och beräkna sedan
$\dfrac{7}{10} - \dfrac{1}{6}$.**

::: handskrift
typ: mgn
:::

::: textlosning
Vi skriver upp nämnarna i två kolumner och fyller på med deras multiplar:

| Multiplar av 10 | Multiplar av 6 |
| --- | --- |
| 10 | 6 |
| 20 | 12 |
| **30** | 18 |
| 40 | 24 |
| 50 | **30** |
| 60 | 36 |
| 70 | 42 |
| 80 | 48 |

Vi ser att 30 är den första multipel som dyker upp i båda kolumnerna, så
MGN = 30. Vi förlänger nu båda bråken så att nämnarna blir 30 och räknar
sedan som vanligt:

$$
\frac{7}{10} - \frac{1}{6} = \frac{7 \cdot 3}{10 \cdot 3} - \frac{1 \cdot 5}{6 \cdot 5}
= \frac{21}{30} - \frac{5}{30} = \frac{21 - 5}{30} = \frac{16}{30}
= \frac{16/2}{30/2} = \frac{8}{15}
$$

**Svar:** $\dfrac{8}{15}$
:::
:::

## Minsta gemensamma nämnaren med primtalsfaktorisering

Multipeltabellen fungerar fint så länge nämnarna är små. Men vad gör du med
$\dfrac{5}{72} + \dfrac{7}{108}$? Att skriva upp multiplar av 72 och 108
tills de möts tar lång tid, och det är lätt att räkna fel på vägen. Då finns
en metod som alltid går lika fort, oavsett hur stora nämnarna är:
**primtalsfaktorisering**.

### Primtal och faktorträd

Ett **primtal** är ett heltal större än 1 som bara är delbart med 1 och sig
självt: 2, 3, 5, 7, 11, 13, 17, 19 och så vidare. Alla andra heltal större
än 1 kan brytas ner i primtal, ungefär som en molekyl kan brytas ner i
atomer. Att **primtalsfaktorisera** ett tal betyder att skriva det som en
produkt av primtal:

$$
12 = 2 \cdot 2 \cdot 3 \qquad 18 = 2 \cdot 3 \cdot 3
$$

Enklast gör du det med ett **faktorträd**. Dela upp talet i två faktorer,
dela sedan upp varje faktor som inte är ett primtal, och fortsätt tills alla
grenar slutar i primtal. Primtalen i grenändarna är faktorerna, se figuren
nedan.

::: figur
<svg viewBox="25 12 284 146" width="385" height="198" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Två faktorträd. 12 delas i 2 och 6, och 6 delas i 2 och 3. 18 delas i 2 och 9, och 9 delas i 3 och 3. Primtalen i grenarnas ändar är inringade. Under träden står 12 = 2 · 2 · 3 och 18 = 2 · 3 · 3."><line x1="64.4" y1="30.5" x2="47.6" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="79.6" y1="30.5" x2="96.4" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="96.7" y1="74.7" x2="81.3" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="111.3" y1="74.7" x2="126.7" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><text x="72" y="25" font-size="14" text-anchor="middle" fill="#1f2530">12</text><circle cx="40" cy="64" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="40" y="69" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">2</text><text x="104" y="69" font-size="14" text-anchor="middle" fill="#1f2530">6</text><circle cx="74" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="74" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">2</text><circle cx="134" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="134" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">3</text><line x1="224.4" y1="30.5" x2="207.6" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="239.6" y1="30.5" x2="256.4" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="256.7" y1="74.7" x2="241.3" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="271.3" y1="74.7" x2="286.7" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><text x="232" y="25" font-size="14" text-anchor="middle" fill="#1f2530">18</text><circle cx="200" cy="64" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="200" y="69" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">2</text><text x="264" y="69" font-size="14" text-anchor="middle" fill="#1f2530">9</text><circle cx="234" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="234" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">3</text><circle cx="294" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="294" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">3</text><text x="72" y="154" font-size="14" text-anchor="middle" fill="#1f2530">12 = <tspan fill="#2563c9" font-weight="600">2 · 2 · 3</tspan></text><text x="232" y="154" font-size="14" text-anchor="middle" fill="#1f2530">18 = <tspan fill="#2563c9" font-weight="600">2 · 3 · 3</tspan></text></svg>

Faktorträd för 12 och 18. Grenarna slutar i primtal, som ringas in. Det
spelar ingen roll hur du börjar dela upp: $12 = 2 \cdot 6$ eller
$12 = 3 \cdot 4$ ger samma primtal till slut.
:::

### Bygg nämnaren av primtalsfaktorerna

Nu kommer själva idén. En gemensam nämnare till 12 och 18 måste vara delbar
med **både** 12 och 18.

- Delbar med $12 = 2 \cdot 2 \cdot 3$: då måste talet innehålla minst
  **två tvåor** och **en trea**.
- Delbar med $18 = 2 \cdot 3 \cdot 3$: då måste talet innehålla minst
  **en tvåa** och **två treor**.

Det minsta tal som klarar båda kraven innehåller två tvåor (så många som 12
kräver) och två treor (så många som 18 kräver), och inte en enda faktor
mer. Tabellen visar hur man räknar:

| | Antal tvåor | Antal treor |
| --- | --- | --- |
| $12 = 2 \cdot 2 \cdot 3$ | 2 | 1 |
| $18 = 2 \cdot 3 \cdot 3$ | 1 | 2 |
| **MGN tar flest av varje** | **2** | **2** |

$$
\text{MGN} = 2 \cdot 2 \cdot 3 \cdot 3 = 36
$$

Jämför med metod 2, att bara multiplicera nämnarna: $12 \cdot 18 = 216$.
Det är också en gemensam nämnare, men sex gånger större än nödvändigt.
I produkten $216 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3$ finns de
faktorer som 12 och 18 har gemensamt (en tvåa och en trea) med två gånger.
Då blir täljarna onödigt stora och förkortningen i slutet onödigt
omständlig.

::: formel "Hitta MGN med primtalsfaktorisering"
1. Primtalsfaktorisera varje nämnare, till exempel med ett faktorträd.
2. Ta med varje primtal så många gånger som det förekommer **flest** gånger
   i någon av nämnarna.
3. Multiplicera ihop faktorerna. Produkten är den minsta gemensamma
   nämnaren.

Metoden fungerar för hur många nämnare som helst och hur stora tal som
helst, och den ger alltid den **minsta** gemensamma nämnaren.
:::

**Kontroll mot exempel 3.** Där gav multipeltabellen MGN $= 30$ till
nämnarna 10 och 6. Med primtalsfaktorisering: $10 = 2 \cdot 5$ och
$6 = 2 \cdot 3$. Tvåan förekommer som flest en gång, trean en gång och
femman en gång, så MGN $= 2 \cdot 3 \cdot 5 = 30$. Samma svar, som det
ska vara.

::: härledning "OBS — två vanliga fel"
- **Att ta med alla faktorer från båda träden.** Då får du
  $2 \cdot 2 \cdot 3 \cdot 2 \cdot 3 \cdot 3 = 216$, alltså produkten
  av nämnarna. Det är en gemensam nämnare, men inte den minsta. Ett primtal
  som finns i båda nämnarna räknas bara så många gånger som i den nämnare
  där det förekommer **flest** gånger.
- **Att bara ta med de faktorer som är gemensamma.** Då får du
  $2 \cdot 3 = 6$, och 6 är inte delbart med vare sig 12 eller 18. Det
  talet är i stället den största gemensamma delaren, som används när man
  **förkortar** bråk, inte när man ska hitta en gemensam nämnare.
:::

::: exempel "Exempel 4 — MGN med primtalsfaktorisering"
**Bestäm den minsta gemensamma nämnaren till 72 och 108 med
primtalsfaktorisering och beräkna sedan $\dfrac{5}{72} + \dfrac{7}{108}$.**

::: handskrift
typ: mgnprim
:::

::: textlosning
Vi primtalsfaktoriserar nämnarna med varsitt faktorträd. 72 delas i
$8 \cdot 9$, 8 delas i $2 \cdot 4$ och 4 i $2 \cdot 2$, medan 9 delas i
$3 \cdot 3$:

$$
72 = 8 \cdot 9 = 2 \cdot 4 \cdot 3 \cdot 3 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3
$$

108 delas i $4 \cdot 27$, 4 delas i $2 \cdot 2$, 27 i $3 \cdot 9$ och 9 i
$3 \cdot 3$:

$$
108 = 4 \cdot 27 = 2 \cdot 2 \cdot 3 \cdot 9 = 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3
$$

Tvåan förekommer som flest **tre** gånger (i 72) och trean som flest **tre**
gånger (i 108). MGN får därför tre tvåor och tre treor:

$$
\text{MGN} = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3 = 216
$$

Nu förlänger vi båda bråken så att nämnarna blir 216. Eftersom
$72 \cdot 3 = 216$ och $108 \cdot 2 = 216$ förlänger vi med 3 respektive 2
och räknar sedan som vanligt:

$$
\frac{5}{72} + \frac{7}{108} = \frac{5 \cdot 3}{72 \cdot 3} + \frac{7 \cdot 2}{108 \cdot 2}
= \frac{15}{216} + \frac{14}{216} = \frac{15 + 14}{216} = \frac{29}{216}
$$

29 är ett primtal som inte går jämnt upp i 216, så bråket går inte att
förkorta.

**Svar:** $\dfrac{29}{216}$
:::
:::

## Bråkform och blandad form

Bråkform och blandad form är två olika skrivsätt för bråk. Blandad form kan
användas när täljaren är större än nämnaren. Vid beräkningar ska *alltid*
bråkform användas, så det är bra att kunna växla från blandad form till
bråkform.

Betrakta nedanstående "tårtor":

::: figur
<svg viewBox="2 2 234 234" width="421" height="421" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Fyra cirklar indelade i fjärdedelar. Tre cirklar är helt skuggade. Den fjärde cirkeln har tre fjärdedelar skuggade — den sista fjärdedelen är bara markerad med en streckad kontur."><circle cx="57" cy="57" r="52" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><line x1="57" y1="5" x2="57" y2="109" stroke="#1f2530" stroke-width="1.3"/><line x1="5" y1="57" x2="109" y2="57" stroke="#1f2530" stroke-width="1.3"/><circle cx="182" cy="57" r="52" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><line x1="182" y1="5" x2="182" y2="109" stroke="#1f2530" stroke-width="1.3"/><line x1="130" y1="57" x2="234" y2="57" stroke="#1f2530" stroke-width="1.3"/><circle cx="57" cy="182" r="52" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><line x1="57" y1="130" x2="57" y2="234" stroke="#1f2530" stroke-width="1.3"/><line x1="5" y1="182" x2="109" y2="182" stroke="#1f2530" stroke-width="1.3"/><path d="M 182 182 L 182 130 A 52 52 0 1 0 234 182 Z" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><path d="M 182 182 L 182 130 A 52 52 0 0 1 234 182 Z" fill="none" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="182" y1="182" x2="130" y2="182" stroke="#1f2530" stroke-width="1.3"/><line x1="182" y1="182" x2="182" y2="234" stroke="#1f2530" stroke-width="1.3"/></svg>

Tre hela tårtor och tre fjärdedelar — sammanlagt 15 fjärdedelar.
:::

De skuggade areorna motsvaras i **bråkform** av $\dfrac{15}{4}$ (15 stycken
fjärdedelar). Vi kan även låta de motsvaras i **blandad form** av
$3\frac{3}{4}$ (3 hela och 3 fjärdedelar). Så $\dfrac{15}{4}$ (bråkform)
$= 3\frac{3}{4}$ (blandad form).

::: exempel "Exempel 5 — Skriv i bråkform"
**Skriv i bråkform<br>a) $1\dfrac{4}{5}$&emsp;&emsp;b) $3\dfrac{1}{7}$**

::: handskrift
typ: brakform
:::

::: textlosning
**a)** Ta talet framför bråket (1) och multiplicera med nämnaren (5).
Addera talet i täljaren (4). Dela hela summan med nämnaren (5):

$$
1\frac{4}{5} = \frac{1 \cdot 5 + 4}{5} = \frac{9}{5}
$$

**Svar:** $\dfrac{9}{5}$

**b)** Vi gör på samma sätt som i a-uppgiften:

$$
3\frac{1}{7} = \frac{3 \cdot 7 + 1}{7} = \frac{22}{7}
$$

**Svar:** $\dfrac{22}{7}$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Grundregeln"
- **Samma nämnare**: addera eller subtrahera **täljarna** och behåll
  nämnaren. Förkorta om det går.
- **Olika nämnare**: förläng först så att alla bråk får samma nämnare.
- Nämnaren adderas **aldrig**.
:::

::: sampunkt "Hitta en gemensam nämnare"
- **Metod 1**: förläng bråket med den minsta nämnaren så att den blir lika
  med den största. Fungerar när den ena nämnaren är en multipel av den
  andra.
- **Metod 2**: förläng varje bråk med den **andras** nämnare. Fungerar
  alltid, men ger inte alltid den minsta gemensamma nämnaren.
:::

::: sampunkt "Minsta gemensamma nämnaren"
- **Multipeltabell**: skriv upp nämnarnas multiplar i varsin kolumn. Den
  **första** multipeln som finns i båda är MGN.
- **Primtalsfaktorisering**: faktorisera nämnarna. Ta med varje primtal så
  många gånger som det förekommer **flest** gånger i en nämnare, och
  multiplicera.
- $12 = 2 \cdot 2 \cdot 3$ och $18 = 2 \cdot 3 \cdot 3$ ger
  MGN $= 2 \cdot 2 \cdot 3 \cdot 3 = 36$.
:::

::: sampunkt "Bråkform och blandad form"
- **Bråkform**: $\dfrac{15}{4}$, alltså 15 fjärdedelar.
- **Blandad form**: $3\frac{3}{4}$, alltså 3 hela och 3 fjärdedelar.
- Vid **beräkningar används alltid bråkform**, så gör om blandad form
  först.
- Från blandad till bråkform: multiplicera heltalet med nämnaren och
  addera täljaren.
:::
:::
