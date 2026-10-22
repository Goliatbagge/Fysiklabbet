---
kalla: 65060d0169
id: ma1c-2.8
title: Problem solving with equations
course: Matematik nivå 1c
chapter: Algebra och ekvationer
chapterNumber: 2
section: '2.8'
---

# Problem solving with equations

When we translate a problem into mathematical language in order to solve it, we
are doing **problem solving**.

::: formel "Method for problem solving"
1. **Translate.** Define and introduce a symbol, for example $x$, for what is
   sought and set up an equation.
2. **Solve the equation.**
3. **Interpret and answer** with a unit. Is the answer reasonable?
:::

::: exempel "Example 1: Dividing up an amount"
**Rayan, Arielle and Samuel are to share 4 000 kr. Rayan is to get twice as
much as Arielle and Samuel is to get 300 kr less than Rayan. How large an
amount does Arielle get?**

::: handskrift
typ: delabelopp
:::

::: textlosning
**1. Translate**

First we look at what is asked for. Arielle's amount is asked for. So we
call it $x$. *Write this down!*

$$
x = \text{Arielle's amount}
$$

This gives

$$
2x = \text{Rayan's amount}
$$

$$
2x - 300 = \text{Samuel's amount}
$$

We set up an equation and get

$$
x + 2x + (2x - 300) = 4\,000
$$

**2. Solve the equation**

$$
x + 2x + 2x - 300 = 4\,000
$$

$$
5x - 300 = 4\,000
$$

Add 300 to both sides:

$$
5x - 300 + 300 = 4\,000 + 300
$$

$$
5x = 4\,300
$$

Divide both sides by 5:

$$
\frac{5x}{5} = \frac{4\,300}{5}
$$

$$
x = 860
$$

**3. Interpret and answer**

$x$ was Arielle's amount, and 860 kr out of 4 000 kr is reasonable.

**Answer:** 860 kr
:::
:::

::: formel "Distance, speed and time"
Many problems are about something that moves. Then three quantities are linked,
and the same relationship can be written in three ways depending on what is sought:

$$
\begin{array}{ccccc} v = \dfrac{s}{t} & \Longleftrightarrow & s = v \cdot t & \Longleftrightarrow & t = \dfrac{s}{v} \end{array}
$$

where

- $v$ = speed, for example in km/h or m/s
- $s$ = distance, in km or m
- $t$ = time, in h or s

Speed is distance per unit of time. If you know two of the quantities, you get the
third. The units must match: if the speed is in km/h, the distance must be
in km and the time in hours, so 20 minutes is written as $\dfrac{20}{60}$ h and not
as 20.
:::

::: exempel "Example 2: There and back at different speeds"
**Amir cycles from home to the swimming spot at an average speed of 18 km/h and then
walks home the same way at an average speed of 6 km/h. The whole trip takes 1 hour and
20 minutes. How far is it to the swimming spot?**

::: handskrift
typ: framochtillbaka
:::

::: textlosning
This problem is harder than the first one, since what is asked for
(the distance) does not appear directly in the equation. The equation is about **time**.
The key is to express both times using the distance.

**1. Translate**

The distance is the same there and back, and that is what is asked for. We
let $x$ be the distance to the swimming spot in kilometres. *Write this down!*

$$
x = \text{the distance in km}
$$

We know the speeds, and we want the times. Speed is distance divided
by time, and if we solve that relationship for time, we get that time is distance
divided by speed:

$$
\begin{array}{ccc} \text{speed} = \dfrac{\text{distance}}{\text{time}} & \Longleftrightarrow & \text{time} = \dfrac{\text{distance}}{\text{speed}} \end{array}
$$

On the way there Amir cycles the distance $x$ km at a speed of 18 km/h, so the time there is
$x$ divided by 18. On the way home he walks the same distance $x$ km at a speed of 6 km/h:

$$
\text{time there} = \frac{x}{18}\ \text{h}
$$

$$
\text{time home} = \frac{x}{6}\ \text{h}
$$

The whole trip takes 1 hour and 20 minutes. The speeds are given in km/h, so
the time must be calculated in **hours**. 20 minutes is $\dfrac{20}{60} = \dfrac{1}{3}$
hour, so the whole trip takes $1 + \dfrac{1}{3} = \dfrac{4}{3}$ hours. (A common
trap is to write 1.2 hours. That is wrong: an hour has 60 minutes, not
100.)

The time there plus the time home is the whole trip. This gives the equation

$$
\frac{x}{18} + \frac{x}{6} = \frac{4}{3}
$$

**2. Solve the equation**

The equation has three fraction terms, just as in the section *Equations with
denominators*. The denominators are 18, 6 and 3, and the smallest number that all three
divide into exactly is 18, so LCD = 18. We multiply each numerator by 18:

$$
\frac{18x}{18} + \frac{18x}{6} = \frac{18 \cdot 4}{3}
$$

$$
x + 3x = 24
$$

$$
4x = 24
$$

Divide both sides by 4:

$$
\frac{4x}{4} = \frac{24}{4}
$$

$$
x = 6
$$

**3. Interpret and answer**

$x$ was the distance in kilometres, so it is 6 km to the swimming spot. Reasonableness:
6 km at 18 km/h takes $\dfrac{6}{18}$ h $= \dfrac{1}{3}$ h, that is, 20 minutes, and
6 km at 6 km/h takes a whole hour. Together that makes 1 hour and
20 minutes, exactly as in the task.

**Answer:** 6 km
:::
:::

::: härledning "How to think with harder problems"
This example shows three things that are good to take with you to the
harder tasks:

- **Let $x$ be the thing everything else can be expressed in terms of.** Here
  both times depend on the distance, so the distance is called $x$. Sometimes it is
  not the same as what is asked for: if the average speed for a trip
  there and back is sought, the distance can still be called $x$, and it disappears from
  the calculation at the end.
- **Use a relationship to translate.** Time $=$ distance divided by
  speed turns words like "cycles at 18 km/h" into an expression, $\dfrac{x}{18}$.
  The same goes for "twice as old" ($2x$), "5 years younger" ($x - 5$) or
  "three times as heavy" ($3x$).
- **Check the units before you set up the equation.** All the terms
  in the equation must have the same unit. Minutes are converted to hours as
  fractions, $20\ \text{min} = \dfrac{20}{60}\ \text{h} = \dfrac{1}{3}\ \text{h}$.
:::

## Pick out what matters in the text

A word problem often contains more than you need. There can be a whole little
story around the problem, and sometimes there are numbers in the text that are not
to be used at all. Before you translate into mathematics it therefore pays to
**clean up the text** with your pen.

::: tips "How to clean up a word problem"
1. **Circle the question.** What is it that is actually being asked?
2. **Underline** the numbers and relationships that are needed to answer the question.
3. **Cross out** everything else. Test each number: is it needed to answer
   the question, or is it just there?
4. **Write what is left in your own words.** Now the problem is short, and you can
   use the method in three steps.
:::

::: exempel "Example 3: Clean up the text first"
**It is Friday evening and Elin, who is in her first year at upper secondary school, is going to the
cinema with two friends. The cinema is 3 km from home, and the film starts at
19.30 and is 2 hours and 10 minutes long. Elin has 650 kr on her
bank card. At the till she buys three tickets, which cost the same, and a
large popcorn for 75 kr. In total she pays 480 kr. How much does one
ticket cost?**

::: handskrift
typ: rensatext
:::

::: textlosning
**Clean up the text**

We circle the question, underline what is needed and cross out the rest:

<del>It is Friday evening and Elin, who is in her first year at upper secondary school, is going
to the cinema with two friends. The cinema is 3 km from home, and the film starts
at 19.30 and is 2 hours and 10 minutes long. Elin has 650 kr on her
bank card. At the till</del> she buys <u>three tickets,</u> which <u>cost the
same,</u> and <u>a large popcorn for 75 kr. In total she pays
480 kr.</u> <span class="text-ringad">How much does one ticket cost?</span>

Watch out for 650 kr. It is a number in the text, but it is what Elin **has** on
her card, not what she pays. It is not needed to answer the question.

What is left: *Three tickets, which cost the same, and a popcorn for 75 kr
cost 480 kr together. How much does one ticket cost?*

**1. Translate**

What is asked for is the price of one ticket. So we call it $x$.

$$
x = \text{the price of one ticket in kr}
$$

Three tickets cost $3x$, and with the popcorn it comes to 480 kr:

$$
3x + 75 = 480
$$

**2. Solve the equation**

Subtract 75 from both sides:

$$
3x + 75 - 75 = 480 - 75
$$

$$
3x = 405
$$

Divide both sides by 3:

$$
\frac{3x}{3} = \frac{405}{3}
$$

$$
x = 135
$$

**3. Interpret and answer**

Three tickets at 135 kr cost 405 kr, and with the popcorn for 75 kr it
comes to 480 kr. That agrees with the text.

**Answer:** 135 kr
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The method in three steps"
1. **Translate.** Introduce a symbol for what is sought and set up an
   equation.
2. **Solve the equation.**
3. **Interpret and answer** with a unit. Check that the answer is reasonable.
:::

::: sampunkt "Clean up the text first"
- **Circle** the question, **underline** what is needed and **cross out**
  the rest.
- Not all the numbers in the text need to be used.
:::

::: sampunkt "Choose the symbol wisely"
- Let $x$ be the thing everything else can be expressed **in terms of**, not
  necessarily what the question is asking for.
- If one person gets twice as much as another: let $x$ be the
  **smallest** share, so you avoid fractions.
- **Always write down what $x$ means**, for example "let $x$ be Arielle's
  amount in kronor".
:::

::: sampunkt "Express the other quantities"
- "twice as much as $x$" becomes $2x$.
- "300 kr less than $2x$" becomes $2x - 300$.
- Motion: time is distance divided by speed, $t = \dfrac{s}{v}$.
- The sum of the parts is set equal to the whole.
:::

::: sampunkt "The last step is easily forgotten"
- If you solve for $x$ but the question was about someone else, calculate that quantity
  too.
- Answer with a **unit** and check that it is reasonable: negative ages or
  2.73 cows are a sign that something has gone wrong.
:::
:::
