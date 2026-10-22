---
kalla: 5afd85cb3d
id: ma3c-6.5
title: The area theorem
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.5'
---

# The area theorem

With the help of the sine function we can calculate the area $T$ of a triangle without
knowing the height. All we need to know is two sides and the angle
between them, the **included angle**.

::: formel "The area theorem"
In a triangle $ABC$ with the sides $a$, $b$ and $c$

$$
T = \frac{ab\sin C}{2} = \frac{ac\sin B}{2} = \frac{bc\sin A}{2}
$$

where $T$ is the area of the triangle.

::: härledning "Proof: the area theorem"
Let $A$ be the included angle between the sides $b$ and $c$. We draw a
height $h$ from vertex $C$ down to the point $P$ on the side $AB$, as in the figure
below.

::: figur
<svg viewBox="-4 42 200 134" width="271" height="182" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A triangle ABC with a height h drawn from vertex C down to the point P on the side AB, which forms the right-angled triangle APC."><polygon points="20,150 170,150 77.36,68.08" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="77.36" y1="68.08" x2="77.36" y2="150" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><polyline points="65.36,150 65.36,138 77.36,138" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="10" y="166" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="180" y="166" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="77.36" y="58.08" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">C</tspan></text><text x="77.36" y="166" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">P</tspan></text><text x="37.21" y="101.01" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="132.96" y="98.55" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="87.36" y="109.04" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">h</tspan></text></svg>
:::

The triangle $APC$ is right-angled, with the right angle at $P$. We express
the height $h$ with the help of sine for the angle $A$:

$$
\sin A = \frac{h}{b} \quad\iff\quad h = b\sin A \qquad (1)
$$

The area $T$ of a triangle is given by the base times the height divided by two:

$$
T = \frac{\text{base} \cdot \text{height}}{2} = \frac{c \cdot h}{2}
$$

Substituting $h = b\sin A$ from (1) gives

$$
T = \frac{c \cdot b\sin A}{2} = \frac{bc\sin A}{2} \qquad \text{QED}
$$

The other two formulas, $T = \dfrac{ab\sin C}{2}$
and $T = \dfrac{ac\sin B}{2}$, are proved in the same way by instead drawing the height from vertex $A$
and vertex $B$ respectively.
:::
:::

The angle $C$ is the included angle between the sides $a$ and $b$, since it
is these two sides that meet at vertex $C$. In the same way the angle $B$
is the included angle between the sides $a$ and $c$, and the angle $A$ the included angle between
the sides $b$ and $c$. So the area theorem works for triangles where two sides
and the included angle are known.

::: exempel "Example 1: Calculate the area of a triangle"
**Calculate the area of the triangle below.**

::: figur
<svg viewBox="10 8 190 210" width="258" height="285" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A triangle ABC where the angle A is 80 degrees, the side AC is 11 centimetres and the side AB is 8 centimetres."><polygon points="60,190 172,190 86.74,38.34" fill="none" stroke="#1f2530" stroke-width="1.8"/><path d="M 82,190 A 22 22 0 0 0 63.82,168.33" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="88.34" y="166.22" font-size="13" text-anchor="middle" fill="#1f2530">80°</text><text x="116" y="208" font-size="13" text-anchor="middle" fill="#1f2530">8 cm</text><text x="59.58" y="111.74" font-size="13" text-anchor="end" fill="#1f2530">11 cm</text><text x="50" y="206" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">A</tspan></text><text x="182" y="206" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">B</tspan></text><text x="86.74" y="26.34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">C</tspan></text></svg>
:::

::: handskrift
typ: areasatsen
:::

::: textlosning
The only known angle is $A = 80^\circ$. It is the included angle between
the sides $11$ cm and $8$ cm (the side opposite $A$ is not needed). Substituting into
the area theorem gives

$$
T = \frac{bc\sin A}{2} = \frac{11 \cdot 8\sin 80^\circ}{2} \approx 43.331\ldots\ \text{cm}^2 \approx 43.3\ \text{cm}^2
$$

**Answer:** $T \approx 43.3\ \text{cm}^2$
:::
:::

::: exempel "Example 2: Determine an included angle"
**A triangle has the area $10$ cm². One side is $4.0$ cm and another is
$12.0$ cm. Determine the included angle between these sides.**

::: handskrift
typ: areasatsvinkel
:::

::: textlosning
We set up the area theorem $T = \dfrac{ab\sin C}{2}$ with $T = 10$ cm²,
$a = 4.0$ cm and $b = 12.0$ cm, and then solve for $\sin C$.

$$
10 = \frac{4.0 \cdot 12.0 \cdot \sin C}{2} \quad\iff\quad \sin C = \frac{2 \cdot 10}{4.0 \cdot 12.0} = 0.416\ldots
$$

$$
C_1 = \sin^{-1}(0.416\ldots) \approx 24.624\ldots^\circ \approx 25^\circ
$$

$$
C_2 = 180^\circ - C_1 \approx 180^\circ - 25^\circ = 155^\circ
$$

**Answer:** $C \approx 25^\circ$ or $C \approx 155^\circ$

Note that **both** angles give valid triangles; see the figure below.
Unlike when we determine angles with the sine rule (next section),
where the angle sum sometimes rules out one of the solutions, there is no such
condition here: the area and two sides do not determine the triangle uniquely.

::: figur
<svg viewBox="-2 -4 320 94" width="486" height="143" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two triangles with the sides 4.0 and 12.0 centimetres. In the left one the included angle is 25 degrees, in the right one 155 degrees. Both give the same area."><polygon points="6,62 46,62 114.76,11.29" fill="none" stroke="#1f2530" stroke-width="1.6"/><path d="M 26,62 A 20 20 0 0 0 24.13,53.55" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="54.82" y="51.18" font-size="12.5" text-anchor="middle" fill="#1f2530">25°</text><text x="26" y="80" font-size="12" text-anchor="middle" fill="#1f2530">4.0 cm</text><text x="51.93" y="18.51" font-size="12" text-anchor="end" fill="#1f2530">12.0 cm</text><polygon points="186,62 306,62 149.75,45.10" fill="none" stroke="#1f2530" stroke-width="1.6"/><path d="M 206,62 A 20 20 0 0 0 167.87,53.55" fill="none" stroke="#1f2530" stroke-width="1.2"/><text x="196.82" y="13.18" font-size="12.5" text-anchor="middle" fill="#1f2530">155°</text><text x="246" y="80" font-size="12" text-anchor="middle" fill="#1f2530">12.0 cm</text><text x="167.87" y="31.55" font-size="12" text-anchor="middle" fill="#1f2530">4.0 cm</text></svg>
:::
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The area theorem"
- $T = \dfrac{ab\sin C}{2} = \dfrac{ac\sin B}{2} = \dfrac{bc\sin A}{2}$.
- The theorem gives the area of the triangle **without the height needing to be known**.
- Use it when two sides and the included angle are known.
:::

::: sampunkt "Included angle"
- The included angle is the angle where the two sides meet.
- The angle $C$ is the included angle between $a$ and $b$, the angle $A$ between $b$ and $c$.
- The side opposite the known angle is not needed.
:::

::: sampunkt "The proof"
- Draw the height $h$ from a vertex. Then $\sin A = \dfrac{h}{b}$, so $h = b\sin A$.
- Substituting into $T = \dfrac{\text{base} \cdot \text{height}}{2}$ gives $T = \dfrac{bc\sin A}{2}$.
:::

::: sampunkt "Finding the angle"
- Solve for $\sin C$ from the area theorem and use $\sin^{-1}$.
- Also find the second solution, $C_2 = 180^\circ - C_1$.
- Here **both** angles give valid triangles with the same area, unlike with the sine rule, where the angle sum often rules out one of them.
:::

:::
