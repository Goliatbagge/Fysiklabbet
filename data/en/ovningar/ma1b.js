/* Engelsk översättning av ovningar (ma1b). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "ma1b-3.4": {
  "kalla": "adde441308",
  "data": [
   {
    "level": 1,
    "question": "The price of an item has the index number 132, with 2015 as the base year. What does that mean?",
    "choices": [
     "The price is 32 % higher than in 2015",
     "The price is 132 % higher than in 2015",
     "The price is 32 % of the price in 2015",
     "The price is 132 kr"
    ],
    "correct": 0,
    "solution": "The base year always has index 100. The index number 132 is $132 - 100 = 32$ units above the base year, so the price is 32 % higher than in 2015 (the change factor is $\\dfrac{132}{100} = 1.32$).\n\nAn index number says nothing about the price in kronor, only about the relationship to the base year.\n\n**Answer:** The price is 32 % higher than in 2015."
   },
   {
    "level": 1,
    "question": "A monthly bus pass cost 550 kr in the base year and costs 715 kr this year. What index number does the price have this year?",
    "answer": {
     "value": 130,
     "unit": "",
     "tol": 0.005
    },
    "solution": "Substitution into the formula for the index number:\n\n$$ \\text{index} = \\frac{715}{550} \\cdot 100 = 1.30 \\cdot 100 = 130 $$\n\n**Answer:** Index 130: the price is 30 % higher than in the base year."
   },
   {
    "level": 1,
    "question": "CPI was 335.9 in 2020, with 1980 as the base year. What does that say about the price level?",
    "choices": [
     "Prices increased by 335.9 kr between 1980 and 2020",
     "The price level in 2020 was 235.9 % higher than in 1980",
     "The price level in 2020 was 35.9 % higher than in 1980",
     "The price level in 2020 was 335.9 % higher than in 1980"
    ],
    "correct": 1,
    "solution": "The base year 1980 has index 100. The index number 335.9 is $335.9 - 100 = 235.9$ units above the base year, so the price level was 235.9 % higher. What cost 100 kr in 1980 therefore cost on average just under 336 kr in 2020.\n\nThe most common misreading is to take the whole index number as the percentage increase, but the first 100 units are the base year's own level.\n\n**Answer:** The price level in 2020 was 235.9 % higher than in 1980."
   },
   {
    "level": 2,
    "question": "A bar of chocolate costs 65 kr this year, and the index number of the price is 125. What did the bar of chocolate cost in the base year?",
    "answer": {
     "value": 52,
     "unit": "kr",
     "tol": 0.005
    },
    "solution": "Index 125 means that today's price is the base year's price multiplied by the change factor $\\dfrac{125}{100} = 1.25$. Call the base year's price $x$:\n\n$$ 1.25 \\cdot x = 65 $$\n\n$$ x = \\frac{65}{1.25} = 52\\ \\mathrm{kr} $$\n\n**Answer:** 52 kr"
   },
   {
    "level": 2,
    "question": "A book cost 249 kr in 2010, when CPI was 303.5. What does that price correspond to in 2023 money value, when CPI was 403.7? Round to whole kronor.",
    "answer": {
     "value": 331,
     "unit": "kr",
     "tol": 0.005
    },
    "solution": "The quotient of the years' index numbers is the change factor between the years:\n\n$$ 249 \\cdot \\frac{403.7}{303.5} = 249 \\cdot 1.3301\\ldots = 331.2\\ldots \\approx 331\\ \\mathrm{kr} $$\n\n**Answer:** About 331 kr"
   },
   {
    "level": 3,
    "question": "Linnea's monthly salary was raised from 28 000 kr in 2020 to 30 000 kr in 2023. During the same period, CPI rose from 335.9 to 403.7. By what percentage did her purchasing power (real wage) decrease? Round to a tenth of a percent.",
    "answer": {
     "value": 10.9,
     "unit": "%",
     "tol": 0.02
    },
    "solution": "**The key insight:** the salary should be compared with the price level. The purchasing power changes by the quotient of the change factors of the salary and the prices.\n\nThe salary's change factor:\n\n$$ \\frac{30\\ 000}{28\\ 000} = 1.0714\\ldots $$\n\nThe price level's change factor:\n\n$$ \\frac{403.7}{335.9} = 1.2018\\ldots $$\n\nThe real wage's change factor is the quotient:\n\n$$ \\frac{1.0714\\ldots}{1.2018\\ldots} = 0.8914\\ldots $$\n\nThe factor 0.891 is below 1: the purchasing power decreased by $1 - 0.8914\\ldots = 0.1085\\ldots \\approx 10.9\\ \\%$.\n\n**Answer:** About 10.9 %.\n\n**General conclusion:** a pay rise in kronor can still be a reduction in purchasing power. It is the quotient against the price development that decides. If prices rise faster than the salary, the real wage falls."
   }
  ]
 },
 "ma1b-5.1": {
  "kalla": "4cdb4eb980",
  "data": [
   {
    "level": 1,
    "question": "Which type of diagram is best for showing how a share price has changed day by day over a year?",
    "choices": [
     "Bar chart",
     "Frequency table",
     "Line graph",
     "Pie chart"
    ],
    "correct": 2,
    "solution": "The share price is a value followed **over time**, so the data points are joined with lines so that the development appears as a curve. Pie charts show proportions of a whole and bar charts compare categories; neither of them shows a process over time. A frequency table is not a picture at all.\n\n**Answer:** Line graph"
   },
   {
    "level": 1,
    "question": "In a survey, 50 people were asked what they prefer to drink with breakfast. 12 of them answered tea. What is the relative frequency for tea, as a percentage?",
    "answer": {
     "value": 24,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "Relative frequency is the frequency divided by the total number:\n\n$$ \\frac{12}{50} = 0.24 = 24\\ \\% $$\n\n**Answer:** 24 %"
   },
   {
    "level": 1,
    "question": "The line graph shows the number of visitors to a library during one day. How many more visitors were there at 15:00 than at 9:00?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\">Time of day</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\">Number of visitors</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">9</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">18</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">40</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">60</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">80</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">100</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">120</text></g><path d=\"M 60.0 203.3 L 193.3 116.7 L 326.7 73.3 L 460.0 160.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 60,
     "unit": "visitors",
     "tol": 0.005
    },
    "solution": "Reading from the diagram: at 9:00 the number was 40 and at 15:00 it was 100.\n\n$$ 100 - 40 = 60 $$\n\n**Answer:** 60 more visitors"
   },
   {
    "level": 2,
    "question": "In a pie chart of a survey with 450 respondents, the sector for \"no\" corresponds to 81 people. What percentage of the circle does the no sector take up?",
    "answer": {
     "value": 18,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "The sector's share of the circle is the group's relative frequency:\n\n$$ \\frac{81}{450} = 0.18 = 18\\ \\% $$\n\n**Answer:** 18 %"
   },
   {
    "level": 2,
    "question": "A newspaper shows two bars: 490 and 520 units. The diagram's *y*-axis is truncated and starts at 480. Which statement is true?",
    "choices": [
     "The real increase is 300 %, just as the bars show",
     "The diagram is drawn incorrectly: bars may never start at 480",
     "The real increase is 30 %",
     "The real increase is about 6 %, but the heights of the bars make it look like a fourfold increase"
    ],
    "correct": 3,
    "solution": "Above the break point 480, the bars become $490 - 480 = 10$ and $520 - 480 = 40$ units high respectively, so the second looks $\\dfrac{40}{10} = 4$ times as high. The real change factor is\n\n$$ \\frac{520}{490} = 1.061\\ldots $$\n\nthat is, an increase of about 6 %. The diagram is not \"drawn incorrectly\", since a truncated axis can be justified, but the reader must see where the axis starts.\n\n**Answer:** The real increase is about 6 %, but the bars make it look like a fourfold increase."
   },
   {
    "level": 3,
    "question": "In a survey, 60 % of the 300 students asked at Ridge School answered yes, and 40 % of the 700 asked at Brook School. A headline claims: \"On average, half answered yes.\" What percentage of all those asked actually answered yes?",
    "answer": {
     "value": 46,
     "unit": "%",
     "tol": 0.005
    },
    "solution": "**The key insight:** percentages from groups of different sizes cannot simply be averaged; they must be weighted by the sizes of the groups. Count numbers of people instead.\n\nNumber of yes answers per school:\n\n$$ 0.60 \\cdot 300 = 180 \\qquad 0.40 \\cdot 700 = 280 $$\n\nIn total, $180 + 280 = 460$ of $300 + 700 = 1\\ 000$ people answered yes:\n\n$$ \\frac{460}{1\\ 000} = 0.46 = 46\\ \\% $$\n\n**Answer:** 46 %\n\n**General conclusion:** the mean of two percentages ($\\dfrac{60 + 40}{2} = 50\\ \\%$) is only right when the groups are exactly the same size. Here Brook School's 700 answers carry more weight than Ridge School's 300, so the weighted proportion ends up closer to 40 % than to 60 %."
   }
  ]
 }
});
