---
kalla: c6d13cca12
id: ma3c-1.S
title: Summary
course: Matematik fortsättning nivå 1c
chapter: Rationella uttryck och gränsvärden
chapterNumber: 1
section: '1.S'
---

# Summary: Rational expressions and limits

This chapter began with polynomials: their degree and value, how they
are multiplied and factorised, and how polynomial equations are solved. Then
it was about rational expressions, fractions where the numerator and denominator are
polynomials, and about limits. You have practised simplifying,
expanding, adding, subtracting, multiplying and dividing rational expressions
by factorising, among other things with a new method: factorisation using
the zeros of the polynomial. You have also solved equations that contain
rational expressions, and learnt to determine limits both when a variable
tends to a number and when it tends to infinity. At the end of the chapter
a computer algebra tool (GeoGebra) was used to solve the same types of
problems.

## Concepts to know

- **polynomial**: a sum of terms $a \cdot x^n$, where $n$ is an integer
  that is zero or positive, for example $5x^3 - 2x^2 + x - 7$.
- **degree**: the highest exponent in a polynomial.
- **coefficient**: the number in front of an $x$ term. **Constant term**: the term
  without $x$.
- **factorise**: write an expression as a product.
- **polynomial equation**: an equation with a polynomial on one side and zero on
  the other. An equation of degree $n$ has at most $n$ real solutions.
- **polynomial function**: a function $y = p(x)$ where $p(x)$ is a polynomial.
  The graph is continuous, a curve without jumps or holes.
- **the factor theorem**: if $p(a) = 0$ then $(x - a)$ is a factor of the polynomial
  $p(x)$.
- **rational expression**: an expression with a polynomial in the numerator and a
  polynomial in the denominator, for example $\dfrac{5x^2 - 5x}{3x - 3}$.
- **expand**: multiply both the numerator and the denominator by the same number or
  expression; does not change the value of the expression.
- **simplify**: divide both the numerator and the denominator by a common factor;
  does not change the value of the expression.
- **zero**: the $x$-value that makes an expression equal to zero;
  used to factorise polynomials that cannot be factorised by
  taking out a common factor or with the square rules or the difference of two squares.
- **lowest common denominator (LCD)**: the smallest common denominator that
  all the terms in an expression or an equation can be given.
- **common denominator**: when several rational expressions have been expanded to the same
  denominator, so that the numerators can be added or subtracted over a
  common fraction bar.
- **cross-multiplication**: a shortcut for solving an equation of the form
  $\dfrac{a}{b} = \dfrac{c}{d}$: gives $a \cdot d = c \cdot b$ directly.
- **domain**: the $x$-values for which an equation or an expression is
  defined; values that make a denominator equal to zero must always be
  excluded.
- **limit ($\lim$)**: the value an expression approaches, without
  necessarily reaching it, when the variable approaches a number or
  infinity.
- **infinity ($\infty$)**: notation for a variable growing without
  bound ($x \to \infty$) or decreasing without bound ($x \to -\infty$).
- **no limit**: when the expression tends to different values from below and
  from above, there is no common limit.
- **computer algebra tool**: a calculator or software (for example
  GeoGebra) that can handle not only numbers but also algebraic
  expressions with letters.

## Formulas

::: formel "The chapter's formulas and rules"
**Multiplying polynomials**

$
(a + b)(c + d + e) = ac + ad + ae + bc + bd + be
$

Each term is multiplied by each term. The degree of the product is the sum of
the degrees.

**The equation $x^n = a$**

- $n$ odd: $x = \sqrt[n]{a}$
- $n$ even and $a > 0$: $x = \pm \sqrt[n]{a}$
- $n$ even and $a < 0$: no real solution

**Factorising using zeros**

$$
p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)
$$

where

- $p(x)$ = a polynomial of degree $n$ with the zeros $x_1, x_2, \ldots, x_n$
- $k$ = the coefficient of the term with the highest degree (exponent)

**Multiplying rational expressions**

$$
\frac{a}{b} \cdot \frac{c}{d} = \frac{a \cdot c}{b \cdot d}
$$

Numerator is multiplied by numerator and denominator by denominator. It helps to factorise
before you multiply: that makes it easier to see what can be cancelled
later.

**Dividing rational expressions**

$$
\frac{a}{b} \Big/ \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c}
$$

The division sign is replaced by multiplication at the same time as the expression in
the denominator is inverted (the numerator and denominator swap places).

**Cross-multiplication**

$$
\frac{a}{b} = \frac{c}{d} \quad \Longrightarrow \quad a \cdot d = c \cdot b
$$

**Limit**

$$
\lim_{x \to a} f(x) = L
$$

is read "the limit of $f(x)$ as $x$ tends to $a$ is $L$".

**Rules for limits at infinity**

- Infinity only in the numerator → the limit is infinite.
- Infinity only in the denominator → the limit is 0.
- Infinity in both the numerator and the denominator → cross out the constant terms, simplify
  the expression and then determine the limit of what remains.
:::

## Important relationships and methods

- The value of a polynomial: substitute the value in brackets everywhere
  $x$ appears. $p(0)$ is always the constant term.
- If a polynomial equation has no constant term: take out $x$ and use
  the zero product method. Do not forget the solution $x = 0$.
- If a quartic equation contains only $x^4$, $x^2$ and a constant: introduce
  $t = x^2$, solve the quadratic equation in $t$ and go back with $x^2 = t$.
- The factor $(x - a)$ in a polynomial gives the zero $x = a$, and vice versa.
  The zeros can be seen where the graph crosses the $x$-axis.
- Factorise in this order: 1) take out a common factor,
  2) the square rules or the difference of two squares in reverse, 3) determine
  the zeros and write $p(x) = k(x - x_1)(x - x_2)\ldots(x - x_n)$.
  If method 1 does not work, move on to method 2, and so on.
- Addition and subtraction require the same denominator. If the terms have different
  denominators, you expand each term by the denominator of the other term (or by
  the LCD) before the numerators are added or subtracted.
- With an equation with rational expressions: first check which
  $x$-values make any denominator equal to zero. These are never
  allowed as solutions. Then solve by multiplying both sides by
  the LCD, or by writing with a common denominator and setting the numerators equal.
- An equation of the form $\dfrac{a}{b} = \dfrac{c}{d}$ can be solved more quickly with
  cross-multiplication: it gives the same equation as multiplying by
  the LCD, but in one step.
- When dividing rational expressions: replace the division sign with
  multiplication and invert the expression in the denominator before you simplify.
- Always check against excluded $x$-values at the end: a solution that
  happens to equal an excluded value must be rejected.
- Determine a limit as $x$ tends to a number in this order:
  1) substitute the value directly, 2) factorise and simplify the expression and then
  substitute the value, 3) make two tables and approach the value from below and
  from above. If method 1 gives something like $\dfrac{0}{0}$, the expression is not
  defined there, and you must move on to method 2.
- If the tables in method 3 tend to different values from below and from above (or
  to $-\infty$ in one direction and $+\infty$ in the other), there is no limit.
- If both the numerator and the denominator tend to infinity: cross out
  the constant terms (they vanish in comparison with infinity), simplify
  what remains, and calculate the limit of the simplified expression.
- A computer algebra tool such as GeoGebra can simplify, factorise,
  solve equations (exactly or numerically) and calculate limits directly,
  but it is a good idea to understand the method by hand before you use such a tool,
  so that you can interpret and check the answer.

## Before the test

- Can you decide whether an expression is a polynomial and state its degree?
- Can you calculate the value of a polynomial, even for negative $x$?
- Can you multiply polynomials and know what degree the product gets?
- Can you solve equations such as $x^3 = 64$ and $x^4 = 81$, and do you know when there
  are two solutions?
- Can you solve a polynomial equation by taking out $x$ or changing
  the variable?
- Can you write a polynomial with given zeros in factorised form?
- Can you explain the difference between a polynomial and a rational expression?
- Do you know the three methods for factorising an expression (taking out a common factor,
  the square rules or the difference of two squares, zeros) and do you know in which order you
  should try them?
- Can you simplify and expand rational expressions without changing their
  value?
- Can you add and subtract rational expressions with different denominators by
  giving them a common denominator?
- Can you solve an equation with rational expressions by multiplying by
  the LCD, and do you know why some solutions must be rejected?
- Can you multiply and divide rational expressions, and do you remember that
  division means inverting and multiplying?
- Do you know how to solve an equation of the form $\dfrac{a}{b} = \dfrac{c}{d}$
  with cross-multiplication?
- Can you determine a limit by substituting the value directly, and do you know
  when that method does not work?
- Can you determine a limit by factorising and simplifying
  the expression, for example with the difference of two squares?
- Do you know how to use tables to decide whether there is no limit?
- Can you determine limits as $x$ tends to infinity, and do you know
  the difference between infinity in the numerator, in the denominator and in both?
- Can you use a computer algebra tool to simplify,
  factorise, solve equations and determine limits?
