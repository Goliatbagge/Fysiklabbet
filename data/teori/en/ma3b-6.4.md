---
kalla: b890a4807b
id: ma3b-6.4
title: Geometric sum
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.4'
---

# Geometric sum

In the previous sections we have determined individual terms in geometric
sequences, for example how much an amount has grown after a certain
number of years. Often you instead want to know how much **all the terms come to
together**. If you deposit money in a savings account every year, it is exactly
the sum of all the deposits, with interest, that is in the account in the end.

A sum of the terms of a geometric sequence is called a **geometric
sum**. The sum of the first $n$ terms is denoted $s_{\mathit{n}}$.

::: kuriosa "The chessboard and the grains of rice"
According to an old story, the inventor of chess was allowed to wish for a
reward from the king. He asked for one grain of rice on the first square of the board, two
grains on the second, four on the third and so on, with twice as
many grains on each new square. The king thought that it sounded like a modest
wish. A chessboard has 64 squares, so the number of grains becomes

$$
1 + 2 + 4 + 8 + \ldots + 2^{63}
$$

That is a geometric sum with the common ratio 2. With the formula below the sum becomes
$2^{64} - 1$, which is about $1.8 \cdot 10^{19}$ grains. That is
hundreds of times more rice than the whole world harvests in a year.
:::

::: formel "Geometric sum"
The sum of the first $n$ terms of a geometric sequence is

$$
s_{\mathit{n}} = a_1 + a_1 \cdot k + a_1 \cdot k^2 + \ldots + a_1 \cdot k^{n-1} = \frac{a_1(k^n - 1)}{k - 1}
$$

where

- $s_{\mathit{n}}$ = sum of the first $n$ terms
- $a_1$ = first term
- $k$ = common ratio ($k \neq 1$)
- $n$ = number of terms

::: härledning "Derivation: the formula for a geometric sum"
We write out the sum, term by term:

$$
s_{\mathit{n}} = a_1 + a_1 k + a_1 k^2 + \ldots + a_1 k^{n-1} \tag{1}
$$

We multiply both sides by the common ratio $k$. Each term then moves one step
up in the sequence:

$$
k \cdot s_{\mathit{n}} = a_1 k + a_1 k^2 + \ldots + a_1 k^{n-1} + a_1 k^n \tag{2}
$$

Almost all the terms are in both sums. Only $a_1$ in (1) and
$a_1 k^n$ in (2) lack a partner. So all the other
terms disappear when we subtract (1),
$s_{\mathit{n}} = a_1 + a_1 k + \ldots + a_1 k^{n-1}$, from (2):

$$
k \cdot s_{\mathit{n}} - s_{\mathit{n}} = a_1 k^n - a_1
$$

We take out $s_{\mathit{n}}$ as a common factor on the left-hand side and $a_1$ on the right-hand side:

$$
s_{\mathit{n}}(k - 1) = a_1(k^n - 1)
$$

Finally we divide both sides by $k - 1$. This is possible because
$k \neq 1$, and then $k - 1 \neq 0$:

$$
s_{\mathit{n}} = \frac{a_1(k^n - 1)}{k - 1}
$$
:::
:::

If the common ratio is less than 1, both the numerator and the denominator become negative, but
the quotient between them is still positive. So the formula works for all
common ratios except $k = 1$. (If $k = 1$ all the terms are equal to $a_1$, and then
the sum is simply $n \cdot a_1$.)

::: tips "How to find $a_1$, $k$ and $n$ in a sum"
1. $a_1$ is the first term of the sum.
2. You get the common ratio $k$ by dividing a term by the term before it, for
   example $k = \dfrac{a_2}{a_1}$.
3. $n$ is the number of terms. If the last term is written as
   $a_1 \cdot k^{n-1}$, the exponent is $n - 1$, so the number of terms is
   **the exponent plus 1**. If the last term is given as a number, you solve
   the equation $a_1 \cdot k^{n-1} = \text{the last term}$.
:::

::: exempel "Example 1: Determine the sum"
**Determine<br>a) the sum $3 + 6 + 12 + \ldots + 3 \cdot 2^{9}$<br>b) the sum of the first 8 terms of the geometric sequence $200,\ 100,\ 50,\ \ldots$**

::: handskrift
typ: geosumma
:::

::: textlosning
**a)** The first term is $a_1 = 3$. The common ratio is $k = \dfrac{6}{3} = 2$.
The last term $3 \cdot 2^9$ is $a_{\mathit{n}} = a_1 \cdot k^{n-1}$, so
$n - 1 = 9$. So the sum has $n = 10$ terms. Substituting into
$s_{\mathit{n}} = \dfrac{a_1(k^n - 1)}{k - 1}$ gives

$$
s_{10} = \frac{3(2^{10} - 1)}{2 - 1} = \frac{3 \cdot 1\,023}{1} = 3\,069
$$

**Answer:** 3 069

**b)** The first term is $a_1 = 200$ and the common ratio is
$k = \dfrac{100}{200} = 0.5$. We are to add up $n = 8$ terms.

$$
s_8 = \frac{200(0.5^8 - 1)}{0.5 - 1} = \frac{-199.21875}{-0.5} = 398.4375
$$

Both the numerator and the denominator are negative, so the sum is positive, just
as it should be when all the terms are positive.

**Answer:** 398.4375
:::
:::

::: exempel "Example 2: How many terms?"
**The sum $5 + 15 + 45 + \ldots + 98\,415$ is a geometric sum.<br>a) How many terms does the sum have?<br>b) Determine the sum.**

::: handskrift
typ: geotermer
:::

::: textlosning
**a)** The first term is $a_1 = 5$ and the common ratio is $k = \dfrac{15}{5} = 3$.
The last term is $a_{\mathit{n}} = 5 \cdot 3^{n-1}$, and it must be 98 415:

$$
5 \cdot 3^{n-1} = 98\,415
$$

We divide both sides by 5:

$$
3^{n-1} = 19\,683
$$

The unknown is in the exponent, so we take the logarithm of both sides (lg, the common logarithm log₁₀) and move
the exponent down with the law of logarithms:

$$
\lg 3^{n-1} = \lg 19\,683
$$

$$
(n - 1) \cdot \lg 3 = \lg 19\,683
$$

We divide both sides by $\lg 3$:

$$
n - 1 = \frac{\lg 19\,683}{\lg 3} = 9
$$

We add 1 to both sides:

$$
n = 10
$$

**Answer:** 10 terms

**b)** Now we know that $a_1 = 5$, $k = 3$ and $n = 10$. Substituting into
$s_{\mathit{n}} = \dfrac{a_1(k^n - 1)}{k - 1}$ gives

$$
s_{10} = \frac{5(3^{10} - 1)}{3 - 1} = \frac{5 \cdot 59\,048}{2} = 147\,620
$$

**Answer:** 147 620
:::
:::

## Regular saving

Suppose that you deposit 5 000 kr in a savings account **at the end of every year**,
and that the interest rate is 2.8 %. The change factor is then 1.028. Each deposit
grows with interest from the day it is deposited. The first deposit is made at
the end of year 1 and has time to grow for 9 years, up to the end of year 10. The
last deposit is made at the end of year 10 and has no time to grow at all.
The figure below shows how long each deposit grows.

::: figur
<svg viewBox="-73.3 -4 400.9 190" width="664" height="315" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Timeline over ten years. Deposits 1, 2, 3, 9 and 10 are made at the end of years 1, 2, 3, 9 and 10. An arrow from each deposit to year 10 shows how long it grows: deposit 1 becomes 5 000 times 1.028 to the power 9, deposit 2 becomes 5 000 times 1.028 to the power 8, and the last deposit, 5 000 kr, has no time to grow at all."><line x1="250" y1="2" x2="250" y2="150" stroke="#1f2530" stroke-width="1" stroke-dasharray="3 3" opacity="0.55"/><text x="-6" y="18" font-size="11" text-anchor="end" fill="#1f2530">Deposit 1</text><line x1="52" y1="14" x2="242" y2="14" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,14 241,10.4 241,17.6" fill="#2b5ca8"/><circle cx="52" cy="14" r="3.2" fill="#1f2530"/><text x="258" y="18" font-size="11" fill="#1f2530">5&#160;000 · 1.028<tspan dy="-5" font-size="8">9</tspan></text><text x="-6" y="40" font-size="11" text-anchor="end" fill="#1f2530">Deposit 2</text><line x1="74" y1="36" x2="242" y2="36" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,36 241,32.4 241,39.6" fill="#2b5ca8"/><circle cx="74" cy="36" r="3.2" fill="#1f2530"/><text x="258" y="40" font-size="11" fill="#1f2530">5&#160;000 · 1.028<tspan dy="-5" font-size="8">8</tspan></text><text x="-6" y="62" font-size="11" text-anchor="end" fill="#1f2530">Deposit 3</text><line x1="96" y1="58" x2="242" y2="58" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,58 241,54.4 241,61.6" fill="#2b5ca8"/><circle cx="96" cy="58" r="3.2" fill="#1f2530"/><text x="258" y="62" font-size="11" fill="#1f2530">5&#160;000 · 1.028<tspan dy="-5" font-size="8">7</tspan></text><circle cx="162" cy="74" r="1.3" fill="#1f2530"/><circle cx="162" cy="80" r="1.3" fill="#1f2530"/><circle cx="162" cy="86" r="1.3" fill="#1f2530"/><text x="-6" y="108" font-size="11" text-anchor="end" fill="#1f2530">Deposit 9</text><line x1="228" y1="104" x2="242" y2="104" stroke="#2b5ca8" stroke-width="1.6" stroke-linecap="butt"/><polygon points="249,104 241,100.4 241,107.6" fill="#2b5ca8"/><circle cx="228" cy="104" r="3.2" fill="#1f2530"/><text x="258" y="108" font-size="11" fill="#1f2530">5&#160;000 · 1.028</text><text x="-6" y="130" font-size="11" text-anchor="end" fill="#1f2530">Deposit 10</text><circle cx="250" cy="126" r="3.2" fill="#1f2530"/><text x="258" y="130" font-size="11" fill="#1f2530">5&#160;000</text><line x1="30" y1="150" x2="264" y2="150" stroke="#1f2530" stroke-width="1.4"/><polygon points="272,150 262,145.5 262,154.5" fill="#1f2530"/><line x1="30" y1="147" x2="30" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="30" y="166" font-size="11" text-anchor="middle" fill="#1f2530">0</text><line x1="52" y1="147" x2="52" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="52" y="166" font-size="11" text-anchor="middle" fill="#1f2530">1</text><line x1="74" y1="147" x2="74" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="74" y="166" font-size="11" text-anchor="middle" fill="#1f2530">2</text><line x1="96" y1="147" x2="96" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="96" y="166" font-size="11" text-anchor="middle" fill="#1f2530">3</text><line x1="118" y1="147" x2="118" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="118" y="166" font-size="11" text-anchor="middle" fill="#1f2530">4</text><line x1="140" y1="147" x2="140" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="140" y="166" font-size="11" text-anchor="middle" fill="#1f2530">5</text><line x1="162" y1="147" x2="162" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="162" y="166" font-size="11" text-anchor="middle" fill="#1f2530">6</text><line x1="184" y1="147" x2="184" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="184" y="166" font-size="11" text-anchor="middle" fill="#1f2530">7</text><line x1="206" y1="147" x2="206" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="206" y="166" font-size="11" text-anchor="middle" fill="#1f2530">8</text><line x1="228" y1="147" x2="228" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="228" y="166" font-size="11" text-anchor="middle" fill="#1f2530">9</text><line x1="250" y1="147" x2="250" y2="153" stroke="#1f2530" stroke-width="1.2"/><text x="250" y="166" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="272" y="181" font-size="11" text-anchor="end" fill="#1f2530">Year</text></svg>

Each arrow shows how many years the deposit grows up to the end of year 10.
:::

Immediately after the tenth deposit the balance is the sum of the values of all
the deposits. We write it with the last deposit first:

$$
5\,000 + 5\,000 \cdot 1.028 + 5\,000 \cdot 1.028^2 + \ldots + 5\,000 \cdot 1.028^9
$$

That is a geometric sum. The first term is $a_1 = 5\,000$, the common ratio is
the change factor $k = 1.028$, and the number of terms is $n = 10$, one term
for each deposit.

::: tips "Regular saving: keep track of the points in time"
1. The number of terms $n$ is equal to **the number of deposits**.
2. The common ratio $k$ is **the change factor**, for example $1.028$ for
   2.8 % interest.
3. The first term $a_1$ is what the **last** deposit has grown
   to. If the last deposit is made on the same day as you calculate
   the balance, it has not grown at all, and then $a_1$ is equal to
   the deposit.
4. If the deposits are made at the **beginning** of each year and you calculate
   the balance at the end of the last year, each deposit has grown one
   more year. Then $a_1 = \text{the deposit} \cdot k$.
:::

::: exempel "Example 3: The savings account"
**Elin deposits 5 000 kr in a savings account at the end of every year. The interest rate is 2.8 %.<br>a) How much is in the account immediately after the tenth deposit?<br>b) How much would have been in the account at the end of the tenth year if Elin had instead deposited the money at the beginning of every year?**

::: handskrift
typ: geosparkonto
:::

::: textlosning
**a)** The balance is the sum of the values of the ten deposits, with the
last deposit first (see the figure above):

$$
5\,000 + 5\,000 \cdot 1.028 + \ldots + 5\,000 \cdot 1.028^9
$$

That is a geometric sum with $a_1 = 5\,000$, $k = 1.028$ and
$n = 10$. Substituting into $s_{\mathit{n}} = \dfrac{a_1(k^n - 1)}{k - 1}$ gives

$$
s_{10} = \frac{5\,000(1.028^{10} - 1)}{1.028 - 1} = 56\,794.242\ldots \approx 56\,794.24
$$

We got the same answer when we calculated the balance year by year in a
spreadsheet in Mathematics level 1b.

**Answer:** 56 794.24 kr

**b)** Now each deposit is made one year earlier. The last
deposit is made at the beginning of year 10 and has time to grow for one year, so it has
grown to

$$
5\,000 \cdot 1.028 = 5\,140
$$

All the other deposits have also grown one year more than in a). The sum
is still geometric, with $a_1 = 5\,140$, $k = 1.028$ and
$n = 10$:

$$
s_{10} = \frac{5\,140(1.028^{10} - 1)}{1.028 - 1} = 58\,384.481\ldots \approx 58\,384.48
$$

That is 1 590.24 kr more than in a). After all, the money has been able to grow one year
longer.

**Answer:** 58 384.48 kr
:::
:::

::: exempel "Example 4: How long does Elin have to save?"
**Elin continues to deposit 5 000 kr at the end of every year, at the interest rate 2.8 %. How many deposits are needed for the balance immediately after the last deposit to be at least 100 000 kr?**

::: handskrift
typ: geospartid
:::

::: textlosning
After $n$ deposits the balance is a geometric sum with
$a_1 = 5\,000$, $k = 1.028$ and $n$ terms. We find out when it is
equal to 100 000 kr:

$$
\frac{5\,000(1.028^n - 1)}{1.028 - 1} = 100\,000
$$

The denominator is $1.028 - 1 = 0.028$. We multiply both sides by
0.028:

$$
5\,000(1.028^n - 1) = 2\,800
$$

We divide both sides by 5 000:

$$
1.028^n - 1 = 0.56
$$

We add 1 to both sides:

$$
1.028^n = 1.56
$$

The unknown is in the exponent, so we take the logarithm of both sides and move
the exponent down with the law of logarithms:

$$
\lg 1.028^n = \lg 1.56
$$

$$
n \cdot \lg 1.028 = \lg 1.56
$$

We divide both sides by $\lg 1.028$:

$$
n = \frac{\lg 1.56}{\lg 1.028} = 16.10\ldots
$$

The number of deposits must be an integer. After 16 deposits the
balance has not yet reached 100 000 kr, so one more deposit is
needed. We check:

$$
s_{16} = \frac{5\,000(1.028^{16} - 1)}{1.028 - 1} \approx 99\,209
$$

$$
s_{17} = \frac{5\,000(1.028^{17} - 1)}{1.028 - 1} \approx 106\,987
$$

**Answer:** 17 deposits
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Geometric sum"
- The sum of the terms of a geometric sequence.
- $s_{\mathit{n}}$ is the sum of the first $n$ terms.
- The formula applies for all common ratios except $k = 1$:
  $s_{\mathit{n}} = \dfrac{a_1(k^n - 1)}{k - 1}$.
:::

::: sampunkt "Finding $a_1$, $k$ and $n$"
- $a_1$ is the first term.
- $k = \dfrac{a_2}{a_1}$, a term divided by the term before it.
- $n$ is the number of terms: the exponent in the last term **plus 1**.
:::

::: sampunkt "Unknown number of terms"
- Set the last term equal to $a_1 \cdot k^{n-1}$, or the sum equal to
  the formula.
- Isolate the power and take the logarithm of both sides.
- The number of terms is an integer: round in the right direction.
:::

::: sampunkt "Regular saving"
- The balance is a geometric sum with $k$ = the change factor.
- $n$ = the number of deposits.
- $a_1$ = what the last deposit has grown to.
- Deposit at the beginning of the year: each deposit grows one more year.
:::
:::
