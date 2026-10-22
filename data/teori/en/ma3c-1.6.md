---
kalla: 893ed2c718
id: ma3c-1.6
title: Limits
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.6'
---

# Limits

::: härledning "Introduction: limit"
We investigate the value of the expression $\dfrac{1}{x}$ as $x$ becomes larger and
larger.

$$
\frac{1}{10} = 0.1 \qquad \frac{1}{100} = 0.01 \qquad
\frac{1}{1000} = 0.001 \qquad \frac{1}{10\,000} = 0.0001
$$

We see that as $x$ increases, the value of $\dfrac{1}{x}$ comes closer and closer to
0. The number 0 is the boundary that the value tends to, but it never reaches it.
We say that **the limit is 0**.
:::

A value that an expression approaches is called a **limit**. In the example above
it therefore holds that the limit of $\dfrac{1}{x}$ as $x$ tends to infinity ($\infty$)
is equal to 0. This is written

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

The notation $\lim_{x \to \infty}$ is read "the limit as $x$ tends to
infinity" (the word lim is short for the Latin *limes*, which means precisely
"boundary", and the English word
*limit* comes from it).

Limits can be determined with different methods depending on what the expression looks like
and on whether the variable tends to a number or to infinity.

## The limit as the variable tends to a number

::: tips "Determining a limit as the variable tends to a number"
1. **Method 1:** Substitute the value that $x$ tends to directly and calculate.
2. **Method 2:** Factorise and simplify the expression, and then substitute
   the value that $x$ tends to.
3. **Method 3:** Make two tables and approach the value that $x$ tends to
   from below ("from the left") and from above ("from the right"). If they
   tend to the same limit, that is the limit of the expression. If they tend to different
   values, there is no limit.

The methods are sorted by how efficient they are. If method 1 does not work, move
on to method 2. If method 2 does not work, move on to method 3.
:::

::: exempel "Example 1: Substituting the value directly"
**Determine $\displaystyle\lim_{x \to 2} (x + 5)$.**

::: handskrift
typ: granssattain
:::

::: textlosning
The expression $x + 5$ is defined for all $x$, so method 1 works: we substitute
$x = 2$ directly (at the same time as the lim notation is removed) and calculate.

$$
\lim_{x \to 2} (x + 5) = 2 + 5 = 7
$$

**Answer:** $7$
:::
:::

::: exempel "Example 2: Simplifying the expression"
**Determine $\displaystyle\lim_{x \to 1} \frac{x^2 - 1}{x - 1}$ a) with tables
b) by simplifying the expression.**

::: handskrift
typ: gransforkorta
:::

::: textlosning
Method 1 does not work: if we substitute $x = 1$ we get $\dfrac{0}{0}$, and
the expression is not defined there.

**a)** We make two tables and approach the value 1 from below and from
above.

| From below $x$ | $\dfrac{x^2 - 1}{x - 1}$ | From above $x$ | $\dfrac{x^2 - 1}{x - 1}$ |
| --- | --- | --- | --- |
| 0.9 | 1.9 | 1.1 | 2.1 |
| 0.99 | 1.99 | 1.01 | 2.01 |
| 0.999 | 1.999 | 1.001 | 2.001 |

Both from below and from above the expression approaches the value 2 as $x$ tends to
1, so

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2
$$

**b)** We factorise the numerator with the difference of two squares and cancel the
common factor $(x - 1)$.

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} \frac{(x + 1)(x - 1)}{x - 1} = \lim_{x \to 1} (x + 1)
$$

Now the expression is defined at $x = 1$, so we substitute the value (at the same time
as the lim notation is removed) and calculate.

$$
\lim_{x \to 1} (x + 1) = 1 + 1 = 2
$$

**Answer:** $2$
:::
:::

::: exempel "Example 3: No limit"
**Determine $\displaystyle\lim_{x \to 3} \frac{x + 1}{x - 3}$.**

::: handskrift
typ: granssaknas
:::

::: textlosning
Method 1 does not work since the denominator becomes 0 at $x = 3$. Nor can we
simplify the expression by method 2: neither the numerator nor the denominator
can be factorised. That leaves method 3: two tables where $x$ approaches 3
from below and from above.

| From below $x$ | $\dfrac{x + 1}{x - 3}$ | From above $x$ | $\dfrac{x + 1}{x - 3}$ |
| --- | --- | --- | --- |
| 2.9 | −39 | 3.1 | 41 |
| 2.99 | −399 | 3.01 | 401 |
| 2.999 | −3999 | 3.001 | 4001 |

From below the expression grows towards $-\infty$, while from above it grows towards
$+\infty$. Since we get **different** limits from below and from above,
there is no limit.

**Answer:** There is no limit.
:::
:::

## The limit as the variable tends to infinity

If only the numerator of an expression tends to infinity, the numerator is always
infinitely much larger than the denominator, however large the denominator is, and the limit
is then infinite. If instead only the denominator tends to infinity, the
denominator becomes infinitely much larger than the numerator, and the quotient tends to 0. If
**both** the numerator and the denominator tend to infinity, the expression must first be
simplified: constant terms can be crossed out since they vanish in comparison
with infinity (pouring a teaspoon of water into the sea still leaves the sea
"infinitely" much larger). Then the expression can be simplified and
the limit determined.

::: tips "Determining a limit as the variable tends to infinity"
If a variable $x$ tends to

- positive infinity, it is written $x \to \infty$ or $x \to +\infty$
- negative infinity, it is written $x \to -\infty$

An expression with infinity

- only in the numerator gives infinity as the limit
- only in the denominator gives 0 as the limit
- in both the numerator and the denominator is simplified by crossing out constant terms.
  Then the expression is simplified and the limit can be determined.
:::

::: exempel "Example 4: Infinity in the denominator"
**Determine $\displaystyle\lim_{x \to \infty} \frac{5}{x}$.**

::: handskrift
typ: gransoandlig
:::

::: textlosning
We have a limit with infinity only in the denominator. The limit is
then 0.

**Answer:** $0$
:::
:::

::: exempel "Example 5: Infinity in both the numerator and the denominator"
**Determine $\displaystyle\lim_{x \to \infty} \frac{3x + 2}{x - 1}$.**

::: handskrift
typ: gransbadaoandliga
:::

::: textlosning
We have a limit with infinity in both the numerator and the denominator. We
cross out the constant terms, simplify and calculate.

$$
\lim_{x \to \infty} \frac{3x + 2}{x - 1} = \lim_{x \to \infty} \frac{3x}{x} = \lim_{x \to \infty} 3 = 3
$$

**Answer:** $3$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Limit"
- A **limit** is the value an expression approaches, without necessarily reaching it.
- Written $\lim_{x \to a} f(x)$ and read "the limit as $x$ tends to $a$".
- $\lim_{x \to \infty} \dfrac{1}{x} = 0$, since $\dfrac{1}{x}$ becomes as small as you like.
:::

::: sampunkt "The variable tends to a number"
1. Substitute the value directly and calculate.
2. If that does not work: factorise, simplify and then substitute the value.
3. If that does not work either: make two tables and approach the value from below and from above.
- The methods are tried in this order. Remove the lim notation in the same step as the value is substituted.
:::

::: sampunkt "When there is no limit"
- If the tables give **different** values from below and from above, there is no limit.
- $\dfrac{x + 1}{x - 3}$ tends to $-\infty$ from below and to $+\infty$ from above at $x = 3$, so there is no limit.
- The form $\dfrac{0}{0}$ does not mean that there is no limit, only that method 1 is not enough.
:::

::: sampunkt "The variable tends to infinity"
- Infinity only in the **numerator** gives infinity as the limit.
- Infinity only in the **denominator** gives the limit 0.
- Infinity in **both**: cross out the constant terms, simplify and calculate.
- $\lim_{x \to \infty} \dfrac{3x + 2}{x - 1} = \lim_{x \to \infty} \dfrac{3x}{x} = 3$.
:::

:::
