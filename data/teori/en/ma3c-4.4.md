---
kalla: c67cacd5d5
id: ma3c-4.4
title: The second derivative and the graph of a function
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.4'
---

# The second derivative and the graph of a function

The derivative of the derivative is called the **second derivative**, is written $f''(x)$ and
is read "$f$ double prime of $x$". The second derivative describes how the derivative (or
the slope) changes. A point where the curve switches from convex to concave,
or the other way round, is called a **point of inflection**.

## Convex and concave curves

We have already seen how the sign of the first derivative reveals whether a function
increases or decreases, and how changes of sign reveal extreme points. Now
we examine what the second derivative tells us about the **shape** of the curve.

::: härledning "The second derivative and the graph: analysis of $f'(x)$ and $f''(x)$"
Consider a function $f(x)$ on the interval $a \le x \le d$, with
extreme points where $x = b$ and where $x = c$ (where $b < c$), and a
point of inflection where $x = z$ (between $b$ and $c$). We start by
analysing the first derivative.

| Interval | Sign of $f'(x)$ | What it means |
| --- | --- | --- |
| $a \le x < b$ | $f'(x) < 0$ | the graph decreases (negative slope) |
| $x = b$ | $f'(x) = 0$ | extreme point |
| $b < x < c$ | $f'(x) > 0$ | the graph increases (positive slope) |
| $x = c$ | $f'(x) = 0$ | extreme point |
| $c < x \le d$ | $f'(x) < 0$ | the graph decreases (negative slope) |

We now analyse the second derivative $f''(x)$, which describes how $f'(x)$,
that is the slope, changes.

| Interval | Sign of $f''(x)$ | What it means |
| --- | --- | --- |
| $a \le x < z$ | $f''(x) > 0$ | the slope increases: the curve is convex |
| $x = z$ | $f''(x) = 0$ | the slope does not change: point of inflection |
| $z < x \le d$ | $f''(x) < 0$ | the slope decreases: the curve is concave |
:::

::: härledning "The second derivative and the graph: remember"
At a point where

1. the curve bends upwards (a "happy" curve), the second derivative is **positive** and
   the curve is **convex**,
2. the curve bends downwards (a "sad" curve), the second derivative is **negative**
   and the curve is **concave**,
3. the slope of the curve does not change (the corner of the mouth between a "happy" and a "sad"
   curve), the second derivative is **zero**: the point is a **point of inflection**.
:::

::: figur
<svg viewBox="12 6 280 173" width="409" height="253" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Graph showing the transition between a concave and a convex curve. The left part of the curve is blue and concave, with a negative second derivative. The right part is red and convex, with a positive second derivative. In between, where the slope of the curve does not change, lies the point of inflection. Point at or tap a part of the curve or the point of inflection to show the sign of the second derivative." style="overflow:visible">
<style>.q44s{cursor:pointer;outline:none}.q44s .q44-cv{transition:stroke-width .18s ease}.q44s:hover .q44-cv,.q44s:focus .q44-cv{stroke-width:3.6}.q44s .q44-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q44s:hover .q44-lbl,.q44s:focus .q44-lbl{opacity:1}.q44s .q44-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q44s:hover .q44-pt,.q44s:focus .q44-pt{transform:scale(1.5)}</style>
<line x1="16" y1="105" x2="275" y2="105" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="288,105 275,100.5 275,109.5" fill="#1f2530"/>
<line x1="150" y1="175" x2="150" y2="25" stroke="#1f2530" stroke-width="1.6"/>
<polygon points="150,14 145.5,25 154.5,25" fill="#1f2530"/>
<text x="283" y="122" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text>
<text x="160" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text>
<g class="q44s" tabindex="0">
<path d="M 29,169.8 C 30.83,164.33 36.33,146.65 40,137 C 43.67,127.35 47.33,119.12 51,111.9 C 54.67,104.68 58.33,98.73 62,93.7 C 65.67,88.67 69.33,84.8 73,81.7 C 76.67,78.6 80.33,76.55 84,75.1 C 87.67,73.65 91.33,73.05 95,73 C 98.67,72.95 102.33,73.68 106,74.8 C 109.67,75.92 113.33,77.7 117,79.7 C 120.67,81.7 124.33,84.17 128,86.8 C 131.67,89.43 135.33,92.47 139,95.5 C 142.67,98.53 148.17,103.42 150,105" fill="none" stroke="transparent" stroke-width="16"/>
<path class="q44-cv" d="M 29,169.8 C 30.83,164.33 36.33,146.65 40,137 C 43.67,127.35 47.33,119.12 51,111.9 C 54.67,104.68 58.33,98.73 62,93.7 C 65.67,88.67 69.33,84.8 73,81.7 C 76.67,78.6 80.33,76.55 84,75.1 C 87.67,73.65 91.33,73.05 95,73 C 98.67,72.95 102.33,73.68 106,74.8 C 109.67,75.92 113.33,77.7 117,79.7 C 120.67,81.7 124.33,84.17 128,86.8 C 131.67,89.43 135.33,92.47 139,95.5 C 142.67,98.53 148.17,103.42 150,105" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round"/>
<text x="50" y="60" font-size="13" text-anchor="start" fill="#2563c9">Concave</text>
<g class="q44-lbl"><rect x="47" y="64" width="58" height="16" rx="4" fill="#f3eee4"/><text x="50" y="76" font-size="12" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) &lt; 0</text></g>
</g>
<g class="q44s" tabindex="0">
<path d="M 150,105 C 151.83,106.58 157.33,111.47 161,114.5 C 164.67,117.53 168.33,120.57 172,123.2 C 175.67,125.83 179.33,128.3 183,130.3 C 186.67,132.3 190.33,134.08 194,135.2 C 197.67,136.32 201.33,137.03 205,137 C 208.67,136.97 212.33,136.45 216,135 C 219.67,133.55 223.33,131.42 227,128.3 C 230.67,125.18 234.33,121.33 238,116.3 C 241.67,111.27 245.33,105.32 249,98.1 C 252.67,90.88 256.33,82.65 260,73 C 263.67,63.35 269.17,45.67 271,40.2" fill="none" stroke="transparent" stroke-width="16"/>
<path class="q44-cv" d="M 150,105 C 151.83,106.58 157.33,111.47 161,114.5 C 164.67,117.53 168.33,120.57 172,123.2 C 175.67,125.83 179.33,128.3 183,130.3 C 186.67,132.3 190.33,134.08 194,135.2 C 197.67,136.32 201.33,137.03 205,137 C 208.67,136.97 212.33,136.45 216,135 C 219.67,133.55 223.33,131.42 227,128.3 C 230.67,125.18 234.33,121.33 238,116.3 C 241.67,111.27 245.33,105.32 249,98.1 C 252.67,90.88 256.33,82.65 260,73 C 263.67,63.35 269.17,45.67 271,40.2" fill="none" stroke="#c8324a" stroke-width="2.4" stroke-linecap="round"/>
<text x="210" y="155" font-size="13" text-anchor="start" fill="#c8324a">Convex</text>
<g class="q44-lbl"><text x="210" y="171" font-size="12" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) &gt; 0</text></g>
</g>
<g class="q44s" tabindex="0">
<circle cx="150" cy="105" r="15" fill="transparent"/>
<line x1="160" y1="52" x2="152" y2="99" stroke="rgba(31,37,48,0.5)" stroke-width="1.2" stroke-dasharray="3 3"/>
<circle class="q44-pt" cx="150" cy="105" r="3.5" fill="#f3eee4" stroke="#1f2530" stroke-width="1.6"/>
<text x="163" y="42" font-size="12" text-anchor="start" fill="#1f2530">Point of inflection</text>
<g class="q44-lbl"><text x="163" y="57" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>&#8243;(<tspan font-style="italic">x</tspan>) = 0</text></g>
</g>
</svg>
<p class="lab-figur-cap">The second derivative is negative for the whole blue part of the curve ("sad" curve, concave) and positive for the whole red part ("happy" curve, convex). At the point of inflection, where the curve is neither concave nor convex, the second derivative is equal to zero. Point at or tap a part of the curve or the point of inflection to show the sign of the second derivative.</p>
:::

::: exempel "Example 1: Point of inflection and convexity"
**The function $f(x) = x^3 - 6x^2 + 7x$ is given.<br>
a) Determine the coordinates of the point of inflection.<br>b) In which
interval is the function convex?**

::: handskrift
typ: inflexionspunkt
:::

::: textlosning
**a)** At the point of inflection the second derivative is equal to zero. We find
the second derivative by differentiating the function twice, set it equal
to zero and then solve the equation to find the
$x$-coordinate of the point of inflection.

$$
f'(x) = 3x^2 - 12x + 7
$$

$$
f''(x) = 6x - 12
$$

$f''(x) = 0$ gives

$$
\begin{aligned}
6x - 12 &= 0 \\
6x &= 12 \\
x &= 2
\end{aligned}
$$

We substitute $x = 2$ into the original function
$f(x) = x^3 - 6x^2 + 7x$ to determine the
$y$-coordinate of the point of inflection.

$$
f(2) = 2^3 - 6 \cdot 2^2 + 7 \cdot 2 = 8 - 24 + 14 = -2
$$

So the point of inflection has the coordinates $(2, -2)$.

**Answer:** $(2, -2)$

**b)** The function is convex when $f''(x) > 0$. We already have
$f''(x) = 6x - 12$.

$f''(x) > 0$ gives

$$
\begin{aligned}
6x - 12 &> 0 \\
6x &> 12 \\
x &> 2
\end{aligned}
$$

**Answer:** $x > 2$
:::
:::

::: exempel "Example 2: Point of inflection from the graph of $f(x)$ or $f'(x)$"
**State the $x$-coordinate of the point of inflection of the function $f(x)$.<br>
a) $f(x)$ is a cubic polynomial, and the graph of $y = f(x)$ has
extreme points where $x = -1$ and $x = 1$.<br>b) The graph of $y = f'(x)$ has an extreme point
(minimum) where $x = 1$.**

::: handskrift
typ: inflexionurgraf
:::

::: textlosning
**a)** The point of inflection of the function $f(x)$ is where the graph of
$f(x)$ switches between being convex and concave (at the "corner of the mouth"). The graph
of a cubic polynomial is symmetric about its point of inflection, so it lies midway
between the two extreme points.

We have extreme points where $x = -1$ and $x = 1$. So the
point of inflection lies midway between them, that is when $x = 0$.

**Answer:** $x = 0$

**b)** At the point of inflection $f''(x) = 0$. We can see $f''(x)$ as
the derivative (the slope) of $f'(x)$. So the point of inflection of the function
$f(x)$ is where the graph of $f'(x)$ has slope 0, that is at its
own extreme point.

The graph of $f'(x)$ has an extreme point (minimum) where $x = 1$.

**Answer:** $x = 1$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The second derivative"
- The **second derivative** is the derivative of the derivative, is written $f''(x)$ and is read "$f$ double prime of $x$".
- It describes how the **slope** changes, that is the shape of the curve.
- The first derivative tells whether the curve goes up or down, the second derivative how it bends.
:::

::: sampunkt "Convex and concave"
- $f''(x) > 0$: the slope increases, the curve bends upwards and is **convex**, like a happy mouth.
- $f''(x) < 0$: the slope decreases, the curve bends downwards and is **concave**, like a sad mouth.
- $f''(x) = 0$ and changes sign: the curve switches from convex to concave or the other way round. The point is a **point of inflection**.
:::

::: sampunkt "Determining the point of inflection"
1. Differentiate twice to get $f''(x)$.
2. Set $f''(x) = 0$ and solve the equation. This gives the $x$-coordinate.
3. Substitute $x$ into the **original** function for the $y$-coordinate.
- $f(x) = x^3 - 6x^2 + 7x$ gives $f''(x) = 6x - 12$ and the point of inflection $(2, -2)$.
:::

::: sampunkt "Reading from a graph"
- The graph of a cubic polynomial: the point of inflection lies midway between the two extreme points.
- The graph of $f'(x)$: the point of inflection lies at the **own extreme point** of $f'(x)$, since the slope is 0 there.
- The function is convex in the intervals where $f''(x) > 0$.
:::

:::
