---
kalla: b4ef15a930
id: ma3c-1.1
title: Polynomials
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.1'
---

# Polynomials

A **polynomial** is a sum of terms where each term is a number multiplied
by $x$ raised to an integer that is zero or positive. The expression

$$
5x^3 - 2x^2 + x - 7
$$

is a polynomial with four terms. The numbers in front of the $x$ terms, here 5, −2 and 1,
are called **coefficients**. The term without $x$, here −7, is called the **constant term**.
The highest exponent among the terms is called the **degree** of the polynomial, so the polynomial
above has degree 3.

::: formel "Polynomials and degree"
A polynomial is a sum of terms of the form

$$
a \cdot x^n
$$

where

- $a$ = coefficient (a number)
- $n$ = exponent (an integer that is zero or positive)

The **degree** of the polynomial is the highest exponent among the terms with a
non-zero coefficient.
:::

You already recognise polynomials of low degree. A first-degree polynomial such as
$2x + 3$ gives a straight line, and a second-degree polynomial such as $x^2 - 4x + 1$ gives a
parabola. Polynomials of degree 3 are called cubic polynomials, polynomials of degree 4
quartic polynomials, and so on.

An expression where $x$ appears in a denominator, under a root sign or in an
exponent is **not** a polynomial. For example, $\dfrac{1}{x} = x^{-1}$ and
$\sqrt{x} = x^{\frac{1}{2}}$, and neither $-1$ nor $\dfrac{1}{2}$ is an integer
that is zero or positive.

::: exempel "Example 1: Polynomial or not?"
**Decide whether the expression is a polynomial. If so, state the degree of the polynomial.<br>a)&nbsp;$3x^4 - 2x + 5$&emsp;&emsp;b)&nbsp;$7 - x$&emsp;&emsp;c)&nbsp;$\dfrac{4}{x} + x^2$&emsp;&emsp;d)&nbsp;$\sqrt{x} + 1$**

::: handskrift
typ: polynomgrad
:::

::: textlosning
**a)** All exponents are integers that are zero or positive. The highest
exponent is 4.

**Answer:** A polynomial of degree 4

**b)** We can write $7 - x = -x + 7 = -1 \cdot x^1 + 7$. The highest
exponent is 1.

**Answer:** A polynomial of degree 1

**c)** The term $\dfrac{4}{x}$ can be written $4x^{-1}$. The exponent $-1$ is
negative.

**Answer:** Not a polynomial

**d)** The term $\sqrt{x}$ can be written $x^{\frac{1}{2}}$. The exponent
$\dfrac{1}{2}$ is not an integer.

**Answer:** Not a polynomial
:::
:::

## The value of a polynomial

A polynomial is often denoted $p(x)$, in the same way as a function. We get the value of
the polynomial for a particular $x$ by substituting the value everywhere
$x$ appears. If $x$ is raised to a power, we put the value in brackets,
so that a minus sign is raised to the power as well.

::: exempel "Example 2: The value of a polynomial"
**The polynomial $p(x) = 2x^3 - 5x + 4$ is given. Calculate<br>a)&nbsp;$p(2)$&emsp;&emsp;b)&nbsp;$p(-1)$&emsp;&emsp;c)&nbsp;$p(0)$**

::: handskrift
typ: polynomvarde
:::

::: textlosning
**a)** We substitute $x = 2$ in both places where $x$ appears.

$$
p(2) = 2 \cdot 2^3 - 5 \cdot 2 + 4 = 2 \cdot 8 - 10 + 4 = 16 - 10 + 4 = 10
$$

**Answer:** $p(2) = 10$

**b)** We substitute $x = -1$ in brackets.

$$
p(-1) = 2 \cdot (-1)^3 - 5 \cdot (-1) + 4 = 2 \cdot (-1) + 5 + 4 = -2 + 5 + 4 = 7
$$

**Answer:** $p(-1) = 7$

**c)** All terms with $x$ become zero, and only the constant term remains.

$$
p(0) = 2 \cdot 0^3 - 5 \cdot 0 + 4 = 4
$$

**Answer:** $p(0) = 4$
:::
:::

Notice c): the value of a polynomial for $x = 0$ is always equal to
the constant term.

## Multiplying polynomials

When two polynomials are multiplied, **each term in one polynomial is
multiplied by each term in the other**. If one polynomial has two terms
and the other three, there are $2 \cdot 3 = 6$ products, which are then
simplified by collecting like terms.

::: formel "Multiplying polynomials"
Each term in the first bracket is multiplied by each term in the second:

$$
(a + b)(c + d + e) = ac + ad + ae + bc + bd + be
$$

The degree of the product is the sum of the degrees of the polynomials.
:::

The degrees add because the highest term in the product is the product
of the two highest terms, and when powers with the same base are multiplied
the exponents are added: $x^2 \cdot x^3 = x^{2 + 3} = x^5$.

The square rules and the difference of two squares are special cases of the multiplication
above. They are worth knowing by heart, since they are used in reverse when we
factorise.

::: formel "The square rules and the difference of two squares"
$$
(a + b)^2 = a^2 + 2ab + b^2
$$

$$
(a - b)^2 = a^2 - 2ab + b^2
$$

$$
(a + b)(a - b) = a^2 - b^2
$$
:::

::: exempel "Example 3: Multiplying polynomials"
**The polynomials $2x - 3$ and $x^2 + 4x - 1$ are multiplied together.<br>a) Expand and simplify the product $(2x - 3)(x^2 + 4x - 1)$.<br>b) What is the degree of the product?**

::: handskrift
typ: multpolynom
:::

::: textlosning
**a)** Each term in the first bracket is multiplied by each term in the
second. That gives six products.

$$
\begin{aligned}
(2x - 3)(x^2 + 4x - 1) &= 2x \cdot x^2 + 2x \cdot 4x + 2x \cdot (-1) - 3 \cdot x^2 - 3 \cdot 4x - 3 \cdot (-1) \\
&= 2x^3 + 8x^2 - 2x - 3x^2 - 12x + 3 \\
&= 2x^3 + 5x^2 - 14x + 3
\end{aligned}
$$

**Answer:** $2x^3 + 5x^2 - 14x + 3$

**b)** The highest exponent in the product is 3. This agrees with the degrees
adding: $2x - 3$ has degree 1 and $x^2 + 4x - 1$ has degree 2, and $1 + 2 = 3$.

**Answer:** Degree 3
:::
:::

## Factorising polynomials

To **factorise** a polynomial means to write it as a product. It is
multiplication in reverse. We have two methods from before:

1. Take out a common factor, for example $6x^2 + 4x = 2x(3x + 2)$.
2. Use the square rules or the difference of two squares in reverse, for example
   $x^2 - 9 = (x + 3)(x - 3)$.

Often both methods need to be used one after the other. Then always take out the common factor first,
and then check whether what remains in the bracket can be factorised further.
In the next section comes a third method, where the polynomial is factorised using
its zeros.

::: tips "Factorise in two steps"
1. Take out the greatest common factor.
2. Try the square rules or the difference of two squares on what remains in
   the bracket.
:::

::: exempel "Example 4: Factorising polynomials"
**Factorise as far as possible.<br>a)&nbsp;$6x^3 - 9x^2$&emsp;&emsp;b)&nbsp;$x^3 - 16x$&emsp;&emsp;c)&nbsp;$2x^3 + 12x^2 + 18x$**

::: handskrift
typ: faktoriserapolynom
:::

::: textlosning
**a)** Both terms contain the factor 3 and the factor $x^2$. We take out
$3x^2$.

$$
6x^3 - 9x^2 = 3x^2(2x - 3)
$$

**Answer:** $3x^2(2x - 3)$

**b)** We first take out $x$. What remains, $x^2 - 16 = x^2 - 4^2$,
is factorised with the difference of two squares in reverse.

$$
x^3 - 16x = x(x^2 - 16) = x(x + 4)(x - 4)
$$

**Answer:** $x(x + 4)(x - 4)$

**c)** We first take out $2x$. What remains, $x^2 + 6x + 9$, is
$x^2 + 2 \cdot 3 \cdot x + 3^2$, so the first square rule gives
$(x + 3)^2$.

$$
2x^3 + 12x^2 + 18x = 2x(x^2 + 6x + 9) = 2x(x + 3)^2
$$

**Answer:** $2x(x + 3)^2$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Polynomials"
- A sum of terms $a \cdot x^n$, where $n$ is an integer that is zero or positive.
- **Coefficient:** the number in front of the $x$ term. **Constant term:** the term without $x$.
- **Degree:** the highest exponent. $5x^3 - 2x^2 + x - 7$ has degree 3.
- $\dfrac{4}{x}$ and $\sqrt{x}$ do not give a polynomial: the exponents $-1$ and $\dfrac{1}{2}$.
:::

::: sampunkt "The value of a polynomial"
- Substitute the value everywhere $x$ appears, in brackets.
- $p(x) = 2x^3 - 5x + 4$ gives $p(-1) = 2 \cdot (-1)^3 - 5 \cdot (-1) + 4 = 7$.
- $p(0)$ is always equal to the constant term.
:::

::: sampunkt "Multiplication"
- Each term in one polynomial is multiplied by each term in the other.
- Then collect like terms.
- The degree of the product is the sum of the degrees.
:::

::: sampunkt "Factorisation"
- Factorise: write the polynomial as a product.
- First take out the greatest common factor.
- Then try the square rules or the difference of two squares in reverse.
- $x^3 - 16x = x(x^2 - 16) = x(x + 4)(x - 4)$
:::

:::
