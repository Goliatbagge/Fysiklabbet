---
kalla: aed291c87c
id: ma3c-6.7
title: The cosine rule
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.7'
---

# The cosine rule

To determine sides and angles in certain triangles that the sine rule cannot
handle, we can use the **cosine rule**.

::: formel "The cosine rule"
In a triangle $ABC$ with the sides $a$, $b$ and $c$

$$
\begin{aligned}
c^2 &= a^2 + b^2 - 2ab\cos C \\
b^2 &= a^2 + c^2 - 2ac\cos B \\
a^2 &= b^2 + c^2 - 2bc\cos A
\end{aligned}
$$

The side $a$ is the side opposite angle $A$, the side $b$ is the side opposite
angle $B$ and the side $c$ is the side opposite angle $C$.

::: härledning "Proof: the cosine rule"
Pythagoras' theorem in the two right-angled triangles gives

$$
c^2 = h^2 + x^2 \iff h^2 = c^2 - x^2
$$

$$
b^2 = h^2 + (a - x)^2 \iff h^2 = b^2 - (a - x)^2
$$

Since both expressions are equal to $h^2$ we get

$$
c^2 - x^2 = b^2 - (a - x)^2 = b^2 - a^2 + 2ax - x^2 \iff c^2 = b^2 - a^2 + 2ax
$$

We solve for $b^2$ and get

$$
b^2 = a^2 + c^2 - 2ax \qquad (1)
$$

In the right-angled triangle with the hypotenuse $c$

$$
\cos B = \frac{x}{c} \iff x = c\cos B
$$

Substituting $x = c\cos B$ into (1) gives

$$
b^2 = a^2 + c^2 - 2ac\cos B
$$

QED. The other two formulas are proved in the same way.
:::
:::

::: figur
<svg viewBox="-29.83 -35.49 259.11 228.85" width="328" height="290" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC. The side a lies opposite angle A, the side b opposite angle B and the side c opposite angle C."><polygon points="66,0 0,168 198,168" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 57.96,20.48 A 22 22 0 0 0 79.59,17.3" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 8.04,147.52 A 22 22 0 0 1 22,168" fill="none" stroke="#1f2530" stroke-width="1.2"/><path d="M 184.41,150.7 A 22 22 0 0 0 176,168" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="63.09" y="-19.79" font-size="15" text-anchor="middle" fill="#1f2530">A</text><text x="-16.53" y="179.26" font-size="15" text-anchor="end" fill="#1f2530">B</text><text x="215.99" y="176.74" font-size="15" text-anchor="start" fill="#1f2530">C</text><text x="99" y="186" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="143.01" y="75.35" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="19.97" y="78.88" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

We prove the relationship for $b^2$ below. We construct an arbitrary triangle
with notation as in the figure below, where the height $h$ from $A$ divides the side
$a$ into the parts $x$ (closest to $B$) and $a - x$ (closest to $C$).

::: figur
<svg viewBox="-22.68 -22.92 275.36 232.04" width="374" height="315" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC with the height h from A perpendicular to the side a. The foot of the height divides the side a into the parts x, closest to B, and a minus x, closest to C."><polygon points="0,150 230,150 80,0" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="80" y1="0" x2="80" y2="150" stroke="#1f2530" stroke-width="1.4" stroke-dasharray="4 3" stroke-linecap="butt"/><path d="M 70,150 L 70,140 L 80,140" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="80" y="-8" font-size="14" text-anchor="middle" fill="#1f2530">A</text><text x="-10" y="166" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="240" y="166" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="29.41" y="69.35" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="163.49" y="66.51" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="90" y="79" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">h</tspan></text><text x="40" y="166" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="155" y="166" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan> &#8722; <tspan font-style="italic">x</tspan></text><line x1="0" y1="184" x2="230" y2="184" stroke="#1f2530" stroke-width="1.2"/><polygon points="0,184 7,180.5 7,187.5" fill="#1f2530"/><polygon points="230,184 223,180.5 223,187.5" fill="#1f2530"/><line x1="0" y1="156" x2="0" y2="190" stroke="#1f2530" stroke-width="0.9" stroke-dasharray="2 2"/><line x1="230" y1="156" x2="230" y2="190" stroke="#1f2530" stroke-width="0.9" stroke-dasharray="2 2"/><text x="115" y="202" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text></svg>
:::

::: tips "The cosine rule: when to use it"
The cosine rule can be used for triangles with

- two sides and the included angle known,
- all three sides known and no angle known.
:::

::: exempel "Example 1: Determine a side with the cosine rule"
**Determine the side $c$ in the triangle below.**

::: figur
<svg viewBox="-28.05 -41.72 219.93 148.49" width="298" height="202" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC where the side a, opposite A, is 19 centimetres, the side b, opposite B, is 17 centimetres and angle C between them is 34 degrees. The side c, opposite C, is to be determined."><polygon points="43.18,0 0,83.66 167.2,83.66" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 141.2,83.66 A 26 26 0 0 1 145.65,69.12" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="127.04" y="75.38" font-size="12" text-anchor="middle" fill="#1f2530">34°</text><text x="38.71" y="-17.44" font-size="14" text-anchor="middle" fill="#1f2530">A</text><text x="-15.37" y="93.02" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="179.2" y="87.66" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="7.37" y="34.49" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="113.02" y="30.22" font-size="13" text-anchor="start" fill="#1f2530">17</text><text x="83.6" y="99.66" font-size="13" text-anchor="middle" fill="#1f2530">19</text><text x="185.88" y="-27.72" font-size="12" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: cosinussatsensida
:::

::: textlosning
Two sides and the included angle are known, so we can use
the cosine rule. The cosine rule $c^2 = a^2 + b^2 - 2ab\cos C$ gives

$$
c^2 = 19^2 + 17^2 - 2 \cdot 19 \cdot 17\cos 34^\circ \iff c = \sqrt{19^2 + 17^2 - 2 \cdot 19 \cdot 17\cos 34^\circ} \approx 10.697\ldots \approx 10.7
$$

**Answer:** $c \approx 10.7$ cm
:::
:::

::: exempel "Example 2: Determine all the angles with the cosine rule"
**Calculate the angles in the triangle below.**

::: figur
<svg viewBox="-55.23 -36.4 195.38 132.05" width="265" height="179" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A triangle ABC where the side a (BC) is 5 metres, the side b (AC) is 7 metres and the side c (AB) is 3.5 metres. All three angles are to be determined."><polygon points="-25.85,0 0,72.53 110,72.53" fill="none" stroke="#1f2530" stroke-width="1.8"/><text x="-36.3" y="-12.12" font-size="14" text-anchor="middle" fill="#1f2530">A</text><text x="-10.37" y="87.24" font-size="14" text-anchor="end" fill="#1f2530">B</text><text x="127.46" y="76.9" font-size="14" text-anchor="start" fill="#1f2530">C</text><text x="-27.05" y="41.3" font-size="13" text-anchor="end" fill="#1f2530">3.5</text><text x="48.67" y="23.92" font-size="13" text-anchor="start" fill="#1f2530">7</text><text x="55" y="88.53" font-size="13" text-anchor="middle" fill="#1f2530">5</text><text x="134.15" y="-22.4" font-size="12" text-anchor="end" fill="#1f2530">(m)</text></svg>
:::

::: handskrift
typ: cosinussatsenvinklar
:::

::: textlosning
All three sides are known, so we can use the cosine rule. We start by
determining the angle $A$ and then use the form of the cosine rule that
contains $\cos A$.

$$
a^2 = b^2 + c^2 - 2bc\cos A
$$

Substituting our values gives

$$
5^2 = 7^2 + 3.5^2 - 2 \cdot 7 \cdot 3.5\cos A
$$

We solve for $\cos A$

$$
2 \cdot 7 \cdot 3.5\cos A = 7^2 + 3.5^2 - 5^2 \iff \cos A = \frac{7^2 + 3.5^2 - 5^2}{2 \cdot 7 \cdot 3.5}
$$

$$
A = \cos^{-1}\left(\frac{7^2 + 3.5^2 - 5^2}{2 \cdot 7 \cdot 3.5}\right) \approx 42.285\ldots^\circ \approx 42.3^\circ
$$

When one angle is known, we can determine another angle with either
the cosine rule or the sine rule. We show both methods.

**With the cosine rule:**

$$
b^2 = a^2 + c^2 - 2ac\cos B
$$

$$
7^2 = 5^2 + 3.5^2 - 2 \cdot 5 \cdot 3.5\cos B \iff \cos B = \frac{5^2 + 3.5^2 - 7^2}{2 \cdot 5 \cdot 3.5}
$$

$$
B = \cos^{-1}\left(\frac{5^2 + 3.5^2 - 7^2}{2 \cdot 5 \cdot 3.5}\right) \approx 109.615\ldots^\circ \approx 109.6^\circ
$$

**With the sine rule:**

$$
\frac{\sin B}{b} = \frac{\sin A}{a} \iff \sin B = \frac{7\sin 42.285\ldots^\circ}{5} \approx 0.941\ldots
$$

$$
B_1 = \sin^{-1}(0.941\ldots) \approx 70.385\ldots^\circ \approx 70.4^\circ
$$

$$
B_2 = 180^\circ - B_1 \approx 180^\circ - 70.4^\circ = 109.6^\circ
$$

The angle $B_1 \approx 70.4^\circ$ is unreasonable since $\cos B$ was
negative, which means that the angle $B$ is obtuse. So we get
$B \approx 109.6^\circ$.

The third and last angle $C$ is most easily determined with the angle sum of
the triangle.

$$
C = 180^\circ - A - B \approx 180^\circ - 42.3^\circ - 109.6^\circ = 28.1^\circ
$$

**Answer:** $A \approx 42.3^\circ$ and $B \approx 109.6^\circ$ and
$C \approx 28.1^\circ$
:::
:::

Note that the first solution from the sine rule above gave an incorrect angle (the
acute $B_1$). To reduce the risk of careless mistakes, the cosine rule is recommended,
where possible, over the sine rule when you are to determine angles.

::: sammanfattning "Summary"

::: sampunkt "The cosine rule"
- $c^2 = a^2 + b^2 - 2ab\cos C$, and in the same way for $b^2$ and $a^2$.
- The angle in the formula is always the **included angle** between the two sides in the product.
- If the angle is $90^\circ$, $\cos C = 0$ and the rule becomes Pythagoras' theorem.
:::

::: sampunkt "When it works"
- Two sides and the included angle are known, and the third side is sought.
- All three sides are known and no angle.
:::

::: sampunkt "Finding an angle"
- Solve for $\cos C$ from the rule and use $\cos^{-1}$.
- If $\cos C$ is **negative**, the angle is obtuse, that is over $90^\circ$.
- The method gives only **one** solution, unlike the sine rule.
:::

::: sampunkt "Choose the cosine rule for angles"
- The sine rule gives two solutions and the wrong one is easy to choose by mistake.
- So preferably use the cosine rule when an angle is to be determined.
- The last angle is most easily obtained from the angle sum $180^\circ$.
:::

:::
