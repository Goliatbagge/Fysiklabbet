---
kalla: 82dbb448b4
id: ma1c-2.4
title: Factorising expressions
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.4'
---

# Factorising expressions

When we write an expression as a multiplication, it is called
**factorising expressions**. Factorising makes it easier to solve certain
equations and to simplify rational expressions.

::: formel "Factorising"
Find one or more **common factors** of all the terms in the expression.
"Take out" the common factor and complete the expression by "working
backwards".
:::

::: exempel "Example 1: Factorise as far as possible"
**Factorise as far as possible<br>a)&nbsp;$27x^2 - 18x$&emsp;&emsp;b)&nbsp;$5x^3 + 20x^5$&emsp;&emsp;c)&nbsp;$21x^2 - 14$&emsp;&emsp;d)&nbsp;$4x^3 - 6x^2 + 10x$&emsp;&emsp;e)&nbsp;$81y - 45x^2y + 27xy^2$**

::: handskrift
typ: faktoriseraut
:::

::: textlosning
**a)** We start by looking at the coefficients. The largest number that 27
and 18 are both divisible by is 9 (they are both in the 9 times table), so
9 is a common factor. So we can take out **9**.

Next we look at the variables. All the terms contain the variable $x$.
Then we can take out the *lowest* power of $x$. So we can take out
$x$.

Since we can take out both 9 and $x$, we take out $9x$. Then
we open a bracket after it and apply "the distributive law backwards"
so that the expression becomes the same as the original one. We only close
the bracket once all the terms are written, since we do not know in
advance how long it will be:

$$
9x(\phantom{3x - 2}
$$

We think "$9x$ times something must give $27x^2$". It must be $3x$. So
we write $3x$ in the bracket. After $27x^2$ in the original
expression there is a minus sign. So we write a minus sign.
Finally we think "$9x$ times something must give $18x$". It must be 2.
So we write 2 in the bracket. Since we are then done, we finish
with a closing bracket:

$$
27x^2 - 18x = 9x(3x - 2)
$$

(If we want, we can check that the expression becomes $27x^2 - 18x$ when we
carry out the multiplication.)

**Answer:** $9x(3x - 2)$

**b)** By the same reasoning as in part a), we can take out
$5x^3$ here, since the greatest common divisor of 5 and 20 is **5** and
the lowest power of the variables is $x^3$. We put a bracket after it
and fill it in so that the expression, when multiplied, becomes the same as
the original one:

$$
5x^3 + 20x^5 = 5x^3(1 + 4x^2)
$$

**Answer:** $5x^3(1 + 4x^2)$

**c)** In this case we can only take out 7 (a common divisor of 21 and
14) and no variable, since there is also a constant term that does not
contain any $x$:

$$
21x^2 - 14 = 7(3x^2 - 2)
$$

**Answer:** $7(3x^2 - 2)$

**d)** In this case we have three terms. Then we must find a factor common
to all three terms. 4, 6 and 10 are all divisible by 2. So we can
take out **2**. The lowest power of $x$ is $x$. So we can take out
$x$. Together, then, we can take out $2x$:

$$
4x^3 - 6x^2 + 10x = 2x(2x^2 - 3x + 5)
$$

**Answer:** $2x(2x^2 - 3x + 5)$

**e)** In this case we again have three terms, which also contain two
different variables: $x$ and $y$. Then we have to look at each variable separately.

81, 45 and 27 have **9** as a common factor. The first term contains
no $x$, so we cannot take out any $x$. All the terms contain
$y$. Then we can take out the lowest power of $y$, that is, $y$. Together,
then, we take out $9y$:

$$
81y - 45x^2y + 27xy^2 = 9y(9 - 5x^2 + 3xy)
$$

**Answer:** $9y(9 - 5x^2 + 3xy)$
:::
:::

## Taking out a whole expression in brackets

The common factor does not have to be a number or a variable. If
the same expression in brackets appears in several terms, the whole bracket is a
common factor, and it can then be taken out just as if it were a single
factor. In the expression $3(x + 2) - x(x + 2)$, both terms contain
the factor $(x + 2)$:

$$
3(x + 2) - x(x + 2) = (x + 2)(3 - x)
$$

The bracket $(x + 2)$ is written first. The new bracket contains what
is left of each term once $(x + 2)$ has been removed: $3$ from the first
term and $-x$ from the second.

It is also possible to take more out of an expression where a factor has **already been
taken out**. In $2(3x - 9)$ there is a 2 in front of the bracket, but inside
the bracket both $3x$ and 9 are divisible by 3. Then we take 3 out of
the bracket too and multiply the two factors in front together:

$$
2(3x - 9) = 2 \cdot 3(x - 3) = 6(x - 3)
$$

Only when what is left in the bracket has no common factor is
the expression factorised as far as possible.

::: formel "Taking out a bracket"
If the same expression in brackets appears in all the terms, the bracket is a common
factor that can be taken out:

$$
a(x + 2) + b(x + 2) = (x + 2)(a + b)
$$

Always check that the expression is factorised **as far as possible**.
What is left inside the bracket must not have any common factor
left: $5(9x - 6)$ is not finished, since 9 and 6 are both divisible
by 3.
:::

::: exempel "Example 2: Taking out a bracket"
**Factorise as far as possible<br>a)&nbsp;$5(9x - 6)$&emsp;&emsp;b)&nbsp;$3(x + 2) - x(x + 2)$**

::: handskrift
typ: faktoriseraparentes
:::

::: textlosning
**a)** The factor 5 has already been taken out, but the expression is not factorised as
far as possible. Inside the bracket both 9 and 6 are divisible by 3, so 3
can be taken out of the bracket too:

$$
5(9x - 6) = 5 \cdot 3(3x - 2) = 15(3x - 2)
$$

Now $3x$ and 2 have no common factor left, and the expression is
fully factorised.

**Answer:** $15(3x - 2)$

**b)** The bracket $(x + 2)$ appears in both terms. Then the whole bracket
is a common factor that can be taken out, in the same way as $9x$ was taken out in
Example 1. We write $(x + 2)$ first, put an empty bracket after it and
fill it in term by term. $(x + 2)$ times something must give $3(x + 2)$,
so 3. And $(x + 2)$ times something must give $-x(x + 2)$, so $-x$:

$$
3(x + 2) - x(x + 2) = (x + 2)(3 - x)
$$

Check: if we multiply $(x + 2)$ into the second bracket, we get
back $3(x + 2) - x(x + 2)$.

**Answer:** $(x + 2)(3 - x)$
:::
:::

## Writing even numbers, odd numbers and consecutive numbers

Factorising is also used to **show** that something holds for all
numbers of a certain kind, for example that a sum is always divisible by 3.
Then it is not enough to try a few numbers and leave it at that. Instead the numbers must
be written with a variable, so that the expression holds for any number
at all.

::: formel "Writing numbers with a variable"
Let $k$ and $n$ be integers.

- **Even numbers** are written $2k$. The numbers 0, 2, 4, 6, … are all 2 times an
  integer.
- **Odd numbers** are written $2k + 1$. An odd number comes one step after an
  even number: 1, 3, 5, 7, …
- **Numbers divisible by 3** are written $3n$. In the same way, $53n$ is always
  divisible by 53.
- **Three consecutive integers** are written $n$, $n + 1$ and $n + 2$,
  or just as well $n - 1$, $n$ and $n + 1$.
:::

Here you can see the link to factorising: a number is divisible by 3 if it
can be written as 3 times an integer. To show that a sum is always
divisible by 3, we write the sum with a variable, simplify it and
factorise. If we can take out the factor 3, we are done.

::: exempel "Example 3: Showing that a sum is divisible by a number"
**a) Show that the sum of four consecutive integers is always an even number.<br>b) Show that the sum of two consecutive odd numbers is always divisible by 4.**

::: handskrift
typ: delbarhet
:::

::: textlosning
**a)** We call the smallest of the numbers $n$. The three following numbers are then
$n + 1$, $n + 2$ and $n + 3$. We write the sum, remove the brackets
(a plus sign in front of brackets does not change any signs) and collect like
terms:

$$
n + (n + 1) + (n + 2) + (n + 3) = 4n + 6
$$

An even number is a number that can be written as 2 times an integer. Both
$4n$ and 6 have the factor 2, which we take out:

$$
4n + 6 = 2(2n + 3)
$$

Since $n$ is an integer, $2n + 3$ is also an integer. So the sum is
2 times an integer, and therefore an even number, whatever number $n$ is.

The factorisation also shows that the sum is never divisible by 4:
$2n + 3$ is an odd number, so there is no further factor 2 to take out.

**Answer:** The sum can be written $2(2n + 3)$ and is therefore always an even
number.

**b)** An odd number is written $2k + 1$. The next odd number is two steps
further on, so $2k + 1 + 2 = 2k + 3$. We write the sum and simplify:

$$
(2k + 1) + (2k + 3) = 4k + 4
$$

Both $4k$ and 4 have the factor 4, which we take out:

$$
4k + 4 = 4(k + 1)
$$

$k + 1$ is an integer, so the sum is 4 times an integer and therefore divisible
by 4.

**Answer:** The sum can be written $4(k + 1)$ and is therefore always divisible
by 4.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Factorising"
- Writing an expression as a **multiplication**. The opposite of
  expanding.
- Makes it easier to solve certain equations and simplify fractions.
:::

::: sampunkt "How to do it"
1. Find the **greatest common factor** of **all** the terms.
2. Take it out in front of a bracket.
3. Fill in the bracket by working backwards: what must each term
   be multiplied by to give the original one?
4. Check by multiplying back in. Do not forget the 1 when a whole
   term is taken out.
:::

::: sampunkt "Take out both numbers and variables"
- $27x^2 - 18x = 9x(3x - 2)$: both 9 and $x$ are common.
- Take out the **lowest** power that appears:
  $5x^3 + 20x^5 = 5x^3(1 + 4x^2)$.
- Sometimes only a number is common:
  $21x^2 - 14 = 7(3x^2 - 2)$.
:::

::: sampunkt "Take out a whole bracket"
- If the same bracket appears in all the terms, it is a common factor:
  $3(x + 2) - x(x + 2) = (x + 2)(3 - x)$.
- **As far as possible**: look inside the bracket too, even if a
  factor has already been taken out: $2(3x - 9) = 2 \cdot 3(x - 3) = 6(x - 3)$.
:::

::: sampunkt "Writing numbers with a variable"
- Even numbers: $2k$. Odd numbers: $2k + 1$.
- Numbers divisible by 3: $3n$.
- Three consecutive integers: $n$, $n + 1$, $n + 2$ (or $n - 1$,
  $n$, $n + 1$).
:::

::: sampunkt "Showing divisibility"
- Write, simplify and factorise. If the factor is visible, the sum is divisible by
  it.
- $n + (n + 1) + (n + 2) + (n + 3) = 4n + 6 = 2(2n + 3)$: always an
  even number.
:::
:::
