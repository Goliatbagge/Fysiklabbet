---
kalla: daed5eebf8
id: ma2c-5.2
title: Common logarithms
course: Matematik nivå 2c
chapter: Logaritmer
chapterNumber: 5
section: '5.2'
---

# Common logarithms

The number that 10 must be raised to ("the exponent of ten") to give a
certain value is called the **common logarithm** (the logarithm to base 10,
log₁₀), is written "lg" and is often read "the common logarithm of". Logarithms
can be seen as the inverse (reversed) operation to raising to a power, and
they are used to solve exponential equations algebraically.

We start with a few simple examples to understand the notation.

- lg 100 means "the number that 10 must be raised to in order to give 100".
  Since $10^2 = 100$, it follows that $\lg 100 = 2$.
- lg 1 means "the number that 10 must be raised to in order to give 1".
  Since $10^0 = 1$, we have $\lg 1 = 0$.
- lg 0.01 means "the number that 10 must be raised to in order to give 0.01".
  Since $10^{-2} = \dfrac{1}{10^2} = 0.01$, we have
  $\lg 0.01 = -2$.

Discover the pattern for common logarithms of whole powers of 10:

| | | |
| --- | --- | --- |
| lg 1 000 | $= \lg 10^3$ | $= 3$ |
| lg 100 | $= \lg 10^2$ | $= 2$ |
| lg 10 | $= \lg 10^1$ | $= 1$ |
| lg 1 | $= \lg 10^0$ | $= 0$ |
| lg 0.1 | $= \lg 10^{-1}$ | $= -1$ |
| lg 0.01 | $= \lg 10^{-2}$ | $= -2$ |
| lg 0.001 | $= \lg 10^{-3}$ | $= -3$ |

Common logarithms of numbers other than whole powers of 10 are harder to
determine by mental arithmetic, but if we understand logarithms we can still
make good estimates.

Say that we want to decide how large lg 42 is. That means what we must
raise 10 to for the value to become 42. We know that $10^1 = 10$ is
too small. We also know that $10^2 = 100$ is too large. So the
exponent must be somewhere between 1 and 2, that is, lg 42 lies between 1
and 2.

We can get a more exact value by entering the logarithm on our calculators
with the **log** button. Try entering lg 42 on your calculator. We get
$\lg 42 = 1.623\ldots \approx 1.62$.

As we predicted, the value ended up between 1 and 2, more precisely about
1.62. This means that $42 \approx 10^{1.62}$.

If we want an exact equality, we keep the logarithm in the exponent,
that is

$$
42 = 10^{\lg 42}
$$

::: formel "Common logarithm: definition"
$$
a = 10^x \iff x = \lg a \qquad \text{where } a > 0
$$
:::

::: formel "Writing a number with base 10"
$$
a = 10^{\lg a} \qquad \text{where } a > 0
$$
:::

The number we take the logarithm of must be greater than 0, because we can never
raise 10 to anything and get a negative value. The smaller the value of
the exponent of ten, the closer to 0 we get, but it never becomes 0
or negative: $10^{-3} = \dfrac{1}{1\,000} = 0.001$ and
$10^{-6} = \dfrac{1}{1\,000\,000} = 0.000\,001$ and so on.

::: exempel "Example 1: Determine without a calculator"
**Determine without a calculator<br>a)&nbsp;$\lg 10\,000$&emsp;&emsp;b)&nbsp;$\lg 10^{-5}$&emsp;&emsp;c)&nbsp;$\lg \sqrt{10}$**

::: handskrift
typ: logutanraknare
:::

::: textlosning
**a)** We think "What must we raise 10 to for it to become
10 000? Well, 4."

**Answer:** 4

**b)** We think "What must we raise 10 to for it to become
$10^{-5}$? Well, −5."

**Answer:** −5

**c)** We think "What must we raise 10 to for it to become
$\sqrt{10}$?" The answer to this question may not be as obvious.
Remember that taking the square root is the same as raising to the power of
one half, so $\sqrt{10} = 10^{1/2}$. So we must raise 10 to
$\dfrac{1}{2}$ for the answer to be $\sqrt{10}$.

**Answer:** $\dfrac{1}{2}$
:::
:::

::: exempel "Example 2: Write as a power with base 10"
**Write as a power with base 10.<br>a) 4&emsp;&emsp;b) 75**

::: handskrift
typ: potensbastio
:::

::: textlosning
**a)** The exponent we must raise 10 to for it to become 4 can be
written lg 4. So

$$
10^{\lg 4} = 4
$$

**Answer:** $10^{\lg 4}$

**b)** In the same way as in part a, $75 = 10^{\lg 75}$.

**Answer:** $10^{\lg 75}$
:::
:::

::: exempel "Example 3: Calculate without a calculator"
**Calculate without a calculator $10^{\lg 9} - \dfrac{3 \cdot 10^{\lg 3}}{\lg 10}$.**

::: handskrift
typ: forenklalogaritm
:::

::: textlosning
We simplify the different logarithms:

$$
10^{\lg 9} = 9
$$

$$
10^{\lg 3} = 3
$$

$$
\lg 10 = 1 \quad \text{(lg 10 means what we must raise 10 to for it to become 10, that is 1)}
$$

Substituting these simplified values gives

$$
10^{\lg 9} - \frac{3 \cdot 10^{\lg 3}}{\lg 10} = 9 - \frac{3 \cdot 3}{1} = 9 - 9 = 0
$$

**Answer:** 0
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Definition of the common logarithm"
- The **common logarithm** of a number is the exponent you must give the base 10 to get the number.
- $a = 10^x \iff x = \lg a$, and the requirement is $a > 0$.
- Negative numbers and zero have no logarithm, because a power of ten is always positive.
:::

::: sampunkt "The basic relationship"
- $a = 10^{\lg a}$ for all $a > 0$. So every positive number can be written as a power of ten.
- The relationship is the key to solving exponential equations.
:::

::: sampunkt "Known values"
- $\lg 1 = 0$, $\lg 10 = 1$, $\lg 100 = 2$, $\lg 1\,000 = 3$.
- $\lg 0.1 = -1$, $\lg 0.01 = -2$.
- Numbers between two powers of ten give a logarithm between the corresponding integers: $\lg 42$ lies between 1 and 2 because 42 lies between 10 and 100.
:::

::: sampunkt "The calculator"
- The **log** button gives the common logarithm.
- Use the estimate above as a check that the calculator's answer is reasonable.
:::

:::
