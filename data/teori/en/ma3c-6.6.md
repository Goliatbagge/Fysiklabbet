---
kalla: 7170f5219c
id: ma3c-6.6
title: The sine rule
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.6'
---

# The sine rule

To determine sides and angles in certain triangles we can use
the **sine rule**.

::: formel "The sine rule"
In a triangle $ABC$ with the sides $a$, $b$ and $c$

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}
$$

or, alternatively (the same relationship upside down),

$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$

The side $a$ is the side opposite angle $A$, the side $b$ is the side opposite
angle $B$ and the side $c$ is the side opposite angle $C$.

::: härledning "Proof: the sine rule"
We start from the area theorem, which we proved in the previous section, and
multiply all parts by 2.

$$
\frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2} \iff ab\sin C = ac\sin B = bc\sin A
$$

We divide all parts by $abc$ and then cancel.

$$
\frac{ab\sin C}{abc} = \frac{ac\sin B}{abc} = \frac{bc\sin A}{abc} \iff \frac{\sin C}{c} = \frac{\sin B}{b} = \frac{\sin A}{a}
$$

QED
:::
:::

::: figur
<svg viewBox="-24 -27 230 241" width="291" height="305" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC. The side a lies opposite angle A, the side b opposite angle B and the side c opposite angle C."><polygon points="49.82,0 0,185.92 180,185.92" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 44.12,21.25 A 22 22 0 0 0 62.44,18.02" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 5.69,164.67 A 22 22 0 0 1 22,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 167.38,167.9 A 22 22 0 0 0 158,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="46.87" y="-14.74" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-13.49" y="204.27" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="195.08" y="201.77" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="90" y="209.92" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="128.02" y="85.78" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="9.45" y="92.82" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

The sine rule can be used for triangles with

- one side and two angles known,
- two sides and an angle that is not the included angle known.

::: exempel "Example 1: Determine a side with the sine rule"
**Determine the side $a$ in the triangle below.**

::: figur
<svg viewBox="-26 -40 334 198" width="453" height="269" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC where angle B is 30 degrees, angle C is 70 degrees and the side AC, opposite angle B, is 24 centimetres. The side BC, opposite angle A, is to be determined."><polygon points="234.37,0 0,135.32 283.62,135.32" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 17.32,125.32 A 20 20 0 0 1 20,135.32" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="33.81" y="130.26" font-size="12" text-anchor="middle" fill="#1f2530">30°</text><path d="M 276.78,116.52 A 20 20 0 0 0 263.62,135.32" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="254.95" y="119.24" font-size="12" text-anchor="middle" fill="#1f2530">70°</text><text x="239.5" y="-12.1" font-size="14" text-anchor="start" fill="#1f2530">A</text><text x="-14.49" y="143.2" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="295.91" y="151.92" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="272.15" y="66.87" font-size="12" text-anchor="middle" fill="#1f2530">24</text><text x="305.62" y="-24" font-size="11" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: sinussatsensida
:::

::: textlosning
Two angles and one side are known, so we can use the sine rule. We just
have to determine the angle $A$ first.

$$
A = 180^\circ - 30^\circ - 70^\circ = 80^\circ \qquad \text{(the angle sum of a triangle)}
$$

The sine rule $\dfrac{a}{\sin A} = \dfrac{b}{\sin B}$ gives

$$
\frac{a}{\sin 80^\circ} = \frac{24}{\sin 30^\circ} \iff a = \frac{24\sin 80^\circ}{\sin 30^\circ} \approx 47.270\ldots \approx 47.3
$$

**Answer:** $a \approx 47.3$ cm
:::
:::

::: exempel "Example 2: Determine an angle with the sine rule"
**A triangle $ABC$ has the sides $a = 7$ cm and $b = 10$ cm. The angle $B$,
opposite the side $b$, is $40^\circ$. Determine the angle $A$, opposite the side
$a$.**

::: figur
<svg viewBox="-24 -22 220 196" width="299" height="266" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC where the side BC (a) is 7 centimetres, the side AC (b) is 10 centimetres and angle B is 40 degrees. Angle A, opposite the side a, is to be determined."><polygon points="175.18,0 0,147 112,147" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 15.32,134.14 A 20 20 0 0 1 20,147" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="32.89" y="139.03" font-size="12" text-anchor="middle" fill="#1f2530">40°</text><text x="184.13" y="-10.04" font-size="14" text-anchor="start" fill="#1f2530">A</text><text x="-14.1" y="160.13" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="120.25" y="167.52" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="56" y="169" font-size="12" text-anchor="middle" fill="#1f2530">7</text><text x="156.45" y="87.03" font-size="12" text-anchor="start" fill="#1f2530">10</text></svg>
:::

::: handskrift
typ: sinussatsenvinkel
:::

::: textlosning
We determine the angle $A$ with the sine rule.

$$
\frac{\sin A}{7} = \frac{\sin 40^\circ}{10} \iff \sin A = \frac{7\sin 40^\circ}{10} \approx 0.449\ldots
$$

$$
A_1 = \sin^{-1}(0.449\ldots) \approx 26.740\ldots^\circ \approx 26.7^\circ
$$

$$
A_2 = 180^\circ - A_1 \approx 180^\circ - 26.7^\circ = 153.3^\circ
$$

The angle $A_2$ is unreasonable since it gives an angle sum over $180^\circ$
(one of the angles is already $40^\circ$).

**Answer:** $A \approx 26.7^\circ$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The sine rule"
- $\dfrac{\sin A}{a} = \dfrac{\sin B}{b} = \dfrac{\sin C}{c}$, or upside down: $\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$.
- The side $a$ is the side opposite angle $A$, and so on.
- Use the form with the sides in the numerator when you are looking for a **side**.
:::

::: sampunkt "When it works"
- One side and two angles are known.
- Two sides and an angle that is **not the included angle** are known.
- If the third angle is missing, it is obtained from the angle sum $180^\circ$.
:::

::: sampunkt "The proof"
- Start from the area theorem and multiply all parts by 2: $ab\sin C = ac\sin B = bc\sin A$.
- Divide all parts by $abc$ and cancel.
:::

::: sampunkt "Two solutions when finding an angle"
- $\sin^{-1}$ gives $A_1$. The second solution is $A_2 = 180^\circ - A_1$.
- Test both against the angle sum: if one gives a sum over $180^\circ$, it is unreasonable and is rejected.
- $\sin A = 0.449$ gives $A_1 \approx 26.7^\circ$ and $A_2 \approx 153.3^\circ$. With a known angle of $40^\circ$ only $26.7^\circ$ works.
:::

:::
