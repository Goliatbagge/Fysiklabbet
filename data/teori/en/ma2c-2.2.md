---
kalla: 171c0b5694
id: ma2c-2.2
title: Factorising expressions
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.2'
---

# Factorising expressions

Rewriting an expression as a multiplication is **factorising
expressions**. We have covered factorising earlier in Mathematics level 1c. Then
we factorised by "taking out" a common factor. At this
level we will also factorise by using
the square rules and the difference of two squares backwards.

::: tips "Factorising with the difference of two squares and the square rules"
An expression can be factorised with

- **the difference of two squares** if the expression has **two** square terms with a minus
  between them. Memory rhyme: "Square minus square is a conjugate pair!"
- **the first square rule** if the expression has **three** terms where
  the first and last terms are squares. The sign in front of the middle term is
  **plus**. NOTE! Check that the middle term matches the
  double product.
- **the second square rule** if the expression has **three** terms where the first
  and last terms are squares. The sign in front of the middle term is
  **minus**. NOTE! Check that the middle term matches the
  double product.
:::

::: tips "Factorise expressions"
If possible,

1. take out a common factor "as usual"
2. use a square rule or the difference of two squares backwards
:::

::: tips "Simplify rational expressions (fractions with x)"
1. Factorise the numerator and denominator as far as possible.
2. Cancel ("cross out") identical factors from the numerator and denominator.
:::

::: exempel "Example 1: Factorise"
**Factorise<br>a)&nbsp;$18x^2 + 45x^3 - 81x^4$&emsp;&emsp;b)&nbsp;$x^2 - 6x + 9$&emsp;&emsp;c)&nbsp;$50x^2 - 98$**

::: handskrift
typ: faktorisera2c
:::

::: textlosning
**a)** First we check whether we can take out a common factor "as usual". We
look first at all the coefficients, that is the numbers in front of
the variable terms. 18, 45 and 81 have 9 as their greatest common
divisor. So we can take out 9. All terms contain $x$, so we can also take out
a variable. The **lowest** exponent we have on $x$ is 2, so we can take
out $x^2$.

The greatest factor we can take out is therefore $9x^2$. Then we must
fill the bracket so that we get the original expression when we
multiply $9x^2$ into the bracket. We then get

$$
9x^2(2 + 5x - 9x^2)
$$

Now we look at the expression in the bracket again. Can we factorise it
further? No, it cannot be factorised further, for example with a
square rule, since the first term (2) is not a square
(it cannot be written as an integer raised to the power 2).

**Answer:** $9x^2(2 + 5x - 9x^2)$

**b)** We are to factorise $x^2 - 6x + 9$. We cannot take out anything
"as usual". Could it be a square rule or the difference of two squares
backwards? Yes! Since the expression contains three terms where the first
and last terms are squares, it could be a square rule!

We write a template for the square rule. Since the middle term is
negative, there must be a minus sign in the bracket:

$$
x^2 - 6x + 9 = (\ \ - \ \ )^2
$$

Then we look at the first term $x^2$ and think "What raised to the power 2
gives $x^2$? Well, $x$!" Then we look at the second term 9 and think "What
raised to the power 2 gives 9? Well, 3!"

Then we fill in $x$ and 3 in the bracket and get

$$
x^2 - 6x + 9 = (x - 3)^2
$$

We check that the middle term/the double product becomes $6x$, which
is correct.

**Answer:** $(x - 3)^2$

**c)** We are to factorise $50x^2 - 98$. We start by taking out 2
from the expression:

$$
2(25x^2 - 49)
$$

Now we look at the expression in the bracket again. Can we factorise it
further? Yes! Since the expression in the bracket is "square minus
square", it is a conjugate pair!

We write a template for the difference of two squares, so

$$
2(25x^2 - 49) = 2(\ \ + \ \ )(\ \ - \ \ )
$$

Then we look at the first term $25x^2$ and think "What raised to the power 2
gives $25x^2$? Well, $5x$!" Then we look at the second term 49 and think
"What raised to the power 2 gives 49? Well, 7!"

Then we fill in $5x$ and 7 in the brackets and get

$$
2(25x^2 - 49) = 2(5x + 7)(5x - 7)
$$

**Answer:** $2(5x + 7)(5x - 7)$
:::
:::

::: exempel "Example 2: Simplify a rational expression"
**Simplify $\dfrac{x^2 - 9}{5x + 15}$ as far as possible.**

::: handskrift
typ: forkortakonjugat
:::

::: textlosning
We factorise the numerator and denominator as far as we can. The numerator is
"square minus square" and can therefore be factorised with the difference of two squares.
The denominator can be factorised by taking out 5.

$$
\frac{x^2 - 9}{5x + 15} = \frac{(x + 3)(x - 3)}{5(x + 3)}
$$

Then we cancel $(x + 3)$ from the expression, since that factor
appears in both the numerator and the denominator.

$$
\frac{(x + 3)(x - 3)}{5(x + 3)} = \frac{x - 3}{5}
$$

**Answer:** $\dfrac{x - 3}{5}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Factorising: the order"
1. **Take out** a common factor, as usual.
2. Then use **a square rule or the difference of two squares backwards** on what
   remains in the bracket.
:::

::: sampunkt "The difference of two squares backwards"
- **Two** terms, both squares, with **minus** between them.
- The memory rhyme: "Square minus square is a conjugate pair!"
- $a^2 - b^2 = (a + b)(a - b)$
:::

::: sampunkt "The square rules backwards"
- **Three** terms, where the first and last are squares.
- Plus in front of the middle term: $(a + b)^2$.
- Minus in front of the middle term: $(a - b)^2$.
- **Always check the middle term**: it must be the double product
  $2ab$.
:::

::: sampunkt "How to find the contents"
- "What raised to the power 2 gives $25x^2$?" Answer: $5x$.
- "What raised to the power 2 gives 49?" Answer: 7.
- Put them into the template and check by multiplying out.
:::

::: sampunkt "Simplify rational expressions"
1. Factorise **the numerator and denominator** as far as possible.
2. Cancel the factors that appear in both.
- $\dfrac{x^2 - 9}{5x + 15}
  = \dfrac{(x+3)(x-3)}{5(x+3)} = \dfrac{x - 3}{5}$.
- Only **factors** may be crossed out, never terms.
:::
:::
