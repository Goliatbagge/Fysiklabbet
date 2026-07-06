---
id: ma1c-6.2
title: Sinus och cosinus
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.2'
---

# Sinus och cosinus

Kom ihåg från förra genomgången:

::: formel "Trigonometriska funktioner"
$$
\tan v = \frac{\text{motstående katet}}{\text{närliggande katet}} = \frac{a}{b}
$$

$$
\sin v = \frac{\text{motstående katet}}{\text{hypotenusa}} = \frac{a}{c}
$$

$$
\cos v = \frac{\text{närliggande katet}}{\text{hypotenusa}} = \frac{b}{c}
$$
:::

Eftersom hypotenusan, per definition, alltid är längre än katetrarna
kommer sin $v$ och cos $v$ alltid bli tal som är mindre än 1. Detta
eftersom vi dividerar sträckan hos en katet (ett mindre tal) med sträckan
hos hypotenusan (ett större tal).

::: exempel "Exempel 1 — Sinus och cosinus ur sidorna"
**Beräkna för triangeln nedan<br>a) sin $u$&emsp;&emsp;b) cos $u$&emsp;&emsp;c) sin $v$&emsp;&emsp;d) cos $v$**

::: figur
<svg viewBox="34 22 226 152" width="226" height="152" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med katetrarna 3 och 4 centimeter och hypotenusan 5 centimeter. Vinkeln u ligger överst och vinkeln v nere till höger."><polygon points="90,30 90,150 250,150" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,138.0 102.0,138.0 102.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M106.0,42.0 A20,20 0 0 1 90.0,50.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M228.0,150.0 A22,22 0 0 1 232.4,136.8" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="104" y="58" font-size="13" fill="#1f2530"><tspan font-style="italic">u</tspan></text><text x="212" y="142" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="78" y="95" font-size="13" text-anchor="end" fill="#1f2530">3 cm</text><text x="170" y="168" font-size="13" text-anchor="middle" fill="#1f2530">4 cm</text><text x="182" y="80" font-size="13" fill="#1f2530">5 cm</text></svg>
:::

**a)** Vi ska titta på förhållandet mellan motstående katet till vinkeln
$u$ och hypotenusan:

$$
\sin u = \frac{\text{motstående katet}}{\text{hypotenusa}} = \frac{4}{5} = 0{,}8
$$

**Svar:** $\dfrac{4}{5}$ eller 0,8

**b)** Närliggande katet till $u$ genom hypotenusan:

$$
\cos u = \frac{\text{närliggande katet}}{\text{hypotenusa}} = \frac{3}{5} = 0{,}6
$$

**Svar:** $\dfrac{3}{5}$ eller 0,6

**c)** Motstående katet till $v$ genom hypotenusan:

$$
\sin v = \frac{\text{motstående katet}}{\text{hypotenusa}} = \frac{3}{5} = 0{,}6
$$

**Svar:** $\dfrac{3}{5}$ eller 0,6

**d)** Närliggande katet till $v$ genom hypotenusan:

$$
\cos v = \frac{\text{närliggande katet}}{\text{hypotenusa}} = \frac{4}{5} = 0{,}8
$$

**Svar:** $\dfrac{4}{5}$ eller 0,8
:::

::: exempel "Exempel 2 — Bestäm hypotenusan"
**Bestäm längden hos sidan $a$. Figuren är inte skalenlig.**

::: figur
<svg viewBox="22 20 280 160" width="280" height="160" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En rätvinklig triangel med den lodräta kateten 6,1 centimeter, vinkeln 41 grader nere till höger och den okända hypotenusan a."><polygon points="80,28 80,160 290,160" fill="#b5d68f" stroke="#1f2530" stroke-width="1.5"/><polyline points="80.0,148.0 92.0,148.0 92.0,160.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M264.0,160.0 A26,26 0 0 1 268.0,146.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="244" y="152" font-size="12" text-anchor="end" fill="#1f2530">41°</text><text x="68" y="100" font-size="13" text-anchor="end" fill="#1f2530">6,1 cm</text><text x="192" y="82" font-size="14" fill="#1f2530"><tspan font-style="italic">a</tspan></text></svg>
:::

Vi har en vinkel (41°) och dess *motstående katet*. Vi ska beräkna
*hypotenusan* $a$. Då behöver vi ha en trigonometrisk funktion som
innehåller motstående katet och hypotenusa. Vilken är det? Jo, sinus! Då
använder vi sinus för vinkeln:

$$
\sin 41\degree = \frac{6{,}1}{a}
$$

$$
a = \frac{6{,}1}{\sin 41\degree} = 9{,}297\ldots \approx 9{,}3\ \mathrm{cm}
$$

**Svar:** 9,3 cm
:::

::: exempel "Exempel 3 — Triangelns area"
**Beräkna arean av triangeln nedan.**

::: figur
<svg viewBox="58 14 186 178" width="186" height="178" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="En triangel utan rät vinkel. Sidan snett uppåt till höger är 14, basen är 12 och vinkeln mellan dem är 42 grader."><polygon points="95,22 70,165 230,165" fill="none" stroke="#1f2530" stroke-width="1.5"/><path d="M204.0,165.0 A26,26 0 0 1 212.2,146.1" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="196" y="157" font-size="12" text-anchor="end" fill="#1f2530">42°</text><text x="172" y="86" font-size="13" fill="#1f2530">14</text><text x="150" y="183" font-size="13" text-anchor="middle" fill="#1f2530">12</text></svg>
:::

Arean av en triangel är

$$
A = \frac{\text{basen} \cdot \text{höjden}}{2} = \frac{b \cdot h}{2}
$$

Eftersom triangeln inte är rätvinklig utgör ingen av sidorna höjden. Vi
behöver alltså beräkna höjden $h$. Vi väljer sidan 12 som bas och ritar
in höjden på triangeln:

::: figur
<svg viewBox="58 14 186 178" width="186" height="178" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Samma triangel där höjden h är inritad som en streckad lodrät linje från toppen ner till basen."><polygon points="95,22 70,165 230,165" fill="none" stroke="#1f2530" stroke-width="1.5"/><path d="M204.0,165.0 A26,26 0 0 1 212.2,146.1" fill="none" stroke="#1f2530" stroke-width="1.3"/><line x1="95" y1="22" x2="95" y2="165" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="5 4"/><polyline points="95.0,155.0 105.0,155.0 105.0,165.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="196" y="157" font-size="12" text-anchor="end" fill="#1f2530">42°</text><text x="172" y="86" font-size="13" fill="#1f2530">14</text><text x="150" y="183" font-size="13" text-anchor="middle" fill="#1f2530">12</text><text x="104" y="100" font-size="13" fill="#1f2530"><tspan font-style="italic">h</tspan></text></svg>
:::

Vi har nu bildat en rätvinklig triangel där höjden $h$ utgör
*motstående katet* och sidan 14 *hypotenusa*. Vi använder sinus!

$$
\sin 42\degree = \frac{h}{14}
\qquad
h = 14 \cdot \sin 42\degree
$$

Vi har nu höjden! Insättning av $b = 12$ och $h = 14 \cdot \sin 42\degree$
i formeln för triangelarean $A = \frac{b \cdot h}{2}$ ger

$$
A = \frac{12 \cdot 14 \cdot \sin 42\degree}{2} = 56{,}206\ldots \approx 56\ \text{a.e. (areaenheter)}
$$

**Svar:** 56 a.e.
:::
