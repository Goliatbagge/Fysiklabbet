---
kalla: ae9439b834
id: ma1c-1.8
title: Rational exponents
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.8'
---

# Rational exponents

An exponent that contains a fraction is called a **rational exponent**. How should
we interpret rational exponents, for example $25^{1/2}$?

::: formel "Rational exponents"
$$
a^{1/n} = \sqrt[n]{a}
$$

::: härledning "Investigation: Interpreting rational exponents"
We form, for example, the number 25 in two ways.

**With the laws of exponents:**

$$
\left(25^{1/2}\right)^2 = 25^{(1/2) \cdot 2} = 25^{2/2} = 25^1 = 25
$$

**With roots:**

$$
\left(\sqrt{25}\right)^2 = 5^2 = 25
$$

Both ways are correct. So we see that $25^{1/2} = \sqrt{25}$.

In the same way,

$$
\left(27^{1/3}\right)^3 = 27^{3/3} = 27^1 = 27
$$

$$
\left(\sqrt[3]{27}\right)^3 = 3^3 = 3 \cdot 3 \cdot 3 = 27
$$

that is, $27^{1/3} = \sqrt[3]{27}$.
:::
:::

::: exempel "Example 1: Calculate without a calculator"
**Calculate without a calculator<br>a)&nbsp;$49^{1/2}$&emsp;&emsp;b)&nbsp;$5 \cdot 8^{1/3}$&emsp;&emsp;c)&nbsp;$27^{2/3}$**

::: handskrift
typ: rotberakna
:::

::: textlosning
**a)** The exponent $\dfrac{1}{2}$ means the square root:

$$
49^{1/2} = \sqrt{49} = 7
$$

**Answer:** 7

**b)** The exponent $\dfrac{1}{3}$ means the third root (cube root):

$$
5 \cdot 8^{1/3} = 5 \cdot \sqrt[3]{8} = 5 \cdot 2 = 10
$$

**Answer:** 10

**c)** We split the exponent using the law of exponents "power of a power":

$$
27^{2/3} = \left(27^{1/3}\right)^2 = \left(\sqrt[3]{27}\right)^2 = 3^2 = 9
$$

**Answer:** 9
:::
:::

::: exempel "Example 2: Simplify with the laws of exponents"
**Simplify $\dfrac{x^{\frac{7}{2}}}{x^3}$.**

::: handskrift
typ: rotforenkla
:::

::: textlosning
We use the law of exponents for division and calculate with the exponents as with
ordinary fractions:

$$
\frac{x^{\frac{7}{2}}}{x^3} = x^{\frac{7}{2} - 3}
= x^{\frac{7}{2} - \frac{6}{2}} = x^{\frac{1}{2}} = \sqrt{x}
$$

**Answer:** $\sqrt{x}$
:::
:::

## The root of a product and the root of a quotient

If there is a product under the root sign, we can take the root of each factor
separately and then multiply. In the same way, the root of a quotient can be split into
the root of the numerator divided by the root of the denominator.

::: formel "The root of a product and the root of a quotient"
$$
\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}
\qquad\qquad
\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}
$$

The rules apply when $a \geq 0$ and $b \geq 0$ (for the quotient $b > 0$). They
also apply in reverse: $\sqrt{2} \cdot \sqrt{8} = \sqrt{2 \cdot 8}$.

::: härledning "Derivation: Using the laws of exponents"
The square root is the same as the exponent $\dfrac{1}{2}$. The law of exponents
$(a \cdot b)^n = a^n \cdot b^n$ then gives

$$
\sqrt{a \cdot b} = (a \cdot b)^{1/2} = a^{1/2} \cdot b^{1/2} = \sqrt{a} \cdot \sqrt{b}
$$

and the law of exponents $\left(\dfrac{a}{b}\right)^n = \dfrac{a^n}{b^n}$ gives in the same way

$$
\sqrt{\dfrac{a}{b}} = \left(\dfrac{a}{b}\right)^{1/2} = \dfrac{a^{1/2}}{b^{1/2}} = \dfrac{\sqrt{a}}{\sqrt{b}}
$$
:::
:::

::: härledning "Note: Does not apply to addition and subtraction"
The rule applies **only** to a product or a quotient under the root sign. With
addition and subtraction we must not take the root of the terms separately:

$$
\sqrt{9 + 16} = \sqrt{25} = 5 \qquad \text{but} \qquad \sqrt{9} + \sqrt{16} = 3 + 4 = 7
$$

$$
\sqrt{25 - 16} = \sqrt{9} = 3 \qquad \text{but} \qquad \sqrt{25} - \sqrt{16} = 5 - 4 = 1
$$

So $\sqrt{9 + 16} \neq \sqrt{9} + \sqrt{16}$. First work out the sum
or difference under the root sign, and only then take the root.
:::

::: exempel "Example 3: The root of a product and a quotient"
**Calculate without a calculator<br>a)&nbsp;$\sqrt{4 \cdot 49}$&emsp;&emsp;b)&nbsp;$\sqrt{\dfrac{9}{25}}$&emsp;&emsp;c)&nbsp;$\sqrt{2} \cdot \sqrt{8}$**

::: handskrift
typ: rotprodukt
:::

::: textlosning
**a)** The root of a product is the root of each factor separately:

$$
\sqrt{4 \cdot 49} = \sqrt{4} \cdot \sqrt{49} = 2 \cdot 7 = 14
$$

**Answer:** 14

**b)** The root of a quotient is the root of the numerator divided by the root of the denominator:

$$
\sqrt{\dfrac{9}{25}} = \dfrac{\sqrt{9}}{\sqrt{25}} = \dfrac{3}{5}
$$

**Answer:** $\dfrac{3}{5}$

**c)** Neither 2 nor 8 has a whole-number square root. The rule also applies
in reverse, so we gather everything under one root sign:

$$
\sqrt{2} \cdot \sqrt{8} = \sqrt{2 \cdot 8} = \sqrt{16} = 4
$$

**Answer:** 4
:::
:::

## Taking a factor out and bringing a factor in

The rule for the root of a product lets us simplify a root. We split
the number under the root sign into a square (4, 9, 16, 25 …) times another
number, and then take the root of the square separately:

$$
\sqrt{45} = \sqrt{9 \cdot 5} = \sqrt{9} \cdot \sqrt{5} = 3\sqrt{5}
$$

We say that we **take** the factor 3 **out** of the root sign. It also works the
other way: a factor in front of the root is **brought in** by squaring it,

$$
3\sqrt{5} = \sqrt{9} \cdot \sqrt{5} = \sqrt{9 \cdot 5} = \sqrt{45}
$$

::: formel "Taking a factor out and bringing a factor in"
$$
\sqrt{a^2 \cdot b} = a\sqrt{b}
$$

The rule applies when $a \geq 0$ and $b \geq 0$. Read it from left to
right when a factor is taken out, and from right to left when it is brought in.
:::

::: exempel "Example 4: Taking out and bringing in"
**Simplify by taking a factor out of the root sign.<br>a)&nbsp;$\sqrt{12}$&emsp;&emsp;b)&nbsp;$\sqrt{50}$<br>c)&nbsp;Write $2\sqrt{7}$ as the root of a single number.**

::: handskrift
typ: rotlyft
:::

::: textlosning
**a)** The square 4 divides 12 exactly, because $12 = 4 \cdot 3$:

$$
\sqrt{12} = \sqrt{4 \cdot 3} = \sqrt{4} \cdot \sqrt{3} = 2\sqrt{3}
$$

**Answer:** $2\sqrt{3}$

**b)** The square 25 divides 50 exactly, because $50 = 25 \cdot 2$:

$$
\sqrt{50} = \sqrt{25 \cdot 2} = \sqrt{25} \cdot \sqrt{2} = 5\sqrt{2}
$$

**Answer:** $5\sqrt{2}$

**c)** The factor 2 is the root of 4, so it is brought in as 4:

$$
2\sqrt{7} = \sqrt{4} \cdot \sqrt{7} = \sqrt{4 \cdot 7} = \sqrt{28}
$$

**Answer:** $\sqrt{28}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Rational exponents"
- An exponent that is a fraction.
- $a^{1/n} = \sqrt[n]{a}$
- $25^{1/2} = \sqrt{25} = 5$ and
  $27^{1/3} = \sqrt[3]{27} = 3$.
:::

::: sampunkt "Why it works"
- $\left(25^{1/2}\right)^{2} = 25^{1} = 25$ according to the laws of exponents.
- $\left(\sqrt{25}\right)^{2} = 25$ according to the definition of a root.
- So $25^{1/2}$ and $\sqrt{25}$ must be the same number.
:::

::: sampunkt "General form"
- $a^{m/n} = \sqrt[n]{a^m}
  = \left(\sqrt[n]{a}\right)^{m}$.
- The **denominator** is the order of the root, the **numerator** is the exponent.
- $27^{2/3} = \left(\sqrt[3]{27}\right)^{2} = 3^2 = 9$.
:::

::: sampunkt "Roots of a product and a quotient"
- $\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}$ and $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$.
- $\sqrt{4 \cdot 49} = 2 \cdot 7 = 14$.
- Taking out: $\sqrt{45} = \sqrt{9} \cdot \sqrt{5} = 3\sqrt{5}$.
- **Not** with $+$ and $-$: $\sqrt{9 + 16} = 5$, but $\sqrt{9} + \sqrt{16} = 7$.
:::

::: sampunkt "Calculating with them"
- All the laws of exponents apply just as usual, even with fractional exponents.
- $\dfrac{x^{\frac{7}{2}}}{x^{3}} = x^{\frac{7}{2} - 3}
  = x^{\frac{1}{2}} = \sqrt{x}$.
:::
:::
