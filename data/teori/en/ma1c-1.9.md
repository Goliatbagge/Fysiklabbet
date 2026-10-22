---
kalla: 6b7d356d45
id: ma1c-1.9
title: Standard form and prefixes
course: Matematik nivå 1c
chapter: Aritmetik
chapterNumber: 1
section: '1.9'
---

# Standard form and prefixes

## Standard form

A power of 10 is called a **power of ten**. To write large and small
numbers more easily, you can use powers of ten. If a number is given as a number
between 1 and 10 followed by a power of ten, it is written in **standard form**.

::: formel "Standard form"
A number in standard form is written

$$
a \cdot 10^n \quad \text{where } 1 \leq a < 10 \text{ and } n \text{ is an integer.}
$$
:::

::: formel "The exponent of the power of ten"
If a number is written in standard form, then for numbers

- **greater than 1**, the exponent of the power of ten gives the number of whole-number digits
  *after* the first digit
- **less than 1**, the exponent of the power of ten gives the number of zeros *before*
  the first digit.
:::

::: exempel "Example 1: Write in standard form"
**Write in standard form<br>a) 8 000 000 000&emsp;&emsp;b) 743 000&emsp;&emsp;c) 0.0009&emsp;&emsp;d) 0.000024**

::: handskrift
typ: grundpotens
:::

::: textlosning
**a)** The leading number should be between 1 and 10. In this case it is 8.
The number of digits after the first one gives the exponent of the power of ten. In this case it is
9.

**Answer:** $8 \cdot 10^9$

**b)** In this case the standard form starts with 7.43. The number of digits
after the first one gives the exponent of the power of ten. In this case it is 5.

**Answer:** $7.43 \cdot 10^5$ (note that the exponent should be 5 and
not 3)

**c)** In this case the standard form starts with 9. The number of zeros before the
first non-zero digit gives the negative exponent of the power of ten. In this case there are
4 zeros.

**Answer:** $9 \cdot 10^{-4}$

**d)** In this case the standard form starts with 2.4. The number of zeros before
the first non-zero digit gives the negative exponent of the power of ten. In this case there
are 5 zeros.

**Answer:** $2.4 \cdot 10^{-5}$
:::
:::

## Prefixes

A letter that replaces a power of ten and is placed in front of a unit is called a
**prefix**. All the prefixes you need are on the formula sheet.

::: formel "Prefixes"
| Symbol | Name | Power of ten |
| --- | --- | --- |
| T | tera | $10^{12}$ |
| G | giga | $10^{9}$ |
| M | mega | $10^{6}$ |
| k | kilo | $10^{3}$ |
| h | hecto | $10^{2}$ |
| da | deca | $10^{1}$ |
| d | deci | $10^{-1}$ |
| c | centi | $10^{-2}$ |
| m | milli | $10^{-3}$ |
| µ | micro | $10^{-6}$ |
| n | nano | $10^{-9}$ |
| p | pico | $10^{-12}$ |
:::

::: exempel "Example 2: Write with a suitable prefix"
**Write with a suitable prefix<br>a) 2 000 000 000 000 B&emsp;&emsp;b) 0.0047 l&emsp;&emsp;c) 270 000 N&emsp;&emsp;d) 0.000082 g**

::: handskrift
typ: prefix
:::

::: textlosning
**a)** A good first step is to write the number in standard form:

$$
2\,000\,000\,000\,000\ \mathrm{B} = 2.0 \cdot 10^{12}\ \mathrm{B}
$$

Then you replace the power of ten with its prefix. Here $10^{12}$ is replaced by
T (see the table above).

**Answer:** 2.0 TB

**b)** Standard form and prefix:

$$
0.0047\ \mathrm{l} = 4.7 \cdot 10^{-3}\ \mathrm{l} = 4.7\ \mathrm{ml}
$$

**Answer:** 4.7 ml

**c)** In standard form: $270\,000\ \mathrm{N} = 2.7 \cdot 10^5\ \mathrm{N}$.

We have no prefix for $10^5$. We rewrite the number with a nearby power of ten
that we do have a prefix for, for example $10^6$. **NOTE!** When we increase
the power of ten from $10^5$ to $10^6$, we make the power of ten 10 times as large.
For the number to keep its size, we must at the same time make the number in front of
the power of ten 10 "times as small", that is, 2.7 must then be changed to
$\dfrac{2.7}{10} = 0.27$:

$$
2.7 \cdot 10^5\ \mathrm{N} = 0.27 \cdot 10^6\ \mathrm{N} = 0.27\ \mathrm{MN}
$$

**Answer:** 0.27 MN

**d)** Standard form, adjustment to a power of ten that has a prefix, and replacement
with the prefix:

$$
0.000082\ \mathrm{g} = 8.2 \cdot 10^{-5}\ \mathrm{g} = 82 \cdot 10^{-6}\ \mathrm{g} = 82\ \mathrm{µg}
$$

**Answer:** 82 µg
:::
:::

::: exempel "Example 3: Write without a prefix"
**Write 5 MHz without a prefix.**

::: handskrift
typ: utanprefix
:::

::: textlosning
Replace the prefix with its power of ten:

$$
5\ \mathrm{MHz} = 5 \cdot 10^6\ \mathrm{Hz}
$$

**Answer:** $5 \cdot 10^6$ Hz (5 000 000 Hz)
:::
:::

::: exempel "Example 4: The hard drive"
**Josefin has bought a 2.0 TB external hard drive. How many video files
fit on it if a file is 4.0 GB on average?**

::: handskrift
typ: harddisk
:::

::: textlosning
We want to find out how many files of size 4.0 GB fit on a
hard drive of size 2.0 TB. So we divide the size of the hard drive
by the size of one file to get the number. To get the correct
number we need to convert to the same unit in the numerator and denominator,
for example by rewriting the prefixes as powers of ten:

$$
\text{number of files} = \frac{2.0\ \mathrm{TB}}{4.0\ \mathrm{GB}}
= \frac{2.0 \cdot 10^{12}\ \mathrm{B}}{4.0 \cdot 10^{9}\ \mathrm{B}}
= 0.5 \cdot 10^3 = 500\ \text{files}
$$

**Answer:** 500 files
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Standard form"
- $a \cdot 10^{n}$ where $1 \leq a < 10$ and $n$ is an integer.
- A convenient way of writing very large and very small numbers.
:::

::: sampunkt "Finding the exponent"
- **Numbers greater than 1**: the exponent is the number of whole-number digits **after** the
  first digit. $743\,000 = 7.43 \cdot 10^{5}$.
- **Numbers less than 1**: the exponent is **minus** the number of zeros before the first
  non-zero digit. $0.0009 = 9 \cdot 10^{-4}$.
:::

::: sampunkt "Prefixes"
- A letter that replaces a power of ten and is placed in front of the unit.
- Large: T ($10^{12}$), G ($10^{9}$), M ($10^{6}$), k ($10^{3}$).
- Small: d ($10^{-1}$), c ($10^{-2}$), m ($10^{-3}$),
  µ ($10^{-6}$), n ($10^{-9}$), p ($10^{-12}$).
- All the prefixes you need are on the **formula sheet**.
:::

::: sampunkt "Calculating with prefixes"
- Rewrite in standard form first, then calculate.
- $2.0\ \mathrm{TB}$ divided by $4.0\ \mathrm{GB}$ gives
  $\dfrac{2.0 \cdot 10^{12}}{4.0 \cdot 10^{9}} = 500$.
:::
:::
