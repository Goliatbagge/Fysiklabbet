---
kalla: 9e38cb06da
id: ma2c-6.3
title: Statistics with digital tools
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.3'
---

# Statistics with digital tools

With large amounts of data it is easier to calculate statistical measures with
digital tools.

To find statistical measures we enter our values in a
column in GeoGebra's spreadsheet. Then we select the values, click on
the "blue bars" menu, choose *One Variable Analysis* and then the button "Show
Statistics".

::: tips "Useful statistical values in GeoGebra"
| Notation | Meaning |
| --- | --- |
| n | number of values |
| Mean | mean |
| Min | smallest value |
| Q1 | lower quartile |
| Median | median |
| Q3 | upper quartile |
| Max | largest value |
:::

With GeoGebra we can also determine percentiles and draw box plots, see
the example below.

::: exempel "Example 1: The family dinner in GeoGebra"
**At a family dinner the ages are 1, 3, 4, 8, 15, 27, 30, 33, 36, 41,
42, 44, 46, 72 and 72 years. Use a digital tool to<br>a) determine the smallest value, the lower quartile, the median, the upper quartile and the largest value<br>b) decide how old you have to be to belong to the oldest 10 %<br>c) draw a box plot of the ages**

::: handskrift
typ: casladagram
:::

::: textlosning
**a)** We start GeoGebra, click on the button "Switch to spreadsheet"
in the top menu bar and enter the values in the left-hand column.
We select the values, click on the "blue bars" menu and choose
*One Variable Analysis*. We click on the button "Show Statistics" and read off
the requested values.

**Answer:** Smallest value = 1, lower quartile = 8, median = 33, upper
quartile = 44 and largest value = 72.

**b)** To belong to the oldest 10 % you have to be above the 90th
percentile, $p_{90}$ (90 % must have a lower age).

1. Select all the values in the spreadsheet and click on "Create List".
   The default name is l1, but you can give the list a name of your own. Then choose
   OK.
2. Then switch back to the standard view in the top menu bar.
3. Type "perc" in the input bar and click on
   "Percentile( <List of Numbers>, <Percent> )".
4. Then type "l1" or the name you gave the list. Move one
   step to the right with the arrow keys and type "90%" (or "0.9") to
   get the answer.

GeoGebra answers 72.

**Answer:** 72 years

**c)** We will now draw a box plot. Select all the values in
the spreadsheet, click on the "blue bars" menu and choose
*One Variable Analysis*. In the drop-down list where it says "Histogram", choose
"Box Plot".

If you want to change the appearance of the box plot or, for example, read it
more easily against the axes, it is a good idea to copy it to the Graphics View. Then
switch to the standard view and adjust the axes if necessary with the tool
*Move Graphics View*. There you can also adjust the appearance (colour,
line thickness and so on).
:::
:::

::: exempel "Example 2: Frequency table in GeoGebra"
**The number of siblings each student had at a school with 177 students
was investigated. Determine the mean number of siblings from the
frequency table below.**

::: handskrift
typ: casfrekvens
:::

::: textlosning
| Number of siblings | Frequency |
| --- | --- |
| 0 | 17 |
| 1 | 68 |
| 2 | 51 |
| 3 | 26 |
| 4 | 9 |
| 5 | 2 |
| 6 | 4 |

To avoid entering 177 separate values in a spreadsheet (or in
the formula for the mean), we can enter the
frequencies in an extra column to the right in GeoGebra's spreadsheet, that is, as they appear in
the table above.

Select all the values in both columns, click on "blue bars" and choose
*One Variable Analysis*. Then click on the button "Show Statistics" and read
off the mean in the table: Mean ≈ 1.7966.

**Answer:** The mean is about 1.8 siblings.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "One Variable Analysis"
- Enter the values in a column in GeoGebra's spreadsheet.
- Select the values, click on the "blue bars" menu and choose *One Variable Analysis*.
- The button "Show Statistics" gives the statistical measures.
:::

::: sampunkt "Notation in the table"
- n = number of values, Mean = mean.
- Min = the smallest value, Max = the largest value.
- Q1 = lower quartile, Median = median, Q3 = upper quartile.
:::

::: sampunkt "Percentile"
- Select the values and choose "Create List", the default name is l1.
- Switch to the standard view and type `Percentile(l1, 90%)` in the input bar.
- The highest 10 % of the values lie above $p_{90}$.
:::

::: sampunkt "Box plot and frequency table"
- Box plot: choose *One Variable Analysis* and change from "Histogram" to "Box Plot" in the drop-down list.
- Frequency table: enter the values in one column and the frequencies in the column to the right, so that you do not have to enter every observation.
- Decimal numbers are written with a **point** in GeoGebra.
:::

:::
