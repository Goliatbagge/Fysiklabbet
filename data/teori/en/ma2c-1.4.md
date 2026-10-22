---
kalla: 84afcea5db
id: ma2c-1.4
title: Problem solving with systems of equations
course: Matematik nivå 2c
chapter: Linjära ekvationssystem
chapterNumber: 1
section: '1.4'
---

# Problem solving with systems of equations

Problems with more than one unknown variable can often be solved with
systems of equations.

::: tips "Problem solving with systems of equations"
1. Define the variables you introduce.
2. Set up a system of equations and solve it.
3. Interpret and answer.
:::

::: exempel "Example 1: Cows and hens"
**A farmer has cows and hens. Altogether the animals have 100 heads and 352 legs.
How many cows and how many hens does the farmer have?**

::: handskrift
typ: korochhons
:::

::: textlosning
We start by defining our variables:

- $k$ = the number of cows
- $h$ = the number of hens

If we assume that each animal has 1 head, each cow 4 legs and each hen
2 legs, this gives

$$
\begin{cases}
k + h = 100 & (1) \\
4k + 2h = 352 & (2)
\end{cases}
$$

We solve for, for example, $h$ from equation (1) and use
the substitution method:

$$
h = 100 - k \qquad (3)
$$

Substituting $h = 100 - k$ into equation (2) gives

$$
4k + 2(100 - k) = 352
$$

$$
4k + 200 - 2k = 352
$$

$$
2k + 200 = 352
$$

We subtract 200 from both sides and then divide by 2:

$$
2k = 152
$$

$$
k = 76
$$

$k = 76$ in equation (3) gives

$$
h = 100 - 76 = 24
$$

so the system of equations has the solution

$$
\begin{cases}
k = 76 \\
h = 24
\end{cases}
$$

**Answer:** The farmer has 76 cows and 24 hens.
:::
:::

::: exempel "Example 2: Sum and difference"
**Two numbers have the sum 19 and the difference 5. What are the numbers?**

::: handskrift
typ: summadifferens
:::

::: textlosning
We call the larger number $x$ and the smaller number $y$. Then

$$
\begin{cases}
x + y = 19 & (1) \\
x - y = 5 & (2)
\end{cases}
$$

We use the elimination method.

$$
\begin{array}{rcl}
x + y & = & 19 \\
+\quad x - y & = & 5 \\
\hline
2x & = & 24
\end{array}
$$

Dividing both sides by 2 gives

$$
x = 12
$$

Substituting $x = 12$ into, for example, (1) gives

$$
12 + y = 19
$$

$$
y = 19 - 12 = 7
$$

So the system of equations has the solution

$$
\begin{cases}
x = 12 \\
y = 7
\end{cases}
$$

**Answer:** The numbers are 12 and 7.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The method"
1. **Define** the variables in plain words.
2. Set up **a system of equations** and solve it.
3. **Interpret and answer** the question that was asked.
:::

::: sampunkt "Two unknowns require two equations"
- If the problem has two unknown quantities, the text must give **two independent**
  pieces of information.
- Each such piece of information becomes an equation.
:::

::: sampunkt "Typical example: cows and hens"
- $k + h = 100$ for the **heads**, one per animal.
- $4k + 2h = 352$ for the **legs**, four and two per animal respectively.
- So each equation describes its own kind of count.
:::

::: sampunkt "Typical example: sum and difference"
- $x + y = 19$ and $x - y = 5$.
- Here the **elimination method** fits perfectly, since $y$ cancels out directly.
:::

::: sampunkt "The last step is easily forgotten"
- Answer in plain words with the right unit: "The farmer has 76 cows and 24 hens".
- Check that the answer is reasonable: a number of animals cannot be negative or a
  decimal number.
:::
:::
