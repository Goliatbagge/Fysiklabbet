---
kalla: 964e8574b4
id: ma1c-2.5
title: The basics of solving equations
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.5'
---

# The basics of solving equations

When we have an expression that must be equal to another expression, we have an
**equation**. So an equation always contains some variable, for example
$x$, and an equals sign, =. When solving an equation we must determine the value
of the variable. We do this by **isolating** the variable, for example $x$, so that
it stands alone on one side of the equals sign.

::: formel "Root, linear equation and quadratic equation"
A **root** is a solution to an equation. The words mean the same thing: the root
of the equation $3x + 2 = 23$ is $x = 7$.

Equations are sorted by the **highest exponent** that the variable has:

- **Linear equation** (first-degree equation): the highest exponent of the variable is 1, for example
  $3x + 2 = 23$. You cannot see that $x$ means $x^1$, since the exponent 1
  is never written. Equations like these are what this section is about.
- **Quadratic equation**: the highest exponent of the variable is 2, for example
  $x^2 - 5x + 4 = 0$. How they are solved comes in a later section.
:::

To isolate $x$ we use a few basic rules that depend on which operation we
have. The basic principle is that whatever we do on one side of the equals sign
we must also do on the other side of the equals sign, otherwise the equation will
no longer hold.

We can always test whether a solution is correct by substituting it into the
original equation. **IMPORTANT! Trial and error (testing your way to a
solution) is not allowed when solving equations!**

::: formel "The basics of solving equations"
**Addition**: to get rid of a term that is added, we *subtract* it
from both sides:

$$
x + 36 = 53
\qquad
x + 36 \mathbin{\mathbf{-}} \mathbf{36} = 53 \mathbin{\mathbf{-}} \mathbf{36}
\qquad
x = 17
$$

**Subtraction**: to get rid of a term that is subtracted, we *add*
it to both sides:

$$
x - 24 = 72
\qquad
x - 24 \mathbin{\mathbf{+}} \mathbf{24} = 72 \mathbin{\mathbf{+}} \mathbf{24}
\qquad
x = 96
$$

**Multiplication**: to get rid of a factor that multiplies, we
*divide* both sides by it:

$$
7x = 84
\qquad
\frac{7x}{\mathbf{7}} = \frac{84}{\mathbf{7}}
\qquad
x = 12
$$

**Division**: to get rid of a denominator that divides, we *multiply*
both sides by it:

$$
\frac{x}{13} = 6
\qquad
\frac{x}{13} \mathbin{\boldsymbol{\cdot}} \mathbf{13} = 6 \mathbin{\boldsymbol{\cdot}} \mathbf{13}
\qquad
x = 78
$$
:::

::: exempel "Example 1: Solve the equations"
**Solve<br>a)&nbsp;$4x + 7 = 35$&emsp;&emsp;b)&nbsp;$\dfrac{7x}{6} - 15 = -11$**

::: handskrift
typ: ekvgrund
:::

::: textlosning
**a)** First we subtract 7 from both sides:

$$
4x + 7 - 7 = 35 - 7
$$

$$
4x = 28
$$

Then we divide both sides by 4:

$$
\frac{4x}{4} = \frac{28}{4}
$$

$$
x = 7
$$

**Check:** We check that $x = 7$ is a solution to the equation
by replacing $x$ with 7 in the original equation $4x + 7 = 35$:

$$
\mathrm{LHS} = 4 \cdot 7 + 7 = 28 + 7 = 35
$$

$$
\mathrm{RHS} = 35
$$

$\mathrm{LHS} = \mathrm{RHS}$ ⟹ Correct!

**Answer:** $x = 7$

**b)** First we add 15 to both sides:

$$
\frac{7x}{6} - 15 + 15 = -11 + 15
$$

$$
\frac{7x}{6} = 4
$$

Then we multiply both sides by 6:

$$
\frac{7x}{6} \cdot 6 = 4 \cdot 6
$$

$$
7x = 24
$$

Finally we divide both sides by 7:

$$
\frac{7x}{7} = \frac{24}{7}
$$

$$
x = \frac{24}{7}
$$

**Answer:** $x = \dfrac{24}{7}$ (do not round!)
:::
:::

::: härledning "Note: Round or not?"
In **pure mathematics**, when the task is just an equation to be solved,
we **never** round. The answer is left exact, like $x = \dfrac{24}{7}$ in
Example 1 b). A rounded number is no longer a solution to the equation:
if we substitute $x = 3.4$, the equality does not hold exactly.

In an **application**, when the equation describes a real situation (a
price, a distance, a number of people), we almost **always** round.
The answer must be a number that can be used, for example 3.43 kr or
24 people, and the situation decides how many decimals are reasonable.
:::

::: sammanfattning "Summary"

::: sampunkt "What an equation is"
- Two expressions that must be **equal**. Always contains a variable and an
  equals sign.
- Solving it means getting the variable **alone** on one side. The solution
  is also called a **root**.
- **Linear equation**: the highest exponent of the variable is 1, as in
  $3x + 2 = 23$. **Quadratic equation**: the highest exponent is 2, as in
  $x^2 - 5x + 4 = 0$.
:::

::: sampunkt "The basic principle"
- **Whatever you do to one side you must do to the other.** Otherwise
  the equality no longer holds.
:::

::: sampunkt "The four operations"
- Term that is **added**: subtract it from both sides.
- Term that is **subtracted**: add it to both sides.
- Factor that **multiplies**: divide both sides by it.
- Denominator that **divides**: multiply both sides by it.
:::

::: sampunkt "Checking and rules"
- Substitute your answer into the **original** equation and check.
- **Trial and error, that is, testing your way, is not allowed** as a
  solution method.
- In pure mathematics the answer is **never** rounded; leave it as a fraction:
  $x = \dfrac{24}{7}$. In a real-world application it is almost
  always rounded.
:::
:::
