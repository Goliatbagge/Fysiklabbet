---
kalla: 71447fc41b
id: ma2c-3.3
title: Quadratic functions and modelling
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.3'
---

# Quadratic functions and modelling

To find out which quadratic function has been drawn, there are
several different methods.

::: tips "Determining the quadratic function from its graph"
**Method 1: Using the zeros and one point.**
Quadratic functions with zeros can be written in **factor form** as
$f(x) = k(x - x_1)(x - x_2)$, where $x_1$ and $x_2$ are the function's
zeros. Substitute the function's zeros and then determine $k$
from one more point on the graph (which must not be a
zero). If the function has a double root (turns on the $x$-axis),
then $x_1 = x_2$. This method is preferable if you can easily
determine the zeros.

**Method 2: Using three points.**
All quadratic functions can be written in **expanded form** as
$f(x) = ax^2 + bx + c$, where $a$, $b$ and $c$ are constants. By
substituting any three points on the graph into this function expression, we can
form a system of equations with three unknowns and three equations. Then we can
determine the constants $a$, $b$ and $c$ and then determine
the function. This method often involves more awkward calculations, but it always
works, even if, for example, the zeros are unknown.
:::

::: exempel "Example 1: Zeros and one point"
**The figure shows the graph of a quadratic function $f(x)$. Determine $f(x)$
and answer in the form $f(x) = ax^2 + bx + c$.**

::: figur
<svg viewBox="10 -10 164 300" width="240" height="438" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A parabola with zeros at minus 1 and 3 that passes through the point 1 comma minus 8, where the point is marked."><line x1="20" y1="0" x2="20" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="0" x2="40" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="100" y1="0" x2="100" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="0" x2="120" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="140" y1="0" x2="140" y2="280" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="20" x2="164" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="60" x2="164" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="140" x2="164" y2="140" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="180" x2="164" y2="180" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="220" x2="164" y2="220" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="260" x2="164" y2="260" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="12" y1="100" x2="164" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="172,100 162,95.5 162,104.5" fill="#1f2530"/><line x1="60" y1="286" x2="60" y2="-2" stroke="#1f2530" stroke-width="1.6"/><polygon points="60,-10 55.5,0 64.5,0" fill="#1f2530"/><text x="170" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="69" y="-2" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="32" y="114" font-size="11" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="114" font-size="11" text-anchor="middle" fill="#1f2530">3</text><text x="54" y="64" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="54" y="24" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="54" y="184" font-size="11" text-anchor="end" fill="#1f2530">−4</text><text x="54" y="264" font-size="11" text-anchor="end" fill="#1f2530">−8</text><path d="M 29,0 Q 80,520 131,0" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="40" cy="100" r="3" fill="#1f2530"/><circle cx="120" cy="100" r="3" fill="#1f2530"/><circle cx="80" cy="260" r="3.5" fill="#c8324a"/><text x="90" y="272" font-size="12" text-anchor="start" fill="#c8324a">(1, −8)</text></svg>
:::

::: handskrift
typ: faktorformk
:::

::: textlosning
We see in the figure that the function has the zeros $x_1 = -1$ and
$x_2 = 3$, and that the graph passes through the point (1, −8). We write
the function in factor form:

$$
f(x) = k(x - (-1))(x - 3) = k(x + 1)(x - 3) \qquad (1)
$$

We substitute the point (1, −8), that is $x = 1$ and $f(x) = -8$, into (1) to
determine $k$:

$$
-8 = k(1 + 1)(1 - 3)
$$

$$
-8 = k \cdot 2 \cdot (-2)
$$

$$
-8 = -4k \iff k = 2
$$

We substitute $k = 2$ into (1) and then expand the expression:

$$
f(x) = 2(x + 1)(x - 3) = 2(x^2 - 3x + x - 3) = 2(x^2 - 2x - 3)
$$

$$
f(x) = 2x^2 - 4x - 6
$$

**Answer:** $f(x) = 2x^2 - 4x - 6$
:::
:::

::: exempel "Example 2: Three points"
**The figure shows the graph of a quadratic function $f(x)$ that has no
zeros and that passes through the points (−2, 1), (−1, 2) and (0, 5).
Determine $f(x)$.**

::: figur
<svg viewBox="6 0 168 176" width="246" height="257" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A parabola without zeros with its minimum point at minus 2 comma 1, through the points minus 2 comma 1, minus 1 comma 2 and 0 comma 5."><line x1="24" y1="8" x2="24" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="48" y1="8" x2="48" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="72" y1="8" x2="72" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="96" y1="8" x2="96" y2="150" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="126" x2="156" y2="126" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="102" x2="156" y2="102" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="78" x2="156" y2="78" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="54" x2="156" y2="54" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="30" x2="156" y2="30" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="14" y1="150" x2="156" y2="150" stroke="#1f2530" stroke-width="1.6"/><polygon points="164,150 154,145.5 154,154.5" fill="#1f2530"/><line x1="120" y1="158" x2="120" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="120,4 115.5,14 124.5,14" fill="#1f2530"/><text x="162" y="168" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="129" y="14" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="24" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−4</text><text x="48" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−3</text><text x="72" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−2</text><text x="96" y="164" font-size="11" text-anchor="middle" fill="#1f2530">−1</text><path d="M 21.1,18 Q 72,234 122.9,18" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="72" cy="126" r="3.5" fill="#c8324a"/><circle cx="96" cy="102" r="3.5" fill="#c8324a"/><circle cx="120" cy="30" r="3.5" fill="#c8324a"/><text x="64" y="131" font-size="12" text-anchor="end" fill="#c8324a">(−2, 1)</text><text x="88" y="106" font-size="12" text-anchor="end" fill="#c8324a">(−1, 2)</text><text x="128" y="34" font-size="12" text-anchor="start" fill="#c8324a">(0, 5)</text></svg>
:::

::: handskrift
typ: trepunkter
:::

::: textlosning
The function has no zeros, so we cannot easily write it
in factor form. We write the function in expanded form
$f(x) = ax^2 + bx + c$ and substitute the three points, which forms
a system of equations:

$$
\begin{cases}
a \cdot (-2)^2 + b \cdot (-2) + c = 1 \\
a \cdot (-1)^2 + b \cdot (-1) + c = 2 \\
a \cdot 0^2 + b \cdot 0 + c = 5
\end{cases}
$$

We will now determine the constants $a$, $b$ and $c$. We simplify
the equations and get

$$
\begin{cases}
4a - 2b + c = 1 & (1) \\
a - b + c = 2 & (2) \\
c = 5
\end{cases}
$$

From the bottom equation we have $c = 5$. Substituting into equations (1)
and (2) gives

$$
\begin{cases}
4a - 2b + 5 = 1 & (3) \\
a - b + 5 = 2 & (4)
\end{cases}
$$

We use the substitution method and solve for $a$ in equation (4):

$$
a = b - 3 \qquad (5)
$$

Substituting $a = b - 3$ into equation (3) gives

$$
4(b - 3) - 2b + 5 = 1
$$

$$
4b - 12 - 2b + 5 = 1
$$

$$
2b - 7 = 1 \iff 2b = 8 \iff b = 4
$$

Substituting $b = 4$ into (5) gives

$$
a = 4 - 3 = 1
$$

Substituting $a = 1$, $b = 4$ and $c = 5$ into $f(x) = ax^2 + bx + c$ gives

$$
f(x) = x^2 + 4x + 5
$$

**Answer:** $f(x) = x^2 + 4x + 5$
:::
:::

::: exempel "Example 3: The fountain in Seoul"
**The distance along the water surface from where a jet of water starts to where
the jet hits the water is approximately $2.3$ m. The greatest height of the jet above
the water surface is approximately $3.1$ m. Assume that the path of the jet has the same shape
as the graph of a quadratic function. Determine a function that describes
the path of the jet. (National test Ma2c, spring 2013)**

::: handskrift
typ: fontanen
:::

::: textlosning
We make a sketch and place the parabola in a coordinate system. This can
be done in different ways, but we choose to place it starting at the origin.
We realise that we then get zeros at $x = 0$ and $x = 2.3$.
The maximum point must lie midway between them, that is at
$x = \dfrac{0 + 2.3}{2} = 1.15$ and with $y = 3.1$. We mark
these three points with coordinates.

::: figur
<svg viewBox="0 -2 196 206" width="286" height="301" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A parabola through the origin and the point 2.3 comma 0 on the x-axis, with its maximum point at 1.15 comma 3.1."><line x1="78" y1="8" x2="78" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="8" x2="126" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="122" x2="186" y2="122" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="74" x2="186" y2="74" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="26" x2="186" y2="26" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="10" y1="170" x2="186" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,170 184,165.5 184,174.5" fill="#1f2530"/><line x1="30" y1="178" x2="30" y2="6" stroke="#1f2530" stroke-width="1.6"/><polygon points="30,-2 25.5,8 34.5,8" fill="#1f2530"/><text x="192" y="188" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="39" y="8" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="78" y="184" font-size="11" text-anchor="middle" fill="#1f2530">1</text><text x="126" y="184" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="24" y="126" font-size="11" text-anchor="end" fill="#1f2530">1</text><text x="24" y="78" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="24" y="30" font-size="11" text-anchor="end" fill="#1f2530">3</text><path d="M 30,170 Q 85.2,-127.6 140.4,170" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="30" cy="170" r="3.5" fill="#c8324a"/><circle cx="140.4" cy="170" r="3.5" fill="#c8324a"/><circle cx="85.2" cy="21.2" r="3.5" fill="#c8324a"/><text x="85" y="12" font-size="12" text-anchor="middle" fill="#c8324a">(1.15, 3.1)</text><text x="22" y="196" font-size="12" text-anchor="start" fill="#c8324a">(0, 0)</text><text x="148" y="188" font-size="12" text-anchor="start" fill="#c8324a">(2.3, 0)</text></svg>
:::

We call the function $f(x)$ and write it in factor form
$f(x) = k(x - x_1)(x - x_2)$, where $x_1 = 0$ and $x_2 = 2.3$:

$$
f(x) = k(x - 0)(x - 2.3)
$$

$$
f(x) = kx(x - 2.3) \qquad (1)
$$

We substitute the point (1.15, 3.1), that is $x = 1.15$ and
$f(x) = 3.1$, into (1) to determine $k$:

$$
3.1 = k \cdot 1.15(1.15 - 2.3)
$$

$$
3.1 = k \cdot 1.15 \cdot (-1.15)
$$

$$
3.1 = -1.3225k
$$

$$
k = \frac{3.1}{-1.3225} = -2.344\ldots
$$

Substituting $k = -2.344\ldots$ into (1) gives

$$
f(x) = -2.344\ldots x(x - 2.3)
$$

We expand the function expression and get

$$
f(x) = -2.344\ldots x^2 + 5.391\ldots x
$$

We round the coefficients to two decimal places and get

$$
f(x) = -2.34x^2 + 5.39x
$$

**Answer:** $f(x) = -2.34x^2 + 5.39x$
:::
:::

## Investigate the factor form yourself

Investigate how the factor form $y = k(x - p)(x - q)$ shapes the parabola.
$p$ and $q$ are the zeros, and $k$ controls how "steep" the parabola is and in
which direction it opens. The starting position shows the function from Example 1,
$f(x) = 2(x + 1)(x - 3)$.

::: graf
titel: y = k(x - p)(x - q)
uttryck: k*(x - p)*(x - q)
ekvation: y = {k}(x - {p})(x - {q})
k: 2, -3, 3, 0.5
p: -1, -5, 5, 1
q: 3, -5, 5, 1
x: -6, 6
y: -9, 5
:::

::: sammanfattning "Summary"

::: sampunkt "Two ways to find the function"
- **Method 1**: zeros and one point. Best when the zeros are clearly
  visible.
- **Method 2**: three points. More awkward, but it **always** works, even
  without zeros.
:::

::: sampunkt "Method 1: factor form"
- $f(x) = k(x - x_1)(x - x_2)$, where $x_1$ and $x_2$ are the zeros.
- Substitute the zeros, and then determine $k$ with **one more point** on
  the graph. That point must not be a zero.
- If the graph has a **double root**, that is it turns on the $x$-axis, then
  $x_1 = x_2$.
- Finally, expand to the form $ax^2 + bx + c$ if the task requires
  it.
:::

::: sampunkt "Method 2: expanded form"
- $f(x) = ax^2 + bx + c$.
- Substitute **three** points, which gives three equations with three unknowns.
- Solve the system of equations and substitute $a$, $b$ and $c$.
- Tip: the point where $x = 0$ gives $c$ directly.
:::

::: sampunkt "Modelling"
- Place the parabola in a coordinate system **where the calculation becomes simple**, for
  example starting at the origin.
- A jet of water or a projectile path: the zeros are the start and the landing point,
  and the maximum point lies **midway between** them.
- Check that the answer is reasonable in the context.
:::
:::
