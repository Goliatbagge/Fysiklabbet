---
kalla: 32c1b2dae0
id: ma3c-4.2
title: Zeros of the derivative
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.2'
---

# Zeros of the derivative

We already know that the sign of the derivative $f'(x)$ determines whether a function
is increasing or decreasing in an interval: $f'(x) > 0$ gives an increasing
function and $f'(x) < 0$ gives a decreasing function. But what happens at the
point where the derivative is exactly 0, that is, where $f'(x) = 0$? There the curve's
tangent is horizontal, and the point is either a **local maximum point**, a
**local minimum point** or a **stationary point of inflection**.

::: tips "Local maximum point and local minimum point"
A point on a curve where it turns is called a local extreme point. If the curve turns
at a

1. "peak", the point is called a **local maximum point**. The function value
   (the $y$-value) at a local maximum point is called a **local maximum**.
2. "valley", the point is called a **local minimum point**. The function value
   (the $y$-value) at a local minimum point is called a **local minimum**.

::: figur
<svg viewBox="4 -2 268 202" width="392" height="295" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A curve that rises to a local maximum point, falls to a local minimum point and then rises again. Point at or tap an extreme point to show the horizontal tangent and that the derivative is 0 there." style="overflow:visible"><style>.q42s{cursor:pointer;outline:none}.q42s .q42-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q42s:hover .q42-lbl,.q42s:focus .q42-lbl{opacity:1}.q42s .q42-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q42s:hover .q42-pt,.q42s:focus .q42-pt{transform:scale(1.5)}</style><line x1="20" y1="100" x2="236" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="248,100 236,95 236,105" fill="#1f2530"/><line x1="132" y1="190" x2="132" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="132,4 127,18 137,18" fill="#1f2530"/><text x="244" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="140" y="15" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 40,176.4 C 40.77,173.03 43.07,162.5 44.6,156.2 C 46.13,149.9 47.67,144.08 49.2,138.6 C 50.73,133.12 52.27,128.02 53.8,123.3 C 55.33,118.58 56.87,114.28 58.4,110.3 C 59.93,106.32 61.47,102.7 63,99.4 C 64.53,96.1 66.07,93.17 67.6,90.5 C 69.13,87.83 70.67,85.47 72.2,83.4 C 73.73,81.33 75.27,79.62 76.8,78.1 C 78.33,76.58 79.87,75.32 81.4,74.3 C 82.93,73.28 84.47,72.53 86,72 C 87.53,71.47 89.07,71.22 90.6,71.1 C 92.13,70.98 93.67,71.07 95.2,71.3 C 96.73,71.53 98.27,71.93 99.8,72.5 C 101.33,73.07 102.87,73.83 104.4,74.7 C 105.93,75.57 107.47,76.58 109,77.7 C 110.53,78.82 112.07,80.08 113.6,81.4 C 115.13,82.72 116.67,84.13 118.2,85.6 C 119.73,87.07 121.27,88.63 122.8,90.2 C 124.33,91.77 125.87,93.37 127.4,95 C 128.93,96.63 130.47,98.33 132,100 C 133.53,101.67 135.07,103.37 136.6,105 C 138.13,106.63 139.67,108.23 141.2,109.8 C 142.73,111.37 144.27,112.93 145.8,114.4 C 147.33,115.87 148.87,117.28 150.4,118.6 C 151.93,119.92 153.47,121.18 155,122.3 C 156.53,123.42 158.07,124.43 159.6,125.3 C 161.13,126.17 162.67,126.93 164.2,127.5 C 165.73,128.07 167.27,128.47 168.8,128.7 C 170.33,128.93 171.87,129.02 173.4,128.9 C 174.93,128.78 176.47,128.53 178,128 C 179.53,127.47 181.07,126.72 182.6,125.7 C 184.13,124.68 185.67,123.42 187.2,121.9 C 188.73,120.38 190.27,118.67 191.8,116.6 C 193.33,114.53 194.87,112.17 196.4,109.5 C 197.93,106.83 199.47,103.9 201,100.6 C 202.53,97.3 204.07,93.68 205.6,89.7 C 207.13,85.72 208.67,81.42 210.2,76.7 C 211.73,71.98 213.27,66.88 214.8,61.4 C 216.33,55.92 217.87,50.1 219.4,43.8 C 220.93,37.5 223.23,26.97 224,23.6" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q42s" tabindex="0"><circle cx="92" cy="71" r="16" fill="transparent"/><circle class="q42-pt" cx="92" cy="71" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="62" y1="71" x2="122" y2="71" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="90" y="58" font-size="11.5" text-anchor="middle" fill="#c8324a">derivative is 0</text></g></g><g class="q42s" tabindex="0"><circle cx="172" cy="129" r="16" fill="transparent"/><circle class="q42-pt" cx="172" cy="129" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="142" y1="129" x2="202" y2="129" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="160" y="150" font-size="11.5" text-anchor="end" fill="#c8324a">derivative is 0</text></g></g><text x="8" y="34" font-size="12.5" fill="#1f2530">local</text><text x="8" y="47" font-size="12.5" fill="#1f2530">maximum point</text><text x="182" y="150" font-size="12.5" fill="#1f2530">local</text><text x="182" y="163" font-size="12.5" fill="#1f2530">minimum point</text></svg>

Point at or tap an extreme point to show the horizontal tangent.
:::
:::

A common name for local maximum and minimum points is **local
extreme points**, and the function value at such a point is called a **local
extreme value**. The word "local" is used because it only applies in a small
interval around the point; the curve may well have other parts with larger
or smaller function values. At a local extreme point the derivative
(the slope) is equal to 0.

::: formel "Stationary point of inflection"
If a curve levels out at a point (the tangent becomes horizontal) but then
continues in the same direction as before, the point is called a **stationary point of inflection**.
At a stationary point of inflection the derivative (the slope) is also equal to 0.
:::

To sum up: if $f'(a) = 0$, then the point where $x = a$ is
either a local maximum point, a local minimum point or a
stationary point of inflection.

Whether a point is a maximum point, a minimum point or a stationary point of inflection is called
the **nature** of the point. The nature can always be determined with a
**sign table**, where we examine the sign of $f'(x)$ just to the left
and just to the right of the point (see the example below). If the function is a
quadratic function, the nature can be determined more quickly, directly from
the sign in front of the $x^2$ term: a positive $x^2$ term gives a "happy" curve
and a minimum point, while a negative $x^2$ term gives a "sad" curve and a
maximum point.

## Determining extreme points and their nature

::: tips "Determining extreme points and their nature"
1. Differentiate the original function, set the derivative equal to 0 and solve
   the equation. This gives the $x$-coordinates of the extreme points.
2. Substitute the $x$-values from step 1 into the **original** function. This
   gives the $y$-coordinates of the extreme points.
3. Determine the nature of the points with a sign table.
:::

::: exempel "Example 1: Determine local extreme points and their nature"
**Determine the local extreme points and their nature for the function**

::: handskrift
typ: extrempunkterkarak
:::

::: textlosning
$$
f(x) = x^3 - 6x^2 + 9x + 3
$$

Step 1: We differentiate the function, set the derivative equal to 0 and solve
the equation to find the $x$-coordinates of the extreme points.

$$
f'(x) = 3x^2 - 12x + 9
$$

$$
f'(x) = 0 \quad \Rightarrow \quad 3x^2 - 12x + 9 = 0
$$

We divide both sides by 3 and solve with the $pq$ formula.

$$
x^2 - 4x + 3 = 0
$$

$$
\begin{aligned}
x &= 2 \pm \sqrt{2^2 - 3} \\
x &= 2 \pm \sqrt{1} \\
x &= 2 \pm 1
\end{aligned}
$$

which gives $x_1 = 1$ and $x_2 = 3$.

Step 2: We substitute the $x$-values into the original function to find
the $y$-coordinates of the extreme points.

$$
f(1) = 1^3 - 6 \cdot 1^2 + 9 \cdot 1 + 3 = 7
$$

$$
f(3) = 3^3 - 6 \cdot 3^2 + 9 \cdot 3 + 3 = 3
$$

So the points $(1, 7)$ and $(3, 3)$ have derivative 0.

Step 3: We determine the nature of the points with a sign table. We substitute
any value less than 1 (for example $x = 0$), a value between 1 and 3
(for example $x = 2$) and a value greater than 3 (for example $x = 10$) into the derivative.

$$
f'(0) = 3 \cdot 0^2 - 12 \cdot 0 + 9 = 9 > 0
$$

$$
f'(2) = 3 \cdot 2^2 - 12 \cdot 2 + 9 = -3 < 0
$$

$$
f'(10) = 3 \cdot 10^2 - 12 \cdot 10 + 9 = 189 > 0
$$

| $x$ | $x < 1$ | $x = 1$ | $1 < x < 3$ | $x = 3$ | $x > 3$ |
| --- | --- | --- | --- | --- | --- |
| $f'(x)$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $f(x)$ | $\nearrow$ | $7$ | $\searrow$ | $3$ | $\nearrow$ |

The change of sign of the derivative $+ \to 0 \to -$ at $x = 1$ shows that $(1, 7)$ is
a local maximum point, and the change of sign $- \to 0 \to +$ at $x = 3$
shows that $(3, 3)$ is a local minimum point.

**Answer:** $(1, 7)$ is a local maximum point and $(3, 3)$ is a local
minimum point.
:::
:::

::: exempel "Example 2: Extreme point of a quadratic function"
**Determine the extreme point and its nature for the function**

::: handskrift
typ: extrempunktandragrad
:::

::: textlosning
$$
f(x) = 3x^2 - 6x + 2
$$

We differentiate the function, set the derivative equal to 0 and solve the equation
to find the $x$-coordinate of the extreme point.

$$
f'(x) = 6x - 6
$$

$$
f'(x) = 0 \quad \Rightarrow \quad 6x - 6 = 0 \quad \Rightarrow \quad x = 1
$$

We substitute $x = 1$ into the original function to find
the $y$-coordinate of the extreme point.

$$
f(1) = 3 \cdot 1^2 - 6 \cdot 1 + 2 = -1
$$

So the extreme point has the coordinates $(1, -1)$.

Since $f(x)$ is a quadratic function, we can determine the nature
more quickly, without a sign table, from the sign in front of the $x^2$ term.
The coefficient in front of $x^2$ is 3, which is positive, giving a "happy"
curve and therefore a minimum point.

**Answer:** $(1, -1)$ is a local minimum point.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Where the derivative is zero"
- Where $f'(x) = 0$ the tangent is horizontal.
- The point is then either a **local maximum point**, a **local minimum point** or a **stationary point of inflection**.
- **Stationary point of inflection:** the curve levels out but then continues in the same direction.
:::

::: sampunkt "Extreme point and extreme value"
- Maximum and minimum points are together called **local extreme points**.
- The function value at such a point is the **local extreme value**.
- The word local means that it only applies in a small interval around the point.
:::

::: sampunkt "Method"
1. Differentiate, set $f'(x) = 0$ and solve the equation. This gives the $x$-coordinates.
2. Substitute the $x$-values into the **original** function. This gives the $y$-coordinates.
3. Determine the nature of the points with a sign table.
:::

::: sampunkt "Nature"
- Change of sign $+ \to 0 \to -$ gives a **maximum point**.
- Change of sign $- \to 0 \to +$ gives a **minimum point**.
- The same sign on both sides gives a stationary point of inflection.
- Shortcut for quadratic functions: a positive $x^2$ term gives a minimum point, a negative one gives a maximum point.
:::

:::
