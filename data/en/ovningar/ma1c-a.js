/* Engelsk översättning av ovningar (ma1c-a). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "ma1c-1.1": {
  "kalla": "1b53b3417e",
  "data": [
   {
    "level": 1,
    "question": "Calculate $12 - (-9)$.",
    "answer": {
     "value": 21,
     "unit": ""
    },
    "solution": "Two minus signs next to each other (same signs) can be replaced by a plus sign:\n\n$$ 12 - (-9) = 12 + 9 = 21 $$\n\n**Answer:** 21"
   },
   {
    "level": 1,
    "question": "Calculate $(-8) \\cdot (-6)$.",
    "answer": {
     "value": 48,
     "unit": ""
    },
    "solution": "Same signs multiplied together give a **positive** value (\"minus times minus gives plus\"):\n\n$$ (-8) \\cdot (-6) = 48 $$\n\n**Answer:** 48"
   },
   {
    "level": 1,
    "question": "Which of the following numbers is an integer but **not** a natural number?",
    "choices": [
     "$-4$",
     "$7$",
     "$\\dfrac{2}{3}$",
     "$0$"
    ],
    "correct": 0,
    "solution": "The natural numbers $\\mathbb{N} = \\{0,\\ 1,\\ 2,\\ 3,\\ \\ldots\\}$ contain all non-negative integers. The integers $\\mathbb{Z}$ also contain the negative integers.\n\n- $-4$ is an integer but not a natural number (it is negative).\n- $7$ and $0$ are both natural numbers and integers.\n- $\\dfrac{2}{3}$ is not an integer at all. It is a rational number.\n\n**Answer:** $-4$"
   },
   {
    "level": 2,
    "question": "Calculate $\\dfrac{-36}{-4} + 5 \\cdot (-3)$.",
    "answer": {
     "value": -6,
     "unit": ""
    },
    "solution": "Take one step at a time and use the sign rules.\n\nThe division: same signs give plus.\n\n$$ \\frac{-36}{-4} = 9 $$\n\nThe multiplication: different signs give minus.\n\n$$ 5 \\cdot (-3) = -15 $$\n\nAdd:\n\n$$ 9 + (-15) = 9 - 15 = -6 $$\n\n**Answer:** −6"
   },
   {
    "level": 2,
    "question": "Which of the following statements is **false**?",
    "choices": [
     "All natural numbers are rational numbers.",
     "π is a real number.",
     "All rational numbers are integers.",
     "$-0.25$ is a rational number."
    ],
    "correct": 2,
    "solution": "The number sets lie inside each other: $\\mathbb{N}$ lies in $\\mathbb{Z}$, which lies in $\\mathbb{Q}$, which lies in $\\mathbb{R}$, but **not** the other way round.\n\n- All natural numbers are rational: true, for example $5 = \\dfrac{5}{1}$.\n- π is real: true. π is an irrational number, and the irrational numbers are part of the real numbers.\n- **All rational numbers are integers: false.** For example, $\\dfrac{1}{3}$ is rational but not an integer.\n- $-0.25$ is rational: true, since $-0.25 = -\\dfrac{1}{4}$.\n\n**Answer:** \"All rational numbers are integers\" is false."
   },
   {
    "level": 3,
    "question": "The numbers $a$ and $b$ are both **negative** integers and $a < b$. Which of the following expressions are then **certainly positive**?<br>a)&nbsp;$a \\cdot b$&emsp;&emsp;b)&nbsp;$a + b$&emsp;&emsp;c)&nbsp;$a - b$&emsp;&emsp;d)&nbsp;$b - a$",
    "choices": [
     "a and c",
     "a and d",
     "a, b and d",
     "only a"
    ],
    "correct": 1,
    "solution": "**The key insight:** test with concrete numbers and then justify in general. Take, for example, $a = -5$ and $b = -2$ (then $a < b$, since −5 lies to the left of −2 on the number line).\n\n**a)** $a \\cdot b$: minus times minus gives plus, for example $(-5) \\cdot (-2) = 10$. The product of two negative numbers is **always positive**.\n\n**b)** $a + b$: the sum of two negative numbers is always **negative**, for example $(-5) + (-2) = -7$.\n\n**c)** $a - b$: since $a < b$, $a - b$ is **negative**, for example $(-5) - (-2) = -5 + 2 = -3$.\n\n**d)** $b - a$: since $b > a$, $b - a$ is **positive**, for example $(-2) - (-5) = -2 + 5 = 3$. The difference \"larger minus smaller\" is always positive.\n\n**Answer:** a and d.\n\n**General conclusion:** $x - y > 0$ exactly when $x > y$, regardless of the signs of the numbers, and a product of two numbers with the same sign is always positive."
   }
  ]
 },
 "ma1c-1.2": {
  "kalla": "74c1d495fd",
  "data": [
   {
    "level": 1,
    "question": "Simplify $\\dfrac{12}{18}$ as far as possible.",
    "choices": [
     "$\\dfrac{2}{3}$",
     "$\\dfrac{6}{9}$",
     "$\\dfrac{3}{4}$",
     "$\\dfrac{4}{6}$"
    ],
    "correct": 0,
    "solution": "We divide the numerator and the denominator by the same number until it is no longer possible. The greatest common divisor of 12 and 18 is 6:\n\n$$ \\frac{12}{18} = \\frac{12/6}{18/6} = \\frac{2}{3} $$\n\n$\\dfrac{6}{9}$ and $\\dfrac{4}{6}$ are indeed equal to $\\dfrac{12}{18}$, but they can be simplified further, so they are not simplified as far as possible.\n\n**Answer:** $\\dfrac{2}{3}$"
   },
   {
    "level": 1,
    "question": "Expand $\\dfrac{3}{5}$ so that the denominator becomes 20.",
    "choices": [
     "$\\dfrac{3}{20}$",
     "$\\dfrac{12}{20}$",
     "$\\dfrac{15}{20}$",
     "$\\dfrac{60}{20}$"
    ],
    "correct": 1,
    "solution": "The denominator 5 should become 20, so we multiply by 4, and then **both** the numerator and the denominator must be multiplied by 4 so that the value of the fraction does not change:\n\n$$ \\frac{3}{5} = \\frac{3 \\cdot 4}{5 \\cdot 4} = \\frac{12}{20} $$\n\n**Answer:** $\\dfrac{12}{20}$"
   },
   {
    "level": 1,
    "question": "What is the number **below** the fraction bar called?",
    "choices": [
     "Numerator",
     "Quotient",
     "Denominator",
     "Product"
    ],
    "correct": 2,
    "solution": "The number below the fraction bar is called the **denominator** and the number above it is called the **numerator**. Memory rule: the **d**enominator is **d**own below.\n\n**Answer:** Denominator"
   },
   {
    "level": 2,
    "question": "Which fraction is larger: $\\dfrac{5}{8}$ or $\\dfrac{7}{11}$?",
    "choices": [
     "$\\dfrac{5}{8}$",
     "$\\dfrac{7}{11}$",
     "They are equal"
    ],
    "correct": 1,
    "solution": "We rewrite the fractions with the same denominator by expanding each fraction by the other fraction's denominator:\n\n$$ \\frac{5}{8} = \\frac{5 \\cdot 11}{8 \\cdot 11} = \\frac{55}{88} \\qquad \\frac{7}{11} = \\frac{7 \\cdot 8}{11 \\cdot 8} = \\frac{56}{88} $$\n\nSince $\\dfrac{56}{88} > \\dfrac{55}{88}$, $\\dfrac{7}{11}$ is the larger.\n\n**Answer:** $\\dfrac{7}{11}$"
   },
   {
    "level": 2,
    "question": "Which of the fractions $\\dfrac{6}{8}$, $\\dfrac{9}{12}$, $\\dfrac{12}{16}$ and $\\dfrac{10}{14}$ are equal to $\\dfrac{3}{4}$?",
    "choices": [
     "All four",
     "Only $\\dfrac{6}{8}$",
     "$\\dfrac{6}{8}$, $\\dfrac{9}{12}$ and $\\dfrac{12}{16}$",
     "$\\dfrac{6}{8}$ and $\\dfrac{10}{14}$"
    ],
    "correct": 2,
    "solution": "Simplify each fraction as far as possible:\n\n$$ \\frac{6}{8} = \\frac{3}{4} \\qquad \\frac{9}{12} = \\frac{3}{4} \\qquad \\frac{12}{16} = \\frac{3}{4} \\qquad \\frac{10}{14} = \\frac{5}{7} $$\n\nThe first three are therefore expansions of $\\dfrac{3}{4}$ (by 2, 3 and 4 respectively), but $\\dfrac{10}{14}$ simplifies to $\\dfrac{5}{7} \\neq \\dfrac{3}{4}$.\n\n**Answer:** $\\dfrac{6}{8}$, $\\dfrac{9}{12}$ and $\\dfrac{12}{16}$"
   },
   {
    "level": 3,
    "question": "Which of the following fractions lies **between** $\\dfrac{1}{3}$ and $\\dfrac{1}{2}$?",
    "choices": [
     "$\\dfrac{1}{4}$",
     "$\\dfrac{5}{12}$",
     "$\\dfrac{3}{5}$",
     "$\\dfrac{2}{6}$"
    ],
    "correct": 1,
    "solution": "**The key insight:** to be able to compare all the fractions at once, we rewrite $\\dfrac{1}{3}$ and $\\dfrac{1}{2}$ with the same denominator. The denominator 12 works well (both 3 and 2 divide 12):\n\n$$ \\frac{1}{3} = \\frac{4}{12} \\qquad\\qquad \\frac{1}{2} = \\frac{6}{12} $$\n\nSo we are looking for a fraction between $\\dfrac{4}{12}$ and $\\dfrac{6}{12}$, and that is exactly where $\\dfrac{5}{12}$ lies.\n\nCheck of the others: $\\dfrac{1}{4} = \\dfrac{3}{12}$ is too small, $\\dfrac{3}{5} = \\dfrac{36}{60} > \\dfrac{30}{60} = \\dfrac{1}{2}$ is too large, and $\\dfrac{2}{6} = \\dfrac{4}{12} = \\dfrac{1}{3}$ does not lie *between* the limits. It is equal to the lower one.\n\n**Answer:** $\\dfrac{5}{12}$\n\n**General conclusion:** between two fractions there are always more fractions. Rewrite with a common denominator (expand further if needed) and they appear directly."
   }
  ]
 },
 "ma1c-1.3": {
  "kalla": "ddc4d5a287",
  "data": [
   {
    "level": 1,
    "question": "Calculate $\\dfrac{2}{9} + \\dfrac{5}{9}$.",
    "choices": [
     "$\\dfrac{7}{18}$",
     "$\\dfrac{7}{9}$",
     "$\\dfrac{10}{81}$",
     "$\\dfrac{3}{9}$"
    ],
    "correct": 1,
    "solution": "The fractions have the same denominator. Add the numerators and keep the denominator:\n\n$$ \\frac{2}{9} + \\frac{5}{9} = \\frac{2 + 5}{9} = \\frac{7}{9} $$\n\nThe denominators should **not** be added. The denominator only tells you how large the parts are.\n\n**Answer:** $\\dfrac{7}{9}$"
   },
   {
    "level": 1,
    "question": "Calculate $\\dfrac{5}{6} - \\dfrac{1}{3}$.",
    "choices": [
     "$\\dfrac{4}{3}$",
     "$\\dfrac{2}{3}$",
     "$\\dfrac{1}{2}$",
     "$\\dfrac{1}{3}$"
    ],
    "correct": 2,
    "solution": "Expand $\\dfrac{1}{3}$ by 2 so that both fractions get the denominator 6 (method 1):\n\n$$ \\frac{5}{6} - \\frac{1}{3} = \\frac{5}{6} - \\frac{1 \\cdot 2}{3 \\cdot 2} = \\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2} $$\n\n**Answer:** $\\dfrac{1}{2}$"
   },
   {
    "level": 1,
    "question": "Write $2\\dfrac{3}{4}$ in fraction form.",
    "choices": [
     "$\\dfrac{6}{4}$",
     "$\\dfrac{23}{4}$",
     "$\\dfrac{9}{4}$",
     "$\\dfrac{11}{4}$"
    ],
    "correct": 3,
    "solution": "Take the number in front of the fraction (2) and multiply by the denominator (4). Add the number in the numerator (3). Divide the whole sum by the denominator:\n\n$$ 2\\frac{3}{4} = \\frac{2 \\cdot 4 + 3}{4} = \\frac{11}{4} $$\n\n**Answer:** $\\dfrac{11}{4}$"
   },
   {
    "level": 2,
    "question": "Calculate $\\dfrac{3}{4} + \\dfrac{5}{6}$. Give your answer in simplest fraction form.",
    "choices": [
     "$\\dfrac{8}{10}$",
     "$\\dfrac{19}{12}$",
     "$\\dfrac{15}{24}$",
     "$\\dfrac{19}{24}$"
    ],
    "correct": 1,
    "solution": "The lowest common denominator of 4 and 6 is 12. Expand $\\dfrac{3}{4}$ by 3 and $\\dfrac{5}{6}$ by 2:\n\n$$ \\frac{3}{4} + \\frac{5}{6} = \\frac{3 \\cdot 3}{4 \\cdot 3} + \\frac{5 \\cdot 2}{6 \\cdot 2} = \\frac{9}{12} + \\frac{10}{12} = \\frac{19}{12} $$\n\nAdding numerators and denominators separately ($\\dfrac{8}{10}$) is wrong. The fractions must first get the same denominator.\n\n**Answer:** $\\dfrac{19}{12}$"
   },
   {
    "level": 2,
    "question": "Find the lowest common denominator (LCD) of 8 and 12.",
    "answer": {
     "value": 24,
     "unit": ""
    },
    "solution": "Write the multiples of 8 and 12 in a column each:\n\nMultiples of 8: 8, 16, **24**, 32, 40 …\nMultiples of 12: 12, **24**, 36, 48 …\n\nThe first multiple that appears in both columns is 24.\n\n**Answer:** LCD = 24"
   },
   {
    "level": 2,
    "question": "Find the lowest common denominator (LCD) of 20 and 24 using prime factorisation.",
    "answer": {
     "value": 120,
     "unit": ""
    },
    "solution": "Prime factorise the denominators, for example with factor trees:\n\n$$ 20 = 2 \\cdot 2 \\cdot 5 \\qquad 24 = 2 \\cdot 2 \\cdot 2 \\cdot 3 $$\n\nInclude each prime as many times as it occurs at most in either of the denominators: the two three times (in 24), the three once and the five once.\n\n$$ \\text{LCD} = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 5 = 120 $$\n\nCheck: $120 = 20 \\cdot 6 = 24 \\cdot 5$, so 120 is divisible by both denominators. The product $20 \\cdot 24 = 480$ is also a common denominator, but four times larger than necessary.\n\n**Answer:** LCD = 120"
   },
   {
    "level": 3,
    "question": "Calculate $\\dfrac{5}{6} + \\dfrac{3}{8} - \\dfrac{7}{12}$. Give your answer in simplest fraction form.",
    "choices": [
     "$\\dfrac{1}{24}$",
     "$\\dfrac{17}{24}$",
     "$\\dfrac{5}{8}$",
     "$\\dfrac{7}{8}$"
    ],
    "correct": 2,
    "solution": "**The key insight:** all three fractions need the same denominator at once. Look for the lowest common denominator of 6, 8 and 12 by listing multiples:\n\nMultiples of 6: 6, 12, 18, **24** …\nMultiples of 8: 8, 16, **24** …\nMultiples of 12: 12, **24** …\n\nLCD = 24. Expand the fractions by 4, 3 and 2 respectively:\n\n$$ \\frac{5}{6} + \\frac{3}{8} - \\frac{7}{12} = \\frac{20}{24} + \\frac{9}{24} - \\frac{14}{24} = \\frac{20 + 9 - 14}{24} = \\frac{15}{24} $$\n\nSimplify by 3:\n\n$$ \\frac{15}{24} = \\frac{15/3}{24/3} = \\frac{5}{8} $$\n\n**Answer:** $\\dfrac{5}{8}$\n\n**General conclusion:** with more than two fractions it always pays to find ONE common denominator for all of them at once, and remember to simplify the answer."
   },
   {
    "level": 3,
    "question": "Calculate $\\dfrac{7}{36} - \\dfrac{5}{54}$. Find the lowest common denominator using prime factorisation and give your answer in simplest fraction form.",
    "choices": [
     "$\\dfrac{2}{18}$",
     "$\\dfrac{11}{108}$",
     "$\\dfrac{1}{54}$",
     "$\\dfrac{198}{1\\,944}$"
    ],
    "correct": 1,
    "solution": "**The key insight:** a table of multiples for 36 and 54 becomes long, but the prime factorisation gives the LCD directly.\n\n$$ 36 = 2 \\cdot 2 \\cdot 3 \\cdot 3 \\qquad 54 = 2 \\cdot 3 \\cdot 3 \\cdot 3 $$\n\nThe two occurs most often in 36 (twice) and the three most often in 54 (three times):\n\n$$ \\text{LCD} = 2 \\cdot 2 \\cdot 3 \\cdot 3 \\cdot 3 = 108 $$\n\nSince $36 \\cdot 3 = 108$ and $54 \\cdot 2 = 108$, the fractions are expanded by 3 and 2 respectively:\n\n$$ \\frac{7}{36} - \\frac{5}{54} = \\frac{7 \\cdot 3}{36 \\cdot 3} - \\frac{5 \\cdot 2}{54 \\cdot 2} = \\frac{21}{108} - \\frac{10}{108} = \\frac{11}{108} $$\n\n11 is a prime that does not divide 108, so the fraction cannot be simplified. Multiplying the denominators instead ($36 \\cdot 54 = 1\\,944$) gives $\\dfrac{198}{1\\,944}$, which is the same number but must be simplified by 18 to reach simplest form.\n\n**Answer:** $\\dfrac{11}{108}$"
   }
  ]
 },
 "ma1c-1.4": {
  "kalla": "53917d72bb",
  "data": [
   {
    "level": 1,
    "question": "Calculate $\\dfrac{2}{3} \\cdot \\dfrac{5}{7}$.",
    "choices": [
     "$\\dfrac{14}{15}$",
     "$\\dfrac{10}{7}$",
     "$\\dfrac{7}{10}$",
     "$\\dfrac{10}{21}$"
    ],
    "correct": 3,
    "solution": "When two fractions are multiplied, the numerators are multiplied together and the denominators are multiplied together:\n\n$$ \\frac{2}{3} \\cdot \\frac{5}{7} = \\frac{2 \\cdot 5}{3 \\cdot 7} = \\frac{10}{21} $$\n\n**Answer:** $\\dfrac{10}{21}$"
   },
   {
    "level": 1,
    "question": "Calculate $4 \\cdot \\dfrac{3}{5}$.",
    "choices": [
     "$\\dfrac{12}{20}$",
     "$\\dfrac{12}{5}$",
     "$\\dfrac{3}{20}$",
     "$\\dfrac{7}{5}$"
    ],
    "correct": 1,
    "solution": "An integer is multiplied by the **numerator**, and the denominator is kept:\n\n$$ 4 \\cdot \\frac{3}{5} = \\frac{4 \\cdot 3}{5} = \\frac{12}{5} $$\n\nIf you also multiply the denominator by 4 (the answer $\\dfrac{12}{20}$), you have in fact only expanded the fraction, so nothing has been multiplied.\n\n**Answer:** $\\dfrac{12}{5}$"
   },
   {
    "level": 1,
    "question": "Calculate $\\dfrac{3}{4} \\Big/ \\dfrac{5}{2}$.",
    "choices": [
     "$\\dfrac{15}{8}$",
     "$\\dfrac{8}{15}$",
     "$\\dfrac{3}{10}$",
     "$\\dfrac{20}{6}$"
    ],
    "correct": 2,
    "solution": "Replace the division by multiplication and invert the fraction in the denominator:\n\n$$ \\frac{3}{4} \\Big/ \\frac{5}{2} = \\frac{3}{4} \\cdot \\frac{2}{5} = \\frac{3 \\cdot 2}{4 \\cdot 5} = \\frac{6}{20} = \\frac{3}{10} $$\n\n**Answer:** $\\dfrac{3}{10}$"
   },
   {
    "level": 2,
    "question": "How much is $\\dfrac{3}{8}$ of 96 kr?",
    "answer": {
     "value": 36,
     "unit": "kr"
    },
    "solution": "A fraction *of* something is calculated by multiplying by the fraction:\n\n$$ \\frac{3}{8} \\cdot 96 = \\frac{3 \\cdot 96}{8} $$\n\nSimplify by 8 before multiplying ($96/8 = 12$):\n\n$$ \\frac{3 \\cdot 96/8}{8/8} = 3 \\cdot 12 = 36 $$\n\n**Answer:** 36 kr"
   },
   {
    "level": 2,
    "question": "Calculate $\\dfrac{5}{24} \\cdot \\dfrac{8}{15}$ by factorising and simplifying before you multiply. Give your answer in simplest fraction form.",
    "choices": [
     "$\\dfrac{40}{360}$",
     "$\\dfrac{1}{9}$",
     "$\\dfrac{2}{9}$",
     "$\\dfrac{1}{3}$"
    ],
    "correct": 1,
    "solution": "Factorise the numerator and the denominator and simplify before multiplying:\n\n$$ \\frac{5}{24} \\cdot \\frac{8}{15} = \\frac{5 \\cdot 8}{24 \\cdot 15} = \\frac{5 \\cdot 8}{8 \\cdot 3 \\cdot 3 \\cdot 5} $$\n\nThe factors 5 and 8 appear in both the numerator and the denominator and can be cancelled (1 remains in the numerator):\n\n$$ \\frac{1}{3 \\cdot 3} = \\frac{1}{9} $$\n\n$\\dfrac{40}{360}$ is the same value but not simplified, and much easier to make mistakes with.\n\n**Answer:** $\\dfrac{1}{9}$"
   },
   {
    "level": 3,
    "question": "Emma eats $\\dfrac{1}{4}$ of a cake. Then Noah eats $\\dfrac{2}{3}$ of what is **left**. What fraction of the whole cake is left after that?",
    "choices": [
     "$\\dfrac{5}{12}$",
     "$\\dfrac{1}{4}$",
     "$\\dfrac{1}{12}$",
     "$\\dfrac{1}{2}$"
    ],
    "correct": 1,
    "solution": "**The key insight:** Noah's fraction is taken of the *remainder*, not of the whole cake. A fraction of something means multiplying by exactly that.\n\nAfter Emma, $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$ of the cake is left.\n\nNoah eats $\\dfrac{2}{3}$ **of** $\\dfrac{3}{4}$:\n\n$$ \\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{2 \\cdot 3}{3 \\cdot 4} = \\frac{6}{12} = \\frac{1}{2} $$\n\nSo what is left is\n\n$$ \\frac{3}{4} - \\frac{1}{2} = \\frac{3}{4} - \\frac{2}{4} = \\frac{1}{4} $$\n\n**Answer:** $\\dfrac{1}{4}$ of the cake is left.\n\n**General conclusion:** when a share is taken \"of what is left\", the fractions are multiplied. What remains is $\\left(1 - \\dfrac{1}{4}\\right) \\cdot \\left(1 - \\dfrac{2}{3}\\right) = \\dfrac{3}{4} \\cdot \\dfrac{1}{3} = \\dfrac{1}{4}$. The same way of thinking comes back in the change factors of percentage calculations."
   }
  ]
 },
 "ma1c-1.5": {
  "kalla": "6e941664bb",
  "data": [
   {
    "level": 1,
    "question": "Round 3.276 to tenths.",
    "answer": {
     "value": 3.3,
     "unit": "",
     "tol": 0.001
    },
    "solution": "The tenths digit is 2. The digit *after* the two is 7, and since 7 belongs to the group 5–9, the rounding digit is increased by 1:\n\n$$ 3.276 \\approx 3.3 $$\n\n**Answer:** 3.3"
   },
   {
    "level": 1,
    "question": "Which digit in the number 5 830.47 represents the number of **hundreds**?",
    "choices": [
     "5",
     "8",
     "3",
     "4"
    ],
    "correct": 1,
    "solution": "The positions to the left of the decimal point are (counted from the decimal point): ones (0), tens (3), hundreds (8) and thousands (5). The digit 4 represents tenths.\n\n**Answer:** 8"
   },
   {
    "level": 1,
    "question": "How many significant figures does the number 0.0450 have?",
    "choices": [
     "2",
     "3",
     "4",
     "5"
    ],
    "correct": 1,
    "solution": "The first significant figure is the first digit that is not 0, that is, the 4. The zeros *before* it are only placeholders. The zero *after* the 5, however, is a significant figure (it shows that the measurement is accurate to that position). The significant figures are therefore 4, 5 and 0.\n\n**Answer:** 3 significant figures"
   },
   {
    "level": 2,
    "question": "A rectangular garden paving slab measures $32.6\\ \\mathrm{cm}$ × $18\\ \\mathrm{cm}$. Calculate the area of the slab and give your answer with the correct number of significant figures.",
    "choices": [
     "$586.8\\ \\mathrm{cm^2}$",
     "$587\\ \\mathrm{cm^2}$",
     "$590\\ \\mathrm{cm^2}$",
     "$600\\ \\mathrm{cm^2}$"
    ],
    "correct": 2,
    "solution": "The area is\n\n$$ 32.6 \\cdot 18 = 586.8\\ \\mathrm{cm^2} $$\n\nIn multiplication, the value with the **fewest significant figures** decides: 32.6 has three significant figures and 18 has two. The answer should therefore have two significant figures:\n\n$$ 586.8\\ \\mathrm{cm^2} \\approx 590\\ \\mathrm{cm^2} $$\n\n**Answer:** $590\\ \\mathrm{cm^2}$"
   },
   {
    "level": 2,
    "question": "Calculate $4.62 + 2.1$ and give your answer with the correct number of decimal places.",
    "answer": {
     "value": 6.7,
     "unit": "",
     "tol": 0.001
    },
    "solution": "The sum is\n\n$$ 4.62 + 2.1 = 6.72 $$\n\nIn addition, the value with the **fewest decimal places** decides: 4.62 has two decimal places and 2.1 has one. The answer is rounded to one decimal place:\n\n$$ 6.72 \\approx 6.7 $$\n\n**Answer:** 6.7"
   },
   {
    "level": 3,
    "question": "The number 7.4498 is to be rounded to **one decimal place**. Amir rounds in two steps: first to two decimal places (7.45) and then to one decimal place (7.5). Which statement is true?",
    "choices": [
     "Amir's method is wrong. The correct answer is 7.4, since the rounding should be done directly from the original number",
     "Amir's method is correct. 7.5 is correctly rounded",
     "Both answers are acceptable approximations to one decimal place",
     "The correct answer is 7.44"
    ],
    "correct": 0,
    "solution": "**The key insight:** rounding should always be done in ONE step, directly from the original number. Otherwise the error can grow.\n\nIf we round 7.4498 directly to one decimal place, we look at the digit after the tenths digit 4, that is, the 4 in the hundredths position. It belongs to the group 0–4, so the tenths digit is kept:\n\n$$ 7.4498 \\approx 7.4 $$\n\nAmir's two-step method gives 7.45 → 7.5, but 7.4498 is closer to 7.4 than to 7.5 (the distances are 0.0498 and 0.0502 respectively). Rounding in steps has therefore moved the value in the wrong direction.\n\n**Answer:** Amir's method is wrong. The correct answer is 7.4.\n\n**General conclusion:** the same trap appears in the lesson's example (61.4738 → ones becomes 61, not 62). Every rounding throws away information, so always round from the original number."
   }
  ]
 },
 "ma1c-1.6": {
  "kalla": "dbe0bb6c48",
  "data": [
   {
    "level": 1,
    "question": "Calculate $2^5$.",
    "answer": {
     "value": 32,
     "unit": ""
    },
    "solution": "The exponent 5 tells you how many times the base 2 is to be multiplied by itself:\n\n$$ 2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32 $$\n\n**Answer:** 32"
   },
   {
    "level": 1,
    "question": "Write $5 \\cdot 5 \\cdot 5 \\cdot 5$ in power form.",
    "choices": [
     "$5^5$",
     "$5^4$",
     "$4^5$",
     "$5 \\cdot 4$"
    ],
    "correct": 1,
    "solution": "Four fives are multiplied. The base is 5 (what is raised to the power) and the exponent is 4 (the number of factors):\n\n$$ 5 \\cdot 5 \\cdot 5 \\cdot 5 = 5^4 $$\n\n$4^5$ instead means five fours, which is something completely different ($4^5 = 1\\ 024$ but $5^4 = 625$).\n\n**Answer:** $5^4$"
   },
   {
    "level": 1,
    "question": "Simplify $x^3 \\cdot x^4$.",
    "choices": [
     "$x^{12}$",
     "$x^7$",
     "$2x^7$",
     "$x^{81}$"
    ],
    "correct": 1,
    "solution": "When powers with the same base are multiplied, the exponents are added:\n\n$$ x^3 \\cdot x^4 = x^{3+4} = x^7 $$\n\nThe exponents should **not** be multiplied. That is only done for \"a power of a power\", $(x^3)^4 = x^{12}$.\n\n**Answer:** $x^7$"
   },
   {
    "level": 2,
    "question": "Calculate $-6^2 + (-2)^3$.",
    "answer": {
     "value": -44,
     "unit": ""
    },
    "solution": "Be careful about what the base is in each term!\n\nIn $-6^2$ the base is only 6. The minus sign is outside the power:\n\n$$ -6^2 = -6 \\cdot 6 = -36 $$\n\nIn $(-2)^3$ the whole number −2 is the base:\n\n$$ (-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8 $$\n\nThe sum is\n\n$$ -36 + (-8) = -36 - 8 = -44 $$\n\n**Answer:** −44"
   },
   {
    "level": 2,
    "question": "Solve the equation $5^n \\cdot 5^3 = 5^9$.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "Rewrite the left-hand side as a single power of 5 using the law of exponents $a^x \\cdot a^y = a^{x+y}$:\n\n$$ 5^{n+3} = 5^9 $$\n\nWhen both sides are a single power with the same base, the exponents must be equal:\n\n$$ n + 3 = 9 $$\n\n$$ n = 6 $$\n\n**Answer:** $n = 6$"
   },
   {
    "level": 3,
    "question": "Simplify $\\dfrac{4^{3x}}{2^x + 2^x}$ as far as possible. Give your answer as ONE power with base 2.",
    "choices": [
     "$2^{6x}$",
     "$2^{2x}$",
     "$2^{5x-1}$",
     "$2^{6x-1}$"
    ],
    "correct": 2,
    "solution": "**The key insight:** rewrite both the numerator and the denominator as ONE power with the same base, just as in the lesson's last example.\n\nThe denominator is a sum of two equal terms, that is, a multiplication:\n\n$$ 2^x + 2^x = 2 \\cdot 2^x = 2^1 \\cdot 2^x = 2^{1+x} $$\n\nThe numerator is rewritten with base 2, since $4 = 2^2$:\n\n$$ 4^{3x} = (2^2)^{3x} = 2^{6x} $$\n\nNow the law of exponents for division can be used:\n\n$$ \\frac{2^{6x}}{2^{1+x}} = 2^{6x - (1+x)} = 2^{6x - 1 - x} = 2^{5x-1} $$\n\n**Answer:** $2^{5x-1}$\n\n**General conclusion:** sums of equal powers ($2^x + 2^x$) are rewritten as a product, and different bases (4 and 2) are rewritten to the same base. After that, the laws of exponents do the rest."
   }
  ]
 },
 "ma1c-1.7": {
  "kalla": "027d7fa6cd",
  "data": [
   {
    "level": 1,
    "question": "Calculate $12^0$.",
    "answer": {
     "value": 1,
     "unit": ""
    },
    "solution": "Every number except 0 raised to the power 0 equals 1:\n\n$$ 12^0 = 1 $$\n\nWarning: $12^0 \\neq 0$. That is a common mistake.\n\n**Answer:** 1"
   },
   {
    "level": 1,
    "question": "Write $3^{-2}$ as a fraction and calculate its value.",
    "choices": [
     "$-\\dfrac{1}{9}$",
     "$\\dfrac{1}{9}$",
     "$-9$",
     "$\\dfrac{1}{6}$"
    ],
    "correct": 1,
    "solution": "A negative exponent means \"1 divided by the power without the minus sign\":\n\n$$ 3^{-2} = \\frac{1}{3^2} = \\frac{1}{9} $$\n\nNote that the answer is **positive**. The minus sign in the exponent does not make the number negative.\n\n**Answer:** $\\dfrac{1}{9}$"
   },
   {
    "level": 1,
    "question": "Write $\\dfrac{1}{7^4}$ in power form.",
    "choices": [
     "$4^{-7}$",
     "$-7^4$",
     "$7^4$",
     "$7^{-4}$"
    ],
    "correct": 3,
    "solution": "Since $7^{-4} = \\dfrac{1}{7^4}$, the reverse also holds:\n\n$$ \\frac{1}{7^4} = 7^{-4} $$\n\n**Answer:** $7^{-4}$"
   },
   {
    "level": 2,
    "question": "Calculate $\\left(\\dfrac{2}{5}\\right)^{-2}$.",
    "choices": [
     "$\\dfrac{4}{25}$",
     "$-\\dfrac{4}{25}$",
     "$\\dfrac{25}{4}$",
     "$\\dfrac{5}{4}$"
    ],
    "correct": 2,
    "solution": "Invert the fraction and change the sign of the exponent. After that it is an ordinary power:\n\n$$ \\left(\\frac{2}{5}\\right)^{-2} = \\left(\\frac{5}{2}\\right)^{2} = \\frac{5^2}{2^2} = \\frac{25}{4} $$\n\n$\\dfrac{4}{25}$ is the value of $\\left(\\frac{2}{5}\\right)^{2}$, without inverting.\n\n**Answer:** $\\dfrac{25}{4}$"
   },
   {
    "level": 2,
    "question": "Calculate $2^0 + 2^{-1} + 2^{-2}$. Give your answer in decimal form.",
    "answer": {
     "value": 1.75,
     "unit": "",
     "tol": 0.001
    },
    "solution": "Calculate each term separately:\n\n$$ 2^0 = 1 \\qquad 2^{-1} = \\frac{1}{2} = 0.5 \\qquad 2^{-2} = \\frac{1}{4} = 0.25 $$\n\nThe sum is\n\n$$ 1 + 0.5 + 0.25 = 1.75 $$\n\n**Answer:** 1.75"
   },
   {
    "level": 3,
    "question": "Ella claims: \"$4^{-3}$ is a negative number, because the exponent is negative.\" Which statement is correct?",
    "choices": [
     "Ella is wrong: $4^{-3} = 0$, because the exponent is less than zero",
     "Ella is right: $4^{-3} = -\\dfrac{1}{64}$",
     "Ella is right: $4^{-3} = -64$",
     "Ella is wrong: $4^{-3} = \\dfrac{1}{64}$, and a power with a positive base is always positive"
    ],
    "correct": 3,
    "solution": "**The key insight:** the minus sign in the exponent is about *division*, not about sign.\n\nThe definition of a negative exponent gives\n\n$$ 4^{-3} = \\frac{1}{4^3} = \\frac{1}{64} $$\n\nwhich is a **positive** number (small, but positive). A power with a positive base is always positive, regardless of the sign of the exponent. Decreasing the exponent by 1 only means dividing by the base one more time:\n\n$$ 4^2 = 16 \\quad\\to\\quad 4^1 = 4 \\quad\\to\\quad 4^0 = 1 \\quad\\to\\quad 4^{-1} = \\frac{1}{4} \\quad\\to\\quad 4^{-2} = \\frac{1}{16} \\quad\\to\\quad 4^{-3} = \\frac{1}{64} $$\n\n**Answer:** Ella is wrong: $4^{-3} = \\dfrac{1}{64} > 0$.\n\n**General conclusion:** the staircase above shows the pattern: every step down in the exponent is a division by the base. Negative exponents give small positive numbers, never negative ones (as long as the base is positive)."
   }
  ]
 },
 "ma1c-1.8": {
  "kalla": "a192d83fe7",
  "data": [
   {
    "level": 1,
    "question": "Calculate $81^{1/2}$ without a calculator.",
    "answer": {
     "value": 9,
     "unit": ""
    },
    "solution": "The exponent $\\dfrac{1}{2}$ means the square root:\n\n$$ 81^{1/2} = \\sqrt{81} = 9 $$\n\n**Answer:** 9"
   },
   {
    "level": 1,
    "question": "Calculate $125^{1/3}$ without a calculator.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "The exponent $\\dfrac{1}{3}$ means the third root (cube root). We are looking for the number that multiplied by itself three times gives 125:\n\n$$ 5 \\cdot 5 \\cdot 5 = 125 \\quad \\Rightarrow \\quad 125^{1/3} = \\sqrt[3]{125} = 5 $$\n\n**Answer:** 5"
   },
   {
    "level": 1,
    "question": "Write $\\sqrt[4]{13}$ in power form.",
    "choices": [
     "$4^{1/13}$",
     "$13^{-4}$",
     "$13^4$",
     "$13^{1/4}$"
    ],
    "correct": 3,
    "solution": "The rule $a^{1/n} = \\sqrt[n]{a}$ works both ways, so the fourth root of 13 is 13 raised to the power $\\dfrac{1}{4}$:\n\n$$ \\sqrt[4]{13} = 13^{1/4} $$\n\n**Answer:** $13^{1/4}$"
   },
   {
    "level": 2,
    "question": "Calculate $16^{3/4}$ without a calculator.",
    "answer": {
     "value": 8,
     "unit": ""
    },
    "solution": "Split the exponent using the law of exponents \"a power of a power\":\n\n$$ 16^{3/4} = \\left(16^{1/4}\\right)^3 $$\n\nThe fourth root of 16 is 2 (since $2 \\cdot 2 \\cdot 2 \\cdot 2 = 16$):\n\n$$ \\left(16^{1/4}\\right)^3 = 2^3 = 8 $$\n\n**Answer:** 8"
   },
   {
    "level": 2,
    "question": "Simplify $\\dfrac{x^{5/2}}{x^2}$.",
    "choices": [
     "$\\sqrt{x}$",
     "$x^{5/4}$",
     "$x^{2}$",
     "$\\dfrac{1}{\\sqrt{x}}$"
    ],
    "correct": 0,
    "solution": "The law of exponents for division gives subtraction of the exponents. Work with them as with ordinary fractions:\n\n$$ \\frac{x^{5/2}}{x^2} = x^{5/2 - 2} = x^{5/2 - 4/2} = x^{1/2} = \\sqrt{x} $$\n\n**Answer:** $\\sqrt{x}$"
   },
   {
    "level": 3,
    "question": "Which of the numbers is the largest: $2^{30}$, $4^{16}$ or $8^{11}$?",
    "choices": [
     "$2^{30}$",
     "$4^{16}$",
     "$8^{11}$",
     "They are equal"
    ],
    "correct": 2,
    "solution": "**The key insight:** powers with different bases cannot be compared directly, so rewrite all of them with the same base. Here base 2 works, since $4 = 2^2$ and $8 = 2^3$:\n\n$$ 4^{16} = \\left(2^2\\right)^{16} = 2^{2 \\cdot 16} = 2^{32} $$\n\n$$ 8^{11} = \\left(2^3\\right)^{11} = 2^{3 \\cdot 11} = 2^{33} $$\n\nNow all three numbers have base 2, and then the exponent decides:\n\n$$ 2^{30} < 2^{32} < 2^{33} $$\n\nThe largest is therefore $2^{33} = 8^{11}$.\n\n**Answer:** $8^{11}$\n\n**General conclusion:** the same-base trick from exponential equations also works for comparisons, and \"a power of a power\" means that the exponents are multiplied."
   }
  ]
 },
 "ma1c-1.9": {
  "kalla": "a2bb951ec9",
  "data": [
   {
    "level": 1,
    "question": "Write 63 000 in standard form.",
    "choices": [
     "$6.3 \\cdot 10^4$",
     "$63 \\cdot 10^3$",
     "$6.3 \\cdot 10^3$",
     "$0.63 \\cdot 10^5$"
    ],
    "correct": 0,
    "solution": "The number in front of the power of ten must be between 1 and 10, here 6.3. The number of digits after the first one gives the exponent, here 4:\n\n$$ 63\\ 000 = 6.3 \\cdot 10^4 $$\n\n$63 \\cdot 10^3$ and $0.63 \\cdot 10^5$ have the right value but are not in standard form, since 63 and 0.63 do not lie between 1 and 10.\n\n**Answer:** $6.3 \\cdot 10^4$"
   },
   {
    "level": 1,
    "question": "Write 0.00052 in standard form.",
    "choices": [
     "$5.2 \\cdot 10^{-3}$",
     "$5.2 \\cdot 10^{-4}$",
     "$52 \\cdot 10^{-5}$",
     "$5.2 \\cdot 10^{4}$"
    ],
    "correct": 1,
    "solution": "The standard form starts with 5.2. The number of zeros before the first non-zero digit gives the negative exponent, here 4 zeros (0.000…):\n\n$$ 0.00052 = 5.2 \\cdot 10^{-4} $$\n\n**Answer:** $5.2 \\cdot 10^{-4}$"
   },
   {
    "level": 1,
    "question": "Write 6.5 km without a prefix. Give your answer in metres.",
    "answer": {
     "value": 6500,
     "unit": "m"
    },
    "solution": "The prefix k (kilo) means $10^3$:\n\n$$ 6.5\\ \\mathrm{km} = 6.5 \\cdot 10^3\\ \\mathrm{m} = 6\\ 500\\ \\mathrm{m} $$\n\n**Answer:** 6 500 m"
   },
   {
    "level": 2,
    "question": "Write 0.0000039 s with a suitable prefix.",
    "choices": [
     "3.9 ns",
     "3.9 µs",
     "39 µs",
     "3.9 ms"
    ],
    "correct": 1,
    "solution": "First write the number in standard form:\n\n$$ 0.0000039\\ \\mathrm{s} = 3.9 \\cdot 10^{-6}\\ \\mathrm{s} $$\n\nThe power of ten $10^{-6}$ has the prefix µ (micro):\n\n$$ 3.9 \\cdot 10^{-6}\\ \\mathrm{s} = 3.9\\ \\mathrm{µs} $$\n\n**Answer:** 3.9 µs"
   },
   {
    "level": 2,
    "question": "Write 45 000 000 W with a suitable prefix.",
    "choices": [
     "45 kW",
     "4.5 MW",
     "45 MW",
     "45 GW"
    ],
    "correct": 2,
    "solution": "Standard form: $45\\ 000\\ 000\\ \\mathrm{W} = 4.5 \\cdot 10^7\\ \\mathrm{W}$.\n\nThere is no prefix for $10^7$, so we rewrite using a power of ten that has a prefix, for example $10^6$ (mega). When the power of ten is divided by 10, the number in front must become 10 times larger:\n\n$$ 4.5 \\cdot 10^7\\ \\mathrm{W} = 45 \\cdot 10^6\\ \\mathrm{W} = 45\\ \\mathrm{MW} $$\n\n**Answer:** 45 MW"
   },
   {
    "level": 3,
    "question": "A storage server holds 1.8 TB. A music file is on average 9.0 MB. How many music files fit on the server?",
    "answer": {
     "value": 200000,
     "unit": ""
    },
    "solution": "**The key insight:** the numerator and the denominator must have the same unit before dividing, so rewrite the prefixes as powers of ten.\n\n$$ 1.8\\ \\mathrm{TB} = 1.8 \\cdot 10^{12}\\ \\mathrm{B} \\qquad 9.0\\ \\mathrm{MB} = 9.0 \\cdot 10^{6}\\ \\mathrm{B} $$\n\n$$ \\text{number of files} = \\frac{1.8 \\cdot 10^{12}\\ \\mathrm{B}}{9.0 \\cdot 10^{6}\\ \\mathrm{B}} = 0.2 \\cdot 10^{6} = 2 \\cdot 10^{5} = 200\\ 000\\ \\text{files} $$\n\n**Answer:** 200 000 files\n\n**General conclusion:** divide the numbers separately and the powers of ten separately ($10^{12}/10^{6} = 10^{6}$), and check that the units really cancel before you trust the answer."
   }
  ]
 },
 "ma1c-1.10": {
  "kalla": "a0929913d8",
  "data": [
   {
    "level": 1,
    "question": "Calculate $7 + 3 \\cdot 4$.",
    "answer": {
     "value": 19,
     "unit": ""
    },
    "solution": "Multiplication takes priority over addition:\n\n$$ 7 + 3 \\cdot 4 = 7 + 12 = 19 $$\n\nIf you calculate from left to right without priority, you get the incorrect $10 \\cdot 4 = 40$.\n\n**Answer:** 19"
   },
   {
    "level": 1,
    "question": "Calculate $6 \\cdot (8 - 5)$.",
    "answer": {
     "value": 18,
     "unit": ""
    },
    "solution": "The brackets are calculated first:\n\n$$ 6 \\cdot (8 - 5) = 6 \\cdot 3 = 18 $$\n\n**Answer:** 18"
   },
   {
    "level": 1,
    "question": "What is the result of a multiplication called?",
    "choices": [
     "Sum",
     "Product",
     "Quotient",
     "Difference"
    ],
    "correct": 1,
    "solution": "The parts of a multiplication are called **factors** and the result is called the **product**: $3 \\cdot 4 = 12$ is a product.\n\nSum belongs to addition, difference to subtraction and quotient to division.\n\n**Answer:** Product"
   },
   {
    "level": 2,
    "question": "Calculate $4 \\cdot 6 - (9 - 2 \\cdot 3)^2$.",
    "answer": {
     "value": 15,
     "unit": ""
    },
    "solution": "Work from the inside out according to the order of operations. First the multiplication **inside** the brackets, then the brackets, then the power:\n\n$$ 4 \\cdot 6 - (9 - 2 \\cdot 3)^2 = 4 \\cdot 6 - (9 - 6)^2 = 4 \\cdot 6 - 3^2 $$\n\nThen the power, the multiplication and finally the difference:\n\n$$ 4 \\cdot 6 - 9 = 24 - 9 = 15 $$\n\n**Answer:** 15"
   },
   {
    "level": 2,
    "question": "Calculate $\\dfrac{24}{10 - 2 \\cdot 3}$.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "In divisions there are \"invisible\" brackets around the numerator and the denominator. The whole denominator is calculated first, with the order of operations inside it:\n\n$$ \\frac{24}{10 - 2 \\cdot 3} = \\frac{24}{10 - 6} = \\frac{24}{4} = 6 $$\n\n**Answer:** 6"
   },
   {
    "level": 3,
    "question": "Insert ONE pair of brackets in the expression $12 - 4 \\cdot 2 + 6$ so that the value of the expression becomes 22. Which placement is correct?",
    "choices": [
     "$(12 - 4 \\cdot 2) + 6$",
     "$(12 - 4) \\cdot 2 + 6$",
     "$12 - 4 \\cdot (2 + 6)$",
     "$12 - (4 \\cdot 2) + 6$"
    ],
    "correct": 1,
    "solution": "**The key insight:** brackets change the order of calculation, so test systematically what each placement gives.\n\nWithout brackets: $12 - 4 \\cdot 2 + 6 = 12 - 8 + 6 = 10$.\n\n$$ (12 - 4) \\cdot 2 + 6 = 8 \\cdot 2 + 6 = 16 + 6 = 22 \\quad \\text{(correct!)} $$\n\n$$ 12 - 4 \\cdot (2 + 6) = 12 - 4 \\cdot 8 = 12 - 32 = -20 $$\n\n$$ 12 - (4 \\cdot 2) + 6 = 12 - 8 + 6 = 10 \\quad \\text{(the brackets change nothing: multiplication takes priority anyway)} $$\n\n$$ (12 - 4 \\cdot 2) + 6 = 4 + 6 = 10 \\quad \\text{(the same thing: the order was already this)} $$\n\n**Answer:** $(12 - 4) \\cdot 2 + 6$\n\n**General conclusion:** brackets only make a difference if they force an order that the order of operations does not already give."
   }
  ]
 },
 "ma1c-1.11": {
  "kalla": "07e677aeff",
  "data": [
   {
    "level": 1,
    "question": "Use your calculator to calculate $\\sqrt[3]{85}$. Round to two decimal places.",
    "answer": {
     "value": 4.4,
     "unit": "",
     "tol": 0.01
    },
    "solution": "Enter the third root on the calculator (often with a root key or by typing $85^{1/3}$; do not forget the brackets around the exponent: `85^(1/3)`):\n\n$$ \\sqrt[3]{85} \\approx 4.40 $$\n\nCheck: $4.4^3 = 85.18 \\approx 85$.\n\n**Answer:** 4.40"
   },
   {
    "level": 1,
    "question": "The calculator shows `6.1E9`. Which number is that?",
    "choices": [
     "$0.000\\ 000\\ 006\\ 1$",
     "$61^9$",
     "$6\\ 100\\ 000\\ 000$",
     "$6.19$"
    ],
    "correct": 2,
    "solution": "E notation means \"times 10 to the power of\", so\n\n$$ 6.1\\mathrm{E}9 = 6.1 \\cdot 10^9 = 6\\ 100\\ 000\\ 000 $$\n\n**Answer:** 6 100 000 000"
   },
   {
    "level": 2,
    "question": "Nadia wants to calculate $\\dfrac{480}{4 \\cdot 6}$ and types `480/4*6` on the calculator, which answers 720. The correct answer is 20. What went wrong?",
    "choices": [
     "She should have used a decimal comma instead of a point",
     "The denominator must be written in brackets: `480/(4*6)`",
     "The calculator is broken. The expression is entered correctly",
     "The division sign should be entered before the numerator"
    ],
    "correct": 1,
    "solution": "The fraction bar has \"invisible\" brackets around the whole denominator, but the calculator only sees the symbols one after another. `480/4*6` is interpreted as\n\n$$ \\frac{480}{4} \\cdot 6 = 120 \\cdot 6 = 720 $$\n\nsince division and multiplication have the same priority and are carried out from left to right. With brackets around the denominator it comes out right:\n\n$$ 480/(4 \\cdot 6) = \\frac{480}{24} = 20 $$\n\n**Answer:** The denominator must be written in brackets: `480/(4*6)`."
   }
  ]
 },
 "ma1c-2.1": {
  "kalla": "d076037a52",
  "data": [
   {
    "level": 1,
    "question": "In the expression $75 + 40x$, what is the number 40 called?",
    "choices": [
     "Variable",
     "Constant term",
     "Coefficient",
     "Value"
    ],
    "correct": 2,
    "solution": "The number that is multiplied by the variable (\"the number in front of $x$\") is called the **coefficient**. In the expression, $x$ is the variable, $40x$ the variable term and 75 the constant term.\n\n**Answer:** Coefficient"
   },
   {
    "level": 1,
    "question": "Calculate the value of the expression $8x - 5$ when $x = 6$.",
    "answer": {
     "value": 43,
     "unit": ""
    },
    "solution": "Replace $x$ with 6 and calculate according to the order of operations:\n\n$$ 8 \\cdot 6 - 5 = 48 - 5 = 43 $$\n\n**Answer:** 43"
   },
   {
    "level": 1,
    "question": "A cinema ticket costs $p$ kr. Which expression describes the cost of 5 tickets and one popcorn for 65 kr?",
    "choices": [
     "$5p + 65$",
     "$5(p + 65)$",
     "$p + 5 \\cdot 65$",
     "$70p$"
    ],
    "correct": 0,
    "solution": "Five tickets cost $5p$ kr and the popcorn 65 kr. The total cost is the sum:\n\n$$ 5p + 65 $$\n\n$5(p + 65)$ would be five tickets AND five popcorns, since the five is multiplied into the whole bracket.\n\n**Answer:** $5p + 65$"
   },
   {
    "level": 2,
    "question": "Calculate the value of $14 - 5x$ when $x = -3$.",
    "answer": {
     "value": 29,
     "unit": ""
    },
    "solution": "Replace $x$ with −3 and use the sign rules: minus times minus gives plus:\n\n$$ 14 - 5 \\cdot (-3) = 14 + 15 = 29 $$\n\nA common mistake is to calculate $14 - 15 = -1$. Then the minus sign in $-3$ has been lost.\n\n**Answer:** 29"
   },
   {
    "level": 2,
    "question": "A gym charges a monthly fee of 250 kr and 20 kr per session. Selma is $x$ years old and trains $y$ sessions in a certain month. Which expression describes the month's cost?",
    "choices": [
     "$250 + 20x$",
     "$250 + 20y$",
     "$270y$",
     "$250y + 20$"
    ],
    "correct": 1,
    "solution": "The cost depends on the number of **sessions**, denoted $y$: a fixed fee of 250 kr plus 20 kr per session gives\n\n$$ 250 + 20y $$\n\nSelma's age $x$ is a distraction. It does not affect the cost. Choosing the right variable is half the job when writing expressions.\n\n**Answer:** $250 + 20y$"
   },
   {
    "level": 3,
    "question": "Elsa is $x$ years old. Her mother is 4 times as old as Elsa was 3 years ago, and her father is 2 years older than the mother. Which expression describes the father's age, simplified as far as possible?",
    "choices": [
     "$4x - 10$",
     "$4x - 1$",
     "$4(x - 3) + 2x$",
     "$4x + 2$"
    ],
    "correct": 0,
    "solution": "**The key insight:** build the expression in several steps and simplify only at the end.\n\nElsa's age 3 years ago: $(x - 3)$ years.\n\nThe mother's age: 4 times as much, that is, $4(x - 3)$ years.\n\nThe father's age: 2 years older than the mother, that is,\n\n$$ 4(x - 3) + 2 $$\n\nMultiply the factor 4 into the bracket and simplify:\n\n$$ 4(x - 3) + 2 = 4x - 12 + 2 = 4x - 10 $$\n\n**Answer:** $4x - 10$\n\n**General conclusion:** write the expression step by step in the order the story gives. The brackets keep track of what belongs together, and the simplification is done last."
   }
  ]
 },
 "ma1c-2.2": {
  "kalla": "24ef84b043",
  "data": [
   {
    "level": 1,
    "question": "Simplify $7x + 4y - 3x + 2y$.",
    "choices": [
     "$10xy$",
     "$10x + 6y$",
     "$4x + 6y$",
     "$4x + 2y$"
    ],
    "correct": 2,
    "solution": "Collect like terms: $x$ terms separately and $y$ terms separately, with the sign in front of each term:\n\n$$ 7x - 3x = 4x \\qquad 4y + 2y = 6y $$\n\n$$ 7x + 4y - 3x + 2y = 4x + 6y $$\n\n$x$ and $y$ terms can never be combined into $xy$ terms.\n\n**Answer:** $4x + 6y$"
   },
   {
    "level": 1,
    "question": "Simplify $9a + (2 - 4a)$.",
    "choices": [
     "$7a$",
     "$13a + 2$",
     "$5a - 2$",
     "$5a + 2$"
    ],
    "correct": 3,
    "solution": "A plus sign in front of the bracket: the bracket is removed without changing anything inside:\n\n$$ 9a + (2 - 4a) = 9a + 2 - 4a = 5a + 2 $$\n\n**Answer:** $5a + 2$"
   },
   {
    "level": 1,
    "question": "Simplify $6x^2 + 2x - 4x^2$.",
    "choices": [
     "$4x^2$",
     "$2x^2 + 2x$",
     "$10x^2 + 2x$",
     "$2x^4 + 2x$"
    ],
    "correct": 1,
    "solution": "$x^2$ terms are added separately and $x$ terms separately. They are not like terms:\n\n$$ 6x^2 - 4x^2 = 2x^2 $$\n\n$$ 6x^2 + 2x - 4x^2 = 2x^2 + 2x $$\n\n**Answer:** $2x^2 + 2x$"
   },
   {
    "level": 2,
    "question": "Simplify $15a - (4 + 6a - 9b)$.",
    "choices": [
     "$21a - 4 - 9b$",
     "$9a + 4 - 9b$",
     "$9a - 4 + 9b$",
     "$9a - 4 - 9b$"
    ],
    "correct": 2,
    "solution": "The minus sign in front of the bracket changes the sign of ALL terms inside when the bracket is removed:\n\n$$ 15a - (4 + 6a - 9b) = 15a - 4 - 6a + 9b $$\n\nCollect like terms:\n\n$$ 15a - 6a = 9a \\quad\\Rightarrow\\quad 9a - 4 + 9b $$\n\nThe most common mistake is to change the sign of only the first term in the bracket.\n\n**Answer:** $9a - 4 + 9b$"
   },
   {
    "level": 2,
    "question": "A rectangle has the height $2x$ and the base $5x - 4$. Which simplified expression describes the perimeter of the rectangle?",
    "choices": [
     "$14x - 4$",
     "$14x - 8$",
     "$10x^2 - 8x$",
     "$7x - 4$"
    ],
    "correct": 1,
    "solution": "The perimeter is the sum of all four sides: two heights and two bases:\n\n$$ 2 \\cdot 2x + 2 \\cdot (5x - 4) = 4x + 10x - 8 = 14x - 8 $$\n\n$7x - 4$ is only half the perimeter, and $10x^2 - 8x$ is the area ($2x \\cdot (5x - 4)$), not the perimeter.\n\n**Answer:** $14x - 8$"
   },
   {
    "level": 3,
    "question": "The expression $a - (b - (a - b))$ is to be simplified. Which is the simplified expression?",
    "choices": [
     "$2a - 2b$",
     "$0$",
     "$2b$",
     "$2a$"
    ],
    "correct": 0,
    "solution": "**The key insight:** with brackets inside brackets you work from the inside out, and every minus sign in front of a bracket changes the signs inside exactly that bracket.\n\nThe inner bracket first. The minus sign in front of $(a - b)$ changes the signs:\n\n$$ b - (a - b) = b - a + b = 2b - a $$\n\nWhat remains is\n\n$$ a - (2b - a) = a - 2b + a = 2a - 2b $$\n\n**Answer:** $2a - 2b$\n\n**General conclusion:** remove one bracket at a time, from the inside out. Feel free to check with numbers: $a = 5$, $b = 3$ gives $5 - (3 - (5 - 3)) = 5 - 1 = 4$ and $2 \\cdot 5 - 2 \\cdot 3 = 4$, which agrees."
   }
  ]
 },
 "ma1c-2.3": {
  "kalla": "8179484167",
  "data": [
   {
    "level": 1,
    "question": "Expand $5(2x + 3)$.",
    "choices": [
     "$10x + 3$",
     "$10x + 15$",
     "$7x + 8$",
     "$10x + 8$"
    ],
    "correct": 1,
    "solution": "The distributive law: the factor 5 is multiplied by **each** term in the bracket:\n\n$$ 5(2x + 3) = 5 \\cdot 2x + 5 \\cdot 3 = 10x + 15 $$\n\nThe most common mistake is to multiply only the first term ($10x + 3$).\n\n**Answer:** $10x + 15$"
   },
   {
    "level": 1,
    "question": "Expand $(x + 2)(x + 5)$.",
    "choices": [
     "$x^2 + 10$",
     "$x^2 + 7x + 10$",
     "$2x + 7$",
     "$x^2 + 10x + 7$"
    ],
    "correct": 1,
    "solution": "Each term in the first bracket is multiplied by each term in the second:\n\n$$ (x + 2)(x + 5) = x^2 + 5x + 2x + 10 = x^2 + 7x + 10 $$\n\n$x^2 + 10$ misses the two middle terms $5x$ and $2x$.\n\n**Answer:** $x^2 + 7x + 10$"
   },
   {
    "level": 1,
    "question": "Expand and simplify $4(3x - 2) + 5$.",
    "choices": [
     "$12x - 3$",
     "$12x + 3$",
     "$12x - 8 + 5x$",
     "$7x + 3$"
    ],
    "correct": 0,
    "solution": "Multiply the 4 into the bracket and then add 5:\n\n$$ 4(3x - 2) + 5 = 12x - 8 + 5 = 12x - 3 $$\n\n**Answer:** $12x - 3$"
   },
   {
    "level": 2,
    "question": "Expand and simplify $(2x - 3)(4x + 1)$.",
    "choices": [
     "$8x^2 - 14x - 3$",
     "$8x^2 - 10x - 3$",
     "$8x^2 + 10x - 3$",
     "$8x^2 - 3$"
    ],
    "correct": 1,
    "solution": "Multiply each term in the first bracket by each term in the second, and keep track of the signs:\n\n$$ (2x - 3)(4x + 1) = 8x^2 + 2x - 12x - 3 = 8x^2 - 10x - 3 $$\n\n**Answer:** $8x^2 - 10x - 3$"
   },
   {
    "level": 2,
    "question": "Expand and simplify $7 - (x + 4)(x - 2)$.",
    "choices": [
     "$15 - x^2 - 2x$",
     "$7 - x^2 + 2x + 8$",
     "$x^2 + 2x - 1$",
     "$15 + x^2 - 2x$"
    ],
    "correct": 0,
    "solution": "Expand the pair of brackets but KEEP one large bracket. The minus sign in front should then change the sign of all terms:\n\n$$ 7 - (x + 4)(x - 2) = 7 - (x^2 - 2x + 4x - 8) = 7 - (x^2 + 2x - 8) $$\n\nChange the sign of all terms inside and simplify:\n\n$$ 7 - x^2 - 2x + 8 = 15 - x^2 - 2x $$\n\n**Answer:** $15 - x^2 - 2x$"
   },
   {
    "level": 3,
    "question": "Expand and simplify $(2x - 1)(x + 3) - (x - 2)(2x + 5)$. What value does the simplified expression have for $x = 10$?",
    "answer": {
     "value": 47,
     "unit": ""
    },
    "solution": "**The key insight:** expand each product separately, and keep a bracket around the second product until all signs have been changed.\n\nExpand the first product:\n\n$$ (2x - 1)(x + 3) = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3 $$\n\nExpand the second product:\n\n$$ (x - 2)(2x + 5) = 2x^2 + 5x - 4x - 10 = 2x^2 + x - 10 $$\n\nPut them together, change the sign of the whole second product and simplify:\n\n$$ 2x^2 + 5x - 3 - (2x^2 + x - 10) = 2x^2 + 5x - 3 - 2x^2 - x + 10 = 4x + 7 $$\n\nCheck with $x = 10$ in the original expression: $(20 - 1)(10 + 3) - (10 - 2)(20 + 5) = 19 \\cdot 13 - 8 \\cdot 25 = 247 - 200 = 47$.\n\nThe simplified expression gives $4 \\cdot 10 + 7 = 47$. It agrees.\n\n**Answer:** $4x + 7$, which has the value 47 for $x = 10$\n\n**General conclusion:** when two expanded products are subtracted, the $x^2$ terms can cancel, so that an expression that looks quadratic is in fact linear. Always check by substituting a simple value into both the original and the simplified expression."
   }
  ]
 },
 "ma1c-2.4": {
  "kalla": "d67ba89794",
  "data": [
   {
    "level": 1,
    "question": "Factorise $6x + 9$ as far as possible.",
    "choices": [
     "$6(x + 9)$",
     "$3(2x + 3)$",
     "$x(6 + 9)$",
     "$3(2x + 9)$"
    ],
    "correct": 1,
    "solution": "The greatest common divisor of 6 and 9 is 3. Take out 3 and think \"the distributive law backwards\":\n\n$$ 6x + 9 = 3(2x + 3) $$\n\nCheck: $3 \\cdot 2x + 3 \\cdot 3 = 6x + 9$, which agrees.\n\n**Answer:** $3(2x + 3)$"
   },
   {
    "level": 1,
    "question": "Factorise $x^2 + 7x$ as far as possible.",
    "choices": [
     "$x^2(1 + 7x)$",
     "$7(x^2 + x)$",
     "$x(x + 7)$",
     "$x(x + 7x)$"
    ],
    "correct": 2,
    "solution": "Both terms contain $x$. Take out the lowest power of $x$, that is, $x$:\n\n$$ x^2 + 7x = x(x + 7) $$\n\n**Answer:** $x(x + 7)$"
   },
   {
    "level": 1,
    "question": "Which expression is $12x - 8$ correctly factorised as far as possible?",
    "choices": [
     "$2(6x - 4)$",
     "$4(3x - 2)$",
     "$4(3x - 8)$",
     "$8(4x - 1)$"
    ],
    "correct": 1,
    "solution": "The greatest common divisor of 12 and 8 is 4:\n\n$$ 12x - 8 = 4(3x - 2) $$\n\n$2(6x - 4)$ is a correct factorisation but not \"as far as possible\": the bracket can be factorised further by 2.\n\n**Answer:** $4(3x - 2)$"
   },
   {
    "level": 2,
    "question": "Factorise $4(x - 1) + x(x - 1)$ as far as possible.",
    "choices": [
     "$4x(x - 1)$",
     "$(x - 1)(4 - x)$",
     "$(x - 1)(4 + x)$",
     "$(x - 1)^2(4 + x)$"
    ],
    "correct": 2,
    "solution": "The bracket $(x - 1)$ appears in both terms, so the whole bracket is a common factor. Take it out and fill the new bracket with what remains of each term: 4 from the first and $x$ from the second:\n\n$$ 4(x - 1) + x(x - 1) = (x - 1)(4 + x) $$\n\nCheck: $(x - 1) \\cdot 4 + (x - 1) \\cdot x = 4(x - 1) + x(x - 1)$, that is, the original expression.\n\n$4x(x - 1)$ is wrong: the terms are added, not multiplied. $(x - 1)(4 - x)$ has the wrong sign in front of $x$.\n\n**Answer:** $(x - 1)(4 + x)$"
   },
   {
    "level": 2,
    "question": "Factorise $10a^2b + 15ab^2$ as far as possible.",
    "choices": [
     "$5a^2b^2(2 + 3)$",
     "$5(2a^2b + 3ab^2)$",
     "$ab(10a + 15b)$",
     "$5ab(2a + 3b)$"
    ],
    "correct": 3,
    "solution": "Look at each part separately: 10 and 15 have the common factor 5, and both terms contain $a$ (lowest power $a$) and $b$ (lowest power $b$). Take out $5ab$:\n\n$$ 10a^2b + 15ab^2 = 5ab(2a + 3b) $$\n\n**Answer:** $5ab(2a + 3b)$"
   },
   {
    "level": 3,
    "question": "The sum of five consecutive integers is always divisible by a certain number. Write the numbers using a variable, simplify the sum and factorise it. What is the largest number that the sum is always divisible by?",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "**The key insight:** showing something for all numbers of a certain kind cannot be done by trying a few examples. The numbers must be written with a variable, and the answer is read off from the factorisation.\n\nCall the smallest number $n$. The five numbers are then $n$, $n + 1$, $n + 2$, $n + 3$ and $n + 4$. Write the sum and combine like terms:\n\n$$ n + (n + 1) + (n + 2) + (n + 3) + (n + 4) = 5n + 10 $$\n\nTake out the common factor 5:\n\n$$ 5n + 10 = 5(n + 2) $$\n\n$n + 2$ is an integer, so the sum is 5 times an integer and therefore always divisible by 5.\n\nIt is not, however, always divisible by 10: for $n = 1$ the sum is $1 + 2 + 3 + 4 + 5 = 15$. This can also be seen in the factorisation, since $n + 2$ can be odd.\n\n**Answer:** 5\n\n**General conclusion:** the sum of five consecutive integers is $5(n + 2)$, that is, 5 times the middle number. If you write the numbers symmetrically, $n - 2$ to $n + 2$, the sum becomes $5n$ directly."
   }
  ]
 },
 "ma1c-2.5": {
  "kalla": "e3a9a0c559",
  "data": [
   {
    "level": 1,
    "question": "Solve the equation $x + 19 = 45$.",
    "answer": {
     "value": 26,
     "unit": ""
    },
    "solution": "The term 19 is added to $x$, so subtract 19 from both sides:\n\n$$ x + 19 - 19 = 45 - 19 $$\n\n$$ x = 26 $$\n\n**Answer:** $x = 26$"
   },
   {
    "level": 1,
    "question": "Solve the equation $6x = 42$.",
    "answer": {
     "value": 7,
     "unit": ""
    },
    "solution": "The factor 6 is multiplied by $x$, so divide both sides by 6:\n\n$$ \\frac{6x}{6} = \\frac{42}{6} $$\n\n$$ x = 7 $$\n\n**Answer:** $x = 7$"
   },
   {
    "level": 1,
    "question": "Solve the equation $\\dfrac{x}{8} = 5$.",
    "answer": {
     "value": 40,
     "unit": ""
    },
    "solution": "The denominator 8 divides, so multiply both sides by 8:\n\n$$ \\frac{x}{8} \\cdot 8 = 5 \\cdot 8 $$\n\n$$ x = 40 $$\n\n**Answer:** $x = 40$"
   },
   {
    "level": 2,
    "question": "Solve the equation $5x - 13 = 22$.",
    "answer": {
     "value": 7,
     "unit": ""
    },
    "solution": "Two steps: first add 13 to both sides, then divide by 5.\n\n$$ 5x - 13 + 13 = 22 + 13 $$\n\n$$ 5x = 35 $$\n\n$$ \\frac{5x}{5} = \\frac{35}{5} $$\n\n$$ x = 7 $$\n\n**Check:** $\\mathrm{LHS} = 5 \\cdot 7 - 13 = 35 - 13 = 22 = \\mathrm{RHS}$, which agrees.\n\n**Answer:** $x = 7$"
   },
   {
    "level": 2,
    "question": "Solve the equation $\\dfrac{3x}{4} + 9 = 15$.",
    "answer": {
     "value": 8,
     "unit": ""
    },
    "solution": "First subtract 9 from both sides:\n\n$$ \\frac{3x}{4} = 6 $$\n\nMultiply both sides by 4:\n\n$$ 3x = 24 $$\n\nDivide both sides by 3:\n\n$$ x = 8 $$\n\n**Answer:** $x = 8$"
   },
   {
    "level": 3,
    "question": "The equation $\\dfrac{2x}{5} - 7 = -4$ has the solution $x = \\dfrac{15}{2}$. Simon solved it like this:<br>Step 1: $\\dfrac{2x}{5} = 3$&emsp;&emsp;Step 2: $2x = \\dfrac{3}{5}$&emsp;&emsp;Step 3: $x = \\dfrac{3}{10}$<br>In which step did Simon make a mistake, and why?",
    "choices": [
     "Step 3: the division by 2 is miscalculated",
     "Step 1: he should have subtracted 4 instead of adding 7",
     "No step is wrong: the answer key is wrong",
     "Step 2: the denominator 5 should be removed by multiplying both sides by 5, not by moving it to the right-hand side"
    ],
    "correct": 3,
    "solution": "**The key insight:** every step in solving an equation must be the same operation on BOTH sides. \"Moving across\" is only a shortcut for that, and it can go wrong.\n\n**Step 1** is correct: adding 7 to both sides gives $\\dfrac{2x}{5} = -4 + 7 = 3$.\n\n**Step 2** is the mistake. To remove the denominator 5, both sides should be multiplied by 5:\n\n$$ \\frac{2x}{5} \\cdot 5 = 3 \\cdot 5 \\qquad\\Rightarrow\\qquad 2x = 15 $$\n\nSimon instead \"moved\" the 5 down into the denominator of the right-hand side. That corresponds to dividing the right-hand side by 5 while the left-hand side is multiplied by 5, that is, different operations on the two sides.\n\n**Step 3** was then carried out correctly on the wrong equation. The correct continuation:\n\n$$ x = \\frac{15}{2} $$\n\n**Answer:** Step 2: both sides should be multiplied by 5, which gives $2x = 15$ and $x = \\dfrac{15}{2}$.\n\n**General conclusion:** when something is \"moved across\" the equals sign, it changes operation (plus↔minus, times↔divided by). Do not mix up the direction. When in doubt, write out the operation on both sides."
   }
  ]
 },
 "ma1c-2.6": {
  "kalla": "befe0679c9",
  "data": [
   {
    "level": 1,
    "question": "Solve the equation $7x = 3x + 20$.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "Collect the variable terms on one side: subtract $3x$ (the smallest coefficient) from both sides:\n\n$$ 7x - 3x = 3x + 20 - 3x $$\n\n$$ 4x = 20 $$\n\nDivide both sides by 4:\n\n$$ x = 5 $$\n\n**Answer:** $x = 5$"
   },
   {
    "level": 1,
    "question": "Solve the equation $9x - 6 = 5x + 18$.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "Subtract $5x$ from both sides:\n\n$$ 4x - 6 = 18 $$\n\nAdd 6 to both sides:\n\n$$ 4x = 24 $$\n\nDivide by 4:\n\n$$ x = 6 $$\n\n**Answer:** $x = 6$"
   },
   {
    "level": 1,
    "question": "What does it mean when an equation leads to the contradiction $5 = 8$?",
    "choices": [
     "The equation has no solution",
     "The solution is $x = 3$",
     "All numbers are solutions",
     "You have to start again with a different method"
    ],
    "correct": 0,
    "solution": "If all the variable terms disappear and what remains is a false equality (such as $5 = 8$), there is no value of $x$ that can make the equation true. The equation **has no solution**.\n\n**Answer:** The equation has no solution."
   },
   {
    "level": 2,
    "question": "Solve the equation $40 - 3(2x - 4) = 10x$.",
    "answer": {
     "value": 3.25,
     "unit": "",
     "tol": 0.01
    },
    "solution": "Simplify the left-hand side first: multiply −3 into the bracket (watch the signs):\n\n$$ 40 - 6x + 12 = 10x $$\n\n$$ 52 - 6x = 10x $$\n\nAdd $6x$ to both sides:\n\n$$ 52 = 16x $$\n\nDivide by 16:\n\n$$ x = \\frac{52}{16} = \\frac{13}{4} = 3.25 $$\n\n**Answer:** $x = \\dfrac{13}{4} = 3.25$"
   },
   {
    "level": 2,
    "question": "Which of the following equations has no solution?",
    "choices": [
     "$4(2x + 3) = 8x + 12$",
     "$5x + 7 = 5x - 2$",
     "$6x - 9 = 3x$",
     "$2(x - 1) = x + 1$"
    ],
    "correct": 1,
    "solution": "Subtract $5x$ from both sides in $5x + 7 = 5x - 2$:\n\n$$ 7 = -2 $$\n\nA false equality: the equation has no solution.\n\nThe others: $4(2x+3) = 8x + 12$ is true for ALL $x$ (both sides are identical), $6x - 9 = 3x$ gives $x = 3$, and $2(x-1) = x+1$ gives $x = 3$.\n\n**Answer:** $5x + 7 = 5x - 2$"
   },
   {
    "level": 2,
    "question": "Solve the equation $7x + 2 = 4x + 3x + 2$.",
    "choices": [
     "$x = 0$",
     "The equation has no solution",
     "$x = 2$",
     "The equation has infinitely many solutions"
    ],
    "correct": 3,
    "solution": "First simplify the right-hand side, where $4x + 3x = 7x$:\n\n$$ 7x + 2 = 7x + 2 $$\n\nBoth sides are now exactly the same expression. Subtract $7x$ from both sides:\n\n$$ 7x + 2 - 7x = 7x + 2 - 7x $$\n\n$$ 2 = 2 $$\n\nThe variable disappeared, and what remains is a true equality. The equation holds whatever value $x$ has.\n\n**Answer:** The equation has infinitely many solutions. Every number $x$ is a solution."
   },
   {
    "level": 3,
    "question": "For which value of the number $a$ does the equation $ax + 5 = 6x - 7$ have no solution?",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "**The key insight:** an equation has no solution exactly when the variable terms cancel but the constant terms do not.\n\nCollect the variable terms:\n\n$$ ax - 6x = -7 - 5 $$\n\n$$ (a - 6)x = -12 $$\n\nIf $a \\neq 6$ we can divide by $(a - 6)$ and get a solution $x = \\dfrac{-12}{a-6}$.\n\nBut if $a = 6$ the left-hand side becomes $0 \\cdot x = 0$, and the equation says\n\n$$ 0 = -12 $$\n\nwhich is false, so there is no solution.\n\n**Answer:** $a = 6$\n\n**General conclusion:** the equation $kx = m$ has no solution when $k = 0$ but $m \\neq 0$. That is exactly what happens when both sides have the same variable term but different constant terms."
   },
   {
    "level": 3,
    "question": "Solve the equation $(2x + 1)(3x - 4) = 6x(x - 2)$. Give your answer in decimal form with two decimal places.",
    "answer": {
     "value": 0.57,
     "unit": "",
     "tol": 0.02
    },
    "solution": "**The key insight:** expand both sides. The $x^2$ terms cancel and what remains is an ordinary linear equation.\n\nExpand the left-hand side:\n\n$$ (2x + 1)(3x - 4) = 6x^2 - 8x + 3x - 4 = 6x^2 - 5x - 4 $$\n\nExpand the right-hand side:\n\n$$ 6x(x - 2) = 6x^2 - 12x $$\n\nThe equation becomes\n\n$$ 6x^2 - 5x - 4 = 6x^2 - 12x $$\n\nSubtract $6x^2$ from both sides:\n\n$$ -5x - 4 = -12x $$\n\nAdd $12x$ to both sides and then 4:\n\n$$ 7x - 4 = 0 \\qquad 7x = 4 \\qquad x = \\frac{4}{7} \\approx 0.57 $$\n\n**Answer:** $x = \\dfrac{4}{7} \\approx 0.57$\n\n**General conclusion:** when both sides contain the same $x^2$ term, it disappears, so the equation is in fact linear. Always expand fully before drawing conclusions about the type of the equation."
   }
  ]
 },
 "ma1c-2.7": {
  "kalla": "9cba3be85d",
  "data": [
   {
    "level": 1,
    "question": "Solve the equation $\\dfrac{84}{2x} = 6$.",
    "answer": {
     "value": 7,
     "unit": ""
    },
    "solution": "The denominator gives $2x \\neq 0$, that is, $x \\neq 0$.\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 84 = 6 \\cdot 2x $$\n\n$$ 84 = 12x $$\n\n$$ x = \\frac{84}{12} = 7 $$\n\n**Answer:** $x = 7$"
   },
   {
    "level": 1,
    "question": "Solve the equation $\\dfrac{5}{x} = \\dfrac{10}{12}$ using cross multiplication.",
    "answer": {
     "value": 6,
     "unit": ""
    },
    "solution": "The denominators give $x \\neq 0$.\n\nCross multiplication: the numerator of one fraction times the denominator of the other:\n\n$$ 10 \\cdot x = 5 \\cdot 12 $$\n\n$$ 10x = 60 $$\n\n$$ x = 6 $$\n\n**Answer:** $x = 6$"
   },
   {
    "level": 1,
    "question": "Why do you write $x \\neq 0$ before solving the equation $\\dfrac{130}{3x} = 5$?",
    "choices": [
     "The number 130 is not divisible by 0",
     "It is just a tradition without mathematical meaning",
     "Equations may never have the solution 0",
     "Division by 0 is not defined: the denominator may never become 0"
    ],
    "correct": 3,
    "solution": "If $x = 0$ the denominator becomes $3x = 0$, and division by 0 is not defined. We must therefore exclude that value BEFORE we solve the equation, and check that the solution we get is not a forbidden value.\n\n**Answer:** Division by 0 is not defined: the denominator may never become 0."
   },
   {
    "level": 2,
    "question": "Solve the equation $\\dfrac{x}{2} + \\dfrac{1}{3} = \\dfrac{3}{4}$. Give your answer in decimal form.",
    "answer": {
     "value": 0.83,
     "unit": "",
     "tol": 0.02
    },
    "solution": "The smallest number that is divisible by 2, 3 and 4 is 12. Multiply both sides by the LCD = 12:\n\n$$ \\frac{12x}{2} + \\frac{12 \\cdot 1}{3} = \\frac{12 \\cdot 3}{4} $$\n\n$$ 6x + 4 = 9 $$\n\n$$ 6x = 5 $$\n\n$$ x = \\frac{5}{6} \\approx 0.83 $$\n\n**Answer:** $x = \\dfrac{5}{6} \\approx 0.83$"
   },
   {
    "level": 2,
    "question": "Solve the equation $\\dfrac{4}{5x} - \\dfrac{1}{10x} = \\dfrac{1}{2}$. Give your answer in decimal form.",
    "answer": {
     "value": 1.4,
     "unit": "",
     "tol": 0.01
    },
    "solution": "The denominators give $x \\neq 0$. The LCD must be divisible by $5x$, $10x$ and 2, so the LCD = $10x$.\n\nMultiply each numerator by $10x$:\n\n$$ \\frac{10x \\cdot 4}{5x} - \\frac{10x \\cdot 1}{10x} = \\frac{10x \\cdot 1}{2} $$\n\n$$ 2 \\cdot 4 - 1 = 5x $$\n\n$$ 7 = 5x $$\n\n$$ x = \\frac{7}{5} = 1.4 $$\n\n**Answer:** $x = 1.4$"
   },
   {
    "level": 3,
    "question": "The equation $\\dfrac{3x - 12}{x - 4} = k$ contains a number $k$.<br>a) Solve the equation when $k = 5$.<br>b) Find $k$ so that the equation has infinitely many solutions, and state which $x$ are then solutions.<br>c) Is there any value of $k$ that gives the equation exactly one solution? Justify your answer.",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 3,
      "unit": "",
      "etikett": "$k =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "We have $(x - 4)$ in the denominator, so $x \\neq 4$. This holds for all values of $k$.\n\n**a)** With $k = 5$ the equation has one fraction term on the LHS and none on the RHS. The numerator equals the product of the quotient and the denominator:\n\n$$ 3x - 12 = 5(x - 4) $$\n\n$$ 3x - 12 = 5x - 20 $$\n\nSubtract $3x$ from both sides:\n\n$$ -12 = 2x - 20 $$\n\nAdd 20 to both sides:\n\n$$ 8 = 2x $$\n\n$$ x = 4 $$\n\nBut $x \\neq 4$, so that value is forbidden. The equation has no solution.\n\n**b)** The key insight is that the numerator can be factorised: $3x - 12 = 3(x - 4)$. For all permitted $x$, the fraction can therefore be simplified by $(x - 4)$:\n\n$$ \\frac{3x - 12}{x - 4} = \\frac{3(x - 4)}{x - 4} = 3 $$\n\nThe LHS therefore has the value 3 for every permitted $x$, whichever it is. If we choose $k = 3$, the equation is true for all permitted $x$. We check by solving it:\n\n$$ 3x - 12 = 3(x - 4) $$\n\n$$ 3x - 12 = 3x - 12 $$\n\nSubtract $3x$ from both sides and add 12:\n\n$$ 0 = 0 $$\n\nThe equality is true however $x$ is chosen. The solutions are all numbers except the forbidden value, that is, all $x \\neq 4$.\n\n**c)** No. We solve the equation with a general $k$. The numerator equals the product of the quotient and the denominator:\n\n$$ 3x - 12 = k(x - 4) $$\n\n$$ 3x - 12 = kx - 4k $$\n\nWe collect the $x$ terms on the LHS and the numbers on the RHS:\n\n$$ 3x - kx = 12 - 4k $$\n\n$$ x(3 - k) = 4(3 - k) $$\n\nIf $k = 3$ it says $0 = 0$, and all $x \\neq 4$ are solutions (as in b). If $k \\neq 3$ we can divide both sides by $(3 - k)$ and get $x = 4$, which is forbidden. The equation therefore has either infinitely many solutions or none at all, never exactly one. This agrees with the LHS always being 3: either $k$ equals 3, or it does not.\n\n**Answer:** a) No solution. b) $k = 3$, and then all $x \\neq 4$ are solutions. c) No. Since the LHS equals 3 for every permitted $x$, the equation has either infinitely many solutions ($k = 3$) or none at all ($k \\neq 3$).\n\n**General conclusion:** when the numerator is a multiple of the denominator, the fraction is a fixed number for all permitted $x$. Always write down the forbidden value first, and check the answer against it last."
   },
   {
    "level": 3,
    "question": "Sara cycles up a long hill at an average speed of 12 km/h and then down the same hill again. The average speed for the whole trip is the total distance divided by the total time.<br>a) What average speed must she keep downhill for the average speed for the whole trip to be 20 km/h?<br>b) Sara claims that if she cycles downhill at 36 km/h, the average speed for the whole trip will be 24 km/h, since the mean of 12 and 36 is 24. Is that right? Justify with a calculation.<br>c) Show that an average speed of 24 km/h for the whole trip is impossible to reach, however fast she cycles downhill.",
    "answer": {
     "value": 60,
     "unit": "km/h"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 60,
      "unit": "km/h"
     },
     {
      "del": "b",
      "value": 18,
      "unit": "km/h",
      "etikett": "the average speed is"
     }
    ],
    "solution": "**1. Translate.** The length of the hill is not given, so we call it $s$ km. We call the speed downhill $v$ km/h. The time for a distance is the distance divided by the speed:\n\n$$ \\text{time uphill} = \\frac{s}{12} \\qquad \\text{time downhill} = \\frac{s}{v} $$\n\nThe whole trip is $2s$ km long, so the average speed for the whole trip is\n\n$$ \\frac{2s}{\\dfrac{s}{12} + \\dfrac{s}{v}} $$\n\nWe have $v$ in a denominator, so $v \\neq 0$.\n\n**a)** The average speed should be 20 km/h:\n\n$$ \\frac{2s}{\\dfrac{s}{12} + \\dfrac{s}{v}} = 20 $$\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 2s = 20\\left(\\frac{s}{12} + \\frac{s}{v}\\right) $$\n\n$$ 2s = \\frac{20s}{12} + \\frac{20s}{v} $$\n\nHere comes the key insight: $s$ appears in every term, so we divide both sides by $s$ (the length of the hill is not 0). The length of the hill therefore does not matter for the answer.\n\n$$ 2 = \\frac{20}{12} + \\frac{20}{v} $$\n\nThe denominators are 12 and $v$, so the LCD is $12v$. We multiply each term by $12v$:\n\n$$ 12v \\cdot 2 = \\frac{12v \\cdot 20}{12} + \\frac{12v \\cdot 20}{v} $$\n\n$$ 24v = 20v + 240 $$\n\nSubtract $20v$ from both sides:\n\n$$ 4v = 240 $$\n\n$$ v = 60 $$\n\n**b)** No. With $v = 36$ the time for the whole trip is\n\n$$ \\frac{s}{12} + \\frac{s}{36} = \\frac{3s}{36} + \\frac{s}{36} = \\frac{4s}{36} = \\frac{s}{9} $$\n\nand the average speed\n\n$$ \\frac{2s}{\\dfrac{s}{9}} = 2s \\cdot \\frac{9}{s} = 18 $$\n\nThe average speed is 18 km/h, not 24 km/h. This is because Sara spends much longer on the slow climb uphill than on the fast ride downhill. The mean of two speeds gives the correct average speed only if they are kept for the same length of **time**, not the same distance.\n\n**c)** We set up the equation in the same way as in a), with 24 on the RHS:\n\n$$ 2s = 24\\left(\\frac{s}{12} + \\frac{s}{v}\\right) $$\n\nDivide both sides by $s$:\n\n$$ 2 = \\frac{24}{12} + \\frac{24}{v} $$\n\n$$ 2 = 2 + \\frac{24}{v} $$\n\nSubtract 2 from both sides:\n\n$$ 0 = \\frac{24}{v} $$\n\nThe numerator equals the product of the quotient and the denominator: $24 = 0 \\cdot v = 0$, which is a contradiction. The equation has no solution. Uphill, the hill takes $\\dfrac{s}{12}$ hours, and that alone is all the time that an average speed of 24 km/h allows for $2s$ km. The downhill ride must take some time, however small, so the average speed always ends up below 24 km/h.\n\n**Answer:** a) 60 km/h. b) No, the average speed is 18 km/h. c) The equation gives $0 = \\dfrac{24}{v}$, which has no solution: the uphill ride alone takes all the time that the average speed 24 km/h allows.\n\n**General conclusion:** average speed is total distance divided by total time, never the mean of the speeds. And a quantity that cancels from the equation (here $s$) does not affect the answer."
   },
   {
    "level": 3,
    "question": "A jug contains 2 dl of concentrated squash and 10 dl of water.<br>a) How much squash must be added for the squash to make up 25 % of the mixture?<br>b) How much water would you instead have to pour away for the squash to make up 25 % of the mixture?<br>c) Can you get a mixture that consists of 100 % squash just by adding squash? Set up and solve an equation, and interpret the result.",
    "answer": {
     "value": 1.33,
     "unit": "dl",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.33,
      "unit": "dl",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 4,
      "unit": "dl"
     },
     {
      "del": "c"
     }
    ],
    "solution": "The proportion of squash in the mixture is the amount of squash divided by the volume of the whole mixture. At the start the proportion is $\\dfrac{2}{12} \\approx 0.17$, that is, about 17 %.\n\n**a)** Let $x$ be the amount of squash added, in dl. Then there are $(2 + x)$ dl of squash in a mixture of $(12 + x)$ dl. The proportion should be 25 %, that is, 0.25:\n\n$$ \\frac{2 + x}{12 + x} = 0.25 $$\n\nThe denominator gives $x \\neq -12$, but an added amount is never negative, so that value is not relevant.\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 2 + x = 0.25(12 + x) $$\n\n$$ 2 + x = 3 + 0.25x $$\n\nSubtract $0.25x$ and 2 from both sides:\n\n$$ 0.75x = 1 $$\n\n$$ x = \\frac{1}{0.75} = \\frac{4}{3} \\approx 1.33 $$\n\nCheck: $\\dfrac{2 + 4/3}{12 + 4/3} = \\dfrac{10/3}{40/3} = \\dfrac{10}{40} = 0.25$.\n\n**b)** Let $y$ be the amount of water poured away, in dl. The squash is still 2 dl, but the mixture shrinks to $(12 - y)$ dl:\n\n$$ \\frac{2}{12 - y} = 0.25 $$\n\nThe denominator gives $y \\neq 12$.\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 2 = 0.25(12 - y) $$\n\n$$ 2 = 3 - 0.25y $$\n\nAdd $0.25y$ to both sides and subtract 2:\n\n$$ 0.25y = 1 $$\n\n$$ y = 4 $$\n\nCheck: $\\dfrac{2}{12 - 4} = \\dfrac{2}{8} = 0.25$. Notice that 4 dl of water must be removed but only 1.33 dl of squash added to reach the same proportion.\n\n**c)** The proportion should become 100 %, that is, 1:\n\n$$ \\frac{2 + x}{12 + x} = 1 $$\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 2 + x = 12 + x $$\n\nSubtract $x$ from both sides:\n\n$$ 2 = 12 $$\n\nThat is a contradiction, so the equation has no solution. Interpretation: however much squash you add, the 10 dl of water remain in the jug, so the mixture never consists of squash alone. The proportion can come as close to 100 % as you like (100 dl of added squash gives $\\dfrac{102}{112} \\approx 91\\ \\%$) but never gets there.\n\n**Answer:** a) $\\dfrac{4}{3}$ dl $\\approx 1.3$ dl of squash. b) 4 dl of water. c) No. The equation leads to $2 = 12$ and has no solution, since the water always remains in the mixture.\n\n**General conclusion:** a proportion is the part divided by the whole, and the whole changes when something is added or removed. So always rewrite the denominator before you set up the equation."
   },
   {
    "level": 3,
    "question": "The quotient of two positive numbers is $\\dfrac{3}{5}$. If 8 is added to each of the numbers, the quotient of the new numbers is instead $\\dfrac{5}{7}$. Find the two numbers.",
    "answer": {
     "value": 12,
     "unit": ""
    },
    "solution": "**1. Translate.** That the quotient of the numbers is $\\dfrac{3}{5}$ means that the numbers are in the ratio 3 to 5. A smart choice of notation is therefore to call the numbers $3k$ and $5k$, where $k$ is a positive number. Then the quotient is automatically $\\dfrac{3k}{5k} = \\dfrac{3}{5}$, and only one unknown remains.\n\nWhen 8 is added to each of the numbers they become $3k + 8$ and $5k + 8$, and the quotient should be $\\dfrac{5}{7}$:\n\n$$ \\frac{3k + 8}{5k + 8} = \\frac{5}{7} $$\n\nThe denominator gives $5k + 8 \\neq 0$, which is satisfied since $k$ is positive.\n\n**2. Solve the equation.** One fraction term on each side, so we cross multiply:\n\n$$ 7(3k + 8) = 5(5k + 8) $$\n\n$$ 21k + 56 = 25k + 40 $$\n\nSubtract $21k$ from both sides:\n\n$$ 56 = 4k + 40 $$\n\nSubtract 40 from both sides:\n\n$$ 16 = 4k $$\n\n$$ k = 4 $$\n\n**3. Interpret and answer.** The numbers are $3k = 12$ and $5k = 20$. Check: $\\dfrac{12}{20} = \\dfrac{3}{5}$ and $\\dfrac{12 + 8}{20 + 8} = \\dfrac{20}{28} = \\dfrac{5}{7}$.\n\nAlternatively, you can call the numbers $x$ and $y$ and set up two equations, $\\dfrac{x}{y} = \\dfrac{3}{5}$ and $\\dfrac{x + 8}{y + 8} = \\dfrac{5}{7}$. Cross multiplication in the first gives $y = \\dfrac{5x}{3}$, which is substituted into the second. This gives the same answer but more calculation.\n\n**Answer:** The numbers are 12 and 20.\n\n**General conclusion:** a ratio $a : b$ is described with a single unknown by writing the numbers as $ak$ and $bk$. This turns a system of equations into one equation with a fraction term on each side."
   },
   {
    "level": 3,
    "question": "Two pumps are used to empty a swimming pool. Pump A can empty it alone in 6 hours. When both pumps work at the same time, the emptying takes 4 hours.<br>a) How long would pump B need to empty the pool on its own?<br>b) Suppose instead that pump A alone needs $a$ hours and pump B alone $b$ hours. Show that emptying with both pumps takes $T = \\dfrac{ab}{a + b}$ hours.<br>c) Use the formula in b) to explain why $T$ is always shorter than both $a$ and $b$.",
    "answer": {
     "value": 12,
     "unit": "h"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 12,
      "unit": "h"
     },
     {
      "del": "b"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** The times cannot simply be added or subtracted: pump B does not take $6 - 4 = 2$ hours. What can be added is how large a **part** of the pool each pump empties per hour.\n\nPump A empties the whole pool in 6 hours, that is, $\\dfrac{1}{6}$ of the pool per hour. Let pump B need $x$ hours on its own, so that it empties $\\dfrac{1}{x}$ of the pool per hour. Together, $\\dfrac{1}{4}$ of the pool is emptied per hour:\n\n$$ \\frac{1}{6} + \\frac{1}{x} = \\frac{1}{4} $$\n\nWe have $x$ in the denominator, so $x \\neq 0$.\n\nThree fraction terms, so we multiply both sides by the LCD. The denominators are 6, $x$ and 4, and the LCD must be divisible by 6 and 4 and by $x$, so the LCD is $12x$. We multiply each numerator by $12x$:\n\n$$ \\frac{12x \\cdot 1}{6} + \\frac{12x \\cdot 1}{x} = \\frac{12x \\cdot 1}{4} $$\n\n$$ 2x + 12 = 3x $$\n\nSubtract $2x$ from both sides:\n\n$$ 12 = x $$\n\nReasonableness: pump B is slower than pump A, and together it goes faster than with either of them alone. Check: $\\dfrac{1}{6} + \\dfrac{1}{12} = \\dfrac{2}{12} + \\dfrac{1}{12} = \\dfrac{3}{12} = \\dfrac{1}{4}$.\n\n**b)** The same reasoning with letters. Pump A empties $\\dfrac{1}{a}$ of the pool per hour, pump B $\\dfrac{1}{b}$, and together $\\dfrac{1}{T}$ is emptied per hour:\n\n$$ \\frac{1}{a} + \\frac{1}{b} = \\frac{1}{T} $$\n\nThe denominators are $a$, $b$ and $T$, so the LCD is $abT$. We multiply each numerator by $abT$:\n\n$$ \\frac{abT \\cdot 1}{a} + \\frac{abT \\cdot 1}{b} = \\frac{abT \\cdot 1}{T} $$\n\n$$ bT + aT = ab $$\n\nWe take out $T$ on the LHS:\n\n$$ T(a + b) = ab $$\n\nDivide both sides by $(a + b)$, which is not 0 since $a$ and $b$ are positive:\n\n$$ T = \\frac{ab}{a + b} $$\n\nCheck against a): $T = \\dfrac{6 \\cdot 12}{6 + 12} = \\dfrac{72}{18} = 4$ hours.\n\n**c)** Write the formula as a product:\n\n$$ T = \\frac{ab}{a + b} = a \\cdot \\frac{b}{a + b} $$\n\nSince $a$ is positive, the denominator $a + b$ is larger than the numerator $b$, so the fraction $\\dfrac{b}{a + b}$ is less than 1. Then $T$ is less than $a$. In the same way, $T = b \\cdot \\dfrac{a}{a + b}$ is less than $b$. Two pumps together are therefore always faster than the faster of them alone, which is reasonable: the other pump always contributes something.\n\n**Answer:** a) 12 hours. b) The equation $\\dfrac{1}{a} + \\dfrac{1}{b} = \\dfrac{1}{T}$ gives $T = \\dfrac{ab}{a + b}$ after multiplying by the LCD $= abT$. c) $T = a \\cdot \\dfrac{b}{a + b}$ where the fraction is less than 1, so $T < a$, and in the same way $T < b$.\n\n**General conclusion:** when several work at the same time, the work rates (proportion per hour) are added, not the times. This always gives an equation with unknowns in the denominators."
   },
   {
    "level": 3,
    "question": "The time difference $t$ minutes between driving a distance of $s$ km at the average speed $h_1$ km/h and at the higher average speed $h_2$ km/h is given by the formula $$t = \\left(\\frac{1}{h_1} - \\frac{1}{h_2}\\right) \\cdot s \\cdot 60$$<br>a) Show how the formula follows from the relationship time = distance divided by speed.<br>b) Elin commutes 30 km at the average speed 60 km/h. What average speed would she need to keep to arrive 6 minutes earlier?<br>c) Elin claims that she can save 30 minutes if she just drives fast enough. Investigate the claim using the equation.",
    "answer": {
     "value": 75,
     "unit": "km/h"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 75,
      "unit": "km/h"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** The time for a distance is the distance divided by the speed. At the speed $h_1$ the journey takes $\\dfrac{s}{h_1}$ hours and at $h_2$ it takes $\\dfrac{s}{h_2}$ hours. The time difference in hours is\n\n$$ \\frac{s}{h_1} - \\frac{s}{h_2} = \\left(\\frac{1}{h_1} - \\frac{1}{h_2}\\right) \\cdot s $$\n\nwhere we have taken out $s$. One hour is 60 minutes, so the time difference in minutes is obtained by multiplying by 60. That is exactly the formula.\n\n**b)** We substitute $t = 6$, $h_1 = 60$ and $s = 30$ and solve for $h_2$. We have $h_2$ in the denominator, so $h_2 \\neq 0$.\n\n$$ 6 = \\left(\\frac{1}{60} - \\frac{1}{h_2}\\right) \\cdot 30 \\cdot 60 $$\n\n$$ 6 = \\left(\\frac{1}{60} - \\frac{1}{h_2}\\right) \\cdot 1\\,800 $$\n\nWe multiply $1\\,800$ into the bracket:\n\n$$ 6 = \\frac{1\\,800}{60} - \\frac{1\\,800}{h_2} $$\n\n$$ 6 = 30 - \\frac{1\\,800}{h_2} $$\n\nAdd $\\dfrac{1\\,800}{h_2}$ to both sides and subtract 6:\n\n$$ \\frac{1\\,800}{h_2} = 24 $$\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 1\\,800 = 24 h_2 $$\n\n$$ h_2 = \\frac{1\\,800}{24} = 75 $$\n\nCheck: at 60 km/h, 30 km takes $\\dfrac{30}{60}$ h $= 30$ minutes, and at 75 km/h it takes $\\dfrac{30}{75}$ h $= 0.4$ h $= 24$ minutes. The difference is 6 minutes.\n\n**c)** The same equation with $t = 30$:\n\n$$ 30 = 30 - \\frac{1\\,800}{h_2} $$\n\nSubtract 30 from both sides:\n\n$$ 0 = -\\frac{1\\,800}{h_2} $$\n\nThe numerator equals the product of the quotient and the denominator: $-1\\,800 = 0 \\cdot h_2 = 0$, which is a contradiction. The equation has no solution.\n\nInterpretation: the journey takes 30 minutes at 60 km/h. Saving 30 minutes would mean that the journey takes 0 minutes, and that requires an infinitely high speed. Elin can save almost 30 minutes at a very high speed (at 600 km/h the journey takes 3 minutes, so 27 minutes are saved), but never the full 30. The formula shows the same thing: the term $\\dfrac{1\\,800}{h_2}$ is always greater than 0, so $t$ is always less than 30.\n\n**Answer:** a) $\\dfrac{s}{h_1} - \\dfrac{s}{h_2}$ hours, which is rewritten with $s$ taken out and multiplied by 60. b) 75 km/h. c) No. The equation $30 = 30 - \\dfrac{1\\,800}{h_2}$ has no solution; the time saved can come close to 30 minutes but never reach it, since the journey always takes time.\n\n**General conclusion:** a term of the form $\\dfrac{\\text{number}}{x}$ can never become 0. An equation that requires it has no solution, and the interpretation is usually a limit that can be approached but not reached."
   },
   {
    "level": 3,
    "question": "Consider the expression $\\dfrac{2x}{x + 3}$.<br>a) Can the expression take the value 2? Set up an equation and justify your answer.<br>b) For which $x$ does the expression take the value 1.9?<br>c) Elias claims that the expression can never be greater than 2, since the numerator $2x$ is always less than $2(x + 3)$. Show that Elias is wrong by finding an $x$ that gives the expression the value 3, and explain where his reasoning fails.",
    "answer": {
     "value": 57,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 57,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "c",
      "value": -9,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "We have $(x + 3)$ in the denominator, so $x \\neq -3$ in all three parts.\n\n**a)** We investigate whether the equation $\\dfrac{2x}{x + 3} = 2$ has any solution. The numerator equals the product of the quotient and the denominator:\n\n$$ 2x = 2(x + 3) $$\n\n$$ 2x = 2x + 6 $$\n\nSubtract $2x$ from both sides:\n\n$$ 0 = 6 $$\n\nThat is a contradiction, so the equation has no solution. The expression can never take the value 2. The reason is that the numerator would have to be exactly twice the denominator, $2x = 2x + 6$, and no number is 6 less than itself.\n\n**b)** The numerator equals the product of the quotient and the denominator:\n\n$$ 2x = 1.9(x + 3) $$\n\n$$ 2x = 1.9x + 5.7 $$\n\nSubtract $1.9x$ from both sides:\n\n$$ 0.1x = 5.7 $$\n\n$$ x = 57 $$\n\nCheck: $\\dfrac{2 \\cdot 57}{57 + 3} = \\dfrac{114}{60} = 1.9$. The expression therefore comes close to 2 for large $x$ (and even closer for even larger $x$) without ever reaching it, just as in a).\n\n**c)** We solve the equation $\\dfrac{2x}{x + 3} = 3$. The numerator equals the product of the quotient and the denominator:\n\n$$ 2x = 3(x + 3) $$\n\n$$ 2x = 3x + 9 $$\n\nSubtract $3x$ from both sides:\n\n$$ -x = 9 $$\n\n$$ x = -9 $$\n\nThe value is permitted ($x \\neq -3$). Check: $\\dfrac{2 \\cdot (-9)}{-9 + 3} = \\dfrac{-18}{-6} = 3$. The expression can therefore be greater than 2.\n\nElias is right that $2x < 2(x + 3)$ for all $x$. But the conclusion \"then the fraction is less than 2\" only holds if the denominator $x + 3$ is **positive**. For $x < -3$ the denominator is negative, and when you divide both sides of an inequality by a negative number, the inequality sign is reversed. There the expression is instead greater than 2: the numerator and the denominator are both negative, and the numerator is the larger in absolute value.\n\n**Answer:** a) No. The equation leads to $0 = 6$ and has no solution. b) $x = 57$. c) $x = -9$ gives the value 3. Elias forgets that the denominator is negative for $x < -3$, and then his conclusion does not hold.\n\n**General conclusion:** a fraction with a variable in the denominator changes behaviour where the denominator changes sign. Always investigate both sides of the forbidden value before drawing conclusions about \"never\" or \"always\"."
   }
  ]
 },
 "ma1c-2.8": {
  "kalla": "bfc7f92e39",
  "data": [
   {
    "level": 1,
    "question": "What is the FIRST step in the method for problem solving with equations?",
    "choices": [
     "Solve the equation",
     "Answer with a unit",
     "Define a symbol for what is being asked for and set up an equation",
     "Guess a reasonable answer"
    ],
    "correct": 2,
    "solution": "The method has three steps: **1. Translate** (introduce a symbol, for example $x$, for what is being asked for and set up the equation), **2. Solve the equation**, **3. Interpret and answer** with a unit.\n\n**Answer:** Define a symbol for what is being asked for and set up an equation."
   },
   {
    "level": 1,
    "question": "A number increased by 17 is equal to 43. What is the number?",
    "answer": {
     "value": 26,
     "unit": ""
    },
    "solution": "Call the number $x$ and translate the sentence into an equation:\n\n$$ x + 17 = 43 $$\n\nSubtract 17 from both sides:\n\n$$ x = 26 $$\n\n**Answer:** The number is 26."
   },
   {
    "level": 1,
    "question": "Moa is $x$ years old and her brother is 5 years older. Together they are 31 years old. Which equation describes the situation?",
    "choices": [
     "$x + (x + 5) = 31$",
     "$x + 5x = 31$",
     "$x(x + 5) = 31$",
     "$x - 5 = 31$"
    ],
    "correct": 0,
    "solution": "Moa is $x$ years old and her brother $(x + 5)$ years old. \"Together\" means the sum:\n\n$$ x + (x + 5) = 31 $$\n\n(The solution is $2x + 5 = 31$, that is, $x = 13$: Moa is 13 years old and her brother 18.)\n\n**Answer:** $x + (x + 5) = 31$"
   },
   {
    "level": 2,
    "question": "Three siblings share 2 700 kr. The middle child gets twice as much as the youngest child, and the oldest child gets 200 kr more than the middle child. How much does the youngest child get?",
    "answer": {
     "value": 500,
     "unit": "kr"
    },
    "solution": "**Translate.** The youngest child's amount is asked for, so call it $x$. Then the middle child gets $2x$ and the oldest child $2x + 200$.\n\n$$ x + 2x + (2x + 200) = 2\\ 700 $$\n\n**Solve the equation.**\n\n$$ 5x + 200 = 2\\ 700 $$\n\n$$ 5x = 2\\ 500 $$\n\n$$ x = 500 $$\n\n**Interpret and answer.** 500 kr out of 2 700 kr is reasonable (the middle child gets 1 000 kr and the oldest 1 200 kr; check: $500 + 1\\ 000 + 1\\ 200 = 2\\ 700$).\n\n**Answer:** 500 kr"
   },
   {
    "level": 2,
    "question": "A rectangle has a perimeter of 54 cm. The base is 3 cm longer than the height. How long is the height?",
    "answer": {
     "value": 12,
     "unit": "cm"
    },
    "solution": "**Translate.** The height is asked for, so call it $x$ cm. Then the base is $(x + 3)$ cm. The perimeter is two bases plus two heights:\n\n$$ 2x + 2(x + 3) = 54 $$\n\n**Solve the equation.**\n\n$$ 2x + 2x + 6 = 54 $$\n\n$$ 4x = 48 $$\n\n$$ x = 12 $$\n\n**Interpret and answer.** The height is 12 cm and the base 15 cm, so the perimeter is $2 \\cdot 12 + 2 \\cdot 15 = 54$ cm. Reasonable!\n\n**Answer:** 12 cm"
   },
   {
    "level": 3,
    "question": "Grandfather is today 6 times as old as his grandchild. In 8 years he will be 4 times as old as the grandchild. How old is the grandchild today?",
    "answer": {
     "value": 12,
     "unit": "years"
    },
    "solution": "**The key insight:** both people's ages change over time, so the condition \"in 8 years\" must be added to BOTH ages.\n\n**Translate.** The grandchild's age today is asked for, so call it $x$ years. Grandfather is then $6x$ years old. In 8 years the grandchild is $(x + 8)$ years old and grandfather $(6x + 8)$ years old, and then\n\n$$ 6x + 8 = 4(x + 8) $$\n\n**Solve the equation.**\n\n$$ 6x + 8 = 4x + 32 $$\n\nSubtract $4x$ from both sides:\n\n$$ 2x + 8 = 32 $$\n\n$$ 2x = 24 \\qquad x = 12 $$\n\n**Interpret and answer.** The grandchild is 12 years old and grandfather $6 \\cdot 12 = 72$ years old. In 8 years: 20 and 80 years respectively, and $80 = 4 \\cdot 20$. It agrees!\n\n**Answer:** The grandchild is 12 years old.\n\n**General conclusion:** in age problems everyone gets older by the same amount, so add the time shift to each person's expression before setting up the condition."
   },
   {
    "level": 3,
    "question": "Three siblings together inherit 210 000 kr. The inheritance is divided so that the ratio between the oldest and the middle sibling's share is $5:4$, and the ratio between the middle and the youngest sibling's share is $3:2$. How much does each of the siblings get?",
    "answer": {
     "value": 90000,
     "unit": "kr"
    },
    "solution": "**1. Translate.** Both ratios contain the middle sibling's share, so we let $x$ be that share, in kronor. The oldest sibling gets $\\dfrac{5}{4}$ of the middle one's, that is, $\\dfrac{5x}{4}$, and the youngest gets $\\dfrac{2}{3}$ of the middle one's, that is, $\\dfrac{2x}{3}$. The sum is 210 000 kr:\n\n$$ \\frac{5x}{4} + x + \\frac{2x}{3} = 210\\,000 $$\n\n**2. Solve the equation.** The denominators are 4 and 3, so the LCD = 12. We multiply each term by 12:\n\n$$ \\frac{12 \\cdot 5x}{4} + 12x + \\frac{12 \\cdot 2x}{3} = 12 \\cdot 210\\,000 $$\n\n$$ 15x + 12x + 8x = 2\\,520\\,000 $$\n\n$$ 35x = 2\\,520\\,000 $$\n\nDivide both sides by 35:\n\n$$ x = 72\\,000 $$\n\n**3. Interpret and answer.** The middle sibling gets 72 000 kr, the oldest $\\dfrac{5 \\cdot 72\\,000}{4} = 90\\,000$ kr and the youngest $\\dfrac{2 \\cdot 72\\,000}{3} = 48\\,000$ kr. Check: $90\\,000 + 72\\,000 + 48\\,000 = 210\\,000$ kr, $90\\,000 : 72\\,000 = 5 : 4$ and $72\\,000 : 48\\,000 = 3 : 2$.\n\nThe key insight is to choose $x$ as the share that **both** ratios mention. If you choose the oldest sibling, you get two layers of fractions in the expression for the youngest. Another way is to rewrite the ratios with the same number for the middle sibling: $5:4 = 15:12$ and $3:2 = 12:8$, so the shares are in the ratio $15:12:8$ and can be written $15k$, $12k$ and $8k$. Then $35k = 210\\,000$ gives $k = 6\\,000$.\n\n**Answer:** The oldest sibling gets 90 000 kr, the middle one 72 000 kr and the youngest 48 000 kr.\n\n**General conclusion:** in a chain of ratios, the symbol is chosen for the quantity that appears in both parts, or the chain is rewritten as a single ratio $a:b:c$ and the parts are called $ak$, $bk$ and $ck$."
   },
   {
    "level": 3,
    "question": "Emma starts a run and keeps the speed 10 km/h. Twelve minutes later Hanna starts from the same place and runs the same route at the speed 12 km/h.<br>a) How long after her own start does Hanna catch up with Emma?<br>b) How far from the starting point does it happen?<br>c) The route is 10 km long. Does Hanna catch up with Emma before the route ends? Justify with your answer in b).",
    "answer": {
     "value": 1,
     "unit": "h"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1,
      "unit": "h"
     },
     {
      "del": "b",
      "value": 12,
      "unit": "km"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**1. Translate.** The crucial insight is that Emma and Hanna have run **the same distance** at the moment Hanna catches up. Distance is speed times time, so we need both times.\n\nLet $t$ be Hanna's running time in hours when she catches up. Emma started 12 minutes earlier, that is, $\\dfrac{12}{60} = 0.2$ hours earlier, so Emma has then run for $(t + 0.2)$ hours. The distances are equal:\n\n$$ 10(t + 0.2) = 12t $$\n\n**2. Solve the equation.** We expand the bracket:\n\n$$ 10t + 2 = 12t $$\n\nSubtract $10t$ from both sides:\n\n$$ 2 = 2t $$\n\nDivide both sides by 2:\n\n$$ t = 1 $$\n\n**3. Interpret and answer.**\n\n**a)** Hanna catches up with Emma one hour after her own start. Reasonableness: Emma has a head start of $10 \\cdot 0.2 = 2$ km, and Hanna gains $12 - 10 = 2$ km per hour, so it takes exactly one hour.\n\n**b)** Hanna has then run $12 \\cdot 1 = 12$ km from the starting point. Check: Emma has run for 1.2 hours and $10 \\cdot 1.2 = 12$ km, the same distance.\n\n**c)** No. Hanna catches up after 12 km, but the route is only 10 km. When Emma finishes after 10 km, Hanna has run for $1 - 0.2 = 0.8$ hours and covered $12 \\cdot 0.8 = 9.6$ km. She is still 400 m behind.\n\n**Answer:** a) After 1 hour. b) 12 km from the start. c) No, the catching up would happen after 12 km, but the route is only 10 km long.\n\n**General conclusion:** in a catch-up problem, the equation is set up from the condition that the distances are equal, and the one who started first has the longer time. Always check that the answer lies within the limits of the problem, here the length of the route."
   },
   {
    "level": 3,
    "question": "A tea merchant has two kinds of tea, one that costs 120 kr/kg and one that costs 200 kr/kg. The merchant wants to blend them into 10 kg of tea to be sold for 150 kr/kg, without gaining or losing anything on the blend compared with selling the kinds separately.<br>a) How many kilograms of each kind should be blended?<br>b) The merchant is considering instead blending a kind for 100 kr/kg. What does the equation say about that? Interpret the result.",
    "answer": {
     "value": 6.25,
     "unit": "kg",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 6.25,
      "unit": "kg",
      "etikett": "the tea at 120 kr/kg",
      "tol": 0.01
     },
     {
      "del": "a",
      "value": 3.75,
      "unit": "kg",
      "etikett": "the tea at 200 kr/kg",
      "tol": 0.01
     },
     {
      "del": "b"
     }
    ],
    "solution": "**1. Translate.** Let $x$ be the amount of the cheap tea in kilograms. The blend should weigh 10 kg, so the amount of expensive tea is $(10 - x)$ kg. The price of the tea used should be equal to the price of the blend: 10 kg at 150 kr/kg costs $10 \\cdot 150 = 1\\,500$ kr.\n\n$$ 120x + 200(10 - x) = 1\\,500 $$\n\n**2. Solve the equation.** We expand the bracket. Watch the signs: $200 \\cdot (-x) = -200x$.\n\n$$ 120x + 2\\,000 - 200x = 1\\,500 $$\n\n$$ 2\\,000 - 80x = 1\\,500 $$\n\nSubtract 2 000 from both sides:\n\n$$ -80x = -500 $$\n\nDivide both sides by (−80):\n\n$$ x = \\frac{-500}{-80} = 6.25 $$\n\n**3. Interpret and answer.**\n\n**a)** 6.25 kg of the cheap tea is needed and $10 - 6.25 = 3.75$ kg of the expensive one. Check: $120 \\cdot 6.25 + 200 \\cdot 3.75 = 750 + 750 = 1\\,500$ kr, that is, 150 kr/kg. Reasonableness: 150 kr/kg is closer to 120 than to 200, so there should be more of the cheap tea.\n\n**b)** The same set-up with $10 \\cdot 100 = 1\\,000$ kr:\n\n$$ 120x + 200(10 - x) = 1\\,000 $$\n\n$$ 2\\,000 - 80x = 1\\,000 $$\n\n$$ -80x = -1\\,000 $$\n\n$$ x = 12.5 $$\n\nThe equation gives $x = 12.5$ kg of cheap tea, but the blend should weigh 10 kg, so the amount of expensive tea becomes $10 - 12.5 = -2.5$ kg. A negative amount cannot be blended in. The interpretation is that it is impossible: a blend can never be cheaper than the cheapest ingredient, and the cheap tea costs 120 kr/kg.\n\n**Answer:** a) 6.25 kg of the tea at 120 kr/kg and 3.75 kg of the tea at 200 kr/kg. b) The equation gives a negative amount of the expensive tea. That is impossible, since the blend cannot be cheaper than 120 kr/kg.\n\n**General conclusion:** in a mixture problem, the equation is set up on the total value (price times amount), and the two amounts are expressed with the same unknown since their sum is known. An answer outside the possible interval means that the blend cannot be made."
   },
   {
    "level": 3,
    "question": "A square has the side $x$ cm. If one side is lengthened by 4 cm and the other is shortened by 2 cm, you get a rectangle whose area is 12 cm² larger than the area of the square.<br>a) Find $x$.<br>b) Show that if one side is lengthened by $a$ cm and the other is shortened by $a$ cm, the area is always smaller than that of the square, whatever $x$ the square has.",
    "answer": {
     "value": 10,
     "unit": "cm"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 10,
      "unit": "cm",
      "etikett": "$x =$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**a)** The area of the square is $x \\cdot x = x^2$. The rectangle gets the sides $(x + 4)$ cm and $(x - 2)$ cm, so its area is $(x + 4)(x - 2)$. It should be 12 cm² larger than that of the square:\n\n$$ (x + 4)(x - 2) = x^2 + 12 $$\n\nWe expand the brackets on the LHS, each term in the first bracket times each term in the second:\n\n$$ x^2 - 2x + 4x - 8 = x^2 + 12 $$\n\n$$ x^2 + 2x - 8 = x^2 + 12 $$\n\nThe key insight: the term $x^2$ appears on both sides. If we subtract $x^2$ from both sides it disappears, and what remains is an ordinary linear equation:\n\n$$ 2x - 8 = 12 $$\n\nAdd 8 to both sides:\n\n$$ 2x = 20 $$\n\n$$ x = 10 $$\n\nCheck: the square has the area $10^2 = 100$ cm². The rectangle gets the sides 14 cm and 8 cm and the area $14 \\cdot 8 = 112$ cm², which is 12 cm² more.\n\n**b)** The rectangle gets the sides $(x + a)$ and $(x - a)$, and the area\n\n$$ (x + a)(x - a) = x^2 - ax + ax - a^2 = x^2 - a^2 $$\n\nThe area of the square is $x^2$. The rectangle's area is therefore $a^2$ smaller, and $a^2$ is positive as soon as $a \\neq 0$. The difference does not depend on $x$ at all: however large the square is, the area decreases by $a^2$ cm². Check with a): $a = 4$ gives that the area decreases by 16 cm², and with $x = 10$ we get $14 \\cdot 6 = 84 = 100 - 16$.\n\n**Answer:** a) $x = 10$ cm. b) The rectangle's area is $(x + a)(x - a) = x^2 - a^2$, that is, always $a^2$ cm² smaller than the square's area $x^2$.\n\n**General conclusion:** an equation that looks quadratic can become linear when the $x^2$ terms cancel. Expand the brackets first and simplify before you decide what kind of equation it is. The identity $(x + a)(x - a) = x^2 - a^2$ is called the difference of two squares."
   },
   {
    "level": 3,
    "question": "A two-digit number has the digit sum 11. If the digits change places, the new number is 27 larger than the original. What is the original number?",
    "answer": {
     "value": 47,
     "unit": ""
    },
    "solution": "**1. Translate.** The crucial insight is how a two-digit number is built from its digits. If the tens digit is $t$ and the ones digit is $e$, the number has the value $10t + e$. For example, $47 = 10 \\cdot 4 + 7$. If the digits change places, the number becomes $10e + t$.\n\nThe digit sum is 11, so $t + e = 11$, which gives $e = 11 - t$. So let $x$ be the tens digit. Then the ones digit is $11 - x$:\n\n$$ \\text{original number: } 10x + (11 - x) \\qquad \\text{reversed number: } 10(11 - x) + x $$\n\nThe reversed number is 27 larger:\n\n$$ 10(11 - x) + x = 10x + (11 - x) + 27 $$\n\n**2. Solve the equation.** We simplify both sides:\n\n$$ 110 - 10x + x = 10x + 11 - x + 27 $$\n\n$$ 110 - 9x = 9x + 38 $$\n\nAdd $9x$ to both sides:\n\n$$ 110 = 18x + 38 $$\n\nSubtract 38 from both sides:\n\n$$ 72 = 18x $$\n\nDivide both sides by 18:\n\n$$ x = 4 $$\n\n**3. Interpret and answer.** The tens digit is 4 and the ones digit $11 - 4 = 7$, so the number is 47. Check: the digit sum is $4 + 7 = 11$, and $74 - 47 = 27$.\n\n**Answer:** The number is 47.\n\n**General conclusion:** a number and its digits are different things. A digit is a symbol, and the value of the number is $10t + e$ for two digits (and $100h + 10t + e$ for three). All problems about reversed digits are solved by writing the number in that way. Notice also that the difference $9(e - t)$ is always divisible by 9."
   },
   {
    "level": 3,
    "question": "A sports club is going to hire a bus to a tournament. The bus costs 4 800 kr, and in addition food costs 60 kr per person. The cost is shared equally between everyone who goes.<br>a) Write an expression for the cost per person when $n$ people go.<br>b) How many people must go for the cost per person to be at most 200 kr?<br>c) The club wants to set the price at 60 kr per person. Show by reasoning about the expression that this is impossible, however many people go.",
    "answer": {
     "value": 35,
     "unit": "people"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 35,
      "unit": "people"
     }
    ],
    "solution": "**a)** The total cost is the fixed bus cost plus the food for everyone: $4\\,800 + 60n$ kr. Shared between $n$ people, the cost per person is\n\n$$ \\frac{4\\,800 + 60n}{n} = \\frac{4\\,800}{n} + 60 $$\n\nThe expression is read like this: each person pays their own 60 kr for food plus their share of the bus. The more people go, the smaller the bus share $\\dfrac{4\\,800}{n}$ becomes.\n\n**b)** The cost per person should be at most 200 kr. We find out when it is exactly 200 kr:\n\n$$ \\frac{4\\,800}{n} + 60 = 200 $$\n\nSubtract 60 from both sides:\n\n$$ \\frac{4\\,800}{n} = 140 $$\n\nThe numerator equals the product of the quotient and the denominator:\n\n$$ 4\\,800 = 140n $$\n\n$$ n = \\frac{4\\,800}{140} \\approx 34.3 $$\n\nThe number of people is an integer. With 34 people the cost is $\\dfrac{4\\,800}{34} + 60 \\approx 201.2$ kr, that is, more than 200 kr. With 35 people it is $\\dfrac{4\\,800}{35} + 60 \\approx 197.1$ kr. Since the bus share decreases when more people go, it is enough for at least 35 people to go.\n\n**c)** The price 60 kr per person would require\n\n$$ \\frac{4\\,800}{n} + 60 = 60 $$\n\n$$ \\frac{4\\,800}{n} = 0 $$\n\nThe numerator equals the product of the quotient and the denominator: $4\\,800 = 0 \\cdot n = 0$, which is a contradiction. The equation has no solution. Interpretation: 60 kr covers exactly the food, and then nothing is left for the bus. The bus share $\\dfrac{4\\,800}{n}$ becomes smaller the more people go, but it never becomes 0, so the cost per person is always greater than 60 kr.\n\n**Answer:** a) $\\dfrac{4\\,800 + 60n}{n}$ kr, that is, $\\dfrac{4\\,800}{n} + 60$ kr. b) At least 35 people. c) It would require $\\dfrac{4\\,800}{n} = 0$, which has no solution; the cost per person is always greater than 60 kr.\n\n**General conclusion:** a cost per person with a fixed part becomes $\\dfrac{\\text{fixed cost}}{n} + \\text{variable cost}$. It approaches the variable cost as $n$ grows but never reaches it."
   }
  ]
 },
 "ma1c-2.9": {
  "kalla": "86248b3931",
  "data": [
   {
    "level": 1,
    "question": "Solve the equation $x^2 = 81$. What is the answer?",
    "choices": [
     "$x = 9$",
     "$x = \\pm 9$",
     "$x = \\pm 40.5$",
     "$x = 6\\ 561$"
    ],
    "correct": 1,
    "solution": "A simple quadratic equation has TWO solutions. Do not forget the negative one:\n\n$$ x = \\pm\\sqrt{81} = \\pm 9 $$\n\nCheck: both $9^2 = 81$ and $(-9)^2 = 81$.\n\n**Answer:** $x = \\pm 9$"
   },
   {
    "level": 1,
    "question": "Solve the equation $x^3 = 125$.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "A cubic equation of this type has ONE solution:\n\n$$ x = \\sqrt[3]{125} = 5 $$\n\n(No ± solution here: $(-5)^3 = -125 \\neq 125$.)\n\n**Answer:** $x = 5$"
   },
   {
    "level": 1,
    "question": "What is true about the equation $x^2 = -16$?",
    "choices": [
     "It has no real solutions",
     "$x = \\pm 4$",
     "$x = -4$",
     "$x = -8$"
    ],
    "correct": 0,
    "solution": "No square of a real number can be negative ($x \\cdot x$ with the same signs always gives plus). The square root of a negative number therefore has no real solutions.\n\n**Answer:** The equation has no real solutions."
   },
   {
    "level": 2,
    "question": "Solve the equation $5x^2 - 7 = 118$. Give the positive solution.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "solution": "First solve for $x^2$. Add 7 to both sides:\n\n$$ 5x^2 = 125 $$\n\nDivide by 5:\n\n$$ x^2 = 25 $$\n\n$$ x = \\pm\\sqrt{25} = \\pm 5 $$\n\nThe positive solution is $x = 5$.\n\n**Answer:** $x = 5$ (and $x = -5$)"
   },
   {
    "level": 2,
    "question": "A square plot of land has the area $625\\ \\mathrm{m^2}$. How long is the side of the plot?",
    "answer": {
     "value": 25,
     "unit": "m"
    },
    "solution": "Call the side $x$ m. The area of the square is $x^2$:\n\n$$ x^2 = 625 $$\n\n$$ x = \\pm\\sqrt{625} = \\pm 25 $$\n\nA side cannot be negative, so we disregard the negative solution.\n\n**Answer:** 25 m"
   },
   {
    "level": 3,
    "question": "The number of members in a club increased by the same percentage two years in a row. Over the two-year period, the number increased by 44 % in total.<br>a) Set up an equation for the annual change factor and find the annual increase as a percentage.<br>b) The equation in a) has two solutions. Explain why only one of them is a valid answer.<br>c) Suppose instead that the total increase of 44 % happened over three years, with the same percentage each year. Find the annual increase, and explain why the equation this time has only one solution.",
    "answer": {
     "value": 20,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 20,
      "unit": "%"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 12.9,
      "unit": "%",
      "tol": 0.02
     }
    ],
    "solution": "**a)** Call the annual change factor $x$. Each year the number of members is multiplied by $x$, so after two years the number has been multiplied by $x \\cdot x = x^2$. A total increase of 44 % means that the number has been multiplied by $1.44$:\n\n$$ x^2 = 1.44 $$\n\n$$ x = \\pm\\sqrt{1.44} = \\pm 1.2 $$\n\nThe change factor is $1.2$, which means an increase of 20 % per year. Check: $1.2 \\cdot 1.2 = 1.44$.\n\nNotice that the answer is not $44 / 2 = 22$ %. The second year's increase is calculated on a larger number than the first year's, so two increases of 20 % together give more than 40 %.\n\n**b)** The other solution is $x = -1.2$. A change factor tells you what the number should be multiplied by, and if you multiply a number of members by a negative number, you get a negative number of members. That does not exist. A change factor is always a positive number, so $x = -1.2$ is rejected.\n\n**c)** Now the number is multiplied by $x$ three times:\n\n$$ x^3 = 1.44 $$\n\n$$ x = \\sqrt[3]{1.44} \\approx 1.129 $$\n\nThe increase is about 13 % per year (not $44 / 3 \\approx 14.7$ %, for the same reason as in a). Check: $1.129^3 \\approx 1.44$.\n\nThe equation has only one solution because the exponent is odd. A negative number raised to the power 3 is negative, $(-1.129)^3 \\approx -1.44$, so no negative number can have the cube $1.44$. Here we therefore do not need to reject any solution: the equation itself gives only the answer that is reasonable.\n\n**Answer:** a) $x^2 = 1.44$ gives 20 % per year. b) The solution $x = -1.2$ is rejected, since a change factor must be positive. c) About 13 % per year. The equation $x^3 = 1.44$ has only one solution, since an odd power of a negative number is negative.\n\n**General conclusion:** a repeated percentage change gives an equation of the type $x^n = a$. An even exponent gives two solutions, where the negative one is rejected for reasons of reasonableness. An odd exponent gives exactly one solution."
   },
   {
    "level": 3,
    "question": "A floor with the area $5.4\\ \\mathrm{m^2}$ is completely covered by 120 identical rectangular tiles. Each tile is twice as long as it is wide.<br>a) Find the width and length of a tile.<br>b) Write a formula for the width $b$ of a tile when $n$ such tiles cover the area $A$.<br>c) Another room has a square floor that is completely covered by 32 such tiles. How long is the side of the floor? Also show how the tiles can be laid.",
    "answer": {
     "value": 15,
     "unit": "cm"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 15,
      "unit": "cm",
      "etikett": "width"
     },
     {
      "del": "a",
      "value": 30,
      "unit": "cm",
      "etikett": "length"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 120,
      "unit": "cm"
     }
    ],
    "solution": "**a)** The dimensions of the tile are two unknowns, but they are linked: if the width is $x$ cm, the length is $2x$ cm. Then one unknown is enough. The area of the tile is\n\n$$ x \\cdot 2x = 2x^2 $$\n\nThe area of the floor in $\\mathrm{cm^2}$ is $5.4 \\cdot 10\\,000 = 54\\,000$. The 120 tiles together cover the whole floor:\n\n$$ 120 \\cdot 2x^2 = 54\\,000 $$\n\n$$ 240x^2 = 54\\,000 $$\n\nDivide both sides by 240:\n\n$$ x^2 = 225 $$\n\n$$ x = \\pm\\sqrt{225} = \\pm 15 $$\n\nA width cannot be negative, so $x = 15$. The tile is 15 cm wide and $2 \\cdot 15 = 30$ cm long. Check: one tile has the area $15 \\cdot 30 = 450\\ \\mathrm{cm^2}$, and $120 \\cdot 450 = 54\\,000$.\n\n**b)** The same set-up with letters. One tile has the area $2b^2$, and $n$ tiles cover the area $A$:\n\n$$ n \\cdot 2b^2 = A $$\n\nDivide both sides by $2n$:\n\n$$ b^2 = \\frac{A}{2n} $$\n\n$$ b = \\sqrt{\\frac{A}{2n}} $$\n\nOnly the positive root is a width. Check against a): $b = \\sqrt{\\dfrac{54\\,000}{240}} = \\sqrt{225} = 15$.\n\n**c)** The area of the floor is $32 \\cdot 450 = 14\\,400\\ \\mathrm{cm^2}$. Call the side $s$ cm:\n\n$$ s^2 = 14\\,400 $$\n\n$$ s = \\sqrt{14\\,400} = 120 $$\n\nThe side is 120 cm. The tiles can be laid: $120 = 4 \\cdot 30$, so four tiles lengthwise fill a row, and $120 = 8 \\cdot 15$, so eight such rows fill the floor. That gives $4 \\cdot 8 = 32$ tiles, exactly as it should.\n\n**Answer:** a) 15 cm wide and 30 cm long. b) $b = \\sqrt{\\dfrac{A}{2n}}$. c) 120 cm, with 8 rows of 4 tiles.\n\n**General conclusion:** when two quantities have a known ratio, one unknown is enough. The area of something with the sides $x$ and $2x$ is then $2x^2$, and the equation is a simple quadratic equation."
   },
   {
    "level": 3,
    "question": "The equation $(x - 3)^2 = a$ contains a number $a$.<br>a) Solve the equation when $a = 25$.<br>b) For which values of $a$ does the equation have exactly one solution, and for which values does it have no solution? Justify.<br>c) For a certain value of $a$, $x = 10$ is one of the solutions. Find $a$ and the other solution. Then explain why the two solutions are always equally far from the number 3, however $a$ is chosen.",
    "answer": {
     "value": 8,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "values": [
       8,
       -2
      ],
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 49,
      "unit": "",
      "etikett": "$a =$"
     },
     {
      "del": "c",
      "value": -4,
      "unit": "",
      "etikett": "second solution $x =$"
     }
    ],
    "solution": "**a)** The bracket $(x - 3)$ is a number that squared gives 25. That number is 5 or $-5$:\n\n$$ x - 3 = \\pm\\sqrt{25} $$\n\n$$ x - 3 = \\pm 5 $$\n\n$$ x = 3 \\pm 5 $$\n\n$$ x_1 = 3 + 5 = 8 \\qquad x_2 = 3 - 5 = -2 $$\n\nCheck: $(8 - 3)^2 = 25$ and $(-2 - 3)^2 = (-5)^2 = 25$.\n\n**b)** In general, taking the square root gives $x - 3 = \\pm\\sqrt{a}$, that is, $x = 3 \\pm \\sqrt{a}$.\n\nIf $a > 0$, $\\sqrt{a}$ is a positive number, and $3 + \\sqrt{a}$ and $3 - \\sqrt{a}$ are two different numbers. Two solutions.\n\nIf $a = 0$, both solutions become $3 \\pm 0 = 3$. The square of a number is 0 only when the number itself is 0, so $x - 3 = 0$ is the only possibility. Exactly one solution, $x = 3$.\n\nIf $a < 0$, there is no solution: a square can never be negative, so $(x - 3)^2 = a$ cannot hold for any $x$.\n\n**c)** Substitute $x = 10$:\n\n$$ (10 - 3)^2 = a $$\n\n$$ a = 7^2 = 49 $$\n\nThe other solution is obtained from $x - 3 = -7$, that is, $x = -4$. Check: $(-4 - 3)^2 = (-7)^2 = 49$.\n\nThe solutions are $x = 3 + \\sqrt{a}$ and $x = 3 - \\sqrt{a}$. One lies $\\sqrt{a}$ steps to the right of 3 on the number line, the other $\\sqrt{a}$ steps to the left. The distance to 3 is therefore $\\sqrt{a}$ for both. This can be seen directly in the equation: $(x - 3)^2 = a$ means that the distance from $x$ to 3, squared, should be $a$, and a distance can be taken in two directions. In c) the distance is 7, and $10 - 7 = 3$ lies midway between $-4$ and 10.\n\n**Answer:** a) $x_1 = 8$ and $x_2 = -2$. b) Exactly one solution for $a = 0$, no solution for $a < 0$ (and two solutions for $a > 0$). c) $a = 49$, the other solution is $x = -4$. The solutions are $3 \\pm \\sqrt{a}$ and therefore lie $\\sqrt{a}$ from 3 in opposite directions.\n\n**General conclusion:** $(x - p)^2 = a$ has the solutions $x = p \\pm \\sqrt{a}$, symmetric about $p$. The number of solutions is decided entirely by the sign of $a$: two, one or none."
   },
   {
    "level": 3,
    "question": "Solve the equation $(x + 2)^2 = (x - 4)^2$ in two ways.<br>a) Expand both squares and solve the equation that results. What happens to the $x^2$ terms?<br>b) Take the square root of both sides and solve the equation using $\\pm$. Show that one of the signs leads to a contradiction.<br>c) Interpret the solution on the number line. Use the interpretation to write down the solution to $(x + 7)^2 = (x - 13)^2$ without calculating, and check by substitution.",
    "answer": {
     "value": 1,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "b",
      "value": 1,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "c",
      "value": 3,
      "unit": "",
      "etikett": "$x =$"
     }
    ],
    "solution": "**a)** Each term in the first bracket is multiplied by each term in the second:\n\n$$ (x + 2)^2 = (x + 2)(x + 2) $$\n\n$$ = x^2 + 2x + 2x + 4 = x^2 + 4x + 4 $$\n\n$$ (x - 4)^2 = (x - 4)(x - 4) $$\n\n$$ = x^2 - 4x - 4x + 16 = x^2 - 8x + 16 $$\n\nThe equation becomes\n\n$$ x^2 + 4x + 4 = x^2 - 8x + 16 $$\n\nSubtract $x^2$ from both sides:\n\n$$ 4x + 4 = -8x + 16 $$\n\nAdd $8x$ to both sides and subtract 4:\n\n$$ 12x = 12 $$\n\n$$ x = 1 $$\n\nThe $x^2$ terms cancel. The equation looks like a quadratic equation but is in fact a linear equation, and that is why it has only one solution.\n\n**b)** Two numbers that have the same square are either equal or opposites of each other. We take the square root of both sides:\n\n$$ x + 2 = \\pm(x - 4) $$\n\nWith the plus sign:\n\n$$ x + 2 = x - 4 $$\n\nSubtract $x$ from both sides:\n\n$$ 2 = -4 $$\n\nThat is a contradiction: $x + 2$ and $x - 4$ always differ by 6 and can never be equal. With the minus sign:\n\n$$ x + 2 = -(x - 4) $$\n\n$$ x + 2 = -x + 4 $$\n\nAdd $x$ to both sides and subtract 2:\n\n$$ 2x = 2 $$\n\n$$ x = 1 $$\n\nThe same answer as in a). Check: $(1 + 2)^2 = 9$ and $(1 - 4)^2 = (-3)^2 = 9$.\n\n**c)** The expression $(x + 2)^2$ can be written $(x - (-2))^2$ and is the square of the distance from $x$ to $-2$ on the number line. In the same way, $(x - 4)^2$ is the square of the distance from $x$ to 4. The equation says that $x$ is equally far from $-2$ as from 4, and only one number is: the midpoint\n\n$$ x = \\frac{-2 + 4}{2} = 1 $$\n\nThat explains why the equation has exactly one solution.\n\nFor $(x + 7)^2 = (x - 13)^2$, $x$ should be equally far from $-7$ as from 13. The midpoint is $\\dfrac{-7 + 13}{2} = 3$. Check: $(3 + 7)^2 = 100$ and $(3 - 13)^2 = (-10)^2 = 100$.\n\n**Answer:** a) $x = 1$; the $x^2$ terms cancel. b) $x = 1$; the plus sign gives $2 = -4$, which is impossible. c) The solution is the midpoint between $-2$ and 4. The equation $(x + 7)^2 = (x - 13)^2$ has the solution $x = 3$.\n\n**General conclusion:** $(x - p)^2 = (x - q)^2$ with $p \\neq q$ has exactly one solution, $x = \\dfrac{p + q}{2}$. Taking the square root of both sides always gives two cases to test, and one of them may turn out to be impossible."
   },
   {
    "level": 3,
    "question": "A cube has the volume $216\\ \\mathrm{cm^3}$.<br>a) Find the edge length of the cube.<br>b) Calculate the total surface area of the cube, that is, the combined area of the six faces. What do you notice?<br>c) Show that the cube in a) is the only cube where the numerical value of the volume in $\\mathrm{cm^3}$ equals the numerical value of the surface area in $\\mathrm{cm^2}$.",
    "answer": {
     "value": 6,
     "unit": "cm"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 6,
      "unit": "cm"
     },
     {
      "del": "b",
      "value": 216,
      "unit": "cm²"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** Call the edge length $x$ cm. The volume of the cube is $x \\cdot x \\cdot x = x^3$:\n\n$$ x^3 = 216 $$\n\n$$ x = \\sqrt[3]{216} = 6 $$\n\nCheck: $6 \\cdot 6 \\cdot 6 = 216$. The cubic equation has only this solution, and it is positive as an edge length should be.\n\n**b)** Each face is a square with the area $6^2 = 36\\ \\mathrm{cm^2}$, and the cube has six faces:\n\n$$ 6 \\cdot 36 = 216\\ \\mathrm{cm^2} $$\n\nThe numerical value is 216, the same as for the volume.\n\n**c)** Let the edge be $x$ cm. The volume is $x^3$ and the surface area $6x^2$. The numerical values should be equal:\n\n$$ x^3 = 6x^2 $$\n\nThis is not a simple cubic equation, because it has two variable terms. But $x$ is an edge length and therefore greater than 0, so $x^2 \\neq 0$ and we may divide both sides by $x^2$:\n\n$$ \\frac{x^3}{x^2} = \\frac{6x^2}{x^2} $$\n\n$$ x = 6 $$\n\nThere is therefore only one value of $x$, and it is the cube in a). If you want to know what the division hid, you can instead move everything to one side and take out a common factor: $x^3 - 6x^2 = 0$ gives $x^2(x - 6) = 0$, which is true only if $x = 0$ or $x = 6$. A cube with edge 0 does not exist, so $x = 6$ is the only cube.\n\n**Answer:** a) 6 cm. b) $216\\ \\mathrm{cm^2}$, the same numerical value as the volume. c) For $x > 0$ the equation $x^3 = 6x^2$ has only the solution $x = 6$.\n\n**General conclusion:** the ratio between volume and surface area is $\\dfrac{x^3}{6x^2} = \\dfrac{x}{6}$ and grows with the edge. A small cube therefore has relatively much surface, a large cube relatively little. And an equation with $x^2$ in every term may be divided by $x^2$ as soon as you know that $x \\neq 0$."
   },
   {
    "level": 3,
    "question": "The braking distance $s$ metres for a car braking on dry asphalt can be estimated with the model $s = 0.006v^2$, where $v$ is the speed in km/h when the braking starts.<br>a) At what speed is the braking distance 24 m?<br>b) The equation in a) also has a negative solution. Does it have any meaning in the model, unlike the negative solution in an area problem? Discuss.<br>c) At 80 km/h the braking distance is 38.4 m. Elin claims that the braking distance is halved if the speed is halved to 40 km/h. Find the speed that actually gives half the braking distance, and explain Elin's mistake.",
    "answer": {
     "value": 63.2,
     "unit": "km/h",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 63.2,
      "unit": "km/h",
      "tol": 0.02
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 56.6,
      "unit": "km/h",
      "tol": 0.02
     }
    ],
    "solution": "**a)** Substitute $s = 24$:\n\n$$ 0.006v^2 = 24 $$\n\nDivide both sides by $0.006$:\n\n$$ v^2 = 4\\,000 $$\n\n$$ v = \\pm\\sqrt{4\\,000} \\approx \\pm 63.2 $$\n\nThe car is driving forwards, so the speed is about 63 km/h. Check: $0.006 \\cdot 63.2^2 \\approx 24$.\n\n**b)** In an area problem the negative solution means a negative side, and that does not exist. Here it is different. A velocity with a minus sign can be interpreted as the car driving in the other direction, that is, reversing. The model contains $v^2$, and $(-63.2)^2$ equals $63.2^2$, so a car reversing at 63 km/h gets, according to the model, the same braking distance, 24 m. The negative solution therefore has a meaning: the model does not distinguish direction, only speed.\n\nWhether a negative solution should be rejected is therefore not decided by the equation, but by what the variable stands for.\n\n**c)** Half the braking distance is $38.4 / 2 = 19.2$ m:\n\n$$ 0.006v^2 = 19.2 $$\n\n$$ v^2 = 3\\,200 $$\n\n$$ v = \\sqrt{3\\,200} \\approx 56.6 $$\n\nHalf the braking distance is reached at about 57 km/h, not at 40 km/h. At 40 km/h the braking distance is\n\n$$ 0.006 \\cdot 40^2 = 0.006 \\cdot 1\\,600 = 9.6 $$\n\nmetres, that is, a quarter of 38.4 m. Elin's mistake is that she thinks of the braking distance as proportional to the speed. But $s$ is proportional to $v^2$: if $v$ is halved, $v^2$ is divided by 4. To halve $s$, $v^2$ should be halved, and then $v$ should be divided by $\\sqrt{2} \\approx 1.41$. Check: $80 / 1.41 \\approx 56.6$.\n\n**Answer:** a) About 63 km/h. b) Yes. The model contains $v^2$, so $v = -63.2$ describes a car reversing at 63 km/h, which gets the same braking distance. c) About 57 km/h. The braking distance is proportional to $v^2$, not to $v$, so half the speed gives a quarter of the braking distance.\n\n**General conclusion:** in a relationship of the type $s = k \\cdot v^2$, a certain factor on $v$ gives that factor squared on $s$. And a negative root is rejected only if the variable cannot be negative, which is a question of interpretation, not of calculation."
   },
   {
    "level": 3,
    "question": "A square has the area $50\\ \\mathrm{cm^2}$.<br>a) The side of the square is lengthened so that the area is doubled. Find the new side and the factor by which the side was lengthened.<br>b) Show that the factor in a) is the same whatever area the square has to begin with.<br>c) A cube is to have twice the volume. By what factor should the edge be lengthened? Show that it is not enough to lengthen the edge by the factor from a).",
    "answer": {
     "value": 10,
     "unit": "cm"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 10,
      "unit": "cm",
      "etikett": "new side"
     },
     {
      "del": "a",
      "value": 1.414,
      "unit": "",
      "etikett": "factor",
      "tol": 0.01
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 1.26,
      "unit": "",
      "etikett": "factor",
      "tol": 0.01
     }
    ],
    "solution": "**a)** Call the original side $x$ cm:\n\n$$ x^2 = 50 $$\n\n$$ x = \\sqrt{50} \\approx 7.07 $$\n\nThe new area is $2 \\cdot 50 = 100\\ \\mathrm{cm^2}$. Call the new side $y$ cm:\n\n$$ y^2 = 100 $$\n\n$$ y = \\sqrt{100} = 10 $$\n\nOnly the positive roots are sides. The factor is\n\n$$ \\frac{y}{x} = \\frac{10}{\\sqrt{50}} \\approx \\frac{10}{7.07} \\approx 1.41 $$\n\nThe side was therefore lengthened by about 41 %, not by 100 %, even though the area was doubled.\n\n**b)** Let the original side be $s$ and the new side $k \\cdot s$, where $k$ is the factor we are looking for. The new area should be twice the old one:\n\n$$ (ks)^2 = 2s^2 $$\n\n$$ k^2 s^2 = 2s^2 $$\n\nThe side $s$ is not 0, so we divide both sides by $s^2$:\n\n$$ k^2 = 2 $$\n\n$$ k = \\sqrt{2} \\approx 1.41 $$\n\nThe side $s$ disappeared from the equation, so the factor is $\\sqrt{2}$ however large the square is to begin with. In a), $\\dfrac{10}{\\sqrt{50}} = \\sqrt{\\dfrac{100}{50}} = \\sqrt{2}$, exactly as it should be.\n\n**c)** The same reasoning for the cube, with the edge $c$ and the new edge $k \\cdot c$:\n\n$$ (kc)^3 = 2c^3 $$\n\n$$ k^3 c^3 = 2c^3 $$\n\nDivide both sides by $c^3$:\n\n$$ k^3 = 2 $$\n\n$$ k = \\sqrt[3]{2} \\approx 1.26 $$\n\nThe edge should be lengthened by about 26 %. If you instead lengthen it by the factor $\\sqrt{2}$ from a), the volume becomes $(\\sqrt{2})^3 = \\sqrt{2} \\cdot \\sqrt{2} \\cdot \\sqrt{2} = 2\\sqrt{2} \\approx 2.83$ times as large, almost tripled. Doubling a cube with compass and straightedge, that is, constructing $\\sqrt[3]{2}$, is incidentally a problem the ancient Greeks worked on for centuries. In the 19th century it was proved to be impossible.\n\n**Answer:** a) The new side is 10 cm, and the side was lengthened by the factor $\\sqrt{2} \\approx 1.41$. b) The equation $(ks)^2 = 2s^2$ gives $k^2 = 2$ regardless of $s$. c) The factor $\\sqrt[3]{2} \\approx 1.26$; the factor $\\sqrt{2}$ instead gives $2\\sqrt{2} \\approx 2.83$ times the volume.\n\n**General conclusion:** the area grows with the square of the side and the volume with the cube, so doubling the area requires the factor $\\sqrt{2}$ on the side and doubling the volume the factor $\\sqrt[3]{2}$ on the edge. The size to begin with does not matter, since it cancels from the equation."
   }
  ]
 },
 "ma1c-2.10": {
  "kalla": "de7f712016",
  "data": [
   {
    "level": 1,
    "question": "Solve the equation $x^7 = 30$. Round to two decimal places.",
    "answer": {
     "value": 1.63,
     "unit": "",
     "tol": 0.01
    },
    "solution": "Using a root expression (or the laws of exponents):\n\n$$ x = \\sqrt[7]{30} = 30^{1/7} = 1.625\\ldots \\approx 1.63 $$\n\nNo ±: the exponent 7 is odd.\n\n**Answer:** $x \\approx 1.63$"
   },
   {
    "level": 1,
    "question": "How many solutions does the equation $x^{8} = 200$ have?",
    "choices": [
     "None",
     "Eight",
     "Two: one positive and one negative",
     "One"
    ],
    "correct": 2,
    "solution": "The exponent 8 is even and the right-hand side is positive, so there are two solutions:\n\n$$ x = \\pm\\sqrt[8]{200} $$\n\n**Answer:** Two solutions: one positive and one negative."
   },
   {
    "level": 1,
    "question": "How many solutions does the equation $x^{50} = -3$ have?",
    "choices": [
     "None",
     "One",
     "Two",
     "Fifty"
    ],
    "correct": 0,
    "solution": "An even power of a real number can never be negative ($x^{50} \\geq 0$ for all $x$). The equation therefore has no solutions.\n\n**Answer:** No solution."
   },
   {
    "level": 2,
    "question": "Solve the equation $5x^6 - 12 = 28$. Give the positive solution rounded to two decimal places.",
    "answer": {
     "value": 1.41,
     "unit": "",
     "tol": 0.01
    },
    "solution": "First solve for $x^6$. Add 12 and divide by 5:\n\n$$ 5x^6 = 40 \\qquad x^6 = 8 $$\n\nAn even exponent gives two solutions:\n\n$$ x = \\pm\\sqrt[6]{8} = \\pm 8^{1/6} = \\pm 1.414\\ldots \\approx \\pm 1.41 $$\n\n**Answer:** $x \\approx \\pm 1.41$ (positive solution $\\approx 1.41$)"
   },
   {
    "level": 2,
    "question": "Solve the equation $x^{1/3} = 5$.",
    "answer": {
     "value": 125,
     "unit": ""
    },
    "solution": "A fraction in the exponent: raise both sides to the power of the exponent's denominator 3:\n\n$$ \\left(x^{1/3}\\right)^3 = 5^3 $$\n\n$$ x = 125 $$\n\n**Answer:** $x = 125$"
   },
   {
    "level": 3,
    "question": "Savings of 20 000 kr grew at the same interest rate every year, and after 6 years they were worth 26 000 kr.<br>a) Set up a power equation for the change factor and find the interest rate.<br>b) Suppose instead that the capital grew to 26 000 kr in only 3 years. Find the interest rate, and explain why it is not twice as large as in a).<br>c) A capital of $K$ kr grows in $t$ years to $S$ kr. Derive a formula for the interest rate $p$ as a percentage, and check the formula against a).",
    "answer": {
     "value": 4.5,
     "unit": "%",
     "tol": 0.1
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4.47,
      "unit": "%",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 9.14,
      "unit": "%",
      "tol": 0.02
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** Call the change factor $x$. Each year the capital is multiplied by $x$, so after 6 years it has been multiplied by $x^6$:\n\n$$ 20\\,000 \\cdot x^6 = 26\\,000 $$\n\nDivide both sides by 20 000:\n\n$$ \\frac{20\\,000 \\cdot x^6}{\\boldsymbol{20\\,000}} = \\frac{26\\,000}{\\boldsymbol{20\\,000}} $$\n\n$$ x^6 = 1.3 $$\n\nThe exponent is even, so the equation has two solutions, but a change factor is always positive. We raise both sides to the power $\\dfrac{1}{6}$:\n\n$$ \\left(x^6\\right)^{\\boldsymbol{1/6}} = 1.3^{\\boldsymbol{1/6}} $$\n\n$$ x = 1.3^{1/6} \\approx 1.0447 $$\n\nThe change factor 1.0447 means an increase of about 4.5 % per year. Check: $20\\,000 \\cdot 1.0447^6 \\approx 26\\,000$.\n\n**Answer:** $x^6 = 1.3$ gives an interest rate of about 4.5 %.\n\n**b)** Now the capital is multiplied by $x$ three times:\n\n$$ x^3 = 1.3 $$\n\n$$ \\left(x^3\\right)^{\\boldsymbol{1/3}} = 1.3^{\\boldsymbol{1/3}} $$\n\n$$ x = 1.3^{1/3} \\approx 1.0914 $$\n\nThe interest rate is about 9.1 %. That is more than $2 \\cdot 4.47 = 8.94$ %. The interest is added each year to a capital that has already grown, so in 6 years compound interest has time to help more times than in 3 years. To achieve the whole increase in half the time therefore requires a little more than twice the interest rate.\n\n**Answer:** About 9.1 %. Compound interest means that the growth is not proportional to the time.\n\n**c)** The same set-up with letters:\n\n$$ K \\cdot x^t = S $$\n\nDivide both sides by $K$:\n\n$$ \\frac{K \\cdot x^t}{\\boldsymbol{K}} = \\frac{S}{\\boldsymbol{K}} $$\n\n$$ x^t = \\frac{S}{K} $$\n\nRaise both sides to the power $\\dfrac{1}{t}$:\n\n$$ \\left(x^t\\right)^{\\boldsymbol{1/t}} = \\left(\\frac{S}{K}\\right)^{\\boldsymbol{1/t}} $$\n\n$$ x = \\left(\\frac{S}{K}\\right)^{1/t} $$\n\nThe change factor is $x = 1 + \\dfrac{p}{100}$, so $\\dfrac{p}{100} = x - 1$ and\n\n$$ p = 100 \\cdot \\left( \\left(\\frac{S}{K}\\right)^{1/t} - 1 \\right) $$\n\nCheck against a): $100 \\cdot \\left(1.3^{1/6} - 1\\right) = 100 \\cdot 0.0447 \\approx 4.5$.\n\n**Answer:** $p = 100 \\cdot \\left( \\left(\\dfrac{S}{K}\\right)^{1/t} - 1 \\right)$, which gives 4.5 % for a).\n\n**General conclusion:** a repeated percentage change gives the power equation $x^t = \\dfrac{S}{K}$, and the interest rate is obtained from the $t$th root of the quotient. Half the time requires more than twice the interest rate, since compound interest grows faster than proportionally."
   },
   {
    "level": 3,
    "question": "Kepler's third law says that the square of a planet's orbital period is proportional to the cube of its mean distance from the sun. If the time is measured in years and the distance in astronomical units (1 AU is the earth's mean distance from the sun), the relationship becomes $T^2 = r^3$.<br>a) The mean distance of Mars is 1.52 AU. Find the orbital period of Mars.<br>b) An asteroid has the orbital period 5.0 years. How far from the sun is it?<br>c) Show that $r = T^{2/3}$, and use the formula to check the answer in b).",
    "answer": {
     "value": 1.87,
     "unit": "years",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.87,
      "unit": "years",
      "tol": 0.02
     },
     {
      "del": "b",
      "value": 2.92,
      "unit": "AU",
      "tol": 0.02
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** Substitute $r = 1.52$:\n\n$$ T^2 = 1.52^3 $$\n\n$$ T^2 = 3.512 $$\n\nAn even exponent gives two solutions, but a time is positive:\n\n$$ T = \\sqrt{3.512} \\approx 1.87 $$\n\nMars goes once round the sun in about 1.87 years. Reasonableness: Mars is further away than the earth and should have a longer year, and it does.\n\n**Answer:** About 1.87 years.\n\n**b)** Now $T = 5.0$ is known and $r$ is sought:\n\n$$ 5.0^2 = r^3 $$\n\n$$ 25 = r^3 $$\n\nAn odd exponent, one solution:\n\n$$ r = \\sqrt[3]{25} \\approx 2.92 $$\n\nThe asteroid is about 2.9 AU from the sun, in the asteroid belt between Mars and Jupiter.\n\n**Answer:** About 2.9 AU.\n\n**c)** We solve for $r$ in $T^2 = r^3$ by raising both sides to the power $\\dfrac{1}{3}$:\n\n$$ \\left(T^2\\right)^{\\boldsymbol{1/3}} = \\left(r^3\\right)^{\\boldsymbol{1/3}} $$\n\nThe law of exponents $(a^m)^n = a^{m \\cdot n}$ gives $\\left(T^2\\right)^{1/3} = T^{2/3}$ and $\\left(r^3\\right)^{1/3} = r^1$:\n\n$$ T^{2/3} = r $$\n\nCheck of b): $r = 5.0^{2/3} = \\left(\\sqrt[3]{5.0}\\right)^2 \\approx 1.71^2 \\approx 2.92$. In the same way we get $T = r^{3/2}$, and a) becomes $T = 1.52^{3/2} \\approx 1.87$.\n\n**Answer:** $r = T^{2/3}$, which gives $r = 5.0^{2/3} \\approx 2.9$ AU.\n\n**General conclusion:** a power equation can be solved in both directions. The fractional exponent $\\dfrac{2}{3}$ means \"square and take the cube root\", and it does not matter in which order it is done."
   },
   {
    "level": 3,
    "question": "The equations $x^{3/2} = 8$ and $x^{2/3} = 4$ look almost the same.<br>a) Solve both equations.<br>b) One has one solution and the other two. Explain why.<br>c) Amir solves $x^{3/2} = -8$ by squaring both sides and gets $x = 4$. Check the solution and explain what went wrong.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "values": [
       4
      ],
      "unit": "",
      "etikett": "$x^{3/2} = 8$ gives $x =$"
     },
     {
      "del": "a",
      "values": [
       8,
       -8
      ],
      "unit": "",
      "etikett": "$x^{2/3} = 4$ gives $x =$"
     },
     {
      "del": "b"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** In $x^{3/2} = 8$ we raise both sides to the power of the denominator 2, since $\\left(x^{3/2}\\right)^2 = x^3$:\n\n$$ \\left(x^{3/2}\\right)^{\\boldsymbol{2}} = 8^{\\boldsymbol{2}} $$\n\n$$ x^3 = 64 $$\n\n$$ x = \\sqrt[3]{64} = 4 $$\n\nCheck: $4^{3/2} = \\left(\\sqrt{4}\\right)^3 = 2^3 = 8$.\n\nIn $x^{2/3} = 4$ we raise both sides to the power 3, since $\\left(x^{2/3}\\right)^3 = x^2$:\n\n$$ \\left(x^{2/3}\\right)^{\\boldsymbol{3}} = 4^{\\boldsymbol{3}} $$\n\n$$ x^2 = 64 $$\n\n$$ x = \\pm\\sqrt{64} = \\pm 8 $$\n\nCheck: $8^{2/3} = \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4$ and $(-8)^{2/3} = \\left(\\sqrt[3]{-8}\\right)^2 = (-2)^2 = 4$.\n\n**Answer:** $x^{3/2} = 8$ has the solution $x = 4$. $x^{2/3} = 4$ has the solutions $x = 8$ and $x = -8$.\n\n**b)** It is the exponent that remains when the denominator has been removed that decides the number of solutions. In the first equation it becomes $x^3$, an odd exponent, so one solution. In the second it becomes $x^2$, an even exponent, so two solutions. You could say that the numerator of the fractional exponent decides the number of solutions: an odd numerator gives one, an even numerator gives two (when the right-hand side is positive).\n\n**Answer:** After the denominator has been removed, the numerator remains as the exponent. The numerator 3 is odd and gives one solution, the numerator 2 is even and gives two.\n\n**c)** Amir squares both sides:\n\n$$ \\left(x^{3/2}\\right)^{\\boldsymbol{2}} = (-8)^{\\boldsymbol{2}} $$\n\n$$ x^3 = 64 $$\n\n$$ x = 4 $$\n\nThe calculation is carried out correctly, but the check fails: $4^{3/2} = 8$, not $-8$. The mistake is that $x^{3/2} = \\left(\\sqrt{x}\\right)^3$ can never be negative: the square root is always positive or zero, and so is its cube. The equation $x^{3/2} = -8$ therefore has no solution. Squaring both sides hides this, since $8^2$ and $(-8)^2$ are the same number. Squaring can create a solution that did not exist in the original equation.\n\n**Answer:** $x = 4$ is not a solution, since $4^{3/2} = 8 \\neq -8$. The equation has no solution: $x^{3/2}$ can never be negative. The squaring created a false root.\n\n**General conclusion:** when both sides are raised to an even power, false roots can appear, since the sign disappears. Always check the solution in the original equation when you have done so."
   },
   {
    "level": 3,
    "question": "Lisa solves the equation $x^5 = 9x^3$ by dividing both sides by $x^3$. She gets $x^2 = 9$ and answers $x = \\pm 3$.<br>a) Check that $x = 3$ and $x = -3$ are solutions, and show that Lisa has nevertheless missed a solution.<br>b) Solve the equation completely by collecting everything on one side and taking out the common factor.<br>c) How many solutions do $x^7 = 4x^5$ and $x^6 = 4x^5$ have respectively? Justify without solving the equations completely.",
    "answer": {
     "value": 0,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "values": [
       0,
       3,
       -3
      ],
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** Substituting $x = 3$: $3^5 = 243$ and $9 \\cdot 3^3 = 9 \\cdot 27 = 243$. Substituting $x = -3$: $(-3)^5 = -243$ and $9 \\cdot (-3)^3 = 9 \\cdot (-27) = -243$. Both agree.\n\nBut try $x = 0$: $0^5 = 0$ and $9 \\cdot 0^3 = 0$. That agrees too. Lisa divided both sides by $x^3$, and that is only allowed when $x^3 \\neq 0$, that is, when $x \\neq 0$. Exactly that value disappeared from the solution.\n\n**Answer:** $x = 3$ and $x = -3$ are solutions, but Lisa missed $x = 0$.\n\n**b)** Subtract $9x^3$ from both sides, so that the RHS becomes 0:\n\n$$ x^5 \\mathbin{\\boldsymbol{-}}\\boldsymbol{9x^3} = 9x^3 \\mathbin{\\boldsymbol{-}}\\boldsymbol{9x^3} $$\n\n$$ x^5 - 9x^3 = 0 $$\n\nBoth terms contain $x^3$, which we take out:\n\n$$ x^3\\left(x^2 - 9\\right) = 0 $$\n\nA product is 0 only if one of the factors is 0:\n\n$$ x^3 = 0 \\qquad \\text{or} \\qquad x^2 - 9 = 0 $$\n\nThe first gives $x = 0$. In the second we add 9 to both sides:\n\n$$ x^2 - 9 \\mathbin{\\boldsymbol{+}}\\boldsymbol{9} = 0 \\mathbin{\\boldsymbol{+}}\\boldsymbol{9} $$\n\n$$ x^2 = 9 $$\n\n$$ x = \\pm\\sqrt{9} = \\pm 3 $$\n\n**Answer:** $x = 0$, $x = 3$ and $x = -3$.\n\n**c)** $x^7 = 4x^5$ becomes $x^5\\left(x^2 - 4\\right) = 0$. The factor $x^5$ gives $x = 0$, and $x^2 = 4$ gives $x = \\pm 2$. Three solutions.\n\n$x^6 = 4x^5$ becomes $x^5\\left(x - 4\\right) = 0$. The factor $x^5$ gives $x = 0$, and $x - 4 = 0$ gives $x = 4$. The second factor is now a linear equation with only one solution. Two solutions.\n\n**Answer:** $x^7 = 4x^5$ has three solutions (0, 2 and $-2$). $x^6 = 4x^5$ has two (0 and 4).\n\n**General conclusion:** an equation with the variable on both sides is solved by collecting everything on one side and taking out the common factor. Never divide away a factor containing the variable without first asking whether the factor can be 0. The number of solutions is decided by the equation that remains in the bracket."
   },
   {
    "level": 3,
    "question": "The equation $x^6 = a - 5$ contains a number $a$.<br>a) For which values of $a$ does the equation have two solutions, one solution and no solution respectively?<br>b) The equation $x^n = -32$ has the solution $x = -2$. Find the exponent $n$, and explain why $n$ must be an odd number.<br>c) The equation $x^n = 81$ has the solutions $x = 3$ and $x = -3$. Find $n$, and explain why $n$ must be an even number.",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 5,
      "unit": "",
      "etikett": "$n =$"
     },
     {
      "del": "c",
      "value": 4,
      "unit": "",
      "etikett": "$n =$"
     }
    ],
    "solution": "**a)** The exponent 6 is even, so the number of solutions is decided by the sign of the right-hand side $a - 5$.\n\nTwo solutions when $a - 5 > 0$, that is, $a > 5$. Then $x = \\pm\\sqrt[6]{a - 5}$.\n\nOne solution when $a - 5 = 0$, that is, $a = 5$. Then $x^6 = 0$, and the only number whose sixth power is 0 is $x = 0$.\n\nNo solution when $a - 5 < 0$, that is, $a < 5$. An even power is never negative.\n\n**Answer:** Two solutions for $a > 5$, one solution for $a = 5$, no solution for $a < 5$.\n\n**b)** Substitute $x = -2$:\n\n$$ (-2)^n = -32 $$\n\nWe try powers of $-2$: $(-2)^1 = -2$, $(-2)^2 = 4$, $(-2)^3 = -8$, $(-2)^4 = 16$, $(-2)^5 = -32$. So $n = 5$.\n\nThat $n$ must be odd can be seen from the sign. A negative number raised to an even power becomes positive, since the minus signs cancel in pairs. The right-hand side $-32$ is negative, so the number of factors $-2$ must be odd.\n\n**Answer:** $n = 5$. An even $n$ would have given a positive right-hand side.\n\n**c)** Substitute $x = 3$:\n\n$$ 3^n = 81 $$\n\n$3^1 = 3$, $3^2 = 9$, $3^3 = 27$, $3^4 = 81$, so $n = 4$. Check with the other solution: $(-3)^4 = 81$.\n\nThat $n$ must be even follows from $x = -3$ also being a solution: $(-3)^n$ is negative for odd $n$ and cannot then be 81. Only an even exponent gives the same value for $3$ and $-3$.\n\n**Answer:** $n = 4$. Only an even exponent gives the same power for $3$ and $-3$.\n\n**General conclusion:** the sign of the right-hand side and the number of solutions say something about the exponent. An odd exponent preserves the sign and gives exactly one solution; an even exponent makes the power positive and gives the solutions in pairs."
   },
   {
    "level": 3,
    "question": "The illuminance $E$ from a lamp decreases with the square of the distance $r$ according to $E = \\dfrac{k}{r^2}$, where $k$ is a constant that depends on the lamp. At a distance of 2.0 m from a certain lamp the illuminance is 50 lux.<br>a) Find the constant $k$.<br>b) At what distance is the illuminance 8.0 lux?<br>c) By what factor should the distance be changed for the illuminance to become a quarter as large? Show that the answer does not depend on $k$.",
    "answer": {
     "value": 5,
     "unit": "m"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 200,
      "unit": "lux · m²",
      "etikett": "$k =$"
     },
     {
      "del": "b",
      "value": 5,
      "unit": "m"
     },
     {
      "del": "c",
      "value": 2,
      "unit": "",
      "etikett": "factor"
     }
    ],
    "solution": "**a)** Substitute $E = 50$ and $r = 2.0$:\n\n$$ 50 = \\frac{k}{2.0^2} $$\n\n$$ 50 = \\frac{k}{4} $$\n\nMultiply both sides by the denominator 4:\n\n$$ 50 \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{4} = \\frac{k}{4} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{4} $$\n\n$$ k = 200 $$\n\n**Answer:** $k = 200$ (in the unit lux · m²).\n\n**b)** Now $E = 8.0$ and $r$ is sought. The distance is in the denominator, so $r \\neq 0$:\n\n$$ 8.0 = \\frac{200}{r^2} $$\n\nMultiply both sides by $r^2$:\n\n$$ 8.0 \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{r^2} = \\frac{200}{r^2} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{r^2} $$\n\n$$ 8.0 r^2 = 200 $$\n\nDivide both sides by 8.0:\n\n$$ \\frac{8.0 r^2}{\\boldsymbol{8.0}} = \\frac{200}{\\boldsymbol{8.0}} $$\n\n$$ r^2 = 25 $$\n\n$$ r = \\pm\\sqrt{25} = \\pm 5 $$\n\nA distance is positive, so $r = 5.0$ m. Check: $\\dfrac{200}{5.0^2} = \\dfrac{200}{25} = 8.0$.\n\n**Answer:** 5.0 m.\n\n**c)** Call the original distance $r_1$ and the new one $r_2$. The illuminance at the new distance should be a quarter of that at the old one:\n\n$$ \\frac{k}{r_2^2} = \\frac{1}{4} \\cdot \\frac{k}{r_1^2} $$\n\nDivide both sides by $k$, and the constant disappears:\n\n$$ \\frac{k}{r_2^2 \\boldsymbol{\\cdot k}} = \\frac{k}{4 r_1^2 \\boldsymbol{\\cdot k}} $$\n\n$$ \\frac{1}{r_2^2} = \\frac{1}{4 r_1^2} $$\n\nTwo fractions with the numerator 1 are equal exactly when the denominators are equal:\n\n$$ r_2^2 = 4 r_1^2 $$\n\n$$ r_2 = \\sqrt{4 r_1^2} = 2 r_1 $$\n\nThe distance should be doubled. In b) it agrees: from 2.0 m to 4.0 m the illuminance drops from 50 lux to $\\dfrac{200}{16} = 12.5$ lux, a quarter. The constant $k$ disappeared from the equation, so the factor 2 holds for all lamps.\n\n**Answer:** The distance should be doubled, regardless of $k$.\n\n**General conclusion:** in a relationship of the type $E = \\dfrac{k}{r^2}$, a certain factor on $r$ gives that factor squared, inversely, on $E$. Double the distance gives a quarter, triple a ninth. The constant cancels as soon as two situations are compared."
   },
   {
    "level": 3,
    "question": "Solve the equations. First state which values of $x$ are permitted at all.<br>a) $x^{3/2} \\cdot x^{1/2} = 16$<br>b) $\\dfrac{x^5}{x^2} = 27$<br>c) The equation in a) gives an even exponent after simplification, but still has only one solution. The equation in b) gives an odd exponent. Explain why both equations have exactly one solution, for completely different reasons.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "b",
      "value": 3,
      "unit": "",
      "etikett": "$x =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** The power $x^{1/2} = \\sqrt{x}$ exists only for $x \\geq 0$, so only such $x$ are permitted. The law of exponents $a^m \\cdot a^n = a^{m+n}$ gives\n\n$$ x^{3/2} \\cdot x^{1/2} = x^{3/2 + 1/2} = x^{4/2} = x^2 $$\n\n$$ x^2 = 16 $$\n\n$$ x = \\pm\\sqrt{16} = \\pm 4 $$\n\nBut $x = -4$ is not permitted, since $\\sqrt{-4}$ does not exist. Check with $x = 4$: $4^{3/2} \\cdot 4^{1/2} = 8 \\cdot 2 = 16$.\n\n**Answer:** Permitted values are $x \\geq 0$. The solution is $x = 4$.\n\n**b)** The denominator $x^2$ must not be 0, so $x \\neq 0$. The law of exponents $\\dfrac{a^m}{a^n} = a^{m-n}$ gives\n\n$$ \\frac{x^5}{x^2} = x^{5-2} = x^3 $$\n\n$$ x^3 = 27 $$\n\n$$ x = \\sqrt[3]{27} = 3 $$\n\nCheck: $\\dfrac{3^5}{3^2} = \\dfrac{243}{9} = 27$.\n\n**Answer:** Permitted values are $x \\neq 0$. The solution is $x = 3$.\n\n**c)** In a) the simplified equation $x^2 = 16$ gives two solutions, $4$ and $-4$. But the original equation contains $\\sqrt{x}$, which exists only for $x \\geq 0$. One of the solutions is therefore rejected for a reason that is not visible in the simplified equation: it does not belong to the permitted values.\n\nIn b) the simplified equation $x^3 = 27$ gives only one solution from the start, since the exponent is odd. Here no solution needs to be rejected; the condition $x \\neq 0$ plays no role since $x = 3$ is not 0.\n\n**Answer:** In a) there are two solutions to the simplified equation, but one of them lies outside the permitted values. In b) the simplified equation has only one solution, since the exponent is odd.\n\n**General conclusion:** simplify with the laws of exponents, but decide the permitted values from the original equation. Root expressions require $x \\geq 0$ and denominators require $x \\neq 0$, and a solution that breaks this should be rejected even if the calculation looks flawless."
   }
  ]
 },
 "ma1c-2.11": {
  "kalla": "98e92913b4",
  "data": [
   {
    "level": 1,
    "question": "Solve the inequality $4x + 3 < 19$.",
    "choices": [
     "$x < 5.5$",
     "$x = 4$",
     "$x < 4$",
     "$x > 4$"
    ],
    "correct": 2,
    "solution": "Solve it like an equation: subtract 3 and divide by 4 (a positive number, so the sign is kept):\n\n$$ 4x < 16 $$\n\n$$ x < 4 $$\n\n**Answer:** $x < 4$"
   },
   {
    "level": 1,
    "question": "What does the sign ≥ mean?",
    "choices": [
     "Greater than or equal to",
     "Less than or equal to",
     "Greater than",
     "Not equal to"
    ],
    "correct": 0,
    "solution": "≥ means \"greater than or equal to\". For example, $x \\geq -9$ means that $x$ may be −9 or any larger number.\n\n**Answer:** Greater than or equal to"
   },
   {
    "level": 1,
    "question": "When must the inequality sign be reversed?",
    "choices": [
     "Never: inequalities are solved exactly like equations",
     "When adding a negative number",
     "Every time you change operation",
     "When multiplying or dividing by a negative number"
    ],
    "correct": 3,
    "solution": "Inequalities are solved like equations, BUT the sign is reversed when multiplying or dividing by negative numbers. Check: $5 > 3$, but $5 \\cdot (-1) = -5$ is LESS than $3 \\cdot (-1) = -3$.\n\nAddition and subtraction (even of negative numbers) do not affect the sign.\n\n**Answer:** When multiplying or dividing by a negative number."
   },
   {
    "level": 2,
    "question": "Solve the inequality $5(4 - x) \\leq 45$. What is the answer?",
    "choices": [
     "$x \\leq -5$",
     "$x \\leq 5$",
     "$x \\geq 5$",
     "$x \\geq -5$"
    ],
    "correct": 3,
    "solution": "Expand the bracket:\n\n$$ 20 - 5x \\leq 45 $$\n\nSubtract 20 from both sides:\n\n$$ -5x \\leq 25 $$\n\nDivide by (−5): a negative number, so the inequality sign is REVERSED:\n\n$$ x \\geq -5 $$\n\n**Answer:** $x \\geq -5$"
   },
   {
    "level": 2,
    "question": "Solve the inequality $x^2 < 25$.",
    "choices": [
     "$-5 < x < 5$",
     "$x < 5$",
     "$x < \\pm 5$",
     "$x > 5$ and $x < -5$"
    ],
    "correct": 0,
    "solution": "Investigate the boundary case: $x^2 = 25$ gives $x = \\pm 5$. For the square to be LESS than 25, $x$ must lie between the boundaries:\n\n$$ -5 < x < 5 $$\n\nJust $x < 5$ is not enough. For example, $x = -7 < 5$ but $(-7)^2 = 49 > 25$.\n\n**Answer:** $-5 < x < 5$"
   },
   {
    "level": 3,
    "question": "Quadratic inequalities.<br>a) Solve the inequality $-3x^2 + 5 \\geq -22$.<br>b) Solve the inequality $2x^2 - 8 > 0$.<br>c) Elin solves $x^2 > 4$ by taking the square root of both sides and answers $x > 2$. Show with an example that the answer is incomplete, and explain why you investigate the boundary case instead.",
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
      "del": "c"
     }
    ],
    "solution": "**a)** We want $x^2$ on its own. Subtract 5 from both sides:\n\n$$ -3x^2 + 5 \\mathbin{\\boldsymbol{-}}\\boldsymbol{5} \\geq -22 \\mathbin{\\boldsymbol{-}}\\boldsymbol{5} $$\n\n$$ -3x^2 \\geq -27 $$\n\nDivide both sides by $-3$. A negative number, so the inequality sign is reversed:\n\n$$ \\frac{-3x^2}{\\boldsymbol{(-3)}} \\leq \\frac{-27}{\\boldsymbol{(-3)}} $$\n\n$$ x^2 \\leq 9 $$\n\nThe boundary case $x^2 = 9$ gives $x = \\pm 3$. We test $x = 0$ between the boundaries: $0 \\leq 9$, true. Outside, $x = 4$: $16 \\leq 9$, false. The solution is the numbers between the boundaries, and the boundaries are included since the sign is $\\leq$.\n\nCheck in the original inequality with $x = 3$: $-27 + 5 = -22 \\geq -22$, true.\n\n**Answer:** $-3 \\leq x \\leq 3$\n\n**b)** Add 8 to both sides:\n\n$$ 2x^2 - 8 \\mathbin{\\boldsymbol{+}}\\boldsymbol{8} > 0 \\mathbin{\\boldsymbol{+}}\\boldsymbol{8} $$\n\n$$ 2x^2 > 8 $$\n\nDivide both sides by 2:\n\n$$ \\frac{2x^2}{\\boldsymbol{2}} > \\frac{8}{\\boldsymbol{2}} $$\n\n$$ x^2 > 4 $$\n\nThe boundary case $x^2 = 4$ gives $x = \\pm 2$. Between the boundaries, $x = 0$: $0 > 4$, false. Outside, $x = 3$ and $x = -3$: $9 > 4$, true. The solution is the numbers outside the boundaries.\n\n**Answer:** $x < -2$ or $x > 2$\n\n**c)** The number $x = -5$ satisfies $x^2 > 4$, since $(-5)^2 = 25 > 4$. But $-5$ is not greater than 2, so $x > 2$ misses all the negative solutions. Elin's answer contains only half of the solution set.\n\nThe mistake is that \"taking the square root\" is not a permitted operation on an inequality in the same way as addition or division by a positive number. Two numbers can have the same square even though they lie on opposite sides of 0, and $x^2$ says nothing about the sign of $x$. That is why you instead solve the equation $x^2 = 4$ to find the boundaries, $\\pm 2$, and then test a number in each part of the number line.\n\n**Answer:** $x = -5$ gives $25 > 4$ but is not included in $x > 2$. The square says nothing about the sign, so you solve the boundary case $x^2 = 4$ and test each part of the number line.\n\n**General conclusion:** a quadratic inequality $x^2 < a$ has its solution between $-\\sqrt{a}$ and $\\sqrt{a}$, while $x^2 > a$ has its solution outside, in two rays. Taking the square root of an inequality loses one of the halves."
   },
   {
    "level": 3,
    "question": "The numbers $x$ and $y$ satisfy $x \\leq 5$ and $y \\geq -2$.<br>a) Find the largest value that the expression $3x - y^2$ can have.<br>b) Find the smallest value that the expression $x^2 + 2y$ can have.<br>c) Explain why the expression $3x - y^2$ has no smallest value.",
    "answer": {
     "value": 15,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 15,
      "unit": "",
      "etikett": "largest value"
     },
     {
      "del": "b",
      "value": -4,
      "unit": "",
      "etikett": "smallest value"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** The expression is a difference, $3x - y^2$. It becomes as large as possible when $3x$ is as large as possible and $y^2$ as small as possible.\n\nSince $x \\leq 5$, $3x \\leq 15$, with the largest value 15 for $x = 5$.\n\nThe square $y^2$ is never negative, so its smallest value is 0. It is reached for $y = 0$, which is permitted since $0 \\geq -2$. Here it is easy to be fooled by the condition $y \\geq -2$ and choose $y = -2$, but that gives $y^2 = 4$, which pulls the expression down.\n\n$$ 3x - y^2 \\leq 3 \\cdot 5 - 0 = 15 $$\n\nCheck: $x = 5$ and $y = 0$ give $15 - 0 = 15$. With $y = -2$ it would have been $15 - 4 = 11$.\n\n**Answer:** The largest value is 15, for $x = 5$ and $y = 0$.\n\n**b)** Now the expression is a sum, $x^2 + 2y$, and it is smallest when both terms are smallest.\n\nThe term $x^2$ is at least 0, for $x = 0$. That is permitted since $0 \\leq 5$. Notice that the condition $x \\leq 5$ does not help here: it says how large $x$ may be, not how small.\n\nThe term $2y$ is smallest when $y$ is smallest, that is, $y = -2$, which gives $2 \\cdot (-2) = -4$.\n\n$$ x^2 + 2y \\geq 0 + (-4) = -4 $$\n\nCheck: $x = 0$ and $y = -2$ give $0 - 4 = -4$.\n\n**Answer:** The smallest value is $-4$, for $x = 0$ and $y = -2$.\n\n**c)** The condition $x \\leq 5$ sets no lower limit for $x$. Choose $x = -100$: then $3x = -300$. Choose $x = -1\\,000$: then $3x = -3\\,000$. However small a value we suggest, we can always choose an even smaller $x$ and get a smaller value of $3x - y^2$. In addition, $y$ can be chosen as large as you like, so $-y^2$ can be made as negative as you like. The expression therefore has no smallest value.\n\n**Answer:** There is no lower limit for $x$ (and no upper limit for $y$), so $3x - y^2$ can be made smaller than any number.\n\n**General conclusion:** a largest or smallest value is found term by term, but each term should be examined against its own conditions. A square is at least 0, regardless of which negative numbers the condition allows, and a condition that only gives an upper limit gives no smallest value."
   },
   {
    "level": 3,
    "question": "A bus journey can be paid for in three ways. Single ticket: 20 kr per trip. Discount card: 150 kr per month and then 5 kr per trip. Monthly pass: 450 kr for unlimited travel.<br>a) For how many trips per month is the discount card cheaper than single tickets?<br>b) For how many trips per month is the monthly pass cheaper than the discount card?<br>c) State for each number of trips which option is cheapest, and explain why single tickets can never be cheapest when the monthly pass beats the discount card.",
    "answer": {
     "value": 10,
     "unit": "trips"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 10,
      "unit": "trips",
      "etikett": "more than"
     },
     {
      "del": "b",
      "value": 60,
      "unit": "trips",
      "etikett": "more than"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** Let $x$ be the number of trips per month. Single tickets cost $20x$ kr and the discount card $150 + 5x$ kr. The discount card is cheaper when\n\n$$ 150 + 5x < 20x $$\n\nSubtract $5x$ from both sides:\n\n$$ 150 + 5x \\mathbin{\\boldsymbol{-}}\\boldsymbol{5x} < 20x \\mathbin{\\boldsymbol{-}}\\boldsymbol{5x} $$\n\n$$ 150 < 15x $$\n\nDivide both sides by 15:\n\n$$ \\frac{150}{\\boldsymbol{15}} < \\frac{15x}{\\boldsymbol{15}} $$\n\n$$ 10 < x $$\n\nCheck: 10 trips cost 200 kr either way. 11 trips cost 220 kr with single tickets and 205 kr with the discount card.\n\n**Answer:** For more than 10 trips per month.\n\n**b)** The monthly pass is cheaper than the discount card when\n\n$$ 450 < 150 + 5x $$\n\nSubtract 150 from both sides:\n\n$$ 450 \\mathbin{\\boldsymbol{-}}\\boldsymbol{150} < 150 + 5x \\mathbin{\\boldsymbol{-}}\\boldsymbol{150} $$\n\n$$ 300 < 5x $$\n\nDivide both sides by 5:\n\n$$ \\frac{300}{\\boldsymbol{5}} < \\frac{5x}{\\boldsymbol{5}} $$\n\n$$ 60 < x $$\n\nCheck: 60 trips cost 450 kr with the discount card, the same as the monthly pass. 61 trips cost 455 kr with the discount card.\n\n**Answer:** For more than 60 trips per month.\n\n**c)** We combine a) and b). Up to 10 trips, single tickets are cheapest (at exactly 10 they cost the same as the discount card). From 11 to 60 trips, the discount card is cheapest (at exactly 60 it costs the same as the monthly pass). From 61 trips, the monthly pass is cheapest.\n\nSingle tickets cannot be cheapest when the monthly pass beats the discount card, since that requires $x > 60$, and for all $x > 10$ the discount card is already cheaper than single tickets. You can also see it directly: at 61 trips single tickets cost $20 \\cdot 61 = 1\\,220$ kr, almost three times the monthly pass.\n\n**Answer:** Single tickets for $x \\leq 10$, discount card for $10 \\leq x \\leq 60$, monthly pass for $x \\geq 60$ (at 10 and 60 trips two options cost the same). For $x > 60$, $x > 10$ already holds, so the discount card beats the single tickets there.\n\n**General conclusion:** with three options, they are compared in pairs with an inequality each, and the solutions divide the number line into intervals. The fixed fee pays off when the number is large, the low unit price when the number is small, and the break-even points are where two costs are equal."
   },
   {
    "level": 3,
    "question": "The inequality $ax + 3 > 9$ contains a number $a$.<br>a) Solve the inequality when $a = 2$ and when $a = -2$.<br>b) Solve the inequality in general, both for $a > 0$ and for $a < 0$.<br>c) What happens to the inequality if $a = 0$? Does it have any solutions?",
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
      "del": "c"
     }
    ],
    "solution": "**a)** With $a = 2$ the inequality becomes $2x + 3 > 9$. Subtract 3 from both sides:\n\n$$ 2x + 3 \\mathbin{\\boldsymbol{-}}\\boldsymbol{3} > 9 \\mathbin{\\boldsymbol{-}}\\boldsymbol{3} $$\n\n$$ 2x > 6 $$\n\nDivide both sides by 2:\n\n$$ \\frac{2x}{\\boldsymbol{2}} > \\frac{6}{\\boldsymbol{2}} $$\n\n$$ x > 3 $$\n\nWith $a = -2$ the inequality becomes $-2x + 3 > 9$. Subtract 3 from both sides:\n\n$$ -2x + 3 \\mathbin{\\boldsymbol{-}}\\boldsymbol{3} > 9 \\mathbin{\\boldsymbol{-}}\\boldsymbol{3} $$\n\n$$ -2x > 6 $$\n\nDivide both sides by $-2$. A negative number, so the sign is reversed:\n\n$$ \\frac{-2x}{\\boldsymbol{(-2)}} < \\frac{6}{\\boldsymbol{(-2)}} $$\n\n$$ x < -3 $$\n\nCheck: $x = 0$ gives $0 + 3 = 3$, which is not greater than 9, so 0 should not be part of either solution, and it is not. $x = -4$ gives $-2 \\cdot (-4) + 3 = 11 > 9$, true.\n\n**Answer:** For $a = 2$: $x > 3$. For $a = -2$: $x < -3$.\n\n**b)** Subtract 3 from both sides, which works the same way regardless of $a$:\n\n$$ ax + 3 \\mathbin{\\boldsymbol{-}}\\boldsymbol{3} > 9 \\mathbin{\\boldsymbol{-}}\\boldsymbol{3} $$\n\n$$ ax > 6 $$\n\nNow both sides are to be divided by $a$, and then the sign of $a$ matters.\n\nIf $a > 0$ the inequality sign is kept:\n\n$$ \\frac{ax}{\\boldsymbol{a}} > \\frac{6}{\\boldsymbol{a}} \\qquad\\text{gives}\\qquad x > \\frac{6}{a} $$\n\nIf $a < 0$ the inequality sign is reversed:\n\n$$ \\frac{ax}{\\boldsymbol{a}} < \\frac{6}{\\boldsymbol{a}} \\qquad\\text{gives}\\qquad x < \\frac{6}{a} $$\n\nCheck against a): $a = 2$ gives $x > 3$ and $a = -2$ gives $x < \\dfrac{6}{-2} = -3$, exactly as before.\n\n**Answer:** $x > \\dfrac{6}{a}$ if $a > 0$, and $x < \\dfrac{6}{a}$ if $a < 0$.\n\n**c)** With $a = 0$ the variable disappears: $0 \\cdot x + 3 > 9$ becomes $3 > 9$. That is false however $x$ is chosen, so the inequality has no solution. Nor can we divide by $a$ in b), since division by 0 is not defined. The case $a = 0$ must therefore be dealt with separately.\n\n(If the inequality had instead been $ax + 3 > 1$, $a = 0$ would give $3 > 1$, which is true for all $x$. Then all numbers are solutions.)\n\n**Answer:** The inequality becomes $3 > 9$, which is false. It has no solution.\n\n**General conclusion:** when an inequality is divided by a number whose sign you do not know, you must split into cases: a positive number keeps the sign, a negative one reverses it, and you cannot divide by 0 at all. It is the same rule as for $-2$, just written with a letter."
   },
   {
    "level": 3,
    "question": "In a triangle, each side must be shorter than the other two sides together, otherwise the sides do not fit together into a triangle. A triangle has the sides 5 cm, 8 cm and $x$ cm.<br>a) Set up the three inequalities that the sides must satisfy.<br>b) Solve the inequalities and state all possible values of $x$.<br>c) The triangle should also have a perimeter less than 24 cm. Which values of $x$ are then possible?",
    "answer": {
     "value": 3,
     "unit": "cm"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** The rule must hold for every side. The side $x$ must be shorter than $5 + 8$, the side 8 shorter than $5 + x$ and the side 5 shorter than $8 + x$:\n\n$$ x < 5 + 8 \\qquad 8 < 5 + x \\qquad 5 < 8 + x $$\n\n**Answer:** $x < 13$, $8 < 5 + x$ and $5 < 8 + x$.\n\n**b)** The first inequality is already solved: $x < 13$.\n\nThe second: subtract 5 from both sides.\n\n$$ 8 \\mathbin{\\boldsymbol{-}}\\boldsymbol{5} < 5 + x \\mathbin{\\boldsymbol{-}}\\boldsymbol{5} $$\n\n$$ 3 < x $$\n\nThe third: subtract 8 from both sides.\n\n$$ 5 \\mathbin{\\boldsymbol{-}}\\boldsymbol{8} < 8 + x \\mathbin{\\boldsymbol{-}}\\boldsymbol{8} $$\n\n$$ -3 < x $$\n\nAll three must hold at the same time. The condition $x > -3$ is weaker than $x > 3$ (a length is also always positive), so it is $x > 3$ and $x < 13$ that decide.\n\nCheck: with $x = 3$, the sides 3 and 5 together would be exactly 8, and then the triangle becomes flat, a line segment. With $x = 13$ in the same way. The boundaries are therefore not included.\n\n**Answer:** $3 < x < 13$\n\n**c)** The perimeter is $5 + 8 + x = 13 + x$, and it should be less than 24:\n\n$$ 13 + x < 24 $$\n\nSubtract 13 from both sides:\n\n$$ 13 + x \\mathbin{\\boldsymbol{-}}\\boldsymbol{13} < 24 \\mathbin{\\boldsymbol{-}}\\boldsymbol{13} $$\n\n$$ x < 11 $$\n\nTogether with b): $x$ should be greater than 3 and less than both 13 and 11, and the stricter condition is $x < 11$.\n\n**Answer:** $3 < x < 11$\n\n**General conclusion:** several conditions on the same number give several inequalities, and the solution is the numbers that satisfy all of them. At each boundary the strictest condition decides. That the side $x$ must lie between the difference and the sum of the other two sides, $8 - 5 < x < 8 + 5$, is called the triangle inequality."
   },
   {
    "level": 3,
    "question": "Kalle solves the inequality $\\dfrac{10}{x} > 2$ by multiplying both sides by $x$. He gets $10 > 2x$ and answers $x < 5$.<br>a) Show with an example that Kalle's answer contains numbers that do not solve the inequality.<br>b) Solve the inequality correctly by dealing with the cases $x > 0$ and $x < 0$ separately.<br>c) Solve the inequality $\\dfrac{10}{x} < 2$ in the same way.",
    "answer": {
     "value": 5,
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
      "del": "c"
     }
    ],
    "solution": "**a)** The number $x = -1$ satisfies $x < 5$. But $\\dfrac{10}{-1} = -10$, and $-10 > 2$ is false. Kalle's answer therefore contains numbers that are not solutions. The mistake is that he multiplies both sides by $x$ without knowing whether $x$ is positive or negative. If $x$ is negative the inequality sign should be reversed, and he did not do that. (In addition, $x = 0$ is forbidden, since $x$ is in the denominator.)\n\n**Answer:** $x = -1$ gives $-10 > 2$, which is false. Kalle multiplied by $x$ without knowing the sign of $x$.\n\n**b)** The denominator must not be 0, so $x \\neq 0$. We split into two cases.\n\n**Case 1: $x > 0$.** Then $x$ is positive and the sign is kept when we multiply both sides by $x$:\n\n$$ \\frac{10}{x} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{x} > 2 \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{x} $$\n\n$$ 10 > 2x $$\n\nDivide both sides by 2:\n\n$$ \\frac{10}{\\boldsymbol{2}} > \\frac{2x}{\\boldsymbol{2}} $$\n\n$$ 5 > x $$\n\nTogether with the condition of the case, $x > 0$: $0 < x < 5$.\n\n**Case 2: $x < 0$.** Now $x$ is negative and the sign is reversed by the multiplication:\n\n$$ \\frac{10}{x} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{x} < 2 \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{x} $$\n\n$$ 10 < 2x $$\n\n$$ 5 < x $$\n\nBut this case assumed $x < 0$, and no number is both less than 0 and greater than 5. Case 2 gives no solutions. This agrees with common sense: if $x$ is negative, $\\dfrac{10}{x}$ is negative and cannot be greater than 2.\n\nCheck: $x = 2$ gives $\\dfrac{10}{2} = 5 > 2$, true. $x = 10$ gives $1 > 2$, false.\n\n**Answer:** $0 < x < 5$\n\n**c)** The same division into cases.\n\n**Case 1: $x > 0$.** Multiply both sides by $x$, the sign is kept:\n\n$$ 10 < 2x $$\n\n$$ 5 < x $$\n\nTogether with $x > 0$: $x > 5$.\n\n**Case 2: $x < 0$.** Multiply both sides by $x$, the sign is reversed:\n\n$$ 10 > 2x $$\n\n$$ 5 > x $$\n\nTogether with $x < 0$: all $x < 0$ work (they are all less than 5). This agrees: for negative $x$, $\\dfrac{10}{x}$ is negative and therefore less than 2.\n\nThe solution is the two rays $x < 0$ and $x > 5$. Check: $x = -3$ gives $-\\dfrac{10}{3} < 2$, true. $x = 6$ gives $\\dfrac{10}{6} \\approx 1.67 < 2$, true. $x = 3$ gives $\\dfrac{10}{3} \\approx 3.33 < 2$, false.\n\n**Answer:** $x < 0$ or $x > 5$\n\n**General conclusion:** multiplying an inequality by the variable is only allowed if you know its sign. That is why you split into the cases $x > 0$ and $x < 0$, solve them separately and combine the solutions that agree with their case. And $x = 0$ is always forbidden when $x$ is in the denominator."
   },
   {
    "level": 3,
    "question": "Sara has written three tests and got 62, 71 and 58 points out of a possible 100 on each. One test remains.<br>a) What is the least number of points Sara must get on the fourth test for the mean of the four tests to be at least 65 points?<br>b) Can Sara reach a mean of 75 points? Justify with an inequality.<br>c) Suppose that after $n$ tests Sara has the mean $m$ points. Write an inequality for the least she must get on the next test for the mean to be at least $M$, and solve for the points.",
    "answer": {
     "value": 69,
     "unit": "points"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 69,
      "unit": "points"
     },
     {
      "del": "b"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**a)** The mean is the sum of the points divided by the number of tests. Call the points on the fourth test $x$:\n\n$$ \\frac{62 + 71 + 58 + x}{4} \\geq 65 $$\n\n$$ \\frac{191 + x}{4} \\geq 65 $$\n\nMultiply both sides by 4, a positive number:\n\n$$ \\frac{191 + x}{4} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{4} \\geq 65 \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{4} $$\n\n$$ 191 + x \\geq 260 $$\n\nSubtract 191 from both sides:\n\n$$ 191 + x \\mathbin{\\boldsymbol{-}}\\boldsymbol{191} \\geq 260 \\mathbin{\\boldsymbol{-}}\\boldsymbol{191} $$\n\n$$ x \\geq 69 $$\n\nCheck: $\\dfrac{191 + 69}{4} = \\dfrac{260}{4} = 65$. Notice that 69 is more than 65: the first three tests are on average below 65, so the fourth must pull the average up.\n\n**Answer:** At least 69 points.\n\n**b)** The same set-up with 75:\n\n$$ \\frac{191 + x}{4} \\geq 75 $$\n\n$$ \\frac{191 + x}{4} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{4} \\geq 75 \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{4} $$\n\n$$ 191 + x \\geq 300 $$\n\n$$ 191 + x \\mathbin{\\boldsymbol{-}}\\boldsymbol{191} \\geq 300 \\mathbin{\\boldsymbol{-}}\\boldsymbol{191} $$\n\n$$ x \\geq 109 $$\n\nBut the test gives at most 100 points, so $x \\leq 100$. No number is both at least 109 and at most 100. The inequality therefore has no solution that is possible in reality. Even with 100 points the mean is only $\\dfrac{291}{4} = 72.75$.\n\n**Answer:** No. It would require at least 109 points, and the test gives at most 100.\n\n**c)** After $n$ tests with the mean $m$, the total number of points is $n \\cdot m$. With the next test, $x$ points, the number of tests becomes $n + 1$ and the mean should be at least $M$:\n\n$$ \\frac{nm + x}{n + 1} \\geq M $$\n\nMultiply both sides by $n + 1$, which is positive:\n\n$$ \\frac{nm + x}{n + 1} \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{(n + 1)} \\geq M \\mathbin{\\boldsymbol{\\cdot}}\\boldsymbol{(n + 1)} $$\n\n$$ nm + x \\geq M(n + 1) $$\n\nSubtract $nm$ from both sides:\n\n$$ nm + x \\mathbin{\\boldsymbol{-}}\\boldsymbol{nm} \\geq M(n + 1) \\mathbin{\\boldsymbol{-}}\\boldsymbol{nm} $$\n\n$$ x \\geq M(n + 1) - nm $$\n\nCheck against a): $n = 3$, $m = \\dfrac{191}{3}$ and $M = 65$ give $x \\geq 65 \\cdot 4 - 191 = 69$.\n\nThe formula can be rewritten: $x \\geq M + n(M - m)$. She must therefore reach the target $M$ plus $n$ times what was missing on average on each earlier test. The more tests below the target, the more the last test must make up for.\n\n**Answer:** $\\dfrac{nm + x}{n + 1} \\geq M$, which gives $x \\geq M(n + 1) - nm$.\n\n**General conclusion:** a condition on a mean becomes an inequality with a fraction, which is solved by multiplying both sides by the positive number of tests. The answer should then be tested against what is possible in reality, such as a maximum score."
   }
  ]
 },
 "ma1c-2.12": {
  "kalla": "187ae97ae8",
  "data": [
   {
    "level": 1,
    "question": "Use the formula $v = \\dfrac{s}{t}$ to calculate the speed when $s = 240\\ \\mathrm{km}$ and $t = 3$ hours. Give your answer in km/h.",
    "answer": {
     "value": 80,
     "unit": "km/h"
    },
    "solution": "Substitute the values into the formula:\n\n$$ v = \\frac{s}{t} = \\frac{240}{3} = 80\\ \\mathrm{km/h} $$\n\n**Answer:** 80 km/h"
   },
   {
    "level": 1,
    "question": "Solve for $s$ in the formula $v = \\dfrac{s}{t}$.",
    "choices": [
     "$s = v + t$",
     "$s = \\dfrac{t}{v}$",
     "$s = \\dfrac{v}{t}$",
     "$s = v \\cdot t$"
    ],
    "correct": 3,
    "solution": "Multiply both sides by $t$ so that the denominator disappears:\n\n$$ v \\cdot t = \\frac{s}{t} \\cdot t \\qquad\\Rightarrow\\qquad s = v \\cdot t $$\n\n**Answer:** $s = v \\cdot t$"
   },
   {
    "level": 1,
    "question": "A taxi ride costs, according to the formula, $K = 45 + 12x$ kr, where $x$ is the number of kilometres. What does a ride of 8 km cost?",
    "answer": {
     "value": 141,
     "unit": "kr"
    },
    "solution": "Substitute $x = 8$ into the formula:\n\n$$ K = 45 + 12 \\cdot 8 = 45 + 96 = 141\\ \\mathrm{kr} $$\n\n**Answer:** 141 kr"
   },
   {
    "level": 2,
    "question": "The cost of a gym membership is $K = 3\\ 000 + 250x$ kr, where $x$ is the number of months. How many months will 9 500 kr last?",
    "answer": {
     "value": 26,
     "unit": "months"
    },
    "solution": "Substitute $K = 9\\ 500$ and solve for $x$:\n\n$$ 9\\ 500 = 3\\ 000 + 250x $$\n\nSubtract 3 000 from both sides:\n\n$$ 6\\ 500 = 250x $$\n\nDivide by 250:\n\n$$ x = \\frac{6\\ 500}{250} = 26 $$\n\n**Answer:** 26 months"
   },
   {
    "level": 2,
    "question": "Use $t = \\dfrac{s}{v}$ to calculate the travel time for 42 Swedish miles (1 Swedish mile = 10 km) at the average speed 84 km/h. Give your answer in hours.",
    "answer": {
     "value": 5,
     "unit": "h"
    },
    "solution": "The units must match. The speed is in km/h, so the distance is given in km:\n\n$$ \\left[\\begin{array}{l} s = 42\\ \\text{Swedish miles} = 420\\ \\mathrm{km} \\\\ v = 84\\ \\mathrm{km/h} \\end{array}\\right. $$\n\n$$ t = \\frac{s}{v} = \\frac{420}{84} = 5\\ \\text{hours} $$\n\nIf the conversion from Swedish miles to km is forgotten, the answer becomes ten times too small.\n\n**Answer:** 5 hours"
   },
   {
    "level": 3,
    "question": "Two car rental companies have different pricing models for one year: company A charges $H_\\mathrm{A} = 21\\ 000 + 2.5m$ kr and company B charges $H_\\mathrm{B} = 12\\ 000 + 4.0m$ kr, where $m$ is the number of kilometres. At what distance driven do the companies cost the same?",
    "answer": {
     "value": 6000,
     "unit": "km"
    },
    "solution": "**The key insight:** \"cost the same\" translates into an equation where the two formulas are set equal.\n\n$$ 21\\ 000 + 2.5m = 12\\ 000 + 4.0m $$\n\nSubtract $2.5m$ from both sides:\n\n$$ 21\\ 000 = 12\\ 000 + 1.5m $$\n\nSubtract 12 000:\n\n$$ 9\\ 000 = 1.5m $$\n\nDivide by 1.5:\n\n$$ m = 6\\ 000 $$\n\n**Interpret:** at 6 000 km (600 Swedish miles) both cost $21\\ 000 + 2.5 \\cdot 6\\ 000 = 36\\ 000$ kr. If you drive less, company B is cheaper (lower fixed cost); if you drive more, company A wins (lower cost per kilometre).\n\n**Answer:** 6 000 km (600 Swedish miles)\n\n**General conclusion:** the break-even point between two linear pricing models is found by setting the formulas equal, and the interpretation of which is cheapest on each side of the break-even point is often the whole point."
   }
  ]
 },
 "ma1c-2.13": {
  "kalla": "85ea9153d2",
  "data": [
   {
    "level": 1,
    "question": "The sequence 5, 8, 11, 14, … has the closed formula $a_n = 3n + 2$. Calculate $a_5$.",
    "answer": {
     "value": 17,
     "unit": ""
    },
    "solution": "Substitute $n = 5$ into the formula:\n\n$$ a_5 = 3 \\cdot 5 + 2 = 15 + 2 = 17 $$\n\n(Check: the sequence continues 5, 8, 11, 14, **17**, which agrees.)\n\n**Answer:** $a_5 = 17$"
   },
   {
    "level": 1,
    "question": "What is a formula that can directly calculate a term in a sequence called?",
    "choices": [
     "Open formula",
     "Position number",
     "Closed formula",
     "Recursive formula"
    ],
    "correct": 2,
    "solution": "A **closed formula**, for example $a_n = 4n - 1$, gives the term directly from the position number $n$, without having to work your way through all the earlier terms.\n\n**Answer:** Closed formula"
   },
   {
    "level": 1,
    "question": "In the sequence 6, 10, 14, 18, … each term increases by 4. Which term must then be part of the closed formula?",
    "choices": [
     "$6n$",
     "$4n$",
     "$4^n$",
     "$n + 4$"
    ],
    "correct": 1,
    "solution": "When the increase between the terms is constantly 4, the term $4n$ must be part of the formula. After that it is adjusted with a constant: $a_1 = 6$ but $4 \\cdot 1 = 4$, which is 2 too little, so the formula becomes $a_n = 4n + 2$.\n\n**Answer:** $4n$"
   },
   {
    "level": 2,
    "question": "Give a closed formula for the sequence 2, 9, 16, 23, …",
    "choices": [
     "$a_n = 7n - 2$",
     "$a_n = 2n + 7$",
     "$a_n = 7n - 5$",
     "$a_n = 7n + 2$"
    ],
    "correct": 2,
    "solution": "Each term increases by 7, so the term $7n$ should be included:\n\n$$ a_n = 7n $$\n\nTest $n = 1$: $7 \\cdot 1 = 7$, but $a_1 = 2$, which is 5 too much. Subtract 5:\n\n$$ a_n = 7n - 5 $$\n\nCheck: $a_2 = 14 - 5 = 9$ and $a_3 = 21 - 5 = 16$, which agrees!\n\n**Answer:** $a_n = 7n - 5$"
   },
   {
    "level": 2,
    "question": "A pattern of matchsticks has $a_n = 5n + 3$ matchsticks in figure $n$. In which figure are exactly 128 matchsticks used?",
    "answer": {
     "value": 25,
     "unit": ""
    },
    "solution": "Set $a_n = 128$ and solve the equation:\n\n$$ 5n + 3 = 128 $$\n\n$$ 5n = 125 $$\n\n$$ n = 25 $$\n\n**Answer:** Figure 25"
   },
   {
    "level": 3,
    "question": "A dot pattern has 7 dots in figure 2 and 13 dots in figure 5. The number of dots follows a formula of the type $a_n = kn + m$. How many dots are there in figure 100?",
    "answer": {
     "value": 203,
     "unit": ""
    },
    "solution": "**The key insight:** here the first figures are not given, so the increase per step must be worked out from two known terms.\n\nFrom figure 2 to figure 5 there are $5 - 2 = 3$ steps, and the number of dots increases by $13 - 7 = 6$. The increase per step is therefore\n\n$$ k = \\frac{6}{3} = 2 $$\n\nThe formula starts $a_n = 2n + m$. Substitute the known term $a_2 = 7$:\n\n$$ 2 \\cdot 2 + m = 7 \\qquad m = 3 $$\n\nThe formula is $a_n = 2n + 3$. (Check: $a_5 = 10 + 3 = 13$, which agrees!)\n\nFigure 100:\n\n$$ a_{100} = 2 \\cdot 100 + 3 = 203 $$\n\n**Answer:** 203 dots\n\n**General conclusion:** increase per step = (difference in value)/(difference in position number). It is the same idea as the slope of a straight line, which comes back in the chapter on straight lines."
   }
  ]
 },
 "ma1c-3.1": {
  "kalla": "07a65abff3",
  "data": [
   {
    "level": 1,
    "question": "Write 1 ‰ in decimal form.",
    "choices": [
     "0.01",
     "0.001",
     "0.1",
     "0.000 001"
    ],
    "correct": 1,
    "solution": "Per mille means thousandths:\n\n$$ 1\\ \\text{‰} = \\frac{1}{1\\ 000} = 0.001 $$\n\n0.01 is 1 % (a hundredth) and 0.000 001 is 1 ppm (a millionth).\n\n**Answer:** 0.001"
   },
   {
    "level": 1,
    "question": "How much is 4 ‰ of 25 000 kr?",
    "answer": {
     "value": 100,
     "unit": "kr"
    },
    "solution": "The part = the proportion · the whole, and the proportion is written in decimal form:\n\n$$ 4\\ \\text{‰} = \\frac{4}{1\\ 000} = 0.004 $$\n\n$$ \\text{part} = 0.004 \\cdot 25\\ 000 = 100\\ \\mathrm{kr} $$\n\n**Answer:** 100 kr"
   },
   {
    "level": 1,
    "question": "What percentage of 180 kr is 45 kr?",
    "answer": {
     "value": 25,
     "unit": "%"
    },
    "solution": "The proportion = the part/the whole:\n\n$$ \\text{proportion} = \\frac{45}{180} = 0.25 $$\n\nThe decimal form 0.25 corresponds to 25 %.\n\n**Answer:** 25 %"
   },
   {
    "level": 2,
    "question": "How many per mille of 24 kg is 84 g?",
    "answer": {
     "value": 3.5,
     "unit": "‰",
     "tol": 0.01
    },
    "solution": "The same unit for the part and the whole: $24\\ \\mathrm{kg} = 24\\ 000\\ \\mathrm{g}$.\n\n$$ \\text{proportion} = \\frac{84}{24\\ 000} = 0.0035 $$\n\nMultiply by 1 000 for per mille:\n\n$$ 0.0035 = 3.5\\ \\text{‰} $$\n\n**Answer:** 3.5 ‰"
   },
   {
    "level": 2,
    "question": "A drinking water contains 8 ppm fluoride. How much water is needed to take in 2.0 grams of fluoride? Give your answer in kg.",
    "answer": {
     "value": 250,
     "unit": "kg"
    },
    "solution": "The whole = the part/the proportion, with the proportion in decimal form:\n\n$$ 8\\ \\text{ppm} = \\frac{8}{1\\ 000\\ 000} = 0.000\\ 008 $$\n\n$$ \\text{whole} = \\frac{2.0}{0.000\\ 008} = 250\\ 000\\ \\text{grams} = 250\\ \\mathrm{kg} $$\n\n**Answer:** 250 kg (250 litres of water)"
   },
   {
    "level": 3,
    "question": "$15\\ \\%$ of the number $a$ is equal to $b$. Write $40\\ \\%$ of $6a$ expressed in terms of $b$. Simplify as far as possible.",
    "answer": {
     "value": 16,
     "unit": "· b"
    },
    "solution": "**The key insight:** we know neither of the numbers, but the relationship between them is enough. First express $a$ in terms of $b$, and then substitute.\n\nThat $15\\ \\%$ of $a$ is $b$ means\n\n$$ 0.15a = b $$\n\nDivide both sides by $0.15$:\n\n$$ \\frac{0.15a}{\\boldsymbol{0.15}} = \\frac{b}{\\boldsymbol{0.15}} $$\n\n$$ a = \\frac{b}{0.15} $$\n\n$40\\ \\%$ of $6a$ is\n\n$$ 0.40 \\cdot 6a = 2.4a $$\n\nWe substitute $a = \\dfrac{b}{0.15}$:\n\n$$ 2.4a = 2.4 \\cdot \\frac{b}{0.15} = \\frac{2.4}{0.15} \\cdot b = 16b $$\n\nCheck with made-up numbers: choose $a = 100$. Then $b = 15$, and $40\\ \\%$ of $600$ is $240$. Indeed, $16 \\cdot 15 = 240$.\n\n**Answer:** $16b$\n\n**General conclusion:** when a problem contains only letters, you can always test your answer with a made-up number. If the check works for one choice of $a$, it is a strong sign that the algebra is right."
   },
   {
    "level": 3,
    "question": "Solve the problem without a calculator. How many of the numbers below are greater than $2.5$ per mille?\n\n$$ \\frac{1}{399} \\qquad 0.00251 \\qquad \\frac{2}{801} \\qquad \\frac{1}{401} \\qquad 2.6 \\cdot 10^{-3} \\qquad \\frac{3}{1\\,250} $$",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "**The key insight:** write the limit in several forms, so that each number can be compared with the form that suits it best.\n\n$$ 2.5\\ \\text{‰} = \\frac{2.5}{1\\,000} = 0.0025 = \\frac{1}{400} $$\n\nNow we compare the numbers one at a time.\n\n- $\\dfrac{1}{399}$: the same numerator as $\\dfrac{1}{400}$ but a smaller denominator. You divide 1 into fewer parts, so each part becomes larger. **Greater.**\n- $0.00251$ is compared with $0.00250$. **Greater.**\n- $\\dfrac{2}{801}$: the limit can be written $\\dfrac{2}{800}$. The same numerator, a larger denominator. **Smaller.**\n- $\\dfrac{1}{401}$: a larger denominator than $\\dfrac{1}{400}$. **Smaller.**\n- $2.6 \\cdot 10^{-3} = 0.0026$, which is greater than $0.0025$. **Greater.**\n- $\\dfrac{3}{1\\,250}$: expand by 8, so that the denominator becomes $10\\,000$: $\\dfrac{24}{10\\,000} = 0.0024$. **Smaller.**\n\nThree of the numbers are greater than $2.5\\ \\text{‰}$: $\\dfrac{1}{399}$, $0.00251$ and $2.6 \\cdot 10^{-3}$.\n\n**Answer:** 3 of them\n\n**General conclusion:** a fraction with the same numerator becomes smaller when the denominator grows. By writing the limit as a fraction with a suitable numerator ($\\dfrac{1}{400}$ and $\\dfrac{2}{800}$), the comparison becomes almost immediate."
   },
   {
    "level": 3,
    "question": "Sterling silver has a silver content of $925$ per mille. A silversmith has silver with a content of $800$ per mille and wants to melt it together with sterling silver so that she gets $50$ g of alloy with a content of $875$ per mille. How many grams of sterling silver should she use?",
    "answer": {
     "value": 30,
     "unit": "g"
    },
    "solution": "**The key insight:** the amount of pure silver does not change when the metals are melted together. The silver in the two parts should together become the silver in the finished alloy.\n\nLet $x$ grams be the sterling silver. Then the rest, $(50 - x)$ grams, is the other silver.\n\nThe amount of pure silver in each part is the proportion times the whole:\n\n- in the sterling silver: $0.925x$ grams\n- in the other silver: $0.800(50 - x)$ grams\n- in the finished alloy: $0.875 \\cdot 50 = 43.75$ grams\n\nThe silver must add up exactly, so\n\n$$ 0.925x + 0.800(50 - x) = 43.75 $$\n\nExpand the bracket:\n\n$$ 0.925x + 40 - 0.8x = 43.75 $$\n\n$$ 0.125x + 40 = 43.75 $$\n\nSubtract 40 from both sides:\n\n$$ 0.125x + 40 \\mathbin{\\boldsymbol{-}}\\boldsymbol{40} = 43.75 \\mathbin{\\boldsymbol{-}}\\boldsymbol{40} $$\n\n$$ 0.125x = 3.75 $$\n\nDivide both sides by $0.125$:\n\n$$ \\frac{0.125x}{\\boldsymbol{0.125}} = \\frac{3.75}{\\boldsymbol{0.125}} $$\n\n$$ x = 30 $$\n\nCheck: $0.925 \\cdot 30 + 0.800 \\cdot 20 = 27.75 + 16 = 43.75$ grams of silver out of 50 grams, and $\\dfrac{43.75}{50} = 0.875 = 875\\ \\text{‰}$.\n\nReasonable? $875$ is closer to $925$ than to $800$, so more than half should be sterling silver.\n\n**Answer:** 30 g of sterling silver (and 20 g of the other silver)\n\n**General conclusion:** with mixtures you calculate with what is conserved, here the amount of pure silver. The proportions must never be added directly."
   },
   {
    "level": 3,
    "question": "In a class, $60\\ \\%$ of the students are girls. $25\\ \\%$ of the girls and $40\\ \\%$ of the boys play football.<br>a) What percentage of the class plays football?<br>b) What percentage of those who play football are girls? Round to one decimal place.",
    "answer": {
     "value": 48.4,
     "unit": "%",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 31,
      "unit": "%"
     },
     {
      "del": "b",
      "value": 48.4,
      "unit": "%",
      "tol": 0.005
     }
    ],
    "solution": "**The key insight:** each percentage is a proportion of its own whole. Write out what the whole is before you calculate: the girls, the boys, the class or the football players.\n\n**a)** The girls are $60\\ \\%$ of the class, so the boys are $40\\ \\%$.\n\nGirls who play football, as a proportion of the class: $25\\ \\%$ of $60\\ \\%$:\n\n$$ 0.25 \\cdot 0.60 = 0.15 $$\n\nBoys who play football, as a proportion of the class: $40\\ \\%$ of $40\\ \\%$:\n\n$$ 0.40 \\cdot 0.40 = 0.16 $$\n\nTogether:\n\n$$ 0.15 + 0.16 = 0.31 = 31\\ \\% $$\n\nNotice that the answer is NOT the mean of $25\\ \\%$ and $40\\ \\%$. There are more girls, so their lower proportion carries more weight.\n\n**Answer:** 31 %\n\n**b)** Now the football players are the whole, $31\\ \\%$ of the class, and the girls among them the part, $15\\ \\%$ of the class:\n\n$$ \\text{proportion} = \\frac{\\text{part}}{\\text{whole}} = \\frac{0.15}{0.31} = 0.4838\\ldots \\approx 48.4\\ \\% $$\n\nCheck with a class of 100 students: 60 girls, of whom 15 play football, and 40 boys, of whom 16 play. Of the 31 football players, 15 are girls, and $\\dfrac{15}{31} \\approx 0.484$.\n\n**Answer:** About 48.4 %\n\n**General conclusion:** \"the proportion of girls who play football\" ($25\\ \\%$) and \"the proportion of football players who are girls\" ($48.4\\ \\%$) sound alike but have different wholes. Imagining 100 students makes it easy to keep them apart."
   },
   {
    "level": 3,
    "question": "The limit value for lead in drinking water is $10$ micrograms per litre. A sample from a well contains $0.03$ ppm lead, calculated as a mass fraction. One litre of water weighs $1$ kg. How many times higher than the limit value is the lead content in the well?",
    "answer": {
     "value": 3,
     "unit": "times"
    },
    "solution": "**The key insight:** the contents are given in different forms, a proportion (ppm) and a mass per volume (micrograms per litre). They must be converted to the same form before they can be compared.\n\n$0.03$ ppm means that the part is $0.03$ millionths of the whole:\n\n$$ 0.03\\ \\text{ppm} = \\frac{0.03}{1\\,000\\,000} = 0.000\\,000\\,03 $$\n\nOne litre of water weighs 1 kg, and $1\\ \\mathrm{kg} = 1\\,000\\,000\\,000$ micrograms (1 kg is 1 000 g, and 1 g is 1 000 000 micrograms). The part is the proportion times the whole:\n\n$$ \\text{part} = 0.000\\,000\\,03 \\cdot 1\\,000\\,000\\,000 = 30 $$\n\nOne litre of well water therefore contains 30 micrograms of lead. Compare with the limit value:\n\n$$ \\frac{30}{10} = 3 $$\n\n**Answer:** 3 times higher than the limit value\n\n**General conclusion:** 1 ppm of a mass of 1 kg is 1 mg, since a milligram is a millionth of a kilogram. For water, 1 ppm therefore means the same as 1 mg per litre, a relationship that is used a lot in chemistry and environmental analysis."
   },
   {
    "level": 3,
    "question": "Fresh mushrooms contain $90\\ \\%$ water by mass. After drying, the mushrooms contain $20\\ \\%$ water. How much do the dried mushrooms weigh if you started with $5.0$ kg of fresh mushrooms? Give your answer in grams.",
    "answer": {
     "value": 625,
     "unit": "g"
    },
    "solution": "**The key insight:** the water disappears during drying, but everything else in the mushroom, the dry matter, remains. Calculate with what does NOT change.\n\nIn the fresh mushrooms, $100\\ \\% - 90\\ \\% = 10\\ \\%$ is dry matter:\n\n$$ \\text{part} = 0.10 \\cdot 5.0 = 0.5\\ \\mathrm{kg} $$\n\nIn the dried mushrooms there is still $0.5$ kg of dry matter, but now it makes up $100\\ \\% - 20\\ \\% = 80\\ \\%$ of the mass. The part and the proportion are known, and the whole is sought:\n\n$$ \\text{whole} = \\frac{\\text{part}}{\\text{proportion}} = \\frac{0.5}{0.80} = 0.625\\ \\mathrm{kg} = 625\\ \\mathrm{g} $$\n\nCheck: in 625 g of dried mushroom there are $0.20 \\cdot 625 = 125$ g of water and $500$ g of dry matter.\n\nReasonable? The mushrooms have lost $4.375$ kg of their $4.5$ kg of water. Almost all the water is gone, and then the weight should drop sharply.\n\n**Answer:** 625 g\n\n**General conclusion:** the common miscalculation is \"the water content decreases by 70 percentage points, so the weight decreases by $70\\ \\%$\". But the percentages are calculated on different wholes before and after drying. Look instead for the quantity that is the same before and after."
   },
   {
    "level": 3,
    "question": "At a school, $15\\ \\%$ of the students cycle to school. The following year, the number of students who cycle has increased by $20\\ \\%$, while the number of students at the school has decreased by $20\\ \\%$. What percentage of the students cycle now?",
    "answer": {
     "value": 22.5,
     "unit": "%"
    },
    "solution": "**The key insight:** the proportion is a quotient, $\\dfrac{\\text{part}}{\\text{whole}}$. Both the numerator and the denominator change, so each change factor should act on its own part of the quotient.\n\nLet the school have $N$ students at the start. Then $0.15N$ students cycle.\n\nThe following year:\n\n- the number of cyclists is $1.20 \\cdot 0.15N = 0.18N$\n- the number of students is $0.80N$\n\nThe new proportion:\n\n$$ \\text{proportion} = \\frac{0.18N}{0.80N} = \\frac{0.18}{0.80} = 0.225 = 22.5\\ \\% $$\n\n$N$ cancels, so the answer holds however large the school is.\n\nCheck with 1 000 students: 150 cyclists become 180, and the school shrinks to 800 students. $\\dfrac{180}{800} = 0.225$.\n\n**Answer:** 22.5 %\n\n**General conclusion:** the proportion has changed by the factor $\\dfrac{1.20}{0.80} = 1.5$, that is, increased by $50\\ \\%$. The common miscalculation, \"$+20\\ \\%$ and $+20\\ \\%$ makes $+40\\ \\%$\", misses that a decrease in the denominator gives a DIVISION by $0.80$."
   }
  ]
 },
 "ma1c-3.2": {
  "kalla": "171a6f58b6",
  "data": [
   {
    "level": 1,
    "question": "Which change factor corresponds to an increase of 35 %?",
    "choices": [
     "1.035",
     "0.35",
     "0.65",
     "1.35"
    ],
    "correct": 3,
    "solution": "Add the change to 100 % and convert to decimal form:\n\n$$ 100\\ \\% + 35\\ \\% = 135\\ \\% = 1.35 $$\n\n0.35 is only the change itself and 0.65 corresponds to a DECREASE of 35 %.\n\n**Answer:** 1.35"
   },
   {
    "level": 1,
    "question": "Which change factor corresponds to a decrease of 12 %?",
    "choices": [
     "1.12",
     "0.98",
     "0.12",
     "0.88"
    ],
    "correct": 3,
    "solution": "Subtract the change from 100 %:\n\n$$ 100\\ \\% - 12\\ \\% = 88\\ \\% = 0.88 $$\n\n**Answer:** 0.88"
   },
   {
    "level": 1,
    "question": "A jacket costs 1 200 kr and is reduced by 25 %. Calculate the new price using a change factor.",
    "answer": {
     "value": 900,
     "unit": "kr"
    },
    "solution": "The change factor is $100\\ \\% - 25\\ \\% = 75\\ \\% = 0.75$:\n\n$$ \\text{new value} = 0.75 \\cdot 1\\ 200 = 900\\ \\mathrm{kr} $$\n\n**Answer:** 900 kr"
   },
   {
    "level": 2,
    "question": "A rent is raised from 6 500 kr to 6 891 kr. By what percentage was the rent raised?",
    "answer": {
     "value": 6,
     "unit": "%"
    },
    "solution": "Find the change factor:\n\n$$ \\text{change factor} = \\frac{\\text{new value}}{\\text{old value}} = \\frac{6\\ 891}{6\\ 500} = 1.06 = 106\\ \\% $$\n\nCompared with 100 %, the rent has increased by 6 %.\n\n**Answer:** 6 %"
   },
   {
    "level": 2,
    "question": "Elsa earns 32 000 kr/month and Karim earns 25 600 kr/month. By what percentage MORE does Elsa earn than Karim?",
    "answer": {
     "value": 25,
     "unit": "%"
    },
    "solution": "We compare WITH Karim, so his salary is the \"old value\":\n\n$$ \\text{change factor} = \\frac{32\\ 000}{25\\ 600} = 1.25 = 125\\ \\% $$\n\nElsa therefore earns 25 % more than Karim.\n\n(Note that Karim earns $\\dfrac{25\\ 600}{32\\ 000} = 0.80$, that is, 20 % LESS than Elsa. The percentage depends on what you compare with.)\n\n**Answer:** 25 %"
   },
   {
    "level": 2,
    "question": "After a price increase of 15 %, a bicycle costs 5 520 kr. What did the bicycle cost before the increase?",
    "answer": {
     "value": 4800,
     "unit": "kr"
    },
    "solution": "The change factor is $100\\ \\% + 15\\ \\% = 115\\ \\% = 1.15$.\n\nWe know the new value and the change factor and are looking for the old value:\n\n$$ \\text{old value} = \\frac{\\text{new value}}{\\text{change factor}} = \\frac{5\\ 520}{1.15} = 4\\ 800\\ \\mathrm{kr} $$\n\nCheck: $1.15 \\cdot 4\\ 800 = 5\\ 520$. It agrees.\n\nNotice that it is wrong to subtract 15 % of 5 520 kr. The increase was calculated on the old price, not on the new one.\n\n**Answer:** 4 800 kr"
   },
   {
    "level": 3,
    "question": "The number $x$ lies somewhere between the numbers $24$ and $36$. The number $x$ is $p\\ \\%$ larger than $24$ and $p\\ \\%$ smaller than $36$. Find $x$.",
    "answer": {
     "value": 28.8,
     "unit": ""
    },
    "solution": "**The key insight:** the same percentage gives two change factors, $1 + q$ upwards from 24 and $1 - q$ downwards from 36, where $q$ is $p\\ \\%$ in decimal form. Both routes should land on the same number $x$, and that gives an equation.\n\nFrom 24 increased by $p\\ \\%$:\n\n$$ x = 24(1 + q) $$\n\nFrom 36 decreased by $p\\ \\%$:\n\n$$ x = 36(1 - q) $$\n\nBoth expressions are $x$, so\n\n$$ 24(1 + q) = 36(1 - q) $$\n\nExpand the brackets:\n\n$$ 24 + 24q = 36 - 36q $$\n\nAdd $36q$ to both sides:\n\n$$ 24 + 24q \\mathbin{\\boldsymbol{+}}\\boldsymbol{36q} = 36 - 36q \\mathbin{\\boldsymbol{+}}\\boldsymbol{36q} $$\n\n$$ 24 + 60q = 36 $$\n\nSubtract 24 from both sides:\n\n$$ 24 + 60q \\mathbin{\\boldsymbol{-}}\\boldsymbol{24} = 36 \\mathbin{\\boldsymbol{-}}\\boldsymbol{24} $$\n\n$$ 60q = 12 $$\n\nDivide both sides by 60:\n\n$$ \\frac{60q}{\\boldsymbol{60}} = \\frac{12}{\\boldsymbol{60}} $$\n\n$$ q = 0.2 $$\n\nThe percentage is therefore $20\\ \\%$, and\n\n$$ x = 24 \\cdot 1.2 = 28.8 $$\n\nCheck: $36 \\cdot 0.8 = 28.8$. Both routes give the same number.\n\nNotice that $x$ is NOT the midpoint 30. The increase is calculated on the smaller number 24 and the decrease on the larger number 36, so the same percentage gives steps of different lengths.\n\n**Answer:** $x = 28.8$"
   },
   {
    "level": 3,
    "question": "Lisa has $x$ kr. Moa has $25\\ \\%$ more money than Lisa and Nils has $25\\ \\%$ less than Lisa. By what percentage more money does Moa have than Nils? Round to one decimal place.",
    "answer": {
     "value": 66.7,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "**The key insight:** Lisa's amount is unknown, but it is not needed. Express both Moa's and Nils's amounts in terms of $x$ and compare them with each other. The answer is NOT $50\\ \\%$.\n\nMoa has $25\\ \\%$ more than Lisa: the change factor is $1.25$, so Moa has $1.25x$ kr.\n\nNils has $25\\ \\%$ less than Lisa: the change factor is $0.75$, so Nils has $0.75x$ kr.\n\nWe compare Moa WITH Nils, so Nils's amount is the old value:\n\n$$ \\text{change factor} = \\frac{\\text{new value}}{\\text{old value}} = \\frac{1.25x}{0.75x} = \\frac{1.25}{0.75} = 1.666\\ldots \\approx 166.7\\ \\% $$\n\nMoa therefore has $166.7\\ \\% - 100\\ \\% = 66.7\\ \\%$ more than Nils.\n\nCheck with $x = 100$: Moa has 125 kr and Nils 75 kr. The difference is 50 kr, and $\\dfrac{50}{75} \\approx 0.667$.\n\n**Answer:** About 66.7 % more\n\n**General conclusion:** the difference between Moa and Nils is $50\\ \\%$ of LISA'S amount, but the question compares with Nils, who has less. The smaller the old value, the larger the same difference becomes as a percentage."
   },
   {
    "level": 3,
    "question": "A price is raised by $p\\ \\%$. Later the new price is reduced so that it ends up back at the original.<br>a) By what percentage is the price reduced if $p = 25$?<br>b) Show that the reduction is always smaller than the increase, however large $p$ is.<br>c) How large must the increase have been if the price was then reduced by $50\\ \\%$ to get back?",
    "answer": {
     "value": 100,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 20,
      "unit": "%"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 100,
      "unit": "%"
     }
    ],
    "solution": "**The key insight:** the increase and the reduction each have a change factor, and together they should give the factor 1 (unchanged price). The reduction's factor is therefore 1 divided by the increase's.\n\n**a)** The increase of $25\\ \\%$ has the factor $1.25$. The reduction should bring the price back, so its factor $f$ satisfies\n\n$$ 1.25 \\cdot f = 1 $$\n\nDivide both sides by $1.25$:\n\n$$ \\frac{1.25 \\cdot f}{\\boldsymbol{1.25}} = \\frac{1}{\\boldsymbol{1.25}} $$\n\n$$ f = 0.8 $$\n\nThe factor $0.8$ corresponds to a reduction of $100\\ \\% - 80\\ \\% = 20\\ \\%$.\n\n**Answer:** 20 %\n\n**b)** Write the increase in decimal form as $q$, where $q > 0$. The increase's factor is $1 + q$, and the reduction's factor is $\\dfrac{1}{1 + q}$. The reduction in decimal form becomes\n\n$$ 1 - \\frac{1}{1 + q} = \\frac{1 + q}{1 + q} - \\frac{1}{1 + q} = \\frac{q}{1 + q} $$\n\nThe numerator is the increase $q$, and it is divided by $1 + q$, which is greater than 1. A division by a number greater than 1 gives a smaller number, so $\\dfrac{q}{1 + q} < q$.\n\nCheck with a): $q = 0.25$ gives $\\dfrac{0.25}{1.25} = 0.2$, exactly as above.\n\n**Answer:** The reduction is $\\dfrac{q}{1 + q}$, which is smaller than $q$ since the denominator $1 + q$ is greater than 1.\n\n**c)** The reduction of $50\\ \\%$ has the factor $0.5$. The increase's factor $g$ should satisfy\n\n$$ g \\cdot 0.5 = 1 $$\n\nDivide both sides by $0.5$:\n\n$$ \\frac{g \\cdot 0.5}{\\boldsymbol{0.5}} = \\frac{1}{\\boldsymbol{0.5}} $$\n\n$$ g = 2 $$\n\nThe factor 2 corresponds to an increase of $200\\ \\% - 100\\ \\% = 100\\ \\%$. The price had therefore doubled, and halving brings it back.\n\n**Answer:** 100 %\n\n**General conclusion:** a reduction can never be greater than $100\\ \\%$, but an increase can be as large as you like. That is why \"the way back\" must always be a smaller percentage than \"the way there\"."
   },
   {
    "level": 3,
    "question": "A rectangular allotment is to be remodelled. The length is increased by $20\\ \\%$. By what percentage must the width be decreased for the area to be the same as before? Round to one decimal place.",
    "answer": {
     "value": 16.7,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "**The key insight:** the area is length times width. When each side changes by a factor, the area changes by the product of the factors. The area should be unchanged, so the product should be 1. The answer is NOT $20\\ \\%$.\n\nCall the length $l$ and the width $b$. The area is $l \\cdot b$.\n\nThe new length is $1.20l$. Let the width change by the factor $f$, so that the new width is $f \\cdot b$. The new area should be as large as the old one:\n\n$$ 1.20l \\cdot fb = l \\cdot b $$\n\nDivide both sides by $l \\cdot b$, which is not 0:\n\n$$ \\frac{1.20l \\cdot fb}{\\boldsymbol{l \\cdot b}} = \\frac{l \\cdot b}{\\boldsymbol{l \\cdot b}} $$\n\n$$ 1.20f = 1 $$\n\nDivide both sides by $1.20$:\n\n$$ \\frac{1.20f}{\\boldsymbol{1.20}} = \\frac{1}{\\boldsymbol{1.20}} $$\n\n$$ f = 0.8333\\ldots $$\n\nThe factor $0.8333\\ldots$ corresponds to a decrease of $1 - 0.8333\\ldots = 0.1666\\ldots \\approx 16.7\\ \\%$.\n\nCheck with an allotment that is 10 m long and 6 m wide, area $60\\ \\mathrm{m}^2$: the new length is 12 m and the new width $\\dfrac{60}{12} = 5$ m. The width has decreased by 1 m out of 6 m, and $\\dfrac{1}{6} \\approx 0.167$.\n\n**Answer:** About 16.7 %\n\n**General conclusion:** decreasing the width by $20\\ \\%$ would have given the factor $1.20 \\cdot 0.80 = 0.96$, that is, $4\\ \\%$ less area. Two equal percentages in opposite directions do not cancel each other out."
   },
   {
    "level": 3,
    "question": "A bicycle costs $10\\,000$ kr, including $25\\ \\%$ VAT. The VAT is calculated on the price without VAT. The government lowers the VAT on bicycles to $12\\ \\%$, and the shop keeps its price without VAT. By what percentage does the price for the customer fall?",
    "answer": {
     "value": 10.4,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "**The key insight:** the VAT is a percentage of the price WITHOUT VAT. The VAT falls by 13 percentage points, but the price for the customer does not fall by $13\\ \\%$, since the customer price is calculated from a different whole.\n\nThe price without VAT is the old value and the customer price the new one, with the change factor $1.25$:\n\n$$ \\text{old value} = \\frac{\\text{new value}}{\\text{change factor}} = \\frac{10\\,000}{1.25} = 8\\,000\\ \\mathrm{kr} $$\n\nWith $12\\ \\%$ VAT the customer price becomes\n\n$$ 1.12 \\cdot 8\\,000 = 8\\,960\\ \\mathrm{kr} $$\n\nThe customer price therefore changes from $10\\,000$ kr to $8\\,960$ kr:\n\n$$ \\text{change factor} = \\frac{8\\,960}{10\\,000} = 0.896 = 89.6\\ \\% $$\n\nThat corresponds to a reduction of $100\\ \\% - 89.6\\ \\% = 10.4\\ \\%$.\n\nThe same thing more briefly: the factor from the old to the new customer price is $\\dfrac{1.12}{1.25} = 0.896$, independent of what the bicycle costs.\n\n**Answer:** 10.4 %\n\n**General conclusion:** the two VAT rates act on the same price without VAT, so the quotient $\\dfrac{1.12}{1.25}$ gives the change in the customer price directly. Subtracting the percentages gives the wrong answer, since the customer pays $125\\ \\%$ and not $100\\ \\%$ to begin with."
   },
   {
    "level": 3,
    "question": "A lamp and a rug together cost $500$ kr. The price of the lamp is raised by $10\\ \\%$ and the price of the rug is reduced by $20\\ \\%$. After the price changes they together cost $460$ kr. What did the lamp cost before the increase?",
    "answer": {
     "value": 200,
     "unit": "kr"
    },
    "solution": "**The key insight:** one unknown is enough. If the lamp's price is called $x$ kr, the rug's price is $(500 - x)$ kr, and the change factors give the new prices.\n\nNew prices:\n\n- the lamp: $1.10x$ kr\n- the rug: $0.80(500 - x)$ kr\n\nTogether 460 kr:\n\n$$ 1.10x + 0.80(500 - x) = 460 $$\n\nExpand the bracket:\n\n$$ 1.10x + 400 - 0.80x = 460 $$\n\n$$ 0.30x + 400 = 460 $$\n\nSubtract 400 from both sides:\n\n$$ 0.30x + 400 \\mathbin{\\boldsymbol{-}}\\boldsymbol{400} = 460 \\mathbin{\\boldsymbol{-}}\\boldsymbol{400} $$\n\n$$ 0.30x = 60 $$\n\nDivide both sides by $0.30$:\n\n$$ \\frac{0.30x}{\\boldsymbol{0.30}} = \\frac{60}{\\boldsymbol{0.30}} $$\n\n$$ x = 200 $$\n\nThe lamp cost 200 kr and the rug 300 kr.\n\nCheck: $1.10 \\cdot 200 + 0.80 \\cdot 300 = 220 + 240 = 460$ kr.\n\nReasonable? The total price fell by 40 kr. If both items had cost 250 kr, the lamp would have become 25 kr more expensive and the rug 50 kr cheaper, that is, only 25 kr cheaper in total. The reduction is larger than that, so the rug must be the more expensive item.\n\n**Answer:** 200 kr"
   },
   {
    "level": 3,
    "question": "A price is raised by $8\\ \\%$. If the price had instead been reduced by $8\\ \\%$, the item would have cost $120$ kr less than it does now after the increase. What does the item cost after the increase?",
    "answer": {
     "value": 810,
     "unit": "kr"
    },
    "solution": "**The key insight:** both prices are calculated from the same old price. The difference between them corresponds to the difference between the change factors, $1.08 - 0.92$, times the old price.\n\nCall the old price $x$ kr. After the increase the item costs $1.08x$ kr, and after a reduction it would have cost $0.92x$ kr. The difference is 120 kr:\n\n$$ 1.08x - 0.92x = 120 $$\n\n$$ 0.16x = 120 $$\n\nDivide both sides by $0.16$:\n\n$$ \\frac{0.16x}{\\boldsymbol{0.16}} = \\frac{120}{\\boldsymbol{0.16}} $$\n\n$$ x = 750 $$\n\nThe old price was 750 kr. After the increase the item costs\n\n$$ 1.08 \\cdot 750 = 810\\ \\mathrm{kr} $$\n\nCheck: a reduction would have given $0.92 \\cdot 750 = 690$ kr, and $810 - 690 = 120$ kr.\n\n**Answer:** 810 kr\n\n**General conclusion:** the difference between an increase and a reduction by the same percentage is twice the percentage, here $16\\ \\%$, of the OLD price. Anyone who divides 120 by $0.08$ or calculates $16\\ \\%$ of the new price gets it wrong."
   }
  ]
 },
 "ma1c-3.3": {
  "kalla": "e15f5783e4",
  "data": [
   {
    "level": 1,
    "question": "A price is first raised by 10 % and then by 20 %. What is the total change factor?",
    "choices": [
     "$0.88$",
     "$1.10 + 1.20 = 2.30$",
     "$1.30$",
     "$1.10 \\cdot 1.20 = 1.32$"
    ],
    "correct": 3,
    "solution": "With repeated changes, the change factors are MULTIPLIED:\n\n$$ 1.10 \\cdot 1.20 = 1.32 $$\n\nThe total increase is therefore 32 %, not 30 % as you get if the percentages are added.\n\n**Answer:** $1.10 \\cdot 1.20 = 1.32$"
   },
   {
    "level": 1,
    "question": "An item costs 500 kr. The price is raised by 15 % and then reduced by 15 %. What does the item cost then?",
    "answer": {
     "value": 488.75,
     "unit": "kr",
     "tol": 0.005
    },
    "solution": "Total change factor:\n\n$$ 1.15 \\cdot 0.85 = 0.9775 $$\n\n$$ 500 \\cdot 0.9775 = 488.75\\ \\mathrm{kr} $$\n\nThe price therefore does NOT return to 500 kr: the value that the 15 % is calculated on has changed.\n\n**Answer:** 488.75 kr"
   },
   {
    "level": 1,
    "question": "What total change factor does a savings account with an annual interest rate of 3 % get after 5 years?",
    "choices": [
     "$1.03^5$",
     "$1.03 \\cdot 5$",
     "$1.15$",
     "$5 \\cdot 0.03$"
    ],
    "correct": 0,
    "solution": "The same change factor 1.03 is multiplied once per year, that is, five times:\n\n$$ 1.03 \\cdot 1.03 \\cdot 1.03 \\cdot 1.03 \\cdot 1.03 = 1.03^5 \\approx 1.159 $$\n\n$1.03 \\cdot 5 = 5.15$ would be a fivefold increase plus 15 %, which is unreasonable for 3 % interest.\n\n**Answer:** $1.03^5$"
   },
   {
    "level": 2,
    "question": "Nadia deposits 45 000 kr in an account with an annual interest rate of 3.2 %. How much is in the account after 10 years? Round to whole kronor.",
    "answer": {
     "value": 61638,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "The change factor per year is $1 + 0.032 = 1.032$. After 10 years:\n\n$$ 45\\ 000 \\cdot 1.032^{10} = 45\\ 000 \\cdot 1.3702\\ldots = 61\\ 637.6\\ldots \\approx 61\\ 638\\ \\mathrm{kr} $$\n\n**Answer:** 61 638 kr"
   },
   {
    "level": 2,
    "question": "A share increased by 8 % one year and decreased by 5 % the following year. What was the total change?",
    "choices": [
     "+ 2.6 %",
     "+ 3.0 %",
     "− 2.6 %",
     "+ 13 %"
    ],
    "correct": 0,
    "solution": "Multiply the change factors:\n\n$$ 1.08 \\cdot 0.95 = 1.026 $$\n\n1.026 corresponds to an increase of 2.6 %. Adding the percentages ($8 - 5 = 3$ %) gives the wrong answer: the factors act on different amounts.\n\n**Answer:** + 2.6 %"
   },
   {
    "level": 3,
    "question": "The number of members in a club increases by the same percentage every year. Over three years, the number increases by $33.1\\ \\%$ in total.<br>a) By what percentage does the number increase each year?<br>b) After how many whole years, counted from the start of the three-year period, has the number of members doubled if the increase continues at the same rate?",
    "answer": {
     "value": 8,
     "unit": "years"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 10,
      "unit": "%"
     },
     {
      "del": "b",
      "value": 8,
      "unit": "years"
     }
    ],
    "solution": "**The key insight:** the total change factor is the annual factor multiplied by itself three times. The annual factor is therefore a cube root, not a third of $33.1\\ \\%$.\n\n**a)** Let the annual change factor be $a$. The total factor after three years is $1 + 0.331 = 1.331$, so\n\n$$ a^3 = 1.331 $$\n\n$$ a = \\sqrt[3]{1.331} = 1.1 $$\n\nThe factor $1.1$ corresponds to an increase of $10\\ \\%$ per year.\n\nCheck: $1.1 \\cdot 1.1 \\cdot 1.1 = 1.331$. Dividing $33.1\\ \\%$ by 3 would have given about $11\\ \\%$, and $1.11^3 \\approx 1.368$, which is too much.\n\n**Answer:** 10 %\n\n**b)** After $n$ years the total factor is $1.1^n$. We are looking for the smallest whole $n$ where the factor is at least 2, and we try:\n\n$$ 1.1^6 = 1.771\\ldots \\qquad 1.1^7 = 1.948\\ldots \\qquad 1.1^8 = 2.143\\ldots $$\n\nAfter 7 years a little is still missing, but after 8 years the number has more than doubled.\n\n**Answer:** After 8 years\n\n**General conclusion:** an equal percentage increase every year means that the factors are multiplied. The annual factor is therefore found with a root of the total factor, not by division."
   },
   {
    "level": 3,
    "question": "A cylindrical can is redesigned. The radius is increased by $10\\ \\%$ and the height is decreased by $15\\ \\%$. The volume is $\\pi r^2 h$.<br>a) By what percentage does the volume of the can change?<br>b) By what percentage would the height instead need to be decreased for the volume to be unchanged? Round to one decimal place.",
    "answer": {
     "value": 17.4,
     "unit": "%",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2.85,
      "unit": "%",
      "etikett": "increase",
      "tol": 0.01
     },
     {
      "del": "b",
      "value": 17.4,
      "unit": "%",
      "tol": 0.005
     }
    ],
    "solution": "**The key insight:** the radius is squared in the volume formula. An increase of the radius by $10\\ \\%$ therefore gives the factor $1.1$ TWICE in the volume, that is, the factor $1.1^2 = 1.21$.\n\n**a)** The new volume is\n\n$$ \\pi (1.1r)^2 \\cdot 0.85h = 1.1^2 \\cdot 0.85 \\cdot \\pi r^2 h $$\n\nThe total change factor for the volume is\n\n$$ 1.1^2 \\cdot 0.85 = 1.21 \\cdot 0.85 = 1.0285 $$\n\nThe factor $1.0285$ corresponds to an increase of $2.85\\ \\%$.\n\n**Answer:** The volume increases by 2.85 %.\n\n**b)** Let the height's factor be $f$. The volume should be unchanged, so the total factor should be 1:\n\n$$ 1.21 \\cdot f = 1 $$\n\nDivide both sides by $1.21$:\n\n$$ \\frac{1.21 \\cdot f}{\\boldsymbol{1.21}} = \\frac{1}{\\boldsymbol{1.21}} $$\n\n$$ f = 0.8264\\ldots $$\n\nThe factor $0.8264\\ldots$ corresponds to a decrease of $1 - 0.8264\\ldots = 0.1735\\ldots \\approx 17.4\\ \\%$.\n\n**Answer:** About 17.4 %\n\n**General conclusion:** when a quantity is squared in a formula, its change factor must also be squared. An increase of $10\\ \\%$ in the radius increases the area of the can's base by $21\\ \\%$, not by $10\\ \\%$."
   },
   {
    "level": 3,
    "question": "A ball is dropped from a height of $2.0$ m. After each bounce the ball reaches $75\\ \\%$ of the height before the bounce.<br>a) After how many bounces does the ball reach lower than $30$ cm for the first time?<br>b) Another ball of the same kind is dropped from an unknown height. After the third bounce it reaches $54$ cm. From what height was it dropped? Give your answer in cm.",
    "answer": {
     "value": 128,
     "unit": "cm"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 7,
      "unit": "bounces"
     },
     {
      "del": "b",
      "value": 128,
      "unit": "cm"
     }
    ],
    "solution": "**The key insight:** each bounce is a percentage change with the same factor, $0.75$. After $n$ bounces the height is therefore the starting height times $0.75^n$.\n\n**a)** The starting height is $200$ cm. We are looking for the smallest $n$ where\n\n$$ 200 \\cdot 0.75^n < 30 $$\n\nWe try some values of $n$:\n\n$$ 200 \\cdot 0.75^6 = 35.6\\ldots \\qquad 200 \\cdot 0.75^7 = 26.6\\ldots $$\n\nAfter six bounces the ball still reaches above 30 cm, but after seven bounces below.\n\n**Answer:** After 7 bounces\n\n**b)** Call the starting height $h$ cm. After three bounces the height is\n\n$$ h \\cdot 0.75^3 = 54 $$\n\n$0.75^3 = 0.421\\,875$, so\n\n$$ 0.421\\,875h = 54 $$\n\nDivide both sides by $0.421\\,875$:\n\n$$ \\frac{0.421\\,875h}{\\boldsymbol{0.421\\,875}} = \\frac{54}{\\boldsymbol{0.421\\,875}} $$\n\n$$ h = 128 $$\n\nCheck: $128 \\cdot 0.75 = 96$, $96 \\cdot 0.75 = 72$ and $72 \\cdot 0.75 = 54$ cm.\n\n**Answer:** 128 cm\n\n**General conclusion:** going backwards in a repeated change means dividing by the total factor, just like \"old value = new value / change factor\" for a single change."
   },
   {
    "level": 3,
    "question": "A share increases in value by $10\\ \\%$ per year for five years and then decreases by $10\\ \\%$ per year for five years.<br>a) By what percentage has the value changed after the ten years? Round to one decimal place.<br>b) Does it matter if the five decreases come first? Justify.",
    "answer": {
     "value": 4.9,
     "unit": "%",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4.9,
      "unit": "%",
      "etikett": "decrease",
      "tol": 0.01,
      "ignoreSign": true
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The key insight:** ten changes in a row give ten change factors that are multiplied. Five pairs with one increase and one decrease do NOT cancel each other out.\n\n**a)** The total change factor is\n\n$$ 1.1^5 \\cdot 0.9^5 $$\n\nSince the order of multiplication does not matter, the factors can be paired up, one $1.1$ with one $0.9$:\n\n$$ 1.1^5 \\cdot 0.9^5 = (1.1 \\cdot 0.9)^5 = 0.99^5 = 0.9509\\ldots $$\n\nThe factor $0.9509\\ldots$ corresponds to a decrease of $1 - 0.9509\\ldots = 0.049\\ldots \\approx 4.9\\ \\%$.\n\nEach pair with an increase and a decrease of $10\\ \\%$ gives the factor $0.99$, that is, a loss of $1\\ \\%$. Five such pairs give almost $5\\ \\%$.\n\n**Answer:** The value has decreased by about 4.9 %.\n\n**b)** No. The total factor is a product of the same ten factors, and a product is the same in whatever order the factors are multiplied.\n\nAlong the way, however, it looks different. If the increases come first, the share is worth $1.1^5 \\approx 1.61$ times the starting value after five years. If the decreases come first, it is only worth $0.9^5 \\approx 0.59$ times the starting value. The final value is still the same.\n\n**Answer:** No, the product of the factors is the same in whatever order they come.\n\n**General conclusion:** an increase and a decrease by the same percentage always give a loss, since $(1 + q)(1 - q) = 1 - q^2$, which is less than 1."
   },
   {
    "level": 3,
    "question": "A rule of thumb says that the time it takes for an amount to double, counted in years, is approximately $72$ divided by the percentage increase per year.<br>a) Write the rule of thumb as a formula for the doubling time $T$ years when the increase is $p\\ \\%$ per year.<br>b) Check the rule of thumb for $p = 8$.<br>c) Using a method other than the rule of thumb, find the percentage increase per year that gives a doubling in exactly 8 years. Round to two decimal places.",
    "answer": {
     "value": 9.05,
     "unit": "%",
     "tol": 0.002
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
      "value": 9.05,
      "unit": "%",
      "tol": 0.002
     }
    ],
    "solution": "**The key insight:** the rule of thumb is an estimate. The exact method is that the total change factor after $T$ years should be 2.\n\n**a)** The doubling time is 72 divided by $p$:\n\n$$ T = \\frac{72}{p} $$\n\n**Answer:** $T = \\dfrac{72}{p}$\n\n**b)** The rule of thumb gives $T = \\dfrac{72}{8} = 9$ years. The exact total factor after 9 years with an $8\\ \\%$ increase per year is\n\n$$ 1.08^9 = 1.999\\ldots $$\n\nThe amount has therefore more or less exactly doubled.\n\n**Answer:** The rule of thumb gives 9 years, and $1.08^9 \\approx 2.0$. It agrees very well.\n\n**c)** Let the annual change factor be $a$. After 8 years the total factor should be 2:\n\n$$ a^8 = 2 $$\n\n$$ a = \\sqrt[8]{2} = 1.0905\\ldots $$\n\nThe factor $1.0905\\ldots$ corresponds to an increase of about $9.05\\ \\%$ per year. The rule of thumb would have given $\\dfrac{72}{8} = 9\\ \\%$, almost the same.\n\nCheck: $1.0905^8 = 1.9998\\ldots$, which rounds to 2.\n\n**Answer:** About 9.05 % per year\n\n**General conclusion:** the rule of thumb works well for increases of a few percent per year, but becomes worse for large increases. Exactly, you solve $a^T = 2$ with a root when the time is known, and by trial and error when the increase is known."
   },
   {
    "level": 3,
    "question": "A credit card company charges $2\\ \\%$ interest per month on unpaid debts, and the interest is added to the debt each month. The advertisement says \"only $24\\ \\%$ a year\". By what percentage does an unpaid debt grow in one year? Round to one decimal place.",
    "answer": {
     "value": 26.8,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "**The key insight:** the interest is added to the debt each month, so the next month's interest is calculated on a larger debt. That is compound interest, and the twelve monthly factors should be multiplied, not added.\n\nThe change factor per month is $1 + 0.02 = 1.02$. After twelve months the total change factor is\n\n$$ 1.02^{12} = 1.268\\ldots $$\n\nThe factor $1.268\\ldots$ corresponds to an increase of about $26.8\\ \\%$.\n\nCheck with a debt of $10\\,000$ kr: after one year it is $10\\,000 \\cdot 1.02^{12} \\approx 12\\,682$ kr. With $24\\ \\%$ interest it would have been $12\\,400$ kr.\n\n**Answer:** About 26.8 %\n\n**General conclusion:** \"$12 \\cdot 2\\ \\% = 24\\ \\%$\" is only right if the interest is not added to the debt. When the interest grows with the debt, the real annual interest rate is always higher than twelve times the monthly rate."
   },
   {
    "level": 3,
    "question": "Fund A is worth $20\\,000$ kr and increases in value by $8\\ \\%$ per year. Fund B is worth $30\\,000$ kr and increases in value by $5\\ \\%$ per year. After how many whole years is fund A worth more than fund B for the first time?",
    "answer": {
     "value": 15,
     "unit": "years"
    },
    "solution": "**The key insight:** compare the funds through their quotient. A should become worth more than B, so the quotient $\\dfrac{A}{B}$ should become greater than 1, and the quotient itself changes by its own change factor each year.\n\nAfter $n$ years the funds are worth $20\\,000 \\cdot 1.08^n$ kr and $30\\,000 \\cdot 1.05^n$ kr. Fund A is worth more when\n\n$$ 20\\,000 \\cdot 1.08^n > 30\\,000 \\cdot 1.05^n $$\n\nDivide both sides by $20\\,000 \\cdot 1.05^n$, which is positive:\n\n$$ \\frac{20\\,000 \\cdot 1.08^n}{\\boldsymbol{20\\,000 \\cdot 1.05^n}} > \\frac{30\\,000 \\cdot 1.05^n}{\\boldsymbol{20\\,000 \\cdot 1.05^n}} $$\n\n$$ \\left(\\frac{1.08}{1.05}\\right)^n > 1.5 $$\n\nThe quotient between the funds therefore grows by the factor $\\dfrac{1.08}{1.05} \\approx 1.0286$ per year, not by $3\\ \\%$. We try:\n\n$$ \\left(\\frac{1.08}{1.05}\\right)^{14} = 1.483\\ldots \\qquad \\left(\\frac{1.08}{1.05}\\right)^{15} = 1.525\\ldots $$\n\nCheck with the values of the funds: after 14 years A is worth $58\\,744$ kr and B $59\\,398$ kr. After 15 years A is worth $63\\,443$ kr and B $62\\,368$ kr.\n\n**Answer:** After 15 years\n\n**General conclusion:** comparing two exponential processes becomes easier when you divide them by each other, since the quotient then follows its own exponential process with the factor $\\dfrac{1.08}{1.05}$."
   }
  ]
 },
 "ma1c-3.4": {
  "kalla": "b431681174",
  "data": [
   {
    "level": 1,
    "question": "What is the amount in a savings account called?",
    "choices": [
     "Amortisation",
     "Deposit",
     "Interest",
     "Balance"
    ],
    "correct": 3,
    "solution": "The amount in the account is called the **balance**. The interest is the percentage by which the balance grows each year, and the deposit is what you put in.\n\n**Answer:** Balance"
   },
   {
    "level": 1,
    "question": "You deposit 12 000 kr in an account with an annual interest rate of 3.5 %. What is the balance after one year?",
    "answer": {
     "value": 12420,
     "unit": "kr"
    },
    "solution": "The change factor is $1 + 0.035 = 1.035$:\n\n$$ 12\\ 000 \\cdot 1.035 = 12\\ 420\\ \\mathrm{kr} $$\n\n**Answer:** 12 420 kr"
   },
   {
    "level": 1,
    "question": "What must a formula in a spreadsheet cell always start with?",
    "choices": [
     "A dollar sign, $",
     "The word \"formula\"",
     "An equals sign, =",
     "The name of the cell"
    ],
    "correct": 2,
    "solution": "Formulas in spreadsheets always start with =, for example `=B2*B12`. Without the equals sign, the content is interpreted as ordinary text.\n\nThe dollar sign is used for something else: to \"lock\" a cell reference (for example `$B$12`) when the formula is copied.\n\n**Answer:** An equals sign, ="
   },
   {
    "level": 2,
    "question": "In a spreadsheet, the starting amount is in B2 and the change factor in B12. Cell B3 contains `=B2*B12` and is to be copied downwards with the fill handle. How should the formula be written to work correctly?",
    "choices": [
     "`=B3*B12`: the formula should point to its own cell",
     "`=$B$2*B12`: the starting amount is locked",
     "`=B2*B12`: exactly as it is",
     "`=B2*$B$12`: the factor cell is locked with dollar signs"
    ],
    "correct": 3,
    "solution": "When the formula is copied downwards, the references move along: `=B2*B12` becomes `=B3*B13`, `=B4*B14` and so on, but the change factor is ONLY in B12. That reference must therefore be locked with dollar signs:\n\n`=B2*$B$12`\n\nThen the copies become `=B3*$B$12`, `=B4*$B$12` …: the previous year's balance times the same factor.\n\n**Answer:** `=B2*$B$12`"
   },
   {
    "level": 2,
    "question": "Amir saves 60 000 kr at an interest rate of 2.4 % for 6 years. How much is in the account then? Round to whole kronor.",
    "answer": {
     "value": 69166,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "The same change factor every year gives the total factor $1.024^6$:\n\n$$ 60\\ 000 \\cdot 1.024^6 = 60\\ 000 \\cdot 1.1528\\ldots = 69\\ 166.0\\ldots \\approx 69\\ 166\\ \\mathrm{kr} $$\n\n**Answer:** 69 166 kr"
   },
   {
    "level": 3,
    "question": "Joel deposits $10\\,000$ kr at the end of each year in an account with an interest rate of $4\\ \\%$. Directly after which deposit is the balance greater than $100\\,000$ kr for the first time?",
    "answer": {
     "value": 9,
     "unit": ""
    },
    "solution": "**The key insight:** before each new deposit, the whole previous balance has grown by $4\\ \\%$. Each row in the calculation is therefore \"the previous balance times $1.04$, plus $10\\,000$\". That is more than $10 \\cdot 10\\,000$, so the answer will be fewer than ten deposits.\n\nIn a spreadsheet, $10\\,000$ is entered in B2 and the formula `=B2*1.04+10000` in B3, which is then dragged down with the fill handle:\n\n| Deposit | Balance (kr) |\n| --- | --- |\n| 1 | 10 000.00 |\n| 2 | 20 400.00 |\n| 3 | 31 216.00 |\n| 4 | 42 464.64 |\n| 5 | 54 163.23 |\n| 6 | 66 329.75 |\n| 7 | 78 982.94 |\n| 8 | 92 142.26 |\n| 9 | 105 827.95 |\n\nCheck of one row: $92\\,142.26 \\cdot 1.04 + 10\\,000 = 105\\,827.95$ kr.\n\nAfter eight deposits just under $8\\,000$ kr is missing, and after nine the balance has passed $100\\,000$ kr. Joel has then deposited $90\\,000$ kr, and the rest, $15\\,828$ kr, is interest.\n\n**Answer:** Directly after the 9th deposit\n\n**General conclusion:** with regular saving, the interest grows each year, since it is calculated on an ever larger balance. A spreadsheet handles the repeated calculations, and each row can be checked by hand."
   },
   {
    "level": 3,
    "question": "Ali and Bea both save $50\\,000$ kr in accounts with an interest rate of $3\\ \\%$. Ali deposits the whole amount at once and leaves it for 10 years. Bea deposits $5\\,000$ kr at the end of each year for 10 years. How much more does Ali have than Bea directly after Bea's tenth deposit? Round to whole kronor.",
    "answer": {
     "value": 9876,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "**The key insight:** they save the same amount of money, but the money stays in the account for different lengths of time. All of Ali's money grows for ten years, while Bea's first deposit grows for nine years and the last one not at all.\n\n**Ali:** the same factor $1.03$ for ten years:\n\n$$ 50\\,000 \\cdot 1.03^{10} = 67\\,195.8\\ldots\\ \\mathrm{kr} $$\n\n**Bea:** the first deposit has time to grow for 9 years, the second for 8 years and so on. Directly after the tenth deposit the balance is\n\n$$ 5\\,000 \\cdot 1.03^9 + 5\\,000 \\cdot 1.03^8 + \\ldots + 5\\,000 \\cdot 1.03 + 5\\,000 $$\n\nIn a spreadsheet with $5\\,000$ in B2 and `=B2*1.03+5000` in B3, down to the tenth deposit, the balance becomes $57\\,319.40$ kr.\n\nThe difference:\n\n$$ 67\\,195.82 - 57\\,319.40 = 9\\,876.42\\ \\mathrm{kr} $$\n\n**Answer:** About 9 876 kr more\n\n**General conclusion:** time is what makes compound interest powerful. Money deposited early has time to grow for a long time, and that is why saving early pays off more than the same amount saved later."
   },
   {
    "level": 3,
    "question": "Emma saves $5\\,000$ kr per year for 10 years in an account with an interest rate of $4\\ \\%$. She can deposit the money at the beginning of each year or at the end of each year. Calculate the balance after 10 years in both cases, and find how much more it gives to deposit the money at the beginning of the year. Round to whole kronor.",
    "answer": {
     "value": 2401,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "**The key insight:** if each deposit is made one year earlier, EACH deposit grows one year longer. The whole balance therefore becomes exactly $4\\ \\%$ larger, and you only need to calculate one of the cases.\n\n**Deposit at the end of the year:** in a spreadsheet with $5\\,000$ in B2 and `=B2*1.04+5000` in B3, down to the tenth deposit, the balance directly after the tenth deposit is\n\n$$ 60\\,030.54\\ \\mathrm{kr} $$\n\n**Deposit at the beginning of the year:** each deposit has received one more year of interest when the year is over, so the balance after 10 years is\n\n$$ 1.04 \\cdot 60\\,030.54 = 62\\,431.76\\ \\mathrm{kr} $$\n\n(In the spreadsheet the formula becomes `=(B2+5000)*1.04`: first the deposit, then everything grows during the year.)\n\nThe difference:\n\n$$ 62\\,431.76 - 60\\,030.54 = 2\\,401.22\\ \\mathrm{kr} $$\n\nThe difference is exactly $4\\ \\%$ of the first balance: $0.04 \\cdot 60\\,030.54 = 2\\,401.22$ kr.\n\n**Answer:** At the end of the year 60 031 kr, at the beginning of the year 62 432 kr. Depositing at the beginning gives about 2 401 kr more.\n\n**General conclusion:** when all the amounts in a sum are multiplied by the same factor, the whole sum is multiplied by that factor. Seeing this saves a whole calculation."
   },
   {
    "level": 3,
    "question": "Greta has $200\\,000$ kr in an account with an interest rate of $3\\ \\%$. At the end of each year, after the interest has been added, she withdraws money.<br>a) How much can she withdraw each year without the balance ever decreasing?<br>b) She instead withdraws $15\\,000$ kr at the end of each year. How many whole withdrawals of $15\\,000$ kr can she make?",
    "answer": {
     "value": 17,
     "unit": "withdrawals"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 6000,
      "unit": "kr"
     },
     {
      "del": "b",
      "value": 17,
      "unit": "withdrawals"
     }
    ],
    "solution": "**The key insight:** the balance only decreases if the withdrawal is larger than the interest. Each year, \"the previous balance times $1.03$, minus the withdrawal\" applies.\n\n**a)** The interest in the first year is\n\n$$ 0.03 \\cdot 200\\,000 = 6\\,000\\ \\mathrm{kr} $$\n\nIf Greta withdraws exactly the interest, the balance after the withdrawal is $200\\,000$ kr again, and the same thing is repeated every year.\n\n**Answer:** 6 000 kr per year\n\n**b)** The withdrawal is larger than the interest, so the balance shrinks, and it shrinks faster and faster since the interest becomes smaller each year. In a spreadsheet with $200\\,000$ in B2 and `=B2*1.03-15000` in B3, downwards:\n\n| Withdrawal | Balance after the withdrawal (kr) |\n| --- | --- |\n| 1 | 191 000.00 |\n| 2 | 181 730.00 |\n| 3 | 172 181.90 |\n| … | … |\n| 15 | 32 609.78 |\n| 16 | 18 588.07 |\n| 17 | 4 145.71 |\n| 18 | −10 729.92 |\n\nCheck of one row: $18\\,588.07 \\cdot 1.03 - 15\\,000 = 4\\,145.71$ kr.\n\nAfter the 17th withdrawal, $4\\,145.71$ kr remains. With interest that becomes $4\\,270.08$ kr, which is not enough for an 18th withdrawal.\n\n**Answer:** 17 whole withdrawals\n\n**General conclusion:** without interest the money would have been enough for $\\dfrac{200\\,000}{15\\,000} \\approx 13.3$ withdrawals. The interest extends the time, but since the balance decreases, the interest becomes smaller each year, and the last years go fast."
   },
   {
    "level": 3,
    "question": "What annual interest rate is needed for $40\\,000$ kr to grow to $50\\,000$ kr in 6 years, without any further deposits? Give your answer as a percentage with two decimal places.",
    "answer": {
     "value": 3.79,
     "unit": "%",
     "tol": 0.002
    },
    "solution": "**The key insight:** the interest gives the same change factor every year. The total factor after 6 years is the annual factor raised to the power 6, and the annual factor is obtained with a sixth root. Dividing the total increase by 6 gives the wrong answer, since it misses compound interest.\n\nLet the annual change factor be $a$:\n\n$$ 40\\,000 \\cdot a^6 = 50\\,000 $$\n\nDivide both sides by $40\\,000$:\n\n$$ \\frac{40\\,000 \\cdot a^6}{\\boldsymbol{40\\,000}} = \\frac{50\\,000}{\\boldsymbol{40\\,000}} $$\n\n$$ a^6 = 1.25 $$\n\n$$ a = \\sqrt[6]{1.25} = 1.037\\,89\\ldots $$\n\nThe factor $1.037\\,89\\ldots$ corresponds to an annual interest rate of about $3.79\\ \\%$.\n\nCheck: $40\\,000 \\cdot 1.0379^6 = 50\\,002.6\\ldots$ kr, that is, $50\\,000$ kr when the interest rate has been rounded.\n\nThe common miscalculation is to divide the total increase of $25\\ \\%$ by 6, which gives $4.17\\ \\%$. With that interest rate it becomes $40\\,000 \\cdot 1.0417^6 \\approx 51\\,111$ kr, which is too much.\n\n**Answer:** About 3.79 %\n\n**General conclusion:** \"what annual percentage gives a certain total change?\" is solved with a root: $a = \\sqrt[n]{\\text{total change factor}}$."
   },
   {
    "level": 3,
    "question": "Wilma wants to have $50\\,000$ kr in her account directly after her fifth deposit. She deposits the same amount at the end of each year, and the interest rate is $2\\ \\%$. How large an amount must she deposit each time? Round up to whole kronor.",
    "answer": {
     "value": 9608,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "**The key insight:** call the deposit $x$ kr and write out what each deposit is worth directly after the fifth. Then $x$ appears in every term and can be taken out, and what remains is an equation with a single unknown.\n\nThe first deposit has time to grow for 4 years, the second for 3 years and so on, and the fifth not at all:\n\n$$ x \\cdot 1.02^4 + x \\cdot 1.02^3 + x \\cdot 1.02^2 + x \\cdot 1.02 + x = 50\\,000 $$\n\nTake out $x$:\n\n$$ x(1.02^4 + 1.02^3 + 1.02^2 + 1.02 + 1) = 50\\,000 $$\n\nThe sum in the bracket:\n\n$$ 1.082\\,43\\ldots + 1.061\\,20\\ldots + 1.0404 + 1.02 + 1 = 5.204\\,04\\ldots $$\n\n$$ 5.204\\,04x = 50\\,000 $$\n\nDivide both sides by $5.204\\,04$:\n\n$$ \\frac{5.204\\,04x}{\\boldsymbol{5.204\\,04}} = \\frac{50\\,000}{\\boldsymbol{5.204\\,04}} $$\n\n$$ x = 9\\,607.9\\ldots $$\n\nWith $9\\,607$ kr it is not quite enough, so we round up to $9\\,608$ kr.\n\nCheck: $9\\,608 \\cdot 5.204\\,04 \\approx 50\\,000.4$ kr.\n\nReasonable? Without interest she would have needed $\\dfrac{50\\,000}{5} = 10\\,000$ kr each time. The interest means that a little less is enough.\n\n**Answer:** 9 608 kr per year\n\n**General conclusion:** when the amount sought is the same in every term, it can be taken out, and then a long spreadsheet calculation becomes a simple equation."
   },
   {
    "level": 3,
    "question": "Hugo has money in an account with an interest rate of $3\\ \\%$. At the same time, prices in society rise by $5\\ \\%$ per year.<br>a) By what percentage does what Hugo can buy with the money decrease in one year? Round to one decimal place.<br>b) By what percentage has what he can buy decreased after 10 years? Round to one decimal place.",
    "answer": {
     "value": 17.5,
     "unit": "%",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.9,
      "unit": "%",
      "tol": 0.02,
      "ignoreSign": true
     },
     {
      "del": "b",
      "value": 17.5,
      "unit": "%",
      "tol": 0.005,
      "ignoreSign": true
     }
    ],
    "solution": "**The key insight:** what decides what the money is enough for is the quotient between the balance and the prices. The balance increases by the factor $1.03$ and the prices by the factor $1.05$, so the quotient changes by the factor $\\dfrac{1.03}{1.05}$ each year.\n\n**a)** With the balance $B$ kr and the price $P$ kr for an item, Hugo can buy $\\dfrac{B}{P}$ items. After one year he can buy\n\n$$ \\frac{1.03B}{1.05P} = \\frac{1.03}{1.05} \\cdot \\frac{B}{P} = 0.9809\\ldots \\cdot \\frac{B}{P} $$\n\nThe factor $0.9809\\ldots$ corresponds to a decrease of $1 - 0.9809\\ldots = 0.019\\ldots \\approx 1.9\\ \\%$.\n\nNotice that the answer is not exactly $5\\ \\% - 3\\ \\% = 2\\ \\%$. It is close, but the difference is a quotient and not a subtraction.\n\n**Answer:** About 1.9 %\n\n**b)** The same factor every year for ten years gives the total factor\n\n$$ \\left(\\frac{1.03}{1.05}\\right)^{10} = 0.8250\\ldots $$\n\nThe factor $0.8250\\ldots$ corresponds to a decrease of $1 - 0.8250\\ldots = 0.1749\\ldots \\approx 17.5\\ \\%$.\n\nCheck with made-up numbers: $10\\,000$ kr grows to $10\\,000 \\cdot 1.03^{10} \\approx 13\\,439$ kr, while an item for $100$ kr becomes $100 \\cdot 1.05^{10} \\approx 162.89$ kr. Before, the money was enough for 100 items, afterwards for $\\dfrac{13\\,439}{162.89} \\approx 82.5$ items.\n\n**Answer:** About 17.5 %\n\n**General conclusion:** savings can grow in kronor and still become worth less. What counts is the quotient between the savings' change factor and that of the prices."
   }
  ]
 },
 "ma1c-3.5": {
  "kalla": "ee532405de",
  "data": [
   {
    "level": 1,
    "question": "What is paying back the loan amount itself called?",
    "choices": [
     "Depositing",
     "Paying interest",
     "Refinancing",
     "Amortising"
    ],
    "correct": 3,
    "solution": "Paying back the loan is called **amortising**. The interest is what you pay extra: the price of the loan. Each payment consists of amortisation + interest.\n\n**Answer:** Amortising"
   },
   {
    "level": 1,
    "question": "A loan of 90 000 kr is to be amortised with equal amounts every month for 3 years. How large is the amortisation per month?",
    "answer": {
     "value": 2500,
     "unit": "kr"
    },
    "solution": "The number of payments is $3 \\cdot 12 = 36$:\n\n$$ \\frac{90\\ 000}{36} = 2\\ 500\\ \\mathrm{kr} $$\n\n**Answer:** 2 500 kr"
   },
   {
    "level": 1,
    "question": "A debt is 50 000 kr and the annual interest rate 6 %. How large is the interest for ONE month?",
    "answer": {
     "value": 250,
     "unit": "kr"
    },
    "solution": "The annual interest in kronor:\n\n$$ 0.06 \\cdot 50\\ 000 = 3\\ 000\\ \\mathrm{kr} $$\n\nPer month (12 months in a year):\n\n$$ \\frac{3\\ 000}{12} = 250\\ \\mathrm{kr} $$\n\n**Answer:** 250 kr"
   },
   {
    "level": 2,
    "question": "Hugo borrows 120 000 kr with straight-line amortisation over 4 years and an annual interest rate of 5.4 %. How much should he pay in total at the FIRST payment (monthly)?",
    "answer": {
     "value": 3040,
     "unit": "kr"
    },
    "solution": "Amortisation per month: $4 \\cdot 12 = 48$ payments give\n\n$$ \\frac{120\\ 000}{48} = 2\\ 500\\ \\mathrm{kr} $$\n\nThe interest in the first month is calculated on the whole debt of 120 000 kr:\n\n$$ \\frac{0.054 \\cdot 120\\ 000}{12} = \\frac{6\\ 480}{12} = 540\\ \\mathrm{kr} $$\n\nTotal payment:\n\n$$ 2\\ 500 + 540 = 3\\ 040\\ \\mathrm{kr} $$\n\n**Answer:** 3 040 kr"
   },
   {
    "level": 2,
    "question": "In the spreadsheet for a loan, the current debt is in B2 and the annual interest rate is 4.8 %. Which formula gives the interest per month?",
    "choices": [
     "`=B2*1.048/12`",
     "`=B2/12`",
     "`=B2*0.048`",
     "`=(B2*0.048)/12`"
    ],
    "correct": 3,
    "solution": "The interest per month is the annual interest (4.8 % of the current debt) divided by 12:\n\n`=(B2*0.048)/12`\n\n`=B2*0.048` gives the interest for a WHOLE year, and `=B2*1.048/12` mixes in the change factor that belongs to savings accounts. Here only the interest part should be calculated.\n\n**Answer:** `=(B2*0.048)/12`"
   },
   {
    "level": 3,
    "question": "A loan of $240\\,000$ kr is to be paid back with straight-line amortisation every quarter for 10 years. The annual interest rate is $6\\ \\%$. The interest is paid every quarter on the current debt.<br>a) How large is the interest at the first and at the last payment?<br>b) Find the total interest cost of the loan without calculating each payment.",
    "answer": {
     "value": 73800,
     "unit": "kr",
     "tol": 0.001
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3600,
      "unit": "kr",
      "etikett": "first interest",
      "tol": 0.001
     },
     {
      "del": "a",
      "value": 90,
      "unit": "kr",
      "etikett": "last interest",
      "tol": 0.001
     },
     {
      "del": "b",
      "value": 73800,
      "unit": "kr",
      "tol": 0.001
     }
    ],
    "solution": "**The key insight:** the debt decreases by the same amount every quarter, so the interest also decreases by the same amount every quarter. The interest amounts form an even staircase, and the sum of an even staircase is the number of steps times the mean of the first and last step.\n\nA year has 4 quarters, so the loan is paid with $4 \\cdot 10 = 40$ payments. The amortisation per quarter is\n\n$$ \\frac{240\\,000}{40} = 6\\,000\\ \\mathrm{kr} $$\n\nThe interest per quarter is a quarter of the annual interest: $\\dfrac{6\\ \\%}{4} = 1.5\\ \\%$ of the debt.\n\n**a)** At the first payment the debt is the whole loan:\n\n$$ 0.015 \\cdot 240\\,000 = 3\\,600\\ \\mathrm{kr} $$\n\nAt the last payment only the last amortisation, $6\\,000$ kr, remains:\n\n$$ 0.015 \\cdot 6\\,000 = 90\\ \\mathrm{kr} $$\n\n**Answer:** 3 600 kr at the first and 90 kr at the last payment\n\n**b)** The debt decreases by $6\\,000$ kr per quarter, so the interest decreases by $0.015 \\cdot 6\\,000 = 90$ kr per quarter: $3\\,600$, $3\\,510$, $3\\,420$, … , $180$, $90$ kr.\n\nPair up the first and the last interest, the second and the second to last and so on. Each pair is $3\\,600 + 90 = 3\\,690$ kr, and the 40 interest amounts form 20 pairs:\n\n$$ 20 \\cdot 3\\,690 = 73\\,800\\ \\mathrm{kr} $$\n\nThe same thing with the mean: the interest is on average $\\dfrac{3\\,600 + 90}{2} = 1\\,845$ kr per quarter, and $40 \\cdot 1\\,845 = 73\\,800$ kr.\n\nReasonable? The debt is on average roughly half the loan, $120\\,000$ kr, and $6\\ \\%$ of that for 10 years is $72\\,000$ kr. That is close.\n\n**Answer:** 73 800 kr\n\n**General conclusion:** with straight-line amortisation the interest falls by the same amount each time. The total interest is then the number of payments times the mean of the first and the last interest."
   },
   {
    "level": 3,
    "question": "Nora takes out a payday loan (a quick text-message loan) of $2\\,000$ kr. The loan is to be paid back after one month, and the monthly interest rate is $15\\ \\%$. When the month is over, Nora cannot afford to pay, so she takes out a new payday loan with the same terms on the whole amount she owes. She continues like this every month.<br>a) How large is the debt after half a year?<br>b) After how many months has the debt for the first time become more than five times as large as the first loan?",
    "answer": {
     "value": 12,
     "unit": "months"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4626,
      "unit": "kr",
      "tol": 0.002
     },
     {
      "del": "b",
      "value": 12,
      "unit": "months"
     }
    ],
    "solution": "**The key insight:** each new loan covers the whole previous debt, including the interest. The debt therefore grows by the same change factor, $1.15$, every month, like compound interest.\n\n**a)** After 6 months the total change factor is $1.15^6$:\n\n$$ 2\\,000 \\cdot 1.15^6 = 4\\,626.1\\ldots\\ \\mathrm{kr} $$\n\n**Answer:** About 4 626 kr\n\n**b)** The debt is five times as large as the first loan when the total change factor is greater than 5. We look for the smallest $n$ where $1.15^n > 5$ and try:\n\n$$ 1.15^{11} = 4.65\\ldots \\qquad 1.15^{12} = 5.35\\ldots $$\n\nAfter 11 months the debt is $2\\,000 \\cdot 4.65 \\approx 9\\,305$ kr, and after 12 months $2\\,000 \\cdot 5.35 \\approx 10\\,701$ kr.\n\n**Answer:** After 12 months\n\n**General conclusion:** a monthly interest rate that sounds manageable becomes enormous over a year, since the factors are multiplied. $15\\ \\%$ a month corresponds to an increase of $435\\ \\%$ in a year, not $12 \\cdot 15\\ \\% = 180\\ \\%$."
   },
   {
    "level": 3,
    "question": "Sam borrows $180\\,000$ kr with straight-line amortisation every month for 5 years. The annual interest rate is $4.2\\ \\%$. How much smaller is the last payment than the first?",
    "answer": {
     "value": 619.5,
     "unit": "kr",
     "tol": 0.002
    },
    "solution": "**The key insight:** with straight-line amortisation the amortisation is the same every month. The difference between two payments therefore depends only on the interest, and the interest depends only on the debt.\n\nThe loan is paid with $5 \\cdot 12 = 60$ payments, and the amortisation per month is\n\n$$ \\frac{180\\,000}{60} = 3\\,000\\ \\mathrm{kr} $$\n\nAt the first payment the debt is $180\\,000$ kr. At the last, only the last amortisation, $3\\,000$ kr, remains. The difference in debt is\n\n$$ 180\\,000 - 3\\,000 = 177\\,000\\ \\mathrm{kr} $$\n\nThe interest for one month is $\\dfrac{4.2\\ \\%}{12}$ of the debt, so the difference in interest is\n\n$$ \\frac{0.042 \\cdot 177\\,000}{12} = 619.5\\ \\mathrm{kr} $$\n\nCheck: the first interest is $\\dfrac{0.042 \\cdot 180\\,000}{12} = 630$ kr and the last $\\dfrac{0.042 \\cdot 3\\,000}{12} = 10.5$ kr. The first payment is $3\\,630$ kr and the last $3\\,010.50$ kr, and $3\\,630 - 3\\,010.50 = 619.50$ kr.\n\n**Answer:** 619.50 kr smaller\n\n**General conclusion:** by seeing that the amortisation cancels out, it is enough to calculate with the difference in debt. It is often faster to calculate directly with what differs than to work out both values."
   },
   {
    "level": 3,
    "question": "A loan is paid with straight-line amortisation every month. The amortisation is $2\\,500$ kr per month. The second payment is $25$ kr smaller than the first, and the first payment is $4\\,500$ kr.<br>a) What is the annual interest rate of the loan?<br>b) How large is the loan?",
    "answer": {
     "value": 200000,
     "unit": "kr",
     "tol": 0.001
    },
    "delsvar": [
     {
      "del": "a",
      "value": 12,
      "unit": "%"
     },
     {
      "del": "b",
      "value": 200000,
      "unit": "kr",
      "tol": 0.001
     }
    ],
    "solution": "**The key insight:** between two payments the debt has decreased by one amortisation. The difference of 25 kr is therefore the monthly interest on $2\\,500$ kr, and then the interest rate can be solved for. After that, the interest in the first payment reveals how large the debt was at the start.\n\n**a)** Let the annual interest rate in decimal form be $r$. The interest for one month is $\\dfrac{r}{12}$ of the debt. The debt has decreased by $2\\,500$ kr, so the interest has decreased by\n\n$$ \\frac{r}{12} \\cdot 2\\,500 = 25 $$\n\nMultiply both sides by 12:\n\n$$ \\frac{r}{12} \\cdot 2\\,500 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{12} = 25 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{12} $$\n\n$$ 2\\,500r = 300 $$\n\nDivide both sides by $2\\,500$:\n\n$$ \\frac{2\\,500r}{\\boldsymbol{2\\,500}} = \\frac{300}{\\boldsymbol{2\\,500}} $$\n\n$$ r = 0.12 $$\n\n**Answer:** 12 %\n\n**b)** The first payment is amortisation plus interest. The interest is therefore\n\n$$ 4\\,500 - 2\\,500 = 2\\,000\\ \\mathrm{kr} $$\n\nThe monthly interest is $\\dfrac{12\\ \\%}{12} = 1\\ \\%$ of the debt, and at the first payment the debt is the whole loan $L$:\n\n$$ 0.01L = 2\\,000 $$\n\nDivide both sides by $0.01$:\n\n$$ \\frac{0.01L}{\\boldsymbol{0.01}} = \\frac{2\\,000}{\\boldsymbol{0.01}} $$\n\n$$ L = 200\\,000 $$\n\nCheck: at the second payment the debt is $197\\,500$ kr and the interest $1\\,975$ kr, so the payment is $4\\,475$ kr, which is 25 kr less than $4\\,500$ kr.\n\n**Answer:** 200 000 kr\n\n**General conclusion:** with straight-line amortisation the payment decreases by the same amount each time, namely the interest on one amortisation. That means the interest rate can be read off directly from two payments."
   },
   {
    "level": 3,
    "question": "A loan of $120\\,000$ kr is to be paid with straight-line amortisation every month, and the annual interest rate is $5\\ \\%$. How much more interest do you pay in total if the amortisation period is 10 years instead of 5 years?",
    "answer": {
     "value": 15000,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "**The key insight:** the interest falls by the same amount every month, so the total interest is the number of payments times the mean of the first and the last interest. The first interest is the same in both cases, but the loan remains twice as long.\n\nThe monthly interest is $\\dfrac{5\\ \\%}{12}$ of the debt. The first interest is in both cases\n\n$$ \\frac{0.05 \\cdot 120\\,000}{12} = 500\\ \\mathrm{kr} $$\n\n**5 years:** 60 payments with the amortisation $\\dfrac{120\\,000}{60} = 2\\,000$ kr. The last interest is on the debt $2\\,000$ kr:\n\n$$ \\frac{0.05 \\cdot 2\\,000}{12} = 8.33\\ldots\\ \\mathrm{kr} $$\n\n$$ \\text{total interest} = 60 \\cdot \\frac{500 + 8.33\\ldots}{2} = 15\\,250\\ \\mathrm{kr} $$\n\n**10 years:** 120 payments with the amortisation $\\dfrac{120\\,000}{120} = 1\\,000$ kr. The last interest is on the debt $1\\,000$ kr:\n\n$$ \\frac{0.05 \\cdot 1\\,000}{12} = 4.166\\ldots\\ \\mathrm{kr} $$\n\n$$ \\text{total interest} = 120 \\cdot \\frac{500 + 4.166\\ldots}{2} = 30\\,250\\ \\mathrm{kr} $$\n\nThe difference:\n\n$$ 30\\,250 - 15\\,250 = 15\\,000\\ \\mathrm{kr} $$\n\nReasonable? The debt is on average roughly half the loan, $60\\,000$ kr. Five extra years at $5\\ \\%$ interest on that is $5 \\cdot 0.05 \\cdot 60\\,000 = 15\\,000$ kr.\n\n**Answer:** 15 000 kr more\n\n**General conclusion:** with straight-line amortisation the total interest is almost exactly the annual interest on half the loan times the number of years. Double the amortisation period therefore gives roughly double the interest cost."
   },
   {
    "level": 3,
    "question": "Elias borrows $30\\,000$ kr. The interest is $1\\ \\%$ per month on the current debt. Each month he pays $2\\,000$ kr, and of that the interest goes first and then the rest to amortisation. The last payment is only as large as needed to make the debt 0.<br>a) How many payments are needed?<br>b) How large is the total interest cost? Round to whole kronor.",
    "answer": {
     "value": 2668,
     "unit": "kr",
     "tol": 0.001
    },
    "delsvar": [
     {
      "del": "a",
      "value": 17,
      "unit": "payments"
     },
     {
      "del": "b",
      "value": 2668,
      "unit": "kr",
      "tol": 0.001
     }
    ],
    "solution": "**The key insight:** here the payment is fixed, not the amortisation. The interest takes part of each payment, and that part shrinks when the debt shrinks, so the amortisation grows each month. Each month, \"the debt times $1.01$, minus $2\\,000$\" applies.\n\n**a)** In a spreadsheet with $30\\,000$ in B2 and `=B2*1.01-2000` in B3, downwards:\n\n| Payment | Interest (kr) | Debt after the payment (kr) |\n| --- | --- | --- |\n| 1 | 300.00 | 28 300.00 |\n| 2 | 283.00 | 26 583.00 |\n| 3 | 265.83 | 24 848.83 |\n| … | … | … |\n| 15 | 45.89 | 2 635.28 |\n| 16 | 26.35 | 661.63 |\n| 17 | 6.62 | 0 |\n\nAfter 16 payments, $661.63$ kr remains. The 17th payment becomes\n\n$$ 661.63 \\cdot 1.01 = 668.25\\ \\mathrm{kr} $$\n\nand after that the loan is paid.\n\n**Answer:** 17 payments\n\n**b)** Elias makes 16 whole payments and a last one of $668.25$ kr:\n\n$$ 16 \\cdot 2\\,000 + 668.25 = 32\\,668.25\\ \\mathrm{kr} $$\n\nThe total interest cost is what he has paid minus what he borrowed:\n\n$$ 32\\,668.25 - 30\\,000 = 2\\,668.25\\ \\mathrm{kr} $$\n\nReasonable? Without interest, 15 payments would have been enough. The interest is 300 kr per month at the start and then falls, so just over 2 600 kr in 17 months is reasonable.\n\n**Answer:** About 2 668 kr\n\n**General conclusion:** the total interest cost is always the total paid minus the amount borrowed, regardless of how the loan is paid off. It is a quick way to avoid adding up all the interest amounts."
   },
   {
    "level": 3,
    "question": "Linnea is going to borrow $100\\,000$ kr for 2 years with straight-line amortisation every month. Bank A offers an annual interest rate of $6\\ \\%$ without fees. Bank B offers an annual interest rate of $5.5\\ \\%$, but charges a fee of $1\\,000$ kr when the loan is taken out and a fee of $25$ kr for each payment. Which bank is cheapest, and how much cheaper is it? Round to whole kronor.",
    "answer": {
     "value": 1079,
     "unit": "kr",
     "tol": 0.001
    },
    "solution": "**The key insight:** both loans have the same debt every month, since the amortisation is the same. The interest in both banks is therefore calculated on the same debts, and the sum of the debts only needs to be worked out once.\n\nThe loan is paid with 24 payments and the amortisation is $\\dfrac{100\\,000}{24}$ kr per month. The debt at the payments is 24, 23, 22, … , 1 amortisations. The sum $24 + 23 + \\ldots + 1$ becomes 12 pairs that are each $24 + 1 = 25$, that is, $12 \\cdot 25 = 300$. The sum of all the debts is\n\n$$ 300 \\cdot \\frac{100\\,000}{24} = 1\\,250\\,000\\ \\mathrm{kr} $$\n\n**Bank A:** the monthly interest is $\\dfrac{6\\ \\%}{12} = 0.5\\ \\%$ of the debt:\n\n$$ 0.005 \\cdot 1\\,250\\,000 = 6\\,250\\ \\mathrm{kr} $$\n\n**Bank B:** the monthly interest is $\\dfrac{5.5\\ \\%}{12}$ of the debt, and on top of that come the fees $1\\,000$ kr and $24 \\cdot 25 = 600$ kr:\n\n$$ \\frac{0.055}{12} \\cdot 1\\,250\\,000 = 5\\,729.17\\ \\mathrm{kr} $$\n\n$$ 5\\,729.17 + 1\\,000 + 600 = 7\\,329.17\\ \\mathrm{kr} $$\n\nThe difference:\n\n$$ 7\\,329.17 - 6\\,250 = 1\\,079.17\\ \\mathrm{kr} $$\n\nThe lower interest rate at bank B saves $6\\,250 - 5\\,729.17 = 520.83$ kr, but the fees cost $1\\,600$ kr.\n\n**Answer:** Bank A is cheapest, about 1 079 kr cheaper.\n\n**General conclusion:** always compare the total cost, interest plus all fees. Half a percent lower interest on a loan that is on average $52\\,000$ kr for two years is worth just over 500 kr, and that is easily eaten up by fixed fees."
   }
  ]
 }
});
