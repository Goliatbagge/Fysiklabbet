/* Engelsk översättning av ovningar (ma3c). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "ma3c-1.1": {
  "kalla": "8b8dce079d",
  "data": [
   {
    "level": 1,
    "question": "What is the degree of the polynomial $p(x) = 4x^2 - 7x^5 + 3x - 1$?",
    "choices": [
     "$2$",
     "$5$",
     "$4$",
     "$3$"
    ],
    "correct": 1,
    "solution": "The degree is the highest exponent among the terms, regardless of the order in which the terms are written. The term $-7x^5$ has the exponent 5, and no other term has a higher exponent.\n\nThe coefficient in front of the term, here $-7$, does not affect the degree.\n\n**Answer:** Degree 5"
   },
   {
    "level": 1,
    "question": "The polynomial $p(x) = x^3 - 2x + 6$ is given. Calculate $p(-2)$.",
    "choices": [
     "$-6$",
     "$18$",
     "$10$",
     "$2$"
    ],
    "correct": 3,
    "solution": "We substitute $x = -2$ in brackets in both places where $x$ appears.\n\n$$\np(-2) = (-2)^3 - 2 \\cdot (-2) + 6 = -8 + 4 + 6 = 2\n$$\n\nThe brackets are needed: $(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8$, and $-2 \\cdot (-2) = +4$.\n\n**Answer:** $p(-2) = 2$"
   },
   {
    "level": 1,
    "question": "Expand and simplify $(x + 2)(x^2 - 3x + 1)$.",
    "choices": [
     "$x^3 - x^2 - 5x + 2$",
     "$x^3 - 5x^2 - 5x + 2$",
     "$x^3 - x^2 + 7x + 2$",
     "$x^3 + 2x^2 + 1$"
    ],
    "correct": 0,
    "solution": "Each term in the first bracket is multiplied by each term in the second. That gives six products.\n\n$$\n\\begin{aligned}\n(x + 2)(x^2 - 3x + 1) &= x \\cdot x^2 + x \\cdot (-3x) + x \\cdot 1 + 2 \\cdot x^2 + 2 \\cdot (-3x) + 2 \\cdot 1 \\\\\n&= x^3 - 3x^2 + x + 2x^2 - 6x + 2 \\\\\n&= x^3 - x^2 - 5x + 2\n\\end{aligned}\n$$\n\nFinally, like terms are combined: $-3x^2 + 2x^2 = -x^2$ and $x - 6x = -5x$.\n\n**Answer:** $x^3 - x^2 - 5x + 2$"
   },
   {
    "level": 2,
    "question": "Factorise $5x^3 - 20x$ as far as possible.",
    "choices": [
     "$5x(x^2 - 4)$",
     "$5(x^3 - 4x)$",
     "$5x(x + 2)(x - 2)$",
     "$5x(x - 2)^2$"
    ],
    "correct": 2,
    "solution": "We first take out the greatest common factor. Both 5 and 20 are divisible by 5, and both terms contain $x$, so we take out $5x$.\n\n$$\n5x^3 - 20x = 5x(x^2 - 4)\n$$\n\nThe bracket $x^2 - 4 = x^2 - 2^2$ can be factorised further using the difference of two squares in reverse.\n\n$$\n5x(x^2 - 4) = 5x(x + 2)(x - 2)\n$$\n\n**Answer:** $5x(x + 2)(x - 2)$"
   },
   {
    "level": 2,
    "question": "For the polynomial $p(x) = 2x^3 + ax - 5$ we know that $p(2) = 15$. Determine the constant $a$.",
    "choices": [
     "$a = 7$",
     "$a = 4$",
     "$a = -2$",
     "$a = 2$"
    ],
    "correct": 3,
    "solution": "We substitute $x = 2$ in the polynomial and set the expression equal to 15.\n\n$$\n\\begin{aligned}\n2 \\cdot 2^3 + a \\cdot 2 - 5 &= 15 \\\\\n16 + 2a - 5 &= 15 \\\\\n11 + 2a &= 15 \\\\\n11 + 2a - 11 &= 15 - 11 \\\\\n2a &= 4 \\\\\n\\frac{2a}{2} &= \\frac{4}{2} \\\\\na &= 2\n\\end{aligned}\n$$\n\nCheck: $p(2) = 16 + 4 - 5 = 15$.\n\n**Answer:** $a = 2$"
   },
   {
    "level": 3,
    "question": "Determine the constants $a$ and $b$ so that\n$$\n(x + a)(x^2 + bx + 3) = x^3 + 5x^2 + 9x + 6\n$$\nholds for all $x$.",
    "choices": [
     "$a = 3$ and $b = 2$",
     "$a = 2$ and $b = 3$",
     "$a = 6$ and $b = -1$",
     "$a = 2$ and $b = 5$"
    ],
    "correct": 1,
    "solution": "We expand the left-hand side and collect the terms by degree.\n\n$$\n\\begin{aligned}\n(x + a)(x^2 + bx + 3) &= x^3 + bx^2 + 3x + ax^2 + abx + 3a \\\\\n&= x^3 + (a + b)x^2 + (3 + ab)x + 3a\n\\end{aligned}\n$$\n\nTwo polynomials are equal for all $x$ only if the coefficients for each degree are equal. We compare with the right-hand side $x^3 + 5x^2 + 9x + 6$.\n\nThe constant terms give $3a = 6$, so $a = 2$.\n\nThe $x^2$ terms give $a + b = 5$, so $2 + b = 5$ and $b = 3$.\n\nWe check with the $x$ terms: $3 + ab = 3 + 2 \\cdot 3 = 9$, which is correct.\n\n**Answer:** $a = 2$ and $b = 3$"
   }
  ]
 },
 "ma3c-1.2": {
  "kalla": "5ebc497772",
  "data": [
   {
    "level": 1,
    "question": "Solve the equation $x^5 = 243$.",
    "choices": [
     "$x_1 = -3$ and $x_2 = 3$",
     "$x = 48.6$",
     "$x = 3$",
     "$x \\approx 15.6$"
    ],
    "correct": 2,
    "solution": "The exponent 5 is odd, so the equation has one solution. We take the fifth root of both sides.\n\n$$\n\\begin{aligned}\nx^5 &= 243 \\\\\nx &= \\sqrt[5]{243} \\\\\nx &= 3\n\\end{aligned}\n$$\n\nCheck: $3 \\cdot 3 \\cdot 3 \\cdot 3 \\cdot 3 = 243$. The number $-3$ is not a solution, since $(-3)^5 = -243$.\n\n**Answer:** $x = 3$"
   },
   {
    "level": 1,
    "question": "Solve the equation $x^4 = 16$.",
    "choices": [
     "$x_1 = -2$ and $x_2 = 2$",
     "$x = 2$",
     "$x = 4$",
     "$x_1 = -4$ and $x_2 = 4$"
    ],
    "correct": 0,
    "solution": "The exponent 4 is even and the right-hand side is positive, so the equation has two solutions.\n\n$$\n\\begin{aligned}\nx^4 &= 16 \\\\\nx &= \\pm \\sqrt[4]{16} \\\\\nx &= \\pm 2\n\\end{aligned}\n$$\n\nBoth $2^4 = 16$ and $(-2)^4 = 16$.\n\n**Answer:** $x_1 = -2$ and $x_2 = 2$"
   },
   {
    "level": 1,
    "question": "Solve the equation $x^3 - 9x = 0$.",
    "choices": [
     "$x = 3$",
     "$x_1 = -3$ and $x_2 = 3$",
     "$x = 0$",
     "$x_1 = 0$, $x_2 = -3$ and $x_3 = 3$"
    ],
    "correct": 3,
    "solution": "Both terms contain $x$, so we take out $x$ as a common factor.\n\n$$\nx(x^2 - 9) = 0\n$$\n\nThe zero product method gives $x_1 = 0$ or $x^2 - 9 = 0$. We solve the second equation like this.\n\n$$\n\\begin{aligned}\nx^2 - 9 &= 0 \\\\\nx^2 - 9 + 9 &= 0 + 9 \\\\\nx^2 &= 9 \\\\\nx &= \\pm \\sqrt{9} \\\\\nx &= \\pm 3\n\\end{aligned}\n$$\n\nA cubic equation can have at most three solutions, and here all three exist.\n\n**Answer:** $x_1 = 0$, $x_2 = -3$ and $x_3 = 3$"
   },
   {
    "level": 2,
    "question": "Solve the equation $x^3 + 2x^2 - 8x = 0$.",
    "choices": [
     "$x_1 = -2$ and $x_2 = 4$",
     "$x_1 = 0$, $x_2 = -2$ and $x_3 = 4$",
     "$x_1 = 0$, $x_2 = -4$ and $x_3 = 2$",
     "$x_1 = -4$ and $x_2 = 2$"
    ],
    "correct": 2,
    "solution": "All terms contain $x$, so we take out $x$ as a common factor.\n\n$$\nx(x^2 + 2x - 8) = 0\n$$\n\nThe zero product method gives $x_1 = 0$ or $x^2 + 2x - 8 = 0$. We solve the second equation with the *pq* formula, where $p = 2$ and $q = -8$.\n\n$$\n\\begin{aligned}\nx &= -1 \\pm \\sqrt{1 + 8} \\\\\nx &= -1 \\pm \\sqrt{9} \\\\\nx &= -1 \\pm 3\n\\end{aligned}\n$$\n\nThis gives $x_2 = -1 - 3 = -4$ and $x_3 = -1 + 3 = 2$. The solution $x = 0$ must not be forgotten when $x$ is taken out.\n\n**Answer:** $x_1 = 0$, $x_2 = -4$ and $x_3 = 2$"
   },
   {
    "level": 2,
    "question": "The polynomial $p(x)$ has degree 3 and the zeros $-1$, $2$ and $5$. The coefficient of $x^3$ is 2. Which expression is $p(x)$?",
    "choices": [
     "$p(x) = 2(x - 1)(x + 2)(x + 5)$",
     "$p(x) = 2(x + 1)(x - 2)(x - 5)$",
     "$p(x) = (x + 1)(x - 2)(x - 5)$",
     "$p(x) = 2x(x + 1)(x - 2)(x - 5)$"
    ],
    "correct": 1,
    "solution": "Each zero $a$ gives a factor $(x - a)$. The zero $-1$ therefore gives $(x - (-1)) = (x + 1)$, the zero 2 gives $(x - 2)$ and the zero 5 gives $(x - 5)$.\n\nIn front of the factors is the coefficient of the highest degree, $k = 2$.\n\n$$\np(x) = 2(x + 1)(x - 2)(x - 5)\n$$\n\nCheck: $p(2) = 2 \\cdot 3 \\cdot 0 \\cdot (-3) = 0$. An expression with an extra factor $x$ becomes a polynomial of degree 4 with the zero 0.\n\n**Answer:** $p(x) = 2(x + 1)(x - 2)(x - 5)$"
   },
   {
    "level": 3,
    "question": "Solve the equation $x^4 - 5x^2 - 36 = 0$.",
    "choices": [
     "$x_1 = -3$ and $x_2 = 3$",
     "$x_1 = -3$, $x_2 = -2$, $x_3 = 2$ and $x_4 = 3$",
     "$x_1 = -4$ and $x_2 = 9$",
     "$x_1 = -2$ and $x_2 = 2$"
    ],
    "correct": 0,
    "solution": "The equation contains only $x^4$, $x^2$ and a constant. We introduce $t = x^2$, so that $x^4 = t^2$.\n\n$$\nt^2 - 5t - 36 = 0\n$$\n\nThe *pq* formula with $p = -5$ and $q = -36$ gives\n\n$$\n\\begin{aligned}\nt &= 2.5 \\pm \\sqrt{6.25 + 36} \\\\\nt &= 2.5 \\pm \\sqrt{42.25} \\\\\nt &= 2.5 \\pm 6.5\n\\end{aligned}\n$$\n\nso $t_1 = 2.5 - 6.5 = -4$ and $t_2 = 2.5 + 6.5 = 9$. We go back to $x$ with $x^2 = t$.\n\n$x^2 = -4$ has no real solution, since a square is never negative.\n\n$$\n\\begin{aligned}\nx^2 &= 9 \\\\\nx &= \\pm \\sqrt{9} \\\\\nx &= \\pm 3\n\\end{aligned}\n$$\n\nA quartic equation has at most four solutions, but here there are only two real ones.\n\n**Answer:** $x_1 = -3$ and $x_2 = 3$"
   }
  ]
 },
 "ma3c-1.3": {
  "kalla": "1fa711400c",
  "data": [
   {
    "level": 1,
    "question": "Simplify the expression as far as possible.\n$$\n\\frac{12x^4}{8x^2}\n$$",
    "choices": [
     "$\\dfrac{3x^2}{4}$",
     "$\\dfrac{3x^2}{2}$",
     "$\\dfrac{3x^6}{2}$",
     "$\\dfrac{4x^2}{3}$"
    ],
    "correct": 1,
    "solution": "We write out the factors and cancel common factors. The greatest common numerical factor of 12 and 8 is 4, and $x^2$ appears in both the numerator and the denominator.\n\n$$\n\\frac{12x^4}{8x^2} = \\frac{4 \\cdot 3 \\cdot x^2 \\cdot x^2}{4 \\cdot 2 \\cdot x^2} = \\frac{3x^2}{2}\n$$\n\n**Answer:** $\\dfrac{3x^2}{2}$"
   },
   {
    "level": 1,
    "question": "Expand $\\dfrac{x + 2}{5}$ by 3.",
    "choices": [
     "$\\dfrac{x + 6}{15}$",
     "$\\dfrac{3x + 6}{5}$",
     "$\\dfrac{3x + 6}{15}$",
     "$\\dfrac{3x + 2}{15}$"
    ],
    "correct": 2,
    "solution": "To expand means multiplying **both** the numerator and the denominator by the same number, here 3.\n\n$$\n\\frac{x + 2}{5} = \\frac{3(x + 2)}{3 \\cdot 5} = \\frac{3x + 6}{15}\n$$\n\nThe whole numerator is multiplied by 3, so $x + 2$ becomes $3x + 6$ (not just $x + 6$).\n\n**Answer:** $\\dfrac{3x + 6}{15}$"
   },
   {
    "level": 1,
    "question": "Simplify $\\dfrac{6x^2 - 9x}{3x}$.",
    "choices": [
     "$2x - 3$",
     "$2x - 9$",
     "$6x - 9$",
     "$2x^2 - 3$"
    ],
    "correct": 0,
    "solution": "We take out the greatest common factor in the numerator. Both $6x^2$ and $9x$ contain $3x$.\n\n$$\n\\frac{6x^2 - 9x}{3x} = \\frac{3x(2x - 3)}{3x} = 2x - 3\n$$\n\n**Answer:** $2x - 3$"
   },
   {
    "level": 2,
    "question": "Simplify $\\dfrac{4x^2 - 8x}{2x - 4}$ as far as possible.",
    "choices": [
     "$2x$",
     "$4x$",
     "$x$",
     "$2x - 4$"
    ],
    "correct": 0,
    "solution": "We factorise the numerator and the denominator separately by taking out the greatest common factor.\n\n$$\n\\frac{4x^2 - 8x}{2x - 4} = \\frac{4x(x - 2)}{2(x - 2)} = \\frac{4x}{2} = 2x\n$$\n\nThe factor $(x - 2)$ cancels and $\\dfrac{4x}{2} = 2x$.\n\n**Answer:** $2x$"
   },
   {
    "level": 2,
    "question": "Simplify $\\dfrac{x^2 - 9}{x + 3}$.",
    "choices": [
     "$x + 3$",
     "$x - 9$",
     "$x - 3$",
     "$x^2 - 3$"
    ],
    "correct": 2,
    "solution": "The numerator is a difference of two squares: $x^2 - 9 = x^2 - 3^2 = (x + 3)(x - 3)$. So we use the difference of two squares in reverse.\n\n$$\n\\frac{x^2 - 9}{x + 3} = \\frac{(x + 3)(x - 3)}{x + 3} = x - 3\n$$\n\n**Answer:** $x - 3$"
   },
   {
    "level": 3,
    "question": "Simplify $\\dfrac{x^2 - x - 6}{x^2 - 4}$ as far as possible.",
    "choices": [
     "$\\dfrac{x - 6}{x - 4}$",
     "$\\dfrac{x + 2}{x - 2}$",
     "$\\dfrac{x - 3}{x - 2}$",
     "$\\dfrac{x - 3}{x + 2}$"
    ],
    "correct": 2,
    "solution": "Here **both** the numerator and the denominator must be factorised, using different methods.\n\nThe numerator $x^2 - x - 6$ is factorised using its zeros. The $pq$ formula gives\n\n$$\nx = \\frac{1}{2} \\pm \\sqrt{\\left(\\frac{1}{2}\\right)^2 + 6} = \\frac{1}{2} \\pm \\sqrt{\\frac{25}{4}} = \\frac{1}{2} \\pm \\frac{5}{2}\n$$\n\nso the zeros are $x = 3$ and $x = -2$, that is $x^2 - x - 6 = (x - 3)(x + 2)$.\n\nThe denominator is a difference of two squares: $x^2 - 4 = (x + 2)(x - 2)$.\n\n$$\n\\frac{x^2 - x - 6}{x^2 - 4} = \\frac{(x - 3)(x + 2)}{(x + 2)(x - 2)} = \\frac{x - 3}{x - 2}\n$$\n\nThe common factor $(x + 2)$ cancels. Note that you may **not** cancel term by term (for example $\\dfrac{-6}{-4}$), only whole factors.\n\n**Answer:** $\\dfrac{x - 3}{x - 2}$"
   }
  ]
 },
 "ma3c-1.4": {
  "kalla": "f2f7ee4159",
  "data": [
   {
    "level": 1,
    "question": "Simplify $\\dfrac{4x}{x + 5} + \\dfrac{9}{x + 5}$.",
    "choices": [
     "$\\dfrac{4x + 9}{2(x + 5)}$",
     "$\\dfrac{4x + 9}{x^2 + 5}$",
     "$\\dfrac{4x + 9}{x + 5}$",
     "$\\dfrac{13x}{x + 5}$"
    ],
    "correct": 2,
    "solution": "Both terms have the same denominator, $(x + 5)$, so we just add the numerators.\n\n$$\n\\frac{4x}{x + 5} + \\frac{9}{x + 5} = \\frac{4x + 9}{x + 5}\n$$\n\nThe denominator stays the same: it is written only once.\n\n**Answer:** $\\dfrac{4x + 9}{x + 5}$"
   },
   {
    "level": 1,
    "question": "Simplify $\\dfrac{7x}{x - 4} - \\dfrac{3}{x - 4}$.",
    "choices": [
     "$\\dfrac{7x - 3}{x - 4}$",
     "$\\dfrac{7x + 3}{x - 4}$",
     "$\\dfrac{4x}{x - 4}$",
     "$\\dfrac{7x - 3}{(x - 4)^2}$"
    ],
    "correct": 0,
    "solution": "The terms have the same denominator, so we subtract the numerators.\n\n$$\n\\frac{7x}{x - 4} - \\frac{3}{x - 4} = \\frac{7x - 3}{x - 4}\n$$\n\nMind the sign: it is the whole numerator $3$ that is subtracted, not something that\nchanges sign in the denominator.\n\n**Answer:** $\\dfrac{7x - 3}{x - 4}$"
   },
   {
    "level": 1,
    "question": "Solve the equation $\\dfrac{x}{3} + \\dfrac{x}{6} = 9$.",
    "answer": {
     "value": 18,
     "unit": ""
    },
    "solution": "No denominator contains $x$, so the equation is defined for all $x$.\nThe lowest common denominator is 6. We multiply both sides by 6.\n\n$$\n\\frac{x \\cdot 6}{3} + \\frac{x \\cdot 6}{6} = 9 \\cdot 6\n$$\n\n$$\n2x + x = 54 \\quad\\Rightarrow\\quad 3x = 54 \\quad\\Rightarrow\\quad x = 18\n$$\n\n**Answer:** $x = 18$"
   },
   {
    "level": 2,
    "question": "Write $\\dfrac{3}{x} + \\dfrac{2}{x + 1}$ as a single fraction.",
    "choices": [
     "$\\dfrac{2x + 3}{x(x + 1)}$",
     "$\\dfrac{5x - 3}{x(x + 1)}$",
     "$\\dfrac{5x + 3}{x + 1}$",
     "$\\dfrac{5x + 3}{x(x + 1)}$"
    ],
    "correct": 3,
    "solution": "The denominators are different, $x$ and $(x + 1)$ respectively, so we expand the first\nterm by $(x + 1)$ and the second term by $x$.\n\n$$\n\\frac{3}{x} + \\frac{2}{x + 1} = \\frac{3(x + 1)}{x(x + 1)} + \\frac{2x}{x(x + 1)} = \\frac{3x + 3 + 2x}{x(x + 1)} = \\frac{5x + 3}{x(x + 1)}\n$$\n\nDo not forget that the denominator is now the product $x(x + 1)$, not just one of the\noriginal denominators.\n\n**Answer:** $\\dfrac{5x + 3}{x(x + 1)}$"
   },
   {
    "level": 2,
    "question": "Solve the equation $\\dfrac{1}{4} + \\dfrac{3}{x - 1} = 1$.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "The denominator $(x - 1)$ means that the equation is not defined for $x = 1$, so\n$x \\neq 1$. We multiply both sides by the LCD $= 4(x - 1)$.\n\n$$\n\\frac{1 \\cdot 4(x - 1)}{4} + \\frac{3 \\cdot 4(x - 1)}{x - 1} = 1 \\cdot 4(x - 1)\n$$\n\n$$\n(x - 1) + 12 = 4(x - 1) \\quad\\Rightarrow\\quad x + 11 = 4x - 4 \\quad\\Rightarrow\\quad 15 = 3x \\quad\\Rightarrow\\quad x = 5\n$$\n\nThe solution $x = 5$ is different from 1, so it is allowed.\n\n**Answer:** $x = 5$"
   },
   {
    "level": 3,
    "question": "Solve the equation $\\dfrac{x}{x - 3} = \\dfrac{6x}{x^2 - 9}$.",
    "answer": {
     "value": 0,
     "unit": ""
    },
    "solution": "We first investigate for which $x$ the denominators become zero.\n\n$$\nx - 3 = 0 \\iff x = 3 \\qquad\\qquad x^2 - 9 = 0 \\iff x = \\pm 3\n$$\n\nSo $x \\neq 3$ and $x \\neq -3$. The denominator $x^2 - 9$ is a difference of two squares and\nis factorised as $(x - 3)(x + 3)$.\n\n$$\n\\frac{x}{x - 3} = \\frac{6x}{(x - 3)(x + 3)}\n$$\n\nWe multiply both sides by the LCD $= (x - 3)(x + 3)$.\n\n$$\n\\frac{x(x - 3)(x + 3)}{x - 3} = \\frac{6x(x - 3)(x + 3)}{(x - 3)(x + 3)} \\quad\\Rightarrow\\quad x(x + 3) = 6x\n$$\n\n$$\nx^2 + 3x = 6x \\quad\\Rightarrow\\quad x^2 - 3x = 0 \\quad\\Rightarrow\\quad x(x - 3) = 0\n$$\n\nThe zero product method gives $x_1 = 0$ and $x_2 = 3$. But $x = 3$ is a\nforbidden value (the denominator becomes zero there), so that solution must be\nrejected. It is a false root that appeared when we multiplied by\n$(x - 3)$.\n\n**Answer:** $x = 0$"
   }
  ]
 },
 "ma3c-1.5": {
  "kalla": "a52bdc3c51",
  "data": [
   {
    "level": 1,
    "question": "Simplify $\\dfrac{2}{x} \\cdot \\dfrac{x^2}{6}$.",
    "choices": [
     "$\\dfrac{x^2}{3}$",
     "$\\dfrac{2x}{3}$",
     "$\\dfrac{x}{3}$",
     "$\\dfrac{x}{2}$"
    ],
    "correct": 2,
    "solution": "We multiply numerator by numerator and denominator by denominator, and then cancel.\n\n$$\n\\frac{2}{x} \\cdot \\frac{x^2}{6} = \\frac{2x^2}{6x}\n$$\n\nCancelling $2x$:\n\n$$\n\\frac{2x^2}{6x} = \\frac{x}{3}\n$$\n\n**Answer:** $\\dfrac{x}{3}$"
   },
   {
    "level": 1,
    "question": "Simplify $\\dfrac{4}{x-3}\\cdot\\dfrac{x+2}{5}$.",
    "choices": [
     "$\\dfrac{4x+2}{5x-15}$",
     "$\\dfrac{4x+8}{5x-15}$",
     "$\\dfrac{4(x-3)}{5(x+2)}$",
     "$\\dfrac{4x+8}{5x-3}$"
    ],
    "correct": 1,
    "solution": "We multiply numerator by numerator and denominator by denominator. There is no common factor to cancel.\n\n$$\n\\frac{4}{x-3}\\cdot\\frac{x+2}{5} = \\frac{4(x+2)}{5(x-3)} = \\frac{4x+8}{5x-15}\n$$\n\n**Answer:** $\\dfrac{4x+8}{5x-15}$"
   },
   {
    "level": 1,
    "question": "Simplify $\\dfrac{2x}{3}\\Big/\\dfrac{4x}{9}$.",
    "choices": [
     "$\\dfrac{8x^2}{27}$",
     "$\\dfrac{2}{3}$",
     "$\\dfrac{3}{4}$",
     "$\\dfrac{3}{2}$"
    ],
    "correct": 3,
    "solution": "We replace the division sign with multiplication and invert the expression in the denominator.\n\n$$\n\\frac{2x}{3}\\cdot\\frac{9}{4x} = \\frac{18x}{12x}\n$$\n\nCancelling $6x$:\n\n$$\n\\frac{18x}{12x} = \\frac{3}{2}\n$$\n\n**Answer:** $\\dfrac{3}{2}$"
   },
   {
    "level": 2,
    "question": "Simplify $\\dfrac{x^2-4}{5}\\cdot\\dfrac{10}{x+2}$ as far as possible.",
    "choices": [
     "$2x + 4$",
     "$10x - 20$",
     "$2x - 4$",
     "$x - 2$"
    ],
    "correct": 2,
    "solution": "We factorise the numerator $x^2-4$ using the difference of two squares: $x^2-4=(x-2)(x+2)$. Then we multiply and cancel $(x+2)$ and then 5.\n\n$$\n\\frac{x^2-4}{5}\\cdot\\frac{10}{x+2} = \\frac{(x-2)(x+2)}{5}\\cdot\\frac{10}{x+2} = \\frac{10(x-2)(x+2)}{5(x+2)}\n$$\n\n$$\n= \\frac{10(x-2)}{5} = 2(x-2) = 2x - 4\n$$\n\n**Answer:** $2x - 4$"
   },
   {
    "level": 2,
    "question": "Simplify $\\dfrac{x^2-3x}{4}\\Big/\\dfrac{x-3}{8}$ as far as possible.",
    "choices": [
     "$2x$",
     "$\\dfrac{x}{2}$",
     "$2x - 6$",
     "$4x$"
    ],
    "correct": 0,
    "solution": "We factorise the numerator by taking out $x$: $x^2-3x=x(x-3)$. Then we replace the division sign with multiplication and invert the expression in the denominator.\n\n$$\n\\frac{x(x-3)}{4}\\cdot\\frac{8}{x-3} = \\frac{8x(x-3)}{4(x-3)}\n$$\n\nCancelling $4(x-3)$:\n\n$$\n\\frac{8x(x-3)}{4(x-3)} = 2x\n$$\n\n**Answer:** $2x$"
   },
   {
    "level": 3,
    "question": "Simplify $\\dfrac{x^2+2x-3}{x^2-9} \\Big/ \\dfrac{x-1}{x+5}$ as far as possible.",
    "choices": [
     "$\\dfrac{x-5}{x-3}$",
     "$\\dfrac{x-3}{x+5}$",
     "$\\dfrac{x+5}{x-3}$",
     "$\\dfrac{x+5}{x+3}$"
    ],
    "correct": 2,
    "solution": "Here **both** polynomials in the first fraction must be factorised, using different methods, before the division can be carried out.\n\nThe numerator $x^2+2x-3$ is factorised using its zeros. The $pq$ formula gives\n\n$$\nx = -1 \\pm \\sqrt{1^2 + 3} = -1 \\pm 2\n$$\n\nso the zeros are $x=1$ and $x=-3$, that is $x^2+2x-3=(x-1)(x+3)$.\n\nThe denominator is a difference of two squares: $x^2-9=(x-3)(x+3)$.\n\nWe replace the division sign with multiplication and invert the second expression:\n\n$$\n\\frac{(x-1)(x+3)}{(x-3)(x+3)}\\cdot\\frac{x+5}{x-1} = \\frac{(x-1)(x+3)(x+5)}{(x-3)(x+3)(x-1)}\n$$\n\nCancelling $(x-1)$ and $(x+3)$:\n\n$$\n\\frac{(x-1)(x+3)(x+5)}{(x-3)(x+3)(x-1)} = \\frac{x+5}{x-3}\n$$\n\n**Answer:** $\\dfrac{x+5}{x-3}$"
   }
  ]
 },
 "ma3c-1.6": {
  "kalla": "99806762f8",
  "data": [
   {
    "level": 1,
    "question": "Determine $\\displaystyle\\lim_{x \\to 3} (2x - 4)$.",
    "choices": [
     "$2$",
     "$10$",
     "$-2$",
     "Infinity"
    ],
    "correct": 0,
    "solution": "The expression $2x - 4$ is defined for all $x$, so we use method 1: substitute $x = 3$ directly (at the same time as the limit notation is removed) and calculate.\n\n$$\n\\lim_{x \\to 3} (2x - 4) = 2 \\cdot 3 - 4 = 2\n$$\n\n**Answer:** $2$"
   },
   {
    "level": 1,
    "question": "Determine $\\displaystyle\\lim_{x \\to \\infty} \\frac{9}{x}$.",
    "choices": [
     "The limit does not exist",
     "Infinity",
     "$9$",
     "$0$"
    ],
    "correct": 3,
    "solution": "We have a limit with an infinity only in the denominator. The denominator then becomes infinitely much larger than the numerator, so the quotient tends to 0.\n\n**Answer:** $0$"
   },
   {
    "level": 1,
    "question": "Determine $\\displaystyle\\lim_{x \\to -1} (x^2 - 3x)$.",
    "choices": [
     "$1$",
     "$4$",
     "$-2$",
     "$-4$"
    ],
    "correct": 1,
    "solution": "The expression $x^2 - 3x$ is defined for all $x$, so we substitute $x = -1$ directly and calculate.\n\n$$\n\\lim_{x \\to -1} (x^2 - 3x) = (-1)^2 - 3 \\cdot (-1) = 1 + 3 = 4\n$$\n\n**Answer:** $4$"
   },
   {
    "level": 2,
    "question": "Determine $\\displaystyle\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.",
    "choices": [
     "$2$",
     "The limit does not exist",
     "$4$",
     "$0$"
    ],
    "correct": 2,
    "solution": "If we substitute $x = 2$ directly we get $\\dfrac{0}{0}$, so method 1 does not work. We factorise the numerator using the difference of two squares and cancel the common factor $(x - 2)$.\n\n$$\n\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = \\lim_{x \\to 2} \\frac{(x + 2)(x - 2)}{x - 2} = \\lim_{x \\to 2} (x + 2) = 2 + 2 = 4\n$$\n\n**Answer:** $4$"
   },
   {
    "level": 2,
    "question": "Determine $\\displaystyle\\lim_{x \\to \\infty} \\frac{4x + 5}{2x - 1}$.",
    "choices": [
     "$2$",
     "$4$",
     "$0$",
     "Infinity"
    ],
    "correct": 0,
    "solution": "We have a limit with infinities in both the numerator and the denominator. We remove the constant terms, cancel and calculate.\n\n$$\n\\lim_{x \\to \\infty} \\frac{4x + 5}{2x - 1} = \\lim_{x \\to \\infty} \\frac{4x}{2x} = \\lim_{x \\to \\infty} 2 = 2\n$$\n\n**Answer:** $2$"
   },
   {
    "level": 3,
    "question": "Determine the value of the constant $a$ that makes the limit\n$$\n\\lim_{x \\to 2} \\frac{x^2 + ax - 6}{x - 2}\n$$\nexist (be finite), and then calculate the limit.",
    "choices": [
     "$5$",
     "$1$",
     "$-3$",
     "$4$"
    ],
    "correct": 0,
    "solution": "If we substitute $x = 2$ in the denominator it becomes 0. For the limit to exist (be finite) anyway, the numerator must also become 0 at $x = 2$. Otherwise we get division by zero without being able to cancel the factor $(x - 2)$.\n\nWe set the numerator equal to 0 at $x = 2$ and solve for $a$.\n\n$$\n2^2 + a \\cdot 2 - 6 = 0 \\quad \\Longrightarrow \\quad 2a = 2 \\quad \\Longrightarrow \\quad a = 1\n$$\n\nWith $a = 1$ the numerator becomes $x^2 + x - 6$, which has the zeros $x = 2$ and $x = -3$ (can be checked with the $pq$ formula) and is therefore factorised as $(x - 2)(x + 3)$. Now we can cancel and determine the limit.\n\n$$\n\\lim_{x \\to 2} \\frac{x^2 + x - 6}{x - 2} = \\lim_{x \\to 2} \\frac{(x - 2)(x + 3)}{x - 2} = \\lim_{x \\to 2} (x + 3) = 2 + 3 = 5\n$$\n\n**Answer:** $a = 1$ and the limit is $5$."
   }
  ]
 },
 "ma3c-1.7": {
  "kalla": "15df2444bb",
  "data": [
   {
    "level": 1,
    "question": "Which command in GeoGebra factorises a polynomial?",
    "choices": [
     "NSolve( Equation )",
     "Simplify( Function )",
     "Limit( Function, Value )",
     "Factor( Polynomial )"
    ],
    "correct": 3,
    "solution": "The command *Factor( Polynomial )* rewrites a polynomial as a product of factors. *Simplify* simplifies an expression without necessarily rewriting it as a product, *NSolve* solves equations numerically and *Limit* calculates limits.\n\n**Answer:** Factor( Polynomial )"
   },
   {
    "level": 1,
    "question": "What is the difference between the commands **NSolve** and **Solve** when you solve an equation in GeoGebra?",
    "choices": [
     "NSolve can only solve quadratic equations",
     "NSolve gives the exact solution with symbols, Solve gives decimal form",
     "They do exactly the same thing",
     "NSolve gives the solution in decimal form, Solve gives it exactly with symbols"
    ],
    "correct": 3,
    "solution": "*NSolve* (numerically solve) answers with decimal numbers, for example $x \\approx 1.73$. *Solve* answers exactly, with symbols such as $x = \\sqrt{3}$ when the solution is not a \"nice\" integer.\n\n**Answer:** NSolve gives decimal form, Solve gives exact form."
   },
   {
    "level": 1,
    "question": "What characterises a **computer algebra system (CAS)**, as opposed to an ordinary calculator?",
    "choices": [
     "It can also handle algebraic expressions (expressions with letters), not just numbers",
     "It always calculates faster",
     "It can only handle integers",
     "It can only draw graphs, not calculate"
    ],
    "correct": 0,
    "solution": "An ordinary calculator handles numerical calculations (calculations with numbers). A computer algebra system, for example GeoGebra, can in addition calculate with algebraic expressions: factorise, simplify and solve equations where letters are part of the expression itself.\n\n**Answer:** It can handle algebraic expressions, not just numbers."
   },
   {
    "level": 2,
    "question": "Solve the equation $x^3 - 6x^2 + 11x - 6 = 0$ exactly using a computer algebra system. Give the solutions in order of size.",
    "choices": [
     "$x = 0$, $x = 1$ and $x = 6$",
     "$x = 1$, $x = 2$ and $x = 3$",
     "$x = -1$, $x = -2$ and $x = -3$",
     "$x = 1$, $x = 2$ and $x = 6$"
    ],
    "correct": 1,
    "solution": "In GeoGebra's input bar we type the command *Solve( Equation )* and enter the equation.\n\n$$\n\\text{Solve}(x^3 - 6x^2 + 11x - 6 = 0) \\;\\rightarrow\\; \\{x = 1,\\ x = 2,\\ x = 3\\}\n$$\n\nYou can check the answer by hand by expanding the product: $(x-1)(x-2)(x-3) = x^3 - 6x^2 + 11x - 6$.\n\n**Answer:** $x = 1$, $x = 2$ and $x = 3$"
   },
   {
    "level": 2,
    "question": "Determine $\\displaystyle\\lim_{x \\to \\infty} \\dfrac{4x - 1}{2x + 3}$ using a computer algebra system.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "solution": "In GeoGebra's input bar we type the command *Limit( Function, Value )*, enter the expression and write $\\infty$ (the infinity sign) as the value that $x$ tends to.\n\n$$\n\\text{Limit}\\!\\left(\\frac{4x - 1}{2x + 3},\\ \\infty\\right) \\;\\rightarrow\\; 2\n$$\n\n**Answer:** $2$"
   },
   {
    "level": 3,
    "question": "A student enters $\\text{Limit}\\!\\left(\\dfrac{x^2 - 9}{x - 3},\\ 3\\right)$ in a computer algebra system and gets the answer 6, even though the expression $\\dfrac{x^2 - 9}{x - 3}$ is not defined for $x = 3$ (the denominator becomes 0). Determine the limit by hand by first simplifying the expression, and give the answer.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "A limit describes what the expression approaches as $x$ tends to 3, not what happens exactly at $x = 3$. By factorising the numerator as a difference of two squares and cancelling the common factor $(x - 3)$ we get an expression that IS defined at $x = 3$ and that equals the original expression everywhere except exactly there.\n\n$$\n\\frac{x^2 - 9}{x - 3} = \\frac{(x - 3)(x + 3)}{x - 3} = x + 3 \\qquad (x \\neq 3)\n$$\n\nThe limit is obtained by substituting $x = 3$ in the simplified expression:\n\n$$\n\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = \\lim_{x \\to 3} (x + 3) = 3 + 3 = 6\n$$\n\nThis is exactly what the calculator answers: it handles the \"removable\" gap in the domain automatically.\n\n**Answer:** $6$"
   }
  ]
 }
});
