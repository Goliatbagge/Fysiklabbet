---
kalla: 76f29435d8
id: ma2c-2.5
title: 'The *abc* formula'
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.5'
---

# The *abc* formula

There is another formula for solving complete
quadratic equations of the form $ax^2 + bx + c = 0$, called
**the *abc* formula** (the quadratic formula). Unlike the *pq* formula, the
coefficient in front of the $x^2$-term does not need to be "divided away" before the formula
is used.

::: formel "The *abc* formula"
$$
ax^2 + bx + c = 0
$$

has the solutions

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

::: härledning "Derivation: The *abc* formula"
We start from the equation

$$
ax^2 + bx + c = 0
$$

where $a \neq 0$. We divide both sides by $a$ so that the equation gets
the form that the *pq* formula requires:

$$
x^2 + \frac{b}{a}x + \frac{c}{a} = 0
$$

Now we can use the *pq* formula (which we derived in the previous section) with
$p = \dfrac{b}{a}$ and $q = \dfrac{c}{a}$:

$$
x = -\frac{b}{2a} \pm \sqrt{\left(\frac{b}{2a}\right)^2 - \frac{c}{a}}
$$

We rewrite the expression under the root sign with the common denominator $4a^2$:

$$
\left(\frac{b}{2a}\right)^2 - \frac{c}{a} = \frac{b^2}{4a^2} - \frac{4ac}{4a^2} = \frac{b^2 - 4ac}{4a^2}
$$

We take the square root of the numerator and the denominator separately. Since
$\sqrt{4a^2} = 2a$ (the sign of $a$ does not matter, since it is taken care of by
$\pm$), we get

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

Q.E.D.
:::
:::

::: exempel "Example 1: Solve with the *abc* formula"
**Solve the equation $2x^2 - 8x + 6 = 0$ with the *abc* formula.**

::: handskrift
typ: abcformeln
:::

::: textlosning
We write down the *abc* formula:

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

We identify $a$, $b$ and $c$ and see that $a = 2$, $b = -8$ and
$c = 6$. Substituting into the *abc* formula gives

$$
x = -\frac{-8}{2 \cdot 2} \pm \frac{\sqrt{(-8)^2 - 4 \cdot 2 \cdot 6}}{2 \cdot 2}
$$

$$
x = \frac{8}{4} \pm \frac{\sqrt{64 - 48}}{4}
$$

$$
x = 2 \pm \frac{\sqrt{16}}{4} = 2 \pm \frac{4}{4} = 2 \pm 1
$$

This gives the solutions

$$
x_1 = 2 - 1 = 1
$$

$$
x_2 = 2 + 1 = 3
$$

**Answer:** $x_1 = 1$ and $x_2 = 3$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The *abc* formula"
- $ax^2 + bx + c = 0$ has the solutions
- $x = -\dfrac{b}{2a}
  \pm \dfrac{\sqrt{b^2 - 4ac}}{2a}$
:::

::: sampunkt "The advantage"
- The coefficient in front of $x^2$ does **not** need to be divided away first.
- Practical when $a$ does not divide evenly into the other numbers.
:::

::: sampunkt "Identify a, b and c"
- $a$ is in front of $x^2$, $b$ in front of $x$, $c$ is the constant term.
- All three are taken **with their signs**.
- The equation must be written **equal to 0**.
:::

::: sampunkt "The formulas are connected"
- If you divide $ax^2 + bx + c = 0$ by $a$, you get
  $x^2 + \dfrac{b}{a}x + \dfrac{c}{a} = 0$.
- That is exactly the *pq* form with
  $p = \dfrac{b}{a}$ and $q = \dfrac{c}{a}$.
- So both formulas give the same answer. Choose the one that suits you.
:::
:::
