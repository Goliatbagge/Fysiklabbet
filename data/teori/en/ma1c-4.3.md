---
kalla: 2d10f163bc
id: ma1c-4.3
title: From equation to graph
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.3'
---

# From equation to graph

We have previously seen how a linear model can be described with a
formula/equation, a table of values and a graph, respectively. When we draw graphs later
on at this level we will do it with digital tools, for example
GeoGebra. To understand what the digital tools actually do,
we will now draw graphs by hand ourselves.

::: exempel "Example 1: Draw the graph by hand"
**Draw the graph of the equation $y = -2x + 3$.**

::: handskrift
typ: ritagraf
:::

::: textlosning
We make a table of values with integers from $x = -3$ to $x = 3$. Exactly which
*x*-coordinates we choose does not matter much, but a good rule of thumb is to choose
some positive and negative ones around $x = 0$:

| $x$ | Calculation ($y = -2x + 3$) | $y$ |
| --- | --- | --- |
| −3 | $-2 \cdot (-3) + 3 = 6 + 3$ | 9 |
| −2 | $-2 \cdot (-2) + 3 = 4 + 3$ | 7 |
| −1 | $-2 \cdot (-1) + 3 = 2 + 3$ | 5 |
| 0 | $-2 \cdot 0 + 3 = 0 + 3$ | 3 |
| 1 | $-2 \cdot 1 + 3 = -2 + 3$ | 1 |
| 2 | $-2 \cdot 2 + 3 = -4 + 3$ | −1 |
| 3 | $-2 \cdot 3 + 3 = -6 + 3$ | −3 |

Each row in the table of values corresponds to a coordinate pair. From the first row we have
that when $x = -3$, $y = 9$. This gives the point (−3, 9). In the
same way we get the rest of the points (−2, 7), (−1, 5), (0, 3),
(1, 1), (2, −1) and (3, −3).

We plot the points in a coordinate system. When we draw
the coordinate system, the *x*-axis must extend from $x = -3$ to $x = 3$
and the *y*-axis from $y = -3$ to $y = 9$ (the largest and smallest *x*- and
*y*-coordinates, respectively):

::: figur
<svg viewBox="-26 -20 221 281" width="300" height="381" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A coordinate system with the seven points from the table of values plotted, from minus 3 comma 9 down to 3 comma minus 3."><line x1="14.4" y1="0.0" x2="14.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="239.4" x2="172.8" y2="239.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="220.4" x2="172.8" y2="220.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="201.4" x2="172.8" y2="201.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="172.8" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.4" x2="172.8" y2="163.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="144.4" x2="172.8" y2="144.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="125.4" x2="172.8" y2="125.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="106.4" x2="172.8" y2="106.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="87.4" x2="172.8" y2="87.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="68.4" x2="172.8" y2="68.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.4" x2="172.8" y2="49.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="30.4" x2="172.8" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.4" x2="172.8" y2="11.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="180.8" y2="182.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="188.8,182.4 178.8,177.9 178.8,186.9" fill="#1f2530"/><line x1="86.4" y1="250.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="186.8" y="200.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="80.4" y="243.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="224.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="205.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="167.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="148.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="129.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="80.4" y="110.4" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="80.4" y="91.4" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="80.4" y="72.4" font-size="12" text-anchor="end" fill="#1f2530">6</text><text x="80.4" y="53.4" font-size="12" text-anchor="end" fill="#1f2530">7</text><text x="80.4" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">8</text><text x="80.4" y="15.4" font-size="12" text-anchor="end" fill="#1f2530">9</text><circle cx="14.4" cy="11.4" r="3.4" fill="#2563c9"/><circle cx="38.4" cy="49.4" r="3.4" fill="#2563c9"/><circle cx="62.4" cy="87.4" r="3.4" fill="#2563c9"/><circle cx="86.4" cy="125.4" r="3.4" fill="#2563c9"/><circle cx="110.4" cy="163.4" r="3.4" fill="#2563c9"/><circle cx="134.4" cy="201.4" r="3.4" fill="#2563c9"/><circle cx="158.4" cy="239.4" r="3.4" fill="#2563c9"/></svg>
:::

Finally we join the points with a straight line and then we get our graph:

::: figur
<svg viewBox="-26 -20 221 281" width="300" height="381" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same coordinate system where the points have been joined with a straight line: the graph of y equals minus 2 x plus 3."><line x1="14.4" y1="0.0" x2="14.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="250.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="239.4" x2="172.8" y2="239.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="220.4" x2="172.8" y2="220.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="201.4" x2="172.8" y2="201.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="172.8" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.4" x2="172.8" y2="163.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="144.4" x2="172.8" y2="144.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="125.4" x2="172.8" y2="125.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="106.4" x2="172.8" y2="106.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="87.4" x2="172.8" y2="87.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="68.4" x2="172.8" y2="68.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.4" x2="172.8" y2="49.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="30.4" x2="172.8" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="11.4" x2="172.8" y2="11.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="182.4" x2="180.8" y2="182.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="188.8,182.4 178.8,177.9 178.8,186.9" fill="#1f2530"/><line x1="86.4" y1="250.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="186.8" y="200.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="198.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="80.4" y="243.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="224.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="205.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="167.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="148.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="129.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="80.4" y="110.4" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="80.4" y="91.4" font-size="12" text-anchor="end" fill="#1f2530">5</text><text x="80.4" y="72.4" font-size="12" text-anchor="end" fill="#1f2530">6</text><text x="80.4" y="53.4" font-size="12" text-anchor="end" fill="#1f2530">7</text><text x="80.4" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">8</text><text x="80.4" y="15.4" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="7.2" y1="0.0" x2="165.6" y2="250.8" stroke="#4a7d3a" stroke-width="2"/><circle cx="14.4" cy="11.4" r="3.4" fill="#2563c9"/><circle cx="38.4" cy="49.4" r="3.4" fill="#2563c9"/><circle cx="62.4" cy="87.4" r="3.4" fill="#2563c9"/><circle cx="86.4" cy="125.4" r="3.4" fill="#2563c9"/><circle cx="110.4" cy="163.4" r="3.4" fill="#2563c9"/><circle cx="134.4" cy="201.4" r="3.4" fill="#2563c9"/><circle cx="158.4" cy="239.4" r="3.4" fill="#2563c9"/></svg>

The graph of $y = -2x + 3$ is a straight line that slopes downwards.
:::
:::
:::

This is exactly what the digital tools do for you, only in an
instant. Drag the sliders below and see directly how the number in front of $x$
(the slope $k$) and the constant term ($m$) change the appearance of the line. Set
$k = -2$ and $m = 3$ and you get back the graph from the example above.

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

We see that when $m$ is unchanged and only $k$ changes, the line rotates
about the same point on the $y$-axis. If $m$ changes instead, the whole line moves
straight up or down. The red dot shows where the line crosses the $y$-axis, and we
see that it is always at the height of the value of $m$. The dashed
step shows the slope: if we go **one step to the right** along the line, we
at the same time go **$k$ steps up or down**. You can also drag the grid to move
around in the coordinate system and zoom with the mouse wheel (or the buttons at the top
right).

## Intersection with the axes

Where a line crosses the axes can be read off the graph, but the reading is
rarely exact. With the equation we can instead calculate the points of intersection
**algebraically**. This is based on a simple observation:

- Every point on the *y*-axis has the *x*-coordinate 0. So the line crosses
  the *y*-axis where $x = 0$.
- Every point on the *x*-axis has the *y*-coordinate 0. So the line crosses
  the *x*-axis where $y = 0$.

::: formel "Intersection with the axes"
**Intersection with the *y*-axis:** set $x = 0$ in the equation and work out $y$.

**Intersection with the *x*-axis:** set $y = 0$ in the equation and solve for $x$.
:::

In the figure below the line $y = 2x - 8$ crosses the axes at the points (0, −8) and
(4, 0). At the point on the *y*-axis the *x*-coordinate is 0, and at the point on the
*x*-axis the *y*-coordinate is 0.

::: figur
<svg viewBox="-4 -20 200 288" width="271" height="391" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The line y equals 2 x minus 8 in a coordinate system. It crosses the y-axis at the point 0 comma minus 8 and the x-axis at the point 4 comma 0."><line x1="0" y1="0" x2="0" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="0" x2="22" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="44" y1="0" x2="44" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="66" y1="0" x2="66" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="88" y1="0" x2="88" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110" y1="0" x2="110" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="132" y1="0" x2="132" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176" y1="0" x2="176" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="264" x2="176" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="242" x2="176" y2="242" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="220" x2="176" y2="220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="198" x2="176" y2="198" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="176" x2="176" y2="176" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="154" x2="176" y2="154" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="132" x2="176" y2="132" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="110" x2="176" y2="110" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="88" x2="176" y2="88" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="66" x2="176" y2="66" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="44" x2="176" y2="44" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="22" x2="176" y2="22" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="176" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="66" x2="184" y2="66" stroke="#1f2530" stroke-width="1.6"/><polygon points="192,66 182,61.5 182,70.5" fill="#1f2530"/><line x1="44" y1="264" x2="44" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="44,-16 39.5,-6 48.5,-6" fill="#1f2530"/><text x="190" y="84" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="53" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="88" y="82" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="38" y="26" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="38" y="114" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="38" y="158" font-size="12" text-anchor="end" fill="#1f2530">−4</text><text x="38" y="202" font-size="12" text-anchor="end" fill="#1f2530">−6</text><line x1="33" y1="264" x2="165" y2="0" stroke="#4a7d3a" stroke-width="2"/><circle cx="44" cy="242" r="3.6" fill="#2563c9"/><circle cx="132" cy="66" r="3.6" fill="#2563c9"/><text x="54" y="257" font-size="13" text-anchor="start" fill="#2563c9">(0, −8)</text><text x="124" y="57" font-size="13" text-anchor="end" fill="#2563c9">(4, 0)</text><text x="100" y="159" font-size="13" text-anchor="start" fill="#4a7d3a"><tspan font-style="italic">y</tspan> = 2<tspan font-style="italic">x</tspan> − 8</text></svg>
:::

For a line of the form $y = kx + m$, $x = 0$ always gives $y = m$, so
the intersection with the *y*-axis can be read directly from the equation. The intersection with the
*x*-axis, on the other hand, requires us to solve an equation.

::: exempel "Example 2: Intersection with the axes"
**Determine algebraically where the line $y = 2x - 8$ crosses<br>a) the *y*-axis&emsp;&emsp;b) the *x*-axis**

::: handskrift
typ: axelskarning
:::

::: textlosning
**a)** On the *y*-axis $x = 0$. We substitute $x = 0$ into the equation:

$$
\begin{aligned}
y &= 2 \cdot 0 - 8 \\
y &= 0 - 8 \\
y &= -8
\end{aligned}
$$

The point of intersection is (0, −8). This agrees with $m = -8$.

**Answer:** (0, −8)

**b)** On the *x*-axis $y = 0$. We substitute $y = 0$ into the equation and solve
for $x$:

$$
\begin{aligned}
0 &= 2x - 8 \\
0 \mathbin{\boldsymbol{+}} \boldsymbol{8} &= 2x - 8 \mathbin{\boldsymbol{+}} \boldsymbol{8} \\
8 &= 2x \\
\frac{8}{\boldsymbol{2}} &= \frac{2x}{\boldsymbol{2}} \\
4 &= x
\end{aligned}
$$

The point of intersection is (4, 0). Check: $2 \cdot 4 - 8 = 0$, so the point
lies on the line.

**Answer:** (4, 0)
:::
:::

## Does the point lie on the line?

A point lies on a line if its coordinates satisfy the equation of the
line. We can test this without drawing anything: we substitute the point's
$x$-coordinate into the equation and work out $y$. If $y$ is the same as the point's
$y$-coordinate, the point lies on the line. If it is something else, the
point does not lie on the line, but above or below it.

::: exempel "Example 2: Does the point lie on the line?"
**Decide whether the point lies on the line $y = -2x + 3$.<br>a)&nbsp;$(5, -7)$&emsp;&emsp;b)&nbsp;$(-4, 10)$**

::: handskrift
typ: punktpalinje
:::

::: textlosning
**a)** The point has the $x$-coordinate 5. We substitute $x = 5$ into the equation:

$$y = -2 \cdot 5 + 3 = -10 + 3 = -7$$

We get $y = -7$, which is the same as the point's $y$-coordinate.

**Answer:** Yes, the point lies on the line.

**b)** The point has the $x$-coordinate $-4$. We substitute $x = -4$ into
the equation, with the negative number in brackets:

$$y = -2 \cdot (-4) + 3 = 8 + 3 = 11$$

We get $y = 11$, but the point's $y$-coordinate is 10. So the line passes
through $(-4, 11)$, one square above the point.

**Answer:** No, the point does not lie on the line.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Drawing a line by hand"
1. Choose some **simple** $x$-values, preferably $-2, -1, 0, 1$ and $2$.
2. Calculate the corresponding $y$-values and write them in a table of values.
3. Plot the points in the coordinate system.
4. Draw a **straight line** through them.
:::

::: sampunkt "Two points are enough"
- A straight line is determined by two points. Preferably take a third as a
  **check**: if it does not end up on the line you have made a mistake.
- $x = 0$ is always a good choice, since it gives the $y$-intercept directly.
:::

::: sampunkt "Intersection with the axes"
- ***y*-axis:** set $x = 0$ and work out $y$. For $y = kx + m$ this gives $m$.
- ***x*-axis:** set $y = 0$ and solve the equation.
- The points of intersection are written $(0,\ y)$ and $(x,\ 0)$.
:::

::: sampunkt "Does the point lie on the line?"
- Substitute the point's $x$-coordinate into the equation and work out $y$.
- If $y$ equals the point's $y$-coordinate, the point lies **on the line**,
  otherwise not.
:::

::: sampunkt "What the sliders show"
- If **$k$** changes, the line rotates about its point on the $y$-axis.
- If **$m$** changes, the whole line moves straight up or down.
- The $y$-intercept is always at the height of $m$.
:::

::: sampunkt "The step"
- If you go **one step to the right** along the line, you at the same time go **$k$ steps**
  up or down.
- That is exactly what digital tools like GeoGebra do for you, only
  instantly.
:::
:::
