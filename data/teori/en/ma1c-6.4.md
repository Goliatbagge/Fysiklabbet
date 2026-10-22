---
kalla: 5af99e0975
id: ma1c-6.4
title: Finding distances and angles in coordinate systems
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.4'
---

# Finding distances and angles in coordinate systems

Remember: If two sides are known in a right-angled triangle, we can find
the third with **Pythagoras' theorem**.

::: formel "Pythagoras' theorem"
::: figur
<svg viewBox="36 32 212 124" width="288" height="168" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the legs a and b and the hypotenuse c."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

$$
a^2 + b^2 = c^2
$$

or

$$
\text{leg}^2 + \text{leg}^2 = \text{hypotenuse}^2
$$
:::

If we are to find a distance or an angle between two points in a
coordinate system, we form a right-angled triangle with vertices at two of
the points. The distance corresponds to the hypotenuse, which is calculated with Pythagoras'
theorem. The angle is calculated with trigonometry.

::: exempel "Example 1: Distance and angle in the coordinate system"
**A line segment is drawn between the points (−2, 1) and (2, 4). Find<br>a) the length of the segment&emsp;&emsp;b) the angle between the segment and the *x*-axis.**

::: handskrift
typ: strackavinkel
:::

::: textlosning
**a)** We begin by drawing the points in a coordinate system and
draw the segment between them:

::: figur
<svg viewBox="-26 -20 352 217" width="478" height="295" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A coordinate system with the points minus 2 comma 1 and 2 comma 4 marked and a blue line segment drawn between them."><line x1="15.6" y1="0.0" x2="15.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="41.6" y1="0.0" x2="41.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.6" y1="0.0" x2="67.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.6" y1="0.0" x2="93.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="119.6" y1="0.0" x2="119.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.6" y1="0.0" x2="145.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="171.6" y1="0.0" x2="171.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="197.6" y1="0.0" x2="197.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="223.6" y1="0.0" x2="223.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="249.6" y1="0.0" x2="249.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="275.6" y1="0.0" x2="275.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="301.6" y1="0.0" x2="301.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="304.2" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="304.2" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="304.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="304.2" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="304.2" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="304.2" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="304.2" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="312.2" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="320.2,145.6 310.2,141.1 310.2,150.1" fill="#1f2530"/><line x1="145.6" y1="187.2" x2="145.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="145.6,-16.0 141.1,-6.0 150.1,-6.0" fill="#1f2530"/><text x="318.2" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="154.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="15.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><text x="41.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="67.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="93.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="119.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="171.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="197.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="223.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="249.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="275.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="301.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="139.6" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="139.6" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="139.6" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="139.6" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="139.6" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="139.6" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="93.6" y1="119.6" x2="197.6" y2="41.6" stroke="#2563c9" stroke-width="2"/><circle cx="93.6" cy="119.6" r="4" fill="#4a7d3a"/><circle cx="197.6" cy="41.6" r="4" fill="#2563c9"/></svg>
:::

We now form a right-angled triangle as in the figure below:

::: figur
<svg viewBox="-26 -20 352 217" width="478" height="295" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same coordinate system where a right-angled triangle has been formed with dashed legs: a horizontal one of 4 squares and a vertical one of 3 squares. The segment is the hypotenuse."><line x1="15.6" y1="0.0" x2="15.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="41.6" y1="0.0" x2="41.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.6" y1="0.0" x2="67.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.6" y1="0.0" x2="93.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="119.6" y1="0.0" x2="119.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.6" y1="0.0" x2="145.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="171.6" y1="0.0" x2="171.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="197.6" y1="0.0" x2="197.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="223.6" y1="0.0" x2="223.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="249.6" y1="0.0" x2="249.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="275.6" y1="0.0" x2="275.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="301.6" y1="0.0" x2="301.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="304.2" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="304.2" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="304.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="304.2" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="304.2" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="304.2" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="304.2" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="312.2" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="320.2,145.6 310.2,141.1 310.2,150.1" fill="#1f2530"/><line x1="145.6" y1="187.2" x2="145.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="145.6,-16.0 141.1,-6.0 150.1,-6.0" fill="#1f2530"/><text x="318.2" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="154.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="15.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><text x="41.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="67.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="93.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="119.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="171.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="197.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="223.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="249.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="275.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="301.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="139.6" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="139.6" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="139.6" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="139.6" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="139.6" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="139.6" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="93.6" y1="119.6" x2="197.6" y2="41.6" stroke="#2563c9" stroke-width="2"/><circle cx="93.6" cy="119.6" r="4" fill="#4a7d3a"/><circle cx="197.6" cy="41.6" r="4" fill="#2563c9"/><line x1="93.6" y1="119.6" x2="197.6" y2="119.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="197.6" y1="119.6" x2="197.6" y2="41.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="185.6" y="107.6" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/></svg>
:::

We look at the scale and see that each square corresponds to 1 l.u.
(length unit). We count squares and see that one leg (the base) is
4 l.u. and the other leg (the height) is 3 l.u. We now find the distance
$c$ with Pythagoras' theorem, $c^2 = a^2 + b^2$.

Substituting $a = 4$ and $b = 3$ gives

$$
c^2 = 4^2 + 3^2
$$

$$
c^2 = 16 + 9
$$

$$
c^2 = 25
$$

$$
c = \pm\sqrt{25} = \pm 5
$$

Since a distance cannot be negative, we disregard the negative
solution.

**Answer:** 5 l.u.

**b)** We study the right-angled triangle again and mark
the angle $v$ between the segment and the *x*-axis (or any horizontal line;
it is simplest to choose the base of the triangle):

::: figur
<svg viewBox="-26 -20 352 217" width="478" height="295" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same figure where the angle v between the segment and the horizontal leg is marked with an angle arc at the left-hand point."><line x1="15.6" y1="0.0" x2="15.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="41.6" y1="0.0" x2="41.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.6" y1="0.0" x2="67.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="93.6" y1="0.0" x2="93.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="119.6" y1="0.0" x2="119.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="145.6" y1="0.0" x2="145.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="171.6" y1="0.0" x2="171.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="197.6" y1="0.0" x2="197.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="223.6" y1="0.0" x2="223.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="249.6" y1="0.0" x2="249.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="275.6" y1="0.0" x2="275.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="301.6" y1="0.0" x2="301.6" y2="187.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="171.6" x2="304.2" y2="171.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="304.2" y2="145.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="119.6" x2="304.2" y2="119.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="93.6" x2="304.2" y2="93.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.6" x2="304.2" y2="67.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="41.6" x2="304.2" y2="41.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="15.6" x2="304.2" y2="15.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="145.6" x2="312.2" y2="145.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="320.2,145.6 310.2,141.1 310.2,150.1" fill="#1f2530"/><line x1="145.6" y1="187.2" x2="145.6" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="145.6,-16.0 141.1,-6.0 150.1,-6.0" fill="#1f2530"/><text x="318.2" y="163.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="154.6" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="15.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><text x="41.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="67.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="93.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="119.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="171.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="197.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="223.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="249.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="275.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="301.6" y="161.6" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="139.6" y="175.6" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="139.6" y="123.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="139.6" y="97.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="139.6" y="71.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="139.6" y="45.6" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="139.6" y="19.6" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="93.6" y1="119.6" x2="197.6" y2="41.6" stroke="#2563c9" stroke-width="2"/><circle cx="93.6" cy="119.6" r="4" fill="#4a7d3a"/><circle cx="197.6" cy="41.6" r="4" fill="#2563c9"/><line x1="93.6" y1="119.6" x2="197.6" y2="119.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="197.6" y1="119.6" x2="197.6" y2="41.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><rect x="185.6" y="107.6" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/><path d="M115.6,119.6 A22,22 0 0 0 111.2,106.4" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="119.6" y="113.6" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

We have the *opposite side* (3 l.u.) and the *adjacent side*
(4 l.u.) for the angle $v$. We can then calculate the angle with the *tangent*,
since tan $v$ = opposite side/adjacent side.

Substituting opposite side = 3 and adjacent side = 4 gives

$$
\tan v = \frac{3}{4}
$$

$$
v = \tan^{-1}\left(\frac{3}{4}\right) = 36.869\ldots\degree \approx 37\degree
$$

**Answer:** 37°
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Pythagoras' theorem"
- $a^2 + b^2 = c^2$, that is
  $\text{leg}^2 + \text{leg}^2 = \text{hypotenuse}^2$.
- Used when **two sides** are known and the third is sought.
:::

::: sampunkt "Distance between two points"
1. Form a right-angled triangle with legs along the axes.
2. The lengths of the legs are the **differences** in the $x$-direction and the $y$-direction.
3. The distance is the hypotenuse:
   $\sqrt{(\Delta x)^2 + (\Delta y)^2}$.
- The signs do not matter, since the numbers are squared.
:::

::: sampunkt "The angle to the x-axis"
- Use $\tan v = \dfrac{\Delta y}{\Delta x}$ and then
  $\tan^{-1}$.
- Always draw the figure first. Then you can see directly which leg is
  the opposite one.
:::
:::
