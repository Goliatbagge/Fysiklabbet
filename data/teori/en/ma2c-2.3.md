---
kalla: 6b8eaa4217
id: ma2c-2.3
title: The zero product method
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.3'
---

# The zero product method

Equations that contain $x^2$-terms **and** $x$-terms cannot be
solved with our usual method. These equations, as well as equations where a
product (multiplication) equals 0, we solve with
**the zero product method**.

The principle of the zero product method is that if we have a multiplication that
is to equal 0, then one of the factors (the parts of the
multiplication) **must** equal 0. It is not possible to multiply two
numbers so that the result equals 0 unless one of the numbers is 0.

The solution to an equation is also called a **root**.

::: tips "The zero product method"
1. Rearrange so that the right-hand side equals 0.
2. Factorise the left-hand side.
3. Set each factor equal to 0 and solve.
:::

::: exempel "Example 1: Solve the equations"
**Solve the equations<br>a)&nbsp;$x^2 - 12x = 0$&emsp;&emsp;b)&nbsp;$x^2 + 5x = 0$&emsp;&emsp;c)&nbsp;$(x - 7)(x + 3) = 0$&emsp;&emsp;d)&nbsp;$14x^2 = 21x$**

::: handskrift
typ: nollprodukt2c
:::

::: textlosning
**a)** We have an equation with both $x^2$-terms and $x$-terms. It
equals 0. So we start by factorising the left-hand side. We take
out $x$:

$$
x(x - 12) = 0
$$

Now we have written the left-hand side as a product (multiplication). If
a product equals 0, one factor must be 0. So

$$
x = 0 \quad \text{or} \quad x - 12 = 0
$$

So $x = 0$ is a solution. We calculate the other solution as well:

$$
x - 12 = 0 \iff x = 12
$$

So we get two solutions: $x_1 = 0$ and $x_2 = 12$.

**Answer:** $x_1 = 0$ and $x_2 = 12$

**b)** We have an equation with both $x^2$-terms and an $x$-term, so we
take out $x$:

$$
x(x + 5) = 0
$$

The zero product method gives

$$
x = 0 \quad \text{or} \quad x + 5 = 0
$$

The second equation gives $x = -5$.

**Answer:** $x_1 = 0$ and $x_2 = -5$

**c)** The left-hand side is already factorised and equals 0.
The zero product method gives

$$
x - 7 = 0 \iff x = 7
$$

or

$$
x + 3 = 0 \iff x = -3
$$

**Answer:** $x_1 = 7$ and $x_2 = -3$

**d)** We have an equation with both $x^2$-terms and $x$-terms (it
does not matter that they are on different sides of the equals sign). We
start by rearranging so that the right-hand side becomes 0, by
subtracting $21x$ from both sides:

$$
14x^2 - 21x = 0
$$

Then we factorise the left-hand side and solve the equation as
usual.

$$
7x(2x - 3) = 0
$$

(It is also possible to take out just $x$, but preferably the greatest possible factor.)

The zero product method gives

$$
7x = 0 \iff x = 0
$$

or

$$
2x - 3 = 0 \iff 2x = 3 \iff x = \frac{3}{2}
$$

**Answer:** $x_1 = 0$ and $x_2 = \dfrac{3}{2}$
:::
:::

::: exempel "Example 2: Construct an equation with given roots"
**Give an equation with the roots $x_1 = 3$ and $x_2 = -10$.**

::: handskrift
typ: konstrueraekvation
:::

::: textlosning
We are to construct an equation with the roots (solutions) $x = 3$ and
$x = -10$. We can easily do this with the zero product method backwards!
If we set the equation equal to 0, the factors $(x - 3)$ and
$(x + 10)$ must be included, since when we substitute $x = 3$ and $x = -10$ into
them they become 0. We can think of it as putting the solutions, but
with the sign changed, into the brackets.

So one equation could be

$$
(x - 3)(x + 10) = 0
$$

(We see with a quick check that $x = 3$ makes the first factor 0
and $x = -10$ makes the second factor 0, and thereby makes the whole
left-hand side equal 0.)

**Answer:** $(x - 3)(x + 10) = 0$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "When the method is used"
- Equations with both $x^2$-terms **and** $x$-terms, but **no
  constant term**.
- Also equations where a ready-made **product** equals 0.
:::

::: sampunkt "The principle"
- If a product equals 0, **at least one factor must be 0**.
- It is not possible to multiply two non-zero numbers and get 0.
:::

::: sampunkt "The method"
1. Make sure that **the right-hand side is 0**.
2. **Factorise** the left-hand side.
3. Set **each factor** equal to 0 and solve them one at a time.
:::

::: sampunkt "Two solutions"
- A quadratic equation usually has **two** roots, often $x_1 = 0$ and one
  more.
- Write out both and number them $x_1$ and $x_2$.
- The solution to an equation is also called a **root**.
:::

::: sampunkt "Common trap"
- **Never divide away $x$.** Then you lose the solution $x = 0$.
- $14x^2 = 21x$ should be moved to one side as
  $7x(2x - 3) = 0$, not divided by $x$.
:::
:::
