---
kalla: 3f563fbfc6
id: ma2c-2.1
title: The square rules and the difference of two squares
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.1'
---

# The square rules and the difference of two squares

**The square rules** are a method for easily expanding
bracket expressions "squared". **The difference of two squares** (the conjugate rule) is a method for
easily expanding a multiplication of two identical bracket expressions where
the only difference is the sign between the terms inside the brackets.

::: formel "The square rules"
$$
(a + b)^2 = a^2 + 2ab + b^2
$$

$$
(a - b)^2 = a^2 - 2ab + b^2
$$

::: härledning "Proof: The first square rule"
$$
(a + b)^2 = (a + b)(a + b) = a^2 + ab + ab + b^2 = a^2 + 2ab + b^2
$$

Q.E.D.
:::
:::

::: formel "The difference of two squares"
$$
(a + b)(a - b) = a^2 - b^2
$$

::: härledning "Proof: The difference of two squares"
$$
(a + b)(a - b) = a^2 - ab + ab - b^2 = a^2 - b^2
$$

Q.E.D.
:::
:::

::: exempel "Example 1: Expand with the square rules"
**Expand<br>a)&nbsp;$(x + 4)^2$&emsp;&emsp;b)&nbsp;$(7 - b)^2$&emsp;&emsp;c)&nbsp;$(3y - 4x)^2$**

::: handskrift
typ: kvadreringsregler
:::

::: textlosning
**a)** The first square rule with $a = x$ and $b = 4$:

$$
(x + 4)^2 = x^2 + 2 \cdot x \cdot 4 + 4^2 = x^2 + 8x + 16
$$

**Answer:** $x^2 + 8x + 16$

Comment: We can often get the "middle term" or "the double product"
directly with quick and simple mental arithmetic. To get the double
product, we multiply the two terms inside the brackets and
then double: $x$ times 4 is $4x$, and doubled it becomes $8x$. Practise
this!

**b)** The second square rule:

$$
(7 - b)^2 = 49 - 14b + b^2
$$

**Answer:** $49 - 14b + b^2$

**c)** Remember that the **whole** terms $3y$ and $4x$ are to be raised to the power 2:

$$
(3y - 4x)^2 = 9y^2 - 24xy + 16x^2
$$

**Answer:** $9y^2 - 24xy + 16x^2$
:::
:::

::: exempel "Example 2: Expand with the difference of two squares"
**Expand<br>a)&nbsp;$(x + 8)(x - 8)$&emsp;&emsp;b)&nbsp;$(3x - 5y)(3x + 5y)$&emsp;&emsp;c)&nbsp;$(9 + 2x)(2x - 9)$**

::: handskrift
typ: konjugatregeln
:::

::: textlosning
**a)** We see that the contents of the brackets are the same and that the only
difference is the sign between the terms (plus in one and minus in the other).
So we apply the difference of two squares.

$$
(x + 8)(x - 8) = x^2 - 8^2 = x^2 - 64
$$

**Answer:** $x^2 - 64$

Comment: Just as with the square rules, practise getting
the final answer in a single step, that is, try to get directly
that $(x + 8)(x - 8) = x^2 - 64$ without any intermediate steps.

**b)** Remember that 3 and 5 are also to be raised to the power 2:

$$
(3x - 5y)(3x + 5y) = 9x^2 - 25y^2
$$

**Answer:** $9x^2 - 25y^2$

**c)** At first glance this does not look like a conjugate pair, since
we do not have the same first term in the brackets (9 and $2x$ respectively).
However, the brackets are very similar. If we swap the terms in the first
bracket, it will become a conjugate pair! Swapping the terms
is fine since there is a plus sign between them and the order then does not
matter ($3 + 5$ is, after all, the same as $5 + 3$). After that
we continue with the difference of two squares as usual.

$$
(9 + 2x)(2x - 9) = (2x + 9)(2x - 9) = 4x^2 - 81
$$

**Answer:** $4x^2 - 81$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The square rules"
- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$
- The only difference is **the sign in front of the middle term**. The last term is
  always positive.
:::

::: sampunkt "The most common mistake"
- $(a + b)^2$ is **not** $a^2 + b^2$.
- The middle term $2ab$ must be included. Check with
  $(2 + 3)^2 = 25$, not $4 + 9 = 13$.
:::

::: sampunkt "The difference of two squares"
- $(a + b)(a - b) = a^2 - b^2$
- Two identical brackets where **only the sign** differs.
- The middle terms cancel each other out, so what remains is a **difference of two
  squares**.
:::

::: sampunkt "Why the rules hold"
- They are just ordinary multiplication of brackets, summarised:
  $(a + b)(a + b) = a^2 + ab + ab + b^2$.
- If you know the rules by heart it is quicker, but you can always multiply
  out by hand as a check.
:::

::: sampunkt "Using them backwards"
- $a^2 - b^2$ can be **factorised** as $(a + b)(a - b)$.
- $a^2 + 2ab + b^2$ can be written $(a + b)^2$.
- This is used a lot when expressions are to be simplified and equations solved.
:::
:::
