---
kalla: 0b9a362d49
id: ma3c-6.1
title: Trigonometry in right-angled triangles
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.1'
---

# Trigonometry in right-angled triangles

We revise from Mathematics level 1c. In a right-angled triangle the side
opposite the right angle is called the **hypotenuse**. The two shorter sides are called
**legs**. The leg opposite the angle $v$ is called the **opposite side**,
and the leg that forms the angle $v$ together with the hypotenuse is called
the **adjacent side**. With the help of these three sides the
trigonometric functions tangent, sine and cosine are defined.

::: formel "Trigonometric functions"
::: figur
<svg viewBox="36 28 212 128" width="288" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg a, the horizontal leg b, the hypotenuse c and the angle v at the bottom right."><polygon points="60,40 60,130 240,130" fill="none" stroke="#1f2530" stroke-width="1.5"/><polyline points="60.0,118.0 72.0,118.0 72.0,130.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M218.0,130.0 A22,22 0 0 1 220.3,120.2" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="48" y="90" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="150" y="148" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="158" y="76" font-size="14" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="196" y="124" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

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

If we instead know a ratio between two sides and want to determine
the angle $v$, we reverse the relationships above with the **inverse trigonometric
functions**.

::: formel "Inverse trigonometric functions"
$$
\tan v = \frac{a}{b} \quad\Leftrightarrow\quad v = \tan^{-1}\left(\frac{a}{b}\right) = \arctan\left(\frac{a}{b}\right)
$$

$$
\sin v = \frac{a}{c} \quad\Leftrightarrow\quad v = \sin^{-1}\left(\frac{a}{c}\right) = \arcsin\left(\frac{a}{c}\right)
$$

$$
\cos v = \frac{b}{c} \quad\Leftrightarrow\quad v = \cos^{-1}\left(\frac{b}{c}\right) = \arccos\left(\frac{b}{c}\right)
$$

You find the inverse functions on the calculator as $\tan^{-1}$, $\sin^{-1}$
and $\cos^{-1}$ (often by pressing `shift`/`2nd` followed by
the tan, sin or cos key).
:::

So if we know an angle and a side in a right-angled triangle, we can
determine another side with tangent, sine or cosine. If we instead
know two sides, we can determine the angle with an inverse function.

::: exempel "Example 1: Determine a side with sine"
**Determine the length of the side $a$. Round to one decimal place.**

::: figur
<svg viewBox="26 16 212 142" width="310" height="208" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg 6.1 centimetres, the angle 41 degrees at the bottom right and the unknown hypotenuse a."><polygon points="90,150 90,28 230,150" fill="#b5d68f" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,138.0 102.0,138.0 102.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M208.0,150.0 A22,22 0 0 1 213.4,135.6" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="78" y="93" font-size="13" text-anchor="end" fill="#1f2530">6.1 cm</text><text x="199" y="139" font-size="12" text-anchor="end" fill="#1f2530">41°</text><text x="172" y="78" font-size="13" fill="#1f2530"><tspan font-style="italic">a</tspan></text></svg>
:::

::: handskrift
typ: sinussida
:::

::: textlosning
For the angle 41° we have the opposite side and we need to determine the hypotenuse.
So we use sine for the angle. Remember:

$$
\sin v = \frac{\text{opposite side}}{\text{hypotenuse}}
$$

$$
\sin 41^\circ = \frac{6.1\ \text{cm}}{a} \quad\Leftrightarrow\quad a = \frac{6.1\ \text{cm}}{\sin 41^\circ} = 9.297\ldots\ \text{cm} \approx 9.3\ \text{cm}
$$

**Answer:** 9.3 cm
:::
:::

::: exempel "Example 2: Determine an angle with tangent"
**Determine the angle $v$. Round to whole degrees.**

::: figur
<svg viewBox="26 8 190 168" width="278" height="246" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A right-angled triangle with the vertical leg 2.3 millimetres, the horizontal leg 1.8 millimetres and the unknown angle v at the bottom right."><polygon points="90,150 90,16 195,150" fill="#b5d68f" stroke="#1f2530" stroke-width="1.5"/><polyline points="90.0,138.0 102.0,138.0 102.0,150.0" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M175.0,150.0 A20,20 0 0 1 182.7,134.3" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="78" y="87" font-size="13" text-anchor="end" fill="#1f2530">2.3 mm</text><text x="142" y="168" font-size="13" text-anchor="middle" fill="#1f2530">1.8 mm</text><text x="168" y="138" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan></text></svg>
:::

::: handskrift
typ: tangensvinkel
:::

::: textlosning
For the angle $v$ we have the opposite side and the adjacent side. So we
use tangent for the angle. Remember:

$$
\tan v = \frac{\text{opposite side}}{\text{adjacent side}}
$$

$$
\tan v = \frac{2.3\ \text{mm}}{1.8\ \text{mm}} \quad\Leftrightarrow\quad v = \tan^{-1}\left(\frac{2.3}{1.8}\right) = 51.952\ldots^\circ \approx 52^\circ
$$

**Answer:** 52°
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The sides of a right-angled triangle"
- The **hypotenuse** is the side opposite the right angle, the longest side.
- The **legs** are the two shorter sides.
- The **opposite side** lies opposite the angle $v$, the **adjacent side** forms the angle together with the hypotenuse.
:::

::: sampunkt "The trigonometric functions"
- $\tan v = \dfrac{\text{opposite side}}{\text{adjacent side}}$
- $\sin v = \dfrac{\text{opposite side}}{\text{hypotenuse}}$
- $\cos v = \dfrac{\text{adjacent side}}{\text{hypotenuse}}$
:::

::: sampunkt "Inverse functions"
- If you know **two sides** and are looking for the angle: use the inverse function.
- $v = \tan^{-1}\left(\dfrac{a}{b}\right)$, $v = \sin^{-1}\left(\dfrac{a}{c}\right)$, $v = \cos^{-1}\left(\dfrac{b}{c}\right)$.
- On the calculator they are reached with `shift` or `2nd` followed by the tan, sin or cos key.
:::

::: sampunkt "Choosing the function"
1. Mark which angle you start from.
2. Name the sides that are known or sought: opposite, adjacent or hypotenuse.
3. Choose the function that contains exactly those two sides.
- $\sin 41^\circ = \dfrac{6.1}{a}$ gives $a = \dfrac{6.1}{\sin 41^\circ} \approx 9.3$ cm.
:::

:::
