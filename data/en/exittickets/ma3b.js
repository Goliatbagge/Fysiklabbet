/* Engelsk översättning av exittickets (ma3b). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "ma3b-2.1": {
  "kalla": "d1d63401b5",
  "data": [
   {
    "question": "Which region is described by the inequality $y < 3x - 2$?",
    "choices": [
     "The half-plane above the line $y = 3x - 2$",
     "The half-plane below the line $y = 3x - 2$, where the line itself belongs to the region",
     "The half-plane below the line $y = 3x - 2$, where the line itself does not belong to the region",
     "Only the points that lie on the line $y = 3x - 2$"
    ],
    "correct": 2,
    "why": [
     "Above the line $y$ is greater than $3x - 2$. That would be described by $y > 3x - 2$.",
     "The line only belongs to the region with $\\leq$ or $\\geq$. The sign $<$ excludes the line.",
     "Less than means below the line, and with $<$ the line does not belong to the region. It is drawn dashed.",
     "The points on the line satisfy $y = 3x - 2$, which is an equality. An inequality describes a whole half-plane."
    ]
   },
   {
    "question": "How is the boundary line of the inequality $y \\geq -x + 4$ drawn?",
    "choices": [
     "Solid, since the line belongs to the region",
     "Dashed, since the line does not belong to the region",
     "Dashed, since $k$ is negative",
     "It is not drawn at all; only the region is shaded"
    ],
    "correct": 0,
    "why": [
     "With $\\geq$ equality is included, so the points on the line belong to the region. That is why the line is drawn solid.",
     "The line is only drawn dashed with $<$ and $>$. Here it says $\\geq$.",
     "Whether the line is drawn dashed or solid depends on the inequality sign, not on the slope.",
     "The boundary line is needed to show where the region ends, and whether the edge belongs to the region or not."
    ]
   },
   {
    "question": "A region is described by $2x - 3y > 6$. Does the origin $(0, 0)$ lie in the region?",
    "choices": [
     "Yes, since the origin always lies in the region",
     "Yes, since $2 \\cdot 0 - 3 \\cdot 0 = 0$",
     "It cannot be decided without drawing the figure",
     "No, since $0 > 6$ is not true"
    ],
    "correct": 3,
    "why": [
     "The origin is just a convenient test point. It can lie both inside and outside the region.",
     "The left-hand side becomes 0, but that is not enough. It must also be greater than 6, and it is not.",
     "It can be decided by substituting the point into the inequality. That is exactly what the test point is for.",
     "Substitution gives $0 > 6$, which is not true. So the origin does not lie in the region, and the region lies on the other side of the line."
    ]
   },
   {
    "question": "What is a corner point (vertex) of a region described by a system of inequalities?",
    "choices": [
     "The point in the region that lies closest to the origin",
     "A point of intersection between two of the boundary lines",
     "A point where a boundary line crosses the *y*-axis",
     "The point that lies in the middle of the region"
    ],
    "correct": 1,
    "why": [
     "The origin can be a corner point, but there are usually more corners, and closeness to the origin does not decide the matter.",
     "At a corner two boundary lines meet. The corner is therefore calculated with a system of equations made of the lines' equations.",
     "An intersection with the *y*-axis is a corner only if the *y*-axis itself is a boundary line, for example with $x \\geq 0$.",
     "The midpoint lies inside the region. The corners lie on the edge, where two boundary lines meet."
    ]
   },
   {
    "question": "What do the conditions $x \\geq 0$ and $y \\geq 0$ mean together?",
    "choices": [
     "The region lies below the *x*-axis",
     "The region consists only of the origin",
     "The region lies in the first quadrant, to the right of the *y*-axis and above the *x*-axis",
     "The region lies between the lines $y = x$ and $y = -x$"
    ],
    "correct": 2,
    "why": [
     "Below the *x*-axis $y$ is negative, but the condition says that $y$ is at least 0.",
     "The origin satisfies the conditions, but so do all other points where both coordinates are positive.",
     "Both coordinates may be 0 or positive. That is the first quadrant, and in practical problems it means that the quantities cannot be negative.",
     "The lines $y = x$ and $y = -x$ have nothing to do with the conditions. The boundaries are the axes themselves."
    ]
   }
  ]
 },
 "ma3b-2.2": {
  "kalla": "192735d6d2",
  "data": [
   {
    "question": "In linear optimisation, what is the function that is to be made as large or as small as possible called, for example the profit $V = 400x + 500y$?",
    "choices": [
     "Constraint",
     "Level line",
     "Feasible region",
     "Objective function"
    ],
    "correct": 3,
    "why": [
     "The constraints are the limitations, written as inequalities. They are not what we maximise.",
     "A level line is the set of points where the objective function has a certain value, not the function itself.",
     "The feasible region is all the points where the constraints hold. That is where we look for the best value.",
     "The objective function is the quantity to be optimised, for example profit or cost."
    ]
   },
   {
    "question": "Where does the objective function take its largest value when the feasible region is bounded?",
    "choices": [
     "At one of the corner points of the region",
     "Always at the origin",
     "At the midpoint of the region",
     "Where a boundary line crosses the *x*-axis"
    ],
    "correct": 0,
    "why": [
     "That is the corner point method: the last point a level line touches when it is moved parallel to itself is a corner.",
     "At the origin both $x$ and $y$ are zero. There a profit is usually smallest, not largest.",
     "The midpoint lies inside the region. A level line through it still cuts the region, so there are better points.",
     "Such a point can be a corner, but it is not always the best one. All the corners must be compared."
    ]
   },
   {
    "question": "A furniture maker has at most 10 hours for painting per week. A chair takes 1 hour and a table 1 hour to paint. How is the constraint written if $x$ is the number of chairs and $y$ the number of tables?",
    "choices": [
     "$x + y \\geq 10$",
     "$x + y \\leq 10$",
     "$x + y = 10$",
     "$10x + 10y \\leq 1$"
    ],
    "correct": 1,
    "why": [
     "At most 10 hours means that the time may be 10 or less, not at least 10.",
     "The painting takes $x + y$ hours, and that time may be at most 10 hours.",
     "The furniture maker does not have to use exactly 10 hours. It is enough that the time does not exceed 10 hours.",
     "Each chair and table takes 1 hour, so the time is $1 \\cdot x + 1 \\cdot y$. The number 10 is the limit, not the time per piece of furniture."
    ]
   },
   {
    "question": "What applies to the level lines $2x + 3y = z$ for different values of $z$?",
    "choices": [
     "They all intersect each other at the origin",
     "They are vertical",
     "They are parallel and move further up to the right as $z$ increases",
     "Their slope increases as $z$ increases"
    ],
    "correct": 2,
    "why": [
     "Only the level line $z = 0$ passes through the origin. The others are shifted.",
     "Solving for $y$ gives $y = \\dfrac{z - 2x}{3}$. That is a sloping line, not a vertical one.",
     "The slope is always $-\\dfrac{2}{3}$, and only the intersection with the *y*-axis, $\\dfrac{z}{3}$, changes. The lines are therefore parallel.",
     "The slope depends only on the coefficients 2 and 3, not on $z$."
    ]
   },
   {
    "question": "The objective function gives exactly the same largest value at two corners next to each other. What applies then?",
    "choices": [
     "The task has no solution",
     "All the points on the edge between the two corners give the same largest value",
     "You should choose the corner closest to the origin",
     "The largest value is instead in the middle of the region"
    ],
    "correct": 1,
    "why": [
     "On the contrary, there are many solutions, since several points give the same best value.",
     "The level line is then parallel to the edge between the corners, so the whole edge gives the same value. If the answer has to be whole numbers, several points on the edge can be equally good.",
     "Both corners give the same amount, so there is no reason to prefer one of them. The points in between also give the same value.",
     "Inside the region the objective function is smaller than at the edge. The largest value is on the edge."
    ]
   }
  ]
 },
 "ma3b-2.7": {
  "kalla": "a5c2c88491",
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
     "A continuous graph is connected at the point, without jumps or breaks.",
     "A function can be continuous even if it is negative. The sign of the function value does not matter."
    ]
   },
   {
    "question": "For which value of $x$ is the function $f(x) = \\dfrac{3}{x - 1}$ not differentiable?",
    "choices": [
     "$x = 3$",
     "$x = 1$",
     "$x = 0$",
     "$x = -1$"
    ],
    "correct": 1,
    "why": [
     "The number 3 is in the numerator. It is the denominator that must not become 0.",
     "For $x = 1$ the denominator becomes $1 - 1 = 0$. There the function is not defined, the graph has a break and the derivative does not exist.",
     "For $x = 0$, $f(0) = \\dfrac{3}{-1} = -3$, so the function is defined and differentiable there.",
     "For $x = -1$ the denominator becomes $-2$, not 0. The function is defined and differentiable there."
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
     "If the function is already differentiable at the point, the derivative of course exists there. That is the opposite of a reason for having no derivative.",
     "A function that is not defined at a point cannot have a derivative there either.",
     "A discontinuous function (for example with a jump) cannot have a well-defined derivative at that point.",
     "At a corner the slope is different from the left and from the right, so the derivative has no unique value."
    ]
   },
   {
    "question": "A graph consists of the line $y = -x$ to the left of the origin and the line $y = x$ to the right of the origin. Why is the function not differentiable at $x = 0$?",
    "choices": [
     "Because the function value is 0 at $x = 0$",
     "Because the function is not defined at $x = 0$",
     "Because the graph has a jump at $x = 0$",
     "Because the slope is $-1$ from the left and $1$ from the right, so the limits are different"
    ],
    "correct": 3,
    "why": [
     "That the function value is 0 only tells you where the graph goes. It says nothing about why the derivative is missing.",
     "Both lines pass through the origin, so the function is defined at $x = 0$ with the value 0.",
     "The lines meet at the origin, so the graph is connected. It has a corner, not a jump.",
     "The left-hand and right-hand limits of the slope differ, so there is no unique tangent at the corner."
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
     "A jump means that the graph is not connected, so the function is not even continuous at $x = 2$.",
     "The open circle shows that the graph approaches 5 from one side while the function value (filled dot) is 3. The graph is not connected: it is a jump. Then the function is neither continuous nor differentiable at the point.",
     "On the contrary, the filled dot at $(2, 3)$ shows that the function is defined at $x = 2$, with the value 3."
    ]
   }
  ]
 },
 "ma3b-6.1": {
  "kalla": "13cede4af3",
  "data": [
   {
    "question": "In the sequence $3,\\ 7,\\ 11,\\ 15,\\ \\ldots$, what does $a_3$ mean?",
    "choices": [
     "The third term, that is 11",
     "The first term times 3, that is 9",
     "The sum of the first three terms, that is 21",
     "The number 3 raised to the term's number"
    ],
    "correct": 0,
    "why": [
     "The index 3 is the position number of the term. The third number in the sequence is 11.",
     "The index states which term is meant, not that something is to be multiplied by 3.",
     "A sum of terms is not written like that. $a_3$ is just a single term, the third.",
     "The index is a position number and has nothing to do with powers."
    ]
   },
   {
    "question": "A sequence is given by $a_n = 5n - 2$. What is $a_{10}$?",
    "choices": [
     "$50$",
     "$52$",
     "$48$",
     "$43$"
    ],
    "correct": 2,
    "why": [
     "That is only $5 \\cdot 10$. Do not forget to subtract 2.",
     "The term 2 should be subtracted, not added: $5 \\cdot 10 - 2$.",
     "Substituting $n = 10$ gives $a_{10} = 5 \\cdot 10 - 2 = 48$.",
     "That is what you get if you calculate $5 \\cdot (10 - 1) - 2$. The formula is closed, so $n = 10$ is substituted directly."
    ]
   },
   {
    "question": "The sequence is given recursively by $a_1 = 4$ and $a_{n+1} = 3 \\cdot a_n$. What is $a_3$?",
    "choices": [
     "$12$",
     "$10$",
     "$64$",
     "$36$"
    ],
    "correct": 3,
    "why": [
     "That is $a_2 = 3 \\cdot 4 = 12$. One more step is needed to reach $a_3$.",
     "That is what you get if you add 3 each time. The formula says that the term is to be multiplied by 3.",
     "That is $4^3$. The formula multiplies by 3 in each step; it does not raise to a power.",
     "Each term is the previous one times 3: $a_2 = 3 \\cdot 4 = 12$ and $a_3 = 3 \\cdot 12 = 36$."
    ]
   },
   {
    "question": "What type of sequence is $20,\\ 17,\\ 14,\\ 11,\\ \\ldots$?",
    "choices": [
     "Geometric with the common ratio $-3$",
     "Arithmetic with the common difference $-3$",
     "Geometric with the common ratio $\\dfrac{17}{20}$",
     "Neither arithmetic nor geometric"
    ],
    "correct": 1,
    "why": [
     "A common ratio of $-3$ would give $20, -60, 180, \\ldots$ with alternating signs. Here the terms decrease by 3 each time.",
     "The same number, $-3$, is added each time: $17 - 20 = 14 - 17 = 11 - 14 = -3$.",
     "The quotient $\\dfrac{14}{17}$ is not equal to $\\dfrac{17}{20}$, so the ratio is not constant.",
     "The difference is constant, $-3$, so the sequence is arithmetic."
    ]
   },
   {
    "question": "The number of sticks in figure $n$ of a pattern is $a_n = 2n + 1$. Is it possible to build a figure from exactly 60 sticks?",
    "choices": [
     "Yes, figure 30",
     "Yes, figure 29",
     "No, since $2n + 1 = 60$ gives $n = 29.5$, which is not a whole number",
     "No, since 60 is larger than all the terms of the sequence"
    ],
    "correct": 2,
    "why": [
     "Figure 30 has $2 \\cdot 30 + 1 = 61$ sticks.",
     "Figure 29 has $2 \\cdot 29 + 1 = 59$ sticks.",
     "The position number must be a whole number. The number of sticks is always odd, so 60 can never occur.",
     "The sequence keeps growing, so it passes 60. But it jumps from 59 to 61."
    ]
   }
  ]
 },
 "ma3b-6.2": {
  "kalla": "69aad02c92",
  "data": [
   {
    "question": "What is the common ratio $k$ in the geometric sequence $2,\\ 10,\\ 50,\\ 250,\\ \\ldots$?",
    "choices": [
     "$8$",
     "$5$",
     "$\\dfrac{1}{5}$",
     "$2$"
    ],
    "correct": 1,
    "why": [
     "That is the difference between the first two terms. In a geometric sequence you should divide.",
     "The common ratio is $k = \\dfrac{a_2}{a_1} = \\dfrac{10}{2} = 5$, and $\\dfrac{50}{10} = 5$ as well.",
     "That is $\\dfrac{a_1}{a_2}$. The ratio is found when a term is divided by the term before it.",
     "That is the first term, not the common ratio."
    ]
   },
   {
    "question": "A geometric sequence has $a_1 = 3$ and $k = 2$. What is $a_5$?",
    "choices": [
     "$96$",
     "$30$",
     "$11$",
     "$48$"
    ],
    "correct": 3,
    "why": [
     "That is $3 \\cdot 2^5$. The exponent should be $n - 1 = 4$, since the first term has not been multiplied by $k$.",
     "That is $3 \\cdot 2 \\cdot 5$. The ratio should be raised to the power $n - 1$, not multiplied by $n$.",
     "That is what you get in an arithmetic sequence with the common difference 2. Here you should multiply.",
     "$a_5 = a_1 \\cdot k^{5-1} = 3 \\cdot 2^4 = 3 \\cdot 16 = 48$."
    ]
   },
   {
    "question": "In a geometric sequence $a_2 = 5$ and $a_5 = 40$. Which equation gives the common ratio $k$?",
    "choices": [
     "$40 = 5 \\cdot k^3$",
     "$40 = 5 \\cdot k^5$",
     "$40 = 5 + 3k$",
     "$40 = 5 \\cdot k^4$"
    ],
    "correct": 0,
    "why": [
     "From $a_2$ to $a_5$ there are $5 - 2 = 3$ steps, so $a_5 = a_2 \\cdot k^3$. That gives $k^3 = 8$ and $k = 2$.",
     "The exponent should be the number of steps between the terms, $5 - 2 = 3$, not the position number 5.",
     "That applies to an arithmetic sequence. In a geometric sequence the terms are multiplied by the common ratio.",
     "The exponent 4 applies to the step from $a_1$ to $a_5$. Here we start at $a_2$."
    ]
   },
   {
    "question": "A salary of 30 000 kr in year 1 is raised by 2 % per year. Which expression gives the salary in year $n$?",
    "choices": [
     "$30\\,000 \\cdot 1.02^{n}$",
     "$30\\,000 \\cdot 0.02^{n-1}$",
     "$30\\,000 \\cdot 1.02^{n-1}$",
     "$30\\,000 + 0.02(n - 1)$"
    ],
    "correct": 2,
    "why": [
     "With the exponent $n$ the salary in year 1 would already be $30\\,000 \\cdot 1.02$, but in year 1 the salary has not been raised yet.",
     "The ratio should be the change factor 1.02, not 0.02. With 0.02 the salary would shrink to almost nothing.",
     "The ratio is the change factor 1.02, and in year $n$ the salary has been raised $n - 1$ times.",
     "That is not how a percentage change increases. The salary is multiplied by 1.02 every year."
    ]
   },
   {
    "question": "How does a geometric sequence with $a_1 = 100$ and the common ratio $k = 0.5$ behave?",
    "choices": [
     "The terms grow faster and faster",
     "The terms alternate between positive and negative numbers",
     "The terms decrease by 0.5 each time",
     "The terms are halved each time and approach 0"
    ],
    "correct": 3,
    "why": [
     "The terms only grow if the ratio is greater than 1.",
     "The sign only alternates if the ratio is negative.",
     "The ratio is multiplied, not subtracted. The sequence becomes $100, 50, 25, \\ldots$",
     "Each term is multiplied by 0.5: $100, 50, 25, 12.5, \\ldots$ The terms never become 0."
    ]
   }
  ]
 },
 "ma3b-6.3": {
  "kalla": "ac7d6b064f",
  "data": [
   {
    "question": "Why is 10 000 kr in five years' time worth less than 10 000 kr today?",
    "choices": [
     "Money you have today can be deposited and grow with interest",
     "Banknotes wear out and lose value",
     "A future amount is always worth exactly half",
     "It is not: the amounts are worth the same"
    ],
    "correct": 0,
    "why": [
     "If you deposit 10 000 kr today, in five years it will have grown to more than 10 000 kr. That is why the same amount in the future is worth less.",
     "Present value is about interest, not about the condition of the banknotes.",
     "How much less it is worth depends on the interest rate and the time. There is no fixed proportion.",
     "With interest the money grows, so money today is worth more than the same amount later."
    ]
   },
   {
    "question": "Which expression gives the present value of 60 000 kr that is paid out in 3 years, at an interest rate of 5 %?",
    "choices": [
     "$60\\,000 \\cdot 1.05^3$",
     "$\\dfrac{60\\,000}{1.05^3}$",
     "$\\dfrac{60\\,000}{1.05 \\cdot 3}$",
     "$60\\,000 \\cdot 0.95^3$"
    ],
    "correct": 1,
    "why": [
     "That is the future value if 60 000 kr is deposited today. The present value is found by dividing.",
     "The present value is the amount divided by the change factor raised to the number of years.",
     "The change factor should be raised to the power 3, not multiplied by 3.",
     "Multiplying by 0.95 is a decrease of 5 % per year. That is not the same as dividing by 1.05."
    ]
   },
   {
    "question": "The present value of 50 000 kr in 4 years is about 42 700 kr at an interest rate of 4 %. What happens to the present value if the interest rate is 2 % instead?",
    "choices": [
     "It decreases",
     "It stays the same",
     "It is halved",
     "It increases"
    ],
    "correct": 3,
    "why": [
     "A lower interest rate gives a smaller change factor in the denominator, and then the quotient becomes larger.",
     "The present value depends on the interest rate, since the change factor is in the denominator.",
     "The interest rate is halved, but the present value does not change in the same proportion.",
     "With a lower interest rate the money grows more slowly, so more money is needed today: $\\dfrac{50\\,000}{1.02^4} \\approx 46\\,192$ kr."
    ]
   },
   {
    "question": "You can get 100 000 kr now or 110 000 kr in 2 years. The interest rate is 6 %. Which is worth the most?",
    "choices": [
     "110 000 kr in 2 years, since the amount is larger",
     "100 000 kr now, since the present value of 110 000 kr is about 97 900 kr",
     "They are worth the same",
     "110 000 kr in 2 years, since the present value is about 123 600 kr"
    ],
    "correct": 1,
    "why": [
     "Amounts at different times cannot be compared directly. They must first be converted to present values.",
     "$\\dfrac{110\\,000}{1.06^2} \\approx 97\\,900$ kr, which is less than 100 000 kr.",
     "The present value of 110 000 kr is about 97 900 kr, not 100 000 kr.",
     "That is the future value $110\\,000 \\cdot 1.06^2$. The present value is found by dividing, not multiplying."
    ]
   },
   {
    "question": "A prize is paid out as 20 000 kr in 1 year and 20 000 kr in 2 years. How do you calculate the present value of the prize at an interest rate of 3 %?",
    "choices": [
     "$\\dfrac{40\\,000}{1.03^2}$",
     "$\\dfrac{40\\,000}{1.03}$",
     "$\\dfrac{20\\,000}{1.03} + \\dfrac{20\\,000}{1.03^2}$",
     "$20\\,000 \\cdot 1.03 + 20\\,000 \\cdot 1.03^2$"
    ],
    "correct": 2,
    "why": [
     "The first payment already comes after 1 year, so it should only be divided by $1.03$.",
     "The second payment comes after 2 years and should be divided by $1.03^2$.",
     "Each payment is divided by the change factor raised to the number of years until that payment is made, and then the present values are added.",
     "Those are future values. Present values are found by dividing by the change factor."
    ]
   }
  ]
 },
 "ma3b-6.4": {
  "kalla": "fc0bedc16d",
  "data": [
   {
    "question": "Which formula gives the sum $s_n$ of the first $n$ terms of a geometric sequence with the first term $a_1$ and the common ratio $k$?",
    "choices": [
     "$s_n = a_1 \\cdot k^{n-1}$",
     "$s_n = \\dfrac{a_1(k^n - 1)}{k - 1}$",
     "$s_n = \\dfrac{n(a_1 + k)}{2}$",
     "$s_n = \\dfrac{a_1(k - 1)}{k^n - 1}$"
    ],
    "correct": 1,
    "why": [
     "That is the formula for the $n$th term, that is only the last term, not the sum of all the terms.",
     "The formula is derived by multiplying the sum by $k$ and subtracting the original sum. Almost all the terms then cancel each other.",
     "The mean of the first and last terms times the number of terms works for an arithmetic sum, not for a geometric one.",
     "The numerator and denominator have swapped places. The sum should grow as $n$ grows, but with this formula it shrinks."
    ]
   },
   {
    "question": "How many terms does the sum $3 + 6 + 12 + \\ldots + 3 \\cdot 2^{9}$ have?",
    "choices": [
     "9",
     "11",
     "10",
     "12"
    ],
    "correct": 2,
    "why": [
     "The exponent 9 is $n - 1$, not $n$. The first term $3 = 3 \\cdot 2^0$ has the exponent 0, so the number of terms is one more than the largest exponent.",
     "The exponents go from 0 to 9. That is ten exponents, not eleven.",
     "The last term is $a_1 \\cdot k^{n-1}$, so $n - 1 = 9$ and $n = 10$. The exponents 0, 1, 2, …, 9 are ten in number.",
     "Neither 2 nor 3 counts as an extra term. The exponents go from 0 to 9, so there are ten terms."
    ]
   },
   {
    "question": "Find the sum $2 + 6 + 18 + 54 + 162$.",
    "choices": [
     "$242$",
     "$162$",
     "$484$",
     "$240$"
    ],
    "correct": 0,
    "why": [
     "With $a_1 = 2$, $k = 3$ and $n = 5$, $s_5 = \\dfrac{2(3^5 - 1)}{3 - 1} = \\dfrac{2 \\cdot 242}{2} = 242$. Check: $2 + 6 + 18 + 54 + 162 = 242$.",
     "That is the last term, not the sum of all five terms.",
     "You have forgotten to divide by $k - 1 = 2$ in the formula.",
     "Recalculate: $2 + 6 + 18 + 54 + 162 = 242$. The formula gives the same thing, $\\dfrac{2(243 - 1)}{2} = 242$."
    ]
   },
   {
    "question": "You deposit 1 000 kr at the end of each year in an account with an interest rate of 2 %. Which expression gives the balance immediately after the sixth deposit?",
    "choices": [
     "$1\\,000 \\cdot 1.02^6$",
     "$\\dfrac{1\\,000(1.02^5 - 1)}{1.02 - 1}$",
     "$6 \\cdot 1\\,000 \\cdot 1.02$",
     "$\\dfrac{1\\,000(1.02^6 - 1)}{1.02 - 1}$"
    ],
    "correct": 3,
    "why": [
     "That is what ONE deposit grows to in six years. Here six deposits are made, which grow for different lengths of time.",
     "The number of terms should equal the number of deposits, that is 6, not 5.",
     "The deposits grow for different lengths of time: the last not at all and the first for five years. That is why you cannot just multiply by 6.",
     "The balance is a geometric sum with $a_1 = 1\\,000$ (the last deposit has not grown), $k = 1.02$ and $n = 6$ terms, one per deposit."
    ]
   },
   {
    "question": "Lisa deposits 1 000 kr at the **beginning** of each year in an account with an interest rate of 2 %. She wants to know the balance at the end of the sixth year. What is the first term $a_1$ of the geometric sum?",
    "choices": [
     "$1\\,000$",
     "$1\\,020$",
     "$1\\,000 \\cdot 1.02^6$",
     "$6\\,000$"
    ],
    "correct": 1,
    "why": [
     "That applies when the last deposit is made on the same day as the balance is calculated. Here it is made at the beginning of year 6 and has time to grow for a year.",
     "The last deposit is made at the beginning of year 6 and grows for one year until the end of the year: $1\\,000 \\cdot 1.02 = 1\\,020$.",
     "That is how much the FIRST deposit has grown to, and it is the last term of the sum, not the first.",
     "That is the sum of the deposits without interest, not a term of the geometric sum."
    ]
   }
  ]
 },
 "ma3b-6.5": {
  "kalla": "54f9157663",
  "data": [
   {
    "question": "What is an annuity?",
    "choices": [
     "The part of the payment that is interest",
     "The amount repaid each time with straight-line amortisation",
     "The equal amount paid each time on an annuity loan",
     "The total interest over the whole term of the loan"
    ],
    "correct": 2,
    "why": [
     "The interest part is only part of the annuity, and it becomes smaller with each payment.",
     "An equal repayment each time is straight-line amortisation. The annuity is the whole payment, interest plus repayment.",
     "The annuity is the whole payment, interest plus repayment, and it is the same each time.",
     "The total interest is the number of payments times the annuity minus the amount borrowed, not the annuity itself."
    ]
   },
   {
    "question": "How do the interest part and the repayment part of the annuity change over the term of the loan?",
    "choices": [
     "The interest part decreases and the repayment part increases",
     "Both parts are equal the whole time",
     "The interest part increases and the repayment part decreases",
     "The repayment is the same each time, so the interest part is also constant"
    ],
    "correct": 0,
    "why": [
     "The debt decreases with each payment, so the interest, which is calculated on the debt, becomes smaller. Since the annuity stays the same, a larger and larger part goes to repayment.",
     "The interest is calculated on the remaining debt. The debt decreases, so the interest part cannot be constant.",
     "It is the other way round. The debt is largest at the beginning, so the interest part is largest at the first payment.",
     "An equal repayment each time is straight-line amortisation. With an annuity loan it is the whole payment that stays the same."
    ]
   },
   {
    "question": "An annuity loan has the amount borrowed $G$, the change factor $k$ per year and $n$ annual payments of $A$ kr. Which equality is the formula for the annuity based on?",
    "choices": [
     "$G = n \\cdot A$",
     "$G \\cdot k = A$",
     "$G = A \\cdot k + A \\cdot k^2 + \\ldots + A \\cdot k^n$",
     "$G = \\dfrac{A}{k} + \\dfrac{A}{k^2} + \\ldots + \\dfrac{A}{k^n}$"
    ],
    "correct": 3,
    "why": [
     "Then the loan would be interest-free. With interest, the sum of the payments must be larger than the amount borrowed.",
     "That would mean that the whole loan is paid with a single payment after one year.",
     "Here the payments have been given interest in the wrong direction. A payment in the future is worth LESS today, so it should be divided by $k$, not multiplied.",
     "The amount borrowed equals the sum of the present values of the payments. A payment in one year has the present value $\\dfrac{A}{k}$, in two years $\\dfrac{A}{k^2}$ and so on."
    ]
   },
   {
    "question": "An annuity loan has an annual interest rate of 6 % and is paid with one payment at the end of each month for 5 years. The monthly interest rate is taken as the annual rate divided by 12. Which values of $k$ and $n$ should be substituted into the formula for the annuity?",
    "choices": [
     "$k = 1.06$ and $n = 5$",
     "$k = 1.005$ and $n = 60$",
     "$k = 1.06$ and $n = 60$",
     "$k = 1.5$ and $n = 60$"
    ],
    "correct": 1,
    "why": [
     "That applies to one payment per year. Here you pay every month, so both the interest and the number of payments should be counted per month.",
     "The monthly interest rate is $\\dfrac{6\\ \\%}{12} = 0.5\\ \\%$, which gives $k = 1.005$. In five years $5 \\cdot 12 = 60$ payments are made.",
     "The number of payments is right, but the interest should also be per month. 6 % is the annual rate.",
     "0.5 % is written 0.005 in decimal form, so the change factor is 1.005 and not 1.5."
    ]
   },
   {
    "question": "The same loan of 120 000 kr at an interest rate of 6 % is repaid over five years, once as an annuity loan and once with straight-line amortisation. Which statement is true?",
    "choices": [
     "The loans cost exactly the same in interest",
     "The annuity loan gives less interest in total",
     "With straight-line amortisation all the payments are the same",
     "Straight-line amortisation gives slightly less interest in total, but larger payments at the beginning"
    ],
    "correct": 3,
    "why": [
     "The debt decreases at different rates with the two types of loan, so the interest is calculated on debts of different sizes and comes out different.",
     "It is the other way round. With an annuity loan little is repaid at the beginning, so the debt, and therefore the interest, stays larger for longer.",
     "With straight-line amortisation the repayment is the same, but the interest decreases. That is why the payments get smaller and smaller.",
     "With straight-line amortisation the debt decreases faster at the beginning, so there is less debt to pay interest on. In return the first payments are larger."
    ]
   }
  ]
 }
});
