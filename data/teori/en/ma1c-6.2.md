---
kalla: e74e93d645
id: ma1c-6.2
title: Sine and cosine
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.2'
---

# Sine and cosine

Remember from the previous lesson:

::: formel "Trigonometric functions"
$$
\tan v = \frac{\text{opposite side}}{\text{adjacent side}} = \frac{a}{b}
$$

$$
\sin v = \frac{\text{opposite side}}{\text{hypotenuse}} = \frac{a}{c}
$$

$$
\cos v = \frac{\text{adjacent side}}{\text{hypotenuse}} = \frac{b}{c}
$$
:::

Since the hypotenuse is, by definition, always longer than the legs,
sin $v$ and cos $v$ will always be numbers that are less than 1. This is
because we divide the length of a leg (a smaller number) by the length
of the hypotenuse (a larger number).

::: exempel "Example 1: Sine and cosine from the sides"
**For the triangle below, calculate<br>a) sin $u$&emsp;&emsp;b) cos $u$&emsp;&emsp;c) sin $v$&emsp;&emsp;d) cos $v$**

::: figur
<svg viewBox="34 22 226 152" width="330" height="222" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the legs 3 and 4 centimetres and the hypotenuse 5 centimetres. The angle u is at the top and the angle v at the bottom right."><polygon points="90,30 90,150 250,150" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,138.0 102.0,138.0 102.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M106.0,42.0 A20,20 0 0 1 90.0,50.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M228.0,150.0 A22,22 0 0 1 232.4,136.8" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="104" y="58" font-size="13" fill="#1f2530"><tspan font-style="italic">u</tspan></text><text x="212" y="142" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="78" y="95" font-size="13" text-anchor="end" fill="#1f2530">3 cm</text><text x="170" y="168" font-size="13" text-anchor="middle" fill="#1f2530">4 cm</text><text x="182" y="80" font-size="13" fill="#1f2530">5 cm</text></svg>
:::

::: handskrift
typ: sincossidor
:::

::: textlosning
**a)** We are to look at the ratio between the opposite side for the angle
$u$ and the hypotenuse:

$$
\sin u = \frac{\text{opposite side}}{\text{hypotenuse}} = \frac{4}{5} = 0.8
$$

**Answer:** $\dfrac{4}{5}$ or 0.8

**b)** The adjacent side for $u$ divided by the hypotenuse:

$$
\cos u = \frac{\text{adjacent side}}{\text{hypotenuse}} = \frac{3}{5} = 0.6
$$

**Answer:** $\dfrac{3}{5}$ or 0.6

**c)** The opposite side for $v$ divided by the hypotenuse:

$$
\sin v = \frac{\text{opposite side}}{\text{hypotenuse}} = \frac{3}{5} = 0.6
$$

**Answer:** $\dfrac{3}{5}$ or 0.6

**d)** The adjacent side for $v$ divided by the hypotenuse:

$$
\cos v = \frac{\text{adjacent side}}{\text{hypotenuse}} = \frac{4}{5} = 0.8
$$

**Answer:** $\dfrac{4}{5}$ or 0.8
:::
:::

::: exempel "Example 2: Find the hypotenuse"
**Find the length of the side $a$. The figure is not to scale.**

::: figur
<svg viewBox="22 20 280 160" width="380" height="217" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg 6.1 centimetres, the angle 41 degrees at the bottom right and the unknown hypotenuse a."><polygon points="80,28 80,160 290,160" fill="#b5d68f" stroke="#1f2530" stroke-width="1.5"/><polyline points="80.0,148.0 92.0,148.0 92.0,160.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M264.0,160.0 A26,26 0 0 1 268.0,146.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="244" y="152" font-size="12" text-anchor="end" fill="#1f2530">41°</text><text x="68" y="100" font-size="13" text-anchor="end" fill="#1f2530">6.1 cm</text><text x="192" y="82" font-size="14" fill="#1f2530"><tspan font-style="italic">a</tspan></text></svg>
:::

::: handskrift
typ: hypotenusan
:::

::: textlosning
We have an angle (41°) and its *opposite side*. We are to calculate
the *hypotenuse* $a$. Then we need a trigonometric function that
contains the opposite side and the hypotenuse. Which one is that? Sine, of course! So
we use the sine of the angle:

$$
\sin 41\degree = \frac{6.1}{a}
$$

$$
a = \frac{6.1}{\sin 41\degree} = 9.297\ldots \approx 9.3\ \mathrm{cm}
$$

**Answer:** 9.3 cm
:::
:::

::: exempel "Example 3: The area of the triangle"
**Calculate the area of the triangle below.**

::: figur
<svg viewBox="58 14 186 178" width="272" height="260" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A triangle without a right angle. The side sloping up to the right is 14, the base is 12 and the angle between them is 42 degrees."><polygon points="95,22 70,165 230,165" fill="none" stroke="#1f2530" stroke-width="1.5"/><path d="M204.0,165.0 A26,26 0 0 1 212.2,146.1" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="196" y="157" font-size="12" text-anchor="end" fill="#1f2530">42°</text><text x="172" y="86" font-size="13" fill="#1f2530">14</text><text x="150" y="183" font-size="13" text-anchor="middle" fill="#1f2530">12</text></svg>
:::

::: handskrift
typ: triangelarea
:::

::: textlosning
The area of a triangle is

$$
A = \frac{\text{base} \cdot \text{height}}{2} = \frac{b \cdot h}{2}
$$

Since the triangle is not right-angled, none of the sides is the height. So we
need to calculate the height $h$. We choose the side 12 as the base and draw
the height of the triangle:

::: figur
<svg viewBox="58 14 186 178" width="272" height="260" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same triangle where the height h is drawn as a dashed vertical line from the top down to the base."><polygon points="95,22 70,165 230,165" fill="none" stroke="#1f2530" stroke-width="1.5"/><path d="M204.0,165.0 A26,26 0 0 1 212.2,146.1" fill="none" stroke="#1f2530" stroke-width="1.3"/><line x1="95" y1="22" x2="95" y2="165" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="5 4"/><polyline points="95.0,155.0 105.0,155.0 105.0,165.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="196" y="157" font-size="12" text-anchor="end" fill="#1f2530">42°</text><text x="172" y="86" font-size="13" fill="#1f2530">14</text><text x="150" y="183" font-size="13" text-anchor="middle" fill="#1f2530">12</text><text x="104" y="100" font-size="13" fill="#1f2530"><tspan font-style="italic">h</tspan></text></svg>
:::

We have now formed a right-angled triangle where the height $h$ is the
*opposite side* and the side 14 the *hypotenuse*. We use sine!

$$
\sin 42\degree = \frac{h}{14}
\qquad
h = 14 \cdot \sin 42\degree
$$

We now have the height! Substituting $b = 12$ and $h = 14 \cdot \sin 42\degree$
into the formula for the area of a triangle $A = \dfrac{b \cdot h}{2}$ gives

$$
A = \frac{12 \cdot 14 \cdot \sin 42\degree}{2} = 56.206\ldots \approx 56\ \text{a.u. (area units)}
$$

**Answer:** 56 a.u.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The formulas"
- $\sin v
  = \dfrac{\text{opposite}}{\text{hypotenuse}}$
- $\cos v
  = \dfrac{\text{adjacent}}{\text{hypotenuse}}$
- $\tan v
  = \dfrac{\text{opposite}}{\text{adjacent}}$
:::

::: sampunkt "Sine and cosine are always less than 1"
- The hypotenuse is always the longest, so you divide by the largest number.
- If you get a sine or cosine value above 1, you have made a mistake.
- The **tangent**, on the other hand, can be as large as you like.
:::

::: sampunkt "The two acute angles are linked"
- What is opposite for one angle is adjacent for the other.
- That is why $\sin u = \cos v$ when $u$ and $v$ are the two acute angles
  of the triangle.
:::

::: sampunkt "Finding the hypotenuse"
- If a leg and an angle are known: solve for the hypotenuse from sine or
  cosine.
- The hypotenuse ends up in the **denominator**, so multiply it up and then
  divide.
:::

::: sampunkt "The area of the triangle"
- $A = \dfrac{\text{base} \cdot \text{height}}{2}$
- If the height is missing: first calculate it with trigonometry, then the area.
- Area units are written **a.u.** when the unit is missing.
:::
:::
