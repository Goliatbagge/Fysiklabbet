---
kalla: 6d0fe0cfcc
id: ma2c-2.6
title: Number of solutions to a quadratic equation
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.6'
---

# Number of solutions to a quadratic equation

The *pq* formula says that the equation $x^2 + px + q = 0$ has the solutions

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

The expression under the root sign, $\left(\dfrac{p}{2}\right)^2 - q$, is called the
**discriminant**. By examining the sign of the discriminant, we can
decide how many solutions the equation has.

::: härledning "Investigation: The sign of the discriminant"
**Positive discriminant.** The equation $x^2 + 6x - 7 = 0$ has the solutions

$$
x = -3 \pm \sqrt{3^2 + 7} = -3 \pm \sqrt{16}
$$

We have a **positive discriminant** (16) and we get **two solutions**
($x = -3 \pm 4$).

**The discriminant 0.** The equation $x^2 + 6x + 9 = 0$ has the solutions

$$
x = -3 \pm \sqrt{3^2 - 9} = -3 \pm \sqrt{0}
$$

We have **the discriminant 0** and we get **one solution** ($x = -3$).

**Negative discriminant.** The equation $x^2 + 6x + 18 = 0$ has
the solutions

$$
x = -3 \pm \sqrt{3^2 - 18} = -3 \pm \sqrt{-9}
$$

We have a **negative discriminant** (−9) and the equation **has no
solutions**, since we cannot take the square root of a negative number
(no number multiplied by itself gives −9).
:::

We summarise the investigation:

| If the discriminant is … | … the equation has … |
| --- | --- |
| positive | two solutions |
| zero | one solution |
| negative | zero solutions |

::: exempel "Example 1: Give the number of solutions"
**Give the number of solutions to<br>a)&nbsp;$x^2 + 12x - 13 = 0$&emsp;&emsp;b)&nbsp;$x^2 + 5x + 8 = 0$**

::: handskrift
typ: diskriminanten
:::

::: textlosning
**a)** The *pq* formula gives

$$
x = -6 \pm \sqrt{6^2 + 13} = -6 \pm \sqrt{36 + 13} = -6 \pm \sqrt{49}
$$

The discriminant (the number under the root sign) is **positive** (49). So
the equation has **two solutions**.

**Answer:** 2

**b)** The *pq* formula gives

$$
x = -2.5 \pm \sqrt{2.5^2 - 8} = -2.5 \pm \sqrt{6.25 - 8} = -2.5 \pm \sqrt{-1.75}
$$

The discriminant is **negative**. So the equation **has no** solutions.

**Answer:** 0
:::
:::

::: exempel "Example 2: Double root"
**For which values of $a$ does the equation $x^2 - 8x + a = 0$ have
a single solution (a so-called double root)?**

::: handskrift
typ: dubbelrot
:::

::: textlosning
For the equation to have a single solution, the discriminant must equal
0. We start a solution with the *pq* formula:

$$
x = 4 \pm \sqrt{4^2 - a}
$$

We now set the discriminant equal to 0 and solve the equation:

$$
4^2 - a = 0
$$

$$
16 - a = 0
$$

$$
16 = a
$$

So we get a single solution when $a = 16$.

**Answer:** $a = 16$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The discriminant"
- The expression **under the root sign** in the *pq* formula:
  $\left(\dfrac{p}{2}\right)^{2} - q$.
- In the *abc* formula it is $b^2 - 4ac$.
- Its **sign** decides how many solutions the equation has.
:::

::: sampunkt "The three cases"
- **Positive** discriminant: **two** solutions.
- **Zero**: **one** solution, a so-called **double root**.
- **Negative**: **zero** solutions, since you cannot take the square root of a
  negative number.
:::

::: sampunkt "How to do it"
- Start the solution with the *pq* formula, but only calculate **the number under
  the root**.
- Look at the sign. You do not need to finish the calculation.
:::

::: sampunkt "Finding the value for a double root"
- Set **the discriminant equal to 0** and solve for the unknown constant.
- $x^2 - 8x + a = 0$ gives $4^2 - a = 0$, so $a = 16$.
:::

::: sampunkt "The connection to the graph"
- The discriminant tells how many times the parabola **crosses the $x$-axis**: two,
  one or none.
:::
:::
