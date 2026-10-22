---
kalla: c9b5987828
id: ma3b-6.3
title: Present value
course: Matematik fortsättning nivå 1b
chapter: Geometrisk summa
chapterNumber: 6
section: '6.3'
---

# Present value

Would you rather have 10 000 kr today or 10 000 kr in five years? Most
people choose the money today, and there is a mathematical reason for that.
Money you have today can be deposited in an account and grow with interest. In five
years it will have become more than 10 000 kr. An amount that is paid out in the future is
therefore worth **less** than the same amount today. In this section we calculate
how much less.

## Future value

If we deposit an amount in an account with an interest rate of 4 %, it is multiplied by
the change factor 1.04 every year. After $n$ years it has been multiplied by
$1.04^n$. The amount after $n$ years is called the **future value**.

::: formel "Future value"
$$
{B = N \cdot \text{change factor}^{\,n}}
$$

where

- $B$ = amount after $n$ years (future value)
- $N$ = amount today
- $n$ = number of years
:::

10 000 kr at an interest rate of 4 % grows in five years to
$10\,000 \cdot 1.04^5 \approx 12\,167$ kr. The amounts year by year form a
geometric sequence with the common ratio 1.04.

## Present value

Now we turn the question round. An amount $B$ is paid out in $n$ years. How large an
amount would we need to deposit today for it to have grown to $B$ when
it is paid out? That amount is called the **present value** of $B$. We get it by
**dividing** by the change factor instead of multiplying.

::: formel "Present value"
$$
{N = \frac{B}{\text{change factor}^{\,n}}}
$$

where

- $N$ = present value
- $B$ = amount that is paid out in $n$ years
- $n$ = number of years

::: härledning "Derivation: The present value from the future value"
The present value $N$ is the amount that after $n$ years has grown to $B$:

$$
{N \cdot \text{change factor}^{\,n} = B}
$$

We divide both sides by $\text{change factor}^{\,n}$ and get

$$
{N = \frac{B}{\text{change factor}^{\,n}}}
$$
:::
:::

At an interest rate of 4 %, 12 167 kr in five years is therefore worth
$\dfrac{12\,167}{1.04^5} \approx 10\,000$ kr today. The interest rate used in the calculation
is often called the **discount rate**. The higher the interest rate, the less a
future amount is worth today, and the further away the payment is,
the less it is worth.

::: exempel "Example 1: The inheritance"
**Max is going to receive an inheritance of 200 000 kr in 6 years. What is the inheritance worth today if we use an interest rate of 3 %?**

::: handskrift
typ: nuvardearv
:::

::: textlosning
We are looking for the present value of 200 000 kr that is paid out in 6 years. The change factor
for the interest rate 3 % is 1.03.

$$
{N = \frac{B}{\text{change factor}^{\,n}} = \frac{200\,000}{1.03^6}}
$$

$$
N = 167\,496.851\ldots \approx 167\,497
$$

Reasonableness: the inheritance is worth less today than when it is paid out, and 3 % per
year for six years corresponds to about 19 %.

**Answer:** About 167 497 kr
:::
:::

## Comparing offers

Amounts that are paid out at different times cannot be compared directly.
If we convert them to present values, they are at the same point in time, today, and then we can
see which is worth the most.

::: exempel "Example 2: Now or later?"
**You have won a competition and may choose between 100 000 kr now and 120 000 kr in 4 years. Which alternative is worth the most if the interest rate is<br>a)&nbsp;4 %&emsp;&emsp;b)&nbsp;6 %**

::: handskrift
typ: nuellersenare
:::

::: textlosning
We calculate the present value of 120 000 kr that is paid out in 4 years and compare it with
100 000 kr today.

**a)** The change factor is 1.04.

$$
N = \frac{120\,000}{1.04^4} = 102\,576.502\ldots \approx 102\,577
$$

The present value is greater than 100 000 kr.

**Answer:** 120 000 kr in 4 years is worth the most.

**b)** The change factor is 1.06.

$$
N = \frac{120\,000}{1.06^4} = 95\,051.239\ldots \approx 95\,051
$$

Now the present value is less than 100 000 kr.

**Answer:** 100 000 kr now is worth the most.

So which alternative is best depends on the interest rate. With a high interest rate
the money grows quickly in the account, and then it pays to get it early.
:::
:::

## Several future payments

If an amount is paid out on several occasions, we calculate the present value of each
payment separately and add the present values. Each payment is divided by
the change factor raised to the number of years until that particular payment is made.

::: exempel "Example 3: The prize paid out in parts"
**A prize is paid out as 50 000 kr in 1 year, 50 000 kr in 2 years and 50 000 kr in 3 years. What is the prize worth today if we use an interest rate of 5 %?**

::: handskrift
typ: nuvardeflera
:::

::: textlosning
We calculate the present value of each payment. The change factor is 1.05.

$$
\frac{50\,000}{1.05} = 47\,619.047\ldots
$$

$$
\frac{50\,000}{1.05^2} = 45\,351.473\ldots
$$

$$
\frac{50\,000}{1.05^3} = 43\,191.879\ldots
$$

The present value of the prize is the sum of the three present values.

$$
N = 47\,619.047\ldots + 45\,351.473\ldots + 43\,191.879\ldots = 136\,162.401\ldots \approx 136\,162
$$

Reasonableness: the payments are 150 000 kr together, and since all of them
lie in the future, the prize is worth less than that today.

**Answer:** About 136 162 kr
:::
:::

The present values $\dfrac{50\,000}{1.05}$, $\dfrac{50\,000}{1.05^2}$ and
$\dfrac{50\,000}{1.05^3}$ form a geometric sequence, where each
term is the previous one divided by 1.05. So the common ratio is
$\dfrac{1}{1.05}$. With many payments it becomes laborious to
calculate each present value separately. In the next section we find a formula for
the sum of a geometric sequence, and with it the present value
of, for example, 20 years of payments can be calculated on one line.

::: sammanfattning "Summary"

::: sampunkt "Money today is worth more"
- Money today can be deposited and **grow with interest**.
- A future amount is therefore worth **less** than the same amount today.
:::

::: sampunkt "Future value and present value"
- Future value: $B = N \cdot \text{change factor}^{\,n}$
- Present value: $N = \dfrac{B}{\text{change factor}^{\,n}}$
- 200 000 kr in 6 years at 3 %: $\dfrac{200\,000}{1.03^6} \approx 167\,497$ kr.
:::

::: sampunkt "Comparing offers"
- Convert all the amounts to **present values** and compare them.
- The answer depends on the interest rate: a high interest rate makes early money worth more.
:::

::: sampunkt "Several payments"
- Calculate the present value of **each** payment and add them.
- The present values form a geometric sequence with the common ratio $\dfrac{1}{\text{change factor}}$.
:::
:::
