---
kalla: 26ef35647b
id: ma3b-6.S
title: Summary
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.S'
---

# Summary: Geometric sum

This chapter was about sequences, numbers that come in a particular order.
You have met arithmetic sequences, where the same number is added each time, and
geometric sequences, where each term is multiplied by the same common ratio. The
geometric sequence describes everything that changes by the same percentage, and
that is why it was used in personal finance: for present value, regular saving and
annuity loans. After the chapter you should be able to determine a term and a sum in
a geometric sequence, calculate the present value of future amounts, calculate
the balance with regular saving and determine the annuity on a loan.

## Concepts to know

- **sequence**: numbers in a particular order; the numbers are called **terms**.
- **position number** $n$: the term's place in the sequence; $a_{\mathit{n}}$
  is term number $n$.
- **closed formula**: gives the term directly from the position number, for example
  $a_{\mathit{n}} = 4n - 1$.
- **recursive formula**: gives the term from the previous one, for example
  $a_{\mathit{n}+1} = a_{\mathit{n}} + 4$ with $a_1 = 3$.
- **arithmetic sequence**: the same number, the **common difference** $d$, is added each
  time.
- **geometric sequence**: each term is multiplied by the same number,
  the **common ratio** $k$.
- **geometric sum** $s_{\mathit{n}}$: the sum of the first $n$ terms of
  a geometric sequence.
- **future value**: what an amount has grown to after a number of years with interest.
- **present value**: what a future amount is worth today.
- **amortisation**: the part of a payment that pays back the loan itself.
- **annuity**: the equal amount that is paid each time on an
  **annuity loan**; the interest part decreases and the amortisation increases over time.
- **straight-line amortisation**: the same amortisation each time, so that the payment
  decreases over time.

## Formulas

::: formel "The formulas of the chapter"
**Arithmetic sequence**

$$
a_{\mathit{n}} = a_1 + (n - 1) \cdot d
$$

**Geometric sequence**

$$
a_{\mathit{n}} = a_1 \cdot k^{n-1} \qquad \text{where} \qquad k = \frac{a_2}{a_1} = \frac{a_3}{a_2}
$$

**Geometric sum**

$$
s_{\mathit{n}} = \frac{a_1(k^n - 1)}{k - 1} \qquad (k \neq 1)
$$

**Future value and present value**

$$
B = N \cdot \text{change factor}^{\,n} \qquad\qquad N = \frac{B}{\text{change factor}^{\,n}}
$$

**Annuity**

$$
A = \frac{G \cdot k^n \cdot (k - 1)}{k^n - 1}
$$

where

- $a_1$ = the first term, $a_{\mathit{n}}$ = term number $n$
- *d* = common difference, *k* = common ratio (with interest: the change factor per period)
- $s_{\mathit{n}}$ = the sum of the first $n$ terms
- *N* = present value, *B* = amount paid out in $n$ years
- *A* = annuity, *G* = loan amount, *n* = number of payments
:::

## Important relationships and methods

- Recognise the sequence: if the **difference** between the terms is constant, it is
  arithmetic; if the **ratio** is constant, it is geometric.
- The exponent in $a_{\mathit{n}} = a_1 \cdot k^{n-1}$ is $n - 1$, because there
  are $n - 1$ steps from the first term to term number $n$.
- The common ratio from two terms that are not next to each other: from $a_2$ to
  $a_5$ there are three steps, so $a_5 = a_2 \cdot k^3$.
- If an amount changes by the same percentage every year, the amounts form a
  geometric sequence, and the common ratio is the change factor.
- If the number of years or the number of terms is sought: isolate the power, take the logarithm of both
  sides (lg, the common logarithm log₁₀) and solve for $n$. The answer must be an integer, so round in the right direction.
- In a sum written with terms, $a_1$ is the first term, $k$ a term divided
  by the term before it and $n$ the number of terms (the exponent in the last term plus 1).
- Compare offers by converting all the amounts to present values. The answer
  depends on the interest rate: a high interest rate makes early money worth more.
- Regular saving: the balance is a geometric sum with
  $k$ = the change factor and $n$ = the number of deposits. Keep track of whether
  the deposit is made at the beginning or at the end of the year.
- Annuity loan: the loan amount is equal to the sum of the present values of all the
  payments. That sum is geometric and gives the formula for the annuity.
- The total cost of an annuity loan is $n \cdot A$ and the total interest
  $n \cdot A - G$. With monthly payments $k$ is the change factor for
  the monthly interest rate and $n$ the number of months.

## Before the test

- Can you determine a term from a closed or a recursive formula?
- Can you decide whether a sequence is arithmetic, geometric or neither?
- Can you determine the common ratio and a term in a geometric sequence, even when
  two given terms are not next to each other?
- Can you determine when a geometric sequence passes a certain value using
  logarithms?
- Can you calculate the present value of one or more future amounts, and compare
  two offers?
- Can you calculate a geometric sum and determine $a_1$, $k$ and $n$ from a
  sum written with terms?
- Can you calculate the balance with regular saving, with deposits at the
  beginning and at the end of the year?
- Can you calculate the annuity, the total cost and the total interest for
  an annuity loan, and explain the difference from straight-line amortisation?
