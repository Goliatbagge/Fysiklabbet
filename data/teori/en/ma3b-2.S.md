---
kalla: c7cf92cedb
id: ma3b-2.S
title: Summary
course: Matematik fortsättning nivå 1b
chapter: Linjär optimering och derivatan
chapterNumber: 2
section: '2.S'
---

<!-- Egen sammanfattning för Matematik fortsättning nivå 1b (ma3b-2.S):
     linjär optimering i stället för absolutbelopp (ingår inte i nivå 1b).
     Övrigt innehåll är detsamma som i ma3c-2.S; ändras gemensamt innehåll
     där ska samma ändring göras här (allt annat delas via MA3B_ALIAS i
     data/katalog.js). -->

# Summary: Linear optimisation and the derivative

This chapter began with linear optimisation: describing regions in the
coordinate system with inequalities and finding the largest or smallest value
of an objective function when the resources are limited. Then it was about how
to determine the slope of a curve, both on average over an interval
(secant) and exactly at a single point (tangent and derivative). You have met
the definition of the derivative as a limit, learnt to interpret derivatives in
applications and calculate them with computer algebra tools, and seen
what is required for a function to be differentiable at a point. After the
chapter you should be able to solve a linear optimisation problem with
the vertex method, calculate and interpret the slope of both the secant and the tangent,
set up the definition of the derivative and decide at which points a function
is not differentiable.

## Concepts to know

- **inequality in two variables**: for example $y > 2x + 1$; the solutions are
  all the points in a **half-plane** on one side of the line $y = 2x + 1$.
- **dashed or solid boundary line**: dashed for $<$ and $>$ (the line
  is not included), solid for $\leq$ and $\geq$ (the line is included).
- **system of inequalities**: several inequalities that must hold at the same time; their
  common region is **the feasible region**.
- **vertex**: a point where two boundary lines intersect on the edge of the feasible
  region; determined with a system of equations.
- **constraints**: the limitations (inequalities) that an optimisation problem
  has, for example available working time or amount of material.
- **objective function**: the expression that is to be as large or as small as
  possible, for example the profit $V = 30x + 20y$.
- **linear optimisation**: finding the largest or smallest value of the objective function
  in the feasible region.
- **secant**: a straight line that intersects a curve at two points; its slope
  gives the average slope of the curve over the interval between the points.
- **average slope / gradient / difference quotient (*k*-value)**:
  the slope of the secant, calculated from $k = \dfrac{\Delta y}{\Delta x}$.
- **tangent**: a straight line that touches a curve at a single
  point; its slope corresponds to the slope of the curve at exactly that point.
- **derivative ($f'(a)$)**: the slope of the tangent at a given point; read
  "$f$ prime of $a$".
- **the definition of the derivative**: the limit of the slope of the secant as
  the distance $h$ between the two points tends to 0.
- **differentiable**: a function is differentiable at a point if the derivative
  (the limit) can be calculated there.
- **continuous function**: a function whose graph is connected and can be
  drawn "without lifting the pen".
- **discontinuous function**: a function whose graph has a jump (open
  circle and filled dot at different heights) or a break (for example at a
  vertical asymptote).
- **corner point on a graph**: a point where a connected graph forms
  a sharp point, for example where two straight lines with different slopes meet.
- **average rate of change**: what the slope of the secant represents
  in applications.
- **instantaneous rate / rate of change at a point in time**: what
  the slope of the tangent (the derivative) represents in applications.

## Formulas

::: formel "The formulas of the chapter"
**The gradient (secant and tangent)**

$$
k = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}
$$

where

- *k* = gradient (slope)
- $(x_1, y_1)$ and $(x_2, y_2)$ = two points on the line (the secant or
  the tangent)

**The definition of the derivative**

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
\qquad \text{or} \qquad
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

where

- $f'(a)$ = the derivative of $f$ at the point $x = a$
- *h* = the horizontal distance between the two points of the secant
:::

## Important relationships and methods

- Draw the boundary line of an inequality and then decide which side applies
  with a **test point**, preferably the origin: if the point satisfies the inequality, the
  region lies on its side of the line.
- Method for linear optimisation: (1) introduce variables, (2) set up
  the constraints and the objective function, (3) draw the feasible region, (4) determine
  the vertices with systems of equations, (5) calculate the objective function at each
  vertex, (6) answer in the context.
- The largest and smallest value of the objective function are always at a vertex of
  the feasible region (**the vertex method**). A level line, where
  the objective function has a particular value, can be moved parallel until it
  leaves the region, and the last thing it touches is a vertex.
- The slope of the secant gives the **average slope** (average
  rate of change) of the curve over a whole interval; the slope of the tangent gives
  the slope (the rate of change) at a single point.
- The smaller the distance $h$ between the two points of the secant becomes, the more
  the secant approaches a tangent. That is why the definition of the derivative is built on
  the limit as $h \to 0$.
- Method for the definition of the derivative: (1) set up the definition with
  the function $f$, (2) simplify the numerator and **factor out** $h$ from the
  numerator and denominator (otherwise there will be division by 0), (3) set $h = 0$
  and calculate the limit.
- The unit of the derivative is obtained as "the unit of the function" per "the unit
  of the variable", the same principle as for the slope of the secant and the tangent.
- With computer algebra tools (for example GeoGebra): define the function
  as $f(x) = \ldots$ and calculate the derivative at a point by typing
  $f'(a)$. NOTE: GeoGebra uses a point as the decimal sign, not a comma.
- A function is **not** differentiable at a point if it (1) is not
  defined there, (2) is discontinuous there (jump), or (3) has a
  corner point there.
- At a corner point on a graph the limit of the slope gives different answers
  depending on whether you approach the point from the left or the right. There is
  then no unique tangent, and the derivative has no value.
- A function with a denominator is not defined where the denominator is 0, and
  is therefore not differentiable there either.
- Distinguish between the two types of interruption in continuity: a **jump** (the function
  is defined but the value "jumps", open circle/filled dot) and a
  **break** (the graph goes towards $\pm\infty$, for example at a vertical asymptote).

## Figures worth remembering

The secant between the points $(a, f(a))$ and $(a+h, f(a+h))$: when the distance
$h$ tends to 0 the secant turns into a tangent, which is the very idea behind
the definition of the derivative:

::: figur
<svg viewBox="20 0 256 200" width="374" height="292" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of an arbitrary function f of x with a secant through the points a, f of a and a plus h, f of a plus h. The horizontal distance between the points is h."><line x1="45" y1="175" x2="260" y2="175" stroke="#1f2530" stroke-width="1.6"/><polygon points="270,175 260,170.5 260,179.5" fill="#1f2530"/><line x1="60" y1="188" x2="60" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="60,4 55.5,14 64.5,14" fill="#1f2530"/><text x="265" y="192" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="68" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 60,166.9 C 61.83,166.13 67.33,163.63 71,162.3 C 74.67,160.97 78.33,159.85 82,158.9 C 85.67,157.95 89.33,157.25 93,156.6 C 96.67,155.95 100.33,155.47 104,155 C 107.67,154.53 111.33,154.18 115,153.8 C 118.67,153.42 122.33,153.1 126,152.7 C 129.67,152.3 133.33,151.92 137,151.4 C 140.67,150.88 144.33,150.33 148,149.6 C 151.67,148.87 155.33,148.05 159,147 C 162.67,145.95 166.33,144.78 170,143.3 C 173.67,141.82 177.33,140.1 181,138.1 C 184.67,136.1 188.33,133.92 192,131.3 C 195.67,128.68 199.33,125.75 203,122.4 C 206.67,119.05 210.33,115.38 214,111.2 C 217.67,107.02 221.33,102.42 225,97.3 C 228.67,92.18 232.33,86.63 236,80.5 C 239.67,74.37 243.33,67.77 247,60.5 C 250.67,53.23 256.17,40.83 258,36.9" fill="none" stroke="#2563c9" stroke-width="2"/><text x="256" y="20" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="67" y1="162.7" x2="192" y2="131.3" stroke="#4a7d3a" stroke-width="1.8"/><text x="108" y="145" font-size="12" text-anchor="middle" fill="#1f2530">secant</text><line x1="82" y1="175" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="192" y1="175" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="158.9" x2="82" y2="158.9" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="60" y1="131.3" x2="192" y2="131.3" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="82" cy="158.9" r="3" fill="#2563c9"/><circle cx="192" cy="131.3" r="3" fill="#2563c9"/><line x1="82" y1="169" x2="192" y2="169" stroke="#1f2530" stroke-width="1.3"/><line x1="82" y1="165" x2="82" y2="173" stroke="#1f2530" stroke-width="1.3"/><line x1="192" y1="165" x2="192" y2="173" stroke="#1f2530" stroke-width="1.3"/><text x="137" y="163" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">h</tspan></text><text x="82" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="192" y="191" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan></text><text x="26" y="162.9" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>)</text><text x="26" y="135.3" font-size="12" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">a</tspan>+<tspan font-style="italic">h</tspan>)</text></svg>
:::

A graph that consists of the line $y = -x$ to the left of the origin and the line
$y = x$ to the right has a corner point at the origin. The slope is $-1$ to the left
of $x = 0$ and $1$ to the right. Since the limits differ, the
function is not differentiable at the corner point:

::: figur
<svg viewBox="-10 -20 227 148" width="308" height="201" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A graph that consists of two straight lines that meet at the origin and form a corner. Two dashed steps show the slope minus 1 to the left of the origin and the slope 1 to the right of the origin."><line x1="14" y1="0" x2="14" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="42" y1="0" x2="42" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="70" y1="0" x2="70" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="126" y1="0" x2="126" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="154" y1="0" x2="154" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182" y1="0" x2="182" y2="118" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="75.6" x2="199" y2="75.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="47.6" x2="199" y2="47.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="19.6" x2="199" y2="19.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="103.6" x2="205" y2="103.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,103.6 203,99.1 203,108.1" fill="#1f2530"/><line x1="98" y1="118" x2="98" y2="-8" stroke="#1f2530" stroke-width="1.6"/><polygon points="98,-16 93.5,-6 102.5,-6" fill="#1f2530"/><text x="14" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="42" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="70" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="126" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="154" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="182" y="119.6" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="92" y="79.6" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="92" y="51.6" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="92" y="23.6" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="211" y="121.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="107" y="-6" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M14,19.6 L98,103.6 L182,19.6" fill="none" stroke="#2563c9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="miter"/><line x1="126" y1="75.6" x2="154" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="154" y1="75.6" x2="154" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="160" y="64" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">k</tspan> = 1</text><line x1="42" y1="47.6" x2="70" y2="47.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><line x1="70" y1="47.6" x2="70" y2="75.6" stroke="rgba(31,37,48,0.55)" stroke-width="1.3" stroke-dasharray="4 3"/><text x="36" y="64" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">k</tspan> = −1</text></svg>
:::

## Before the test

- Can you draw the region that an inequality or a system of inequalities
  describes, and decide whether the boundary line should be dashed or solid?
- Can you determine the vertices of the feasible region with systems of equations?
- Can you set up constraints and an objective function from a text and solve
  the problem with the vertex method?
- Can you explain the difference between a secant and a tangent?
- Can you calculate the gradient of a secant or tangent from
  the formula $k = \dfrac{\Delta y}{\Delta x}$?
- Do you know that the slope of the secant represents an average
  rate of change, while the slope of the tangent represents
  the rate of change at a single point in time?
- Can you set up and apply the definition of the derivative, including
  factoring out $h$ before you set $h = 0$?
- Do you know what the notation $f'(a)$ means and how it is read?
- Can you interpret a derivative in an applied context and determine its
  unit?
- Can you calculate a derivative with computer algebra tools (for example
  GeoGebra), and do you know that GeoGebra uses a point as the decimal sign?
- Can you explain the difference between a continuous and a discontinuous
  function, and between a jump and a break?
- Do you know which three conditions mean that a function is not differentiable at a
  point?
- Can you read off from a graph where a function is not differentiable (corner points
  and discontinuities)?
