---
kalla: ba50869c21
id: ma3c-3.2
title: The derivative of polynomial functions
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.2'
---

# The derivative of polynomial functions

A function with several terms is called a **polynomial function**. We investigate whether there
are simple rules of differentiation for polynomial functions too.

From before we have the definition of the derivative

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

If we differentiate the function $f(x) = x^2 + 4x - 7$ **term by term**, with the
rules of differentiation we found earlier (multiply the exponent down and
reduce it by 1), we get

- $x^2$ has the derivative $2x$
- $4x$ has the derivative $4$
- $-7$ has the derivative $0$

If we add these terms together we get $f'(x) = 2x + 4$, exactly the same answer as
the definition of the derivative gives (see the derivation in the formula box below)!

::: formel "The derivative of polynomials"
The derivative of a function with several terms (a polynomial) is obtained by
differentiating the function **term by term**.

::: härledning "Derivation: The derivative of $f(x) = x^2 + 4x - 7$ with the definition"
$$
\begin{aligned}
f'(x) &= \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{(x+h)^2 + 4(x+h) - 7 - (x^2 + 4x - 7)}{h} \\
&= \lim_{h \to 0} \frac{x^2 + 2xh + h^2 + 4x + 4h - 7 - x^2 - 4x + 7}{h} = \lim_{h \to 0} \frac{2xh + h^2 + 4h}{h} \\
&= \lim_{h \to 0} \frac{h(2x + h + 4)}{h} = \lim_{h \to 0} (2x + h + 4) = 2x + 4
\end{aligned}
$$

So $f(x) = x^2 + 4x - 7$ has the derivative $f'(x) = 2x + 4$.
:::
:::

::: exempel "Example 1: Differentiate term by term"
**Differentiate<br>a)&nbsp;$f(x) = 3x^7 - 5x^2 + 8$&emsp;&emsp;b)&nbsp;$f(x) = \dfrac{4x^3}{3} - \dfrac{x}{5}$&emsp;&emsp;c)&nbsp;$f(x) = (2x - 3)^2$**

::: handskrift
typ: derivtermvis
:::

::: textlosning
**a)** We differentiate term by term and get

$$
f'(x) = 7 \cdot 3x^6 - 2 \cdot 5x = 21x^6 - 10x
$$

**Answer:** $f'(x) = 21x^6 - 10x$

**b)** We differentiate the numerators with the usual rules of differentiation and keep
the denominators unchanged.

$$
f'(x) = \frac{3 \cdot 4x^2}{3} - \frac{1}{5} = \frac{12x^2}{3} - \frac{1}{5} = 4x^2 - \frac{1}{5}
$$

**Answer:** $f'(x) = 4x^2 - \dfrac{1}{5}$

**c)** If the function has an expression in brackets, we must first expand the brackets
and then differentiate as usual. We expand with the second square rule.

$$
f(x) = 4x^2 - 12x + 9
$$

Now we differentiate term by term.

$$
f'(x) = 2 \cdot 4x - 12 = 8x - 12
$$

**Answer:** $f'(x) = 8x - 12$
:::
:::

::: exempel "Example 2: The value of the derivative at a point"
**Let $f(x) = 3x^2 - x$. Determine $f'(-2)$.**

::: handskrift
typ: derivvardeneg
:::

::: textlosning
We start by differentiating the function.

$$
f'(x) = 2 \cdot 3x - 1 = 6x - 1
$$

Then we substitute $x = -2$ into the derivative function.

$$
f'(-2) = 6 \cdot (-2) - 1 = -12 - 1 = -13
$$

**Answer:** $-13$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Polynomial function"
- A function with **several terms** is called a polynomial function.
- It is differentiated **term by term** with the usual rules of differentiation.
- $f(x) = x^2 + 4x - 7$ gives $f'(x) = 2x + 4$, which the definition also confirms.
:::

::: sampunkt "Term by term"
- $x^2$ gives $2x$, $4x$ gives $4$ and the constant $-7$ gives $0$.
- $3x^7 - 5x^2 + 8$ gives $21x^6 - 10x$.
- Constant terms always disappear.
:::

::: sampunkt "Fractions and brackets"
- A constant denominator is kept: $\dfrac{4x^3}{3}$ gives $\dfrac{12x^2}{3} = 4x^2$.
- **Expand the brackets first**, then differentiate. $(2x - 3)^2 = 4x^2 - 12x + 9$ gives $8x - 12$.
- Never differentiate a bracket directly, term by term inside it.
:::

::: sampunkt "The value at a point"
1. Differentiate the function.
2. Substitute the $x$-value into the derivative.
- $f(x) = 3x^2 - x$ gives $f'(x) = 6x - 1$ and $f'(-2) = -13$.
:::

:::
