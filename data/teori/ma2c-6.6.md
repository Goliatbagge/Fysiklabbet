---
id: ma2c-6.6
title: Linjär regression
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.6'
---

# Linjär regression

::: tips "Repetition från Matematik 1c"
Om ett samband finns mellan två variabler har vi en **korrelation**.
Huruvida ett samband finns, kan undersökas med ett
**spridningsdiagram**. Om punkterna i ett spridningsdiagram ligger
tydligt på en linje är korrelationen **stark**. Om punkterna ligger
kring en rät linje, men spridda är korrelationen **svag**. Om punkterna
ligger kring en linje med positiv lutning är korrelationen **positiv**.
Om punkterna ligger kring en linje med negativ lutning är korrelationen
**negativ**.
:::

Linjen som värdena ligger samlade kring kallas **regressionslinje**. Om
vi tar fram ekvationen för regressionslinjen gör vi en **linjär
regression**. En regressionsanalys går att göra ungefärligt för hand
eller exaktare med digitala verktyg. Vid regressionsanalysen kan vi ta
fram ett värde som säger hur stark korrelationen är. Detta värde kallas
**korrelationskoefficient**, betecknas $r$ och är alltid ett värde
mellan −1 och 1. Om punkterna ligger perfekt på en linje med **positiv
lutning** är $r = 1$. Om punkterna ligger perfekt på en linje med
**negativ lutning** är $r = -1$. Om ingen korrelation finns alls är
$r = 0$. Se exemplen nedan.

::: figur
<svg viewBox="0 0 520 152" width="520" height="152" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tre spridningsdiagram: ett med punkter tätt längs en stigande linje (stark positiv korrelation), ett med spridda punkter kring en fallande linje (svag negativ korrelation) och ett med helt slumpmässiga punkter (ingen korrelation)."><line x1="8" y1="110" x2="150" y2="110" stroke="#1f2530" stroke-width="1.3"/><polygon points="158,110 149,106 149,114" fill="#1f2530"/><line x1="18" y1="118" x2="18" y2="12" stroke="#1f2530" stroke-width="1.3"/><polygon points="18,4 14,13 22,13" fill="#1f2530"/><circle cx="28" cy="100" r="2.6" fill="#c8324a"/><circle cx="38" cy="93" r="2.6" fill="#c8324a"/><circle cx="46" cy="89" r="2.6" fill="#c8324a"/><circle cx="55" cy="80" r="2.6" fill="#c8324a"/><circle cx="63" cy="75" r="2.6" fill="#c8324a"/><circle cx="72" cy="66" r="2.6" fill="#c8324a"/><circle cx="80" cy="61" r="2.6" fill="#c8324a"/><circle cx="89" cy="52" r="2.6" fill="#c8324a"/><circle cx="98" cy="46" r="2.6" fill="#c8324a"/><circle cx="107" cy="37" r="2.6" fill="#c8324a"/><circle cx="116" cy="31" r="2.6" fill="#c8324a"/><circle cx="126" cy="22" r="2.6" fill="#c8324a"/><text x="80" y="134" font-size="11" text-anchor="middle" fill="#1f2530">Stark positiv korrelation</text><text x="80" y="148" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">r</tspan> ≈ 1</text><line x1="188" y1="110" x2="330" y2="110" stroke="#1f2530" stroke-width="1.3"/><polygon points="338,110 329,106 329,114" fill="#1f2530"/><line x1="198" y1="118" x2="198" y2="12" stroke="#1f2530" stroke-width="1.3"/><polygon points="198,4 194,13 202,13" fill="#1f2530"/><circle cx="208" cy="28" r="2.6" fill="#c8324a"/><circle cx="216" cy="55" r="2.6" fill="#c8324a"/><circle cx="225" cy="38" r="2.6" fill="#c8324a"/><circle cx="233" cy="68" r="2.6" fill="#c8324a"/><circle cx="242" cy="48" r="2.6" fill="#c8324a"/><circle cx="251" cy="78" r="2.6" fill="#c8324a"/><circle cx="260" cy="60" r="2.6" fill="#c8324a"/><circle cx="269" cy="88" r="2.6" fill="#c8324a"/><circle cx="278" cy="70" r="2.6" fill="#c8324a"/><circle cx="288" cy="95" r="2.6" fill="#c8324a"/><circle cx="298" cy="82" r="2.6" fill="#c8324a"/><circle cx="308" cy="100" r="2.6" fill="#c8324a"/><text x="260" y="134" font-size="11" text-anchor="middle" fill="#1f2530">Svag negativ korrelation</text><text x="260" y="148" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">r</tspan> ≈ −0,5</text><line x1="368" y1="110" x2="510" y2="110" stroke="#1f2530" stroke-width="1.3"/><polygon points="518,110 509,106 509,114" fill="#1f2530"/><line x1="378" y1="118" x2="378" y2="12" stroke="#1f2530" stroke-width="1.3"/><polygon points="378,4 374,13 382,13" fill="#1f2530"/><circle cx="390" cy="45" r="2.6" fill="#c8324a"/><circle cx="398" cy="90" r="2.6" fill="#c8324a"/><circle cx="406" cy="22" r="2.6" fill="#c8324a"/><circle cx="415" cy="66" r="2.6" fill="#c8324a"/><circle cx="422" cy="100" r="2.6" fill="#c8324a"/><circle cx="430" cy="40" r="2.6" fill="#c8324a"/><circle cx="440" cy="78" r="2.6" fill="#c8324a"/><circle cx="448" cy="18" r="2.6" fill="#c8324a"/><circle cx="456" cy="56" r="2.6" fill="#c8324a"/><circle cx="464" cy="94" r="2.6" fill="#c8324a"/><circle cx="472" cy="34" r="2.6" fill="#c8324a"/><circle cx="482" cy="72" r="2.6" fill="#c8324a"/><circle cx="490" cy="26" r="2.6" fill="#c8324a"/><circle cx="497" cy="88" r="2.6" fill="#c8324a"/><text x="440" y="134" font-size="11" text-anchor="middle" fill="#1f2530">Ingen korrelation</text><text x="440" y="148" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">r</tspan> ≈ 0</text></svg>
:::

Exempel på samband: fotlängd/skostorlek har stark positiv korrelation,
vägbredd/antal olyckor kan ha svag negativ korrelation och
äggkonsumtion/kriminalitet har ingen korrelation.

::: exempel "Exempel 1 — Glassförsäljningen"
**Medeltemperaturen och ett företags försäljning av glass under en
vecka visas nedan.**

| Medeltemperatur (°C) | Glassförsäljning (kr) |
| --- | --- |
| 22,1 | 8 000 |
| 18,5 | 7 500 |
| 26,7 | 9 500 |
| 24,3 | 9 000 |
| 20,6 | 8 300 |
| 27,9 | 10 200 |
| 23,4 | 8 900 |

Spridningsdiagrammet och regressionslinjen som tas fram i a- och
b-uppgifterna visas i figuren nedan.

::: figur
<svg viewBox="-30 6 250 174" width="250" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Ett spridningsdiagram över glassförsäljning mot medeltemperatur med sju punkter som ligger nära en stigande regressionslinje."><line x1="14" y1="150" x2="204" y2="150" stroke="#1f2530" stroke-width="1.4"/><polygon points="212,150 203,146 203,154" fill="#1f2530"/><line x1="14" y1="158" x2="14" y2="18" stroke="#1f2530" stroke-width="1.4"/><polygon points="14,10 10,19 18,19" fill="#1f2530"/><line x1="30" y1="150" x2="200" y2="62.6" stroke="#c8324a" stroke-width="1.8"/><circle cx="111.5" cy="121.4" r="3" fill="#1f2530"/><circle cx="57.5" cy="135.7" r="3" fill="#1f2530"/><circle cx="180.5" cy="78.6" r="3" fill="#1f2530"/><circle cx="144.5" cy="92.9" r="3" fill="#1f2530"/><circle cx="89" cy="112.9" r="3" fill="#1f2530"/><circle cx="198.5" cy="58.6" r="3" fill="#1f2530"/><circle cx="131" cy="95.7" r="3" fill="#1f2530"/><text x="50" y="164" font-size="9" text-anchor="middle" fill="#1f2530">18</text><text x="80" y="164" font-size="9" text-anchor="middle" fill="#1f2530">20</text><text x="110" y="164" font-size="9" text-anchor="middle" fill="#1f2530">22</text><text x="140" y="164" font-size="9" text-anchor="middle" fill="#1f2530">24</text><text x="170" y="164" font-size="9" text-anchor="middle" fill="#1f2530">26</text><text x="200" y="164" font-size="9" text-anchor="middle" fill="#1f2530">28</text><text x="-28" y="153" font-size="9" text-anchor="start" fill="#1f2530">7 000</text><text x="-28" y="124" font-size="9" text-anchor="start" fill="#1f2530">8 000</text><text x="-28" y="96" font-size="9" text-anchor="start" fill="#1f2530">9 000</text><text x="-28" y="67" font-size="9" text-anchor="start" fill="#1f2530">10 000</text><text x="216" y="176" font-size="9" text-anchor="end" fill="#1f2530">(°C)</text><text x="-28" y="20" font-size="9" text-anchor="start" fill="#1f2530">(kr)</text></svg>
:::

**a) Rita ett spridningsdiagram över resultatet. Låt medeltemperaturen
vara på x-axeln och glassförsäljningen på y-axeln.<br>b) Bestäm ekvationen för regressionslinjen.<br>c) Bestäm korrelationskoefficienten.<br>d) Uppskatta glassförsäljningen en vecka där medeltemperaturen är 30 °C utifrån din modell.**

**a)** Starta Geogebra, växla till kalkylblad och skriv av värdena från
tabellen. Markera värdena, klicka på "blå staplarna", välj
*Tvåvariabels regressionsanalys* och vårt spridningsdiagram visas.


**b)** Efter att ha tagit fram spridningsdiagrammet klickar vi på
rullistan "Regressionsmodell" och väljer "Linjär". Regressionslinjen
ritas upp (den röda linjen i figuren) och ekvationen för den visas
under diagrammet: $y = 268{,}6652x + 2\,496{,}1775$.

Vi avrundar värdena i ekvationen till lämpligt antal värdesiffror.

**Svar:** $y \approx 270x + 2\,500$

(Givetvis går det bra att rita spridningsdiagrammet, rita
regressionslinjen och ta fram ekvationen för hand, men det tar mycket
längre tid och blir mindre exakt.)

**c)** Efter att ha tagit fram spridningsdiagrammet klickar vi på "Visa
statistik", läser av $r$ och avrundar till två decimaler:
$r = 0{,}9651\ldots$

**Svar:** $r \approx 0{,}97$

**d)** Från b-uppgiften fick vi fram sambandet $y = 270x + 2\,500$ där
$x$ är medeltemperaturen i °C och $y$ försäljningen i kronor.

Om medeltemperaturen är 30 °C sätter vi in $x = 30$ i formeln ovan för
att få fram den förväntade försäljningen:

$$
y = 270 \cdot 30 + 2\,500 = 10\,600
$$

**Svar:** 10 600 kr
:::
