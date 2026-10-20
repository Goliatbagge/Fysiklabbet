---
id: ma1c-4.3
title: Från ekvation till graf
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.3'
---

# Från ekvation till graf

Vi har tidigare sett hur en linjär modell kan beskrivas med en
formel/ekvation, värdetabell respektive graf. När vi ritar grafer längre
fram på nivån kommer vi att göra det med digitala hjälpmedel, till exempel
GeoGebra. För att förstå vad de digitala hjälpmedlen egentligen gör, så
ska vi nu själva rita grafer för hand.

::: exempel "Exempel 1: Rita grafen för hand"
**Rita grafen till ekvationen $y = -2x + 3$.**

::: handskrift
typ: ritagraf
:::

::: textlosning
Vi gör en värdetabell med heltal från $x = -3$ till $x = 3$. Exakt vilka
*x*-koordinater vi väljer är inte så noga, men en bra tumregel är att välja
några positiva och negativa kring $x = 0$:

| $x$ | Beräkning ($y = -2x + 3$) | $y$ |
| --- | --- | --- |
| −3 | $-2 \cdot (-3) + 3 = 6 + 3$ | 9 |
| −2 | $-2 \cdot (-2) + 3 = 4 + 3$ | 7 |
| −1 | $-2 \cdot (-1) + 3 = 2 + 3$ | 5 |
| 0 | $-2 \cdot 0 + 3 = 0 + 3$ | 3 |
| 1 | $-2 \cdot 1 + 3 = -2 + 3$ | 1 |
| 2 | $-2 \cdot 2 + 3 = -4 + 3$ | −1 |
| 3 | $-2 \cdot 3 + 3 = -6 + 3$ | −3 |

Varje rad i värdetabellen motsvarar en koordinat. Från första raden har
vi att när $x = -3$, så är $y = 9$. Detta ger koordinaten (−3, 9). På
motsvarande sätt fås resten av koordinaterna (−2, 7), (−1, 5), (0, 3),
(1, 1), (2, −1) och (3, −3).

Vi prickar in punkterna i ett koordinatsystem. När vi ritar
koordinatsystemet måste *x*-axeln sträcka sig från $x = -3$ till $x = 3$
och *y*-axeln från $y = -3$ till $y = 9$ (största respektive minsta *x*- och
*y*-koordinaterna):

::: figur
<svg viewBox="-26 -20 221 281" width="300" height="381" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med de sju punkterna från värdetabellen inprickade, från minus 3 komma 9 ned till 3 komma minus 3."><line x1="14.4" y1="0.0" x2="14.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="239.4" x2="172.8" y2="239.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="220.4" x2="172.8" y2="220.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="201.4" x2="172.8" y2="201.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="172.8" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.4" x2="172.8" y2="163.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="144.4" x2="172.8" y2="144.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="125.4" x2="172.8" y2="125.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="106.4" x2="172.8" y2="106.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="87.4" x2="172.8" y2="87.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="68.4" x2="172.8" y2="68.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.4" x2="172.8" y2="49.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="30.4" x2="172.8" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.4" x2="172.8" y2="11.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="180.8" y2="182.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="188.8,182.4 178.8,177.9 178.8,186.9" fill="#1f2530"/><line x1="86.4" y1="250.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="186.8" y="200.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="80.4" y="243.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="224.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="205.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="167.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="148.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="129.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="80.4" y="110.4" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="80.4" y="91.4" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="80.4" y="72.4" font-size="12" text-anchor="end" fill="#1f2530">6</text><text x="80.4" y="53.4" font-size="12" text-anchor="end" fill="#1f2530">7</text><text x="80.4" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">8</text><text x="80.4" y="15.4" font-size="12" text-anchor="end" fill="#1f2530">9</text><circle cx="14.4" cy="11.4" r="3.4" fill="#2563c9"/><circle cx="38.4" cy="49.4" r="3.4" fill="#2563c9"/><circle cx="62.4" cy="87.4" r="3.4" fill="#2563c9"/><circle cx="86.4" cy="125.4" r="3.4" fill="#2563c9"/><circle cx="110.4" cy="163.4" r="3.4" fill="#2563c9"/><circle cx="134.4" cy="201.4" r="3.4" fill="#2563c9"/><circle cx="158.4" cy="239.4" r="3.4" fill="#2563c9"/></svg>
:::

Till sist förbinder vi punkterna med en rät linje och vi får då vår graf:

::: figur
<svg viewBox="-26 -20 221 281" width="300" height="381" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma koordinatsystem där punkterna förbundits med en rät linje: grafen till y lika med minus 2 x plus 3."><line x1="14.4" y1="0.0" x2="14.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="239.4" x2="172.8" y2="239.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="220.4" x2="172.8" y2="220.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="201.4" x2="172.8" y2="201.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="172.8" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.4" x2="172.8" y2="163.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="144.4" x2="172.8" y2="144.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="125.4" x2="172.8" y2="125.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="106.4" x2="172.8" y2="106.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="87.4" x2="172.8" y2="87.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="68.4" x2="172.8" y2="68.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.4" x2="172.8" y2="49.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="30.4" x2="172.8" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.4" x2="172.8" y2="11.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="180.8" y2="182.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="188.8,182.4 178.8,177.9 178.8,186.9" fill="#1f2530"/><line x1="86.4" y1="250.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="186.8" y="200.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="80.4" y="243.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="224.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="205.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="167.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="148.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="129.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="80.4" y="110.4" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="80.4" y="91.4" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="80.4" y="72.4" font-size="12" text-anchor="end" fill="#1f2530">6</text><text x="80.4" y="53.4" font-size="12" text-anchor="end" fill="#1f2530">7</text><text x="80.4" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">8</text><text x="80.4" y="15.4" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="7.2" y1="0.0" x2="165.6" y2="250.8" stroke="#4a7d3a" stroke-width="2"/><circle cx="14.4" cy="11.4" r="3.4" fill="#2563c9"/><circle cx="38.4" cy="49.4" r="3.4" fill="#2563c9"/><circle cx="62.4" cy="87.4" r="3.4" fill="#2563c9"/><circle cx="86.4" cy="125.4" r="3.4" fill="#2563c9"/><circle cx="110.4" cy="163.4" r="3.4" fill="#2563c9"/><circle cx="134.4" cy="201.4" r="3.4" fill="#2563c9"/><circle cx="158.4" cy="239.4" r="3.4" fill="#2563c9"/></svg>

Grafen till $y = -2x + 3$ är en rät linje som lutar nedåt.
:::
:::
:::

Det är precis det här som de digitala hjälpmedlen gör åt dig, fast på ett
ögonblick. Dra i reglagen nedan och se direkt hur talet framför $x$
(lutningen $k$) och den konstanta termen ($m$) ändrar linjens utseende. Sätt
$k = -2$ och $m = 3$ så får du tillbaka grafen från exemplet ovan.

::: graf
titel: y = kx + m
uttryck: k*x + m
ekvation: y = {k}x + {m}
lutningstriangel: ja
k: -2, -5, 5, 0.5
m: 3, -10, 10, 1
x: -6, 6
y: -6, 6
:::

Vi ser att när $m$ är oförändrad och bara $k$ ändras, vrider sig linjen
kring samma punkt på $y$-axeln. Ändras i stället $m$ flyttas hela linjen
rakt upp eller ner. Den röda pricken visar var linjen skär $y$-axeln, och vi
ser att den alltid ligger i höjd med värdet på $m$. Det streckade
trappsteget visar lutningen: går vi **ett steg åt höger** längs linjen, så
går vi samtidigt **$k$ steg uppåt eller nedåt**. Du kan också dra i rutnätet för att flytta
dig i koordinatsystemet och zooma med mushjulet (eller knapparna uppe till
höger).

## Skärning med axlarna

Var en linje skär axlarna går att läsa av i grafen, men avläsningen blir
sällan exakt. Med ekvationen kan vi i stället räkna fram skärningspunkterna
**algebraiskt**. Det bygger på en enkel iakttagelse:

- Varje punkt på *y*-axeln har *x*-koordinaten 0. Linjen skär alltså
  *y*-axeln där $x = 0$.
- Varje punkt på *x*-axeln har *y*-koordinaten 0. Linjen skär alltså
  *x*-axeln där $y = 0$.

::: formel "Skärning med axlarna"
**Skärning med *y*-axeln:** sätt $x = 0$ i ekvationen och räkna ut $y$.

**Skärning med *x*-axeln:** sätt $y = 0$ i ekvationen och lös ut $x$.
:::

I figuren nedan skär linjen $y = 2x - 8$ axlarna i punkterna (0, −8) och
(4, 0). I punkten på *y*-axeln är *x*-koordinaten 0, och i punkten på
*x*-axeln är *y*-koordinaten 0.

::: figur
<svg viewBox="-4 -20 200 288" width="271" height="391" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Linjen y lika med 2 x minus 8 i ett koordinatsystem. Den skär y-axeln i punkten 0 komma minus 8 och x-axeln i punkten 4 komma 0."><line x1="0" y1="0" x2="0" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="0" x2="22" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="0" x2="44" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="0" x2="66" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="0" x2="88" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="0" x2="110" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0" x2="132" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="0" x2="176" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="264" x2="176" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="242" x2="176" y2="242" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="220" x2="176" y2="220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="198" x2="176" y2="198" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="176" x2="176" y2="176" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="154" x2="176" y2="154" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="132" x2="176" y2="132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="110" x2="176" y2="110" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="88" x2="176" y2="88" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="66" x2="176" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="44" x2="176" y2="44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="22" x2="176" y2="22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="176" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="66" x2="184" y2="66" stroke="#1f2530" stroke-width="1.6"/><polygon points="192,66 182,61.5 182,70.5" fill="#1f2530"/><line x1="44" y1="264" x2="44" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="44,-16 39.5,-6 48.5,-6" fill="#1f2530"/><text x="190" y="84" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="53" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="88" y="82" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="38" y="26" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="38" y="114" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="38" y="158" font-size="12" text-anchor="end" fill="#1f2530">−4</text><text x="38" y="202" font-size="12" text-anchor="end" fill="#1f2530">−6</text><line x1="33" y1="264" x2="165" y2="0" stroke="#4a7d3a" stroke-width="2"/><circle cx="44" cy="242" r="3.6" fill="#2563c9"/><circle cx="132" cy="66" r="3.6" fill="#2563c9"/><text x="54" y="257" font-size="13" text-anchor="start" fill="#2563c9">(0, −8)</text><text x="124" y="57" font-size="13" text-anchor="end" fill="#2563c9">(4, 0)</text><text x="100" y="159" font-size="13" text-anchor="start" fill="#4a7d3a"><tspan font-style="italic">y</tspan> = 2<tspan font-style="italic">x</tspan> − 8</text></svg>
:::

För en linje på formen $y = kx + m$ ger $x = 0$ alltid $y = m$, så
skärningen med *y*-axeln kan läsas direkt ur ekvationen. Skärningen med
*x*-axeln kräver däremot att vi löser en ekvation.

::: exempel "Exempel 2: Skärning med axlarna"
**Bestäm algebraiskt var linjen $y = 2x - 8$ skär<br>a) *y*-axeln&emsp;&emsp;b) *x*-axeln**

::: handskrift
typ: axelskarning
:::

::: textlosning
**a)** På *y*-axeln är $x = 0$. Vi sätter in $x = 0$ i ekvationen:

$$
\begin{aligned}
y &= 2 \cdot 0 - 8 \\
y &= 0 - 8 \\
y &= -8
\end{aligned}
$$

Skärningspunkten är (0, −8). Det stämmer med att $m = -8$.

**Svar:** (0, −8)

**b)** På *x*-axeln är $y = 0$. Vi sätter in $y = 0$ i ekvationen och löser
ut $x$:

$$
\begin{aligned}
0 &= 2x - 8 \\
0 \mathbin{\boldsymbol{+}} \boldsymbol{8} &= 2x - 8 \mathbin{\boldsymbol{+}} \boldsymbol{8} \\
8 &= 2x \\
\frac{8}{\boldsymbol{2}} &= \frac{2x}{\boldsymbol{2}} \\
4 &= x
\end{aligned}
$$

Skärningspunkten är (4, 0). Kontroll: $2 \cdot 4 - 8 = 0$, så punkten
ligger på linjen.

**Svar:** (4, 0)
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Rita en linje för hand"
1. Välj några **enkla** $x$-värden, gärna $-2, -1, 0, 1$ och $2$.
2. Räkna ut motsvarande $y$-värden och skriv dem i en värdetabell.
3. Pricka in punkterna i koordinatsystemet.
4. Dra en **rät linje** genom dem.
:::

::: sampunkt "Två punkter räcker"
- En rät linje bestäms av två punkter. Ta gärna en tredje som
  **kontroll**: hamnar den inte på linjen har du räknat fel.
- $x = 0$ är alltid ett bra val, eftersom det ger $y$-skärningen direkt.
:::

::: sampunkt "Skärning med axlarna"
- ***y*-axeln:** sätt $x = 0$ och räkna ut $y$. För $y = kx + m$ blir det $m$.
- ***x*-axeln:** sätt $y = 0$ och lös ekvationen.
- Skärningspunkterna skrivs $(0,\ y)$ och $(x,\ 0)$.
:::

::: sampunkt "Vad reglagen visar"
- Ändras **$k$** vrider sig linjen kring sin punkt på $y$-axeln.
- Ändras **$m$** flyttas hela linjen rakt upp eller ned.
- $y$-skärningen ligger alltid i höjd med $m$.
:::

::: sampunkt "Trappsteget"
- Går du **ett steg åt höger** längs linjen går du samtidigt **$k$ steg**
  uppåt eller nedåt.
- Det är precis vad digitala hjälpmedel som GeoGebra gör åt dig, fast
  ögonblickligen.
:::
:::
