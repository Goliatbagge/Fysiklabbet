---
kalla: 38cf1aa289
id: ma3c-4.S
title: Summary
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.S'
---

# Summary: Curves and extreme values

This chapter was about how the derivative reveals what a function
looks like: where it increases and decreases, where it has local maximum and
minimum points, and how the curve bends (convex or concave). You have learnt
to determine the nature of extreme points both with a sign table and with
the second derivative, to find the greatest and least value of a function in a
closed interval, to sketch a curve from its extreme points, and to
solve optimisation problems both algebraically and graphically with a digital
tool. After the chapter you should be able to read off and calculate the
shape and extreme points of a curve, and use this to solve applied
optimisation problems.

## Concepts to know

- **increasing function**: a function whose graph has a positive slope in an
  interval; $f'(x) > 0$.
- **decreasing function**: a function whose graph has a negative slope in an
  interval; $f'(x) < 0$.
- **strictly increasing / strictly decreasing**: a function that is increasing
  (decreasing) in the WHOLE of an interval, without interruption.
- **local extreme point**: a common name for a local maximum point (a "peak",
  where the curve switches from increasing to decreasing) and a local minimum point
  (a "valley", where the curve switches from decreasing to increasing).
  The function value at the point is called a **local extreme value**.
- **stationary point of inflection**: a point where the tangent is horizontal ($f'(a) = 0$) but
  the curve continues in the same direction as before, without turning.
- **sign table**: a table that shows the sign of $f'(x)$ (or $f''(x)$)
  in the intervals between the zeros; used to determine the
  nature of extreme points or the shape of the curve.
- **second derivative ($f''(x)$)**: the derivative of the derivative, read
  "$f$ double prime of $x$"; describes how the slope $f'(x)$ changes.
- **convex curve**: a curve that "bends upwards" (a "happy" curve);
  $f''(x) > 0$.
- **concave curve**: a curve that "bends downwards" (a "sad" curve);
  $f''(x) < 0$.
- **point of inflection**: the point where the curve switches between convex and
  concave; $f''(x) = 0$.
- **second derivative method**: a method for determining the nature of an extreme point
  using the sign of $f''(a)$, as an alternative to a sign table.
- **extreme value problem (optimisation problem)**: a problem that is about
  determining the greatest or least possible value, for example maximum area
  or minimum cost.
- **curve sketching**: sketching the graph of a function from its
  endpoints, extreme points and points of inflection, without calculating
  more points than necessary.

## Formulas

::: formel "Formulas and rules of the chapter"
**Increasing and decreasing function**

$$
f'(x) > 0 \quad \Rightarrow \quad f(x) \text{ is increasing}
$$

$$
f'(x) < 0 \quad \Rightarrow \quad f(x) \text{ is decreasing}
$$

**Local extreme point**

$$
f'(a) = 0
$$

The point where $x = a$ is then a local maximum point, a local minimum point
or a stationary point of inflection, which is decided with a sign table or with
the second derivative.

**The second derivative and the shape of the curve**

$$
f''(a) > 0 \quad \Rightarrow \quad \text{the curve is convex at } x = a
$$

$$
f''(a) < 0 \quad \Rightarrow \quad \text{the curve is concave at } x = a
$$

$$
f''(a) = 0 \text{ and } f'' \text{ changes sign} \quad \Rightarrow \quad x = a \text{ is a point of inflection}
$$

**The second derivative method: the nature of the extreme point**

If $f'(a) = 0$, then

$$
f''(a) > 0 \quad \Rightarrow \quad \text{local minimum point}
$$

$$
f''(a) < 0 \quad \Rightarrow \quad \text{local maximum point}
$$

$$
f''(a) = 0 \quad \Rightarrow \quad \text{stationary point of inflection or extreme point (sign table needed)}
$$

where

- $f'(x)$ = first derivative (the slope of the curve)
- $f''(x)$ = second derivative (how the slope changes)
:::

## Important relationships and methods

- The method "differentiate $\to$ set $f'(x) = 0$ $\to$ solve" gives the
  $x$-coordinates of the extreme points; then substitute these into the ORIGINAL function
  $f(x)$, not into the derivative, to get the $y$-coordinates.
- The nature of an extreme point can be determined in two ways: with a
  sign table (the sign of $f'(x)$ just to the left/right of the point)
  or more quickly with the second derivative method. If $f''(a) = 0$, the
  second derivative method is not enough, and a sign table is needed anyway.
- For a quadratic function the nature can be decided directly without
  differentiating, from the sign in front of the $x^2$ term: a positive
  coefficient gives a "happy" curve (minimum point), a negative one gives a "sad"
  curve (maximum point).
- Greatest/least value in a closed interval $a \leq x \leq b$: compare
  the function value at ALL extreme points within the interval with the values at the
  two endpoints. The greatest/least of these is the answer, never any
  other place.
- Curve sketching: draw a smooth curve through the endpoints, extreme points
  and points of inflection. Whether the curve rises or falls between
  the points is given by the sign of $f'(x)$ in the sign table.
- For a cubic polynomial the point of inflection lies midway between the two
  extreme points (symmetry). This is a shortcut when
  the $x$-coordinates of the extreme points are already known.
- The second derivative $f''(x)$ can be interpreted as the derivative of $f'(x)$: a
  point of inflection of $f(x)$ corresponds to an extreme point of $f'(x)$.
- Optimisation problems are solved in the same steps as when you normally find
  extreme points, with one addition: a constraint is used to rewrite
  the quantity to be optimised in ONE single variable before differentiating, and
  the answer is finally interpreted in the context of the problem (with the correct unit).
- Always check that the answer to an optimisation problem lies within a
  reasonable domain, for example that a radius or height does not become
  negative.
- Optimisation problems can also be solved graphically with a digital tool,
  for example Geogebra: draw the function and use the Extremum tool
  instead of differentiating by hand. The $x$-coordinate gives the variable
  sought and the $y$-coordinate the optimised value, but only as a
  rounded value, not an exact expression.
- Distinguish a local extreme point (the curve turns) from a stationary point of inflection (the curve
  levels out but continues in the same direction). Both have $f'(a) = 0$, but
  only at an extreme point does $f'(x)$ change sign.

## Figures worth remembering

A curve that rises to a peak, falls to a valley and rises again:
the basic definition of a local maximum point and a local minimum point.

::: figur
<svg viewBox="4 -2 268 202" width="392" height="295" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A curve that rises to a local maximum point, falls to a local minimum point and then rises again. Point at or tap an extreme point to show the horizontal tangent and that the derivative is 0 there." style="overflow:visible"><style>.q42s{cursor:pointer;outline:none}.q42s .q42-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q42s:hover .q42-lbl,.q42s:focus .q42-lbl{opacity:1}.q42s .q42-pt{transition:transform .18s ease;transform-box:fill-box;transform-origin:center}.q42s:hover .q42-pt,.q42s:focus .q42-pt{transform:scale(1.5)}</style><line x1="20" y1="100" x2="236" y2="100" stroke="#1f2530" stroke-width="1.6"/><polygon points="248,100 236,95 236,105" fill="#1f2530"/><line x1="132" y1="190" x2="132" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="132,4 127,18 137,18" fill="#1f2530"/><text x="244" y="118" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="140" y="15" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 40,176.4 C 40.77,173.03 43.07,162.5 44.6,156.2 C 46.13,149.9 47.67,144.08 49.2,138.6 C 50.73,133.12 52.27,128.02 53.8,123.3 C 55.33,118.58 56.87,114.28 58.4,110.3 C 59.93,106.32 61.47,102.7 63,99.4 C 64.53,96.1 66.07,93.17 67.6,90.5 C 69.13,87.83 70.67,85.47 72.2,83.4 C 73.73,81.33 75.27,79.62 76.8,78.1 C 78.33,76.58 79.87,75.32 81.4,74.3 C 82.93,73.28 84.47,72.53 86,72 C 87.53,71.47 89.07,71.22 90.6,71.1 C 92.13,70.98 93.67,71.07 95.2,71.3 C 96.73,71.53 98.27,71.93 99.8,72.5 C 101.33,73.07 102.87,73.83 104.4,74.7 C 105.93,75.57 107.47,76.58 109,77.7 C 110.53,78.82 112.07,80.08 113.6,81.4 C 115.13,82.72 116.67,84.13 118.2,85.6 C 119.73,87.07 121.27,88.63 122.8,90.2 C 124.33,91.77 125.87,93.37 127.4,95 C 128.93,96.63 130.47,98.33 132,100 C 133.53,101.67 135.07,103.37 136.6,105 C 138.13,106.63 139.67,108.23 141.2,109.8 C 142.73,111.37 144.27,112.93 145.8,114.4 C 147.33,115.87 148.87,117.28 150.4,118.6 C 151.93,119.92 153.47,121.18 155,122.3 C 156.53,123.42 158.07,124.43 159.6,125.3 C 161.13,126.17 162.67,126.93 164.2,127.5 C 165.73,128.07 167.27,128.47 168.8,128.7 C 170.33,128.93 171.87,129.02 173.4,128.9 C 174.93,128.78 176.47,128.53 178,128 C 179.53,127.47 181.07,126.72 182.6,125.7 C 184.13,124.68 185.67,123.42 187.2,121.9 C 188.73,120.38 190.27,118.67 191.8,116.6 C 193.33,114.53 194.87,112.17 196.4,109.5 C 197.93,106.83 199.47,103.9 201,100.6 C 202.53,97.3 204.07,93.68 205.6,89.7 C 207.13,85.72 208.67,81.42 210.2,76.7 C 211.73,71.98 213.27,66.88 214.8,61.4 C 216.33,55.92 217.87,50.1 219.4,43.8 C 220.93,37.5 223.23,26.97 224,23.6" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q42s" tabindex="0"><circle cx="92" cy="71" r="16" fill="transparent"/><circle class="q42-pt" cx="92" cy="71" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="62" y1="71" x2="122" y2="71" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="90" y="58" font-size="11.5" text-anchor="middle" fill="#c8324a">derivative is 0</text></g></g><g class="q42s" tabindex="0"><circle cx="172" cy="129" r="16" fill="transparent"/><circle class="q42-pt" cx="172" cy="129" r="3.2" fill="#c8324a"/><g class="q42-lbl"><line x1="142" y1="129" x2="202" y2="129" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="5 4"/><text x="160" y="150" font-size="11.5" text-anchor="end" fill="#c8324a">derivative is 0</text></g></g><text x="8" y="34" font-size="12.5" fill="#1f2530">local</text><text x="8" y="47" font-size="12.5" fill="#1f2530">maximum point</text><text x="182" y="150" font-size="12.5" fill="#1f2530">local</text><text x="182" y="163" font-size="12.5" fill="#1f2530">minimum point</text></svg>

Point at or tap an extreme point to show the horizontal tangent.
:::

The transition between a concave (blue) and a convex (red) part of a curve,
with the point of inflection in between:

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

## Before the test

- Can you decide whether a function is increasing or decreasing from
  the sign of $f'(x)$, both from a graph and from a function expression?
- Do you know the difference between a local maximum point, a local minimum point
  and a stationary point of inflection?
- Can you determine local extreme points by differentiating, setting
  $f'(x) = 0$ and solving the equation, and then substituting the $x$-values into
  the ORIGINAL function to get the $y$-coordinates?
- Can you determine the nature of an extreme point with a sign table?
- Do you know how to quickly decide the nature of the extreme point of a quadratic function
  from the sign of the $x^2$ term?
- Can you determine the greatest and least value of a function in a closed
  interval by comparing extreme points with the endpoints of the interval?
- Can you sketch the graph of a function (curve sketching) from its
  endpoints, extreme points and their nature?
- Do you know what the second derivative $f''(x)$ describes, and can you decide whether a
  curve is convex or concave from its sign?
- Can you determine the coordinates of a point of inflection, and do you know that it
  lies midway between the two extreme points of a cubic polynomial?
- Can you use the second derivative method to decide the nature of an extreme point
  without a sign table, and do you know when the method is not enough
  ($f''(a) = 0$)?
- Can you solve an optimisation problem: set up a formula, use a
  constraint to get a single variable, differentiate, determine the nature
  and interpret the answer in context?
- Can you solve an optimisation problem graphically with a digital tool,
  for example with Geogebra's Extremum tool?
