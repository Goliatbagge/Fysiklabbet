---
kalla: 0359783ee0
id: ma1c-2.6
title: Variables on both sides
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.6'
---

# Variables on both sides

If we have variables on both sides of the equals sign, collect them on one
side and then solve the equation as usual. It is usually easiest to
remove the variable term from the side that has the *smallest* coefficient.

::: exempel "Example 1: Variables on both sides"
**Solve<br>a)&nbsp;$5x + 8 - 3x = 9x - 20$&emsp;&emsp;b)&nbsp;$54 - 4(3x - 5) = 25x$&emsp;&emsp;c)&nbsp;$3(7x - 4) = 7(9 + 3x)$**

::: handskrift
typ: variabelbada
:::

::: textlosning
**a)** We start by simplifying both sides:

$$
2x + 8 = 9x - 20
$$

Then we remove the variable term from the LHS, since it has the smallest
coefficient. So we subtract $2x$ from both sides:

$$
2x + 8 - 2x = 9x - 20 - 2x
$$

$$
8 = 7x - 20
$$

Then we solve the equation using the earlier method. We add 20 to both
sides:

$$
8 + 20 = 7x - 20 + 20
$$

$$
28 = 7x
$$

Divide both sides by 7:

$$
\frac{28}{7} = \frac{7x}{7}
$$

$$
4 = x
$$

**Answer:** $x = 4$

**b)** Again we start by simplifying both sides. We multiply
−4 into the bracket (watch the signs: $-4 \cdot (-5) = +20$):

$$
54 - 4(3x - 5) = 25x
$$

$$
54 - 12x + 20 = 25x
$$

$$
74 - 12x = 25x
$$

Then we remove the variable term from the LHS, since it has the smallest
coefficient (−12 is less than 25). We add $12x$ to both sides:

$$
74 - 12x + 12x = 25x + 12x
$$

$$
74 = 37x
$$

Divide both sides by 37:

$$
\frac{74}{37} = \frac{37x}{37}
$$

$$
2 = x
$$

**Answer:** $x = 2$

**c)** We start by expanding and simplifying both sides:

$$
3(7x - 4) = 7(9 + 3x)
$$

$$
21x - 12 = 63 + 21x
$$

We subtract $21x$ from both sides:

$$
21x - 12 - 21x = 63 + 21x - 21x
$$

$$
-12 = 63
$$

This is false, since $-12 \neq 63$. So the equation has no solutions.

**Answer:** No solution.
:::
:::

In Example 1 c) something new happened: the variable disappeared. Most
linear equations have exactly one solution, but an equation with variables
on both sides can also **have no solution** or have **infinitely many
solutions**. This happens when the variable terms cancel each other out: if, for
example, there is $8x$ on both sides and we subtract $8x$ from both sides,
$x$ disappears completely, and all that is left is an equality between two numbers. What
decides it is whether that equality is true or false.

::: formel "How many solutions does a linear equation have?"
Simplify both sides and solve the equation as usual. One of three things happens:

- **The variable remains**, for example $x = 7$. The equation has **exactly one
  solution**. This is the usual case.
- **The variable disappears and a false equality is left**, for example
  $3 = -4$. No value of $x$ can make the statement true. The equation
  **has no solution**.
- **The variable disappears and a true equality is left**, for example
  $3 = 3$. The statement is true whatever value $x$ has. The equation has
  **infinitely many solutions**: every number is a solution.
:::

So the variable disappearing is not a calculation error, but a sign that
the equation is of this kind. You can recognise the two cases even
before you start solving: once both sides are simplified, there is **the same
variable term on both sides**. If the constants are different, as in $4x + 3 = 4x - 4$,
the equation has no solution. If the sides are completely identical, as in
$4x + 3 = 4x + 3$, both sides are the same expression written in two ways, and then
all numbers are solutions.

::: exempel "Example 2: Equations with no solution and with infinitely many solutions"
**Solve<br>a)&nbsp;$8x + 3 = 5x + 3x - 4$&emsp;&emsp;b)&nbsp;$4(x - 1) + 7 = 4x + 3$**

::: handskrift
typ: losningsantal
:::

::: textlosning
**a)** First we simplify the right-hand side, where $5x + 3x = 8x$:

$$
8x + 3 = 8x - 4
$$

Now there is $8x$ on both sides. We subtract $8x$ from both sides:

$$
8x + 3 - 8x = 8x - 4 - 8x
$$

$$
3 = -4
$$

The variable disappeared, and what is left is an equality that is false: 3 is not equal
to $-4$. So there is no value of $x$ that makes the equation
hold.

**Answer:** The equation has no solution.

**b)** First we multiply 4 into the bracket:

$$
4x - 4 + 7 = 4x + 3
$$

Then we combine the constants on the left-hand side, $-4 + 7 = 3$:

$$
4x + 3 = 4x + 3
$$

Both sides are now exactly the same expression. We subtract $4x$ from both sides:

$$
4x + 3 - 4x = 4x + 3 - 4x
$$

$$
3 = 3
$$

The variable disappeared, and what is left is an equality that is true. So the equation
holds whatever value $x$ has.

**Answer:** The equation has infinitely many solutions. Every number $x$ is a
solution.
:::
:::

Sometimes both sides must be expanded before the variables can be collected. Then
the equation may at first seem to contain $x^2$, but if the same $x^2$-term appears on
both sides, it cancels when it is subtracted, and what is left is an
ordinary linear equation.

::: exempel "Example 3: Equation with multiplication of brackets"
**Solve the equation $(1 + 4x)(3x - 2) = x(12x - 6)$.**

::: handskrift
typ: parentesekv
:::

::: textlosning
Expand the brackets:

$$
3x - 2 + 12x^2 - 8x = 12x^2 - 6x
$$

Subtract $12x^2$ from both sides and simplify:

$$
-5x - 2 = -6x
$$

Add $6x$ to both sides and simplify:

$$
x - 2 = 0
$$

Add 2 to both sides and simplify:

$$
x = 2
$$

**Answer:** $x = 2$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Variables on both sides"
- **Collect the variables on one side** and the constants on the other.
- Remove the variable term from the side where the coefficient is **smallest**. Then
  you avoid negative numbers.
:::

::: sampunkt "Method"
1. Expand any brackets.
2. Simplify each side separately.
3. Collect the variable terms on one side.
4. Collect the constant terms on the other.
5. Divide by the coefficient.
:::

::: sampunkt "When there is no solution"
- If the variable disappears and a **false** equality is left, such as $3 = -4$
  or $-12 = 63$, **the equation has no solution**.
- Recognised by the same variable term being on both sides but the constants
  being different: $4x + 3 = 4x - 4$.
:::

::: sampunkt "Infinitely many solutions"
- If the variable disappears and a **true** equality is left, such as $3 = 3$,
  **every number** is a solution.
- Recognised by both sides being the same expression: $4x + 3 = 4x + 3$.
- The variable disappearing is not a calculation error but one of the three cases.
:::
:::
