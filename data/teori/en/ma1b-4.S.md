---
kalla: c79cbba84b
id: ma1b-4.S
title: Summary
course: Matematik nivå 1b
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.S'
---

<!-- NOTE: separate 1b version, based on the corresponding ma1c file. If the
     chapter's SHARED content changes in the 1c summary, make the same
     change here (only these three summaries are separate files;
     everything else is shared via MA1B_ALIAS in data/katalog.js). -->

# Summary: Straight lines and functions

This chapter was about the coordinate system, linear models and the equation
of a straight line $y = kx + m$: how you move between formula, table of values and
graph, and how the $k$-value and the $m$-value are read off or calculated. You have also
met the concept of a function, domain and range, graphical solution of
equations and inequalities, and exponential and power functions. After
the chapter you should be able to find the equation of a line in several ways, decide whether
a relationship is a function, and tell the different types of function apart.

## Concepts to know

- **coordinate system**: formed by a horizontal ***x*-axis** and a vertical
  ***y*-axis**; the point where they cross is called the **origin**. The position of a point is given
  by the coordinate $(x, y)$.
- **quadrant**: the four regions the coordinate system is divided into by the axes,
  numbered anticlockwise starting top right (the first quadrant has
  positive *x*- and *y*-values).
- **linear model**: a relationship that changes at a steady rate by *the same
  amount*; the graph is always a straight line.
- **proportionality (constant of proportionality $k$)**: a special case of
  a linear relationship, $y = kx$, whose graph is always a straight line through
  the origin.
- **the equation of a straight line in k-form**: $y = kx + m$; describes
  straight lines with a $k$-value and an $m$-value.
- **gradient ($k$-value)**: the slope of the line; a positive $k$
  gives a rising line, a negative $k$ a falling one.
- **$m$-value (*y*-intercept)**: where the line crosses the *y*-axis;
  corresponds to the "starting value" in a linear model.
- **function ($f(x)$)**: a relationship where each permitted *x*-value gives
  exactly one *y*-value; $x$ is called the **independent** variable and $y$ (= $f(x)$)
  the **dependent variable**. A **linear function** has a straight line
  as its graph.
- **domain and range**: the permitted *x*-values and
  *y*-values respectively for a function; a filled ring/dot at the end point of the graph
  means that the value is included ($\leq$, $\geq$), an empty ring that it is
  not ($<$, $>$).
- **graphical solution**: solving an equation or inequality by drawing
  the LHS and RHS as graphs with a graphing tool and reading off
  the point of intersection.
- **exponential function**: a function where the independent variable is in
  the exponent, $y = Ca^x$.
- **power function**: a function where the independent variable is in
  the base, $f(x) = Cx^a$.

## Formulas

::: formel "The chapter's formulas"
**The equation of a straight line (k-form)**

$$
y = kx + m
$$

where

- $k$ = gradient (the slope of the line)
- $m$ = where the line crosses the *y*-axis (*y*-intercept)

**Proportionality**

$$
y = kx
$$

where $k$ is the constant of proportionality (a special case of the equation of a straight line with
$m = 0$).

**Gradient from two points**

$$
k = \frac{y_2 - y_1}{x_2 - x_1}
$$

where $(x_1, y_1)$ and $(x_2, y_2)$ are two points on the line.

**Exponential change**

$$
y = Ca^x
$$

where

- $y$ = the value after a certain time
- $C$ = the original value
- $a$ = the change factor
- $x$ = time

**Power function**

$$
f(x) = Cx^a
$$

where $C$ and $a$ are constants.
:::

## Important relationships and methods

- A proportionality must satisfy BOTH requirements: the graph must be a straight
  line AND pass through the origin. Otherwise it is only a linear model, not a
  proportionality.
- The $m$-value is read off directly as where the line crosses the *y*-axis (it corresponds to
  the "starting value" in the model); the $k$-value is the slope and corresponds to
  the rate of change per step in the *x*-direction.
- The step method: go one step to the right along the line. The height of the step
  (with sign) is then equal to $k$.
- From two points, $k$ is calculated with $k = \dfrac{y_2 - y_1}{x_2 - x_1}$. Choose
  points that are easy to read off; the order of the points does not
  matter as long as the numerator and denominator are taken in the same order.
- To find the equation of a line when you know $k$ and a point: substitute
  $k$ into $y = kx + m$, then substitute the coordinates of the point and solve for
  $m$.
- The function test ("the pencil"): for a graph to be a function, a
  vertical line may cross the graph at most once, for each *x*-value.
- $f(a)$ is read off as the *y*-coordinate on the graph at $x = a$; solving
  $f(x) = 0$ means reading off where the graph crosses the *x*-axis.
- In graphical solution of an equation LHS = RHS: draw $y = \mathrm{LHS}$ and
  $y = \mathrm{RHS}$; the *x*-coordinate of the point of intersection is the solution. For an
  inequality you instead decide which line lies above/below the
  other.
- Domain and range are read off as intervals on the *x*- and
  *y*-axis respectively: a filled ring/dot means that the boundary is included ($\leq$,
  $\geq$), an empty ring that it is not ($<$, $>$).
- Distinguish exponential functions ($y = Ca^x$, the independent variable in
  the exponent) from power functions ($y = Cx^a$, the independent variable in
  the base). In an exponential function $a$ decides whether the value increases ($a > 1$)
  or decreases ($0 < a < 1$), and $C$ is the starting value.

## Figures worth remembering

The four quadrants of the coordinate system are numbered anticlockwise starting top
right:

::: figur
<svg viewBox="-26 -20 330 312" width="418" height="395" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The four quadrants of the coordinate system: the first quadrant top right, the second top left, the third bottom left and the fourth bottom right. Point at or tap a quadrant to show the signs of the coordinates there." style="overflow:visible"><style>.q41-g{cursor:pointer;outline:none}.q41-g .q41-area{fill:rgba(37,99,201,0);transition:fill .18s ease}.q41-g:hover .q41-area,.q41-g:focus .q41-area{fill:rgba(37,99,201,0.08)}.q41-g .q41-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q41-g:hover .q41-lbl,.q41-g:focus .q41-lbl{opacity:1}.q41-g:hover .q41-n,.q41-g:focus .q41-n{font-weight:600}</style><line x1="0.0" y1="0.0" x2="0.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="34.0" y1="0.0" x2="34.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="68.0" y1="0.0" x2="68.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="102.0" y1="0.0" x2="102.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="136.0" y1="0.0" x2="136.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="170.0" y1="0.0" x2="170.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="204.0" y1="0.0" x2="204.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="238.0" y1="0.0" x2="238.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="272.0" y1="0.0" x2="272.0" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="282.2" x2="282.2" y2="282.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="248.2" x2="282.2" y2="248.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="214.2" x2="282.2" y2="214.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="180.2" x2="282.2" y2="180.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="282.2" y2="146.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="112.2" x2="282.2" y2="112.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="78.2" x2="282.2" y2="78.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="44.2" x2="282.2" y2="44.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="10.2" x2="282.2" y2="10.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="146.2" x2="290.2" y2="146.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="298.2,146.2 288.2,141.7 288.2,150.7" fill="#1f2530"/><line x1="136.0" y1="282.2" x2="136.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="136.0,-16.0 131.5,-6.0 140.5,-6.0" fill="#1f2530"/><text x="296.2" y="164.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="145.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="0.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−8</text><text x="34.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−6</text><text x="68.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−4</text><text x="102.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">−2</text><text x="170.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="204.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="238.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="272.0" y="162.2" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="130.0" y="286.2" font-size="11" text-anchor="end" fill="#1f2530">−8</text><text x="130.0" y="252.2" font-size="11" text-anchor="end" fill="#1f2530">−6</text><text x="130.0" y="218.2" font-size="11" text-anchor="end" fill="#1f2530">−4</text><text x="130.0" y="184.2" font-size="11" text-anchor="end" fill="#1f2530">−2</text><text x="130.0" y="116.2" font-size="11" text-anchor="end" fill="#1f2530">2</text><text x="130.0" y="82.2" font-size="11" text-anchor="end" fill="#1f2530">4</text><text x="130.0" y="48.2" font-size="11" text-anchor="end" fill="#1f2530">6</text><text x="130.0" y="14.2" font-size="11" text-anchor="end" fill="#1f2530">8</text><g class="q41-g" tabindex="0"><rect class="q41-area" x="136" y="0" width="146.2" height="146.2"/><rect x="161" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="67" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">first</text><text x="207.4" y="81" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="177.4" y="98" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="115" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(+, +)</text></g></g><g class="q41-g" tabindex="0"><rect class="q41-area" x="0" y="0" width="136" height="146.2"/><rect x="15" y="54" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="67" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">second</text><text x="61.2" y="81" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="31.200000000000003" y="98" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="115" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(−, +)</text></g></g><g class="q41-g" tabindex="0"><rect class="q41-area" x="0" y="146.2" width="136" height="136"/><rect x="15" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="206" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">third</text><text x="61.2" y="220" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="31.200000000000003" y="237" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="61.2" y="254" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(−, −)</text></g></g><g class="q41-g" tabindex="0"><rect class="q41-area" x="136" y="146.2" width="146.2" height="136"/><rect x="161" y="193" width="92" height="34" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="206" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">fourth</text><text x="207.4" y="220" font-size="12" text-anchor="middle" fill="#1f2530" class="q41-n">quadrant</text><g class="q41-lbl"><rect x="177.4" y="237" width="60" height="24" rx="4" fill="#fdfaf3" stroke="#1f2530" stroke-width="1"/><text x="207.4" y="254" font-size="15" font-weight="600" text-anchor="middle" fill="#2563c9">(+, −)</text></g></g></svg>

The quadrants are numbered anticlockwise starting top right. Point at or tap a quadrant to show the signs of the *x*- and *y*-coordinates there.
:::

A function can be compared to a machine that you put an *x*-value into and that
gives out the corresponding *y*-value:

::: figur
<svg viewBox="0 14 420 70" width="532" height="89" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A function machine: the arrow in is labelled x equals 3, the machine contains the rule f of x equals x plus 2, and the arrow out is labelled y equals 5."><line x1="10" y1="48" x2="118" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="128,48 116,43 116,53" fill="#c8324a"/><text x="64" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan> = 3</text><rect x="132" y="18" width="156" height="60" rx="12" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.6"/><text x="210" y="54" font-size="15" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = <tspan font-style="italic">x</tspan> + 2</text><line x1="292" y1="48" x2="400" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="410,48 398,43 398,53" fill="#c8324a"/><text x="346" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">y</tspan> = 5</text></svg>

We put the independent variable $x = 3$ into the function machine
$f(x) = x + 2$ and get out the dependent variable $y = 5$.
:::

## Before the test

- Can you draw a coordinate system, give the coordinate of a point and decide
  which quadrant a point lies in?
- Can you set up a linear model as a formula, a table of values and a graph
  from a word problem?
- Do you know what is required for a relationship to be a proportionality
  (a straight line AND through the origin), and can you decide it from a graph?
- Do you know the equation of a straight line $y = kx + m$ by heart, and do you know what $k$
  and $m$ mean?
- Can you find the $k$-value both with the step method from a graph and
  with the formula $k = \dfrac{y_2 - y_1}{x_2 - x_1}$ from two points?
- Can you find the equation of a line when you know the slope and a point
  on the line?
- Can you decide whether a relationship or a graph is a function, and
  explain why with the "pencil test"?
- Can you calculate function values such as $f(4)$ or $f(3a)$, and read off
  function values from a graph?
- Can you find the domain and range from a graph, and decide whether
  the end points should have $\leq$/$\geq$ or $<$/$>$?
- Can you solve an equation or inequality graphically with a graphing
  tool, and tell exponential functions apart from power functions?
