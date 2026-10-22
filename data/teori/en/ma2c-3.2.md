---
kalla: 16c44aa65f
id: ma2c-3.2
title: Quadratic equations and quadratic functions
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.2'
---

# Quadratic equations and quadratic functions

In the previous section we determined the zeros,
stationary point and line of symmetry of a quadratic function graphically. We will now determine them
**algebraically**.

::: tips "Determining zeros, line of symmetry and stationary point algebraically"
Algebraically, for a quadratic function we determine its

- **zeros** by setting the function equal to 0 and solving it.
  The solutions give the zeros.
- **line of symmetry** from the mean of the zeros. If there are no zeros,
  the line of symmetry can be obtained from "the number in front of the square root sign" in
  the *pq* formula, that is $x_s = -\dfrac{p}{2}$.
- **stationary point** by substituting the $x$-coordinate of the line of symmetry into
  the function expression. The line of symmetry gives the $x$-coordinate of the stationary point,
  and the value of the function expression gives the $y$-coordinate of the stationary point.
:::

::: exempel "Example 1: Determine everything algebraically"
**We have the function $f(x) = 3x^2 - 12x + 9$. State the function's<br>a) zeros&emsp;&emsp;b) line of symmetry&emsp;&emsp;c) stationary point&emsp;&emsp;d) nature of the stationary point&emsp;&emsp;e) greatest or least value**

::: handskrift
typ: algebraisktparabel
:::

::: textlosning
**a)** We determine the zeros by setting the function expression
equal to 0 and solving the equation:

$$
3x^2 - 12x + 9 = 0
$$

We divide both sides by 3 and then solve the equation with the *pq* formula:

$$
x^2 - 4x + 3 = 0
$$

$$
x = 2 \pm \sqrt{2^2 - 3} = 2 \pm \sqrt{1} = 2 \pm 1
$$

$$
x_1 = 2 - 1 = 1
$$

$$
x_2 = 2 + 1 = 3
$$

**Answer:** $x = 1$ and $x = 3$

**b)** The line of symmetry lies midway between the zeros, which
corresponds to their mean:

$$
x_s = \frac{1 + 3}{2} = \frac{4}{2} = 2
$$

**Answer:** $x_s = 2$

**c)** The stationary point lies on the line of symmetry and thus has the same
$x$-coordinate, that is $x = 2$. Substituting $x = 2$ into the function
$f(x) = 3x^2 - 12x + 9$ gives

$$
f(2) = 3 \cdot 2^2 - 12 \cdot 2 + 9 = 12 - 24 + 9 = -3
$$

The $y$-coordinate of the stationary point is thus −3. In summary,
the complete coordinates of the stationary point are (2, −3).

**Answer:** (2, −3)

**d)** The nature of the stationary point is determined by the sign in front of the $x^2$-term.
In this case we have the function $f(x) = 3x^2 - 12x + 9$, which has a
**positive** $x^2$-term (we then picture a curve with a "happy mouth").
The curve thus has a "valley", which tells us that it is a minimum point.

**Answer:** Minimum point

**e)** Since the function has a minimum point, it has a **least
value**. The least value corresponds to the $y$-coordinate of the stationary point
(the greatest or least value always lies at the stationary point). We have
already found the stationary point to be (2, −3). The least value is
thus −3.

**Answer:** −3
:::
:::

::: exempel "Example 2: Line of symmetry without zeros"
**Determine the line of symmetry of $f(x) = x^2 + 6x + 10$.**

::: handskrift
typ: symmetriutan
:::

::: textlosning
We start by finding the zeros of the function by setting
the function expression equal to 0 and solving the equation:

$$
x^2 + 6x + 10 = 0
$$

$$
x = -3 \pm \sqrt{3^2 - 10} = -3 \pm \sqrt{9 - 10} = -3 \pm \sqrt{-1}
$$

This equation has no solution, since the square root of negative numbers
has no real solutions. The function thus has no zeros (graphically
this means that the whole graph lies above or below the $x$-axis).

We can still determine the equation of the line of symmetry as "the number in front of
the square root sign" in the *pq* formula. In this case it is −3. So
the equation of the line of symmetry is $x_s = -3$.

**Answer:** $x_s = -3$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Zeros algebraically"
- Set **the function equal to 0** and solve the equation.
- The solutions **are** the zeros.
- If there is a coefficient in front of $x^2$: divide it away first.
:::

::: sampunkt "Line of symmetry"
- Lies **midway between the zeros**, that is their mean:
  $x_s = \dfrac{x_1 + x_2}{2}$.
- If there are no zeros: take **the number in front of the square root sign** in the *pq* formula,
  that is $x_s = -\dfrac{p}{2}$.
:::

::: sampunkt "Stationary point"
1. The $x$-coordinate is **the line of symmetry**.
2. Substitute that value into **the function expression**.
3. The result is the $y$-coordinate.
- Answer with **both** coordinates, for example $(2, -3)$.
:::

::: sampunkt "Nature and extreme value"
- The sign in front of $x^2$ determines the nature: positive gives a minimum point,
  negative gives a maximum point.
- The greatest or least value is the **$y$-coordinate** of the stationary point.
:::

::: sampunkt "Common pitfall"
- The stationary point is a **point** with two coordinates, while the greatest or
  least **value** is only the $y$-coordinate. Read the question carefully.
:::
:::
