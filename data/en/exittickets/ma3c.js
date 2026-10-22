/* Engelsk översättning av exittickets (ma3c). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "ma3c-1.1": {
  "kalla": "4e7c016b93",
  "data": [
   {
    "question": "What is the degree of the polynomial $3x^2 - x^4 + 7$?",
    "choices": [
     "2",
     "3",
     "4",
     "7"
    ],
    "correct": 2,
    "why": [
     "The exponent 2 belongs to the first term, but it is not the highest. The order of the terms does not matter.",
     "The number 3 is a coefficient, not an exponent.",
     "The degree is the highest exponent, and the term $-x^4$ has the exponent 4.",
     "The number 7 is the constant term. It does not affect the degree."
    ]
   },
   {
    "question": "Which of the expressions is a polynomial?",
    "choices": [
     "$5x^3 - x + 2$",
     "$\\dfrac{2}{x} + 1$",
     "$\\sqrt{x} - 4$",
     "$2^x + 3$"
    ],
    "correct": 0,
    "why": [
     "All the exponents (3, 1 and 0) are integers that are zero or positive, so the expression is a polynomial of degree 3.",
     "$\\dfrac{2}{x} = 2x^{-1}$ has a negative exponent, and then it is not a polynomial.",
     "$\\sqrt{x} = x^{\\frac{1}{2}}$ has an exponent that is not an integer.",
     "Here $x$ is in the exponent. A polynomial has numbers as exponents, not variables."
    ]
   },
   {
    "question": "The polynomial $p(x) = x^2 - 3x + 5$ is given. What is $p(0)$?",
    "choices": [
     "0",
     "$-3$",
     "2",
     "5"
    ],
    "correct": 3,
    "why": [
     "Only the terms containing $x$ become zero when $x = 0$. The constant term remains.",
     "The coefficient $-3$ is multiplied by $x = 0$ and disappears.",
     "The value 2 is the sum of the coefficients and the constant term ($1 - 3 + 5$), that is $p(1)$.",
     "With $x = 0$ we get $0^2 - 3 \\cdot 0 + 5 = 5$. The value for $x = 0$ is always the constant term."
    ]
   },
   {
    "question": "A polynomial of degree 2 is multiplied by a polynomial of degree 3. What degree does the product have?",
    "choices": [
     "6",
     "5",
     "3",
     "1"
    ],
    "correct": 1,
    "why": [
     "The degrees are not multiplied. Exponents are added when powers with the same base are multiplied: $x^2 \\cdot x^3 = x^5$.",
     "The highest term of the product is the product of the highest terms, and $x^2 \\cdot x^3 = x^{2 + 3} = x^5$.",
     "The product has a higher degree than both polynomials, because the exponents are added.",
     "That is the difference between the degrees. In multiplication they are added."
    ]
   },
   {
    "question": "What is $x^3 - 4x$ factorised as far as possible?",
    "choices": [
     "$x(x^2 - 4)$",
     "$x(x - 2)^2$",
     "$x(x + 2)(x - 2)$",
     "$(x^2 + 2)(x - 2)$"
    ],
    "correct": 2,
    "why": [
     "Taking out the common factor is correct, but the bracket $x^2 - 4$ can be factorised further with the difference of two squares.",
     "$(x - 2)^2 = x^2 - 4x + 4$, not $x^2 - 4$.",
     "First $x$ is taken out, then the difference of two squares gives $x^2 - 4 = (x + 2)(x - 2)$.",
     "Expanding the expression gives $x^3 - 2x^2 + 2x - 4$, which is a different polynomial."
    ]
   }
  ]
 },
 "ma3c-1.2": {
  "kalla": "81bccc5376",
  "data": [
   {
    "question": "At most, how many real solutions can a cubic equation have?",
    "choices": [
     "2",
     "3",
     "4",
     "Any number"
    ],
    "correct": 1,
    "why": [
     "Two solutions is the maximum for a quadratic equation.",
     "A polynomial equation of degree $n$ has at most $n$ real solutions, so at most 3 here.",
     "Only an equation of degree 4 or higher can have four solutions.",
     "The number of solutions is limited by the degree. The graph of a cubic function can cross the $x$-axis at most three times."
    ]
   },
   {
    "question": "What are the solutions to the equation $x^4 = 81$?",
    "choices": [
     "$x = 3$",
     "$x = \\pm 9$",
     "$x = \\pm 3$",
     "The equation has no real solution"
    ],
    "correct": 2,
    "why": [
     "The exponent is even, so $-3$ is also a solution: $(-3)^4 = 81$.",
     "$9^4 = 6\\,561$. The number 9 is the square root of 81, but here the fourth root is needed.",
     "Both $3^4 = 81$ and $(-3)^4 = 81$, so $x = \\pm \\sqrt[4]{81} = \\pm 3$.",
     "The right-hand side is positive, and then the equation has two solutions."
    ]
   },
   {
    "question": "Why does the equation $x^4 = -16$ have no real solution?",
    "choices": [
     "A number raised to the power 4 can never be negative",
     "The fourth root of 16 is not an integer",
     "A quartic equation always has four solutions",
     "You are not allowed to take the root of both sides"
    ],
    "correct": 0,
    "why": [
     "With an even exponent, both positive and negative numbers become positive, or zero. No real number raised to the power 4 gives $-16$.",
     "The fourth root of 16 is 2, an integer. The problem is the minus sign.",
     "A quartic equation has **at most** four solutions. It can have fewer, or none at all.",
     "Taking the root of both sides is exactly the method for equations of the form $x^n = a$."
    ]
   },
   {
    "question": "The polynomial $p(x)$ has the zero $x = 4$. Which factor is then in $p(x)$?",
    "choices": [
     "$(x + 4)$",
     "$4x$",
     "$(4 + x^2)$",
     "$(x - 4)$"
    ],
    "correct": 3,
    "why": [
     "The factor $(x + 4)$ becomes zero when $x = -4$, so it gives the zero $-4$.",
     "The factor $4x$ becomes zero when $x = 0$.",
     "$4 + x^2$ is always positive and never becomes zero.",
     "The factor $(x - 4)$ becomes zero exactly when $x = 4$. Every zero $a$ gives a factor $(x - a)$."
    ]
   },
   {
    "question": "What is a suitable first step to solve $x^4 - 13x^2 + 36 = 0$?",
    "choices": [
     "Take $x$ out of all the terms",
     "Introduce $t = x^2$ and solve a quadratic equation in $t$",
     "Take the fourth root of both sides",
     "Divide both sides by 13"
    ],
    "correct": 1,
    "why": [
     "The constant term 36 has no $x$, so $x$ cannot be taken out.",
     "With $t = x^2$ we get $x^4 = t^2$, and the equation becomes $t^2 - 13t + 36 = 0$. Then you go back using $x^2 = t$.",
     "That only works when the equation has the form $x^4 = a$, with a single power of $x$.",
     "The division does not make the equation easier. It is the powers $x^4$ and $x^2$ that need to be dealt with."
    ]
   }
  ]
 },
 "ma3c-1.3": {
  "kalla": "4e0f1d67d2",
  "data": [
   {
    "question": "What is a rational expression?",
    "choices": [
     "An expression with a polynomial in the numerator and a polynomial in the denominator",
     "An expression without variables",
     "An expression that only contains integers",
     "An equation with two unknowns"
    ],
    "correct": 0,
    "why": [
     "Exactly: a fraction where both the numerator and the denominator are polynomials, for example $\\dfrac{5x^2 - 5x}{3x - 3}$.",
     "On the contrary, variables are typical of rational expressions.",
     "Rational expressions almost always contain variables. The polynomials in the numerator and denominator are the central part.",
     "A rational expression is just that, an expression, not an equation: there is no equals sign."
    ]
   },
   {
    "question": "What happens to the value of an expression when you cancel or expand it?",
    "choices": [
     "The value always gets larger",
     "The value does not change",
     "The value doubles",
     "The value always gets smaller"
    ],
    "correct": 1,
    "why": [
     "Expanding changes how the expression is written, not its value.",
     "Cancelling and expanding mean dividing and multiplying, respectively, the numerator and the denominator by the same thing. The size of the expression is unchanged.",
     "Multiplying both the numerator and the denominator by the same number does not change the quotient.",
     "Cancelling only makes the expression simpler to write, not smaller in value."
    ]
   },
   {
    "question": "Which three methods do we have for factorising a polynomial?",
    "choices": [
     "The *pq* formula, the *abc* formula and limits",
     "Taking out a common factor, the square rules or the difference of two squares in reverse, and zeros",
     "Cancelling, expanding and simplifying",
     "Addition, subtraction and multiplication"
    ],
    "correct": 1,
    "why": [
     "The *pq* and *abc* formulas solve equations; they are used within the zeros method but are not the three methods themselves.",
     "Exactly these three, and the third one (zeros) works on any polynomial.",
     "That is what we do with rational expressions, not methods to factorise with.",
     "Those are arithmetic operations, not factorisation methods."
    ]
   },
   {
    "question": "A polynomial $p(x)$ has the zeros $x_1$ and $x_2$ and the coefficient $k$ in front of the term of highest degree. How can it be factorised?",
    "choices": [
     "$p(x) = k(x + x_1)(x + x_2)$",
     "$p(x) = k(x - x_1)(x - x_2)$",
     "$p(x) = (x - x_1) + (x - x_2)$",
     "$p(x) = k \\cdot x_1 \\cdot x_2$"
    ],
    "correct": 1,
    "why": [
     "The sign is wrong: a zero $x_1$ gives the factor $(x - x_1)$, so $x_1 = 3$ gives $(x - 3)$.",
     "Each zero $x_i$ gives a factor $(x - x_i)$, and $k$ is the coefficient in front of the term of highest degree.",
     "Factors are multiplied, not added.",
     "The factorisation consists of linear factors $(x - x_i)$, not of the product of the zeros."
    ]
   },
   {
    "question": "Why do we factorise the numerator and the denominator before cancelling a rational expression?",
    "choices": [
     "Only whole common factors may be cancelled, not individual terms",
     "To avoid having to calculate zeros",
     "To make the expression longer",
     "It is never needed: you can always cancel term by term"
    ],
    "correct": 0,
    "why": [
     "Cancelling requires a common factor in both the numerator and the denominator; factorising makes these visible. You may never cross out individual terms.",
     "Zeros are often exactly the method we need to be able to factorise.",
     "The aim of cancelling is to simplify, not to make longer.",
     "Cancelling term by term is a common mistake: $\\dfrac{x + 2}{x + 3}$ cannot be cancelled to $\\dfrac{2}{3}$."
    ]
   }
  ]
 },
 "ma3c-1.4": {
  "kalla": "cc5854d5b1",
  "data": [
   {
    "question": "What is required for you to be able to add or subtract two rational expressions directly (without giving them a common denominator)?",
    "choices": [
     "That the exponents in the numerators are equal",
     "That both expressions are positive",
     "That they have the same numerator",
     "That they have the same denominator"
    ],
    "correct": 3,
    "why": [
     "Exponents in the numerator do not decide whether the denominators are equal.",
     "The sign of the expressions does not matter for whether you can add them directly.",
     "The numerators may well be different. It is the denominators that must match.",
     "Exactly: with the same denominator, only the numerators are added or subtracted; the denominator stays the same."
    ]
   },
   {
    "question": "How do you give two rational expressions with different denominators a common denominator?",
    "choices": [
     "You add the denominators to a common sum",
     "You cross out the denominators and add only the numerators",
     "You expand each term by the denominator of the other term",
     "You set both denominators to 1"
    ],
    "correct": 2,
    "why": [
     "Denominators are not added together: you expand by them, you do not sum them.",
     "The denominator must be the same before the numerators can be combined. It cannot simply be crossed out.",
     "By expanding each term by the denominator of the other term (or by the LCD), both get the same denominator, without changing the values of the expressions.",
     "That would change the values of the expressions, which neither cancelling nor expanding may do."
    ]
   },
   {
    "question": "Why must you check which $x$-values make a denominator equal to zero before solving an equation with rational expressions?",
    "choices": [
     "To decide which method (LCD or a common denominator) is fastest",
     "These values make the equation undefined and may never be part of the answer",
     "It is only needed if the equation has no solution",
     "To be able to cancel the expression more neatly"
    ],
    "correct": 1,
    "why": [
     "The choice of method is up to you. The check of the denominator concerns the domain, not which method is fastest.",
     "A denominator equal to zero makes the expression undefined. Such $x$-values can never be valid solutions, even if they turn up in the calculation.",
     "The check is always needed, however many solutions the equation happens to have.",
     "The check is about which solutions are allowed, not about simplifying the expression."
    ]
   },
   {
    "question": "Which two methods can be used to solve an equation with rational expressions?",
    "choices": [
     "The square rules or the difference of two squares",
     "Cancelling or expanding fractions",
     "Multiplying by the lowest common denominator, or giving everything a common denominator",
     "The $pq$ formula or the zero product method"
    ],
    "correct": 2,
    "why": [
     "Those are methods for factorising polynomials, not for solving equations with rational expressions.",
     "Those are operations on rational expressions themselves, not methods for solving equations.",
     "Exactly these two methods solve equations with rational expressions: either you multiply away the denominators, or you give all the terms a common denominator.",
     "They may be needed as intermediate steps (for example for a quadratic equation that turns up during the solution), but they are not the main methods for rational equations."
    ]
   },
   {
    "question": "After the calculation, an equation with rational expressions gives the solutions $x = 0$ and $x = 3$, but the denominator in the original equation contains the factor $(x - 3)$. What is the conclusion?",
    "choices": [
     "Both solutions are valid because the calculation gave them",
     "$x = 0$ must be rejected because it is the smallest solution",
     "$x = 3$ must be rejected because the equation is not defined there; the only valid answer is $x = 0$",
     "The equation has no solution because one of the roots is invalid"
    ],
    "correct": 2,
    "why": [
     "Multiplying away denominators can introduce false roots. Every solution must be checked against the forbidden values.",
     "It is the domain, not the size of the solution, that decides whether it must be rejected.",
     "$x = 3$ makes the denominator $(x - 3)$ zero, so that value lies outside the domain and cannot be a solution, even though it solves the multiplied equation.",
     "The equation still has a valid solution ($x = 0$). Only the false root is rejected, not the whole equation."
    ]
   }
  ]
 },
 "ma3c-1.5": {
  "kalla": "73ad32b3ce",
  "data": [
   {
    "question": "How do you multiply two rational expressions $\\dfrac{a}{b}$ and $\\dfrac{c}{d}$?",
    "choices": [
     "$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{ac}{bd}$: numerator times numerator, denominator times denominator",
     "$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{ac}{b}$",
     "$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a}{b}\\cdot\\dfrac{d}{c}$",
     "$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a+c}{b+d}$"
    ],
    "correct": 0,
    "why": [
     "Exactly: the numerators are multiplied together and the denominators are multiplied together, just as when multiplying ordinary fractions.",
     "The denominator $d$ must also be in the result, otherwise the expression is not equivalent to the original one.",
     "That is the inversion used in division, not multiplication. Nothing should be inverted here.",
     "That is not the multiplication rule. Fractions are not combined by adding numerators and denominators in this way."
    ]
   },
   {
    "question": "How do you calculate $\\dfrac{a}{b} \\Big/ \\dfrac{c}{d}$?",
    "choices": [
     "By inverting both expressions: $\\dfrac{b}{a}\\cdot\\dfrac{d}{c}$",
     "By replacing the division sign with multiplication and inverting the expression in the denominator: $\\dfrac{a}{b}\\cdot\\dfrac{d}{c}$",
     "By multiplying numerators and denominators directly without inverting: $\\dfrac{ac}{bd}$",
     "By dividing the numerators and the denominators separately: $\\dfrac{a/c}{b/d}$"
    ],
    "correct": 1,
    "why": [
     "Only the expression in the denominator (the one you divide by) should be inverted. The first expression is left unchanged.",
     "Exactly: division by a rational expression becomes multiplication by its inverse, so you swap the numerator and the denominator of the expression in the denominator.",
     "That describes multiplication, not division. In division the second expression must be inverted before you multiply.",
     "It is not enough to divide numerator by numerator and denominator by denominator separately. You must invert the expression in the denominator and multiply."
    ]
   },
   {
    "question": "Why do we factorise the numerator and the denominator before cancelling a product or quotient of rational expressions?",
    "choices": [
     "To make the expression look more complicated",
     "Factorising is required by a rule, not for mathematical reasons",
     "You can always cancel term by term without factorising",
     "Only whole common factors may be cancelled, not individual terms"
    ],
    "correct": 3,
    "why": [
     "On the contrary, the aim is to simplify the expression, not to make it more complicated.",
     "It is about which operations are mathematically valid, not about some arbitrary rule.",
     "Cancelling term by term is a common mistake: for example, $\\dfrac{x+2}{x+5}$ cannot be cancelled to $\\dfrac{2}{5}$.",
     "Exactly: a common factor must be visible in both the numerator and the denominator to be crossed out, and factorising makes these factors visible."
    ]
   },
   {
    "question": "For the equation $\\dfrac{x-2}{x-3} = \\dfrac{x+7}{x}$ you must note that $x \\neq 3$ and $x \\neq 0$. Why?",
    "choices": [
     "Because $x$ must always be a positive integer",
     "Because otherwise the numerator becomes zero",
     "It is only a recommendation, not a requirement",
     "Because no denominator in a rational equation may be zero"
    ],
    "correct": 3,
    "why": [
     "Rational expressions can take any real values of $x$ (except those that make the denominator zero). There is no requirement for positive integers.",
     "It is the denominators, not the numerators, that decide which values must be excluded.",
     "It is an absolute requirement: a value that makes a denominator zero gives an undefined expression and can never be a valid solution.",
     "Exactly: division by zero is not defined, so every value that makes a denominator equal to zero must be excluded from the solution set."
    ]
   },
   {
    "question": "What is the first step in simplifying $\\dfrac{x^2-4}{5}\\cdot\\dfrac{10}{x+2}$?",
    "choices": [
     "Cancel $x^2$ against $x$ in the denominator directly",
     "Add the numerators: $x^2-4+10$",
     "Invert the second expression because it is a division",
     "Factorise $x^2-4$ with the difference of two squares: $(x-2)(x+2)$"
    ],
    "correct": 3,
    "why": [
     "You may only cancel whole factors, not individual terms in a polynomial such as $x^2-4$.",
     "It is a multiplication, not an addition: the numerators should be multiplied, not added.",
     "The expression is a multiplication, not a division, so no inversion is needed here.",
     "Exactly: by factorising $x^2-4$ with the difference of two squares, the factor $(x+2)$ becomes visible and can then be cancelled against the denominator of the second expression."
    ]
   }
  ]
 },
 "ma3c-1.6": {
  "kalla": "7bb0faad85",
  "data": [
   {
    "question": "What is a limit?",
    "choices": [
     "The value at which an expression is always undefined",
     "The largest value an expression can take",
     "The difference between two expressions",
     "The value an expression approaches when the variable tends to a certain value or to infinity"
    ],
    "correct": 3,
    "why": [
     "Many limits are found precisely for expressions that ARE undefined at a point (for example $\\dfrac{0}{0}$), but the limit often exists anyway.",
     "A limit is about what an expression approaches, not about a maximum value.",
     "A limit describes the behaviour of a single expression, not a comparison between two expressions.",
     "Exactly: the limit is the value the expression approaches, for example $\\lim_{x \\to \\infty} \\dfrac{1}{x} = 0$, even though the expression never gets there."
    ]
   },
   {
    "question": "How do you find $\\lim_{x \\to a} f(x)$ if $f$ is defined at $x = a$?",
    "choices": [
     "You substitute $x = a$ directly into the expression and calculate",
     "You must always factorise the expression first",
     "You must always make a table of values from below and from above",
     "The limit can then never be found"
    ],
    "correct": 0,
    "why": [
     "That is method 1, the simplest and most efficient method, which works as soon as the expression is defined at $x = a$.",
     "Factorising (method 2) is only needed when direct substitution gives an undefined form such as $\\dfrac{0}{0}$.",
     "Tables (method 3) are the last resort, when neither method 1 nor method 2 works.",
     "If the expression is defined at $x = a$, the limit can always be found by direct substitution."
    ]
   },
   {
    "question": "Direct substitution in $\\displaystyle\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$ gives the form $\\dfrac{0}{0}$. What should you do?",
    "choices": [
     "Set the limit to infinity",
     "Set the limit to 0 directly",
     "Replace the denominator with 1",
     "Factorise the numerator and the denominator and cancel the common factor"
    ],
    "correct": 3,
    "why": [
     "The form $\\dfrac{0}{0}$ is not the same thing as infinity in the numerator or denominator.",
     "The form $\\dfrac{0}{0}$ says nothing about the actual value of the limit. It must be found by cancelling (or with tables).",
     "The denominator may not be replaced arbitrarily. You only cancel common factors that are actually in the expression.",
     "Factorising the numerator (here with the difference of two squares into $(x+1)(x-1)$) and cancelling $(x-1)$ makes the expression defined at $x=1$, so you can substitute the value."
    ]
   },
   {
    "question": "What is $\\displaystyle\\lim_{x \\to \\infty} \\frac{7}{x}$?",
    "choices": [
     "Infinity",
     "$7$",
     "$0$",
     "There is no limit"
    ],
    "correct": 2,
    "why": [
     "Infinity as a limit occurs when the numerator alone tends to infinity, not the denominator.",
     "7 is just the constant in the numerator. It does not affect where the quotient goes when the denominator grows without bound.",
     "Infinity in the denominator alone makes the denominator infinitely much larger than the numerator, so the quotient tends to 0.",
     "The limit exists here and is well defined: 0."
    ]
   },
   {
    "question": "The limit of an expression is $-\\infty$ when $x$ approaches a number from below, but $+\\infty$ when $x$ approaches the same number from above. What applies?",
    "choices": [
     "The limit is the mean of the two, that is 0",
     "You use the larger of the two values as the limit",
     "There is no limit",
     "The limit is always 0"
    ],
    "correct": 2,
    "why": [
     "Limits are not calculated as means of one-sided limits. Unless both exist and are equal, there is no limit at all.",
     "You do not choose one one-sided limit over the other. If they differ, there is no limit.",
     "For a limit to exist, the expression must tend to the same value from below and from above. Here the values differ, so there is no limit.",
     "Nothing in the task gives 0 as the answer. The conclusion from different one-sided limits is that there is no limit."
    ]
   }
  ]
 },
 "ma3c-1.7": {
  "kalla": "f2e57a8aee",
  "data": [
   {
    "question": "What characterises a computer algebra tool?",
    "choices": [
     "It can handle algebraic expressions (expressions with letters), not just numerical calculations",
     "It can only carry out numerical calculations, just like an ordinary calculator",
     "It is another name for an ordinary pocket calculator",
     "It can only draw graphs, not calculate anything"
    ],
    "correct": 0,
    "why": [
     "Exactly: in addition to numerical calculations (calculations with numbers), a computer algebra tool can work with algebraic expressions, for example factorise and solve equations symbolically. GeoGebra is an example.",
     "On the contrary: it is precisely the ability to handle algebraic expressions as well as numbers that distinguishes a computer algebra tool from an ordinary calculator.",
     "An ordinary pocket calculator can only do numerical calculations. It cannot handle expressions containing letters.",
     "Drawing graphs is only one of several functions in GeoGebra. The symbolic handling (simplify, factorise, solve, limits) is the distinguishing feature."
    ]
   },
   {
    "question": "Which command is used in GeoGebra to factorise a polynomial?",
    "choices": [
     "Limit( Function, Value )",
     "Factor( Polynomial )",
     "Simplify( Function )",
     "Solve( Equation )"
    ],
    "correct": 1,
    "why": [
     "Limit( Function, Value ) calculates what an expression approaches, not how it is factorised.",
     "Factor( Polynomial ) rewrites a polynomial as a product of factors, for example $(x-1)(x+3)(x+5)$.",
     "Simplify simplifies an expression, but does not necessarily rewrite it as a product of factors.",
     "Solve( Equation ) solves equations. It requires an equals sign, not just an expression to factorise."
    ]
   },
   {
    "question": "What is the difference between the commands NSolve and Solve when solving an equation?",
    "choices": [
     "NSolve gives the solution in decimal form, Solve gives it exactly with symbols",
     "They always give exactly the same kind of answer",
     "NSolve can only be used on linear equations",
     "NSolve gives the solution exactly with symbols, Solve gives decimal form"
    ],
    "correct": 0,
    "why": [
     "NSolve (numerical solve) answers with decimal numbers, for example $x \\approx 1.73$, while Solve answers exactly, for example $x = \\sqrt{3}$.",
     "The difference is precisely the form of the answer: decimals versus exact symbols.",
     "Both NSolve and Solve work on equations of any degree, not just linear equations.",
     "It is the other way round: NSolve stands for \"numerical solve\" and gives decimal form."
    ]
   },
   {
    "question": "A function $f(x) = x^3 - 4x^2$ is defined in GeoGebra. How do you find the function value $f(7)$?",
    "choices": [
     "You use the command Limit( f, 7 )",
     "You write NSolve( f(x) = 7 )",
     "Function values can only be read off graphically, not calculated exactly",
     "You write f(7) on the line below the function definition and read off the answer"
    ],
    "correct": 3,
    "why": [
     "Limit calculates what an expression approaches as the variable tends to a value, not a function value at a point.",
     "NSolve( f(x) = 7 ) instead solves the equation $f(x) = 7$ for $x$: the opposite question.",
     "GeoGebra calculates function values exactly and numerically, not just by reading off the graph.",
     "Once the function is defined, it is enough to write f(7) on a new line. GeoGebra calculates and shows the value directly."
    ]
   },
   {
    "question": "The command $\\text{Limit}\\!\\left(\\dfrac{x^2 - 9}{x - 3},\\ 3\\right)$ gives the answer 6, even though the expression is not defined for $x = 3$. Why is the answer still 6?",
    "choices": [
     "The limit describes what the expression approaches as $x$ tends to 3, not what happens exactly at $x = 3$",
     "The expression is actually defined for $x = 3$: the denominator never becomes 0",
     "GeoGebra guesses a reasonable value when the denominator becomes 0",
     "Limits can only be calculated for polynomials, not for rational expressions"
    ],
    "correct": 0,
    "why": [
     "That is right: cancelling the common factor $(x-3)$ gives $x + 3$, which is defined at $x = 3$ and gives the value 6. The limit only cares about what happens near the point, not at it.",
     "The denominator $x - 3$ becomes exactly 0 when $x = 3$, so the expression is undefined precisely there.",
     "GeoGebra guesses nothing: it calculates exactly by handling the removable gap in the domain algebraically.",
     "Limits can certainly be calculated for rational expressions. That is exactly what this example shows."
    ]
   }
  ]
 },
 "ma3c-2.1": {
  "kalla": "e9576d814c",
  "data": [
   {
    "question": "What is a straight line between two points on a curve called?",
    "choices": [
     "A secant",
     "A normal",
     "An asymptote",
     "A tangent"
    ],
    "correct": 0,
    "why": [
     "That is right: a secant is a straight line between two points on a curve.",
     "A normal is perpendicular to a tangent at a point. It is not a line between two points on the curve.",
     "An asymptote is a line that the curve approaches but never reaches. It has nothing to do with two marked points on the curve.",
     "A tangent touches the curve at only one point and has the same slope as the curve right there. That is not the same as a line between two points."
    ]
   },
   {
    "question": "Which formula gives the slope $k$ of the secant between the points $(x_1, y_1)$ and $(x_2, y_2)$?",
    "choices": [
     "$k = (y_2 - y_1)(x_2 - x_1)$",
     "$k = \\dfrac{x_2 - x_1}{y_2 - y_1}$",
     "$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$",
     "$k = \\dfrac{y_2 + y_1}{x_2 + x_1}$"
    ],
    "correct": 2,
    "why": [
     "The slope is obtained by dividing the differences, not by multiplying them.",
     "The quotient is upside down here: the numerator and denominator have swapped places.",
     "Exactly: the change in the *y*-direction divided by the change in the *x*-direction.",
     "The formula is built on differences (minus) between the coordinates, not sums (plus)."
    ]
   },
   {
    "question": "In applications, for example when a quantity changes over time, what does the slope of the secant represent?",
    "choices": [
     "An average rate of change",
     "A maximum value",
     "A zero",
     "An amplitude"
    ],
    "correct": 0,
    "why": [
     "Correct: the slope of the secant corresponds to the average change per unit over the chosen interval.",
     "A maximum value is a stationary point on the curve and has no direct connection to the slope of the secant.",
     "A zero is where the curve crosses the *x*-axis. That is not the same as a slope.",
     "Amplitude describes the size of oscillations, not the slope of a secant."
    ]
   },
   {
    "question": "A secant to $f(x) = x^2$ is drawn between $x = 2$ and $x = 4$. What is the slope of the secant?",
    "choices": [
     "$k = 12$",
     "$k = 3$",
     "$k = 6$",
     "$k = 20$"
    ],
    "correct": 2,
    "why": [
     "12 is the difference in function value ($16 - 4$), but it must also be divided by the difference in *x*-value ($4 - 2 = 2$).",
     "The denominator is $4 - 2 = 2$, not $4$. Check the difference in the *x*-direction again.",
     "Correct: $f(2) = 4$ and $f(4) = 16$ give $k = \\dfrac{16 - 4}{4 - 2} = \\dfrac{12}{2} = 6$.",
     "Adding the function values ($16 + 4 = 20$) instead of calculating the difference gives the wrong answer."
    ]
   },
   {
    "question": "Why can the slope of a curve not be given by a single number, unlike the slope of a straight line?",
    "choices": [
     "Because curves have no slope",
     "Because only straight lines can have a negative slope",
     "Because a curve is always vertically steep",
     "Because the slope of a curve varies along the curve, while a straight line has the same slope everywhere"
    ],
    "correct": 3,
    "why": [
     "Curves do have a slope at every point, but it differs from point to point.",
     "Both curves and straight lines can have a negative slope (be decreasing) in different parts.",
     "A curve can slope in any way at all. It is not always steep.",
     "That is exactly why we use the average slope of a secant to describe the slope of a curve over a certain interval."
    ]
   }
  ]
 },
 "ma3c-2.2": {
  "kalla": "08522b3c3b",
  "data": [
   {
    "question": "What is a tangent to a curve?",
    "choices": [
     "The highest point of the curve",
     "A straight line that touches the curve at exactly one point",
     "A curve that never meets another curve",
     "A straight line that crosses the curve at two points"
    ],
    "correct": 1,
    "why": [
     "The highest point of the curve is a stationary point, not a tangent. A tangent is a line, not a point.",
     "A tangent touches the curve at a single point, and its slope there is the same as the slope of the curve at that point.",
     "What is described is rather an asymptote, and in some cases even an asymptote can be met by the curve.",
     "A line that crosses the curve at two points is instead called a secant."
    ]
   },
   {
    "question": "Two points $(x_1, y_1)$ and $(x_2, y_2)$ lie on a tangent. Which formula gives the slope $k$ of the tangent?",
    "choices": [
     "$k = y_2 - y_1$",
     "$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$",
     "$k = \\dfrac{y_2 + y_1}{x_2 + x_1}$",
     "$k = \\dfrac{x_2 - x_1}{y_2 - y_1}$"
    ],
    "correct": 1,
    "why": [
     "This has no denominator. Without dividing by the change in the $x$-direction you do not get a slope.",
     "The gradient is the quotient of the change in the $y$-direction and the change in the $x$-direction, $k = \\dfrac{\\Delta y}{\\Delta x}$.",
     "Adding the coordinates instead of forming differences does not give the slope between the points.",
     "Here the numerator and denominator are reversed. That gives the inverted value, not $k$."
    ]
   },
   {
    "question": "A tangent to a curve passes through the points $(1, 4)$ and $(4, 13)$. Calculate the slope $k$ of the tangent.",
    "choices": [
     "$k = 0.33$",
     "$k = 2.25$",
     "$k = 3$",
     "$k = 9$"
    ],
    "correct": 2,
    "why": [
     "Here the numerator and denominator have swapped places: $\\dfrac{4 - 1}{13 - 4} = \\dfrac{3}{9} = 0.33$ is not the slope.",
     "This corresponds to dividing $\\Delta y$ by $x_2 = 4$ instead of by $\\Delta x = x_2 - x_1 = 3$.",
     "$k = \\dfrac{13 - 4}{4 - 1} = \\dfrac{9}{3} = 3$: correct substitution into the formula.",
     "This is only $\\Delta y = 13 - 4 = 9$, without dividing by $\\Delta x$."
    ]
   },
   {
    "question": "A graph shows the volume of water $V$ (litres) in a tank as a function of time $t$ (min). What unit does the slope of the tangent at a point on the graph have?",
    "choices": [
     "min",
     "litres",
     "litres/min",
     "min/litre"
    ],
    "correct": 2,
    "why": [
     "Minutes alone is the unit of time, not of the slope between volume and time.",
     "Litres alone is the unit of the volume itself, not of how fast it changes.",
     "The unit is \"the unit on the $y$-axis\" per \"the unit on the $x$-axis\", that is litres per minute.",
     "It is the other way round: the numerator of the unit follows the $y$-axis and the denominator the $x$-axis, not the reverse."
    ]
   },
   {
    "question": "What does the slope of the tangent represent when a graph shows a quantity as a function of time, for example distance as a function of time?",
    "choices": [
     "The average speed over the whole time interval",
     "The total value of the quantity at that moment",
     "A constant that is the same everywhere on the graph",
     "The rate of change at that particular moment"
    ],
    "correct": 3,
    "why": [
     "The average speed over a whole interval is instead calculated with a secant between the endpoints of the interval.",
     "The total value at the moment is read off directly on the $y$-axis, not from the slope.",
     "The slope can vary along the curve. Only for a straight line is the slope the same everywhere.",
     "The slope of the tangent at a point corresponds to the rate of change at that particular moment. That is why the tangent, and not the secant, is used to describe an instant."
    ]
   }
  ]
 },
 "ma3c-2.3": {
  "kalla": "3325a332ad",
  "data": [
   {
    "question": "What is the limit $\\displaystyle\\lim_{h \\to 0} \\dfrac{f(a+h)-f(a)}{h}$ called, if it exists?",
    "choices": [
     "The average slope over an interval",
     "The integral of $f$",
     "The derivative of $f$ at the point $x = a$, that is $f'(a)$",
     "The slope of the secant"
    ],
    "correct": 2,
    "why": [
     "The average slope over an interval is exactly $\\dfrac{f(a+h)-f(a)}{h}$ without the limit. It gives an approximation, not the exact slope at a point.",
     "Integrals are about the area under a curve, not about the slope at a point.",
     "Exactly: it is precisely this limit that defines the derivative (the slope of the tangent) at the point $x = a$.",
     "The slope of the secant is the expression $\\dfrac{f(a+h)-f(a)}{h}$ BEFORE the limit is taken. As $h \\to 0$, the secant turns into the tangent."
    ]
   },
   {
    "question": "Which expression gives the slope of the secant through the points $(a, f(a))$ and $(a+h, f(a+h))$?",
    "choices": [
     "$\\dfrac{f(a+h) - f(a)}{h}$",
     "$\\dfrac{f(a) - f(a+h)}{h}$",
     "$\\dfrac{f(a+h) + f(a)}{h}$",
     "$\\dfrac{h}{f(a+h) - f(a)}$"
    ],
    "correct": 0,
    "why": [
     "The slope $k = \\dfrac{y_2-y_1}{x_2-x_1}$ with $(x_1,y_1)=(a,f(a))$ and $(x_2,y_2)=(a+h,f(a+h))$ gives exactly $\\dfrac{f(a+h)-f(a)}{h}$, since $x_2-x_1 = (a+h)-a = h$.",
     "The sign in the numerator is wrong: it should be the later function value minus the earlier one, not the other way round.",
     "The terms in the numerator should be subtracted, not added. Otherwise it is not a slope.",
     "This is the inverse of the slope ($1/k$), not the slope itself."
    ]
   },
   {
    "question": "Why can you not set $h = 0$ directly in the expression $\\dfrac{f(a+h) - f(a)}{h}$ before you have simplified?",
    "choices": [
     "Then the variable $a$ disappears from the expression",
     "It is perfectly fine to do so",
     "Then the numerator becomes negative",
     "Then the denominator becomes 0, which gives division by 0"
    ],
    "correct": 3,
    "why": [
     "$a$ remains in the expression whatever $h$ is set to. The problem lies in the denominator.",
     "That is exactly what you may NOT do directly: the denominator becomes 0 before the expression has been simplified.",
     "The sign of the numerator depends on the function, not on $h=0$ causing an undefined problem.",
     "That is right: with $h=0$ in the denominator we get division by 0, which is undefined. That is why we must first factorise out $h$ from the numerator and the denominator."
    ]
   },
   {
    "question": "What does it mean geometrically to let $h \\to 0$ in the definition of the derivative?",
    "choices": [
     "The point with the $x$-coordinate $a$ disappears from the figure",
     "The secant through the two points turns into the tangent at the point $x = a$",
     "The curve becomes a straight line everywhere",
     "The function becomes constant"
    ],
    "correct": 1,
    "why": [
     "The point $x=a$ is still there; it is the OTHER point, $a+h$, that slides in towards the first one as $h \\to 0$.",
     "Exactly: when the second point $(a+h, f(a+h))$ approaches $(a, f(a))$ (that is, $h \\to 0$), the secant slides towards the tangent at the point.",
     "It is only the secant that turns into the tangent, not the whole curve that is straightened out.",
     "The function is unchanged. It is only which line (secant or tangent) we are looking at that changes."
    ]
   },
   {
    "question": "When calculating $f'(a)$ for $f(x) = x^2$, the numerator $(a+h)^2 - a^2$ (before cancelling by $h$) simplifies to which expression?",
    "choices": [
     "$2ah + h^2$",
     "$a^2 + h^2$",
     "$h^2$",
     "$2ah$"
    ],
    "correct": 0,
    "why": [
     "Correct: $(a+h)^2 - a^2 = a^2 + 2ah + h^2 - a^2 = 2ah + h^2$, a sum in which both terms contain the factor $h$.",
     "The cross term $2ah$ is missing here, and $a^2$ should disappear because $-a^2$ removes the original $a^2$.",
     "The term $2ah$ has been dropped. $h^2$ alone is not enough to describe the whole expansion.",
     "The term $h^2$ has been dropped. Squaring $(a+h)^2$ gives three terms, not two."
    ]
   }
  ]
 },
 "ma3c-2.4": {
  "kalla": "1751c029fd",
  "data": [
   {
    "question": "In applications in, for example, science or economics, what does the derivative represent?",
    "choices": [
     "The point where the graph crosses the *x*-axis",
     "The value of the function at a certain moment",
     "The mean value of the function over an interval",
     "Some kind of rate of change at a moment"
    ],
    "correct": 3,
    "why": [
     "Zeros describe where the function is zero, not how fast it changes.",
     "It is the function value $f(a)$, not the derivative $f'(a)$, that describes a value at a certain moment.",
     "A mean value over an interval is not the same as an instantaneous rate of change at a single point.",
     "Exactly: graphically the derivative is the slope at a point, and in applications it is interpreted as an instantaneous rate of change."
    ]
   },
   {
    "question": "A function $g(x)$ has the unit kg and the variable $x$ has the unit seconds. What unit does $g'(x)$ have?",
    "choices": [
     "kg/s",
     "s",
     "kg",
     "s/kg"
    ],
    "correct": 0,
    "why": [
     "Correct: the unit of the derivative is \"the unit of the function\" per \"the unit of the variable\", that is kg per s.",
     "That is the unit of the variable $x$, not of the derivative.",
     "That is the unit of $g(x)$ itself, not of the rate of change $g'(x)$.",
     "The quotient is taken in the opposite order to the correct one: it is the unit of the function per the unit of the variable, not the other way round."
    ]
   },
   {
    "question": "The number of visitors to a website is given by $B(t)$, where $t$ is the time in days. If $B'(4) = 150$, what does that mean?",
    "choices": [
     "After 4 days the site has had a total of 150 visitors",
     "The number of visitors increases by exactly 150 every day throughout the measurement period",
     "After 150 days the site has had 4 visitors",
     "After 4 days the number of visitors is increasing by about 150 per day"
    ],
    "correct": 3,
    "why": [
     "The total number of visitors at $t = 4$ is $B(4)$, not $B'(4)$. The derivative describes the rate of change, not a function value.",
     "$B'(4) = 150$ only applies at the moment $t = 4$. It says nothing about how fast the number of visitors changes at other times.",
     "This mixes up which variable is which and does not match how $B'(4) = 150$ should be read.",
     "Exactly: $B'(4)$ is the instantaneous rate of change at $t = 4$, with the unit visitors per day."
    ]
   },
   {
    "question": "You are going to enter the function $f(x) = 0.3x^2 - 5$ in GeoGebra's input bar. How do you write the number $0.3$?",
    "choices": [
     "0.3",
     "0:3",
     "0,3",
     "3/10"
    ],
    "correct": 0,
    "why": [
     "Correct: GeoGebra's input bar uses a point as the decimal separator, so $0.3$ is written as 0.3.",
     "A colon is not used as a decimal separator in GeoGebra.",
     "A decimal comma (as used in Swedish) is not interpreted as a decimal separator in GeoGebra's input bar.",
     "Fraction form does work mathematically, but the question is about how the decimal number $0.3$ in particular should be written."
    ]
   },
   {
    "question": "The distance travelled by a car is given by $s(t)$ km, where $t$ is the time in hours. What is the difference between $s(2)$ and $s'(2)$?",
    "choices": [
     "$s(2)$ is the distance after 2 hours; $s'(2)$ is the instantaneous speed at $t = 2$ hours",
     "$s(2)$ and $s'(2)$ mean the same thing, just written in two ways",
     "$s(2)$ is the instantaneous speed; $s'(2)$ is the distance travelled",
     "$s(2)$ applies at $t = 2$ hours, but $s'(2)$ applies at $t = 2$ km"
    ],
    "correct": 0,
    "why": [
     "Exactly: $s(2)$ is the function value (the distance in km), while $s'(2)$ is the value of the derivative (the instantaneous speed in km/h) at the same moment.",
     "They have different units and different meanings: km and km/h, distance and speed.",
     "This is the wrong way round: it is $s'(2)$ that is the speed and $s(2)$ that is the distance.",
     "$t = 2$ km makes no sense here: the variable $t$ is measured in hours, not kilometres, in both cases."
    ]
   }
  ]
 },
 "ma3c-2.5": {
  "kalla": "2172855a82",
  "data": [
   {
    "question": "What does it mean that a function is continuous at a point?",
    "choices": [
     "The function has a maximum there",
     "The derivative is zero there",
     "The graph is connected there: it can be drawn without lifting the pen",
     "The function is always positive there"
    ],
    "correct": 2,
    "why": [
     "Continuity is about the graph being connected, not about stationary points.",
     "A derivative equal to zero describes a horizontal tangent, not continuity.",
     "Exactly: a continuous graph is connected at the point, without jumps or breaks.",
     "A function can be continuous even if it is negative. The sign of the function value does not matter."
    ]
   },
   {
    "question": "How is the absolute value $|a|$ of a number $a$ defined?",
    "choices": [
     "The number multiplied by $-1$",
     "The square root of the number",
     "The distance of the number from 0 on the number line",
     "The opposite of the number"
    ],
    "correct": 2,
    "why": [
     "That only applies to negative numbers ($|{-3}| = -1 \\cdot (-3) = 3$). For positive numbers it would give the wrong sign ($|2| \\ne -2$).",
     "The square root is only defined for non-negative numbers and does not in general coincide with the absolute value.",
     "That is right: $|{-3}| = 3$ because the distance from $-3$ to 0 is 3, and $|2| = 2$ because the distance from 2 to 0 is 2.",
     "The opposite of $a$ is $-a$, which is negative when $a$ is positive. The absolute value is always non-negative."
    ]
   },
   {
    "question": "Which of the following is NOT a reason why a function has no derivative at a point?",
    "choices": [
     "The function is differentiable and continuous at the point",
     "The function is not defined there (for example a break)",
     "The function is discontinuous there (for example a jump)",
     "The function has a corner there"
    ],
    "correct": 0,
    "why": [
     "If the function is already differentiable at the point, the derivative of course exists there. This is the opposite of a reason for having no derivative.",
     "A function that is not defined at a point cannot have a derivative there either.",
     "A discontinuous function (for example with a jump) cannot have a well-defined derivative at that point.",
     "At a corner the slope from the left differs from the slope from the right, so the derivative has no unique value."
    ]
   },
   {
    "question": "Why is $f(x) = |x|$ not differentiable at $x = 0$?",
    "choices": [
     "Because $f(0) = 0$",
     "Because the slope is $-1$ from the left and $1$ from the right: the limits are different",
     "Because the function is not defined at $x = 0$",
     "Because the function is discontinuous at $x = 0$"
    ],
    "correct": 1,
    "why": [
     "That $f(0) = 0$ only tells you the function value. It says nothing about why the derivative does not exist.",
     "Correct: the left-hand and right-hand limits for the derivative differ, so the derivative has no unique value at the corner.",
     "$f(x) = |x|$ is defined everywhere, including at $x = 0$ (where $f(0) = 0$).",
     "$f(x) = |x|$ is connected throughout its graph, including at $x = 0$: it is continuous there."
    ]
   },
   {
    "question": "The graph of a function has an open circle at the point $(2, 5)$ and a filled dot at the point $(2, 3)$. What conclusion can we draw?",
    "choices": [
     "The function is differentiable at $x = 2$",
     "The function is continuous but not differentiable at $x = 2$",
     "The function has a jump at $x = 2$ and is neither continuous nor differentiable there",
     "The function is not defined at $x = 2$"
    ],
    "correct": 2,
    "why": [
     "Differentiability requires continuity, and a function with a jump is not continuous at the point.",
     "A jump means that the graph is not connected, so the function is not even continuous at $x = 2$, not just non-differentiable.",
     "The open circle shows that the limit from one side is 5, while the actual function value (filled dot) is 3. The graph is not connected, that is, there is a jump. Then the function is neither continuous nor differentiable at the point.",
     "On the contrary, the filled dot at $(2, 3)$ shows that the function is actually defined at $x = 2$, with the value 3."
    ]
   }
  ]
 },
 "ma3c-3.1": {
  "kalla": "3207648c5b",
  "data": [
   {
    "question": "Which rule of differentiation applies to $f(x) = x^n$?",
    "choices": [
     "$f'(x) = x^{n-1}$",
     "$f'(x) = nx^{n+1}$",
     "$f'(x) = nx^{n-1}$",
     "$f'(x) = nx^n$"
    ],
    "correct": 2,
    "why": [
     "The exponent $n$ must also be multiplied down in front of the *x*-term, not just disappear from the answer.",
     "The exponent should be decreased by 1, not increased.",
     "Exactly: we multiply the exponent down in front and then decrease it by 1.",
     "The exponent should be decreased by 1 in the answer, not left unchanged."
    ]
   },
   {
    "question": "Differentiate $f(x) = 4x^5$.",
    "choices": [
     "$f'(x) = 4x^4$",
     "$f'(x) = 5x^4$",
     "$f'(x) = 20x^5$",
     "$f'(x) = 20x^4$"
    ],
    "correct": 3,
    "why": [
     "The coefficient 4 should be multiplied by the exponent 5 (which gives 20). It should not stay unchanged.",
     "The original coefficient 4 must also be multiplied into the answer, otherwise it disappears.",
     "The exponent in the answer should be decreased by 1 (to 4), not left as 5.",
     "Correct: we multiply the exponent 5 down onto the coefficient 4 (which gives 20) and decrease the exponent by 1."
    ]
   },
   {
    "question": "What is the derivative of a constant function $f(x) = a$?",
    "choices": [
     "$f'(x) = 1$",
     "$f'(x) = a$",
     "$f'(x) = ax$",
     "$f'(x) = 0$"
    ],
    "correct": 3,
    "why": [
     "The derivative is 0, not 1, whatever number $a$ is.",
     "This is the value of the function itself, not its derivative. The derivative of a constant function is always 0.",
     "A constant function contains no $x$-term, so the derivative cannot be $ax$.",
     "Exactly: the graph of a constant function is a horizontal line, and the slope (the derivative) is always 0."
    ]
   },
   {
    "question": "What is the derivative of the linear function $f(x) = 9x$?",
    "choices": [
     "$f'(x) = 0$",
     "$f'(x) = 9$",
     "$f'(x) = x$",
     "$f'(x) = 9x$"
    ],
    "correct": 1,
    "why": [
     "The derivative is 0 only for constant functions without any $x$-term, not for $f(x) = 9x$.",
     "Correct: when an $x$-term of degree 1 is differentiated, the $x$ \"disappears\", and only the coefficient 9 remains.",
     "The coefficient 9 must be in the answer. It does not disappear when differentiating.",
     "When differentiating, the $x$ should disappear, so the answer can no longer contain $x$."
    ]
   },
   {
    "question": "How do you differentiate $f(x) = \\dfrac{g(x)}{a}$, where $a$ is a constant?",
    "choices": [
     "You differentiate the numerator $g(x)$ with the usual rules of differentiation and keep the denominator $a$",
     "You cannot differentiate an expression with a constant in the denominator",
     "You keep the numerator and differentiate only the denominator $a$",
     "You differentiate both the numerator and the denominator"
    ],
    "correct": 0,
    "why": [
     "Exactly: a constant denominator can be seen as a coefficient, so the numerator is differentiated as usual while the denominator stays unchanged.",
     "The expression can be differentiated perfectly well: the denominator $a$ works just like an ordinary coefficient.",
     "It is the numerator $g(x)$ that should be differentiated, not the denominator. The denominator $a$ is kept unchanged.",
     "The denominator $a$ is a constant and should not be differentiated. Only the numerator $g(x)$ is differentiated."
    ]
   }
  ]
 },
 "ma3c-3.2": {
  "kalla": "d326a955b6",
  "data": [
   {
    "question": "What does it mean to differentiate a polynomial function \"term by term\"?",
    "choices": [
     "That you differentiate once for every term in the denominator",
     "That you set all the terms equal to zero and solve the equation",
     "That each term of the polynomial is differentiated separately, and the derivatives are then added",
     "That only the term with the highest exponent is differentiated"
    ],
    "correct": 2,
    "why": [
     "The denominator of a fraction has nothing to do with the number of terms in the polynomial.",
     "That describes how to solve an equation, not how to differentiate a function.",
     "Exactly: each term is differentiated separately using the rules of differentiation, and the sum of these derivatives gives the derivative of the whole function.",
     "All the terms must be differentiated, not just the one with the highest exponent. Otherwise information is lost from the derivative."
    ]
   },
   {
    "question": "In the section, the function $f(x) = x^2 + 4x - 7$ was differentiated both with the definition of the derivative and term by term. Which statement is true?",
    "choices": [
     "The definition of the derivative does not work for polynomials with more than one term",
     "The definition of the derivative gives $f'(x) = 2x + 4$, but term by term gives a different answer",
     "The two methods can only be used on different types of functions",
     "Both methods give the same derivative, $f'(x) = 2x + 4$"
    ],
    "correct": 3,
    "why": [
     "The definition of the derivative applies to all differentiable functions, including polynomials with several terms. It is the basis of all the rules of differentiation.",
     "On the contrary, the two methods give exactly the same derivative; term by term is just a faster way to the same answer.",
     "Both methods work on all polynomial functions, however many terms they have.",
     "The term-by-term method is built on the same rules of differentiation and always gives the same result as the definition of the derivative, exactly as the worked example showed."
    ]
   },
   {
    "question": "Differentiate $f(x) = 6x^3 - 2x + 9$.",
    "choices": [
     "$f'(x) = 18x^2 - 2x$",
     "$f'(x) = 6x^2 - 2$",
     "$f'(x) = 18x^2 - 2 + 9$",
     "$f'(x) = 18x^2 - 2$"
    ],
    "correct": 3,
    "why": [
     "The exponent of $x$ in the differentiated term should be 1 less than in the original term: here it becomes $x^2$, not $x$.",
     "The coefficient $6$ should be multiplied by the exponent $3$ before the exponent is decreased, that is $3 \\cdot 6 = 18$, not just $6$.",
     "The constant term $9$ has the derivative $0$ and should not remain in the answer.",
     "Each term is differentiated separately: $6x^3$ gives $18x^2$, $-2x$ gives $-2$, and the constant $9$ disappears."
    ]
   },
   {
    "question": "What must be done before you differentiate $f(x) = (3x - 1)^2$?",
    "choices": [
     "You cancel the expression by a common factor before differentiating",
     "You differentiate the bracket expression directly, without preparation",
     "You substitute a value of $x$ before differentiating",
     "The bracket must be expanded into a polynomial before you differentiate term by term"
    ],
    "correct": 3,
    "why": [
     "Cancelling is used to simplify rational expressions (fractions), not to prepare a polynomial for differentiation.",
     "Differentiating the bracket expression directly without expanding it gives the wrong answer.",
     "Substituting a specific $x$-value is a separate step done after differentiating, if you want to calculate the value of the derivative at a point.",
     "The term-by-term rule only applies when the function is written as a sum of terms, so the square must first be expanded into a polynomial."
    ]
   },
   {
    "question": "Let $f(x) = 2x^2 - 3x$. What is $f'(1)$?",
    "choices": [
     "$-1$",
     "$4$",
     "$2$",
     "$1$"
    ],
    "correct": 3,
    "why": [
     "A sign error has crept in: $4 \\cdot 1 - 3 = 1$, not $-1$.",
     "The term $-3x$ gives the derivative $-3$; it does not disappear when $x = 1$ is substituted.",
     "That is the coefficient in front of $x^2$ in the original function, not the value of the derivative at the point $x = 1$.",
     "The derivative is $f'(x) = 4x - 3$, so $f'(1) = 4 \\cdot 1 - 3 = 1$."
    ]
   }
  ]
 },
 "ma3c-3.3": {
  "kalla": "f56d0eb921",
  "data": [
   {
    "question": "Does the power rule $f'(x) = ax^{a-1}$ for $f(x) = x^a$ only apply when $a$ is a positive integer?",
    "choices": [
     "No, it applies to all real numbers $a$ (if $x > 0$)",
     "Yes, only to positive integers",
     "Yes, but only to negative integers",
     "No, it only applies to fractional exponents"
    ],
    "correct": 0,
    "why": [
     "Using the definition of the derivative, you can show that the rule works just as well for fractional exponents (for example $a = 1/2$) and negative exponents (for example $a = -1$). The rule is therefore general.",
     "The rule applies much more widely: fractional and negative exponents also give the same simple pattern.",
     "The rule does not only apply to negative integers, but to all real exponents.",
     "Fractional exponents are only one of several cases the rule covers. It also applies to integers and negative exponents."
    ]
   },
   {
    "question": "How do you rewrite $\\dfrac{1}{x^5}$ as a power before differentiating?",
    "choices": [
     "$x^{5}$",
     "$-x^{5}$",
     "$x^{-5}$",
     "$x^{1/5}$"
    ],
    "correct": 2,
    "why": [
     "The sign of the exponent must change when $x^5$ is moved up from the denominator to the numerator.",
     "The minus sign belongs in the exponent, not in front of the whole expression. Otherwise the expression changes value.",
     "Moving a factor from the denominator to the numerator changes the sign of the exponent, so $\\dfrac{1}{x^5} = x^{-5}$.",
     "This is how you rewrite a root ($\\sqrt[5]{x}$), not how you move a denominator to the numerator."
    ]
   },
   {
    "question": "How do you rewrite $\\sqrt{x}$ as a power before differentiating?",
    "choices": [
     "$2x$",
     "$x^{2}$",
     "$x^{-1/2}$",
     "$x^{1/2}$"
    ],
    "correct": 3,
    "why": [
     "Rewriting the root as a power gives $x^{1/2}$, not an expression with $x$ multiplied by a constant.",
     "The exponent 2 corresponds to $x^2$, not to the square root of $x$.",
     "The exponent should be a positive $1/2$. The negative sign belongs to $\\dfrac{1}{\\sqrt{x}}$, not to $\\sqrt{x}$.",
     "The square root of $x$ corresponds to the exponent $1/2$, that is $\\sqrt{x} = x^{1/2}$."
    ]
   },
   {
    "question": "What is $f'(x)$ if $f(x) = \\dfrac{1}{x^2}$?",
    "choices": [
     "$f'(x) = -\\dfrac{2}{x^3}$",
     "$f'(x) = -\\dfrac{1}{x}$",
     "$f'(x) = \\dfrac{2}{x^3}$",
     "$f'(x) = -2x$"
    ],
    "correct": 0,
    "why": [
     "With $f(x) = x^{-2}$ the power rule gives $f'(x) = -2x^{-3} = -\\dfrac{2}{x^3}$.",
     "The exponent should be decreased by 1 (from $-2$ to $-3$), not disappear completely.",
     "The sign is wrong: the exponent $-2$ multiplied down gives a negative number, not a positive one.",
     "You multiply the exponent $-2$ down as a factor and decrease it by 1 in the power. The result is still a fraction, not a linear expression."
    ]
   },
   {
    "question": "What is the simplest way to differentiate $f(x) = \\dfrac{5x - 3}{x}$, which has $x$ in both the numerator and the denominator?",
    "choices": [
     "The fraction cannot be differentiated because $x$ is in the denominator",
     "Cancel $x$ directly in the fraction before differentiating",
     "Differentiate the numerator and the denominator separately and take the quotient of the derivatives",
     "Split the fraction into two terms, $5 - 3x^{-1}$, and differentiate term by term"
    ],
    "correct": 3,
    "why": [
     "Expressions with $x$ in the denominator can be differentiated: you just rewrite them as powers with negative exponents first.",
     "You may not cancel $x$ from $5x - 3$, because $-3$ does not have the factor $x$. It is not a common factor of the whole numerator.",
     "Differentiating the numerator and the denominator separately and dividing the derivatives is not how a quotient is differentiated.",
     "By splitting $\\dfrac{5x - 3}{x}$ into $\\dfrac{5x}{x} - \\dfrac{3}{x} = 5 - 3x^{-1}$, each term can easily be differentiated with the power rule."
    ]
   }
  ]
 },
 "ma3c-3.4": {
  "kalla": "9b6f4dc3b2",
  "data": [
   {
    "question": "What is the derivative of $f(x) = e^x$?",
    "choices": [
     "$f'(x) = 0$",
     "$f'(x) = e^x$",
     "$f'(x) = e$",
     "$f'(x) = xe^{x-1}$"
    ],
    "correct": 1,
    "why": [
     "The variable $x$ is in the exponent, so the function is not constant: the derivative is not 0.",
     "The function $e^x$ is its own derivative. That is exactly what makes the number $e$ special.",
     "The derivative keeps $x$ in the exponent; it does not become a pure constant.",
     "That is the rule for power functions ($x^n$), not for exponential functions where the variable is in the exponent."
    ]
   },
   {
    "question": "Why is the derivative of $f(x) = e^x$ exactly $f'(x) = e^x$?",
    "choices": [
     "$e$ is a variable, not a constant, so it is differentiated just like $x$",
     "The number $e$ is the only number that is its own square",
     "All exponential functions have the same derivative as themselves",
     "The number $e$ is defined as the base for which the limit $k = \\lim\\limits_{h\\to 0}\\dfrac{a^h-1}{h}$ is exactly 1"
    ],
    "correct": 3,
    "why": [
     "$e$ is a definite number (a constant, $\\approx 2.72$), just like $\\pi$. It is $x$ that is the variable.",
     "That is not true: the only numbers that are their own square are 0 and 1. And it would not explain why the derivative of $e^x$ is $e^x$ anyway.",
     "On the contrary, the $k$-value varies with the base $a$; it is only for the base $e$ that $k = 1$.",
     "The derivative of $a^x$ is $a^x \\cdot k$, where $k$ depends on the base $a$. For $a = e$ in particular, $k = 1$, so the derivative is exactly $e^x$."
    ]
   },
   {
    "question": "What is an approximate value of the number $e$?",
    "choices": [
     "$e \\approx 2.72$",
     "$e \\approx 1.00$",
     "$e \\approx 1.41$",
     "$e \\approx 3.14$"
    ],
    "correct": 0,
    "why": [
     "The number $e$ is an irrational number, $e = 2.718\\ldots \\approx 2.72$.",
     "It is $k$ that equals 1 (with the number $e$ as the base), not the base itself. With the base 1 the function would be constant and not at all interesting to differentiate.",
     "That is a rounding of $\\sqrt{2}$, not of $e$.",
     "That is a rounding of $\\pi$, not of $e$."
    ]
   },
   {
    "question": "Differentiate $f(x) = 6e^x$.",
    "choices": [
     "$f'(x) = 6e^x$",
     "$f'(x) = e^x$",
     "$f'(x) = 6xe^{x-1}$",
     "$f'(x) = 6e^{x-1}$"
    ],
    "correct": 0,
    "why": [
     "A coefficient in front of $e^x$ is kept unchanged when differentiating, just as for all other functions.",
     "The coefficient in front of a term should be kept when differentiating, not disappear.",
     "This mixes in the rule for power functions ($x^n$). $e^x$ is not differentiated in that way.",
     "The exponent of $e$ should not be decreased by 1. That rule applies to power functions, not to exponential functions with the base $e$."
    ]
   },
   {
    "question": "The function is $f(x) = e^x + 4$. What is $f'(x)$?",
    "choices": [
     "$f'(x) = e^x + 4$",
     "$f'(x) = 4e^x$",
     "$f'(x) = e^x$",
     "$f'(x) = e^{x+4}$"
    ],
    "correct": 2,
    "why": [
     "The constant term should disappear when differentiating. It should not remain unchanged.",
     "The constant $4$ is added; it should not become a multiplying coefficient in front of $e^x$.",
     "The constant $+4$ disappears when differentiating (the derivative of a constant is 0), so only $e^x$ remains.",
     "The expression is differentiated term by term; $4$ is a separate added term, not part of the exponent."
    ]
   }
  ]
 },
 "ma3c-3.5": {
  "kalla": "33f78f82c4",
  "data": [
   {
    "question": "What is $f'(x)$ if $f(x) = e^{7x}$?",
    "choices": [
     "$e^{7}$",
     "$e^{7x}$",
     "$7e^{x}$",
     "$7e^{7x}$"
    ],
    "correct": 3,
    "why": [
     "Both the correct exponent and the correct coefficient are missing: $f(x)$ is not differentiated to a constant.",
     "The coefficient 7 that the exponent actually has is missing here. It should be multiplied in, not left out.",
     "The exponent should be unchanged ($7x$, not $x$). Only the coefficient is moved to the front; otherwise the function is copied as it was.",
     "The derivative of $e^{kx}$ is $ke^{kx}$: the coefficient in the exponent (7) is multiplied in at the front."
    ]
   },
   {
    "question": "What is $f'(x)$ if $f(x) = 3^x$?",
    "choices": [
     "$x \\cdot 3^{x-1}$",
     "$\\ln 3$",
     "$3^x \\ln 3$",
     "$3^x$"
    ],
    "correct": 2,
    "why": [
     "That is the power rule for $x^n$ with a constant exponent. Here it is the other way round: $x$ is in the exponent and 3 is the base.",
     "That is only the $\\ln$ factor; the function $3^x$ itself is missing from the answer.",
     "The base 3 is not $e$, so according to the rule $f'(x) = a^x \\ln a$ the function is multiplied by $\\ln 3$.",
     "That is only true for the base $e$ ($f(x) = e^x$ has the derivative $e^x$). With another base you must multiply by $\\ln$ of that base."
    ]
   },
   {
    "question": "What does $\\ln 5$ mean?",
    "choices": [
     "The base-10 logarithm of 5",
     "The number that $e$ must be raised to for the answer to be 5",
     "The number $e$ divided by 5",
     "The number 5 raised to the power $e$"
    ],
    "correct": 1,
    "why": [
     "The base-10 logarithm has the base 10 and is written $\\lg$; $\\ln$ instead has the base $e$.",
     "$\\ln$ is the natural logarithm, that is the logarithm with base $e$: $\\ln 5$ answers \"what must $e$ be raised to in order to give 5?\".",
     "$\\ln 5$ is a logarithm, not a division of $e$ by 5.",
     "That is $e^5$, not $\\ln 5$: the order of base and exponent is reversed."
    ]
   },
   {
    "question": "What happens to the coefficient in front of an exponential function, for example in $f(x) = 4e^{3x}$, when you differentiate?",
    "choices": [
     "It disappears",
     "It is squared",
     "It becomes an exponent",
     "It is kept unchanged in front"
    ],
    "correct": 3,
    "why": [
     "The coefficient in front of an exponential function never disappears when differentiating, unlike for example a constant term in a sum.",
     "Nothing in the rule of differentiation squares the coefficient in front of the function.",
     "The coefficient in front of the function does not swap places with the exponent when differentiating.",
     "A constant factor in front of the function comes along unchanged. Only factors in the exponent affect how the derivative is formed."
    ]
   },
   {
    "question": "According to the \"cheat sheet\" for differentiating exponential functions, you multiply by $\\ln$ of the base …",
    "choices": [
     "… only if there is a coefficient in front of the function",
     "… only if the base is something other than $e$",
     "… always, whatever the base",
     "… never"
    ],
    "correct": 1,
    "why": [
     "Whether there is an $\\ln$ factor or not is decided by the base, not by whether there is a coefficient in front of the function.",
     "If the base is $e$, then $\\ln e = 1$, so the factor is not visible. That is why you only multiply by $\\ln$ when the base is something other than $e$.",
     "With the base $e$ it would mean multiplying by $\\ln e = 1$, which changes nothing, so the rule only applies to other bases.",
     "Without the $\\ln$ factor, for example $f(x) = 2^x$ would have the same derivative as $f(x) = e^x$, which is wrong: the bases give different steepnesses."
    ]
   }
  ]
 },
 "ma3c-3.6": {
  "kalla": "df3ca97948",
  "data": [
   {
    "question": "The derivative of a model is negative at a certain moment. How do we interpret that?",
    "choices": [
     "The quantity is zero at that moment",
     "The quantity is increasing at that moment",
     "The quantity is decreasing at that moment",
     "The model contains a calculation error"
    ],
    "correct": 2,
    "why": [
     "The derivative says nothing about whether the quantity is zero. That concerns the value of the function itself, not the rate of change.",
     "An increase corresponds to a positive derivative, not a negative one.",
     "A negative derivative means that the value of the function is decreasing right then: a decrease.",
     "A negative derivative is a valid result that can be interpreted. It is not a sign of an error."
    ]
   },
   {
    "question": "A function $f(t)$ is measured in litres and $t$ in minutes. What unit does $f'(t)$ have?",
    "choices": [
     "Litres times minutes",
     "Litres",
     "Minutes per litre",
     "Litres per minute"
    ],
    "correct": 3,
    "why": [
     "The derivative is a quotient concept (change per unit of time), not a product.",
     "Giving only litres (the same unit as $f$ itself) forgets that the derivative is a rate of change per unit of time.",
     "The order is reversed: it is the unit of the function divided by the unit of the variable, not the other way round.",
     "The unit of the derivative is \"the unit of the function\" per \"the unit of the variable\", here litres per minute."
    ]
   },
   {
    "question": "The tangent to the curve $y = f(x)$ at the point where $x = a$ has the equation $y = kx + m$. How is $k$ found?",
    "choices": [
     "$k = f''(a)$",
     "$k = a \\cdot f(a)$",
     "$k = f(a)$",
     "$k = f'(a)$"
    ],
    "correct": 3,
    "why": [
     "The second derivative describes how the slope itself changes, not the slope.",
     "This mixes up the $x$-coordinate and the function value with the slope. They have no such relationship.",
     "$f(a)$ gives the $y$-coordinate of the point of tangency, not the slope.",
     "The gradient is the slope of the tangent (and of the curve) at the point, which is the value of the derivative there."
    ]
   },
   {
    "question": "Why is it not enough to know only $k = f'(a)$ to write the complete equation of the tangent?",
    "choices": [
     "$m$ is always zero for a tangent",
     "$k$ always determines the whole line on its own",
     "You must also find $m$ by substituting the coordinates of the point of tangency",
     "The equation of the tangent needs no constant $m$"
    ],
    "correct": 2,
    "why": [
     "$m$ is the $y$-value where the line crosses the $y$-axis and depends on where the point of tangency is. It is rarely zero.",
     "Infinitely many lines have the same slope $k$ but different $m$. Only one of them passes through the right point.",
     "The equation of a straight line has two constants, $k$ and $m$. The slope $k$ only fixes the direction; $m$ is found by requiring that the line passes through the point of tangency $(a, f(a))$.",
     "Without $m$ you only know the slope of the line, not where it is in the coordinate system."
    ]
   },
   {
    "question": "The curve $y = x^2 - 4x + 1$ has a tangent at the point where $x = 3$. What is the slope of the tangent, $k = y'(3)$?",
    "choices": [
     "2",
     "6",
     "3",
     "−2"
    ],
    "correct": 0,
    "why": [
     "The derivative is $y' = 2x - 4$, so $y'(3) = 2 \\cdot 3 - 4 = 6 - 4 = 2$.",
     "You get this if you forget to subtract $4$ after substituting $x = 3$ into $2x$.",
     "This is the $x$-coordinate, not the slope. The slope must be calculated using the derivative.",
     "The sign is wrong: $2 \\cdot 3 - 4 = 2$, not $-2$."
    ]
   }
  ]
 },
 "ma3c-3.7": {
  "kalla": "c774b0f5d3",
  "data": [
   {
    "question": "Which GeoGebra command gives the value of the derivative at a given point, for example at $x = 3$, for a function $f$ that has already been defined?",
    "choices": [
     "Solve(f(x) = 3)",
     "NSolve(f(x) = 3)",
     "f'(3)",
     "f(3)"
    ],
    "correct": 2,
    "why": [
     "Solve solves equations exactly (symbolically). That is not the same as reading off the value of the derivative.",
     "NSolve solves equations numerically. It does not give the value of the derivative directly.",
     "That is right: when the function $f(x)$ has already been defined, f'(3) gives the value of the derivative at the point $x = 3$.",
     "f(3) gives the value of the function itself at $x = 3$, not the slope there."
    ]
   },
   {
    "question": "What is the difference between the commands NSolve(Equation) and Solve(Equation) in GeoGebra?",
    "choices": [
     "It is the same command but with different names",
     "NSolve gives the answer as a decimal number, Solve gives the answer exactly with symbols",
     "NSolve only solves quadratic equations, Solve solves all equations",
     "NSolve differentiates the equation, Solve finds the function value"
    ],
    "correct": 1,
    "why": [
     "They give different types of answer (numerical and exact, respectively), so they are not interchangeable.",
     "Exactly: NSolve returns a numerical solution (decimal number), while Solve gives the exact, symbolic solution.",
     "Both commands work on all types of equations. It is the form of the answer that distinguishes them, not which equations they can handle.",
     "Neither command differentiates or gives only a function value: both solve equations."
    ]
   },
   {
    "question": "An exponential function is written $y = C \\cdot a^x$. How do you rewrite it in the form with base $e$?",
    "choices": [
     "$y = C^k e^x$ where $k = a$",
     "$y = Ce^{ax}$ where $k = a$",
     "$y = Ce^{x/k}$ where $k = a$",
     "$y = Ce^{kx}$ where $e^k = a$"
    ],
    "correct": 3,
    "why": [
     "The initial value $C$ should not be raised to a power. It is just the coefficient in front of the exponential expression.",
     "The exponent should contain $k$, not $a$ directly: the relationship is $e^k = a$, not $k = a$.",
     "It is not division in the exponent, but multiplication: $kx$.",
     "The correct set-up: the growth factor $a$ corresponds to $e^k$, so $k = \\ln a$."
    ]
   },
   {
    "question": "How do you find the coefficient $k$ when a model $y = C \\cdot a^x$ is to be rewritten with base $e$?",
    "choices": [
     "$k = a$ because the bases are equal",
     "$k = \\ln a$, because $e^k = a$",
     "$k = \\log a$ with base 10",
     "$k$ cannot be found without knowing $C$"
    ],
    "correct": 1,
    "why": [
     "Changing the base requires taking logarithms: $k$ is not the same number as $a$.",
     "Exactly: take the logarithm of both sides of $e^k = a$: $\\ln e^k = \\ln a$, that is $k \\cdot \\ln e = \\ln a$, and since $\\ln e = 1$ we get $k = \\ln a$.",
     "It is the natural logarithm (ln, with base $e$) that is used here, not the base-10 logarithm.",
     "$k$ only depends on the growth factor $a$. The initial value $C$ does not affect $k$."
    ]
   },
   {
    "question": "The graph of a function has its steepest negative slope at a certain point. What does that correspond to in the graph of the derivative $f'(x)$?",
    "choices": [
     "The maximum point of the derivative",
     "The minimum point of the derivative",
     "The point where $f'(x) = f(x)$",
     "The zero of the derivative"
    ],
    "correct": 1,
    "why": [
     "A maximum point of $f'(x)$ instead gives the steepest positive slope.",
     "Yes: the slope is most negative exactly where the derivative $f'(x)$ itself has its smallest value, that is at the minimum point of the derivative.",
     "That is not a condition that describes an extreme slope: $f'(x)$ and $f(x)$ are different functions.",
     "A zero of $f'(x)$ means that the slope is zero (a stationary point of $f$), not that the slope is most negative."
    ]
   }
  ]
 },
 "ma3c-4.1": {
  "kalla": "4d79f2e759",
  "data": [
   {
    "question": "What can we say about a function $f(x)$ at a point where $f'(x) > 0$?",
    "choices": [
     "The function is increasing at that point",
     "The function has a maximum there",
     "The function is decreasing at that point",
     "The function is constant there"
    ],
    "correct": 0,
    "why": [
     "Exactly: a positive derivative means a positive slope, that is the function is increasing.",
     "At a maximum point the derivative is zero, not positive.",
     "Decreasing goes with a negative derivative, $f'(x) < 0$, not a positive one.",
     "A constant function has the derivative zero everywhere, not a positive value."
    ]
   },
   {
    "question": "What is the relationship between the sign of the derivative and the graph of the function?",
    "choices": [
     "The sign of the derivative has no connection to whether the function is increasing or decreasing",
     "The sign of the derivative decides whether the function is positive or negative",
     "$f'(x) < 0$ gives a decreasing function, $f'(x) > 0$ gives an increasing function",
     "$f'(x) < 0$ gives an increasing function, $f'(x) > 0$ gives a decreasing function"
    ],
    "correct": 2,
    "why": [
     "On the contrary: it is precisely the sign of the derivative that decides whether a function is increasing or decreasing.",
     "The sign of the derivative describes the slope (whether the function is increasing or decreasing), not whether the function value itself is positive or negative.",
     "Correct: a negative slope (\"downhill\") gives decreasing, a positive slope (\"uphill\") gives increasing.",
     "This is the wrong way round: a negative derivative gives decreasing, not increasing."
    ]
   },
   {
    "question": "What is required for a function to be strictly increasing on an interval?",
    "choices": [
     "The function must have a minimum in the interval",
     "The function must increase on at least half of the interval",
     "The derivative of the function must be constant on the interval",
     "The function must increase on the whole interval, without interruption"
    ],
    "correct": 3,
    "why": [
     "A minimum in the middle of the interval would mean that the function both decreases and increases there, not that it is strictly increasing.",
     "Part of the interval is not enough: the whole interval must be increasing.",
     "The derivative only needs to be positive, not constant: the slope may vary in size as long as it is positive.",
     "That is right: strictly increasing means increasing over the whole interval; no part may decrease or be constant."
    ]
   },
   {
    "question": "The graph of the derivative $f'(x)$ lies below the $x$-axis on a certain interval. What does that mean for $f(x)$?",
    "choices": [
     "$f(x)$ is increasing on that interval",
     "$f(x)$ is decreasing on that interval",
     "$f(x)$ has a zero on that interval",
     "$f(x)$ is negative on that interval"
    ],
    "correct": 1,
    "why": [
     "Increasing would require $f'(x) > 0$, that is the graph of $f'(x)$ lying above the $x$-axis.",
     "The graph of $f'(x)$ lying below the $x$-axis means that $f'(x) < 0$ there, which gives a decreasing $f(x)$.",
     "It is the graph of $f'(x)$ that lies below the axis. That says nothing about where $f(x)$ itself is zero.",
     "The sign of $f'(x)$ tells you how $f(x)$ changes, not what value $f(x)$ itself has."
    ]
   },
   {
    "question": "Why is it useful to compile the sign of $f'(x)$ in a sign table?",
    "choices": [
     "The table is needed to decide whether $f(x)$ is a polynomial",
     "It gives a clear overview of the intervals on which $f(x)$ is increasing and decreasing",
     "The table shows exactly what value $f(x)$ has at every point",
     "It is the only way to calculate $f'(x)$"
    ],
    "correct": 1,
    "why": [
     "Whether or not $f(x)$ is a polynomial has nothing to do with the sign table.",
     "Exactly: the sign table summarises the sign of $f'(x)$ in each interval between the zeros, which directly shows where $f(x)$ is increasing and decreasing.",
     "The sign table only shows the sign (positive, negative or zero) of $f'(x)$, not the function value of $f(x)$.",
     "The sign table is used after $f'(x)$ has already been found or read off. It is not a tool for differentiating."
    ]
   }
  ]
 },
 "ma3c-4.2": {
  "kalla": "3fb894cb82",
  "data": [
   {
    "question": "What characterises a local extreme point (maximum or minimum point) of a differentiable function $f(x)$?",
    "choices": [
     "That $f(x)$ is negative at the point",
     "That the function is continuous at the point",
     "That $f(x) = 0$ at the point",
     "That $f'(x) = 0$ at the point"
    ],
    "correct": 3,
    "why": [
     "The sign of the function value says nothing about whether the point is an extreme point.",
     "Continuity is required for the derivative to be defined, but says nothing about where extreme points are.",
     "That condition applies to the zeros of the function itself, not to extreme points. An extreme point can have any function value at all.",
     "At a local extreme point the tangent is horizontal, which means that the derivative (the slope) is exactly 0."
    ]
   },
   {
    "question": "What is a point called where the derivative is 0, but the curve continues in the same direction (neither turning upwards nor downwards)?",
    "choices": [
     "Local minimum point",
     "Local maximum point",
     "Zero",
     "Stationary point of inflection"
    ],
    "correct": 3,
    "why": [
     "A local minimum point is a \"valley\" where the curve turns upwards afterwards. Here the curve continues in the same direction.",
     "A local maximum point is a \"peak\" where the curve turns downwards afterwards. Here the curve continues in the same direction.",
     "A zero is a point where the function value is 0, which is a different condition from the derivative being 0.",
     "A stationary point of inflection has a horizontal tangent just like an extreme point, but the curve only levels out for a while before continuing in the same direction as before."
    ]
   },
   {
    "question": "In a sign table for $f'(x)$, the sign changes from $+$ to $-$ at $x = a$. What does that mean for the point $x = a$?",
    "choices": [
     "The function has no extreme point there",
     "It is a stationary point of inflection",
     "It is a local minimum point",
     "It is a local maximum point"
    ],
    "correct": 3,
    "why": [
     "On the contrary, a change of sign at $f'(a) = 0$ means that $x = a$ is an extreme point.",
     "At a stationary point of inflection the derivative keeps the same sign on both sides of the zero; it does not change.",
     "A minimum point requires the opposite change of sign: from $-$ to $+$.",
     "The function is increasing before $x = a$ and decreasing after: the curve goes from rising to falling, which is exactly what characterises a peak, that is a local maximum point."
    ]
   },
   {
    "question": "A quadratic function has a negative coefficient in front of the $x^2$-term. What is the nature of its extreme point?",
    "choices": [
     "Maximum point",
     "Minimum point",
     "It can be any of the three",
     "Stationary point of inflection"
    ],
    "correct": 0,
    "why": [
     "A negative $x^2$-term gives a \"sad\" curve that opens downwards, and such a curve always has a peak, that is a maximum point.",
     "A minimum point would have required a positive $x^2$-term (a \"happy\" curve that opens upwards).",
     "The sign in front of the $x^2$-term decides the nature unambiguously. No sign table is needed for quadratic functions.",
     "The only extreme point of a quadratic function is always a true maximum or minimum point, never a stationary point of inflection."
    ]
   },
   {
    "question": "What is the first step in finding the local extreme points of a function?",
    "choices": [
     "Draw up a table of values for the function",
     "Set $f(x) = 0$ and solve the equation",
     "Differentiate the function and solve $f'(x) = 0$",
     "Calculate the second derivative of the function"
    ],
    "correct": 2,
    "why": [
     "A table of values can give a hint, but does not give the exact coordinates of the extreme points.",
     "That instead gives the zeros of the function, that is where the curve crosses the $x$-axis: a different problem from finding extreme points.",
     "The $x$-coordinates of the extreme points are found by differentiating the function, setting the derivative equal to 0 and solving that equation.",
     "The second derivative is not used in the method covered in this section. The nature is instead determined with a sign table."
    ]
   }
  ]
 },
 "ma3c-4.3": {
  "kalla": "5e8c1b6b38",
  "data": [
   {
    "question": "Where can the greatest or least value of a function on a closed interval be found?",
    "choices": [
     "Anywhere the function is defined",
     "Only at the endpoints of the interval",
     "At an extreme point or at one of the endpoints of the interval",
     "Only at an extreme point"
    ],
    "correct": 2,
    "why": [
     "That is too vague: the value is found among a definite, small set of candidate points, not just anywhere.",
     "An extreme point inside the interval can also give the greatest or least value, not just the endpoints.",
     "Exactly: the greatest and least values on a closed interval are always found either at an extreme point or at one of the endpoints, never anywhere else.",
     "An endpoint can also give the greatest or least value, for example if the function keeps increasing all the way to the edge of the interval."
    ]
   },
   {
    "question": "What is the first step when we are to find the greatest and least value of a function on an interval?",
    "choices": [
     "Differentiate the function and set the derivative equal to 0",
     "Draw the graph and read off the values",
     "Substitute the endpoints of the interval into $f(x)$",
     "Calculate the second derivative"
    ],
    "correct": 2,
    "why": [
     "That is step two of the method: finding the extreme points using the derivative is done after the endpoints have been calculated.",
     "We are to sketch the graph with the help of the calculated points, not the other way round, reading off points from a graph already drawn.",
     "Yes: we start by calculating the $y$-coordinates at the endpoints, before we examine the extreme points.",
     "The second derivative is not used in this method: the nature of the extreme points is determined with a sign table."
    ]
   },
   {
    "question": "The function $g(x) = 2x + 1$ is defined on the interval $1 \\leq x \\leq 4$. What is the value of the function at the right endpoint?",
    "choices": [
     "$g(4) = 9$",
     "$g(4) = 8$",
     "$g(1) = 3$",
     "$g(4) = 7$"
    ],
    "correct": 0,
    "why": [
     "Correct substitution: $g(4) = 2 \\cdot 4 + 1 = 8 + 1 = 9$.",
     "The addition of $1$ has been lost: $2 \\cdot 4 = 8$, but $g(4) = 8 + 1 = 9$.",
     "That is the value at the left endpoint ($x = 1$), not the right one.",
     "That corresponds to $2 \\cdot 4 - 1$, but the function adds $1$; it does not subtract it."
    ]
   },
   {
    "question": "In a sign table, the arrow $\\nearrow$ indicates that the function is increasing on that subinterval. What does a horizontal arrow ($\\rightarrow$) in the $f(x)$ row of the table indicate?",
    "choices": [
     "That the derivative is undefined at that point",
     "That the function is constant on the whole neighbouring interval",
     "A point where the derivative is $0$, that is a horizontal tangent (an extreme point)",
     "That the graph has an asymptote at that point"
    ],
    "correct": 2,
    "why": [
     "On the contrary, the derivative is defined and equal to $0$ at that point: that is the whole point.",
     "The arrow marks a single point in the table, not a whole subinterval where the function would be constant.",
     "Exactly: the horizontal arrow marks a single point where the slope (the derivative) is $0$, that is an extreme point.",
     "The sign table for extreme points has nothing to do with asymptotes."
    ]
   },
   {
    "question": "What do you need to know about the extreme points of a function before you can sketch the shape of the graph?",
    "choices": [
     "Only their $x$-coordinates",
     "Only whether the function is a polynomial",
     "Their coordinates and their nature (maximum, minimum or stationary point of inflection)",
     "The second derivative of the function at every point"
    ],
    "correct": 2,
    "why": [
     "The $x$-coordinates are not enough: you also need the $y$-coordinates (from the original function) and the nature of the points.",
     "The method with the derivative and a sign table works for all differentiable functions, not just polynomials.",
     "Yes: without the $y$-coordinates and without knowing whether the point is a peak or a valley, you cannot sketch the shape of the curve.",
     "A sign table based on the sign of the first derivative is enough. The second derivative at every point is not needed."
    ]
   }
  ]
 },
 "ma3c-4.4": {
  "kalla": "961d6483cd",
  "data": [
   {
    "question": "What is the derivative of the derivative called, and how is it read?",
    "choices": [
     "The first derivative, $f'(x)$, read \"$f$ prime of $x$\"",
     "The third derivative, $f'''(x)$, read \"$f$ triple prime of $x$\"",
     "The integral of $f(x)$",
     "The second derivative, $f''(x)$, read \"$f$ double prime of $x$\""
    ],
    "correct": 3,
    "why": [
     "The first derivative $f'(x)$ is obtained by differentiating the function a single time, not twice.",
     "The third derivative would require one more differentiation of $f''(x)$. Here we have only differentiated twice.",
     "The integral is the opposite of differentiation, not the same as differentiating twice.",
     "Exactly: if you differentiate a function twice you get the second derivative, which is written $f''(x)$ and read \"$f$ double prime of $x$\"."
    ]
   },
   {
    "question": "What does it mean that $f''(x) > 0$ on a whole interval?",
    "choices": [
     "The curve is concave (bends downwards, a \"sad\" curve) on the interval",
     "The function is increasing on the interval",
     "The curve is convex (bends upwards, a \"happy\" curve) on the interval",
     "The function has a zero on the interval"
    ],
    "correct": 2,
    "why": [
     "On the contrary, a concave curve gives a negative second derivative, $f''(x) < 0$.",
     "Whether the function is increasing or decreasing is decided by the sign of the first derivative, $f'(x)$, not by the second derivative.",
     "Exactly: a positive second derivative means that the slope is increasing all the time, which gives a convex curve that bends upwards.",
     "Zeros (points where $f(x) = 0$) have no direct connection to the sign of the second derivative."
    ]
   },
   {
    "question": "What does it mean that $f''(x) < 0$ on a whole interval?",
    "choices": [
     "The function has no extreme points on the interval",
     "The curve is convex (bends upwards, a \"happy\" curve) on the interval",
     "The curve is concave (bends downwards, a \"sad\" curve) on the interval",
     "The function is decreasing on the interval"
    ],
    "correct": 2,
    "why": [
     "The sign of the second derivative says nothing about whether there are extreme points on the interval. That is decided by the zeros of the first derivative.",
     "On the contrary, a convex curve gives a positive second derivative, $f''(x) > 0$.",
     "Exactly: a negative second derivative means that the slope is decreasing all the time, which gives a concave curve that bends downwards.",
     "Whether the function is increasing or decreasing is decided by the sign of the first derivative $f'(x)$, not by the sign of the second derivative."
    ]
   },
   {
    "question": "What characterises a point of inflection?",
    "choices": [
     "The curve is convex on the whole interval around the point",
     "The second derivative is zero there, while the curve switches between convex and concave",
     "The first derivative is zero there, and the function has an extreme value",
     "The function itself is zero there, that is a zero"
    ],
    "correct": 1,
    "why": [
     "If the curve is convex on the whole interval, the second derivative never changes sign there, and then there is no point of inflection.",
     "Exactly: at a point of inflection $f''(x) = 0$ while the second derivative changes sign, so the curve goes from convex to concave or the other way round.",
     "That instead describes an extreme point (a local maximum or minimum point), not a point of inflection.",
     "A zero is a point where $f(x) = 0$. It has no direct connection to the sign of the second derivative."
    ]
   },
   {
    "question": "A function has the second derivative $f''(x) = 4x - 8$. On which interval is the function convex?",
    "choices": [
     "$x < 2$",
     "$x > 2$",
     "$x > 8$",
     "$x < -2$"
    ],
    "correct": 1,
    "why": [
     "That interval is where $f''(x) < 0$, that is where the function is concave instead.",
     "Exactly: convex means $f''(x) > 0$, and $4x - 8 > 0$ gives $x > 2$.",
     "The inequality $4x - 8 > 0$ gives $x > 2$ after dividing by 4. The number 8 should not remain as the boundary.",
     "The sign is the wrong way round: $4x - 8 > 0$ gives a positive boundary, $x > 2$, not a negative one."
    ]
   }
  ]
 },
 "ma3c-4.5": {
  "kalla": "d99e3e7569",
  "data": [
   {
    "question": "If $f'(a) = 0$ and $f''(a) > 0$, what applies to the function $f$ at $x = a$?",
    "choices": [
     "Local minimum point",
     "Stationary point of inflection",
     "Point of inflection without being an extreme point",
     "Local maximum point"
    ],
    "correct": 0,
    "why": [
     "A positive second derivative means that the curve is convex (a \"happy mouth\") at the point, so a critical point there is a minimum point.",
     "A stationary point of inflection requires that the derivative does not change sign around $x = a$, and then $f''(a) = 0$. Here $f''(a) > 0$, so the point is a minimum point.",
     "Such a point requires $f''(a) = 0$ and that the derivative does not change sign. That does not match $f''(a) > 0$.",
     "A maximum point instead requires $f''(a) < 0$: the curve concave (a \"sad mouth\")."
    ]
   },
   {
    "question": "If $f'(a) = 0$ and $f''(a) < 0$, what applies to the function $f$ at $x = a$?",
    "choices": [
     "Local minimum point",
     "Local maximum point",
     "The curve is convex at $x = a$",
     "Stationary point of inflection"
    ],
    "correct": 1,
    "why": [
     "A minimum point instead requires $f''(a) > 0$: the curve convex.",
     "A negative second derivative means that the curve is concave (a \"sad mouth\") at the point, so a critical point there is a maximum point.",
     "On the contrary, a negative second derivative means that the curve is concave, not convex.",
     "A stationary point of inflection applies when $f''(a) = 0$, not when the second derivative is negative."
    ]
   },
   {
    "question": "What is required to determine the nature of an extreme point if $f'(a) = 0$ and $f''(a) = 0$?",
    "choices": [
     "The point is automatically a maximum point",
     "The point is automatically a minimum point",
     "A sign study (sign table) of $f'(x)$ around $x = a$",
     "The point cannot be an extreme point"
    ],
    "correct": 2,
    "why": [
     "A second derivative of zero says nothing about the nature: neither a maximum nor a minimum point can be determined directly in that way.",
     "A second derivative of zero says nothing about the nature: neither a minimum nor a maximum point can be determined directly in that way.",
     "When the second derivative is zero it gives no information about the nature. Then you need a sign table for $f'(x)$ to see whether the derivative changes sign, and if so in which direction.",
     "The point may well be an extreme point, but it may also be a stationary point of inflection. Without a sign study we do not know which."
    ]
   },
   {
    "question": "The function $f(x) = x^3 - 6x^2$ has $f'(x) = 3x^2 - 12x$, with $f'(4) = 0$. What is $f''(4)$, and what is the nature of the extreme point?",
    "choices": [
     "$f''(4) = 12$, maximum point",
     "$f''(4) = 0$, stationary point of inflection",
     "$f''(4) = -12$, minimum point",
     "$f''(4) = 12$, minimum point"
    ],
    "correct": 3,
    "why": [
     "The value $f''(4) = 12$ is correct, but a positive second derivative gives a minimum point, not a maximum point.",
     "$f''(4) = 12 \\neq 0$, so it is not a stationary point of inflection.",
     "The sign is wrong: $f''(4) = 6 \\cdot 4 - 12 = 12$, not $-12$.",
     "The second derivative is $f''(x) = 6x - 12$, so $f''(4) = 24 - 12 = 12 > 0$, which gives a minimum point."
    ]
   },
   {
    "question": "Why must the second derivative be positive at a local minimum point?",
    "choices": [
     "Because the derivative $f'(x)$ is always positive at a minimum point",
     "Because the second derivative measures the value of the function itself, not its slope",
     "Because a minimum point always lies on a convex part of the curve (a \"happy mouth\"), and convexity means $f''(x) > 0$",
     "Because minimum points only exist on straight lines"
    ],
    "correct": 2,
    "why": [
     "At the extreme point itself $f'(a) = 0$, not positive. It is the sign of the second derivative, not of the first derivative, that decides the nature.",
     "The second derivative is the derivative of the derivative and measures how the slope changes (the concavity), not the value of the function.",
     "A local minimum point is a \"valley\" in the curve: the graph bends upwards around the point, which is exactly what a positive second derivative (convexity) means.",
     "Straight lines have $f''(x) = 0$ everywhere and have no extreme points at all."
    ]
   }
  ]
 },
 "ma3c-4.6": {
  "kalla": "18dd85fbcb",
  "data": [
   {
    "question": "What are problems about finding a greatest or least possible value called?",
    "choices": [
     "Systems of equations",
     "Extreme value problems (or optimisation problems)",
     "Limit problems",
     "Quadratic equations"
    ],
    "correct": 1,
    "why": [
     "A system of equations has several unknowns and relationships. It is not about optimising a quantity.",
     "That is right: also called optimisation problems.",
     "Limits describe what a function approaches, not the greatest or least possible value.",
     "Quadratic equations are a type of equation. Quadratic functions often appear in extreme value problems, but the concepts are not the same."
    ]
   },
   {
    "question": "What is the first step when solving an extreme value problem?",
    "choices": [
     "Set up a function for the quantity to be maximised or minimised",
     "Calculate the second derivative",
     "Draw the graph in a coordinate system",
     "Set the derivative equal to 0"
    ],
    "correct": 0,
    "why": [
     "Without a function to differentiate there is nothing to optimise. It is always the first step.",
     "The second derivative is used to determine the nature of the extreme point, which happens after the extreme point has been found.",
     "A graph can be a help, but it is not required for the algebraic method of solution.",
     "The derivative is set equal to 0 later, after the function has been set up and differentiated."
    ]
   },
   {
    "question": "A function $A(x)$ describes a quantity. At $x = x_0$, $A'(x_0) = 0$ and $A''(x_0) < 0$. What does that mean?",
    "choices": [
     "$x_0$ gives a minimum value",
     "$A$ has no extreme point at $x_0$",
     "$x_0$ gives a maximum value",
     "$A$ is increasing at $x_0$"
    ],
    "correct": 2,
    "why": [
     "A minimum point instead has a positive second derivative (the curve bends upwards there).",
     "On the contrary: the derivative being 0 and the second derivative having a definite sign shows precisely that there is an extreme point.",
     "A negative second derivative at a point where the derivative is 0 means that the curve bends downwards there, which gives a maximum point.",
     "If the derivative is 0 exactly at the point, the function cannot be increasing (or decreasing) there: the slope is zero."
    ]
   },
   {
    "question": "Why is it not enough just to give the $x$-value when answering an extreme value problem?",
    "choices": [
     "An $x$-value can never be part of a correct answer to mathematical problems",
     "The second derivative can only be calculated if the $x$-value is written in decimal form",
     "The $x$-value is always wrong unless it is given together with a unit",
     "The result must be interpreted in the context of the problem, for example which price or which area results"
    ],
    "correct": 3,
    "why": [
     "On the contrary, an $x$-value may well be part of a correct answer, but it is rarely enough as a complete answer to an applied problem.",
     "The second derivative does not depend on how the $x$-value is written. It is calculated from the function expression, not from the decimal form of a number.",
     "A unit is important when there is one, but the main reason for interpreting the result is the context, not the unit itself.",
     "Extreme value problems describe real situations: the answer should be linked to what the $x$-value means in the context, for example the price or the area that gives the extreme value."
    ]
   },
   {
    "question": "A revenue function is written $I(x) = x(300 - 2x)$, where $x$ is the ticket price in kr. How is the factor $(300 - 2x)$ interpreted?",
    "choices": [
     "The number of visitors who do not buy a ticket",
     "The profit after deducting costs",
     "The number of tickets sold at the ticket price $x$",
     "The total revenue in kr"
    ],
    "correct": 2,
    "why": [
     "The factor describes how many actually buy a ticket at that price, not how many refrain.",
     "The function describes the revenue, not the profit. It does not take any costs into account.",
     "Since $\\text{revenue} = \\text{ticket price} \\cdot \\text{number of tickets sold}$ and $x$ already stands for the ticket price, the other factor must be the number of tickets sold.",
     "The total revenue is the whole product $I(x) = x(300 - 2x)$, not just one of the factors."
    ]
   }
  ]
 },
 "ma3c-4.7": {
  "kalla": "1ac2d48a34",
  "data": [
   {
    "question": "Why must we express the quantity to be optimised (for example a volume) as a function of a single variable before we draw the graph in GeoGebra?",
    "choices": [
     "A function of several variables is always negative",
     "An ordinary coordinate system only shows how a $y$-value depends on ONE $x$-value, so the function must depend on a single variable to be drawn",
     "Otherwise GeoGebra cannot calculate areas or volumes at all",
     "It is only so that the answer will be an integer"
    ],
    "correct": 1,
    "why": [
     "A function depending on several variables says nothing about the sign of its values.",
     "A graph is drawn in a coordinate system with one $x$-axis and one $y$-axis, so the function must depend on a single variable to be drawn and examined with the Extremum tool.",
     "GeoGebra can certainly calculate expressions with several variables. The problem is that such a function cannot be drawn as an ordinary graph in a plane.",
     "The answer does not have to be an integer at all: in the example the radius was about 16.7 cm."
    ]
   },
   {
    "question": "In an extreme value problem we have found the function $V(r) = 50\\pi r^2 - 2\\pi r^3$ and the extreme point $B = (16.66667, 14544.41043)$ in GeoGebra. What does the $y$-coordinate represent?",
    "choices": [
     "The radius that gives maximum volume",
     "The number of extreme points on the graph",
     "The height of the cylinder",
     "The maximum volume"
    ],
    "correct": 3,
    "why": [
     "The radius is the independent variable $r$, which is the $x$-coordinate of the point, not the $y$-coordinate.",
     "A single extreme point has an $x$-value and a $y$-value; the coordinates say nothing about how many extreme points the graph has in total.",
     "The height $h$ does not appear in the graph that is drawn: it was eliminated when $V$ was written as a function of $r$ alone.",
     "The graph shows $V(r)$ against $r$, so the $y$-coordinate of a point on the graph is exactly the function value: here the maximum volume."
    ]
   },
   {
    "question": "Which of the following is the algebraic equivalent of clicking on a graph with GeoGebra's Extremum tool?",
    "choices": [
     "Setting the function equal to zero and solving for the unknown variable",
     "Differentiating the function, setting the derivative equal to zero and solving for the unknown variable",
     "Cancelling the function expression as far as possible",
     "Integrating the function over the whole domain"
    ],
    "correct": 1,
    "why": [
     "Setting the function (not the derivative) equal to zero gives zeros, that is where the graph crosses the $x$-axis, not extreme points.",
     "That is exactly what GeoGebra does in the background when the tool marks an extreme point: it finds where the derivative (the slope) is zero.",
     "Cancelling is about simplifying rational expressions, not about optimising a function.",
     "Integrals give the area under a curve, not extreme points."
    ]
   },
   {
    "question": "A sheet of cardboard is to be folded into a box. The volume as a function of the side $x$ of the cut-out square is $V(x) = x(24 - 2x)(15 - 2x)$, with the domain $0 < x < 7.5$. GeoGebra marks TWO points with a horizontal tangent: $(3, 486)$ and $(10, -200)$. Why is the point $(10, -200)$ not acceptable as an answer?",
    "choices": [
     "GeoGebra has made a calculation error",
     "A volume can never be an even number",
     "Extreme points must always have positive coordinates",
     "$x = 10$ lies outside the permitted domain $0 < x < 7.5$"
    ],
    "correct": 3,
    "why": [
     "GeoGebra calculates the mathematical function correctly. The problem is that that part of the graph does not correspond to a real box.",
     "Volumes may well be even numbers (486 is even). That is not the reason the point is rejected.",
     "Mathematically, extreme points can certainly have negative coordinates; it is the domain, not the sign itself, that decides whether the point is acceptable as an answer.",
     "The domain is restricted by the side $15 - 2x$ having to be positive, which gives $x < 7.5$. Since $10 > 7.5$, the point lies outside the physically possible interval."
    ]
   },
   {
    "question": "What is the advantage of solving an extreme value problem graphically in GeoGebra, compared with solving it algebraically by hand?",
    "choices": [
     "We do not have to differentiate by hand, but we only get a value read off and rounded instead of an exact expression",
     "We do not need to express the quantity as a function of one variable",
     "The method only works for quadratic functions",
     "We always get a more exact answer than with the algebraic method"
    ],
    "correct": 0,
    "why": [
     "GeoGebra's Extremum tool finds the extreme value automatically without us having to differentiate by hand, but the result is a numerical (rounded) value, unlike an exact algebraic expression.",
     "Just as in the algebraic method, the quantity must be expressed as a function of a single variable to be drawn as an ordinary graph.",
     "The method works for all functions that can be drawn in GeoGebra, for example cubic functions as in the cylinder example.",
     "On the contrary: reading off the graph gives a rounded approximation, while the algebraic method (when it can be carried out) gives an exact answer."
    ]
   }
  ]
 },
 "ma3c-5.1": {
  "kalla": "18dc92ec0f",
  "data": [
   {
    "question": "What is meant by $F(x)$ being an antiderivative of $f(x)$?",
    "choices": [
     "That $F(x)$ and $f(x)$ are the same function, just rewritten",
     "That $f'(x) = F(x)$",
     "That $F(x)$ is the second derivative of $f(x)$",
     "That $F'(x) = f(x)$"
    ],
    "correct": 3,
    "why": [
     "In general they are different functions: $F$ has a higher exponent (or the equivalent) than $f$.",
     "It is the other way round: it is $F$ that is differentiated to $f$, not $f$ that is differentiated to $F$.",
     "The second derivative is obtained by differentiating twice, not by going one step backwards.",
     "Exactly: an antiderivative is a function whose derivative gives back the original function."
    ]
   },
   {
    "question": "What is the difference between giving \"an antiderivative\" and \"all antiderivatives\" of $f(x)$?",
    "choices": [
     "There is no difference; they mean the same thing",
     "All antiderivatives contain a general constant $C$, which an antiderivative does not need to have",
     "An antiderivative must always be a constant function",
     "All antiderivatives are always equal to zero"
    ],
    "correct": 1,
    "why": [
     "The difference is crucial: an antiderivative is a single example, all antiderivatives are the whole family $F(x) + C$.",
     "All functions of the form $F(x) + C$ have the same derivative $f(x)$, so all antiderivatives are written with the constant $C$ at the end.",
     "An antiderivative can be any function at all, depending on $f(x)$. It does not have to be constant.",
     "The constant $C$ can stand for any number, not just zero."
    ]
   },
   {
    "question": "How do you find an antiderivative of the power function $f(x) = x^n$?",
    "choices": [
     "Increase the exponent by 1 and divide by the new exponent: $F(x) = \\dfrac{x^{n+1}}{n+1}$",
     "Increase the exponent by 1 without dividing: $F(x) = x^{n+1}$",
     "Decrease the exponent by 1 and multiply by $n$: $F(x) = nx^{n-1}$",
     "Divide the exponent by $x$: $F(x) = \\dfrac{x^n}{n}$"
    ],
    "correct": 0,
    "why": [
     "This is exactly the rule for power functions: the new exponent $n + 1$ is used both in the numerator and as the divisor.",
     "You must also divide by the new exponent, otherwise differentiating does not give back $x^n$.",
     "That is the rule of differentiation (going forwards), not the rule for an antiderivative.",
     "It is the exponent of $x$ that should be increased by 1, not $x^n$ that should be divided by the old exponent $n$."
    ]
   },
   {
    "question": "How do you find an antiderivative of a constant function $f(x) = k$?",
    "choices": [
     "Multiply the constant by $x$: $F(x) = kx$",
     "Square the constant and divide by 2: $F(x) = \\dfrac{k^2}{2}$",
     "Divide the constant by $x$: $F(x) = \\dfrac{k}{x}$",
     "Leave the function unchanged: $F(x) = k$"
    ],
    "correct": 0,
    "why": [
     "Differentiating $F(x) = kx$ gives back exactly $k$, so this is the antiderivative of a constant.",
     "That is not the rule for a constant function: no squaring is involved.",
     "Dividing by $x$ gives a function that does not have the derivative $k$ at all.",
     "Differentiating a constant $F(x) = k$ gives the derivative zero, not $k$, so this is not correct."
    ]
   },
   {
    "question": "How do you find an antiderivative of the exponential function $f(x) = e^{kx}$?",
    "choices": [
     "Leave the function unchanged: $F(x) = e^{kx}$",
     "Copy the function and multiply by $k$: $F(x) = ke^{kx}$",
     "Increase the exponent by 1 as for a power function: $F(x) = \\dfrac{e^{kx+1}}{k+1}$",
     "Copy the function and divide by the coefficient $k$ in front of $x$ in the exponent: $F(x) = \\dfrac{e^{kx}}{k}$"
    ],
    "correct": 3,
    "why": [
     "Differentiating $e^{kx}$ unchanged gives $k e^{kx}$ because of the chain rule, not $e^{kx}$, so this is not correct.",
     "Multiplying by $k$ goes in the wrong direction: differentiating that function gives $k^2 e^{kx}$, not $e^{kx}$.",
     "Exponential functions with the base $e$ follow a rule of their own; you do not increase the exponent as for a power function.",
     "Differentiating $F(x) = \\dfrac{e^{kx}}{k}$ with the chain rule gives back $k \\cdot \\dfrac{e^{kx}}{k} = e^{kx}$, exactly $f(x)$."
    ]
   }
  ]
 },
 "ma3c-5.2": {
  "kalla": "b4d0dad0de",
  "data": [
   {
    "question": "What is meant by a \"condition\" for an antiderivative?",
    "choices": [
     "A requirement that the function must be a polynomial",
     "An extra piece of information about the function, for example a known function value, that allows the constant $C$ to be found",
     "That the function has no zeros",
     "That you always get $C = 0$"
    ],
    "correct": 1,
    "why": [
     "The condition is about finding the constant, not about what type of function it is.",
     "Exactly: a condition such as $F(1) = 7$ gives an equation that can be solved for $C$.",
     "Zeros have nothing to do with how $C$ is found.",
     "The constant $C$ can be any number. It depends entirely on the condition."
    ]
   },
   {
    "question": "What is the opposite of differentiating?",
    "choices": [
     "Factorising",
     "Integrating",
     "Cancelling",
     "Simplifying"
    ],
    "correct": 1,
    "why": [
     "Factorising is about rewriting expressions as products, not about derivatives.",
     "Finding an antiderivative (integrating) is the opposite of differentiating.",
     "Cancelling concerns rational expressions, not the relationship between derivatives and antiderivatives.",
     "Simplifying is a general arithmetic operation, not the opposite of differentiating."
    ]
   },
   {
    "question": "If we differentiate a distance function $s(t)$ twice in succession, what do we get?",
    "choices": [
     "The constant $C$",
     "The same distance function $s(t)$ again",
     "An acceleration function $a(t)$",
     "A velocity function $v(t)$"
    ],
    "correct": 2,
    "why": [
     "The constant $C$ appears when integrating, not when differentiating.",
     "Differentiating a non-constant function gives a new function, not the same one back.",
     "The first differentiation gives the velocity $v(t)$, and the second differentiation, of $v(t)$, gives the acceleration $a(t)$.",
     "That is only the result of the first differentiation. The question is about two differentiations."
    ]
   },
   {
    "question": "An antiderivative of $f(x) = 2x$ is $F(x) = x^2 + C$. Which condition gives $C = 3$?",
    "choices": [
     "$F(1) = 1$",
     "$F(3) = 0$",
     "$F(0) = 3$",
     "$f(0) = 3$"
    ],
    "correct": 2,
    "why": [
     "Substitution gives $1 + C = 1$, that is $C = 0$, not $3$.",
     "Substitution gives $9 + C = 0$, that is $C = -9$, not $3$.",
     "Substitution gives $0^2 + C = 3$, that is $C = 3$.",
     "The condition must concern the antiderivative $F$, not $f$ (and $f(0) = 0$ whatever $C$ is)."
    ]
   },
   {
    "question": "The velocity of an object is $v(t) = 6t$, and $s(0) = 2$. What is the distance function $s(t)$?",
    "choices": [
     "$s(t) = 3t^2$",
     "$s(t) = 3t^2 + 6$",
     "$s(t) = 6t^2 + 2$",
     "$s(t) = 3t^2 + 2$"
    ],
    "correct": 3,
    "why": [
     "The condition $s(0) = 2$ has not been used. It gives $C = 2$, not $C = 0$.",
     "The constant $C$ should be found from the condition $s(0) = 2$. It is not the same number as the coefficient in $v(t)$.",
     "The exponent should increase by 1 and you should divide by the new exponent: $6t$ gives $3t^2$, not $6t^2$.",
     "Integrating $6t$ gives $3t^2 + C$, and $s(0) = 2$ gives $C = 2$."
    ]
   }
  ]
 },
 "ma3c-5.3": {
  "kalla": "a858663f1d",
  "data": [
   {
    "question": "What does a definite integral $\\int_a^b f(x)\\, dx$ correspond to graphically?",
    "choices": [
     "The highest value of the graph between $x = a$ and $x = b$",
     "The slope of the tangent to the graph at a point",
     "The area between the graph and the $x$-axis, between $x = a$ and $x = b$",
     "The point where the graph crosses the $x$-axis"
    ],
    "correct": 2,
    "why": [
     "That describes a maximum value, not an integral.",
     "That is a description of the derivative (the slope of the tangent at a point), not the integral.",
     "Exactly: the integral corresponds to the area under the graph between the two limits of integration.",
     "That describes a zero of the function, not an integral."
    ]
   },
   {
    "question": "How do you go from the sum of rectangle areas $\\sum f(x) \\cdot \\Delta x$ to the integral $\\int f(x)\\, dx$?",
    "choices": [
     "By differentiating the sum of the rectangle areas",
     "By using just one single, wider rectangle",
     "By letting the width $\\Delta x$ of the rectangles tend to 0, so that $\\Delta x$ becomes $dx$ and the sum becomes an integral",
     "By multiplying all the rectangle areas together instead of adding them"
    ],
    "correct": 2,
    "why": [
     "Differentiation is the opposite operation to integration and has nothing to do with this limiting process.",
     "On the contrary, the approximation gets better the MORE (and narrower) rectangles are used, not fewer.",
     "As $\\Delta x$ tends to zero, the sum of infinitely many, infinitely narrow rectangle areas becomes an integral. The integral sign is an \"elongated s\" for sum.",
     "The rectangle areas are added (summed) all the time, both before and after the limiting process. They are never multiplied."
    ]
   },
   {
    "question": "An area under the graph of a function lies entirely below the $x$-axis. What applies to the area and to the integral, respectively?",
    "choices": [
     "The integral is zero because the region lies below the $x$-axis",
     "The integral is positive because an area is always positive",
     "Both the integral and the area are negative",
     "The integral is negative, but the area itself can never be negative"
    ],
    "correct": 3,
    "why": [
     "The integral is negative (not zero) as long as the region has a non-zero extent.",
     "The fact that the area lies below the $x$-axis actually makes the value of the integral negative, not positive.",
     "An area can never be negative. Only the value of the integral can be.",
     "Exactly this distinction is central: an integral can be negative, but a geometric area is by definition always greater than or equal to zero."
    ]
   },
   {
    "question": "In the integral $\\int_2^7 f(x)\\, dx$, what is the number 7 called?",
    "choices": [
     "Integrand",
     "Variable of integration",
     "Lower limit of integration",
     "Upper limit of integration"
    ],
    "correct": 3,
    "why": [
     "The integrand is the function being integrated, $f(x)$, not a limit.",
     "The variable of integration is $x$ (the one given in $dx$), not a limit.",
     "The lower limit of integration is the number at the bottom of the integral sign, here 2.",
     "Exactly: 7 is the $x$-value where the area ends, that is the upper limit of integration."
    ]
   },
   {
    "question": "The graph of $f(x) = 3$ forms a rectangle together with the $x$-axis, $x = 1$ and $x = 5$. What is $\\int_1^5 3\\, dx$?",
    "choices": [
     "$4$",
     "$3$",
     "$12$",
     "$15$"
    ],
    "correct": 2,
    "why": [
     "That is only the width $5 - 1 = 4$. The height (the function value $3$) must also be multiplied in.",
     "That is only the height $f(x) = 3$. The width $5 - 1 = 4$ must also be multiplied in.",
     "The rectangle has the base $5 - 1 = 4$ and the height $3$, so the value of the integral is $4 \\cdot 3 = 12$.",
     "That corresponds to $5 \\cdot 3$, but the width of the rectangle is $5 - 1 = 4$, not $5$. Do not forget to subtract the lower limit."
    ]
   }
  ]
 },
 "ma3c-5.4": {
  "kalla": "ff4b7fc6ad",
  "data": [
   {
    "question": "What does the fundamental theorem of calculus say?",
    "choices": [
     "$\\int_a^b f(x)\\, dx = F(a) - F(b)$",
     "$\\int_a^b f(x)\\, dx = f(b) - f(a)$",
     "$\\int_a^b f(x)\\, dx = \\dfrac{F(b) - F(a)}{b - a}$",
     "$\\int_a^b f(x)\\, dx = F(b) - F(a)$, where $F$ is an antiderivative of $f$"
    ],
    "correct": 3,
    "why": [
     "The order is reversed: it is the upper limit minus the lower limit, $F(b) - F(a)$, not the other way round.",
     "It is the antiderivative $F$, not $f$ itself, that should be evaluated at the limits.",
     "That expression is the formula for an average slope (secant) between two points. The integral is the difference $F(b) - F(a)$ itself, not that divided by $b - a$.",
     "Exactly: the definite integral is calculated as the difference between the values of the antiderivative at the upper and lower limits."
    ]
   },
   {
    "question": "What does the notation $\\big[F(x)\\big]_a^b$ mean?",
    "choices": [
     "A compact way of writing the difference $F(b) - F(a)$",
     "A compact way of writing the sum $F(b) + F(a)$",
     "A compact way of writing the derivative of $F$ on the interval",
     "A compact way of writing the difference $F(a) - F(b)$"
    ],
    "correct": 0,
    "why": [
     "Correct: the square brackets with the limits are just a notation for first substituting the upper limit and then subtracting the value at the lower limit.",
     "It is about a difference, not a sum.",
     "The notation is about substituting the limits into an antiderivative that has already been found, not about differentiating anything.",
     "The order is reversed: it is the value at the upper limit that is substituted first and the value at the lower limit that is subtracted, not the other way round."
    ]
   },
   {
    "question": "What requirement is placed on the function $F$ in the fundamental theorem of calculus?",
    "choices": [
     "It must be the same function as $f$",
     "It can be any function at all",
     "It must be an antiderivative of $f$, that is a function whose derivative is equal to $f$",
     "It must be the derivative of $f$"
    ],
    "correct": 2,
    "why": [
     "$f$ is the integrand, the function to be integrated. $F$ is a different function, the antiderivative of $f$.",
     "The relationship only holds if $F$ is specifically an antiderivative of $f$. Just any function will not do.",
     "That is right: $F$ must be an antiderivative of $f$, that is a function whose derivative is $f$, otherwise the relationship does not hold.",
     "It is the other way round: $f$ is the derivative of $F$, not the reverse."
    ]
   },
   {
    "question": "Why must you put brackets around the whole expression when you substitute the lower limit, if the antiderivative has several terms?",
    "choices": [
     "Otherwise the minus sign only affects the first term instead of all the terms, which gives the wrong sign in the answer",
     "To make the expression shorter and easier to read",
     "It is just a writing habit with no importance for the final answer",
     "Brackets are only needed for the upper limit, never for the lower one"
    ],
    "correct": 0,
    "why": [
     "Exactly: without the brackets the minus sign is not distributed to all the terms in the expression for the lower limit, and the answer is wrong.",
     "The brackets are about calculating correctly, not about shortening the expression.",
     "A forgotten bracket often changes the whole answer, so it is not just a question of style.",
     "On the contrary, it is the lower limit (the one subtracted, with a minus sign in front) that requires brackets when it has several terms."
    ]
   },
   {
    "question": "What is $\\big[x^2\\big]_1^3$?",
    "choices": [
     "$9$",
     "$8$",
     "$5$",
     "$4$"
    ],
    "correct": 1,
    "why": [
     "$9$ is only $3^2$: the value at the lower limit, $1^2 = 1$, has not been subtracted.",
     "Correct: $3^2 - 1^2 = 9 - 1 = 8$.",
     "$5$ matches neither $3^2$ nor the difference $9 - 1$. Check the calculation again.",
     "$4$ matches neither $3^2$ nor $1^2$. Check the squaring."
    ]
   }
  ]
 },
 "ma3c-5.5": {
  "kalla": "a88e14ed45",
  "data": [
   {
    "question": "Which command do you use in GeoGebra to find an antiderivative of a given function?",
    "choices": [
     "Solve( Function )",
     "Derivative( Function )",
     "Integral( Function, Start *x*-Value, End *x*-Value )",
     "Integral( Function )"
    ],
    "correct": 3,
    "why": [
     "Solve is used to solve equations, not to find antiderivatives.",
     "Derivative gives the derivative of the function: the opposite operation to integrating.",
     "That command also has two limits and is used to calculate the value of the integral, not to find an antiderivative.",
     "If you enter only the function expression, without limits, the command gives an antiderivative."
    ]
   },
   {
    "question": "What is the difference between using the command Integral( Function ) in standard mode and in CAS mode?",
    "choices": [
     "Standard mode gives an exact answer, CAS mode gives an approximate value",
     "CAS mode only works for quadratic functions",
     "Standard mode gives a single antiderivative, CAS mode gives all antiderivatives (with the constant $c_1$)",
     "They always give exactly the same answer"
    ],
    "correct": 2,
    "why": [
     "The difference between an exact answer and an approximate value applies to the command with limits of integration. Without limits, the difference is instead the constant $c_1$.",
     "The command works for polynomial functions of any degree, not just quadratic functions.",
     "CAS mode adds the arbitrary constant $c_1$ and thereby describes the whole family of antiderivatives, while standard mode only gives one of them.",
     "The answers differ precisely in that the CAS mode answer contains $c_1$."
    ]
   },
   {
    "question": "With the command Integral( Function, Start *x*-Value, End *x*-Value ) in standard mode, what type of answer do you get?",
    "choices": [
     "An exact answer, for example in fraction form",
     "An approximate value (an approximate decimal number)",
     "A relationship between two variables",
     "An antiderivative without limits"
    ],
    "correct": 1,
    "why": [
     "An exact answer, for example as a fraction, is what you get in CAS mode instead.",
     "In standard mode GeoGebra calculates the integral numerically and gives an approximate decimal number.",
     "The answer is a single number (the value of the integral between the limits), not a relationship.",
     "The command has two limits of integration entered, so the answer is a number, not a function."
    ]
   },
   {
    "question": "With the same command, Integral( Function, Start *x*-Value, End *x*-Value ), but in CAS mode, what type of answer do you get?",
    "choices": [
     "An exact answer, for example in fraction form",
     "An approximate value (an approximate decimal number)",
     "An antiderivative without limits",
     "Always an integer"
    ],
    "correct": 0,
    "why": [
     "CAS mode calculates symbolically and gives the exact value of the integral, for example as a fraction.",
     "An approximate decimal number is what standard mode gives, not CAS mode.",
     "The limits are entered in the command, so the answer is the value of the integral, not an antiderivative.",
     "The answer may well be a fraction or an expression with a root. It does not have to be an integer."
    ]
   },
   {
    "question": "In CAS mode, a digital tool gives $\\displaystyle\\int_1^5 (x^2 - 4)\\, dx = \\dfrac{76}{3}$. What answer would the same integral give in standard mode?",
    "choices": [
     "$76$",
     "$\\approx 25.3$",
     "$\\dfrac{3}{76}$",
     "$\\dfrac{76}{3}$, exactly as in CAS mode"
    ],
    "correct": 1,
    "why": [
     "That is the numerator of the exact answer, not the value of the integral or its approximate value.",
     "Standard mode gives the same number as CAS mode, but as a numerical approximation: $\\dfrac{76}{3} \\approx 25.3$.",
     "That is the fraction upside down, not the value of the integral.",
     "The exact fraction is what CAS mode gives. Standard mode instead rounds to a decimal number."
    ]
   }
  ]
 },
 "ma3c-5.6": {
  "kalla": "4ac4887cc0",
  "data": [
   {
    "question": "How is the area between two curves $f(x)$ and $g(x)$ on the interval $[a, b]$ calculated, if $f(x) \\geq g(x)$ on the whole interval?",
    "choices": [
     "$A = f(b) - f(a) - (g(b) - g(a))$",
     "$A = \\int_a^b (f(x) - g(x))\\, dx$",
     "$A = \\int_a^b (g(x) - f(x))\\, dx$",
     "$A = \\int_a^b f(x)\\, dx + \\int_a^b g(x)\\, dx$"
    ],
    "correct": 1,
    "why": [
     "You cannot just subtract function values at the endpoints: the whole difference $f(x) - g(x)$ must be integrated over the interval.",
     "That is right: the area is given by the integral of the upper function minus the lower function.",
     "It is the other way round: since $f(x)$ is the upper function it should come first in the difference, otherwise the integral becomes negative.",
     "That gives the sum of the areas under each curve separately, not the area between them. The lower area should be subtracted, not added."
    ]
   },
   {
    "question": "Why do we subtract the integral of the lower function from the integral of the upper function when calculating the area between two curves?",
    "choices": [
     "Because otherwise the area always becomes negative",
     "It is just a calculation rule with no geometric meaning",
     "The area under the upper curve also contains the area under the lower curve, which must be removed",
     "To avoid using integrals at all"
    ],
    "correct": 2,
    "why": [
     "The area only becomes negative if you happen to subtract in the wrong order (lower minus upper), not as a consequence of the method itself.",
     "The subtraction has a clear geometric interpretation: the upper area minus the lower area leaves the area between the curves.",
     "Exactly: the integral of $f(x)$ gives the area between $f(x)$ and the *x*-axis, which also includes the area under $g(x)$. If you subtract that, only the area between the curves remains.",
     "On the contrary, the method is built entirely on integrating both functions."
    ]
   },
   {
    "question": "The curves $y = f(x)$ and $y = g(x)$ are to be integrated between their points of intersection, but no limits are given in the task. How are the limits of integration $a$ and $b$ found?",
    "choices": [
     "By differentiating $f(x) - g(x)$ and setting it equal to zero",
     "The limits can be chosen arbitrarily",
     "By setting $f(x) = 0$ and $g(x) = 0$",
     "By setting $f(x) = g(x)$ and solving the equation"
    ],
    "correct": 3,
    "why": [
     "That instead gives the stationary points of the difference function, not the points of intersection between the curves.",
     "The limits must be the points of intersection. Otherwise you integrate over a region where the curves no longer bound each other in that way.",
     "That gives the zeros of each curve (where they cross the *x*-axis), not where they cross each other.",
     "That is right: where the curves intersect, $f(x) = g(x)$, and the solutions to that equation give the limits of integration."
    ]
   },
   {
    "question": "A region is bounded by three curves so that the upper function changes in the middle of the interval (for example first a straight line, then a parabola). How is the total area calculated?",
    "choices": [
     "Split the interval at the point of change, calculate each partial area separately and add them",
     "Calculate only the area in one of the parts: the other does not contribute",
     "Integrate over the whole interval with the function that is the upper function for the largest part of the interval",
     "Integrate the difference between the two upper functions"
    ],
    "correct": 0,
    "why": [
     "Exactly: each subinterval has its own upper and lower function, so $A_1$ and $A_2$ are calculated separately and added: $A = A_1 + A_2$.",
     "Both parts contribute to the total area. No part can be left out.",
     "That gives the wrong result in the part of the interval where that function is no longer the upper one.",
     "The two \"upper\" functions apply in different subintervals, not at the same time. They should not be subtracted from each other."
    ]
   },
   {
    "question": "What is the difference between calculating the area between two curves in GeoGebra's CAS mode and in the standard view with the command IntegralBetween?",
    "choices": [
     "CAS mode gives an approximate value, the standard view gives an exact answer",
     "CAS mode can only be used for one curve at a time",
     "CAS mode gives an exact answer, the standard view gives an approximate value",
     "There is no difference: both give exactly the same kind of answer"
    ],
    "correct": 2,
    "why": [
     "It is the other way round: CAS mode gives exact answers, the standard view gives approximate values.",
     "IntegralBetween takes two function expressions, an upper and a lower, in both views, not just one.",
     "That is right: CAS mode calculates symbolically and gives exact answers (for example as fractions), while the standard view gives a numerical approximation.",
     "The command is the same, but CAS mode and the standard view interpret and present the result in different ways (exact versus numerical)."
    ]
   }
  ]
 },
 "ma3c-5.7": {
  "kalla": "20a6472f94",
  "data": [
   {
    "question": "In applications, what does an integral generally represent?",
    "choices": [
     "The derivative of the function at a given point",
     "The product of the dependent variable and the independent variable",
     "The mean value of the function over an interval",
     "The difference between the largest and smallest value of the function"
    ],
    "correct": 1,
    "why": [
     "It is the derivative $f'(a)$ that describes an instantaneous rate of change at a point: a completely different quantity from the integral.",
     "Exactly: an integral $\\int f(x)\\, dx$ is interpreted as the product of $f(x)$ (the dependent variable) and $x$ (the independent variable), which among other things gives the unit of the integral.",
     "A mean value is obtained by dividing the integral by the length of the interval, not from the integral alone.",
     "The difference between the largest and smallest value says nothing about the interpretation of the integral as a product."
    ]
   },
   {
    "question": "A function $f$ has the unit kg/s and the variable $x$ (time) has the unit seconds. What unit does $\\displaystyle\\int f(x)\\, dx$ have?",
    "choices": [
     "$\\text{kg} \\cdot \\text{s}^2$",
     "s",
     "kg/s",
     "kg"
    ],
    "correct": 3,
    "why": [
     "The units of seconds cancel against each other instead of being multiplied together into a square.",
     "That is the unit of the variable $x$, not of the whole integral.",
     "That is the unit of $f(x)$ itself, not of the integral: the s units should cancel.",
     "Correct: the unit of the integral is \"the unit of $f$\" $\\cdot$ \"the unit of $x$\", that is $\\dfrac{\\text{kg}}{\\text{s}} \\cdot \\text{s} = \\text{kg}$."
    ]
   },
   {
    "question": "Which relationship between distance $s(t)$, velocity $v(t)$ and acceleration $a(t)$ is correct?",
    "choices": [
     "$a(t) = \\displaystyle\\int v(t)\\, dt$ and $v(t) = \\displaystyle\\int s(t)\\, dt$",
     "$v(t) = s(t) \\cdot t$",
     "$a(t) = s(t) \\cdot v(t)$",
     "$v(t) = \\displaystyle\\int a(t)\\, dt$ and $s(t) = \\displaystyle\\int v(t)\\, dt$"
    ],
    "correct": 3,
    "why": [
     "This has the direction reversed: it is the velocity that is obtained by integrating the acceleration, not the other way round.",
     "Velocity and distance are not related by a simple multiplication by time unless the velocity is constant.",
     "Acceleration is not a product of distance and velocity; it is connected to them through differentiation and integration.",
     "Exactly: we integrate \"backwards\" from the acceleration to the velocity and on to the distance (the opposite of differentiating)."
    ]
   },
   {
    "question": "The velocity of a vehicle is given by $v(t)$ m/s. What does $\\displaystyle\\int_5^{12} v(t)\\, dt$ calculate?",
    "choices": [
     "The velocity of the vehicle at $t = 12$ s",
     "The acceleration of the vehicle between $t = 5$ s and $t = 12$ s",
     "The distance the vehicle travels between $t = 5$ s and $t = 12$ s",
     "The average velocity between $t = 5$ s and $t = 12$ s"
    ],
    "correct": 2,
    "why": [
     "The velocity at a certain moment is found by substituting the time into $v(t)$, not by integrating.",
     "The acceleration is found by differentiating the velocity, not by integrating it.",
     "Correct: the integral of the velocity between two times gives the distance travelled during that time interval.",
     "The average velocity is found by dividing the integral by the length of the time interval ($\\dfrac{1}{12-5}\\int_5^{12} v(t)\\, dt$), not from the integral alone."
    ]
   },
   {
    "question": "A company's rate of turnover is given by $K(t)$ kr/month. If $\\displaystyle\\int_0^{12} K(t)\\, dt = 3\\,000\\,000$, what does this mean?",
    "choices": [
     "The company's fixed costs are 3 000 000 kr",
     "The company needs 3 000 000 months to reach a certain turnover",
     "The company had a total turnover of 3 000 000 kr during the first 12 months",
     "The company's rate of turnover is 3 000 000 kr/month at $t = 12$"
    ],
    "correct": 2,
    "why": [
     "The integral of a rate of turnover says nothing about costs, only about the total turnover (revenue).",
     "The unit kr comes from kr/month $\\cdot$ month: the number 3 000 000 is a sum of money, not a number of months.",
     "Exactly: the integral of a rate of turnover (kr/month) over a time interval (months) gives the total turnover in kronor during the interval.",
     "It would be $K(12)$, not the integral, that gave the rate of turnover at a single moment, and 3 000 000 is also unreasonably large for a rate."
    ]
   }
  ]
 },
 "ma3c-6.1": {
  "kalla": "7ecde93e11",
  "data": [
   {
    "question": "In a right-angled triangle, which side is called the hypotenuse?",
    "choices": [
     "The side opposite the angle $v$",
     "Any of the three sides, depending on how you measure",
     "The side opposite the right angle (the longest side)",
     "The side that together with the hypotenuse forms the angle $v$"
    ],
    "correct": 2,
    "why": [
     "That describes the opposite side, not the hypotenuse.",
     "The hypotenuse is a definite side: always the one opposite the right angle, however the triangle is turned.",
     "Exactly: the hypotenuse always lies opposite the right angle and is the longest side of the triangle.",
     "That describes the adjacent side, not the hypotenuse."
    ]
   },
   {
    "question": "Which relation defines $\\cos v$ in a right-angled triangle?",
    "choices": [
     "$\\cos v = \\dfrac{\\text{opposite side}}{\\text{adjacent side}}$",
     "$\\cos v = \\dfrac{\\text{opposite side}}{\\text{hypotenuse}}$",
     "$\\cos v = \\dfrac{\\text{adjacent side}}{\\text{hypotenuse}}$",
     "$\\cos v = \\dfrac{\\text{hypotenuse}}{\\text{adjacent side}}$"
    ],
    "correct": 2,
    "why": [
     "That ratio defines $\\tan v$, not $\\cos v$.",
     "That ratio defines $\\sin v$, not $\\cos v$.",
     "Cosine is the ratio of the adjacent side to the hypotenuse.",
     "The fraction is upside down: the hypotenuse is always in the denominator for both sine and cosine."
    ]
   },
   {
    "question": "You know the opposite and the adjacent side to the angle $v$ and want to find $v$. Which function (and its inverse) do you use?",
    "choices": [
     "Tangent: $v = \\tan^{-1}\\!\\left(\\dfrac{\\text{opposite}}{\\text{adjacent}}\\right)$",
     "Cosine: $v = \\cos^{-1}\\!\\left(\\dfrac{\\text{opposite}}{\\text{adjacent}}\\right)$",
     "None of the functions works without the hypotenuse",
     "Sine: $v = \\sin^{-1}\\!\\left(\\dfrac{\\text{opposite}}{\\text{adjacent}}\\right)$"
    ],
    "correct": 0,
    "why": [
     "Tangent is exactly the ratio of the opposite side to the adjacent side, so $\\tan^{-1}$ of that ratio gives $v$ directly.",
     "Cosine requires the hypotenuse, not the opposite side in the numerator.",
     "Tangent links precisely the two shorter sides to each other: the hypotenuse is never needed in that relation.",
     "Sine requires the hypotenuse in the denominator, not the adjacent side."
    ]
   },
   {
    "question": "What does the inverse function $\\tan^{-1}$ (arctan) do?",
    "choices": [
     "It gives the angle $v$ when the ratio of the opposite side to the adjacent side is known",
     "It only works for angles greater than 90°",
     "It gives the ratio between the shorter sides when the angle $v$ is known",
     "It is the same thing as $\\dfrac{1}{\\tan v}$"
    ],
    "correct": 0,
    "why": [
     "That is right: $\\tan^{-1}$ \"reverses\" tangent, taking a ratio of sides as input and giving an angle as the result.",
     "On the contrary: in a right-angled triangle the acute angles are always less than 90°, and it is precisely for such angles that $\\tan^{-1}$ is used here.",
     "That is exactly what $\\tan v$ itself does (without the inverse). The inverse goes the other way.",
     "A common confusion: despite the notation $\\tan^{-1}$, it does NOT mean $1/\\tan v$, but the inverse function of tangent."
    ]
   },
   {
    "question": "A right-angled triangle has the hypotenuse 10 cm and the angle $v = 30°$. Which formula gives the opposite side $a$?",
    "choices": [
     "$a = 10 \\cdot \\tan 30°$",
     "$a = 10 \\cdot \\cos 30°$",
     "$a = 10 \\cdot \\sin 30°$",
     "$a = 10 / \\sin 30°$"
    ],
    "correct": 2,
    "why": [
     "Tangent links the two shorter sides to each other, not a shorter side to the hypotenuse.",
     "That expression gives the adjacent side, not the opposite side.",
     "Since $\\sin v = \\dfrac{a}{\\text{hypotenuse}}$, multiplying by the hypotenuse gives exactly the opposite side.",
     "Division instead of multiplication would give a length LONGER than the hypotenuse: impossible for one of the shorter sides."
    ]
   }
  ]
 },
 "ma3c-6.2": {
  "kalla": "bbd6f0c462",
  "data": [
   {
    "question": "What is a unit circle?",
    "choices": [
     "A circle that only passes through integer points",
     "A circle with radius 1 and any centre",
     "A circle with radius 1 and its centre at the origin",
     "A circle with circumference 1"
    ],
    "correct": 2,
    "why": [
     "All points on the edge of the circle count, not just integer points.",
     "The centre must be at the origin for the coordinates to be $\\cos v$ and $\\sin v$.",
     "Exactly: radius 1 and centre at the origin. That means a point on the circle directly gives the cosine and sine values.",
     "It is the radius, not the circumference, that is 1."
    ]
   },
   {
    "question": "An angle $v$ gives the point $(x, y)$ on the unit circle. What is $\\cos v$?",
    "choices": [
     "The $x$-coordinate",
     "The ratio $y/x$",
     "The distance to the origin",
     "The $y$-coordinate"
    ],
    "correct": 0,
    "why": [
     "On the unit circle $\\cos v = x$ and $\\sin v = y$: cosine is always the $x$-coordinate.",
     "The ratio $y/x$ is $\\tan v$.",
     "The distance to the origin is the radius, which is always $1$.",
     "The $y$-coordinate is $\\sin v$, not $\\cos v$."
    ]
   },
   {
    "question": "How is a positive angle measured in the unit circle?",
    "choices": [
     "Anticlockwise from the positive $y$-axis",
     "Clockwise from the positive $x$-axis",
     "From the nearest axis",
     "Anticlockwise from the positive $x$-axis"
    ],
    "correct": 3,
    "why": [
     "The angle is measured from the $x$-axis, not the $y$-axis.",
     "Clockwise instead corresponds to a negative angle.",
     "The angle is always measured from the positive $x$-axis, not from the nearest axis.",
     "A positive angle starts at the positive $x$-axis and turns anticlockwise."
    ]
   },
   {
    "question": "The angle $v$ and the angle $-v$ give two points on the unit circle. How are they related to each other?",
    "choices": [
     "The point for $-v$ is a reflection in the $y$-axis",
     "The point for $-v$ is a reflection in the $x$-axis of the point for $v$",
     "The points lie on opposite sides of the origin",
     "The points are identical"
    ],
    "correct": 1,
    "why": [
     "Reflection in the $y$-axis would change the sign of $\\cos v$, but it is $\\sin v$ that changes sign.",
     "A negative angle turns clockwise, so the point is reflected in the $x$-axis: $\\cos v$ is unchanged but $\\sin v$ changes sign.",
     "Diametrically opposite points instead go with $v$ and $v + 180^\\circ$.",
     "The points only coincide if $v = 0^\\circ$."
    ]
   },
   {
    "question": "Why does $360^\\circ + v$ give the same point on the unit circle as $v$?",
    "choices": [
     "It is not true: the points are different",
     "Because sine is always $0$ at $360^\\circ$",
     "A full turn is $360^\\circ$, so you end up back at the same point",
     "Because $360^\\circ$ is a straight angle times two"
    ],
    "correct": 2,
    "why": [
     "The points coincide: the whole point of the periodicity is that $v$ and $360^\\circ + v$ give the same point.",
     "The sine value of an angle depends on the $y$-coordinate of the point, not on passing $360^\\circ$.",
     "Adding $360^\\circ$ means a full turn around the circle, back to exactly the same point.",
     "A full turn is $360^\\circ$, not a straight angle times two."
    ]
   }
  ]
 },
 "ma3c-6.3": {
  "kalla": "64731d4de9",
  "data": [
   {
    "question": "What is an equation that contains sine, cosine or tangent called?",
    "choices": [
     "An exponential equation",
     "A trigonometric equation",
     "A linear equation",
     "A quadratic equation"
    ],
    "correct": 1,
    "why": [
     "An exponential equation has the unknown in the exponent, for example $a^x = b$: not the same thing.",
     "Exactly: equations with the trigonometric functions are called trigonometric equations.",
     "A linear equation only contains $x$ to the first degree, no trigonometric function.",
     "A quadratic equation contains a term with $x^2$, not trigonometric functions."
    ]
   },
   {
    "question": "How do you solve the equation $\\sin v = a$ using the unit circle?",
    "choices": [
     "You draw a vertical line at $x = a$ and read off where it crosses the circle",
     "You draw a horizontal line at $y = a$ and read off where it crosses the circle",
     "You draw a new circle with radius $a$",
     "You draw a line through the origin with slope $a$"
    ],
    "correct": 1,
    "why": [
     "A vertical line at $x = a$ is used to solve $\\cos v = a$, not $\\sin v = a$.",
     "Sine corresponds to the $y$-coordinate on the unit circle, so a horizontal line at $y = a$ shows where $\\sin v = a$.",
     "The radius of the unit circle is always 1, whatever $a$-value the equation has.",
     "That is not the method: the unit circle always has radius 1, and the equation is solved with a horizontal line, not a line through the origin."
    ]
   },
   {
    "question": "The calculator gives $v_1$ as a solution to the equation $\\sin v = a$. How is the second solution $v_2$ in the interval $0^\\circ$–$360^\\circ$ found?",
    "choices": [
     "$v_2 = 90^\\circ - v_1$",
     "$v_2 = v_1 + 180^\\circ$",
     "$v_2 = 360^\\circ - v_1$",
     "$v_2 = 180^\\circ - v_1$"
    ],
    "correct": 3,
    "why": [
     "This relationship is not true for either sine or cosine.",
     "Adding $180^\\circ$ gives an angle in the opposite quadrant, where sine has the opposite sign. Sine has the same value in the first and second quadrants, which is why $v_2 = 180^\\circ - v_1$.",
     "That relationship applies to cosine equations, not to sine equations.",
     "For sine equations the relationship $v_2 = 180^\\circ - v_1$ applies, since sine has the same value in the first and second quadrants."
    ]
   },
   {
    "question": "The calculator gives $v_1$ as a solution to the equation $\\cos v = a$. How is the second solution $v_2$ in the interval $0^\\circ$–$360^\\circ$ found?",
    "choices": [
     "$v_2 = 2v_1$",
     "$v_2 = 360^\\circ - v_1$",
     "$v_2 = v_1 - 360^\\circ$",
     "$v_2 = 180^\\circ - v_1$"
    ],
    "correct": 1,
    "why": [
     "There is no relationship saying that $v_2$ is twice as large as $v_1$.",
     "For cosine equations the relationship $v_2 = 360^\\circ - v_1$ applies, since cosine has the same value when reflected in the $x$-axis.",
     "That gives a negative number for all solutions $v_1$ in the interval $0^\\circ$–$360^\\circ$, which ends up outside the interval.",
     "That relationship applies to sine equations, not to cosine equations."
    ]
   },
   {
    "question": "The equation $\\cos v = 1.8$ is to be solved in the interval $0^circ$–$360^circ$. What applies?",
    "choices": [
     "The equation has infinitely many solutions in the interval",
     "The equation has no solution, since $1.8 > 1$",
     "The equation has exactly one solution",
     "The equation has two solutions, just like all cosine equations"
    ],
    "correct": 1,
    "why": [
     "Trigonometric equations can have infinitely many solutions if you allow all turns around the circle, but here there is no solution at all because the $a$-value is too large.",
     "The radius of the unit circle is 1, so $\\cos v$ can never take a value greater than 1. The line $x = 1.8$ lies entirely outside the circle.",
     "The equation has no solution at all, since $1.8$ lies outside the range of cosine, $[-1, 1]$.",
     "That is only true when $|a| < 1$: here $a = 1.8$ is too large to give any solution."
    ]
   }
  ]
 },
 "ma3c-6.4": {
  "kalla": "a039cc7c2a",
  "data": [
   {
    "question": "Which inverse function do we use to solve the equation $\\tan v = a$?",
    "choices": [
     "$\\tan^{-1}$",
     "$\\cos^{-1}$",
     "$\\sin^{-1}$",
     "None: tangent equations cannot be solved"
    ],
    "correct": 0,
    "why": [
     "Just as $\\sin^{-1}$ and $\\cos^{-1}$ solve their equations, $\\tan^{-1}$ solves the equation $\\tan v = a$.",
     "$\\cos^{-1}$ belongs to the equation $\\cos v = a$.",
     "$\\sin^{-1}$ belongs to the equation $\\sin v = a$, not $\\tan v = a$.",
     "Tangent equations are solved with the inverse function $\\tan^{-1}$."
    ]
   },
   {
    "question": "What is the period of the tangent function?",
    "choices": [
     "$360^\\circ$",
     "$270^\\circ$",
     "$90^\\circ$",
     "$180^\\circ$"
    ],
    "correct": 3,
    "why": [
     "$360^\\circ$ is the period of sine and cosine, not of tangent.",
     "The period is $180^\\circ$, not $270^\\circ$.",
     "Tangent does not repeat itself as early as after $90^\\circ$.",
     "Tangent repeats itself every $180^\\circ$ because $\\tan(v + 180^\\circ) = \\tan v$: a line through the origin and its extension have the same slope."
    ]
   },
   {
    "question": "You have found a solution $v_1 = 40^\\circ$ to a tangent equation. How do you get the next solution in the interval $0^\\circ \\leq v \\leq 360^\\circ$?",
    "choices": [
     "Add $360^\\circ$: $v_2 = 400^\\circ$",
     "Take $90^\\circ - 40^\\circ = 50^\\circ$",
     "Add the period $180^\\circ$: $v_2 = 220^\\circ$",
     "Take $180^\\circ - 40^\\circ = 140^\\circ$"
    ],
    "correct": 2,
    "why": [
     "Adding $360^\\circ$ gives an angle outside the interval and misses the solution at $220^\\circ$.",
     "$90^\\circ - v$ has nothing to do with the solutions of tangent equations.",
     "Tangent has the period $180^\\circ$, so the next solution is obtained by adding $180^\\circ$.",
     "$180^\\circ - v$ is the rule for sine equations, not tangent equations."
    ]
   },
   {
    "question": "Why does tangent repeat itself after only $180^\\circ$ and not after $360^\\circ$?",
    "choices": [
     "Because tangent is only defined between $0^\\circ$ and $180^\\circ$",
     "Because $\\tan(v + 180^\\circ) = \\dfrac{-\\sin v}{-\\cos v} = \\tan v$",
     "Because tangent is always positive",
     "Because $180^\\circ$ is half a turn and sine is then zero"
    ],
    "correct": 1,
    "why": [
     "Tangent is defined for all angles except where $\\cos v = 0$.",
     "At $v + 180^\\circ$ both $\\sin v$ and $\\cos v$ change sign, and the quotient is therefore unchanged: the same tangent value.",
     "Tangent can be both positive and negative.",
     "That sine is zero at $180^\\circ$ does not explain the periodicity: it is the change of sign in both the numerator and the denominator that does."
    ]
   },
   {
    "question": "An equation $\\tan v = a$ is to be solved in the interval $0^\\circ \\leq v \\leq 360^\\circ$. How many solutions does it usually have?",
    "choices": [
     "Two: a basic solution and one more after half a turn",
     "Only one",
     "None",
     "Four"
    ],
    "correct": 0,
    "why": [
     "With the period $180^\\circ$, two solutions fit in a $360^\\circ$ interval: the basic solution and the basic solution plus $180^\\circ$.",
     "A single solution misses the second one that lies half a turn away.",
     "Tangent takes every value, so the equation is not without a solution.",
     "Four solutions would require an interval of $720^\\circ$."
    ]
   }
  ]
 },
 "ma3c-6.5": {
  "kalla": "a74280952a",
  "data": [
   {
    "question": "What information do you need to know to calculate the area of a triangle with the area theorem?",
    "choices": [
     "One angle and the perimeter of the triangle",
     "Two sides and the angle between them (the included angle)",
     "The base and height of the triangle",
     "All three sides"
    ],
    "correct": 1,
    "why": [
     "The perimeter gives no information about the angles or about how the sides relate to each other.",
     "Exactly: the area theorem $T = \\dfrac{ab\\sin C}{2}$ only requires two sides and the angle between them, no height.",
     "The whole point of the area theorem is to avoid needing to know the height. It is instead calculated using the sine of the included angle.",
     "Three sides are enough (there are other formulas for that), but the area theorem is for the case with two sides and an included angle."
    ]
   },
   {
    "question": "In a triangle $ABC$, the angle $B$ is the included angle of which two sides?",
    "choices": [
     "$a$ and $b$",
     "All three sides",
     "$a$ and $c$",
     "$b$ and $c$"
    ],
    "correct": 2,
    "why": [
     "The side $b$ lies opposite the angle $B$, so it does not meet at vertex $B$ and is not one of the enclosing sides.",
     "Only two sides meet at each vertex, not all three.",
     "The sides $a$ and $c$ meet at vertex $B$, so these are the sides that enclose the angle $B$.",
     "The side $b$ is the opposite side to the angle $B$, not one of its enclosing sides."
    ]
   },
   {
    "question": "A triangle has the sides $a = 4.0$ cm and $b = 6.0$ cm with the included angle $C = 30^\\circ$. What is the area of the triangle?",
    "choices": [
     "$12$ cm²",
     "$24$ cm²",
     "$3.0$ cm²",
     "$6.0$ cm²"
    ],
    "correct": 3,
    "why": [
     "This is $ab\\sin C$ without dividing by 2. Do not forget the denominator in the area theorem.",
     "This is just $a \\cdot b$, without taking $\\sin C$ into account at all.",
     "This has been divided by 2 once too often: the area theorem only has one 2 in the denominator.",
     "Correct: $T = \\dfrac{ab\\sin C}{2} = \\dfrac{4.0 \\cdot 6.0 \\cdot \\sin 30^\\circ}{2} = 6.0$ cm²."
    ]
   },
   {
    "question": "A triangle has the area $12$ cm². Two sides are $6.0$ cm and $8.0$ cm. How many possible values are there for the included angle?",
    "choices": [
     "Only one: about $30^\\circ$",
     "Only one: about $150^\\circ$",
     "Two: about $30^\\circ$ and $150^\\circ$",
     "No value is possible"
    ],
    "correct": 2,
    "why": [
     "The obtuse solution $150^\\circ$ is just as valid: sine is positive for both acute and obtuse angles.",
     "The acute solution $30^\\circ$ is just as valid as the obtuse one.",
     "Correct: $\\sin C = 0.5$ gives $C \\approx 30^\\circ$ or $C \\approx 150^\\circ$, and unlike with the sine rule there is no angle sum here that rules out either of them.",
     "The equation $\\sin C = 0.5$ has two solutions between $0^\\circ$ and $180^\\circ$, so the angle can be found."
    ]
   },
   {
    "question": "In the proof of the area theorem, a height $h$ is drawn from a vertex down to the opposite side, forming a right-angled triangle. Which relation is used there to express $h$ in terms of the side $b$ and the angle $A$?",
    "choices": [
     "$h = \\dfrac{b}{\\sin A}$",
     "$h = a\\sin A$",
     "$h = b\\sin A$",
     "$h = b\\cos A$"
    ],
    "correct": 2,
    "why": [
     "Dividing instead of multiplying turns the relation upside down: $\\sin A = h/b$ gives $h = b\\sin A$, not $b/\\sin A$.",
     "The height is expressed in terms of the side $b$ (the hypotenuse in the small right-angled triangle), not the side $a$.",
     "Correct: in the right-angled triangle $\\sin A = \\dfrac{h}{b}$, which gives $h = b\\sin A$.",
     "The cosine of $A$ instead gives the other leg of the right-angled triangle (the distance along the base), not the height."
    ]
   }
  ]
 },
 "ma3c-6.6": {
  "kalla": "d81184794a",
  "data": [
   {
    "question": "What does the sine rule say about a triangle $ABC$?",
    "choices": [
     "$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$",
     "$a^2 = b^2 + c^2 - 2bc\\cos A$",
     "$\\dfrac{a}{b} = \\dfrac{c}{a}$",
     "$a + b + c = 180^\\circ$"
    ],
    "correct": 0,
    "why": [
     "That is right: the ratio of a side to the sine of its opposite angle is the same for all three sides.",
     "That is the cosine rule, not the sine rule.",
     "The sine rule links sides to the sines of their opposite angles, not sides directly to each other.",
     "Here it is the sides that are added: it is the angles of a triangle that add up to $180^\\circ$."
    ]
   },
   {
    "question": "In the sine rule, which angle goes with the side $a$?",
    "choices": [
     "The largest angle",
     "The angle $B$, next to the side $a$",
     "The angle $C$",
     "The angle $A$, opposite the side $a$"
    ],
    "correct": 3,
    "why": [
     "The link is with the opposite angle, whether or not it is the largest.",
     "It is the opposite angle, not the adjacent one, that goes with the side.",
     "The angle $C$ goes with the side $c$, not $a$.",
     "The side $a$ is paired with its opposite angle $A$ in the ratio $\\dfrac{a}{\\sin A}$."
    ]
   },
   {
    "question": "In which case can you use the sine rule?",
    "choices": [
     "Only in right-angled triangles",
     "When only the three sides are known",
     "When two sides and the included angle are known",
     "When one side and two angles are known"
    ],
    "correct": 3,
    "why": [
     "The sine rule applies to all triangles, not just right-angled ones.",
     "With only three sides the cosine rule is needed: the sine rule is not enough.",
     "Two sides and the included angle are solved with the cosine rule.",
     "With one side and two angles (and therefore the third), the sine rule can give the other sides."
    ]
   },
   {
    "question": "To find a side with the sine rule, you need to know...",
    "choices": [
     "Only two sides",
     "All three angles but no side",
     "The area of the triangle",
     "The angle opposite the side, plus another side–angle pair"
    ],
    "correct": 3,
    "why": [
     "Two sides without their corresponding angles are not enough for the sine rule.",
     "Without at least one known side the size of the triangle cannot be found: the angles alone only give the shape.",
     "The area is not needed to apply the sine rule.",
     "The sine rule links two side–angle pairs, so you need the angle opposite the side you are looking for plus one known pair."
    ]
   },
   {
    "question": "When you solve $\\sin A = 0.77$ for an angle in a triangle, there may be two candidates. Why?",
    "choices": [
     "The sine function can give two different values for the same angle",
     "The calculator rounds incorrectly",
     "The triangle must be equilateral",
     "Both an acute and an obtuse angle have the same sine value"
    ],
    "correct": 3,
    "why": [
     "Sine gives a definite value for a given angle; it is the reverse, the same sine value for two angles, that causes the ambiguity.",
     "It is not about rounding but about sine being positive in two quadrants.",
     "The ambiguous situation has nothing to do with equilateral triangles.",
     "Sine is positive for both acute and obtuse angles, so $A$ and $180^\\circ - A$ give the same sine value. You must test whether both give a valid triangle."
    ]
   }
  ]
 },
 "ma3c-6.7": {
  "kalla": "6a9ed72a92",
  "data": [
   {
    "question": "In a triangle $ABC$ with the sides $a$, $b$ and $c$, which expression is the cosine rule for the side $c$?",
    "choices": [
     "$c^2 = a^2 + b^2 + 2ab\\cos C$",
     "$c^2 = a^2 + b^2 - 2ab\\sin C$",
     "$c = a + b - 2ab\\cos C$",
     "$c^2 = a^2 + b^2 - 2ab\\cos C$"
    ],
    "correct": 3,
    "why": [
     "The sign in front of $2ab\\cos C$ should be minus, not plus. Otherwise the formula does not work when $C = 0^\\circ$ (the triangle \"collapses\" and $c$ should be $b - a$, not $a + b$).",
     "The cosine rule contains $\\cos C$, not $\\sin C$: it is precisely the cosine function that gives the relationship between the sides and the included angle.",
     "The left-hand side should be $c^2$, not $c$: the relationship concerns the squares of the sides, not the sides themselves.",
     "Exactly: the square of the side opposite an angle is the sum of the squares of the other sides minus $2ab\\cos C$."
    ]
   },
   {
    "question": "In which situation can the cosine rule be used, but NOT the sine rule?",
    "choices": [
     "When two sides and an angle that is not the included angle are known",
     "When all three sides are known, but no angle",
     "When the perimeter of the triangle is known",
     "When one side and two angles are known"
    ],
    "correct": 1,
    "why": [
     "Two sides and an angle that is not the included angle is also a case for the sine rule, not the cosine rule.",
     "The sine rule requires a known angle–side pair (an angle and its opposite side). If you only know three sides there is no such pair, and the cosine rule is needed.",
     "The perimeter alone (the sum of the sides) is not enough to determine the triangle uniquely, and it is not the situation that distinguishes the rules.",
     "It is exactly the other way round: one side and two angles is the classic use of the sine rule, not of the cosine rule."
    ]
   },
   {
    "question": "A triangle $ABC$ has the sides $a = 6$ cm and $b = 9$ cm, with the angle $C = 40^\\circ$ between them. Which quantity can be found directly with the cosine rule, without intermediate steps?",
    "choices": [
     "The angle $A$",
     "The area of the triangle",
     "The angle $B$",
     "The side $c$, opposite the angle $C$"
    ],
    "correct": 3,
    "why": [
     "The angle $A$ requires the side $c$ to be known first (so that all three sides are known), so it is a two-step problem.",
     "The area requires knowing a height or uses a different formula (for example $\\dfrac{1}{2}ab\\sin C$). That is not what the cosine rule gives directly.",
     "Just as for $A$, the side $c$ is needed before $B$ can be found with the cosine or sine rule.",
     "With two sides and the included angle known, the cosine rule $c^2 = a^2 + b^2 - 2ab\\cos C$ gives the side $c$ in a single step."
    ]
   },
   {
    "question": "Why is the cosine rule recommended over the sine rule when you are to find an angle and all three sides are known?",
    "choices": [
     "The cosine rule is always simpler to calculate by hand",
     "The sine rule only works in right-angled triangles",
     "Cosine is unambiguous in the interval $0^\\circ$–$180^\\circ$, so $\\cos^{-1}$ always gives the correct angle directly",
     "The cosine rule does not require you to know any sides at all"
    ],
    "correct": 2,
    "why": [
     "The calculations are about equally extensive for both rules. The advantage of the cosine rule lies in the lack of ambiguity, not in simplicity.",
     "Both the sine rule and the cosine rule apply to any triangle, not just right-angled ones.",
     "Cosine is a one-to-one function between $0^\\circ$ and $180^\\circ$, while sine gives the same value for an acute angle and its obtuse supplementary angle. The sine rule can therefore give a false solution that must be checked and rejected.",
     "On the contrary, the cosine rule requires you to know the sides (and/or angles) of the triangle. It cannot be used completely without information."
    ]
   },
   {
    "question": "Which relation does the cosine rule give for the side $a$ (opposite the angle $A$)?",
    "choices": [
     "$a^2 = b^2 + c^2 - 2bc\\cos A$",
     "$a^2 = b^2 + c^2 - 2ab\\cos A$",
     "$a^2 = b^2 - c^2 - 2bc\\cos A$",
     "$a^2 = a^2 + c^2 - 2ac\\cos A$"
    ],
    "correct": 0,
    "why": [
     "Just as in $c^2 = a^2 + b^2 - 2ab\\cos C$, the sides are swapped cyclically: for $a^2$ the OTHER two sides $b$ and $c$ are used together with $\\cos A$.",
     "The product term should contain exactly the two sides that are NOT $a$, that is $b$ and $c$, not $a$ and $b$.",
     "The sign between $b^2$ and $c^2$ should be plus, not minus: the cosine rule is a sum of the squares minus twice the product term.",
     "The left-hand side may not appear again on the right-hand side ($a^2$ on both sides is wrong): the right-hand side should consist of the squares of the other two sides."
    ]
   }
  ]
 },
 "ma3c-6.8": {
  "kalla": "23fba2ca72",
  "data": [
   {
    "question": "What are the area theorem, the sine rule and the cosine rule called together?",
    "choices": [
     "The triangle theorems",
     "The trigonometric equations",
     "The theorems of the unit circle",
     "The angle sum"
    ],
    "correct": 0,
    "why": [
     "That is right: the three theorems are together called the triangle theorems, because they all describe relationships between sides and angles in a triangle.",
     "Trigonometric equations are solved with sine, cosine and tangent in the unit circle. That is not the same as the theorems about sides and angles in a triangle.",
     "The unit circle defines the trigonometric functions, but the area theorem, the sine rule and the cosine rule have no collective name linked to it.",
     "The angle sum ($180^\\circ$ in a triangle) is a single rule, not the collective name for the three theorems."
    ]
   },
   {
    "question": "A triangle has two known sides and the included angle known. Which theorem is most suitable for finding the third side?",
    "choices": [
     "The cosine rule",
     "The angle sum of a triangle",
     "The area theorem",
     "The sine rule"
    ],
    "correct": 0,
    "why": [
     "The cosine rule links three sides and one angle, so it works directly as soon as two sides and the included angle are known.",
     "The angle sum gives a third angle if two angles are known. Here it is sides, not angles, that are missing.",
     "The area theorem gives the area of the triangle, not the length of a side.",
     "The sine rule requires a known pair of an angle and its opposite side. Here we know no angle that lies opposite one of the known sides."
    ]
   },
   {
    "question": "A triangle has one side and two angles known. Which theorem is used to find one of the other sides?",
    "choices": [
     "The area theorem",
     "Pythagoras' theorem",
     "The sine rule",
     "The cosine rule"
    ],
    "correct": 2,
    "why": [
     "The area theorem gives the area, not the length of a single side.",
     "Pythagoras' theorem only applies in right-angled triangles, which is not given here.",
     "With one side and two angles known (which gives all three angles via the angle sum), the sine rule $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}$ gives the other sides directly.",
     "The cosine rule requires two known sides to solve for a third side or an angle. Here only one side is known."
    ]
   },
   {
    "question": "All three sides of a triangle are known, but no angle. Which theorem can be used to find an angle?",
    "choices": [
     "The cosine rule",
     "No theorem works unless at least one angle is known",
     "The sine rule",
     "The area theorem"
    ],
    "correct": 0,
    "why": [
     "The cosine rule can be solved for the cosine term, for example $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$, so an angle can be found even when only the sides are known.",
     "The cosine rule works without any known angle, so an angle can in fact be found.",
     "The sine rule requires at least one angle to be known already in order to set up a relationship. We do not have that here.",
     "The area theorem requires a known angle to give the area, and in any case does not give an angle as the answer."
    ]
   },
   {
    "question": "In an applied problem with two angles of elevation towards the same vertical line (for example a flagpole on a hill, seen from a point on the ground), how do you solve it?",
    "choices": [
     "You first find a common length (for example the line of sight to the upper point) with a triangle theorem in one triangle, and use that length as known in the next triangle",
     "You use the cosine rule a single time and you are done",
     "You solve the two triangles completely independently of each other without reusing any quantity",
     "You measure the height directly from the figure without calculation"
    ],
    "correct": 0,
    "why": [
     "The two triangles share a side (the line of sight to the upper point), so that length acts as a bridge: find it in one triangle, then reuse it as a known quantity in the other.",
     "A single application of one theorem is rarely enough: none of the triangles has enough known quantities to solve the whole problem in one step.",
     "The triangles share a side, so the result from one triangle is needed as input to the other. They are not independent.",
     "The figure is a sketch, not drawn to scale: the height must be calculated with the triangle theorems, not read off."
    ]
   }
  ]
 }
});
