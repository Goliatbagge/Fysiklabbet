---
kalla: 1e9ab3bebc
id: ma3c-1.4
title: Adding and subtracting rational expressions
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.4'
---

# Adding and subtracting rational expressions

To add and subtract rational expressions they must (just as for
fractions) have **the same denominator**. In this section we also solve
equations that contain rational expressions.

::: tips "Solving equations with rational expressions"
First check for which values of $x$ the denominator or denominators become
equal to zero. For these values the equation is not defined, so they are
not allowed as solutions. Then solve the equation with one of the methods:

1. **Multiply by the lowest common denominator (LCD).** Multiply
   both sides by the LCD (or another common denominator). Then simplify
   and solve as usual.
2. **Write with a common denominator.** Expand the terms so that they get the same denominator. Then
   combine them over a single fraction bar and use the fact that
   $\text{numerator} = \text{quotient} \cdot \text{denominator}$ (or the equivalent).
:::

## Adding and subtracting rational expressions

If the terms already have the same denominator, we simply add or subtract
the numerators, and the denominator stays the same. If they have different denominators we must first
give them a common denominator, just as for ordinary fractions: we expand each term
by the denominator of the other term.

::: exempel "Example 1: Simplify"
**Simplify**

::: handskrift
typ: forenklarationella
:::

::: textlosning
$$
\text{a)}\ \frac{5x^2}{x - 2} + \frac{7}{x - 2} \qquad
\text{b)}\ \frac{8x}{x + 3} - \frac{5x - 9}{x}
$$

**a)** Here both terms have the same denominator, so the numerators are added.

$$
\frac{5x^2}{x - 2} + \frac{7}{x - 2} = \frac{5x^2 + 7}{x - 2}
$$

**Answer:** $\dfrac{5x^2 + 7}{x - 2}$

**b)** Here the terms have different denominators. To get the same denominator we expand
the first term by the denominator of the second term, $x$, and the second
term by the denominator of the first term, $(x + 3)$.

$$
\frac{8x}{x + 3} - \frac{5x - 9}{x} = \frac{8x \cdot x}{(x + 3) \cdot x} - \frac{(5x - 9)(x + 3)}{x \cdot (x + 3)} = \frac{8x^2}{x(x + 3)} - \frac{(5x - 9)(x + 3)}{x(x + 3)}
$$

Now both terms have the same denominator $x(x + 3)$, and we can subtract
the numerators over a common fraction bar.

$$
\frac{8x^2 - (5x - 9)(x + 3)}{x(x + 3)} = \frac{8x^2 - (5x^2 + 15x - 9x - 27)}{x(x + 3)} = \frac{8x^2 - 5x^2 - 15x + 9x + 27}{x(x + 3)} = \frac{3x^2 - 6x + 27}{x(x + 3)} = \frac{3(x^2 - 2x + 9)}{x(x + 3)}
$$

We investigate whether $(x^2 - 2x + 9)$ can be factorised further by determining
its zeros.

$$
x^2 - 2x + 9 = 0
$$

The $pq$ formula gives

$$
x = 1 \pm \sqrt{1^2 - 9} = 1 \pm \sqrt{-8}
$$

The expression under the root sign is negative, so the quadratic equation has no
real roots. So $(x^2 - 2x + 9)$ cannot be factorised further.

**Answer:** $\dfrac{3(x^2 - 2x + 9)}{x(x + 3)}$
:::
:::

## Solving equations with rational expressions

When an equation contains rational expressions, we always start by
checking which $x$-values make a denominator equal to zero. These
values must never be part of the answer. Then we solve the equation with method 1
or method 2 from the box above.

::: exempel "Example 2: Solve the equations"
**Solve the equations**

::: handskrift
typ: rationellaekvationer
:::

::: textlosning
$$
\text{a)}\ \frac{x}{2} - \frac{x}{8} = 24 \qquad
\text{b)}\ \frac{1}{3} + \frac{2}{x - 3} = 1 \qquad
\text{c)}\ \frac{x}{x - 1} = \frac{2x}{x^2 - 1}
$$

**a)** No denominator contains $x$, so the equation is defined for all
$x$.

*Method 1: Multiply by the LCD.* Here the LCD $= 8$. We multiply both
sides by 8.

$$
\frac{x}{2} - \frac{x}{8} = 24 \quad\Rightarrow\quad \frac{x \cdot 8}{2} - \frac{x \cdot 8}{8} = 24 \cdot 8 \quad\Rightarrow\quad 4x - x = 192 \quad\Rightarrow\quad 3x = 192 \quad\Rightarrow\quad x = 64
$$

**Answer:** $x = 64$

*Method 2: Write with a common denominator.* We expand the first term by 4 to
get the same denominator.

$$
\frac{x}{2} - \frac{x}{8} = 24 \quad\Rightarrow\quad \frac{4x}{8} - \frac{x}{8} = 24 \quad\Rightarrow\quad \frac{4x - x}{8} = 24 \quad\Rightarrow\quad \frac{3x}{8} = 24
$$

$$
3x = 24 \cdot 8 = 192 \quad\Rightarrow\quad x = \frac{192}{3} = 64
$$

**Answer:** $x = 64$

**b)** The denominator $(x - 3)$ means that the equation is not defined for
$x = 3$, so $x \neq 3$. We multiply both sides by the LCD
$= 3(x - 3)$.

$$
\frac{1 \cdot 3(x - 3)}{3} + \frac{2 \cdot 3(x - 3)}{x - 3} = 1 \cdot 3(x - 3)
$$

$$
(x - 3) + 2 \cdot 3 = 3(x - 3) \quad\Rightarrow\quad x - 3 + 6 = 3x - 9 \quad\Rightarrow\quad x + 3 = 3x - 9
$$

$$
3 = 2x - 9 \quad\Rightarrow\quad 12 = 2x \quad\Rightarrow\quad x = 6
$$

**Answer:** $x = 6$

**c)** We investigate for which $x$ the denominators become zero.

$$
x - 1 = 0 \iff x = 1 \qquad\qquad x^2 - 1 = 0 \iff x = \pm 1
$$

So $x \neq 1$ and $x \neq -1$. We factorise the numerators and denominators as
far as possible: $(x^2 - 1)$ is a difference of two squares and is factorised as
$(x + 1)(x - 1)$.

$$
\frac{x}{x - 1} = \frac{2x}{(x + 1)(x - 1)}
$$

We multiply both sides by the LCD $= (x + 1)(x - 1)$.

$$
\frac{x(x + 1)(x - 1)}{x - 1} = \frac{2x(x + 1)(x - 1)}{(x + 1)(x - 1)} \quad\Rightarrow\quad x(x + 1) = 2x
$$

We expand and make the right-hand side equal to zero.

$$
x^2 + x = 2x \quad\Rightarrow\quad x^2 - x = 0 \quad\Rightarrow\quad x(x - 1) = 0
$$

The zero product method gives $x_1 = 0$ and $x_2 = 1$. Since $x \neq 1$
we reject the solution $x_2 = 1$.

**Answer:** $x = 0$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The same denominator is required"
- If the terms have **the same denominator**, only the numerators are added or subtracted, and the denominator is kept.
- If they have different denominators, they must first be given a common denominator.
- Expand each term by the denominator of the other term, just as for fractions.
:::

::: sampunkt "Pitfalls"
- Put **brackets** around the whole numerator that is subtracted, so that all the signs change.
- Simplify the answer by factorising the numerator at the end.
- If a quadratic expression has no real zeros, it cannot be factorised further. The expression under the root sign is then negative.
:::

::: sampunkt "Domain first"
- Always check which $x$-values make a denominator equal to zero.
- For those values the equation is not defined, so they are not allowed solutions.
- If a forbidden value turns up as a solution, it must be **rejected**.
:::

::: sampunkt "Two methods for solving the equation"
1. **Multiply by the LCD:** multiply both sides by the lowest common denominator, simplify and solve as usual.
2. **Write with a common denominator:** expand to the same denominator, combine over one fraction bar and use the fact that the numerator is the quotient times the denominator.
- Factorise the denominators before the LCD is determined. $x^2 - 1$ is a difference of two squares and becomes $(x + 1)(x - 1)$.
:::

:::
