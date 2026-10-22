---
kalla: a062184919
id: ma2c-6.7
title: Different regression models
course: Matematik nivå 2c
chapter: Statistik
chapterNumber: 6
section: '6.7'
---

# Different regression models

In the previous lesson we saw how we could find a linear relationship
by fitting a straight line to points. There are other relationships
that are not linear, and we can find many of these in a similar way.

To know which model fits best to given points, it can
be useful to know some characteristic features of the shapes of different
functions.

| Function | Form | Characteristic features |
| --- | --- | --- |
| Linear | $y = kx + m$ | Straight line. The increase or decrease is the same everywhere. |
| Exponential | $y = Ca^x$ | Small increase at the beginning and large increase at the end OR large decrease at the beginning and small decrease at the end. |
| Power | $y = Cx^a$ | Curve that turns and passes through the origin. |
| Polynomial | $y = ax^2 + bx + c$ (degree 2) | Curve that turns, not necessarily through the origin. |

::: figur
<svg viewBox="0 0 540 120" width="664" height="148" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="Four typical curves: a straight line, an exponential curve that rises more and more steeply, a power curve that turns at the origin and a parabola that turns without passing through the origin. Point at or tap a curve to see the equation of the model." style="overflow:visible"><style>.m67-s{cursor:pointer;outline:none}.m67-s .m67-kv{transition:stroke-width .18s ease}.m67-s:hover .m67-kv,.m67-s:focus .m67-kv{stroke-width:3.2}.m67-s .m67-lbl{opacity:0;transition:opacity .18s ease;pointer-events:none}.m67-s:hover .m67-lbl,.m67-s:focus .m67-lbl{opacity:1}</style><g class="m67-s" tabindex="0"><rect x="0" y="0" width="128" height="120" fill="transparent"/><line x1="8" y1="90" x2="120" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="14" y1="96" x2="14" y2="8" stroke="#1f2530" stroke-width="1.2"/><line class="m67-kv" x1="20" y1="82" x2="112" y2="18" stroke="#2563c9" stroke-width="1.8"/><text x="64" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Linear</text><g class="m67-lbl"><rect x="18" y="10" width="66" height="15" rx="4" fill="#f3eee4"/><text x="22" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">k</tspan><tspan font-style="italic">x</tspan> + <tspan font-style="italic">m</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="135" y="0" width="128" height="120" fill="transparent"/><line x1="143" y1="90" x2="255" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="149" y1="96" x2="149" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 152,84 Q 225,76 245,14" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="199" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Exponential</text><g class="m67-lbl"><rect x="153" y="10" width="62" height="15" rx="4" fill="#f3eee4"/><text x="157" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">C</tspan> · <tspan font-style="italic">a</tspan><tspan font-style="italic" font-size="7" dy="-4">x</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="270" y="0" width="128" height="120" fill="transparent"/><line x1="278" y1="90" x2="390" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="290" y1="96" x2="290" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 290,90 Q 345,90 378,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><circle cx="290" cy="90" r="2.4" fill="#2563c9"/><text x="334" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Power</text><g class="m67-lbl"><rect x="294" y="10" width="62" height="15" rx="4" fill="#f3eee4"/><text x="298" y="21" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">C</tspan> · <tspan font-style="italic">x</tspan><tspan font-style="italic" font-size="7" dy="-4">a</tspan></text></g></g><g class="m67-s" tabindex="0"><rect x="405" y="0" width="135" height="120" fill="transparent"/><line x1="413" y1="90" x2="525" y2="90" stroke="#1f2530" stroke-width="1.2"/><line x1="419" y1="96" x2="419" y2="8" stroke="#1f2530" stroke-width="1.2"/><path class="m67-kv" d="M 428,20 Q 470,132 516,16" fill="none" stroke="#2563c9" stroke-width="1.8"/><text x="469" y="112" font-size="11" text-anchor="middle" fill="#1f2530">Polynomial</text><g class="m67-lbl"><rect x="426" y="34" width="94" height="15" rx="4" fill="#f3eee4"/><text x="431" y="45" font-size="10" text-anchor="start" fill="#2563c9"><tspan font-style="italic">y</tspan> = <tspan font-style="italic">a</tspan><tspan font-style="italic">x</tspan><tspan font-size="7" dy="-4">2</tspan><tspan dy="4"> + </tspan><tspan font-style="italic">b</tspan><tspan font-style="italic">x</tspan> + <tspan font-style="italic">c</tspan></text></g></g></svg>

Point at or tap a curve to see the equation of the model.
:::

Sometimes it is difficult to decide which model fits best. It can,
for example, be difficult to see whether the points are best fitted by an exponential
or a power function. Power and polynomial functions can be even
harder to tell apart, because they can also sometimes coincide
($y = x^2$ is both a power function and a polynomial function).

To decide which curve fit is best, we can use
the square of the correlation coefficient, $r^2$. The $r^2$-value lies between 0
(no correlation at all) and 1 (perfect correlation). So the closer to 1
the $r^2$-value is, the better the curve fits. To find
the $r^2$-value we, as usual, enter the values in GeoGebra's
spreadsheet, click on the button "Show Statistics" and read off
the $r^2$-value in the table.

::: exempel "Example 1: The world's population"
**The world's population in a few different years is shown in the table
below.**

::: handskrift
typ: regressionbefolkning
:::

::: textlosning
| Year | Population (billions) |
| --- | --- |
| 1920 | 1.912 |
| 1930 | 2.070 |
| 1940 | 2.307 |
| 1950 | 2.536 |
| 1960 | 3.032 |
| 1970 | 3.692 |
| 1980 | 4.434 |
| 1990 | 5.321 |
| 2000 | 6.145 |
| 2010 | 6.922 |
| 2020 | 7.794 |

**Create a scatter plot and find a regression model that is<br>a) linear&emsp;&emsp;b) exponential<br>c) Which of the models describes the relationship best?**

**a)** We enter the values in GeoGebra's spreadsheet (remember that
decimal numbers are written with a point), select the values, click on "blue
bars" and choose *Two Variable Regression Analysis*. A
scatter plot is obtained.

We choose the regression model *Linear* and read off the equation:
$y = 0.0612x - 116.3385$.

**Answer:** $y = 0.061x - 120$

**b)** We change the regression model in the drop-down list to *Exponential
C·aˣ* and read off the equation.

**Answer:** $y = 0 \cdot 1.0153^x$

(The initial value $C = 0$ in the model is unrealistic, but GeoGebra does
not show all the decimals for numbers close to 0.)

**c)** To decide which of the models describes the relationship best,
we look at which curve fits the points best. In
this case it is easy to see that the exponential function fits
the points better and is therefore the best.

If we want to be sure, we can compare the models' $r^2$-values. We
click on the button "Show Statistics" and read off at $R^2$ for
each model:

- Linear: $r^2 = 0.954$
- Exponential: $r^2 = 0.9933$

Since the $r^2$-value is closest to 1 for the exponential function,
it is the best.

**Answer:** The exponential model is the best.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Four models"
- **Linear** $y = kx + m$: straight line, the same increase everywhere.
- **Exponential** $y = C \cdot a^x$: small increase at the beginning and large at the end, or large decrease at the beginning and small at the end.
- **Power** $y = C \cdot x^a$: curve that turns and passes through the origin.
- **Polynomial** $y = ax^2 + bx + c$: curve that turns, but not necessarily through the origin.
:::

::: sampunkt "Choosing a model"
- First look at how the points lie and compare with the characteristic features of the curves.
- Exponential and power functions can be hard to tell apart, as can power and polynomial. $y = x^2$ is both.
- Only copy down the model that really lies close to the points.
:::

::: sampunkt "The coefficient of determination decides"
- $r^2$ is the square of the correlation coefficient and lies between 0 and 1.
- The closer to 1, the better the curve fits the points.
- Find it under "Show Statistics" and compare the models.
:::

::: sampunkt "Typical task: the population"
- The world's population 1920 to 2020 gives linear $r^2 = 0.954$ but exponential $r^2 = 0.9933$.
- So the exponential model is the best, which can also be seen directly in the diagram.
- Change the model in the drop-down list "Regression Model" and read off the equation below the diagram.
:::

:::
