/* Engelsk översättning av ovningar (ma2). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "ma2c-1.1": {
  "kalla": "cc1da371f3",
  "data": [
   {
    "level": 1,
    "question": "Two lines are drawn in the coordinate system below. What is the solution to the system of equations formed by the lines?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">x</tspan></text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">y</tspan></text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text></g><path d=\"M 60.0 246.7 L 460.0 30.0\" stroke=\"#2563c9\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M 60.0 73.3 L 460.0 290.0\" stroke=\"#4a7d3a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "choices": [
     "$x = 0$ and $y = 1$",
     "$x = 2$ and $y = 3$",
     "$x = 0$ and $y = 5$",
     "$x = 3$ and $y = 2$"
    ],
    "correct": 1,
    "solution": "The solution to the system of equations is the coordinates of the point of intersection. The lines intersect at the point (2, 3), so the $x$-coordinate is the solution for $x$ and the $y$-coordinate is the solution for $y$.\n\n**Answer:** $x = 2$ and $y = 3$"
   },
   {
    "level": 1,
    "question": "Which pair of numbers is a solution to the system of equations\n$$\n\\begin{cases}\ny = 2x \\\\\ny = x + 3\n\\end{cases}\n$$",
    "choices": [
     "$x = 3$, $y = 6$",
     "$x = 2$, $y = 4$",
     "$x = 1$, $y = 4$",
     "$x = 0$, $y = 0$"
    ],
    "correct": 0,
    "solution": "A solution to a system of equations must fit **both** equations at the same time. Test the pair of numbers in both:\n\n$x = 3$, $y = 6$: the first equation gives $y = 2 \\cdot 3 = 6$ (correct), the second gives $y = 3 + 3 = 6$ (correct).\n\nThe other pairs fit only one of the equations. For example, $x = 2$, $y = 4$ fits $y = 2x$ but not $y = x + 3$ (which gives 5).\n\n**Answer:** $x = 3$, $y = 6$"
   },
   {
    "level": 1,
    "question": "How many solutions does the system of equations\n$$\n\\begin{cases}\ny = 4x + 1 \\\\\ny = 4x - 3\n\\end{cases}\n$$\nhave?",
    "answer": {
     "value": 0,
     "unit": ""
    },
    "solution": "Both lines have the same $k$-value (4) but different $m$-values (1 and −3 respectively). The lines are therefore parallel and never intersect, so the system has no solutions.\n\n**Answer:** 0 solutions (the lines are parallel)"
   },
   {
    "level": 2,
    "question": "How many solutions does the system of equations\n$$\n\\begin{cases}\ny = 2x + 3 \\\\\n2y = 4x + 6\n\\end{cases}\n$$\nhave?",
    "choices": [
     "Infinitely many solutions",
     "Exactly one solution",
     "No solutions",
     "Exactly two solutions"
    ],
    "correct": 0,
    "solution": "Write the second equation in the form $y = kx + m$ by dividing both sides by 2:\n\n$$ 2y = 4x + 6 \\iff y = 2x + 3 $$\n\nThis is the **same line** as the first equation: the same $k$-value and the same $m$-value. Every point on the line is a common solution, so the system has infinitely many solutions.\n\n**Answer:** Infinitely many solutions"
   },
   {
    "level": 2,
    "question": "Determine the number $a$ so that the system of equations\n$$\n\\begin{cases}\ny = ax - 1 \\\\\ny = (2a - 3)x + 4\n\\end{cases}\n$$\nhas no solutions.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "The system has no solutions when the lines are parallel: the same $k$-value but different $m$-values.\n\nThe $m$-values are already different (−1 and 4), so the condition is that the $k$-values are equal:\n\n$$ a = 2a - 3 $$\n\n$$ 3 = 2a - a = a $$\n\nCheck: $a = 3$ gives the lines $y = 3x - 1$ and $y = 3x + 4$, which are parallel with no common points.\n\n**Answer:** $a = 3$"
   },
   {
    "level": 3,
    "question": "The lines $y = x + 1$, $y = 3 - x$ and $y = kx + 5$ intersect at **one and the same point**. Determine $k$.",
    "answer": {
     "value": -3,
     "unit": ""
    },
    "solution": "The key insight: the common point must be the point of intersection of the first two lines. The third line must then pass through exactly that point.\n\n**Step 1.** The intersection of $y = x + 1$ and $y = 3 - x$:\n\n$$ x + 1 = 3 - x $$\n\n$$ 2x = 2 \\iff x = 1 $$\n\nwhich gives $y = 1 + 1 = 2$. The common point is therefore (1, 2).\n\n**Step 2.** The line $y = kx + 5$ must pass through (1, 2). Substitution:\n\n$$ 2 = k \\cdot 1 + 5 $$\n\n$$ k = 2 - 5 = -3 $$\n\nCheck: $y = -3x + 5$ gives $y = -3 + 5 = 2$ at $x = 1$. Correct!\n\n**Answer:** $k = -3$"
   }
  ]
 },
 "ma2c-1.2": {
  "kalla": "06cb1d3de2",
  "data": [
   {
    "level": 1,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\ny = x + 1 \\\\\ny = 2x - 3\n\\end{cases}\n$$\nusing the substitution method and give $x$.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "solution": "Both equations have $y$ isolated, so replace $y$ in one of them with the expression from the other:\n\n$$ x + 1 = 2x - 3 $$\n\nCollect $x$ on one side:\n\n$$ 1 + 3 = 2x - x $$\n\n$$ x = 4 $$\n\n**Answer:** $x = 4$"
   },
   {
    "level": 1,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\ny = 5x \\\\\nx + y = 12\n\\end{cases}\n$$\nand give $y$.",
    "answer": {
     "value": 10,
     "unit": ""
    },
    "solution": "According to the upper equation, $y = 5x$. Substitute into the lower one:\n\n$$ x + 5x = 12 $$\n\n$$ 6x = 12 \\iff x = 2 $$\n\nSubstituting $x = 2$ into $y = 5x$ gives\n\n$$ y = 5 \\cdot 2 = 10 $$\n\n**Answer:** $y = 10$"
   },
   {
    "level": 1,
    "question": "The system of equations\n$$\n\\begin{cases}\nx = 2y + 1 \\\\\n3x + y = 17\n\\end{cases}\n$$\nis to be solved using the substitution method. Which equation do you get after the substitution?",
    "choices": [
     "$3(2y + 1) + y = 17$",
     "$3x + 2y + 1 = 17$",
     "$2y + 1 + y = 17$",
     "$3(2y + 1) = 17$"
    ],
    "correct": 0,
    "solution": "The upper equation says that $x$ is equal to the expression $2y + 1$. Replace $x$ with the **whole** expression in the lower equation. The brackets are needed because the whole expression is to be multiplied by 3:\n\n$$ 3(2y + 1) + y = 17 $$\n\n**Answer:** $3(2y + 1) + y = 17$"
   },
   {
    "level": 2,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\n2x + 3y = 12 \\\\\nx - y = 1\n\\end{cases}\n$$\nand give $x$.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "Solve for $x$ in the lower equation (easiest, since the coefficient is 1):\n\n$$ x = 1 + y $$\n\nSubstitute into the upper one:\n\n$$ 2(1 + y) + 3y = 12 $$\n\n$$ 2 + 2y + 3y = 12 $$\n\n$$ 2 + 5y = 12 \\iff 5y = 10 \\iff y = 2 $$\n\nSubstituting $y = 2$ into $x = 1 + y$ gives $x = 3$.\n\nCheck in the upper equation: $2 \\cdot 3 + 3 \\cdot 2 = 12$. Correct!\n\n**Answer:** $x = 3$"
   },
   {
    "level": 2,
    "question": "The system of equations\n$$\n\\begin{cases}\ny = 2x + a \\\\\n3x + y = 18\n\\end{cases}\n$$\nhas a solution where $x = 2$. Determine the number $a$.",
    "answer": {
     "value": 8,
     "unit": ""
    },
    "solution": "Substitute $x = 2$ into the lower equation to first find $y$:\n\n$$ 3 \\cdot 2 + y = 18 \\iff y = 12 $$\n\nThe solution is therefore $x = 2$, $y = 12$. It must also fit the upper equation:\n\n$$ 12 = 2 \\cdot 2 + a $$\n\n$$ a = 12 - 4 = 8 $$\n\n**Answer:** $a = 8$"
   },
   {
    "level": 3,
    "question": "For which value of $c$ does the system of equations\n$$\n\\begin{cases}\n2x + y = 5 \\\\\n4x + 2y = c\n\\end{cases}\n$$\nhave infinitely many solutions?",
    "answer": {
     "value": 10,
     "unit": ""
    },
    "solution": "The key insight: infinitely many solutions require that the two equations describe **the same line**.\n\nTry the substitution method: solve for $y = 5 - 2x$ in the upper equation and substitute into the lower one:\n\n$$ 4x + 2(5 - 2x) = c $$\n\n$$ 4x + 10 - 4x = c $$\n\n$$ 10 = c $$\n\nAll the $x$-terms disappear! If $c = 10$ the equation becomes $10 = 10$, which is true for **all** $x$, so every point on the line $y = 5 - 2x$ is a solution (infinitely many).\n\nIf $c \\neq 10$ the equation becomes a contradiction (for example $10 = 7$), and then there are no solutions at all (parallel lines).\n\n**Answer:** $c = 10$"
   }
  ]
 },
 "ma2c-1.3": {
  "kalla": "c9df965094",
  "data": [
   {
    "level": 1,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\nx + y = 11 \\\\\nx - y = 3\n\\end{cases}\n$$\nusing the elimination method and give $x$.",
    "answer": {
     "value": 7,
     "unit": ""
    },
    "solution": "The terms $+y$ and $-y$ cancel each other out when the equations are added side by side:\n\n$$ (x + y) + (x - y) = 11 + 3 $$\n\n$$ 2x = 14 \\iff x = 7 $$\n\n**Answer:** $x = 7$"
   },
   {
    "level": 1,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\n2x + 3y = 12 \\\\\n4x - 3y = 6\n\\end{cases}\n$$\nand give $y$.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "solution": "Adding side by side eliminates the $y$-terms:\n\n$$ 6x = 18 \\iff x = 3 $$\n\nSubstituting $x = 3$ into the upper equation:\n\n$$ 2 \\cdot 3 + 3y = 12 $$\n\n$$ 3y = 6 \\iff y = 2 $$\n\n**Answer:** $y = 2$"
   },
   {
    "level": 1,
    "question": "What happens when the equations in the system\n$$\n\\begin{cases}\n5x - 2y = 4 \\\\\n3x + 2y = 12\n\\end{cases}\n$$\nare added side by side?",
    "choices": [
     "Both variables are eliminated, leaving $0 = 16$",
     "The $x$-terms are eliminated, leaving $4y = 16$",
     "The $y$-terms are eliminated, leaving $8x = 16$",
     "No variable is eliminated, you have to multiply first"
    ],
    "correct": 2,
    "solution": "The terms $-2y$ and $+2y$ are the same variable term with different signs, so they cancel each other out when the equations are added side by side:\n\n$$ (5x - 2y) + (3x + 2y) = 4 + 12 $$\n\n$$ 8x = 16 $$\n\n(which gives $x = 2$).\n\n**Answer:** The $y$-terms are eliminated, leaving $8x = 16$"
   },
   {
    "level": 2,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\n3x + 2y = 20 \\\\\nx - y = 5\n\\end{cases}\n$$\nusing the elimination method and give $x$.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "Multiply the lower equation by 2 so that the $y$-terms get the same coefficient with different signs:\n\n$$\n\\begin{cases}\n3x + 2y = 20 \\\\\n2x - 2y = 10\n\\end{cases}\n$$\n\nAdding side by side:\n\n$$ 5x = 30 \\iff x = 6 $$\n\n(Substituting into $x - y = 5$ gives $y = 1$.)\n\n**Answer:** $x = 6$"
   },
   {
    "level": 2,
    "question": "Solve the system of equations\n$$\n\\begin{cases}\n3x + 4y = 25 \\\\\n2x + 3y = 18\n\\end{cases}\n$$\nand give $y$.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "solution": "Here it is not enough to multiply one equation, so multiply both. To eliminate $x$: multiply the upper one by 2 and the lower one by −3 (each other's coefficients, different signs):\n\n$$\n\\begin{cases}\n6x + 8y = 50 \\\\\n-6x - 9y = -54\n\\end{cases}\n$$\n\nAdding side by side:\n\n$$ -y = -4 \\iff y = 4 $$\n\n(Substituting into the original lower equation: $2x + 12 = 18$ gives $x = 3$.)\n\n**Answer:** $y = 4$"
   },
   {
    "level": 3,
    "question": "The system of equations\n$$\n\\begin{cases}\nax + by = 7 \\\\\n2ax - by = 8\n\\end{cases}\n$$\nhas the solution $x = 1$, $y = 2$. Determine the number $a$.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "The key insight: substitute the known solution. Then $a$ and $b$ become the unknowns, and we get a **new system of equations in $a$ and $b$**.\n\nSubstituting $x = 1$, $y = 2$:\n\n$$\n\\begin{cases}\na + 2b = 7 \\\\\n2a - 2b = 8\n\\end{cases}\n$$\n\nThe terms $+2b$ and $-2b$ are eliminated with the elimination method:\n\n$$ 3a = 15 \\iff a = 5 $$\n\n(Substitution gives $2b = 7 - 5 = 2$, that is $b = 1$.)\n\nCheck in the original lower equation: $2 \\cdot 5 \\cdot 1 - 1 \\cdot 2 = 10 - 2 = 8$. Correct!\n\n**Answer:** $a = 5$"
   }
  ]
 },
 "ma2c-1.4": {
  "kalla": "a864ee6f00",
  "data": [
   {
    "level": 1,
    "question": "Two numbers have the sum 25 and the difference 9. Determine the larger number.",
    "answer": {
     "value": 17,
     "unit": ""
    },
    "solution": "Call the larger number $x$ and the smaller $y$:\n\n$$\n\\begin{cases}\nx + y = 25 \\\\\nx - y = 9\n\\end{cases}\n$$\n\nThe elimination method eliminates $y$:\n\n$$ 2x = 34 \\iff x = 17 $$\n\n(The smaller number is $y = 25 - 17 = 8$; check: $17 - 8 = 9$. Correct!)\n\n**Answer:** The larger number is 17."
   },
   {
    "level": 1,
    "question": "An adult ticket costs 120 kr and a child ticket 60 kr. A family bought 10 tickets for a total of 900 kr. How many adult tickets did the family buy?",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "Define variables: $v$ = the number of adult tickets, $b$ = the number of child tickets.\n\n$$\n\\begin{cases}\nv + b = 10 \\\\\n120v + 60b = 900\n\\end{cases}\n$$\n\nSolve for $b = 10 - v$ in the upper equation and substitute:\n\n$$ 120v + 60(10 - v) = 900 $$\n\n$$ 120v + 600 - 60v = 900 $$\n\n$$ 60v = 300 \\iff v = 5 $$\n\n**Answer:** The family bought 5 adult tickets."
   },
   {
    "level": 1,
    "question": "A box of fruit contains $x$ kg of apples and $y$ kg of pears. The fruit weighs 7 kg in total, and the apples weigh 3 kg more than the pears. Which system of equations describes the situation?",
    "choices": [
     "$\\begin{cases} x + y = 7 \\\\ x = y + 3 \\end{cases}$",
     "$\\begin{cases} x + y = 7 \\\\ y = x + 3 \\end{cases}$",
     "$\\begin{cases} x - y = 7 \\\\ x + y = 3 \\end{cases}$",
     "$\\begin{cases} x + y = 3 \\\\ x - y = 7 \\end{cases}$"
    ],
    "correct": 0,
    "solution": "The total weight gives the first equation: $x + y = 7$.\n\n\"The apples weigh 3 kg **more** than the pears\" means that the weight of the apples is the weight of the pears plus 3: $x = y + 3$.\n\n(A common trap: writing $y = x + 3$, which would mean that the pears weigh the most.)\n\n**Answer:** $x + y = 7$ and $x = y + 3$"
   },
   {
    "level": 2,
    "question": "In an enclosure there are rabbits and pheasants. Together the animals have 35 heads and 94 legs. How many rabbits are there in the enclosure?",
    "answer": {
     "value": 12,
     "unit": ""
    },
    "solution": "Define variables: $k$ = the number of rabbits, $f$ = the number of pheasants. Each animal has 1 head; rabbits have 4 legs and pheasants 2 legs:\n\n$$\n\\begin{cases}\nk + f = 35 \\\\\n4k + 2f = 94\n\\end{cases}\n$$\n\nSolve for $f = 35 - k$ and substitute:\n\n$$ 4k + 2(35 - k) = 94 $$\n\n$$ 4k + 70 - 2k = 94 $$\n\n$$ 2k = 24 \\iff k = 12 $$\n\nInterpret: 12 rabbits (and $f = 23$ pheasants; check: $48 + 46 = 94$ legs. Correct!)\n\n**Answer:** 12 rabbits"
   },
   {
    "level": 2,
    "question": "Today Anna is 4 times as old as her son. In 20 years she will be twice as old as her son. How old is Anna today?",
    "answer": {
     "value": 40,
     "unit": "years"
    },
    "solution": "Define variables: $A$ = Anna's age today, $S$ = the son's age today.\n\nToday: $A = 4S$. In 20 years Anna will be $A + 20$ and the son $S + 20$, and then $A + 20 = 2(S + 20)$:\n\n$$\n\\begin{cases}\nA = 4S \\\\\nA + 20 = 2(S + 20)\n\\end{cases}\n$$\n\nSubstitute $A = 4S$ into the lower equation:\n\n$$ 4S + 20 = 2S + 40 $$\n\n$$ 2S = 20 \\iff S = 10 $$\n\nwhich gives $A = 4 \\cdot 10 = 40$.\n\nCheck: in 20 years Anna will be 60 and the son 30, so she is twice as old. Correct!\n\n**Answer:** Anna is 40 years old."
   },
   {
    "level": 3,
    "question": "A shopkeeper mixes coffee that costs 80 kr/kg with coffee that costs 120 kr/kg. The mixture is to weigh 10 kg and cost 95 kr/kg. How many kilograms of the more expensive coffee should the shopkeeper use? Answer in kg.",
    "answer": {
     "value": 3.75,
     "unit": "kg"
    },
    "solution": "The key insight: there are **two** conditions hidden in the text, one for the weight and one for the **total value**. The price per kg of the mixture applies to the whole mixture, so the total value is $10 \\cdot 95 = 950$ kr.\n\nDefine variables: $x$ = kg of cheap coffee, $y$ = kg of expensive coffee.\n\n$$\n\\begin{cases}\nx + y = 10 \\\\\n80x + 120y = 950\n\\end{cases}\n$$\n\nSolve for $x = 10 - y$ and substitute:\n\n$$ 80(10 - y) + 120y = 950 $$\n\n$$ 800 - 80y + 120y = 950 $$\n\n$$ 40y = 150 \\iff y = 3.75 $$\n\nReasonableness: 95 kr/kg is closer to 80 than to 120, so less than half should be expensive coffee: $3.75 < 5$. Correct!\n\n**Answer:** $3.75$ kg of the more expensive coffee"
   }
  ]
 }
});
