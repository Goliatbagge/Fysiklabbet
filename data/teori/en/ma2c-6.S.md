---
kalla: 19ca52395a
id: ma2c-6.S
title: Summary
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.S'
---

# Summary: Statistics

This chapter was about describing and interpreting statistical data. You
have seen how a data set is summarised with measures of central tendency such as the mean, the median
and the mode, and how its spread is described with the range, box plots,
the interquartile range and the standard deviation. You have also seen how
the normal distribution is used to estimate proportions, and how linear and
other regression models are used to find and describe relationships between
two variables. Throughout, digital tools such as GeoGebra are used for
the calculations. After the chapter you should be able to choose the right measure of central tendency and
measure of spread for a given situation, interpret box plots and
normal distribution curves, and find and interpret a regression model.

## Concepts to know

- **measure of central tendency**: a summarising value for a set of statistical data; the
  most common are the mean, the median and the mode.
- **mean**: the sum of all the values divided by the number of values; the
  most common measure of central tendency, but sensitive to individual extreme values.
- **median**: the value in the middle when all the values have been sorted in order of size
  (the mean of the two middle values if the number of values is even); often better than
  the mean for a skewed distribution.
- **mode**: the value that occurs most often; the only measure of central tendency
  that can also be used on data that are not numbers.
- **frequency**: how many times a certain value, or a certain class,
  occurs in a data set.
- **class and class midpoint**: for data divided into intervals (for example in a
  histogram) each value is treated as if it lay at its class midpoint, the
  midpoint of the interval.
- **range**: the difference between the largest and the smallest value
  in a data set; the simplest measure of spread.
- **quartile ($Q_1$, $Q_2$, $Q_3$)**: the three values that divide a sorted
  data set into four equal parts; $Q_2$ is the same as the median.
- **box plot**: a diagram showing the smallest value, $Q_1$, the median, $Q_3$ and
  the largest value; a "box" between the quartiles with "whiskers" out to the smallest
  and the largest value.
- **interquartile range**: the difference between the upper and the lower quartile, $Q_3 - Q_1$;
  the width of the box in the box plot, a measure of the spread in the middle of the
  data.
- **percentile**: a value below which a given proportion of the data set lies;
  for example, $p_{90}$ gives the boundary for the highest $10\ \%$ of the values.
- **standard deviation ($\sigma$, $s$)**: how much the values on average
  deviate from the mean; $\sigma$ is used for a total survey (whole population) and $s$
  for a sample survey.
- **normal distribution ($\mu$, $\sigma$)**: a symmetric distribution around
  the mean $\mu$ where the proportion of values within a given number of
  standard deviations $\sigma$ is always the same.
- **correlation and correlation coefficient ($r$)**: how strongly two
  variables are related, read from a scatter plot; $r$ lies between
  −1 (perfect negative) and 1 (perfect positive), and $0$ means no
  correlation.
- **regression line and regression model**: the regression line is the
  straight line that best describes a linear relationship (linear regression);
  other relationships are instead described with an exponential, power or
  quadratic model, and the $r^2$-value decides which model fits best.

## Formulas

::: formel "The formulas of the chapter"
**Mean**

$$
\text{mean} = \frac{\text{the sum of all values}}{\text{the number of values}}
$$

**Range**

$$
\text{range} = \text{largest value} - \text{smallest value}
$$

**Interquartile range**

$$
\text{interquartile range} = \text{upper quartile} - \text{lower quartile}
$$

The interquartile range is often written $Q_3 - Q_1$.

**Standard deviation**

$$
\sigma = \sqrt{\frac{(x_1 - \bar{x})^{2} + (x_2 - \bar{x})^{2} + \ldots + (x_n - \bar{x})^{2}}{n}}
$$

$$
s = \sqrt{\frac{(x_1 - \bar{x})^{2} + (x_2 - \bar{x})^{2} + \ldots + (x_n - \bar{x})^{2}}{n - 1}}
$$

where

- $\sigma$ = standard deviation for a total survey
- $s$ = standard deviation for a sample survey
- $\bar{x}$ = the mean
- $n$ = the number of values

At this level the standard deviation is calculated with a digital tool, not
by hand.

**Regression models**

- Linear: $y = kx + m$. A straight line, constant increase or decrease.
- Exponential: $y = C \cdot a^{x}$. Small change at the beginning, large at
  the end (or the other way round).
- Power: $y = C \cdot x^{a}$. A curve that turns and passes through the origin.
- Polynomial (degree 2): $y = a x^{2} + b x + c$. A curve that turns, not
  necessarily through the origin.

where

- $r$ = correlation coefficient (between −1 and 1)
- $r^2$ = the square of the correlation coefficient (between 0 and 1)

The closer to 1 (or −1 for $r$) these values are, the better
the model describes the points.
:::

## Important relationships and methods

- Choose the measure of central tendency according to the context: the mean is standard, but if individual
  extreme values (outliers) pull the mean along, the median is often more
  representative.
- The mode is the only measure of central tendency that also works for data that are not
  numbers, for example car makes or colours.
- In data divided into classes (for example in a histogram) each value is treated as if
  it lay at its class midpoint when the mean is to be calculated.
- In a box plot each part (left whisker, left box,
  right box and right whisker) always contains $25\ \%$ of the values; a wide part
  means a large spread in that region, a narrow part a small spread.
- Percentiles generalise quartiles to hundredths: $p_{90}$ is the boundary
  below which $90\ \%$ of the values lie, and it is calculated with a digital
  tool (in GeoGebra: the command Percentile).
- The standard deviation measures how much the values on average deviate from
  the mean: a larger spread gives a larger standard deviation, no
  spread at all gives the standard deviation $0$.
- The classic percentages of the normal distribution curve are worth knowing
  by heart: $34.1\ \%$ of the values lie within one standard deviation of
  $\mu$ in each direction, a further $13.6\ \%$ lie in the next step
  (between one and two standard deviations), and only $2.3\ \%$ lie more
  than two standard deviations away. The smaller the spread, the taller and
  narrower the curve becomes, even if the mean $\mu$ is the same.
- In GeoGebra's One Variable Analysis you read off $n$, the mean, min, $Q_1$,
  the median, $Q_3$ and max in the same table; the probability calculator is used
  instead to work out proportions in a normal distribution given $\mu$ and
  $\sigma$.
- A scatter plot shows whether there is a relationship between two variables:
  strong correlation gives points close to a line, weak correlation gives
  more spread-out points; the slope decides whether the correlation is positive or
  negative.
- The correlation coefficient $r$ measures the strength of a linear relationship, while
  the $r^2$-value is used to compare how well different regression models
  (linear, exponential, power, polynomial) fit the same points. The model
  with $r^2$ closest to 1 fits best.
- Remember that GeoGebra requires a decimal point, not a decimal comma, when
  numbers are entered, for example 165,5 → 165.5.

## Figures worth remembering

A box plot with the five important values: the smallest value, the lower quartile
$Q_1$, the median $Q_2$, the upper quartile $Q_3$ and the largest value. Each part
contains $25\ \%$ of the data:

::: figur
<svg viewBox="22 44 166 102" width="287" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A box plot: a box from the lower quartile Q1 to the upper quartile Q3 with the median Q2 as a line in the box, and whiskers out to the lowest and highest value. Each part contains 25 percent of the values. Point at or tap a part of the box plot to see what it means." style="overflow:visible"><style>.m62-s{cursor:pointer;outline:none}.m62-s .m62-ln{transition:stroke-width .18s ease}.m62-s:hover .m62-ln,.m62-s:focus .m62-ln{stroke-width:3}.m62-s .m62-box{transition:fill .18s ease}.m62-s:hover .m62-box,.m62-s:focus .m62-box{fill:#79aacb}.m62-s .m62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m62-s:hover .m62-lbl,.m62-s:focus .m62-lbl{opacity:1}</style><g class="m62-s" tabindex="0"><rect x="24" y="78" width="44" height="24" fill="transparent"/><line class="m62-ln" x1="29.2" y1="90" x2="66" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="29.2" y1="82" x2="29.2" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="22" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="43" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Lowest</text><text x="43" y="117" font-size="9" text-anchor="middle" fill="#1f2530">value</text></g></g><g class="m62-s" tabindex="0"><rect x="140" y="78" width="46" height="24" fill="transparent"/><line class="m62-ln" x1="144.2" y1="90" x2="181" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="181" y1="82" x2="181" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="146" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="167" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Highest</text><text x="167" y="117" font-size="9" text-anchor="middle" fill="#1f2530">value</text></g></g><g class="m62-s" tabindex="0"><rect class="m62-box" x="66" y="70" width="78.2" height="40" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="72" y="79" width="66" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">Middle 50 %</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">of the values</text></g></g><g class="m62-s" tabindex="0"><rect x="105" y="68" width="14" height="44" fill="transparent"/><line class="m62-ln" x1="112" y1="70" x2="112" y2="110" stroke="#1f2530" stroke-width="1.6"/><g class="m62-lbl"><rect x="76" y="79" width="58" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">The median</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">(the middle)</text></g></g><text x="66" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₁</text><text x="112" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₂</text><text x="144" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₃</text><line x1="30" y1="120" x2="65" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="120" x2="111" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="113" y1="120" x2="143" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="120" x2="180" y2="120" stroke="#1f2530" stroke-width="1"/><text x="47" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="89" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="128" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="162" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text></svg>

Point at or tap a part of the box plot to see what it means.
:::

The normal distribution curve and its classic percentages around the mean
$\mu$ and the standard deviation $\sigma$:

::: figur
<svg viewBox="4 22 286 134" width="515" height="241" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A normal distribution curve with marked intervals: 34.1 percent between the mean and one standard deviation in each direction, 13.6 percent between one and two standard deviations and 2.3 percent beyond two standard deviations. Point at or tap an interval to colour the area and show the combined proportion." style="overflow:visible"><style>.m65-s{cursor:pointer;outline:none}.m65-s .m65-om{fill:#8fb8d8;opacity:0;transition:opacity .18s ease}.m65-s:hover .m65-om,.m65-s:focus .m65-om{opacity:.45}.m65-s .m65-pc{transition:fill .18s ease}.m65-s:hover .m65-pc,.m65-s:focus .m65-pc{fill:#c8324a;font-weight:600}.m65-s .m65-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m65-s:hover .m65-lbl,.m65-s:focus .m65-lbl{opacity:1}</style><line x1="10" y1="130" x2="270" y2="130" stroke="#1f2530" stroke-width="1.4"/><polygon points="278,130 269,126 269,134" fill="#1f2530"/><path d="M 20,128.9 L 22,128.7 L 24,128.5 L 26,128.3 L 28,128 L 30,127.7 L 32,127.4 L 34,127 L 36,126.6 L 38,126.1 L 40,125.6 L 42,125 L 44,124.4 L 46,123.7 L 48,122.9 L 50,122 L 52,121.1 L 54,120.1 L 56,119 L 58,117.8 L 60,116.5 L 62,115.1 L 64,113.6 L 66,111.9 L 68,110.2 L 70,108.4 L 72,106.4 L 74,104.4 L 76,102.2 L 78,99.9 L 80,97.5 L 82,95 L 84,92.5 L 86,89.8 L 88,87 L 90,84.2 L 92,81.3 L 94,78.4 L 96,75.4 L 98,72.4 L 100,69.3 L 102,66.3 L 104,63.3 L 106,60.3 L 108,57.4 L 110,54.5 L 112,51.7 L 114,49 L 116,46.5 L 118,44 L 120,41.8 L 122,39.6 L 124,37.7 L 126,35.9 L 128,34.4 L 130,33.1 L 132,32 L 134,31.1 L 136,30.5 L 138,30.1 L 140,30 L 142,30.1 L 144,30.5 L 146,31.1 L 148,32 L 150,33.1 L 152,34.4 L 154,35.9 L 156,37.7 L 158,39.6 L 160,41.8 L 162,44 L 164,46.5 L 166,49 L 168,51.7 L 170,54.5 L 172,57.4 L 174,60.3 L 176,63.3 L 178,66.3 L 180,69.3 L 182,72.4 L 184,75.4 L 186,78.4 L 188,81.3 L 190,84.2 L 192,87 L 194,89.8 L 196,92.5 L 198,95 L 200,97.5 L 202,99.9 L 204,102.2 L 206,104.4 L 208,106.4 L 210,108.4 L 212,110.2 L 214,111.9 L 216,113.6 L 218,115.1 L 220,116.5 L 222,117.8 L 224,119 L 226,120.1 L 228,121.1 L 230,122 L 232,122.9 L 234,123.7 L 236,124.4 L 238,125 L 240,125.6 L 242,126.1 L 244,126.6 L 246,127 L 248,127.4 L 250,127.7 L 252,128 L 254,128.3 L 256,128.5 L 258,128.7 L 260,128.9" fill="none" stroke="#1f2530" stroke-width="1.8"/><line x1="60" y1="116.5" x2="60" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="100" y1="69.4" x2="100" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="180" y1="69.4" x2="180" y2="130" stroke="#1f2530" stroke-width="1"/><line x1="220" y1="116.5" x2="220" y2="130" stroke="#1f2530" stroke-width="1"/><g class="m65-s" tabindex="0"><rect x="20" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="20,130 20,128.9 30,127.7 40,125.6 50,122 60,116.5 60,130"/><text class="m65-pc" x="34" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2.3 %</text><g class="m65-lbl"><rect x="4" y="30" width="112" height="15" rx="4" fill="#f3eee4"/><text x="60" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Outside <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 4.6 %</text></g></g><g class="m65-s" tabindex="0"><rect x="60" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="60,130 60,116.5 70,108.4 80,97.5 90,84.2 100,69.4 100,130"/><text class="m65-pc" x="80" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13.6 %</text><g class="m65-lbl"><rect x="8" y="30" width="108" height="15" rx="4" fill="#f3eee4"/><text x="62" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Within <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 95.4 %</text></g></g><g class="m65-s" tabindex="0"><rect x="100" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="100,130 100,69.4 110,54.5 120,41.8 130,33.1 140,30 140,130"/><text class="m65-pc" x="120" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34.1 %</text><g class="m65-lbl"><rect x="16" y="30" width="100" height="15" rx="4" fill="#f3eee4"/><text x="66" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Within <tspan font-style="italic">μ</tspan> ± <tspan font-style="italic">σ</tspan>: 68.2 %</text></g></g><g class="m65-s" tabindex="0"><rect x="140" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="140,130 140,30 150,33.1 160,41.8 170,54.5 180,69.4 180,130"/><text class="m65-pc" x="160" y="62" font-size="10" text-anchor="middle" fill="#1f2530">34.1 %</text><g class="m65-lbl"><rect x="164" y="30" width="100" height="15" rx="4" fill="#f3eee4"/><text x="214" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Within <tspan font-style="italic">μ</tspan> ± <tspan font-style="italic">σ</tspan>: 68.2 %</text></g></g><g class="m65-s" tabindex="0"><rect x="180" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="180,130 180,69.4 190,84.2 200,97.5 210,108.4 220,116.5 220,130"/><text class="m65-pc" x="200" y="124" font-size="9" text-anchor="middle" fill="#1f2530">13.6 %</text><g class="m65-lbl"><rect x="164" y="30" width="108" height="15" rx="4" fill="#f3eee4"/><text x="218" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Within <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 95.4 %</text></g></g><g class="m65-s" tabindex="0"><rect x="220" y="28" width="40" height="102" fill="transparent"/><polygon class="m65-om" points="220,130 220,116.5 230,122 240,125.6 250,127.7 260,128.9 260,130"/><text class="m65-pc" x="246" y="110" font-size="9" text-anchor="middle" fill="#1f2530">2.3 %</text><g class="m65-lbl"><rect x="164" y="30" width="112" height="15" rx="4" fill="#f3eee4"/><text x="220" y="41" font-size="10" text-anchor="middle" fill="#1f2530">Outside <tspan font-style="italic">μ</tspan> ± 2<tspan font-style="italic">σ</tspan>: 4.6 %</text></g></g><text x="60" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − 2<tspan font-style="italic">σ</tspan></text><text x="100" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> − <tspan font-style="italic">σ</tspan></text><text x="140" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan></text><text x="180" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + <tspan font-style="italic">σ</tspan></text><text x="220" y="146" font-size="10" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">μ</tspan> + 2<tspan font-style="italic">σ</tspan></text></svg>

Point at or tap an interval to colour the area and show the combined
proportion.
:::

Four typical curve shapes that help you decide which regression model
fits a set of points:

::: figur
<svg viewBox="0 0 540 120" width="664" height="148" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Four typical curves: a straight line, an exponential curve that rises more and more steeply, a power curve that turns at the origin and a parabola that turns without passing through the origin. Point at or tap a curve to see the equation of the model." style="overflow:visible"><style>.m67-s{cursor:pointer;outline:none}.m67-s .m67-kv{transition:stroke-width .18s ease}.m67-s:hover .m67-kv,.m67-s:focus .m67-kv{stroke-width:3.2}.m67-s .m67-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m67-s:hover .m67-lbl,.m67-s:focus .m67-lbl{opacity:1}</style><g class="m67-s" tabindex="0"><rect x="0" y="0" width="128" height="120" fill="transparent"/><line x1="8" y1="90" x2="120" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="14" y1="96" x2="14" y2="8" stroke="#1f2530" stroke-width="1.2"/><line class="m67-kv" x1="20" y1="82" x2="112" y2="18" stroke="#2563c9" stroke-width="1.8"/><text x="64" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Linear</text><g class="m67-lbl"><rect x="18" y="10" width="66" height="15" rx="4" fill="#f3eee4"/><text x="22" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">k</tspan><tspan font-style="italic">x</tspan> + <tspan font-style="italic">m</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="135" y="0" width="128" height="120" fill="transparent"/><line x1="143" y1="90" x2="255" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="149" y1="96" x2="149" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 152,84 Q 225,76 245,14" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="199" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Exponential</text><g class="m67-lbl"><rect x="153" y="10" width="62" height="15" rx="4" fill="#f3eee4"/><text x="157" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">C</tspan> · <tspan font-style="italic">a</tspan><tspan font-style="italic" font-size="7" dy="-4">x</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="270" y="0" width="128" height="120" fill="transparent"/><line x1="278" y1="90" x2="390" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="290" y1="96" x2="290" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 290,90 Q 345,90 378,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><circle cx="290" cy="90" r="2.4" fill="#2563c9"/><text x="334" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Power</text><g class="m67-lbl"><rect x="294" y="10" width="62" height="15" rx="4" fill="#f3eee4"/><text x="298" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">C</tspan> · <tspan font-style="italic">x</tspan><tspan font-style="italic" font-size="7" dy="-4">a</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="405" y="0" width="135" height="120" fill="transparent"/><line x1="413" y1="90" x2="525" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="419" y1="96" x2="419" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 428,20 Q 470,132 516,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="469" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Polynomial</text><g class="m67-lbl"><rect x="426" y="34" width="94" height="15" rx="4" fill="#f3eee4"/><text x="431" y="45" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">a</tspan><tspan font-style="italic">x</tspan><tspan font-size="7" dy="-4">2</tspan><tspan dy="4"> + </tspan><tspan font-style="italic">b</tspan><tspan font-style="italic">x</tspan> + <tspan font-style="italic">c</tspan></text></g></g></svg>

Point at or tap a curve to see the equation of the model.
:::

## Before the test

- Can you explain the difference between the mean, the median and the mode, and
  decide which is most suitable in a given case?
- Do you know how to calculate the mean for data divided into classes using
  class midpoints?
- Can you determine by hand the range, the quartiles $Q_1$, $Q_2$ and
  $Q_3$, and the interquartile range for a data set?
- Can you draw and interpret a box plot, and explain that each part contains
  $25\ \%$ of the values?
- Do you know what a percentile is, and can you determine a given percentile (for example
  $p_{90}$) with GeoGebra?
- Can you explain what the standard deviation measures, and the difference between
  $\sigma$ (total survey) and $s$ (sample survey)?
- Can you use GeoGebra's One Variable Analysis to find $n$,
  the mean, min, quartiles, median, max and standard deviation?
- Do you know the percentages of the normal distribution curve ($34.1\ \%$,
  $13.6\ \%$ and $2.3\ \%$) and can you use them to estimate
  proportions?
- Can you use GeoGebra's probability calculator to determine a proportion
  in a normal distribution, given $\mu$ and $\sigma$?
- Can you decide whether a correlation is strong or weak, and positive or
  negative, from a scatter plot?
- Can you find the equation of a regression line and the correlation coefficient
  $r$ with a digital tool, and use the equation to estimate
  values?
- Do you know how to use the $r^2$-value to decide which regression model
  (linear, exponential, power or polynomial) fits a set of points
  best?
