---
kalla: 33f337a38b
id: ma1c-6.3
title: Finding angles with inverse functions
course: Matematik nivå 1c
chapter: Trigonometri
chapterNumber: 6
section: '6.3'
---

# Finding angles with inverse functions

Remember from before:

::: formel "Trigonometric functions"
$$
\tan v = \frac{\text{opposite side}}{\text{adjacent side}}
\qquad
\sin v = \frac{\text{opposite side}}{\text{hypotenuse}}
\qquad
\cos v = \frac{\text{adjacent side}}{\text{hypotenuse}}
$$
:::

We can also calculate angles in triangles with the help of the
**inverse functions** of the trigonometric functions.

| Trigonometric function | Inverse function |
| --- | --- |
| tan | tan⁻¹ ("inverse tangent") or arctan ("arc tangent") |
| sin | sin⁻¹ ("inverse sine") or arcsin ("arc sine") |
| cos | cos⁻¹ ("inverse cosine") or arccos ("arc cosine") |

So, for example, tan⁻¹ and arctan are the same thing, just different ways of writing it. It is
good to recognise both ways of writing!

::: formel "Inverse functions"
If

$$
\tan v = \frac{a}{b}
\quad\text{then}\quad
v = \tan^{-1}\left(\frac{a}{b}\right) = \arctan\left(\frac{a}{b}\right)
$$

$$
\sin v = \frac{a}{c}
\quad\text{then}\quad
v = \sin^{-1}\left(\frac{a}{c}\right) = \arcsin\left(\frac{a}{c}\right)
$$

$$
\cos v = \frac{b}{c}
\quad\text{then}\quad
v = \cos^{-1}\left(\frac{b}{c}\right) = \arccos\left(\frac{b}{c}\right)
$$
:::

The inverse functions are entered on a calculator. Learn how to enter them!

::: exempel "Example 1: Find the angle from the cosine value"
**Find the angle $v$ if cos $v$ = 0.753.**

::: handskrift
typ: inverscos
:::

::: textlosning
$$
\cos v = 0.753
$$

$$
v = \cos^{-1}(0.753) = 41.149\ldots\degree \approx 41\degree
$$

**Answer:** 41°
:::
:::

::: exempel "Example 2: Find all the angles of the triangle"
**One leg of a right-angled triangle is 3 cm and the hypotenuse is
5 cm. Find the angles of the triangle with the inverse functions.**

::: handskrift
typ: allavinklar
:::

::: textlosning
We draw a sketch of the triangle and call the unknown angles $u$ and
$v$:

::: figur
<svg viewBox="34 22 226 162" width="330" height="237" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg 3 centimetres and the hypotenuse 5 centimetres. The unknown angle u is at the top and the unknown angle v at the bottom right."><polygon points="90,30 90,160 250,160" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,148.0 102.0,148.0 102.0,160.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M105.5,42.6 A20,20 0 0 1 90.0,50.0" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M228.0,160.0 A22,22 0 0 1 232.9,146.1" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="104" y="60" font-size="13" fill="#1f2530"><tspan font-style="italic">u</tspan></text><text x="212" y="152" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="78" y="100" font-size="13" text-anchor="end" fill="#1f2530">3 cm</text><text x="180" y="86" font-size="13" fill="#1f2530">5 cm</text></svg>
:::

We begin by finding the angle $u$. We have the adjacent side and the
hypotenuse, so

$$
\cos u = \frac{3}{5}
$$

$$
u = \cos^{-1}\left(\frac{3}{5}\right) = 53.130\ldots\degree \approx 53\degree
$$

We now know two angles in the triangle (90° and 53°) and could calculate
the third angle $v$ from the fact that the angle sum in a triangle is 180°.
But we are to calculate the angle $v$ with inverse functions, where we have
the opposite side and the hypotenuse, so

$$
\sin v = \frac{3}{5}
$$

$$
v = \sin^{-1}\left(\frac{3}{5}\right) = 36.869\ldots\degree \approx 37\degree
$$

**Answer:** 90°, 53° and 37°
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Inverse functions"
- Used to get the **angle** from a known ratio.
- $\tan^{-1}$ is also called $\arctan$, $\sin^{-1}$ is called $\arcsin$ and
  $\cos^{-1}$ is called $\arccos$.
- Both ways of writing mean the same thing.
:::

::: sampunkt "The relationships"
- $\tan v = \dfrac{a}{b}$ gives
  $v = \tan^{-1}\!\left(\dfrac{a}{b}\right)$.
- $\sin v = \dfrac{a}{c}$ gives
  $v = \sin^{-1}\!\left(\dfrac{a}{c}\right)$.
- $\cos v = \dfrac{b}{c}$ gives
  $v = \cos^{-1}\!\left(\dfrac{b}{c}\right)$.
:::

::: sampunkt "How to do it"
1. Set up the right trigonometric function with the sides you know.
2. Calculate the ratio.
3. Use the inverse function on the calculator.
:::

::: sampunkt "Checks"
- The angle sum in a triangle is always $180^\circ$. Calculate the third
  angle by subtraction.
- The calculator must be set to **degrees**, not radians.
- $\sin^{-1}$ of a number greater than 1 gives an error message, since
  no such angle exists.
:::
:::
