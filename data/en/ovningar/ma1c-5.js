/* Engelsk översättning av ovningar (ma1c-5). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "ma1c-5.1": {
  "kalla": "3df27efae3",
  "data": [
   {
    "level": 1,
    "question": "What is it called when data are collected from an ENTIRE population?",
    "choices": [
     "Non-response",
     "Systematic sampling",
     "Census",
     "Sample survey"
    ],
    "correct": 2,
    "solution": "If the whole population is studied, it is a **census**: exact but time-consuming. If only part of it is studied, it is a **sample survey**.\n\n**Answer:** Census"
   },
   {
    "level": 1,
    "question": "Elin picks every fifth name from a class list for her survey. Which sampling method is she using?",
    "choices": [
     "Stratified sampling",
     "Simple random sampling",
     "Systematic sampling",
     "Census"
    ],
    "correct": 2,
    "solution": "A fixed system (\"every fifth\") is **systematic sampling**. Note that it is NOT random, unless the order of the list has been randomised beforehand.\n\n**Answer:** Systematic sampling"
   },
   {
    "level": 1,
    "question": "Which of the following questions is BEST designed for a questionnaire about mathematics?",
    "choices": [
     "\"What do you think about mathematics?\"",
     "\"Mathematics is a fun subject, isn't it?\"",
     "\"Is mathematics a fun subject?\"",
     "\"Do you agree that mathematics is important and fun?\""
    ],
    "correct": 0,
    "solution": "A good survey question is neutral and does not steer the respondent. \"Mathematics is a fun subject, isn't it?\" is very leading, \"Is mathematics a fun subject?\" is leading, and the double question about \"important and fun\" cannot be answered unambiguously.\n\n**Answer:** \"What do you think about mathematics?\""
   },
   {
    "level": 2,
    "question": "At a school, 60 % of the students are girls. Hamid makes a stratified sample of 50 students for a questionnaire about sports habits. How many girls should be included in the sample?",
    "answer": {
     "value": 30,
     "unit": ""
    },
    "solution": "In stratified sampling the sample should reflect the population: 60 % of 50 students.\n\n$$ 0.60 \\cdot 50 = 30 $$\n\n**Answer:** 30 girls (and 20 boys)"
   },
   {
    "level": 2,
    "question": "A questionnaire was sent to 500 people and 450 replied. How large was the non-response as a percentage?",
    "answer": {
     "value": 10,
     "unit": "%"
    },
    "solution": "The non-response is $500 - 450 = 50$ people out of 500 sent:\n\n$$ \\frac{50}{500} = 0.10 = 10\\ \\% $$\n\n**Answer:** 10 %"
   },
   {
    "level": 3,
    "question": "In a factory, boxes of chocolates are packed by four machines, A, B, C and D. The boxes end up on the same conveyor belt in the order A, B, C, D, A, B, C, D and so on, and are numbered 1, 2, 3 … in the order they arrive. Quality control uses systematic sampling: every 20th box (number 20, 40, 60 …) is checked. Almost no faults are found, and the conclusion is that all four machines work well.<br>a) Which machine packed boxes number 20, 40 and 60? What proportion of the checked boxes come from machine A? Give the proportion as a percentage.<br>b) The checks switch to every 6th box. How many of the four machines are then checked?<br>c) Which step lengths from 2 to 10 mean that all four machines are checked? Explain why.",
    "answer": {
     "value": 2,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0,
      "unit": "%",
      "etikett": "proportion from machine A"
     },
     {
      "del": "b",
      "value": 2,
      "unit": "",
      "etikett": "number of machines"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** systematic sampling is not random. If the list has a repeating pattern, and the step length fits the pattern, the sample lands in the same place in the pattern every time.\n\n**a)** The pattern repeats after 4 boxes. Which machine a box comes from is therefore decided by the remainder when the box number is divided by 4:\n\n| Remainder when divided by 4 | 1 | 2 | 3 | 0 |\n| --- | --- | --- | --- | --- |\n| Machine | A | B | C | D |\n\nThe numbers 20, 40 and 60 are all divisible by 4, so the remainder is 0 every time. This holds for every multiple of 20, since $20 = 5 \\cdot 4$.\n\nSo all the checked boxes come from machine D, and none from A, B or C. The fact that almost no faults are found only tells us something about machine D.\n\n**Answer:** All three come from machine D. The proportion from machine A is 0&nbsp;%.\n\n**b)** With step length 6, boxes 6, 12, 18, 24 … are checked. The remainders when divided by 4:\n\n| Box | 6 | 12 | 18 | 24 |\n| --- | --- | --- | --- | --- |\n| Remainder | 2 | 0 | 2 | 0 |\n| Machine | B | D | B | D |\n\nThe remainders alternate between 2 and 0, since two steps of 6 make 12, which is divisible by 4. Only B and D are checked.\n\n**Answer:** 2 machines\n\n**c)** We test each step length from 2 to 10:\n\n| Step length | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Machines checked | B, D | all | D | all | B, D | all | D | all | B, D |\n\nThe odd step lengths reach all the machines. An even step always moves an even number of places in the pattern, so the sample gets stuck on the even places B and D (or only on D, if the step is divisible by 4). An odd step has no common factor with 4 and therefore cycles through all four places.\n\n**Answer:** The step lengths 3, 5, 7 and 9, that is, the odd ones. The even step lengths have a common factor with the pattern length 4 and skip some machines.\n\n**General conclusion:** systematic sampling can give a serious sampling error if the list has a pattern. The safe approach is to randomise the sample, or the order of the list, before choosing every *n*th."
   },
   {
    "level": 3,
    "question": "A school has two programmes, natural science and social science. The social science programme has 250 more students than the natural science programme. Lina makes a stratified sample by programme with 80 students, and her sample includes 32 students from the natural science programme.<br>a) What proportion of the school's students are on the natural science programme? Give the answer as a percentage.<br>b) How many students are on each programme?<br>c) Hugo instead chooses 40 students from each programme. Which programme is over-represented in his sample, and by how many students compared with Lina's sample?",
    "answer": {
     "value": 500,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 40,
      "unit": "%",
      "etikett": "proportion natural science"
     },
     {
      "del": "b",
      "value": 500,
      "unit": "",
      "etikett": "natural science programme"
     },
     {
      "del": "b",
      "value": 750,
      "unit": "",
      "etikett": "social science programme"
     },
     {
      "del": "c",
      "value": 8,
      "unit": "",
      "etikett": "more students"
     }
    ],
    "solution": "**The insight:** a stratified sample reflects the population. The proportions in the sample are therefore the same as the proportions in the whole school, and that gives an equation working backwards from the sample to the population.\n\n**a)** In a stratified sample, the proportion from a programme is the same in the sample as in the school:\n\n$$ \\frac{32}{80} = 0.40 = 40\\ \\% $$\n\n**Answer:** 40&nbsp;%\n\n**b)** Call the number of students on the natural science programme $x$. The social science programme then has $x + 250$ students, and the whole school has\n\n$$ x + (x + 250) = 2x + 250 $$\n\nThe proportion of natural science students in the whole school is 0.40 according to a):\n\n$$ \\frac{x}{2x + 250} = 0.4 $$\n\n$$ \\frac{x}{2x + 250} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{(2x + 250)} = 0.4 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{(2x + 250)} $$\n\n$$ x = 0.8x + 100 $$\n\n$$ x \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.8x} = 0.8x + 100 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.8x} $$\n\n$$ 0.2x = 100 $$\n\n$$ \\frac{0.2x}{\\boldsymbol{0.2}} = \\frac{100}{\\boldsymbol{0.2}} $$\n\n$$ x = 500 $$\n\nThe natural science programme has 500 students and the social science programme $500 + 250 = 750$, so 1&nbsp;250 students in total.\n\nCheck: the sample is $\\dfrac{80}{1\\,250} = 0.064$ of the school. The same proportion of each programme gives $0.064 \\cdot 500 = 32$ and $0.064 \\cdot 750 = 48$, and $32 + 48 = 80$. Correct.\n\n**Answer:** 500 students on the natural science programme and 750 on the social science programme.\n\n**c)** Lina's stratified sample has 32 from natural science and 48 from social science. Hugo takes 40 from each programme, so\n\n$$ 40 - 32 = 8 $$\n\nstudents too many from the natural science programme and as many too few from the social science programme. If the programmes answer the question being studied differently, the natural science programme's answers get too much weight in Hugo's result.\n\n**Answer:** The natural science programme is over-represented, by 8 students more than in Lina's sample.\n\n**General conclusion:** in a stratified sample, the sample is a scaled-down picture of the population. If you know the sample and a relationship between the groups, you can therefore work out how large the groups are."
   },
   {
    "level": 3,
    "question": "The student council at a school with 600 students randomly divided all the students into two groups of 300. Each group was given its own version of the same question.<br>Group 1: \"Should the school spend more money on sport?\" There, 210 answered yes.<br>Group 2: \"Should the school spend more money on sport, even if it means less money for teaching materials?\" There, 120 answered yes.<br>a) Calculate the proportion of yes answers in each group. Give the answers as percentages.<br>b) Explain why the difference between the groups cannot be due to sampling error. Which source of error does the survey show?<br>c) The student council combines the answers and writes: \"A majority of the students want to spend more on sport.\" Calculate the combined proportion and examine the claim.",
    "answer": {
     "value": 55,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 70,
      "unit": "%",
      "etikett": "group 1"
     },
     {
      "del": "a",
      "value": 40,
      "unit": "%",
      "etikett": "group 2"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 55,
      "unit": "%",
      "etikett": "combined proportion"
     }
    ],
    "solution": "**The insight:** when two groups are drawn by lot from the same population, they become more or less identical. The only thing that systematically separates them is the wording of the question, so a large difference in the answers shows how much the wording matters.\n\n**a)** The proportion of yes answers is the number of yes answers divided by the number in the group:\n\n$$ \\text{Group 1:} \\quad \\frac{210}{300} = 0.70 = 70\\ \\% $$\n\n$$ \\text{Group 2:} \\quad \\frac{120}{300} = 0.40 = 40\\ \\% $$\n\n**Answer:** 70&nbsp;% in group 1 and 40&nbsp;% in group 2.\n\n**b)** A sampling error means that the sample does not represent the population. Here the whole population is included, and the groups are drawn by lot, so both groups reflect the school equally well. Two randomly drawn groups of 300 students do not differ by 30 percentage points by chance. The difference must come from the questions being different.\n\nIt is a **measurement error**. The first question mentions only the benefit and leads the respondent towards a yes. The second also says what the investment costs.\n\n**Answer:** The groups are drawn by lot and therefore alike, so the difference is due to the wording of the questions. It is a measurement error caused by a leading question.\n\n**c)** In total, $210 + 120 = 330$ of 600 students answered yes:\n\n$$ \\frac{330}{600} = 0.55 = 55\\ \\% $$\n\nThe figure 55&nbsp;% is an average of the answers to two different questions, and it depends entirely on how many happened to get each version. If everyone had got question 1 the result would have been 70&nbsp;%; if everyone had got question 2 it would have been 40&nbsp;%. The only conclusion the survey allows is that the answer depends on how the question is asked: when the cost is mentioned, only 40&nbsp;% say yes, so there is no majority.\n\n**Answer:** The combined proportion is 55&nbsp;%, but it means nothing, since it mixes answers to two different questions. The claim does not hold.\n\n**General conclusion:** drawing two groups by lot and giving them different versions of a question is a way of measuring how leading a wording is. The answers may then be compared, but not combined."
   },
   {
    "level": 3,
    "question": "An app has been downloaded 10&nbsp;000 times, but only 4&nbsp;000 people still use it. The others have deleted it. The company puts a questionnaire in the app, and 800 users reply. Of these, 720 are satisfied with the app. In an advert the company writes: \"9 out of 10 who downloaded our app are satisfied.\"<br>a) What proportion of the respondents are satisfied? Give the answer as a percentage.<br>b) Which population do the respondents actually represent? Explain why the advert's claim is based on a sampling error.<br>c) Assume that the 800 respondents are representative of the 4&nbsp;000 who still use the app, and that none of those who deleted the app are satisfied. What proportion of everyone who downloaded the app is then satisfied? Give the answer as a percentage.",
    "answer": {
     "value": 36,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 90,
      "unit": "%",
      "etikett": "proportion satisfied among the respondents"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 36,
      "unit": "%",
      "etikett": "proportion satisfied of everyone"
     }
    ],
    "solution": "**The insight:** the questionnaire only reaches those who are still using the app. The dissatisfied have often already deleted it, so they can never be included in the sample.\n\n**a)** The proportion satisfied among the respondents is the number satisfied divided by the number of respondents:\n\n$$ \\frac{720}{800} = 0.90 = 90\\ \\% $$\n\n**Answer:** 90&nbsp;%\n\n**b)** The questionnaire is in the app, so only the 4&nbsp;000 who still use it can reply. The respondents therefore represent the current users, not all 10&nbsp;000 who downloaded the app.\n\nThe 6&nbsp;000 who deleted the app probably did so because they were not satisfied. That group would probably answer quite differently, but is completely missing from the sample. The advert draws a conclusion about the whole population from a sample that systematically excludes the dissatisfied, and that is a sampling error.\n\n**Answer:** The respondents represent only the current users. Everyone who deleted the app, probably the most dissatisfied, cannot reply, so the sample does not reflect everyone who downloaded the app.\n\n**c)** If 90&nbsp;% of the 4&nbsp;000 current users are satisfied, the number satisfied is\n\n$$ 0.90 \\cdot 4\\,000 = 3\\,600 $$\n\nNone of the 6&nbsp;000 who deleted the app count as satisfied. The proportion satisfied of everyone who downloaded the app is then\n\n$$ \\frac{3\\,600}{10\\,000} = 0.36 = 36\\ \\% $$\n\n**Answer:** 36&nbsp;%\n\n**General conclusion:** the same 720 satisfied answers can thus correspond to 90&nbsp;% or 36&nbsp;% depending on which population you calculate against. Always ask: who could be included in the sample at all, and who dropped out before the survey began?"
   },
   {
    "level": 3,
    "question": "A school has 300 students in year 1, 200 in year 2 and 100 in year 3.<br>a) A stratified sample of 60 students is to be made by year. How many students should be chosen from each year?<br>b) The school instead chose 20 students from each year and asked \"Are you satisfied with the school meals?\". In year 1, 15 answered yes, in year 2, 10 answered yes and in year 3, 4 answered yes. What proportion of the 60 asked answered yes? Round to the nearest whole per cent.<br>c) Estimate what proportion of all 600 students are satisfied, taking into account how many students there are in each year. Give the answer as a percentage. Explain why the answer differs from the answer in b).",
    "answer": {
     "value": 57.5,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 30,
      "unit": "",
      "etikett": "year 1"
     },
     {
      "del": "a",
      "value": 20,
      "unit": "",
      "etikett": "year 2"
     },
     {
      "del": "a",
      "value": 10,
      "unit": "",
      "etikett": "year 3"
     },
     {
      "del": "b",
      "value": 48,
      "unit": "%",
      "etikett": "proportion yes",
      "tol": 0.02
     },
     {
      "del": "c",
      "value": 57.5,
      "unit": "%",
      "etikett": "proportion satisfied"
     }
    ],
    "solution": "**The insight:** when the groups in the sample are not the same size as in the population, you cannot just combine the answers. Each group's proportion must be weighted by how large the group is in the population.\n\n**a)** A stratified sample should reflect the population. Year 1 is $\\dfrac{300}{600} = 0.5$ of the school, year 2 is $\\dfrac{200}{600} = \\dfrac{1}{3}$ and year 3 is $\\dfrac{100}{600} = \\dfrac{1}{6}$. The same proportions of 60 students:\n\n$$ 0.5 \\cdot 60 = 30 \\qquad \\frac{1}{3} \\cdot 60 = 20 \\qquad \\frac{1}{6} \\cdot 60 = 10 $$\n\n**Answer:** 30 students from year 1, 20 from year 2 and 10 from year 3.\n\n**b)** In total, $15 + 10 + 4 = 29$ of 60 answered yes:\n\n$$ \\frac{29}{60} = 0.4833\\ldots \\approx 48\\ \\% $$\n\n**Answer:** 48&nbsp;%\n\n**c)** First the proportion satisfied in each year:\n\n$$ \\frac{15}{20} = 0.75 \\qquad \\frac{10}{20} = 0.50 \\qquad \\frac{4}{20} = 0.20 $$\n\nIf the proportions apply to the whole year group, the number of satisfied students is\n\n$$ 0.75 \\cdot 300 + 0.50 \\cdot 200 + 0.20 \\cdot 100 = 225 + 100 + 20 = 345 $$\n\nand the proportion satisfied of all 600\n\n$$ \\frac{345}{600} = 0.575 = 57.5\\ \\% $$\n\nIn b), year 3 weighs as much as year 1, even though year 3 has only a third as many students. Year 3 is the least satisfied, so it gets too much weight and pulls the result down. In c), each year is weighted by its size.\n\n**Answer:** About 57.5&nbsp;%. The answer in b) is too low, since the least satisfied year is over-represented in the sample.\n\n**General conclusion:** a sample with equally many from each group gives a false picture of the whole when the groups are of different sizes. Either you make a stratified sample from the start, or you weight the answers afterwards."
   },
   {
    "level": 3,
    "question": "A municipality sends a questionnaire to 1&nbsp;200 residents with the question \"Do you want the municipality to build more cycle paths?\". The options are yes and no. Among those who reply, 60&nbsp;% say yes.<br>a) Assume that the non-response is 300 people. Between which values can the proportion of yes among all 1&nbsp;200 lie if the non-response is taken into account? Give the limits as percentages.<br>b) What is the largest non-response allowed if the municipality is to be able to say with certainty that at least half of all 1&nbsp;200 asked want more cycle paths? Give the answer as a number of people.<br>c) The proportion of yes among the respondents is $p$ and the non-response is the proportion $b$ of everyone asked. Show that the conclusion in b) is certain when $b \\leq 1 - \\dfrac{0.5}{p}$, regardless of how many were asked.",
    "answer": {
     "value": 200,
     "unit": "people"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 45,
      "unit": "%",
      "etikett": "lower limit"
     },
     {
      "del": "a",
      "value": 70,
      "unit": "%",
      "etikett": "upper limit"
     },
     {
      "del": "b",
      "value": 200,
      "unit": "people",
      "etikett": "largest non-response"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the certain conclusion is the one that holds even in the worst case, that is, when nobody in the non-response says yes. The problem is then turned around: instead of calculating the limits, we look for the non-response at which the lower limit is exactly 50&nbsp;%.\n\n**a)** The number who replied is $1\\,200 - 300 = 900$, and 60&nbsp;% of them say yes:\n\n$$ 0.60 \\cdot 900 = 540 $$\n\nThe lower limit is obtained if nobody in the non-response says yes:\n\n$$ \\frac{540}{1\\,200} = 0.45 = 45\\ \\% $$\n\nThe upper limit is obtained if all 300 in the non-response say yes:\n\n$$ \\frac{540 + 300}{1\\,200} = \\frac{840}{1\\,200} = 0.70 = 70\\ \\% $$\n\n**Answer:** Between 45&nbsp;% and 70&nbsp;%.\n\n**b)** At least half of 1&nbsp;200 is 600 people. Even in the worst case, when nobody in the non-response says yes, at least 600 of the respondents must therefore say yes. Call the number of respondents $x$. The limiting case is\n\n$$ 0.6x = 600 $$\n\n$$ \\frac{0.6x}{\\boldsymbol{0.6}} = \\frac{600}{\\boldsymbol{0.6}} $$\n\n$$ x = 1\\,000 $$\n\nSo at least 1&nbsp;000 people must reply, and the non-response may be at most\n\n$$ 1\\,200 - 1\\,000 = 200 $$\n\nCheck: with 200 in the non-response, 1&nbsp;000 reply, and $0.6 \\cdot 1\\,000 = 600$, which is exactly half of 1&nbsp;200.\n\n**Answer:** At most 200 people, which is about 16.7&nbsp;% of those asked.\n\n**c)** Call the number asked $N$. Then $(1 - b) \\cdot N$ people reply, and of them $p \\cdot (1 - b) \\cdot N$ say yes. In the worst case these are all the yes answers, and they must be at least half of everyone asked:\n\n$$ p \\cdot (1 - b) \\cdot N \\geq 0.5 \\cdot N $$\n\nBoth sides are divided by the positive number $N$, and the inequality sign is kept:\n\n$$ \\frac{p \\cdot (1 - b) \\cdot N}{\\boldsymbol{N}} \\geq \\frac{0.5 \\cdot N}{\\boldsymbol{N}} $$\n\n$$ p \\cdot (1 - b) \\geq 0.5 $$\n\nThe proportion $p$ is also positive, so we can divide by it too without reversing the inequality sign:\n\n$$ \\frac{p \\cdot (1 - b)}{\\boldsymbol{p}} \\geq \\frac{0.5}{\\boldsymbol{p}} $$\n\n$$ 1 - b \\geq \\frac{0.5}{p} $$\n\n$$ 1 - b \\mathbin{\\boldsymbol{+}} \\boldsymbol{b} \\geq \\frac{0.5}{p} \\mathbin{\\boldsymbol{+}} \\boldsymbol{b} $$\n\n$$ 1 \\geq \\frac{0.5}{p} + b $$\n\n$$ 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{\\frac{0.5}{p}} \\geq \\frac{0.5}{p} + b \\mathbin{\\boldsymbol{-}} \\boldsymbol{\\frac{0.5}{p}} $$\n\n$$ 1 - \\frac{0.5}{p} \\geq b $$\n\n$N$ disappeared in the first step, so the condition holds however many were asked. Check with b): $p = 0.6$ gives $1 - \\dfrac{0.5}{0.6} = 0.1666\\ldots$, and $0.1666\\ldots \\cdot 1\\,200 = 200$.\n\n**Answer:** The conclusion is certain when $b \\leq 1 - \\dfrac{0.5}{p}$, and the condition does not contain $N$.\n\n**General conclusion:** the closer the proportion of yes among the respondents is to 50&nbsp;%, the less non-response the conclusion can tolerate. If $p = 0.5$, the limit becomes $b \\leq 0$: then everyone has to reply."
   },
   {
    "level": 3,
    "question": "A school wants to know what proportion of the students have ever cheated on a test. Since many people do not answer such a sensitive question honestly, the following method is used. Each student secretly tosses a coin. If the coin shows heads, the student answers the question \"Have you ever cheated on a test?\" honestly. If it shows tails, the student answers \"Yes\" regardless. Nobody except the student knows how the coin fell. 400 students take part and 260 answer yes.<br>a) Which source of error is the method trying to reduce? Explain why the method works.<br>b) Estimate the proportion of the students who have cheated. Assume that the coin shows tails for half of the students. Give the answer as a percentage.<br>c) The proportion of yes answers is $q$. Show that the estimate of the proportion who have cheated is $2q - 1$. What does it mean if $q$ is less than $0.5$?",
    "answer": {
     "value": 30,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 30,
      "unit": "%",
      "etikett": "proportion who have cheated"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** a single yes reveals nothing about the student, since it could just as well come from the coin. But in a large group we know roughly how many yes answers the coin accounts for, and can subtract them.\n\n**a)** On a sensitive question many people do not answer honestly, for fear of what the answer might lead to. The answers then become incorrect, and that is a **measurement error** (not a sampling error, since everyone in the sample actually replies).\n\nWith the coin, nobody can know whether a yes is honest or forced by tails. The student therefore risks nothing by answering truthfully, and has no reason to lie.\n\n**Answer:** Measurement error due to a sensitive question. Since a yes can come from the coin, no single answer reveals the student, and therefore everyone can answer honestly.\n\n**b)** Half of the 400 students, that is 200, get tails and answer yes regardless. The other 200 get heads and answer honestly. Call the number who answer yes after heads $x$:\n\n$$ 200 + x = 260 $$\n\n$$ 200 + x \\mathbin{\\boldsymbol{-}} \\boldsymbol{200} = 260 \\mathbin{\\boldsymbol{-}} \\boldsymbol{200} $$\n\n$$ x = 60 $$\n\nThe 200 who got heads are a random sample of the students, since the coin decided who they were. The proportion who have cheated among them is\n\n$$ \\frac{60}{200} = 0.30 = 30\\ \\% $$\n\nand that proportion is our estimate for all students.\n\n**Answer:** About 30&nbsp;%\n\n**c)** Call the number of students $N$ and the proportion who have cheated $p$. Half, $0.5N$, get tails and answer yes. The other half, $0.5N$, get heads, and of them the proportion $p$ answer yes, that is, $p \\cdot 0.5N$. The total number of yes answers is $q \\cdot N$:\n\n$$ 0.5N + 0.5pN = qN $$\n\nBoth sides are divided by $N$:\n\n$$ \\frac{0.5N + 0.5pN}{\\boldsymbol{N}} = \\frac{qN}{\\boldsymbol{N}} $$\n\n$$ 0.5 + 0.5p = q $$\n\n$$ 0.5 + 0.5p \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.5} = q \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.5} $$\n\n$$ 0.5p = q - 0.5 $$\n\n$$ 0.5p \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{2} = (q - 0.5) \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{2} $$\n\n$$ p = 2q - 1 $$\n\nCheck with b): $q = \\dfrac{260}{400} = 0.65$ gives $p = 2 \\cdot 0.65 - 1 = 0.30$. Correct.\n\nIf $q < 0.5$, then $2q - 1$ is negative, and a proportion cannot be negative. This can only happen if fewer than half got tails by chance, or if some students did not follow the instruction. The estimate is therefore uncertain, and the uncertainty shows most clearly when the true proportion is small.\n\n**Answer:** $p = 2q - 1$. If $q < 0.5$, the estimate becomes negative, which is impossible. It shows that chance or incorrect answers have affected the result.\n\n**General conclusion:** by deliberately mixing chance into each individual answer, the respondent is protected, but the group's proportion can still be calculated. The price is greater uncertainty: the survey needs more participants to be as reliable as an ordinary questionnaire with honest answers."
   }
  ]
 },
 "ma1c-5.2": {
  "kalla": "73812ad10d",
  "data": [
   {
    "level": 1,
    "question": "What is the interval called that you get when the result of a survey is given together with its margin of error?",
    "choices": [
     "Significance level",
     "Domain",
     "Confidence interval",
     "Sample"
    ],
    "correct": 2,
    "solution": "The result ± the margin of error gives the **confidence interval**: the interval in which the true value lies with 95 % certainty.\n\n**Answer:** Confidence interval"
   },
   {
    "level": 1,
    "question": "A survey gives the result 40 % with a margin of error of 5 %. What is the confidence interval?",
    "choices": [
     "Between 40 % and 45 %",
     "Between 35 % and 45 %",
     "Between 30 % and 50 %",
     "Exactly 40 %"
    ],
    "correct": 1,
    "solution": "The confidence interval is the result ± the margin of error:\n\n$$ 40\\ \\% - 5\\ \\% = 35\\ \\% \\qquad 40\\ \\% + 5\\ \\% = 45\\ \\% $$\n\n**Answer:** Between 35 % and 45 %."
   },
   {
    "level": 1,
    "question": "Calculate the margin of error when $p = 50\\ \\%$ and $n = 100$. Round to one decimal place.",
    "answer": {
     "value": 9.8,
     "unit": "%",
     "tol": 0.01
    },
    "solution": "Substitution into the formula:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{50(100 - 50)}{100}} = 1.96 \\cdot \\sqrt{25} = 1.96 \\cdot 5 = 9.8\\ \\% $$\n\n**Answer:** 9.8 %"
   },
   {
    "level": 2,
    "question": "In a survey with 400 respondents, 60 % answered yes. Calculate the margin of error. Round to one decimal place.",
    "answer": {
     "value": 4.8,
     "unit": "%",
     "tol": 0.01
    },
    "solution": "Substituting $p = 60$ and $n = 400$:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{60(100 - 60)}{400}} = 1.96 \\cdot \\sqrt{\\frac{2\\ 400}{400}} = 1.96 \\cdot \\sqrt{6} = 4.80\\ldots \\approx 4.8\\ \\% $$\n\nCompare with the example in the lesson ($n = 100$ gave 9.6 %): four times as many respondents halved the margin of error.\n\n**Answer:** 4.8 %"
   },
   {
    "level": 2,
    "question": "A party got 8.2 % in an opinion poll with a margin of error of 1.1 percentage points. In the next poll the party got 9.0 %. Is the increase statistically significant?",
    "choices": [
     "No. Opinion polls can never be significant",
     "Yes. 9.0 % is larger than 8.2 %",
     "No. 9.0 % lies within the confidence interval 7.1–9.3 %",
     "Yes. All changes over 0.5 percentage points are significant"
    ],
    "correct": 2,
    "solution": "The confidence interval around the first poll is $8.2\\ \\% \\pm 1.1\\ \\%$, that is, 7.1 % to 9.3 %. The new value 9.0 % lies WITHIN the interval, so the change may be due to chance.\n\n**Answer:** No, the change is not statistically significant."
   },
   {
    "level": 3,
    "question": "Two surveys each ask the same question to 1&nbsp;000 randomly selected people. Survey A is carried out in a municipality with 20&nbsp;000 residents and survey B in the whole of Sweden, with just over 10 million residents. Both get the result 40&nbsp;%. Which statement is correct according to the formula for the margin of error?",
    "choices": [
     "B has a much larger margin of error, since 1&nbsp;000 people is a much smaller part of Sweden's population than of the municipality's",
     "The margins of error are equal, since the margin of error depends only on the proportion $p$ and the sample size $n$",
     "A has a larger margin of error, since a small municipality gives a less reliable result",
     "The margins of error cannot be compared without knowing how many residents have answered yes"
    ],
    "correct": 1,
    "solution": "**The insight:** the size of the population is not in the formula. What decides how reliable the result is, is how many people are asked, not how large a part of the population they make up.\n\nThe formula for the margin of error contains only two quantities, the proportion $p$ as a percentage and the sample size $n$:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{p(100 - p)}{n}} $$\n\nBoth surveys have $p = 40$ and $n = 1\\ 000$:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{40(100 - 40)}{1\\ 000}} = 1.96 \\cdot \\sqrt{2.4} = 3.036\\ldots \\approx 3.0 $$\n\nSo both get a margin of error of 3.0 percentage points. That may feel wrong, but think of a soup: one spoonful is enough to taste the soup, and it makes no difference whether the pot is small or large, as long as the soup is well stirred. In the same way, 1&nbsp;000 randomly selected people are just as good for a whole country as for a municipality.\n\n**Answer:** The margins of error are equal, since the margin of error depends only on the proportion $p$ and the sample size $n$.\n\n**General conclusion:** a good sample needs to be randomly selected and large enough, but it does not need to be a particular proportion of the population."
   },
   {
    "level": 3,
    "question": "In the example in the lesson, $p = 60\\ \\%$ and $n = 100$ gave a margin of error of 9.6 percentage points. The proportion $p$ is assumed to be the same in new surveys.<br>a) How many people must be asked for the margin of error to be a quarter as large?<br>b) What is the smallest number of people that must be asked for the margin of error to be at most 2.0 percentage points?",
    "answer": {
     "value": 2305,
     "unit": "people"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1600,
      "unit": "people"
     },
     {
      "del": "b",
      "value": 2305,
      "unit": "people",
      "tol": 0.001
     }
    ],
    "solution": "**The insight:** $n$ is under the root sign in the denominator. The margin of error therefore decreases with the square root of the sample size, not at the same rate as the sample grows.\n\n**a)** If $n$ becomes sixteen times as large, $\\sqrt{n}$ becomes four times as large, since $\\sqrt{16} = 4$. Then the margin of error becomes a quarter as large. A sample that is 16 times as large as 100 people is\n\n$$ 16 \\cdot 100 = 1\\ 600 $$\n\nCheck: $f = 1.96 \\cdot \\sqrt{\\frac{60 \\cdot 40}{1\\ 600}} = 1.96 \\cdot \\sqrt{1.5} = 2.40\\ldots$, and $\\dfrac{9.6}{4} = 2.4$. Correct.\n\n**Answer:** 1&nbsp;600 people\n\n**b)** First we find which $n$ gives a margin of error of exactly 2.0 percentage points:\n\n$$ 1.96 \\cdot \\sqrt{\\frac{2\\ 400}{n}} = 2.0 $$\n\n$$ \\frac{1.96 \\cdot \\sqrt{\\dfrac{2\\ 400}{n}}}{\\boldsymbol{1.96}} = \\frac{2.0}{\\boldsymbol{1.96}} $$\n\n$$ \\sqrt{\\frac{2\\ 400}{n}} = 1.0204\\ldots $$\n\nWe square both sides to get rid of the root sign:\n\n$$ \\left(\\sqrt{\\frac{2\\ 400}{n}}\\right)^{\\boldsymbol{2}} = (1.0204\\ldots)^{\\boldsymbol{2}} $$\n\n$$ \\frac{2\\ 400}{n} = 1.0412\\ldots $$\n\n$$ \\frac{2\\ 400}{n} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{n} = 1.0412\\ldots \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{n} $$\n\n$$ 2\\ 400 = 1.0412\\ldots \\cdot n $$\n\n$$ \\frac{2\\ 400}{\\boldsymbol{1.0412\\ldots}} = \\frac{1.0412\\ldots \\cdot n}{\\boldsymbol{1.0412\\ldots}} $$\n\n$$ 2\\ 304.96 = n $$\n\nThe number of people must be a whole number. With 2&nbsp;304 people the margin of error is slightly larger than 2.0 ($f = 2.0004\\ldots$), since a smaller $n$ gives a larger margin of error. So we must round **up**, and with 2&nbsp;305 people $f = 1.99998\\ldots$, that is, at most 2.0 percentage points.\n\n**Answer:** At least 2&nbsp;305 people\n\n**General conclusion:** to halve the margin of error requires four times as many respondents, and to quarter it requires sixteen times as many. Precision is expensive, which is why opinion polls rarely have more than a few thousand respondents. When a minimum number is sought, always round up."
   },
   {
    "level": 3,
    "question": "In a survey of 1&nbsp;000 randomly selected adults, 40&nbsp;% answered that they cycle to work at least once a week. Among the 100 people aged 18 to 25, the proportion was 48&nbsp;%. A newspaper writes: \"Young people cycle more than average. The difference is 8 percentage points, and the survey's margin of error is only 3 percentage points.\"<br>a) Calculate the margin of error for the whole survey.<br>b) Calculate the margin of error for the group aged 18 to 25.<br>c) Examine the newspaper's conclusion. Is it statistically significant that young people cycle more than average?",
    "answer": {
     "value": 9.8,
     "unit": "percentage points"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3,
      "unit": "percentage points",
      "tol": 0.02
     },
     {
      "del": "b",
      "value": 9.8,
      "unit": "percentage points",
      "tol": 0.01
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the margin of error applies to the sample the result is based on. The result for the young people is based on only 100 people, not on 1&nbsp;000, and therefore has a much larger margin of error.\n\n**a)** The whole survey has $p = 40$ and $n = 1\\ 000$:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{40(100 - 40)}{1\\ 000}} = 1.96 \\cdot \\sqrt{2.4} = 3.036\\ldots \\approx 3.0 $$\n\n**Answer:** 3.0 percentage points\n\n**b)** The group aged 18 to 25 has $p = 48$ and $n = 100$:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{48(100 - 48)}{100}} = 1.96 \\cdot \\sqrt{24.96} = 9.792\\ldots \\approx 9.8 $$\n\n**Answer:** 9.8 percentage points\n\n**c)** The newspaper uses the margin of error for the whole survey on a result that is based on only 100 people. The correct confidence interval for the young people is the result plus and minus the margin of error from b):\n\n$$ \\left[\\begin{array}{l} \\text{Lower limit} = 48\\ \\% - 9.8\\ \\% = 38.2\\ \\% \\\\ \\text{Upper limit} = 48\\ \\% + 9.8\\ \\% = 57.8\\ \\% \\end{array}\\right. $$\n\nThe average 40&nbsp;% lies within the interval 38.2&nbsp;% to 57.8&nbsp;%. The difference of 8 percentage points is smaller than the margin of error of 9.8 percentage points, so it may be due to chance in which young people happened to be asked.\n\n**Answer:** No. The result for the young people has a margin of error of 9.8 percentage points, and the difference of 8 percentage points is smaller than that. It is not statistically significant that young people cycle more than average.\n\n**General conclusion:** when a survey is divided into smaller groups (age, gender, region), each group's margin of error is larger than that of the whole survey. This is a common trap in news reporting."
   },
   {
    "level": 3,
    "question": "In an opinion poll with 1&nbsp;200 respondents, party A got 24&nbsp;% and party B 21&nbsp;%. A newspaper writes: \"Party A is now larger than party B.\"<br>a) Calculate the margin of error for each of the parties.<br>b) Is it statistically significant that party A is larger than party B? Justify your answer using the confidence intervals.<br>c) Assume that the margins of error are the same as in a). What is the smallest number of percentage points the difference between the parties must be for the confidence intervals not to overlap?",
    "answer": {
     "value": 4.7,
     "unit": "percentage points"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2.4,
      "unit": "percentage points",
      "etikett": "party A",
      "tol": 0.02
     },
     {
      "del": "a",
      "value": 2.3,
      "unit": "percentage points",
      "etikett": "party B",
      "tol": 0.02
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 4.7,
      "unit": "percentage points",
      "tol": 0.02
     }
    ],
    "solution": "**The insight:** both results are uncertain. It is not enough to compare 24&nbsp;% with 21&nbsp;%; you have to compare the two intervals in which the parties' true support may lie.\n\n**a)** Party A has $p = 24$ and $n = 1\\ 200$:\n\n$$ f_A = 1.96 \\cdot \\sqrt{\\frac{24(100 - 24)}{1\\ 200}} = 1.96 \\cdot \\sqrt{1.52} = 2.416\\ldots \\approx 2.4 $$\n\nParty B has $p = 21$ and $n = 1\\ 200$:\n\n$$ f_B = 1.96 \\cdot \\sqrt{\\frac{21(100 - 21)}{1\\ 200}} = 1.96 \\cdot \\sqrt{1.3825} = 2.304\\ldots \\approx 2.3 $$\n\n**Answer:** Party A 2.4 percentage points&emsp;&emsp;Party B 2.3 percentage points\n\n**b)** The confidence intervals are the result plus and minus the margin of error:\n\n$$ \\left[\\begin{array}{l} \\text{Party A:}\\ 24\\ \\% \\pm 2.4\\ \\%,\\ \\text{from } 21.6\\ \\% \\text{ to } 26.4\\ \\% \\\\ \\text{Party B:}\\ 21\\ \\% \\pm 2.3\\ \\%,\\ \\text{from } 18.7\\ \\% \\text{ to } 23.3\\ \\% \\end{array}\\right. $$\n\nThe intervals overlap between 21.6&nbsp;% and 23.3&nbsp;%. It is possible that party A actually has 22&nbsp;% and party B 23&nbsp;%, and then B is larger.\n\n**Answer:** No. The confidence intervals overlap, so it is not statistically significant that party A is larger than party B.\n\n**c)** The intervals do not overlap if the larger party's lower limit lies above the smaller party's upper limit. The larger party's interval extends 2.4 percentage points downwards, and the smaller party's interval extends 2.3 percentage points upwards. The difference between the results must therefore be larger than the sum of the margins of error (we use the unrounded values):\n\n$$ f_A + f_B = 2.416\\ldots + 2.304\\ldots = 4.72\\ldots \\approx 4.7 $$\n\nToday's difference is only $24 - 21 = 3$ percentage points.\n\n**Answer:** The difference must be at least 4.7 percentage points.\n\n**General conclusion:** two parties being \"close to each other\" means that the difference is smaller than the sum of their margins of error. Then it is not possible to say which of them is larger."
   },
   {
    "level": 3,
    "question": "A municipality with 18&nbsp;000 residents sent a questionnaire to 1&nbsp;200 randomly selected residents, but only 750 replied. Of those who replied, 44&nbsp;% wanted more cycle paths.<br>a) Calculate the margin of error.<br>b) Between how many of the municipality's residents does the true number who want more cycle paths lie? Round to the nearest hundred.<br>c) What assumption about the 450 who did not reply must be made for the result to be trustworthy?",
    "answer": {
     "value": 3.6,
     "unit": "percentage points"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3.6,
      "unit": "percentage points",
      "tol": 0.02
     },
     {
      "del": "b",
      "value": 7300,
      "unit": "residents",
      "etikett": "lower limit",
      "tol": 0.01
     },
     {
      "del": "b",
      "value": 8600,
      "unit": "residents",
      "etikett": "upper limit",
      "tol": 0.01
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the sample size $n$ is the number who actually **replied**, not the number who received the questionnaire. The margin of error is also given in percentage points and must be converted to a number of residents using the size of the whole municipality.\n\n**a)** With $p = 44$ and $n = 750$:\n\n$$ f = 1.96 \\cdot \\sqrt{\\frac{44(100 - 44)}{750}} = 1.96 \\cdot \\sqrt{3.2853\\ldots} = 3.552\\ldots \\approx 3.6 $$\n\n(With $n = 1\\ 200$ you would have got $f \\approx 2.8$, a margin of error that looks more reliable than the result is.)\n\n**Answer:** 3.6 percentage points\n\n**b)** The confidence interval as a percentage is the result plus and minus the margin of error. We use the unrounded value from a):\n\n$$ \\left[\\begin{array}{l} \\text{Lower limit} = 44\\ \\% - 3.552\\ldots\\ \\% = 40.447\\ldots\\ \\% \\\\ \\text{Upper limit} = 44\\ \\% + 3.552\\ldots\\ \\% = 47.552\\ldots\\ \\% \\end{array}\\right. $$\n\nThe proportion applies to the whole municipality. The number of residents is the proportion times the number of residents in the municipality:\n\n$$ 0.40447\\ldots \\cdot 18\\ 000 = 7\\ 280.5\\ldots \\approx 7\\ 300 $$\n\n$$ 0.47552\\ldots \\cdot 18\\ 000 = 8\\ 559.4\\ldots \\approx 8\\ 600 $$\n\n**Answer:** Between about 7&nbsp;300 and 8&nbsp;600 residents.\n\n**c)** The margin of error only takes into account chance in who was asked. It says nothing about the 450 who chose not to reply. If, for example, those who cycle a lot were more interested in replying, the result will be systematically too high, and that error does not shrink however many are asked.\n\n**Answer:** You have to assume that those who did not reply on average think the same as those who replied, that is, that the non-response does not depend on what people think about the question.\n\n**General conclusion:** the margin of error is calculated on the number of replies, and it only measures the uncertainty due to chance. A biased non-response is a different kind of error that the margin of error does not capture."
   },
   {
    "level": 3,
    "question": "A report states: \"With 95&nbsp;% certainty, the proportion who are satisfied with public transport lies between 31.8&nbsp;% and 40.2&nbsp;%.\" The report does not state how many were asked.<br>a) What result $p$ did the survey get, and how large was the margin of error?<br>b) Roughly how many people were asked?",
    "answer": {
     "value": 500,
     "unit": "people"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 36,
      "unit": "%",
      "etikett": "$p =$"
     },
     {
      "del": "a",
      "value": 4.2,
      "unit": "percentage points",
      "etikett": "$f =$"
     },
     {
      "del": "b",
      "value": 500,
      "unit": "people",
      "tol": 0.03
     }
    ],
    "solution": "**The insight:** a confidence interval is the result plus and minus the margin of error. The result therefore lies in the middle of the interval, and the margin of error is half the width of the interval. When $p$ and $f$ are known, $n$ is the only unknown in the formula.\n\n**a)** The result lies midway between the limits:\n\n$$ p = \\frac{31.8 + 40.2}{2} = \\frac{72}{2} = 36 $$\n\nThe margin of error is half the distance between the limits:\n\n$$ f = \\frac{40.2 - 31.8}{2} = \\frac{8.4}{2} = 4.2 $$\n\nCheck: $36 - 4.2 = 31.8$ and $36 + 4.2 = 40.2$. Correct.\n\n**Answer:** The result was 36&nbsp;% and the margin of error 4.2 percentage points.\n\n**b)** We substitute $p = 36$ and $f = 4.2$ into the formula. The numerator becomes $36(100 - 36) = 36 \\cdot 64 = 2\\ 304$:\n\n$$ 1.96 \\cdot \\sqrt{\\frac{2\\ 304}{n}} = 4.2 $$\n\n$$ \\frac{1.96 \\cdot \\sqrt{\\dfrac{2\\ 304}{n}}}{\\boldsymbol{1.96}} = \\frac{4.2}{\\boldsymbol{1.96}} $$\n\n$$ \\sqrt{\\frac{2\\ 304}{n}} = 2.1428\\ldots $$\n\nWe square both sides to get rid of the root sign:\n\n$$ \\left(\\sqrt{\\frac{2\\ 304}{n}}\\right)^{\\boldsymbol{2}} = (2.1428\\ldots)^{\\boldsymbol{2}} $$\n\n$$ \\frac{2\\ 304}{n} = 4.5918\\ldots $$\n\n$$ \\frac{2\\ 304}{n} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{n} = 4.5918\\ldots \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{n} $$\n\n$$ 2\\ 304 = 4.5918\\ldots \\cdot n $$\n\n$$ \\frac{2\\ 304}{\\boldsymbol{4.5918\\ldots}} = \\frac{4.5918\\ldots \\cdot n}{\\boldsymbol{4.5918\\ldots}} $$\n\n$$ 501.7\\ldots = n $$\n\nThe limits in the report are rounded to one decimal place, so the margin of error could have been anything from about 4.15 to 4.25 percentage points. That corresponds to between about 490 and 510 people, so the answer can only be given approximately.\n\nCheck: with $n = 500$, $f = 1.96 \\cdot \\sqrt{\\frac{2\\ 304}{500}} = 4.20\\ldots$. Correct.\n\n**Answer:** About 500 people\n\n**General conclusion:** the formula for the margin of error links three quantities, $f$, $p$ and $n$. If two of them are known, the third can be calculated, and a confidence interval gives both $p$ and $f$ at once."
   },
   {
    "level": 3,
    "question": "A polling company is going to ask randomly selected people about a new proposal. Nobody knows in advance what proportion will answer yes, but the margin of error must be at most 3.0 percentage points whatever the result.<br>a) Calculate $p(100 - p)$ for $p = 10$, $30$, $50$, $70$ and $90$.<br>b) Show that $p(100 - p) = 2\\ 500 - (p - 50)^2$, and use it to explain why the margin of error is largest when $p = 50\\ \\%$.<br>c) What is the smallest number of people that must be asked?",
    "answer": {
     "value": 1068,
     "unit": "people"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2500,
      "unit": "",
      "etikett": "$p(100 - p)$ for $p = 50$"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 1068,
      "unit": "people",
      "tol": 0.001
     }
    ],
    "solution": "**The insight:** when the result is unknown, the sample has to be enough even in the worst case. The worst case is the $p$ that makes the margin of error largest, and that is $p = 50\\ \\%$.\n\n**a)** We calculate the product for each value:\n\n| $p$ | 10 | 30 | 50 | 70 | 90 |\n|---|---|---|---|---|---|\n| $100 - p$ | 90 | 70 | 50 | 30 | 10 |\n| $p(100 - p)$ | 900 | 2&nbsp;100 | 2&nbsp;500 | 2&nbsp;100 | 900 |\n\nThe product is largest for $p = 50$ and equal for $p$ and $100 - p$ (for example 30 and 70).\n\n**Answer:** 900, 2&nbsp;100, 2&nbsp;500, 2&nbsp;100 and 900\n\n**b)** We expand the square on the right-hand side. The square means that the bracket is multiplied by itself:\n\n$$ (p - 50)^2 = (p - 50)(p - 50) = p^2 - 50p - 50p + 2\\ 500 = p^2 - 100p + 2\\ 500 $$\n\nThe right-hand side then becomes\n\n$$ 2\\ 500 - (p - 50)^2 = 2\\ 500 - p^2 + 100p - 2\\ 500 = 100p - p^2 $$\n\nThe left-hand side, with the bracket multiplied out, is\n\n$$ p(100 - p) = 100p - p^2 $$\n\nThe sides are equal, and so the identity is shown.\n\nA square can never be negative, so $(p - 50)^2 \\geq 0$. Something that is 0 or larger is therefore always subtracted from 2&nbsp;500. $p(100 - p)$ is largest when nothing is subtracted, that is, when $p - 50 = 0$, so $p = 50$. Then $p(100 - p) = 2\\ 500$.\n\nIn the formula $f = 1.96 \\cdot \\sqrt{\\frac{p(100 - p)}{n}}$, $p(100 - p)$ is in the numerator under the root sign. With the same $n$, the margin of error is therefore largest when $p(100 - p)$ is largest.\n\n**Answer:** Since $(p - 50)^2$ is never negative, $p(100 - p)$ is at its largest, 2&nbsp;500, when $p = 50$, and then the margin of error is also largest.\n\n**c)** If the sample meets the requirement when $p = 50$, it meets the requirement for all other results. We find which $n$ gives a margin of error of exactly 3.0 when $p(100 - p) = 2\\ 500$:\n\n$$ 1.96 \\cdot \\sqrt{\\frac{2\\ 500}{n}} = 3.0 $$\n\n$$ \\frac{1.96 \\cdot \\sqrt{\\dfrac{2\\ 500}{n}}}{\\boldsymbol{1.96}} = \\frac{3.0}{\\boldsymbol{1.96}} $$\n\n$$ \\sqrt{\\frac{2\\ 500}{n}} = 1.5306\\ldots $$\n\nWe square both sides to get rid of the root sign:\n\n$$ \\left(\\sqrt{\\frac{2\\ 500}{n}}\\right)^{\\boldsymbol{2}} = (1.5306\\ldots)^{\\boldsymbol{2}} $$\n\n$$ \\frac{2\\ 500}{n} = 2.3427\\ldots $$\n\n$$ \\frac{2\\ 500}{n} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{n} = 2.3427\\ldots \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{n} $$\n\n$$ 2\\ 500 = 2.3427\\ldots \\cdot n $$\n\n$$ \\frac{2\\ 500}{\\boldsymbol{2.3427\\ldots}} = \\frac{2.3427\\ldots \\cdot n}{\\boldsymbol{2.3427\\ldots}} $$\n\n$$ 1\\ 067.1\\ldots = n $$\n\nA smaller $n$ gives a larger margin of error, so we round **up**. Check: with 1&nbsp;067 people $f = 3.0001\\ldots$, too much, and with 1&nbsp;068 people $f = 2.9987\\ldots$.\n\n**Answer:** At least 1&nbsp;068 people\n\n**General conclusion:** when the result is not known in advance, the sample is planned for $p = 50\\ \\%$. That is why many opinion polls have just over 1&nbsp;000 respondents and state the margin of error as \"at most 3 percentage points\"."
   }
  ]
 },
 "ma1c-5.3": {
  "kalla": "7729e3a505",
  "data": [
   {
    "level": 1,
    "question": "Which diagram is used to investigate whether there is a correlation between two variables?",
    "choices": [
     "Pie chart",
     "Tree diagram",
     "Bar chart",
     "Scatter diagram"
    ],
    "correct": 3,
    "solution": "In a **scatter diagram** the pairs of values are plotted as points, and the pattern reveals whether (and how strongly) the variables vary together.\n\n**Answer:** Scatter diagram"
   },
   {
    "level": 1,
    "question": "The points in a scatter diagram are clearly gathered along a line with a negative slope. What correlation is there?",
    "choices": [
     "Strong positive correlation",
     "Weak negative correlation",
     "Strong negative correlation",
     "No correlation"
    ],
    "correct": 2,
    "solution": "Clearly along a line = **strong**; negative slope = **negative**. So strong negative correlation.\n\n**Answer:** Strong negative correlation"
   },
   {
    "level": 1,
    "question": "What does **causation** mean?",
    "choices": [
     "That two variables are independent",
     "That the correlation is weak",
     "That the points lie on a straight line",
     "A cause-and-effect relationship between two variables"
    ],
    "correct": 3,
    "solution": "Causation means that one variable CAUSES the change in the other, like the mother's genes (partly) determining the daughter's height.\n\n**Answer:** A cause-and-effect relationship between two variables."
   },
   {
    "level": 2,
    "question": "The number of ice creams sold and the number of drowning accidents vary strongly together over the year. What is the best interpretation?",
    "choices": [
     "Drowning accidents cause ice cream sales",
     "Eating ice cream causes drowning accidents",
     "The correlation proves causation",
     "A spurious correlation: both are caused by a third variable (warm weather)"
    ],
    "correct": 3,
    "solution": "The correlation is real but there is no causation: warm weather makes BOTH ice cream sales and swimming (and therefore accidents) increase. A classic **spurious correlation** with an underlying third variable.\n\n**Answer:** A spurious correlation: both are caused by warm weather."
   },
   {
    "level": 2,
    "question": "Which of the following pairs of variables would be expected to have a strong POSITIVE correlation AND causation?",
    "choices": [
     "Number of hours of training and fitness",
     "Shoe size and vocabulary in children",
     "Road width and number of accidents",
     "Egg consumption and crime"
    ],
    "correct": 0,
    "solution": "More training CAUSES better fitness: positive correlation with causation.\n\nShoe size and vocabulary in children vary together (both grow with age) but this is a spurious correlation. Road width and accidents was the lesson's example of a weak NEGATIVE correlation, and egg consumption and crime of no correlation at all.\n\n**Answer:** Number of hours of training and fitness."
   },
   {
    "level": 3,
    "question": "A study shows a strong positive correlation between the number of fire engines at the scene and the cost of the damage in fires. Kalle concludes: \"Send fewer fire engines, and the damage will decrease!\" What is wrong with the reasoning?",
    "choices": [
     "The correlation is negative, not positive",
     "The correlation is due to a third variable: the size of the fire determines both the number of fire engines and the damage",
     "The study should have used a pie chart",
     "Nothing is wrong, fewer fire engines give less damage"
    ],
    "correct": 1,
    "solution": "**The insight:** a correlation says nothing about which direction a cause-and-effect relationship goes in, or whether there is any cause-and-effect relationship at all.\n\nThe underlying variable is the size of the fire. A large fire gives both more fire engines at the scene and greater damage. So the fire engines do not cause the damage; the fire engines and the damage have a common cause.\n\nKalle's measure is based on a cause-and-effect relationship that does not exist. Fewer fire engines do not make the fire smaller. Instead, the damage risks becoming greater, since the fire is put out more slowly.\n\nThe other options do not hold: the correlation is described as positive in the study, the choice of diagram does not change the relationship, and the idea that fewer fire engines would reduce the damage is exactly the incorrect conclusion.\n\n**Answer:** The size of the fire is a third variable that determines both the number of fire engines and the damage. It is a spurious correlation, not causation from fire engines to damage.\n\n**General conclusion:** always ask whether a third variable could explain both before a correlation is used as a basis for a decision. Correlation does not mean causation."
   },
   {
    "level": 3,
    "question": "A school investigates how many hours a week students spend at homework help and what result they get on a mathematics test. Students who spend a lot of time at homework help have lower test results on average. The head teacher concludes: \"Homework help lowers the results, we are closing it down.\"<br>a) Is the correlation between the number of hours of homework help and the test result positive or negative?<br>b) Give a reasonable explanation of the relationship in which homework help does not lower the results at all.<br>c) A teacher suggests instead comparing the same students' test results before and after they started at homework help. Explain why that comparison says more about the effect of homework help.",
    "solution": "**The insight:** the cause-and-effect relationship may go in the opposite direction to what the head teacher thinks. It may be the low results that lead to homework help, not homework help that leads to low results.\n\n**a)** More hours of homework help go together with lower test results. When one variable increases, the other decreases, and the points in a scatter diagram would lie around a line with a negative slope.\n\n**Answer:** Negative correlation.\n\n**b)** Students who find mathematics difficult go to homework help, or are recommended to go there by their teachers. So the students already had lower results before they started. The cause then goes from low results to many hours of homework help, and not the other way round.\n\n**Answer:** Students with weak results are the ones who go to homework help. The low results cause the homework help, not the reverse.\n\n**c)** In the head teacher's comparison, two different groups of students are set against each other, and the groups already differed from the start. The difference in results therefore mostly says something about which students go to homework help.\n\nIf you instead compare the same students before and after, the student is their own comparison. The starting level is then the same, and if those who go to homework help improve more than other students, that suggests that homework help actually helps.\n\n**Answer:** The before-and-after comparison measures the change in the same students, so the difference in starting point between the groups does not affect the result.\n\n**General conclusion:** when two variables correlate, there are three possibilities to test. The first can cause the second, the second can cause the first, or a third variable can cause both."
   },
   {
    "level": 3,
    "question": "The table shows a child's height at different ages. The points lie close to a straight line, and a trend line is drawn through the points $(2, 89)$ and $(10, 137)$, where *x* is the age in years and *y* is the height in cm.\n\n| Age (years) | 2 | 4 | 6 | 8 | 10 |\n|---|---|---|---|---|---|\n| Height (cm) | 88 | 102 | 112 | 126 | 138 |\n\na) Find the equation of the trend line.<br>b) What height does the trend line predict at the age of 8 and at the age of 30?<br>c) How well do the two predictions agree with reality? Explain what this says about when a trend line can be used.",
    "answer": {
     "value": 257,
     "unit": "cm"
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
      "value": 77,
      "unit": "",
      "etikett": "$m =$"
     },
     {
      "del": "b",
      "value": 125,
      "unit": "cm",
      "etikett": "at 8 years"
     },
     {
      "del": "b",
      "value": 257,
      "unit": "cm",
      "etikett": "at 30 years"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** a trend line describes the relationship only in the interval where there are measurements. Outside the interval we know nothing about whether the relationship continues.\n\n**a)** The trend line is a straight line $y = kx + m$. The slope is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{137 - 89}{10 - 2} = \\dfrac{48}{8} = 6 $$\n\nSo $y = 6x + m$. We substitute the point $(2, 89)$:\n\n$$ 89 = 6 \\cdot 2 + m $$\n\n$$ 89 = 12 + m $$\n\n$$ 89 \\mathbin{\\boldsymbol{-}} \\boldsymbol{12} = 12 + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{12} $$\n\n$$ 77 = m $$\n\nCheck with the other point: $6 \\cdot 10 + 77 = 60 + 77 = 137$. Correct.\n\n**Answer:** $y = 6x + 77$\n\n**b)** We substitute the age as *x* into the equation of the trend line:\n\n$$ y = 6 \\cdot 8 + 77 = 48 + 77 = 125 $$\n\n$$ y = 6 \\cdot 30 + 77 = 180 + 77 = 257 $$\n\n**Answer:** $125\\ \\mathrm{cm}$ at 8 years and $257\\ \\mathrm{cm}$ at 30 years.\n\n**c)** At 8 years the height was measured as $126\\ \\mathrm{cm}$, so the prediction $125\\ \\mathrm{cm}$ agrees very well. The age of 8 lies within the interval 2 to 10 years where we have measurements.\n\nThe prediction $257\\ \\mathrm{cm}$ at 30 years is unreasonable. No adult grows that tall, and people stop growing in their late teens. The trend line assumes that the child continues to grow by $6\\ \\mathrm{cm}$ per year for ever, but that only applies while growing up.\n\n**Answer:** The prediction at 8 years agrees well, but the one at 30 years is unreasonable. A trend line can be used within the interval where the measurements are, but not far outside it.\n\n**General conclusion:** extending a trend line far beyond the measurements is called extrapolating. It requires knowing that the relationship continues in the same way, something the measurements themselves can never show."
   },
   {
    "level": 3,
    "question": "Two data sets A and B have the same *x*-values.\n\n| *x* | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| *y* in A | 1.5 | 2 | 2.5 | 3 | 3.5 |\n| *y* in B | 4 | 12 | 7 | 18 | 14 |\n\nA trend line for B goes through the points $(1, 4)$ and $(5, 14)$. Lisa says: \"B has the steeper trend line, so B has the stronger correlation.\"<br>a) Show that all the points in A lie on the same straight line and find the slope of the line.<br>b) Find the slope of the trend line for B and examine Lisa's claim.<br>c) A's *y*-values are converted to a unit that is a tenth as large, so that all the *y*-values become ten times larger. What happens to the slope and to the strength of the correlation?",
    "answer": {
     "value": 0.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.5,
      "unit": "",
      "etikett": "slope for A"
     },
     {
      "del": "b",
      "value": 2.5,
      "unit": "",
      "etikett": "slope for B"
     },
     {
      "del": "c",
      "value": 5,
      "unit": "",
      "etikett": "new slope for A"
     }
    ],
    "solution": "**The insight:** the strength of a correlation is decided by how close the points lie to the line, not by how steep the line is.\n\n**a)** When *x* increases by 1, *y* in A increases by $0.5$ every time: from $1.5$ to $2$, to $2.5$, to $3$ and to $3.5$. An equal increase in each step means that the points lie on a straight line with the slope\n\n$$ k = \\dfrac{\\Delta y}{\\Delta x} = \\dfrac{0.5}{1} = 0.5 $$\n\nWe substitute the point $(1,\\ 1.5)$ into $y = 0.5x + m$:\n\n$$ 1.5 = 0.5 \\cdot 1 + m $$\n\n$$ 1.5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.5} = 0.5 + m \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.5} $$\n\n$$ 1 = m $$\n\nCheck with $x = 5$: $0.5 \\cdot 5 + 1 = 2.5 + 1 = 3.5$. Correct, and all five points lie on the line $y = 0.5x + 1$.\n\n**Answer:** The points lie on $y = 0.5x + 1$, with the slope $0.5$.\n\n**b)** The slope of the trend line for B:\n\n$$ k = \\dfrac{14 - 4}{5 - 1} = \\dfrac{10}{4} = 2.5 $$\n\nSo B's line is steeper. But B's points jump up and down: *y* goes from 4 to 12, then down to 7, up to 18 and down to 14. The points are clearly scattered around the line, so B has a weak positive correlation. A's points lie exactly on a line, and a correlation cannot be stronger than that.\n\n**Answer:** The slope for B is $2.5$. Lisa is wrong: A has the stronger correlation, since all the points lie exactly on the line. The fact that B's line is steeper says nothing about the strength.\n\n**c)** All the *y*-values become ten times larger, so every increase in the *y*-direction also becomes ten times larger:\n\n$$ k = \\dfrac{5}{1} = 5 $$\n\nThe points still lie exactly on a straight line, now $y = 5x + 10$. So the correlation is as strong as before.\n\n**Answer:** The slope becomes $5$, ten times larger, but the correlation is as strong as before.\n\n**General conclusion:** the slope depends on which units the variables are measured in, but the strength of the correlation does not. That is why the slope can never be used to compare how strong two correlations are."
   },
   {
    "level": 3,
    "question": "In a field, different amounts of fertiliser *x* (kg) are tested on equally large plots, and the harvest *y* (kg) on each plot is measured.\n\n| Fertiliser *x* (kg) | 1 | 3 | 5 | 7 | 9 |\n|---|---|---|---|---|---|\n| Harvest *y* (kg) | 9 | 21 | 25 | 21 | 9 |\n\nThe straight line that best fits the points is horizontal, $y = 17$. Elin concludes: \"There is no correlation, so the fertiliser does not affect the harvest.\"<br>a) Calculate the slope of the segment between $(1, 9)$ and $(5, 25)$ and of the segment between $(5, 25)$ and $(9, 9)$.<br>b) Show that all the points satisfy the relationship $y = 10x - x^2$.<br>c) Examine Elin's conclusion.",
    "answer": {
     "value": 4,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4,
      "unit": "",
      "etikett": "from $x = 1$ to $x = 5$"
     },
     {
      "del": "a",
      "value": -4,
      "unit": "",
      "etikett": "from $x = 5$ to $x = 9$"
     },
     {
      "del": "b"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** correlation, as described here, measures how well the points follow a **straight** line. A strong relationship that is not linear can therefore look like \"no correlation\".\n\n**a)** The slope is the change in the *y*-direction divided by the change in the *x*-direction:\n\n$$ k_1 = \\dfrac{25 - 9}{5 - 1} = \\dfrac{16}{4} = 4 $$\n\n$$ k_2 = \\dfrac{9 - 25}{9 - 5} = \\dfrac{-16}{4} = -4 $$\n\n**Answer:** The slope is $4$ from $x = 1$ to $x = 5$ and $-4$ from $x = 5$ to $x = 9$.\n\n**b)** We substitute each *x*-value into $y = 10x - x^2$:\n\n| *x* | $10x - x^2$ | *y* |\n|---|---|---|\n| 1 | $10 - 1$ | 9 |\n| 3 | $30 - 9$ | 21 |\n| 5 | $50 - 25$ | 25 |\n| 7 | $70 - 49$ | 21 |\n| 9 | $90 - 81$ | 9 |\n\nAll five values agree with the table.\n\n**Answer:** Every point satisfies $y = 10x - x^2$, so the harvest is completely determined by the amount of fertiliser.\n\n**c)** The points lie exactly on a curve, so the relationship between fertiliser and harvest is as strong as it can be. It is just not linear. Up to $5\\ \\mathrm{kg}$, more fertiliser gives a larger harvest, with the slope $4$, and above $5\\ \\mathrm{kg}$, more fertiliser gives a smaller harvest, with the slope $-4$. The rising and the falling halves cancel each other out, and that is why the best straight line is horizontal. The mean of the harvests is $\\dfrac{9 + 21 + 25 + 21 + 9}{5} = \\dfrac{85}{5} = 17$, which is exactly the horizontal line $y = 17$.\n\n**Answer:** Elin is wrong. The fertiliser affects the harvest a great deal, but the relationship is not linear: the harvest increases up to $5\\ \\mathrm{kg}$ of fertiliser and then decreases. The fact that no straight line fits does not mean that there is no relationship.\n\n**General conclusion:** always look at the scatter diagram before drawing a conclusion from a trend line. \"No correlation\" means \"no linear relationship\", not \"no relationship at all\"."
   },
   {
    "level": 3,
    "question": "A teacher wants to know whether a new method for learning vocabulary gives better test results. She tries two set-ups at two schools with 60 students each. In set-up 1 the students choose for themselves whether they want to use the method. In set-up 2 half of the students are chosen by lot to use the method. The table shows how many points the students increased by on average on a vocabulary test.\n\n| | Used the method | Did not use the method |\n|---|---|---|\n| Set-up 1: the students choose for themselves | 12&nbsp;points | 4&nbsp;points |\n| Set-up 2: a draw decides | 7&nbsp;points | 5&nbsp;points |\n\na) How many more points did those who used the method increase by, in set-up 1 and in set-up 2?<br>b) Explain why the difference is so much larger in set-up 1.<br>c) Which set-up gives the best basis for deciding whether the method causes an improvement, and how large an improvement does it suggest?",
    "answer": {
     "value": 2,
     "unit": "points"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 8,
      "unit": "points",
      "etikett": "set-up 1"
     },
     {
      "del": "a",
      "value": 2,
      "unit": "points",
      "etikett": "set-up 2"
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 2,
      "unit": "points",
      "etikett": "improvement"
     }
    ],
    "solution": "**The insight:** when the students choose for themselves, the groups differ from the start. A random draw makes the groups alike on average, so that the method becomes the only systematic difference between them.\n\n**a)** The difference is the increase with the method minus the increase without the method:\n\n$$ 12 - 4 = 8 $$\n\n$$ 7 - 5 = 2 $$\n\n**Answer:** $8$ points more in set-up 1 and $2$ points more in set-up 2.\n\n**b)** In set-up 1 it is probably the most motivated students who choose to try a new method. Motivated students study more and would have improved more even without the method. Motivation is therefore a third variable that affects both who uses the method and how much the result increases. The $8$ points mix up the effect of the method with the effect of motivation.\n\n**Answer:** The students who chose the method differed from the others from the start, for example by being more motivated, and that difference is included in the $8$ points.\n\n**c)** In set-up 2 the draw decides who uses the method. Motivated and unmotivated students then end up in both groups to roughly the same extent, and the same applies to prior knowledge and everything else. The only systematic difference between the groups is the method, so the difference in results can be attributed to the method.\n\n**Answer:** Set-up 2. It suggests that the method gives an improvement of about $2$ points.\n\n**General conclusion:** a correlation in data where people have chosen their group themselves can almost never show causation. Deciding by lot who gets the treatment is the safest way of removing third variables."
   },
   {
    "level": 3,
    "question": "Two hospitals each treat 500 patients after a certain type of accident. The patients are divided into mild and severe cases.\n\n| | Mild cases | Of whom survived | Severe cases | Of whom survived |\n|---|---|---|---|---|\n| Hospital A | 100 | 98 | 400 | 320 |\n| Hospital B | 400 | 388 | 100 | 70 |\n\na) Calculate what proportion of the patients survived at each hospital in total. Give the answer as a percentage.<br>b) Calculate what proportion survived at each hospital among the mild cases and among the severe cases. Give the answers as percentages.<br>c) A newspaper writes: \"Hospital B is better, more people survive there.\" Examine the claim and explain how the results in a) and b) can both be true at the same time.",
    "answer": {
     "value": 83.6,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 83.6,
      "unit": "%",
      "etikett": "hospital A"
     },
     {
      "del": "a",
      "value": 91.6,
      "unit": "%",
      "etikett": "hospital B"
     },
     {
      "del": "b",
      "value": 98,
      "unit": "%",
      "etikett": "A, mild cases"
     },
     {
      "del": "b",
      "value": 80,
      "unit": "%",
      "etikett": "A, severe cases"
     },
     {
      "del": "b",
      "value": 97,
      "unit": "%",
      "etikett": "B, mild cases"
     },
     {
      "del": "b",
      "value": 70,
      "unit": "%",
      "etikett": "B, severe cases"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** how severe the case is affects both which hospital the patient ends up at and whether the patient survives. When the groups are combined, such a third variable can reverse the conclusion.\n\n**a)** The proportion who survived is the number who survived divided by the number of patients.\n\nHospital A:\n\n$$ \\dfrac{98 + 320}{500} = \\dfrac{418}{500} = 0.836 = 83.6\\ \\% $$\n\nHospital B:\n\n$$ \\dfrac{388 + 70}{500} = \\dfrac{458}{500} = 0.916 = 91.6\\ \\% $$\n\n**Answer:** Hospital A $83.6\\ \\%$ and hospital B $91.6\\ \\%$.\n\n**b)** The same relationship, but now for each group separately.\n\n| | Mild cases | Severe cases |\n|---|---|---|\n| Hospital A | $\\dfrac{98}{100} = 98\\ \\%$ | $\\dfrac{320}{400} = 80\\ \\%$ |\n| Hospital B | $\\dfrac{388}{400} = 97\\ \\%$ | $\\dfrac{70}{100} = 70\\ \\%$ |\n\n**Answer:** Mild cases: A $98\\ \\%$ and B $97\\ \\%$. Severe cases: A $80\\ \\%$ and B $70\\ \\%$.\n\n**c)** Hospital A has a higher proportion of survivors among both the mild and the severe cases. Yet B has a higher proportion in total. The explanation is that the hospitals have completely different patients: at A, $400$ of $500$ patients are severe cases, that is $80\\ \\%$, while at B only $100$ of $500$ are, that is $20\\ \\%$. Severe cases survive less often regardless of hospital, so A's total figure is pulled down by A taking care of the most severe cases.\n\n**Answer:** The claim does not hold. Hospital A is better for both mild and severe cases. B's higher total figure is due to B mostly having mild cases, not to the care being better.\n\n**General conclusion:** the fact that a combined comparison can point in the opposite direction to the comparisons within each group is called Simpson's paradox. Split the data by the third variable before drawing a conclusion about cause."
   }
  ]
 },
 "ma1c-5.4": {
  "kalla": "e8075d3341",
  "data": [
   {
    "level": 1,
    "question": "What is the probability of rolling a six with an ordinary die? Give your answer as a fraction.",
    "choices": [
     "$\\dfrac{5}{6}$",
     "$\\dfrac{1}{2}$",
     "$\\dfrac{1}{6}$",
     "$6$"
    ],
    "correct": 2,
    "solution": "One favourable outcome (the six) out of six possible:\n\n$$ P(\\text{six}) = \\frac{1}{6} $$\n\n**Answer:** $\\dfrac{1}{6}$"
   },
   {
    "level": 1,
    "question": "What does it mean that the probability of an event is 0?",
    "choices": [
     "The event is impossible",
     "The event is certain to happen",
     "The event happens in half of the cases",
     "The probability cannot be calculated"
    ],
    "correct": 0,
    "solution": "$P = 0$ means impossibility (\"rolling a seven on an ordinary die\") and $P = 1$ means that the event is certain to happen. All probabilities lie between 0 and 1.\n\n**Answer:** The event is impossible."
   },
   {
    "level": 1,
    "question": "What is the probability of drawing an ace from a pack of 52 cards? Give your answer as a fraction.",
    "choices": [
     "$\\dfrac{1}{52}$",
     "$\\dfrac{4}{13}$",
     "$\\dfrac{1}{4}$",
     "$\\dfrac{1}{13}$"
    ],
    "correct": 3,
    "solution": "Four favourable outcomes (the ace in each suit) out of 52 possible:\n\n$$ P(\\text{ace}) = \\frac{4}{52} = \\frac{1}{13} $$\n\n**Answer:** $\\dfrac{1}{13}$"
   },
   {
    "level": 2,
    "question": "You roll two dice. What is the probability that the sum is exactly 7? Give your answer as a fraction.",
    "choices": [
     "$\\dfrac{1}{6}$",
     "$\\dfrac{1}{12}$",
     "$\\dfrac{7}{36}$",
     "$\\dfrac{1}{7}$"
    ],
    "correct": 0,
    "solution": "Draw the sample space: the sum 7 is obtained from (1,6), (2,5), (3,4), (4,3), (5,2) and (6,1), that is, 6 favourable outcomes out of 36 possible:\n\n$$ P(\\text{sum 7}) = \\frac{6}{36} = \\frac{1}{6} $$\n\n(The sum 7 is in fact the most common of all the sums.)\n\n**Answer:** $\\dfrac{1}{6}$"
   },
   {
    "level": 2,
    "question": "A bowl contains 5 red, 7 green and 8 yellow sweets. You take one at random. What is the probability that it is NOT yellow? Give your answer as a percentage.",
    "answer": {
     "value": 60,
     "unit": "%"
    },
    "solution": "Favourable outcomes = the red and green ones: $5 + 7 = 12$ out of a total of $5 + 7 + 8 = 20$:\n\n$$ P(\\text{not yellow}) = \\frac{12}{20} = 0.6 = 60\\ \\% $$\n\n**Answer:** 60 %"
   },
   {
    "level": 3,
    "question": "You toss two coins. Leia says: \"There are three outcomes: two heads, two tails or one of each. So the probability of one of each is $\\dfrac{1}{3}$.\" What is the correct probability of one head and one tail?",
    "choices": [
     "$\\dfrac{1}{3}$, Leia is right",
     "$\\dfrac{1}{2}$, since the sample space has four equally likely outcomes and two of them give one of each",
     "$\\dfrac{1}{4}$",
     "$\\dfrac{2}{3}$"
    ],
    "correct": 1,
    "solution": "**The insight:** the classical definition of probability requires the outcomes to be *equally likely*. Leia's three outcomes are not.\n\nDraw the sample space with the coins kept apart (coin 1, coin 2):\n\n$$ (\\text{heads},\\ \\text{heads}) \\quad (\\text{heads},\\ \\text{tails}) \\quad (\\text{tails},\\ \\text{heads}) \\quad (\\text{tails},\\ \\text{tails}) $$\n\nThese are four equally likely outcomes. \"One of each\" is covered by two of them:\n\n$$ P(\\text{one of each}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{2}{4} = \\frac{1}{2} $$\n\nLeia's mistake is that she combined (heads, tails) and (tails, heads) into a single outcome, even though that combination can occur in two ways and is therefore twice as common as, for example, two heads.\n\n**Answer:** $\\dfrac{1}{2}$\n\n**General conclusion:** the classical definition only works with equally likely outcomes. So always keep the objects apart (coin 1 and coin 2, die 1 and die 2) when drawing the sample space, just as in the dice table."
   },
   {
    "level": 3,
    "question": "Two dice are rolled. Alex reasons: \"Each die gives a six with probability $\\dfrac{1}{6}$, so the probability of at least one six is $\\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{1}{3}$.\"<br>a) Find the correct probability of at least one six using the sample space. Give the answer in decimal form with two decimal places.<br>b) Explain what is wrong with Alex's reasoning.<br>c) With the same reasoning, six dice would give the probability $\\dfrac{6}{6} = 1$ of at least one six. Explain why that cannot be right.",
    "answer": {
     "value": 0.31,
     "unit": "",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.31,
      "unit": "",
      "tol": 0.02,
      "etikett": "$P(\\text{at least one six}) \\approx$"
     },
     {
      "del": "b"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the outcome (6, 6) has a six on *both* dice. Anyone who adds \"six on die 1\" and \"six on die 2\" counts that outcome twice.\n\n**a)** The sample space for two dice has $6 \\cdot 6 = 36$ equally likely outcomes. We count the outcomes that have at least one six:\n\n- Die 1 shows a six: (6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), that is 6 outcomes.\n- Die 2 shows a six: (1, 6), (2, 6), (3, 6), (4, 6), (5, 6), (6, 6), that is 6 outcomes.\n- The outcome (6, 6) is in both lists, so it should only be counted once.\n\nThe number of favourable outcomes is therefore $6 + 6 - 1 = 11$:\n\n$$ P(\\text{at least one six}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{11}{36} \\approx 0.31 $$\n\n**Answer:** $\\dfrac{11}{36} \\approx 0.31$\n\n**b)** $\\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{12}{36}$ corresponds to counting 6 + 6 = 12 favourable outcomes. But (6, 6) is included in both sets of sixes, so Alex counts that outcome twice. The correct number is 11, not 12.\n\n**Answer:** Alex counts the outcome where both dice show a six twice.\n\n**c)** The probability 1 means that the event is certain. But all six dice can show something other than a six, for example a one each. At least one six is therefore not certain, and the probability must be less than 1. The mistake is the same as in b): the more dice, the more outcomes with several sixes, and all of them are counted several times. With seven dice the reasoning would even give $\\dfrac{7}{6}$, which is greater than 1 and therefore impossible as a probability.\n\n**Answer:** It is possible that no die shows a six, so the event is not certain. Outcomes with several sixes are counted several times.\n\n**General conclusion:** probabilities of two events may only be added if the events cannot happen at the same time. Otherwise the common outcomes are counted twice. Counting in the sample space reveals the mistake."
   },
   {
    "level": 3,
    "question": "Two dice are rolled and the sum is counted. Ella wins if the sum is 6, 7 or 8. Noah wins if the sum is 2, 3, 4, 10, 11 or 12. Otherwise they roll again. Noah thinks the game favours him, since he has twice as many sums as Ella.<br>a) Find the probability that Ella wins a roll and the probability that Noah wins a roll. Give the answers in decimal form with two decimal places.<br>b) Noah may add one sum to his so that the game becomes fair. Which sums can he choose? (There are two.)",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.44,
      "unit": "",
      "tol": 0.02,
      "etikett": "$P(\\text{Ella wins}) \\approx$"
     },
     {
      "del": "a",
      "value": 0.33,
      "unit": "",
      "tol": 0.02,
      "etikett": "$P(\\text{Noah wins}) \\approx$"
     },
     {
      "del": "b",
      "values": [
       5,
       9
      ],
      "unit": "",
      "etikett": "the sums"
     }
    ],
    "solution": "**The insight:** it is the number of *outcomes* that decides the probability, not the number of *sums*. The sums are not equally likely: the sum 7 can be obtained in six ways, the sum 12 in only one.\n\nWe count in the sample space for two dice (36 equally likely outcomes) how many outcomes give each sum:\n\n| Sum | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n| Number of outcomes | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |\n\n**a)** Ella wins on the sums 6, 7 and 8, which give $5 + 6 + 5 = 16$ favourable outcomes:\n\n$$ P(\\text{Ella wins}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{16}{36} \\approx 0.44 $$\n\nNoah wins on the sums 2, 3, 4, 10, 11 and 12, which give $1 + 2 + 3 + 3 + 2 + 1 = 12$ favourable outcomes:\n\n$$ P(\\text{Noah wins}) = \\frac{12}{36} \\approx 0.33 $$\n\nElla's three sums lie in the middle, where the outcomes are most numerous. Noah's six sums lie at the edges, where they are few.\n\n**Answer:** Ella $\\dfrac{16}{36} \\approx 0.44$, Noah $\\dfrac{12}{36} \\approx 0.33$\n\n**b)** The game is fair when both have equally many favourable outcomes. Noah is short of $16 - 12 = 4$ outcomes. The sums that nobody has yet are 5 and 9, and both give exactly 4 outcomes. If Noah chooses 5, for example, he gets $12 + 4 = 16$ outcomes, as many as Ella.\n\n**Answer:** 5 or 9\n\n**General conclusion:** the classical definition counts outcomes, and they must be equally likely. The sums of two dice are not, so they cannot be counted as outcomes."
   },
   {
    "level": 3,
    "question": "A coin is tossed several times in a row.<br>a) The coin is tossed three times. Find the probability of exactly two heads. Give the answer in decimal form.<br>b) Find the probability of at least one head when the coin is tossed three times. Give the answer in decimal form.<br>c) What is the smallest number of times the coin must be tossed for the probability of at least one head to be greater than $0.99$?",
    "answer": {
     "value": 7,
     "unit": "times"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.375,
      "unit": ""
     },
     {
      "del": "b",
      "value": 0.875,
      "unit": ""
     },
     {
      "del": "c",
      "value": 7,
      "unit": "times"
     }
    ],
    "solution": "**The insight:** the sample space doubles with each toss, but only *one* outcome has no heads: tails every time. It is easier to count the single unfavourable outcome than all the favourable ones.\n\n**a)** We write out the sample space for three tosses, with H for heads and T for tails, in the order of the tosses:\n\n$$ (\\text{H}, \\text{H}, \\text{H}) \\quad (\\text{H}, \\text{H}, \\text{T}) \\quad (\\text{H}, \\text{T}, \\text{H}) \\quad (\\text{T}, \\text{H}, \\text{H}) $$\n\n$$ (\\text{H}, \\text{T}, \\text{T}) \\quad (\\text{T}, \\text{H}, \\text{T}) \\quad (\\text{T}, \\text{T}, \\text{H}) \\quad (\\text{T}, \\text{T}, \\text{T}) $$\n\nThese are 8 equally likely outcomes. Exactly two heads occur in (H, H, T), (H, T, H) and (T, H, H), that is, 3 favourable outcomes:\n\n$$ P(\\text{exactly two heads}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{3}{8} = 0.375 $$\n\n**Answer:** $0.375$\n\n**b)** All outcomes except (T, T, T) have at least one head, that is, $8 - 1 = 7$ favourable outcomes:\n\n$$ P(\\text{at least one head}) = \\frac{7}{8} = 0.875 $$\n\n**Answer:** $0.875$\n\n**c)** Each new toss can be heads or tails, so the number of outcomes doubles with each toss: 2, 4, 8, 16 and so on. With $n$ tosses there are $2^n$ equally likely outcomes, and of these only one has no heads. Therefore\n\n$$ P(\\text{at least one head}) = \\frac{2^n - 1}{2^n} = 1 - \\frac{1}{2^n} $$\n\nThe probability is greater than $0.99$ when $\\dfrac{1}{2^n}$ is less than $0.01$, that is, when $2^n$ is greater than 100. We test:\n\n| $n$ | 5 | 6 | 7 |\n|---|---|---|---|\n| $2^n$ | 32 | 64 | 128 |\n\nSix tosses are not enough, since 64 is less than 100. Seven tosses give $P(\\text{at least one head}) = \\dfrac{127}{128} \\approx 0.992$, which is greater than $0.99$.\n\n**Answer:** 7 times\n\n**General conclusion:** when only one or a few outcomes are unfavourable, it is easiest to count them and subtract from the number of possible outcomes."
   },
   {
    "level": 3,
    "question": "A bag contains only red and blue marbles. The probability of drawing a red marble is $\\dfrac{1}{3}$. When 5 red marbles are put in the bag, the probability of drawing a red marble becomes $\\dfrac{1}{2}$.<br>a) Show that there were originally twice as many blue marbles as red.<br>b) How many red and how many blue marbles were there in the bag originally?",
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
      "etikett": "red"
     },
     {
      "del": "b",
      "value": 10,
      "unit": "",
      "etikett": "blue"
     }
    ],
    "solution": "**The insight:** there are two unknowns, the number of red $r$ and the number of blue $b$, and two pieces of information that each give an equation. The number of blue marbles does not change when the red ones are added.\n\n**a)** Originally there are $r + b$ marbles, and $r$ of them are red:\n\n$$ P(\\text{red}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{r}{r + b} = \\frac{1}{3} $$\n\nOne third of the marbles being red means that the total number is three times the number of red:\n\n$$ r + b = 3r $$\n\n$$ r + b \\mathbin{\\boldsymbol{-}} \\boldsymbol{r} = 3r \\mathbin{\\boldsymbol{-}} \\boldsymbol{r} $$\n\n$$ b = 2r $$\n\n**Answer:** $b = 2r$, so twice as many blue as red.\n\n**b)** After the addition there are $r + 5$ red and still $b$ blue marbles. The probability $\\dfrac{1}{2}$ means that half of the marbles are red, that is, there are as many red as blue:\n\n$$ r + 5 = b $$\n\nFrom a) we know that $b = 2r$. Substituted into the equation above, this gives\n\n$$ r + 5 = 2r $$\n\n$$ r + 5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{r} = 2r \\mathbin{\\boldsymbol{-}} \\boldsymbol{r} $$\n\n$$ 5 = r $$\n\nThe number of blue is $b = 2r = 2 \\cdot 5 = 10$.\n\nCheck: originally $\\dfrac{5}{5 + 10} = \\dfrac{5}{15} = \\dfrac{1}{3}$. Afterwards $\\dfrac{5 + 5}{10 + 10} = \\dfrac{10}{20} = \\dfrac{1}{2}$. Both are correct.\n\n**Answer:** 5 red and 10 blue marbles\n\n**General conclusion:** a known probability only says something about the *ratio* between numbers, not about the numbers themselves. To find two numbers, two pieces of information are needed, and they then give two equations."
   },
   {
    "level": 3,
    "question": "$n$ people, among them Alva and Bo, sit down at random on $n$ chairs standing in a row. Give the answers to a) and b) in decimal form with two decimal places.<br>a) Find the probability that Alva and Bo sit next to each other when $n = 3$.<br>b) Find the probability that Alva and Bo sit next to each other when $n = 4$.<br>c) Show that the probability that Alva and Bo sit next to each other is $\\dfrac{2}{n}$.",
    "answer": {
     "value": 0.5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.67,
      "unit": "",
      "tol": 0.02
     },
     {
      "del": "b",
      "value": 0.5,
      "unit": ""
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the only thing that decides whether Alva and Bo sit next to each other is *which pair of chairs* the two of them get. All pairs are equally likely, so it is enough to count pairs of chairs instead of whole seating arrangements.\n\n**a)** With three people, Alva (A), Bo (B) and a third person (C), there are six equally likely arrangements:\n\n$$ \\text{ABC} \\quad \\text{ACB} \\quad \\text{BAC} \\quad \\text{BCA} \\quad \\text{CAB} \\quad \\text{CBA} $$\n\nAlva and Bo sit next to each other in ABC, BAC, CAB and CBA, that is, 4 favourable outcomes:\n\n$$ P(\\text{next to each other}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{4}{6} = \\frac{2}{3} \\approx 0.67 $$\n\n**Answer:** $\\dfrac{2}{3} \\approx 0.67$\n\n**b)** With four people there are many arrangements, but we only care about which two chairs Alva and Bo get. Number the chairs 1, 2, 3 and 4. The possible pairs of chairs are\n\n$$ \\{1, 2\\} \\quad \\{1, 3\\} \\quad \\{1, 4\\} \\quad \\{2, 3\\} \\quad \\{2, 4\\} \\quad \\{3, 4\\} $$\n\nthat is, 6 equally likely pairs. The chairs are next to each other in $\\{1, 2\\}$, $\\{2, 3\\}$ and $\\{3, 4\\}$, that is, 3 favourable pairs:\n\n$$ P(\\text{next to each other}) = \\frac{3}{6} = \\frac{1}{2} = 0.5 $$\n\nThe same method gives the answer in a): of the three pairs of chairs $\\{1, 2\\}$, $\\{1, 3\\}$ and $\\{2, 3\\}$, two are favourable, and $\\dfrac{2}{3}$ is correct.\n\n**Answer:** $0.5$\n\n**c)** *The number of possible pairs of chairs:* each chair can be paired with the $n - 1$ other chairs. That gives $n(n - 1)$, but then each pair has been counted twice ($\\{1, 2\\}$ and $\\{2, 1\\}$ are the same pair). The number of pairs is therefore $\\dfrac{n(n - 1)}{2}$.\n\n*The number of favourable pairs of chairs:* in a row of $n$ chairs there are $n - 1$ gaps between neighbouring chairs, and each gap gives a pair of neighbouring chairs. That gives $n - 1$ favourable pairs.\n\n$$ P(\\text{next to each other}) = \\frac{n - 1}{\\dfrac{n(n - 1)}{2}} = \\frac{2(n - 1)}{n(n - 1)} = \\frac{2}{n} $$\n\nIn the last step the fraction is simplified by $n - 1$. Check: $n = 3$ gives $\\dfrac{2}{3}$ and $n = 4$ gives $\\dfrac{2}{4} = \\dfrac{1}{2}$, just as in a) and b).\n\n**Answer:** The probability is $\\dfrac{2}{n}$.\n\n**General conclusion:** the sample space can often be chosen more cleverly. Here it is enough to count pairs of chairs instead of whole arrangements, since the places of the other people do not affect the event."
   },
   {
    "level": 3,
    "question": "Two dice each have $n$ sides, numbered $1, 2, \\ldots, n$, and all sides are equally likely. The dice are rolled once.<br>a) Find the probability that the first die shows a larger number than the second when $n = 6$. Give the answer in decimal form with three decimal places.<br>b) Show that the probability that the first die shows a larger number than the second is $\\dfrac{n - 1}{2n}$.<br>c) How many sides do the dice have if the probability that the first shows a larger number than the second is $0.45$?",
    "answer": {
     "value": 10,
     "unit": "sides"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.417,
      "unit": "",
      "tol": 0.01
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 10,
      "unit": "sides"
     }
    ],
    "solution": "**The insight:** symmetry. For every outcome where the first die shows the larger number there is a mirror outcome where the second shows the larger number, for example (5, 2) and (2, 5). Once the outcomes with equal numbers have been removed, the rest are therefore split exactly in half.\n\n**a)** With $n = 6$ there are $6 \\cdot 6 = 36$ equally likely outcomes. Six of them show equal numbers: (1, 1), (2, 2), …, (6, 6). That leaves $36 - 6 = 30$ outcomes, and by symmetry the first die shows the larger number in half of them, $\\dfrac{30}{2} = 15$:\n\n$$ P(\\text{first larger}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{15}{36} \\approx 0.417 $$\n\nCheck by counting in the sample space: if the second die shows 1, the first can show 2–6 (5 outcomes), if it shows 2, the first can show 3–6 (4 outcomes) and so on: $5 + 4 + 3 + 2 + 1 = 15$. Correct.\n\n**Answer:** $\\dfrac{15}{36} \\approx 0.417$\n\n**b)** With $n$ sides there are $n \\cdot n = n^2$ equally likely outcomes. Of these, $n$ show equal numbers. That leaves $n^2 - n$ outcomes, and the first die shows the larger number in half of them, $\\dfrac{n^2 - n}{2}$:\n\n$$ P(\\text{first larger}) = \\frac{\\dfrac{n^2 - n}{2}}{n^2} = \\frac{n^2 - n}{2n^2} = \\frac{n(n - 1)}{2n \\cdot n} = \\frac{n - 1}{2n} $$\n\nIn the last step the fraction is simplified by $n$. Check: $n = 6$ gives $\\dfrac{5}{12} = \\dfrac{15}{36}$, as in a).\n\n**Answer:** The probability is $\\dfrac{n - 1}{2n}$.\n\n**c)** We set the expression from b) equal to $0.45$ and solve for $n$:\n\n$$ \\frac{n - 1}{2n} = 0.45 $$\n\n$$ \\frac{n - 1}{2n} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{2n} = 0.45 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{2n} $$\n\n$$ n - 1 = 0.9n $$\n\n$$ n - 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.9n} = 0.9n \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.9n} $$\n\n$$ 0.1n - 1 = 0 $$\n\n$$ 0.1n - 1 \\mathbin{\\boldsymbol{+}} \\boldsymbol{1} = 0 \\mathbin{\\boldsymbol{+}} \\boldsymbol{1} $$\n\n$$ 0.1n = 1 $$\n\n$$ \\frac{0.1n}{\\boldsymbol{0.1}} = \\frac{1}{\\boldsymbol{0.1}} $$\n\n$$ n = 10 $$\n\nCheck: $\\dfrac{10 - 1}{2 \\cdot 10} = \\dfrac{9}{20} = 0.45$. Correct.\n\n**Answer:** 10 sides\n\n**General conclusion:** the probability $\\dfrac{n - 1}{2n}$ is always slightly less than $\\dfrac{1}{2}$, since the outcomes with equal numbers belong to neither of the two. The more sides, the smaller the proportion of outcomes showing equal numbers, and the closer the probability comes to $\\dfrac{1}{2}$."
   }
  ]
 },
 "ma1c-5.5": {
  "kalla": "4f5e2546a4",
  "data": [
   {
    "level": 1,
    "question": "A drawing pin landed point up in 132 of 200 throws. What is the relative frequency of \"point up\" as a percentage?",
    "answer": {
     "value": 66,
     "unit": "%"
    },
    "solution": "Relative frequency = the number of times the event occurred divided by the number of trials:\n\n$$ \\frac{132}{200} = 0.66 = 66\\ \\% $$\n\n**Answer:** 66 %"
   },
   {
    "level": 1,
    "question": "Why can the classical definition of probability NOT be used for throwing a drawing pin (point up or point down)?",
    "choices": [
     "The outcomes are not equally likely",
     "There are more than two outcomes",
     "Drawing pins are too small to calculate with",
     "It certainly can be used: the probability is 50 %"
    ],
    "correct": 0,
    "solution": "The classical definition requires a uniform probability distribution. A drawing pin is asymmetrical, so point up and point down are NOT equally likely. The probability must then be determined experimentally through repeated throws.\n\n**Answer:** The outcomes are not equally likely."
   },
   {
    "level": 1,
    "question": "What happens to the experimental probability when the number of trials increases?",
    "choices": [
     "It becomes more accurate",
     "It becomes less accurate",
     "It always becomes 50 %",
     "It is not affected by the number of trials"
    ],
    "correct": 0,
    "solution": "The more trials, the closer the relative frequency comes to the true probability. In the penalty example the frequency jumped between 40 % and 100 % at first but settled down around 70 %.\n\n**Answer:** It becomes more accurate."
   },
   {
    "level": 2,
    "question": "A basketball player scored 87 of 120 free throws during a season. What is the probability (as a percentage, one decimal place) that the next free throw goes in?",
    "answer": {
     "value": 72.5,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "The experimental probability is the relative frequency:\n\n$$ \\frac{87}{120} = 0.725 = 72.5\\ \\% $$\n\n**Answer:** 72.5 %"
   },
   {
    "level": 2,
    "question": "During one year, 4&nbsp;850 babies were born at a hospital, of whom 2&nbsp;361 were girls. What is the experimental probability that a baby born there is a boy? Give your answer as a percentage with one decimal place.",
    "answer": {
     "value": 51.3,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "The number of boys is $4\\ 850 - 2\\ 361 = 2\\ 489$:\n\n$$ P(\\text{boy}) = \\frac{2\\ 489}{4\\ 850} = 0.5132\\ldots \\approx 51.3\\ \\% $$\n\n**Answer:** About 51.3 %"
   },
   {
    "level": 3,
    "question": "Elvin tosses a coin 10 times and gets 7 heads. He says: \"The coin is biased, the probability of heads is 70&nbsp;%!\" What is the most important objection?",
    "choices": [
     "He is right, since the relative frequency is always equal to the probability",
     "A coin can never be biased",
     "10 tosses are far too few, since the relative frequency varies a lot when the number of trials is small",
     "The probability of heads can never be anything other than exactly 50&nbsp;%"
    ],
    "correct": 2,
    "solution": "**The insight:** the relative frequency approaches the probability only after many trials. After a few trials it swings strongly by pure chance.\n\nCompare with the penalty example in the lesson: after 1 penalty the relative frequency was 100&nbsp;%, after 5 penalties 40&nbsp;%, and only after many penalties did it settle down around 70&nbsp;%.\n\nWith only 10 tosses, 7 heads is nothing strange at all. A fair coin gives exactly 7 heads in just under 12&nbsp;% of all series of ten tosses, and at least 7 heads in about 17&nbsp;% of them.\n\nIf Elvin wants to claim that the coin is biased, he needs to toss it many more times, hundreds of tosses, and see whether the relative frequency is still far from 50&nbsp;%.\n\nThe claim that a coin can never be biased, or that the probability is always exactly 50&nbsp;%, is not true either: a bent or uneven coin may well be biased. That is exactly why trials are carried out.\n\n**Answer:** 10 tosses are too few. The relative frequency has not had time to settle down.\n\n**General conclusion:** \"the more trials, the more reliable the value\" is the core of experimental probabilities. A deviation in a short series is usually chance, not proof."
   },
   {
    "level": 3,
    "question": "Adam and Bea investigate how often a bottle cap lands with the opening facing up. Adam throws the cap 20 times and gets the opening up in 60&nbsp;% of the throws. Bea throws the same cap 180 times and gets the opening up in 40&nbsp;% of the throws. Adam says: \"The mean of our results is 50&nbsp;%, so the probability is 50&nbsp;%.\"<br>a) Find the best estimate of the probability using all the throws. Give the answer as a percentage.<br>b) Explain what is wrong with Adam's reasoning.",
    "answer": {
     "value": 42,
     "unit": "%"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 42,
      "unit": "%",
      "etikett": "$P(\\text{opening up}) \\approx$"
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The insight:** a relative frequency is calculated from the number of times the event occurred and the number of trials. Two percentages must not be averaged when they are based on different numbers of trials.\n\n**a)** First the number of throws with the opening up for each of them. The number is the proportion times the number of throws:\n\n$$ \\text{Adam: } 0.60 \\cdot 20 = 12 $$\n\n$$ \\text{Bea: } 0.40 \\cdot 180 = 72 $$\n\nTogether they have made $20 + 180 = 200$ throws, and the opening came up $12 + 72 = 84$ times. Relative frequency is the number of times the event occurred divided by the number of trials:\n\n$$ \\frac{84}{200} = 0.42 = 42\\ \\% $$\n\n**Answer:** 42&nbsp;%\n\n**b)** Adam gives his 20 throws as much weight as Bea's 180 throws. But Bea's series is nine times as long and therefore much more reliable. The more trials, the more reliable the relative frequency. Therefore all 200 throws should be counted together, and then the result ends up close to Bea's 40&nbsp;%, not halfway between.\n\n**Answer:** The mean treats the two series as equally important even though Bea's series has nine times as many throws. The correct approach is to add all the throws together and calculate the relative frequency on the total.\n\n**General conclusion:** experimental results are combined by adding the numbers together, never by averaging the percentages."
   },
   {
    "level": 3,
    "question": "Lisa rolls two ordinary dice 360 times and works out the sum of the dots each time. The sum is 7 in 61 of the rolls. Lisa reasons like this: \"The sum can be 2, 3, 4, … , 12, so 11 different sums. The probability of the sum 7 is therefore $\\dfrac{1}{11}$.\"<br>a) Find the relative frequency of the sum 7 in Lisa's trials. Give the answer as a percentage with one decimal place.<br>b) Show that Lisa's reasoning is wrong, and find the correct probability of the sum 7. Give the answer as a percentage with one decimal place.<br>c) Do Lisa's trials agree better with her own probability or with the one you calculated in b)?",
    "answer": {
     "value": 16.7,
     "unit": "%",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 16.9,
      "unit": "%",
      "tol": 0.01,
      "etikett": "relative frequency"
     },
     {
      "del": "b",
      "value": 16.7,
      "unit": "%",
      "tol": 0.01,
      "etikett": "$P(\\text{the sum } 7) \\approx$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the classical definition of probability requires the outcomes to be equally likely. The 11 sums are not, just as \"being hit by a meteorite or not\" are not two equally likely outcomes.\n\n**a)** Relative frequency is the number of times the event occurred divided by the number of trials:\n\n$$ \\frac{61}{360} = 0.1694\\ldots \\approx 16.9\\ \\% $$\n\n**Answer:** 16.9&nbsp;%\n\n**b)** The equally likely outcomes are not the sums but the combinations of the two dice. The table shows the sum for each combination. The row is the first die, the column the second:\n\n| + | 1 | 2 | 3 | 4 | 5 | 6 |\n| --- | --- | --- | --- | --- | --- | --- |\n| **1** | 2 | 3 | 4 | 5 | 6 | **7** |\n| **2** | 3 | 4 | 5 | 6 | **7** | 8 |\n| **3** | 4 | 5 | 6 | **7** | 8 | 9 |\n| **4** | 5 | 6 | **7** | 8 | 9 | 10 |\n| **5** | 6 | **7** | 8 | 9 | 10 | 11 |\n| **6** | **7** | 8 | 9 | 10 | 11 | 12 |\n\nThere are $6 \\cdot 6 = 36$ equally likely combinations. The sum 7 occurs in 6 of them, but the sum 2 in only one (1 and 1). So the sums are not equally likely, and therefore you cannot calculate with $\\dfrac{1}{11}$.\n\nThe probability is the number of favourable outcomes divided by the number of possible outcomes:\n\n$$ P(\\text{the sum } 7) = \\frac{6}{36} = \\frac{1}{6} = 0.1666\\ldots \\approx 16.7\\ \\% $$\n\n**Answer:** $P(\\text{the sum } 7) = \\dfrac{1}{6}$, that is, about 16.7&nbsp;%\n\n**c)** Lisa's own probability is $\\dfrac{1}{11} \\approx 9.1\\ \\%$. With that, the sum 7 would come up about $360 \\cdot \\dfrac{1}{11} \\approx 33$ times. With the probability $\\dfrac{1}{6}$ it would come up about $360 \\cdot \\dfrac{1}{6} = 60$ times. Lisa got it 61 times, and the relative frequency 16.9&nbsp;% is very close to 16.7&nbsp;%.\n\n**Answer:** The trials agree with the probability $\\dfrac{1}{6}$ from b), not with Lisa's $\\dfrac{1}{11}$.\n\n**General conclusion:** an experiment can reveal incorrect reasoning. When the relative frequency after many trials is far from a calculated probability, you should suspect that the outcomes were not equally likely."
   },
   {
    "level": 3,
    "question": "A newspaper writes: \"Most cyclists who get a head injury wear a helmet.\" During one year, 48 cyclists with a helmet and 32 cyclists without a helmet got a head injury in a municipality. In the municipality, 4&nbsp;000 people cycled with a helmet and 800 people without a helmet.<br>a) Find the relative frequency of head injury among the cyclists with a helmet and among the cyclists without a helmet. Give the answers as percentages.<br>b) How many times as great was the risk of head injury without a helmet as with a helmet?<br>c) Explain why the newspaper's claim does not show that the helmet is dangerous.",
    "answer": {
     "value": 3.3,
     "unit": "times",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.2,
      "unit": "%",
      "etikett": "with a helmet"
     },
     {
      "del": "a",
      "value": 4,
      "unit": "%",
      "etikett": "without a helmet"
     },
     {
      "del": "b",
      "value": 3.3,
      "unit": "times",
      "tol": 0.02
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the number of injured says nothing about the risk until it is divided by the number who cycle. It is the relative frequencies that should be compared, not the numbers.\n\n**a)** Relative frequency is the number of times the event occurred divided by the number in the group.\n\nWith a helmet:\n\n$$ \\frac{48}{4\\,000} = 0.012 = 1.2\\ \\% $$\n\nWithout a helmet:\n\n$$ \\frac{32}{800} = 0.04 = 4\\ \\% $$\n\n**Answer:** With a helmet 1.2&nbsp;%, without a helmet 4&nbsp;%\n\n**b)** We compare the two relative frequencies by dividing one by the other:\n\n$$ \\frac{0.04}{0.012} = 3.333\\ldots \\approx 3.3 $$\n\n**Answer:** About 3.3 times as great\n\n**c)** More of the injured wear a helmet only because many more cyclists wear a helmet: 4&nbsp;000 against 800, that is, five times as many. Calculated per cyclist, the risk of head injury is just over three times as great without a helmet.\n\nThe figures show a relationship, but not with complete certainty that the helmet is the cause. Those who cycle without a helmet may also differ in other ways, for example in how fast or where they cycle. But the claim that the helmet is dangerous is in any case not supported at all.\n\n**Answer:** The claim compares numbers instead of proportions. Since five times as many cycle with a helmet, the number of injured is larger there, even though the risk per cyclist is smaller.\n\n**General conclusion:** always compare relative frequencies when the groups are of different sizes. A large number in a large group can be a small proportion."
   },
   {
    "level": 3,
    "question": "To estimate how many perch there are in a small lake, a researcher catches 60 perch, tags them and releases them. A week later she catches 80 perch, and 12 of them are tagged.<br>a) Find the relative frequency of tagged perch in the second catch. Give the answer as a percentage.<br>b) Estimate how many perch there are in the lake.<br>c) State two assumptions that must hold for the estimate to be reasonable.",
    "answer": {
     "value": 400,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 15,
      "unit": "%",
      "etikett": "tagged"
     },
     {
      "del": "b",
      "value": 400,
      "unit": "",
      "etikett": "number of perch"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the second catch is a trial. The proportion of tagged perch in the catch is an experimental estimate of the proportion of tagged perch in the whole lake, and that proportion is 60 divided by the unknown total number.\n\n**a)** Relative frequency is the number tagged divided by the number caught:\n\n$$ \\frac{12}{80} = 0.15 = 15\\ \\% $$\n\n**Answer:** 15&nbsp;%\n\n**b)** Call the number of perch in the lake $N$. Of these, 60 are tagged, so the proportion tagged in the lake is $\\dfrac{60}{N}$. It should be equal to the proportion in the catch:\n\n$$ \\frac{60}{N} = 0.15 $$\n\n$$ \\frac{60}{N} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{N} = 0.15 \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{N} $$\n\n$$ 60 = 0.15N $$\n\n$$ \\frac{60}{\\boldsymbol{0.15}} = \\frac{0.15N}{\\boldsymbol{0.15}} $$\n\n$$ 400 = N $$\n\nCheck: 60 tagged out of 400 perch is $\\dfrac{60}{400} = 0.15$, the same proportion as in the catch.\n\nReasonableness: the lake must have at least $60 + 80 - 12 = 128$ different perch, since that many have been caught. 400 is more than that.\n\n**Answer:** About 400 perch\n\n**c)** For example:\n- The tagged perch have had time to mix evenly with the others before the second catch.\n- The number of perch in the lake is the same during the week, that is, none or few have died, been born or moved.\n- Tagged and untagged perch are equally easy to catch, and no tags have come off.\n\n**Answer:** For example, that the tagged perch have mixed evenly with the others and that the number of perch has not changed during the week.\n\n**General conclusion:** an experimental probability can be used backwards. If the proportion is known from a trial and part of the whole is known, the whole can be estimated."
   },
   {
    "level": 3,
    "question": "Nora has taken a number of penalties, and 70&nbsp;% of them have been goals. Then she scores on 10 penalties in a row, and the relative frequency of goals becomes 75&nbsp;%.<br>a) How many penalties had Nora taken before the 10 goals in a row?<br>b) How many more goals in a row are needed after that for the relative frequency to become 80&nbsp;%?<br>c) Can the relative frequency ever become 100&nbsp;% if Nora continues to score on every penalty? Justify your answer.",
    "answer": {
     "value": 50,
     "unit": "penalties"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 50,
      "unit": "penalties"
     },
     {
      "del": "b",
      "value": 15,
      "unit": "goals"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the relative frequency is the number of goals divided by the number of penalties. If the unknown number is called $n$, both before and after can be written in terms of $n$, and that gives an equation.\n\n**a)** Before: $n$ penalties and $0.7n$ goals. After: $n + 10$ penalties and $0.7n + 10$ goals. The number of goals should be 75&nbsp;% of the number of penalties:\n\n$$ 0.7n + 10 = 0.75(n + 10) $$\n\n$$ 0.7n + 10 = 0.75n + 7.5 $$\n\n$$ 0.7n + 10 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.7n} = 0.75n + 7.5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.7n} $$\n\n$$ 10 = 0.05n + 7.5 $$\n\n$$ 10 \\mathbin{\\boldsymbol{-}} \\boldsymbol{7.5} = 0.05n + 7.5 \\mathbin{\\boldsymbol{-}} \\boldsymbol{7.5} $$\n\n$$ 2.5 = 0.05n $$\n\n$$ \\frac{2.5}{\\boldsymbol{0.05}} = \\frac{0.05n}{\\boldsymbol{0.05}} $$\n\n$$ 50 = n $$\n\nCheck: before, 50 penalties and $0.7 \\cdot 50 = 35$ goals. After, 60 penalties and 45 goals, and $\\dfrac{45}{60} = 0.75 = 75\\ \\%$. Correct.\n\n**Answer:** 50 penalties\n\n**b)** Now Nora has 45 goals from 60 penalties. Call the number of further goals in a row $k$. Then the number of goals becomes $45 + k$ and the number of penalties $60 + k$, and the number of goals should be 80&nbsp;% of the number of penalties:\n\n$$ 45 + k = 0.8(60 + k) $$\n\n$$ 45 + k = 48 + 0.8k $$\n\n$$ 45 + k \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.8k} = 48 + 0.8k \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.8k} $$\n\n$$ 45 + 0.2k = 48 $$\n\n$$ 45 + 0.2k \\mathbin{\\boldsymbol{-}} \\boldsymbol{45} = 48 \\mathbin{\\boldsymbol{-}} \\boldsymbol{45} $$\n\n$$ 0.2k = 3 $$\n\n$$ \\frac{0.2k}{\\boldsymbol{0.2}} = \\frac{3}{\\boldsymbol{0.2}} $$\n\n$$ k = 15 $$\n\nCheck: $\\dfrac{45 + 15}{60 + 15} = \\dfrac{60}{75} = 0.8 = 80\\ \\%$. Correct.\n\n**Answer:** 15 goals in a row\n\n**c)** Nora has 15 misses after the 60 penalties, since $60 - 45 = 15$. The misses never disappear. After $k$ new goals the relative frequency is\n\n$$ \\frac{45 + k}{60 + k} $$\n\nand the denominator is always 15 larger than the numerator. The fraction is therefore always less than 1, that is, less than 100&nbsp;%. It comes closer and closer to 100&nbsp;% the more goals she scores, but never gets there.\n\n**Answer:** No. The 15 misses remain, so the number of goals is always 15 less than the number of penalties.\n\n**General conclusion:** the more trials that have already been made, the more it takes to move the relative frequency. This is the same thing as it settling down when the number of trials becomes large."
   },
   {
    "level": 3,
    "question": "A training app shows the exact relative frequency of hits, without rounding. After a number of shots, the app shows that Mira has hit with 37.5&nbsp;% of her shots.<br>a) What is the smallest number of shots Mira can have taken?<br>b) Mira takes one more shot, and now the app shows 40&nbsp;%. How many shots has Mira taken in total now?",
    "answer": {
     "value": 25,
     "unit": "shots"
    },
    "delsvar": [
     {
      "del": "a",
      "value": 8,
      "unit": "shots"
     },
     {
      "del": "b",
      "value": 25,
      "unit": "shots"
     }
    ],
    "solution": "**The insight:** an exact relative frequency is a fraction, the number of hits divided by the number of shots. If the percentage is written as a simplified fraction, the denominator reveals which numbers of shots are possible.\n\n**a)** Write 37.5&nbsp;% as a fraction and simplify as far as possible:\n\n$$ 37.5\\ \\% = 0.375 = \\frac{375}{1\\,000} = \\frac{3}{8} $$\n\nSo the number of hits divided by the number of shots must be $\\dfrac{3}{8}$. That is only possible if the number of shots is 8, 16, 24 and so on, with 3, 6, 9 … hits. With fewer than 8 shots, $\\dfrac{3}{8}$ cannot be obtained, since the fraction cannot be simplified further.\n\n**Answer:** 8 shots\n\n**b)** Before the new shot, Mira has taken $8m$ shots and hit $3m$ times, where $m$ is a positive integer. The new shot is either a hit or a miss, so we test both.\n\n**If the new shot was a miss**, the number of hits is $3m$ and the number of shots $8m + 1$. The number of hits should be 40&nbsp;% of the number of shots:\n\n$$ 3m = 0.4(8m + 1) $$\n\n$$ 3m = 3.2m + 0.4 $$\n\n$$ 3m \\mathbin{\\boldsymbol{-}} \\boldsymbol{3.2m} = 3.2m + 0.4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3.2m} $$\n\n$$ -0.2m = 0.4 $$\n\n$$ \\frac{-0.2m}{\\boldsymbol{-0.2}} = \\frac{0.4}{\\boldsymbol{-0.2}} $$\n\n$$ m = -2 $$\n\nA negative number of shots is impossible, so the new shot cannot have been a miss. That is also logical: a miss lowers the relative frequency, but it rose from 37.5&nbsp;% to 40&nbsp;%.\n\n**If the new shot was a hit**, the number of hits is $3m + 1$ and the number of shots $8m + 1$:\n\n$$ 3m + 1 = 0.4(8m + 1) $$\n\n$$ 3m + 1 = 3.2m + 0.4 $$\n\n$$ 3m + 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3m} = 3.2m + 0.4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{3m} $$\n\n$$ 1 = 0.2m + 0.4 $$\n\n$$ 1 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.4} = 0.2m + 0.4 \\mathbin{\\boldsymbol{-}} \\boldsymbol{0.4} $$\n\n$$ 0.6 = 0.2m $$\n\n$$ \\frac{0.6}{\\boldsymbol{0.2}} = \\frac{0.2m}{\\boldsymbol{0.2}} $$\n\n$$ 3 = m $$\n\nSo before the new shot Mira had taken $8 \\cdot 3 = 24$ shots with $3 \\cdot 3 = 9$ hits. Now she has taken 25 shots with 10 hits.\n\nCheck: $\\dfrac{9}{24} = 0.375 = 37.5\\ \\%$ and $\\dfrac{10}{25} = 0.4 = 40\\ \\%$. Correct.\n\n**Answer:** 25 shots\n\n**General conclusion:** an exact relative frequency does not determine the number of trials, only which numbers are possible. One more piece of information, here that a single shot changed the frequency from 37.5&nbsp;% to 40&nbsp;%, can be enough to determine the number completely."
   }
  ]
 },
 "ma1c-5.6": {
  "kalla": "b78abbfdb0",
  "data": [
   {
    "level": 1,
    "question": "What is the probability of getting heads twice in a row when tossing a coin? Give your answer as a fraction.",
    "choices": [
     "$1$",
     "$\\dfrac{1}{8}$",
     "$\\dfrac{1}{2}$",
     "$\\dfrac{1}{4}$"
    ],
    "correct": 3,
    "solution": "The tosses are independent, so the multiplication rule gives\n\n$$ P(\\text{two heads}) = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4} $$\n\n**Answer:** $\\dfrac{1}{4}$"
   },
   {
    "level": 1,
    "question": "Which of the following is an example of INDEPENDENT events?",
    "choices": [
     "Drawing two cards from a pack without replacement",
     "Two rolls of a die one after the other",
     "Choosing two students from a class for the same group",
     "Drawing two marbles from a bowl without replacement"
    ],
    "correct": 1,
    "solution": "The die has \"no memory\": the probability $\\dfrac{1}{6}$ of a six is the same on every roll. Draws WITHOUT replacement, on the other hand, are dependent: what is drawn first changes the conditions.\n\n**Answer:** Two rolls of a die one after the other."
   },
   {
    "level": 1,
    "question": "The probability that a certain bus is late is 0.2 every day, independently of other days. What is the probability that it is late two days in a row?",
    "answer": {
     "value": 0.04,
     "unit": "",
     "tol": 0.01
    },
    "solution": "The multiplication rule for independent events:\n\n$$ 0.2 \\cdot 0.2 = 0.04 = 4\\ \\% $$\n\n**Answer:** 0.04 (4 %)"
   },
   {
    "level": 2,
    "question": "A bag contains 5 green and 3 yellow sweets. You take two sweets without replacement. What is the probability that both are green? Give your answer as a percentage, rounded to a whole number.",
    "answer": {
     "value": 36,
     "unit": "%",
     "tol": 0.02
    },
    "solution": "Dependent events: the denominator decreases in the second draw.\n\n$$ P(\\text{two green}) = \\frac{5}{8} \\cdot \\frac{4}{7} = \\frac{20}{56} = \\frac{5}{14} \\approx 0.357 \\approx 36\\ \\% $$\n\n**Answer:** About 36 %"
   },
   {
    "level": 2,
    "question": "What is the probability of rolling three sixes in a row with a die? Give your answer as a fraction.",
    "choices": [
     "$\\dfrac{3}{6}$",
     "$\\dfrac{1}{18}$",
     "$\\dfrac{1}{216}$",
     "$\\dfrac{1}{36}$"
    ],
    "correct": 2,
    "solution": "Three independent rolls:\n\n$$ \\left(\\frac{1}{6}\\right)^3 = \\frac{1}{216} $$\n\n$\\dfrac{1}{18}$ would be $3 \\cdot \\dfrac{1}{6} \\cdot \\dfrac{1}{6}$... probabilities for \"in a row\" are multiplied, never added or multiplied by the number of events.\n\n**Answer:** $\\dfrac{1}{216}$"
   },
   {
    "level": 3,
    "question": "An ordinary die has shown a six on five rolls in a row. Kim says: \"Now it's time for something else. The probability of a six on the next roll must be smaller than usual.\"<br>a) What is the probability that the sixth roll is a six? Give your answer in decimal form with three decimal places.<br>b) Before the first roll was made: what was the probability that all six rolls would be sixes? Give your answer as a fraction.<br>c) Explain why the answers to a) and b) do not contradict each other, and what is wrong with Kim's reasoning.",
    "answer": {
     "value": 0.167,
     "unit": "",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.167,
      "unit": "",
      "tol": 0.01,
      "etikett": "$P(\\text{six}) \\approx$"
     },
     {
      "del": "b",
      "value": 0.0000214335,
      "unit": "",
      "tol": 0.01,
      "etikett": "$P(\\text{six sixes}) =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the die has no memory. The five rolls already made are no longer chance; they have happened. Only the roll that remains is uncertain.\n\n**a)** The rolls are independent events: the probability of a six is not affected by what the die has shown before. The sixth roll is an ordinary roll with six equally likely outcomes, of which one is favourable:\n\n$$ P(\\text{six}) = \\frac{\\text{number of favourable outcomes}}{\\text{number of possible outcomes}} = \\frac{1}{6} \\approx 0.167 $$\n\n**Answer:** $\\dfrac{1}{6} \\approx 0.167$\n\n**b)** Before the first roll, six independent events must all happen. The multiplication rule gives\n\n$$ P(\\text{six sixes}) = \\frac{1}{6} \\cdot \\frac{1}{6} \\cdot \\frac{1}{6} \\cdot \\frac{1}{6} \\cdot \\frac{1}{6} \\cdot \\frac{1}{6} = \\left(\\frac{1}{6}\\right)^6 = \\frac{1}{46\\,656} $$\n\n**Answer:** $\\dfrac{1}{46\\,656}$\n\n**c)** The answers describe two different questions. In b) all six rolls are uncertain, and then it is very unlikely that they will all be sixes. In a) five of them have already happened. The product in b) can be written\n\n$$ \\underbrace{\\left(\\frac{1}{6}\\right)^5}_{\\text{five sixes (have happened)}} \\cdot \\underbrace{\\frac{1}{6}}_{\\text{sixth roll}} $$\n\nand when the first five factors are already a fact, only the last one, $\\dfrac{1}{6}$, remains.\n\nKim's mistake is to believe that the die \"remembers\" the sixes and compensates for them. Compare: before the first roll, the probability of five sixes followed by a one is\n\n$$ \\left(\\frac{1}{6}\\right)^5 \\cdot \\frac{1}{6} = \\frac{1}{46\\,656} $$\n\nthat is, exactly the same as for six sixes. \"Something else\" on the last roll is no more likely than a six.\n\n**Answer:** The question in a) concerns a single roll when five have already been made, the question in b) concerns all six rolls before any has been made. The rolls are independent, so the probability of a six is always $\\dfrac{1}{6}$ however many sixes have come before.\n\n**General conclusion:** the multiplication rule calculates with what has not yet happened. What has already happened has the probability 1 and does not change independent events going forward."
   },
   {
    "level": 3,
    "question": "A light fitting has three bulbs, and it counts as fault-free only if all three bulbs last the whole guarantee period. The bulbs fail independently of each other, and each bulb lasts the guarantee period with probability $p$.<br>a) What is the probability that the light fitting is fault-free if $p = 0.95$? Give your answer as a percentage with one decimal place.<br>b) The manufacturer wants at least 90&nbsp;% of the light fittings to be fault-free. What is the smallest value $p$ can have? Give your answer as a percentage with one decimal place.<br>c) A larger light fitting has six bulbs and the same requirement of 90&nbsp;%. What is the smallest value $p$ can then have? Give your answer as a percentage with one decimal place.",
    "answer": {
     "value": 96.6,
     "unit": "%",
     "tol": 0.002
    },
    "delsvar": [
     {
      "del": "a",
      "value": 85.7,
      "unit": "%",
      "tol": 0.002,
      "etikett": "fault-free light fitting"
     },
     {
      "del": "b",
      "value": 96.6,
      "unit": "%",
      "tol": 0.002,
      "etikett": "$p \\geq$"
     },
     {
      "del": "c",
      "value": 98.3,
      "unit": "%",
      "tol": 0.002,
      "etikett": "$p \\geq$"
     }
    ],
    "solution": "**The insight:** the multiplication rule can be read backwards. When the requirement applies to the whole product, $p^3 \\geq 0.9$, the individual probability $p$ becomes an unknown that is solved for with a root.\n\n**a)** The light fitting is fault-free when bulb 1 lasts and bulb 2 lasts and bulb 3 lasts. The bulbs are independent, so the multiplication rule gives\n\n$$ P(\\text{fault-free}) = 0.95 \\cdot 0.95 \\cdot 0.95 = 0.95^3 = 0.857375 \\approx 85.7\\ \\% $$\n\nEven though each bulb is good, about one in seven light fittings is faulty.\n\n**Answer:** 85.7&nbsp;%\n\n**b)** With the probability $p$ for each bulb, $P(\\text{fault-free}) = p^3$. The limit is where the product is exactly 0.9:\n\n$$ p^3 = 0.9 $$\n\nWe take the cube root of both sides:\n\n$$ \\boldsymbol{\\sqrt[3]{p^3}} = \\boldsymbol{\\sqrt[3]{0.9}} $$\n\n$$ p = 0.96548\\ldots $$\n\nRounded down to 96.5&nbsp;% it is not enough, since $0.965^3 \\approx 0.899 < 0.9$. With 96.6&nbsp;%, $0.966^3 \\approx 0.901$, which meets the requirement. Therefore we round up.\n\n**Answer:** $p$ must be at least 96.6&nbsp;%\n\n**c)** With six bulbs, $P(\\text{fault-free}) = p^6$:\n\n$$ p^6 = 0.9 $$\n\nWe take the sixth root of both sides:\n\n$$ \\boldsymbol{\\sqrt[6]{p^6}} = \\boldsymbol{\\sqrt[6]{0.9}} $$\n\n$$ p = 0.98259\\ldots $$\n\nCheck: $0.983^6 \\approx 0.902$, which is enough, while $0.982^6 \\approx 0.897$ is not.\n\n**Answer:** $p$ must be at least 98.3&nbsp;%\n\n**General conclusion:** the more parts that must all work, the more reliable each part must be. Each new factor in the product is less than 1 and pulls the whole down."
   },
   {
    "level": 3,
    "question": "A class has 12 girls and 18 boys. Three students are chosen by lot for the student council, and the same student cannot be chosen twice. Linus calculates the probability that all three are girls like this:\n\n$$ \\frac{12}{30} \\cdot \\frac{12}{30} \\cdot \\frac{12}{30} = 0.064 $$\n\na) What mistake does Linus make?<br>b) Calculate the probability correctly. Give your answer as a percentage with one decimal place.<br>c) Explain why Linus's method always gives too large an answer in a task like this.",
    "answer": {
     "value": 5.4,
     "unit": "%",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 5.4,
      "unit": "%",
      "tol": 0.01,
      "etikett": "$P(\\text{three girls}) \\approx$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** a student who has already been chosen cannot be chosen again. It is a draw without replacement, that is, dependent events, and each new factor must be calculated on the class that remains.\n\n**a)** Linus treats the draws as independent, as if the first student were put back in the class before the next one was drawn. He uses $\\dfrac{12}{30}$ in all three factors.\n\n**Answer:** Linus calculates as if the draws were independent (with replacement), but they are dependent.\n\n**b)** In the first draw, 12 of 30 students are girls. Once a girl has been drawn, 11 girls remain out of 29 students, and after two girls, 10 remain out of 28:\n\n$$ P(\\text{three girls}) = \\frac{12}{30} \\cdot \\frac{11}{29} \\cdot \\frac{10}{28} = \\frac{1\\,320}{24\\,360} = \\frac{11}{203} \\approx 0.0542 = 5.4\\ \\% $$\n\n**Answer:** 5.4&nbsp;%\n\n**c)** Compare the factors two at a time. The proportion of girls among those remaining drops for each girl drawn:\n\n$$ \\frac{11}{29} \\approx 0.379 < \\frac{12}{30} = 0.4 \\qquad \\frac{10}{28} \\approx 0.357 < \\frac{12}{30} = 0.4 $$\n\nWhen a girl leaves the class, one of 12 girls is removed but only one of 30 students, so the girls decrease by a larger proportion than the class does. Linus's factors are therefore equal to or larger than the correct ones, and his product becomes too large (6.4&nbsp;% against 5.4&nbsp;%).\n\n**Answer:** Each girl drawn decreases the proportion of girls among those remaining, so the correct factors are smaller than $\\dfrac{12}{30}$. Linus multiplies by factors that are too large.\n\n**General conclusion:** drawing something of the same kind several times without replacement is less likely than with replacement. Always ask: is what was drawn still there for the next draw?"
   },
   {
    "level": 3,
    "question": "At a market you may choose a bag in a lottery. You draw two marbles from the bag without replacement and win if both are red.\n\n| Bag | Red marbles | Blue marbles |\n|---|---|---|\n| A | 3 | 2 |\n| B | 6 | 4 |\n| C | 60 | 40 |\n\nAll the bags have 60&nbsp;% red marbles.<br>a) Calculate the chance of winning with bag A and with bag B. Give your answers in decimal form with three decimal places.<br>b) Calculate the chance of winning with bag C. Give your answer in decimal form with three decimal places.<br>c) Explain why the bags give different chances of winning even though the proportion of red marbles is the same, and which number the chance of winning approaches if the bag is made very large.",
    "answer": {
     "value": 0.358,
     "unit": "",
     "tol": 0.003
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.3,
      "unit": "",
      "tol": 0.003,
      "etikett": "bag A"
     },
     {
      "del": "a",
      "value": 0.333,
      "unit": "",
      "tol": 0.003,
      "etikett": "bag B"
     },
     {
      "del": "b",
      "value": 0.358,
      "unit": "",
      "tol": 0.003,
      "etikett": "bag C"
     },
     {
      "del": "c",
      "value": 0.36,
      "unit": "",
      "tol": 0.003,
      "etikett": "limit"
     }
    ],
    "solution": "**The insight:** it is the second draw that separates the bags. A red marble drawn is a big loss in a small bag but almost nothing in a large one.\n\n**a)** The multiplication rule for dependent events: first the probability of red, then the probability of red again among the marbles that remain.\n\nBag A: 3 red out of 5, then 2 red out of 4:\n\n$$ P(\\text{two red}) = \\frac{3}{5} \\cdot \\frac{2}{4} = \\frac{6}{20} = 0.300 $$\n\nBag B: 6 red out of 10, then 5 red out of 9:\n\n$$ P(\\text{two red}) = \\frac{6}{10} \\cdot \\frac{5}{9} = \\frac{30}{90} = \\frac{1}{3} \\approx 0.333 $$\n\n**Answer:** Bag A: 0.300. Bag B: 0.333.\n\n**b)** Bag C: 60 red out of 100, then 59 red out of 99:\n\n$$ P(\\text{two red}) = \\frac{60}{100} \\cdot \\frac{59}{99} = \\frac{3\\,540}{9\\,900} \\approx 0.358 $$\n\n**Answer:** 0.358\n\n**c)** The first factor is 0.6 in all the bags. The difference lies in the second factor, the proportion of red among the marbles that remain:\n\n| Bag | Second factor |\n|---|---|\n| A | $\\dfrac{2}{4} = 0.5$ |\n| B | $\\dfrac{5}{9} \\approx 0.556$ |\n| C | $\\dfrac{59}{99} \\approx 0.596$ |\n\nIn a small bag, a red marble drawn lowers the proportion of red a lot; in a large bag hardly at all. The larger the bag, the closer the second factor gets to 0.6, and the draw behaves as if it were with replacement:\n\n$$ 0.6 \\cdot 0.6 = 0.36 $$\n\n**Answer:** The second factor becomes larger the more marbles the bag has, since a drawn marble then affects the proportion less. The chance of winning approaches 0.36.\n\n**General conclusion:** in a very large set, drawing without replacement is almost independent. That is why you can calculate with independent events when, for example, choosing a few people from a whole population, but not when choosing from a small group."
   },
   {
    "level": 3,
    "question": "Assume that all days of the week are equally likely as a birthday and that different people's birthdays are independent of each other.<br>a) What is the probability that two people were born on different days of the week? Give your answer in decimal form with three decimal places.<br>b) What is the probability that four people were all born on different days of the week? Give your answer as a percentage with one decimal place.<br>c) What is the smallest number of people needed for the probability that all were born on different days of the week to be less than 50&nbsp;%?",
    "answer": {
     "value": 35,
     "unit": "%",
     "tol": 0.005
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.857,
      "unit": "",
      "tol": 0.003,
      "etikett": "$P(\\text{different}) \\approx$"
     },
     {
      "del": "b",
      "value": 35,
      "unit": "%",
      "tol": 0.005,
      "etikett": "$P(\\text{all different}) \\approx$"
     },
     {
      "del": "c",
      "value": 4,
      "unit": "people"
     }
    ],
    "solution": "**The insight:** take the people one at a time. The first may have been born on any day, but each new person must avoid all the days already taken, so the favourable days become fewer for each person.\n\n**a)** The first person can have been born on any day of the week; the probability is $\\dfrac{7}{7} = 1$. The second must have been born on one of the 6 other days:\n\n$$ P(\\text{different}) = \\frac{7}{7} \\cdot \\frac{6}{7} = \\frac{6}{7} \\approx 0.857 $$\n\n**Answer:** 0.857\n\n**b)** The third person has 5 free days left and the fourth 4. The birthdays are independent, so the multiplication rule gives\n\n$$ P(\\text{all different}) = \\frac{7}{7} \\cdot \\frac{6}{7} \\cdot \\frac{5}{7} \\cdot \\frac{4}{7} = \\frac{840}{2\\,401} \\approx 0.3499 = 35.0\\ \\% $$\n\n**Answer:** 35.0&nbsp;%\n\n**c)** Each new person adds a factor. We multiply one person at a time until the product is less than 0.5:\n\n| Number of people | Probability that all have different days of the week |\n|---|---|\n| 2 | $\\dfrac{6}{7} \\approx 0.857$ |\n| 3 | $\\dfrac{6}{7} \\cdot \\dfrac{5}{7} = \\dfrac{30}{49} \\approx 0.612$ |\n| 4 | $\\dfrac{30}{49} \\cdot \\dfrac{4}{7} = \\dfrac{120}{343} \\approx 0.350$ |\n\nWith three people the probability is still above 0.5; with four it is below.\n\n**Answer:** 4 people\n\n**General conclusion:** even though the events are independent, the factors shrink, since the condition \"all different\" becomes harder to satisfy for each new person. That is why the probability falls much faster than you might think. With 365 days instead of 7, the same calculation shows that 23 people are enough for the probability that all have different birthdays to be less than 50&nbsp;%."
   },
   {
    "level": 3,
    "question": "In a town it rains on 40&nbsp;% of the days in October. Elsa wants to know the probability that it rains seven days in a row and assumes that the days are independent of each other.<br>a) What probability does Elsa get? Give your answer as a percentage with two decimal places.<br>b) A meteorologist points out that rainy days tend to come in runs. A better model is that it rains on the first day with probability 0.4, and that the probability of rain is 0.7 on every day after a rainy day. Calculate the probability of seven rainy days in a row with that model. Give your answer as a percentage with one decimal place.<br>c) How many times larger is the answer in b) than the answer in a)? Answer with a whole number and explain which assumption in Elsa's calculation is unreasonable.",
    "answer": {
     "value": 4.7,
     "unit": "%",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.16,
      "unit": "%",
      "tol": 0.03,
      "etikett": "Elsa's model"
     },
     {
      "del": "b",
      "value": 4.7,
      "unit": "%",
      "tol": 0.01,
      "etikett": "the meteorologist's model"
     },
     {
      "del": "c",
      "value": 29,
      "unit": "times",
      "tol": 0.02
     }
    ],
    "solution": "**The insight:** the multiplication rule applies in both models, but each factor should be the probability for that particular step, given what has already happened. If the days are dependent, the factors change.\n\n**a)** With independent days the factor is 0.4 every day:\n\n$$ P(\\text{seven rainy days}) = 0.4^7 = 0.0016384 \\approx 0.16\\ \\% $$\n\n**Answer:** 0.16&nbsp;%\n\n**b)** On the first day the probability is 0.4. Each of the six following days comes after a rainy day, and then the probability of rain is 0.7:\n\n$$ P(\\text{seven rainy days}) = 0.4 \\cdot 0.7 \\cdot 0.7 \\cdot 0.7 \\cdot 0.7 \\cdot 0.7 \\cdot 0.7 = 0.4 \\cdot 0.7^6 $$\n\n$$ 0.4 \\cdot 0.117649 = 0.0470596 \\approx 4.7\\ \\% $$\n\n**Answer:** 4.7&nbsp;%\n\n**c)** The ratio between the answers:\n\n$$ \\frac{0.0470596}{0.0016384} \\approx 28.7 \\approx 29 $$\n\nElsa assumes that the weather on one day is not affected by the weather the day before. But rain depends on weather systems that often stay for several days, so a rainy day makes the next rainy day more likely. Her model therefore greatly underestimates long rainy periods.\n\n**Answer:** About 29 times larger. Elsa assumes that the days are independent, but the rain on one day affects the probability of rain the next day.\n\n**General conclusion:** the multiplication rule never gives better answers than the assumptions behind the factors. Calculating with independent events is an assumption that must be tested against reality, not something to take for granted."
   },
   {
    "level": 3,
    "question": "Ella trains basketball and ends each session with a free throw and then a three-point shot. The shots succeed independently of each other. Her statistics show that both shots succeed in 24&nbsp;% of the sessions, and that the free throw succeeds but the three-point shot misses in 56&nbsp;% of the sessions.<br>a) What is the probability that the free throw succeeds? Give your answer in decimal form.<br>b) What is the probability that the three-point shot succeeds? Give your answer in decimal form.<br>c) What is the probability that she misses both shots? Give your answer in decimal form.",
    "answer": {
     "value": 0.8,
     "unit": "",
     "tol": 0.01
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.8,
      "unit": "",
      "tol": 0.01,
      "etikett": "$P(\\text{free throw}) =$"
     },
     {
      "del": "b",
      "value": 0.3,
      "unit": "",
      "tol": 0.01,
      "etikett": "$P(\\text{three-pointer}) =$"
     },
     {
      "del": "c",
      "value": 0.14,
      "unit": "",
      "tol": 0.01,
      "etikett": "$P(\\text{both miss}) =$"
     }
    ],
    "solution": "**The insight:** the individual probabilities are not given, only products of them. Call them $p$ and $q$, and the multiplication rule gives two equations with two unknowns. Both equations contain the product $p \\cdot q$, and that is already known.\n\n**a)** Let $p$ be the probability that the free throw succeeds and $q$ the probability that the three-point shot succeeds. The probability that the three-point shot misses is then $1 - q$, since the shot either succeeds or misses.\n\nBoth succeed. The shots are independent, so the multiplication rule gives\n\n$$ p \\cdot q = 0.24 \\tag{1} $$\n\nThe free throw succeeds and the three-point shot misses:\n\n$$ p \\cdot (1 - q) = 0.56 \\tag{2} $$\n\nWe multiply $p$ into the bracket in (2):\n\n$$ p - p \\cdot q = 0.56 $$\n\nAccording to (1), $p \\cdot q = 0.24$. Substituting gives\n\n$$ p - 0.24 = 0.56 $$\n\n$$ p - 0.24 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0.24} = 0.56 \\mathbin{\\boldsymbol{+}} \\boldsymbol{0.24} $$\n\n$$ p = 0.80 $$\n\nYou can also see it directly: every time the free throw succeeds, the three-point shot either succeeds or misses, so $P(\\text{free throw}) = 0.24 + 0.56 = 0.80$.\n\n**Answer:** 0.80\n\n**b)** We substitute $p = 0.80$ into (1):\n\n$$ 0.80 \\cdot q = 0.24 $$\n\n$$ \\frac{0.80 \\cdot q}{\\boldsymbol{0.80}} = \\frac{0.24}{\\boldsymbol{0.80}} $$\n\n$$ q = 0.30 $$\n\nCheck in (2): $0.80 \\cdot (1 - 0.30) = 0.80 \\cdot 0.70 = 0.56$. Correct.\n\n**Answer:** 0.30\n\n**c)** The free throw misses with probability $1 - 0.80 = 0.20$ and the three-point shot with $1 - 0.30 = 0.70$. The shots are independent:\n\n$$ P(\\text{both miss}) = 0.20 \\cdot 0.70 = 0.14 $$\n\nCheck: the four possible outcomes should together have the probability 1. The fourth outcome, the free throw misses and the three-pointer succeeds, has the probability $0.20 \\cdot 0.30 = 0.06$:\n\n$$ 0.24 + 0.56 + 0.06 + 0.14 = 1 $$\n\n**Answer:** 0.14\n\n**General conclusion:** the multiplication rule can be used backwards. If the products are known, the individual probabilities become unknowns in a system of equations, and a product that occurs in both equations can be replaced by its known value."
   }
  ]
 },
 "ma1c-5.7": {
  "kalla": "ecd55f4202",
  "data": [
   {
    "level": 1,
    "question": "How is the probability of ONE combination (one branch) in a tree diagram calculated?",
    "choices": [
     "Add the probabilities along the branch",
     "Take the largest probability on the branch",
     "Multiply the probabilities along the branch",
     "Divide the probabilities by each other"
    ],
    "correct": 2,
    "solution": "The probability of a combination is obtained by **multiplying** the probabilities along that branch, for example $\\dfrac{7}{10} \\cdot \\dfrac{7}{10} = \\dfrac{49}{100}$ for black–black with replacement.\n\n**Answer:** Multiply the probabilities along the branch."
   },
   {
    "level": 1,
    "question": "A drawer contains 7 black and 3 white socks. You take a black sock and do NOT put it back. What is the probability that the next sock is also black?",
    "choices": [
     "$\\dfrac{7}{9}$",
     "$\\dfrac{7}{10}$",
     "$\\dfrac{6}{9}$",
     "$\\dfrac{6}{10}$"
    ],
    "correct": 2,
    "solution": "Without replacement, 6 black remain out of 9 socks in total:\n\n$$ P(\\text{black after black}) = \\frac{6}{9} $$\n\n**Answer:** $\\dfrac{6}{9}$"
   },
   {
    "level": 1,
    "question": "What do you do when SEVERAL branches in the tree diagram give the event you are looking for?",
    "choices": [
     "Multiply all the branches by each other",
     "Choose only the first branch",
     "Add all the probabilities in the whole tree",
     "Multiply along each branch and add the probabilities of the branches"
    ],
    "correct": 3,
    "solution": "Each branch gives its probability (multiplication along the branch); when several branches are favourable they are **added**, like black–white and white–black in the lesson: $\\dfrac{21}{90} + \\dfrac{21}{90} = \\dfrac{42}{90}$.\n\n**Answer:** Multiply along each branch and add the branches."
   },
   {
    "level": 2,
    "question": "A bag contains 4 red and 6 blue marbles. You draw two marbles without replacement. Use a tree diagram and calculate the probability of two red. Give your answer as a fraction.",
    "choices": [
     "$\\dfrac{4}{25}$",
     "$\\dfrac{1}{6}$",
     "$\\dfrac{2}{15}$",
     "$\\dfrac{7}{15}$"
    ],
    "correct": 2,
    "solution": "The branch red–red without replacement:\n\n$$ \\frac{4}{10} \\cdot \\frac{3}{9} = \\frac{12}{90} = \\frac{2}{15} $$\n\n($\\dfrac{4}{25}$ would be the answer WITH replacement.)\n\n**Answer:** $\\dfrac{2}{15}$"
   },
   {
    "level": 2,
    "question": "The probability that Vera catches the bus is $\\dfrac{9}{10}$ on an ordinary day and $\\dfrac{6}{10}$ on a rainy day. Tomorrow the risk of rain is $\\dfrac{3}{10}$. What is the probability that it rains AND that she catches the bus? Give your answer as a percentage.",
    "answer": {
     "value": 18,
     "unit": "%"
    },
    "solution": "Follow the branch rain → catches the bus in the tree diagram:\n\n$$ \\frac{3}{10} \\cdot \\frac{6}{10} = \\frac{18}{100} = 18\\ \\% $$\n\n**Answer:** 18 %"
   },
   {
    "level": 3,
    "question": "A burglar alarm has two sensors that work independently of each other. Each one detects a burglary with probability $0.8$.<br>a) What is the probability that at least one of the sensors detects the burglary? Give your answer in decimal form.<br>b) Kim calculates $0.8 + 0.8 = 1.6$. Explain why that cannot be right.<br>c) What is the smallest number of sensors needed for the probability that at least one detects the burglary to be at least $0.999$?",
    "answer": {
     "value": 5,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.96,
      "unit": ""
     },
     {
      "del": "b"
     },
     {
      "del": "c",
      "value": 5,
      "unit": "",
      "etikett": "number of sensors"
     }
    ],
    "solution": "**The insight:** \"at least one\" consists of many branches in the tree diagram, but the opposite, the complementary event \"none detects\", is a single branch. That branch is easy to calculate and subtract from 1.\n\n**a)** Each sensor misses the burglary with probability $1 - 0.8 = 0.2$. The branch where both miss is obtained by multiplying along the branch:\n\n$$ P(\\text{none detects}) = 0.2 \\cdot 0.2 = 0.04 $$\n\nAll the branches together have probability 1, so\n\n$$ P(\\text{at least one detects}) = 1 - 0.04 = 0.96 $$\n\n**Answer:** $0.96$\n\n**b)** A probability can never be greater than 1, so $1.6$ is impossible. The mistake is that the branch where **both** sensors detect the burglary is counted twice: it is included both in \"sensor 1 detects\" and in \"sensor 2 detects\". Addition only works for branches that do not overlap.\n\n**Answer:** The branch where both detect the burglary is counted twice, and a probability cannot be greater than 1.\n\n**c)** With $n$ sensors there is only one branch where none detects the burglary, and along it $0.2$ is multiplied by itself $n$ times:\n\n$$ P(\\text{at least one detects}) = 1 - 0.2^n $$\n\nWe want $1 - 0.2^n \\geq 0.999$, that is, $0.2^n$ to be at most $0.001$. We test:\n\n| $n$ | $0.2^n$ | $1 - 0.2^n$ |\n|---|---|---|\n| 3 | $0.008$ | $0.992$ |\n| 4 | $0.0016$ | $0.9984$ |\n| 5 | $0.00032$ | $0.99968$ |\n\nWith four sensors $0.9984$ is still too little, but with five $0.99968 \\geq 0.999$.\n\n**Answer:** 5 sensors\n\n**General conclusion:** when it says \"at least one\", calculate the complementary event \"none\" and subtract from 1. Probabilities for branches that overlap must not be added."
   },
   {
    "level": 3,
    "question": "A basketball player takes two free throws. The first goes in with probability $0.7$. The player is affected by how the first throw went: after a hit the second throw goes in with probability $0.8$, after a miss with probability $0.5$. Give your answers in decimal form.<br>a) What is the probability that both throws go in?<br>b) What is the probability that exactly one of the throws goes in?<br>c) A student calculates $2 \\cdot 0.7 \\cdot 0.3 = 0.42$ in b). Explain what the student has missed.",
    "answer": {
     "value": 0.29,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.56,
      "unit": ""
     },
     {
      "del": "b",
      "value": 0.29,
      "unit": ""
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the throws depend on each other. The probability at the second level of the tree diagram depends on which branch you came from, so the two branches \"hit, miss\" and \"miss, hit\" have different sizes.\n\nThe four branches of the tree diagram (the probabilities are multiplied along each branch):\n\n| First throw | Second throw | Probability of the branch |\n|---|---|---|\n| hit ($0.7$) | hit ($0.8$) | $0.7 \\cdot 0.8 = 0.56$ |\n| hit ($0.7$) | miss ($0.2$) | $0.7 \\cdot 0.2 = 0.14$ |\n| miss ($0.3$) | hit ($0.5$) | $0.3 \\cdot 0.5 = 0.15$ |\n| miss ($0.3$) | miss ($0.5$) | $0.3 \\cdot 0.5 = 0.15$ |\n\nCheck: $0.56 + 0.14 + 0.15 + 0.15 = 1$. Correct.\n\n**a)** The branch hit, hit:\n\n$$ P(\\text{both in}) = 0.7 \\cdot 0.8 = 0.56 $$\n\n**Answer:** $0.56$\n\n**b)** Exactly one throw in is given by two branches, and they are added:\n\n$$ P(\\text{exactly one in}) = 0.7 \\cdot 0.2 + 0.3 \\cdot 0.5 = 0.14 + 0.15 = 0.29 $$\n\n**Answer:** $0.29$\n\n**c)** The student has treated the throws as independent, always with probability $0.7$ for a hit and $0.3$ for a miss, and has therefore calculated with two equally large branches. But after a hit the chance of missing is only $0.2$, and after a miss the chance of hitting is only $0.5$. Neither $0.7 \\cdot 0.3$ nor $0.3 \\cdot 0.7$ exists as a branch in the tree.\n\n**Answer:** The student has calculated as if the throws were independent. The probabilities for the second throw depend on how the first one went, so the two branches have different sizes.\n\n**General conclusion:** always write the probability that applies just after the branch you are following. Multiplying by 2 only works when the two branches really are equally large."
   },
   {
    "level": 3,
    "question": "Team A wins a match against team B with probability $0.6$, independently of previous matches. Draws do not occur. The two teams are going to compete for a title and can choose between two formats: a single match, or best of three (the team that first wins two matches takes the title).<br>a) What is the probability that team A wins the title in best of three? Give your answer in decimal form with three decimal places.<br>b) Which format should the weaker team B prefer? Justify your answer with calculations.",
    "answer": {
     "value": 0.648,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.648,
      "unit": ""
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The insight:** in best of three the tree ends early when a team has two wins. The branches therefore have different lengths, and team A can win in three ways: AA, ABA or BAA.\n\n**a)** The probability of each branch is obtained by multiplying along the branch. The branches where team A wins the title:\n\n| Branch | Probability |\n|---|---|\n| AA (two matches) | $0.6 \\cdot 0.6 = 0.36$ |\n| ABA | $0.6 \\cdot 0.4 \\cdot 0.6 = 0.144$ |\n| BAA | $0.4 \\cdot 0.6 \\cdot 0.6 = 0.144$ |\n\nThe branches are different outcomes, so they are added:\n\n$$ P(\\text{A wins}) = 0.36 + 0.144 + 0.144 = 0.648 $$\n\nReasonableness: a team that is better in each individual match should benefit from more matches, and $0.648$ is greater than $0.6$.\n\n**Answer:** $0.648$\n\n**b)** In the same way, team B wins the title in best of three with\n\n$$ P(\\text{B wins}) = 0.4 \\cdot 0.4 + 0.4 \\cdot 0.6 \\cdot 0.4 + 0.6 \\cdot 0.4 \\cdot 0.4 = 0.16 + 0.096 + 0.096 = 0.352 $$\n\nCheck: $0.648 + 0.352 = 1$. Correct.\n\nIn a single match team B wins with probability $0.4$, which is more than $0.352$.\n\n**Answer:** Team B should choose a single match: there the team wins with probability $0.4$, in best of three only with $0.352$.\n\n**General conclusion:** more matches reduce the role of chance, and that favours the team that is better in each match. The weaker team has the best chance when everything is decided at once."
   },
   {
    "level": 3,
    "question": "A disease is present in $2\\ \\%$ of the population. A test gives a positive result in $95\\ \\%$ of those who have the disease, but also in $10\\ \\%$ of those who are healthy. A person is chosen at random and tested.<br>a) What is the probability that the test gives a positive result? Give your answer in decimal form.<br>b) What proportion of those who get a positive result have the disease? Give your answer as a percentage, rounded to a whole number.<br>c) A newspaper writes: \"The test finds 95&nbsp;% of all sick people, so anyone who gets a positive result is almost certainly sick.\" Examine the claim.",
    "answer": {
     "value": 16,
     "unit": "%",
     "tol": 0.04
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.117,
      "unit": ""
     },
     {
      "del": "b",
      "value": 16,
      "unit": "%",
      "tol": 0.04
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the healthy are so much more numerous than the sick that their small proportion of false positive results still amounts to many people. This is seen most clearly if we imagine 1&nbsp;000 people tested and follow them through the tree.\n\nThe tree diagram with 1&nbsp;000 people:\n\n| First level | Second level | Number of people |\n|---|---|---|\n| sick: $0.02 \\cdot 1\\,000 = 20$ | positive: $0.95 \\cdot 20 = 19$ | 19 |\n| sick: 20 | negative: $0.05 \\cdot 20 = 1$ | 1 |\n| healthy: $0.98 \\cdot 1\\,000 = 980$ | positive: $0.10 \\cdot 980 = 98$ | 98 |\n| healthy: 980 | negative: $0.90 \\cdot 980 = 882$ | 882 |\n\n**a)** A positive result is given by two branches, sick and positive, and healthy and positive. We multiply along each branch and add:\n\n$$ P(\\text{positive}) = 0.02 \\cdot 0.95 + 0.98 \\cdot 0.10 = 0.019 + 0.098 = 0.117 $$\n\nThis agrees with the table: $19 + 98 = 117$ of 1&nbsp;000 people.\n\n**Answer:** $0.117$\n\n**b)** Among the 117 who get a positive result, 19 are sick. The proportion is the part divided by the whole:\n\n$$ \\text{proportion sick among positives} = \\frac{19}{117} = 0.1623\\ldots \\approx 16\\ \\% $$\n\n**Answer:** About 16&nbsp;%\n\n**c)** The claim mixes up two different proportions. The fact that the test finds $95\\ \\%$ of the sick concerns those who **are sick**. The question of whether someone who got a positive result is sick concerns those who **got a positive result**, and among them only about $16\\ \\%$ are sick. Of the 117 positive results, 98 are false, since $10\\ \\%$ of the many healthy people is more people than $95\\ \\%$ of the few sick people.\n\n**Answer:** The claim is not true. Only about 16&nbsp;% of those with a positive result are sick, since most of the positive results come from healthy people.\n\n**General conclusion:** always think about which group the proportion is calculated on. When a characteristic is rare, even a good test can give more false than true positive results."
   },
   {
    "level": 3,
    "question": "A bag contains 3 red marbles and some blue ones. Two marbles are drawn without replacement. The total number of marbles in the bag is $N$.<br>a) Write an expression in $N$ for the probability that both marbles are red.<br>b) The probability that both are red is $\\dfrac{1}{7}$. How many blue marbles are there in the bag?<br>c) Show that the probability that both are red can never be $\\dfrac{1}{4}$, however many blue marbles the bag contains.",
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
      "value": 4,
      "unit": "",
      "etikett": "blue marbles"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** this is an inverse problem. The probability is known and the number of marbles is sought, so we express the probability in terms of $N$ and solve for $N$. Since $N$ must be a whole number, the equation can be solved by trial.\n\n**a)** First draw: 3 red out of $N$ marbles. Without replacement, 2 red then remain out of $N - 1$ marbles. Along the branch red, red the probabilities are multiplied:\n\n$$ P(\\text{two red}) = \\frac{3}{N} \\cdot \\frac{2}{N - 1} = \\frac{6}{N(N - 1)} $$\n\n**Answer:** $P(\\text{two red}) = \\dfrac{6}{N(N - 1)}$\n\n**b)** The expression should be equal to $\\dfrac{1}{7}$:\n\n$$ \\frac{6}{N(N - 1)} = \\frac{1}{7} $$\n\n$$ \\frac{6}{N(N - 1)} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{7N(N - 1)} = \\frac{1}{7} \\mathbin{\\boldsymbol{\\cdot}} \\boldsymbol{7N(N - 1)} $$\n\n$$ 42 = N(N - 1) $$\n\nSo we are looking for two consecutive whole numbers with the product 42. We test: $6 \\cdot 5 = 30$, $7 \\cdot 6 = 42$. So $N = 7$.\n\nThat means 7 marbles in total, of which 3 are red, so the number of blue is $7 - 3 = 4$.\n\nCheck: $\\dfrac{3}{7} \\cdot \\dfrac{2}{6} = \\dfrac{6}{42} = \\dfrac{1}{7}$. Correct.\n\n**Answer:** 4 blue marbles\n\n**c)** In the same way, $\\dfrac{6}{N(N - 1)} = \\dfrac{1}{4}$ would give\n\n$$ N(N - 1) = 24 $$\n\nThe product of two consecutive whole numbers grows as $N$ grows:\n\n| $N$ | 4 | 5 | 6 |\n|---|---|---|---|\n| $N(N - 1)$ | 12 | 20 | 30 |\n\nThe product jumps from 20 to 30 and never becomes 24. So there is no whole number $N$, and therefore no number of blue marbles, that gives the probability $\\dfrac{1}{4}$.\n\n**Answer:** It requires $N(N - 1) = 24$, but two consecutive whole numbers never have the product 24.\n\n**General conclusion:** a tree diagram can be used backwards. Express the probability of the branch in terms of the unknown quantity and set up an equation. The fact that the number must be a whole number makes some probabilities impossible."
   },
   {
    "level": 3,
    "question": "A coin is biased so that the probability of heads is $p$ on every toss. The coin is tossed twice.<br>a) What is the probability of one head and one tail (in any order) if $p = 0.6$? Give your answer in decimal form.<br>b) The probability of two heads is $0.49$. Find $p$.<br>c) Show that the probability of one head and one tail can never be greater than $0.5$, however the coin is biased.",
    "answer": {
     "value": 0.7,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.48,
      "unit": ""
     },
     {
      "del": "b",
      "value": 0.7,
      "unit": "",
      "etikett": "$p =$"
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the tree diagram can be calculated with letters. Tails has the probability $1 - p$, and \"one head and one tail\" is two branches that each give $p(1 - p)$. The expression $2p(1 - p)$ can then be investigated for all $p$ at once.\n\nThe branches of the tree diagram:\n\n| Branch | Probability |\n|---|---|\n| heads, heads | $p \\cdot p$ |\n| heads, tails | $p(1 - p)$ |\n| tails, heads | $(1 - p)p$ |\n| tails, tails | $(1 - p)(1 - p)$ |\n\n**a)** The two branches with one head and one tail are added:\n\n$$ P(\\text{different}) = p(1 - p) + (1 - p)p = 2p(1 - p) $$\n\nWith $p = 0.6$:\n\n$$ P(\\text{different}) = 2 \\cdot 0.6 \\cdot 0.4 = 0.48 $$\n\n**Answer:** $0.48$\n\n**b)** The branch heads, heads gives\n\n$$ p \\cdot p = 0.49 $$\n\n$$ p^2 = 0.49 $$\n\n$$ p = \\pm\\sqrt{0.49} $$\n\n$$ p = \\pm 0.7 $$\n\nA probability cannot be negative, so $p = 0.7$.\n\n**Answer:** $p = 0.7$\n\n**c)** We write $p$ as $0.5 + d$, where $d$ states how much the coin deviates from a fair coin. Then $1 - p = 0.5 - d$, and\n\n$$ p(1 - p) = (0.5 + d)(0.5 - d) = 0.25 - 0.5d + 0.5d - d^2 = 0.25 - d^2 $$\n\nThe probability of different becomes\n\n$$ P(\\text{different}) = 2(0.25 - d^2) = 0.5 - 2d^2 $$\n\nThe number $d^2$ is never negative, so $0.5 - 2d^2$ is never greater than $0.5$. It is exactly $0.5$ only when $d = 0$, that is, when the coin is fair.\n\nCheck with a): $p = 0.6$ gives $d = 0.1$ and $0.5 - 2 \\cdot 0.01 = 0.48$. Correct.\n\n**Answer:** $P(\\text{different}) = 0.5 - 2d^2$, and since $d^2 \\geq 0$ it is never greater than $0.5$.\n\n**General conclusion:** with a letter in the tree diagram the calculation applies to all cases at once, and then you can show that something always holds, not just test individual values."
   },
   {
    "level": 3,
    "question": "Ali and Bea take turns drawing a marble from a bag with 2 white and 3 black marbles, without replacement. Ali draws first. Whoever first draws a white marble wins.<br>a) What is the largest number of draws the game can take?<br>b) What is the probability that Ali wins? Give your answer in decimal form.<br>c) The bag is replaced by one with 1 white and 3 black marbles. Show that it then makes no difference who starts.",
    "answer": {
     "value": 0.6,
     "unit": ""
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4,
      "unit": "",
      "etikett": "draws"
     },
     {
      "del": "b",
      "value": 0.6,
      "unit": ""
     },
     {
      "del": "c"
     }
    ],
    "solution": "**The insight:** the tree is not fully grown. Each branch ends as soon as a white marble is drawn, and the players take turns, so Ali wins on the odd draws and Bea on the even ones.\n\n**a)** There are only 3 black marbles. When all three have been drawn only white ones remain, so the fourth draw at the latest is white.\n\n**Answer:** 4 draws\n\n**b)** Each branch ends with a white marble being drawn. The probabilities along a branch are multiplied, and the number of marbles decreases by one for each draw:\n\n| Branch | Who draws the white one? | Probability |\n|---|---|---|\n| W | Ali (draw 1) | $\\dfrac{2}{5}$ |\n| B, W | Bea (draw 2) | $\\dfrac{3}{5} \\cdot \\dfrac{2}{4} = \\dfrac{3}{10}$ |\n| B, B, W | Ali (draw 3) | $\\dfrac{3}{5} \\cdot \\dfrac{2}{4} \\cdot \\dfrac{2}{3} = \\dfrac{1}{5}$ |\n| B, B, B, W | Bea (draw 4) | $\\dfrac{3}{5} \\cdot \\dfrac{2}{4} \\cdot \\dfrac{1}{3} \\cdot \\dfrac{2}{2} = \\dfrac{1}{10}$ |\n\n(W = white, B = black.) Ali wins on the branches W and B, B, W, which are added:\n\n$$ P(\\text{Ali wins}) = \\frac{2}{5} + \\frac{1}{5} = \\frac{3}{5} = 0.6 $$\n\nCheck: Bea wins with $\\dfrac{3}{10} + \\dfrac{1}{10} = \\dfrac{2}{5}$, and $\\dfrac{3}{5} + \\dfrac{2}{5} = 1$. Correct.\n\n**Answer:** $0.6$\n\n**c)** With 1 white and 3 black marbles the branches become:\n\n| Branch | Who draws the white one? | Probability |\n|---|---|---|\n| W | Ali | $\\dfrac{1}{4}$ |\n| B, W | Bea | $\\dfrac{3}{4} \\cdot \\dfrac{1}{3} = \\dfrac{1}{4}$ |\n| B, B, W | Ali | $\\dfrac{3}{4} \\cdot \\dfrac{2}{3} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}$ |\n| B, B, B, W | Bea | $\\dfrac{3}{4} \\cdot \\dfrac{2}{3} \\cdot \\dfrac{1}{2} \\cdot \\dfrac{1}{1} = \\dfrac{1}{4}$ |\n\nAll four branches are equally likely: the white marble has the same chance of coming in each draw. Ali wins with $\\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}$, and so does Bea.\n\n**Answer:** Both win with probability $\\dfrac{1}{2}$, so it makes no difference who starts.\n\n**General conclusion:** with a single white marble and an even number of marbles the game is fair. With two white marbles the first white one can come early, and then whoever starts benefits from that."
   }
  ]
 }
});
