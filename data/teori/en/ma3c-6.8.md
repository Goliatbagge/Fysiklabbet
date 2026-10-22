---
kalla: 5896c79eee
id: ma3c-6.8
title: Applications of the triangle theorems
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.8'
---

# Applications of the triangle theorems

The area theorem, the sine rule and the cosine rule are together called
the **triangle theorems**. In this section we apply them to solve
problems. The most important step is to decide **which** theorem fits
the information that is given.

::: formel "Remember: the triangle theorems"
In a triangle $ABC$ with the sides $a$, $b$ and $c$

**The area theorem**

$$
T = \frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2}
$$

**The sine rule**

$$
\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c} \qquad \text{alternatively} \qquad \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}
$$

**The cosine rule**

$$
c^2 = a^2 + b^2 - 2ab\cos C \qquad b^2 = a^2 + c^2 - 2ac\cos B \qquad a^2 = b^2 + c^2 - 2bc\cos A
$$

The side $a$ is the side opposite angle $A$, the side $b$ is the side opposite
angle $B$ and the side $c$ is the side opposite angle $C$.
:::

::: figur
<svg viewBox="-24 -27 230 241" width="291" height="305" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC. The side a lies opposite angle A, the side b opposite angle B and the side c opposite angle C."><polygon points="49.82,0 0,185.92 180,185.92" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 44.12,21.25 A 22 22 0 0 0 62.44,18.02" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 5.69,164.67 A 22 22 0 0 1 22,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 167.38,167.9 A 22 22 0 0 0 158,185.92" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="46.87" y="-14.74" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-13.49" y="204.27" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="195.08" y="201.77" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="90" y="209.92" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="128.02" y="85.78" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="9.45" y="92.82" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

When we solve a problem it is important to know **which** theorem it is
possible to use, based on what is known in the triangle.

| Theorem | Use when ... |
| --- | --- |
| The area theorem | two sides and the included angle are known |
| The sine rule | one side and two angles are known, or two sides and an angle that is not the included angle are known |
| The cosine rule | two sides and the included angle are known, or all three sides are known (and no angle) |

In many applied problems we also need to use the theorems in **several
triangles one after the other**: a quantity calculated in one triangle
is then used as known information in the next. The next example shows how.

::: exempel "Example 1: Determine the height of a hill"
**An 11 metre high flagpole stands on top of a hill. From a point $B$
on the ground the angle of elevation to the top of the flagpole is $32^\circ$, while
the angle of elevation to the top of the hill is $25^\circ$. How high is the hill?**

::: figur
<svg viewBox="10 -2 282 176" width="383" height="239" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A flagpole on top of a hill. From a point B on the ground the angle of elevation to the top of the flagpole A is 32 degrees and the angle of elevation to the top of the hill D is 25 degrees. The flagpole AD is 11 metres. The height of the hill is to be determined."><path d="M 20,150 Q 113.65,96.62 228.12,52.95 Q 242.82,106.33 270.12,150 Z" fill="#4a7d3a" fill-opacity="0.16" stroke="#4a7d3a" stroke-opacity="0.55" stroke-width="1.3"/><line x1="20" y1="150" x2="270.12" y2="150" stroke="#1f2530" stroke-width="1.8" stroke-linecap="butt"/><line x1="228.12" y1="52.95" x2="228.12" y2="150" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="butt"/><line x1="20" y1="150" x2="228.12" y2="52.95" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="butt"/><line x1="20" y1="150" x2="228.12" y2="19.95" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 3" stroke-linecap="butt"/><line x1="228.12" y1="52.95" x2="228.12" y2="19.95" stroke="#1f2530" stroke-width="2.4" stroke-linecap="butt"/><polygon points="228.12,19.95 244.12,24.95 228.12,29.95" fill="#c8324a"/><polyline points="216.12,150 216.12,138 228.12,138" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 30,150 A 10 10 0 0 0 29.06,145.77" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 60,150 A 40 40 0 0 0 53.92,128.8" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="51.41" y="143.89" font-size="12" text-anchor="middle" fill="#1f2530">25°</text><text x="79.6" y="132.91" font-size="12" text-anchor="middle" fill="#1f2530">32°</text><text x="238.12" y="40.45" font-size="13" text-anchor="start" fill="#1f2530">11</text><text x="20" y="168" font-size="14" text-anchor="middle" fill="#1f2530">B</text><text x="235.12" y="165" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="220.12" y="56.95" font-size="14" text-anchor="end" fill="#1f2530">D</text><text x="220.12" y="17.95" font-size="14" text-anchor="end" fill="#1f2530">A</text><text x="286" y="12" font-size="11" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

::: handskrift
typ: flaggstangkulle
:::

::: textlosning
Let $A$ be the top of the flagpole, $D$ the top of the hill (the foot of the flagpole) and
$C$ the foot of the vertical line from $A$ and $D$ down to the ground, directly below, at the same level as $B$.
The angle at $C$ is a right angle.

The only known **side** is $AD = 11$ m, and it belongs to the triangle $ABD$.
So we start by finding two angles in that triangle.

$$
\angle ABD = 32^\circ - 25^\circ = 7^\circ
$$

$$
\angle BAD = 180^\circ - 90^\circ - 32^\circ = 58^\circ \qquad \text{(the angle sum in } \triangle ABC \text{)}
$$

In the triangle $ABD$ we now know one side and two angles, so we use
the sine rule to determine the distance $BD$.

$$
\frac{BD}{\sin 58^\circ} = \frac{11}{\sin 7^\circ} \iff BD = \frac{11\sin 58^\circ}{\sin 7^\circ} \approx 76.545\ldots \text{ m}
$$

In the right-angled triangle $BCD$ we now know one angle ($25^\circ$) and
the hypotenuse ($BD \approx 76.545$ m). The height of the hill $CD$ is the opposite
side to the angle $25^\circ$, so we determine it with sine.

$$
\sin 25^\circ = \frac{CD}{76.545\ldots} \iff CD = 76.545\ldots \cdot \sin 25^\circ \approx 32.349\ldots \approx 32 \text{ m}
$$

**Answer:** $CD \approx 32$ m
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The triangle theorems"
- **The area theorem:** $T = \dfrac{ab\sin C}{2}$
- **The sine rule:** $\dfrac{\sin A}{a} = \dfrac{\sin B}{b} = \dfrac{\sin C}{c}$
- **The cosine rule:** $c^2 = a^2 + b^2 - 2ab\cos C$
- The side $a$ always lies opposite angle $A$.
:::

::: sampunkt "Choosing the right theorem"
- **The area theorem:** two sides and the included angle, and the area is sought.
- **The sine rule:** one side and two angles, or two sides and an angle that is not the included angle.
- **The cosine rule:** two sides and the included angle, or all three sides.
:::

::: sampunkt "Method"
1. Draw the figure and mark everything that is known.
2. Find the triangle that contains the only known **side**.
3. Fill in angles from the angle sum.
4. Choose the theorem according to what is known, and calculate.
:::

::: sampunkt "Several triangles in a row"
- Many problems require the theorems to be used in **two triangles one after the other**.
- What is calculated in the first triangle becomes known information in the next.
- Carry unrounded values between the steps and round only in the answer.
:::

:::
