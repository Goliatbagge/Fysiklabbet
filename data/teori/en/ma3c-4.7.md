---
kalla: 2631e7e38f
id: ma3c-4.7
title: Optimisation problems with digital tools
course: Matematik fortsättning nivå 1c
chapter: Kurvor och extremvärden
chapterNumber: 4
section: '4.7'
---

# Optimisation problems with digital tools

When we solve optimisation problems with the derivative, we do an **algebraic
solution**: we set up a formula, differentiate, set the derivative equal to
zero and solve for the unknown variable. We can also solve
optimisation problems with **digital tools**, for example Geogebra. Then we
instead draw the graph of the function to be optimised and read off
any extreme points directly from the graph, without differentiating by hand.

::: tips "How to solve an optimisation problem graphically in Geogebra"
1. Set up a formula for the quantity to be optimised (for example a volume or an area).
2. Use a constraint to express the quantity as a function of **one single** variable.
3. Type the function into Geogebra's input bar and adjust the coordinate axes so that the interesting part of the graph is visible.
4. Use the **Extremum** tool and click on the graph.
5. Read off the coordinates: the $x$-coordinate gives the value of the variable asked for, the $y$-coordinate gives the optimised value itself.
:::

The method works on exactly the same type of problem as the algebraic
method, but requires no differentiation by hand. The disadvantage is that we only
get a read-off, rounded value, not an exact expression.

::: exempel "Example 1: Optimising the volume of a cylinder graphically"
**A cylinder is to be made where the sum of the height and the diameter is to be
50 cm. What radius should the cylinder have to get as large a volume as
possible?**

::: handskrift
typ: cylindervolym
:::

::: textlosning
Since the volume is to be optimised, we set up the formula for the volume of a
cylinder.

$$
V = \pi r^2 h \qquad (1)
$$

The volume depends on two variables, the radius $r$ and the height $h$. To be able to
optimise the volume we must express it in **one single variable**. We
use the fact that the sum of the height and the diameter is to be 50 cm. Remember that
the diameter $d = 2r$, which gives

$$
h + 2r = 50
$$

We solve for $h$ and get

$$
h = 50 - 2r
$$

We substitute $h = 50 - 2r$ into formula (1), which gives

$$
V = \pi r^2(50 - 2r) = 50\pi r^2 - 2\pi r^3
$$

We have now written the volume $V$ as a function of the single variable $r$:

$$
V(r) = 50\pi r^2 - 2\pi r^3
$$

We type $V(r) = 50\pi r^2 - 2\pi r^3$ into the input bar in Geogebra
and adjust the coordinate axes with the move graphics view tool so that the top of the graph
is visible. The graph is a cubic curve that rises from the origin up to a
maximum and then decreases towards more and more negative values.

We then use the **Extremum** tool and click on the graph.
Since it is the radius (the independent variable) that is asked for, we read
off the $x$-coordinate of the extreme point. Geogebra marks the point $B$ and
shows

$$
B = (16.66667, 14544.41043)
$$

(Geogebra shows decimal numbers with a point as the decimal separator.)
The $x$-coordinate gives the radius and the $y$-coordinate at the same time gives the
maximum volume in cm³. We see that the maximum volume is obtained at the radius
$r = 16.666\ldots \approx 16.7$ cm.

Even with a graphical solution you should check that the answer is reasonable: here
$0 < r < 25$ must hold, since otherwise the height $h = 50 - 2r$ becomes
negative. The radius $r \approx 16.7$ cm lies within this interval, so
the answer is reasonable.

**Answer:** $r \approx 16.7$ cm
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Graphical solution"
- Instead of differentiating by hand, the graph of the function is drawn and the extreme point is read off.
- The method works on the same problems as the algebraic one.
- Disadvantage: the answer is read off and rounded, not exact.
:::

::: sampunkt "Step by step"
1. Set up a formula for what is to be optimised.
2. Use the conditions of the task to express it in **one single** variable.
3. Type the function into Geogebra and adjust the axes so that the top is visible.
4. Use the **Extremum** tool and click on the graph.
5. Read off: the $x$-coordinate gives the value of the variable, the $y$-coordinate the optimised value.
:::

::: sampunkt "Typical example: the cylinder"
- $V = \pi r^2 h$ and the condition $h + 2r = 50$ give $h = 50 - 2r$.
- Substitution gives $V(r) = 50\pi r^2 - 2\pi r^3$, a function of $r$ only.
- The extreme point is at $r \approx 16.7$ cm.
:::

::: sampunkt "Checking reasonableness"
- Always check that the answer lies within the permitted range of the problem.
- Here $0 < r < 25$ must hold, otherwise the height becomes negative.
- Geogebra writes decimal numbers with a **point**.
:::

:::
