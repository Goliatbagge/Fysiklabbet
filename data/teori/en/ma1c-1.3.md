---
kalla: 28d5098874
id: ma1c-1.3
title: Adding and subtracting fractions
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.3'
---

# Adding and subtracting fractions

When you add (+) and subtract (−) fractions, it helps if all the
fractions have the **same denominator** before you carry out the calculation.

::: formel "Adding and subtracting fractions"
If the fractions have

- **the same denominator**: add/subtract the numerators, keep the denominator. Simplify
  if possible.
- **different denominators**: expand one or more of the fractions so that all the fractions
  have the same denominator. Then carry out the calculation.
:::

::: exempel "Example 1: Same denominator"
**Calculate<br>a) $\dfrac{1}{13} + \dfrac{2}{13}$&emsp;&emsp;b) $\dfrac{19}{6} - \dfrac{5}{6}$**

::: handskrift
typ: samnamnare
:::

::: textlosning
**a)** The fractions already have the same denominator. Add the numerators and keep the denominator:

$$
\frac{1}{13} + \frac{2}{13} = \frac{1 + 2}{13} = \frac{3}{13}
$$

**Answer:** $\dfrac{3}{13}$

**b)** Subtract the numerators, keep the denominator, and simplify the answer:

$$
\frac{19}{6} - \frac{5}{6} = \frac{19 - 5}{6} = \frac{14}{6} = \frac{14/2}{6/2} = \frac{7}{3}
$$

**Answer:** $\dfrac{7}{3}$
:::
:::

## Finding a common denominator

::: formel "Finding a common denominator"
**Method 1:** Expand the fraction with the smallest denominator so that its denominator becomes
the same as in the fraction with the largest denominator.

**Method 2:** If method 1 does not work: expand the first fraction by the
denominator of the second fraction, and expand the second fraction by the denominator of the
first fraction. This always gives a common denominator, but not
necessarily the *lowest* common denominator.
:::

::: exempel "Example 2: Different denominators"
**Calculate<br>a) $\dfrac{3}{5} - \dfrac{7}{20}$&emsp;&emsp;b) $\dfrac{2}{5} + \dfrac{1}{3}$**

::: handskrift
typ: olikanamnare
:::

::: textlosning
**a)** We can expand the fraction with the smallest denominator (5) so that its denominator
becomes the same as in the fraction with the largest denominator (20), by expanding
it by 4 (since $5 \cdot 4 = 20$):

$$
\frac{3}{5} - \frac{7}{20} = \frac{3 \cdot 4}{5 \cdot 4} - \frac{7}{20}
= \frac{12}{20} - \frac{7}{20} = \frac{12 - 7}{20} = \frac{5}{20}
= \frac{5/5}{20/5} = \frac{1}{4}
$$

**Answer:** $\dfrac{1}{4}$

**b)** The smallest denominator here is 3. But we cannot multiply 3 by an
integer to get 5, so method 1 does not work. We then use method 2 and
expand both fractions by each other's denominators: we expand $\dfrac{2}{5}$ by
3 and $\dfrac{1}{3}$ by 5. This gives

$$
\frac{2}{5} + \frac{1}{3} = \frac{2 \cdot 3}{5 \cdot 3} + \frac{1 \cdot 5}{3 \cdot 5}
= \frac{6}{15} + \frac{5}{15} = \frac{6 + 5}{15} = \frac{11}{15}
$$

**Answer:** $\dfrac{11}{15}$
:::
:::

::: formel "Finding the lowest common denominator (LCD)"
1. Write the denominators in a column each and fill the columns with their
   multiples, about 8 of them.
2. The first multiple that appears in both columns is the lowest
   common denominator.

**NOTE!** This method becomes cumbersome when the denominators are large. There is
another method, prime factorisation, which we go through next.
:::

::: exempel "Example 3: The lowest common denominator"
**Find the lowest common denominator of 10 and 6 and then calculate
$\dfrac{7}{10} - \dfrac{1}{6}$.**

::: handskrift
typ: mgn
:::

::: textlosning
We write the denominators in two columns and fill in their multiples:

| Multiples of 10 | Multiples of 6 |
| --- | --- |
| 10 | 6 |
| 20 | 12 |
| **30** | 18 |
| 40 | 24 |
| 50 | **30** |
| 60 | 36 |
| 70 | 42 |
| 80 | 48 |

We see that 30 is the first multiple that appears in both columns, so
LCD = 30. We now expand both fractions so that the denominators become 30 and then
calculate as usual:

$$
\frac{7}{10} - \frac{1}{6} = \frac{7 \cdot 3}{10 \cdot 3} - \frac{1 \cdot 5}{6 \cdot 5}
= \frac{21}{30} - \frac{5}{30} = \frac{21 - 5}{30} = \frac{16}{30}
= \frac{16/2}{30/2} = \frac{8}{15}
$$

**Answer:** $\dfrac{8}{15}$
:::
:::

## The lowest common denominator by prime factorisation

The table of multiples works well as long as the denominators are small. But what do you do with
$\dfrac{5}{72} + \dfrac{7}{108}$? Writing out multiples of 72 and 108
until they meet takes a long time, and it is easy to make a mistake along the way. There is
a method that is always just as quick, no matter how large the denominators are:
**prime factorisation**.

### Prime numbers and factor trees

A **prime number** is an integer greater than 1 that is only divisible by 1 and
itself: 2, 3, 5, 7, 11, 13, 17, 19 and so on. All other integers greater
than 1 can be broken down into prime numbers, much as a molecule can be broken down into
atoms. To **prime factorise** a number means to write it as a
product of prime numbers:

$$
12 = 2 \cdot 2 \cdot 3 \qquad 18 = 2 \cdot 3 \cdot 3
$$

The easiest way to do this is with a **factor tree**. Split the number into two factors,
then split each factor that is not a prime number, and continue until all
branches end in prime numbers. The prime numbers at the ends of the branches are the factors, see the figure
below.

::: figur
<svg viewBox="25 12 284 146" width="385" height="198" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two factor trees. 12 splits into 2 and 6, and 6 splits into 2 and 3. 18 splits into 2 and 9, and 9 splits into 3 and 3. The prime numbers at the ends of the branches are circled. Below the trees it says 12 = 2 · 2 · 3 and 18 = 2 · 3 · 3."><line x1="64.4" y1="30.5" x2="47.6" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="79.6" y1="30.5" x2="96.4" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="96.7" y1="74.7" x2="81.3" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="111.3" y1="74.7" x2="126.7" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><text x="72" y="25" font-size="14" text-anchor="middle" fill="#1f2530">12</text><circle cx="40" cy="64" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="40" y="69" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">2</text><text x="104" y="69" font-size="14" text-anchor="middle" fill="#1f2530">6</text><circle cx="74" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="74" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">2</text><circle cx="134" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="134" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">3</text><line x1="224.4" y1="30.5" x2="207.6" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="239.6" y1="30.5" x2="256.4" y2="53.5" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="256.7" y1="74.7" x2="241.3" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><line x1="271.3" y1="74.7" x2="286.7" y2="97.3" stroke="#1f2530" stroke-width="1.4" stroke-linecap="round"/><text x="232" y="25" font-size="14" text-anchor="middle" fill="#1f2530">18</text><circle cx="200" cy="64" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="200" y="69" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">2</text><text x="264" y="69" font-size="14" text-anchor="middle" fill="#1f2530">9</text><circle cx="234" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="234" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">3</text><circle cx="294" cy="108" r="11" fill="none" stroke="#2563c9" stroke-width="1.6"/><text x="294" y="113" font-size="14" text-anchor="middle" fill="#2563c9" font-weight="600">3</text><text x="72" y="154" font-size="14" text-anchor="middle" fill="#1f2530">12 = <tspan fill="#2563c9" font-weight="600">2 · 2 · 3</tspan></text><text x="232" y="154" font-size="14" text-anchor="middle" fill="#1f2530">18 = <tspan fill="#2563c9" font-weight="600">2 · 3 · 3</tspan></text></svg>

Factor trees for 12 and 18. The branches end in prime numbers, which are circled. It
makes no difference how you start splitting: $12 = 2 \cdot 6$ or
$12 = 3 \cdot 4$ gives the same prime numbers in the end.
:::

### Build the denominator from the prime factors

Now comes the actual idea. A common denominator of 12 and 18 must be divisible
by **both** 12 and 18.

- Divisible by $12 = 2 \cdot 2 \cdot 3$: then the number must contain at least
  **two twos** and **one three**.
- Divisible by $18 = 2 \cdot 3 \cdot 3$: then the number must contain at least
  **one two** and **two threes**.

The smallest number that meets both requirements contains two twos (as many as 12
requires) and two threes (as many as 18 requires), and not a single factor
more. The table shows how to count:

| | Number of twos | Number of threes |
| --- | --- | --- |
| $12 = 2 \cdot 2 \cdot 3$ | 2 | 1 |
| $18 = 2 \cdot 3 \cdot 3$ | 1 | 2 |
| **The LCD takes the most of each** | **2** | **2** |

$$
\text{LCD} = 2 \cdot 2 \cdot 3 \cdot 3 = 36
$$

Compare with method 2, simply multiplying the denominators: $12 \cdot 18 = 216$.
That is also a common denominator, but six times larger than necessary.
In the product $216 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3$ the
factors that 12 and 18 have in common (one two and one three) are included twice.
The numerators then become unnecessarily large and the simplification at the end unnecessarily
laborious.

::: formel "Finding the LCD by prime factorisation"
1. Prime factorise each denominator, for example with a factor tree.
2. Include each prime number as many times as it occurs **the most** times
   in any one of the denominators.
3. Multiply the factors together. The product is the lowest common
   denominator.

The method works for any number of denominators and for numbers of any
size, and it always gives the **lowest** common denominator.
:::

**Check against example 3.** There the table of multiples gave LCD $= 30$ for
the denominators 10 and 6. With prime factorisation: $10 = 2 \cdot 5$ and
$6 = 2 \cdot 3$. The two occurs at most once, the three once and
the five once, so LCD $= 2 \cdot 3 \cdot 5 = 30$. The same answer, as it
should be.

::: härledning "NOTE: two common mistakes"
- **Including all factors from both trees.** Then you get
  $2 \cdot 2 \cdot 3 \cdot 2 \cdot 3 \cdot 3 = 216$, that is, the product
  of the denominators. It is a common denominator, but not the lowest. A prime number
  that occurs in both denominators is only counted as many times as in the denominator
  where it occurs **the most** times.
- **Including only the factors that are shared.** Then you get
  $2 \cdot 3 = 6$, and 6 is not divisible by either 12 or 18. That
  number is instead the greatest common divisor, which is used when you
  **simplify** fractions, not when you want to find a common denominator.
:::

::: exempel "Example 4: The LCD by prime factorisation"
**Find the lowest common denominator of 72 and 108 using
prime factorisation and then calculate $\dfrac{5}{72} + \dfrac{7}{108}$.**

::: handskrift
typ: mgnprim
:::

::: textlosning
We prime factorise the denominators with a factor tree each. 72 splits into
$8 \cdot 9$, 8 splits into $2 \cdot 4$ and 4 into $2 \cdot 2$, while 9 splits into
$3 \cdot 3$:

$$
72 = 8 \cdot 9 = 2 \cdot 4 \cdot 3 \cdot 3 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3
$$

108 splits into $4 \cdot 27$, 4 splits into $2 \cdot 2$, 27 into $3 \cdot 9$ and 9 into
$3 \cdot 3$:

$$
108 = 4 \cdot 27 = 2 \cdot 2 \cdot 3 \cdot 9 = 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3
$$

The two occurs at most **three** times (in 72) and the three at most **three**
times (in 108). The LCD therefore gets three twos and three threes:

$$
\text{LCD} = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 3 = 216
$$

Now we expand both fractions so that the denominators become 216. Since
$72 \cdot 3 = 216$ and $108 \cdot 2 = 216$ we expand by 3 and 2 respectively
and then calculate as usual:

$$
\frac{5}{72} + \frac{7}{108} = \frac{5 \cdot 3}{72 \cdot 3} + \frac{7 \cdot 2}{108 \cdot 2}
= \frac{15}{216} + \frac{14}{216} = \frac{15 + 14}{216} = \frac{29}{216}
$$

29 is a prime number that does not divide evenly into 216, so the fraction cannot be
simplified.

**Answer:** $\dfrac{29}{216}$
:::
:::

## Fraction form and mixed form

Fraction form and mixed form are two different ways of writing fractions. Mixed form can
be used when the numerator is larger than the denominator. In calculations, fraction form should *always*
be used, so it is useful to be able to switch from mixed form to
fraction form.

Look at the "cakes" below:

::: figur
<svg viewBox="2 2 234 234" width="421" height="421" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Four circles divided into quarters. Three circles are completely shaded. The fourth circle has three quarters shaded, and the last quarter is only marked with a dashed outline."><circle cx="57" cy="57" r="52" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><line x1="57" y1="5" x2="57" y2="109" stroke="#1f2530" stroke-width="1.3"/><line x1="5" y1="57" x2="109" y2="57" stroke="#1f2530" stroke-width="1.3"/><circle cx="182" cy="57" r="52" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><line x1="182" y1="5" x2="182" y2="109" stroke="#1f2530" stroke-width="1.3"/><line x1="130" y1="57" x2="234" y2="57" stroke="#1f2530" stroke-width="1.3"/><circle cx="57" cy="182" r="52" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><line x1="57" y1="130" x2="57" y2="234" stroke="#1f2530" stroke-width="1.3"/><line x1="5" y1="182" x2="109" y2="182" stroke="#1f2530" stroke-width="1.3"/><path d="M 182 182 L 182 130 A 52 52 0 1 0 234 182 Z" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.6"/><path d="M 182 182 L 182 130 A 52 52 0 0 1 234 182 Z" fill="none" stroke="#1f2530" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="182" y1="182" x2="130" y2="182" stroke="#1f2530" stroke-width="1.3"/><line x1="182" y1="182" x2="182" y2="234" stroke="#1f2530" stroke-width="1.3"/></svg>

Three whole cakes and three quarters: 15 quarters in total.
:::

The shaded areas correspond in **fraction form** to $\dfrac{15}{4}$ (15
quarters). We can also let them correspond in **mixed form** to
$3\frac{3}{4}$ (3 wholes and 3 quarters). So $\dfrac{15}{4}$ (fraction form)
$= 3\frac{3}{4}$ (mixed form).

::: exempel "Example 5: Write in fraction form"
**Write in fraction form<br>a) $1\dfrac{4}{5}$&emsp;&emsp;b) $3\dfrac{1}{7}$**

::: handskrift
typ: brakform
:::

::: textlosning
**a)** Take the number in front of the fraction (1) and multiply it by the denominator (5).
Add the number in the numerator (4). Divide the whole sum by the denominator (5):

$$
1\frac{4}{5} = \frac{1 \cdot 5 + 4}{5} = \frac{9}{5}
$$

**Answer:** $\dfrac{9}{5}$

**b)** We do the same as in part a:

$$
3\frac{1}{7} = \frac{3 \cdot 7 + 1}{7} = \frac{22}{7}
$$

**Answer:** $\dfrac{22}{7}$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The basic rule"
- **Same denominator**: add or subtract the **numerators** and keep
  the denominator. Simplify if possible.
- **Different denominators**: first expand so that all the fractions have the same denominator.
- The denominators are **never** added.
:::

::: sampunkt "Finding a common denominator"
- **Method 1**: expand the fraction with the smallest denominator so that it becomes equal
  to the largest. Works when one denominator is a multiple of the
  other.
- **Method 2**: expand each fraction by the **other** one's denominator. Always works,
  but does not always give the lowest common denominator.
:::

::: sampunkt "The lowest common denominator"
- **Table of multiples**: write the multiples of the denominators in a column each. The
  **first** multiple that is in both is the LCD.
- **Prime factorisation**: factorise the denominators. Include each prime number as
  many times as it occurs **the most** times in one denominator, and
  multiply.
- $12 = 2 \cdot 2 \cdot 3$ and $18 = 2 \cdot 3 \cdot 3$ give
  LCD $= 2 \cdot 2 \cdot 3 \cdot 3 = 36$.
:::

::: sampunkt "Fraction form and mixed form"
- **Fraction form**: $\dfrac{15}{4}$, that is, 15 quarters.
- **Mixed form**: $3\frac{3}{4}$, that is, 3 wholes and 3 quarters.
- In **calculations, fraction form is always used**, so convert mixed form
  first.
- From mixed to fraction form: multiply the whole number by the denominator and
  add the numerator.
:::
:::
