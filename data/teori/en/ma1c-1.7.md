---
kalla: 128ef2b824
id: ma1c-1.7
title: Negative exponents and the exponent zero
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.7'
---

# Negative exponents and the exponent zero

## The exponent zero

$7^3$ means that 7 is to be multiplied by itself 3 times, that is,
$7^3 = 7 \cdot 7 \cdot 7$. But how should we interpret the exponent zero, for example
$7^0$?

::: formel "The exponent zero"
$$
a^0 = 1, \quad \text{where } a \neq 0
$$

::: härledning "Investigation: Interpreting the exponent zero"
To investigate this, we study, for example, the quotient $\dfrac{7^5}{7^5}$ and
calculate it in two ways.

**With the laws of exponents:**

$$
\frac{7^5}{7^5} = 7^{5-5} = 7^0
$$

**Equal numbers are divided:**

$$
\frac{7^5}{7^5} = 1
$$

Both ways are correct. So we see that $7^0 = 1$. This holds for all
real numbers. The only exception is 0, since that would correspond to a division
by 0. For example: $0^0 = \dfrac{0^5}{0^5} = \dfrac{0}{0}$, which is not
defined.
:::
:::

**Warning!** The value of a number raised to the power of 0 is not 0. The value is 1. So an
exponent of zero does not mean that the power becomes zero, and this is one
of the most common misconceptions.

::: exempel "Example 1: The exponent zero"
**Calculate<br>a)&nbsp;$25^0$&emsp;&emsp;b)&nbsp;$4^0 + (-7)^0$**

::: handskrift
typ: exponentnoll
:::

::: textlosning
**a)** Every number (except 0) raised to the power of 0 is 1:

$$
25^0 = 1
$$

**Answer:** 1

**b)** Both terms are powers with the exponent 0:

$$
4^0 + (-7)^0 = 1 + 1 = 2
$$

**Answer:** 2
:::
:::

## Negative exponents

How should we interpret negative exponents, for example $2^{-3}$? Let us investigate!

::: formel "Negative exponents"
$$
a^{-n} = \frac{1}{a^n}, \quad \text{where } a \neq 0
$$

::: härledning "Investigation: Interpreting negative exponents"
In the same way as for the exponent zero, we investigate the interpretation of
negative exponents by calculating, for example, the quotient $\dfrac{2^2}{2^5}$ in two different
ways.

**With the laws of exponents:**

$$
\frac{2^2}{2^5} = 2^{2-5} = 2^{-3}
$$

**By simplifying the fraction:**

$$
\frac{2^2}{2^5} = \frac{2 \cdot 2}{2 \cdot 2 \cdot 2 \cdot 2 \cdot 2}
= \frac{1}{2 \cdot 2 \cdot 2} = \frac{1}{2^3}
$$

Both ways are correct. So we see that $2^{-3} = \dfrac{1}{2^3}$. We can
repeat the same reasoning and show that, for example, $3^{-7} = \dfrac{1}{3^7}$ and
$5^{-4} = \dfrac{1}{5^4}$. Conclusion: a number raised to a negative number can
be written as "1 divided by the same number, but without the minus sign in front of
the exponent".
:::
:::

::: exempel "Example 2: Negative exponents"
**Calculate without a calculator<br>a)&nbsp;$4^{-2}$&emsp;&emsp;b)&nbsp;$5^{-1}$**

::: handskrift
typ: negexponent
:::

::: textlosning
**a)** A negative exponent means "1 divided by the power without the minus sign":

$$
4^{-2} = \frac{1}{4^2} = \frac{1}{16}
$$

**Answer:** $\dfrac{1}{16}$

**b)** In the same way:

$$
5^{-1} = \frac{1}{5^1} = \frac{1}{5}
$$

**Answer:** $\dfrac{1}{5}$
:::
:::

::: exempel "Example 3: Write in power form"
**Write $\dfrac{1}{3^5}$ in power form.**

::: handskrift
typ: potensform
:::

::: textlosning
We are to write $\dfrac{1}{3^5}$ as *one* power. Since
$3^{-5} = \dfrac{1}{3^5}$, the reverse must of course also hold. So

$$
\frac{1}{3^5} = 3^{-5}
$$

**Answer:** $3^{-5}$
:::
:::

::: exempel "Example 4: Move the denominator up"
**Write $\dfrac{5}{x}$ as a power with base $x$.**

::: handskrift
typ: flyttaupp
:::

::: textlosning
An alternative way of thinking when we rewrite fractions as powers is
to "move up" the denominator to the numerator. At the same time as we do that, we
change the sign of the exponent, so

$$
\frac{5}{x} = \frac{5}{x^1} = 5x^{-1}
$$

**Answer:** $5x^{-1}$
:::
:::

## Raising fractions to the power of −1

::: formel "Raising fractions to the power of −1"
Raising a fraction to the power of (−1) is the same as **inverting** the fraction.

::: härledning "Proof: Raising a fraction to the power of (−1) is the same as the inverse of the fraction"
We study the fraction $\left(\dfrac{a}{b}\right)^{-1}$. According to the rules for
negative exponents and division of fractions,

$$
\left(\frac{a}{b}\right)^{-1}
= \dfrac{1}{\left(\dfrac{a}{b}\right)^{1}}
= \dfrac{1}{\;\dfrac{a}{b}\;}
= 1 \cdot \frac{b}{a}
= \frac{b}{a}
$$

that is, $\left(\dfrac{a}{b}\right)^{-1} = \dfrac{b}{a}$, Q.E.D.
:::
:::

::: exempel "Example 5: Fractions with negative exponents"
**Calculate<br>a)&nbsp;$\left(\dfrac{3}{4}\right)^{-1}$&emsp;&emsp;b)&nbsp;$\left(\dfrac{4}{5}\right)^{-2}$**

::: handskrift
typ: brakinvers
:::

::: textlosning
**a)** Raising to the power of −1 is the same as inverting the fraction:

$$
\left(\frac{3}{4}\right)^{-1} = \frac{4}{3}
$$

**Answer:** $\dfrac{4}{3}$

**b)** Invert the fraction and change the sign of the exponent. Then it is an
ordinary power:

$$
\left(\frac{4}{5}\right)^{-2} = \left(\frac{5}{4}\right)^{2}
= \frac{5^2}{4^2} = \frac{25}{16}
$$

**Answer:** $\dfrac{25}{16}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The exponent zero"
- $a^0 = 1$ for all $a \neq 0$.
- **Not 0.** This is one of the most common misconceptions.
- Why: $\dfrac{7^5}{7^5}$ is both $7^0$ and 1.
:::

::: sampunkt "Negative exponents"
- $a^{-n} = \dfrac{1}{a^n}$ for $a \neq 0$.
- Why: $\dfrac{2^2}{2^5}$ is both $2^{-3}$ and
  $\dfrac{1}{2^3}$.
- So a negative sign in the exponent does **not** mean that the number becomes
  negative.
:::

::: sampunkt "Moving between numerator and denominator"
- A factor that changes floor in the fraction **changes the sign of the exponent**.
- $\dfrac{1}{3^5} = 3^{-5}$ and
  $\dfrac{5}{x} = 5x^{-1}$.
:::

::: sampunkt "A fraction raised to minus one"
- $\left(\dfrac{a}{b}\right)^{-1} = \dfrac{b}{a}$, that is, **invert**
  the fraction.
- $\left(\dfrac{4}{5}\right)^{-2}
  = \left(\dfrac{5}{4}\right)^{2} = \dfrac{25}{16}$.
:::
:::
