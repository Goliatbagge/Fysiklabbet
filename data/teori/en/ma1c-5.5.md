---
kalla: 4fa041d2fa
id: ma1c-5.5
title: Experimental probabilities
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.5'
---

# Experimental probabilities

::: härledning "Introduction: Experimental probabilities"
What is the probability of being hit on the head by a meteorite? There are
two possible outcomes:

1. You are hit on the head by a meteorite.
2. You are not hit on the head by a meteorite.

According to the classical definition of probability, the probability would then
be

$$
P(\text{being hit by a meteorite}) = \frac{1}{2} = 0.5 = 50\ \%
$$

*That is of course not true. There is not a 50 % risk of getting a space rock on
the head. But why does the classical
definition of probability not work?*

Well, because the probabilities of the two outcomes are not equal! So
the classical definition of probability does not apply!

*But how can we find out how big the probability is of being hit
on the head by a meteorite?*

We have to wait long enough until someone actually is hit by a
meteorite. Only then do we know approximately (if we want to avoid complicated
astronomical calculations). And it has happened! The probability of dying from a
meteorite is approximately 1 in 1 600 000 (compared with the probability 1 in 93
of dying in some kind of motor vehicle accident).
:::

Events where the probability is not obvious lead to
**experimental probabilities**. The experimental probability
is determined through repeated trials and can be given as a percentage as a **relative
frequency**. The more trials, the more exact the probability will be.

::: exempel "Example 1: The penalty shoot-out"
**Asllani takes 200 penalties against Musovic. The result is recorded continuously in
the table below.**

| Number of penalties | Number of goals | Number of "no goal" | Relative frequency of goals |
| --- | --- | --- | --- |
| 1 | 1 | 0 | $1/1 = 1 = 100\ \%$ |
| 2 | 1 | 1 | $1/2 = 0.5 = 50\ \%$ |
| 5 | 2 | 3 | $2/5 = 0.4 = 40\ \%$ |
| 10 | 5 | 5 | $5/10 = 0.5 = 50\ \%$ |
| 50 | 34 | 16 | $34/50 = 0.68 = 68\ \%$ |
| 100 | 70 | 30 | $70/100 = 0.7 = 70\ \%$ |
| 200 | 139 | 61 | $139/200 \approx 0.70 = 70\ \%$ |

**What is the probability, as a percentage, that the next penalty<br>a) is a goal?&emsp;&emsp;b) is not a goal?**

::: handskrift
typ: relativfrekvens
:::

::: textlosning
**a)** We look at the relative frequency for all the penalties and see that
it is approximately 70 %.

**Answer:** 70 %

**b)** The probability that it is not a goal must be
$100\ \% - 70\ \% = 30\ \%$. (This is called the complementary event or
the complement. More about that later.)

**Answer:** 30 %
:::
:::

::: exempel "Example 2: Girl or boy?"
**In 2022, 50 901 girls and 53 833 boys were born in Sweden. If you have
a child, what is the probability that it is a girl?**

::: handskrift
typ: flickapojke
:::

::: textlosning
The number of girls born is 50 901 out of a total of
$(50\,901 + 53\,833) = 104\,734$ children. That gives

$$
P(\text{girl}) = \frac{50\,901}{104\,734} = 0.4860\ldots \approx 48.6\ \%
$$

**Answer:** Approximately 48.6 %
:::
:::

::: sammanfattning "Summary"

::: sampunkt "When the classical definition is not enough"
- It requires all outcomes to be **equally likely**.
- "Hit by a meteorite or not" is two outcomes, but definitely not
  50 % each.
:::

::: sampunkt "Experimental probability"
- Determined through **repeated trials** instead of through reasoning.
- Given as a **relative frequency**:
  $\dfrac{\text{number of times the event occurred}}{\text{number of trials}}$.
:::

::: sampunkt "More trials give a better value"
- After a few trials the value jumps a lot: 1 out of 1 gives 100 %.
- After many trials it **settles down** around the true value.
- Therefore use **the largest** number of trials in the table.
:::

::: sampunkt "From statistics"
- Real statistics work like one big trial.
- 50 901 girls out of 104 734 births give a probability of approximately 48.6 %.
:::
:::
