---
id: ma1c-4.1
title: Koordinatsystem och linjära modeller
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.1'
---

# Koordinatsystem och linjära modeller

## Koordinatsystem

För att ange läget i ett plan krävs två talaxlar: en vågrät **x-axel** och
en lodrät **y-axel**. Detta kallas ett **koordinatsystem**. Skärningen
mellan *x*-axeln och *y*-axeln kallas **origo**. Vi kan ange läget för en punkt
genom att skriva dess **koordinat**. Koordinater skrivs i parentes med
*x*-koordinaten (läget i sidled) först och *y*-koordinaten (läget i höjdled)
sist, dvs. ($x$, $y$).

::: figur
<svg viewBox="-26 -20 246 228" width="246" height="228" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med punkten 2 komma 3 markerad. Punkten ligger 2 steg åt höger i x-led och 3 steg upp i y-led."><line x1="0.0" y1="0.0" x2="0.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="26.0" y1="0.0" x2="26.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52.0" y1="0.0" x2="52.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="78.0" y1="0.0" x2="78.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104.0" y1="0.0" x2="104.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="130.0" y1="0.0" x2="130.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156.0" y1="0.0" x2="156.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182.0" y1="0.0" x2="182.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="197.6" x2="197.6" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="197.6" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="197.6" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="197.6" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="197.6" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="197.6" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="197.6" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="197.6" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="205.6" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213.6,145.6 203.6,141.1 203.6,150.1" fill="#1f2530"/><line x1="52.0" y1="197.6" x2="52.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="52.0,-16.0 47.5,-6.0 56.5,-6.0" fill="#1f2530"/><text x="211.6" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="61.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="0.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="26.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="78.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="104.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="130.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="156.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="182.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="46.0" y="201.6" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="46.0" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="46.0" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="46.0" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="46.0" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="46.0" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="46.0" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="104.0" y1="145.6" x2="104.0" y2="67.6" stroke="#1f2530" stroke-width="1.4"/><line x1="52.0" y1="67.6" x2="104.0" y2="67.6" stroke="#1f2530" stroke-width="1.4"/><circle cx="104.0" cy="67.6" r="3.6" fill="#1f2530"/><text x="112.0" y="61.6" font-size="13" text-anchor="start" fill="#1f2530">(2, 3)</text></svg>

Punkten markerad i koordinatsystemet har *x*-koordinaten 2 och *y*-koordinaten
3, vilket skrivs (2, 3).
:::

Koordinatsystemets fyra områden delas in i **kvadranter**. Kvadranten med
positiva *x*- och *y*-värden kallas första kvadranten. Sedan kommer andra,
tredje och fjärde kvadranten moturs. Om det i en uppgift står att vi ska
hitta lösningar i t.ex. "första kvadranten" ska alltså både *x*- och
*y*-koordinaten vara positiv.

::: figur
<svg viewBox="-26 -20 330 312" width="330" height="312" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Koordinatsystemets fyra kvadranter: första kvadranten uppe till höger, andra uppe till vänster, tredje nere till vänster och fjärde nere till höger."><line x1="0.0" y1="0.0" x2="0.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34.0" y1="0.0" x2="34.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="68.0" y1="0.0" x2="68.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="102.0" y1="0.0" x2="102.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="136.0" y1="0.0" x2="136.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="170.0" y1="0.0" x2="170.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="204.0" y1="0.0" x2="204.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="238.0" y1="0.0" x2="238.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="272.0" y1="0.0" x2="272.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="282.2" x2="282.2" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="248.2" x2="282.2" y2="248.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="214.2" x2="282.2" y2="214.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180.2" x2="282.2" y2="180.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="282.2" y2="146.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="112.2" x2="282.2" y2="112.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="78.2" x2="282.2" y2="78.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="44.2" x2="282.2" y2="44.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="10.2" x2="282.2" y2="10.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="290.2" y2="146.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="298.2,146.2 288.2,141.7 288.2,150.7" fill="#1f2530"/><line x1="136.0" y1="282.2" x2="136.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="136.0,-16.0 131.5,-6.0 140.5,-6.0" fill="#1f2530"/><text x="296.2" y="164.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="145.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="0.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−8</text><text x="34.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−6</text><text x="68.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−4</text><text x="102.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−2</text><text x="170.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="204.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="238.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="272.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="130.0" y="286.2" font-size="11" text-anchor="end" fill="#1f2530">−8</text><text x="130.0" y="252.2" font-size="11" text-anchor="end" fill="#1f2530">−6</text><text x="130.0" y="218.2" font-size="11" text-anchor="end" fill="#1f2530">−4</text><text x="130.0" y="184.2" font-size="11" text-anchor="end" fill="#1f2530">−2</text><text x="130.0" y="116.2" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="130.0" y="82.2" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="130.0" y="48.2" font-size="11" text-anchor="end" fill="#1f2530">6</text><text x="130.0" y="14.2" font-size="11" text-anchor="end" fill="#1f2530">8</text><rect x="15" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="67.0" font-size="12" text-anchor="middle" fill="#1f2530">andra</text><text x="61.2" y="81.0" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text><rect x="161" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="67.0" font-size="12" text-anchor="middle" fill="#1f2530">första</text><text x="207.4" y="81.0" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text><rect x="15" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="206.4" font-size="12" text-anchor="middle" fill="#1f2530">tredje</text><text x="61.2" y="220.4" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text><rect x="161" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="206.4" font-size="12" text-anchor="middle" fill="#1f2530">fjärde</text><text x="207.4" y="220.4" font-size="12" text-anchor="middle" fill="#1f2530">kvadranten</text></svg>

Kvadranterna numreras moturs med start uppe till höger.
:::

## Linjära modeller

En modell som beskriver något som ändras i jämn takt med *samma mängd*
kallas **linjär modell** (eftersom den grafiskt beskrivs av en rät linje).

Linjära modeller kan beskrivas med formel, tabell eller graf.

::: exempel "Exempel 1 — Bilverkstaden"
**En bilfirma tar för en reparation 500 kr i fast avgift och sedan 400 kr
per timme utfört arbete. Visa sambandet mellan kostnaden $y$ kr för $x$
arbetade timmar med en<br>a) formel&emsp;&emsp;b) värdetabell&emsp;&emsp;c) graf.**

**a)** Eftersom 500 kr är en fast kostnad måste termen 500 finnas med i
formeln. Eftersom kostnaden 400 kr multipliceras med varje timme $x$ måste
även termen $400 \cdot x = 400x$ finnas med.

**Svar:** $y = 500 + 400x$

**b)** Utifrån formeln ovan kan vi göra en värdetabell. Vi gör en kolumn
för antalet arbetade timmar $x$ och en för motsvarande kostnad $y$ kr och
fyller i några värden:

| $x$ (timmar) | Beräkning | $y$ (kr) |
| --- | --- | --- |
| 0 | $500 + 400 \cdot 0$ | 500 |
| 1 | $500 + 400 \cdot 1$ | 900 |
| 2 | $500 + 400 \cdot 2$ | 1 300 |
| 3 | $500 + 400 \cdot 3$ | 1 700 |
| 4 | $500 + 400 \cdot 4$ | 2 100 |

**c)** Utifrån värdetabellen ovan kan vi rita upp en graf. Vi ritar upp
ett koordinatsystem och prickar in motsvarande punkter (0, 500), (1, 900),
(2, 1300), (3, 1700) och (4, 2100). Vi behöver en x-axel som sträcker sig
till 4 och en y-axel som sträcker sig till 2 100:

::: figur
<svg viewBox="-42 -20 303 187" width="303" height="187" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett koordinatsystem med de fem punkterna 0 komma 500, 1 komma 900, 2 komma 1300, 3 komma 1700 och 4 komma 2100 inprickade."><line x1="0.0" y1="0.0" x2="0.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52.0" y1="0.0" x2="52.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104.0" y1="0.0" x2="104.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156.0" y1="0.0" x2="156.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="208.0" y1="0.0" x2="208.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="239.2" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="111.6" x2="239.2" y2="111.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="80.6" x2="239.2" y2="80.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.6" x2="239.2" y2="49.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="18.6" x2="239.2" y2="18.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="247.2" y2="142.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="255.2,142.6 245.2,138.1 245.2,147.1" fill="#1f2530"/><line x1="0.0" y1="142.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="253.2" y="160.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="52.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="104.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="156.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="208.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="-6.0" y="115.6" font-size="12" text-anchor="end" fill="#1f2530">500</text><text x="-6.0" y="84.6" font-size="12" text-anchor="end" fill="#1f2530">1000</text><text x="-6.0" y="53.6" font-size="12" text-anchor="end" fill="#1f2530">1500</text><text x="-6.0" y="22.6" font-size="12" text-anchor="end" fill="#1f2530">2000</text><circle cx="0.0" cy="111.6" r="3.4" fill="#2563c9"/><circle cx="52.0" cy="86.8" r="3.4" fill="#2563c9"/><circle cx="104.0" cy="62.0" r="3.4" fill="#2563c9"/><circle cx="156.0" cy="37.2" r="3.4" fill="#2563c9"/><circle cx="208.0" cy="12.4" r="3.4" fill="#2563c9"/></svg>
:::

Därefter förbinder vi punkterna med en rät linje, vilket ger vår graf:

::: figur
<svg viewBox="-42 -20 303 187" width="303" height="187" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma koordinatsystem där de fem punkterna har förbundits med en rät linje: grafen till y lika med 500 plus 400 x."><line x1="0.0" y1="0.0" x2="0.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52.0" y1="0.0" x2="52.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104.0" y1="0.0" x2="104.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156.0" y1="0.0" x2="156.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="208.0" y1="0.0" x2="208.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="239.2" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="111.6" x2="239.2" y2="111.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="80.6" x2="239.2" y2="80.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.6" x2="239.2" y2="49.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="18.6" x2="239.2" y2="18.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="247.2" y2="142.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="255.2,142.6 245.2,138.1 245.2,147.1" fill="#1f2530"/><line x1="0.0" y1="142.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="253.2" y="160.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="52.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="104.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="156.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="208.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="-6.0" y="115.6" font-size="12" text-anchor="end" fill="#1f2530">500</text><text x="-6.0" y="84.6" font-size="12" text-anchor="end" fill="#1f2530">1000</text><text x="-6.0" y="53.6" font-size="12" text-anchor="end" fill="#1f2530">1500</text><text x="-6.0" y="22.6" font-size="12" text-anchor="end" fill="#1f2530">2000</text><line x1="0.0" y1="111.6" x2="231.4" y2="1.2" stroke="#4a7d3a" stroke-width="2"/><circle cx="0.0" cy="111.6" r="3.4" fill="#2563c9"/><circle cx="52.0" cy="86.8" r="3.4" fill="#2563c9"/><circle cx="104.0" cy="62.0" r="3.4" fill="#2563c9"/><circle cx="156.0" cy="37.2" r="3.4" fill="#2563c9"/><circle cx="208.0" cy="12.4" r="3.4" fill="#2563c9"/></svg>

Grafen till $y = 500 + 400x$ är en rät linje.
:::
:::
