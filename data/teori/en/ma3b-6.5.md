---
kalla: 7c613392b4
id: ma3b-6.5
title: Annuity loans
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.5'
---

# Annuity loans

Anyone who buys a car or a home seldom has the whole sum in their account and
therefore takes out a **loan**. The loan is paid back with regular
payments, and each payment consists of two parts:

- **Amortisation**: the part that pays back the loan itself, so that
  the debt decreases.
- **Interest**: the price of borrowing. The interest is calculated on the debt that
  remains.

In Mathematics level 1b we calculated with loans with **straight-line amortisation**. Then
you amortise the same amount each time. The debt decreases, so the interest becomes
smaller for each payment, and therefore the first payment is
the largest and the last the smallest.

## Annuity loans

With an **annuity loan** you instead pay **the same amount each
time**. The amount paid each time is called the **annuity**. The annuity
also consists of interest and amortisation, but the division between them
changes. At the beginning the debt is large, so the interest part is large and the amortisation
small. With each payment the debt decreases, the interest part shrinks and an
ever larger part of the annuity goes to amortisation.

The diagrams below compare the two types of loan for a loan of 100 000 kr
at an interest rate of 5 %, which is paid back with one payment at the end of each
year for five years.

::: figur
<svg viewBox="-42.7 -32 396.7 204" width="628" height="323" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two bar charts of the five annual payments on a loan of 100 000 kronor at 5 percent interest. With straight-line amortisation the amortisation is 20 000 kronor every year and the interest falls from 5 000 to 1 000 kronor, so the payment decreases from 25 000 to 21 000 kronor. With an annuity loan the payment is 23 097 kronor every year, but the interest part shrinks and the amortisation part grows."><line x1="0" y1="100" x2="150" y2="100" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="80" x2="150" y2="80" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="60" x2="150" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="40" x2="150" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0" y1="20" x2="150" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><rect x="10" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="10" y="20" width="18" height="20" fill="#c8324a"/><text x="19" y="134" font-size="11" text-anchor="middle" fill="#1f2530">1</text><rect x="38" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="38" y="24" width="18" height="16" fill="#c8324a"/><text x="47" y="134" font-size="11" text-anchor="middle" fill="#1f2530">2</text><rect x="66" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="66" y="28" width="18" height="12" fill="#c8324a"/><text x="75" y="134" font-size="11" text-anchor="middle" fill="#1f2530">3</text><rect x="94" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="94" y="32" width="18" height="8" fill="#c8324a"/><text x="103" y="134" font-size="11" text-anchor="middle" fill="#1f2530">4</text><rect x="122" y="40" width="18" height="80" fill="#2b5ca8"/><rect x="122" y="36" width="18" height="4" fill="#c8324a"/><text x="131" y="134" font-size="11" text-anchor="middle" fill="#1f2530">5</text><line x1="0" y1="120" x2="150" y2="120" stroke="#1f2530" stroke-width="1.4"/><line x1="0" y1="120" x2="0" y2="-2" stroke="#1f2530" stroke-width="1.4"/><polygon points="0,-10 -4.5,0 4.5,0" fill="#1f2530"/><text x="75" y="-18" font-size="12" text-anchor="middle" fill="#1f2530">Straight-line amortisation</text><text x="75" y="149" font-size="11" text-anchor="middle" fill="#1f2530">Year</text><line x1="200" y1="100" x2="350" y2="100" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="80" x2="350" y2="80" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="60" x2="350" y2="60" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="40" x2="350" y2="40" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="20" x2="350" y2="20" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><rect x="210" y="47.6" width="18" height="72.4" fill="#2b5ca8"/><rect x="210" y="27.6" width="18" height="20" fill="#c8324a"/><text x="219" y="134" font-size="11" text-anchor="middle" fill="#1f2530">1</text><rect x="238" y="44" width="18" height="76" fill="#2b5ca8"/><rect x="238" y="27.6" width="18" height="16.4" fill="#c8324a"/><text x="247" y="134" font-size="11" text-anchor="middle" fill="#1f2530">2</text><rect x="266" y="40.2" width="18" height="79.8" fill="#2b5ca8"/><rect x="266" y="27.6" width="18" height="12.6" fill="#c8324a"/><text x="275" y="134" font-size="11" text-anchor="middle" fill="#1f2530">3</text><rect x="294" y="36.2" width="18" height="83.8" fill="#2b5ca8"/><rect x="294" y="27.6" width="18" height="8.6" fill="#c8324a"/><text x="303" y="134" font-size="11" text-anchor="middle" fill="#1f2530">4</text><rect x="322" y="32" width="18" height="88" fill="#2b5ca8"/><rect x="322" y="27.6" width="18" height="4.4" fill="#c8324a"/><text x="331" y="134" font-size="11" text-anchor="middle" fill="#1f2530">5</text><line x1="200" y1="120" x2="350" y2="120" stroke="#1f2530" stroke-width="1.4"/><line x1="200" y1="120" x2="200" y2="-2" stroke="#1f2530" stroke-width="1.4"/><polygon points="200,-10 195.5,0 204.5,0" fill="#1f2530"/><text x="275" y="-18" font-size="12" text-anchor="middle" fill="#1f2530">Annuity loan</text><text x="275" y="149" font-size="11" text-anchor="middle" fill="#1f2530">Year</text><text x="-6" y="104" font-size="11" text-anchor="end" fill="#1f2530">5&#160;000</text><text x="194" y="104" font-size="11" text-anchor="end" fill="#1f2530">5&#160;000</text><text x="-6" y="84" font-size="11" text-anchor="end" fill="#1f2530">10&#160;000</text><text x="194" y="84" font-size="11" text-anchor="end" fill="#1f2530">10&#160;000</text><text x="-6" y="64" font-size="11" text-anchor="end" fill="#1f2530">15&#160;000</text><text x="194" y="64" font-size="11" text-anchor="end" fill="#1f2530">15&#160;000</text><text x="-6" y="44" font-size="11" text-anchor="end" fill="#1f2530">20&#160;000</text><text x="194" y="44" font-size="11" text-anchor="end" fill="#1f2530">20&#160;000</text><text x="-6" y="24" font-size="11" text-anchor="end" fill="#1f2530">25&#160;000</text><text x="194" y="24" font-size="11" text-anchor="end" fill="#1f2530">25&#160;000</text><text x="-6" y="-18" font-size="11" text-anchor="end" fill="#1f2530">kr</text><rect x="40" y="157" width="11" height="11" fill="#2b5ca8"/><text x="56" y="166" font-size="11" fill="#1f2530">Amortisation</text><rect x="160" y="157" width="11" height="11" fill="#c8324a"/><text x="176" y="166" font-size="11" fill="#1f2530">Interest</text></svg>

With straight-line amortisation the blue part is the same size every year. With an annuity loan
the whole bar is the same height every year.
:::

With the annuity loan you pay 23 097.48 kr every year. In the first year
the interest is 5 000 kr and the amortisation 18 097.48 kr. In the last year the interest is
only 1 099.88 kr and the amortisation 21 997.60 kr. With straight-line amortisation
the amortisation is always 20 000 kr, and the payment falls from 25 000 kr
to 21 000 kr.

## How large is the annuity?

The annuity is determined using present values. The bank lends $G$ kr today
and gets back $A$ kr after one year, $A$ kr after two years and so on.
A payment that is made in a few years is worth less today. As we saw in
the section on present value, the present value of $A$ kr paid in one year is equal to
$\dfrac{A}{k}$, in two years $\dfrac{A}{k^2}$, and so on, where $k$ is
the change factor. The loan works out exactly when **the loan amount is equal to
the sum of the present values of all the payments**. That sum is a geometric
sum.

::: formel "Annuity"
$$
A = \frac{G \cdot k^n \cdot (k - 1)}{k^n - 1}
$$

where

- $A$ = annuity (amount paid each time)
- $G$ = loan amount
- $k$ = change factor for the interest during one period between two payments
- $n$ = number of payments

::: härledning "Derivation: the formula for the annuity"
The loan $G$ kr is paid back with $n$ payments of $A$ kr, one at the end
of each period. The first payment is made in one period and has
the present value $\dfrac{A}{k}$. The last is made in $n$ periods and has
the present value $\dfrac{A}{k^n}$. The loan amount is the sum of the present values:

$$
G = \frac{A}{k} + \frac{A}{k^2} + \ldots + \frac{A}{k^n}
$$

We write the sum in reverse order, with the last payment first:

$$
G = \frac{A}{k^n} + \frac{A}{k^{n-1}} + \ldots + \frac{A}{k}
$$

Each term is the previous one times $k$. So it is a geometric
sum with the first term $a_1 = \dfrac{A}{k^n}$, the common ratio $k$ and $n$
terms. The formula $s_{\mathit{n}} = \dfrac{a_1(k^n - 1)}{k - 1}$ gives

$$
G = \frac{A}{k^n} \cdot \frac{k^n - 1}{k - 1}
$$

We multiply both sides by $k^n$:

$$
G \cdot k^n = \frac{A(k^n - 1)}{k - 1}
$$

We multiply both sides by $k - 1$:

$$
G \cdot k^n \cdot (k - 1) = A(k^n - 1)
$$

Finally we divide both sides by $k^n - 1$:

$$
A = \frac{G \cdot k^n \cdot (k - 1)}{k^n - 1}
$$

The line $G \cdot k^n = \dfrac{A(k^n - 1)}{k - 1}$ can also be read in
another way. The left-hand side is what the loan amount would have grown to after $n$
periods with interest. The right-hand side is what all the payments would have grown
to if they had been deposited in an account with the same interest rate, just as with
regular saving. The loan works out exactly when the two are equal.
:::
:::

::: tips "The interest rate for one period"
If the payments are made once a year, $k$ is the change factor for
the annual interest rate, for example $1.06$ for 6 % interest. If they are made every month,
$k$ is the change factor for the **monthly interest rate**, and $n$ is the number of
**months**. The monthly interest rate is calculated as the annual interest rate divided by 12: 6 %
annual interest gives the monthly interest rate 0.5 % and $k = 1.005$.
:::

::: exempel "Example 1: The loan as a sum of present values"
**Nora borrows 30 000 kr. The loan is to be paid back with three equal payments, one at the end of each year. The interest rate is 5 %. How large is each payment?**

::: handskrift
typ: annuitetnuvarde
:::

::: textlosning
We call the payment $A$ kr. The change factor is $k = 1.05$.
The payments are made in 1, 2 and 3 years, so their present values are
$\dfrac{A}{1.05}$, $\dfrac{A}{1.05^2}$ and $\dfrac{A}{1.05^3}$.
The loan amount is the sum of the present values:

$$
30\,000 = \frac{A}{1.05} + \frac{A}{1.05^2} + \frac{A}{1.05^3}
$$

We take out $A$ as a common factor on the right-hand side:

$$
30\,000 = A \left( \frac{1}{1.05} + \frac{1}{1.05^2} + \frac{1}{1.05^3} \right)
$$

The bracket is a number that we calculate:

$$
\frac{1}{1.05} + \frac{1}{1.05^2} + \frac{1}{1.05^3} = 2.7232\ldots
$$

The equation becomes

$$
30\,000 = A \cdot 2.7232\ldots
$$

We divide both sides by $2.7232\ldots$:

$$
A = \frac{30\,000}{2.7232\ldots} = 11\,016.256\ldots \approx 11\,016
$$

So Nora pays back $3 \cdot 11\,016 = 33\,048$ kr, about
3 000 kr more than she borrowed. That is reasonable for three years of interest at 5 %
on a debt that decreases.

**Answer:** About 11 016 kr
:::
:::

::: exempel "Example 2: The car loan"
**Sami borrows 120 000 kr for a car. The loan is an annuity loan with an interest rate of 6 %, and it is to be paid back with one payment at the end of each year for five years.<br>a) How large is the annuity?<br>b) How much does Sami pay in total, and how much of that is interest?<br>c) How much interest would Sami have paid in total if the loan had instead had straight-line amortisation, with one payment per year?**

::: handskrift
typ: annuitetbil
:::

::: textlosning
**a)** The loan amount is $G = 120\,000$, the change factor is $k = 1.06$
and the number of payments is $n = 5$. Substituting into the formula for the annuity,
$A = \dfrac{G \cdot k^n \cdot (k - 1)}{k^n - 1}$, gives

$$
A = \frac{120\,000 \cdot 1.06^5 \cdot (1.06 - 1)}{1.06^5 - 1} = 28\,487.568\ldots \approx 28\,488
$$

**Answer:** About 28 488 kr

**b)** Sami makes five payments of 28 487.568… kr:

$$
5 \cdot 28\,487.568\ldots = 142\,437.840\ldots \approx 142\,438
$$

Of that, 120 000 kr is the loan itself. The rest is interest:

$$
142\,437.840\ldots - 120\,000 = 22\,437.840\ldots \approx 22\,438
$$

**Answer:** About 142 438 kr in total, of which about 22 438 kr is interest.

**c)** With straight-line amortisation Sami amortises the same amount every year:

$$
\frac{120\,000}{5} = 24\,000
$$

The interest is 6 % of the debt before each payment. The debt decreases by
24 000 kr every year, so the interest amounts are

$$
\begin{aligned}
\text{year 1:}&\quad 0.06 \cdot 120\,000 = 7\,200 \\
\text{year 2:}&\quad 0.06 \cdot 96\,000 = 5\,760 \\
\text{year 3:}&\quad 0.06 \cdot 72\,000 = 4\,320 \\
\text{year 4:}&\quad 0.06 \cdot 48\,000 = 2\,880 \\
\text{year 5:}&\quad 0.06 \cdot 24\,000 = 1\,440
\end{aligned}
$$

The total interest is

$$
7\,200 + 5\,760 + 4\,320 + 2\,880 + 1\,440 = 21\,600
$$

With straight-line amortisation Sami pays about 838 kr less in interest. The debt
decreases faster at the beginning, so there is less debt to pay interest
on. In return, the first payments are larger.

**Answer:** 21 600 kr
:::
:::

::: exempel "Example 3: Monthly payments (harder)"
**Linnea borrows 200 000 kr for a car. The loan is an annuity loan with an annual interest rate of 6 %. It is to be paid back with one payment at the end of each month for five years, and the monthly interest rate is calculated as the annual interest rate divided by 12.<br>a) How large is the monthly payment?<br>b) How much interest does Linnea pay in total?**

::: handskrift
typ: annuitetmanad
:::

::: textlosning
**a)** The payments are made every month, so we calculate with the monthly interest rate.
The monthly interest rate is

$$
\frac{6\ \%}{12} = 0.5\ \%
$$

So the change factor for one month is $k = 1.005$. In five years

$$
n = 5 \cdot 12 = 60
$$

payments are made. The loan amount is $G = 200\,000$. Substituting into the formula for
the annuity, $A = \dfrac{G \cdot k^n \cdot (k - 1)}{k^n - 1}$, gives

$$
A = \frac{200\,000 \cdot 1.005^{60} \cdot (1.005 - 1)}{1.005^{60} - 1} = 3\,866.560\ldots \approx 3\,867
$$

**Answer:** About 3 867 kr

**b)** Linnea pays a total of

$$
60 \cdot 3\,866.560\ldots = 231\,993.618\ldots
$$

Of that, 200 000 kr is the loan itself, so the interest is

$$
231\,993.618\ldots - 200\,000 = 31\,993.618\ldots \approx 31\,994
$$

**Answer:** About 31 994 kr
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The concepts"
- **Amortisation**: the part that pays back the loan itself.
- **Interest**: the price of borrowing, calculated on the debt that remains.
- **Annuity**: the equal amount that is paid each time.
:::

::: sampunkt "Straight-line amortisation or annuity"
- **Straight-line amortisation**: the same amortisation each time. The payment decreases.
- **Annuity loan**: the same payment each time. The interest part decreases and
  the amortisation increases.
- Straight-line amortisation gives a little less interest in total.
:::

::: sampunkt "The formula for the annuity"
- $A = \dfrac{G \cdot k^n \cdot (k - 1)}{k^n - 1}$
- $G$ = loan amount, $k$ = change factor per period, $n$ = number of
  payments.
- Total cost: $n \cdot A$. Total interest: $n \cdot A - G$.
:::

::: sampunkt "Why the formula is correct"
- The loan amount is equal to the sum of the **present values** of the payments.
- The present values $\dfrac{A}{k^n}, \ldots, \dfrac{A}{k}$ form a geometric
  sum.
- Monthly payments: the monthly interest rate is the annual interest rate divided by 12, and $n$
  is counted in months.
:::
:::
