---
kalla: 703c2d1734
id: ma2c-3.5
title: Problem solving with graphing tools
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.5'
---

# Problem solving with graphing tools

In problem solving, we draw the function that describes
the situation in order to answer the question. Useful tools in Geogebra are
*Extremum*, *Intersect* and *Roots*.

::: exempel "Example 1: The New Year's rocket"
**A New Year's rocket has a height that can be described by the function
$h(t) = 40t - 4.9t^2$, where $t$ is the time in seconds and $h(t)$ is
the rocket's height in metres.**

::: handskrift
typ: nyarsraket
:::

::: textlosning
We draw $h(t) = 40t - 4.9t^2$ in Geogebra and answer the questions
below from the graph.

::: figur
<svg viewBox="-2 -4 194 226" width="284" height="330" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of the rocket's height: a parabola from the origin that reaches a maximum of about 81.6 metres after about 4 seconds and lands after about 8.2 seconds, with a horizontal line at the height 50 metres that intersects the path at two points."><line x1="56" y1="12" x2="56" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="92" y1="12" x2="92" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="128" y1="12" x2="128" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="164" y1="12" x2="164" y2="200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="160" x2="182" y2="160" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="120" x2="182" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="80" x2="182" y2="80" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="40" x2="182" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="200" x2="184" y2="200" stroke="#1f2530" stroke-width="1.6"/><polygon points="192,200 182,195.5 182,204.5" fill="#1f2530"/><line x1="20" y1="212" x2="20" y2="10" stroke="#1f2530" stroke-width="1.6"/><polygon points="20,2 15.5,12 24.5,12" fill="#1f2530"/><text x="190" y="218" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">t</tspan> (s)</text><text x="29" y="12" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">h</tspan> (m)</text><text x="56" y="214" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="92" y="214" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="128" y="214" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="164" y="214" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="14" y="164" font-size="11" text-anchor="end" fill="#1f2530">20</text><text x="14" y="124" font-size="11" text-anchor="end" fill="#1f2530">40</text><text x="14" y="84" font-size="11" text-anchor="end" fill="#1f2530">60</text><text x="14" y="44" font-size="11" text-anchor="end" fill="#1f2530">80</text><path d="M 20,200 Q 93.5,-126.4 166.9,200" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="12" y1="100" x2="182" y2="100" stroke="#4a7d3a" stroke-width="2"/><circle cx="47.7" cy="100" r="3.5" fill="#c8324a"/><circle cx="139.2" cy="100" r="3.5" fill="#c8324a"/><circle cx="166.9" cy="200" r="3" fill="#1f2530"/><text x="42" y="92" font-size="12" text-anchor="end" fill="#c8324a">A</text><text x="146" y="92" font-size="12" text-anchor="start" fill="#c8324a">B</text><text x="174" y="192" font-size="12" text-anchor="end" fill="#1f2530">8,2</text></svg>
:::

**a) How long does it take before the rocket lands?<br>b) How high does the rocket reach at most?<br>c) How long does it take for the rocket to reach the height 50 metres?**

**a)** The rocket lands when the height $h(t) = 0$, which corresponds to the zero
furthest to the right on the $t$-axis. We use the tool *Roots* and
read off its $t$-coordinate: $t \approx 8.2$.

**Answer:** After 8.2 seconds.

**b)** The rocket reaches its highest point when the height $h(t)$ is greatest, which is
at the maximum point. We use the tool *Extremum* and read off the
$y$-coordinate of the maximum point. We see that the greatest height is at
$h(t) \approx 81.6$.

**Answer:** 81.6 metres

**c)** The rocket reaches the height 50 metres when $h(t) = 50$. We draw the
auxiliary function $y = 50$ (the green line in the figure) and find
the points of intersection A and B with the tool *Intersect*:
A ≈ (1.5, 50) and B ≈ (6.6, 50).

We see that the rocket reaches the height 50 m after $t \approx 1.5$ s (on the way
up) and after $t \approx 6.6$ s (on the way down).

**Answer:** After 1.5 s (on the way up) and after 6.6 s (on the way down).
:::
:::

::: exempel "Example 2: The pen by the wall"
**A rectangular pen is to be built against a wall. There are 52 metres of
fencing that must cover three of the sides, since the fourth side
is formed by the wall. See the figure. What dimensions should the pen have for its area
to be as large as possible?**

::: figur
<svg viewBox="16 4 252 162" width="368" height="237" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A rectangular pen against a wall: the band of the wall at the top, the pen below with the two equal sides x and the third side 52 minus 2x."><rect x="24" y="10" width="212" height="16" fill="rgba(31,37,48,0.12)" stroke="#1f2530" stroke-width="1" stroke-dasharray="5 4"/><text x="130" y="22" font-size="12" text-anchor="middle" fill="#1f2530">Wall</text><rect x="44" y="26" width="172" height="100" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="32" y1="30" x2="32" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="32,26 28.8,33 35.2,33" fill="#1f2530"/><polygon points="32,126 28.8,119 35.2,119" fill="#1f2530"/><text x="24" y="80" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="228" y1="30" x2="228" y2="122" stroke="#1f2530" stroke-width="1.2"/><polygon points="228,26 224.8,33 231.2,33" fill="#1f2530"/><polygon points="228,126 224.8,119 231.2,119" fill="#1f2530"/><text x="236" y="80" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><line x1="48" y1="140" x2="212" y2="140" stroke="#1f2530" stroke-width="1.2"/><polygon points="44,140 51,136.8 51,143.2" fill="#1f2530"/><polygon points="216,140 209,136.8 209,143.2" fill="#1f2530"/><text x="130" y="160" font-size="13" text-anchor="middle" fill="#1f2530">52 − 2<tspan font-style="italic">x</tspan></text><text x="266" y="16" font-size="12" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

::: handskrift
typ: hagenvidmuren
:::

::: textlosning
We write an expression for the area of the pen. We call the two equally long
sides $x$. Since we have 52 metres of fencing in total, the
third side must have the length $52 - 2x$. The area of the rectangle is the base
times the height, that is

$$
A(x) = x(52 - 2x)
$$

We draw the function $A(x) = x(52 - 2x)$ in Geogebra.

::: figur
<svg viewBox="-12 -6 202 222" width="295" height="324" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of the area of the pen as a function of the side x: a parabola with maximum point at 13 comma 338."><line x1="45" y1="10" x2="45" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="75" y1="10" x2="75" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="105" y1="10" x2="105" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="135" y1="10" x2="135" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="165" y1="10" x2="165" y2="196" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="140" x2="180" y2="140" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="90" x2="180" y2="90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="40" x2="180" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="7" y1="190" x2="184" y2="190" stroke="#1f2530" stroke-width="1.6"/><polygon points="192,190 182,185.5 182,194.5" fill="#1f2530"/><line x1="15" y1="202" x2="15" y2="8" stroke="#1f2530" stroke-width="1.6"/><polygon points="15,0 10.5,10 19.5,10" fill="#1f2530"/><text x="190" y="208" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="24" y="10" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="45" y="204" font-size="11" text-anchor="middle" fill="#1f2530">5</text><text x="75" y="204" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="105" y="204" font-size="11" text-anchor="middle" fill="#1f2530">15</text><text x="135" y="204" font-size="11" text-anchor="middle" fill="#1f2530">20</text><text x="165" y="204" font-size="11" text-anchor="middle" fill="#1f2530">25</text><text x="9" y="144" font-size="11" text-anchor="end" fill="#1f2530">100</text><text x="9" y="94" font-size="11" text-anchor="end" fill="#1f2530">200</text><text x="9" y="44" font-size="11" text-anchor="end" fill="#1f2530">300</text><path d="M 15,190 Q 93,-148 171,190" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="93" cy="21" r="3.5" fill="#c8324a"/><text x="101" y="16" font-size="12" text-anchor="start" fill="#c8324a">(13, 338)</text></svg>
:::

We are to determine the dimensions that give the maximum area, that is we want to find
out for which value of $x$ the area $A(x)$ is greatest, which
corresponds to the maximum point of the graph. We use the tool *Extremum* to
find the coordinates of the maximum point: (13, 338).

We see that the maximum area is $338\ \mathrm{m}^2$ when
$x = 13$ metres.

The two equal sides are thus $x = 13$ metres and the third side
is

$$
52 - 2x = 52 - 2 \cdot 13 = 52 - 26 = 26\ \mathrm{m}
$$

The dimensions of the pen are thus 26 × 13 metres.

**Answer:** 26 × 13 metres
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Method"
1. Draw the function that **describes the situation**.
2. Decide which tool the question requires.
3. Read off and **interpret** in the units of the context.
:::

::: sampunkt "Three tools in GeoGebra"
- **Roots**: when something is zero, for example the height at impact.
- **Extremum**: the greatest or least value, for example maximum height.
- **Intersect**: when something reaches a particular value.
:::

::: sampunkt "Read off the right coordinate"
- **The time** or the independent quantity is the $x$-coordinate.
- **The height** or the dependent quantity is the $y$-coordinate.
- "How long" looks for $x$, "how high" looks for $y$.
:::

::: sampunkt "Interpret in reality"
- Reject solutions that make no sense, for example negative time.
- If the task asks "how long does it take to reach the height $50\ \mathrm{m}$", there can
  be **two** answers: once on the way up and once on the way down.
- Answer with a **unit** and sensible rounding.
:::
:::
