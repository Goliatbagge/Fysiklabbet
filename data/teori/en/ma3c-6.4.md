---
kalla: bac85297ec
id: ma3c-6.4
title: Trigonometric equations – practice lesson and tangent
course: Matematik fortsättning nivå 1c
chapter: Trigonometri och triangelsatserna
chapterNumber: 6
section: '6.4'
---

# Trigonometric equations – practice lesson and tangent

We solve equations of the type $\sin v = a$ or $\cos v = a$ with the help of
their inverse functions. In the same way we solve the equation
$\tan v = a$ with the inverse function for tangent. Just like $\sin^{-1}$
and $\cos^{-1}$, we write the inverse function for tangent as
$\tan^{-1}$.

We have already established that the sine and cosine functions repeat
for every $360^\circ$ that is added to (or subtracted from) an angle. We
say that the sine and cosine functions have a **period** of $360^\circ$.

::: formel "Trigonometric functions and periods"
| Function | Period |
| --- | --- |
| $\sin$ | $360^\circ$ |
| $\cos$ | $360^\circ$ |
| $\tan$ | $180^\circ$ |

::: härledning "Derivation: the period of tangent"
We examine the period of the tangent function. We already know that

$$
\tan v = \frac{\sin v}{\cos v}
$$

This gives

$$
\tan (v + 180^\circ) = \frac{\sin (v + 180^\circ)}{\cos (v + 180^\circ)} = \frac{-\sin v}{-\cos v} = \frac{\sin v}{\cos v} = \tan v
$$

So we see that

$$
\tan v = \tan (v + 180^\circ)
$$

So the tangent function has a period of $180^\circ$ QED
:::

::: härledning "Did you know: the period of tangent"
There is an alternative way to think about the period of tangent. Since

$$
\tan v = \frac{\sin v}{\cos v} = \frac{y}{x} = k
$$

we can see the value of $\tan v$ as the **gradient** (the $k$-value)
of the line through the origin and a point on the unit circle. If we form an
arbitrary angle $v$, it gives a point on the unit circle, and the line through
the origin and that point has a certain $k$-value.

::: figur
<svg viewBox="-108 -108 230 216" width="312" height="293" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="A unit circle with a line through the origin that crosses the circle at two opposite points. The angle v is measured from the positive x-axis to one of the points, and the angle v plus 180 degrees is measured in the same way to the opposite point on the same line."><line x1="-100" y1="0" x2="92" y2="0" stroke="#1f2530" stroke-width="1.6"/><polygon points="100,0 90,-4 90,4" fill="#1f2530"/><line x1="0" y1="100" x2="0" y2="-92" stroke="#1f2530" stroke-width="1.6"/><polygon points="0,-100 -4,-90 4,-90" fill="#1f2530"/><text x="105" y="16" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="8" y="-86" font-size="14" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><circle cx="0" cy="0" r="68" fill="none" stroke="#1f2530" stroke-width="1.5"/><line x1="55.70" y1="-39.00" x2="72.08" y2="-50.47" stroke="#2563c9" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="-55.70" y1="39.00" x2="-72.08" y2="50.47" stroke="#2563c9" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="55.70" y1="-39.00" x2="-55.70" y2="39.00" stroke="#2563c9" stroke-width="2"/><circle cx="55.70" cy="-39.00" r="3.5" fill="#1f2530"/><circle cx="-55.70" cy="39.00" r="3.5" fill="#1f2530"/><path d="M 24,0 A 24,24 0 0 0 19.66,-13.77" fill="none" stroke="#1f2530" stroke-width="1.3"/><path d="M -24,0 A 24,24 0 0 0 -19.66,13.77" fill="none" stroke="#1f2530" stroke-width="1.3"/><text x="36" y="-11" font-size="13" text-anchor="middle" fill="#1f2530"><tspan font-style="italic">v</tspan></text><text x="-38" y="18" font-size="12" text-anchor="end" fill="#1f2530"><tspan font-style="italic">v</tspan> + 180°</text></svg>
:::

If we turn the angle a further $180^\circ$ we end up at the diametrically
opposite point on the circle, but it is the **same line** through the origin, so
the slope ($\tan v$) is the same. So the period of
the tangent function is $180^\circ$.
:::
:::

::: exempel "Example 1: Solve a tangent equation"
**Solve the equation $\tan v = 2$ in the interval $0^\circ \leq v \leq 360^\circ$.**

::: handskrift
typ: tangensekvation3c
:::

::: textlosning
$$
v_1 = \tan^{-1}(2) = 63.434\ldots^\circ \approx 63.4^\circ
$$

We add one period of $180^\circ$ to get the second solution in
the interval.

$$
v_2 \approx 63.4^\circ + 180^\circ = 243.4^\circ
$$

**Answer:** $v_1 \approx 63.4^\circ$ and $v_2 \approx 243.4^\circ$
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Periods"
- $\sin$ and $\cos$ have the period $360^\circ$.
- $\tan$ has the period $180^\circ$.
- The period is how far you have to turn before the function value repeats.
:::

::: sampunkt "Why tangent has half the period"
- $\tan(v + 180^\circ) = \dfrac{-\sin v}{-\cos v} = \dfrac{\sin v}{\cos v} = \tan v$.
- Another way to see it: $\tan v = \dfrac{y}{x}$ is the **slope** of the line through the origin and the point.
- Half a turn gives the diametrically opposite point on the **same line**, so the same slope.
:::

::: sampunkt "Solving a tangent equation"
1. Solve for $\tan v$.
2. Use $\tan^{-1}$ to get the first solution $v_1$.
3. Add one period: $v_2 = v_1 + 180^\circ$.
:::

::: sampunkt "Typical example"
- $\tan v = 2$ gives $v_1 = \tan^{-1}(2) \approx 63.4^\circ$.
- $v_2 \approx 63.4^\circ + 180^\circ = 243.4^\circ$.
- Note the difference from sine and cosine, where the second solution is obtained from $180^\circ - v_1$ and $360^\circ - v_1$ respectively.
:::

:::
