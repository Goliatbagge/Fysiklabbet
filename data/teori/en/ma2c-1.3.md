---
kalla: 2cf0b13ce5
id: ma2c-1.3
title: The elimination method
course: Matematik nivå 2c
chapter: Linjära ekvationssystem
chapterNumber: 1
section: '1.3'
---

# The elimination method

Solving a system of equations algebraically by adding equations
is called the **elimination method** (the addition method).

::: tips "Solving systems of equations with the elimination method"
1. Modify one or both equations so that the same variable term, but
   with opposite signs, appears in both equations.
2. Add them side by side to eliminate one variable and solve for the other
   variable.
3. Substitute the value of that variable into one of the earlier
   equations to get the value of the other variable.
:::

::: exempel "Example 1: Add directly"
**Solve the system of equations**

::: handskrift
typ: additionsmetoden
:::

::: textlosning
$$
\begin{cases}
-2x + 5y = 6 \\
4x - 5y = 12
\end{cases}
$$

We see that both equations contain the same term $5y$, with a plus sign
in front of one and a minus sign in front of the other. We add
the equations "side by side" with the elimination method!

$$
\begin{array}{rcl}
-2x + 5y & = & 6 \quad (1) \\
+\quad 4x - 5y & = & 12 \quad (2) \\
\hline
2x + 0 & = & 18
\end{array}
$$

The $y$-terms cancel each other out, and what remains is an equation with only $x$:

$$
2x = 18
$$

$$
\frac{2x}{2} = \frac{18}{2}
$$

$$
x = 9
$$

Substituting $x = 9$ into (1) gives

$$
-2 \cdot 9 + 5y = 6
$$

$$
-18 + 5y = 6
$$

We add 18 to both sides and then divide by 5:

$$
5y = 24
$$

$$
y = \frac{24}{5} = 4.8
$$

**Answer:**

$$
\begin{cases}
x = 9 \\
y = 4.8
\end{cases}
$$
:::
:::

::: exempel "Example 2: Multiply one equation first"
**Solve the system of equations**

::: handskrift
typ: multiplicerasystem
:::

::: textlosning
$$
\begin{cases}
5x + 4y = 30 \\
2x - 8y = -12
\end{cases}
$$

We start by copying the system of equations and adding labels.

$$
\begin{cases}
5x + 4y = 30 & (1) \\
2x - 8y = -12 & (2)
\end{cases}
$$

Before we add the equations, we want the same $x$- or $y$-term in
both equations, but with opposite signs in front. In the lower equation
we have the term $-8y$. In the upper equation we have the term $+4y$. If we
multiply the upper equation by 2, the term becomes $+8y$ and
the $y$-terms can be eliminated with the elimination method. We
multiply the upper equation by 2. **All** terms in the equation
must then be multiplied by 2:

$$
\begin{cases}
10x + 8y = 60 \\
2x - 8y = -12
\end{cases}
$$

Now we add the equations.

$$
\begin{array}{rcl}
10x + 8y & = & 60 \\
+\quad 2x - 8y & = & -12 \\
\hline
12x & = & 48
\end{array}
$$

Dividing both sides by 12 gives

$$
x = 4
$$

Substituting $x = 4$ into, for example, equation (1) gives

$$
5 \cdot 4 + 4y = 30
$$

$$
20 + 4y = 30
$$

We subtract 20 from both sides and then divide by 4:

$$
4y = 10
$$

$$
y = \frac{10}{4} = 2.5
$$

**Answer:**

$$
\begin{cases}
x = 4 \\
y = 2.5
\end{cases}
$$
:::
:::

::: exempel "Example 3: Multiply both equations"
**Solve the system of equations**

::: handskrift
typ: multbadasystem
:::

::: textlosning
$$
\begin{cases}
2x + 7y = 8 \\
5x + 9y = 3
\end{cases}
$$

$$
\begin{cases}
2x + 7y = 8 & (1) \\
5x + 9y = 3 & (2)
\end{cases}
$$

Here it is not enough to multiply one of the equations to
eliminate $x$ or $y$. We can then multiply **both** equations. If
we want to eliminate the $x$-terms, for example, we can multiply the equations
by each other's coefficients in front of $x$ and make sure that they get opposite
signs.

We multiply the upper equation by 5 (the coefficient in front of $x$ in
the lower equation) and the lower equation by −2 (the coefficient
in front of $x$ in the upper equation with the sign changed). This gives

$$
\begin{cases}
10x + 35y = 40 \\
-10x - 18y = -6
\end{cases}
$$

We now add the equations and then continue as usual.

$$
\begin{array}{rcl}
10x + 35y & = & 40 \\
+\quad -10x - 18y & = & -6 \\
\hline
17y & = & 34
\end{array}
$$

Dividing both sides by 17 gives

$$
y = 2
$$

$y = 2$ in equation (1) gives

$$
2x + 7 \cdot 2 = 8
$$

$$
2x + 14 = 8
$$

We subtract 14 from both sides and then divide by 2:

$$
2x = -6
$$

$$
x = -3
$$

**Answer:**

$$
\begin{cases}
x = -3 \\
y = 2
\end{cases}
$$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The elimination method"
1. Make sure that **the same variable term** appears in both equations, with
   **opposite signs**.
2. Add the equations **side by side**, so that that variable is eliminated.
3. Solve the remaining equation.
4. Substitute the value into an earlier equation.
:::

::: sampunkt "When you can add directly"
- If, for example, $+5y$ is in one and $-5y$ in the other, they cancel
  each other out at once.
:::

::: sampunkt "Multiply one equation"
- $+4y$ and $-8y$: multiply the upper one by 2, and it becomes $+8y$.
- **All** terms in the equation must be multiplied, not just one of them.
:::

::: sampunkt "Multiply both equations"
- If one is not enough: multiply each one by the **other's**
  coefficient.
- Put a minus sign on one of them so that the terms cancel each other out.
:::

::: sampunkt "Which method should you choose?"
- **Substitution**: when a variable already stands alone or is easy to
  solve for.
- **Elimination**: when both equations are in the form
  $ax + by = c$.
:::
:::
