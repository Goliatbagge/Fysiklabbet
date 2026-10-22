---
kalla: 2d3b9dedde
id: ma3c-3.7
title: Applications of the derivative with digital tools
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.7'
---

# Applications of the derivative with digital tools

When we solve an applied task with the rules of differentiation, we do an
algebraic solution by hand. We can also solve applied tasks involving
the derivative using digital tools, for example GeoGebra.

| Task | Command in GeoGebra |
| --- | --- |
| Determine a function value | $f(x) = \ldots$ and then, for example, $f(3)$ |
| Differentiate | $f(x) = \ldots$ and then $f'(x)$ |
| Determine the value of the derivative | $f(x) = \ldots$ and then, for example, $f'(3)$ |
| Solve equations numerically (gives decimals) | NSolve(Equation) |
| Solve equations exactly (gives symbols) | Solve(Equation) |

We have previously shown that an exponential function can be written in
the form $y = C \cdot a^x$ where $C$ represents the initial value of the function and $a$
the growth factor. We can also write exponential functions with
base $e$ to make differentiation easier.

::: formel "Exponential functions with base e"
$$
y = Ce^{kx}
$$

where $e^k = a$ (the growth factor).
:::

## Solving applied tasks with GeoGebra

::: exempel "Example 1: The growth rate of a rabbit population"
**The number of rabbits $N(t)$ in a population is given by
$N(t) = 30 \cdot 1.84^t$ where $t$ is the time in weeks.<br>a)
Calculate the growth rate after 4 weeks.<br>b) After how long
is the growth rate 100 rabbits/week?**

::: handskrift
typ: caskaniner
:::

::: textlosning
**a)** The growth rate after 4 weeks corresponds to $N'(4)$. We
define the function by typing $N(t) = 30 \cdot 1.84^t$ in
GeoGebra's input bar. Then we type $N'(4)$ on the line below and
read off the value:

$$
N'(4) \approx 209.67925
$$

We see that $N'(4) \approx 210$.

**Answer:** The population is increasing by about 210 rabbits/week after 4 weeks.

**b)** The growth rate 100 rabbits/week corresponds to $N'(t) = 100$.
We type NSolve(N'(t) = 100) in GeoGebra's input bar to solve for
the time and get

$$
t \approx 2.78575
$$

which is rounded to $t \approx 2.8$.

**Answer:** After about 2.8 weeks.
:::
:::

::: exempel "Example 2: The smallest slope of a function"
**For which value of $x$ does the function $f(x) = x^3 - 3x^2 - 4x$ have its
smallest slope?**

::: handskrift
typ: minstalutning
:::

::: textlosning
Remember that the slope of a graph is the same thing as the derivative of
the function. So we need to determine when the derivative $f'(x)$ is smallest.

We define $f(x) = x^3 - 3x^2 - 4x$ in GeoGebra and then find
$f'(x)$:

$$
f'(x) = 3x^2 - 6x - 4
$$

The derivative $f'(x)$ is itself a quadratic function whose graph is a
parabola that opens upwards, with a smallest value at its minimum point. We
study the graph of $f'(x)$ in GeoGebra and use the tool
*Extremum* to find the minimum point. It is at $x = 1$.

We see that $f'(x)$ has its lowest value when $x = 1$, that is it is there that
the function $f(x)$ has its smallest slope.

**Answer:** $x = 1$
:::
:::

## Setting up exponential models with base e

::: exempel "Example 3: The kitten's weight as an exponential model"
**A kitten weighs 100 grams and increases its weight by 5 % per day during
the first month. Set up an exponential function with base $e$ for
the kitten's weight $V$ in grams as a function of the time $t$ days.**

::: handskrift
typ: kattungemodell
:::

::: textlosning
We have an exponential relationship, which we can write in the form
$y = C \cdot a^x$, where $C$ is the initial value (100 grams) and $a$ is
the growth factor (1.05, since the weight increases by 5 % per day). This
gives

$$
V(t) = 100 \cdot 1.05^t
$$

We need to rewrite the exponential relationship with base $e$, that is in
the form $y = Ce^{kx}$. This gives

$$
V(t) = 100 \cdot e^{kt} \qquad (1)
$$

We now need to determine the coefficient $k$. We compare the two expressions for
$V(t)$:

$$
100 \cdot 1.05^t = 100 \cdot e^{kt}
$$

We then see that

$$
e^k = 1.05
$$

We solve the equation by taking the logarithm of both sides and solving for $k$.

$$
\begin{aligned}
\ln e^k &= \ln 1.05 \\
k \cdot \ln e &= \ln 1.05
\end{aligned}
$$

Since $\ln e = 1$ we get

$$
k = \ln 1.05 \approx 0.04879
$$

Substituting $k \approx 0.04879$ into (1) gives

$$
V(t) = 100 \cdot e^{0.04879t}
$$

**Answer:** $V(t) = 100 \cdot e^{0.04879t}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Commands in GeoGebra"
- Define the function on a line of its own: $f(x) = \ldots$
- $f(3)$ gives the function value, $f'(x)$ the derivative and $f'(3)$ the value of the derivative.
- NSolve(Equation) gives a numerical answer with decimals, Solve(Equation) an exact answer with symbols.
:::

::: sampunkt "Typical tasks"
- "How fast is it increasing after 4 weeks?" is $N'(4)$.
- "When is the rate 100 per week?" is solved with NSolve($N'(t) = 100$).
- Always answer with the correct unit and a reasonable rounding.
:::

::: sampunkt "Smallest slope"
- The slope of a graph is the derivative, so the smallest slope is the smallest value of the derivative.
- Find $f'(x)$, study its graph and use the tool *Extremum*.
- $f(x) = x^3 - 3x^2 - 4x$ gives $f'(x) = 3x^2 - 6x - 4$, with its smallest value at $x = 1$.
:::

::: sampunkt "A model with base e"
- $y = C \cdot a^x$ can be written $y = Ce^{kx}$, where $e^k = a$.
- Determine $k$ by taking the logarithm: $k = \ln a$.
- 100 grams increasing by 5 % per day gives $V(t) = 100 \cdot 1.05^t = 100 \cdot e^{0.04879t}$.
- Base $e$ makes the function easier to differentiate.
:::

:::
