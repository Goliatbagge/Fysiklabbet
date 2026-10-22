---
kalla: 216e377d75
id: ma3c-2.2
title: The slope of the tangent
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.2'
---

# The slope of the tangent

If we want to know the slope of a curve at a particular point, we can draw a line that
**just touches** the curve at exactly that point and calculate the slope of that line.
A line that just touches a curve at a point is called a
**tangent**.

The slope of the tangent therefore corresponds to the slope of the curve at
the point of tangency.

::: figur
<svg viewBox="17 13 181 183" width="265" height="267" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A curve with a straight line that touches the curve at a point, marked with a red dot. The slope of the tangent line is the same as the slope of the curve at that point."><line x1="20.5" y1="115" x2="184" y2="115" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,115 184,110.5 184,119.5" fill="#1f2530"/><line x1="64" y1="191.5" x2="64" y2="31" stroke="#1f2530" stroke-width="1.6"/><polygon points="64,21 59.5,31 68.5,31" fill="#1f2530"/><path d="M 34,40.4 Q 109,171.6 184,40.4" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="25" y1="28.8" x2="130" y2="183.2" stroke="#4a7d3a" stroke-width="2"/><circle cx="46" cy="59.7" r="3.5" fill="#c8324a"/><text x="192" y="133" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="74" y="26" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="176" y="30" font-size="13" text-anchor="end" fill="#2563c9"><tspan font-style="italic">f</tspan></text><text x="100" y="165" font-size="12" text-anchor="start" fill="#4a7d3a">Tangent</text></svg>
:::

The slope of the tangent is calculated, just like that of the secant, by reading off two
points on the line $(x_1, y_1)$ and $(x_2, y_2)$ and substituting them into the formula
for the gradient $k$.

::: formel "The gradient"
$$
k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$
:::

::: formel "Interpreting the slope of the tangent in applications"
In applications the slope of the tangent represents **the rate of change at
an instant** (the slope at a point). Since the slope
$k = \dfrac{\Delta y}{\Delta x}$, it follows that the unit of the slope of the tangent
in applications is "the unit on the $y$-axis" per "the unit on the $x$-axis".
:::

::: exempel "Example 1: Reading off the slope of the tangent in a graph"
**A spruce seedling has the height $y$ dm after $x$ years according to the diagram below. At
what rate is the spruce seedling growing after 2 years?**

::: figur
<svg viewBox="8 10 182 122" width="288" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph shows the height y in decimetres of a spruce seedling after x years: a rising curve with a tangent line that touches the curve at the point (2, 1.4). Two points on the tangent, (0, 0.7) and (2, 1.4), are marked. Point at or tap the tangent to show the coordinates of the points read off." style="overflow:visible"><style>.q22s{cursor:pointer;outline:none}.q22s .q22-ln{transition:stroke-width .18s ease}.q22s:hover .q22-ln,.q22s:focus .q22-ln{stroke-width:3.4}.q22s .q22-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q22s:hover .q22-pt,.q22s:focus .q22-pt{transform:scale(1.45)}.q22s .q22-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q22s:hover .q22-lbl,.q22s:focus .q22-lbl{opacity:1}</style><line x1="19.5" y1="96.5" x2="175.3" y2="96.5" stroke="#1f2530" stroke-width="1.6"/><polygon points="185.3,96.5 175.3,92 175.3,101" fill="#1f2530"/><line x1="26.5" y1="105.3" x2="26.5" y2="24.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="26.5,14.8 22,24.8 31,24.8" fill="#1f2530"/><path d="M 26.5,78.1 Q 96.5,41.4 166.5,29.1" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q22s" tabindex="0"><line x1="19.5" y1="74.4" x2="152.5" y2="27.9" stroke="transparent" stroke-width="14"/><line class="q22-ln" x1="19.5" y1="74.4" x2="152.5" y2="27.9" stroke="#4a7d3a" stroke-width="2"/><circle class="q22-pt" cx="26.5" cy="72" r="3" fill="#c8324a"/><circle class="q22-pt" cx="96.5" cy="47.5" r="3" fill="#c8324a"/><g class="q22-lbl" font-size="10.5" fill="#c8324a"><text x="30" y="90" text-anchor="start">(0, 0.7)</text><text x="103" y="64" text-anchor="start">(2, 1.4)</text></g></g><text x="61.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">1</text><text x="96.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="131.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="166.5" y="110.5" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="18.5" y="65.5" font-size="11" text-anchor="end" fill="#1f2530">1</text><text x="18.5" y="30.5" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="183" y="124" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan> (years)</text><text x="36" y="22" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan> (dm)</text></svg>

Point at or tap the tangent to show the coordinates of the points read off.
:::

::: handskrift
typ: tangentlutning
:::

::: textlosning
We need to find a rate of change at an instant. We draw a
tangent at the point on the curve where $x = 2$ and calculate its slope.

We read off two points on the tangent, for example $(0,\ 0.7)$ and
$(2,\ 1.4)$, and substitute them into the formula for $k$.

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{1.4 - 0.7}{2 - 0} = \frac{0.7}{2} = 0.35\ \text{dm/year}
$$

**Answer:** After 2 years the spruce seedling is growing by $0.35$ dm per year.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Tangent"
- A **tangent** is a straight line that just touches the curve at a point.
- The slope of the tangent is the slope of the curve at **exactly that point**.
- The secant gives the average slope over an interval, the tangent the slope at a single point.
:::

::: sampunkt "Calculating the slope"
- The same formula as for the secant: $k = \dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1}$.
- Read off **two points on the tangent**, not on the curve.
- Choose points that are far apart and on clear scale marks, so the reading is more reliable.
:::

::: sampunkt "Interpretation in applications"
- The slope of the tangent is **the rate of change at an instant**.
- The unit is the unit on the $y$-axis per the unit on the $x$-axis.
- The question "at what rate is it growing after 2 years" therefore concerns the tangent, not the secant.
:::

::: sampunkt "Method"
1. Draw a tangent at the point on the curve that the question concerns.
2. Read off two points on the tangent line.
3. Substitute into the formula for $k$ and answer with a unit.
:::

:::
