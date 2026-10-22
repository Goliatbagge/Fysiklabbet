---
kalla: 697c54b2e9
id: ma2c-6.6
title: Linear regression
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.6'
---

# Linear regression

::: tips "Revision from Mathematics level 1c"
If there is a relationship between two variables, we have a **correlation**.
Whether a relationship exists can be investigated with a
**scatter plot**. If the points in a scatter plot lie
clearly on a line, the correlation is **strong**. If the points lie
around a straight line but are spread out, the correlation is **weak**. If the points
lie around a line with a positive slope, the correlation is **positive**.
If the points lie around a line with a negative slope, the correlation is
**negative**.
:::

The line that the values are gathered around is called the **regression line**. If
we find the equation of the regression line, we carry out a **linear
regression**. A regression analysis can be done approximately by hand
or more exactly with digital tools. In the regression analysis we can
find a value that tells us how strong the correlation is. This value is called
the **correlation coefficient**, is written $r$ and is always a value
between −1 and 1. If the points lie perfectly on a line with a **positive
slope**, $r = 1$. If the points lie perfectly on a line with a
**negative slope**, $r = -1$. If there is no correlation at all,
$r = 0$. See the examples below.

::: figur
<svg viewBox="0 0 520 152" width="664" height="194" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Three scatter plots: one with points close along a rising line (strong positive correlation), one with scattered points around a falling line (weak negative correlation) and one with completely random points (no correlation)."><line x1="8" y1="110" x2="150" y2="110" stroke="#1f2530" stroke-width="1.3"/><polygon points="158,110 149,106 149,114" fill="#1f2530"/><line x1="18" y1="118" x2="18" y2="12" stroke="#1f2530" stroke-width="1.3"/><polygon points="18,4 14,13 22,13" fill="#1f2530"/><circle cx="28" cy="100" r="2.6" fill="#c8324a"/><circle cx="38" cy="93" r="2.6" fill="#c8324a"/><circle cx="46" cy="89" r="2.6" fill="#c8324a"/><circle cx="55" cy="80" r="2.6" fill="#c8324a"/><circle cx="63" cy="75" r="2.6" fill="#c8324a"/><circle cx="72" cy="66" r="2.6" fill="#c8324a"/><circle cx="80" cy="61" r="2.6" fill="#c8324a"/><circle cx="89" cy="52" r="2.6" fill="#c8324a"/><circle cx="98" cy="46" r="2.6" fill="#c8324a"/><circle cx="107" cy="37" r="2.6" fill="#c8324a"/><circle cx="116" cy="31" r="2.6" fill="#c8324a"/><circle cx="126" cy="22" r="2.6" fill="#c8324a"/><text x="80" y="134" font-size="11" text-anchor="middle" fill="#1f2530">Strong positive correlation</text><text x="80" y="148" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">r</tspan> ≈ 1</text><line x1="188" y1="110" x2="330" y2="110" stroke="#1f2530" stroke-width="1.3"/><polygon points="338,110 329,106 329,114" fill="#1f2530"/><line x1="198" y1="118" x2="198" y2="12" stroke="#1f2530" stroke-width="1.3"/><polygon points="198,4 194,13 202,13" fill="#1f2530"/><circle cx="208" cy="28" r="2.6" fill="#c8324a"/><circle cx="216" cy="55" r="2.6" fill="#c8324a"/><circle cx="225" cy="38" r="2.6" fill="#c8324a"/><circle cx="233" cy="68" r="2.6" fill="#c8324a"/><circle cx="242" cy="48" r="2.6" fill="#c8324a"/><circle cx="251" cy="78" r="2.6" fill="#c8324a"/><circle cx="260" cy="60" r="2.6" fill="#c8324a"/><circle cx="269" cy="88" r="2.6" fill="#c8324a"/><circle cx="278" cy="70" r="2.6" fill="#c8324a"/><circle cx="288" cy="95" r="2.6" fill="#c8324a"/><circle cx="298" cy="82" r="2.6" fill="#c8324a"/><circle cx="308" cy="100" r="2.6" fill="#c8324a"/><text x="260" y="134" font-size="11" text-anchor="middle" fill="#1f2530">Weak negative correlation</text><text x="260" y="148" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">r</tspan> ≈ −0.5</text><line x1="368" y1="110" x2="510" y2="110" stroke="#1f2530" stroke-width="1.3"/><polygon points="518,110 509,106 509,114" fill="#1f2530"/><line x1="378" y1="118" x2="378" y2="12" stroke="#1f2530" stroke-width="1.3"/><polygon points="378,4 374,13 382,13" fill="#1f2530"/><circle cx="390" cy="45" r="2.6" fill="#c8324a"/><circle cx="398" cy="90" r="2.6" fill="#c8324a"/><circle cx="406" cy="22" r="2.6" fill="#c8324a"/><circle cx="415" cy="66" r="2.6" fill="#c8324a"/><circle cx="422" cy="100" r="2.6" fill="#c8324a"/><circle cx="430" cy="40" r="2.6" fill="#c8324a"/><circle cx="440" cy="78" r="2.6" fill="#c8324a"/><circle cx="448" cy="18" r="2.6" fill="#c8324a"/><circle cx="456" cy="56" r="2.6" fill="#c8324a"/><circle cx="464" cy="94" r="2.6" fill="#c8324a"/><circle cx="472" cy="34" r="2.6" fill="#c8324a"/><circle cx="482" cy="72" r="2.6" fill="#c8324a"/><circle cx="490" cy="26" r="2.6" fill="#c8324a"/><circle cx="497" cy="88" r="2.6" fill="#c8324a"/><text x="440" y="134" font-size="11" text-anchor="middle" fill="#1f2530">No correlation</text><text x="440" y="148" font-size="11" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">r</tspan> ≈ 0</text></svg>
:::

Examples of relationships: foot length/shoe size has a strong positive correlation,
road width/number of accidents may have a weak negative correlation and
egg consumption/crime has no correlation.

::: exempel "Example 1: Ice cream sales"
**The mean temperature and a company's sales of ice cream during one
week are shown below.**

::: handskrift
typ: regressionglass
:::

::: textlosning
| Mean temperature (°C) | Ice cream sales (kr) |
| --- | --- |
| 22.1 | 8 000 |
| 18.5 | 7 500 |
| 26.7 | 9 500 |
| 24.3 | 9 000 |
| 20.6 | 8 300 |
| 27.9 | 10 200 |
| 23.4 | 8 900 |

The scatter plot and the regression line found in parts a and
b are shown in the figure below.

::: figur
<svg viewBox="-30 6 250 174" width="450" height="313" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A scatter plot of ice cream sales against mean temperature with seven points lying close to a rising regression line."><line x1="14" y1="150" x2="204" y2="150" stroke="#1f2530" stroke-width="1.4"/><polygon points="212,150 203,146 203,154" fill="#1f2530"/><line x1="14" y1="158" x2="14" y2="18" stroke="#1f2530" stroke-width="1.4"/><polygon points="14,10 10,19 18,19" fill="#1f2530"/><line x1="30" y1="150" x2="200" y2="62.6" stroke="#c8324a" stroke-width="1.8"/><circle cx="111.5" cy="121.4" r="3" fill="#1f2530"/><circle cx="57.5" cy="135.7" r="3" fill="#1f2530"/><circle cx="180.5" cy="78.6" r="3" fill="#1f2530"/><circle cx="144.5" cy="92.9" r="3" fill="#1f2530"/><circle cx="89" cy="112.9" r="3" fill="#1f2530"/><circle cx="198.5" cy="58.6" r="3" fill="#1f2530"/><circle cx="131" cy="95.7" r="3" fill="#1f2530"/><text x="50" y="164" font-size="9" text-anchor="middle" fill="#1f2530">18</text><text x="80" y="164" font-size="9" text-anchor="middle" fill="#1f2530">20</text><text x="110" y="164" font-size="9" text-anchor="middle" fill="#1f2530">22</text><text x="140" y="164" font-size="9" text-anchor="middle" fill="#1f2530">24</text><text x="170" y="164" font-size="9" text-anchor="middle" fill="#1f2530">26</text><text x="200" y="164" font-size="9" text-anchor="middle" fill="#1f2530">28</text><text x="-28" y="153" font-size="9" text-anchor="start" fill="#1f2530">7 000</text><text x="-28" y="124" font-size="9" text-anchor="start" fill="#1f2530">8 000</text><text x="-28" y="96" font-size="9" text-anchor="start" fill="#1f2530">9 000</text><text x="-28" y="67" font-size="9" text-anchor="start" fill="#1f2530">10 000</text><text x="216" y="176" font-size="9" text-anchor="end" fill="#1f2530">(°C)</text><text x="-28" y="20" font-size="9" text-anchor="start" fill="#1f2530">(kr)</text></svg>
:::

**a) Draw a scatter plot of the results. Let the mean temperature
be on the *x*-axis and the ice cream sales on the *y*-axis.<br>b) Find the equation of the regression line.<br>c) Find the correlation coefficient.<br>d) Use your model to estimate the ice cream sales in a week when the mean temperature is 30 °C.**

**a)** Start GeoGebra, switch to the spreadsheet and copy the values from
the table. Select the values, click the "blue bars", choose
*Two Variable Regression Analysis* and our scatter plot is shown.


**b)** After producing the scatter plot we click the
"Regression Model" drop-down list and choose "Linear". The regression line
is drawn (the red line in the figure) and its equation is shown
below the diagram: $y = 268.6652x + 2\,496.1775$.

We round the values in the equation to a suitable number of significant figures.

**Answer:** $y \approx 270x + 2\,500$

(Of course it is fine to draw the scatter plot, draw the
regression line and find the equation by hand, but it takes much
longer and is less exact.)

**c)** After producing the scatter plot we click "Show
Statistics", read off $r$ and round to two decimal places:
$r = 0.9651\ldots$

**Answer:** $r \approx 0.97$

**d)** From part b we found the relationship $y = 270x + 2\,500$ where
$x$ is the mean temperature in °C and $y$ the sales in kronor.

If the mean temperature is 30 °C we substitute $x = 30$ in the formula above to
find the expected sales:

$$
y = 270 \cdot 30 + 2\,500 = 10\,600
$$

**Answer:** 10 600 kr
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Correlation"
- **Correlation:** a relationship between two variables.
- Investigated with a **scatter plot**, where each observation is a point.
- Points close along a line give a **strong** correlation, scattered points give a **weak** one.
- A rising line gives a **positive** correlation, a falling one a **negative** one.
:::

::: sampunkt "Regression line"
- The **regression line** is the straight line that the values are gathered around.
- Finding its equation is called **linear regression**, and the equation has the form $y = kx + m$.
- In GeoGebra: spreadsheet, select the values, *Two Variable Regression Analysis*, choose the regression model *Linear*.
- Round the values in the equation to a suitable number of significant figures.
:::

::: sampunkt "The correlation coefficient"
- $r$ measures how strong the correlation is and always lies between $-1$ and $1$.
- $r = 1$ means that the points lie perfectly on a rising line, $r = -1$ on a falling one.
- $r = 0$ means no correlation at all.
- Read off under "Show Statistics".
:::

::: sampunkt "Using the model"
- Substitute an $x$-value in the equation of the regression line to estimate the corresponding $y$.
- With $y = 270x + 2\,500$, $x = 30$ gives sales of 10 600 kr.
- Correlation does not mean causation: egg consumption and crime have no relationship at all.
:::

:::
