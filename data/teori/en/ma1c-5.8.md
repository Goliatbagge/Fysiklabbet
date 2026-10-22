---
kalla: 7d1acafd20
id: ma1c-5.8
title: Complementary events
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.8'
---

# Complementary events

An event that complements another event, so that together they
make up all possible outcomes, is called a **complementary event**.
A complementary event can therefore be seen as "the opposite of the event".
The probability of an event plus the probability of its
complementary event is equal to 1 or 100 %.

::: formel "Probability with a complementary event"
$$
P(\text{event}) = 1 - P(\text{complementary event})
$$

::: härledning "Derivation: Probability with a complementary event"
According to the definition of a complementary event,

$$
P(\text{event}) + P(\text{complementary event}) = 1
$$

We solve for $P(\text{event})$ and get

$$
P(\text{event}) = 1 - P(\text{complementary event})
$$

Q.E.D.
:::
:::

Complementary events are useful in tasks where we are to calculate
the probability of **at least one**.

::: exempel "Example 1: State the complementary event"
**What is the complementary event to<br>a) it is raining?<br>b) drawing a heart from a deck of cards?<br>c) rolling at least a five on a die?**

::: handskrift
typ: komplementhandelse
:::

::: textlosning
**a)** "It is snowing"? No, just because it is not raining it does not have
to be snowing. It could be dry. "It is sunny"? No, just because
it is not raining it does not have to be sunny. It could be cloudy
without raining.

Putting a "not" in front of the event to get the complementary event
always works! But if possible, try to avoid "not" in your answer.
In this case, however, it is difficult.

**Answer:** That it is not raining.

**b)** The complementary event is "not drawing a heart", that is drawing
a spade, a club or a diamond.

**Answer:** Drawing a spade, a club or a diamond.

**c)** The complementary event is "not rolling at least a five", that is rolling
1, 2, 3 or 4. We can express this as "rolling at most a four".

**Answer:** Rolling at most a four.
:::
:::

::: exempel "Example 2: At least one six with five dice"
**What is the probability of getting at least one six when throwing five ordinary
dice?**

::: handskrift
typ: minstensexa
:::

::: textlosning
Calculating this task without a complementary event is hard work because there
are so many combinations. But with a complementary event it becomes easy!

The complementary event to "getting at least one six" is "not getting any
six". The probability of not getting a six when throwing one die is
$\dfrac{5}{6}$, so for five dice

$$
P(\text{no six}) = \left(\frac{5}{6}\right)^5 = \frac{3\,125}{7\,776} = 0.401\ldots
$$

We now calculate the probability of at least one six by subtracting
the probability of the complementary event from 1, so

$$
P(\text{at least one six}) = 1 - 0.401\ldots = 0.598\ldots \approx 0.60 = 60\ \%
$$

**Answer:** Approximately 60 %
:::
:::

::: exempel "Example 3: At least one daughter"
**What is the probability of having at least one daughter if you have four children?
(We assume that it is equally likely to have a girl as a
boy.)**

::: handskrift
typ: minstendotter
:::

::: textlosning
The complementary event is "no daughter":

$$
P(\text{no daughter}) = \left(\frac{1}{2}\right)^4 = \frac{1^4}{2^4} = \frac{1}{16} = 0.0625
$$

$$
P(\text{at least one daughter}) = 1 - 0.0625 = 0.9375 = 93.75\ \%
$$

**Answer:** Approximately 94 %
:::
:::

::: fördjupning "Going further: The birthday paradox"
**How many people must there be in a room for there to be more than a
50 % chance that at least two of them have their birthday on the same day?**

Stop and guess before you read on, for real. A year has
365 days. How many people do you think are needed?

Most people guess high, and the reasoning sounds sensible:

- **"About 183, half of 365."** The idea behind it: for the chance to
  get above one half, surely more than half of the days of the year must be
  "taken"?
- **"At least 100."** The idea behind it: the chance that two particular people share
  a birthday is only $\dfrac{1}{365} \approx 0.3\ \%$, so surely it
  would take a sea of people before anything happens?

Both lines of reasoning make the same mistake: they calculate as if the question were about
a *particular* person or a *particular* day. But the question is about **any pair
at all, on any day at all**, and that changes everything.

**The answer: 23 people are enough.** In a group of 23 randomly chosen
people, the probability is 50.7 % that at least two share a birthday. An
ordinary school class is enough. Incidentally, there are exactly
23 people on a football pitch (two teams of eleven players plus the referee), so statistically
two people on the pitch share a birthday in more than every other match.
The conclusion feels so unreasonable that it has been given the name
**the birthday paradox**, even though it is not a paradox at all, but
perfectly ordinary probability theory.

**Why 23 is enough: count backwards with the complementary event.**
Calculating directly on "at least two share a birthday" is hopeless: it can happen in
an overwhelming number of ways (exactly two share, three share, two different pairs
each share a day …). But the complementary event is *one single* event:
**nobody shares a birthday.** Just as in the examples above, we calculate with that
instead.

Let the people come into the room one at a time:

- Person 1 can have their birthday on any day: $\dfrac{365}{365}$.
- Person 2 must avoid one taken day: $\dfrac{364}{365}$.
- Person 3 must avoid two taken days: $\dfrac{363}{365}$.

$$
P(\text{none of three share a birthday}) = \frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \approx 0.9918
$$

$$
P(\text{at least two of three share a birthday}) = 1 - 0.9918 = 0.0082 = 0.8\ \%
$$

Each new person adds a factor, which is also a little smaller than
the previous one, and a product of many factors just below 1 falls
faster than you would expect. With 23 people the last factor is
$\dfrac{343}{365}$:

$$
P(\text{nobody shares a birthday}) = \frac{365}{365} \cdot \frac{364}{365} \cdot \frac{363}{365} \cdot \ldots \cdot \frac{343}{365} \approx 0.493
$$

$$
P(\text{at least two share a birthday}) = 1 - 0.493 = 0.507 = 50.7\ \%
$$

If we draw the probability as a function of the number of people, we see how steeply
the curve rises. **Drag the red dot**, or use the slider, and
you can read off the probability for any group size you like:

::: minisim
typ: fodelsedag
:::

Already at 30 people the probability is over 70 %, at 41 over 90 % and
at 57 as much as 99 %. Only at 366 people (367 if we count
the leap day) is it *guaranteed* that two share a birthday. But as
the curve shows, in practice it is almost certain long before that.

**The key: the number of pairs grows explosively.** What fools
our intuition is that we think about *people*, when we should be thinking about *pairs*.
Every new person who steps into the room can match **everyone** who
is already there: person 2 forms 1 pair, person 3 adds 2 new pairs,
person 4 adds 3 new ones … and person 23 adds as many as 22 new pairs.

::: figur
<svg viewBox="16 5 297 121" width="470" height="192" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Three groups drawn as dots with a line between each pair: 3 people give 3 pairs, 5 people give 10 pairs and 8 people give 28 pairs. The number of lines grows much faster than the number of dots."><line x1="52.0" y1="12.0" x2="81.4" y2="63.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="52.0" y1="12.0" x2="22.6" y2="63.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="81.4" y1="63.0" x2="22.6" y2="63.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><circle cx="52.0" cy="12.0" r="4" fill="#1f2530"/><circle cx="81.4" cy="63.0" r="4" fill="#1f2530"/><circle cx="22.6" cy="63.0" r="4" fill="#1f2530"/><text x="52" y="104" font-size="12" text-anchor="middle" fill="#1f2530">3 people</text><text x="52" y="120" font-size="12" text-anchor="middle" fill="#2563c9" font-weight="600">3 pairs</text><line x1="162.0" y1="12.0" x2="194.3" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="162.0" y1="12.0" x2="182.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="162.0" y1="12.0" x2="142.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="162.0" y1="12.0" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="194.3" y1="35.5" x2="182.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="194.3" y1="35.5" x2="142.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="194.3" y1="35.5" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="182.0" y1="73.5" x2="142.0" y2="73.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="182.0" y1="73.5" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="142.0" y1="73.5" x2="129.7" y2="35.5" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><circle cx="162.0" cy="12.0" r="4" fill="#1f2530"/><circle cx="194.3" cy="35.5" r="4" fill="#1f2530"/><circle cx="182.0" cy="73.5" r="4" fill="#1f2530"/><circle cx="142.0" cy="73.5" r="4" fill="#1f2530"/><circle cx="129.7" cy="35.5" r="4" fill="#1f2530"/><text x="162" y="104" font-size="12" text-anchor="middle" fill="#1f2530">5 people</text><text x="162" y="120" font-size="12" text-anchor="middle" fill="#2563c9" font-weight="600">10 pairs</text><line x1="272.0" y1="12.0" x2="296.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="306.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="296.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="12.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="306.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="296.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="22.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="296.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="306.0" y1="46.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="272.0" y2="80.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="296.0" y1="70.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="80.0" x2="248.0" y2="70.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="80.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="272.0" y1="80.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="248.0" y1="70.0" x2="238.0" y2="46.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="248.0" y1="70.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><line x1="238.0" y1="46.0" x2="248.0" y2="22.0" stroke="#2563c9" stroke-width="1.1" opacity="0.55"/><circle cx="272.0" cy="12.0" r="4" fill="#1f2530"/><circle cx="296.0" cy="22.0" r="4" fill="#1f2530"/><circle cx="306.0" cy="46.0" r="4" fill="#1f2530"/><circle cx="296.0" cy="70.0" r="4" fill="#1f2530"/><circle cx="272.0" cy="80.0" r="4" fill="#1f2530"/><circle cx="248.0" cy="70.0" r="4" fill="#1f2530"/><circle cx="238.0" cy="46.0" r="4" fill="#1f2530"/><circle cx="248.0" cy="22.0" r="4" fill="#1f2530"/><text x="272" y="104" font-size="12" text-anchor="middle" fill="#1f2530">8 people</text><text x="272" y="120" font-size="12" text-anchor="middle" fill="#2563c9" font-weight="600">28 pairs</text></svg>
:::

In a group of $n$ people there are in total $\dfrac{n \cdot (n-1)}{2}$
possible pairs. With 23 people:

$$
\frac{23 \cdot 22}{2} = 253\ \text{pairs}
$$

**253 chances** of hitting a shared birthday, not 23! Each pair
is like a lottery ticket with a chance of winning of $\dfrac{1}{365}$, and with 253 tickets it is
no longer strange that one of them wins.

::: figur
<svg viewBox="13 6 290 240" width="459" height="380" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The number of possible pairs as a function of the size of the group: the curve bends upwards more and more steeply and reaches 253 pairs already at 23 people."><line x1="80" y1="28" x2="80" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="120" y1="28" x2="120" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="160" y1="28" x2="160" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="200" y1="28" x2="200" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="240" y1="28" x2="240" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="280" y1="28" x2="280" y2="210" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="170" x2="282" y2="170" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="130" x2="282" y2="130" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="90" x2="282" y2="90" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="40" y1="50" x2="282" y2="50" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="32" y1="210" x2="292" y2="210" stroke="#1f2530" stroke-width="1.6"/><polygon points="300,210 290,205.5 290,214.5" fill="#1f2530"/><line x1="40" y1="218" x2="40" y2="18" stroke="#1f2530" stroke-width="1.6"/><polygon points="40,10 35.5,20 44.5,20" fill="#1f2530"/><polyline points="40.0,210.0 48.0,210.0 56.0,209.6 64.0,208.8 72.0,207.6 80.0,206.0 88.0,204.0 96.0,201.6 104.0,198.8 112.0,195.6 120.0,192.0 128.0,188.0 136.0,183.6 144.0,178.8 152.0,173.6 160.0,168.0 168.0,162.0 176.0,155.6 184.0,148.8 192.0,141.6 200.0,134.0 208.0,126.0 216.0,117.6 224.0,108.8 232.0,99.6 240.0,90.0 248.0,80.0 256.0,69.6 264.0,58.8 272.0,47.6 280.0,36.0" fill="none" stroke="#2563c9" stroke-width="2.2" stroke-linejoin="round"/><line x1="224" y1="210" x2="224" y2="108.8" stroke="#c8324a" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="40" y1="108.8" x2="224" y2="108.8" stroke="#c8324a" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="224" cy="108.8" r="3.6" fill="#c8324a"/><text x="80" y="225" font-size="11" text-anchor="middle" fill="#1f2530">5</text><text x="120" y="225" font-size="11" text-anchor="middle" fill="#1f2530">10</text><text x="160" y="225" font-size="11" text-anchor="middle" fill="#1f2530">15</text><text x="200" y="225" font-size="11" text-anchor="middle" fill="#1f2530">20</text><text x="240" y="225" font-size="11" text-anchor="middle" fill="#1f2530">25</text><text x="280" y="225" font-size="11" text-anchor="middle" fill="#1f2530">30</text><text x="34" y="174" font-size="11" text-anchor="end" fill="#1f2530">100</text><text x="34" y="134" font-size="11" text-anchor="end" fill="#1f2530">200</text><text x="34" y="94" font-size="11" text-anchor="end" fill="#1f2530">300</text><text x="34" y="54" font-size="11" text-anchor="end" fill="#1f2530">400</text><text x="216" y="100.8" font-size="12" text-anchor="end" fill="#c8324a">23 people → 253 pairs</text><text x="300" y="240" font-size="12" text-anchor="end" fill="#1f2530">number of people</text><text x="49" y="18" font-size="12" text-anchor="start" fill="#1f2530">number of pairs</text></svg>
:::

| Number of people | Possible pairs | Probability that at least two share a birthday |
| --- | --- | --- |
| 5 | 10 | 2.7 % |
| 10 | 45 | 11.7 % |
| 15 | 105 | 25.3 % |
| 20 | 190 | 41.1 % |
| **23** | **253** | **50.7 %** |
| 30 | 435 | 70.6 % |
| 41 | 820 | 90.3 % |
| 50 | 1 225 | 97.0 % |
| 57 | 1 596 | 99.0 % |
| 70 | 2 415 | 99.9 % |

**"But nobody shares *my* birthday!"** Exactly, and this is precisely
where intuition goes astray. If we instead ask for the probability that
someone shares *your* birthday, only the 22 pairs that you are part of count,
and with 23 people in the room that probability is a paltry 5.9 %. To
get above 50 % for your particular birthday, 253 people are actually needed.
The difference between "some pair" (253 chances) and "my pair" (22 chances)
is the whole explanation of why the paradox feels impossible.

**Try it yourself!** The calculation ignores the leap day and assumes that all
days are equally common. In reality birthdays are unevenly spread
over the year, which only makes the probability a little higher still. So next time
you are in a classroom or at a party with at least 23 people: ask
around. The odds are on your side.
:::

::: sammanfattning "Summary"

::: sampunkt "Complementary event"
- The **opposite** of the event. Together they cover all possible outcomes.
- $P(\text{event}) + P(\text{complement}) = 1$
:::

::: sampunkt "The formula"
- $P(\text{event}) = 1 - P(\text{complementary event})$
:::

::: sampunkt "Stating the complement correctly"
- To "it is raining": that it is **not** raining.
- To "drawing a heart": drawing a spade, a club or a diamond.
- To "**at least** a five": rolling **at most** a four.
:::

::: sampunkt "The key words at least one"
- With "at least one", the complement is **none at all**,
  which is much easier to calculate.
- $P(\text{at least one}) = 1 - P(\text{none})$
:::

::: sampunkt "Typical examples"
- At least one six with five dice:
  $1 - \left(\dfrac{5}{6}\right)^{5} \approx 60\ \%$.
- At least one daughter out of four children:
  $1 - \left(\dfrac{1}{2}\right)^{4} \approx 94\ \%$.
:::
:::
