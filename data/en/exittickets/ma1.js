/* Engelsk översättning av exittickets (ma1). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('exittickets', {
 "ma1b-3.4": {
  "kalla": "fab24f79e3",
  "data": [
   {
    "question": "What index number does the base year have in an index series?",
    "choices": [
     "0",
     "1",
     "100",
     "It depends on which year is chosen"
    ],
    "correct": 2,
    "why": [
     "Index 0 would mean that the value was zero in the base year.",
     "The quotient is 1, but index numbers are given multiplied by 100, so 100.",
     "The base year's value is divided by itself and multiplied by 100: it always becomes 100.",
     "Any year can be chosen as the base year, but the base year still always gets index 100."
    ]
   },
   {
    "question": "The price of an item has the index number 140, with 2015 as the base year. What does that mean?",
    "choices": [
     "The price is 140 kr",
     "The price is 40 % higher than in 2015",
     "The price is 140 % higher than in 2015",
     "The price is 40 kr higher than in 2015"
    ],
    "correct": 1,
    "why": [
     "An index number is a comparison with the base year, not a price in kronor.",
     "Index 140 is 40 units above the base year's 100: an increase of 40 % (multiplier 1.40).",
     "The first 100 units are the base year's own level. Only what lies above 100 is an increase.",
     "The index units are per cent of the base year's price, not kronor."
    ]
   },
   {
    "question": "What does the consumer price index (KPI, the Swedish CPI) measure?",
    "choices": [
     "How much wages have increased since the base year",
     "The interest on an average savings account",
     "The general price level of households' goods and services, compared with the base year",
     "The state's income from taxes"
    ],
    "correct": 2,
    "why": [
     "Wage development is measured separately: KPI is about prices. The quotient wage/KPI gives the real wage.",
     "Interest rates are not prices of goods: they are not included in KPI as savings interest.",
     "Statistics Sweden (SCB) prices a large basket of goods with what households buy and compares with the base year 1980. If KPI rises, there is inflation.",
     "KPI is built from shop prices, rents and charges, not from tax income."
    ]
   },
   {
    "question": "A wage of 25 000 kr from year A is to be converted to year B's money value. KPI is 300 in year A and 360 in year B. Which expression is right?",
    "choices": [
     "$25\\ 000 \\cdot \\dfrac{300}{360}$",
     "$25\\ 000 \\cdot \\dfrac{360}{300}$",
     "$25\\ 000 + (360 - 300)$",
     "$25\\ 000 \\cdot 360$"
    ],
    "correct": 1,
    "why": [
     "That quotient works in the wrong direction: it would take the wage back in time, from year B to year A.",
     "The quotient of the new year's index and the old year's index is the multiplier between the years, here $\\dfrac{360}{300} = 1.2$.",
     "Index units cannot be added to kronor: the conversion is a multiplication by a factor.",
     "Multiplying by the whole index number gives an unreasonably large amount. It is the quotient of the index numbers that is the factor."
    ]
   }
  ]
 },
 "ma1b-5.1": {
  "kalla": "1e754d2dcb",
  "data": [
   {
    "question": "What is the relative frequency of an answer in a survey?",
    "choices": [
     "The difference between the largest and the smallest frequency",
     "The number of times the answer occurs",
     "The frequency multiplied by the total number",
     "The frequency divided by the total number"
    ],
    "correct": 3,
    "why": [
     "That measure describes spread, not how common a single answer is.",
     "That is the ordinary frequency. The relative frequency relates the number to the whole.",
     "Multiplication gives a large number with no interpretation. Proportions are obtained by division.",
     "Relative frequency = frequency/total number: the proportion of all the answers, often given in per cent."
    ]
   },
   {
    "question": "Which type of chart is best when the parts together make up a whole, such as the proportion of votes per party?",
    "choices": [
     "Scatter plot",
     "Line graph",
     "Frequency table",
     "Pie chart"
    ],
    "correct": 3,
    "why": [
     "Scatter plots show relationships between two variables, not proportions.",
     "Line graphs show how a value changes over time, not how a whole is divided up.",
     "A table can of course show the same data, but the question is about the type of chart, and the table gives no visual comparison of the proportions.",
     "The whole circle is 100 % and each sector a proportion: perfect when the parts add up to a whole."
    ]
   },
   {
    "question": "A bar chart has a y-axis that starts at 90 instead of 0. What is the effect?",
    "choices": [
     "Small differences between the bars look much larger than they are",
     "The values in the chart become wrong",
     "No effect: the ratio between the bars is always preserved",
     "The bars become too low and the differences disappear"
    ],
    "correct": 0,
    "why": [
     "Only what sticks up above 90 is visible: an increase from 96 to 104 can look like a several-fold increase.",
     "The values are correct: it is the visual impression that becomes distorted. That is why you must always check where the axis starts.",
     "The ratio between the bars' HEIGHTS changes precisely because the base is cut off.",
     "The effect is the opposite: the differences are blown up, not shrunk."
    ]
   },
   {
    "question": "What should the relative frequencies in a survey add up to?",
    "choices": [
     "It depends on the number of categories",
     "50 %",
     "1, that is, 100 %",
     "The total number of answers"
    ],
    "correct": 2,
    "why": [
     "However many categories there are, they share the same whole.",
     "Half is just an arbitrary proportion: the whole is always 100 %.",
     "All the proportions together make up the whole survey: the sum is always 1. Good as a check on the calculation.",
     "That is the sum of the ordinary frequencies. The relative frequencies are proportions and add up to 1."
    ]
   }
  ]
 },
 "ma1c-1.1": {
  "kalla": "63ffe3f3f6",
  "data": [
   {
    "question": "Which symbol is used for the set of **rational numbers**?",
    "choices": [
     "$\\mathbb{R}$",
     "$\\mathbb{Q}$",
     "$\\mathbb{Z}$",
     "$\\mathbb{N}$"
    ],
    "correct": 1,
    "why": [
     "$\\mathbb{R}$ denotes the real numbers: all numbers on the number line, including the irrational ones.",
     "$\\mathbb{Q}$ denotes the rational numbers: all numbers that can be written as a fraction $\\dfrac{a}{b}$ where $a$ and $b$ are integers and $b \\neq 0$.",
     "$\\mathbb{Z}$ denotes the integers: …, −2, −1, 0, 1, 2, …",
     "$\\mathbb{N}$ denotes the natural numbers: all non-negative integers 0, 1, 2, 3 …"
    ]
   },
   {
    "question": "Which sets of numbers does the number $-7$ belong to?",
    "choices": [
     "Only $\\mathbb{Z}$",
     "$\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{R}$",
     "$\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{R}$, but not $\\mathbb{N}$",
     "$\\mathbb{Q}$ and $\\mathbb{R}$, but not $\\mathbb{Z}$"
    ],
    "correct": 2,
    "why": [
     "The sets of numbers lie inside each other: a number in $\\mathbb{Z}$ is automatically also in $\\mathbb{Q}$ and $\\mathbb{R}$.",
     "The natural numbers $\\mathbb{N}$ contain only non-negative integers, so the negative number $-7$ is not included there.",
     "$-7$ is an integer, and every integer is also rational (for example $-7 = \\dfrac{-7}{1}$) and real. However, $-7$ is not natural, since the natural numbers contain only non-negative integers.",
     "$-7$ certainly is an integer: the integers $\\mathbb{Z}$ also contain the negative integers."
    ]
   },
   {
    "question": "What characterises an **irrational** number?",
    "choices": [
     "It cannot be written as a fraction of two integers: its decimal expansion is infinite without repeating",
     "It is less than 0",
     "It has infinitely many decimals",
     "It lies outside the real numbers"
    ],
    "correct": 0,
    "why": [
     "Exactly. Irrational numbers such as π and $\\sqrt{2}$ cannot be written in the form $\\dfrac{a}{b}$ with integers $a$ and $b$, and their decimal expansion is infinite without repeating.",
     "The sign has nothing to do with it: there are both negative rational numbers (for example −0.25) and negative irrational numbers (for example −π).",
     "That is not enough. $\\dfrac{1}{3} = 0.333\\ldots$ also has infinitely many decimals, but they repeat, and the number is rational.",
     "On the contrary: the irrational numbers are part of the real numbers $\\mathbb{R}$, which contain all numbers on the number line."
    ]
   },
   {
    "question": "Calculate $6 - (-4)$.",
    "choices": [
     "$2$",
     "$10$",
     "$-10$",
     "$-2$"
    ],
    "correct": 1,
    "why": [
     "Then you have calculated $6 - 4$. But two minus signs together are replaced by a plus sign, so it becomes $6 + 4$.",
     "Equal signs together are replaced by a plus sign: $6 - (-4) = 6 + 4 = 10$.",
     "The sign rule gives plus, not minus: $6 - (-4) = 6 + 4$.",
     "That would be the answer to $(-6) + 4$. Here two minus signs together become a plus: $6 + 4 = 10$."
    ]
   },
   {
    "question": "Which of the following expressions has a **negative** value?",
    "choices": [
     "$5 + (-9)$",
     "$7 - (-2)$",
     "$\\dfrac{-24}{-6}$",
     "$(-3) \\cdot (-8)$"
    ],
    "correct": 0,
    "why": [
     "Plus and minus together are replaced by a minus sign: $5 + (-9) = 5 - 9 = -4$, which is negative.",
     "Two minus signs together are replaced by a plus sign: $7 - (-2) = 7 + 2 = 9$, which is positive.",
     "Equal signs divided by each other give plus: $\\dfrac{-24}{-6} = 4$, which is positive.",
     "Minus times minus gives plus: $(-3) \\cdot (-8) = 24$, which is positive."
    ]
   }
  ]
 },
 "ma1c-1.2": {
  "kalla": "48252bf04c",
  "data": [
   {
    "question": "What is the number **above** the fraction bar called?",
    "choices": [
     "Numerator",
     "Quotient",
     "Denominator",
     "Factor"
    ],
    "correct": 0,
    "why": [
     "The number above the fraction bar is called the numerator.",
     "The quotient is the result of a division, not part of how a fraction is written.",
     "The denominator is the number below the fraction bar.",
     "Factors are the numbers in a multiplication, not the parts of a fraction."
    ]
   },
   {
    "question": "What happens to a fraction's **value** when you expand the fraction?",
    "choices": [
     "It depends on which number you expand by",
     "The value becomes smaller",
     "The value becomes larger",
     "The value is unchanged"
    ],
    "correct": 3,
    "why": [
     "As long as you multiply the numerator and the denominator by the same number (except 0), the value is always unchanged, whatever the number is.",
     "The fraction is not divided into a smaller value, only into more, smaller parts.",
     "The numerator does get larger, but the denominator grows by the same factor, so the proportion stays the same.",
     "When expanding, the numerator and the denominator are multiplied by the same number, so the size of the fraction does not change. For example, $\\dfrac{1}{4} = \\dfrac{3}{12}$."
    ]
   },
   {
    "question": "Simplify $\\dfrac{8}{12}$ by dividing by 4.",
    "choices": [
     "$\\dfrac{2}{12}$",
     "$\\dfrac{2}{3}$",
     "$\\dfrac{4}{6}$",
     "$\\dfrac{8}{3}$"
    ],
    "correct": 1,
    "why": [
     "Here only the numerator has been divided by 4. The denominator must also be divided by 4.",
     "Simplifying by 4 means dividing both the numerator and the denominator by 4: $\\dfrac{8/4}{12/4} = \\dfrac{2}{3}$.",
     "You get $\\dfrac{4}{6}$ if you simplify by 2. Here it should be simplified by 4.",
     "Here only the denominator has been divided by 4. The numerator must also be divided by 4."
    ]
   },
   {
    "question": "When can you simplify a fraction by \"cancelling equal numbers\" in the numerator and the denominator?",
    "choices": [
     "Always: equal numbers cancel each other out",
     "Never: you must always work out the numerator and the denominator first",
     "When there are multiplication signs between the numbers",
     "When there are plus signs between the numbers"
    ],
    "correct": 2,
    "why": [
     "No. For example, $\\dfrac{6+2}{2+2} = \\dfrac{8}{4} = 2$, but if you \"cancel\" the 2s you get $\\dfrac{6}{2} = 3$, which is wrong.",
     "Cancelling common factors works perfectly well, for example $\\dfrac{4 \\cdot 2}{4 \\cdot 1} = \\dfrac{2}{1}$, as long as it is multiplication.",
     "Cancelling is really a simplification: dividing the numerator and the denominator by the same factor. That requires the number to be a factor, that is, that there are multiplication signs between.",
     "Exactly the opposite: with plus signs between, cancelling gives the wrong result, for example $\\dfrac{6+2}{2+2} = 2$ but $\\dfrac{6}{2} = 3$."
    ]
   },
   {
    "question": "Which fraction is larger: $\\dfrac{2}{3}$ or $\\dfrac{3}{5}$?",
    "choices": [
     "$\\dfrac{2}{3}$",
     "They are equal",
     "$\\dfrac{3}{5}$"
    ],
    "correct": 0,
    "why": [
     "With a common denominator it is clear at once: $\\dfrac{2}{3} = \\dfrac{10}{15}$ and $\\dfrac{3}{5} = \\dfrac{9}{15}$, and $\\dfrac{10}{15} > \\dfrac{9}{15}$.",
     "Convert to a common denominator: $\\dfrac{10}{15}$ and $\\dfrac{9}{15}$ respectively. They are not equal.",
     "$\\dfrac{3}{5} = \\dfrac{9}{15}$ is less than $\\dfrac{2}{3} = \\dfrac{10}{15}$. Compare by converting to a common denominator."
    ]
   }
  ]
 },
 "ma1c-1.3": {
  "kalla": "a0e1d5338d",
  "data": [
   {
    "question": "What must you do **before** adding two fractions with different denominators?",
    "choices": [
     "Simplify both fractions as far as possible",
     "Expand one or more of the fractions so that they all have the same denominator",
     "Add the numerators and the denominators separately",
     "Rewrite the fractions as mixed numbers"
    ],
    "correct": 1,
    "why": [
     "Simplifying can tidy up the fractions but does not solve the problem: the denominators must be equal before adding.",
     "Only when the fractions have the same denominator can you add the numerators directly. That is why you expand until the denominators are equal.",
     "That is the classic mistake: $\\dfrac{1}{2} + \\dfrac{1}{2}$ would then become $\\dfrac{2}{4} = \\dfrac{1}{2}$, which is obviously wrong.",
     "On the contrary: in calculations you should always use fraction form, not mixed numbers."
    ]
   },
   {
    "question": "Calculate $\\dfrac{3}{7} + \\dfrac{2}{7}$.",
    "choices": [
     "$\\dfrac{5}{14}$",
     "$\\dfrac{6}{49}$",
     "$\\dfrac{1}{7}$",
     "$\\dfrac{5}{7}$"
    ],
    "correct": 3,
    "why": [
     "The denominators should not be added. The fractions already have the same denominator, so only the numerators are added.",
     "Here the numerators and denominators have been multiplied, but this is an addition, not a multiplication.",
     "That is the difference $\\dfrac{3}{7} - \\dfrac{2}{7}$. Here the fractions should be added.",
     "Same denominator: add the numerators and keep the denominator, $\\dfrac{3 + 2}{7} = \\dfrac{5}{7}$."
    ]
   },
   {
    "question": "What is the **lowest** common denominator (LCD) of 4 and 6?",
    "choices": [
     "12",
     "6",
     "10",
     "24"
    ],
    "correct": 0,
    "why": [
     "The multiples of 4 are 4, 8, 12 … and the multiples of 6 are 6, 12 … The first common multiple is 12.",
     "6 is not a multiple of 4: quarters cannot be rewritten as sixths by expanding with a whole number.",
     "10 is neither a multiple of 4 nor a useful choice: neither fraction can be expanded to the denominator 10 with a whole number.",
     "24 is a common denominator (4 · 6), but not the lowest: 12 appears earlier in both columns of multiples."
    ]
   },
   {
    "question": "Write $2\\dfrac{1}{5}$ in fraction form.",
    "choices": [
     "$\\dfrac{11}{5}$",
     "$\\dfrac{21}{5}$",
     "$\\dfrac{7}{5}$",
     "$\\dfrac{3}{5}$"
    ],
    "correct": 0,
    "why": [
     "The whole number times the denominator plus the numerator: $\\dfrac{2 \\cdot 5 + 1}{5} = \\dfrac{11}{5}$.",
     "Here the digits 2 and 1 have just been written together. A mixed number means $2 + \\dfrac{1}{5}$, not 21 fifths.",
     "Check: $\\dfrac{7}{5} = 1\\frac{2}{5}$, not $2\\frac{1}{5}$.",
     "Here the number 2 and the numerator 1 have been added. But the wholes must first be multiplied by the denominator: 2 wholes are $\\dfrac{10}{5}$."
    ]
   },
   {
    "question": "Which form should fractions be written in when you **calculate** with them?",
    "choices": [
     "It does not matter",
     "Decimal form, always",
     "Fraction form",
     "Mixed numbers"
    ],
    "correct": 2,
    "why": [
     "It does: a mixed number in a calculation easily leads to mistakes, for example $2\\frac{1}{5}$ being read as $2 \\cdot \\dfrac{1}{5}$.",
     "Decimal form is often rounded and can give rounding errors. Fraction form is exact.",
     "In calculations you should always use fraction form. That is why it is important to be able to switch from mixed numbers to fraction form.",
     "Mixed numbers are good for *reading off* a size (for example $3\\frac{3}{4}$ cakes), but in calculations they cause trouble."
    ]
   },
   {
    "question": "The denominators are written as products of primes: $20 = 2 \\cdot 2 \\cdot 5$ and $30 = 2 \\cdot 3 \\cdot 5$. What is the lowest common denominator?",
    "choices": [
     "$2 \\cdot 5 = 10$",
     "$2 \\cdot 2 \\cdot 5 \\cdot 2 \\cdot 3 \\cdot 5 = 600$",
     "$2 \\cdot 2 \\cdot 3 \\cdot 5 = 60$",
     "$2 \\cdot 3 \\cdot 5 = 30$"
    ],
    "correct": 2,
    "why": [
     "Here only the common factors have been included. 10 is divisible by neither 20 nor 30, so it is not a common denominator at all.",
     "Here all the factors from both denominators have been included, that is, the product $20 \\cdot 30$. It is a common denominator, but not the lowest: the common factors 2 and 5 have been taken from both denominators, so each is included once too often.",
     "Each prime is included as many times as it occurs at most in any one denominator: the 2 twice (from 20), the 3 once and the 5 once. That gives $60$, which is divisible by both 20 and 30.",
     "30 is not divisible by 20. The 2 occurs twice in 20, so the LCD must contain two 2s."
    ]
   }
  ]
 },
 "ma1c-1.4": {
  "kalla": "6822ab8e76",
  "data": [
   {
    "question": "How do you multiply two fractions?",
    "choices": [
     "Numerator times denominator crosswise",
     "Numerator times numerator and denominator times denominator",
     "You invert the second fraction and then multiply",
     "The fractions must first have the same denominator"
    ],
    "correct": 1,
    "why": [
     "Cross-multiplication is a memory aid for comparing fractions or solving equations, not for multiplying them.",
     "When multiplying, the numerators are multiplied together and the denominators are multiplied together: $\\dfrac{2}{3} \\cdot \\dfrac{5}{7} = \\dfrac{10}{21}$.",
     "Inverting is used when dividing by fractions, not when multiplying.",
     "A common denominator is needed for addition and subtraction, not for multiplication."
    ]
   },
   {
    "question": "What do you do with the fraction in the **denominator** when dividing by a fraction?",
    "choices": [
     "Nothing: you divide the numerators and the denominators separately",
     "You simplify it as far as possible",
     "You expand it so that the denominators become equal",
     "You invert it and change the division to a multiplication"
    ],
    "correct": 3,
    "why": [
     "That may happen to work in special cases, but the general rule is invert and multiply.",
     "Simplifying does not turn the division into a simpler operation. The rule is to invert and multiply.",
     "A common denominator belongs to addition and subtraction. When dividing, you invert instead.",
     "The division is changed to a multiplication while the fraction in the denominator is inverted: $\\dfrac{a}{b} \\Big/ \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c}$."
    ]
   },
   {
    "question": "Calculate $6 \\Big/ \\dfrac{2}{3}$.",
    "choices": [
     "$\\dfrac{1}{9}$",
     "$4$",
     "$9$",
     "$\\dfrac{12}{3}$"
    ],
    "correct": 2,
    "why": [
     "Here the division has been turned the wrong way. It is the fraction in the denominator that should be inverted, not the whole expression.",
     "$6 \\cdot \\dfrac{2}{3} = 4$, but here you should divide, so the fraction must be inverted first.",
     "Write $6 = \\dfrac{6}{1}$, invert and multiply: $\\dfrac{6}{1} \\cdot \\dfrac{3}{2} = \\dfrac{18}{2} = 9$.",
     "$\\dfrac{12}{3} = 4$ is the result of $6 \\cdot \\dfrac{2}{3}$. Division requires inverting."
    ]
   },
   {
    "question": "How much is $\\dfrac{2}{9}$ of 45 kr?",
    "choices": [
     "90 kr",
     "10 kr",
     "18 kr",
     "5 kr"
    ],
    "correct": 1,
    "why": [
     "90 kr is double the amount: it has been multiplied by 2 without dividing by 9.",
     "A fraction of something means multiplication: $\\dfrac{2}{9} \\cdot 45 = \\dfrac{2 \\cdot 45}{9} = 2 \\cdot 5 = 10$.",
     "18 kr is $\\dfrac{2}{5}$ of 45 kr. Check the denominator.",
     "5 kr is $\\dfrac{1}{9}$ of 45 kr. Here $\\dfrac{2}{9}$ is wanted, that is, twice as much."
    ]
   },
   {
    "question": "Why does it pay to **factorise** the numerator and the denominator before multiplying fractions with large numbers?",
    "choices": [
     "Common factors can be cancelled before the numbers get large",
     "Factorising turns the multiplication into an addition",
     "It is the only way to get the right answer",
     "It means you do not have to simplify the answer"
    ],
    "correct": 0,
    "why": [
     "When the numerator and the denominator are written as products, common factors are visible at once and can be cancelled. For example, $\\dfrac{7 \\cdot 6}{6 \\cdot 6 \\cdot 7 \\cdot 3} = \\dfrac{1}{18}$ without ever working out $36 \\cdot 21$.",
     "The operation does not change: it is still multiplication, just with visible factors.",
     "Multiplying first and simplifying afterwards also gives the right answer. It is just more awkward with large numbers.",
     "You still simplify, but much more easily, since the factors are visible at once."
    ]
   }
  ]
 },
 "ma1c-1.5": {
  "kalla": "fa3178121c",
  "data": [
   {
    "question": "What is a value that has been rounded called?",
    "choices": [
     "Approximate value",
     "Limit",
     "Mean",
     "Absolute value"
    ],
    "correct": 0,
    "why": [
     "A rounded value is called an approximate value: it is close to, but not exactly equal to, the original number.",
     "A limit is a concept that appears only at later levels and is about what an expression approaches.",
     "A mean is the sum of several values divided by how many there are. It has nothing to do with rounding.",
     "The absolute value of a number is its distance from 0 on the number line, always without a sign."
    ]
   },
   {
    "question": "Round 8.349 to tenths.",
    "choices": [
     "8",
     "8.35",
     "8.4",
     "8.3"
    ],
    "correct": 3,
    "why": [
     "8 is rounded to units. Here tenths are asked for.",
     "8.35 is rounded to hundredths, not tenths.",
     "You get 8.4 if you first round to 8.35 and then once more. But rounding is done in one step, and the digit after the tenths digit is 4, which rounds down.",
     "The tenths digit is 3 and the digit after it is 4. That belongs to the group 0–4, so the tenths digit is kept: 8.3."
    ]
   },
   {
    "question": "How many significant figures does the number 0.0072 have?",
    "choices": [
     "4",
     "5",
     "3",
     "2"
    ],
    "correct": 3,
    "why": [
     "The first significant figure is the first digit that is not 0. The leading zeros do not count.",
     "The zeros before the 7 do not count: they only show where the decimal point is.",
     "Only the digits from the first non-zero digit onwards count: 7 and 2.",
     "The first significant figure is the first digit that is not 0, that is, the 7. The significant figures are 7 and 2: two of them."
    ]
   },
   {
    "question": "When multiplying two measured values, what determines the number of significant figures in the answer?",
    "choices": [
     "The value with the fewest significant figures",
     "The value with the most significant figures",
     "The value with the fewest decimal places",
     "The answer is always given to three significant figures"
    ],
    "correct": 0,
    "why": [
     "In multiplication and division, the value with the fewest significant figures gives the number of significant figures in the answer. For example, 19.5 · 24 = 468 ≈ 470 (two significant figures, as in 24).",
     "Then the answer would look more precise than the least precise measurement. The precision can never be better than the most uncertain factor.",
     "The fewest decimal places decides in addition and subtraction, not in multiplication.",
     "Three significant figures is a common rule of thumb in physics when nothing else is stated, but the rule here follows the least precise factor."
    ]
   },
   {
    "question": "Calculate $5.84 - 2.1$ and answer with the correct number of decimal places.",
    "choices": [
     "4",
     "3.74",
     "3.7",
     "3.8"
    ],
    "correct": 2,
    "why": [
     "A whole number would be too coarse: the fewest decimal places among the terms is one decimal place, not zero.",
     "3.74 is correctly calculated but not correctly rounded. In subtraction, the value with the fewest decimal places decides (2.1 has one decimal place).",
     "The difference is 3.74, and since 2.1 has only one decimal place, the answer is rounded to one decimal place: 3.7.",
     "3.8 is incorrectly rounded: the digit after the tenths digit is 4, which rounds down."
    ]
   }
  ]
 },
 "ma1c-1.6": {
  "kalla": "374931aa5b",
  "data": [
   {
    "question": "In the power $3^5$, what is the number 3 called?",
    "choices": [
     "Factor",
     "Exponent",
     "Coefficient",
     "Base"
    ],
    "correct": 3,
    "why": [
     "In the factor form $3 \\cdot 3 \\cdot 3 \\cdot 3 \\cdot 3$ each 3 is a factor, but in power notation the 3 is called the base.",
     "The exponent is the number 5: it states how many times the base is multiplied by itself.",
     "A coefficient is the number in front of a variable, for example 42 in $42x^3$.",
     "The base is the number that is raised to a power, here 3. The exponent 5 states the number of factors."
    ]
   },
   {
    "question": "What is $7^2 \\cdot 7^3$ written as a single power?",
    "choices": [
     "$49^5$",
     "$14^5$",
     "$7^5$",
     "$7^6$"
    ],
    "correct": 2,
    "why": [
     "The base does not change when multiplying powers. Only the exponents are added.",
     "The bases should not be added: both powers already have the same base 7, and it is kept.",
     "The law of exponents gives $7^2 \\cdot 7^3 = 7^{2+3} = 7^5$.",
     "You get $7^6$ if the exponents are multiplied, but when multiplying powers with the same base they should be added."
    ]
   },
   {
    "question": "What is $(a^3)^4$?",
    "choices": [
     "$a^{34}$",
     "$a^7$",
     "$a^{12}$",
     "$a^{81}$"
    ],
    "correct": 2,
    "why": [
     "The exponents should not be written together as digits. They are multiplied: $3 \\cdot 4 = 12$.",
     "$a^7$ would be the answer to $a^3 \\cdot a^4$. For a power of a power, the exponents are multiplied instead.",
     "For a \"power of a power\", the exponents are multiplied: $(a^3)^4 = a^{3 \\cdot 4} = a^{12}$.",
     "81 is $3^4$, but it is the exponents 3 and 4 that should be multiplied, not raised to a power."
    ]
   },
   {
    "question": "What is the value of $-4^2$?",
    "choices": [
     "$-16$",
     "$16$",
     "$8$",
     "$-8$"
    ],
    "correct": 0,
    "why": [
     "Without brackets the base is just 4: $-4^2 = -(4 \\cdot 4) = -16$.",
     "$16$ is the value of $(-4)^2$, where the whole number −4 is the base. In $-4^2$ the minus sign is outside the power.",
     "Both the sign and the power have been lost: $-4^2$ is minus \"4 squared\", that is, −16.",
     "Here $4^2$ has accidentally become $4 \\cdot 2$. The exponent means repeated multiplication, not multiplication by 2."
    ]
   },
   {
    "question": "How is $7^3$ read aloud?",
    "choices": [
     "\"7 cubed\"",
     "\"3 to the power of 7\"",
     "\"7 squared\"",
     "\"7 times 3\""
    ],
    "correct": 0,
    "why": [
     "An exponent of 3 can be read as \"cubed\", so $7^3$ is \"7 cubed\" (or \"7 to the power of 3\").",
     "The order is reversed: the base is 7 and the exponent 3, so it is read \"7 to the power of 3\".",
     "\"Squared\" belongs to the exponent 2. Here the exponent is 3.",
     "$7 \\cdot 3 = 21$ but $7^3 = 343$. A power is repeated multiplication, not a simple product."
    ]
   }
  ]
 },
 "ma1c-1.7": {
  "kalla": "14388ca6cf",
  "data": [
   {
    "question": "What is $9^0$?",
    "choices": [
     "$0$",
     "$9$",
     "Undefined",
     "$1$"
    ],
    "correct": 3,
    "why": [
     "The most common mistake. But $\\dfrac{9^5}{9^5}$ is both $9^{5-5} = 9^0$ and obviously equal to 1, so $9^0 = 1$.",
     "The exponent 0 does not mean that the number is kept. That is what the exponent 1 does: $9^1 = 9$.",
     "Only $0^0$ is undefined (it corresponds to division by 0). For all other bases the value is 1.",
     "Every number except 0 raised to 0 is 1. It follows from the law of exponents for division: $\\dfrac{9^5}{9^5} = 9^0 = 1$."
    ]
   },
   {
    "question": "What is $2^{-4}$?",
    "choices": [
     "$\\dfrac{1}{8}$",
     "$-\\dfrac{1}{16}$",
     "$\\dfrac{1}{16}$",
     "$-16$"
    ],
    "correct": 2,
    "why": [
     "$\\dfrac{1}{8} = 2^{-3}$. Check the exponent: here it is −4.",
     "There is no minus sign left in the value: $2^{-4}$ is a positive fraction.",
     "A negative exponent means $a^{-n} = \\dfrac{1}{a^n}$, so $2^{-4} = \\dfrac{1}{2^4} = \\dfrac{1}{16}$.",
     "The minus sign in the exponent does not make the value negative. It means \"1 divided by the power\"."
    ]
   },
   {
    "question": "Write $\\dfrac{1}{x^3}$ as a power with base $x$.",
    "choices": [
     "$3x^{-1}$",
     "$x^{3}$",
     "$x^{-3}$",
     "$x^{\\frac{1}{3}}$"
    ],
    "correct": 2,
    "why": [
     "The 3 is an exponent in the expression, not a coefficient in front of $x$.",
     "$x^3$ is the denominator itself. The fraction is its inverse, and that requires a negative exponent.",
     "The denominator is \"moved up\" with the sign of the exponent changed: $\\dfrac{1}{x^3} = x^{-3}$.",
     "The exponent $\\dfrac{1}{3}$ means something completely different (a root), not \"1 divided by\"."
    ]
   },
   {
    "question": "What is $\\left(\\dfrac{5}{8}\\right)^{-1}$?",
    "choices": [
     "$\\dfrac{5}{8}$",
     "$-\\dfrac{5}{8}$",
     "$\\dfrac{8}{5}$",
     "$-\\dfrac{8}{5}$"
    ],
    "correct": 2,
    "why": [
     "Without inverting, the exponent −1 has not been used at all.",
     "The exponent −1 does not change the sign of the fraction. It inverts it.",
     "Raising a fraction to −1 is the same as inverting it: the numerator and the denominator swap places.",
     "The fraction should be inverted but not change sign: the value stays positive."
    ]
   }
  ]
 },
 "ma1c-1.8": {
  "kalla": "eba91a4580",
  "data": [
   {
    "question": "What is an exponent that contains a fraction, for example $25^{1/2}$, called?",
    "choices": [
     "Rational exponent",
     "Negative exponent",
     "Fractional base",
     "Irrational exponent"
    ],
    "correct": 0,
    "why": [
     "An exponent that is a fraction (a rational number) is called a rational exponent.",
     "Negative exponents are about a minus sign in the exponent, not about fractions.",
     "It is the exponent that is a fraction. The base 25 is an ordinary integer.",
     "Irrational numbers are numbers that CANNOT be written as fractions. Fractional exponents are, on the contrary, rational."
    ]
   },
   {
    "question": "What is $36^{1/2}$?",
    "choices": [
     "$6$",
     "$72$",
     "$\\dfrac{1}{36}$",
     "$18$"
    ],
    "correct": 0,
    "why": [
     "The exponent $\\dfrac{1}{2}$ means the square root: $36^{1/2} = \\sqrt{36} = 6$.",
     "72 is double 36. The exponent $\\dfrac{1}{2}$ is neither halving nor doubling.",
     "$\\dfrac{1}{36}$ would be $36^{-1}$: a negative exponent, not a rational one.",
     "18 is half of 36, but the exponent $\\dfrac{1}{2}$ means the square root, not halving."
    ]
   },
   {
    "question": "Which expression is equal to $\\sqrt[3]{64}$?",
    "choices": [
     "$64^{1/3}$",
     "$64^{3}$",
     "$\\dfrac{64}{3}$",
     "$3^{64}$"
    ],
    "correct": 0,
    "why": [
     "The rule $a^{1/n} = \\sqrt[n]{a}$ gives $\\sqrt[3]{64} = 64^{1/3}$ (= 4, since $4^3 = 64$).",
     "$64^3$ is 64 multiplied by itself three times: the opposite of taking the cube root.",
     "The cube root is not a division: $\\sqrt[3]{64} = 4$ but $\\dfrac{64}{3} \\approx 21.3$.",
     "Here the base and the exponent have swapped places. The index of the root goes into the denominator of the exponent."
    ]
   },
   {
    "question": "What is the easiest way to calculate $8^{2/3}$ without a calculator?",
    "choices": [
     "Divide 8 by 3 and multiply by 2",
     "Square 8 and divide by 3",
     "Take the cube root of 8 and square the result",
     "Take the square root of 8 and raise it to the power of 3"
    ],
    "correct": 2,
    "why": [
     "The exponent is not an ordinary fraction to multiply the base by: it controls a root and a power.",
     "$8^2/3$ would be something else. In $8^{2/3}$ the 3 belongs to taking the root, not to dividing the result.",
     "Split the exponent: $8^{2/3} = (8^{1/3})^2 = (\\sqrt[3]{8})^2 = 2^2 = 4$.",
     "The denominator 3 gives the cube root and the numerator 2 gives the squaring, not the other way round."
    ]
   }
  ]
 },
 "ma1c-1.9": {
  "kalla": "43a08ca2f6",
  "data": [
   {
    "question": "What condition applies to the number $a$ in standard form $a \\cdot 10^n$?",
    "choices": [
     "$1 \\leq a < 10$",
     "$0 \\leq a < 1$",
     "$a$ can be any number",
     "$1 \\leq a \\leq 100$"
    ],
    "correct": 0,
    "why": [
     "The number in front of the power of ten must be at least 1 but less than 10, for example $6.3 \\cdot 10^4$, not $63 \\cdot 10^3$.",
     "With $a$ less than 1 (for example $0.63 \\cdot 10^5$) the number is not in standard form.",
     "Without the condition the notation would not be unique: the same number could be written in many ways.",
     "Numbers between 10 and 100 in front of the power of ten (for example $63 \\cdot 10^3$) are not standard form."
    ]
   },
   {
    "question": "Write 0.0008 in standard form.",
    "choices": [
     "$8 \\cdot 10^{4}$",
     "$8 \\cdot 10^{-3}$",
     "$0.8 \\cdot 10^{-3}$",
     "$8 \\cdot 10^{-4}$"
    ],
    "correct": 3,
    "why": [
     "The number is less than 1, so the exponent must be negative.",
     "Count the zeros before the 8: there are four (0.000…), not three.",
     "0.8 is not between 1 and 10, so it is not standard form.",
     "The number of zeros before the first digit gives the negative exponent, here 4: $0.0008 = 8 \\cdot 10^{-4}$."
    ]
   },
   {
    "question": "Which power of ten corresponds to the prefix G (giga)?",
    "choices": [
     "$10^{9}$",
     "$10^{12}$",
     "$10^{-9}$",
     "$10^{6}$"
    ],
    "correct": 0,
    "why": [
     "Giga means billion: $1\\ \\mathrm{GB} = 10^9\\ \\mathrm{B}$.",
     "$10^{12}$ is tera (T), as in terabyte.",
     "$10^{-9}$ is nano (n): small numbers, not large ones.",
     "$10^6$ is mega (M). Giga is a thousand times larger."
    ]
   },
   {
    "question": "Write 0.0025 A with a suitable prefix.",
    "choices": [
     "25 mA",
     "2.5 µA",
     "2.5 cA",
     "2.5 mA"
    ],
    "correct": 3,
    "why": [
     "Check the standard form: $0.0025 = 2.5 \\cdot 10^{-3}$, not $25 \\cdot 10^{-3}$.",
     "µ (micro) is $10^{-6}$. Here the power of ten is $10^{-3}$.",
     "c (centi) is $10^{-2}$. That would give 0.25 cA, and centi is rarely used outside lengths.",
     "$0.0025\\ \\mathrm{A} = 2.5 \\cdot 10^{-3}\\ \\mathrm{A}$, and $10^{-3}$ is the prefix m (milli)."
    ]
   },
   {
    "question": "Why is 270 000 N written as 0.27 MN and not as $2.7 \\cdot 10^5$ N with a prefix of its own?",
    "choices": [
     "270 000 N cannot be written in standard form",
     "The prefix for $10^5$ is too unusual to be used in school",
     "There is no prefix for $10^5$, so the number is adjusted to the nearest power of ten with a prefix",
     "MN is wrong: it should be 27 kN"
    ],
    "correct": 2,
    "why": [
     "Of course it can: $270\\ 000 = 2.7 \\cdot 10^5$. But that power of ten has no prefix.",
     "It is not about being unusual: there is simply no SI prefix for $10^5$.",
     "The prefixes jump in steps of three around the common ones ($10^3$, $10^6$, $10^9$ …), so $2.7 \\cdot 10^5\\ \\mathrm{N}$ is rewritten as $0.27 \\cdot 10^6\\ \\mathrm{N} = 0.27\\ \\mathrm{MN}$.",
     "Check: $27\\ \\mathrm{kN} = 27\\ 000\\ \\mathrm{N}$, which is ten times too small."
    ]
   }
  ]
 },
 "ma1c-1.10": {
  "kalla": "1b646c7a15",
  "data": [
   {
    "question": "In what order should the operations be prioritised?",
    "choices": [
     "Brackets → powers → multiplication/division → addition/subtraction",
     "Always from left to right, whatever the operation",
     "Addition/subtraction → multiplication/division → powers → brackets",
     "Multiplication/division → brackets → powers → addition/subtraction"
    ],
    "correct": 0,
    "why": [
     "That is the order of operations. Remember the maths devil from top to bottom: brackets (the horns), powers (the eyes), multiplication/division, addition, subtraction.",
     "Left to right applies only between operations with the SAME priority. Otherwise the rules apply, for example $5 + 2 \\cdot 3 = 11$, not 21.",
     "That is exactly the reverse order: addition and subtraction come last, not first.",
     "Brackets always come first: they exist precisely to force a certain order."
    ]
   },
   {
    "question": "Calculate $10 - 2 \\cdot 3$.",
    "choices": [
     "$4$",
     "$24$",
     "$-4$",
     "$16$"
    ],
    "correct": 0,
    "why": [
     "Multiplication first: $10 - 2 \\cdot 3 = 10 - 6 = 4$.",
     "You get 24 if you calculate $10 - 2 = 8$ first, but multiplication has higher priority.",
     "The order is right but the subtraction has been reversed: $10 - 6 = 4$, not $6 - 10$.",
     "16 would require $10 + 2 \\cdot 3$. Check the sign."
    ]
   },
   {
    "question": "What is the answer to a division called?",
    "choices": [
     "Product",
     "Difference",
     "Denominator",
     "Quotient"
    ],
    "correct": 3,
    "why": [
     "The product is the answer to a multiplication.",
     "The difference is the answer to a subtraction.",
     "The denominator is the number you divide BY, not the answer.",
     "The answer to a division is called the quotient. For example, the quotient $12/4 = 3$."
    ]
   },
   {
    "question": "Calculate $\\dfrac{18}{7 - 4}$.",
    "choices": [
     "$2.57 - 4$ (cannot be simplified)",
     "$6$",
     "$-1.43$ (approximately)",
     "$14$"
    ],
    "correct": 1,
    "why": [
     "The denominator is always calculated first as a whole. The expression simplifies nicely to 6.",
     "The division has \"invisible\" brackets around the denominator: $\\dfrac{18}{(7-4)} = \\dfrac{18}{3} = 6$.",
     "Here $\\dfrac{18}{7}$ has been calculated first and then 4 subtracted, but the whole denominator $7 - 4$ belongs together.",
     "Check: $\\dfrac{18}{3} = 6$, not 14."
    ]
   },
   {
    "question": "What do the horns of the \"maths devil\" symbolise?",
    "choices": [
     "Powers",
     "Multiplication",
     "Brackets",
     "Subtraction"
    ],
    "correct": 2,
    "why": [
     "The powers are the eyes (the caret signs ^ ^), level two from the top.",
     "The multiplication dot sits on the cheek, in the middle of the face: third priority.",
     "The horns are curved like brackets ( ) and sit at the top: brackets are prioritised first.",
     "The minus sign is the chin at the very bottom: subtraction comes last."
    ]
   }
  ]
 },
 "ma1c-1.11": {
  "kalla": "8437e2f8bd",
  "data": [
   {
    "question": "The calculator shows `2.5E-4`. What number is it?",
    "choices": [
     "$25\\ 000$",
     "$-2.54$",
     "$2.5 - 4$",
     "$0.000\\ 25$"
    ],
    "correct": 3,
    "why": [
     "$25\\ 000$ would be $2.5\\mathrm{E}4$. The exponent here is negative, so the number is small.",
     "E is not a subtraction or a decimal: it is a power of ten.",
     "The E separates the number from the exponent. It is not a subtraction.",
     "E notation means \"times 10 to the power of\": $2.5\\mathrm{E}{-4} = 2.5 \\cdot 10^{-4} = 0.000\\ 25$."
    ]
   },
   {
    "question": "How should $\\dfrac{360}{2 \\cdot 3}$ be keyed into the calculator to give the right answer (60)?",
    "choices": [
     "`(360/2)*3`",
     "`360*2/3`",
     "`360/2*3`",
     "`360/(2*3)`"
    ],
    "correct": 3,
    "why": [
     "That is exactly what the calculator does with the alternative without brackets, and it gives 540, not 60.",
     "Here the operations have been completely rearranged: $360 \\cdot 2 / 3 = 240$.",
     "`360/2*3` is read from the left: $\\dfrac{360}{2} \\cdot 3 = 540$, which is wrong.",
     "The fraction bar has invisible brackets around the denominator. On the calculator they must be written out: $360/(2 \\cdot 3) = 60$."
    ]
   },
   {
    "question": "What happens if you key in `-3.7^2` without brackets instead of `(-3.7)^2`?",
    "choices": [
     "The calculator gives an error message",
     "The calculator gives 7.4",
     "The calculator gives −13.69, because the power is prioritised before the minus sign",
     "The calculator gives the same answer, 13.69"
    ],
    "correct": 2,
    "why": [
     "The expression is valid. It just gives a different (negative) answer than expected.",
     "7.4 would be $3.7 \\cdot 2$. The power is not a multiplication.",
     "Powers are prioritised before the minus sign, so `-3.7^2` is read as $-(3.7^2) = -13.69$. If the whole of −3.7 is to be squared, brackets are needed.",
     "Without brackets the calculator only raises 3.7 to the power and puts the minus sign on afterwards, so the answers differ."
    ]
   }
  ]
 },
 "ma1c-2.1": {
  "kalla": "c090599cac",
  "data": [
   {
    "question": "In the expression $800 + 150x$, what is $x$ called?",
    "choices": [
     "Constant term",
     "Coefficient",
     "Product",
     "Variable"
    ],
    "correct": 3,
    "why": [
     "The constant term is 800: the term that consists of a number only.",
     "The coefficient is the number 150: the one that is multiplied by the variable.",
     "A product is the result of a multiplication. $x$ is a single letter.",
     "The letter that can take different values is called a variable."
    ]
   },
   {
    "question": "What is the term $150x$ in the expression $800 + 150x$ called?",
    "choices": [
     "Variable term",
     "Constant term",
     "The value of the expression",
     "Coefficient"
    ],
    "correct": 0,
    "why": [
     "The whole term that contains the variable is called the variable term.",
     "The constant term is 800: it contains no variable.",
     "The value of the expression is the number you get when you substitute a value for $x$ and work everything out.",
     "The coefficient is just the number 150, not the whole term."
    ]
   },
   {
    "question": "What is the value of the expression $30 - 4x$ when $x = 5$?",
    "choices": [
     "$26$",
     "$10$",
     "$-10$",
     "$130$"
    ],
    "correct": 1,
    "why": [
     "Here $4 \\cdot 5$ has become 4. The coefficient must be multiplied by the value of the variable.",
     "Replace $x$ with 5: $30 - 4 \\cdot 5 = 30 - 20 = 10$.",
     "Check the order: $30 - 20 = 10$, not $20 - 30$.",
     "Here $30 - 4 = 26$ has been multiplied by 5, but multiplication is prioritised before subtraction."
    ]
   },
   {
    "question": "Buns cost $a$ kr each and cinnamon rolls $b$ kr each. What does the expression $6a - 2b$ describe?",
    "choices": [
     "The price difference between 6 buns and 2 cinnamon rolls",
     "The number of buns minus the number of cinnamon rolls",
     "The cost of 6 buns and 2 cinnamon rolls",
     "The cost of 4 buns"
    ],
    "correct": 0,
    "why": [
     "The difference $6a - 2b$ compares the price of 6 buns with the price of 2 cinnamon rolls.",
     "The expression is about kronor (price times number), not about numbers of items.",
     "The cost of both together would be the sum $6a + 2b$. Here there is a minus sign.",
     "The terms have different variables ($a$ and $b$) and cannot be combined into $4a$."
    ]
   }
  ]
 },
 "ma1c-2.2": {
  "kalla": "765df14135",
  "data": [
   {
    "question": "Which terms may be added together when you simplify an expression?",
    "choices": [
     "Only like terms: $x$-terms on their own, $y$-terms on their own and so on",
     "Only terms with a plus sign in front",
     "All the terms in the expression",
     "Only constant terms"
    ],
    "correct": 0,
    "why": [
     "Like terms are added together separately: $x$-terms, $y$-terms, $x^2$-terms and constant terms on their own.",
     "The sign goes with the term in the calculation, but both plus and minus terms of the same kind are added together.",
     "Different kinds of terms cannot be combined: $6x + 12y$ cannot be simplified further.",
     "Variable terms of the same kind are also added together, for example $8x - 2x = 6x$."
    ]
   },
   {
    "question": "Simplify $5x + 2y - 3x + y$.",
    "choices": [
     "$5xy$",
     "$8x + 3y$",
     "$2x + 2y$",
     "$2x + 3y$"
    ],
    "correct": 3,
    "why": [
     "Different variables cannot be multiplied together in an addition.",
     "The sign in front of $3x$ is minus: the terms should be subtracted, not added.",
     "Do not forget that $y$ is the same as $1y$: $2y + y = 3y$.",
     "$5x - 3x = 2x$ and $2y + y = 3y$ give $2x + 3y$."
    ]
   },
   {
    "question": "What happens to the signs when the brackets are removed in $a - (b - c)$?",
    "choices": [
     "Nothing: $a - b - c$",
     "Only the sign of the first term changes: $a + b - c$",
     "All the signs inside change: $a - b + c$",
     "The brackets cannot be removed"
    ],
    "correct": 2,
    "why": [
     "Without changing signs, the minus sign in front of the brackets has only been applied to $b$ and not to $c$.",
     "It is exactly the opposite: all the signs change, not just the first.",
     "A minus sign in front of brackets changes the signs of ALL the terms inside: $a - (b - c) = a - b + c$.",
     "They can easily be removed: it is precisely the change of sign that makes it possible."
    ]
   },
   {
    "question": "Simplify $12x - (3x + 5)$.",
    "choices": [
     "$15x - 5$",
     "$9x - 5$",
     "$4x$",
     "$9x + 5$"
    ],
    "correct": 1,
    "why": [
     "$3x$ should be subtracted, not added: the minus sign is in front of the brackets.",
     "The minus sign changes both signs inside: $12x - 3x - 5 = 9x - 5$.",
     "$9x$ and $-5$ are different kinds of terms and cannot be combined into $4x$.",
     "The sign of the 5 also changes when the brackets with minus in front are removed: $12x - 3x - 5$."
    ]
   }
  ]
 },
 "ma1c-2.3": {
  "kalla": "2248c01e7e",
  "data": [
   {
    "question": "What does the distributive law say?",
    "choices": [
     "$(a + b)(c + d) = ac + bd$",
     "$a(b + c) = ab + c$",
     "$a(b + c) = ab + ac$",
     "$a + (b + c) = ab + ac$"
    ],
    "correct": 2,
    "why": [
     "With two brackets, each term in the first must be multiplied by each term in the second. Here $ad$ and $bc$ are missing.",
     "Here the factor has only been multiplied by the first term. It must go into every term.",
     "The factor in front of the brackets is multiplied by each term inside: $a(b + c) = ab + ac$.",
     "With a plus sign in front of the brackets there is no multiplication at all."
    ]
   },
   {
    "question": "Expand $3(4x - 5)$.",
    "choices": [
     "$12x - 5$",
     "$12x + 15$",
     "$7x - 8$",
     "$12x - 15$"
    ],
    "correct": 3,
    "why": [
     "The 3 must be multiplied by BOTH terms, including −5.",
     "The sign comes along: $3 \\cdot (-5) = -15$, not $+15$.",
     "The factor should be multiplied by the terms, not added to them.",
     "The distributive law: $3 \\cdot 4x - 3 \\cdot 5 = 12x - 15$."
    ]
   },
   {
    "question": "How many multiplications are done when $(a + b)(c + d)$ is expanded?",
    "choices": [
     "One",
     "Four",
     "Three",
     "Two"
    ],
    "correct": 1,
    "why": [
     "A single multiplication is enough only when both brackets contain one term each.",
     "Each term in the first bracket is multiplied by each term in the second: $ac$, $ad$, $bc$ and $bd$, four in total.",
     "There is one term for each pair, and there are four pairs.",
     "Two multiplications ($ac + bd$) miss the cross terms $ad$ and $bc$."
    ]
   },
   {
    "question": "What is the first step when $10 - (x - 2)(x - 3)$ is to be simplified?",
    "choices": [
     "Remove the brackets straight away",
     "Change the signs of the terms in the first bracket",
     "Expand the pair of brackets but keep one large bracket around the result",
     "Multiply the 10 into the brackets"
    ],
    "correct": 2,
    "why": [
     "If the brackets are removed, the effect of the minus sign is lost on every term except the first.",
     "The change of sign is done on the EXPANDED expression, not on one of the brackets beforehand.",
     "Expand $(x-2)(x-3)$ inside one large bracket. The minus sign in front should then change the sign of every term in it.",
     "The 10 is a term (with subtraction after it), not a factor, so it should not be multiplied in."
    ]
   }
  ]
 },
 "ma1c-2.4": {
  "kalla": "17115cf6be",
  "data": [
   {
    "question": "What does it mean to **factorise** an expression?",
    "choices": [
     "To write the expression as a multiplication",
     "To remove all the brackets",
     "To add like terms together",
     "To work out the value of the expression"
    ],
    "correct": 0,
    "why": [
     "Factorising rewrites the expression as a product of factors, for example $27x^2 - 18x = 9x(3x - 2)$.",
     "That is the opposite, expanding: factorising CREATES brackets.",
     "That is simplifying. Factorising is about taking out common factors.",
     "The value is calculated when the variable is given a number. Factorising only changes the form of the expression."
    ]
   },
   {
    "question": "What is the greatest common factor in $27x^2 - 18x$?",
    "choices": [
     "$9x$",
     "$9$",
     "$3x$",
     "$x$"
    ],
    "correct": 0,
    "why": [
     "The coefficients 27 and 18 are both divisible by 9, and the lowest power of $x$ is $x$: together $9x$.",
     "9 is right for the coefficients, but both terms also contain $x$.",
     "3 is a common divisor but not the greatest: 9 divides both 27 and 18.",
     "$x$ can be taken out, but the coefficients also have a common factor, 9."
    ]
   },
   {
    "question": "Factorise $15x - 10$.",
    "choices": [
     "$5x(3 - 2)$",
     "$5(3x - 2)$",
     "$15(x - 10)$",
     "$5(3x - 10)$"
    ],
    "correct": 1,
    "why": [
     "The constant term 10 contains no $x$, so $x$ cannot be taken out.",
     "The greatest common divisor of 15 and 10 is 5: $15x - 10 = 5(3x - 2)$.",
     "15 does not divide 10. Check by multiplying: $15x - 150$ is wrong.",
     "Check by multiplying: $5 \\cdot 3x - 5 \\cdot 10 = 15x - 50$, not $15x - 10$."
    ]
   },
   {
    "question": "What is the easiest way to check that a factorisation is correct?",
    "choices": [
     "By setting $x = 0$ in both expressions",
     "A factorisation cannot be checked",
     "By multiplying the factors together and comparing with the original expression",
     "By differentiating both expressions"
    ],
    "correct": 2,
    "why": [
     "$x = 0$ only checks the constant term. The equality must hold for ALL $x$, and the test misses, for example, errors in the $x$-coefficient.",
     "It can easily be checked: the check is an ordinary expansion of the brackets.",
     "Factorising is \"the distributive law backwards\": multiply back in and see that the original expression returns.",
     "Differentiation belongs to later levels, and multiplication is both simpler and sufficient."
    ]
   },
   {
    "question": "Factorise $x(x + 5) + 2(x + 5)$.",
    "choices": [
     "$2x(x + 5)$",
     "$(x + 5)(2x)$",
     "$x^2 + 7x + 10$",
     "$(x + 5)(x + 2)$"
    ],
    "correct": 3,
    "why": [
     "The terms are added, not multiplied. Check: $2x(x + 5) = 2x^2 + 10x$, which is not the original expression.",
     "What remains of the terms when $(x + 5)$ has been taken out is $x$ and 2, and they should be added in the new bracket, not multiplied.",
     "That is the expression expanded, that is, written without brackets. Factorising goes the other way: the expression should be written as a multiplication.",
     "The bracket $(x + 5)$ is in both terms and is a common factor. What remains is $x$ from the first term and 2 from the second: $(x + 5)(x + 2)$."
    ]
   },
   {
    "question": "Let $k$ be an integer. Which expression always describes an odd number?",
    "choices": [
     "$2k$",
     "$k + 1$",
     "$2k + 1$",
     "$k^2$"
    ],
    "correct": 2,
    "why": [
     "$2k$ is 2 times an integer, so always an even number.",
     "$k + 1$ is odd when $k$ is even but even when $k$ is odd, so the expression does not always describe an odd number.",
     "$2k$ is always even, and one step after an even number comes an odd one. That is why $2k + 1$ is always odd.",
     "$k^2$ is odd when $k$ is odd and even when $k$ is even, for example $2^2 = 4$."
    ]
   }
  ]
 },
 "ma1c-2.5": {
  "kalla": "e6a9643200",
  "data": [
   {
    "question": "What is the basic principle of solving equations?",
    "choices": [
     "You always start by dividing both sides",
     "The variable must always be on the left-hand side",
     "Whatever you do on one side of the equals sign, you must also do on the other side",
     "You test different values of the variable until the equation is true"
    ],
    "correct": 2,
    "why": [
     "Which operation comes first depends on the equation. Often terms are removed before factors.",
     "The variable may be anywhere. The only goal is that it ends up on its own.",
     "The equality is kept only if both sides are treated the same: that is the whole balance principle.",
     "Trial and error is explicitly not allowed when solving equations: the solution must be derived."
    ]
   },
   {
    "question": "Which operation solves the equation $x - 24 = 72$?",
    "choices": [
     "Multiply both sides by 24",
     "Divide both sides by 24",
     "Add 24 to both sides",
     "Subtract 24 from both sides"
    ],
    "correct": 2,
    "why": [
     "Multiplication removes a denominator, not a term.",
     "Division removes a factor, not a term.",
     "To remove a term that is subtracted, add it to both sides: $x = 72 + 24 = 96$.",
     "Then the left-hand side becomes $x - 48$: the term does not disappear."
    ]
   },
   {
    "question": "Solve the equation $9x = 63$.",
    "choices": [
     "$x = 54$",
     "$x = 72$",
     "$x = 7$",
     "$x = 567$"
    ],
    "correct": 2,
    "why": [
     "54 is $63 - 9$, but the 9 is a factor and should be divided away, not subtracted.",
     "72 is $63 + 9$: the wrong operation.",
     "The factor 9 is removed by dividing both sides by 9: $x = \\dfrac{63}{9} = 7$.",
     "567 is $63 \\cdot 9$: multiplication is the opposite of what is needed here."
    ]
   },
   {
    "question": "How do you check that $x = 7$ solves the equation $4x + 7 = 35$?",
    "choices": [
     "Differentiate both sides",
     "Substitute 7 for $x$ and check that the left-hand side equals the right-hand side",
     "Solve the equation once more in a different way",
     "Check that 7 is an integer"
    ],
    "correct": 1,
    "why": [
     "Differentiation does not belong in checking an equation: substitution is what counts.",
     "$\\mathrm{LHS} = 4 \\cdot 7 + 7 = 35 = \\mathrm{RHS}$. The equality holds, so the solution is correct.",
     "That may work but is roundabout. Substituting into the original equation is enough.",
     "Solutions do not have to be integers. For example, $\\dfrac{7x}{6} - 15 = -11$ has the solution $x = \\dfrac{24}{7}$."
    ]
   },
   {
    "question": "The equation $\\dfrac{7x}{6} - 15 = -11$ has the solution $x = \\dfrac{24}{7}$. How should the answer be given?",
    "choices": [
     "Rounded to 3",
     "Exactly, as the fraction $\\dfrac{24}{7}$: do not round",
     "As the mixed number $3\\dfrac{3}{7}$, always",
     "Rounded to 3.4"
    ],
    "correct": 1,
    "why": [
     "Rounding to a whole number throws away even more information.",
     "Fraction form is exact. A rounded decimal is only an approximate value and makes the answer worse.",
     "A mixed number is allowed for reading off, but fraction form is standard, and above all the requirement is NOT to round.",
     "3.4 is an approximate value. The exact answer $\\dfrac{24}{7}$ should be kept."
    ]
   },
   {
    "question": "Which of the equations is a linear (first-degree) equation, and what is its solution called?",
    "choices": [
     "$x^2 - 5x + 4 = 0$, and the solution is called the exponent",
     "$x^2 - 5x + 4 = 0$, and the solution is called the root",
     "$3x + 2 = 23$, and the solution is called the term",
     "$3x + 2 = 23$, and the solution is called the root"
    ],
    "correct": 3,
    "why": [
     "There the highest exponent of the variable is 2, so it is a quadratic equation. Besides, the exponent is a number in a power, not a solution.",
     "Root is the right word for a solution, but $x^2 - 5x + 4 = 0$ has 2 as the highest exponent of the variable and is a quadratic equation.",
     "The equation is right: $x$ means $x^1$, so the highest exponent is 1. But a term is part of an expression, not a solution.",
     "In $3x + 2 = 23$ the highest exponent of the variable is 1, and the solution of an equation is called a root. Here the root is $x = 7$."
    ]
   }
  ]
 },
 "ma1c-2.6": {
  "kalla": "b1ba10a659",
  "data": [
   {
    "question": "What is the first step when an equation has variables on **both** sides, for example $2x + 8 = 9x - 20$?",
    "choices": [
     "Divide both sides by $x$",
     "Collect the variable terms on one side of the equals sign",
     "Try different values of $x$",
     "Swap the left-hand and right-hand sides"
    ],
    "correct": 1,
    "why": [
     "Dividing by $x$ is risky ($x$ may be 0) and does not solve the problem with the terms.",
     "Remove the variable term with the smallest coefficient from its side. Here $2x$ is subtracted from both sides.",
     "Trial and error is not allowed when solving equations: the solution must be derived step by step.",
     "That changes nothing essential: the variables are still on both sides."
    ]
   },
   {
    "question": "According to the lesson, from which side should the variable term be removed?",
    "choices": [
     "It makes no difference to the result, but the smallest coefficient is usually simplest",
     "Always from the right-hand side",
     "Always from the left-hand side",
     "From the side where the variable term has the smallest coefficient"
    ],
    "correct": 3,
    "why": [
     "The result is of course the same either way, but the lesson's recommendation is precisely the smallest coefficient, so the alternative that names that side is more precise.",
     "The same applies there: it is the size of the coefficient that decides, not the side.",
     "The left-hand side may just as well have the largest coefficient, and then it is better to remove the term on the right-hand side.",
     "Then the remaining coefficient is positive and the calculation is simplest. For example, $2x$ is removed from $2x + 8 = 9x - 20$."
    ]
   },
   {
    "question": "Solve the equation $6x + 4 = 2x + 24$.",
    "choices": [
     "$x = 2.5$",
     "$x = 5$",
     "$x = 7$",
     "$x = 3.5$"
    ],
    "correct": 1,
    "why": [
     "Check: $6 \\cdot 2.5 + 4 = 19$ but $2 \\cdot 2.5 + 24 = 29$, which are not equal.",
     "Subtract $2x$: $4x + 4 = 24$. Subtract 4: $4x = 20$. Divide by 4: $x = 5$.",
     "You get 7 if the 4 is added instead of subtracted. Check the steps.",
     "You get 3.5 if $2x$ is added instead of subtracted ($8x = 28$)."
    ]
   },
   {
    "question": "The equation $3(7x - 4) = 7(9 + 3x)$ simplifies to $-12 = 63$. What is the conclusion?",
    "choices": [
     "$x = -12$ or $x = 63$",
     "$x = 75$",
     "The equation has no solution",
     "Every number solves the equation"
    ],
    "correct": 2,
    "why": [
     "The numbers −12 and 63 are not solutions: they are what is left of the constant terms after simplifying.",
     "There is no step that gives 75: the equality is false whatever $x$ is.",
     "When the variable terms cancel each other out and a false equality remains, there is no $x$ that makes the equation true.",
     "That would have required a TRUE equality (such as $0 = 0$) after the variables disappeared."
    ]
   },
   {
    "question": "The equation $(1 + 4x)(3x - 2) = x(12x - 6)$ is expanded to $3x - 2 + 12x^2 - 8x = 12x^2 - 6x$. What happens to $12x^2$?",
    "choices": [
     "The term is on both sides and disappears when $12x^2$ is subtracted from both sides",
     "The term must be moved to the right-hand side and gives a quadratic equation",
     "The equation has no solution because $x^2$ occurs",
     "You divide both sides by $12x^2$"
    ],
    "correct": 0,
    "why": [
     "What remains is $-5x - 2 = -6x$, an ordinary linear equation with the solution $x = 2$.",
     "The term is already on both sides with the same coefficient, so it cancels itself out instead of being moved.",
     "That $x^2$ appears means nothing in itself. What matters is that the term is the same on both sides.",
     "Dividing by a variable term is risky (it may be 0) and is not needed here."
    ]
   },
   {
    "question": "When Maja solves the equation $6x + 5 = 6x - 1$, $x$ disappears completely and $5 = -1$ is left. What does that mean?",
    "choices": [
     "The equation has no solution, since the equality is false whatever value $x$ has",
     "Maja has made a mistake: the variable can never disappear from an equation",
     "The solution is $x = 0$, since there is no $x$-term left",
     "The equation has infinitely many solutions"
    ],
    "correct": 0,
    "why": [
     "If $6x$ is subtracted from both sides, only $5 = -1$ is left. That statement is false whatever $x$ is, so no number solves the equation.",
     "The variable disappearing is not a calculation error. It happens when the same variable term is on both sides, and that is exactly what an equation with no solution or with infinitely many solutions looks like.",
     "That $x$ is not visible does not mean that $x = 0$. Try: $6 \\cdot 0 + 5 = 5$ but $6 \\cdot 0 - 1 = -1$, and the sides are not equal.",
     "The equation has infinitely many solutions only if the equality that remains is true, such as $5 = 5$. Here it is false."
    ]
   },
   {
    "question": "Which of the equations has infinitely many solutions?",
    "choices": [
     "$2x + 6 = 2x + 4$",
     "$2x + 6 = 6$",
     "$2x + 6 = 3x + 6$",
     "$2(x + 3) = 2x + 6$"
    ],
    "correct": 3,
    "why": [
     "If $2x$ is subtracted from both sides, $6 = 4$ is left, a false equality. The equation has no solution.",
     "If 6 is subtracted from both sides, you get $2x = 0$, so exactly one solution: $x = 0$.",
     "If $2x$ is subtracted from both sides, you get $6 = x + 6$ and then $x = 0$. Exactly one solution.",
     "If the 2 is multiplied into the bracket, you get $2x + 6 = 2x + 6$: both sides are the same expression, so the equality is true for every number $x$."
    ]
   }
  ]
 },
 "ma1c-2.7": {
  "kalla": "63242c10fc",
  "data": [
   {
    "question": "Which values of $x$ are not allowed in the equation $\\dfrac{9}{2x} = \\dfrac{3}{8}$?",
    "choices": [
     "$x \\neq 0$",
     "All values are allowed",
     "$x \\neq 8$",
     "$x \\neq 2$"
    ],
    "correct": 0,
    "why": [
     "The denominator $2x$ must not be 0, and $2x = 0$ exactly when $x = 0$.",
     "The variable is in a denominator, so values that make the denominator zero must be excluded.",
     "8 is in a denominator but contains no variable: it can never be 0.",
     "$x = 2$ gives the denominator $2 \\cdot 2 = 4 \\neq 0$, which is perfectly allowed."
    ]
   },
   {
    "question": "Which method is suitable when there is ONE fraction term on each side, for example $\\dfrac{9}{2x} = \\dfrac{3}{8}$?",
    "choices": [
     "Cross-multiplication",
     "Trial and error",
     "Squaring both sides",
     "Factorising"
    ],
    "correct": 0,
    "why": [
     "The numerator of one fraction is multiplied by the denominator of the other and vice versa: $3 \\cdot 2x = 9 \\cdot 8$.",
     "Trial and error is not allowed when solving equations.",
     "Squaring belongs to radical equations. Here it would only make the expressions more complicated.",
     "There are no common factors to take out that solve the problem with the denominators."
    ]
   },
   {
    "question": "What do you multiply both sides by to solve $\\dfrac{x}{3} + \\dfrac{1}{4} = \\dfrac{5}{6}$ using the LCD method?",
    "choices": [
     "13",
     "6",
     "12",
     "72"
    ],
    "correct": 2,
    "why": [
     "13 is not divisible by any of the denominators.",
     "6 is not divisible by 4: the fraction $\\dfrac{1}{4}$ would not become a whole number.",
     "12 is the smallest number divisible by 3, 4 and 6. The multiplication gives $4x + 3 = 10$.",
     "72 works (all the denominators divide 72) but is not the LOWEST common denominator: the numbers become unnecessarily large."
    ]
   },
   {
    "question": "Working through the equation $\\dfrac{5x - 35}{x - 7} = 4$ gives $x = 7$. What is the conclusion?",
    "choices": [
     "The equation has no solution, since $x = 7$ makes the denominator 0",
     "The solution is $x = 7$",
     "The solution is $x = -7$",
     "The equation has infinitely many solutions"
    ],
    "correct": 0,
    "why": [
     "The candidate value clashes with the condition $x \\neq 7$ that was set up before solving, so there is no solution.",
     "$x = 7$ gives the denominator $7 - 7 = 0$. Division by 0 is not defined, so the value is forbidden.",
     "Changing the sign does not help: substituting $-7$ gives $\\dfrac{-70}{-14} = 5 \\neq 4$.",
     "A false equality without variables would have been needed for \"no solution\" in that way. Here the problem is instead the forbidden value."
    ]
   }
  ]
 },
 "ma1c-2.8": {
  "kalla": "f2df327957",
  "data": [
   {
    "question": "What are the three steps in the method for solving problems with equations, in the right order?",
    "choices": [
     "Solve the equation → translate → answer",
     "Guess → check → adjust",
     "Translate → solve the equation → interpret and answer",
     "Draw a figure → measure → calculate"
    ],
    "correct": 2,
    "why": [
     "The equation cannot be solved before it exists: the translation comes first.",
     "Guess and adjust is trial and error, which is not allowed when solving equations.",
     "First a notation is introduced and an equation set up, then the equation is solved, and finally the answer is interpreted with a unit and a reasonableness check.",
     "Figures can help, but the method is based on translating into an equation."
    ]
   },
   {
    "question": "What should you let $x$ stand for in a problem-solving task?",
    "choices": [
     "The first number mentioned",
     "What the task asks for",
     "The largest number in the task",
     "Always the time"
    ],
    "correct": 1,
    "why": [
     "The order in the text does not matter: it is the question that decides.",
     "Call what you are looking for $x$. Then the solution of the equation is directly the answer to the question. Write down what $x$ means!",
     "The size of the numbers has nothing to do with the choice.",
     "Time is just one of many possible quantities."
    ]
   },
   {
    "question": "Rayan gets twice as much as Arielle, who gets $x$ kr. Samuel gets 300 kr less than Rayan. Which expression describes Samuel's amount?",
    "choices": [
     "$2x - 300$",
     "$2(x - 300)$",
     "$2x + 300$",
     "$x - 300$"
    ],
    "correct": 0,
    "why": [
     "Rayan gets $2x$ kr, and Samuel gets 300 kr less than that: $2x - 300$.",
     "The subtraction is done after the doubling: 300 kr is taken from Rayan's amount, not from Arielle's before doubling.",
     "\"Less than\" means subtraction, not addition.",
     "Samuel is compared with Rayan (who gets $2x$), not with Arielle."
    ]
   },
   {
    "question": "Why does problem solving end with asking \"is the answer reasonable?\"",
    "choices": [
     "To avoid having to check the equation",
     "To be able to round the answer correctly",
     "It is just a polite phrase",
     "A reasonableness check reveals translation and calculation errors, for example an age of 500 years"
    ],
    "correct": 3,
    "why": [
     "On the contrary: the reasonableness check is part of the checking, and substituting into the equation is still good.",
     "Rounding is governed by significant figures. Reasonableness is about order of magnitude and context.",
     "The reasonableness check is a real check of the whole chain, not a formality.",
     "If the answer is unreasonable in its context, something has gone wrong in the translation or the solution, and the interpretation step catches it."
    ]
   }
  ]
 },
 "ma1c-2.9": {
  "kalla": "2d2c767081",
  "data": [
   {
    "question": "What determines the **degree** of an equation?",
    "choices": [
     "The size of the constant term",
     "The variable term with the highest exponent",
     "The number of solutions",
     "The number of terms in the equation"
    ],
    "correct": 1,
    "why": [
     "The constant term does not affect the degree at all.",
     "The highest exponent of the variable gives the degree: $x^2 + 7 = 11$ is of degree 2 and $x^3 - 8 = 1$ of degree 3.",
     "The number of solutions is linked to the degree but does not define it.",
     "An equation can have many terms and still be of the first degree."
    ]
   },
   {
    "question": "How many solutions does the equation $x^2 = 49$ have?",
    "choices": [
     "One: $x = 7$",
     "Two: $x = 7$ and $x = -7$",
     "Four",
     "None"
    ],
    "correct": 1,
    "why": [
     "The negative solution is easily forgotten, but $(-7)^2 = 49$ too.",
     "The square of both 7 and −7 is 49, so $x = \\pm 7$.",
     "A quadratic equation has at most two solutions.",
     "Solutions are missing only when the right-hand side is negative, for example $x^2 = -9$."
    ]
   },
   {
    "question": "What is true of the equation $x^3 = -8$?",
    "choices": [
     "It has the solution $x = -2$",
     "It has no solution, since the right-hand side is negative",
     "It has the solution $x = 2$",
     "It has the solutions $x = \\pm 2$"
    ],
    "correct": 0,
    "why": [
     "$(-2)^3 = (-2)(-2)(-2) = -8$: the cubic equation has exactly this solution.",
     "That applies to $x^2$. But the cube root of negative numbers works: three minus signs multiplied together give minus.",
     "$2^3 = 8$, with the wrong sign: the solution is negative.",
     "The ± pair belongs to even exponents: $2^3 = +8$, not $-8$."
    ]
   },
   {
    "question": "A square has the area $196\\ \\mathrm{cm^2}$. The equation $x^2 = 196$ gives $x = \\pm 14$. What is the side of the square?",
    "choices": [
     "98 cm: the area is divided by 2",
     "49 cm: the area is divided by 4",
     "14 cm: the negative solution is rejected since a side cannot be negative",
     "±14 cm: both solutions should be given"
    ],
    "correct": 2,
    "why": [
     "The area is the side squared, not the side times 2.",
     "Dividing by 4 belongs to the perimeter ($O = 4x$), not the area.",
     "Mathematically the equation has two solutions, but in the context only the positive one is reasonable: a length cannot be negative.",
     "In a geometric application the answer is interpreted: a negative side length is unreasonable and is rejected."
    ]
   }
  ]
 },
 "ma1c-2.10": {
  "kalla": "71e8ef3942",
  "data": [
   {
    "question": "What is an equation where the variable is raised to a power, for example $x^{14} = 80\\ 000$, called?",
    "choices": [
     "Quadratic equation",
     "Radical equation",
     "Power equation",
     "Exponential equation"
    ],
    "correct": 2,
    "why": [
     "The quadratic equation is the special case $n = 2$. Here the exponent is 14.",
     "Roots are used to SOLVE power equations, but that is not the name of the equation.",
     "The variable is the base of a power (\"raised to something\"): a power equation.",
     "In an exponential equation the variable is in the EXPONENT (for example $2^x = 8$). Here it is the base."
    ]
   },
   {
    "question": "What is the solution of $x^n = a$ written with the laws of exponents?",
    "choices": [
     "$x = a^{1/n}$",
     "$x = \\dfrac{a}{n}$",
     "$x = a^n$",
     "$x = n^a$"
    ],
    "correct": 0,
    "why": [
     "Raise both sides to the inverse of the exponent, $\\dfrac{1}{n}$: $(x^n)^{1/n} = x^1 = a^{1/n}$.",
     "The exponent is not a factor: it cannot be divided away.",
     "That raises in the wrong direction: the exponent then grows to $n^2$.",
     "The base and the exponent have swapped places."
    ]
   },
   {
    "question": "How many solutions does $x^4 = 0$ have?",
    "choices": [
     "Two: $x = \\pm\\sqrt[4]{0}$",
     "Four",
     "One: $x = 0$",
     "None"
    ],
    "correct": 2,
    "why": [
     "±0 are not two different numbers: the solution is just $x = 0$.",
     "The degree gives the highest possible number, not the actual one.",
     "An even exponent generally gives two solutions, but here they coincide: $+0$ and $-0$ are the same number.",
     "There certainly is a solution: $0^4 = 0$."
    ]
   },
   {
    "question": "What is the first step when the equation $x^{2/5} = 10$ is to be solved?",
    "choices": [
     "Take the square root of both sides",
     "Raise both sides to the power of the denominator of the exponent, 5",
     "Divide both sides by 2/5",
     "Multiply both sides by 5"
    ],
    "correct": 1,
    "why": [
     "The square root comes in a LATER step, when the equation has become $x^2 = 100\\ 000$.",
     "Then the denominator in the exponent disappears: $(x^{2/5})^5 = x^2 = 10^5$. Of $x = \\pm\\sqrt{100\\ 000}$ only the positive root is then valid, since a fraction in the exponent requires a positive $x$.",
     "The exponent is not a coefficient: division does not change the power.",
     "Multiplying the sides only changes the numbers, not the exponent of $x$."
    ]
   },
   {
    "question": "Why does $x^{99} = -5$ have exactly one solution?",
    "choices": [
     "Since 99 is large there is only one solution",
     "Since −5 is negative there are no solutions",
     "Power equations with an odd exponent always have exactly one solution",
     "All power equations have exactly one solution"
    ],
    "correct": 2,
    "why": [
     "The size of the exponent does not matter: it is whether it is odd or even that decides.",
     "That applies to EVEN exponents. With an odd exponent, negative right-hand sides work perfectly well.",
     "Odd powers keep the sign: a negative number raised to 99 is negative, so there is exactly one $x$ that works.",
     "Even exponents can give two, one or no solutions. It is odd exponents that always give one."
    ]
   }
  ]
 },
 "ma1c-2.11": {
  "kalla": "22225b2966",
  "data": [
   {
    "question": "What distinguishes an inequality from an equation?",
    "choices": [
     "The inequality contains no variables",
     "The inequality always has exactly one solution",
     "The inequality has an inequality sign (<, >, ≤, ≥) instead of an equals sign",
     "The inequality cannot be solved"
    ],
    "correct": 2,
    "why": [
     "Inequalities usually contain variables, just like equations.",
     "On the contrary: the solution is usually a whole interval of numbers, for example $x < 9$.",
     "$3x - 4 = 2$ is an equation; $3x - 4 < 2$ is an inequality. The difference is the sign between the sides.",
     "Inequalities are solved almost exactly like equations."
    ]
   },
   {
    "question": "Solve the inequality $-2x > 10$.",
    "choices": [
     "$x > -5$",
     "$x > 5$",
     "$x < 5$",
     "$x < -5$"
    ],
    "correct": 3,
    "why": [
     "When dividing by the negative number −2, the inequality sign must be reversed.",
     "Both the sign of the 5 and the inequality sign have been handled wrongly. Check with, for example, $x = -6$: $-2 \\cdot (-6) = 12 > 10$ holds.",
     "The right-hand side becomes $-5$, not 5, in the division.",
     "Divide by −2 and reverse the sign: $x < \\dfrac{10}{-2} = -5$."
    ]
   },
   {
    "question": "Why is the inequality sign reversed when multiplying by a negative number?",
    "choices": [
     "The order of the numbers on the number line is mirrored: for example $5 > 3$ but $-5 < -3$",
     "The sign is really only reversed when dividing, not when multiplying",
     "Because negative numbers cannot be compared",
     "It is a pure convention without a mathematical basis"
    ],
    "correct": 0,
    "why": [
     "Multiplying by a negative number mirrors the number line about 0: the larger number ends up to the left, so the sign must be reversed.",
     "The rule applies to both multiplication and division by negative numbers.",
     "Negative numbers can be compared perfectly well: it is the direction of the comparison itself that changes.",
     "The investigation with $5 > 3$ shows that the rule is necessary, not a convention."
    ]
   },
   {
    "question": "How is the solution of $x^2 < 9$ described?",
    "choices": [
     "$x < \\pm 3$",
     "$-3 < x < 3$",
     "$x < 3$",
     "$x < -3$ and $x > 3$"
    ],
    "correct": 1,
    "why": [
     "The notation $x < \\pm 3$ is not well defined. The interval is written $-3 < x < 3$.",
     "The boundary case $x^2 = 9$ gives $x = \\pm 3$, and the square is less than 9 for all numbers BETWEEN the boundaries.",
     "$x = -5 < 3$ but $(-5)^2 = 25 > 9$: the negative side must also be bounded.",
     "That is the solution of the REVERSE inequality $x^2 > 9$."
    ]
   }
  ]
 },
 "ma1c-2.12": {
  "kalla": "9c9acf5b15",
  "data": [
   {
    "question": "What is a **formula**?",
    "choices": [
     "An equation that describes a relationship between different quantities",
     "A number that never changes",
     "A list of units",
     "A rule for how to use the calculator"
    ],
    "correct": 0,
    "why": [
     "For example, $v = \\dfrac{s}{t}$ describes the relationship between the quantities velocity, distance and time.",
     "That rather describes a constant: formulas contain variables.",
     "Units are important in formulas, but the formula is the relationship itself.",
     "Formulas are mathematical relationships, not instructions for use."
    ]
   },
   {
    "question": "Solve the formula $v = \\dfrac{s}{t}$ for $t$.",
    "choices": [
     "$t = s - v$",
     "$t = s \\cdot v$",
     "$t = \\dfrac{v}{s}$",
     "$t = \\dfrac{s}{v}$"
    ],
    "correct": 3,
    "why": [
     "Quantities with different units cannot be subtracted.",
     "It is the distance that is the product: $s = v \\cdot t$.",
     "The expression is upside down: the time increases with the distance, not the other way round.",
     "Multiply both sides by $t$ ($s = vt$) and then divide by $v$: $t = \\dfrac{s}{v}$."
    ]
   },
   {
    "question": "The formula $H = 21\\ 000 + 2.5m$ applies with $m$ in kilometres. What must you do before substituting a distance driven of 2 000 Swedish miles (mil)?",
    "choices": [
     "Convert the cost to euros",
     "Divide the distance by 10",
     "Convert the distance to kilometres: 2 000 mil = 20 000 km",
     "Nothing: mil and kilometres are the same thing"
    ],
    "correct": 2,
    "why": [
     "The currency has nothing to do with the formula.",
     "It is exactly the opposite: the number of mil is MULTIPLIED by 10 to give kilometres.",
     "The formula's $m$ is defined in kilometres. 1 mil = 10 km, so $m = 20\\ 000$.",
     "A mil is 10 km: without converting, the cost becomes ten times too low."
    ]
   },
   {
    "question": "How far can you drive for 30 000 kr if $H = 21\\ 000 + 2.5m$?",
    "choices": [
     "360 km",
     "9 000 km",
     "3 600 km",
     "12 000 km"
    ],
    "correct": 2,
    "why": [
     "360 is the answer in MIL (Swedish miles). In kilometres it is 3 600.",
     "9 000 is the kronor left after the fixed cost. They should be divided by 2.5 kr/km.",
     "Substituting $H = 30\\ 000$ gives $9\\ 000 = 2.5m$, that is, $m = 3\\ 600$ km (360 mil).",
     "12 000 would be $30\\ 000/2.5$: the fixed cost of 21 000 kr must be subtracted first."
    ]
   }
  ]
 },
 "ma1c-2.13": {
  "kalla": "54bd125ecd",
  "data": [
   {
    "question": "What are the numbers in a sequence called?",
    "choices": [
     "Denominators",
     "Coefficients",
     "Factors",
     "Terms"
    ],
    "correct": 3,
    "why": [
     "The denominator is the lower part of a fraction.",
     "A coefficient is the number in front of a variable in an expression.",
     "Factors are the parts of a multiplication.",
     "The numbers in a sequence are called terms (elements) and are written $a_n$, where $n$ is the position number."
    ]
   },
   {
    "question": "What does $a_3 = 11$ mean in a sequence?",
    "choices": [
     "Term number 11 is 3",
     "The third term of the sequence is 11",
     "The sequence has 3 terms that are 11",
     "The sequence ends at 11"
    ],
    "correct": 1,
    "why": [
     "The order is reversed: the index is the position number and the value comes after the equals sign.",
     "The index 3 is the position number: the third number in the sequence is 11.",
     "The notation picks out ONE term, the one with position number 3.",
     "Sequences often go on for ever, which is marked by three dots (…)."
    ]
   },
   {
    "question": "The sequence 3, 7, 11, 15, … increases by 4 at each step. Why is the formula $a_n = 4n - 1$ and not $a_n = 4n$?",
    "choices": [
     "Because the sequence starts with an odd number",
     "You always subtract 1 in closed formulas",
     "The formula $a_n = 4n$ is also correct",
     "The test $n = 1$ gives $4 \\cdot 1 = 4$, which is 1 too many, so 1 is subtracted"
    ],
    "correct": 3,
    "why": [
     "Odd or even does not decide the constant: the difference between $4 \\cdot 1$ and $a_1$ does.",
     "The adjustment depends entirely on the sequence: 6, 10, 14 … instead requires $+2$.",
     "No: $a_1 = 4 \\cdot 1 = 4 \\neq 3$. The formula must hold for all the terms.",
     "The increase gives the term $4n$; the constant is found by testing against $a_1 = 3$, and $4n$ alone gives 4, so 1 is subtracted."
    ]
   },
   {
    "question": "A pattern has the formula $a_n = 3n + 1$. How many dots are there in figure 1 000?",
    "choices": [
     "4 000",
     "1 003",
     "3 001",
     "3 000"
    ],
    "correct": 2,
    "why": [
     "4 000 would be $4n$: the wrong coefficient.",
     "The coefficient 3 is multiplied by $n$, not by 1.",
     "Substitution: $a_{1000} = 3 \\cdot 1\\ 000 + 1 = 3\\ 001$. That is the whole point of a closed formula.",
     "The 1 in the formula must not be forgotten: $3n + 1$, not $3n$."
    ]
   }
  ]
 },
 "ma1c-3.1": {
  "kalla": "05e4ce295a",
  "data": [
   {
    "question": "What does **per mille** mean?",
    "choices": [
     "Thousandths",
     "Millionths",
     "Tenths",
     "Hundredths"
    ],
    "correct": 0,
    "why": [
     "1 ‰ = 1/1 000 = 0.001: per mille means thousandths.",
     "Millionths are ppm (parts per million).",
     "Tenths have no symbol of their own in this system.",
     "Hundredths are per cent (%)."
    ]
   },
   {
    "question": "How is a proportion calculated?",
    "choices": [
     "proportion = part · whole",
     "proportion = part − whole",
     "proportion = part/whole",
     "proportion = whole/part"
    ],
    "correct": 2,
    "why": [
     "The multiplication gives the part when the proportion and the whole are known: part = proportion · whole.",
     "A difference compares sizes in the same unit. A proportion is a quotient.",
     "The proportion is the part divided by the whole, and it is given in fraction or decimal form.",
     "Upside down: then the proportion is greater than 1 as soon as the part is smaller than the whole."
    ]
   },
   {
    "question": "What must you check before calculating the proportion that 120 g is of 15 kg?",
    "choices": [
     "That the part and the whole have the same unit",
     "That the answer is in per cent",
     "That both numbers are integers",
     "That the part is larger than the whole"
    ],
    "correct": 0,
    "why": [
     "Convert to the same unit first: 15 kg = 15 000 g, then the proportion is 120/15 000 = 0.008 = 8 ‰.",
     "The proportion can be expressed in per cent, per mille or ppm: it is chosen according to the question.",
     "Decimal numbers work perfectly well in proportion calculations.",
     "The part is normally smaller than the whole. Otherwise the proportion is more than 100 %."
    ]
   },
   {
    "question": "Write 5 ppm in decimal form.",
    "choices": [
     "0.5",
     "0.005",
     "0.000 05",
     "0.000 005"
    ],
    "correct": 3,
    "why": [
     "0.5 is 50 %, far from millionths.",
     "0.005 is 5 ‰: per mille, not ppm.",
     "One zero too few: millionths require six decimal places for 1 ppm.",
     "ppm means millionths: $5/1\\ 000\\ 000 = 0.000\\ 005$."
    ]
   },
   {
    "question": "How is the percentage triangle used?",
    "choices": [
     "Cover the quantity you are looking for: the remaining ones show the formula",
     "It shows that all three quantities are always added",
     "It gives the answer without calculation",
     "It only works for per cent, not per mille"
    ],
    "correct": 0,
    "why": [
     "If you cover, for example, \"part\", \"proportion · whole\" is left side by side: multiplication. If you cover \"proportion\", the part is ABOVE the whole: division.",
     "The triangle encodes multiplication and division, not addition.",
     "The triangle gives the formula. You do the calculation yourself.",
     "It works perfectly well for per mille and ppm too."
    ]
   }
  ]
 },
 "ma1c-3.2": {
  "kalla": "0e8ea1258c",
  "data": [
   {
    "question": "How is the multiplier (change factor) calculated?",
    "choices": [
     "new value minus old value",
     "new value plus old value",
     "old value divided by new value",
     "new value divided by old value"
    ],
    "correct": 3,
    "why": [
     "The difference gives the change in kronor (or another unit), not the multiplier.",
     "A sum of two prices says nothing about the change.",
     "Upside down: then an increase gets a multiplier less than 1.",
     "Multiplier = new value/old value, and conversely new value = multiplier · old value."
    ]
   },
   {
    "question": "Which multiplier corresponds to − 25 %?",
    "choices": [
     "0.75",
     "0.25",
     "1.25",
     "−0.25"
    ],
    "correct": 0,
    "why": [
     "$100\\ \\% - 25\\ \\% = 75\\ \\% = 0.75$.",
     "0.25 would be a decrease of 75 %: only a quarter left.",
     "1.25 corresponds to an INCREASE of 25 %.",
     "Multipliers are never negative: the decrease is encoded as a multiplier less than 1."
    ]
   },
   {
    "question": "A multiplier is 2.40. What does that mean?",
    "choices": [
     "The value has decreased by 40 %",
     "The value has increased by 24 %",
     "The value has increased by 240 %",
     "The value has increased by 140 %"
    ],
    "correct": 3,
    "why": [
     "Multipliers above 1 always mean an increase.",
     "An increase of 24 % gives the multiplier 1.24.",
     "An increase of 240 % would have given the multiplier 3.40.",
     "2.40 = 240 %, and compared with 100 % the increase is 140 %."
    ]
   },
   {
    "question": "In a percentage comparison, what corresponds to the \"old value\"?",
    "choices": [
     "What you compare with",
     "The largest value",
     "The mean of the two",
     "The smallest value"
    ],
    "correct": 0,
    "why": [
     "\"How many per cent more expensive than shop A?\" Then A's price is the old value. That explains why 22 % more expensive and 18 % cheaper can describe the same price difference.",
     "The reference for the comparison is chosen by the question, not by size.",
     "The mean is not used in percentage comparisons of this kind.",
     "The same thing: it is the \"compared with\" in the question that decides."
    ]
   },
   {
    "question": "A price increases from 175 kr to 231 kr. What is the increase in per cent?",
    "choices": [
     "24 %",
     "32 %",
     "56 %",
     "132 %"
    ],
    "correct": 1,
    "why": [
     "24 % would be the increase calculated on the NEW price. The increase is always calculated on the old one.",
     "The multiplier is $231/175 = 1.32 = 132\\ \\%$, that is, 32 % above 100 %.",
     "56 kr is the increase in KRONOR. As a percentage of 175 kr it is 32 %.",
     "132 % is the whole multiplier. The increase itself is what exceeds 100 %."
    ]
   },
   {
    "question": "After a reduction of 20 %, a jumper costs 360 kr. What did the jumper cost before the reduction?",
    "choices": [
     "288 kr",
     "432 kr",
     "450 kr",
     "300 kr"
    ],
    "correct": 2,
    "why": [
     "Here you have reduced 360 kr by 20 % once more. 360 kr is already the new price.",
     "Adding 20 % to 360 kr gives the wrong answer, since the reduction was calculated on the old price and not on 360 kr.",
     "The multiplier is 0.80, and old value = new value / multiplier = $360/0.80 = 450$ kr.",
     "Dividing by 1.20 would be removing an increase of 20 %, not a reduction."
    ]
   }
  ]
 },
 "ma1c-3.3": {
  "kalla": "0f47cae04b",
  "data": [
   {
    "question": "How do you get the total multiplier for repeated percentage changes?",
    "choices": [
     "The multipliers are multiplied",
     "The percentages are added and converted to a multiplier",
     "The largest multiplier is used",
     "The multipliers are added"
    ],
    "correct": 0,
    "why": [
     "Total multiplier = multiplier 1 · multiplier 2 · … Each change acts on the already changed value.",
     "+15 % followed by −15 % gives 0.9775 (−2.25 %), not 0 %: percentages cannot simply be added.",
     "All the changes have an effect: none can be skipped.",
     "Multipliers are never added: adding percentages is exactly the classic mistake."
    ]
   },
   {
    "question": "A price is raised by 15 % and then reduced by 15 %. What has happened in total?",
    "choices": [
     "The price has decreased by 15 %",
     "The price has decreased by 2.25 %",
     "The price is unchanged",
     "The price has increased by 2.25 %"
    ],
    "correct": 1,
    "why": [
     "The 15 % reduction only removed most of the increase, not a net 15 % of the original.",
     "$1.15 \\cdot 0.85 = 0.9775$: a decrease of 2.25 %, since the reduction is calculated on the raised price.",
     "It feels intuitive but is not true: 15 % of the raised price is more in kronor than 15 % of the original.",
     "The multiplier 0.9775 is BELOW 1: a decrease."
    ]
   },
   {
    "question": "Which expression gives the account balance after 18 years if 80 000 kr is deposited at 2.5 % annual interest?",
    "choices": [
     "$80\\ 000 + 1.025^{18}$",
     "$80\\ 000 \\cdot 1.025^{18}$",
     "$80\\ 000 \\cdot 0.025^{18}$",
     "$80\\ 000 \\cdot 1.025 \\cdot 18$"
    ],
    "correct": 1,
    "why": [
     "The multiplier should be multiplied by the amount, not added.",
     "The multiplier 1.025 is applied once a year: 18 times gives $1.025^{18}$.",
     "0.025 is the interest rate on its own. The multiplier is $1 + 0.025$.",
     "Multiplying by 18 gives something like simple interest gone wrong: a repeated change is a power, not a product with the number of years."
    ]
   },
   {
    "question": "Why does +15 % followed by −15 % not give 0 % in total?",
    "choices": [
     "The percentages are calculated on different values: the reduction is calculated on the already raised price",
     "It does give 0 % in total",
     "Increases always weigh more than decreases",
     "Rounding errors in the intermediate steps"
    ],
    "correct": 0,
    "why": [
     "15 % of the raised value is more in kronor than 15 % of the original, which is why you end up below the starting value.",
     "Check: 100 kr → 115 kr → 97.75 kr. Not back to 100.",
     "The order does not matter ($0.85 \\cdot 1.15$ is the same product). The asymmetry lies in the base changing.",
     "The effect is exact, not a rounding error: $1.15 \\cdot 0.85 = 0.9775$ exactly."
    ]
   }
  ]
 },
 "ma1c-3.4": {
  "kalla": "2dd043222d",
  "data": [
   {
    "question": "What does the **annual interest rate** on a savings account state?",
    "choices": [
     "How many kronor the account grows by each year",
     "How often you may deposit money",
     "How much the bank charges in fees",
     "By how many per cent the balance grows each year"
    ],
    "correct": 3,
    "why": [
     "The amount in kronor changes from year to year (compound interest). The percentage is the same.",
     "Interest is about growth, not about rules for deposits.",
     "Fees are something else: the interest is the growth.",
     "The annual interest rate is a percentage: each year the balance is multiplied by the multiplier 1 + the interest rate."
    ]
   },
   {
    "question": "What is the cell in column C on row 5 of a spreadsheet called?",
    "choices": [
     "C5",
     "R5K3",
     "5C",
     "C:5"
    ],
    "correct": 0,
    "why": [
     "The column letter is followed by the row number: C5.",
     "That notation is not used in ordinary spreadsheets.",
     "The order is always letter first, then row number.",
     "No colon is used in cell names. A colon instead indicates a RANGE, for example B3:B10."
    ]
   },
   {
    "question": "Why is the formula written as `=B2*$B$12` instead of `=B2*B12` before it is dragged down?",
    "choices": [
     "The dollar signs indicate that the value is in money",
     "It makes the calculation faster",
     "The dollar signs lock the reference to B12 so that all copies use the same multiplier cell",
     "Formulas do not work without dollar signs"
    ],
    "correct": 2,
    "why": [
     "The dollar sign in spreadsheet formulas is about cell references, not currency.",
     "The speed is not affected: it is correctness that is at stake.",
     "Without locking, the reference moves along when copied (B13, B14 …) and points to empty cells. With $B$12 every row uses the multiplier.",
     "The formula works, but gives wrong values when it is copied."
    ]
   },
   {
    "question": "You save 5 000 kr at the end of each year at 2.8 % interest. Which spreadsheet formula gives next year's balance from the previous one (cell B2)?",
    "choices": [
     "`=B2*1.028+5000`",
     "`=B2+5000`",
     "`=B2*0.028+5000`",
     "`=B2+5000*1.028`"
    ],
    "correct": 0,
    "why": [
     "The old amount grows by the multiplier 1.028 AND a new deposit of 5 000 kr is added.",
     "Without the multiplier no money grows: that is saving without interest.",
     "0.028 gives only the interest part itself. The balance requires the multiplier 1.028.",
     "Here only the new deposit earns interest. It is the other way round: it is the old amount that should grow."
    ]
   }
  ]
 },
 "ma1c-3.5": {
  "kalla": "f4561477c1",
  "data": [
   {
    "question": "What does each payment on a loan consist of?",
    "choices": [
     "Deposit and balance",
     "Interest only",
     "Repayment (amortisation) and interest",
     "Repayment only"
    ],
    "correct": 2,
    "why": [
     "Deposit and balance belong to savings accounts, not loans.",
     "With interest only, the debt never shrinks.",
     "The repayment pays off the debt itself and the interest is the cost of the loan. Both are included in the payment.",
     "With repayment only, the loan would be free: the interest is the price of the loan."
    ]
   },
   {
    "question": "What is meant by \"straight-line amortisation\"?",
    "choices": [
     "That the whole loan is paid at once",
     "Equal repayment amounts at each payment",
     "That no interest is paid",
     "Equal total payments every month"
    ],
    "correct": 1,
    "why": [
     "That would be a one-off payment, not a repayment plan.",
     "The debt is divided into equal parts. For example, 150 000 kr over 60 months gives a repayment of 2 500 kr every month. The total amount still falls, since the interest part shrinks.",
     "Interest is always paid on the current debt.",
     "That describes an annuity loan. With straight-line amortisation it is the repayment that is constant, not the total."
    ]
   },
   {
    "question": "A debt is 150 000 kr and the annual interest rate 4.8 %. How much is the interest in the first month?",
    "choices": [
     "60 kr",
     "600 kr",
     "2 500 kr",
     "7 200 kr"
    ],
    "correct": 1,
    "why": [
     "Out by a power of ten. Check the division by 12.",
     "The annual interest is $0.048 \\cdot 150\\ 000 = 7\\ 200$ kr, and per month $7\\ 200/12 = 600$ kr.",
     "2 500 kr is the repayment in the example, not the interest.",
     "7 200 kr is the interest for a WHOLE year. The monthly interest is a twelfth."
    ]
   },
   {
    "question": "Why does the total monthly payment fall over the life of the loan with straight-line amortisation?",
    "choices": [
     "The repayment decreases each month",
     "The bank lowers the interest rate each year",
     "It does not fall: the payment is constant",
     "The interest is calculated on the current debt, which decreases with each repayment"
    ],
    "correct": 3,
    "why": [
     "With straight-line amortisation the repayment is exactly the same each time.",
     "The interest rate is unchanged. It is the basis (the debt) that decreases.",
     "A constant payment characterises annuity loans, not straight-line amortisation.",
     "The repayment is constant but the interest part shrinks along with the debt: from 600 kr in the first month to 10 kr in the last in the example."
    ]
   },
   {
    "question": "Which spreadsheet formula adds up all the payments in cells D2 to D61?",
    "choices": [
     "`=SUM(D2:D61)`",
     "`=D2+D61`",
     "`=SUM(D2,D61)`",
     "`=TOTAL(D)`"
    ],
    "correct": 0,
    "why": [
     "SUM with a colon indicates the whole range from D2 up to and including D61.",
     "That only adds the first and the last cell, not all those in between.",
     "A comma between the references means two SEPARATE cells, not a range.",
     "TOTAL is not a standard spreadsheet function."
    ]
   }
  ]
 },
 "ma1c-4.1": {
  "kalla": "1e5c09c8ca",
  "data": [
   {
    "question": "How are the coordinates of a point written?",
    "choices": [
     "The order does not matter",
     "With the *x*-coordinate first and the *y*-coordinate last: ($x$, $y$)",
     "With an equals sign between: $x = y$",
     "With the *y*-coordinate first and the *x*-coordinate last: ($y$, $x$)"
    ],
    "correct": 1,
    "why": [
     "With the order reversed, you end up at the wrong point as soon as the coordinates are different.",
     "The horizontal position (x) is written first and the vertical position (y) last: the point (2, 3) is 2 to the right and 3 up.",
     "An equals sign has nothing to do with how coordinates are written.",
     "The order is fixed: (2, 3) and (3, 2) are different points."
    ]
   },
   {
    "question": "Which quadrant has both positive *x*-values and positive *y*-values?",
    "choices": [
     "The fourth quadrant",
     "The third quadrant",
     "The first quadrant",
     "The second quadrant"
    ],
    "correct": 2,
    "why": [
     "The fourth quadrant (bottom right) has negative *y*-values.",
     "The third quadrant (bottom left) has both negative.",
     "The first quadrant is at the top right, where both coordinates are positive, and the numbering continues anticlockwise.",
     "The second quadrant (top left) has negative *x*-values."
    ]
   },
   {
    "question": "What characterises a **linear model**?",
    "choices": [
     "Something doubles at each step",
     "Something changes at a steady rate by the same amount: the graph is a straight line",
     "The graph always passes through the origin",
     "The model has no constant term"
    ],
    "correct": 1,
    "why": [
     "Doubling at each step is exponential growth, not linear.",
     "A steady rate of change (for example 400 kr per hour) gives a straight line, hence the name linear.",
     "The line can cross the *y*-axis anywhere: the garage model $y = 500 + 400x$ starts at 500.",
     "The constant term (for example a fixed charge) is allowed and common."
    ]
   },
   {
    "question": "According to the lesson, in which three ways can a linear model be described?",
    "choices": [
     "With an equation, an inequality or a root",
     "With a pie chart, a bar chart or a curve",
     "Only with a formula",
     "With a formula, a table of values or a graph"
    ],
    "correct": 3,
    "why": [
     "Inequalities and roots are other tools, not ways of describing a model.",
     "Pie charts and bar charts are used for completely different kinds of data.",
     "The formula is only one of the ways: a table and a graph show the same thing.",
     "The same relationship can be expressed as the formula $y = 500 + 400x$, as a table with *x*- and *y*-values, or as a straight line in a coordinate system."
    ]
   }
  ]
 },
 "ma1c-4.2": {
  "kalla": "399992c9dc",
  "data": [
   {
    "question": "Which formula describes all proportional relationships?",
    "choices": [
     "$y = \\dfrac{k}{x}$",
     "$y = kx$",
     "$y = x^k$",
     "$y = kx + m$"
    ],
    "correct": 1,
    "why": [
     "That is inverse proportionality: something else.",
     "A proportional relationship is $y = kx$, where $k$ is the constant of proportionality, with no constant term.",
     "The variable in the exponent belongs to power functions.",
     "$y = kx + m$ with $m \\neq 0$ is linear but not proportional: the graph misses the origin."
    ]
   },
   {
    "question": "Where does the graph of a proportional relationship cross the *y*-axis?",
    "choices": [
     "At the point (0, $k$)",
     "At the origin",
     "It never crosses the *y*-axis",
     "At the point (1, 0)"
    ],
    "correct": 1,
    "why": [
     "$k$ is the slope, not the intercept: substituting $x = 0$ gives $y = 0$.",
     "With $x = 0$, $y = kx$ always gives $y = 0$: the graph passes through the origin.",
     "All straight lines of the form $y = kx$ cross (pass through) the *y*-axis at the origin.",
     "(1, 0) lies on the *x*-axis: the graph of the proportional relationship passes there only if $k = 0$."
    ]
   },
   {
    "question": "How is the constant of proportionality $k$ calculated from a pair of values?",
    "choices": [
     "$k = \\dfrac{y}{x}$",
     "$k = \\dfrac{x}{y}$",
     "$k = y - x$",
     "$k = x \\cdot y$"
    ],
    "correct": 0,
    "why": [
     "From $y = kx$ it follows that $k = \\dfrac{y}{x}$. For example, (5, 100) gives the constant $k = 20$.",
     "The quotient is the wrong way round: it gives $\\dfrac{1}{k}$.",
     "A difference does not give the ratio between the variables.",
     "The product is constant in an INVERSE proportionality, not here."
    ]
   },
   {
    "question": "The graph of a relationship is a straight line that crosses the *y*-axis at (0, 50). Is the relationship proportional?",
    "choices": [
     "Yes: 50 is the constant of proportionality",
     "Yes: all straight lines are proportional relationships",
     "It cannot be decided",
     "No: the graph does not pass through the origin"
    ],
    "correct": 3,
    "why": [
     "50 is the starting value (the constant term), and proportional relationships have none.",
     "Straight lines with a starting value (such as $y = 50 + kx$) are linear models but not proportional relationships.",
     "It can: the criteria are clear, a straight line AND through the origin, and the second requirement is broken.",
     "A straight line is not enough: it must also pass through the origin, and (0, 50) is not the origin."
    ]
   }
  ]
 },
 "ma1c-4.3": {
  "kalla": "f0cbf4673d",
  "data": [
   {
    "question": "What is the first step when the graph of $y = -2x + 3$ is to be drawn by hand?",
    "choices": [
     "Make a table of values with a few *x*-values around 0",
     "Draw a line at random and adjust afterwards",
     "Calculate the slope of the graph with a protractor",
     "Copy the graph from the calculator"
    ],
    "correct": 0,
    "why": [
     "The table of values gives coordinates to plot. A good rule of thumb is a few positive and negative *x*-values around 0.",
     "The graph should be built on calculated points, not guesses.",
     "The slope is visible once the points are plotted: no protractor is needed.",
     "The point of drawing by hand is to understand what the digital tools do."
    ]
   },
   {
    "question": "What does a row in the table of values ($x = -3$, $y = 9$) correspond to in the coordinate system?",
    "choices": [
     "The distance between −3 and 9",
     "The point (−3, 9)",
     "The point (9, −3)",
     "A line through −3 and 9"
    ],
    "correct": 1,
    "why": [
     "The row gives a position, not a distance.",
     "Each row is a coordinate pair: the *x*-value first, the *y*-value last.",
     "Reversing the order gives a completely different point.",
     "A row gives ONE point: the line appears only when all the points are joined."
    ]
   },
   {
    "question": "How do you choose suitable ranges for the axes before plotting the points?",
    "choices": [
     "The ranges do not matter",
     "The *x*-axis only needs to go from 0 upwards",
     "The axes should always go from −10 to 10",
     "The axes must cover the largest and smallest x- and *y*-values in the table"
    ],
    "correct": 3,
    "why": [
     "Ranges that are too small mean that points end up off the paper.",
     "Negative *x*-values belong in a good table of values, and the axis must cover them.",
     "A fixed range sometimes fits but often wastes space or cuts off points.",
     "For $y = -2x + 3$ with x from −3 to 3, a y-axis from −3 to 9 is needed. Otherwise not all the points fit."
    ]
   },
   {
    "question": "The graph of a linear equation is a straight line. What does that mean for the points in the table of values?",
    "choices": [
     "All the points should lie on one and the same straight line",
     "Only two of the points lie on the line",
     "The points should lie symmetrically about the *y*-axis",
     "The points always form an arc"
    ],
    "correct": 0,
    "why": [
     "If a point lies off the line, there is a calculation error in that row of the table: the graph works as a check.",
     "ALL the points from the table lie on the line: that is what linearity means.",
     "Symmetry about the *y*-axis applies to, for example, $y = x^2$, not to straight lines in general.",
     "Arcs belong to other types of function: linear equations give straight lines."
    ]
   },
   {
    "question": "Where does the line $y = 2x - 6$ cross the *x*-axis?",
    "choices": [
     "At the point (0, −6)",
     "At the point (−6, 0)",
     "At the point (3, 0)",
     "At the point (0, 3)"
    ],
    "correct": 2,
    "why": [
     "That is the intersection with the *y*-axis, where $x = 0$.",
     "The number −6 is the *y*-value where the line crosses the *y*-axis, not an *x*-coordinate.",
     "On the *x*-axis $y = 0$. The equation $0 = 2x - 6$ gives $x = 3$, so the point (3, 0).",
     "A point on the *x*-axis has the *y*-coordinate 0, not the *x*-coordinate 0."
    ]
   }
  ]
 },
 "ma1c-4.4": {
  "kalla": "b0feb4cedb",
  "data": [
   {
    "question": "What is the equation $y = kx + m$ called?",
    "choices": [
     "The equation of proportionality",
     "The quadratic equation",
     "The power equation",
     "The equation of a straight line"
    ],
    "correct": 3,
    "why": [
     "Proportionality is the special case $m = 0$.",
     "Quadratic equations contain $x^2$.",
     "In power equations the variable is the base of a power with another exponent.",
     "All straight lines except vertical ones can be written $y = kx + m$: the equation of a straight line in slope-intercept form."
    ]
   },
   {
    "question": "What does the $k$-value in $y = kx + m$ correspond to?",
    "choices": [
     "The slope of the line",
     "The intersection with the *x*-axis",
     "The intersection with the *y*-axis",
     "The starting value of the line"
    ],
    "correct": 0,
    "why": [
     "$k$ is the slope (the gradient): how many steps the line goes up for each step to the right.",
     "The intersection with the *x*-axis is found only when you solve $kx + m = 0$.",
     "The intersection with the *y*-axis is the $m$-value.",
     "The \"starting value\" in linear models corresponds to $m$, not $k$."
    ]
   },
   {
    "question": "How is the $k$-value calculated with the staircase method?",
    "choices": [
     "$k = \\Delta y - \\Delta x$",
     "$k = \\dfrac{\\Delta x}{\\Delta y}$: the change in the *x*-direction divided by the change in the *y*-direction",
     "$k = \\Delta y \\cdot \\Delta x$",
     "$k = \\dfrac{\\Delta y}{\\Delta x}$: the change in the *y*-direction divided by the change in the *x*-direction"
    ],
    "correct": 3,
    "why": [
     "A difference does not give the ratio between the changes.",
     "The quotient is upside down: it is height over length.",
     "The product says nothing about the slope.",
     "The height of the step over its length: $k = \\dfrac{\\Delta y}{\\Delta x}$, and you imagine walking to the right."
    ]
   },
   {
    "question": "A line goes 2 steps down for every step to the right and crosses the *y*-axis at (0, 1). What is the equation?",
    "choices": [
     "$y = -2x - 1$",
     "$y = 2x + 1$",
     "$y = -2x + 1$",
     "$y = x - 2$"
    ],
    "correct": 2,
    "why": [
     "$m$ is the intersection with the *y*-axis, which is $+1$.",
     "With $k = +2$ the line would slope upwards.",
     "Down means a negative slope: $k = -2$, and the intersection gives $m = 1$.",
     "Here $k$ and $m$ have swapped roles."
    ]
   },
   {
    "question": "What happens to the line if the $k$-value is negative?",
    "choices": [
     "It becomes horizontal",
     "It slopes downwards, seen from left to right",
     "It lies below the *x*-axis everywhere",
     "It slopes upwards"
    ],
    "correct": 1,
    "why": [
     "A horizontal line has $k = 0$.",
     "A negative $k$ means that y decreases when x increases: the line falls to the right, like $y = -2x + 1$.",
     "The line may well lie above the *x*-axis for small x: the slope decides the direction, not the position.",
     "Sloping upwards requires a positive $k$."
    ]
   }
  ]
 },
 "ma1c-4.5": {
  "kalla": "beca7b9cc3",
  "data": [
   {
    "question": "In Swedish textbooks, what does the abbreviation \"RLE\" sometimes stand for?",
    "choices": [
     "Properties of perpendicular lines",
     "The position equation of the gradient",
     "The exponent of a straight line",
     "The equation of a straight line (räta linjens ekvation)"
    ],
    "correct": 3,
    "why": [
     "Perpendicularity belongs to the next section, on perpendicular lines.",
     "The gradient is the $k$-value in the equation, not what the abbreviation means.",
     "Exponents do not occur in the equation of a straight line.",
     "RLE stands for räta linjens ekvation, the equation of a straight line, $y = kx + m$."
    ]
   },
   {
    "question": "How is $\\Delta y$ calculated from two points $(x_1, y_1)$ and $(x_2, y_2)$?",
    "choices": [
     "$\\Delta y = y_1 - y_2$, always with the largest number first",
     "$\\Delta y = y_2 - y_1$",
     "$\\Delta y = x_2 - x_1$",
     "$\\Delta y = y_2 + y_1$"
    ],
    "correct": 1,
    "why": [
     "The order follows the numbering of the points. The main thing is that $\\Delta y$ and $\\Delta x$ take the points in the SAME order.",
     "The change in the *y*-direction is the difference between the *y*-coordinates, in the same order as the points: $y_2 - y_1$.",
     "That is $\\Delta x$: the change in the *x*-direction.",
     "A sum does not measure a change."
    ]
   },
   {
    "question": "Calculate $k$ for the line through (−6, −1) and (2, 3).",
    "choices": [
     "$\\dfrac{1}{2}$",
     "$-\\dfrac{1}{2}$",
     "$2$",
     "$\\dfrac{4}{-4}= -1$"
    ],
    "correct": 0,
    "why": [
     "$k = \\dfrac{3 - (-1)}{2 - (-6)} = \\dfrac{4}{8} = \\dfrac{1}{2}$: double minus signs become plus.",
     "The signs cancel out in both differences: the quotient is positive.",
     "2 is the quotient upside down ($\\dfrac{8}{4}$). $\\Delta y$ should be in the numerator.",
     "The denominator is $2 - (-6) = 8$, not $-4$: the brackets around negative coordinates are important."
    ]
   },
   {
    "question": "A line has $k = 2$ and passes through (4, −3). How is the $m$-value found?",
    "choices": [
     "Read off where the line crosses the *x*-axis",
     "$m$ is always the *y*-coordinate of the given point",
     "$m = k \\cdot 4$",
     "Substitute the coordinates of the point into $y = 2x + m$ and solve for $m$"
    ],
    "correct": 3,
    "why": [
     "$m$ is the intersection with the *y*-axis, not the *x*-axis, and it cannot be read off without a graph.",
     "Only if the point lies ON the *y*-axis ($x = 0$) is the *y*-coordinate equal to $m$.",
     "$k \\cdot 4$ is the value of the variable term at the point: $m$ is what remains up to $y$.",
     "$-3 = 2 \\cdot 4 + m$ gives $m = -11$. The point lies on the line, so its coordinates satisfy the equation."
    ]
   },
   {
    "question": "A line has $k = 2$ and passes through (4, −3). Which equation is the line written in point-slope form?",
    "choices": [
     "$y - 3 = 2(x + 4)$",
     "$y + 4 = 2(x - 3)$",
     "$y + 3 = 2(x - 4)$",
     "$y - 3 = 2(x - 4)$"
    ],
    "correct": 2,
    "why": [
     "Here the signs have been changed in both brackets. The point $(4, -3)$ gives $x - 4$ and $y - (-3)$.",
     "Here the coordinates have swapped places. $x_1 = 4$ goes with $x$ and $y_1 = -3$ with $y$.",
     "Substituting into $y - y_1 = k(x - x_1)$ gives $y - (-3) = 2(x - 4)$, that is, $y + 3 = 2(x - 4)$.",
     "Minus in front of $-3$ becomes plus. $y - (-3)$ is $y + 3$, not $y - 3$."
    ]
   }
  ]
 },
 "ma1c-4.6": {
  "kalla": "327302b54c",
  "data": [
   {
    "question": "What characterises two parallel lines?",
    "choices": [
     "They have the same *k*-value",
     "They have the same *m*-value",
     "They intersect at the origin",
     "They have the same equation"
    ],
    "correct": 0,
    "why": [
     "The same slope means that the lines never meet: the *k*-values are equal but the *m*-values different.",
     "The same *m*-value means that the lines cross the *y*-axis at the same point, so they cross each other there.",
     "Parallel lines never intersect at all.",
     "The same equation would be the same line, not two parallel ones."
    ]
   },
   {
    "question": "Why can a vertical line not be written in slope-intercept form ($y = kx + m$)?",
    "choices": [
     "The slope would be infinitely large: there is no *k*-value",
     "Vertical lines are not real lines",
     "It certainly can be written in slope-intercept form",
     "Vertical lines have no points"
    ],
    "correct": 0,
    "why": [
     "The step has $\\Delta x = 0$, so the quotient $\\Delta y/\\Delta x$ is undefined. Vertical lines are instead written $x = a$.",
     "They are fully fledged straight lines, just written differently.",
     "No combination of $k$ and $m$ gives a vertical graph.",
     "They have infinitely many points, all with the same *x*-coordinate."
    ]
   },
   {
    "question": "What is the equation of a straight line in **general form**?",
    "choices": [
     "$x = a$",
     "$y = x^2 + c$",
     "$y = kx + m$",
     "$ax + by + c = 0$"
    ],
    "correct": 3,
    "why": [
     "That is the special form of the vertical line.",
     "$x^2$ belongs to quadratic curves, not straight lines.",
     "That is slope-intercept form: the most common, but it cannot handle vertical lines.",
     "In general form all the terms are collected on one side and the other side is 0. That form also handles vertical lines."
    ]
   },
   {
    "question": "What *k*-value does the line $2x + 3y - 6 = 0$ have?",
    "choices": [
     "$-\\dfrac{2}{3}$",
     "$2$",
     "$-6$",
     "$\\dfrac{2}{3}$"
    ],
    "correct": 0,
    "why": [
     "Solve for y: $3y = -2x + 6$ gives $y = -\\dfrac{2}{3}x + 2$, so the slope is $-\\dfrac{2}{3}$.",
     "2 is the coefficient of x in general form, not the slope in slope-intercept form.",
     "−6 is the constant c in general form.",
     "The sign comes along when $2x$ is moved across: $-\\dfrac{2}{3}$."
    ]
   }
  ]
 },
 "ma1c-4.7": {
  "kalla": "98b55ef8c4",
  "data": [
   {
    "question": "Two lines are perpendicular. What is true of their *k*-values?",
    "choices": [
     "$k_1 = k_2$",
     "$k_1 \\cdot k_2 = -1$",
     "$k_1 + k_2 = 0$",
     "$k_1 \\cdot k_2 = 1$"
    ],
    "correct": 1,
    "why": [
     "The same *k*-value means the same slope, that is, parallel lines.",
     "The slope staircase turned a quarter of a turn swaps the steps and changes the sign of one of them, so the product is always −1.",
     "Then the lines are just mirror images of each other, like $y = 2x$ and $y = -2x$. They are not perpendicular.",
     "The sign is wrong: one perpendicular line slopes upwards and the other downwards."
    ]
   },
   {
    "question": "A line has $k = \\dfrac{3}{4}$. What *k*-value does a line perpendicular to it have?",
    "choices": [
     "$\\dfrac{4}{3}$",
     "$-\\dfrac{3}{4}$",
     "$-\\dfrac{4}{3}$",
     "$\\dfrac{3}{4}$"
    ],
    "correct": 2,
    "why": [
     "The fraction is turned over, but the sign must also be changed.",
     "The sign is changed, but the fraction must also be turned over.",
     "Turn the fraction over and change the sign: $\\dfrac{3}{4} \\cdot \\left(-\\dfrac{4}{3}\\right) = -1$.",
     "The same *k*-value gives a parallel line."
    ]
   },
   {
    "question": "Are the lines $y = 2x$ and $y = -2x$ perpendicular?",
    "choices": [
     "Yes, they slope in different directions",
     "No, the product of the *k*-values is $-4$",
     "Yes, the product of the *k*-values is $-1$"
    ],
    "correct": 1,
    "why": [
     "That the slopes have different signs is not enough. The product must also be −1.",
     "$2 \\cdot (-2) = -4$, not −1. The lines intersect, but not at a right angle.",
     "Check: $2 \\cdot (-2) = -4$."
    ]
   },
   {
    "question": "The lines $y = 3$ and $x = 2$ are perpendicular. Why can $k_1 \\cdot k_2 = -1$ not be used on them?",
    "choices": [
     "The vertical line $x = 2$ has no *k*-value",
     "The lines are not perpendicular",
     "The lines are parallel",
     "Both lines have $k = 0$"
    ],
    "correct": 0,
    "why": [
     "A vertical line has no distance to the right to calculate a slope on, and the horizontal line has $k = 0$. The rule only applies when both lines slope.",
     "A horizontal and a vertical line intersect at a right angle, so they are perpendicular.",
     "One is horizontal and the other vertical, so they intersect.",
     "Only the horizontal line $y = 3$ has $k = 0$. The vertical one has no *k*-value."
    ]
   }
  ]
 },
 "ma1c-4.8": {
  "kalla": "520f05c6cb",
  "data": [
   {
    "question": "What is required for a relationship between $x$ and $y$ to be a **function**?",
    "choices": [
     "Each allowed *x*-value gives exactly one *y*-value",
     "The relationship contains no negative numbers",
     "Each *y*-value gives exactly one *x*-value",
     "The graph is a straight line"
    ],
    "correct": 0,
    "why": [
     "That is the definition of a function. Graphically: a vertical pencil crosses the graph at most once.",
     "Negative numbers are no problem for functions.",
     "That is the requirement the wrong way round: several *x*-values may well give the same *y*-value.",
     "Curves (for example quadratic functions) are also functions: linearity is not required."
    ]
   },
   {
    "question": "How is $f(x)$ read aloud?",
    "choices": [
     "\"f and x\"",
     "\"f of x\"",
     "\"f to the power of x\"",
     "\"f times x\""
    ],
    "correct": 1,
    "why": [
     "The notation states that f depends on x, not a list.",
     "$f(x)$ is read \"f of x\": f is the name of the function and x the variable it depends on.",
     "There is no exponent in the notation.",
     "The brackets do NOT mean multiplication here: it is function notation."
    ]
   },
   {
    "question": "Let $f(x) = 2x + 3$. What is $f(5)$?",
    "choices": [
     "$25$",
     "$f \\cdot 5$",
     "$13$",
     "$10$"
    ],
    "correct": 2,
    "why": [
     "25 would be $5^2$: the function does not square.",
     "$f$ is the name of a function, not a number to multiply by.",
     "Replace x with 5: $f(5) = 2 \\cdot 5 + 3 = 13$.",
     "10 is just the variable term $2 \\cdot 5$. The constant term 3 must be included."
    ]
   },
   {
    "question": "What is $y$ called in the relationship $y = f(x)$?",
    "choices": [
     "The domain",
     "The independent variable",
     "The dependent variable",
     "The coefficient"
    ],
    "correct": 2,
    "why": [
     "The domain is the set of allowed *x*-values, a concept that comes in a later section.",
     "The independent variable is $x$: it is chosen freely.",
     "The value of $y$ depends on which $x$ is put in, hence \"dependent\".",
     "A coefficient is the number in front of a variable in an expression."
    ]
   },
   {
    "question": "The graph of $f$ crosses the *x*-axis at $x = -1$, $x = 1$ and $x = 3$. What does that tell you?",
    "choices": [
     "The graph is not a function",
     "The function is not defined there",
     "$f(0) = -1$, $f(0) = 1$ and $f(0) = 3$",
     "The equation $f(x) = 0$ has the solutions $x = -1$, $x = 1$ and $x = 3$"
    ],
    "correct": 3,
    "why": [
     "Three different *x*-values, each with its own *y*-value, do not break the function requirement.",
     "On the contrary: the function is defined there and happens to be exactly zero.",
     "$f(0)$ is the intersection with the *y*-axis, and a function can only have ONE value at $x = 0$.",
     "Crossing the *x*-axis means $y = 0$: the value of the function is zero there, so these are the solutions of $f(x) = 0$."
    ]
   }
  ]
 },
 "ma1c-4.9": {
  "kalla": "adf382d213",
  "data": [
   {
    "question": "What is it called when you solve an equation using graphs in, for example, GeoGebra?",
    "choices": [
     "Algebraic solution",
     "Trial and error",
     "Graphical solution",
     "Factorising"
    ],
    "correct": 2,
    "why": [
     "An algebraic solution means calculating your way there with the balance method.",
     "Trial and error (guess and test) is not allowed when solving equations.",
     "Drawing y = LHS and y = RHS and reading off the intersection is called a graphical solution.",
     "Factorising is an algebraic technique, not a graphical one."
    ]
   },
   {
    "question": "Which two graphs are drawn to solve $3x - 5 = -x + 3$ graphically?",
    "choices": [
     "$y = 3x - 5 + x - 3$ and $y = 0$",
     "$x = 3$ and $x = -1$",
     "$y = 3x$ and $y = -x$",
     "$y = 3x - 5$ and $y = -x + 3$"
    ],
    "correct": 3,
    "why": [
     "That is an alternative method (the zero method), but the method in the lesson draws the LHS and the RHS separately.",
     "Those are two vertical lines, not the sides of the equation.",
     "The constant terms must be included. Otherwise the wrong lines are drawn.",
     "Put \"y =\" in front of the left-hand side and the right-hand side respectively and draw both."
    ]
   },
   {
    "question": "The intersection of the graphs is (2, 1). What is the solution of the equation?",
    "choices": [
     "$x = 1$",
     "$(2, 1)$: the whole point",
     "$x = 2$",
     "$x = 3$"
    ],
    "correct": 2,
    "why": [
     "1 is the *y*-coordinate: the common value of the sides, not the solution.",
     "The equation has ONE unknown: the answer is an *x*-value, not a point.",
     "The solution is the x-coordinate of the intersection: at $x = 2$ both sides are equal (the value 1).",
     "The sum of the coordinates has no meaning here."
    ]
   },
   {
    "question": "How is the equation $y = 13t + 5$ written when it is entered for a graphical solution in GeoGebra?",
    "choices": [
     "`y = 13t + 5`",
     "`t = 13y + 5`",
     "`y = 13.5`",
     "`y = 13x + 5`"
    ],
    "correct": 3,
    "why": [
     "With t left in, GeoGebra does not interpret the expression as a line in the xy-plane.",
     "Swapping the variables changes the relationship completely.",
     "13.5 is a number: the whole expression has disappeared.",
     "GeoGebra only understands x and y in graphical solutions, so the variable t is replaced with x."
    ]
   }
  ]
 },
 "ma1c-4.10": {
  "kalla": "ee82bf1b50",
  "data": [
   {
    "question": "What is the set of possible values of the dependent variable $y$ called?",
    "choices": [
     "Domain",
     "Coordinate set",
     "Range",
     "Function set"
    ],
    "correct": 2,
    "why": [
     "The domain is instead the possible x-values.",
     "Coordinates are points: the sets are about one variable each.",
     "Possible *y*-values form the range.",
     "\"Function set\" is not an established concept here."
    ]
   },
   {
    "question": "What does a **filled circle** at the end of a graph mean?",
    "choices": [
     "The end point is included in the interval: marked with ≤ or ≥",
     "The graph continues indefinitely in that direction",
     "The end point is not included in the interval",
     "The function is undefined at the point"
    ],
    "correct": 0,
    "why": [
     "Filled circle = the point is included; open circle = the point is not included (< or >).",
     "An arrow usually marks an endless continuation: the circle marks a stop.",
     "That is the meaning of the OPEN circle.",
     "On the contrary: at a filled end point the function is defined and takes the value."
    ]
   },
   {
    "question": "A graph starts with an open circle at $x = -1$ and ends with a filled point at $x = 2$. What is the domain?",
    "choices": [
     "$-1 \\leq x \\leq 2$",
     "$-1 < x \\leq 2$",
     "$-1 < x < 2$",
     "$-1 \\leq x < 2$"
    ],
    "correct": 1,
    "why": [
     "The left end is open: $x = -1$ is not included.",
     "An open circle gives a strict inequality at −1 and a filled point gives ≤ at 2.",
     "The right end is filled: $x = 2$ is included.",
     "The inequalities have ended up at the wrong ends."
    ]
   },
   {
    "question": "The music service $y = 50x$ applies for at most 12 months ($0 \\leq x \\leq 12$). What is the range?",
    "choices": [
     "$y = 600$",
     "$0 \\leq y \\leq 600$",
     "$0 \\leq y \\leq 50$",
     "$0 \\leq y \\leq 12$"
    ],
    "correct": 1,
    "why": [
     "600 kr is only the largest value: the range is the whole span.",
     "The smallest cost is $y(0) = 0$ kr and the largest $y(12) = 600$ kr.",
     "50 kr is only the price for ONE month.",
     "0–12 is the domain (the months), not the costs."
    ]
   }
  ]
 },
 "ma1c-4.11": {
  "kalla": "83492e5d65",
  "data": [
   {
    "question": "Where is the variable in an exponential function?",
    "choices": [
     "In the denominator",
     "In the exponent",
     "Under a root sign",
     "In the base"
    ],
    "correct": 1,
    "why": [
     "A variable in the denominator belongs to other types of function.",
     "For example $y = 25\\ 000 \\cdot 1.02^x$: the variable $x$ is the exponent.",
     "Roots correspond to rational exponents on a variable BASE.",
     "A variable in the base (for example $y = x^2$) gives a power function."
    ]
   },
   {
    "question": "In the formula $y = Ca^x$, what does $a$ stand for?",
    "choices": [
     "The multiplier (change factor)",
     "The original value",
     "The time",
     "The area"
    ],
    "correct": 0,
    "why": [
     "$a$ is the multiplier, for example 1.02 for +2 % per year or 0.85 for −15 %.",
     "The original value is $C$.",
     "The time is the exponent $x$.",
     "The formula is about change over time, not geometry."
    ]
   },
   {
    "question": "The value of the car is given by $V(t) = 180\\ 000 \\cdot 0.85^t$. What does 0.85 mean?",
    "choices": [
     "The value increases by 85 % per year",
     "The car is worth 85 kr after one year",
     "The value decreases by 15 % per year",
     "The value decreases by 85 % per year"
    ],
    "correct": 2,
    "why": [
     "Multipliers below 1 mean a decrease.",
     "0.85 is a multiplier, not an amount: the value after 1 year is $180\\ 000 \\cdot 0.85 = 153\\ 000$ kr.",
     "$0.85 = 100\\ \\% - 15\\ \\%$: an annual decrease of 15 %.",
     "A decrease of 85 % would have given the multiplier 0.15."
    ]
   },
   {
    "question": "What does the graph of $y = Ca^x$ look like when $0 < a < 1$?",
    "choices": [
     "It rises ever more steeply: exponential increase",
     "It falls steeply at first and levels out towards zero: exponential decrease",
     "It is a parabola",
     "It is a straight line sloping downwards"
    ],
    "correct": 1,
    "why": [
     "An increase requires $a > 1$, like population growth.",
     "With a multiplier below 1 the value shrinks at each step, like radioactive decay.",
     "Parabolas belong to quadratic functions.",
     "Exponential processes are never straight lines."
    ]
   },
   {
    "question": "How do you decide whether the curve in a graph is $f(x) = 3^x$ or $g(x) = 2^x$?",
    "choices": [
     "You cannot: the curves are identical",
     "Measure the slope of the curve with a ruler",
     "Check where the curve crosses the *x*-axis",
     "Calculate a few points (for example x = 1) and test which ones lie on the curve"
    ],
    "correct": 3,
    "why": [
     "The curves differ everywhere except at (0, 1).",
     "The slope changes all the time on an exponential curve: testing points is more reliable.",
     "Exponential curves never cross the *x*-axis: they only approach it.",
     "At $x = 1$, $3^x$ should give 3 and $2^x$ should give 2. The point test decides at once which curve is drawn."
    ]
   }
  ]
 },
 "ma1c-4.12": {
  "kalla": "f45d1e954b",
  "data": [
   {
    "question": "Where is the variable in a power function?",
    "choices": [
     "Outside the function",
     "In the base",
     "In the denominator, always",
     "In the exponent"
    ],
    "correct": 1,
    "why": [
     "The variable is the very core of the function expression.",
     "$f(x) = Cx^a$: the variable $x$ is the base raised to the constant $a$.",
     "$x^{-1} = \\dfrac{1}{x}$ ends up in the denominator, but that is a special case, not the definition.",
     "A variable in the exponent ($Ca^x$) gives an exponential function."
    ]
   },
   {
    "question": "What type of function is $g(x) = x^{-2}$?",
    "choices": [
     "A power function",
     "An exponential function",
     "Not a function at all",
     "A linear function"
    ],
    "correct": 0,
    "why": [
     "The variable is the base and the exponent is the constant −2: a power function ($g(x) = \\dfrac{1}{x^2}$).",
     "Exponential functions have the variable in the exponent, like $2^x$.",
     "For each allowed $x$ (all except 0) there is exactly one value: a function.",
     "Linear functions have the form $kx + m$."
    ]
   },
   {
    "question": "What does the graph of $y = x^2$ look like?",
    "choices": [
     "A curve that only exists for positive x",
     "A hyperbola with two branches",
     "A straight line",
     "A parabola with its bottom at the origin, symmetric about the *y*-axis"
    ],
    "correct": 3,
    "why": [
     "That describes $y = \\sqrt{x}$: the square is defined for all x.",
     "The hyperbola belongs to $y = \\dfrac{1}{x}$.",
     "Straight lines come from linear functions.",
     "The square is always positive and the same for $x$ and $-x$: a symmetric parabola."
    ]
   },
   {
    "question": "Let $f(x) = x^{1/2}$ and $g(x) = 4x^2$. How is $f(g(2))$ calculated?",
    "choices": [
     "$f(2) + g(2)$",
     "First $g(2) = 16$, then $f(16) = 4$: from the inside out",
     "$f(2) \\cdot g(2)$",
     "First $f(2)$, then $g$ of that"
    ],
    "correct": 1,
    "why": [
     "Not addition either: $g(2)$ becomes the INPUT to the outer function.",
     "A function of a function is calculated from the inside out: the inner $g(2) = 4 \\cdot 4 = 16$, then the outer $f(16) = \\sqrt{16} = 4$.",
     "Composition is not multiplication of function values.",
     "That would be $g(f(2))$: the order is decided by which function is innermost."
    ]
   }
  ]
 },
 "ma1c-5.1": {
  "kalla": "79cb33610c",
  "data": [
   {
    "question": "What is the set that a statistical survey is about called?",
    "choices": [
     "Data",
     "Sampling",
     "Sample",
     "Population"
    ],
    "correct": 3,
    "why": [
     "Data is the information that is collected, not the group it is collected from.",
     "Sampling is the method for choosing who will take part.",
     "The sample is the smaller part of the population that is actually surveyed.",
     "The population is the whole set (people or objects) that the survey is about."
    ]
   },
   {
    "question": "What is the advantage of a census (complete survey) compared with a sample survey?",
    "choices": [
     "It is quicker to carry out",
     "It is always cheaper",
     "It is exact: the whole population is surveyed",
     "It requires no selection of questions"
    ],
    "correct": 2,
    "why": [
     "On the contrary: the sample is the quick alternative.",
     "Surveying everyone usually costs more, not less.",
     "When everyone in the population is surveyed there is no uncertainty from the sampling, but it is time-consuming for large populations.",
     "The questions must be well designed in both cases."
    ]
   },
   {
    "question": "In a stratified sample with 75 % women in the population, how is the sample chosen?",
    "choices": [
     "Every fifth person from a list",
     "Only women are chosen",
     "So that 75 % of the sample are also women",
     "Completely at random from the whole population"
    ],
    "correct": 2,
    "why": [
     "That describes systematic sampling.",
     "Then the population is not reflected at all: 25 % are men, after all.",
     "Stratified sampling reflects the composition of the population: 75 % women in the population gives 75 % women in the sample.",
     "That describes simple random sampling."
    ]
   },
   {
    "question": "Asking \"Do you believe in God?\" outside a church to measure belief in God in a town is an example of…",
    "choices": [
     "Non-response",
     "A census",
     "Measurement error: the question is badly worded",
     "Sampling error: the sample does not represent the population"
    ],
    "correct": 3,
    "why": [
     "Non-response is about those who do not answer at all.",
     "Far from it: only a small, skewed part of the population is asked.",
     "The question itself is neutral: the problem is WHERE it is asked.",
     "Churchgoers are more religious than the town's population as a whole: the sample does not reflect the population."
    ]
   },
   {
    "question": "Why can a large non-response make a survey hard to interpret?",
    "choices": [
     "Questionnaires with non-response are illegal",
     "Non-response always makes the result exactly zero",
     "It does not matter: non-response can always be ignored",
     "Those who did not answer may think differently, so the result gets a wide interval of uncertainty"
    ],
    "correct": 3,
    "why": [
     "Nothing illegal, but the results must be interpreted carefully.",
     "Non-response does not make anything zero: it creates uncertainty.",
     "Only small non-response without suspected bias can sometimes be ignored.",
     "In the nuclear power example, the proportion in favour could lie between 42 % and 54 % depending on how the non-respondents would have answered."
    ]
   }
  ]
 },
 "ma1c-5.2": {
  "kalla": "e9cb5e77de",
  "data": [
   {
    "question": "What does the **margin of error** state?",
    "choices": [
     "How many answered the questionnaire wrongly",
     "How much the result can be expected to vary if the survey is repeated",
     "The cost of the survey",
     "The number of people who did not respond"
    ],
    "correct": 1,
    "why": [
     "There are no \"wrong answers\" in an opinion survey: the margin is about random variation.",
     "The margin of error measures the uncertainty of the result, usually so that in 95 % of cases the result lies within it.",
     "The cost has nothing to do with the margin of error.",
     "Non-response is a separate source of error, distinct from the statistical uncertainty."
    ]
   },
   {
    "question": "With the result 60 % and the margin of error 9.6 %, what is the confidence interval?",
    "choices": [
     "55 % to 65 %",
     "9.6 % to 60 %",
     "60 % to 69.6 %",
     "50.4 % to 69.6 %"
    ],
    "correct": 3,
    "why": [
     "That would be the interval for a margin of error of 5 %.",
     "The margin of error is a width, not a lower limit.",
     "The margin is applied in BOTH directions, not just upwards.",
     "The result ± the margin of error: $60 - 9.6 = 50.4$ and $60 + 9.6 = 69.6$."
    ]
   },
   {
    "question": "What does it mean that a change is \"statistically significant\"?",
    "choices": [
     "Everyone in the population has been asked",
     "The change is greater than 10 percentage points",
     "The change is measured exactly without any uncertainty",
     "The change is greater than the margin of error: with 95 % confidence it is not due to chance"
    ],
    "correct": 3,
    "why": [
     "Significance is assessed precisely for SAMPLES: a census does not need it.",
     "The limit is the margin of error, not a fixed number of percentage points.",
     "The uncertainty remains, but it is too small to explain the change.",
     "If the new value lies outside the confidence interval, the change is significant."
    ]
   },
   {
    "question": "What happens to the margin of error when the sample is made larger?",
    "choices": [
     "It decreases: the result becomes more reliable",
     "It increases",
     "It is not affected",
     "It always becomes exactly 1.96 %"
    ],
    "correct": 0,
    "why": [
     "$n$ is in the denominator under the root sign: a larger sample gives a smaller margin of error (but 4 times as many are needed to halve it).",
     "More respondents can never make the result less certain.",
     "$n$ is part of the formula: the size matters a great deal.",
     "1.96 is a constant in the formula (linked to the 95 % level), not the margin of error itself."
    ]
   }
  ]
 },
 "ma1c-5.3": {
  "kalla": "9c43112afd",
  "data": [
   {
    "question": "What does it mean that two variables have a **correlation**?",
    "choices": [
     "They are always equal in size",
     "There is a relationship between them",
     "One causes the other",
     "They have no relationship"
    ],
    "correct": 1,
    "why": [
     "The variables can be of completely different sizes and still vary together.",
     "Correlation = relationship (the points in the scatter plot follow a pattern). Cause and effect is a different question.",
     "That is causation: correlation can exist without a causal relationship.",
     "On the contrary: without a relationship there is no correlation."
    ]
   },
   {
    "question": "The points are scattered but lie around a line with a positive slope. What correlation is it?",
    "choices": [
     "Weak positive",
     "None",
     "Strong positive",
     "Weak negative"
    ],
    "correct": 0,
    "why": [
     "Scattered points = weak; positive slope = positive, like mothers' and daughters' heights in the lesson.",
     "There is a pattern: the points gather around a line.",
     "Strong requires the points to lie CLEARLY on the line.",
     "The slope is positive, not negative."
    ]
   },
   {
    "question": "What is it called when two variables vary together without one causing the other?",
    "choices": [
     "Causation",
     "Spurious correlation",
     "Significance",
     "Proportionality"
    ],
    "correct": 1,
    "why": [
     "Causation is the opposite: a genuine cause-and-effect relationship.",
     "Like life expectancy and internet access: the correlation exists but is explained by a third variable (the country's wealth/healthcare).",
     "Significance is about statistical certainty, not causes.",
     "Proportionality is an exact mathematical relationship, y = kx."
    ]
   },
   {
    "question": "There is both correlation and causation between mothers' and daughters' heights. Why causation?",
    "choices": [
     "The genes from the mother partly decide how tall the daughter becomes",
     "The daughters' heights affect the mothers'",
     "Both are measured in centimetres",
     "The points lie on a perfect line"
    ],
    "correct": 0,
    "why": [
     "There is a real causal mechanism, heredity, from the mother's height to the daughter's.",
     "The direction of cause goes from mother to daughter, not the other way round.",
     "The same unit does not create a causal relationship.",
     "The correlation was in fact weak: causation is about cause, not about how closely the points follow the line."
    ]
   }
  ]
 },
 "ma1c-5.4": {
  "kalla": "43f230a6c6",
  "data": [
   {
    "question": "What is the set of all possible outcomes of a random experiment called?",
    "choices": [
     "Sample space",
     "Event",
     "Population",
     "Favourable outcomes"
    ],
    "correct": 0,
    "why": [
     "The sample space is all the possible outcomes: for a die {1, 2, 3, 4, 5, 6}.",
     "The event is what you are asking about, for example \"at least 5\".",
     "Population belongs to statistical surveys.",
     "Favourable outcomes are only those that match the event."
    ]
   },
   {
    "question": "How is probability calculated according to the classical definition?",
    "choices": [
     "The number of favourable outcomes divided by the number of possible outcomes",
     "Favourable plus possible outcomes",
     "The number of possible outcomes divided by the number of favourable ones",
     "Always 50 %"
    ],
    "correct": 0,
    "why": [
     "$P(\\text{event}) = \\dfrac{\\text{favourable}}{\\text{possible}}$, and it requires a uniform probability distribution.",
     "A sum of numbers of outcomes is not a probability.",
     "Upside down: then the probability becomes greater than 1.",
     "50 % applies only to special cases such as tossing a coin."
    ]
   },
   {
    "question": "Why does the classical definition work for tossing a coin but NOT for penalty kicks in football?",
    "choices": [
     "The definition works for both",
     "Coins cannot land on their edge",
     "Football has more outcomes than coins",
     "The outcomes of the coin toss are equally likely, but goal and miss are not"
    ],
    "correct": 3,
    "why": [
     "For penalties the formula would give 50 % goals whoever the shooter, which is obviously wrong.",
     "Landing on the edge is not the point: uniformity is.",
     "The number of outcomes is two in both cases (goal/miss, heads/tails): the problem is the probabilities.",
     "The formula requires a uniform distribution: heads and tails are equally likely, but the probability of a goal depends on the shooter's skill."
    ]
   },
   {
    "question": "You throw two dice. How many possible outcomes are there in the sample space?",
    "choices": [
     "36",
     "6",
     "12",
     "11"
    ],
    "correct": 0,
    "why": [
     "Six outcomes for the first die times six for the second: $6 \\cdot 6 = 36$ squares in the table.",
     "6 applies to ONE die.",
     "12 would be $6 + 6$: the combinations are multiplied, not added.",
     "11 is the number of different SUMS (2–12), but they are not equally likely."
    ]
   },
   {
    "question": "What is the probability of getting a sum of at least 10 with two dice?",
    "choices": [
     "$\\dfrac{1}{36}$",
     "$\\dfrac{3}{36} = \\dfrac{1}{12}$",
     "$\\dfrac{6}{36} = \\dfrac{1}{6}$",
     "$\\dfrac{10}{36}$"
    ],
    "correct": 2,
    "why": [
     "$\\dfrac{1}{36}$ is the probability of exactly the sum 12.",
     "$\\dfrac{3}{36}$ is the probability of a sum GREATER than 10 (only 11 and 12). Tell the wordings apart!",
     "The sums 10, 11 and 12 cover 3 + 2 + 1 = 6 squares in the sample space of 36.",
     "The number 10 in the question is a value of the sum, not a number of outcomes."
    ]
   }
  ]
 },
 "ma1c-5.5": {
  "kalla": "2ee90e2ad6",
  "data": [
   {
    "question": "When are **experimental** probabilities needed?",
    "choices": [
     "Never: the classical definition is always enough",
     "When the sample space is known and uniform",
     "When you throw an ordinary die",
     "When the outcomes are not equally likely and the probability is not obvious"
    ],
    "correct": 3,
    "why": [
     "Penalties, drawing pins and meteorites show the opposite.",
     "That is exactly the situation where the CLASSICAL definition is used.",
     "The die is uniform: there the classical definition works perfectly.",
     "Like the meteorite example: two outcomes but with completely different probabilities, so the probability must be measured through trials."
    ]
   },
   {
    "question": "What is the proportion of times an event occurs in a series of trials called?",
    "choices": [
     "Confidence interval",
     "Correlation",
     "Sample space",
     "Relative frequency"
    ],
    "correct": 3,
    "why": [
     "Confidence intervals belong to the margin of error.",
     "Correlation is about relationships between variables.",
     "The sample space is the set of possible outcomes.",
     "Relative frequency = the number of times the event occurred divided by the number of trials, for example 139 goals from 200 penalties ≈ 70 %."
    ]
   },
   {
    "question": "Asllani's relative frequency after 200 penalties is about 70 %. What is the probability that the next penalty is NOT a goal?",
    "choices": [
     "70 %",
     "30 %",
     "It cannot be known",
     "50 %"
    ],
    "correct": 1,
    "why": [
     "70 % is the probability OF a goal.",
     "The complementary event: $100\\ \\% - 70\\ \\% = 30\\ \\%$.",
     "It can: the complement gives it directly.",
     "50 % would be the incorrect classical approach with two outcomes."
    ]
   },
   {
    "question": "Why is the relative frequency after 200 penalties more reliable than after 5?",
    "choices": [
     "The probability changes over time",
     "The more trials, the closer the frequency comes to the true probability",
     "200 is an even number",
     "The frequency after few trials is always too low"
    ],
    "correct": 1,
    "why": [
     "The shooter's skill is assumed to be constant: it is the MEASUREMENT that improves.",
     "In the table the frequency jumped about (100 %, 50 %, 40 %…) at first but settled around 70 %: more trials give more accuracy.",
     "Whether the number is even has no significance.",
     "It can be too high as well: after 1 penalty it was 100 %."
    ]
   }
  ]
 },
 "ma1c-5.6": {
  "kalla": "9b40dcff5d",
  "data": [
   {
    "question": "What does the **multiplication rule** say?",
    "choices": [
     "The product of two probabilities is always greater than 1",
     "The probability of a combination of events is obtained by multiplying the individual probabilities",
     "The probability of two events is always 50 %",
     "Probabilities are always added"
    ],
    "correct": 1,
    "why": [
     "On the contrary: the product of numbers between 0 and 1 is SMALLER than the factors.",
     "For example, $P(\\text{two sixes}) = \\dfrac{1}{6} \\cdot \\dfrac{1}{6} = \\dfrac{1}{36}$.",
     "50 % applies only to the odd special case.",
     "Addition belongs to \"either or\" situations, not combinations."
    ]
   },
   {
    "question": "What characterises **independent** events?",
    "choices": [
     "They can never happen at the same time",
     "They always happen without replacement",
     "The probability is not affected by the previous event: \"chance has no memory\"",
     "Their probabilities are always equal"
    ],
    "correct": 2,
    "why": [
     "That describes mutually exclusive events: something else.",
     "On the contrary: WITHOUT replacement the events become dependent.",
     "Throws of a die are independent: the probability of a six is $\\dfrac{1}{6}$ whatever the previous throws.",
     "Independence is about influence, not about equal probabilities."
    ]
   },
   {
    "question": "You draw a heart from a pack of cards and do NOT put it back. What is the probability that the next card is also a heart?",
    "choices": [
     "$\\dfrac{12}{51}$",
     "$\\dfrac{12}{52}$",
     "$\\dfrac{13}{52}$",
     "$\\dfrac{13}{51}$"
    ],
    "correct": 0,
    "why": [
     "12 hearts left out of 51 cards: both the numerator and the denominator have decreased.",
     "One card has gone from the pack: 51 left, not 52.",
     "$\\dfrac{13}{52}$ applied to the FIRST draw. Without replacement the odds change.",
     "One heart has gone: 12 left, not 13."
    ]
   },
   {
    "question": "A bowl contains 6 red and 4 blue balls. Why does $P$(two blue) differ with and without replacement (16 % versus 13 %)?",
    "choices": [
     "They should be equal: the calculation is wrong",
     "With replacement the balls have time to mix better",
     "The difference is a rounding error",
     "Without replacement there are fewer blue balls left for the second draw: the events are dependent"
    ],
    "correct": 3,
    "why": [
     "The calculations are correct: the dependence is real.",
     "Mixing is not the point: the number of balls is.",
     "The difference is exact: $\\dfrac{16}{100}$ versus $\\dfrac{12}{90}$.",
     "The second factor changes from $\\dfrac{4}{10}$ to $\\dfrac{3}{9}$ when the first blue ball is not put back."
    ]
   }
  ]
 },
 "ma1c-5.7": {
  "kalla": "de584f7fd0",
  "data": [
   {
    "question": "When is a tree diagram particularly useful?",
    "choices": [
     "Only when all the outcomes are equally likely",
     "When you want to avoid multiplication",
     "Only for throws of a die",
     "When the probabilities of the individual outcomes are different"
    ],
    "correct": 3,
    "why": [
     "With equally likely outcomes a simple sample space is often enough.",
     "The multiplication along the branches is the method itself.",
     "The tree works for all kinds of multi-stage experiments.",
     "The tree keeps track of different probabilities at each stage, like 7/10 and 3/10 for the socks."
    ]
   },
   {
    "question": "How is the probability of the combination black–black calculated in a tree diagram?",
    "choices": [
     "Multiply the probabilities along the branch",
     "Take the mean of the probabilities",
     "Count the number of branches",
     "Add the probabilities along the branch"
    ],
    "correct": 0,
    "why": [
     "Along the branch the multiplication rule applies: $\\dfrac{7}{10} \\cdot \\dfrac{7}{10} = \\dfrac{49}{100}$ with replacement.",
     "Means do not belong here.",
     "The number of branches says nothing about the probability when the branches have different probabilities.",
     "Addition is used BETWEEN favourable branches, not along a branch."
    ]
   },
   {
    "question": "Without replacement: after a black sock (out of 7 black, 3 white), what probability is written on the branch to the next black one?",
    "choices": [
     "$\\dfrac{6}{10}$",
     "$\\dfrac{6}{9}$",
     "$\\dfrac{7}{9}$",
     "$\\dfrac{7}{10}$"
    ],
    "correct": 1,
    "why": [
     "The denominator must also decrease: one sock has gone from the drawer.",
     "6 black left out of 9 in total: both the numerator and the denominator have decreased by 1.",
     "$\\dfrac{7}{9}$ applies to the branch black AFTER WHITE: there all 7 black ones are still left.",
     "That is the probability in the FIRST draw."
    ]
   },
   {
    "question": "What is done when both the branch black–white and the branch white–black are favourable?",
    "choices": [
     "The probabilities of the branches are multiplied",
     "The probabilities of the branches are added",
     "Only the largest branch is counted",
     "The tree is redrawn"
    ],
    "correct": 1,
    "why": [
     "Multiplication is done ALONG branches: between favourable branches you add.",
     "Multiply along each branch, add the branches: $\\dfrac{21}{90} + \\dfrac{21}{90} = \\dfrac{42}{90}$.",
     "All the favourable branches contribute to the probability.",
     "The same tree is used: it is the reading that changes."
    ]
   }
  ]
 },
 "ma1c-5.8": {
  "kalla": "6243ce279f",
  "data": [
   {
    "question": "What is a **complementary event**?",
    "choices": [
     "The event that together with the original one makes up all possible outcomes: \"the opposite of the event\"",
     "An impossible event",
     "An event with the same probability",
     "The most likely event"
    ],
    "correct": 0,
    "why": [
     "Event + complement cover everything: $P(\\text{event}) + P(\\text{complement}) = 1$.",
     "The complement is perfectly possible: it is \"everything else\".",
     "The probability of the complement is usually different.",
     "The size of the probability does not decide what the complement is."
    ]
   },
   {
    "question": "The probability of rain is 0.3. What is the probability of the complementary event?",
    "choices": [
     "1.3",
     "0.7",
     "0",
     "0.3"
    ],
    "correct": 1,
    "why": [
     "Probabilities can never exceed 1.",
     "$1 - 0.3 = 0.7$: the probability that it does NOT rain.",
     "The complement is not impossible: it happens when it does not rain.",
     "That is the probability of the event itself."
    ]
   },
   {
    "question": "What is the complementary event to \"rolling at least a five\" with a die?",
    "choices": [
     "Rolling exactly a five",
     "Rolling a six",
     "Rolling at most a four",
     "Rolling at least a four"
    ],
    "correct": 2,
    "why": [
     "The complement must cover EVERYTHING that is not the event.",
     "The six is part of the event \"at least a five\".",
     "\"Not at least a five\" means 1, 2, 3 or 4, that is, at most a four.",
     "\"At least a four\" overlaps the event, and complements must not overlap."
    ]
   },
   {
    "question": "Why is $P$(at least one six with five dice) most easily calculated with the complementary event?",
    "choices": [
     "Dice always require a complement",
     "The complement always gives a larger probability",
     "\"At least one\" covers many combinations, but the complement \"no six\" is one simple calculation",
     "It cannot be calculated for five dice otherwise"
    ],
    "correct": 2,
    "why": [
     "Simple dice questions manage without it.",
     "The probability of the complement can be smaller or larger: the point is the simplicity.",
     "$P(\\text{no six}) = (5/6)^5 \\approx 0.40$, so $P(\\text{at least one}) = 1 - 0.40 \\approx 60\\ \\%$: one line instead of dozens of cases.",
     "It can, but it requires many combinations to be added up."
    ]
   },
   {
    "question": "According to the birthday paradox, how many people are needed for a more than 50 % chance that at least two share a birthday?",
    "choices": [
     "365",
     "57",
     "183",
     "23"
    ],
    "correct": 3,
    "why": [
     "With 365 people it is practically guaranteed: far over 50 %.",
     "57 people give over 99 %. The question was about 50 %.",
     "183 (half of 365) is the common wrong guess.",
     "Only 23. In such a group there are 253 possible pairs, so the chance grows much faster than intuition says."
    ]
   }
  ]
 },
 "ma1c-6.1": {
  "kalla": "0b169cfc5c",
  "data": [
   {
    "question": "What is the leg OPPOSITE an angle in a right-angled triangle called?",
    "choices": [
     "Hypotenuse",
     "Adjacent side",
     "Height",
     "Opposite side"
    ],
    "correct": 3,
    "why": [
     "The hypotenuse is the longest side, opposite the right angle.",
     "The adjacent side is the one that FORMS the angle together with the hypotenuse.",
     "Height is not one of the triangle's standard concepts here.",
     "The leg opposite the angle is the opposite side; the leg that forms the angle is the adjacent side."
    ]
   },
   {
    "question": "For which triangles do the trigonometric functions tan, sin and cos apply (at this level)?",
    "choices": [
     "All triangles",
     "Only triangles with two equal sides",
     "Only equilateral triangles",
     "Only right-angled triangles"
    ],
    "correct": 3,
    "why": [
     "General triangles require other theorems: the basic definitions apply to right-angled ones.",
     "Being isosceles has nothing to do with it.",
     "Equilateral triangles are not even right-angled.",
     "The definitions are based on the hypotenuse and the legs, so they require a right angle. (Generalisations come at later levels.)"
    ]
   },
   {
    "question": "What does the notation ∠ABC mean?",
    "choices": [
     "The distance from A to C",
     "The angle at vertex B, going from A to B to C",
     "The triangle with vertices A, B and C",
     "The angle at vertex A"
    ],
    "correct": 1,
    "why": [
     "Line segments are written without the angle symbol, for example AC.",
     "The middle letter gives the vertex where the angle is: ∠ABC is the angle at B.",
     "The triangle is written without the angle symbol.",
     "The angle at A is written ∠BAC or ∠CAB."
    ]
   },
   {
    "question": "In a triangle the side opposite the angle $u$ is 4 cm and the adjacent side is 3 cm. What is tan $u$?",
    "choices": [
     "$\\dfrac{3}{5}$",
     "$\\dfrac{4}{3}$",
     "$\\dfrac{4}{5}$",
     "$\\dfrac{3}{4}$"
    ],
    "correct": 1,
    "why": [
     "$\\dfrac{3}{5}$ would be the cosine in the same triangle.",
     "Opposite over adjacent: $\\tan u = \\dfrac{4}{3}$.",
     "$\\dfrac{4}{5}$ would be the sine (opposite/hypotenuse) in the 3-4-5 triangle.",
     "$\\dfrac{3}{4}$ is the tangent of the OTHER acute angle in the triangle."
    ]
   },
   {
    "question": "What does the notation \"l.u.\" mean?",
    "choices": [
     "A typo",
     "Longitude and latitude",
     "Isosceles units",
     "Length units: used when the task gives no unit"
    ],
    "correct": 3,
    "why": [
     "The notation is standard (in Swedish textbooks it is written l.e., längdenheter).",
     "Coordinates on the globe do not belong here.",
     "\"Isosceles\" describes triangles, not units.",
     "If a distance has no unit, the answer is given in l.u. (length units), like x ≈ 12 l.u. in the lesson."
    ]
   }
  ]
 },
 "ma1c-6.2": {
  "kalla": "ec2c6a4ece",
  "data": [
   {
    "question": "Which trigonometric function links the opposite side to the hypotenuse?",
    "choices": [
     "Cosine",
     "None of them",
     "Tangent",
     "Sine"
    ],
    "correct": 3,
    "why": [
     "Cosine uses the ADJACENT side and the hypotenuse.",
     "Sine is exactly that link.",
     "Tangent uses the two legs: the hypotenuse is not included.",
     "$\\sin v = \\dfrac{\\text{opposite side}}{\\text{hypotenuse}}$."
    ]
   },
   {
    "question": "In the 3-4-5 triangle the side opposite $u$ is 4 cm. What is cos $u$?",
    "choices": [
     "$\\dfrac{4}{5}$",
     "$\\dfrac{4}{3}$",
     "$\\dfrac{5}{3}$",
     "$\\dfrac{3}{5}$"
    ],
    "correct": 3,
    "why": [
     "$\\dfrac{4}{5}$ is sin $u$: opposite over hypotenuse.",
     "$\\dfrac{4}{3}$ is tan $u$.",
     "The hypotenuse is always in the DENOMINATOR for sine and cosine.",
     "Cosine takes the ADJACENT side (3) over the hypotenuse (5): $\\cos u = \\dfrac{3}{5} = 0.6$."
    ]
   },
   {
    "question": "You know an angle and its opposite side and are looking for the hypotenuse. Which function do you choose?",
    "choices": [
     "Cosine",
     "Sine",
     "Tangent",
     "Any of them"
    ],
    "correct": 1,
    "why": [
     "Cosine requires the adjacent side, which is unknown here.",
     "Sine contains exactly the opposite side and the hypotenuse, like $\\sin 41° = \\dfrac{6.1}{a}$ in the lesson.",
     "Tangent does not contain the hypotenuse at all.",
     "The choice is decided by which sides are known and which are wanted."
    ]
   },
   {
    "question": "How is the area of a triangle that is NOT right-angled calculated, with base 12, side 14 and included angle 42°?",
    "choices": [
     "The area is $\\dfrac{12 \\cdot 14}{2}$ directly",
     "The height is $14 \\cdot \\sin 42°$ and the area becomes $\\dfrac{12 \\cdot 14 \\cdot \\sin 42°}{2}$",
     "The area cannot be calculated without the third side",
     "The height is $14 \\cdot \\cos 42°$"
    ],
    "correct": 1,
    "why": [
     "That applies only if the sides are perpendicular. Here the angle is 42°.",
     "The height is drawn in and forms a right-angled triangle where 14 is the hypotenuse: $h = 14 \\sin 42°$, then the base times the height divided by 2.",
     "Two sides and the included angle are exactly enough.",
     "Cosine would give the HORIZONTAL projection, not the height."
    ]
   }
  ]
 },
 "ma1c-6.3": {
  "kalla": "382d9502ab",
  "data": [
   {
    "question": "What are the inverse trigonometric functions used for?",
    "choices": [
     "Calculating sides when the angles are known",
     "Inverting fractions",
     "Calculating ANGLES when the ratios of the sides are known",
     "Drawing triangles"
    ],
    "correct": 2,
    "why": [
     "Sides are calculated with the ordinary functions tan, sin and cos.",
     "Inverting fractions is something else, despite the similar name.",
     "tan⁻¹, sin⁻¹ and cos⁻¹ go \"backwards\": from the ratio to the angle, for example $v = \\cos^{-1}(0.753) \\approx 41°$.",
     "They are calculation tools, not drawing tools."
    ]
   },
   {
    "question": "What is another name for sin⁻¹?",
    "choices": [
     "sinh",
     "arcsin (\"arc sine\")",
     "$\\dfrac{1}{\\sin}$",
     "cosec"
    ],
    "correct": 1,
    "why": [
     "sinh is the hyperbolic sine, which belongs to later studies.",
     "sin⁻¹ and arcsin are two ways of writing the same inverse function. Recognise both.",
     "A power of −1 on the FUNCTION means inverse, not \"1 divided by\".",
     "Cosecant is $\\dfrac{1}{\\sin}$: a different function."
    ]
   },
   {
    "question": "If $\\tan v = \\dfrac{a}{b}$, how is the angle $v$ found?",
    "choices": [
     "$v = \\dfrac{b}{a}$",
     "$v = \\tan^{-1}\\left(\\dfrac{a}{b}\\right)$",
     "$v = 180° - \\dfrac{a}{b}$",
     "$v = \\tan\\left(\\dfrac{a}{b}\\right)$"
    ],
    "correct": 1,
    "why": [
     "The inverted fraction is still a ratio, not an angle.",
     "The inverse function \"unlocks\" the angle from the ratio.",
     "The angle sum is not involved here.",
     "tan goes the wrong way: from angle to ratio."
    ]
   },
   {
    "question": "In a right-angled triangle the adjacent side is 3 cm and the hypotenuse is 5 cm. How is the angle $u$ found?",
    "choices": [
     "$u = \\cos^{-1}\\left(\\dfrac{3}{5}\\right) \\approx 53°$",
     "$u = \\dfrac{3}{5} = 0.6°$",
     "$u = \\sin^{-1}\\left(\\dfrac{3}{5}\\right) \\approx 37°$",
     "$u = \\tan^{-1}\\left(\\dfrac{3}{5}\\right) \\approx 31°$"
    ],
    "correct": 0,
    "why": [
     "Adjacent side and hypotenuse → cosine, and the angle is found with cos⁻¹.",
     "0.6 is the ratio, not the angle: the inverse is needed.",
     "sin⁻¹(3/5) gives the OTHER angle (37°), where 3 cm is the opposite side.",
     "Tangent requires both legs: the hypotenuse is not included."
    ]
   }
  ]
 },
 "ma1c-6.4": {
  "kalla": "7492028173",
  "data": [
   {
    "question": "How is the distance between two points in a coordinate system found?",
    "choices": [
     "Form a right-angled triangle: the distance is the hypotenuse and is calculated with Pythagoras' theorem",
     "Multiply the coordinates",
     "Count squares along the distance",
     "Add the x- and y-differences"
    ],
    "correct": 0,
    "why": [
     "The legs are placed horizontally and vertically along the grid; $c^2 = a^2 + b^2$ gives the distance.",
     "Products of coordinates have no geometric meaning here.",
     "Counting squares only works for horizontal and vertical distances.",
     "$4 + 3 = 7$ but the distance is 5: addition gives the wrong answer."
    ]
   },
   {
    "question": "The points (−2, 1) and (2, 4) are joined. How long are the legs of the triangle?",
    "choices": [
     "5 and 5 length units",
     "2 and 4 length units",
     "4 and 3 length units",
     "−2 and 1 length units"
    ],
    "correct": 2,
    "why": [
     "5 is the hypotenuse, not the legs.",
     "Those are coordinate values, not differences.",
     "Horizontally: from −2 to 2 is 4 squares. Vertically: from 1 to 4 is 3 squares.",
     "Legs are lengths: always positive."
    ]
   },
   {
    "question": "Why is the negative solution rejected when $c^2 = 25$ gives $c = \\pm 5$?",
    "choices": [
     "Pythagoras' theorem only applies to positive numbers",
     "Negative numbers have no square root",
     "A distance cannot be negative",
     "It is not rejected: both are answers"
    ],
    "correct": 2,
    "why": [
     "The theorem itself does not care: the geometry does.",
     "$(-5)^2 = 25$ works perfectly well mathematically: it is the interpretation that excludes it.",
     "The equation has two solutions, but in the context only the positive one is reasonable, just as with the side of the square.",
     "As a LENGTH only 5 is valid."
    ]
   },
   {
    "question": "How is the angle between the line segment and the *x*-axis found when the legs 3 (opposite) and 4 (adjacent) are known?",
    "choices": [
     "$v = \\tan^{-1}\\left(\\dfrac{3}{4}\\right) \\approx 37°$",
     "$v = \\dfrac{3}{4} \\cdot 90°$",
     "$v = \\sin^{-1}\\left(\\dfrac{3}{4}\\right)$",
     "$v = \\tan\\left(\\dfrac{3}{4}\\right)$"
    ],
    "correct": 0,
    "why": [
     "Two legs → tangent, and the angle is found with the inverse: $\\tan^{-1}(0.75) \\approx 37°$.",
     "Angles do not scale linearly with the ratio.",
     "sin⁻¹ requires the hypotenuse in the denominator, and $\\dfrac{3}{4}$ is the ratio of the legs.",
     "tan without the inverse goes the wrong way: from angle to ratio."
    ]
   }
  ]
 },
 "ma1c-6.5": {
  "kalla": "56691338b8",
  "data": [
   {
    "question": "Which of the following quantities is a scalar?",
    "choices": [
     "Force",
     "Velocity",
     "Temperature",
     "Acceleration"
    ],
    "correct": 2,
    "why": [
     "Force has a direction: a vector.",
     "Velocity has a direction: a vector.",
     "Temperature has only a size, no direction. A scalar.",
     "Acceleration has a direction: a vector."
    ]
   },
   {
    "question": "How is a vector represented graphically?",
    "choices": [
     "With an arrow whose length is the magnitude and whose direction is the direction of the vector",
     "With a number",
     "With a circle whose radius is the magnitude",
     "With a point"
    ],
    "correct": 0,
    "why": [
     "The arrow carries both properties: length = magnitude, direction of the arrow = direction.",
     "A number alone is enough only for scalars.",
     "A circle has no direction.",
     "A point has neither length nor direction."
    ]
   },
   {
    "question": "What happens to a vector when it is translated (moved parallel to itself)?",
    "choices": [
     "Nothing: it is still the same vector",
     "It changes direction",
     "It becomes a scalar",
     "It becomes longer"
    ],
    "correct": 0,
    "why": [
     "The starting point is not part of the vector, only the magnitude and direction. If it is moved without changing these, it is identical.",
     "The direction is preserved when moving it parallel to itself.",
     "Vectors remain vectors.",
     "The length is preserved too."
    ]
   },
   {
    "question": "How is the length of the vector $\\vec{u}$ written and read aloud?",
    "choices": [
     "$u°$: \"u degrees\"",
     "$\\vec{u}^2$: \"u squared\"",
     "$|\\vec{u}|$: \"the magnitude (absolute value) of u\"",
     "$-\\vec{u}$: \"minus u\""
    ],
    "correct": 2,
    "why": [
     "Degrees measure angles, not lengths.",
     "The square of the length appears in the calculation, but the notation for the length is the magnitude.",
     "The length is written with absolute value bars and calculated with Pythagoras' theorem.",
     "$-\\vec{u}$ is the opposite vector, not the length."
    ]
   },
   {
    "question": "The vector $\\overrightarrow{AB}$ has the legs 8 and 4 in the grid. What is $|\\overrightarrow{AB}|$?",
    "choices": [
     "$\\sqrt{80}$ l.u.",
     "$\\sqrt{12}$ l.u.",
     "$12$ l.u.",
     "$80$ l.u."
    ],
    "correct": 0,
    "why": [
     "$|\\overrightarrow{AB}|^2 = 8^2 + 4^2 = 80$, so the length is $\\sqrt{80}$ l.u.",
     "$\\sqrt{8 + 4}$ mixes things up: square FIRST, then add.",
     "$8 + 4 = 12$, but legs are not added: Pythagoras' theorem applies.",
     "80 is the SQUARE of the length."
    ]
   }
  ]
 },
 "ma1c-6.6": {
  "kalla": "1bf420acef",
  "data": [
   {
    "question": "What happens to a vector that is multiplied by a NEGATIVE scalar?",
    "choices": [
     "The magnitude is scaled and the direction is reversed",
     "The vector disappears",
     "Only the magnitude changes",
     "The vector is rotated 90 degrees"
    ],
    "correct": 0,
    "why": [
     "For example, $-2\\vec{w}$ is twice as long as $\\vec{w}$ and points the opposite way.",
     "Only multiplying by 0 makes the vector zero.",
     "The minus sign does more than that: it reverses the direction.",
     "Scalar multiplication never rotates: it scales and can reverse."
    ]
   },
   {
    "question": "How is the sum of two vectors drawn with the polygon method?",
    "choices": [
     "The longer vector is chosen as the answer",
     "The vectors are drawn on top of each other",
     "The angle between them is halved",
     "One is moved to the tip of the other; the resultant is drawn from start to finish"
    ],
    "correct": 3,
    "why": [
     "Both vectors contribute to the resultant.",
     "On top of each other nothing can be read off.",
     "Angles are not halved in vector addition.",
     "Tip-to-tail chain, then the resultant from the first starting point to the last tip."
    ]
   },
   {
    "question": "What is the vector $\\vec{w} = \\vec{u} + \\vec{v}$ called?",
    "choices": [
     "The inverse",
     "The resultant",
     "The scalar product",
     "The complement"
    ],
    "correct": 1,
    "why": [
     "Inverse is used for functions and opposite vectors, not sums.",
     "The sum vector is called the resultant.",
     "The scalar product is a different operation (later levels).",
     "Complement belongs to probability."
    ]
   },
   {
    "question": "Compared with $\\vec{w}$, what is $3\\vec{w}$?",
    "choices": [
     "Three times as long, the same direction",
     "The same length, a different direction",
     "A scalar",
     "Three times as long, the opposite direction"
    ],
    "correct": 0,
    "why": [
     "A positive factor: the length is scaled, the direction is kept.",
     "The length changes by the factor 3.",
     "The product of a scalar and a vector is still a vector.",
     "The opposite direction requires a negative factor."
    ]
   }
  ]
 },
 "ma1c-6.7": {
  "kalla": "4eaee4a8e2",
  "data": [
   {
    "question": "How is $\\vec{u} - \\vec{v}$ calculated graphically?",
    "choices": [
     "Simplify both vectors by 2",
     "Vectors cannot be subtracted graphically",
     "Draw $-\\vec{v}$, move it to the tip of $\\vec{u}$ and draw the resultant from start to finish",
     "Draw an arrow between the starting points of the vectors"
    ],
    "correct": 2,
    "why": [
     "Simplifying belongs to fractions, not vectors.",
     "They can, by rewriting it as an addition.",
     "The subtraction is rewritten as addition of the opposite vector and solved with the polygon method.",
     "The starting points say nothing: it is the tip-to-tail chain that counts."
    ]
   },
   {
    "question": "What is $\\vec{u} - \\vec{v}$ rewritten as an addition?",
    "choices": [
     "$\\vec{u} + (-\\vec{v})$",
     "$\\vec{u} + \\vec{v}$",
     "$-\\vec{u} + \\vec{v}$",
     "$-(\\vec{u} + \\vec{v})$"
    ],
    "correct": 0,
    "why": [
     "Minus a vector = plus its opposite vector.",
     "Without the change of sign you get a completely different resultant.",
     "That is $\\vec{v} - \\vec{u}$: the resultant points the opposite way.",
     "That is the opposite vector of the SUM."
    ]
   },
   {
    "question": "The vector $\\vec{v}$ points diagonally up to the right. Which way does $-\\vec{v}$ point?",
    "choices": [
     "Diagonally down to the right",
     "The same way, but shorter",
     "Diagonally up to the left",
     "Diagonally down to the left"
    ],
    "correct": 3,
    "why": [
     "The same thing: only one component reversed.",
     "The length is preserved and the direction is completely reversed.",
     "Only one component has been reversed: both should change sign.",
     "The opposite vector points directly the other way: up to the right becomes down to the left."
    ]
   },
   {
    "question": "Where is the resultant $\\vec{w} = \\vec{u} - \\vec{v}$ drawn in the chain u followed by minus v?",
    "choices": [
     "From the tip of $\\vec{u}$ to the starting point of $-\\vec{v}$",
     "From the origin, always",
     "Between the two tips",
     "From the starting point of $\\vec{u}$ to the tip of $-\\vec{v}$"
    ],
    "correct": 3,
    "why": [
     "That is backwards, and those points coincide in the chain anyway.",
     "Vectors are not tied to the origin.",
     "Tip to tip gives the wrong vector.",
     "Just as in addition: the resultant goes from the start of the chain to its end."
    ]
   }
  ]
 },
 "ma1c-6.8": {
  "kalla": "0fd7421c38",
  "data": [
   {
    "question": "What do the coordinates in the vector $\\overrightarrow{AB} = (8,\\ 4)$ correspond to?",
    "choices": [
     "The length and angle of the vector",
     "The point where the vector ends",
     "Two different vectors",
     "The lengths of the legs of the right-angled triangle that the vector forms"
    ],
    "correct": 3,
    "why": [
     "The length and angle can be CALCULATED from the coordinates, but they are not what is written there.",
     "The vector can start anywhere: the coordinates give the displacement, not a point.",
     "It is ONE vector with two components.",
     "The displacement is 8 in the *x*-direction and 4 in the *y*-direction: exactly the legs that go into Pythagoras' theorem."
    ]
   },
   {
    "question": "Calculate the length of $\\vec{u} = (6,\\ 8)$.",
    "choices": [
     "48 l.u.",
     "14 l.u.",
     "$\\sqrt{14}$ l.u.",
     "10 l.u."
    ],
    "correct": 3,
    "why": [
     "$6 \\cdot 8 = 48$: there is no multiplication in the formula.",
     "$6 + 8 = 14$: coordinates are not simply added.",
     "Square FIRST and then add, not the other way round.",
     "$\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$."
    ]
   },
   {
    "question": "Why does it not matter that a coordinate is negative when the length is calculated?",
    "choices": [
     "The root removes the sign afterwards",
     "Squaring makes it positive",
     "Negative coordinates are forbidden",
     "It does matter: the length can be negative"
    ],
    "correct": 1,
    "why": [
     "The sign disappears already WHEN squaring.",
     "$(-5)^2 = 25$: under the root sign everything is positive, so $(11, -5)$ has the same length as $(11, 5)$.",
     "Vectors point in all directions: negative coordinates are everyday things.",
     "A length is always positive."
    ]
   },
   {
    "question": "How is the length formula written with the formula sheet's notation for $\\vec{u} = (a_x,\\ a_y)$?",
    "choices": [
     "$|\\vec{u}| = \\sqrt{a_x^2 + a_y^2}$",
     "$|\\vec{u}| = a_x^2 + a_y^2$",
     "$|\\vec{u}| = \\sqrt{a_x + a_y}$",
     "$|\\vec{u}| = a_x \\cdot a_y$"
    ],
    "correct": 0,
    "why": [
     "The same Pythagoras formula, with the indices x and y on the components.",
     "Without the root you get the SQUARE of the length.",
     "The components must be squared before they are added.",
     "The product has nothing to do with the length."
    ]
   }
  ]
 }
});
