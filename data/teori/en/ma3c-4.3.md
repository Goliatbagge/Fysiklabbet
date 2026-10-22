---
kalla: d072c6015f
id: ma3c-4.3
title: Greatest and least value in an interval, and curve sketching
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.3'
---

# Greatest and least value in an interval, and curve sketching

We already know how to determine the extreme points of a function and their
nature (maximum point, minimum point or stationary point of inflection).

::: tips "Remember: determining extreme points and their nature"
1. Differentiate the original function, set the derivative equal to 0 and solve
   the equation. This gives us the $x$-coordinates of the extreme points.
2. Substitute the $x$-values we found in step 1 into the **original**
   function. This gives us the $y$-coordinates of the extreme points.
3. Determine the nature of the extreme points with a sign table.
:::

Sometimes we need to determine the greatest or least value of a function in a
**closed interval**, that is, an interval where the endpoints
$a \leq x \leq b$ are also included. The greatest or least value in the interval
is then always found either at an extreme point **or** at one of the interval's
endpoints, never anywhere else.

::: tips "Determining the greatest and least value in an interval"
1. Substitute the endpoints of the interval into $f(x)$ to find
   the $y$-coordinates at these endpoints.
2. Calculate the $y$-coordinates of the extreme points that lie within the interval,
   using the method for determining extreme points with the derivative (see
   the remember box above).
3. The greatest and least values among the points in steps 1 and 2 are
   the greatest and least values of the function in the interval.
:::

## Curve sketching

In **curve sketching** we use the same method as above to determine
extreme points and their nature. Then we sketch the curve based on
the position and nature of the extreme points, without calculating more points than
necessary.

::: exempel "Example 1: Greatest and least value, and curve sketching"
**The function $f(x) = x^3 - 3x$ is given in the interval $-2 \leq x \leq 3$.
Determine the greatest and least value of the function in the interval and then sketch
the graph without digital tools.**

::: handskrift
typ: storstaminsta
:::

::: textlosning
We start by determining the $y$-coordinates at the endpoints of the
interval.

$$
f(-2) = (-2)^3 - 3 \cdot (-2) = -8 + 6 = -2 \qquad \Rightarrow \qquad (-2, -2) \text{ is an endpoint}
$$

$$
f(3) = 3^3 - 3 \cdot 3 = 27 - 9 = 18 \qquad \Rightarrow \qquad (3, 18) \text{ is an endpoint}
$$

Then we determine the $y$-coordinates of the extreme points. We start by
differentiating and finding the $x$-values where the derivative (the slope) is $0$.

$$
f'(x) = 3x^2 - 3
$$

$f'(x) = 0$ gives

$$
3x^2 - 3 = 0 \quad \Leftrightarrow \quad 3x^2 = 3 \quad \Leftrightarrow \quad x^2 = 1 \quad \Leftrightarrow \quad x = \pm\sqrt{1}
$$

which gives $x_1 = -1$ and $x_2 = 1$. We substitute these $x$-values into the
original function to get the $y$-coordinates of the extreme points.

$$
f(-1) = (-1)^3 - 3 \cdot (-1) = -1 + 3 = 2 \qquad \Rightarrow \qquad (-1, 2) \text{ is an extreme point}
$$

$$
f(1) = 1^3 - 3 \cdot 1 = 1 - 3 = -2 \qquad \Rightarrow \qquad (1, -2) \text{ is an extreme point}
$$

We now compare the $y$-values at the endpoints and at the extreme points: $-2$, $18$,
$2$ and $-2$. The greatest value is $18$ (at the endpoint $x = 3$) and the
least is $-2$ (both at the endpoint $x = -2$ and at the extreme point $x = 1$).

**Answer:** The greatest value is $18$. The least value is $-2$.

Now we sketch the graph. We have already found the endpoints $(-2, -2)$ and
$(3, 18)$ and the extreme points $(-1, 2)$ and $(1, -2)$. We determine
the nature of the extreme points with a sign table. We fill in the
$x$-values we found where the derivative is $0$, and then test the sign
of $f'(x) = 3x^2 - 3$ at one point in each of the three subintervals.

$$
f'(-2) = 3 \cdot (-2)^2 - 3 = 12 - 3 = 9 \quad \Rightarrow \quad + \qquad
f'(0) = 3 \cdot 0^2 - 3 = -3 \quad \Rightarrow \quad - \qquad
f'(2) = 3 \cdot 2^2 - 3 = 12 - 3 = 9 \quad \Rightarrow \quad +
$$

| $x$ | | $-1$ | | $1$ | |
|:---:|:---:|:---:|:---:|:---:|:---:|
| $f'(x)$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $f(x)$ | $\nearrow$ | $\rightarrow$ | $\searrow$ | $\rightarrow$ | $\nearrow$ |

The sign table shows that the curve has a **maximum point** at $(-1, 2)$ (increasing
$\to$ decreasing) and a **minimum point** at $(1, -2)$ (decreasing $\to$
increasing). We now join the four points with a smooth curve.

::: figur
<svg viewBox="4 0 240 242" width="351" height="354" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of f of x equals x cubed minus three x, drawn on the interval minus two to three. The endpoints at x equals minus two and x equals three are marked with filled black dots, since they belong to the closed interval. The maximum point at minus one, two and the minimum point at one, minus two are marked with filled red dots.">
<line x1="16" y1="155" x2="206" y2="155" stroke="rgba(31,37,48,0.22)" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="16" y1="105" x2="206" y2="105" stroke="rgba(31,37,48,0.22)" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="16" y1="55" x2="206" y2="55" stroke="rgba(31,37,48,0.22)" stroke-width="1" stroke-dasharray="3 3"/>
<text x="90" y="159" font-size="11" text-anchor="end" fill="#1f2530">5</text>
<text x="90" y="109" font-size="11" text-anchor="end" fill="#1f2530">10</text>
<text x="90" y="59" font-size="11" text-anchor="end" fill="#1f2530">15</text>
<line x1="16" y1="205" x2="206" y2="205" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="216,205 206,200.5 206,209.5" fill="#1f2530"/>
<line x1="100" y1="235" x2="100" y2="23" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="100,13 95.5,23 104.5,23" fill="#1f2530"/>
<text x="222" y="209" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text>
<text x="107" y="18" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text>
<text x="32" y="219" font-size="11" text-anchor="middle" fill="#1f2530">−2</text>
<text x="66" y="219" font-size="11" text-anchor="middle" fill="#1f2530">−1</text>
<text x="90" y="219" font-size="11" text-anchor="end" fill="#1f2530">0</text>
<text x="134" y="219" font-size="11" text-anchor="middle" fill="#1f2530">1</text>
<text x="168" y="219" font-size="11" text-anchor="middle" fill="#1f2530">2</text>
<text x="202" y="219" font-size="11" text-anchor="middle" fill="#1f2530">3</text>
<path d="M 32,225 C 33.42,221.85 37.67,211.3 40.5,206.1 C 43.33,200.9 46.17,196.98 49,193.8 C 51.83,190.62 54.67,188.47 57.5,187 C 60.33,185.53 63.17,185.05 66,185 C 68.83,184.95 71.67,185.65 74.5,186.7 C 77.33,187.75 80.17,189.47 83,191.3 C 85.83,193.13 88.67,195.42 91.5,197.7 C 94.33,199.98 97.17,202.57 100,205 C 102.83,207.43 105.67,210 108.5,212.3 C 111.33,214.6 114.17,216.97 117,218.8 C 119.83,220.63 122.67,222.27 125.5,223.3 C 128.33,224.33 131.17,225.05 134,225 C 136.83,224.95 139.67,224.45 142.5,223 C 145.33,221.55 148.17,219.48 151,216.3 C 153.83,213.12 156.67,209.12 159.5,203.9 C 162.33,198.68 165.17,192.55 168,185 C 170.83,177.45 173.67,168.8 176.5,158.6 C 179.33,148.4 182.17,136.98 185,123.8 C 187.83,110.62 190.67,95.97 193.5,79.5 C 196.33,63.03 200.58,34.08 202,25" fill="none" stroke="#2563c9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="32" cy="225" r="3.4" fill="#1f2530"/>
<circle cx="202" cy="25" r="3.4" fill="#1f2530"/>
<circle cx="66" cy="185" r="3.4" fill="#c8324a"/>
<circle cx="134" cy="225" r="3.4" fill="#c8324a"/>
</svg>
:::

*The endpoints $(-2, -2)$ and $(3, 18)$ belong to the closed interval and
are marked with filled black dots,
the maximum point $(-1, 2)$ and the minimum point $(1, -2)$ with filled red dots.
The curve is increasing up to the maximum point, decreasing between the maximum and
minimum points, and then increasing again up to the right-hand endpoint.*
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Closed interval"
- In a **closed interval** $a \leq x \leq b$ the endpoints are also included.
- The greatest and least value is always found either at an **extreme point** or at an **endpoint**, never anywhere else.
:::

::: sampunkt "Method"
1. Substitute the endpoints of the interval into $f(x)$ and calculate their $y$-values.
2. Determine the extreme points within the interval in the usual way with the derivative.
3. Compare all the $y$-values. The greatest and least are the answer.
- Extreme points outside the interval do not count.
:::

::: sampunkt "Curve sketching"
- Determine the extreme points and their nature, and the endpoints.
- Join the points with a smooth curve. Do not calculate more points than necessary.
- Mark the endpoints with filled dots, since they belong to the closed interval.
:::

::: sampunkt "Typical example"
- $f(x) = x^3 - 3x$ on $-2 \leq x \leq 3$ has the endpoints $(-2, -2)$ and $(3, 18)$.
- The extreme points are a maximum at $(-1, 2)$ and a minimum at $(1, -2)$.
- The greatest value is 18 at an endpoint, the least value is $-2$ at both an endpoint and an extreme point.
:::

:::
