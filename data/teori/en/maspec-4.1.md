---
kalla: b1ce3bf76a
id: maspec-4.1
title: Basic vector operations
course: Matematik specialisering
chapter: Vektorer
chapterNumber: 4
section: '4.1'
---

# Basic vector operations

The result of a measurement is written as a numerical value followed by a unit, for
example the distance $s = 2.0\ \mathrm{m}$. For many quantities that is the whole
description: a mass of $3.5\ \mathrm{kg}$ or a
temperature of $21\ ^\circ\mathrm{C}$ has no direction. Such quantities
are called **scalar**.

Other quantities are not fully described until you also give
a direction. A force of $10\ \mathrm{N}$ can pull to the right or to the
left, and a displacement of $500\ \mathrm{m}$ can go north or
south. Quantities that have both magnitude and direction are called
**vector quantities**, and they are described with **vectors**. A vector is drawn as
an arrow: the length of the arrow gives the magnitude and the direction of the arrow gives
the direction.

::: formel "Scalar and vector"
- A **scalar** quantity is completely described by a numerical value and a unit.
  Examples: mass, time, energy, temperature and distance.
- A **vector** quantity also has a direction. Examples: force,
  velocity, acceleration, displacement and momentum.
- A vector is drawn as an arrow and denoted with an arrow above
  the letter, for example $\vec{u}$. The length of the arrow is the magnitude of the vector
  and the direction of the arrow is the direction of the vector.
:::

Because vectors have a direction, they cannot be added like ordinary numbers.
Two forces of $3\ \mathrm{N}$ and $8\ \mathrm{N}$ together give
$11\ \mathrm{N}$ only if they pull in the same direction. If they pull in opposite directions,
they partly cancel each other out. The first example shows what the sum looks like
in that case.

::: exempel "Example 1: Two vectors along the same line"
**The vectors $\vec{u}$ and $\vec{v}$ point in exactly opposite directions.
The vector $\vec{u}$ has length 3 and the vector $\vec{v}$ has length 8.
Find the sum $\vec{u} + \vec{v}$.**

::: figur
<svg viewBox="-4 -12 272 112" width="369" height="151" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two vectors on a grid. The vector u is three squares long and points to the left. The vector v is eight squares long and points to the right."><line x1="0" y1="0" x2="0" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="264" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="264" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="264" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="264" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96.0" y1="24.0" x2="34.0" y2="24.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,24.0) rotate(180.0)" fill="#c8324a"/><text x="56.5" y="8.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="55.5" y1="-4.599999999999998" x2="64.5" y2="-4.599999999999998" stroke="#c8324a" stroke-width="1"/><polygon points="67.5,-4.599999999999998 63.5,-6.599999999999998 63.5,-2.599999999999998" fill="#c8324a"/><line x1="24.0" y1="72.0" x2="206.0" y2="72.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,72.0) rotate(0.0)" fill="#c8324a"/><text x="116.5" y="56.4" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="115.5" y1="43.400000000000006" x2="124.5" y2="43.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="127.5,43.400000000000006 123.5,41.400000000000006 123.5,45.400000000000006" fill="#c8324a"/></svg>
:::

::: handskrift
typ: vektorsammalinje
:::

::: textlosning
Vectors are added by placing them one after the other: the second vector
starts where the first one ends. We first draw $\vec{v}$ and then let
$\vec{u}$ start at the tip of $\vec{v}$.

::: figur
<svg viewBox="-4 -12 272 136" width="369" height="184" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The vector v drawn first, eight squares to the right. The vector u starts where v ends and goes three squares to the left. The sum u plus v goes from the starting point to the end point and is five squares long, directed to the right."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="264" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="264" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="264" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="264" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="264" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="24.0" x2="206.0" y2="24.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,24.0) rotate(0.0)" fill="#c8324a"/><text x="116.5" y="8.4" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="115.5" y1="-4.6000000000000085" x2="124.5" y2="-4.6000000000000085" stroke="#c8324a" stroke-width="1"/><polygon points="127.5,-4.6000000000000085 123.5,-6.6000000000000085 123.5,-2.6000000000000085" fill="#c8324a"/><line x1="216.0" y1="48.0" x2="154.0" y2="48.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,48.0) rotate(180.0)" fill="#c8324a"/><text x="176.5" y="64.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="175.5" y1="51.80000000000001" x2="184.5" y2="51.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="187.5,51.80000000000001 183.5,49.80000000000001 183.5,53.80000000000001" fill="#c8324a"/><line x1="216.0" y1="24.0" x2="216.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="96.0" x2="134.0" y2="96.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,96.0) rotate(0.0)" fill="#2563c9"/><text x="69.0" y="80.4" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="68.0" y1="67.4" x2="77.0" y2="67.4" stroke="#2563c9" stroke-width="1"/><polygon points="80.0,67.4 76.0,65.4 76.0,69.4" fill="#2563c9"/><text x="77.0" y="80.4" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="92.0" y="80.4" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="91.0" y1="67.4" x2="100.0" y2="67.4" stroke="#2563c9" stroke-width="1"/><polygon points="103.0,67.4 99.0,65.4 99.0,69.4" fill="#2563c9"/></svg>
:::

The sum $\vec{u} + \vec{v}$ is the vector from the first starting point to
the last tip. Since $\vec{u}$ goes back three squares of the eight
that $\vec{v}$ went forward, the sum is $8 - 3 = 5$ squares long, pointing in
the same direction as the longer vector $\vec{v}$.

**Answer:** $\vec{u} + \vec{v}$ has length 5 and the same direction as
$\vec{v}$.
:::
:::

With ordinary addition we would have got $3 + 8 = 11$, but the vector sum has
length 5. So the direction must always be taken into account. In Example 1 the
vectors lay along the same line, and then it is enough to add and
subtract lengths. If the vectors are at an angle to each other, we need
geometry: if they are **perpendicular**, the length of the sum can be calculated with
Pythagoras' theorem, and for other angles we use the sine rule or
the cosine rule.

::: exempel "Example 2: Two perpendicular forces"
**Two forces that are perpendicular to each other act on a body.
The force $\vec{F}_1$ has magnitude $6.0\ \mathrm{N}$ and the force
$\vec{F}_2$ has magnitude $8.0\ \mathrm{N}$. Find the magnitude of
the vector sum $\vec{F} = \vec{F}_1 + \vec{F}_2$.**

::: figur
<svg viewBox="-8 -4 156 128" width="211" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two forces starting from the same point: F1 points straight up and F2 straight to the right. The resultant F is drawn dashed as the diagonal of the rectangle spanned by the forces."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="144" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="144" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="144" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="144" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="144" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="24.0" y2="34.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,24.0) rotate(-90.0)" fill="#c8324a"/><text x="-1.7" y="48.0" font-size="14" fill="#c8324a"><tspan font-style="italic">F</tspan><tspan font-size="10" dy="3">1</tspan></text><line x1="-2.7" y1="35.0" x2="8.8" y2="35.0" stroke="#c8324a" stroke-width="1"/><polygon points="11.8,35.0 7.8,33.0 7.8,37.0" fill="#c8324a"/><line x1="24.0" y1="96.0" x2="110.0" y2="96.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,96.0) rotate(0.0)" fill="#c8324a"/><text x="64.5" y="110.4" font-size="14" fill="#c8324a"><tspan font-style="italic">F</tspan><tspan font-size="10" dy="3">2</tspan></text><line x1="63.5" y1="97.39999999999999" x2="75.1" y2="97.39999999999999" stroke="#c8324a" stroke-width="1"/><polygon points="78.1,97.39999999999999 74.1,95.39999999999999 74.1,99.39999999999999" fill="#c8324a"/><line x1="24.0" y1="96.0" x2="112.0" y2="30.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt" stroke-dasharray="6 4"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,24.0) rotate(-36.9)" fill="#2563c9"/><text x="81.6" y="36.0" font-size="14" fill="#2563c9"><tspan font-style="italic">F</tspan></text><line x1="80.6" y1="23.0" x2="92.2" y2="23.0" stroke="#2563c9" stroke-width="1"/><polygon points="95.2,23.0 91.2,21.0 91.2,25.0" fill="#2563c9"/><circle cx="24.0" cy="96.0" r="3" fill="#1f2530"/></svg>

The vector sum $\vec{F}$ is called the **resultant**. It is drawn dashed
because it replaces the two forces: either $\vec{F}_1$ and
$\vec{F}_2$ act on the body, or $\vec{F}$ acts alone. The effect on
the body is the same.
:::

::: handskrift
typ: vinkelratakrafter
:::

::: textlosning
The forces are perpendicular, so $\vec{F}_1$, $\vec{F}_2$ and the resultant
$\vec{F}$ form a right-angled triangle where $\vec{F}$ is the hypotenuse.
Pythagoras' theorem gives

$$
|\vec{F}|^2 = 6.0^2 + 8.0^2 = 36 + 64 = 100
$$

$$
|\vec{F}| = \sqrt{100} = 10
$$

So the resultant has magnitude $10\ \mathrm{N}$. Notice that
this is less than $6.0 + 8.0 = 14$: the forces pull in different directions,
so they do not reinforce each other fully.

**Answer:** $10\ \mathrm{N}$
:::
:::

## Vectors as directed line segments

A vector is a **directed line segment**: a line segment with a starting point and an
end point, where the arrowhead marks the end point. Two directed line segments
count as **the same vector** if they are equally long and have the same direction.
Where on the paper they are drawn does not matter. So a vector may be
translated in any way without changing.

This can be compared with fractions. The numbers $\dfrac{2}{3}$ and $\dfrac{4}{6}$ look
different but are the same number, and in a calculation you choose the form that
suits best at the moment. In the same way, all the arrows in the figure below are
the same vector $\vec{u}$, and when we calculate with $\vec{u}$ we may use
whichever of them we like. We say that the arrows belong to the same
**equivalence class**.

::: figur
<svg viewBox="-4 -4 296 152" width="402" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Five arrows on a grid, all the same length and pointing the same way, diagonally up to the right. Each one is labelled u."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="288" y1="0" x2="288" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="288" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="288" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="288" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="288" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="288" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="288" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="288" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="120.0" x2="64.0" y2="90.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,84.0) rotate(-36.9)" fill="#c8324a"/><text x="57.7" y="118.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="56.7" y1="105.80000000000001" x2="65.7" y2="105.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="68.7,105.80000000000001 64.7,103.80000000000001 64.7,107.80000000000001" fill="#c8324a"/><line x1="96.0" y1="96.0" x2="136.0" y2="66.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,60.0) rotate(-36.9)" fill="#c8324a"/><text x="129.7" y="94.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="128.7" y1="81.80000000000001" x2="137.7" y2="81.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="140.7,81.80000000000001 136.7,79.80000000000001 136.7,83.80000000000001" fill="#c8324a"/><line x1="168.0" y1="120.0" x2="208.0" y2="90.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,84.0) rotate(-36.9)" fill="#c8324a"/><text x="201.7" y="118.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="200.7" y1="105.80000000000001" x2="209.7" y2="105.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="212.7,105.80000000000001 208.7,103.80000000000001 208.7,107.80000000000001" fill="#c8324a"/><line x1="48.0" y1="48.0" x2="88.0" y2="18.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,12.0) rotate(-36.9)" fill="#c8324a"/><text x="81.7" y="46.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="80.7" y1="33.800000000000004" x2="89.7" y2="33.800000000000004" stroke="#c8324a" stroke-width="1"/><polygon points="92.7,33.800000000000004 88.7,31.800000000000004 88.7,35.800000000000004" fill="#c8324a"/><line x1="192.0" y1="60.0" x2="232.0" y2="30.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,24.0) rotate(-36.9)" fill="#c8324a"/><text x="225.7" y="58.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="224.7" y1="45.800000000000004" x2="233.7" y2="45.800000000000004" stroke="#c8324a" stroke-width="1"/><polygon points="236.7,45.800000000000004 232.7,43.800000000000004 232.7,47.800000000000004" fill="#c8324a"/></svg>

Five directed line segments that are all the same vector $\vec{u}$.
:::

There are several ways of showing that a letter denotes a vector. In
printed text bold is often used, $\mathbf{u}$, and by hand it is
common to put a line or an arrow above the letter. Here the arrow is
always used, $\vec{u}$.

::: formel "Equal vectors"
Two vectors are equal, $\vec{u} = \vec{v}$, if they have **the same length and
the same direction**. The starting point is not part of the vector: a vector that
is translated is still the same vector.
:::

## Addition of vectors

There are two graphical methods for adding vectors, and they
always give the same result.

::: formel "The polygon method and the parallelogram method"
**The polygon method.** The vectors are placed one after the other, so that the next vector
starts where the previous one ends. The sum is the vector from the starting point of the first
vector to the tip of the last vector. The method works
just as well for three or more vectors.

**The parallelogram method.** The vectors $\vec{u}$ and $\vec{v}$ are drawn from
the same starting point and completed into a parallelogram with $\vec{u}$
and $\vec{v}$ as sides. The sum $\vec{u} + \vec{v}$ is the diagonal from
the common starting point.

For vectors the **commutative law** holds, $\vec{u} + \vec{v} =
\vec{v} + \vec{u}$. So it does not matter which vector you
start with.
:::

::: exempel "Example 3: Add graphically with both methods"
**The figure shows the vectors $\vec{u}$ and $\vec{v}$. Construct the sum
$\vec{u} + \vec{v}$ graphically with<br>a) the polygon method&emsp;&emsp;b) the parallelogram method.**

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two vectors on a grid. The vector u goes three squares to the right and two up. The vector v goes two squares to the right and three down."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="87.7" y2="53.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,48.0) rotate(-33.7)" fill="#c8324a"/><text x="46.9" y="50.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="45.9" y1="37.400000000000006" x2="54.9" y2="37.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="57.9,37.400000000000006 53.9,35.400000000000006 53.9,39.400000000000006" fill="#c8324a"/><line x1="144.0" y1="24.0" x2="186.5" y2="87.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(192.0,96.0) rotate(56.3)" fill="#c8324a"/><text x="186.0" y="43.2" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="185.0" y1="30.199999999999996" x2="194.0" y2="30.199999999999996" stroke="#c8324a" stroke-width="1"/><polygon points="197.0,30.199999999999996 193.0,28.199999999999996 193.0,32.199999999999996" fill="#c8324a"/></svg>
:::

::: handskrift
typ: polygonparallellogram
:::

::: textlosning
**a)** We draw $\vec{u}$ and then translate $\vec{v}$ so
that it starts at the tip of $\vec{u}$. The sum $\vec{u} + \vec{v}$ goes
from the starting point of $\vec{u}$ to the tip of $\vec{v}$.

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The triangle (polygon) method: v has been translated so that it starts at the tip of u. The sum u plus v goes from the starting point of u to the tip of v."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="87.7" y2="53.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,48.0) rotate(-33.7)" fill="#c8324a"/><text x="46.9" y="50.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="45.9" y1="37.400000000000006" x2="54.9" y2="37.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="57.9,37.400000000000006 53.9,35.400000000000006 53.9,39.400000000000006" fill="#c8324a"/><line x1="96.0" y1="48.0" x2="138.5" y2="111.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,120.0) rotate(56.3)" fill="#c8324a"/><text x="133.2" y="67.2" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="132.2" y1="54.19999999999999" x2="141.2" y2="54.19999999999999" stroke="#c8324a" stroke-width="1"/><polygon points="144.2,54.19999999999999 140.2,52.19999999999999 140.2,56.19999999999999" fill="#c8324a"/><line x1="24.0" y1="96.0" x2="134.2" y2="118.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,120.0) rotate(11.3)" fill="#2563c9"/><text x="69.0" y="129.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="68.0" y1="116.60000000000002" x2="77.0" y2="116.60000000000002" stroke="#2563c9" stroke-width="1"/><polygon points="80.0,116.60000000000002 76.0,114.60000000000002 76.0,118.60000000000002" fill="#2563c9"/><text x="77.0" y="129.6" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="92.0" y="129.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="91.0" y1="116.60000000000002" x2="100.0" y2="116.60000000000002" stroke="#2563c9" stroke-width="1"/><polygon points="103.0,116.60000000000002 99.0,114.60000000000002 99.0,118.60000000000002" fill="#2563c9"/><circle cx="24.0" cy="96.0" r="3" fill="#1f2530"/></svg>
:::

**b)** We draw $\vec{u}$ and $\vec{v}$ from the same point and
complete the parallelogram with two dashed sides, parallel
to $\vec{v}$ and $\vec{u}$. The sum $\vec{u} + \vec{v}$ is the diagonal
from the common starting point.

::: figur
<svg viewBox="-4 -16 224 164" width="304" height="223" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The parallelogram method: u and v start at the same point, the parallelogram is completed with dashed sides, and the sum u plus v is the diagonal from the starting point."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="48.0" x2="87.7" y2="5.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,0.0) rotate(-33.7)" fill="#c8324a"/><text x="44.5" y="3.6" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="43.5" y1="-9.399999999999991" x2="52.5" y2="-9.399999999999991" stroke="#c8324a" stroke-width="1"/><polygon points="55.5,-9.399999999999991 51.5,-11.399999999999991 51.5,-7.3999999999999915" fill="#c8324a"/><line x1="24.0" y1="48.0" x2="66.5" y2="111.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,120.0) rotate(56.3)" fill="#c8324a"/><text x="31.4" y="93.6" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="30.4" y1="80.6" x2="39.4" y2="80.6" stroke="#c8324a" stroke-width="1"/><polygon points="42.4,80.6 38.4,78.6 38.4,82.6" fill="#c8324a"/><line x1="96.0" y1="0.0" x2="144.0" y2="72.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="72.0" y1="120.0" x2="144.0" y2="72.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="48.0" x2="134.2" y2="70.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,72.0) rotate(11.3)" fill="#2563c9"/><text x="149.4" y="75.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="148.4" y1="62.599999999999994" x2="157.4" y2="62.599999999999994" stroke="#2563c9" stroke-width="1"/><polygon points="160.4,62.599999999999994 156.4,60.599999999999994 156.4,64.6" fill="#2563c9"/><text x="157.4" y="75.6" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="172.4" y="75.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="171.4" y1="62.599999999999994" x2="180.4" y2="62.599999999999994" stroke="#2563c9" stroke-width="1"/><polygon points="183.4,62.599999999999994 179.4,60.599999999999994 179.4,64.6" fill="#2563c9"/><circle cx="24.0" cy="48.0" r="3" fill="#1f2530"/></svg>
:::

Both methods give the same vector: five squares to the right and one square down.
:::
:::

## Multiplying a vector by a number

When a vector is multiplied by a number, only the length changes. The vector
$3\vec{u}$ is three times as long as $\vec{u}$ and points in the same
direction. If the number is negative, the arrow is reversed: $-2\vec{u}$ is twice as long as
$\vec{u}$ and points in exactly the opposite direction. This means that $\vec{u}$ and
$k\vec{u}$ are always parallel, however the number $k$ is chosen.

::: formel "Vector times number"
If $k$ is a real number and $\vec{u}$ a vector, then $k\vec{u}$ is a
vector that

- is $|k|$ times as long as $\vec{u}$,
- has the same direction as $\vec{u}$ if $k > 0$ and the opposite direction if
  $k < 0$.

Two vectors $\vec{u}$ and $\vec{v}$ are **parallel** exactly when there
is a number $k$ such that $\vec{u} = k\vec{v}$.
:::

::: exempel "Example 4: Multiples of vectors"
**The figure shows the vectors $\vec{u}$ and $\vec{v}$. Construct
the vectors<br>a)&nbsp;$3\vec{u}$&emsp;&emsp;b)&nbsp;$-\vec{v}$&emsp;&emsp;c)&nbsp;$-2\vec{v}$**

::: figur
<svg viewBox="-4 -4 200 128" width="271" height="174" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two vectors on a grid. The vector u goes two squares to the right and one up. The vector v goes one square to the left and two up."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="192" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="192" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="192" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="192" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="63.1" y2="76.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,72.0) rotate(-26.6)" fill="#c8324a"/><text x="44.5" y="64.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="43.5" y1="51.80000000000001" x2="52.5" y2="51.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="55.5,51.80000000000001 51.5,49.80000000000001 51.5,53.80000000000001" fill="#c8324a"/><line x1="144.0" y1="96.0" x2="124.5" y2="56.9" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,48.0) rotate(-116.6)" fill="#c8324a"/><text x="146.4" y="57.6" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="145.4" y1="44.599999999999994" x2="154.4" y2="44.599999999999994" stroke="#c8324a" stroke-width="1"/><polygon points="157.4,44.599999999999994 153.4,42.599999999999994 153.4,46.599999999999994" fill="#c8324a"/></svg>
:::

::: handskrift
typ: vektorgangertal
:::

::: textlosning
The vector $\vec{u}$ goes two squares to the right and one square up. The vector
$\vec{v}$ goes one square to the left and two squares up.

**a)** $3\vec{u}$ is three times as long as $\vec{u}$ and has the same
direction: $3 \cdot 2 = 6$ squares to the right and $3 \cdot 1 = 3$ squares
up.

**b)** $-\vec{v}$ is as long as $\vec{v}$ but points the opposite way: one square to the
right and two squares down.

**c)** $-2\vec{v}$ is twice as long as $\vec{v}$ and points the opposite way: two
squares to the right and four squares down. One way to draw it is to first
mark out $-\vec{v}$ and then go the same distance once more.

::: figur
<svg viewBox="-4 -11 344 207" width="467" height="281" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Three constructed vectors: 3u is six squares to the right and three up. Minus v is one square to the right and two down. Minus 2v is two squares to the right and four down."><line x1="0" y1="0" x2="0" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="288" y1="0" x2="288" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="312" y1="0" x2="312" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="336" y1="0" x2="336" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="336" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="336" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="336" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="336" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="336" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="336" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="336" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="336" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="336" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="168.0" x2="159.1" y2="100.5" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(168.0,96.0) rotate(-26.6)" fill="#2563c9"/><text x="79.1" y="110.4" font-size="14" fill="#2563c9">3<tspan font-style="italic">u</tspan></text><line x1="85.7" y1="97.39999999999999" x2="94.7" y2="97.39999999999999" stroke="#2563c9" stroke-width="1"/><polygon points="97.7,97.39999999999999 93.7,95.39999999999999 93.7,99.39999999999999" fill="#2563c9"/><line x1="192.0" y1="24.0" x2="211.5" y2="63.1" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(216.0,72.0) rotate(63.4)" fill="#2563c9"/><text x="218.4" y="36.0" font-size="14" fill="#2563c9">−<tspan font-style="italic">v</tspan></text><line x1="225.5" y1="23.0" x2="234.5" y2="23.0" stroke="#2563c9" stroke-width="1"/><polygon points="237.5,23.0 233.5,21.0 233.5,25.0" fill="#2563c9"/><line x1="240.0" y1="24.0" x2="283.5" y2="111.1" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(288.0,120.0) rotate(63.4)" fill="#2563c9"/><text x="283.2" y="57.6" font-size="14" fill="#2563c9">−2<tspan font-style="italic">v</tspan></text><line x1="297.9" y1="44.60000000000001" x2="306.9" y2="44.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="309.9,44.60000000000001 305.9,42.60000000000001 305.9,46.60000000000001" fill="#2563c9"/><text x="24.0" y="62.4" font-size="14" text-anchor="start" fill="#1f2530">a)</text><text x="172.8" y="4.8" font-size="14" text-anchor="start" fill="#1f2530">b)</text><text x="259.2" y="4.8" font-size="14" text-anchor="start" fill="#1f2530">c)</text></svg>
:::
:::
:::

## Subtraction of vectors

Subtracting a vector means adding the opposite vector. We
therefore do not need a new rule: subtraction builds on the two
operations we already have, addition and multiplication by the number $-1$.

::: formel "Subtraction of vectors"
$$
\vec{u} - \vec{v} = \vec{u} + (-1)\vec{v} = \vec{u} + (-\vec{v})
$$

The difference can be constructed with the polygon method, by placing $-\vec{v}$
at the tip of $\vec{u}$. The simplest way, however, is to draw $\vec{u}$ and
$\vec{v}$ from the same point: then $\vec{u} - \vec{v}$ is **the vector from
the tip of $\vec{v}$ to the tip of $\vec{u}$**.
:::

::: exempel "Example 5: Subtract graphically"
**The vectors $\vec{u}$ and $\vec{v}$ are the same as in Example 3.
Construct the difference $\vec{u} - \vec{v}$ graphically with<br>a) the polygon method&emsp;&emsp;b) the parallelogram method.**

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two vectors on a grid. The vector u goes three squares to the right and two up. The vector v goes two squares to the right and three down."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="96.0" x2="87.7" y2="53.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,48.0) rotate(-33.7)" fill="#c8324a"/><text x="46.9" y="50.4" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="45.9" y1="37.400000000000006" x2="54.9" y2="37.400000000000006" stroke="#c8324a" stroke-width="1"/><polygon points="57.9,37.400000000000006 53.9,35.400000000000006 53.9,39.400000000000006" fill="#c8324a"/><line x1="144.0" y1="24.0" x2="186.5" y2="87.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(192.0,96.0) rotate(56.3)" fill="#c8324a"/><text x="186.0" y="43.2" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="185.0" y1="30.199999999999996" x2="194.0" y2="30.199999999999996" stroke="#c8324a" stroke-width="1"/><polygon points="197.0,30.199999999999996 193.0,28.199999999999996 193.0,32.199999999999996" fill="#c8324a"/></svg>
:::

::: handskrift
typ: vektorsubtraktion
:::

::: textlosning
**a)** We rewrite the difference as an addition,
$\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$. The opposite vector
$-\vec{v}$ is as long as $\vec{v}$ but goes the other way: two squares
to the left and three squares up. We place $-\vec{v}$ with its start at
the tip of $\vec{u}$ and draw $\vec{u} - \vec{v}$ from the starting point of
$\vec{u}$ to the tip of $-\vec{v}$.

::: figur
<svg viewBox="-4 -4 224 200" width="304" height="271" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The polygon method for u minus v: the opposite vector minus v has been placed with its start at the tip of u. The difference u minus v goes from the starting point of u to the tip of minus v."><line x1="0" y1="0" x2="0" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="216" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48.0" y1="144.0" x2="111.7" y2="101.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,96.0) rotate(-33.7)" fill="#c8324a"/><text x="90.1" y="130.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="89.1" y1="117.80000000000001" x2="98.1" y2="117.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="101.1,117.80000000000001 97.1,115.80000000000001 97.1,119.80000000000001" fill="#c8324a"/><line x1="120.0" y1="96.0" x2="77.5" y2="32.3" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,24.0) rotate(-123.7)" fill="#c8324a"/><text x="115.2" y="48.0" font-size="14" fill="#c8324a">−<tspan font-style="italic">v</tspan></text><line x1="122.3" y1="35.0" x2="131.3" y2="35.0" stroke="#c8324a" stroke-width="1"/><polygon points="134.3,35.0 130.3,33.0 130.3,37.0" fill="#c8324a"/><line x1="48.0" y1="144.0" x2="70.0" y2="33.8" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,24.0) rotate(-78.7)" fill="#2563c9"/><text x="16.2" y="67.2" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="15.2" y1="54.19999999999999" x2="24.2" y2="54.19999999999999" stroke="#2563c9" stroke-width="1"/><polygon points="27.2,54.19999999999999 23.2,52.19999999999999 23.2,56.19999999999999" fill="#2563c9"/><text x="24.2" y="67.2" font-size="14" text-anchor="start" fill="#2563c9"> − </text><text x="39.2" y="67.2" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="38.2" y1="54.19999999999999" x2="47.2" y2="54.19999999999999" stroke="#2563c9" stroke-width="1"/><polygon points="50.2,54.19999999999999 46.2,52.19999999999999 46.2,56.19999999999999" fill="#2563c9"/><circle cx="48.0" cy="144.0" r="3" fill="#1f2530"/></svg>
:::

**b)** We draw $\vec{u}$ and $\vec{v}$ from the same point. The difference
$\vec{u} - \vec{v}$ is the vector from the tip of $\vec{v}$ to the tip of
$\vec{u}$. The whole parallelogram does not need to be drawn.

::: figur
<svg viewBox="-4 -4 200 176" width="271" height="239" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="u and v start at the same point. The difference u minus v is the vector from the tip of v to the tip of u."><line x1="0" y1="0" x2="0" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="192" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="192" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="192" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="192" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="192" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="72.0" x2="87.7" y2="29.5" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,24.0) rotate(-33.7)" fill="#c8324a"/><text x="44.5" y="27.6" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="43.5" y1="14.600000000000009" x2="52.5" y2="14.600000000000009" stroke="#c8324a" stroke-width="1"/><polygon points="55.5,14.600000000000009 51.5,12.600000000000009 51.5,16.60000000000001" fill="#c8324a"/><line x1="24.0" y1="72.0" x2="66.5" y2="135.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,144.0) rotate(56.3)" fill="#c8324a"/><text x="31.4" y="117.6" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="30.4" y1="104.60000000000001" x2="39.4" y2="104.60000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="42.4,104.60000000000001 38.4,102.60000000000001 38.4,106.60000000000001" fill="#c8324a"/><line x1="72.0" y1="144.0" x2="94.0" y2="33.8" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(96.0,24.0) rotate(-78.7)" fill="#2563c9"/><text x="105.0" y="81.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="104.0" y1="68.6" x2="113.0" y2="68.6" stroke="#2563c9" stroke-width="1"/><polygon points="116.0,68.6 112.0,66.6 112.0,70.6" fill="#2563c9"/><text x="113.0" y="81.6" font-size="14" text-anchor="start" fill="#2563c9"> − </text><text x="128.0" y="81.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="127.0" y1="68.6" x2="136.0" y2="68.6" stroke="#2563c9" stroke-width="1"/><polygon points="139.0,68.6 135.0,66.6 135.0,70.6" fill="#2563c9"/><circle cx="24.0" cy="72.0" r="3" fill="#1f2530"/></svg>
:::

Both methods give the same vector: one square to the right and five squares up.
:::
:::

::: tips "Two diagonals in the same parallelogram"
If $\vec{u}$ and $\vec{v}$ are drawn from the same point, they span a
parallelogram. Its two diagonals are exactly the sum and the difference:
$\vec{u} + \vec{v}$ goes from the common starting point and
$\vec{u} - \vec{v}$ goes from the tip of $\vec{v}$ to the tip of
$\vec{u}$.

::: figur
<svg viewBox="-4 -4 224 200" width="304" height="271" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The parallelogram spanned by u and v. One diagonal, from the common starting point, is u plus v. The other diagonal, from the tip of v to the tip of u, is u minus v."><line x1="0" y1="0" x2="0" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="216" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="216" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24.0" y1="168.0" x2="134.2" y2="146.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,144.0) rotate(-11.3)" fill="#c8324a"/><text x="80.5" y="178.8" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="79.5" y1="165.8" x2="88.5" y2="165.8" stroke="#c8324a" stroke-width="1"/><polygon points="91.5,165.8 87.5,163.8 87.5,167.8" fill="#c8324a"/><line x1="24.0" y1="168.0" x2="45.6" y2="81.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,72.0) rotate(-76.0)" fill="#c8324a"/><text x="19.4" y="120.0" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="18.4" y1="107.0" x2="27.4" y2="107.0" stroke="#c8324a" stroke-width="1"/><polygon points="30.4,107.0 26.4,105.0 26.4,109.0" fill="#c8324a"/><line x1="144.0" y1="144.0" x2="168.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="48.0" y1="72.0" x2="168.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="168.0" x2="160.3" y2="54.4" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(168.0,48.0) rotate(-39.8)" fill="#2563c9"/><text x="171.0" y="37.2" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="170.0" y1="24.199999999999996" x2="179.0" y2="24.199999999999996" stroke="#2563c9" stroke-width="1"/><polygon points="182.0,24.199999999999996 178.0,22.199999999999996 178.0,26.199999999999996" fill="#2563c9"/><text x="179.0" y="37.2" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="194.0" y="37.2" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="193.0" y1="24.199999999999996" x2="202.0" y2="24.199999999999996" stroke="#2563c9" stroke-width="1"/><polygon points="205.0,24.199999999999996 201.0,22.199999999999996 201.0,26.199999999999996" fill="#2563c9"/><line x1="48.0" y1="72.0" x2="136.0" y2="138.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,144.0) rotate(36.9)" fill="#2563c9"/><text x="95.4" y="144.0" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="94.4" y1="131.0" x2="103.4" y2="131.0" stroke="#2563c9" stroke-width="1"/><polygon points="106.4,131.0 102.4,129.0 102.4,133.0" fill="#2563c9"/><text x="103.4" y="144.0" font-size="14" text-anchor="start" fill="#2563c9"> − </text><text x="118.4" y="144.0" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="117.4" y1="131.0" x2="126.4" y2="131.0" stroke="#2563c9" stroke-width="1"/><polygon points="129.4,131.0 125.4,129.0 125.4,133.0" fill="#2563c9"/><circle cx="24.0" cy="168.0" r="3" fill="#1f2530"/></svg>
:::

The figure also shows two relationships that are good to keep in mind. If you follow
$\vec{v}$ and then $\vec{u} - \vec{v}$ you end up at the tip of
$\vec{u}$, that is $\vec{v} + (\vec{u} - \vec{v}) = \vec{u}$. And
if you reverse the arrow of the difference you get
$\vec{u} - \vec{v} = -(\vec{v} - \vec{u})$: the order in a subtraction
determines which way the difference points.
:::

::: sammanfattning "Summary"

::: sampunkt "Scalar and vector"
- **Scalar**: numerical value and unit are enough. Mass, time, energy, temperature.
- **Vector**: also has **direction**. Force, velocity, displacement.
- Drawn as an arrow, denoted $\vec{u}$. The length is the magnitude.
:::

::: sampunkt "The same vector"
- $\vec{u} = \vec{v}$ if **the same length and the same direction**.
- The starting point is not included: a vector may be **translated** freely.
- All equal arrows form an **equivalence class**, like $\dfrac{2}{3}$ and
  $\dfrac{4}{6}$ for fractions.
:::

::: sampunkt "Addition"
- **The polygon method**: tip to start. The sum goes from the first start to
  the last tip.
- **The parallelogram method**: the same starting point, the sum is the diagonal.
- $\vec{u} + \vec{v} = \vec{v} + \vec{u}$. Perpendicular vectors: the length
  with Pythagoras' theorem.
:::

::: sampunkt "Number times vector and subtraction"
- $k\vec{u}$ is $|k|$ times as long. $k < 0$ reverses the direction.
- $\vec{u}$ and $\vec{v}$ are parallel exactly when $\vec{u} = k\vec{v}$.
- $\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$: from the tip of $\vec{v}$
  to the tip of $\vec{u}$ when they start at the same point.
:::
:::
