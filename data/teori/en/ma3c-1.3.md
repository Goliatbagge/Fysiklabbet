---
kalla: 8a6e7fce98
id: ma3c-1.3
title: Simplifying and expanding rational expressions
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.3'
---

# Simplifying and expanding rational expressions

In the section on polynomials we saw that a **polynomial** is a sum of terms
$a \cdot x^n$, where $n$ is an integer that is zero or positive. An expression with a polynomial in the numerator and denominator is called
a **rational expression**.

$$
\frac{5x^2 - 5x}{3x - 3} \qquad \text{and} \qquad \frac{x + 3}{8}
$$

are examples of rational expressions.

We simplify and expand rational expressions by the same principle as for
fractions. Remember that when fractions or rational expressions are simplified or expanded,
the size of the expression **does not change**.

When we simplify rational expressions, we do it by **factorising**
to find common factors. From before we have two methods for
factorising polynomials:

1. Take out a common factor.
2. The square rules or the difference of two squares in reverse.

There is a third method for factorising any polynomial expression
at all: by determining the **zeros** of the polynomial. In the section on polynomial equations
we saw that a polynomial $p(x)$ with the zeros $x_1, x_2, \ldots, x_n$ could be written as $p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)$. This
is a factorisation.

::: formel "Factorising with zeros"
A polynomial $p(x)$ of degree $n$ with the zeros $x_1, x_2, \ldots, x_n$ can be
factorised as

$$
p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)
$$

where $k$ is the coefficient of the term with the highest degree (exponent).
:::

In tasks where we have to factorise expressions, for example when we simplify
rational expressions, we now have three methods.

::: tips "Factorise"
1. Take out a common factor.
2. The square rules or the difference of two squares in reverse.
3. Using the zeros.
:::

## Expand and simplify

We first review the principle with some examples with fractions. Then we move
on to rational expressions. To **expand** means multiplying both
the numerator and the denominator by the same number or expression. To **simplify** means
dividing both the numerator and the denominator by a common factor.

::: exempel "Example 1: Expand a fraction"
**Expand $\dfrac{3}{4}$ by 5.**

::: handskrift
typ: forlangfem
:::

::: textlosning
We multiply both the numerator and the denominator by 5.

$$
\frac{3}{4} = \frac{3 \cdot 5}{4 \cdot 5} = \frac{15}{20}
$$

**Answer:** $\dfrac{15}{20}$
:::
:::

::: exempel "Example 2: Simplify a fraction"
**Simplify $\dfrac{14}{21}$.**

::: handskrift
typ: forkortafjorton
:::

::: textlosning
We try to find common divisors of 14 and 21. With smaller numbers we can
quite easily find a common divisor (in this case 7). Alternatively we can
write the numerator and denominator as products of primes and then cancel common
factors, which is suitable for larger numbers.

*Alternative 1:* We see that the greatest common divisor of 14 and 21 is 7
and divide by it.

$$
\frac{14}{21} = \frac{14/7}{21/7} = \frac{2}{3}
$$

*Alternative 2:* With prime factorisation.

$$
\frac{14}{21} = \frac{2 \cdot 7}{3 \cdot 7} = \frac{2}{3}
$$

**Answer:** $\dfrac{2}{3}$
:::
:::

::: exempel "Example 3: Expand a rational expression"
**Expand $\dfrac{x + 3}{8}$ by $(x - 2)$. Give the answer in factorised form and in
expanded form.**

::: handskrift
typ: forlangrationellt
:::

::: textlosning
We multiply the numerator and the denominator by $(x - 2)$.

$$
\frac{x + 3}{8} = \frac{(x + 3)(x - 2)}{8(x - 2)} = \frac{x^2 + x - 6}{8x - 16}
$$

**Answer:** $\dfrac{(x + 3)(x - 2)}{8(x - 2)}$ (factorised form) or
$\dfrac{x^2 + x - 6}{8x - 16}$ (expanded form)
:::
:::

::: exempel "Example 4: Simplify rational expressions"
**Simplify**

::: handskrift
typ: forkortarationella
:::

::: textlosning
$$
\text{a)}\ \frac{35x^3}{30x^5} \qquad
\text{b)}\ \frac{5x^2 - 5x}{3x - 3} \qquad
\text{c)}\ \frac{x^2 - 8x + 7}{x - 1}
$$

**a)** This expression has a single term in both the numerator and the denominator, so we
write out all the factors to see which cancellations are possible.

$$
\frac{35x^3}{30x^5} = \frac{7 \cdot 5 \cdot x \cdot x \cdot x}{5 \cdot 3 \cdot 2 \cdot x \cdot x \cdot x \cdot x \cdot x} = \frac{7}{3 \cdot 2 \cdot x \cdot x} = \frac{7}{6x^2}
$$

**b)** This expression has several terms in the numerator and denominator. We use
the same principle as for the fractions: we rewrite the numerator and denominator as
multiplications, that is we **factorise** them. We take out the greatest
common factor in the numerator and in the denominator, and then simplify.

$$
\frac{5x^2 - 5x}{3x - 3} = \frac{5x(x - 1)}{3(x - 1)} = \frac{5x}{3}
$$

**c)** The denominator $x - 1$ cannot be factorised further. The numerator cannot
be factorised with method 1 or 2, so we determine its zeros by
setting the expression equal to zero and solving the equation.

$$
x^2 - 8x + 7 = 0
$$

We use the $pq$ formula and get

$$
\begin{aligned}
x &= 4 \pm \sqrt{4^2 - 7} \\
x &= 4 \pm \sqrt{9} \\
x &= 4 \pm 3
\end{aligned}
$$

which gives $x_1 = 4 - 3 = 1$ and $x_2 = 4 + 3 = 7$. So the numerator has
the zeros 1 and 7 and can therefore be factorised as $(x - 1)(x - 7)$.

This gives

$$
\frac{x^2 - 8x + 7}{x - 1} = \frac{(x - 1)(x - 7)}{(x - 1)} = x - 7
$$

**Answer:** $x - 7$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Concepts"
- **Polynomial:** a sum of terms $a \cdot x^n$, where $n$ is an integer that is zero or positive.
- **Rational expression:** a polynomial in the numerator and one in the denominator, for example $\dfrac{5x^2 - 5x}{3x - 3}$.
- Simplifying and expanding do **not** change the value of the expression.
:::

::: sampunkt "Three ways to factorise"
1. Take out a common factor.
2. The square rules or the difference of two squares in reverse.
3. Using the zeros.
- A polynomial $p(x)$ of degree $n$ with the zeros $x_1, x_2, \ldots, x_n$ can be written $p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)$, where $k$ is the coefficient of the term with the highest degree.
:::

::: sampunkt "Expanding and simplifying"
- **Expand:** multiply the numerator and the denominator by the same number or expression.
- **Simplify:** divide the numerator and the denominator by a common factor.
- If the expression has only one term in the numerator and denominator: write out all the factors and cross out the common ones.
:::

::: sampunkt "Method for simplifying"
1. Factorise the numerator and the denominator as far as possible.
2. Cross out the factors that appear in both the numerator and the denominator.
- $\dfrac{5x^2 - 5x}{3x - 3} = \dfrac{5x(x - 1)}{3(x - 1)} = \dfrac{5x}{3}$.
- If nothing can be taken out: determine the zeros. $x^2 - 8x + 7$ has the zeros 1 and 7, so $(x - 1)(x - 7)$.
:::

:::
