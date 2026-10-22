---
kalla: 1697110262
id: ma2c-5.4
title: The laws of logarithms
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.4'
---

# The laws of logarithms

The rules of calculation for logarithms are called **the laws of logarithms**.
Here lg is the common logarithm, that is, the logarithm to base 10 (log₁₀).

::: formel "The laws of logarithms"
First law of logarithms:

$$
\lg x + \lg y = \lg xy
$$

Second law of logarithms:

$$
\lg x - \lg y = \lg \frac{x}{y}
$$

Third law of logarithms:

$$
\lg x^p = p \cdot \lg x
$$

where $x > 0$ and $y > 0$.

::: härledning "Proof: First law of logarithms"
We write the multiplication $x \cdot y$ in two ways.

Way 1:

$$
x \cdot y = 10^{\lg x} \cdot 10^{\lg y} = 10^{\lg x + \lg y}
$$

Way 2:

$$
x \cdot y = 10^{\lg(x \cdot y)}
$$

Since these represent the same thing, they must be equal, so

$$
10^{\lg x + \lg y} = 10^{\lg(x \cdot y)}
$$

Since we have an equality with the same base, the exponents must be equal,
so

$$
\lg x + \lg y = \lg xy
$$

QED
:::

::: härledning "Proof: Second law of logarithms"
We write the division $\dfrac{x}{y}$ in two ways.

Way 1:

$$
\frac{x}{y} = \frac{10^{\lg x}}{10^{\lg y}} = 10^{\lg x - \lg y}
$$

Way 2:

$$
\frac{x}{y} = 10^{\lg \frac{x}{y}}
$$

Since these represent the same thing, they must be equal, and since we
have an equality with the same base, the exponents must be equal, so

$$
\lg x - \lg y = \lg \frac{x}{y}
$$

QED
:::

::: härledning "Proof: Third law of logarithms"
We write $x^p$ in two different ways.

Way 1:

$$
x^p = \left(10^{\lg x}\right)^p = 10^{p \cdot \lg x}
$$

Way 2:

$$
x^p = 10^{\lg x^p}
$$

Since these represent the same thing, they must be equal, and since we
have an equality with the same base, the exponents must be equal, so

$$
p \cdot \lg x = \lg x^p
$$

QED
:::
:::

With the third law of logarithms we can solve exponential equations in
yet another way.

::: tips "Solving exponential equations with the third law of logarithms"
1. Take the logarithm of both sides of the equation (put lg in front of both expressions).
2. Bring the exponent down as a factor, according to the third law of logarithms, and then
   solve as usual.
:::

We can now also come across logarithmic equations with several logarithmic terms.

::: tips "Solving logarithmic equations with several logarithmic terms"
Rewrite both sides as a single logarithm using the laws of logarithms.
The logarithm can then be removed and we solve the equation as
usual.
:::

::: exempel "Example 1: Calculate without a calculator"
**Calculate without a calculator<br>a)&nbsp;$\lg 25 + \lg 4$&emsp;&emsp;b)&nbsp;$\lg 3\,000 - \lg 3$**

::: handskrift
typ: logaritmlagar
:::

::: textlosning
**a)** We use the first law of logarithms and get

$$
\lg 25 + \lg 4 = \lg(25 \cdot 4) = \lg 100 = 2
$$

**Answer:** 2

**b)** We use the second law of logarithms and get

$$
\lg 3\,000 - \lg 3 = \lg \frac{3\,000}{3} = \lg 1\,000 = 3
$$

**Answer:** 3
:::
:::

::: exempel "Example 2: Solve with the third law of logarithms"
**Solve the equations with the third law of logarithms.<br>a)&nbsp;$5^x = 136$&emsp;&emsp;b)&nbsp;$4 \cdot 5^x = 3 \cdot 2^x$**

::: handskrift
typ: tredjelogaritmlagen
:::

::: textlosning
**a)** We take the logarithm of both sides:

$$
\lg 5^x = \lg 136
$$

We bring the exponent down as a factor and then solve the equation as usual:

$$
x \cdot \lg 5 = \lg 136
$$

$$
x = \frac{\lg 136}{\lg 5} \approx 3.05
$$

**Answer:** $x = \dfrac{\lg 136}{\lg 5} \approx 3.05$

**b)** We collect the factors with exponents on the same side so that we can
then rewrite them with a single exponent. After that we take the logarithm
and solve with the third law of logarithms.

$$
\frac{5^x}{2^x} = \frac{3}{4}
$$

$$
\left(\frac{5}{2}\right)^x = \frac{3}{4}
$$

We take the logarithm of both sides:

$$
\lg \left(\frac{5}{2}\right)^x = \lg \left(\frac{3}{4}\right)
$$

$$
x \cdot \lg \left(\frac{5}{2}\right) = \lg \left(\frac{3}{4}\right)
$$

$$
x = \frac{\lg \left(\frac{3}{4}\right)}{\lg \left(\frac{5}{2}\right)} \approx -0.31
$$

**Answer:** $x = \dfrac{\lg \left(\frac{3}{4}\right)}{\lg \left(\frac{5}{2}\right)} \approx -0.31$
:::
:::

::: exempel "Example 3: Several logarithmic terms"
**Solve the equation $2 \lg 5 + \lg 4 = \lg 2x$.**

::: handskrift
typ: fleralogtermer
:::

::: textlosning
We start by rewriting the first term on the left-hand side with the third
law of logarithms:

$$
\lg 5^2 + \lg 4 = \lg 2x
$$

$$
\lg 25 + \lg 4 = \lg 2x
$$

We then rewrite the whole left-hand side with the first law of logarithms:

$$
\lg(25 \cdot 4) = \lg 2x
$$

$$
\lg 100 = \lg 2x
$$

We now have a single logarithm on both sides and can remove the
logarithm from both sides and then solve the equation as
usual:

$$
100 = 2x
$$

$$
x = 50
$$

**Answer:** $x = 50$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The laws of logarithms"
- First: $\lg x + \lg y = \lg xy$.
- Second: $\lg x - \lg y = \lg \dfrac{x}{y}$.
- Third: $\lg x^p = p \cdot \lg x$.
- The laws apply for $x > 0$ and $y > 0$.
:::

::: sampunkt "Why they hold"
- Write the same expression in two ways, with $a = 10^{\lg a}$ and the laws of exponents.
- Example: $x \cdot y = 10^{\lg x} \cdot 10^{\lg y} = 10^{\lg x + \lg y}$ and at the same time $x \cdot y = 10^{\lg xy}$.
- The same base in both expressions means that the exponents must be equal.
:::

::: sampunkt "Exponential equation, a faster way"
1. Take the logarithm of both sides, that is, put lg in front of both expressions.
2. Bring the exponent down as a factor with the third law and solve as usual.
- $5^x = 136$ gives $x \cdot \lg 5 = \lg 136$, so $x = \dfrac{\lg 136}{\lg 5} \approx 3.05$.
- If there are powers on both sides: collect them on the same side, $\dfrac{5^x}{2^x} = \left(\dfrac{5}{2}\right)^x$.
:::

::: sampunkt "Several logarithmic terms"
- Rewrite both sides as **a single** logarithm with the laws.
- Then lg can be removed from both sides and the equation solved as usual.
- $2 \lg 5 + \lg 4 = \lg 2x$ gives $\lg 100 = \lg 2x$, so $x = 50$.
:::

::: sampunkt "Calculating without a calculator"
- Combine the terms so that a whole power of ten appears.
- $\lg 25 + \lg 4 = \lg 100 = 2$ and $\lg 3\,000 - \lg 3 = \lg 1\,000 = 3$.
:::

:::
