---
kalla: e458688cdb
id: ma2b-2.S
title: Summary
course: Matematik nivå 2b
chapter: Algebra och andragradsekvationer
chapterNumber: 2
section: '2.S'
---

<!-- OBS: egen 2b-version, baserad på ma2c-2.S.md men UTAN rotekvationer
     (avsnittet ma2c-2.8 ingår inte i nivå 2b). Ändras kapitlets
     GEMENSAMMA innehåll i 2c-sammanfattningen: gör samma ändring här
     (bara sammanfattningarna för kapitel 2 och 5 är egna filer — allt
     annat delas via MA2B_ALIAS i data/katalog.js). -->

# Summary: Algebra and quadratic equations

This chapter was about how to expand and factorise algebraic expressions,
and how to solve all types of quadratic equations, from simple equations
with only $x^2$- and $x$-terms to complete equations with a constant
term. After the chapter you should be able to choose the right method of solution
based on what the equation looks like, determine the number of solutions
without solving the equation completely, and use all of this in problem
solving.

## Concepts to know

- **the square rules**: shortcuts for expanding $(a + b)^2$ and
  $(a - b)^2$ without multiplying out bracket by bracket.
- **the difference of two squares**: a shortcut for expanding a "square minus
  square" expression: $(a + b)(a - b) = a^2 - b^2$.
- **factorise**: rewrite an expression as a multiplication, for example
  by taking out a common factor or using a
  square rule or the difference of two squares backwards.
- **rational expression**: a fractional expression that contains $x$; it is simplified
  by factorising the numerator and denominator and cancelling common
  factors.
- **the zero product method**: a method of solving equations where a product is
  equal to 0: at least one of the factors must then be 0.
- **root**: another name for a solution to an equation.
- **the *pq* formula**: a formula that gives the solutions to a complete
  quadratic equation of the form $x^2 + px + q = 0$.
- **the *abc* formula**: a formula that gives the solutions to a complete
  quadratic equation of the form $ax^2 + bx + c = 0$, without having to
  divide away the coefficient in front of $x^2$ first.
- **discriminant**: the expression under the square root sign in the *pq* formula or
  the *abc* formula; its sign determines how many solutions the equation has.

## Formulas

::: formel "The formulas of the chapter"
**The square rules**

$$
(a + b)^2 = a^2 + 2ab + b^2
$$

$$
(a - b)^2 = a^2 - 2ab + b^2
$$

**The difference of two squares**

$$
(a + b)(a - b) = a^2 - b^2
$$

**The zero product method**

$$
A \cdot B = 0 \iff A = 0 \quad \text{or} \quad B = 0
$$

**The *pq* formula**

$$
x^2 + px + q = 0
$$

has the solutions

$$
x = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}
$$

where *p* is the coefficient in front of the $x$-term and *q* is the constant term.

**The *abc* formula**

$$
ax^2 + bx + c = 0
$$

has the solutions

$$
x = -\frac{b}{2a} \pm \frac{\sqrt{b^2 - 4ac}}{2a}
$$

where *a*, *b* and *c* are the coefficients and the constant term of
the equation ($a \neq 0$).

**Discriminant** (the expression under the square root sign in the *pq* formula)

$$
\left(\frac{p}{2}\right)^2 - q
$$

| If the discriminant is … | … the equation has … |
| --- | --- |
| positive | two solutions |
| zero | one solution |
| negative | no solutions |
:::

## Important relationships and methods

- Choose the method based on the terms the equation contains: only $x^2$- and
  $x$-terms (no constant term) → the zero product method; a complete
  equation with a constant term → the *pq* formula or the *abc* formula.
- When factorising: always take out a common factor **first**, if
  possible, before you try a square rule or the difference of two squares backwards.
- "Square minus square" (two terms) → the difference of two squares. Three terms where
  the first and last are squares → a square rule; always check
  that the middle term matches the double product, and read off the sign
  (plus ⟹ the first rule, minus ⟹ the second rule).
- The zero product method requires the right-hand side to be 0 **and** the left-hand
  side to be factorised. Move all the terms over before you factorise.
- The *pq* formula requires the coefficient in front of the $x^2$-term to be 1; if it
  is not, divide the whole equation by the coefficient first (or
  use the *abc* formula, which works directly whatever the coefficient).
- The sign of the discriminant determines the number of solutions without you having
  to finish the calculation: positive gives two solutions, zero gives one (a so-called
  double root) and negative gives no solutions (the square root of a negative
  number has no real meaning).
- An equation with given roots $x_1$ and $x_2$ can be constructed with
  the zero product method backwards: $(x - x_1)(x - x_2) = 0$.
- In problem solving: interpret the problem and introduce variables (draw a figure if
  needed), set up one or more equations, solve them, and then interpret
  the answer. Reject solutions that are not reasonable (for example negative
  lengths or negative numbers of things).
- Simplify a rational expression by factorising the numerator and
  denominator completely and then cancelling the factors that appear in both.

## Before the test

- Do you know the square rules and the difference of two squares by heart, and do you
  recognise when an expression should be expanded or factorised with them?
- Can you take out a common factor from an expression before you try
  a square rule or the difference of two squares backwards?
- Can you simplify a rational expression by factorising the numerator
  and denominator?
- Do you know when the zero product method can be used, and can you solve an
  equation with it (including moving terms over so that the right-hand side
  becomes 0 first)?
- Do you know the *pq* formula by heart, and do you know what is required for it to
  be used (the coefficient in front of $x^2$ must be 1)?
- Do you know the *abc* formula, and do you know what distinguishes it from the *pq* formula?
- Can you determine how many solutions a quadratic equation has by
  looking at the sign of the discriminant, without solving the equation completely?
- Can you construct an equation that has given roots?
- Can you solve a problem-solving task that leads to a
  quadratic equation, and decide which of the solutions is reasonable?
