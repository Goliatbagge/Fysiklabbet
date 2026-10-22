---
kalla: be0b8e60da
id: ma3c-5.4
title: The fundamental theorem of calculus
course: Matematik fortsättning nivå 1c
chapter: Integraler
chapterNumber: 5
section: '5.4'
---

# The fundamental theorem of calculus

We already know that graphically a definite integral corresponds to the area
between the graph of a function and the $x$-axis, and that the area can in principle
be determined by adding up infinitely many narrow rectangle areas. But how
do we calculate the integral in practice, without having to add up infinitely many
rectangles? The answer lies in the relationship between integrals and
antiderivatives.

So we can calculate the integral exactly with the help of antiderivatives!
This relationship is called the **fundamental theorem of calculus**.

The difference $F(b) - F(a)$ can be written with the new notation
$\big[F(x)\big]_a^b$.

::: formel "The fundamental theorem of calculus"
$$
\int_a^b f(x)\, dx = \Big[F(x)\Big]_a^b = F(b) - F(a)
$$

::: härledning "Derivation: the fundamental theorem of calculus"
Way of thinking: if we have a function $F(x)$ whose change we want to examine
from $x = a$ to $x = b$, this can be written as "final value" = "starting value"
+ "the sum of all changes in the $y$-direction", that is

$$
F(b) = F(a) + \int_a^b F'(x)\, dx
$$

Since $F'(x) = f(x)$, this can be written

$$
F(b) = F(a) + \int_a^b f(x)\, dx
$$

We solve for the integral and get the fundamental theorem of calculus.

$$
\int_a^b f(x)\, dx = F(b) - F(a)
$$
:::
:::

::: exempel "Example 1: Calculating integrals with antiderivatives"
**Calculate the integrals with antiderivatives.**

::: handskrift
typ: berknaintegraler
:::

::: textlosning
$$
\text{a)}\ \int_1^3 2x\, dx \qquad \text{b)}\ \int_1^5 (x^2 - 4)\, dx
$$

**a)** The antiderivative of $f(x) = 2x$ is $F(x) = x^2$. We put
the antiderivative in square brackets with the limits and get

$$
\int_1^3 2x\, dx = \Big[x^2\Big]_1^3
$$

We then substitute the upper limit $x = 3$ into the antiderivative,
and then subtract what we get when we substitute the lower limit
$x = 1$.

$$
\Big[x^2\Big]_1^3 = 3^2 - (1^2) = 9 - 1 = 8
$$

**Answer:** $8$

**b)** We solve part b in the same way as part a. It is especially
important, when the antiderivative has several terms, to put a
**bracket** around the whole expression before we substitute the lower limit,
otherwise the signs will be wrong.

$$
\int_1^5 (x^2 - 4)\, dx = \left[\frac{x^3}{3} - 4x\right]_1^5 = \frac{5^3}{3} - 4 \cdot 5 - \left(\frac{1^3}{3} - 4 \cdot 1\right)
$$

$$
= \frac{125}{3} - 20 - \left(\frac{1}{3} - 4\right) = \frac{125}{3} - \frac{60}{3} - \left(\frac{1}{3} - \frac{12}{3}\right) = \frac{65}{3} - \left(-\frac{11}{3}\right) = \frac{65}{3} + \frac{11}{3} = \frac{76}{3}
$$

**Answer:** $\dfrac{76}{3}$
:::
:::

::: härledning "Note: do not forget the bracket"
If the antiderivative has several terms, you **must** put a bracket
around the whole expression before you substitute the lower limit. Otherwise there is a
high risk that the minus sign only affects the first term instead of all
the terms in the expression, which gives the wrong answer. Compare Example 1b above:

$$
-\left(\frac{1}{3} - 4\right) = -\frac{1}{3} + 4 \qquad \text{but} \qquad -\frac{1}{3} - 4 \ \text{is wrong.}
$$
:::

::: sammanfattning "Summary"

::: sampunkt "The fundamental theorem"
- $\int_a^b f(x)\, dx = \Big[F(x)\Big]_a^b = F(b) - F(a)$.
- So the integral is calculated exactly with the help of an antiderivative, without adding up rectangles.
- The relationship is called the **fundamental theorem of calculus**.
:::

::: sampunkt "The notation"
- $\Big[F(x)\Big]_a^b$ means $F(b) - F(a)$.
- First the **upper** limit is substituted, then the lower one is subtracted.
- The constant $C$ is not needed, since it disappears in the subtraction.
:::

::: sampunkt "The idea behind it"
- Final value is starting value plus the sum of all changes: $F(b) = F(a) + \int_a^b F'(x)\, dx$.
- Since $F'(x) = f(x)$, the theorem follows directly when the integral is solved for.
:::

::: sampunkt "Do not forget the bracket"
- If the antiderivative has **several terms**, a bracket must be put around the whole expression at the lower limit.
- Otherwise the minus sign only affects the first term and the answer is wrong.
- $-\left(\dfrac{1}{3} - 4\right) = -\dfrac{1}{3} + 4$, not $-\dfrac{1}{3} - 4$.
:::

:::
