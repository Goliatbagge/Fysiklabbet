---
id: ma2c-4.6
title: Koordinatgeometri
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.6'
---

# Koordinatgeometri

Att studera geometriska figurer genom att använda ett koordinatsystem
kallas **koordinatgeometri**.

Avståndet mellan två punkter i ett koordinatsystem kan bestämmas med
**avståndsformeln**.

::: formel "Avståndsformeln"
$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

där $d$ är avståndet mellan punkterna $(x_1, y_1)$ och $(x_2, y_2)$.
:::

::: härledning "Härledning — Avståndsformeln"
Vi bestämmer avståndet $d$ mellan två punkter genom att bilda en
rätvinklig triangel och använda Pythagoras sats enligt figuren nedan.

::: figur
<svg viewBox="2 4 182 148" width="182" height="148" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Två punkter, minus 4 komma 2 och 5 komma 7, i ett koordinatsystem. En streckad vågrät och en streckad lodrät katet bildar en rätvinklig triangel där avståndet d är hypotenusan."><line x1="10" y1="125" x2="172" y2="125" stroke="#1f2530" stroke-width="1.4"/><polygon points="180,125 171,121 171,129" fill="#1f2530"/><line x1="80" y1="146" x2="80" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="80,6 76,15 84,15" fill="#1f2530"/><text x="178" y="141" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="88" y="16" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24" y1="97" x2="150" y2="97" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="150" y1="97" x2="150" y2="27" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="24" y1="97" x2="150" y2="27" stroke="#c8324a" stroke-width="2"/><circle cx="24" cy="97" r="3" fill="#1f2530"/><circle cx="150" cy="27" r="3" fill="#1f2530"/><text x="26" y="112" font-size="12" text-anchor="middle" fill="#1f2530">(−4, 2)</text><text x="144" y="22" font-size="12" text-anchor="end" fill="#1f2530">(5, 7)</text><text x="92" y="74" font-size="12" text-anchor="start" fill="#c8324a"><tspan font-style="italic">d</tspan></text></svg>
:::

**Exempel:** Triangelns vågräta katet är sträckan mellan $x = -4$ och
$x = 5$. Den kan beräknas som $5 - (-4) = 9$ l.e. På motsvarande sätt
är triangelns lodräta katet sträckan mellan $y = 2$ och $y = 7$ som
beräknas $(7 - 2) = 5$ l.e.

Pythagoras sats ger

$$
d^2 = (5 - (-4))^2 + (7 - 2)^2
$$

$$
d = \sqrt{9^2 + 5^2} = \sqrt{81 + 25} = \sqrt{106} \approx 10{,}3\ \text{l.e.}
$$

(den negativa lösningen bortses).

**Generellt:** Triangelns vågräta katet är sträckan mellan $x_1$ och
$x_2$. Den kan beräknas som $(x_2 - x_1)$. På motsvarande sätt är
triangelns lodräta katet sträckan mellan $y_1$ och $y_2$ som beräknas
$(y_2 - y_1)$.

Pythagoras sats ger

$$
d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2
$$

$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

v.s.v.
:::

Punkten mitt emellan två andra punkter kallas **mittpunkt** och kan
bestämmas med **mittpunktsformeln**. Mittpunkten ligger mitt emellan
punkternas $x$- respektive $y$-koordinater och kan bestämmas genom
deras medelvärden.

::: formel "Mittpunktsformeln"
$$
(x_m, y_m) = \left( \frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2} \right)
$$

där $(x_m, y_m)$ är mittpunkten mellan punkterna $(x_1, y_1)$ och
$(x_2, y_2)$.
:::

::: exempel "Exempel 1 — Avstånd och mittpunkt"
**Vi har punkterna (−3, −5) och (7, −1). Bestäm<br>a) avståndet mellan punkterna&emsp;&emsp;b) mittpunkten**

**a)** Vi använder avståndsformeln och sätter in värdena $x_1 = -3$,
$y_1 = -5$, $x_2 = 7$ och $y_2 = -1$. Detta ger

$$
d = \sqrt{(7 - (-3))^2 + ((-1) - (-5))^2} = \sqrt{10^2 + 4^2} = \sqrt{100 + 16} = \sqrt{116} \approx 10{,}8\ \text{l.e.}
$$

**Svar:** $\sqrt{116}$ l.e. ≈ 10,8 l.e.

**b)** Vi använder mittpunktsformeln och sätter in värdena $x_1 = -3$,
$y_1 = -5$, $x_2 = 7$ och $y_2 = -1$. Detta ger

$$
(x_m, y_m) = \left( \frac{-3 + 7}{2},\ \frac{-5 + (-1)}{2} \right) = \left( \frac{4}{2},\ \frac{-6}{2} \right) = (2, -3)
$$

**Svar:** (2, −3)
:::
