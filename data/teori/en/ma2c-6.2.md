---
kalla: 708dfaac72
id: ma2c-6.2
title: Measures of spread, box plots and percentiles
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.2'
---

# Measures of spread, box plots and percentiles

Measures of spread say something about how spread out the values in a data set are.
A large variation among the values gives a larger spread and a small
variation gives a smaller spread. There are several types of
measures of spread. How much the largest and the smallest
value differ is called the **range**.

::: formel "Range"
$$
\text{range} = \text{largest value} - \text{smallest value}
$$
:::

Another way of showing spread in a picture is a
**box plot**. In a box plot the values are divided into four equal parts,
and the plot shows between which values these lie. So each part of the box plot
contains a quarter of the values. The boundaries between each
quarter are called **quartiles**. To draw the box plot you need five
important values. To begin with you need the **smallest value**,
the **median** and the **largest value**. The median divides the values into two equal
parts (50 %).

To divide it into quarters we must divide the lower values into two
equal parts. The number that divides the lower values into two equal
parts is called the **lower quartile** (or first quartile) and is denoted
$Q_1$. In the same way, a value is needed to divide the upper
values into two equal parts, and this is called the **upper quartile** (or
third quartile) and is denoted $Q_3$. The median is sometimes called the
second quartile and is then denoted $Q_2$.

::: figur
<svg viewBox="22 44 166 102" width="287" height="176" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A box plot: a box from the lower quartile Q1 to the upper quartile Q3 with the median Q2 as a line in the box, and whiskers out to the lowest and highest value. Each part contains 25 percent of the values. Point at or tap a part of the box plot to see what it means." style="overflow:visible"><style>.m62-s{cursor:pointer;outline:none}.m62-s .m62-ln{transition:stroke-width .18s ease}.m62-s:hover .m62-ln,.m62-s:focus .m62-ln{stroke-width:3}.m62-s .m62-box{transition:fill .18s ease}.m62-s:hover .m62-box,.m62-s:focus .m62-box{fill:#79aacb}.m62-s .m62-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m62-s:hover .m62-lbl,.m62-s:focus .m62-lbl{opacity:1}</style><g class="m62-s" tabindex="0"><rect x="24" y="78" width="44" height="24" fill="transparent"/><line class="m62-ln" x1="29.2" y1="90" x2="66" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="29.2" y1="82" x2="29.2" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="22" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="43" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Lowest</text><text x="43" y="117" font-size="9" text-anchor="middle" fill="#1f2530">value</text></g></g><g class="m62-s" tabindex="0"><rect x="140" y="78" width="46" height="24" fill="transparent"/><line class="m62-ln" x1="144.2" y1="90" x2="181" y2="90" stroke="#1f2530" stroke-width="1.4"/><line class="m62-ln" x1="181" y1="82" x2="181" y2="98" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="146" y="99" width="42" height="21" rx="4" fill="#f3eee4"/><text x="167" y="107" font-size="9" text-anchor="middle" fill="#1f2530">Highest</text><text x="167" y="117" font-size="9" text-anchor="middle" fill="#1f2530">value</text></g></g><g class="m62-s" tabindex="0"><rect class="m62-box" x="66" y="70" width="78.2" height="40" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.4"/><g class="m62-lbl"><rect x="72" y="79" width="66" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">Middle 50 %</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">of the values</text></g></g><g class="m62-s" tabindex="0"><rect x="105" y="68" width="14" height="44" fill="transparent"/><line class="m62-ln" x1="112" y1="70" x2="112" y2="110" stroke="#1f2530" stroke-width="1.6"/><g class="m62-lbl"><rect x="76" y="79" width="58" height="22" rx="4" fill="#f3eee4"/><text x="105" y="88" font-size="8" text-anchor="middle" fill="#1f2530">The median</text><text x="105" y="97" font-size="8" text-anchor="middle" fill="#1f2530">(the middle)</text></g></g><text x="66" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₁</text><text x="112" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₂</text><text x="144" y="60" font-size="11" text-anchor="middle" fill="#1f2530">Q₃</text><line x1="30" y1="120" x2="65" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="120" x2="111" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="113" y1="120" x2="143" y2="120" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="120" x2="180" y2="120" stroke="#1f2530" stroke-width="1"/><text x="47" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="89" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="128" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text><text x="162" y="136" font-size="9" text-anchor="middle" fill="#1f2530">25 %</text></svg>

Point at or tap a part of the box plot to see what it means.
:::

The difference between the upper quartile and the lower quartile
corresponds to the width of the box and is called the **interquartile range**.

::: formel "Interquartile range"
$$
\text{interquartile range} = \text{upper quartile} - \text{lower quartile}
$$
:::

Since each part of the box ("left whisker", "left box", "right
box" and "right whisker") contains the same number of values, this means that
**the larger the part, the greater the spread** in that region (the
more spread out the values are). The converse also holds: **the smaller
the part, the smaller the spread** (the more closely grouped the values are).

If you have a larger number of observations you can, instead of
quartiles (quarters), divide the statistical data into
**percentiles** (hundredths). Percentiles state what percentage of the values
are **lower** than a certain value. $p_{80}$, for example, is the 80th percentile,
and then 80 % of the values are smaller than this value and 20 % of the values are
larger. Percentiles are calculated in GeoGebra (see the example below).

::: exempel "Example 1: Two dinners"
**Adriana arranges two different types of dinner: a family dinner and a
dinner with friends. The ages of the people at each dinner are:**

::: handskrift
typ: ladagram
:::

::: textlosning
**Family dinner:** 1, 3, 4, 8, 15, 27, 30, 33, 36, 41, 42, 44, 46, 72, 72

**Dinner with friends:** 28, 30, 31, 31, 32, 32, 33, 33, 34, 34, 34, 34, 35,
35, 36

In part b we will draw the box plots below of the results.

::: figur
<svg viewBox="6 6 226 180" width="390" height="311" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Two box plots above a number line from 0 to 75 years: the family dinner has a wide box from 8 to 44 with median 33 and whiskers from 1 to 72, while the dinner with friends has a very small box from 31 to 34 with median 33 and whiskers from 28 to 36."><text x="119" y="18" font-size="11" text-anchor="middle" fill="#1f2530">Family dinner</text><line x1="17.6" y1="52" x2="35.8" y2="52" stroke="#1f2530" stroke-width="1.3"/><line x1="129.4" y1="52" x2="202.2" y2="52" stroke="#1f2530" stroke-width="1.3"/><line x1="17.6" y1="45" x2="17.6" y2="59" stroke="#1f2530" stroke-width="1.3"/><line x1="202.2" y1="45" x2="202.2" y2="59" stroke="#1f2530" stroke-width="1.3"/><rect x="35.8" y="36" width="93.6" height="32" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.3"/><line x1="100.8" y1="36" x2="100.8" y2="68" stroke="#1f2530" stroke-width="1.5"/><text x="100.8" y="31" font-size="9" text-anchor="middle" fill="#1f2530">33</text><text x="14" y="70" font-size="9" text-anchor="middle" fill="#1f2530">1</text><text x="35.8" y="80" font-size="9" text-anchor="middle" fill="#1f2530">8</text><text x="129.4" y="80" font-size="9" text-anchor="middle" fill="#1f2530">44</text><text x="207" y="70" font-size="9" text-anchor="middle" fill="#1f2530">72</text><text x="119" y="100" font-size="11" text-anchor="middle" fill="#1f2530">Dinner with friends</text><line x1="87.8" y1="128" x2="95.6" y2="128" stroke="#1f2530" stroke-width="1.3"/><line x1="103.4" y1="128" x2="108.6" y2="128" stroke="#1f2530" stroke-width="1.3"/><line x1="87.8" y1="121" x2="87.8" y2="135" stroke="#1f2530" stroke-width="1.3"/><line x1="108.6" y1="121" x2="108.6" y2="135" stroke="#1f2530" stroke-width="1.3"/><rect x="95.6" y="114" width="7.8" height="28" fill="#8fb8d8" stroke="#1f2530" stroke-width="1.3"/><line x1="100.8" y1="114" x2="100.8" y2="142" stroke="#1f2530" stroke-width="1.5"/><text x="100.8" y="109" font-size="9" text-anchor="middle" fill="#1f2530">33</text><text x="80" y="132" font-size="9" text-anchor="end" fill="#1f2530">28</text><text x="94" y="154" font-size="9" text-anchor="middle" fill="#1f2530">31</text><text x="108" y="154" font-size="9" text-anchor="middle" fill="#1f2530">34</text><text x="116" y="132" font-size="9" text-anchor="start" fill="#1f2530">36</text><line x1="10" y1="168" x2="220" y2="168" stroke="#1f2530" stroke-width="1.4"/><polygon points="228,168 219,164 219,172" fill="#1f2530"/><line x1="41" y1="165" x2="41" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="67" y1="165" x2="67" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="93" y1="165" x2="93" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="119" y1="165" x2="119" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="145" y1="165" x2="145" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="171" y1="165" x2="171" y2="171" stroke="#1f2530" stroke-width="1"/><line x1="197" y1="165" x2="197" y2="171" stroke="#1f2530" stroke-width="1"/><text x="41" y="182" font-size="8" text-anchor="middle" fill="#1f2530">10</text><text x="67" y="182" font-size="8" text-anchor="middle" fill="#1f2530">20</text><text x="93" y="182" font-size="8" text-anchor="middle" fill="#1f2530">30</text><text x="119" y="182" font-size="8" text-anchor="middle" fill="#1f2530">40</text><text x="145" y="182" font-size="8" text-anchor="middle" fill="#1f2530">50</text><text x="171" y="182" font-size="8" text-anchor="middle" fill="#1f2530">60</text><text x="197" y="182" font-size="8" text-anchor="middle" fill="#1f2530">70</text></svg>
:::

**a) For both dinners, determine the median, the range, the lower and
upper quartiles and the interquartile range.<br>b) Draw a box plot of the results.<br>c) Use the box plot to determine what proportion of the people at the family dinner are over 8 years old.<br>d) How old do you have to be to belong to the oldest 10 % at the family dinner?**

**a)** The **median** is 33 years for both dinners (the value in the middle). To
determine the **lower quartile**, we find the median of
all the values **to the left** of the median. It is 8 years (family dinner) and
31 years (dinner with friends). In the same way, the **upper quartile** is
the median of all the values **to the right** of the median. It is 44 years
(family dinner) and 34 years (dinner with friends).

$$
\text{Range}_\text{family} = 72 - 1 = 71\ \text{years}
$$

$$
\text{Range}_\text{friends} = 36 - 28 = 8\ \text{years}
$$

$$
\text{Interquartile range}_\text{family} = 44 - 8 = 36\ \text{years}
$$

$$
\text{Interquartile range}_\text{friends} = 34 - 31 = 3\ \text{years}
$$

**Answer:** Family dinner: median = 33 years, range = 71 years, lower
quartile = 8 years, upper quartile = 44 years and interquartile range = 36 years.
Dinner with friends: median = 33 years, range = 8 years, lower quartile =
31 years, upper quartile = 34 years and interquartile range = 3 years.

**b)** We mark the largest and the smallest value with short vertical lines
above a number line. Then we mark the median and the lower and upper
quartiles with longer vertical lines. Then we join the longer
vertical lines and form the box plots (see the figure above).


NOTE! Notice how the small spread at the dinner with friends gives
small parts in the box plot, compared with the box plot for the family dinner.

**c)** We are to determine what percentage are older than 8 years from
the box plot for the family dinner above. Since each part of the box plot
contains 25 %, and 8 years is the lower quartile, this means that the
three parts to the right of 8 years together contain 75 %.

**Answer:** 75 %

**d)** To belong to the oldest 10 % you have to be above the 90th
percentile, $p_{90}$. We calculate $p_{90}$ with GeoGebra: enter all the
values in the spreadsheet, select them and choose "Create List" (default name
l1). Then type `Percentile(l1, 90%)` in the input bar. GeoGebra
answers 72.

**Answer:** 72 years
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Measures of spread"
- A measure of spread describes how spread out the values are.
- **Range** = the largest value minus the smallest value.
- **Interquartile range** = the upper quartile minus the lower quartile, that is, the width of the box.
:::

::: sampunkt "Quartiles"
- The quartiles divide the data into four equal parts, a quarter in each.
- The **lower quartile** $Q_1$ is the median of the values to the left of the median.
- The **upper quartile** $Q_3$ is the median of the values to the right of the median.
- The median is sometimes called the second quartile, $Q_2$.
:::

::: sampunkt "Box plot"
- Drawn from five values: the smallest value, $Q_1$, the median, $Q_3$ and the largest value.
- Each part contains 25 % of the values.
- A large part means a large spread in that region, a small part means that the values are closely grouped.
- Proportions are read directly from the picture: above the lower quartile there are three parts, that is 75 %.
:::

::: sampunkt "Percentiles"
- **Percentiles** divide the data into hundredths and are used when there are many observations.
- $p_{80}$ means that 80 % of the values are **lower** and 20 % higher.
- The oldest 10 % are above $p_{90}$.
- Calculated digitally, in GeoGebra with the command `Percentile(l1, 90%)`.
:::

:::
