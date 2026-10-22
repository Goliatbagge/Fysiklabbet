---
kalla: 82a79d88dd
id: ma3c-5.S
title: Summary
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.S'
---

# Summary: Integrals

This chapter was about integrals: how to find antiderivatives
of power, constant and exponential functions, and how such an
antiderivative can be determined exactly with the help of a condition. You
have learnt that graphically a definite integral corresponds to the area between a
graph and the *x*-axis, how the fundamental theorem of calculus is used to
calculate integrals exactly, how digital tools such as Geogebra handle
antiderivatives and integrals, and how the area between two curves and
other applications of integrals are calculated and interpreted.

## Concepts to know

- **antiderivative ($F(x)$)**: a function whose derivative is the
  original function, that is $F'(x) = f(x)$; also called a
  backwards derivative or a primitive function.
- **integrate**: to find an antiderivative of a given function;
  the opposite of differentiating.
- **constant of integration ($C$)**: the constant that is added when all
  antiderivatives of a function are given, since a constant term
  disappears when you differentiate.
- **condition**: a given piece of information about an antiderivative, for example
  $F(1) = 7$, which is used to determine the constant of integration $C$.
- **integral sign ($\int$)**: the summation sign for infinitely many infinitely
  narrow terms; an elongated "s".
- **definite integral**: an integral with a lower limit *a* and an upper
  limit *b*, $\int_a^b f(x)\, dx$, which gives a definite number.
- **integrand**: the function $f(x)$ that is integrated, that is, the function
  the area is calculated under.
- **limits of integration**: the *x*-values *a* (lower limit) and *b* (upper
  limit) that bound the region a definite integral calculates.
- **area unit (a.u.)**: the unit a calculated area is given in; the value of an integral,
  on the other hand, has no unit as long as it is not interpreted as an area.
- **the fundamental theorem of calculus**: the relationship
  $\int_a^b f(x)\, dx = F(b) - F(a)$ which makes it possible to calculate
  integrals exactly with the help of antiderivatives.
- **CAS mode and standard mode (Geogebra)**: CAS mode gives exact answers
  (fractions, root expressions), standard mode gives numerical approximations.
- **area between curves**: the area of the region between two graphs, calculated
  by integrating the upper function minus the lower function.

## Formulas

::: formel "Formulas of the chapter"
**Antiderivative of a power function**

$$
f(x) = x^n \qquad \Longrightarrow \qquad F(x) = \frac{x^{n+1}}{n+1}
$$

**Antiderivative of a constant function**

$$
f(x) = k \qquad \Longrightarrow \qquad F(x) = kx
$$

**Antiderivative of an exponential function (base $e$)**

$$
f(x) = e^{kx} \qquad \Longrightarrow \qquad F(x) = \frac{e^{kx}}{k}
$$

**Relationship between distance, velocity and acceleration**

$$
s(t) \xrightarrow{\ \text{differentiate}\ } v(t) \xrightarrow{\ \text{differentiate}\ } a(t)
$$

$$
a(t) \xrightarrow{\ \text{integrate}\ } v(t) \xrightarrow{\ \text{integrate}\ } s(t)
$$

**Definite integral**

$$
\int_a^b f(x)\, dx
$$

where

- $\int$ = integral sign (summation sign for infinitely many terms)
- *a* = lower limit of integration
- *b* = upper limit of integration
- $f(x)$ = integrand (the function the area is calculated under)
- $dx$ = variable of integration (the infinitely narrow width of a
  rectangle)

**The fundamental theorem of calculus**

$$
\int_a^b f(x)\, dx = \Big[F(x)\Big]_a^b = F(b) - F(a)
$$

**Area between two curves**

$$
A = \int_a^b \big(f(x) - g(x)\big)\, dx
$$

where $f(x)$ is the upper function and $g(x)$ is the lower function in
the interval $[a, b]$.
:::

## Important relationships and methods

- If you are to give **one** antiderivative, a single expression is enough. If you are to
  give **all** antiderivatives, the general constant
  $C$ must be added at the end.
- If the function has several terms: find an antiderivative of each
  term separately and add them together.
- A **condition** (for example $F(1) = 7$) is used by substituting the
  *x*-value of the condition into the antiderivative (with $C$ still in it), setting the expression
  equal to the given function value and solving for $C$.
- A definite integral can be **negative** if the region lies below the
  *x*-axis. An area can never be negative, but the value of the integral is
  then equal to the area with the opposite sign.
- If a region lies partly above and partly below the *x*-axis, the
  upper part contributes positively and the lower part negatively to the
  total value of the integral.
- Calculating a definite integral with antiderivatives: put the
  antiderivative in square brackets with the limits, substitute the upper
  limit and subtract the value at the lower limit.
- If the antiderivative has several terms, you must put a **bracket**
  around the whole expression before the lower limit is substituted; otherwise
  the minus sign only affects the first term and the answer is wrong.
- In Geogebra **CAS mode** gives exact answers while **standard mode** gives
  numerical approximations: choose the mode according to what the task asks for.
- The area between two curves is obtained by integrating **the upper function minus
  the lower function** over the interval. If the curves intersect within
  the region, it may need to be divided into several subintervals, where which
  function is upper and which is lower can change.
- Intersection points between curves (limits of integration for the area between
  curves) are determined by setting the function expressions equal to each other
  and solving the resulting equation.
- An integral can be interpreted as the product of the dependent variable (for example
  $y$ or $f(x)$) and the independent variable (for example $x$); the unit is obtained
  by taking the unit of $y$ times the unit of $x$.
- In applications: if you integrate an acceleration $a(t)$ you get a
  velocity $v(t)$, and if you integrate a velocity $v(t)$ you get a
  distance $s(t)$, the reverse of what differentiation gives.

## Figures worth remembering

The basis of the whole chapter: the definite integral is defined as
the limit of a sum of ever narrower rectangle areas under a curve.

::: figur
<svg viewBox="30 0 258 200" width="377" height="292" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function f of x with the shaded exact region under the curve between x equals a and x equals b, and four rectangles that approximate the area under the curve. Point at or tap the rectangles to highlight them and show the area of one rectangle." style="overflow:visible"><style>.q53s{cursor:pointer;outline:none}.q53s .q53-rk{transition:transform .18s ease}.q53s .q53-rk rect{transition:fill .18s ease}.q53s:hover .q53-rk,.q53s:focus .q53-rk{transform:translate(0,-3px)}.q53s:hover .q53-rk rect,.q53s:focus .q53-rk rect{fill:rgba(200,50,74,0.34)}.q53s .q53-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53s:hover .q53-lbl,.q53s:focus .q53-lbl{opacity:1}</style><line x1="34" y1="168" x2="272" y2="168" stroke="#1f2530" stroke-width="1.6"/><polygon points="282,168 272,163.5 272,172.5" fill="#1f2530"/><line x1="42" y1="178" x2="42" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="42,4 37.5,14 46.5,14" fill="#1f2530"/><text x="277" y="190" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="50" y="20" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><polygon points="90,168 90,148.5 102,144.9 122,137.2 142,127.3 162,115.2 182,100.9 202,84.4 218,69.6 218,168" fill="rgba(37,99,201,0.16)"/><g class="q53s" tabindex="0"><g class="q53-rk"><rect x="90" y="137.2" width="32" height="30.8" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="122" y="120.3" width="32" height="47.7" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="154" y="97.8" width="32" height="70.2" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/><rect x="186" y="69.6" width="32" height="98.4" fill="rgba(200,50,74,0.22)" stroke="#c8324a" stroke-width="1.2"/></g><g class="q53-lbl"><text x="60" y="38" font-size="12" fill="#c8324a"><tspan font-style="italic">A</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) &#8901; &#916;<tspan font-style="italic">x</tspan></text></g></g><path d="M 42,154.8 C 45.33,154.62 55.33,154.43 62,153.7 C 68.67,152.97 75.33,151.87 82,150.4 C 88.67,148.93 95.33,147.1 102,144.9 C 108.67,142.7 115.33,140.13 122,137.2 C 128.67,134.27 135.33,130.97 142,127.3 C 148.67,123.63 155.33,119.6 162,115.2 C 168.67,110.8 175.33,106.03 182,100.9 C 188.67,95.77 195.33,90.27 202,84.4 C 208.67,78.53 215.33,72.3 222,65.7 C 228.67,59.1 235.33,52.13 242,44.8 C 248.67,37.47 258.67,25.55 262,21.7" fill="none" stroke="#2563c9" stroke-width="2"/><text x="230" y="35" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><line x1="90" y1="164" x2="90" y2="172" stroke="#1f2530" stroke-width="1.3"/><line x1="218" y1="164" x2="218" y2="172" stroke="#1f2530" stroke-width="1.3"/><text x="90" y="183" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="218" y="183" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><line x1="154" y1="173" x2="186" y2="173" stroke="#1f2530" stroke-width="1.2"/><line x1="154" y1="170" x2="154" y2="176" stroke="#1f2530" stroke-width="1.2"/><line x1="186" y1="170" x2="186" y2="176" stroke="#1f2530" stroke-width="1.2"/><text x="170" y="188" font-size="12" text-anchor="middle" fill="#1f2530">&#916;<tspan font-style="italic">x</tspan></text></svg>

Point at or tap the rectangles to show the area of one rectangle.
:::

The area between two curves $f(x)$ and $g(x)$: the shaded area $A$ is obtained
by integrating the upper function minus the lower function.

::: figur
<svg viewBox="46 4 274 190" width="372" height="258" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Coordinate system with two curves, the upper f of x (blue curve) and the lower g of x (green straight line). The curves intersect where x = a and x = b. The red shaded region between the curves from a to b is the area A. Point at or tap a curve or the shaded region to show what the part is." style="overflow:visible"><style>.q56s{cursor:pointer;outline:none}.q56s .q56-cv{transition:stroke-width .18s ease}.q56s:hover .q56-cv,.q56s:focus .q56-cv{stroke-width:3.4}.q56s .q56-ar{transition:fill-opacity .18s ease}.q56s:hover .q56-ar,.q56s:focus .q56-ar{fill-opacity:0.32}.q56s .q56-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q56s:hover .q56-lbl,.q56s:focus .q56-lbl{opacity:1}</style><line x1="50" y1="170" x2="306" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="316,170 306,165.5 306,174.5" fill="#1f2530"/><line x1="64" y1="182" x2="64" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="64,8 59.5,18 68.5,18" fill="#1f2530"/><g class="q56s" tabindex="0"><polygon class="q56-ar" points="115.3,95.0 121.7,87.7 128.1,80.9 134.5,74.6 141.0,68.8 147.4,63.4 153.8,58.4 160.2,54.0 166.6,50.0 173.0,46.5 179.4,43.4 185.8,40.9 192.3,38.8 198.7,37.1 205.1,35.9 211.5,35.2 217.9,35.0 224.3,35.2 230.7,35.9 237.2,37.1 243.6,38.8 250.0,40.9 256.4,43.4 262.8,46.5 269.2,50.0 269.2,50.0 262.8,51.9 256.4,53.7 250.0,55.6 243.6,57.5 237.2,59.4 230.7,61.2 224.3,63.1 217.9,65.0 211.5,66.9 205.1,68.8 198.7,70.6 192.3,72.5 185.8,74.4 179.4,76.2 173.0,78.1 166.6,80.0 160.2,81.9 153.8,83.8 147.4,85.6 141.0,87.5 134.5,89.4 128.1,91.2 121.7,93.1 115.3,95.0" fill="#c8324a" fill-opacity="0.16"/><g class="q56-lbl"><text x="192" y="120" font-size="11.5" text-anchor="middle" fill="#c8324a">area between the curves</text></g></g><g class="q56s" tabindex="0"><path d="M 64,170 C 64.98,168.3 67.93,163.12 69.9,159.8 C 71.87,156.48 73.83,153.28 75.8,150.1 C 77.77,146.92 79.73,143.75 81.7,140.7 C 83.67,137.65 85.63,134.72 87.6,131.8 C 89.57,128.88 91.53,126 93.5,123.2 C 95.47,120.4 97.43,117.65 99.4,115 C 101.37,112.35 103.33,109.82 105.3,107.3 C 107.27,104.78 109.23,102.3 111.2,99.9 C 113.17,97.5 115.13,95.17 117.1,92.9 C 119.07,90.63 121.03,88.42 123,86.3 C 124.97,84.18 126.93,82.18 128.9,80.2 C 130.87,78.22 132.83,76.27 134.8,74.4 C 136.77,72.53 138.73,70.73 140.7,69 C 142.67,67.27 144.63,65.6 146.6,64 C 148.57,62.4 150.53,60.87 152.5,59.4 C 154.47,57.93 156.43,56.53 158.4,55.2 C 160.37,53.87 162.33,52.6 164.3,51.4 C 166.27,50.2 168.23,49.07 170.2,48 C 172.17,46.93 174.13,45.95 176.1,45 C 178.07,44.05 180.03,43.12 182,42.3 C 183.97,41.48 185.93,40.77 187.9,40.1 C 189.87,39.43 191.83,38.83 193.8,38.3 C 195.77,37.77 197.73,37.3 199.7,36.9 C 201.67,36.5 203.63,36.18 205.6,35.9 C 207.57,35.62 209.53,35.35 211.5,35.2 C 213.47,35.05 215.43,35 217.4,35 C 219.37,35 221.33,35.08 223.3,35.2 C 225.27,35.32 227.23,35.45 229.2,35.7 C 231.17,35.95 233.13,36.32 235.1,36.7 C 237.07,37.08 239.03,37.48 241,38 C 242.97,38.52 244.93,39.15 246.9,39.8 C 248.87,40.45 250.83,41.12 252.8,41.9 C 254.77,42.68 256.73,43.58 258.7,44.5 C 260.67,45.42 262.63,46.35 264.6,47.4 C 266.57,48.45 268.53,49.62 270.5,50.8 C 272.47,51.98 274.43,53.2 276.4,54.5 C 278.37,55.8 280.33,57.15 282.3,58.6 C 284.27,60.05 286.23,61.62 288.2,63.2 C 290.17,64.78 292.13,66.4 294.1,68.1 C 296.07,69.8 299.02,72.52 300,73.4" fill="none" stroke="transparent" stroke-width="14"/><path class="q56-cv" d="M 64,170 C 64.98,168.3 67.93,163.12 69.9,159.8 C 71.87,156.48 73.83,153.28 75.8,150.1 C 77.77,146.92 79.73,143.75 81.7,140.7 C 83.67,137.65 85.63,134.72 87.6,131.8 C 89.57,128.88 91.53,126 93.5,123.2 C 95.47,120.4 97.43,117.65 99.4,115 C 101.37,112.35 103.33,109.82 105.3,107.3 C 107.27,104.78 109.23,102.3 111.2,99.9 C 113.17,97.5 115.13,95.17 117.1,92.9 C 119.07,90.63 121.03,88.42 123,86.3 C 124.97,84.18 126.93,82.18 128.9,80.2 C 130.87,78.22 132.83,76.27 134.8,74.4 C 136.77,72.53 138.73,70.73 140.7,69 C 142.67,67.27 144.63,65.6 146.6,64 C 148.57,62.4 150.53,60.87 152.5,59.4 C 154.47,57.93 156.43,56.53 158.4,55.2 C 160.37,53.87 162.33,52.6 164.3,51.4 C 166.27,50.2 168.23,49.07 170.2,48 C 172.17,46.93 174.13,45.95 176.1,45 C 178.07,44.05 180.03,43.12 182,42.3 C 183.97,41.48 185.93,40.77 187.9,40.1 C 189.87,39.43 191.83,38.83 193.8,38.3 C 195.77,37.77 197.73,37.3 199.7,36.9 C 201.67,36.5 203.63,36.18 205.6,35.9 C 207.57,35.62 209.53,35.35 211.5,35.2 C 213.47,35.05 215.43,35 217.4,35 C 219.37,35 221.33,35.08 223.3,35.2 C 225.27,35.32 227.23,35.45 229.2,35.7 C 231.17,35.95 233.13,36.32 235.1,36.7 C 237.07,37.08 239.03,37.48 241,38 C 242.97,38.52 244.93,39.15 246.9,39.8 C 248.87,40.45 250.83,41.12 252.8,41.9 C 254.77,42.68 256.73,43.58 258.7,44.5 C 260.67,45.42 262.63,46.35 264.6,47.4 C 266.57,48.45 268.53,49.62 270.5,50.8 C 272.47,51.98 274.43,53.2 276.4,54.5 C 278.37,55.8 280.33,57.15 282.3,58.6 C 284.27,60.05 286.23,61.62 288.2,63.2 C 290.17,64.78 292.13,66.4 294.1,68.1 C 296.07,69.8 299.02,72.52 300,73.4" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q56-lbl"><text x="165" y="24" font-size="11.5" text-anchor="middle" fill="#2563c9">upper function</text></g></g><g class="q56s" tabindex="0"><path d="M64.0,110.0 L69.9,108.3 L75.8,106.5 L81.7,104.8 L87.6,103.1 L93.5,101.4 L99.4,99.7 L105.3,97.9 L111.2,96.2 L117.1,94.5 L123.0,92.8 L128.9,91.0 L134.8,89.3 L140.7,87.6 L146.6,85.9 L152.5,84.1 L158.4,82.4 L164.3,80.7 L170.2,78.9 L176.1,77.2 L182.0,75.5 L187.9,73.8 L193.8,72.1 L199.7,70.3 L205.6,68.6 L211.5,66.9 L217.4,65.1 L223.3,63.4 L229.2,61.7 L235.1,60.0 L241.0,58.2 L246.9,56.5 L252.8,54.8 L258.7,53.1 L264.6,51.4 L270.5,49.6 L276.4,47.9 L282.3,46.2 L288.2,44.5 L294.1,42.7 L300.0,41.0" fill="none" stroke="transparent" stroke-width="14"/><path class="q56-cv" d="M64.0,110.0 L69.9,108.3 L75.8,106.5 L81.7,104.8 L87.6,103.1 L93.5,101.4 L99.4,99.7 L105.3,97.9 L111.2,96.2 L117.1,94.5 L123.0,92.8 L128.9,91.0 L134.8,89.3 L140.7,87.6 L146.6,85.9 L152.5,84.1 L158.4,82.4 L164.3,80.7 L170.2,78.9 L176.1,77.2 L182.0,75.5 L187.9,73.8 L193.8,72.1 L199.7,70.3 L205.6,68.6 L211.5,66.9 L217.4,65.1 L223.3,63.4 L229.2,61.7 L235.1,60.0 L241.0,58.2 L246.9,56.5 L252.8,54.8 L258.7,53.1 L264.6,51.4 L270.5,49.6 L276.4,47.9 L282.3,46.2 L288.2,44.5 L294.1,42.7 L300.0,41.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><g class="q56-lbl"><rect x="150" y="92" width="96" height="15" rx="4" fill="#f3eee4"/><text x="244" y="104" font-size="11.5" text-anchor="end" fill="#4a7d3a">lower function</text></g></g><line x1="115.3" y1="170" x2="115.3" y2="95.0" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="269.2" y1="170" x2="269.2" y2="50.0" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="115.3" cy="95.0" r="3" fill="#c8324a"/><circle cx="269.2" cy="50.0" r="3" fill="#c8324a"/><text x="311" y="187" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="72" y="24" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="115.3" y="184" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="269.2" y="184" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="228" y="22" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><text x="283" y="33" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text><text x="192" y="58" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">A</tspan></text></svg>

Point at or tap a curve or the shaded region to show what the part is.
:::

## Before the test

- Can you explain what an antiderivative is, and the difference between
  giving one antiderivative and all antiderivatives?
- Can you find antiderivatives of power functions, constant
  functions and exponential functions with base $e$?
- Can you determine the constant of integration $C$ from a given condition,
  for example $F(1) = 7$?
- Can you explain the relationship between distance, velocity and acceleration
  in differentiation and in integration?
- Do you know that graphically a definite integral corresponds to the area between the
  graph of a function and the *x*-axis, and how it can be derived from a sum of
  rectangle areas?
- Can you decide whether an integral is positive or negative from whether
  the region lies above or below the *x*-axis?
- Do you know the fundamental theorem of calculus, and can you calculate a definite
  integral with the help of an antiderivative?
- Do you remember to put a bracket around an antiderivative with several
  terms before the lower limit is substituted?
- Can you use Geogebra, in both standard mode and CAS mode, to
  calculate antiderivatives and integrals as an approximation and
  exactly?
- Can you calculate the area between two curves, and do you know how to determine
  intersection points when the region needs to be divided into several parts?
- Can you interpret what an integral means in an applied context, for example
  from the units on the *y*-axis and the *x*-axis?
