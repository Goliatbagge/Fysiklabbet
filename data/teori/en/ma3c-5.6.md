---
kalla: 0f610d7a96
id: ma3c-5.6
title: Area between curves
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.6'
---

# Area between curves

So far integrals have given us the area between a curve and the *x*-axis. We can
also calculate the area between **two curves**.

::: formel "Area between two curves"
$$
A = \int_a^b \big(f(x) - g(x)\big)\, dx
$$

where $f(x)$ is the upper function and $g(x)$ is the lower function in
the interval $[a, b]$.

::: härledning "Derivation: area between curves"
We want to calculate the area between the curves $f(x)$ and $g(x)$ in the figure below, where
$f(x)$ lies above $g(x)$ in the whole interval $[a, b]$.

::: figur
<svg viewBox="46 4 274 190" width="372" height="258" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Coordinate system with two curves, the upper f of x (blue curve) and the lower g of x (green straight line). The curves intersect where x = a and x = b. The red shaded region between the curves from a to b is the area A. Point at or tap a curve or the shaded region to show what the part is." style="overflow:visible"><style>.q56s{cursor:pointer;outline:none}.q56s .q56-cv{transition:stroke-width .18s ease}.q56s:hover .q56-cv,.q56s:focus .q56-cv{stroke-width:3.4}.q56s .q56-ar{transition:fill-opacity .18s ease}.q56s:hover .q56-ar,.q56s:focus .q56-ar{fill-opacity:0.32}.q56s .q56-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q56s:hover .q56-lbl,.q56s:focus .q56-lbl{opacity:1}</style><line x1="50" y1="170" x2="306" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="316,170 306,165.5 306,174.5" fill="#1f2530"/><line x1="64" y1="182" x2="64" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="64,8 59.5,18 68.5,18" fill="#1f2530"/><g class="q56s" tabindex="0"><polygon class="q56-ar" points="115.3,95.0 121.7,87.7 128.1,80.9 134.5,74.6 141.0,68.8 147.4,63.4 153.8,58.4 160.2,54.0 166.6,50.0 173.0,46.5 179.4,43.4 185.8,40.9 192.3,38.8 198.7,37.1 205.1,35.9 211.5,35.2 217.9,35.0 224.3,35.2 230.7,35.9 237.2,37.1 243.6,38.8 250.0,40.9 256.4,43.4 262.8,46.5 269.2,50.0 269.2,50.0 262.8,51.9 256.4,53.7 250.0,55.6 243.6,57.5 237.2,59.4 230.7,61.2 224.3,63.1 217.9,65.0 211.5,66.9 205.1,68.8 198.7,70.6 192.3,72.5 185.8,74.4 179.4,76.2 173.0,78.1 166.6,80.0 160.2,81.9 153.8,83.8 147.4,85.6 141.0,87.5 134.5,89.4 128.1,91.2 121.7,93.1 115.3,95.0" fill="#c8324a" fill-opacity="0.16"/><g class="q56-lbl"><text x="192" y="120" font-size="11.5" text-anchor="middle" fill="#c8324a">area between the curves</text></g></g><g class="q56s" tabindex="0"><path d="M 64,170 C 64.98,168.3 67.93,163.12 69.9,159.8 C 71.87,156.48 73.83,153.28 75.8,150.1 C 77.77,146.92 79.73,143.75 81.7,140.7 C 83.67,137.65 85.63,134.72 87.6,131.8 C 89.57,128.88 91.53,126 93.5,123.2 C 95.47,120.4 97.43,117.65 99.4,115 C 101.37,112.35 103.33,109.82 105.3,107.3 C 107.27,104.78 109.23,102.3 111.2,99.9 C 113.17,97.5 115.13,95.17 117.1,92.9 C 119.07,90.63 121.03,88.42 123,86.3 C 124.97,84.18 126.93,82.18 128.9,80.2 C 130.87,78.22 132.83,76.27 134.8,74.4 C 136.77,72.53 138.73,70.73 140.7,69 C 142.67,67.27 144.63,65.6 146.6,64 C 148.57,62.4 150.53,60.87 152.5,59.4 C 154.47,57.93 156.43,56.53 158.4,55.2 C 160.37,53.87 162.33,52.6 164.3,51.4 C 166.27,50.2 168.23,49.07 170.2,48 C 172.17,46.93 174.13,45.95 176.1,45 C 178.07,44.05 180.03,43.12 182,42.3 C 183.97,41.48 185.93,40.77 187.9,40.1 C 189.87,39.43 191.83,38.83 193.8,38.3 C 195.77,37.77 197.73,37.3 199.7,36.9 C 201.67,36.5 203.63,36.18 205.6,35.9 C 207.57,35.62 209.53,35.35 211.5,35.2 C 213.47,35.05 215.43,35 217.4,35 C 219.37,35 221.33,35.08 223.3,35.2 C 225.27,35.32 227.23,35.45 229.2,35.7 C 231.17,35.95 233.13,36.32 235.1,36.7 C 237.07,37.08 239.03,37.48 241,38 C 242.97,38.52 244.93,39.15 246.9,39.8 C 248.87,40.45 250.83,41.12 252.8,41.9 C 254.77,42.68 256.73,43.58 258.7,44.5 C 260.67,45.42 262.63,46.35 264.6,47.4 C 266.57,48.45 268.53,49.62 270.5,50.8 C 272.47,51.98 274.43,53.2 276.4,54.5 C 278.37,55.8 280.33,57.15 282.3,58.6 C 284.27,60.05 286.23,61.62 288.2,63.2 C 290.17,64.78 292.13,66.4 294.1,68.1 C 296.07,69.8 299.02,72.52 300,73.4" fill="none" stroke="transparent" stroke-width="14"/><path class="q56-cv" d="M 64,170 C 64.98,168.3 67.93,163.12 69.9,159.8 C 71.87,156.48 73.83,153.28 75.8,150.1 C 77.77,146.92 79.73,143.75 81.7,140.7 C 83.67,137.65 85.63,134.72 87.6,131.8 C 89.57,128.88 91.53,126 93.5,123.2 C 95.47,120.4 97.43,117.65 99.4,115 C 101.37,112.35 103.33,109.82 105.3,107.3 C 107.27,104.78 109.23,102.3 111.2,99.9 C 113.17,97.5 115.13,95.17 117.1,92.9 C 119.07,90.63 121.03,88.42 123,86.3 C 124.97,84.18 126.93,82.18 128.9,80.2 C 130.87,78.22 132.83,76.27 134.8,74.4 C 136.77,72.53 138.73,70.73 140.7,69 C 142.67,67.27 144.63,65.6 146.6,64 C 148.57,62.4 150.53,60.87 152.5,59.4 C 154.47,57.93 156.43,56.53 158.4,55.2 C 160.37,53.87 162.33,52.6 164.3,51.4 C 166.27,50.2 168.23,49.07 170.2,48 C 172.17,46.93 174.13,45.95 176.1,45 C 178.07,44.05 180.03,43.12 182,42.3 C 183.97,41.48 185.93,40.77 187.9,40.1 C 189.87,39.43 191.83,38.83 193.8,38.3 C 195.77,37.77 197.73,37.3 199.7,36.9 C 201.67,36.5 203.63,36.18 205.6,35.9 C 207.57,35.62 209.53,35.35 211.5,35.2 C 213.47,35.05 215.43,35 217.4,35 C 219.37,35 221.33,35.08 223.3,35.2 C 225.27,35.32 227.23,35.45 229.2,35.7 C 231.17,35.95 233.13,36.32 235.1,36.7 C 237.07,37.08 239.03,37.48 241,38 C 242.97,38.52 244.93,39.15 246.9,39.8 C 248.87,40.45 250.83,41.12 252.8,41.9 C 254.77,42.68 256.73,43.58 258.7,44.5 C 260.67,45.42 262.63,46.35 264.6,47.4 C 266.57,48.45 268.53,49.62 270.5,50.8 C 272.47,51.98 274.43,53.2 276.4,54.5 C 278.37,55.8 280.33,57.15 282.3,58.6 C 284.27,60.05 286.23,61.62 288.2,63.2 C 290.17,64.78 292.13,66.4 294.1,68.1 C 296.07,69.8 299.02,72.52 300,73.4" fill="none" stroke="#2563c9" stroke-width="2"/><g class="q56-lbl"><text x="165" y="24" font-size="11.5" text-anchor="middle" fill="#2563c9">upper function</text></g></g><g class="q56s" tabindex="0"><path d="M64.0,110.0 L69.9,108.3 L75.8,106.5 L81.7,104.8 L87.6,103.1 L93.5,101.4 L99.4,99.7 L105.3,97.9 L111.2,96.2 L117.1,94.5 L123.0,92.8 L128.9,91.0 L134.8,89.3 L140.7,87.6 L146.6,85.9 L152.5,84.1 L158.4,82.4 L164.3,80.7 L170.2,78.9 L176.1,77.2 L182.0,75.5 L187.9,73.8 L193.8,72.1 L199.7,70.3 L205.6,68.6 L211.5,66.9 L217.4,65.1 L223.3,63.4 L229.2,61.7 L235.1,60.0 L241.0,58.2 L246.9,56.5 L252.8,54.8 L258.7,53.1 L264.6,51.4 L270.5,49.6 L276.4,47.9 L282.3,46.2 L288.2,44.5 L294.1,42.7 L300.0,41.0" fill="none" stroke="transparent" stroke-width="14"/><path class="q56-cv" d="M64.0,110.0 L69.9,108.3 L75.8,106.5 L81.7,104.8 L87.6,103.1 L93.5,101.4 L99.4,99.7 L105.3,97.9 L111.2,96.2 L117.1,94.5 L123.0,92.8 L128.9,91.0 L134.8,89.3 L140.7,87.6 L146.6,85.9 L152.5,84.1 L158.4,82.4 L164.3,80.7 L170.2,78.9 L176.1,77.2 L182.0,75.5 L187.9,73.8 L193.8,72.1 L199.7,70.3 L205.6,68.6 L211.5,66.9 L217.4,65.1 L223.3,63.4 L229.2,61.7 L235.1,60.0 L241.0,58.2 L246.9,56.5 L252.8,54.8 L258.7,53.1 L264.6,51.4 L270.5,49.6 L276.4,47.9 L282.3,46.2 L288.2,44.5 L294.1,42.7 L300.0,41.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><g class="q56-lbl"><rect x="150" y="92" width="96" height="15" rx="4" fill="#f3eee4"/><text x="244" y="104" font-size="11.5" text-anchor="end" fill="#4a7d3a">lower function</text></g></g><line x1="115.3" y1="170" x2="115.3" y2="95.0" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="269.2" y1="170" x2="269.2" y2="50.0" stroke="rgba(31,37,48,0.45)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="115.3" cy="95.0" r="3" fill="#c8324a"/><circle cx="269.2" cy="50.0" r="3" fill="#c8324a"/><text x="311" y="187" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="72" y="24" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="115.3" y="184" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">a</tspan></text><text x="269.2" y="184" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">b</tspan></text><text x="228" y="22" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text><text x="283" y="33" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text><text x="192" y="58" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">A</tspan></text></svg>

Point at or tap a curve or the shaded region to show what the part is.
:::

The area under $f(x)$, that is between the curve and the *x*-axis, is given by the integral
$\int_a^b f(x)\, dx$. That area contains both the red area $A$ in the figure and
the whole region under $g(x)$. The area under $g(x)$ is given in the same way by
$\int_a^b g(x)\, dx$.

If we subtract the lower area (under $g(x)$) from the upper area (under
$f(x)$), exactly the red area $A$ between the curves is left:

$$
A = \int_a^b f(x)\, dx - \int_a^b g(x)\, dx = \int_a^b \big(f(x) - g(x)\big)\, dx \qquad \text{QED}
$$
:::
:::

## Area between curves with a digital tool

Just as for the area between a curve and the *x*-axis, we can use Geogebra
to calculate the area between two curves, both exactly and as an approximation.

::: tips "Exact area with Geogebra (CAS mode)"
1. Type "Integral" in the input bar and choose the command
   **IntegralBetween( Function, Function, Start *x*-Value, End *x*-Value )**
   from the menu.
2. Type the function expression for the upper function (without "$f(x) =$").
3. Type the function expression for the lower function.
4. Type the *x*-coordinate of the lower limit of the area.
5. Type the *x*-coordinate of the upper limit of the area.
6. **Enter** gives the exact area.
:::

::: tips "Approximation with Geogebra (standard view)"
1. Type "Integral" in the input bar and choose the command
   **IntegralBetween( Function, Function, Start *x*-Value, End *x*-Value )**
   from the menu, just as in CAS mode.
2. Type the function expression for the upper function (without "$f(x) =$").
3. Type the function expression for the lower function.
4. Type the *x*-coordinate of the lower limit of the area.
5. Type the *x*-coordinate of the upper limit of the area.
6. **Enter** gives an approximation (approximate value) of the area.
:::

::: exempel "Example 1: Area between curves with integrals and Geogebra"
**Determine the area of the shaded region between the curves $y = x^2$ and
$y = x - 2$ when $0 \leq x \leq 2$, both<br>
a) with integrals&emsp;&emsp;b) with a digital tool.**

::: handskrift
typ: areamellankurvor
:::

::: textlosning
**a)** $y = x^2$ is the upper function and $y = x - 2$ is the lower
function in the interval. The area is then given by

$$
A = \int_0^2 \big(x^2 - (x - 2)\big)\, dx = \int_0^2 (x^2 - x + 2)\, dx = \left[\frac{x^3}{3} - \frac{x^2}{2} + 2x\right]_0^2
$$

$$
= \left(\frac{2^3}{3} - \frac{2^2}{2} + 2 \cdot 2\right) - \left(\frac{0^3}{3} - \frac{0^2}{2} + 2 \cdot 0\right) = \frac{8}{3} - 2 + 4 - 0 = \frac{8}{3} + 2 = \frac{14}{3}
$$

**Answer:** $\dfrac{14}{3}\ \text{a.u.} \approx 4.67\ \text{a.u.}$

**b)** In Geogebra's CAS mode we type "Integral" in the input bar and
choose the command IntegralBetween from the menu. We first type
the function expression for the upper function, then for the lower one, and finally
the lower and upper limits in the *x*-direction ($x = 0$ and $x = 2$):

$$
\text{IntegralBetween}(x^2,\ x - 2,\ 0,\ 2) = \frac{14}{3}
$$

**Answer:** $\dfrac{14}{3}\ \text{a.u.} \approx 4.67\ \text{a.u.}$
:::
:::

::: exempel "Example 2: Intersection points and a composite area"
**A region is marked between the curves $y = x$, $y = 6 - x^2$ and
$y = -3$. Point A is the intersection of $y = x$ and $y = 6 - x^2$, and point B
is the intersection of $y = 6 - x^2$ and $y = -3$ (both with a positive
$x$-coordinate). Determine<br>
a) the $x$-coordinates of the intersection points A and B<br>b) the area of the
marked region.**

::: handskrift
typ: sammansattarea
:::

::: textlosning
**a)** The $x$-coordinates of the intersection points are determined by setting
the functions equal to each other and solving the equation.

At point A, $y = x$ and $y = 6 - x^2$ intersect. The $x$-coordinate of the intersection is then given
by

$$
x = 6 - x^2 \quad\Leftrightarrow\quad x^2 + x - 6 = 0
$$

The $pq$ formula gives

$$
x = -\frac{1}{2} \pm \sqrt{\left(\frac{1}{2}\right)^2 + 6} = -\frac{1}{2} \pm \sqrt{\frac{25}{4}} = -\frac{1}{2} \pm \frac{5}{2}
$$

which gives $x_1 = -3$ and $x_2 = 2$. Since point A has a positive
$x$-coordinate, $x = 2$ at point A.

At point B, $y = 6 - x^2$ and $y = -3$ intersect. The $x$-coordinate of the intersection is then given
by

$$
6 - x^2 = -3 \quad\Leftrightarrow\quad x^2 = 9 \quad\Leftrightarrow\quad x = \pm 3
$$

Since point B has a positive $x$-coordinate, $x = 3$ at point B.

**Answer:** $x = 2$ at point A and $x = 3$ at point B

**b)** Between $x = 0$ and $x = 2$, $y = x$ is the upper function and
$y = -3$ the lower function. This part of the area, $A_1$, is given by

$$
A_1 = \int_0^2 \big(x - (-3)\big)\, dx = \int_0^2 (x + 3)\, dx = \left[\frac{x^2}{2} + 3x\right]_0^2 = \left(\frac{2^2}{2} + 3 \cdot 2\right) - 0 = 2 + 6 = 8\ \text{a.u.}
$$

Between $x = 2$ and $x = 3$, $y = 6 - x^2$ is the upper function and
$y = -3$ the lower function. This part of the area, $A_2$, is given by

$$
A_2 = \int_2^3 \big((6 - x^2) - (-3)\big)\, dx = \int_2^3 (9 - x^2)\, dx = \left[9x - \frac{x^3}{3}\right]_2^3
$$

$$
= \left(9 \cdot 3 - \frac{3^3}{3}\right) - \left(9 \cdot 2 - \frac{2^3}{3}\right) = (27 - 9) - \left(18 - \frac{8}{3}\right) = 18 - 18 + \frac{8}{3} = \frac{8}{3}\ \text{a.u.}
$$

The total area $A$ is obtained by adding the two parts together:

$$
A = A_1 + A_2 = 8 + \frac{8}{3} = \frac{24}{3} + \frac{8}{3} = \frac{32}{3}\ \text{a.u.}
$$

**Answer:** $\dfrac{32}{3}\ \text{a.u.}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Area between two curves"
- $A = \int_a^b \big(f(x) - g(x)\big)\, dx$, where $f(x)$ is the **upper** and $g(x)$ the **lower** function.
- The proof: subtract the area under the lower curve from the area under the upper one.
- The formula also works when the curves lie below the $x$-axis, since only the difference counts.
:::

::: sampunkt "Method"
1. Decide which function lies on top in the interval.
2. Determine the limits, often the intersection points of the curves.
3. Integrate the difference and substitute the limits.
- Put a bracket around the lower function: $x^2 - (x - 2) = x^2 - x + 2$.
:::

::: sampunkt "Intersection points"
- Set the functions equal to each other and solve the equation.
- $x = 6 - x^2$ gives $x^2 + x - 6 = 0$, so $x = -3$ and $x = 2$.
- Choose the root that agrees with the figure.
:::

::: sampunkt "Composite region"
- If the upper or lower function changes at an intersection point, the region must be **divided up**.
- Calculate each part area separately and add them together at the end.
- In Geogebra, **IntegralBetween( upper, lower, start, end )** is used, in CAS mode for an exact answer.
:::

:::
