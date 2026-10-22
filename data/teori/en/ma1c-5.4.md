---
kalla: e9d01c03c1
id: ma1c-5.4
title: The classical definition of probability
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.4'
---

# The classical definition of probability

::: kuriosa "Introduction: Three true improbabilities"
On 28 July 1900, King Umberto I of Italy went to a restaurant for
dinner. When the owner, whose name was Umberto, took the king's order, he noticed that
they looked very much alike. So they spent the evening talking and
discovered that they were both born on 14 March 1844; they had both married women
named Margherita on the same day; and the restaurant had opened on the same day as
the king was crowned. The next day the king learned that the restaurant owner had died
in a mysterious shooting that same morning. While the king was talking to a friend about it,
the king was murdered by a man in the crowd.

Napoleon and Hitler were born 129 years apart, came to power 129
years apart, declared war on Russia 129 years apart and
were defeated 129 years apart.

Two twin boys were separated at birth. Their adoptive families
both named them James, they both trained as police officers and then married
a woman called Linda. They both had sons, one named James
Alan and one named James Allan. They divorced their wives Linda
and remarried women called Betty. They both had a dog
called Toy.

Roy Cleveland Sullivan, born 7 February 1912, died 28 September 1983, was
an American park ranger in Shenandoah National Park in Virginia. He is
the person who has been struck by lightning the most times. Between 1942 and 1977
Sullivan was struck by lightning on seven different occasions and survived them
all. For this reason he was nicknamed "The Human Lightning Rod".
All the cases have been confirmed by doctors.

**Conclusion: It is very probable that improbable things happen!**
:::

How big the chance/risk is that an event occurs is called **probability** and
is given in decimal, percentage or fraction form. The result of each random trial
is called an **outcome**. The set of all possible outcomes is called the **sample space**.
The outcomes that match the event are called **favourable outcomes**.

The probability of an event is written $P(\text{event})$ ($P$ from
"probability").

If every outcome is equally likely we have a **uniform
probability distribution**, which is calculated with **the classical
definition of probability**.

::: formel "The classical definition of probability"
The probability for a uniform probability distribution is

$$
P(\text{event}) = \frac{\text{number of favourable outcomes}}{\text{number of possible outcomes}}
$$
:::

When tossing a coin, every outcome has the same probability. There is the same
chance of getting heads as of getting tails. In a penalty shoot-out in football,
the probability of a goal is not the same as the probability of a miss. The formula above
therefore works for tossing a coin, but not for a penalty shoot-out.

The probability of an event is given in decimal form as a number between 0
and 1. Probability = 0 means that the event is impossible.
"The probability of rolling a seven on an ordinary die is 0."

Probability = 1 means that the event is certain to happen.
"The probability of pulling a white sock out of a drawer containing only white
socks is 1."

::: exempel "Example 1: Three classical probabilities"
**What is the probability of<br>a) getting tails when tossing a coin?<br>b) rolling at least 5 with an (ordinary) die?<br>c) drawing a hearts court card from a deck of cards?**

::: handskrift
typ: klassisksannolikhet
:::

::: textlosning
**a)** Number of favourable outcomes = 1 (tails). Number of possible outcomes = 2
(heads, tails):

$$
P(\text{tails}) = \frac{\text{number of favourable outcomes}}{\text{number of possible outcomes}} = \frac{1}{2} = 0.5 = 50\ \%
$$

**Answer:** 0.5

**b)** Number of favourable outcomes = 2 (five and six). Number of possible
outcomes = 6 (1, 2, 3, 4, 5, 6):

$$
P(\text{at least 5}) = \frac{2}{6} = \frac{1}{3} \approx 0.33 = 33\ \%
$$

**Answer:** $\dfrac{1}{3}$, or approximately 33 % or approximately 0.33

**c)** Number of favourable outcomes = 4 (jack of hearts, queen of hearts, king
of hearts and ace of hearts). Number of possible outcomes = 52 (all the cards in
the deck):

$$
P(\text{hearts court card}) = \frac{4}{52} = \frac{1}{13} \approx 0.077 = 7.7\ \%
$$

**Answer:** $\dfrac{1}{13}$, or approximately 7.7 % or approximately 0.077
:::
:::

## Probabilities with two objects

Tasks where we use two objects (throwing *two* dice,
tossing *two* coins and so on) are usually easiest to solve by drawing
the *sample space* (all possible combinations).

::: exempel "Example 2: Two dice"
**You throw two dice. What is the probability of getting<br>a) a sum of at
least 10?&emsp;&emsp;b) a sum greater than 10?**

::: handskrift
typ: tvatarningar
:::

::: textlosning
We draw the sample space for the sum of two dice and mark all the
favourable outcomes for part a (those that give the sum 10, 11 or 12):

::: figur
<svg viewBox="34 8 187 226" width="254" height="307" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The sample space for the sum of two dice: a table with die 1 along the bottom edge and die 2 along the left edge, where each square shows the sum of the two dice. The six squares with sum 10, 11 or 12 in the top right corner are shaded."><rect x="36" y="30" width="26" height="156" fill="rgba(31,37,48,0.055)"/><rect x="62" y="186" width="156" height="26" fill="rgba(31,37,48,0.055)"/><rect x="140" y="30" width="26" height="26" fill="#cfe3f2"/><rect x="166" y="56" width="26" height="26" fill="#cfe3f2"/><rect x="166" y="30" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="82" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="56" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="30" width="26" height="26" fill="#cfe3f2"/><line x1="62" y1="30" x2="62" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="30" x2="218" y2="30" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="88" y1="30" x2="88" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="56" x2="218" y2="56" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="114" y1="30" x2="114" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="82" x2="218" y2="82" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="108" x2="218" y2="108" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="166" y1="30" x2="166" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="134" x2="218" y2="134" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="192" y1="30" x2="192" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="160" x2="218" y2="160" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="218" y1="30" x2="218" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="186" x2="218" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="30" x2="36" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="186" x2="62" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="62" y1="212" x2="218" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><rect x="62" y="30" width="156" height="156" fill="none" stroke="#1f2530" stroke-width="1.4"/><text x="75" y="178" font-size="14" text-anchor="middle" fill="#1f2530">2</text><text x="75" y="152" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="75" y="126" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="75" y="100" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="75" y="74" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="75" y="48" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="101" y="178" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="101" y="152" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="101" y="126" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="101" y="100" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="101" y="74" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="101" y="48" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="127" y="178" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="127" y="152" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="127" y="126" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="127" y="100" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="127" y="74" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="127" y="48" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="153" y="178" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="153" y="152" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="153" y="126" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="153" y="100" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="153" y="74" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="153" y="48" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="179" y="178" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="179" y="152" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="179" y="126" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="179" y="100" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="179" y="74" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="179" y="48" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="205" y="178" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="205" y="152" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="205" y="126" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="205" y="100" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="205" y="74" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="205" y="48" font-size="14" text-anchor="middle" fill="#1f2530">12</text><text x="49" y="178" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">1</text><text x="49" y="152" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="49" y="126" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="49" y="100" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">4</text><text x="49" y="74" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="49" y="48" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">6</text><text x="75" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">1</text><text x="101" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="127" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="153" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">4</text><text x="179" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="205" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">6</text><text x="36" y="20" font-size="14" text-anchor="start" fill="#1f2530">die 2</text><text x="140" y="230" font-size="14" text-anchor="middle" fill="#1f2530">die 1</text></svg>
:::

**a)** Number of favourable outcomes = 6. Number of possible outcomes = 36:

$$
P(\text{at least 10}) = \frac{6}{36} = \frac{1}{6} \approx 0.17 = 17\ \%
$$

**Answer:** $\dfrac{1}{6}$, or approximately 17 % or approximately 0.17

**b)** "A sum over 10" means that we need the sum 11 or 12
(*not* 10: tell the wordings apart!). We look at the sample space above
again and count how many outcomes give 11 or 12.

Number of favourable outcomes = 3. Number of possible outcomes = 36:

$$
P(\text{greater than 10}) = \frac{3}{36} = \frac{1}{12} \approx 0.08 = 8\ \%
$$

**Answer:** $\dfrac{1}{12}$, or approximately 8 % or approximately 0.08
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Basic concepts"
- **Outcome**: the result of a random trial.
- **Sample space**: all possible outcomes.
- **Favourable outcomes**: the outcomes that match the event.
- The probability is written $P(\text{event})$, from the English word
  *probability*.
:::

::: sampunkt "The classical definition of probability"
- $P(\text{event}) = \dfrac{\text{number of favourable outcomes}}{\text{number of possible outcomes}}$
- Applies **only** to a **uniform probability distribution**, that is when
  every outcome is equally likely.
:::

::: sampunkt "When it does not apply"
- Tossing a coin works: heads and tails are equally likely.
- A penalty shoot-out does **not** work: goal and miss are not equally likely.
:::

::: sampunkt "The scale"
- Given in decimal, percentage or fraction form, always between 0 and 1.
- $P = 0$ means **impossible**, $P = 1$ means **certain**.
:::

::: sampunkt "Two objects"
- With two dice or two coins: **draw the whole sample space**.
- Two dice give 36 combinations. Then count the favourable ones.
- Think about the difference between "at least 10" and "greater than 10".
:::
:::
