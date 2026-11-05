---
id: ma1c-4.8
title: Funktion och funktionsvärde
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.8'
---

# Funktion och funktionsvärde

Ett samband mellan två variabler, till exempel $x$ och $y$, där varje tillåtet
*x*-värde ger *exakt ett* *y*-värde kallas **funktion**. På grafen syns det
så här: var vi än håller en penna lodrätt över grafen skär pennan grafen
**högst en gång**. Skär pennan grafen på två ställen hör två *y*-värden till
samma *x*-värde, och då är sambandet ingen funktion.

I simuleringen nedan håller du pennan själv. Dra den i sidled över de två
graferna och avgör vilken av dem som är en funktion.

::: minisim
typ: pennprovet
:::

I sambandet $y = 2x + 3$ säger vi att "$y$ är en funktion av $x$".

Vad $y$ har för värde beror på vad $x$ har för värde. Därför kallas $y$
den **beroende variabeln**. På motsvarande sätt kallas $x$ för den
**oberoende variabeln**. Det värde som funktionen $y$ får kallas
**funktionsvärde**.

För att förtydliga att vi har en funktion och för att visa vilken variabel
den beror på används ett annat skrivsätt. Istället för $y$ skriver vi
$f(x)$, där $f$ är namnet på funktionen och $x$ står för vilken variabel
den beror på. Alltså gäller $y = f(x)$. $f(x)$ utläses "$f$ av $x$".

Om vi vill skriva sambandet $y = 2x + 3$ som en funktion skriver vi alltså

$$
f(x) = 2x + 3
$$

Om vi skulle rita grafen till $f(x) = 2x + 3$ skulle det bli en rät linje
(jämför med $y = kx + m$). Detta kallas därför en **linjär funktion**.

Om vi vill ta reda på funktionsvärdet när $x = 5$ skriver vi $f(5)$ och
beräknar det genom att ersätta $x$ med 5 i vårt samband:

$$
f(5) = 2 \cdot 5 + 3 = 10 + 3 = 13
$$

Så $f(5) = 13$.

Funktionen brukar liknas vid en maskin eller en regel. Vi stoppar in ett
värde i maskinen/regeln och så ger det ett nytt värde. I funktionen ovan
stoppade vi in värdet 5 som bearbetades enligt "regeln" $2x + 3$ och vi
fick ut värdet 13.

::: figur
<svg viewBox="0 14 420 70" width="532" height="89" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En funktionsmaskin: pilen in är märkt x lika med 5, maskinen innehåller regeln f av x lika med 2x plus 3, och pilen ut är märkt y lika med 13."><line x1="10" y1="48" x2="118" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="128,48 116,43 116,53" fill="#c8324a"/><text x="64" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan> = 5</text><rect x="132" y="18" width="156" height="60" rx="12" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.6"/><text x="210" y="54" font-size="15" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = 2<tspan font-style="italic">x</tspan> + 3</text><line x1="292" y1="48" x2="400" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="410,48 398,43 398,53" fill="#c8324a"/><text x="346" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">y</tspan> = 13</text></svg>

Vi stoppar in den oberoende variabeln $x = 5$ i funktionsmaskinen
$f(x) = 2x + 3$ och får ut den beroende variabeln $y = 13$.
:::

Precis som att vi kan beteckna variabler med olika bokstäver, till exempel $x$,
$y$, $z$, …, så kan funktioner betecknas med olika bokstäver, vanligtvis
$f$, $g$, $h$, …

$f(x) = 2x + 3$ betyder alltså samma sak som $g(x) = 2x + 3$.

::: exempel "Exempel 1 — Beräkna funktionsvärden"
**Låt $f(x) = 5x - 3$. Bestäm<br>a)&nbsp;$f(4)$&emsp;&emsp;b)&nbsp;$f(-2)$&emsp;&emsp;c)&nbsp;$f(3a)$&emsp;&emsp;d)&nbsp;$f(x + 2)$&emsp;&emsp;e)&nbsp;$f(7) - f(6)$<br>f)&nbsp;Lös $f(x) = 8$&emsp;&emsp;g)&nbsp;Lös $3 \cdot f(x) = 36$**

::: handskrift
typ: funktionsvarde
:::

::: textlosning
**a)** För att beräkna $f(4)$ ersätter vi alla $x$ med 4 i funktionen
$f(x) = 5x - 3$:

$$
f(4) = 5 \cdot 4 - 3 = 20 - 3 = 17
$$

**Svar:** 17

**b)** Vi gör på motsvarande sätt som i a-uppgiften:

$$
f(-2) = 5 \cdot (-2) - 3 = -10 - 3 = -13
$$

**Svar:** −13

**c)** Ibland kan vi sätta in variabler i vår funktion. Principen är dock
densamma. När vi beräknar $f(3a)$ byter vi ut alla $x$ mot $3a$ och
förenklar sedan som vanligt:

$$
f(3a) = 5 \cdot 3a - 3 = 15a - 3
$$

**Svar:** $15a - 3$

**d)** Det som står inom parentesen kan också vara ett uttryck med $x$ i.
Vi ersätter alla $x$ med hela uttrycket $x + 2$, inom parentes, och
multiplicerar sedan in 5 i parentesen:

$$
f(x + 2) = 5 \cdot (x + 2) - 3 = 5x + 10 - 3 = 5x + 7
$$

**Svar:** $5x + 7$

**e)** Ibland kan vi ha uttryck med flera funktioner. Då beräknar vi dem
var och en för sig för att sedan lägga ihop dem, eller så räknar vi ut dem
tillsammans på en gång.

**Metod 1: Var och en för sig**

$$
f(7) = 5 \cdot 7 - 3 = 35 - 3 = 32
$$

$$
f(6) = 5 \cdot 6 - 3 = 30 - 3 = 27
$$

$$
f(7) - f(6) = 32 - 27 = 5
$$

**Metod 2: Tillsammans på en gång**

$$
f(7) - f(6) = 5 \cdot 7 - 3 - (5 \cdot 6 - 3) = 35 - 3 - (30 - 3) = 32 - 27 = 5
$$

**Svar:** 5

**f)** Nu är det tvärtom: funktionsvärdet är känt och vi söker $x$. Vi
ersätter $f(x)$ med $5x - 3$ och löser ekvationen:

$$
5x - 3 = 8
$$

Vi adderar 3 till båda led:

$$
5x = 11
$$

Vi dividerar båda led med 5:

$$
x = \frac{11}{5} = 2{,}2
$$

**Svar:** $x = 2{,}2$

**g)** Här multipliceras hela funktionsvärdet med 3. Vi ersätter $f(x)$
med $5x - 3$ och sätter en parentes runt uttrycket:

$$
3 \cdot (5x - 3) = 36
$$

Vi dividerar båda led med 3:

$$
5x - 3 = 12
$$

Vi adderar 3 till båda led:

$$
5x = 15
$$

Vi dividerar båda led med 5:

$$
x = 3
$$

**Svar:** $x = 3$
:::
:::

::: exempel "Exempel 2 — Är graferna funktioner?"
**Är $f(x)$ och $g(x)$, som är uppritade nedan, funktioner? Motivera ditt
svar.**

::: figur
<svg viewBox="-26 -20 293 203" width="398" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med en liggande parabel f som öppnar sig åt höger och en lodrät blå linje g vid x lika med minus 2."><line x1="14.4" y1="0.0" x2="14.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182.4" y1="0.0" x2="182.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="206.4" y1="0.0" x2="206.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="230.4" y1="0.0" x2="230.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="244.8" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="244.8" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="244.8" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="244.8" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="244.8" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="244.8" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="244.8" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="252.8" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="260.8,86.4 250.8,81.9 250.8,90.9" fill="#1f2530"/><line x1="86.4" y1="172.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="258.8" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="182.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="206.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="230.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="80.4" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M172.8,144.0 L168.5,142.6 L164.4,141.1 L160.3,139.7 L156.4,138.2 L152.6,136.8 L148.8,135.4 L145.2,133.9 L141.7,132.5 L138.3,131.0 L135.0,129.6 L131.8,128.2 L128.7,126.7 L125.8,125.3 L122.9,123.8 L120.1,122.4 L117.5,121.0 L115.0,119.5 L112.5,118.1 L110.2,116.6 L108.0,115.2 L105.9,113.8 L103.9,112.3 L102.0,110.9 L100.2,109.4 L98.6,108.0 L97.0,106.6 L95.5,105.1 L94.2,103.7 L92.9,102.2 L91.8,100.8 L90.8,99.4 L89.9,97.9 L89.0,96.5 L88.3,95.0 L87.8,93.6 L87.3,92.2 L86.9,90.7 L86.6,89.3 L86.5,87.8 L86.4,86.4 L86.5,85.0 L86.6,83.5 L86.9,82.1 L87.3,80.6 L87.8,79.2 L88.3,77.8 L89.0,76.3 L89.9,74.9 L90.8,73.4 L91.8,72.0 L92.9,70.6 L94.2,69.1 L95.5,67.7 L97.0,66.2 L98.6,64.8 L100.2,63.4 L102.0,61.9 L103.9,60.5 L105.9,59.0 L108.0,57.6 L110.2,56.2 L112.5,54.7 L115.0,53.3 L117.5,51.8 L120.1,50.4 L122.9,49.0 L125.8,47.5 L128.7,46.1 L131.8,44.6 L135.0,43.2 L138.3,41.8 L141.7,40.3 L145.2,38.9 L148.8,37.4 L152.6,36.0 L156.4,34.6 L160.3,33.1 L164.4,31.7 L168.5,30.2 L172.8,28.8" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="38.4" y1="168.0" x2="38.4" y2="4.8" stroke="#2563c9" stroke-width="2"/><text x="32.4" y="12.0" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="211.2" y="14.4" font-size="14" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan></text></svg>
:::

::: handskrift
typ: arfunktion
:::

::: textlosning
För att graferna ska vara funktioner ska varje giltigt *x*-värde ge *ett
enda* *y*-värde. Grafen till $g(x)$ har oändligt många *y*-värden för
$x = -2$ och är därför inte någon funktion.

Vi lägger en penna lodrätt över grafen till $f(x)$ …

::: figur
<svg viewBox="-26 -20 293 203" width="398" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma grafer med en tjock lodrät penna lagd över: pennan skär den liggande parabeln två gånger — grafen är därför ingen funktion."><line x1="14.4" y1="0.0" x2="14.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182.4" y1="0.0" x2="182.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="206.4" y1="0.0" x2="206.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="230.4" y1="0.0" x2="230.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="244.8" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="244.8" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="244.8" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="244.8" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="244.8" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="244.8" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="244.8" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="252.8" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="260.8,86.4 250.8,81.9 250.8,90.9" fill="#1f2530"/><line x1="86.4" y1="172.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="258.8" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="182.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="206.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="230.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="80.4" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M172.8,144.0 L168.5,142.6 L164.4,141.1 L160.3,139.7 L156.4,138.2 L152.6,136.8 L148.8,135.4 L145.2,133.9 L141.7,132.5 L138.3,131.0 L135.0,129.6 L131.8,128.2 L128.7,126.7 L125.8,125.3 L122.9,123.8 L120.1,122.4 L117.5,121.0 L115.0,119.5 L112.5,118.1 L110.2,116.6 L108.0,115.2 L105.9,113.8 L103.9,112.3 L102.0,110.9 L100.2,109.4 L98.6,108.0 L97.0,106.6 L95.5,105.1 L94.2,103.7 L92.9,102.2 L91.8,100.8 L90.8,99.4 L89.9,97.9 L89.0,96.5 L88.3,95.0 L87.8,93.6 L87.3,92.2 L86.9,90.7 L86.6,89.3 L86.5,87.8 L86.4,86.4 L86.5,85.0 L86.6,83.5 L86.9,82.1 L87.3,80.6 L87.8,79.2 L88.3,77.8 L89.0,76.3 L89.9,74.9 L90.8,73.4 L91.8,72.0 L92.9,70.6 L94.2,69.1 L95.5,67.7 L97.0,66.2 L98.6,64.8 L100.2,63.4 L102.0,61.9 L103.9,60.5 L105.9,59.0 L108.0,57.6 L110.2,56.2 L112.5,54.7 L115.0,53.3 L117.5,51.8 L120.1,50.4 L122.9,49.0 L125.8,47.5 L128.7,46.1 L131.8,44.6 L135.0,43.2 L138.3,41.8 L141.7,40.3 L145.2,38.9 L148.8,37.4 L152.6,36.0 L156.4,34.6 L160.3,33.1 L164.4,31.7 L168.5,30.2 L172.8,28.8" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="38.4" y1="168.0" x2="38.4" y2="4.8" stroke="#2563c9" stroke-width="2"/><text x="32.4" y="12.0" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="211.2" y="14.4" font-size="14" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan></text><line x1="146.4" y1="168.0" x2="146.4" y2="4.8" stroke="#1f2530" stroke-width="7"/></svg>
:::

… och ser att den skär grafen mer än en gång (två gånger). $f(x)$ är
alltså inte heller en funktion.

**Svar:** Nej, de är inte funktioner eftersom ett *x*-värde kan ge flera
*y*-värden.
:::
:::

::: exempel "Exempel 3 — Läs av funktionsvärden ur grafen"
**Grafen till funktionen $f$ är uppritad.**

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Grafen till funktionen f: en kurva som kommer nedifrån, når en topp vid y lika med 3 nära x lika med 0, vänder ner till en dal på minus 3 vid x lika med 2 och stiger sedan brant."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/></svg>
:::

**a) Bestäm $f(2)$&emsp;&emsp;b) Bestäm $f(0)$&emsp;&emsp;c) Lös ekvationen $f(x) = 0$**

::: handskrift
typ: lasavgraf
:::

::: textlosning
**a)** $f(2)$ motsvarar funktionsvärdet (*y*-värdet) då $x = 2$:

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma graf med streckade linjer från x lika med 2 ned till punkten 2 komma minus 3 på kurvan: f av 2 är minus 3."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><line x1="129.0" y1="86.4" x2="129.0" y2="158.4" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="4 3"/><line x1="69.0" y1="158.4" x2="129.0" y2="158.4" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="129.0" cy="158.4" r="3.6" fill="#2563c9"/></svg>
:::

Vi läser av grafen vid $x = 2$ och ser att *y*-koordinaten där är −3. Så
$f(2) = -3$.

**Svar:** −3

**b)** $f(0)$ motsvarar funktionsvärdet (*y*-värdet) då $x = 0$:

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma graf med punkten 0 komma 3 markerad där kurvan skär y-axeln: f av 0 är 3."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><circle cx="69.0" cy="14.4" r="3.6" fill="#2563c9"/></svg>
:::

Vi läser av grafen vid $x = 0$ (vilket motsvarar skärningen med *y*-axeln)
och ser att *y*-koordinaten där är 3. Så $f(0) = 3$.

**Svar:** 3

**c)** $f(x) = 0$ motsvarar att funktionsvärdet (*y*-värdet) är lika med 0:

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma graf med tre punkter markerade där kurvan skär x-axeln: x lika med minus 1, 1 och 3 — lösningarna till f av x lika med 0."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><circle cx="39.0" cy="86.4" r="3.6" fill="#2563c9"/><circle cx="99.0" cy="86.4" r="3.6" fill="#2563c9"/><circle cx="159.0" cy="86.4" r="3.6" fill="#2563c9"/></svg>
:::

Vi läser av grafen vid $y = 0$ (vilket motsvarar skärningarna med
*x*-axeln) och ser att det gäller när $x = -1$, $x = 1$ och $x = 3$.
Ekvationen har alltså tre lösningar.

**Svar:** $x_1 = -1$, $x_2 = 1$ och $x_3 = 3$
:::
:::

::: exempel "Exempel 4 — Lös $f(x) = g(x)$ och $g(x) < f(x)$ grafiskt"
**Graferna till funktionerna $f$ och $g$ är uppritade. Använd graferna
för att lösa<br>a)&nbsp;ekvationen $f(x) = g(x)$&emsp;&emsp;b)&nbsp;olikheten $g(x) < f(x)$**

::: figur
<svg viewBox="-26 -20 240 247" width="326" height="335" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med graferna till f och g. Grafen till f är en röd kurva som kommer nedifrån, når en topp nära y lika med 5 och vänder ned under den blå räta linjen g. Graferna skär varandra i två punkter."><line x1="12" y1="0.0" x2="12" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="36" y1="0.0" x2="36" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="0.0" x2="60" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="0.0" x2="84" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108" y1="0.0" x2="108" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0.0" x2="132" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156" y1="0.0" x2="156" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="0.0" x2="180" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="12" x2="192.0" y2="12" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="36" x2="192.0" y2="36" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="60" x2="192.0" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="84" x2="192.0" y2="84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="108" x2="192.0" y2="108" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="132" x2="192.0" y2="132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="156" x2="192.0" y2="156" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180" x2="192.0" y2="180" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="204" x2="192.0" y2="204" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="132" x2="200" y2="132" stroke="#1f2530" stroke-width="1.6"/><polygon points="208,132 198,127.5 198,136.5" fill="#1f2530"/><line x1="36" y1="216" x2="36" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="36,-16.0 31.5,-6.0 40.5,-6.0" fill="#1f2530"/><text x="206" y="150" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="45" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="12" y="148" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="60" y="148" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="84" y="148" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="108" y="148" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="132" y="148" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="156" y="148" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="180" y="148" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="30" y="16.0" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="30" y="40.0" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="30" y="64.0" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="30" y="88.0" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="30" y="112.0" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="30" y="160.0" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="30" y="184.0" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="30" y="208.0" font-size="12" text-anchor="end" fill="#1f2530">−3</text><path d="M45.8,216 L46.8,203.5 L47.7,191.6 L48.7,180.3 L49.6,169.5 L50.6,159.3 L51.6,149.7 L52.5,140.5 L53.5,131.8 L54.4,123.6 L55.4,115.8 L56.4,108.4 L57.3,101.4 L58.3,94.9 L59.2,88.7 L60.2,82.9 L61.2,77.4 L62.1,72.2 L63.1,67.4 L64,62.9 L65,58.6 L66,54.7 L66.9,51 L67.9,47.6 L68.8,44.4 L69.8,41.4 L70.8,38.7 L71.7,36.2 L72.7,33.9 L73.6,31.8 L74.6,29.8 L75.6,28.1 L76.5,26.5 L77.5,25.1 L78.4,23.8 L79.4,22.7 L80.4,21.7 L81.3,20.8 L82.3,20.1 L83.2,19.4 L84.2,18.9 L85.2,18.5 L86.1,18.2 L87.1,18 L88,17.9 L89,17.8 L90,17.9 L90.9,18 L91.9,18.1 L92.8,18.4 L93.8,18.7 L94.8,19 L95.7,19.5 L96.7,19.9 L97.6,20.4 L98.6,21 L99.6,21.5 L100.5,22.2 L101.5,22.8 L102.4,23.5 L103.4,24.2 L104.4,24.9 L105.3,25.7 L106.3,26.4 L107.2,27.2 L108.2,28 L109.2,28.8 L110.1,29.7 L111.1,30.5 L112,31.3 L113,32.2 L114,33 L114.9,33.9 L115.9,34.7 L116.8,35.6 L117.8,36.4 L118.8,37.3 L119.7,38.1 L120.7,38.9 L121.6,39.8 L122.6,40.6 L123.6,41.4 L124.5,42.2 L125.5,43 L126.4,43.8 L127.4,44.5 L128.4,45.3 L129.3,46 L130.3,46.7 L131.2,47.4 L132.2,48.1 L133.2,48.8 L134.1,49.5 L135.1,50.1 L136,50.8 L137,51.4 L138,52 L138.9,52.5 L139.9,53.1 L140.8,53.6 L141.8,54.2 L142.8,54.7 L143.7,55.1 L144.7,55.6 L145.6,56 L146.6,56.5 L147.6,56.9 L148.5,57.3 L149.5,57.6 L150.4,58 L151.4,58.3 L152.4,58.6 L153.3,58.9 L154.3,59.2 L155.2,59.5 L156.2,59.7 L157.2,59.9 L158.1,60.1 L159.1,60.3 L160,60.4 L161,60.6 L162,60.7 L162.9,60.8 L163.9,60.9 L164.8,61 L165.8,61 L166.8,61.1 L167.7,61.1 L168.7,61.1 L169.6,61.1 L170.6,61 L171.6,61 L172.5,60.9 L173.5,60.8 L174.4,60.7 L175.4,60.6 L176.4,60.5 L177.3,60.3 L178.3,60.2 L179.2,60 L180.2,59.8 L181.2,59.6 L182.1,59.4 L183.1,59.2 L184,58.9 L185,58.7 L186,58.4 L186.9,58.1 L187.9,57.8 L188.8,57.5 L189.6,57.2" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="2.4" y1="112.8" x2="189.6" y2="19.2" stroke="#2563c9" stroke-width="2"/><text x="180" y="16" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="193.6" y="73.2" font-size="14" text-anchor="end" fill="#c8324a"><tspan font-style="italic">f</tspan></text></svg>
:::

::: handskrift
typ: fligamedg
:::

::: textlosning
**a)** $f(x) = g(x)$ betyder att de två funktionerna har samma värde, alltså att
graferna har samma *y*-koordinat. Det gäller precis där graferna skär
varandra. Vi markerar skärningspunkterna och går lodrätt ned till
*x*-axeln:

::: figur
<svg viewBox="-26 -20 240 247" width="326" height="335" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma grafer med de två skärningspunkterna markerade och streckade linjer lodrätt ned till x-axeln, vid x lika med 1 och x lika med 4."><line x1="12" y1="0.0" x2="12" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="36" y1="0.0" x2="36" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="0.0" x2="60" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="0.0" x2="84" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108" y1="0.0" x2="108" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0.0" x2="132" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156" y1="0.0" x2="156" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="0.0" x2="180" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="12" x2="192.0" y2="12" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="36" x2="192.0" y2="36" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="60" x2="192.0" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="84" x2="192.0" y2="84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="108" x2="192.0" y2="108" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="132" x2="192.0" y2="132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="156" x2="192.0" y2="156" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180" x2="192.0" y2="180" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="204" x2="192.0" y2="204" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="132" x2="200" y2="132" stroke="#1f2530" stroke-width="1.6"/><polygon points="208,132 198,127.5 198,136.5" fill="#1f2530"/><line x1="36" y1="216" x2="36" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="36,-16.0 31.5,-6.0 40.5,-6.0" fill="#1f2530"/><text x="206" y="150" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="45" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="12" y="148" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="60" y="148" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="84" y="148" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="108" y="148" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="132" y="148" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="156" y="148" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="180" y="148" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="30" y="16.0" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="30" y="40.0" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="30" y="64.0" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="30" y="88.0" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="30" y="112.0" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="30" y="160.0" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="30" y="184.0" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="30" y="208.0" font-size="12" text-anchor="end" fill="#1f2530">−3</text><path d="M45.8,216 L46.8,203.5 L47.7,191.6 L48.7,180.3 L49.6,169.5 L50.6,159.3 L51.6,149.7 L52.5,140.5 L53.5,131.8 L54.4,123.6 L55.4,115.8 L56.4,108.4 L57.3,101.4 L58.3,94.9 L59.2,88.7 L60.2,82.9 L61.2,77.4 L62.1,72.2 L63.1,67.4 L64,62.9 L65,58.6 L66,54.7 L66.9,51 L67.9,47.6 L68.8,44.4 L69.8,41.4 L70.8,38.7 L71.7,36.2 L72.7,33.9 L73.6,31.8 L74.6,29.8 L75.6,28.1 L76.5,26.5 L77.5,25.1 L78.4,23.8 L79.4,22.7 L80.4,21.7 L81.3,20.8 L82.3,20.1 L83.2,19.4 L84.2,18.9 L85.2,18.5 L86.1,18.2 L87.1,18 L88,17.9 L89,17.8 L90,17.9 L90.9,18 L91.9,18.1 L92.8,18.4 L93.8,18.7 L94.8,19 L95.7,19.5 L96.7,19.9 L97.6,20.4 L98.6,21 L99.6,21.5 L100.5,22.2 L101.5,22.8 L102.4,23.5 L103.4,24.2 L104.4,24.9 L105.3,25.7 L106.3,26.4 L107.2,27.2 L108.2,28 L109.2,28.8 L110.1,29.7 L111.1,30.5 L112,31.3 L113,32.2 L114,33 L114.9,33.9 L115.9,34.7 L116.8,35.6 L117.8,36.4 L118.8,37.3 L119.7,38.1 L120.7,38.9 L121.6,39.8 L122.6,40.6 L123.6,41.4 L124.5,42.2 L125.5,43 L126.4,43.8 L127.4,44.5 L128.4,45.3 L129.3,46 L130.3,46.7 L131.2,47.4 L132.2,48.1 L133.2,48.8 L134.1,49.5 L135.1,50.1 L136,50.8 L137,51.4 L138,52 L138.9,52.5 L139.9,53.1 L140.8,53.6 L141.8,54.2 L142.8,54.7 L143.7,55.1 L144.7,55.6 L145.6,56 L146.6,56.5 L147.6,56.9 L148.5,57.3 L149.5,57.6 L150.4,58 L151.4,58.3 L152.4,58.6 L153.3,58.9 L154.3,59.2 L155.2,59.5 L156.2,59.7 L157.2,59.9 L158.1,60.1 L159.1,60.3 L160,60.4 L161,60.6 L162,60.7 L162.9,60.8 L163.9,60.9 L164.8,61 L165.8,61 L166.8,61.1 L167.7,61.1 L168.7,61.1 L169.6,61.1 L170.6,61 L171.6,61 L172.5,60.9 L173.5,60.8 L174.4,60.7 L175.4,60.6 L176.4,60.5 L177.3,60.3 L178.3,60.2 L179.2,60 L180.2,59.8 L181.2,59.6 L182.1,59.4 L183.1,59.2 L184,58.9 L185,58.7 L186,58.4 L186.9,58.1 L187.9,57.8 L188.8,57.5 L189.6,57.2" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="2.4" y1="112.8" x2="189.6" y2="19.2" stroke="#2563c9" stroke-width="2"/><text x="180" y="16" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="193.6" y="73.2" font-size="14" text-anchor="end" fill="#c8324a"><tspan font-style="italic">f</tspan></text><line x1="60" y1="132" x2="60" y2="84" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="60" cy="84" r="3.6" fill="#1f2530"/><line x1="132" y1="132" x2="132" y2="48" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="132" cy="48" r="3.6" fill="#1f2530"/></svg>
:::

Graferna skär varandra i två punkter, där $x = 1$ och $x = 4$. Det är
*x*-koordinaterna som är lösningarna. *y*-koordinaterna säger bara vilket
värde båda funktionerna har där.

**Svar:** $x_1 = 1$ och $x_2 = 4$

**b)** $g(x) < f(x)$ betyder att $f$ har ett större värde än $g$, alltså
att grafen till $f$ ligger **ovanför** grafen till $g$. Det gör den mellan
skärningspunkterna från a), när $x$ ligger mellan 1 och 4:

::: figur
<svg viewBox="-26 -20 240 247" width="326" height="335" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma grafer där den del av grafen till f som ligger ovanför linjen g är förstärkt, mellan x lika med 1 och x lika med 4. Intervallet är markerat på x-axeln med ofyllda ringar i ändpunkterna, eftersom 1 och 4 inte ingår."><line x1="12" y1="0.0" x2="12" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="36" y1="0.0" x2="36" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="60" y1="0.0" x2="60" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="0.0" x2="84" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108" y1="0.0" x2="108" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0.0" x2="132" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156" y1="0.0" x2="156" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="180" y1="0.0" x2="180" y2="216.0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="12" x2="192.0" y2="12" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="36" x2="192.0" y2="36" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="60" x2="192.0" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="84" x2="192.0" y2="84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="108" x2="192.0" y2="108" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="132" x2="192.0" y2="132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="156" x2="192.0" y2="156" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180" x2="192.0" y2="180" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="204" x2="192.0" y2="204" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="132" x2="200" y2="132" stroke="#1f2530" stroke-width="1.6"/><polygon points="208,132 198,127.5 198,136.5" fill="#1f2530"/><line x1="36" y1="216" x2="36" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="36,-16.0 31.5,-6.0 40.5,-6.0" fill="#1f2530"/><text x="206" y="150" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="45" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="12" y="148" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="60" y="148" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="84" y="148" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="108" y="148" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="132" y="148" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="156" y="148" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="180" y="148" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="30" y="16.0" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="30" y="40.0" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="30" y="64.0" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="30" y="88.0" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="30" y="112.0" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="30" y="160.0" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="30" y="184.0" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="30" y="208.0" font-size="12" text-anchor="end" fill="#1f2530">−3</text><path d="M45.8,216 L46.8,203.5 L47.7,191.6 L48.7,180.3 L49.6,169.5 L50.6,159.3 L51.6,149.7 L52.5,140.5 L53.5,131.8 L54.4,123.6 L55.4,115.8 L56.4,108.4 L57.3,101.4 L58.3,94.9 L59.2,88.7 L60.2,82.9 L61.2,77.4 L62.1,72.2 L63.1,67.4 L64,62.9 L65,58.6 L66,54.7 L66.9,51 L67.9,47.6 L68.8,44.4 L69.8,41.4 L70.8,38.7 L71.7,36.2 L72.7,33.9 L73.6,31.8 L74.6,29.8 L75.6,28.1 L76.5,26.5 L77.5,25.1 L78.4,23.8 L79.4,22.7 L80.4,21.7 L81.3,20.8 L82.3,20.1 L83.2,19.4 L84.2,18.9 L85.2,18.5 L86.1,18.2 L87.1,18 L88,17.9 L89,17.8 L90,17.9 L90.9,18 L91.9,18.1 L92.8,18.4 L93.8,18.7 L94.8,19 L95.7,19.5 L96.7,19.9 L97.6,20.4 L98.6,21 L99.6,21.5 L100.5,22.2 L101.5,22.8 L102.4,23.5 L103.4,24.2 L104.4,24.9 L105.3,25.7 L106.3,26.4 L107.2,27.2 L108.2,28 L109.2,28.8 L110.1,29.7 L111.1,30.5 L112,31.3 L113,32.2 L114,33 L114.9,33.9 L115.9,34.7 L116.8,35.6 L117.8,36.4 L118.8,37.3 L119.7,38.1 L120.7,38.9 L121.6,39.8 L122.6,40.6 L123.6,41.4 L124.5,42.2 L125.5,43 L126.4,43.8 L127.4,44.5 L128.4,45.3 L129.3,46 L130.3,46.7 L131.2,47.4 L132.2,48.1 L133.2,48.8 L134.1,49.5 L135.1,50.1 L136,50.8 L137,51.4 L138,52 L138.9,52.5 L139.9,53.1 L140.8,53.6 L141.8,54.2 L142.8,54.7 L143.7,55.1 L144.7,55.6 L145.6,56 L146.6,56.5 L147.6,56.9 L148.5,57.3 L149.5,57.6 L150.4,58 L151.4,58.3 L152.4,58.6 L153.3,58.9 L154.3,59.2 L155.2,59.5 L156.2,59.7 L157.2,59.9 L158.1,60.1 L159.1,60.3 L160,60.4 L161,60.6 L162,60.7 L162.9,60.8 L163.9,60.9 L164.8,61 L165.8,61 L166.8,61.1 L167.7,61.1 L168.7,61.1 L169.6,61.1 L170.6,61 L171.6,61 L172.5,60.9 L173.5,60.8 L174.4,60.7 L175.4,60.6 L176.4,60.5 L177.3,60.3 L178.3,60.2 L179.2,60 L180.2,59.8 L181.2,59.6 L182.1,59.4 L183.1,59.2 L184,58.9 L185,58.7 L186,58.4 L186.9,58.1 L187.9,57.8 L188.8,57.5 L189.6,57.2" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="2.4" y1="112.8" x2="189.6" y2="19.2" stroke="#2563c9" stroke-width="2"/><text x="180" y="16" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="193.6" y="73.2" font-size="14" text-anchor="end" fill="#c8324a"><tspan font-style="italic">f</tspan></text><path d="M60,84 L61,78.5 L61.9,73.2 L62.9,68.3 L63.8,63.8 L64.8,59.5 L65.8,55.5 L66.7,51.7 L67.7,48.2 L68.6,45 L69.6,42 L70.6,39.2 L71.5,36.7 L72.5,34.3 L73.4,32.2 L74.4,30.2 L75.4,28.4 L76.3,26.8 L77.3,25.3 L78.2,24 L79.2,22.9 L80.2,21.9 L81.1,21 L82.1,20.2 L83,19.6 L84,19 L85,18.6 L85.9,18.3 L86.9,18 L87.8,17.9 L88.8,17.8 L89.8,17.9 L90.7,17.9 L91.7,18.1 L92.6,18.3 L93.6,18.6 L94.6,19 L95.5,19.4 L96.5,19.8 L97.4,20.3 L98.4,20.8 L99.4,21.4 L100.3,22 L101.3,22.7 L102.2,23.3 L103.2,24 L104.2,24.8 L105.1,25.5 L106.1,26.3 L107,27.1 L108,27.9 L109,28.7 L109.9,29.5 L110.9,30.3 L111.8,31.2 L112.8,32 L113.8,32.9 L114.7,33.7 L115.7,34.6 L116.6,35.4 L117.6,36.3 L118.6,37.1 L119.5,37.9 L120.5,38.8 L121.4,39.6 L122.4,40.4 L123.4,41.2 L124.3,42 L125.3,42.8 L126.2,43.6 L127.2,44.4 L128.2,45.1 L129.1,45.9 L130.1,46.6 L131,47.3 L132,48" fill="none" stroke="#c8324a" stroke-width="4.5"/><line x1="60" y1="132" x2="132" y2="132" stroke="#1f2530" stroke-width="4"/><line x1="60" y1="132" x2="60" y2="84" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="60" cy="132" r="4" fill="#f7f2e8" stroke="#1f2530" stroke-width="1.8"/><line x1="132" y1="132" x2="132" y2="48" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="132" cy="132" r="4" fill="#f7f2e8" stroke="#1f2530" stroke-width="1.8"/></svg>
:::

I själva skärningspunkterna är värdena lika stora, inte olika. Därför
ingår $x = 1$ och $x = 4$ inte, och intervallet får ofyllda ringar i
ändpunkterna.

**Svar:** $1 < x < 4$
:::
:::

::: sammanfattning "Sammanfattning"

::: sampunkt "Funktion"
- Ett samband där varje tillåtet $x$-värde ger **exakt ett** $y$-värde.
- **Lodrätt streck-testet**: en lodrät linje får skära grafen **högst en
  gång**.
:::

::: sampunkt "Beroende och oberoende"
- $x$ är den **oberoende** variabeln, den vi själva väljer.
- $y$ är den **beroende** variabeln, den som följer av $x$.
- Värdet $y$ får kallas **funktionsvärde**.
:::

::: sampunkt "Skrivsättet"
- $y = f(x)$, som utläses "$f$ av $x$".
- $f$ är funktionens namn, $x$ visar vilken variabel den beror på.
- Andra bokstäver fungerar lika bra: $g(x)$, $h(x)$.
- $f(x) = kx + m$ kallas **linjär funktion**, eftersom grafen blir en rät
  linje.
:::

::: sampunkt "Räkna ut funktionsvärden"
- **Ersätt $x$** med det som står inom parentesen.
- $f(x) = 5x - 3$ ger $f(4) = 17$ och
  $f(-2) = -13$.
- Även uttryck fungerar: $f(3a) = 15a - 3$.
- $f(x) = 8$ löses som ekvationen $5x - 3 = 8$.
:::

::: sampunkt "Läsa av ur en graf"
- $f(2)$: gå till $x = 2$ och läs av **höjden**.
- $f(0)$: läs av där grafen skär $y$-axeln.
- $f(x) = 0$: leta upp **alla** $x$ där grafen skär $x$-axeln. Det kan
  vara flera.
- $f(x) = g(x)$: läs av $x$ där graferna **skär varandra**.
- $g(x) < f(x)$: läs av $x$ där grafen till $f$ ligger **ovanför** $g$.
:::
:::
