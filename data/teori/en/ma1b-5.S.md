---
kalla: 775bc1afde
id: ma1b-5.S
title: Summary
course: Matematik nivå 1b
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.S'
---

<!-- NOTE: separate 1b version, based on the corresponding ma1c file. If the
     chapter's SHARED content changes in the 1c summary, make the same
     change here (only these three summaries are separate files;
     everything else is shared via MA1B_ALIAS in data/katalog.js). -->

# Summary: Statistics and probability

This chapter was about how to collect and interpret data in a
reliable way, and about how to calculate with the play of chance. You have learnt
to interpret and examine tables and charts (frequency tables, bar charts,
line graphs and pie charts, and misleading charts with truncated axes),
and met sampling methods and sources of error, margin of error and significance, correlation and
causation, and four different ways of calculating probabilities: the classical
definition of probability, experimental probability, the multiplication rule with
tree diagrams, and complementary events. After the chapter you should be able to examine
the reliability of a survey and calculate the probability of both simple and
compound events.

## Concepts to know

- **frequency and relative frequency**: the frequency is the number of times an
  answer occurs; the relative frequency is the frequency divided by the
  total number, often given as a percentage. The relative frequencies always
  add up to 1 (100 %).
- **bar charts, line graphs and pie charts**: bar charts compare
  categories, line graphs show a development over time and
  pie charts show proportions of a whole.
- **misleading chart**: a chart that is correctly drawn but gives a
  distorted picture. Most commonly through a truncated *y*-axis that makes small
  differences look large, but also through the chosen time period, different
  scales and areas instead of heights.
- **population and sample**: the population is the group a survey
  is about; a census examines the whole population, a
  sample survey only a smaller part of it.
- **sampling**: how you choose which members of the population will be part of a
  sample survey; three common methods are simple random,
  systematic and stratified sampling.
- **sources of error (sampling errors and measurement errors)**: sampling errors arise when the sample does not
  represent the population; measurement errors arise, for example, through leading questions
  or incomplete answer options.
- **non-response**: when not everyone asked answers a survey;
  a large non-response means that the true result can only be given as an
  interval.
- **margin of error ($f$)**: how much a result can be expected to vary if
  the survey were repeated; often given so that the result with 95 %
  certainty lies within the margin of error.
- **confidence interval**: the interval (the result ± the margin of error) that
  the true value lies within with 95 % certainty.
- **significance**: the probability that a measured change is real and
  not just due to chance; a change larger than the margin of error is
  statistically significant.
- **correlation**: a relationship between two variables, examined with a
  scatter plot; can be strong or weak and positive or negative.
- **causation and spurious correlation**: causation is a cause-and-effect relationship between
  two variables; a spurious correlation is a correlation without causation, often
  caused by an underlying common factor.
- **probability ($P$), outcome and sample space**: the probability states
  the chance that an event occurs; the sample space is the set of all
  possible outcomes and the favourable outcomes are those that match
  the event.
- **the classical definition of probability**: for a uniform
  probability distribution (all outcomes equally likely), the probability is given by
  the number of favourable outcomes divided by the number of possible outcomes.
- **experimental probability and relative frequency**: when the outcomes are not
  equally likely, the probability is instead determined through repeated trials;
  the more trials, the more reliable the relative frequency becomes.
- **the multiplication rule**: the probability of a combination of events is found
  by multiplying the probabilities of the individual events.
- **independent and dependent events**: for an independent event (for example
  with replacement) the probability is not affected by earlier outcomes; for a
  dependent event (for example without replacement) the probability changes.
- **tree diagram**: a diagram with branches that shows the probability of
  each outcome in a combination; the probability of a branch is found by
  multiplying along the branch, and several branches with the same result are added.
- **complementary event**: the "opposite" of an event; the probabilities of an
  event and its complementary event always add up to 1 (100 %),
  which is used in "at least one" tasks.

## Formulas

::: formel "The formulas of the chapter"
**Relative frequency**

$$
\text{relative frequency} = \frac{\text{the frequency}}{\text{the total number}}
$$

**Margin of error**

$$
f = 1.96 \cdot \sqrt{\frac{p(100 - p)}{n}}
$$

where

- $f$ = margin of error (percentage points)
- $p$ = the proportion, as a percentage, that gave a certain answer
- $n$ = the size of the sample

**Confidence interval**

$$
p - f \le \text{true value} \le p + f
$$

where

- $p$ = the measured proportion (%)
- $f$ = margin of error (percentage points)

**The classical definition of probability**

$$
P(\text{event}) = \frac{\text{number of favourable outcomes}}{\text{number of possible outcomes}}
$$

(Applies to a uniform probability distribution, that is when all outcomes are equally
likely.)

**The multiplication rule (independent events)**

$$
P(A \text{ and } B) = P(A) \cdot P(B)
$$

where $P(A)$ and $P(B)$ are the probabilities of two independent events.
The rule applies in the same way to more than two events in a row:
the probabilities are multiplied one factor at a time.

**Complementary event**

$$
P(\text{event}) = 1 - P(\text{complementary event})
$$
:::

## Important relationships and methods

- From proportion to number: the proportion (the relative frequency in decimal form)
  multiplied by the whole gives the number. 45 % of 240 is
  $0.45 \cdot 240 = 108$.
- Always examine a chart before you trust it: where do the axes start,
  which scales are used and which time period has been chosen? A truncated
  *y*-axis only compares the "bar stumps" above the break point. The
  real change is found from the ratio between the whole values.
- Distinguish between a **census** (the whole population is examined, exact but
  time-consuming) and a **sample survey** (part of the population,
  less exact but easier to carry out).
- Always check that a survey question is not leading and that
  the answer options cover all reasonable answers. Otherwise a
  measurement error arises.
- If you take the non-response into account, the true value of the result can only
  be given as an interval: the lower limit is found if nobody in the non-response group
  answered in a certain way, the upper limit if everyone did.
- The confidence interval is found by taking the result ± the margin of error
  ($p \pm f$).
- A change is significant (statistically significant) only if it is
  larger than the margin of error. Otherwise it may be due to chance.
- Read off the direction (positive/negative slope) and strength (strong/weak
  spread) of a correlation in a scatter plot.
- Correlation does not imply causation. Always check whether a relationship
  could be a spurious correlation, caused by an underlying common factor.
- The classical definition of probability only applies to a uniform
  probability distribution. If the outcomes are not equally likely (for example goal/miss in
  penalties), the probability must instead be determined experimentally through
  relative frequency.
- In tasks with two objects (two dice, two coins): draw the whole
  sample space and count favourable outcomes against possible outcomes.
- Always decide whether events are independent (with replacement: the probability
  does not change) or dependent (without replacement: the probability changes)
  before applying the multiplication rule.
- In a tree diagram: multiply the probabilities along a branch to get
  the probability of that particular combination; if several branches give
  the same result, add the probabilities of the branches.
- In "at least one" tasks (for example at least one six in several throws of a die) it is
  usually easiest to calculate the probability of the complementary event
  ("no six at all") and then take $1 -$ that probability.

## Figures worth remembering

A scatter plot where the points lie close to a rising line
shows a strong positive correlation:

::: figur
<svg viewBox="-14 -18 151 144" width="205" height="195" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Scatter plot where the points lie close to a rising straight line: strong positive correlation. Point at or tap the diagram to show the trend line." style="overflow:visible"><style>.q53a-g{cursor:pointer;outline:none}.q53a-g .q53a-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.q53a-g:hover .q53a-lbl,.q53a-g:focus .q53a-lbl{opacity:1}</style><line x1="0.0" y1="0.0" x2="0.0" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="115.2" y2="105.6" stroke="rgba(31,37,48,0.15)" stroke-width="1"/><line x1="0.0" y1="105.6" x2="123.2" y2="105.6" stroke="#1f2530" stroke-width="1.6"/><polygon points="131.2,105.6 121.2,101.1 121.2,110.1" fill="#1f2530"/><line x1="0.0" y1="105.6" x2="0.0" y2="-8.0" stroke="#1f2530" stroke-width="1.6"/><polygon points="0.0,-16.0 -4.5,-6.0 4.5,-6.0" fill="#1f2530"/><text x="129.2" y="123.6" font-size="14" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="9.0" y="-6.0" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="8.0" cy="94.4" r="2.4" fill="#c8324a"/><circle cx="16.0" cy="86.4" r="2.4" fill="#c8324a"/><circle cx="24.0" cy="83.2" r="2.4" fill="#c8324a"/><circle cx="32.0" cy="72.0" r="2.4" fill="#c8324a"/><circle cx="40.0" cy="67.2" r="2.4" fill="#c8324a"/><circle cx="48.0" cy="54.4" r="2.4" fill="#c8324a"/><circle cx="56.0" cy="51.2" r="2.4" fill="#c8324a"/><circle cx="64.0" cy="40.0" r="2.4" fill="#c8324a"/><circle cx="72.0" cy="35.2" r="2.4" fill="#c8324a"/><circle cx="80.0" cy="22.4" r="2.4" fill="#c8324a"/><circle cx="88.0" cy="16.0" r="2.4" fill="#c8324a"/><circle cx="96.0" cy="9.6" r="2.4" fill="#c8324a"/><circle cx="104.0" cy="3.2" r="2.4" fill="#c8324a"/><circle cx="35.2" cy="73.6" r="2.4" fill="#c8324a"/><circle cx="60.8" cy="41.6" r="2.4" fill="#c8324a"/><g class="q53a-g" tabindex="0"><rect x="-14" y="-18" width="151" height="128" fill="transparent"/><g class="q53a-lbl"><line x1="0" y1="99" x2="110" y2="-3" stroke="#2563c9" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.75"/><rect x="62" y="62" width="68" height="28" rx="4" fill="#f3eee4"/><text x="63" y="73" font-size="11" text-anchor="start" fill="#1f2530">Strong positive</text><text x="63" y="86" font-size="11" text-anchor="start" fill="#1f2530">correlation</text></g></g></svg>

**Strong positive correlation.** For example foot length/shoe size. Point at or tap the diagram to show the trend line.
:::

The sample space for the sum of two dice, the basis for systematically
counting favourable and possible outcomes in tasks with two objects:

::: figur
<svg viewBox="34 8 187 226" width="254" height="307" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The sample space for the sum of two dice: a table with die 1 along the bottom edge and die 2 along the left edge, where each square shows the sum of the two dice. The six squares with sum 10, 11 or 12 in the top right corner are shaded."><rect x="36" y="30" width="26" height="156" fill="rgba(31,37,48,0.055)"/><rect x="62" y="186" width="156" height="26" fill="rgba(31,37,48,0.055)"/><rect x="140" y="30" width="26" height="26" fill="#cfe3f2"/><rect x="166" y="56" width="26" height="26" fill="#cfe3f2"/><rect x="166" y="30" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="82" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="56" width="26" height="26" fill="#cfe3f2"/><rect x="192" y="30" width="26" height="26" fill="#cfe3f2"/><line x1="62" y1="30" x2="62" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="30" x2="218" y2="30" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="88" y1="30" x2="88" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="56" x2="218" y2="56" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="114" y1="30" x2="114" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="82" x2="218" y2="82" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="108" x2="218" y2="108" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="166" y1="30" x2="166" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="134" x2="218" y2="134" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="192" y1="30" x2="192" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="160" x2="218" y2="160" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="218" y1="30" x2="218" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="186" x2="218" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="30" x2="36" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="36" y1="186" x2="62" y2="186" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><line x1="62" y1="212" x2="218" y2="212" stroke="rgba(31,37,48,0.22)" stroke-width="1"/><rect x="62" y="30" width="156" height="156" fill="none" stroke="#1f2530" stroke-width="1.4"/><text x="75" y="178" font-size="14" text-anchor="middle" fill="#1f2530">2</text><text x="75" y="152" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="75" y="126" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="75" y="100" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="75" y="74" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="75" y="48" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="101" y="178" font-size="14" text-anchor="middle" fill="#1f2530">3</text><text x="101" y="152" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="101" y="126" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="101" y="100" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="101" y="74" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="101" y="48" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="127" y="178" font-size="14" text-anchor="middle" fill="#1f2530">4</text><text x="127" y="152" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="127" y="126" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="127" y="100" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="127" y="74" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="127" y="48" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="153" y="178" font-size="14" text-anchor="middle" fill="#1f2530">5</text><text x="153" y="152" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="153" y="126" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="153" y="100" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="153" y="74" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="153" y="48" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="179" y="178" font-size="14" text-anchor="middle" fill="#1f2530">6</text><text x="179" y="152" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="179" y="126" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="179" y="100" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="179" y="74" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="179" y="48" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="205" y="178" font-size="14" text-anchor="middle" fill="#1f2530">7</text><text x="205" y="152" font-size="14" text-anchor="middle" fill="#1f2530">8</text><text x="205" y="126" font-size="14" text-anchor="middle" fill="#1f2530">9</text><text x="205" y="100" font-size="14" text-anchor="middle" fill="#1f2530">10</text><text x="205" y="74" font-size="14" text-anchor="middle" fill="#1f2530">11</text><text x="205" y="48" font-size="14" text-anchor="middle" fill="#1f2530">12</text><text x="49" y="178" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">1</text><text x="49" y="152" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="49" y="126" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="49" y="100" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">4</text><text x="49" y="74" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="49" y="48" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">6</text><text x="75" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">1</text><text x="101" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">2</text><text x="127" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">3</text><text x="153" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">4</text><text x="179" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">5</text><text x="205" y="204" font-size="13" font-weight="600" text-anchor="middle" fill="#1f2530">6</text><text x="36" y="20" font-size="14" text-anchor="start" fill="#1f2530">die 2</text><text x="140" y="230" font-size="14" text-anchor="middle" fill="#1f2530">die 1</text></svg>

**Shaded squares:** the 6 outcomes out of 36 possible that give a sum of at least 10, that is $P(\text{sum} \geq 10) = \dfrac{6}{36} = \dfrac{1}{6}$.
:::

A tree diagram with the probabilities at each branch. The probability of a
combination is found by multiplying the probabilities along the branch:

::: figur
<svg viewBox="14 24 392 142" width="532" height="193" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Tree diagram with two levels. First draw: black with probability 7 tenths or white with 3 tenths. The second draw has the same probabilities because the sock is put back."><line x1="210" y1="28" x2="110" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="152.0" y="51.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="210" y1="28" x2="310" y2="70" stroke="#1f2530" stroke-width="1.2"/><text x="268.0" y="51.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="110" y1="90" x2="52" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="73.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="110" y1="90" x2="168" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="147.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><line x1="310" y1="90" x2="252" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="273.0" y="115.0" font-size="13" text-anchor="end" fill="#2563c9">7/10</text><line x1="310" y1="90" x2="368" y2="136" stroke="#1f2530" stroke-width="1.2"/><text x="347.0" y="115.0" font-size="13" text-anchor="start" fill="#2563c9">3/10</text><text x="110" y="87" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="310" y="87" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="52" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="168" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text><text x="252" y="153" font-size="14" text-anchor="middle" fill="#2563c9">black</text><text x="368" y="153" font-size="14" text-anchor="middle" fill="#2563c9">white</text></svg>
:::

## Before the test

- Can you read off a frequency table, calculate relative frequencies and
  choose the right type of chart for different kinds of data?
- Can you expose a misleading chart (for example a truncated *y*-axis)
  and calculate the real percentage change?
- Can you distinguish between a census and a sample survey, and
  name the three sampling methods?
- Do you know the difference between sampling errors and measurement errors, and can you recognise a
  leading question or incomplete answer options?
- Can you calculate how non-response affects the upper and
  lower limits of the result?
- Do you know the formula for the margin of error, and can you calculate a confidence interval
  from a sample result?
- Do you know when a change counts as statistically significant?
- Can you decide the type of correlation (strong/weak, positive/negative) from
  a scatter plot?
- Can you explain the difference between correlation and causation, and what
  a spurious correlation is?
- Do you know the classical definition of probability, and do you know when it does not
  apply?
- Can you calculate an experimental probability using relative
  frequency?
- Do you know the multiplication rule, and can you decide whether two events are independent
  of or dependent on each other?
- Can you draw and use a tree diagram to calculate the probability
  of a combination of events?
- Can you use a complementary event to simplify an "at least
  one" task?
