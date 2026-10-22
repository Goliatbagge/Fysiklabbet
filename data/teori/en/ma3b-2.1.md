---
kalla: 78e8f42e9d
id: ma3b-2.1
title: Inequalities and systems of inequalities
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.1'
---

# Inequalities and systems of inequalities

A company that makes two products cannot make as much of them as it likes.
The working time, the material and the money are only enough for a certain amount.
Such limitations are written as **inequalities in two variables**, and each
inequality describes a region in a coordinate system. In the next section we use
the regions to find the best choice. First we need to be able to draw them,
and for that we need straight lines and systems of equations, which you have met at earlier levels.

## Revision: straight lines

::: formel "The equation of a straight line (in gradient form)"
$$
y = kx + m
$$

where

- *k* = slope (gradient)
- *m* = intercept with the *y*-axis
:::

A line is most easily drawn using $m$ and $k$: start at the point $(0, m)$
on the *y*-axis and then go one step to the right and $k$ steps up (down if $k$
is negative). Two special cases are also needed. A **horizontal line** has
the equation $y = b$, for example $y = 4$, and a **vertical line** has
the equation $x = a$, for example $x = 1$. The *x*-axis itself is the line $y = 0$
and the *y*-axis is the line $x = 0$.

In practical problems lines are often written in the form $ax + by = c$, for example
$2x + y = 10$. That form can be rewritten as $y = kx + m$ by
solving for $y$, just as when you solve an equation. Another quick way to
draw the line is to set $x = 0$ and $y = 0$ in turn. Then we get
the line's points of intersection with the axes, and the line is drawn through them.

## Revision: point of intersection and systems of equations

The point where two lines intersect lies on both lines. Its
coordinates therefore satisfy both equations at the same time, and they are
the solution to the **system of equations**. The point of intersection can be read off in a
figure, but it can also be calculated algebraically with the substitution method
or the elimination method. It is safest to calculate, because the point does not
always end up exactly on a grid square.

::: exempel "Example 1: Point of intersection of two lines"
**Two lines have the equations $2x + y = 10$ and $x + y = 7$.<br>a) Write the equation of the first line in the form $y = kx + m$.<br>b) Determine the point of intersection of the lines.**

::: handskrift
typ: optskarning
:::

::: textlosning
**a)** We solve for $y$ by subtracting $2x$ from both sides.

$$
\begin{aligned}
2x + y &= 10 \\
2x + y - 2x &= 10 - 2x \\
y &= -2x + 10
\end{aligned}
$$

**Answer:** $y = -2x + 10$

**b)** We also write the second line in the form $y = kx + m$.

$$
\begin{aligned}
x + y &= 7 \\
x + y - x &= 7 - x \\
y &= -x + 7
\end{aligned}
$$

At the point of intersection both lines have the same $y$-value. So we set
the right-hand sides equal to each other and solve the equation.

$$
\begin{aligned}
-2x + 10 &= -x + 7 \\
-2x + 10 + 2x &= -x + 7 + 2x \\
10 &= x + 7 \\
10 - 7 &= x + 7 - 7 \\
3 &= x
\end{aligned}
$$

We substitute $x = 3$ into $y = -x + 7$ and get $y = -3 + 7 = 4$.

Check in the first equation: $2 \cdot 3 + 4 = 10$. It is correct.

**Answer:** $(3, 4)$
:::
:::

## Inequalities in two variables

A straight line divides the coordinate system into two parts, which are called **half-planes**.
The line $y = x + 1$ in the figure below is the boundary. Above the line the
$y$-value is greater than $x + 1$, and below the line it is smaller.

::: figur
<svg viewBox="-94 -195 258 264" width="350" height="358" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The line y equals x plus 1 divides the coordinate system into two half-planes. The blue half-plane above the line is y greater than x plus 1, the orange half-plane below the line is y less than x plus 1."><line x1="-78" y1="65" x2="-78" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-52" y1="65" x2="-52" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-26" y1="65" x2="-26" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="26" y1="65" x2="26" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="52" y1="65" x2="52" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="78" y1="65" x2="78" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="104" y1="65" x2="104" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="130" y1="65" x2="130" y2="-169" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="52" x2="143" y2="52" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="26" x2="143" y2="26" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-26" x2="143" y2="-26" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-52" x2="143" y2="-52" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-78" x2="143" y2="-78" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-104" x2="143" y2="-104" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-130" x2="143" y2="-130" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-91" y1="-156" x2="143" y2="-156" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="-91,65 -91,65 137.8,-163.8 137.8,-163.8 -91,-163.8" fill="rgba(37,99,201,0.16)" stroke="none"/><polygon points="-91,65 137.8,65 137.8,-163.8 137.8,-163.8 -91,65" fill="rgba(200,100,40,0.13)" stroke="none"/><line x1="-91" y1="0" x2="153" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="161,0 151,-4.5 151,4.5" fill="#1f2530"/><line x1="0" y1="65" x2="0" y2="-179" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-187 -4.5,-177 4.5,-177" fill="#1f2530"/><text x="159" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-181" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="-78" y1="-3.5" x2="-78" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-78" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="-52" y1="-3.5" x2="-52" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-52" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="-26" y1="-3.5" x2="-26" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-26" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="26" y1="-3.5" x2="26" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="26" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="52" y1="-3.5" x2="52" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="52" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="78" y1="-3.5" x2="78" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="78" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="104" y1="-3.5" x2="104" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="104" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="130" y1="-3.5" x2="130" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="130" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="-3.5" y1="52" x2="3.5" y2="52" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="56" font-size="12" text-anchor="end" fill="#1f2530">−2</text><line x1="-3.5" y1="26" x2="3.5" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="30" font-size="12" text-anchor="end" fill="#1f2530">−1</text><line x1="-3.5" y1="-26" x2="3.5" y2="-26" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-22" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-52" x2="3.5" y2="-52" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-48" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-78" x2="3.5" y2="-78" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-74" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-104" x2="3.5" y2="-104" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-100" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-130" x2="3.5" y2="-130" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-126" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-156" x2="3.5" y2="-156" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-152" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-91" y1="65" x2="137.8" y2="-163.8" stroke="#1f2530" stroke-width="2"/><text x="88.7" y="-124.5" font-size="13" text-anchor="middle" fill="#1f2530" transform="rotate(-45 88.7 -124.5)"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">x</tspan> + 1</text><text x="-52" y="-114.4" font-size="14" text-anchor="middle" fill="#2563c9"><tspan font-style="italic">y</tspan> &gt; <tspan font-style="italic">x</tspan> + 1</text><text x="88.4" y="-15.6" font-size="14" text-anchor="middle" fill="#b8641c"><tspan font-style="italic">y</tspan> &lt; <tspan font-style="italic">x</tspan> + 1</text></svg>

The half-plane above the line is the region $y > x + 1$. The half-plane below the line is
the region $y < x + 1$.
:::

::: formel "Inequality in two variables"
- $y > kx + m$ is the half-plane **above** the line $y = kx + m$.
- $y < kx + m$ is the half-plane **below** the line.
- With $<$ and $>$ the line does **not** belong to the region. It is drawn **dashed**.
- With $\leq$ and $\geq$ the line belongs to the region. It is drawn **solid**.
:::

If the inequality does not have $y$ on its own, for example $x + 2y < 6$, we can
either rewrite it or use a **test point**. Choose a point that
does not lie on the line, usually the origin $(0, 0)$, and substitute it into the inequality.
If the inequality holds, the test point lies in the region, and then we shade the side
of the line where the test point lies. If it does not hold, we shade the other
side.

::: tips "Remember"
If both sides of an inequality are multiplied or divided by a **negative**
number, the inequality sign is reversed. That is a common source of error when $y$ is solved for from,
for example, $3x - y \leq 6$. The test point is a good way to check
that you have shaded the right side.
:::

::: exempel "Example 2: Draw an inequality"
**Draw the region described by the inequality $x + 2y < 6$.**

::: handskrift
typ: opthalvplan
:::

::: textlosning
We rewrite the inequality so that $y$ is on its own. First we subtract $x$
from both sides, then we divide both sides by 2. Two is a positive number,
so the inequality sign keeps its direction.

$$
\begin{aligned}
x + 2y &< 6 \\
x + 2y - x &< 6 - x \\
2y &< -x + 6 \\
\dfrac{2y}{2} &< \dfrac{-x + 6}{2} \\
y &< -0.5x + 3
\end{aligned}
$$

The boundary line is $y = -0.5x + 3$. It intersects the *y*-axis at 3 and slopes downwards:
two steps to the right and one step down. The inequality is $<$, so the line does not belong
to the region and is drawn dashed.

We check with the test point $(0, 0)$: $0 + 2 \cdot 0 = 0$, and $0 < 6$
is true. So the origin lies in the region, and we shade the side of the line
where the origin lies, that is, the region below the line.

::: figur
<svg viewBox="-45 -152 276 197" width="375" height="267" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The dashed line x plus 2y equals 6 passes through the points 0 comma 3 and 6 comma 0. The region below the line, where the origin lies, is shaded."><line x1="-28" y1="42" x2="-28" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="28" y1="42" x2="28" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="56" y1="42" x2="56" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="42" x2="84" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="112" y1="42" x2="112" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="140" y1="42" x2="140" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="42" x2="168" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="196" y1="42" x2="196" y2="-126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="28" x2="210" y2="28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-28" x2="210" y2="-28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-56" x2="210" y2="-56" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-84" x2="210" y2="-84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-112" x2="210" y2="-112" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="-42,42 204.4,42 204.4,18.2 -42,-105" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-42" y1="0" x2="220" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="228,0 218,-4.5 218,4.5" fill="#1f2530"/><line x1="0" y1="42" x2="0" y2="-136" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-144 -4.5,-134 4.5,-134" fill="#1f2530"/><text x="226" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-138" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="-28" y1="-3.5" x2="-28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="28" y1="-3.5" x2="28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="56" y1="-3.5" x2="56" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="56" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="84" y1="-3.5" x2="84" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="84" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="112" y1="-3.5" x2="112" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="112" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="140" y1="-3.5" x2="140" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="140" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="168" y1="-3.5" x2="168" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="168" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="196" y1="-3.5" x2="196" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="196" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="-3.5" y1="28" x2="3.5" y2="28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="32" font-size="12" text-anchor="end" fill="#1f2530">−1</text><line x1="-3.5" y1="-28" x2="3.5" y2="-28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-24" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-56" x2="3.5" y2="-56" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-52" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-84" x2="3.5" y2="-84" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-80" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-112" x2="3.5" y2="-112" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-108" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-42" y1="-105" x2="204.4" y2="18.2" stroke="#2563c9" stroke-width="2" stroke-dasharray="7 5"/><text x="120.7" y="-31.5" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(26.6 120.7 -31.5)"><tspan font-style="italic">x</tspan> + 2<tspan font-style="italic">y</tspan> = 6</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="8" y="-8" font-size="12.5" text-anchor="start" fill="#c8324a">Test point (0, 0)</text></svg>

The region $x + 2y < 6$. The line is dashed because it does not belong to
the region.
:::
:::
:::

## Systems of inequalities

Often several inequalities must hold at the same time. They then form a **system of
inequalities**, and the region described is the part of the coordinate system where
**all** the inequalities hold. It is the region where all the shaded half-planes
overlap.

The boundary lines meet at the **vertices** (corner points) of the region. A vertex is therefore a
point of intersection between two boundary lines, and it can be calculated with a
system of equations. In practical problems the quantities cannot be negative. That is why
the conditions $x \geq 0$ and $y \geq 0$ are almost always included. Together
they mean that the region lies in the first quadrant, that is, to the right of
the *y*-axis and above the *x*-axis.

::: exempel "Example 3: Region and vertices"
**A region is described by the inequalities $x \geq 0$, $y \geq 0$, $x + 2y \leq 8$ and $3x + y \leq 9$.<br>a) Draw the region.&emsp;&emsp;b) Determine the vertices of the region.**

::: handskrift
typ: optsystem
:::

::: textlosning
**Solution a)** All the inequalities have the sign $\leq$ or $\geq$, so all
boundary lines are drawn solid.

We draw the line $x + 2y = 8$ through its points of intersection with the axes.
$x = 0$ gives $2y = 8$, so $y = 4$. $y = 0$ gives $x = 8$. The line passes through
$(0, 4)$ and $(8, 0)$.

The line $3x + y = 9$: $x = 0$ gives $y = 9$, and $y = 0$ gives $3x = 9$, so
$x = 3$. The line passes through $(0, 9)$ and $(3, 0)$.

The test point $(0, 0)$ satisfies both inequalities, since $0 \leq 8$ and
$0 \leq 9$. So the region lies on the origin's side of both lines, and
the conditions $x \geq 0$ and $y \geq 0$ limit it to the first quadrant.

::: figur
<svg viewBox="-38 -266 277 292" width="376" height="396" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The lines x plus 2y equals 8 and 3x plus y equals 9 in the first quadrant. The shaded region has the vertices 0 comma 0, 3 comma 0, 2 comma 3 and 0 comma 4."><line x1="25" y1="17.5" x2="25" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="50" y1="17.5" x2="50" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="75" y1="17.5" x2="75" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="100" y1="17.5" x2="100" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="125" y1="17.5" x2="125" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="150" y1="17.5" x2="150" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="175" y1="17.5" x2="175" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="17.5" x2="200" y2="-240" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-25" x2="217.5" y2="-25" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-50" x2="217.5" y2="-50" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-75" x2="217.5" y2="-75" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-100" x2="217.5" y2="-100" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-125" x2="217.5" y2="-125" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-150" x2="217.5" y2="-150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-175" x2="217.5" y2="-175" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-200" x2="217.5" y2="-200" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-17.5" y1="-225" x2="217.5" y2="-225" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="0,0 75,0 50,-75 0,-100" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-17.5" y1="0" x2="227.5" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="235.5,0 225.5,-4.5 225.5,4.5" fill="#1f2530"/><line x1="0" y1="17.5" x2="0" y2="-250" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-258 -4.5,-248 4.5,-248" fill="#1f2530"/><text x="233.5" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-252" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="25" y1="-3.5" x2="25" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="25" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="50" y1="-3.5" x2="50" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="50" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="75" y1="-3.5" x2="75" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="75" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="100" y1="-3.5" x2="100" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="100" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="125" y1="-3.5" x2="125" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="125" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="150" y1="-3.5" x2="150" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="150" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="175" y1="-3.5" x2="175" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="175" y="16" font-size="12" text-anchor="middle" fill="#1f2530">7</text><line x1="200" y1="-3.5" x2="200" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="200" y="16" font-size="12" text-anchor="middle" fill="#1f2530">8</text><line x1="-3.5" y1="-25" x2="3.5" y2="-25" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-21" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-50" x2="3.5" y2="-50" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-46" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-75" x2="3.5" y2="-75" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-71" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-100" x2="3.5" y2="-100" stroke="#1f2530" stroke-width="1.2"/><line x1="-3.5" y1="-125" x2="3.5" y2="-125" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-121" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="-3.5" y1="-150" x2="3.5" y2="-150" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-146" font-size="12" text-anchor="end" fill="#1f2530">6</text><line x1="-3.5" y1="-175" x2="3.5" y2="-175" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-171" font-size="12" text-anchor="end" fill="#1f2530">7</text><line x1="-3.5" y1="-200" x2="3.5" y2="-200" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-196" font-size="12" text-anchor="end" fill="#1f2530">8</text><line x1="-3.5" y1="-225" x2="3.5" y2="-225" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-221" font-size="12" text-anchor="end" fill="#1f2530">9</text><line x1="-10" y1="-105" x2="215" y2="7.5" stroke="#2563c9" stroke-width="2"/><text x="143.1" y="-36.3" font-size="13" text-anchor="middle" fill="#2563c9" transform="rotate(26.6 143.1 -36.3)"><tspan font-style="italic">x</tspan> + 2<tspan font-style="italic">y</tspan> = 8</text><line x1="-5" y1="-240" x2="78.3" y2="10" stroke="#4a7d3a" stroke-width="2"/><text x="3" y="-163.5" font-size="13" text-anchor="middle" fill="#4a7d3a" transform="rotate(71.6 3 -163.5)">3<tspan font-style="italic">x</tspan> + <tspan font-style="italic">y</tspan> = 9</text><circle cx="0" cy="0" r="3.6" fill="#c8324a"/><text x="-6" y="15" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 0)</text><circle cx="75" cy="0" r="3.6" fill="#c8324a"/><text x="79" y="-8" font-size="12.5" text-anchor="start" fill="#c8324a">(3, 0)</text><circle cx="50" cy="-75" r="3.6" fill="#c8324a"/><text x="58" y="-80" font-size="12.5" text-anchor="start" fill="#c8324a">(2, 3)</text><circle cx="0" cy="-100" r="3.6" fill="#c8324a"/><text x="-7" y="-96" font-size="12.5" text-anchor="end" fill="#c8324a">(0, 4)</text></svg>

The region where all four inequalities hold, with the vertices marked.
:::

**Solution b)** Three vertices lie on the axes and can be read off directly: $(0, 0)$,
$(3, 0)$ where the line $3x + y = 9$ intersects the *x*-axis, and $(0, 4)$ where the line
$x + 2y = 8$ intersects the *y*-axis.

The fourth vertex is the point of intersection of the two sloping lines.
We solve the system of equations with the elimination method.

$$
\begin{cases}
x + 2y = 8 \\
3x + y = 9
\end{cases}
$$

We multiply the first equation by $-3$, so that it gets the term
$-3x$, and write out the system again.

$$
\begin{cases}
-3x - 6y = -24 \\
3x + y = 9
\end{cases}
$$

Now we add the equations side by side, so that the $x$-terms cancel each other out.

$$
\begin{aligned}
-5y &= -15 \\
y &= 3
\end{aligned}
$$

We substitute $y = 3$ into the first equation, $x + 2y = 8$:
$x + 2 \cdot 3 = 8$, which gives $x = 8 - 6 = 2$. The fourth vertex is
$(2, 3)$.

**Answer:** $(0, 0)$, $(3, 0)$, $(2, 3)$ and $(0, 4)$
:::
:::

Sometimes it is the other way round: the region is given in a figure, and we are to write the
inequalities that describe it. Then we first determine the equation of each
boundary line. Then we decide on which side of the line the region lies, and whether
the line is dashed or solid.

::: exempel "Example 4: Determine the inequalities for a region"
**The shaded region in the figure is bounded by three lines. Determine the inequalities that describe the region.**

::: figur
<svg viewBox="-45 -183 248 231" width="337" height="314" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A shaded triangular region bounded by a solid vertical line, a solid horizontal line and a dashed sloping line."><line x1="-28" y1="44.8" x2="-28" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="28" y1="44.8" x2="28" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="56" y1="44.8" x2="56" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="44.8" x2="84" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="112" y1="44.8" x2="112" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="140" y1="44.8" x2="140" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="168" y1="44.8" x2="168" y2="-156.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="28" x2="182" y2="28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-28" x2="182" y2="-28" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-56" x2="182" y2="-56" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-84" x2="182" y2="-84" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-112" x2="182" y2="-112" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="-42" y1="-140" x2="182" y2="-140" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><polygon points="28,0 140,-112 28,-112" fill="rgba(37,99,201,0.16)" stroke="none"/><line x1="-42" y1="0" x2="192" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="200,0 190,-4.5 190,4.5" fill="#1f2530"/><line x1="0" y1="44.8" x2="0" y2="-166.8" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-174.8 -4.5,-164.8 4.5,-164.8" fill="#1f2530"/><text x="198" y="19" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9" y="-168.8" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><line x1="-28" y1="-3.5" x2="-28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="-28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="28" y1="-3.5" x2="28" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="28" y="16" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="56" y1="-3.5" x2="56" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="56" y="16" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="84" y1="-3.5" x2="84" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="84" y="16" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="112" y1="-3.5" x2="112" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="112" y="16" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="140" y1="-3.5" x2="140" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="140" y="16" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="168" y1="-3.5" x2="168" y2="3.5" stroke="#1f2530" stroke-width="1.2"/><text x="168" y="16" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="-3.5" y1="28" x2="3.5" y2="28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="32" font-size="12" text-anchor="end" fill="#1f2530">−1</text><line x1="-3.5" y1="-28" x2="3.5" y2="-28" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-24" font-size="12" text-anchor="end" fill="#1f2530">1</text><line x1="-3.5" y1="-56" x2="3.5" y2="-56" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-52" font-size="12" text-anchor="end" fill="#1f2530">2</text><line x1="-3.5" y1="-84" x2="3.5" y2="-84" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-80" font-size="12" text-anchor="end" fill="#1f2530">3</text><line x1="-3.5" y1="-112" x2="3.5" y2="-112" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-108" font-size="12" text-anchor="end" fill="#1f2530">4</text><line x1="-3.5" y1="-140" x2="3.5" y2="-140" stroke="#1f2530" stroke-width="1.2"/><text x="-6" y="-136" font-size="12" text-anchor="end" fill="#1f2530">5</text><line x1="28" y1="44.8" x2="28" y2="-154" stroke="#1f2530" stroke-width="2"/><line x1="0" y1="-112" x2="179.2" y2="-112" stroke="#1f2530" stroke-width="2"/><line x1="-16.8" y1="44.8" x2="179.2" y2="-151.2" stroke="#1f2530" stroke-width="2" stroke-dasharray="7 5"/></svg>
:::

::: handskrift
typ: optbestamolikheter
:::

::: textlosning
**The vertical line** passes through $x = 1$ on the *x*-axis, so its equation is
$x = 1$. It is solid and the region lies to the right of it. That gives
$x \geq 1$.

**The horizontal line** passes through 4 on the *y*-axis, so its equation is
$y = 4$. It is solid and the region lies below it. That gives $y \leq 4$.

**The sloping line** intersects the *y*-axis at $-1$, so $m = -1$. If we go one step to the
right along the line, we go one step up, so $k = 1$. The equation of the line is
$y = x - 1$. It is dashed and the region lies above it. That gives
$y > x - 1$.

We check with the point $(2, 2)$, which lies inside the region:
$2 \geq 1$, $2 \leq 4$ and $2 > 2 - 1$. All three are true.

**Answer:**
$\begin{cases} x \geq 1 \\ y \leq 4 \\ y > x - 1 \end{cases}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Straight lines"
- $y = kx + m$: slope $k$, intercept $m$ with the *y*-axis.
- $ax + by = c$ is rewritten by solving for $y$.
- Horizontal line $y = b$, vertical line $x = a$.
:::

::: sampunkt "Half-planes"
- A line divides the plane into two **half-planes**.
- $y > kx + m$: **above** the line.
- $y < kx + m$: **below** the line.
:::

::: sampunkt "Dashed or solid"
- $<$ and $>$: the line does not belong to the region, **dashed**.
- $\leq$ and $\geq$: the line belongs to the region, **solid**.
- A **test point**, usually $(0, 0)$, decides which side is shaded.
:::

::: sampunkt "Systems of inequalities"
- The region where **all** the inequalities hold at the same time.
- $x \geq 0$ and $y \geq 0$: the first quadrant.
- **Vertices**: points of intersection between boundary lines, calculated with
  systems of equations.
:::
:::
