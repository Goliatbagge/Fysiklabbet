---
kalla: fb5f3b6129
id: maspec-4.2
title: Basis vectors and vector coordinates
course: Matematik specialisering
chapter: Vektorer
chapterNumber: 4
section: '4.2'
---

# Basis vectors and vector coordinates

In the previous section we drew vectors and calculated with them graphically. That
works, but it is laborious and easily becomes imprecise. Here we introduce
a way of describing a vector with two numbers, so that the calculation can be done
with numbers instead of with a ruler.

The starting point is that a vector can always be **resolved into components**
along two given directions, as long as the directions are not parallel. In a
plane we choose the directions using two vectors, $\vec{e}_x$ and
$\vec{e}_y$. If they are not parallel, every vector in the plane can be written
as a sum of a part along $\vec{e}_x$ and a part along
$\vec{e}_y$. The pair of vectors is then called **basis vectors**, and we say that they
form a **basis**.

::: figur
<svg viewBox="-4 -6 179 130" width="243" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A coordinate system with the basis vectors e_x along the x-axis and e_y along the y-axis, both one square long. The vector u goes from the origin four squares to the right and three up. Dashed components 4 e_x and 3 e_y show the decomposition."><line x1="0" y1="0" x2="0" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="168" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="168" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="168" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="168" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="168" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="160" y2="96" stroke="#1f2530" stroke-width="1.4"/><polygon points="168,96 159,92 159,100" fill="#1f2530"/><line x1="24" y1="120" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="166" y="112" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="96.0" x2="38.0" y2="96.0" stroke="#c8324a" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,96.0) rotate(0.0)" fill="#c8324a"/><text x="36.0" y="112.8" font-size="14" text-anchor="middle" fill="#c8324a"><tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">x</tspan><tspan dy="-3"></tspan></text><line x1="24.0" y1="96.0" x2="24.0" y2="82.0" stroke="#c8324a" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(24.0,72.0) rotate(-90.0)" fill="#c8324a"/><text x="15.6" y="86.4" font-size="14" text-anchor="end" fill="#c8324a"><tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">y</tspan><tspan dy="-3"></tspan></text><line x1="24.0" y1="96.0" x2="120.0" y2="96.0" stroke="#2563c9" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="120.0" y1="96.0" x2="120.0" y2="24.0" stroke="#2563c9" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="96.0" x2="112.0" y2="30.0" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,24.0) rotate(-36.9)" fill="#1f2530"/><text x="54.1" y="55.2" font-size="14" fill="#1f2530"><tspan font-style="italic">u</tspan></text><line x1="53.1" y1="42.199999999999996" x2="62.1" y2="42.199999999999996" stroke="#1f2530" stroke-width="1"/><polygon points="65.1,42.199999999999996 61.1,40.199999999999996 61.1,44.199999999999996" fill="#1f2530"/><text x="124.8" y="63.6" font-size="14" text-anchor="start" fill="#2563c9">3<tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">y</tspan><tspan dy="-3"></tspan></text><text x="88.8" y="112.8" font-size="14" text-anchor="middle" fill="#2563c9">4<tspan font-style="italic">e</tspan><tspan font-size="10" dy="3">x</tspan><tspan dy="-3"></tspan></text><circle cx="24.0" cy="96.0" r="3" fill="#1f2530"/></svg>

The vector $\vec{u}$ is resolved into the components $4\vec{e}_x$ and
$3\vec{e}_y$. The coordinates of $\vec{u}$ are $(4,\ 3)$.
:::

In the figure, $\vec{u} = 4\vec{e}_x + 3\vec{e}_y$. If the basis vectors are
understood, it is enough to give the numbers: $\vec{u} = (4,\ 3)$. The numbers
4 and 3 are called the vector's **coordinates** or **components**, and
the vectors $4\vec{e}_x$ and $3\vec{e}_y$ are its **component vectors**.
The basis vectors themselves have the coordinates $\vec{e}_x = (1,\ 0)$ and
$\vec{e}_y = (0,\ 1)$. That basis is called the **standard basis**.

::: formel "Basis vectors and coordinates"
If $\vec{e}_x$ and $\vec{e}_y$ are not parallel, every vector in
the plane can be written in exactly one way as

$$
\vec{u} = x\vec{e}_x + y\vec{e}_y = (x,\ y)
$$

- The numbers $x$ and $y$ are the vector's **coordinates** (components).
- The vectors $x\vec{e}_x$ and $y\vec{e}_y$ are the vector's **component vectors**.
- If the basis vectors are also **perpendicular** to each other and have
  **length 1**, the basis is called an **ON basis** (orthonormal basis). That is
  the basis we use unless otherwise stated.
:::

The abbreviation ON stands for *orthonormal*: *ortho* from orthogonal, which
means perpendicular, and *normal(ised)*, which means that the basis vectors have
length 1. In an ordinary coordinate system with equal steps on both
axes, $\vec{e}_x$ and $\vec{e}_y$ are exactly such a basis.

## Calculating in coordinate form

With coordinates, vector calculation becomes simple. When two vectors are added,
the first coordinates are added separately and the second ones separately, and
when a vector is multiplied by a number, both
coordinates are multiplied by the number. The rules follow directly from the fact that the components
along $\vec{e}_x$ and along $\vec{e}_y$ can be treated separately.

::: formel "Rules in coordinate form"
If $\vec{u} = (x_1,\ y_1)$, $\vec{v} = (x_2,\ y_2)$ and $k$ is a
real number, then

$$
\vec{u} + \vec{v} = (x_1 + x_2,\ y_1 + y_2)
$$

$$
\vec{u} - \vec{v} = (x_1 - x_2,\ y_1 - y_2)
$$

$$
k\vec{u} = (kx_1,\ ky_1)
$$
:::

::: exempel "Example 1: Calculate with coordinates"
**The vectors $\vec{u} = (2,\ -3)$ and $\vec{v} = (-4,\ 1)$ are given.
Find the coordinates of<br>a)&nbsp;$\vec{u} + \vec{v}$&emsp;&emsp;b)&nbsp;$\vec{u} - \vec{v}$&emsp;&emsp;c)&nbsp;$4\vec{u}$<br>d)&nbsp;$3\vec{u} - 2\vec{v}$&emsp;&emsp;e)&nbsp;$2(\vec{u} + \vec{v})$**

::: handskrift
typ: koordinatrakning
:::

::: textlosning
**a)** The coordinates are added separately:

$$
\vec{u} + \vec{v} = (2 + (-4),\ -3 + 1) = (-2,\ -2)
$$

The result can be checked graphically: if $\vec{v}$ is drawn with its start at
the tip of $\vec{u}$, the sum goes two squares to the left and two squares
down.

::: figur
<svg viewBox="-4 -4 224 152" width="304" height="206" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The vector u goes two squares to the right and three down. The vector v starts at the tip of u and goes four squares to the left and one up. The sum u plus v goes from the starting point two squares to the left and two down."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="216" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="216" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="216" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="216" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="216" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="216" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="216" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120.0" y1="24.0" x2="162.5" y2="87.7" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(168.0,96.0) rotate(56.3)" fill="#c8324a"/><text x="158.4" y="55.2" font-size="14" fill="#c8324a"><tspan font-style="italic">u</tspan></text><line x1="157.4" y1="42.199999999999996" x2="166.4" y2="42.199999999999996" stroke="#c8324a" stroke-width="1"/><polygon points="169.4,42.199999999999996 165.4,40.199999999999996 165.4,44.199999999999996" fill="#c8324a"/><line x1="168.0" y1="96.0" x2="81.7" y2="74.4" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,72.0) rotate(-166.0)" fill="#c8324a"/><text x="121.3" y="94.8" font-size="14" fill="#c8324a"><tspan font-style="italic">v</tspan></text><line x1="120.3" y1="81.80000000000001" x2="129.3" y2="81.80000000000001" stroke="#c8324a" stroke-width="1"/><polygon points="132.3,81.80000000000001 128.3,79.80000000000001 128.3,83.80000000000001" fill="#c8324a"/><line x1="120.0" y1="24.0" x2="79.1" y2="64.9" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(72.0,72.0) rotate(135.0)" fill="#2563c9"/><text x="66.6" y="33.6" font-size="14" fill="#2563c9"><tspan font-style="italic">u</tspan></text><line x1="65.6" y1="20.60000000000001" x2="74.6" y2="20.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="77.6,20.60000000000001 73.6,18.60000000000001 73.6,22.60000000000001" fill="#2563c9"/><text x="74.6" y="33.6" font-size="14" text-anchor="start" fill="#2563c9"> + </text><text x="89.6" y="33.6" font-size="14" fill="#2563c9"><tspan font-style="italic">v</tspan></text><line x1="88.6" y1="20.60000000000001" x2="97.6" y2="20.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="100.6,20.60000000000001 96.6,18.60000000000001 96.6,22.60000000000001" fill="#2563c9"/><circle cx="120.0" cy="24.0" r="3" fill="#1f2530"/></svg>
:::

**b)** The coordinates are subtracted separately:

$$
\vec{u} - \vec{v} = (2 - (-4),\ -3 - 1) = (6,\ -4)
$$

**c)** Both coordinates are multiplied by 4:

$$
4\vec{u} = (4 \cdot 2,\ 4 \cdot (-3)) = (8,\ -12)
$$

**d)** First the multiples, then the subtraction:

$$
3\vec{u} - 2\vec{v} = (6,\ -9) - (-8,\ 2) = (6 - (-8),\ -9 - 2) = (14,\ -11)
$$

**e)** The sum $\vec{u} + \vec{v} = (-2,\ -2)$ has already been calculated in a):

$$
2(\vec{u} + \vec{v}) = 2 \cdot (-2,\ -2) = (-4,\ -4)
$$

**Answer:** a) $(-2,\ -2)$&emsp;&emsp;b) $(6,\ -4)$&emsp;&emsp;c) $(8,\ -12)$&emsp;&emsp;d) $(14,\ -11)$&emsp;&emsp;e) $(-4,\ -4)$
:::
:::

## Parallel vectors

In the previous section we saw that $\vec{u}$ and $k\vec{u}$ are always
parallel. This also gives a way of deciding whether two given vectors are
parallel: investigate whether one can be written as a number times the
other. In coordinate form this means that both coordinates must be
multiplied by the same number.

::: formel "Parallel vectors"
Two vectors $\vec{u}$ and $\vec{v}$ are parallel if and only if there
is a number $k \neq 0$ such that

$$
\vec{u} = k\vec{v}
$$

For example, $(6,\ -4)$ and $(-3,\ 2)$ are parallel, since
$(6,\ -4) = -2 \cdot (-3,\ 2)$. On the other hand, $(6,\ -4)$ and $(3,\ 2)$
are not parallel: $6 = 2 \cdot 3$, but $-4 \neq 2 \cdot 2$.
:::

::: exempel "Example 2: Find a number so that the vectors become parallel"
**Find the real number $t$ so that the vector $(5,\ 1) + t(1,\ 2)$
becomes parallel to the vector $(1,\ 1)$.**

::: handskrift
typ: parallellt
:::

::: textlosning
We first write the vector in coordinate form:

$$
(5,\ 1) + t(1,\ 2) = (5 + t,\ 1 + 2t)
$$

It must be parallel to $(1,\ 1)$, so there must be a number $k$
such that

$$
(5 + t,\ 1 + 2t) = k(1,\ 1) = (k,\ k)
$$

Equal vectors have equal coordinates. The first coordinate gives
$5 + t = k$ and the second gives $1 + 2t = k$. Both expressions are equal to
$k$, so they are equal to each other:

$$
5 + t = 1 + 2t
$$

$$
t = 4
$$

The number $k$ becomes $5 + 4 = 9$. Check: $(5,\ 1) + 4(1,\ 2) = (9,\ 9)
= 9 \cdot (1,\ 1)$, which is indeed parallel to $(1,\ 1)$.

::: figur
<svg viewBox="-4 -6 275 274" width="373" height="372" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Coordinate system. The vector (5, 1) from the origin, then four times (1, 2) from its tip up to the point (9, 9). The sum (9, 9) is drawn in blue from the origin and lies along the dashed line through the origin with direction (1, 1)."><line x1="0" y1="0" x2="0" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="216" y1="0" x2="216" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="0" x2="240" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="264" y1="0" x2="264" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="264" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="264" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="264" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="264" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="264" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="264" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="264" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="168" x2="264" y2="168" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="192" x2="264" y2="192" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="216" x2="264" y2="216" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="240" x2="264" y2="240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="264" x2="264" y2="264" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="240" x2="256" y2="240" stroke="#1f2530" stroke-width="1.4"/><polygon points="264,240 255,236 255,244" fill="#1f2530"/><line x1="24" y1="264" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="262" y="256" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="240.0" x2="254.4" y2="9.6" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="24.0" y1="240.0" x2="134.2" y2="218.0" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,216.0) rotate(-11.3)" fill="#c8324a"/><text x="96.0" y="258.0" font-size="14" text-anchor="middle" fill="#c8324a">(5, 1)</text><line x1="144.0" y1="216.0" x2="235.5" y2="32.9" stroke="#c8324a" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,24.0) rotate(-63.4)" fill="#c8324a"/><text x="199.2" y="129.6" font-size="14" text-anchor="start" fill="#c8324a">4 · (1, 2)</text><line x1="24.0" y1="240.0" x2="232.9" y2="31.1" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(240.0,24.0) rotate(-45.0)" fill="#2563c9"/><text x="122.4" y="88.8" font-size="14" text-anchor="end" fill="#2563c9">(9, 9) = 9 · (1, 1)</text><line x1="24.0" y1="240.0" x2="40.9" y2="223.1" stroke="#1f2530" stroke-width="2.6" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,216.0) rotate(-45.0)" fill="#1f2530"/><text x="62.4" y="219.6" font-size="14" text-anchor="start" fill="#1f2530">(1, 1)</text><circle cx="24.0" cy="240.0" r="3" fill="#1f2530"/></svg>
:::

**Answer:** $t = 4$
:::
:::

## Position vectors and the vector between two points

All vectors with the same coordinates are the same vector, just as in the previous
section: they belong to the same equivalence class. When vectors are drawn in
a coordinate system it is therefore important to distinguish between the coordinates of a **vector**
and the coordinates of a **point**. A point has a fixed
position, but a vector may be moved.

The origin links the two. The vector in the equivalence class
that starts at the origin is called the **position vector**, and its coordinates are
the same as the coordinates of the point where it ends. So the point
$P = (4,\ 3)$ has the position vector $\overrightarrow{OP} = (4,\ 3)$.

::: figur
<svg viewBox="-4 -6 242 154" width="328" height="209" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Coordinate system with the origin O, the points P1 and P2 and their position vectors from the origin. The vector P1P2 goes from P1 to P2 and is drawn in blue."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="192" y1="0" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="192" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="192" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="192" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="192" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="192" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="192" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="192" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="184" y2="120" stroke="#1f2530" stroke-width="1.4"/><polygon points="192,120 183,116 183,124" fill="#1f2530"/><line x1="24" y1="144" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="190" y="136" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="120.0" x2="45.6" y2="33.7" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(48.0,24.0) rotate(-76.0)" fill="#1f2530"/><line x1="24.0" y1="120.0" x2="134.7" y2="75.7" stroke="#1f2530" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,72.0) rotate(-21.8)" fill="#1f2530"/><line x1="48.0" y1="24.0" x2="135.1" y2="67.5" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(144.0,72.0) rotate(26.6)" fill="#2563c9"/><circle cx="48.0" cy="24.0" r="3" fill="#1f2530"/><circle cx="144.0" cy="72.0" r="3" fill="#1f2530"/><circle cx="24.0" cy="120.0" r="3" fill="#1f2530"/><text x="55.2" y="12.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan> = (<tspan font-style="italic">x</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan>, <tspan font-style="italic">y</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan>)</text><text x="147.6" y="82.8" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan> = (<tspan font-style="italic">x</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan>, <tspan font-style="italic">y</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan>)</text><text x="20.4" y="136.8" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">O</tspan> = (0, 0)</text><text x="98.4" y="39.6" font-size="14" fill="#2563c9"><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">1</tspan><tspan dy="-3"></tspan><tspan font-style="italic">P</tspan><tspan font-size="10" dy="3">2</tspan><tspan dy="-3"></tspan></text><line x1="97.4" y1="25.60000000000001" x2="124.4" y2="25.60000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="127.4,25.60000000000001 123.4,23.60000000000001 123.4,27.60000000000001" fill="#2563c9"/></svg>

The position vectors $\overrightarrow{OP_1}$ and $\overrightarrow{OP_2}$ go
from the origin. The vector $\overrightarrow{P_1P_2}$ goes from $P_1$ to
$P_2$.
:::

A vector that starts at the point $P_1$ and ends at the point $P_2$
is denoted $\overrightarrow{P_1P_2}$. In the figure we see that you get
to $P_2$ either directly along $\overrightarrow{OP_2}$ or by
first going to $P_1$ and then along $\overrightarrow{P_1P_2}$.
So $\overrightarrow{OP_1} + \overrightarrow{P_1P_2} =
\overrightarrow{OP_2}$, which gives the vector between the points.

::: formel "The vector between two points"
If $P_1 = (x_1,\ y_1)$ and $P_2 = (x_2,\ y_2)$, then

$$
\overrightarrow{P_1P_2} = \overrightarrow{OP_2} - \overrightarrow{OP_1} = (x_2 - x_1,\ y_2 - y_1)
$$

So the coordinates of the vector are **the coordinates of the end point minus
those of the starting point**.
:::

::: exempel "Example 3: Vectors between points"
**The points $A = (-1,\ 2)$ and $B = (4,\ -1)$ are given.
Find<br>a)&nbsp;$\overrightarrow{AB}$&emsp;&emsp;b)&nbsp;$\overrightarrow{BA}$<br>c) the point $C$ such that $\overrightarrow{AC} = (2,\ 6)$.**

::: handskrift
typ: punktvektor
:::

::: textlosning
**a)** The coordinates of the end point minus those of the starting point:

$$
\overrightarrow{AB} = (4 - (-1),\ -1 - 2) = (5,\ -3)
$$

**b)** Now $B$ is the starting point and $A$ the end point:

$$
\overrightarrow{BA} = (-1 - 4,\ 2 - (-1)) = (-5,\ 3)
$$

As expected, $\overrightarrow{BA} = -\overrightarrow{AB}$.

**c)** The point $C$ is reached by going from $A$ along
$\overrightarrow{AC}$. The position vector of $C$ is therefore
$\overrightarrow{OC} = \overrightarrow{OA} + \overrightarrow{AC}$:

$$
\overrightarrow{OC} = (-1,\ 2) + (2,\ 6) = (1,\ 8)
$$

The point $C$ has the same coordinates as its position vector.

**Answer:** a) $(5,\ -3)$&emsp;&emsp;b) $(-5,\ 3)$&emsp;&emsp;c) $C = (1,\ 8)$
:::
:::

## The length of a vector in an ON basis

In many applications you need to know how long a vector is. The length
is also called the vector's **magnitude** and is written $|\vec{u}|$. The magnitude is
a number that is never negative: every vector has a length, and
the zero vector is the only one with length 0.

In an ON basis the length is easy to calculate. The coordinates $x$ and $y$ are
the legs of a right-angled triangle where the vector is the hypotenuse, so
Pythagoras' theorem gives the length directly.

::: formel "The length of a vector"
In an ON basis the vector $\vec{u} = (x,\ y)$ has length

$$
|\vec{u}| = \sqrt{x^2 + y^2}
$$

::: figur
<svg viewBox="-4 -6 179 154" width="243" height="209" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The vector u with coordinates (x, y) drawn from the origin. Dashed lines form a right-angled triangle with the legs x along the x-axis and y vertical, where u is the hypotenuse."><line x1="0" y1="0" x2="0" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="24" y1="0" x2="24" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="0" x2="48" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="0" x2="72" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="0" x2="96" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="0" x2="144" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="0" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="0" x2="168" y2="0" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="24" x2="168" y2="24" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="48" x2="168" y2="48" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="72" x2="168" y2="72" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="96" x2="168" y2="96" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="168" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="144" x2="168" y2="144" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="120" x2="160" y2="120" stroke="#1f2530" stroke-width="1.4"/><polygon points="168,120 159,116 159,124" fill="#1f2530"/><line x1="24" y1="144" x2="24" y2="8" stroke="#1f2530" stroke-width="1.4"/><polygon points="24,0 20,9 28,9" fill="#1f2530"/><text x="166" y="136" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="34" y="12" font-size="14" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="24.0" y1="120.0" x2="112.0" y2="54.0" stroke="#2563c9" stroke-width="2.2" stroke-linecap="butt"/><polygon points="0,0 -10,4.5 -10,-4.5" transform="translate(120.0,48.0) rotate(-36.9)" fill="#2563c9"/><line x1="24.0" y1="120.0" x2="120.0" y2="120.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><line x1="120.0" y1="120.0" x2="120.0" y2="48.0" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="4 4"/><rect x="110" y="110" width="10" height="10" fill="none" stroke="#1f2530" stroke-width="1.1"/><text x="72.0" y="132.0" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="126.0" y="86.4" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="30.0" y="64.8" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">u</tspan> = (<tspan font-style="italic">x</tspan>, <tspan font-style="italic">y</tspan>)</text><line x1="29.0" y1="50.80000000000001" x2="37.0" y2="50.80000000000001" stroke="#2563c9" stroke-width="1"/><polygon points="40.0,50.80000000000001 36.0,48.80000000000001 36.0,52.80000000000001" fill="#2563c9"/><circle cx="24.0" cy="120.0" r="3" fill="#1f2530"/></svg>
:::

::: härledning "Proof: the length formula"
In an ON basis the $x$-direction and the $y$-direction are perpendicular to
each other, and one step is equally long in both directions. The vector
$\vec{u} = (x,\ y)$ can therefore be drawn as the hypotenuse of a right-angled
triangle with the legs $x$ and $y$, as in the figure. Pythagoras' theorem gives

$$
|\vec{u}|^2 = x^2 + y^2
$$

and since a length cannot be negative,
$|\vec{u}| = \sqrt{x^2 + y^2}$. If $x$ or $y$ is negative it makes
no difference, since the numbers are squared.
:::
:::

::: exempel "Example 4: Calculate lengths"
**The vectors $\vec{u} = (3,\ -4)$ and $\vec{v} = (-2,\ 1)$ are given.
Calculate<br>a)&nbsp;$|\vec{u}|$&emsp;&emsp;b)&nbsp;$|\vec{u} - 2\vec{v}|$**

::: handskrift
typ: koordinatbelopp
:::

::: textlosning
**a)** The coordinates are substituted into the formula:

$$
|\vec{u}| = \sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = \sqrt{25} = 5
$$

**b)** First the coordinates of $\vec{u} - 2\vec{v}$ are calculated, then
the length:

$$
\vec{u} - 2\vec{v} = (3,\ -4) - (-4,\ 2) = (7,\ -6)
$$

$$
|\vec{u} - 2\vec{v}| = \sqrt{7^2 + (-6)^2} = \sqrt{49 + 36} = \sqrt{85} \approx 9.2
$$

**Answer:** a) $5$&emsp;&emsp;b) $\sqrt{85} \approx 9.2$
:::
:::

::: kuriosa "Other ways of measuring a vector"
The length $\sqrt{x^2 + y^2}$ is also called the vector's **Euclidean norm**.
A norm is a measure that assigns to every vector a number that is not
negative, and there are more such measures than the ordinary distance.
One example is the **maximum norm**, the largest of the absolute values of the coordinates: for
$(3,\ -4)$ it is 4. Another is the sum of the
absolute values of the coordinates, here $3 + 4 = 7$, which describes how far
you walk in a grid of streets where you can only turn at right angles.
In this course we always mean the Euclidean norm when we say
length.
:::

::: sammanfattning "Summary"

::: sampunkt "Basis and coordinates"
- **Basis vectors** $\vec{e}_x$, $\vec{e}_y$: two non-parallel
  vectors from which every vector can be built.
- $\vec{u} = x\vec{e}_x + y\vec{e}_y = (x,\ y)$. The numbers are
  **coordinates**, the parts $x\vec{e}_x$ and $y\vec{e}_y$ are
  **component vectors**.
- **ON basis**: the basis vectors are perpendicular and have length 1.
:::

::: sampunkt "Calculating in coordinate form"
- Add and subtract **coordinate by coordinate**:
  $(x_1,\ y_1) + (x_2,\ y_2) = (x_1 + x_2,\ y_1 + y_2)$.
- Number times vector: both coordinates are multiplied,
  $k(x,\ y) = (kx,\ ky)$.
- **Parallel** exactly when $\vec{u} = k\vec{v}$ for some number
  $k \neq 0$.
:::

::: sampunkt "Points and vectors"
- **The position vector** $\overrightarrow{OP}$ goes from the origin and has the same
  coordinates as the point $P$.
- $\overrightarrow{P_1P_2} = (x_2 - x_1,\ y_2 - y_1)$: end point
  minus starting point.
:::

::: sampunkt "Length"
- In an ON basis: $|\vec{u}| = \sqrt{x^2 + y^2}$ for $\vec{u} = (x,\ y)$.
- Pythagoras' theorem with the coordinates as legs. The signs make no
  difference since the numbers are squared.
- The length is also called the **magnitude** or Euclidean norm.
:::
:::
