---
kalla: 523c28d732
id: ma3c-3.6
title: Applications of the derivative
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.6'
---

# Applications of the derivative

In the section Using the derivative we established how the derivative is interpreted: a positive
derivative corresponds to an **increase** and a negative derivative to a
**decrease**, and the unit of the derivative is obtained as "the unit of the function being
differentiated" per "the unit of the variable". In this section we build
on that with two new applications: determining an unknown constant in a
model using the derivative, and determining the equation of the tangent
to a curve at a given point.

::: exempel "Example 1: The growth rate of a population"
**The population $N(t)$ of a municipality is estimated to decrease according to
$N(t) = 42\,000 \cdot 0.98^t$, where $t$ is the time in years from 1 January 2020.
Calculate the growth rate on 1 January 2025.**

::: handskrift
typ: tillvaxtfolk
:::

::: textlosning
The growth rate of the population at an instant corresponds to the derivative of
the population. The time from 1 January 2020 to 1 January 2025 is 5 years, that is
$t = 5$. So it is $N'(5)$ we are looking for. We differentiate first and then substitute
5 into the derivative.

$$
N(t) = 42\,000 \cdot 0.98^t
$$

$$
N'(t) = 42\,000 \cdot 0.98^t \cdot \ln 0.98
$$

$$
N'(5) = 42\,000 \cdot 0.98^5 \cdot \ln 0.98 \approx -766.989\ldots \approx -770
$$

We interpret the negative value of the derivative as a **decrease**.
The unit of the derivative is "the unit of $N(t)$" per "the unit of $t$", that is
inhabitants/year.

**Answer:** On 1 January 2025 the population is decreasing by about 770 inhabitants/year.
:::
:::

## Determining a constant using the derivative

Sometimes not all the constants in a model are known from the start. If we know
the value of the function or the derivative at a particular instant, we can use
that information to determine an unknown constant, often using
logarithms, just as with exponential equations in Mathematics level 2c.

::: exempel "Example 2: Determining a constant using the derivative"
**The temperature $y$ °C of a dish that has been placed in an oven is given by
$y = e^{kx} - 19$, where $x$ is the number of minutes in the oven and $k$ a
constant.<br>
a) After 20 minutes the food is at 70 °C. Determine the constant $k$.<br>b)
Determine and interpret $y'(15)$.**

::: handskrift
typ: bestamkonstant
:::

::: textlosning
**a)** That the food is at 70 °C after 20 minutes means that when $x = 20$,
$y = 70$. Substituting $x = 20$ and $y = 70$ into the function
$y = e^{kx} - 19$ gives

$$
70 = e^{k \cdot 20} - 19
$$

$$
70 = e^{20k} - 19
$$

We isolate the exponential term by adding 19 to both sides.

$$
70 + 19 = e^{20k} - 19 + 19
$$

$$
89 = e^{20k} \quad \Longleftrightarrow \quad e^{20k} = 89
$$

We now need to solve for $k$, which is in the exponent. In Mathematics level 2c we learnt to
solve exponential equations by taking the logarithm of both sides, so that we can
multiply the exponent down. In this case, when we have $e$ as the base,
it is easiest to take the natural logarithm $\ln$ (remember that
$\ln e = 1$, in the same way as $\lg 10 = 1$). We take the logarithm of both sides
to multiply the exponent down.

$$
\ln e^{20k} = \ln 89
$$

$$
20k \cdot \ln e = \ln 89
$$

Since $\ln e = 1$ we get

$$
20k = \ln 89
$$

We solve for the constant $k$.

$$
\frac{20k}{20} = \frac{\ln 89}{20}
$$

$$
k = \frac{\ln 89}{20} = 0.22443\ldots
$$

Since it is a model, we can round and set $k \approx 0.2244$
(keep at least 4 decimal places, since large roundings in exponents can lead
to large errors).

**Answer:** $k \approx 0.2244$

**b)** We need to determine and interpret $y'(15)$. Since we have found
$k \approx 0.2244$, we can substitute it into the original function
$y = e^{kx} - 19$ and then get

$$
y = e^{0.2244x} - 19
$$

We differentiate and then substitute $x = 15$. Remember that the constant $-19$
disappears when we differentiate.

$$
y' = 0.2244e^{0.2244x}
$$

$$
y'(15) = 0.2244e^{0.2244 \cdot 15} \approx 6.499\ldots \approx 6.5
$$

We interpret the positive value of the derivative as an **increase**. The unit
of the derivative is "the unit of $y$" per "the unit of $x$", that is
°C/minute.

**Answer:** After 15 minutes the temperature of the dish is increasing by 6.5
°C/minute.
:::
:::

## The equation of the tangent

A tangent is a straight line and can therefore be described with the equation of a straight
line $y = kx + m$. Since the derivative at a point is the same as
the slope of the curve (and the tangent) there, we can determine the gradient
$k$ by differentiating. The constant $m$ is then determined by substituting
the coordinates of the point of tangency into the equation of the straight line.

::: formel "The equation of the tangent"
The tangent to the curve $y = f(x)$ at the point where $x = a$ has the equation

$$
y = kx + m
$$

where the gradient is given by the derivative at the point,

$$
k = f'(a)
$$

The constant $m$ is determined by substituting the coordinates of the point of tangency
$(a, f(a))$ into the equation of the straight line.
:::

::: exempel "Example 3: The equation of the tangent"
**Determine the equation of the tangent at the point where $x = 3$ on the curve
$y = x^2 + 4x - 7$.**

::: figur
<svg viewBox="4 -4 214 266" width="313" height="389" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="The graph of y equals x squared plus 4x minus 7 with the tangent at the point 3, 14. The equation of the tangent is y equals 10x minus 16."><line x1="14" y1="180" x2="186" y2="180" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,180 184,175.5 184,184.5" fill="#1f2530"/><line x1="100" y1="254" x2="100" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="100,4 95.5,14 104.5,14" fill="#1f2530"/><text x="192" y="198" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="109" y="14" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 28,222 Q 100,318 172,30" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="114.4" y1="228" x2="172" y2="36" stroke="#4a7d3a" stroke-width="2"/><line x1="154" y1="180" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><line x1="100" y1="96" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><circle cx="154" cy="96" r="3.5" fill="#c8324a"/><text x="163" y="99" font-size="12" text-anchor="start" fill="#c8324a">(3, 14)</text><text x="208" y="16" font-size="12" text-anchor="end" fill="#4a7d3a"><tspan font-style="italic">y</tspan> = 10<tspan font-style="italic">x</tspan> − 16</text></svg>
:::

::: handskrift
typ: tangentekv
:::

::: textlosning
A tangent is a straight line and can be described with the equation of a straight line
$y = kx + m$. We need to determine $k$ and $m$.

The $k$-value represents the slope of the tangent, which is the same thing as the derivative at
the point where $x = 3$, that is $k = y'(3)$.

We determine $y'(3)$ by first differentiating and then substituting $x = 3$.

$$
y = x^2 + 4x - 7
$$

$$
y' = 2x + 4
$$

$$
k = y'(3) = 2 \cdot 3 + 4 = 6 + 4 = 10
$$

Substituting $k = 10$ into the equation of the straight line $y = kx + m$ gives

$$
y = 10x + m
$$

Finally we determine $m$ by substituting a point that the tangent passes
through. We know that the tangent meets the curve $y = x^2 + 4x - 7$ where $x = 3$.
We substitute $x = 3$ to get the $y$-coordinate of the point.

$$
y = 3^2 + 4 \cdot 3 - 7 = 9 + 12 - 7 = 14
$$

So the tangent passes through the point $(3, 14)$. Substituting $x = 3$ and
$y = 14$ into the equation of the tangent $y = 10x + m$ gives

$$
14 = 10 \cdot 3 + m
$$

$$
14 = 30 + m
$$

We solve for $m$.

$$
14 - 30 = 30 + m - 30
$$

$$
-16 = m \quad \Longleftrightarrow \quad m = -16
$$

Substituting $k = 10$ and $m = -16$ into the equation of the straight line $y = kx + m$
gives the equation of the tangent

$$
y = 10x - 16
$$

**Answer:** $y = 10x - 16$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Interpreting the derivative"
- A positive derivative means an **increase**, a negative derivative means a **decrease**.
- The unit is the unit of the function per the unit of the variable, for example inhabitants per year.
- $N(t) = 42\,000 \cdot 0.98^t$ gives $N'(5) \approx -770$, that is a decrease of about 770 inhabitants per year.
:::

::: sampunkt "Determining an unknown constant"
1. Substitute the known pair of values into the model.
2. Isolate the exponential term.
3. Take the logarithm with $\ln$ and use the fact that $\ln e = 1$.
- From $89 = e^{20k}$ it follows that $k = \dfrac{\ln 89}{20} \approx 0.2244$.
- Keep at least four decimal places in a constant that is in an exponent.
:::

::: sampunkt "The equation of the tangent"
- The tangent is a straight line, $y = kx + m$.
- The gradient is given by the derivative at the point: $k = f'(a)$.
- $m$ is obtained by substituting the point of tangency $(a,\ f(a))$ into $y = kx + m$.
:::

::: sampunkt "Method for the tangent"
1. Differentiate and calculate $k = f'(a)$.
2. Calculate the $y$-coordinate of the point, $f(a)$.
3. Substitute the point and solve for $m$.
- For $y = x^2 + 4x - 7$ at $x = 3$: $k = 10$, the point $(3, 14)$ and $m = -16$, so $y = 10x - 16$.
:::

:::
