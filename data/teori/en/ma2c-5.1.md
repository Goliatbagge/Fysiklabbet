---
kalla: 30ddb9e087
id: ma2c-5.1
title: Exponential and power equations
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.1'
---

# Exponential and power equations

## Power equations

An equation where the variable, usually $x$, is in the **base** ("$x$ raised
to something") is called a **power equation**. These can be solved with two
algebraic methods: either with the laws of exponents or with root expressions.

::: exempel "Example 1: Solve the power equation"
**Solve the power equation $x^7 = 860$.**

::: handskrift
typ: potensekvation2c
:::

::: textlosning
**Method 1: With the laws of exponents.** We raise both sides to the power $\dfrac{1}{7}$:

$$
x = 860^{1/7} \approx 2.63 \quad \text{(entered on the calculator)}
$$

**Method 2: With root expressions.** We take the seventh root of both sides:

$$
x = \sqrt[7]{860} \approx 2.63 \quad \text{(entered on the calculator)}
$$

**Answer:** $x \approx 2.63$

**NOTE!** If the exponent is **even**, the equation has two solutions: one
positive and one negative. Then $\pm$ must be placed in front of the
root sign/solution.
:::
:::

A power function in general form is written $y = C \cdot x^a$.

## Exponential equations

An equation where the variable, usually $x$, is in the **exponent** ("something
raised to $x$") is called an **exponential equation**. We do not have an
algebraic method for solving these, yet. So we solve them graphically, by
drawing both sides of the equation and finding the $x$-coordinate of the
intersection.

An exponential function in general form is written $y = C \cdot a^x$.

::: tips "Applications"
In applications where we have an **exponential change**, for example where
something changes by a certain percentage per year, we can set up an
equation of the form

$$
y = C \cdot a^x
$$

where

- $y$ = the value after a certain number of changes (often after a certain
  time)
- $C$ = the original value
- $a$ = the change factor
- $x$ = the number of changes (often time)
:::

::: exempel "Example 2: Shares"
**You buy shares for 12 000 kr.**

::: handskrift
typ: aktierna
:::

::: textlosning
In part b we will solve an exponential equation graphically.
The graph below shows the plot with the point of intersection A.

::: figur
<svg viewBox="-14 4 226 196" width="330" height="286" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="An exponential curve that starts at 12 000 and rises, and a horizontal line at 50 000. They intersect at x approximately 8.8."><line x1="66" y1="12" x2="66" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="102" y1="12" x2="102" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="138" y1="12" x2="138" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="174" y1="12" x2="174" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="120" x2="200" y2="120" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="70" x2="200" y2="70" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="20" x2="200" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="22" y1="170" x2="205" y2="170" stroke="#1f2530" stroke-width="1.6"/><polygon points="213,170 203,165.5 203,174.5" fill="#1f2530"/><line x1="30" y1="178" x2="30" y2="14" stroke="#1f2530" stroke-width="1.6"/><polygon points="30,6 25.5,16 34.5,16" fill="#1f2530"/><text x="211" y="188" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="39" y="16" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><text x="66" y="184" font-size="11" text-anchor="middle" fill="#1f2530">2</text><text x="102" y="184" font-size="11" text-anchor="middle" fill="#1f2530">4</text><text x="138" y="184" font-size="11" text-anchor="middle" fill="#1f2530">6</text><text x="174" y="184" font-size="11" text-anchor="middle" fill="#1f2530">8</text><text x="-12" y="124" font-size="10" text-anchor="start" fill="#1f2530">20 000</text><text x="-12" y="74" font-size="10" text-anchor="start" fill="#1f2530">40 000</text><text x="-12" y="24" font-size="10" text-anchor="start" fill="#1f2530">60 000</text><line x1="22" y1="45" x2="200" y2="45" stroke="#4a7d3a" stroke-width="2"/><path d="M 30,140 C 31.5,139.58 36,138.38 39,137.5 C 42,136.62 45,135.67 48,134.7 C 51,133.73 54,132.73 57,131.7 C 60,130.67 63,129.62 66,128.5 C 69,127.38 72,126.22 75,125 C 78,123.78 81,122.52 84,121.2 C 87,119.88 90,118.53 93,117.1 C 96,115.67 99,114.15 102,112.6 C 105,111.05 108,109.48 111,107.8 C 114,106.12 117,104.33 120,102.5 C 123,100.67 126,98.78 129,96.8 C 132,94.82 135,92.75 138,90.6 C 141,88.45 144,86.22 147,83.9 C 150,81.58 153,79.22 156,76.7 C 159,74.18 162,71.53 165,68.8 C 168,66.07 171,63.27 174,60.3 C 177,57.33 180,54.23 183,51 C 186,47.77 190.5,42.58 192,40.9" fill="none" stroke="#2563c9" stroke-width="2"/><circle cx="188.4" cy="45" r="3.5" fill="#c8324a"/><text x="182" y="36" font-size="12" text-anchor="end" fill="#c8324a">A</text></svg>
:::

**a) 5 years later you sell them for 27 000 kr. What average annual increase in percent does that correspond to?<br>b) If the increase continues in the same way, how long after the purchase are they worth 50 000 kr?**

**a)** We are to calculate a percentage change, so we set up the
formula

$$
y = C \cdot a^x
$$

where we are looking for the change factor $a$. We substitute our known values:
$y = 27\,000$ (the value after a certain time), $C = 12\,000$ (the original
value) and $x = 5$ (time).

$$
27\,000 = 12\,000 \cdot a^5
$$

$$
\frac{27\,000}{12\,000} = a^5
$$

$$
2.25 = a^5
$$

This is a power equation:

$$
a = 2.25^{1/5} = \sqrt[5]{2.25} = 1.1760\ldots \approx 1.176
$$

The change factor is therefore about 1.176, which corresponds to an increase
of 17.6 % ($1.176 - 1 = 0.176 = 17.6\ \%$).

**Answer:** 17.6 %

**b)** We are to calculate after how long the shares have a certain value
with the same percentage change. We again set up the formula
$y = C \cdot a^x$, where we are looking for the time $x$. We substitute our known
values: $y = 50\,000$, $C = 12\,000$ and $a = 1.176$:

$$
50\,000 = 12\,000 \cdot 1.176^x
$$

This is an **exponential equation**. We draw $y = 50\,000$ (the expression
on the left-hand side) and $y = 12\,000 \cdot 1.176^x$ (the expression on the right-hand
side) with a graphing tool and find the $x$-coordinate of the
intersection (see the graph above).

We see that the $x$-coordinate of the intersection is $x \approx 8.8$.

**Answer:** After about 9 years.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Two kinds of equations"
- **Power equation:** the variable is in the **base**, for example $x^3 = 50$.
- **Exponential equation:** the variable is in the **exponent**, for example $3^x = 50$.
- Always check where $x$ is before you choose a method.
:::

::: sampunkt "Methods of solution"
- A power equation $x^n = b$ is solved with a root: $x = \sqrt[n]{b}$.
- At this level an exponential equation is solved **graphically**: draw $y = a^x$ and $y = b$ and read off the $x$-value of the point of intersection.
- Always check the answer by substituting it into the original equation.
:::

::: sampunkt "Exponential model"
- $y = C \cdot a^x$, where $C$ is the original value and $a$ is the change factor.
- $a > 1$ gives an increase, $0 < a < 1$ gives a decrease.
- $x$ is the number of changes, usually the number of years.
:::

::: sampunkt "Change factor"
- An increase of $p$ percent gives $a = 1 + \dfrac{p}{100}$. An increase of 5 % gives $a = 1.05$.
- A decrease of $p$ percent gives $a = 1 - \dfrac{p}{100}$. A decrease of 5 % gives $a = 0.95$.
- The question "how long" leads to an exponential equation, where $x$ is sought.
:::

:::
