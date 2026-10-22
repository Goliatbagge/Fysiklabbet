---
kalla: 7ff9102a3b
id: ma2c-4.12
title: The intersecting chords theorem and cyclic quadrilaterals
course: Matematik nivå 2c
chapter: Geometri
chapterNumber: 4
section: '4.12'
---

# The intersecting chords theorem and cyclic quadrilaterals

A line segment between two points on the circumference of a circle is called a **chord**.

::: formel "The intersecting chords theorem"
If two chords cross each other, the product of the parts of one chord
is equal to the product of the parts of the other chord.

$$
a \cdot b = c \cdot d
$$

::: härledning "Proof: The intersecting chords theorem"
We draw two arbitrary crossing chords $AC$ and $BD$ that cross
each other at the point $E$, and draw two auxiliary line segments $AD$ and $BC$
as in the figure below.

::: figur
<svg viewBox="2 2 142 142" width="225" height="225" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A circle with the chords A C and B D that cross each other at the point E, and the auxiliary line segments A D and B C."><circle cx="70" cy="70" r="56" fill="none" stroke="#1f2530" stroke-width="1.6"/><line x1="42" y1="21.5" x2="89.2" y2="122.6" stroke="#1f2530" stroke-width="1.4"/><line x1="14.2" y1="74.9" x2="124.1" y2="55.5" stroke="#1f2530" stroke-width="1.4"/><line x1="42" y1="21.5" x2="14.2" y2="74.9" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><line x1="124.1" y1="55.5" x2="89.2" y2="122.6" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><text x="40" y="15" font-size="12" text-anchor="middle" fill="#1f2530">A</text><text x="132" y="52" font-size="12" text-anchor="start" fill="#1f2530">B</text><text x="92" y="136" font-size="12" text-anchor="middle" fill="#1f2530">C</text><text x="8" y="82" font-size="12" text-anchor="middle" fill="#1f2530">D</text><text x="66" y="60" font-size="12" text-anchor="middle" fill="#1f2530">E</text></svg>
:::

We compare the triangles $ADE$ and $BCE$:

$$
\angle ADB = \angle ACB \quad \text{(inscribed angles on the same arc)}
$$

$$
\angle DAC = \angle DBC \quad \text{(inscribed angles on the same arc)}
$$

$$
\angle AED = \angle BEC \quad \text{(vertically opposite angles)}
$$

The angles of the triangles are equal $\implies \triangle ADE \sim \triangle BCE$
(similar). We set up the side ratios, with $a = AE$, $b = EC$,
$c = DE$ and $d = EB$:

$$
\frac{a}{d} = \frac{c}{b}
$$

Cross-multiplication gives

$$
a \cdot b = c \cdot d
$$

QED
:::
:::

::: figur
<svg viewBox="8 8 128 128" width="203" height="203" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A circle with two chords that cross each other. The parts of one chord are a and b, the parts of the other chord are c and d."><circle cx="70" cy="70" r="56" fill="none" stroke="#1f2530" stroke-width="1.6"/><line x1="42" y1="21.5" x2="89.2" y2="122.6" stroke="#1f2530" stroke-width="1.4"/><line x1="14.2" y1="74.9" x2="124.1" y2="55.5" stroke="#1f2530" stroke-width="1.4"/><text x="45" y="46" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="84" y="99" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="36" y="64" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">c</tspan></text><text x="95" y="52" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">d</tspan></text></svg>
:::

A quadrilateral with all its vertices on the circumference of a circle is called a **cyclic
quadrilateral** (inscribed quadrilateral).

::: formel "Opposite angles in a cyclic quadrilateral"
The sum of opposite angles in a cyclic quadrilateral is 180°.

$$
u + v = 180°
$$

$$
x + y = 180°
$$

::: härledning "Proof: Opposite angles in a cyclic quadrilateral"
We draw an arbitrary cyclic quadrilateral. We call two opposite
vertices $u$ and $v$ and want to show that $u + v = 180°$. We draw two
auxiliary line segments from two opposite vertices to the centre of the circle as in
the figure below.

::: figur
<svg viewBox="6 6 144 144" width="228" height="228" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A circle with a cyclic quadrilateral. The angles u and v at two opposite vertices are marked, and auxiliary line segments are drawn to the centre, where the central angles 2v and 2u are formed."><circle cx="80" cy="80" r="62" fill="none" stroke="#1f2530" stroke-width="1.6"/><polygon points="63.9,20.1 18.9,90.8 58.8,138.3 138.3,58.8" fill="none" stroke="#1f2530" stroke-width="1.4"/><line x1="80" y1="80" x2="63.9" y2="20.1" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><line x1="80" y1="80" x2="58.8" y2="138.3" stroke="#1f2530" stroke-width="1.1" stroke-dasharray="5 4"/><circle cx="80" cy="80" r="2.4" fill="#1f2530"/><path d="M 26.6,100 A 12 12 0 0 0 25.4,80.7" fill="none" stroke="#1f2530" stroke-width="1"/><text x="36" y="93" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">v</tspan></text><path d="M 129.1,68 A 13 13 0 0 1 126.8,52.8" fill="none" stroke="#1f2530" stroke-width="1"/><text x="116" y="66" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">u</tspan></text><path d="M 76.5,66.8 A 13.7 13.7 0 1 1 75.3,92.9" fill="none" stroke="#1f2530" stroke-width="1"/><text x="104" y="84" font-size="11" text-anchor="middle" fill="#1f2530">2<tspan font-style="italic">v</tspan></text><path d="M 73.5,97.9 A 19 19 0 0 1 75.1,61.7" fill="none" stroke="#1f2530" stroke-width="1"/><text x="53" y="82" font-size="11" text-anchor="middle" fill="#1f2530">2<tspan font-style="italic">u</tspan></text></svg>
:::

According to the inscribed angle theorem, the central angles are then $2u$ and
$2v$. Then

$$
2u + 2v = 360° \quad \text{(a full turn)}
$$

We divide both sides by 2 and get

$$
u + v = 180°
$$

QED
:::
:::

::: exempel "Example 1: The intersecting chords theorem"
**Determine the length of the side marked $x$.**

::: figur
<svg viewBox="8 6 172 161" width="272" height="255" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A circle with two chords that cross each other. The parts of one chord are x and 10 millimetres, the parts of the other chord are 18 and 20 millimetres."><circle cx="85" cy="85" r="72" fill="none" stroke="#1f2530" stroke-width="1.6"/><line x1="138.8" y1="37.1" x2="66.2" y2="154.5" stroke="#1f2530" stroke-width="1.4"/><line x1="28" y1="129" x2="142" y2="129" stroke="#1f2530" stroke-width="1.4"/><circle cx="138.8" cy="37.1" r="2.4" fill="#1f2530"/><circle cx="66.2" cy="154.5" r="2.4" fill="#1f2530"/><circle cx="28" cy="129" r="2.4" fill="#1f2530"/><circle cx="142" cy="129" r="2.4" fill="#1f2530"/><circle cx="82" cy="129" r="2.4" fill="#1f2530"/><text x="118" y="91.8" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="67.3" y="141.5" font-size="12" text-anchor="end" fill="#1f2530">10</text><text x="55" y="123" font-size="12" text-anchor="middle" fill="#1f2530">18</text><text x="112" y="123" font-size="12" text-anchor="middle" fill="#1f2530">20</text><text x="176" y="16" font-size="11" text-anchor="end" fill="#1f2530">(mm)</text></svg>
:::

::: handskrift
typ: kordasatsen
:::

::: textlosning
The intersecting chords theorem gives

$$
10x = 18 \cdot 20
$$

We simplify and solve for $x$:

$$
10x = 360
$$

$$
x = \frac{360}{10} = 36
$$

**Answer:** 36 mm
:::
:::

::: exempel "Example 2: Cyclic quadrilateral"
**Determine the angle $x$.**

::: figur
<svg viewBox="8 8 140 140" width="222" height="222" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="A circle with the centre M and a cyclic quadrilateral. The angle 115 degrees is marked at the upper vertex and the angle x at the opposite lower vertex."><circle cx="80" cy="80" r="62" fill="none" stroke="#1f2530" stroke-width="1.6"/><polygon points="63.9,20.1 18.9,90.8 58.8,138.3 138.3,58.8" fill="none" stroke="#1f2530" stroke-width="1.4"/><circle cx="80" cy="80" r="2" fill="#1f2530"/><text x="87" y="86" font-size="11" text-anchor="start" fill="#1f2530">M</text><path d="M 56.9,31.1 A 13 13 0 0 0 75.4,26.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="66" y="48" font-size="11" text-anchor="middle" fill="#1f2530">115°</text><path d="M 50.4,128.3 A 13 13 0 0 1 68,129.1" fill="none" stroke="#1f2530" stroke-width="1"/><text x="56" y="118" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text></svg>
:::

::: handskrift
typ: inskrivenfyrhorning
:::

::: textlosning
Opposite angles in a cyclic quadrilateral add up to 180°:

$$
x + 115° = 180° \quad \text{(opposite angles in a cyclic quadrilateral)}
$$

$$
x = 180° - 115° = 65°
$$

**Answer:** $x = 65°$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Chord"
- A **line segment between two points on the circumference of the circle**.
- A diameter is the longest possible chord.
:::

::: sampunkt "The intersecting chords theorem"
- If two chords cross each other, **the product of the parts of one
  chord** is equal to the product of the parts of the other.
- $a \cdot b = c \cdot d$
:::

::: sampunkt "The proof"
- Draw two auxiliary line segments, and two triangles are formed.
- They have equal angles thanks to **inscribed angles on the same arc** and
  **vertically opposite angles**, so they are similar.
- The side ratios and cross-multiplication give the theorem.
:::

::: sampunkt "Cyclic quadrilateral"
- A quadrilateral with **all four vertices on the circumference**.
- The sum of **opposite** angles is $180^\circ$.
- $u + v = 180^\circ$ and $x + y = 180^\circ$.
:::

::: sampunkt "Why it is true"
- The inscribed angle theorem gives the central angles $2u$ and $2v$.
- Together they make up a full turn:
  $2u + 2v = 360^\circ$.
- Dividing by 2 gives $u + v = 180^\circ$.
:::
:::
