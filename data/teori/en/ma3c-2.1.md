---
kalla: eb95b813e3
id: ma3c-2.1
title: The slope of the secant
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.1'
---

# The slope of the secant

A straight line has the same slope everywhere. The slope of a curve, on the other hand, can
vary. The **average slope** of a curve in a particular interval can be calculated
by drawing a straight line between the points at the endpoints of the interval. A
line between two points on a curve is called a **secant**.

The slope of the secant (the **gradient**, the **difference quotient** or the
***k*-value**) is calculated in the same way as for any straight line. We
read off two points on the line, $(x_1, y_1)$ and $(x_2, y_2)$, and substitute
the coordinates into the formula for the gradient $k$.

::: formel "The gradient"
$$
k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$
:::

::: formel "Interpreting the slope of the secant in applications"
In applications the slope of the secant represents an **average
rate of change**. Since $k = \dfrac{\Delta y}{\Delta x}$, it follows
that the unit of the slope of the secant in applications is "the unit on
the $y$-axis" per "the unit on the $x$-axis".
:::

We apply this in two examples.

::: exempel "Example 1: The slope of the secant as a rate of change"
**A spruce seedling has the height $y$ dm after $x$ years according to the diagram
below.<br>a) Calculate the slope of the secant between $x = 0$ and $x = 2$.
<br>b) Interpret the answer to a) in words.**

::: figur
<svg viewBox="14 30 216 161" width="316" height="235" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Diagram showing the height y dm of the spruce seedling after x years: a growth curve with a secant through the points where x equals 0 and x equals 2. Point at or tap the secant to show the coordinates of the points read off." style="overflow:visible"><style>.q21s{cursor:pointer;outline:none}.q21s .q21-ln{transition:stroke-width .18s ease}.q21s:hover .q21-ln,.q21s:focus .q21-ln{stroke-width:3.4}.q21s .q21-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q21s:hover .q21-pt,.q21s:focus .q21-pt{transform:scale(1.4)}.q21s .q21-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q21s:hover .q21-lbl,.q21s:focus .q21-lbl{opacity:1}</style><line x1="96" y1="170" x2="96" y2="45" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="152" y1="170" x2="152" y2="45" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="208" y1="170" x2="208" y2="45" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="142" x2="218" y2="142" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="114" x2="218" y2="114" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="86" x2="218" y2="86" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="58" x2="218" y2="58" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="170" x2="218" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="226,170 216,165.5 216,174.5" fill="#1f2530"/><line x1="40" y1="170" x2="40" y2="45" stroke="#1f2530" stroke-width="1.6"/><polygon points="40,37 35.5,47 44.5,47" fill="#1f2530"/><text x="224" y="158" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan> (years)</text><text x="48" y="44" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan> (dm)</text><text x="96" y="184" font-size="11" text-anchor="middle" fill="#1f2530">1</text><text x="152" y="184" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="208" y="184" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="32" y="146" font-size="11" text-anchor="end" fill="#1f2530">0.5</text><text x="32" y="118" font-size="11" text-anchor="end" fill="#1f2530">1</text><text x="32" y="90" font-size="11" text-anchor="end" fill="#1f2530">1.5</text><text x="32" y="62" font-size="11" text-anchor="end" fill="#1f2530">2</text><polyline points="40,170 45.6,152.3 54,142 68,130.4 96,114 124,101.4 152,90.8 180,81.5 208,73" fill="none" stroke="#2563c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><g class="q21s" tabindex="0"><line x1="40" y1="170" x2="196" y2="59.7" stroke="transparent" stroke-width="14"/><line class="q21-ln" x1="40" y1="170" x2="196" y2="59.7" stroke="#c8324a" stroke-width="2"/><circle class="q21-pt" cx="40" cy="170" r="3.5" fill="#c8324a"/><circle class="q21-pt" cx="152" cy="90.8" r="3.5" fill="#c8324a"/><g class="q21-lbl" font-size="11" fill="#c8324a"><text x="44" y="183" text-anchor="start">(0, 0)</text><rect x="100" y="73" width="50" height="14" rx="4" fill="#f3eee4"/><text x="146" y="84" text-anchor="end">(2, 1.4)</text></g></g></svg>

Point at or tap the secant to show the coordinates of the points read off.
:::

::: handskrift
typ: sekantlutning
:::

::: textlosning
**a)** We draw a secant between the points on the graph where $x = 0$ and
$x = 2$ and read off their coordinates: $(0, 0)$ and $(2, 1.4)$. We substitute
the coordinates into the formula for the gradient $k$.

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{1.4 - 0}{2 - 0} = \frac{1.4}{2} = 0.7
$$

**Answer:** $k = 0.7$

**b)** The slope of the secant represents how much the spruce has grown on average
per year during the first two years. The unit on the $y$-axis is dm and the unit
on the $x$-axis is years, so the unit of the $k$-value is dm per year.

**Answer:** The spruce has grown by $0.7\ \text{dm/year}$ on average during the first two
years.
:::
:::

::: exempel "Example 2: The difference quotient for a quadratic function"
**Calculate the difference quotient between $x = 3$ and $x = 5$ for $f(x) = x^2$.**

::: handskrift
typ: andringskvot
:::

::: textlosning
The difference quotient is the same as the slope of the secant. We set up the formula
for the gradient and substitute values. Remember that
the function value $f(x)$ represents a $y$-coordinate.

$$
k = \frac{f(x_2) - f(x_1)}{x_2 - x_1} = \frac{f(5) - f(3)}{5 - 3} = \frac{5^2 - 3^2}{5 - 3} = \frac{25 - 9}{2} = \frac{16}{2} = 8
$$

**Answer:** $k = 8$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Secant"
- A straight line has the same slope everywhere, a curve can have different slopes at different points.
- A **secant** is a straight line between two points on the curve.
- The slope of the secant is the **average slope** of the curve in the interval between the points.
:::

::: sampunkt "The gradient"
- $k = \dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.
- The same thing is also called the **difference quotient** or the *k*-value.
- The function value $f(x)$ is a $y$-coordinate.
:::

::: sampunkt "Interpretation in applications"
- The slope of the secant is an **average rate of change**.
- The unit is the unit on the $y$-axis per the unit on the $x$-axis.
- Height in dm against time in years therefore gives dm per year.
:::

::: sampunkt "Method"
1. Read off or calculate the points at the endpoints of the interval.
2. Substitute into the formula for $k$.
3. Interpret the answer with the correct unit and in the context of the task.
- For $f(x) = x^2$ between $x = 3$ and $x = 5$: $k = \dfrac{25 - 9}{5 - 3} = 8$.
:::

:::
