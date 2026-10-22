---
kalla: d06966be13
id: ma1c-4.10
title: Domain and range
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.10'
---

# Domain and range

The possible values of the

- **independent variable**, usually $x$, are called the **domain**
- **dependent variable**, usually $y$, are called the **range**.

When we give the domain and range from a graph, it is important
to look at how the end points of the graph are marked. A

- **filled circle** means that the end point *is included* in the interval (marked
  with ≤ or ≥)
- **open circle** means that the end point is *not* included in the interval (marked
  with < or >).

::: exempel "Example 1: The music service"
**A music service costs 50 kr/month. The offer is valid for at most 1 year.
The cost $y$ kr for $x$ months can then be written $y = 50x$. Find
the function's<br>a) domain&emsp;&emsp;b) range.**

::: handskrift
typ: musiktjanst
:::

::: textlosning
**a)** The number of months $x$ we pay this price for the service can vary
from at least 0 to at most 12 months. (We cannot pay for the service for a
negative number of months, and the price is only valid for 12 months.)

**Answer:** $0 \leq x \leq 12$

**b)** In part a we found that the domain was
$0 \leq x \leq 12$. We get the *smallest* value of $y$ (the cost) when
$x = 0$, that is, when we do not buy the music service at all:

$$
y(0) = 50 \cdot 0 = 0\ \mathrm{kr}
$$

We get the *largest* value of $y$ when $x = 12$:

$$
y(12) = 50 \cdot 12 = 600\ \mathrm{kr}
$$

So the value of $y$ can be between 0 and 600 kr.

**Answer:** $0 \leq y \leq 600$
:::
:::

::: exempel "Example 2: From a graph"
**Find the domain and range of the function below.**

::: figur
<svg viewBox="-26 -20 224 211" width="304" height="286" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A curved arc that starts with an open circle at the point (minus 1, 3), rises to a peak at (0, 4) and falls to a filled point at (2, 0)."><line x1="25.2" y1="0.0" x2="25.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="67.2" y1="0.0" x2="67.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="109.2" y1="0.0" x2="109.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="151.2" y1="0.0" x2="151.2" y2="182.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.2" x2="176.4" y2="163.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="131.2" x2="176.4" y2="131.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="99.2" x2="176.4" y2="99.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="67.2" x2="176.4" y2="67.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="35.2" x2="176.4" y2="35.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="3.2" x2="176.4" y2="3.2" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="163.2" x2="184.4" y2="163.2" stroke="#1f2530" stroke-width="1.6"/><polygon points="192.4,163.2 182.4,158.7 182.4,167.7" fill="#1f2530"/><line x1="67.2" y1="182.4" x2="67.2" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="67.2,-16.0 62.7,-6.0 71.7,-6.0" fill="#1f2530"/><text x="190.4" y="181.2" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="76.2" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="25.2" y="179.2" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="109.2" y="179.2" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="151.2" y="179.2" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="61.2" y="135.2" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="61.2" y="103.2" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="61.2" y="71.2" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="61.2" y="39.2" font-size="12" text-anchor="end" fill="#1f2530">4</text><text x="61.2" y="7.2" font-size="12" text-anchor="end" fill="#1f2530">5</text><path d="M25.2,67.2 L26.5,65.3 L27.7,63.5 L29.0,61.7 L30.2,60.0 L31.5,58.3 L32.8,56.7 L34.0,55.2 L35.3,53.7 L36.5,52.3 L37.8,50.9 L39.1,49.6 L40.3,48.3 L41.6,47.1 L42.8,46.0 L44.1,44.9 L45.4,43.9 L46.6,42.9 L47.9,42.0 L49.1,41.1 L50.4,40.3 L51.7,39.6 L52.9,38.9 L54.2,38.3 L55.4,37.7 L56.7,37.2 L58.0,36.7 L59.2,36.4 L60.5,36.0 L61.7,35.7 L63.0,35.5 L64.3,35.4 L65.5,35.3 L66.8,35.2 L68.0,35.2 L69.3,35.3 L70.6,35.4 L71.8,35.6 L73.1,35.8 L74.3,36.1 L75.6,36.5 L76.9,36.9 L78.1,37.4 L79.4,37.9 L80.6,38.5 L81.9,39.1 L83.2,39.8 L84.4,40.6 L85.7,41.4 L86.9,42.3 L88.2,43.2 L89.5,44.2 L90.7,45.2 L92.0,46.3 L93.2,47.5 L94.5,48.7 L95.8,50.0 L97.0,51.3 L98.3,52.7 L99.5,54.2 L100.8,55.7 L102.1,57.2 L103.3,58.9 L104.6,60.5 L105.8,62.3 L107.1,64.1 L108.4,65.9 L109.6,67.8 L110.9,69.8 L112.1,71.8 L113.4,73.9 L114.7,76.1 L115.9,78.3 L117.2,80.5 L118.4,82.8 L119.7,85.2 L121.0,87.6 L122.2,90.1 L123.5,92.7 L124.7,95.3 L126.0,97.9 L127.3,100.6 L128.5,103.4 L129.8,106.2 L131.0,109.1 L132.3,112.1 L133.6,115.1 L134.8,118.1 L136.1,121.3 L137.3,124.4 L138.6,127.7 L139.9,131.0 L141.1,134.3 L142.4,137.7 L143.6,141.2 L144.9,144.7 L146.2,148.3 L147.4,151.9 L148.7,155.6 L149.9,159.4 L151.2,163.2" fill="none" stroke="#2563c9" stroke-width="2.2"/><circle cx="25.2" cy="67.2" r="5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="151.2" cy="163.2" r="5" fill="#2563c9"/></svg>
:::

::: handskrift
typ: mangderurgraf
:::

::: textlosning
We start by finding the domain, which stands for the allowed
*x*-values. We look at where the graph starts along the *x*-axis (hold, for example, a pencil
vertically, move it from left to right and stop when you meet
the graph). The graph starts at $x = -1$. The circle is not filled, which
means that $x > -1$.

Then look at where the graph ends along the *x*-axis (hold the pencil vertically, move it
from right to left and stop when you meet the graph). The graph
ends at $x = 2$. The circle is filled, which means that $x \leq 2$.

**So the domain is $-1 < x \leq 2$.**

We now find the range, which stands for the allowed *y-values*. We look at
where the graph starts along the *y*-axis (hold the pencil horizontally, move it from the bottom
up and stop when you meet the graph). The graph starts at $y = 0$.
The point there is filled, which means that $y \geq 0$.

Look at where the graph ends along the *y*-axis (hold the pencil horizontally, move it
from the top down and stop when you meet the graph). The graph ends at
$y = 4$ (the peak lies on the curve), which means that $y \leq 4$.

**So the range is $0 \leq y \leq 4$.**

**Answer:** Domain: $-1 < x \leq 2$ and range:
$0 \leq y \leq 4$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The two sets"
- **Domain**: all possible values of the **independent**
  variable, usually $x$.
- **Range**: all possible values of the **dependent** variable,
  usually $y$.
:::

::: sampunkt "From a context"
- Reality sets the limits. A music service for at most one year gives
  $0 \leq x \leq 12$.
- Calculate the corresponding $y$-values at the end points to get the range,
  here $0 \leq y \leq 600$.
:::

::: sampunkt "From a graph: look at the circles"
- **Filled circle**: the end point **is included**. Write $\leq$ or $\geq$.
- **Open circle**: the end point is **not** included. Write $<$ or $>$.
:::

::: sampunkt "How to read it off"
- The domain is read off **horizontally**, that is, how far the graph
  extends to the left and to the right.
- The range is read off **vertically**, that is, how low and how high the graph
  reaches.
:::
:::
