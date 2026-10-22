---
kalla: 48f45fe933
id: ma3c-4.5
title: The second derivative and local extreme points
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.5'
---

# The second derivative and local extreme points

We have already established that the sign of the second derivative tells us something about
the appearance of the curve.

::: härledning "Remember: the second derivative and concavity"
If

- $f''(a) > 0$, the curve is **convex**, that is, it "bends upwards" (is a
  "happy mouth") where $x = a$,
- $f''(a) < 0$, the curve is **concave**, that is, it "bends downwards" (is a
  "sad mouth") where $x = a$,
- $f''(a) = 0$ and the second derivative changes sign there, we have a
  **point of inflection** (the transition between convex and concave) where $x = a$.
:::

We can use the sign of the second derivative to determine the nature of
local extreme points! If $f'(a) = 0$ and the curve is a "happy mouth" there, that is
$f''(a) > 0$, the point is a local minimum point. If the curve is instead a "sad
mouth" there, that is $f''(a) < 0$, the point is a local maximum point.

So to determine the nature of extreme points we do **not** need to
study the signs with a sign table: we can do it more quickly with
the sign of the second derivative!

## The second derivative and the nature of an extreme point

::: tips "The second derivative and the nature of an extreme point"
If $f'(a) = 0$ and

1. $f''(a) > 0$ (positive), the function $f(x)$ has a local **minimum point**
   where $x = a$,
2. $f''(a) < 0$ (negative), the function $f(x)$ has a local **maximum point**
   where $x = a$,
3. $f''(a) = 0$, the function $f(x)$ has a **stationary point of inflection** or a local
   extreme point where $x = a$. A study of the signs (sign table) is then needed to
   determine the nature.
:::

The method is sometimes called the **second derivative method** and works as an
alternative to the sign table as long as $f''(a) \neq 0$.

::: tips "Step by step"
1. Differentiate the function, set $f'(x) = 0$ and solve the equation to get
   the $x$-coordinates of the extreme points.
2. Substitute the $x$-coordinates into the **original** function $f(x)$ to
   find the $y$-coordinates.
3. Differentiate $f'(x)$ once more to get the second derivative $f''(x)$. Substitute
   the $x$-coordinates of the extreme points into $f''(x)$ and determine the sign to
   find the nature.
:::

::: exempel "Example 1: The second derivative method"
**Determine the local maximum points, minimum points and stationary points of inflection of
$f(x) = \dfrac{x^3}{3} - 9x$.**

::: handskrift
typ: andraderivatametoden
:::

::: textlosning
**1. Differentiate the function, set $f'(x) = 0$ and solve the equation** to get
the $x$-coordinates of the extreme points.

$$
f'(x) = \frac{3x^2}{3} - 9 = x^2 - 9
$$

$$
f'(x) = 0 \; \Rightarrow \; x^2 - 9 = 0 \; \Rightarrow \; x^2 = 9 \;
\Rightarrow \; x = \pm\sqrt{9} = \pm 3
$$

So $x_1 = -3$ and $x_2 = 3$.

**2. Substitute the $x$-values into the original function** to find
the $y$-coordinates.

$$
f(-3) = \frac{(-3)^3}{3} - 9 \cdot (-3) = \frac{-27}{3} + 27 = -9 + 27 = 18
$$

so $(-3, 18)$ is a local extreme point.

$$
f(3) = \frac{3^3}{3} - 9 \cdot 3 = \frac{27}{3} - 27 = 9 - 27 = -18
$$

so $(3, -18)$ is a local extreme point.

**3. Determine the nature of the extreme points** by substituting their
$x$-values into the second derivative and examining the sign.

We already have $f'(x) = x^2 - 9$. We differentiate it once more to
get the second derivative.

$$
f''(x) = 2x
$$

We now substitute the $x$-coordinates of the extreme points, $-3$ and $3$, to
determine the nature.

$$
f''(-3) = 2 \cdot (-3) = -6 < 0 \; \text{(negative)} \;
\Rightarrow \; \text{maximum point}
$$

So $(-3, 18)$ is a maximum point.

$$
f''(3) = 2 \cdot 3 = 6 > 0 \; \text{(positive)} \; \Rightarrow \;
\text{minimum point}
$$

So $(3, -18)$ is a minimum point.

**Answer:** $(-3, 18)$ is a local maximum point and $(3, -18)$ is a local
minimum point.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The second derivative method"
If $f'(a) = 0$ and
1. $f''(a) > 0$, $f(x)$ has a local **minimum point** where $x = a$,
2. $f''(a) < 0$, $f(x)$ has a local **maximum point** where $x = a$,
3. $f''(a) = 0$, a study of the signs is needed to determine the nature.
:::

::: sampunkt "Why it works"
- A minimum point lies at the bottom of a happy mouth, that is on a convex part with $f'' > 0$.
- A maximum point lies at the top of a sad mouth, that is on a concave part with $f'' < 0$.
- The method replaces the sign table as long as $f''(a) \neq 0$, and is much quicker.
:::

::: sampunkt "Step by step"
1. Differentiate, set $f'(x) = 0$ and solve the equation.
2. Substitute the $x$-values into the **original** function for the $y$-coordinates.
3. Differentiate once more and substitute the $x$-values into $f''(x)$. The sign gives the nature.
:::

::: sampunkt "Typical example"
- $f(x) = \dfrac{x^3}{3} - 9x$ gives $f'(x) = x^2 - 9$ and the zeros $x = \pm 3$.
- The points are $(-3, 18)$ and $(3, -18)$.
- $f''(x) = 2x$ gives $f''(-3) = -6 < 0$, so a maximum point, and $f''(3) = 6 > 0$, so a minimum point.
:::

:::
