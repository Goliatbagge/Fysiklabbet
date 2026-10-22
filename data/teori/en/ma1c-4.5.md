---
kalla: 7216cbb23f
id: ma1c-4.5
title: The equation of a straight line
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.5'
---

# The equation of a straight line

We have previously derived the equation of a straight line in *k*-form. In
Swedish, the equation of a straight line (**r**äta **l**injens **e**kvation) is sometimes abbreviated RLE.

::: formel "The equation of a straight line (in k-form)"
$$
y = kx + m
$$
:::

The $k$-value corresponds to the slope of the line. We already know that

$$
k = \frac{\text{height of the step}}{\text{length of the step}}
= \frac{\text{change in the } y\text{-direction}}{\text{change in the } x\text{-direction}}
= \frac{\Delta y}{\Delta x} \quad (1)
$$

Investigate for yourself: in the graph below the step has length $\Delta x = 1$, so
the height of the step is exactly $\Delta y = k$. Drag the sliders and see how
the step follows the slope of the line.

::: graf
titel: y = kx + m
uttryck: k*x + m
ekvation: y = {k}x + {m}
lutningstriangel: ja
k: 0.5, -4, 4, 0.5
m: 2, -5, 5, 1
x: -6, 6
y: -6, 6
:::

If we want to calculate the $k$-value from two points on the line, $(x_1, y_1)$
and $(x_2, y_2)$, without drawing it, we can do so with another
formula. The change in the *y*-direction $\Delta y$ is the difference between two
*y*-coordinates, that is

$$
\Delta y = y_2 - y_1
$$

In the same way

$$
\Delta x = x_2 - x_1
$$

Substituting these into (1), $k = \dfrac{\Delta y}{\Delta x}$, gives the formula
for the gradient.

::: formel "Gradient"
$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$
:::

::: exempel "Example 1: Gradient from two points"
**Calculate the gradient of the line that passes through the points
(−6, −1) and (2, 3).**

::: handskrift
typ: tvapunkter
:::

::: textlosning
We write down the formula for the gradient:

$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$

The first point is $(x_1, y_1) = (-6, -1)$ and the second is
$(x_2, y_2) = (2, 3)$. Substituting into the formula above gives

$$
k = \frac{3 - (-1)}{2 - (-6)} = \frac{3 + 1}{2 + 6} = \frac{4}{8} = \frac{1}{2}
$$

**Answer:** $k = \dfrac{1}{2}$ or 0.5
:::
:::

## Point-slope form

If we know the gradient $k$ and a point $(x_1, y_1)$ on the line,
we can write the equation of the line directly, without first calculating $m$. This
form is called the **point-slope form**.

::: formel "The equation of a straight line in point-slope form"
$$
y - y_1 = k(x - x_1)
$$

where $k$ is the gradient of the line and $(x_1, y_1)$ is a point on
the line.

::: härledning "Derivation: point-slope form"
Let $(x, y)$ be any point on the line. The gradient
between it and the known point $(x_1, y_1)$ is

$$
k = \frac{y - y_1}{x - x_1}
$$

We multiply both sides by $(x - x_1)$:

$$
k(x - x_1) = y - y_1
$$

Swapping the two sides gives the point-slope form, $y - y_1 = k(x - x_1)$.
:::
:::

The point-slope form is useful when the task gives a point and the slope. We
just substitute three numbers and the equation is ready, with no equation to solve for
$m$. If the task instead gives two points, we first calculate $k$ and then
substitute one of the points. If we need the line in *k*-form, $y = kx + m$, we
solve for $y$ in the point-slope form.

::: exempel "Example 2: Find the equation from a point and the slope"
**A straight line passes through the point (4, −3) and has gradient 2.<br>a) Find the equation of the line in *k*-form.<br>b) Write the equation of the line in point-slope form.**

::: handskrift
typ: punktlutning
:::

::: textlosning
**a)** We write down the equation of a straight line:

$$
y = kx + m
$$

We substitute $k = 2$, which gives

$$
y = 2x + m
$$

To find the $m$-value we substitute any point that lies on
the line, in this case (4, −3). We substitute $x = 4$ and $y = -3$ into the formula
above and solve for $m$:

$$
-3 = 2 \cdot 4 + m
$$

$$
-3 = 8 + m
$$

Subtract 8 from both sides:

$$
-3 - 8 = 8 + m - 8
$$

$$
-11 = m
$$

Substituting $k = 2$ and $m = -11$ into RLE gives $y = 2x - 11$.

**Answer:** $y = 2x - 11$

**b)** We write down the point-slope form:

$$
y - y_1 = k(x - x_1)
$$

The point is $(x_1, y_1) = (4, -3)$ and $k = 2$. Substituting into
$y - y_1 = k(x - x_1)$ gives

$$
y - (-3) = 2(x - 4)
$$

Minus in front of a negative number becomes plus:

$$
y + 3 = 2(x - 4)
$$

**Answer:** $y + 3 = 2(x - 4)$
:::
:::

::: exempel "Example 3: Find a from the gradient"
**A straight line passes through the points $(a, 2)$ and $(4, 3a)$ and has
gradient 2. Find $a$.**

::: handskrift
typ: avariabel
:::

::: textlosning
The coordinates contain the unknown variable $a$, but we do exactly as
before. We call the points $(x_1, y_1) = (a, 2)$ and
$(x_2, y_2) = (4, 3a)$ and substitute the coordinates into the formula for the
gradient:

$$
k = \frac{y_2 - y_1}{x_2 - x_1} = \frac{3a - 2}{4 - a}
$$

The gradient is to be 2, so $k = 2$ gives

$$
2 = \frac{3a - 2}{4 - a}
$$

The denominator must not be 0, so $a$ cannot be 4. We multiply both
sides by $(4 - a)$:

$$
2 \cdot (4 - a) = \frac{3a - 2}{4 - a} \cdot (4 - a)
$$

$$
2(4 - a) = 3a - 2
$$

$$
8 - 2a = 3a - 2
$$

Add $2a$ to both sides:

$$
8 - 2a + 2a = 3a - 2 + 2a
$$

$$
8 = 5a - 2
$$

Add 2 to both sides:

$$
8 + 2 = 5a - 2 + 2
$$

$$
10 = 5a
$$

Divide both sides by 5:

$$
\frac{10}{5} = \frac{5a}{5}
$$

$$
2 = a
$$

**Check:** With $a = 2$ the points are (2, 2) and (4, 6), and

$$
k = \frac{6 - 2}{4 - 2} = \frac{4}{2} = 2
$$

which is correct.

**Answer:** $a = 2$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The equation of a straight line (RLE)"
- $y = kx + m$
- $k$ is the slope, $m$ is where the line crosses the *y*-axis.
:::

::: sampunkt "k from two points"
- $k = \dfrac{y_2 - y_1}{x_2 - x_1}$
- Comes from $\dfrac{\Delta y}{\Delta x}$ with
  $\Delta y = y_2 - y_1$ and $\Delta x = x_2 - x_1$.
- **Same order in numerator and denominator.** If you swap the order in one,
  you must swap it in the other.
:::

::: sampunkt "Equation from a point and the slope"
1. Substitute $k$ into $y = kx + m$.
2. Substitute the coordinates of the point.
3. Solve for $m$.
- The point $(4, -3)$ with $k = 2$ gives
  $-3 = 2 \cdot 4 + m$, so $m = -11$.
:::

::: sampunkt "Equation from two points"
1. Calculate $k$ with the formula.
2. Substitute one of the points and solve for $m$.
3. Check with the **other** point.
:::

::: sampunkt "Point-slope form"
- $y - y_1 = k(x - x_1)$
- A point and the slope give the equation directly, without calculating $m$.
- The point $(4, -3)$ with $k = 2$ gives $y + 3 = 2(x - 4)$.
:::
:::
