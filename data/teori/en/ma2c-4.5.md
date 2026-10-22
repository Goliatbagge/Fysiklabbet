---
kalla: 7d16335702
id: ma2c-4.5
title: Pythagoras' theorem
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.5'
---

# Pythagoras' theorem

If we know two sides of a right-angled triangle, we can find
the third with **Pythagoras' theorem**. The longest side of the triangle (opposite the
right angle) is called the **hypotenuse** and the other two sides are called
**legs**.

::: formel "Pythagoras' theorem"
$$
a^2 + b^2 = c^2
$$

The sum of the squares on the two shorter sides is equal to the square
on the hypotenuse.

::: härledning "Derivation: Pythagoras' theorem"
**1.** We form an arbitrary right-angled triangle with the legs $a$
and $b$, and the hypotenuse $c$.

**2.** We then form four identical triangles of this kind and denote
the angles that are not right angles by $\alpha$ and $\beta$. For each triangle

$$
90° + \alpha + \beta = 180° \quad \text{(angle sum of a triangle)}
$$

We subtract 90° from each side and get

$$
\alpha + \beta = 90°
$$

**3.** We arrange the triangles so that they form a large square with
side $(a + b)$, with a smaller quadrilateral with side $c$ inscribed
(see the figure). At each "joint" along the sides of the large square

$$
\alpha + \beta + \text{the angle in between} = 180° \quad \text{(angles on a straight line)}
$$

and since $\alpha + \beta = 90°$, the angle in between must
be 90°. The inscribed quadrilateral with side $c$ is therefore a
square.

::: figur
<svg viewBox="6 6 194 196" width="284" height="286" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A large square with side a plus b built up of four right-angled triangles and an inscribed square with side c."><rect x="20" y="20" width="160" height="160" fill="none" stroke="#1f2530" stroke-width="1.8"/><polygon points="110,20 180,110 90,180 20,90" fill="none" stroke="#1f2530" stroke-width="1.6"/><text x="65" y="14" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="145" y="14" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="188" y="70" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="188" y="150" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="55" y="196" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="145" y="196" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="12" y="60" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="12" y="140" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="133" y="76" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="73" y="70" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text></svg>
:::

**4.** We write the area of the large square in two ways.

Each side of the large square is $(a + b)$, so

$$
\text{Area} = (a + b)^2 = a^2 + 2ab + b^2 \qquad (1)
$$

We can also write the area of the large square as the total
area of the four triangles and the small inscribed square. The area
of each triangle is $\dfrac{ab}{2}$ and the area of the inscribed
square is $c^2$. This gives

$$
\text{Area} = 4 \cdot \frac{ab}{2} + c^2 = 2ab + c^2 \qquad (2)
$$

We have now written the area of the large square in two different ways, and
these expressions must of course be equal, that is (1) = (2). This gives

$$
a^2 + 2ab + b^2 = 2ab + c^2
$$

We subtract $2ab$ from both sides:

$$
a^2 + b^2 = c^2
$$

QED
:::
:::

::: figur
<svg viewBox="16 20 184 82" width="269" height="120" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A right-angled triangle with the legs a and b and the hypotenuse c. Point at or tap a side to show whether it is a leg or the hypotenuse." style="overflow:visible"><style>.m45a-s{cursor:pointer;outline:none}.m45a-s .m45a-ln{transition:stroke-width .18s ease}.m45a-s:hover .m45a-ln,.m45a-s:focus .m45a-ln{stroke-width:3.4}.m45a-s .m45a-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m45a-s:hover .m45a-lbl,.m45a-s:focus .m45a-lbl{opacity:1}</style><rect x="165" y="71" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.1"/><g class="m45a-s" tabindex="0"><line x1="24" y1="82" x2="176" y2="82" stroke="transparent" stroke-width="12"/><line class="m45a-ln" x1="24" y1="82" x2="176" y2="82" stroke="#1f2530" stroke-width="1.8" stroke-linecap="square"/><text x="100" y="96" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><g class="m45a-lbl"><rect x="82" y="61" width="36" height="15" rx="4" fill="#f3eee4"/><text x="100" y="72" font-size="11" text-anchor="middle" fill="#1f2530">Leg</text></g></g><g class="m45a-s" tabindex="0"><line x1="176" y1="82" x2="176" y2="26" stroke="transparent" stroke-width="12"/><line class="m45a-ln" x1="176" y1="82" x2="176" y2="26" stroke="#1f2530" stroke-width="1.8" stroke-linecap="square"/><text x="184" y="58" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">a</tspan></text><g class="m45a-lbl"><rect x="82" y="61" width="36" height="15" rx="4" fill="#f3eee4"/><text x="100" y="72" font-size="11" text-anchor="middle" fill="#1f2530">Leg</text></g></g><g class="m45a-s" tabindex="0"><line x1="176" y1="26" x2="24" y2="82" stroke="transparent" stroke-width="12"/><line class="m45a-ln" x1="176" y1="26" x2="24" y2="82" stroke="#1f2530" stroke-width="1.8" stroke-linecap="square"/><text x="92" y="46" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><g class="m45a-lbl"><rect x="20" y="20" width="116" height="15" rx="4" fill="#f3eee4"/><text x="78" y="31" font-size="11" text-anchor="middle" fill="#1f2530">Hypotenuse is longest</text></g></g></svg>

Point at or tap a side to show whether it is a leg or
the hypotenuse.
:::

If the triangle is right-angled, then $a^2 + b^2 = c^2$. But
the converse also holds, that is if $a^2 + b^2 = c^2$, then the triangle is
right-angled. This is therefore an equivalence, so

$$
a^2 + b^2 = c^2 \iff \text{The triangle is right-angled}
$$

::: exempel "Example 1: Determine the side"
**Determine the side $x$.**

::: figur
<svg viewBox="14 14 176 112" width="257" height="164" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A right-angled triangle with the vertical leg 9 centimetres, the hypotenuse 15 centimetres and the horizontal leg x."><polygon points="34,22 34,102 158,102" fill="none" stroke="#1f2530" stroke-width="1.8"/><rect x="34" y="91" width="11" height="11" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="26" y="66" font-size="13" text-anchor="end" fill="#1f2530">9</text><text x="102" y="52" font-size="13" text-anchor="start" fill="#1f2530">15</text><text x="96" y="118" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="184" y="30" font-size="12" text-anchor="end" fill="#1f2530">(cm)</text></svg>
:::

::: handskrift
typ: pythagorassida
:::

::: textlosning
The side 15 cm is the hypotenuse, since it is opposite the right angle.
Pythagoras' theorem gives

$$
x^2 + 9^2 = 15^2
$$

We calculate and solve for $x$:

$$
x^2 + 81 = 225
$$

$$
x^2 = 144
$$

$$
x = \pm\sqrt{144} = \pm 12
$$

The side must be positive, so we disregard the negative solution, so
$x = 12$ cm.

**Answer:** 12 cm
:::
:::

::: exempel "Example 2: Is the triangle right-angled?"
**The sides of a triangle are 8 cm, 15 cm and 20 cm. Is the triangle
right-angled?**

::: handskrift
typ: ratvinklig
:::

::: textlosning
If the triangle is right-angled, the sum of the squares of the short
sides must be equal to the square of the longest side.

$$
a^2 + b^2 = 8^2 + 15^2 = 64 + 225 = 289
$$

$$
c^2 = 20^2 = 400
$$

$289 \neq 400$, so $a^2 + b^2 = c^2$ does not hold, and then
the triangle is **not** right-angled.

**Answer:** No
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Pythagoras' theorem"
- $a^2 + b^2 = c^2$
- The sum of the squares on the **legs** is equal to the square on
  the **hypotenuse**.
- **The hypotenuse** is the longest side, opposite the right angle.
:::

::: sampunkt "Applies only to right-angled triangles"
- Without a right angle the theorem does not apply.
- The converse also holds: if
  $a^2 + b^2 = c^2$ is true, the triangle **is** right-angled.
:::

::: sampunkt "Solving for a side"
- The hypotenuse: $c = \sqrt{a^2 + b^2}$.
- A leg: $a = \sqrt{c^2 - b^2}$.
- Always substitute **the hypotenuse as $c$**, whatever letter the figure
  uses.
:::

::: sampunkt "The proof in brief"
- Four identical right-angled triangles are arranged into a large square
  with side $a + b$.
- The inscribed quadrilateral with side $c$ turns out to be a **square**,
  since $\alpha + \beta = 90^\circ$.
- The area of the large square is written in **two ways**, and the theorem follows.
:::
:::
