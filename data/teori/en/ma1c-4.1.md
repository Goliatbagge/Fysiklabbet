---
kalla: 519352a9d6
id: ma1c-4.1
title: Coordinate systems and linear models
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.1'
---

# Coordinate systems and linear models

## Coordinate systems

To state a position in a plane, two number axes are needed: a horizontal **x-axis** and
a vertical **y-axis**. This is called a **coordinate system**. The intersection
of the *x*-axis and the *y*-axis is called the **origin**. We can state the position of a point
by writing its **coordinates**. Coordinates are written in brackets with
the *x*-coordinate (the horizontal position) first and the *y*-coordinate (the vertical position)
last, that is ($x$, $y$).

::: figur
<svg viewBox="-26 -20 246 228" width="334" height="309" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A coordinate system with the point 2 comma 3 marked. The point lies 2 steps to the right in the x-direction and 3 steps up in the y-direction."><line x1="0.0" y1="0.0" x2="0.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="26.0" y1="0.0" x2="26.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52.0" y1="0.0" x2="52.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="78.0" y1="0.0" x2="78.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104.0" y1="0.0" x2="104.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="130.0" y1="0.0" x2="130.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156.0" y1="0.0" x2="156.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182.0" y1="0.0" x2="182.0" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="197.6" x2="197.6" y2="197.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="197.6" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="197.6" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="197.6" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="197.6" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="197.6" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="197.6" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="197.6" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="205.6" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213.6,145.6 203.6,141.1 203.6,150.1" fill="#1f2530"/><line x1="52.0" y1="197.6" x2="52.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="52.0,-16.0 47.5,-6.0 56.5,-6.0" fill="#1f2530"/><text x="211.6" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="61.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="0.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="26.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="78.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="104.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="130.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="156.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="182.0" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="46.0" y="201.6" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="46.0" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="46.0" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="46.0" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="46.0" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="46.0" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="46.0" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="104.0" y1="145.6" x2="104.0" y2="67.6" stroke="#1f2530" stroke-width="1.4"/><line x1="52.0" y1="67.6" x2="104.0" y2="67.6" stroke="#1f2530" stroke-width="1.4"/><circle cx="104.0" cy="67.6" r="3.6" fill="#1f2530"/><text x="112.0" y="61.6" font-size="13" text-anchor="start" fill="#1f2530">(2, 3)</text></svg>

The point marked in the coordinate system has the *x*-coordinate 2 and the *y*-coordinate
3, which is written (2, 3).
:::

::: tips "How to draw a coordinate system"
1. Draw a horizontal line with a ruler. This is the *x*-axis. Draw an arrowhead at the **right-hand** end, because the numbers get larger to the right.
2. Draw a vertical line that crosses the *x*-axis. This is the *y*-axis. Draw an arrowhead at the **top** end, because the numbers get larger upwards.
3. Write ***x*** at the arrowhead of the horizontal axis and ***y*** at the arrowhead of the vertical one.
4. Mark the scale: **at least one value on each axis**, for example 1. Without values it is impossible to know how large a step is. The distance between the steps on an axis must always be the same. However, the *x*-axis and the *y*-axis may have different scales, for example 1 per square on the *x*-axis and 10 per square on the *y*-axis.

The pen below draws a coordinate system step by step. Click to see the next step.

::: handskrift
typ: ritakoordinatsystem
:::
:::

The four regions of the coordinate system are divided into **quadrants**. The quadrant with
positive *x*- and *y*-values is called the first quadrant. Then come the second,
third and fourth quadrants anticlockwise. So if a task says that we are to
find solutions in, for example, "the first quadrant", both the *x*- and the
*y*-coordinate must be positive.

::: figur
<svg viewBox="-26 -20 330 312" width="418" height="395" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The four quadrants of the coordinate system: the first quadrant at the top right, the second at the top left, the third at the bottom left and the fourth at the bottom right. Point at or tap a quadrant to see the signs of the coordinates there." style="overflow:visible"><style>.q41-g{cursor:pointer;outline:none}.q41-g .q41-area{fill:rgba(37,99,201,0);transition:fill .18s ease}.q41-g:hover .q41-area,.q41-g:focus .q41-area{fill:rgba(37,99,201,0.08)}.q41-g .q41-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q41-g:hover .q41-lbl,.q41-g:focus .q41-lbl{opacity:1}.q41-g:hover .q41-n,.q41-g:focus .q41-n{font-weight:600}</style><line x1="0.0" y1="0.0" x2="0.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34.0" y1="0.0" x2="34.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="68.0" y1="0.0" x2="68.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="102.0" y1="0.0" x2="102.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="136.0" y1="0.0" x2="136.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="170.0" y1="0.0" x2="170.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="204.0" y1="0.0" x2="204.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="238.0" y1="0.0" x2="238.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="272.0" y1="0.0" x2="272.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="282.2" x2="282.2" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="248.2" x2="282.2" y2="248.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="214.2" x2="282.2" y2="214.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180.2" x2="282.2" y2="180.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="282.2" y2="146.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="112.2" x2="282.2" y2="112.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="78.2" x2="282.2" y2="78.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="44.2" x2="282.2" y2="44.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="10.2" x2="282.2" y2="10.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="290.2" y2="146.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="298.2,146.2 288.2,141.7 288.2,150.7" fill="#1f2530"/><line x1="136.0" y1="282.2" x2="136.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="136.0,-16.0 131.5,-6.0 140.5,-6.0" fill="#1f2530"/><text x="296.2" y="164.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="145.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="0.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−8</text><text x="34.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−6</text><text x="68.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−4</text><text x="102.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−2</text><text x="170.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="204.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="238.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="272.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="130.0" y="286.2" font-size="11" text-anchor="end" fill="#1f2530">−8</text><text x="130.0" y="252.2" font-size="11" text-anchor="end" fill="#1f2530">−6</text><text x="130.0" y="218.2" font-size="11" text-anchor="end" fill="#1f2530">−4</text><text x="130.0" y="184.2" font-size="11" text-anchor="end" fill="#1f2530">−2</text><text x="130.0" y="116.2" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="130.0" y="82.2" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="130.0" y="48.2" font-size="11" text-anchor="end" fill="#1f2530">6</text><text x="130.0" y="14.2" font-size="11" text-anchor="end" fill="#1f2530">8</text><g class="q41-g" tabindex="0"><rect class="q41-area" x="136" y="0" width="146.2" height="146.2"/><rect x="161" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="67" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">first</text><text x="207.4" y="81" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="177.4" y="98" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="115" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(+, +)</text></g></g><g class="q41-g" tabindex="0"><rect class="q41-area" x="0" y="0" width="136" height="146.2"/><rect x="15" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="67" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">second</text><text x="61.2" y="81" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="31.200000000000003" y="98" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="115" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(−, +)</text></g></g><g class="q41-g" tabindex="0"><rect class="q41-area" x="0" y="146.2" width="136" height="136"/><rect x="15" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="206" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">third</text><text x="61.2" y="220" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="31.200000000000003" y="237" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="254" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(−, −)</text></g></g><g class="q41-g" tabindex="0"><rect class="q41-area" x="136" y="146.2" width="146.2" height="136"/><rect x="161" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="206" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">fourth</text><text x="207.4" y="220" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="177.4" y="237" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="254" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(+, −)</text></g></g></svg>

The quadrants are numbered anticlockwise starting at the top right. Point at or tap a quadrant to see the signs of the *x*- and *y*-coordinates there.
:::

## Linear models

A model that describes something that changes at a steady rate by *the same amount*
is called a **linear model** (because it is described graphically by a straight line).

Linear models can be described with a formula, a table or a graph.

::: exempel "Example 1: The car repair shop"
**For a repair, a car firm charges a fixed fee of 500 kr and then 400 kr
per hour of work done. Show the relationship between the cost $y$ kr for $x$
hours worked with a<br>a) formula&emsp;&emsp;b) table of values&emsp;&emsp;c) graph.**

::: handskrift
typ: bilverkstad
:::

::: textlosning
**a)** Since 500 kr is a fixed cost, the term 500 must be in
the formula. Since the cost 400 kr is multiplied by each hour $x$,
the term $400 \cdot x = 400x$ must also be there.

**Answer:** $y = 500 + 400x$

**b)** From the formula above we can make a table of values. We make one column
for the number of hours worked $x$ and one for the corresponding cost $y$ kr and
fill in some values:

| $x$ (hours) | Calculation | $y$ (kr) |
| --- | --- | --- |
| 0 | $500 + 400 \cdot 0$ | 500 |
| 1 | $500 + 400 \cdot 1$ | 900 |
| 2 | $500 + 400 \cdot 2$ | 1 300 |
| 3 | $500 + 400 \cdot 3$ | 1 700 |
| 4 | $500 + 400 \cdot 4$ | 2 100 |

**c)** From the table of values above we can draw a graph. We draw
a coordinate system and plot the corresponding points (0, 500), (1, 900),
(2, 1300), (3, 1700) and (4, 2100). We need an x-axis that extends
to 4 and a y-axis that extends to 2 100:

::: figur
<svg viewBox="-42 -20 303 187" width="411" height="254" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A coordinate system with the five points 0 comma 500, 1 comma 900, 2 comma 1300, 3 comma 1700 and 4 comma 2100 plotted."><line x1="0.0" y1="0.0" x2="0.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52.0" y1="0.0" x2="52.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104.0" y1="0.0" x2="104.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156.0" y1="0.0" x2="156.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="208.0" y1="0.0" x2="208.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="239.2" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="111.6" x2="239.2" y2="111.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="80.6" x2="239.2" y2="80.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.6" x2="239.2" y2="49.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="18.6" x2="239.2" y2="18.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="247.2" y2="142.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="255.2,142.6 245.2,138.1 245.2,147.1" fill="#1f2530"/><line x1="0.0" y1="142.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="253.2" y="160.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="52.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="104.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="156.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="208.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="-6.0" y="115.6" font-size="12" text-anchor="end" fill="#1f2530">500</text><text x="-6.0" y="84.6" font-size="12" text-anchor="end" fill="#1f2530">1000</text><text x="-6.0" y="53.6" font-size="12" text-anchor="end" fill="#1f2530">1500</text><text x="-6.0" y="22.6" font-size="12" text-anchor="end" fill="#1f2530">2000</text><circle cx="0.0" cy="111.6" r="3.4" fill="#2563c9"/><circle cx="52.0" cy="86.8" r="3.4" fill="#2563c9"/><circle cx="104.0" cy="62.0" r="3.4" fill="#2563c9"/><circle cx="156.0" cy="37.2" r="3.4" fill="#2563c9"/><circle cx="208.0" cy="12.4" r="3.4" fill="#2563c9"/></svg>
:::

Then we join the points with a straight line, which gives our graph:

::: figur
<svg viewBox="-42 -20 303 187" width="411" height="254" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same coordinate system where the five points have been joined with a straight line: the graph of y equals 500 plus 400 x."><line x1="0.0" y1="0.0" x2="0.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52.0" y1="0.0" x2="52.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104.0" y1="0.0" x2="104.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="156.0" y1="0.0" x2="156.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="208.0" y1="0.0" x2="208.0" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="239.2" y2="142.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="111.6" x2="239.2" y2="111.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="80.6" x2="239.2" y2="80.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="49.6" x2="239.2" y2="49.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="18.6" x2="239.2" y2="18.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="142.6" x2="247.2" y2="142.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="255.2,142.6 245.2,138.1 245.2,147.1" fill="#1f2530"/><line x1="0.0" y1="142.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="253.2" y="160.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="52.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="104.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="156.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="208.0" y="158.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="-6.0" y="115.6" font-size="12" text-anchor="end" fill="#1f2530">500</text><text x="-6.0" y="84.6" font-size="12" text-anchor="end" fill="#1f2530">1000</text><text x="-6.0" y="53.6" font-size="12" text-anchor="end" fill="#1f2530">1500</text><text x="-6.0" y="22.6" font-size="12" text-anchor="end" fill="#1f2530">2000</text><line x1="0.0" y1="111.6" x2="231.4" y2="1.2" stroke="#4a7d3a" stroke-width="2"/><circle cx="0.0" cy="111.6" r="3.4" fill="#2563c9"/><circle cx="52.0" cy="86.8" r="3.4" fill="#2563c9"/><circle cx="104.0" cy="62.0" r="3.4" fill="#2563c9"/><circle cx="156.0" cy="37.2" r="3.4" fill="#2563c9"/><circle cx="208.0" cy="12.4" r="3.4" fill="#2563c9"/></svg>

The graph of $y = 500 + 400x$ is a straight line.
:::
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Coordinate systems"
- Two number axes: a horizontal **$x$-axis** and a vertical **$y$-axis**.
- The intersection is called the **origin**.
- A **coordinate pair** is written $(x, y)$: the horizontal position first, the vertical position
  last.
- Draw arrows to the right and upwards, $x$ and $y$ at the arrowheads and at least one
  value on each axis.
:::

::: sampunkt "The quadrants"
- The four regions are numbered **anticlockwise** starting at the top right.
- **First quadrant**: both $x$ and $y$ positive.
- Second: $x$ negative, $y$ positive. Third: both negative. Fourth: $x$
  positive, $y$ negative.
:::

::: sampunkt "Linear model"
- Describes something that changes at a **steady rate**, always by the same amount.
- The graph is a **straight line**.
:::

::: sampunkt "Three ways of describing the same thing"
- **Formula**: $y = 500 + 400x$.
- **Table of values**: some $x$-values with their corresponding $y$-values.
- **Graph**: the line in a coordinate system.
- The **fixed** part becomes the constant term, what is added per unit
  becomes the coefficient.
:::
:::
