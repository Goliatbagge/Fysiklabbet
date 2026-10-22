/* Engelsk översättning av ovningar (ma1c-4). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "ma1c-4.1": {
  "kalla": "4ba9d05909",
  "data": [
   {
    "level": 1,
    "question": "What is the point where the *x*-axis and the *y*-axis cross called?",
    "choices": [
     "Coordinate",
     "Zero point",
     "Quadrant",
     "Origin"
    ],
    "correct": 3,
    "solution": "The point where the axes cross is called the **origin** and has the coordinates (0, 0).\n\n**Answer:** The origin"
   },
   {
    "level": 1,
    "question": "In which quadrant is the point (−3, 5)?",
    "choices": [
     "First",
     "Second",
     "Third",
     "Fourth"
    ],
    "correct": 1,
    "solution": "The *x*-coordinate is negative and the *y*-coordinate is positive, so the point is up and to the left. The quadrants are numbered anticlockwise from the top right corner: first (+, +), **second (−, +)**, third (−, −), fourth (+, −).\n\n**Answer:** The second quadrant"
   },
   {
    "level": 1,
    "question": "A charging station charges a start fee of 30 kr and 5 kr per kWh. Which formula describes the cost $y$ kr for $x$ kWh?",
    "choices": [
     "$y = 35x$",
     "$y = 30 + 5x$",
     "$y = 5 + 30x$",
     "$y = 30 \\cdot 5x$"
    ],
    "correct": 1,
    "solution": "The fixed fee 30 kr is the constant term, and 5 kr is multiplied by each kWh:\n\n$$ y = 30 + 5x $$\n\n**Answer:** $y = 30 + 5x$"
   },
   {
    "level": 2,
    "question": "The linear model $y = 500 + 400x$ describes the cost at a car repair shop. What does the number 400 mean in the model?",
    "choices": [
     "The repair takes at most 400 minutes",
     "The fixed fee is 400 kr",
     "The cost is always at least 400 kr",
     "The cost increases by 400 kr for every hour worked"
    ],
    "correct": 3,
    "solution": "The number 400 is the coefficient in front of $x$. It tells you how much $y$ increases when $x$ increases by 1, that is, the cost per hour. The fixed fee is the constant term 500 kr.\n\n**Answer:** The cost increases by 400 kr for every hour worked."
   },
   {
    "level": 2,
    "question": "Make a table of values for $y = 200 + 150x$. Which *y*-value belongs to $x = 6$?",
    "answer": {
     "value": 1100,
     "unit": ""
    },
    "solution": "Substitute $x = 6$ into the formula:\n\n$$ y = 200 + 150 \\cdot 6 = 200 + 900 = 1\\ 100 $$\n\n**Answer:** $y = 1\\ 100$"
   },
   {
    "level": 3,
    "question": "The point $A = (a, b)$ lies in the first quadrant. The point $B$ is obtained when $A$ is reflected in the *x*-axis, and the point $C$ is obtained when $A$ is reflected in the *y*-axis.<br>a) Give the coordinates of $B$ and $C$ in terms of $a$ and $b$.<br>b) Show that the triangle $ABC$ has the area $2ab$.<br>c) The point $A$ lies on the line $y = 2x$, and the triangle $ABC$ has an area of 16 area units. Find the coordinates of $A$.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 2,
      "unit": "",
      "etikett": "$x$-coordinate"
     },
     {
      "del": "c",
      "value": 4,
      "unit": "",
      "etikett": "$y$-coordinate"
     }
    ],
    "solution": "**The key insight:** reflecting a point in an axis means that it ends up the same distance from the axis, but on the other side. The coordinate that gives the position along the axis is unchanged, and the other one changes sign.\n\n**a)** When reflected in the *x*-axis, the point moves straight down, the same distance below the axis as $A$ is above it. The *x*-coordinate stays the same and the *y*-coordinate changes sign.\n\nWhen reflected in the *y*-axis, the point moves straight to the left, the same distance to the left of the axis as $A$ is to the right. The *y*-coordinate stays the same and the *x*-coordinate changes sign.\n\nCheck with $A = (3, 2)$: $B = (3, -2)$ lies in the fourth quadrant and $C = (-3, 2)$ in the second, just as the reflections should give.\n\n**Answer:** $B = (a, -b)$ and $C = (-a, b)$\n\n**b)** $A$ and $B$ have the same *x*-coordinate, so the side $AB$ is vertical. It goes from the height $b$ down to the height $\\mathord{-}b$ and is therefore $b - (-b) = 2b$ long.\n\n$A$ and $C$ have the same *y*-coordinate, so the side $AC$ is horizontal. It goes from $\\mathord{-}a$ to $a$ sideways and is $a - (-a) = 2a$ long.\n\nA vertical side and a horizontal side meet at a right angle, so the triangle has a right angle at $A$. The two sides are the base and the height:\n\n$$ \\text{area} = \\frac{2a \\cdot 2b}{2} = \\frac{4ab}{2} = 2ab $$\n\n**Answer:** The legs are $2a$ and $2b$, so the area is $\\dfrac{2a \\cdot 2b}{2} = 2ab$.\n\n**c)** On the line $y = 2x$ the *y*-coordinate is twice the *x*-coordinate, so $b = 2a$. The area becomes\n\n$$ 2a \\cdot 2a = 16 $$\n\n$$ 4a^2 = 16 $$\n\nDivide both sides by 4:\n\n$$ \\frac{4a^2}{\\boldsymbol{4}} = \\frac{16}{\\boldsymbol{4}} $$\n\n$$ a^2 = 4 $$\n\nTake the square root of both sides:\n\n$$ a = \\pm\\sqrt{4} $$\n\n$$ a = \\pm 2 $$\n\nThe point lies in the first quadrant, so $a$ is positive and $a = 2$. Then $b = 2 \\cdot 2 = 4$.\n\nCheck: $B = (2, -4)$ and $C = (-2, 4)$. The sides are $AB = 8$ and $AC = 4$, and the area is $\\dfrac{8 \\cdot 4}{2} = 16$.\n\n**Answer:** $A = (2, 4)$\n\n**General conclusion:** reflections in the axes change the sign of one coordinate at a time. This means that distances in a coordinate system can be calculated by subtraction, and that geometric questions become equations."
   },
   {
    "level": 3,
    "question": "The point $P = (a - 3,\\ 2a + 4)$ moves when the number $a$ changes.<br>a) For which values of $a$ does $P$ lie in the second quadrant?<br>b) Show that $P$ can never lie in the fourth quadrant.<br>c) For which value of $a$ does $P$ lie on the *y*-axis, and where on the axis is it then?",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 3,
      "unit": "",
      "etikett": "$a =$"
     }
    ],
    "solution": "**The key insight:** a quadrant is determined by the signs of the coordinates. Each requirement on a sign becomes an inequality for $a$, and the two inequalities must hold at the same time.\n\n**a)** In the second quadrant the *x*-coordinate is negative and the *y*-coordinate is positive.\n\nThe *x*-coordinate negative:\n\n$$ a - 3 < 0 $$\n\nAdd 3 to both sides:\n\n$$ a - 3 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} < 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} $$\n\n$$ a < 3 $$\n\nThe *y*-coordinate positive:\n\n$$ 2a + 4 > 0 $$\n\nSubtract 4 from both sides:\n\n$$ 2a + 4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} > 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} $$\n\n$$ 2a > -4 $$\n\nDivide both sides by 2:\n\n$$ \\frac{2a}{\\boldsymbol{2}} > \\frac{-4}{\\boldsymbol{2}} $$\n\n$$ a > -2 $$\n\nBoth conditions hold when $a$ lies between $-2$ and 3.\n\nCheck with $a = 0$: $P = (-3, 4)$, which lies in the second quadrant.\n\n**Answer:** $-2 < a < 3$\n\n**b)** In the fourth quadrant the *x*-coordinate must be positive, $a - 3 > 0$, that is $a > 3$. At the same time the *y*-coordinate must be negative, $2a + 4 < 0$, which with the same calculation as in a) gives $a < -2$.\n\nNo number is both greater than 3 and less than $-2$. So the conditions can never be satisfied at the same time.\n\n**Answer:** It would require $a > 3$ and $a < -2$ at the same time, and that is impossible.\n\n**c)** On the *y*-axis the *x*-coordinate is 0:\n\n$$ a - 3 = 0 $$\n\nAdd 3 to both sides:\n\n$$ a - 3 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} $$\n\n$$ a = 3 $$\n\nThe *y*-coordinate is then $2 \\cdot 3 + 4 = 10$.\n\n**Answer:** $a = 3$, and then $P$ lies at $(0, 10)$ on the *y*-axis.\n\n**General conclusion:** for a point with a parameter, the question \"which quadrant is the point in?\" becomes two inequalities, one for each coordinate. Sometimes the inequalities contradict each other, and then the point can never end up there."
   },
   {
    "level": 3,
    "question": "Ella rides an e-scooter, and every trip takes 15 minutes. With company A each trip costs 10 kr to unlock plus 2 kr per minute. With company B you pay 149 kr per month and then 1.50 kr per minute, but there is no unlocking fee.<br>a) Set up a formula for the monthly cost $y$ kr with each company when Ella makes $x$ trips a month.<br>b) What is the smallest number of trips a month Ella must make for company B to be the cheapest?",
    "answer": {
     "value": 9,
     "unit": "trips"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 9,
      "unit": "trips"
     }
    ],
    "solution": "**The key insight:** the question is about the number of trips, not the number of minutes. So start by working out what ONE trip costs with each company. Then both models are linear in the number of trips $x$.\n\n**a)** With company A a trip costs the unlocking plus 15 minutes:\n\n$$ 10 + 2 \\cdot 15 = 40\\ \\text{kr per trip} $$\n\nThere is no fixed monthly fee, so the cost is $40x$ kr.\n\nWith company B a trip costs $1.50 \\cdot 15 = 22.5$ kr, and the monthly fee 149 kr is paid regardless of the number of trips. It becomes the constant term.\n\n**Answer:** Company A: $y = 40x$. Company B: $y = 149 + 22.5x$\n\n**b)** We find out when the companies cost the same:\n\n$$ 40x = 149 + 22.5x $$\n\nSubtract $22.5x$ from both sides:\n\n$$ 40x \\mathbin{\\boldsymbol{-}} \\boldsymbol{22.5x} = 149 + 22.5x \\mathbin{\\boldsymbol{-}} \\boldsymbol{22.5x} $$\n\n$$ 17.5x = 149 $$\n\nDivide both sides by $17.5$:\n\n$$ \\frac{17.5x}{\\boldsymbol{17.5}} = \\frac{149}{\\boldsymbol{17.5}} $$\n\n$$ x = 8.51\\ldots $$\n\nThe number of trips is a whole number. Company B has the higher fixed fee but the lower price per trip, so B becomes the cheapest only when Ella makes more than $8.51\\ldots$ trips, that is, from 9 trips.\n\nCheck: 8 trips cost $40 \\cdot 8 = 320$ kr with A and $149 + 22.5 \\cdot 8 = 329$ kr with B. 9 trips cost $40 \\cdot 9 = 360$ kr with A and $149 + 22.5 \\cdot 9 = 351.5$ kr with B.\n\n**Answer:** At least 9 trips a month\n\n**General conclusion:** a high fixed fee pays off only when the variable part is so large that the saving each time has had time to eat up the fee. Here B saves $17.5$ kr per trip, and it takes 9 trips before that is more than 149 kr."
   },
   {
    "level": 3,
    "question": "Two water tanks start being emptied at the same time, and both are emptied at a steady rate. Tank A contains 210 litres after 2 minutes and 120 litres after 5 minutes. Tank B contains 200 litres at the start and is emptied by 20 litres per minute.<br>a) How much water was there in tank A at the start? Set up a formula for the amount of water $y$ litres in tank A after $x$ minutes.<br>b) After how long do the tanks contain the same amount of water, and how much is it then?<br>c) Which of the tanks becomes empty first?",
    "answer": {
     "value": 7,
     "unit": "min"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 270,
      "unit": "litres",
      "etikett": "at the start"
     },
     {
      "del": "b",
      "value": 7,
      "unit": "min",
      "etikett": "time"
     },
     {
      "del": "b",
      "value": 60,
      "unit": "litres",
      "etikett": "amount of water"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the tank being emptied at a steady rate means that the same amount of water flows out every minute. That rate is obtained from the two readings, and then you can count backwards to time 0.\n\n**a)** Between minute 2 and minute 5 there are 3 minutes, and the amount of water decreases by $210 - 120 = 90$ litres. The decrease per minute is the decrease in the amount of water divided by the time:\n\n$$ \\frac{90}{3} = 30\\ \\text{litres per minute} $$\n\nThe start was 2 minutes before the first reading, so there was $2 \\cdot 30 = 60$ litres more:\n\n$$ 210 + 60 = 270\\ \\text{litres} $$\n\nThe amount of water is 270 litres at the start and decreases by 30 litres per minute.\n\nCheck: $x = 5$ gives $270 - 30 \\cdot 5 = 120$ litres, as it should.\n\n**Answer:** Tank A contained 270 litres, and $y = 270 - 30x$\n\n**b)** Tank B follows $y = 200 - 20x$. The tanks contain the same amount when\n\n$$ 270 - 30x = 200 - 20x $$\n\nAdd $30x$ to both sides:\n\n$$ 270 - 30x \\mathbin{\\boldsymbol{+}} \\boldsymbol{30x} = 200 - 20x \\mathbin{\\boldsymbol{+}} \\boldsymbol{30x} $$\n\n$$ 270 = 200 + 10x $$\n\nSubtract 200 from both sides:\n\n$$ 270 \\mathbin{\\boldsymbol{-}} \\boldsymbol{200} = 200 + 10x \\mathbin{\\boldsymbol{-}} \\boldsymbol{200} $$\n\n$$ 70 = 10x $$\n\nDivide both sides by 10:\n\n$$ \\frac{70}{\\boldsymbol{10}} = \\frac{10x}{\\boldsymbol{10}} $$\n\n$$ 7 = x $$\n\nThe amount of water then: $200 - 20 \\cdot 7 = 60$ litres. Check with tank A: $270 - 30 \\cdot 7 = 60$ litres.\n\nIs it reasonable? Tank A has 70 litres more at the start but is emptied 10 litres per minute faster. The lead is gone after $\\dfrac{70}{10} = 7$ minutes.\n\n**Answer:** After 7 minutes, and then both contain 60 litres.\n\n**c)** Tank A is empty when $270 - 30x = 0$, that is, after $\\dfrac{270}{30} = 9$ minutes. Tank B is empty after $\\dfrac{200}{20} = 10$ minutes.\n\n**Answer:** Tank A becomes empty first, after 9 minutes. Tank B becomes empty after 10 minutes.\n\n**General conclusion:** two linear models that start at different levels and change at different rates meet once. They meet when the difference at the start has been eaten up by the difference in rate, and after the meeting they are in the opposite order."
   },
   {
    "level": 3,
    "question": "A town had $20\\,000$ inhabitants in 2015 and $23\\,000$ inhabitants in 2020. The municipality expects the population to keep growing according to a linear model. Tilda makes a forecast: “The increase was 15 % in five years. In a linear model the increase is the same every period, so the population increases by 15 % up to 2025 and by 15 % up to 2030.”<br>a) Explain what is wrong in Tilda's reasoning, and calculate what the linear model gives for 2030.<br>b) By how many per cent does the population increase from 2025 to 2030 according to the linear model? Round to one decimal place.",
    "answer": {
     "value": 11.5,
     "unit": "%",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 29000,
      "unit": "inhabitants"
     },
     {
      "del": "b",
      "value": 11.5,
      "unit": "%",
      "tol": 0.005
     }
    ],
    "solution": "**The key insight:** a linear model changes by the same NUMBER every period, not by the same percentage. The same percentage every period is a different kind of model, and it grows faster and faster.\n\n**a)** From 2015 to 2020 the population increased by\n\n$$ 23\\,000 - 20\\,000 = 3\\,000\\ \\text{inhabitants} $$\n\nSo in the linear model $3\\,000$ inhabitants are added every five years, or $\\dfrac{3\\,000}{5} = 600$ per year. With $x$ years after 2015 the model is $y = 20\\,000 + 600x$. In 2030, $x = 15$:\n\n$$ 20\\,000 + 600 \\cdot 15 = 29\\,000 $$\n\nTilda's way instead gives $23\\,000 \\cdot 1.15 = 26\\,450$ in 2025 and $26\\,450 \\cdot 1.15 = 30\\,417.5$ in 2030. She lets the increase get bigger and bigger, and that is exactly what a linear model does not do.\n\n**Answer:** Tilda keeps the percentage constant, but in a linear model it is the number of new inhabitants that is constant, $3\\,000$ per five-year period. The model gives $29\\,000$ inhabitants in 2030.\n\n**b)** According to the model there are $26\\,000$ inhabitants in 2025 and $29\\,000$ in 2030. The increase is $3\\,000$ inhabitants, and the percentage increase is the increase divided by the value before the increase:\n\n$$ \\frac{3\\,000}{26\\,000} = 0.115\\ldots \\approx 11.5\\ \\% $$\n\nIs it reasonable? The same increase is calculated on an ever larger population, so the percentage must be smaller than the $15\\ \\%$ that applied from 2015.\n\n**Answer:** About 11.5 %\n\n**General conclusion:** in a linear model the increase in number is constant, and therefore the increase in per cent gets smaller and smaller the larger the value becomes. A constant percentage belongs to a different kind of model."
   },
   {
    "level": 3,
    "question": "The table shows some values from a linear model. The values of $x$ do not increase in equal steps, and two of the boxes are empty.<br>a) Find the two missing numbers.<br>b) Give the model as a formula.\n\n| $x$ | 2 | 5 | ? | 11 |\n| --- | --- | --- | --- | --- |\n| $y$ | 13 | ? | 35 | 49 |",
    "answer": {
     "value": 7.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 25,
      "unit": "",
      "etikett": "$y$ when $x = 5$"
     },
     {
      "del": "a",
      "value": 7.5,
      "unit": "",
      "etikett": "$x$ when $y = 35$"
     },
     {
      "del": "b",
      "value": 4,
      "unit": "",
      "etikett": "the number in front of $x$"
     },
     {
      "del": "b",
      "value": 5,
      "unit": "",
      "etikett": "the constant term"
     }
    ],
    "solution": "**The key insight:** in a linear model $y$ increases by the same amount for every step in $x$, however long the jumps in the table are. Use the two columns that are completely known and work out the increase per step.\n\n**a)** From $x = 2$ to $x = 11$ there are $11 - 2 = 9$ steps, and $y$ increases by $49 - 13 = 36$. The increase per step is the increase in $y$ divided by the number of steps in $x$:\n\n$$ \\frac{36}{9} = 4 $$\n\n*The box below $x = 5$:* from $x = 2$ there are 3 steps, and each step adds 4:\n\n$$ 13 + 3 \\cdot 4 = 25 $$\n\n*The box above $y = 35$:* from $y = 13$, $y$ must increase by $35 - 13 = 22$. Each step gives 4, so you need\n\n$$ \\frac{22}{4} = 5.5\\ \\text{steps} $$\n\nand $x = 2 + 5.5 = 7.5$.\n\nCheck: from $x = 7.5$ to $x = 11$ there are $3.5$ steps, and $35 + 3.5 \\cdot 4 = 49$, as in the table.\n\n**Answer:** $y = 25$ when $x = 5$, and $x = 7.5$ when $y = 35$\n\n**b)** The constant term is the value of $y$ when $x = 0$. From $x = 2$ we go 2 steps backwards:\n\n$$ 13 - 2 \\cdot 4 = 5 $$\n\nCheck: $x = 11$ gives $5 + 4 \\cdot 11 = 49$.\n\n**Answer:** $y = 5 + 4x$\n\n**General conclusion:** uneven steps in the table make no difference for a linear model. Divide the total increase in $y$ by the number of steps in $x$, and you get the increase per step. From there every empty value can be worked out."
   },
   {
    "level": 3,
    "question": "At a mountain station 300 m above sea level the temperature is 14 °C. Assume that the temperature falls by 0.65 °C for every 100 m you climb.<br>a) Set up a formula for the temperature $y$ °C at the height $x$ m above sea level.<br>b) At what height is it 0 °C according to the model? Round to the nearest ten metres.<br>c) In reality the temperature stops falling about 11 km up. From there it is almost constant, about −56 °C, up to 20 km. What does the model give at the heights $11\\,000$ m and $20\\,000$ m? Evaluate the model.",
    "answer": {
     "value": 2450,
     "unit": "m",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 2450,
      "unit": "m",
      "tol": 0.01
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the formula should start from sea level, where $x = 0$, but the temperature is only known 300 m up. So count backwards down to sea level, and convert the decrease into a decrease per metre.\n\n**a)** The temperature falls $0.65$ °C per 100 m, that is\n\n$$ \\frac{0.65}{100} = 0.0065\\ \\text{degrees per metre} $$\n\nAt sea level it is 300 m lower, and 300 m is 3 times 100 m. So it is warmer there:\n\n$$ 14 + 3 \\cdot 0.65 = 15.95\\ ^{\\circ}\\mathrm{C} $$\n\nCheck: $x = 300$ gives $15.95 - 0.0065 \\cdot 300 = 14$, as it should.\n\n**Answer:** $y = 15.95 - 0.0065x$\n\n**b)** We look for the height where $y = 0$:\n\n$$ 15.95 - 0.0065x = 0 $$\n\nAdd $0.0065x$ to both sides:\n\n$$ 15.95 - 0.0065x \\mathbin{\\boldsymbol{+}} \\boldsymbol{0.0065x} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0.0065x} $$\n\n$$ 15.95 = 0.0065x $$\n\nDivide both sides by $0.0065$:\n\n$$ \\frac{15.95}{\\boldsymbol{0.0065}} = \\frac{0.0065x}{\\boldsymbol{0.0065}} $$\n\n$$ x = 2\\,453.8\\ldots $$\n\nIs it reasonable? From the station the temperature has to fall 14 degrees, and that takes $\\dfrac{14}{0.65} \\approx 21.5$ hundreds of metres, that is, just over $2\\,150$ m above the station.\n\n**Answer:** About $2\\,450$ m above sea level\n\n**c)** At $11\\,000$ m the model gives\n\n$$ 15.95 - 0.0065 \\cdot 11\\,000 = -55.55 $$\n\nand at $20\\,000$ m\n\n$$ 15.95 - 0.0065 \\cdot 20\\,000 = -114.05 $$\n\nUp to 11 km the model agrees well, about $-56$ °C compared with about $-56$ °C in reality. Above 11 km the model keeps falling, while in reality the temperature stops falling. At 20 km the model's value is almost 60 degrees too cold.\n\n**Answer:** The model gives about −56 °C at 11 000 m and about −114 °C at 20 000 m. It is useful up to about 11 km but not higher up.\n\n**General conclusion:** a linear model continues at the same rate however far you go, but reality seldom does. Therefore a model should always be used within the values where it has been shown to agree."
   }
  ]
 },
 "ma1c-4.2": {
  "kalla": "720425e31d",
  "data": [
   {
    "level": 1,
    "question": "Which two requirements must a graph meet to show a proportionality?",
    "choices": [
     "It must be a straight line and pass through the origin",
     "It must be a straight line and slope upwards",
     "It must pass through the origin and be curved",
     "It must pass through the point (1, 1)"
    ],
    "correct": 0,
    "solution": "A proportionality is written $y = kx$. The graph is a **straight line** that **passes through the origin** (the starting value is 0). Both requirements must be met.\n\n**Answer:** A straight line through the origin."
   },
   {
    "level": 1,
    "question": "Bananas cost 24 kr/kg. Which formula describes the cost $y$ kr for $x$ kg of bananas?",
    "choices": [
     "$y = x + 24x$",
     "$y = \\dfrac{24}{x}$",
     "$y = 24 + x$",
     "$y = 24x$"
    ],
    "correct": 3,
    "solution": "The price is proportional to the weight. There is no start fee:\n\n$$ y = 24x $$\n\nThe constant of proportionality $k = 24$ is the price per kilo.\n\n**Answer:** $y = 24x$"
   },
   {
    "level": 1,
    "question": "For a proportionality, $y = 84$ when $x = 12$. Find the constant of proportionality $k$.",
    "answer": {
     "value": 7,
     "unit": ""
    },
    "solution": "The constant of proportionality is calculated as the ratio between $y$ and $x$:\n\n$$ k = \\frac{y}{x} = \\frac{84}{12} = 7 $$\n\n**Answer:** $k = 7$"
   },
   {
    "level": 2,
    "question": "Which of the following tables of values shows a proportionality?",
    "choices": [
     "$x$: 2, 4, 6 — $y$: 7, 9, 11",
     "$x$: 2, 4, 6 — $y$: 10, 10, 10",
     "$x$: 2, 4, 6 — $y$: 4, 16, 36",
     "$x$: 2, 4, 6 — $y$: 5, 10, 15"
    ],
    "correct": 3,
    "solution": "In a proportionality the ratio $\\dfrac{y}{x}$ is constant:\n\n$$ \\frac{5}{2} = 2.5 \\qquad \\frac{10}{4} = 2.5 \\qquad \\frac{15}{6} = 2.5 $$\n\nAll the ratios are equal, so it is a proportionality with $k = 2.5$.\n\nTable two increases by the same amount but has a starting value (linear, not proportional), table three is quadratic and table four is constant.\n\n**Answer:** $x$: 2, 4, 6 — $y$: 5, 10, 15"
   },
   {
    "level": 2,
    "question": "A car uses petrol in proportion to the distance driven: 42 litres for 600 km. How much petrol is needed for 850 km? Answer in litres.",
    "answer": {
     "value": 59.5,
     "unit": "litres",
     "tol": 0.005
    },
    "solution": "The constant of proportionality (consumption per km):\n\n$$ k = \\frac{42}{600} = 0.07\\ \\text{litres/km} $$\n\nFor 850 km:\n\n$$ y = 0.07 \\cdot 850 = 59.5\\ \\text{litres} $$\n\n**Answer:** 59.5 litres"
   },
   {
    "level": 3,
    "question": "The quantities $y_1$ and $y_2$ are both proportional to $x$, with the constants of proportionality $a$ and $b$ respectively, where $a$ and $b$ are positive.<br>a) Show that the sum $y_1 + y_2$ is also proportional to $x$.<br>b) Is the product $y_1 \\cdot y_2$ proportional to $x$?<br>c) Is the quotient $\\dfrac{y_1}{y_2}$ proportional to $x$?",
    "solution": "**The key insight:** a relationship is a proportionality when it can be written $y = kx$, where $k$ is a number that does not depend on $x$. So rewrite each expression and see whether it can be put in that form.\n\nThat $y_1$ and $y_2$ are proportional to $x$ means that\n\n$$ y_1 = ax \\qquad y_2 = bx $$\n\n**a)** The sum:\n\n$$ y_1 + y_2 = ax + bx $$\n\nTake out the common factor $x$:\n\n$$ y_1 + y_2 = (a + b)x $$\n\nThe number $a + b$ does not depend on $x$, so the sum has the form $kx$ with $k = a + b$.\n\nAn example: apples for 20 kr/kg and pears for 30 kr/kg. If you buy the same number of kilos of both, you pay $20x + 30x = 50x$ kr for $x$ kg of each, that is, 50 kr per kilo of each kind.\n\n**Answer:** Yes, $y_1 + y_2 = (a + b)x$, a proportionality with the constant $a + b$.\n\n**b)** The product:\n\n$$ y_1 \\cdot y_2 = ax \\cdot bx = abx^2 $$\n\nHere there is $x^2$ and not $x$. We try $a = b = 1$, so that the product is $x^2$. Then $x = 1$ gives the value 1 and $x = 2$ the value 4. The ratio between $y$ and $x$ is $\\dfrac{1}{1} = 1$ in the first case and $\\dfrac{4}{2} = 2$ in the second. The ratio is not constant, and the graph is not a straight line.\n\n**Answer:** No, the product is $abx^2$, and the ratio between it and $x$ changes with $x$.\n\n**c)** The quotient, for $x \\neq 0$:\n\n$$ \\frac{y_1}{y_2} = \\frac{ax}{bx} = \\frac{a}{b} $$\n\nThe quotient has the same value $\\dfrac{a}{b}$ whatever $x$ is. The graph is a horizontal line at the height $\\dfrac{a}{b}$, and it does not pass through the origin. A relationship that does not change at all when $x$ changes is not proportional to $x$.\n\n**Answer:** No, the quotient is constant, $\\dfrac{a}{b}$, and does not change with $x$.\n\n**General conclusion:** the sum of two proportionalities to the same quantity is a new proportionality. The product and the quotient are not: one grows too fast and the other stands still."
   },
   {
    "level": 3,
    "question": "Moa hangs weights on a spring and measures how much it stretches. The results are in the table.<br>a) Investigate whether it is reasonable that the extension is proportional to the mass.<br>b) Find a constant of proportionality based on all the measurements, and use it to predict the extension with a weight of 400 g.<br>c) Explain why the model cannot be used to predict the extension with a weight of 5 kg.\n\n| Mass $x$ (g) | 50 | 100 | 150 | 200 | 250 |\n| --- | --- | --- | --- | --- | --- |\n| Extension $y$ (cm) | 1.9 | 4.1 | 6.0 | 7.9 | 10.2 |",
    "answer": {
     "value": 16,
     "unit": "cm",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 16,
      "unit": "cm",
      "tol": 0.03
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** in a proportionality the ratio $\\dfrac{y}{x}$ is the same for all measurements. Real measurements always have small errors, so the ratios will not be exactly equal. The question is whether the differences are so small that they could be measurement errors.\n\n**a)** The ratio between extension and mass for each measurement:\n\n$$ \\frac{1.9}{50} = 0.038 \\qquad \\frac{4.1}{100} = 0.041 \\qquad \\frac{6.0}{150} = 0.04 $$\n\n$$ \\frac{7.9}{200} = 0.0395 \\qquad \\frac{10.2}{250} = 0.0408 $$\n\nAll the ratios lie between $0.038$ and $0.041$. They neither grow nor shrink with the mass, but vary randomly around about $0.04$. That fits with measurement errors of a millimetre or two. In addition, the extension is 0 with no weight, so the graph should pass through the origin.\n\n**Answer:** Yes, the ratios are almost equal, about 0.04 cm per gram, and the differences are so small that they could be measurement errors.\n\n**b)** One way to use all the measurements is to take the mean of the ratios:\n\n$$ k = \\frac{0.038 + 0.041 + 0.04 + 0.0395 + 0.0408}{5} = \\frac{0.1993}{5} = 0.039\\,86 $$\n\nWith $y = 0.039\\,86x$ and $x = 400$:\n\n$$ y = 0.039\\,86 \\cdot 400 = 15.944 $$\n\nIs it reasonable? 400 g is twice as much as 200 g, and 200 g gave $7.9$ cm. Twice that is about 16 cm.\n\n**Answer:** About 16 cm\n\n**c)** 5 kg is $5\\,000$ g, twenty times as much as the heaviest weight Moa measured with. The model says $0.039\\,86 \\cdot 5\\,000 \\approx 200$ cm, that is, two metres. An ordinary spring cannot take that: it is stretched so that it no longer returns, or it breaks. No measurement shows that the relationship holds so far outside the measured values.\n\n**Answer:** 5 kg is far outside the measured values, and there it is not certain that the spring behaves as in the measurements. The spring might even be stretched permanently.\n\n**General conclusion:** with real measurement data the question is not whether the ratios are exactly equal, but whether the differences are small and random. A proportionality that agrees with the measurements should only be used close to the values that have been measured."
   },
   {
    "level": 3,
    "question": "The price of pick-and-mix sweets is proportional to the weight. The shop raises the price per kilo by 15 %.<br>a) Max wants to pay the same as before. By how many per cent must he reduce the amount of sweets he buys? Round to one decimal place.<br>b) Saga instead buys 20 % more sweets than before. By how many per cent does the amount she pays increase?",
    "answer": {
     "value": 13,
     "unit": "%",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 13,
      "unit": "%",
      "tol": 0.005,
      "ignoreSign": true
     },
     {
      "del": "b",
      "value": 38,
      "unit": "%"
     }
    ],
    "solution": "**The key insight:** with the price $y = kx$, the price is the constant of proportionality times the weight. A change in the price per kilo and a change in the weight then become two change factors that are multiplied. The percentages are not added.\n\nCall the old price per kilo $k$ and the old weight $x$. Before, the price was $kx$. The new price per kilo is $1.15k$.\n\n**a)** Call Max's new weight $v$. He is to pay the same as before:\n\n$$ 1.15k \\cdot v = kx $$\n\nDivide both sides by $1.15k$:\n\n$$ \\frac{1.15k \\cdot v}{\\boldsymbol{1.15k}} = \\frac{kx}{\\boldsymbol{1.15k}} $$\n\n$$ v = \\frac{x}{1.15} = 0.8696 \\ldots \\cdot x $$\n\nThe change factor $0.8696\\ldots$ means a decrease of $1 - 0.8696\\ldots = 0.1304\\ldots$, that is, about $13.0\\ \\%$.\n\nNotice that 15 % fewer sweets is not enough. Then he would have paid $1.15 \\cdot 0.85 = 0.9775$ of the old price, that is, too little, and he could have bought a little more.\n\n**Answer:** By about 13.0 %\n\n**b)** Saga buys $1.2x$ kg at the new price per kilo:\n\n$$ 1.15k \\cdot 1.2x = 1.38kx $$\n\nSo she pays $1.38$ times the old price, an increase of $38\\ \\%$.\n\nIs it reasonable? $15\\ \\% + 20\\ \\% = 35\\ \\%$ is too little, because the price rise also applies to the extra amount of sweets.\n\n**Answer:** By 38 %\n\n**General conclusion:** in a proportionality $y = kx$, a percentage change in $k$ and a percentage change in $x$ give a total change that is obtained by multiplying the change factors, $1.15 \\cdot 1.2$, never by adding the percentages."
   },
   {
    "level": 3,
    "question": "The Berg family paid $2\\,000$ kr for $40\\ \\mathrm{m^3}$ of water one year and $3\\,000$ kr for $65\\ \\mathrm{m^3}$ the year after, with the same tariff both years. Linnea reasons: “The water costs $\\dfrac{2\\,000}{40} = 50$ kr per cubic metre, so $100\\ \\mathrm{m^3}$ costs $5\\,000$ kr.”<br>a) Show that the price is not proportional to the consumption.<br>b) Assume that the relationship is linear. What does $100\\ \\mathrm{m^3}$ cost?",
    "answer": {
     "value": 4400,
     "unit": "kr"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 4400,
      "unit": "kr"
     }
    ],
    "solution": "**The key insight:** Linnea calculates as if the price were proportional to the consumption. It is only that if the ratio between price and consumption is the same both years. If it is not, there is a fixed fee that does not depend on the consumption.\n\n**a)** The ratio between price and consumption for the two years:\n\n$$ \\frac{2\\,000}{40} = 50 \\qquad \\frac{3\\,000}{65} = 46.15\\ldots $$\n\nThe ratios are different, so the price is not proportional to the consumption.\n\n**Answer:** The ratio is 50 kr per cubic metre the first year but about 46 kr per cubic metre the second, so it is not constant.\n\n**b)** The second year $65 - 40 = 25$ cubic metres more were used, and that cost $3\\,000 - 2\\,000 = 1\\,000$ kr more. The variable price is the increase in price divided by the increase in consumption:\n\n$$ \\frac{1\\,000}{25} = 40\\ \\text{kr per cubic metre} $$\n\nThe fixed fee is what is left when the water has been subtracted from the first year's bill:\n\n$$ 2\\,000 - 40 \\cdot 40 = 400\\ \\text{kr} $$\n\nSo the price is $y = 400 + 40x$ kr for $x$ cubic metres. Check: $400 + 40 \\cdot 65 = 3\\,000$, as in the second year.\n\nFor $100\\ \\mathrm{m^3}$:\n\n$$ 400 + 40 \\cdot 100 = 4\\,400 $$\n\nLinnea's mistake was that she spread the fixed fee over the cubic metres. Then she pays the fixed fee once more for every new cubic metre.\n\n**Answer:** $4\\,400$ kr\n\n**General conclusion:** dividing the price by the amount only gives a true unit price when the relationship is a proportionality. If there is a fixed fee you must instead compare how much the price increases when the amount increases."
   },
   {
    "level": 3,
    "question": "The diagram shows the price $y$ kr for $x$ metres of two fabrics. The solid red line applies to fabric A and the dashed blue line to fabric B.<br>a) Find the constant of proportionality for each fabric.<br>b) How many metres of fabric B do you get for the same price as 6 m of fabric A?<br>c) Show that for any amount of money you get $\\dfrac{5}{3}$ times as many metres of fabric B as of fabric A.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"110.0\" y1=\"30\" x2=\"110.0\" y2=\"290\"/><line x1=\"160.0\" y1=\"30\" x2=\"160.0\" y2=\"290\"/><line x1=\"210.0\" y1=\"30\" x2=\"210.0\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"310.0\" y1=\"30\" x2=\"310.0\" y2=\"290\"/><line x1=\"360.0\" y1=\"30\" x2=\"360.0\" y2=\"290\"/><line x1=\"410.0\" y1=\"30\" x2=\"410.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"257.5\" x2=\"460\" y2=\"257.5\"/><line x1=\"60\" y1=\"225.0\" x2=\"460\" y2=\"225.0\"/><line x1=\"60\" y1=\"192.5\" x2=\"460\" y2=\"192.5\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"127.5\" x2=\"460\" y2=\"127.5\"/><line x1=\"60\" y1=\"95.0\" x2=\"460\" y2=\"95.0\"/><line x1=\"60\" y1=\"62.5\" x2=\"460\" y2=\"62.5\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">x</tspan> (m)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">y</tspan> (kr)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"110.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"160.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"210.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"310.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"360.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"410.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"262.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">50</text><text x=\"53\" y=\"230.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">100</text><text x=\"53\" y=\"197.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">150</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">200</text><text x=\"53\" y=\"132.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">250</text><text x=\"53\" y=\"100.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">300</text><text x=\"53\" y=\"67.5\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">350</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">400</text></g><path d=\"M 60.0 290.0 L 460.0 30.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M 60.0 290.0 L 460.0 134.0\" stroke=\"#2563c9\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\" stroke-dasharray=\"8 6\"/></svg>",
    "answer": {
     "value": 10,
     "unit": "m"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 50,
      "unit": "kr/m",
      "etikett": "fabric A"
     },
     {
      "del": "a",
      "value": 30,
      "unit": "kr/m",
      "etikett": "fabric B"
     },
     {
      "del": "b",
      "value": 10,
      "unit": "m"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** both lines pass through the origin, so both prices are proportional to the length. The constant of proportionality is the price per metre, and it is read off at a point where the line passes through a corner of the grid.\n\n**a)** Line A passes through $(1, 50)$ and line B through $(5, 150)$. The constant of proportionality is the ratio between price and length:\n\n$$ k_A = \\frac{50}{1} = 50 \\qquad k_B = \\frac{150}{5} = 30 $$\n\nCheck: line A should then pass through $(8, 400)$ and line B through $(8, 240)$, and they do.\n\n**Answer:** Fabric A: $k = 50$, that is, 50 kr/m. Fabric B: $k = 30$, that is, 30 kr/m.\n\n**b)** 6 m of fabric A costs $50 \\cdot 6 = 300$ kr. For 300 kr you get, of fabric B,\n\n$$ \\frac{300}{30} = 10\\ \\text{m} $$\n\n**Answer:** 10 m\n\n**c)** Call the length of fabric A $x_A$ and the length of fabric B $x_B$. The same amount of money means\n\n$$ 50x_A = 30x_B $$\n\nDivide both sides by 30:\n\n$$ \\frac{50x_A}{\\boldsymbol{30}} = \\frac{30x_B}{\\boldsymbol{30}} $$\n\n$$ x_B = \\frac{5}{3} \\cdot x_A $$\n\nThe amount of money does not appear in the expression, so the ratio is the same for all amounts. Check with b): $\\dfrac{5}{3} \\cdot 6 = 10$.\n\n**Answer:** From $50x_A = 30x_B$ it follows that $x_B = \\dfrac{5}{3} \\cdot x_A$ for all amounts.\n\n**General conclusion:** for two proportionalities through the origin, the ratio between the *x*-values at the same *y*-value is always the same. It is the ratio between the constants of proportionality, but inverted: the cheaper fabric gives more metres."
   },
   {
    "level": 3,
    "question": "The relationship $y = (a - 2)x + a^2 - 9$ contains the number $a$.<br>a) For which values of $a$ is the relationship a proportionality? Give the formula in each case.<br>b) Which of the proportionalities has a graph that slopes downwards, and what is its constant of proportionality?<br>c) For which value of $a$ does the graph become a horizontal line? Is the relationship then a proportionality?",
    "answer": {
     "value": -5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "values": [
       3,
       -3
      ],
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b",
      "value": -5,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "c",
      "value": 2,
      "unit": "",
      "etikett": "$a =$"
     }
    ],
    "solution": "**The key insight:** a linear relationship is a proportionality when the graph passes through the origin, that is, when the constant term is 0. Here the constant term is $a^2 - 9$, and it is to be set equal to 0.\n\n**a)** The constant term must be 0:\n\n$$ a^2 - 9 = 0 $$\n\nAdd 9 to both sides:\n\n$$ a^2 - 9 \\mathbin{\\boldsymbol{+}} \\boldsymbol{9} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{9} $$\n\n$$ a^2 = 9 $$\n\nTake the square root of both sides. Both 3 and $-3$ give 9 when squared:\n\n$$ a = \\pm\\sqrt{9} $$\n\n$$ a = \\pm 3 $$\n\n$a = 3$ gives $y = (3 - 2)x + 9 - 9 = x$.\n\n$a = -3$ gives $y = (-3 - 2)x + 9 - 9 = -5x$.\n\nBoth have a number other than 0 in front of $x$, so both are genuine proportionalities.\n\n**Answer:** $a = 3$ gives $y = x$ and $a = -3$ gives $y = -5x$\n\n**b)** A graph slopes downwards when the number in front of $x$ is negative, and that applies to $y = -5x$.\n\n**Answer:** $y = -5x$, with the constant of proportionality $-5$\n\n**c)** The graph becomes horizontal when the number in front of $x$ is 0:\n\n$$ a - 2 = 0 $$\n\nAdd 2 to both sides:\n\n$$ a - 2 \\mathbin{\\boldsymbol{+}} \\boldsymbol{2} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{2} $$\n\n$$ a = 2 $$\n\nThen the relationship becomes $y = 0 \\cdot x + 4 - 9 = -5$. The graph is a horizontal line at the height $-5$, and it does not pass through the origin.\n\n**Answer:** $a = 2$ gives $y = -5$. It is not a proportionality, since the graph does not pass through the origin.\n\n**General conclusion:** for a linear relationship to be a proportionality is a condition on the constant term: it must be 0. The number in front of $x$ then only decides how the line through the origin slopes."
   },
   {
    "level": 3,
    "question": "Ella cycles from home at the constant speed 18 km/h. Her brother Noah cycles the same way and starts 20 minutes later at the speed 24 km/h. Let $x$ be the time in hours since Ella started.<br>a) Set up formulas for how far from home Ella and Noah are after $x$ hours. Is Noah's distance proportional to $x$?<br>b) How long after Ella's start does Noah catch up with her, and how far from home are they then?",
    "answer": {
     "value": 24,
     "unit": "km"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 80,
      "unit": "min",
      "etikett": "time after Ella's start"
     },
     {
      "del": "b",
      "value": 24,
      "unit": "km",
      "etikett": "distance from home"
     }
    ],
    "solution": "**The key insight:** with constant speed the distance is proportional to the time you have been cycling. For Noah that is not $x$, but $x$ minus the 20 minutes he waited. So whether a relationship is proportional depends on where you start counting the time.\n\n**a)** Ella has cycled for $x$ hours, so her distance is the speed times the time, $18x$ km.\n\nNoah starts 20 minutes, that is $\\dfrac{1}{3}$ hour, later. He has cycled for $x - \\dfrac{1}{3}$ hours:\n\n$$ 24\\left(x - \\frac{1}{3}\\right) = 24x - 8 $$\n\nThe formula applies once Noah has started, that is, for $x \\geq \\dfrac{1}{3}$.\n\nNoah's formula has the constant term $-8$, so the graph does not pass through the origin. His distance is proportional to his own cycling time, but not to $x$.\n\n**Answer:** Ella: $y = 18x$. Noah: $y = 24x - 8$. Noah's distance is not proportional to $x$.\n\n**b)** Noah catches up when they have cycled the same distance:\n\n$$ 18x = 24x - 8 $$\n\nSubtract $18x$ from both sides:\n\n$$ 18x \\mathbin{\\boldsymbol{-}} \\boldsymbol{18x} = 24x - 8 \\mathbin{\\boldsymbol{-}} \\boldsymbol{18x} $$\n\n$$ 0 = 6x - 8 $$\n\nAdd 8 to both sides:\n\n$$ 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{8} = 6x - 8 \\mathbin{\\boldsymbol{+}} \\boldsymbol{8} $$\n\n$$ 8 = 6x $$\n\nDivide both sides by 6:\n\n$$ \\frac{8}{\\boldsymbol{6}} = \\frac{6x}{\\boldsymbol{6}} $$\n\n$$ x = \\frac{4}{3} $$\n\n$\\dfrac{4}{3}$ hour is 1 hour and 20 minutes, that is, 80 minutes. The distance: $18 \\cdot \\dfrac{4}{3} = 24$ km.\n\nCheck with Noah's formula: $24 \\cdot \\dfrac{4}{3} - 8 = 32 - 8 = 24$ km.\n\nIs it reasonable? When Noah starts, Ella has a lead of $18 \\cdot \\dfrac{1}{3} = 6$ km. Noah gains $24 - 18 = 6$ km an hour, so it takes him 1 hour, that is, 80 minutes after Ella's start.\n\n**Answer:** 80 minutes after Ella's start, 24 km from home\n\n**General conclusion:** a motion at constant speed is a proportionality between distance and time only if the time is counted from the start. If the time is measured from another event, the formula gets a constant term, and then the relationship is linear but not proportional."
   }
  ]
 },
 "ma1c-4.3": {
  "kalla": "3ae1de5701",
  "data": [
   {
    "level": 1,
    "question": "You are going to draw the graph of $y = -2x + 3$ and make a table of values. Which *y*-value belongs to $x = -2$?",
    "answer": {
     "value": 7,
     "unit": ""
    },
    "solution": "Substitute $x = -2$ (remember the sign rules):\n\n$$ y = -2 \\cdot (-2) + 3 = 4 + 3 = 7 $$\n\nThe row gives the coordinates (−2, 7).\n\n**Answer:** $y = 7$"
   },
   {
    "level": 1,
    "question": "The row $x = 4$, $y = -5$ in a table of values corresponds to a point in the coordinate system. Which one?",
    "choices": [
     "$(-4, -5)$",
     "$(4, -5)$",
     "$(-5, 4)$",
     "$(4, 5)$"
    ],
    "correct": 1,
    "solution": "Each row in the table of values is a coordinate pair with the *x*-value first and the *y*-value last: (4, −5).\n\n**Answer:** $(4, -5)$"
   },
   {
    "level": 1,
    "question": "What is the last step when you draw the graph of a linear equation by hand?",
    "choices": [
     "Join the plotted points with a straight line",
     "Measure the slope with a protractor",
     "Rub out the table of values",
     "Mark the origin with a dot"
    ],
    "correct": 0,
    "solution": "The method is: table of values → plot the points → **join the points with a straight line**. The line is the graph.\n\n**Answer:** Join the points with a straight line."
   },
   {
    "level": 2,
    "question": "You are going to draw the graph of $y = 3x - 4$ for $x$ from −2 to 2. Which intervals must the axes cover at least?",
    "choices": [
     "The *x*-axis −2 to 2 and the *y*-axis −10 to 2",
     "The *x*-axis −2 to 2 and the *y*-axis −4 to 4",
     "The *x*-axis 0 to 2 and the *y*-axis 0 to 2",
     "The *x*-axis −10 to 10 and the *y*-axis −10 to 10"
    ],
    "correct": 0,
    "solution": "Calculate the end points: $x = -2$ gives $y = 3 \\cdot (-2) - 4 = -10$ and $x = 2$ gives $y = 3 \\cdot 2 - 4 = 2$. The axes must cover the smallest and largest values: x from −2 to 2, y from −10 to 2.\n\n**Answer:** The *x*-axis −2 to 2 and the *y*-axis −10 to 2."
   },
   {
    "level": 2,
    "question": "The point $(5, a)$ lies on the graph of $y = -2x + 3$. Find $a$.",
    "answer": {
     "value": -7,
     "unit": ""
    },
    "solution": "That the point lies on the graph means that the coordinates satisfy the equation. Substitute $x = 5$:\n\n$$ a = -2 \\cdot 5 + 3 = -10 + 3 = -7 $$\n\n**Answer:** $a = -7$"
   },
   {
    "level": 3,
    "question": "The line $y = -3x + 20$ is given.<br>a) Find the number $a$ so that the point $(a,\\ 2a + 5)$ lies on the line. Which point is it?<br>b) Is there a point on the line where the *x*-coordinate and the *y*-coordinate are equally large but have different signs? If so, find it.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b",
      "value": 10,
      "unit": "",
      "etikett": "$x$-coordinate"
     },
     {
      "del": "b",
      "value": -10,
      "unit": "",
      "etikett": "$y$-coordinate"
     }
    ],
    "solution": "**The key insight:** a point lies on a line when its coordinates satisfy the equation of the line. Substitute the point's *x*-coordinate into the equation and require the result to be the point's *y*-coordinate. Then you get an equation for the unknown number.\n\n**a)** Substituting $x = a$ into the equation of the line gives the *y*-value $-3a + 20$. It must equal the point's *y*-coordinate $2a + 5$:\n\n$$ 2a + 5 = -3a + 20 $$\n\nAdd $3a$ to both sides:\n\n$$ 2a + 5 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3a} = -3a + 20 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3a} $$\n\n$$ 5a + 5 = 20 $$\n\nSubtract 5 from both sides:\n\n$$ 5a + 5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} = 20 \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} $$\n\n$$ 5a = 15 $$\n\nDivide both sides by 5:\n\n$$ \\frac{5a}{\\boldsymbol{5}} = \\frac{15}{\\boldsymbol{5}} $$\n\n$$ a = 3 $$\n\nThe point is $(3,\\ 2 \\cdot 3 + 5) = (3, 11)$. Check: $-3 \\cdot 3 + 20 = 11$.\n\nAnother way to see it: the points $(a,\\ 2a + 5)$ all lie on the line $y = 2x + 5$. So the question is where that line crosses $y = -3x + 20$.\n\n**Answer:** $a = 3$, and the point is $(3, 11)$\n\n**b)** Equally large coordinates with different signs means that the point is $(x, -x)$. It lies on the line if\n\n$$ -x = -3x + 20 $$\n\nAdd $3x$ to both sides:\n\n$$ -x \\mathbin{\\boldsymbol{+}} \\boldsymbol{3x} = -3x + 20 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3x} $$\n\n$$ 2x = 20 $$\n\nDivide both sides by 2:\n\n$$ \\frac{2x}{\\boldsymbol{2}} = \\frac{20}{\\boldsymbol{2}} $$\n\n$$ x = 10 $$\n\nThe point is $(10, -10)$. Check: $-3 \\cdot 10 + 20 = -10$.\n\n**Answer:** Yes, the point $(10, -10)$\n\n**General conclusion:** a condition on a point's coordinates, such as \"$y$ is $2x + 5$\" or \"$y$ is $\\mathord{-}x$\", is in fact a new line. Finding the point on the given line means finding where the two lines cross each other."
   },
   {
    "level": 3,
    "question": "The graph of $y = 2x - 3$ is reflected in one of the coordinate axes. Use a table of values with $x = -2, -1, 0, 1$ and $2$ and find the equation of the reflected line when the graph is reflected in<br>a)&nbsp;the *y*-axis&emsp;&emsp;b)&nbsp;the *x*-axis<br>c) The graph is reflected first in the *x*-axis and then in the *y*-axis. What equation does the line get then, and how does it lie in relation to the original line?",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -2,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": -3,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": -2,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "b",
      "value": 3,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "c",
      "value": 2,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "c",
      "value": 3,
      "unit": "",
      "etikett": "$m =$"
     }
    ],
    "solution": "**The key insight:** reflection in the *y*-axis changes the sign of the *x*-coordinate of every point, and reflection in the *x*-axis changes the sign of the *y*-coordinate. Reflect the points in the table of values, and then read off the new line's *y*-intercept and step.\n\nTable of values for $y = 2x - 3$:\n\n| $x$ | $-2$ | $-1$ | 0 | 1 | 2 |\n| --- | --- | --- | --- | --- | --- |\n| $y$ | $-7$ | $-5$ | $-3$ | $-1$ | 1 |\n\n**a)** In the *y*-axis the *x*-coordinate changes sign. The points become $(2, -7)$, $(1, -5)$, $(0, -3)$, $(-1, -1)$ and $(-2, 1)$.\n\nThe line still crosses the *y*-axis at $(0, -3)$, so $m = -3$. If you go one step to the right, from $x = 0$ to $x = 1$, *y* goes from $-3$ to $-5$, that is, 2 steps down. So $k = -2$.\n\nCheck: $x = 2$ gives $-2 \\cdot 2 - 3 = -7$, like the point $(2, -7)$.\n\n**Answer:** $y = -2x - 3$\n\n**b)** In the *x*-axis the *y*-coordinate changes sign. The points become $(-2, 7)$, $(-1, 5)$, $(0, 3)$, $(1, 1)$ and $(2, -1)$.\n\nThe line crosses the *y*-axis at $(0, 3)$, so $m = 3$. One step to the right takes *y* from 3 to 1, that is, 2 steps down, and $k = -2$.\n\nCheck: $x = -2$ gives $-2 \\cdot (-2) + 3 = 7$, like the point $(-2, 7)$.\n\n**Answer:** $y = -2x + 3$\n\n**c)** After both reflections both coordinates have changed sign. The points become $(2, 7)$, $(1, 5)$, $(0, 3)$, $(-1, 1)$ and $(-2, -1)$.\n\nThe line crosses the *y*-axis at $(0, 3)$, and one step to the right takes *y* from 3 to 5, that is, 2 steps up. The line is $y = 2x + 3$.\n\nIt has the same slope as $y = 2x - 3$, but crosses the *y*-axis 6 steps higher up. The two lines are parallel.\n\n**Answer:** $y = 2x + 3$, which is parallel to the original line but lies 6 steps higher.\n\n**General conclusion:** reflection in an axis changes the sign of either the number in front of $x$ or both numbers in the equation. Two reflections in a row give a line with the same slope as at the start, and therefore a parallel line."
   },
   {
    "level": 3,
    "question": "Alva builds squares in a row with matches. Figure 1 is a square made of 4 matches. Figure 2 is two squares next to each other, with a shared side, and needs 7 matches. Figure 3 is three squares in a row and needs 10 matches, and so on.<br>a) Set up a formula for the number of matches $y$ in figure number $x$. How many matches does figure 20 need?<br>b) Can a figure consist of exactly 100 matches? Of exactly 150?<br>c) Alva draws the relationship in a coordinate system. Should she draw a line through the points? Justify your answer.",
    "answer": {
     "value": 61,
     "unit": "matches"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 61,
      "unit": "matches",
      "etikett": "figure 20"
     },
     {
      "del": "b",
      "value": 33,
      "unit": "",
      "etikett": "figure number for 100 matches"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** each new square shares a side with the previous one, so it only needs 3 new matches. The number therefore increases by 3 for each figure, and the relationship is linear. But the figure number is always a positive whole number.\n\n**a)** Figure 1 has 4 matches, and each new figure has 3 more. If we go back one step, to an imagined \"figure 0\", we get $4 - 3 = 1$. So the constant term is 1 and the number in front of $x$ is 3.\n\nCheck: $x = 3$ gives $3 \\cdot 3 + 1 = 10$, as in figure 3.\n\nFigure 20:\n\n$$ 3 \\cdot 20 + 1 = 61 $$\n\n**Answer:** $y = 3x + 1$, and figure 20 needs 61 matches.\n\n**b)** *100 matches:*\n\n$$ 3x + 1 = 100 $$\n\nSubtract 1 from both sides:\n\n$$ 3x + 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} = 100 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} $$\n\n$$ 3x = 99 $$\n\nDivide both sides by 3:\n\n$$ \\frac{3x}{\\boldsymbol{3}} = \\frac{99}{\\boldsymbol{3}} $$\n\n$$ x = 33 $$\n\nThat is a whole number, so figure 33 has exactly 100 matches.\n\n*150 matches:* in the same way $3x = 149$ and\n\n$$ x = \\frac{149}{3} = 49.666\\ldots $$\n\nThere is no figure number $49.666\\ldots$. Figure 49 has $3 \\cdot 49 + 1 = 148$ matches and figure 50 has $3 \\cdot 50 + 1 = 151$.\n\n**Answer:** 100 matches is possible, it is figure 33. 150 matches is not possible, since the equation has no whole-number solution.\n\n**c)** There are only figures for $x = 1, 2, 3, \\ldots$ Between the points, for example at $x = 1.5$, there is no figure. The graph should therefore be drawn as separate points along a straight line, not as a solid line.\n\n**Answer:** No. The number of the figure is a whole number, so the graph consists of points with $x = 1, 2, 3, \\ldots$ that lie on a straight line, but the line between them means nothing.\n\n**General conclusion:** an equation such as $y = 3x + 1$ gives a straight line, but in an application it is the context that decides which $x$ are allowed. Sometimes there is a solution to the equation that is not a solution to the problem."
   },
   {
    "level": 3,
    "question": "Nora is going to draw the graph of $y = 4 - 3x$. She interprets the number 4 as the slope of the line and $-3$ as the height where the line crosses the *y*-axis, and therefore draws the graph of $y = 4x - 3$.<br>a) Explain Nora's mistake.<br>b) Nora's line and the correct line cross each other. Find the point of intersection.<br>c) Show that the lines $y = ax + b$ and $y = bx + a$ always cross each other where $x = 1$ if $a \\neq b$.",
    "answer": {
     "value": 1,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 1,
      "unit": "",
      "etikett": "$x$-coordinate"
     },
     {
      "del": "b",
      "value": 1,
      "unit": "",
      "etikett": "$y$-coordinate"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the slope is the number in front of $x$, wherever it stands in the equation. If you swap the slope and the constant term you get a different line, but at $x = 1$ both lines give the same sum of the two numbers.\n\n**a)** In $y = 4 - 3x$, $-3$ stands in front of $x$. That is the slope: one step to the right gives 3 steps down. The number 4 is the constant term, so the line crosses the *y*-axis at $(0, 4)$. The equation can be written $y = -3x + 4$. Nora read the numbers in the order they appear instead of looking at what stands in front of $x$.\n\n**Answer:** The slope is $-3$, because that is the number in front of $x$, and the line crosses the *y*-axis at 4. Nora has swapped them.\n\n**b)** The lines cross each other where they have the same *y*-value:\n\n$$ 4x - 3 = 4 - 3x $$\n\nAdd $3x$ to both sides:\n\n$$ 4x - 3 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3x} = 4 - 3x \\mathbin{\\boldsymbol{+}} \\boldsymbol{3x} $$\n\n$$ 7x - 3 = 4 $$\n\nAdd 3 to both sides:\n\n$$ 7x - 3 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} = 4 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} $$\n\n$$ 7x = 7 $$\n\nDivide both sides by 7:\n\n$$ \\frac{7x}{\\boldsymbol{7}} = \\frac{7}{\\boldsymbol{7}} $$\n\n$$ x = 1 $$\n\nThe *y*-value: $4 \\cdot 1 - 3 = 1$. Check with the correct line: $4 - 3 \\cdot 1 = 1$.\n\n**Answer:** $(1, 1)$\n\n**c)** The lines cross each other where\n\n$$ ax + b = bx + a $$\n\nSubtract $bx$ from both sides:\n\n$$ ax + b \\mathbin{\\boldsymbol{-}} \\boldsymbol{bx} = bx + a \\mathbin{\\boldsymbol{-}} \\boldsymbol{bx} $$\n\n$$ ax - bx + b = a $$\n\nSubtract $b$ from both sides:\n\n$$ ax - bx + b \\mathbin{\\boldsymbol{-}} \\boldsymbol{b} = a \\mathbin{\\boldsymbol{-}} \\boldsymbol{b} $$\n\n$$ ax - bx = a - b $$\n\nTake out the common factor $x$:\n\n$$ (a - b)x = a - b $$\n\nSince $a \\neq b$, $a - b$ is not 0, and we may divide both sides by it:\n\n$$ \\frac{(a - b)x}{\\boldsymbol{a - b}} = \\frac{a - b}{\\boldsymbol{a - b}} $$\n\n$$ x = 1 $$\n\nCheck: at $x = 1$ both lines give $y = a + b$, and with $a = 4$, $b = -3$ that is $4 + (-3) = 1$, as in b).\n\nIf $a = b$ the lines are the same line, and then there is no single point of intersection.\n\n**Answer:** The equation $ax + b = bx + a$ becomes $(a - b)x = a - b$, and when $a \\neq b$ it gives $x = 1$. The point of intersection is $(1,\\ a + b)$.\n\n**General conclusion:** swapping the slope and the constant term gives a new line that always crosses the old one at $x = 1$, because $a \\cdot 1 + b$ and $b \\cdot 1 + a$ are the same number. A general argument with letters shows why what happened with Nora's numbers was no coincidence."
   },
   {
    "level": 3,
    "question": "The equation $y = kx + 2 - 3k$ gives a new line for every value of the number $k$.<br>a) Make a table of values with $x = 1, 2, 3$ and $4$ for $k = 1$ and for $k = -1$. Which point do the two lines have in common?<br>b) Show that all lines given by the equation pass through that point.<br>c) Find $k$ so that the line passes through the origin.<br>d) Is there any value of $k$ that gives a line through the point $(3, 5)$?",
    "answer": {
     "value": 0.667,
     "unit": "",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3,
      "unit": "",
      "etikett": "$x$-coordinate"
     },
     {
      "del": "a",
      "value": 2,
      "unit": "",
      "etikett": "$y$-coordinate"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 0.667,
      "unit": "",
      "tol": 0.01,
      "etikett": "$k =$"
     },
     {
      "del": "d"
     }
    ],
    "solution": "**The key insight:** when you drag the slider for $k$ in an ordinary equation $y = kx + m$, the line turns about its point on the *y*-axis. Here the constant term also changes when $k$ changes, and the line instead turns about another point. You find that point where $k$ disappears from the equation.\n\n**a)** $k = 1$ gives $y = x + 2 - 3 = x - 1$, and $k = -1$ gives $y = -x + 2 + 3 = -x + 5$.\n\n| $x$ | 1 | 2 | 3 | 4 |\n| --- | --- | --- | --- | --- |\n| $y = x - 1$ | 0 | 1 | 2 | 3 |\n| $y = -x + 5$ | 4 | 3 | 2 | 1 |\n\nFor $x = 3$ both lines have $y = 2$.\n\n**Answer:** $(3, 2)$\n\n**b)** We substitute $x = 3$ into the general equation:\n\n$$ y = k \\cdot 3 + 2 - 3k = 3k - 3k + 2 = 2 $$\n\nThe terms with $k$ cancel each other out, so for $x = 3$, $y = 2$ whatever $k$ is.\n\n**Answer:** For $x = 3$, $y = 3k + 2 - 3k = 2$ for all $k$, so all the lines pass through $(3, 2)$.\n\n**c)** The line passes through the origin when $y = 0$ for $x = 0$:\n\n$$ 0 = k \\cdot 0 + 2 - 3k $$\n\n$$ 0 = 2 - 3k $$\n\nAdd $3k$ to both sides:\n\n$$ 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3k} = 2 - 3k \\mathbin{\\boldsymbol{+}} \\boldsymbol{3k} $$\n\n$$ 3k = 2 $$\n\nDivide both sides by 3:\n\n$$ \\frac{3k}{\\boldsymbol{3}} = \\frac{2}{\\boldsymbol{3}} $$\n\n$$ k = \\frac{2}{3} $$\n\nCheck: $y = \\dfrac{2}{3}x$ gives $y = \\dfrac{2}{3} \\cdot 3 = 2$ for $x = 3$, so the line passes both through the origin and through $(3, 2)$.\n\n**Answer:** $k = \\dfrac{2}{3}$\n\n**d)** All the lines pass through $(3, 2)$, so for $x = 3$, $y$ is always 2. None of the lines can then have $y = 5$ for $x = 3$.\n\n**Answer:** No, all the lines have $y = 2$ when $x = 3$.\n\n**General conclusion:** an equation that can be written $y = k(x - 3) + 2$ describes all lines through the point $(3, 2)$, except the vertical one. Finding such a common point means finding the *x*-value where the parameter disappears."
   },
   {
    "level": 3,
    "question": "Lukas is going to draw the graph of $y = \\dfrac{2}{3}x - 1$ by hand and only wants to use points where both the *x*-coordinate and the *y*-coordinate are whole numbers.<br>a) For which whole numbers $x$ is $y$ a whole number?<br>b) How many such points are there on the line when $-10 \\leq x \\leq 10$? List them.<br>c) Describe with the help of steps how you go from one such point to the next.",
    "answer": {
     "value": 7,
     "unit": "points"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 7,
      "unit": "points"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** $-1$ is already a whole number, so $y$ is a whole number exactly when $\\dfrac{2}{3}x$ is. The numbers 2 and 3 have no common factor, so this requires $x$ to be divisible by 3.\n\n**a)** $\\dfrac{2}{3}x = \\dfrac{2x}{3}$. If $x$ is divisible by 3, for example $x = 6$, we get $\\dfrac{2 \\cdot 6}{3} = 4$, a whole number. If $x$ is not divisible by 3, for example $x = 4$, we get $\\dfrac{2 \\cdot 4}{3} = \\dfrac{8}{3}$, and 8 cannot be divided evenly by 3. The factor 2 can never help with dividing by 3.\n\n**Answer:** When $x$ is divisible by 3, that is $x = \\ldots, -6, -3, 0, 3, 6, \\ldots$\n\n**b)** The numbers divisible by 3 between $-10$ and 10 are $-9, -6, -3, 0, 3, 6$ and 9. The corresponding $y$-values:\n\n| $x$ | $-9$ | $-6$ | $-3$ | 0 | 3 | 6 | 9 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| $y$ | $-7$ | $-5$ | $-3$ | $-1$ | 1 | 3 | 5 |\n\nCheck of one point: $\\dfrac{2}{3} \\cdot 9 - 1 = 6 - 1 = 5$.\n\n**Answer:** 7 points: $(-9, -7)$, $(-6, -5)$, $(-3, -3)$, $(0, -1)$, $(3, 1)$, $(6, 3)$ and $(9, 5)$\n\n**c)** One step to the right gives $\\dfrac{2}{3}$ of a step up, and that does not land on a whole number. Three steps to the right give $3 \\cdot \\dfrac{2}{3} = 2$ steps up. So from $(0, -1)$ you go 3 to the right and 2 up to $(3, 1)$, and then the same again.\n\n**Answer:** Go 3 steps to the right and 2 steps up. Then you land on the next point with whole-number coordinates.\n\n**General conclusion:** for a line $y = \\dfrac{p}{q}x + m$ with a whole number $m$ and a simplified fraction $\\dfrac{p}{q}$, the whole-number points lie at regular intervals: $q$ steps to the right and $p$ steps up. Choosing those *x*-values makes the graph easy to draw exactly."
   },
   {
    "level": 3,
    "question": "A taxi company charges according to $y = 12x + 45$, where $y$ kr is the price of a trip of $x$ km. The company introduces a new tariff. In a coordinate system you can see that the graph of the new tariff lies 15 units higher up on the *y*-axis and is half as steep as the old one.<br>a) Give the formula for the new tariff, and explain what the changes mean for the customers.<br>b) For which trips is the new tariff cheaper than the old one?<br>c) The company is considering another proposal: the start fee is to stay as in the old tariff, but a trip of 10 km is to become 20 % cheaper. What price per kilometre does that give?",
    "answer": {
     "value": 2.5,
     "unit": "km"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 6,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 60,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 2.5,
      "unit": "km"
     },
     {
      "del": "c",
      "value": 8.7,
      "unit": "kr/km"
     }
    ],
    "solution": "**The key insight:** the constant term $m$ is where the graph crosses the *y*-axis, that is, the start fee. The slope $k$ is how much the price increases for every kilometre. So moving the graph up and making it less steep changes the start fee and the price per kilometre separately.\n\n**a)** 15 units higher on the *y*-axis gives the constant term $45 + 15 = 60$. Half as steep gives the slope $\\dfrac{12}{2} = 6$.\n\nThe start fee is raised from 45 kr to 60 kr, but each kilometre costs only 6 kr instead of 12 kr.\n\n**Answer:** $y = 6x + 60$. The start fee is raised by 15 kr and the price per kilometre is halved to 6 kr/km.\n\n**b)** First we find out when the tariffs cost the same:\n\n$$ 12x + 45 = 6x + 60 $$\n\nSubtract $6x$ from both sides:\n\n$$ 12x + 45 \\mathbin{\\boldsymbol{-}} \\boldsymbol{6x} = 6x + 60 \\mathbin{\\boldsymbol{-}} \\boldsymbol{6x} $$\n\n$$ 6x + 45 = 60 $$\n\nSubtract 45 from both sides:\n\n$$ 6x + 45 \\mathbin{\\boldsymbol{-}} \\boldsymbol{45} = 60 \\mathbin{\\boldsymbol{-}} \\boldsymbol{45} $$\n\n$$ 6x = 15 $$\n\nDivide both sides by 6:\n\n$$ \\frac{6x}{\\boldsymbol{6}} = \\frac{15}{\\boldsymbol{6}} $$\n\n$$ x = 2.5 $$\n\nThe new graph is less steep, so to the right of the point of intersection it lies below the old one. Check with 10 km: old tariff $12 \\cdot 10 + 45 = 165$ kr, new $6 \\cdot 10 + 60 = 120$ kr.\n\n**Answer:** For trips longer than 2.5 km\n\n**c)** A trip of 10 km costs 165 kr today. 20 % cheaper is\n\n$$ 0.8 \\cdot 165 = 132\\ \\text{kr} $$\n\nThe start fee 45 kr stays, so the 10 kilometres must cost $132 - 45 = 87$ kr. With the price per kilometre $k$ kr:\n\n$$ 10k + 45 = 132 $$\n\nSubtract 45 from both sides:\n\n$$ 10k + 45 \\mathbin{\\boldsymbol{-}} \\boldsymbol{45} = 132 \\mathbin{\\boldsymbol{-}} \\boldsymbol{45} $$\n\n$$ 10k = 87 $$\n\nDivide both sides by 10:\n\n$$ \\frac{10k}{\\boldsymbol{10}} = \\frac{87}{\\boldsymbol{10}} $$\n\n$$ k = 8.7 $$\n\nCheck: $8.7 \\cdot 10 + 45 = 132$, and $\\dfrac{132}{165} = 0.8$.\n\nNotice that the price per kilometre is lowered by more than 20 %, from 12 kr to $8.7$ kr, because the start fee is not lowered at all.\n\n**Answer:** 8.70 kr per kilometre\n\n**General conclusion:** in $y = kx + m$, $m$ controls where the graph crosses the *y*-axis and $k$ how steep it is. A less steep graph with a higher starting point always ends up cheapest in the end, and the break-even point is where the graphs cross each other."
   }
  ]
 },
 "ma1c-4.4": {
  "kalla": "0502013771",
  "data": [
   {
    "level": 1,
    "question": "What does the $m$-value correspond to in the equation of a straight line $y = kx + m$?",
    "choices": [
     "The length of the line",
     "The slope of the line",
     "Where the line crosses the *y*-axis",
     "Where the line crosses the *x*-axis"
    ],
    "correct": 2,
    "solution": "The $m$-value is where the line crosses the *y*-axis (the *y*-intercept), in linear models the \"starting value\". The slope is the $k$-value.\n\n**Answer:** Where the line crosses the *y*-axis."
   },
   {
    "level": 1,
    "question": "A line has the slope 4 and crosses the *y*-axis at (0, −2). What is the equation of the line?",
    "choices": [
     "$y = -2x + 4$",
     "$y = 4x + 2$",
     "$y = 2x - 4$",
     "$y = 4x - 2$"
    ],
    "correct": 3,
    "solution": "Substitute $k = 4$ and $m = -2$ into the equation of a straight line $y = kx + m$:\n\n$$ y = 4x - 2 $$\n\n**Answer:** $y = 4x - 2$"
   },
   {
    "level": 1,
    "question": "A line passes through the points (0, 5) and (1, 8). Find the $k$-value of the line.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "The step method between the points (go to the right):\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{8 - 5}{1 - 0} = \\frac{3}{1} = 3 $$\n\n**Answer:** $k = 3$"
   },
   {
    "level": 2,
    "question": "A line passes through the points (2, 11) and (6, 3). Find the gradient of the line.",
    "answer": {
     "value": -2,
     "unit": ""
    },
    "solution": "A step from (2, 11) to (6, 3):\n\n$$ \\Delta y = 3 - 11 = -8 \\qquad \\Delta x = 6 - 2 = 4 $$\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{-8}{4} = -2 $$\n\nThe line slopes downwards, so the $k$-value is negative.\n\n**Answer:** $k = -2$"
   },
   {
    "level": 2,
    "question": "A straight line has the equation $y = kx + m$. The line passes through (0, 7) and has the slope $-\\dfrac{1}{2}$. What *y*-value does the line have at $x = 8$?",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "The *y*-intercept gives $m = 7$, and $k = -\\dfrac{1}{2}$:\n\n$$ y = -\\frac{1}{2}x + 7 $$\n\nAt $x = 8$:\n\n$$ y = -\\frac{1}{2} \\cdot 8 + 7 = -4 + 7 = 3 $$\n\n**Answer:** $y = 3$"
   },
   {
    "level": 3,
    "question": "The line in the figure crosses the *y*-axis between two grid lines, so the $m$-value cannot be read off exactly.<br>a) Find the exact equation of the line.<br>b) Find exactly where the line crosses the *x*-axis.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"104.4\" y1=\"30\" x2=\"104.4\" y2=\"290\"/><line x1=\"148.9\" y1=\"30\" x2=\"148.9\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"237.8\" y1=\"30\" x2=\"237.8\" y2=\"290\"/><line x1=\"282.2\" y1=\"30\" x2=\"282.2\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"371.1\" y1=\"30\" x2=\"371.1\" y2=\"290\"/><line x1=\"415.6\" y1=\"30\" x2=\"415.6\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"252.9\" x2=\"460\" y2=\"252.9\"/><line x1=\"60\" y1=\"215.7\" x2=\"460\" y2=\"215.7\"/><line x1=\"60\" y1=\"178.6\" x2=\"460\" y2=\"178.6\"/><line x1=\"60\" y1=\"141.4\" x2=\"460\" y2=\"141.4\"/><line x1=\"60\" y1=\"104.3\" x2=\"460\" y2=\"104.3\"/><line x1=\"60\" y1=\"67.1\" x2=\"460\" y2=\"67.1\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">x</tspan></text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">y</tspan></text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"104.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"148.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"237.8\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"282.2\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"371.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"415.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">9</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"257.9\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"220.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"183.6\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"146.4\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"109.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"72.1\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">7</text></g><path d=\"M 60.0 79.5 L 437.8 290.0\" stroke=\"#2563c9\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 8.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -0.6667,
      "unit": "",
      "tol": 0.01,
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 5.667,
      "unit": "",
      "tol": 0.01,
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 8.5,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** $k$ can be found exactly with a step between two points where the line passes through corners of the grid. Once $k$ is known, $m$ is calculated from one of the points instead of being guessed from the graph.\n\n**a)** The line passes through the grid corners $(1, 5)$ and $(7, 1)$. The step from the left point to the right point is 6 steps to the right and 4 steps down, so $\\Delta x = 6$ and $\\Delta y = -4$:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{-4}{6} = -\\frac{2}{3} $$\n\nSo the line is $y = -\\dfrac{2}{3}x + m$. The point $(1, 5)$ lies on the line, so its coordinates satisfy the equation:\n\n$$ 5 = -\\frac{2}{3} \\cdot 1 + m $$\n\nAdd $\\dfrac{2}{3}$ to both sides:\n\n$$ 5 \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{2}{3}} = -\\frac{2}{3} + m \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{2}{3}} $$\n\n$$ \\frac{17}{3} = m $$\n\nCheck with the other point $(7, 1)$: $-\\dfrac{2}{3} \\cdot 7 + \\dfrac{17}{3} = \\dfrac{-14 + 17}{3} = 1$. It agrees.\n\nIs it reasonable? $\\dfrac{17}{3} \\approx 5.67$, and in the figure the line crosses the *y*-axis a little above 5.\n\n**Answer:** $y = -\\dfrac{2}{3}x + \\dfrac{17}{3}$\n\n**b)** On the *x*-axis $y = 0$:\n\n$$ 0 = -\\frac{2}{3}x + \\frac{17}{3} $$\n\nAdd $\\dfrac{2}{3}x$ to both sides:\n\n$$ 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{2}{3}x} = -\\frac{2}{3}x + \\frac{17}{3} \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{2}{3}x} $$\n\n$$ \\frac{2}{3}x = \\frac{17}{3} $$\n\nMultiply both sides by $\\dfrac{3}{2}$:\n\n$$ \\boldsymbol{\\frac{3}{2}} \\mathbin{\\boldsymbol{\\cdot}} \\frac{2}{3}x = \\boldsymbol{\\frac{3}{2}} \\mathbin{\\boldsymbol{\\cdot}} \\frac{17}{3} $$\n\n$$ x = \\frac{17}{2} = 8.5 $$\n\nCheck with the step: from $(7, 1)$ the line must go 1 more step down, and that takes $\\dfrac{3}{2}$ steps to the right. That gives $x = 7 + 1.5 = 8.5$.\n\n**Answer:** At the point $(8.5,\\ 0)$\n\n**General conclusion:** never read off a value that lies between the grid lines. Choose two points that lie exactly on corners of the grid, calculate $k$ with the step and then calculate $m$ by substitution."
   },
   {
    "level": 3,
    "question": "The line $y = kx + 6$ forms a triangle in the first quadrant together with the coordinate axes.<br>a) Find $k$ so that the area of the triangle is 12 area units.<br>b) For which values of $k$ is the area of the triangle greater than 9 area units?",
    "answer": {
     "value": -1.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -1.5,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** $m = 6$ gives the height of the triangle along the *y*-axis. The triangle ends up in the first quadrant only if the line slopes downwards, that is, if $k < 0$. The base along the *x*-axis is the distance to where the line crosses the *x*-axis, and it depends on $k$.\n\n**a)** The line crosses the *y*-axis at $(0, 6)$, so the height is 6. On the *x*-axis $y = 0$:\n\n$$ 0 = kx + 6 $$\n\nSubtract 6 from both sides:\n\n$$ 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{6} = kx + 6 \\mathbin{\\boldsymbol{-}} \\boldsymbol{6} $$\n\n$$ -6 = kx $$\n\nDivide both sides by $k$:\n\n$$ \\frac{-6}{\\boldsymbol{k}} = \\frac{kx}{\\boldsymbol{k}} $$\n\n$$ x = -\\frac{6}{k} $$\n\nSince $k < 0$, $-\\dfrac{6}{k}$ is positive, and that is the base. The area of the triangle is base times height divided by 2:\n\n$$ \\text{area} = \\frac{1}{2} \\cdot \\left(-\\frac{6}{k}\\right) \\cdot 6 = -\\frac{18}{k} $$\n\nThe area must be 12:\n\n$$ -\\frac{18}{k} = 12 $$\n\nMultiply both sides by $k$:\n\n$$ \\boldsymbol{k} \\mathbin{\\boldsymbol{\\cdot}} \\left(-\\frac{18}{k}\\right) = \\boldsymbol{k} \\mathbin{\\boldsymbol{\\cdot}} 12 $$\n\n$$ -18 = 12k $$\n\nDivide both sides by 12:\n\n$$ \\frac{-18}{\\boldsymbol{12}} = \\frac{12k}{\\boldsymbol{12}} $$\n\n$$ k = -1.5 $$\n\nCheck: the line $y = -1.5x + 6$ crosses the *x*-axis where $1.5x = 6$, that is, at $x = 4$. The area is $\\dfrac{4 \\cdot 6}{2} = 12$. It agrees.\n\n**Answer:** $k = -1.5$\n\n**b)** The area $-\\dfrac{18}{k}$ must be greater than 9. Write $\\mathord{-}k$ as a positive number, since $k < 0$:\n\n$$ \\frac{18}{-k} > 9 $$\n\nMultiply both sides by $-k$. It is a positive number, so the inequality sign keeps its direction:\n\n$$ \\boldsymbol{(-k)} \\mathbin{\\boldsymbol{\\cdot}} \\frac{18}{-k} > \\boldsymbol{(-k)} \\mathbin{\\boldsymbol{\\cdot}} 9 $$\n\n$$ 18 > -9k $$\n\nDivide both sides by 9:\n\n$$ \\frac{18}{\\boldsymbol{9}} > \\frac{-9k}{\\boldsymbol{9}} $$\n\n$$ 2 > -k $$\n\nSo $k > -2$. At the same time $k < 0$ is needed for the triangle to lie in the first quadrant.\n\nCheck: $k = -1$ gives the base 6 and the area $\\dfrac{6 \\cdot 6}{2} = 18$, which is greater than 9. $k = -3$ gives the base 2 and the area $\\dfrac{2 \\cdot 6}{2} = 6$, which is less than 9.\n\nIs it reasonable? The less steep the line is, the further out it crosses the *x*-axis, and the larger the triangle becomes.\n\n**Answer:** $-2 < k < 0$\n\n**General conclusion:** when a line forms a triangle together with the axes, $m$ is one leg and the crossing with the *x*-axis, $-\\dfrac{m}{k}$, is the other. A steeper line gives a smaller triangle."
   },
   {
    "level": 3,
    "question": "Two candles, A and B, are lit at the same time. The diagram shows the height $h$ cm of the candles during the first two hours. Assume that both candles keep burning down at the same rate.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"126.7\" y1=\"30\" x2=\"126.7\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"393.3\" y1=\"30\" x2=\"393.3\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"268.3\" x2=\"460\" y2=\"268.3\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"225.0\" x2=\"460\" y2=\"225.0\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"181.7\" x2=\"460\" y2=\"181.7\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"138.3\" x2=\"460\" y2=\"138.3\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"95.0\" x2=\"460\" y2=\"95.0\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"51.7\" x2=\"460\" y2=\"51.7\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (h)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">h</tspan> (cm)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"126.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0.5</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1.5</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"393.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2.5</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"273.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"230.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"186.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"53\" y=\"143.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">14</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">16</text><text x=\"53\" y=\"100.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">18</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"56.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">22</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">24</text></g><path d=\"M 60.0 30.0 L 326.7 95.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M 60.0 95.0 L 326.7 116.7\" stroke=\"#2563c9\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\nThe red line shows candle A and the blue line shows candle B.<br>a) Find an equation for the height $h$ cm of each candle as a function of the time $t$ hours.<br>b) After how long are the candles equally tall?<br>c) How long does each candle burn? For which values of $t$ is the model for candle A reasonable?",
    "answer": {
     "value": 3,
     "unit": "h"
    },
    "delsvar": [
     {
      "del": "a",
      "value": -3,
      "unit": "",
      "etikett": "candle A: $k =$"
     },
     {
      "del": "a",
      "value": 24,
      "unit": "",
      "etikett": "candle A: $m =$"
     },
     {
      "del": "a",
      "value": -1,
      "unit": "",
      "etikett": "candle B: $k =$"
     },
     {
      "del": "a",
      "value": 18,
      "unit": "",
      "etikett": "candle B: $m =$"
     },
     {
      "del": "b",
      "value": 3,
      "unit": "h"
     },
     {
      "del": "c",
      "value": 8,
      "unit": "h",
      "etikett": "candle A"
     },
     {
      "del": "c",
      "value": 18,
      "unit": "h",
      "etikett": "candle B"
     }
    ],
    "solution": "**The key insight:** in a linear model $m$ is the starting value and $k$ is the rate of change. Candle A is taller at the start but burns down faster, so candle B catches up. That happens when the two expressions for the height are equal.\n\n**a)** Candle A is 24 cm at the start, so $m = 24$. In 2 hours the height falls from 24 cm to 18 cm. The rate of change is the change in height divided by the time:\n\n$$ k = \\frac{\\Delta h}{\\Delta t} = \\frac{18 - 24}{2} = \\frac{-6}{2} = -3 $$\n\nCandle B is 18 cm at the start and falls to 16 cm in 2 hours:\n\n$$ k = \\frac{\\Delta h}{\\Delta t} = \\frac{16 - 18}{2} = \\frac{-2}{2} = -1 $$\n\nSo candle A burns down 3 cm per hour and candle B 1 cm per hour.\n\n**Answer:** Candle A: $h = -3t + 24$. Candle B: $h = -t + 18$.\n\n**b)** The candles are equally tall when the right-hand sides are equal:\n\n$$ -3t + 24 = -t + 18 $$\n\nAdd $3t$ to both sides:\n\n$$ -3t + 24 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3t} = -t + 18 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3t} $$\n\n$$ 24 = 2t + 18 $$\n\nSubtract 18 from both sides:\n\n$$ 24 \\mathbin{\\boldsymbol{-}} \\boldsymbol{18} = 2t + 18 \\mathbin{\\boldsymbol{-}} \\boldsymbol{18} $$\n\n$$ 6 = 2t $$\n\nDivide both sides by 2:\n\n$$ \\frac{6}{\\boldsymbol{2}} = \\frac{2t}{\\boldsymbol{2}} $$\n\n$$ t = 3 $$\n\nCheck: candle A is $-3 \\cdot 3 + 24 = 15$ cm and candle B is $-3 + 18 = 15$ cm. It agrees.\n\nIs it reasonable? The difference in height is 6 cm at the start and decreases by $3 - 1 = 2$ cm per hour, so it is gone after $\\dfrac{6}{2} = 3$ hours.\n\n**Answer:** After 3 hours, when both are 15 cm tall\n\n**c)** A candle has burnt out when $h = 0$. For candle A:\n\n$$ 0 = -3t + 24 $$\n\nAdd $3t$ to both sides:\n\n$$ 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3t} = -3t + 24 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3t} $$\n\n$$ 3t = 24 $$\n\nDivide both sides by 3:\n\n$$ \\frac{3t}{\\boldsymbol{3}} = \\frac{24}{\\boldsymbol{3}} $$\n\n$$ t = 8 $$\n\nIn the same way $0 = -t + 18$ gives that candle B burns out after $t = 18$.\n\nFor $t > 8$ the model for candle A gives a negative height, and that is impossible. The model is only reasonable for $0 \\leq t \\leq 8$. In reality the candle probably goes out a while before the height is 0, when the wick no longer has any wax around it.\n\n**Answer:** Candle A burns for 8 hours and candle B for 18 hours. The model for candle A is reasonable for $0 \\leq t \\leq 8$.\n\n**General conclusion:** in a linear model $k$ is the change per unit of time and $m$ is the starting value. Two models are compared by setting the expressions equal, and a model only applies as long as it gives values that are possible in reality."
   },
   {
    "level": 3,
    "question": "A mobile subscription costs $y$ kr for $x$ GB of data. The graph shows the relationship. Lisa is going to find the equation of the line and writes:\n\n\"The step is 3 squares high and 5 squares long, so $k = \\dfrac{3}{5} = 0.6$. The line crosses the *y*-axis one square up, so $m = 1$. The equation is $y = 0.6x + 1$.\"\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">x</tspan> (GB)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">y</tspan> (kr)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">100</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">200</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">300</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">400</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">500</text></g><path d=\"M 60.0 238.0 L 460.0 82.0\" stroke=\"#2563c9\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\na) Explain what Lisa has done wrong.<br>b) Find the correct equation of the line and interpret the $k$-value and the $m$-value in the context.",
    "answer": {
     "value": 30,
     "unit": "kr/GB"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 30,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "b",
      "value": 100,
      "unit": "",
      "etikett": "$m =$"
     }
    ],
    "solution": "**The key insight:** a square does not mean the same thing on the two axes. Here one square is 2 GB horizontally but 100 kr vertically. $\\Delta x$ and $\\Delta y$ must therefore be measured in the units of the axes, not in numbers of squares.\n\n**a)** Lisa has counted squares. Her step is drawn correctly, but 5 squares horizontally is $5 \\cdot 2 = 10$ GB and 3 squares vertically is $3 \\cdot 100 = 300$ kr. She makes the same mistake with $m$: one square up on the *y*-axis is 100 kr, not 1.\n\nHer equation can be checked: $y = 0.6x + 1$ gives 1 kr for 0 GB, but the graph shows 100 kr.\n\n**Answer:** Lisa counts squares instead of reading off the values on the axes. One square is 2 GB horizontally and 100 kr vertically, so both $k$ and $m$ are wrong.\n\n**b)** The line passes through $(0, 100)$ and $(10, 400)$. The slope is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{400 - 100}{10 - 0} = \\frac{300}{10} = 30 $$\n\nThe line crosses the *y*-axis at 100, so $m = 100$.\n\nCheck with another point on the graph: $x = 4$ gives $y = 30 \\cdot 4 + 100 = 220$, and the line lies just above 200 kr at 4 GB. It agrees.\n\n$k = 30$ means that each GB costs 30 kr extra. $m = 100$ is the fixed fee, what you pay even if you use no data at all.\n\n**Answer:** $y = 30x + 100$. Each GB costs 30 kr, and the fixed fee is 100 kr.\n\n**General conclusion:** always check the scales of the axes before you count steps. Only when a square is the same size in both directions can you count squares directly, and in a context $k$ has the unit \"*y*-unit per *x*-unit\", here kr per GB."
   },
   {
    "level": 3,
    "question": "A straight line crosses the *x*-axis at the point $(p, 0)$ and the *y*-axis at the point $(0, q)$, where $p$ and $q$ are not 0.<br>a) Show that the slope of the line is $k = -\\dfrac{q}{p}$, and use this to find the equation of the line that crosses the axes at $(4, 0)$ and $(0, -3)$.<br>b) A line crosses both axes on the positive side, and the crossing with the *x*-axis is twice as far from the origin as the crossing with the *y*-axis. Show that the slope of the line is always the same, and find it.",
    "answer": {
     "value": -0.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.75,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": -3,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": -0.5,
      "unit": "",
      "etikett": "$k =$"
     }
    ],
    "solution": "**The key insight:** the crossing with the *y*-axis is directly $m = q$. The slope is obtained with a step between the two crossing points, and it depends only on the ratio between $q$ and $p$, not on how large they are.\n\n**a)** Go from $(0, q)$ to $(p, 0)$. The change in the *x*-direction is $\\Delta x = p - 0 = p$ and the change in the *y*-direction is $\\Delta y = 0 - q = -q$. The slope is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{-q}{p} = -\\frac{q}{p} $$\n\nThis holds for all $p$ and $q$ other than 0.\n\nFor the crossing points $(4, 0)$ and $(0, -3)$, $p = 4$ and $q = -3$:\n\n$$ k = -\\frac{q}{p} = -\\frac{-3}{4} = \\frac{3}{4} $$\n\nThe line crosses the *y*-axis at $(0, -3)$, so $m = -3$.\n\nCheck: $x = 4$ gives $y = \\dfrac{3}{4} \\cdot 4 - 3 = 3 - 3 = 0$. The line passes through $(4, 0)$.\n\n**Answer:** $y = \\dfrac{3}{4}x - 3$\n\n**b)** Call the crossing with the *y*-axis $(0, q)$ where $q > 0$. The crossing with the *x*-axis is twice as far from the origin, that is, at $(2q, 0)$, so $p = 2q$. The formula from a) gives\n\n$$ k = -\\frac{q}{p} = -\\frac{q}{2q} = -\\frac{1}{2} $$\n\n$q$ cancels, so the slope is $-\\dfrac{1}{2}$ however large $q$ is.\n\nCheck with $q = 3$: the line $y = -\\dfrac{1}{2}x + 3$ crosses the *x*-axis where $\\dfrac{1}{2}x = 3$, that is, at $x = 6 = 2 \\cdot 3$. It agrees.\n\n**Answer:** The slope is always $k = -\\dfrac{1}{2}$\n\n**General conclusion:** the slope of a line is determined by the ratio between the crossing points, not by their size. All lines with the same ratio $\\dfrac{q}{p}$ have the same slope and are therefore parallel."
   },
   {
    "level": 3,
    "question": "The line $y = kx + m$ passes through the first, second and fourth quadrants, but not through the third quadrant.<br>a) What can you say about the signs of $k$ and $m$? Justify your answer.<br>b) Which quadrants does the line $y = mx + k$ then pass through, where $k$ and $m$ have swapped places? Justify your answer.",
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** the sign of $m$ decides whether the line crosses the *y*-axis above or below the origin, and the sign of $k$ decides whether it slopes upwards or downwards. With these two pieces of information you can see which quadrants the line passes through, without calculating.\n\nThe quadrants are numbered anticlockwise: the first quadrant top right, the second top left, the third bottom left and the fourth bottom right.\n\n**a)** The line passes through both the second and the fourth quadrant, that is, both top left and bottom right. Then it must slope downwards, so $k < 0$. (A horizontal line, $k = 0$, never reaches both above and below the *x*-axis.)\n\nThen follow the line to the right from the *y*-axis. It falls all the time, and it must pass through the first quadrant before it crosses the *x*-axis down into the fourth. So it must lie above the *x*-axis when it crosses the *y*-axis, so $m > 0$. With $m < 0$ the line would have been below the *x*-axis all the way to the right, and to the left it would have passed through the third quadrant. With $m = 0$ the line passes through the origin and only through the second and fourth quadrants.\n\nCheck with an example: $y = -x + 2$ crosses the *y*-axis at 2 and the *x*-axis at 2. It passes through the second, first and fourth quadrants.\n\n**Answer:** $k < 0$ and $m > 0$\n\n**b)** The line $y = mx + k$ has the slope $m > 0$, so it slopes upwards, and crosses the *y*-axis at $k < 0$, that is, below the origin. To the right it rises, passes through the fourth quadrant and then crosses the *x*-axis into the first quadrant. To the left it falls even further below the *x*-axis and ends up in the third quadrant. It never reaches the second quadrant, because to the left of the *y*-axis it always lies below $k < 0$.\n\nCheck with the example: $k = -1$ and $m = 2$ give $y = 2x - 1$. The points $(-1, -3)$, $(0.25,\\ -0.5)$ and $(2, 3)$ lie in the third, fourth and first quadrants.\n\n**Answer:** Through the first, third and fourth quadrants, but not through the second\n\n**General conclusion:** the sign of $k$ and the sign of $m$ are enough to decide which quadrants a line passes through. A sloping line that does not pass through the origin always passes through exactly three quadrants, and by swapping $k$ and $m$ you can get a completely different line."
   },
   {
    "level": 3,
    "question": "A company's profit has increased linearly since 2020, according to the graph.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"126.7\" y1=\"30\" x2=\"126.7\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"393.3\" y1=\"30\" x2=\"393.3\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"252.9\" x2=\"460\" y2=\"252.9\"/><line x1=\"60\" y1=\"215.7\" x2=\"460\" y2=\"215.7\"/><line x1=\"60\" y1=\"178.6\" x2=\"460\" y2=\"178.6\"/><line x1=\"60\" y1=\"141.4\" x2=\"460\" y2=\"141.4\"/><line x1=\"60\" y1=\"104.3\" x2=\"460\" y2=\"104.3\"/><line x1=\"60\" y1=\"67.1\" x2=\"460\" y2=\"67.1\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\">Years after 2020</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\">Profit (million kr)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"126.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"393.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"257.9\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"220.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"183.6\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">30</text><text x=\"53\" y=\"146.4\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">40</text><text x=\"53\" y=\"109.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">50</text><text x=\"53\" y=\"72.1\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">60</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">70</text></g><path d=\"M 60.0 141.4 L 460.0 52.3\" stroke=\"#2563c9\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\na) Find an equation for the profit $y$ million kronor $x$ years after 2020.<br>b) By how many per cent did the profit increase from 2020 to 2021, and by how many per cent did it increase from 2025 to 2026? Round to one decimal place.<br>c) How large would the profit have been in 2026 if it had instead increased by the same percentage every year as in the first year? Round to one decimal place.",
    "answer": {
     "value": 6.7,
     "unit": "%",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 40,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 10,
      "unit": "%",
      "etikett": "2020 to 2021"
     },
     {
      "del": "b",
      "value": 6.7,
      "unit": "%",
      "tol": 0.01,
      "etikett": "2025 to 2026"
     },
     {
      "del": "c",
      "value": 70.9,
      "unit": "million kr",
      "tol": 0.005
     }
    ],
    "solution": "**The key insight:** a linear increase is the same number of kronor every year. But every year the increase in per cent is calculated on a larger profit, so the percentage gets smaller every year. An increase by the same percentage every year is exponential instead.\n\n**a)** The line crosses the *y*-axis at 40, so $m = 40$. It passes through the grid corner $(5, 60)$. The slope is the change in profit divided by the number of years:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{60 - 40}{5 - 0} = \\frac{20}{5} = 4 $$\n\nSo the profit increases by 4 million kronor per year.\n\n**Answer:** $y = 4x + 40$\n\n**b)** In 2021, $x = 1$ and the profit is $4 \\cdot 1 + 40 = 44$ million kronor. The increase in per cent is the increase divided by the old value:\n\n$$ \\frac{4}{40} = 0.1 = 10\\ \\% $$\n\nIn 2025, $x = 5$ and the profit is 60 million kronor. In 2026 it is $4 \\cdot 6 + 40 = 64$ million kronor. The increase is still 4 million kronor, but now of 60:\n\n$$ \\frac{4}{60} = 0.0666\\ldots \\approx 6.7\\ \\% $$\n\n**Answer:** 10 % from 2020 to 2021 and about 6.7 % from 2025 to 2026\n\n**c)** An increase of $10\\ \\%$ every year gives the change factor $1.1$ every year. After 6 years:\n\n$$ 40 \\cdot 1.1^6 = 70.862\\ldots \\approx 70.9 $$\n\nCheck: year by year it becomes 44, 48.4, 53.24, 58.56, 64.42 and 70.86 million kronor.\n\nIs it reasonable? Both models give 44 million kronor in 2021, but the exponential increase grows every year and is about 7 million kronor higher after six years.\n\n**Answer:** About 70.9 million kronor\n\n**General conclusion:** in a linear model the increase in kronor is constant, and therefore the percentage increase decreases year by year. If it is instead the percentage that is constant, the model is exponential, and then the increase in kronor grows."
   }
  ]
 },
 "ma1c-4.5": {
  "kalla": "cb60c59c5e",
  "data": [
   {
    "level": 1,
    "question": "Calculate the gradient of the line through the points (1, 2) and (5, 14).",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "The formula for the gradient:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{14 - 2}{5 - 1} = \\frac{12}{4} = 3 $$\n\n**Answer:** $k = 3$"
   },
   {
    "level": 1,
    "question": "A line has the equation $y = 5x - 7$. What is the gradient of the line?",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "In the equation of a straight line $y = kx + m$ the gradient is the number in front of $x$:\n\n$$ k = 5 $$\n\n(−7 is the $m$-value, where the line crosses the *y*-axis.)\n\n**Answer:** $k = 5$"
   },
   {
    "level": 1,
    "question": "Which formula gives the gradient from two points $(x_1, y_1)$ and $(x_2, y_2)$?",
    "choices": [
     "$k = \\dfrac{y_2 + y_1}{x_2 + x_1}$",
     "$k = \\dfrac{x_2 - x_1}{y_2 - y_1}$",
     "$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$",
     "$k = (y_2 - y_1)(x_2 - x_1)$"
    ],
    "correct": 2,
    "solution": "The gradient is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} $$\n\n**Answer:** $k = \\dfrac{y_2 - y_1}{x_2 - x_1}$"
   },
   {
    "level": 2,
    "question": "Calculate the gradient of the line through (−4, 5) and (2, −7).",
    "answer": {
     "value": -2,
     "unit": ""
    },
    "solution": "Substitution into the formula. Keep track of the signs:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{-7 - 5}{2 - (-4)} = \\frac{-12}{6} = -2 $$\n\n**Answer:** $k = -2$"
   },
   {
    "level": 2,
    "question": "A line has the gradient $-3$ and passes through the point (2, 5). Find the $m$-value of the line.",
    "answer": {
     "value": 11,
     "unit": ""
    },
    "solution": "Substitute $k = -3$ and the point's coordinates $x = 2$, $y = 5$ into $y = kx + m$:\n\n$$ 5 = -3 \\cdot 2 + m $$\n\n$$ 5 = -6 + m $$\n\n$$ m = 11 $$\n\n(So the equation of the line is $y = -3x + 11$.)\n\n**Answer:** $m = 11$"
   },
   {
    "level": 3,
    "question": "A straight line passes through the points $(2, a)$ and $(a, 8)$.<br>a) Find $a$ so that the gradient of the line is 3.<br>b) For which value of $a$ does the line have no gradient? Explain why.",
    "answer": {
     "value": 3.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3.5,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b",
      "value": 2,
      "unit": "",
      "etikett": "$a =$"
     }
    ],
    "solution": "**The key insight:** the formula for the gradient works just as well when the coordinates contain an unknown. The requirement $k = 3$ then becomes an equation in $a$. The denominator $x_2 - x_1$ can never be 0, and that gives the answer to b).\n\n**a)** With $(x_1, y_1) = (2, a)$ and $(x_2, y_2) = (a, 8)$ the formula for the gradient gives\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{8 - a}{a - 2} $$\n\nIt must be 3:\n\n$$ \\frac{8 - a}{a - 2} = 3 $$\n\nMultiply both sides by $(a - 2)$:\n\n$$ \\boldsymbol{(a - 2)} \\mathbin{\\boldsymbol{\\cdot}} \\frac{8 - a}{a - 2} = \\boldsymbol{(a - 2)} \\mathbin{\\boldsymbol{\\cdot}} 3 $$\n\n$$ 8 - a = 3a - 6 $$\n\nAdd $a$ to both sides:\n\n$$ 8 - a \\mathbin{\\boldsymbol{+}} \\boldsymbol{a} = 3a - 6 \\mathbin{\\boldsymbol{+}} \\boldsymbol{a} $$\n\n$$ 8 = 4a - 6 $$\n\nAdd 6 to both sides:\n\n$$ 8 \\mathbin{\\boldsymbol{+}} \\boldsymbol{6} = 4a - 6 \\mathbin{\\boldsymbol{+}} \\boldsymbol{6} $$\n\n$$ 14 = 4a $$\n\nDivide both sides by 4:\n\n$$ \\frac{14}{\\boldsymbol{4}} = \\frac{4a}{\\boldsymbol{4}} $$\n\n$$ a = 3.5 $$\n\nCheck: the points become $(2,\\ 3.5)$ and $(3.5,\\ 8)$, and\n\n$$ k = \\frac{8 - 3.5}{3.5 - 2} = \\frac{4.5}{1.5} = 3 $$\n\nIt agrees.\n\n**Answer:** $a = 3.5$\n\n**b)** The gradient does not exist when the denominator $a - 2$ is 0, that is, when $a = 2$. Then the points become $(2, 2)$ and $(2, 8)$. They have the same *x*-coordinate and lie straight above each other, so the line is vertical. A vertical line has $\\Delta x = 0$, and you cannot divide by 0.\n\n**Answer:** $a = 2$, because the line is then vertical and $\\Delta x = 0$\n\n**General conclusion:** conditions on a line, such as a given slope, become equations when the coordinates contain an unknown. Always check that the denominator in the formula for $k$ cannot become 0."
   },
   {
    "level": 3,
    "question": "The points $A = (-2, 7)$, $B = (1, 1)$ and $C = (6, c)$ lie on the same straight line.<br>a) Find $c$.<br>b) Does the point $(50, -95)$ also lie on the line? Solve the task without a calculator.",
    "answer": {
     "value": -9,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -9,
      "unit": "",
      "etikett": "$c =$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** three points lie on the same straight line exactly when the slope is the same between all pairs of points. The line is determined by $A$ and $B$, and then it is enough to see whether the other points satisfy its equation.\n\n**a)** The gradient of the line through $A$ and $B$:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{1 - 7}{1 - (-2)} = \\frac{-6}{3} = -2 $$\n\nThe line is $y = -2x + m$. The point $B = (1, 1)$ lies on the line:\n\n$$ 1 = -2 \\cdot 1 + m $$\n\nAdd 2 to both sides:\n\n$$ 1 \\mathbin{\\boldsymbol{+}} \\boldsymbol{2} = -2 + m \\mathbin{\\boldsymbol{+}} \\boldsymbol{2} $$\n\n$$ 3 = m $$\n\nThe line is $y = -2x + 3$. Check with $A$: $-2 \\cdot (-2) + 3 = 7$. It agrees.\n\n$C$ has $x = 6$, so\n\n$$ c = -2 \\cdot 6 + 3 = -9 $$\n\nCheck with the slope between $B$ and $C$:\n\n$$ \\frac{-9 - 1}{6 - 1} = \\frac{-10}{5} = -2 $$\n\nThe same slope as between $A$ and $B$.\n\n**Answer:** $c = -9$\n\n**b)** On the line $x = 50$ gives\n\n$$ y = -2 \\cdot 50 + 3 = -100 + 3 = -97 $$\n\nSo the point on the line with $x = 50$ is $(50, -97)$, not $(50, -95)$.\n\n**Answer:** No, the point lies 2 units above the line\n\n**General conclusion:** to decide whether a point lies on a line, you substitute the point's *x*-coordinate into the equation and compare with its *y*-coordinate. Two points determine the line, and every further point can be tested in that way."
   },
   {
    "level": 3,
    "question": "The rental company Trailer Hire charges a fixed fee and a price per day for renting a trailer. Renting for 3 days costs $1\\,150$ kr and renting for 7 days costs $2\\,150$ kr. The rental company Cart Hire only charges $300$ kr per day, with no fixed fee.<br>a) Find an expression for the cost $y$ kr for $x$ days at Trailer Hire.<br>b) Interpret the $k$-value and the $m$-value in the context.<br>c) From how many days is Trailer Hire the cheapest?",
    "answer": {
     "value": 9,
     "unit": "days"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 250,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 400,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 9,
      "unit": "days"
     }
    ],
    "solution": "**The key insight:** the two rental prices are two points on a straight line, $(3, 1\\,150)$ and $(7, 2\\,150)$. The slope is the price per day and $m$ is the fixed fee. Trailer Hire has a fixed fee but a lower daily price, so it becomes the cheapest only when the rental period is long enough.\n\n**a)** The gradient is the change in cost divided by the change in the number of days:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{2\\,150 - 1\\,150}{7 - 3} = \\frac{1\\,000}{4} = 250 $$\n\nThe cost is $y = 250x + m$. The point $(3, 1\\,150)$ lies on the line:\n\n$$ 1\\,150 = 250 \\cdot 3 + m $$\n\n$$ 1\\,150 = 750 + m $$\n\nSubtract 750 from both sides:\n\n$$ 1\\,150 \\mathbin{\\boldsymbol{-}} \\boldsymbol{750} = 750 + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{750} $$\n\n$$ 400 = m $$\n\nCheck with the other point: $250 \\cdot 7 + 400 = 1\\,750 + 400 = 2\\,150$. It agrees.\n\n**Answer:** $y = 250x + 400$\n\n**b)** $k = 250$ means that each extra day costs 250 kr. $m = 400$ is what you pay even for 0 days, that is, the fixed fee.\n\n**Answer:** The daily price is 250 kr and the fixed fee is 400 kr.\n\n**c)** Cart Hire costs $300x$ kr. Trailer Hire is the cheapest when\n\n$$ 250x + 400 < 300x $$\n\nSubtract $250x$ from both sides:\n\n$$ 250x + 400 \\mathbin{\\boldsymbol{-}} \\boldsymbol{250x} < 300x \\mathbin{\\boldsymbol{-}} \\boldsymbol{250x} $$\n\n$$ 400 < 50x $$\n\nDivide both sides by 50:\n\n$$ \\frac{400}{\\boldsymbol{50}} < \\frac{50x}{\\boldsymbol{50}} $$\n\n$$ 8 < x $$\n\nAt exactly 8 days both cost the same: $250 \\cdot 8 + 400 = 2\\,400$ kr and $300 \\cdot 8 = 2\\,400$ kr. So Trailer Hire is the cheapest from 9 days.\n\nCheck: 9 days cost $250 \\cdot 9 + 400 = 2\\,650$ kr at Trailer Hire and $300 \\cdot 9 = 2\\,700$ kr at Cart Hire.\n\nIs it reasonable? Trailer Hire is 50 kr cheaper per day, and it takes $\\dfrac{400}{50} = 8$ days to earn back the fixed fee.\n\n**Answer:** From 9 days\n\n**General conclusion:** two prices for different amounts are enough to determine a linear price model. A price with a fixed fee and a lower variable price becomes the cheapest only after the break-even point where the fixed fee has been earned back."
   },
   {
    "level": 3,
    "question": "Noah is going to find the equation of the line through the points $P = (-3, 4)$ and $Q = (5, -2)$. He writes:\n\n\"$k = \\dfrac{-2 - 4}{-3 - 5} = \\dfrac{-6}{-8} = \\dfrac{3}{4}$. Substituting $Q$ gives $-2 = \\dfrac{3}{4} \\cdot 5 + m$, so $m = -\\dfrac{23}{4}$. The line is $y = \\dfrac{3}{4}x - \\dfrac{23}{4}$, and it passes through $Q$, so it is correct.\"<br>a) What mistake has Noah made, and why did his check not reveal the mistake?<br>b) Find the correct equation of the line.",
    "answer": {
     "value": -0.75,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": -0.75,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "b",
      "value": 1.75,
      "unit": "",
      "etikett": "$m =$"
     }
    ],
    "solution": "**The key insight:** in the formula for the gradient the points must be taken in the same order in the numerator and the denominator. Noah takes $Q$ first in the numerator but $P$ first in the denominator. His check with $Q$ cannot reveal the mistake, because $m$ was calculated precisely so that the line passes through $Q$.\n\n**a)** In the numerator Noah calculates $y_Q - y_P = -2 - 4$, but in the denominator $x_P - x_Q = -3 - 5$. The order is reversed in the denominator, and therefore $k$ gets the wrong sign.\n\nThe check is pointless: a line with any slope at all passes through $Q$ if $m$ is found using $Q$. The check must be made with the other point. At $x = -3$ Noah's line gives\n\n$$ y = \\frac{3}{4} \\cdot (-3) - \\frac{23}{4} = -\\frac{9}{4} - \\frac{23}{4} = -\\frac{32}{4} = -8 $$\n\nbut $P$ has $y = 4$. So the line does not pass through $P$.\n\n**Answer:** He takes the points in different orders in the numerator and the denominator, so $k$ gets the wrong sign. The check with $Q$ reveals nothing, because $m$ was calculated using $Q$. He should have checked with $P$.\n\n**b)** With $(x_1, y_1) = (-3, 4)$ and $(x_2, y_2) = (5, -2)$:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{-2 - 4}{5 - (-3)} = \\frac{-6}{8} = -\\frac{3}{4} $$\n\nThe line is $y = -\\dfrac{3}{4}x + m$. Substituting $Q = (5, -2)$:\n\n$$ -2 = -\\frac{3}{4} \\cdot 5 + m $$\n\n$$ -2 = -\\frac{15}{4} + m $$\n\nAdd $\\dfrac{15}{4}$ to both sides:\n\n$$ -2 \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{15}{4}} = -\\frac{15}{4} + m \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{15}{4}} $$\n\n$$ \\frac{7}{4} = m $$\n\nCheck with the OTHER point $P = (-3, 4)$:\n\n$$ -\\frac{3}{4} \\cdot (-3) + \\frac{7}{4} = \\frac{9}{4} + \\frac{7}{4} = \\frac{16}{4} = 4 $$\n\nIt agrees.\n\nIs it reasonable? $P$ lies to the left of $Q$ and higher up, so the line should slope downwards and $k$ should be negative.\n\n**Answer:** $y = -\\dfrac{3}{4}x + \\dfrac{7}{4}$\n\n**General conclusion:** a check is only worth something if it tests something that has not already been used. The point that gave $m$ always satisfies the equation, so the check should be made with the other point. A quick estimate of the sign of $k$ also catches most mistakes in the order."
   },
   {
    "level": 3,
    "question": "A line passes through the points $(1, t)$ and $(3, 2t + 4)$, where $t$ is a number.<br>a) Find $t$ so that the line passes through the origin.<br>b) Find $t$ so that the line is horizontal.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4,
      "unit": "",
      "etikett": "$t =$"
     },
     {
      "del": "b",
      "value": -4,
      "unit": "",
      "etikett": "$t =$"
     }
    ],
    "solution": "**The key insight:** both $k$ and $m$ can be expressed in terms of $t$. The line passes through the origin when $m = 0$, and it is horizontal when $k = 0$. Both conditions become simple equations in $t$.\n\nThe gradient:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{(2t + 4) - t}{3 - 1} = \\frac{t + 4}{2} $$\n\nThe point $(1, t)$ substituted into $y = kx + m$:\n\n$$ t = \\frac{t + 4}{2} \\cdot 1 + m $$\n\nSubtract $\\dfrac{t + 4}{2}$ from both sides:\n\n$$ t \\mathbin{\\boldsymbol{-}} \\boldsymbol{\\frac{t + 4}{2}} = \\frac{t + 4}{2} + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{\\frac{t + 4}{2}} $$\n\n$$ m = \\frac{2t - (t + 4)}{2} = \\frac{t - 4}{2} $$\n\n**a)** The line passes through the origin when $m = 0$:\n\n$$ \\frac{t - 4}{2} = 0 $$\n\nMultiply both sides by 2:\n\n$$ \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} \\frac{t - 4}{2} = \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} 0 $$\n\n$$ t - 4 = 0 $$\n\n$$ t = 4 $$\n\nCheck: the points become $(1, 4)$ and $(3, 12)$. In both the *y*-coordinate is 4 times the *x*-coordinate, so they lie on $y = 4x$, which passes through the origin.\n\n**Answer:** $t = 4$\n\n**b)** The line is horizontal when $k = 0$:\n\n$$ \\frac{t + 4}{2} = 0 $$\n\nMultiply both sides by 2:\n\n$$ \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} \\frac{t + 4}{2} = \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} 0 $$\n\n$$ t + 4 = 0 $$\n\n$$ t = -4 $$\n\nCheck: the points become $(1, -4)$ and $(3, -4)$. They have the same *y*-coordinate, so the line $y = -4$ is horizontal.\n\n**Answer:** $t = -4$\n\n**General conclusion:** when the points contain a parameter, $k$ and $m$ become expressions in the parameter. Properties of the line, such as passing through the origin ($m = 0$) or being horizontal ($k = 0$), then become equations that can be solved."
   },
   {
    "level": 3,
    "question": "The line $L$ passes through the points $(2, 5)$ and $(6, -1)$. The line and the two coordinate axes enclose a triangle.<br>a) Find the exact area of the triangle.<br>b) A line through the origin divides the triangle into two parts with equal areas. Find the equation of that line.",
    "answer": {
     "value": 21.33,
     "unit": "area units",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 21.33,
      "unit": "area units",
      "tol": 0.005
     },
     {
      "del": "b",
      "value": 1.5,
      "unit": "",
      "etikett": "$k =$"
     }
    ],
    "solution": "**The key insight:** the vertices of the triangle are the origin and the points where the line crosses the axes, so first you need the equation of the line. A line through the origin divides the triangle into two smaller triangles, and where it meets $L$ decides how large they are.\n\n**a)** The gradient:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{-1 - 5}{6 - 2} = \\frac{-6}{4} = -\\frac{3}{2} $$\n\nSubstituting $(2, 5)$ into $y = -\\dfrac{3}{2}x + m$:\n\n$$ 5 = -\\frac{3}{2} \\cdot 2 + m $$\n\n$$ 5 = -3 + m $$\n\nAdd 3 to both sides:\n\n$$ 5 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} = -3 + m \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} $$\n\n$$ 8 = m $$\n\nCheck with $(6, -1)$: $-\\dfrac{3}{2} \\cdot 6 + 8 = -9 + 8 = -1$. It agrees.\n\n$L$ is $y = -\\dfrac{3}{2}x + 8$ and crosses the *y*-axis at $(0, 8)$. On the *x*-axis $y = 0$:\n\n$$ 0 = -\\frac{3}{2}x + 8 $$\n\nAdd $\\dfrac{3}{2}x$ to both sides:\n\n$$ 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{3}{2}x} = -\\frac{3}{2}x + 8 \\mathbin{\\boldsymbol{+}} \\boldsymbol{\\frac{3}{2}x} $$\n\n$$ \\frac{3}{2}x = 8 $$\n\nMultiply both sides by $\\dfrac{2}{3}$:\n\n$$ \\boldsymbol{\\frac{2}{3}} \\mathbin{\\boldsymbol{\\cdot}} \\frac{3}{2}x = \\boldsymbol{\\frac{2}{3}} \\mathbin{\\boldsymbol{\\cdot}} 8 $$\n\n$$ x = \\frac{16}{3} $$\n\nThe triangle has the legs 8 and $\\dfrac{16}{3}$, and the area is base times height divided by 2:\n\n$$ \\text{area} = \\frac{1}{2} \\cdot \\frac{16}{3} \\cdot 8 = \\frac{64}{3} \\approx 21.3 $$\n\n**Answer:** $\\dfrac{64}{3}$ area units\n\n**b)** The line through the origin meets $L$ at a point $(x_0, y_0)$. It divides the triangle into a left part with the vertices $(0, 0)$, $(0, 8)$ and $(x_0, y_0)$, and a right part. The left part has the base 8 along the *y*-axis and the height $x_0$, that is, the distance from the *y*-axis. It must have half the area, $\\dfrac{32}{3}$:\n\n$$ \\frac{1}{2} \\cdot 8 \\cdot x_0 = \\frac{32}{3} $$\n\n$$ 4x_0 = \\frac{32}{3} $$\n\nDivide both sides by 4:\n\n$$ \\frac{4x_0}{\\boldsymbol{4}} = \\frac{\\frac{32}{3}}{\\boldsymbol{4}} $$\n\n$$ x_0 = \\frac{32}{12} = \\frac{8}{3} $$\n\nThe point lies on $L$, so\n\n$$ y_0 = -\\frac{3}{2} \\cdot \\frac{8}{3} + 8 = -4 + 8 = 4 $$\n\nThe line through the origin and $\\left(\\dfrac{8}{3}, 4\\right)$ has the gradient\n\n$$ k = \\frac{4 - 0}{\\frac{8}{3} - 0} = 4 \\cdot \\frac{3}{8} = \\frac{3}{2} $$\n\nand $m = 0$, since it passes through the origin.\n\nCheck: the right part has the base $\\dfrac{16}{3}$ along the *x*-axis and the height $y_0 = 4$, and the area $\\dfrac{1}{2} \\cdot \\dfrac{16}{3} \\cdot 4 = \\dfrac{32}{3}$. The two parts are equally large.\n\n**Answer:** $y = \\dfrac{3}{2}x$\n\n**General conclusion:** areas in the coordinate system are easiest to calculate with bases along the axes, because the height is then a distance that can be read from a coordinate. The line through the origin that halves the triangle passes through the midpoint of the opposite side, here $\\left(\\dfrac{8}{3}, 4\\right)$."
   },
   {
    "level": 3,
    "question": "A new car costs $240\\,000$ kr. After 3 years it is worth $168\\,000$ kr.<br>a) Assume that the value decreases linearly. Find an equation for the value $y$ kr after $x$ years.<br>b) Assume instead that the value decreases by the same percentage every year. Calculate the value of the car after 8 years with both models.<br>c) Which of the models is the most reasonable if you want to know the value of the car after 12 years? Justify your answer.",
    "answer": {
     "value": 48000,
     "unit": "kr"
    },
    "delsvar": [
     {
      "del": "a",
      "value": -24000,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 240000,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 48000,
      "unit": "kr",
      "etikett": "linear model"
     },
     {
      "del": "b",
      "value": 92700,
      "unit": "kr",
      "tol": 0.01,
      "etikett": "percentage model"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** two measured values are enough for both models. The linear model decreases by the same number of kronor every year, and the percentage model by the same change factor every year. They are equal after 3 years but differ more and more after that.\n\n**a)** The points are $(0, 240\\,000)$ and $(3, 168\\,000)$. The gradient is the change in value divided by the number of years:\n\n$$ k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{168\\,000 - 240\\,000}{3 - 0} = \\frac{-72\\,000}{3} = -24\\,000 $$\n\nThe car is worth $240\\,000$ kr when $x = 0$, so $m = 240\\,000$.\n\n**Answer:** $y = -24\\,000x + 240\\,000$\n\n**b)** Linear model after 8 years:\n\n$$ y = -24\\,000 \\cdot 8 + 240\\,000 = -192\\,000 + 240\\,000 = 48\\,000 $$\n\nPercentage model: call the yearly change factor $a$. After 3 years the value has been multiplied by $a^3$:\n\n$$ 240\\,000 \\cdot a^3 = 168\\,000 $$\n\nDivide both sides by $240\\,000$:\n\n$$ \\frac{240\\,000 \\cdot a^3}{\\boldsymbol{240\\,000}} = \\frac{168\\,000}{\\boldsymbol{240\\,000}} $$\n\n$$ a^3 = 0.7 $$\n\n$$ a = \\sqrt[3]{0.7} = 0.887\\,90\\ldots $$\n\nSo the value decreases by about $11\\ \\%$ per year. After 8 years, calculated with the unrounded value of $a$:\n\n$$ 240\\,000 \\cdot a^8 = 240\\,000 \\cdot \\left(\\sqrt[3]{0.7}\\right)^8 = 92\\,712.7\\ldots \\approx 92\\,700 $$\n\nCheck of the factor: $0.887\\,90^3 = 0.699\\,99\\ldots$, and $240\\,000 \\cdot 0.7 = 168\\,000$ kr.\n\n**Answer:** Linear model $48\\,000$ kr, percentage model about $92\\,700$ kr\n\n**c)** After 10 years the linear model gives $-24\\,000 \\cdot 10 + 240\\,000 = 0$ kr, and after 12 years\n\n$$ -24\\,000 \\cdot 12 + 240\\,000 = -48\\,000 $$\n\nkronor. A negative value is impossible. The percentage model gives $240\\,000 \\cdot a^{12} = 240\\,000 \\cdot 0.7^4 \\approx 57\\,600$ kr, since $a^{12} = (a^3)^4$. The value approaches 0 but never becomes negative, and in reality a car loses most of its value in the first years.\n\n**Answer:** The percentage model, since the linear one gives a negative value after 12 years\n\n**General conclusion:** a linear model fits when the change is the same number of kronor every year, but sooner or later it goes through zero. When the change is rather a proportion of the value, a model with a change factor is more reasonable in the long run."
   }
  ]
 },
 "ma1c-4.6": {
  "kalla": "67d68a29c5",
  "data": [
   {
    "level": 1,
    "question": "Which of the following lines is parallel to $y = 4x + 2$?",
    "choices": [
     "$y = 2x + 4$",
     "$y = 4x - 7$",
     "$y = \\dfrac{1}{4}x + 2$",
     "$y = -4x + 2$"
    ],
    "correct": 1,
    "solution": "Parallel lines have the same $k$-value. Only $y = 4x - 7$ has $k = 4$. The $m$-value may be different.\n\n**Answer:** $y = 4x - 7$"
   },
   {
    "level": 1,
    "question": "Which equation describes a vertical line that lies at 5 in the *x*-direction?",
    "choices": [
     "$x = 5$",
     "$y = 5$",
     "$y = 5x$",
     "$x = 5y$"
    ],
    "correct": 0,
    "solution": "Vertical lines cannot be written in k-form. They are described by their position in the *x*-direction:\n\n$$ x = 5 $$\n\n($y = 5$ is instead a HORIZONTAL line.)\n\n**Answer:** $x = 5$"
   },
   {
    "level": 1,
    "question": "Write $y = 2x + 7$ in general form.",
    "choices": [
     "$y - 2x = 7$",
     "$2x - y + 7 = 0$",
     "$2x - y = -7$",
     "$2x + y + 7 = 0$"
    ],
    "correct": 1,
    "solution": "Collect all the terms on one side. Subtract $y$ from both sides:\n\n$$ 0 = 2x - y + 7 $$\n\nSwap the sides: $2x - y + 7 = 0$.\n\n($y - 2x = 7$ and $2x - y = -7$ are correct equalities but not general form, where one side must be 0.)\n\n**Answer:** $2x - y + 7 = 0$"
   },
   {
    "level": 2,
    "question": "Give the $k$-value of the line $4x + 2y - 10 = 0$.",
    "answer": {
     "value": -2,
     "unit": ""
    },
    "solution": "Solve for $y$ to get the k-form:\n\n$$ 2y = -4x + 10 $$\n\n$$ y = -2x + 5 $$\n\nThe $k$-value is −2.\n\n**Answer:** $k = -2$"
   },
   {
    "level": 2,
    "question": "Find the equation of the line that is parallel to $y = -2x + 6$ and passes through the point (3, 1).",
    "choices": [
     "$y = -2x + 7$",
     "$y = -2x + 1$",
     "$y = 2x - 5$",
     "$y = -2x - 5$"
    ],
    "correct": 0,
    "solution": "Parallel means the same $k$-value: $k = -2$, so $y = -2x + m$.\n\nThe point (3, 1) lies on the line:\n\n$$ 1 = -2 \\cdot 3 + m $$\n\n$$ 1 = -6 + m \\qquad m = 7 $$\n\n**Answer:** $y = -2x + 7$"
   },
   {
    "level": 3,
    "question": "A line is described by $(a - 1)x + (a + 2)y + 5 = 0$, where $a$ is a constant. Find $a$ so that the line is<br>a) vertical&emsp;&emsp;b) horizontal<br>c) parallel to the line $y = 2x + 7$",
    "answer": {
     "value": -1,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -2,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b",
      "value": 1,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "c",
      "value": -1,
      "unit": "",
      "etikett": "$a =$"
     }
    ],
    "solution": "**The key insight:** in general form the coefficients in front of $x$ and $y$ decide how the line lies. If the $y$-term disappears, the equation can be written in the form $x = \\text{constant}$, and the line is vertical. If the $x$-term disappears, it becomes $y = \\text{constant}$, and the line is horizontal. For a sloping line you solve for $y$ and read off $k$.\n\n**a)** The line is vertical when the $y$-term disappears, that is, when $a + 2 = 0$, so $a = -2$. The equation then becomes\n\n$$ (-2 - 1)x + 0 \\cdot y + 5 = 0 $$\n\n$$ -3x + 5 = 0 $$\n\nSubtract 5 from both sides:\n\n$$ -3x + 5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} $$\n\n$$ -3x = -5 $$\n\nDivide both sides by $-3$:\n\n$$ \\frac{-3x}{\\boldsymbol{-3}} = \\frac{-5}{\\boldsymbol{-3}} $$\n\n$$ x = \\frac{5}{3} $$\n\nThat is a vertical line.\n\n**Answer:** $a = -2$ (the line becomes $x = \\dfrac{5}{3}$)\n\n**b)** The line is horizontal when the $x$-term disappears, that is, when $a - 1 = 0$, so $a = 1$. The equation then becomes $3y + 5 = 0$, that is $y = -\\dfrac{5}{3}$, a horizontal line.\n\n**Answer:** $a = 1$ (the line becomes $y = -\\dfrac{5}{3}$)\n\n**c)** Parallel lines have the same $k$-value, so the line must have $k = 2$. We solve for $y$. Subtract $(a - 1)x$ and 5 from both sides:\n\n$$ (a - 1)x + (a + 2)y + 5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{(a - 1)x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{(a - 1)x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} $$\n\n$$ (a + 2)y = -(a - 1)x - 5 $$\n\nDivide both sides by $(a + 2)$, which is not 0 for a sloping line:\n\n$$ \\frac{(a + 2)y}{\\boldsymbol{a + 2}} = \\frac{-(a - 1)x - 5}{\\boldsymbol{a + 2}} $$\n\n$$ y = \\frac{1 - a}{a + 2}x - \\frac{5}{a + 2} $$\n\nThe $k$-value is $\\dfrac{1 - a}{a + 2}$, and it must be 2:\n\n$$ \\frac{1 - a}{a + 2} = 2 $$\n\nMultiply both sides by $(a + 2)$:\n\n$$ \\boldsymbol{(a + 2)} \\mathbin{\\boldsymbol{\\cdot}} \\frac{1 - a}{a + 2} = \\boldsymbol{(a + 2)} \\mathbin{\\boldsymbol{\\cdot}} 2 $$\n\n$$ 1 - a = 2a + 4 $$\n\nAdd $a$ to and subtract 4 from both sides:\n\n$$ 1 - a \\mathbin{\\boldsymbol{+}} \\boldsymbol{a} \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} = 2a + 4 \\mathbin{\\boldsymbol{+}} \\boldsymbol{a} \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} $$\n\n$$ -3 = 3a $$\n\nDivide both sides by 3:\n\n$$ \\frac{-3}{\\boldsymbol{3}} = \\frac{3a}{\\boldsymbol{3}} $$\n\n$$ a = -1 $$\n\nCheck: $a = -1$ gives $-2x + y + 5 = 0$, that is $y = 2x - 5$. It has $k = 2$ and $m = -5$, so it is parallel to $y = 2x + 7$ and not the same line.\n\n**Answer:** $a = -1$\n\n**General conclusion:** in $ax + by + c = 0$ the line is vertical when $b = 0$ and horizontal when $a = 0$. Otherwise solving for $y$ gives $k = -\\dfrac{a}{b}$, and a condition on the slope becomes an equation in the constant."
   },
   {
    "level": 3,
    "question": "The points $A = (1, 1)$, $B = (5, 2)$ and $C = (6, 5)$ are three of the vertices of the parallelogram $ABCD$. In a parallelogram opposite sides are parallel.<br>a) Find the coordinates of the vertex $D$.<br>b) Find the equation of the side $CD$ in general form with integer coefficients.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "a",
      "value": 4,
      "unit": "",
      "etikett": "$y =$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** $D$ lies on the line through $A$ that is parallel to $BC$, and on the line through $C$ that is parallel to $AB$. $D$ is where the two lines cross each other.\n\n**a)** The gradients of the sides $AB$ and $BC$:\n\n$$ k_{AB} = \\frac{2 - 1}{5 - 1} = \\frac{1}{4} \\qquad k_{BC} = \\frac{5 - 2}{6 - 5} = \\frac{3}{1} = 3 $$\n\nThe side $AD$ is parallel to $BC$, so it has $k = 3$ and passes through $A = (1, 1)$:\n\n$$ 1 = 3 \\cdot 1 + m $$\n\nSubtract 3 from both sides:\n\n$$ 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3} = 3 + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{3} $$\n\n$$ -2 = m $$\n\nSo $AD$ lies on the line $y = 3x - 2$.\n\nThe side $CD$ is parallel to $AB$, so it has $k = \\dfrac{1}{4}$ and passes through $C = (6, 5)$:\n\n$$ 5 = \\frac{1}{4} \\cdot 6 + m $$\n\nSubtract $\\dfrac{6}{4}$ from both sides:\n\n$$ 5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{\\frac{6}{4}} = \\frac{6}{4} + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{\\frac{6}{4}} $$\n\n$$ \\frac{7}{2} = m $$\n\nSo $CD$ lies on the line $y = \\dfrac{1}{4}x + \\dfrac{7}{2}$.\n\n$D$ lies on both lines, so there they have the same $y$-value:\n\n$$ 3x - 2 = \\frac{1}{4}x + \\frac{7}{2} $$\n\nMultiply both sides by 4:\n\n$$ \\boldsymbol{4} \\mathbin{\\boldsymbol{\\cdot}} (3x - 2) = \\boldsymbol{4} \\mathbin{\\boldsymbol{\\cdot}} \\left(\\frac{1}{4}x + \\frac{7}{2}\\right) $$\n\n$$ 12x - 8 = x + 14 $$\n\nSubtract $x$ from and add 8 to both sides:\n\n$$ 12x - 8 \\mathbin{\\boldsymbol{-}} \\boldsymbol{x} \\mathbin{\\boldsymbol{+}} \\boldsymbol{8} = x + 14 \\mathbin{\\boldsymbol{-}} \\boldsymbol{x} \\mathbin{\\boldsymbol{+}} \\boldsymbol{8} $$\n\n$$ 11x = 22 $$\n\nDivide both sides by 11:\n\n$$ \\frac{11x}{\\boldsymbol{11}} = \\frac{22}{\\boldsymbol{11}} $$\n\n$$ x = 2 $$\n\nand $y = 3 \\cdot 2 - 2 = 4$.\n\nCheck with the steps: from $B$ to $A$ you go 4 steps to the left and 1 step down. The same movement from $C$ gives $(6 - 4, 5 - 1) = (2, 4)$. It agrees.\n\n**Answer:** $D = (2, 4)$\n\n**b)** The side $CD$ lies on the line $y = \\dfrac{1}{4}x + \\dfrac{7}{2}$. Multiply both sides by 4 to get integers:\n\n$$ \\boldsymbol{4} \\mathbin{\\boldsymbol{\\cdot}} y = \\boldsymbol{4} \\mathbin{\\boldsymbol{\\cdot}} \\left(\\frac{1}{4}x + \\frac{7}{2}\\right) $$\n\n$$ 4y = x + 14 $$\n\nSubtract $4y$ from both sides:\n\n$$ 4y \\mathbin{\\boldsymbol{-}} \\boldsymbol{4y} = x + 14 \\mathbin{\\boldsymbol{-}} \\boldsymbol{4y} $$\n\n$$ 0 = x - 4y + 14 $$\n\nCheck: $C$ gives $6 - 4 \\cdot 5 + 14 = 0$ and $D$ gives $2 - 4 \\cdot 4 + 14 = 0$. Both vertices lie on the line.\n\n**Answer:** $x - 4y + 14 = 0$\n\n**General conclusion:** two sides being parallel means that they have the same $k$-value. With a known vertex and a known slope the line of the side is determined, and an unknown vertex is the intersection of two such lines."
   },
   {
    "level": 3,
    "question": "A region in a coordinate system is bounded by the lines $x = -1$, $x = 4$, $y = -2$ and $2x - 5y + 15 = 0$. Find the area of the region.",
    "answer": {
     "value": 28,
     "unit": "area units"
    },
    "solution": "**The key insight:** three of the lines are vertical or horizontal and form three sides of the region. The fourth is sloping and forms the roof. If you solve for $y$ in the sloping line, the height of the roof at $x = -1$ and $x = 4$ can be calculated, and the region is divided into a rectangle and a triangle.\n\nWe solve for $y$ in $2x - 5y + 15 = 0$. Subtract $2x$ and 15 from both sides:\n\n$$ 2x - 5y + 15 \\mathbin{\\boldsymbol{-}} \\boldsymbol{2x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{15} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{2x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{15} $$\n\n$$ -5y = -2x - 15 $$\n\nDivide both sides by $-5$:\n\n$$ \\frac{-5y}{\\boldsymbol{-5}} = \\frac{-2x - 15}{\\boldsymbol{-5}} $$\n\n$$ y = \\frac{2}{5}x + 3 $$\n\nThe line slopes upwards, so it lies above $y = -2$ in the whole interval and forms the upper edge of the region. The height of the roof at the edges:\n\n$$ x = -1: \\quad y = \\frac{2}{5} \\cdot (-1) + 3 = 2.6 $$\n\n$$ x = 4: \\quad y = \\frac{2}{5} \\cdot 4 + 3 = 4.6 $$\n\nThe region has the width $4 - (-1) = 5$. Measured from the floor $y = -2$ the height is $2.6 - (-2) = 4.6$ at the left edge and $4.6 - (-2) = 6.6$ at the right edge.\n\nWe divide the region into a rectangle with the width 5 and the height $4.6$, and a triangle on top with the base 5 and the height $6.6 - 4.6 = 2$:\n\n$$ \\text{rectangle:} \\quad 5 \\cdot 4.6 = 23 $$\n\n$$ \\text{triangle:} \\quad \\frac{5 \\cdot 2}{2} = 5 $$\n\n$$ \\text{area} = 23 + 5 = 28 $$\n\nCheck: the mean height of the region is $\\dfrac{4.6 + 6.6}{2} = 5.6$, and $5 \\cdot 5.6 = 28$. It agrees.\n\n**Answer:** 28 area units\n\n**General conclusion:** vertical lines $x = a$ and horizontal lines $y = b$ give straight edges that are easy to measure along. A sloping line in general form is rewritten in k-form, so that its *y*-value at the edges can be calculated."
   },
   {
    "level": 3,
    "question": "Elin claims that the lines $3x - 2y + 4 = 0$ and $y = 3x - 1$ are parallel, because both have 3 in front of $x$.<br>a) Is Elin right? Justify your answer.<br>b) Find the equation of the line that is parallel to $3x - 2y + 4 = 0$ and passes through the point $(2, -1)$. Answer in general form with integer coefficients.",
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** the coefficient in front of $x$ in general form is not the $k$-value. The $k$-value only appears once $y$ has been solved for, and then everything is divided by the coefficient in front of $y$.\n\n**a)** We solve for $y$ in $3x - 2y + 4 = 0$. Subtract $3x$ and 4 from both sides:\n\n$$ 3x - 2y + 4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{4} $$\n\n$$ -2y = -3x - 4 $$\n\nDivide both sides by $-2$:\n\n$$ \\frac{-2y}{\\boldsymbol{-2}} = \\frac{-3x - 4}{\\boldsymbol{-2}} $$\n\n$$ y = \\frac{3}{2}x + 2 $$\n\nThe first line has $k = \\dfrac{3}{2}$ and the second $k = 3$. The slopes are different, so the lines are not parallel.\n\n**Answer:** No. The first line has $k = \\dfrac{3}{2}$, not 3, so the lines have different slopes.\n\n**b)** The line we are looking for has $k = \\dfrac{3}{2}$. Substituting $(2, -1)$ into $y = \\dfrac{3}{2}x + m$:\n\n$$ -1 = \\frac{3}{2} \\cdot 2 + m $$\n\n$$ -1 = 3 + m $$\n\nSubtract 3 from both sides:\n\n$$ -1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3} = 3 + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{3} $$\n\n$$ -4 = m $$\n\nThe line is $y = \\dfrac{3}{2}x - 4$. Multiply both sides by 2 to get integers:\n\n$$ \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} y = \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} \\left(\\frac{3}{2}x - 4\\right) $$\n\n$$ 2y = 3x - 8 $$\n\nSubtract $2y$ from both sides:\n\n$$ 2y \\mathbin{\\boldsymbol{-}} \\boldsymbol{2y} = 3x - 8 \\mathbin{\\boldsymbol{-}} \\boldsymbol{2y} $$\n\n$$ 0 = 3x - 2y - 8 $$\n\nCheck: the point $(2, -1)$ gives $3 \\cdot 2 - 2 \\cdot (-1) - 8 = 6 + 2 - 8 = 0$. It agrees.\n\nThere is a shortcut: the new line has the same $3x - 2y$ as the old one, only the constant is different. The form $3x - 2y + c = 0$ with the point substituted gives $6 + 2 + c = 0$, that is $c = -8$.\n\n**Answer:** $3x - 2y - 8 = 0$\n\n**General conclusion:** in general form, parallel lines have the same ratio between the coefficients in front of $x$ and $y$, and only the constant tells them apart. The slope should never be read directly from the coefficient in front of $x$."
   },
   {
    "level": 3,
    "question": "Two lines are given in general form: $a_1x + b_1y + c_1 = 0$ and $a_2x + b_2y + c_2 = 0$, where $b_1$ and $b_2$ are not 0.<br>a) Show that the first line has $k = -\\dfrac{a_1}{b_1}$, and that the lines are parallel exactly when $a_1 \\cdot b_2 = a_2 \\cdot b_1$.<br>b) Use the condition to decide whether the lines $6x - 4y + 1 = 0$ and $-9x + 6y + 5 = 0$ are parallel.<br>c) Find $p$ so that the lines $px + 3y - 2 = 0$ and $4x - 6y + 1 = 0$ are parallel.",
    "answer": {
     "value": -2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": -2,
      "unit": "",
      "etikett": "$p =$"
     }
    ],
    "solution": "**The key insight:** solving for $y$ in a general equation works the same way every time, so it can be done once and for all with letters. The condition for parallel lines then becomes a simple product rule that requires no fractions.\n\n**a)** Subtract $a_1x$ and $c_1$ from both sides:\n\n$$ a_1x + b_1y + c_1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{a_1x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{c_1} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{a_1x} \\mathbin{\\boldsymbol{-}} \\boldsymbol{c_1} $$\n\n$$ b_1y = -a_1x - c_1 $$\n\nDivide both sides by $b_1$, which is not 0:\n\n$$ \\frac{b_1y}{\\boldsymbol{b_1}} = \\frac{-a_1x - c_1}{\\boldsymbol{b_1}} $$\n\n$$ y = -\\frac{a_1}{b_1}x - \\frac{c_1}{b_1} $$\n\nSo $k_1 = -\\dfrac{a_1}{b_1}$, and in the same way $k_2 = -\\dfrac{a_2}{b_2}$. The lines are parallel when the slopes are equal:\n\n$$ -\\frac{a_1}{b_1} = -\\frac{a_2}{b_2} $$\n\nMultiply both sides by $-b_1 b_2$:\n\n$$ \\boldsymbol{(-b_1 b_2)} \\mathbin{\\boldsymbol{\\cdot}} \\left(-\\frac{a_1}{b_1}\\right) = \\boldsymbol{(-b_1 b_2)} \\mathbin{\\boldsymbol{\\cdot}} \\left(-\\frac{a_2}{b_2}\\right) $$\n\n$$ a_1 b_2 = a_2 b_1 $$\n\nEvery step can be done backwards, so the condition works in both directions.\n\n**Answer:** See the calculation above.\n\n**b)** Here $a_1 = 6$, $b_1 = -4$, $a_2 = -9$ and $b_2 = 6$:\n\n$$ a_1 \\cdot b_2 = 6 \\cdot 6 = 36 $$\n\n$$ a_2 \\cdot b_1 = (-9) \\cdot (-4) = 36 $$\n\nThe products are equal, so the lines are parallel. Check with the slopes: $k_1 = -\\dfrac{6}{-4} = \\dfrac{3}{2}$ and $k_2 = -\\dfrac{-9}{6} = \\dfrac{3}{2}$.\n\nIt is not the same line: if the first equation is multiplied by $-\\dfrac{3}{2}$ it becomes $-9x + 6y - 1.5 = 0$, and the constant differs from 5.\n\n**Answer:** Yes, the lines are parallel (but not the same line)\n\n**c)** Here $a_1 = p$, $b_1 = 3$, $a_2 = 4$ and $b_2 = -6$. The condition gives\n\n$$ p \\cdot (-6) = 4 \\cdot 3 $$\n\n$$ -6p = 12 $$\n\nDivide both sides by $-6$:\n\n$$ \\frac{-6p}{\\boldsymbol{-6}} = \\frac{12}{\\boldsymbol{-6}} $$\n\n$$ p = -2 $$\n\nCheck: $-2x + 3y - 2 = 0$ gives $y = \\dfrac{2}{3}x + \\dfrac{2}{3}$, and $4x - 6y + 1 = 0$ gives $y = \\dfrac{2}{3}x + \\dfrac{1}{6}$. Both have $k = \\dfrac{2}{3}$.\n\n**Answer:** $p = -2$\n\n**General conclusion:** in general form $k = -\\dfrac{a}{b}$, and two lines are parallel exactly when $a_1 b_2 = a_2 b_1$. Cross-multiplication therefore decides whether lines are parallel without any equation needing to be rewritten."
   },
   {
    "level": 3,
    "question": "The line $L_1$ has the equation $y = 2x + 3$ and the line $L_2$ has the equation $ax - 3y + c = 0$. Find $a$ and $c$, or state which conditions they must satisfy, so that the lines<br>a) are the same line&emsp;&emsp;b) have no points in common<br>c) have exactly one point in common, and that point is $(0, 3)$",
    "delsvar": [
     {
      "del": "a",
      "value": 6,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "a",
      "value": 9,
      "unit": "",
      "etikett": "$c =$"
     },
     {
      "del": "b",
      "value": 6,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "c",
      "value": 9,
      "unit": "",
      "etikett": "$c =$"
     }
    ],
    "solution": "**The key insight:** two straight lines can lie in three ways. With the same $k$ and the same $m$ they are the same line. With the same $k$ but different $m$ they are parallel and never meet. With different $k$ they cross each other at exactly one point. Write $L_2$ in k-form, and $k$ and $m$ can be compared directly.\n\nWe solve for $y$ in $ax - 3y + c = 0$. Subtract $ax$ and $c$ from both sides:\n\n$$ ax - 3y + c \\mathbin{\\boldsymbol{-}} \\boldsymbol{ax} \\mathbin{\\boldsymbol{-}} \\boldsymbol{c} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{ax} \\mathbin{\\boldsymbol{-}} \\boldsymbol{c} $$\n\n$$ -3y = -ax - c $$\n\nDivide both sides by $-3$:\n\n$$ \\frac{-3y}{\\boldsymbol{-3}} = \\frac{-ax - c}{\\boldsymbol{-3}} $$\n\n$$ y = \\frac{a}{3}x + \\frac{c}{3} $$\n\nSo $L_2$ has $k = \\dfrac{a}{3}$ and $m = \\dfrac{c}{3}$, while $L_1$ has $k = 2$ and $m = 3$.\n\n**a)** The same line requires the same $k$ and the same $m$. $\\dfrac{a}{3} = 2$ gives $a = 6$, and $\\dfrac{c}{3} = 3$ gives $c = 9$.\n\nCheck: $6x - 3y + 9 = 0$ is $3 \\cdot (2x - y + 3) = 0$, and $2x - y + 3 = 0$ is exactly $y = 2x + 3$ in general form.\n\n**Answer:** $a = 6$ and $c = 9$\n\n**b)** The lines have no points in common when they are parallel but not the same line: the same $k$, different $m$. That requires $a = 6$ and $\\dfrac{c}{3} \\neq 3$, that is $c \\neq 9$.\n\n**Answer:** $a = 6$ and $c \\neq 9$\n\n**c)** Exactly one point in common requires different slopes, that is $a \\neq 6$. The point $(0, 3)$ lies on $L_1$, since $2 \\cdot 0 + 3 = 3$. It must also lie on $L_2$:\n\n$$ a \\cdot 0 - 3 \\cdot 3 + c = 0 $$\n\n$$ -9 + c = 0 $$\n\nAdd 9 to both sides:\n\n$$ -9 + c \\mathbin{\\boldsymbol{+}} \\boldsymbol{9} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{9} $$\n\n$$ c = 9 $$\n\nThe value of $a$ makes no difference to whether $(0, 3)$ lies on $L_2$, since $x = 0$. It may be any number except 6.\n\nCheck with $a = 0$: $L_2$ becomes $-3y + 9 = 0$, that is, the horizontal line $y = 3$, which crosses $L_1$ at $(0, 3)$.\n\n**Answer:** $c = 9$ and $a \\neq 6$\n\n**General conclusion:** by comparing $k$ and $m$ you decide whether two lines coincide (the same $k$ and $m$), are parallel (the same $k$, different $m$) or cross each other at one point (different $k$). So a problem can have one solution, infinitely many solutions or no solution at all."
   },
   {
    "level": 3,
    "question": "The class has $1\\,200$ kr to spend on fruit and drinks for a trip. A piece of fruit costs 15 kr and a drink 20 kr. The class buys $x$ pieces of fruit and $y$ drinks and spends all the money.<br>a) Write the relationship between $x$ and $y$ as a straight line in general form. Find the $k$-value of the line and interpret it.<br>b) The budget is raised by 10 %. Explain why the new line is parallel to the old one, and calculate the largest number of extra drinks the class can buy.<br>c) The budget instead stays at $1\\,200$ kr, but the price of a drink rises by 25 %. Is the new line parallel to the old one? Find its $k$-value.",
    "answer": {
     "value": 6,
     "unit": "drinks"
    },
    "delsvar": [
     {
      "del": "a",
      "value": -0.75,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "b",
      "value": 6,
      "unit": "drinks"
     },
     {
      "del": "c",
      "value": -0.6,
      "unit": "",
      "etikett": "$k =$"
     }
    ],
    "solution": "**The key insight:** what is paid for fruit plus what is paid for drinks is the whole budget. The prices stand in front of $x$ and $y$ and decide the slope, and the budget is the constant. If only the budget changes, the line is moved parallel, but if a price changes, the line is turned.\n\n**a)** The fruit costs $15x$ kr and the drinks $20y$ kr, and together that makes $1\\,200$ kr:\n\n$$ 15x + 20y = 1\\,200 $$\n\nSubtract $1\\,200$ from both sides:\n\n$$ 15x + 20y \\mathbin{\\boldsymbol{-}} \\boldsymbol{1\\,200} = 1\\,200 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1\\,200} $$\n\n$$ 15x + 20y - 1\\,200 = 0 $$\n\nFor the $k$-value we solve for $y$ in $15x + 20y = 1\\,200$. Subtract $15x$ from both sides:\n\n$$ 15x + 20y \\mathbin{\\boldsymbol{-}} \\boldsymbol{15x} = 1\\,200 \\mathbin{\\boldsymbol{-}} \\boldsymbol{15x} $$\n\n$$ 20y = -15x + 1\\,200 $$\n\nDivide both sides by 20:\n\n$$ \\frac{20y}{\\boldsymbol{20}} = \\frac{-15x + 1\\,200}{\\boldsymbol{20}} $$\n\n$$ y = -0.75x + 60 $$\n\n$k = -0.75$ means that each extra piece of fruit means the class can afford $0.75$ fewer drinks. A piece of fruit costs $\\dfrac{15}{20} = 0.75$ of a drink, after all. In whole numbers: 4 more pieces of fruit means 3 fewer drinks.\n\n**Answer:** $15x + 20y - 1\\,200 = 0$ with $k = -0.75$. For each extra piece of fruit the class can afford 0.75 fewer drinks.\n\n**b)** The new budget is $1.1 \\cdot 1\\,200 = 1\\,320$ kr, and the line becomes $15x + 20y - 1\\,320 = 0$. The coefficients in front of $x$ and $y$ are the same, so $k = -\\dfrac{15}{20} = -0.75$ as before. The lines have the same slope and are parallel. Only the constant, and with it the $m$-value, has changed.\n\nThe most drinks are obtained if the class buys no fruit, $x = 0$. That is the $m$-value of the line:\n\n$$ \\text{before:} \\quad \\frac{1\\,200}{20} = 60 \\qquad \\text{now:} \\quad \\frac{1\\,320}{20} = 66 $$\n\n$$ 66 - 60 = 6 $$\n\nIs it reasonable? $10\\ \\%$ more money is enough for $10\\ \\%$ more drinks, and $10\\ \\%$ of 60 is 6.\n\n**Answer:** The lines have the same $k$-value and are therefore parallel. The class can buy at most 6 more drinks.\n\n**c)** The new drink price is $1.25 \\cdot 20 = 25$ kr, and the line becomes $15x + 25y - 1\\,200 = 0$. We solve for $y$. Subtract $15x$ from and add $1\\,200$ to both sides:\n\n$$ 15x + 25y - 1\\,200 \\mathbin{\\boldsymbol{-}} \\boldsymbol{15x} \\mathbin{\\boldsymbol{+}} \\boldsymbol{1\\,200} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{15x} \\mathbin{\\boldsymbol{+}} \\boldsymbol{1\\,200} $$\n\n$$ 25y = -15x + 1\\,200 $$\n\nDivide both sides by 25:\n\n$$ \\frac{25y}{\\boldsymbol{25}} = \\frac{-15x + 1\\,200}{\\boldsymbol{25}} $$\n\n$$ y = -0.6x + 48 $$\n\n$k = -0.6$ differs from $-0.75$, so the lines are not parallel. Both lines cross the *x*-axis at $x = \\dfrac{1\\,200}{15} = 80$, since the fruit price is the same, so the new line has been turned about that point.\n\n**Answer:** No, the new line has $k = -0.6$ and is not parallel to the old one.\n\n**General conclusion:** in a budget line $ax + by - c = 0$ the prices $a$ and $b$ decide the slope and the budget $c$ the position. A changed budget gives a parallel line, while a changed price turns the line. The model only applies for whole, non-negative numbers $x$ and $y$."
   }
  ]
 },
 "ma1c-4.7": {
  "kalla": "a882c5d380",
  "data": [
   {
    "level": 1,
    "question": "What $k$-value does a line that is perpendicular to $y = 4x - 1$ have?",
    "choices": [
     "$4$",
     "$-4$",
     "$-\\dfrac{1}{4}$",
     "$\\dfrac{1}{4}$"
    ],
    "correct": 2,
    "solution": "The line $y = 4x - 1$ has $k_1 = 4$. For perpendicular lines $k_2 = -\\dfrac{1}{k_1}$: turn the fraction $\\dfrac{4}{1}$ upside down and change the sign.\n\n$$ k_2 = -\\frac{1}{4} $$\n\nCheck: $4 \\cdot \\left(-\\dfrac{1}{4}\\right) = -1$.\n\n**Answer:** $k = -\\dfrac{1}{4}$"
   },
   {
    "level": 1,
    "question": "Which pair of lines is perpendicular?",
    "choices": [
     "$y = 2x + 1$ and $y = 2x - 3$",
     "$y = 5x$ and $y = -5x$",
     "$y = \\dfrac{1}{2}x + 1$ and $y = 2x$",
     "$y = 3x + 2$ and $y = -\\dfrac{1}{3}x + 4$"
    ],
    "correct": 3,
    "solution": "The lines are perpendicular when the product of the $k$-values is $-1$. We test each pair:\n\n- $2 \\cdot 2 = 4$: the same $k$-value, the lines are parallel.\n- $5 \\cdot (-5) = -25$: not perpendicular.\n- $\\dfrac{1}{2} \\cdot 2 = 1$: not perpendicular.\n- $3 \\cdot \\left(-\\dfrac{1}{3}\\right) = -1$: perpendicular.\n\n**Answer:** $y = 3x + 2$ and $y = -\\dfrac{1}{3}x + 4$"
   },
   {
    "level": 1,
    "question": "The lines $y = kx + 2$ and $y = 2x - 5$ are perpendicular. Find $k$.",
    "answer": {
     "value": -0.5,
     "unit": ""
    },
    "solution": "The product of the $k$-values is $-1$:\n\n$$ k \\cdot 2 = -1 $$\n\nDivide both sides by 2:\n\n$$ \\frac{k \\cdot 2}{2} = \\frac{-1}{2} $$\n\n$$ k = -\\frac{1}{2} $$\n\n**Answer:** $k = -\\dfrac{1}{2} = -0.5$"
   },
   {
    "level": 2,
    "question": "Find the equation of the line that is perpendicular to $y = 3x - 2$ and passes through the point (6, 4).",
    "choices": [
     "$y = 3x - 14$",
     "$y = -\\dfrac{1}{3}x + 6$",
     "$y = -\\dfrac{1}{3}x + 2$",
     "$y = -3x + 22$"
    ],
    "correct": 1,
    "solution": "The given line has $k_1 = 3$. The perpendicular line has\n\n$$ k_2 = -\\frac{1}{3} $$\n\nsince $3 \\cdot \\left(-\\dfrac{1}{3}\\right) = -1$. Substituting into the equation of a straight line gives $y = -\\dfrac{1}{3}x + m$. That (6, 4) lies on the line gives\n\n$$ 4 = -\\frac{1}{3} \\cdot 6 + m $$\n\n$$ 4 = -2 + m $$\n\nAdd 2 to both sides:\n\n$$ 4 + 2 = -2 + m + 2 $$\n\n$$ 6 = m $$\n\n**Answer:** $y = -\\dfrac{1}{3}x + 6$"
   },
   {
    "level": 2,
    "question": "The line $L$ has the equation $2x - 3y + 6 = 0$. Find the $k$-value of a line that is perpendicular to $L$.",
    "answer": {
     "value": -1.5,
     "unit": ""
    },
    "solution": "First we need the $k$-value of $L$, so we solve for $y$. Subtract $2x$ and 6 from both sides:\n\n$$ 2x - 3y + 6 - 2x - 6 = 0 - 2x - 6 $$\n\n$$ -3y = -2x - 6 $$\n\nDivide both sides by $-3$:\n\n$$ \\frac{-3y}{-3} = \\frac{-2x}{-3} + \\frac{-6}{-3} $$\n\n$$ y = \\frac{2}{3}x + 2 $$\n\nSo $k_1 = \\dfrac{2}{3}$. We get the perpendicular line by turning the fraction upside down and changing the sign:\n\n$$ k_2 = -\\frac{3}{2} $$\n\nCheck: $\\dfrac{2}{3} \\cdot \\left(-\\dfrac{3}{2}\\right) = -1$.\n\n**Answer:** $k = -\\dfrac{3}{2} = -1.5$"
   },
   {
    "level": 3,
    "question": "The points A(1, 2), B(5, 4) and C($a$, 8) are vertices of a triangle that has a right angle at B. Find $a$.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "**The key insight:** the angle at B is a right angle when the sides AB and BC are perpendicular, that is, when the product of their $k$-values is $-1$.\n\nThe side AB has\n\n$$ k_\\mathrm{AB} = \\frac{4 - 2}{5 - 1} = \\frac{2}{4} = \\frac{1}{2} $$\n\nThen BC must have the $k$-value $-2$, since $\\dfrac{1}{2} \\cdot (-2) = -1$. With the formula $k = \\dfrac{y_2 - y_1}{x_2 - x_1}$ and B as point 1, the side BC gets\n\n$$ k_\\mathrm{BC} = \\frac{8 - 4}{a - 5} = \\frac{4}{a - 5} $$\n\nIt must be $-2$:\n\n$$ \\frac{4}{a - 5} = -2 $$\n\nMultiply both sides by $(a - 5)$:\n\n$$ \\frac{4}{a - 5} \\cdot (a - 5) = -2 \\cdot (a - 5) $$\n\n$$ 4 = -2a + 10 $$\n\nSubtract 10 from both sides:\n\n$$ 4 - 10 = -2a + 10 - 10 $$\n\n$$ -6 = -2a $$\n\nDivide both sides by $-2$:\n\n$$ \\frac{-6}{-2} = \\frac{-2a}{-2} $$\n\n$$ 3 = a $$\n\nCheck: C = (3, 8) gives $k_\\mathrm{BC} = \\dfrac{8 - 4}{3 - 5} = \\dfrac{4}{-2} = -2$, and $\\dfrac{1}{2} \\cdot (-2) = -1$. It agrees.\n\n**Answer:** $a = 3$"
   }
  ]
 },
 "ma1c-4.8": {
  "kalla": "2945b55d5b",
  "data": [
   {
    "level": 1,
    "question": "Let $f(x) = 3x + 4$. Calculate $f(6)$.",
    "answer": {
     "value": 22,
     "unit": ""
    },
    "solution": "Replace $x$ with 6:\n\n$$ f(6) = 3 \\cdot 6 + 4 = 18 + 4 = 22 $$\n\n**Answer:** $f(6) = 22$"
   },
   {
    "level": 1,
    "question": "What is $x$ called in the function $y = f(x)$?",
    "choices": [
     "The independent variable",
     "The dependent variable",
     "The function value",
     "The coefficient"
    ],
    "correct": 0,
    "solution": "$x$ is chosen freely and is called the **independent variable**. The value of $y$ depends on $x$, so $y$ is the dependent variable, and the value the function gives is called the function value.\n\n**Answer:** The independent variable"
   },
   {
    "level": 1,
    "question": "Let $g(x) = 10 - 2x$. Calculate $g(-3)$.",
    "answer": {
     "value": 16,
     "unit": ""
    },
    "solution": "Replace $x$ with −3 (minus times minus gives plus):\n\n$$ g(-3) = 10 - 2 \\cdot (-3) = 10 + 6 = 16 $$\n\n**Answer:** $g(-3) = 16$"
   },
   {
    "level": 2,
    "question": "Let $f(x) = 5x - 3$. Which expression is $f(2a)$?",
    "choices": [
     "$10a - 6$",
     "$2a \\cdot 5x - 3$",
     "$5a - 3$",
     "$10a - 3$"
    ],
    "correct": 3,
    "solution": "Replace every $x$ with $2a$ and simplify:\n\n$$ f(2a) = 5 \\cdot 2a - 3 = 10a - 3 $$\n\nThe constant term −3 is not affected by the replacement.\n\n**Answer:** $10a - 3$"
   },
   {
    "level": 2,
    "question": "Let $f(x) = 4x + 1$. Calculate $f(5) - f(3)$.",
    "answer": {
     "value": 8,
     "unit": ""
    },
    "solution": "Calculate the function values one at a time:\n\n$$ f(5) = 4 \\cdot 5 + 1 = 21 \\qquad f(3) = 4 \\cdot 3 + 1 = 13 $$\n\n$$ f(5) - f(3) = 21 - 13 = 8 $$\n\n(Quick check: for a linear function the difference is $k \\cdot \\Delta x = 4 \\cdot 2 = 8$.)\n\n**Answer:** 8"
   },
   {
    "level": 3,
    "question": "$f$ is a linear function where $f(2) = 7$ and $f(5) = -2$.<br>a) Find $f(x)$.<br>b) Solve the equation $f(x) = x$ and explain what the solution means for the graph.",
    "answer": {
     "value": 3.25,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -3,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 13,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 3.25,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** $f(2) = 7$ means that the point $(2, 7)$ lies on the graph. So two function values are two points, and two points determine a straight line.\n\n**a)** The graph passes through $(2, 7)$ and $(5, -2)$. The slope is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{-2 - 7}{5 - 2} = \\frac{-9}{3} = -3 $$\n\nSo $f(x) = -3x + m$. We substitute the point $(2, 7)$:\n\n$$ 7 = -3 \\cdot 2 + m $$\n\n$$ 7 = -6 + m $$\n\n$$ 7 \\mathbin{\\boldsymbol{+}} \\boldsymbol{6} = -6 + m \\mathbin{\\boldsymbol{+}} \\boldsymbol{6} $$\n\n$$ 13 = m $$\n\nCheck with the other point: $f(5) = -3 \\cdot 5 + 13 = -15 + 13 = -2$. It agrees.\n\n**Answer:** $f(x) = -3x + 13$\n\n**b)** The equation $f(x) = x$ becomes\n\n$$ -3x + 13 = x $$\n\n$$ -3x + 13 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3x} = x \\mathbin{\\boldsymbol{+}} \\boldsymbol{3x} $$\n\n$$ 13 = 4x $$\n\n$$ \\frac{13}{\\boldsymbol{4}} = \\frac{4x}{\\boldsymbol{4}} $$\n\n$$ 3.25 = x $$\n\nCheck: $f(3.25) = -3 \\cdot 3.25 + 13 = -9.75 + 13 = 3.25$. The function value equals the *x*-value, just as the equation requires.\n\nFor the graph this means that the function value equals the *x*-value exactly where the graph of $f$ crosses the line $y = x$, that is, at the point $(3.25,\\ 3.25)$.\n\n**Answer:** $x = 3.25$. That is where the graph of $f$ crosses the line $y = x$.\n\n**General conclusion:** $f(a) = b$ is the same thing as the point $(a, b)$ lying on the graph. With two such conditions a linear function can be determined completely."
   },
   {
    "level": 3,
    "question": "Let $f(x) = 4x - 7$.<br>a) Simplify $f(a + 3) - f(a)$.<br>b) Show that $f(a + h) - f(a) = k \\cdot h$ for every linear function $f(x) = kx + m$, whatever value $a$ has.",
    "answer": {
     "value": 12,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 12,
      "unit": ""
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** in $f(a + 3)$, $x$ is replaced by the whole expression $a + 3$. It must therefore be in brackets when it is substituted.\n\n**a)** First the function value at $a + 3$:\n\n$$ f(a + 3) = 4(a + 3) - 7 = 4a + 12 - 7 = 4a + 5 $$\n\nThen the difference. The minus sign in front of the bracket changes the sign of both terms in $f(a)$:\n\n$$ f(a + 3) - f(a) = 4a + 5 - (4a - 7) = 4a + 5 - 4a + 7 = 12 $$\n\nThe answer does not depend on $a$. When *x* increases by 3, the function value increases by $3 \\cdot 4 = 12$, wherever you start.\n\nCheck with $a = 0$: $f(3) - f(0) = 5 - (-7) = 12$.\n\n**Answer:** 12\n\n**b)** The same calculation with letters instead of numbers:\n\n$$ f(a + h) = k(a + h) + m = ka + kh + m $$\n\n$$ f(a + h) - f(a) = ka + kh + m - (ka + m) = ka + kh + m - ka - m = kh $$\n\nThe terms $ka$ and $m$ cancel each other out, and what remains is $k \\cdot h$ for every value of $a$. That is exactly what the slope means: a step $h$ in the *x*-direction gives the change $k \\cdot h$ in the *y*-direction.\n\n**General conclusion:** for a linear function the change in function value depends only on how far you go in the *x*-direction, never on where you start. That is why the graph is a straight line."
   },
   {
    "level": 3,
    "question": "The functions $f(x) = 2x + a$ and $g(x) = 3 - x$ are given, where $a$ is a constant. Find $a$ so that $f(g(2)) = g(f(2))$.",
    "answer": {
     "value": -1.5,
     "unit": ""
    },
    "solution": "**The key insight:** an expression such as $f(g(2))$ is calculated from the inside out. The inner function value becomes a number or an expression with $a$, and it is then substituted into the outer function.\n\n**Left-hand side:** first $g(2)$, then $f$ of the result:\n\n$$ g(2) = 3 - 2 = 1 $$\n\n$$ f(g(2)) = f(1) = 2 \\cdot 1 + a = 2 + a $$\n\n**Right-hand side:** first $f(2)$, then $g$ of the result:\n\n$$ f(2) = 2 \\cdot 2 + a = 4 + a $$\n\n$$ g(f(2)) = g(4 + a) = 3 - (4 + a) = -1 - a $$\n\nThe sides must be equal:\n\n$$ 2 + a = -1 - a $$\n\n$$ 2 + a \\mathbin{\\boldsymbol{+}} \\boldsymbol{a} = -1 - a \\mathbin{\\boldsymbol{+}} \\boldsymbol{a} $$\n\n$$ 2 + 2a = -1 $$\n\n$$ 2 + 2a \\mathbin{\\boldsymbol{-}} \\boldsymbol{2} = -1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{2} $$\n\n$$ 2a = -3 $$\n\n$$ \\frac{2a}{\\boldsymbol{2}} = \\frac{-3}{\\boldsymbol{2}} $$\n\n$$ a = -1.5 $$\n\nCheck with $a = -1.5$: $f(g(2)) = f(1) = 2 - 1.5 = 0.5$. And $f(2) = 4 - 1.5 = 2.5$, so $g(f(2)) = g(2.5) = 3 - 2.5 = 0.5$. Both sides become 0.5.\n\n**Answer:** $a = -1.5$\n\n**General conclusion:** $f(g(x))$ and $g(f(x))$ are in general different, because the order matters. That they should be equal for a particular *x* is a condition, and a condition gives an equation."
   },
   {
    "level": 3,
    "question": "Let $f(x) = 5x - 4$. Elin is going to solve the equation $f(2x) = 3 \\cdot f(x) - 2$. She writes $f(2x) = 2 \\cdot f(x) = 10x - 8$ and gets the solution $x = 1.2$.<br>a) What mistake does Elin make?<br>b) Solve the equation correctly.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 2,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** $f(2x)$ means \"substitute $2x$ for $x$\", not \"double the function value\". When the function has a constant term, those are two different things.\n\n**a)** Correct substitution gives\n\n$$ f(2x) = 5 \\cdot 2x - 4 = 10x - 4 $$\n\nElin has also doubled the constant term $-4$. A simple number shows the difference: with $x = 1$, $f(2) = 6$, but $2 \\cdot f(1) = 2 \\cdot 1 = 2$.\n\n**Answer:** Elin thinks that $f(2x) = 2 \\cdot f(x)$. Only the *x*-term should be doubled, so $f(2x) = 10x - 4$.\n\n**b)** The right-hand side:\n\n$$ 3 \\cdot f(x) - 2 = 3(5x - 4) - 2 = 15x - 12 - 2 = 15x - 14 $$\n\nThe equation becomes\n\n$$ 10x - 4 = 15x - 14 $$\n\n$$ 10x - 4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{10x} = 15x - 14 \\mathbin{\\boldsymbol{-}} \\boldsymbol{10x} $$\n\n$$ -4 = 5x - 14 $$\n\n$$ -4 \\mathbin{\\boldsymbol{+}} \\boldsymbol{14} = 5x - 14 \\mathbin{\\boldsymbol{+}} \\boldsymbol{14} $$\n\n$$ 10 = 5x $$\n\n$$ \\frac{10}{\\boldsymbol{5}} = \\frac{5x}{\\boldsymbol{5}} $$\n\n$$ 2 = x $$\n\nCheck: left-hand side $f(2 \\cdot 2) = f(4) = 5 \\cdot 4 - 4 = 16$. Right-hand side $3 \\cdot f(2) - 2 = 3 \\cdot 6 - 2 = 16$. It agrees.\n\n**Answer:** $x = 2$\n\n**General conclusion:** the rule $f(2x) = 2 \\cdot f(x)$ only holds for proportional functions $f(x) = kx$, where $m = 0$. If you are unsure whether a rule holds: test it with a simple number."
   },
   {
    "level": 3,
    "question": "The cost $K(s)$ kr of a taxi trip of $s$ km is $K(s) = 49 + 14.5s$.<br>a) Calculate $K(12) - K(8)$ and explain what the number means.<br>b) Ida paid $339\\ \\mathrm{kr}$ for a trip. How long was the trip?<br>c) Another company charges $T(s) = 99 + 11s$ kr. Write the condition \"the trip is cheaper with the other company\" using function notation, and find for which trips it holds. Round to one decimal place.",
    "answer": {
     "value": 14.3,
     "unit": "km",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 58,
      "unit": "kr"
     },
     {
      "del": "b",
      "value": 20,
      "unit": "km"
     },
     {
      "del": "c",
      "value": 14.3,
      "unit": "km",
      "tol": 0.01,
      "etikett": "$s >$"
     }
    ],
    "solution": "**The key insight:** $K(12)$ is a number, the cost of a trip of 12 km. Statements about costs therefore become equations and inequalities between function values.\n\n**a)** The function values one at a time:\n\n$$ K(12) = 49 + 14.5 \\cdot 12 = 49 + 174 = 223 $$\n\n$$ K(8) = 49 + 14.5 \\cdot 8 = 49 + 116 = 165 $$\n\n$$ K(12) - K(8) = 223 - 165 = 58 $$\n\nThe start fee 49 kr is included in both and cancels out. What remains is the cost of the 4 kilometres between 8 and 12 km: $4 \\cdot 14.5 = 58$.\n\n**Answer:** $58\\ \\mathrm{kr}$, what the four extra kilometres cost when the trip is 12 km instead of 8 km.\n\n**b)** We look for $s$ such that $K(s) = 339$:\n\n$$ 49 + 14.5s = 339 $$\n\n$$ 49 + 14.5s \\mathbin{\\boldsymbol{-}} \\boldsymbol{49} = 339 \\mathbin{\\boldsymbol{-}} \\boldsymbol{49} $$\n\n$$ 14.5s = 290 $$\n\n$$ \\frac{14.5s}{\\boldsymbol{14.5}} = \\frac{290}{\\boldsymbol{14.5}} $$\n\n$$ s = 20 $$\n\nCheck: $K(20) = 49 + 14.5 \\cdot 20 = 49 + 290 = 339$.\n\n**Answer:** $20\\ \\mathrm{km}$\n\n**c)** \"Cheaper with the other company\" means $T(s) < K(s)$:\n\n$$ 99 + 11s < 49 + 14.5s $$\n\n$$ 99 + 11s \\mathbin{\\boldsymbol{-}} \\boldsymbol{11s} < 49 + 14.5s \\mathbin{\\boldsymbol{-}} \\boldsymbol{11s} $$\n\n$$ 99 < 49 + 3.5s $$\n\n$$ 99 \\mathbin{\\boldsymbol{-}} \\boldsymbol{49} < 49 + 3.5s \\mathbin{\\boldsymbol{-}} \\boldsymbol{49} $$\n\n$$ 50 < 3.5s $$\n\n$$ \\frac{50}{\\boldsymbol{3.5}} < \\frac{3.5s}{\\boldsymbol{3.5}} $$\n\n$$ 14.28\\ldots < s $$\n\nCheck with a number on each side: $s = 10$ gives $T(10) = 209$ and $K(10) = 194$, so there the first company is the cheapest. $s = 20$ gives $T(20) = 319$ and $K(20) = 339$, so there the other company is the cheapest.\n\nIs it reasonable? The other company has a higher start fee but a lower price per kilometre, so it only pays off on long trips.\n\n**Answer:** $T(s) < K(s)$. It holds for trips longer than about $14.3\\ \\mathrm{km}$.\n\n**General conclusion:** with function notation a statement in words can be written briefly and exactly, and then solved as an ordinary equation or inequality."
   },
   {
    "level": 3,
    "question": "A rectangle has the perimeter $20\\ \\mathrm{cm}$. One side is $x$ cm.<br>a) Write the area of the rectangle $A(x)\\ \\mathrm{cm^2}$ as a function of $x$.<br>b) Calculate $A(3)$ and $A(7)$, and explain why they are equal.<br>c) Give two solutions to the equation $A(x) = 21$ without calculating, and explain why the equation $A(x) = 30$ has no solution.",
    "answer": {
     "value": 21,
     "unit": "cm²"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 21,
      "unit": "cm²",
      "etikett": "$A(3) = A(7) =$"
     },
     {
      "del": "c",
      "values": [
       3,
       7
      ],
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** two different *x*-values can give the same function value. A function only requires every *x* to give a single *y*, not every *y* to come from a single *x*.\n\n**a)** Call the other side $y$ cm. The perimeter is two sides of each kind:\n\n$$ 2x + 2y = 20 $$\n\n$$ \\frac{2x + 2y}{\\boldsymbol{2}} = \\frac{20}{\\boldsymbol{2}} $$\n\n$$ x + y = 10 $$\n\n$$ x + y \\mathbin{\\boldsymbol{-}} \\boldsymbol{x} = 10 \\mathbin{\\boldsymbol{-}} \\boldsymbol{x} $$\n\n$$ y = 10 - x $$\n\nThe area is width times length:\n\n$$ A(x) = x(10 - x) $$\n\nBoth sides must be positive, so the function applies for $0 < x < 10$.\n\n**Answer:** $A(x) = x(10 - x)$\n\n**b)**\n\n$$ A(3) = 3(10 - 3) = 3 \\cdot 7 = 21 $$\n\n$$ A(7) = 7(10 - 7) = 7 \\cdot 3 = 21 $$\n\nWith $x = 3$ the other side is 7 cm, and with $x = 7$ the other side is 3 cm. It is the same rectangle, just turned a quarter of a turn.\n\n**Answer:** $A(3) = A(7) = 21$. Both give a rectangle with the sides 3 cm and 7 cm.\n\n**c)** According to b, both $x = 3$ and $x = 7$ give the area 21.\n\nTo see how large the area can be, we write the sides as $5 + d$ and $5 - d$, since together they must be 10. The area becomes\n\n$$ (5 + d)(5 - d) = 25 - 5d + 5d - d^2 = 25 - d^2 $$\n\nThe number $d^2$ is never negative, so the area is at most 25, and largest when $d = 0$, that is, for the square with the side 5 cm. The area 30 cannot be obtained.\n\nCheck with $d = 2$: the sides 7 cm and 3 cm give $25 - 4 = 21$, the same as in b.\n\n**Answer:** $x = 3$ and $x = 7$. $A(x) = 30$ has no solution because the area is never larger than $25\\ \\mathrm{cm^2}$.\n\n**General conclusion:** an equation $f(x) = c$ can have several solutions, one solution or none at all. That is decided by which function values the function can actually take."
   },
   {
    "level": 3,
    "question": "The temperature of a cup of tea is $T(t)$ °C, where $t$ is the time in minutes after the tea was poured.<br>a) Write the statement \"after a quarter of an hour the tea is 20 degrees warmer than after half an hour\" using function notation.<br>b) Explain in words what the inequality $T(t + 1) < T(t)$ means.<br>c) A model for the temperature is $T(t) = 20 + 70 \\cdot 0.95^t$. Does the statement in a agree with the model?",
    "answer": {
     "value": 17.4,
     "unit": "°C",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 17.4,
      "unit": "°C",
      "tol": 0.01,
      "etikett": "$T(15) - T(30) \\approx$"
     }
    ],
    "solution": "**The key insight:** $T(15)$ is a number, the temperature 15 minutes after the tea was poured. Every statement about temperatures at given times therefore becomes a relationship between function values.\n\n**a)** A quarter of an hour is $t = 15$ and half an hour is $t = 30$. The temperature after a quarter of an hour is 20 degrees higher:\n\n**Answer:** $T(15) = T(30) + 20$\n\n**b)** $T(t + 1)$ is the temperature one minute after the time $t$. The inequality says that it is always lower than the temperature at $t$.\n\n**Answer:** The tea gets colder with every minute that passes.\n\n**c)** We substitute $t = 15$ and $t = 30$ into the model:\n\n$$ T(15) = 20 + 70 \\cdot 0.95^{15} = 20 + 70 \\cdot 0.4632\\ldots = 52.43\\ldots $$\n\n$$ T(30) = 20 + 70 \\cdot 0.95^{30} = 20 + 70 \\cdot 0.2146\\ldots = 35.02\\ldots $$\n\n$$ T(15) - T(30) \\approx 52.43 - 35.02 = 17.41 $$\n\nThe difference is about 17 degrees, not 20.\n\nIs it reasonable? During the first quarter of an hour the temperature falls from $T(0) = 90$ to about 52, that is, by about 38 degrees. The closer the tea gets to the room temperature 20 °C, the more slowly it cools, so the second quarter of an hour gives a smaller drop.\n\n**Answer:** No. According to the model the tea is about 17.4 degrees warmer after a quarter of an hour than after half an hour.\n\n**General conclusion:** function notation makes it possible to write a statement exactly and then test it against a model. The same statement can be true in one model and false in another."
   }
  ]
 },
 "ma1c-4.9": {
  "kalla": "3f51179c6d",
  "data": [
   {
    "level": 1,
    "question": "When the equation $2x - 1 = x + 4$ is solved graphically, two lines are drawn. What gives the solution?",
    "choices": [
     "The distance between the lines",
     "The point of intersection's *y*-coordinate",
     "The lines' *k*-values",
     "The point of intersection's *x*-coordinate"
    ],
    "correct": 3,
    "solution": "Draw $y = 2x - 1$ and $y = x + 4$; where the graphs cross each other LHS = RHS. The solution is the ***x*-coordinate** of the point of intersection (here $x = 5$; the *y*-coordinate 9 is just the common value of the two sides).\n\n**Answer:** The *x*-coordinate of the point of intersection"
   },
   {
    "level": 1,
    "question": "The graphs of $y = 3x - 5$ and $y = -x + 3$ cross each other at the point (2, 1). What is the solution to the equation $3x - 5 = -x + 3$?",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "solution": "The solution is the *x*-coordinate of the point of intersection:\n\n$$ x = 2 $$\n\nCheck: $3 \\cdot 2 - 5 = 1$ and $-2 + 3 = 1$, so both sides are equal.\n\n**Answer:** $x = 2$"
   },
   {
    "level": 1,
    "question": "How is the number 7.5 written when it is entered in GeoGebra?",
    "choices": [
     "75/10 must always be used",
     "7,5",
     "7:5",
     "7.5"
    ],
    "correct": 3,
    "solution": "GeoGebra uses a decimal point, not a decimal comma (which is used in Swedish): 7.5 is written `7.5`.\n\n**Answer:** 7.5"
   },
   {
    "level": 2,
    "question": "You are going to solve $s = 90t - 30$ and $s = 60t + 45$ graphically in GeoGebra. What must you do with the equations first?",
    "choices": [
     "Multiply both equations by 10",
     "Nothing, GeoGebra understands all variable names in graphical solutions",
     "Rewrite them in general form",
     "Change the variables to x and y: `y = 90x - 30` and `y = 60x + 45`"
    ],
    "correct": 3,
    "solution": "In graphical solutions GeoGebra only understands the variables $x$ and $y$. The equations are therefore rewritten: $t \\to x$ and $s \\to y$.\n\n(The solution is then the *x*-coordinate of the point of intersection: $90x - 30 = 60x + 45$ gives $x = 2.5$.)\n\n**Answer:** Change the variables to x and y."
   },
   {
    "level": 2,
    "question": "The lines $y = -2x + 5$ and $y = x - 4$ cross each other at $x = 3$. For which $x$ does the inequality $-2x + 5 > x - 4$ hold?",
    "choices": [
     "$x < 3$",
     "$x > 3$",
     "$x = 3$",
     "All $x$"
    ],
    "correct": 0,
    "solution": "$-2x + 5$ is GREATER than $x - 4$ when the falling line $y = -2x + 5$ lies ABOVE the line $y = x - 4$. It does so to the left of the point of intersection:\n\n$$ x < 3 $$\n\n(Compare with the example in the lesson, where $-2x + 5 < x - 4$ gave $x > 3$, the opposite side.)\n\n**Answer:** $x < 3$"
   },
   {
    "level": 3,
    "question": "a) Solve the equation $2^x = x + 3$ with a graphing tool. Answer with two decimal places.<br>b) Use the graphs to explain why the equation $2^x = x$ has no solution.",
    "answer": {
     "value": 2.44,
     "unit": "",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "values": [
       -2.86,
       2.44
      ],
      "unit": "",
      "tol": 0.01,
      "etikett": "$x \\approx$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** here *x* appears both in an exponent and in an ordinary term. They cannot be collected on the same side with the balance method, but the graphs can always be drawn. The graphs also show how many solutions there are.\n\n**a)** LHS $= 2^x$ and RHS $= x + 3$. In GeoGebra we type `y = 2^x` and `y = x + 3`. The curve and the line cross each other at two points. With the tool *Intersect* we get\n\n$$ (-2.86,\\ 0.14) \\qquad \\text{and} \\qquad (2.44,\\ 5.44) $$\n\nThe solutions are the *x*-coordinates of the points of intersection.\n\nCheck by substitution: $x = -2.86$ gives LHS $= 2^{-2.86} \\approx 0.138$ and RHS $= -2.86 + 3 = 0.14$. $x = 2.44$ gives LHS $= 2^{2.44} \\approx 5.43$ and RHS $= 2.44 + 3 = 5.44$. The sides are almost equal, and the small difference comes from the rounding.\n\n**Answer:** $x \\approx -2.86$ and $x \\approx 2.44$\n\n**b)** We draw `y = 2^x` and `y = x`. The curve lies above the line all the time and never crosses it. For negative *x*, $2^x$ is positive while $x$ is negative. For positive *x* the curve starts higher ($2^0 = 1$ while the line passes through the origin) and also grows faster: $2^1 = 2 > 1$, $2^2 = 4 > 2$, $2^3 = 8 > 3$.\n\n**Answer:** The graphs of $y = 2^x$ and $y = x$ have no point of intersection, because the curve always lies above the line.\n\n**General conclusion:** a graphical solution works even when algebra is not enough. Reading off gives approximate values, and therefore the answer should always be checked by substitution."
   },
   {
    "level": 3,
    "question": "The town of Alby has $24\\,000$ inhabitants and grows by $600$ inhabitants per year. The town of Borg has $18\\,000$ inhabitants and grows by $3.5\\ \\%$ per year.<br>a) Set up an equation for when the towns have the same number of inhabitants, and solve it graphically. Round to one decimal place.<br>b) How many inhabitants do the towns have then? Round to the nearest hundred.<br>c) How reliable is the answer in a? Discuss the models.",
    "answer": {
     "value": 20.3,
     "unit": "years",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 20.3,
      "unit": "years",
      "tol": 0.01,
      "etikett": "$x \\approx$"
     },
     {
      "del": "b",
      "value": 36200,
      "unit": "inhabitants",
      "tol": 0.01
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** Alby grows by the same number every year (linearly), Borg by the same percentage every year (exponentially). The exponential increase gets bigger every year and sooner or later catches up.\n\n**a)** After $x$ years Alby has $24\\,000 + 600x$ inhabitants and Borg $18\\,000 \\cdot 1.035^x$ inhabitants. The equation is\n\n$$ 18\\,000 \\cdot 1.035^x = 24\\,000 + 600x $$\n\nIn GeoGebra we type `y = 18000*1.035^x` and `y = 24000 + 600x` (decimal point, no space in the numbers). We zoom out until the point of intersection is visible and find it with *Intersect*. It lies at $x = 20.29\\ldots$\n\nCheck with a table: after 20 years Alby has $24\\,000 + 600 \\cdot 20 = 36\\,000$ inhabitants and Borg $18\\,000 \\cdot 1.035^{20} \\approx 35\\,816$. After 21 years Alby has $36\\,600$ and Borg $18\\,000 \\cdot 1.035^{21} \\approx 37\\,070$. So Borg overtakes Alby during the 21st year, which agrees with $x \\approx 20.3$.\n\n**Answer:** $18\\,000 \\cdot 1.035^x = 24\\,000 + 600x$, which gives $x \\approx 20.3$ years.\n\n**b)** The *y*-coordinate of the point of intersection is the common number of inhabitants:\n\n$$ 24\\,000 + 600 \\cdot 20.29 \\approx 36\\,170 $$\n\n**Answer:** About $36\\,200$ inhabitants\n\n**c)** Both models assume that the development stays the same for more than 20 years, and that is unlikely for a town. The answer is also sensitive to the percentage: with $3.0\\ \\%$ instead of $3.5\\ \\%$ the same method gives about 27 years, and with $4.0\\ \\%$ about 16 years. So half a percentage point moves the answer by several years.\n\n**Answer:** The answer is uncertain. The models assume unchanged growth for over 20 years, and a small change in the percentage changes the answer by several years.\n\n**General conclusion:** equations where *x* appears both in an exponent and outside one are solved graphically. The answer is never more reliable than the models it is based on."
   },
   {
    "level": 3,
    "question": "Solve the inequality $0.5x + 1 > 4 - x^2$ with a graphing tool. Check the answer by testing a number in each part of the number line.",
    "solution": "**The key insight:** the inequality asks where the line $y = 0.5x + 1$ lies *above* the curve $y = 4 - x^2$. The curve is a parabola, and it can cross the line at two points. Then the answer can consist of two separate parts of the number line.\n\nIn GeoGebra we type `y = 0.5x + 1` and `y = 4 - x^2`. The parabola has its top at $(0, 4)$ and the line crosses it at two points, which we find with *Intersect*:\n\n$$ (-2,\\ 0) \\qquad \\text{and} \\qquad (1.5,\\ 1.75) $$\n\nCheck of the points of intersection: $x = -2$ gives LHS $= 0.5 \\cdot (-2) + 1 = 0$ and RHS $= 4 - (-2)^2 = 4 - 4 = 0$. $x = 1.5$ gives LHS $= 0.5 \\cdot 1.5 + 1 = 1.75$ and RHS $= 4 - 1.5^2 = 4 - 2.25 = 1.75$. So the reading is exact.\n\nBetween the points of intersection the parabola lies above the line. Outside them the line lies above the parabola, and there the inequality holds. The points of intersection themselves are not included, since LHS must be *greater than* RHS and not equal to it.\n\nTesting with a number in each part:\n\n- $x = -3$: LHS $= 0.5 \\cdot (-3) + 1 = -0.5$ and RHS $= 4 - 9 = -5$. Since $-0.5 > -5$ the inequality holds.\n- $x = 0$: LHS $= 1$ and RHS $= 4$. Since $1 < 4$ it does not hold.\n- $x = 2$: LHS $= 0.5 \\cdot 2 + 1 = 2$ and RHS $= 4 - 4 = 0$. Since $2 > 0$ the inequality holds.\n\n**Answer:** $x < -2$ or $x > 1.5$\n\n**General conclusion:** for a graphical inequality the points of intersection decide where the boundaries are, and the positions of the graphs decide on which sides the inequality holds. A test number in each part confirms the answer."
   },
   {
    "level": 3,
    "question": "The equation $4 - x^2 = k$, where $k$ is a constant, is to be solved graphically.<br>a) How many solutions does the equation have for different values of $k$?<br>b) Find $k$ so that the equation has two solutions that are a distance 6 apart.",
    "answer": {
     "value": -5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": -5,
      "unit": "",
      "etikett": "$k =$"
     }
    ],
    "solution": "**The key insight:** RHS $= k$ gives the graph $y = k$, a horizontal line. Changing $k$ moves the line up and down, and the number of solutions is the number of times the line crosses the parabola.\n\n**a)** In GeoGebra we type `y = 4 - x^2` and `y = k`. GeoGebra then creates a slider for $k$, and we can drag it and see what happens. The parabola has its highest point at $(0, 4)$.\n\n- If $k < 4$ the line lies below the top and crosses the parabola twice.\n- If $k = 4$ the line only touches the top, and $x = 0$ is the only solution.\n- If $k > 4$ the line lies above the whole parabola and never crosses it.\n\n**Answer:** Two solutions if $k < 4$, one solution if $k = 4$ and no solution if $k > 4$.\n\n**b)** The parabola is symmetrical about the *y*-axis, so the two solutions lie the same distance from 0 on either side. The distance 6 gives the solutions $x = -3$ and $x = 3$. We substitute $x = 3$ into LHS:\n\n$$ k = 4 - 3^2 = 4 - 9 = -5 $$\n\nCheck: the equation $4 - x^2 = -5$ is solved like this.\n\n$$ 4 - x^2 \\mathbin{\\boldsymbol{+}} \\boldsymbol{x^2} = -5 \\mathbin{\\boldsymbol{+}} \\boldsymbol{x^2} $$\n\n$$ 4 = -5 + x^2 $$\n\n$$ 4 \\mathbin{\\boldsymbol{+}} \\boldsymbol{5} = -5 + x^2 \\mathbin{\\boldsymbol{+}} \\boldsymbol{5} $$\n\n$$ 9 = x^2 $$\n\n$$ x = \\pm\\sqrt{9} $$\n\n$$ x = \\pm 3 $$\n\nThe solutions $-3$ and $3$ are a distance 6 apart.\n\n**Answer:** $k = -5$\n\n**General conclusion:** an equation with a parameter is best investigated graphically, with a slider. The number of solutions is the number of points of intersection, and it can change when the graph is moved past a top."
   },
   {
    "level": 3,
    "question": "A ball is thrown straight up. The height of the ball above the ground is $h(t)$ metres after $t$ seconds, where $h(t) = 1.8 + 12t - 4.91t^2$.<br>a) How do you enter the function in GeoGebra, and why?<br>b) At what times is the ball $6\\ \\mathrm{m}$ above the ground? Answer with two decimal places.<br>c) For how long is the ball higher than $6\\ \\mathrm{m}$ above the ground? Answer with two decimal places.",
    "answer": {
     "value": 1.6,
     "unit": "s",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "values": [
       0.42,
       2.02
      ],
      "unit": "s",
      "tol": 0.01,
      "etikett": "$t \\approx$"
     },
     {
      "del": "c",
      "value": 1.6,
      "unit": "s",
      "tol": 0.01
     }
    ],
    "solution": "**The key insight:** the question \"when is the ball 6 m up?\" is the equation $h(t) = 6$. The ball passes that height twice, once on the way up and once on the way down.\n\n**a)** In graphical solutions GeoGebra only understands the variables $x$ and $y$, and decimal numbers are written with a point.\n\n**Answer:** `y = 1.8 + 12x - 4.91x^2`, because $t$ must be replaced by $x$ and $h$ by $y$, and decimals must be written with a decimal point.\n\n**b)** We also draw `y = 6` and find the points of intersection with *Intersect*:\n\n$$ (0.42,\\ 6) \\qquad \\text{and} \\qquad (2.02,\\ 6) $$\n\nThe *x*-coordinates are the times, since $x$ stands for $t$.\n\nCheck: $h(0.42) = 1.8 + 12 \\cdot 0.42 - 4.91 \\cdot 0.42^2 \\approx 5.97$ and $h(2.02) = 1.8 + 12 \\cdot 2.02 - 4.91 \\cdot 2.02^2 \\approx 6.01$. Both are very close to 6, and the difference comes from the rounding.\n\n**Answer:** After about $0.42\\ \\mathrm{s}$ and after about $2.02\\ \\mathrm{s}$\n\n**c)** Between the two times the curve lies above the line $y = 6$. We calculate with the unrounded values from GeoGebra:\n\n$$ 2.020\\ldots - 0.423\\ldots \\approx 1.60 $$\n\nIs it reasonable? The ball reaches its highest point halfway between, at about 1.2 s, and spends as long on the way up from 6 m as on the way down to 6 m.\n\n**Answer:** About $1.60\\ \\mathrm{s}$\n\n**General conclusion:** when a model uses letters other than $x$ and $y$, they are replaced when entering the model and translated back in the answer. Always answer in the model's own quantities, here seconds."
   },
   {
    "level": 3,
    "question": "Moa is going to solve the equation $3(x - 2) + x = 4x - 6$ graphically. When she draws both sides in GeoGebra she sees only a single line and no point of intersection. She concludes that the equation has no solution.<br>a) Is Moa right? Explain.<br>b) The right-hand side is changed to $4x + 1$. What do the graphs show now, and what does that mean for the equation?<br>c) The right-hand side is instead changed to $ax - 6$, where $a$ is a constant. For which values of $a$ does the equation have exactly one solution, and what is the solution?",
    "answer": {
     "value": 0,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 0,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** the graphs looking like a single line means that they lie *on top of* each other. Then every point on the line is a point of intersection.\n\n**a)** We simplify LHS:\n\n$$ 3(x - 2) + x = 3x - 6 + x = 4x - 6 $$\n\nSo LHS and RHS are the same expression, and the lines $y = 4x - 6$ coincide. Every *x* makes the sides equal.\n\nCheck with $x = 10$: LHS $= 3 \\cdot 8 + 10 = 34$ and RHS $= 4 \\cdot 10 - 6 = 34$.\n\n**Answer:** No. The lines coincide, so the equation has infinitely many solutions: every *x* is a solution.\n\n**b)** Now $y = 4x - 6$ and $y = 4x + 1$ are drawn. They have the same slope, $k = 4$, but different *m*-values, so they are parallel and never cross each other. It can also be seen algebraically: $4x - 6 = 4x + 1$ gives, after subtracting $4x$ from both sides, $-6 = 1$, which is never true.\n\n**Answer:** The graphs are two parallel lines with no point of intersection, so the equation has no solution.\n\n**c)** LHS is still $4x - 6$, and RHS is $ax - 6$. Both lines have the *m*-value $-6$, so they pass through the same point $(0, -6)$ on the *y*-axis. If they have different slopes, that is $a \\neq 4$, they cross each other exactly there and nowhere else. If $a = 4$ they coincide as in a.\n\nCheck with $x = 0$: LHS $= 3 \\cdot (0 - 2) + 0 = -6$ and RHS $= a \\cdot 0 - 6 = -6$, whatever the value of $a$.\n\n**Answer:** Exactly one solution when $a \\neq 4$, and the solution is always $x = 0$.\n\n**General conclusion:** two straight lines can cross each other at one point (one solution), be parallel (no solution) or coincide (infinitely many solutions). The graph shows directly which case it is."
   },
   {
    "level": 3,
    "question": "The equation $ax - 3 = 7 - 2x$, where $a$ is a constant, is solved graphically. The lines $y = ax - 3$ and $y = 7 - 2x$ cross each other at a point with the *y*-coordinate 3.<br>a) Find the solution of the equation.<br>b) Find $a$.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "b",
      "value": 3,
      "unit": "",
      "etikett": "$a =$"
     }
    ],
    "solution": "**The key insight:** at the point of intersection both sides have the same value, and that value is the *y*-coordinate of the point of intersection. The line we know completely can then give the *x*-coordinate, that is, the solution.\n\n**a)** The point of intersection lies on the line $y = 7 - 2x$ and has $y = 3$:\n\n$$ 7 - 2x = 3 $$\n\n$$ 7 - 2x \\mathbin{\\boldsymbol{-}} \\boldsymbol{7} = 3 \\mathbin{\\boldsymbol{-}} \\boldsymbol{7} $$\n\n$$ -2x = -4 $$\n\n$$ \\frac{-2x}{\\boldsymbol{-2}} = \\frac{-4}{\\boldsymbol{-2}} $$\n\n$$ x = 2 $$\n\nThe point of intersection is $(2, 3)$, and the solution is its *x*-coordinate.\n\n**Answer:** $x = 2$\n\n**b)** The point $(2, 3)$ also lies on the line $y = ax - 3$:\n\n$$ 3 = a \\cdot 2 - 3 $$\n\n$$ 3 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} = 2a - 3 \\mathbin{\\boldsymbol{+}} \\boldsymbol{3} $$\n\n$$ 6 = 2a $$\n\n$$ \\frac{6}{\\boldsymbol{2}} = \\frac{2a}{\\boldsymbol{2}} $$\n\n$$ 3 = a $$\n\nCheck: with $a = 3$ the equation is $3x - 3 = 7 - 2x$. Substituting $x = 2$ gives LHS $= 3 \\cdot 2 - 3 = 3$ and RHS $= 7 - 2 \\cdot 2 = 3$. The sides are equal, and both are 3, just like the *y*-coordinate.\n\n**Answer:** $a = 3$\n\n**General conclusion:** the *y*-coordinate of the point of intersection is not the solution, but it is the common value of both sides. It can be used backwards to find an unknown constant."
   }
  ]
 },
 "ma1c-4.10": {
  "kalla": "284766acd8",
  "data": [
   {
    "level": 1,
    "question": "What is the set of possible values of the independent variable $x$ called?",
    "choices": [
     "Domain",
     "Range",
     "Function value",
     "Interval"
    ],
    "correct": 0,
    "solution": "The possible *x*-values form the **domain**; the possible *y*-values form the **range**.\n\n**Answer:** Domain"
   },
   {
    "level": 1,
    "question": "An end point of a graph is drawn as an open (not filled) circle. What does that mean?",
    "choices": [
     "The end point is not included in the interval (< or >)",
     "The end point is included in the interval (≤ or ≥)",
     "The graph continues for ever",
     "The function is zero there"
    ],
    "correct": 0,
    "solution": "Open circle = the end point is NOT included (strict inequality, < or >). Filled circle = the end point is included (≤ or ≥).\n\n**Answer:** The end point is not included in the interval."
   },
   {
    "level": 1,
    "question": "A car park costs 20 kr per started hour, for at most 8 hours. The cost is $y = 20x$. What is the domain?",
    "choices": [
     "$0 \\leq y \\leq 160$",
     "$0 \\leq x \\leq 8$",
     "$x \\geq 0$",
     "$0 < x < 20$"
    ],
    "correct": 1,
    "solution": "The domain is the allowed *x*-values (the number of hours): at least 0 and at most 8:\n\n$$ 0 \\leq x \\leq 8 $$\n\n($0 \\leq y \\leq 160$ is instead the range.)\n\n**Answer:** $0 \\leq x \\leq 8$"
   },
   {
    "level": 2,
    "question": "The function $y = 50x$ has the domain $0 \\leq x \\leq 12$. What is the range?",
    "choices": [
     "$0 \\leq y \\leq 12$",
     "$0 \\leq y \\leq 600$",
     "$y \\geq 0$",
     "$50 \\leq y \\leq 600$"
    ],
    "correct": 1,
    "solution": "The smallest *y*-value is obtained at $x = 0$: $y = 50 \\cdot 0 = 0$. The largest at $x = 12$: $y = 50 \\cdot 12 = 600$:\n\n$$ 0 \\leq y \\leq 600 $$\n\n**Answer:** $0 \\leq y \\leq 600$"
   },
   {
    "level": 2,
    "question": "A graph starts with an open circle at (−3, 1) and ends with a filled point at (5, 7), and in between it rises all the time. What is the domain?",
    "choices": [
     "$-3 < x < 5$",
     "$-3 \\leq x \\leq 5$",
     "$1 < y \\leq 7$",
     "$-3 < x \\leq 5$"
    ],
    "correct": 3,
    "solution": "An open circle at $x = -3$ gives a strict inequality ($x > -3$); a filled point at $x = 5$ gives $x \\leq 5$:\n\n$$ -3 < x \\leq 5 $$\n\n($1 < y \\leq 7$ is the range. The question was about the domain.)\n\n**Answer:** $-3 < x \\leq 5$"
   },
   {
    "level": 3,
    "question": "A paddock is to have the shape of a rectangle with the area $48\\ \\mathrm{m^2}$. The width of the paddock is $x$ m and its length is $y$ m. Both sides must be at least $4\\ \\mathrm{m}$, and the length must be at least as large as the width.<br>a) Write $y$ as a function of $x$.<br>b) Find the domain of the function. Answer exactly and to one decimal place.<br>c) Find the range of the function.",
    "answer": {
     "value": 6.9,
     "unit": "m",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 6.9,
      "unit": "m",
      "tol": 0.01,
      "etikett": "largest width"
     },
     {
      "del": "c",
      "value": 6.9,
      "unit": "m",
      "tol": 0.01,
      "etikett": "smallest length"
     },
     {
      "del": "c",
      "value": 12,
      "unit": "m",
      "etikett": "largest length"
     }
    ],
    "solution": "**The key insight:** the domain is determined by *all* the conditions together. Each condition gives a limit for $x$, and it is the strictest limit in each direction that applies.\n\n**a)** The area is width times length:\n\n$$ x \\cdot y = 48 $$\n\n$$ \\frac{x \\cdot y}{\\boldsymbol{x}} = \\frac{48}{\\boldsymbol{x}} $$\n\n$$ y = \\frac{48}{x} $$\n\n**Answer:** $y = \\dfrac{48}{x}$\n\n**b)** The conditions translated into *x*:\n\n- The width at least 4 m: $x \\geq 4$.\n- The length at least as large as the width: $\\dfrac{48}{x} \\geq x$. We multiply both sides by the positive number $x$ and get $48 \\geq x^2$. So the largest allowed *x* is $\\sqrt{48} = 6.92\\ldots$, when the paddock is a square.\n- The length at least 4 m: $\\dfrac{48}{x} \\geq 4$ gives $x \\leq 12$. That limit is weaker than $x \\leq \\sqrt{48}$ and does not affect the answer.\n\nCheck with a width inside the interval: $x = 6$ gives $y = \\dfrac{48}{6} = 8$, and both $6 \\geq 4$ and $8 \\geq 6$ are true. With $x = 8$, $y = 6$, and then the length is shorter than the width.\n\n**Answer:** $4 \\leq x \\leq \\sqrt{48}$, that is, approximately $4 \\leq x \\leq 6.9$\n\n**c)** The wider the paddock is, the shorter it becomes, so the largest *y* belongs to the smallest *x* and vice versa:\n\n$$ x = 4 \\text{ gives } y = \\frac{48}{4} = 12 $$\n\n$$ x = \\sqrt{48} \\text{ gives } y = \\frac{48}{\\sqrt{48}} = \\sqrt{48} $$\n\nThe last equality holds because $\\sqrt{48} \\cdot \\sqrt{48} = 48$: in the square the length equals the width.\n\n**Answer:** $\\sqrt{48} \\leq y \\leq 12$, that is, approximately $6.9 \\leq y \\leq 12$\n\n**General conclusion:** in an application the context sets the limits of the domain. First write each condition as an inequality for *x*, and then choose the strictest limits."
   },
   {
    "level": 3,
    "question": "A linear function $f(x) = kx + m$ has the domain $2 \\leq x \\leq 6$ and the range $-1 \\leq y \\leq 7$.<br>a) Find $f(x)$ if the function is decreasing.<br>b) How many linear functions have this domain and range? Justify your answer.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -2,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 11,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 2,
      "unit": "",
      "etikett": "number"
     }
    ],
    "solution": "**The key insight:** the graph of a linear function is a line segment that rises all the time or falls all the time. Its end points must therefore lie at the ends of the range: the lowest and highest *y* are reached at the ends of the domain.\n\n**a)** A decreasing function has its largest value on the left. So $f(2) = 7$ and $f(6) = -1$, and the graph passes through $(2, 7)$ and $(6, -1)$. The slope is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{-1 - 7}{6 - 2} = \\frac{-8}{4} = -2 $$\n\nWe substitute the point $(2, 7)$ into $f(x) = -2x + m$:\n\n$$ 7 = -2 \\cdot 2 + m $$\n\n$$ 7 = -4 + m $$\n\n$$ 7 \\mathbin{\\boldsymbol{+}} \\boldsymbol{4} = -4 + m \\mathbin{\\boldsymbol{+}} \\boldsymbol{4} $$\n\n$$ 11 = m $$\n\nCheck: $f(6) = -2 \\cdot 6 + 11 = -12 + 11 = -1$.\n\n**Answer:** $f(x) = -2x + 11$\n\n**b)** The function can also be increasing. Then $f(2) = -1$ and $f(6) = 7$:\n\n$$ k = \\frac{7 - (-1)}{6 - 2} = \\frac{8}{4} = 2 $$\n\nand $-1 = 2 \\cdot 2 + m$ gives $m = -5$. Check: $f(6) = 2 \\cdot 6 - 5 = 7$.\n\nThere are no more linear functions. If $k = 0$ the function has only a single value, and otherwise the *y*-values of the end points are locked to $-1$ and $7$ in some order. Two points determine a line, so each order gives exactly one function.\n\n**Answer:** 2 functions, $f(x) = -2x + 11$ and $f(x) = 2x - 5$\n\n**General conclusion:** for a linear function it is enough to calculate the function values at the end points of the domain to get the range. Conversely, the domain and range together determine the line almost completely: only the direction remains to be chosen."
   },
   {
    "level": 3,
    "question": "The function $f(x) = x^2 - 4x + 1$ has the domain $0 \\leq x < 5$. Noah calculates $f(0) = 1$ and $f(5) = 6$ and writes that the range is $1 \\leq y < 6$.<br>a) Calculate $f(1)$, $f(2)$ and $f(3)$, and explain what Noah has missed.<br>b) Find the correct range.",
    "answer": {
     "value": -3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": -2,
      "unit": "",
      "etikett": "$f(1) =$"
     },
     {
      "del": "a",
      "value": -3,
      "unit": "",
      "etikett": "$f(2) =$"
     },
     {
      "del": "a",
      "value": -2,
      "unit": "",
      "etikett": "$f(3) =$"
     },
     {
      "del": "b",
      "value": -3,
      "unit": "",
      "etikett": "smallest value"
     },
     {
      "del": "b",
      "value": 6,
      "unit": "",
      "etikett": "upper limit (not included)"
     }
    ],
    "solution": "**The key insight:** the end points are only enough when the graph rises all the time or falls all the time. Here the graph is a parabola, and it can have a lowest point inside the interval.\n\n**a)**\n\n$$ f(1) = 1^2 - 4 \\cdot 1 + 1 = 1 - 4 + 1 = -2 $$\n\n$$ f(2) = 2^2 - 4 \\cdot 2 + 1 = 4 - 8 + 1 = -3 $$\n\n$$ f(3) = 3^2 - 4 \\cdot 3 + 1 = 9 - 12 + 1 = -2 $$\n\nThe function takes negative values, lower than both $f(0)$ and $f(5)$. So the graph first falls and then rises.\n\n**Answer:** $f(1) = -2$, $f(2) = -3$ and $f(3) = -2$. Noah has missed that the graph goes below the values at the end points inside the interval.\n\n**b)** That $f(1) = f(3)$ suggests that the parabola is symmetrical about $x = 2$, with the lowest point $(2, -3)$. This can be shown by rewriting the function. We multiply out:\n\n$$ (x - 2)(x - 2) - 3 = x^2 - 2x - 2x + 4 - 3 = x^2 - 4x + 1 $$\n\nSo $f(x) = (x - 2)^2 - 3$. A square is never negative, so $f(x) \\geq -3$, with equality when $x = 2$. That value is included, since $x = 2$ is included in the domain.\n\nThe largest value: the graph rises from $(2, -3)$ towards $x = 5$, but $x = 5$ is not included. The value 6 is therefore never reached, but all values just below 6 are reached. To the left of the vertex the function is at most $f(0) = 1$, which is less than 6.\n\nCheck with a value close to the limit: $f(4.9) = 4.9^2 - 4 \\cdot 4.9 + 1 = 24.01 - 19.6 + 1 = 5.41$, that is, below 6.\n\n**Answer:** $-3 \\leq y < 6$\n\n**General conclusion:** find the range from the whole graph, that is, the lowest and the highest point actually reached, and not only from the end points."
   },
   {
    "level": 3,
    "question": "In a car park the first two hours are free. After that it costs $15\\ \\mathrm{kr}$ per started hour, and you may park for at most 8 hours. The cost is $K(x)$ kr when the car is parked for $x$ hours, where $0 < x \\leq 8$.<br>a) Calculate $K(2.5)$ and $K(3)$.<br>b) Find the range of the function.<br>c) Explain why the range cannot be written $0 \\leq y \\leq 90$.",
    "answer": {
     "value": 90,
     "unit": "kr"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 15,
      "unit": "kr",
      "etikett": "$K(2.5) =$"
     },
     {
      "del": "a",
      "value": 15,
      "unit": "kr",
      "etikett": "$K(3) =$"
     },
     {
      "del": "b",
      "values": [
       0,
       15,
       30,
       45,
       60,
       75,
       90
      ],
      "unit": "kr",
      "etikett": "possible costs"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the price changes in jumps, not gradually. The graph becomes a staircase, and then the range consists of a number of separate values instead of a whole interval.\n\n**a)** After 2.5 hours the car has been parked half an hour longer than the free hours. A started hour costs 15 kr. After exactly 3 hours there is still only one started hour beyond the two free ones.\n\n**Answer:** $K(2.5) = 15$ and $K(3) = 15$\n\n**b)** The number of started paid hours can be 0, 1, 2, 3, 4, 5 or 6, since at most $8 - 2 = 6$ hours lie beyond the free ones. The cost is 15 kr times that number. The largest value is\n\n$$ 6 \\cdot 15 = 90 $$\n\nCheck: $K(8) = 90$, since 8 hours give 6 paid hours. $K(7.5) = 90$ too, since the sixth paid hour has already started.\n\n**Answer:** The range consists of the numbers 0, 15, 30, 45, 60, 75 and 90 (kr).\n\n**c)** The notation $0 \\leq y \\leq 90$ means that *all* numbers between 0 and 90 are possible costs. But no parking costs, for example, 20 kr or 50 kr. The graph jumps from 0 to 15, from 15 to 30 and so on.\n\n**Answer:** The cost can only be a multiple of 15 kr. Values in between, such as 20 kr, are never taken, so the range is not an interval.\n\n**General conclusion:** a range does not have to be a continuous interval. When a price is charged per started unit, the function only takes certain definite values."
   },
   {
    "level": 3,
    "question": "The concentration of a medicine in the blood is $C(t)$ mg/l after $t$ hours, where $C(t) = 12 \\cdot 0.82^t$. The model applies from when the dose is taken until the concentration has fallen to $2\\ \\mathrm{mg/l}$. Then the next dose is taken.<br>a) Find the domain of the model. Round to one decimal place.<br>b) Find the range of the model.<br>c) What does the number 0.82 mean in the model?",
    "answer": {
     "value": 9,
     "unit": "h",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 9,
      "unit": "h",
      "tol": 0.01,
      "etikett": "$0 \\leq t \\leq$"
     },
     {
      "del": "b",
      "value": 2,
      "unit": "mg/l",
      "etikett": "smallest value"
     },
     {
      "del": "b",
      "value": 12,
      "unit": "mg/l",
      "etikett": "largest value"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the domain does not end at a given time on the clock, but where the function value reaches 2. The limit for $t$ is therefore obtained by solving an equation.\n\n**a)** The model starts at $t = 0$ and ends when\n\n$$ 12 \\cdot 0.82^t = 2 $$\n\nThe equation is solved graphically. In GeoGebra we type `y = 12*0.82^x` and `y = 2`, and the point of intersection lies at $x = 9.02\\ldots$\n\nCheck: $C(9) = 12 \\cdot 0.82^9 \\approx 2.01$, that is, just above 2, and $C(9.1) = 12 \\cdot 0.82^{9.1} \\approx 1.97$, just below 2. The limit lies between 9.0 and 9.1, close to 9.0.\n\n**Answer:** $0 \\leq t \\leq 9.0$\n\n**b)** The concentration decreases all the time, since the change factor is less than 1. The largest value is the starting value and the smallest value is 2:\n\n$$ C(0) = 12 \\cdot 0.82^0 = 12 \\cdot 1 = 12 $$\n\n**Answer:** $2 \\leq C(t) \\leq 12$\n\n**c)** Every hour the concentration is multiplied by 0.82. The change factor $0.82 = 1 - 0.18$ corresponds to a decrease of $18\\ \\%$ per hour.\n\n**Answer:** The concentration decreases by 18 % every hour.\n\n**General conclusion:** when a model applies \"until something happens\", the limit of the domain is determined by an equation. For a function that decreases all the time, the range gets its limits at the end points of the domain."
   },
   {
    "level": 3,
    "question": "The function $f(x) = 5 - 2x$ has the domain $a \\leq x \\leq a + 4$, where $a$ is a constant.<br>a) Show that the range is an interval of length 8, whatever the value of $a$.<br>b) Find $a$ so that the range is $-7 \\leq y \\leq 1$.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 2,
      "unit": "",
      "etikett": "$a =$"
     }
    ],
    "solution": "**The key insight:** $k = -2$, so the function is decreasing. The largest value lies at the left end of the domain and the smallest at the right end. The range can therefore be written with $a$ as an unknown.\n\n**a)** The largest value, at $x = a$:\n\n$$ f(a) = 5 - 2a $$\n\nThe smallest value, at $x = a + 4$:\n\n$$ f(a + 4) = 5 - 2(a + 4) = 5 - 2a - 8 = -3 - 2a $$\n\nThe range is $-3 - 2a \\leq y \\leq 5 - 2a$. Its length is the largest minus the smallest value:\n\n$$ (5 - 2a) - (-3 - 2a) = 5 - 2a + 3 + 2a = 8 $$\n\nThe terms with $a$ cancel each other out, so the length is 8 for all $a$. It is the size of the slope times the length of the domain: $2 \\cdot 4 = 8$.\n\n**b)** The largest value must be 1:\n\n$$ 5 - 2a = 1 $$\n\n$$ 5 - 2a \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} = 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{5} $$\n\n$$ -2a = -4 $$\n\n$$ \\frac{-2a}{\\boldsymbol{-2}} = \\frac{-4}{\\boldsymbol{-2}} $$\n\n$$ a = 2 $$\n\nCheck of the smallest value: $-3 - 2 \\cdot 2 = -7$. It agrees. That was also to be expected, since the interval from $-7$ to $1$ has the length 8, just as a requires. A desired range of any other length would not have been possible.\n\n**Answer:** $a = 2$, when the domain is $2 \\leq x \\leq 6$.\n\n**General conclusion:** for a linear function the length of the range is the size of the slope times the length of the domain. Moving the domain sideways moves the range, but does not change its length."
   },
   {
    "level": 3,
    "question": "Give the largest possible domain and the range of the function for<br>a)&nbsp;$f(x) = \\sqrt{6 - 2x}$&emsp;&emsp;b)&nbsp;$g(x) = \\dfrac{12}{x - 3}$",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3,
      "unit": "",
      "etikett": "domain $x \\leq$"
     },
     {
      "del": "a",
      "value": 0,
      "unit": "",
      "etikett": "range $y \\geq$"
     },
     {
      "del": "b",
      "value": 3,
      "unit": "",
      "etikett": "domain $x \\neq$"
     },
     {
      "del": "b",
      "value": 0,
      "unit": "",
      "etikett": "range $y \\neq$"
     }
    ],
    "solution": "**The key insight:** when no context sets limits, mathematics itself does. There are two things that cannot be done: taking the square root of a negative number and dividing by zero.\n\n**a)** What is under the root sign must not be negative:\n\n$$ 6 - 2x \\geq 0 $$\n\n$$ 6 - 2x \\mathbin{\\boldsymbol{+}} \\boldsymbol{2x} \\geq 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{2x} $$\n\n$$ 6 \\geq 2x $$\n\n$$ \\frac{6}{\\boldsymbol{2}} \\geq \\frac{2x}{\\boldsymbol{2}} $$\n\n$$ 3 \\geq x $$\n\nA square root is never negative, so $f(x) \\geq 0$. The value 0 is reached at $x = 3$, and every larger value is reached too. For example, $x = -5$ gives the value $f(-5) = \\sqrt{6 + 10} = \\sqrt{16} = 4$. The further to the left, the larger the function value becomes.\n\n**Answer:** Domain $x \\leq 3$ and range $y \\geq 0$\n\n**b)** The denominator must not be 0, and $x - 3 = 0$ when $x = 3$. All other *x* are fine.\n\nThe range: a quotient is zero only if the numerator is zero, and the numerator is always 12. Therefore $g(x)$ is never 0. All other values are reached: if we want the value $y$, then $x - 3 = \\dfrac{12}{y}$, that is $x = 3 + \\dfrac{12}{y}$, and that works for every $y$ except 0.\n\nCheck with $y = -4$: the formula gives $x = 3 + \\dfrac{12}{-4} = 3 - 3 = 0$, and indeed $g(0) = \\dfrac{12}{0 - 3} = -4$.\n\n**Answer:** Domain: all $x$ except $x = 3$. Range: all $y$ except $y = 0$.\n\n**General conclusion:** the largest possible domain is obtained by excluding the *x* that give division by zero or the square root of a negative number. The range requires its own reasoning about which values the function can take."
   }
  ]
 },
 "ma1c-4.11": {
  "kalla": "333c5b2c0f",
  "data": [
   {
    "level": 1,
    "question": "What characterises an exponential function?",
    "choices": [
     "The independent variable is in the exponent",
     "The independent variable is in the denominator",
     "The graph is a straight line",
     "The function has no constant"
    ],
    "correct": 0,
    "solution": "In an exponential function, for example $y = 25\\ 000 \\cdot 1.02^x$, the variable $x$ is in the **exponent**. (Compare power functions, where the variable is the base.)\n\n**Answer:** The independent variable is in the exponent."
   },
   {
    "level": 1,
    "question": "A capital of 8 000 kr grows by 3 % per year. Which function describes the capital $K$ kr after $x$ years?",
    "choices": [
     "$K(x) = 8\\ 000 \\cdot 1.03^x$",
     "$K(x) = 8\\ 000 \\cdot 0.03^x$",
     "$K(x) = 8\\ 000 + 1.03x$",
     "$K(x) = 1.03 \\cdot 8\\ 000^x$"
    ],
    "correct": 0,
    "solution": "According to $y = Ca^x$: the original value $C = 8\\ 000$ and the change factor $a = 1 + 0.03 = 1.03$:\n\n$$ K(x) = 8\\ 000 \\cdot 1.03^x $$\n\n**Answer:** $K(x) = 8\\ 000 \\cdot 1.03^x$"
   },
   {
    "level": 1,
    "question": "In the function $y = Ca^x$, what does $C$ stand for?",
    "choices": [
     "The change factor",
     "The time",
     "The original value",
     "The value after a certain time"
    ],
    "correct": 2,
    "solution": "$C$ is the original value (the starting value), $a$ is the change factor, $x$ is the time and $y$ is the value after a certain time.\n\n**Answer:** The original value"
   },
   {
    "level": 2,
    "question": "The number of bacteria in a culture is given by $N(t) = 500 \\cdot 1.12^t$ where $t$ is the time in hours. What does the function describe?",
    "choices": [
     "112 bacteria at the start that increase by 500 % per hour",
     "500 bacteria at the start that increase by 12 % per hour",
     "500 bacteria at the start that increase by 1.12 % per hour",
     "500 bacteria that decrease by 12 % per hour"
    ],
    "correct": 1,
    "solution": "Compare with $y = Ca^x$: $C = 500$ (the original number) and $a = 1.12$, which corresponds to $100\\ \\% + 12\\ \\% $, an increase of 12 % per hour.\n\n**Answer:** 500 bacteria at the start, an increase of 12 % per hour."
   },
   {
    "level": 2,
    "question": "A machine is bought for 240 000 kr and loses 20 % of its value every year. What is the machine worth after 5 years? Round to the nearest thousand kronor.",
    "answer": {
     "value": 78643,
     "unit": "kr",
     "tol": 0.02
    },
    "solution": "The change factor is $1 - 0.20 = 0.80$ and the function is $V(t) = 240\\ 000 \\cdot 0.80^t$:\n\n$$ V(5) = 240\\ 000 \\cdot 0.80^5 = 240\\ 000 \\cdot 0.32768 = 78\\ 643.2 \\approx 78\\ 600\\ \\mathrm{kr} $$\n\n**Answer:** About 78 600 kr"
   },
   {
    "level": 3,
    "question": "The graph shows part of the function $y = C \\cdot a^x$. The part of the graph closest to the *y*-axis has been cut off.<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"160.0\" y1=\"30\" x2=\"160.0\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"360.0\" y1=\"30\" x2=\"360.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"271.4\" x2=\"460\" y2=\"271.4\"/><line x1=\"60\" y1=\"252.9\" x2=\"460\" y2=\"252.9\"/><line x1=\"60\" y1=\"234.3\" x2=\"460\" y2=\"234.3\"/><line x1=\"60\" y1=\"215.7\" x2=\"460\" y2=\"215.7\"/><line x1=\"60\" y1=\"197.1\" x2=\"460\" y2=\"197.1\"/><line x1=\"60\" y1=\"178.6\" x2=\"460\" y2=\"178.6\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"141.4\" x2=\"460\" y2=\"141.4\"/><line x1=\"60\" y1=\"122.9\" x2=\"460\" y2=\"122.9\"/><line x1=\"60\" y1=\"104.3\" x2=\"460\" y2=\"104.3\"/><line x1=\"60\" y1=\"85.7\" x2=\"460\" y2=\"85.7\"/><line x1=\"60\" y1=\"67.1\" x2=\"460\" y2=\"67.1\"/><line x1=\"60\" y1=\"48.6\" x2=\"460\" y2=\"48.6\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">x</tspan></text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">y</tspan></text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"160.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"360.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"276.4\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"257.9\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"239.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"220.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"202.1\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"183.6\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"53\" y=\"146.4\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"127.9\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">9</text><text x=\"53\" y=\"109.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"90.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">11</text><text x=\"53\" y=\"72.1\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"53\" y=\"53.6\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">13</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">14</text></g><path d=\"M 160.0 234.3 L 165.0 232.3 L 170.0 230.3 L 175.0 228.2 L 180.0 226.0 L 185.0 223.7 L 190.0 221.4 L 195.0 219.0 L 200.0 216.5 L 205.0 213.9 L 210.0 211.2 L 215.0 208.4 L 220.0 205.6 L 225.0 202.6 L 230.0 199.5 L 235.0 196.3 L 240.0 193.0 L 245.0 189.6 L 250.0 186.0 L 255.0 182.4 L 260.0 178.6 L 265.0 174.6 L 270.0 170.6 L 275.0 166.4 L 280.0 162.0 L 285.0 157.5 L 290.0 152.8 L 295.0 148.0 L 300.0 143.0 L 305.0 137.8 L 310.0 132.4 L 315.0 126.9 L 320.0 121.1 L 325.0 115.1 L 330.0 109.0 L 335.0 102.6 L 340.0 96.0 L 345.0 89.1 L 350.0 82.1 L 355.0 74.7 L 360.0 67.1 L 365.0 59.3 L 370.0 51.1 L 375.0 42.7 L 380.0 34.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg><br>a) Find $C$ and $a$.<br>b) Without a calculator, find for which value of $x$ $y = 96$.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.5,
      "unit": "",
      "etikett": "$C =$"
     },
     {
      "del": "a",
      "value": 2,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b",
      "value": 6,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** the crossing with the *y*-axis is not visible, so $C$ cannot be read off directly. But two points that can be read off are enough: when $x$ increases by 1, $y$ is multiplied by $a$, and then you can calculate backwards to $x = 0$.\n\n**a)** The graph passes through the points $(1, 3)$, $(2, 6)$ and $(3, 12)$. When $x$ increases by 1, $y$ doubles:\n\n$$ \\frac{6}{3} = 2 \\qquad \\frac{12}{6} = 2 $$\n\nSo the change factor is $a = 2$. Substituting the point $(1, 3)$ into $y = C \\cdot 2^x$ gives\n\n$$ C \\cdot 2^1 = 3 $$\n\nDivide both sides by 2:\n\n$$ \\frac{2C}{\\boldsymbol{2}} = \\frac{3}{\\boldsymbol{2}} $$\n\n$$ C = 1.5 $$\n\nCheck with the third point: $1.5 \\cdot 2^3 = 1.5 \\cdot 8 = 12$. It agrees.\n\n**Answer:** $C = 1.5$ and $a = 2$, that is $y = 1.5 \\cdot 2^x$\n\n**b)** Set the function equal to 96:\n\n$$ 1.5 \\cdot 2^x = 96 $$\n\nDivide both sides by 1.5:\n\n$$ \\frac{1.5 \\cdot 2^x}{\\boldsymbol{1.5}} = \\frac{96}{\\boldsymbol{1.5}} $$\n\n$$ 2^x = 64 $$\n\nSince $2^6 = 64$, $x = 6$.\n\nCheck: $1.5 \\cdot 2^6 = 1.5 \\cdot 64 = 96$. It agrees.\n\n**Answer:** $x = 6$\n\n**General conclusion:** in an exponential function, equal steps in the *x*-direction give the same factor in the *y*-direction. The ratio between two *y*-values gives $a$, and then any point gives $C$, even when the graph's crossing with the *y*-axis is not visible."
   },
   {
    "level": 3,
    "question": "In a nature reserve 50 beavers were counted in 2020 and 72 beavers in 2022. Let $x$ be the number of years after 2020.<br>a) Set up a linear model $f(x) = kx + m$ and an exponential model $g(x) = C \\cdot a^x$ that both agree with the two counts.<br>b) In 2025, 124 beavers were counted. Which of the models agrees best with that count?<br>c) Use the model that agrees best and calculate the number of beavers in 2030. Is the forecast reasonable?",
    "answer": {
     "value": 310,
     "unit": "beavers",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 11,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "a",
      "value": 50,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "a",
      "value": 50,
      "unit": "",
      "etikett": "$C =$"
     },
     {
      "del": "a",
      "value": 1.2,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 310,
      "unit": "beavers",
      "tol": 0.01
     }
    ],
    "solution": "**The key insight:** two measured values are enough to determine both a linear and an exponential model, and the two models agree equally well with them. Only a third measurement can decide which model describes the development. A linear model increases by the same number of beavers per year, an exponential one by the same percentage per year.\n\n**a)** In 2020, $x = 0$, so both models start at 50: $m = 50$ and $C = 50$.\n\nLinear model: slope = change in number divided by change in time,\n\n$$ k = \\frac{\\Delta y}{\\Delta x} = \\frac{72 - 50}{2 - 0} = \\frac{22}{2} = 11 $$\n\nExponential model: the point $(2, 72)$ substituted into $g(x) = 50 \\cdot a^x$ gives\n\n$$ 50 \\cdot a^2 = 72 $$\n\nDivide both sides by 50:\n\n$$ \\frac{50 \\cdot a^2}{\\boldsymbol{50}} = \\frac{72}{\\boldsymbol{50}} $$\n\n$$ a^2 = 1.44 $$\n\n$$ a = \\pm\\sqrt{1.44} = \\pm 1.2 $$\n\nA change factor is positive, so $a = 1.2$.\n\n**Answer:** $f(x) = 11x + 50$ and $g(x) = 50 \\cdot 1.2^x$\n\n**b)** In 2025, $x = 5$:\n\n$$ f(5) = 11 \\cdot 5 + 50 = 105 $$\n\n$$ g(5) = 50 \\cdot 1.2^5 = 124.416 $$\n\nThe exponential model gives 124 beavers, exactly as the count. The linear one gives 19 too few.\n\n**Answer:** The exponential model $g(x) = 50 \\cdot 1.2^x$ agrees best\n\n**c)** In 2030, $x = 10$:\n\n$$ g(10) = 50 \\cdot 1.2^{10} = 309.586\\ldots \\approx 310 $$\n\nIs it reasonable? Mathematically the model keeps increasing by $20\\ \\%$ per year for ever. A reserve has limited food and space, so sooner or later the increase must slow down. For a few years ahead the forecast may be reasonable, but it should be interpreted with caution.\n\n**Answer:** About 310 beavers. The forecast assumes that the increase continues at $20\\ \\%$ per year, which cannot go on in the long run in a limited area.\n\n**General conclusion:** two points determine several different models. It is new measured values that decide which model agrees, and even a model that agrees well can become unreasonable if it is used far outside the measurements."
   },
   {
    "level": 3,
    "question": "For the exponential function $f(x) = C \\cdot a^x$, where $C > 0$ and $a > 0$, $f(3) = 20$ and $f(5) = 45$. Solve the task without a calculator.<br>a) Find $f(4)$.<br>b) Find $f(7)$.",
    "answer": {
     "value": 101.25,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 30,
      "unit": "",
      "etikett": "$f(4) =$"
     },
     {
      "del": "b",
      "value": 101.25,
      "unit": "",
      "etikett": "$f(7) =$"
     }
    ],
    "solution": "**The key insight:** you never need to find $C$. Every time $x$ increases by 1, the function value is multiplied by $a$. From $x = 3$ to $x = 5$ there are two steps, so the value is multiplied by $a \\cdot a = a^2$.\n\n$$ f(5) = f(3) \\cdot a^2 $$\n\n$$ 20 \\cdot a^2 = 45 $$\n\nDivide both sides by 20:\n\n$$ \\frac{20 \\cdot a^2}{\\boldsymbol{20}} = \\frac{45}{\\boldsymbol{20}} $$\n\n$$ a^2 = \\frac{9}{4} $$\n\n$$ a = \\pm\\sqrt{\\frac{9}{4}} = \\pm\\frac{3}{2} $$\n\nThe change factor must be positive, so $a = \\dfrac{3}{2} = 1.5$. (With $a = -1.5$, $a^x$ could not even be calculated for, for example, $x = 0.5$.)\n\n**a)** From $x = 3$ to $x = 4$ is one step:\n\n$$ f(4) = f(3) \\cdot a = 20 \\cdot \\frac{3}{2} = 30 $$\n\nCheck: one more step should give $f(5)$, and $30 \\cdot \\dfrac{3}{2} = 45$. It agrees.\n\n**Answer:** $f(4) = 30$\n\n**b)** From $x = 5$ to $x = 7$ is two more steps:\n\n$$ f(7) = f(5) \\cdot a^2 = 45 \\cdot \\frac{9}{4} = \\frac{405}{4} = 101.25 $$\n\n**Answer:** $f(7) = 101.25$\n\n**General conclusion:** in an exponential function the values at evenly spaced *x* form a chain where each value is the previous one times the same factor. The value halfway between two others is therefore not their mean but $\\sqrt{20 \\cdot 45} = \\sqrt{900} = 30$. The mean, 32.5, would have suited a linear function."
   },
   {
    "level": 3,
    "question": "Moa simplifies the function expression $y = 2 \\cdot 3^x$ like this:\n\n$$ 2 \\cdot 3^x = (2 \\cdot 3)^x = 6^x $$\n\na) Show with an example that the rewriting is wrong, and explain what Moa does wrong.<br>b) For which value of $x$ is it still true that $2 \\cdot 3^x = 6^x$?<br>c) For which values of $x$ is $2 \\cdot 3^x$ greater than $6^x$?",
    "answer": {
     "value": 1,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 1,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the exponent in $2 \\cdot 3^x$ belongs only to 3. The order of operations says that the power is calculated before the multiplication, so 2 is never raised to the power. In $(2 \\cdot 3)^x$, on the other hand, both factors are raised to the power, since the law of exponents gives $(2 \\cdot 3)^x = 2^x \\cdot 3^x$.\n\n**a)** Try $x = 2$:\n\n$$ 2 \\cdot 3^2 = 2 \\cdot 9 = 18 \\qquad 6^2 = 36 $$\n\nThe expressions are different, so the rewriting is wrong. Moa has moved 2 into the bracket and thereby also raised 2 to the power $x$.\n\n**Answer:** For $x = 2$, $2 \\cdot 3^x = 18$ but $6^x = 36$. Moa raises the whole product to the power, although the exponent only belongs to 3.\n\n**b)** Rewrite the right-hand side with the law of exponents, $6^x = (2 \\cdot 3)^x = 2^x \\cdot 3^x$:\n\n$$ 2 \\cdot 3^x = 2^x \\cdot 3^x $$\n\nDivide both sides by $3^x$ (which is never 0):\n\n$$ \\frac{2 \\cdot 3^x}{\\boldsymbol{3^x}} = \\frac{2^x \\cdot 3^x}{\\boldsymbol{3^x}} $$\n\n$$ 2 = 2^x $$\n\nSince $2^1 = 2$, $x = 1$.\n\nCheck: $2 \\cdot 3^1 = 6$ and $6^1 = 6$. It agrees.\n\n**Answer:** $x = 1$\n\n**c)** The same division as in b) shows that $2 \\cdot 3^x > 6^x$ is the same thing as $2 > 2^x$. The function $2^x$ is increasing and equals 2 when $x = 1$, so it is less than 2 for all $x < 1$.\n\nCheck with $x = 0$: $2 \\cdot 3^0 = 2$ and $6^0 = 1$, and $2 > 1$.\n\n**Answer:** For all $x < 1$\n\n**General conclusion:** $C \\cdot a^x$ and $(C \\cdot a)^x$ are different functions. The first has the starting value $C$ and the change factor $a$, the second has the starting value 1 and the change factor $C \\cdot a$. They give the same value only when $x = 1$."
   },
   {
    "level": 3,
    "question": "The temperature $T$ °C of a cup of coffee $t$ minutes after it was poured is described by the model $T(t) = 20 + 70 \\cdot 0.9^t$.<br>a) What do the numbers 20, 70 and 0.9 mean in the model?<br>b) Give the range of $T(t)$ when $t \\geq 0$.<br>c) How long does it take before the coffee has cooled to 50 °C? Round to whole minutes.",
    "answer": {
     "value": 8,
     "unit": "min",
     "tol": 0.05
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 8,
      "unit": "min",
      "tol": 0.05
     }
    ],
    "solution": "**The key insight:** it is not the temperature that decreases exponentially but the difference between the temperature of the coffee and of the room. The term $70 \\cdot 0.9^t$ is an exponential function with $C = 70$ and $a = 0.9$, and it is added on top of a constant level of 20.\n\n**a)** When $t = 0$, $0.9^0 = 1$, so the starting temperature is\n\n$$ T(0) = 20 + 70 \\cdot 1 = 90 $$\n\nSo the coffee is 90 °C at the start. The term $70 \\cdot 0.9^t$ approaches 0 as time passes, so the temperature approaches 20 °C, the temperature of the room.\n\n**Answer:** 20 is the temperature of the room (in °C), which the coffee approaches. 70 is how many degrees warmer than the room the coffee is at the start. 0.9 is the change factor: the difference from the room temperature decreases by $10\\ \\%$ per minute.\n\n**b)** The factor $0.9 < 1$, so $0.9^t$ decreases all the time. The largest value is $T(0) = 90$. However large $t$ becomes, $0.9^t$ is positive, so $T(t)$ is always greater than 20 but gets closer and closer.\n\n**Answer:** $20 < T \\leq 90$\n\n**c)** Set the model equal to 50:\n\n$$ 20 + 70 \\cdot 0.9^t = 50 $$\n\nSubtract 20 from both sides:\n\n$$ 20 + 70 \\cdot 0.9^t \\mathbin{\\boldsymbol{-}} \\boldsymbol{20} = 50 \\mathbin{\\boldsymbol{-}} \\boldsymbol{20} $$\n\n$$ 70 \\cdot 0.9^t = 30 $$\n\nDivide both sides by 70:\n\n$$ \\frac{70 \\cdot 0.9^t}{\\boldsymbol{70}} = \\frac{30}{\\boldsymbol{70}} $$\n\n$$ 0.9^t = 0.428\\,57\\ldots $$\n\nThe exponent is unknown. Trying values gives $0.9^8 = 0.430\\,4\\ldots$ and $0.9^9 = 0.387\\,4\\ldots$, so the solution lies just above 8. With digital tools (intersection between $y = 20 + 70 \\cdot 0.9^x$ and $y = 50$) we get $t = 8.04\\ldots$\n\nCheck: $T(8) = 20 + 70 \\cdot 0.9^8 = 50.13\\ldots$, that is, almost exactly 50 °C.\n\nIs it reasonable? The coffee has cooled 40 degrees of the 70 degrees it can cool, that is, more than half of the way. Half of the way takes just over 6 minutes, since $0.9^6 \\approx 0.53$, so just over 8 minutes is reasonable.\n\n**Answer:** After about 8 minutes\n\n**General conclusion:** an exponential function can describe how something approaches an equilibrium level. The constant gives the level, $C$ gives the distance to the level at the start and $a$ how fast the distance shrinks."
   },
   {
    "level": 3,
    "question": "Town A has $12\\,000$ inhabitants and the population decreases by $2\\ \\%$ per year. Town B has $8\\,000$ inhabitants and the population increases by $3\\ \\%$ per year.<br>a) Write a function for the population of each town after $x$ years.<br>b) After how long do the towns have the same number of inhabitants? Answer to one decimal place.<br>c) What yearly percentage increase would town B have needed for the towns to have the same number of inhabitants already after 5 years? Answer to one decimal place.",
    "answer": {
     "value": 6.3,
     "unit": "%",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 8.1,
      "unit": "years",
      "tol": 0.01
     },
     {
      "del": "c",
      "value": 6.3,
      "unit": "%",
      "tol": 0.01
     }
    ],
    "solution": "**The key insight:** the towns have the same number of inhabitants where the graphs of the two exponential functions cross each other. One graph falls and the other rises, so they cross each other exactly once.\n\n**a)** The starting values are $C = 12\\,000$ and $C = 8\\,000$. A decrease of $2\\ \\%$ gives the change factor $0.98$ and an increase of $3\\ \\%$ gives $1.03$.\n\n**Answer:** $A(x) = 12\\,000 \\cdot 0.98^x$ and $B(x) = 8\\,000 \\cdot 1.03^x$\n\n**b)** We look for $x$ such that\n\n$$ 12\\,000 \\cdot 0.98^x = 8\\,000 \\cdot 1.03^x $$\n\nTrying whole years:\n\n| $x$ (years) | $A(x)$ | $B(x)$ |\n| --- | --- | --- |\n| 8 | $10\\,209$ | $10\\,134$ |\n| 9 | $10\\,005$ | $10\\,438$ |\n\nAfter 8 years A still has the most inhabitants, after 9 years B has overtaken it. With digital tools (intersection between the graphs) the *x*-value of the point of intersection is $8.148\\ldots$, and the population is then about $10\\,200$ in both towns.\n\n**Answer:** After about 8.1 years\n\n**c)** Call B's change factor $a$. After 5 years\n\n$$ 8\\,000 \\cdot a^5 = 12\\,000 \\cdot 0.98^5 $$\n\nThe right-hand side is $12\\,000 \\cdot 0.98^5 = 10\\,847.04\\ldots$. Divide both sides by $8\\,000$:\n\n$$ \\frac{8\\,000 \\cdot a^5}{\\boldsymbol{8\\,000}} = \\frac{10\\,847.04}{\\boldsymbol{8\\,000}} $$\n\n$$ a^5 = 1.355\\,88\\ldots $$\n\n$$ a = \\sqrt[5]{1.355\\,88} = 1.062\\,78\\ldots $$\n\nThe change factor $1.0628$ corresponds to an increase of about $6.3\\ \\%$ per year.\n\nCheck: $8\\,000 \\cdot 1.0628^5 \\approx 10\\,848$, almost exactly as much as town A has after 5 years.\n\nIs it reasonable? With $3\\ \\%$ it took just over 8 years. To make it in 5 years requires a considerably faster increase, but not twice as fast, since town A has less time to decrease at the same time.\n\n**Answer:** About 6.3 % per year\n\n**General conclusion:** when two exponential functions are compared, you look for the intersection between the graphs. It can be narrowed down by trying values and determined accurately with digital tools, and conversely a desired point of intersection can give the change factor that is required."
   },
   {
    "level": 3,
    "question": "The graphs of $f(x) = 3 \\cdot 2^x$ and $g(x) = 12 \\cdot 0.5^x$ cross each other at the point $P$. The point $P$ and the two points where the graphs cross the *y*-axis form a triangle. Find the area of the triangle without a calculator.",
    "answer": {
     "value": 4.5,
     "unit": "area units"
    },
    "solution": "**The key insight:** the two points on the *y*-axis are given directly by the $C$-values, since $a^0 = 1$. The side between them lies along the *y*-axis and can be used as the base. The height is then the distance from $P$ to the *y*-axis, that is, the *x*-coordinate of $P$.\n\n**The points on the *y*-axis:** $f(0) = 3 \\cdot 2^0 = 3$ and $g(0) = 12 \\cdot 0.5^0 = 12$. The base is\n\n$$ 12 - 3 = 9 $$\n\n**The point $P$:** rewrite $0.5$ as a power of 2, $0.5 = 2^{-1}$, so that $0.5^x = 2^{-x}$:\n\n$$ 3 \\cdot 2^x = 12 \\cdot 2^{-x} $$\n\nMultiply both sides by $2^x$; the laws of exponents give $2^x \\cdot 2^x = 2^{2x}$ and $2^{-x} \\cdot 2^x = 2^0 = 1$:\n\n$$ 3 \\cdot 2^x \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{2^x} = 12 \\cdot 2^{-x} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{2^x} $$\n\n$$ 3 \\cdot 2^{2x} = 12 $$\n\nDivide both sides by 3:\n\n$$ \\frac{3 \\cdot 2^{2x}}{\\boldsymbol{3}} = \\frac{12}{\\boldsymbol{3}} $$\n\n$$ 2^{2x} = 4 = 2^2 $$\n\nThe exponents must be equal: $2x = 2$, that is $x = 1$. Then $y = f(1) = 3 \\cdot 2 = 6$, so $P = (1, 6)$.\n\nCheck: $g(1) = 12 \\cdot 0.5 = 6$. It agrees.\n\n**The area:** the height is the distance from $P$ to the *y*-axis, that is, 1. The area of the triangle is base times height divided by 2:\n\n$$ \\frac{9 \\cdot 1}{2} = 4.5 $$\n\n**Answer:** 4.5 area units\n\n**General conclusion:** $0.5^x = 2^{-x}$, so the graph of $g$ is the graph of $y = 12 \\cdot 2^x$ reflected in the *y*-axis. By writing both functions with the same base, the intersection equation becomes an equation between exponents, which can be solved without a calculator."
   }
  ]
 },
 "ma1c-4.12": {
  "kalla": "64c49d9477",
  "data": [
   {
    "level": 1,
    "question": "Which of the following is a power function?",
    "choices": [
     "$f(x) = 5 \\cdot 3^x$",
     "$f(x) = 5x^3$",
     "$f(x) = 5$",
     "$f(x) = 3x + 5$"
    ],
    "correct": 1,
    "solution": "In a power function $f(x) = Cx^a$ the variable is in the **base**: $5x^3$ fits with $C = 5$ and $a = 3$.\n\n$5 \\cdot 3^x$ has the variable in the exponent, so it is an exponential function.\n\n**Answer:** $f(x) = 5x^3$"
   },
   {
    "level": 1,
    "question": "Let $f(x) = x^4$. Calculate $f(3)$.",
    "answer": {
     "value": 81,
     "unit": ""
    },
    "solution": "Substitute $x = 3$:\n\n$$ f(3) = 3^4 = 81 $$\n\n**Answer:** 81"
   },
   {
    "level": 1,
    "question": "What distinguishes the power function $f(x) = Cx^a$ from the exponential function $f(x) = Ca^x$?",
    "choices": [
     "In the power function the variable is the base; in the exponential function it is the exponent",
     "Power functions have no constants",
     "Exponential functions can only increase",
     "No difference, they are the same thing"
    ],
    "correct": 0,
    "solution": "The difference lies in where the variable is: $x^a$ (the base, a power function) compared with $a^x$ (the exponent, an exponential function). The graphs behave completely differently.\n\n**Answer:** The variable is the base in the power function and the exponent in the exponential function."
   },
   {
    "level": 2,
    "question": "Let $f(x) = x^6$. Solve the equation $f(x) = 40$. Give the positive solution to two decimal places.",
    "answer": {
     "value": 1.85,
     "unit": "",
     "tol": 0.01
    },
    "solution": "Set the function expression equal to 40:\n\n$$ x^6 = 40 $$\n\nAn even exponent gives two solutions:\n\n$$ x = \\pm\\sqrt[6]{40} = \\pm 40^{1/6} = \\pm 1.849\\ldots \\approx \\pm 1.85 $$\n\n**Answer:** $x \\approx \\pm 1.85$"
   },
   {
    "level": 2,
    "question": "Which graph belongs to $y = \\dfrac{1}{x}$?",
    "choices": [
     "A curve that starts at the origin and rises less and less steeply",
     "A parabola with its bottom at the origin",
     "A straight line through the origin",
     "A hyperbola with two branches that approach the axes without touching them"
    ],
    "correct": 3,
    "solution": "$y = x^{-1} = \\dfrac{1}{x}$ gives a hyperbola: one branch in the first quadrant and one in the third. The curve is undefined for $x = 0$ and approaches the axes without reaching them.\n\n(The parabola is $y = x^2$, and the curve from the origin is $y = \\sqrt{x}$.)\n\n**Answer:** A hyperbola with two branches."
   },
   {
    "level": 3,
    "question": "The graph shows part of the power function $f(x) = C \\cdot x^a$ for $x \\geq 2$.<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"100.0\" y1=\"30\" x2=\"100.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"180.0\" y1=\"30\" x2=\"180.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"340.0\" y1=\"30\" x2=\"340.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"420.0\" y1=\"30\" x2=\"420.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"264.0\" x2=\"460\" y2=\"264.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"212.0\" x2=\"460\" y2=\"212.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"108.0\" x2=\"460\" y2=\"108.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"56.0\" x2=\"460\" y2=\"56.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">x</tspan></text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">y</tspan></text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"100.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"180.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"340.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">14</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">16</text><text x=\"420.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">18</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"269.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"217.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"113.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"61.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">9</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text></g><path d=\"M 100.0 69.4 L 102.0 74.7 L 104.0 79.6 L 106.0 84.3 L 108.0 88.6 L 110.0 92.7 L 112.0 96.5 L 114.0 100.1 L 116.0 103.5 L 118.0 106.8 L 120.0 109.9 L 122.0 112.8 L 124.0 115.6 L 126.0 118.2 L 128.0 120.8 L 130.0 123.2 L 132.0 125.6 L 134.0 127.8 L 136.0 129.9 L 138.0 132.0 L 140.0 134.0 L 142.0 135.9 L 144.0 137.8 L 146.0 139.5 L 148.0 141.3 L 150.0 142.9 L 152.0 144.5 L 154.0 146.1 L 156.0 147.6 L 158.0 149.1 L 160.0 150.5 L 162.0 151.8 L 164.0 153.2 L 166.0 154.5 L 168.0 155.7 L 170.0 157.0 L 172.0 158.2 L 174.0 159.3 L 176.0 160.4 L 178.0 161.6 L 180.0 162.6 L 182.0 163.7 L 184.0 164.7 L 186.0 165.7 L 188.0 166.7 L 190.0 167.6 L 192.0 168.6 L 194.0 169.5 L 196.0 170.4 L 198.0 171.2 L 200.0 172.1 L 202.0 172.9 L 204.0 173.7 L 206.0 174.5 L 208.0 175.3 L 210.0 176.1 L 212.0 176.8 L 214.0 177.6 L 216.0 178.3 L 218.0 179.0 L 220.0 179.7 L 222.0 180.4 L 224.0 181.0 L 226.0 181.7 L 228.0 182.3 L 230.0 183.0 L 232.0 183.6 L 234.0 184.2 L 236.0 184.8 L 238.0 185.4 L 240.0 186.0 L 242.0 186.6 L 244.0 187.1 L 246.0 187.7 L 248.0 188.2 L 250.0 188.8 L 252.0 189.3 L 254.0 189.8 L 256.0 190.3 L 258.0 190.8 L 260.0 191.3 L 262.0 191.8 L 264.0 192.3 L 266.0 192.8 L 268.0 193.3 L 270.0 193.7 L 272.0 194.2 L 274.0 194.6 L 276.0 195.1 L 278.0 195.5 L 280.0 195.9 L 282.0 196.4 L 284.0 196.8 L 286.0 197.2 L 288.0 197.6 L 290.0 198.0 L 292.0 198.4 L 294.0 198.8 L 296.0 199.2 L 298.0 199.6 L 300.0 199.9 L 302.0 200.3 L 304.0 200.7 L 306.0 201.0 L 308.0 201.4 L 310.0 201.8 L 312.0 202.1 L 314.0 202.5 L 316.0 202.8 L 318.0 203.1 L 320.0 203.5 L 322.0 203.8 L 324.0 204.1 L 326.0 204.4 L 328.0 204.8 L 330.0 205.1 L 332.0 205.4 L 334.0 205.7 L 336.0 206.0 L 338.0 206.3 L 340.0 206.6 L 342.0 206.9 L 344.0 207.2 L 346.0 207.5 L 348.0 207.8 L 350.0 208.1 L 352.0 208.3 L 354.0 208.6 L 356.0 208.9 L 358.0 209.2 L 360.0 209.4 L 362.0 209.7 L 364.0 210.0 L 366.0 210.2 L 368.0 210.5 L 370.0 210.8 L 372.0 211.0 L 374.0 211.3 L 376.0 211.5 L 378.0 211.8 L 380.0 212.0 L 382.0 212.2 L 384.0 212.5 L 386.0 212.7 L 388.0 213.0 L 390.0 213.2 L 392.0 213.4 L 394.0 213.7 L 396.0 213.9 L 398.0 214.1 L 400.0 214.3 L 402.0 214.6 L 404.0 214.8 L 406.0 215.0 L 408.0 215.2 L 410.0 215.4 L 412.0 215.6 L 414.0 215.8 L 416.0 216.0 L 418.0 216.3 L 420.0 216.5 L 422.0 216.7 L 424.0 216.9 L 426.0 217.1 L 428.0 217.3 L 430.0 217.5 L 432.0 217.7 L 434.0 217.9 L 436.0 218.0 L 438.0 218.2 L 440.0 218.4 L 442.0 218.6 L 444.0 218.8 L 446.0 219.0 L 448.0 219.2 L 450.0 219.3 L 452.0 219.5 L 454.0 219.7 L 456.0 219.9 L 458.0 220.1 L 460.0 220.2\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg><br>a) Find $C$ and $a$ using two points that you read off the graph.<br>b) Solve the equation $f(x) = 0.5$ without a calculator.",
    "answer": {
     "value": 576,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 12,
      "unit": "",
      "etikett": "$C =$"
     },
     {
      "del": "a",
      "value": -0.5,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b",
      "value": 576,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**The key insight:** if you divide two function values by each other, $C$ disappears, and what remains is an equation where only the exponent $a$ is unknown. So choose two points where one *x*-coordinate is a simple multiple of the other.\n\n**a)** The graph passes through $(4, 6)$ and $(16, 3)$:\n\n$$ C \\cdot 4^a = 6 \\qquad C \\cdot 16^a = 3 $$\n\nDivide the second equality by the first. The law of exponents gives $\\dfrac{16^a}{4^a} = \\left(\\dfrac{16}{4}\\right)^a = 4^a$:\n\n$$ \\frac{C \\cdot 16^a}{C \\cdot 4^a} = \\frac{3}{6} $$\n\n$$ 4^a = \\frac{1}{2} $$\n\nThe square root of 4 is 2, so $4^{\\frac{1}{2}} = 2$. A minus sign in the exponent gives the reciprocal, $4^{-\\frac{1}{2}} = \\dfrac{1}{2}$. So $a = -0.5$.\n\nSubstituting into $C \\cdot 4^{-0.5} = 6$, where $4^{-0.5} = \\dfrac{1}{2}$:\n\n$$ \\frac{C}{2} = 6 $$\n\nMultiply both sides by 2:\n\n$$ \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} \\frac{C}{2} = \\boldsymbol{2} \\mathbin{\\boldsymbol{\\cdot}} 6 $$\n\n$$ C = 12 $$\n\nCheck with the other point: $f(16) = 12 \\cdot 16^{-0.5} = \\dfrac{12}{\\sqrt{16}} = \\dfrac{12}{4} = 3$. It agrees.\n\n**Answer:** $C = 12$ and $a = -0.5$, that is $f(x) = 12x^{-0.5} = \\dfrac{12}{\\sqrt{x}}$\n\n**b)** Set the function equal to 0.5:\n\n$$ \\frac{12}{\\sqrt{x}} = 0.5 $$\n\nMultiply both sides by $\\sqrt{x}$:\n\n$$ \\boldsymbol{\\sqrt{x}} \\mathbin{\\boldsymbol{\\cdot}} \\frac{12}{\\sqrt{x}} = 0.5 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{\\sqrt{x}} $$\n\n$$ 12 = 0.5\\sqrt{x} $$\n\nDivide both sides by 0.5:\n\n$$ \\frac{12}{\\boldsymbol{0.5}} = \\frac{0.5\\sqrt{x}}{\\boldsymbol{0.5}} $$\n\n$$ \\sqrt{x} = 24 $$\n\nSquare both sides:\n\n$$ x = 24^2 = 576 $$\n\nCheck: $\\dfrac{12}{\\sqrt{576}} = \\dfrac{12}{24} = 0.5$. It agrees.\n\nIs it reasonable? The graph falls more and more slowly. From 6 to 3 the function value is halved when *x* becomes four times as large, since $4^{-0.5} = \\dfrac{1}{2}$. From 3 to 0.5 the function value is divided by 6, and then *x* must be multiplied by $6^2 = 36$, since $36^{-0.5} = \\dfrac{1}{6}$. That gives $16 \\cdot 36 = 576$.\n\n**Answer:** $x = 576$\n\n**General conclusion:** for a power function, when *x* is multiplied by a number $k$, the function value is multiplied by $k^a$. The ratio between two function values therefore reveals the exponent."
   },
   {
    "level": 3,
    "question": "For fish of a certain species the weight $W$ grams can be described by a power function of the length $L$ cm, $W(L) = C \\cdot L^3$. A fish that is 30 cm long weighs 400 g.<br>a) How much does a fish of the same species that is 45 cm long weigh?<br>b) By how many per cent longer than another fish of the same species must a fish be to weigh twice as much? Round to the nearest whole per cent.",
    "answer": {
     "value": 26,
     "unit": "%",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1350,
      "unit": "g",
      "tol": 0.01
     },
     {
      "del": "b",
      "value": 26,
      "unit": "%",
      "tol": 0.02
     }
    ],
    "solution": "**The key insight:** the constant $C$ is not needed. If you compare two fish, the ratio between the weights equals the ratio between the lengths raised to the power 3, since $C$ cancels:\n\n$$ \\frac{W(L_2)}{W(L_1)} = \\frac{C \\cdot L_2^3}{C \\cdot L_1^3} = \\left(\\frac{L_2}{L_1}\\right)^3 $$\n\n**a)** The length changes by the factor $\\dfrac{45}{30} = 1.5$. The weight then changes by the factor\n\n$$ 1.5^3 = 3.375 $$\n\n$$ 400 \\cdot 3.375 = 1\\,350 $$\n\nCheck with $C$: $C = \\dfrac{400}{30^3} = \\dfrac{400}{27\\,000}$, and $\\dfrac{400}{27\\,000} \\cdot 45^3 = \\dfrac{400 \\cdot 91\\,125}{27\\,000} = 1\\,350$. It agrees.\n\nIs it reasonable? The fish is only $50\\ \\%$ longer, but it is also wider and thicker. All three measurements grow, which is why it weighs more than three times as much.\n\n**Answer:** 1 350 g\n\n**b)** Call the factor the length is to be multiplied by $k$. The weight is to be doubled:\n\n$$ k^3 = 2 $$\n\n$$ k = \\sqrt[3]{2} = 1.259\\,92\\ldots $$\n\nThe factor $1.26$ corresponds to an increase of about $26\\ \\%$.\n\nCheck: $1.26^3 = 2.000\\,376$, that is, almost exactly 2.\n\n**Answer:** About 26 % longer\n\n**General conclusion:** for a power function $f(x) = C \\cdot x^a$, if *x* is multiplied by $k$ the function value is multiplied by $k^a$, independently of $C$ and of where you start. With $a = 3$ a fairly small increase in length is enough for a large increase in weight."
   },
   {
    "level": 3,
    "question": "Let $f(x) = x^4$ and $g(x) = 2^x$.<br>a) Show without a calculator that the graphs of $f$ and $g$ cross each other where $x = 16$.<br>b) Find all positive $x$ where $f(x) = g(x)$. Round to two decimal places where necessary.<br>c) For which positive $x$ is $g(x) > f(x)$?",
    "answer": {
     "value": 16,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "values": [
       1.24,
       16
      ],
      "unit": "",
      "tol": 0.01,
      "etikett": "$x =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** $f$ is a power function with the variable in the base and $g$ an exponential function with the variable in the exponent. For large *x* the exponential function always wins, but on the way there the power function can lie above.\n\n**a)** Write 16 as a power of 2, $16 = 2^4$:\n\n$$ f(16) = 16^4 = \\left(2^4\\right)^4 = 2^{16} $$\n\n$$ g(16) = 2^{16} $$\n\nBoth functions have the value $2^{16}$ when $x = 16$, so the graphs cross each other there.\n\n**Answer:** $f(16) = 16^4 = (2^4)^4 = 2^{16} = g(16)$\n\n**b)** A table shows between which *x* the functions change places:\n\n| $x$ | $f(x) = x^4$ | $g(x) = 2^x$ |\n| --- | --- | --- |\n| 1 | 1 | 2 |\n| 2 | 16 | 4 |\n| 10 | $10\\,000$ | $1\\,024$ |\n| 20 | $160\\,000$ | $1\\,048\\,576$ |\n\nWhen $x = 1$, $g$ is the largest, when $x = 2$, $f$ is the largest. So there is an intersection between 1 and 2. Between $x = 2$ and $x = 16$, $f$ lies above, and after 16, $g$ lies above. With digital tools (intersection between the graphs) the first intersection is $x = 1.2396\\ldots$\n\n**Answer:** $x \\approx 1.24$ and $x = 16$\n\n**c)** According to the table and the intersections, the graph of $g$ lies above the graph of $f$ before the first intersection and after the second.\n\nCheck: $x = 0.5$ gives $f(0.5) = 0.0625$ and $g(0.5) = \\sqrt{2} \\approx 1.41$, and $x = 20$ gives, according to the table, $g(20) > f(20)$.\n\n**Answer:** For $0 < x < 1.24$ and for $x > 16$\n\n**General conclusion:** an exponential function with $a > 1$ eventually grows faster than every power function, because it is multiplied by the same factor for every step, while the percentage increase of the power function gets smaller and smaller. Where the overtaking happens, however, can be far away."
   },
   {
    "level": 3,
    "question": "Elin solves two equations like this:\n\n$$ x^4 = 81 \\quad \\Longrightarrow \\quad x = \\sqrt[4]{81} = 3 $$\n\n$$ x^3 = -8 \\quad \\Longrightarrow \\quad \\text{no solution, the root of a negative number does not exist} $$\n\na) Explain what is wrong in Elin's solutions and give the correct solutions.<br>b) Let $n$ be a positive integer. How many solutions does the equation $x^n = b$ have, depending on whether $n$ is even or odd and whether $b$ is positive, 0 or negative?",
    "answer": {
     "value": -2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "values": [
       3,
       -3
      ],
      "unit": "",
      "etikett": "$x^4 = 81$ gives $x =$"
     },
     {
      "del": "a",
      "value": -2,
      "unit": "",
      "etikett": "$x^3 = -8$ gives $x =$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** the question to ask is not \"which root should I take?\" but \"which numbers raised to the power $n$ give $b$?\". An even exponent makes a negative number positive, an odd exponent keeps the sign.\n\n**a)** The first equation: both $3^4 = 81$ and $(-3)^4 = 81$, since $(-3)^4 = (-3) \\cdot (-3) \\cdot (-3) \\cdot (-3)$ has an even number of minus signs. Elin has missed the negative solution.\n\n$$ x = \\pm\\sqrt[4]{81} = \\pm 3 $$\n\nThe second equation: a negative number raised to the power 3 is negative, so there is a number that works. Since $2^3 = 8$,\n\n$$ (-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8 $$\n\nWhat does not exist is the square root of negative numbers, not the cube root. $\\sqrt[3]{-8} = -2$.\n\n**Answer:** $x^4 = 81$ has the solutions $x = \\pm 3$, and $x^3 = -8$ has the solution $x = -2$\n\n**b)** The graph of $y = x^n$ looks like $y = x^2$ when $n$ is even and like $y = x^3$ when $n$ is odd. The number of solutions is the number of intersections with the horizontal line $y = b$.\n\n- **$n$ even:** the graph never lies below the *x*-axis and is symmetrical about the *y*-axis. If $b > 0$ there are two solutions, $x = \\pm\\sqrt[n]{b}$. If $b = 0$ there is one solution, $x = 0$. If $b < 0$ there is no solution.\n- **$n$ odd:** the graph goes from far down on the left to far up on the right and passes every height once. There is always exactly one solution, $x = \\sqrt[n]{b}$, with the same sign as $b$.\n\nCheck with examples: $x^2 = 9$ gives $\\pm 3$ (two), $x^2 = -9$ has no solution, $x^5 = -32$ gives $-2$ (one).\n\n**Answer:** Even $n$: two solutions if $b > 0$, one solution if $b = 0$ and no solution if $b < 0$. Odd $n$: always exactly one solution.\n\n**General conclusion:** an odd or even exponent decides both the shape of the graph and the number of solutions to the power equation. Sketch the graph and the line $y = b$ to see the answer directly."
   },
   {
    "level": 3,
    "question": "The pulse $P$ beats per minute of mammals at rest can roughly be described by the model $P(m) = 240 \\cdot m^{-0.25}$, where $m$ is the mass of the animal in kg.<br>a) Calculate, according to the model, the pulse of a cat that weighs 4 kg. Round to the nearest ten.<br>b) How heavy is an animal that, according to the model, has the pulse 60 beats per minute? Solve the task without a calculator.<br>c) How does the pulse change according to the model if the mass becomes 16 times as large?",
    "answer": {
     "value": 256,
     "unit": "kg"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 170,
      "unit": "beats/min",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 256,
      "unit": "kg"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The key insight:** the exponent $-0.25$ means \"divide by the fourth root\". Since $m^{0.25} = \\sqrt[4]{m}$, the model is $P(m) = \\dfrac{240}{\\sqrt[4]{m}}$. Fourth roots of 4, 16 and 256 can be worked out in your head.\n\n**a)** The fourth root of 4 is $\\sqrt{2}$, since $\\left(\\sqrt{2}\\right)^4 = 2^2 = 4$:\n\n$$ P(4) = \\frac{240}{\\sqrt[4]{4}} = \\frac{240}{\\sqrt{2}} = 169.7\\ldots \\approx 170 $$\n\n**Answer:** About 170 beats per minute\n\n**b)** Set the model equal to 60:\n\n$$ \\frac{240}{\\sqrt[4]{m}} = 60 $$\n\nMultiply both sides by $\\sqrt[4]{m}$:\n\n$$ \\boldsymbol{\\sqrt[4]{m}} \\mathbin{\\boldsymbol{\\cdot}} \\frac{240}{\\sqrt[4]{m}} = 60 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{\\sqrt[4]{m}} $$\n\n$$ 240 = 60\\sqrt[4]{m} $$\n\nDivide both sides by 60:\n\n$$ \\frac{240}{\\boldsymbol{60}} = \\frac{60\\sqrt[4]{m}}{\\boldsymbol{60}} $$\n\n$$ \\sqrt[4]{m} = 4 $$\n\nRaise both sides to the power 4:\n\n$$ m = 4^4 = 256 $$\n\nCheck: $\\sqrt[4]{256} = 4$, since $4^4 = 256$, and $\\dfrac{240}{4} = 60$. It agrees.\n\n**Answer:** 256 kg\n\n**c)** If the mass is multiplied by 16, the pulse is multiplied by $16^{-0.25}$:\n\n$$ 16^{-0.25} = \\frac{1}{\\sqrt[4]{16}} = \\frac{1}{2} $$\n\nCheck with numbers from a) and b): the mass $4 \\cdot 16 = 64$ kg gives $P(64) = \\dfrac{240}{\\sqrt[4]{64}} = \\dfrac{240}{2\\sqrt{2}} = 84.8\\ldots$, which is half of $169.7\\ldots$.\n\n**Answer:** The pulse is halved\n\n**General conclusion:** a power function with a negative exponent is decreasing for $x > 0$. With $a = -0.25$ the function value is halved every time *x* becomes 16 times as large, wherever you start. That is why small animals have such a high pulse."
   },
   {
    "level": 3,
    "question": "Let $f(x) = 2x^3$ and $g(x) = C \\cdot x^a$, where $C > 0$.<br>a) Find $C$ and $a$ so that $f(g(x)) = 16x^6$ for all $x$.<br>b) Is $g(f(x))$ the same function as $f(g(x))$ with the values you got in a)? Justify your answer.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2,
      "unit": "",
      "etikett": "$C =$"
     },
     {
      "del": "a",
      "value": 2,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** calculate from the inside out, but with the whole function expression instead of a number. Substitute $g(x)$ in every place where $f$ has an $x$. Two expressions $p \\cdot x^q$ are equal for all $x$ only if both the coefficients and the exponents are equal.\n\n**a)** The inner function $g(x) = C \\cdot x^a$ is substituted into $f$:\n\n$$ f(g(x)) = 2 \\cdot \\left(C \\cdot x^a\\right)^3 $$\n\nThe laws of exponents give $\\left(C \\cdot x^a\\right)^3 = C^3 \\cdot \\left(x^a\\right)^3 = C^3 \\cdot x^{3a}$, so\n\n$$ f(g(x)) = 2C^3 \\cdot x^{3a} $$\n\nIt must equal $16x^6$ for all $x$. The exponents must be equal:\n\n$$ 3a = 6 $$\n\nDivide both sides by 3:\n\n$$ \\frac{3a}{\\boldsymbol{3}} = \\frac{6}{\\boldsymbol{3}} $$\n\n$$ a = 2 $$\n\nThe coefficients must be equal:\n\n$$ 2C^3 = 16 $$\n\nDivide both sides by 2:\n\n$$ \\frac{2C^3}{\\boldsymbol{2}} = \\frac{16}{\\boldsymbol{2}} $$\n\n$$ C^3 = 8 $$\n\n$$ C = \\sqrt[3]{8} = 2 $$\n\nCheck: $g(x) = 2x^2$ gives $f(g(x)) = 2 \\cdot \\left(2x^2\\right)^3 = 2 \\cdot 8x^6 = 16x^6$. It agrees.\n\n**Answer:** $C = 2$ and $a = 2$, that is $g(x) = 2x^2$\n\n**b)** Now $f(x) = 2x^3$ is the inner function:\n\n$$ g(f(x)) = 2 \\cdot \\left(2x^3\\right)^2 = 2 \\cdot 4x^6 = 8x^6 $$\n\nCheck with a number, $x = 1$: $f(g(1)) = f(2) = 16$ but $g(f(1)) = g(2) = 8$.\n\n**Answer:** No, $g(f(x)) = 8x^6$ while $f(g(x)) = 16x^6$. The order matters.\n\n**General conclusion:** a power function substituted into another power function gives a new power function, where the exponents are multiplied. The coefficients are treated differently depending on which function is the inner one, and therefore $f(g(x))$ and $g(f(x))$ are usually different."
   },
   {
    "level": 3,
    "question": "The point $P$ lies on the graph of $y = 8x^{-1}$, where $x > 0$. A rectangle has one vertex at the origin, the opposite vertex at $P$ and its sides along the axes.<br>a) Show that the area of the rectangle is 8 area units, wherever on the graph $P$ lies.<br>b) For which value of $a$ does the rectangle have the same area for all points $P$ if the graph is instead $y = 8x^a$?<br>c) $P$ now lies on the graph of $y = 8x^{-2}$, where $x > 0$. Where does $P$ lie if the area of the rectangle is 2 area units?",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": -1,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "c",
      "value": 4,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "c",
      "value": 0.5,
      "unit": "",
      "etikett": "$y =$"
     }
    ],
    "solution": "**The key insight:** if $P = (x, y)$, the rectangle has the width $x$ and the height $y$, so the area is $x \\cdot y$. If the function expression is substituted, the area becomes a new power function of $x$, and it is constant exactly when the exponent becomes 0.\n\n**a)** With $y = 8x^{-1}$ the area is\n\n$$ x \\cdot y = x \\cdot 8x^{-1} = 8x^{1 + (-1)} = 8x^0 = 8 $$\n\nThe expression contains no $x$, so the area is 8 for every point on the graph.\n\nCheck with two points: $P = (1, 8)$ gives $1 \\cdot 8 = 8$, and $P = (4, 2)$ gives $4 \\cdot 2 = 8$.\n\n**Answer:** The area is $x \\cdot 8x^{-1} = 8$ area units for all $P$\n\n**b)** With $y = 8x^a$ the area is\n\n$$ x \\cdot 8x^a = 8x^{a + 1} $$\n\nIt is independent of $x$ only if the exponent is 0:\n\n$$ a + 1 = 0 $$\n\nSubtract 1 from both sides:\n\n$$ a + 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} = 0 \\mathbin{\\boldsymbol{-}} \\boldsymbol{1} $$\n\n$$ a = -1 $$\n\nFor all other $a$ the area depends on where $P$ lies.\n\n**Answer:** $a = -1$\n\n**c)** With $a = -2$ the area is $8x^{-2 + 1} = 8x^{-1} = \\dfrac{8}{x}$. It must be 2:\n\n$$ \\frac{8}{x} = 2 $$\n\nMultiply both sides by $x$:\n\n$$ \\boldsymbol{x} \\mathbin{\\boldsymbol{\\cdot}} \\frac{8}{x} = 2 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{x} $$\n\n$$ 8 = 2x $$\n\nDivide both sides by 2:\n\n$$ \\frac{8}{\\boldsymbol{2}} = \\frac{2x}{\\boldsymbol{2}} $$\n\n$$ x = 4 $$\n\nThen $y = 8 \\cdot 4^{-2} = \\dfrac{8}{16} = 0.5$.\n\nCheck: the rectangle has the area $4 \\cdot 0.5 = 2$. It agrees.\n\n**Answer:** $P = (4,\\ 0.5)$\n\n**General conclusion:** for $y = C \\cdot x^a$ the area of the rectangle is $C \\cdot x^{a + 1}$. The graph of $y = \\dfrac{C}{x}$ is the only power function where all such rectangles have the same area. That is a characteristic of inverse proportionality: when $x$ doubles, $y$ is halved."
   }
  ]
 }
});
