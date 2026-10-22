/* Engelsk översättning av ovningar (fy1). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "fy1-1.1": {
  "kalla": "e2fe31ed80",
  "data": [
   {
    "level": 1,
    "question": "What is meant by a **hypothesis** in the scientific method?",
    "choices": [
     "A compilation of several theories within the same field.",
     "A phenomenon that has been observed but could not be explained.",
     "A guess about how something works, which is to be tested with experiments.",
     "A law that has been confirmed repeatedly and never disproved."
    ],
    "correct": 2,
    "solution": "A hypothesis is a *proposed* explanation: a guess that you then test through experiments. If the hypothesis is not disproved by the experiments, it can eventually come to be called a **law**, and several laws together can form a **theory**.\n\n**Answer:** A hypothesis is a guess that is to be tested in experiments."
   },
   {
    "level": 1,
    "question": "What is the correct order in the scientific method?",
    "choices": [
     "Experiment → observation → hypothesis → laws",
     "Theory → hypothesis → experiment → observation",
     "Hypothesis → observation → experiment → theory",
     "Observation → hypothesis → testing the hypothesis → laws and theories"
    ],
    "correct": 3,
    "solution": "The scientific method starts with an **observation**: we see something happen. Based on that, we formulate a **hypothesis** about why it happens, **test** the hypothesis by doing experiments, and if the hypothesis holds, it eventually becomes part of established **laws and theories**.\n\n**Answer:** Observation → hypothesis → testing the hypothesis → laws and theories."
   },
   {
    "level": 2,
    "question": "A friend says: *\"The theory of evolution is 'just a theory', so it is not certain that it is true.\"* What is the problem with that statement from a scientific perspective?",
    "choices": [
     "In everyday speech the word \"theory\" is used about uncertain guesses, but in the scientific sense a theory is a well-supported system of laws that has been tested many times.",
     "The theory of evolution is no longer a theory: it has become a law.",
     "Scientific theories are not meant to be true: they are just models.",
     "The friend is right: all theories are uncertain until something can be proved mathematically."
    ],
    "correct": 0,
    "solution": "Everyday language and scientific terminology use the word *theory* in two different ways:\n\n- In **everyday speech**, \"theory\" often means an uncertain guess (*\"I have a theory about who took the milk\"*).\n- In **science**, on the contrary, a *theory* means something *very certain*: a framework of laws and explanations that has been tested many times without being disproved.\n\nCalling the theory of evolution \"just a theory\" is therefore a misunderstanding of what the word theory means in the scientific sense.\n\n**Answer:** Option A. The friend is confusing everyday and scientific usage."
   },
   {
    "level": 2,
    "question": "Why do physicists often use **models** (for example a point mass, a perfect sphere or an ideal gas) instead of calculating reality exactly?",
    "choices": [
     "Because physicists think models are more fun than reality.",
     "Because the models are simplifications of reality that are still *good enough* to predict and explain what we observe.",
     "Because the models are what nature really looks like at the microscopic level.",
     "Because models always give exactly the same answer as reality if you calculate carefully enough."
    ],
    "correct": 1,
    "solution": "Reality is often complicated: a ball is not a perfect sphere, a gas consists of an enormous number of molecules and the action of a force is never completely frictionless. **Models** are simplifications of reality that remove details that are not important for what we are studying, while still describing *well enough* what we want to understand.\n\nThat is exactly why physics works: we can predict what will happen without having to calculate every single molecule in a system.\n\n**Answer:** Option B. Models are simplifications that are good enough."
   }
  ]
 },
 "fy1-1.2": {
  "kalla": "7f832e0557",
  "data": [
   {
    "level": 1,
    "question": "In the sentence *\"the distance is 2 500 metres\"*, what is the **numerical value**?",
    "choices": [
     "m (the symbol for metre)",
     "the distance",
     "metre",
     "2 500"
    ],
    "correct": 3,
    "solution": "A quantity is given as a *numerical value* times a *unit*:\n\n- **Quantity**: the property being measured. Here: *distance*.\n- **Numerical value**: the number. Here: *2 500*.\n- **Unit**: the measure in which the numerical value is given. Here: *metre*.\n\n**Answer:** The numerical value is 2 500."
   },
   {
    "level": 1,
    "question": "Write 3.5 ms (milliseconds) in seconds. Give the answer in standard form or as a decimal number.",
    "answer": {
     "value": 0.0035,
     "unit": "s",
     "tol": 0.02
    },
    "solution": "The prefix **milli** (m) means $10^{-3}$, so\n\n$$\n1\\ \\mathrm{ms} = 10^{-3}\\ \\mathrm{s} = 0.001\\ \\mathrm{s}\n$$\n\nWe multiply the numerical value by the power of ten of the prefix:\n\n$$\n3.5\\ \\mathrm{ms} = 3.5 \\cdot 10^{-3}\\ \\mathrm{s} = 0.0035\\ \\mathrm{s}\n$$\n\n**Answer:** 3.5 · 10⁻³ s = 0.0035 s."
   },
   {
    "level": 1,
    "question": "Calculate the product $7.2 \\cdot 1.234$. Give the answer with the **correct number of significant figures**.",
    "answer": {
     "value": 8.9,
     "unit": "",
     "tol": 0.01
    },
    "solution": "In multiplication and division, the number of significant figures is decided by the value that has the **fewest significant figures**.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\na = 7.2 \\quad (\\text{2 significant figures}) \\\\\nb = 1.234 \\quad (\\text{4 significant figures})\n\\end{array} \\right]\n$$\n\nCalculation:\n$$\n7.2 \\cdot 1.234 = 8.8848\n$$\n\nSince the fewest significant figures is **two**, the result is rounded to two significant figures:\n\n$$\n8.8848 \\approx 8.9\n$$\n\n**Answer:** 8.9."
   },
   {
    "level": 2,
    "question": "A cyclist rolls 1.8 km in 5.5 minutes. Calculate the average speed in m/s with the **correct number of significant figures**.",
    "answer": {
     "value": 5.5,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "We use the formula for average speed after converting to SI units (m and s):\n\n$$\nv_\\mathrm{m} = \\frac{s}{t}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns = 1.8\\ \\mathrm{km} = 1\\,800\\ \\mathrm{m} \\\\\nt = 5.5\\ \\mathrm{min} = 5.5 \\cdot 60\\ \\mathrm{s} = 330\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\nv_\\mathrm{m} = \\frac{1\\,800}{330} = 5.454\\ldots\\ \\mathrm{m/s}\n$$\n\nBoth measured values have two significant figures, so the answer is rounded to two significant figures:\n\n$$\nv_\\mathrm{m} \\approx 5.5\\ \\mathrm{m/s}\n$$\n\n**Answer:** 5.5 m/s."
   },
   {
    "level": 2,
    "question": "Calculate the sum $12.45 + 0.3$. Give the answer with the **correct number of decimal places**.",
    "answer": {
     "value": 12.8,
     "unit": "",
     "tol": 0.005
    },
    "solution": "In addition and subtraction, the number of decimal places in the answer is decided by the value that has the **fewest decimal places** (not the number of significant figures).\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\na = 12.45 \\quad (\\text{2 decimal places}) \\\\\nb = 0.3 \\quad (\\text{1 decimal place})\n\\end{array} \\right]\n$$\n\nCalculation:\n$$\n12.45 + 0.3 = 12.75\n$$\n\nSince 0.3 has only **one** decimal place, the sum is rounded to one decimal place:\n\n$$\n12.75 \\approx 12.8\n$$\n\n**Answer:** 12.8.\n\n**General conclusion:** It is easy to mix up the rules: in *addition/subtraction* you look at *decimal places*, in *multiplication/division* you look at *significant figures*."
   },
   {
    "level": 2,
    "question": "Using a micrometer screw gauge, a researcher measures the thickness of a thin sheet of paper to be 0.084 mm. She stacks **250 such sheets** on top of each other. How thick is the stack, given in **metres**, with the correct number of significant figures?",
    "answer": {
     "value": 0.021,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "We multiply the thickness of one sheet by the number of sheets, and convert to the SI unit metre.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nd = 0.084\\ \\mathrm{mm} = 8.4 \\cdot 10^{-5}\\ \\mathrm{m} \\quad (\\text{2 significant figures}) \\\\\nn = 250 \\quad (\\text{exact number: no measurement uncertainty})\n\\end{array} \\right]\n$$\n\nNote that the leading zeros in 0.084 do **not** count as significant figures: only 8 and 4 are significant figures.\n\nTotal thickness:\n$$\nt = n \\cdot d = 250 \\cdot 8.4 \\cdot 10^{-5}\\ \\mathrm{m} = 2.10 \\cdot 10^{-2}\\ \\mathrm{m}\n$$\n\nSince *d* has only two significant figures, the answer is rounded to two significant figures:\n\n$$\nt \\approx 2.1 \\cdot 10^{-2}\\ \\mathrm{m} = 0.021\\ \\mathrm{m} = 21\\ \\mathrm{mm}\n$$\n\n**Answer:** 0.021 m (= 2.1 cm).\n\n**General conclusion:** When you calculate with an *exact* factor (for example the number of sheets, or the number of faces on a die), that factor does not affect the number of significant figures in the answer: that is decided entirely by the precision of the measured value."
   },
   {
    "level": 2,
    "question": "A glass cube has a side of 5.00 cm (measured with a vernier calliper, so 3 significant figures). A student calculates the **total surface area** of the cube (all 6 faces together) and wants to give the result with the correct number of significant figures. Which of the following is the **only unambiguously correct** way to write the answer?",
    "choices": [
     "$150\\ \\mathrm{cm^2}$",
     "$1.5 \\cdot 10^{2}\\ \\mathrm{cm^2}$",
     "$1.50 \\cdot 10^{2}\\ \\mathrm{cm^2}$",
     "$150.0\\ \\mathrm{cm^2}$"
    ],
    "correct": 2,
    "solution": "The side has **3 significant figures** (5.00 cm). In multiplication the answer is limited by the fewest significant figures, but the number *6* (the number of faces on a cube) is **exact** and does not affect the significant figures. So the result should have **3 significant figures**.\n\nCalculation:\n$$\nA_\\text{face} = (5.00)^{2} = 25.0\\ \\mathrm{cm^2}\n$$\n$$\nA_\\text{tot} = 6 \\cdot 25.0 = 150\\ \\mathrm{cm^2}\n$$\n\nBut now comes the **trap**: how do we write 150 so that it unambiguously has exactly 3 significant figures?\n\n- **A) 150 cm²**: *ambiguous*. It can be read as 2 significant figures (the zero is uncertain) *or* 3 significant figures. Unclear!\n- **B) 1.5 · 10² cm²**: only **2 significant figures**. Too few.\n- **C) 1.50 · 10² cm²**: **3 significant figures**, completely unambiguous. ✓\n- **D) 150.0 cm²**: **4 significant figures**. Adding \".0\" at the end invents a significant figure that the measured value does not have.\n\n**Answer:** Option C: 1.50 · 10² cm².\n\n**General conclusion:** When a number ends in *zeros to the left of the decimal point* (for example 150, 2 400, 50 000), the number of significant figures in the ordinary way of writing it is ambiguous: the zeros may be significant figures or just placeholders. The solution is to write the number in **standard form**, where every digit written counts as a significant figure. That is why physicists often write numbers in standard form even when it would not be needed to save space."
   }
  ]
 },
 "fy1-2.1": {
  "kalla": "eb399693e0",
  "data": [
   {
    "level": 1,
    "question": "A cyclist cycles 12 km in 30 min. Calculate the cyclist's average speed in km/h.",
    "answer": {
     "value": 24,
     "unit": "km/h"
    },
    "solution": "The average speed is the distance divided by the time:\n$$ v_\\mathrm{m} = \\frac{s}{t} $$\n\nMeasured values (after converting to the same unit of time):\n$$\n\\left[ \\begin{array}{l}\ns = 12\\ \\mathrm{km} \\\\\nt = 30\\ \\mathrm{min} = 0.5\\ \\mathrm{h}\n\\end{array} \\right]\n$$\n\n$$ v_\\mathrm{m} = \\frac{12}{0.5} = 24\\ \\mathrm{km/h} $$\n\n**Answer:** The average speed is 24 km/h."
   },
   {
    "level": 1,
    "question": "A runner has an average speed of 4.0 m/s for 15 minutes. How far has she run? Give the answer in metres.",
    "answer": {
     "value": 3600,
     "unit": "m"
    },
    "solution": "We solve for the distance in the formula for average speed:\n$$ v_\\mathrm{m} = \\frac{s}{t} \\quad\\Leftrightarrow\\quad s = v_\\mathrm{m} \\cdot t $$\n\nMeasured values (after converting to SI units):\n$$\n\\left[ \\begin{array}{l}\nv_\\mathrm{m} = 4.0\\ \\mathrm{m/s} \\\\\nt = 15\\ \\mathrm{min} = 15 \\cdot 60\\ \\mathrm{s} = 900\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$ s = 4.0 \\cdot 900 = 3\\,600\\ \\mathrm{m} = 3.6\\ \\mathrm{km} $$\n\n**Answer:** The runner has run 3.6 km."
   },
   {
    "level": 1,
    "question": "A car travels with an average speed of 90 km/h. How long does it take the car to drive 270 km? Give the answer in hours.",
    "answer": {
     "value": 3,
     "unit": "h"
    },
    "solution": "We solve for the time in the formula for average speed:\n$$ v_\\mathrm{m} = \\frac{s}{t} \\quad\\Leftrightarrow\\quad t = \\frac{s}{v_\\mathrm{m}} $$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns = 270\\ \\mathrm{km} \\\\\nv_\\mathrm{m} = 90\\ \\mathrm{km/h}\n\\end{array} \\right]\n$$\n\n$$ t = \\frac{270}{90} = 3.0\\ \\mathrm{h} $$\n\n**Answer:** The journey takes 3.0 hours."
   },
   {
    "level": 2,
    "question": "Tom cycles 5.0 km in 20 minutes. Then he walks 2.0 km in 30 minutes. What is his average speed in km/h over the whole distance?",
    "answer": {
     "value": 8.4,
     "unit": "km/h",
     "tol": 0.03
    },
    "solution": "The average speed over the whole distance is the **total distance** divided by the **total time**, not the mean of the speeds of the parts.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns_1 = 5.0\\ \\mathrm{km},\\quad t_1 = 20\\ \\mathrm{min} \\\\\ns_2 = 2.0\\ \\mathrm{km},\\quad t_2 = 30\\ \\mathrm{min}\n\\end{array} \\right]\n$$\n\nTotal distance and time:\n$$ s_\\mathrm{tot} = s_1 + s_2 = 5.0 + 2.0 = 7.0\\ \\mathrm{km} $$\n$$ t_\\mathrm{tot} = t_1 + t_2 = 20 + 30 = 50\\ \\mathrm{min} = \\frac{50}{60}\\ \\mathrm{h} \\approx 0.833\\ \\mathrm{h} $$\n\nAverage speed:\n$$ v_\\mathrm{m} = \\frac{s_\\mathrm{tot}}{t_\\mathrm{tot}} = \\frac{7.0}{0.833} \\approx 8.4\\ \\mathrm{km/h} $$\n\n**Answer:** The average speed is about 8.4 km/h."
   },
   {
    "level": 2,
    "question": "A driver drives 80 km on a motorway with an average speed of 100 km/h. Then she drives 30 km on a smaller road with an average speed of 60 km/h. What is the average speed for the whole journey? Give the answer in km/h.",
    "answer": {
     "value": 84.6,
     "unit": "km/h",
     "tol": 0.03
    },
    "solution": "We must first calculate the time for each part of the journey, and then calculate the average speed from the total distance and the total time.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns_1 = 80\\ \\mathrm{km},\\quad v_1 = 100\\ \\mathrm{km/h} \\\\\ns_2 = 30\\ \\mathrm{km},\\quad v_2 = 60\\ \\mathrm{km/h}\n\\end{array} \\right]\n$$\n\nTimes for each part:\n$$ t_1 = \\frac{s_1}{v_1} = \\frac{80}{100} = 0.80\\ \\mathrm{h} $$\n$$ t_2 = \\frac{s_2}{v_2} = \\frac{30}{60} = 0.50\\ \\mathrm{h} $$\n\nTotal distance and time:\n$$ s_\\mathrm{tot} = 80 + 30 = 110\\ \\mathrm{km} $$\n$$ t_\\mathrm{tot} = 0.80 + 0.50 = 1.30\\ \\mathrm{h} $$\n\nAverage speed:\n$$ v_\\mathrm{m} = \\frac{s_\\mathrm{tot}}{t_\\mathrm{tot}} = \\frac{110}{1.30} \\approx 85\\ \\mathrm{km/h} $$\n\n**Answer:** The average speed is about 85 km/h. Note that the average speed is **not** the mean of 100 and 60 km/h (= 80 km/h), since she spends different amounts of time on the two parts."
   },
   {
    "level": 3,
    "question": "A person runs 100 m on a running track at 5.0 m/s. When she turns and runs back the same 100 m, she is more tired and has an average speed of 4.0 m/s. What is the average speed over the whole distance (there and back)? Give the answer in m/s.\n\n*Hint: It is tempting to answer $(5.0 + 4.0)/2 = 4.5$ m/s. Think about whether that is right!*",
    "answer": {
     "value": 4.44,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "The **wrong way** is to take the mean of the two speeds (4.5 m/s). That is only correct if the person spends the same amount of time at each speed, but she spends **different amounts of time** on each part. Average speed is always calculated from the total distance and the total time.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns_1 = s_2 = 100\\ \\mathrm{m} \\\\\nv_1 = 5.0\\ \\mathrm{m/s} \\\\\nv_2 = 4.0\\ \\mathrm{m/s}\n\\end{array} \\right]\n$$\n\nTimes for each part:\n$$ t_1 = \\frac{s_1}{v_1} = \\frac{100}{5.0} = 20\\ \\mathrm{s} $$\n$$ t_2 = \\frac{s_2}{v_2} = \\frac{100}{4.0} = 25\\ \\mathrm{s} $$\n\nTotal distance and time:\n$$ s_\\mathrm{tot} = 100 + 100 = 200\\ \\mathrm{m} $$\n$$ t_\\mathrm{tot} = 20 + 25 = 45\\ \\mathrm{s} $$\n\nAverage speed:\n$$ v_\\mathrm{m} = \\frac{s_\\mathrm{tot}}{t_\\mathrm{tot}} = \\frac{200}{45} \\approx 4.44\\ \\mathrm{m/s} $$\n\n**Answer:** The average speed is about 4.4 m/s.\n\n**General conclusion:** For two equally long distances at different speeds $v_1$ and $v_2$, the average speed is the *harmonic mean*:\n$$ v_\\mathrm{m} = \\frac{2 \\cdot v_1 \\cdot v_2}{v_1 + v_2} $$\nIt is *always lower* than the arithmetic mean $(v_1 + v_2)/2$: the slower part \"weighs more\" because it takes longer."
   }
  ]
 },
 "fy1-2.2": {
  "kalla": "f5301a8348",
  "data": [
   {
    "level": 1,
    "question": "Which of the following quantities is a **vector**?",
    "choices": [
     "Mass",
     "Time",
     "Velocity",
     "Energy"
    ],
    "correct": 2,
    "solution": "A **vector** is a quantity that has *both magnitude and direction*. A **scalar** has only *magnitude*.\n\n- Mass, time and energy have only magnitude (scalars).\n- Velocity has both magnitude (m/s) and direction (which way the object is moving), so it is a vector.\n\n**Answer:** Velocity.\n\n**General conclusion:** Other common vectors are *force*, *acceleration*, *displacement* and *momentum*. Common scalars are *speed*, *distance*, *mass*, *time*, *temperature* and *energy*."
   },
   {
    "level": 1,
    "question": "Anna jogs 600 m due east and then turns back 200 m to the west. What is her **displacement** (in metres) from the starting point? Take east as the positive direction.",
    "answer": {
     "value": 400,
     "unit": "m",
     "tol": 0.01
    },
    "solution": "**Displacement** is a vector: it gives the net change in position, *with a sign* for the direction.\n\nMeasured values (east = positive):\n$$\n\\left[ \\begin{array}{l}\n\\Delta s_1 = +600\\ \\mathrm{m} \\\\\n\\Delta s_2 = -200\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\nTotal displacement:\n$$\n\\Delta s = \\Delta s_1 + \\Delta s_2 = 600 + (-200) = 400\\ \\mathrm{m}\n$$\n\n**Answer:** The displacement is 400 m to the east.\n\n**General conclusion:** The *distance* she has covered, on the other hand, is 600 + 200 = 800 m. Distance is a scalar and is always counted as positive."
   },
   {
    "level": 1,
    "question": "A passenger walks at a speed of 1.2 m/s **against** the train's direction of motion inside a carriage. The train moves at 22 m/s relative to the ground. What is the passenger's velocity relative to the ground? Take the train's direction as positive.",
    "answer": {
     "value": 20.8,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "The velocities are along the same axis, so we add them with signs. The train is positive (+22 m/s), and the passenger walks *backwards* relative to the train (−1.2 m/s).\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_\\text{train} = +22\\ \\mathrm{m/s} \\\\\nv_\\text{passenger} = -1.2\\ \\mathrm{m/s} \\quad (\\text{against the train's direction})\n\\end{array} \\right]\n$$\n\nTotal velocity relative to the ground:\n$$\nv_\\text{tot} = v_\\text{train} + v_\\text{passenger} = 22 + (-1.2) = 20.8\\ \\mathrm{m/s}\n$$\n\n**Answer:** 20.8 m/s in the train's direction."
   },
   {
    "level": 2,
    "question": "A boat can be rowed at a speed of 3.0 m/s straight across a wide canal. The water in the canal flows at 4.0 m/s along the canal. What is the boat's **resultant speed** relative to the ground?",
    "answer": {
     "value": 5,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "The boat's own velocity (straight across the canal) and the velocity of the current (along the canal) are **perpendicular** to each other. The magnitude of the resultant is then calculated with Pythagoras' theorem.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_1 = 3.0\\ \\mathrm{m/s} \\quad (\\text{across the canal}) \\\\\nv_2 = 4.0\\ \\mathrm{m/s} \\quad (\\text{along the canal})\n\\end{array} \\right]\n$$\n\nPythagoras' theorem:\n$$\nv = \\sqrt{v_1^{2} + v_2^{2}} = \\sqrt{3.0^{2} + 4.0^{2}} = \\sqrt{25} = 5.0\\ \\mathrm{m/s}\n$$\n\n**Answer:** The boat's speed relative to the ground is 5.0 m/s."
   },
   {
    "level": 2,
    "question": "An aeroplane flies with an airspeed of 250 km/h due north. Suddenly a crosswind starts blowing from the west at 60 km/h. What is the aeroplane's resultant speed over the ground?",
    "answer": {
     "value": 257,
     "unit": "km/h",
     "tol": 0.02
    },
    "solution": "The plane flies north, and the wind blows east (from the west). The velocity vectors are perpendicular to each other.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_\\text{plane} = 250\\ \\mathrm{km/h} \\quad (\\text{north}) \\\\\nv_\\text{wind} = 60\\ \\mathrm{km/h} \\quad (\\text{east})\n\\end{array} \\right]\n$$\n\nMagnitude of the resultant:\n$$\nv = \\sqrt{v_\\text{plane}^{2} + v_\\text{wind}^{2}} = \\sqrt{250^{2} + 60^{2}} = \\sqrt{62\\,500 + 3\\,600} = \\sqrt{66\\,100}\n$$\n\n$$\nv \\approx 257\\ \\mathrm{km/h}\n$$\n\n**Answer:** The resultant speed is about 257 km/h. Note that the direction deviates slightly to the east: the plane \"drifts\" off course unless the pilot corrects for it."
   },
   {
    "level": 3,
    "question": "A swimmer wants to get **straight across** an 80 m wide river, from the south bank to the north bank. Her own speed in still water is 1.5 m/s. The current flows west at 0.90 m/s.\n\na) In which direction (relative to the river) must she aim to get straight across?\n\nb) How long does it take to cross the river?\n\n*Give the time from b) as your numerical answer (in seconds).*",
    "answer": {
     "value": 67,
     "unit": "s",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 37,
      "unit": "°",
      "etikett": "angle upstream",
      "tol": 0.05
     },
     {
      "del": "b",
      "value": 67,
      "unit": "s",
      "tol": 0.03
     }
    ],
    "solution": "To end up straight across, the swimmer's **resultant velocity** must point due north. This means that her own velocity vector *v*_s must have a component upstream (east) that exactly cancels the current, and a component due north.\n\n**a)** We draw a right-angled triangle where:\n- *v*_s = 1.5 m/s is the hypotenuse (the swimmer's speed in still water),\n- *v*_current = 0.90 m/s is one leg (pointing west),\n- *v*_north (the component straight across the river) is the other leg.\n\nThe angle α between the swimmer's heading and due north satisfies\n\n$$\n\\sin\\alpha = \\frac{v_\\text{current}}{v_s} = \\frac{0.90}{1.5} = 0.60\n\\quad\\Rightarrow\\quad \\alpha \\approx 37^{\\circ}\\ \\text{upstream}\n$$\n\n**b)** The effective speed *straight across* the river is the northward component:\n\n$$\nv_\\text{north} = \\sqrt{v_s^{2} - v_\\text{current}^{2}} = \\sqrt{1.5^{2} - 0.90^{2}} = \\sqrt{2.25 - 0.81} = \\sqrt{1.44} = 1.2\\ \\mathrm{m/s}\n$$\n\nThe time to cross the river:\n\n$$\nt = \\frac{s}{v_\\text{north}} = \\frac{80}{1.2} \\approx 67\\ \\mathrm{s}\n$$\n\n**Answer:** a) About 37° upstream (east of due north). b) 67 s.\n\n**General conclusion:** This is a *compensation problem*: if the swimmer instead swam straight towards the north bank, she would drift with the current and end up downstream. The time for swimming straight towards the bank is then shorter ($t = 80/1.5 \\approx 53$ s), but she does not end up straight across."
   }
  ]
 },
 "fy1-2.3": {
  "kalla": "8d3512eef1",
  "data": [
   {
    "level": 1,
    "question": "An object moves with constant velocity according to the *s-t* graph below. Read off suitable points and calculate the velocity in m/s.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">s</tspan> (m)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">30</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">40</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">50</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">60</text></g><path d=\"M 60.0 290.0 L 460.0 73.3\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 5,
     "unit": "m/s",
     "tol": 0.05
    },
    "solution": "The slope of an *s-t* graph corresponds to the velocity. We choose two suitable points on the line, preferably where the line crosses grid intersections, for example (0; 0) and (10 s; 50 m).\n\n$$\nv = \\frac{\\Delta s}{\\Delta t} = \\frac{s_2 - s_1}{t_2 - t_1}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nt_1 = 0,\\quad s_1 = 0 \\\\\nt_2 = 10\\ \\mathrm{s},\\quad s_2 = 50\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nv = \\frac{50 - 0}{10 - 0} = 5.0\\ \\mathrm{m/s}\n$$\n\n**Answer:** 5.0 m/s.\n\n**General conclusion:** Which two points you choose on the line does not matter as long as both lie on the line: the slope is the same. Choose points where it is easy to read exact values (grid intersections)."
   },
   {
    "level": 1,
    "question": "What does the **slope of the secant** in an *s-t* graph give?",
    "choices": [
     "The object's instantaneous velocity at a certain point.",
     "The object's total distance.",
     "The object's acceleration.",
     "The object's average velocity over a time interval."
    ],
    "correct": 3,
    "solution": "A **secant** is a straight line that intersects the graph at two points. The slope between these two points corresponds to the displacement divided by the time interval, that is, the **average velocity** over the interval.\n\nA **tangent**, on the other hand, touches the graph at *one* point, and its slope is the **instantaneous velocity** at exactly that point.\n\n**Answer:** The slope of the secant is the average velocity."
   },
   {
    "level": 1,
    "question": "A lorry travels with an average velocity of 65 km/h for 2.5 hours. How large is its displacement during this time? Give the answer in km.",
    "answer": {
     "value": 162.5,
     "unit": "km",
     "tol": 0.02
    },
    "solution": "We solve for the displacement in the formula for average velocity:\n\n$$\nv_\\mathrm{m} = \\frac{\\Delta s}{\\Delta t} \\quad\\Leftrightarrow\\quad \\Delta s = v_\\mathrm{m} \\cdot \\Delta t\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_\\mathrm{m} = 65\\ \\mathrm{km/h} \\\\\n\\Delta t = 2.5\\ \\mathrm{h}\n\\end{array} \\right]\n$$\n\n$$\n\\Delta s = 65 \\cdot 2.5 = 162.5\\ \\mathrm{km}\n$$\n\n**Answer:** The displacement is 163 km (rounded to 3 significant figures)."
   },
   {
    "level": 2,
    "question": "Bertil cycles from the shop to his home. At *t*₁ = 0 he is at position *s*₁ = 6.0 km (the shop). At *t*₂ = 25 min he is at position *s*₂ = 0 (home). What is his **average velocity** between these times, given in m/s?",
    "answer": {
     "value": -4,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "The average velocity is a vector: its sign follows the direction of the displacement.\n\nMeasured values after converting to SI units:\n$$\n\\left[ \\begin{array}{l}\ns_1 = 6.0\\ \\mathrm{km} = 6\\,000\\ \\mathrm{m} \\\\\ns_2 = 0 \\\\\nt_1 = 0,\\quad t_2 = 25\\ \\mathrm{min} = 1\\,500\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nAverage velocity:\n$$\nv_\\mathrm{m} = \\frac{s_2 - s_1}{t_2 - t_1} = \\frac{0 - 6\\,000}{1\\,500} = \\frac{-6\\,000}{1\\,500} = -4.0\\ \\mathrm{m/s}\n$$\n\n**Answer:** −4.0 m/s.\n\n**General conclusion:** The minus sign tells us that Bertil moves in the *negative direction*, that is, back towards lower *s* values. His **speed** is 4.0 m/s, but his **velocity** is −4.0 m/s."
   },
   {
    "level": 2,
    "question": "A jogger runs 1.8 km due north, turns and then runs 0.6 km due south. The whole motion takes 12 minutes. What is her **average velocity**? Take north as the positive direction and give the answer in m/s.",
    "answer": {
     "value": 1.67,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "The average velocity is the **displacement** divided by the time, not the distance.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\Delta s = +1\\,800 - 600 = 1\\,200\\ \\mathrm{m} \\quad (\\text{net northwards}) \\\\\n\\Delta t = 12\\ \\mathrm{min} = 720\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nAverage velocity:\n$$\nv_\\mathrm{m} = \\frac{\\Delta s}{\\Delta t} = \\frac{1\\,200}{720} \\approx 1.67\\ \\mathrm{m/s}\n$$\n\n**Answer:** 1.67 m/s northwards.\n\n**General conclusion:** Her *average speed* (a scalar), on the other hand, is $\\dfrac{2\\,400}{720} \\approx 3.33$ m/s, since the whole distance is 2.4 km. Average speed and average velocity are *not* the same thing when the motion changes direction."
   },
   {
    "level": 2,
    "question": "An object moves along a straight line according to the *s-t* graph below. Read the coordinates you need from the grid.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"225.0\" x2=\"460\" y2=\"225.0\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"95.0\" x2=\"460\" y2=\"95.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">s</tspan> (m)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"230.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">40</text><text x=\"53\" y=\"100.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">60</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">80</text></g><path d=\"M 60.0 290.0 L 80.0 285.4 L 100.0 279.8 L 120.0 273.2 L 140.0 265.6 L 160.0 257.0 L 180.0 247.3 L 200.0 236.7 L 220.0 225.0 L 240.0 212.3 L 260.0 198.6 L 280.0 183.9 L 300.0 168.1 L 320.0 151.4 L 340.0 133.6 L 360.0 114.8 L 380.0 95.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\na) What is the object's **average velocity** over the whole interval (from *t* = 0 to *t* = 8 s)?\n\nb) What is the average velocity between *t* = 4 s and *t* = 8 s?\n\nc) Is the object's instantaneous velocity at *t* = 8 s greater than, less than or equal to these average velocities? Explain with the help of the graph.\n\n*Give the average velocity from a) as your numerical answer in m/s.*",
    "answer": {
     "value": 7.5,
     "unit": "m/s",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 7.5,
      "unit": "m/s"
     },
     {
      "del": "b",
      "value": 10,
      "unit": "m/s"
     },
     {
      "del": "c"
     }
    ],
    "solution": "We read the points from the graph and use the fact that the average velocity corresponds to the **slope of the secant** between two points.\n\n**a)** Secant between (0; 0) and (8; 60):\n\n$$\nv_{\\mathrm{m},a} = \\frac{\\Delta s}{\\Delta t} = \\frac{60 - 0}{8 - 0} = \\frac{60}{8} = 7.5\\ \\mathrm{m/s}\n$$\n\n**b)** Secant between (4; 20) and (8; 60):\n\n$$\nv_{\\mathrm{m},b} = \\frac{\\Delta s}{\\Delta t} = \\frac{60 - 20}{8 - 4} = \\frac{40}{4} = 10\\ \\mathrm{m/s}\n$$\n\n**c)** The graph is **convex** (it slopes upwards more and more steeply): this is clear if you compare the slope of the curve at *t* = 1 s with the slope at *t* = 7 s. This means that the object is *accelerating*.\n\nSince the average velocity is **greater** during the later half (10 m/s) than over the whole interval (7.5 m/s), this confirms that the motion is getting faster and faster. **The instantaneous velocity at *t* = 8 s**, the slope of the tangent there, is therefore **greater than both** average velocities:\n\n$$\nv_\\text{instantaneous}(8\\ \\mathrm{s}) > v_{\\mathrm{m},b} = 10\\ \\mathrm{m/s} > v_{\\mathrm{m},a} = 7.5\\ \\mathrm{m/s}\n$$\n\n**Answer:** a) 7.5 m/s. b) 10 m/s. c) Greater than both: the object is accelerating.\n\n**General conclusion:** For a convex *s-t* graph (accelerating motion), the average velocity over a *later* interval is always closer to the instantaneous velocity at the end. To estimate the instantaneous velocity even better, you can choose shorter and shorter intervals around the point, or draw a tangent and measure its slope."
   },
   {
    "level": 3,
    "question": "Anna starts cycling from a starting point at a constant speed of 4.0 m/s in a straight line. **30 seconds later**, Beata starts cycling the same route from the same starting point at a constant speed of 6.0 m/s.\n\na) At what time (measured from Anna's start) does Beata catch up with Anna?\n\nb) How far from the starting point are they both when Beata has caught up?\n\n*Give the distance from the starting point (b) as your numerical answer in metres.*",
    "answer": {
     "value": 360,
     "unit": "m",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 90,
      "unit": "s"
     },
     {
      "del": "b",
      "value": 360,
      "unit": "m"
     }
    ],
    "solution": "Both cyclists move at constant speed along the same line. We set up their position functions (the position as a function of time), where *t* is counted from Anna's start.\n\nFor **Anna** (starts at *t* = 0):\n$$\ns_A(t) = v_A \\cdot t = 4.0\\, t\n$$\n\nFor **Beata** (starts at *t* = 30 s, so she has cycled for $t - 30$ seconds):\n$$\ns_B(t) = v_B \\cdot (t - 30) = 6.0\\, (t - 30)\n$$\n\n**a) Meeting condition**: they are at the same place when $s_A(t) = s_B(t)$:\n\n$$\n4.0\\, t = 6.0\\, (t - 30)\n$$\n\n$$\n4.0\\, t = 6.0\\, t - 180\n$$\n\n$$\n2.0\\, t = 180 \\quad\\Leftrightarrow\\quad t = 90\\ \\mathrm{s}\n$$\n\n**b) Distance from the starting point**: substitute into either of the position functions:\n\n$$\ns = 4.0 \\cdot 90 = 360\\ \\mathrm{m}\n$$\n\n(Check with Beata's formula: $s_B = 6.0 \\cdot (90 - 30) = 6.0 \\cdot 60 = 360$ m ✓)\n\n**Answer:** a) At *t* = 90 s (measured from Anna's start, that is, 60 s after Beata's start). b) 360 m from the starting point.\n\n**General conclusion:** Meeting problems are always solved by setting up two position functions $s_1(t)$ and $s_2(t)$ with a common time axis and setting them equal. The trick is to handle **time delays** correctly: Beata has not cycled for *t* seconds but for $t - 30$ seconds."
   }
  ]
 },
 "fy1-2.4": {
  "kalla": "a5c486d78f",
  "data": [
   {
    "level": 1,
    "question": "A car accelerates from 0 to 25 m/s in 8.0 s. What is its average acceleration?",
    "answer": {
     "value": 3.125,
     "unit": "m/s²",
     "tol": 0.02
    },
    "solution": "The definition of average acceleration:\n\n$$\na_\\mathrm{m} = \\frac{\\Delta v}{\\Delta t}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\Delta v = 25 - 0 = 25\\ \\mathrm{m/s} \\\\\n\\Delta t = 8.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\na_\\mathrm{m} = \\frac{25}{8.0} = 3.125\\ \\mathrm{m/s^2} \\approx 3.1\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The acceleration is about 3.1 m/s²."
   },
   {
    "level": 1,
    "question": "A stone is released from rest and falls freely (without air resistance). What is its velocity after 3.0 s? Use $g = 9.82\\ \\mathrm{m/s^2}$ and give the *magnitude* of the answer in m/s (a positive number).",
    "answer": {
     "value": 29.5,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "In free fall, *a* = *g* directed towards the ground. Since the stone is released from rest, *v*₀ = 0.\n\n$$\nv = v_0 + a \\cdot t = 0 + g \\cdot t\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ng \\approx 9.82\\ \\mathrm{m/s^2} \\\\\nt = 3.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\nv = 9.82 \\cdot 3.0 = 29.46\\ \\mathrm{m/s} \\approx 29.5\\ \\mathrm{m/s}\n$$\n\n**Answer:** 29.5 m/s downwards."
   },
   {
    "level": 1,
    "question": "A cyclist rolls at a speed of 5.0 m/s and accelerates constantly at 0.80 m/s² for 4.0 seconds. What is his final velocity?",
    "answer": {
     "value": 8.2,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "We use the formula for velocity with constant acceleration:\n\n$$\nv = v_0 + a \\cdot t\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 5.0\\ \\mathrm{m/s} \\\\\na = 0.80\\ \\mathrm{m/s^2} \\\\\nt = 4.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\nv = 5.0 + 0.80 \\cdot 4.0 = 5.0 + 3.2 = 8.2\\ \\mathrm{m/s}\n$$\n\n**Answer:** 8.2 m/s."
   },
   {
    "level": 2,
    "question": "A car travels at 90 km/h and has to brake to 30 km/h. The brakes give a constant deceleration of 5.0 m/s². How long does the braking take?",
    "answer": {
     "value": 3.33,
     "unit": "s",
     "tol": 0.03
    },
    "solution": "We solve for the time in the formula for velocity with constant acceleration, after converting the velocities to SI units (m/s).\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 90\\ \\mathrm{km/h} = 90 / 3.6\\ \\mathrm{m/s} = 25\\ \\mathrm{m/s} \\\\\nv = 30\\ \\mathrm{km/h} = 30 / 3.6\\ \\mathrm{m/s} \\approx 8.33\\ \\mathrm{m/s} \\\\\na = -5.0\\ \\mathrm{m/s^2} \\quad (\\text{deceleration: negative})\n\\end{array} \\right]\n$$\n\nWe solve for *t*:\n$$\nv = v_0 + a \\cdot t \\quad\\Leftrightarrow\\quad t = \\frac{v - v_0}{a}\n$$\n\n$$\nt = \\frac{8.33 - 25}{-5.0} = \\frac{-16.67}{-5.0} \\approx 3.3\\ \\mathrm{s}\n$$\n\n**Answer:** The braking takes about 3.3 seconds."
   },
   {
    "level": 2,
    "question": "A ball is thrown straight up with an initial velocity of 12 m/s. How long does it take before the ball reaches its highest point? Use $g = 9.82\\ \\mathrm{m/s^2}$ and ignore air resistance.",
    "answer": {
     "value": 1.22,
     "unit": "s",
     "tol": 0.03
    },
    "solution": "At the ball's highest point, *v* = 0 (it turns around). We take upwards as the positive direction, so the acceleration is *a* = −*g* (downwards).\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = +12\\ \\mathrm{m/s} \\\\\nv = 0 \\quad (\\text{at the top}) \\\\\na = -g \\approx -9.82\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\nWe solve for *t* in $v = v_0 + a \\cdot t$:\n\n$$\nt = \\frac{v - v_0}{a} = \\frac{0 - 12}{-9.82} \\approx 1.22\\ \\mathrm{s}\n$$\n\n**Answer:** The ball reaches its highest point after about 1.22 s.\n\n**General conclusion:** On the way down, it takes the same time to fall back to the height it was thrown from (if we ignore air resistance), so the total flight time is $\\approx 2.44$ s."
   },
   {
    "level": 2,
    "question": "A passenger in a car notices that the speedometer shows 50 km/h, and 8.0 seconds later it shows 80 km/h.\n\na) What is the average acceleration in SI units (m/s²)?\n\nb) Is this really the **instantaneous** acceleration at any time during the interval? Explain.\n\n*Give the average acceleration from a) as your numerical answer in m/s².*",
    "answer": {
     "value": 1.04,
     "unit": "m/s²",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.04,
      "unit": "m/s²",
      "tol": 0.03
     },
     {
      "del": "b"
     }
    ],
    "solution": "**a)** Conversion to SI units:\n\n$$\n\\left[ \\begin{array}{l}\nv_0 = 50\\ \\mathrm{km/h} = 50 / 3.6\\ \\mathrm{m/s} \\approx 13.89\\ \\mathrm{m/s} \\\\\nv = 80\\ \\mathrm{km/h} = 80 / 3.6\\ \\mathrm{m/s} \\approx 22.22\\ \\mathrm{m/s} \\\\\n\\Delta t = 8.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\na_\\mathrm{m} = \\frac{\\Delta v}{\\Delta t} = \\frac{22.22 - 13.89}{8.0} \\approx 1.04\\ \\mathrm{m/s^2}\n$$\n\n**b)** The average acceleration *only* tells us that the velocity has increased by about 8.3 m/s in total over 8.0 s: it says nothing about how the increase was distributed. The driver may have:\n\n- accelerated *constantly* at 1.04 m/s² the whole time (then the instantaneous value equals the average all the way), or\n- accelerated harder at the beginning and more gently at the end (or the other way round).\n\nIn practice it is almost impossible to keep an *exactly* constant acceleration in a car. But somewhere in the interval the instantaneous acceleration **must** be equal to the average acceleration: this follows from the **mean value theorem**: if a continuous function has the mean value *m* on an interval, then it takes the value *m* at least once in the interval.\n\n**Answer:** a) The average acceleration is about 1.04 m/s². b) It is not necessarily equal to the instantaneous acceleration over the whole interval, but it coincides with it at least once during the interval.\n\n**General conclusion:** This is a classic source of misunderstanding: an *average* over an interval says something about the motion as a whole, not about what happened at any specific moment."
   },
   {
    "level": 3,
    "question": "A stone is released from a high cliff and falls freely towards the ground. **During the last second** of its fall, the stone falls 40 m.\n\nHow long has the stone been falling in total when it hits the ground? Use $g = 9.82\\ \\mathrm{m/s^2}$ and ignore air resistance. Give the time in seconds.",
    "answer": {
     "value": 4.57,
     "unit": "s",
     "tol": 0.02
    },
    "solution": "Since the stone is released from rest, the distance fallen after the time *t* is given by the formula for free fall:\n\n$$\ns(t) = \\frac{g \\cdot t^{2}}{2}\n$$\n\nThe stone hits the ground at some time *t*. During the **last second** (between *t* − 1 and *t*) it falls 40 m, which means:\n\n$$\ns(t) - s(t - 1) = 40\n$$\n\nSubstitute the formula:\n\n$$\n\\frac{g \\cdot t^{2}}{2} - \\frac{g \\cdot (t - 1)^{2}}{2} = 40\n$$\n\nTake out the common factor:\n\n$$\n\\frac{g}{2} \\bigl[ t^{2} - (t - 1)^{2} \\bigr] = 40\n$$\n\nExpand $(t - 1)^{2} = t^{2} - 2t + 1$:\n\n$$\n\\frac{g}{2} \\bigl[ t^{2} - t^{2} + 2t - 1 \\bigr] = 40\n$$\n\n$$\n\\frac{g}{2} \\cdot (2t - 1) = 40 \\quad\\Leftrightarrow\\quad g \\cdot t - \\frac{g}{2} = 40\n$$\n\nSolve for *t*:\n\n$$\nt = \\frac{40 + g/2}{g} = \\frac{40 + 4.91}{9.82} = \\frac{44.91}{9.82} \\approx 4.57\\ \\mathrm{s}\n$$\n\n**Answer:** The stone has been falling for about 4.57 s in total when it reaches the ground.\n\n**General conclusion:** This is a classic trap: the tempting \"shortcut\" is to work out the velocity just before it hits the ground ($v = 40$ m/s, since 40 m / 1 s = 40 m/s), but that is wrong, because the stone's velocity *during* the last second is not constant. It increases from $v(t-1)$ to $v(t)$, and 40 m is the displacement at the *average* velocity during that second. The right method is to compare two moments using the formula for free fall."
   }
  ]
 },
 "fy1-2.5": {
  "kalla": "547aa00f3a",
  "data": [
   {
    "level": 1,
    "question": "Read off the object's constant acceleration from the *v-t* graph below.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">25</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">30</text></g><path d=\"M 60.0 290.0 L 460.0 73.3\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 2.5,
     "unit": "m/s²",
     "tol": 0.05
    },
    "solution": "The slope of a *v-t* graph corresponds to the acceleration. We choose two points on the line where it is easy to read exact values, for example (0; 0) and (10 s; 25 m/s).\n\n$$\na = \\frac{\\Delta v}{\\Delta t} = \\frac{v_2 - v_1}{t_2 - t_1}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nt_1 = 0,\\quad v_1 = 0 \\\\\nt_2 = 10\\ \\mathrm{s},\\quad v_2 = 25\\ \\mathrm{m/s}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{25 - 0}{10 - 0} = 2.5\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** 2.5 m/s²."
   },
   {
    "level": 1,
    "question": "What does the **area** between the graph and the *x*-axis in a *v-t* graph correspond to?",
    "choices": [
     "The average acceleration",
     "The maximum velocity",
     "The acceleration",
     "The displacement"
    ],
    "correct": 3,
    "solution": "The area in a *v-t* graph is formed by velocity ($\\mathrm{m/s}$) times time ($\\mathrm{s}$), which has the unit metre ($\\mathrm{m}$). So it does not match acceleration or velocity, but a distance/displacement.\n\nMore formally: we know that $\\Delta s = v \\cdot \\Delta t$ at constant velocity, which is the base times the height of a rectangle under the graph. For a varying velocity this is generalised to the whole area under the curve.\n\n- Area **above** the *x*-axis = positive displacement.\n- Area **below** the *x*-axis = negative displacement.\n\n**Answer:** The displacement."
   },
   {
    "level": 1,
    "question": "An object moves with **constant velocity** according to the *v-t* graph below. Calculate the object's displacement during the interval 0–12 s.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">14</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text></g><path d=\"M 60.0 134.0 L 402.9 134.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 72,
     "unit": "m",
     "tol": 0.02
    },
    "solution": "The displacement corresponds to the **area under the graph** between *t* = 0 and *t* = 12 s. At constant velocity this is a rectangle with base $\\Delta t$ and height *v*:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 60.0 134.0 L 402.9 134.0 L 402.9 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">14</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text></g><path d=\"M 60.0 134.0 L 402.9 134.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\n$$\n\\Delta s = v \\cdot \\Delta t\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv = 6.0\\ \\mathrm{m/s} \\\\\n\\Delta t = 12\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\n\\Delta s = 6.0 \\cdot 12 = 72\\ \\mathrm{m}\n$$\n\n**Answer:** The displacement is 72 m."
   },
   {
    "level": 2,
    "question": "An object starts from rest and accelerates constantly according to the *v-t* graph below. Calculate the object's displacement during the interval 0–8 s.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">25</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">30</text></g><path d=\"M 60.0 290.0 L 380.0 82.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 96,
     "unit": "m",
     "tol": 0.02
    },
    "solution": "The displacement corresponds to the **area under the graph**, in this case a triangle with base $\\Delta t = 8.0$ s and height $v = 24$ m/s:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 380.0 82.0 L 380.0 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">25</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">30</text></g><path d=\"M 60.0 290.0 L 380.0 82.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\n$$\n\\Delta s = \\frac{\\text{base} \\cdot \\text{height}}{2} = \\frac{\\Delta t \\cdot v}{2}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\n\\Delta t = 8.0\\ \\mathrm{s} \\\\\nv = 24\\ \\mathrm{m/s}\n\\end{array} \\right]\n$$\n\n$$\n\\Delta s = \\frac{8.0 \\cdot 24}{2} = 96\\ \\mathrm{m}\n$$\n\n**Answer:** The displacement is 96 m.\n\n**General conclusion:** This is the same result as you get from the formula $s = v_0 t + \\dfrac{1}{2} a t^{2}$, where $v_0 = 0$, $a = 24/8.0 = 3.0$ m/s² and $t = 8.0$ s."
   },
   {
    "level": 2,
    "question": "A train moves according to the *v-t* graph below: first with constant velocity, then it brakes uniformly until it stops. Calculate the train's total displacement.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"225.0\" x2=\"460\" y2=\"225.0\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"95.0\" x2=\"460\" y2=\"95.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">14</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"230.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"100.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text></g><path d=\"M 60.0 56.0 L 202.9 56.0 L 402.9 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 153,
     "unit": "m",
     "tol": 0.02
    },
    "solution": "The displacement is the **area under the graph**. We divide the area into two parts: a rectangle **A** between *t* = 0 and *t* = 5 s, and a triangle **B** between *t* = 5 s and *t* = 12 s:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"225.0\" x2=\"460\" y2=\"225.0\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"95.0\" x2=\"460\" y2=\"95.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 60.0 56.0 L 202.9 56.0 L 202.9 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><path d=\"M 202.9 290.0 L 202.9 56.0 L 402.9 290.0 Z\" fill=\"rgba(28,61,107,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">14</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"230.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"100.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">20</text></g><path d=\"M 60.0 56.0 L 202.9 56.0 L 402.9 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\n**Part A: rectangle** (between *t* = 0 and *t* = 5.0 s):\n$$\nA = v \\cdot \\Delta t = 18 \\cdot 5.0 = 90\\ \\mathrm{m}\n$$\n\n**Part B: triangle** (between *t* = 5.0 s and *t* = 12 s, the velocity decreases linearly from 18 to 0):\n$$\nB = \\frac{\\Delta t \\cdot v}{2} = \\frac{(12 - 5.0) \\cdot 18}{2} = \\frac{7.0 \\cdot 18}{2} = 63\\ \\mathrm{m}\n$$\n\nTotal displacement:\n$$\n\\Delta s = A + B = 90 + 63 = 153\\ \\mathrm{m}\n$$\n\n**Answer:** The train rolls 153 m in total."
   },
   {
    "level": 2,
    "question": "An object moves along a straight line according to the *v-t* graph below.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"268.3\" x2=\"460\" y2=\"268.3\"/><line x1=\"60\" y1=\"214.2\" x2=\"460\" y2=\"214.2\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"105.8\" x2=\"460\" y2=\"105.8\"/><line x1=\"60\" y1=\"51.7\" x2=\"460\" y2=\"51.7\"/></g><line x1=\"60\" y1=\"160.0\" x2=\"468\" y2=\"160.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,156.0 476,160.0 468,164.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"154.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"273.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">-10</text><text x=\"53\" y=\"219.2\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">-5</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"110.8\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"56.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text></g><path d=\"M 60.0 51.7 L 460.0 268.3\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\na) What is the object's **displacement** during the interval 0 → 10 s?\n\nb) What is the **distance travelled** during the same interval?\n\n*Give the distance travelled from b) as your answer in metres.*",
    "answer": {
     "value": 50,
     "unit": "m",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0,
      "unit": "m"
     },
     {
      "del": "b",
      "value": 50,
      "unit": "m"
     }
    ],
    "solution": "The area under the graph corresponds to the displacement, but areas **below** the *x*-axis count as *negative* (the motion is in the opposite direction). We divide it into two triangles:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"140.0\" y1=\"30\" x2=\"140.0\" y2=\"290\"/><line x1=\"220.0\" y1=\"30\" x2=\"220.0\" y2=\"290\"/><line x1=\"300.0\" y1=\"30\" x2=\"300.0\" y2=\"290\"/><line x1=\"380.0\" y1=\"30\" x2=\"380.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"268.3\" x2=\"460\" y2=\"268.3\"/><line x1=\"60\" y1=\"214.2\" x2=\"460\" y2=\"214.2\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"105.8\" x2=\"460\" y2=\"105.8\"/><line x1=\"60\" y1=\"51.7\" x2=\"460\" y2=\"51.7\"/></g><path d=\"M 60.0 160.0 L 60.0 51.7 L 260.0 160.0 Z\" fill=\"rgba(200,50,74,0.18)\" stroke=\"none\"/><path d=\"M 260.0 160.0 L 460.0 268.3 L 460.0 160.0 Z\" fill=\"rgba(28,61,107,0.18)\" stroke=\"none\"/><line x1=\"60\" y1=\"160.0\" x2=\"468\" y2=\"160.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,156.0 476,160.0 468,164.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"154.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"140.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"220.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"300.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"380.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"273.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">-10</text><text x=\"53\" y=\"219.2\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">-5</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"110.8\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"53\" y=\"56.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text></g><path d=\"M 60.0 51.7 L 460.0 268.3\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\nBoth triangles have the base 5.0 s and the height 10 m/s in absolute value:\n$$\n|A_1| = |A_2| = \\frac{5.0 \\cdot 10}{2} = 25\\ \\mathrm{m}\n$$\n\n**a) Displacement**: count the areas with signs (negative below the *x*-axis):\n$$\n\\Delta s = A_1 + A_2 = +25 + (-25) = 0\\ \\mathrm{m}\n$$\n\nSo the object ends up at exactly the same position as it started from.\n\n**b) Distance travelled**: count all areas as positive:\n$$\ns = |A_1| + |A_2| = 25 + 25 = 50\\ \\mathrm{m}\n$$\n\n**Answer:** a) Displacement = 0 m. b) Distance = 50 m.\n\n**General conclusion:** A ball that is thrown straight up and caught at the same height is a typical example of the motion above: the physical *displacement* is zero, but the *distance* (up + down) is not zero. When you calculate energy or fuel consumption, it is often the distance that matters, not the displacement."
   },
   {
    "level": 3,
    "question": "A cyclist trains on a straight track according to the *v-t* graph below.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"134.1\" y1=\"30\" x2=\"134.1\" y2=\"290\"/><line x1=\"208.1\" y1=\"30\" x2=\"208.1\" y2=\"290\"/><line x1=\"282.2\" y1=\"30\" x2=\"282.2\" y2=\"290\"/><line x1=\"356.3\" y1=\"30\" x2=\"356.3\" y2=\"290\"/><line x1=\"430.4\" y1=\"30\" x2=\"430.4\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"252.9\" x2=\"460\" y2=\"252.9\"/><line x1=\"60\" y1=\"215.7\" x2=\"460\" y2=\"215.7\"/><line x1=\"60\" y1=\"178.6\" x2=\"460\" y2=\"178.6\"/><line x1=\"60\" y1=\"141.4\" x2=\"460\" y2=\"141.4\"/><line x1=\"60\" y1=\"104.3\" x2=\"460\" y2=\"104.3\"/><line x1=\"60\" y1=\"67.1\" x2=\"460\" y2=\"67.1\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"134.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"208.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"282.2\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"356.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"430.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">25</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"257.9\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"220.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"183.6\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"146.4\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"109.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"72.1\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">14</text></g><path d=\"M 60.0 290.0 L 134.1 141.4 L 282.2 141.4 L 356.3 67.1 L 430.4 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\na) Calculate the cyclist's **total displacement** during the motion.\n\nb) In which of the four intervals is the cyclist's acceleration **largest in absolute value**? Calculate its magnitude.\n\n*Give the total displacement from a) as your numerical answer in metres.*",
    "answer": {
     "value": 180,
     "unit": "m",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 180,
      "unit": "m",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 2.4,
      "unit": "m/s²",
      "etikett": "largest acceleration",
      "tol": 0.03,
      "ignoreSign": true
     }
    ],
    "solution": "**a) Total displacement**: the area under the whole *v-t* graph, divided into four parts:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"134.1\" y1=\"30\" x2=\"134.1\" y2=\"290\"/><line x1=\"208.1\" y1=\"30\" x2=\"208.1\" y2=\"290\"/><line x1=\"282.2\" y1=\"30\" x2=\"282.2\" y2=\"290\"/><line x1=\"356.3\" y1=\"30\" x2=\"356.3\" y2=\"290\"/><line x1=\"430.4\" y1=\"30\" x2=\"430.4\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"252.9\" x2=\"460\" y2=\"252.9\"/><line x1=\"60\" y1=\"215.7\" x2=\"460\" y2=\"215.7\"/><line x1=\"60\" y1=\"178.6\" x2=\"460\" y2=\"178.6\"/><line x1=\"60\" y1=\"141.4\" x2=\"460\" y2=\"141.4\"/><line x1=\"60\" y1=\"104.3\" x2=\"460\" y2=\"104.3\"/><line x1=\"60\" y1=\"67.1\" x2=\"460\" y2=\"67.1\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 134.1 141.4 L 134.1 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><path d=\"M 134.1 290.0 L 134.1 141.4 L 282.2 141.4 L 282.2 290.0 Z\" fill=\"rgba(28,61,107,0.12)\" stroke=\"none\"/><path d=\"M 282.2 290.0 L 282.2 141.4 L 356.3 67.1 L 356.3 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><path d=\"M 356.3 290.0 L 356.3 67.1 L 430.4 290.0 Z\" fill=\"rgba(28,61,107,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"134.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"208.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"282.2\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">15</text><text x=\"356.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">20</text><text x=\"430.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">25</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"257.9\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"220.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"183.6\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"146.4\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"109.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"72.1\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">14</text></g><path d=\"M 60.0 290.0 L 134.1 141.4 L 282.2 141.4 L 356.3 67.1 L 430.4 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\n- **A** (triangle, 0–5 s): $\\dfrac{5 \\cdot 8}{2} = 20$ m\n- **B** (rectangle, 5–15 s): $10 \\cdot 8 = 80$ m\n- **C** (trapezium, 15–20 s): $\\dfrac{(8 + 12) \\cdot 5}{2} = 50$ m\n- **D** (triangle, 20–25 s): $\\dfrac{5 \\cdot 12}{2} = 30$ m\n\n$$\n\\Delta s = 20 + 80 + 50 + 30 = 180\\ \\mathrm{m}\n$$\n\n**b) Acceleration in each interval** (the slope of the *v-t* graph):\n\n$$\n\\left[ \\begin{array}{l}\na_A = \\dfrac{8 - 0}{5} = +1.6\\ \\mathrm{m/s^2} \\\\\na_B = 0\\ \\mathrm{m/s^2} \\quad (\\text{constant velocity}) \\\\\na_C = \\dfrac{12 - 8}{5} = +0.8\\ \\mathrm{m/s^2} \\\\\na_D = \\dfrac{0 - 12}{5} = -2.4\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\nThe largest in absolute value is the **braking at the finish** (interval D):\n\n$$\n|a_D| = 2.4\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** a) The displacement is 180 m. b) The largest acceleration in absolute value is the braking at the finish, 2.4 m/s².\n\n**General conclusion:** Complex *v-t* graphs are handled by dividing them into standard geometric shapes (rectangles, triangles, trapeziums). The acceleration is the *slope* in each interval: it does not have to be the same throughout the motion."
   }
  ]
 },
 "fy1-2.6": {
  "kalla": "5320c79916",
  "data": [
   {
    "level": 1,
    "question": "An object has a constant acceleration according to the *a-t* graph below. How large is the change in velocity Δ*v* during the interval 0–5 s?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">a</tspan> (m/s²)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text></g><path d=\"M 60.0 134.0 L 345.7 134.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 15,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "The change in velocity corresponds to the **area under the graph** in an *a-t* graph. Here the area is a rectangle with base $\\Delta t$ and height *a*:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 60.0 134.0 L 345.7 134.0 L 345.7 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">a</tspan> (m/s²)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text></g><path d=\"M 60.0 134.0 L 345.7 134.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\n$$\n\\Delta v = a \\cdot \\Delta t\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\na = 3.0\\ \\mathrm{m/s^2} \\\\\n\\Delta t = 5.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\n\\Delta v = 3.0 \\cdot 5.0 = 15\\ \\mathrm{m/s}\n$$\n\n**Answer:** The velocity increases by 15 m/s."
   },
   {
    "level": 1,
    "question": "What does the **area** under the graph in an *a-t* graph correspond to?",
    "choices": [
     "The velocity",
     "The displacement",
     "The change in velocity Δ*v*",
     "The average acceleration"
    ],
    "correct": 2,
    "solution": "The area in an *a-t* graph is formed by acceleration ($\\mathrm{m/s^2}$) times time ($\\mathrm{s}$), which has the unit m/s, that is, a *velocity*, or more precisely the **change in velocity**.\n\nFormally: from $a = \\Delta v / \\Delta t$ it follows that $\\Delta v = a \\cdot \\Delta t$, which for a varying acceleration becomes the whole area under the curve.\n\n**Answer:** The change in velocity Δ*v*."
   },
   {
    "level": 2,
    "question": "An object has an initial velocity *v*₀ = 6.0 m/s and accelerates according to the *a-t* graph below. What is its final velocity at *t* = 7.0 s?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"110.0\" y1=\"30\" x2=\"110.0\" y2=\"290\"/><line x1=\"160.0\" y1=\"30\" x2=\"160.0\" y2=\"290\"/><line x1=\"210.0\" y1=\"30\" x2=\"210.0\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"310.0\" y1=\"30\" x2=\"310.0\" y2=\"290\"/><line x1=\"360.0\" y1=\"30\" x2=\"360.0\" y2=\"290\"/><line x1=\"410.0\" y1=\"30\" x2=\"410.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">a</tspan> (m/s²)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"110.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"160.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"210.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"310.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"360.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"410.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text></g><path d=\"M 60.0 82.0 L 210.0 82.0 L 210.0 290.0 L 410.0 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 18,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "The total change in velocity is the **area under the whole *a-t* graph**. Here only the first part (the rectangle between *t* = 0 and *t* = 3 s) contributes: the second part lies on the *x*-axis and has zero area:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"110.0\" y1=\"30\" x2=\"110.0\" y2=\"290\"/><line x1=\"160.0\" y1=\"30\" x2=\"160.0\" y2=\"290\"/><line x1=\"210.0\" y1=\"30\" x2=\"210.0\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"310.0\" y1=\"30\" x2=\"310.0\" y2=\"290\"/><line x1=\"360.0\" y1=\"30\" x2=\"360.0\" y2=\"290\"/><line x1=\"410.0\" y1=\"30\" x2=\"410.0\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 60.0 82.0 L 210.0 82.0 L 210.0 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">a</tspan> (m/s²)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"110.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"160.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"210.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"310.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"360.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"410.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text></g><path d=\"M 60.0 82.0 L 210.0 82.0 L 210.0 290.0 L 410.0 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\n**Part 1** (between 0 and 3.0 s, *a* = 4.0 m/s²):\n$$\n\\Delta v_1 = 4.0 \\cdot 3.0 = 12\\ \\mathrm{m/s}\n$$\n\n**Part 2** (between 3.0 s and 7.0 s, *a* = 0):\n$$\n\\Delta v_2 = 0 \\cdot 4.0 = 0\\ \\mathrm{m/s}\n$$\n\nFinal velocity:\n$$\nv = v_0 + \\Delta v_1 + \\Delta v_2 = 6.0 + 12 + 0 = 18\\ \\mathrm{m/s}\n$$\n\n**Answer:** 18 m/s.\n\n**General conclusion:** When the acceleration is zero, the velocity does not change: the object then moves with constant velocity (Newton's first law)."
   }
  ]
 },
 "fy1-2.7": {
  "kalla": "dbfa93d9e7",
  "data": [
   {
    "level": 1,
    "question": "A car rolls at 12 m/s and accelerates constantly at 2.5 m/s² for 6.0 seconds. How far does the car roll during this time? Use $s = v_0 t + \\dfrac{1}{2} a t^{2}$.",
    "answer": {
     "value": 117,
     "unit": "m",
     "tol": 0.02
    },
    "solution": "We substitute the values into the formula for distance with constant acceleration:\n\n$$\ns = v_0 \\cdot t + \\frac{a \\cdot t^{2}}{2}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 12\\ \\mathrm{m/s} \\\\\na = 2.5\\ \\mathrm{m/s^2} \\\\\nt = 6.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\ns = 12 \\cdot 6.0 + \\frac{2.5 \\cdot 6.0^{2}}{2} = 72 + \\frac{2.5 \\cdot 36}{2} = 72 + 45 = 117\\ \\mathrm{m}\n$$\n\n**Answer:** 117 m (rounded to 3 significant figures: 117 m)."
   },
   {
    "level": 1,
    "question": "A body starts from rest (*v*₀ = 0) and has a constant acceleration *a* = 1.5 m/s² for 4.0 seconds. How far does the body move?",
    "answer": {
     "value": 12,
     "unit": "m",
     "tol": 0.02
    },
    "solution": "Since *v*₀ = 0, the distance formula is simplified:\n\n$$\ns = \\frac{a \\cdot t^{2}}{2}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\na = 1.5\\ \\mathrm{m/s^2} \\\\\nt = 4.0\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\ns = \\frac{1.5 \\cdot 4.0^{2}}{2} = \\frac{1.5 \\cdot 16}{2} = \\frac{24}{2} = 12\\ \\mathrm{m}\n$$\n\n**Answer:** 12 m."
   },
   {
    "level": 1,
    "question": "A cyclist accelerates constantly from 4.0 m/s to 12 m/s. Calculate his average velocity during the acceleration using $v_m = (v_0 + v)/2$.",
    "answer": {
     "value": 8,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "At constant acceleration, the average velocity is the arithmetic mean of the initial and final velocities:\n\n$$\nv_\\mathrm{m} = \\frac{v_0 + v}{2}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 4.0\\ \\mathrm{m/s} \\\\\nv = 12\\ \\mathrm{m/s}\n\\end{array} \\right]\n$$\n\n$$\nv_\\mathrm{m} = \\frac{4.0 + 12}{2} = \\frac{16}{2} = 8.0\\ \\mathrm{m/s}\n$$\n\n**Answer:** 8.0 m/s.\n\n**General conclusion:** The simple formula $v_m = (v_0 + v)/2$ is valid **only** for **constant** acceleration: otherwise you have to calculate with integrals or the area in a *v-t* graph."
   },
   {
    "level": 2,
    "question": "You measure your reaction time with a ruler (see the example in the theory): a friend holds a ruler vertically, lets go without warning and you pinch your fingers together. The ruler has fallen 18.5 cm when you catch it. What is your reaction time? Use $g = 9.82\\ \\mathrm{m/s^2}$.",
    "answer": {
     "value": 0.194,
     "unit": "s",
     "tol": 0.03
    },
    "solution": "The ruler is in free fall from rest (*v*₀ = 0), so:\n\n$$\ns = \\frac{g \\cdot t^{2}}{2} \\quad\\Leftrightarrow\\quad t = \\sqrt{\\frac{2 s}{g}}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns = 18.5\\ \\mathrm{cm} = 0.185\\ \\mathrm{m} \\\\\ng \\approx 9.82\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\nt = \\sqrt{\\frac{2 \\cdot 0.185}{9.82}} = \\sqrt{0.0377\\ldots} \\approx 0.194\\ \\mathrm{s}\n$$\n\n**Answer:** The reaction time is about 0.19 s.\n\n**General conclusion:** A \"normal\" reaction time is around 0.15–0.25 s. Thinking and planning take longer (seconds), but a *reflex*, like catching a falling ruler, is much faster."
   },
   {
    "level": 2,
    "question": "A ball is thrown straight up with an initial velocity of 14 m/s. How **high** above the point of release does the ball rise? Use $g = 9.82\\ \\mathrm{m/s^2}$ and ignore air resistance.",
    "answer": {
     "value": 9.98,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "We take upwards as the positive direction. At the ball's highest point, *v* = 0.\n\n**Step 1: the time to the top** from $v = v_0 + a \\cdot t$ with $a = -g$:\n\n$$\nt = \\frac{v - v_0}{a} = \\frac{0 - 14}{-9.82} \\approx 1.426\\ \\mathrm{s}\n$$\n\n**Step 2: the height** from $s = v_0 t + \\dfrac{1}{2} a t^{2}$:\n\n$$\ns = 14 \\cdot 1.426 + \\frac{(-9.82) \\cdot 1.426^{2}}{2}\n= 19.97 - 9.99 \\approx 9.98\\ \\mathrm{m}\n$$\n\n**Answer:** The ball rises about 10.0 m above the point of release.\n\n**General conclusion:** The same result can be obtained more easily with Torricelli's equation (coming in the next section): $0 = v_0^{2} + 2 a s$ gives directly $s = v_0^{2}/(2g)$."
   },
   {
    "level": 2,
    "question": "A driver is driving at a constant velocity of 25 m/s (90 km/h). He sees a deer on the road and has to brake. His reaction time is 0.80 s, during which the car rolls at unchanged velocity. After that he brakes with a constant deceleration of 6.0 m/s² until the car stops.\n\na) How far does the car roll during the **reaction time**?\n\nb) How long is the **braking distance** (from the moment he presses the brake until the car stands still)?\n\nc) What is the total stopping distance?\n\n*Give the total stopping distance from c) as your answer in metres.*",
    "answer": {
     "value": 72,
     "unit": "m",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 20,
      "unit": "m"
     },
     {
      "del": "b",
      "value": 52,
      "unit": "m"
     },
     {
      "del": "c",
      "value": 72,
      "unit": "m"
     }
    ],
    "solution": "**a) Reaction distance**: constant velocity:\n\n$$\ns_1 = v_0 \\cdot t_\\text{reaction} = 25 \\cdot 0.80 = 20\\ \\mathrm{m}\n$$\n\n**b) Braking distance**: the car brakes from 25 m/s to 0 with *a* = −6.0 m/s². We first find the time:\n\n$$\nt = \\frac{v - v_0}{a} = \\frac{0 - 25}{-6.0} \\approx 4.17\\ \\mathrm{s}\n$$\n\nThen the distance:\n\n$$\ns_2 = v_0 t + \\frac{1}{2} a t^{2} = 25 \\cdot 4.17 + \\frac{(-6.0) \\cdot 4.17^{2}}{2}\n\\approx 104.2 - 52.1 = 52.1\\ \\mathrm{m}\n$$\n\n*Alternatively* (more elegantly) with the average velocity at constant acceleration:\n$$\nv_\\mathrm{m} = \\frac{v_0 + v}{2} = \\frac{25 + 0}{2} = 12.5\\ \\mathrm{m/s}\n$$\n$$\ns_2 = v_\\mathrm{m} \\cdot t = 12.5 \\cdot 4.17 \\approx 52\\ \\mathrm{m}\n$$\n\n**c) Total stopping distance:**\n\n$$\ns_\\text{tot} = s_1 + s_2 \\approx 20 + 52 = 72\\ \\mathrm{m}\n$$\n\n**Answer:** a) 20 m. b) 52 m. c) About 72 m.\n\n**General conclusion:** The reaction distance is **proportional to the speed** (linear), but the braking distance is **proportional to the square of the speed** ($s = v_0^{2}/(2|a|)$). If the velocity is doubled, the braking distance is *quadrupled*: that is why speed on country roads and motorways is such an important safety factor."
   },
   {
    "level": 3,
    "question": "A car travels at a constant velocity of 25 m/s (90 km/h) along a straight road. When the car passes a stationary police car at the roadside, the police immediately set off with a constant acceleration of 4.0 m/s² (in the same direction as the speeding car).\n\na) At what time (after the police started) has the police car caught up with the speeding car?\n\nb) What velocity does the police car have then? Give the answer in m/s.\n\n*Give the velocity of the police car when they meet (b) as your numerical answer.*",
    "answer": {
     "value": 50,
     "unit": "m/s",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 12.5,
      "unit": "s"
     },
     {
      "del": "b",
      "value": 50,
      "unit": "m/s"
     }
    ],
    "solution": "We set *t* = 0 at the moment the police start, and measure the positions of both the car and the police from the police car's starting position.\n\n**The car** moves at constant speed from the starting position:\n$$\ns_\\text{car}(t) = v_0 \\cdot t = 25\\, t\n$$\n\n**The police** start from rest and accelerate constantly:\n$$\ns_\\text{police}(t) = \\frac{a \\cdot t^{2}}{2} = \\frac{4.0 \\cdot t^{2}}{2} = 2.0\\, t^{2}\n$$\n\n**a) Meeting condition**: the police catch up with the car when $s_\\text{police} = s_\\text{car}$:\n\n$$\n2.0\\, t^{2} = 25\\, t\n$$\n\nSimplify by dividing both sides by *t* (we are looking for $t > 0$):\n\n$$\n2.0\\, t = 25 \\quad\\Leftrightarrow\\quad t = 12.5\\ \\mathrm{s}\n$$\n\n**b) The velocity of the police car when they meet**: use $v = a \\cdot t$ (since the police car's $v_0 = 0$):\n\n$$\nv_\\text{police} = a \\cdot t = 4.0 \\cdot 12.5 = 50\\ \\mathrm{m/s}\n$$\n\nThat is 180 km/h.\n\n**Answer:** a) The police catch up after 12.5 s. b) The police car then has a velocity of 50 m/s (180 km/h).\n\n**General conclusion:** Note that the police car's *final speed* when they meet is **twice** the car's speed. That is no coincidence: when a car with constant speed $v_0$ is caught by a car accelerating from rest, the meeting happens exactly when the police car's average velocity equals the car's speed. Since the police car has $v_0 = 0$ and its velocity increases the whole time, the average velocity is exactly half the final speed, so the final speed is $2 v_0$."
   }
  ]
 },
 "fy1-2.8": {
  "kalla": "3b8f29bb15",
  "data": [
   {
    "level": 1,
    "question": "When do you typically need to set up a **system of equations** with two equations in motion problems with constant acceleration?",
    "choices": [
     "When you calculate with SI units.",
     "When the velocity is negative.",
     "When the problem is about free fall.",
     "When you have **two unknown quantities** (for example the acceleration *a* and the time *t*) that both have to be determined from the given information."
    ],
    "correct": 3,
    "solution": "One equation can solve for **one** unknown variable. If the problem gives us enough information to work out two unknowns (for example both *a* and *t*), but we cannot directly isolate either of them, we must set up **two** equations that both contain the unknowns. The equations then form a system of equations that can be solved algebraically or with GeoGebra.\n\n**Answer:** When you have two unknowns that both have to be determined.\n\n**General conclusion:** The rule of thumb is: *one unknown requires one equation, two unknowns require two*. At a higher level it can be hard to see directly which equations to combine: then it pays to write down all the formulas for motion you know and see which ones contain only the variables you have or are looking for."
   },
   {
    "level": 2,
    "question": "A car drives at a constant velocity of 15 m/s and then starts to accelerate constantly. During the acceleration the car moves 400 m and then has a velocity of 28 m/s. Calculate **the car's acceleration** in m/s².\n\n*(Hint: this is exactly the problem from the theory. The time *t* is unknown: you need to set up two equations, and you can solve the system in GeoGebra or algebraically.)*",
    "answer": {
     "value": 0.6988,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "We have two unknowns, the acceleration *a* and the time *t*, and two known quantities (*s* and the final speed *v*). So we need two equations.\n\n**Equation 1** (distance with constant acceleration):\n$$\ns = v_0 t + \\frac{a t^{2}}{2} \\quad\\Rightarrow\\quad 400 = 15 t + \\frac{a t^{2}}{2}\n$$\n\n**Equation 2** (velocity with constant acceleration):\n$$\nv = v_0 + a t \\quad\\Rightarrow\\quad 28 = 15 + a t\n$$\n\nFrom equation 2: $a t = 13$, so $t = 13/a$. Substitute into equation 1:\n\n$$\n400 = 15 \\cdot \\frac{13}{a} + \\frac{a \\cdot (13/a)^{2}}{2} = \\frac{195}{a} + \\frac{169}{2 a} = \\frac{390 + 169}{2 a} = \\frac{559}{2 a}\n$$\n\nSolve for *a*:\n\n$$\na = \\frac{559}{2 \\cdot 400} = \\frac{559}{800} \\approx 0.699\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The acceleration is about 0.70 m/s².\n\n**General conclusion:** This system can be solved algebraically (as above), but in more complicated cases, for example where both equations are non-linear, it becomes easier to enter the equations in GeoGebra and let the program solve the system with the command **Solve**."
   }
  ]
 },
 "fy1-2.9": {
  "kalla": "3bf69fbeed",
  "data": [
   {
    "level": 1,
    "question": "A car rolls at 20 m/s and accelerates constantly at 3.0 m/s² over a distance of 50 m. Calculate the car's final velocity with Torricelli's equation.",
    "answer": {
     "value": 26.5,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "Torricelli's equation:\n\n$$\nv^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad v = \\sqrt{v_0^{2} + 2 a s}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 20\\ \\mathrm{m/s} \\\\\na = 3.0\\ \\mathrm{m/s^2} \\\\\ns = 50\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nv = \\sqrt{20^{2} + 2 \\cdot 3.0 \\cdot 50} = \\sqrt{400 + 300} = \\sqrt{700} \\approx 26.5\\ \\mathrm{m/s}\n$$\n\n**Answer:** The final velocity is 26.5 m/s (≈ 95 km/h)."
   },
   {
    "level": 1,
    "question": "A car at 25 m/s brakes with a constant deceleration of 6.0 m/s² until it stops. What **braking distance** is needed?",
    "answer": {
     "value": 52.1,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "We solve for the distance in Torricelli's equation. Since *v* = 0 (the car stops) and *a* = −6.0 m/s² (deceleration):\n\n$$\nv^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad s = \\frac{v^{2} - v_0^{2}}{2 a}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 25\\ \\mathrm{m/s} \\\\\nv = 0 \\\\\na = -6.0\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\ns = \\frac{0 - 25^{2}}{2 \\cdot (-6.0)} = \\frac{-625}{-12.0} \\approx 52.1\\ \\mathrm{m}\n$$\n\n**Answer:** The braking distance is about 52 m."
   },
   {
    "level": 1,
    "question": "A stone is released from rest and falls freely 12 m. What velocity does it have when it reaches the ground? Use $g = 9.82\\ \\mathrm{m/s^2}$.",
    "answer": {
     "value": 15.4,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "In free fall, *v*₀ = 0 and *a* = *g* (directed downwards, but we calculate with the absolute value since it is the magnitude of the speed we are looking for).\n\n$$\nv^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad v = \\sqrt{2 g s}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\ns = 12\\ \\mathrm{m} \\\\\ng \\approx 9.82\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\nv = \\sqrt{2 \\cdot 9.82 \\cdot 12} = \\sqrt{235.68} \\approx 15.4\\ \\mathrm{m/s}\n$$\n\n**Answer:** The stone hits the ground at about 15.4 m/s (≈ 55 km/h)."
   },
   {
    "level": 2,
    "question": "A car is driven at 90 km/h and wants to brake to 50 km/h. The constant deceleration is 4.0 m/s². What **distance** is needed?",
    "answer": {
     "value": 54,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "We use Torricelli's equation and solve for the distance, after converting the velocities to SI units.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s} \\\\\nv = 50\\ \\mathrm{km/h} = 50/3.6\\ \\mathrm{m/s} \\approx 13.89\\ \\mathrm{m/s} \\\\\na = -4.0\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\ns = \\frac{v^{2} - v_0^{2}}{2 a} = \\frac{13.89^{2} - 25^{2}}{2 \\cdot (-4.0)} = \\frac{192.9 - 625}{-8.0} = \\frac{-432.1}{-8.0} \\approx 54.0\\ \\mathrm{m}\n$$\n\n**Answer:** The car needs about 54 m for the braking."
   },
   {
    "level": 2,
    "question": "A ball is thrown straight up with an initial velocity of 18 m/s. How high **above the point of release** does the ball reach at most? Use Torricelli's equation and $g = 9.82\\ \\mathrm{m/s^2}$.",
    "answer": {
     "value": 16.5,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "At the ball's highest point, *v* = 0. Taking upwards as the positive direction, *a* = −*g*.\n\n$$\nv^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad s = \\frac{v^{2} - v_0^{2}}{2 a}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nv_0 = 18\\ \\mathrm{m/s} \\\\\nv = 0 \\\\\na = -g \\approx -9.82\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\ns = \\frac{0 - 18^{2}}{2 \\cdot (-9.82)} = \\frac{-324}{-19.64} \\approx 16.5\\ \\mathrm{m}\n$$\n\n**Answer:** The ball reaches about 16.5 m above the point of release.\n\n**General conclusion:** In general, for a ball thrown straight up:\n\n$$\nh_\\text{max} = \\frac{v_0^{2}}{2g}\n$$\n\nThe maximum height is proportional to the *square* of the initial speed. Doubling *v*₀ gives a maximum height *four times* as large."
   },
   {
    "level": 2,
    "question": "A ball is thrown straight up with an initial velocity of 15 m/s from a point of release 2.0 m above the ground. Ignore air resistance and use $g = 9.82\\ \\mathrm{m/s^2}$.\n\nWhat **speed** does the ball have when it hits the ground?\n\n*Hint: with Torricelli's equation you do not need to calculate the time. Watch out for signs: choose upwards as the positive direction and be careful about what *s* (the displacement) is when the ball hits the ground.*",
    "answer": {
     "value": 16.3,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "We choose **upwards as the positive direction** and let the point of release be the origin. Then:\n\n- $v_0 = +15$ m/s (upwards)\n- $a = -g \\approx -9.82$ m/s² (directed downwards)\n- The ground is 2.0 m **below** the origin, so the displacement from the point of release to the ground is $s = -2.0$ m (downwards = negative).\n\nTorricelli's equation:\n$$\nv^{2} - v_0^{2} = 2 a s\n$$\n\n$$\nv^{2} = v_0^{2} + 2 a s = 15^{2} + 2 \\cdot (-9.82) \\cdot (-2.0)\n$$\n\n$$\nv^{2} = 225 + 39.28 = 264.28\n$$\n\n$$\nv = \\pm \\sqrt{264.28} \\approx \\pm 16.3\\ \\mathrm{m/s}\n$$\n\nSince we are looking for the speed (the magnitude), the answer is 16.3 m/s. The sign is negative (the motion is downwards on impact), but that does not matter for **the magnitude of the speed**.\n\n**Answer:** The ball hits the ground at about 16.3 m/s.\n\n**General conclusion:** This is a typical trap: if you are careless with signs (for example setting $s = +2.0$ m for the position of the ground), you get the wrong answer. Torricelli's equation requires you to keep track of the direction of the displacement. Note also that the equation gave two roots ($\\pm 16.3$): the positive one corresponds to the speed *upwards* (mathematically valid, but not the physical situation here), and the negative one corresponds to the final velocity downwards."
   },
   {
    "level": 3,
    "question": "From the top of a 50 m high vertical cliff, a ball *A* is **released** (initial velocity 0). At the same moment another ball *B* is **thrown** straight up from the ground **directly below the cliff** with an initial velocity of 25 m/s.\n\nIgnore air resistance and use $g = 9.82\\ \\mathrm{m/s^2}$.\n\na) At what time do the balls meet?\n\nb) At what **height above the ground** does the meeting take place?\n\n*Give the height above the ground (b) as your numerical answer in metres.*",
    "answer": {
     "value": 30.4,
     "unit": "m",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2,
      "unit": "s",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 30.4,
      "unit": "m",
      "tol": 0.03
     }
    ],
    "solution": "We choose **upwards as the positive direction** and put the origin on the ground directly below the cliff. The position functions of both balls are given by $s(t) = s_0 + v_0 t - \\dfrac{1}{2} g t^{2}$.\n\n**Ball A** (released from $s_0 = 50$ m, $v_0 = 0$):\n$$\ns_A(t) = 50 - \\frac{g t^{2}}{2}\n$$\n\n**Ball B** (thrown up from $s_0 = 0$, $v_0 = +25$ m/s):\n$$\ns_B(t) = 25\\, t - \\frac{g t^{2}}{2}\n$$\n\n**a) Meeting condition**: the balls are at the same height when $s_A(t) = s_B(t)$:\n\n$$\n50 - \\frac{g t^{2}}{2} = 25\\, t - \\frac{g t^{2}}{2}\n$$\n\nThe term $\\dfrac{g t^{2}}{2}$ disappears from both sides: it is the **same** for both balls, since they have the same acceleration due to gravity! We get a simple linear relationship:\n\n$$\n50 = 25\\, t \\quad\\Leftrightarrow\\quad t = 2.0\\ \\mathrm{s}\n$$\n\n**b) The height at the meeting**: substitute *t* = 2.0 s into (for example) $s_A$:\n\n$$\ns_A(2.0) = 50 - \\frac{9.82 \\cdot 2.0^{2}}{2} = 50 - \\frac{9.82 \\cdot 4.0}{2} = 50 - 19.64 \\approx 30.4\\ \\mathrm{m}\n$$\n\n(Check: $s_B(2.0) = 25 \\cdot 2.0 - 19.64 = 50 - 19.64 = 30.4$ m ✓)\n\n**Answer:** a) They meet after 2.0 s. b) At about 30.4 m above the ground.\n\n**General conclusion:** The elegant point here is that the acceleration due to gravity *affects both balls equally* and therefore disappears from the meeting condition. This is fundamental to Galileo's classic experiment: *in free fall, all objects are \"weightless\" relative to each other*. The meeting time ($t = h/v_0$) depends only on the starting height and the ball's launch velocity, not on *g*. Gravity does, however, change **where** the meeting takes place: without gravity B would meet A at 50 m, but with gravity the meeting takes place 19.6 m lower."
   }
  ]
 },
 "fy1-3.1": {
  "kalla": "452c28b957",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.1-u1",
    "question": "Two forces $F_1 = 35\\ \\mathrm{N}$ and $F_2 = 18\\ \\mathrm{N}$ act on the same object and **in the same direction**. Calculate the resultant force.",
    "answer": {
     "value": 53,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Forces in the same direction are added (vector sum = scalar sum when the direction is shared):\n\n$$\nF_R = F_1 + F_2 = 35 + 18 = 53\\ \\mathrm{N}\n$$\n\n**Answer:** The resultant is 53 N in the same direction as $F_1$ and $F_2$."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.1-u2",
    "question": "Two forces $F_1 = 60\\ \\mathrm{N}$ and $F_2 = 25\\ \\mathrm{N}$ act on the same object but **in opposite directions**. How large is the resultant force?",
    "answer": {
     "value": 35,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "When the forces point in opposite directions, we subtract the smaller from the larger:\n\n$$\nF_R = F_1 - F_2 = 60 - 25 = 35\\ \\mathrm{N}\n$$\n\n**Answer:** The resultant is 35 N in the same direction as the largest force ($F_1$)."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.1-u3",
    "question": "What does **Newton's first law** (the law of inertia) mean?",
    "choices": [
     "That a force is always equal to the mass times the acceleration.",
     "That if the resultant force on an object is zero, it either stays at rest or stays in uniform motion (constant velocity).",
     "That for every force there is an equal but opposite force on another object.",
     "That all objects with mass attract each other with a gravitational force."
    ],
    "correct": 1,
    "solution": "Newton's first law says that an object does not change its motion if the resultant force is zero. This means that an object at rest stays at rest, and an object in uniform motion stays in uniform motion (same speed, same direction), if no (net) forces act.\n\n- Option A describes Newton's **second** law ($F = ma$).\n- Option C describes Newton's **third** law (action and reaction).\n- Option D is Newton's law of gravitation.\n\n**Answer:** Option B."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.1-u4",
    "question": "A hot-air balloon is acted on by two vertical forces according to the figure: the lift force $F_\\text{lift} = 8\\,400\\ \\mathrm{N}$ directed upwards and the gravitational force $F_G = 7\\,900\\ \\mathrm{N}$ directed downwards. Calculate the resultant force on the balloon.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 199.0 364.0\" style=\"max-width:199px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><circle cx=\"23\" cy=\"187\" r=\"3.5\" fill=\"#0f1620\"/><line x1=\"23\" y1=\"187\" x2=\"23.0\" y2=\"19.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"23.0,19.0 27.3,28.0 18.7,28.0\" fill=\"#c8324a\"/><text x=\"31.0\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">lift</tspan> = 8 400 N</text><line x1=\"23\" y1=\"187\" x2=\"23.0\" y2=\"345.0\" stroke=\"#1c3d6b\" stroke-width=\"2.6\"/><polygon points=\"23.0,345.0 18.7,336.0 27.3,336.0\" fill=\"#1c3d6b\"/><text x=\"31.0\" y=\"345.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">G</tspan> = 7 900 N</text></svg>",
    "answer": {
     "value": 500,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "The forces act along the same (vertical) line but in opposite directions. The resultant is the difference between them, directed the way the larger force points:\n\n$$\nF_R = F_\\text{lift} - F_G = 8\\,400 - 7\\,900 = 500\\ \\mathrm{N}\n$$\n\n**Answer:** The resultant is 500 N directed **upwards**, so the balloon accelerates upwards (it lifts off)."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.1-u5",
    "question": "A bus brakes suddenly and the passengers are \"thrown\" forwards in their seats. How is this best explained with Newton's first law?",
    "choices": [
     "A forward force hurls the passengers forwards when the bus brakes.",
     "The counterforce to the braking force according to Newton's third law acts on the passengers.",
     "The gravitational force on the passengers changes direction when the bus brakes.",
     "The passengers continue in their uniform motion forwards when the bus slows down: a force is needed to slow them down too."
    ],
    "correct": 3,
    "solution": "There is no force that \"throws\" the passengers forwards: on the contrary, the explanation is the **absence** of a sufficient braking force. According to Newton's first law, the passengers continue in their uniform motion (same speed, same direction) until a force changes it.\n\nWhen the bus brakes, the braking force acts on **the bus**, not directly on the passengers. The passengers therefore continue forwards at their old speed until the seat belt or the seat in front exerts the force that slows them down.\n\n- Option A describes a force that does not exist: a classic misconception.\n- Option B confuses Newton's third law: the counterforce to the braking force acts on the road surface, not on the passengers.\n- Option C is wrong: the gravitational force always points towards the centre of the Earth.\n\n**Answer:** Option D."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.1-u6",
    "question": "Two forces act perpendicular to each other on the same object according to the diagram below. Calculate the magnitude of the resultant.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 202.5 162.0\" style=\"max-width:203px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"11\" y=\"127\" width=\"24\" height=\"24\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"139\" x2=\"143.0\" y2=\"139.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"143.0,139.0 134.0,143.3 134.0,134.7\" fill=\"#c8324a\"/><text x=\"143.0\" y=\"121.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₁ = 12 N</text><line x1=\"23\" y1=\"139\" x2=\"23.0\" y2=\"19.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"23.0,19.0 27.3,28.0 18.7,28.0\" fill=\"#c8324a\"/><text x=\"31.0\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₂ = 16 N</text></svg>",
    "answer": {
     "value": 20,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Perpendicular forces form the two legs of a right-angled triangle: the resultant is the hypotenuse. Pythagoras' theorem:\n\n$$\nF_R = \\sqrt{F_1^{2} + F_2^{2}} = \\sqrt{12^{2} + 16^{2}} = \\sqrt{144 + 256} = \\sqrt{400} = 20\\ \\mathrm{N}\n$$\n\n**Answer:** The resultant is 20 N."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.1-u7",
    "question": "A force *F* pulls on a rope according to the figure below. How large is the force's **horizontal component** ($F_x$)?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 263.5 170.0\" style=\"max-width:264px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"9\" y=\"133\" width=\"28\" height=\"28\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"147\" x2=\"243.0\" y2=\"147\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 71.0 147.0 A 48 48 0 0 0 64.6 123.0\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"82.9\" y=\"131.0\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">30°</text><line x1=\"23\" y1=\"147\" x2=\"213.5\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"213.5,37.0 207.9,45.3 203.6,37.7\" fill=\"#c8324a\"/><text x=\"213.5\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan> = 80 N</text></svg>",
    "answer": {
     "value": 69.28,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The horizontal component is the leg adjacent to the angle 30°, and the force is the hypotenuse. We use cosine:\n\n$$\n\\cos 30^{\\circ} = \\frac{F_x}{80} \\quad\\Leftrightarrow\\quad F_x = 80 \\cdot \\cos 30^{\\circ} = 69.282\\ldots \\approx 69\\ \\mathrm{N}\n$$\n\n**Answer:** The horizontal component is 69 N.\n\n**General conclusion:** This is the formula for the \"useful\" pulling force. When you pull a sledge with a rope, for example, it is $F \\cos \\alpha$ that drives the sledge forwards, not the whole force $F$. The vertical component $F \\sin \\alpha$ lifts the sledge slightly (reducing the normal force and therefore the friction)."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.1-u8",
    "question": "Two snowmobiles pull a timber sledge with one rope each according to the figure (seen from above). Each rope is pulled with a force of 900 N, and the ropes form an angle of 25° with the direction of travel, one on each side. Calculate the resultant force on the sledge.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 250.4 226.1\" style=\"max-width:250px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"8\" y=\"98.0712871133259\" width=\"30\" height=\"30\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"113.0712871133259\" x2=\"203.0\" y2=\"113.0712871133259\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 71.0 113.1 A 48 48 0 0 0 66.5 92.8\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"83.5\" y=\"99.7\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">25°</text><line x1=\"23\" y1=\"113.0712871133259\" x2=\"186.1\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"186.1,37.0 179.8,44.7 176.1,36.9\" fill=\"#c8324a\"/><text x=\"186.1\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₁ = 900 N</text><line x1=\"23\" y1=\"113.0712871133259\" x2=\"203.0\" y2=\"113.0712871133259\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 71.0 113.1 A 48 48 0 0 1 66.5 133.4\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"83.5\" y=\"126.5\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">-25°</text><line x1=\"23\" y1=\"113.0712871133259\" x2=\"186.1\" y2=\"189.1\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"186.1,189.1 176.1,189.3 179.8,181.4\" fill=\"#c8324a\"/><text x=\"186.1\" y=\"207.1\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₂ = 900 N</text></svg>",
    "answer": {
     "value": 1631,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We split each force into components along the direction of travel and perpendicular to it.\n\n**Perpendicular to the direction of travel:** the components $F_1 \\sin 25^{\\circ}$ and $F_2 \\sin 25^{\\circ}$ point in opposite directions and are equally large. They **cancel each other out**.\n\n**Along the direction of travel:** the components work together:\n\n$$\nF_R = F_1 \\cos 25^{\\circ} + F_2 \\cos 25^{\\circ}\n$$\n\n$$\nF_R = 900 \\cdot \\cos 25^{\\circ} + 900 \\cdot \\cos 25^{\\circ} = 1\\,631.35\\ldots\\ \\mathrm{N} \\approx 1.6\\ \\mathrm{kN}\n$$\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 427.5 226.1\" style=\"max-width:428px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"8\" y=\"98.0712871133259\" width=\"30\" height=\"30\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"113.0712871133259\" x2=\"186.1\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"186.1,37.0 179.8,44.7 176.1,36.9\" fill=\"#c8324a\"/><text x=\"186.1\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₁</text><line x1=\"23\" y1=\"113.0712871133259\" x2=\"186.1\" y2=\"189.1\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"186.1,189.1 176.1,189.3 179.8,181.4\" fill=\"#c8324a\"/><text x=\"186.1\" y=\"207.1\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₂</text><line x1=\"23\" y1=\"113.0712871133259\" x2=\"349.0\" y2=\"113.1\" stroke=\"#1c3d6b\" stroke-width=\"2.6\" stroke-dasharray=\"6 4\"/><polygon points=\"349.0,113.1 340.0,117.4 340.0,108.7\" fill=\"#1c3d6b\"/><text x=\"349.0\" y=\"95.1\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">R</tspan> = ≈ 1.6 kN</text></svg>\n\n**Answer:** The resultant is 1.6 kN directed straight forwards in the direction of travel.\n\n**General conclusion:** With symmetric pulling ($\\pm\\alpha$ around the direction of travel), the resultant is always $2F\\cos\\alpha$ straight forwards: the sideways components cancel each other out. The larger the angle, the more force is \"wasted\" sideways."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.1-u9",
    "question": "A person pushes a lawnmower by pushing along the handle with a force of 90 N. The handle slopes at 40° to the ground, so the force is directed obliquely downwards and forwards according to the figure. How large is the component that presses the lawnmower **against the ground**?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 231.0 188.6\" style=\"max-width:231px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"8\" y=\"8\" width=\"30\" height=\"30\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"23\" x2=\"223.0\" y2=\"23\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 71.0 23.0 A 48 48 0 0 1 59.8 53.9\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"81.3\" y=\"44.2\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">40°</text><line x1=\"23\" y1=\"23\" x2=\"176.2\" y2=\"151.6\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"176.2,151.6 166.5,149.1 172.1,142.4\" fill=\"#c8324a\"/><text x=\"176.2\" y=\"169.6\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan> = 90 N</text></svg>",
    "answer": {
     "value": 57.85,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The force forms an angle of 40° with the ground. The vertical component is the leg opposite the angle, and the force is the hypotenuse. We use sine:\n\n$$\n\\sin 40^{\\circ} = \\frac{F_y}{90} \\quad\\Leftrightarrow\\quad F_y = 90 \\cdot \\sin 40^{\\circ} = 57.850\\ldots \\approx 58\\ \\mathrm{N}\n$$\n\n**Answer:** 58 N presses the lawnmower against the ground.\n\n**General conclusion:** This is the difference between **pushing** and **pulling** an object with a slanted handle: when you push, $F \\sin \\alpha$ presses the object against the ground (increasing the normal force and therefore the friction), but when you pull, the same component instead lifts the object (reducing the friction). That is why it is easier to pull a sledge than to push it."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.1-u10",
    "question": "Three horizontal forces act on a box lying on a frictionless floor. The box is in **equilibrium of forces** (it stands completely still). Calculate the magnitude of the force $F_3$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 404.8 236.0\" style=\"max-width:405px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"#8a8579\" stroke-width=\"1.2\" fill=\"none\"><line x1=\"40\" y1=\"62\" x2=\"40\" y2=\"18\"/><line x1=\"18\" y1=\"40\" x2=\"62\" y2=\"40\"/></g><polygon points=\"37,24 40,16 43,24\" fill=\"#8a8579\"/><polygon points=\"56,37 64,40 56,43\" fill=\"#8a8579\"/><polygon points=\"37,56 40,64 43,56\" fill=\"#8a8579\"/><polygon points=\"24,37 16,40 24,43\" fill=\"#8a8579\"/><g font-size=\"11\" fill=\"#8a8579\" font-family=\"Poppins,sans-serif\"><text x=\"40\" y=\"12\" text-anchor=\"middle\">N</text><text x=\"71\" y=\"44\">E</text><text x=\"40\" y=\"75\" text-anchor=\"middle\">S</text><text x=\"10\" y=\"44\" text-anchor=\"end\">W</text></g><rect x=\"183.3171648338891\" y=\"97\" width=\"24\" height=\"24\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"195.3171648338891\" y1=\"109\" x2=\"345.3\" y2=\"109.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"345.3,109.0 336.3,113.3 336.3,104.7\" fill=\"#c8324a\"/><text x=\"345.3\" y=\"91.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₁ = 50 N</text><line x1=\"195.3171648338891\" y1=\"109\" x2=\"195.3\" y2=\"19.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"195.3,19.0 199.7,28.0 191.0,28.0\" fill=\"#c8324a\"/><text x=\"203.3\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₂ = 30 N</text><line x1=\"195.3171648338891\" y1=\"109\" x2=\"45.3\" y2=\"199.0\" stroke=\"#1c3d6b\" stroke-width=\"2.6\" stroke-dasharray=\"6 4\"/><polygon points=\"45.3,199.0 50.7,190.7 55.2,198.1\" fill=\"#1c3d6b\"/><text x=\"45.3\" y=\"217.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan>₃ = ?</text></svg>",
    "answer": {
     "value": 58.31,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "For the box to stand still, the resultant force must be zero. So $F_3$ must counteract the resultant $F_{12}$ of $F_1$ and $F_2$. It must be equally large and opposite.\n\n$F_1$ (east) and $F_2$ (north) are perpendicular, so the resultant is given by Pythagoras' theorem:\n\n$$\nF_{12} = \\sqrt{F_1^{2} + F_2^{2}} = \\sqrt{50^{2} + 30^{2}} = \\sqrt{2\\,500 + 900} = \\sqrt{3\\,400}\n$$\n\n$$\nF_3 = F_{12} = \\sqrt{3\\,400} = 58.309\\ldots \\approx 58\\ \\mathrm{N}\n$$\n\n$F_3$ is directed exactly opposite to $F_{12}$, that is, towards the south-west, about $31^{\\circ}$ south of due west (the angle $\\alpha$ with $\\tan \\alpha = \\dfrac{30}{50}$).\n\n**Answer:** 58 N, directed towards the south-west.\n\n**General conclusion:** In equilibrium of forces with three or more forces, we can always find the unknown force by working out the resultant of the known ones, and then choosing $F_\\text{unknown}$ to be equally large and opposite. Geometrically, three balancing forces form a closed triangle."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.1-u11",
    "question": "A car has got stuck in the mud. The driver ties a rope tightly between the car and a tree, and then pushes **at the middle of the rope, perpendicular to the direction of the rope**, with a force of 300 N. The rope then bends 5.0° at the midpoint according to the figure (seen from above). How large is the force with which the rope pulls on the car?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 540 200\" style=\"max-width:540px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><circle cx=\"48\" cy=\"70\" r=\"26\" fill=\"rgba(90,125,90,0.28)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><circle cx=\"48\" cy=\"70\" r=\"4\" fill=\"#0f1620\"/><text x=\"48\" y=\"114\" text-anchor=\"middle\" font-size=\"12\" fill=\"#0f1620\">tree</text><rect x=\"452\" y=\"42\" width=\"64\" height=\"56\" rx=\"10\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"468\" y1=\"48\" x2=\"468\" y2=\"92\" stroke=\"#0f1620\" stroke-width=\"1.2\"/><line x1=\"500\" y1=\"48\" x2=\"500\" y2=\"92\" stroke=\"#0f1620\" stroke-width=\"1.2\"/><text x=\"484\" y=\"114\" text-anchor=\"middle\" font-size=\"12\" fill=\"#0f1620\">car</text><line x1=\"74\" y1=\"70\" x2=\"452\" y2=\"70\" stroke=\"#8a8579\" stroke-width=\"1.3\" stroke-dasharray=\"6 5\"/><polyline points=\"74,70 263,120 452,70\" fill=\"none\" stroke=\"#0f1620\" stroke-width=\"2.2\"/><path d=\"M 134 70 A 60 60 0 0 1 132 85.3\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"178\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"#8a8579\" dominant-baseline=\"middle\">5.0°</text><line x1=\"263\" y1=\"120\" x2=\"263\" y2=\"161\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"263,168 258,157 268,157\" fill=\"#c8324a\"/><text x=\"275\" y=\"164\" text-anchor=\"start\" font-size=\"14\" fill=\"#c8324a\"><tspan font-style=\"italic\">F</tspan> = 300 N</text></svg>\n\n*The angle is exaggerated in the figure for clarity.*",
    "answer": {
     "value": 1721,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "Consider the midpoint of the rope. Three forces act there: the tension $F_S$ along the rope towards the tree, the tension $F_S$ along the rope towards the car, and the pushing force $F = 300\\ \\mathrm{N}$ perpendicular to the original direction of the rope. The midpoint is in equilibrium.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 451.0 139.4\" style=\"max-width:451px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><circle cx=\"225.48893961834912\" cy=\"54.43114854953173\" r=\"3.5\" fill=\"#0f1620\"/><line x1=\"225.48893961834912\" y1=\"54.43114854953173\" x2=\"26.3\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"26.3,37.0 35.6,33.5 34.8,42.1\" fill=\"#c8324a\"/><text x=\"26.3\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">S</tspan></text><line x1=\"225.48893961834912\" y1=\"54.43114854953173\" x2=\"424.7\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"424.7,37.0 416.1,42.1 415.4,33.5\" fill=\"#c8324a\"/><text x=\"424.7\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">S</tspan></text><line x1=\"225.48893961834912\" y1=\"54.43114854953173\" x2=\"225.5\" y2=\"120.4\" stroke=\"#1c3d6b\" stroke-width=\"2.6\"/><polygon points=\"225.5,120.4 221.2,111.4 229.8,111.4\" fill=\"#1c3d6b\"/><text x=\"233.5\" y=\"120.4\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan> = 300 N</text></svg>\n\nEach tension forms an angle of only 5.0° with the original line of the rope. The components **along** the line of the rope cancel each other out (they point in opposite directions). The components **perpendicular** to the line of the rope must together balance $F$:\n\n$$\n2 \\cdot F_S \\cdot \\sin 5.0^{\\circ} = F\n\\quad\\Leftrightarrow\\quad\nF_S = \\frac{F}{2 \\cdot \\sin 5.0^{\\circ}}\n$$\n\n$$\nF_S = \\frac{300}{2 \\cdot \\sin 5.0^{\\circ}} = 1\\,721.05\\ldots\\ \\mathrm{N} \\approx 1.7\\ \\mathrm{kN}\n$$\n\n**Answer:** The rope pulls on the car with 1.7 kN.\n\n**General conclusion:** The rope works as a **force multiplier**: a moderate force of 300 N is multiplied almost 6 times. The smaller the angle, the larger the tension becomes ($F_S \\to \\infty$ when $\\alpha \\to 0$). That is why the trick works so well on an almost straight rope, and why you can never pull a washing line completely straight when something is hanging on it."
   }
  ]
 },
 "fy1-3.2": {
  "kalla": "e0ff317ba0",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.2-u1",
    "question": "A resultant force of 24 N acts on an object with a mass of 6.0 kg. What acceleration does the object get?",
    "answer": {
     "value": 4,
     "unit": "m/s²",
     "tol": 0.02
    },
    "solution": "We solve for the acceleration in Newton's second law:\n\n$$\nF_R = m \\cdot a \\quad\\Leftrightarrow\\quad a = \\frac{F_R}{m}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nF_R = 24\\ \\mathrm{N} \\\\\nm = 6.0\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{24}{6.0} = 4.0\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** 4.0 m/s²."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.2-u2",
    "question": "An object with a mass of 1.5 kg accelerates at 8.0 m/s². What is the resultant force on the object?",
    "answer": {
     "value": 12,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Direct substitution into Newton's second law:\n\n$$\nF_R = m \\cdot a\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 1.5\\ \\mathrm{kg} \\\\\na = 8.0\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\nF_R = 1.5 \\cdot 8.0 = 12\\ \\mathrm{N}\n$$\n\n**Answer:** 12 N."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.2-u3",
    "question": "A force of 45 N accelerates an object at 3.0 m/s². What is the object's mass?",
    "answer": {
     "value": 15,
     "unit": "kg",
     "tol": 0.02
    },
    "solution": "Solve for the mass in Newton's second law:\n\n$$\nF_R = m \\cdot a \\quad\\Leftrightarrow\\quad m = \\frac{F_R}{a}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nF_R = 45\\ \\mathrm{N} \\\\\na = 3.0\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\nm = \\frac{45}{3.0} = 15\\ \\mathrm{kg}\n$$\n\n**Answer:** 15 kg."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.2-u4",
    "question": "A freight train has a mass of $4.0 \\cdot 10^{6}\\ \\mathrm{kg}$. The pulling force of the locomotive gives a resultant force of $3.2 \\cdot 10^{5}\\ \\mathrm{N}$ on the train. What acceleration does the train get?",
    "answer": {
     "value": 0.08,
     "unit": "m/s²",
     "tol": 0.02
    },
    "solution": "Newton's second law solved for the acceleration:\n\n$$\na = \\frac{F_R}{m} = \\frac{3.2 \\cdot 10^{5}}{4.0 \\cdot 10^{6}} = 0.080\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** 0.080 m/s².\n\n**General conclusion:** Despite a pulling force of 320 kN, the acceleration is small: the mass in the denominator is enormous. With this acceleration it takes the train over five minutes to reach 90 km/h. That is why freight trains need very long distances to get up to speed (and just as long to brake)."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.2-u5",
    "question": "During a serve, the racket acts on a tennis ball with a mass of 58 g with an average force of 130 N. What acceleration does the ball get during the hit?",
    "answer": {
     "value": 2241,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "The mass must first be converted to the SI unit kilogram:\n\n$$\n\\left[ \\begin{array}{l}\nm = 58\\ \\mathrm{g} = 0.058\\ \\mathrm{kg} \\\\\nF_R = 130\\ \\mathrm{N}\n\\end{array} \\right]\n$$\n\nNewton's second law:\n\n$$\na = \\frac{F_R}{m} = \\frac{130}{0.058} = 2\\,241.379\\ldots\\ \\mathrm{m/s^2} \\approx 2\\,200\\ \\mathrm{m/s^2}\n$$\n\nThe mass has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** 2 200 m/s²\n\nThat is more than 200 times the acceleration due to gravity. Light objects can get enormous accelerations even from moderate forces."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.2-u6",
    "question": "An empty shopping trolley gets an acceleration of 2.0 m/s² when it is pushed with the force *F*. What acceleration does a trolley **twice as heavy** get if it is pushed with the **same** force *F*?",
    "choices": [
     "4.0 m/s²",
     "2.0 m/s²",
     "1.0 m/s²",
     "0.50 m/s²"
    ],
    "correct": 2,
    "solution": "According to Newton's second law, $a = \\dfrac{F_R}{m}$. With an unchanged force, the acceleration is **inversely proportional** to the mass. For the empty trolley\n\n$$\na_1 = \\frac{F}{m} = 2.0\\ \\mathrm{m/s^2}\n$$\n\nThe heavy trolley has the mass $2 \\cdot m$ but the same force:\n\n$$\na_2 = \\frac{F}{2 \\cdot m} = \\frac{1}{2} \\cdot \\frac{F}{m}\n$$\n\n$$\na_2 = \\frac{2.0}{2} = 1.0\\ \\mathrm{m/s^2}\n$$\n\nSo double the mass gives half the acceleration.\n\n**Answer:** Option C (1.0 m/s²)."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.2-u7",
    "question": "A box with a mass of 8.0 kg is pulled along a floor with a force of 50 N. A frictional force of 18 N acts between the box and the floor in the opposite direction. What acceleration does the box get?",
    "answer": {
     "value": 4,
     "unit": "m/s²",
     "tol": 0.02
    },
    "solution": "The resultant force is the difference between the pulling force and the friction:\n\n$$\nF_R = F_\\text{drag} - F_f = 50 - 18 = 32\\ \\mathrm{N}\n$$\n\nNewton's second law gives:\n\n$$\na = \\frac{F_R}{m} = \\frac{32}{8.0} = 4.0\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The box's acceleration is 4.0 m/s²."
   },
   {
    "level": 2,
    "question": "A car with a mass of 1 200 kg accelerates from 0 to 90 km/h in 12 seconds. Calculate the **average** resultant force on the car during the acceleration.",
    "penna": "ov-fy1-3.2-u8",
    "answer": {
     "value": 2500,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We first work out the acceleration in SI units, and then substitute into Newton's second law.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 1\\,200\\ \\mathrm{kg} \\\\\n\\Delta v = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s} \\\\\n\\Delta t = 12\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nAcceleration:\n$$\na = \\frac{\\Delta v}{\\Delta t} = \\frac{25}{12} = 2.083\\ldots\\ \\mathrm{m/s^2}\n$$\n\nResultant force:\n$$\nF_R = m \\cdot a = 1\\,200 \\cdot 2.083\\ldots = 2\\,500\\ \\mathrm{N} = 2.5\\ \\mathrm{kN}\n$$\n\n**Answer:** 2.5 kN."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.2-u9",
    "question": "The graph shows the velocity of a motorboat with a mass of 750 kg that accelerates from rest. Calculate the resultant force on the boat during the first 8.0 seconds.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"126.7\" y1=\"30\" x2=\"126.7\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"393.3\" y1=\"30\" x2=\"393.3\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"126.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"393.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">12</text></g><path d=\"M 60.0 290.0 L 326.7 73.3 L 460.0 73.3\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 937.5,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The acceleration is the **slope** of the graph during the acceleration phase. We read from the grid: the velocity increases from 0 to 10 m/s in 8.0 s.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"126.7\" y1=\"30\" x2=\"126.7\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"260.0\" y1=\"30\" x2=\"260.0\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"393.3\" y1=\"30\" x2=\"393.3\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">v</tspan> (m/s)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"126.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"260.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"393.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">12</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">12</text></g><path d=\"M 60.0 290.0 L 326.7 73.3 L 460.0 73.3\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><path d=\"M 326.7 290.0 L 326.7 73.3\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/><path d=\"M 60.0 290.0 L 326.7 290.0\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\" stroke-dasharray=\"5 4\"/></svg>\n\n$$\na = \\frac{\\Delta v}{\\Delta t} = \\frac{10}{8.0} = 1.25\\ \\mathrm{m/s^2}\n$$\n\nNewton's second law gives the force:\n\n$$\nF_R = m \\cdot a = 750 \\cdot 1.25 = 937.5\\ \\mathrm{N} \\approx 940\\ \\mathrm{N}\n$$\n\nThe time $8.0\\ \\mathrm{s}$ has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** 940 N.\n\n**General conclusion:** After $t = 8.0\\ \\mathrm{s}$ the graph is horizontal: the velocity is constant and the resultant force is therefore **zero** (the engine's driving force exactly balances the resistance of the water). A resultant force is needed to *change* the velocity, not to *keep* it."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.2-u10",
    "question": "A dolphin with a mass of 150 kg slows down from 12 m/s to 7.5 m/s in 2.3 s to join a playmate. How large is the average resultant braking force on the dolphin? (The gravitational force is balanced by the buoyant force of the water.)",
    "answer": {
     "value": 293.5,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "First the deceleration, then Newton's second law.\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 150\\ \\mathrm{kg} \\\\\n\\Delta v = 12 - 7.5 = 4.5\\ \\mathrm{m/s} \\\\\n\\Delta t = 2.3\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{\\Delta v}{\\Delta t} = \\frac{4.5}{2.3} = 1.956\\ldots\\ \\mathrm{m/s^2}\n$$\n\n$$\nF_R = m \\cdot a = 150 \\cdot 1.956\\ldots = 293.478\\ldots\\ \\mathrm{N} \\approx 290\\ \\mathrm{N}\n$$\n\nThe time $2.3\\ \\mathrm{s}$ has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** 290 N, directed backwards, opposite to the direction of motion (braking)."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.2-u11",
    "question": "Two boxes, A (mass 3.0 kg) and B (mass 2.0 kg), are connected by a light, inextensible string and lie on a frictionless table. A horizontal force $F = 15\\ \\mathrm{N}$ pulls on box A so that the whole system slides away with B in tow. The string runs between them and therefore pulls B forwards with a tension $F_\\mathrm{S}$.\n\na) Calculate the common acceleration of the system.\n\nb) Calculate the **tension** $F_\\mathrm{S}$ in the string.\n\n*Give the tension (b) as your numerical answer in N.*",
    "answer": {
     "value": 6,
     "unit": "N",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 3,
      "unit": "m/s²"
     },
     {
      "del": "b",
      "value": 6,
      "unit": "N",
      "tol": 0.03
     }
    ],
    "solution": "**a)** Both boxes move as one system with the total mass $m_A + m_B$. The only external horizontal force is $F = 15\\ \\mathrm{N}$ (the tension in the string is internal):\n\n$$\na = \\frac{F}{m_A + m_B} = \\frac{15}{3.0 + 2.0} = \\frac{15}{5.0} = 3.0\\ \\mathrm{m/s^2}\n$$\n\n**b)** The tension $F_\\mathrm{S}$ is the only horizontal force on box B. Newton's second law on box B alone:\n\n$$\nF_\\mathrm{S} = m_B \\cdot a = 2.0 \\cdot 3.0 = 6.0\\ \\mathrm{N}\n$$\n\n**Answer:** a) The acceleration is 3.0 m/s². b) The tension is 6.0 N.\n\n**General conclusion:** When several bodies are connected, they have the same acceleration but *different net forces*: each body has its own Newton's second law equation. The trick is to choose a suitable **part of the system** (often the lighter of the two) where the tension is the only unknown horizontal force."
   },
   {
    "level": 3,
    "question": "A car with a mass of 1 300 kg tows a caravan with a mass of 900 kg according to the figure. The tow rope can withstand a tension of at most 1 100 N before it breaks.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 540 130\" style=\"max-width:540px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"20\" y1=\"100\" x2=\"520\" y2=\"100\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"32\" y1=\"100\" x2=\"26\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"72\" y1=\"100\" x2=\"66\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"100\" x2=\"106\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"152\" y1=\"100\" x2=\"146\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"192\" y1=\"100\" x2=\"186\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"100\" x2=\"226\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"272\" y1=\"100\" x2=\"266\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"312\" y1=\"100\" x2=\"306\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"352\" y1=\"100\" x2=\"346\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"392\" y1=\"100\" x2=\"386\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"432\" y1=\"100\" x2=\"426\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"472\" y1=\"100\" x2=\"466\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"512\" y1=\"100\" x2=\"506\" y2=\"108\" stroke=\"#0f1620\" stroke-width=\"1\"/><rect x=\"40\" y=\"40\" width=\"130\" height=\"42\" rx=\"4\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><text x=\"105\" y=\"65\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">900 kg</text><text x=\"105\" y=\"32\" text-anchor=\"middle\" font-size=\"12\" fill=\"#8a8579\">caravan</text><circle cx=\"105\" cy=\"91\" r=\"9\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"170\" y1=\"62\" x2=\"240\" y2=\"62\" stroke=\"#0f1620\" stroke-width=\"2\"/><text x=\"205\" y=\"50\" text-anchor=\"middle\" font-size=\"12\" fill=\"#8a8579\">tow rope</text><rect x=\"240\" y=\"48\" width=\"150\" height=\"34\" rx=\"6\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><path d=\"M 268 48 L 276 30 L 340 30 L 348 48\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><text x=\"315\" y=\"68\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1 300 kg</text><text x=\"315\" y=\"22\" text-anchor=\"middle\" font-size=\"12\" fill=\"#8a8579\">car</text><circle cx=\"270\" cy=\"91\" r=\"9\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><circle cx=\"360\" cy=\"91\" r=\"9\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"398\" y1=\"62\" x2=\"463\" y2=\"62\" stroke=\"#c8324a\" stroke-width=\"2.4\" stroke-dasharray=\"6 4\"/><polygon points=\"470,62 459,57 459,67\" fill=\"#c8324a\"/><text x=\"478\" y=\"66\" text-anchor=\"start\" font-size=\"14\" fill=\"#c8324a\" font-style=\"italic\">F</text></svg>\n\na) What is the largest acceleration the car and caravan can have without the rope breaking?\n\nb) How large is the car's driving force *F* at exactly that acceleration? (Ignore air resistance and rolling resistance.)\n\n*Give the driving force (b) as your numerical answer in N.*",
    "penna": "ov-fy1-3.2-u12",
    "answer": {
     "value": 2689,
     "unit": "N",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.22,
      "unit": "m/s²",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 2689,
      "unit": "N",
      "tol": 0.03
     }
    ],
    "solution": "**a) The rope only pulls the caravan.** The key insight is that the tension in the rope is the only horizontal force on **the caravan**: so it is the caravan's mass (not the mass of the whole combination) that decides how large a force the rope must transfer:\n\n$$\nF_\\mathrm{S} = m_\\text{caravan} \\cdot a\n\\quad\\Leftrightarrow\\quad\na = \\frac{F_\\mathrm{S}}{m_\\text{caravan}}\n$$\n\nThe acceleration is largest when the rope pulls as hard as it can withstand:\n\n$$\n\\left[ \\begin{array}{l}\nF_\\mathrm{S} = 1\\,100\\ \\mathrm{N} \\\\\nm_\\text{caravan} = 900\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{1\\,100}{900} = 1.222\\ldots\\ \\mathrm{m/s^2} \\approx 1.2\\ \\mathrm{m/s^2}\n$$\n\n**b) The driving force accelerates the whole combination.** Newton's second law on the system car + caravan (the force in the rope is internal):\n\n$$\nF = (m_\\text{car} + m_\\text{caravan}) \\cdot a = (1\\,300 + 900) \\cdot 1.222\\ldots\n$$\n\n$$\nF = 2\\,688.8\\ldots\\ \\mathrm{N} \\approx 2\\,700\\ \\mathrm{N} = 2.7\\ \\mathrm{kN}\n$$\n\nThe acceleration is used unrounded, and the answer is rounded to two significant figures as in a).\n\n**Answer:** a) 1.2 m/s². b) 2.7 kN.\n\n**General conclusion:** The same technique as in the previous exercise: switch between **the whole system** (for the driving force) and **a part of it** (for the force in the rope). Note that the car on its own could have withstood a much larger acceleration: it is the weakest link, the tow rope, that sets the limit, and its load is decided solely by the caravan's mass."
   }
  ]
 },
 "fy1-3.3": {
  "kalla": "422c8f4abe",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.3-u1",
    "question": "What does **Newton's third law** (the law of action and reaction) mean?",
    "choices": [
     "A force is mass times acceleration.",
     "Two forces that act on the same object and keep it in equilibrium are equally large and opposite.",
     "For every force that object A exerts on object B, there is an equally large and opposite force that B exerts on A.",
     "An object stays at rest if the resultant force is zero."
    ],
    "correct": 2,
    "solution": "Newton's third law says that forces always appear in **pairs** between *two different objects*. If A pushes on B with the force $F$, then B pushes back on A with the force $-F$ (equally large, opposite direction, same type of force).\n\nIt is important not to confuse counterforces with equilibrium forces:\n- **Counterforces**: act on *two different* objects (Newton's third law).\n- **Equilibrium forces**: act on *the same* object and keep it still (Newton's first law).\n\n**Answer:** Option C."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.3-u2",
    "question": "A weight rests on a table. Two forces act on the weight: the gravitational force $F_G$ downwards and the normal force $F_N$ from the table upwards. Are these two forces **counterforces according to Newton's third law**?",
    "choices": [
     "Yes, they are equally large and opposite: that is the definition of counterforces.",
     "No, they act on the same object (the weight): they are equilibrium forces, not counterforces.",
     "Yes, but only if the weight is completely still.",
     "No, because the normal force can be smaller than the gravitational force."
    ],
    "correct": 1,
    "solution": "This is a classic misconception. The gravitational force and the normal force on the weight are both forces acting on **the same object** (the weight). They are therefore **equilibrium forces** according to Newton's first law: they happen to be equally large and opposite *because the weight is in equilibrium*, not because they are counterforces.\n\nThe **counterforce** to the gravitational force (which is the Earth's pull on the weight) is the weight's pull on the Earth (an equally large gravitational force from the weight acting upwards on the Earth, as Newton's third law predicts, even though the effect on the Earth is negligible).\n\nThe **counterforce** to the normal force (the table pushes the weight up) is the weight's push on the table (the weight pushes the table down with the same force, which you can feel when you hold something heavy).\n\n**Answer:** Option B."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.3-u3",
    "question": "A swimmer takes a stroke and moves her hand backwards through the water. Which force drives the swimmer forwards?",
    "choices": [
     "The force of the hand on the water.",
     "The buoyant force from the water.",
     "The swimmer's muscle force, which acts directly forwards on the body.",
     "The counterforce of the water on the hand: when the hand pushes the water backwards, the water pushes the hand forwards."
    ],
    "correct": 3,
    "solution": "The muscle force is an **internal** force: it cannot accelerate the body as a whole (any more than you can lift yourself by your own hair). What is needed is an **external** force, and it comes from the water.\n\nThe hand pushes the water **backwards** with a force. According to Newton's third law, the water then pushes the hand (and therefore the swimmer) **forwards** with an equally large force. It is this counterforce that drives the swimmer.\n\nOption A is treacherous: the force of the hand on the water is indeed one half of the force pair, but it acts on **the water**, not on the swimmer. A force can only accelerate the object it acts on.\n\n**Answer:** Option D.\n\n**General conclusion:** All propulsion works like this: walking (the foot pushes the ground backwards), car wheels (the tyre pushes the road backwards), rockets (the engine pushes the exhaust gases backwards). You move forwards by pushing something else backwards."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.3-u4",
    "question": "A mosquito collides with the windscreen of a lorry at full speed. How does the force from the lorry on the mosquito compare with the force from the mosquito on the lorry during the collision?",
    "choices": [
     "The lorry acts on the mosquito with a much larger force than the other way round.",
     "The mosquito does not act on the lorry with any force at all.",
     "It depends on how fast the lorry is driving.",
     "The forces are exactly equally large but opposite."
    ],
    "correct": 3,
    "solution": "Newton's third law **always** applies, **without exception**, even when the objects are extremely different in size. The force from the lorry on the mosquito and the force from the mosquito on the lorry are exactly equally large and opposite, at every moment of the collision.\n\nWhat differs dramatically is the **effect** of the same force: the mosquito has a mass of perhaps $10^{-6}$ kg and therefore gets an enormous acceleration ($a = F/m$), while the lorry's acceleration from the same force is completely unmeasurable. It is the accelerations that differ, not the forces.\n\n**Answer:** Option D."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.3-u5",
    "question": "Two teams pull on a rope in a tug of war. Team A wins and pulls team B towards them. Which of the following statements about the **tension** in the rope is correct?",
    "choices": [
     "Team A pulls on the rope with a larger force than team B: that is why A wins.",
     "The tension in the rope is **equally large** at both teams' hands. A wins because they have greater friction against the ground.",
     "The tension is equal to the gravitational force on the lightest team.",
     "The tension is zero as long as nobody moves."
    ],
    "correct": 1,
    "solution": "This is one of the most classic misunderstandings about forces: even textbooks sometimes get it wrong!\n\nThe tension in an (idealised massless) rope is **always equally large at both ends** according to Newton's third law. If team A pulls on the rope with the force *F*, the rope pulls back on A with *F*, and the same applies at B.\n\nWhat decides who wins the tug of war is therefore not the tension in the rope, but **the frictional force against the ground**. The team that can withstand a larger frictional force against the ground (heavier, better shoes, better technique) \"holds out\" against a larger tension in the rope without sliding backwards.\n\n**Answer:** Option B.\n\n**General conclusion:** In all problems with ropes, strings and pulleys (massless and frictionless), the tension is the same along the whole string: otherwise parts of the string would accelerate by themselves, which would break Newton's second law."
   },
   {
    "level": 2,
    "question": "Astrid (55 kg) and Bo (75 kg) stand still facing each other on smooth ice. Astrid pushes Bo, who during the push itself gets an acceleration of 1.2 m/s² backwards. What acceleration does Astrid get during the push? (Ignore the friction against the ice.)",
    "answer": {
     "value": 1.636,
     "unit": "m/s²",
     "tol": 0.03
    },
    "penna": "ov-fy1-3.3-u6",
    "solution": "**Step 1: the force on Bo.** Newton's second law on Bo gives the force Astrid pushes with:\n\n$$\nF = m_\\text{Bo} \\cdot a_\\text{Bo} = 75 \\cdot 1.2 = 90\\ \\mathrm{N}\n$$\n\n**Step 2: the counterforce on Astrid.** According to Newton's third law, Bo pushes back on Astrid with an **equally large** force, 90 N, in the opposite direction. Newton's second law on Astrid:\n\n$$\na_\\text{Astrid} = \\frac{F}{m_\\text{Astrid}} = \\frac{90}{55} = 1.636\\ldots \\approx 1.6\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** Astrid gets about 1.6 m/s², directed opposite to Bo's acceleration.\n\n**General conclusion:** The one who pushes is always pushed back. Since the forces are equally large, the accelerations are inversely proportional to the masses: $a_\\text{Astrid}/a_\\text{Bo} = m_\\text{Bo}/m_\\text{Astrid}$. The lighter person always slides away fastest."
   },
   {
    "level": 3,
    "question": "An astronaut with a mass of 90 kg (including her suit) floats still 15 m from the space station's airlock, without a safety line. To get back, she throws her toolbox (4.0 kg) straight **away** from the station. During the throw, which lasts 0.40 s, she acts on the box with an average force of 54 N.\n\na) What speed does the astronaut get from the throw?\n\nb) How long does it then take her to glide back to the airlock?\n\n*Give the time (b) as your numerical answer in s.*",
    "answer": {
     "value": 62.5,
     "unit": "s",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 0.24,
      "unit": "m/s",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 62.5,
      "unit": "s",
      "tol": 0.03
     }
    ],
    "penna": "ov-fy1-3.3-u7",
    "solution": "**a) The counterforce gives the astronaut speed.** According to Newton's third law, the box acts back on the astronaut with the force 54 N, directed **towards the station**. The astronaut's acceleration during the throw:\n\n$$\na = \\frac{F}{m} = \\frac{54}{90} = 0.60\\ \\mathrm{m/s^2}\n$$\n\nThe speed after the throw ($\\Delta t = 0.40\\ \\mathrm{s}$):\n\n$$\nv = a \\cdot \\Delta t = 0.60 \\cdot 0.40 = 0.24\\ \\mathrm{m/s}\n$$\n\n**b) Uniform motion back.** After the throw no forces act on the astronaut (Newton's first law): she glides at a constant speed of 0.24 m/s:\n\n$$\nt = \\frac{s}{v} = \\frac{15}{0.24} = 62.5 \\approx 63\\ \\mathrm{s}\n$$\n\n**But surely she does not get the speed straight away?** No, during the throw itself she accelerates from rest, so she does not have the speed 0.24 m/s the whole way. But that phase is so short that we can ignore it. During the 0.40 s of the throw she only moves\n\n$$\ns_1 = \\frac{a \\cdot (\\Delta t)^2}{2} = \\frac{0.60 \\cdot 0.40^2}{2} \\approx 0.05\\ \\mathrm{m}\n$$\n\nthat is, about 5 cm of the 15 m. If you include the acceleration phase, the total time is $0.40 + \\dfrac{15 - 0.048}{0.24} \\approx 62.7\\ \\mathrm{s}$, which also rounds to 63 s.\n\n**Answer:** a) 0.24 m/s. b) About 63 s, just over a minute.\n\n**General conclusion:** In space there is nothing to push against: the only way to change your motion is to throw mass in the opposite direction. That is exactly the principle of the rocket engine: the exhaust gases are the \"toolbox\" thrown backwards, continuously. Note the chain in the solution: Newton's third law (the counterforce) → Newton's second law (the acceleration) → kinematics (speed and time)."
   }
  ]
 },
 "fy1-3.4": {
  "kalla": "840514b173",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.4-u1",
    "question": "How large is the gravitational force on a textbook with a mass of 1.2 kg at the Earth's surface? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 11.78,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Direct substitution into the formula for gravitational force:\n\n$$\nF_G = m \\cdot g = 1.2 \\cdot 9.82 = 11.784 \\approx 12\\ \\mathrm{N}\n$$\n\nThe mass has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** The gravitational force is 12 N."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.4-u2",
    "question": "A person has a mass of 75 kg. What gravitational force acts on the person at the Earth's surface? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 736.5,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "The gravitational force is given by $F_G = m \\cdot g$:\n\n$$\nF_G = 75 \\cdot 9.82 = 736.5 \\approx 740\\ \\mathrm{N}\n$$\n\nThe mass has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** The gravitational force is 740 N.\n\n**General conclusion:** In everyday language we say that the person \"weighs 75 kg\", but that is really the *mass*. The **weight** (in N) is the mass times the gravitational field strength: on the Moon the same person would have a mass of 75 kg but a weight of only about 120 N."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.4-u3",
    "question": "An object with a mass of 5.0 kg rests on a flat horizontal table. How large is the **normal force** from the table on the object? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 49.1,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Since the object is at rest (in equilibrium), Newton's first law says that the resultant force is zero. On a flat surface, the normal force $F_N$ upwards balances the gravitational force $F_G$ downwards:\n\n$$\nF_N = F_G = m \\cdot g = 5.0 \\cdot 9.82 = 49.1 \\approx 49\\ \\mathrm{N}\n$$\n\n**Answer:** The normal force is 49 N."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.4-u4",
    "question": "On the surface of the Moon, the gravitational field strength is $g_\\text{moon} = 1.62\\ \\mathrm{N/kg}$. How large is the gravitational force on an equipment bag with a mass of 24 kg that an astronaut carries on the Moon?",
    "answer": {
     "value": 38.88,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "The same formula as on Earth, but with the Moon's gravitational field strength:\n\n$$\nF_G = m \\cdot g_\\text{moon} = 24 \\cdot 1.62 = 38.88 \\approx 39\\ \\mathrm{N}\n$$\n\n**Answer:** 39 N.\n\n**General conclusion:** On Earth the same bag weighs $24 \\cdot 9.82 \\approx 236\\ \\mathrm{N}$: six times more. The mass (24 kg), on the other hand, is exactly the same in both places. That is why astronauts can carry equipment on the Moon that they can hardly budge on Earth."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.4-u5",
    "question": "A baby is weighed in a basket hung from a spring balance. The balance shows 51 N. The basket alone has a weight of 12 N. What is the baby's mass? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 3.971,
     "unit": "kg",
     "tol": 0.03
    },
    "solution": "The balance carries both the basket and the baby. The baby's weight is therefore the difference between the reading on the balance and the weight of the basket:\n\n$$\nF_G = F_\\text{balance} - F_{G\\,\\text{basket}} = 51 - 12 = 39\\ \\mathrm{N}\n$$\n\nThe mass is found from the formula for gravitational force:\n\n$$\nF_G = m \\cdot g \\quad\\Leftrightarrow\\quad m = \\frac{F_G}{g} = \\frac{39}{9.82} = 3.9714\\ldots \\approx 4.0\\ \\mathrm{kg}\n$$\n\n**Answer:** The baby has a mass of 4.0 kg."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.4-u6",
    "question": "Which of the following statements about **mass** and **weight** is correct?",
    "choices": [
     "The mass decreases when you travel to the Moon.",
     "Weight is measured in kilograms and mass in newtons.",
     "The mass is the same everywhere, but the weight depends on the gravitational field strength where you are.",
     "Mass and weight are two names for the same quantity."
    ],
    "correct": 2,
    "solution": "**Mass** is a measure of the amount of matter (and the inertia) of an object. It is measured in kilograms and is the same everywhere in the universe.\n\n**Weight** (the gravitational force $F_G = m \\cdot g$) is the gravitational force acting on the object. It is measured in newtons and depends on the gravitational field strength $g$ at the location: 9.82 N/kg at the Earth's surface, 1.62 N/kg on the Moon, almost zero far out in space.\n\n- Option A: wrong. The mass does not change with location.\n- Option B: the units are the wrong way round.\n- Option D: wrong. In everyday language they are mixed up (\"I weigh 70 kilos\"), but physically they are different quantities.\n\n**Answer:** Option C."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.4-u7",
    "question": "A box with a mass of 30 kg stands on a flat floor. In addition, a person pushes vertically **downwards** on the box with an extra force of 80 N. How large is the normal force from the floor on the box? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 374.6,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Three vertical forces act on the box:\n- Gravitational force $F_G = m g$ downwards\n- Extra pushing force $F = 80$ N downwards\n- Normal force $F_N$ upwards\n\nSince the box stands still, there is equilibrium of forces:\n\n$$\nF_N = F_G + F\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_G = m \\cdot g = 30\\ \\mathrm{kg} \\cdot 9.82\\ \\mathrm{N/kg} = 294.6\\ \\mathrm{N} \\\\\nF = 80\\ \\mathrm{N}\n\\end{array} \\right]\n$$\n\n$$\nF_N = 294.6 + 80 = 374.6 \\approx 370\\ \\mathrm{N}\n$$\n\nThe mass and the force have two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** The normal force is 370 N."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.4-u8",
    "question": "A 12 kg weight hangs from the ceiling on a string and is completely at rest. How large is the **tension** in the string? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 117.84,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Two forces act on the weight:\n- Gravitational force $F_G = m g$ downwards\n- Tension $F_S$ (the pull of the string) upwards\n\nSince the weight is at rest, there is equilibrium of forces:\n\n$$\nF_S = F_G = m \\cdot g = 12 \\cdot 9.82 = 117.84 \\approx 120\\ \\mathrm{N}\n$$\n\nThe mass has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** The tension is 120 N.\n\n**General conclusion:** For a hanging weight at rest, the tension is always equal to the gravitational force. If the weight instead accelerates upwards, the tension becomes *larger* than the gravitational force, and if it accelerates downwards, the tension becomes *smaller*."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.4-u9",
    "question": "At the lowest point of the bounce, a trampoline bed pushes on a gymnast with a mass of 45 kg so that the gymnast gets an acceleration of 7.0 m/s² straight upwards. How large is the normal force from the bed on the gymnast at that moment? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 756.9,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Two forces act on the gymnast: the normal force $F_N$ from the bed upwards and the gravitational force $F_G = m g$ downwards. Newton's second law with upwards as the positive direction:\n\n$$\nF_R = m \\cdot a\n\\quad\\Rightarrow\\quad\nF_N - F_G = m \\cdot a\n\\quad\\Leftrightarrow\\quad\nF_N = F_G + m \\cdot a\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_G = m \\cdot g = 45\\ \\mathrm{kg} \\cdot 9.82\\ \\mathrm{N/kg} = 441.9\\ \\mathrm{N} \\\\\nm = 45\\ \\mathrm{kg} \\\\\na = 7.0\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\nF_N = 441.9 + 45 \\cdot 7.0 = 756.9 \\approx 760\\ \\mathrm{N}\n$$\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 170.5 278.0\" style=\"max-width:171px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><circle cx=\"23\" cy=\"171\" r=\"3.5\" fill=\"#0f1620\"/><line x1=\"23\" y1=\"171\" x2=\"23.0\" y2=\"19.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"23.0,19.0 27.3,28.0 18.7,28.0\" fill=\"#c8324a\"/><text x=\"31.0\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">N</tspan> = ≈ 760 N</text><line x1=\"23\" y1=\"171\" x2=\"23.0\" y2=\"259.0\" stroke=\"#1c3d6b\" stroke-width=\"2.6\"/><polygon points=\"23.0,259.0 18.7,250.0 27.3,250.0\" fill=\"#1c3d6b\"/><text x=\"31.0\" y=\"259.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">G</tspan> = ≈ 440 N</text></svg>\n\n**Answer:** 760 N.\n\n**General conclusion:** The bed must both **support** the gymnast (counteract $m g \\approx 440\\ \\mathrm{N}$) and also **accelerate** her upwards (a further $m a \\approx 320\\ \\mathrm{N}$). Note in the figure that the lengths of the arrows are proportional to the forces: it is the imbalance between them that gives the upward acceleration."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.4-u10",
    "question": "A crane lifts a container with a mass of 2 400 kg. During the first phase of the lift, the container accelerates upwards at 0.60 m/s². How large is the tension in the cable then? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 25008,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Two forces act on the container: the tension $F_S$ upwards and the gravitational force $F_G = m g$ downwards. Newton's second law with upwards as the positive direction:\n\n$$\nF_R = m \\cdot a\n\\quad\\Rightarrow\\quad\nF_S - F_G = m \\cdot a\n\\quad\\Leftrightarrow\\quad\nF_S = F_G + m \\cdot a\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_G = m \\cdot g = 2\\,400\\ \\mathrm{kg} \\cdot 9.82\\ \\mathrm{N/kg} = 23\\,568\\ \\mathrm{N} \\\\\nm = 2\\,400\\ \\mathrm{kg} \\\\\na = 0.60\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\nF_S = 23\\,568 + 2\\,400 \\cdot 0.60 = 25\\,008\\ \\mathrm{N} \\approx 25\\ \\mathrm{kN}\n$$\n\nThe acceleration has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** 25 kN.\n\n**General conclusion:** The cable is always loaded the most at the beginning of the lift (the acceleration phase). When the container is then raised at **constant** speed, the tension is only $m g \\approx 23.6\\ \\mathrm{kN}$: that is why lifting equipment is designed with a margin for exactly the acceleration."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.4-u11",
    "question": "A person with a mass of 70 kg stands on a bathroom scale in a lift. Use $g = 9.82\\ \\mathrm{N/kg}$.\n\na) What does the scale show (in N) when the lift is standing still?\n\nb) What does the scale show when the lift accelerates **upwards** at 1.8 m/s²?\n\nc) What does the scale show when the lift accelerates **downwards** at 1.2 m/s²?\n\n*Give the reading on the scale from **b)** as your numerical answer in N.*",
    "answer": {
     "value": 813.4,
     "unit": "N",
     "tol": 0.02
    },
    "delsvar": [
     {
      "del": "a",
      "value": 687.4,
      "unit": "N"
     },
     {
      "del": "b",
      "value": 813.4,
      "unit": "N"
     },
     {
      "del": "c",
      "value": 603.4,
      "unit": "N"
     }
    ],
    "solution": "The bathroom scale basically shows the normal force it exerts on the person ($F_N$). According to Newton's third law, this is equal to the person's push downwards on the scale: it is *that* force the scale registers.\n\nTwo forces act on the person: the gravitational force $F_G = m g$ downwards and the normal force $F_N$ upwards. The person's acceleration is the same as the lift's. We choose **upwards as positive**.\n\nNewton's second law on the person:\n$$\nF_R = m \\cdot a \\quad\\Rightarrow\\quad F_N - F_G = m \\cdot a \\quad\\Leftrightarrow\\quad F_N = F_G + m \\cdot a\n$$\n\nwhere *a* is the lift's acceleration (+ upwards, − downwards).\n\n$$\n\\left[ \\begin{array}{l}\nF_G = m \\cdot g = 70\\ \\mathrm{kg} \\cdot 9.82\\ \\mathrm{N/kg} = 687.4\\ \\mathrm{N} \\\\\nm = 70\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n**a) The lift is standing still** ($a = 0$):\n$$\nF_N = 687.4 + 70 \\cdot 0 = 687.4 \\approx 690\\ \\mathrm{N}\n$$\n\n**b) The lift accelerates upwards** ($a = 1.8\\ \\mathrm{m/s^2}$):\n$$\nF_N = 687.4 + 70 \\cdot 1.8 = 813.4 \\approx 810\\ \\mathrm{N}\n$$\n\nSo the scale shows more than when standing still. The person feels \"heavier\".\n\n**c) The lift accelerates downwards** ($a = -1.2\\ \\mathrm{m/s^2}$):\n$$\nF_N = 687.4 + 70 \\cdot (-1.2) = 603.4 \\approx 600\\ \\mathrm{N}\n$$\n\nThe scale shows less. The person feels \"lighter\".\n\nThe mass and the accelerations have two significant figures, so the answers are rounded to two significant figures.\n\n**Answer:** a) 690 N, b) 810 N, c) 600 N.\n\n**General conclusion:** The reading on the scale $F_N = m(g + a)$ is often called the *apparent weight*. In a lift in free fall ($a = -g$) the scale would show zero, since the person and the scale would then both accelerate downwards equally fast, and no normal force is needed. This is the same phenomenon that astronauts experience in orbiting spacecraft."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.4-u12",
    "question": "A basketball player with a mass of 78 kg jumps straight up to block a shot. He first bends his knees so that his centre of gravity is lowered by 0.40 m, and then pushes off over exactly this distance. He leaves the floor with a speed that is enough to lift his centre of gravity 0.85 m.\n\na) With what speed does he leave the floor?\n\nb) What acceleration does he have during the push-off, if it is assumed to be constant?\n\nc) How large is the normal force from the floor on him during the push-off?\n\n*Give the normal force (c) as your numerical answer in N. Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "answer": {
     "value": 2394,
     "unit": "N",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4.09,
      "unit": "m/s",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 20.9,
      "unit": "m/s²",
      "tol": 0.03
     },
     {
      "del": "c",
      "value": 2394,
      "unit": "N",
      "tol": 0.03
     }
    ],
    "solution": "This is a chain of three sub-problems: free fall (upwards), kinematics during the push-off, and Newton's second law.\n\n**a) The speed at push-off.** In the air he is slowed down by the acceleration due to gravity. Torricelli's equation with the final velocity 0 at the height 0.85 m:\n\n$$\n0 - v_0^{2} = -2 g h\n\\quad\\Leftrightarrow\\quad\nv_0^{2} = 2 g h\n\\quad\\Leftrightarrow\\quad\nv_0 = \\sqrt{2 g h} = \\sqrt{2 \\cdot 9.82 \\cdot 0.85} = 4.0858\\ldots \\approx 4.1\\ \\mathrm{m/s}\n$$\n\n**b) The acceleration during the push-off.** He goes from rest to the speed from a), unrounded 4.0858... m/s, over the distance 0.40 m. Torricelli's equation again, now with the final speed $v = 4.0858\\ldots\\ \\mathrm{m/s}$ and the starting speed $v_0 = 0$:\n\n$$\nv^{2} - v_0^{2} = 2 a s\n\\quad\\Leftrightarrow\\quad\na = \\frac{v^{2} - v_0^{2}}{2 s} = \\frac{4.0858\\ldots^{2} - 0^{2}}{2 \\cdot 0.40} = 20.8675 \\approx 21\\ \\mathrm{m/s^2}\n$$\n\n**c) The normal force.** During the push-off, the normal force $F_N$ acts upwards and the gravitational force $m g$ downwards. Newton's second law (upwards positive):\n\n$$\nF_R = m \\cdot a\n\\quad\\Rightarrow\\quad\nF_N - F_G = m \\cdot a\n\\quad\\Leftrightarrow\\quad\nF_N = F_G + m \\cdot a\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_G = m \\cdot g = 78\\ \\mathrm{kg} \\cdot 9.82\\ \\mathrm{N/kg} = 765.96\\ \\mathrm{N} \\\\\nm = 78\\ \\mathrm{kg} \\\\\na = 20.8675\\ \\mathrm{m/s^2}\\ \\text{(unrounded from b)}\n\\end{array} \\right]\n$$\n\n$$\nF_N = 765.96 + 78 \\cdot 20.8675 = 2\\,393.625\\ \\mathrm{N} \\approx 2.4\\ \\mathrm{kN}\n$$\n\nThe mass and the distances have two significant figures, so the answers are rounded to two significant figures.\n\n**Answer:** a) 4.1 m/s. b) 21 m/s². c) 2.4 kN, just over three times his own weight.\n\n**General conclusion:** The shorter the distance over which the push-off takes place, the larger the force must be for the same jump height: that is why you jump higher with a deep knee bend than with stiff legs. The same reasoning (but in reverse) explains why you should **bend your legs when landing**: a longer braking distance gives a smaller force on the body."
   }
  ]
 },
 "fy1-3.5": {
  "kalla": "4b816e271f",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.5-u1",
    "question": "Two spheres with masses of 5.0 kg and 8.0 kg respectively have their centres of gravity 0.50 m apart. Calculate the gravitational force between them. Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 1.0672e-8,
     "unit": "N",
     "tol": 0.05
    },
    "solution": "We use Newton's law of gravitation:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_1 = 5.0\\ \\mathrm{kg} \\\\\nm_2 = 8.0\\ \\mathrm{kg} \\\\\nr = 0.50\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nF_G = 6.67 \\cdot 10^{-11} \\cdot \\frac{5.0 \\cdot 8.0}{0.50^{2}}\n= 6.67 \\cdot 10^{-11} \\cdot 160\n= 1.0672 \\cdot 10^{-8}\\ \\mathrm{N}\n\\approx 1.1 \\cdot 10^{-8}\\ \\mathrm{N}\n$$\n\nThe answer is rounded to two significant figures, like the masses and the distance.\n\n**Answer:** $1.1 \\cdot 10^{-8}\\ \\mathrm{N}$, that is, vanishingly small."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.5-u2",
    "question": "Two satellites, each with the same mass of 500 kg, orbit with their centres of gravity 100 m apart. How large is the gravitational force between them? Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 1.6675e-9,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We use Newton's law of gravitation:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_1 = 500\\ \\mathrm{kg} \\\\\nm_2 = 500\\ \\mathrm{kg} \\\\\nr = 100\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nF_G = 6.67 \\cdot 10^{-11} \\cdot \\frac{500 \\cdot 500}{100^{2}}\n= 6.67 \\cdot 10^{-11} \\cdot 25\n= 1.6675 \\cdot 10^{-9}\\ \\mathrm{N}\n\\approx 1.7 \\cdot 10^{-9}\\ \\mathrm{N}\n$$\n\n**Answer:** $1.7 \\cdot 10^{-9}\\ \\mathrm{N}$"
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.5-u3",
    "question": "What does the constant *G* in Newton's law of gravitation represent?",
    "choices": [
     "The gravitational field strength at the Earth's surface (9.82 N/kg).",
     "The gravitational constant, a universal constant of nature that gives how strong gravity is.",
     "The mass an object must have to accelerate at 1 m/s².",
     "The speed at which the gravitational force propagates."
    ],
    "correct": 1,
    "solution": "*G* appears in Newton's law of gravitation together with the masses and the distance:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\n*G* is **the gravitational constant**, a universal constant of nature with the value $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$. It determines how strong gravity is and has the same value everywhere in the universe.\n\n- Option A is the gravitational field strength $g = 9.82\\ \\mathrm{N/kg}$, with a lower-case *g*. It is a different quantity and applies at the Earth's surface.\n- Option C describes the unit newton.\n- Option D is about a speed. Gravity does indeed propagate at the speed of light, but *G* has nothing to do with that.\n\n**Answer:** Option B."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.5-u4",
    "question": "Calculate the gravitational force between the Earth and the Moon. The Earth's mass is $5.972 \\cdot 10^{24}\\ \\mathrm{kg}$, the Moon's mass is $7.35 \\cdot 10^{22}\\ \\mathrm{kg}$ and the distance between their centres is $3.84 \\cdot 10^{8}\\ \\mathrm{m}$. Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 199000000000000000000,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We use Newton's law of gravitation, with the Earth's mass as $m_1$ and the Moon's as $m_2$:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_1 = 5.972 \\cdot 10^{24}\\ \\mathrm{kg} \\quad (\\text{the Earth}) \\\\\nm_2 = 7.35 \\cdot 10^{22}\\ \\mathrm{kg} \\quad (\\text{the Moon}) \\\\\nr = 3.84 \\cdot 10^{8}\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nF_G = 6.67 \\cdot 10^{-11} \\cdot \\frac{5.972 \\cdot 10^{24} \\cdot 7.35 \\cdot 10^{22}}{(3.84 \\cdot 10^{8})^{2}}\n= 1.9855\\ldots \\cdot 10^{20}\\ \\mathrm{N}\n\\approx 1.99 \\cdot 10^{20}\\ \\mathrm{N}\n$$\n\nThe answer is rounded to three significant figures, like *G*, the Moon's mass and the distance.\n\n**Answer:** $1.99 \\cdot 10^{20}\\ \\mathrm{N}$\n\n**General conclusion:** It is this enormous force that keeps the Moon in its orbit. The Moon pulls just as hard on the Earth (Newton's third law), and it is that force that creates the tides in the Earth's oceans."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.5-u5",
    "question": "Two fully loaded supertankers, each with a mass of $1.5 \\cdot 10^{8}\\ \\mathrm{kg}$, are moored with their centres of gravity 100 m apart. How large is the gravitational force between the ships? Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 150,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We use Newton's law of gravitation:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_1 = m_2 = 1.5 \\cdot 10^{8}\\ \\mathrm{kg} \\\\\nr = 100\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nF_G = 6.67 \\cdot 10^{-11} \\cdot \\frac{(1.5 \\cdot 10^{8})^{2}}{100^{2}}\n= 150.075\\ \\mathrm{N}\n\\approx 150\\ \\mathrm{N}\n$$\n\n**Answer:** 150 N.\n\n**General conclusion:** Here the gravitational force between two objects on Earth is actually noticeable: 150 N corresponds to the weight of a full suitcase! But it takes extreme masses (150 000 tonnes each) to get there. Between two people at the same distance, the force is only about $10^{-11}\\ \\mathrm{N}$. In practice the attraction between the ships is still not noticeable, because water resistance and moorings are many orders of magnitude larger."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.5-u6",
    "question": "The distance between two space probes is **doubled**. What happens to the gravitational force between them?",
    "choices": [
     "It is halved.",
     "It decreases to a quarter.",
     "It is doubled.",
     "It is unchanged, since the force only depends on the masses."
    ],
    "correct": 1,
    "solution": "The law of gravitation has the distance **squared** in the denominator:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\nThe distance is doubled, so we replace $r$ by $2 \\cdot r$. The masses are the same as before. Both the two and $r$ are squared, so the denominator becomes four times as large:\n\n$$\nF_\\text{new} = G \\cdot \\frac{m_1 \\cdot m_2}{(2 \\cdot r)^{2}} = G \\cdot \\frac{m_1 \\cdot m_2}{4 \\cdot r^{2}}\n$$\n\n$$\nF_\\text{new} = \\frac{1}{4} \\cdot G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}} = \\frac{F_G}{4}\n$$\n\nSo the force decreases to a quarter, not to a half.\n\n**Answer:** Option B.\n\n**General conclusion:** This is called the **inverse square law**: double the distance → 1/4 of the force, triple it → 1/9, ten times the distance → 1/100. The same mathematical form appears again in Coulomb's law in electricity and for the intensity of light from a point source."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.5-u7",
    "question": "Two spheres with the same mass *m* attract each other with the gravitational force $4.0 \\cdot 10^{-8}\\ \\mathrm{N}$ when their centres of gravity are 0.25 m apart. Determine the mass of the spheres. Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 6.122,
     "unit": "kg",
     "tol": 0.03
    },
    "solution": "Both spheres have the mass $m$, so in the law of gravitation $m_1 \\cdot m_2 = m \\cdot m = m^{2}$:\n\n$$\nF_G = G \\cdot \\frac{m \\cdot m}{r^{2}} = G \\cdot \\frac{m^{2}}{r^{2}}\n$$\n\nWe solve for $m^{2}$ by multiplying by $r^{2}$ and dividing by $G$. The mass is the square root of $m^{2}$ (a mass is always positive):\n\n$$\nm^{2} = \\frac{F_G \\cdot r^{2}}{G}\n\\quad\\Leftrightarrow\\quad\nm = \\sqrt{\\frac{F_G \\cdot r^{2}}{G}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_G = 4.0 \\cdot 10^{-8}\\ \\mathrm{N} \\\\\nr = 0.25\\ \\mathrm{m} \\\\\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}\n\\end{array} \\right]\n$$\n\n$$\nm = \\sqrt{\\frac{4.0 \\cdot 10^{-8} \\cdot 0.25^{2}}{6.67 \\cdot 10^{-11}}}\n= 6.122\\ldots\\ \\mathrm{kg}\n\\approx 6.1\\ \\mathrm{kg}\n$$\n\nThe answer is rounded to two significant figures, like the force and the distance.\n\n**Answer:** Each sphere has a mass of 6.1 kg."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.5-u8",
    "question": "At what distance from the centre of the Earth is the gravitational force on a person with a mass of 70 kg equal to 100 N? Use the Earth's mass $m_j = 5.972 \\cdot 10^{24}$ kg and $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 16698000,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "The gravitational force on the person is given by Newton's law of gravitation, with the person's mass $m$ and the Earth's mass $m_j$:\n\n$$\nF_G = G \\cdot \\frac{m \\cdot m_j}{r^{2}}\n$$\n\nWe solve for $r^{2}$ by multiplying by $r^{2}$ and dividing by $F_G$. The distance is the square root of $r^{2}$:\n\n$$\nr^{2} = \\frac{G \\cdot m \\cdot m_j}{F_G}\n\\quad\\Leftrightarrow\\quad\nr = \\sqrt{\\frac{G \\cdot m \\cdot m_j}{F_G}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_G = 100\\ \\mathrm{N} \\\\\nm = 70\\ \\mathrm{kg} \\\\\nm_j = 5.972 \\cdot 10^{24}\\ \\mathrm{kg} \\\\\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}\n\\end{array} \\right]\n$$\n\n$$\nr = \\sqrt{\\frac{6.67 \\cdot 10^{-11} \\cdot 70 \\cdot 5.972 \\cdot 10^{24}}{100}}\n= 1.6698\\ldots \\cdot 10^{7}\\ \\mathrm{m}\n\\approx 1.7 \\cdot 10^{7}\\ \\mathrm{m}\n$$\n\nThe answer is rounded to two significant figures, like the mass $70\\ \\mathrm{kg}$ and the force $100\\ \\mathrm{N}$.\n\n**Answer:** $1.7 \\cdot 10^{7}\\ \\mathrm{m}$, that is, about 17 000 km from the centre of the Earth (about 10 000 km above the Earth's surface)."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.5-u9",
    "question": "Astrology claims that the positions of the planets at birth affect our lives. Let us do the calculation!\n\na) Calculate the gravitational force from a parent with a mass of 80 kg on a newborn baby with a mass of 3.5 kg, when the parent is standing 0.50 m from the baby.\n\nb) Compare with the gravitational force from the planet Mars (mass $6.42 \\cdot 10^{23}\\ \\mathrm{kg}$) on the same baby, when Mars is at its closest to the Earth ($5.6 \\cdot 10^{10}\\ \\mathrm{m}$ away).\n\n*Give the force from the parent (a) as your numerical answer in N. Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.*",
    "answer": {
     "value": 7.4704e-8,
     "unit": "N",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 7.4704e-8,
      "unit": "N",
      "tol": 0.03
     },
     {
      "del": "b"
     }
    ],
    "solution": "**a) The force from the parent.** We use Newton's law of gravitation:\n\n$$\nF_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^{2}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_1 = 80\\ \\mathrm{kg} \\\\\nm_2 = 3.5\\ \\mathrm{kg} \\\\\nr = 0.50\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nF_G = 6.67 \\cdot 10^{-11} \\cdot \\frac{80 \\cdot 3.5}{0.50^{2}}\n= 7.4704 \\cdot 10^{-8}\\ \\mathrm{N}\n\\approx 7.5 \\cdot 10^{-8}\\ \\mathrm{N}\n$$\n\n**Answer:** $7.5 \\cdot 10^{-8}\\ \\mathrm{N}$\n\n**b) The force from Mars.** The same law, but now $m_1$ is the mass of Mars and $r$ is the distance to Mars:\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_1 = 6.42 \\cdot 10^{23}\\ \\mathrm{kg} \\quad (\\text{Mars}) \\\\\nm_2 = 3.5\\ \\mathrm{kg} \\\\\nr = 5.6 \\cdot 10^{10}\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\nF_G = 6.67 \\cdot 10^{-11} \\cdot \\frac{6.42 \\cdot 10^{23} \\cdot 3.5}{(5.6 \\cdot 10^{10})^{2}}\n= 4.779\\ldots \\cdot 10^{-8}\\ \\mathrm{N}\n\\approx 4.8 \\cdot 10^{-8}\\ \\mathrm{N}\n$$\n\nBoth forces have the power of ten $10^{-8}$, so we compare the numbers in front: $7.5 \\cdot 10^{-8}\\ \\mathrm{N} > 4.8 \\cdot 10^{-8}\\ \\mathrm{N}$.\n\n**Answer:** The parent pulls harder than Mars. The parent in the delivery room pulls on the baby with a **larger** gravitational force than the planet Mars, even though Mars is almost $10^{22}$ times heavier.\n\n**General conclusion:** The squared distance in the denominator makes the force from distant objects very small: the enormous mass of Mars is not enough at a distance of $5.6 \\cdot 10^{10}\\ \\mathrm{m}$. If the planets really controlled our lives through gravity, the midwife would have more influence than Mars. A nice example of how a simple calculation can scrutinise a claim."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.5-u10",
    "question": "At what height above the Earth's surface is the gravitational field strength half as large as at the Earth's surface? The Earth's radius is 6 371 km.\n\n*Hint: you need neither the Earth's mass nor $G$: they cancel out.*",
    "answer": {
     "value": 2639,
     "unit": "km",
     "tol": 0.03
    },
    "solution": "The gravitational field strength at the distance $r$ from the centre of the Earth is given by the law of gravitation:\n\n$$\ng = G \\cdot \\frac{m_j}{r^{2}}\n$$\n\nAt the surface $r = R$ (the Earth's radius), and at the height $h$, $r = R + h$. There the gravitational field strength should be half as large as at the surface:\n\n$$\nG \\cdot \\frac{m_j}{(R+h)^{2}} = \\frac{1}{2} \\cdot G \\cdot \\frac{m_j}{R^{2}}\n$$\n\n$G$ and $m_j$ appear as factors on both sides and cancel out. What remains is two fractions with the numerator 1, and they are equal when the denominators are equal:\n\n$$\n\\frac{1}{(R+h)^{2}} = \\frac{1}{2 \\cdot R^{2}}\n\\quad\\Leftrightarrow\\quad\n(R+h)^{2} = 2 \\cdot R^{2}\n$$\n\nWe take the square root of both sides (the distances are positive):\n\n$$\nR + h = \\sqrt{2 \\cdot R^{2}} = \\sqrt{2} \\cdot R\n$$\n\nWe subtract $R$ from both sides and take out $R$ as a common factor:\n\n$$\nR + h - R = \\sqrt{2} \\cdot R - R\n$$\n\n$$\nh = \\sqrt{2} \\cdot R - R = R \\cdot (\\sqrt{2} - 1)\n$$\n\n$$\n\\left[ \\begin{array}{l}\nR = 6\\,371\\ \\mathrm{km}\n\\end{array} \\right]\n$$\n\n$$\nh = 6\\,371 \\cdot (\\sqrt{2} - 1) = 2\\,638.95\\ldots\\ \\mathrm{km} \\approx 2\\,639\\ \\mathrm{km}\n$$\n\nThe answer is rounded to four significant figures, like the Earth's radius.\n\n**Answer:** 2 639 km, that is, just under half an Earth radius up.\n\n**General conclusion:** The method is powerful: when the same constants appear on both sides they disappear, and the problem is solved without even having to look up their values. Note also that satellites in low orbit (400 km, like the ISS) experience almost the full gravitational field strength. The \"weightlessness\" on board is due to the free fall around the Earth, not to the distance."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.5-u11",
    "question": "Mars has a mass of $6.39 \\cdot 10^{23}\\ \\mathrm{kg}$ and a radius of $3\\,389\\ \\mathrm{km}$. Calculate **the gravitational field strength $g_\\text{Mars}$** at the surface of Mars (in N/kg). Use $G = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2}$.",
    "answer": {
     "value": 3.71,
     "unit": "N/kg",
     "tol": 0.03
    },
    "solution": "The gravitational force on an object with the mass *m* at the surface of Mars can be written in two ways: with the gravitational field strength, $F_G = m \\cdot g_\\text{Mars}$, and with the law of gravitation. It is the same force, so the expressions are set equal. The mass *m* appears as a factor on both sides and cancels out:\n\n$$\nm \\cdot g_\\text{Mars} = G \\cdot \\frac{m \\cdot m_\\text{Mars}}{r^{2}}\n\\quad\\Leftrightarrow\\quad\ng_\\text{Mars} = G \\cdot \\frac{m_\\text{Mars}}{r^{2}}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nG = 6.67 \\cdot 10^{-11}\\ \\mathrm{Nm^2/kg^2} \\\\\nm_\\text{Mars} = 6.39 \\cdot 10^{23}\\ \\mathrm{kg} \\\\\nr = 3\\,389\\ \\mathrm{km} = 3.389 \\cdot 10^{6}\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$\ng_\\text{Mars} = 6.67 \\cdot 10^{-11} \\cdot \\frac{6.39 \\cdot 10^{23}}{(3.389 \\cdot 10^{6})^{2}}\n= 3.7109\\ldots\\ \\mathrm{N/kg}\n\\approx 3.71\\ \\mathrm{N/kg}\n$$\n\nThe answer is rounded to three significant figures, like *G* and the mass of Mars.\n\n**Answer:** The gravitational field strength at the surface of Mars is 3.71 N/kg.\n\n**General conclusion:** This is just under 38 % of the Earth's gravitational field strength. A person who weighs 700 N on Earth would weigh just over 260 N on Mars: still more than on the Moon (just under 120 N), but clearly less than at home. Note that the gravitational field strength depends on *two* things: the planet's mass and its radius squared. A small but extremely dense celestial body (for example a neutron star) would have an enormous gravitational field strength."
   }
  ]
 },
 "fy1-3.6": {
  "kalla": "ac6fb4ac92",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.6-u1",
    "question": "A box is pulled along a flat floor. The coefficient of friction between the box and the floor is 0.30, and the normal force from the floor on the box is 200 N. Calculate the frictional force.",
    "answer": {
     "value": 60,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Direct substitution into the formula for the frictional force:\n\n$$\nF_f = \\mu \\cdot F_N = 0.30 \\cdot 200 = 60\\ \\mathrm{N}\n$$\n\n**Answer:** The frictional force is 60 N."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.6-u2",
    "question": "A sandbag with a mass of 25 kg rests on a flat floor. The coefficient of friction between the bag and the floor is 0.45. What is the **smallest** force needed to make the bag start sliding? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 110,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "On a flat surface, the normal force is equal to the gravitational force:\n\n$$\nF_N = F_G = m \\cdot g = 25 \\cdot 9.82 = 245.5\\ \\mathrm{N}\n$$\n\nThe frictional force at the limit of sliding:\n\n$$\nF_f = \\mu \\cdot F_N = 0.45 \\cdot 245.5 = 110.475 \\approx 110\\ \\mathrm{N}\n$$\n\nFor the bag to start sliding, the pulling force must be at least equal to the frictional force:\n\n$$\nF_\\text{min} = F_f \\approx 110\\ \\mathrm{N}\n$$\n\n**Answer:** At least about 110 N is needed."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.6-u3",
    "question": "A block slides across a table. The frictional force is 8.5 N and the normal force from the table is 25 N. Calculate the coefficient of friction *μ*.",
    "answer": {
     "value": 0.34,
     "unit": "",
     "tol": 0.03
    },
    "solution": "Solve for $\\mu$ in the friction formula:\n\n$$\nF_f = \\mu \\cdot F_N \\quad\\Leftrightarrow\\quad \\mu = \\frac{F_f}{F_N}\n$$\n\n$$\n\\mu = \\frac{8.5}{25} = 0.34\n$$\n\n**Answer:** The coefficient of friction is 0.34 (or 34 %).\n\n**General conclusion:** The coefficient of friction is dimensionless: it is a pure constant of proportionality between the frictional force and the normal force."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.6-u4",
    "question": "A steel spatula slides against a Teflon pan with a frictional force of 0.60 N. The coefficient of friction between steel and Teflon is only 0.040, one of the lowest there is between solid materials. How large is the normal force between the spatula and the pan?",
    "answer": {
     "value": 15,
     "unit": "N",
     "tol": 0.02
    },
    "solution": "Solve for the normal force in the friction formula:\n\n$$\nF_f = \\mu \\cdot F_N \\quad\\Leftrightarrow\\quad F_N = \\frac{F_f}{\\mu} = \\frac{0.60}{0.040} = 15\\ \\mathrm{N}\n$$\n\n**Answer:** The normal force is 15 N.\n\n**General conclusion:** Teflon's extremely low coefficient of friction is the whole point of the coating: the food slides in the pan instead of sticking. The same principle (but with an even lower $\\mu$) is used in ski wax and in the cartilage of human knees."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.6-u5",
    "question": "A heavy packing case stands still on the floor. You push horizontally on the case with a force of 50 N: it still stands still. How large is the frictional force on the case at that moment?",
    "choices": [
     "0 N: the case is not moving, so there is no friction.",
     "Exactly 50 N, directed against your pushing force.",
     "$\\mu \\cdot F_N$, no matter how hard you push.",
     "Greater than 50 N: that is why the case does not move."
    ],
    "correct": 1,
    "solution": "The case stands still: it is in **equilibrium of forces**. Then the frictional force must be exactly as large as the pushing force, that is, 50 N (Newton's first law).\n\n**Static friction is a \"smart\" force**: it adjusts automatically to what is needed. If you push with 20 N, it resists with 20 N; if you push with 50 N, it resists with 50 N, all the way until you reach its **maximum** value $F_{f,\\max} = \\mu \\cdot F_N$. Only then does the case start to slide.\n\n- Option A: wrong. Without friction the case would accelerate from your 50-newton force.\n- Option C: $\\mu F_N$ is the **maximum** of the friction, not its current value.\n- Option D: impossible. Then the case would accelerate **towards** you!\n\n**Answer:** Option B."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.6-u6",
    "question": "A bookcase with a mass of 50 kg is pulled horizontally across a floor with a force of 325 N. The bookcase then gets an acceleration of 4.0 m/s². Calculate the coefficient of friction between the bookcase and the floor. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.25,
     "unit": "",
     "tol": 0.05
    },
    "solution": "We use Newton's second law on the horizontal forces to find the frictional force, and then the friction formula to find the coefficient of friction.\n\n**Step 1: the frictional force.** Newton's second law:\n\n$$\nF_R = F_\\text{drag} - F_f \\quad\\Leftrightarrow\\quad F_f = F_\\text{drag} - F_R = F_\\text{drag} - m \\cdot a\n$$\n\n$$\nF_f = 325 - 50 \\cdot 4.0 = 325 - 200 = 125\\ \\mathrm{N}\n$$\n\n**Step 2: the coefficient of friction.** The normal force is equal to the gravitational force (flat floor):\n\n$$\nF_N = m \\cdot g = 50 \\cdot 9.82 = 491\\ \\mathrm{N}\n$$\n\n$$\n\\mu = \\frac{F_f}{F_N} = \\frac{125}{491} = 0.2545\\ldots \\approx 0.25\n$$\n\n**Answer:** The coefficient of friction is about 0.25."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.6-u7",
    "question": "A car with a mass of 1 400 kg is driving at 90 km/h on a dry asphalt road and brakes with locked wheels. The coefficient of friction between locked tyres and asphalt is 0.72. How long is the car's **braking distance**? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 44.2,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "The frictional force gives a negative acceleration (deceleration). We work it out and use Torricelli's equation to find the braking distance.\n\n**Step 1: the acceleration.** On a flat surface $F_N = m g$, so:\n\n$$\nF_f = \\mu \\cdot m \\cdot g \\quad\\Rightarrow\\quad a = \\frac{F_f}{m} = \\mu \\cdot g\n$$\n\nNote that the mass **cancels out**: the braking acceleration depends only on the coefficient of friction and *g*:\n\n$$\na = -\\mu \\cdot g = -0.72 \\cdot 9.82 = -7.0704\\ \\mathrm{m/s^2}\n$$\n\n**Step 2: the braking distance.** With Torricelli's equation and $v = 0$ (the car stops):\n\n$$\nv^{2} - v_0^{2} = 2 a s \\quad\\Leftrightarrow\\quad s = \\frac{v^{2} - v_0^{2}}{2 a}\n$$\n\nMeasured values: $v_0 = 90\\ \\mathrm{km/h} = 25\\ \\mathrm{m/s}$.\n\n$$\ns = \\frac{0^{2} - 25^{2}}{2 \\cdot (-7.0704)} = 44.198\\ldots \\approx 44\\ \\mathrm{m}\n$$\n\n**Answer:** The braking distance is about 44 m.\n\n**General conclusion:** The braking distance does **not depend on the car's mass** (for a given $\\mu$ and $v_0$). The mass dependence in $F_f = \\mu m g$ cancels the mass dependence in $F_R = m a$. On the other hand, the braking distance doubles if the coefficient of friction is halved (wet road!) and quadruples if the velocity is doubled."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.6-u8",
    "question": "A dog team with eight sled dogs pulls a sledge across snow. The sledge with driver and load has a mass of 210 kg (the dogs' own mass is not included: they carry themselves). Each dog pulls with a force of 60 N in the direction of travel, and the coefficient of friction between the runners and the snow is 0.14. What acceleration does the sledge get at the start? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.91,
     "unit": "m/s²",
     "tol": 0.04
    },
    "solution": "**Step 1: the total pulling force.**\n\n$$\nF_\\text{drag} = 8 \\cdot 60 = 480\\ \\mathrm{N}\n$$\n\n**Step 2: the frictional force.** On level ground, the normal force is equal to the gravitational force on the sledge:\n\n$$\nF_f = \\mu \\cdot F_N = \\mu \\cdot m \\cdot g = 0.14 \\cdot 210 \\cdot 9.82 = 288.708\\ \\mathrm{N}\n$$\n\n**Step 3: Newton's second law.**\n\n$$\na = \\frac{F_R}{m} = \\frac{F_\\text{drag} - F_f}{m} = \\frac{480 - 288.708}{210} = 0.9109\\ldots \\approx 0.91\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** About 0.91 m/s².\n\n**General conclusion:** Note that more than half of the dogs' combined pulling force is used just to overcome the friction. That is why sledge drivers wax the runners: if $\\mu$ is lowered from 0.14 to 0.05, the acceleration more than doubles."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.6-u9",
    "question": "A curling stone is released at a speed of 2.2 m/s and slides 28 m on the ice before it stops by itself. Determine the coefficient of friction between the stone and the ice. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.0088,
     "unit": "",
     "tol": 0.05
    },
    "solution": "**Step 1: the coefficient of friction expressed in terms of the deceleration.** Friction is the only force in the direction of motion. With the magnitude of the deceleration $a$, Newton's second law gives $F_f = m \\cdot a$, and at the same time $F_f = \\mu \\cdot m \\cdot g$. The mass appears on both sides and cancels out:\n\n$$\n\\mu \\cdot m \\cdot g = m \\cdot a \\quad\\Leftrightarrow\\quad \\mu = \\frac{a}{g}\n$$\n\n**Step 2: the deceleration.** The stone is slowed down uniformly from $v_0$ to rest over the distance $s$. Torricelli's equation with the final velocity zero gives $v_0^{2} = 2 \\cdot a \\cdot s$:\n\n$$\na = \\frac{v_0^{2}}{2 \\cdot s} = \\frac{2.2^{2}}{2 \\cdot 28} = 0.08642\\ldots\\ \\mathrm{m/s^2}\n$$\n\n**Step 3: substitution.**\n\n$$\n\\mu = \\frac{a}{g} = \\frac{0.08642\\ldots}{9.82} = 0.008801\\ldots \\approx 0.0088\n$$\n\n**Answer:** The coefficient of friction is about 0.0088.\n\n**General conclusion:** The extremely low coefficient of friction of ice is the whole basis for curling: the stone \"remembers\" its speed for tens of metres. Sweeping in front of the stone lowers $\\mu$ a little further: that is enough to extend the sliding distance by several metres and to steer the stone."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.6-u10",
    "question": "A box with a mass of 12 kg is pulled along a flat floor according to the figure. The coefficient of friction between the box and the floor is 0.30. Calculate the box's **acceleration**. Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 304.9 220.0\" style=\"max-width:305px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"78.25\" y=\"92.9581958046224\" width=\"36\" height=\"36\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"96.25\" y1=\"110.9581958046224\" x2=\"271.3\" y2=\"110.9581958046224\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 144.3 111.0 A 48 48 0 0 0 139.8 90.7\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"156.8\" y=\"97.5\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">25°</text><line x1=\"96.25\" y1=\"110.9581958046224\" x2=\"254.9\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"254.9,37.0 248.5,44.7 244.9,36.9\" fill=\"#c8324a\"/><text x=\"254.9\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan> = 60 N</text><line x1=\"96.25\" y1=\"110.9581958046224\" x2=\"26.3\" y2=\"111.0\" stroke=\"#1c3d6b\" stroke-width=\"2.6\"/><polygon points=\"26.3,111.0 35.3,106.6 35.3,115.3\" fill=\"#1c3d6b\"/><text x=\"26.3\" y=\"93.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">f</tspan></text><line x1=\"96.25\" y1=\"110.9581958046224\" x2=\"96.3\" y2=\"41.0\" stroke=\"#1c3d6b\" stroke-width=\"2.6\"/><polygon points=\"96.3,41.0 100.6,50.0 91.9,50.0\" fill=\"#1c3d6b\"/><text x=\"104.3\" y=\"41.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">N</tspan></text><line x1=\"96.25\" y1=\"110.9581958046224\" x2=\"96.2\" y2=\"201.0\" stroke=\"#1c3d6b\" stroke-width=\"2.6\"/><polygon points=\"96.2,201.0 91.9,191.9 100.6,191.9\" fill=\"#1c3d6b\"/><text x=\"104.2\" y=\"201.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#1c3d6b\" text-anchor=\"start\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">G</tspan></text></svg>",
    "answer": {
     "value": 2.2,
     "unit": "m/s²",
     "tol": 0.05
    },
    "solution": "This problem is tricky because the vertical component of the rope *lifts* the box slightly, which **reduces the normal force** and therefore the frictional force.\n\nWe split the pulling force into components:\n\n$$\nF_x = F \\cdot \\cos 25^{\\circ} \\quad (\\text{horizontal, drives the box forwards})\n$$\n\n$$\nF_y = F \\cdot \\sin 25^{\\circ} \\quad (\\text{vertical, upwards: reduces } F_N)\n$$\n\n**Step 1: the normal force.** The box does not move vertically, so the balance of forces in the vertical direction gives:\n\n$$\nF_N + F_y = F_G \\quad\\Leftrightarrow\\quad F_N = m \\cdot g - F \\cdot \\sin 25^{\\circ}\n$$\n\n$$\nF_N = 12 \\cdot 9.82 - 60 \\cdot \\sin 25^{\\circ} = 92.482\\ldots\\ \\mathrm{N}\n$$\n\n**Step 2: the frictional force.**\n\n$$\nF_f = \\mu \\cdot F_N = 0.30 \\cdot 92.482\\ldots = 27.744\\ldots\\ \\mathrm{N}\n$$\n\n**Step 3: Newton's second law horizontally.**\n\n$$\nF_R = F_x - F_f = F \\cdot \\cos 25^{\\circ} - F_f\n$$\n\n$$\nF_R = 60 \\cdot \\cos 25^{\\circ} - 27.744\\ldots = 26.633\\ldots\\ \\mathrm{N}\n$$\n\nAcceleration:\n\n$$\na = \\frac{F_R}{m} = \\frac{26.633\\ldots}{12} = 2.219\\ldots \\approx 2.2\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The box's acceleration is about 2.2 m/s².\n\n**General conclusion:** When a force pulls at an upward angle on an object subject to friction, it affects **both** the driving component and the normal force. There is always an **optimal angle** $\\alpha_\\text{opt}$ that maximises the acceleration: at large angles you lift the object effectively but do not pull it forwards; at small angles you pull well forwards but maximise the friction."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.6-u11",
    "question": "A front-wheel-drive car with a mass of 1 400 kg stands on dry asphalt, where the coefficient of friction between the tyres and the road is 0.90. Half of the car's weight rests on the driving front wheels.<br>a) What is the largest acceleration the car can have without the driving wheels spinning?<br>b) What is the shortest possible time from 0 to 100 km/h then?\n\n*Give the time (b) as your numerical answer in s. Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "answer": {
     "value": 6.29,
     "unit": "s",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 4.42,
      "unit": "m/s²",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 6.29,
      "unit": "s",
      "tol": 0.03
     }
    ],
    "solution": "**a) Only the normal force on the driving wheels counts.** The driving force is the friction between the driving wheels and the road, and it is limited by the normal force on **the driving wheels in particular**, which carry only half the weight:\n\n$$\nF_\\text{max} = \\mu \\cdot \\frac{m \\cdot g}{2} = 0.90 \\cdot \\frac{1\\,400 \\cdot 9.82}{2} = 6\\,186.6\\ \\mathrm{N}\n$$\n\nNewton's second law (the mass of the whole car must be accelerated):\n\n$$\nm \\cdot a_\\text{max} = \\mu \\cdot \\frac{m \\cdot g}{2} \\quad\\Leftrightarrow\\quad a_\\text{max} = \\frac{\\mu \\cdot g}{2} = \\frac{0.90 \\cdot 9.82}{2} = 4.419 \\approx 4.4\\ \\mathrm{m/s^2}\n$$\n\nNote that the mass **cancels out**: the maximum acceleration depends only on $\\mu$ and the weight distribution.\n\n**b) The shortest time to 100 km/h.** The car starts from rest with constant acceleration, so $v = a \\cdot t$. With $v = 100\\ \\mathrm{km/h} = 27.777\\ldots\\ \\mathrm{m/s}$ and the unrounded acceleration from a):\n\n$$\nt = \\frac{v}{a_\\text{max}} = \\frac{27.777\\ldots}{4.419} = 6.285\\ldots \\approx 6.3\\ \\mathrm{s}\n$$\n\n**Answer:** a) About 4.4 m/s²&emsp;&emsp;b) About 6.3 s\n\n**General conclusion:** It is **friction, not the engine**, that sets the ultimate limit for acceleration: a stronger engine does not help if the wheels spin. The formula $a_\\text{max} = \\mu g \\cdot (\\text{fraction of the weight on the driving wheels})$ explains why sports cars often have rear-wheel drive and the engine at the back (the weight shifts backwards during acceleration → more normal force on the driving wheels) and why four-wheel drive ($\\text{fraction} = 1$) accelerates best."
   }
  ]
 },
 "fy1-3.7": {
  "kalla": "99f580cee5",
  "data": [
   {
    "level": 1,
    "question": "A box with a mass of 4.0 kg lies on an inclined plane according to the figure. Calculate the component $F_1$ of the gravitational force **down the plane**. Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350.0 218.1\" style=\"max-width:350px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><polygon points=\"30,180.11106998930268 290,180.11106998930268 290,30\" fill=\"rgba(15,22,32,0.05)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"12\" y1=\"180.11106998930268\" x2=\"304\" y2=\"180.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"180.11106998930268\" x2=\"10\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"180.11106998930268\" x2=\"22\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"180.11106998930268\" x2=\"34\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"180.11106998930268\" x2=\"46\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"180.11106998930268\" x2=\"58\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"180.11106998930268\" x2=\"70\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"180.11106998930268\" x2=\"82\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"180.11106998930268\" x2=\"94\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"180.11106998930268\" x2=\"106\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"180.11106998930268\" x2=\"118\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"180.11106998930268\" x2=\"130\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"180.11106998930268\" x2=\"142\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"180.11106998930268\" x2=\"154\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"180.11106998930268\" x2=\"166\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"180.11106998930268\" x2=\"178\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"180.11106998930268\" x2=\"190\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"180.11106998930268\" x2=\"202\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"180.11106998930268\" x2=\"214\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"180.11106998930268\" x2=\"226\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"180.11106998930268\" x2=\"238\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"180.11106998930268\" x2=\"250\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"180.11106998930268\" x2=\"262\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"180.11106998930268\" x2=\"274\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"180.11106998930268\" x2=\"286\" y2=\"188.11106998930268\" stroke=\"#0f1620\" stroke-width=\"1\"/><path d=\"M 68 180.11106998930268 A 38 38 0 0 0 62.9 161.1\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"80.2\" y=\"166.7\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">30°</text><g transform=\"translate(173.0,97.5) rotate(-30)\"><rect x=\"-17\" y=\"-34\" width=\"34\" height=\"34\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/><text x=\"0\" y=\"-17\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\">4.0 kg</text></g></svg>",
    "penna": "ov-fy1-3.7-u1",
    "answer": {
     "value": 19.64,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The component down the plane is given by:\n\n$$\nF_1 = m \\cdot g \\cdot \\sin \\alpha = 4.0 \\cdot 9.82 \\cdot \\sin 30^{\\circ} = 19.64\\ \\mathrm{N} \\approx 20\\ \\mathrm{N}\n$$\n\nThe mass has two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** The component down the plane is about 20 N."
   },
   {
    "level": 1,
    "question": "A box with a mass of 4.0 kg lies on a plane inclined at 30° to the horizontal. Calculate the component $F_2$ of the gravitational force **perpendicular to the plane**. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "penna": "ov-fy1-3.7-u2",
    "answer": {
     "value": 34,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The component perpendicular to the plane is given by:\n\n$$\nF_2 = m \\cdot g \\cdot \\cos \\alpha = 4.0 \\cdot 9.82 \\cdot \\cos 30^{\\circ} = 34.017\\ldots\\ \\mathrm{N} \\approx 34\\ \\mathrm{N}\n$$\n\n**Answer:** About 34 N.\n\n**General conclusion:** $F_2$ is also equal to the **normal force** $F_N$ on the box from the inclined plane, since the box does not accelerate perpendicular to the plane."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.7-u3",
    "question": "On an inclined plane, a box slides **down the plane at constant velocity**. What is then true for the frictional force $F_f$ and the component of the gravitational force down the plane $F_1$?",
    "choices": [
     "$F_f$ is larger than $F_1$: that is why the box does not slide faster.",
     "$F_f$ is equal to $F_1$: the resultant force is zero at constant velocity.",
     "$F_f$ is smaller than $F_1$: otherwise the box would stand still.",
     "$F_f$ does not depend on the incline."
    ],
    "correct": 1,
    "solution": "At **constant velocity** the resultant force is zero according to Newton's first law. Along the inclined plane two forces act:\n- $F_1$ = $mg \\sin\\alpha$ down the plane\n- $F_f$ up the plane (friction against the direction of motion)\n\nFor $F_R = 0$ they must be equally large: $F_f = F_1$.\n\n(If $F_f$ had been larger the box would slow down; if $F_f$ had been smaller it would accelerate.)\n\n**Answer:** Option B."
   },
   {
    "level": 1,
    "question": "A skier with a mass of 65 kg (including equipment) stands still on a slope according to the figure. How large is the component of the gravitational force **along the slope**? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350.0 137.7\" style=\"max-width:350px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><polygon points=\"30,99.6667900320919 290,99.6667900320919 290,30\" fill=\"rgba(15,22,32,0.05)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"12\" y1=\"99.6667900320919\" x2=\"304\" y2=\"99.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"99.6667900320919\" x2=\"10\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"99.6667900320919\" x2=\"22\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"99.6667900320919\" x2=\"34\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"99.6667900320919\" x2=\"46\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"99.6667900320919\" x2=\"58\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"99.6667900320919\" x2=\"70\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"99.6667900320919\" x2=\"82\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"99.6667900320919\" x2=\"94\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"99.6667900320919\" x2=\"106\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"99.6667900320919\" x2=\"118\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"99.6667900320919\" x2=\"130\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"99.6667900320919\" x2=\"142\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"99.6667900320919\" x2=\"154\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"99.6667900320919\" x2=\"166\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"99.6667900320919\" x2=\"178\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"99.6667900320919\" x2=\"190\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"99.6667900320919\" x2=\"202\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"99.6667900320919\" x2=\"214\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"99.6667900320919\" x2=\"226\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"99.6667900320919\" x2=\"238\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"99.6667900320919\" x2=\"250\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"99.6667900320919\" x2=\"262\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"99.6667900320919\" x2=\"274\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"99.6667900320919\" x2=\"286\" y2=\"107.6667900320919\" stroke=\"#0f1620\" stroke-width=\"1\"/><path d=\"M 68 99.6667900320919 A 38 38 0 0 0 66.7 89.8\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"81.6\" y=\"92.9\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">15°</text><g transform=\"translate(173.0,61.4) rotate(-15)\"><rect x=\"-17\" y=\"-34\" width=\"34\" height=\"34\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/><text x=\"0\" y=\"-17\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\">65 kg</text></g></svg>",
    "penna": "ov-fy1-3.7-u4",
    "answer": {
     "value": 165.2,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The component along the plane is given by:\n\n$$\nF_1 = m \\cdot g \\cdot \\sin \\alpha = 65 \\cdot 9.82 \\cdot \\sin 15^{\\circ} = 165.20\\ldots\\ \\mathrm{N} \\approx 170\\ \\mathrm{N}\n$$\n\nThe mass and the angle have two significant figures, so the answer is rounded to two significant figures.\n\n**Answer:** About 170 N.\n\n**General conclusion:** This is the force that the skier's skis (through edge grip or poles) must resist for the skier to stand still on the slope, and the same force that accelerates the skier down the slope when they let go."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.7-u5",
    "question": "An inclined plane is made **steeper and steeper**. What happens to the components of the gravitational force $F_1$ (along the plane) and $F_2$ (perpendicular to the plane)?",
    "choices": [
     "Both are unchanged: the gravitational force does not change.",
     "$F_1$ decreases and $F_2$ increases.",
     "Both components increase.",
     "$F_1$ increases and $F_2$ decreases."
    ],
    "correct": 3,
    "solution": "The components are $F_1 = m g \\sin\\alpha$ and $F_2 = m g \\cos\\alpha$. When the angle $\\alpha$ increases, $\\sin\\alpha$ increases while $\\cos\\alpha$ decreases, so $F_1$ grows and $F_2$ shrinks.\n\nFeel free to check with the extreme cases:\n- **Flat floor** ($\\alpha = 0^{\\circ}$): $F_1 = 0$ (nothing slides on a flat floor) and $F_2 = m g$ (the whole weight is carried by the surface).\n- **Vertical wall** ($\\alpha = 90^{\\circ}$): $F_1 = m g$ (free fall along the wall) and $F_2 = 0$ (no pressure against the wall).\n\nOption A confuses the gravitational force (which is indeed unchanged) with its **components** (which depend on how we split it up).\n\n**Answer:** Option D."
   },
   {
    "level": 2,
    "question": "A 6.0 kg box slides at **constant velocity** down an inclined plane inclined at 28° to the horizontal. Calculate the coefficient of friction *μ* between the box and the plane.",
    "penna": "ov-fy1-3.7-u6",
    "answer": {
     "value": 0.53,
     "unit": "",
     "tol": 0.05
    },
    "solution": "At constant velocity, $F_f = F_1$ (equilibrium of forces along the plane). The frictional force is given by $F_f = \\mu \\cdot F_N$, and the normal force is as large as the component perpendicular to the plane, $F_N = F_2 = m \\cdot g \\cdot \\cos\\alpha$:\n\n$$\n\\mu \\cdot m \\cdot g \\cdot \\cos\\alpha = m \\cdot g \\cdot \\sin\\alpha\n$$\n\nThe mass and the gravitational field strength cancel out, and we divide by $\\cos\\alpha$:\n\n$$\n\\mu \\cdot \\cos\\alpha = \\sin\\alpha \\quad\\Leftrightarrow\\quad \\mu = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\tan\\alpha\n$$\n\n$$\n\\mu = \\tan 28^{\\circ} = 0.5317\\ldots \\approx 0.53\n$$\n\n**Answer:** The coefficient of friction is about 0.53.\n\n**General conclusion:** A box sliding at constant velocity on an inclined plane gives a very simple method of measuring the coefficient of friction: $\\mu = \\tan\\alpha$, where $\\alpha$ is the incline at which the box slides at constant velocity. The angle at which a box at rest starts to slide by itself instead gives the coefficient of static friction, which is usually somewhat larger."
   },
   {
    "level": 2,
    "question": "A sledge with a mass of 8.0 kg slides **without friction** down a plane according to the figure. What acceleration does the sledge get? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350.0 173.0\" style=\"max-width:350px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><polygon points=\"30,135.04681871714075 290,135.04681871714075 290,30\" fill=\"rgba(15,22,32,0.05)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"12\" y1=\"135.04681871714075\" x2=\"304\" y2=\"135.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"135.04681871714075\" x2=\"10\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"135.04681871714075\" x2=\"22\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"135.04681871714075\" x2=\"34\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"135.04681871714075\" x2=\"46\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"135.04681871714075\" x2=\"58\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"135.04681871714075\" x2=\"70\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"135.04681871714075\" x2=\"82\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"135.04681871714075\" x2=\"94\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"135.04681871714075\" x2=\"106\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"135.04681871714075\" x2=\"118\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"135.04681871714075\" x2=\"130\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"135.04681871714075\" x2=\"142\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"135.04681871714075\" x2=\"154\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"135.04681871714075\" x2=\"166\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"135.04681871714075\" x2=\"178\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"135.04681871714075\" x2=\"190\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"135.04681871714075\" x2=\"202\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"135.04681871714075\" x2=\"214\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"135.04681871714075\" x2=\"226\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"135.04681871714075\" x2=\"238\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"135.04681871714075\" x2=\"250\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"135.04681871714075\" x2=\"262\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"135.04681871714075\" x2=\"274\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"135.04681871714075\" x2=\"286\" y2=\"143.04681871714075\" stroke=\"#0f1620\" stroke-width=\"1\"/><path d=\"M 68 135.04681871714075 A 38 38 0 0 0 65.2 120.8\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"81.0\" y=\"125.1\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">22°</text><g transform=\"translate(173.0,77.3) rotate(-22)\"><rect x=\"-17\" y=\"-34\" width=\"34\" height=\"34\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/><text x=\"0\" y=\"-17\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\">8.0 kg</text></g></svg>",
    "penna": "ov-fy1-3.7-u7",
    "answer": {
     "value": 3.678,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "Without friction, the only force along the plane is $F_1 = m \\cdot g \\cdot \\sin\\alpha$. Newton's second law gives:\n\n$$\nF_R = m \\cdot a \\quad\\Leftrightarrow\\quad m \\cdot g \\cdot \\sin\\alpha = m \\cdot a\n$$\n\nThe mass cancels out:\n\n$$\na = g \\cdot \\sin\\alpha = 9.82 \\cdot \\sin 22^{\\circ} = 3.678\\ldots\\ \\mathrm{m/s^2} \\approx 3.7\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The acceleration is about 3.7 m/s².\n\n**General conclusion:** On a frictionless inclined plane, the acceleration depends **only on the angle**, not on the mass. This was one of Galileo's brilliant insights: he used inclined planes with small inclines to \"dilute\" the acceleration due to gravity, so that he could measure times with the primitive instruments of his day."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.7-u8",
    "question": "The platform of a lorry is tipped slowly more and more steeply so that the load will slide off. The coefficient of static friction between the crates and the platform is 0.42. At what angle of inclination do the crates start to slide?",
    "answer": {
     "value": 22.78,
     "unit": "°",
     "tol": 0.03
    },
    "solution": "The crates start to slide when the component of the gravitational force along the platform just reaches the maximum value of the static friction, $F_1 = F_f = \\mu \\cdot F_N$, where $F_N = F_2$:\n\n$$\nm \\cdot g \\cdot \\sin\\alpha = \\mu \\cdot m \\cdot g \\cdot \\cos\\alpha\n$$\n\nThe mass and the gravitational field strength cancel out, and we divide by $\\cos\\alpha$:\n\n$$\n\\sin\\alpha = \\mu \\cdot \\cos\\alpha \\quad\\Leftrightarrow\\quad \\frac{\\sin\\alpha}{\\cos\\alpha} = \\mu \\quad\\Leftrightarrow\\quad \\tan\\alpha = \\mu\n$$\n\n$$\n\\tan\\alpha = 0.42 \\quad\\Leftrightarrow\\quad \\alpha = \\arctan 0.42 = 22.78\\ldots^{\\circ} \\approx 23^{\\circ}\n$$\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350.0 178.4\" style=\"max-width:350px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><polygon points=\"30,140.36345221449722 290,140.36345221449722 290,30\" fill=\"rgba(15,22,32,0.05)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"12\" y1=\"140.36345221449722\" x2=\"304\" y2=\"140.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"140.36345221449722\" x2=\"10\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"140.36345221449722\" x2=\"22\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"140.36345221449722\" x2=\"34\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"140.36345221449722\" x2=\"46\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"140.36345221449722\" x2=\"58\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"140.36345221449722\" x2=\"70\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"140.36345221449722\" x2=\"82\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"140.36345221449722\" x2=\"94\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"140.36345221449722\" x2=\"106\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"140.36345221449722\" x2=\"118\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"140.36345221449722\" x2=\"130\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"140.36345221449722\" x2=\"142\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"140.36345221449722\" x2=\"154\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"140.36345221449722\" x2=\"166\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"140.36345221449722\" x2=\"178\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"140.36345221449722\" x2=\"190\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"140.36345221449722\" x2=\"202\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"140.36345221449722\" x2=\"214\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"140.36345221449722\" x2=\"226\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"140.36345221449722\" x2=\"238\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"140.36345221449722\" x2=\"250\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"140.36345221449722\" x2=\"262\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"140.36345221449722\" x2=\"274\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"140.36345221449722\" x2=\"286\" y2=\"148.36345221449722\" stroke=\"#0f1620\" stroke-width=\"1\"/><path d=\"M 68 140.36345221449722 A 38 38 0 0 0 65.0 125.5\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"81.0\" y=\"130.0\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">23°</text><g transform=\"translate(173.0,79.7) rotate(-23)\"><rect x=\"-17\" y=\"-34\" width=\"34\" height=\"34\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/></g><line x1=\"166.4\" y1=\"64.0\" x2=\"166.4\" y2=\"120.0\" stroke=\"#1c3d6b\" stroke-width=\"2\"/><polygon points=\"166.4,120.0 162.9,112.8 169.8,112.8\" fill=\"#1c3d6b\"/><text x=\"166.4\" y=\"130.0\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">G</tspan></text><line x1=\"166.4\" y1=\"64.0\" x2=\"149.2\" y2=\"23.5\" stroke=\"#1c3d6b\" stroke-width=\"2\"/><polygon points=\"149.2,23.5 155.2,28.8 148.8,31.5\" fill=\"#1c3d6b\"/><text x=\"145.3\" y=\"14.3\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">N</tspan></text><line x1=\"166.4\" y1=\"64.0\" x2=\"129.5\" y2=\"79.6\" stroke=\"#1c3d6b\" stroke-width=\"2\"/><polygon points=\"129.5,79.6 134.8,73.6 137.5,80.0\" fill=\"#1c3d6b\"/><text x=\"120.3\" y=\"83.6\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">1</tspan></text><line x1=\"166.4\" y1=\"64.0\" x2=\"203.2\" y2=\"48.4\" stroke=\"#1c3d6b\" stroke-width=\"2\"/><polygon points=\"203.2,48.4 197.9,54.4 195.2,48.0\" fill=\"#1c3d6b\"/><text x=\"212.4\" y=\"44.5\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#1c3d6b\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">f</tspan></text></svg>\n\n**Answer:** At about 23° the crates start to slide.\n\n**General conclusion:** The limiting angle $\\alpha = \\arctan\\mu$ is called **the angle of friction** and depends neither on the mass of the load nor on anything else about the platform's material: only on the coefficient of friction. The relationship is used in reverse as a simple method of measurement: tip the surface until the object starts to slide and read off the angle; then $\\mu = \\tan\\alpha$."
   },
   {
    "level": 2,
    "question": "A snowboarder glides from rest down a slope inclined at 12° to the horizontal. The coefficient of friction between the board and the snow is 0.10.\n\na) What acceleration does the snowboarder get?\n\nb) What speed does the snowboarder have after 80 m on the slope?\n\n*Give the speed (b) as your numerical answer in m/s. Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "penna": "ov-fy1-3.7-u9",
    "answer": {
     "value": 13.15,
     "unit": "m/s",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.08,
      "unit": "m/s²",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 13.15,
      "unit": "m/s",
      "tol": 0.03
     }
    ],
    "solution": "**a) The acceleration.** Along the plane, $F_1 = m \\cdot g \\cdot \\sin\\alpha$ acts down the plane and the friction $F_f = \\mu \\cdot F_N = \\mu \\cdot m \\cdot g \\cdot \\cos\\alpha$ acts up the plane. Newton's second law gives\n\n$$\nF_1 - F_f = m \\cdot a \\quad\\Leftrightarrow\\quad m \\cdot g \\cdot \\sin\\alpha - \\mu \\cdot m \\cdot g \\cdot \\cos\\alpha = m \\cdot a\n$$\n\nThe mass cancels out:\n\n$$\na = g \\cdot \\sin\\alpha - \\mu \\cdot g \\cdot \\cos\\alpha\n= 9.82 \\cdot \\sin 12^{\\circ} - 0.10 \\cdot 9.82 \\cdot \\cos 12^{\\circ}\n$$\n\n$$\na = 1.081\\ldots\\ \\mathrm{m/s^2} \\approx 1.1\\ \\mathrm{m/s^2}\n$$\n\n**b) The speed after 80 m.** Torricelli's equation from rest ($v_0 = 0$) gives $v^2 = 2 \\cdot a \\cdot s$. The acceleration is taken unrounded from a):\n\n$$\nv = \\sqrt{2 \\cdot a \\cdot s} = \\sqrt{2 \\cdot 1.081\\ldots \\cdot 80} = 13.15\\ldots\\ \\mathrm{m/s} \\approx 13\\ \\mathrm{m/s}\n$$\n\n**Answer:** a) About 1.1 m/s²&emsp;&emsp;b) About 13 m/s, roughly 47 km/h.\n\n**General conclusion:** So a seemingly modest slope (12°) and a long gliding distance are enough for a good speed. Compare with the frictionless case: without friction the acceleration would have been $g \\sin 12^{\\circ} \\approx 2.0\\ \\mathrm{m/s^2}$: the friction of the snow \"eats up\" almost half the acceleration."
   },
   {
    "level": 3,
    "question": "Elvira places a box with a mass of 6.0 kg on an inclined plane according to the figure. The coefficient of friction between the box and the plane is 0.35.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350.0 224.2\" style=\"max-width:350px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><polygon points=\"30,186.2237609471657 290,186.2237609471657 290,30\" fill=\"rgba(15,22,32,0.05)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"12\" y1=\"186.2237609471657\" x2=\"304\" y2=\"186.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"186.2237609471657\" x2=\"10\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"186.2237609471657\" x2=\"22\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"186.2237609471657\" x2=\"34\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"186.2237609471657\" x2=\"46\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"186.2237609471657\" x2=\"58\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"186.2237609471657\" x2=\"70\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"186.2237609471657\" x2=\"82\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"186.2237609471657\" x2=\"94\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"186.2237609471657\" x2=\"106\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"186.2237609471657\" x2=\"118\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"186.2237609471657\" x2=\"130\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"186.2237609471657\" x2=\"142\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"186.2237609471657\" x2=\"154\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"186.2237609471657\" x2=\"166\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"186.2237609471657\" x2=\"178\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"186.2237609471657\" x2=\"190\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"186.2237609471657\" x2=\"202\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"186.2237609471657\" x2=\"214\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"186.2237609471657\" x2=\"226\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"186.2237609471657\" x2=\"238\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"186.2237609471657\" x2=\"250\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"186.2237609471657\" x2=\"262\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"186.2237609471657\" x2=\"274\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"186.2237609471657\" x2=\"286\" y2=\"194.2237609471657\" stroke=\"#0f1620\" stroke-width=\"1\"/><path d=\"M 68 186.2237609471657 A 38 38 0 0 0 62.6 166.7\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"80.1\" y=\"172.3\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">31°</text><g transform=\"translate(173.0,100.3) rotate(-31)\"><rect x=\"-17\" y=\"-34\" width=\"34\" height=\"34\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/><text x=\"0\" y=\"-17\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\">6.0 kg</text></g></svg>\n\na) Show that the box **accelerates down the plane** (the force down the plane is larger than the maximum friction).\n\nb) Calculate the box's acceleration down the plane.\n\n*Give the acceleration from (b) as your numerical answer in m/s². Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "penna": "ov-fy1-3.7-u10",
    "answer": {
     "value": 2.111,
     "unit": "m/s²",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a"
     },
     {
      "del": "b",
      "value": 2.111,
      "unit": "m/s²",
      "tol": 0.03
     }
    ],
    "solution": "**a) Check that the box slides.** Calculate $F_1$ (the driving force down the plane) and the maximum value of the friction $F_{f,\\max}$:\n\n$$\nF_1 = m \\cdot g \\cdot \\sin\\alpha = 6.0 \\cdot 9.82 \\cdot \\sin 31^{\\circ} = 30.346\\ldots\\ \\mathrm{N}\n$$\n\n$$\nF_{f,\\max} = \\mu \\cdot m \\cdot g \\cdot \\cos\\alpha = 0.35 \\cdot 6.0 \\cdot 9.82 \\cdot \\cos 31^{\\circ} = 17.676\\ldots\\ \\mathrm{N}\n$$\n\nSince $F_1 > F_{f,\\max}$ (about 30 N against at most 18 N), the box will accelerate down the plane.\n\nAlternative check: compare $\\tan\\alpha$ with $\\mu$. If $\\tan\\alpha > \\mu$, the box slides. $\\tan 31^{\\circ} \\approx 0.60 > 0.35$ ✓.\n\n**b) Acceleration.** Newton's second law gives\n\n$$\nF_R = m \\cdot a \\quad\\Leftrightarrow\\quad a = \\frac{F_R}{m}\n$$\n\nThe resultant force down the plane is $F_1$ minus the friction. Both values are taken unrounded from a):\n\n$$\n\\left[ \\begin{array}{l}\nF_R = F_1 - F_f = 30.346\\ldots\\ \\mathrm{N} - 17.676\\ldots\\ \\mathrm{N} = 12.669\\ldots\\ \\mathrm{N} \\\\\nm = 6.0\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{12.669\\ldots}{6.0} = 2.111\\ldots\\ \\mathrm{m/s^2} \\approx 2.1\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** a) $F_1 \\approx 30$ N $>$ $F_{f,\\max} \\approx 18$ N, so the box accelerates.&emsp;&emsp;b) The acceleration is about 2.1 m/s² down the plane.\n\n**General conclusion:** In general, for a box on an inclined plane with friction:\n\n$$\na = g (\\sin\\alpha - \\mu \\cos\\alpha)\n$$\n\n- If $\\tan\\alpha > \\mu$: the box slides and accelerates.\n- If $\\tan\\alpha = \\mu$: the box slides at constant velocity (if it is already moving).\n- If $\\tan\\alpha < \\mu$: the box stands still.\n\nNote that the mass cancels out: the acceleration on an inclined plane with friction does **not depend on the box's mass**."
   },
   {
    "level": 3,
    "question": "A block is pushed **up** an inclined plane with an initial speed of 5.0 m/s. The plane is inclined at 28° to the horizontal and the coefficient of friction between the block and the plane is 0.25.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 350.0 206.2\" style=\"max-width:350px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><polygon points=\"30,168.24445223198447 290,168.24445223198447 290,30\" fill=\"rgba(15,22,32,0.05)\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"12\" y1=\"168.24445223198447\" x2=\"304\" y2=\"168.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"168.24445223198447\" x2=\"10\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"168.24445223198447\" x2=\"22\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"168.24445223198447\" x2=\"34\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"168.24445223198447\" x2=\"46\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"168.24445223198447\" x2=\"58\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"168.24445223198447\" x2=\"70\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"168.24445223198447\" x2=\"82\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"168.24445223198447\" x2=\"94\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"168.24445223198447\" x2=\"106\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"168.24445223198447\" x2=\"118\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"168.24445223198447\" x2=\"130\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"168.24445223198447\" x2=\"142\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"168.24445223198447\" x2=\"154\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"168.24445223198447\" x2=\"166\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"168.24445223198447\" x2=\"178\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"168.24445223198447\" x2=\"190\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"168.24445223198447\" x2=\"202\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"168.24445223198447\" x2=\"214\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"168.24445223198447\" x2=\"226\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"168.24445223198447\" x2=\"238\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"168.24445223198447\" x2=\"250\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"168.24445223198447\" x2=\"262\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"168.24445223198447\" x2=\"274\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"168.24445223198447\" x2=\"286\" y2=\"176.24445223198447\" stroke=\"#0f1620\" stroke-width=\"1\"/><path d=\"M 68 168.24445223198447 A 38 38 0 0 0 63.6 150.4\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"80.5\" y=\"155.7\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">28°</text><g transform=\"translate(173.0,92.2) rotate(-28)\"><rect x=\"-17\" y=\"-34\" width=\"34\" height=\"34\" fill=\"#fafaf5\" stroke=\"#0f1620\" stroke-width=\"1.6\" rx=\"2\"/></g></svg>\n\na) How far up along the plane does the block slide before it turns?\n\nb) Does the block stay at the turning point, or does it slide down again? Justify with a calculation.\n\n*Give the distance (a) as your numerical answer in m. Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "penna": "ov-fy1-3.7-u11",
    "answer": {
     "value": 1.844,
     "unit": "m",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1.844,
      "unit": "m",
      "tol": 0.03
     },
     {
      "del": "b"
     }
    ],
    "solution": "**The trap in the problem:** friction always acts **against the direction of motion**. On the way up the block slides up the plane: then the friction points *down* the plane and **works together** with the component of the gravitational force to slow the block down. So it is not the same acceleration as when a block slides down!\n\n**a) The distance up the plane.** On the way up the block is slowed down by both $F_1 = m g \\sin\\alpha$ and $F_f = \\mu m g \\cos\\alpha$, both directed down the plane. With the positive direction up the plane, Newton's second law gives $m \\cdot a = -(m \\cdot g \\cdot \\sin\\alpha + \\mu \\cdot m \\cdot g \\cdot \\cos\\alpha)$, and the mass cancels out.\n\nTorricelli's equation with $v = 0$ at the turning point:\n\n$$\nv^2 - v_0^2 = 2 \\cdot a \\cdot s \\quad\\Leftrightarrow\\quad s = \\frac{v^2 - v_0^2}{2 \\cdot a}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nv = 0 \\\\\nv_0 = 5.0\\ \\mathrm{m/s} \\\\\na = -(g \\cdot \\sin\\alpha + \\mu \\cdot g \\cdot \\cos\\alpha) = -(9.82 \\cdot \\sin 28^{\\circ} + 0.25 \\cdot 9.82 \\cdot \\cos 28^{\\circ}) = -6.777\\ldots\\ \\mathrm{m/s^2}\n\\end{array} \\right]\n$$\n\n$$\ns = \\frac{0^2 - 5.0^2}{2 \\cdot (-6.777\\ldots)} = 1.844\\ldots\\ \\mathrm{m} \\approx 1.8\\ \\mathrm{m}\n$$\n\n**b) Does it slide down again?** At the turning point the block stands still for an instant. It slides down if the component of the gravitational force along the plane exceeds the maximum value of the static friction:\n\n$$\nF_1 > \\mu \\cdot F_N \\quad\\Leftrightarrow\\quad m \\cdot g \\cdot \\sin\\alpha > \\mu \\cdot m \\cdot g \\cdot \\cos\\alpha\n$$\n\nThe mass and the gravitational field strength cancel out, and we divide by $\\cos\\alpha$ (which is positive):\n\n$$\n\\sin\\alpha > \\mu \\cdot \\cos\\alpha \\quad\\Leftrightarrow\\quad \\frac{\\sin\\alpha}{\\cos\\alpha} > \\mu \\quad\\Leftrightarrow\\quad \\tan\\alpha > \\mu\n$$\n\n$$\n\\tan 28^{\\circ} = 0.5317\\ldots > 0.25\n$$\n\nSo the block slides **down again**, now with the friction directed *up* the plane, and with the smaller acceleration $a = g(\\sin\\alpha - \\mu\\cos\\alpha) = 2.442\\ldots\\ \\mathrm{m/s^2} \\approx 2.4\\ \\mathrm{m/s^2}$.\n\n**Answer:** a) About 1.8 m&emsp;&emsp;b) Yes, since $\\tan 28^{\\circ} > \\mu$ it slides down again.\n\n**General conclusion:** Up and down are **not** symmetric when there is friction: on the way up $g(\\sin\\alpha + \\mu\\cos\\alpha)$ slows the block down, on the way down only $g(\\sin\\alpha - \\mu\\cos\\alpha)$ drives it. The block therefore returns to the starting point with a **lower** speed than it was pushed off with: the friction has converted the difference in kinetic energy into heat. Getting the direction of the friction wrong in the upward phase is one of the most common mistakes in tests."
   }
  ]
 },
 "fy1-3.8": {
  "kalla": "23d8950bc6",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.8-u1",
    "question": "A lamp with a mass of 2.0 kg hangs still from two ropes of equal length according to the figure. How large is the tension in each rope? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 468.0 202.1\" style=\"max-width:468px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30.0\" y1=\"34.0\" x2=\"438.0\" y2=\"34.0\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"34.0\" y1=\"34.0\" x2=\"41.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"46.0\" y1=\"34.0\" x2=\"53.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"34.0\" x2=\"65.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"34.0\" x2=\"77.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"82.0\" y1=\"34.0\" x2=\"89.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"94.0\" y1=\"34.0\" x2=\"101.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"106.0\" y1=\"34.0\" x2=\"113.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"118.0\" y1=\"34.0\" x2=\"125.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"130.0\" y1=\"34.0\" x2=\"137.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"142.0\" y1=\"34.0\" x2=\"149.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"154.0\" y1=\"34.0\" x2=\"161.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"166.0\" y1=\"34.0\" x2=\"173.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"178.0\" y1=\"34.0\" x2=\"185.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"190.0\" y1=\"34.0\" x2=\"197.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"202.0\" y1=\"34.0\" x2=\"209.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"214.0\" y1=\"34.0\" x2=\"221.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"226.0\" y1=\"34.0\" x2=\"233.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"238.0\" y1=\"34.0\" x2=\"245.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"250.0\" y1=\"34.0\" x2=\"257.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"262.0\" y1=\"34.0\" x2=\"269.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"274.0\" y1=\"34.0\" x2=\"281.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"286.0\" y1=\"34.0\" x2=\"293.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"298.0\" y1=\"34.0\" x2=\"305.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"310.0\" y1=\"34.0\" x2=\"317.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"322.0\" y1=\"34.0\" x2=\"329.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"334.0\" y1=\"34.0\" x2=\"341.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"346.0\" y1=\"34.0\" x2=\"353.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"358.0\" y1=\"34.0\" x2=\"365.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"370.0\" y1=\"34.0\" x2=\"377.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"382.0\" y1=\"34.0\" x2=\"389.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"394.0\" y1=\"34.0\" x2=\"401.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"406.0\" y1=\"34.0\" x2=\"413.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"418.0\" y1=\"34.0\" x2=\"425.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"430.0\" y1=\"34.0\" x2=\"437.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"34.0\" x2=\"234.0\" y2=\"132.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"404.0\" y1=\"34.0\" x2=\"234.0\" y2=\"132.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"234.0\" y1=\"132.1\" x2=\"234.0\" y2=\"156.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><circle cx=\"234.0\" cy=\"132.1\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"209.0\" y=\"156.1\" width=\"50\" height=\"32\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"234.0\" y=\"176.6\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">2.0 kg</text><line x1=\"182.0\" y1=\"132.1\" x2=\"286.0\" y2=\"132.1\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 200.0 132.1 A 34 34 0 0 1 204.6 115.1\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><path d=\"M 263.4 115.1 A 34 34 0 0 1 268.0 132.1\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"186.7\" y=\"124.0\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\">30°</text><text x=\"281.3\" y=\"124.0\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\">30°</text></svg>",
    "answer": {
     "value": 20,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The lamp hangs still, so the **vertical components** of the ropes must together be as large as the gravitational force. The figure is symmetric, so each rope carries half the weight.\n\n$$\nF_\\mathrm{G} = m \\cdot g = 2.0 \\cdot 9.82 = 19.64\\ \\mathrm{N}\n$$\n\nThe vertical component is the leg opposite the angle to the horizontal, that is, $F_\\mathrm{S} \\cdot \\sin 30^{\\circ}$. Two ropes give\n\n$$\n2 \\cdot F_\\mathrm{S} \\cdot \\sin 30^{\\circ} = F_\\mathrm{G}\n\\quad\\Leftrightarrow\\quad\nF_\\mathrm{S} = \\frac{F_\\mathrm{G}}{2 \\cdot \\sin 30^{\\circ}}\n$$\n\n$$\nF_\\mathrm{S} = \\frac{19.64}{2 \\cdot 0.5} = 19.64\\ \\mathrm{N} \\approx 20\\ \\mathrm{N}\n$$\n\n**Answer:** The tension in each rope is about 20 N.\n\n**General conclusion:** At exactly 30°, the tension in each rope is as large as the whole weight of the lamp, even though two ropes share the load. This is because only half of each rope's force points upwards."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.8-u2",
    "question": "A picture hangs from two slanting strings. The strings are replaced by longer strings, so that they become **flatter** (the angle to the horizontal becomes smaller). What happens to the tension in the strings?",
    "choices": [
     "It is unchanged, since the picture weighs as much as before.",
     "It decreases, since the strings slope less.",
     "It increases, since each string must give the same vertical component even though it slopes less upwards.",
     "It increases in one string and decreases in the other."
    ],
    "correct": 2,
    "solution": "The picture hangs still, so the vertical components of the strings must together carry the gravitational force, no matter how the strings slope. The vertical component is $F_\\mathrm{S} \\cdot \\sin \\alpha$. When the angle $\\alpha$ becomes smaller, $\\sin \\alpha$ becomes smaller, and then $F_\\mathrm{S}$ must become **larger** for the product to be as large as before.\n\nThe option \"unchanged\" confuses the gravitational force, which is indeed the same, with the tension, which depends on the angle.\n\n**Answer:** The tension increases."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.8-u3",
    "question": "A rope pulls on a box with a tension of 40 N according to the figure. How large is the **horizontal** component of the tension?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 227.5 127.6\" style=\"max-width:228px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"11\" y=\"92.61892187851191\" width=\"24\" height=\"24\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"104.61892187851191\" x2=\"183.0\" y2=\"104.61892187851191\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 71.0 104.6 A 48 48 0 0 0 66.5 84.3\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"83.5\" y=\"91.2\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">25°</text><line x1=\"23\" y1=\"104.61892187851191\" x2=\"168.0\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"168.0,37.0 161.7,44.7 158.0,36.9\" fill=\"#c8324a\"/><text x=\"168.0\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan><tspan baseline-shift=\"sub\" font-size=\"0.72em\">S</tspan> = 40 N</text></svg>",
    "answer": {
     "value": 36,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The tension is the hypotenuse of a right-angled triangle. The horizontal component lies **next to** the angle 25°, so it is the adjacent leg and is found with cosine.\n\n$$\nF_x = F_\\mathrm{S} \\cdot \\cos 25^{\\circ} = 40 \\cdot \\cos 25^{\\circ} = 36.252\\ldots\\ \\mathrm{N} \\approx 36\\ \\mathrm{N}\n$$\n\n**Answer:** The horizontal component is about 36 N.\n\n**General conclusion:** The vertical component lies opposite the angle and is found with sine: $F_y = 40 \\cdot \\sin 25^{\\circ} \\approx 17\\ \\mathrm{N}$. Always check which component lies next to the angle before you choose sine or cosine."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.8-u4",
    "question": "A wet jacket with a mass of 1.5 kg hangs in the middle of a washing line according to the figure. How large is the tension in the line? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 528.0 146.1\" style=\"max-width:528px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"60.0\" y=\"30.0\" width=\"8\" height=\"106.1\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><rect x=\"460.0\" y=\"30.0\" width=\"8\" height=\"106.1\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><line x1=\"24\" y1=\"136.1081669404783\" x2=\"504\" y2=\"136.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"30\" y1=\"136.1081669404783\" x2=\"23\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"42\" y1=\"136.1081669404783\" x2=\"35\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"54\" y1=\"136.1081669404783\" x2=\"47\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"66\" y1=\"136.1081669404783\" x2=\"59\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"78\" y1=\"136.1081669404783\" x2=\"71\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"90\" y1=\"136.1081669404783\" x2=\"83\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"102\" y1=\"136.1081669404783\" x2=\"95\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"114\" y1=\"136.1081669404783\" x2=\"107\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"126\" y1=\"136.1081669404783\" x2=\"119\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"138\" y1=\"136.1081669404783\" x2=\"131\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"150\" y1=\"136.1081669404783\" x2=\"143\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"162\" y1=\"136.1081669404783\" x2=\"155\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"174\" y1=\"136.1081669404783\" x2=\"167\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"186\" y1=\"136.1081669404783\" x2=\"179\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"198\" y1=\"136.1081669404783\" x2=\"191\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"210\" y1=\"136.1081669404783\" x2=\"203\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"222\" y1=\"136.1081669404783\" x2=\"215\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"234\" y1=\"136.1081669404783\" x2=\"227\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"246\" y1=\"136.1081669404783\" x2=\"239\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"258\" y1=\"136.1081669404783\" x2=\"251\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"270\" y1=\"136.1081669404783\" x2=\"263\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"282\" y1=\"136.1081669404783\" x2=\"275\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"294\" y1=\"136.1081669404783\" x2=\"287\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"306\" y1=\"136.1081669404783\" x2=\"299\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"318\" y1=\"136.1081669404783\" x2=\"311\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"330\" y1=\"136.1081669404783\" x2=\"323\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"342\" y1=\"136.1081669404783\" x2=\"335\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"354\" y1=\"136.1081669404783\" x2=\"347\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"366\" y1=\"136.1081669404783\" x2=\"359\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"378\" y1=\"136.1081669404783\" x2=\"371\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"390\" y1=\"136.1081669404783\" x2=\"383\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"402\" y1=\"136.1081669404783\" x2=\"395\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"414\" y1=\"136.1081669404783\" x2=\"407\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"426\" y1=\"136.1081669404783\" x2=\"419\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"438\" y1=\"136.1081669404783\" x2=\"431\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"450\" y1=\"136.1081669404783\" x2=\"443\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"462\" y1=\"136.1081669404783\" x2=\"455\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"474\" y1=\"136.1081669404783\" x2=\"467\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"486\" y1=\"136.1081669404783\" x2=\"479\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"498\" y1=\"136.1081669404783\" x2=\"491\" y2=\"144.1081669404783\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"30.0\" x2=\"264.0\" y2=\"58.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"464.0\" y1=\"30.0\" x2=\"264.0\" y2=\"58.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"264.0\" y1=\"58.1\" x2=\"264.0\" y2=\"82.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><circle cx=\"264.0\" cy=\"58.1\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"239.0\" y=\"82.1\" width=\"50\" height=\"32\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"264.0\" y=\"102.6\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">1.5 kg</text><circle cx=\"64.0\" cy=\"30.0\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"464.0\" cy=\"30.0\" r=\"2.6\" fill=\"#0f1620\"/><line x1=\"184.0\" y1=\"58.1\" x2=\"344.0\" y2=\"58.1\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 202.0 58.1 A 62 62 0 0 1 202.6 49.5\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><path d=\"M 325.4 49.5 A 62 62 0 0 1 326.0 58.1\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"198.0\" y=\"73.1\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"end\">8°</text><text x=\"330.0\" y=\"73.1\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"start\">8°</text></svg>",
    "answer": {
     "value": 53,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The jacket hangs still. The two halves of the line slope equally, so each carries half the weight with its vertical component.\n\n$$\nF_\\mathrm{G} = m \\cdot g = 1.5 \\cdot 9.82 = 14.73\\ \\mathrm{N}\n$$\n\nThe vertical component of the tension in one half is $F_\\mathrm{S} \\cdot \\sin 8.0^{\\circ}$, and the two halves together carry the weight:\n\n$$\n2 \\cdot F_\\mathrm{S} \\cdot \\sin 8.0^{\\circ} = F_\\mathrm{G}\n\\quad\\Leftrightarrow\\quad\nF_\\mathrm{S} = \\frac{F_\\mathrm{G}}{2 \\cdot \\sin 8.0^{\\circ}}\n$$\n\n$$\nF_\\mathrm{S} = \\frac{14.73}{2 \\cdot \\sin 8.0^{\\circ}} = 52.919\\ldots\\ \\mathrm{N} \\approx 53\\ \\mathrm{N}\n$$\n\nReasonableness: the line is almost horizontal, so only a small part of the tension points upwards. Then the tension must be much larger than the weight, and 53 N is about 3.6 times the weight of the jacket.\n\n**Answer:** The tension in the line is about 53 N.\n\n**General conclusion:** The tighter you pull a line, the less it sags, but it can never become completely straight with something hanging on it. Then the angle would be 0 and the sine 0, and no tension in the world would be enough to carry the weight."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.8-u5",
    "question": "A street lamp with a mass of 3.0 kg hangs in the middle of a cable between two posts. The distance between the posts is 4.0 m, and the lamp makes the cable sag 0.50 m below the line between the attachment points. How large is the tension in the cable? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 568.0 193.0\" style=\"max-width:568px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"60.0\" y=\"30.0\" width=\"8\" height=\"153.0\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><rect x=\"500.0\" y=\"30.0\" width=\"8\" height=\"153.0\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><line x1=\"24\" y1=\"183.01532580189803\" x2=\"544\" y2=\"183.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"30\" y1=\"183.01532580189803\" x2=\"23\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"42\" y1=\"183.01532580189803\" x2=\"35\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"54\" y1=\"183.01532580189803\" x2=\"47\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"66\" y1=\"183.01532580189803\" x2=\"59\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"78\" y1=\"183.01532580189803\" x2=\"71\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"90\" y1=\"183.01532580189803\" x2=\"83\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"102\" y1=\"183.01532580189803\" x2=\"95\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"114\" y1=\"183.01532580189803\" x2=\"107\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"126\" y1=\"183.01532580189803\" x2=\"119\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"138\" y1=\"183.01532580189803\" x2=\"131\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"150\" y1=\"183.01532580189803\" x2=\"143\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"162\" y1=\"183.01532580189803\" x2=\"155\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"174\" y1=\"183.01532580189803\" x2=\"167\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"186\" y1=\"183.01532580189803\" x2=\"179\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"198\" y1=\"183.01532580189803\" x2=\"191\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"210\" y1=\"183.01532580189803\" x2=\"203\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"222\" y1=\"183.01532580189803\" x2=\"215\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"234\" y1=\"183.01532580189803\" x2=\"227\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"246\" y1=\"183.01532580189803\" x2=\"239\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"258\" y1=\"183.01532580189803\" x2=\"251\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"270\" y1=\"183.01532580189803\" x2=\"263\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"282\" y1=\"183.01532580189803\" x2=\"275\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"294\" y1=\"183.01532580189803\" x2=\"287\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"306\" y1=\"183.01532580189803\" x2=\"299\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"318\" y1=\"183.01532580189803\" x2=\"311\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"330\" y1=\"183.01532580189803\" x2=\"323\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"342\" y1=\"183.01532580189803\" x2=\"335\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"354\" y1=\"183.01532580189803\" x2=\"347\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"366\" y1=\"183.01532580189803\" x2=\"359\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"378\" y1=\"183.01532580189803\" x2=\"371\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"390\" y1=\"183.01532580189803\" x2=\"383\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"402\" y1=\"183.01532580189803\" x2=\"395\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"414\" y1=\"183.01532580189803\" x2=\"407\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"426\" y1=\"183.01532580189803\" x2=\"419\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"438\" y1=\"183.01532580189803\" x2=\"431\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"450\" y1=\"183.01532580189803\" x2=\"443\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"462\" y1=\"183.01532580189803\" x2=\"455\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"474\" y1=\"183.01532580189803\" x2=\"467\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"486\" y1=\"183.01532580189803\" x2=\"479\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"498\" y1=\"183.01532580189803\" x2=\"491\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"510\" y1=\"183.01532580189803\" x2=\"503\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"522\" y1=\"183.01532580189803\" x2=\"515\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"534\" y1=\"183.01532580189803\" x2=\"527\" y2=\"191.01532580189803\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"68.0\" y1=\"173.0\" x2=\"500.0\" y2=\"173.0\" stroke=\"#8a8579\" stroke-width=\"1.3\"/><polygon points=\"68.0,173.0 75.0,169.5 75.0,176.5\" fill=\"#8a8579\"/><polygon points=\"500.0,173.0 493.0,169.5 493.0,176.5\" fill=\"#8a8579\"/><text x=\"284.0\" y=\"167.0\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\">4.0 m</text><line x1=\"64.0\" y1=\"30.0\" x2=\"284.0\" y2=\"85.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"504.0\" y1=\"30.0\" x2=\"284.0\" y2=\"85.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"284.0\" y1=\"85.0\" x2=\"284.0\" y2=\"109.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><circle cx=\"284.0\" cy=\"85.0\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"259.0\" y=\"109.0\" width=\"50\" height=\"32\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"284.0\" y=\"129.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">3.0 kg</text><circle cx=\"64.0\" cy=\"30.0\" r=\"2.6\" fill=\"#0f1620\"/><circle cx=\"504.0\" cy=\"30.0\" r=\"2.6\" fill=\"#0f1620\"/><line x1=\"64.0\" y1=\"30.0\" x2=\"504.0\" y2=\"30.0\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><line x1=\"284.0\" y1=\"31.0\" x2=\"284.0\" y2=\"81.0\" stroke=\"#8a8579\" stroke-width=\"1.3\"/><polygon points=\"284.0,31.0 280.5,38.0 287.5,38.0\" fill=\"#8a8579\"/><polygon points=\"284.0,81.0 280.5,74.0 287.5,74.0\" fill=\"#8a8579\"/><text x=\"276.0\" y=\"62.0\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"end\">0.50 m</text></svg>",
    "answer": {
     "value": 61,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "**The angle.** The lamp hangs in the middle of the cable, so each half forms a right-angled triangle with the horizontal leg 2.0 m (half the distance) and the vertical leg 0.50 m. The angle $\\alpha$ to the horizontal is given by\n\n$$\n\\tan \\alpha = \\frac{0.50}{2.0} = 0.25\n\\quad\\Leftrightarrow\\quad\n\\alpha = \\tan^{-1} 0.25 = 14.036\\ldots^{\\circ}\n$$\n\n**The tension.** The vertical components of the two halves together carry the weight of the lamp:\n\n$$\nF_\\mathrm{G} = m \\cdot g = 3.0 \\cdot 9.82 = 29.46\\ \\mathrm{N}\n$$\n\n$$\n2 \\cdot F_\\mathrm{S} \\cdot \\sin \\alpha = F_\\mathrm{G}\n\\quad\\Leftrightarrow\\quad\nF_\\mathrm{S} = \\frac{F_\\mathrm{G}}{2 \\cdot \\sin \\alpha}\n$$\n\n$$\nF_\\mathrm{S} = \\frac{29.46}{2 \\cdot \\sin 14.036\\ldots^{\\circ}} = 60.733\\ldots\\ \\mathrm{N} \\approx 61\\ \\mathrm{N}\n$$\n\n**Answer:** The tension in the cable is about 61 N.\n\n**General conclusion:** The angle was not given in the problem but had to be found from the measurements. That is common in reality: it is easier to measure how much a line sags than to measure its angle."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.8-u6",
    "question": "A box with a mass of 10 kg hangs still from two ropes according to the figure. Rope 1 forms an angle of 60° and rope 2 an angle of 30° with the horizontal.<br>a) Determine the tension in rope 1.<br>b) Determine the tension in rope 2.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 354.7 202.1\" style=\"max-width:355px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"30.0\" y1=\"34.0\" x2=\"324.7\" y2=\"34.0\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"34.0\" y1=\"34.0\" x2=\"41.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"46.0\" y1=\"34.0\" x2=\"53.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"58.0\" y1=\"34.0\" x2=\"65.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"70.0\" y1=\"34.0\" x2=\"77.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"82.0\" y1=\"34.0\" x2=\"89.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"94.0\" y1=\"34.0\" x2=\"101.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"106.0\" y1=\"34.0\" x2=\"113.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"118.0\" y1=\"34.0\" x2=\"125.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"130.0\" y1=\"34.0\" x2=\"137.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"142.0\" y1=\"34.0\" x2=\"149.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"154.0\" y1=\"34.0\" x2=\"161.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"166.0\" y1=\"34.0\" x2=\"173.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"178.0\" y1=\"34.0\" x2=\"185.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"190.0\" y1=\"34.0\" x2=\"197.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"202.0\" y1=\"34.0\" x2=\"209.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"214.0\" y1=\"34.0\" x2=\"221.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"226.0\" y1=\"34.0\" x2=\"233.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"238.0\" y1=\"34.0\" x2=\"245.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"250.0\" y1=\"34.0\" x2=\"257.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"262.0\" y1=\"34.0\" x2=\"269.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"274.0\" y1=\"34.0\" x2=\"281.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"286.0\" y1=\"34.0\" x2=\"293.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"298.0\" y1=\"34.0\" x2=\"305.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"310.0\" y1=\"34.0\" x2=\"317.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"322.0\" y1=\"34.0\" x2=\"329.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64.0\" y1=\"34.0\" x2=\"120.7\" y2=\"132.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"290.7\" y1=\"34.0\" x2=\"120.7\" y2=\"132.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"120.7\" y1=\"132.1\" x2=\"120.7\" y2=\"156.1\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><circle cx=\"120.7\" cy=\"132.1\" r=\"2.6\" fill=\"#0f1620\"/><rect x=\"95.7\" y=\"156.1\" width=\"50\" height=\"32\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"120.7\" y=\"176.6\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">10 kg</text><text x=\"56.0\" y=\"52.0\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\">rope 1</text><text x=\"298.7\" y=\"52.0\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"start\">rope 2</text><line x1=\"68.7\" y1=\"132.1\" x2=\"172.7\" y2=\"132.1\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 86.7 132.1 A 34 34 0 0 1 103.7 102.7\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><path d=\"M 150.1 115.1 A 34 34 0 0 1 154.7 132.1\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"78.2\" y=\"112.1\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\">60°</text><text x=\"168.0\" y=\"124.0\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\">30°</text></svg>\n\n*Give the tension in rope 1 (a) as your numerical answer in N. Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "answer": {
     "value": 85,
     "unit": "N",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 85,
      "unit": "N",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 49.1,
      "unit": "N",
      "tol": 0.03
     }
    ],
    "solution": "The ropes slope by different amounts, so they do **not** carry half the weight each. We call the tensions $F_\\mathrm{S1}$ and $F_\\mathrm{S2}$ and set up a condition in each direction.\n\n**Horizontally:** the box is still sideways, so the horizontal components cancel each other out. The horizontal component lies next to the angle and is found with cosine:\n\n$$\nF_\\mathrm{S1} \\cdot \\cos 60^{\\circ} = F_\\mathrm{S2} \\cdot \\cos 30^{\\circ} \\tag{1}\n$$\n\n**Vertically:** the vertical components (sine, opposite the angle) together carry the weight:\n\n$$\nF_\\mathrm{S1} \\cdot \\sin 60^{\\circ} + F_\\mathrm{S2} \\cdot \\sin 30^{\\circ} = m \\cdot g = 10 \\cdot 9.82 = 98.2\\ \\mathrm{N} \\tag{2}\n$$\n\nFrom (1) we solve for $F_\\mathrm{S1}$:\n\n$$\nF_\\mathrm{S1} = F_\\mathrm{S2} \\cdot \\frac{\\cos 30^{\\circ}}{\\cos 60^{\\circ}} = 1.732\\ldots \\cdot F_\\mathrm{S2}\n$$\n\n$F_\\mathrm{S1} = 1.732\\ldots \\cdot F_\\mathrm{S2}$ substituted into (2), $F_\\mathrm{S1} \\cdot \\sin 60^{\\circ} + F_\\mathrm{S2} \\cdot \\sin 30^{\\circ} = 98.2$, gives\n\n$$\n1.732\\ldots \\cdot F_\\mathrm{S2} \\cdot \\sin 60^{\\circ} + F_\\mathrm{S2} \\cdot \\sin 30^{\\circ} = 98.2\n$$\n\nwhere $1.732\\ldots \\cdot \\sin 60^{\\circ}$ is exactly 1.5 and $\\sin 30^{\\circ} = 0.5$:\n\n$$\n1.5 \\cdot F_\\mathrm{S2} + 0.5 \\cdot F_\\mathrm{S2} = 98.2\n$$\n\n$$\n2.0 \\cdot F_\\mathrm{S2} = 98.2\n$$\n\n$$\nF_\\mathrm{S2} = 49.1\\ \\mathrm{N}\n$$\n\nand therefore\n\n$$\nF_\\mathrm{S1} = 1.732\\ldots \\cdot 49.1 = 85.043\\ldots\\ \\mathrm{N}\n$$\n\n**a)** **Answer:** The tension in rope 1 is about 85 N.\n\n**b)** **Answer:** The tension in rope 2 is about 49 N.\n\nCheck: the steeper rope (rope 1) gets the largest tension, and both forces are smaller than the weight 98.2 N. This agrees with the fact that the ropes here are at right angles to each other.\n\n**General conclusion:** In the asymmetric case it is not enough to divide the weight by two. You have to use **both** directions, horizontal and vertical, and solve a system of equations. The same answer is obtained graphically with the parallelogram in the lesson."
   }
  ]
 },
 "fy1-3.9": {
  "kalla": "6dc7a5f337",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.9-u1",
    "question": "The positive direction is to the **right**. A car drives to the **left** and brakes. What sign does the car's acceleration have?",
    "choices": [
     "Negative, since the car is braking.",
     "Zero, since the car is still moving.",
     "Negative, since the car is driving in the negative direction.",
     "Positive, since the velocity goes from a negative value towards zero."
    ],
    "correct": 3,
    "solution": "Write the velocity with a sign. The car drives to the left, so the velocity is negative, for example $-20\\ \\mathrm{m/s}$. When it brakes, it becomes $-10\\ \\mathrm{m/s}$ and finally 0. So the velocity **increases** (from $-20$ towards 0), and then the acceleration is **positive**.\n\n\"Brakes\" only means that the **speed** decreases. It says nothing about the sign of the acceleration until you know which way the car is driving.\n\n**Answer:** Option D."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.9-u2",
    "question": "A ball is thrown straight up. The positive direction is upwards. What acceleration does the ball have at the **turning point**, at the top, where the velocity is zero?",
    "choices": [
     "$-9.82\\ \\mathrm{m/s^2}$",
     "0, since the ball is standing still at the turning point.",
     "$+9.82\\ \\mathrm{m/s^2}$",
     "It changes sign from negative to positive exactly at the turning point."
    ],
    "correct": 0,
    "solution": "At the turning point the **velocity** is zero, but it is still **changing**: just before, it is positive (on the way up) and just after, negative (on the way down). So the velocity decreases here too, by the same amount per second as during the rest of the throw.\n\nIt is the gravitational force that gives the acceleration, and it acts all the time, even at the turning point. With the positive direction upwards, the acceleration is therefore $-9.82\\ \\mathrm{m/s^2}$ during the whole throw.\n\n**Answer:** Option A.\n\n**General conclusion:** Zero velocity does not mean zero acceleration. If the acceleration were zero at the turning point, the ball would stay hanging in the air."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.9-u3",
    "question": "A stone falls downwards. At one moment the speed is 3.0 m/s, and 0.50 s later the speed is 7.9 m/s. The positive direction is **upwards**. Determine the stone's acceleration with its sign.",
    "answer": {
     "value": -9.8,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "The stone moves downwards, that is, in the negative direction. The velocities are therefore negative:\n\n$$\n\\left[ \\begin{array}{l}\nv_0 = -3.0\\ \\mathrm{m/s} \\\\\nv = -7.9\\ \\mathrm{m/s} \\\\\n\\Delta t = 0.50\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\nThe acceleration is the change in velocity per unit of time:\n\n$$\na = \\frac{\\Delta v}{\\Delta t} = \\frac{v - v_0}{\\Delta t} = \\frac{-7.9 - (-3.0)}{0.50} = \\frac{-4.9}{0.50} = -9.8\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The acceleration is $-9.8\\ \\mathrm{m/s^2}$.\n\n**General conclusion:** The speed increases, but the velocity decreases (it becomes more negative). That is why the acceleration is negative. The value is the acceleration due to gravity, as it should be for a stone in free fall."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.9-u4",
    "question": "A lift is on its way **down** at a speed of 4.0 m/s. It brakes uniformly and stops in 2.5 s. The positive direction is upwards. Determine the lift's acceleration with its sign.",
    "answer": {
     "value": 1.6,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "The lift moves downwards, so the initial velocity is negative. The final velocity is zero:\n\n$$\n\\left[ \\begin{array}{l}\nv_0 = -4.0\\ \\mathrm{m/s} \\\\\nv = 0 \\\\\n\\Delta t = 2.5\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{v - v_0}{\\Delta t} = \\frac{0 - (-4.0)}{2.5} = \\frac{4.0}{2.5} = 1.6\\ \\mathrm{m/s^2}\n$$\n\nReasonableness: the velocity goes from $-4.0\\ \\mathrm{m/s}$ up towards 0, so it **increases**. Then the acceleration should be positive, and it is.\n\n**Answer:** The acceleration is $+1.6\\ \\mathrm{m/s^2}$, directed upwards.\n\n**General conclusion:** That is exactly why you feel heavier when a lift on its way down stops. The acceleration is directed upwards, and the floor must push on you with a normal force larger than the gravitational force."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.9-u5",
    "question": "The positive direction is to the right. In which of the cases does the car have a **negative** acceleration?",
    "choices": [
     "The car drives to the right and increases its speed.",
     "The car drives to the left and brakes.",
     "The car drives to the left and increases its speed.",
     "The car stands still at a red light."
    ],
    "correct": 2,
    "solution": "Write the velocity with a sign at the beginning and at the end for each case:\n\n- **To the right, increasing speed:** for example from 5 to 10 m/s. The velocity increases, so the acceleration is positive.\n- **To the left, braking:** for example from $-10$ to $-5$ m/s. The velocity increases, so the acceleration is positive.\n- **To the left, increasing speed:** for example from $-5$ to $-10$ m/s. The velocity **decreases**, so the acceleration is **negative**.\n- **Standing still:** the velocity is 0 the whole time and does not change, so the acceleration is zero.\n\n**Answer:** Option C.\n\n**General conclusion:** The acceleration is negative when it points in the negative direction. That applies both to a car braking on its way to the right and to a car accelerating on its way to the left."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.9-u6",
    "question": "A tennis ball is dropped towards a floor. It hits the floor at a speed of 5.0 m/s and bounces up again at a speed of 4.0 m/s. The ball is in contact with the floor for 0.010 s. Determine the ball's average acceleration during the bounce, with the positive direction upwards.",
    "answer": {
     "value": 900,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "The trap is to calculate with the speeds: $4.0 - 5.0 = -1.0\\ \\mathrm{m/s}$ gives a small negative acceleration, and that is wrong. The velocity must be written with a sign. Before the bounce the ball moves downwards, after the bounce upwards:\n\n$$\n\\left[ \\begin{array}{l}\nv_0 = -5.0\\ \\mathrm{m/s} \\\\\nv = +4.0\\ \\mathrm{m/s} \\\\\n\\Delta t = 0.010\\ \\mathrm{s}\n\\end{array} \\right]\n$$\n\n$$\na = \\frac{v - v_0}{\\Delta t} = \\frac{4.0 - (-5.0)}{0.010} = \\frac{9.0}{0.010} = 900\\ \\mathrm{m/s^2}\n$$\n\nReasonableness: during the bounce the ball must first be slowed down from 5.0 m/s to rest and then get up to a speed of 4.0 m/s in the other direction. So the change in velocity is the sum of the speeds, 9.0 m/s, and it happens in a hundredth of a second. The acceleration is therefore enormous and directed upwards.\n\n**Answer:** The average acceleration is $900\\ \\mathrm{m/s^2}$, directed upwards.\n\n**General conclusion:** The acceleration is about 90 times the acceleration due to gravity. It is the normal force from the floor that provides it, and during the bounce it is much larger than the ball's weight."
   }
  ]
 },
 "fy1-3.10": {
  "kalla": "37a9480ae3",
  "data": [
   {
    "level": 1,
    "penna": "ov-fy1-3.10-u1",
    "question": "A string runs over a frictionless pulley. The tension at one end of the string is 12 N. How large is the tension at the other end of the string, on the other side of the pulley?",
    "choices": [
     "Less than 12 N, since the pulley takes up part of the force.",
     "12 N, since the tension is the same throughout the string.",
     "24 N, since the string pulls in two directions.",
     "It depends on which of the sides has the heaviest weight."
    ],
    "correct": 1,
    "solution": "A frictionless pulley only changes the **direction** of the string's force; it does not change its magnitude. The tension is therefore the same throughout the string and at both attachment points.\n\nEven when the weights on the two sides have different masses, the tension is the same throughout the string. What differs instead is the **resultant force** on each weight.\n\n**Answer:** 12 N."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.10-u2",
    "question": "Two weights, each with a mass of 2.0 kg, hang from a string over a pulley according to the figure and are at rest. How large is the tension in the string? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260.0 240.0\" style=\"max-width:260px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"40\" y1=\"22\" x2=\"220\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"44\" y1=\"22\" x2=\"51\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"56\" y1=\"22\" x2=\"63\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"68\" y1=\"22\" x2=\"75\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"80\" y1=\"22\" x2=\"87\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"92\" y1=\"22\" x2=\"99\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"104\" y1=\"22\" x2=\"111\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"116\" y1=\"22\" x2=\"123\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"128\" y1=\"22\" x2=\"135\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"140\" y1=\"22\" x2=\"147\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"152\" y1=\"22\" x2=\"159\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"164\" y1=\"22\" x2=\"171\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"176\" y1=\"22\" x2=\"183\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"188\" y1=\"22\" x2=\"195\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"200\" y1=\"22\" x2=\"207\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"212\" y1=\"22\" x2=\"219\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"130\" y1=\"22\" x2=\"130\" y2=\"76\" stroke=\"#8a8579\" stroke-width=\"3\"/><circle cx=\"130.0\" cy=\"76.0\" r=\"36\" fill=\"#eaf2fb\" stroke=\"#4f7197\" stroke-width=\"1.6\"/><circle cx=\"130.0\" cy=\"76.0\" r=\"3\" fill=\"#9aa3ad\"/><path d=\"M 94 76 A 36 36 0 0 1 166 76\" fill=\"none\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"94\" y1=\"76\" x2=\"94\" y2=\"186\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"166\" y1=\"76\" x2=\"166\" y2=\"146\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><rect x=\"71.0\" y=\"186.0\" width=\"46\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"94.0\" y=\"208.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">2.0 kg</text><rect x=\"143.0\" y=\"146.0\" width=\"46\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"166.0\" y=\"168.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">2.0 kg</text></svg>",
    "answer": {
     "value": 20,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The weights are equally heavy and stand still, so the resultant force on each weight is zero. For one of the weights, the tension upwards is then as large as the gravitational force downwards:\n\n$$\nF_\\mathrm{S} = F_\\mathrm{G} = m \\cdot g = 2.0 \\cdot 9.82 = 19.64\\ \\mathrm{N} \\approx 20\\ \\mathrm{N}\n$$\n\n**Answer:** The tension is about 20 N.\n\n**General conclusion:** It is easy to think that the string carries both weights and that the tension becomes 39 N. But the tension is the force the string pulls with at **one** end. The pulley's mounting in the ceiling, on the other hand, carries both: it pulls upwards with $2 \\cdot 19.64 = 39.28\\ \\mathrm{N}$."
   },
   {
    "level": 1,
    "penna": "ov-fy1-3.10-u3",
    "question": "Two weights with masses of 2.0 kg and 3.0 kg hang from a string over a frictionless pulley according to the figure. The weights are released. What acceleration do they get? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260.0 240.0\" style=\"max-width:260px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"40\" y1=\"22\" x2=\"220\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"44\" y1=\"22\" x2=\"51\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"56\" y1=\"22\" x2=\"63\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"68\" y1=\"22\" x2=\"75\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"80\" y1=\"22\" x2=\"87\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"92\" y1=\"22\" x2=\"99\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"104\" y1=\"22\" x2=\"111\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"116\" y1=\"22\" x2=\"123\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"128\" y1=\"22\" x2=\"135\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"140\" y1=\"22\" x2=\"147\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"152\" y1=\"22\" x2=\"159\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"164\" y1=\"22\" x2=\"171\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"176\" y1=\"22\" x2=\"183\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"188\" y1=\"22\" x2=\"195\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"200\" y1=\"22\" x2=\"207\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"212\" y1=\"22\" x2=\"219\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"130\" y1=\"22\" x2=\"130\" y2=\"76\" stroke=\"#8a8579\" stroke-width=\"3\"/><circle cx=\"130.0\" cy=\"76.0\" r=\"36\" fill=\"#eaf2fb\" stroke=\"#4f7197\" stroke-width=\"1.6\"/><circle cx=\"130.0\" cy=\"76.0\" r=\"3\" fill=\"#9aa3ad\"/><path d=\"M 94 76 A 36 36 0 0 1 166 76\" fill=\"none\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"94\" y1=\"76\" x2=\"94\" y2=\"186\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"166\" y1=\"76\" x2=\"166\" y2=\"146\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><rect x=\"71.0\" y=\"186.0\" width=\"46\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"94.0\" y=\"208.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">3.0 kg</text><rect x=\"143.0\" y=\"146.0\" width=\"46\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"166.0\" y=\"168.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">2.0 kg</text></svg>",
    "answer": {
     "value": 2,
     "unit": "m/s²",
     "tol": 0.03
    },
    "solution": "We consider the weights and the string as **one system**. The heavier weight pulls the system its way and the lighter one holds it back:\n\n$$\nF_R = m_3 \\cdot g - m_2 \\cdot g = 3.0 \\cdot 9.82 - 2.0 \\cdot 9.82 = 9.82\\ \\mathrm{N}\n$$\n\nThe mass of the whole system must be accelerated:\n\n$$\nm_\\text{tot} = 3.0 + 2.0 = 5.0\\ \\mathrm{kg}\n$$\n\nNewton's second law gives\n\n$$\na = \\frac{F_R}{m_\\text{tot}} = \\frac{9.82}{5.0} = 1.964\\ \\mathrm{m/s^2} \\approx 2.0\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The weights get an acceleration of about 2.0 m/s²."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.10-u4",
    "question": "Two weights with masses of 2.0 kg and 3.0 kg hang from a string over a frictionless pulley according to the figure. When they are released, they get an acceleration of $1.964\\ \\mathrm{m/s^2}$. How large is the tension in the string? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 260.0 240.0\" style=\"max-width:260px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"40\" y1=\"22\" x2=\"220\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"44\" y1=\"22\" x2=\"51\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"56\" y1=\"22\" x2=\"63\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"68\" y1=\"22\" x2=\"75\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"80\" y1=\"22\" x2=\"87\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"92\" y1=\"22\" x2=\"99\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"104\" y1=\"22\" x2=\"111\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"116\" y1=\"22\" x2=\"123\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"128\" y1=\"22\" x2=\"135\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"140\" y1=\"22\" x2=\"147\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"152\" y1=\"22\" x2=\"159\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"164\" y1=\"22\" x2=\"171\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"176\" y1=\"22\" x2=\"183\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"188\" y1=\"22\" x2=\"195\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"200\" y1=\"22\" x2=\"207\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"212\" y1=\"22\" x2=\"219\" y2=\"14\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"130\" y1=\"22\" x2=\"130\" y2=\"76\" stroke=\"#8a8579\" stroke-width=\"3\"/><circle cx=\"130.0\" cy=\"76.0\" r=\"36\" fill=\"#eaf2fb\" stroke=\"#4f7197\" stroke-width=\"1.6\"/><circle cx=\"130.0\" cy=\"76.0\" r=\"3\" fill=\"#9aa3ad\"/><path d=\"M 94 76 A 36 36 0 0 1 166 76\" fill=\"none\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"94\" y1=\"76\" x2=\"94\" y2=\"186\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"166\" y1=\"76\" x2=\"166\" y2=\"146\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><rect x=\"71.0\" y=\"186.0\" width=\"46\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"94.0\" y=\"208.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">3.0 kg</text><rect x=\"143.0\" y=\"146.0\" width=\"46\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"166.0\" y=\"168.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">2.0 kg</text></svg>",
    "answer": {
     "value": 24,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "We get the tension by looking at **one** of the weights, for example the 2-kilogram weight. It accelerates upwards, so the tension upwards is larger than the gravitational force downwards:\n\n$$\nF_R = F_\\mathrm{S} - F_{\\mathrm{G}2}\n\\quad\\Leftrightarrow\\quad\nF_\\mathrm{S} = F_R + F_{\\mathrm{G}2}\n$$\n\n$$\n\\left[ \\begin{array}{l}\nF_R = m_2 \\cdot a = 2.0 \\cdot 1.964 = 3.928\\ \\mathrm{N} \\quad (\\text{only the mass of the 2-kilogram weight}) \\\\\nF_{\\mathrm{G}2} = m_2 \\cdot g = 2.0 \\cdot 9.82 = 19.64\\ \\mathrm{N}\n\\end{array} \\right]\n$$\n\n$$\nF_\\mathrm{S} = 3.928 + 19.64 = 23.568\\ \\mathrm{N} \\approx 24\\ \\mathrm{N}\n$$\n\nCheck with the 3-kilogram weight, which accelerates downwards: $F_\\mathrm{S} = m_3 \\cdot g - m_3 \\cdot a = 3.0 \\cdot 9.82 - 3.0 \\cdot 1.964 = 23.568\\ \\mathrm{N}$. The same answer, as it should be.\n\n**Answer:** The tension is about 24 N.\n\n**General conclusion:** The tension ends up between the two weights (19.64 N and 29.46 N). It is larger than the weight of the light mass, so that the light mass is lifted, and smaller than the weight of the heavy mass, so that the heavy mass sinks."
   },
   {
    "level": 2,
    "penna": "ov-fy1-3.10-u5",
    "question": "A box with a mass of 3.0 kg lies on a table. A string runs from the box over a frictionless pulley at the edge of the table to a hanging weight with a mass of 2.0 kg, according to the figure. The coefficient of friction between the box and the table is 0.20.<br>a) Determine the acceleration of the system.<br>b) Determine the tension in the string.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 410.0 272.0\" style=\"max-width:410px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"10\" y1=\"260\" x2=\"410\" y2=\"260\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"260\" x2=\"9\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"260\" x2=\"21\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"260\" x2=\"33\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"260\" x2=\"45\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"260\" x2=\"57\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"260\" x2=\"69\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"260\" x2=\"81\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"260\" x2=\"93\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"260\" x2=\"105\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"260\" x2=\"117\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"260\" x2=\"129\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"260\" x2=\"141\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"260\" x2=\"153\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"260\" x2=\"165\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"260\" x2=\"177\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"260\" x2=\"189\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"260\" x2=\"201\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"260\" x2=\"213\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"260\" x2=\"225\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"260\" x2=\"237\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"260\" x2=\"249\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"260\" x2=\"261\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"260\" x2=\"273\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"260\" x2=\"285\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"304\" y1=\"260\" x2=\"297\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"316\" y1=\"260\" x2=\"309\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"328\" y1=\"260\" x2=\"321\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"340\" y1=\"260\" x2=\"333\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"352\" y1=\"260\" x2=\"345\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"364\" y1=\"260\" x2=\"357\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"376\" y1=\"260\" x2=\"369\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"388\" y1=\"260\" x2=\"381\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"400\" y1=\"260\" x2=\"393\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><rect x=\"30\" y=\"110\" width=\"270\" height=\"8\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><rect x=\"44\" y=\"118\" width=\"8\" height=\"142\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><rect x=\"278\" y=\"118\" width=\"8\" height=\"142\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><line x1=\"300\" y1=\"114\" x2=\"314.0\" y2=\"104.0\" stroke=\"#8a8579\" stroke-width=\"3\"/><rect x=\"150.0\" y=\"66.0\" width=\"76\" height=\"44\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"188.0\" y=\"92.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">3.0 kg</text><line x1=\"226\" y1=\"88.0\" x2=\"314.0\" y2=\"88.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><circle cx=\"314.0\" cy=\"104.0\" r=\"16\" fill=\"#eaf2fb\" stroke=\"#4f7197\" stroke-width=\"1.6\"/><circle cx=\"314.0\" cy=\"104.0\" r=\"3\" fill=\"#9aa3ad\"/><path d=\"M 314.0 88.0 A 16 16 0 0 1 330.0 104.0\" fill=\"none\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"330.0\" y1=\"104.0\" x2=\"330.0\" y2=\"176.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><rect x=\"308.0\" y=\"176.0\" width=\"44\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"330.0\" y=\"198.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">2.0 kg</text></svg>\n\n*Give the acceleration (a) as your numerical answer in m/s². Use $g = 9.82\\ \\mathrm{N/kg}$.*",
    "answer": {
     "value": 2.7,
     "unit": "m/s²",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 2.75,
      "unit": "m/s²",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 14.1,
      "unit": "N",
      "tol": 0.03
     }
    ],
    "solution": "**a)** We consider the box, the string and the weight as one system. The weight of the hanging mass drives the system, and the friction on the box slows it down. The normal force on the box is as large as its weight, since the table is horizontal.\n\n$$\n\\left[ \\begin{array}{l}\nF_{\\mathrm{G}2} = m_2 \\cdot g = 2.0 \\cdot 9.82 = 19.64\\ \\mathrm{N} \\\\\nF_\\mathrm{f} = \\mu \\cdot F_\\mathrm{N} = \\mu \\cdot m_1 \\cdot g = 0.20 \\cdot 3.0 \\cdot 9.82 = 5.892\\ \\mathrm{N}\n\\end{array} \\right]\n$$\n\n$$\nF_R = F_{\\mathrm{G}2} - F_\\mathrm{f} = 19.64 - 5.892 = 13.748\\ \\mathrm{N}\n$$\n\nBoth bodies must be accelerated, so the mass is $m_\\text{tot} = 3.0 + 2.0 = 5.0\\ \\mathrm{kg}$:\n\n$$\na = \\frac{F_R}{m_\\text{tot}} = \\frac{13.748}{5.0} = 2.7496\\ \\mathrm{m/s^2} \\approx 2.7\\ \\mathrm{m/s^2}\n$$\n\n**Answer:** The acceleration is about 2.7 m/s².\n\n**b)** We look at the box alone. Horizontally, the tension acts forwards and the friction backwards:\n\n$$\nF_R = F_\\mathrm{S} - F_\\mathrm{f}\n\\quad\\Leftrightarrow\\quad\nF_\\mathrm{S} = F_R + F_\\mathrm{f}\n$$\n\nNow only the box's mass counts. The acceleration and the friction are taken unrounded from a):\n\n$$\n\\left[ \\begin{array}{l}\nF_R = m_1 \\cdot a = 3.0 \\cdot 2.7496 = 8.2488\\ \\mathrm{N} \\\\\nF_\\mathrm{f} = 5.892\\ \\mathrm{N}\n\\end{array} \\right]\n$$\n\n$$\nF_\\mathrm{S} = 8.2488 + 5.892 = 14.1408\\ \\mathrm{N} \\approx 14\\ \\mathrm{N}\n$$\n\nCheck with the hanging weight: $F_\\mathrm{S} = m_2 \\cdot g - m_2 \\cdot a = 19.64 - 2.0 \\cdot 2.7496 = 14.1408\\ \\mathrm{N}$.\n\n**Answer:** The tension is about 14 N."
   },
   {
    "level": 3,
    "penna": "ov-fy1-3.10-u6",
    "question": "A trolley with a mass of 3.0 kg stands on a table and can roll without friction. A string runs from the trolley over a frictionless pulley at the edge of the table to a hanging weight, according to the figure. How large must the mass *m* of the hanging weight be for the trolley to get an acceleration of 2.0 m/s²? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 410.0 272.0\" style=\"max-width:410px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"10\" y1=\"260\" x2=\"410\" y2=\"260\" stroke=\"#0f1620\" stroke-width=\"1.6\"/><line x1=\"16\" y1=\"260\" x2=\"9\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"28\" y1=\"260\" x2=\"21\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"40\" y1=\"260\" x2=\"33\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"52\" y1=\"260\" x2=\"45\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"64\" y1=\"260\" x2=\"57\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"76\" y1=\"260\" x2=\"69\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"88\" y1=\"260\" x2=\"81\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"100\" y1=\"260\" x2=\"93\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"112\" y1=\"260\" x2=\"105\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"124\" y1=\"260\" x2=\"117\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"136\" y1=\"260\" x2=\"129\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"148\" y1=\"260\" x2=\"141\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"160\" y1=\"260\" x2=\"153\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"172\" y1=\"260\" x2=\"165\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"184\" y1=\"260\" x2=\"177\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"196\" y1=\"260\" x2=\"189\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"208\" y1=\"260\" x2=\"201\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"220\" y1=\"260\" x2=\"213\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"232\" y1=\"260\" x2=\"225\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"244\" y1=\"260\" x2=\"237\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"256\" y1=\"260\" x2=\"249\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"268\" y1=\"260\" x2=\"261\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"280\" y1=\"260\" x2=\"273\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"292\" y1=\"260\" x2=\"285\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"304\" y1=\"260\" x2=\"297\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"316\" y1=\"260\" x2=\"309\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"328\" y1=\"260\" x2=\"321\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"340\" y1=\"260\" x2=\"333\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"352\" y1=\"260\" x2=\"345\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"364\" y1=\"260\" x2=\"357\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"376\" y1=\"260\" x2=\"369\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"388\" y1=\"260\" x2=\"381\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><line x1=\"400\" y1=\"260\" x2=\"393\" y2=\"268\" stroke=\"#0f1620\" stroke-width=\"1\"/><rect x=\"30\" y=\"110\" width=\"270\" height=\"8\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><rect x=\"44\" y=\"118\" width=\"8\" height=\"142\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><rect x=\"278\" y=\"118\" width=\"8\" height=\"142\" fill=\"#c9b79a\" stroke=\"#8a6f4e\" stroke-width=\"1.2\"/><line x1=\"300\" y1=\"114\" x2=\"314.0\" y2=\"104.0\" stroke=\"#8a8579\" stroke-width=\"3\"/><rect x=\"150.0\" y=\"66.0\" width=\"76\" height=\"44\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"188.0\" y=\"92.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\">3.0 kg</text><line x1=\"226\" y1=\"88.0\" x2=\"314.0\" y2=\"88.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><circle cx=\"314.0\" cy=\"104.0\" r=\"16\" fill=\"#eaf2fb\" stroke=\"#4f7197\" stroke-width=\"1.6\"/><circle cx=\"314.0\" cy=\"104.0\" r=\"3\" fill=\"#9aa3ad\"/><path d=\"M 314.0 88.0 A 16 16 0 0 1 330.0 104.0\" fill=\"none\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"330.0\" y1=\"104.0\" x2=\"330.0\" y2=\"176.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><rect x=\"308.0\" y=\"176.0\" width=\"44\" height=\"36\" rx=\"2\" fill=\"#d3e4f5\" stroke=\"#4f7197\" stroke-width=\"1.4\"/><text x=\"330.0\" y=\"198.5\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\"><tspan font-style=\"italic\">m</tspan></text></svg>",
    "answer": {
     "value": 0.77,
     "unit": "kg",
     "tol": 0.03
    },
    "solution": "The unknown mass appears in **two** places: the weight's gravitational force $m \\cdot g$ drives the system, but the weight must also itself be accelerated and is therefore part of the total mass. So we cannot just substitute values, but must set up an equation and solve for *m*.\n\nWithout friction, the gravitational force on the hanging weight is the only driving force on the system:\n\n$$\nF_R = m_\\text{tot} \\cdot a\n\\quad\\Leftrightarrow\\quad\nm \\cdot g = (3.0 + m) \\cdot a\n$$\n\nSubstituting the values $g = 9.82$ and $a = 2.0$ gives\n\n$$\n9.82 \\cdot m = (3.0 + m) \\cdot 2.0\n$$\n\n$$\n9.82 \\cdot m = 6.0 + 2.0 \\cdot m\n$$\n\n$$\n9.82 \\cdot m \\mathbin{\\boldsymbol{-}} \\boldsymbol{2.0 \\cdot m} = 6.0 + 2.0 \\cdot m \\mathbin{\\boldsymbol{-}} \\boldsymbol{2.0 \\cdot m}\n$$\n\n$$\n7.82 \\cdot m = 6.0\n$$\n\n$$\n\\frac{7.82 \\cdot m}{\\boldsymbol{7.82}} = \\frac{6.0}{\\boldsymbol{7.82}}\n$$\n\n$$\nm = 0.7672\\ldots\\ \\mathrm{kg} \\approx 0.77\\ \\mathrm{kg}\n$$\n\nCheck: $F_R = 0.7672\\ldots \\cdot 9.82 = 7.534\\ldots\\ \\mathrm{N}$ and $m_\\text{tot} = 3.7672\\ldots\\ \\mathrm{kg}$ give $a = \\dfrac{7.534\\ldots}{3.7672\\ldots} = 2.0\\ \\mathrm{m/s^2}$.\n\n**Answer:** The hanging weight should have a mass of about 0.77 kg.\n\n**General conclusion:** The most common mistake is to forget the weight's own mass and calculate $m \\cdot g = 3.0 \\cdot a$, which gives 0.61 kg. Then the acceleration becomes too small, since part of the driving force is used to accelerate the weight itself."
   }
  ]
 },
 "fy1-4.1": {
  "kalla": "6180368de1",
  "data": [
   {
    "level": 1,
    "question": "A person pushes a cart 8.0 m along a flat floor with a horizontal force of 45 N. How much work does the person do?",
    "answer": {
     "value": 360,
     "unit": "J",
     "tol": 0.02
    },
    "solution": "Direct substitution into the formula for work:\n\n$$\nW = F_s \\cdot s = 45 \\cdot 8.0 = 360\\ \\mathrm{J}\n$$\n\n**Answer:** 360 J."
   },
   {
    "level": 1,
    "question": "How much work do you do when you lift a box with a mass of 12 kg straight up a distance of 1.8 m? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 212,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "To lift the box you must pull with a force that balances the gravitational force:\n\n$$\nF = m \\cdot g = 12 \\cdot 9.82 \\approx 117.8\\ \\mathrm{N}\n$$\n\nWork:\n\n$$\nW = F \\cdot s = 117.8 \\cdot 1.8 \\approx 212\\ \\mathrm{J}\n$$\n\n**Answer:** About 212 J."
   },
   {
    "level": 1,
    "question": "Martin carries a box with a mass of 8.0 kg horizontally 20 m along a corridor at **constant velocity**. How much work does the gravitational force (or the upward force from Martin's hands) do on the box?",
    "choices": [
     "The work is negative because he is carrying the box.",
     "The work is $W = m g s = 8.0 \\cdot 9.82 \\cdot 20 \\approx 1\\,570$ J.",
     "The work is $\\dfrac{1}{2} m g s$.",
     "The work is 0 J: the motion is perpendicular to the force."
    ],
    "correct": 3,
    "solution": "Work requires the force to have a component **in the direction of motion**. Here the motion is horizontal (to the right), but both the gravitational force and Martin's lifting force are vertical (up/down). The force in the direction of motion $F_s = 0$, so the work is zero no matter how long the distance is.\n\n**Answer:** Option D.\n\n**General conclusion:** In everyday language we say \"it is hard work carrying the box\", but *physically* it is not work. The effort you feel comes from muscle work to hold up the box's weight statically, not from work done on the box itself."
   },
   {
    "level": 2,
    "question": "Hosni pulls a cart 50 m along the ground with a rope according to the figure. How much work does he do?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 246.2 160.0\" style=\"max-width:246px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"9\" y=\"123\" width=\"28\" height=\"28\" fill=\"rgba(15,22,32,0.06)\" stroke=\"#0f1620\" stroke-width=\"1.5\" rx=\"2\"/><line x1=\"23\" y1=\"137\" x2=\"223.0\" y2=\"137\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><path d=\"M 71.0 137.0 A 48 48 0 0 0 64.6 113.0\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"82.9\" y=\"121.0\" font-family=\"Poppins,sans-serif\" font-size=\"14\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\">30°</text><line x1=\"23\" y1=\"137\" x2=\"196.2\" y2=\"37.0\" stroke=\"#c8324a\" stroke-width=\"2.6\"/><polygon points=\"196.2,37.0 190.6,45.3 186.2,37.7\" fill=\"#c8324a\"/><text x=\"196.2\" y=\"19.0\" font-family=\"Poppins,sans-serif\" font-size=\"18\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\"><tspan font-style=\"italic\">F</tspan> = 70 N</text></svg>",
    "answer": {
     "value": 3030,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "The component of the pulling force in the direction of motion is $F_s = F \\cos\\alpha$:\n\n$$\nF_s = 70 \\cdot \\cos 30^{\\circ} \\approx 70 \\cdot 0.866 \\approx 60.6\\ \\mathrm{N}\n$$\n\nWork:\n\n$$\nW = F_s \\cdot s = 60.6 \\cdot 50 \\approx 3\\,030\\ \\mathrm{J} \\approx 3.0\\ \\mathrm{kJ}\n$$\n\n**Answer:** About 3.0 kJ."
   },
   {
    "level": 2,
    "question": "A box with a mass of 28 kg is pulled 4.5 m up a **frictionless** inclined plane at an angle of 20° above the horizontal. How much work is done against the gravitational force? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 423,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "On an inclined plane without friction, the only thing you work against is the component of the gravitational force down the plane:\n\n$$\nF_1 = m g \\sin\\alpha = 28 \\cdot 9.82 \\cdot \\sin 20^{\\circ} \\approx 28 \\cdot 9.82 \\cdot 0.342 \\approx 94.0\\ \\mathrm{N}\n$$\n\nWork:\n\n$$\nW = F_1 \\cdot s = 94.0 \\cdot 4.5 \\approx 423\\ \\mathrm{J}\n$$\n\n**Answer:** About 423 J.\n\n**General conclusion:** The same result is obtained if you calculate via the potential energy: the increase in height is $h = s \\sin\\alpha = 4.5 \\cdot \\sin 20^{\\circ} \\approx 1.54$ m, and $W = mgh = 28 \\cdot 9.82 \\cdot 1.54 \\approx 423$ J. It is the *increase in height* that matters, not the distance the box slides."
   },
   {
    "level": 3,
    "question": "A timber sledge is pulled 30 m along a horizontal ski trail. The rope slopes at 28° above the ground and a constant pulling force of 250 N is used. The coefficient of friction between the sledge and the snow is 0.15, and the sledge (with load) has a mass of 90 kg.\n\nCalculate **the net work** done on the sledge (that is, the work that gives rise to increased kinetic energy). Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 3160,
     "unit": "J",
     "tol": 0.05
    },
    "solution": "The net work is the work done by the resultant force $F_R = F_x - F_f$ along the motion.\n\n**Step 1: the driving component:**\n\n$$\nF_x = F \\cos\\alpha = 250 \\cdot \\cos 28^{\\circ} \\approx 220.8\\ \\mathrm{N}\n$$\n\n**Step 2: the normal force.** Vertical equilibrium: $F_N + F \\sin\\alpha = m g$:\n\n$$\nF_N = m g - F \\sin\\alpha = 90 \\cdot 9.82 - 250 \\cdot \\sin 28^{\\circ} \\approx 883.8 - 117.4 \\approx 766.4\\ \\mathrm{N}\n$$\n\n**Step 3: the frictional force:**\n\n$$\nF_f = \\mu F_N = 0.15 \\cdot 766.4 \\approx 115.0\\ \\mathrm{N}\n$$\n\n**Step 4: the net work:**\n\n$$\nW_\\text{net} = (F_x - F_f) \\cdot s = (220.8 - 115.0) \\cdot 30 \\approx 105.8 \\cdot 30 \\approx 3\\,160\\ \\mathrm{J}\n$$\n\n**Answer:** The net work is about 3.2 kJ.\n\n**General conclusion:** The net work corresponds to the increase in the sledge's kinetic energy (the work-energy theorem): $W_\\text{net} = \\Delta E_k$. The total pulling work $W_\\text{drag} = F \\cos\\alpha \\cdot s \\approx 6.6$ kJ: half disappears as frictional heat, half becomes kinetic energy."
   }
  ]
 },
 "fy1-4.2": {
  "kalla": "a13c89c68f",
  "data": [
   {
    "level": 1,
    "question": "A book with a mass of 0.80 kg is lifted up onto a shelf 1.6 m above the floor. How much gravitational potential energy does it have relative to floor level? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 12.6,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "Direct substitution into the formula for gravitational potential energy:\n\n$$\nE_p = m g h = 0.80 \\cdot 9.82 \\cdot 1.6 \\approx 12.6\\ \\mathrm{J}\n$$\n\n**Answer:** 12.6 J."
   },
   {
    "level": 1,
    "question": "A stone has a gravitational potential energy of 88 J at the top of a ladder. The stone has a mass of 2.5 kg. How high above the ground is it? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 3.58,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "Solve for $h$ in the formula:\n\n$$\nE_p = m g h \\quad\\Leftrightarrow\\quad h = \\frac{E_p}{m g}\n$$\n\n$$\nh = \\frac{88}{2.5 \\cdot 9.82} \\approx 3.58\\ \\mathrm{m}\n$$\n\n**Answer:** About 3.6 m."
   },
   {
    "level": 1,
    "question": "A box is lifted 2.4 m vertically and then has a gravitational potential energy of 165 J. What is the box's mass? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 7,
     "unit": "kg",
     "tol": 0.03
    },
    "solution": "Solve for $m$:\n\n$$\nm = \\frac{E_p}{g h} = \\frac{165}{9.82 \\cdot 2.4} \\approx 7.00\\ \\mathrm{kg}\n$$\n\n**Answer:** About 7.0 kg."
   },
   {
    "level": 2,
    "question": "A box with a mass of 32 kg is pulled 5.0 m up a frictionless inclined plane at an angle of 30°. How much work is done to lift the box? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 786,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "Without friction, the work corresponds to the whole increase in potential energy. The increase in height:\n\n$$\nh = s \\sin\\alpha = 5.0 \\cdot \\sin 30^{\\circ} = 2.5\\ \\mathrm{m}\n$$\n\nWork:\n\n$$\nW = \\Delta E_p = m g h = 32 \\cdot 9.82 \\cdot 2.5 \\approx 786\\ \\mathrm{J}\n$$\n\n**Answer:** About 0.79 kJ."
   },
   {
    "level": 2,
    "question": "A person with a mass of 75 kg carries a 25 kg rucksack up a staircase to the second floor, which is 3.5 m above the entrance level. How large is **the total work** the person does against the gravitational force (on themselves + the rucksack)? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 3437,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "The work is done against the gravitational force on the total mass (person + rucksack):\n\n$$\nm_\\text{tot} = 75 + 25 = 100\\ \\mathrm{kg}\n$$\n\n$$\nW = m_\\text{tot} \\cdot g \\cdot h = 100 \\cdot 9.82 \\cdot 3.5 \\approx 3\\,437\\ \\mathrm{J}\n$$\n\n**Answer:** About 3.4 kJ."
   },
   {
    "level": 3,
    "question": "A **uniform chain** (a chain whose mass is evenly distributed along its whole length) with a length of 2.0 m and a total mass of 4.0 kg hangs vertically down from the edge of a table, with its upper end at the edge of the table. How much work is required to pull up **the whole chain** so that it lies on the table? Use $g = 9.82\\ \\mathrm{N/kg}$.\n\n*Hint: consider where the chain's **centre of gravity** ends up.*",
    "answer": {
     "value": 39.3,
     "unit": "J",
     "tol": 0.05
    },
    "solution": "The work to lift an object corresponds to moving its **centre of gravity** against the gravitational force.\n\nBefore: the chain hangs vertically from the edge of the table. Since the mass is evenly distributed, the centre of gravity is in the middle of the chain, that is, half the length below the table surface: $\\dfrac{2.0}{2} = 1.0\\ \\mathrm{m}$ below the table.\n\nAfter: the whole chain lies on the table, and the centre of gravity is level with the table surface.\n\nThe centre of gravity is lifted 1.0 m. Work:\n\n$$\nW = m g \\Delta h = 4.0 \\cdot 9.82 \\cdot 1.0 \\approx 39.3\\ \\mathrm{J}\n$$\n\n**Answer:** About 39 J.\n\n**General conclusion:** To find the potential energy (or the work when lifting) of an *extended* object, such as a chain, a ladder or water in a cylinder, you calculate as if the whole mass were located at the object's **centre of gravity**. This is the same trick that is used in examples about lifting water out of a well or calculating the gravitational energy of a rod that falls over."
   }
  ]
 },
 "fy1-4.3": {
  "kalla": "d49e88391c",
  "data": [
   {
    "level": 1,
    "question": "A cyclist with bicycle has a total mass of 80 kg and rides at 6.0 m/s. How large is the cyclist's kinetic energy?",
    "answer": {
     "value": 1440,
     "unit": "J",
     "tol": 0.02
    },
    "solution": "$$\nE_k = \\frac{m v^{2}}{2} = \\frac{80 \\cdot 6.0^{2}}{2} = \\frac{80 \\cdot 36}{2} = 1\\,440\\ \\mathrm{J}\n$$\n\n**Answer:** About 1.4 kJ."
   },
   {
    "level": 1,
    "question": "A ball with a mass of 0.30 kg has a kinetic energy of 18 J. What is the ball's speed? Give the answer in m/s.",
    "answer": {
     "value": 11,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "Solve for $v$:\n\n$$\nE_k = \\frac{m v^{2}}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{\\frac{2 E_k}{m}}\n$$\n\n$$\nv = \\sqrt{\\frac{2 \\cdot 18}{0.30}} = \\sqrt{120} \\approx 11.0\\ \\mathrm{m/s}\n$$\n\n**Answer:** About 11 m/s."
   },
   {
    "level": 1,
    "question": "An object moves at a speed of 4.0 m/s and has a kinetic energy of 96 J. Determine the object's mass.",
    "answer": {
     "value": 12,
     "unit": "kg",
     "tol": 0.02
    },
    "solution": "Solve for $m$:\n\n$$\nm = \\frac{2 E_k}{v^{2}} = \\frac{2 \\cdot 96}{4.0^{2}} = \\frac{192}{16} = 12\\ \\mathrm{kg}\n$$\n\n**Answer:** 12 kg."
   },
   {
    "level": 2,
    "question": "A car with a mass of 1 100 kg brakes on a flat road from 25 m/s until it stops completely. The braking distance is 60 m. How large is the average braking force?",
    "answer": {
     "value": 5730,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The braking work is equal to the decrease in kinetic energy:\n\n$$\nW = F_s \\cdot s = \\Delta E_k = \\frac{m v_0^{2}}{2}\n$$\n\n(All the kinetic energy disappears: the final speed is 0.)\n\nSolve for $F_s$:\n\n$$\nF_s = \\frac{m v_0^{2}}{2 s} = \\frac{1\\,100 \\cdot 25^{2}}{2 \\cdot 60} = \\frac{687\\,500}{120} \\approx 5\\,730\\ \\mathrm{N}\n$$\n\n**Answer:** About 5.7 kN."
   },
   {
    "level": 2,
    "question": "A cyclist with a mass of 75 kg brakes from 12 m/s to 5.0 m/s. How much kinetic energy has disappeared?",
    "answer": {
     "value": 4463,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "The difference in kinetic energy:\n\n$$\n\\Delta E_k = \\frac{m v_1^{2}}{2} - \\frac{m v_2^{2}}{2} = \\frac{m (v_1^{2} - v_2^{2})}{2}\n$$\n\n$$\n\\Delta E_k = \\frac{75 \\cdot (12^{2} - 5.0^{2})}{2} = \\frac{75 \\cdot (144 - 25)}{2} = \\frac{75 \\cdot 119}{2} \\approx 4\\,460\\ \\mathrm{J}\n$$\n\n**Answer:** About 4.5 kJ of kinetic energy has been converted (into frictional heat)."
   },
   {
    "level": 3,
    "question": "A car with a mass of 1 400 kg is driving at 50 km/h and needs a braking distance of 18 m to stop completely. If the same car **instead** drives at 100 km/h and brakes with **exactly the same braking force**, how long is the braking distance then? Give the answer in metres.",
    "answer": {
     "value": 72,
     "unit": "m",
     "tol": 0.05
    },
    "solution": "With the same braking force *F*, the work needed to stop the car is equal to the kinetic energy: $F \\cdot s = \\dfrac{m v_0^{2}}{2}$. With constant *F* and *m* we therefore have:\n\n$$\ns \\propto v_0^{2}\n$$\n\nThe braking distance is **proportional to the square of the speed**. When the speed is doubled, the braking distance becomes **four times** as long:\n\n$$\n\\frac{s_2}{s_1} = \\left(\\frac{v_2}{v_1}\\right)^{2} = \\left(\\frac{100}{50}\\right)^{2} = 2^{2} = 4\n$$\n\n$$\ns_2 = 4 \\cdot s_1 = 4 \\cdot 18 = 72\\ \\mathrm{m}\n$$\n\n**Answer:** The braking distance is 72 m: four times as long.\n\n**General conclusion:** This is one of the most important practical consequences of the formula for kinetic energy $E_k \\propto v^{2}$. Doubling the speed gives not double but **quadruple** the braking distance: that is why speed limits on roads are so important. It is also why collisions at high speed are so devastating: the crash protection has to absorb four times as much energy at 100 km/h as at 50 km/h."
   }
  ]
 },
 "fy1-4.4": {
  "kalla": "a8ece5114c",
  "data": [
   {
    "level": 1,
    "question": "A stone is dropped from a height of 8.0 m. With what speed does it hit the ground? Ignore air resistance and use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 12.5,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "The principle of conservation of energy without friction gives $E_p \\to E_k$:\n\n$$\nm g h = \\frac{m v^{2}}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{2 g h}\n$$\n\n$$\nv = \\sqrt{2 \\cdot 9.82 \\cdot 8.0} = \\sqrt{157.1} \\approx 12.5\\ \\mathrm{m/s}\n$$\n\n**Answer:** About 12.5 m/s.\n\n**General conclusion:** The final speed does **not depend on the mass**: all objects fall equally fast in free fall."
   },
   {
    "level": 1,
    "question": "A ball is thrown straight up at a speed of 10 m/s. How high above the point of release does it reach at most? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 5.09,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "The principle of conservation of energy gives $E_k \\to E_p$ (all the kinetic energy becomes potential energy at the top, where $v = 0$):\n\n$$\n\\frac{m v^{2}}{2} = m g h \\quad\\Leftrightarrow\\quad h = \\frac{v^{2}}{2 g}\n$$\n\n$$\nh = \\frac{10^{2}}{2 \\cdot 9.82} \\approx 5.09\\ \\mathrm{m}\n$$\n\n**Answer:** About 5.1 m."
   },
   {
    "level": 1,
    "question": "A ball with a mass of 0.50 kg has a gravitational potential energy of 30 J above the ground. How large is the ball's **kinetic energy** just before it hits the ground, if air resistance can be neglected?",
    "choices": [
     "It cannot be calculated without knowing the ball's speed.",
     "60 J: the kinetic energy is twice as large.",
     "30 J: all the potential energy is converted into kinetic energy.",
     "15 J: half of the potential energy is lost."
    ],
    "correct": 2,
    "solution": "According to the principle of conservation of energy, energy can be neither created nor destroyed. Without air resistance, **all** the potential energy is converted into kinetic energy as the ball falls:\n\n$$\nE_k = E_p = 30\\ \\mathrm{J}\n$$\n\n**Answer:** Option C."
   },
   {
    "level": 2,
    "question": "A box slides down a frictionless track from a height of 4.0 m. At a certain point its speed is 6.0 m/s. How high above the ground is the box then? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 2.17,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "The principle of conservation of energy between the starting point (height 4.0 m, speed 0) and the measuring point (height $h$, speed 6.0 m/s):\n\n$$\nm g h_0 = m g h + \\frac{m v^{2}}{2}\n$$\n\nThe mass cancels out. Solve for $h$:\n\n$$\nh = h_0 - \\frac{v^{2}}{2 g} = 4.0 - \\frac{6.0^{2}}{2 \\cdot 9.82} \\approx 4.0 - 1.833 \\approx 2.17\\ \\mathrm{m}\n$$\n\n**Answer:** The box is about 2.2 m above the ground."
   },
   {
    "level": 2,
    "question": "You stand on a cliff and throw a stone obliquely upwards at a speed of 12 m/s from a point 9.0 m above the sea. With what speed does the stone hit the water surface? Use $g = 9.82\\ \\mathrm{N/kg}$ and ignore air resistance.",
    "answer": {
     "value": 18,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "The principle of conservation of energy between the point of release (height 9.0 m, speed 12 m/s) and the sea surface (height 0, speed $v$):\n\n$$\nm g h_1 + \\frac{m v_1^{2}}{2} = \\frac{m v_2^{2}}{2}\n$$\n\nSolve for $v_2$:\n\n$$\nv_2 = \\sqrt{2 g h_1 + v_1^{2}} = \\sqrt{2 \\cdot 9.82 \\cdot 9.0 + 12^{2}}\n$$\n\n$$\nv_2 = \\sqrt{176.8 + 144} = \\sqrt{320.8} \\approx 17.9\\ \\mathrm{m/s}\n$$\n\n**Answer:** About 18 m/s.\n\n**General conclusion:** Note that the angle of the throw does *not* matter for the final speed: only the starting height and the *magnitude* of the starting speed."
   },
   {
    "level": 3,
    "question": "A cyclist (bicycle + person 80 kg in total) starts from rest at the top of a hill 25 m above the valley. At the bottom of the valley the cyclist has a speed of 18 m/s. How much **frictional heat** has been generated along the way? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 6680,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "The principle of conservation of energy with friction: $E_{p,1} + E_{k,1} = E_{p,2} + E_{k,2} + E_v$. Here $E_{k,1} = 0$ (starts from rest) and $E_{p,2} = 0$ (in the valley).\n\n$$\nm g h = \\frac{m v^{2}}{2} + E_v\n\\quad\\Leftrightarrow\\quad\nE_v = m g h - \\frac{m v^{2}}{2}\n$$\n\nMeasured values:\n$$\n\\left[ \\begin{array}{l}\nm = 80\\ \\mathrm{kg} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nh = 25\\ \\mathrm{m} \\\\\nv = 18\\ \\mathrm{m/s}\n\\end{array} \\right]\n$$\n\n$$\nE_v = 80 \\cdot 9.82 \\cdot 25 - \\frac{80 \\cdot 18^{2}}{2}\n= 19\\,640 - 12\\,960 = 6\\,680\\ \\mathrm{J}\n$$\n\n**Answer:** About 6.7 kJ became frictional heat.\n\n**General conclusion:** Without friction the cyclist would have reached the speed $v = \\sqrt{2gh} \\approx 22.2$ m/s at the bottom of the valley. That they instead have 18 m/s means that about $1 - (18/22.2)^{2} \\approx 34\\,\\%$ of the potential energy went to friction (air resistance, friction in bearings and tyres)."
   }
  ]
 },
 "fy1-4.5": {
  "kalla": "f983948131",
  "data": [
   {
    "level": 1,
    "question": "An engine does 4 500 J of work in 30 seconds. What is the engine's power?",
    "answer": {
     "value": 150,
     "unit": "W",
     "tol": 0.02
    },
    "solution": "$$\nP = \\frac{W}{t} = \\frac{4\\,500}{30} = 150\\ \\mathrm{W}\n$$\n\n**Answer:** 150 W."
   },
   {
    "level": 1,
    "question": "A light bulb has a power of 60 W. How much energy (in J) does it convert in 5.0 minutes?",
    "answer": {
     "value": 18000,
     "unit": "J",
     "tol": 0.02
    },
    "solution": "Solve for the energy in the power formula, after converting the time to seconds:\n\n$$\nE = P \\cdot t = 60 \\cdot (5.0 \\cdot 60) = 60 \\cdot 300 = 18\\,000\\ \\mathrm{J}\n$$\n\n**Answer:** 18 kJ."
   },
   {
    "level": 1,
    "question": "Emilia (60 kg) walks up a 4.0 m high staircase in 10 seconds. What power does she develop against the gravitational force? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 236,
     "unit": "W",
     "tol": 0.03
    },
    "solution": "Energy converted = increase in potential energy:\n\n$$\n\\Delta E = m g h = 60 \\cdot 9.82 \\cdot 4.0 = 2\\,357\\ \\mathrm{J}\n$$\n\nPower:\n\n$$\nP = \\frac{\\Delta E}{t} = \\frac{2\\,357}{10} \\approx 236\\ \\mathrm{W}\n$$\n\n**Answer:** About 240 W."
   },
   {
    "level": 2,
    "question": "A 2 000 W kettle heats water for 3.5 minutes. How many **kWh** of energy have been used?",
    "answer": {
     "value": 0.117,
     "unit": "kWh",
     "tol": 0.03
    },
    "solution": "Work out the energy in Wh directly: power × time (in hours).\n\n$$\nt = 3.5\\ \\mathrm{min} = \\frac{3.5}{60}\\ \\mathrm{h} \\approx 0.0583\\ \\mathrm{h}\n$$\n\n$$\nE = P \\cdot t = 2\\,000\\ \\mathrm{W} \\cdot 0.0583\\ \\mathrm{h} \\approx 117\\ \\mathrm{Wh} = 0.117\\ \\mathrm{kWh}\n$$\n\n**Answer:** About 0.12 kWh."
   },
   {
    "level": 2,
    "question": "A 25 W lamp is on for a whole day. What is the cost if 1 kWh costs 1.80 kr?",
    "answer": {
     "value": 1.08,
     "unit": "kr",
     "tol": 0.03
    },
    "solution": "The energy in kWh:\n\n$$\nE = P \\cdot t = 25\\ \\mathrm{W} \\cdot 24\\ \\mathrm{h} = 600\\ \\mathrm{Wh} = 0.600\\ \\mathrm{kWh}\n$$\n\nCost:\n\n$$\n\\text{Cost} = E \\cdot \\text{price} = 0.600 \\cdot 1.80 = 1.08\\ \\mathrm{kr}\n$$\n\n**Answer:** About 1.08 kr."
   },
   {
    "level": 3,
    "question": "A car with a mass of 1 200 kg accelerates from 0 to 100 km/h in 8.0 seconds on a flat road. How large is the **average power** that the engine delivers during the acceleration, if we ignore friction?\n\n*Hint: the engine power is converted into kinetic energy.*",
    "answer": {
     "value": 57870,
     "unit": "W",
     "tol": 0.05
    },
    "solution": "The average power is the total energy converted divided by the time. The kinetic energy at 100 km/h:\n\n$$\nv = 100\\ \\mathrm{km/h} = \\frac{100}{3.6} \\approx 27.78\\ \\mathrm{m/s}\n$$\n\n$$\nE_k = \\frac{m v^{2}}{2} = \\frac{1\\,200 \\cdot 27.78^{2}}{2} \\approx \\frac{1\\,200 \\cdot 771.6}{2} \\approx 462\\,960\\ \\mathrm{J}\n$$\n\nPower:\n\n$$\nP_\\text{mean} = \\frac{E_k}{t} = \\frac{462\\,960}{8.0} \\approx 57\\,900\\ \\mathrm{W} \\approx 58\\ \\mathrm{kW}\n$$\n\n**Answer:** About 58 kW.\n\n**General conclusion:** This is the *average* power: the actual maximum power may be clearly higher, since the power varies during the acceleration (usually lower at the beginning, higher when the engine has reached its optimal engine speed). 58 kW corresponds to about 78 hp, which is reasonable for a car's \"0–100\" performance. A sports car with a stronger engine (200+ hp) reaches 100 km/h faster."
   }
  ]
 },
 "fy1-4.6": {
  "kalla": "f90709b860",
  "data": [
   {
    "level": 1,
    "question": "An engine is supplied with 800 J of energy and does 240 J of useful work. What is the engine's efficiency in per cent?",
    "answer": {
     "value": 30,
     "unit": "%",
     "tol": 0.02
    },
    "solution": "$$\n\\eta = \\frac{E_n}{E_t} = \\frac{240}{800} = 0.30 = 30\\,\\%\n$$\n\n**Answer:** 30 %."
   },
   {
    "level": 1,
    "question": "An LED lamp has an efficiency of 0.40 (40 %). How much of its energy consumption becomes useful light if it is supplied with 25 J of energy?",
    "answer": {
     "value": 10,
     "unit": "J",
     "tol": 0.02
    },
    "solution": "$$\nE_n = \\eta \\cdot E_t = 0.40 \\cdot 25 = 10\\ \\mathrm{J}\n$$\n\n**Answer:** 10 J becomes useful light.\n\n**General conclusion:** The remaining $E_t - E_n = 15$ J becomes heat."
   },
   {
    "level": 1,
    "question": "A lift raises 200 kg up 12 metres and uses 30 kJ. Determine the lift's efficiency. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.786,
     "unit": "",
     "tol": 0.03
    },
    "solution": "Useful energy = the potential energy the lift gives the load:\n\n$$\nE_n = m g h = 200 \\cdot 9.82 \\cdot 12 = 23\\,568\\ \\mathrm{J}\n$$\n\nEfficiency:\n\n$$\n\\eta = \\frac{E_n}{E_t} = \\frac{23\\,568}{30\\,000} \\approx 0.79 = 79\\,\\%\n$$\n\n**Answer:** About 0.79 or 79 %."
   },
   {
    "level": 2,
    "question": "A car engine has an efficiency of 28 %. How much chemical energy from the fuel does the car need to do 18 MJ of useful work?",
    "answer": {
     "value": 64.3,
     "unit": "MJ",
     "tol": 0.03
    },
    "solution": "Solve for $E_t$:\n\n$$\n\\eta = \\frac{E_n}{E_t} \\quad\\Leftrightarrow\\quad E_t = \\frac{E_n}{\\eta}\n$$\n\n$$\nE_t = \\frac{18}{0.28} \\approx 64.3\\ \\mathrm{MJ}\n$$\n\n**Answer:** About 64 MJ.\n\n**General conclusion:** The remaining $E_t - E_n \\approx 46.3$ MJ disappears as heat (exhaust gases, cooling system). That is why cars have large radiators: the excess heat is **more** than the useful work."
   },
   {
    "level": 2,
    "question": "A wind turbine receives 850 kW of wind power and delivers 380 kW of electrical power. Determine the efficiency in per cent.",
    "answer": {
     "value": 44.7,
     "unit": "%",
     "tol": 0.03
    },
    "solution": "For continuous operation, efficiency can just as well be calculated from *power*:\n\n$$\n\\eta = \\frac{P_n}{P_t} = \\frac{380}{850} \\approx 0.447 = 44.7\\,\\%\n$$\n\n**Answer:** About 45 %.\n\n**General conclusion:** The theoretical maximum for a wind turbine is Betz's limit of 59.3 % (you cannot extract all the energy from the wind: then the wind would stop completely behind the turbine). Modern wind turbines reach 40–50 %."
   },
   {
    "level": 3,
    "question": "A hydroelectric power station has a head of 95 m, and 320 tonnes of water per second pass through the turbines. The efficiency of the turbines is 0.90 and that of the generators is 0.95. Calculate the power station's **useful output power** (in MW). Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 255,
     "unit": "MW",
     "tol": 0.03
    },
    "solution": "**Step 1: the power supplied** (the potential energy of the water per second):\n\n$$\nP_t = \\frac{E_t}{t} = \\frac{m g h}{t} = \\dot m \\cdot g \\cdot h\n$$\n\nwhere $\\dot m = 320\\,000$ kg/s is the mass flow rate:\n\n$$\nP_t = 320\\,000 \\cdot 9.82 \\cdot 95 \\approx 2.985 \\cdot 10^{8}\\ \\mathrm{W} \\approx 298.5\\ \\mathrm{MW}\n$$\n\n**Step 2: the total efficiency** (turbine + generator combined):\n\n$$\n\\eta_\\text{tot} = \\eta_\\text{turbine} \\cdot \\eta_\\text{gen} = 0.90 \\cdot 0.95 = 0.855\n$$\n\n**Step 3: the useful output power:**\n\n$$\nP_n = \\eta_\\text{tot} \\cdot P_t = 0.855 \\cdot 298.5 \\approx 255\\ \\mathrm{MW}\n$$\n\n**Answer:** About 255 MW.\n\n**General conclusion:** A system of processes in series (water → turbine → generator) has a *total* efficiency that is the product of the individual ones. If each step has an efficiency of 90 %, the total for three steps is $0.9^{3} = 0.73$: that is why you try to minimise the number of energy conversion steps in a power station."
   }
  ]
 },
 "fy1-4.7": {
  "kalla": "7c65042705",
  "data": [
   {
    "level": 1,
    "question": "A car with a mass of 1 500 kg drives at 20 m/s. How large is its momentum?",
    "answer": {
     "value": 30000,
     "unit": "kg·m/s",
     "tol": 0.02
    },
    "solution": "$$\np = m \\cdot v = 1\\,500 \\cdot 20 = 30\\,000\\ \\mathrm{kg \\cdot m/s} = 3.0 \\cdot 10^{4}\\ \\mathrm{kg \\cdot m/s}\n$$\n\n**Answer:** $3.0 \\cdot 10^{4}$ kg·m/s."
   },
   {
    "level": 1,
    "question": "A force of 12 N acts on an object for 4.0 seconds. Calculate the impulse.",
    "answer": {
     "value": 48,
     "unit": "Ns",
     "tol": 0.02
    },
    "solution": "$$\nI = F \\cdot \\Delta t = 12 \\cdot 4.0 = 48\\ \\mathrm{Ns}\n$$\n\n**Answer:** 48 Ns."
   },
   {
    "level": 1,
    "question": "A ball with a mass of 0.40 kg changes its velocity from 6.0 m/s to 14 m/s in the same direction. What impulse has acted on the ball?",
    "answer": {
     "value": 3.2,
     "unit": "Ns",
     "tol": 0.02
    },
    "solution": "The impulse-momentum theorem $I = m \\cdot \\Delta v$:\n\n$$\nI = m (v_2 - v_1) = 0.40 \\cdot (14 - 6.0) = 0.40 \\cdot 8.0 = 3.2\\ \\mathrm{Ns}\n$$\n\n**Answer:** 3.2 Ns."
   },
   {
    "level": 2,
    "question": "A football with a mass of 0.45 kg is lying still. After a kick it has a speed of 25 m/s. The foot is in contact with the ball for 15 ms (0.015 s). Calculate the average force.",
    "answer": {
     "value": 750,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "The impulse from Newton's second law in impulse form:\n\n$$\nF = \\frac{I}{\\Delta t} = \\frac{m \\cdot \\Delta v}{\\Delta t}\n$$\n\n$$\nF = \\frac{0.45 \\cdot 25}{0.015} = \\frac{11.25}{0.015} = 750\\ \\mathrm{N}\n$$\n\n**Answer:** 750 N (corresponds to the weight of about 76 kg)."
   },
   {
    "level": 2,
    "question": "A force acts on an object according to the *F-t* graph below. Calculate the total impulse that has acted on the object.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"104.4\" y1=\"30\" x2=\"104.4\" y2=\"290\"/><line x1=\"148.9\" y1=\"30\" x2=\"148.9\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"237.8\" y1=\"30\" x2=\"237.8\" y2=\"290\"/><line x1=\"282.2\" y1=\"30\" x2=\"282.2\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"371.1\" y1=\"30\" x2=\"371.1\" y2=\"290\"/><line x1=\"415.6\" y1=\"30\" x2=\"415.6\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">F</tspan> (N)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"104.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"148.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"237.8\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"282.2\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"371.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"415.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">9</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text></g><path d=\"M 60.0 290.0 L 193.3 134.0 L 371.1 134.0 L 415.6 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 18,
     "unit": "Ns",
     "tol": 0.03
    },
    "solution": "The impulse corresponds to **the area under the graph**:\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"104.4\" y1=\"30\" x2=\"104.4\" y2=\"290\"/><line x1=\"148.9\" y1=\"30\" x2=\"148.9\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"237.8\" y1=\"30\" x2=\"237.8\" y2=\"290\"/><line x1=\"282.2\" y1=\"30\" x2=\"282.2\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"371.1\" y1=\"30\" x2=\"371.1\" y2=\"290\"/><line x1=\"415.6\" y1=\"30\" x2=\"415.6\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"238.0\" x2=\"460\" y2=\"238.0\"/><line x1=\"60\" y1=\"186.0\" x2=\"460\" y2=\"186.0\"/><line x1=\"60\" y1=\"134.0\" x2=\"460\" y2=\"134.0\"/><line x1=\"60\" y1=\"82.0\" x2=\"460\" y2=\"82.0\"/><line x1=\"60\" y1=\"30.0\" x2=\"460\" y2=\"30.0\"/></g><path d=\"M 60.0 290.0 L 193.3 134.0 L 371.1 134.0 L 415.6 290.0 Z\" fill=\"rgba(200,50,74,0.12)\" stroke=\"none\"/><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">F</tspan> (N)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"104.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"148.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"237.8\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"282.2\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"371.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"415.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">9</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"243.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"53\" y=\"191.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"139.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"53\" y=\"87.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"35.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">5</text></g><path d=\"M 60.0 290.0 L 193.3 134.0 L 371.1 134.0 L 415.6 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>\n\nWe divide the area into three parts:\n- **A** (triangle, 0–3 s): $\\dfrac{3 \\cdot 3}{2} = 4.5\\ \\mathrm{Ns}$\n- **B** (rectangle, 3–7 s): $4 \\cdot 3 = 12\\ \\mathrm{Ns}$\n- **C** (triangle, 7–8 s): $\\dfrac{1 \\cdot 3}{2} = 1.5\\ \\mathrm{Ns}$\n\n$$\nI = A + B + C = 4.5 + 12 + 1.5 = 18\\ \\mathrm{Ns}\n$$\n\n**Answer:** 18 Ns."
   },
   {
    "level": 3,
    "question": "An **airbag** is used in a car crash to protect a passenger with a mass of 75 kg. The car is driving at 60 km/h and stops instantly.\n\na) Calculate the passenger's momentum before the crash.\n\nb) **Without** an airbag, the passenger is stopped by the crash in 0.10 s. How large is the average force on him?\n\nc) **With** an airbag, the stopping time is extended to 0.40 s. How large is the average force then?\n\n*Give the force from (c) as your numerical answer in N.*",
    "answer": {
     "value": 3125,
     "unit": "N",
     "tol": 0.03
    },
    "delsvar": [
     {
      "del": "a",
      "value": 1250,
      "unit": "kg·m/s",
      "tol": 0.03
     },
     {
      "del": "b",
      "value": 12500,
      "unit": "N",
      "tol": 0.03
     },
     {
      "del": "c",
      "value": 3125,
      "unit": "N",
      "tol": 0.03
     }
    ],
    "solution": "**a) Momentum before:** $v_0 = 60\\ \\mathrm{km/h} = 60/3.6 \\approx 16.67\\ \\mathrm{m/s}$.\n\n$$\np_0 = m \\cdot v_0 = 75 \\cdot 16.67 \\approx 1\\,250\\ \\mathrm{kg \\cdot m/s}\n$$\n\nIn both cases this momentum must become zero, which requires the impulse $I = 1\\,250$ Ns (directed backwards).\n\n**b) Without an airbag**: $\\Delta t = 0.10$ s:\n\n$$\nF = \\frac{I}{\\Delta t} = \\frac{1\\,250}{0.10} = 12\\,500\\ \\mathrm{N} = 12.5\\ \\mathrm{kN}\n$$\n\n**c) With an airbag**: $\\Delta t = 0.40$ s (a stopping time four times as long):\n\n$$\nF = \\frac{1\\,250}{0.40} = 3\\,125\\ \\mathrm{N} \\approx 3.1\\ \\mathrm{kN}\n$$\n\n**Answer:** a) about 1 250 kg·m/s. b) about 12.5 kN. c) about 3.1 kN.\n\n**General conclusion:** Extending the stopping time by a factor of 4 (from 0.10 s to 0.40 s) **reduces the force** on the passenger by the same factor of 4. This is the whole basic principle behind all \"crash protection\": airbags, crash-safe car bodies, non-slip mats in the car, parachutes. They extend the time during which the impulse acts, and so they reduce the peak force."
   }
  ]
 },
 "fy1-4.8": {
  "kalla": "d2915d807a",
  "data": [
   {
    "level": 1,
    "question": "Two goods wagons collide and **couple together**. Wagon A (12 000 kg) moves at 4.0 m/s to the right, and wagon B (8 000 kg) stands still. What common velocity do they get after the collision?",
    "answer": {
     "value": 2.4,
     "unit": "m/s",
     "tol": 0.02
    },
    "solution": "Inelastic collision: the momentum is conserved, and the wagons have a common final speed:\n\n$$\nm_A v_{A0} + m_B v_{B0} = (m_A + m_B) v\n$$\n\n$$\nv = \\frac{m_A v_{A0} + m_B v_{B0}}{m_A + m_B} = \\frac{12\\,000 \\cdot 4.0 + 8\\,000 \\cdot 0}{12\\,000 + 8\\,000} = \\frac{48\\,000}{20\\,000} = 2.4\\ \\mathrm{m/s}\n$$\n\n**Answer:** 2.4 m/s to the right."
   },
   {
    "level": 1,
    "question": "A trampolinist with a mass of 50 kg stands still on the ground and fires a rifle. The bullet (0.015 kg) leaves the barrel at a speed of 600 m/s. With what velocity does the person recoil backwards? Ignore friction against the ground.",
    "answer": {
     "value": 0.18,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "Before: both are at rest, total momentum = 0. After: the bullet flies forwards with $v_k = +600$ m/s, and the person recoils with $v_p$.\n\nConservation of momentum:\n\n$$\n0 = m_k v_k + m_p v_p \\quad\\Leftrightarrow\\quad v_p = -\\frac{m_k v_k}{m_p}\n$$\n\n$$\nv_p = -\\frac{0.015 \\cdot 600}{50} = -\\frac{9.0}{50} = -0.18\\ \\mathrm{m/s}\n$$\n\nThe minus sign means motion opposite to the bullet.\n\n**Answer:** The person recoils at 0.18 m/s backwards."
   },
   {
    "level": 1,
    "question": "Agnes (60 kg) and Boel (85 kg) stand still on inline skates and push each other away. Immediately after the push, Agnes moves at 0.50 m/s to the right. What velocity does Boel get?",
    "answer": {
     "value": -0.353,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "Before: both at rest, total momentum = 0. After: Agnes to the right ($v_A = +0.50$ m/s), Boel to the left ($v_B$).\n\n$$\n0 = m_A v_A + m_B v_B \\quad\\Leftrightarrow\\quad v_B = -\\frac{m_A v_A}{m_B}\n$$\n\n$$\nv_B = -\\frac{60 \\cdot 0.50}{85} \\approx -0.353\\ \\mathrm{m/s}\n$$\n\n**Answer:** Boel glides to the left at about 0.35 m/s (that is, $v_B \\approx -0.35$ m/s).\n\n**General conclusion:** The heavier body gets a lower velocity: that is the whole point of recoil. The shooter is \"thrown\" backwards much less than the bullet because of their larger mass."
   },
   {
    "level": 2,
    "question": "Two compact railway wagons collide and **couple together**. Wagon A (10 tonnes) moves to the right at 5.0 m/s. Wagon B (15 tonnes) moves to the left at 3.0 m/s. Determine the wagons' common final velocity (with its sign: the positive direction is to the right).",
    "answer": {
     "value": 0.2,
     "unit": "m/s",
     "tol": 0.05
    },
    "solution": "Inelastic collision with signs:\n\n$$\nv = \\frac{m_A v_A + m_B v_B}{m_A + m_B} = \\frac{10\\,000 \\cdot 5.0 + 15\\,000 \\cdot (-3.0)}{10\\,000 + 15\\,000}\n$$\n\n$$\nv = \\frac{50\\,000 - 45\\,000}{25\\,000} = \\frac{5\\,000}{25\\,000} = 0.20\\ \\mathrm{m/s}\n$$\n\n**Answer:** 0.20 m/s to the right."
   },
   {
    "level": 2,
    "question": "A ball with a mass of 0.30 kg moves at a speed of 8.0 m/s to the right. It bounces off a wall and afterwards moves at 6.0 m/s to the left (almost elastically). How large is the **impulse** on the ball from the wall?",
    "answer": {
     "value": 4.2,
     "unit": "Ns",
     "tol": 0.03
    },
    "solution": "The impulse-momentum theorem: $I = \\Delta p = m (v_2 - v_1)$. Take the direction to the right as positive:\n\n$$\nv_1 = +8.0\\ \\mathrm{m/s},\\quad v_2 = -6.0\\ \\mathrm{m/s}\n$$\n\n$$\nI = m (v_2 - v_1) = 0.30 \\cdot (-6.0 - 8.0) = 0.30 \\cdot (-14) = -4.2\\ \\mathrm{Ns}\n$$\n\nThe *magnitude* of the impulse is 4.2 Ns (directed to the left: the wall pushes the ball back).\n\n**Answer:** 4.2 Ns.\n\n**General conclusion:** Note that $|\\Delta v| = 14$ m/s, not 2 m/s. In a bounce the velocity is *completely* reversed, so the change in velocity is the sum of the magnitudes of the incoming and outgoing speeds. This is why bouncing balls feel harder than balls that just slow down."
   },
   {
    "level": 3,
    "question": "A **small bullet** with a mass of 0.050 kg is fired horizontally at a speed of 320 m/s into a stationary **wooden block** with a mass of 2.0 kg that hangs freely from a string (a ballistic pendulum). The bullet gets stuck in the block, and both swing up together.\n\nHow high (vertically) do the block + bullet swing up before they stop? Use $g = 9.82\\ \\mathrm{N/kg}$ and ignore friction in the suspension.",
    "answer": {
     "value": 3.1,
     "unit": "m",
     "tol": 0.05
    },
    "solution": "A two-part problem: **(I)** conservation of momentum in the collision, **(II)** the principle of conservation of energy for the upward swing.\n\n**Step I: the common speed immediately after the collision.** Inelastic collision:\n\n$$\nm_k v_k = (m_k + m_b) v_g \\quad\\Leftrightarrow\\quad v_g = \\frac{m_k v_k}{m_k + m_b}\n$$\n\n$$\nv_g = \\frac{0.050 \\cdot 320}{0.050 + 2.0} = \\frac{16}{2.050} \\approx 7.80\\ \\mathrm{m/s}\n$$\n\n**Step II: how high do the block + bullet swing?** The principle of conservation of energy: the kinetic energy immediately after the collision is completely converted into potential energy at the top.\n\n$$\n\\frac{(m_k + m_b) v_g^{2}}{2} = (m_k + m_b) g h \\quad\\Leftrightarrow\\quad h = \\frac{v_g^{2}}{2 g}\n$$\n\n(The mass cancels out after the collision.)\n\n$$\nh = \\frac{7.80^{2}}{2 \\cdot 9.82} \\approx \\frac{60.9}{19.64} \\approx 3.10\\ \\mathrm{m}\n$$\n\n**Answer:** The block and the bullet swing up about 3.1 m vertically.\n\n**General conclusion:** This is a **ballistic pendulum**: a historical method of measuring the speed of projectiles. By measuring the rise $h$ you can calculate backwards:\n\n$$\nv_k = \\frac{m_k + m_b}{m_k} \\sqrt{2 g h}\n$$\n\nNote that **the kinetic energy is NOT conserved** in the collision: only a fraction of the bullet's original $E_k$ becomes the common kinetic energy (the rest becomes heat in the wood and deformation). That is why we need *two separate* physical principles for the problem: momentum in the collision, energy in the swing."
   }
  ]
 },
 "fy1-4.9": {
  "kalla": "ec7bcee767",
  "data": [
   {
    "level": 1,
    "question": "A box is pulled 12 m along a flat floor against a frictional force of 35 N. How much **frictional heat** is generated?",
    "answer": {
     "value": 420,
     "unit": "J",
     "tol": 0.02
    },
    "solution": "$$\nE_v = F_f \\cdot s = 35 \\cdot 12 = 420\\ \\mathrm{J}\n$$\n\n**Answer:** 420 J."
   },
   {
    "level": 1,
    "question": "A box with a mass of 18 kg is pulled along a flat floor. The coefficient of friction between the box and the floor is 0.25. How much **frictional heat** is generated when the box is pulled 6.0 m? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 265,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "On a flat floor $F_N = mg$, so the frictional force is:\n\n$$\nF_f = \\mu \\cdot m \\cdot g = 0.25 \\cdot 18 \\cdot 9.82 \\approx 44.2\\ \\mathrm{N}\n$$\n\nFrictional heat:\n\n$$\nE_v = F_f \\cdot s = 44.2 \\cdot 6.0 \\approx 265\\ \\mathrm{J}\n$$\n\n**Answer:** About 265 J."
   },
   {
    "level": 2,
    "question": "A trolley with a mass of 32 kg is pulled 5.0 m up an inclined plane at an angle of 30°. The coefficient of friction is 0.35. How much **work** is required? Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 1262,
     "unit": "J",
     "tol": 0.03
    },
    "solution": "The work goes into two energies: an increase in potential energy and frictional heat.\n\n$$\nW = \\Delta E_p + E_v = m g h + F_f \\cdot s\n$$\n\n**Increase in height:**\n\n$$\nh = s \\sin\\alpha = 5.0 \\cdot \\sin 30^{\\circ} = 2.5\\ \\mathrm{m}\n$$\n\n**Normal force on an inclined plane:**\n\n$$\nF_N = m g \\cos\\alpha = 32 \\cdot 9.82 \\cdot \\cos 30^{\\circ} \\approx 272.1\\ \\mathrm{N}\n$$\n\n**Frictional force:**\n\n$$\nF_f = \\mu F_N = 0.35 \\cdot 272.1 \\approx 95.3\\ \\mathrm{N}\n$$\n\n**Work:**\n\n$$\nW = 32 \\cdot 9.82 \\cdot 2.5 + 95.3 \\cdot 5.0 = 785.6 + 476.3 \\approx 1\\,262\\ \\mathrm{J}\n$$\n\n**Answer:** About 1.3 kJ.\n\n**General conclusion:** Of the work of about 1.26 kJ, about 60 % becomes potential energy (786 J) and 40 % frictional heat (476 J). Without friction (the ideal case), only 786 J would have been needed."
   },
   {
    "level": 2,
    "question": "A 0.40 kg ice hockey puck is shot away at a speed of 8.0 m/s and then slides 35 m before it stops on a flat ice rink. Calculate the coefficient of friction between the puck and the ice. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.093,
     "unit": "",
     "tol": 0.05
    },
    "solution": "All the kinetic energy is converted into frictional heat:\n\n$$\nE_v = E_k \\quad\\Leftrightarrow\\quad F_f \\cdot s = \\frac{m v_0^{2}}{2}\n$$\n\nWith $F_f = \\mu m g$ on a flat surface:\n\n$$\n\\mu m g s = \\frac{m v_0^{2}}{2} \\quad\\Leftrightarrow\\quad \\mu = \\frac{v_0^{2}}{2 g s}\n$$\n\nThe mass cancels out:\n\n$$\n\\mu = \\frac{8.0^{2}}{2 \\cdot 9.82 \\cdot 35} = \\frac{64}{687.4} \\approx 0.093\n$$\n\n**Answer:** The coefficient of friction is about 0.093.\n\n**General conclusion:** The friction between a rubber hockey puck and freshly resurfaced ice is usually 0.05–0.10, which agrees with this result. This is *among the lowest coefficients of friction* for everyday materials."
   },
   {
    "level": 3,
    "question": "A cyclist (bicycle + person 85 kg in total) starts from rest at the top of a hill 18 m high. The length of the track down to the valley is 240 m. When the cyclist reaches the bottom of the valley, they have a speed of 14 m/s. Ignore air resistance.\n\na) How large is the average frictional force (rolling resistance) that has acted during the descent?\n\nb) How large is the coefficient of friction, if we make the (somewhat rough) approximation that the normal force during the whole ride is equal to $m g \\cos\\beta$, where $\\beta$ is the average slope of the track and $\\sin\\beta = h/L$?\n\n*Give the frictional force from (a) as your numerical answer in N.*",
    "answer": {
     "value": 27.9,
     "unit": "N",
     "tol": 0.05
    },
    "delsvar": [
     {
      "del": "a",
      "value": 27.9,
      "unit": "N",
      "tol": 0.05
     },
     {
      "del": "b",
      "value": 0.034,
      "unit": "",
      "tol": 0.05
     }
    ],
    "solution": "**a) Frictional force.** The principle of conservation of energy with friction:\n\n$$\nm g h = \\frac{m v^{2}}{2} + E_v\n\\quad\\Leftrightarrow\\quad\nE_v = m g h - \\frac{m v^{2}}{2}\n$$\n\n$$\nE_v = 85 \\cdot 9.82 \\cdot 18 - \\frac{85 \\cdot 14^{2}}{2} = 15\\,025 - 8\\,330 = 6\\,695\\ \\mathrm{J}\n$$\n\nThe frictional force that has acted over the distance 240 m:\n\n$$\nF_f = \\frac{E_v}{s} = \\frac{6\\,695}{240} \\approx 27.9\\ \\mathrm{N}\n$$\n\n**b) Coefficient of friction.** The average slope $\\beta$ satisfies $\\sin\\beta = h/L = 18/240 = 0.075$, which gives $\\beta \\approx 4.3^{\\circ}$ and $\\cos\\beta \\approx 0.997$.\n\n$$\nF_N \\approx m g \\cos\\beta = 85 \\cdot 9.82 \\cdot 0.997 \\approx 832\\ \\mathrm{N}\n$$\n\n$$\n\\mu = \\frac{F_f}{F_N} = \\frac{27.9}{832} \\approx 0.034\n$$\n\n**Answer:** a) The frictional force is about 28 N. b) The coefficient of friction is about 0.034.\n\n**General conclusion:** The value is several times larger than the typical rolling resistance of bicycle tyres on asphalt, which is around 0.003–0.008. The explanation is that the problem ignores air resistance. In reality air resistance accounts for a large part of the energy loss, and at 14 m/s it is probably the **larger** force. So in practice the calculated frictional force includes both losses."
   }
  ]
 }
});
