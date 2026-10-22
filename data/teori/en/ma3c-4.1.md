---
kalla: c44a035a49
id: ma3c-4.1
title: Increasing and decreasing functions
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.1'
---

# Increasing and decreasing functions

Remember: the derivative corresponds to the **slope of a graph at a point**. The sign of
the derivative therefore reveals which way the graph slopes, and so whether
the function is increasing or decreasing.

::: tips "Increasing and decreasing"
If the value of $f'(x)$ is

- **positive**, that is $f'(x) > 0$, the slope of $f(x)$ is positive
  ("uphill") and the function is **increasing**.
- **negative**, that is $f'(x) < 0$, the slope of $f(x)$ is negative
  ("downhill") and the function is **decreasing**.
:::

::: tips "Strictly increasing and strictly decreasing"
If a function is all the time

- increasing in an interval, the function is **strictly increasing** in the interval.
- decreasing in an interval, the function is **strictly decreasing** in
  the interval.
:::

So we can determine in which intervals a function increases and decreases in two
ways: either by studying the slope directly on the graph of $f(x)$,
or by studying the **sign** of the graph of the derivative $f'(x)$.

## Reading increasing and decreasing from a graph

::: exempel "Example 1: Reading increasing and decreasing from a graph"
**In which intervals is each of the functions below increasing and decreasing?<br>
a)&nbsp;$f(x)$&emsp;&emsp;b)&nbsp;$g(x)$**

::: figur
<svg viewBox="26 2 180 141" width="244" height="191" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function f of x, a downward-opening arc with zeros at x=-1 and x=3 and a maximum at the point (1, 2)."><line x1="54" y1="139" x2="54" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="84" y1="139" x2="84" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="114" y1="139" x2="114" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="144" y1="139" x2="144" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="174" y1="139" x2="174" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="124" x2="192" y2="124" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="94" x2="192" y2="94" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="64" x2="192" y2="64" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="34" x2="192" y2="34" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="94" x2="192" y2="94" stroke="#1f2530" stroke-width="1.6"/><polygon points="202,94 192,89.5 192,98.5" fill="#1f2530"/><line x1="84" y1="139" x2="84" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="84,6 79.5,16 88.5,16" fill="#1f2530"/><text x="54" y="108" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="114" y="108" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="144" y="108" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="174" y="108" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="77" y="128" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="77" y="68" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="77" y="38" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="77" y="108" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M54,94 L57,88.2 L60,82.6 L63,77.4 L66,72.4 L69,67.8 L72,63.4 L75,59.4 L78,55.6 L81,52.2 L84,49 L87,46.2 L90,43.6 L93,41.3 L96,39.4 L99,37.8 L102,36.4 L105,35.4 L108,34.6 L111,34.2 L114,34 L117,34.2 L120,34.6 L123,35.4 L126,36.4 L129,37.8 L132,39.4 L135,41.4 L138,43.6 L141,46.2 L144,49 L147,52.2 L150,55.6 L153,59.4 L156,63.4 L159,67.8 L162,72.4 L165,77.4 L168,82.6 L171,88.2 L174,94" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="139.5" y="35.5" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>
:::

::: handskrift
typ: vaxandeavtagande
:::

::: textlosning
**a)** $f(x)$ is increasing where the graph has a positive slope ("uphill"
seen from left to right). It has that for all $x$-values up to
$x = 1$, that is, the function is increasing for $x < 1$.

$f(x)$ is decreasing where the graph has a negative slope ("downhill"). It
has that for all $x$-values after $x = 1$, that is, the function is decreasing
for $x > 1$.

**Answer:** Increasing for $x < 1$ and decreasing for $x > 1$.

::: figur
<svg viewBox="26 2 174 127" width="236" height="172" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function g of x with a local minimum at the point (-1,-1) and a local maximum at the point (1,1)."><line x1="40.2" y1="124.8" x2="40.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="74.2" y1="124.8" x2="74.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="142.2" y1="124.8" x2="142.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176.2" y1="124.8" x2="176.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="104.4" x2="186.4" y2="104.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="36.4" x2="186.4" y2="36.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.4,70.4 186.4,65.9 186.4,74.9" fill="#1f2530"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="108.2,6 103.7,16 112.7,16" fill="#1f2530"/><text x="40.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-2</text><text x="74.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="142.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="176.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="101.2" y="108.4" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="101.2" y="40.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="101.2" y="84.4" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M40.2,36.4 L43,48.5 L45.9,59.1 L48.7,68.5 L51.5,76.7 L54.4,83.7 L57.2,89.5 L60,94.3 L62.9,98.1 L65.7,100.9 L68.5,102.9 L71.4,104 L74.2,104.4 L77,104.1 L79.9,103.1 L82.7,101.5 L85.5,99.4 L88.4,96.8 L91.2,93.8 L94,90.4 L96.9,86.8 L99.7,82.9 L102.5,78.8 L105.4,74.6 L108.2,70.4 L111,66.2 L113.9,62 L116.7,57.9 L119.5,54 L122.4,50.4 L125.2,47 L128,44 L130.9,41.4 L133.7,39.3 L136.5,37.7 L139.4,36.7 L142.2,36.4 L145,36.8 L147.9,37.9 L150.7,39.9 L153.5,42.7 L156.4,46.5 L159.2,51.3 L162,57.1 L164.9,64.1 L167.7,72.3 L170.5,81.7 L173.4,92.3 L176.2,104.4" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="35.1" y="24.5" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>
:::

**b)** The same reasoning as in part a. $g(x)$ is increasing between
$x = -1$ and $x = 1$, that is for $-1 < x < 1$.

$g(x)$ is decreasing for all $x$-values before $-1$ and for all
$x$-values after $1$, that is for $x < -1$ and $x > 1$.

**Answer:** Increasing for $-1 < x < 1$ and decreasing for $x < -1$ and
$x > 1$.
:::
:::

::: exempel "Example 2: Interpreting the sign of the derivative from a graph"
**The graph of the function $g(x)$ (the same function as in the previous
example) is shown below.<br>
a) Is $g'(2)$ positive, negative or zero?&emsp;&emsp;
b) In which interval is $g'(x) > 0$?&emsp;&emsp;
c) For which $x$ is $g'(x) = 0$?**

::: figur
<svg viewBox="26 2 174 127" width="236" height="172" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of a function g of x with a local minimum at the point (-1,-1) and a local maximum at the point (1,1)."><line x1="40.2" y1="124.8" x2="40.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="74.2" y1="124.8" x2="74.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="142.2" y1="124.8" x2="142.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="176.2" y1="124.8" x2="176.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="104.4" x2="186.4" y2="104.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="36.4" x2="186.4" y2="36.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="70.4" x2="186.4" y2="70.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="196.4,70.4 186.4,65.9 186.4,74.9" fill="#1f2530"/><line x1="108.2" y1="124.8" x2="108.2" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="108.2,6 103.7,16 112.7,16" fill="#1f2530"/><text x="40.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-2</text><text x="74.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="142.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="176.2" y="84.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="101.2" y="108.4" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="101.2" y="40.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="101.2" y="84.4" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M40.2,36.4 L43,48.5 L45.9,59.1 L48.7,68.5 L51.5,76.7 L54.4,83.7 L57.2,89.5 L60,94.3 L62.9,98.1 L65.7,100.9 L68.5,102.9 L71.4,104 L74.2,104.4 L77,104.1 L79.9,103.1 L82.7,101.5 L85.5,99.4 L88.4,96.8 L91.2,93.8 L94,90.4 L96.9,86.8 L99.7,82.9 L102.5,78.8 L105.4,74.6 L108.2,70.4 L111,66.2 L113.9,62 L116.7,57.9 L119.5,54 L122.4,50.4 L125.2,47 L128,44 L130.9,41.4 L133.7,39.3 L136.5,37.7 L139.4,36.7 L142.2,36.4 L145,36.8 L147.9,37.9 L150.7,39.9 L153.5,42.7 L156.4,46.5 L159.2,51.3 L162,57.1 L164.9,64.1 L167.7,72.3 L170.5,81.7 L173.4,92.3 L176.2,104.4" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="35.1" y="24.5" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">g</tspan>(<tspan font-style="italic">x</tspan>)</text></svg>
:::

::: handskrift
typ: derivatatecken
:::

::: textlosning
**a)** $g'(2)$ stands for the derivative (the slope) when $x = 2$. The slope is
negative there, since $g(x)$ decreases for $x > 1$. So $g'(2)$ is negative.

**Answer:** Negative.

**b)** $g'(x) > 0$ means that the derivative (the slope) must be positive,
that is, the function increases. The graph has a positive slope between $x = -1$ and
$x = 1$, that is when $-1 < x < 1$.

**Answer:** $-1 < x < 1$

**c)** $g'(x) = 0$ means that the derivative (the slope) must be zero,
that is, the tangent at the point is horizontal. It is at $x = -1$ and
$x = 1$ (at the local minimum point and the local maximum point respectively).

**Answer:** $x = -1$ and $x = 1$
:::
:::

## Determining increasing and decreasing with a sign table

When we instead see the graph of the derivative $f'(x)$, we can determine where
$f(x)$ increases and decreases by studying the **sign** of $f'(x)$ in
the intervals between its zeros.

::: tips "Step by step"
1. Determine the zeros of $f'(x)$, that is, where the graph of the derivative crosses
   the $x$-axis.
2. Read off the sign of $f'(x)$ in each interval between the zeros.
   A positive sign gives an increasing $f(x)$, a negative sign gives a decreasing
   $f(x)$.
3. Collect the result in a **sign table**.
:::

::: exempel "Example 3: Determining where $f(x)$ increases from the graph of $f'(x)$"
**The figure below shows the graph of $y = f'(x)$.<br>
a) In which interval is $f(x)$ increasing?&emsp;&emsp;
b) For which $x$-values does the graph of $f(x)$ have slope 0?**

::: figur
<svg viewBox="26 2 212 167" width="288" height="227" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The graph of the derivative f-prime of x, a downward-opening arc with zeros at x=-1 and x=5 and a maximum at the point (2, 3)."><line x1="37.2" y1="164.8" x2="37.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="61.2" y1="164.8" x2="61.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="85.2" y1="164.8" x2="85.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="109.2" y1="164.8" x2="109.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="133.2" y1="164.8" x2="133.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="157.2" y1="164.8" x2="157.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="181.2" y1="164.8" x2="181.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="205.2" y1="164.8" x2="205.2" y2="16" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="150.4" x2="224.4" y2="150.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="126.4" x2="224.4" y2="126.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="102.4" x2="224.4" y2="102.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="78.4" x2="224.4" y2="78.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="54.4" x2="224.4" y2="54.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="30.4" x2="224.4" y2="30.4" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="30" y1="102.4" x2="224.4" y2="102.4" stroke="#1f2530" stroke-width="1.6"/><polygon points="234.4,102.4 224.4,97.9 224.4,106.9" fill="#1f2530"/><line x1="85.2" y1="164.8" x2="85.2" y2="16" stroke="#1f2530" stroke-width="1.6"/><polygon points="85.2,6 80.7,16 89.7,16" fill="#1f2530"/><text x="37.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">-2</text><text x="61.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">-1</text><text x="109.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">1</text><text x="133.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">2</text><text x="157.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">3</text><text x="181.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">4</text><text x="205.2" y="116.4" font-size="12" text-anchor="middle" fill="#1f2530">5</text><text x="78.2" y="154.4" font-size="12" text-anchor="end" fill="#1f2530">-2</text><text x="78.2" y="130.4" font-size="12" text-anchor="end" fill="#1f2530">-1</text><text x="78.2" y="82.4" font-size="12" text-anchor="end" fill="#1f2530">1</text><text x="78.2" y="58.4" font-size="12" text-anchor="end" fill="#1f2530">2</text><text x="78.2" y="34.4" font-size="12" text-anchor="end" fill="#1f2530">3</text><text x="78.2" y="116.4" font-size="12" text-anchor="end" fill="#1f2530">0</text><path d="M37.2,158.4 L41,148.5 L44.8,138.9 L48.6,129.8 L52.4,121.1 L56.2,112.7 L60,104.8 L63.8,97.3 L67.6,90.2 L71.4,83.4 L75.2,77.1 L79,71.2 L82.8,65.7 L86.6,60.6 L90.4,55.8 L94.2,51.5 L98,47.6 L101.8,44.1 L105.6,41 L109.4,38.3 L113.2,36 L117,34 L120.8,32.5 L124.6,31.4 L128.4,30.7 L132.2,30.4 L136,30.5 L139.8,31 L143.6,31.9 L147.4,33.2 L151.2,34.9 L155,37 L158.8,39.5 L162.6,42.4 L166.4,45.7 L170.2,49.4 L174,53.5 L177.8,58 L181.6,62.9 L185.4,68.2 L189.2,74 L193,80.1 L196.8,86.6 L200.6,93.5 L204.4,100.8 L208.2,108.5 L212,116.6 L215.8,125.2 L219.6,134.1" fill="none" stroke="#2563c9" stroke-width="2.2"/><text x="118.8" y="22" font-size="14" text-anchor="start" fill="#2563c9"><tspan font-style="italic">f</tspan>&#8242;(<tspan font-style="italic">x</tspan>)</text></svg>
:::

::: handskrift
typ: derivatansgraf
:::

::: textlosning
**a)** $f(x)$ is increasing when $f'(x)$ (the slope) is greater than 0. The graph
of $f'(x)$ lies above the $x$-axis between $x = -1$ and $x = 5$, that is
for $-1 < x < 5$.

| Interval | Sign of $f'(x)$ | $f(x)$ |
| --- | --- | --- |
| $x < -1$ | negative | decreasing |
| $-1 < x < 5$ | positive | increasing |
| $x > 5$ | negative | decreasing |

**Answer:** $-1 < x < 5$

**b)** $f(x)$ has slope 0 where $f'(x) = 0$, that is, where the graph of
$f'(x)$ crosses the $x$-axis. This happens at $x = -1$ and $x = 5$.

**Answer:** $x = -1$ and $x = 5$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The sign of the derivative"
- $f'(x) > 0$ means a positive slope, so an **increasing** function.
- $f'(x) < 0$ means a negative slope, so a **decreasing** function.
- $f'(x) = 0$ means a horizontal tangent.
:::

::: sampunkt "Strictly increasing and decreasing"
- If the function is increasing in the **whole** of an interval, it is **strictly increasing** there.
- If it is decreasing in the whole interval, it is **strictly decreasing**.
- The answer is always given as an interval, for example $-1 < x < 1$.
:::

::: sampunkt "Two ways to decide"
1. Look at the slope directly in the graph of $f(x)$: uphill or downhill seen from left to right.
2. Look at the **sign** in the graph of $f'(x)$: above the $x$-axis means an increasing $f(x)$.
- Keep the graphs apart. A **zero** of $f'(x)$ gives a horizontal tangent to $f(x)$, and an **extreme point** if $f'(x)$ changes sign there.
:::

::: sampunkt "Sign table"
1. Determine the zeros of $f'(x)$.
2. Read off the sign of $f'(x)$ in each interval between the zeros.
3. Collect in a sign table: plus gives increasing, minus gives decreasing.
:::

:::
