/* Engelsk översättning av exittickets (maspec). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "maspec-4.1": {
  "kalla": "ea3b20c938",
  "data": [
   {
    "question": "What distinguishes a vector quantity from a scalar?",
    "choices": [
     "A scalar quantity has a unit, a vector quantity has no unit",
     "A vector quantity is always larger than a scalar",
     "A vector quantity has both magnitude and direction, a scalar has only magnitude",
     "A scalar quantity can only be positive"
    ],
    "correct": 2,
    "why": [
     "Both kinds have units. Mass is measured in kilograms and force in newtons.",
     "The size says nothing about which kind of quantity it is. It is the direction that sets them apart.",
     "A force of 10 N is not fully described until you know which way it pulls. A mass of 3 kg needs no direction.",
     "A temperature of −5 °C is a scalar. The sign has nothing to do with direction."
    ]
   },
   {
    "question": "The vectors $\\vec{u}$ and $\\vec{v}$ lie along the same line but point in opposite directions. The vector $\\vec{u}$ has length 3 and $\\vec{v}$ has length 8. What is the length of $\\vec{u} + \\vec{v}$?",
    "choices": [
     "5",
     "11",
     "$\\sqrt{73}$",
     "24"
    ],
    "correct": 0,
    "why": [
     "Tip to tail: $\\vec{v}$ goes 8 steps forwards and $\\vec{u}$ goes 3 steps back, so the sum has length $8 - 3 = 5$, pointing the same way as $\\vec{v}$.",
     "$3 + 8 = 11$ only applies if the vectors pull in the same direction. Here they point in opposite directions and partly cancel each other out.",
     "Pythagoras' theorem is used when the vectors are perpendicular. Here they lie along the same line.",
     "Lengths are not multiplied when vectors are added."
    ]
   },
   {
    "question": "When do two directed line segments count as the same vector?",
    "choices": [
     "When they have the same starting point",
     "When they are equally long",
     "When they lie on the same line",
     "When they are equally long and have the same direction"
    ],
    "correct": 3,
    "why": [
     "The starting point is not part of the vector. A vector may be translated freely.",
     "The length is not enough. Two arrows of equal length pointing in different directions are different vectors.",
     "Arrows on the same line can have different lengths or point in opposite directions.",
     "Length and direction are all that a vector consists of. Where it is drawn does not matter, and all such arrows belong to the same equivalence class."
    ]
   },
   {
    "question": "The vectors $\\vec{u}$ and $\\vec{v}$ are drawn from the same point and completed to form a parallelogram. Which vector is $\\vec{u} + \\vec{v}$ according to the parallelogram method?",
    "choices": [
     "The side opposite $\\vec{u}$",
     "The diagonal from the common starting point",
     "The diagonal from the tip of $\\vec{v}$ to the tip of $\\vec{u}$",
     "The side opposite $\\vec{v}$"
    ],
    "correct": 1,
    "why": [
     "The side opposite $\\vec{u}$ is a translated copy of $\\vec{u}$, so it is the same vector as $\\vec{u}$.",
     "If you follow $\\vec{u}$ and then the side parallel to $\\vec{v}$, you end up at the far corner of the parallelogram. The diagonal from the starting point to there is the sum.",
     "That diagonal is the difference $\\vec{u} - \\vec{v}$, not the sum.",
     "The side opposite $\\vec{v}$ is the same vector as $\\vec{v}$."
    ]
   },
   {
    "question": "What is true of the vector $-2\\vec{u}$ compared with $\\vec{u}$?",
    "choices": [
     "Half as long, same direction",
     "Twice as long, same direction",
     "Twice as long, opposite direction",
     "Equally long, opposite direction"
    ],
    "correct": 2,
    "why": [
     "The factor 2 makes the vector longer, not shorter. Half as long would have required the factor $\\dfrac{1}{2}$.",
     "The factor is negative, so the direction is reversed.",
     "The number $|{-2}| = 2$ gives twice the length and the minus sign reverses the direction. $\\vec{u}$ and $-2\\vec{u}$ are parallel.",
     "Equally long and pointing the opposite way is $-\\vec{u}$, that is, the factor $-1$."
    ]
   },
   {
    "question": "The vectors $\\vec{u}$ and $\\vec{v}$ are drawn from the same point. How is $\\vec{u} - \\vec{v}$ constructed?",
    "choices": [
     "As the vector from the tip of $\\vec{v}$ to the tip of $\\vec{u}$",
     "As the vector from the tip of $\\vec{u}$ to the tip of $\\vec{v}$",
     "As the diagonal from the common starting point",
     "As $\\vec{u}$ translated to the tip of $\\vec{v}$"
    ],
    "correct": 0,
    "why": [
     "If you follow $\\vec{v}$ and then $\\vec{u} - \\vec{v}$, you end up at the tip of $\\vec{u}$. That is exactly what the arrow from the tip of $\\vec{v}$ to the tip of $\\vec{u}$ does.",
     "That arrow is $\\vec{v} - \\vec{u}$, the opposite vector of $\\vec{u} - \\vec{v}$. The order of the subtraction decides the direction.",
     "The diagonal from the starting point is the sum $\\vec{u} + \\vec{v}$.",
     "Moving $\\vec{u}$ to the tip of $\\vec{v}$ is a step in the polygon method for the sum $\\vec{v} + \\vec{u}$."
    ]
   }
  ]
 },
 "maspec-4.2": {
  "kalla": "bbd32f8ba4",
  "data": [
   {
    "question": "The vector $\\vec{u} = 4\\vec{e}_x - 3\\vec{e}_y$ is given in an ON basis. What are the coordinates of the vector?",
    "choices": [
     "$(-3,\\ 4)$",
     "$(4,\\ -3)$",
     "$(4,\\ 3)$",
     "$(1,\\ 1)$"
    ],
    "correct": 1,
    "why": [
     "The $x$-coordinate comes first: the number in front of $\\vec{e}_x$ is written first.",
     "The numbers in front of the basis vectors are the coordinates: 4 along $\\vec{e}_x$ and $-3$ along $\\vec{e}_y$.",
     "The sign comes along: the component along $\\vec{e}_y$ is $-3\\vec{e}_y$.",
     "The basis vectors themselves have the coordinates $(1,\\ 0)$ and $(0,\\ 1)$, but $\\vec{u}$ consists of 4 times the one and $-3$ times the other."
    ]
   },
   {
    "question": "What characterises an ON basis?",
    "choices": [
     "The basis vectors are parallel and equally long",
     "The basis vectors point in the same direction",
     "The basis vectors are equally long but do not need to be perpendicular",
     "The basis vectors are perpendicular to each other and have length 1"
    ],
    "correct": 3,
    "why": [
     "Parallel vectors cannot form a basis at all: you can only reach vectors along a single line.",
     "Two vectors that point in the same direction are parallel and are not even good enough as a basis.",
     "Equal length is not enough. The letter O stands for orthogonal, that is, perpendicular.",
     "Orthonormal means exactly this: orthogonal (perpendicular) and normalised (length 1)."
    ]
   },
   {
    "question": "The vectors $\\vec{u} = (3,\\ -2)$ and $\\vec{v} = (-1,\\ 5)$ are given. What is $\\vec{u} + \\vec{v}$?",
    "choices": [
     "$(2,\\ 3)$",
     "$(4,\\ -7)$",
     "$(-3,\\ -10)$",
     "$(2,\\ -7)$"
    ],
    "correct": 0,
    "why": [
     "Coordinate by coordinate: $3 + (-1) = 2$ and $-2 + 5 = 3$.",
     "That is $\\vec{u} - \\vec{v}$, the difference.",
     "The coordinates are not multiplied together when vectors are added.",
     "The $x$-coordinate is right, but the $y$-coordinate should be $-2 + 5 = 3$."
    ]
   },
   {
    "question": "Which pair of vectors is parallel?",
    "choices": [
     "$(2,\\ 3)$ and $(3,\\ 2)$",
     "$(2,\\ 3)$ and $(4,\\ 5)$",
     "$(2,\\ 3)$ and $(-4,\\ -6)$",
     "$(2,\\ 3)$ and $(2,\\ -3)$"
    ],
    "correct": 2,
    "why": [
     "The coordinates have swapped places, but no factor $k$ gives $2k = 3$ and $3k = 2$ at the same time.",
     "$4 = 2 \\cdot 2$ but $5 \\neq 2 \\cdot 3$. Both coordinates must be multiplied by the same number.",
     "$(-4,\\ -6) = -2 \\cdot (2,\\ 3)$. The vectors are parallel and point in opposite directions.",
     "Changing the sign of only one coordinate reflects the vector in an axis, and the reflection is not parallel to the original."
    ]
   },
   {
    "question": "The points $P_1 = (1,\\ 4)$ and $P_2 = (5,\\ 2)$ are given. What is $\\overrightarrow{P_1P_2}$?",
    "choices": [
     "$(6,\\ 6)$",
     "$(-4,\\ 2)$",
     "$(5,\\ 8)$",
     "$(4,\\ -2)$"
    ],
    "correct": 3,
    "why": [
     "The coordinates of the points should not be added. The vector is the difference between them.",
     "That is $\\overrightarrow{P_2P_1}$, the vector in the other direction.",
     "The coordinates are not multiplied together.",
     "End point minus starting point: $(5 - 1,\\ 2 - 4) = (4,\\ -2)$."
    ]
   },
   {
    "question": "How is the length of $\\vec{u} = (x,\\ y)$ calculated in an ON basis?",
    "choices": [
     "$|\\vec{u}| = x + y$",
     "$|\\vec{u}| = \\sqrt{x^2 + y^2}$",
     "$|\\vec{u}| = x^2 + y^2$",
     "$|\\vec{u}| = |x| \\cdot |y|$"
    ],
    "correct": 1,
    "why": [
     "The sum of the legs is not the hypotenuse. For $(3,\\ 4)$ it would have given 7 instead of 5.",
     "The coordinates are the legs of a right-angled triangle with the vector as its hypotenuse, and Pythagoras' theorem gives the length.",
     "That is the square of the length. The square root is missing.",
     "The product of the coordinates has nothing to do with the length."
    ]
   }
  ]
 }
});
