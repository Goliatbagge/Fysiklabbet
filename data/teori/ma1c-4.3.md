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
fram i kursen kommer vi att göra det med digitala hjälpmedel, t.ex.
GeoGebra. För att förstå vad de digitala hjälpmedlen egentligen gör, så
ska vi nu själva rita grafer för hand.

::: exempel "Exempel 1 — Rita grafen för hand"
**Rita grafen till ekvationen $y = -2x + 3$.**

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
<svg viewBox="-26 -20 221 281" width="221" height="281" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med de sju punkterna från värdetabellen inprickade, från minus 3 komma 9 ned till 3 komma minus 3."><line x1="14.4" y1="0.0" x2="14.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="239.4" x2="172.8" y2="239.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="220.4" x2="172.8" y2="220.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="201.4" x2="172.8" y2="201.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="172.8" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.4" x2="172.8" y2="163.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="144.4" x2="172.8" y2="144.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="125.4" x2="172.8" y2="125.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="106.4" x2="172.8" y2="106.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="87.4" x2="172.8" y2="87.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="68.4" x2="172.8" y2="68.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.4" x2="172.8" y2="49.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="30.4" x2="172.8" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.4" x2="172.8" y2="11.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="180.8" y2="182.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="188.8,182.4 178.8,177.9 178.8,186.9" fill="#1f2530"/><line x1="86.4" y1="250.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="186.8" y="200.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="80.4" y="243.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="224.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="205.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="167.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="148.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="129.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="80.4" y="110.4" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="80.4" y="91.4" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="80.4" y="72.4" font-size="12" text-anchor="end" fill="#1f2530">6</text><text x="80.4" y="53.4" font-size="12" text-anchor="end" fill="#1f2530">7</text><text x="80.4" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">8</text><text x="80.4" y="15.4" font-size="12" text-anchor="end" fill="#1f2530">9</text><circle cx="14.4" cy="11.4" r="3.4" fill="#2563c9"/><circle cx="38.4" cy="49.4" r="3.4" fill="#2563c9"/><circle cx="62.4" cy="87.4" r="3.4" fill="#2563c9"/><circle cx="86.4" cy="125.4" r="3.4" fill="#2563c9"/><circle cx="110.4" cy="163.4" r="3.4" fill="#2563c9"/><circle cx="134.4" cy="201.4" r="3.4" fill="#2563c9"/><circle cx="158.4" cy="239.4" r="3.4" fill="#2563c9"/></svg>
:::

Till sist förbinder vi punkterna med en rät linje och vi får då vår graf:

::: figur
<svg viewBox="-26 -20 221 281" width="221" height="281" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma koordinatsystem där punkterna förbundits med en rät linje: grafen till y lika med minus 2 x plus 3."><line x1="14.4" y1="0.0" x2="14.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="239.4" x2="172.8" y2="239.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="220.4" x2="172.8" y2="220.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="201.4" x2="172.8" y2="201.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="172.8" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.4" x2="172.8" y2="163.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="144.4" x2="172.8" y2="144.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="125.4" x2="172.8" y2="125.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="106.4" x2="172.8" y2="106.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="87.4" x2="172.8" y2="87.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="68.4" x2="172.8" y2="68.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.4" x2="172.8" y2="49.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="30.4" x2="172.8" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.4" x2="172.8" y2="11.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="180.8" y2="182.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="188.8,182.4 178.8,177.9 178.8,186.9" fill="#1f2530"/><line x1="86.4" y1="250.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="186.8" y="200.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="80.4" y="243.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="224.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="205.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="167.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="148.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="129.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="80.4" y="110.4" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="80.4" y="91.4" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="80.4" y="72.4" font-size="12" text-anchor="end" fill="#1f2530">6</text><text x="80.4" y="53.4" font-size="12" text-anchor="end" fill="#1f2530">7</text><text x="80.4" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">8</text><text x="80.4" y="15.4" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="7.2" y1="0.0" x2="165.6" y2="250.8" stroke="#4a7d3a" stroke-width="2"/><circle cx="14.4" cy="11.4" r="3.4" fill="#2563c9"/><circle cx="38.4" cy="49.4" r="3.4" fill="#2563c9"/><circle cx="62.4" cy="87.4" r="3.4" fill="#2563c9"/><circle cx="86.4" cy="125.4" r="3.4" fill="#2563c9"/><circle cx="110.4" cy="163.4" r="3.4" fill="#2563c9"/><circle cx="134.4" cy="201.4" r="3.4" fill="#2563c9"/><circle cx="158.4" cy="239.4" r="3.4" fill="#2563c9"/></svg>

Grafen till $y = -2x + 3$ — en rät linje som lutar nedåt.
:::
:::

Det är precis det här som de digitala hjälpmedlen gör åt dig — fast på ett
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

Testa att låta $m$ vara oförändrad medan du drar i $k$: linjen vrider sig
kring samma punkt på $y$-axeln. Ändrar du i stället $m$ flyttas hela linjen
rakt upp eller ner. Den röda pricken visar var linjen skär $y$-axeln — den
ligger alltid i höjd med värdet på $m$. Det streckade trappsteget visar
lutningen: går vi **ett steg åt höger** längs linjen, så går vi samtidigt
**$k$ steg uppåt eller nedåt**. Du kan också dra i rutnätet för att flytta
dig i koordinatsystemet och zooma med mushjulet (eller knapparna uppe till
höger).
