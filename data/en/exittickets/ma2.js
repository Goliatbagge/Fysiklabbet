/* Engelsk översättning av exittickets (ma2). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "ma2c-1.1": {
  "kalla": "9198af928d",
  "data": [
   {
    "question": "What does the curly bracket in front of two equations mean?",
    "choices": [
     "That the upper equation is the most important",
     "That both equations lack solutions",
     "That the equations form a system that requires a common solution",
     "That the equations are to be added"
    ],
    "correct": 2,
    "why": [
     "The equations in a system are equivalent: no order or priority applies.",
     "On its own, a linear equation in two variables has infinitely many solutions. The system asks for the common ones.",
     "The curly bracket marks a system of equations: the solution must fit both equations at the same time.",
     "Adding the equations can be a step in solving (the elimination method), but that is not what the bracket means."
    ]
   },
   {
    "question": "Where in the graph do you find the solution to a system of equations?",
    "choices": [
     "Where the lines cross the *x*-axis",
     "At the point where the distance between the lines is greatest",
     "At the point of intersection of the lines",
     "Where one of the lines crosses the *y*-axis"
    ],
    "correct": 2,
    "why": [
     "The zeros of the lines belong to each line separately. The solution requires a point that lies on both.",
     "The solution is where the lines meet, not where they are furthest apart.",
     "The point of intersection lies on both lines at the same time: its coordinates satisfy both equations, which is exactly what a solution is.",
     "The intersection with the *y*-axis gives the line's *m*-value, not the solution of the system."
    ]
   },
   {
    "question": "The lines $y = 2x - 4$ and $y = -x + 5$ intersect at the point (3, 2). What is the solution to the system of equations?",
    "choices": [
     "$x = -4$ and $y = 5$",
     "$x = 3$ and $y = 2$",
     "$x = 2$ and $y = 3$",
     "$x = 3$ or $x = 2$"
    ],
    "correct": 1,
    "why": [
     "−4 and 5 are the *m*-values of the lines (intersections with the *y*-axis), not the solution of the system.",
     "The *x*-coordinate of the point of intersection is the solution for x and the *y*-coordinate is the solution for y: the point (3, 2) gives x = 3 and y = 2.",
     "The order in a point is (x, y): the first coordinate is the *x*-value, not the *y*-value.",
     "The solution is a pair of numbers (an x and a y that belong together), not two alternative *x*-values."
    ]
   },
   {
    "question": "Two lines have the same $k$-value but different $m$-values. How many solutions does the system of equations have?",
    "choices": [
     "Exactly one solution",
     "It depends on the size of the *m*-values",
     "Infinitely many solutions",
     "No solutions"
    ],
    "correct": 3,
    "why": [
     "Exactly one solution requires the lines to intersect, which requires different *k*-values.",
     "As long as the *m*-values are different, the lines are parallel, however large or small the values are.",
     "Infinitely many solutions only occur when the lines are identical: the same k AND the same m.",
     "The same slope but different starting points on the *y*-axis make the lines parallel. They never intersect, so there is no common solution."
    ]
   },
   {
    "question": "When does a system of linear equations have exactly one solution?",
    "choices": [
     "When the lines have the same $k$-value",
     "When both lines pass through the origin",
     "When the lines have different $k$-values",
     "When the lines have the same $m$-value but different $k$-values"
    ],
    "correct": 2,
    "why": [
     "The same *k*-value gives either parallel lines (no solutions) or the same line (infinitely many), never exactly one.",
     "Two different lines through the origin do intersect there, but the general condition is different *k*-values, not the origin.",
     "Different slopes mean that the lines always cross at exactly one point. The *m*-values then do not matter.",
     "Different *k*-values are enough. The requirement of the same *m*-value is unnecessary (it also tells you that the intersection is on the *y*-axis)."
    ]
   }
  ]
 },
 "ma2c-1.2": {
  "kalla": "3a4f867873",
  "data": [
   {
    "question": "What does it mean to make a **substitution** when solving a system of equations?",
    "choices": [
     "To swap the places of the equations in the system",
     "To draw both equations in a coordinate system",
     "To replace a variable with an expression from the other equation",
     "To add the two equations side by side"
    ],
    "correct": 2,
    "why": [
     "The order of the equations does not matter: swapping them changes nothing.",
     "That is the graphical method of solving, not the substitution method.",
     "Substitution means replacement: the variable is replaced with an equivalent expression, so that an equation with only one variable remains.",
     "Adding side by side is the elimination method, a different algebraic method."
    ]
   },
   {
    "question": "What is the first step in the substitution method?",
    "choices": [
     "Solve for any variable from any of the equations",
     "Insert a guessed value of $x$ into both equations",
     "Multiply the equations so that a variable gets opposite signs",
     "Calculate the point of intersection of the lines"
    ],
    "correct": 0,
    "why": [
     "First you need an expression to substitute, so you solve for a variable (preferably one with coefficient 1) from one of the equations.",
     "The substitution method is exact and algebraic: no guessing is needed.",
     "That is the preparation in the elimination method, not the substitution method.",
     "The point of intersection belongs to the graphical method. The substitution method calculates the solution algebraically."
    ]
   },
   {
    "question": "The system $\\begin{cases} y = 3x \\\\ 2x + y = 10 \\end{cases}$ is solved with the substitution method. Which equation do you get?",
    "choices": [
     "$3x = 10$",
     "$2x + 3x = 10$",
     "$2 \\cdot 3x + y = 10$",
     "$2x + y = 3x$"
    ],
    "correct": 1,
    "why": [
     "Then the $2x$ term has been lost. The whole lower equation must be kept.",
     "According to the upper equation, y equals 3x. Replace y with 3x in the lower one: $2x + 3x = 10$, that is $5x = 10$.",
     "Here the *x*-term has been given the wrong replacement. It is $y$ that should be replaced with $3x$, not $x$.",
     "The substitution should be made in the *y*-term of the lower equation, not by setting the sides of the equations equal at random."
    ]
   },
   {
    "question": "You have found that $x = 3$. How do you find $y$?",
    "choices": [
     "$y$ is always the same as $x$, so $y = 3$",
     "Add 3 to both sides of the other equation",
     "Solve the whole system again with $y$ first",
     "Substitute $x = 3$ into one of the earlier equations"
    ],
    "correct": 3,
    "why": [
     "x and y are different variables. Their values are linked through the equations but are rarely equal.",
     "Adding 3 to both sides is a balancing operation, not a way of using the fact that x is known.",
     "That works but is unnecessary double work: substitution is enough.",
     "When one variable is known, substituting into any earlier equation gives the other. It does not matter which equation you choose."
    ]
   },
   {
    "question": "Which variable is smartest to solve for in the system $\\begin{cases} 3x - y = 2 \\\\ 5x + 2y = 10 \\end{cases}$?",
    "choices": [
     "$y$ from the upper equation, since it has no coefficient",
     "$y$ from the lower equation, since 2 is a small number",
     "$x$ from the upper equation, since $x$ comes first",
     "The substitution method cannot be used here"
    ],
    "correct": 0,
    "why": [
     "From the upper one you get $y = 3x - 2$ without division or fractions. Variables with coefficient 1 (or −1) are the easiest to solve for.",
     "Solving for y from $5x + 2y = 10$ requires division by 2 and gives fractions in the expression.",
     "Solving for x from $3x - y = 2$ gives the fraction $x = (2 + y)/3$. It works but makes the calculation harder.",
     "The substitution method works on all systems of linear equations. The only question is which variable to solve for to get the least calculation."
    ]
   }
  ]
 },
 "ma2c-1.3": {
  "kalla": "a52fa137d7",
  "data": [
   {
    "question": "What is required for a variable to be eliminated when the equations are added side by side?",
    "choices": [
     "The variable stands alone on one side",
     "The same variable term appears in both equations, with opposite signs",
     "Both equations have the same right-hand side",
     "The same variable term appears in both equations, with the same sign"
    ],
    "correct": 1,
    "why": [
     "That is the starting point for the substitution method. The elimination method relies on terms with opposite signs.",
     "Terms like $+5y$ and $-5y$ add up to 0 when added side by side: the variable disappears and an equation in one variable remains.",
     "The right-hand sides are also added, but they do not need to be equal for the method to work.",
     "With the same sign the sum is twice the term (for example $5y + 5y = 10y$): nothing is eliminated."
    ]
   },
   {
    "question": "What is the result when the equations in $\\begin{cases} -3x + 2y = 4 \\\\ 3x + 5y = 10 \\end{cases}$ are added side by side?",
    "choices": [
     "$6x + 7y = 14$",
     "$3y = 6$",
     "$7y = 40$",
     "$7y = 14$"
    ],
    "correct": 3,
    "why": [
     "The *x*-terms have opposite signs and are eliminated. They do not become $6x$.",
     "The *y*-terms should be added, not subtracted: $2y + 5y = 7y$.",
     "The right-hand sides are added: $4 + 10 = 14$, not $4 \\cdot 10 = 40$.",
     "$-3x$ and $+3x$ cancel each other; $2y + 5y = 7y$ and $4 + 10 = 14$."
    ]
   },
   {
    "question": "The system $\\begin{cases} 2x + y = 7 \\\\ 3x - 2y = 0 \\end{cases}$ is to be solved with the elimination method. What is a suitable first step?",
    "choices": [
     "Multiply the lower equation by 2",
     "Multiply the upper equation by 2",
     "Add the equations directly",
     "Subtract 7 from both sides of the upper equation"
    ],
    "correct": 1,
    "why": [
     "Then the lower one becomes $6x - 4y = 0$, and the *y*-terms ($+y$ and $-4y$) still do not match.",
     "Then the upper one becomes $4x + 2y = 14$: the terms $+2y$ and $-2y$ have opposite signs and are eliminated by addition.",
     "Adding directly gives $5x - y = 7$. No variable disappears; you have only got a new equation in two variables.",
     "That only changes the form of the upper equation. It does not create variable terms with opposite signs."
    ]
   },
   {
    "question": "When you multiply an equation by a number, what must you keep in mind?",
    "choices": [
     "All terms on both sides must be multiplied by the number",
     "Only the left-hand side should be multiplied",
     "Only the variable terms should be multiplied",
     "The number must be positive"
    ],
    "correct": 0,
    "why": [
     "An equation is an equality. It is only preserved if the whole left-hand side and the whole right-hand side are multiplied by the same number.",
     "The right-hand side must follow along, otherwise the equality no longer holds.",
     "If the constant terms are skipped, the new equation says something different from the old one: the equality is destroyed.",
     "Multiplying by negative numbers works perfectly well. It is often used precisely to change the sign of a term."
    ]
   },
   {
    "question": "When do you need to multiply **both** equations in a system before adding?",
    "choices": [
     "When no variable term can be matched by multiplying just one of the equations by a whole number",
     "When the system has no solutions",
     "Always: both equations must always be modified",
     "When the right-hand sides are of different sizes"
    ],
    "correct": 0,
    "why": [
     "If no coefficient is a multiple of the corresponding coefficient in the other equation (as in $2x + 7y = 8$ and $5x + 9y = 3$), the equations are multiplied by each other's coefficients, with signs chosen so that the terms are eliminated.",
     "The number of solutions does not decide the strategy. Even systems without a solution can be handled by addition (you then get a contradiction).",
     "Often it is enough to modify one equation, or none at all if terms with opposite signs are already there.",
     "The size of the right-hand sides does not control the method. It is the coefficients of the variable terms that should be matched."
    ]
   }
  ]
 },
 "ma2c-1.4": {
  "kalla": "481340a54d",
  "data": [
   {
    "question": "What is the first step in problem solving with systems of equations?",
    "choices": [
     "Define what the variables mean",
     "Set up the equations",
     "Guess a reasonable solution",
     "Draw a graph"
    ],
    "correct": 0,
    "why": [
     "Before the equations can be written down it must be clear what each letter stands for, for example \"k = the number of cows\".",
     "The equations come in step 2. Without defined variables you do not know what they mean.",
     "The method is algebraic and exact: guessing is not needed.",
     "A graph can help but is not part of the basic procedure: define, set up and solve, interpret."
    ]
   },
   {
    "question": "A farmer has $k$ cows and $h$ hens. What does the term $4k$ in the equation $4k + 2h = 352$ describe?",
    "choices": [
     "The total number of animals",
     "The number of cows times the number of heads",
     "That the farmer has 4 cows",
     "The total number of legs from the cows"
    ],
    "correct": 3,
    "why": [
     "The total number of animals is $k + h$, not $4k$.",
     "The heads are counted in the other equation ($k + h = 100$). Here it is about legs.",
     "The number 4 is the number of legs per cow, not the number of cows.",
     "Each cow has 4 legs, so k cows contribute 4k legs. The equation adds up all the legs to a total of 352."
    ]
   },
   {
    "question": "Two numbers have the sum 19 and the difference 5. Which system of equations describes this, if $x$ is the larger number?",
    "choices": [
     "$\\begin{cases} x + y = 19 \\\\ y - x = 5 \\end{cases}$",
     "$\\begin{cases} x + y = 5 \\\\ x - y = 19 \\end{cases}$",
     "$\\begin{cases} x \\cdot y = 19 \\\\ x - y = 5 \\end{cases}$",
     "$\\begin{cases} x + y = 19 \\\\ x - y = 5 \\end{cases}$"
    ],
    "correct": 3,
    "why": [
     "With x as the larger number, $y - x$ is negative (−5), not 5.",
     "The sum and the difference have swapped places. The sum of two numbers that differ by 19 cannot be 5 if both are positive.",
     "Sum means addition, not multiplication: $x \\cdot y$ is the product.",
     "The sum is the result of addition (19) and the difference of subtraction (5), and since x is the larger, $x - y$ is positive."
    ]
   },
   {
    "question": "The system of equations gives the solution $k = 76$ and $h = 24$. What remains according to the problem-solving procedure?",
    "choices": [
     "Nothing: the solution is the answer",
     "Draw the solution in a coordinate system",
     "Check that $k$ is greater than $h$",
     "Interpret the solution and answer the question in words"
    ],
    "correct": 3,
    "why": [
     "A pair of numbers is not a finished answer to a word problem. The answer should be formulated in the terms of the task.",
     "A graphical presentation is not needed, but the answer should be interpreted and formulated.",
     "There is no general requirement that one variable must be the larger.",
     "The last step is to interpret: \"The farmer has 76 cows and 24 hens.\" A good answer links back to what the question was actually about, and a reasonableness check never hurts."
    ]
   },
   {
    "question": "A class has $p$ boys and $f$ girls. There are 3 **more** girls than boys. Which equation is correct?",
    "choices": [
     "$f = p + 3$",
     "$f + p = 3$",
     "$f = 3p$",
     "$p = f + 3$"
    ],
    "correct": 0,
    "why": [
     "The girls are more: the number of girls is the number of boys plus 3.",
     "The sum of the numbers is not 3. It is the difference that is 3.",
     "\"3 more\" means adding 3, not multiplying by 3 (\"3 times as many\").",
     "That says the opposite, that there are 3 more boys than girls: a classic trap when writing the equation."
    ]
   }
  ]
 },
 "ma2c-2.1": {
  "kalla": "41e8a41c20",
  "data": [
   {
    "question": "What does the first square rule say?",
    "choices": [
     "$(a + b)^2 = a^2 + 2ab + b^2$",
     "$(a + b)^2 = a^2 + ab + b^2$",
     "$(a + b)^2 = a^2 + b^2$",
     "$(a + b)(a - b) = a^2 - b^2$"
    ],
    "correct": 0,
    "why": [
     "The square of a sum gives both squares PLUS twice the product, 2ab.",
     "The product should be doubled: the middle term is 2ab, not ab.",
     "Twice the product is missing: $(a + b)^2$ is not the same as $a^2 + b^2$. Test with a = b = 1: the LHS is 4 but the RHS is 2.",
     "That is the difference of two squares, not a square rule."
    ]
   },
   {
    "question": "When can the difference of two squares rule be used to expand an expression?",
    "choices": [
     "When a bracket is raised to the power 2",
     "When the brackets contain completely different terms",
     "When both brackets contain a minus sign",
     "When two identical brackets are multiplied and the only difference is the sign between the terms"
    ],
    "correct": 3,
    "why": [
     "A bracket squared is expanded with a square rule, not the difference of two squares.",
     "With completely different terms there is no shortcut: you have to multiply term by term.",
     "Two minus brackets, for example $(a - b)(a - b)$, are a square: the second square rule applies then.",
     "A conjugate pair is exactly a pair like $(a + b)(a - b)$: the same terms, different signs between them. The product is $a^2 - b^2$."
    ]
   },
   {
    "question": "Expand $(x - 5)^2$.",
    "choices": [
     "$x^2 - 25$",
     "$x^2 - 10x - 25$",
     "$x^2 + 10x + 25$",
     "$x^2 - 10x + 25$"
    ],
    "correct": 3,
    "why": [
     "$x^2 - 25$ is the result of the conjugate pair $(x + 5)(x - 5)$. A square produces a middle term.",
     "The last term is $(-5)^2 = +25$: the square of a negative number is positive.",
     "The plus sign in front of the middle term belongs to $(x + 5)^2$. Here the sign is minus.",
     "The second square rule: the square of x, minus twice the product 10x, plus the square of 5."
    ]
   },
   {
    "question": "What is twice the product when $(3x + 2)^2$ is expanded?",
    "choices": [
     "$9x$",
     "$5x$",
     "$6x$",
     "$12x$"
    ],
    "correct": 3,
    "why": [
     "$9x$ confuses it with the square of $3x$ (which is $9x^2$).",
     "$5x$ would be the sum of the coefficients. Twice the product is $2 \\cdot 3x \\cdot 2$.",
     "$6x$ is the product of the terms. It must also be doubled.",
     "Multiply the terms and double: $3x \\cdot 2 = 6x$, doubled gives $12x$. The whole expansion is $9x^2 + 12x + 4$."
    ]
   },
   {
    "question": "Can $(7 + 2x)(2x - 7)$ be expanded with the difference of two squares?",
    "choices": [
     "Yes: swap the terms in the first bracket to $(2x + 7)$, then the rule gives $4x^2 - 49$",
     "Yes: directly without rewriting it becomes $49 - 4x^2$",
     "No: the brackets start with different terms, so the rule can never be used",
     "No: the difference of two squares only applies when both brackets have plus signs"
    ],
    "correct": 0,
    "why": [
     "Terms with a plus sign between them may swap places: $(7 + 2x) = (2x + 7)$. Then the conjugate pair $(2x + 7)(2x - 7)$ is clear and gives $(2x)^2 - 7^2 = 4x^2 - 49$.",
     "Without rewriting you cannot see which number is \"a\", and the sign comes out wrong: the answer is $4x^2 - 49$, not $49 - 4x^2$.",
     "The order in a bracket with a plus sign can always be swapped, and then it is a conjugate pair.",
     "The difference of two squares requires exactly one plus bracket and one minus bracket. That is what makes it a conjugate pair."
    ]
   }
  ]
 },
 "ma2c-2.2": {
  "kalla": "bc542e0525",
  "data": [
   {
    "question": "What does it mean to factorise an expression?",
    "choices": [
     "To rewrite the expression as a multiplication",
     "To expand all brackets",
     "To simplify the expression as far as possible",
     "To set the expression equal to 0"
    ],
    "correct": 0,
    "why": [
     "Factors are the parts of a multiplication. To factorise is to write the expression as a product of factors.",
     "Expanding brackets is the opposite: then you go from a product to a sum.",
     "Factorising is a special kind of rewriting. The result is not always \"simpler\", but it is a product.",
     "Setting an expression equal to 0 creates an equation. That is not factorising."
    ]
   },
   {
    "question": "Which rule is used to factorise $x^2 - 49$?",
    "choices": [
     "Taking out the common factor 7",
     "The first square rule backwards",
     "The second square rule backwards",
     "The difference of two squares backwards: \"a square minus a square is a conjugate pair\""
    ],
    "correct": 3,
    "why": [
     "The terms $x^2$ and 49 have no common factor to take out.",
     "The square rules require THREE terms. Here there are only two.",
     "The second square rule also requires three terms, with a middle term.",
     "Two squares ($x^2$ and $7^2$) with a minus between them: $x^2 - 49 = (x + 7)(x - 7)$."
    ]
   },
   {
    "question": "Factorise $x^2 - 10x + 25$.",
    "choices": [
     "$(x + 5)(x - 5)$",
     "$x(x - 10) + 25$",
     "$(x - 5)^2$",
     "$(x + 5)^2$"
    ],
    "correct": 2,
    "why": [
     "The conjugate pair gives $x^2 - 25$, without a middle term.",
     "That is not a finished factorisation: the expression is not written as a single product.",
     "Three terms, the first and last are squares, minus in front of the middle term: the second square rule backwards. Check: twice the product $2 \\cdot x \\cdot 5 = 10x$ is correct.",
     "The plus version $(x + 5)^2$ gives the middle term $+10x$, but here it is $-10x$."
    ]
   },
   {
    "question": "What is the first step when you are to factorise an expression?",
    "choices": [
     "Try the difference of two squares",
     "Check whether something can be taken out \"as usual\"",
     "Complete the square",
     "Set the expression equal to 0"
    ],
    "correct": 1,
    "why": [
     "The difference of two squares may come into play, but only after common factors have been taken out.",
     "The order is: 1) take out a common factor if possible, 2) use a square rule or the difference of two squares backwards. Taking out first makes the rest easier, as in $50x^2 - 98 = 2(25x^2 - 49)$.",
     "Completing the square is a technique for solving equations, not the first step in factorising.",
     "Factorising is a rewriting of the expression: no equation is needed."
    ]
   },
   {
    "question": "How is the rational expression $\\dfrac{x^2 - 4}{2x + 4}$ simplified?",
    "choices": [
     "Factorise to $\\dfrac{(x+2)(x-2)}{2(x+2)}$ and cancel $(x+2)$, leaving $\\dfrac{x-2}{2}$",
     "The expression cannot be simplified",
     "Divide the numerator and denominator by $x$, leaving $\\dfrac{x - 4}{2 + 4}$",
     "Cross out $x^2$ against $2x$ and 4 against 4, leaving $\\dfrac{x}{2}$"
    ],
    "correct": 0,
    "why": [
     "First the numerator (difference of two squares) and the denominator (take out 2) are factorised, then the common FACTOR $(x + 2)$ is cancelled.",
     "It certainly can: both the numerator and the denominator can be factorised with a common factor.",
     "Not all the terms contain $x$, and dividing term by term is not allowed in fractions.",
     "Only factors may be cancelled, never individual terms in a sum. Crossing out terms gives the wrong result."
    ]
   }
  ]
 },
 "ma2c-2.3": {
  "kalla": "769226ee18",
  "data": [
   {
    "question": "Which principle is the zero product method based on?",
    "choices": [
     "All quadratic equations have the solution $x = 0$",
     "If a product equals 0, at least one factor must equal 0",
     "An equation may always be multiplied by 0",
     "If a sum equals 0, both terms must be 0"
    ],
    "correct": 1,
    "why": [
     "Only equations without a constant term have the root 0.",
     "Two numbers can never be multiplied to give 0 if neither of them is 0. Therefore some factor must be 0.",
     "Multiplying an equation by 0 destroys it (everything becomes 0 = 0).",
     "A sum can become 0 in many ways (for example $5 + (-5)$). The principle applies to products."
    ]
   },
   {
    "question": "Which types of equations are suitably solved with the zero product method?",
    "choices": [
     "Equations with $x$ under a root sign",
     "Only equations that are already in factorised form",
     "Equations with both $x^2$-terms and $x$-terms (without a constant term), and equations where a product equals 0",
     "All equations that contain $x^2$"
    ],
    "correct": 2,
    "why": [
     "Radical equations are solved by squaring, not with the zero product method.",
     "The method also works on unfactorised expressions: factorising is step 2 of the method.",
     "When the constant term is missing, x can be taken out as a factor, and when the left-hand side is a product equal to 0, the method gives the solutions directly.",
     "Complete quadratic equations (with a constant term) require the *pq* formula instead."
    ]
   },
   {
    "question": "What solutions does the equation $x(x - 8) = 0$ have?",
    "choices": [
     "Only $x = 0$",
     "$x_1 = 0$ and $x_2 = -8$",
     "Only $x = 8$",
     "$x_1 = 0$ and $x_2 = 8$"
    ],
    "correct": 3,
    "why": [
     "The bracket can also become 0. That gives the second solution x = 8.",
     "The factor $(x - 8)$ becomes 0 when $x = 8$ (opposite sign), not −8.",
     "The factor $x$ in front of the bracket also gives a solution: x = 0. It is easily forgotten.",
     "The factors are $x$ and $(x - 8)$. The first is 0 when x = 0, the second when x = 8."
    ]
   },
   {
    "question": "Why may you not divide both sides of $x^2 = 6x$ by $x$?",
    "choices": [
     "You certainly may: it gives both solutions",
     "Division by variables is always forbidden",
     "Then the solution $x = 0$ is lost",
     "Then the right-hand side becomes negative"
    ],
    "correct": 2,
    "why": [
     "The division only gives $x = 6$: the solution $x = 0$ disappears.",
     "Division by a variable is allowed when the variable is known not to be 0. The problem here is that it can be.",
     "Division by x assumes that x is not 0, but x = 0 IS one of the solutions. The right way: move everything to one side and factorise, $x(x - 6) = 0$.",
     "The sign is not affected by the division. The problem is the lost root."
    ]
   },
   {
    "question": "Which equation has the roots $x_1 = -2$ and $x_2 = 5$?",
    "choices": [
     "$(x - 2)(x + 5) = 0$",
     "$(x + 2)(x + 5) = 0$",
     "$(x - 2)(x - 5) = 0$",
     "$(x + 2)(x - 5) = 0$"
    ],
    "correct": 3,
    "why": [
     "The signs are swapped: this equation has the roots 2 and −5.",
     "The factor for the root 5 has the wrong sign: $(x + 5)$ gives the root −5.",
     "$(x - 2)$ gives the root +2, not −2.",
     "The roots are inserted with the opposite sign: the root −2 gives the factor $(x + 2)$ and the root 5 gives the factor $(x - 5)$."
    ]
   }
  ]
 },
 "ma2c-2.4": {
  "kalla": "4b3fe7bc44",
  "data": [
   {
    "question": "What type of equations is solved with the *pq* formula?",
    "choices": [
     "Complete quadratic equations, with an $x^2$-term, an $x$-term and a constant term",
     "Equations with only an $x^2$-term and a constant term",
     "Linear equations in two variables",
     "Equations with only an $x^2$-term and an $x$-term"
    ],
    "correct": 0,
    "why": [
     "When all three types of term are present, neither the usual method nor the zero product method is enough. Then the *pq* formula is used.",
     "Without an *x*-term the usual method is enough: solve for $x^2$ and take the square root.",
     "The *pq* formula applies to quadratic equations in ONE variable.",
     "Without a constant term the zero product method (take out x) is easier."
    ]
   },
   {
    "question": "According to the *pq* formula, the equation $x^2 + px + q = 0$ has the solutions …",
    "choices": [
     "$x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 + q}$",
     "$x = -\\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$",
     "$x = \\dfrac{p}{2} \\pm \\sqrt{\\left(\\dfrac{p}{2}\\right)^2 - q}$",
     "$x = -p \\pm \\sqrt{p^2 - q}$"
    ],
    "correct": 1,
    "why": [
     "Under the root sign the constant term should be subtracted (that is, q with the opposite sign).",
     "Half the coefficient with the opposite sign outside the root; under the root the same number squared minus the constant term.",
     "The sign outside the root should be the opposite: minus p/2, not plus.",
     "It is HALF the coefficient that is used, both outside and under the root."
    ]
   },
   {
    "question": "Which two requirements must be met before the *pq* formula is used?",
    "choices": [
     "The constant term is positive and the *x*-term is negative",
     "Both sides are positive and the equation has two solutions",
     "The equation is factorised and equal to 0",
     "One side is 0 and the coefficient of the $x^2$-term is 1"
    ],
    "correct": 3,
    "why": [
     "p and q may have any signs.",
     "The signs of the sides and the number of solutions do not matter for whether the formula may be used.",
     "Factorising belongs to the zero product method. The *pq* formula is used on the expanded form.",
     "The formula is based on the template $x^2 + px + q = 0$, so one side must be made 0 and any coefficient in front of $x^2$ must be divided away."
    ]
   },
   {
    "question": "How is $2x^2 + 12x - 14 = 0$ solved with the *pq* formula?",
    "choices": [
     "Put $p = 12$ and $q = -14$ directly into the formula",
     "Take out 2x and use the zero product method",
     "First divide both sides by 2, then use the *pq* formula on $x^2 + 6x - 7 = 0$",
     "Subtract 2 from both sides so that the coefficient disappears"
    ],
    "correct": 2,
    "why": [
     "p and q can only be read off WHEN the coefficient of $x^2$ is 1. Otherwise the answer is wrong.",
     "$2x$ is not a common factor of all three terms (the constant term contains no x).",
     "The coefficient of $x^2$ must go first: dividing by 2 gives $x^2 + 6x - 7 = 0$, and then the formula gives $x = -3 \\pm 4$.",
     "The coefficient is multiplied by $x^2$: subtraction does not remove it."
    ]
   },
   {
    "question": "In the solution $x = 4 \\pm \\sqrt{16 - 12}$, what does the $\\pm$ sign give?",
    "choices": [
     "That both solutions are $\\pm 2$",
     "That the solution is uncertain",
     "That the equation has no solutions",
     "The two solutions $x_1 = 4 - 2 = 2$ and $x_2 = 4 + 2 = 6$"
    ],
    "correct": 3,
    "why": [
     "The term 4 outside the root must be included: the solutions are 2 and 6, not ±2.",
     "Plus/minus does not mean uncertainty. It means that BOTH signs give valid solutions.",
     "The discriminant is positive (4), so there are two solutions.",
     "The square root of 4 is 2, and plus/minus gives the two roots: $4 - 2$ and $4 + 2$."
    ]
   }
  ]
 },
 "ma2c-2.5": {
  "kalla": "a96b8dd60b",
  "data": [
   {
    "question": "For which form of quadratic equation is the *abc* formula made?",
    "choices": [
     "$a(x + b)^2 = c$",
     "$ax^2 + bx + c = 0$",
     "$x^2 + px + q = 0$",
     "$ax^2 + bx = cx$"
    ],
    "correct": 1,
    "why": [
     "The squared form is most easily solved by taking the square root, not with the *abc* formula.",
     "The *abc* formula handles the general form, where the coefficient a in front of $x^2$ may be any number.",
     "That is the form of the *pq* formula, where the coefficient of $x^2$ must be 1.",
     "The formula requires one side to be 0."
    ]
   },
   {
    "question": "What distinguishes the *abc* formula from the *pq* formula?",
    "choices": [
     "The coefficient of the $x^2$-term does not need to be divided away before the *abc* formula is used",
     "The *abc* formula does not require a square root",
     "The *abc* formula gives more solutions than the *pq* formula",
     "The *pq* formula only works when q is positive"
    ],
    "correct": 0,
    "why": [
     "a is part of the *abc* formula, so the equation can be used as it stands. The *pq* formula first requires division so that the coefficient becomes 1.",
     "Both formulas contain a square root.",
     "Both formulas give exactly the same solutions: they are two routes to the same goal.",
     "The *pq* formula works for all signs of q."
    ]
   },
   {
    "question": "What are $a$, $b$ and $c$ in the equation $5x^2 - 3x - 2 = 0$?",
    "choices": [
     "$a = 5$, $b = -3$, $c = -2$",
     "$a = -3$, $b = 5$, $c = -2$",
     "$a = 5$, $b = 3$, $c = 2$",
     "$a = 5x^2$, $b = -3x$, $c = -2$"
    ],
    "correct": 0,
    "why": [
     "The coefficients are read off with their signs: 5 in front of $x^2$, −3 in front of $x$ and the constant term −2.",
     "a always belongs to the $x^2$-term, b to the *x*-term.",
     "The signs must come along: b and c are negative here.",
     "a, b and c are the numbers (the coefficients), not the whole terms."
    ]
   },
   {
    "question": "What is the expression under the root sign ($b^2 - 4ac$) for the equation $2x^2 - 8x + 6 = 0$?",
    "choices": [
     "$112$",
     "$16$",
     "$-48$",
     "$64$"
    ],
    "correct": 1,
    "why": [
     "$112$ is what you get if you ADD $4ac$ instead of subtracting.",
     "$b^2 - 4ac = (-8)^2 - 4 \\cdot 2 \\cdot 6 = 64 - 48 = 16$.",
     "$-48$ is only $-4ac$: the term $b^2 = 64$ is missing.",
     "$64$ is only $b^2$: the subtraction of $4ac = 48$ is missing."
    ]
   },
   {
    "question": "Do the *pq* formula and the *abc* formula give the same solutions to one and the same equation?",
    "choices": [
     "Yes: they are two equivalent methods that give exactly the same roots",
     "No: they apply to different types of equations",
     "Only if the coefficient of $x^2$ is 1",
     "No: the *abc* formula gives twice as many solutions"
    ],
    "correct": 0,
    "why": [
     "The formulas are algebraically equivalent: the *abc* formula becomes the *pq* formula if you divide the equation by a first.",
     "Both solve the same thing: complete quadratic equations equal to 0.",
     "They give the same answer for all coefficients. The only difference is how much preparation is needed.",
     "The number of roots is decided by the equation (the discriminant), not by which formula is used."
    ]
   }
  ]
 },
 "ma2c-2.6": {
  "kalla": "b0be4c5edd",
  "data": [
   {
    "question": "What is the expression under the root sign in the *pq* formula called?",
    "choices": [
     "Discriminant",
     "Double root",
     "Conjugate",
     "Coefficient"
    ],
    "correct": 0,
    "why": [
     "The discriminant $\\left(\\frac{p}{2}\\right)^2 - q$ \"discriminates\" (distinguishes) between the cases of two, one or no solutions.",
     "Double root is the name of the solution when the discriminant is 0, not of the expression itself.",
     "A conjugate pair is a pair of brackets of the type $(a+b)(a-b)$.",
     "Coefficients are the numbers in front of the variable terms in the equation."
    ]
   },
   {
    "question": "The discriminant of a quadratic equation is positive. How many solutions does the equation have?",
    "choices": [
     "Two",
     "None",
     "It depends on the constant term",
     "One"
    ],
    "correct": 0,
    "why": [
     "The square root of a positive number is a positive number, and ± then gives two different values.",
     "No solution occurs when the discriminant is negative.",
     "The constant term is already built into the discriminant: its sign alone decides.",
     "One solution only occurs when the discriminant is exactly 0 (then ± makes no difference)."
    ]
   },
   {
    "question": "Why does the equation have no solutions when the discriminant is negative?",
    "choices": [
     "The square root of a negative number has no (real) value: no number squared is negative",
     "Negative numbers cannot be solutions to equations",
     "The *pq* formula only works for positive numbers",
     "The equation then has infinitely many solutions instead"
    ],
    "correct": 0,
    "why": [
     "A number multiplied by itself is never negative, so there is no (real) value for the root, and the formula gives no roots.",
     "Solutions may certainly be negative (for example x = −7). It is the number UNDER THE ROOT that must not be negative.",
     "The formula handles negative p and q perfectly well. The only problem is a negative value under the root sign.",
     "A negative discriminant gives zero solutions, not infinitely many."
    ]
   },
   {
    "question": "How many solutions does $x^2 + 4x + 4 = 0$ have?",
    "choices": [
     "None",
     "One (a double root)",
     "Four",
     "Two"
    ],
    "correct": 1,
    "why": [
     "The discriminant is not negative. It is exactly 0, which gives one root.",
     "The *pq* formula gives $x = -2 \\pm \\sqrt{4 - 4} = -2 \\pm 0$: the discriminant is 0, so there is exactly one solution, x = −2.",
     "A quadratic equation can never have more than two solutions.",
     "Two solutions require a positive discriminant, but $2^2 - 4 = 0$."
    ]
   },
   {
    "question": "For which value of $q$ does $x^2 + 12x + q = 0$ have exactly one solution?",
    "choices": [
     "$q = 6$",
     "$q = 144$",
     "$q = 12$",
     "$q = 36$"
    ],
    "correct": 3,
    "why": [
     "6 is half the coefficient. The discriminant requires its square.",
     "144 is the whole coefficient squared ($12^2$). It is half the coefficient (6) that should be squared.",
     "q must match the SQUARE of half the coefficient: $6^2 = 36$, not the coefficient itself.",
     "The discriminant $6^2 - q$ should be 0, which gives $q = 36$."
    ]
   }
  ]
 },
 "ma2c-2.7": {
  "kalla": "88e3a798cb",
  "data": [
   {
    "question": "What is the first step in the problem-solving procedure?",
    "choices": [
     "Interpret the problem: define variables and draw a figure if needed",
     "Solve the equation with the *pq* formula",
     "Set up the equation",
     "Check the answer"
    ],
    "correct": 0,
    "why": [
     "First the problem must be understood: what is unknown, what should the variables mean, and would a figure help?",
     "Solving the equation is step 3. There is no equation to solve until the problem has been interpreted and written down.",
     "The equations are set up in step 2, after the variables have been defined.",
     "Checking and interpreting the answer is the last step."
    ]
   },
   {
    "question": "A quadratic equation from a geometry problem gives the roots $x_1 = -27$ and $x_2 = 45$, where $x$ is a length in cm. What applies?",
    "choices": [
     "Both roots are valid answers",
     "The answer is the mean of the roots",
     "The root $-27$ is disregarded: a length cannot be negative, so $x = 45$ cm",
     "The equation must have been solved incorrectly since one root is negative"
    ],
    "correct": 2,
    "why": [
     "A negative length is meaningless: only the positive root works as an answer.",
     "The roots are two separate candidates. They should be tested against reality, not averaged.",
     "The equation knows nothing about reality. The interpretation step weeds out roots that are unreasonable in context, such as negative lengths.",
     "Negative roots are perfectly normal mathematically. They are sorted out in the interpretation, not in the calculation."
    ]
   },
   {
    "question": "Two positive numbers have the difference 21 and the product 1 080. Which system of equations describes this, if $y$ is the larger number?",
    "choices": [
     "$\\begin{cases} y - x = 21 \\\\ x \\cdot y = 1\\,080 \\end{cases}$",
     "$\\begin{cases} y - x = 1\\,080 \\\\ x \\cdot y = 21 \\end{cases}$",
     "$\\begin{cases} x + y = 21 \\\\ x \\cdot y = 1\\,080 \\end{cases}$",
     "$\\begin{cases} y - x = 21 \\\\ x + y = 1\\,080 \\end{cases}$"
    ],
    "correct": 0,
    "why": [
     "Difference means subtraction (larger minus smaller = 21) and product means multiplication (= 1 080).",
     "The conditions have swapped places: the difference is 21 and the product 1 080.",
     "The difference is a gap between the numbers, not a sum: the numbers do not add up to 21.",
     "The product (the multiplication) is missing: 1 080 is the product of the numbers, not their sum."
    ]
   },
   {
    "question": "Why do you get a quadratic equation when the substitution $y = 21 + x$ is inserted into $x \\cdot y = 1\\,080$?",
    "choices": [
     "The product $x(21 + x)$ contains $x \\cdot x = x^2$",
     "You do not: the equation is linear",
     "The substitution method always gives quadratic equations",
     "The number 1 080 is large"
    ],
    "correct": 0,
    "why": [
     "When x is multiplied into the bracket, the term $x^2$ appears: $21x + x^2 = 1\\,080$, a quadratic equation that is solved with the *pq* formula.",
     "The term $x \\cdot x$ makes the equation quadratic.",
     "In linear systems (as in chapter 1) the substitution gives linear equations. It is the product condition that creates $x^2$ here.",
     "The size of the right-hand side does not affect the degree of the equation."
    ]
   },
   {
    "question": "A rectangle has the sides $x$ and $x - 18$ cm and the area $1\\,215\\ \\mathrm{cm}^2$. The question is about the **perimeter**. What should you do once $x = 45$ has been found?",
    "choices": [
     "Insert $x = 45$ into the perimeter formula $O = 4x - 36$: the answer is 144 cm, not 45",
     "Double $x$ to 90 cm",
     "Answer 45 cm: that is the solution to the equation, after all",
     "Multiply the sides to get the answer"
    ],
    "correct": 0,
    "why": [
     "The equation only gave the side x, but the question was about the perimeter. The last step is to calculate what was actually asked for: $O = 4 \\cdot 45 - 36 = 144$ cm.",
     "The perimeter is the sum of ALL four sides: $x + x + (x-18) + (x-18)$.",
     "x is an intermediate result. Answering with it means missing the interpretation step. The question was about the perimeter.",
     "The product of the sides is the area ($1\\,215\\ \\mathrm{cm}^2$), which was given from the start."
    ]
   }
  ]
 },
 "ma2c-2.8": {
  "kalla": "ac8c88782d",
  "data": [
   {
    "question": "What is a radical equation?",
    "choices": [
     "An equation with a square root in the answer",
     "An equation whose solution is 0",
     "An equation that has no roots",
     "An equation where the variable is under a root sign"
    ],
    "correct": 3,
    "why": [
     "What counts is that the variable is under the root sign in the EQUATION, not the form of the answer.",
     "The value of the solution has nothing to do with the name.",
     "Radical equations may very well have solutions. \"Radical\" refers to the root sign, not to the number of roots.",
     "The name refers to the variable (for example x) being under a root sign, as in $\\sqrt{x + 2} = 17$."
    ]
   },
   {
    "question": "What is the standard method for solving a radical equation?",
    "choices": [
     "Take the square root of both sides",
     "Isolate the root expression, square both sides and solve the equation, then check the solutions",
     "Guess and test different values",
     "Use the *pq* formula directly on the equation"
    ],
    "correct": 1,
    "why": [
     "Taking the square root would create even more root expressions. It is squaring that REMOVES root signs.",
     "Squaring removes the root sign, but it can create false roots, so the check is compulsory.",
     "The method is systematic and algebraic: no guessing is needed.",
     "The *pq* formula requires a quadratic equation without a root sign. It may become relevant only AFTER the squaring."
    ]
   },
   {
    "question": "What is a false root?",
    "choices": [
     "A solution that is negative",
     "A solution that contains a root sign",
     "A solution that appears when squaring but does not satisfy the original equation",
     "A rounded solution"
    ],
    "correct": 2,
    "why": [
     "Negative solutions can be perfectly valid. Whether a root is false is decided by the check in the original equation, not by the sign.",
     "The form of the solution does not matter. What counts is whether it satisfies the original equation.",
     "Squaring is not reversible: from $A = B$ it follows that $A^2 = B^2$, but $A^2 = B^2$ also holds for $A = -B$. Such extra solutions are exposed by the check.",
     "False roots are not about rounding but about the extra solutions created by squaring."
    ]
   },
   {
    "question": "The equation $x + 3\\sqrt{x} - 4 = 0$ is to be solved with a change of variable. Which substitution is suitable, and what is the new equation?",
    "choices": [
     "$t = 3\\sqrt{x}$ gives $t^2 + t - 4 = 0$",
     "$t = x + 3$ gives $t\\sqrt{x} = 4$",
     "$t = x^2$ gives $t + 3\\sqrt{t} - 4 = 0$",
     "$t = \\sqrt{x}$ gives $t^2 + 3t - 4 = 0$"
    ],
    "correct": 3,
    "why": [
     "With $t = 3\\sqrt{x}$ you get $x = t^2/9$: the coefficients become more complicated, not simpler.",
     "The substitution should replace the ROOT EXPRESSION so that the equation becomes free of roots.",
     "That substitution does not make the equation simpler: the root sign remains.",
     "With $t = \\sqrt{x}$ you get $x = t^2$, and the equation turns into an ordinary quadratic equation in t that the *pq* formula solves."
    ]
   },
   {
    "question": "After the substitution $t = \\sqrt{x}$ you get $t_1 = -4$ and $t_2 = 1$. What applies to $t_1 = -4$?",
    "choices": [
     "$t_1 = -4$ gives the solution $x = -16$",
     "$t_1 = -4$ gives the valid solution $x = 16$",
     "$t_1 = -4$ gives the solution $x = -2$",
     "$\\sqrt{x} = -4$ has no solution: a root expression is never negative (squaring gives the false root $x = 16$)"
    ],
    "correct": 3,
    "why": [
     "Squaring −4 gives +16, but that root is also false.",
     "The check in the original equation shows that x = 16 does NOT work (the LHS becomes 24, not 0).",
     "Square roots and halving have nothing to do with each other, and the equation $\\sqrt{x} = -4$ has no solution at all.",
     "The square root of a number is never negative, so $\\sqrt{x} = -4$ is impossible. If you square anyway you get x = 16, which the check exposes as a false root."
    ]
   }
  ]
 },
 "ma2c-3.1": {
  "kalla": "f13f5876e7",
  "data": [
   {
    "question": "What is the shape of the graph of a quadratic function called?",
    "choices": [
     "Parabola",
     "Hyperbola",
     "Straight line",
     "Sine curve"
    ],
    "correct": 0,
    "why": [
     "The graph of a quadratic function forms an \"arch\" called a parabola.",
     "A hyperbola is the graph of, for example, $y = 1/x$: two separate branches.",
     "Straight lines belong to linear functions ($y = kx + m$).",
     "The sine curve belongs to trigonometric functions and waves back and forth."
    ]
   },
   {
    "question": "What is a **stationary point** (extreme point)?",
    "choices": [
     "The point where the graph crosses the *y*-axis",
     "A collective name for maximum and minimum points",
     "The point where the graph is steepest",
     "Another name for a zero"
    ],
    "correct": 1,
    "why": [
     "The intersection with the *y*-axis is something else: it is given by the constant term.",
     "A stationary point is either a maximum point (\"peak\") or a minimum point (\"valley\"). Which of them it is, is called the nature of the point.",
     "At the stationary point the graph is, on the contrary, at its flattest: it turns there.",
     "Zeros are where the graph crosses the *x*-axis, not the peak or valley of the parabola."
    ]
   },
   {
    "question": "The function $f(x) = -3x^2 + 6x - 1$ has a negative $x^2$-term. What is the nature of the stationary point?",
    "choices": [
     "The function has no stationary point",
     "Minimum point: a negative squared term gives a \"happy mouth\"",
     "It depends on the constant term",
     "Maximum point: a negative squared term gives a \"sad mouth\""
    ],
    "correct": 3,
    "why": [
     "All quadratic functions have exactly one stationary point.",
     "The memory rule is the other way round: a positive term gives a happy mouth (minimum point).",
     "The nature is decided only by the sign of the squared term. The constant term just moves the graph up or down.",
     "A negative squared term makes the parabola open downwards (\"sad mouth\"): the graph has a peak, a maximum point."
    ]
   },
   {
    "question": "What applies to the line of symmetry of a parabola?",
    "choices": [
     "It is vertical, passes through the stationary point and is given by its *x*-coordinate",
     "It is horizontal and passes through the zeros",
     "It only exists if the parabola has zeros",
     "It always coincides with the *y*-axis"
    ],
    "correct": 0,
    "why": [
     "The line of symmetry divides the parabola into two mirror-image halves; the stationary point always lies on it, and its equation is written, for example, $x_s = 3$.",
     "The line of symmetry is vertical: a horizontal line cannot divide the parabola into two mirror-image halves.",
     "All parabolas have a line of symmetry, whether or not there are zeros.",
     "Only parabolas with the stationary point on the *y*-axis have $x_s = 0$. In general it lies somewhere else."
    ]
   },
   {
    "question": "How many zeros can a quadratic function have?",
    "choices": [
     "Two, one or none",
     "Any number",
     "Always exactly two",
     "Always at least one"
    ],
    "correct": 0,
    "why": [
     "The parabola can cross the *x*-axis twice, touch it once (double root) or lie entirely above or below it (no zeros).",
     "A parabola can never cross the *x*-axis more than twice.",
     "A parabola that lies entirely above the *x*-axis has no zeros, and one that touches it has only one.",
     "A parabola with its minimum point above the *x*-axis never crosses the axis."
    ]
   }
  ]
 },
 "ma2c-3.2": {
  "kalla": "fc68509a5d",
  "data": [
   {
    "question": "How are the **zeros** of a quadratic function found algebraically?",
    "choices": [
     "Take the mean of the coordinates of the stationary point",
     "Read off the constant term",
     "Set the function expression equal to 0 and solve the equation",
     "Substitute $x = 0$ into the function expression"
    ],
    "correct": 2,
    "why": [
     "The stationary point lies between the zeros but does not give them directly.",
     "The constant term is the value of the function at $x = 0$.",
     "Zeros are the *x*-values where the value of the function is 0. The equation $f(x) = 0$ (for example with the *pq* formula) gives them.",
     "$x = 0$ gives the intersection with the *y*-axis, not the zeros."
    ]
   },
   {
    "question": "A function has the zeros $x = 3$ and $x = 7$. What is the line of symmetry?",
    "choices": [
     "$x_s = 4$",
     "$x_s = 5$",
     "$x_s = 21$",
     "$x_s = 10$"
    ],
    "correct": 1,
    "why": [
     "4 is the distance between the zeros, $7 - 3 = 4$. The line of symmetry lies midway between them, at the mean.",
     "The line of symmetry lies midway between the zeros: $(3 + 7)/2 = 5$.",
     "21 is the product of the zeros, not the mean.",
     "10 is the sum of the zeros. It must be halved."
    ]
   },
   {
    "question": "A function has no zeros. How is the line of symmetry found anyway?",
    "choices": [
     "As \"the number in front of the root sign\" in the *pq* formula, that is $x_s = -\\dfrac{p}{2}$",
     "It cannot be: without zeros there is no line of symmetry",
     "By reading off the constant term q",
     "The line of symmetry is then always $x_s = 0$"
    ],
    "correct": 0,
    "why": [
     "The first term of the *pq* formula, $-\\dfrac{p}{2}$, gives the line of symmetry even when the expression under the root is negative.",
     "All parabolas have a line of symmetry. It is only the zeros that can be missing.",
     "q affects the vertical position of the graph and the number of zeros, not the position of the line of symmetry.",
     "The line of symmetry lies at $-\\dfrac{p}{2}$, which is rarely 0."
    ]
   },
   {
    "question": "How are the complete coordinates of the stationary point found?",
    "choices": [
     "The *x*-coordinate is a zero, the *y*-coordinate is 0",
     "The *x*-coordinate is the value of the line of symmetry, the *y*-coordinate is found by substituting into the function",
     "Both coordinates are read off in the *pq* formula",
     "x is the constant term and y is the coefficient of x"
    ],
    "correct": 1,
    "why": [
     "That describes a zero, not the stationary point.",
     "The stationary point lies on the line of symmetry ($x = x_s$), and the value of the function there, $f(x_s)$, is the *y*-coordinate of the stationary point.",
     "The *pq* formula gives the zeros and (via $-p/2$) the line of symmetry. The *y*-coordinate requires substitution into the function.",
     "The coefficients are not coordinates."
    ]
   },
   {
    "question": "Find the minimum value of $f(x) = x^2 - 10x + 21$, which has the zeros $x = 3$ and $x = 7$.",
    "choices": [
     "$-4$",
     "$0$",
     "$21$",
     "$5$"
    ],
    "correct": 0,
    "why": [
     "The line of symmetry is $x_s = 5$ and $f(5) = 25 - 50 + 21 = -4$: the minimum value is the *y*-coordinate of the stationary point.",
     "0 is the value of the function at the zeros, but the minimum point lies lower, between them.",
     "21 is the value of the function at $x = 0$ (the intersection with the *y*-axis).",
     "5 is the *x*-value of the line of symmetry. The minimum VALUE is the value of the function there, $f(5)$."
    ]
   }
  ]
 },
 "ma2c-3.3": {
  "kalla": "813b60055f",
  "data": [
   {
    "question": "What do $x_1$ and $x_2$ stand for in the factor form $f(x) = k(x - x_1)(x - x_2)$?",
    "choices": [
     "The zeros of the function",
     "The coefficients of the *x*-terms",
     "The coordinates of the stationary point",
     "Two arbitrary points on the graph"
    ],
    "correct": 0,
    "why": [
     "Substituting $x = x_1$ or $x = x_2$ makes one factor 0: they are exactly the zeros of the function.",
     "The coefficient in the factor form is k.",
     "The stationary point lies midway between the zeros but is not directly part of the factor form.",
     "The points in the factor form are not arbitrary: they are precisely the zeros."
    ]
   },
   {
    "question": "What is needed to find a quadratic function using the factor form (Method 1)?",
    "choices": [
     "Three arbitrary points on the graph",
     "The stationary point and the line of symmetry",
     "The zeros plus one more point on the graph (that is not a zero)",
     "Only the zeros"
    ],
    "correct": 2,
    "why": [
     "Three points belong to Method 2 (expanded form). The factor form manages with the zeros plus one point.",
     "The stationary point lies on the line of symmetry, so they partly give the same information. That is not enough to fix the function without the zeros.",
     "The zeros give the factors, but k is still unknown. An extra point is substituted to find k.",
     "Without an extra point k is unknown: infinitely many parabolas have the same zeros."
    ]
   },
   {
    "question": "When does the factor form method NOT work?",
    "choices": [
     "When the graph passes through the origin",
     "When the parabola has a maximum point",
     "When the function has no zeros or when the zeros are unknown",
     "When k is negative"
    ],
    "correct": 2,
    "why": [
     "The origin can itself be a zero (as for the fountain): the method works perfectly well.",
     "The nature does not matter. k becomes negative for a maximum point, but the method works.",
     "The factor form is built on the zeros. If they do not exist (or cannot be seen), three points and the expanded form are used instead.",
     "k may be any number except 0."
    ]
   },
   {
    "question": "What applies in the factor form if the function has a double root (the graph turns on the *x*-axis)?",
    "choices": [
     "$x_1 = x_2$: the same factor twice",
     "The function then has three zeros",
     "The factor form cannot be used",
     "k must be 0"
    ],
    "correct": 0,
    "why": [
     "With a double root the parabola touches the *x*-axis at a single point: $f(x) = k(x - x_1)^2$.",
     "A quadratic function can never have more than two zeros.",
     "The factor form works fine: the factor is simply repeated.",
     "k = 0 would make the whole function 0. k describes the shape, not the number of roots."
    ]
   },
   {
    "question": "A parabola has the zeros $x = -2$ and $x = 4$ and passes through (0, 8). What is $k$ in $f(x) = k(x + 2)(x - 4)$?",
    "choices": [
     "$k = 1$",
     "$k = -1$",
     "$k = 8$",
     "$k = -4$"
    ],
    "correct": 1,
    "why": [
     "With $k = 1$, $f(0) = 2 \\cdot (-4) = -8$, not $+8$.",
     "Substituting (0, 8): $8 = k(0 + 2)(0 - 4) = -8k$, which gives $k = -1$.",
     "The substitution gives $8 = -8k$. k is not the value of the function itself.",
     "The product $(0+2)(0-4) = -8$ is multiplied by k and should become 8, so $k = -1$."
    ]
   }
  ]
 },
 "ma2c-3.4": {
  "kalla": "41160e332d",
  "data": [
   {
    "question": "The equation $x^2 - 3x + 1 = 2x - 1$ is to be solved graphically. What do you draw?",
    "choices": [
     "The difference between the sides raised to the power 2",
     "Both sides as separate functions: $y = x^2 - 3x + 1$ and $y = 2x - 1$",
     "The line of symmetry of the left-hand side",
     "Only the left-hand side: $y = x^2 - 3x + 1$"
    ],
    "correct": 1,
    "why": [
     "No squaring is part of the graphical method.",
     "The method is the LHS and RHS as separate graphs: the *x*-coordinates of the intersections are the solutions.",
     "The line of symmetry finds the stationary point, not the solutions to an equation.",
     "Only the LHS works when the RHS is 0 (then the zeros are used). Here the RHS is a line."
    ]
   },
   {
    "question": "A quadratic equation equals 0. What graphical shortcut is there?",
    "choices": [
     "Draw the left-hand side and find the zeros of the graph",
     "None: equations equal to 0 cannot be solved graphically",
     "Draw $y = 0$ and find its stationary point",
     "Draw the left-hand side and find the stationary point"
    ],
    "correct": 0,
    "why": [
     "The RHS is 0, that is the *x*-axis. The intersections with it are exactly the zeros of the graph (the \"Roots\" tool in GeoGebra).",
     "It works perfectly well: the zeros are the solutions.",
     "$y = 0$ IS the *x*-axis: a straight line without a stationary point.",
     "The stationary point shows the maximum or minimum value, not where the function is 0."
    ]
   },
   {
    "question": "What do the *x*-coordinates of the points of intersection give when an **inequality** is solved graphically?",
    "choices": [
     "The boundaries of the solution intervals",
     "The sign of the inequality",
     "The solutions directly",
     "The maximum values of the functions"
    ],
    "correct": 0,
    "why": [
     "The intersections are where the graphs swap order (above/below). Their *x*-coordinates become the boundaries of the intervals, and then you decide which side applies.",
     "The sign is given in the task. The graph shows WHERE it is satisfied.",
     "Unlike an equation, the solution is a whole interval, not just the points of intersection.",
     "Maximum values belong to stationary points, not to solving inequalities."
    ]
   },
   {
    "question": "The inequality $f(x) > g(x)$ holds where …",
    "choices": [
     "the graph of $f$ lies below the graph of $g$",
     "the graph of $f$ lies above the graph of $g$",
     "the graphs intersect",
     "the graph of $f$ lies above the *x*-axis"
    ],
    "correct": 1,
    "why": [
     "Lying below corresponds to $f(x) < g(x)$.",
     "A larger function value means higher up in the coordinate system: f above g means $f(x) > g(x)$.",
     "At the intersections $f(x) = g(x)$: equality, not inequality.",
     "The *x*-axis is only the reference when the RHS is 0. Here f is compared with g."
    ]
   },
   {
    "question": "The parabola $f(x) = x^2 + 6x + 6$ crosses the line $g(x) = 1$ at $x = -5$ and $x = -1$, and lies below the line in between. What is the solution to $x^2 + 6x + 6 > 1$?",
    "choices": [
     "$x < -5$ and $x > -1$",
     "$x = -5$ and $x = -1$",
     "$x > -1$",
     "$-5 < x < -1$"
    ],
    "correct": 0,
    "why": [
     "The parabola lies ABOVE the line outside the intersections: the solution consists of two intervals, one on each side.",
     "Those are the solutions to the EQUATION $= 1$. The inequality is solved by whole intervals.",
     "The region to the left of $x = -5$ also satisfies the inequality: the parabola rises steeply in both directions.",
     "Between the intersections the parabola lies BELOW the line: that is the solution to $< 1$."
    ]
   }
  ]
 },
 "ma2c-3.5": {
  "kalla": "97f453b679",
  "data": [
   {
    "question": "The height of a rocket is described by $h(t) = 40t - 4.9t^2$. How do you find out graphically **when the rocket lands**?",
    "choices": [
     "Find the stationary point",
     "Read off where the graph crosses the *y*-axis",
     "Find the zero of the graph furthest to the right: there the height is 0 again",
     "Draw the auxiliary line $y = 40$"
    ],
    "correct": 2,
    "why": [
     "The stationary point gives the maximum height, not the landing.",
     "At $t = 0$ the rocket is launched: the intersection with the *y*-axis is the moment of launch.",
     "Landing means $h(t) = 0$: the right-hand zero gives the landing time (the left-hand one, $t = 0$, is the launch).",
     "40 is a coefficient in the function, not a height to aim for."
    ]
   },
   {
    "question": "How is the rocket's **maximum height** found graphically?",
    "choices": [
     "The *x*-coordinate of the maximum point is the answer",
     "By drawing $y = 100$ and finding the intersections",
     "With the Roots tool",
     "With the Extremum tool: the *y*-coordinate of the maximum point is the answer"
    ],
    "correct": 3,
    "why": [
     "The *x*-coordinate tells you WHEN the rocket is highest. The height is the *y*-coordinate.",
     "An arbitrary auxiliary line shows when a certain height is reached, not the maximum one.",
     "The zeros show when the height is 0: launch and landing.",
     "The maximum height is the largest function value: the *y*-coordinate of the maximum point."
    ]
   },
   {
    "question": "How do you find out **when** the rocket is at a height of 50 metres?",
    "choices": [
     "Substitute $t = 50$ into the function",
     "Find the zeros",
     "Read off the *y*-coordinate of the stationary point",
     "Draw the auxiliary line $y = 50$ and find its intersections with the graph"
    ],
    "correct": 3,
    "why": [
     "$t = 50$ gives the height after 50 seconds. The question is the reverse: when is the height 50?",
     "The zeros are about the height 0.",
     "The stationary point gives the maximum height, not a specific height.",
     "The intersections between the path and the line $y = 50$ give the times: typically two, one on the way up and one on the way down."
    ]
   },
   {
    "question": "A pen is built against a wall with 52 m of fencing for three sides. The two equal sides are called $x$. Why is the third side $52 - 2x$?",
    "choices": [
     "The wall is always twice as long as the sides",
     "The line of symmetry is at $x = 52$",
     "The area should be $52\\ \\mathrm{m}^2$",
     "The fencing is enough for three sides: two of them take $2x$, and the rest is left for the third"
    ],
    "correct": 3,
    "why": [
     "The wall replaces the fourth side and needs no fencing: its length is not part of the calculation.",
     "52 is the length of the fencing. The line of symmetry for the area ends up at $x = 13$.",
     "52 is the length of the fencing in metres, not the area.",
     "A total of 52 m is shared between three sides: $x + x + \\text{third side} = 52$, so the third side is $52 - 2x$."
    ]
   },
   {
    "question": "The area is described by $A(x) = x(52 - 2x)$ and the Extremum tool gives (13, 338). How is this interpreted?",
    "choices": [
     "The pen should be 13 × 338 metres",
     "The maximum area is $338\\ \\mathrm{m}^2$ and is obtained when $x = 13$ m",
     "The area is always $338\\ \\mathrm{m}^2$ regardless of x",
     "The maximum area is $13\\ \\mathrm{m}^2$ and is obtained when $x = 338$ m"
    ],
    "correct": 1,
    "why": [
     "The dimensions are $x = 13$ m and $52 - 2x = 26$ m: 338 is the area, not a side.",
     "The *x*-coordinate of the maximum point is the value of x that gives the largest area, and the *y*-coordinate is the area itself. The dimensions are 13 m and $52 - 26 = 26$ m.",
     "The parabola shows precisely that the area VARIES with x: 338 is its largest value.",
     "The coordinates have swapped places: the *x*-value is the side, the *y*-value the area."
    ]
   }
  ]
 },
 "ma2c-4.1": {
  "kalla": "9ba080c2dc",
  "data": [
   {
    "question": "An angle is 90°. What is it called?",
    "choices": [
     "Obtuse angle",
     "Straight angle",
     "Acute angle",
     "Right angle"
    ],
    "correct": 3,
    "why": [
     "Obtuse angles lie between 90° and 180°.",
     "A straight angle is 180°: half a turn.",
     "Acute angles are smaller than 90°.",
     "Exactly 90° is the definition of a right angle. It is often marked with a small square."
    ]
   },
   {
    "question": "What is a **transversal**?",
    "choices": [
     "A line that crosses at least two other lines",
     "A line that is parallel to another line",
     "A line that divides an angle in half",
     "An angle that is larger than 180°"
    ],
    "correct": 0,
    "why": [
     "The transversal is the crossing line. When it crosses two parallel lines, corresponding angles, alternate angles and so on arise.",
     "Parallel lines never cross each other: the transversal does exactly the opposite.",
     "A ray that divides an angle in half is called a bisector.",
     "A transversal is a line, not an angle."
    ]
   },
   {
    "question": "Two parallel lines are crossed by a transversal. What applies to **corresponding** angles?",
    "choices": [
     "Together they are 90°",
     "One is twice as large as the other",
     "They are equal",
     "Together they are 180°"
    ],
    "correct": 2,
    "why": [
     "None of the angle pairs at a transversal add up to 90° in general.",
     "Twice as large belongs to the inscribed angle theorem in circles, not to transversals.",
     "Corresponding angles sit in the same position at each crossing, and are equal when the lines are parallel.",
     "Together 180° applies to angles on a straight line."
    ]
   },
   {
    "question": "The angles $v_3$ and $v_4$ together form a straight angle. What are they called, and what is their sum?",
    "choices": [
     "Corresponding angles: the sum is 360°",
     "Vertically opposite angles: the sum is 180°",
     "Alternate angles: the sum is 90°",
     "Angles on a straight line: the sum is 180°"
    ],
    "correct": 3,
    "why": [
     "Corresponding angles are equal, and a full turn (360°) is four right angles, not one straight angle.",
     "Vertically opposite angles lie opposite each other and are EQUAL: their sum varies.",
     "Alternate angles are equal (at parallel lines), not complementary.",
     "Angles that together form a straight angle are called angles on a straight line, and a straight angle is 180°."
    ]
   },
   {
    "question": "What does a **bisector** do?",
    "choices": [
     "Divides an angle in half",
     "Divides a line segment in half",
     "Crosses two parallel lines",
     "Always forms a right angle with the base"
    ],
    "correct": 0,
    "why": [
     "A bisector is a ray that divides an angle into two equal halves.",
     "The bisector divides an ANGLE. The point that divides a line segment in half is called the midpoint.",
     "That describes a transversal.",
     "The bisector follows the direction of the angle: it is rarely perpendicular to anything."
    ]
   }
  ]
 },
 "ma2c-4.2": {
  "kalla": "9bd7f26f77",
  "data": [
   {
    "question": "What is the angle sum in a triangle?",
    "choices": [
     "180°",
     "It depends on the shape of the triangle",
     "90°",
     "360°"
    ],
    "correct": 0,
    "why": [
     "The angle sum in a triangle is always 180°, whatever its shape.",
     "The sum is always exactly 180°: it does not depend on the shape.",
     "90° is a single right angle.",
     "360° is the angle sum in a quadrilateral."
    ]
   },
   {
    "question": "What is the angle sum in a quadrilateral?",
    "choices": [
     "720°",
     "360°",
     "180°",
     "540°"
    ],
    "correct": 1,
    "why": [
     "720° is the angle sum of a hexagon (four triangles).",
     "A quadrilateral can be divided into two triangles: the angle sum is 2 · 180° = 360°.",
     "180° is the angle sum of a triangle.",
     "540° is the angle sum of a pentagon (three triangles)."
    ]
   },
   {
    "question": "How is the angle sum in a pentagon found?",
    "choices": [
     "The angle sum is always 360° regardless of the number of vertices",
     "Divide the pentagon into three triangles from one vertex: 3 · 180° = 540°",
     "Add 100° per vertex: 5 · 100° = 500°",
     "Multiply the number of vertices by 90°: 5 · 90° = 450°"
    ],
    "correct": 1,
    "why": [
     "360° only applies to quadrilaterals (and full turns).",
     "Line segments from one vertex to all the others divide the pentagon into three triangles, and each triangle contributes 180°.",
     "100° per vertex is made up. The method is dividing into triangles.",
     "Vertices times 90° does not work: test with the triangle, 3 · 90° = 270° ≠ 180°."
    ]
   },
   {
    "question": "What characterises an **equilateral** triangle?",
    "choices": [
     "A right angle",
     "All sides equal and all angles 60°",
     "All angles different",
     "At least two sides equal"
    ],
    "correct": 1,
    "why": [
     "A right angle makes the triangle right-angled: its sides follow Pythagoras' theorem.",
     "Equilateral means all three sides are equal, which forces all angles to be 180°/3 = 60°.",
     "The opposite: in an equilateral triangle all angles are equal.",
     "At least two equal sides describes an isosceles triangle."
    ]
   },
   {
    "question": "In an isosceles triangle the base angles are …",
    "choices": [
     "different",
     "together 90°",
     "equal",
     "always 60°"
    ],
    "correct": 2,
    "why": [
     "It is precisely the equality of the base angles that characterises isosceles triangles.",
     "Their sum depends on the apex angle: it is not fixed at 90°.",
     "The base angles (the angles at the base) of an isosceles triangle are always equal.",
     "60° only applies in the special equilateral case."
    ]
   }
  ]
 },
 "ma2c-4.3": {
  "kalla": "5451d68e0a",
  "data": [
   {
    "question": "What does $A \\implies B$ mean?",
    "choices": [
     "A leads to B, but B does not need to lead to A",
     "A contradicts B",
     "A and B are the same statement",
     "A leads to B and B leads to A"
    ],
    "correct": 0,
    "why": [
     "The implication points one way: if A is true, B must be true, but not necessarily the other way round.",
     "Implication is about A IMPLYING B, not contradicting it.",
     "A and B are different statements linked by a logical arrow.",
     "That describes the equivalence A ⟺ B."
    ]
   },
   {
    "question": "When are two statements **equivalent**?",
    "choices": [
     "When both statements are false",
     "When the implication holds in both directions",
     "When there is a counterexample",
     "When the implication holds in at least one direction"
    ],
    "correct": 1,
    "why": [
     "Whether the statements are true in individual cases does not decide the logical relation.",
     "Equivalence A ⟺ B requires that A leads to B AND that B leads to A.",
     "A counterexample DISPROVES an implication. It does not create an equivalence.",
     "One direction is only enough for implication."
    ]
   },
   {
    "question": "How do you show that the implication \"it is a dog ⟹ it is a dachshund\" is false?",
    "choices": [
     "By listing many dachshunds",
     "By showing that all dachshunds are dogs",
     "It cannot be shown",
     "With a single counterexample, for example a poodle"
    ],
    "correct": 3,
    "why": [
     "Supporting examples never prove an implication, and they do not help against a counterexample.",
     "That shows the CONVERSE implication (dachshund ⟹ dog), which is actually true.",
     "Oh yes it can: counterexamples are exactly the tool for this.",
     "A poodle is a dog that is not a dachshund: a single counterexample is enough to disprove the implication."
    ]
   },
   {
    "question": "Why does the implication $x^2 = 25 \\implies x = 5$ NOT hold?",
    "choices": [
     "The equation also has the solution $x = -5$: a counterexample",
     "The implication certainly holds",
     "25 is not a perfect square",
     "Square roots cannot be calculated exactly"
    ],
    "correct": 0,
    "why": [
     "$x = -5$ satisfies $x^2 = 25$ but not $x = 5$. The solution is not unique, so the implication fails.",
     "It does not hold: quadratic equations usually have two roots.",
     "$25 = 5^2$ certainly is a perfect square. That is not where the error lies.",
     "$\\sqrt{25} = 5$ is exact. The problem is the choice of sign, not the calculation."
    ]
   },
   {
    "question": "Which sign applies between $x^3 = 27$ and $x = 3$?",
    "choices": [
     "⟹ to the right but not to the left",
     "⟺: both directions hold since cube roots are unique",
     "⟸ to the left but not to the right",
     "None: the statements are unrelated"
    ],
    "correct": 1,
    "why": [
     "The leftward direction also holds: substituting $x = 3$ gives $27 = 27$.",
     "An odd exponent gives exactly one real solution: $x^3 = 27$ has only $x = 3$, and $x = 3$ of course gives $x^3 = 27$. Both directions hold.",
     "The rightward direction also holds: the cube root of 27 is uniquely 3.",
     "The connection is direct: the equation and its unique solution."
    ]
   }
  ]
 },
 "ma2c-4.4": {
  "kalla": "6ae577d711",
  "data": [
   {
    "question": "What is the difference between an axiom and a theorem?",
    "choices": [
     "An axiom only applies in geometry",
     "An axiom holds without proof, a theorem has been proved",
     "They are the same thing",
     "An axiom has been proved, a theorem holds without proof"
    ],
    "correct": 1,
    "why": [
     "Axioms exist in all of mathematics, for example \"every integer n is followed by n + 1\".",
     "Axioms are agreed basic principles that proofs rest on; theorems are statements that have been proved from axioms, definitions and earlier theorems.",
     "The difference is precisely the proofs: axioms require none, theorems do.",
     "Exactly the opposite."
    ]
   },
   {
    "question": "What does a completed proof end with?",
    "choices": [
     "An exclamation mark",
     "The full Latin phrase is the only thing allowed",
     "QED (which was to be proved/shown)",
     "Answer: followed by a number"
    ],
    "correct": 2,
    "why": [
     "The proof is marked with a formal ending, not a punctuation mark.",
     "QED is short for the Latin *quod erat demonstrandum*, and the abbreviation is our convention.",
     "A proof ends with QED (\"which was to be proved\" or \"which was to be shown\").",
     "\"Answer:\" belongs to calculation tasks. Proofs end with QED."
    ]
   },
   {
    "question": "How is an arbitrary **odd** number written, if $k$ is an integer?",
    "choices": [
     "$2k + 1$",
     "$k + 1$",
     "$2k$",
     "$3k$"
    ],
    "correct": 0,
    "why": [
     "An odd number is an even number plus 1: $2k + 1$.",
     "$k + 1$ can be both even and odd depending on k.",
     "$2k$ is always even (divisible by 2).",
     "$3k$ also alternates between odd and even, for example 3, 6, 9."
    ]
   },
   {
    "question": "In a proof every step must …",
    "choices": [
     "be justified on the basis of axioms, definitions or previously known theorems",
     "be approved by a teacher",
     "contain an equation",
     "be tested with at least three examples"
    ],
    "correct": 0,
    "why": [
     "That is what makes the reasoning a proof: no gaps, every step rests on something established.",
     "The validity of the proof lies in the logic, not in an approval.",
     "Proofs can also be carried out in words and with geometry: the requirement is the justification, not the form.",
     "Examples illustrate but do not prove. A proof must cover ALL cases."
    ]
   },
   {
    "question": "Why are the numbers written as $n$, $n + 1$, $n + 2$ when you prove something about three consecutive integers?",
    "choices": [
     "Because the sum is then always even",
     "To avoid negative numbers",
     "Because it is shorter to write",
     "So that the proof applies to ALL such triples of numbers, not just one example"
    ],
    "correct": 3,
    "why": [
     "The sum 3n + 3 is divisible by 3, but whether it is even varies with n.",
     "n may be negative: the proof still holds.",
     "The purpose is generality, not shorter notation.",
     "The variable n represents any integer, so what is shown for n, n+1, n+2 holds in general. An example such as 4, 5, 6 only proves that case."
    ]
   }
  ]
 },
 "ma2c-4.5": {
  "kalla": "f4cb9ea2ad",
  "data": [
   {
    "question": "What does Pythagoras' theorem say?",
    "choices": [
     "The hypotenuse is always twice as long as a leg",
     "In a right-angled triangle the sum of the squares of the legs equals the square of the hypotenuse",
     "The angle sum in a right-angled triangle is 90°",
     "In all triangles the sum of the two shortest sides equals the longest"
    ],
    "correct": 1,
    "why": [
     "The ratio of the hypotenuse to a leg varies: it is not a fixed 2:1.",
     "$a^2 + b^2 = c^2$, where a and b are the legs and c the hypotenuse, and the theorem applies precisely to right-angled triangles.",
     "The angle sum is 180° in all triangles.",
     "The sides are not simply added: it is the SQUARES that are summed, and only in right-angled triangles."
    ]
   },
   {
    "question": "In a right-angled triangle the legs are 3 and 4. What is the hypotenuse?",
    "choices": [
     "$\\sqrt{7}$",
     "5",
     "7",
     "25"
    ],
    "correct": 1,
    "why": [
     "$\\sqrt{7}$ is what you get if you add the sides instead of the squares.",
     "$c^2 = 3^2 + 4^2 = 25$, so $c = 5$: the classic 3-4-5 triangle.",
     "7 is the sum of the legs, but it is the squares that should be summed, followed by the square root.",
     "25 is $c^2$: do not forget to take the square root."
    ]
   },
   {
    "question": "Why is the solution written $x = \\pm\\sqrt{144}$ but the answer is only 12?",
    "choices": [
     "−12 is a calculation error",
     "Negative numbers have no square root",
     "A length cannot be negative, so the negative root is disregarded",
     "You always choose the largest number"
    ],
    "correct": 2,
    "why": [
     "−12 solves the equation correctly. It is rejected for geometric reasons, not because of a calculation error.",
     "The square root of a negative number does not exist, but here it is the root that gives ± in front of a positive result.",
     "The equation $x^2 = 144$ mathematically has two roots, but in geometry x is a side length: the interpretation weeds out −12.",
     "The choice is governed by reasonableness (positive length), not size."
    ]
   },
   {
    "question": "The sides of a triangle are 6, 8 and 11. Is the triangle right-angled?",
    "choices": [
     "No: $6^2 + 8^2 = 100$ but $11^2 = 121$",
     "It cannot be decided without the angles",
     "Yes: $6 + 8 > 11$",
     "Yes: the 6-8 triangle is always right-angled"
    ],
    "correct": 0,
    "why": [
     "The converse of Pythagoras' theorem: the equality $a^2 + b^2 = c^2$ must hold. Here $100 \\neq 121$, so there is no right angle.",
     "Pythagoras' theorem is an equivalence: the sides are enough to decide the matter.",
     "The triangle inequality only decides whether the triangle EXISTS, not whether it is right-angled.",
     "With the hypotenuse 10 it would be right-angled, but here the longest side is 11."
    ]
   },
   {
    "question": "Pythagoras' theorem is an equivalence: $a^2 + b^2 = c^2 \\iff$ …",
    "choices": [
     "the triangle is right-angled",
     "the triangle has an obtuse angle",
     "the triangle is equilateral",
     "the triangle is isosceles"
    ],
    "correct": 0,
    "why": [
     "The relation holds in both directions: a right-angled triangle gives the equality, and the equality gives a right-angled triangle.",
     "Obtuse-angled triangles have, on the contrary, $a^2 + b^2 < c^2$.",
     "Equilateral triangles have all angles 60°: no right angle at all.",
     "Isosceles triangles are about two equal sides: no relation between squares."
    ]
   }
  ]
 },
 "ma2c-4.6": {
  "kalla": "fd2140af58",
  "data": [
   {
    "question": "What does the distance formula $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ calculate?",
    "choices": [
     "The slope between two points",
     "The distance between two points in a coordinate system",
     "The area of the triangle between the points",
     "The midpoint between two points"
    ],
    "correct": 1,
    "why": [
     "The slope is the quotient Δy/Δx, without squares.",
     "The formula is Pythagoras' theorem in coordinate form: the legs are the differences in the x- and *y*-directions and d is the hypotenuse.",
     "The formula gives a length, not an area.",
     "The midpoint is found from the means, not from roots and squares."
    ]
   },
   {
    "question": "What is the midpoint formula?",
    "choices": [
     "$(x_m, y_m) = (x_1 \\cdot x_2,\\ y_1 \\cdot y_2)$",
     "$(x_m, y_m) = \\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)$",
     "$(x_m, y_m) = (x_2 - x_1,\\ y_2 - y_1)$",
     "$(x_m, y_m) = \\left(\\dfrac{x_1 + y_1}{2},\\ \\dfrac{x_2 + y_2}{2}\\right)$"
    ],
    "correct": 1,
    "why": [
     "Multiplication has nothing to do with midpoints.",
     "The midpoint lies halfway between: the mean of the *x*-coordinates and the mean of the *y*-coordinates.",
     "The differences give the displacement between the points, not the middle.",
     "*x*- and *y*-coordinates must not be mixed: the means are taken coordinate by coordinate."
    ]
   },
   {
    "question": "What are the legs of the right-angled triangle that the distance formula is based on?",
    "choices": [
     "Two radii of a circle",
     "The horizontal distance $(x_2 - x_1)$ and the vertical distance $(y_2 - y_1)$",
     "The two coordinate axes",
     "The distance d and the midpoint"
    ],
    "correct": 1,
    "why": [
     "Radii belong to circle geometry, not the distance formula.",
     "Between the points a triangle is formed with a horizontal and a vertical leg. The distance is the hypotenuse, and Pythagoras' theorem gives the formula.",
     "The axes are reference lines. The legs are the distances between the coordinates of the points.",
     "d is the hypotenuse and the midpoint is a point, not a leg."
    ]
   },
   {
    "question": "Find the distance between (0, 0) and (6, 8).",
    "choices": [
     "100 l.u.",
     "48 l.u.",
     "14 l.u.",
     "10 l.u."
    ],
    "correct": 3,
    "why": [
     "100 is $d^2$: the square root is missing.",
     "48 is the product 6 · 8: the wrong operation.",
     "14 is the sum of the coordinates. Square, add and take the square root instead.",
     "$d = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$."
    ]
   },
   {
    "question": "The midpoint between (−4, 6) and (2, −2) is …",
    "choices": [
     "(1, −2)",
     "(−6, 8)",
     "(−2, 4)",
     "(−1, 2)"
    ],
    "correct": 3,
    "why": [
     "Sign error: check the means, −1 and +2.",
     "(−6, 8) is the difference between the points, not the middle.",
     "(−2, 4) is half the first point. Both points must be averaged.",
     "Means: $\\dfrac{-4 + 2}{2} = -1$ and $\\dfrac{6 + (-2)}{2} = 2$."
    ]
   }
  ]
 },
 "ma2c-4.7": {
  "kalla": "aba01782ee",
  "data": [
   {
    "question": "Two polygons are **similar**. What does that mean?",
    "choices": [
     "They have the same shape (corresponding angles equal and side ratios equal) but can be of different sizes",
     "They have at least one side in common",
     "They have the same perimeter",
     "They are exactly the same size"
    ],
    "correct": 0,
    "why": [
     "Similarity means the same shape: the figures may be of different sizes, rotated and reflected, but the angles and side ratios match.",
     "The figures do not need to touch each other at all.",
     "The perimeter usually differs (by the scale factor). It is the shape that must match.",
     "Same size AND similar means congruent, which is a stronger requirement."
    ]
   },
   {
    "question": "Why is it not enough to check the angles for quadrilaterals?",
    "choices": [
     "It certainly is: angles are always enough",
     "Quadrilaterals have no corresponding angles",
     "Figures with equal angles can have different proportions, for example a square and a long rectangle",
     "The angles cannot be measured in quadrilaterals"
    ],
    "correct": 2,
    "why": [
     "Only for triangles is one condition enough.",
     "Corresponding angles are identified vertex by vertex, just as in triangles.",
     "The square and the long rectangle both have four right angles but completely different shapes: the side ratios must also be checked.",
     "Angles are measured in the same way in all polygons."
    ]
   },
   {
    "question": "What is a **scale factor**?",
    "choices": [
     "The difference between two corresponding sides",
     "The number of vertices of the polygon",
     "The ratio between two corresponding sides: how many times larger one figure is",
     "The sum of all the side ratios"
    ],
    "correct": 2,
    "why": [
     "The difference varies from side to side: it is the RATIO that is constant.",
     "The number of vertices must be the same for similarity, but it is not the scale factor.",
     "The scale factor is found by dividing corresponding sides, for example 24/8 = 3: all sides in the larger figure are 3 times longer.",
     "A single pair of sides is enough: the ratio is the same for all pairs."
    ]
   },
   {
    "question": "Two similar figures have the scale factor 3. The side 5 cm in the small one corresponds in the large one to …",
    "choices": [
     "8 cm",
     "15 cm",
     "5 cm",
     "45 cm"
    ],
    "correct": 1,
    "why": [
     "8 = 5 + 3: the scale factor is multiplied, not added.",
     "Corresponding side = 5 · 3 = 15 cm.",
     "The sides are only equal if the scale factor is 1.",
     "45 = 5 · 9: that would be the scale factor 3 used twice (which applies to AREAS, not sides)."
    ]
   },
   {
    "question": "The side $x$ in the large figure corresponds to the side 5 in the small one, and the pair of sides 24 and 8 is known. Which equation gives $x$?",
    "choices": [
     "$\\dfrac{x}{5} = \\dfrac{24}{8}$",
     "$x \\cdot 5 = 24 \\cdot 8$",
     "$\\dfrac{x}{24} = \\dfrac{8}{5}$",
     "$x - 5 = 24 - 8$"
    ],
    "correct": 0,
    "why": [
     "Corresponding sides have the same ratio: large/small = large/small, that is x/5 = 24/8, which gives x = 15.",
     "Products of sides belong to the intersecting chords theorem. Similarity is based on ratios.",
     "The pairs have been mixed up: x goes with 5 and 24 goes with 8.",
     "Differences are not preserved when scaling: the ratios are."
    ]
   }
  ]
 },
 "ma2c-4.8": {
  "kalla": "5548b24114",
  "data": [
   {
    "question": "What does $\\triangle ABC \\sim \\triangle DEF$ mean?",
    "choices": [
     "Triangle ABC is similar to triangle DEF",
     "Triangle ABC is congruent to triangle DEF",
     "The triangles are right-angled",
     "The triangles have the same area"
    ],
    "correct": 0,
    "why": [
     "The sign ~ is read \"is similar to\".",
     "Congruence is written with ≅.",
     "Similarity says nothing about right angles.",
     "Similarity is about shape: the area differs by the scale factor squared."
    ]
   },
   {
    "question": "Why is it enough for TWO angles to be equal for two triangles to be similar?",
    "choices": [
     "Because the sides are then equal",
     "Two angles are not enough: all three must be checked",
     "Because triangles always have a right angle",
     "The third angle is automatically equal, because of the angle sum 180°"
    ],
    "correct": 3,
    "why": [
     "Similarity does not require equal sides, only the same shape.",
     "Yes they are: the third follows for free from the angle sum.",
     "Triangles do not need to have a right angle.",
     "If two angles match, the third must also match: 180° minus the same two numbers gives the same remainder."
    ]
   },
   {
    "question": "Which condition is enough for two triangles to be similar?",
    "choices": [
     "The triangles must not be mirror images",
     "Corresponding angles equal OR side ratios equal: one of them is enough",
     "Both the angles and the side ratios must be checked",
     "The triangles must be the same size"
    ],
    "correct": 1,
    "why": [
     "Similar figures may be mirror images.",
     "Unlike other polygons, ONE condition is enough for triangles.",
     "That applies to polygons with more than three vertices.",
     "Size is irrelevant for similarity."
    ]
   },
   {
    "question": "Alva (1.60 m) has a shadow of 1.20 m at the same time as the flagpole's shadow is 6.75 m. Why are the triangles similar?",
    "choices": [
     "The sun's rays give the same angle in both triangles, and both have a right angle to the ground: two equal angles",
     "Because Alva is standing next to the flagpole",
     "They are not similar, only congruent",
     "Because the shadows have different lengths"
    ],
    "correct": 0,
    "why": [
     "The same angle of the sun + a right angle = two equal angles in both triangles. That is enough for similarity, and the side ratios give the height 9.00 m.",
     "The position does not matter: it is the angles that decide.",
     "Congruence would require the same size. The triangles are of different sizes but similar.",
     "The different shadow lengths are the whole point (different sizes). The similarity comes from the angles."
    ]
   },
   {
    "question": "Two similar triangles have the side ratio 0.6. A side in the large one is 7.5 cm. The corresponding side in the small one is …",
    "choices": [
     "4.5 cm",
     "6.9 cm",
     "8.1 cm",
     "12.5 cm"
    ],
    "correct": 0,
    "why": [
     "Small/large = 0.6 gives small side = 7.5 · 0.6 = 4.5 cm.",
     "6.9 = 7.5 − 0.6: the ratio is multiplied, not subtracted.",
     "8.1 = 7.5 + 0.6: the ratio is a factor, not something added on.",
     "12.5 = 7.5/0.6: that would be going the wrong way (enlarging instead of reducing)."
    ]
   }
  ]
 },
 "ma2c-4.9": {
  "kalla": "bfffe91c5f",
  "data": [
   {
    "question": "What does the **top triangle theorem** say?",
    "choices": [
     "A transversal divides the sides of the triangle in different ratios",
     "A parallel transversal forms a top triangle that is similar to the whole triangle",
     "The top triangle is always half of the whole triangle",
     "The apex angle of a triangle is always the largest"
    ],
    "correct": 1,
    "why": [
     "The opposite: the transversal theorem says that the sides are divided in the SAME ratio.",
     "The parallel transversal creates a smaller triangle with the same angles (common apex angle + corresponding angles): similar to the original.",
     "The ratio of the sizes depends on where the transversal is drawn.",
     "The size of the apex angle depends on the triangle. The theorem is about similarity."
    ]
   },
   {
    "question": "What does the **transversal theorem** say?",
    "choices": [
     "The transversal divides the triangle into two equal parts",
     "The transversal is always parallel to the base",
     "The sides are divided in the ratio 1:2",
     "A parallel transversal divides the sides of the triangle in the same ratio: $\\dfrac{a}{b} = \\dfrac{c}{d}$"
    ],
    "correct": 3,
    "why": [
     "How the area is divided depends on where the transversal lies.",
     "The theorem ASSUMES that the transversal is parallel to the base. That is not the conclusion.",
     "The ratio can be anything: the point is that it is the SAME on both sides.",
     "The parts of the sides above the transversal relate to the parts below in the same way on both sides."
    ]
   },
   {
    "question": "When must the top triangle theorem be used instead of the transversal theorem?",
    "choices": [
     "When the base of the top triangle (the transversal) or the whole base is part of the calculation",
     "When the sides are equal",
     "Always: the transversal theorem is just a guess",
     "When the triangle is right-angled"
    ],
    "correct": 0,
    "why": [
     "The transversal theorem only compares the PARTS of the sides. As soon as the bases (DE or BC) are involved, the top triangle theorem is needed, which compares whole sides and bases.",
     "The side lengths do not decide the choice of method. Whether the bases are used does.",
     "Both are proven theorems. The rule of thumb is to choose the transversal theorem when possible, for simpler calculation.",
     "Being right-angled does not affect the choice of theorem."
    ]
   },
   {
    "question": "What does the **angle bisector theorem** say?",
    "choices": [
     "The bisector divides the opposite side in the same ratio as the two adjacent sides",
     "The bisector divides the opposite side in half",
     "The bisector is always perpendicular to the opposite side",
     "The bisector divides the triangle into two congruent parts"
    ],
    "correct": 0,
    "why": [
     "The parts of the opposite side relate to each other as the adjacent sides: $\\dfrac{AD}{BD} = \\dfrac{AC}{BC}$.",
     "It is only divided in half if the adjacent sides are equal (isosceles triangle).",
     "Being perpendicular applies to the altitude, not the bisector.",
     "The parts are only congruent in special cases. The theorem is about ratios."
    ]
   },
   {
    "question": "A parallel transversal divides the sides so that $\\dfrac{a}{b} = \\dfrac{c}{d}$ with $a = 4$, $b = 8$ and $c = 5$. What is $d$?",
    "choices": [
     "2.5",
     "40",
     "9",
     "10"
    ],
    "correct": 3,
    "why": [
     "2.5 is what you get if the ratio is turned the wrong way: d should be LARGER than c just as b is larger than a.",
     "40 is the cross product $4d$: divide by 4 to get d.",
     "9 = 8 + 1: the ratio is multiplicative, not additive.",
     "$\\dfrac{4}{8} = \\dfrac{5}{d}$ gives $4d = 40$, that is $d = 10$."
    ]
   }
  ]
 },
 "ma2c-4.10": {
  "kalla": "d82432cb47",
  "data": [
   {
    "question": "What is required for two figures to be **congruent**?",
    "choices": [
     "They have the same perimeter",
     "They have the same number of vertices",
     "They are similar and the same size",
     "They are similar: the size does not matter"
    ],
    "correct": 2,
    "why": [
     "Two completely different figures can have the same perimeter.",
     "The number of vertices is necessary but far from sufficient.",
     "Congruence = similarity + the same size. The sign is ≅.",
     "Without the size requirement it is only similarity (~)."
    ]
   },
   {
    "question": "Which of the following is a valid congruence condition for triangles?",
    "choices": [
     "AAA: all three angles match",
     "SSS: all three sides match",
     "SSA: two sides and an angle that is not between them",
     "The perimeters match"
    ],
    "correct": 1,
    "why": [
     "AAA only gives similarity: a large and a small triangle can have the same angles.",
     "SSS is one of the three conditions (together with SAS and ASA): three equal sides fix the triangle completely.",
     "SSA is not valid: the third side can \"swing\" two ways and give two different triangles.",
     "The same perimeter can be achieved with completely different triangles."
    ]
   },
   {
    "question": "In the condition SAS, where must the angle be?",
    "choices": [
     "Anywhere in the triangle",
     "At the base",
     "Between the two sides (included)",
     "Opposite the longest side"
    ],
    "correct": 2,
    "why": [
     "With another angle (SSA) the triangle is not unique: the condition fails.",
     "\"The base\" is just a choice in the drawing. The condition is about the two given sides.",
     "Side-ANGLE-side: the angle is squeezed between the two known sides, and then the triangle is uniquely determined.",
     "The position relative to the longest side is irrelevant. What counts is the position between the known sides."
    ]
   },
   {
    "question": "Two triangles are congruent by SSS. The side with two tick marks in one of them is 32 cm. What applies in the other?",
    "choices": [
     "All sides are 32 cm",
     "The side with one tick mark is 32 cm",
     "The side with two tick marks is also 32 cm",
     "No conclusion can be drawn"
    ],
    "correct": 2,
    "why": [
     "Only the corresponding side is 32 cm. The others have their own lengths.",
     "One tick mark marks a DIFFERENT pair of sides, which can have a different length.",
     "The same number of tick marks marks corresponding sides, and in congruent triangles corresponding sides are exactly equal.",
     "Congruence gives exactly this conclusion: corresponding parts are equal."
    ]
   },
   {
    "question": "What is the difference between the signs ~ and ≅?",
    "choices": [
     "~ is used for angles and ≅ for sides",
     "They mean the same thing",
     "≅ means similar, ~ means congruent",
     "~ means similar, ≅ means congruent (similar AND the same size)"
    ],
    "correct": 3,
    "why": [
     "Both signs relate whole figures, not individual parts.",
     "The difference is the size requirement: congruence requires figures of the same size.",
     "Exactly the opposite.",
     "~ = the same shape; ≅ = the same shape and the same size. Congruence is the stronger requirement."
    ]
   }
  ]
 },
 "ma2c-4.11": {
  "kalla": "80fd23be42",
  "data": [
   {
    "question": "What is an **inscribed angle**?",
    "choices": [
     "An angle that is larger than 180°",
     "The angle between a tangent and a radius",
     "An angle with its vertex at the centre of the circle",
     "An angle with its vertex on the circumference of the circle"
    ],
    "correct": 3,
    "why": [
     "The size of the angle is not part of the definition: the position of the vertex is.",
     "Tangent to radius is always 90°: a special case, but not the definition of an inscribed angle.",
     "That is a central angle.",
     "The vertex of an inscribed angle lies on the circumference (the edge of the circle) and its arms stand on an arc."
    ]
   },
   {
    "question": "What does the inscribed angle theorem say?",
    "choices": [
     "The inscribed angle is as large as the arc",
     "The central angle is twice as large as the inscribed angle on the same arc",
     "The inscribed angle is twice as large as the central angle",
     "All inscribed angles are 90°"
    ],
    "correct": 1,
    "why": [
     "An angle and an arc length are different quantities. The theorem compares two angles.",
     "$y = 2x$: the central angle (y) is twice the inscribed angle (x) when they stand on the same arc.",
     "The relation is the other way round: the central angle is the larger.",
     "90° only applies to inscribed angles on a semicircular arc."
    ]
   },
   {
    "question": "Two inscribed angles stand on the same arc. What applies?",
    "choices": [
     "They are equal",
     "One is twice as large",
     "Together they are 180°",
     "Together they are 90°"
    ],
    "correct": 0,
    "why": [
     "Corollary: both are half of the same central angle, so they are equal, wherever on the circumference the vertices are.",
     "Twice as large applies between the CENTRAL angle and the inscribed angle.",
     "The sum 180° applies to opposite angles in a cyclic quadrilateral.",
     "There is no such sum: the angles are simply equal."
    ]
   },
   {
    "question": "A triangle is formed by two radii and a chord. What do you know for certain about the triangle?",
    "choices": [
     "It is right-angled",
     "It is isosceles: two sides are radii and therefore equal",
     "Nothing in particular",
     "It is equilateral"
    ],
    "correct": 1,
    "why": [
     "It is only right-angled in special cases (for example an inscribed angle on a semicircular arc).",
     "All radii in a circle are equal, so the triangle gets two equal legs and therefore equal base angles.",
     "Yes we do: the equal length of the radii always gives an isosceles triangle.",
     "Equilateral requires the chord to happen to be as long as the radius too."
    ]
   },
   {
    "question": "What angle does a tangent form with the radius to the point of tangency?",
    "choices": [
     "Always 90°",
     "Always 180°",
     "It depends on the size of the circle",
     "Always 45°"
    ],
    "correct": 0,
    "why": [
     "The tangent touches the circle at exactly one point and is always perpendicular to the radius there, justified by \"tangent perpendicular to radius\".",
     "180° would mean that the tangent coincides with the extension of the radius, and then it would cut the circle.",
     "The angle is 90° regardless of the radius of the circle.",
     "45° has no special status here."
    ]
   }
  ]
 },
 "ma2c-4.12": {
  "kalla": "55c72735e3",
  "data": [
   {
    "question": "What is a **chord**?",
    "choices": [
     "A line segment from the centre to the circumference",
     "A line that touches the circle at exactly one point",
     "A line segment between two points on the circumference of the circle",
     "An angle in the circle"
    ],
    "correct": 2,
    "why": [
     "That is a radius.",
     "That is a tangent.",
     "The chord connects two points on the circumference. The diameter is the longest chord.",
     "A chord is a line segment, not an angle."
    ]
   },
   {
    "question": "Two chords intersect each other in the parts $a, b$ and $c, d$ respectively. What does the intersecting chords theorem say?",
    "choices": [
     "$a - b = c - d$",
     "$a \\cdot b = c \\cdot d$",
     "$\\dfrac{a}{b} = \\dfrac{c}{d}$",
     "$a + b = c + d$"
    ],
    "correct": 1,
    "why": [
     "The differences have no relation.",
     "The products of the parts of each chord are equal. This follows from similar triangles via inscribed angles and vertically opposite angles.",
     "The quotient form belongs to the transversal theorem. The intersecting chords theorem uses products.",
     "The sums (the lengths of the chords) are usually different."
    ]
   },
   {
    "question": "Which theorems are used in the proof of the intersecting chords theorem?",
    "choices": [
     "Inscribed angles on the same arc and vertically opposite angles give similar triangles",
     "The square rules",
     "The angle bisector theorem",
     "Pythagoras' theorem and the distance formula"
    ],
    "correct": 0,
    "why": [
     "The auxiliary line segments create two triangles with equal angles (inscribed angles on the same arc + vertically opposite angles). The similarity gives the side ratio, which is cross-multiplied.",
     "Algebraic rules for brackets are not involved.",
     "Bisectors do not appear in the intersecting chords theorem.",
     "No right angles are needed in the proof."
    ]
   },
   {
    "question": "What applies to opposite angles in a **cyclic quadrilateral**?",
    "choices": [
     "Together they are 180°",
     "They are equal",
     "Together they are 360°",
     "They are always right angles"
    ],
    "correct": 0,
    "why": [
     "Opposite angles add up to 180°. The proof uses the inscribed angle theorem: the central angles 2u + 2v make up a full turn.",
     "They are only equal in special cases (for example a rectangle).",
     "360° is the sum of ALL four angles.",
     "Right angles require the quadrilateral to be a rectangle."
    ]
   },
   {
    "question": "In a cyclic quadrilateral one angle is 115°. The opposite angle is …",
    "choices": [
     "115°",
     "65°",
     "245°",
     "75°"
    ],
    "correct": 1,
    "why": [
     "Equal angles do not apply in general: the sum should be 180°.",
     "$180° - 115° = 65°$ (opposite angles in a cyclic quadrilateral).",
     "245° would give the sum 360°. It is the angle sum of the whole quadrilateral that is 360°, not of the pair.",
     "75° gives the sum 190°. Check the subtraction: 180 − 115 = 65."
    ]
   }
  ]
 },
 "ma2c-5.1": {
  "kalla": "fa8eb82c27",
  "data": [
   {
    "question": "What distinguishes a power equation from an exponential equation?",
    "choices": [
     "In the power equation the variable is in the exponent, in the exponential equation in the base",
     "They are the same thing",
     "Power equations always have two solutions",
     "In the power equation the variable is in the base, in the exponential equation in the exponent"
    ],
    "correct": 3,
    "why": [
     "Exactly the opposite.",
     "The difference in where the variable is placed decides which method of solving works.",
     "The number of solutions depends on whether the exponent is even or odd: even gives two, odd gives one.",
     "Power equation: $x^7 = 860$ (x in the base). Exponential equation: $2^x = 37$ (x in the exponent)."
    ]
   },
   {
    "question": "How is the power equation $x^7 = 860$ solved algebraically?",
    "choices": [
     "Take the logarithm of both sides and divide by 7",
     "It can only be solved graphically",
     "Divide both sides by 7",
     "Raise both sides to the power $\\dfrac{1}{7}$ or take the seventh root"
    ],
    "correct": 3,
    "why": [
     "Taking logarithms is the method for EXPONENTIAL EQUATIONS. Here the variable is in the base.",
     "Power equations have a direct algebraic solution.",
     "The exponent 7 is not a factor: division does not help.",
     "$x = 860^{1/7} = \\sqrt[7]{860} \\approx 2.63$: laws of exponents or root expressions."
    ]
   },
   {
    "question": "Why is the exponential equation $50\\,000 = 12\\,000 \\cdot 1.176^x$ solved graphically in this section?",
    "choices": [
     "Exponential equations can never be solved algebraically",
     "The calculator has no power button",
     "A graphical solution is always more exact",
     "We do not yet have an algebraic method for variables in the exponent: logarithms come in the next section"
    ],
    "correct": 3,
    "why": [
     "With logarithms it works perfectly well algebraically.",
     "The calculator's functions are enough. It is the method that is missing so far.",
     "Reading off a graph is, on the contrary, approximate.",
     "Without logarithms there is no tool for \"bringing down\" x from the exponent, hence the intersection method. Common logarithms (next section) then give the algebraic route."
    ]
   },
   {
    "question": "What does $C$ stand for in the model $y = C \\cdot a^x$?",
    "choices": [
     "The original value (the starting value)",
     "The time",
     "The change factor",
     "The new value"
    ],
    "correct": 0,
    "why": [
     "C is the value at the start ($x = 0$ gives $y = C \\cdot a^0 = C$).",
     "The time (the number of changes) is x.",
     "The change factor is a.",
     "The new value is y."
    ]
   },
   {
    "question": "Shares are bought for 12 000 kr and sold 5 years later for 27 000 kr. Which equation gives the annual change factor?",
    "choices": [
     "$27\\,000 = 12\\,000 \\cdot 5a$",
     "$12\\,000 = 27\\,000 \\cdot a^5$",
     "$27\\,000 = 12\\,000 \\cdot a^5$",
     "$27\\,000 = 12\\,000 + a^5$"
    ],
    "correct": 2,
    "why": [
     "5a describes LINEAR change. Percentage change is multiplicative, a^5.",
     "The starting and final values have swapped places, and then a becomes a decrease.",
     "The model y = C·aˣ with y = 27 000, C = 12 000 and x = 5: the power equation gives a = 2.25^(1/5) ≈ 1.176.",
     "The change factor is multiplied by the starting value, not added."
    ]
   }
  ]
 },
 "ma2c-5.2": {
  "kalla": "642a0c5e32",
  "data": [
   {
    "question": "What does $\\lg 100$ mean?",
    "choices": [
     "\"100 divided by 10\", so 10",
     "\"10 raised to the power 100\"",
     "\"The number that 10 must be raised to in order to become 100\", so 2",
     "\"The square root of 100\", so 10"
    ],
    "correct": 2,
    "why": [
     "A logarithm is not division. It is a question about an exponent.",
     "That would be $10^{100}$. The logarithm asks for the exponent, not the power.",
     "The common logarithm is the exponent of ten: $10^2 = 100$ gives $\\lg 100 = 2$.",
     "The square root is raising to the power one half: a different operation."
    ]
   },
   {
    "question": "What is $\\lg 1$?",
    "choices": [
     "Undefined",
     "1",
     "10",
     "0"
    ],
    "correct": 3,
    "why": [
     "$\\lg 1$ is well defined. It is logarithms of numbers ≤ 0 that do not exist.",
     "$10^1 = 10$, not 1.",
     "10 is the base, not the logarithm.",
     "$10^0 = 1$, so $\\lg 1 = 0$."
    ]
   },
   {
    "question": "Why must the number you take the logarithm of be **greater than 0**?",
    "choices": [
     "The calculator cannot handle negative numbers",
     "10 raised to anything can never be 0 or negative",
     "It is an arbitrary rule",
     "Logarithms are always positive"
    ],
    "correct": 1,
    "why": [
     "The restriction is mathematical, not technical.",
     "However small the exponent gets ($10^{-6} = 0.000\\,001$), the power is always positive: there is no exponent that gives 0 or a negative number.",
     "The rule follows directly from the properties of powers of ten.",
     "The logarithm ITSELF can be negative (lg 0.01 = −2). It is the number you take the logarithm of that must be positive."
    ]
   },
   {
    "question": "Without a calculator: between which integers does $\\lg 42$ lie, and why?",
    "choices": [
     "Between 1 and 2, since $10^1 = 10 < 42 < 100 = 10^2$",
     "Between 4 and 5, since 42 starts with 4",
     "Exactly 4.2",
     "Between 2 and 3, since 42 has two digits and one more"
    ],
    "correct": 0,
    "why": [
     "Squeeze the number between two powers of ten: 10 is too small, 100 too large, so the exponent lies between 1 and 2 (the calculator gives 1.62).",
     "The first digit does not control the power of ten.",
     "lg 42 is irrational, about 1.62, not 4.2.",
     "Almost the right idea: a number with two digits lies between $10^1$ and $10^2$, so its logarithm is between 1 and 2."
    ]
   },
   {
    "question": "What is $10^{\\lg a}$ (for $a > 0$)?",
    "choices": [
     "$10a$",
     "$\\lg a$",
     "$1$",
     "$a$"
    ],
    "correct": 3,
    "why": [
     "No multiplication by 10 takes place.",
     "lg a is the exponent: the power becomes the number itself.",
     "$10^0 = 1$ requires the exponent to be 0, that is a = 1, which is not true in general.",
     "lg a is exactly the exponent that makes the power of 10 become a, so $10^{\\lg a} = a$. The relation is used to write numbers with base 10."
    ]
   }
  ]
 },
 "ma2c-5.3": {
  "kalla": "9d6765758a",
  "data": [
   {
    "question": "What is the first step when $2^x = 37$ is solved with common logarithms?",
    "choices": [
     "Divide both sides by 2",
     "Take the square root of both sides",
     "Rewrite both sides with base 10: $(10^{\\lg 2})^x = 10^{\\lg 37}$",
     "Set $x = 37 - 2$"
    ],
    "correct": 2,
    "why": [
     "Division removes ONE factor 2, but x states how many there are.",
     "Taking roots helps when the variable is in the base, not in the exponent.",
     "With both sides as powers of ten, the laws of exponents can be used and the exponents set equal: $x \\cdot \\lg 2 = \\lg 37$.",
     "Subtraction has nothing to do with powers."
    ]
   },
   {
    "question": "Why may you set the exponents equal in $10^{x \\cdot \\lg 2} = 10^{\\lg 37}$?",
    "choices": [
     "You may always cross out things that look the same",
     "Two equal powers with the same base must have equal exponents",
     "Because 10 is an even number",
     "It is a rounding"
    ],
    "correct": 1,
    "why": [
     "Crossing out is valid precisely because the base is the same. It is not a general rule.",
     "The function $10^t$ takes each value exactly once: if the powers are equal, the exponents must be too.",
     "Whether the base is even or odd is irrelevant: the principle applies to all bases greater than 0 (except 1).",
     "The step is exact, with no rounding."
    ]
   },
   {
    "question": "What is a **logarithmic equation**?",
    "choices": [
     "An equation in two variables",
     "An equation where the variable is inside the logarithm, for example $\\lg x = 3$",
     "An equation that has no solution",
     "An equation where the variable is in the exponent"
    ],
    "correct": 1,
    "why": [
     "The number of variables has nothing to do with the name.",
     "The variable is inside the logarithm. The equation is solved by rewriting it in power form: $x = 10^3$.",
     "Logarithmic equations often have a solution, for example x = 1 000.",
     "That is an exponential equation."
    ]
   },
   {
    "question": "Rewrite $\\lg x = 2.5$ in power form.",
    "choices": [
     "$x = 10^{2.5}$",
     "$x = 2.5^{10}$",
     "$10^x = 2.5$",
     "$x = \\lg 2.5$"
    ],
    "correct": 0,
    "why": [
     "\"10 raised to what is on the right-hand side must become the number we have the logarithm of\": $10^{2.5} = x \\approx 316$.",
     "The base and the exponent have swapped places.",
     "That is a different equation, where x is the exponent.",
     "That takes the logarithm once more instead of inverting it."
    ]
   },
   {
    "question": "The solution to $10^x = 53$ is …",
    "choices": [
     "$x = 10^{53}$",
     "$x = 5.3$",
     "$x = \\dfrac{53}{10}$",
     "$x = \\lg 53 \\approx 1.72$"
    ],
    "correct": 3,
    "why": [
     "That is a power with exponent 53, not the exponent that gives 53.",
     "5.3 is 53/10: a logarithm is not a division.",
     "The same mistake: the exponent is wanted, not the quotient.",
     "Directly from the definition: the exponent that makes the power of 10 equal to 53 is lg 53 ≈ 1.72 (reasonable: between 1 and 2)."
    ]
   }
  ]
 },
 "ma2c-5.4": {
  "kalla": "db4c9e0f9e",
  "data": [
   {
    "question": "What does the **first** law of logarithms say?",
    "choices": [
     "$\\lg x + \\lg y = \\lg x^y$",
     "$\\lg x \\cdot \\lg y = \\lg xy$",
     "$\\lg x + \\lg y = \\lg(x + y)$",
     "$\\lg x + \\lg y = \\lg xy$"
    ],
    "correct": 3,
    "why": [
     "Exponent form belongs to the third law.",
     "It is the sum of the logarithms, not their product, that gives lg xy.",
     "A classic trap: the logarithm of a sum can NOT be split up.",
     "The sum of logarithms is the logarithm of the PRODUCT, for example lg 25 + lg 4 = lg 100 = 2."
    ]
   },
   {
    "question": "What does the **second** law of logarithms say?",
    "choices": [
     "$\\lg x - \\lg y = \\lg \\dfrac{x}{y}$",
     "$\\lg x - \\lg y = \\lg(x - y)$",
     "$\\lg x - \\lg y = \\dfrac{x}{y}$",
     "$\\dfrac{\\lg x}{\\lg y} = \\lg \\dfrac{x}{y}$"
    ],
    "correct": 0,
    "why": [
     "The difference of logarithms is the logarithm of the QUOTIENT, for example lg 3 000 − lg 3 = lg 1 000 = 3.",
     "The logarithm of a difference cannot be split up.",
     "The result is a logarithm, not the quotient itself.",
     "The quotient of two logarithms is something different from the logarithm of the quotient."
    ]
   },
   {
    "question": "What does the **third** law of logarithms say?",
    "choices": [
     "$\\lg x^p = p \\cdot \\lg x$",
     "$\\lg x^p = \\lg px$",
     "$\\lg x^p = (\\lg x)^p$",
     "$\\lg x^p = p + \\lg x$"
    ],
    "correct": 0,
    "why": [
     "The exponent can be brought down as a factor in front of the logarithm: the key to solving exponential equations algebraically.",
     "p is an exponent on x, not a factor inside the logarithm.",
     "The exponent is brought down as a FACTOR. The whole logarithm is not raised to a power.",
     "Multiplication, not addition."
    ]
   },
   {
    "question": "How is $5^x = 136$ solved with the third law of logarithms?",
    "choices": [
     "Divide both sides by 5: $x = \\dfrac{136}{5}$",
     "Take the logarithm of both sides and bring down the exponent: $x = \\dfrac{\\lg 136}{\\lg 5}$",
     "Take $\\lg$ of the left-hand side only",
     "$x = \\lg 136 - \\lg 5$"
    ],
    "correct": 1,
    "why": [
     "Division removes a factor 5, not the exponent.",
     "$\\lg 5^x = \\lg 136$ gives $x \\cdot \\lg 5 = \\lg 136$, that is $x = \\lg 136 / \\lg 5 \\approx 3.05$.",
     "An equation requires the same operation on BOTH sides.",
     "The difference $\\lg 136 - \\lg 5 = \\lg(136/5)$. It is the quotient of the logarithms that is needed, not the difference."
    ]
   },
   {
    "question": "In the equation $\\lg 100 = \\lg 2x$, why may the logarithm function be removed?",
    "choices": [
     "It may not be removed",
     "Because 100 is a power of ten",
     "When a single logarithm stands on each side, the contents must be equal: $100 = 2x$",
     "Logarithms may always be removed wherever they stand"
    ],
    "correct": 2,
    "why": [
     "Yes it may: that is exactly how logarithmic equations with several terms are finished.",
     "The removal works for all positive contents, not just powers of ten.",
     "The logarithm function takes each value exactly once: equal logarithms mean equal numbers. Then 100 = 2x is solved as usual (x = 50).",
     "First each side must be written as ONE logarithm (using the laws of logarithms). Removing term by term is wrong."
    ]
   }
  ]
 },
 "ma2c-5.5": {
  "kalla": "8a7d401a2c",
  "data": [
   {
    "question": "Something increases by 2.3 % per year. Which change factor is used in the model $y = C \\cdot a^x$?",
    "choices": [
     "$a = 1.023$",
     "$a = 1.23$",
     "$a = 0.023$",
     "$a = 2.3$"
    ],
    "correct": 0,
    "why": [
     "An increase of 2.3 % means that the whole value (100 %) plus 2.3 % is there: the factor is 1 + 0.023 = 1.023.",
     "1.23 corresponds to an increase of 23 %, not 2.3 %.",
     "0.023 is only the increase part. Then 97.7 % of the value would disappear every year.",
     "2.3 would mean that the value is multiplied by 2.3 every year (+130 %)."
    ]
   },
   {
    "question": "When are logarithms needed in the model $y = C \\cdot a^x$?",
    "choices": [
     "When the starting value $C$ is wanted",
     "Always",
     "When the time $x$ is wanted: the variable is in the exponent",
     "When the new value $y$ is wanted"
    ],
    "correct": 2,
    "why": [
     "C is found by division: $C = y/a^x$.",
     "Three of the four quantities can be reached without logarithms.",
     "y and C are found by substitution, a with a power equation, but x in the exponent requires taking logarithms and the third law of logarithms.",
     "y is found by direct calculation."
    ]
   },
   {
    "question": "The logarithm of both sides of the equation $1.2 = 1.023^x$ is taken. What is the next line?",
    "choices": [
     "$1.2 = x \\cdot \\lg 1.023$",
     "$\\lg 1.2 = x \\cdot \\lg 1.023$",
     "$\\lg 1.2 = 1.023 \\cdot \\lg x$",
     "$\\lg 1.2 = \\lg x \\cdot 1.023$"
    ],
    "correct": 1,
    "why": [
     "The LHS must also be logged: the same operation on both sides.",
     "The third law of logarithms brings down the exponent x: $\\lg 1.023^x = x \\cdot \\lg 1.023$.",
     "x is the exponent and is brought down as a factor; 1.023 stays in the logarithm.",
     "It is the exponent x that is brought down, not the base that is moved into the logarithm."
    ]
   },
   {
    "question": "The calculation gives $x \\approx 8.02$ years for the savings account, but the answer is \"after 9 years\". Why?",
    "choices": [
     "You should always round up to the nearest whole number",
     "8.02 is calculated incorrectly",
     "The interest is paid at the end of each year: the amount only passes the limit at the next full payment",
     "Logarithms only give whole-number answers"
    ],
    "correct": 2,
    "why": [
     "The rounding is motivated by the situation (annual payments), not by a general rule.",
     "The calculation is correct. The interpretation requires whole years.",
     "The model is continuous but the interest is discrete: after 8 years the amount has not passed 12 000 kr. That happens at the end of year 9.",
     "Logarithms give any real values."
    ]
   },
   {
    "question": "A value is HALVED over time according to $0.5 = a^x$. What characterises the change factor $a$?",
    "choices": [
     "$a < 1$: the value decreases",
     "$a$ is negative",
     "$a = 0.5$ always",
     "$a > 1$: the value increases"
    ],
    "correct": 0,
    "why": [
     "A decrease means a change factor below 1 (for example 0.85 at −15 % per year).",
     "Change factors are always positive, otherwise the value would alternate in sign.",
     "a = 0.5 only applies if the halving takes exactly one unit of time.",
     "a > 1 describes growth, and then half is never reached."
    ]
   }
  ]
 },
 "ma2c-5.6": {
  "kalla": "5bc3dbdabe",
  "data": [
   {
    "question": "What does $\\log_2 16$ mean?",
    "choices": [
     "\"The common logarithm of 32\"",
     "\"16 divided by 2\", so 8",
     "\"The number that 2 must be raised to in order to become 16\", so 4",
     "\"2 raised to the power 16\""
    ],
    "correct": 2,
    "why": [
     "The base is 2, not 10, and the number is 16.",
     "A logarithm is a question about an exponent, not division.",
     "General logarithms work like the common logarithm but with a different base: $2^4 = 16$ gives $\\log_2 16 = 4$.",
     "That would be $2^{16}$. The logarithm is the exponent, not the power."
    ]
   },
   {
    "question": "The equation $3^x = 25$ has the solution …",
    "choices": [
     "$x = \\dfrac{25}{3}$",
     "$x = \\lg 25$",
     "$x = \\log_3 25$",
     "$x = \\sqrt[3]{25}$"
    ],
    "correct": 2,
    "why": [
     "Division solves linear equations, not exponential equations.",
     "lg has base 10: it solves $10^x = 25$.",
     "The base is 3, so the solution is \"the base-3 logarithm of 25\".",
     "The cube root solves $x^3 = 25$, with the variable in the base."
    ]
   },
   {
    "question": "What is $5^{\\log_5 12}$?",
    "choices": [
     "60",
     "5",
     "12",
     "$\\log_5 12$"
    ],
    "correct": 2,
    "why": [
     "60 = 5 · 12, but a power is not multiplication.",
     "The base is 5, but the result is the number you took the logarithm of.",
     "The same relation as $10^{\\lg a} = a$ but with base 5: $5^{\\log_5 12} = 12$.",
     "That is the exponent: the power becomes the number itself."
    ]
   },
   {
    "question": "Why is the common logarithm written \"lg\" instead of $\\log_{10}$?",
    "choices": [
     "lg and log₁₀ are different functions",
     "Base 10 is so common that it has been given a shortened notation",
     "lg is a misprint",
     "lg always means base 2"
    ],
    "correct": 1,
    "why": [
     "They are exactly the same function.",
     "lg is just a shortening of log₁₀: the same function, a shorter name.",
     "lg is standard notation in Swedish mathematics.",
     "The base-2 logarithm is written log₂ (sometimes \"lb\")."
    ]
   },
   {
    "question": "Find $\\log_3 9$ without a calculator.",
    "choices": [
     "3",
     "$\\dfrac{9}{3} = 3$",
     "81",
     "2"
    ],
    "correct": 3,
    "why": [
     "3 is the base. The exponent that gives 9 is 2.",
     "The quotient 9/3 also happens to be 3, but the logarithm is the exponent question: $3^? = 9$.",
     "81 is $3^4$ (or $9^2$), not the exponent.",
     "$3^2 = 9$, so $\\log_3 9 = 2$."
    ]
   }
  ]
 },
 "ma2c-6.1": {
  "kalla": "f513061e4c",
  "data": [
   {
    "question": "What are the three most common **measures of central tendency**?",
    "choices": [
     "Mean, median and mode",
     "Median, quartile and percentile",
     "Mean, range and standard deviation",
     "Frequency, class midpoint and mean"
    ],
    "correct": 0,
    "why": [
     "The measures of central tendency summarise where the data \"lies\": the mean (the sum/the number), the median (the middle) and the mode (the most common).",
     "Quartiles and percentiles describe parts of the distribution, not primarily its position.",
     "The range and the standard deviation are measures of SPREAD.",
     "Frequency and class midpoint are auxiliary concepts, not measures of central tendency."
    ]
   },
   {
    "question": "How is the **median** found?",
    "choices": [
     "Divide the sum by the number of values",
     "Sort the values in order of size and take the value in the middle",
     "Take the largest value minus the smallest",
     "Take the value that occurs most often"
    ],
    "correct": 1,
    "why": [
     "That is the mean.",
     "The median is the middle value of the sorted data. With an even number of values, the mean of the two middle ones is taken.",
     "That is the range, a measure of spread.",
     "That is the mode."
    ]
   },
   {
    "question": "The ages 16, 16, 16, 17, 17, 18 and 61 have the mean 23 years. Why is the median (17 years) more representative here?",
    "choices": [
     "The mean is calculated incorrectly",
     "The median is always more representative than the mean",
     "The mode is always best",
     "The 61-year-old is an outlier that pulls up the mean. The median is not affected by it"
    ],
    "correct": 3,
    "why": [
     "The mean 161/7 = 23 is correct. It is the representativeness that is lacking.",
     "In symmetric data without outliers the mean usually works perfectly well.",
     "The mode (16) is an alternative, but the question is about the advantage of the median over the mean.",
     "With a skewed distribution the mean becomes misleading (no one in the room is close to 23 years old). The median does not care how extreme the outlier is."
    ]
   },
   {
    "question": "What is **frequency**?",
    "choices": [
     "The number of classes in a histogram",
     "The difference between two class midpoints",
     "The number of times a certain value occurs in the data",
     "The largest value in the data"
    ],
    "correct": 2,
    "why": [
     "The number of classes is just the number of classes. The frequency counts values.",
     "Class width describes the distance between class boundaries.",
     "The frequency states how many times a value occurs, for example that the frequency of the 17-year-olds is 12 if there are 12 of them.",
     "The largest value has no special name connected to frequency."
    ]
   },
   {
    "question": "What is a **class midpoint** in data divided into classes?",
    "choices": [
     "The class that has the highest frequency",
     "The value in the middle of an interval: the value everyone in the class is counted as having",
     "The median of all the data",
     "The middle of the x-axis of the histogram"
    ],
    "correct": 1,
    "why": [
     "The class with the highest frequency gives the modal class.",
     "The class 300 ≤ x < 400 has the class midpoint 350. When calculating the mean, for example, everyone in the class is counted as 350.",
     "The median is a measure of central tendency for all the data, not the middle of an interval.",
     "The class midpoint belongs to each individual class, not to the axis."
    ]
   }
  ]
 },
 "ma2c-6.2": {
  "kalla": "25a3a33eb9",
  "data": [
   {
    "question": "How is the **range** calculated?",
    "choices": [
     "The mean minus the median",
     "The largest value minus the smallest value",
     "The largest value divided by the smallest value",
     "The upper quartile minus the lower quartile"
    ],
    "correct": 1,
    "why": [
     "The difference between measures of central tendency is not a standard measure of spread.",
     "The range measures the span of all the data: largest − smallest.",
     "That is a quotient, not the range.",
     "That is the interquartile range."
    ]
   },
   {
    "question": "Which five values are needed to draw a box plot?",
    "choices": [
     "The smallest value, the lower quartile, the median, the upper quartile and the largest value",
     "Five randomly chosen values",
     "The five largest values",
     "The mean, the median, the mode, the frequency and the sum"
    ],
    "correct": 0,
    "why": [
     "The ends of the whiskers are the smallest and largest values, the edges of the box are the quartiles Q1 and Q3, and the line in the box is the median.",
     "The values are exactly determined by the data.",
     "All parts of the data are represented, not just the top.",
     "The box plot is built on quartiles, not on measures of central tendency and sums."
    ]
   },
   {
    "question": "What is the **lower quartile** $Q_1$?",
    "choices": [
     "The median of all the values to the left of (below) the median",
     "The smallest value in the data",
     "A quarter of the largest value",
     "The mean of the four smallest values"
    ],
    "correct": 0,
    "why": [
     "Q1 divides the lower half into two equal parts: 25 % of the values lie below Q1.",
     "The smallest value is the end of the whisker, not the quartile.",
     "The quartile is a position in the data, not a fraction of a value.",
     "Q1 is the median of the WHOLE lower half, whatever the number of values."
    ]
   },
   {
    "question": "What does it mean that one part of the box plot is LARGE?",
    "choices": [
     "The data contains errors",
     "The mean lies in that part",
     "The values in that part are spread out over a large interval",
     "That part contains more values than the others"
    ],
    "correct": 2,
    "why": [
     "Parts of different sizes are perfectly normal: that is how the spread shows.",
     "The mean is not shown in a box plot.",
     "Each part always contains 25 % of the values. A large part means that these 25 % are spread out (large spread).",
     "The number is always 25 % per part. It is the spread that varies."
    ]
   },
   {
    "question": "What does the 80th percentile, $p_{80}$, state?",
    "choices": [
     "The value that 80 % of the data is greater than",
     "80 % of the mean",
     "That the data contains 80 values",
     "The value that 80 % of the data is less than"
    ],
    "correct": 3,
    "why": [
     "The opposite: 20 % is greater than p80.",
     "The percentile is not linked to the mean.",
     "The percentile is a value in the data, not a number of values.",
     "Percentiles state what percentage is LOWER than the value: 80 % lies below p80 and 20 % above."
    ]
   }
  ]
 },
 "ma2c-6.3": {
  "kalla": "e908c59436",
  "data": [
   {
    "question": "How do you find statistical measures from a column of values in GeoGebra?",
    "choices": [
     "Switch to the Probability Calculator",
     "Select the values, choose One Variable Analysis and click \"Show Statistics\"",
     "Draw a scatter plot",
     "Type mean() in the input bar"
    ],
    "correct": 1,
    "why": [
     "The Probability Calculator is used for normal distributions.",
     "One Variable Analysis (the \"blue bars\" menu) with \"Show Statistics\" gives n, Mean, Min, Q1, Median, Q3, Max and more all at once.",
     "Scatter plots belong to TWO-variable analysis.",
     "Individual commands exist, but the statistics table gives everything together."
    ]
   },
   {
    "question": "What does **n** stand for in GeoGebra's statistics table?",
    "choices": [
     "The standard deviation",
     "The mean",
     "The largest value",
     "The number of values"
    ],
    "correct": 3,
    "why": [
     "The standard deviation is shown at σ and s respectively.",
     "The mean is shown at \"Mean\".",
     "The largest value is shown at \"Max\".",
     "n is the number of values entered: a good check that everything has been included."
    ]
   },
   {
    "question": "How is the percentile $p_{90}$ calculated in GeoGebra?",
    "choices": [
     "Click \"Show Statistics\": the percentile is in the table",
     "Read off Q3 in the statistics table",
     "Multiply the mean by 0.9",
     "Create a list of the values and type Percentile(l1, 90%) in the input bar"
    ],
    "correct": 3,
    "why": [
     "The statistics table shows quartiles but not arbitrary percentiles.",
     "Q3 is the 75th percentile, not the 90th.",
     "The percentile is a boundary value in the data, not a fraction of the mean.",
     "Percentiles require the command Percentile with a list and a percentage. The values are first made into a list using \"Create List\"."
    ]
   },
   {
    "question": "A frequency table is to be analysed in GeoGebra. How is it entered?",
    "choices": [
     "The values in one column and the frequencies in the column to the right: select both",
     "Only the frequencies are entered",
     "Frequency tables cannot be analysed in GeoGebra",
     "Each value is entered as many times as the frequency states"
    ],
    "correct": 0,
    "why": [
     "GeoGebra weights the values by the frequencies when both columns are selected: 177 students become 14 cells.",
     "Without the values GeoGebra does not know WHAT has been counted.",
     "Oh yes they can: it is one of the strengths of the spreadsheet.",
     "That works, but it is exactly the work that the frequency column saves you."
    ]
   },
   {
    "question": "How is a box plot drawn in GeoGebra?",
    "choices": [
     "Choose One Variable Analysis and change the chart type from \"Histogram\" to \"Box Plot\" in the drop-down list",
     "Box plots have to be drawn by hand",
     "Use the Extremum tool",
     "Type \"box plot\" in the input bar"
    ],
    "correct": 0,
    "why": [
     "The drop-down list in One Variable Analysis has several chart types. Box Plot is one of them, and the chart can be copied to the Graphics view.",
     "GeoGebra draws the box plot automatically from the values.",
     "Extremum belongs to function graphs.",
     "The command is called BoxPlot, but the drop-down list is the easy way."
    ]
   }
  ]
 },
 "ma2c-6.4": {
  "kalla": "c8f00e5f43",
  "data": [
   {
    "question": "What does a LARGE standard deviation mean?",
    "choices": [
     "Many values in the data",
     "That the data is normally distributed",
     "A large mean",
     "A large spread: the values deviate a lot from the mean on average"
    ],
    "correct": 3,
    "why": [
     "The number of values is given by n.",
     "Standard deviation can be calculated for any data, normally distributed or not.",
     "The size of the mean and the spread are independent: 2, 4, 12, 24, 43 and 16, 17, 17, 17, 18 have the same mean but completely different spreads.",
     "The standard deviation is a measure of spread: large deviations from the mean give a large standard deviation."
    ]
   },
   {
    "question": "When is the notation $s$ used for the standard deviation?",
    "choices": [
     "In a census of the whole population",
     "In a sample survey, when only part of the population has been studied",
     "When the standard deviation is small",
     "s and σ are used completely arbitrarily"
    ],
    "correct": 1,
    "why": [
     "The standard deviation of a census of the whole population is written σ.",
     "s belongs to samples and σ to a whole population. They are calculated with slightly different formulas (n − 1 and n respectively in the denominator).",
     "The notation is governed by the type of survey, not by the size of the value.",
     "The choice carries meaning: read off the right row in GeoGebra's table."
    ]
   },
   {
    "question": "The data sets 16, 17, 17, 17, 18 and 2, 4, 12, 24, 43 both have the mean 17. What distinguishes them?",
    "choices": [
     "Nothing: the same mean means the same properties",
     "The second has a larger median",
     "The first has a larger standard deviation",
     "The spread: the second has a much larger standard deviation"
    ],
    "correct": 3,
    "why": [
     "The mean says nothing about how spread out the values are.",
     "The medians are 17 and 12 respectively, but the big difference is the spread.",
     "The values in the first lie close to 17: minimal spread.",
     "The deviations from 17 are at most 1 in the first but up to 26 in the second. The measure of central tendency hides the spread, which is why measures of spread are needed."
    ]
   },
   {
    "question": "Where do you read off the standard deviation for a whole population in GeoGebra?",
    "choices": [
     "At Max in the statistics table",
     "At s in the statistics table",
     "At σ in the statistics table (One Variable Analysis, \"Show Statistics\")",
     "The standard deviation is not shown in GeoGebra"
    ],
    "correct": 2,
    "why": [
     "Max is the largest value.",
     "s applies to samples: the value is somewhat larger.",
     "σ (small sigma) is the standard deviation of a whole population; unless the task says otherwise, a whole population is assumed.",
     "Both versions are shown in the table."
    ]
   },
   {
    "question": "A data set has the standard deviation 0. What do you know about the values?",
    "choices": [
     "All the values are exactly equal",
     "The data contains only one value",
     "The data has no mean",
     "All the values are 0"
    ],
    "correct": 0,
    "why": [
     "No spread at all means that no value deviates from the mean: they are all identical.",
     "5, 5, 5, 5 (four values) also has the standard deviation 0.",
     "The mean exists: it is equal to the common value.",
     "The values can be any number, as long as they are equal (for example 7, 7, 7)."
    ]
   }
  ]
 },
 "ma2c-6.5": {
  "kalla": "1742cdc52f",
  "data": [
   {
    "question": "What characterises normally distributed data?",
    "choices": [
     "All values are equally common",
     "The values are distributed evenly (symmetrically) around the mean according to the normal distribution curve",
     "The values increase exponentially",
     "The data contains no negative numbers"
    ],
    "correct": 1,
    "why": [
     "Equally common values would be a uniform distribution. The normal distribution peaks at the mean.",
     "The normal distribution is the bell-shaped curve where fixed percentages (34.1/13.6/2.3 %) lie within given intervals of standard deviations.",
     "Exponential growth is something else. The normal distribution describes how values are SPREAD.",
     "Normally distributed values can be negative (for example temperatures)."
    ]
   },
   {
    "question": "What proportion lies between the mean and ONE standard deviation above it ($\\mu$ to $\\mu + \\sigma$)?",
    "choices": [
     "68.2 %",
     "34.1 %",
     "13.6 %",
     "50 %"
    ],
    "correct": 1,
    "why": [
     "68.2 % is BOTH sides together (±σ).",
     "Each side of the mean up to one standard deviation holds 34.1 %.",
     "13.6 % lies between one and two standard deviations.",
     "50 % is the whole half above the mean."
    ]
   },
   {
    "question": "What proportion lies MORE than two standard deviations ABOVE the mean?",
    "choices": [
     "4.6 %",
     "13.6 %",
     "2.3 %",
     "15.9 %"
    ],
    "correct": 2,
    "why": [
     "4.6 % is BOTH tails together.",
     "13.6 % lies between one and two standard deviations.",
     "The tail above μ + 2σ holds 2.3 % (check: 34.1 + 13.6 + 2.3 = 50 %).",
     "15.9 % is everything above μ + σ."
    ]
   },
   {
    "question": "Women's height: $\\mu = 165.5$ and $\\sigma = 6.15$. Which GeoGebra tool answers \"what proportion is between 160 and 170 cm\"?",
    "choices": [
     "The Probability Calculator with a closed interval 160 ≤ X ≤ 170",
     "The Roots tool",
     "One Variable Analysis with \"Show Statistics\"",
     "Percentile(l1, 50%)"
    ],
    "correct": 0,
    "why": [
     "The Probability Calculator takes μ and σ, and the interval button gives P(160 ≤ X ≤ 170) ≈ 0.58 = 58 %.",
     "Roots belongs to function graphs.",
     "One Variable Analysis works with entered values. Here there are only the parameters of the distribution.",
     "Percentiles require a list of values, and they answer a different question."
    ]
   },
   {
    "question": "How is the shape of the normal distribution curve affected by the spread?",
    "choices": [
     "The curve becomes asymmetric with a large spread",
     "A small spread gives a low and wide curve",
     "A small spread gives a tall and narrow curve; a large spread gives a low and wide one",
     "The spread does not affect the shape"
    ],
    "correct": 2,
    "why": [
     "The normal distribution curve is always symmetric about μ.",
     "The opposite.",
     "Values close together concentrate the curve around the mean (tall/narrow); spread-out values flatten it (low/wide). The area under the curve is always the same.",
     "σ controls exactly the width and height of the curve."
    ]
   }
  ]
 },
 "ma2c-6.6": {
  "kalla": "795fc8f1de",
  "data": [
   {
    "question": "What do you do when you carry out a **linear regression**?",
    "choices": [
     "Draw a box plot",
     "Find the equation of the straight line that best fits the points",
     "Calculate the mean of the *y*-values",
     "Sort the points in order of size"
    ],
    "correct": 1,
    "why": [
     "Box plots describe the spread of a single variable.",
     "The regression line is the line the points gather around. The regression gives its equation, for example y = 270x + 2 500.",
     "Regression is about the RELATIONSHIP between two variables.",
     "The order of the points does not matter."
    ]
   },
   {
    "question": "Between which values does the correlation coefficient $r$ lie?",
    "choices": [
     "Between −1 and 1",
     "Any values",
     "Between 0 and 1",
     "Between 0 and 100"
    ],
    "correct": 0,
    "why": [
     "r = 1 is perfect positive, r = −1 perfect negative and r = 0 no correlation.",
     "r is normalised to the interval [−1, 1].",
     "0 to 1 applies to $r^2$: $r$ itself can be negative.",
     "r is not a percentage."
    ]
   },
   {
    "question": "The points in a scatter plot are spread around a decreasing line. How is the correlation described?",
    "choices": [
     "Weak positive",
     "No correlation",
     "Strong negative",
     "Weak negative"
    ],
    "correct": 3,
    "why": [
     "Positive correlation requires an increasing slope.",
     "There is a trend (decreasing), so there is some correlation.",
     "Strong requires the points to lie clearly ON the line.",
     "Decreasing direction = negative; spread-out points = weak. A typical r-value might be ≈ −0.5."
    ]
   },
   {
    "question": "Where do you read off $r$ in GeoGebra after a two-variable regression analysis?",
    "choices": [
     "Click \"Show Statistics\" and read off the row r",
     "r is in the last row of the spreadsheet",
     "r is shown in the box with the regression equation",
     "r cannot be calculated in GeoGebra"
    ],
    "correct": 0,
    "why": [
     "The statistics button in the regression analysis lists, among other things, r (the correlation coefficient): for the ice cream example r ≈ 0.97.",
     "The spreadsheet contains raw data, not the results of the analysis.",
     "The equation is shown below the chart. r requires the statistics view.",
     "Oh yes it can, via \"Show Statistics\"."
    ]
   },
   {
    "question": "The model y = 270x + 2 500 describes ice cream sales (kr) as a function of temperature (°C). How are the sales at 30 °C estimated?",
    "choices": [
     "Substitute y = 30 and solve for x",
     "Multiply 30 by the r-value",
     "Substitute x = 30: y = 270 · 30 + 2 500 = 10 600 kr",
     "Read off the mean of the sales"
    ],
    "correct": 2,
    "why": [
     "y = 30 would mean 30 kr in sales. The question gives the temperature.",
     "r describes the strength of the correlation, not the relationship itself.",
     "The model is used like an ordinary function: temperature in, sales out.",
     "The point of the model is to predict NEW values, not to summarise old ones."
    ]
   }
  ]
 },
 "ma2c-6.7": {
  "kalla": "810bd052cd",
  "data": [
   {
    "question": "What form does an **exponential** regression model have?",
    "choices": [
     "$y = ax^2 + bx + c$",
     "$y = Ca^x$",
     "$y = kx + m$",
     "$y = Cx^a$"
    ],
    "correct": 1,
    "why": [
     "That is the polynomial model of degree 2.",
     "Exponential: the variable is in the exponent, y = C·aˣ.",
     "That is the linear model.",
     "That is the power model, with the variable in the base."
    ]
   },
   {
    "question": "What characterises a **linear** model in data?",
    "choices": [
     "The curve turns and passes through the origin",
     "The increase or decrease is the same everywhere",
     "The values double every period",
     "A small increase at the beginning and a large one at the end"
    ],
    "correct": 1,
    "why": [
     "Turning through the origin characterises the power function.",
     "A straight line has a constant slope: the same change per step throughout the data.",
     "Doubling per period is multiplicative: exponential.",
     "An accelerating increase is the hallmark of the exponential function."
    ]
   },
   {
    "question": "What is the $r^2$-value used for?",
    "choices": [
     "To count the number of points",
     "To calculate the mean of the residuals",
     "To decide whether the correlation is positive or negative",
     "To compare how well different regression models fit: the one closest to 1 wins"
    ],
    "correct": 3,
    "why": [
     "The number of points is n.",
     "$r^2$ is a summarising measure, not a mean of errors.",
     "Squaring removes the sign: the direction shows in $r$, not in $r^2$.",
     "$r^2$ lies between 0 and 1; the closer to 1, the better the curve fits, for example 0.9933 (exponential) against 0.954 (linear) for the world's population."
    ]
   },
   {
    "question": "Why is it difficult to tell power and polynomial models apart?",
    "choices": [
     "Their curves resemble each other and can sometimes coincide: $y = x^2$ is both",
     "Polynomial curves always pass through the origin",
     "GeoGebra cannot draw power curves",
     "Power functions have no $r^2$-value"
    ],
    "correct": 0,
    "why": [
     "$y = x^2$ is at the same time the power function $Cx^a$ ($C = 1$, $a = 2$) and the polynomial $ax^2 + bx + c$ ($b = c = 0$). Characteristics and $r^2$ have to help.",
     "The opposite: polynomials do NOT necessarily pass through the origin, but the power function does.",
     "GeoGebra has its own entry in the drop-down list for the power model.",
     "$r^2$ is calculated for all types of model."
    ]
   },
   {
    "question": "The world's population 1920–2020: a linear model gives $r^2 = 0.954$ and an exponential one gives $r^2 = 0.9933$. Which conclusion is correct?",
    "choices": [
     "The models are equivalent",
     "The linear one is best since it is the simplest",
     "The exponential model describes the relationship best: its $r^2$ is closest to 1",
     "Neither of the models can be used"
    ],
    "correct": 2,
    "why": [
     "The difference 0.9933 against 0.954 is clear in this context.",
     "Simplicity is nice, but $r^2$ shows that the linear one misses the curvature in the data.",
     "Both how well the curve fits and the comparison of $r^2$ point to the exponential model: the population has grown by a percentage rather than by a fixed number per year.",
     "Both work reasonably well, the exponential one best."
    ]
   }
  ]
 }
});
