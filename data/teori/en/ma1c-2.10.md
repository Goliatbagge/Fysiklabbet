---
kalla: bd8c5b077b
id: ma1c-2.10
title: Power equations
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.10'
---

# Power equations

An equation where the variable, for example $x$, is a power ("raised to something")
is called a **power equation**. These can be solved with two algebraic methods:
with the laws of exponents or with root signs.

::: formel "Solving power equations with the laws of exponents"
$$
x^n = a \text{ has the solution}
$$

$$
x = a^{1/n}
$$

::: härledning "Derivation: Solving power equations with the laws of exponents"
We start from the general equation

$$
x^n = a
$$

We raise both sides to the inverse of the exponent, in this case $\dfrac{1}{n}$:

$$
\left(x^n\right)^{1/n} = a^{1/n}
$$

$$
x^{n/n} = a^{1/n}
$$

$$
x^1 = a^{1/n}
$$

$$
x = a^{1/n}
$$

Q.E.D.
:::
:::

::: formel "Solving power equations with root signs"
$$
x^n = a \text{ has the solution}
$$

$$
x = \sqrt[n]{a}
$$
:::

Raising something to the power of 2 is called **squaring**. So if you square $x$ you get
$x^2$, and if you square both sides of an equation you raise
both sides to the power of 2.

**NOTE!** If the exponent is an <u>even</u> integer, always write
$\pm$ in front of the root sign/power so that you do not miss double solutions. If
the exponent is an <u>odd</u> integer, however, $\pm$ should not be written.
The rule about $\pm$ only applies when the exponent is an integer. If the exponent is
a fraction or a decimal, $x$ must be positive, and then $\pm$ should
not be written.

::: formel "Number of solutions of a power equation"
A power equation $x^n = a$ where the exponent $n$ is an **even** integer has

- **two** solutions if the value under the root sign is positive, $a > 0$
- **one** solution if the value under the root sign is 0, $a = 0$
- **no** solution if the value under the root sign is negative, $a < 0$.

If $n$ is an **odd** integer, the equation always has **one** solution, whatever
the sign of $a$.
:::

::: exempel "Example 1: Solve the power equations"
**Solve the equations and round the answer to two decimal places.<br>a)&nbsp;$x^{14} = 80\,000$&emsp;&emsp;b)&nbsp;$3x^5 - 21 = 0$&emsp;&emsp;c)&nbsp;$x^{3.4} = 98$&emsp;&emsp;d)&nbsp;$x^{1/2} = 4$&emsp;&emsp;e)&nbsp;$x^{2/5} = 10$**

::: handskrift
typ: potensekvlos
:::

::: textlosning
**a)** **With the laws of exponents:**

$$
x^{14} = 80\,000
$$

$$
\left(x^{14}\right)^{1/14} = 80\,000^{1/14}
$$

$$
x = \pm 2.239\ldots \approx \pm 2.24
$$

**With root signs:**

$$
x = \pm\sqrt[14]{80\,000} = \pm 2.239\ldots \approx \pm 2.24
$$

(± since the exponent 14 is even.)

**Answer:** $x \approx \pm 2.24$

**b)** We start by isolating $x^5$:

$$
3x^5 - 21 = 0
$$

$$
3x^5 = 21
$$

$$
x^5 = 7
$$

Then we solve the equation with the laws of exponents or with root signs:

$$
x = 7^{1/5} = \sqrt[5]{7} = 1.475\ldots \approx 1.48
$$

(No ± since the exponent is odd.)

**Answer:** $x \approx 1.48$

**c)** We solve equations with a decimal in the exponent in the same
way:

$$
x = \sqrt[3.4]{98} = 98^{1/3.4} = 3.851\ldots \approx 3.85
$$

**Answer:** $x \approx 3.85$

**d)** When there is a fraction in the exponent, we start by getting rid of the *denominator* in
the exponent by raising both sides to it. Here the denominator is 2, so we
square both sides:

$$
\left(x^{1/2}\right)^2 = 4^2
$$

$$
x = 16
$$

**Answer:** $x = 16$

**e)** Again we have a fraction in the exponent. We raise both sides
directly to the inverse of the exponent, $\dfrac{5}{2}$:

$$
\left(x^{2/5}\right)^{5/2} = 10^{5/2}
$$

The exponent on the left-hand side becomes $\dfrac{2}{5} \cdot \dfrac{5}{2} = 1$:

$$
x = 10^{5/2} = 316.227\ldots \approx 316.23
$$

(No ± since a power with a fraction in the exponent can only be calculated
for positive $x$.)

**Alternative solution:** First we raise both sides to the exponent's
denominator 5:

$$
\left(x^{2/5}\right)^5 = 10^5
$$

$$
x^2 = 100\,000
$$

This equation has two solutions:

$$
x = \pm\sqrt{100\,000} = \pm 316.227\ldots
$$

But in the original equation $x$ is raised to a fraction, and then
$x$ must be positive. The negative solution is therefore discarded:

$$
x \approx 316.23
$$

**Answer:** $x \approx 316.23$
:::
:::

::: exempel "Example 2: Determine the number of solutions"
**Determine the number of solutions of the equation<br>a)&nbsp;$x^{12} = 154$&emsp;&emsp;b)&nbsp;$x^4 = 0$&emsp;&emsp;c)&nbsp;$x^{100} = -50$&emsp;&emsp;d)&nbsp;$x^{99} = -5$**

::: handskrift
typ: antallosningar
:::

::: textlosning
**a)** Even exponent and positive right-hand side:

$$
x = \pm\sqrt[12]{154}
$$

**Answer:** Two solutions

**b)** Even exponent but the right-hand side is 0:

$$
x = \pm\sqrt[4]{0} = 0
$$

(± is written since the exponent is even, but $+0$ and $-0$ are the same number.)

**Answer:** One solution

**c)** Even exponent and negative right-hand side:

$$
x = \pm\sqrt[100]{-50}
$$

Even root and a negative value under the root sign ⟹ no solution.

**Answer:** No solutions

**d)** Odd exponent:

$$
x = \sqrt[99]{-5}
$$

Odd root ⟹ always one solution, whatever the sign of the number under the root sign.

**Answer:** One solution
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Power equation"
- An equation where **the variable is the base** and is raised to something,
  such as $x^n = a$.
- Do not confuse it with an exponential equation, where the variable is in
  the exponent.
- **Squaring** means raising to the power of 2.
:::

::: sampunkt "Two ways to solve"
- **With the laws of exponents**: raise both sides to $\dfrac{1}{n}$, which gives
  $x = a^{1/n}$.
- **With root signs**: $x = \sqrt[n]{a}$.
- It is the same thing, since $a^{1/n} = \sqrt[n]{a}$.
:::

::: sampunkt "Number of solutions"
- **Even** exponent: two, one or no solutions. Write $\pm$ in front.
- **Odd** exponent: always **exactly one** solution, and no $\pm$.
- $x^{12} = 154$ gives two, $x^4 = 0$ gives one,
  $x^{100} = -50$ gives none, $x^{99} = -5$ gives one.
:::

::: sampunkt "Method"
1. Get the power **alone** on one side.
2. Raise both sides to the inverse of the exponent.
3. Write $\pm$ if the exponent is an even integer.
- Fractional exponent: $x^{2/5} = 10$ is solved by raising both sides to
  $\dfrac{5}{2}$. With a fraction or decimal in the exponent, $x$ must be
  positive, so the answer has no $\pm$.
:::
:::
