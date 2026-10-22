---
kalla: 4b2afed809
id: ma3c-2.5
title: Differentiability and absolute value
course: Matematik fortsättning nivå 1c
chapter: Derivatan
chapterNumber: 2
section: '2.5'
---

# Differentiability and absolute value

If it is possible to calculate the derivative at a point, the function is **differentiable**
at that point. To understand differentiability we first need to go through
the concepts of continuous/discontinuous function and absolute value.

## Continuous and discontinuous functions

::: tips "Continuous and discontinuous functions"
A function whose graph
1. is connected is **continuous**. We can draw the graph of a continuous function
   "without lifting the pen".
2. is not connected, because of a "jump" or a "break", is
   **discontinuous** at the point.
:::

A discontinuity can look different. At a **jump** the
function value suddenly changes to a different value at the point. The graph is then
often drawn with an open ring (the point is not included) and a filled dot (the point
is included) at different heights. At a **break** the graph instead tends to
infinity on either side of the point, for example at a vertical asymptote, where
the graph is split into two branches that tend to $+\infty$ and $-\infty$ respectively.

## Absolute value

The distance of a number from 0 on the number line is called its **absolute value**. The absolute
value of a number $a$ is written $|a|$ and read "the absolute value of $a$".

For example,

$$
|2| = 2 \qquad \text{(the distance from 2 to 0 on the number line is 2)}
$$

$$
|-3| = 3 \qquad \text{(the distance from −3 to 0 on the number line is 3)}
$$

We can also see it as the absolute value "removing" the minus sign from
negative numbers.

We make a table of values for the function $f(x) = |x|$ and investigate what the graph
looks like.

$$
\begin{array}{c|ccccccc}
x & -3 & -2 & -1 & 0 & 1 & 2 & 3 \ \hline
f(x) = |x| & 3 & 2 & 1 & 0 & 1 & 2 & 3
\end{array}
$$

::: figur
<svg viewBox="-4 -20 221 148" width="300" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of f of x equals the absolute value of x. The graph is shaped like a V with its tip at the origin, which forms a corner."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><text x="140" y="35" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = |<tspan font-style="italic">x</tspan>|</text></svg>

The graph gets a "corner".
:::

## Differentiability

::: tips "Differentiability"
A function is **not** differentiable at a particular point if the function
1. is not defined at the point (for example when the graph has a "break"),
2. is discontinuous at the point (for example when the graph has a "jump"), or
3. has a corner point at the point (when the graph has a "corner").
:::

::: härledning "Did you know: Differentiability"
How can it be that a function with a corner point is not differentiable at
the corner point, even though it is both defined and continuous at the point?
We look at the graph of $f(x) = |x|$ again.

::: figur
<svg viewBox="-10 -20 227 148" width="308" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of f of x equals the absolute value of x with two dashed steps showing the slope minus 1 to the left of the origin and the slope 1 to the right of the origin."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><text x="140" y="35" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = |<tspan font-style="italic">x</tspan>|</text><line x1="126" y1="75.6" x2="154" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="154" y1="75.6" x2="154" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="160" y="64" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">k</tspan> = 1</text><line x1="42" y1="47.6" x2="70" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="70" y1="47.6" x2="70" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="36" y="64" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">k</tspan> = −1</text></svg>
:::

We see that if we investigate the limit as we approach $x = 0$ from
the left, then $f'(0) = -1$ (the slope there is $-1$). If we instead
investigate the limit as we approach $x = 0$ from the right, then
$f'(0) = 1$ (the slope there is $1$). Since the limit is different,
depending on which direction we approach $x = 0$ from, the derivative has no
unique value, and so $f(x) = |x|$ is not differentiable at $x = 0$.
:::

::: exempel "Example 1: Calculate an absolute value"
**Calculate $|x^3 + 5|$ for $x = -2$.**

::: handskrift
typ: absolutbelopp
:::

::: textlosning
We set $x = -2$ in the expression $|x^3 + 5|$ and calculate.

$$
|(-2)^3 + 5| = |-8 + 5| = |-3| = 3
$$

**Answer:** 3
:::
:::

::: exempel "Example 2: Solve an equation with an absolute value"
**Solve the equation $|x - 7| = 10$.**

::: handskrift
typ: absolutekvation
:::

::: textlosning
If $|x - 7| = 10$, then either $x - 7 = 10$ or $x - 7 = -10$, which we
can solve separately.

$$
x - 7 = 10 \qquad \text{or} \qquad x - 7 = -10
$$

which gives $x_1 = 17$ and $x_2 = -3$ respectively.

Alternatively we can set up the equation $x - 7 = \pm 10$ and get both
solutions directly.

$$
x - 7 = \pm 10 \quad \Rightarrow \quad x_1 = 7 + 10 = 17, \quad x_2 = 7 - 10 = -3
$$

**Answer:** $x_1 = 17$ and $x_2 = -3$
:::
:::

::: exempel "Example 3: Reading off differentiability from a graph"
**The figure shows the graph of a function. For which values of $x$ is
the function not differentiable?**

::: figur
<svg viewBox="-2 -2 252 136" width="342" height="185" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function with a corner at x equals minus 4 and a jump at x equals 0. Point at or tap the corner or the jump to show why the function is not differentiable there." style="overflow:visible"><style>.q25s{cursor:pointer;outline:none}.q25s .q25-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q25s:hover .q25-lbl,.q25s:focus .q25-lbl{opacity:1}.q25s .q25-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q25s:hover .q25-pt,.q25s:focus .q25-pt{transform:scale(1.35)}</style><line x1="0" y1="98.4" x2="234.8" y2="98.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="244.8,98.4 234.8,93.9 234.8,102.9" fill="#1f2530"/><line x1="158.4" y1="112" x2="158.4" y2="10" stroke="#1f2530" stroke-width="1.6"/><polygon points="158.4,0 153.9,10 162.9,10" fill="#1f2530"/><text x="62.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="110.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="148" y="118" font-size="12" text-anchor="end" fill="#1f2530">0</text><text x="206.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="242.8" y="90.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="167.4" y="10" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14.4,86.4 L62.4,26.4 Q110.4,178.8 158.4,105.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><path d="M158.4,69.6 Q194.4,56.4 230.4,19.2" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><g class="q25s" tabindex="0"><circle cx="62.4" cy="26.4" r="16" fill="transparent"/><g class="q25-lbl"><circle cx="62.4" cy="26.4" r="7" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="72" y="16" font-size="11" fill="#c8324a">corner:</text><text x="72" y="29" font-size="11" fill="#c8324a">no derivative</text></g></g><g class="q25s" tabindex="0"><rect x="146" y="60" width="26" height="56" fill="transparent"/><circle class="q25-pt" cx="158.4" cy="105.6" r="4" fill="#fdfaf3" stroke="#2563c9" stroke-width="1.8"/><circle class="q25-pt" cx="158.4" cy="69.6" r="4" fill="#2563c9" stroke="#2563c9" stroke-width="1.8"/><g class="q25-lbl" fill="#c8324a" font-size="11"><text x="164" y="82">jump:</text><text x="164" y="95">no derivative</text></g></g></svg>

Point at or tap the corner at $x = -4$ or the jump at $x = 0$.
:::

::: handskrift
typ: deriverbarhet
:::

::: textlosning
The graph has a corner when $x = -4$ and is discontinuous (it has a jump)
when $x = 0$. So at these points the function is not differentiable.

**Answer:** $x = -4$ and $x = 0$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Continuous or not"
- **Continuous function:** the graph is connected and can be drawn without lifting the pen.
- **Discontinuous function:** the graph has a jump or a break at the point.
- A **jump** is drawn with an open ring and a filled dot at different heights.
- A **break** occurs, for example, at a vertical asymptote, where the graph tends to $+\infty$ and $-\infty$.
:::

::: sampunkt "Absolute value"
- The **absolute value** of a number is its distance from 0 on the number line, and is written $|a|$.
- $|2| = 2$ and $|-3| = 3$. So the absolute value removes the minus sign.
- The graph of $f(x) = |x|$ is a V with its tip at the origin, that is a corner.
:::

::: sampunkt "Differentiability"
A function is **not** differentiable at a point where the graph
1. is not defined, that is has a break,
2. is discontinuous, that is has a jump,
3. has a corner point.
- At the corner of $|x|$ the slope is $-1$ from the left and $1$ from the right. Different limits give no unique derivative.
:::

::: sampunkt "Calculating with absolute values"
- Calculate the contents first and take the absolute value last: $|(-2)^3 + 5| = |-3| = 3$.
- The equation $|x - 7| = 10$ gives two cases: $x - 7 = 10$ or $x - 7 = -10$.
- A shorter way of writing it: $x - 7 = \pm 10$, so $x_1 = 17$ and $x_2 = -3$.
:::

:::
