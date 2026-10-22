---
kalla: b6ff2cfe92
id: ma3c-6.3
title: Trigonometric equations
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.3'
---

# Trigonometric equations

Equations with the trigonometric functions sine, cosine and tangent
are called **trigonometric equations**.

::: formel "Solving trigonometric equations with the unit circle"
If we are to solve the equation

$$
\sin v = a
$$

we draw the line $y = a$ (horizontal) and read off the angles where the line crosses
the unit circle.

If we instead are to solve the equation

$$
\cos v = a
$$

we draw the line $x = a$ (vertical) and read off the angles where the line crosses
the unit circle (see the figures below).
:::

::: figur
<svg viewBox="12 4 250 242" width="365" height="354" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with a horizontal line at y = 0.5 that crosses the circle at two points. The angles measured anticlockwise from the positive x-axis are 30 degrees and 150 degrees."><circle cx="128" cy="128" r="88" fill="none" stroke="#2563c9" stroke-width="1.8"/><line x1="16" y1="128" x2="236" y2="128" stroke="#1f2530" stroke-width="1.4"/><polygon points="244,128 236,123.5 236,132.5" fill="#1f2530"/><line x1="128" y1="240" x2="128" y2="16" stroke="#1f2530" stroke-width="1.4"/><polygon points="128,8 123.5,16 132.5,16" fill="#1f2530"/><line x1="45" y1="84" x2="210" y2="84" stroke="#c8324a" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="128" y1="128" x2="204.2" y2="84" stroke="#1f2530" stroke-width="1.6"/><line x1="128" y1="128" x2="51.8" y2="84" stroke="#1f2530" stroke-width="1.6"/><path d="M154,128 A26,26 0 0 0 150.5,115" fill="none" stroke="#1f2530" stroke-width="1.4"/><path d="M86,128 A42,42 0 0 1 91.6,107" fill="none" stroke="#4a7d3a" stroke-width="1.4"/><circle cx="204.2" cy="84" r="3" fill="#c8324a"/><circle cx="51.8" cy="84" r="3" fill="#c8324a"/><text x="168.6" y="117" font-size="13" fill="#1f2530">30°</text><text x="72.0" y="113" font-size="13" text-anchor="end" fill="#4a7d3a">150°</text><text x="250" y="133" font-size="13" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="136" y="18" font-size="13" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="214" y="79" font-size="13" fill="#c8324a"><tspan font-style="italic">y</tspan> = 0.5</text></svg>

We solve $\sin v = 0.5$ by drawing a horizontal line at $y = 0.5$.
The line crosses the unit circle at two points, at $v_1 = 30^\circ$ and
$v_2 = 150^\circ$.
:::

::: figur
<svg viewBox="12 4 250 242" width="365" height="354" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The unit circle with a vertical line at x = 0.5 that crosses the circle at two points. The angles measured from the positive x-axis are 60 degrees and 300 degrees."><circle cx="128" cy="128" r="88" fill="none" stroke="#2563c9" stroke-width="1.8"/><line x1="16" y1="128" x2="236" y2="128" stroke="#1f2530" stroke-width="1.4"/><polygon points="244,128 236,123.5 236,132.5" fill="#1f2530"/><line x1="128" y1="240" x2="128" y2="16" stroke="#1f2530" stroke-width="1.4"/><polygon points="128,8 123.5,16 132.5,16" fill="#1f2530"/><line x1="172" y1="46" x2="172" y2="210" stroke="#c8324a" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="128" y1="128" x2="172" y2="51.8" stroke="#1f2530" stroke-width="1.6"/><line x1="128" y1="128" x2="172" y2="204.2" stroke="#1f2530" stroke-width="1.6"/><path d="M154,128 A26,26 0 0 0 141,105.5" fill="none" stroke="#1f2530" stroke-width="1.4"/><path d="M170,128 A42,42 0 0 1 149,164.4" fill="none" stroke="#4a7d3a" stroke-width="1.4"/><circle cx="172" cy="51.8" r="3" fill="#c8324a"/><circle cx="172" cy="204.2" r="3" fill="#c8324a"/><text x="164.4" y="103" font-size="13" fill="#1f2530">60°</text><text x="178.2" y="161" font-size="13" fill="#4a7d3a">300°</text><text x="250" y="133" font-size="13" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="136" y="18" font-size="13" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="178" y="34" font-size="13" fill="#c8324a"><tspan font-style="italic">x</tspan> = 0.5</text></svg>

We solve $\cos v = 0.5$ by drawing a vertical line at $x = 0.5$.
The line crosses the unit circle at two points, at $v_1 = 60^\circ$ and
$v_2 = 300^\circ$.
:::

Note that in the interval $0^\circ \leq v \leq 360^\circ$ we usually get
**two solutions**. In fact there are infinitely many solutions, since
we can add any number of multiples of $360^\circ$ to each
solution. At this level we usually keep to solutions in
the interval $0^\circ \leq v \leq 360^\circ$.

Since the radius of the unit circle is 1, neither $\sin v$ nor $\cos v$ can take
values outside the interval $[-1, 1]$. If $|a| > 1$ the line $y = a$
(or $x = a$) ends up completely outside the circle, and the equation then has no solution.

When we solve a trigonometric equation with a calculator, the calculator only gives the
smallest solution, $v_1$. To get the second solution $v_2$ in the interval
$0^\circ \leq v \leq 360^\circ$ we must work it out by hand. For sine,
$v_2 = 180^\circ - v_1$. For cosine, $v_2 = 360^\circ - v_1$.
Feel free to check against the examples above.

::: tips "Solving trigonometric equations with a calculator"
1. Solve for the trigonometric function.
2. Solve the equation as usual, with inverse functions.
3. Find the second solution. For an equation with
   - sine, $v_2 = 180^\circ - v_1$
   - cosine, $v_2 = 360^\circ - v_1$
:::

::: exempel "Example 1: Sine and cosine for angles on the unit circle"
**Use the unit circle to determine<br>a)&nbsp;$\sin 90^\circ$&emsp;&emsp;b)&nbsp;$\cos 180^\circ$.**

::: handskrift
typ: enhetscirkelvarden
:::

::: textlosning
**a)** We start from the positive $x$-axis and rotate $90^\circ$ anticlockwise.
Then we end up at the top of the unit circle, at the point $(0, 1)$. Sine
corresponds to the $y$-coordinate, so

$$
\sin 90^\circ = 1
$$

**Answer:** 1

**b)** We instead rotate $180^\circ$ anticlockwise and then end up furthest to
the left on the unit circle, at the point $(-1, 0)$. Cosine corresponds to
the $x$-coordinate, so

$$
\cos 180^\circ = -1
$$

**Answer:** $-1$
:::
:::

::: exempel "Example 2: Approximations with the unit circle"
**Use the unit circle to determine an approximation of<br>a)&nbsp;$\sin 45^\circ$&emsp;&emsp;b)&nbsp;$\cos 220^\circ$.**

::: handskrift
typ: enhetscirkelnarme
:::

::: textlosning
**a)** We put a point on the edge of the unit circle at $45^\circ$. $\sin 45^\circ$ corresponds to the $y$-coordinate here, and read off against the $y$-axis this gives
about 0.7.

**Answer:** 0.7

**b)** We put a point on the edge of the unit circle at $220^\circ$. $\cos 220^\circ$ corresponds to the $x$-coordinate here, and read off against the $x$-axis this gives
about $-0.8$.

**Answer:** $-0.8$
:::
:::

::: exempel "Example 3: Solve trigonometric equations with the unit circle"
**Use the unit circle to solve the equations below in the interval
$0^\circ \leq v \leq 360^\circ$.<br>a)&nbsp;$\sin v = 0.4$&emsp;&emsp;b)&nbsp;$\cos v = 1.5$**

::: handskrift
typ: enhetscirkelekv
:::

::: textlosning
**a)** Since sine corresponds to the $y$-coordinate, we draw a horizontal line at
$y = 0.4$. The line crosses the unit circle at about $24^\circ$ and
$156^\circ$.

**Answer:** $v \approx 24^\circ$ and $v \approx 156^\circ$

**b)** Since cosine corresponds to the $x$-coordinate, we draw a vertical line
at $x = 1.5$. The line ends up completely outside the unit circle (the radius is only
1, after all), so the equation has no solution.

**Answer:** There is no solution.
:::
:::

::: exempel "Example 4: Solve a trigonometric equation with a calculator"
**Solve the equation $4\cos v + 3.28 = 6.58$ with a calculator. Give the solutions in
the interval $0^\circ \leq v \leq 360^\circ$.**

::: handskrift
typ: raknarekvation
:::

::: textlosning
We first solve for the trigonometric function $\cos v$.

$$
4\cos v + 3.28 - 3.28 = 6.58 - 3.28
$$

$$
4\cos v = 3.3
$$

$$
\frac{4\cos v}{4} = \frac{3.3}{4}
$$

$$
\cos v = 0.825
$$

Then we determine the angle $v$ with the inverse function.

$$
v_1 = \cos^{-1}(0.825) = 34.411\ldots^\circ \approx 34.4^\circ
$$

We get the second solution from the relationship $\cos(360^\circ - v) = \cos v$,
that is, by subtracting the angle from $360^\circ$.

$$
v_2 = 360^\circ - 34.411\ldots^\circ = 325.588\ldots^\circ \approx 325.6^\circ
$$

**Answer:** $v_1 = 34.4^\circ$ and $v_2 = 325.6^\circ$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Trigonometric equation"
- An equation with sine, cosine or tangent is called a **trigonometric equation**.
- In the interval $0^\circ \leq v \leq 360^\circ$ there are usually **two** solutions.
- In fact there are infinitely many, since whole turns can be added.
:::

::: sampunkt "Solving with the unit circle"
- $\sin v = a$: draw a **horizontal** line at $y = a$ and read off the intersections.
- $\cos v = a$: draw a **vertical** line at $x = a$.
- If $|a| > 1$, the line ends up outside the circle and the equation **has no solution**.
:::

::: sampunkt "Solving with a calculator"
1. Solve for the trigonometric function.
2. Use the inverse function. The calculator only gives the smallest solution $v_1$.
3. Work out the second solution yourself.
- Sine: $v_2 = 180^\circ - v_1$. Cosine: $v_2 = 360^\circ - v_1$.
:::

::: sampunkt "Typical example"
- $4\cos v + 3.28 = 6.58$ gives $\cos v = 0.825$.
- $v_1 = \cos^{-1}(0.825) \approx 34.4^\circ$ and $v_2 = 360^\circ - 34.4^\circ \approx 325.6^\circ$.
- Always check that the solutions lie within the interval asked for.
:::

:::
