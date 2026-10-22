---
kalla: 9274f1fe48
id: ma2c-3.S
title: Summary
course: Matematik nivå 2c
chapter: Andragradsfunktioner
chapterNumber: 3
section: '3.S'
---

# Summary: Quadratic functions

This chapter was about quadratic functions: what their graphs
(parabolas) look like, how to read off and calculate zeros,
the line of symmetry and the stationary point, and how to determine an unknown
quadratic function from its graph. You have also learnt to
solve quadratic equations and inequalities graphically, and to use
quadratic functions to model real situations. After the chapter you should
be able to both draw and interpret a parabola, determine its
most important points both graphically and algebraically, and solve problems with
the help of graphing tools such as Geogebra.

## Concepts to know

- **quadratic function**: a function where the highest exponent of the variable
  is 2, for example $f(x) = ax^2 + bx + c$.
- **quadratic term**: the term with $x^2$ in the function expression, for example
  $x^2$ or $3x^2$; the sign of the term determines the shape of the parabola.
- **parabola**: the arch-shaped graph of a quadratic function.
- **maximum point**: the "peak" of the parabola, where the function has its greatest
  value.
- **minimum point**: the "valley" of the parabola, where the function has its least
  value.
- **stationary point**: a collective name for maximum and minimum points.
- **the nature of the stationary point**: whether the stationary point is a maximum or
  a minimum point; determined by the sign of the quadratic term.
- **line of symmetry ($x_s$)**: the vertical line that the parabola is
  symmetric about; it always passes through the stationary point.
- **zero**: an $x$-value where the function is 0 and the graph crosses
  the $x$-axis; a quadratic function can have two, one or no
  zeros.
- **expanded form**: the function expression written as
  $f(x) = ax^2 + bx + c$.
- **factor form**: the function expression written as
  $f(x) = k(x - x_1)(x - x_2)$ with the zeros $x_1$ and $x_2$.
- **double root**: when the two zeros of a quadratic function
  coincide ($x_1 = x_2$); the graph then touches the $x$-axis at a single
  point.
- **greatest/least value**: the $y$-coordinate of the stationary point; greatest at
  a maximum point, least at a minimum point.
- **point of intersection**: a point where two graphs meet; used to solve
  equations and inequalities graphically.

## Formulas

::: formel "The formulas of the chapter"
**The expanded form of the quadratic function**

$$
f(x) = ax^2 + bx + c
$$

where

- *a*, *b*, *c* = constants ($a \neq 0$)
- the sign of *a* determines whether the parabola has a minimum point (*a* positive)
  or a maximum point (*a* negative)

**The factor form of the quadratic function**

$$
f(x) = k(x - x_1)(x - x_2)
$$

where

- *k* = constant
- $x_1$, $x_2$ = the zeros of the function (for a double root,
  $x_1 = x_2$)

**The equation of the line of symmetry**

$$
x_s = \frac{x_1 + x_2}{2}
$$

where $x_1$ and $x_2$ are the zeros of the function. If there are no zeros,
the line of symmetry is instead obtained as

$$
x_s = -\frac{p}{2}
$$

where *p* is the coefficient in front of the first-degree term when the function
has been written in the form $x^2 + px + q$ (the number in front of the square root sign in
the *pq* formula).

**The coordinates of the stationary point**

$$
(x_s,\ f(x_s))
$$

where $x_s$ is the $x$-coordinate of the line of symmetry and $f(x_s)$ is the value of the function
at that point, that is the $y$-coordinate of the stationary point, which
is also the greatest or least value of the function.
:::

## Important relationships and methods

- The sign of the quadratic term determines the shape of the curve: positive (for example
  $x^2$) gives a minimum point ("happy mouth"), negative gives a maximum point
  ("sad mouth").
- A quadratic function can have two zeros (the graph crosses
  the $x$-axis at two points), one zero/double root (the graph touches
  the $x$-axis) or no zeros at all (the graph lies entirely above
  or below the $x$-axis).
- Zeros are determined algebraically by setting the function expression
  equal to 0 and solving the equation, often with the *pq* formula after any
  coefficient in front of $x^2$ has been divided away.
- The line of symmetry always passes through the stationary point. If there are zeros,
  it is obtained as their mean; if there are no zeros, it is instead obtained as
  "the number in front of the square root sign" in the *pq* formula.
- The $x$-coordinate of the stationary point is always the $x$-coordinate of the line of
  symmetry; the $y$-coordinate is obtained by substituting $x_s$ into
  the function expression.
- To determine an unknown quadratic function from its graph: use
  **factor form** if the zeros are known (substitute the zeros and one
  extra point to solve for $k$); use **expanded form** with three
  known points if there are no zeros (this gives a system of equations with
  three unknowns $a$, $b$ and $c$).
- Equations $LHS = RHS$ are solved graphically by drawing each side as
  a separate function and reading off the $x$-coordinates of the points of intersection; if
  the equation is already equal to 0, it is enough to draw a single function and
  find its zeros.
- The inequalities $f(x) < g(x)$ and $f(x) > g(x)$ are solved by
  first finding the points of intersection between the graphs and then deciding
  where one graph lies below or above the other.
- In problem solving (paths, areas and so on) you first write a function that
  models the situation, and the Geogebra tools *Extremum*,
  *Roots* and *Intersect* are used to
  answer the question directly from the graph.
- In modelling it is often smart to place the coordinate system so that
  a known value (for example a zero) ends up at the origin. That
  simplifies the subsequent calculations.

## Figures worth remembering

A quadratic function can have two, one or no zeros,
depending on where the parabola lies in relation to the $x$-axis:

::: figur
<svg viewBox="0 0 540 138" width="664" height="170" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Three parabolas: one that crosses the x-axis at two points, one that touches the x-axis at one point and one that lies entirely above the x-axis. Point at or tap a parabola to mark the zeros and show the number of solutions to f of x equals 0." style="overflow:visible"><style>.m31b-s{cursor:pointer;outline:none}.m31b-s .m31b-kv{transition:stroke-width .18s ease}.m31b-s:hover .m31b-kv,.m31b-s:focus .m31b-kv{stroke-width:3.2}.m31b-np{transition:transform .18s ease,fill .18s ease;transform-box:fill-box;transform-origin:center}.m31b-s:hover .m31b-np,.m31b-s:focus .m31b-np{fill:#c8324a;transform:scale(1.6)}.m31b-s .m31b-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m31b-s:hover .m31b-lbl,.m31b-s:focus .m31b-lbl{opacity:1}</style><line x1="8" y1="80" x2="150" y2="80" stroke="#1f2530" stroke-width="1.4"/><polygon points="158,80 149,76 149,84" fill="#1f2530"/><line x1="18" y1="110" x2="18" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="18,6 14,15 22,15" fill="#1f2530"/><g class="m31b-s" tabindex="0"><rect x="8" y="0" width="150" height="136" fill="transparent"/><path class="m31b-kv" d="M 35,15 Q 80,175 125,15" fill="none" stroke="#2563c9" stroke-width="2"/><circle class="m31b-np" cx="60.5" cy="80" r="3" fill="#1f2530"/><circle class="m31b-np" cx="99.5" cy="80" r="3" fill="#1f2530"/><text x="80" y="128" font-size="12" text-anchor="middle" fill="#1f2530">Two zeros.</text><g class="m31b-lbl"><rect x="45" y="90" width="84" height="24" rx="4" fill="#f3eee4"/><text x="87" y="99" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = 0 has</text><text x="87" y="111" font-size="12" text-anchor="middle" fill="#1f2530">two solutions</text></g></g><line x1="193" y1="80" x2="335" y2="80" stroke="#1f2530" stroke-width="1.4"/><polygon points="343,80 334,76 334,84" fill="#1f2530"/><line x1="203" y1="110" x2="203" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="203,6 199,15 207,15" fill="#1f2530"/><g class="m31b-s" tabindex="0"><rect x="193" y="0" width="150" height="136" fill="transparent"/><path class="m31b-kv" d="M 230,20 Q 265,140 300,20" fill="none" stroke="#2563c9" stroke-width="2"/><circle class="m31b-np" cx="265" cy="80" r="3" fill="#1f2530"/><text x="265" y="128" font-size="12" text-anchor="middle" fill="#1f2530">One zero.</text><g class="m31b-lbl"><rect x="227" y="90" width="76" height="24" rx="4" fill="#f3eee4"/><text x="265" y="99" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = 0 has</text><text x="265" y="111" font-size="12" text-anchor="middle" fill="#1f2530">one solution</text></g></g><line x1="378" y1="80" x2="520" y2="80" stroke="#1f2530" stroke-width="1.4"/><polygon points="528,80 519,76 519,84" fill="#1f2530"/><line x1="388" y1="110" x2="388" y2="14" stroke="#1f2530" stroke-width="1.4"/><polygon points="388,6 384,15 392,15" fill="#1f2530"/><g class="m31b-s" tabindex="0"><rect x="378" y="0" width="150" height="136" fill="transparent"/><path class="m31b-kv" d="M 415,15 Q 450,105 485,15" fill="none" stroke="#2563c9" stroke-width="2"/><text x="450" y="128" font-size="12" text-anchor="middle" fill="#1f2530">No zeros.</text><g class="m31b-lbl"><rect x="408" y="90" width="84" height="24" rx="4" fill="#f3eee4"/><text x="450" y="99" font-size="12" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = 0 has no</text><text x="450" y="111" font-size="12" text-anchor="middle" fill="#1f2530">solutions</text></g></g></svg>

Point at or tap a parabola to mark the zeros and show the number of
solutions to $f(x) = 0$.
:::

## Before the test

- Can you explain what is meant by a quadratic function,
  a quadratic term and a parabola?
- Do you know how the sign of the quadratic term determines whether the graph has a
  maximum or a minimum point?
- Can you determine graphically whether a quadratic function has two, one or
  no zeros?
- Can you determine zeros algebraically by solving the equation
  $f(x) = 0$ with the *pq* formula?
- Can you determine the equation of the line of symmetry both from the zeros
  and from "the number in front of the square root sign" when there are no zeros?
- Do you know how the coordinates of the stationary point are connected to the function's
  greatest or least value?
- Can you determine a quadratic function in factor form from its
  zeros and one extra point on the graph?
- Can you determine a quadratic function in expanded form from three
  points on the graph, by solving a system of equations?
- Can you solve a quadratic equation graphically by drawing both
  sides and reading off the points of intersection?
- Can you decide which inequality sign applies by seeing whether one
  graph lies above or below another?
- Can you model a real situation (for example a projectile path or
  an area to be maximised) with a quadratic function and solve
  the problem with the help of Geogebra's tools?
