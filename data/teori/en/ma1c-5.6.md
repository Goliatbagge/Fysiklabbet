---
kalla: ad5dca7b47
id: ma1c-5.6
title: The multiplication rule
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.6'
---

# The multiplication rule

::: kuriosa "Did you know: The deck of cards"
When you shuffle a deck of cards you can be fairly sure that the order
the cards end up in is completely unique in all of human history.
There are approximately $8 \cdot 10^{67}$ ways to shuffle a deck of cards, or more exactly
$52 \cdot 51 \cdot 50 \cdot 49 \cdot \ldots \cdot 3 \cdot 2 \cdot 1$
(read "52 factorial" and written "52!") = 80 658 175 170 943 878 571 660
636 856 403 766 975 289 505 440 883 277 824 000 000 000 000 possible
combinations.

This number is so large that even if we shuffled the deck once a second
since the Big Bang, the universe would have come to an end before we reached a one-in-a-billion
chance of getting the same sequence of cards. The number of possible shuffles
corresponds to as many atoms as in 600 quadrillion Earths. Or: Imagine
that we have a trillion people. That is 10 times as many people as
have ever lived on Earth. Give them a deck of cards each. Then give them the
instruction to shuffle their decks a trillion times a second for a
trillion years. Then let this play out in a trillion civilisations in
our universe. If you now take a deck of cards and shuffle it, there is only a
40 % chance that it is the same as any of the combinations that have
been shuffled in this imaginary universe. So when you shuffle a deck of cards you can
be fairly sure that that combination, from the first to the last
card, has never ever occurred in an earlier shuffle.
:::

When a combination of events happens, we can calculate the probability of
the combination by multiplying the probabilities of the individual
events, using the **multiplication rule**.

If the probability of an event

- is *not* affected by the event before, we have an **independent event**.
  For example, the probability of rolling a six with one throw of a die is
  $\dfrac{1}{6}$. The probability of rolling a six the next time with
  the die is still $\dfrac{1}{6}$ ("chance has no memory").
  Throws of dice are therefore independent events.
- is affected by the event before, we have a **dependent event**. For example,
  the probability of drawing a heart from a deck of cards is $\dfrac{13}{52}$. If
  I put the card aside ("without replacement"), the probability of
  drawing another heart from the deck is $\dfrac{12}{51}$ (12 hearts are
  left out of 51 cards in total). The probability of drawing a heart has changed!
  Drawing cards without replacement therefore gives dependent events.

::: exempel "Example 1: Two sixes in a row"
**What is the probability of rolling two sixes in a row with a die?**

::: handskrift
typ: tvasexor
:::

::: textlosning
The throws are independent, so multiply the probabilities:

$$
P(\text{two sixes}) = P(\text{six}) \cdot P(\text{six})
= \frac{1}{6} \cdot \frac{1}{6} = \frac{1}{36}
$$

**Answer:** $\dfrac{1}{36}$
:::
:::

::: exempel "Example 2: Yatzy!"
**What is the probability of rolling five sixes in one throw with five dice?
Yatzy!**

::: handskrift
typ: yatzy
:::

::: textlosning
$$
P(\text{five sixes}) = P(\text{six}) \cdot P(\text{six}) \cdot P(\text{six}) \cdot P(\text{six}) \cdot P(\text{six})
= \left(\frac{1}{6}\right)^5 = \frac{1^5}{6^5} = \frac{1}{7\,776}
\approx 0.00013 = 0.013\ \%
$$

**Answer:** 0.013 %
:::
:::

::: exempel "Example 3: Marbles with and without replacement"
**A bowl contains 6 red and 4 blue marbles. What is the probability of drawing
two blue marbles<br>a) with replacement?&emsp;&emsp;b) without replacement?**

::: handskrift
typ: aterlaggning
:::

::: textlosning
**a)** With replacement, the probabilities are not affected by previous
events:

$$
P(\text{two blue}) = P(\text{blue}) \cdot P(\text{blue})
= \frac{4}{10} \cdot \frac{4}{10} = \frac{16}{100} = 0.16 = 16\ \%
$$

**Answer:** 16 %

**b)** Without replacement, the probabilities are affected by previous
events. After we have drawn a blue marble (4 out of 10) there are only 3 blue
marbles left out of 9 marbles in total. So the probability of drawing a blue marble the second
time is $\dfrac{3}{9}$:

$$
P(\text{two blue}) = P(\text{blue}) \cdot P(\text{blue})
= \frac{4}{10} \cdot \frac{3}{9} = \frac{12}{90} = \frac{2}{15}
\approx 0.13 = 13\ \%
$$

**Answer:** 13 %
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The multiplication rule"
- The probability of a **combination** of events is found by
  **multiplying** the individual probabilities.
- Applies when the events happen one after another, that is "and".
:::

::: sampunkt "Independent events"
- The probability is **not** affected by what has happened before.
- Throwing a die: always $\dfrac{1}{6}$ for a six.
- **Chance has no memory.**
- Drawing **with** replacement is independent.
:::

::: sampunkt "Dependent events"
- The probability is **changed** by what has happened before.
- Cards **without** replacement: first
  $\dfrac{13}{52}$ for a heart, then only
  $\dfrac{12}{51}$.
- Both the numerator and the denominator decrease.
:::

::: sampunkt "How to do it"
1. Decide whether the events are independent or dependent.
2. Write the probability for each step, with **updated** numbers if they are
   dependent.
3. Multiply them together.
:::
:::
