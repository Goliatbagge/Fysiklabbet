---
kalla: 1e55f0ba25
id: ma1c-5.7
title: Tree diagrams
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.7'
---

# Tree diagrams

If we are to calculate the probability of a combination where the probabilities
of the individual outcomes are different, this can be done with a diagram that
is built up of branches, a so-called **tree diagram**. To calculate
the probability of a combination, we simply multiply the probabilities
along that branch.

::: exempel "Example 1: The socks in the drawer"
**A drawer contains 7 black and 3 white socks. You draw two socks
one after the other. What is the probability that you<br>
a) draw two black socks with replacement?<br>
b) draw two black socks without replacement?<br>
c) draw one black and one white sock without replacement (the order
does not matter)?**

::: handskrift
typ: traddiagram
:::

::: textlosning
**a)** We start by drawing the tree diagram and write the
probabilities at each branch. *With replacement*, the
probabilities for each outcome do not change:

::: figur
<svg viewBox="14 24 392 142" width="532" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tree diagram with two levels. First draw: black with probability 7 tenths or white with 3 tenths. The second draw has the same probabilities because the sock is put back."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text></svg>
:::

We circle all the combinations that give two black socks (only one
combination):

::: figur
<svg viewBox="14 24 392 142" width="532" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same tree diagram where the combination black followed by black is circled."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><ellipse cx="52" cy="148" rx="29" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text></svg>
:::

We multiply the probabilities along that branch and get

$$
P(\text{two black}) = \frac{7}{10} \cdot \frac{7}{10} = \frac{49}{100} = 0.49 = 49\ \%
$$

**Answer:** 49 %

**b)** We draw a tree diagram again. *Without replacement*, the
probabilities for each outcome change. If we draw a black sock
the first time, there will be 6 black socks left out of 9 socks
in total for the second draw. The probability of drawing a black sock after
having drawn a black sock is therefore $\dfrac{6}{9}$:

::: figur
<svg viewBox="14 24 392 142" width="532" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tree diagram without replacement: after a black sock the probability of black is 6 ninths, after a white one it is 7 ninths. The combination black followed by black is circled."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">6/9</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/9</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/9</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">2/9</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><ellipse cx="52" cy="148" rx="29" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text></svg>
:::

$$
P(\text{two black}) = \frac{7}{10} \cdot \frac{6}{9} = \frac{42}{90} = \frac{7}{15} = 0.466\ldots \approx 47\ \%
$$

**Answer:** $\dfrac{7}{15}$ or approximately 47 %

**c)** The same tree diagram as in part b applies, but we now have several
combinations that give one black and one white sock, see below:

::: figur
<svg viewBox="14 24 392 142" width="532" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The same tree diagram without replacement where the two combinations black followed by white and white followed by black are circled."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">6/9</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/9</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/9</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">2/9</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text><ellipse cx="168" cy="148" rx="23" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><ellipse cx="252" cy="148" rx="29" ry="13" fill="none" stroke="#c8324a" stroke-width="1.6"/><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text></svg>
:::

We *multiply* the probabilities along each branch and *add* them
together:

$$
P(\text{one black, one white}) = \frac{7}{10} \cdot \frac{3}{9} + \frac{3}{10} \cdot \frac{7}{9}
= \frac{21}{90} + \frac{21}{90} = \frac{42}{90} = \frac{7}{15} \approx 0.466 \approx 47\ \%
$$

**Answer:** $\dfrac{7}{15}$ or approximately 47 %
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Tree diagrams"
- A diagram of **branches**, one branch per possible outcome at each step.
- Useful when the probabilities of the outcomes are **not equal**.
:::

::: sampunkt "Calculating in the tree"
- **Along a branch**: multiply the probabilities. This corresponds to "and".
- **Between different branches**: add the probabilities. This corresponds to "or".
:::

::: sampunkt "With or without replacement"
- **With** replacement: the same probabilities at each step.
- **Without** replacement: both the number of favourable and the number of possible
  outcomes decrease by one.
:::

::: sampunkt "When the order does not matter"
- "One black and one white" can happen in **two** ways: black first or white
  first.
- Calculate both branches and **add** them.
- This is the most common mistake in this section.
:::

::: sampunkt "Check"
- The probabilities of **all** the branches should add up to 1.
:::
:::
