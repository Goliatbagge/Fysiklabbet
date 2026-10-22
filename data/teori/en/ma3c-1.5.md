---
kalla: 990b190d15
id: ma3c-1.5
title: Multiplying and dividing rational expressions
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.5'
---

# Multiplying and dividing rational expressions

Multiplication and division of rational expressions follow the same rules
as multiplication and division of fractions. The difference is that the numerator and
denominator are now polynomials. Just as when simplifying, we often need to
**factorise** first to be able to simplify the result as far as
possible.

::: formel "Multiplying rational expressions"
When two rational expressions are multiplied, the numerators are multiplied
together and the denominators are multiplied together:

$$
\frac{a}{b} \cdot \frac{c}{d} = \frac{a \cdot c}{b \cdot d}
$$

It helps to factorise the numerators and denominators **before** you multiply them together:
that makes it easier to see which factors can be cancelled later.
:::

::: exempel "Example 1: Multiplying rational expressions"
**Simplify<br>a)&nbsp;$\dfrac{3}{8-x}\cdot\dfrac{x^2+5}{6}$&emsp;&emsp;b)&nbsp;$\dfrac{3x+6}{x-2}\cdot\dfrac{x^2-4}{3}$**

::: handskrift
typ: multrationella
:::

::: textlosning
**a)** We multiply numerator by numerator and denominator by denominator:

$$
\frac{3}{8-x}\cdot\frac{x^2+5}{6} = \frac{3(x^2+5)}{6(8-x)}
$$

Simplify by 3:

$$
\frac{3(x^2+5)}{6(8-x)} = \frac{x^2+5}{2(8-x)} = \frac{x^2+5}{16-2x}
$$

**Answer:** $\dfrac{x^2+5}{2(8-x)} = \dfrac{x^2+5}{16-2x}$

**b)** We factorise the numerators and denominators as far as possible, multiply
them together and then cancel like factors. In the numerator $3x+6$ of the
first fraction we take out 3 to get $3(x+2)$, and the numerator $x^2-4$ of the
second fraction is a difference of two squares:
$x^2-4=(x+2)(x-2)$.

$$
\frac{3x+6}{x-2}\cdot\frac{x^2-4}{3} = \frac{3(x+2)}{x-2}\cdot\frac{(x+2)(x-2)}{3}
= \frac{3(x+2)(x+2)(x-2)}{3(x-2)}
$$

Simplify by $3(x-2)$:

$$
\frac{3(x+2)(x+2)(x-2)}{3(x-2)} = (x+2)(x+2) = (x+2)^2 = x^2+4x+4
$$

**Answer:** $(x+2)^2 = x^2+4x+4$
:::
:::

## Dividing rational expressions

::: formel "Dividing rational expressions"
When dividing by a rational expression, you replace the large
division sign with multiplication, and at the same time **invert**
(swap the numerator and denominator of) the expression in the denominator. Then
simplify as usual:

$$
\frac{a}{b} \Big/ \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}
$$
:::

::: exempel "Example 2: Dividing rational expressions"
**Simplify $\dfrac{3x}{x+7} \Big/ \dfrac{5x}{x-2}$.**

::: handskrift
typ: divrationella
:::

::: textlosning
We replace the division sign with multiplication and invert the expression in
the denominator:

$$
\frac{3x}{x+7}\cdot\frac{x-2}{5x} = \frac{3x(x-2)}{5x(x+7)}
$$

Simplify by $x$:

$$
\frac{3x(x-2)}{5x(x+7)} = \frac{3(x-2)}{5(x+7)} = \frac{3x-6}{5x+35}
$$

**Answer:** $\dfrac{3(x-2)}{5(x+7)} = \dfrac{3x-6}{5x+35}$
:::
:::

## Equations with rational expressions

The multiplication and division rules are also used when we solve
**equations** that contain rational expressions. An important proviso:
since division by zero is not defined, we must always exclude the
values of $x$ that make any denominator in the equation equal to zero.

::: exempel "Example 3: Solve an equation with rational expressions"
**Solve the equation $\dfrac{x-2}{x-3} = \dfrac{x+7}{x}$.**

::: handskrift
typ: rationellkorsvis
:::

::: textlosning
Since no denominator may be zero, $x \neq 3$ and $x \neq 0$.

**Alternative 1: Multiply by the LCD**

We multiply both sides by the lowest common denominator,
$LCD = x(x-3)$, and simplify:

$$
\frac{x(x-3)(x-2)}{x-3} = \frac{x(x-3)(x+7)}{x}
\qquad \Longrightarrow \qquad
x(x-2) = (x-3)(x+7)
$$

**Alternative 2: Cross-multiplication**

Since the equation has the form $\dfrac{a}{b}=\dfrac{c}{d}$ we can
cross-multiply, $a \cdot d = c \cdot b$, which gives the same equation
directly:

$$
x(x-2) = (x-3)(x+7)
$$

So both alternatives lead to the same quadratic equation. We expand
the right-hand side:

$$
x^2 - 2x = x^2 + 4x - 21
$$

We subtract $x^2$ from both sides, collect the $x$ terms on the same side and
solve for $x$:

$$
\begin{aligned}
-2x &= 4x - 21 \\
-2x - 4x &= -21 \\
-6x &= -21 \\
x &= \frac{-21}{-6} = \frac{21}{6} = \frac{7}{2}
\end{aligned}
$$

The solution $x = \dfrac{7}{2}$ is neither 3 nor 0, so it is valid.

**Answer:** $x = \dfrac{7}{2}$
:::
:::

::: tips "Summary"
1. Multiplication: numerator times numerator, denominator times denominator.
2. Division: replace the division sign with multiplication and invert
   the expression in the denominator.
3. Factorise the numerator and denominator before you simplify: then you can see which
   factors can be cancelled.
4. Always exclude the values of $x$ that make any denominator in the equation equal
   to zero.
:::

::: sammanfattning "Summary"

::: sampunkt "Multiplication"
- Numerator times numerator, denominator times denominator: $\dfrac{a}{b} \cdot \dfrac{c}{d} = \dfrac{a \cdot c}{b \cdot d}$.
- **Factorise first**, then multiply. Then you can see directly which factors can be cancelled.
:::

::: sampunkt "Division"
- Replace the division sign with multiplication and **invert** the expression in the denominator: $\dfrac{a}{b} \Big/ \dfrac{c}{d} = \dfrac{a}{b} \cdot \dfrac{d}{c}$.
- Then simplify as for multiplication.
- $\dfrac{3x}{x+7} \Big/ \dfrac{5x}{x-2} = \dfrac{3(x-2)}{5(x+7)}$.
:::

::: sampunkt "Equations"
- First exclude all $x$ that make any denominator equal to zero.
- Multiply both sides by the LCD and simplify.
- If the equation has the form $\dfrac{a}{b} = \dfrac{c}{d}$ it is quicker to **cross-multiply**: $a \cdot d = c \cdot b$.
- Finally, check that the solution is not a forbidden value.
:::

::: sampunkt "Form of the answer"
- Feel free to answer in both factorised and expanded form.
- Factorised form shows most clearly that nothing more can be cancelled.
:::

:::
