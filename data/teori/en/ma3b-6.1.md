---
kalla: ddc839f631
id: ma3b-6.1
title: Sequences and patterns
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.1'
---

# Sequences and patterns

A savings account that grows year by year, the number of chairs in each row of a
theatre and the number of sticks in a figure that is built bigger and bigger
have something in common. In all three cases we get numbers that come in a particular
order. Such numbers are called a sequence, and in this chapter we will
use them to calculate with savings and loans.

## Terms and position numbers

A **sequence** is numbers that come in a particular order. The numbers are called
the **terms** of the sequence. The terms are denoted $a_1, a_2, a_3, \ldots$ where
the number $n$ in $a_{\mathit{n}}$ is the term's **position number**, sometimes called the index.
So the $n$th term is written $a_{\mathit{n}}$. In the sequence

$$
3,\ 7,\ 11,\ 15,\ 19,\ \ldots
$$

$a_1 = 3$, $a_2 = 7$ and $a_5 = 19$. The three dots mean that
the sequence continues in the same way.

## Closed and recursive formula

A sequence can be described with a formula in two ways.

- A **closed formula** calculates a term directly from the position number. With
  $a_{\mathit{n}} = 4n - 1$ we get $a_{100} = 4 \cdot 100 - 1 = 399$, without having to
  calculate the 99 terms before it.
- A **recursive formula** tells us how each term is obtained from the previous one.
  The sequence above can be described with $a_1 = 3$ and $a_{\mathit{n}+1} = a_{\mathit{n}} + 4$: start
  with 3 and add 4 each time. To get $a_{100}$ we then have to work our way
  forward term by term.

::: exempel "Example 1: Terms from a formula"
**Determine the first four terms of the sequence given by<br>a)&nbsp;$a_{\mathit{n}} = n^2 + 1$&emsp;&emsp;b)&nbsp;$a_1 = 2$ and $a_{\mathit{n}+1} = 2 \cdot a_{\mathit{n}} + 1$**

::: handskrift
typ: talfoljdelement
:::

::: textlosning
**a)** The formula is closed. We substitute $n = 1, 2, 3$ and $4$ into the formula.

$$
a_1 = 1^2 + 1 = 2 \qquad a_2 = 2^2 + 1 = 5 \qquad a_3 = 3^2 + 1 = 10 \qquad a_4 = 4^2 + 1 = 17
$$

**Answer:** 2, 5, 10 and 17

**b)** The formula is recursive. The first term is given, $a_1 = 2$.
Each new term is obtained by multiplying the previous one by 2 and
then increasing it by 1.

$$
a_2 = 2 \cdot a_1 + 1 = 2 \cdot 2 + 1 = 5
$$

$$
a_3 = 2 \cdot a_2 + 1 = 2 \cdot 5 + 1 = 11
$$

$$
a_4 = 2 \cdot a_3 + 1 = 2 \cdot 11 + 1 = 23
$$

**Answer:** 2, 5, 11 and 23

Notice that the two sequences start in the same way but then go
apart. So two terms are not enough to determine a sequence.
:::
:::

## Arithmetic sequence

In the sequence $3, 7, 11, 15, \ldots$ the terms increase by 4 each time. A
sequence where the difference between two consecutive terms is always
the same is called an **arithmetic sequence**. The difference is called
the **common difference** and is denoted $d$:

$$
d = a_2 - a_1 = a_3 - a_2 = \ldots
$$

::: formel "Arithmetic sequence"
$$
a_{\mathit{n}} = a_1 + (n - 1) \cdot d
$$

where

- $a_{\mathit{n}}$ = term number $n$
- $a_1$ = first term
- $d$ = common difference
- $n$ = position number

::: härledning "Derivation: The $n$th term of an arithmetic sequence"
We start at $a_1$ and add the common difference $d$ once for each step
forward in the sequence:

$$
a_2 = a_1 + d \qquad a_3 = a_1 + 2d \qquad a_4 = a_1 + 3d
$$

From $a_1$ to $a_{\mathit{n}}$ there are $n - 1$ steps, so the common difference is added
$n - 1$ times:

$$
a_{\mathit{n}} = a_1 + (n - 1) \cdot d
$$
:::
:::

## Patterns

Sequences often turn up when a figure is extended step by step. We count
the number of sticks, dots or squares in each figure and get a sequence. If
the sequence is arithmetic, the formula above gives a closed formula directly.

::: exempel "Example 2: The stick pattern"
**The figures below are built of sticks, and the pattern continues in the same way.**

::: figur
<svg viewBox="14 22 302 68" width="441" height="99" font-family="Poppins, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three figures built of sticks. Figure 1 is a triangle of three sticks. Figure 2 is two triangles side by side, the second upside down, of five sticks. Figure 3 is three triangles in a row of seven sticks."><line x1="20" y1="60" x2="56" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="20" y1="60" x2="38" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="38" y1="28.8" x2="56" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><text x="38" y="84" font-size="13" text-anchor="middle" fill="#1f2530">Figure 1</text><line x1="112" y1="60" x2="148" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="112" y1="60" x2="130" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="130" y1="28.8" x2="148" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="130" y1="28.8" x2="166" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="148" y1="60" x2="166" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><text x="139" y="84" font-size="13" text-anchor="middle" fill="#1f2530">Figure 2</text><line x1="238" y1="60" x2="274" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="238" y1="60" x2="256" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="256" y1="28.8" x2="274" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="256" y1="28.8" x2="292" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="274" y1="60" x2="292" y2="28.8" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="274" y1="60" x2="310" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><line x1="292" y1="28.8" x2="310" y2="60" stroke="#1f2530" stroke-width="3.2" stroke-linecap="round"/><text x="274" y="84" font-size="13" text-anchor="middle" fill="#1f2530">Figure 3</text></svg>
:::

**a) Give a closed formula for the number of sticks in figure $n$.<br>b) How many sticks are needed for figure 50?<br>c) Is it possible to build a figure in the pattern from exactly 100 sticks?**

::: handskrift
typ: stickmonster
:::

::: textlosning
**a)** We count the sticks in the figures and get the sequence

$$
a_1 = 3 \qquad a_2 = 5 \qquad a_3 = 7
$$

The number increases by 2 for each new figure, because each new triangle borrows a
stick from the previous one and only needs two new ones. So the sequence is
arithmetic with $a_1 = 3$ and $d = 2$. Substituting into the formula for an
arithmetic sequence, $a_{\mathit{n}} = a_1 + (n - 1) \cdot d$, gives

$$
a_{\mathit{n}} = 3 + (n - 1) \cdot 2 = 3 + 2n - 2 = 2n + 1
$$

**Answer:** $a_{\mathit{n}} = 2n + 1$

**b)** We substitute $n = 50$ into the formula from a).

$$
a_{50} = 2 \cdot 50 + 1 = 101
$$

**Answer:** 101 sticks

**c)** If 100 sticks are enough for a figure, there is an integer $n$ that
gives $a_{\mathit{n}} = 100$. We solve the equation.

$$
2n + 1 = 100
$$

$$
2n = 99
$$

$$
n = 49.5
$$

The position number must be an integer, so 100 is not a term of
the sequence. Figure 49 has 99 sticks and figure 50 has 101.

**Answer:** No, it is not possible.
:::
:::

## Arithmetic or geometric?

Another common type of sequence is obtained when each term is instead
**multiplied** by the same number. In the sequence $2, 6, 18, 54, \ldots$
each term is multiplied by 3. Such a sequence is called a
**geometric sequence**, and the number you multiply by is called
the **common ratio** $k$:

$$
k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2} = \ldots
$$

Here $k = \dfrac{6}{2} = 3$. Geometric sequences are the main characters in
the rest of the chapter. In the next section we find a formula for their
terms.

::: tips "How to recognise the sequence"
- **Arithmetic:** the difference $a_{\mathit{n}+1} - a_{\mathit{n}}$ is the same all the time.
  The same number is **added** each time.
- **Geometric:** the ratio $\dfrac{a_{\mathit{n}+1}}{a_{\mathit{n}}}$ is the same all the time.
  Each term is **multiplied** by the same number.
- If neither the difference nor the ratio is constant, the sequence is neither.
:::

::: exempel "Example 3: Which kind of sequence?"
**Decide whether the sequence is arithmetic, geometric or neither.<br>a)&nbsp;$5,\ 15,\ 45,\ 135,\ \ldots$&emsp;&emsp;b)&nbsp;$7,\ 4,\ 1,\ -2,\ \ldots$&emsp;&emsp;c)&nbsp;$1,\ 4,\ 9,\ 16,\ \ldots$**

::: handskrift
typ: vilkentalfoljd
:::

::: textlosning
**a)** The differences are $15 - 5 = 10$, $45 - 15 = 30$ and $135 - 45 = 90$.
They are not equal, so the sequence is not arithmetic. We try the ratios.

$$
\frac{15}{5} = 3 \qquad \frac{45}{15} = 3 \qquad \frac{135}{45} = 3
$$

The ratio is the same all the time.

**Answer:** Geometric with the common ratio $k = 3$

**b)** The differences are $4 - 7 = -3$, $1 - 4 = -3$ and $-2 - 1 = -3$.
The same number is added each time (even though the number is negative).

**Answer:** Arithmetic with the common difference $d = -3$

**c)** The differences are 3, 5 and 7, so they are not equal. The ratios are

$$
\frac{4}{1} = 4 \qquad \frac{9}{4} = 2.25
$$

which are not equal either. The terms are the squares $1^2, 2^2, 3^2, 4^2$, so
the sequence is given by $a_{\mathit{n}} = n^2$, but it is neither arithmetic nor
geometric.

**Answer:** Neither
:::
:::

::: förklaring "Programming: the sequence in Python"
A computer is good at working out a sequence term by term. The
recursive formula then becomes a **loop**, a part of the program that is repeated.
The program below prints the first ten terms of the geometric
sequence with $a_1 = 2$ and the common ratio $k = 3$.

```python
a = 2
for n in range(1, 11):
    print(n, a)
    a = a * 3
```

- `a = 2` stores the first term.
- `for n in range(1, 11):` repeats the indented lines for $n = 1, 2, \ldots, 10$.
- `print(n, a)` prints the position number and the term.
- `a = a * 3` works out the next term: the previous one times the common ratio.

So each pass through the loop does exactly what the recursive formula
$a_{\mathit{n}+1} = 3 \cdot a_{\mathit{n}}$ says. If `a * 3` is replaced by `a + 4` on the last line,
the sequence instead becomes arithmetic with the common difference 4.
:::

::: sammanfattning "Summary"

::: sampunkt "Sequence"
- Numbers in a **particular order**. The numbers are called **terms**.
- $a_{\mathit{n}}$ is term number $n$, where $n$ is the **position number**.
- In $3, 7, 11, \ldots$ we have $a_1 = 3$ and $a_3 = 11$.
:::

::: sampunkt "Two kinds of formula"
- **Closed:** gives the term directly, $a_{\mathit{n}} = 4n - 1$.
- **Recursive:** gives the term from the previous one, $a_{\mathit{n}+1} = a_{\mathit{n}} + 4$
  with $a_1 = 3$.
:::

::: sampunkt "Arithmetic sequence"
- The same number $d$ is **added** each time.
- $a_{\mathit{n}} = a_1 + (n - 1) \cdot d$
- Is 100 included? Solve $a_{\mathit{n}} = 100$. If $n$ is not an integer, the number is not included.
:::

::: sampunkt "Geometric sequence"
- Each term is **multiplied** by the same common ratio $k$.
- $k = \dfrac{a_2}{a_1} = \dfrac{a_3}{a_2}$
- $2, 6, 18, 54, \ldots$ has the common ratio $k = 3$.
:::
:::
