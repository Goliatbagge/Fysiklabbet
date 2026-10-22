---
kalla: 90ca2cd508
id: ma3b-2.7
title: Continuity and differentiability
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.7'
---

<!-- Egen 1b-version av ma3c-2.5 "Deriverbarhet och absolutbelopp".
     Absolutbelopp ingår inte i Matematik fortsättning nivå 1b (Gy25), så
     den delen är struken; kontinuitet och deriverbarhet är desamma. Ändras
     de delarna i ma3c-2.5 ska samma ändring göras här. -->

# Continuity and differentiability

If the derivative can be calculated at a point, the function is **differentiable**
at that point. Most functions we meet are differentiable everywhere, but
not all. To see where things go wrong we first need the concepts
continuous and discontinuous function.

## Continuous and discontinuous function

::: tips "Continuous and discontinuous function"
A function whose graph
1. is connected is **continuous**. We can draw the graph of a continuous function
   "without lifting the pen".
2. is not connected, because of a "jump" or a "break", is
   **discontinuous** at the point.
:::

A discontinuity can look different. At a **jump** the
function value suddenly changes to a different value at the point. The graph is then
often drawn with an open circle (the point is not included) and a filled dot (the point
is included) at different heights. An everyday example is a parking fee that
is charged per started hour: the price stays still for a while and then jumps up
to the next level. At a **break** the graph instead goes towards infinity
on either side of the point, for example at a vertical asymptote, where the graph
is split into two branches that go towards $+\infty$ and $-\infty$ respectively. This happens
where a denominator becomes 0, because the function is not defined there.

## Corner point

A graph can be connected and still have a sharp point. The figure shows a graph that
consists of two straight lines: $y = -x$ to the left of the origin and $y = x$ to
the right of the origin. They meet at the origin and form a **corner**, a **corner point**.

::: figur
<svg viewBox="-4 -20 221 148" width="300" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A graph shaped like a V with its tip at the origin. The graph consists of the line y equals minus x on the left and the line y equals x on the right, and they form a corner at the origin."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/></svg>

The graph is connected but has a "corner" at the origin.
:::

## Differentiability

::: tips "Differentiability"
A function is **not** differentiable at a certain point if the function
1. is not defined at the point (for example when the graph has a "break"),
2. is discontinuous at the point (for example when the graph has a "jump"), or
3. has a corner point at the point (when the graph has a "corner").
:::

::: förklaring "Explanation: Why a corner is not differentiable"
How can it be that a function with a corner point is not differentiable at
the corner point, even though it is both defined and continuous at the point?
We look at the graph with the corner at the origin again.

::: figur
<svg viewBox="-10 -20 227 148" width="308" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A graph that consists of two straight lines that meet at the origin and form a corner. Two dashed steps show the slope minus 1 to the left of the origin and the slope 1 to the right of the origin."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><line x1="126" y1="75.6" x2="154" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="154" y1="75.6" x2="154" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="160" y="64" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">k</tspan> = 1</text><line x1="42" y1="47.6" x2="70" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="70" y1="47.6" x2="70" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="36" y="64" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">k</tspan> = −1</text></svg>
:::

If we investigate the limit as we approach $x = 0$ from the left, the
slope is $-1$, because there the graph is the line $y = -x$. If we instead
approach $x = 0$ from the right, the slope is $1$, because there the graph is
the line $y = x$. Since the limit is different depending on the direction
from which we approach $x = 0$, there is no unique tangent at the corner.
So the derivative has no value there, and the function is not differentiable at
$x = 0$.
:::

::: exempel "Example 1: Read off differentiability from a graph"
**The figure shows the graph of a function. For which values of $x$ is
the function not differentiable?**

::: figur
<svg viewBox="-2 -2 252 136" width="342" height="185" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function with a corner at x equals minus 4 and a jump at x equals 0. Point at or tap the corner or the jump to see why the function is not differentiable there." style="overflow:visible"><style>.q25s{cursor:pointer;outline:none}.q25s .q25-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q25s:hover .q25-lbl,.q25s:focus .q25-lbl{opacity:1}.q25s .q25-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q25s:hover .q25-pt,.q25s:focus .q25-pt{transform:scale(1.35)}</style><line x1="0" y1="98.4" x2="234.8" y2="98.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="244.8,98.4 234.8,93.9 234.8,102.9" fill="#1f2530"/><line x1="158.4" y1="112" x2="158.4" y2="10" stroke="#1f2530" stroke-width="1.6"/><polygon points="158.4,0 153.9,10 162.9,10" fill="#1f2530"/><text x="62.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><text x="110.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="148" y="118" font-size="12" text-anchor="end" fill="#1f2530">0</text><text x="206.4" y="114.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="242.8" y="90.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="167.4" y="10" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14.4,86.4 L62.4,26.4 Q110.4,178.8 158.4,105.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><path d="M158.4,69.6 Q194.4,56.4 230.4,19.2" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><g class="q25s" tabindex="0"><circle cx="62.4" cy="26.4" r="16" fill="transparent"/><g class="q25-lbl"><circle cx="62.4" cy="26.4" r="7" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="72" y="16" font-size="11" fill="#c8324a">corner:</text><text x="72" y="29" font-size="11" fill="#c8324a">not differentiable</text></g></g><g class="q25s" tabindex="0"><rect x="146" y="60" width="26" height="56" fill="transparent"/><circle class="q25-pt" cx="158.4" cy="105.6" r="4" fill="#fdfaf3" stroke="#2563c9" stroke-width="1.8"/><circle class="q25-pt" cx="158.4" cy="69.6" r="4" fill="#2563c9" stroke="#2563c9" stroke-width="1.8"/><g class="q25-lbl" fill="#c8324a" font-size="11"><text x="164" y="82">jump: not</text><text x="164" y="95">differentiable</text></g></g></svg>

Point at or tap the corner at $x = -4$ or the jump at $x = 0$.
:::

::: handskrift
typ: deriverbarhet
:::

::: textlosning
The graph has a corner at $x = -4$ and is discontinuous (it has a jump)
at $x = 0$. So the function is not differentiable at these points.

**Answer:** $x = -4$ and $x = 0$
:::
:::

::: exempel "Example 2: Where the denominator becomes zero"
**For which value of $x$ is the function $f(x) = \dfrac{5}{x - 3}$ not
differentiable? Justify your answer.**

::: handskrift
typ: ejdefinierad
:::

::: textlosning
Division by 0 is not defined. So the function is not defined where
the denominator is 0, and we solve the equation

$$
x - 3 = 0
$$

and add 3 to both sides, which gives $x = 3$.

For $x = 3$ the function is not defined. The graph has a break there (a
vertical asymptote), and therefore the function is not differentiable at $x = 3$.
For all other values of $x$ it is differentiable.

**Answer:** $x = 3$, because the function is not defined there.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Continuous or not"
- **Continuous function:** the graph is connected and can be drawn without lifting the pen.
- **Discontinuous function:** the graph has a jump or a break at the point.
- A **jump** is drawn with an open circle and a filled dot at different heights.
:::

::: sampunkt "Breaks and corners"
- A **break** occurs, for example, at a vertical asymptote, where the graph goes towards $+\infty$ and $-\infty$.
- A break arises where a denominator becomes 0, because the function is not defined there.
- A **corner point** is a sharp point in a graph that is connected.
:::

::: sampunkt "Differentiability"
A function is **not** differentiable at a point where the graph
1. is not defined, that is, has a break,
2. is discontinuous, that is, has a jump,
3. has a corner point.
:::

::: sampunkt "Why not at a corner?"
- To the left and to the right of the corner the graph has different slopes.
- The limits are different, so there is no unique tangent.
- Without a tangent there is no derivative at the point.
:::

:::
