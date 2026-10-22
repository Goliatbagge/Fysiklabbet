---
kalla: 9f43e9e0f3
id: ma1c-2.7
title: Equations with denominators
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.7'
---

# Equations with denominators

**NOTE! When we have equations with variables, for example $x$, in the denominator, the variable must
not take a value that makes the denominator equal to 0**, since
division by 0 is not defined. Before we solve such equations we write down
which values of the variable are *not* allowed.

It is quite often the denominator that makes an equation hard to solve, so to
solve equations with denominators, one key is to get rid of the denominators quickly.
Getting rid of the denominators can be done in different ways, depending on what
the equation looks like. There are three common variants.

::: formel "1. One fraction term on one side, no fraction term on the other side"
**Method:** The numerator equals the product of the quotient and the denominator.
:::

::: exempel "Example 1: One fraction term"
**Solve $\dfrac{130}{3x} = 5$.**

::: handskrift
typ: enbrakterm
:::

::: textlosning
We have $3x$ in the denominator, so $3x \neq 0$, which gives $x \neq 0$.

The numerator equals the product of the quotient and the denominator:

$$
130 = 5 \cdot 3x
$$

$$
130 = 15x
$$

$$
\frac{130}{15} = \frac{15x}{15}
$$

$$
\frac{26}{3} = x
$$

**Answer:** $x = \dfrac{26}{3}$
:::
:::

::: formel "2. One fraction term on one side, one fraction term on the other side"
**Method:** Cross-multiplication.
:::

::: exempel "Example 2: Cross-multiplication"
**Solve $\dfrac{9}{2x} = \dfrac{3}{8}$.**

::: handskrift
typ: korsvis
:::

::: textlosning
We have $2x$ in the denominator, so $2x \neq 0$, which gives $x \neq 0$.

We multiply "crosswise", that is, we multiply the numerator of one fraction
by the denominator of the other fraction and vice versa. The order does not
matter!

::: figur
<svg viewBox="6 2 100 82" width="127" height="104" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The fraction 9 over 2x equals the fraction 3 over 8. Arrows cross: the numerator 9 is multiplied by the denominator 8, and the denominator 2x is multiplied by the numerator 3. Below are the products 3 times 2x and 9 times 8."><text x="30" y="21" font-size="15" text-anchor="middle" fill="#1f2530">9</text><line x1="19" y1="26" x2="41" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="43" font-size="15" text-anchor="middle" fill="#1f2530">2<tspan font-style="italic">x</tspan></text><text x="56" y="32" font-size="15" text-anchor="middle" fill="#1f2530">=</text><text x="82" y="21" font-size="15" text-anchor="middle" fill="#1f2530">3</text><line x1="72" y1="26" x2="92" y2="26" stroke="#1f2530" stroke-width="1.2"/><text x="82" y="43" font-size="15" text-anchor="middle" fill="#1f2530">8</text><line x1="36" y1="22" x2="74" y2="38" stroke="#c8324a" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(78,39.7) rotate(23)" fill="#c8324a"/><line x1="38" y1="38" x2="74" y2="23" stroke="#2563c9" stroke-width="1.3"/><polygon points="0,0 -6,3 -6,-3" transform="translate(78,21.3) rotate(-23)" fill="#2563c9"/><text x="30" y="76" font-size="14" text-anchor="middle" fill="#2563c9">3 · 2<tspan font-style="italic">x</tspan></text><text x="82" y="76" font-size="14" text-anchor="middle" fill="#c8324a">9 · 8</text></svg>
:::

$$
3 \cdot 2x = 9 \cdot 8
$$

$$
6x = 72
$$

$$
\frac{6x}{6} = \frac{72}{6}
$$

$$
x = 12
$$

**Answer:** $x = 12$
:::
:::

::: formel "3. Three or more fraction terms in an equation"
**Method:** Multiply both sides by the LCD (lowest common denominator)
or rewrite both sides as one fraction and use cross-multiplication.
:::

::: exempel "Example 3: Three fraction terms"
**Solve $\dfrac{x}{3} + \dfrac{1}{4} = \dfrac{5}{6}$.**

::: handskrift
typ: trebrak
:::

::: textlosning
**Alternative 1: Multiply by the LCD (or any common denominator)**

There are a few different ways to find the LCD or a common denominator,
but one way is to look at the numbers in the denominators. We have
3, 4 and 6. Then you think: "What is the smallest number I can think of that is
divisible by 3, 4 and 6?". The answer is 12. Then 12 is the lowest common
denominator. (You may have noticed that 24 is divisible by 3, 4 and 6, and then it is
fine to multiply both sides by 24 as well; the main thing is that we find a
common denominator.)

We multiply both sides by LCD = 12:

$$
12\left(\frac{x}{3} + \frac{1}{4}\right) = 12 \cdot \frac{5}{6}
$$

$$
\frac{12x}{3} + \frac{12 \cdot 1}{4} = \frac{12 \cdot 5}{6}
$$

$$
4x + 3 = 10
$$

$$
4x + 3 - 3 = 10 - 3
$$

$$
4x = 7
$$

$$
\frac{4x}{4} = \frac{7}{4}
$$

$$
x = \frac{7}{4}
$$

**Answer:** $x = \dfrac{7}{4}$

**Alternative 2: Rewrite both sides as one fraction and use
cross-multiplication**

We expand the fractions on the LHS by each other's denominators to give them
a common denominator:

$$
\frac{x \cdot 4}{3 \cdot 4} + \frac{1 \cdot 3}{4 \cdot 3} = \frac{5}{6}
$$

$$
\frac{4x}{12} + \frac{3}{12} = \frac{5}{6}
$$

$$
\frac{4x + 3}{12} = \frac{5}{6}
$$

Now we use cross-multiplication:

$$
6(4x + 3) = 12 \cdot 5
$$

$$
24x + 18 = 60
$$

$$
24x + 18 - 18 = 60 - 18
$$

$$
24x = 42
$$

$$
x = \frac{42}{24} = \frac{42/2}{24/2} = \frac{21}{12} = \frac{21/3}{12/3} = \frac{7}{4}
$$

**Answer:** $x = \dfrac{7}{4}$
:::
:::

::: exempel "Example 4: Variables in the denominators"
**Solve $\dfrac{5}{3x} - \dfrac{1}{2x} = \dfrac{1}{6}$.**

::: handskrift
typ: variabelnamnare
:::

::: textlosning
We have $3x$ and $2x$ in the denominators, both of which give $x \neq 0$.

This is a variant with three fractions, so we solve it by multiplying
both sides by the LCD. Notice that the LCD must also be divisible by $x$,
since $x$ appears in the denominators. So LCD = $6x$.

When we multiply by LCD = $6x$, we can do it directly by
multiplying *each numerator* by $6x$, which makes the solution quicker:

$$
\frac{6x \cdot 5}{3x} - \frac{6x \cdot 1}{2x} = \frac{6x \cdot 1}{6}
$$

$$
2 \cdot 5 - 3 \cdot 1 = x \cdot 1
$$

$$
10 - 3 = x
$$

$$
7 = x
$$

**Answer:** $x = 7$
:::
:::

::: exempel "Example 5: When the solution is not allowed"
**Solve $\dfrac{5x - 35}{x - 7} = 4$.**

::: handskrift
typ: ejtillaten
:::

::: textlosning
We have $(x - 7)$ in the denominator, so $x \neq 7$.

The numerator equals the product of the quotient and the denominator:

$$
5x - 35 = 4(x - 7)
$$

$$
5x - 35 = 4x - 28
$$

Subtract $4x$ from both sides:

$$
x - 35 = -28
$$

Add 35 to both sides:

$$
x = 7
$$

But $x \neq 7$, so the equation has no solution.

**Answer:** No solution.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "First: which values are forbidden"
- If the variable is in the **denominator**, it must never take a value that makes
  the denominator 0.
- **Write down the forbidden value before you solve.** If the answer is exactly that
  value, the equation has no solution.
:::

::: sampunkt "One fraction term on one side"
- Multiply both sides by the denominator.
- $\dfrac{130}{3x} = 5$ gives $130 = 5 \cdot 3x$.
:::

::: sampunkt "One fraction term on each side"
- **Cross-multiplication**: the numerator on one side times the denominator on
  the other.
- $\dfrac{9}{2x} = \dfrac{3}{8}$ gives
  $9 \cdot 8 = 3 \cdot 2x$.
:::

::: sampunkt "Three or more fraction terms"
- Multiply **both sides** by the lowest common denominator.
- Alternatively: rewrite each side as **a single** fraction and use
  cross-multiplication.
:::

::: sampunkt "The check at the end"
- Compare the answer with the forbidden values.
- $\dfrac{5x - 35}{x - 7} = 4$ gives $x = 7$, but 7 is exactly the value that makes the denominator 0.
  So there is **no solution**.
:::
:::
