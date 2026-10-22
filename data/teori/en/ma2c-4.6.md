---
kalla: 50b33d5c4a
id: ma2c-4.6
title: Coordinate geometry
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.6'
---

# Coordinate geometry

Studying geometric figures by using a coordinate system
is called **coordinate geometry**.

The distance between two points in a coordinate system can be determined with
**the distance formula**.

::: formel "The distance formula"
$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

where $d$ is the distance between the points $(x_1, y_1)$ and $(x_2, y_2)$.

::: härledning "Derivation: The distance formula"
We determine the distance $d$ between two points by forming a
right-angled triangle and using Pythagoras' theorem as in the figure below.

::: figur
<svg viewBox="2 4 182 148" width="288" height="234" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Two points, minus 4 comma 2 and 5 comma 7, in a coordinate system. A dashed horizontal leg and a dashed vertical leg form a right-angled triangle where the distance d is the hypotenuse."><line x1="10" y1="125" x2="172" y2="125" stroke="#1f2530" stroke-width="1.4"/><polygon points="180,125 171,121 171,129" fill="#1f2530"/><line x1="80" y1="146" x2="80" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="80,6 76,15 84,15" fill="#1f2530"/><text x="178" y="141" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="88" y="16" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24" y1="97" x2="150" y2="97" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="150" y1="97" x2="150" y2="27" stroke="#1f2530" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="24" y1="97" x2="150" y2="27" stroke="#c8324a" stroke-width="2"/><circle cx="24" cy="97" r="3" fill="#1f2530"/><circle cx="150" cy="27" r="3" fill="#1f2530"/><text x="26" y="112" font-size="12" text-anchor="middle" fill="#1f2530">(−4, 2)</text><text x="144" y="22" font-size="12" text-anchor="end" fill="#1f2530">(5, 7)</text><text x="92" y="74" font-size="12" text-anchor="start" fill="#c8324a"><tspan font-style="italic">d</tspan></text></svg>
:::

**Example:** The horizontal leg of the triangle is the distance between $x = -4$ and
$x = 5$. It can be calculated as $5 - (-4) = 9$ l.u. (length units). In the same way,
the vertical leg of the triangle is the distance between $y = 2$ and $y = 7$, which is
calculated as $(7 - 2) = 5$ l.u.

Pythagoras' theorem gives

$$
d^2 = (5 - (-4))^2 + (7 - 2)^2
$$

$$
d = \sqrt{9^2 + 5^2} = \sqrt{81 + 25} = \sqrt{106} \approx 10.3\ \text{l.u.}
$$

(the negative solution is disregarded).

**In general:** The horizontal leg of the triangle is the distance between $x_1$ and
$x_2$. It can be calculated as $(x_2 - x_1)$. In the same way,
the vertical leg of the triangle is the distance between $y_1$ and $y_2$, which is calculated as
$(y_2 - y_1)$.

Pythagoras' theorem gives

$$
d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2
$$

$$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$$

QED
:::
:::

The point midway between two other points is called the **midpoint** and can
be determined with **the midpoint formula**. The midpoint lies midway between
the $x$- and $y$-coordinates of the points and can be determined from
their means.

::: formel "The midpoint formula"
$$
(x_m, y_m) = \left( \frac{x_1 + x_2}{2},\ \frac{y_1 + y_2}{2} \right)
$$

where $(x_m, y_m)$ is the midpoint between the points $(x_1, y_1)$ and
$(x_2, y_2)$.
:::

::: exempel "Example 1: Distance and midpoint"
**We have the points (−3, −5) and (7, −1). Determine<br>a) the distance between the points&emsp;&emsp;b) the midpoint**

::: handskrift
typ: avstandmitt
:::

::: textlosning
**a)** We use the distance formula and substitute the values $x_1 = -3$,
$y_1 = -5$, $x_2 = 7$ and $y_2 = -1$. This gives

$$
d = \sqrt{(7 - (-3))^2 + ((-1) - (-5))^2} = \sqrt{10^2 + 4^2} = \sqrt{100 + 16} = \sqrt{116} \approx 10.8\ \text{l.u.}
$$

**Answer:** $\sqrt{116}$ l.u. ≈ 10.8 l.u.

**b)** We use the midpoint formula and substitute the values $x_1 = -3$,
$y_1 = -5$, $x_2 = 7$ and $y_2 = -1$. This gives

$$
(x_m, y_m) = \left( \frac{-3 + 7}{2},\ \frac{-5 + (-1)}{2} \right) = \left( \frac{4}{2},\ \frac{-6}{2} \right) = (2, -3)
$$

**Answer:** (2, −3)
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Coordinate geometry"
- Geometric figures are studied with the help of a **coordinate system**.
:::

::: sampunkt "The distance formula"
- $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
- It is **Pythagoras' theorem**, where the legs are the differences in the $x$-direction
  and the $y$-direction.
- The order does not matter, since the differences are squared.
:::

::: sampunkt "Calculating with negative coordinates"
- Substitute with **brackets** around each value:
  $(7 - (-3))^2$.
- That is where most mistakes happen.
:::

::: sampunkt "The midpoint formula"
- $(x_m, y_m) = \left(\dfrac{x_1 + x_2}{2},\
  \dfrac{y_1 + y_2}{2}\right)$
- That is, **the mean** of the $x$-coordinates and the mean of the
  $y$-coordinates.
:::

::: sampunkt "The form of the answer"
- Distance: preferably answer both **exactly** as a root and rounded, with
  the unit l.u.
- Midpoint: answer as a **coordinate**, that is $(2, -3)$.
:::
:::
