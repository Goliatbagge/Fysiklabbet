---
kalla: 7422553ea0
id: ma3c-3.S
title: Summary
course: Matematik fortsättning nivå 1c
chapter: Deriveringsregler
chapterNumber: 3
section: '3.S'
---

# Summary: Rules of differentiation

This chapter was about finding shortcuts for differentiating, instead
of using the definition of the derivative every time. You have seen how
power functions, polynomials and functions with roots or denominators are differentiated
with simple rules that hold for all real exponents, and how
exponential functions with base $e$ and other bases are differentiated. The chapter
ended with applications: interpreting the sign and unit of the derivative, determining an
unknown constant in a model, calculating the equation of the tangent and solving this
type of task with digital tools such as GeoGebra.

## Concepts to know

- **rule of differentiation**: a shortcut for calculating a derivative without
  using the definition of the derivative every time.
- **the power rule**: $f(x) = x^n \Rightarrow f'(x) = nx^{n-1}$: multiply
  the exponent down and reduce it by 1. Holds for all real exponents
  *n*, not just positive integers.
- **polynomial function**: a function with several terms; differentiated term by term.
- **constant function**: a function without an $x$ term; always has the derivative 0
  since the graph is a horizontal line.
- **exponential function**: a function where the variable is in the exponent,
  for example $f(x) = a^x$.
- **the number e (Euler's number)**: the irrational number $e \approx 2.72$ for
  which $f(x) = e^x$ is its own derivative.
- **the natural logarithm (ln)**: the logarithm with base *e*; $\ln x$ is the
  number *e* must be raised to in order to give *x*.
- **growth rate**: how fast a quantity changes at a particular
  instant; given by the value of the derivative there.
- **tangent**: a straight line that touches a curve at a point and has the same
  slope as the curve at that point.
- **gradient (*k*-value)**: the slope of the tangent; given by
  the value of the derivative at the point of tangency, $k = f'(a)$.

## Formulas

::: formel "The chapter's formulas"
**The power rule**

$$
f(x) = x^n \quad\Rightarrow\quad f'(x) = nx^{n-1}
$$

Holds for all real exponents *n*, not just positive integers (provided
$x > 0$).

**Coefficient, constant and constant denominator**

$$
f(x) = kx^n \quad\Rightarrow\quad f'(x) = nkx^{n-1}
$$

$$
f(x) = a \quad\Rightarrow\quad f'(x) = 0
\qquad\qquad
f(x) = \frac{g(x)}{a} \quad\Rightarrow\quad f'(x) = \frac{g'(x)}{a}
$$

where

- *k* = coefficient in front of the power
- *a* = a constant (a number without $x$)
- $g(x)$ = a differentiable function in the numerator

**The derivative of eˣ**

$$
f(x) = e^x \quad\Rightarrow\quad f'(x) = e^x
\qquad\qquad
f(x) = ae^x \quad\Rightarrow\quad f'(x) = ae^x
$$

where *a* is a coefficient in front of the function; it is kept unchanged when
differentiating.

**The derivative of eᵏˣ and aˣ**

$$
f(x) = e^{kx} \quad\Rightarrow\quad f'(x) = k \cdot e^{kx}
$$

$$
f(x) = a^x \quad\Rightarrow\quad f'(x) = a^x \cdot \ln a
$$

where

- *k* = the coefficient in the exponent
- $\ln a$ = the natural logarithm of the base *a*

**The equation of the tangent**

$$
y = kx + m, \qquad k = f'(a)
$$

where

- *k* = the gradient of the tangent (the value of the derivative at
  the point of tangency)
- *m* = determined by substituting the coordinates of the point of tangency
  $(a, f(a))$ into the equation of the straight line
:::

## Important relationships and methods

- A power function is differentiated by multiplying the exponent down and
  reducing the exponent by 1. The rule holds for all real exponents, not
  just positive integers.
- A polynomial is differentiated term by term; coefficients are kept, and
  constant terms drop out since the derivative of a constant is always 0.
- Variables under a root sign or in a denominator must first be rewritten
  as a power (for example $\sqrt{x} = x^{1/2}$, $\dfrac{1}{x} = x^{-1}$) before
  the power rule can be used.
- If the expression has the variable in both the numerator and the denominator: split the fraction into
  several terms and differentiate each one separately, instead of differentiating
  the whole fraction at once.
- $f(x) = e^x$ is its own derivative. Graphically this means that
  the function value at every point is the same as the slope of the curve there.
- Cheat sheet for exponential functions: copy the function unchanged,
  multiply by the coefficient in the exponent (if there is one), and
  also multiply by $\ln a$ if the base is not *e*.
- A base *a* can always be rewritten as base *e* with $a = e^{\ln a}$.
  That is how the rule of differentiation for $a^x$ is derived from the rule for $e^{kx}$.
- The sign of the derivative decides whether a quantity is increasing or decreasing: a positive
  derivative means an increase, a negative derivative means a decrease.
- The unit of a derivative is "the unit of the function" per "the unit of
  the variable", for example inhabitants/year or °C/minute.
- If a constant in a model is unknown, it can be determined by substituting
  a known function value or derivative value and solving for the constant, often
  using $\ln$, since $\ln e = 1$.
- The *k*-value of the tangent is given by the derivative at the point of tangency; the *m*-value
  is then determined by substituting the coordinates of the point of tangency into the equation of
  the straight line.
- With digital tools (for example GeoGebra), derivatives, function values
  and equations (NSolve/Solve) can be determined directly without calculating by hand,
  which is useful, for example, for finding stationary points of the derivative.

## Figures worth remembering

The tangent to a curve at a point has the same slope as the curve there, given
by the value of the derivative at the point of tangency:

::: figur
<svg viewBox="4 -4 214 266" width="313" height="389" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Poppins, system-ui, sans-serif" aria-label="The graph of y equals x squared plus 4x minus 7 with the tangent at the point 3, 14. The equation of the tangent is y equals 10x minus 16."><line x1="14" y1="180" x2="186" y2="180" stroke="#1f2530" stroke-width="1.6"/><polygon points="194,180 184,175.5 184,184.5" fill="#1f2530"/><line x1="100" y1="254" x2="100" y2="12" stroke="#1f2530" stroke-width="1.6"/><polygon points="100,4 95.5,14 104.5,14" fill="#1f2530"/><text x="192" y="198" font-size="13" text-anchor="end" fill="#1f2530"><tspan font-style="italic">x</tspan></text><text x="109" y="14" font-size="13" text-anchor="start" fill="#1f2530"><tspan font-style="italic">y</tspan></text><path d="M 28,222 Q 100,318 172,30" fill="none" stroke="#2563c9" stroke-width="2"/><line x1="114.4" y1="228" x2="172" y2="36" stroke="#4a7d3a" stroke-width="2"/><line x1="154" y1="180" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><line x1="100" y1="96" x2="154" y2="96" stroke="#1f2530" stroke-width="1.4"/><circle cx="154" cy="96" r="3.5" fill="#c8324a"/><text x="163" y="99" font-size="12" text-anchor="start" fill="#c8324a">(3, 14)</text><text x="208" y="16" font-size="12" text-anchor="end" fill="#4a7d3a"><tspan font-style="italic">y</tspan> = 10<tspan font-style="italic">x</tspan> − 16</text></svg>
:::

## Before the test

- Can you differentiate a power function $f(x) = x^n$ for arbitrary real
  exponents, including fractional and negative exponents?
- Can you rewrite expressions with the variable under a root sign or in a
  denominator in power form before you differentiate?
- Can you differentiate a polynomial term by term, and do you know why
  constant terms disappear when differentiating?
- Do you know why $f(x) = e^x$ is its own derivative, and can you explain what
  the number *e* is?
- Can you differentiate $f(x) = e^{kx}$ and $f(x) = a^x$, and do you know
  the cheat sheet for differentiating exponential functions?
- Do you know what the natural logarithm $\ln$ is, and how to rewrite a
  base *a* as base *e*?
- Can you determine an unknown constant in a model by substituting a
  known function value or derivative value?
- Can you interpret the sign and unit of the derivative in an application, for example a
  growth rate?
- Can you determine the equation of the tangent to a curve at a given point?
- Can you use digital tools such as GeoGebra to differentiate,
  calculate function values and solve equations numerically or exactly?
