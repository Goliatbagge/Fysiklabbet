---
kalla: e49fd30bf5
id: ma1c-2.11
title: Inequalities
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.11'
---

# Inequalities

When two sides are equal we have an **equation** (an equality), which is written with
an equals sign, =. When two sides are different we have an **inequality**, which is written with
an inequality sign. There are several inequality signs.

::: formel "Inequality signs"
| Sign | Meaning (read from left to right) |
| --- | --- |
| < | less than |
| > | greater than |
| ≤ | less than or equal to |
| ≥ | greater than or equal to |

Example: $3x - 4 = 2$ is an <u>equation</u>. $3x - 4 < 2$ is an <u>inequality</u>.
:::

The meaning of the inequality signs applies when we read from left to right.
So we read $3 < 5$ as "3 is less than 5".

One way to remember is that the inequality sign "opens towards" the *larger* value. Another
is to think of it as an arrow pointing at the *smaller* value.

::: formel "Solving inequalities"
Inequalities are solved in the same way as equations, but the inequality sign is **reversed**
when *dividing or multiplying by negative numbers*. We solve inequalities of the second
degree by investigating the boundary case (see the example below).

::: härledning "Investigation: Reversing the inequality sign"
We know that $5 > 3$.

If we multiply or divide by a negative number, for example (−1), we
get

$$
5 \cdot (-1) > 3 \cdot (-1)
$$

$$
-5 > -3
$$

But this is false, since −5 is *less* than −3. So the
inequality sign must be reversed, that is, $-5 < -3$, when multiplying and dividing
by negative numbers.
:::
:::

::: exempel "Example 1: Solve the inequalities"
**Solve<br>a)&nbsp;$3x - 5 < 22$&emsp;&emsp;b)&nbsp;$7(6 - x) \leq 105$&emsp;&emsp;c)&nbsp;$\dfrac{6a}{5} > 3a - 18$**

::: handskrift
typ: losolikhet
:::

::: textlosning
**a)** We add 5 to both sides:

$$
3x - 5 + 5 < 22 + 5
$$

$$
3x < 27
$$

We divide both sides by 3:

$$
\frac{3x}{3} < \frac{27}{3}
$$

$$
x < 9
$$

**Answer:** $x < 9$

**b)** We expand the bracket:

$$
42 - 7x \leq 105
$$

We subtract 42 from both sides:

$$
42 - 7x - 42 \leq 105 - 42
$$

$$
-7x \leq 63
$$

We divide both sides by (−7). Since we are dividing by a negative
number, the inequality sign must be reversed:

$$
\frac{-7x}{-7} \geq \frac{63}{-7}
$$

$$
x \geq -9
$$

**Answer:** $x \geq -9$

**c)** We multiply both sides by 5 (which corresponds to numerator = quotient
· denominator):

$$
5 \cdot \frac{6a}{5} > 5 \cdot (3a - 18)
$$

$$
6a > 5(3a - 18)
$$

$$
6a > 15a - 90
$$

We have variable terms on both sides. We remove the $a$-term from the LHS and
then solve as usual. Subtract $6a$ from both sides:

$$
0 > 9a - 90
$$

Add 90 to both sides:

$$
90 > 9a
$$

Divide by 9:

$$
\frac{90}{9} > \frac{9a}{9}
$$

$$
10 > a
$$

When we answer with an inequality, we usually want the variable to the left
of the inequality sign. When we now swap "10" and "$a$", the
inequality sign must also be reversed, that is, $a < 10$.

**Answer:** $a < 10$
:::
:::

::: exempel "Example 2: Inequalities of the second degree"
**Solve<br>a)&nbsp;$x^2 < 4$&emsp;&emsp;b)&nbsp;$x^2 > 4$**

::: handskrift
typ: andragradsolikhet
:::

::: textlosning
**a)** We solve inequalities of the second degree in a different way. We
investigate what holds at the boundary of the interval.

At the boundary of the interval, $x^2 = 4$, where the solution is
$x = \pm\sqrt{4} = \pm 2$.

We draw a number line and place points at $x = -2$ and $x = 2$. For
$x^2 < 4$ to hold, $x$ must now be *between* −2 and 2, which we
can show with a line segment between them:

::: figur
<svg viewBox="20 16 424 38" width="664" height="60" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A number line from minus 6 to 6 with open circles at minus 2 and 2 and a marked segment between them: the solution is all numbers between minus 2 and 2."><line x1="32" y1="28" x2="428" y2="28" stroke="#1f2530" stroke-width="1.4"/><line x1="38" y1="24" x2="38" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="38" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−6</text><line x1="70" y1="24" x2="70" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="70" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><line x1="102" y1="24" x2="102" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="102" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><line x1="134" y1="24" x2="134" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="134" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="166" y1="24" x2="166" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="166" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="198" y1="24" x2="198" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="198" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="230" y1="24" x2="230" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="230" y="46" font-size="12" text-anchor="middle" fill="#1f2530">0</text><line x1="262" y1="24" x2="262" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="262" y="46" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="294" y1="24" x2="294" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="294" y="46" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="326" y1="24" x2="326" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="326" y="46" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="358" y1="24" x2="358" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="358" y="46" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="390" y1="24" x2="390" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="390" y="46" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="422" y1="24" x2="422" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="422" y="46" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="172" y1="28" x2="288" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><circle cx="166" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="294" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/></svg>
:::

This interval is described by $-2 < x < 2$.

**Answer:** $-2 < x < 2$

**b)** We study the boundary of the interval, which again is $x^2 = 4$, where
the solution is $x = \pm\sqrt{4} = \pm 2$. In the same way as in
part a), we place points at $x = -2$ and $x = 2$.

For $x^2 > 4$ to hold, $x$ must now be *greater than 2* or
*less than −2*, which can be shown with the rays below:

::: figur
<svg viewBox="20 16 424 38" width="664" height="60" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A number line from minus 6 to 6 with open circles at minus 2 and 2 and marked rays outwards from them: the solution is all numbers less than minus 2 or greater than 2."><line x1="32" y1="28" x2="428" y2="28" stroke="#1f2530" stroke-width="1.4"/><line x1="38" y1="24" x2="38" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="38" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−6</text><line x1="70" y1="24" x2="70" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="70" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−5</text><line x1="102" y1="24" x2="102" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="102" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−4</text><line x1="134" y1="24" x2="134" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="134" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−3</text><line x1="166" y1="24" x2="166" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="166" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−2</text><line x1="198" y1="24" x2="198" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="198" y="46" font-size="12" text-anchor="middle" fill="#1f2530">−1</text><line x1="230" y1="24" x2="230" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="230" y="46" font-size="12" text-anchor="middle" fill="#1f2530">0</text><line x1="262" y1="24" x2="262" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="262" y="46" font-size="12" text-anchor="middle" fill="#1f2530">1</text><line x1="294" y1="24" x2="294" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="294" y="46" font-size="12" text-anchor="middle" fill="#1f2530">2</text><line x1="326" y1="24" x2="326" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="326" y="46" font-size="12" text-anchor="middle" fill="#1f2530">3</text><line x1="358" y1="24" x2="358" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="358" y="46" font-size="12" text-anchor="middle" fill="#1f2530">4</text><line x1="390" y1="24" x2="390" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="390" y="46" font-size="12" text-anchor="middle" fill="#1f2530">5</text><line x1="422" y1="24" x2="422" y2="32" stroke="#1f2530" stroke-width="1.2"/><text x="422" y="46" font-size="12" text-anchor="middle" fill="#1f2530">6</text><line x1="36" y1="28" x2="160" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><polygon points="24,28 36,23 36,33" fill="#2563c9"/><line x1="300" y1="28" x2="424" y2="28" stroke="#2563c9" stroke-width="3.5" stroke-linecap="butt"/><polygon points="436,28 424,23 424,33" fill="#2563c9"/><circle cx="166" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/><circle cx="294" cy="28" r="5.5" fill="#f7f2e8" stroke="#2563c9" stroke-width="2"/></svg>
:::

These intervals are described by $x < -2$ and $x > 2$.

**Answer:** $x < -2$ or $x > 2$.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The inequality signs"
- $<$ less than, $>$ greater than.
- $\leq$ less than or equal to, $\geq$ greater than or equal to.
- The sign **opens towards the larger** value, or points at the smaller one like
  an arrow.
:::

::: sampunkt "Equation or inequality"
- $3x - 4 = 2$ is an **equation**, with a definite answer.
- $3x - 4 < 2$ is an **inequality**, with a whole **interval** of
  solutions.
:::

::: sampunkt "Solving works as for equations"
- The same operations on both sides, just as usual.
:::

::: sampunkt "The crucial rule"
- **The inequality sign is reversed when multiplying or dividing by a
  negative number.**
- Why: $5 > 3$, but multiplied by $-1$ it becomes
  $-5 < -3$.
- Just **moving** terms, on the other hand, does not reverse anything.
:::

::: sampunkt "Quadratic inequalities"
- Solve the **boundary case** as an ordinary equation, that is, with an equals sign.
- Then investigate which interval satisfies the inequality, for example
  by testing a value in each part.
:::
:::
