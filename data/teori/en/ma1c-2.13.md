---
kalla: 1b7559308a
id: ma1c-2.13
title: Patterns and formulas
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.13'
---

# Patterns and formulas

A series of numbers is called a **sequence**. The numbers in the sequence are called **terms**.

Consider the sequence below:

$$
3,\ 7,\ 11,\ 15,\ 19,\ \ldots
$$

The terms are denoted $a_n$, where $n$ stands for the **position number**. Here

$$
a_1 = 3
\qquad
a_2 = 7
\qquad
a_3 = 11
\qquad \ldots
$$

A formula for directly calculating a term in the sequence is called a **closed
formula**.

::: exempel "Example 1: Finding a closed formula"
**We have the sequence 3, 7, 11, 15, 19, …<br>a) Give a closed formula for the sequence.<br>b) What is the 100th number in the sequence?**

::: handskrift
typ: slutenformel
:::

::: textlosning
**a)** We call the $n$th number in the sequence $a_n$. We see that each number
in the sequence is obtained by adding 4 to the previous number. Then
the term $4n$ must be in the formula, so

$$
a_n = 4n
$$

We know that $a_1 = 3$, so if we substitute $n = 1$ into the formula it should give 3.
We test:

$$
a_1 = 4 \cdot 1 = 4
$$

$a_1$ became 4, which is 1 too many (it should be 3). Since it was 1
too many, we subtract 1 in the formula, so

$$
a_n = 4n - 1
$$

We test again:

$$
a_1 = 4 \cdot 1 - 1 = 4 - 1 = 3 \quad \text{Correct!}
$$

$$
a_2 = 4 \cdot 2 - 1 = 8 - 1 = 7 \quad \text{Correct!}
$$

$$
a_3 = 4 \cdot 3 - 1 = 12 - 1 = 11 \quad \text{Correct!}
$$

We have found our formula!

**Answer:** $a_n = 4n - 1$

**b)** We substitute $n = 100$ into the closed formula $a_n = 4n - 1$ and get

$$
a_{100} = 4 \cdot 100 - 1 = 400 - 1 = 399
$$

**Answer:** 399
:::
:::

::: exempel "Example 2: The dot pattern"
**The figures below are built.**

::: figur
<svg viewBox="38 14 380 80" width="555" height="117" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="Three figures of dots. Figure 1 has a row of three dots and one dot on top of the middle, four dots in total. Figure 2 has a row of five dots and two dots on top of the middle, seven in total. Figure 3 has a row of seven dots and three dots on top of the middle, ten in total."><circle cx="46" cy="64" r="4" fill="#1f2530"/><circle cx="60" cy="64" r="4" fill="#1f2530"/><circle cx="74" cy="64" r="4" fill="#1f2530"/><circle cx="60" cy="50" r="4" fill="#1f2530"/><text x="62" y="88" font-size="13" text-anchor="middle" fill="#1f2530">Figure 1</text><circle cx="162" cy="64" r="4" fill="#1f2530"/><circle cx="176" cy="64" r="4" fill="#1f2530"/><circle cx="190" cy="64" r="4" fill="#1f2530"/><circle cx="204" cy="64" r="4" fill="#1f2530"/><circle cx="218" cy="64" r="4" fill="#1f2530"/><circle cx="190" cy="50" r="4" fill="#1f2530"/><circle cx="190" cy="36" r="4" fill="#1f2530"/><text x="190" y="88" font-size="13" text-anchor="middle" fill="#1f2530">Figure 2</text><circle cx="318" cy="64" r="4" fill="#1f2530"/><circle cx="332" cy="64" r="4" fill="#1f2530"/><circle cx="346" cy="64" r="4" fill="#1f2530"/><circle cx="360" cy="64" r="4" fill="#1f2530"/><circle cx="374" cy="64" r="4" fill="#1f2530"/><circle cx="388" cy="64" r="4" fill="#1f2530"/><circle cx="402" cy="64" r="4" fill="#1f2530"/><circle cx="360" cy="50" r="4" fill="#1f2530"/><circle cx="360" cy="36" r="4" fill="#1f2530"/><circle cx="360" cy="22" r="4" fill="#1f2530"/><text x="360" y="88" font-size="13" text-anchor="middle" fill="#1f2530">Figure 3</text></svg>
:::

**a) Give a closed formula for the number of dots in figure $n$.<br>b) How many dots are there in figure 1 000?**

::: handskrift
typ: prickmonster
:::

::: textlosning
**a)** We study the number of dots in each figure:

$$
a_1 = 4
\qquad
a_2 = 7
\qquad
a_3 = 10
$$

For each figure the number of dots increases by 3. The term $3n$ should therefore be
in the formula, so

$$
a_n = 3n
$$

We know that $a_1 = 4$. We test substituting $n = 1$ and get
$a_1 = 3 \cdot 1 = 3$.

3 is 1 too few. So we must add 1 in the formula for $a_1$ to become
4. This gives

$$
a_n = 3n + 1
$$

We test again:

$$
a_1 = 3 \cdot 1 + 1 = 3 + 1 = 4 \quad \text{Correct!}
$$

$$
a_2 = 3 \cdot 2 + 1 = 6 + 1 = 7 \quad \text{Correct!}
$$

$$
a_3 = 3 \cdot 3 + 1 = 9 + 1 = 10 \quad \text{Correct!}
$$

We have found the correct formula.

**Answer:** $a_n = 3n + 1$

**b)** From part a) we have $a_n = 3n + 1$. Substituting
$n = 1\,000$ gives

$$
a_{1000} = 3 \cdot 1\,000 + 1 = 3\,001
$$

**Answer:** 3 001
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Sequence"
- A **series of numbers**. The numbers are called **terms**.
- The terms are denoted $a_n$, where $n$ is the **position number**.
- In the sequence $3, 7, 11, 15, \ldots$, $a_1 = 3$ and $a_2 = 7$.
:::

::: sampunkt "Closed formula"
- A formula that calculates a term **directly**, without going via the
  previous ones.
:::

::: sampunkt "How to find it"
1. Take the **difference** between two consecutive terms. It becomes
   the coefficient in front of $n$.
2. Work out what must be added for $n = 1$ to give the first
   term.
- $3, 7, 11, \ldots$ has the difference 4, and $4 \cdot 1 = 4$ is one too
  many. So $a_n = 4n - 1$.
:::

::: sampunkt "Check"
- Test the formula on **at least two** terms, preferably the first and the third.
- Then you can calculate any term at all:
  $a_{100} = 4 \cdot 100 - 1 = 399$.
:::

::: sampunkt "Patterns with figures"
- Count the number in each figure and write down the sequence.
- The difference is how many are **added** at each step.
- The constant is the part that is there from the very beginning.
:::
:::
