/* Engelsk översättning av exittickets (ma4). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "ma4-1.1": {
  "kalla": "ad9c6cc79e",
  "data": [
   {
    "question": "In a right-angled triangle, which side is called the hypotenuse?",
    "choices": [
     "Any of the three sides, depending on how you measure",
     "The side opposite the angle $v$",
     "The side that together with the hypotenuse forms the angle $v$",
     "The side opposite the right angle (the longest side)"
    ],
    "correct": 3,
    "why": [
     "The hypotenuse is a definite side: always the one opposite the right angle, however the triangle is turned.",
     "That describes the opposite side, not the hypotenuse.",
     "That describes the adjacent side, not the hypotenuse.",
     "Exactly: the hypotenuse always lies opposite the right angle and is the longest side of the triangle."
    ]
   },
   {
    "question": "Which relation defines $\\sin v$ in a right-angled triangle?",
    "choices": [
     "$\\sin v = \\dfrac{\\text{adjacent side}}{\\text{hypotenuse}}$",
     "$\\sin v = \\dfrac{\\text{opposite side}}{\\text{hypotenuse}}$",
     "$\\sin v = \\dfrac{\\text{hypotenuse}}{\\text{opposite side}}$",
     "$\\sin v = \\dfrac{\\text{opposite side}}{\\text{adjacent side}}$"
    ],
    "correct": 1,
    "why": [
     "That ratio defines $\\cos v$, not $\\sin v$.",
     "That is right: sine is the ratio of the opposite side to the hypotenuse.",
     "The fraction is upside down: the hypotenuse is always in the denominator for both sine and cosine.",
     "That ratio defines $\\tan v$, not $\\sin v$."
    ]
   },
   {
    "question": "You know the hypotenuse and the angle $v$ and want to find the opposite side. Which function do you use?",
    "choices": [
     "Sine: the opposite side = the hypotenuse $\\cdot \\sin v$",
     "None of them works without knowing another side",
     "Cosine: the opposite side = the hypotenuse $\\cdot \\cos v$",
     "Tangent: the opposite side = the hypotenuse $\\cdot \\tan v$"
    ],
    "correct": 0,
    "why": [
     "Since $\\sin v = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$, multiplying by the hypotenuse gives exactly the opposite side.",
     "Sine links precisely the opposite side and the hypotenuse, so neither of the other sides is needed.",
     "Cosine gives the adjacent side, not the opposite one.",
     "Tangent links the two shorter sides to each other: it requires one of them, not the hypotenuse."
    ]
   },
   {
    "question": "What does the inverse function $\\sin^{-1}$ (arcsin) do?",
    "choices": [
     "It gives the angle $v$ when the ratio of the opposite side to the hypotenuse is known",
     "It only works for obtuse angles",
     "It is the same thing as $\\dfrac{1}{\\sin v}$",
     "It gives the ratio between the sides when the angle $v$ is known"
    ],
    "correct": 0,
    "why": [
     "That is right: $\\sin^{-1}$ \"reverses\" sine. It takes a ratio of sides as input and gives an angle as the result.",
     "In a right-angled triangle the acute angles are always less than 90°, and it is precisely for such angles that $\\sin^{-1}$ is used here.",
     "A common confusion: despite the notation, $\\sin^{-1}$ does NOT mean $1/\\sin v$, but the inverse function of sine.",
     "That is exactly what $\\sin v$ itself does (without the inverse). The inverse goes the other way."
    ]
   },
   {
    "question": "A right-angled triangle has the opposite side 3.0 cm and the adjacent side 4.0 cm relative to the angle $v$. Which expression gives the angle $v$?",
    "choices": [
     "$v = \\cos^{-1}\\!\\left(\\dfrac{3.0}{4.0}\\right)$",
     "$v = \\tan^{-1}\\!\\left(\\dfrac{4.0}{3.0}\\right)$",
     "$v = \\tan^{-1}\\!\\left(\\dfrac{3.0}{4.0}\\right)$",
     "$v = \\sin^{-1}\\!\\left(\\dfrac{3.0}{4.0}\\right)$"
    ],
    "correct": 2,
    "why": [
     "Cosine requires the hypotenuse, not the opposite side in the numerator.",
     "The ratio is upside down: the opposite side (3.0) should be in the numerator and the adjacent side (4.0) in the denominator for tangent.",
     "Two sides next to the right angle are known, and tangent is exactly the ratio opposite over adjacent, so $\\tan^{-1}$ of $3.0/4.0$ gives $v$.",
     "Sine requires the hypotenuse in the denominator, not the adjacent side."
    ]
   }
  ]
 },
 "ma4-1.2": {
  "kalla": "7a61180b80",
  "data": [
   {
    "question": "On the unit circle the angle $v$ corresponds to a point $(x, y)$ on the circumference. What does $\\cos v$ correspond to?",
    "choices": [
     "The point's $x$-coordinate",
     "The circumference of the circle",
     "The ratio of $y$ to $x$",
     "The point's $y$-coordinate"
    ],
    "correct": 0,
    "why": [
     "Since the radius is 1, $\\cos v = \\dfrac{x}{1} = x$, so cosine is the point's $x$-coordinate.",
     "Cosine is a coordinate of a point on the circle, not a measure of the whole circle.",
     "The ratio $\\dfrac{y}{x}$ is $\\tan v$, not $\\cos v$.",
     "It is $\\sin v$ that is the point's $y$-coordinate, not $\\cos v$."
    ]
   },
   {
    "question": "The point on the unit circle that corresponds to the angle $v$ can always be written with the coordinates:",
    "choices": [
     "$(\\cos v,\\ \\sin v)$",
     "$(\\sin v,\\ \\cos v)$",
     "$(v,\\ v)$",
     "$(\\tan v,\\ \\sin v)$"
    ],
    "correct": 0,
    "why": [
     "The $x$-coordinate is $\\cos v$ and the $y$-coordinate is $\\sin v$, so the point is $(\\cos v,\\ \\sin v)$.",
     "The coordinates are swapped: cosine belongs to the $x$-axis and sine to the $y$-axis, not the other way round.",
     "The angle $v$ itself is not a coordinate: it decides where on the circle the point lies.",
     "Tangent is not a coordinate on the unit circle; it is the ratio $\\dfrac{\\sin v}{\\cos v}$."
    ]
   },
   {
    "question": "What is the exact value of $\\sin 60^\\circ$?",
    "choices": [
     "$\\dfrac{1}{2}$",
     "$\\dfrac{\\sqrt{2}}{2}$",
     "$\\sqrt{3}$",
     "$\\dfrac{\\sqrt{3}}{2}$"
    ],
    "correct": 3,
    "why": [
     "$\\dfrac{1}{2}$ is $\\sin 30^\\circ$, not $\\sin 60^\\circ$.",
     "$\\dfrac{\\sqrt{2}}{2}$ is $\\sin 45^\\circ$, not $\\sin 60^\\circ$.",
     "$\\sqrt{3}$ is $\\tan 60^\\circ$; the sine value can never be greater than 1.",
     "For the standard angle $60^\\circ$, $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2} \\approx 0.87$."
    ]
   },
   {
    "question": "Why do the angles $v$ and $v + 360^\\circ$ give the same sine and cosine values?",
    "choices": [
     "Sine and cosine grow by $360$ for each turn",
     "It only applies to $\\sin$, not to $\\cos$",
     "All angles over $360^\\circ$ are undefined",
     "Adding $360^\\circ$ is a full turn around the circle, so you land on exactly the same point"
    ],
    "correct": 3,
    "why": [
     "The values do not grow; they repeat periodically because you come back to the same point.",
     "The same point gives the same $x$- and $y$-coordinate, so it applies just as much to $\\cos$ as to $\\sin$.",
     "Angles over $360^\\circ$ are perfectly well defined: you just continue one more turn round the circle.",
     "A full turn ($360^\\circ$) brings you back to the same point $(\\cos v,\\ \\sin v)$, so the coordinates, and therefore the values, are unchanged."
    ]
   },
   {
    "question": "An angle $v$ gives the point with the $y$-coordinate $0.86$. What is $\\sin(-v)$?",
    "choices": [
     "$0.86$",
     "$-0.86$",
     "$-0.51$",
     "$0.51$"
    ],
    "correct": 1,
    "why": [
     "Changing to $-v$ turns the other way, so the $y$-coordinate cannot stay unchanged.",
     "A negative angle is turned clockwise, so the point is reflected in the $x$-axis and the $y$-coordinate changes sign: $\\sin(-v) = -0.86$.",
     "The reflection in the $x$-axis only affects the sign of the $y$-coordinate; the size $0.86$ is kept, not $0.51$.",
     "$0.51$ is the $x$-coordinate (cosine) of the original point, not the sine of $-v$."
    ]
   }
  ]
 },
 "ma4-1.3": {
  "kalla": "5fa63a4963",
  "data": [
   {
    "question": "How many solutions does a trigonometric equation such as $\\sin x = a$ (with $-1 < a < 1$) have?",
    "choices": [
     "At most four",
     "Exactly one",
     "Infinitely many",
     "Exactly two"
    ],
    "correct": 2,
    "why": [
     "There is no upper limit: the number of solutions is unlimited because you can add any number of turns.",
     "An inverse on the calculator gives one solution, but the equation has more, both within and outside one turn.",
     "The unit circle repeats itself every turn, so to every solution you can add a whole number of turns ($n \\cdot 360^\\circ$), which gives infinitely many solutions.",
     "That is only true within a single turn ($0^\\circ$–$360^\\circ$); outside it there are infinitely many more."
    ]
   },
   {
    "question": "If $v$ is a solution to $\\cos x = a$, how are all the solutions written?",
    "choices": [
     "$x = v + n \\cdot 180^\\circ$",
     "$x = v + n \\cdot 360^\\circ$ and $x = 180^\\circ - v + n \\cdot 360^\\circ$",
     "$x = \\pm v + n \\cdot 180^\\circ$",
     "$x = \\pm v + n \\cdot 360^\\circ$"
    ],
    "correct": 3,
    "why": [
     "That is the formula for tangent, whose period is $180^\\circ$.",
     "That is the formula for sine ($180^\\circ - v$), not for cosine.",
     "The right basic solutions ($\\pm v$) but the wrong period: cosine repeats every $360^\\circ$, not every $180^\\circ$.",
     "Cosine has the same value for $v$ and $-v$, so both basic solutions are captured by $\\pm v$, and the periodicity gives the term $n \\cdot 360^\\circ$."
    ]
   },
   {
    "question": "For an equation with sine: if $v_1$ is one solution in the interval $0^\\circ \\leq x \\leq 360^\\circ$, what is the other?",
    "choices": [
     "$v_2 = -v_1$",
     "$v_2 = 360^\\circ - v_1$",
     "$v_2 = v_1 + 180^\\circ$",
     "$v_2 = 180^\\circ - v_1$"
    ],
    "correct": 3,
    "why": [
     "That gives the same cosine value (cosine is even), not the same sine value.",
     "That is the rule for cosine ($360^\\circ - v_1 = -v_1$), not for sine.",
     "Adding $180^\\circ$ is the period of tangent. It does not give the same sine value.",
     "On the unit circle $v_1$ and $180^\\circ - v_1$ have the same $y$-coordinate, so the same sine value."
    ]
   },
   {
    "question": "Why does a trigonometric equation have infinitely many solutions?",
    "choices": [
     "The trigonometric functions are periodic: the unit circle repeats itself every turn, so the same value comes back every $360^\\circ$ (for tangent every $180^\\circ$)",
     "Because sine and cosine can be both positive and negative",
     "Because the calculator gives different answers each time you press",
     "Because you can always round in infinitely many ways"
    ],
    "correct": 0,
    "why": [
     "The periodicity is the actual reason: if you add a whole number of turns ($n \\cdot 360^\\circ$, for tangent $n \\cdot 180^\\circ$) you get a new angle with the same function value.",
     "That the function values can have both signs does not explain why the solutions keep recurring for ever. The periodicity does.",
     "The calculator gives a definite value (the basic solution); the infinitely many solutions come from the periodicity, not from chance.",
     "Rounding only changes how exactly the answer is written, not the number of actual solutions."
    ]
   },
   {
    "question": "In the solution to $\\tan x = a$ the term $n \\cdot 180^\\circ$ is added. What is $180^\\circ$ here?",
    "choices": [
     "The period of the tangent function",
     "The angle where tangent is zero",
     "The largest value of the tangent function",
     "Half a turn that must always be subtracted"
    ],
    "correct": 0,
    "why": [
     "Tangent repeats every $180^\\circ$ (half a turn), so to a solution you can add or subtract a whole number of $180^\\circ$.",
     "Tangent is zero at $0^\\circ$ and $180^\\circ$, but $180^\\circ$ in the formula stands for the period, not for a zero.",
     "Tangent has no largest value (it grows without limit); $180^\\circ$ is its period.",
     "The term is added or subtracted for any integer $n$. It is not a fixed correction you must always make."
    ]
   }
  ]
 },
 "ma4-1.4": {
  "kalla": "4a68f26577",
  "data": [
   {
    "question": "A trigonometric equation with sine has the solutions $x = 40^\\circ$ and $x = 140^\\circ$ in one turn. How do you state *all* the solutions?",
    "choices": [
     "$x = 40^\\circ$ and $x = 140^\\circ$ (there are no more)",
     "$x = 40^\\circ + n \\cdot 360^\\circ$ and $x = 140^\\circ + n \\cdot 360^\\circ$",
     "$x = 40^\\circ + n \\cdot 180^\\circ$ and $x = 140^\\circ + n \\cdot 180^\\circ$",
     "$x = 40^\\circ + n \\cdot 360^\\circ$ (only one is needed)"
    ],
    "correct": 1,
    "why": [
     "The equation has infinitely many solutions: every turn gives two more, which is why the period term is needed.",
     "Sine has the period $360^\\circ$, so we add a period term $n \\cdot 360^\\circ$ to each of the two solutions in the turn.",
     "The period term $n \\cdot 180^\\circ$ belongs to tangent, not to sine. Sine repeats after a full turn, $360^\\circ$.",
     "The sine equation has two solutions per turn; if you leave one out, you lose half of all the solutions."
    ]
   },
   {
    "question": "The equation $\\sin x \\cdot \\cos x = 0$ is to be solved. What does the zero product method give?",
    "choices": [
     "You require $\\sin x = 0$ and $\\cos x = 0$ to be satisfied at the same time",
     "You divide both sides by $\\cos x$ and solve $\\sin x = 0$",
     "You only solve $\\sin x = 0$, since one factor is enough",
     "You solve $\\sin x = 0$ and $\\cos x = 0$ separately and include all the solutions"
    ],
    "correct": 3,
    "why": [
     "It is enough for one factor to be zero; requiring both at the same time gives fewer (or no) solutions.",
     "If you divide away $\\cos x$, you lose exactly the solutions where $\\cos x = 0$. Never divide by zero.",
     "$\\cos x = 0$ also gives solutions to the product. If you leave out that factor, you lose solutions.",
     "A product is zero exactly when at least one factor is zero, so both factors are examined separately."
    ]
   },
   {
    "question": "Why can $2\\sin x - \\cos x = 0$ be rewritten as an equation in $\\tan x$?",
    "choices": [
     "Since $\\sin x$ and $\\cos x$ are always equal, they can be replaced with $\\tan x$",
     "It cannot: the equation must be solved graphically",
     "After dividing by $\\cos x$, $\\dfrac{\\sin x}{\\cos x} = \\tan x$, so the term with cosine disappears",
     "Since $\\tan x = \\sin x - \\cos x$ by definition"
    ],
    "correct": 2,
    "why": [
     "$\\sin x$ and $\\cos x$ are not equal in general. The trick is based on the ratio between them, not on them being equal.",
     "The equation can perfectly well be solved algebraically, precisely with the tangent trick: no graph is needed.",
     "If you divide both sides by $\\cos x$, the quotient becomes $\\dfrac{\\sin x}{\\cos x} = \\tan x$, and the equation contains only one trigonometric function.",
     "$\\tan x$ is the quotient $\\dfrac{\\sin x}{\\cos x}$, not the difference $\\sin x - \\cos x$."
    ]
   },
   {
    "question": "All the solutions to an equation are $x = 20^\\circ + n \\cdot 120^\\circ$. Which value of $n$ gives a solution in the interval $180^\\circ \\le x < 360^\\circ$?",
    "choices": [
     "$n = 3$, which gives $x = 380^\\circ$",
     "No integer $n$ gives a solution in that interval",
     "$n = 1$, which gives $x = 140^\\circ$",
     "$n = 2$, which gives $x = 260^\\circ$"
    ],
    "correct": 3,
    "why": [
     "With $n = 3$, $x = 380^\\circ$, which is at least $360^\\circ$ and therefore outside the interval.",
     "$n = 2$ gives $x = 260^\\circ$, which certainly lies in the interval. Try the different integers.",
     "With $n = 1$, $x = 140^\\circ$, which is less than $180^\\circ$ and therefore outside the interval.",
     "With $n = 2$, $x = 20^\\circ + 2 \\cdot 120^\\circ = 260^\\circ$, which lies in $180^\\circ \\le x < 360^\\circ$."
    ]
   },
   {
    "question": "The equation $\\cos(2x) = 0$ is solved. What period term does the solution for $x$ have?",
    "choices": [
     "$n \\cdot 180^\\circ$: the cosine period $360^\\circ$ is divided by 2 since the argument is $2x$",
     "$n \\cdot 720^\\circ$: the period doubles when the argument is $2x$",
     "$n \\cdot 90^\\circ$",
     "$n \\cdot 360^\\circ$: cosine always has the period $360^\\circ$"
    ],
    "correct": 0,
    "why": [
     "From $2x = \\pm 90^\\circ + n \\cdot 360^\\circ$ the whole side is divided by 2, so the period term becomes $\\dfrac{360^\\circ}{2} = 180^\\circ$.",
     "The argument $2x$ makes the graph oscillate twice as fast, so the period in $x$ becomes shorter, not longer.",
     "Dividing $360^\\circ$ by 2 gives $180^\\circ$, not $90^\\circ$. Check the division.",
     "The period $360^\\circ$ applies to the argument $2x$, not to $x$. When you divide by 2 it is halved to $180^\\circ$."
    ]
   }
  ]
 },
 "ma4-1.5": {
  "kalla": "607dff1aea",
  "data": [
   {
    "question": "What is meant by an angle being 1 radian?",
    "choices": [
     "The angle is one hundredth of a turn",
     "The angle subtends an arc whose length is equal to the radius",
     "The angle subtends an arc as long as the whole circumference",
     "The angle subtends an arc whose length is equal to the diameter"
    ],
    "correct": 1,
    "why": [
     "Radians are defined through the ratio of arc length to radius, not as a fraction of a turn.",
     "Exactly: 1 radian is the angle whose arc length is exactly as large as the radius of the circle.",
     "An arc as long as the whole circumference ($2\\pi$ radii) corresponds to a full turn, that is $2\\pi$ rad.",
     "The diameter is twice as long as the radius, so such an arc corresponds to 2 radians, not 1."
    ]
   },
   {
    "question": "How many radians is a full turn?",
    "choices": [
     "$\\pi$ rad",
     "$2\\pi$ rad",
     "$180$ rad",
     "$4\\pi$ rad"
    ],
    "correct": 1,
    "why": [
     "$\\pi$ rad is only half a turn, that is $180^\\circ$.",
     "That is right: the circumference of the circle is $2\\pi$ radii, so a full turn ($360^\\circ$) is $2\\pi$ rad.",
     "The number $180$ belongs with degrees ($180^\\circ = \\pi$ rad), not with the radian measure of a full turn.",
     "$4\\pi$ rad would be two full turns."
    ]
   },
   {
    "question": "Which relation holds between degrees and radians?",
    "choices": [
     "$1$ rad $= 180^\\circ$",
     "$\\pi$ rad $= 90^\\circ$",
     "$\\pi$ rad $= 180^\\circ$",
     "$\\pi$ rad $= 360^\\circ$"
    ],
    "correct": 2,
    "why": [
     "$1$ rad is about $57.3^\\circ$; it is $\\pi$ rad (not $1$ rad) that is $180^\\circ$.",
     "$90^\\circ$ is a quarter of a turn and corresponds to $\\dfrac{\\pi}{2}$ rad.",
     "That is right: half a turn is $\\pi$ rad, and that corresponds to $180^\\circ$.",
     "$360^\\circ$ is a full turn and corresponds to $2\\pi$ rad, not $\\pi$ rad."
    ]
   },
   {
    "question": "Convert $90^\\circ$ to radians.",
    "choices": [
     "$90\\pi$ rad",
     "$\\dfrac{\\pi}{4}$ rad",
     "$\\dfrac{\\pi}{2}$ rad",
     "$\\dfrac{\\pi}{6}$ rad"
    ],
    "correct": 2,
    "why": [
     "You should multiply by $\\dfrac{\\pi}{180}$, not by $\\pi$; otherwise the answer is unreasonably large.",
     "$\\dfrac{\\pi}{4}$ rad corresponds to $45^\\circ$, not $90^\\circ$.",
     "Right: $90^\\circ = 90 \\cdot \\dfrac{\\pi}{180}\\ \\text{rad} = \\dfrac{\\pi}{2}$ rad, half of $\\pi$ rad.",
     "$\\dfrac{\\pi}{6}$ rad corresponds to $30^\\circ$."
    ]
   },
   {
    "question": "When you solve $\\sin x = 0.7$ the answer is $x \\approx 0.78 + n \\cdot 2\\pi$ and $x \\approx 2.37 + n \\cdot 2\\pi$. Why is the term $n \\cdot 2\\pi$ included?",
    "choices": [
     "Sine is periodic with the period $\\pi$, so the term should really be $n \\cdot \\pi$",
     "It is only needed when the answer is given in degrees",
     "Sine is periodic with the period $2\\pi$, so the same value comes back every full turn",
     "It is the rounding error from the calculator"
    ],
    "correct": 2,
    "why": [
     "Sine (and cosine) have the period $2\\pi$; it is tangent that has the period $\\pi$.",
     "The period is there whatever the unit: in degrees the same thing is written $x + n \\cdot 360^\\circ$.",
     "That is right: sine repeats itself every turn, so for every integer $n$, $x + n \\cdot 2\\pi$ gives the same sine value.",
     "The term is exact, not an error: it captures all the solutions, one for every turn around the circle."
    ]
   }
  ]
 },
 "ma4-1.6": {
  "kalla": "98bb856200",
  "data": [
   {
    "question": "Two angles that together make $90^\\circ$ are called?",
    "choices": [
     "Angles on a straight line",
     "Corresponding angles",
     "Complementary angles",
     "Supplementary angles"
    ],
    "correct": 2,
    "why": [
     "Angles on a straight line belong with lines that cross each other, not with the sum being $90^\\circ$.",
     "Corresponding angles arise at parallel lines and a transversal. They are not about the sum $90^\\circ$.",
     "That is right: two angles that add up to $90^\\circ$ are complementary angles, and then $\\sin v = \\cos(90^\\circ - v)$.",
     "Supplementary angles together make $180^\\circ$, not $90^\\circ$."
    ]
   },
   {
    "question": "What is $\\sin(90^\\circ - v)$ equal to?",
    "choices": [
     "$-\\sin v$",
     "$-\\cos v$",
     "$\\cos v$",
     "$\\sin v$"
    ],
    "correct": 2,
    "why": [
     "The relation gives $\\cos v$, not $-\\sin v$: there is no change of sign.",
     "There is no change of sign in the complementary angle relation; $\\sin(90^\\circ - v)$ is positive $\\cos v$.",
     "Exactly: the sine of an angle is equal to the cosine of its complementary angle, $\\sin(90^\\circ - v) = \\cos v$.",
     "Sine does not stay unchanged here: the complementary angle swaps sine for cosine."
    ]
   },
   {
    "question": "What is $\\cos(-v)$ equal to?",
    "choices": [
     "$-\\cos v$",
     "$-\\sin v$",
     "$\\cos v$",
     "$\\sin v$"
    ],
    "correct": 2,
    "why": [
     "Cosine does not change sign for a negative angle, but sine does.",
     "The change of sign for a negative angle applies to sine ($\\sin(-v) = -\\sin v$), not cosine.",
     "That is right: a negative angle reflects the point in the $x$-axis, and the $x$-coordinate (cosine) is not affected, so $\\cos(-v) = \\cos v$.",
     "It is sine that is linked to the $y$-coordinate; cosine gives $\\cos v$, not $\\sin v$."
    ]
   },
   {
    "question": "What is $\\sin(v + 180^\\circ)$ equal to?",
    "choices": [
     "$\\cos v$",
     "$-\\sin v$",
     "$\\sin v$",
     "$-\\cos v$"
    ],
    "correct": 1,
    "why": [
     "Adding $180^\\circ$ does not give cosine; the $90^\\circ$ rotation does that. Here it becomes $-\\sin v$.",
     "Exactly: half a turn ($180^\\circ$) puts the point opposite, so both coordinates change sign and $\\sin(v + 180^\\circ) = -\\sin v$.",
     "Sine does not stay unchanged with half a turn: the point ends up in the opposite quadrant and the sign changes.",
     "Half a turn changes the sign but does not mix up sine and cosine: the answer is $-\\sin v$, not $-\\cos v$."
    ]
   },
   {
    "question": "A point on the unit circle at the angle $v$ has the coordinates $(\\cos v,\\ \\sin v)$. What coordinates does the point at the angle $v + 90^\\circ$ have?",
    "choices": [
     "$(-\\cos v,\\ -\\sin v)$",
     "$(\\sin v,\\ -\\cos v)$",
     "$(-\\sin v,\\ \\cos v)$",
     "$(\\cos v,\\ -\\sin v)$"
    ],
    "correct": 2,
    "why": [
     "Both coordinates changing sign corresponds to half a turn ($v + 180^\\circ$), not a quarter of a turn.",
     "The coordinates do swap places, but it is the $x$-coordinate (not $y$) that gets a minus sign with an anticlockwise rotation.",
     "That is right: a quarter of a turn anticlockwise swaps the coordinates and gives the $x$-coordinate a minus sign, which directly shows $\\cos(v + 90^\\circ) = -\\sin v$ and $\\sin(v + 90^\\circ) = \\cos v$.",
     "Here the coordinates have not swapped places: that corresponds to a reflection in the $x$-axis ($-v$), not a $90^\\circ$ rotation."
    ]
   }
  ]
 },
 "ma4-1.7": {
  "kalla": "2a0787cd2e",
  "data": [
   {
    "question": "What does the Pythagorean identity say?",
    "choices": [
     "$\\sin v + \\cos v = 1$",
     "$\\sin^2 v + \\cos^2 v = 1$",
     "$\\sin^2 v + \\cos^2 v = v$",
     "$\\cos^2 v - \\sin^2 v = 1$"
    ],
    "correct": 1,
    "why": [
     "It is the squares $\\sin^2 v$ and $\\cos^2 v$ that add up to 1, not the functions themselves.",
     "Exactly: the sum of sine squared and cosine squared for one and the same angle is always 1.",
     "The right-hand side is always the number 1, whatever the angle $v$.",
     "The relation is a sum of the squares, not a difference, and it equals 1, not anything else."
    ]
   },
   {
    "question": "What does the notation $\\sin^2 v$ mean?",
    "choices": [
     "$\\sin(v^2)$, that is the sine of the angle squared",
     "$(\\sin v)^2$, that is the sine of the angle raised to the power 2",
     "$\\sin(2v)$, that is the sine of twice the angle",
     "$\\dfrac{1}{\\sin v}$, that is the inverse of sine"
    ],
    "correct": 1,
    "why": [
     "Here the angle is squared before the sine is taken, which is something completely different from $(\\sin v)^2$.",
     "That is right: the 2 belongs to the function value, so $\\sin^2 v$ is a shorter way of writing $(\\sin v)^2$.",
     "That would be $\\sin(2v)$; the exponent 2 means squared, not twice the angle.",
     "Despite the notation, $\\sin^2 v$ does not mean $1/\\sin v$ but the sine value raised to the power 2."
    ]
   },
   {
    "question": "Which is a correct rewriting of the Pythagorean identity?",
    "choices": [
     "$\\cos^2 v = \\sin^2 v - 1$",
     "$\\cos^2 v = 1 + \\sin^2 v$",
     "$\\cos v = 1 - \\sin v$",
     "$\\cos^2 v = 1 - \\sin^2 v$"
    ],
    "correct": 3,
    "why": [
     "The terms are the wrong way round: it should be $1 - \\sin^2 v$, not $\\sin^2 v - 1$.",
     "The sign is wrong: $\\sin^2 v$ should be subtracted from 1, not added.",
     "The rewriting applies to the squares; you cannot just remove the exponents like that.",
     "Exactly: if you move $\\sin^2 v$ to the other side in $\\sin^2 v + \\cos^2 v = 1$ you get precisely $\\cos^2 v = 1 - \\sin^2 v$."
    ]
   },
   {
    "question": "You have calculated that $\\cos^2 v = 0.64$ for an angle $v$ in the second quadrant. Which value should you choose for $\\cos v$?",
    "choices": [
     "Both $+0.8$ and $-0.8$ apply at the same time",
     "$-0.8$, since the $x$-coordinate is negative in the second quadrant",
     "$0.8$, since the square root always gives a positive value",
     "$0.64$, the value is already $\\cos v$"
    ],
    "correct": 1,
    "why": [
     "The angle lies in a definite quadrant, so only one of the signs can apply: here the negative one.",
     "That is right: the root gives $\\pm 0.8$, and in the second quadrant $\\cos v$ (the $x$-coordinate) is negative, so $-0.8$ is right.",
     "Taking the square root gives two possible values; the quadrant decides the sign, and here it should be negative.",
     "$0.64$ is $\\cos^2 v$; to get $\\cos v$ you must take the square root and then choose the sign."
    ]
   },
   {
    "question": "Why does the Pythagorean identity also hold for angles larger than 90°?",
    "choices": [
     "When the coordinates are squared in Pythagoras' theorem the terms become positive, so the relation still holds",
     "It does not: the Pythagorean identity only works between 0° and 90°",
     "Because the hypotenuse (the radius) becomes negative and compensates",
     "Because $\\sin v$ and $\\cos v$ are always positive"
    ],
    "correct": 0,
    "why": [
     "Exactly: even if the $x$- or $y$-coordinate is negative, $\\sin^2 v$ and $\\cos^2 v$ become positive when squared, so $\\sin^2 v + \\cos^2 v = 1$ holds.",
     "The relation holds for all angles, not just in the interval 0°–90°.",
     "The radius of the unit circle is always 1 (positive): it never changes sign.",
     "Outside the first quadrant $\\sin v$ and $\\cos v$ can be negative; that is exactly why the squaring is needed."
    ]
   }
  ]
 },
 "ma4-1.8": {
  "kalla": "96d6e4af6e",
  "data": [
   {
    "question": "Which expression is equal to $\\cos(u + v)$?",
    "choices": [
     "$\\cos u\\cos v - \\sin u\\sin v$",
     "$\\cos u\\cos v + \\sin u\\sin v$",
     "$\\sin u\\cos v + \\cos u\\sin v$",
     "$\\cos u + \\cos v$"
    ],
    "correct": 0,
    "why": [
     "That is right: the cosine formula changes sign. Plus on the left-hand side gives minus between the products.",
     "That is $\\cos(u - v)$; the subtraction formula for cosine has a plus sign between the products.",
     "That is $\\sin(u + v)$, the addition formula for sine, not for cosine.",
     "The cosine of a sum is not the sum of the cosines: the formula mixes products of sine and cosine."
    ]
   },
   {
    "question": "Does the equality $\\sin(u + v) = \\sin u + \\sin v$ hold?",
    "choices": [
     "Yes, but only if $u = v$",
     "Yes, but only if the angles are right angles",
     "No: $\\sin(u + v) = \\sin u\\cos v + \\cos u\\sin v$",
     "Yes, always"
    ],
    "correct": 2,
    "why": [
     "With $u = v$ the left-hand side becomes $\\sin 2v = 2\\sin v\\cos v$, not $2\\sin v$, so it does not hold then either.",
     "A right angle does not change the fact that sine is not additive; the addition formula is needed whatever the angles.",
     "Exactly: sine is not additive; you have to use the addition formula.",
     "Test $u = v = 30^\\circ$: $\\sin 60^\\circ \\approx 0.87$ but $\\sin 30^\\circ + \\sin 30^\\circ = 1$. The equality does not hold."
    ]
   },
   {
    "question": "Which expression is equal to $\\sin 2v$?",
    "choices": [
     "$2\\sin v$",
     "$1 - 2\\sin^2 v$",
     "$2\\sin v\\cos v$",
     "$\\sin^2 v - \\cos^2 v$"
    ],
    "correct": 2,
    "why": [
     "Doubling the angle is not doubling the sine value; the factor $\\cos v$ is needed.",
     "That is one of the formulas for $\\cos 2v$, not for $\\sin 2v$.",
     "That is right: it follows from $\\sin(v + v) = \\sin v\\cos v + \\cos v\\sin v$.",
     "That resembles a form of $\\cos 2v$ (but with the opposite sign), not $\\sin 2v$."
    ]
   },
   {
    "question": "You want to find the exact value of $\\cos 15^\\circ$. Which split is suitable?",
    "choices": [
     "$\\cos(10^\\circ + 5^\\circ)$",
     "$\\cos 45^\\circ - \\cos 30^\\circ$",
     "Only the product $\\cos 45^\\circ \\cdot \\cos 30^\\circ$",
     "$\\cos(45^\\circ - 30^\\circ)$"
    ],
    "correct": 3,
    "why": [
     "$10^\\circ$ and $5^\\circ$ have no known exact table values, so the split does not help.",
     "Cosine is not additive; $\\cos 45^\\circ - \\cos 30^\\circ$ is not $\\cos 15^\\circ$.",
     "The subtraction formula has both a product of cosines and a product of sines: a single product is not enough.",
     "That is right: $45^\\circ$ and $30^\\circ$ have known exact values and their difference is $15^\\circ$, so the subtraction formula gives an exact answer."
    ]
   },
   {
    "question": "Which of the following is NOT a valid form of $\\cos 2v$?",
    "choices": [
     "$2\\cos^2 v - 1$",
     "$2\\sin v\\cos v$",
     "$\\cos^2 v - \\sin^2 v$",
     "$1 - 2\\sin^2 v$"
    ],
    "correct": 1,
    "why": [
     "This is a valid form of $\\cos 2v$ (obtained by replacing $\\sin^2 v$ with $1 - \\cos^2 v$).",
     "Correct: $2\\sin v\\cos v$ is $\\sin 2v$, not $\\cos 2v$, so it is the form that does not belong here.",
     "This is the basic form of $\\cos 2v$ and is therefore valid.",
     "This is a valid form of $\\cos 2v$ (obtained by replacing $\\cos^2 v$ with $1 - \\sin^2 v$)."
    ]
   }
  ]
 },
 "ma4-1.9": {
  "kalla": "9650b30335",
  "data": [
   {
    "question": "The other terms in an equation contain $\\cos x$. Which form of the double angle is then most suitable for rewriting $\\cos 2x$?",
    "choices": [
     "$\\cos 2x = 2\\cos^2 x - 1$",
     "$\\cos 2x = 2\\sin x\\cos x$",
     "$\\cos 2x = \\cos^2 x + \\sin^2 x$",
     "$\\cos 2x = 1 - 2\\sin^2 x$"
    ],
    "correct": 0,
    "why": [
     "That form expresses $\\cos 2x$ only in terms of $\\cos x$, so the whole equation can be written in $\\cos x$ and solved as a quadratic equation.",
     "That is the formula for $\\sin 2x$, not $\\cos 2x$.",
     "$\\cos^2 x + \\sin^2 x = 1$ (the Pythagorean identity), not $\\cos 2x$.",
     "The form is correct but expresses $\\cos 2x$ in terms of $\\sin x$: unsuitable when the other terms have $\\cos x$."
    ]
   },
   {
    "question": "How do you rewrite the left-hand side of $\\sin x\\cos x = \\dfrac{\\sqrt3}{4}$ to be able to use the double angle?",
    "choices": [
     "Multiply both sides by $\\dfrac{1}{2}$, so the left-hand side becomes $\\sin 2x$",
     "Square both sides, so the left-hand side becomes $\\sin^2 2x$",
     "Replace $\\sin x\\cos x$ with $\\cos 2x$",
     "Multiply both sides by 2, so the left-hand side becomes $\\sin 2x$"
    ],
    "correct": 3,
    "why": [
     "Multiplying by $\\dfrac12$ gives $\\dfrac12\\sin x\\cos x$, which is not $\\sin 2x$. You should multiply by 2.",
     "Squaring changes the equation and introduces false solutions. It is not needed here.",
     "$\\sin x\\cos x$ belongs with $\\sin 2x$ (via the factor 2), not with $\\cos 2x$.",
     "$2\\sin x\\cos x = \\sin 2x$, so after multiplying by 2 the equation becomes $\\sin 2x = \\dfrac{\\sqrt3}{2}$."
    ]
   },
   {
    "question": "The equation $\\sin 2x = \\dfrac{\\sqrt3}{2}$ has $2x = \\dfrac{\\pi}{3} + n\\cdot 2\\pi$ as one case. What is the other case?",
    "choices": [
     "$2x = \\pi + \\dfrac{\\pi}{3} + n\\cdot 2\\pi$",
     "$2x = \\dfrac{\\pi}{3} + n\\cdot \\pi$",
     "$2x = -\\dfrac{\\pi}{3} + n\\cdot 2\\pi$",
     "$2x = \\pi - \\dfrac{\\pi}{3} + n\\cdot 2\\pi$"
    ],
    "correct": 3,
    "why": [
     "$\\pi + \\dfrac{\\pi}{3}$ gives a negative sine value, not the same positive value.",
     "The period of sine is $2\\pi$, not $\\pi$. Changing to $n\\cdot\\pi$ is wrong for the equation $\\sin 2x = \\ldots$ itself.",
     "$-\\dfrac{\\pi}{3}$ belongs to cosine ($\\cos v = \\cos(-v)$), not sine. For sine, $\\pi - v$ applies.",
     "For sine, the other angle with the same value is the mirror image about $\\dfrac{\\pi}{2}$, that is $\\pi - \\dfrac{\\pi}{3}$."
    ]
   },
   {
    "question": "When solving $\\cos x\\,(2\\cos x - 4) = 0$ you get the case $2\\cos x - 4 = 0$. What applies to it?",
    "choices": [
     "It gives $x = 2$ radians",
     "It gives $\\cos x = -4$, which has no solution",
     "It gives $\\cos x = 2$, which has no solution since $-1 \\le \\cos x \\le 1$",
     "It gives $\\cos x = 2$, that is $x = \\cos^{-1} 2$"
    ],
    "correct": 2,
    "why": [
     "The factor is set equal to zero to solve for $\\cos x$; you do not read off $x$ directly from the constant.",
     "The equation gives $\\cos x = 2$ (add 4, divide by 2), not $-4$.",
     "$2\\cos x = 4$ gives $\\cos x = 2$, but cosine can never be greater than 1, so this case gives no solutions.",
     "$\\cos^{-1} 2$ does not exist: cosine never takes the value 2, so there is no such angle."
    ]
   },
   {
    "question": "In $\\sin^2 x + 2\\sin x - 3 = 0$ you put $t = \\sin x$ and solve $t^2 + 2t - 3 = 0$ to get $t_1 = -3$ and $t_2 = 1$. Which values of $x$ give solutions?",
    "choices": [
     "Only $t_2 = 1$: $\\sin x = 1$ gives $x = 90^\\circ + n\\cdot 360^\\circ$; $t_1 = -3$ has no solution",
     "Only $t_1 = -3$, since it is the larger root in absolute value",
     "Both: $\\sin x = -3$ and $\\sin x = 1$ each give a set of angles",
     "None, since you may not change back from $t$ to $\\sin x$"
    ],
    "correct": 0,
    "why": [
     "$\\sin x = 1$ gives $x = 90^\\circ + n\\cdot 360^\\circ$, while $\\sin x = -3$ is impossible since $-1 \\le \\sin x \\le 1$.",
     "The absolute value does not decide. What decides is whether the value lies in $[-1, 1]$. $-3$ does not, so that root gives no angles.",
     "$\\sin x = -3$ has no solution since sine never becomes less than $-1$; only $t_2 = 1$ gives angles.",
     "Changing back $t = \\sin x$ is exactly the point of the substitution; that is how you find $x$."
    ]
   }
  ]
 },
 "ma4-1.10": {
  "kalla": "6c0fd3b29c",
  "data": [
   {
    "question": "What is the function $y = \\sin x$ called?",
    "choices": [
     "The sine function",
     "The tangent function",
     "The cosine function",
     "The unit function"
    ],
    "correct": 0,
    "why": [
     "That is right: $y = \\sin x$ is called the sine function, while $y = \\cos x$ is called the cosine function.",
     "The tangent function is $y = \\tan x$ and has a completely different (unbounded) graph.",
     "The cosine function is $y = \\cos x$, not $y = \\sin x$.",
     "There is no function with that name in this context."
    ]
   },
   {
    "question": "What period do the sine and cosine functions have?",
    "choices": [
     "$180^\\circ$, which corresponds to $\\pi$",
     "They are not periodic: they never repeat",
     "$360^\\circ$, which corresponds to $2\\pi$",
     "$90^\\circ$, which corresponds to $\\dfrac{\\pi}{2}$"
    ],
    "correct": 2,
    "why": [
     "$180^\\circ$ is half a turn; by then the curve has not yet repeated its whole pattern.",
     "Both $y = \\sin x$ and $y = \\cos x$ are periodic: they repeat their pattern over and over again.",
     "Exactly: after a full turn the same values repeat, so the period is $360^\\circ = 2\\pi$.",
     "$90^\\circ$ is only a quarter of a turn, far too short for a whole period."
    ]
   },
   {
    "question": "What is the range of $y = \\sin x$?",
    "choices": [
     "all real numbers",
     "$0 \\leq y \\leq 1$",
     "$-1 \\leq y \\leq 1$",
     "$-360^\\circ \\leq y \\leq 360^\\circ$"
    ],
    "correct": 2,
    "why": [
     "The curve oscillates back and forth between fixed limits: it does not grow without limit.",
     "Sine also becomes negative (for example $\\sin 210^\\circ = -0.5$), so the lower limit is $-1$, not $0$.",
     "That is right: the sine value comes from the unit circle and always stays between $-1$ and $1$.",
     "The range applies to the $y$-values ($-1$ to $1$), not to angles in degrees."
    ]
   },
   {
    "question": "How does the graph of $y = \\cos x$ lie compared with the graph of $y = \\sin x$?",
    "choices": [
     "The same shape, but shifted $90^\\circ$ to the left",
     "Reflected upside down",
     "The same shape, but shifted $180^\\circ$ to the left",
     "Completely different shapes: they have nothing in common"
    ],
    "correct": 0,
    "why": [
     "That is right: the curves have the same shape; the cosine curve is the sine curve shifted $90^\\circ$ to the left (it starts at $y = 1$ instead of $y = 0$).",
     "Cosine is not an upside-down reflection of sine, but the same wave shape shifted sideways.",
     "The shift is a quarter of a turn ($90^\\circ$), not half a turn ($180^\\circ$).",
     "On the contrary, the curves look very similar: they have exactly the same wave shape."
    ]
   },
   {
    "question": "How do you solve the equation $\\sin x = 0.4$ graphically?",
    "choices": [
     "Draw $y = \\sin x$ and read off the highest point of the curve",
     "Draw $y = \\sin x$ and $y = 0.4$ and read off the $x$-coordinates of the points of intersection",
     "Draw $y = 0.4$ and read off the slope of the line",
     "Draw $y = \\sin x$ and read off where the curve crosses the $x$-axis"
    ],
    "correct": 1,
    "why": [
     "The highest point of the curve is $y = 1$ (at $90^\\circ$) and has nothing to do with the solution to $\\sin x = 0.4$.",
     "That is right: you draw both sides ($y = \\text{LHS}$ and $y = \\text{RHS}$) and take the $x$-coordinate at each point of intersection.",
     "A horizontal line $y = 0.4$ has the slope $0$ and says nothing about the solution on its own; it is the intersection with the sine curve that counts.",
     "Where the curve crosses the $x$-axis, $\\sin x = 0$, not $0.4$: you must draw the line $y = 0.4$."
    ]
   }
  ]
 },
 "ma4-1.11": {
  "kalla": "55be383060",
  "data": [
   {
    "question": "What is meant by the amplitude of a trigonometric function?",
    "choices": [
     "The distance in the $x$-direction between two peaks",
     "The difference between the largest and smallest values of the function",
     "The distance from the equilibrium position to the peak (or trough) of the curve",
     "The number of oscillations per $360^\\circ$"
    ],
    "correct": 2,
    "why": [
     "That describes the period (a distance in the $x$-direction), not the amplitude (a distance in the $y$-direction).",
     "Almost, but that is the whole difference between the largest and smallest values; the amplitude is half of it.",
     "Exactly: the amplitude is the distance from the equilibrium position up to the peak (or down to the trough), equal to half the difference between the largest and smallest values.",
     "The number of oscillations is linked to the period and the coefficient of $x$, not to the amplitude."
    ]
   },
   {
    "question": "What is the amplitude of the function $y = -6 \\sin x$?",
    "choices": [
     "12",
     "1",
     "$-6$",
     "6"
    ],
    "correct": 3,
    "why": [
     "12 would be the whole difference between the largest and smallest values ($2 \\cdot 6$); the amplitude is half of that, so 6.",
     "The basic function $y = \\sin x$ has the amplitude 1, but the coefficient $-6$ changes the amplitude.",
     "The amplitude is a distance and can never be negative: take the absolute value of the coefficient.",
     "That is right: the amplitude is $|A| = |-6| = 6$; an amplitude can never be negative."
    ]
   },
   {
    "question": "What does the graph $y = -2 \\sin x$ look like compared with $y = 2 \\sin x$?",
    "choices": [
     "It has a different period",
     "It is twice as tall",
     "It is a reflection of $y = 2 \\sin x$ in the $x$-axis, with the same amplitude 2",
     "It has the amplitude $-2$"
    ],
    "correct": 2,
    "why": [
     "The period is decided by the coefficient of $x$, which is unchanged here.",
     "The amplitude is unchanged (2): only the direction (the reflection) changes.",
     "Exactly: the minus sign reflects the curve in the $x$-axis; the shape and the amplitude (2) are unchanged.",
     "An amplitude can never be negative; the minus sign gives a reflection, not a negative amplitude."
    ]
   },
   {
    "question": "What is the period (in degrees) of the function $y = \\sin Bx$?",
    "choices": [
     "$360^\\circ \\cdot B$",
     "$\\dfrac{B}{360^\\circ}$",
     "$\\dfrac{360^\\circ}{B}$",
     "$\\dfrac{2\\pi}{B}$"
    ],
    "correct": 2,
    "why": [
     "Then the period would grow with $B$, which is the opposite of the truth: a larger $B$ gives faster oscillation and a shorter period.",
     "The fraction is upside down; it is $360^\\circ$ that is divided by $B$, not the other way round.",
     "That is right: the larger $B$ is, the faster the curve oscillates, so the period $\\dfrac{360^\\circ}{B}$ becomes shorter.",
     "$\\dfrac{2\\pi}{B}$ is the right period but in radians; the question is about degrees, and then it is $\\dfrac{360^\\circ}{B}$."
    ]
   },
   {
    "question": "What are the amplitude and the period of the function $y = 5 \\sin 8x$?",
    "choices": [
     "Amplitude 40 and period $45^\\circ$",
     "Amplitude 5 and period $8^\\circ$",
     "Amplitude 8 and period $45^\\circ$",
     "Amplitude 5 and period $45^\\circ$"
    ],
    "correct": 3,
    "why": [
     "The amplitude is the coefficient 5 itself, not $5 \\cdot 8$.",
     "8 is the coefficient of $x$; the period is $\\dfrac{360^\\circ}{8} = 45^\\circ$, not $8^\\circ$.",
     "The coefficient in front of sine (5) is the amplitude; 8 is in front of $x$ and controls the period.",
     "Right: the coefficient 5 in front of sine gives the amplitude and $\\dfrac{360^\\circ}{8} = 45^\\circ$ gives the period."
    ]
   }
  ]
 },
 "ma4-1.12": {
  "kalla": "7f56dcd6bd",
  "data": [
   {
    "question": "What is it called when a graph is moved in a coordinate system without its appearance otherwise changing?",
    "choices": [
     "Reflection",
     "Translation (shift)",
     "Period",
     "Amplitude"
    ],
    "correct": 1,
    "why": [
     "A reflection turns the curve over; with a shift the shape is kept and only the position changes.",
     "Exactly: a pure movement of the curve, where the shape is kept, is called a shift (translation).",
     "The period is the length of one whole oscillation, not a movement of the graph.",
     "The amplitude is how far the curve oscillates around its equilibrium position, not a movement of the curve."
    ]
   },
   {
    "question": "How is the graph of $y = \\sin x + 3$ shifted compared with $y = \\sin x$?",
    "choices": [
     "$3^\\circ$ to the left in the $x$-direction",
     "3 units up in the $y$-direction",
     "3 units down in the $y$-direction",
     "$3^\\circ$ to the right in the $x$-direction"
    ],
    "correct": 1,
    "why": [
     "A sideways shift must be inside the argument, as in $\\sin(x + 3^\\circ)$.",
     "That is right: the number is added to the function value, so every $y$-coordinate becomes 3 larger and the curve is raised.",
     "A shift downwards would require subtraction, that is $y = \\sin x - 3$.",
     "The term is outside the argument and affects the $y$-direction, not the $x$-direction."
    ]
   },
   {
    "question": "In $y = \\sin (x + C) + D$: in which direction is the curve shifted in the $x$-direction if $C > 0$?",
    "choices": [
     "To the right",
     "Down",
     "Up",
     "To the left"
    ],
    "correct": 3,
    "why": [
     "To the right happens instead when $C < 0$ (for example $\\sin(x - 90^\\circ)$).",
     "Up and down are controlled by $D$ (in the $y$-direction), not by $C$.",
     "Up and down are controlled by $D$ (in the $y$-direction), not by $C$.",
     "Right: a positive $C$ inside the argument moves the curve to the left."
    ]
   },
   {
    "question": "How is the graph of $y = \\sin (x - 90^\\circ)$ shifted compared with $y = \\sin x$?",
    "choices": [
     "90 units down",
     "$90^\\circ$ to the right",
     "$90^\\circ$ to the left",
     "90 units up"
    ],
    "correct": 1,
    "why": [
     "The constant is inside the argument and affects the $x$-direction, not the $y$-direction.",
     "That is right: the constant is in the argument and $C = -90^\\circ$ (negative) gives a shift to the right.",
     "To the left would require a positive $C$, that is $\\sin(x + 90^\\circ)$.",
     "The constant is inside the argument and affects the $x$-direction, not the $y$-direction."
    ]
   },
   {
    "question": "What does the constant $D$ do in the function $y = \\sin (x + C) + D$?",
    "choices": [
     "Shifts the graph $D$ units in the $y$-direction",
     "Shifts the graph $D$ degrees in the $x$-direction",
     "Changes the amplitude of the curve",
     "Changes the period of the curve"
    ],
    "correct": 0,
    "why": [
     "Exactly: $D$ is added to the function value and raises (or lowers) the whole curve in the $y$-direction.",
     "The shift in the $x$-direction is controlled by $C$ inside the argument, not by $D$.",
     "The amplitude is decided by the factor $A$ in front of sine, not by $D$.",
     "The period is decided by the factor $B$ with $x$ inside the argument, not by $D$."
    ]
   }
  ]
 },
 "ma4-1.13": {
  "kalla": "a1d9c678f3",
  "data": [
   {
    "question": "What is the period of the function $y = \\tan x$?",
    "choices": [
     "$360^\\circ$ (or $2\\pi$ rad)",
     "$90^\\circ$ (or $\\dfrac{\\pi}{2}$ rad)",
     "$180^\\circ$ (or $\\pi$ rad)",
     "Tangent is not periodic"
    ],
    "correct": 2,
    "why": [
     "That is the period of sine and cosine. Tangent repeats twice as often, with the period $180^\\circ$.",
     "$90^\\circ$ is the distance from the origin to the first asymptote, not the length of the period. The curve only repeats after $180^\\circ$.",
     "Exactly: between each pair of vertical asymptotes the same shape repeats, and it does so with the period $180^\\circ$.",
     "Tangent certainly is periodic: it repeats with the period $180^\\circ$."
    ]
   },
   {
    "question": "Why does the graph of $y = \\tan x$ have vertical asymptotes?",
    "choices": [
     "Because tangent has an amplitude that grows towards infinity",
     "Because $\\sin x$ becomes $0$ at certain angles",
     "Because $\\tan x = \\dfrac{\\sin x}{\\cos x}$ is not defined where $\\cos x = 0$",
     "Because the graph changes sign at every whole period"
    ],
    "correct": 2,
    "why": [
     "Tangent has no amplitude. That the curve grows without limit is because the denominator $\\cos x$ tends to $0$, not because of an amplitude.",
     "When $\\sin x = 0$ the numerator is zero, so $\\tan x = 0$ (the graph crosses the *x*-axis). That gives no asymptote.",
     "That is right: the fraction is undefined when the denominator $\\cos x = 0$, and there the graph shoots off towards infinity.",
     "A change of sign in itself gives no asymptote. The asymptotes arise exactly where $\\cos x = 0$, so that the fraction is undefined."
    ]
   },
   {
    "question": "For which $x$ is $y = \\tan x$ not defined?",
    "choices": [
     "$x = 90^\\circ + n \\cdot 360^\\circ$",
     "$x = 45^\\circ + n \\cdot 90^\\circ$",
     "$x = 0^\\circ + n \\cdot 180^\\circ$",
     "$x = 90^\\circ + n \\cdot 180^\\circ$"
    ],
    "correct": 3,
    "why": [
     "That only gives every other one of the $x$ where $\\cos x = 0$. $270^\\circ$, $450^\\circ$ and so on are also missing, so the step should be $180^\\circ$, not $360^\\circ$.",
     "These angles do not correspond to all the zeros of $\\cos x$; the asymptotes lie at regular $180^\\circ$ intervals from $90^\\circ$.",
     "At these $x$, $\\cos x = \\pm 1 \\neq 0$, so tangent is defined (and equal to $0$).",
     "Right: there $\\cos x = 0$, so the fraction $\\dfrac{\\sin x}{\\cos x}$ is undefined. It can also be written $x = \\pm 90^\\circ + n \\cdot 360^\\circ$."
    ]
   },
   {
    "question": "Does the tangent function $y = \\tan x$ have an amplitude?",
    "choices": [
     "No: tangent has no amplitude, it grows without limit towards the asymptotes",
     "Yes, the amplitude is $1$ just as for $\\sin x$",
     "Yes, the amplitude is $180^\\circ$",
     "Yes, but only between two asymptotes"
    ],
    "correct": 0,
    "why": [
     "That is right: the curve tends to $\\pm\\infty$ at the asymptotes, so there is no largest value and therefore no amplitude.",
     "Sine has the amplitude $1$ because it oscillates between $-1$ and $1$. Tangent has no largest value at all.",
     "$180^\\circ$ is the period, not an amplitude. Tangent has no amplitude at all.",
     "Even between two asymptotes tangent grows without limit towards $\\pm\\infty$, so there is no amplitude."
    ]
   },
   {
    "question": "The function $y = \\tan(Bx + C) + D$ has the period …",
    "choices": [
     "$\\dfrac{360^\\circ}{B}$ (or $\\dfrac{2\\pi}{B}$ rad)",
     "$180^\\circ \\cdot B$",
     "$\\dfrac{180^\\circ}{C}$",
     "$\\dfrac{180^\\circ}{B}$ (or $\\dfrac{\\pi}{B}$ rad)"
    ],
    "correct": 3,
    "why": [
     "$360^\\circ$ is the basic period of sine and cosine, not of tangent (which is $180^\\circ$).",
     "The period is divided by $B$, not multiplied. A large $B$ gives a shorter period.",
     "$C$ controls the shift in the $x$-direction, not the period. The period is decided by $B$.",
     "Right: the basic period $180^\\circ$ is divided by the coefficient $B$ of $x$."
    ]
   }
  ]
 },
 "ma4-1.14": {
  "kalla": "c951b3051b",
  "data": [
   {
    "question": "How is $y = a \\sin x + b \\cos x$ written as a single trigonometric function?",
    "choices": [
     "$y = c \\sin(x + v)$ with $c = a + b$",
     "$y = c \\sin(x + v)$ with $c = a^2 + b^2$",
     "$y = c \\sin(x + v)$ with $c = \\sqrt{a^2 + b^2}$",
     "$y = c \\tan(x + v)$ with $c = \\sqrt{a^2 + b^2}$"
    ],
    "correct": 2,
    "why": [
     "The amplitude is not the sum $a + b$ but $\\sqrt{a^2 + b^2}$. Otherwise, for example, $3\\sin x + 4\\cos x$ would get the amplitude 7 instead of 5.",
     "The square root has been forgotten: $a^2 + b^2$ is the square of the amplitude, so the amplitude is $\\sqrt{a^2 + b^2}$.",
     "The sum of a sine term and a cosine term becomes a shifted sine curve with amplitude $c = \\sqrt{a^2 + b^2}$.",
     "Combining them gives a sine function, not a tangent function."
    ]
   },
   {
    "question": "What is the largest value of the function $y = a \\sin x + b \\cos x$?",
    "choices": [
     "$a + b$",
     "$\\dfrac{b}{a}$",
     "$a^2 + b^2$",
     "$\\sqrt{a^2 + b^2}$"
    ],
    "correct": 3,
    "why": [
     "The largest value is the amplitude $\\sqrt{a^2 + b^2}$, not the sum of the coefficients.",
     "$\\dfrac{b}{a}$ is $\\tan v$ (the phase shift), not the largest value.",
     "$a^2 + b^2$ is the amplitude squared: you must take the square root to get the largest value.",
     "The function is a shifted sine curve $c\\sin(x+v)$, so its largest value is the amplitude $c = \\sqrt{a^2 + b^2}$."
    ]
   },
   {
    "question": "What amplitude does the function $y = 3 \\sin x + 4 \\cos x$ have?",
    "choices": [
     "$7$",
     "$1$",
     "$5$",
     "$\\sqrt{7}$"
    ],
    "correct": 2,
    "why": [
     "7 is the sum $3 + 4$. The amplitude is $\\sqrt{3^2 + 4^2} = 5$, not $a + b$.",
     "1 would mean that the terms cancel each other, but $\\sqrt{9 + 16} = 5$.",
     "$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
     "You have calculated $\\sqrt{4^2 - 3^2}$ by mistake; the right one is $\\sqrt{3^2 + 4^2} = 5$ (plus, not minus)."
    ]
   },
   {
    "question": "In the rewriting $y = a \\sin x + b \\cos x = c \\sin(x + v)$, what applies to $\\tan v$?",
    "choices": [
     "$\\tan v = \\sqrt{a^2 + b^2}$",
     "$\\tan v = \\dfrac{a}{b}$",
     "$\\tan v = \\dfrac{b}{a}$",
     "$\\tan v = a \\cdot b$"
    ],
    "correct": 2,
    "why": [
     "$\\sqrt{a^2 + b^2}$ is the amplitude $c$, not $\\tan v$.",
     "The fraction is upside down: it should be $\\dfrac{b}{a}$, not $\\dfrac{a}{b}$.",
     "The phase shift is given by $\\tan v = \\dfrac{b}{a}$ (the cosine coefficient divided by the sine coefficient).",
     "The product $a \\cdot b$ has nothing to do with the angle $v$."
    ]
   },
   {
    "question": "The function $y = 5 \\sin x + 12 \\cos x$ is rewritten as $c \\sin(x + v)$. What is its smallest value?",
    "choices": [
     "$-13$",
     "$0$",
     "$-17$",
     "$13$"
    ],
    "correct": 0,
    "why": [
     "$c = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$, and the smallest value is $-c = -13$.",
     "The curve oscillates between $-13$ and $13$, so the smallest value is $-13$, not 0.",
     "$-17$ comes from the sum $5 + 12$; the amplitude is $\\sqrt{5^2 + 12^2} = 13$, not 17.",
     "13 is the largest value. The smallest is the negative, $-13$."
    ]
   }
  ]
 },
 "ma4-1.15": {
  "kalla": "ffcdaee9bf",
  "data": [
   {
    "question": "In an application: what is the time for one whole oscillation called?",
    "choices": [
     "The equilibrium position",
     "The period, often written $T$",
     "The amplitude",
     "The phase shift"
    ],
    "correct": 1,
    "why": [
     "The equilibrium position is the middle level of the oscillation in the $y$-direction, not a time.",
     "Exactly: the time for one whole oscillation is called the period (the time period) and is often written $T$.",
     "The amplitude $|A|$ is the size of the oscillation (how far from the equilibrium position), not a time.",
     "The phase shift is a shift in the $x$-direction, not the time for an oscillation."
    ]
   },
   {
    "question": "What amplitude does the oscillation $y = -3 \\sin 2t$ have?",
    "choices": [
     "$2$",
     "$3$, since the amplitude is $|A|$",
     "$-3$",
     "$6$"
    ],
    "correct": 1,
    "why": [
     "The number $2$ is $B$ (it controls the period), not the amplitude.",
     "That is right: the amplitude is the absolute value $|A| = |-3| = 3$ and is always positive.",
     "The amplitude cannot be negative; the minus sign only reflects the graph, the absolute value is $3$.",
     "$6$ would be the distance from the top value to the bottom value ($2|A|$), not the amplitude itself."
    ]
   },
   {
    "question": "The function $y = A \\sin Bt$ has the period (in radians)…",
    "choices": [
     "$T = 2\\pi B$",
     "$T = \\dfrac{2\\pi}{B}$",
     "$T = \\dfrac{B}{2\\pi}$",
     "$T = \\dfrac{2\\pi}{A}$"
    ],
    "correct": 1,
    "why": [
     "The fraction line is missing here: a large $B$ gives a short period, so $B$ must be in the denominator.",
     "The right formula: it is $B$ in the denominator that decides the period in radians.",
     "The fraction is upside down; $B$ should be in the denominator, not in the numerator.",
     "The period depends on $B$, not on the amplitude $A$."
    ]
   },
   {
    "question": "In the model $y = A \\sin(Bx + C) + D$, what does the constant $D$ describe?",
    "choices": [
     "The period",
     "The equilibrium position, that is the shift in the $y$-direction",
     "The amplitude",
     "The phase shift"
    ],
    "correct": 1,
    "why": [
     "The period is given by $B$ (via $T = \\dfrac{2\\pi}{B}$), not by $D$.",
     "That is right: $D$ shifts the whole graph in the $y$-direction and is the middle level of the oscillation (the equilibrium position).",
     "The amplitude is given by $|A|$, not by $D$.",
     "The phase shift (shift in the $x$-direction) is given by $\\dfrac{C}{B}$, not by $D$."
    ]
   },
   {
    "question": "In the model $y = A \\sin(Bx + C) + D$, how large is the shift in the $x$-direction (the phase shift) compared with $y = \\sin Bx$?",
    "choices": [
     "$C$",
     "$C \\cdot B$",
     "$\\dfrac{C}{B}$",
     "$\\dfrac{B}{C}$"
    ],
    "correct": 2,
    "why": [
     "$C$ alone is not enough; the shift is $C$ divided by $B$.",
     "The shift is a quotient, $\\dfrac{C}{B}$, not a product.",
     "Right: the graph is shifted $\\dfrac{C}{B}$ in the $x$-direction compared with $y = \\sin Bx$.",
     "The fraction is upside down: it should be $C$ divided by $B$, not the other way round."
    ]
   }
  ]
 },
 "ma4-2.1": {
  "kalla": "c0394bc25f",
  "data": [
   {
    "question": "What does the Leibniz notation $\\dfrac{dy}{dx}$ mean?",
    "choices": [
     "The product of $dy$ and $dx$",
     "The derivative of $y$ with respect to $x$",
     "The change in $x$ when $y$ increases by 1",
     "The second derivative of $y$"
    ],
    "correct": 1,
    "why": [
     "The notation is not an ordinary product but a symbol for a derivative: a quotient of infinitely small changes.",
     "Exactly: $\\dfrac{dy}{dx}$ is another way of writing $y'$, the derivative of $y$ with respect to $x$.",
     "It is the change in $y$ when $x$ changes that is meant, not the other way round.",
     "The second derivative is written $\\dfrac{d^2y}{dx^2}$ with a 2; $\\dfrac{dy}{dx}$ is the first derivative."
    ]
   },
   {
    "question": "Which expression is the definition of the derivative?",
    "choices": [
     "$f'(x) = \\lim_{h \\to 0}\\, h\\,\\big(f(x+h) - f(x)\\big)$",
     "$f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) + f(x)}{h}$",
     "$f'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}$",
     "$f'(x) = \\dfrac{f(x+h) - f(x)}{h}$"
    ],
    "correct": 2,
    "why": [
     "The difference should be divided by $h$, not multiplied by $h$.",
     "The numerator should be the difference $f(x+h) - f(x)$, not the sum.",
     "That is right: the derivative is the limit of the difference quotient as $h \\to 0$.",
     "Without the limit $\\lim_{h \\to 0}$ this is only the slope of a secant, not the derivative."
    ]
   },
   {
    "question": "What is $f'(x)$ if $f(x) = x^n$?",
    "choices": [
     "$f'(x) = nx^n$",
     "$f'(x) = nx^{n+1}$",
     "$f'(x) = x^{n-1}$",
     "$f'(x) = nx^{n-1}$"
    ],
    "correct": 3,
    "why": [
     "The exponent must be lowered to $n - 1$; otherwise it has not been differentiated.",
     "The exponent should decrease by 1, not increase, when you differentiate a power.",
     "The factor $n$ from the exponent is missing; it must come down with it.",
     "Exactly: the power rule. The exponent becomes a factor and the new exponent is $n - 1$."
    ]
   },
   {
    "question": "How do you get the second derivative $f''(x)$?",
    "choices": [
     "By squaring the derivative $f'(x)$",
     "By integrating $f'(x)$",
     "By differentiating the first derivative $f'(x)$ once more",
     "By multiplying $f(x)$ by 2"
    ],
    "correct": 2,
    "why": [
     "You do not square; you differentiate $f'(x)$ a second time.",
     "Integration is the opposite of differentiation and takes you back towards $f(x)$, not to $f''(x)$.",
     "That is right: the second derivative is the derivative of the derivative.",
     "Multiplying the function by 2 has nothing to do with differentiation."
    ]
   },
   {
    "question": "What is the easiest way to differentiate a term such as $\\sqrt{x}$?",
    "choices": [
     "Multiply the root by 2",
     "The derivative of $\\sqrt{x}$ is always $\\sqrt{x}$",
     "Rewrite it as the power $x^{1/2}$ and differentiate with the power rule",
     "The root cannot be differentiated"
    ],
    "correct": 2,
    "why": [
     "Multiplying by 2 is not a rule of differentiation; rewrite the root as a power instead.",
     "That applies to $e^x$, not to $\\sqrt{x}$; the root has a different derivative.",
     "Exactly: $\\sqrt{x} = x^{1/2}$, and then the power rule works as usual.",
     "The root can perfectly well be differentiated when it is rewritten as a power."
    ]
   }
  ]
 },
 "ma4-2.2": {
  "kalla": "d3262f66e0",
  "data": [
   {
    "question": "What does the derivative at a point correspond to graphically?",
    "choices": [
     "The distance from the point to the origin",
     "The slope ($k$-value) of the tangent at the point",
     "The $y$-value of the curve at the point",
     "The area between the curve and the $x$-axis"
    ],
    "correct": 1,
    "why": [
     "The distance to the origin is not linked to the value of the derivative.",
     "That is right: the derivative at a point is the slope of the tangent that touches the curve there.",
     "The $y$-value of the curve is the function value $f(x)$, not the derivative $f'(x)$.",
     "Area is linked to integrals, not to the derivative."
    ]
   },
   {
    "question": "A tangent is described by the equation of a straight line $y = kx + m$. What does the value of the derivative at the point of tangency give?",
    "choices": [
     "Both $k$ and $m$ at the same time",
     "The $x$-coordinate of the point of tangency",
     "The slope $k$",
     "The $y$-intercept $m$"
    ],
    "correct": 2,
    "why": [
     "The derivative only gives the slope $k$; $m$ must be found separately.",
     "The derivative gives the slope, not the $x$-coordinate of the point.",
     "Exactly: the value of the derivative at the point is the slope of the tangent, that is $k$.",
     "$m$ is only found afterwards by substituting a point that the tangent passes through."
    ]
   },
   {
    "question": "If $V(t)$ is the number of litres in a bathtub after $t$ minutes, what unit does the derivative $V'(t)$ have?",
    "choices": [
     "minute",
     "litre $\\cdot$ minute",
     "litre",
     "litre/minute"
    ],
    "correct": 3,
    "why": [
     "Minute is the unit of the time $t$, not of the derivative.",
     "The derivative is a quotient, not a product, of the units: it becomes litres per minute.",
     "Litre is the unit of $V(t)$ itself, not of its rate of change.",
     "That is right: the unit of the derivative is the unit on the $y$-axis (litre) per the unit on the $x$-axis (minute)."
    ]
   },
   {
    "question": "If $s(t)$ is distance as a function of time, what does the derivative $s'(t)$ stand for?",
    "choices": [
     "The distance travelled",
     "The total time",
     "The acceleration $a(t)$",
     "The velocity $v(t)$"
    ],
    "correct": 3,
    "why": [
     "The distance is $s(t)$ itself; the derivative describes how it changes.",
     "The time is the independent variable $t$, not the derivative.",
     "The acceleration is $s''(t) = v'(t)$, that is the second derivative of the distance.",
     "That is right: the derivative of distance with respect to time is the velocity."
    ]
   },
   {
    "question": "You have found the slope $k$ of the tangent. How do you find $m$ in the equation of the tangent $y = kx + m$?",
    "choices": [
     "$m$ is always zero for a tangent",
     "$m$ is always equal to $k$",
     "Differentiate the function once more",
     "Substitute a point $(x,\\ y)$ that the tangent passes through, for example the point of tangency"
    ],
    "correct": 3,
    "why": [
     "A tangent can very well have $m \\neq 0$; the value depends on where the tangent crosses the $y$-axis.",
     "$k$ is the slope and $m$ is the $y$-intercept: they are different numbers.",
     "The second derivative gives information about the shape of the curve, not about the tangent's $m$-value.",
     "Exactly: with $k$ known and a point on the line, you can solve for $m$ from $y = kx + m$."
    ]
   }
  ]
 },
 "ma4-2.3": {
  "kalla": "8fb5caf9a7",
  "data": [
   {
    "question": "What is a function of the type $f(g(x))$, that is a function inside another function, called?",
    "choices": [
     "A composite function",
     "A periodic function",
     "An inverse function",
     "A rational function"
    ],
    "correct": 0,
    "why": [
     "That is right: $f(g(x))$ is a composite function with an outer and an inner function.",
     "Periodic refers to the function values repeating, which has nothing to do with composition.",
     "An inverse function \"reverses\" a function; that is something other than putting one function into another.",
     "A rational function is a quotient of two polynomials, not a function inserted into another."
    ]
   },
   {
    "question": "According to the chain rule, how is $y = f(g(x))$ differentiated?",
    "choices": [
     "$y' = f\\,'(x)\\cdot g'(x)$",
     "$y' = f\\,'(g(x))\\cdot g'(x)$",
     "$y' = f\\,'(g'(x))$",
     "$y' = f\\,'(g(x)) + g'(x)$"
    ],
    "correct": 1,
    "why": [
     "The outer derivative should be evaluated at the inner function $g(x)$, not at $x$.",
     "Exactly: the outer derivative with the inner function kept, times the inner derivative.",
     "You do not differentiate the inner function twice; it is the outer derivative times the inner derivative.",
     "The chain rule multiplies the two derivatives; it does not add them."
    ]
   },
   {
    "question": "What is the inner function in $y = (x^2 - 5)^2$?",
    "choices": [
     "$x^2 - 5$",
     "$2x$",
     "$z^2$, that is the squaring",
     "$x^2$"
    ],
    "correct": 0,
    "why": [
     "That is right: what is inside the bracket, $x^2 - 5$, is the inner function.",
     "$2x$ is the derivative of the inner function, not the function itself.",
     "$z^2$ (the squaring) is the outer function, not the inner one.",
     "$x^2$ is only part of the bracket; the whole expression $x^2 - 5$ is the inner function."
    ]
   },
   {
    "question": "Differentiate $y = (2x + 1)^3$.",
    "choices": [
     "$y' = 6(2x + 1)^3$",
     "$y' = 2(2x + 1)^2$",
     "$y' = 6(2x + 1)^2$",
     "$y' = 3(2x + 1)^2$"
    ],
    "correct": 2,
    "why": [
     "The exponent should be lowered by $1$ to $2$, not left as $3$.",
     "The outer derivative gives the factor $3$ (the exponent), and together with the inner derivative $2$ that makes $6$.",
     "Right: $3(2x + 1)^2\\cdot 2 = 6(2x + 1)^2$; do not forget the inner derivative $2$.",
     "Here the inner derivative $2$ has been forgotten; multiply by it."
    ]
   },
   {
    "question": "How do you rewrite $\\sqrt{x^2 + 3x}$ as a power before differentiating with the chain rule?",
    "choices": [
     "$\\dfrac{1}{2}(x^2 + 3x)$",
     "$(x^2 + 3x)^{1/2}$",
     "$(x^2 + 3x)^{2}$",
     "$(x^2 + 3x)^{-1/2}$"
    ],
    "correct": 1,
    "why": [
     "The root is not a factor $\\dfrac{1}{2}$ in front of the expression but an exponent on the expression.",
     "That is right: a square root is a power with the exponent $\\dfrac{1}{2}$.",
     "Exponent $2$ means squared, not square root.",
     "$-\\dfrac{1}{2}$ only appears after differentiating; the root itself is $\\dfrac{1}{2}$."
    ]
   }
  ]
 },
 "ma4-2.4": {
  "kalla": "652ef7ca4c",
  "data": [
   {
    "question": "The chain rule in Leibniz form: if $y = f(z)$ and $z = g(x)$, what is $\\dfrac{dy}{dx}$?",
    "choices": [
     "$\\dfrac{dz}{dy}\\cdot \\dfrac{dx}{dz}$",
     "$\\dfrac{dy}{dz} + \\dfrac{dz}{dx}$",
     "$\\dfrac{dy}{dz}\\cdot \\dfrac{dz}{dx}$",
     "$\\dfrac{dy}{dz}\\cdot \\dfrac{dx}{dz}$"
    ],
    "correct": 2,
    "why": [
     "Here both numerators and denominators are swapped; that does not give $\\dfrac{dy}{dx}$.",
     "The chain rule is a product of the derivatives, not a sum.",
     "That is right: the outer derivative $\\dfrac{dy}{dz}$ times the inner derivative $\\dfrac{dz}{dx}$; if you see it as a \"fraction\", $dz$ cancels.",
     "The second factor should be $\\dfrac{dz}{dx}$, not $\\dfrac{dx}{dz}$, otherwise $dz$ does not cancel correctly."
    ]
   },
   {
    "question": "The area of a circle is $A(r) = \\pi r^2$. What is $\\dfrac{dA}{dr}$?",
    "choices": [
     "$\\pi r$",
     "$2\\pi r$",
     "$\\pi r^2$",
     "$\\dfrac{\\pi r^3}{3}$"
    ],
    "correct": 1,
    "why": [
     "The exponent must be reduced by $1$ and brought down as a factor; $r^2$ becomes $2r$, not $r$.",
     "Exactly: $\\pi$ stays and $r^2$ is differentiated to $2r$, so $\\dfrac{dA}{dr} = 2\\pi r$.",
     "That is the area $A(r)$ itself, not its derivative with respect to $r$.",
     "That is an antiderivative (integral) of the area, not the derivative."
    ]
   },
   {
    "question": "You know $\\dfrac{dr}{dt}$ (how the radius changes with time) and want $\\dfrac{dA}{dt}$ (how the area changes). Which relation do you use?",
    "choices": [
     "$\\dfrac{dA}{dt} = \\dfrac{dr}{dt}\\cdot \\dfrac{dt}{dr}$",
     "$\\dfrac{dA}{dt} = \\dfrac{dA}{dr}\\cdot \\dfrac{dr}{dt}$",
     "$\\dfrac{dA}{dt} = \\dfrac{dr}{dA}\\cdot \\dfrac{dr}{dt}$",
     "$\\dfrac{dA}{dt} = \\dfrac{dA}{dr} + \\dfrac{dr}{dt}$"
    ],
    "correct": 1,
    "why": [
     "Here $dr$ cancels against $dr$ to give $1$; that does not give the link to the area.",
     "That is right: the chain rule links the area to the time via the radius, and $dr$ cancels.",
     "The first factor should be $\\dfrac{dA}{dr}$, not $\\dfrac{dr}{dA}$, otherwise the cancelling of $dr$ does not work.",
     "The chain rule is a product of the two derivatives, not a sum."
    ]
   },
   {
    "question": "In the balloon example gas flows in at $6$ litres/minute. How is that written in cubic decimetres?",
    "choices": [
     "$6\\ \\mathrm{dm^3/min}$",
     "$6\\ \\mathrm{cm^3/min}$",
     "$0.6\\ \\mathrm{dm^3/min}$",
     "$60\\ \\mathrm{dm^3/min}$"
    ],
    "correct": 0,
    "why": [
     "Exactly: $1$ litre is by definition $1\\ \\mathrm{dm^3}$, so $6$ litres/minute is $6\\ \\mathrm{dm^3/min}$.",
     "$1$ litre is $1000\\ \\mathrm{cm^3}$, not $1\\ \\mathrm{cm^3}$; the number $6$ would not be right.",
     "The litre value should not be divided; $1$ litre is $1\\ \\mathrm{dm^3}$, so $6\\ \\mathrm{dm^3/min}$.",
     "No conversion with the factor $10$ is needed: $1$ litre is exactly $1\\ \\mathrm{dm^3}$."
    ]
   },
   {
    "question": "The volume of a sphere is $V(r) = \\dfrac{4\\pi r^3}{3}$. What is $\\dfrac{dV}{dr}$?",
    "choices": [
     "$\\dfrac{4\\pi r^2}{3}$",
     "$\\dfrac{4\\pi r^4}{12}$",
     "$4\\pi r^2$",
     "$12\\pi r^2$"
    ],
    "correct": 2,
    "why": [
     "The 3 in the denominator cancels against the 3 from the derivative of $r^3$, so the denominator disappears.",
     "That is an antiderivative, not the derivative: the exponent should decrease, not increase.",
     "That is right: $r^3$ is differentiated to $3r^2$, and $\\dfrac{4\\pi\\cdot 3r^2}{3} = 4\\pi r^2$.",
     "You should not multiply $4$ and $3$ together; the 3s cancel and $4\\pi r^2$ remains."
    ]
   }
  ]
 },
 "ma4-2.5": {
  "kalla": "fd13742669",
  "data": [
   {
    "question": "What is the derivative of $f(x) = \\sin x$ (angle in radians)?",
    "choices": [
     "$-\\sin x$",
     "$-\\cos x$",
     "$\\sin x$",
     "$\\cos x$"
    ],
    "correct": 3,
    "why": [
     "That is the derivative of $\\cos x$, not of $\\sin x$.",
     "Wrong sign: sine is differentiated to $+\\cos x$, not $-\\cos x$.",
     "A function is in general not its own derivative; $\\sin x$ is differentiated to $\\cos x$.",
     "That is right: sine is differentiated to cosine when the angle is measured in radians."
    ]
   },
   {
    "question": "What is the derivative of $f(x) = \\cos x$ (angle in radians)?",
    "choices": [
     "$\\cos x$",
     "$-\\sin x$",
     "$-\\cos x$",
     "$\\sin x$"
    ],
    "correct": 1,
    "why": [
     "That is the derivative of $\\sin x$, not of $\\cos x$.",
     "Exactly: cosine is differentiated to $-\\sin x$; the minus sign is easy to forget.",
     "Wrong function in the answer: cosine is differentiated to $-\\sin x$, not $-\\cos x$.",
     "Almost, but the derivative of cosine has a minus sign: $-\\sin x$."
    ]
   },
   {
    "question": "The rules of differentiation $D(\\sin x) = \\cos x$ and $D(\\cos x) = -\\sin x$ apply when the angle is measured in",
    "choices": [
     "any unit",
     "degrees",
     "gradians (gon)",
     "radians"
    ],
    "correct": 3,
    "why": [
     "The unit matters: only radians give the simple derivative.",
     "If the angle is measured in degrees, the rule of differentiation does not apply.",
     "Gradians are not radians either, so the rule does not apply then.",
     "That is right: the rules only apply with the angle in radians."
    ]
   },
   {
    "question": "Differentiate $f(x) = \\sin 3x$ with the chain rule.",
    "choices": [
     "$f'(x) = -3\\cos 3x$",
     "$f'(x) = 3\\cos 3x$",
     "$f'(x) = \\cos 3x$",
     "$f'(x) = 3\\cos x$"
    ],
    "correct": 1,
    "why": [
     "Wrong sign: sine is differentiated to $+\\cos$, so the result is positive.",
     "That is right: the outer derivative $\\cos 3x$ times the inner derivative $3$ gives $3\\cos 3x$.",
     "The inner derivative $3$ is missing; the chain rule gives the factor $3$.",
     "The inner function is $3x$, so it should say $\\cos 3x$, not $\\cos x$."
    ]
   },
   {
    "question": "Where does the graph $y = \\sin x$ have a horizontal tangent in the interval $0 \\leq x \\leq \\pi$?",
    "choices": [
     "At $x = \\dfrac{\\pi}{2}$, where the derivative $\\cos x = 0$",
     "At $x = \\pi$, where the curve crosses the $x$-axis",
     "At $x = 0$, where the curve starts",
     "At $x = \\dfrac{\\pi}{4}$, where the curve is increasing"
    ],
    "correct": 0,
    "why": [
     "Exactly: the tangent is horizontal where the derivative is zero, and $\\cos x = 0$ at $x = \\dfrac{\\pi}{2}$.",
     "At $x = \\pi$, $\\cos \\pi = -1$, so the tangent slopes steeply downwards, not horizontally.",
     "At $x = 0$, $\\cos 0 = 1$, so the slope is at its greatest, not zero.",
     "At $x = \\dfrac{\\pi}{4}$, $\\cos x \\approx 0.71$, so the curve is increasing and the tangent slopes."
    ]
   }
  ]
 },
 "ma4-2.6": {
  "kalla": "01a9bfdf47",
  "data": [
   {
    "question": "The notation $D\\big(f(x)\\big)$ means the same as what?",
    "choices": [
     "$f'(x)$",
     "The integral of $f(x)$",
     "$f(x)$",
     "A limit of $f(x)$ as $x \\to 0$"
    ],
    "correct": 0,
    "why": [
     "That is right: $D\\big(f(x)\\big)$ is just another way of writing the derivative $f'(x)$, and the expression can be inserted directly.",
     "$D$ denotes differentiation, not integration.",
     "$f(x)$ is the function itself; $D$ means that it is to be differentiated.",
     "$D$ stands for the derivative, not for a limit of the function itself."
    ]
   },
   {
    "question": "What is $D(e^{kx})$?",
    "choices": [
     "$e^{kx}$",
     "$k\\,e^{kx}$",
     "$e^{k}$",
     "$kx\\,e^{kx}$"
    ],
    "correct": 1,
    "why": [
     "That only applies when $k = 1$; for $e^{kx}$ the factor $k$ is added by the chain rule.",
     "Exactly: the exponential function with base $e$ is differentiated to itself times the inner derivative of the exponent, $k$.",
     "The variable $x$ does not disappear when an exponential function is differentiated.",
     "You multiply by the inner derivative $k$, not by the whole exponent $kx$."
    ]
   },
   {
    "question": "What is $D(a^x)$?",
    "choices": [
     "$x\\,a^{x-1}$",
     "$a^x$",
     "$\\dfrac{a^x}{\\ln a}$",
     "$\\ln a\\cdot a^x$"
    ],
    "correct": 3,
    "why": [
     "The power rule for $x^n$ applies when the base is the variable. Here it is the exponent that is the variable, so it is an exponential function.",
     "That is only true for base $e$, where $\\ln e = 1$; for another base $a$ the factor $\\ln a$ is added.",
     "The factor $\\ln a$ should be multiplied, not divided.",
     "That is right: a general exponential function $a^x$ is differentiated to $\\ln a\\cdot a^x$."
    ]
   },
   {
    "question": "When you differentiate $\\ln t^4$ with respect to $t$ you see it as a composite function. What is the right first step?",
    "choices": [
     "Rewrite as $4\\ln t$ directly: it is always allowed",
     "The derivative is $\\dfrac{1}{t^4}$, since $D(\\ln x) = \\dfrac{1}{x}$",
     "The derivative is $4t^3$, the derivative of the inner function",
     "The outer $\\ln z$ is differentiated to $\\dfrac{1}{t^4}$, then multiplied by the inner derivative $4t^3$"
    ],
    "correct": 3,
    "why": [
     "The rewriting $\\ln t^4 = 4\\ln t$ does give the same answer, $\\dfrac{4}{t}$, but it only holds for $t > 0$ and is not \"always allowed\".",
     "The inner derivative $4t^3$ has been forgotten; $\\dfrac{1}{t^4}$ on its own is wrong.",
     "That is only the inner derivative; the derivative of the outer function is missing.",
     "Exactly: the chain rule gives $\\dfrac{1}{t^4}\\cdot 4t^3 = \\dfrac{4}{t}$."
    ]
   },
   {
    "question": "What is $\\dfrac{d}{dx}\\ln(3x - 4)^2$, simplified as far as possible?",
    "choices": [
     "$\\dfrac{6(3x - 4)}{(3x - 4)^2}$",
     "$\\dfrac{1}{(3x - 4)^2}$",
     "$\\dfrac{2}{3x - 4}$",
     "$\\dfrac{6}{3x - 4}$"
    ],
    "correct": 3,
    "why": [
     "The right expression but not simplified: a factor $(3x - 4)$ can be cancelled.",
     "Both the inner derivative $2(3x - 4)$ and the factor $3$ are missing here.",
     "The factor $3$ (the innermost inner derivative) is missing; $2\\cdot 3 = 6$ in the numerator.",
     "That is right: the chain rule in two steps gives $\\dfrac{1}{(3x - 4)^2}\\cdot 2(3x - 4)\\cdot 3$, which simplifies to $\\dfrac{6}{3x - 4}$."
    ]
   }
  ]
 },
 "ma4-2.7": {
  "kalla": "fbf05e1fb8",
  "data": [
   {
    "question": "If $y = f(x)\\cdot g(x)$, which expression is the derivative $y'$?",
    "choices": [
     "$f'(x)\\,g(x) - f(x)\\,g'(x)$",
     "$f'(x)\\,g'(x)$",
     "$f(x)\\,g(x)$",
     "$f'(x)\\,g(x) + f(x)\\,g'(x)$"
    ],
    "correct": 3,
    "why": [
     "That is the numerator of the quotient rule, not the product rule; the product rule has a plus sign.",
     "Multiplying the derivatives of the factors (\"factor by factor\") gives the wrong answer: that is exactly what the product rule corrects.",
     "That is the original function $y$, not its derivative.",
     "That is right: the product rule differentiates one factor at a time and adds the two contributions."
    ]
   },
   {
    "question": "Is the derivative of a product equal to the product of the derivatives of the factors?",
    "choices": [
     "Yes, the derivative of a product is always the product of the derivatives",
     "No: you have to use the product rule $y' = f'g + fg'$",
     "Yes, but only if one factor is a constant",
     "Yes, but only if both factors are power functions"
    ],
    "correct": 1,
    "why": [
     "The counterexample $y = 2x^3\\cdot 5x^2$ shows that it is not true; the product rule is needed.",
     "Exactly: test $y = 2x^3\\cdot 5x^2$. \"Factor by factor\" gives $60x^3$, but the right answer is $50x^4$.",
     "If one factor is a constant $c$, the product rule gives $c\\cdot f'$, while the product of the derivatives becomes $0$: so they are not equal.",
     "The counterexample above also applies to two power functions: the product rule is always needed."
    ]
   },
   {
    "question": "If $y = \\dfrac{f(x)}{g(x)}$, which expression is the quotient rule?",
    "choices": [
     "$\\dfrac{f(x)\\,g'(x) - f'(x)\\,g(x)}{\\bigl(g(x)\\bigr)^2}$",
     "$\\dfrac{f'(x)\\,g(x) + f(x)\\,g'(x)}{\\bigl(g(x)\\bigr)^2}$",
     "$\\dfrac{f'(x)}{g'(x)}$",
     "$\\dfrac{f'(x)\\,g(x) - f(x)\\,g'(x)}{\\bigl(g(x)\\bigr)^2}$"
    ],
    "correct": 3,
    "why": [
     "The terms in the numerator are in the wrong order: it should be $f'g$ minus $fg'$, not the other way round.",
     "The quotient rule has a minus sign in the numerator, not a plus sign (that is the product rule).",
     "You do not differentiate the numerator and denominator separately; the quotient rule mixes $f$, $g$ and their derivatives.",
     "That is right: the numerator has a minus sign and the denominator is $g(x)$ squared."
    ]
   },
   {
    "question": "What is the derivative of $\\tan x$?",
    "choices": [
     "$\\dfrac{1}{\\sin^2 x}$",
     "$-\\dfrac{1}{\\cos^2 x}$",
     "$\\dfrac{1}{\\cos^2 x}$",
     "$\\cos^2 x$"
    ],
    "correct": 2,
    "why": [
     "The denominator should be $\\cos^2 x$, not $\\sin^2 x$: the derivation is based on $\\tan x = \\dfrac{\\sin x}{\\cos x}$.",
     "The derivative is positive; no minus sign appears, since $-\\sin x\\cdot(-\\sin x)$ becomes plus.",
     "That is right: the quotient rule on $\\tan x = \\dfrac{\\sin x}{\\cos x}$ gives $\\dfrac{1}{\\cos^2 x}$, which can also be written $1 + \\tan^2 x$.",
     "That is the denominator of the expression, not the whole derivative: the derivative is $\\dfrac{1}{\\cos^2 x}$."
    ]
   },
   {
    "question": "To derive the derivative of $\\tan x$ with the quotient rule, how do you rewrite $\\tan x$?",
    "choices": [
     "$\\dfrac{1}{\\cos x}$",
     "$\\dfrac{\\sin x}{\\cos x}$",
     "$\\sin x\\cdot \\cos x$",
     "$\\dfrac{\\cos x}{\\sin x}$"
    ],
    "correct": 1,
    "why": [
     "That is $\\dfrac{1}{\\cos x}$ (the secant). Its numerator is 1, so $\\dfrac{1}{\\cos x}$ is not $\\tan x$.",
     "That is right: $\\tan x = \\dfrac{\\sin x}{\\cos x}$, a quotient that the quotient rule can be applied to.",
     "Tangent is a quotient, not a product, of sine and cosine.",
     "That is $\\dfrac{1}{\\tan x} = \\cot x$, that is the reciprocal ratio."
    ]
   }
  ]
 },
 "ma4-2.8": {
  "kalla": "57ad670825",
  "data": [
   {
    "question": "You have defined $f$ in GeoGebra. What does the command $f'(a)$ give?",
    "choices": [
     "The value of the derivative at the point $x = a$: the rate of change there",
     "The value of the function $f(a)$",
     "The solution to the equation $f(x) = 0$",
     "The area of the graph up to $x = a$"
    ],
    "correct": 0,
    "why": [
     "That is right: $f'(a)$ is the derivative at the point, that is how fast the function changes at $x = a$.",
     "The value of the function is written $f(a)$ without a prime; the prime stands for the derivative.",
     "A zero is found with Roots or $\\text{NSolve}(f(x) = 0)$, not with $f'(a)$.",
     "Area is calculated with an integral, not with the derivative $f'(a)$."
    ]
   },
   {
    "question": "A quantity is described by $f$. To find where the quantity does not change at all, you solve:",
    "choices": [
     "$f(x) = 1$",
     "$f'(x) = 0$",
     "$f''(x) = 0$",
     "$f(x) = 0$"
    ],
    "correct": 1,
    "why": [
     "$f(x) = 1$ is an arbitrary function value with no link to the change.",
     "Exactly: no change means that the rate of change, that is the derivative, is zero.",
     "A second derivative of zero concerns the bending of the curve (inflection), not where the change stops.",
     "$f(x) = 0$ gives where the quantity itself is zero, not where it stops changing."
    ]
   },
   {
    "question": "GeoGebra gives $N'(4) \\approx -1.7$ for the water level $N$ (metres) of a dam as a function of the time $t$ (months). How is this interpreted?",
    "choices": [
     "The level is $-1.7$ metres at $t = 4$",
     "The level has decreased by $1.7$ metres since the start",
     "The level increases by about $1.7$ metres per month",
     "The level decreases by about $1.7$ metres per month at $t = 4$"
    ],
    "correct": 3,
    "why": [
     "$N'(4)$ is the rate of change, not the level $N(4)$ itself.",
     "The derivative describes the rate at one moment, not the total change since the start.",
     "The sign is negative, so the level decreases: it does not increase.",
     "That is right: the negative value of the derivative is a decreasing rate of change in metres per month."
    ]
   },
   {
    "question": "Which command solves $f'(x) = 0$ numerically in GeoGebra?",
    "choices": [
     "$\\text{NSolve}(f'(x) = 0)$",
     "$\\text{Derivative}(f)$",
     "$f'(0)$",
     "$f(0)$"
    ],
    "correct": 0,
    "why": [
     "Exactly: $\\text{NSolve}$ solves the equation numerically and gives the $x$-value where the derivative is zero.",
     "$\\text{Derivative}(f)$ produces the derivative as a function, but does not solve the equation $f'(x) = 0$.",
     "$f'(0)$ only calculates the value of the derivative at the point $x = 0$; it does not solve any equation.",
     "$f(0)$ gives the function value at the origin, not the solution to $f'(x) = 0$."
    ]
   },
   {
    "question": "What is an advantage of differentiating with digital tools?",
    "choices": [
     "You do not have to interpret what the derivative means",
     "You can differentiate even functions for which you have no rules by hand",
     "The answer is always an exact whole number",
     "The function does not need to be defined first"
    ],
    "correct": 1,
    "why": [
     "The interpretation (sign, unit, context) is still our job: the tool does not do it for us.",
     "That is right: the tool manages the differentiation even when there is no simple rule, for example for $x^{\\sin x}$.",
     "The tool often gives an approximate value with decimals, not always a whole number.",
     "You must first define the function; that is what the tool differentiates from."
    ]
   }
  ]
 },
 "ma4-2.9": {
  "kalla": "dcf810256a",
  "data": [
   {
    "question": "What is meant by an optimisation problem?",
    "choices": [
     "A problem where you draw the graph of a function",
     "A problem where you solve a quadratic equation",
     "A problem where you differentiate a function twice",
     "A problem where you look for the largest or smallest value of a quantity"
    ],
    "correct": 3,
    "why": [
     "A graph can help, but the problem is defined by looking for an extreme value, not by the drawing.",
     "You often solve an equation along the way ($f'(x) = 0$), but that is not what defines an optimisation problem.",
     "The second derivative is a tool in the solution, but the problem itself is about the largest or smallest value.",
     "That is right: optimisation problems (problems of extreme values) are about maximising or minimising a quantity, and are solved with the derivative."
    ]
   },
   {
    "question": "A function has $f'(a) = 0$ and $f''(a) < 0$. What type of point is $x = a$?",
    "choices": [
     "A point of inflection",
     "A local maximum point",
     "A local minimum point",
     "A stationary point of inflection"
    ],
    "correct": 1,
    "why": [
     "At a point of inflection the curve changes the direction in which it bends and $f''$ is zero there; that does not apply when $f''(a) < 0$.",
     "Exactly: a negative second derivative means that the curve bends downwards (a \"sad\" curve), so the peak is a maximum point.",
     "A minimum point requires $f''(a) > 0$ (the curve bends upwards), not $f''(a) < 0$.",
     "A stationary point of inflection occurs when the second derivative is also zero and the curve does not turn. Here $f''(a) \\ne 0$."
    ]
   },
   {
    "question": "At a point where $f'(x) = 0$ the second derivative is positive. How does the curve bend, and which point is it?",
    "choices": [
     "The curve bends downwards (concave): a maximum point",
     "The curve bends upwards (convex): a minimum point",
     "The curve bends upwards (convex): a maximum point",
     "The curve is straight: a stationary point of inflection"
    ],
    "correct": 1,
    "why": [
     "A downward-bending (concave) curve goes with a negative second derivative, not a positive one.",
     "That is right: a positive second derivative gives a \"happy\" (convex) curve that bends upwards, and a point with a horizontal tangent at the bottom becomes a minimum.",
     "A convex (upward-bending) curve gives a minimum point, not a maximum point: the direction is right but the conclusion is wrong.",
     "A straight curve has a second derivative of zero; here it is positive, so the curve bends."
    ]
   },
   {
    "question": "Vanja has 60 m of fencing and builds a rectangular pen against a wall (no fencing along the wall). Let $x$ be the length of each of the two sides that go out from the wall. Which expression describes the area?",
    "choices": [
     "$A(x) = 2x(60 - x)$",
     "$A(x) = 60x$",
     "$A(x) = x(60 - x)$",
     "$A(x) = x(60 - 2x)$"
    ],
    "correct": 3,
    "why": [
     "The factor $2$ in front is wrong; it is the third side that is $60 - 2x$, while the height is $x$.",
     "That does not take into account that the other side varies with $x$: the area is base times height, not just $60x$.",
     "That would apply if only one side had the length $x$; here there are two sides, so $2x$ is used up.",
     "Exactly: the two sides that go out from the wall take $2x$ of the fencing, so the third side becomes $60 - 2x$ and the area $x(60 - 2x)$."
    ]
   },
   {
    "question": "You are looking for the largest value of a function in a closed interval. Which $x$-values must you examine?",
    "choices": [
     "Only points where the second derivative is zero",
     "Only the stationary points, wherever they are",
     "Only the end points of the interval",
     "The end points of the interval and the stationary points that lie within the interval"
    ],
    "correct": 3,
    "why": [
     "The zeros of the second derivative are points of inflection and are not what you compare for the largest value.",
     "Stationary points outside the interval do not count, and the end points may very well give the largest value.",
     "The end points are not enough: a peak inside the interval can lie higher than both end points.",
     "That is right: the largest value can be either at a peak inside the interval or at one of the end points, so both must be compared."
    ]
   }
  ]
 },
 "ma4-2.10": {
  "kalla": "236a3937cc",
  "data": [
   {
    "question": "A digital tool gives the maximum point of a function. What does the point's $y$-coordinate correspond to?",
    "choices": [
     "The $x$-value where the maximum occurs",
     "The largest value of the function",
     "The slope of the function at the point",
     "The zero of the function"
    ],
    "correct": 1,
    "why": [
     "It is the $x$-coordinate that states where the maximum occurs; the $y$-coordinate is the value itself.",
     "That is right: at a maximum point the $y$-coordinate gives the largest value of the function, while the $x$-coordinate tells you where it occurs.",
     "At a maximum point the slope (the derivative) is zero, but the point's $y$-coordinate is the function value, not the slope.",
     "A zero is where the graph crosses the $x$-axis, not where it has its largest value."
    ]
   },
   {
    "question": "How do you find with a digital tool when a quantity is increasing fastest?",
    "choices": [
     "You differentiate the function and look for the largest value of the derivative",
     "You look for the zeros of the function",
     "You look for the largest value of the function",
     "You look for where the function is zero"
    ],
    "correct": 0,
    "why": [
     "Exactly: the fastest increase is the largest value of the rate of change, that is the maximum point of the derivative.",
     "Zeros state where the function is zero, not where it increases most.",
     "The largest value of the function tells you where the quantity is largest, not where it increases fastest.",
     "Where the function is zero has nothing to do with the rate of increase; the increase is measured by the derivative."
    ]
   },
   {
    "question": "A model $K(t)$ only applies for $t \\geq 0$. The tool shows a stationary point at a negative $t$-value. How should it be handled?",
    "choices": [
     "It is used instead of points with positive $t$",
     "It always gives the largest value",
     "It is disregarded, since the model does not apply for $t < 0$",
     "It is always chosen, since it lies furthest to the left"
    ],
    "correct": 2,
    "why": [
     "On the contrary, you should use points within the range of validity $t \\geq 0$, not those outside it.",
     "A stationary point outside the range of validity gives no valid largest value for the problem.",
     "That is right: a digital reading must be interpreted against the range of validity of the model, so stationary points with $t < 0$ are meaningless here.",
     "Its position to the left does not make it relevant; if $t < 0$ it lies outside the range of validity of the model."
    ]
   },
   {
    "question": "GeoGebra gives the stationary points $(2;\\ 15)$ (minimum point) and $(6;\\ 40)$ (maximum point) for a cost $C(x)$. Where is the cost lowest?",
    "choices": [
     "At $x = 15$",
     "At $x = 2$",
     "At $x = 6$",
     "At $x = 40$"
    ],
    "correct": 1,
    "why": [
     "$15$ is the $y$-coordinate of the minimum point (the cost itself), not the $x$-value.",
     "Correct: the lowest cost belongs to the minimum point $(2;\\ 15)$, that is at $x = 2$.",
     "$x = 6$ is the maximum point, where the cost is instead at its highest.",
     "$40$ is the $y$-coordinate of the maximum point, not where the cost is lowest."
    ]
   },
   {
    "question": "What is the rule of thumb for solving an optimisation problem with digital tools?",
    "choices": [
     "Read off where the graph crosses the $y$-axis",
     "Draw the graph of the function to be optimised and read off the stationary points",
     "Draw an arbitrary line and read off its slope",
     "Calculate the function value at a single point"
    ],
    "correct": 1,
    "why": [
     "The intersection with the $y$-axis is the starting value, not the largest or smallest value of the function.",
     "Exactly: you draw the graph of the function you want to optimise and read off its maximum and minimum points.",
     "The slope of an arbitrary line has nothing to do with the extreme values of the function.",
     "A single function value says nothing about where the largest or smallest value is."
    ]
   }
  ]
 },
 "ma4-2.11": {
  "kalla": "43651e4176",
  "data": [
   {
    "question": "In a sign table the derivative goes from $+$ to $-$ at $x = a$. What is the nature of the point?",
    "choices": [
     "A stationary point of inflection",
     "An end point",
     "A local minimum point",
     "A local maximum point"
    ],
    "correct": 3,
    "why": [
     "A stationary point of inflection requires the derivative to be $0$ but keep the same sign on both sides. Here it changes sign.",
     "An end point lies at the edge of the interval, not where the derivative changes sign.",
     "A minimum point arises when the derivative goes the other way, from $-$ to $+$.",
     "That is right: the function is increasing before the point and decreasing after it, so the curve turns down at a peak."
    ]
   },
   {
    "question": "For $f'(x) = e^x(x^2 - 1) = 0$ you say that $e^x = 0$ has no solution. Why?",
    "choices": [
     "Because $e^x$ has no derivative",
     "Because $e^x$ is always negative",
     "Because $e^x$ is only zero when $x = 0$",
     "Because $e^x > 0$ for all $x$"
    ],
    "correct": 3,
    "why": [
     "$e^x$ is differentiable everywhere; that it has no zero is because it is always positive.",
     "On the contrary, $e^x$ is always positive for all real $x$.",
     "$e^0 = 1$, not $0$: $e^x$ never becomes zero for any $x$.",
     "Exactly: the exponential function is always positive, so the factor $e^x$ can never become zero."
    ]
   },
   {
    "question": "Into which function do you substitute the $x$-value to get the $y$-coordinate of a stationary point?",
    "choices": [
     "Into the second derivative $f''(x)$",
     "Into the sign table",
     "Into the original function $f(x)$",
     "Into the derivative $f'(x)$"
    ],
    "correct": 2,
    "why": [
     "The second derivative is used to decide the nature of the point, not to calculate the $y$-coordinate.",
     "The sign table shows where the function increases and decreases, but gives no $y$-values.",
     "That is right: the $y$-coordinate is the value of the function, so we substitute $x$ into $f(x)$.",
     "The derivative gives the slope, which is $0$ at the stationary point, not the $y$-coordinate."
    ]
   },
   {
    "question": "A sign table shows that $f'(x) = 0$ at $x = 0$, but that the derivative is positive both before and after $x = 0$. What type of point is it?",
    "choices": [
     "An end point",
     "A minimum point",
     "A stationary point of inflection",
     "A maximum point"
    ],
    "correct": 2,
    "why": [
     "An end point lies at the edge of the interval, not where the derivative is zero inside the interval.",
     "A minimum point requires the derivative to go from $-$ to $+$.",
     "Exactly: the derivative is zero but does not change sign, so the curve levels out and continues in the same direction.",
     "A maximum point requires the derivative to go from $+$ to $-$."
    ]
   },
   {
    "question": "The zero product method on $e^x(x^2 - 1) = 0$ gives the zeros of the derivative. What are they?",
    "choices": [
     "$x = 0$ and $x = 1$",
     "$x = 0$",
     "$x = -1$, $x = 0$ and $x = 1$",
     "$x = -1$ and $x = 1$"
    ],
    "correct": 3,
    "why": [
     "$x = 0$ is not a zero here: $0^2 - 1 = -1 \\ne 0$.",
     "The factor $x^2 - 1$ is zero at $x = \\pm 1$, not at $x = 0$.",
     "The factor $e^x$ contributes no zero since $e^x > 0$, so $x = 0$ does not belong here.",
     "That is right: $e^x = 0$ has no solution, so only $x^2 - 1 = 0$ gives $x = \\pm 1$."
    ]
   }
  ]
 },
 "ma4-2.12": {
  "kalla": "9ffe482101",
  "data": [
   {
    "question": "What is meant by an asymptote to a curve?",
    "choices": [
     "A line that the curve approaches without reaching it",
     "The point where the curve has its largest value",
     "The slope of the curve at a given point",
     "A line that the curve always crosses at exactly one point"
    ],
    "correct": 0,
    "why": [
     "Exactly: a vertical or horizontal asymptote is a line that the curve approaches as the variable tends to a value or to infinity.",
     "That describes a maximum, not an asymptote.",
     "The slope at a point is the derivative, not an asymptote.",
     "An asymptote is approached but not reached; it does not need to cross the curve at all."
    ]
   },
   {
    "question": "How do you find a vertical asymptote of a rational function?",
    "choices": [
     "Set the numerator equal to 0 and solve the equation",
     "Find the limit as $x \\to \\infty$",
     "Differentiate the function and look for zeros",
     "Set the denominator equal to 0 and solve the equation"
    ],
    "correct": 3,
    "why": [
     "The numerator equal to 0 gives the zeros of the function (where the graph crosses the $x$-axis), not the asymptotes.",
     "The limit as $x \\to \\infty$ gives the horizontal asymptote, not the vertical one.",
     "The zeros of the derivative give stationary points, not asymptotes.",
     "That is right: a vertical asymptote arises where the function is not defined, that is where the denominator is 0."
    ]
   },
   {
    "question": "Where does the function $f(x) = \\dfrac{1}{x - 2} + 1$ have its vertical asymptote?",
    "choices": [
     "$x = 2$",
     "$x = -2$",
     "$x = 1$",
     "$y = 1$"
    ],
    "correct": 0,
    "why": [
     "Correct: the denominator $x - 2$ is 0 when $x = 2$, so that is where the vertical asymptote is.",
     "The denominator $x - 2$ becomes 0 at $x = 2$, not at $x = -2$.",
     "The constant $+1$ affects the horizontal asymptote, not the vertical one; $x = 1$ does not make the denominator 0.",
     "$y = 1$ is the horizontal asymptote, not the vertical one."
    ]
   },
   {
    "question": "What value does the horizontal asymptote of $f(x) = \\dfrac{1}{x - 2} + 1$ have?",
    "choices": [
     "$y = 0$",
     "$y = -2$",
     "$y = 2$",
     "$y = 1$"
    ],
    "correct": 3,
    "why": [
     "The term $\\dfrac{1}{x - 2}$ tends to 0, but the constant term $+1$ remains, so the limit is 1, not 0.",
     "The constant is $+1$, not $-2$, so the asymptote is $y = 1$.",
     "$x = 2$ is the vertical asymptote; the question is about the horizontal one.",
     "Exactly: as $x \\to \\pm\\infty$, $\\dfrac{1}{x - 2}$ tends to 0, so $f(x) \\to 0 + 1 = 1$."
    ]
   },
   {
    "question": "How do you find the horizontal asymptote of a rational function?",
    "choices": [
     "Find the limit of the function as $x \\to \\infty$ or $x \\to -\\infty$",
     "Set the whole function equal to 0",
     "Calculate the function value at $x = 0$",
     "Set the denominator equal to 0 and solve the equation"
    ],
    "correct": 0,
    "why": [
     "That is right: the horizontal asymptote $y = m$ is the value the function approaches as $x$ tends to $\\pm\\infty$.",
     "The function equal to 0 gives the zeros (intersections with the $x$-axis), not the asymptote.",
     "The function value at $x = 0$ gives the intersection with the $y$-axis, not the horizontal asymptote.",
     "The denominator equal to 0 gives the vertical asymptote, not the horizontal one."
    ]
   }
  ]
 },
 "ma4-2.13": {
  "kalla": "e98933f99e",
  "data": [
   {
    "question": "What characterises an oblique asymptote?",
    "choices": [
     "It is parallel to the $y$-axis",
     "It is always horizontal",
     "It is a straight line that is neither vertical nor horizontal",
     "It is always vertical"
    ],
    "correct": 2,
    "why": [
     "A line parallel to the $y$-axis is vertical: the opposite of oblique.",
     "A horizontal asymptote is a separate type; an oblique asymptote has a non-zero slope $k$.",
     "An oblique asymptote slopes: it is not parallel to either coordinate axis, unlike vertical ($x = a$) and horizontal ($y = c$) asymptotes.",
     "A vertical asymptote is a separate type; an oblique asymptote slopes and crosses the $x$-axis at an angle."
    ]
   },
   {
    "question": "For which rational functions does an oblique asymptote arise?",
    "choices": [
     "When the degrees of the numerator and the denominator are equal",
     "When the degree of the numerator is exactly one higher than the degree of the denominator",
     "When the degree of the numerator is lower than the degree of the denominator",
     "For all rational functions"
    ],
    "correct": 1,
    "why": [
     "Equal degree gives a horizontal asymptote instead, since the quotient then becomes a constant.",
     "If the numerator is one degree higher, the whole-number part becomes a linear expression $kx + m$ and the remainder tends to $0$: exactly what an oblique asymptote requires.",
     "If the numerator has a lower degree, the function tends to $0$ and gets a horizontal asymptote $y = 0$, not an oblique one.",
     "Many rational functions only have vertical or horizontal asymptotes; the degrees must match for an oblique one to exist."
    ]
   },
   {
    "question": "How do you find the oblique asymptote of $f(x)$?",
    "choices": [
     "Set $f(x) = 0$ and solve the equation",
     "Rewrite $f(x) = kx + m + R(x)$ with $R(x) \\to 0$; the asymptote is $y = kx + m$",
     "Differentiate $f(x)$ and set the derivative equal to $0$",
     "Calculate $f(0)$"
    ],
    "correct": 1,
    "why": [
     "Solving $f(x) = 0$ gives zeros (intersections with the $x$-axis), not the asymptote.",
     "Exactly: the whole-number part $kx + m$ is the straight line the curve approaches, while the remainder term $R(x)$ disappears for large $|x|$.",
     "The zeros of the derivative give stationary points, not the oblique asymptote.",
     "$f(0)$ only gives a single function value (the intersection with the $y$-axis), not an asymptote."
    ]
   },
   {
    "question": "What is the oblique asymptote of $y = 2x + 1 + \\dfrac{4}{x - 3}$?",
    "choices": [
     "$y = 2x + 5$",
     "$y = 2x - 3$",
     "$y = \\dfrac{4}{x-3}$",
     "$y = 2x + 1$"
    ],
    "correct": 3,
    "why": [
     "You should not add in the remainder term; the constant of the asymptote is $m = 1$.",
     "The denominator $x - 3$ gives a vertical asymptote $x = 3$, but the $m$-value of the oblique asymptote is $+1$, not $-3$.",
     "It is the remainder term that disappears: it is not itself the asymptote.",
     "The expression has the form $kx + m + R(x)$; the remainder term $\\dfrac{4}{x-3} \\to 0$, so the line $y = 2x + 1$ remains."
    ]
   },
   {
    "question": "In the rewriting $f(x) = kx + m + R(x)$, what applies to the remainder term $R(x)$?",
    "choices": [
     "$R(x) \\to \\infty$ as $x \\to \\pm\\infty$",
     "$R(x)$ is the same thing as $kx + m$",
     "$R(x)$ is a constant",
     "$R(x) \\to 0$ as $x \\to \\pm\\infty$"
    ],
    "correct": 3,
    "why": [
     "If the remainder term grew, the curve would never approach the line and it would not be an asymptote.",
     "$kx + m$ is the straight line (the asymptote); $R(x)$ is the deviation that disappears.",
     "A remainder term such as $\\dfrac{4}{x-3}$ is not constant: it decreases towards $0$ as $x$ grows.",
     "Exactly: it is precisely because $R(x)$ dies away that the curve merges with the line $y = kx + m$ far out."
    ]
   }
  ]
 },
 "ma4-2.14": {
  "kalla": "9537ce82ea",
  "data": [
   {
    "question": "What do you do FIRST when you sketch the graph of a rational function using the method?",
    "choices": [
     "Find all the asymptotes and draw them dashed in a coordinate system",
     "Calculate the zeros of the function",
     "Make a sign table for the sign of the derivative",
     "Plot the stationary points"
    ],
    "correct": 0,
    "why": [
     "That is right: step 1 is to find all the asymptotes and draw them dashed, then the sign table follows in step 2.",
     "Zeros are not part of the two steps of the method; it is the asymptotes you start with.",
     "The sign table belongs to step 2; the asymptotes are found first so that the sketch gets the right frame.",
     "The stationary points come in step 2, after the asymptotes have already been drawn in."
    ]
   },
   {
    "question": "Apart from the $x$-values where $f'(x) = 0$, which $x$-values should also be entered in the sign table for a rational function?",
    "choices": [
     "The $x$-values where the function is largest",
     "The $x$-values where the graph crosses the $y$-axis",
     "The $x$-values where the function is not defined",
     "All integers between the asymptotes"
    ],
    "correct": 2,
    "why": [
     "Where the function is largest is a consequence you read off the table, not an extra $x$-value you enter in advance.",
     "A rational function of this type does not always cross the $y$-axis: it is often undefined there. It is precisely the undefined points that should be included.",
     "Exactly: where the function is not defined (for example at a vertical asymptote) the sign can change, so those points must be included.",
     "You include the undefined points and the zeros of the derivative, not all integers."
    ]
   },
   {
    "question": "What vertical asymptote does $f(x) = \\dfrac{x^2 + 1}{x}$ have?",
    "choices": [
     "$x = 1$",
     "$y = 0$",
     "No vertical asymptote",
     "$x = 0$"
    ],
    "correct": 3,
    "why": [
     "The denominator is $x$, not $x - 1$, so the asymptote is at $x = 0$ and not $x = 1$.",
     "$y = 0$ would be a horizontal asymptote; a vertical asymptote is written as $x = \\text{constant}$.",
     "The denominator becomes zero at $x = 0$, so there is a vertical asymptote there.",
     "That is right: the expression cannot be simplified, and the denominator $x$ becomes zero when $x = 0$."
    ]
   },
   {
    "question": "What oblique asymptote does $f(x) = \\dfrac{x^2 + 1}{x}$ have?",
    "choices": [
     "$y = x$",
     "$y = x + 1$",
     "No oblique asymptote",
     "$y = 0$"
    ],
    "correct": 0,
    "why": [
     "That is right: $\\dfrac{x^2 + 1}{x} = x + \\dfrac{1}{x}$, and the remainder term $\\dfrac{1}{x}$ tends to $0$, so $y = x$ remains.",
     "The term $\\dfrac{1}{x}$ tends to $0$ (not to $1$), so it becomes $y = x$, not $y = x + 1$.",
     "After the split $x + \\dfrac{1}{x}$ an oblique asymptote is clearly visible: $y = x$.",
     "$y = 0$ would be a horizontal asymptote; here there is no horizontal asymptote since the expression grows without limit."
    ]
   },
   {
    "question": "In the sign table $f'(x) > 0$ to the left of $x = 1$ and $f'(x) > 0$ to the right as well, but $f'(1) = 0$. What kind of point does the graph have there?",
    "choices": [
     "A stationary point of inflection",
     "A minimum point",
     "A vertical asymptote",
     "A maximum point"
    ],
    "correct": 0,
    "why": [
     "That is right: the derivative is zero but does not change sign, so the slope levels out and continues in the same direction: a stationary point of inflection.",
     "A minimum point requires the derivative to change from $-$ to $+$; here it is positive on both sides.",
     "An asymptote is about where the function is not defined, not about the derivative being zero.",
     "A maximum point requires the derivative to change from $+$ to $-$; here it is positive on both sides."
    ]
   }
  ]
 },
 "ma4-3.1": {
  "kalla": "ac09e6b59d",
  "data": [
   {
    "question": "What is meant by $F$ being an antiderivative of $f$?",
    "choices": [
     "That $f'(x) = F(x)$",
     "That $F(x)$ and $f(x)$ have the same graph",
     "That $F'(x) = f(x)$",
     "That $F(x) = f(x)$ for all $x$"
    ],
    "correct": 2,
    "why": [
     "It is the other way round: it is $F$ that is differentiated to give $f$, not $f$ that is differentiated to give $F$.",
     "The graphs are different; the link between $F$ and $f$ is about the derivative, not about the same graph.",
     "That is right: an antiderivative is a function whose derivative is $f$, so finding it is the reverse operation of differentiating.",
     "An antiderivative is in general not equal to $f$ itself; it is its derivative that should be $f$."
    ]
   },
   {
    "question": "Which is an antiderivative of $f(x) = \\cos x$?",
    "choices": [
     "$\\sin x$",
     "$-\\cos x$",
     "$-\\sin x$",
     "$\\cos x$"
    ],
    "correct": 0,
    "why": [
     "Exactly: since $D(\\sin x) = \\cos x$, $\\sin x$ is an antiderivative of $\\cos x$.",
     "$-\\cos x$ is an antiderivative of $\\sin x$, not of $\\cos x$.",
     "Since $D(-\\sin x) = -\\cos x$, $-\\sin x$ is an antiderivative of $-\\cos x$, not of $\\cos x$.",
     "$\\cos x$ is the function itself; its derivative is $-\\sin x$, not $\\cos x$."
    ]
   },
   {
    "question": "Why do you add a constant $C$ when you state all the antiderivatives?",
    "choices": [
     "Because $C$ states where the graph crosses the $x$-axis",
     "Because a constant disappears when differentiated, so $F(x)$ and $F(x) + C$ have the same derivative",
     "To make the function continuous",
     "Because $C$ must always be zero"
    ],
    "correct": 1,
    "why": [
     "$C$ shifts the graph vertically but does not state where it crosses the $x$-axis.",
     "That is right: the derivative of a constant is $0$, so $F(x) + C$ has the same derivative $f(x)$ for every value of $C$; all these functions are antiderivatives of $f$.",
     "Continuity does not depend on $C$; the term is added to capture all functions with the same derivative.",
     "$C$ can stand for any number: the point is precisely that it is not fixed at zero."
    ]
   },
   {
    "question": "Which is an antiderivative of $f(x) = \\dfrac{1}{x}$ (for $x > 0$)?",
    "choices": [
     "$\\ln x$",
     "$x\\ln x$",
     "$-\\dfrac{1}{x^2}$",
     "$\\dfrac{1}{x^2}$"
    ],
    "correct": 0,
    "why": [
     "Exactly: the new rule of differentiation $D(\\ln x) = \\dfrac{1}{x}$ gives that $\\ln x$ is an antiderivative of $\\dfrac{1}{x}$.",
     "$x\\ln x$ has the derivative $\\ln x + 1$, not $\\dfrac{1}{x}$.",
     "$-\\dfrac{1}{x^2}$ is the derivative of $\\dfrac{1}{x}$, not an antiderivative of $\\dfrac{1}{x}$.",
     "The power rule does not work here because the exponent $-1$ gives division by zero; $\\dfrac{1}{x}$ is the exception that gives a logarithm."
    ]
   },
   {
    "question": "Which is an antiderivative of $f(x) = e^{3x}$?",
    "choices": [
     "$\\dfrac{e^{3x}}{3x}$",
     "$\\dfrac{e^{3x}}{3}$",
     "$3e^{3x}$",
     "$e^{3x}$"
    ],
    "correct": 1,
    "why": [
     "You divide by the derivative of the exponent ($3$), not by $3x$.",
     "That is right: an exponential function is copied and divided by the derivative of the exponent, and $D(3x) = 3$.",
     "$3e^{3x}$ is instead the derivative of $e^{3x}$, not an antiderivative.",
     "$e^{3x}$ is the function itself; its derivative is $3e^{3x}$, so it is not its own antiderivative."
    ]
   }
  ]
 },
 "ma4-3.2": {
  "kalla": "9b17a45f17",
  "data": [
   {
    "question": "What does $\\displaystyle\\int_a^b f(x)\\,dx$ correspond to graphically when $f(x) > 0$?",
    "choices": [
     "The area between the graph and the $x$-axis from $x = a$ to $x = b$",
     "The difference $f(b) - f(a)$",
     "The slope of the graph between $x = a$ and $x = b$",
     "The length of the curve between $x = a$ and $x = b$"
    ],
    "correct": 0,
    "why": [
     "That is right: the integral is the area between the curve and the $x$-axis, bounded by the limits $a$ and $b$.",
     "$f(b) - f(a)$ is the difference in function value, not the area under the graph.",
     "Slope goes with the derivative, not with the integral.",
     "The length of the curve is a different quantity; the integral gives area, not arc length."
    ]
   },
   {
    "question": "The fundamental theorem of calculus says that $\\displaystyle\\int_a^b f(x)\\,dx$ is equal to:",
    "choices": [
     "$F(b) - F(a)$, where $F$ is an antiderivative of $f$",
     "$f'(b) - f'(a)$",
     "$f(b) - f(a)$",
     "$F(a) - F(b)$, where $F$ is an antiderivative of $f$"
    ],
    "correct": 0,
    "why": [
     "Exactly: you take an antiderivative $F$ and calculate $F(b) - F(a)$.",
     "The fundamental theorem uses an antiderivative, not the derivative of $f$.",
     "You substitute the limits into the antiderivative $F$, not into $f$ itself.",
     "The order is wrong: it should be the upper limit minus the lower, $F(b) - F(a)$."
    ]
   },
   {
    "question": "The graph of $y = f(x)$ lies entirely below the $x$-axis in the interval $a \\le x \\le b$. What applies to the value of the integral?",
    "choices": [
     "It is positive",
     "It is always zero",
     "It is negative",
     "It is equal to the area"
    ],
    "correct": 2,
    "why": [
     "You get a positive value when the graph lies above the axis, not below.",
     "The integral only becomes zero if equal areas lie above and below the axis, which is not the case here.",
     "That is right: an integral becomes negative when the graph lies below the $x$-axis.",
     "Area is always positive; here the integral is negative, so the area is the opposite of the integral."
    ]
   },
   {
    "question": "A curve lies both above and below the $x$-axis in the interval. How do you calculate the total area between the curve and the $x$-axis?",
    "choices": [
     "You calculate the integral over the whole interval in one go",
     "You only take the part above the $x$-axis",
     "You multiply the two partial integrals",
     "You divide into subintervals and change the sign of the parts where the graph lies below the axis"
    ],
    "correct": 3,
    "why": [
     "In one go the parts can cancel each other, so that the area is underestimated or becomes zero.",
     "The part below the axis also contributes to the area and must not be skipped.",
     "The areas are added, not multiplied.",
     "Exactly: each part below the axis gives a negative integral, whose sign must be changed to give a positive area."
    ]
   },
   {
    "question": "Calculate $\\displaystyle\\int_0^2 3x^2\\,dx$.",
    "choices": [
     "$12$",
     "$4$",
     "$8$",
     "$6$"
    ],
    "correct": 2,
    "why": [
     "That looks like $2 \\cdot 3 \\cdot 2$; but the right antiderivative is $x^3$, which gives $8$.",
     "That is $2^2$; but you should substitute into $x^3$, which gives $2^3 = 8$.",
     "That is right: $\\left[x^3\\right]_0^2 = 8 - 0 = 8$.",
     "An antiderivative of $3x^2$ is $x^3$, not $3x$; substitute the limits into $x^3$."
    ]
   }
  ]
 },
 "ma4-3.3": {
  "kalla": "d2ed1d1984",
  "data": [
   {
    "question": "Which expression is equal to $\\int_a^b k\\cdot f(x)\\,dx$ if $k$ is a constant?",
    "choices": [
     "$k\\cdot \\int_a^b f(x)\\,dx + k$",
     "$\\int_a^b f(x)\\,dx + k$",
     "$\\dfrac{1}{k}\\int_a^b f(x)\\,dx$",
     "$k\\cdot \\int_a^b f(x)\\,dx$"
    ],
    "correct": 3,
    "why": [
     "The factor is taken out as it is; no extra term is added.",
     "The constant multiplies the function; it is not added to the integral.",
     "The factor is taken out unchanged, not inverted ($1$ divided by $k$).",
     "That is right: a constant factor can be taken out and placed in front of the integral sign."
    ]
   },
   {
    "question": "How is $\\int_a^b \\bigl(f(x) + g(x)\\bigr)\\,dx$ calculated?",
    "choices": [
     "A sum of functions cannot be integrated",
     "$\\int_a^b f(x)\\,dx + \\int_a^b g(x)\\,dx$",
     "$\\int_a^b f(x)\\cdot g(x)\\,dx$",
     "$\\int_a^b f(x)\\,dx \\cdot \\int_a^b g(x)\\,dx$"
    ],
    "correct": 1,
    "why": [
     "On the contrary: that is exactly what the rules allow us to do, split up the sum.",
     "Exactly: the integral of a sum can be calculated term by term.",
     "Integrating $f + g$ is not the same as integrating the product $f\\cdot g$.",
     "The rule applies to addition term by term, not to a product of the two integrals."
    ]
   },
   {
    "question": "What applies if you swap the limits of integration, $\\int_a^b f(x)\\,dx$ compared with $\\int_b^a f(x)\\,dx$?",
    "choices": [
     "The value is inverted (becomes $1$ divided by the value)",
     "Nothing: the value is the same",
     "The value doubles",
     "The integral changes sign: $\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx$"
    ],
    "correct": 3,
    "why": [
     "It is the sign that changes; the value is not inverted.",
     "The order of the limits matters; it decides the sign of the integral.",
     "Swapping the limits affects the sign, not the size: the value does not double.",
     "That is right: if you swap the limits, the integral changes sign."
    ]
   },
   {
    "question": "When can $\\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx$ be written as a single integral?",
    "choices": [
     "Always, regardless of functions and limits",
     "Never: two integrals cannot be joined",
     "When it is the same function and the limits connect: the sum becomes $\\int_a^c f(x)\\,dx$",
     "Only if $f(x)$ is a constant function"
    ],
    "correct": 2,
    "why": [
     "It is required that the function is the same and that the limits connect.",
     "They can be joined precisely when the function is the same and the limits connect.",
     "Exactly: with the same function and connecting limits ($a \\to b \\to c$) the subintervals are joined.",
     "The additivity rule applies to any function, not just constants."
    ]
   },
   {
    "question": "May you take the factor out in front of the integral sign in $\\int_a^b x\\cdot f(x)\\,dx$?",
    "choices": [
     "Yes: $x\\int_a^b f(x)\\,dx$",
     "Yes: the factor disappears and $\\int_a^b f(x)\\,dx$ remains",
     "Yes, but only if $a$ and $b$ are positive",
     "No: $x$ is not a constant, so it may not be taken out"
    ],
    "correct": 3,
    "why": [
     "No: $x$ changes with the variable of integration and cannot be placed outside.",
     "The factor does not disappear: $x$ remains part of the expression to be integrated.",
     "The signs of the limits do not help; $x$ is still not a constant.",
     "That is right: only a constant factor may be taken out, and $x$ varies."
    ]
   }
  ]
 },
 "ma4-3.4": {
  "kalla": "6558f4e437",
  "data": [
   {
    "question": "Which expression gives the area between two curves where $f(x)$ lies above $g(x)$?",
    "choices": [
     "$A = \\displaystyle\\int_a^b \\big(f(x) + g(x)\\big)\\,dx$",
     "$A = \\displaystyle\\int_a^b \\big(g(x) - f(x)\\big)\\,dx$",
     "$A = \\displaystyle\\int_a^b f(x)\\,g(x)\\,dx$",
     "$A = \\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$"
    ],
    "correct": 3,
    "why": [
     "The sum of the functions does not belong here; it is the difference $f(x) - g(x)$ that gives the area.",
     "That gives the opposite of the area (a negative value), since the upper and lower functions have swapped places.",
     "You integrate the difference between the curves, not their product.",
     "That is right: you integrate the upper function minus the lower one."
    ]
   },
   {
    "question": "In the formula $A = \\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$, which function is $f(x)$?",
    "choices": [
     "The lower curve in the interval",
     "The curve that has the greatest slope",
     "The upper curve in the interval",
     "The curve that crosses the $x$-axis"
    ],
    "correct": 2,
    "why": [
     "The lower curve is $g(x)$; if you take the upper ($f$) minus the lower ($g$), the integrand is positive.",
     "Which curve is the upper one is decided by its position in the interval, not by its slope.",
     "Exactly: $f(x)$ is the upper function and $g(x)$ the lower one.",
     "Where the curve crosses the $x$-axis does not matter for which one is upper and which is lower."
    ]
   },
   {
    "question": "The region is bounded by two curves but the limits of the interval are not given. How do you find the limits of integration?",
    "choices": [
     "Set the function expressions equal and solve the equation",
     "Differentiate the functions and look for zeros",
     "Choose $a = 0$ and $b = 1$ as standard",
     "Set both functions equal to zero"
    ],
    "correct": 0,
    "why": [
     "That is right: the $x$-coordinates of the points of intersection become the limits $a$ and $b$.",
     "The zeros of the derivative give stationary points, not the points of intersection of the curves.",
     "The limits are decided by where the curves actually meet, not by arbitrary standard values.",
     "The zeros tell you where the curves cross the $x$-axis, not where they cross each other."
    ]
   },
   {
    "question": "The region is bounded by three lines, and the upper curve changes at a point inside the interval. How do you calculate the area?",
    "choices": [
     "Divide the area into several integrals, one for each subinterval",
     "Calculate only one part and double the answer",
     "Use the derivative instead of the integral",
     "Integrate over the whole interval with the same two functions"
    ],
    "correct": 0,
    "why": [
     "Exactly: where the upper function changes you must split up and add the partial integrals.",
     "The parts are in general of different sizes, so doubling one gives the wrong area except in the case of symmetry.",
     "Area is calculated with an integral, not with a derivative.",
     "With the same two functions over the whole interval you calculate wrongly where the upper curve has changed."
    ]
   },
   {
    "question": "You calculate $\\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx$ and get a negative value. What is the most likely explanation?",
    "choices": [
     "The area really is negative",
     "You have mixed up the upper and lower functions",
     "The limits of integration must be wrong",
     "You cannot calculate the area between curves with an integral"
    ],
    "correct": 1,
    "why": [
     "An area is always positive; a negative value is due to the order of the functions.",
     "That is right: if $f$ is actually the lower curve, $f - g$ is negative; swap the functions.",
     "Wrong limits give the wrong size, but the sign is controlled by which function is the upper one.",
     "The integral of the upper minus the lower function gives exactly the area: the method works."
    ]
   }
  ]
 },
 "ma4-3.5": {
  "kalla": "7aec076e5f",
  "data": [
   {
    "question": "A graph shows a velocity (m/s) against time (s). Which quantity, and in which unit, does the area under the graph give?",
    "choices": [
     "Velocity, in m/s",
     "Acceleration, in $\\mathrm{m/s^2}$",
     "Distance, in metres",
     "Time, in seconds"
    ],
    "correct": 2,
    "why": [
     "The velocity is what the graph already shows on the $y$-axis; the area under the graph is a different quantity.",
     "Acceleration is found from the change in velocity (derivative/slope), not from the area under the velocity graph.",
     "Exactly: the unit of the integral is the product of the units on the axes, $\\dfrac{\\mathrm{m}}{\\mathrm{s}} \\cdot \\mathrm{s} = \\mathrm{m}$, so a distance.",
     "The time is on the $x$-axis; the area combines the units of both axes and does not give time alone."
    ]
   },
   {
    "question": "What does the integral of the acceleration $a(t)$ over time give?",
    "choices": [
     "The change in velocity $\\Delta v$",
     "The force on the body",
     "The acceleration at the final time",
     "The change in position $\\Delta s$"
    ],
    "correct": 0,
    "why": [
     "That is right: acceleration is change in velocity per unit of time, so the integral over time gives $\\Delta v = \\int_{t_1}^{t_2} a(t)\\,dt$.",
     "The force is linked to the acceleration through $F = ma$, but the integral of the acceleration is a change in velocity, not a force.",
     "Integrating accumulates contributions over the whole time interval; it does not give a single final value of the acceleration.",
     "The change in position $\\Delta s$ is found by integrating the velocity $v(t)$, not the acceleration."
    ]
   },
   {
    "question": "The power in an appliance is given by $P(t)$. Which quantity does the integral $\\int_{t_1}^{t_2} P(t)\\,dt$ give?",
    "choices": [
     "Power",
     "Voltage",
     "Current",
     "Energy"
    ],
    "correct": 3,
    "why": [
     "The power is what we integrate; the result is a different quantity from the power itself.",
     "Voltage is not what builds up when you add up power over time.",
     "Current is not the result of integrating power over time.",
     "Exactly: power is energy per unit of time, so the integral of the power over time gives the energy (unit $\\mathrm{W}\\cdot \\mathrm{s} = \\mathrm{J}$)."
    ]
   },
   {
    "question": "Which quantity do you get when you integrate a rate of change over the variable it changes with?",
    "choices": [
     "The slope of the rate of change",
     "A mean of the rate of change",
     "Always an area in square metres",
     "The accumulated (total) quantity"
    ],
    "correct": 3,
    "why": [
     "The slope is found by differentiating, not integrating.",
     "The integral gives the total accumulated quantity, not a mean.",
     "The unit depends on the units of the axes; it is rarely square metres: it can be metres, litres, joules and so on.",
     "That is right: the integral adds up all the small contributions and gives the total, accumulated quantity (distance from velocity, energy from power)."
    ]
   },
   {
    "question": "A flow has the unit litres/minute and time is measured in minutes. Which quantity, and unit, does the area under the flow graph give?",
    "choices": [
     "Flow, in litres/minute",
     "Time, in minutes",
     "Volume, in litres",
     "Volume, in litres/minute"
    ],
    "correct": 2,
    "why": [
     "The flow is what the graph shows; the area under the graph accumulates the flow into a volume.",
     "The time is on the $x$-axis; the area combines both units and does not give time alone.",
     "Exactly: $\\dfrac{\\mathrm{litre}}{\\mathrm{min}} \\cdot \\mathrm{min} = \\mathrm{litre}$, so the area is a volume in litres.",
     "The quantity is right but the unit is not: the minutes cancel, so the result is litres, not litres/minute."
    ]
   }
  ]
 },
 "ma4-3.6": {
  "kalla": "2a65705444",
  "data": [
   {
    "question": "What does the area under a probability density function $f(x)$ between $x = a$ and $x = b$ give?",
    "choices": [
     "The mean of $X$",
     "The length of the interval, $b - a$",
     "The largest value of the function between $a$ and $b$",
     "The probability $P(a \\leq X \\leq b)$"
    ],
    "correct": 3,
    "why": [
     "The mean is calculated in a different way; the area under the graph gives the probability, not the mean.",
     "The length of the interval is the base, but the area also depends on the height $f(x)$: $b - a$ alone is not enough.",
     "The largest value of the function is just one height in the graph; the probability is the whole area under it.",
     "That is right: the probability of an interval is the area under the graph, that is the integral $\\int_a^b f(x)\\,dx$."
    ]
   },
   {
    "question": "What requirement must the total area under the graph of a probability density function meet?",
    "choices": [
     "It must be exactly $100$",
     "It must be exactly $0$",
     "It can be any positive number",
     "It must be exactly $1$"
    ],
    "correct": 3,
    "why": [
     "The probability $100\\ \\%$ is written as the number $1$ in the integral, not as $100$.",
     "The area $0$ would mean that no outcome at all is possible; the total probability is $1$.",
     "The area is fixed at exactly $1$: otherwise the probabilities do not add up to $100\\ \\%$.",
     "Exactly: the total probability is $100\\ \\%$, which corresponds to the area $1$."
    ]
   },
   {
    "question": "In a continuous sample space: what is the probability of getting exactly one particular value?",
    "choices": [
     "Always $0.5$",
     "Equal to one",
     "Impossible to decide",
     "Equal to zero"
    ],
    "correct": 3,
    "why": [
     "There is no reason why $0.5$ in particular should apply; a single exact value has probability zero.",
     "The probability $1$ means that something is certain; a single exact value among infinitely many is instead zero.",
     "It can perfectly well be decided: a value with no width gives area zero, so probability zero.",
     "That is right: a single value is an interval with no width, so the area (and therefore the probability) is zero. That is why you calculate with intervals instead."
    ]
   },
   {
    "question": "Which distribution has a graph that is a horizontal line (a \"roof\") over an interval?",
    "choices": [
     "Uniform distribution",
     "Normal distribution",
     "No distribution can have a horizontal graph",
     "Exponential distribution"
    ],
    "correct": 0,
    "why": [
     "That is right: in a uniform distribution the probability is the same everywhere in the interval, so the graph is a horizontal line and the area a rectangle.",
     "The normal distribution is a symmetric bell curve with a peak, not a horizontal line.",
     "A horizontal graph is perfectly possible: it is exactly the uniform distribution.",
     "The exponential distribution starts high and decreases towards zero (a slide); it is not horizontal."
    ]
   },
   {
    "question": "The function $f(x) = k\\cdot x^2$ is to be a probability density function on the interval $0 \\leq x \\leq 3$. What is $k$?",
    "choices": [
     "$k = 3$",
     "$k = \\dfrac{1}{9}$",
     "$k = 9$",
     "$k = \\dfrac{1}{3}$"
    ],
    "correct": 1,
    "why": [
     "The integral gives $9k = 1$, so $k = \\dfrac{1}{9}$, not $3$.",
     "That is right: $\\int_0^3 k x^2\\,dx = \\left[\\dfrac{k x^3}{3}\\right]_0^3 = \\dfrac{27k}{3} = 9k = 1$, so $k = \\dfrac{1}{9}$.",
     "You should solve $9k = 1$, not $k = 9$; requiring area $1$ gives $k = \\dfrac{1}{9}$.",
     "That does not give area $1$: substitute into the integral and check. $9k$ should be $1$, so $k = \\dfrac{1}{9}$."
    ]
   }
  ]
 },
 "ma4-3.7": {
  "kalla": "30b4b93748",
  "data": [
   {
    "question": "A curve $y = f(x)$ rotates about the $x$-axis between $x = a$ and $x = b$. Which formula gives the volume?",
    "choices": [
     "$V = \\pi\\displaystyle\\int_a^b 2y\\, dx$",
     "$V = \\pi\\displaystyle\\int_a^b y^2\\, dx$",
     "$V = \\pi\\displaystyle\\int_a^b y\\, dx$",
     "$V = \\displaystyle\\int_a^b y^2\\, dx$"
    ],
    "correct": 1,
    "why": [
     "The area of a circle is $\\pi r^2$, not $2\\pi r$ (that is the circumference of the circle). The formula should have $y^2$.",
     "That is right: each slice is a cylinder with radius $y$, so the slice has the volume $\\pi y^2\\, dx$ and the sum becomes $\\pi\\int_a^b y^2\\, dx$.",
     "The radius must be squared: the area of a circle is $\\pi r^2$, not $\\pi r$, so it should say $y^2$.",
     "The factor $\\pi$ is missing: it comes from the area of the circle, $\\pi r^2$, and must not be left out."
    ]
   },
   {
    "question": "In the disc method each thin slice is seen as a cylinder. What is the radius of the cylinder at the position $x$?",
    "choices": [
     "$r = \\pi y^2$",
     "$r = x$",
     "$r = y = f(x)$",
     "$r = dx$"
    ],
    "correct": 2,
    "why": [
     "$\\pi y^2$ is the base area of the slice (the area of the circle), not the radius.",
     "The radius is measured vertically from the axis up to the curve, that is the $y$-value, not the $x$-coordinate.",
     "Exactly: the distance from the $x$-axis up to the curve is $y = f(x)$, and that is the radius of the slice.",
     "$dx$ is the thickness of the slice (its height along the axis), not its radius."
    ]
   },
   {
    "question": "When the height $\\Delta x$ of each slice is made infinitely small and the slices are added up with an integral, what does the thickness of the slice become in the integral?",
    "choices": [
     "$dx$",
     "$\\Delta x^2$",
     "$dy$",
     "$\\pi\\, dx$"
    ],
    "correct": 0,
    "why": [
     "That is right: the infinitely small thickness is written $dx$, and the sum $\\sum \\pi y^2\\, \\Delta x$ turns into the integral $\\pi\\int y^2\\, dx$.",
     "The thickness is made small, not squared: it is the radius $y$ that is squared, not the thickness.",
     "We integrate along the $x$-axis, so the thickness (the step along the axis) is $dx$, not $dy$.",
     "The factor $\\pi$ belongs to the base area $\\pi y^2$, not to the thickness; the thickness is just $dx$."
    ]
   },
   {
    "question": "You are to rotate the region between a curve and the $x$-axis, but the interval is not given. How do you find the limits of integration?",
    "choices": [
     "By calculating the zeros of the curve (the intersections with the $x$-axis)",
     "By differentiating the function and setting the derivative equal to zero",
     "By calculating the maximum point of the curve",
     "By choosing $x = 0$ and $x = 1$ as standard limits"
    ],
    "correct": 0,
    "why": [
     "That is right: the region is bounded by the $x$-axis, so the limits are where the curve crosses the axis, that is the zeros $f(x) = 0$.",
     "The zeros of the derivative give stationary points, not where the curve crosses the $x$-axis.",
     "The maximum point lies inside the region and says nothing about where it starts and ends.",
     "The limits are decided by the figure, not by arbitrary standard values."
    ]
   },
   {
    "question": "Why does $y^2$ (and not just $y$) appear in the volume formula $V = \\pi\\int_a^b y^2\\, dx$?",
    "choices": [
     "Because the base of the slice is a circle with the area $\\pi r^2 = \\pi y^2$",
     "Because you always square functions before integrating",
     "Because the solid is three-dimensional and everything is then raised to the power two",
     "Because $y^2$ makes the integral easier to calculate"
    ],
    "correct": 0,
    "why": [
     "Exactly: each slice is a cylinder whose base is a circle with radius $r = y$, and the area of the circle, $\\pi r^2 = \\pi y^2$, gives the square.",
     "You do not square functions out of habit; $y^2$ comes specifically from the area of the circle.",
     "It is not a general rule: the square comes from the area of the circle, $\\pi r^2$.",
     "The form is decided by the geometry (the area of the circle), not by how easy the integral is."
    ]
   }
  ]
 },
 "ma4-3.8": {
  "kalla": "a1a4cc43d1",
  "data": [
   {
    "question": "Which formula applies to the volume when $y = f(x)$ rotates about the $y$-axis?",
    "choices": [
     "$V = \\pi\\int_a^b y^2\\, dx$",
     "$V = \\pi\\int_a^b x^2\\, dy$",
     "$V = \\pi\\int_a^b x\\, dy$",
     "$V = \\pi\\int_a^b x^2\\, dx$"
    ],
    "correct": 1,
    "why": [
     "That is the formula for rotation about the $x$-axis; there the radius is $y$ and the thickness $dx$.",
     "That is right: the radius is $x$ and we integrate with respect to $y$, so the thickness becomes $dy$.",
     "The radius should be squared: the base of a slice is the circle $\\pi x^2$, not $\\pi x$.",
     "The radius $x$ is right, but with rotation about the $y$-axis we integrate along the $y$-axis, so it should be $dy$, not $dx$."
    ]
   },
   {
    "question": "Why must $x$ be expressed in terms of $y$ before the integral is calculated?",
    "choices": [
     "Because the rotation changes the sign of $x$",
     "Because the radius must be negative",
     "Because $x$ is always larger than $y$",
     "Because we integrate with respect to $y$, the integrand must be written in $y$"
    ],
    "correct": 3,
    "why": [
     "The rotation does not change the sign of $x$; the reason is that we integrate along the $y$-axis.",
     "The radius is a distance and can never be negative; that is not the reason.",
     "Which of $x$ and $y$ is larger has nothing to do with it; it is the variable of integration that decides.",
     "Exactly: the integrand $x^2$ and the thickness $dy$ must be in the same variable, that is $y$."
    ]
   },
   {
    "question": "With rotation about the $y$-axis, what gives the radius of a slice?",
    "choices": [
     "The $y$-value of the curve",
     "The thickness of the slice $dy$",
     "The distance to the $x$-axis",
     "The $x$-value of the curve"
    ],
    "correct": 3,
    "why": [
     "The $y$-value of the curve gives the radius with rotation about the $x$-axis, not about the $y$-axis.",
     "The thickness $dy$ is the height of the slice, not its radius.",
     "The distance to the $x$-axis is $y$, which is the radius with rotation about the $x$-axis.",
     "That is right: the slice is perpendicular to the $y$-axis and reaches out to the curve, so the radius is $x$."
    ]
   },
   {
    "question": "The curve $y = \\sqrt{x - 1}$ is to be rotated about the $y$-axis. What is $x$ expressed in terms of $y$?",
    "choices": [
     "$x = y - 1$",
     "$x = \\sqrt{y} + 1$",
     "$x = y^2 - 1$",
     "$x = y^2 + 1$"
    ],
    "correct": 3,
    "why": [
     "You must square away the root sign first; $y - 1$ leaves out the squaring.",
     "The root disappears when you square; you should not keep a root sign in the answer.",
     "A sign error: when $1$ is moved over, it becomes $x = y^2 + 1$, not $y^2 - 1$.",
     "Exactly: square both sides, $y^2 = x - 1$, so $x = y^2 + 1$."
    ]
   },
   {
    "question": "A region rotates about the $y$-axis between $y = 0$ and $y = 2$. What are the limits of integration?",
    "choices": [
     "Always $0$ and $1$",
     "$a = 0$ and $b = 2$, given in the $y$-direction",
     "No limits are needed",
     "The limits are given in the $x$-direction"
    ],
    "correct": 1,
    "why": [
     "The limits are decided by the region; here they are $0$ and $2$, not some fixed standard values.",
     "That is right: since we integrate along the $y$-axis, the limits are given in the $y$-direction.",
     "A definite integral always requires a lower and an upper limit.",
     "With rotation about the $y$-axis we integrate in the $y$-direction, so the limits are given in $y$, not $x$."
    ]
   }
  ]
 },
 "ma4-4.1": {
  "kalla": "f5e7d6047f",
  "data": [
   {
    "question": "What property does the imaginary unit $i$ have?",
    "choices": [
     "$i^2 = -1$",
     "$i^2 = i$",
     "$i^2 = 1$",
     "$i = -1$"
    ],
    "correct": 0,
    "why": [
     "Exactly: the whole point of $i$ is that its square is $-1$, which means that equations such as $x^2 = -9$ get solutions.",
     "The square is a definite number, $-1$, not $i$ itself.",
     "Then $i$ would be a real number ($\\pm 1$) and nothing new would have been added; the square should be $-1$.",
     "The number $i$ is not $-1$; it is the square $i^2$ that is $-1$."
    ]
   },
   {
    "question": "In the complex number $z = a + bi$, what is $b$ called?",
    "choices": [
     "The imaginary unit",
     "A purely imaginary number",
     "The imaginary part",
     "The real part"
    ],
    "correct": 2,
    "why": [
     "The imaginary unit is $i$ itself; $b$ is the number in front of $i$.",
     "A purely imaginary number is the whole number when $a = 0$, not the coefficient $b$.",
     "That is right: $b$ is the imaginary part, while $a$ is the real part.",
     "The real part is $a$, the number without $i$; $b$ is the coefficient in front of $i$."
    ]
   },
   {
    "question": "Which of the numbers is a purely imaginary number?",
    "choices": [
     "$2i$",
     "$3 + 4i$",
     "$\\pi$",
     "$7$"
    ],
    "correct": 0,
    "why": [
     "Correct: $2i$ has the form $a + bi$ with $a = 0$ and $b \\neq 0$, so it is purely imaginary.",
     "$3 + 4i$ has both a real part ($3$) and an imaginary part ($4$) and is therefore an imaginary number, but not purely imaginary.",
     "$\\pi$ is a real number ($b = 0$), not imaginary.",
     "$7$ has no imaginary part ($b = 0$) and is a real number."
    ]
   },
   {
    "question": "Calculate $\\sqrt{-9}$.",
    "choices": [
     "$9i$",
     "$-3$",
     "$3$",
     "$3i$"
    ],
    "correct": 3,
    "why": [
     "The square root of $9$ is $3$, not $9$, and the factor $i$ must be included: $\\sqrt{9}\\cdot i = 3i$.",
     "The square root of $-9$ is not a real number; the imaginary unit is needed and the answer is $3i$.",
     "The square root of a negative number is not real; without $i$ you miss the whole point.",
     "That is right: $\\sqrt{-9} = \\sqrt{9}\\cdot i = 3i$."
    ]
   },
   {
    "question": "Solve the equation $x^2 = -25$.",
    "choices": [
     "$x = \\pm 5i$",
     "$x = \\pm 25i$",
     "$x = 5i$",
     "$x = \\pm 5$"
    ],
    "correct": 0,
    "why": [
     "Exactly: $x = \\pm\\sqrt{-25} = \\pm\\sqrt{25\\cdot i^2} = \\pm 5i$.",
     "$\\sqrt{25} = 5$, not $25$: the answer is $\\pm 5i$.",
     "The equation has two solutions; both $+5i$ and $-5i$ must be included.",
     "A real number squared can never be $-25$; the solutions are imaginary."
    ]
   }
  ]
 },
 "ma4-4.2": {
  "kalla": "471861eadd",
  "data": [
   {
    "question": "What is the imaginary part $\\operatorname{Im} z$ of the number $z = 3 - 2i$?",
    "choices": [
     "$-2i$",
     "$3$",
     "$2$",
     "$-2$"
    ],
    "correct": 3,
    "why": [
     "The imaginary part is just the coefficient $b$, that is the number $-2$, not $-2i$.",
     "That is the real part, $\\operatorname{Re} z = 3$; the imaginary part is the number in front of $i$.",
     "The sign must be included: in front of $i$ it says $-2$, not $+2$.",
     "That is right: in $z = a + bi$ the imaginary part is the number $b$, that is $-2$ (without $i$)."
    ]
   },
   {
    "question": "What is the conjugate $\\bar{z}$ of $z = 4 + 7i$?",
    "choices": [
     "$4 - 7i$",
     "$4 + 7i$",
     "$-4 + 7i$",
     "$7 + 4i$"
    ],
    "correct": 0,
    "why": [
     "Exactly: the conjugate is found by changing the sign of the imaginary part, so $4 + 7i$ becomes $4 - 7i$.",
     "That is the number itself; the conjugate changes the sign of the imaginary part.",
     "You change the sign of the imaginary part, not of the real part.",
     "The real and imaginary parts do not swap places: only the sign of the imaginary part changes."
    ]
   },
   {
    "question": "What is $i^2$?",
    "choices": [
     "$i$",
     "$-i$",
     "$-1$",
     "$1$"
    ],
    "correct": 2,
    "why": [
     "$i^2$ is a real number, $-1$, not $i$ again.",
     "$i^2 = -1$; it is $i^3$ that becomes $-i$.",
     "That is right: the imaginary unit is defined by $i^2 = -1$.",
     "The square of $i$ is $-1$, not $1$; that is exactly what distinguishes $i$ from the real numbers."
    ]
   },
   {
    "question": "How do you simplify a fraction that has a complex number in the denominator?",
    "choices": [
     "Multiply the numerator and denominator by the conjugate of the denominator",
     "Multiply the numerator and denominator by the conjugate of the numerator",
     "Cross out $i$ in the numerator and denominator",
     "Divide real part by real part and imaginary part by imaginary part"
    ],
    "correct": 0,
    "why": [
     "Exactly: the product $(a + bi)(a - bi) = a^2 + b^2$ is real, so the denominator becomes a real number.",
     "It is the conjugate of the denominator that you multiply by, in order to make the denominator real.",
     "You may not cross out $i$ just like that; it changes the value of the fraction.",
     "Division of complex numbers is not done part by part like that: you multiply by the conjugate."
    ]
   },
   {
    "question": "By which number should you multiply the numerator and denominator of $\\dfrac{5 + 3i}{4 - 2i}$ to get rid of $i$ in the denominator?",
    "choices": [
     "$4 - 2i$",
     "$4 + 2i$",
     "$-4 + 2i$",
     "$5 - 3i$"
    ],
    "correct": 1,
    "why": [
     "Multiplying by the denominator itself does not make the denominator real; you need its conjugate.",
     "That is right: the conjugate of the denominator is $4 + 2i$, and $(4 - 2i)(4 + 2i) = 16 + 4 = 20$ is real.",
     "The conjugate of $4 - 2i$ keeps the real part $4$ positive: it is $4 + 2i$.",
     "That is the conjugate of the numerator; you should multiply by the conjugate of the denominator."
    ]
   }
  ]
 },
 "ma4-4.3": {
  "kalla": "57b116c20b",
  "data": [
   {
    "question": "A quadratic equation with real coefficients has a negative discriminant. What applies to the roots?",
    "choices": [
     "Two non-real, complex conjugate roots",
     "No solutions at all",
     "Two real roots",
     "A real double root"
    ],
    "correct": 0,
    "why": [
     "Exactly: a negative discriminant gives an imaginary term, and the roots become the conjugate pair $a + bi$ and $a - bi$.",
     "The equation has no real solutions, but it has two complex ones: so it does not lack solutions.",
     "You get two real roots when the discriminant is positive, not negative.",
     "A real double root arises when the discriminant is exactly zero, not negative."
    ]
   },
   {
    "question": "Solve the equation $z^2 + 9 = 0$.",
    "choices": [
     "$z = \\pm 3$",
     "$z = \\pm 3i$",
     "$z = 3i$",
     "$z = \\pm 9i$"
    ],
    "correct": 1,
    "why": [
     "$\\pm 3$ solves $z^2 - 9 = 0$; here the constant term is $+9$, so the root is imaginary.",
     "That is right: $z^2 = -9$ gives $z = \\pm\\sqrt{-9} = \\pm 3i$.",
     "The quadratic equation has two roots; $-3i$ is also a solution.",
     "$\\sqrt{-9} = 3i$, not $9i$: you take the square root of $9$, you do not keep $9$."
    ]
   },
   {
    "question": "A quadratic equation with real coefficients has the root $3 - 2i$. What is the other root?",
    "choices": [
     "$-3 - 2i$",
     "$2 - 3i$",
     "$-3 + 2i$",
     "$3 + 2i$"
    ],
    "correct": 3,
    "why": [
     "Both the real and the imaginary parts change sign here; the conjugate only changes the sign of the imaginary part.",
     "The real and imaginary parts have been swapped; the conjugate keeps $3$ as the real part and changes the sign of $-2i$.",
     "The conjugate only changes the sign of the imaginary part, not of the real part: the real part $3$ is unchanged.",
     "Right: with real coefficients, complex roots come in conjugate pairs, so the other root is the conjugate $3 + 2i$."
    ]
   },
   {
    "question": "Solve the equation $z^2 - 4z + 13 = 0$.",
    "choices": [
     "$z = -2 \\pm 3i$",
     "$z = 4 \\pm 3i$",
     "$z = 2 \\pm 9i$",
     "$z = 2 \\pm 3i$"
    ],
    "correct": 3,
    "why": [
     "With $p = -4$, $-p/2 = +2$, so the real part is positive.",
     "The real part is $-p/2 = -(-4)/2 = 2$, not $4$: you halve the coefficient and change its sign.",
     "$\\sqrt{-9} = 3i$, not $9i$; the root is taken of $9$.",
     "That is right: the *pq* formula gives $z = 2 \\pm \\sqrt{4 - 13} = 2 \\pm \\sqrt{-9} = 2 \\pm 3i$."
    ]
   },
   {
    "question": "For which values of $a$ does the equation $x^2 + ax + 9 = 0$ have two non-real roots?",
    "choices": [
     "$-3 < a < 3$",
     "$-6 < a < 6$",
     "$a = 6$",
     "$a < -6$ or $a > 6$"
    ],
    "correct": 1,
    "why": [
     "$a^2 < 9$ corresponds to $-3 < a < 3$; but the condition is $a^2 < 36$, not $a^2 < 9$.",
     "Right: the requirement is $\\left(\\frac{a}{2}\\right)^2 - 9 < 0$, that is $a^2 < 36$, which gives $-6 < a < 6$.",
     "At $a = 6$ the discriminant is exactly zero: then you get a real double root, not two non-real roots.",
     "There $a^2 > 36$, so the discriminant is positive and the roots are real, not non-real."
    ]
   }
  ]
 },
 "ma4-4.4": {
  "kalla": "d90947e79d",
  "data": [
   {
    "question": "The number $x = a$ is a zero of the polynomial $p(x)$. What does the factor theorem say?",
    "choices": [
     "$a$ is a factor of $p(x)$",
     "$p(x)$ has no factors at all",
     "$(x - a)$ is a factor of $p(x)$",
     "$(x + a)$ is a factor of $p(x)$"
    ],
    "correct": 2,
    "why": [
     "It is the factor $(x - a)$, which contains the number $a$, that is a factor, not the number $a$ alone.",
     "On the contrary: a known zero gives exactly one factor, which you can take out.",
     "That is right: a zero $x = a$ corresponds to the factor $(x - a)$, and $p(x) = (x - a)\\cdot q(x)$.",
     "The sign is wrong: the zero $x = a$ gives the factor $(x - a)$, not $(x + a)$. The factor $(x + a)$ belongs to the zero $x = -a$."
    ]
   },
   {
    "question": "What are the roots of the equation $(x - 3)(x + 4) = 0$?",
    "choices": [
     "$x = 3$ and $x = -4$",
     "$x = 12$",
     "$x = -3$ and $x = 4$",
     "$x = 3$ and $x = 4$"
    ],
    "correct": 0,
    "why": [
     "Exactly: one factor at a time is set to zero: $x - 3 = 0$ gives $3$, $x + 4 = 0$ gives $-4$.",
     "You do not multiply the factors together: each factor is set to zero separately.",
     "The signs are swapped: $x - 3 = 0$ gives $x = 3$ (not $-3$) and $x + 4 = 0$ gives $x = -4$ (not $4$).",
     "The factor $x + 4 = 0$ gives $x = -4$, not $x = 4$."
    ]
   },
   {
    "question": "You know the root $x = 2$ of a cubic equation. Why do you do polynomial division by $(x - 2)$?",
    "choices": [
     "To check that $x = 2$ really is a root",
     "To find the quadratic factor (the quotient), whose zeros give the other roots",
     "So that $x = 2$ becomes a double root",
     "To turn the equation into a linear equation directly"
    ],
    "correct": 1,
    "why": [
     "We already know that $x = 2$ is a root; the division is used to find the other roots, not to check.",
     "That is right: the division takes out the known factor and leaves a quadratic factor that you can solve further.",
     "The division creates no new roots: it only takes out the factor that the root $x = 2$ corresponds to.",
     "A cubic equation divided by a linear factor leaves a quadratic factor, not a linear equation."
    ]
   },
   {
    "question": "What is a suitable first step for solving the equation $x^3 - 7x^2 + 10x = 0$?",
    "choices": [
     "Move $10x$ to the right-hand side and square",
     "Take out $x$ so that $x(x^2 - 7x + 10) = 0$",
     "Divide the whole equation by $x$",
     "Use the $pq$ formula directly on the cubic expression"
    ],
    "correct": 1,
    "why": [
     "Squaring does not help here and can introduce false roots; taking out $x$ is the way.",
     "Exactly: all the terms contain $x$, so taking it out gives the zero product $x(x^2 - 7x + 10) = 0$.",
     "Dividing by $x$ can lose the root $x = 0$; take out $x$ instead and keep that factor.",
     "The $pq$ formula applies to quadratic equations, not to a cubic expression: factorise first."
    ]
   },
   {
    "question": "In polynomial division of $p(x)$ by $(x - a)$ the remainder is $0$. What does that mean?",
    "choices": [
     "$x = a$ is a zero of $p(x)$, and $(x - a)$ is a factor",
     "$x = a$ is not a root of $p(x)$",
     "The polynomial $p(x)$ has no real zeros",
     "The quotient must be a polynomial of degree one"
    ],
    "correct": 0,
    "why": [
     "That is right: remainder $0$ means that the division comes out exactly, so $(x - a)$ is a factor and $x = a$ a zero.",
     "On the contrary: remainder $0$ is precisely the sign that $x = a$ IS a root.",
     "The remainder says nothing of the kind; it only shows that $(x - a)$ in particular is a factor.",
     "The degree of the quotient depends on the degree of $p(x)$, not on the remainder being $0$."
    ]
   }
  ]
 },
 "ma4-4.5": {
  "kalla": "b4b1526c8a",
  "data": [
   {
    "question": "Where in the complex plane are the real numbers placed?",
    "choices": [
     "Always in the first quadrant",
     "On the Im-axis (the vertical axis)",
     "On the Re-axis (the horizontal axis)",
     "They cannot be placed in the plane at all"
    ],
    "correct": 2,
    "why": [
     "Real numbers are spread along the whole Re-axis, both positive and negative, not only in the first quadrant.",
     "The Im-axis is for purely imaginary numbers (real part $0$), not for real numbers.",
     "Exactly: a real number has imaginary part $0$, so the point ends up on the horizontal Re-axis.",
     "On the contrary, real numbers are easy to place: they lie on the Re-axis, just as on the ordinary number line."
    ]
   },
   {
    "question": "Which point does the complex number $z = -2 - 4i$ correspond to?",
    "choices": [
     "$4$ steps to the left and $2$ steps down",
     "$2$ steps to the right and $4$ steps up (first quadrant)",
     "$2$ steps to the left and $4$ steps down (third quadrant)",
     "On the Re-axis, $2$ steps to the left"
    ],
    "correct": 2,
    "why": [
     "The real part and the imaginary part have been mixed up: the real part $-2$ controls the sideways position, the imaginary part $-4$ the vertical position.",
     "That would be the point for $2 + 4i$; here both parts are negative.",
     "That is right: the real part $-2$ gives the sideways position and the imaginary part $-4$ the vertical position, both negative.",
     "The imaginary part is $-4$, not $0$, so the point does not lie on the Re-axis."
    ]
   },
   {
    "question": "How is the sum $z + w$ of two complex numbers calculated?",
    "choices": [
     "The real part of one is multiplied by the imaginary part of the other",
     "The real parts are added separately and the imaginary parts separately",
     "The moduli are added and the directions are added",
     "Complex numbers cannot be added"
    ],
    "correct": 1,
    "why": [
     "That resembles what multiplication looks like, but addition keeps the real and imaginary parts apart.",
     "Exactly: it works like vector addition, $(a + bi) + (c + di) = (a + c) + (b + d)i$.",
     "Modulus and direction are used in multiplication in polar form, not in addition.",
     "Complex numbers certainly can be added; you add the real and imaginary parts separately."
    ]
   },
   {
    "question": "Let $z = 3 + 2i$ and $w = -2 - 4i$. What is $z - w$?",
    "choices": [
     "$1 - 2i$",
     "$-5 - 6i$",
     "$5 - 6i$",
     "$5 + 6i$"
    ],
    "correct": 3,
    "why": [
     "That is $z + w$, that is the sum, not the difference.",
     "Both the real and the imaginary parts become positive here: $3 - (-2) = 5$ and $2 - (-4) = 6$.",
     "The imaginary part becomes $2 - (-4) = 6$, positive, not $-6$.",
     "Right: $(3 - (-2)) + (2 - (-4))i = 5 + 6i$; subtracting negative numbers gives addition."
    ]
   },
   {
    "question": "Which geometric operation corresponds to the conjugate of a complex number?",
    "choices": [
     "A rotation of $90^\\circ$ anticlockwise about the origin",
     "A reflection in the Im-axis (the imaginary axis)",
     "A movement $1$ step to the right",
     "A reflection in the Re-axis (the real axis)"
    ],
    "correct": 3,
    "why": [
     "A rotation changes both the real and the imaginary part; the conjugate leaves the real part untouched.",
     "A reflection in the Im-axis would change the sign of the real part; the conjugate changes the sign of the imaginary part.",
     "The conjugate does not move the point sideways: the real part is unchanged.",
     "That is right: $z = a + bi$ and $\\bar{z} = a - bi$ have the same real part but opposite imaginary parts, so it is a reflection in the Re-axis."
    ]
   }
  ]
 },
 "ma4-4.6": {
  "kalla": "513be81092",
  "data": [
   {
    "question": "What is the modulus $|z|$ of $z = a + bi$?",
    "choices": [
     "$\\sqrt{a^2 - b^2}$",
     "$\\sqrt{a^2 + b^2}$",
     "$a^2 + b^2$",
     "$a + b$"
    ],
    "correct": 1,
    "why": [
     "The sign under the root should be plus: the squares of the shorter sides are added, not subtracted.",
     "That is right: the modulus is the length of the vector, the hypotenuse of the triangle with the shorter sides $a$ and $b$, so Pythagoras gives $\\sqrt{a^2 + b^2}$.",
     "That is the square of the modulus; you must take the square root to get the length itself.",
     "You cannot simply add the real part and the imaginary part; the length is found with Pythagoras' theorem."
    ]
   },
   {
    "question": "What is the polar form of a complex number with modulus $r$ and argument $v$?",
    "choices": [
     "$z = r(\\cos v + i\\sin v)$",
     "$z = r + v\\,i$",
     "$z = r(\\sin v + i\\cos v)$",
     "$z = r\\cos v + r\\sin v$"
    ],
    "correct": 0,
    "why": [
     "Exactly: the real part is $r\\cos v$ and the imaginary part $r\\sin v$, which gives $r(\\cos v + i\\sin v)$.",
     "The modulus and the argument cannot be added like a real and an imaginary part: they build up the vector via cosine and sine.",
     "Cosine and sine have been mixed up: the real part goes with cosine, not sine.",
     "The imaginary unit $i$ is missing in front of the sine term; without $i$ it is not a complex number."
    ]
   },
   {
    "question": "How is the argument $v$ of $z = a + bi$ found?",
    "choices": [
     "$\\sin v = \\dfrac{b}{a}$",
     "$\\tan v = \\dfrac{b}{a}$",
     "$\\tan v = \\dfrac{r}{a}$",
     "$\\tan v = \\dfrac{a}{b}$"
    ],
    "correct": 1,
    "why": [
     "The quotient $b/a$ is the tangent, not the sine; the sine is the opposite side divided by the hypotenuse $r$.",
     "That is right: in the right-angled triangle the opposite side is $b$ and the adjacent side $a$, so $\\tan v = b/a$.",
     "The hypotenuse $r$ does not belong in the tangent; the tangent compares the two shorter sides $b$ and $a$.",
     "The numerator and denominator are swapped; the opposite side $b$ should be on top."
    ]
   },
   {
    "question": "The number $z = -3 + 4i$ lies in the second quadrant. The calculator gives $\\tan^{-1}(b/a) \\approx -53^\\circ$. What is $\\arg z$?",
    "choices": [
     "$-53^\\circ$",
     "$53^\\circ$",
     "$233^\\circ$",
     "$127^\\circ$"
    ],
    "correct": 3,
    "why": [
     "That is the calculator's raw answer; for $a < 0$, $\\tan^{-1}$ gives the wrong quadrant and must be corrected.",
     "The angle then points down to the right in the fourth quadrant, but $z$ lies up to the left.",
     "You should add $180^\\circ$, not $286^\\circ$; $233^\\circ$ ends up in the third quadrant.",
     "That is right: since $a < 0$ the number lies in the second quadrant, and then you add $180^\\circ$: $-53^\\circ + 180^\\circ = 127^\\circ$."
    ]
   },
   {
    "question": "What does the equation $|z - (3 + 2i)| = 2$ describe in the complex plane?",
    "choices": [
     "A circle with centre $3 + 2i$ and radius $4$",
     "A circle with centre $3 + 2i$ and radius $2$",
     "A circle with centre $-3 - 2i$ and radius $2$",
     "A straight line through $3 + 2i$"
    ],
    "correct": 1,
    "why": [
     "The radius is the distance $2$ on the right-hand side, not twice that.",
     "That is right: $|z - w|$ is the distance between $z$ and $w$, so all $z$ at the distance $2$ from $3 + 2i$ form a circle with that centre and radius $2$.",
     "The centre is $3 + 2i$; it is the number subtracted inside the modulus, not its negative.",
     "A constant distance to a point gives a circle, not a straight line."
    ]
   }
  ]
 },
 "ma4-4.7": {
  "kalla": "398d4dc34b",
  "data": [
   {
    "question": "What happens to the moduli and the arguments when two complex numbers are multiplied in polar form?",
    "choices": [
     "The moduli are multiplied and the arguments are added",
     "Both the moduli and the arguments are multiplied",
     "The moduli are added and the arguments are multiplied",
     "Both the moduli and the arguments are added"
    ],
    "correct": 0,
    "why": [
     "That is right: that is the core of the rule, $z\\cdot w = |z|\\cdot|w|(\\cos(u + v) + i\\sin(u + v))$.",
     "The arguments are not multiplied: they are added. Only the moduli are multiplied.",
     "The other way round: it is the moduli that are multiplied, while the arguments (the angles) are added.",
     "The arguments are added, but the moduli are not added: they are multiplied."
    ]
   },
   {
    "question": "How is the quotient $\\dfrac{z}{w}$ calculated in polar form?",
    "choices": [
     "Divide the moduli and subtract the arguments",
     "Divide both the moduli and the arguments",
     "Subtract the moduli and divide the arguments",
     "Multiply the moduli and add the arguments"
    ],
    "correct": 0,
    "why": [
     "Exactly: division is the opposite of multiplication. The moduli are divided and the arguments subtracted.",
     "The moduli are divided, but the arguments are not divided: they are subtracted.",
     "The moduli are not subtracted: they are divided. And the arguments are subtracted, not divided.",
     "That is the rule for multiplication, not division."
    ]
   },
   {
    "question": "What does a multiplication by $i$ correspond to geometrically?",
    "choices": [
     "A rotation of $180^\\circ$",
     "A rotation of $90^\\circ$ anticlockwise",
     "A doubling of the modulus without rotation",
     "A rotation of $90^\\circ$ clockwise"
    ],
    "correct": 1,
    "why": [
     "A rotation of $180^\\circ$ comes from $i^2 = -1$, that is multiplying by $i$ twice.",
     "That is right: $i$ has the modulus $1$ and the argument $90^\\circ$, so the vector is rotated $90^\\circ$ anticlockwise without changing length.",
     "The modulus does not change, since $|i| = 1$: it is a pure rotation.",
     "Clockwise is instead division by $i$; multiplication rotates anticlockwise."
    ]
   },
   {
    "question": "Calculate $z_1\\cdot z_2$ where $z_1 = 2(\\cos 25^\\circ + i\\sin 25^\\circ)$ and $z_2 = 3(\\cos 35^\\circ + i\\sin 35^\\circ)$.",
    "choices": [
     "$6(\\cos 60^\\circ + i\\sin 60^\\circ)$",
     "$2(\\cos 60^\\circ + i\\sin 60^\\circ)$",
     "$5(\\cos 60^\\circ + i\\sin 60^\\circ)$",
     "$6(\\cos 10^\\circ + i\\sin 10^\\circ)$"
    ],
    "correct": 0,
    "why": [
     "That is right: the moduli give $2\\cdot 3 = 6$ and the arguments give $25^\\circ + 35^\\circ = 60^\\circ$.",
     "The modulus is wrong: the moduli should be multiplied to $6$, not divided to $2$.",
     "The modulus is wrong: $2\\cdot 3 = 6$, not $2 + 3 = 5$. The argument $60^\\circ$ is right.",
     "The argument is wrong: in multiplication the arguments are added ($60^\\circ$), not subtracted."
    ]
   },
   {
    "question": "What does a division by $i$ correspond to geometrically?",
    "choices": [
     "A rotation of $90^\\circ$ anticlockwise",
     "No rotation, just a reflection in the real axis",
     "A rotation of $90^\\circ$ clockwise",
     "A rotation of $180^\\circ$ clockwise"
    ],
    "correct": 2,
    "why": [
     "Anticlockwise is multiplication by $i$; division rotates the other way, clockwise.",
     "There is a rotation of $90^\\circ$ clockwise; it is not a reflection.",
     "Exactly: division subtracts the argument $90^\\circ$, which is a rotation of $90^\\circ$ clockwise.",
     "Division by $i$ rotates $90^\\circ$, not $180^\\circ$: half a turn comes from division by $i^2 = -1$."
    ]
   }
  ]
 },
 "ma4-4.8": {
  "kalla": "60f9106990",
  "data": [
   {
    "question": "What does de Moivre's formula say about $\\bigl(r(\\cos v + i\\sin v)\\bigr)^n$?",
    "choices": [
     "Both the modulus and the argument are raised to the power $n$: $r^n(\\cos v^n + i\\sin v^n)$",
     "The modulus is raised to the power $n$ and the argument is multiplied by $n$: $r^n(\\cos nv + i\\sin nv)$",
     "The modulus is multiplied by $n$ and the argument is raised to the power $n$",
     "The modulus is unchanged and only the argument is multiplied by $n$"
    ],
    "correct": 1,
    "why": [
     "The argument should be multiplied by $n$, not raised to a power: it is $nv$, not $v^n$.",
     "That is right: the power raises the modulus to the power and multiplies the angle by the exponent.",
     "It is the other way round: the modulus is raised to the power $n$ and the argument is multiplied by $n$.",
     "The modulus changes: it becomes $r^n$, not $r$."
    ]
   },
   {
    "question": "Why is polar form so convenient for calculating powers of complex numbers?",
    "choices": [
     "In polar form every power is always equal to $1$",
     "Powers can only be calculated in polar form, never in rectangular form",
     "Polar form makes all powers real numbers",
     "The power becomes a simple raising of the modulus to the power and a multiplication of the argument, instead of repeated multiplication in rectangular form"
    ],
    "correct": 3,
    "why": [
     "Only if the modulus is $1$ does the modulus stay $1$; the argument still changes, so the power is rarely $1$.",
     "Powers can be calculated in rectangular form too, but it is more work: polar form is just smoother.",
     "The power is in general still complex; polar form just makes the calculation easier.",
     "Exactly: de Moivre's formula turns the calculation of the power into a single step."
    ]
   },
   {
    "question": "Let $z = 2(\\cos 25^\\circ + i\\sin 25^\\circ)$. What is the modulus $|z^5|$?",
    "choices": [
     "$32$",
     "$2$",
     "$10$",
     "$25$"
    ],
    "correct": 0,
    "why": [
     "That is right: the modulus is raised to the power of the exponent, $2^5 = 32$.",
     "The modulus is $2$ for $z$ itself, but for $z^5$ it becomes $2^5 = 32$.",
     "The modulus is not multiplied by $n$; it is raised to the power $n$, so it becomes $2^5 = 32$.",
     "25 comes from the argument $25^\\circ$, which is being confused with the modulus. The modulus is $2^5 = 32$."
    ]
   },
   {
    "question": "Let $z = \\cos 10^\\circ + i\\sin 10^\\circ$. What is $z^{27}$ in the form $a + bi$?",
    "choices": [
     "$-i$",
     "$-1$",
     "$i$",
     "$1$"
    ],
    "correct": 0,
    "why": [
     "That is right: the argument becomes $27\\cdot 10^\\circ = 270^\\circ$, and $\\cos 270^\\circ + i\\sin 270^\\circ = -i$.",
     "$-1$ belongs to the argument $180^\\circ$; here the argument is $270^\\circ$, which gives $-i$.",
     "That corresponds to $90^\\circ$; but the argument is $270^\\circ$, which gives $-i$.",
     "$1$ belongs to $0^\\circ$ or $360^\\circ$; $27\\cdot 10^\\circ = 270^\\circ$ gives $-i$ instead."
    ]
   },
   {
    "question": "Before you use de Moivre's formula on $z = 1 + i$ you must do one thing. What?",
    "choices": [
     "Rewrite $z$ in polar form (find the modulus $r$ and the argument $v$)",
     "Set $z$ equal to $1$",
     "Multiply $z$ by its conjugate",
     "Divide $z$ by $i$"
    ],
    "correct": 0,
    "why": [
     "Exactly: de Moivre's formula is based on the modulus and the argument, so $z$ must first be written in polar form.",
     "$z = 1 + i$ is not $1$; you must find its modulus $\\sqrt{2}$ and its argument $45^\\circ$.",
     "Multiplying by the conjugate gives the modulus squared, but it does not replace the need for polar form for the power.",
     "Dividing by $i$ only changes the direction and does not help you use de Moivre's formula."
    ]
   }
  ]
 },
 "ma4-4.9": {
  "kalla": "0a0707990f",
  "data": [
   {
    "question": "How many solutions does the equation $z^n = w$ have, where $n$ is a positive integer and $w \\neq 0$?",
    "choices": [
     "Infinitely many",
     "Exactly $n$",
     "Always exactly $2$",
     "Always exactly $1$"
    ],
    "correct": 1,
    "why": [
     "After $n$ steps the argument has increased by a full turn and the solutions start to repeat, so there are exactly $n$ of them, not infinitely many.",
     "That is right: a power equation $z^n = w$ has exactly $n$ different roots.",
     "The number of roots is controlled by the exponent $n$; it is not always two.",
     "The real solution is just one of several; in total there are $n$ roots."
    ]
   },
   {
    "question": "The solutions to $z^n = w$ lie on a circle around the origin in the complex plane. What radius does the circle have?",
    "choices": [
     "$n\\cdot |w|$",
     "$|w|^n$",
     "$\\sqrt[n]{|w|}$",
     "$|w|$"
    ],
    "correct": 2,
    "why": [
     "The radius does not depend on a product with $n$, but on the $n$th root of $|w|$.",
     "Raising to the power $n$ goes the wrong way: we should solve for $r$ from $r^n = |w|$, that is take the root.",
     "Exactly: the modulus of each root is the $n$th root of $|w|$, since $r^n = |w|$.",
     "That is the modulus of $w$ itself; the roots have the smaller value $\\sqrt[n]{|w|}$."
    ]
   },
   {
    "question": "How large is the angle between two neighbouring solutions to $z^n = w$?",
    "choices": [
     "$\\dfrac{360^\\circ}{|w|}$",
     "$\\dfrac{360^\\circ}{n}$",
     "Always $180^\\circ$",
     "$\\dfrac{n}{360^\\circ}$"
    ],
    "correct": 1,
    "why": [
     "The spacing is decided by the number of roots $n$, not by the modulus $|w|$.",
     "That is right: the $n$ roots divide the full turn ($360^\\circ$) into $n$ equal steps.",
     "$180^\\circ$ only applies in the special case $n = 2$; in general the step is $\\dfrac{360^\\circ}{n}$.",
     "The expression is upside down; the step is $360^\\circ$ divided by $n$, not the other way round."
    ]
   },
   {
    "question": "Why does $z^n = w$ only give $n$ solutions and no more, even though $v = \\dfrac{\\arg w + k\\cdot 360^\\circ}{n}$ can continue for larger integers $k$?",
    "choices": [
     "When the argument has been increased by a full turn ($360^\\circ$) you land on a solution already found",
     "The trigonometric functions stop being defined after $n$ steps",
     "The equation changes sign and then has no solutions",
     "The modulus $r$ becomes zero after $n$ steps"
    ],
    "correct": 0,
    "why": [
     "Exactly: sine and cosine are periodic with $360^\\circ$, so when the argument has increased by a full turn, the point repeats.",
     "The functions are defined for all angles; it is the periodicity, not some limit to the definition, that restricts the number.",
     "The equation does not change sign; the solutions repeat because the angles come back after a full turn.",
     "The modulus is $r = \\sqrt[n]{|w|}$ and does not change at all as $n$ increases: it is the argument that repeats."
    ]
   },
   {
    "question": "What is the crucial first step when you solve an equation $z^n = w$?",
    "choices": [
     "Square both sides to get rid of root signs",
     "Divide both sides by $z$ until the exponent disappears",
     "Assume that $z$ is real and look only for real solutions",
     "Rewrite both the left-hand and the right-hand side in polar form and then identify the moduli and arguments"
    ],
    "correct": 3,
    "why": [
     "Squaring does not help here and can introduce false roots; the equation already has the form $z^n = w$.",
     "Dividing by $z$ loses solutions and does not solve the equation; polar form is the way.",
     "Most roots are complex: if you assume real numbers you miss most of the $n$ solutions.",
     "That is right: in polar form you can compare the moduli separately and the arguments separately, and de Moivre's formula gives $z^n$."
    ]
   }
  ]
 },
 "ma4-4.10": {
  "kalla": "d82842a620",
  "data": [
   {
    "question": "What does Euler's formula say?",
    "choices": [
     "$e^{iv} = v(\\cos i + \\sin i)$",
     "$e^{iv} = \\cos v - i\\sin v$",
     "$e^{iv} = \\sin v + i\\cos v$",
     "$e^{iv} = \\cos v + i\\sin v$"
    ],
    "correct": 3,
    "why": [
     "The angle $v$ belongs inside the cosine and the sine, not as a factor outside.",
     "Almost, but the imaginary part should have a plus sign; the minus sign corresponds to $e^{-iv}$.",
     "Cosine and sine have swapped places; the real part should be $\\cos v$, not $\\sin v$.",
     "Exactly: the exponential function with an imaginary exponent gives cosine as the real part and sine as the imaginary part."
    ]
   },
   {
    "question": "What is the value of $e^{i\\pi}$ according to Euler's identity?",
    "choices": [
     "$-i$",
     "$1$",
     "$-1$",
     "$i$"
    ],
    "correct": 2,
    "why": [
     "That is $e^{i\\frac{3\\pi}{2}}$ (or $e^{-i\\frac{\\pi}{2}}$); at the angle $\\pi$ we end up at $-1$.",
     "That applies to $e^{i\\cdot 0} = e^0 = 1$, that is the angle $0$, not $\\pi$.",
     "That is right: $e^{i\\pi} = \\cos \\pi + i\\sin \\pi = -1 + 0 = -1$.",
     "That is $e^{i\\frac{\\pi}{2}}$, a quarter of a turn, not half a turn."
    ]
   },
   {
    "question": "How is a complex number written in **exponential form**?",
    "choices": [
     "$z = e^{rv}$",
     "$z = a + bi$",
     "$z = r(\\cos v + i\\sin v)$",
     "$z = r\\,e^{iv}$"
    ],
    "correct": 3,
    "why": [
     "The imaginary unit $i$ is missing from the exponent here: without $i$ it is not a complex number in exponential form.",
     "That is rectangular form, with a real and an imaginary part.",
     "That is polar form; with Euler's formula the bracket becomes exactly $e^{iv}$.",
     "That is right: the modulus $r$ as a factor and the argument $v$ in the exponent together with $i$."
    ]
   },
   {
    "question": "Which expression is equal to $e^{a + bi}$?",
    "choices": [
     "$e^b(\\cos a + i\\sin a)$",
     "$a + bi$",
     "$e^{a}(\\cos a + i\\sin a)$",
     "$e^a(\\cos b + i\\sin b)$"
    ],
    "correct": 3,
    "why": [
     "The real part $a$ and the imaginary part $b$ have swapped roles; $a$ should give the factor and $b$ the angle.",
     "That is only the exponent itself; $e$ raised to it is something else.",
     "The angle should be $b$ (the imaginary part), not $a$.",
     "Exactly: the real part $a$ gives the factor $e^a$ and the imaginary part $b$ becomes the angle in Euler's formula."
    ]
   },
   {
    "question": "Write $e^{i\\frac{\\pi}{2}}$ in rectangular form.",
    "choices": [
     "$-i$",
     "$i$",
     "$-1$",
     "$1$"
    ],
    "correct": 1,
    "why": [
     "The sign is wrong; $-i$ corresponds to the angle $\\dfrac{3\\pi}{2}$ (or $-\\dfrac{\\pi}{2}$).",
     "That is right: $e^{i\\frac{\\pi}{2}} = \\cos \\dfrac{\\pi}{2} + i\\sin \\dfrac{\\pi}{2} = 0 + i\\cdot 1 = i$.",
     "That is $e^{i\\pi} = -1$, half a turn, not a quarter of a turn.",
     "That is $e^{i\\cdot 0} = 1$, that is the angle $0$, not $\\dfrac{\\pi}{2}$."
    ]
   }
  ]
 }
});
