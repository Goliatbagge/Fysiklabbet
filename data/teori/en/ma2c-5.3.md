---
kalla: 0469f8f885
id: ma2c-5.3
title: Exponential equations and common logarithms
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.3'
---

# Exponential equations and common logarithms

Remember: a number can be written with base 10 according to

$$
a = 10^{\lg a} \qquad \text{where } a > 0
$$

To solve exponential equations using common logarithms (lg, that is log₁₀) we use
the principle that if two powers with the same base are equal, then
their exponents must also be equal. For example, if $2^x = 2^7$, then
$x = 7$.

::: tips "Solving exponential equations with common logarithms"
1. Rewrite both sides with base 10 according to the principle $a = 10^{\lg a}$.
2. Simplify with the laws of exponents.
3. Set the exponents equal and solve the equation.
:::

An equation where the variable is inside the logarithm, for example $\lg x = 3$, is called a
**logarithmic equation**. These are most easily solved by rewriting
the equation from logarithmic form to power form and then solving the equation
with earlier methods.

::: tips "Solving logarithmic equations"
$$
\lg x = a \ \text{(logarithmic form)} \iff 10^a = x \ \text{(power form)}
$$

Rewriting from logarithmic form to power form in words: "10 raised
to what is on the right-hand side is equal to what we take the logarithm
of."
:::

::: exempel "Example 1: Solve the equations"
**Solve the equations below. Give the answer exactly and to two decimal places.<br>a)&nbsp;$10^x = 53$&emsp;&emsp;b)&nbsp;$2^x = 37$&emsp;&emsp;c)&nbsp;$5 \cdot 3^{2x} - 4 = 31$**

::: handskrift
typ: expekvationer
:::

::: textlosning
**a)** We rewrite the right-hand side with base 10 and then set the exponents
equal:

$$
10^x = 10^{\lg 53}
$$

$$
x = \lg 53 \approx 1.72
$$

(If you can see directly from the equation $10^x = 53$ that $x = \lg 53$,
from the definition, it is fine to write it directly, without
intermediate steps.)

**Answer:** $x = \lg 53 \approx 1.72$

**b)** We rewrite both sides with base 10 and simplify with the
laws of exponents:

$$
\left(10^{\lg 2}\right)^x = 10^{\lg 37}
$$

$$
10^{x \cdot \lg 2} = 10^{\lg 37}
$$

We can now set the exponents equal and get

$$
x \cdot \lg 2 = \lg 37
$$

Dividing both sides by lg 2 gives

$$
x = \frac{\lg 37}{\lg 2} \approx 5.21
$$

**Answer:** $x = \dfrac{\lg 37}{\lg 2} \approx 5.21$

**c)** We start by isolating the power $3^{2x}$. We add 4 to
both sides and then divide by 5:

$$
5 \cdot 3^{2x} = 35
$$

$$
3^{2x} = 7
$$

We rewrite both sides with base 10 and simplify with the laws of exponents:

$$
\left(10^{\lg 3}\right)^{2x} = 10^{\lg 7}
$$

$$
10^{2x \cdot \lg 3} = 10^{\lg 7}
$$

We set the exponents equal and solve the equation:

$$
2x \cdot \lg 3 = \lg 7
$$

$$
x = \frac{\lg 7}{2 \cdot \lg 3} \approx 0.89
$$

**Answer:** $x = \dfrac{\lg 7}{2 \cdot \lg 3} \approx 0.89$
:::
:::

::: exempel "Example 2: Solve the logarithmic equations"
**Solve<br>a)&nbsp;$\lg x = 3$&emsp;&emsp;b)&nbsp;$\lg 5x = 2.7$**

::: handskrift
typ: logekvationer
:::

::: textlosning
**a)** We rewrite the equation in power form. "10 raised to what
is on the right-hand side must become what we take the logarithm of."

$$
10^3 = x
$$

$$
x = 1\,000
$$

(If you can see directly from the equation that $x = 1\,000$ because
$\lg 1\,000 = 3$, it is fine to write it directly, without intermediate steps.)

**Answer:** $x = 1\,000$

**b)** We rewrite the equation in power form:

$$
10^{2.7} = 5x
$$

Dividing both sides by 5 gives

$$
x = \frac{10^{2.7}}{5} \approx 100.24
$$

**Answer:** $x \approx 100.24$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The basic principle"
- Every positive number can be written with base 10: $a = 10^{\lg a}$.
- If two powers with the **same base** are equal, the exponents are equal. From $2^x = 2^7$ it follows that $x = 7$.
:::

::: sampunkt "Solving an exponential equation"
1. Rewrite both sides with base 10 according to $a = 10^{\lg a}$.
2. Simplify with the laws of exponents, in particular $\left(10^{\lg a}\right)^x = 10^{x \cdot \lg a}$.
3. Set the exponents equal and solve the equation.
- From $10^x = 53$ it follows directly that $x = \lg 53 \approx 1.72$.
:::

::: sampunkt "Typical examples"
- $2^x = 37$ gives $x \cdot \lg 2 = \lg 37$, so $x = \dfrac{\lg 37}{\lg 2} \approx 5.21$.
- Always isolate the power first: $5 \cdot 3^{2x} - 4 = 31$ gives $3^{2x} = 7$ and $x = \dfrac{\lg 7}{2 \cdot \lg 3} \approx 0.89$.
:::

::: sampunkt "Logarithmic equation"
- **Logarithmic equation:** the variable is inside the logarithm, for example $\lg x = 3$.
- Rewrite from logarithmic form to power form: $\lg x = a \iff x = 10^a$.
- In words: 10 raised to the right-hand side is equal to what we take the logarithm of.
- $\lg 5x = 2.7$ gives $10^{2.7} = 5x$, so $x \approx 100.24$.
:::

:::
