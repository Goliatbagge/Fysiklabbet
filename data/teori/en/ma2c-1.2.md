---
kalla: 9f742b3769
id: ma2c-1.2
title: The substitution method
course: Matematik nivå 2c
chapter: Linjära ekvationssystem
chapterNumber: 1
section: '1.2'
---

# The substitution method

Besides solving systems of equations graphically, we can solve them
**algebraically** (with algebraic methods). One method for solving
systems of equations algebraically is the **substitution method**. (To carry out a
substitution means to replace something, and that is exactly what we
do.)

::: tips "Solving systems of equations with the substitution method"
1. Solve for any variable you like from any equation in the system.
2. **Replace** the variable with the expression you got in the equation you have not
   used.
3. Solve the equation and find the value of one of the variables.
4. Substitute the value of that variable into one of the earlier
   equations to get the value of the other variable.
:::

::: exempel "Example 1: The variable already isolated"
**Solve the system of equations**

::: handskrift
typ: substitutionutlost
:::

::: textlosning
$$
\begin{cases}
y = 2x - 4 \\
y = -x + 5
\end{cases}
$$

We start by giving the equations labels to make it easier to
refer to them. We call the upper equation (1) and the lower
equation (2).

$$
\begin{cases}
y = 2x - 4 & (1) \\
y = -x + 5 & (2)
\end{cases}
$$

According to equation (1), $y = 2x - 4$. We replace (substitute) $y$ with
$2x - 4$ in equation (2). This gives

$$
2x - 4 = -x + 5
$$

We collect all the $x$ on one side by adding $x$ to both sides, and
then add 4 to both sides:

$$
3x - 4 = 5
$$

$$
3x = 9
$$

Dividing both sides by 3 gives

$$
\frac{3x}{3} = \frac{9}{3}
$$

$$
x = 3
$$

We have now found $x$. We now substitute $x = 3$ into one of the
original equations (it does not matter which) to get $y$.
Substituting $x = 3$ into equation (1) gives

$$
y = 2 \cdot 3 - 4 = 6 - 4 = 2
$$

So $y = 2$. The solution to a system of equations is usually given with a bracket.

**Answer:**

$$
\begin{cases}
x = 3 \\
y = 2
\end{cases}
$$
:::
:::

::: exempel "Example 2: Solve for a variable first"
**Solve the system of equations**

::: handskrift
typ: substitutionlosut
:::

::: textlosning
$$
\begin{cases}
2x - y = 7 \\
x - 3y = 1
\end{cases}
$$

We copy the system of equations and add labels.

$$
\begin{cases}
2x - y = 7 & (1) \\
x - 3y = 1 & (2)
\end{cases}
$$

Here neither $x$ nor $y$ stands alone on one side, so we start by
solving for $x$ or $y$ from one of the equations. We solve for $x$ from
equation (2) because it is the easiest (it has no coefficient and no
minus sign in front). We add $3y$ to both sides:

$$
x = 1 + 3y \qquad (3)
$$

Then we substitute $x = 1 + 3y$ into equation (1) (the equation we have not
used) and then solve for $y$:

$$
2(1 + 3y) - y = 7
$$

$$
2 + 6y - y = 7
$$

$$
2 + 5y = 7
$$

We subtract 2 from both sides and then divide by 5:

$$
5y = 5
$$

$$
y = 1
$$

We have now found $y$. We now substitute $y = 1$ into one of our
equations. Substituting $y = 1$ into equation (3) gives

$$
x = 1 + 3 \cdot 1 = 1 + 3 = 4
$$

So $x = 4$.

**Answer:**

$$
\begin{cases}
x = 4 \\
y = 1
\end{cases}
$$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The substitution method"
1. Solve for a variable from one of the equations.
2. **Replace** the variable with the expression in the **other** equation.
3. Solve that equation, which now has only one variable.
4. Substitute the value into an earlier equation to get the other variable.
:::

::: sampunkt "Choose the right variable to solve for"
- Take the **easiest** one, that is the one with no coefficient and no
  minus sign.
- If a variable already stands alone, you can substitute directly.
:::

::: sampunkt "Number the equations"
- Put the labels (1), (2) and (3) on the equations.
- Then write which one you use in each step. This makes the solution readable
  and easy to check.
:::

::: sampunkt "The last step"
- Substitute the first answer into **any** of the earlier
  equations.
- It is a good idea to check in the **other** equation: both sides should be equal.
:::
:::
