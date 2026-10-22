---
kalla: 3c45bb3cb1
id: ma2c-2.4
title: 'The *pq* formula'
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.4'
---

# The *pq* formula

Equations that contain $x^2$-terms, $x$-terms **and**
constant terms can be solved neither with our usual method nor with
the zero product method. We solve these equations with **the *pq* formula**.

::: formel "The *pq* formula"
$$
x^2 + px + q = 0
$$

has the solutions

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

::: härledning "Derivation: The *pq* formula"
We start from the equation

$$
x^2 + px + q = 0
$$

We subtract $q$ from both sides to get the $x$-terms alone on the left-hand side:

$$
x^2 + px = -q
$$

We add $\left(\dfrac{p}{2}\right)^2$ to both sides, so that the left-hand side can
be written as a square rule:

$$
x^2 + px + \left(\frac{p}{2}\right)^2 = \left(\frac{p}{2}\right)^2 - q
$$

$$
\left(x + \frac{p}{2}\right)^2 = \left(\frac{p}{2}\right)^2 - q
$$

We take the square root of both sides and then solve for $x$:

$$
x + \frac{p}{2} = \pm\sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

Q.E.D.
:::
:::

The formula in words: first **half the coefficient in front of the $x$-term with
the sign changed**, then plus/minus the square root of **the previous number raised
to the power 2** (any minus sign in front can be ignored) **minus
the constant term with the sign changed**.

**NOTE!** A condition for using the *pq* formula is that
the equation equals 0 **and** that we have no coefficient
in front of the $x^2$-term.

::: exempel "Example 1: Solve the equations"
**Solve the equations<br>a)&nbsp;$x^2 + 6x - 7 = 0$&emsp;&emsp;b)&nbsp;$3x^2 - 15x + 18 = 0$&emsp;&emsp;c)&nbsp;$x^2 = 39 - 10x$**

::: handskrift
typ: pqformeln2c
:::

::: textlosning
**a)** We identify $p$ and $q$: $p = 6$ and $q = -7$.

Substituting these into the *pq* formula gives

$$
x = -\frac{6}{2} \pm \sqrt{\left(\frac{6}{2}\right)^2 - (-7)}
$$

$$
x = -3 \pm \sqrt{3^2 + 7} = -3 \pm \sqrt{9 + 7} = -3 \pm \sqrt{16} = -3 \pm 4
$$

This gives the solutions

$$
x_1 = -3 - 4 = -7
$$

$$
x_2 = -3 + 4 = 1
$$

**Answer:** $x_1 = -7$ and $x_2 = 1$

Comment, a quicker solution "in words": half the coefficient in front of
the $x$-term with the sign changed is $-3$; under the root sign we write
the previous number (3) raised to the power 2, and the constant term with the sign changed
($-7$ becomes $+7$). So we can directly write $x = -3 \pm \sqrt{3^2 + 7}$.

**b)** To be able to use the *pq* formula, we divide both sides by 3 to
get rid of the coefficient in front of the $x^2$-term:

$$
x^2 - 5x + 6 = 0
$$

The *pq* formula gives

$$
x = \frac{5}{2} \pm \sqrt{\left(\frac{5}{2}\right)^2 - 6} = \frac{5}{2} \pm \sqrt{\frac{25}{4} - \frac{24}{4}} = \frac{5}{2} \pm \sqrt{\frac{1}{4}} = \frac{5}{2} \pm \frac{1}{2}
$$

This gives the solutions

$$
x_1 = \frac{5}{2} - \frac{1}{2} = \frac{4}{2} = 2
$$

$$
x_2 = \frac{5}{2} + \frac{1}{2} = \frac{6}{2} = 3
$$

**Answer:** $x_1 = 2$ and $x_2 = 3$

**c)** To be able to use the *pq* formula, we rearrange the equation so that one
side equals 0:

$$
x^2 + 10x - 39 = 0
$$

Now we use the *pq* formula:

$$
x = -5 \pm \sqrt{5^2 + 39} = -5 \pm \sqrt{64} = -5 \pm 8
$$

This gives the solutions

$$
x_1 = -5 - 8 = -13
$$

$$
x_2 = -5 + 8 = 3
$$

**Answer:** $x_1 = -13$ and $x_2 = 3$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "When the formula is used"
- Equations with an $x^2$-term, an $x$-term **and** a constant term.
- That is, a **complete** quadratic equation.
:::

::: sampunkt "The *pq* formula"
- $x^2 + px + q = 0$ has the solutions
- $x = -\dfrac{p}{2} \pm
  \sqrt{\left(\dfrac{p}{2}\right)^{2} - q}$
:::

::: sampunkt "Two requirements before you use it"
- The equation must be **equal to 0**.
- There must **not** be a coefficient in front of $x^2$. If there is,
  divide the whole equation by it first.
:::

::: sampunkt "The formula in words"
- Half the coefficient in front of the $x$-term, with **the sign changed**.
- Plus minus the square root of: the previous number squared, minus the constant term with
  **the sign changed**.
:::

::: sampunkt "Common traps"
- $p$ and $q$ are taken **with their signs**. If $q = -7$, it becomes
  $-(-7) = +7$ under the root.
- Do not forget $\pm$. It gives the **two** solutions.
- Check by substituting the answers into the original equation.
:::
:::
