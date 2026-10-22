---
kalla: ef42aec5b5
id: ma3c-5.3
title: The area under a curve
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.3'
---

# The area under a curve

We already know how to calculate the area of simple geometric figures,
such as rectangles and triangles. But how do we calculate the area under the graph of
an arbitrary function, an area that often has a curved, irregular boundary?
Consider the area under the graph of a function $f(x)$ between $x = a$ and
$x = b$. We draw the graph and mark the region we are looking for, see
the figure below.

::: figur
<svg viewBox="30 0 258 200" width="377" height="292" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function f of x with the shaded exact region under the curve between x equals a and x equals b, and four rectangles that approximate the area under the curve. Point at or tap the rectangles to highlight them and show the area of one rectangle." style="overflow:visible"><style>.q53s{cursor:pointer;outline:none}.q53s .q53-rk{transition:transform .18s ease}.q53s .q53-rk rect{transition:fill .18s ease}.q53s:hover .q53-rk,.q53s:focus .q53-rk{transform:translate(0,-3px)}.q53s:hover .q53-rk rect,.q53s:focus .q53-rk rect{fill:rgba(200,50,74,0.34)}.q53s .q53-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53s:hover .q53-lbl,.q53s:focus .q53-lbl{opacity:1}</style><line x1="34" y1="168" x2="272" y2="168" stroke="#1f2530" stroke-width="1.6"/><polygon points="282,168 272,163.5 272,172.5" fill="#1f2530"/><line x1="42" y1="178" x2="42" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="42,4 37.5,14 46.5,14" fill="#1f2530"/><text x="277" y="190" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="50" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><polygon points="90,168 90,148.5 102,144.9 122,137.2 142,127.3 162,115.2 182,100.9 202,84.4 218,69.6 218,168" fill="rgba(37,99,201,0.16)"/><g class="q53s" tabindex="0"><g class="q53-rk"><rect x="90" y="137.2" width="32" height="30.8" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="122" y="120.3" width="32" height="47.7" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="154" y="97.8" width="32" height="70.2" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="186" y="69.6" width="32" height="98.4" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/></g><g class="q53-lbl"><text x="60" y="38" font-size="12" fill="#c8324a"><tspan font-style="italic">A</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) &#8901; &#916;<tspan font-style="italic">x</tspan></text></g></g><path d="M 42,154.8 C 45.33,154.62 55.33,154.43 62,153.7 C 68.67,152.97 75.33,151.87 82,150.4 C 88.67,148.93 95.33,147.1 102,144.9 C 108.67,142.7 115.33,140.13 122,137.2 C 128.67,134.27 135.33,130.97 142,127.3 C 148.67,123.63 155.33,119.6 162,115.2 C 168.67,110.8 175.33,106.03 182,100.9 C 188.67,95.77 195.33,90.27 202,84.4 C 208.67,78.53 215.33,72.3 222,65.7 C 228.67,59.1 235.33,52.13 242,44.8 C 248.67,37.47 258.67,25.55 262,21.7" fill="none" stroke="#2563c9" stroke-width="2"/><text x="230" y="35" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="90" y1="164" x2="90" y2="172" stroke="#1f2530" stroke-width="1.3"/><line x1="218" y1="164" x2="218" y2="172" stroke="#1f2530" stroke-width="1.3"/><text x="90" y="183" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="218" y="183" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><line x1="154" y1="173" x2="186" y2="173" stroke="#1f2530" stroke-width="1.2"/><line x1="154" y1="170" x2="154" y2="176" stroke="#1f2530" stroke-width="1.2"/><line x1="186" y1="170" x2="186" y2="176" stroke="#1f2530" stroke-width="1.2"/><text x="170" y="188" font-size="12" text-anchor="middle" fill="#1f2530">&#916;<tspan font-style="italic">x</tspan></text></svg>

Point at or tap the rectangles to show the area of one rectangle.
:::

::: härledning "Derivation: from rectangles to an integral"
We can **approximate** (get an approximate value of) the area by dividing
the region under the graph into rectangles, sometimes called **columns**, and
adding their areas together. The more and narrower rectangles we divide
the region into, the better the total area of the rectangles agrees with the
actual area under the curve: the rectangles "stick out" less and less from
the graph, as in the figure above.

The area $A$ of a single rectangle is the height times the width. If
the rectangle has the width $\Delta x$ and a height given by the function value
$f(x)$, the area can be written

$$
A = \text{height} \cdot \text{width} = f(x) \cdot \Delta x
$$

If we add up a finite number of such rectangle areas from $x = a$ to
$x = b$, the total (approximate) area can be written with
the summation sign, the capital Greek letter sigma, $\Sigma$, as

$$
A \approx \sum_{x=a}^{b} f(x) \cdot \Delta x \qquad (1)
$$

However, this only gives an approximate value of the area. We have established that
the narrower the width $\Delta x$ of the rectangles, the more exact the area becomes.
So how do we get the exact area?

We let $\Delta x$ tend to 0! When $\Delta x$ tends to zero we write it
$dx$ instead. We now have to add up an **infinite** number of infinitely narrow
rectangle areas. When we add up an infinite number of terms, the
summation sign $\Sigma$ is replaced by the **integral sign** $\int$ (an elongated
"s"), but the symbol still stands for the same thing: a sum.

If we make these replacements in formula (1) above, we get the exact area

$$
A = \int_a^b f(x)\, dx
$$

This expression is called an **integral**. Since this integral has a
lower limit $a$ and an upper limit $b$, it is called a **definite integral**.
:::

::: tips "Definite integral"
$$
\int_a^b f(x)\, dx
$$

where

- $\int$ = **integral sign** (the summation sign for infinitely many terms)
- $a$ = **lower limit of integration** (graphically, the $x$-value where the area
  starts)
- $b$ = **upper limit of integration** (graphically, the $x$-value where the area
  ends)
- $f(x)$ = **integrand** (graphically, the function we are to calculate the area
  under)
- $dx$ = **variable of integration** (graphically, the infinitely narrow width
  of a rectangle)

So graphically a definite integral corresponds to the area between the graph of a
function and the $x$-axis, bounded by $x = a$ and $x = b$.
:::

::: formel "Areas below the *x*-axis"
A definite integral can have a **negative value**, namely if the area
under the graph lies **below** the $x$-axis. An area, on the other hand, can never be
negative. So if the region lies below the $x$-axis, the value of the integral is equal
to the area, but with the opposite (negative) sign.
:::

::: exempel "Example 1: Describe a shaded area with an integral"
**The graph of $f(x) = 0.5x^2 + 1$ is drawn in a coordinate system. The
shaded region is bounded by the graph, the $x$-axis, the line $x = 1$ and
the line $x = 4$. Describe the area of the shaded region with an integral.**

::: handskrift
typ: areaintegral
:::

::: textlosning
The area starts at $x = 1$ and ends at $x = 4$, so the lower
limit of integration is $1$ and the upper is $4$. The function of the graph is
$f(x) = 0.5x^2 + 1$, which is the integrand. So the area is given by

$$
\int_1^4 (0.5x^2 + 1)\, dx
$$

**Answer:** $\displaystyle\int_1^4 (0.5x^2 + 1)\, dx$
:::
:::

## Calculating the area from a graph

::: exempel "Example 2: Calculate an area and an integral from a graph"
**The graph of the straight line $f(x) = 0.5x + 2$ is drawn in a
coordinate system. Together with the $x$-axis, the line $x = 2$ and the line
$x = 6$, the graph forms a shaded region.<br>
a) Calculate the shaded area.<br>b) Calculate
$\displaystyle\int_2^6 (0.5x + 2)\, dx$ from the graph.**

::: handskrift
typ: areageometriskt
:::

::: textlosning
**a)** We divide the shaded region into a rectangle and a triangle,
both with the base $4$ (the distance between $x = 2$ and $x = 6$). The height of the
rectangle is given by the lowest function value, $f(2) = 0.5 \cdot 2 + 2 = 3$.
The height of the triangle is given by the **difference** between the highest and the lowest
function value: $f(6) - f(2) = (0.5 \cdot 6 + 2) - 3 = 5 - 3 = 2$.

$$
A = \text{rectangle area} + \text{triangle area} = 4 \cdot 3 + \frac{4 \cdot 2}{2} = 12 + 4 = 16
$$

**Answer:** $16$ a.u.

**b)** The integral corresponds to the area under the graph between $x = 2$ and
$x = 6$, that is, the same area as in part a. So the value of the integral
is $16$ (note that integrals, unlike areas, are not
given with a unit).

**Answer:** $16$
:::
:::

::: exempel "Example 3: An integral with a negative value"
**The graph of $f(x) = 1 - x$ is drawn in a coordinate system. Together
with the $x$-axis and the line $x = 6$, the graph forms a shaded region between
$x = 1$ and $x = 6$. Determine<br>
a) the shaded area&emsp;&emsp;b)&nbsp;$\displaystyle\int_1^6 (1 - x)\, dx$.**

::: handskrift
typ: negativintegral
:::

::: textlosning
**a)** The region is a triangle. The graph crosses the $x$-axis at $x = 1$ (since
$f(1) = 1 - 1 = 0$), so the base of the triangle stretches from $x = 1$ to
$x = 6$ and is $5$ length units. The height is given by the absolute value
$|f(6)| = |1 - 6| = 5$ length units.

$$
\text{Area} = \frac{\text{base} \cdot \text{height}}{2} = \frac{5 \cdot 5}{2} = 12.5
$$

**Answer:** $12.5$ a.u.

**b)** The integral corresponds to the same region, but since the region lies
**below** the $x$-axis, the value of the integral is negative. Unlike in
part a, the answer is not given in area units, since it is
the value of the integral (not an area) that is asked for.

**Answer:** $-12.5$
:::
:::

## Deciding the sign of an integral

::: exempel "Example 4: Decide whether an integral is positive or negative"
**Together with the $x$-axis, the graph of $f(x)$ divides a region into two
parts between $x = a$ and $x = b$: part $A$ lies above the $x$-axis and
part $B$ lies below the $x$-axis. Part $B$ is larger than part $A$. Decide whether
$\displaystyle\int_a^b f(x)\, dx$ is positive or negative. Justify your
answer.**

::: handskrift
typ: integraltecken
:::

::: textlosning
The area below the $x$-axis (part $B$) contributes a negative value to
the integral, while the area above the $x$-axis (part $A$) contributes a
positive value. Since part $B$ is larger than part $A$, the negative
contribution is larger than the positive one, so the total value of the integral is
negative.

**Answer:** Negative
:::
:::

::: sammanfattning "Summary"

::: sampunkt "From rectangles to an integral"
- The area under a curve can be **approximated** with rectangles of width $\Delta x$ and height $f(x)$.
- The narrower the rectangles, the better the sum agrees with the actual area.
- If $\Delta x$ is allowed to tend to 0, the width is written $dx$, and the summation sign $\Sigma$ is replaced by the integral sign $\int$.
:::

::: sampunkt "Definite integral"
- $\int_a^b f(x)\, dx$ is called a **definite integral**.
- $\int$ is the integral sign, $a$ the **lower** and $b$ the **upper limit of integration**.
- $f(x)$ is the **integrand** and $dx$ the **variable of integration**.
- Graphically: the area between the graph and the $x$-axis between $x = a$ and $x = b$.
:::

::: sampunkt "Sign"
- If the region lies **below** the $x$-axis, the value of the integral is **negative**.
- An area can never be negative. The area is then the value of the integral without the minus sign.
- If parts lie on both sides, the contributions cancel each other out. The largest part decides the sign.
:::

::: sampunkt "Calculating from a graph"
- If the graph is a straight line: divide the region into rectangles and triangles and add them up.
- Areas are given in area units, a.u. An integral value is given **without** a unit.
- Check that the limits really are the $x$-values of the region.
:::

:::
