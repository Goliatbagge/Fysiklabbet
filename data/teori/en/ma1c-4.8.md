---
kalla: d79d69524f
id: ma1c-4.8
title: Functions and function values
course: Matematik nivå 1c
chapter: Räta linjer och funktioner
chapterNumber: 4
section: '4.8'
---

# Functions and function values

A relationship between two variables, for example $x$ and $y$, where every allowed
*x*-value gives *exactly one* *y*-value is called a **function**. If we draw
the graph of a function, this means that if we hold a pencil vertically over
the graph, it can only cross the graph once.

In the relationship $y = 2x + 3$ we say that "$y$ is a function of $x$".

The value of $y$ depends on the value of $x$. That is why $y$ is called
the **dependent variable**. In the same way, $x$ is called the
**independent variable**. The value that the function $y$ takes is called the
**function value**.

To make it clear that we have a function, and to show which variable
it depends on, another notation is used. Instead of $y$ we write
$f(x)$, where $f$ is the name of the function and $x$ shows which variable
it depends on. So $y = f(x)$. $f(x)$ is read "$f$ of $x$".

So if we want to write the relationship $y = 2x + 3$ as a function, we write

$$
f(x) = 2x + 3
$$

If we drew the graph of $f(x) = 2x + 3$ it would be a straight line
(compare with $y = kx + m$). This is therefore called a **linear function**.

If we want to find the function value when $x = 5$ we write $f(5)$ and
calculate it by replacing $x$ with 5 in our relationship:

$$
f(5) = 2 \cdot 5 + 3 = 10 + 3 = 13
$$

So $f(5) = 13$.

A function is often compared to a machine or a rule. We put a
value into the machine/rule and it gives us a new value. In the function above
we put in the value 5, which was processed according to the "rule" $2x + 3$, and we
got out the value 13.

::: figur
<svg viewBox="0 14 420 70" width="532" height="89" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A function machine: the arrow in is labelled x equals 3, the machine contains the rule f of x equals x plus 2, and the arrow out is labelled y equals 5."><line x1="10" y1="48" x2="118" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="128,48 116,43 116,53" fill="#c8324a"/><text x="64" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">x</tspan> = 3</text><rect x="132" y="18" width="156" height="60" rx="12" fill="#cfe3f2" stroke="#1f2530" stroke-width="1.6"/><text x="210" y="54" font-size="15" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>) = <tspan font-style="italic">x</tspan> + 2</text><line x1="292" y1="48" x2="400" y2="48" stroke="#c8324a" stroke-width="2"/><polygon points="410,48 398,43 398,53" fill="#c8324a"/><text x="346" y="34" font-size="14" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">y</tspan> = 5</text></svg>

We put the independent variable $x = 3$ into the function machine
$f(x) = x + 2$ and get out the dependent variable $y = 5$.
:::

Just as we can denote variables with different letters, for example $x$,
$y$, $z$, …, functions can be denoted with different letters, usually
$f$, $g$, $h$, …

So $f(x) = 2x + 3$ means the same thing as $g(x) = 2x + 3$.

::: exempel "Example 1: Calculate function values"
**Let $f(x) = 5x - 3$. Find<br>a)&nbsp;$f(4)$&emsp;&emsp;b)&nbsp;$f(-2)$&emsp;&emsp;c)&nbsp;$f(3a)$&emsp;&emsp;d)&nbsp;$f(7) - f(6)$**

::: handskrift
typ: funktionsvarde
:::

::: textlosning
**a)** To calculate $f(4)$ we replace every $x$ with 4 in the function
$f(x) = 5x - 3$:

$$
f(4) = 5 \cdot 4 - 3 = 20 - 3 = 17
$$

**Answer:** 17

**b)** We do the same as in part a:

$$
f(-2) = 5 \cdot (-2) - 3 = -10 - 3 = -13
$$

**Answer:** −13

**c)** Sometimes we can put variables into our function. The principle is
the same, though. When we calculate $f(3a)$ we replace every $x$ with $3a$ and
then simplify as usual:

$$
f(3a) = 5 \cdot 3a - 3 = 15a - 3
$$

**Answer:** $15a - 3$

**d)** Sometimes we have expressions with several functions. Then we calculate them
one at a time and combine them afterwards, or we calculate them
together all at once.

**Method 1: One at a time**

$$
f(7) = 5 \cdot 7 - 3 = 35 - 3 = 32
$$

$$
f(6) = 5 \cdot 6 - 3 = 30 - 3 = 27
$$

$$
f(7) - f(6) = 32 - 27 = 5
$$

**Method 2: Together all at once**

$$
f(7) - f(6) = 5 \cdot 7 - 3 - (5 \cdot 6 - 3) = 35 - 3 - (30 - 3) = 32 - 27 = 5
$$

**Answer:** 5
:::
:::

::: exempel "Example 2: Are the graphs functions?"
**Are $f(x)$ and $g(x)$, drawn below, functions? Justify your
answer.**

::: figur
<svg viewBox="-26 -20 293 203" width="398" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A coordinate system with a sideways parabola f that opens to the right and a vertical blue line g at x equals minus 2."><line x1="14.4" y1="0.0" x2="14.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182.4" y1="0.0" x2="182.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="206.4" y1="0.0" x2="206.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="230.4" y1="0.0" x2="230.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="244.8" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="244.8" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="244.8" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="244.8" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="244.8" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="244.8" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="244.8" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="252.8" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="260.8,86.4 250.8,81.9 250.8,90.9" fill="#1f2530"/><line x1="86.4" y1="172.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="258.8" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="182.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="206.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="230.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="80.4" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M172.8,144.0 L168.5,142.6 L164.4,141.1 L160.3,139.7 L156.4,138.2 L152.6,136.8 L148.8,135.4 L145.2,133.9 L141.7,132.5 L138.3,131.0 L135.0,129.6 L131.8,128.2 L128.7,126.7 L125.8,125.3 L122.9,123.8 L120.1,122.4 L117.5,121.0 L115.0,119.5 L112.5,118.1 L110.2,116.6 L108.0,115.2 L105.9,113.8 L103.9,112.3 L102.0,110.9 L100.2,109.4 L98.6,108.0 L97.0,106.6 L95.5,105.1 L94.2,103.7 L92.9,102.2 L91.8,100.8 L90.8,99.4 L89.9,97.9 L89.0,96.5 L88.3,95.0 L87.8,93.6 L87.3,92.2 L86.9,90.7 L86.6,89.3 L86.5,87.8 L86.4,86.4 L86.5,85.0 L86.6,83.5 L86.9,82.1 L87.3,80.6 L87.8,79.2 L88.3,77.8 L89.0,76.3 L89.9,74.9 L90.8,73.4 L91.8,72.0 L92.9,70.6 L94.2,69.1 L95.5,67.7 L97.0,66.2 L98.6,64.8 L100.2,63.4 L102.0,61.9 L103.9,60.5 L105.9,59.0 L108.0,57.6 L110.2,56.2 L112.5,54.7 L115.0,53.3 L117.5,51.8 L120.1,50.4 L122.9,49.0 L125.8,47.5 L128.7,46.1 L131.8,44.6 L135.0,43.2 L138.3,41.8 L141.7,40.3 L145.2,38.9 L148.8,37.4 L152.6,36.0 L156.4,34.6 L160.3,33.1 L164.4,31.7 L168.5,30.2 L172.8,28.8" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="38.4" y1="168.0" x2="38.4" y2="4.8" stroke="#2563c9" stroke-width="2"/><text x="32.4" y="12.0" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="211.2" y="14.4" font-size="14" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan></text></svg>
:::

::: handskrift
typ: arfunktion
:::

::: textlosning
For the graphs to be functions, every valid *x*-value must give *one
single* *y*-value. The graph of $g(x)$ has infinitely many *y*-values for
$x = -2$ and is therefore not a function.

We hold a pencil vertically over the graph of $f(x)$ …

::: figur
<svg viewBox="-26 -20 293 203" width="398" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same graphs with a thick vertical pencil laid over them: the pencil crosses the sideways parabola twice, so the graph is not a function."><line x1="14.4" y1="0.0" x2="14.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="38.4" y1="0.0" x2="38.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="62.4" y1="0.0" x2="62.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="86.4" y1="0.0" x2="86.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="110.4" y1="0.0" x2="110.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="134.4" y1="0.0" x2="134.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="158.4" y1="0.0" x2="158.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="182.4" y1="0.0" x2="182.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="206.4" y1="0.0" x2="206.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="230.4" y1="0.0" x2="230.4" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="244.8" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="244.8" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="244.8" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="244.8" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="244.8" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="244.8" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="244.8" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="252.8" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="260.8,86.4 250.8,81.9 250.8,90.9" fill="#1f2530"/><line x1="86.4" y1="172.8" x2="86.4" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="86.4,-16.0 81.9,-6.0 90.9,-6.0" fill="#1f2530"/><text x="258.8" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="95.4" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="14.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><text x="38.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="62.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="110.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="134.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="158.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="182.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="206.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="230.4" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">6</text><text x="80.4" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="80.4" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="80.4" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="80.4" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="80.4" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="80.4" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M172.8,144.0 L168.5,142.6 L164.4,141.1 L160.3,139.7 L156.4,138.2 L152.6,136.8 L148.8,135.4 L145.2,133.9 L141.7,132.5 L138.3,131.0 L135.0,129.6 L131.8,128.2 L128.7,126.7 L125.8,125.3 L122.9,123.8 L120.1,122.4 L117.5,121.0 L115.0,119.5 L112.5,118.1 L110.2,116.6 L108.0,115.2 L105.9,113.8 L103.9,112.3 L102.0,110.9 L100.2,109.4 L98.6,108.0 L97.0,106.6 L95.5,105.1 L94.2,103.7 L92.9,102.2 L91.8,100.8 L90.8,99.4 L89.9,97.9 L89.0,96.5 L88.3,95.0 L87.8,93.6 L87.3,92.2 L86.9,90.7 L86.6,89.3 L86.5,87.8 L86.4,86.4 L86.5,85.0 L86.6,83.5 L86.9,82.1 L87.3,80.6 L87.8,79.2 L88.3,77.8 L89.0,76.3 L89.9,74.9 L90.8,73.4 L91.8,72.0 L92.9,70.6 L94.2,69.1 L95.5,67.7 L97.0,66.2 L98.6,64.8 L100.2,63.4 L102.0,61.9 L103.9,60.5 L105.9,59.0 L108.0,57.6 L110.2,56.2 L112.5,54.7 L115.0,53.3 L117.5,51.8 L120.1,50.4 L122.9,49.0 L125.8,47.5 L128.7,46.1 L131.8,44.6 L135.0,43.2 L138.3,41.8 L141.7,40.3 L145.2,38.9 L148.8,37.4 L152.6,36.0 L156.4,34.6 L160.3,33.1 L164.4,31.7 L168.5,30.2 L172.8,28.8" fill="none" stroke="#c8324a" stroke-width="2"/><line x1="38.4" y1="168.0" x2="38.4" y2="4.8" stroke="#2563c9" stroke-width="2"/><text x="32.4" y="12.0" font-size="14" text-anchor="end" fill="#2563c9"><tspan font-style="italic">g</tspan></text><text x="211.2" y="14.4" font-size="14" text-anchor="start" fill="#c8324a"><tspan font-style="italic">f</tspan></text><line x1="146.4" y1="168.0" x2="146.4" y2="4.8" stroke="#1f2530" stroke-width="7"/></svg>
:::

… and see that it crosses the graph more than once (twice). So $f(x)$ is
not a function either.

**Answer:** No, they are not functions, because one *x*-value can give several
*y*-values.
:::
:::

::: exempel "Example 3: Read function values from the graph"
**The graph of the function $f$ is drawn.**

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of the function f: a curve that comes up from below, reaches a peak at y equals 3 near x equals 0, turns down to a trough at minus 3 at x equals 2 and then rises steeply."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/></svg>
:::

**a) Find $f(2)$&emsp;&emsp;b) Find $f(0)$&emsp;&emsp;c) Solve the equation $f(x) = 0$**

::: handskrift
typ: lasavgraf
:::

::: textlosning
**a)** $f(2)$ corresponds to the function value (the *y*-value) when $x = 2$:

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same graph with dashed lines from x equals 2 down to the point (2, minus 3) on the curve: f of 2 is minus 3."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><line x1="129.0" y1="86.4" x2="129.0" y2="158.4" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="4 3"/><line x1="69.0" y1="158.4" x2="129.0" y2="158.4" stroke="#c8324a" stroke-width="1.4" stroke-dasharray="4 3"/><circle cx="129.0" cy="158.4" r="3.6" fill="#2563c9"/></svg>
:::

We read the graph at $x = 2$ and see that the *y*-coordinate there is −3. So
$f(2) = -3$.

**Answer:** −3

**b)** $f(0)$ corresponds to the function value (the *y*-value) when $x = 0$:

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same graph with the point (0, 3) marked where the curve crosses the y-axis: f of 0 is 3."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><circle cx="69.0" cy="14.4" r="3.6" fill="#2563c9"/></svg>
:::

We read the graph at $x = 0$ (which corresponds to where it crosses the *y*-axis)
and see that the *y*-coordinate there is 3. So $f(0) = 3$.

**Answer:** 3

**c)** $f(x) = 0$ means that the function value (the *y*-value) is equal to 0:

::: figur
<svg viewBox="-26 -20 228 203" width="309" height="276" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same graph with three points marked where the curve crosses the x-axis: x equals minus 1, 1 and 3, the solutions to f of x equals 0."><line x1="9.0" y1="0.0" x2="9.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="39.0" y1="0.0" x2="39.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="69.0" y1="0.0" x2="69.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="99.0" y1="0.0" x2="99.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="129.0" y1="0.0" x2="129.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="159.0" y1="0.0" x2="159.0" y2="172.8" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="158.4" x2="180.0" y2="158.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="134.4" x2="180.0" y2="134.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="110.4" x2="180.0" y2="110.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="180.0" y2="86.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="62.4" x2="180.0" y2="62.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="38.4" x2="180.0" y2="38.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="14.4" x2="180.0" y2="14.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="86.4" x2="188.0" y2="86.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.0,86.4 186.0,81.9 186.0,90.9" fill="#1f2530"/><line x1="69.0" y1="172.8" x2="69.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="69.0,-16.0 64.5,-6.0 73.5,-6.0" fill="#1f2530"/><text x="194.0" y="104.4" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="78.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="9.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><text x="39.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><text x="99.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="129.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="159.0" y="102.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="63.0" y="162.4" font-size="12" text-anchor="end" fill="#1f2530">−3</text><text x="63.0" y="138.4" font-size="12" text-anchor="end" fill="#1f2530">−2</text><text x="63.0" y="114.4" font-size="12" text-anchor="end" fill="#1f2530">−1</text><text x="63.0" y="66.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="63.0" y="42.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="63.0" y="18.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><path d="M28.1,172.8 L29.4,163.4 L30.7,151.2 L32.0,139.7 L33.2,128.7 L34.5,118.2 L35.8,108.4 L37.1,99.1 L38.4,90.4 L39.7,82.2 L41.0,74.5 L42.2,67.3 L43.5,60.6 L44.8,54.4 L46.1,48.7 L47.4,43.5 L48.7,38.7 L50.0,34.3 L51.2,30.4 L52.5,26.9 L53.8,23.8 L55.1,21.1 L56.4,18.8 L57.7,16.9 L58.9,15.3 L60.2,14.1 L61.5,13.3 L62.8,12.7 L64.1,12.5 L65.4,12.6 L66.7,13.0 L67.9,13.6 L69.2,14.6 L70.5,15.8 L71.8,17.2 L73.1,18.9 L74.4,20.9 L75.7,23.0 L76.9,25.4 L78.2,27.9 L79.5,30.6 L80.8,33.5 L82.1,36.6 L83.4,39.8 L84.6,43.1 L85.9,46.6 L87.2,50.2 L88.5,53.8 L89.8,57.6 L91.1,61.5 L92.4,65.4 L93.6,69.4 L94.9,73.4 L96.2,77.5 L97.5,81.6 L98.8,85.7 L100.1,89.8 L101.4,93.9 L102.6,98.0 L103.9,102.1 L105.2,106.1 L106.5,110.0 L107.8,113.9 L109.1,117.7 L110.4,121.4 L111.6,125.0 L112.9,128.5 L114.2,131.9 L115.5,135.2 L116.8,138.3 L118.1,141.2 L119.3,144.0 L120.6,146.6 L121.9,149.0 L123.2,151.2 L124.5,153.2 L125.8,155.0 L127.1,156.5 L128.3,157.8 L129.6,158.9 L130.9,159.6 L132.2,160.1 L133.5,160.3 L134.8,160.2 L136.1,159.8 L137.3,159.0 L138.6,157.9 L139.9,156.5 L141.2,154.7 L142.5,152.5 L143.8,149.9 L145.0,147.0 L146.3,143.6 L147.6,139.8 L148.9,135.6 L150.2,131.0 L151.5,125.9 L152.8,120.3 L154.0,114.3 L155.3,107.8 L156.6,100.8 L157.9,93.3 L159.2,85.2 L160.5,76.7 L161.8,67.6 L163.0,57.9 L164.3,47.7 L165.6,36.9 L166.9,25.5 L168.2,13.5 L169.5,0.9 L170.7,0.0" fill="none" stroke="#4a7d3a" stroke-width="2"/><circle cx="39.0" cy="86.4" r="3.6" fill="#2563c9"/><circle cx="99.0" cy="86.4" r="3.6" fill="#2563c9"/><circle cx="159.0" cy="86.4" r="3.6" fill="#2563c9"/></svg>
:::

We read the graph at $y = 0$ (which corresponds to where it crosses the
*x*-axis) and see that this holds when $x = -1$, $x = 1$ and $x = 3$.
The equation therefore has three solutions.

**Answer:** $x_1 = -1$, $x_2 = 1$ and $x_3 = 3$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Function"
- A relationship where every allowed $x$-value gives **exactly one** $y$-value.
- **The vertical line test**: a vertical line may cross the graph **at most
  once**.
:::

::: sampunkt "Dependent and independent"
- $x$ is the **independent** variable, the one we choose ourselves.
- $y$ is the **dependent** variable, the one that follows from $x$.
- The value $y$ takes is called the **function value**.
:::

::: sampunkt "The notation"
- $y = f(x)$, which is read "$f$ of $x$".
- $f$ is the name of the function, $x$ shows which variable it depends on.
- Other letters work just as well: $g(x)$, $h(x)$.
- $f(x) = kx + m$ is called a **linear function**, because its graph is a straight
  line.
:::

::: sampunkt "Calculating function values"
- **Replace $x$** with what is inside the brackets.
- $f(x) = 5x - 3$ gives $f(4) = 17$ and
  $f(-2) = -13$.
- Expressions work too: $f(3a) = 15a - 3$.
:::

::: sampunkt "Reading from a graph"
- $f(2)$: go to $x = 2$ and read off the **height**.
- $f(0)$: read off where the graph crosses the $y$-axis.
- $f(x) = 0$: find **all** $x$ where the graph crosses the $x$-axis. There may
  be several.
:::
:::
