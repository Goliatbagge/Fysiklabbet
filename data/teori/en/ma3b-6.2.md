---
kalla: d8b16ab925
id: ma3b-6.2
title: Geometric sequences
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.2'
---

# Geometric sequences

You deposit 10 000 kr in an account with an interest rate of 5 %. Each year
the amount is multiplied by the change factor 1.05, and the balance year by year becomes

$$
10\,000,\ 10\,500,\ 11\,025,\ 11\,576.25,\ \ldots
$$

Each term is the previous one times the same number. That is exactly what
characterises a geometric sequence, which we met in the previous section.

## The common ratio

In a **geometric sequence** each term is obtained by multiplying the previous one
by the same number, the **common ratio** $k$. We get the common ratio by
dividing a term by the term before it:

$$
k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2} = \ldots
$$

In the sequence above $k = \dfrac{10\,500}{10\,000} = 1.05$. So the common ratio is
the same number as the change factor.

## Formula for the *n*th term

To get from $a_1$ to $a_{\mathit{n}}$ we multiply by the common ratio once for
each step. That gives a closed formula for the terms.

::: formel "The $n$th term of a geometric sequence"
$$
a_{\mathit{n}} = a_1 \cdot k^{n-1}
$$

where

- $a_{\mathit{n}}$ = term number $n$
- $a_1$ = first term
- $k$ = common ratio
- $n$ = position number

::: härledning "Derivation: Why the exponent is $n - 1$"
Each step forward in the sequence is a multiplication by $k$:

$$
a_2 = a_1 \cdot k
$$

$$
a_3 = a_2 \cdot k = a_1 \cdot k \cdot k = a_1 \cdot k^2
$$

$$
a_4 = a_3 \cdot k = a_1 \cdot k^2 \cdot k = a_1 \cdot k^3
$$

The exponent is always one less than the position number, because the first
term has not been multiplied by $k$ at all. From $a_1$ to $a_{\mathit{n}}$
there are $n - 1$ steps, so

$$
a_{\mathit{n}} = a_1 \cdot k^{n-1}
$$
:::
:::

## The common ratio decides how the sequence behaves

The figure shows two geometric sequences plotted as points, with
the position number $n$ on the horizontal axis.

::: figur
<svg viewBox="14 12 360 228" width="489" height="309" font-family="Poppins, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two geometric sequences plotted as points in a coordinate system with the position number n on the horizontal axis. The blue points, with the common ratio 1.5, start at 1 and grow faster and faster. The red points, with the common ratio 0.5, start at 8 and are halved at each step towards zero."><line x1="46" y1="170" x2="353.2" y2="170" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="126" x2="353.2" y2="126" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="82" x2="353.2" y2="82" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="38" x2="353.2" y2="38" stroke="#c9c2b4" stroke-width="0.8" stroke-dasharray="3 3"/><line x1="46" y1="214" x2="361" y2="214" stroke="#1f2530" stroke-width="1.5"/><polygon points="361,209.5 370,214 361,218.5" fill="#1f2530"/><line x1="46" y1="214" x2="46" y2="25" stroke="#1f2530" stroke-width="1.5"/><polygon points="41.5,25 46,16 50.5,25" fill="#1f2530"/><line x1="94" y1="210" x2="94" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="94" y="233" font-size="13" text-anchor="middle" fill="#1f2530">1</text><line x1="142" y1="210" x2="142" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="142" y="233" font-size="13" text-anchor="middle" fill="#1f2530">2</text><line x1="190" y1="210" x2="190" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="190" y="233" font-size="13" text-anchor="middle" fill="#1f2530">3</text><line x1="238" y1="210" x2="238" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="238" y="233" font-size="13" text-anchor="middle" fill="#1f2530">4</text><line x1="286" y1="210" x2="286" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="286" y="233" font-size="13" text-anchor="middle" fill="#1f2530">5</text><line x1="334" y1="210" x2="334" y2="218" stroke="#1f2530" stroke-width="1.3"/><text x="334" y="233" font-size="13" text-anchor="middle" fill="#1f2530">6</text><line x1="42" y1="170" x2="50" y2="170" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="174.5" font-size="13" text-anchor="end" fill="#1f2530">2</text><line x1="42" y1="126" x2="50" y2="126" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="130.5" font-size="13" text-anchor="end" fill="#1f2530">4</text><line x1="42" y1="82" x2="50" y2="82" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="86.5" font-size="13" text-anchor="end" fill="#1f2530">6</text><line x1="42" y1="38" x2="50" y2="38" stroke="#1f2530" stroke-width="1.3"/><text x="38" y="42.5" font-size="13" text-anchor="end" fill="#1f2530">8</text><text x="368" y="233" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">n</tspan></text><text x="55" y="25" font-size="14" fill="#1f2530"><tspan font-style="italic">a</tspan><tspan font-size="10" dy="3"><tspan font-style="italic">n</tspan></tspan></text><circle cx="94" cy="192" r="4.2" fill="#2b5ca8"/><circle cx="142" cy="181" r="4.2" fill="#2b5ca8"/><circle cx="190" cy="164.5" r="4.2" fill="#2b5ca8"/><circle cx="238" cy="139.8" r="4.2" fill="#2b5ca8"/><circle cx="286" cy="102.6" r="4.2" fill="#2b5ca8"/><circle cx="334" cy="46.9" r="4.2" fill="#2b5ca8"/><rect x="90.2" y="34.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="138.2" y="122.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="186.2" y="166.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="234.2" y="188.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="282.2" y="199.2" width="7.6" height="7.6" fill="#b5452e"/><rect x="330.2" y="204.7" width="7.6" height="7.6" fill="#b5452e"/><text x="324" y="51.9" font-size="13" text-anchor="end" fill="#2b5ca8"><tspan font-style="italic">k</tspan> = 1.5 (increasing)</text><text x="106" y="65" font-size="13" fill="#b5452e"><tspan font-style="italic">k</tspan> = 0.5 (decreasing)</text></svg>

The blue points have $a_1 = 1$ and $k = 1.5$. The red ones have $a_1 = 8$ and $k = 0.5$.
:::

- If $k > 1$ the terms **grow**, and they grow faster and faster.
- If $0 < k < 1$ the terms **decrease** and approach 0, without ever
  becoming 0.
- If $k$ is negative the terms **alternate** in sign. With $a_1 = 1$ and $k = -2$
  the sequence becomes $1, -2, 4, -8, 16, \ldots$

::: exempel "Example 1: Determine a term"
**The sequence $3,\ 6,\ 12,\ 24,\ \ldots$ is geometric.<br>a) Determine a closed formula for $a_{\mathit{n}}$.<br>b) Determine $a_{10}$.**

::: handskrift
typ: geomelement
:::

::: textlosning
**a)** We determine the common ratio by dividing a term by the term
before it.

$$
k = \frac{a_2}{a_1} = \frac{6}{3} = 2
$$

With $a_1 = 3$ and $k = 2$ the formula $a_{\mathit{n}} = a_1 \cdot k^{n-1}$ gives

$$
a_{\mathit{n}} = 3 \cdot 2^{n-1}
$$

**Answer:** $a_{\mathit{n}} = 3 \cdot 2^{n-1}$

**b)** We substitute $n = 10$ into the formula from a).

$$
a_{10} = 3 \cdot 2^{10-1} = 3 \cdot 2^9 = 3 \cdot 512 = 1\,536
$$

**Answer:** $a_{10} = 1\,536$
:::
:::

## The common ratio from two terms that are not next to each other

If we know two terms that are further apart, we can still determine the common ratio.
From $a_2$ to $a_5$ there are three steps, so $a_5 = a_2 \cdot k^3$. The number of
steps is the difference between the position numbers, $5 - 2 = 3$.

::: exempel "Example 2: The common ratio from two terms"
**In a geometric sequence $a_2 = 12$ and $a_5 = 324$. Determine the common ratio $k$ and the first term $a_1$.**

::: handskrift
typ: geomkvot
:::

::: textlosning
From $a_2$ to $a_5$ we multiply by $k$ three times, so

$$
a_5 = a_2 \cdot k^3
$$

Substituting $a_2 = 12$ and $a_5 = 324$ gives an equation for $k$.

$$
324 = 12 \cdot k^3
$$

We divide both sides by 12.

$$
27 = k^3
$$

The common ratio is the number that raised to 3 becomes 27, that is, the cube root of 27.

$$
k = \sqrt[3]{27}
$$

$$
k = 3
$$

The first term is one step before $a_2$, so we divide $a_2$ by
the common ratio.

$$
a_1 = \frac{a_2}{k} = \frac{12}{3} = 4
$$

Check: $a_5 = 4 \cdot 3^4 = 4 \cdot 81 = 324$. It is correct.

**Answer:** $k = 3$ and $a_1 = 4$
:::
:::

## Percentage change year after year

An amount that changes by the same percentage every year forms a geometric
sequence where the common ratio is the change factor. A salary of 28 000 kr that is raised by
3 % per year becomes

$$
28\,000,\ 28\,000 \cdot 1.03,\ 28\,000 \cdot 1.03^2,\ \ldots
$$

So the salary in year $n$ is $a_{\mathit{n}} = 28\,000 \cdot 1.03^{n-1}$. Notice
the exponent: the first year's salary has not been raised at all, so the salary in year 8 has
been raised 7 times.

If we want to find out **when** the terms pass a certain value, the
unknown $n$ is in the exponent. Then we take the logarithm of both sides, just as when
exponential equations were solved with lg (the common logarithm, log₁₀) in Mathematics level 2.

::: exempel "Example 3: The growing salary"
**Elin has a monthly salary of 28 000 kr in her first year at a new job. The salary is raised by 3 % every year.<br>a) How large is the monthly salary in year 8?<br>b) In which year does the monthly salary become higher than 40 000 kr for the first time?**

::: handskrift
typ: geomlon
:::

::: textlosning
**a)** The salaries form a geometric sequence with $a_1 = 28\,000$ and
the common ratio $k = 1.03$, which is the change factor for an increase of 3 %.

$$
a_{\mathit{n}} = 28\,000 \cdot 1.03^{n-1}
$$

In year 8 the salary has been raised 7 times.

$$
a_8 = 28\,000 \cdot 1.03^7 = 34\,436.468\ldots \approx 34\,436
$$

**Answer:** About 34 436 kr

**b)** We first find out when the salary is exactly 40 000 kr.

$$
28\,000 \cdot 1.03^{n-1} = 40\,000
$$

We divide both sides by 28 000.

$$
1.03^{n-1} = 1.428\,571\ldots
$$

The unknown is in the exponent, so we take the logarithm of both sides.

$$
\lg 1.03^{n-1} = \lg 1.428\,571\ldots
$$

The law of logarithms moves the exponent down in front of the logarithm.

$$
(n - 1) \cdot \lg 1.03 = \lg 1.428\,571\ldots
$$

We divide both sides by $\lg 1.03$.

$$
n - 1 = \frac{\lg 1.428\,571\ldots}{\lg 1.03} = 12.066\ldots
$$

$$
n = 13.066\ldots
$$

The salary is only raised once a year. In year 13 it is
$28\,000 \cdot 1.03^{12} \approx 39\,921$ kr, so still below
40 000 kr, and in year 14 it is $28\,000 \cdot 1.03^{13} \approx 41\,119$ kr.

**Answer:** Year 14
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Geometric sequence"
- Each term is the previous one times the **common ratio** $k$.
- $k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2}$
- $3, 6, 12, 24, \ldots$ has the common ratio $k = 2$.
:::

::: sampunkt "The $n$th term"
- $a_{\mathit{n}} = a_1 \cdot k^{n-1}$
- The exponent is $n - 1$: from $a_1$ to $a_{\mathit{n}}$ there are $n - 1$ steps.
- $a_{10} = 3 \cdot 2^9 = 1\,536$
:::

::: sampunkt "The common ratio from two terms"
- From $a_2$ to $a_5$ there are three steps: $a_5 = a_2 \cdot k^3$.
- $324 = 12 \cdot k^3$ gives $k^3 = 27$ and $k = \sqrt[3]{27} = 3$.
:::

::: sampunkt "Percentages and time"
- If an amount changes by the same percentage, the common ratio is the **change factor**.
- If $n$ is sought: take the logarithm of both sides and solve for $n$.
- If the equation gives $n = 13.07$, the value is passed only in **year 14**.
:::
:::
