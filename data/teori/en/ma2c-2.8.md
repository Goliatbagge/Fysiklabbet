---
kalla: c6003052d6
id: ma2c-2.8
title: Radical equations
course: Matematik nivå 2c
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.8'
---

# Radical equations

An equation where the variable, for example $x$, is under a root sign is called a
**radical equation** (a square root equation).

::: tips "Solving radical equations: in general"
1. Isolate the term that contains the root expression.
2. Square both sides (to get rid of the root sign) and solve with a
   suitable method.
3. Check your solution! False roots can arise.
:::

::: tips "Solving radical equations: with a change of variable"
1. Substitute (replace) the root expression, for example $\sqrt{x}$, with another
   variable, for example $t$.
2. Write a new equation in $t$ and solve the equation.
3. Find the original variable $x$ using the value of $t$.
4. Check your solution! False roots can arise.
:::

::: exempel "Example 1: Solve the radical equations"
**Solve<br>a)&nbsp;$\sqrt{x} = 8$&emsp;&emsp;b)&nbsp;$\sqrt{x + 2} = 17$&emsp;&emsp;c)&nbsp;$x + 3\sqrt{x} - 4 = 0$**

::: handskrift
typ: rotekvationer
:::

::: textlosning
**a)** We square both sides and solve the equation:

$$
\left(\sqrt{x}\right)^2 = 8^2
$$

$$
x = 64
$$

Check: Substituting $x = 64$ into the original equation
$\sqrt{x} = 8$ gives $\mathrm{LHS} = \sqrt{64} = 8 = \mathrm{RHS}$.
Correct!

**Answer:** $x = 64$

**b)** We square both sides and solve the equation:

$$
\left(\sqrt{x + 2}\right)^2 = 17^2
$$

$$
x + 2 = 289
$$

$$
x = 287
$$

Check: Substituting $x = 287$ into the original equation gives
$\mathrm{LHS} = \sqrt{287 + 2} = \sqrt{289} = 17 = \mathrm{RHS}$.
Correct!

**Answer:** $x = 287$

**c)** We isolate the term with the root expression $3\sqrt{x}$:

$$
3\sqrt{x} = 4 - x
$$

We square both sides:

$$
\left(3\sqrt{x}\right)^2 = (4 - x)^2
$$

$$
9x = 16 - 8x + x^2
$$

We rearrange the equation and then solve it with the *pq* formula:

$$
x^2 - 17x + 16 = 0
$$

$$
x = 8.5 \pm \sqrt{8.5^2 - 16} = 8.5 \pm \sqrt{56.25} = 8.5 \pm 7.5
$$

This gives the solutions

$$
x_1 = 8.5 - 7.5 = 1
$$

$$
x_2 = 8.5 + 7.5 = 16
$$

Check: Substituting $x = 1$ into the original equation
$x + 3\sqrt{x} - 4 = 0$ gives

$$
\mathrm{LHS} = 1 + 3\sqrt{1} - 4 = 1 + 3 - 4 = 0 = \mathrm{RHS}
$$

Correct!

Check: Substituting $x = 16$ into the original equation gives

$$
\mathrm{LHS} = 16 + 3\sqrt{16} - 4 = 16 + 12 - 4 = 24 \neq \mathrm{RHS}
$$

Not correct! **False root!**

**Answer:** $x = 1$
:::
:::

::: exempel "Example 2: Alternative solution with a change of variable"
**Solve $x + 3\sqrt{x} - 4 = 0$ with a change of variable.**

::: handskrift
typ: variabelsubst
:::

::: textlosning
Let $\sqrt{x} = t$. This gives
$x = \sqrt{x} \cdot \sqrt{x} = t \cdot t = t^2$ and the new equation

$$
t^2 + 3t - 4 = 0
$$

The *pq* formula gives

$$
t = -1.5 \pm \sqrt{1.5^2 + 4} = -1.5 \pm \sqrt{6.25} = -1.5 \pm 2.5
$$

This gives the solutions

$$
t_1 = -1.5 - 2.5 = -4
$$

$$
t_2 = -1.5 + 2.5 = 1
$$

$\sqrt{x} = t_1$ gives

$$
\sqrt{x} = -4 \implies x_1 = 16
$$

$\sqrt{x} = t_2$ gives

$$
\sqrt{x} = 1 \implies x_2 = 1
$$

(Check the solutions $x_1 = 16$ and $x_2 = 1$ as in the first
solution: $x = 16$ turns out to be a false root.)

**Answer:** $x = 1$
:::
:::

::: kuriosa "Why do false roots arise?"
Assume $A = B$.

We square both sides and get

$$
A^2 = B^2
$$

If we solve this equation, we get

$$
A = \pm B
$$

The second solution $A = -B$ is a false root (unless $A$ equals
0), since it does not satisfy the original condition $A = B$.

Conclusion: Squaring can give extra "false" roots.
:::

::: sammanfattning "Summary"

::: sampunkt "Radical equation"
- An equation where the variable is **under a root sign**.
:::

::: sampunkt "The standard method"
1. Isolate **the term with the root expression** so that it stands alone.
2. **Square both sides**, and the root sign disappears.
3. Solve with a suitable method.
4. **Check the solution.**
:::

::: sampunkt "False roots"
- Squaring can create solutions that do **not** satisfy the original
  equation.
- The reason: both $3$ and $-3$ give 9 when squared.
- **The check is therefore compulsory**, not an extra courtesy. Substitute
  each root into the **original** equation.
:::

::: sampunkt "Change of variable"
- Replace $\sqrt{x}$ with a new variable, for example $t$.
- Solve the new equation in $t$.
- Then go back: $x = t^2$.
- A negative $t$ must be rejected, since $\sqrt{x}$ is never
  negative.
:::
:::
