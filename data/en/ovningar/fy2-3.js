/* Engelsk översättning av ovningar (fy2-3). Skriven av .claude/i18n/skriv-innehall.js.
 * `kalla` = fingeravtryck av den svenska posten vid översättningen (verify-engelska.js). */
I18N.innehall('ovningar', {
 "fy2-3.1": {
  "kalla": "4381125f46",
  "data": [
   {
    "level": 1,
    "question": "What is meant by a **permanent magnet**?",
    "choices": [
     "A magnet made of aluminium or copper.",
     "A metal (for example iron, steel or nickel) that keeps its magnetic properties for a long time.",
     "A magnet that only works when a current flows through it.",
     "A magnet that is turned upside down at regular intervals."
    ],
    "correct": 1,
    "solution": "Permanent magnets are made of **ferromagnetic materials** such as iron, steel or nickel and keep their magnetic properties without needing any supplied energy. Examples: bar magnets, fridge magnets.\n\nMagnets that only work with a supplied current are called **electromagnets** (see 3.3). The advantage is that the size and direction of the field can be controlled through the current."
   },
   {
    "level": 1,
    "question": "Two bar magnets are brought towards each other with their **north poles facing each other**. What happens?",
    "choices": [
     "The north pole of one magnet turns into a south pole.",
     "They attract each other (are pulled together).",
     "Nothing happens: north poles do not affect each other.",
     "They repel each other (are pushed apart)."
    ],
    "correct": 3,
    "solution": "**Like poles repel each other** and **unlike poles attract each other**. Since both magnets have their north poles facing each other, they repel.\n\n**General conclusion:** This is analogous to electric charges: like charges repel, unlike charges attract."
   },
   {
    "level": 1,
    "question": "A bar magnet is **cut in half**. What happens?",
    "choices": [
     "The magnetisation disappears completely: both halves become non-magnetic.",
     "One part becomes a lone north pole, the other a lone south pole.",
     "One half gets double the strength, the other none.",
     "Both halves become new, smaller bar magnets, each with its own north pole and south pole."
    ],
    "correct": 3,
    "solution": "**Magnetic poles always occur in pairs.** When a magnet is cut, two new, shorter magnets are formed, each with a north pole and a south pole. It is **never** possible to create a magnet with only one pole (a so-called *magnetic monopole*). This is a fundamental property of magnetism."
   },
   {
    "level": 2,
    "question": "How are magnetic field lines drawn around a bar magnet?",
    "choices": [
     "As straight lines from the south pole to the north pole, outside the magnet.",
     "As curved lines going *from the north pole to the south pole* outside the magnet and back inside it.",
     "As concentric circles around the magnet.",
     "As straight lines pointing straight out from the middle of the magnet."
    ],
    "correct": 1,
    "solution": "Magnetic field lines **start at the north pole and end at the south pole** (outside the magnet) and form closed curves by continuing inside the magnet from south to north. The direction is defined as the direction in which the north pole of a compass needle points.\n\nThe fact that the field lines are always closed curves (never interrupted at a pole) is a consequence of magnetic monopoles not existing."
   },
   {
    "level": 2,
    "question": "Two bar magnets are drawn with similar field lines around them, but for the first one the field lines are **closer together** than for the second. What does that mean?",
    "choices": [
     "The first magnet has a stronger magnetic field where the field lines are closer together.",
     "The first magnet has a weaker magnetic field: the field lines crowd together when the field is small.",
     "The density of the field lines says nothing about the strength of the field.",
     "The first magnet is physically smaller."
    ],
    "correct": 0,
    "solution": "**The density of field lines is a measure of the strength of the magnetic field.** Where the field lines are closer together the field is stronger; where they are further apart the field is weaker.\n\n**General conclusion:** This is why field lines are never allowed to cross in a figure: an intersection would mean that the field has two different directions at the same point at the same time, which is physically impossible."
   },
   {
    "level": 3,
    "question": "The north pole of a compass needle points towards the Earth's geographic North Pole. What kind of **magnetic** pole does the Earth then have in the north?",
    "choices": [
     "A north pole, and that is why the compass points there.",
     "A south pole, since the north pole of the compass is attracted by a south pole.",
     "Both at once: the Earth's North Pole has both kinds of pole at the same time.",
     "None: the Earth has no magnetic field at the poles."
    ],
    "correct": 1,
    "solution": "**The Earth's magnetic pole in the north is a south pole!** The insight comes from the rule that unlike poles attract:\n\n- The *north pole* of the compass needle is pulled towards the Earth's *geographic* North Pole.\n- For a north pole to be pulled there, the pole there must be a *south pole* (unlike poles attract).\n\nThe name north pole of a magnet means \"the end that points north\", not that the end itself is some kind of geographic North Pole. The words North Pole and South Pole with capital letters are kept for the Earth's geographic poles.\n\n**General conclusion:** This is a classic \"trap\" problem that tests whether the student really understands the pole convention and can think counter-intuitively."
   }
  ]
 },
 "fy2-3.2": {
  "kalla": "ad04e40bec",
  "data": [
   {
    "level": 1,
    "question": "A long straight conductor carries the current $3.5\\ \\mathrm{A}$. Calculate the magnetic flux density $2.0\\ \\mathrm{cm}$ from the conductor. Use $k = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 160\" width=\"300\" height=\"160\" style=\"display:block;margin:14px auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\">\n  <circle cx=\"80\" cy=\"80\" r=\"13\" fill=\"#fafaf5\" stroke=\"#1a1d24\" stroke-width=\"1.6\"/>\n  <circle cx=\"80\" cy=\"80\" r=\"3\" fill=\"#1a1d24\"/>\n  <text x=\"60\" y=\"62\" text-anchor=\"end\" font-size=\"12\" fill=\"#1a1d24\"><tspan font-style=\"italic\">I</tspan> = 3.5 A</text>\n  <circle cx=\"220\" cy=\"80\" r=\"3.5\" fill=\"#c8324a\"/>\n  <text x=\"226\" y=\"76\" font-size=\"12\" fill=\"#1a1d24\">P</text>\n  <line x1=\"93\" y1=\"80\" x2=\"217\" y2=\"80\" stroke=\"#5a6172\" stroke-width=\"1\" stroke-dasharray=\"4 3\"/>\n  <text x=\"156\" y=\"98\" text-anchor=\"middle\" font-size=\"12\" fill=\"#5a6172\"><tspan font-style=\"italic\">d</tspan> = 2.0 cm</text>\n</svg>",
    "answer": {
     "value": 0.000035,
     "unit": "T"
    },
    "solution": "The magnetic field around a long straight conductor is given by\n\n$$ B = k \\cdot \\frac{I}{d} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nk = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nI = 3.5\\ \\mathrm{A} \\\\\nd = 2.0\\ \\mathrm{cm} = 0.020\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ B = 2.0\\cdot 10^{-7} \\cdot \\frac{3.5}{0.020} = 3.5\\cdot 10^{-5}\\ \\mathrm{T} = 35\\ \\mathrm{\\mu T} $$\n\n**Answer:** $35\\ \\mathrm{\\mu T}$ (or $3.5\\cdot 10^{-5}\\ \\mathrm{T}$)."
   },
   {
    "level": 1,
    "question": "At a distance of $5.0\\ \\mathrm{cm}$ from a long straight conductor, the magnetic flux density is measured to be $50\\ \\mathrm{\\mu T}$. How large is the current in the conductor?",
    "answer": {
     "value": 12.5,
     "unit": "A"
    },
    "solution": "We solve for the current in the formula for the magnetic field around a straight conductor:\n\n$$ B = k \\cdot \\frac{I}{d} \\quad\\Leftrightarrow\\quad I = \\frac{B \\cdot d}{k} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 50\\ \\mathrm{\\mu T} = 5.0\\cdot 10^{-5}\\ \\mathrm{T} \\\\\nd = 5.0\\ \\mathrm{cm} = 0.050\\ \\mathrm{m} \\\\\nk = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A}\n\\end{array} \\right]\n$$\n\n$$ I = \\frac{5.0\\cdot 10^{-5} \\cdot 0.050}{2.0\\cdot 10^{-7}} = 12.5\\ \\mathrm{A} $$\n\n**Answer:** The current is $13\\ \\mathrm{A}$ (more precisely $12.5\\ \\mathrm{A}$)."
   },
   {
    "level": 1,
    "question": "How far from a long straight conductor carrying the current $8.0\\ \\mathrm{A}$ is the magnetic flux density $1.0\\cdot 10^{-4}\\ \\mathrm{T}$?",
    "answer": {
     "value": 0.016,
     "unit": "m"
    },
    "solution": "We solve for the distance:\n\n$$ B = k \\cdot \\frac{I}{d} \\quad\\Leftrightarrow\\quad d = \\frac{k \\cdot I}{B} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nk = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nI = 8.0\\ \\mathrm{A} \\\\\nB = 1.0\\cdot 10^{-4}\\ \\mathrm{T}\n\\end{array} \\right]\n$$\n\n$$ d = \\frac{2.0\\cdot 10^{-7} \\cdot 8.0}{1.0\\cdot 10^{-4}} = 0.016\\ \\mathrm{m} = 1.6\\ \\mathrm{cm} $$\n\n**Answer:** The distance is $1.6\\ \\mathrm{cm}$."
   },
   {
    "level": 2,
    "question": "A long straight conductor is perpendicular to the paper with the current $2.5\\ \\mathrm{A}$ **into the plane**. A point P lies $4.0\\ \\mathrm{cm}$ straight to the right of the conductor. Determine the magnitude and direction of the magnetic field at the point P. Use $k = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 200\" style=\"display:block;margin:14px auto;max-width:280px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><circle cx=\"140\" cy=\"100\" r=\"13\" fill=\"#fafaf5\" stroke=\"#1a1d24\" stroke-width=\"1.6\"/><line x1=\"133\" y1=\"93\" x2=\"147\" y2=\"107\" stroke=\"#1a1d24\" stroke-width=\"1.8\"/><line x1=\"133\" y1=\"107\" x2=\"147\" y2=\"93\" stroke=\"#1a1d24\" stroke-width=\"1.8\"/><text x=\"160\" y=\"105\" font-size=\"12\" fill=\"#1a1d24\"><tspan font-style=\"italic\">I</tspan> = 2.5 A</text></svg>",
    "answer": {
     "value": 0.0000125,
     "unit": "T"
    },
    "solution": "**Step 1: the magnitude of the field.**\n\n$$ B = k \\cdot \\frac{I}{d} = 2.0\\cdot 10^{-7} \\cdot \\frac{2.5}{0.040} = 1.25\\cdot 10^{-5}\\ \\mathrm{T} = 12.5\\ \\mathrm{\\mu T} $$\n\n**Step 2: the direction of the field with the thumb rule.** The thumb points in the direction of the current (into the plane). Then the fingers point *clockwise* as seen from the reader's side. At the point P (straight to the right of the conductor) the direction of the field is **downwards** (clockwise circulation around the conductor).\n\n**Answer:** The magnetic field is about $13\\ \\mathrm{\\mu T}$ directed **downwards**.\n\n**General conclusion:** The right-hand thumb rule is central for determining the direction of the field. Thumb = current, fingers = field. For a current into the plane the circulation is always clockwise as seen from the reader."
   },
   {
    "level": 2,
    "question": "Two parallel conductors are $6.0\\ \\mathrm{cm}$ apart. The left one carries the current $4.0\\ \\mathrm{A}$ **out of the plane** and the right one carries the current $3.0\\ \\mathrm{A}$ **into the plane**. Determine the magnitude of the magnetic field at the midpoint P between the conductors (that is, $3.0\\ \\mathrm{cm}$ from each conductor).",
    "answer": {
     "value": 0.0000467,
     "unit": "T"
    },
    "solution": "**The key insight is that the fields from the two conductors *reinforce each other* (point the same way) at the midpoint.** The left conductor has its current *out* (anticlockwise circulation) → field *downwards* at P; the right conductor has its current *in* (clockwise circulation) → field also *downwards* at P.\n\n**Field from the left conductor at P:**\n\n$$ B_1 = k \\cdot \\frac{I_1}{d} = 2.0\\cdot 10^{-7} \\cdot \\frac{4.0}{0.030} = 2.67\\cdot 10^{-5}\\ \\mathrm{T} $$\n\n**Field from the right conductor at P:**\n\n$$ B_2 = k \\cdot \\frac{I_2}{d} = 2.0\\cdot 10^{-7} \\cdot \\frac{3.0}{0.030} = 2.00\\cdot 10^{-5}\\ \\mathrm{T} $$\n\n**Total field (reinforcing):**\n\n$$ B = B_1 + B_2 = 2.67\\cdot 10^{-5} + 2.00\\cdot 10^{-5} = 4.67\\cdot 10^{-5}\\ \\mathrm{T} $$\n\n**Answer:** The magnetic field is about $47\\ \\mathrm{\\mu T}$.\n\n**General conclusion:** Two parallel currents in the same direction give fields that *counteract each other* at the midpoint; two in opposite directions give fields that *reinforce each other*. The thumb rule is crucial for deciding which case we have."
   },
   {
    "level": 3,
    "question": "Two parallel conductors $\\ell_1$ and $\\ell_2$ are $12\\ \\mathrm{cm}$ apart. Both carry current **in the same direction**: $\\ell_1$ has the current $6.0\\ \\mathrm{A}$ and $\\ell_2$ has $2.0\\ \\mathrm{A}$. At what distance from $\\ell_1$ (on the line between the conductors) is the total magnetic flux density **zero**?",
    "answer": {
     "value": 0.09,
     "unit": "m"
    },
    "solution": "**The key insight is that since both currents flow in the same direction, the fields from the two conductors will be *oppositely directed* at a point between them.** For the total flux density to be zero, the fields must have equal magnitude.\n\nLet $x$ be the distance from $\\ell_1$ to the zero point. Then the distance from $\\ell_2$ to the same point is $12 - x$ (in cm) or $0.12 - x$ (in m).\n\n**Condition: $B_1 = B_2$.**\n\n$$ k \\cdot \\frac{I_1}{x} = k \\cdot \\frac{I_2}{0.12 - x} $$\n\n$$ \\frac{I_1}{x} = \\frac{I_2}{0.12 - x} \\quad\\Leftrightarrow\\quad I_1\\cdot(0.12 - x) = I_2 \\cdot x $$\n\n$$ I_1\\cdot 0.12 - I_1\\cdot x = I_2\\cdot x \\quad\\Leftrightarrow\\quad x = \\frac{I_1\\cdot 0.12}{I_1 + I_2} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nI_1 = 6.0\\ \\mathrm{A} \\\\\nI_2 = 2.0\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\n$$ x = \\frac{6.0 \\cdot 0.12}{6.0 + 2.0} = \\frac{0.72}{8.0} = 0.090\\ \\mathrm{m} = 9.0\\ \\mathrm{cm} $$\n\n**Answer:** The zero point lies $9.0\\ \\mathrm{cm}$ from $\\ell_1$ (and $3.0\\ \\mathrm{cm}$ from $\\ell_2$).\n\n**General conclusion:** The zero point lies **closer to the conductor with the smaller current**, since a smaller distance is needed to weaken the stronger conductor's field to the same level as the weaker one. For opposite currents the zero point is instead *outside* the conductors, not between them."
   }
  ]
 },
 "fy2-3.3": {
  "kalla": "39084b84fa",
  "data": [
   {
    "level": 1,
    "question": "A long straight coil (solenoid) has $500$ turns and the length $10\\ \\mathrm{cm}$. The current is $2.0\\ \\mathrm{A}$. Calculate the magnetic flux density inside the coil. Use $\\mu_0 = 4\\pi\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A}$.",
    "answer": {
     "value": 0.01257,
     "unit": "T"
    },
    "solution": "The magnetic flux density in a solenoid is\n\n$$ B = \\mu_0 \\cdot \\frac{n\\cdot I}{l} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\n\\mu_0 = 4\\pi\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nn = 500 \\\\\nI = 2.0\\ \\mathrm{A} \\\\\nl = 10\\ \\mathrm{cm} = 0.10\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ B = 4\\pi\\cdot 10^{-7} \\cdot \\frac{500 \\cdot 2.0}{0.10} = 4\\pi\\cdot 10^{-7} \\cdot 10\\,000 = 1.257\\cdot 10^{-2}\\ \\mathrm{T} \\approx 13\\ \\mathrm{mT} $$\n\n**Answer:** The magnetic flux density is about $13\\ \\mathrm{mT}$.\n\n**General conclusion:** Inside a long straight coil the field is roughly uniform, equally strong everywhere. This is the difference from a long straight conductor, where the field decreases as $1/d$ with the distance."
   },
   {
    "level": 1,
    "question": "How many turns must a coil have to give the magnetic flux density $20\\ \\mathrm{mT}$ inside it, if the length of the coil is $8.0\\ \\mathrm{cm}$ and the current is $1.5\\ \\mathrm{A}$?",
    "answer": {
     "value": 849,
     "unit": "turns"
    },
    "solution": "We solve for the number of turns $n$:\n\n$$ B = \\mu_0 \\cdot \\frac{n\\cdot I}{l} \\quad\\Leftrightarrow\\quad n = \\frac{B \\cdot l}{\\mu_0 \\cdot I} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 20\\ \\mathrm{mT} = 0.020\\ \\mathrm{T} \\\\\nl = 8.0\\ \\mathrm{cm} = 0.080\\ \\mathrm{m} \\\\\n\\mu_0 = 4\\pi\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nI = 1.5\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\n$$ n = \\frac{0.020 \\cdot 0.080}{4\\pi\\cdot 10^{-7} \\cdot 1.5} = \\frac{1.6\\cdot 10^{-3}}{1.885\\cdot 10^{-6}} \\approx 849 $$\n\n**Answer:** The coil should have about $850$ turns."
   },
   {
    "level": 1,
    "question": "A coil with $300$ turns and the length $5.0\\ \\mathrm{cm}$ is to give the magnetic field $25\\ \\mathrm{mT}$ inside it. What current is needed?",
    "answer": {
     "value": 3.32,
     "unit": "A"
    },
    "solution": "We solve for the current:\n\n$$ B = \\mu_0 \\cdot \\frac{n\\cdot I}{l} \\quad\\Leftrightarrow\\quad I = \\frac{B \\cdot l}{\\mu_0 \\cdot n} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 25\\ \\mathrm{mT} = 0.025\\ \\mathrm{T} \\\\\nl = 0.050\\ \\mathrm{m} \\\\\n\\mu_0 = 4\\pi\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nn = 300\n\\end{array} \\right]\n$$\n\n$$ I = \\frac{0.025 \\cdot 0.050}{4\\pi\\cdot 10^{-7} \\cdot 300} = \\frac{1.25\\cdot 10^{-3}}{3.77\\cdot 10^{-4}} \\approx 3.32\\ \\mathrm{A} $$\n\n**Answer:** The current should be about $3.3\\ \\mathrm{A}$."
   },
   {
    "level": 2,
    "question": "A wire is wound into a coil with $1\\,200$ turns on a former that is $25\\ \\mathrm{cm}$ long. The coil is connected to a power supply. At what current does the magnetic field inside the coil become as strong as the Earth's magnetic field at the equator ($30\\ \\mathrm{\\mu T}$)?",
    "answer": {
     "value": 0.00497,
     "unit": "A"
    },
    "solution": "We use the solenoid formula and solve for the current:\n\n$$ I = \\frac{B \\cdot l}{\\mu_0 \\cdot n} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 30\\ \\mathrm{\\mu T} = 3.0\\cdot 10^{-5}\\ \\mathrm{T} \\\\\nl = 0.25\\ \\mathrm{m} \\\\\n\\mu_0 = 4\\pi\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nn = 1\\,200\n\\end{array} \\right]\n$$\n\n$$ I = \\frac{3.0\\cdot 10^{-5} \\cdot 0.25}{4\\pi\\cdot 10^{-7} \\cdot 1\\,200} = \\frac{7.5\\cdot 10^{-6}}{1.508\\cdot 10^{-3}} \\approx 4.97\\cdot 10^{-3}\\ \\mathrm{A} \\approx 5.0\\ \\mathrm{mA} $$\n\n**Answer:** The current is about $5.0\\ \\mathrm{mA}$.\n\n**General conclusion:** With many turns, a small current can give a decent magnetic field. This is why coils (electromagnets) are common in technology: the field can be controlled without needing large currents."
   },
   {
    "level": 2,
    "question": "Two identical coils (same length, same number of turns) are connected to power supplies. The first has the current $2.0\\ \\mathrm{A}$ and gives the magnetic field $30\\ \\mathrm{mT}$. The second has $5.0\\ \\mathrm{A}$. What magnetic field does it give?",
    "answer": {
     "value": 0.075,
     "unit": "T"
    },
    "solution": "Since the coils have **the same length and number of turns**, the magnetic field is proportional to the current:\n\n$$ B = \\mu_0 \\cdot \\frac{n\\cdot I}{l} \\propto I $$\n\nWe form the ratio and cancel the common quantities:\n\n$$ \\frac{B_2}{B_1} = \\frac{I_2}{I_1} \\quad\\Leftrightarrow\\quad B_2 = B_1 \\cdot \\frac{I_2}{I_1} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB_1 = 30\\ \\mathrm{mT} = 0.030\\ \\mathrm{T} \\\\\nI_1 = 2.0\\ \\mathrm{A} \\\\\nI_2 = 5.0\\ \\mathrm{A}\n\\end{array} \\right]\n$$\n\n$$ B_2 = 0.030 \\cdot \\frac{5.0}{2.0} = 0.075\\ \\mathrm{T} = 75\\ \\mathrm{mT} $$\n\n**Answer:** The magnetic field is $75\\ \\mathrm{mT}$.\n\n**General conclusion:** The linear relationship between $B$ and $I$ for a coil makes this a simple **proportionality problem**: forming the ratio cancels $\\mu_0$, $n$ and $l$."
   },
   {
    "level": 3,
    "question": "A coil has $n$ turns over the length $l$ and gets the magnetic field $B = 50\\ \\mathrm{mT}$. The coil is **stretched out** so that its length is doubled (without adding turns), and at the same time the current is **halved**. How large is the new magnetic field?",
    "answer": {
     "value": 0.0125,
     "unit": "T"
    },
    "solution": "**The key insight is that three things change at once: the length $l$ is doubled, the number of turns $n$ is constant, and the current $I$ is halved.** Use proportionality:\n\n$$ B = \\mu_0 \\cdot \\frac{n\\cdot I}{l} \\quad\\Rightarrow\\quad B \\propto \\frac{I}{l} $$\n\n(since $n$ is the same and $\\mu_0$ is a constant.)\n\nForm the ratio:\n\n$$ \\frac{B_2}{B_1} = \\frac{I_2/l_2}{I_1/l_1} = \\frac{I_2}{I_1} \\cdot \\frac{l_1}{l_2} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\n\\dfrac{I_2}{I_1} = \\dfrac{1}{2} \\quad (\\text{halved current}) \\\\\n\\dfrac{l_1}{l_2} = \\dfrac{1}{2} \\quad (\\text{doubled length})\n\\end{array} \\right]\n$$\n\n$$ \\frac{B_2}{B_1} = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4} $$\n\n$$ B_2 = \\frac{B_1}{4} = \\frac{50}{4} = 12.5\\ \\mathrm{mT} $$\n\n**Answer:** The new magnetic field is $12.5\\ \\mathrm{mT}$.\n\n**General conclusion:** A classic ratio argument: form the ratio before substituting, so that common unknowns ($\\mu_0$, $n$) cancel. Two factors that each halve the result give a *quarter*, not a half."
   }
  ]
 },
 "fy2-3.4": {
  "kalla": "44d9a25fd5",
  "data": [
   {
    "level": 1,
    "question": "A proton with the velocity $3.0\\cdot 10^6\\ \\mathrm{m/s}$ moves perpendicular to a magnetic field with the flux density $0.50\\ \\mathrm{T}$. Calculate the magnetic force on the proton. Use $q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 180\" style=\"display:block;margin:14px auto;max-width:280px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><line x1=\"26\" y1=\"26\" x2=\"34\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"34\" x2=\"34\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"58\" x2=\"34\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"66\" x2=\"34\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"90\" x2=\"34\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"98\" x2=\"34\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"122\" x2=\"34\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"130\" x2=\"34\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"154\" x2=\"34\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"162\" x2=\"34\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"26\" x2=\"66\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"34\" x2=\"66\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"58\" x2=\"66\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"66\" x2=\"66\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"90\" x2=\"66\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"98\" x2=\"66\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"122\" x2=\"66\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"130\" x2=\"66\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"154\" x2=\"66\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"162\" x2=\"66\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"26\" x2=\"98\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"34\" x2=\"98\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"58\" x2=\"98\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"66\" x2=\"98\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"90\" x2=\"98\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"98\" x2=\"98\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"122\" x2=\"98\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"130\" x2=\"98\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"154\" x2=\"98\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"162\" x2=\"98\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"26\" x2=\"130\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"34\" x2=\"130\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"58\" x2=\"130\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"66\" x2=\"130\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"90\" x2=\"130\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"98\" x2=\"130\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"122\" x2=\"130\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"130\" x2=\"130\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"154\" x2=\"130\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"162\" x2=\"130\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"26\" x2=\"162\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"34\" x2=\"162\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"58\" x2=\"162\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"66\" x2=\"162\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"90\" x2=\"162\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"98\" x2=\"162\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"122\" x2=\"162\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"130\" x2=\"162\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"154\" x2=\"162\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"162\" x2=\"162\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"26\" x2=\"194\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"34\" x2=\"194\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"58\" x2=\"194\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"66\" x2=\"194\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"90\" x2=\"194\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"98\" x2=\"194\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"122\" x2=\"194\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"130\" x2=\"194\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"154\" x2=\"194\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"162\" x2=\"194\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"26\" x2=\"226\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"34\" x2=\"226\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"58\" x2=\"226\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"66\" x2=\"226\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"90\" x2=\"226\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"98\" x2=\"226\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"122\" x2=\"226\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"130\" x2=\"226\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"154\" x2=\"226\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"162\" x2=\"226\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"26\" x2=\"258\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"34\" x2=\"258\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"58\" x2=\"258\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"66\" x2=\"258\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"90\" x2=\"258\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"98\" x2=\"258\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"122\" x2=\"258\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"130\" x2=\"258\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"154\" x2=\"258\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"162\" x2=\"258\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><text x=\"12\" y=\"20\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">B</tspan> = 0.50 T</text><circle cx=\"140\" cy=\"90\" r=\"13\" fill=\"#c8324a\" stroke=\"#1a1d24\" stroke-width=\"1.2\"/><text x=\"140\" y=\"95\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"600\" fill=\"#fafaf5\">+</text><line x1=\"153.0\" y1=\"90.0\" x2=\"190.0\" y2=\"90.0\" stroke=\"#2563a8\" stroke-width=\"2.2\"/><polygon points=\"190.0,90.0 182.6,93.1 182.6,86.9\" fill=\"#2563a8\"/><text x=\"202.0\" y=\"94.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#2563a8\"><tspan font-style=\"italic\">v</tspan></text></svg>",
    "answer": {
     "value": 2.4e-13,
     "unit": "N"
    },
    "solution": "Magnetic force on a charged particle:\n\n$$ F = q \\cdot v \\cdot B $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nq = 1.602\\cdot 10^{-19}\\ \\mathrm{C} \\\\\nv = 3.0\\cdot 10^6\\ \\mathrm{m/s} \\\\\nB = 0.50\\ \\mathrm{T}\n\\end{array} \\right]\n$$\n\n$$ F = 1.602\\cdot 10^{-19} \\cdot 3.0\\cdot 10^6 \\cdot 0.50 = 2.40\\cdot 10^{-13}\\ \\mathrm{N} $$\n\n**Answer:** The force is about $2.4\\cdot 10^{-13}\\ \\mathrm{N}$."
   },
   {
    "level": 1,
    "question": "An electron moves perpendicular to a magnetic field with $B = 0.80\\ \\mathrm{T}$ and is acted on by the magnetic force $F = 1.1\\cdot 10^{-13}\\ \\mathrm{N}$. What is the velocity of the electron? Use $q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 858000,
     "unit": "m/s"
    },
    "solution": "We solve for the velocity in $F = q\\cdot v\\cdot B$:\n\n$$ v = \\frac{F}{q \\cdot B} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nF = 1.1\\cdot 10^{-13}\\ \\mathrm{N} \\\\\nq = 1.602\\cdot 10^{-19}\\ \\mathrm{C} \\\\\nB = 0.80\\ \\mathrm{T}\n\\end{array} \\right]\n$$\n\n$$ v = \\frac{1.1\\cdot 10^{-13}}{1.602\\cdot 10^{-19} \\cdot 0.80} = \\frac{1.1\\cdot 10^{-13}}{1.28\\cdot 10^{-19}} \\approx 8.6\\cdot 10^5\\ \\mathrm{m/s} $$\n\n**Answer:** The velocity is about $8.6\\cdot 10^5\\ \\mathrm{m/s}$ (= $0.86\\ \\mathrm{Mm/s}$)."
   },
   {
    "level": 1,
    "question": "A proton moves with the velocity $5.0\\cdot 10^6\\ \\mathrm{m/s}$ perpendicular to a magnetic field and is acted on by the force $4.0\\cdot 10^{-13}\\ \\mathrm{N}$. Determine the flux density of the magnetic field. Use $q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 0.5,
     "unit": "T"
    },
    "solution": "We solve for the flux density:\n\n$$ B = \\frac{F}{q\\cdot v} = \\frac{4.0\\cdot 10^{-13}}{1.602\\cdot 10^{-19} \\cdot 5.0\\cdot 10^6} = \\frac{4.0\\cdot 10^{-13}}{8.01\\cdot 10^{-13}} \\approx 0.50\\ \\mathrm{T} $$\n\n**Answer:** The magnetic field is about $0.50\\ \\mathrm{T}$."
   },
   {
    "level": 2,
    "question": "An electron moves **downwards** with the velocity $4.0\\cdot 10^6\\ \\mathrm{m/s}$ in a magnetic field $B = 0.25\\ \\mathrm{T}$ directed **into the paper**. Determine the magnitude and direction of the magnetic force on the electron. Use $q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 280 200\" style=\"display:block;margin:14px auto;max-width:280px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><line x1=\"26\" y1=\"26\" x2=\"34\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"34\" x2=\"34\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"58\" x2=\"34\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"66\" x2=\"34\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"90\" x2=\"34\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"98\" x2=\"34\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"122\" x2=\"34\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"130\" x2=\"34\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"154\" x2=\"34\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"162\" x2=\"34\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"26\" x2=\"66\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"34\" x2=\"66\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"58\" x2=\"66\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"66\" x2=\"66\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"90\" x2=\"66\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"98\" x2=\"66\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"122\" x2=\"66\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"130\" x2=\"66\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"154\" x2=\"66\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"162\" x2=\"66\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"26\" x2=\"98\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"34\" x2=\"98\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"58\" x2=\"98\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"66\" x2=\"98\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"90\" x2=\"98\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"98\" x2=\"98\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"122\" x2=\"98\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"130\" x2=\"98\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"154\" x2=\"98\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"162\" x2=\"98\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"26\" x2=\"130\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"34\" x2=\"130\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"58\" x2=\"130\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"66\" x2=\"130\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"90\" x2=\"130\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"98\" x2=\"130\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"122\" x2=\"130\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"130\" x2=\"130\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"154\" x2=\"130\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"162\" x2=\"130\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"26\" x2=\"162\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"34\" x2=\"162\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"58\" x2=\"162\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"66\" x2=\"162\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"90\" x2=\"162\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"98\" x2=\"162\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"122\" x2=\"162\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"130\" x2=\"162\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"154\" x2=\"162\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"162\" x2=\"162\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"26\" x2=\"194\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"34\" x2=\"194\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"58\" x2=\"194\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"66\" x2=\"194\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"90\" x2=\"194\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"98\" x2=\"194\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"122\" x2=\"194\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"130\" x2=\"194\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"154\" x2=\"194\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"162\" x2=\"194\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"26\" x2=\"226\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"34\" x2=\"226\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"58\" x2=\"226\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"66\" x2=\"226\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"90\" x2=\"226\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"98\" x2=\"226\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"122\" x2=\"226\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"130\" x2=\"226\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"154\" x2=\"226\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"162\" x2=\"226\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"26\" x2=\"258\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"34\" x2=\"258\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"58\" x2=\"258\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"66\" x2=\"258\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"90\" x2=\"258\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"98\" x2=\"258\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"122\" x2=\"258\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"130\" x2=\"258\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"154\" x2=\"258\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"162\" x2=\"258\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><text x=\"12\" y=\"20\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">B</tspan> = 0.25 T</text><circle cx=\"140\" cy=\"100\" r=\"13\" fill=\"#c8324a\" stroke=\"#1a1d24\" stroke-width=\"1.2\"/><text x=\"140\" y=\"105\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"600\" fill=\"#fafaf5\">−</text><line x1=\"140.0\" y1=\"113.0\" x2=\"140.0\" y2=\"150.0\" stroke=\"#2563a8\" stroke-width=\"2.2\"/><polygon points=\"140.0,150.0 136.9,142.6 143.1,142.6\" fill=\"#2563a8\"/><text x=\"140.0\" y=\"166.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#2563a8\"><tspan font-style=\"italic\">v</tspan></text></svg>",
    "answer": {
     "value": 1.6e-13,
     "unit": "N"
    },
    "solution": "**Step 1: the magnitude of the force.**\n\n$$ F = q\\cdot v\\cdot B = 1.602\\cdot 10^{-19} \\cdot 4.0\\cdot 10^6 \\cdot 0.25 = 1.60\\cdot 10^{-13}\\ \\mathrm{N} $$\n\n**Step 2: the direction of the force with the right-hand rule.** The electron is *negative* and moves *downwards*, so **the direction of the current is upwards** (positive convention).\n\n- Thumb (current) → upwards\n- Index finger (B) → into the plane\n- Middle finger (F) → to the **left**\n\n**Answer:** The force is $1.6\\cdot 10^{-13}\\ \\mathrm{N}$ directed **to the left**.\n\n**General conclusion:** For negative charges the direction of the current is opposite to the direction of motion. This is important not to forget when using the right-hand rule. The result is that negative charges are deflected in the *opposite* direction to positive charges in the same field."
   },
   {
    "level": 2,
    "question": "A proton is fired perpendicularly into a magnetic field with $B = 0.40\\ \\mathrm{T}$. The magnetic force bends the path of the proton into a circle with the radius $r = 3.5\\ \\mathrm{cm}$. Determine the velocity of the proton. Use $m_p = 1.673\\cdot 10^{-27}\\ \\mathrm{kg}$ and $q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 1340000,
     "unit": "m/s"
    },
    "solution": "**The key insight is that the magnetic force provides the centripetal force** in the circular motion:\n\n$$ F_m = F_c \\quad\\Leftrightarrow\\quad q\\cdot v\\cdot B = \\frac{m\\cdot v^2}{r} $$\n\nDivide both sides by $v$ and solve:\n\n$$ q\\cdot B = \\frac{m\\cdot v}{r} \\quad\\Leftrightarrow\\quad v = \\frac{q\\cdot B\\cdot r}{m} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nq = 1.602\\cdot 10^{-19}\\ \\mathrm{C} \\\\\nB = 0.40\\ \\mathrm{T} \\\\\nr = 0.035\\ \\mathrm{m} \\\\\nm = 1.673\\cdot 10^{-27}\\ \\mathrm{kg}\n\\end{array} \\right]\n$$\n\n$$ v = \\frac{1.602\\cdot 10^{-19} \\cdot 0.40 \\cdot 0.035}{1.673\\cdot 10^{-27}} = \\frac{2.243\\cdot 10^{-21}}{1.673\\cdot 10^{-27}} \\approx 1.34\\cdot 10^6\\ \\mathrm{m/s} $$\n\n**Answer:** The velocity of the proton is about $1.3\\cdot 10^6\\ \\mathrm{m/s}$.\n\n**General conclusion:** A charged particle in a magnetic field moves in a circular path (if it is initially perpendicular to the field) because the magnetic force is always perpendicular to the velocity. The radius of the path is $r = mv/(qB)$."
   },
   {
    "level": 3,
    "question": "An **electron** and a **proton** are accelerated through the same voltage $U$ and then enter the same magnetic field $B$ perpendicularly. Both get circular paths in the field. Determine the ratio between the radii of the paths $r_\\text{p}/r_\\text{e}$, if $m_\\text{p}/m_\\text{e} = 1\\,836$.",
    "answer": {
     "value": 42.85,
     "unit": ""
    },
    "solution": "**The key insight is that the velocities are *not* equal despite the same accelerating voltage**: since the particles have different masses, they get different speeds for the same energy supplied.\n\n**Step 1: the velocity after acceleration.** The principle of conservation of energy gives:\n\n$$ q\\cdot U = \\frac{m\\cdot v^2}{2} \\quad\\Leftrightarrow\\quad v = \\sqrt{\\frac{2qU}{m}} $$\n\n**Step 2: the radius of the path in the magnetic field.** From circular motion:\n\n$$ r = \\frac{m\\cdot v}{q\\cdot B} $$\n\n**Step 3: combine.** Substitute the expression for $v$:\n\n$$ r = \\frac{m}{qB} \\cdot \\sqrt{\\frac{2qU}{m}} = \\frac{1}{B} \\cdot \\sqrt{\\frac{2mU}{q}} $$\n\nThe radius of the path is **proportional to $\\sqrt{m}$** (since $q$, $U$ and $B$ are the same for both).\n\n**Step 4: form the ratio.**\n\n$$ \\frac{r_\\text{p}}{r_\\text{e}} = \\sqrt{\\frac{m_\\text{p}}{m_\\text{e}}} = \\sqrt{1\\,836} \\approx 42.9 $$\n\n**Answer:** The radius of the proton's path is about $43$ times that of the electron.\n\n**General conclusion:** A classic Physics 2 ratio argument: form the ratio before substituting, so that $q$, $U$ and $B$ cancel. The result $r \\propto \\sqrt{m}$ is **counter-intuitive**, since one might guess directly proportional or inversely proportional to the mass. This is the basis of the **mass spectrometer** (see 3.12)."
   }
  ]
 },
 "fy2-3.5": {
  "kalla": "1850eb8fd5",
  "data": [
   {
    "level": 1,
    "question": "A straight conductor with the length $30\\ \\mathrm{cm}$ lies perpendicular to a magnetic field with $B = 0.50\\ \\mathrm{T}$. The current through the conductor is $4.0\\ \\mathrm{A}$. Determine the magnetic force on the conductor.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 180\" style=\"display:block;margin:14px auto;max-width:300px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><line x1=\"26\" y1=\"26\" x2=\"34\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"34\" x2=\"34\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"58\" x2=\"34\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"66\" x2=\"34\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"90\" x2=\"34\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"98\" x2=\"34\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"122\" x2=\"34\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"130\" x2=\"34\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"154\" x2=\"34\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"162\" x2=\"34\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"26\" x2=\"66\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"34\" x2=\"66\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"58\" x2=\"66\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"66\" x2=\"66\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"90\" x2=\"66\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"98\" x2=\"66\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"122\" x2=\"66\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"130\" x2=\"66\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"154\" x2=\"66\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"162\" x2=\"66\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"26\" x2=\"98\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"34\" x2=\"98\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"58\" x2=\"98\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"66\" x2=\"98\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"90\" x2=\"98\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"98\" x2=\"98\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"122\" x2=\"98\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"130\" x2=\"98\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"154\" x2=\"98\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"162\" x2=\"98\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"26\" x2=\"130\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"34\" x2=\"130\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"58\" x2=\"130\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"66\" x2=\"130\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"90\" x2=\"130\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"98\" x2=\"130\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"122\" x2=\"130\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"130\" x2=\"130\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"154\" x2=\"130\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"162\" x2=\"130\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"26\" x2=\"162\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"34\" x2=\"162\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"58\" x2=\"162\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"66\" x2=\"162\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"90\" x2=\"162\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"98\" x2=\"162\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"122\" x2=\"162\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"130\" x2=\"162\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"154\" x2=\"162\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"162\" x2=\"162\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"26\" x2=\"194\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"34\" x2=\"194\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"58\" x2=\"194\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"66\" x2=\"194\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"90\" x2=\"194\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"98\" x2=\"194\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"122\" x2=\"194\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"130\" x2=\"194\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"154\" x2=\"194\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"162\" x2=\"194\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"26\" x2=\"226\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"34\" x2=\"226\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"58\" x2=\"226\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"66\" x2=\"226\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"90\" x2=\"226\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"98\" x2=\"226\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"122\" x2=\"226\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"130\" x2=\"226\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"154\" x2=\"226\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"162\" x2=\"226\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"26\" x2=\"258\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"34\" x2=\"258\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"58\" x2=\"258\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"66\" x2=\"258\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"90\" x2=\"258\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"98\" x2=\"258\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"122\" x2=\"258\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"130\" x2=\"258\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"154\" x2=\"258\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"162\" x2=\"258\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><text x=\"12\" y=\"20\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">B</tspan> = 0.50 T</text><line x1=\"40\" y1=\"90\" x2=\"260\" y2=\"90\" stroke=\"#1a1d24\" stroke-width=\"2.5\"/><polygon points=\"158,90 146,85 146,95\" fill=\"#1a1d24\"/><text x=\"168\" y=\"82\" font-size=\"12\" fill=\"#1a1d24\"><tspan font-style=\"italic\">I</tspan> = 4.0 A</text><text x=\"150\" y=\"112\" text-anchor=\"middle\" font-size=\"11\" fill=\"#5a6172\"><tspan font-style=\"italic\">l</tspan> = 30 cm</text></svg>",
    "answer": {
     "value": 0.6,
     "unit": "N"
    },
    "solution": "Magnetic force on a current-carrying conductor:\n\n$$ F = B\\cdot I\\cdot l $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 0.50\\ \\mathrm{T} \\\\\nI = 4.0\\ \\mathrm{A} \\\\\nl = 30\\ \\mathrm{cm} = 0.30\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ F = 0.50 \\cdot 4.0 \\cdot 0.30 = 0.60\\ \\mathrm{N} $$\n\n**Answer:** The force is $0.60\\ \\mathrm{N}$."
   },
   {
    "level": 1,
    "question": "A straight conductor with the length $0.50\\ \\mathrm{m}$ lies in a magnetic field $B = 0.80\\ \\mathrm{T}$ and is acted on by the force $1.2\\ \\mathrm{N}$. What is the current in the conductor?",
    "answer": {
     "value": 3,
     "unit": "A"
    },
    "solution": "We solve for the current in $F = BIl$:\n\n$$ I = \\frac{F}{B\\cdot l} = \\frac{1.2}{0.80 \\cdot 0.50} = 3.0\\ \\mathrm{A} $$\n\n**Answer:** The current is $3.0\\ \\mathrm{A}$."
   },
   {
    "level": 1,
    "question": "A $25\\ \\mathrm{cm}$ long straight conductor carries the current $2.5\\ \\mathrm{A}$ and is acted on by the magnetic force $0.50\\ \\mathrm{N}$. Determine the magnetic flux density.",
    "answer": {
     "value": 0.8,
     "unit": "T"
    },
    "solution": "We solve for the flux density:\n\n$$ B = \\frac{F}{I\\cdot l} = \\frac{0.50}{2.5 \\cdot 0.25} = 0.80\\ \\mathrm{T} $$\n\n**Answer:** The magnetic field is $0.80\\ \\mathrm{T}$."
   },
   {
    "level": 2,
    "question": "A straight conductor with the length $15\\ \\mathrm{cm}$ lies horizontally between the poles of a U-shaped magnet. The magnetic field in the gap is $0.60\\ \\mathrm{T}$, directed from the north pole (left) to the south pole (right). The current in the conductor is $2.5\\ \\mathrm{A}$ directed **out of the plane** (towards the reader). Determine the magnitude and direction of the magnetic force.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 200\" style=\"display:block;margin:14px auto;max-width:300px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><line x1=\"26\" y1=\"44\" x2=\"274\" y2=\"44\" stroke=\"#7a8190\" stroke-width=\"1.5\"/><polygon points=\"79.0,44.0 70.9,47.9 70.9,40.1\" fill=\"#7a8190\"/><line x1=\"26\" y1=\"72\" x2=\"274\" y2=\"72\" stroke=\"#7a8190\" stroke-width=\"1.5\"/><polygon points=\"79.0,72.0 70.9,75.9 70.9,68.1\" fill=\"#7a8190\"/><line x1=\"26\" y1=\"100\" x2=\"132\" y2=\"100\" stroke=\"#7a8190\" stroke-width=\"1.5\"/><line x1=\"168\" y1=\"100\" x2=\"274\" y2=\"100\" stroke=\"#7a8190\" stroke-width=\"1.5\"/><polygon points=\"79.0,100.0 70.9,103.9 70.9,96.1\" fill=\"#7a8190\"/><line x1=\"26\" y1=\"128\" x2=\"274\" y2=\"128\" stroke=\"#7a8190\" stroke-width=\"1.5\"/><polygon points=\"79.0,128.0 70.9,131.9 70.9,124.1\" fill=\"#7a8190\"/><line x1=\"26\" y1=\"156\" x2=\"274\" y2=\"156\" stroke=\"#7a8190\" stroke-width=\"1.5\"/><polygon points=\"79.0,156.0 70.9,159.9 70.9,152.1\" fill=\"#7a8190\"/><text x=\"12\" y=\"20\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">B</tspan> = 0.60 T</text><circle cx=\"150\" cy=\"100\" r=\"13\" fill=\"#fafaf5\" stroke=\"#1a1d24\" stroke-width=\"1.6\"/><circle cx=\"150\" cy=\"100\" r=\"3\" fill=\"#1a1d24\"/><text x=\"170\" y=\"91\" font-size=\"12\" fill=\"#1a1d24\"><tspan font-style=\"italic\">I</tspan> = 2.5 A</text></svg>",
    "answer": {
     "value": 0.225,
     "unit": "N"
    },
    "solution": "**Step 1: the magnitude of the force.**\n\n$$ F = B\\cdot I\\cdot l = 0.60 \\cdot 2.5 \\cdot 0.15 = 0.225\\ \\mathrm{N} $$\n\n**Step 2: the direction of the force with the right-hand rule.**\n\n- Thumb (current) → **out of the plane**\n- Index finger (B) → **to the right** (from N to S)\n- Middle finger (F) → **upwards**\n\n**Answer:** The force is $0.23\\ \\mathrm{N}$ directed **upwards**.\n\n**General conclusion:** It is this force on current-carrying conductors in magnetic fields that drives **electric motors**: in a motor the conductor is shaped into a loop that is forced to turn by the force."
   },
   {
    "level": 2,
    "question": "Two long parallel conductors are $2.0\\ \\mathrm{cm}$ apart. Both carry the current $5.0\\ \\mathrm{A}$ in the same direction. How large is the force per metre of conductor, and is it attractive or repulsive? Use $k = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A}$.",
    "answer": {
     "value": 0.00025,
     "unit": "N"
    },
    "solution": "The force between two parallel conductors:\n\n$$ F = k \\cdot \\frac{I_1\\cdot I_2\\cdot l}{d} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nk = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A} \\\\\nI_1 = I_2 = 5.0\\ \\mathrm{A} \\\\\nl = 1.0\\ \\mathrm{m} \\quad (\\text{per metre of conductor}) \\\\\nd = 2.0\\ \\mathrm{cm} = 0.020\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ F = 2.0\\cdot 10^{-7} \\cdot \\frac{5.0 \\cdot 5.0 \\cdot 1.0}{0.020} = 2.5\\cdot 10^{-4}\\ \\mathrm{N} = 0.25\\ \\mathrm{mN} $$\n\n**Direction:** Both currents flow in the same direction → the conductors **attract** each other. This can be shown with the thumb rule: the field from one conductor at the other (perpendicular to the current) gives a magnetic force directed *towards* the first conductor.\n\n**Answer:** The force is $0.25\\ \\mathrm{mN}$ per metre, **attractive**.\n\n**General conclusion:** Parallel currents **in the same direction** attract each other; parallel currents **in opposite directions** repel. This is the opposite of how electric charges behave, an unusual pattern worth remembering."
   },
   {
    "level": 3,
    "question": "A straight conductor with the length $20\\ \\mathrm{cm}$ and the mass $5.0\\ \\mathrm{g}$ lies horizontally across two parallel rails in a horizontal magnetic field $B$ that is perpendicular to the conductor. When the current $I = 2.5\\ \\mathrm{A}$ is switched on, *the conductor floats* (the magnetic force balances the gravitational force). Determine the magnetic flux density $B$. Use $g = 9.82\\ \\mathrm{N/kg}$.",
    "answer": {
     "value": 0.098,
     "unit": "T"
    },
    "solution": "**The key insight is that the conductor floats when the magnetic force $F = BIl$ is *exactly equal to* the gravitational force $F_G = mg$**, with the two directed in opposite directions.\n\n**Force balance:**\n\n$$ B\\cdot I\\cdot l = m\\cdot g \\quad\\Leftrightarrow\\quad B = \\frac{m\\cdot g}{I\\cdot l} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nm = 5.0\\ \\mathrm{g} = 0.0050\\ \\mathrm{kg} \\\\\ng \\approx 9.82\\ \\mathrm{N/kg} \\\\\nI = 2.5\\ \\mathrm{A} \\\\\nl = 20\\ \\mathrm{cm} = 0.20\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ B = \\frac{0.0050 \\cdot 9.82}{2.5 \\cdot 0.20} = \\frac{0.0491}{0.50} = 0.0982\\ \\mathrm{T} \\approx 98\\ \\mathrm{mT} $$\n\n**Answer:** The magnetic field is about $98\\ \\mathrm{mT}$.\n\n**General conclusion:** Force balance problems require you to identify *all* the forces acting on the object (here weight downwards + magnetic force upwards) and set them equal when the system is in equilibrium. Also note the direction of the field: the force $F = BIl$ is perpendicular to both the conductor and the field, so for the force to point upwards, the field must be horizontal and perpendicular to the conductor."
   }
  ]
 },
 "fy2-3.6": {
  "kalla": "92d7113020",
  "data": [
   {
    "level": 1,
    "question": "Where is the Earth's **north magnetic pole** located in relation to the geographic North Pole?",
    "choices": [
     "At exactly the same place as the geographic North Pole.",
     "Just under $500\\ \\mathrm{km}$ from the geographic North Pole, in the Arctic Ocean, heading towards Siberia.",
     "At the (geographic) South Pole.",
     "It does not exist: the Earth has no north magnetic pole."
    ],
    "correct": 1,
    "solution": "The Earth's north magnetic pole is not at the geographic North Pole. When it was located in 1831 it lay in **northern Canada**, but since then it has wandered across the **Arctic Ocean towards Siberia**. Today it lies just under $500\\ \\mathrm{km}$ from the geographic North Pole. The angular deviation between magnetic and geographic north is called **declination**, and navigators adjust their compasses for it.\n\nThe magnetic poles **move over time** and can even swap places completely (most recently $786\\,000$ years ago)."
   },
   {
    "level": 1,
    "question": "What is meant by **declination**?",
    "choices": [
     "Variation in the strength of the magnetic field depending on the season.",
     "The yearly change of the Earth's axis of rotation.",
     "The angle between the direction of the magnetic field and the horizontal plane.",
     "The angle between the Earth's geographic North Pole and the north magnetic pole (measured from a place on the Earth)."
    ],
    "correct": 3,
    "solution": "**Declination** is the horizontal angle between the direction towards the **geographic** North Pole and the direction towards the **north magnetic** pole, as seen from a place on the Earth. Navigators need to correct their compasses for this deviation to find the right direction.\n\n**Not to be confused with inclination** (see the next question), which is the angle between the magnetic field and the horizontal plane."
   },
   {
    "level": 1,
    "question": "What is meant by **inclination**?",
    "choices": [
     "The angle between the Earth's magnetic field and the horizontal plane at a given place.",
     "The angle between geographic and magnetic north.",
     "The tilt of the Earth relative to the plane of its orbit around the Sun.",
     "The maximum deflection a compass needle can make."
    ],
    "correct": 0,
    "solution": "**Inclination** is the angle between the Earth's magnetic field and the horizontal plane at a given place.\n\n- At the **north magnetic pole**: $i = 90^\\circ$ (the field points straight down).\n- **In Sweden**: $i \\approx 71^\\circ$ (the field points obliquely down towards the north).\n- **At the equator**: $i = 0^\\circ$ (the field is horizontal).\n- At the **south magnetic pole**: $i = -90^\\circ$ (the field points straight up).\n\n**General conclusion:** A compass in the northern hemisphere actually wants to point *obliquely downwards*. This is why compass needles are often balanced with a counterweight so that they stay horizontal anyway."
   },
   {
    "level": 2,
    "question": "In Sweden the total flux density of the Earth's magnetic field is $B_j = 50\\ \\mathrm{\\mu T}$ and the inclination is $i = 71^\\circ$. Calculate the **horizontal** and **vertical component** of the field.",
    "answer": {
     "value": 47.3,
     "unit": "μT"
    },
    "solution": "The angle of inclination is measured from the horizontal plane down to the direction of the field, so resolving into components gives:\n\n$$ B_\\text{jh} = B_j \\cdot \\cos i \\qquad B_\\text{jv} = B_j \\cdot \\sin i $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB_j = 50\\ \\mathrm{\\mu T} \\\\\ni = 71^\\circ\n\\end{array} \\right]\n$$\n\n$$ B_\\text{jh} = 50 \\cdot \\cos 71^\\circ = 50 \\cdot 0.326 \\approx 16.3\\ \\mathrm{\\mu T} $$\n\n$$ B_\\text{jv} = 50 \\cdot \\sin 71^\\circ = 50 \\cdot 0.946 \\approx 47.3\\ \\mathrm{\\mu T} $$\n\n**Answer:** The horizontal component is about $16\\ \\mathrm{\\mu T}$ and the vertical component about $47\\ \\mathrm{\\mu T}$. (The vertical component is entered in the answer field.)\n\n**General conclusion:** In Sweden the vertical component is about three times as large as the horizontal component. Only the horizontal component turns a compass needle, so the closer you get to a magnetic pole, the weaker the directing force on the compass becomes."
   },
   {
    "level": 2,
    "question": "A compass needle is placed $4.0\\ \\mathrm{cm}$ straight below a horizontal conductor oriented north–south. When the current $3.0\\ \\mathrm{A}$ is switched on, the compass needle turns $30^\\circ$ towards the west. Determine the horizontal component $B_\\text{jh}$ of the Earth's magnetic field.\n\nUse $k = 2.0\\cdot 10^{-7}\\ \\mathrm{T\\cdot m/A}$.",
    "answer": {
     "value": 0.000026,
     "unit": "T"
    },
    "solution": "**Step 1: the magnetic field from the conductor at the compass.** The current in the conductor gives a magnetic field *perpendicular to $B_\\text{jh}$* (towards the west or east).\n\n$$ B = k\\cdot\\frac{I}{d} = 2.0\\cdot 10^{-7} \\cdot \\frac{3.0}{0.040} = 1.5\\cdot 10^{-5}\\ \\mathrm{T} $$\n\n**Step 2: the turning of the compass shows the resultant.** The compass lines up along the resultant of $B$ and $B_\\text{jh}$. The angle $30^\\circ$ is between the resultant and north ($B_\\text{jh}$):\n\n$$ \\tan\\alpha = \\frac{B}{B_\\text{jh}} \\quad\\Leftrightarrow\\quad B_\\text{jh} = \\frac{B}{\\tan\\alpha} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 1.5\\cdot 10^{-5}\\ \\mathrm{T} \\\\\n\\alpha = 30^\\circ\n\\end{array} \\right]\n$$\n\n$$ B_\\text{jh} = \\frac{1.5\\cdot 10^{-5}}{\\tan 30^\\circ} = \\frac{1.5\\cdot 10^{-5}}{0.577} \\approx 2.60\\cdot 10^{-5}\\ \\mathrm{T} = 26\\ \\mathrm{\\mu T} $$\n\n**Answer:** The horizontal component is about $26\\ \\mathrm{\\mu T}$.\n\n**General conclusion:** This is how the Earth's magnetic field is **measured** in practice: use a known disturbance (a conductor with a known current) that gives a known turning of the compass, and work backwards."
   },
   {
    "level": 3,
    "question": "A compass needle in Sweden (where $i = 71^\\circ$) is balanced horizontally. When the compass is taken to the **equator** (where $i = 0^\\circ$), the counteraction from the vertical component of the field changes. Assume that the total flux density of the Earth's magnetic field is about the same at both places ($B_j = 50\\ \\mathrm{\\mu T}$). By what factor does the horizontal component that turns the compass change from Sweden to the equator?",
    "answer": {
     "value": 3.07,
     "unit": "",
     "tol": 0.03
    },
    "solution": "**The key insight is that it is the *horizontal component* $B_\\text{jh} = B_j\\cos i$ that turns the compass needle**: the vertical component acts vertically and does not affect the rotation of the compass about the vertical axis.\n\n**Step 1: the horizontal component in Sweden.**\n\n$$ B_\\text{jh,\\text{S}} = B_j \\cos 71^\\circ = 50 \\cdot 0.326 \\approx 16.3\\ \\mathrm{\\mu T} $$\n\n**Step 2: the horizontal component at the equator.**\n\n$$ B_\\text{jh,\\text{eq}} = B_j \\cos 0^\\circ = 50 \\cdot 1 = 50\\ \\mathrm{\\mu T} $$\n\n**Step 3: the factor.**\n\n$$ \\frac{B_\\text{jh,\\text{eq}}}{B_\\text{jh,\\text{S}}} = \\frac{\\cos 0^\\circ}{\\cos 71^\\circ} = \\frac{1}{0.326} \\approx 3.07 $$\n\n**Answer:** The horizontal component that turns the compass is about **$3$ times as large** at the equator as in Sweden.\n\n**General conclusion:** This is why compasses work **better at the equator** than near the poles: at the poles the field points almost straight down and the horizontal component disappears completely, so the compass \"does not know\" where north is. A classic ratio argument where $B_j$ cancels and the ratio of the $\\cos i$ values does all the work."
   }
  ]
 },
 "fy2-3.7": {
  "kalla": "f5fb343dc6",
  "data": [
   {
    "level": 1,
    "question": "A straight conductor with the length $25\\ \\mathrm{cm}$ moves with the velocity $2.0\\ \\mathrm{m/s}$ perpendicular to a magnetic field $B = 0.50\\ \\mathrm{T}$. Calculate the induced voltage.",
    "answer": {
     "value": 0.25,
     "unit": "V"
    },
    "solution": "Induced voltage in a straight conductor moving in a magnetic field:\n\n$$ e = l\\cdot v\\cdot B $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nl = 25\\ \\mathrm{cm} = 0.25\\ \\mathrm{m} \\\\\nv = 2.0\\ \\mathrm{m/s} \\\\\nB = 0.50\\ \\mathrm{T}\n\\end{array} \\right]\n$$\n\n$$ e = 0.25 \\cdot 2.0 \\cdot 0.50 = 0.25\\ \\mathrm{V} $$\n\n**Answer:** The induced voltage is $0.25\\ \\mathrm{V}$."
   },
   {
    "level": 1,
    "question": "A $0.40\\ \\mathrm{m}$ long conductor in a magnetic field $B = 0.30\\ \\mathrm{T}$ gets an induced voltage of $0.48\\ \\mathrm{V}$. How fast is the conductor moving?",
    "answer": {
     "value": 4,
     "unit": "m/s"
    },
    "solution": "We solve for the velocity:\n\n$$ e = l\\cdot v\\cdot B \\quad\\Leftrightarrow\\quad v = \\frac{e}{l\\cdot B} = \\frac{0.48}{0.40 \\cdot 0.30} = 4.0\\ \\mathrm{m/s} $$\n\n**Answer:** The velocity is $4.0\\ \\mathrm{m/s}$."
   },
   {
    "level": 1,
    "question": "A $20\\ \\mathrm{cm}$ long conductor moves with the velocity $5.0\\ \\mathrm{m/s}$ and induces the voltage $0.15\\ \\mathrm{V}$. Determine the flux density of the magnetic field (everything is mutually perpendicular).",
    "answer": {
     "value": 0.15,
     "unit": "T"
    },
    "solution": "We solve for the flux density:\n\n$$ B = \\frac{e}{l\\cdot v} = \\frac{0.15}{0.20 \\cdot 5.0} = 0.15\\ \\mathrm{T} $$\n\n**Answer:** The magnetic field is $0.15\\ \\mathrm{T}$."
   },
   {
    "level": 2,
    "question": "A straight conductor with the length $30\\ \\mathrm{cm}$ moves with the velocity $4.0\\ \\mathrm{m/s}$ in a magnetic field $B = 0.20\\ \\mathrm{T}$. The magnetic field is directed **into the paper**, the conductor lies horizontally and moves **upwards**. Determine the induced voltage and decide which end of the conductor becomes **positive**.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" style=\"display:block;margin:14px auto;max-width:320px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><line x1=\"26\" y1=\"26\" x2=\"34\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"34\" x2=\"34\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"58\" x2=\"34\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"66\" x2=\"34\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"90\" x2=\"34\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"98\" x2=\"34\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"122\" x2=\"34\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"130\" x2=\"34\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"154\" x2=\"34\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"26\" y1=\"162\" x2=\"34\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"26\" x2=\"66\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"34\" x2=\"66\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"58\" x2=\"66\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"66\" x2=\"66\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"90\" x2=\"66\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"98\" x2=\"66\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"122\" x2=\"66\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"130\" x2=\"66\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"154\" x2=\"66\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"58\" y1=\"162\" x2=\"66\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"26\" x2=\"98\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"34\" x2=\"98\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"58\" x2=\"98\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"66\" x2=\"98\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"90\" x2=\"98\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"98\" x2=\"98\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"122\" x2=\"98\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"130\" x2=\"98\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"154\" x2=\"98\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"90\" y1=\"162\" x2=\"98\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"26\" x2=\"130\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"34\" x2=\"130\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"58\" x2=\"130\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"66\" x2=\"130\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"90\" x2=\"130\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"98\" x2=\"130\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"122\" x2=\"130\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"130\" x2=\"130\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"154\" x2=\"130\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"122\" y1=\"162\" x2=\"130\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"26\" x2=\"162\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"34\" x2=\"162\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"58\" x2=\"162\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"66\" x2=\"162\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"90\" x2=\"162\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"98\" x2=\"162\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"122\" x2=\"162\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"130\" x2=\"162\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"154\" x2=\"162\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"154\" y1=\"162\" x2=\"162\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"26\" x2=\"194\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"34\" x2=\"194\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"58\" x2=\"194\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"66\" x2=\"194\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"90\" x2=\"194\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"98\" x2=\"194\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"122\" x2=\"194\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"130\" x2=\"194\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"154\" x2=\"194\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"186\" y1=\"162\" x2=\"194\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"26\" x2=\"226\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"34\" x2=\"226\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"58\" x2=\"226\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"66\" x2=\"226\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"90\" x2=\"226\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"98\" x2=\"226\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"122\" x2=\"226\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"130\" x2=\"226\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"154\" x2=\"226\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"218\" y1=\"162\" x2=\"226\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"26\" x2=\"258\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"34\" x2=\"258\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"58\" x2=\"258\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"66\" x2=\"258\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"90\" x2=\"258\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"98\" x2=\"258\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"122\" x2=\"258\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"130\" x2=\"258\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"154\" x2=\"258\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"250\" y1=\"162\" x2=\"258\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"26\" x2=\"290\" y2=\"34\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"34\" x2=\"290\" y2=\"26\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"58\" x2=\"290\" y2=\"66\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"66\" x2=\"290\" y2=\"58\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"90\" x2=\"290\" y2=\"98\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"98\" x2=\"290\" y2=\"90\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"122\" x2=\"290\" y2=\"130\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"130\" x2=\"290\" y2=\"122\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"154\" x2=\"290\" y2=\"162\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><line x1=\"282\" y1=\"162\" x2=\"290\" y2=\"154\" stroke=\"#7a8190\" stroke-width=\"1.2\"/><text x=\"12\" y=\"20\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">B</tspan> = 0.20 T</text><line x1=\"40\" y1=\"100\" x2=\"280\" y2=\"100\" stroke=\"#1a1d24\" stroke-width=\"2.5\"/><polygon points=\"168,100 156,95 156,105\" fill=\"#1a1d24\"/><text x=\"160\" y=\"122\" text-anchor=\"middle\" font-size=\"11\" fill=\"#5a6172\"><tspan font-style=\"italic\">l</tspan> = 30 cm</text><line x1=\"160.0\" y1=\"100.0\" x2=\"160.0\" y2=\"50.0\" stroke=\"#2563a8\" stroke-width=\"2.2\"/><polygon points=\"160.0,50.0 163.1,57.4 156.9,57.4\" fill=\"#2563a8\"/><text x=\"160.0\" y=\"42.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#2563a8\"><tspan font-style=\"italic\">v</tspan></text></svg>",
    "answer": {
     "value": 0.24,
     "unit": "V"
    },
    "solution": "**Step 1: calculate the induced voltage.**\n\n$$ e = l\\cdot v\\cdot B = 0.30 \\cdot 4.0 \\cdot 0.20 = 0.24\\ \\mathrm{V} $$\n\n**Step 2: determine the polarity with the right-hand rule.** In the conductor there are conduction electrons that move *upwards* (with the conductor). In effect this corresponds to a *positive* current *upwards*. We apply the right-hand rule to see the direction of the force on these imagined positive charges:\n\n- Thumb (current) → upwards\n- Index finger ($B$) → into the plane\n- Middle finger ($F$) → **to the left**\n\nPositive charges are pushed to the left → the **left end** becomes positive.\n\n**Answer:** The induced voltage is $0.24\\ \\mathrm{V}$ and the **left end** is positive.\n\n**General conclusion:** This is the basis of all electric generator technology: a mechanical motion in a magnetic field produces a voltage. The direction of the voltage is determined by the thumb rule and **Lenz's law** (see 3.8)."
   },
   {
    "level": 2,
    "question": "A metal rod slides on two parallel rails in a magnetic field. The rod has the length $15\\ \\mathrm{cm}$ and the magnetic field $B = 0.80\\ \\mathrm{T}$ is perpendicular to the plane of the rails. At what velocity must the rod be pulled for the induced voltage to be $1.5\\ \\mathrm{V}$?",
    "answer": {
     "value": 12.5,
     "unit": "m/s"
    },
    "solution": "We use the same formula:\n\n$$ e = l\\cdot v\\cdot B \\quad\\Leftrightarrow\\quad v = \\frac{e}{l\\cdot B} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\ne = 1.5\\ \\mathrm{V} \\\\\nl = 0.15\\ \\mathrm{m} \\\\\nB = 0.80\\ \\mathrm{T}\n\\end{array} \\right]\n$$\n\n$$ v = \\frac{1.5}{0.15 \\cdot 0.80} = \\frac{1.5}{0.12} = 12.5\\ \\mathrm{m/s} $$\n\n**Answer:** The velocity must be $12.5\\ \\mathrm{m/s}$."
   },
   {
    "level": 3,
    "question": "A straight conductor with the length $0.40\\ \\mathrm{m}$ is released from rest and falls freely in a horizontal magnetic field $B = 0.50\\ \\mathrm{T}$ (perpendicular to the falling motion and perpendicular to the long axis of the conductor). Use $g = 9.82\\ \\mathrm{m/s^2}$. Determine the induced voltage $1.5\\ \\mathrm{s}$ after the conductor is released.",
    "answer": {
     "value": 2.95,
     "unit": "V"
    },
    "solution": "**The key insight is that the velocity of the conductor *increases with time* during free fall**, so the induced voltage is not constant but depends on *t* through the velocity.\n\n**Step 1: the velocity at $t = 1.5\\ \\mathrm{s}$.** Free fall from rest:\n\n$$ v = g\\cdot t = 9.82 \\cdot 1.5 = 14.73\\ \\mathrm{m/s} $$\n\n**Step 2: the induced voltage at that velocity.**\n\n$$ e = l\\cdot v\\cdot B = 0.40 \\cdot 14.73 \\cdot 0.50 = 2.946\\ \\mathrm{V} \\approx 2.9\\ \\mathrm{V} $$\n\n**Answer:** The induced voltage is about $2.9\\ \\mathrm{V}$.\n\n**General conclusion:** When the velocity varies with time we get a **time-dependent** induced voltage. This is what happens in a generator, where the rotation gives a varying voltage curve. It is also closely linked to **eddy current braking** (see 3.13): a falling metal plate in a field generates currents that oppose the fall, so the velocity increases more slowly than in free fall."
   }
  ]
 },
 "fy2-3.8": {
  "kalla": "fa94ff2ce7",
  "data": [
   {
    "level": 1,
    "question": "An induced voltage of $1.2\\ \\mathrm{V}$ drives a current through a circuit with the resistance $3.0\\ \\mathrm{\\Omega}$. How large is the induced current?",
    "answer": {
     "value": 0.4,
     "unit": "A"
    },
    "solution": "Ohm's law:\n\n$$ I = \\frac{e}{R} = \\frac{1.2}{3.0} = 0.40\\ \\mathrm{A} $$\n\n**Answer:** The current is $0.40\\ \\mathrm{A}$."
   },
   {
    "level": 1,
    "question": "A $20\\ \\mathrm{cm}$ long rod slides with the velocity $3.0\\ \\mathrm{m/s}$ on two parallel rails in a magnetic field $B = 0.40\\ \\mathrm{T}$. The rails are connected by a resistor $R = 0.60\\ \\mathrm{\\Omega}$. Determine the induced current in the circuit.",
    "answer": {
     "value": 0.4,
     "unit": "A"
    },
    "solution": "**Step 1: induced voltage.**\n\n$$ e = l\\cdot v\\cdot B = 0.20 \\cdot 3.0 \\cdot 0.40 = 0.24\\ \\mathrm{V} $$\n\n**Step 2: induced current.**\n\n$$ I = \\frac{e}{R} = \\frac{0.24}{0.60} = 0.40\\ \\mathrm{A} $$\n\n**Answer:** The current is $0.40\\ \\mathrm{A}$."
   },
   {
    "level": 1,
    "question": "What does **Lenz's law** say?",
    "choices": [
     "An induced current has such a direction that it **opposes the cause** of its own creation.",
     "An induced current has such a direction that it **reinforces the cause** of its own creation.",
     "An induced current is always directed in the positive current direction.",
     "An induced current is always equal to the voltage divided by the time."
    ],
    "correct": 0,
    "solution": "**Lenz's law:** Induced currents have such a direction that they **oppose the cause** of their own creation. This is a consequence of the principle of conservation of energy: if the current instead reinforced its cause, you would get \"free energy\", which is physically impossible.\n\n**Examples:**\n- If a magnet is moved *towards* a loop, the loop induces a current that opposes the approach of the magnet (by forming an opposing pole).\n- If the magnet is moved *away*, the loop induces a current that opposes the movement away (by attracting the magnet).\n\nThe minus sign in the law of induction ($e = -\\Delta\\Phi/\\Delta t$) is the mathematical expression of Lenz's law."
   },
   {
    "level": 2,
    "question": "A metal rod with the length $15\\ \\mathrm{cm}$ is pulled with the velocity $2.5\\ \\mathrm{m/s}$ on two parallel rails in a magnetic field $B = 0.80\\ \\mathrm{T}$ (perpendicular to the motion of the rod and perpendicular to the field). The resistance of the whole circuit is $0.75\\ \\mathrm{\\Omega}$. Determine the **magnetic force on the rod**.",
    "answer": {
     "value": 0.048,
     "unit": "N"
    },
    "solution": "**Step 1: induced voltage.**\n\n$$ e = l\\cdot v\\cdot B = 0.15 \\cdot 2.5 \\cdot 0.80 = 0.30\\ \\mathrm{V} $$\n\n**Step 2: induced current.**\n\n$$ I = \\frac{e}{R} = \\frac{0.30}{0.75} = 0.40\\ \\mathrm{A} $$\n\n**Step 3: the magnetic force on the current-carrying rod.**\n\n$$ F = B\\cdot I\\cdot l = 0.80 \\cdot 0.40 \\cdot 0.15 = 0.048\\ \\mathrm{N} = 48\\ \\mathrm{mN} $$\n\n**Answer:** The force is $48\\ \\mathrm{mN}$.\n\n**General conclusion:** According to Lenz's law this force is directed **opposite to the direction of motion**: it opposes the pulling of the rod. This is why you have to make an effort to pull a metal rod in a magnetic field: part of the muscle energy is converted into electrical energy (and further into heat in the resistor)."
   },
   {
    "level": 2,
    "question": "A magnet with its north pole first is moved **towards** a circular conducting loop. What is the direction of the induced current in the loop, as seen from the side of the magnet?",
    "choices": [
     "No current is induced: magnets do not give currents in conductors.",
     "Clockwise, so that the loop gets a north pole facing the magnet (to repel).",
     "Clockwise, so that the loop gets a south pole facing the magnet (to attract).",
     "Anticlockwise, so that the loop gets a north pole facing the magnet (to repel)."
    ],
    "correct": 3,
    "solution": "According to **Lenz's law** the induced current must *oppose* the cause of its creation. Since the magnet approaches with its north pole, the loop must react so that it **repels** the magnet, that is, form a north pole facing the magnet.\n\nWith the thumb rule for a coil (fingers = direction of the current, thumb = direction of the magnetic field): to give the loop a north pole *facing the magnet* (outwards towards the observer from the loop's side), the thumb must point outwards, which means that the current flows **anticlockwise** as seen from the side of the magnet.\n\n**General conclusion:** This repels the magnet and means that you have to make an effort to keep it moving: the principle of conservation of energy in practice. If Lenz's law did not hold, the loop would attract the magnet, which would accelerate it and give more current, which accelerates it more ... = free energy, which does not exist."
   },
   {
    "level": 3,
    "question": "A metal rod with the length $20\\ \\mathrm{cm}$ and the mass $50\\ \\mathrm{g}$ is released from rest and falls without friction along two parallel vertical rails in a horizontal magnetic field $B = 1.2\\ \\mathrm{T}$. The rails are connected by a resistor $R = 0.40\\ \\mathrm{\\Omega}$. What **terminal velocity** does the rod reach (when the acceleration becomes zero)? Use $g = 9.82\\ \\mathrm{m/s^2}$.",
    "answer": {
     "value": 3.41,
     "unit": "m/s"
    },
    "solution": "**The key insight is that terminal velocity is reached when the induced magnetic force (upwards) exactly balances the gravitational force (downwards)**: then the net force is zero and the acceleration stops.\n\n**Step 1: force balance.** At terminal velocity $v_t$:\n\n$$ B\\cdot I\\cdot l = m\\cdot g $$\n\n**Step 2: an expression for $I$.** The induced voltage is $e = lvB$, so the current is\n\n$$ I = \\frac{lvB}{R} $$\n\nSubstitute into the force balance:\n\n$$ B \\cdot \\frac{l\\cdot v_t \\cdot B}{R} \\cdot l = m\\cdot g \\quad\\Leftrightarrow\\quad \\frac{B^2\\cdot l^2 \\cdot v_t}{R} = m\\cdot g $$\n\n**Step 3: solve for $v_t$.**\n\n$$ v_t = \\frac{m\\cdot g\\cdot R}{B^2\\cdot l^2} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nm = 50\\ \\mathrm{g} = 0.050\\ \\mathrm{kg} \\\\\ng \\approx 9.82\\ \\mathrm{m/s^2} \\\\\nR = 0.40\\ \\mathrm{\\Omega} \\\\\nB = 1.2\\ \\mathrm{T} \\\\\nl = 0.20\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ v_t = \\frac{0.050 \\cdot 9.82 \\cdot 0.40}{1.2^2 \\cdot 0.20^2} = \\frac{0.1964}{0.0576} \\approx 3.41\\ \\mathrm{m/s} $$\n\n**Answer:** The terminal velocity is about $3.4\\ \\mathrm{m/s}$.\n\n**General conclusion:** This is a classic **force balance problem** in which three principles are combined: induction ($e = lvB$), Ohm's law ($I = e/R$) and the force on a current-carrying conductor ($F = BIl$). The insight is that at terminal velocity the *acceleration is zero*, not the velocity. This principle is used in practice in **eddy current brakes** on amusement park rides."
   }
  ]
 },
 "fy2-3.9": {
  "kalla": "23288dd531",
  "data": [
   {
    "level": 1,
    "question": "A loop with the area $0.20\\ \\mathrm{m^2}$ lies perpendicular to a magnetic field $B = 0.30\\ \\mathrm{T}$. Calculate the magnetic flux through the loop.",
    "answer": {
     "value": 0.06,
     "unit": "Wb"
    },
    "solution": "Magnetic flux:\n\n$$ \\Phi = B\\cdot A_\\perp = 0.30 \\cdot 0.20 = 0.060\\ \\mathrm{Wb} $$\n\n**Answer:** The magnetic flux is $60\\ \\mathrm{mWb}$."
   },
   {
    "level": 1,
    "question": "The magnetic flux through a loop changes linearly from $0$ to $5.0\\ \\mathrm{mWb}$ in $0.25\\ \\mathrm{s}$. Calculate the magnitude of the induced voltage.",
    "answer": {
     "value": 0.02,
     "unit": "V"
    },
    "solution": "The law of induction:\n\n$$ |e| = \\left|\\frac{\\Delta\\Phi}{\\Delta t}\\right| = \\frac{5.0\\cdot 10^{-3}}{0.25} = 0.020\\ \\mathrm{V} = 20\\ \\mathrm{mV} $$\n\n**Answer:** The induced voltage is $20\\ \\mathrm{mV}$."
   },
   {
    "level": 1,
    "question": "A coil with $200$ turns is threaded by a magnetic flux that changes uniformly at $0.010\\ \\mathrm{Wb/s}$. Determine the induced voltage.",
    "answer": {
     "value": 2,
     "unit": "V"
    },
    "solution": "For a coil with $N$ turns:\n\n$$ |e| = N\\cdot\\left|\\frac{\\Delta\\Phi}{\\Delta t}\\right| = 200 \\cdot 0.010 = 2.0\\ \\mathrm{V} $$\n\n**Answer:** The induced voltage is $2.0\\ \\mathrm{V}$."
   },
   {
    "level": 2,
    "question": "The magnetic flux through a loop varies according to the diagram. Determine the induced voltage at (a) $t = 1.0\\ \\mathrm{s}$ and (b) $t = 4.0\\ \\mathrm{s}$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"117.1\" y1=\"30\" x2=\"117.1\" y2=\"290\"/><line x1=\"174.3\" y1=\"30\" x2=\"174.3\" y2=\"290\"/><line x1=\"231.4\" y1=\"30\" x2=\"231.4\" y2=\"290\"/><line x1=\"288.6\" y1=\"30\" x2=\"288.6\" y2=\"290\"/><line x1=\"345.7\" y1=\"30\" x2=\"345.7\" y2=\"290\"/><line x1=\"402.9\" y1=\"30\" x2=\"402.9\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"290.0\" x2=\"460\" y2=\"290.0\"/><line x1=\"60\" y1=\"246.7\" x2=\"460\" y2=\"246.7\"/><line x1=\"60\" y1=\"203.3\" x2=\"460\" y2=\"203.3\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"116.7\" x2=\"460\" y2=\"116.7\"/><line x1=\"60\" y1=\"73.3\" x2=\"460\" y2=\"73.3\"/></g><line x1=\"60\" y1=\"290.0\" x2=\"468\" y2=\"290.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,286.0 476,290.0 468,294.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"284.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">Φ</tspan> (mWb)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"117.1\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">1</text><text x=\"174.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"231.4\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">3</text><text x=\"288.6\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"345.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">5</text><text x=\"402.9\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">7</text><text x=\"53\" y=\"295.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"251.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">2</text><text x=\"53\" y=\"208.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">4</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">6</text><text x=\"53\" y=\"121.7\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">8</text><text x=\"53\" y=\"78.3\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">10</text></g><path d=\"M 60.0 290.0 L 174.3 73.3 L 345.7 73.3 L 460.0 290.0\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": -5,
     "unit": "mV"
    },
    "solution": "The induced voltage is given by the **slope** of the graph: $e = -\\Phi'(t)$.\n\n**(a) At $t = 1.0\\ \\mathrm{s}$:** The flux increases linearly from $0$ to $10\\ \\mathrm{mWb}$ between $t = 0$ and $t = 2\\ \\mathrm{s}$. Slope:\n\n$$ \\frac{\\Delta\\Phi}{\\Delta t} = \\frac{10\\ \\mathrm{mWb}}{2\\ \\mathrm{s}} = 5.0\\ \\mathrm{mWb/s} $$\n\n$$ e = -\\frac{\\Delta\\Phi}{\\Delta t} = -5.0\\ \\mathrm{mV} $$\n\n**(b) At $t = 4.0\\ \\mathrm{s}$:** The flux is constant ($\\Delta\\Phi = 0$) → **no voltage is induced**.\n\n$$ e = 0\\ \\mathrm{V} $$\n\n**Answer:** (a) $-5.0\\ \\mathrm{mV}$, (b) $0\\ \\mathrm{V}$.\n\n**General conclusion:** Only *changes* in the flux induce a voltage: a constant flux induces *nothing*, however large it is. This is a fundamental and often misunderstood principle of induction."
   },
   {
    "level": 2,
    "question": "A circular coil with $150$ turns and the radius $5.0\\ \\mathrm{cm}$ is in a magnetic field that changes from $0.40\\ \\mathrm{T}$ to $0$ in $0.30\\ \\mathrm{s}$ (linearly). The coil is perpendicular to the field. Determine the magnitude of the induced voltage.",
    "answer": {
     "value": 1.57,
     "unit": "V"
    },
    "solution": "**Step 1: the area of the coil.**\n\n$$ A = \\pi r^2 = \\pi \\cdot 0.050^2 = 7.854\\cdot 10^{-3}\\ \\mathrm{m^2} $$\n\n**Step 2: the change in flux per turn.**\n\n$$ |\\Delta\\Phi| = |B_2 - B_1|\\cdot A = 0.40 \\cdot 7.854\\cdot 10^{-3} = 3.142\\cdot 10^{-3}\\ \\mathrm{Wb} $$\n\n**Step 3: the induced voltage in the coil.**\n\n$$ |e| = N\\cdot\\frac{|\\Delta\\Phi|}{\\Delta t} = 150 \\cdot \\frac{3.142\\cdot 10^{-3}}{0.30} \\approx 1.57\\ \\mathrm{V} $$\n\n**Answer:** The induced voltage is about $1.6\\ \\mathrm{V}$.\n\n**General conclusion:** In a coil the induced voltage is multiplied by the number of turns $N$. That is the whole point of coils in inductive applications (for example transformers and generators)."
   },
   {
    "level": 3,
    "question": "A square loop with the side $0.10\\ \\mathrm{m}$ is pulled at the constant velocity $v = 2.0\\ \\mathrm{m/s}$ out of a magnetic field $B = 0.50\\ \\mathrm{T}$ (into the paper). The loop has the resistance $R = 0.20\\ \\mathrm{\\Omega}$. Calculate the **power** converted in the loop while it is still partly in the field.",
    "answer": {
     "value": 0.05,
     "unit": "W"
    },
    "solution": "**The key insight is that three principles are combined: induction ($e = lvB$), Ohm's law ($I = e/R$), and power ($P = U\\cdot I$).**\n\n**Step 1: induced voltage.** Only the side of the loop that is still in the field, parallel to the field boundary, contributes; the other side (outside the field) gives no emf. This side has the length $l = 0.10\\ \\mathrm{m}$:\n\n$$ e = l\\cdot v\\cdot B = 0.10 \\cdot 2.0 \\cdot 0.50 = 0.10\\ \\mathrm{V} $$\n\n**Step 2: induced current.**\n\n$$ I = \\frac{e}{R} = \\frac{0.10}{0.20} = 0.50\\ \\mathrm{A} $$\n\n**Step 3: power.**\n\n$$ P = e\\cdot I = 0.10 \\cdot 0.50 = 0.050\\ \\mathrm{W} = 50\\ \\mathrm{mW} $$\n\n(Alternative formula: $P = e^2/R = 0.10^2/0.20 = 0.050$ W.)\n\n**Answer:** The power is $50\\ \\mathrm{mW}$.\n\n**General conclusion:** This power corresponds exactly to the **mechanical power** needed to pull the loop out of the field: the principle of conservation of energy in practice, mechanical energy → electrical → heat in the resistor. The insight \"only one side gives an emf\" is subtle; a loop *completely inside* the field gives zero emf because the contributions of the opposite sides cancel each other out."
   }
  ]
 },
 "fy2-3.10": {
  "kalla": "cb0c740116",
  "data": [
   {
    "level": 1,
    "question": "The Swedish mains supply has the **effective** voltage $U = 230\\ \\mathrm{V}$. What is the **peak voltage** $\\hat{u}$?",
    "answer": {
     "value": 325,
     "unit": "V"
    },
    "solution": "Effective value and peak value:\n\n$$ U = \\frac{\\hat{u}}{\\sqrt{2}} \\quad\\Leftrightarrow\\quad \\hat{u} = U\\sqrt{2} = 230\\sqrt{2} \\approx 325\\ \\mathrm{V} $$\n\n**Answer:** The peak voltage is about $325\\ \\mathrm{V}$.\n\n**General conclusion:** The peak voltage is about $1.41$ times the effective value. This is one of the reasons why insulation rated for a considerably higher voltage than the \"nominal\" $230\\ \\mathrm{V}$ is needed: briefly, the voltage reaches $\\pm 325\\ \\mathrm{V}$ several times per second."
   },
   {
    "level": 1,
    "question": "The Swedish mains supply has the frequency $50\\ \\mathrm{Hz}$. What is the angular velocity $\\omega$?",
    "answer": {
     "value": 314,
     "unit": "rad/s"
    },
    "solution": "$$ \\omega = 2\\pi f = 2\\pi \\cdot 50 = 100\\pi \\approx 314\\ \\mathrm{rad/s} $$\n\n**Answer:** The angular velocity is about $314\\ \\mathrm{rad/s}$ (or exactly $100\\pi$)."
   },
   {
    "level": 1,
    "question": "An alternating voltage is described by $u = 325\\sin(100\\pi\\, t)\\ \\mathrm{V}$. What is the voltage at the time $t = 5.0\\ \\mathrm{ms}$?",
    "answer": {
     "value": 325,
     "unit": "V"
    },
    "solution": "Substitute $t = 5.0\\cdot 10^{-3}\\ \\mathrm{s}$:\n\n$$ u = 325\\sin(100\\pi \\cdot 5.0\\cdot 10^{-3}) = 325\\sin(0.5\\pi) = 325\\cdot 1 = 325\\ \\mathrm{V} $$\n\n**Answer:** The voltage is $325\\ \\mathrm{V}$ (= the peak voltage, since $\\sin(\\pi/2) = 1$).\n\n**General conclusion:** At $t = T/4$ (a quarter of a period) the voltage reaches its peak value. That is when the rotating loop in the generator is optimally oriented for the maximum change in flux."
   },
   {
    "level": 2,
    "question": "An AC generator has the peak voltage $\\hat{u} = 170\\ \\mathrm{V}$ and the frequency $f = 60\\ \\mathrm{Hz}$. (a) Write the expression for $u(t)$. (b) What is the effective value?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500 350\" style=\"max-width:500px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><g stroke=\"rgba(15,22,32,0.15)\" stroke-width=\"1\"><line x1=\"60.0\" y1=\"30\" x2=\"60.0\" y2=\"290\"/><line x1=\"193.3\" y1=\"30\" x2=\"193.3\" y2=\"290\"/><line x1=\"326.7\" y1=\"30\" x2=\"326.7\" y2=\"290\"/><line x1=\"460.0\" y1=\"30\" x2=\"460.0\" y2=\"290\"/><line x1=\"60\" y1=\"264.0\" x2=\"460\" y2=\"264.0\"/><line x1=\"60\" y1=\"160.0\" x2=\"460\" y2=\"160.0\"/><line x1=\"60\" y1=\"56.0\" x2=\"460\" y2=\"56.0\"/></g><line x1=\"60\" y1=\"160.0\" x2=\"468\" y2=\"160.0\" stroke=\"#0f1620\" stroke-width=\"2\"/><line x1=\"60\" y1=\"290\" x2=\"60\" y2=\"22\" stroke=\"#0f1620\" stroke-width=\"2\"/><polygon points=\"468,156.0 476,160.0 468,164.0\" fill=\"#0f1620\"/><polygon points=\"56,22 60,14 64,22\" fill=\"#0f1620\"/><text x=\"494\" y=\"154.0\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"end\"><tspan font-style=\"italic\">t</tspan> (s)</text><text x=\"66\" y=\"22\" font-size=\"14\" fill=\"#0f1620\" text-anchor=\"start\"><tspan font-style=\"italic\">u</tspan> (V)</text><g><text x=\"60.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"193.3\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0.02</text><text x=\"326.7\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0.04</text><text x=\"460.0\" y=\"308\" text-anchor=\"middle\" font-size=\"13\" fill=\"#0f1620\">0.06</text><text x=\"53\" y=\"269.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">-170</text><text x=\"53\" y=\"165.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">0</text><text x=\"53\" y=\"61.0\" text-anchor=\"end\" font-size=\"13\" fill=\"#0f1620\">170</text></g><path d=\"M 60.0 160.0 L 61.7 150.2 L 63.3 140.5 L 65.0 131.0 L 66.7 121.7 L 68.3 112.8 L 70.0 104.3 L 71.7 96.3 L 73.3 88.8 L 75.0 82.0 L 76.7 75.9 L 78.3 70.5 L 80.0 65.9 L 81.7 62.1 L 83.3 59.3 L 85.0 57.3 L 86.7 56.2 L 88.3 56.1 L 90.0 56.8 L 91.7 58.5 L 93.3 61.1 L 95.0 64.6 L 96.7 68.9 L 98.3 74.0 L 100.0 79.9 L 101.7 86.5 L 103.3 93.7 L 105.0 101.5 L 106.7 109.9 L 108.3 118.7 L 110.0 127.9 L 111.7 137.3 L 113.3 147.0 L 115.0 156.7 L 116.7 166.5 L 118.3 176.3 L 120.0 185.9 L 121.7 195.2 L 123.3 204.3 L 125.0 212.9 L 126.7 221.1 L 128.3 228.8 L 130.0 235.8 L 131.7 242.2 L 133.3 247.8 L 135.0 252.7 L 136.7 256.7 L 138.3 259.9 L 140.0 262.2 L 141.7 263.5 L 143.3 264.0 L 145.0 263.5 L 146.7 262.2 L 148.3 259.9 L 150.0 256.7 L 151.7 252.7 L 153.3 247.8 L 155.0 242.2 L 156.7 235.8 L 158.3 228.8 L 160.0 221.1 L 161.7 212.9 L 163.3 204.3 L 165.0 195.2 L 166.7 185.9 L 168.3 176.3 L 170.0 166.5 L 171.7 156.7 L 173.3 147.0 L 175.0 137.3 L 176.7 127.9 L 178.3 118.7 L 180.0 109.9 L 181.7 101.5 L 183.3 93.7 L 185.0 86.5 L 186.7 79.9 L 188.3 74.0 L 190.0 68.9 L 191.7 64.6 L 193.3 61.1 L 195.0 58.5 L 196.7 56.8 L 198.3 56.1 L 200.0 56.2 L 201.7 57.3 L 203.3 59.3 L 205.0 62.1 L 206.7 65.9 L 208.3 70.5 L 210.0 75.9 L 211.7 82.0 L 213.3 88.8 L 215.0 96.3 L 216.7 104.3 L 218.3 112.8 L 220.0 121.7 L 221.7 131.0 L 223.3 140.5 L 225.0 150.2 L 226.7 160.0 L 228.3 169.8 L 230.0 179.5 L 231.7 189.0 L 233.3 198.3 L 235.0 207.2 L 236.7 215.7 L 238.3 223.7 L 240.0 231.2 L 241.7 238.0 L 243.3 244.1 L 245.0 249.5 L 246.7 254.1 L 248.3 257.9 L 250.0 260.7 L 251.7 262.7 L 253.3 263.8 L 255.0 263.9 L 256.7 263.2 L 258.3 261.5 L 260.0 258.9 L 261.7 255.4 L 263.3 251.1 L 265.0 246.0 L 266.7 240.1 L 268.3 233.5 L 270.0 226.3 L 271.7 218.5 L 273.3 210.1 L 275.0 201.3 L 276.7 192.1 L 278.3 182.7 L 280.0 173.0 L 281.7 163.3 L 283.3 153.5 L 285.0 143.7 L 286.7 134.1 L 288.3 124.8 L 290.0 115.7 L 291.7 107.1 L 293.3 98.9 L 295.0 91.2 L 296.7 84.2 L 298.3 77.8 L 300.0 72.2 L 301.7 67.3 L 303.3 63.3 L 305.0 60.1 L 306.7 57.8 L 308.3 56.5 L 310.0 56.0 L 311.7 56.5 L 313.3 57.8 L 315.0 60.1 L 316.7 63.3 L 318.3 67.3 L 320.0 72.2 L 321.7 77.8 L 323.3 84.2 L 325.0 91.2 L 326.7 98.9 L 328.3 107.1 L 330.0 115.7 L 331.7 124.8 L 333.3 134.1 L 335.0 143.7 L 336.7 153.5 L 338.3 163.3 L 340.0 173.0 L 341.7 182.7 L 343.3 192.1 L 345.0 201.3 L 346.7 210.1 L 348.3 218.5 L 350.0 226.3 L 351.7 233.5 L 353.3 240.1 L 355.0 246.0 L 356.7 251.1 L 358.3 255.4 L 360.0 258.9 L 361.7 261.5 L 363.3 263.2 L 365.0 263.9 L 366.7 263.8 L 368.3 262.7 L 370.0 260.7 L 371.7 257.9 L 373.3 254.1 L 375.0 249.5 L 376.7 244.1 L 378.3 238.0 L 380.0 231.2 L 381.7 223.7 L 383.3 215.7 L 385.0 207.2 L 386.7 198.3 L 388.3 189.0 L 390.0 179.5 L 391.7 169.8 L 393.3 160.0 L 395.0 150.2 L 396.7 140.5 L 398.3 131.0 L 400.0 121.7 L 401.7 112.8 L 403.3 104.3 L 405.0 96.3 L 406.7 88.8 L 408.3 82.0 L 410.0 75.9 L 411.7 70.5 L 413.3 65.9 L 415.0 62.1 L 416.7 59.3 L 418.3 57.3 L 420.0 56.2 L 421.7 56.1 L 423.3 56.8 L 425.0 58.5 L 426.7 61.1 L 428.3 64.6 L 430.0 68.9 L 431.7 74.0 L 433.3 79.9 L 435.0 86.5 L 436.7 93.7 L 438.3 101.5 L 440.0 109.9 L 441.7 118.7 L 443.3 127.9 L 445.0 137.3 L 446.7 147.0 L 448.3 156.7 L 450.0 166.5 L 451.7 176.3 L 453.3 185.9 L 455.0 195.2 L 456.7 204.3 L 458.3 212.9 L 460.0 221.1\" stroke=\"#c8324a\" stroke-width=\"2.5\" fill=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/></svg>",
    "answer": {
     "value": 120.2,
     "unit": "V"
    },
    "solution": "**(a)** The angular velocity:\n\n$$ \\omega = 2\\pi f = 2\\pi \\cdot 60 = 120\\pi\\ \\mathrm{rad/s} $$\n\nThe instantaneous voltage:\n\n$$ u(t) = 170\\sin(120\\pi\\,t)\\ \\mathrm{V} $$\n\n**(b)** The effective value:\n\n$$ U = \\frac{\\hat{u}}{\\sqrt{2}} = \\frac{170}{\\sqrt{2}} \\approx 120.2\\ \\mathrm{V} $$\n\n**Answer:** $u(t) = 170\\sin(120\\pi t)\\ \\mathrm{V}$ with the effective value about $120\\ \\mathrm{V}$.\n\n**General conclusion:** This is roughly the American mains supply (110–120 V effective, 60 Hz). The effective value is the \"practical\" value that is, for example, stated on appliances: it is the voltage that *gives the same power* as a corresponding direct voltage would."
   },
   {
    "level": 2,
    "question": "A simple AC generator has a square loop with the side $10\\ \\mathrm{cm}$ rotating in a magnetic field $B = 0.40\\ \\mathrm{T}$. The loop rotates with the frequency $50\\ \\mathrm{Hz}$. Calculate the induced **peak voltage** $\\hat{u}$.",
    "answer": {
     "value": 1.257,
     "unit": "V"
    },
    "solution": "**Step 1: angular velocity.**\n\n$$ \\omega = 2\\pi f = 2\\pi \\cdot 50 = 100\\pi\\ \\mathrm{rad/s} $$\n\n**Step 2: peak voltage.** For a loop rotating in a magnetic field, $\\hat{u} = B\\cdot A\\cdot\\omega$:\n\n$$ \\hat{u} = B\\cdot A\\cdot\\omega = 0.40 \\cdot (0.10)^2 \\cdot 100\\pi = 0.40 \\cdot 0.010 \\cdot 314.16 \\approx 1.26\\ \\mathrm{V} $$\n\n**Answer:** The peak voltage is about $1.3\\ \\mathrm{V}$.\n\n**General conclusion:** A simple single-turn loop gives a low voltage. In practical generators the voltage is increased by (i) using **many turns** (multiplies $\\hat{u}$ by $N$), (ii) increasing the magnetic field $B$, or (iii) spinning faster. Industrial generators often use hundreds of turns and strong electromagnets."
   },
   {
    "level": 3,
    "question": "A light bulb has a resistance of $230\\ \\mathrm{\\Omega}$ and is connected to the Swedish mains supply ($U = 230\\ \\mathrm{V}$ effective, $f = 50\\ \\mathrm{Hz}$). Determine (a) the peak current $\\hat{\\imath}$ through the bulb, and (b) the **maximum power** during a period.",
    "answer": {
     "value": 460,
     "unit": "W"
    },
    "solution": "**(a) The peak current.** The effective current is $I = U/R$:\n\n$$ I = \\frac{230}{230} = 1.0\\ \\mathrm{A} $$\n\nThe peak current:\n\n$$ \\hat{\\imath} = I\\sqrt{2} = 1.0\\sqrt{2} \\approx 1.41\\ \\mathrm{A} $$\n\n**(b) Maximum power.** The maximum power occurs when both the voltage and the current are at their peak values at the same time (they are *in phase* for a resistive load):\n\n$$ P_{\\max} = \\hat{u}\\cdot\\hat{\\imath} = 325 \\cdot 1.41 \\approx 460\\ \\mathrm{W} $$\n\n**Insight:** This is **double** the average power. The average power is $P_\\text{average} = U\\cdot I = 230\\cdot 1.0 = 230\\ \\mathrm{W}$, which is half the maximum power. This is why we use effective values: then the formula $P = UI$ is valid as the *average* power.\n\n**Answer:** (a) The peak current is about $1.4\\ \\mathrm{A}$. (b) The maximum power is about $460\\ \\mathrm{W}$ (= $2\\cdot P_\\text{average}$).\n\n**General conclusion:** $P_{\\max} = 2 P_\\text{average}$ is a classic Physics 2 result that is often misunderstood. This is why you must distinguish between *average*, *peak* and *effective* values in AC analysis."
   }
  ]
 },
 "fy2-3.11": {
  "kalla": "69e611468a",
  "data": [
   {
    "level": 1,
    "question": "The primary coil of a transformer has $1\\,500$ turns and the secondary coil $300$ turns. If the primary voltage is $230\\ \\mathrm{V}$, what is the secondary voltage?",
    "answer": {
     "value": 46,
     "unit": "V"
    },
    "solution": "The transformer formula:\n\n$$ \\frac{N_1}{N_2} = \\frac{U_1}{U_2} \\quad\\Leftrightarrow\\quad U_2 = U_1\\cdot\\frac{N_2}{N_1} = 230\\cdot\\frac{300}{1\\,500} = 230\\cdot 0.20 = 46\\ \\mathrm{V} $$\n\n**Answer:** The secondary voltage is $46\\ \\mathrm{V}$."
   },
   {
    "level": 1,
    "question": "A transformer has its primary coil connected to $230\\ \\mathrm{V}$ and is to give a secondary voltage of $12\\ \\mathrm{V}$. What is the ratio of the numbers of turns $N_1/N_2$?",
    "answer": {
     "value": 19.17,
     "unit": ""
    },
    "solution": "$$ \\frac{N_1}{N_2} = \\frac{U_1}{U_2} = \\frac{230}{12} \\approx 19.2 $$\n\n**Answer:** The primary coil needs about $19$ times as many turns as the secondary coil."
   },
   {
    "level": 1,
    "question": "A transformer has the primary current $0.50\\ \\mathrm{A}$ and the ratio $N_1/N_2 = 1/10$. What is the secondary current?",
    "answer": {
     "value": 0.05,
     "unit": "A"
    },
    "solution": "The current ratio in a transformer:\n\n$$ \\frac{N_1}{N_2} = \\frac{I_2}{I_1} \\quad\\Leftrightarrow\\quad I_2 = I_1\\cdot\\frac{N_1}{N_2} = 0.50 \\cdot \\frac{1}{10} = 0.050\\ \\mathrm{A} $$\n\n**Answer:** The secondary current is $50\\ \\mathrm{mA}$.\n\n**General conclusion:** When the voltage is *stepped up* (by a factor of $10$), the current at the same time becomes a tenth as large, since the power $P = UI$ is conserved according to the principle of conservation of energy."
   },
   {
    "level": 2,
    "question": "A mobile phone charger is a transformer that transforms $230\\ \\mathrm{V}$ to $5.0\\ \\mathrm{V}$. The charger delivers the current $2.0\\ \\mathrm{A}$ at the output. Determine the current through the primary coil (assuming $100\\,\\%$ efficiency).",
    "answer": {
     "value": 0.0435,
     "unit": "A"
    },
    "solution": "**The key insight is that the effective power is the same through both coils** (energy is conserved):\n\n$$ U_1\\cdot I_1 = U_2\\cdot I_2 \\quad\\Leftrightarrow\\quad I_1 = \\frac{U_2\\cdot I_2}{U_1} = \\frac{5.0\\cdot 2.0}{230} \\approx 0.0435\\ \\mathrm{A} $$\n\n**Answer:** The primary current is about $43\\ \\mathrm{mA}$.\n\n**General conclusion:** This is the reason why high voltages are used for transmitting electricity: a high voltage gives a low current, which gives small heat losses in the lines ($P_\\text{loss} = I^2 R$)."
   },
   {
    "level": 2,
    "question": "A transformer has $N_1 = 800$ turns in the primary coil and $N_2 = 200$ turns in the secondary coil. It is connected to $400\\ \\mathrm{V}$ alternating voltage and loaded with a resistor $R = 20\\ \\mathrm{\\Omega}$ on the secondary side. Determine the current in the primary coil.",
    "answer": {
     "value": 1.25,
     "unit": "A"
    },
    "solution": "**Step 1: the secondary voltage.**\n\n$$ U_2 = U_1\\cdot\\frac{N_2}{N_1} = 400 \\cdot \\frac{200}{800} = 100\\ \\mathrm{V} $$\n\n**Step 2: the secondary current (through the resistor $R$).**\n\n$$ I_2 = \\frac{U_2}{R} = \\frac{100}{20} = 5.0\\ \\mathrm{A} $$\n\n**Step 3: the primary current.**\n\n$$ I_1 = I_2\\cdot\\frac{N_2}{N_1} = 5.0 \\cdot \\frac{200}{800} = 1.25\\ \\mathrm{A} $$\n\n**Answer:** The primary current is $1.25\\ \\mathrm{A}$.\n\n**General conclusion:** Three principles combined: the voltage ratio, Ohm's law and the current ratio. A classic intermediate-level problem."
   },
   {
    "level": 3,
    "question": "The Swedish power grid transmits the power $50\\ \\mathrm{MW}$ to a town at the voltage $400\\ \\mathrm{kV}$. The lines have the total resistance $5.0\\ \\mathrm{\\Omega}$. Calculate the **power loss** in the lines. Compare with what the power loss would have been if the voltage had instead been $20\\ \\mathrm{kV}$.",
    "answer": {
     "value": 78.1,
     "unit": "kW"
    },
    "solution": "**The key insight is that the power loss depends on $I^2 R$**, so for the same transmitted power $P = UI$ a high voltage leads to a low current, and therefore quadratically smaller losses.\n\n**Step 1: the current in the lines at $400\\ \\mathrm{kV}$.**\n\n$$ I = \\frac{P}{U} = \\frac{50\\cdot 10^6}{400\\cdot 10^3} = 125\\ \\mathrm{A} $$\n\n**Step 2: the power loss at $400\\ \\mathrm{kV}$.**\n\n$$ P_\\text{loss} = I^2\\cdot R = 125^2 \\cdot 5.0 = 78\\,125\\ \\mathrm{W} \\approx 78\\ \\mathrm{kW} $$\n\n**Step 3: compare with $20\\ \\mathrm{kV}$.** At $20\\ \\mathrm{kV}$ the current becomes $I' = 50\\cdot 10^6/20\\cdot 10^3 = 2\\,500\\ \\mathrm{A}$, 20 times as large. The power loss becomes:\n\n$$ P'_\\text{loss} = (2\\,500)^2 \\cdot 5.0 = 31.25\\ \\mathrm{MW} $$\n\n(or with a ratio argument: $20^2 = 400$ times as large a loss = $78\\cdot 400 = 31.2\\ \\mathrm{MW}$).\n\n**Answer:** At $400\\ \\mathrm{kV}$ the loss is $78\\ \\mathrm{kW}$ (about $0.16\\,\\%$ of the power). At $20\\ \\mathrm{kV}$ the loss would be $31\\ \\mathrm{MW}$: **over $60\\,\\%$ of the power** would disappear as heat!\n\n**General conclusion:** This is the whole motivation for **high-voltage lines**: without them, transmitting electricity over long distances would be practically impossible. Transformers are therefore critical for the modern electricity system."
   }
  ]
 },
 "fy2-3.12": {
  "kalla": "56463d3466",
  "data": [
   {
    "level": 1,
    "question": "A velocity selector has the electric field $\\mathbb{E} = 2.0\\cdot 10^4\\ \\mathrm{V/m}$ and the magnetic field $B = 0.010\\ \\mathrm{T}$. What velocity do the particles that pass straight through have?",
    "answer": {
     "value": 2000000,
     "unit": "m/s"
    },
    "solution": "The velocity selector formula:\n\n$$ v = \\frac{\\mathbb{E}}{B} = \\frac{2.0\\cdot 10^4}{0.010} = 2.0\\cdot 10^6\\ \\mathrm{m/s} $$\n\n**Answer:** The velocity is $2.0\\cdot 10^6\\ \\mathrm{m/s}$.\n\n**General conclusion:** Only the particles with exactly this velocity have their electric and magnetic forces balanced: all others are deflected and removed by a screen."
   },
   {
    "level": 1,
    "question": "In a velocity selector, particles with the velocity $1.5\\cdot 10^6\\ \\mathrm{m/s}$ are to be filtered out. The electric field is set to $3.0\\cdot 10^4\\ \\mathrm{V/m}$. What magnetic flux density is needed?",
    "answer": {
     "value": 0.02,
     "unit": "T"
    },
    "solution": "We solve for $B$:\n\n$$ v = \\frac{\\mathbb{E}}{B} \\quad\\Leftrightarrow\\quad B = \\frac{\\mathbb{E}}{v} = \\frac{3.0\\cdot 10^4}{1.5\\cdot 10^6} = 0.020\\ \\mathrm{T} = 20\\ \\mathrm{mT} $$\n\n**Answer:** The magnetic field should be $20\\ \\mathrm{mT}$."
   },
   {
    "level": 1,
    "question": "A particle with the mass $3.3\\cdot 10^{-26}\\ \\mathrm{kg}$ and the charge $1.602\\cdot 10^{-19}\\ \\mathrm{C}$ moves with the velocity $2.0\\cdot 10^5\\ \\mathrm{m/s}$ into a magnetic field $B = 0.30\\ \\mathrm{T}$. Calculate the radius of the circular path.",
    "answer": {
     "value": 0.137,
     "unit": "m"
    },
    "solution": "The radius from $F_m = F_c$:\n\n$$ r = \\frac{m\\cdot v}{q\\cdot B} = \\frac{3.3\\cdot 10^{-26} \\cdot 2.0\\cdot 10^5}{1.602\\cdot 10^{-19} \\cdot 0.30} = \\frac{6.6\\cdot 10^{-21}}{4.806\\cdot 10^{-20}} \\approx 0.137\\ \\mathrm{m} $$\n\n**Answer:** The radius of the circular path is about $14\\ \\mathrm{cm}$."
   },
   {
    "level": 2,
    "question": "An ion with the charge $q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$ is filtered out by a velocity selector with $\\mathbb{E} = 1.5\\cdot 10^4\\ \\mathrm{V/m}$ and $B = 0.10\\ \\mathrm{T}$. It then enters a pure magnetic field $B = 0.10\\ \\mathrm{T}$, where it follows a circular path with the radius $r = 3.1\\ \\mathrm{cm}$. Determine the mass of the ion.",
    "answer": {
     "value": 3.31e-26,
     "unit": "kg"
    },
    "solution": "**Step 1: the velocity of the ion from the velocity selector.**\n\n$$ v = \\frac{\\mathbb{E}}{B} = \\frac{1.5\\cdot 10^4}{0.10} = 1.5\\cdot 10^5\\ \\mathrm{m/s} $$\n\n**Step 2: the mass from the mass spectrometer formula.**\n\n$$ m = \\frac{q\\cdot B\\cdot r}{v} = \\frac{1.602\\cdot 10^{-19} \\cdot 0.10 \\cdot 0.031}{1.5\\cdot 10^5} = \\frac{4.97\\cdot 10^{-22}}{1.5\\cdot 10^5} \\approx 3.31\\cdot 10^{-26}\\ \\mathrm{kg} $$\n\n**Answer:** The mass of the ion is about $3.3\\cdot 10^{-26}\\ \\mathrm{kg}$ (corresponding to about $20$ atomic mass units, a neon ion).\n\n**General conclusion:** This is how a **mass spectrometer** works: it can separate isotopes and identify unknown substances by measuring their mass-to-charge ratio."
   },
   {
    "level": 2,
    "question": "A mass spectrometer is used to distinguish between two potassium isotopes: $^{39}\\mathrm{K}$ (mass $6.47\\cdot 10^{-26}\\ \\mathrm{kg}$) and $^{41}\\mathrm{K}$ (mass $6.80\\cdot 10^{-26}\\ \\mathrm{kg}$). Both have the charge $1.602\\cdot 10^{-19}\\ \\mathrm{C}$ and are filtered out with the velocity $v = 1.0\\cdot 10^5\\ \\mathrm{m/s}$ in a magnetic field $B = 0.25\\ \\mathrm{T}$. What is the **difference** between the radii of their paths?",
    "answer": {
     "value": 0.00824,
     "unit": "m"
    },
    "solution": "The radius of the path $r = mv/(qB)$ is **proportional to the mass** for the same $v$, $q$ and $B$. The difference:\n\n$$ \\Delta r = \\frac{(m_2 - m_1)\\cdot v}{q\\cdot B} = \\frac{(6.80 - 6.47)\\cdot 10^{-26} \\cdot 1.0\\cdot 10^5}{1.602\\cdot 10^{-19} \\cdot 0.25} $$\n\n$$ \\Delta r = \\frac{3.3\\cdot 10^{-27} \\cdot 1.0\\cdot 10^5}{4.005\\cdot 10^{-20}} = \\frac{3.3\\cdot 10^{-22}}{4.005\\cdot 10^{-20}} \\approx 8.24\\cdot 10^{-3}\\ \\mathrm{m} $$\n\n**Answer:** The difference in the radius of the path is about $8.2\\ \\mathrm{mm}$, quite enough to separate the isotopes on a photographic plate.\n\n**General conclusion:** Mass spectrometry is so sensitive that it can distinguish isotopes that differ by only *one* atomic mass unit. This is used in practice in, for example, the dating of archaeological finds (the carbon-14 method)."
   },
   {
    "level": 3,
    "question": "An ion with the charge $q$ is accelerated from rest through the potential difference $U = 200\\ \\mathrm{V}$ and then enters a magnetic field $B = 0.050\\ \\mathrm{T}$ perpendicularly. It follows a circular path with the radius $r = 0.064\\ \\mathrm{m}$. Determine the mass-to-charge ratio $m/q$ of the ion.",
    "answer": {
     "value": 2.56e-8,
     "unit": "kg/C",
     "tol": 0.03
    },
    "solution": "**The key insight is that we have two independent physical principles:**\n1. **The principle of conservation of energy** during the acceleration: $qU = mv^2/2$\n2. **Circular motion** in the magnetic field: $qvB = mv^2/r$, that is, $v = qBr/m$\n\nCombine them to eliminate $v$.\n\n**Step 1: an expression for $v$ from the circular motion:**\n\n$$ v = \\frac{qBr}{m} $$\n\n**Step 2: substitute into the principle of conservation of energy:**\n\n$$ qU = \\frac{m}{2}\\cdot\\left(\\frac{qBr}{m}\\right)^2 = \\frac{q^2 B^2 r^2}{2m} $$\n\n**Step 3: solve for $m/q$:**\n\n$$ U = \\frac{qB^2r^2}{2m} \\quad\\Leftrightarrow\\quad \\frac{m}{q} = \\frac{B^2 r^2}{2U} $$\n\nGiven values:\n$$\n\\left[ \\begin{array}{l}\nB = 0.050\\ \\mathrm{T} \\\\\nr = 0.064\\ \\mathrm{m} \\\\\nU = 200\\ \\mathrm{V}\n\\end{array} \\right]\n$$\n\n$$ \\frac{m}{q} = \\frac{0.050^2 \\cdot 0.064^2}{2 \\cdot 200} = \\frac{0.0025 \\cdot 4.096\\cdot 10^{-3}}{400} = \\frac{1.024\\cdot 10^{-5}}{400} = 2.56\\cdot 10^{-8}\\ \\mathrm{kg/C} $$\n\n**Answer:** The mass-to-charge ratio is about $2.6\\cdot 10^{-8}\\ \\mathrm{kg/C}$.\n\n**General conclusion:** By combining acceleration in an electric field with circular motion in a magnetic field, the *ratio* between the mass and the charge of charged particles can be determined, without knowing either of them separately. This is the principle behind the mass spectrometer. Thomson determined the electron's ratio in 1897 with a similar idea, but he used crossed electric and magnetic fields. The electron's ratio is about $5.7\\cdot 10^{-12}\\ \\mathrm{kg/C}$, much smaller than the ion's here."
   }
  ]
 },
 "fy2-3.13": {
  "kalla": "6ca0189978",
  "data": [
   {
    "level": 1,
    "question": "What is an **eddy current**?",
    "choices": [
     "A special kind of alternating current found in the mains supply.",
     "A current that swirls around a magnet without an external energy source.",
     "A direct current flowing through a coil.",
     "A circulating induced current in a metal plate that opposes the cause of its creation (according to Lenz's law)."
    ],
    "correct": 3,
    "solution": "**Eddy currents** are circulating currents induced in a metal plate or similar when it is in a varying magnetic field (or moves through a magnetic field). Their direction is given by **Lenz's law**: they oppose the cause of their own creation.\n\n**Examples:**\n- An aluminium pendulum swinging through a magnetic field is braked by eddy currents.\n- An **induction hob** heats the bottom of a frying pan through eddy currents.\n- **Magnetic brakes** on roller coasters use eddy currents for safe braking."
   },
   {
    "level": 1,
    "question": "Why is an aluminium pendulum swinging between the poles of a magnet braked?",
    "choices": [
     "Because aluminium is attracted by magnets.",
     "Because the air resistance increases in the presence of a magnetic field.",
     "Because eddy currents are induced in the pendulum and these give a force that opposes the motion (Lenz's law).",
     "Because the gravitational force increases between the poles."
    ],
    "correct": 2,
    "solution": "Aluminium is not ferromagnetic, so it is *not* attracted directly by a magnet. But when the pendulum **moves** in the magnetic field, eddy currents are induced in the metal (induction), and these eddy currents in turn create a magnetic field that **opposes** the cause, the pendulum motion (Lenz's law).\n\nThe mechanical energy is converted into electrical energy in the form of the currents, which then becomes heat in the resistance of the metal. The pendulum slowly stops."
   },
   {
    "level": 1,
    "question": "An induction hob uses eddy currents to heat the bottom of the cooking pot. What property must the material of the pot have?",
    "choices": [
     "It must be made of non-magnetic plastic.",
     "It must be made of aluminium specifically.",
     "It must be made of a ferromagnetic material (for example iron or steel) so that the heating is effective.",
     "It must be transparent so that light can get through."
    ],
    "correct": 2,
    "solution": "Induction hobs work by inducing eddy currents in the bottom of the cooking pot. Eddy currents are induced in all conducting materials, but for the heating to be effective the material needs to be **ferromagnetic**, typically iron or steel. In a ferromagnetic material the magnetic field is concentrated in the metal and the currents gather in a thin layer closest to the hob, where the resistance is large. The heating is then strong.\n\n**Pure aluminium saucepans work poorly** on induction hobs (too small a resistive loss), while steel-bottomed saucepans work well. This is why modern saucepans often have a steel plate cast into the bottom.\n\n**General conclusion:** The difference compared with an ordinary ceramic hob: there is no direct thermal contact. The energy is transferred *wirelessly* via the magnetic field, and the heat is generated *inside* the bottom of the pot by eddy currents."
   },
   {
    "level": 2,
    "question": "Two aluminium plates with the same outer dimensions (same length, width and thickness) are dropped from the same height in a magnetic field. One has **no slots** and the other has **slits** (cuts right through) that cut off the paths of the eddy currents. Which one falls more slowly?",
    "choices": [
     "The plate without slots: the eddy currents can move freely and therefore give a larger braking force.",
     "The plate with slits: the slits give air resistance.",
     "They fall exactly as fast: the number of slits does not affect the falling speed.",
     "The plate with slits: the slits increase the magnetisation."
    ],
    "correct": 0,
    "solution": "The plate **without slots** falls most slowly, since the eddy currents can move freely in the whole metal and can therefore become strong. This gives a strong braking magnetic force according to Lenz's law.\n\nThe plate with slits breaks up the paths of the eddy currents into smaller parts, which makes the currents much weaker and therefore the braking force small.\n\n**General conclusion:** This is why **transformer cores** are built up of many thin insulated laminations instead of a solid block: the (unwanted) eddy current losses are reduced drastically without impairing the transport of the magnetic field through the core."
   },
   {
    "level": 2,
    "question": "A circular aluminium ring with the diameter $5.0\\ \\mathrm{cm}$ is threaded onto an iron core connected to a powerful coil. When the current through the coil is switched on (a short pulse) **the ring is shot upwards**. What is the main reason for this?",
    "choices": [
     "The ring becomes warmer and rises like a balloon.",
     "The magnetic field pulls the ring mechanically towards the centre of the coil.",
     "An eddy current is induced in the ring, which creates a magnetic field opposite to that of the coil. Like poles repel → the ring is shot upwards.",
     "The ring gets an electric charge that is repelled by the coil."
    ],
    "correct": 2,
    "solution": "When the current through the coil is switched on quickly, a rapidly growing magnetic field is created that spreads through the iron core. This induces a large eddy current in the aluminium ring (Lenz's law: it opposes the cause).\n\nThe induced current in the ring creates its own magnetic field **opposite** to the field of the coil, so the ring becomes like a *reversed electromagnet*. Since the magnetic poles of the coil and the ring face each other as like poles, they repel each other → the ring is shot upwards.\n\n**The \"Thomson's ring\" demonstration:** A classic experiment that clearly shows Lenz's law in practice. If the ring has a *slit* (so that the current cannot go round), nothing happens. And a *plastic ring* is not affected at all (it cannot conduct a current)."
   },
   {
    "level": 3,
    "question": "A square aluminium plate with the side $20\\ \\mathrm{cm}$, the thickness $5.0\\ \\mathrm{mm}$ and the resistivity $\\rho_\\text{Al} = 2.65\\cdot 10^{-8}\\ \\mathrm{\\Omega\\cdot m}$ is pulled with the velocity $0.50\\ \\mathrm{m/s}$ perpendicularly out of a magnetic field $B = 0.80\\ \\mathrm{T}$. Only the edge ($l = 20\\ \\mathrm{cm}$) that is at the field boundary induces a current. Estimate the pulling force needed to keep a constant speed, if the resistance of the short-circuiting eddy current path is $R \\approx 5.3\\cdot 10^{-6}\\ \\mathrm{\\Omega}$.",
    "answer": {
     "value": 2400,
     "unit": "N",
     "tol": 0.03
    },
    "solution": "**The key insight is that force balance applies at constant velocity**: the pulling force is exactly equal to the braking magnetic force.\n\n**Step 1: induced emf.**\n\n$$ e = l\\cdot v\\cdot B = 0.20 \\cdot 0.50 \\cdot 0.80 = 0.080\\ \\mathrm{V} $$\n\n**Step 2: eddy current.**\n\n$$ I = \\frac{e}{R} = \\frac{0.080}{5.3\\cdot 10^{-6}} \\approx 1.51\\cdot 10^4\\ \\mathrm{A} $$\n\n**Step 3: braking force = required pulling force.**\n\n$$ F = B\\cdot I\\cdot l = 0.80 \\cdot 1.51\\cdot 10^4 \\cdot 0.20 \\approx 2.4\\cdot 10^3\\ \\mathrm{N} $$\n\n**Answer:** The pulling force must be about $2.4\\ \\mathrm{kN}$, almost the weight of $250\\ \\mathrm{kg}$!\n\n**General conclusion:** The eddy currents in an *unlaminated* metal plate are incredibly strong, because the resistance of the short-circuiting path is extremely small, only microohms. This is why **eddy current brakes** can be so effective, and why transformer cores must be laminated in insulated sheets to reduce eddy current losses."
   }
  ]
 },
 "fy2-3.14": {
  "kalla": "840ebfef6f",
  "data": [
   {
    "level": 1,
    "question": "What is the **Hall effect**?",
    "choices": [
     "That a current-carrying conductor in a magnetic field gets a voltage perpendicular to the direction of the current.",
     "That the resistance of a conductor increases when it is heated.",
     "The heat generated when a current flows through a conductor.",
     "That a magnet attracts a conductor when a current flows through it."
    ],
    "correct": 0,
    "solution": "**The Hall effect:** When a current-carrying conductor is placed in a magnetic field (perpendicular to the current), a voltage arises **perpendicular** to the direction of the current. This is because the magnetic force pushes the charges towards one side of the conductor, and an opposing electric force arises until equilibrium is reached. The resulting voltage is called the **Hall voltage**.\n\nThe Hall effect is used in practice in **magnetometers** to determine unknown magnetic fields from the Hall voltage."
   },
   {
    "level": 1,
    "question": "A thin conducting plate with the width $d = 8.0\\ \\mathrm{mm}$ carries a current in which the electrons have the drift velocity $v = 5.0\\cdot 10^{-4}\\ \\mathrm{m/s}$. The plate is in a magnetic field $B = 1.2\\ \\mathrm{T}$ perpendicular to the current. Determine the Hall voltage.",
    "answer": {
     "value": 0.0000048,
     "unit": "V"
    },
    "solution": "Hall voltage:\n\n$$ U = v\\cdot d\\cdot B = 5.0\\cdot 10^{-4} \\cdot 0.0080 \\cdot 1.2 = 4.8\\cdot 10^{-6}\\ \\mathrm{V} = 4.8\\ \\mathrm{\\mu V} $$\n\n**Answer:** The Hall voltage is $4.8\\ \\mathrm{\\mu V}$."
   },
   {
    "level": 1,
    "question": "A Hall effect sensor with the width $d = 5.0\\ \\mathrm{mm}$ and the drift velocity $v = 8.0\\cdot 10^{-4}\\ \\mathrm{m/s}$ measures the Hall voltage $U = 2.0\\ \\mathrm{\\mu V}$. Determine the flux density of the magnetic field.",
    "answer": {
     "value": 0.5,
     "unit": "T"
    },
    "solution": "We solve for $B$ in $U = v\\cdot d\\cdot B$:\n\n$$ B = \\frac{U}{v\\cdot d} = \\frac{2.0\\cdot 10^{-6}}{8.0\\cdot 10^{-4} \\cdot 0.0050} = \\frac{2.0\\cdot 10^{-6}}{4.0\\cdot 10^{-6}} = 0.50\\ \\mathrm{T} $$\n\n**Answer:** The magnetic field is $0.50\\ \\mathrm{T}$.\n\n**General conclusion:** This is how a **magnetometer** (Hall effect sensor) works: it measures the Hall voltage and calculates $B$ from the relationship $B = U/(vd)$, where $v$ and $d$ are calibrated in the instrument."
   },
   {
    "level": 2,
    "question": "A Hall sensor is used to measure an unknown magnetic field. The internal drift velocity and width of the sensor are set so that $v\\cdot d = 1.0\\cdot 10^{-5}\\ \\mathrm{m^2/s}$. The sensor shows the Hall voltage $1.5\\ \\mathrm{\\mu V}$. Determine the flux density of the magnetic field.",
    "answer": {
     "value": 0.15,
     "unit": "T"
    },
    "solution": "$$ B = \\frac{U}{v\\cdot d} = \\frac{1.5\\cdot 10^{-6}}{1.0\\cdot 10^{-5}} = 0.15\\ \\mathrm{T} $$\n\n**Answer:** The magnetic field is $0.15\\ \\mathrm{T}$.\n\n**General conclusion:** The Hall effect is also used in very everyday situations: for example to measure the rotation rate of car and bicycle wheels, and in modern smartphones where a Hall sensor is used to know when the flap of a phone case is closed."
   },
   {
    "level": 2,
    "question": "In a Hall effect sensor there is equilibrium between the magnetic and the electric force on the electrons. Derive the formula for the Hall voltage starting from $F_m = qvB$ and $F_e = q\\mathbb{E}$ and $\\mathbb{E} = U/d$.",
    "choices": [
     "$U = vdB$",
     "$U = v/(dB)$",
     "$U = qvB/d$",
     "$U = q/(vdB)$"
    ],
    "correct": 0,
    "solution": "At equilibrium: $F_m = F_e$, so\n\n$$ qvB = q\\mathbb{E} \\quad\\Leftrightarrow\\quad vB = \\mathbb{E} $$\n\nWith $\\mathbb{E} = U/d$:\n\n$$ vB = \\frac{U}{d} \\quad\\Leftrightarrow\\quad U = v\\cdot d\\cdot B $$\n\n**Answer:** $U = v\\cdot d\\cdot B$.\n\n**General conclusion:** The derivation is a classic example of *two fundamental principles* being combined: force balance (equilibrium) + electrostatics ($\\mathbb{E} = U/d$ from Physics level 1). Seeing the common thread between the levels is a core skill at Physics level 2."
   },
   {
    "level": 3,
    "question": "A thin metal strip with the width $d = 10\\ \\mathrm{mm}$ and the cross-sectional area $A = 2.0\\cdot 10^{-7}\\ \\mathrm{m^2}$ carries the current $I = 5.0\\ \\mathrm{A}$ in a magnetic field $B = 0.80\\ \\mathrm{T}$ perpendicular to the current. The measured Hall voltage is $U = 8.0\\ \\mathrm{\\mu V}$. Determine the **drift velocity** of the electrons in the strip, and show that the answer is much lower than the thermal speed of the electrons (typically $10^5\\ \\mathrm{m/s}$ at room temperature).",
    "answer": {
     "value": 0.001,
     "unit": "m/s"
    },
    "solution": "**Step 1: the drift velocity from the Hall voltage.**\n\n$$ U = v\\cdot d\\cdot B \\quad\\Leftrightarrow\\quad v = \\frac{U}{d\\cdot B} = \\frac{8.0\\cdot 10^{-6}}{0.010 \\cdot 0.80} = \\frac{8.0\\cdot 10^{-6}}{8.0\\cdot 10^{-3}} = 1.0\\cdot 10^{-3}\\ \\mathrm{m/s} = 1.0\\ \\mathrm{mm/s} $$\n\n**Step 2: compare with the thermal speed.** The thermal speed at room temperature is about $10^5\\ \\mathrm{m/s}$. The drift velocity ($10^{-3}\\ \\mathrm{m/s}$) is only **a hundred-millionth** of the thermal speed!\n\n**Answer:** The drift velocity is about $1\\ \\mathrm{mm/s}$, extremely slow.\n\n**General conclusion:** This is one of the most counter-intuitive results in electrophysics: even when a large current flows, the average drift velocity of *individual electrons* is only a few mm/s. The current comes from the enormous *number* of electrons (of the order of $10^{28}$ per cubic metre), not from them moving fast. This also explains why the light in a room comes on *immediately* when the switch is pressed: it is not the motion of the electrons that \"travels\" quickly but **the electric field**, which is established at the speed of light in the conductor."
   }
  ]
 },
 "fy2-4.1": {
  "kalla": "85deb69bdf",
  "data": [
   {
    "level": 1,
    "question": "Green light has the wavelength $\\lambda = 550\\ \\mathrm{nm}$. Calculate the frequency of the light. Use $c = 2.998\\cdot 10^{8}\\ \\mathrm{m/s}$.",
    "answer": {
     "value": 545000000000000,
     "unit": "Hz"
    },
    "solution": "The relationship between frequency, the speed of light and wavelength:\n\n$$ f = \\frac{c}{\\lambda} $$\n\n$$\n\\left[ \\begin{array}{l}\nc = 2.998\\cdot 10^{8}\\ \\mathrm{m/s} \\\\\n\\lambda = 550\\ \\mathrm{nm} = 550\\cdot 10^{-9}\\ \\mathrm{m}\n\\end{array} \\right]\n$$\n\n$$ f = \\frac{2.998\\cdot 10^{8}}{550\\cdot 10^{-9}} = 5.45\\cdot 10^{14}\\ \\mathrm{Hz} $$\n\n**Answer:** The frequency is $5.45\\cdot 10^{14}\\ \\mathrm{Hz}$."
   },
   {
    "level": 1,
    "question": "A small lamp radiates the light power $P = 60\\ \\mathrm{W}$ evenly in all directions (point source). Calculate the light intensity at the distance $r = 2.0\\ \\mathrm{m}$ from the lamp.",
    "answer": {
     "value": 1.19,
     "unit": "W/m²"
    },
    "solution": "The light is spread over a sphere with the area $A = 4\\pi r^2$:\n\n$$ I = \\frac{P}{4\\pi r^2} = \\frac{60}{4\\pi \\cdot (2.0)^2} = \\frac{60}{50.27} = 1.19\\ \\mathrm{W/m^2} $$\n\n**Answer:** The light intensity is $1.2\\ \\mathrm{W/m^2}$."
   },
   {
    "level": 1,
    "question": "An FM radio transmitter broadcasts at the frequency $f = 100\\ \\mathrm{MHz}$. Calculate the wavelength of the radio waves.",
    "answer": {
     "value": 3,
     "unit": "m"
    },
    "solution": "Radio waves are electromagnetic waves and travel at the speed of light. Solve for the wavelength in $f = c/\\lambda$:\n\n$$ f = \\frac{c}{\\lambda} \\quad\\Leftrightarrow\\quad \\lambda = \\frac{c}{f} = \\frac{2.998\\cdot 10^{8}}{100\\cdot 10^{6}} = 3.0\\ \\mathrm{m} $$\n\n**Answer:** The wavelength is $3.0\\ \\mathrm{m}$."
   },
   {
    "level": 2,
    "question": "A point light source radiates evenly in all directions. At the distance $4.0\\ \\mathrm{m}$ the light intensity is $1.5\\ \\mathrm{W/m^2}$. Calculate the light intensity at the distance $12\\ \\mathrm{m}$.",
    "answer": {
     "value": 0.167,
     "unit": "W/m²"
    },
    "solution": "**Step 1: the power of the source.** From $I = P/(4\\pi r^2)$:\n\n$$ P = I_1 \\cdot 4\\pi r_1^2 = 1.5 \\cdot 4\\pi \\cdot (4.0)^2 = 302\\ \\mathrm{W} $$\n\n**Step 2: the intensity at the new distance.**\n\n$$ I_2 = \\frac{P}{4\\pi r_2^2} = \\frac{302}{4\\pi \\cdot (12)^2} = 0.167\\ \\mathrm{W/m^2} $$\n\n**Answer:** The light intensity is $0.17\\ \\mathrm{W/m^2}$.\n\n**General conclusion:** The distance was tripled $(4 \\to 12\\ \\mathrm{m})$ and the intensity became a ninth as large ($3^2 = 9$). The intensity decreases with the **square** of the distance: that is the whole meaning of the energy being spread over a sphere whose area grows as $r^2$."
   },
   {
    "level": 2,
    "question": "A radio transmitter radiates the power $P = 50\\ \\mathrm{kW}$ evenly in all directions. At what distance from the transmitter has the signal dropped to the intensity $1.0\\ \\mathrm{\\mu W/m^2}$?",
    "answer": {
     "value": 63,
     "unit": "km"
    },
    "solution": "Solve for the distance in the intensity formula:\n\n$$ I = \\frac{P}{4\\pi r^2} \\quad\\Leftrightarrow\\quad r = \\sqrt{\\frac{P}{4\\pi I}} $$\n\n$$\n\\left[ \\begin{array}{l}\nP = 50\\ \\mathrm{kW} = 5.0\\cdot 10^{4}\\ \\mathrm{W} \\\\\nI = 1.0\\ \\mathrm{\\mu W/m^2} = 1.0\\cdot 10^{-6}\\ \\mathrm{W/m^2}\n\\end{array} \\right]\n$$\n\n$$ r = \\sqrt{\\frac{5.0\\cdot 10^{4}}{4\\pi \\cdot 1.0\\cdot 10^{-6}}} = \\sqrt{3.98\\cdot 10^{9}} = 6.3\\cdot 10^{4}\\ \\mathrm{m} $$\n\n**Answer:** At about $63\\ \\mathrm{km}$."
   },
   {
    "level": 3,
    "question": "Two stars look **exactly equally bright** from the Earth. Star B is $3.0$ times as far away as star A. How many times greater is the radiated power of star B compared with that of star A?",
    "answer": {
     "value": 9,
     "unit": "times"
    },
    "solution": "**The insight:** \"equally bright from the Earth\" means that **the light intensity is equal** at the Earth, $I_\\mathrm{A} = I_\\mathrm{B}$, *not* that the powers are equal.\n\nThe intensity at the Earth is $I = P/(4\\pi r^2)$. Set them equal:\n\n$$ \\frac{P_\\mathrm{A}}{4\\pi r_\\mathrm{A}^2} = \\frac{P_\\mathrm{B}}{4\\pi r_\\mathrm{B}^2} $$\n\n$4\\pi$ cancels. Solve for the ratio between the powers:\n\n$$ \\frac{P_\\mathrm{B}}{P_\\mathrm{A}} = \\frac{r_\\mathrm{B}^2}{r_\\mathrm{A}^2} = \\left(\\frac{r_\\mathrm{B}}{r_\\mathrm{A}}\\right)^2 = 3.0^2 = 9 $$\n\n**Answer:** Star B radiates $9$ times as much power.\n\n**General conclusion:** The common unknown factor (the intensity, and $4\\pi$) cancels when the ratio is formed *before* substituting. Since the intensity decreases as $1/r^2$, a star that is $3\\times$ further away must shine $3^2 = 9\\times$ more strongly to look equally bright. This is how astronomers reason about *apparent* versus *absolute* brightness."
   }
  ]
 },
 "fy2-4.2": {
  "kalla": "78b5f68046",
  "data": [
   {
    "level": 1,
    "question": "A grating with 500 lines/mm is illuminated perpendicularly with monochromatic light with the wavelength $\\lambda = 600\\ \\mathrm{nm}$. Calculate the angle of diffraction to the first-order maximum $(n = 1)$.",
    "answer": {
     "value": 17.5,
     "unit": "°"
    },
    "solution": "The slit separation is $d = \\dfrac{1}{500}\\ \\mathrm{mm} = 2.0\\cdot 10^{-6}\\ \\mathrm{m}$. The grating formula, solved for the angle:\n\n$$ n\\lambda = d\\sin\\alpha_n \\quad\\Leftrightarrow\\quad \\sin\\alpha_n = \\frac{n\\lambda}{d} = \\frac{1 \\cdot 600\\cdot 10^{-9}}{2.0\\cdot 10^{-6}} = 0.300 $$\n\n$$ \\alpha_1 = \\sin^{-1}(0.300) = 17.5^\\circ $$\n\n**Answer:** The angle of diffraction is $17.5^\\circ$."
   },
   {
    "level": 1,
    "question": "A grating with 300 lines/mm is illuminated with a laser. The first-order maximum $(n = 1)$ lies at the angle $\\alpha_1 = 11.0^\\circ$. Calculate the wavelength of the laser light.",
    "answer": {
     "value": 636,
     "unit": "nm"
    },
    "solution": "Slit separation $d = \\dfrac{1}{300}\\ \\mathrm{mm} = 3.33\\cdot 10^{-6}\\ \\mathrm{m}$. Solve for the wavelength:\n\n$$ n\\lambda = d\\sin\\alpha_n \\quad\\Leftrightarrow\\quad \\lambda = \\frac{d\\sin\\alpha_n}{n} = \\frac{3.33\\cdot 10^{-6} \\cdot \\sin 11.0^\\circ}{1} = 6.36\\cdot 10^{-7}\\ \\mathrm{m} $$\n\n**Answer:** The wavelength is $636\\ \\mathrm{nm}$ (red light)."
   },
   {
    "level": 1,
    "question": "Monochromatic light with the wavelength $\\lambda = 500\\ \\mathrm{nm}$ gives the first-order maximum at $14.0^\\circ$ after a grating. Calculate the grating constant $d$ (the distance between two neighbouring slits).",
    "answer": {
     "value": 2.07,
     "unit": "µm"
    },
    "solution": "Solve for the slit separation in the grating formula:\n\n$$ n\\lambda = d\\sin\\alpha_n \\quad\\Leftrightarrow\\quad d = \\frac{n\\lambda}{\\sin\\alpha_n} = \\frac{1 \\cdot 500\\cdot 10^{-9}}{\\sin 14.0^\\circ} = 2.07\\cdot 10^{-6}\\ \\mathrm{m} $$\n\n**Answer:** The grating constant is $2.07\\ \\mathrm{\\mu m}$ (which corresponds to about $480$ lines/mm)."
   },
   {
    "level": 2,
    "question": "Monochromatic light falls on a grating with 200 lines/mm. On a screen, the first-order maximum lies $21\\ \\mathrm{cm}$ from the central maximum. The screen is $2.0\\ \\mathrm{m}$ behind the grating. Calculate the wavelength of the light.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 430.0 250.0\" style=\"max-width:430px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"300\" y1=\"58\" x2=\"300\" y2=\"205\" stroke=\"#0f1620\" stroke-width=\"3\"/><line x1=\"78\" y1=\"120\" x2=\"78\" y2=\"205\" stroke=\"#0f1620\" stroke-width=\"3\"/><line x1=\"78\" y1=\"139\" x2=\"78\" y2=\"141\" stroke=\"#fff\" stroke-width=\"3\"/><line x1=\"78\" y1=\"151\" x2=\"78\" y2=\"153\" stroke=\"#fff\" stroke-width=\"3\"/><line x1=\"78\" y1=\"163\" x2=\"78\" y2=\"165\" stroke=\"#fff\" stroke-width=\"3\"/><line x1=\"78\" y1=\"175\" x2=\"78\" y2=\"177\" stroke=\"#fff\" stroke-width=\"3\"/><line x1=\"78\" y1=\"187\" x2=\"78\" y2=\"189\" stroke=\"#fff\" stroke-width=\"3\"/><text x=\"78.0\" y=\"110.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">grating</text><text x=\"300.0\" y=\"48.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">screen</text><line x1=\"78\" y1=\"165\" x2=\"300\" y2=\"165\" stroke=\"#8a8579\" stroke-width=\"1.3\" stroke-dasharray=\"5 4\"/><line x1=\"78\" y1=\"165\" x2=\"300\" y2=\"73\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><circle cx=\"300\" cy=\"165\" r=\"3.5\" fill=\"#0f1620\"/><circle cx=\"300\" cy=\"73\" r=\"3.5\" fill=\"#c8324a\"/><text x=\"300.0\" y=\"224.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">central max</text><text x=\"292.0\" y=\"61.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#c8324a\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">1st max</text><path d=\"M 124.0 165.0 A 46 46 0 0 0 120.5 147.4\" stroke=\"#8a8579\" stroke-width=\"1.4\" fill=\"none\"/><text x=\"135.9\" y=\"153.5\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">α</text><line x1=\"78.0\" y1=\"199.0\" x2=\"300.0\" y2=\"199.0\" stroke=\"#8a8579\" stroke-width=\"1.3\"/><polygon points=\"78.0,199.0 83.4,196.4 83.4,201.6\" fill=\"#8a8579\"/><polygon points=\"300.0,199.0 294.6,201.6 294.6,196.4\" fill=\"#8a8579\"/><text x=\"189.0\" y=\"192.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">ℓ = 2.0 m</text><line x1=\"330.0\" y1=\"165.0\" x2=\"330.0\" y2=\"73.0\" stroke=\"#8a8579\" stroke-width=\"1.3\"/><polygon points=\"330.0,165.0 327.4,159.6 332.6,159.6\" fill=\"#8a8579\"/><polygon points=\"330.0,73.0 332.6,78.4 327.4,78.4\" fill=\"#8a8579\"/><text x=\"323.0\" y=\"119.0\" transform=\"rotate(-90 323.0 119.0)\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">x = 21 cm</text></svg>",
    "answer": {
     "value": 522,
     "unit": "nm"
    },
    "solution": "**Step 1: the angle of diffraction from the geometry.** The angle $\\alpha$ is found from the right-angled triangle (opposite leg $x$, adjacent leg $\\ell$):\n\n$$ \\tan\\alpha = \\frac{x}{\\ell} = \\frac{0.21}{2.0} = 0.105 \\quad\\Rightarrow\\quad \\alpha = 5.99^\\circ $$\n\n**Step 2: the wavelength from the grating formula.** Slit separation $d = \\dfrac{1}{200}\\ \\mathrm{mm} = 5.0\\cdot 10^{-6}\\ \\mathrm{m}$:\n\n$$ \\lambda = \\frac{d\\sin\\alpha}{n} = \\frac{5.0\\cdot 10^{-6} \\cdot \\sin 5.99^\\circ}{1} = 5.22\\cdot 10^{-7}\\ \\mathrm{m} $$\n\n**Answer:** The wavelength is $522\\ \\mathrm{nm}$ (green light).\n\n**General conclusion:** The angle of diffraction is not read off directly: it must first be found from the screen geometry $(\\tan\\alpha = x/\\ell)$ before the grating formula can be used. This is the standard method for measuring an unknown wavelength."
   },
   {
    "level": 2,
    "question": "A grating with 500 lines/mm is illuminated with a red HeNe laser, $\\lambda = 633\\ \\mathrm{nm}$. What is the **highest order** $(n)$ that can be observed at all?",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "Slit separation $d = \\dfrac{1}{500}\\ \\mathrm{mm} = 2.0\\cdot 10^{-6}\\ \\mathrm{m}$.\n\n**The insight:** a maximum can only exist if $\\sin\\alpha_n \\leq 1$. Set $\\sin\\alpha_n = 1$ (the limiting case $\\alpha = 90^\\circ$) in the grating formula:\n\n$$ n\\lambda = d\\sin\\alpha_n \\leq d \\quad\\Leftrightarrow\\quad n \\leq \\frac{d}{\\lambda} = \\frac{2.0\\cdot 10^{-6}}{633\\cdot 10^{-9}} = 3.16 $$\n\nSince $n$ must be an integer, the highest possible order is $n = 3$.\n\n**Answer:** The highest order is $n = 3$.\n\n**General conclusion:** You cannot get any number of maxima you like: the condition $\\sin\\alpha \\leq 1$ sets an upper limit. The fractional part $0.16$ is \"not enough\" for a fourth order, so it is discarded."
   },
   {
    "level": 3,
    "question": "In a grating spectrum, light of different wavelengths and orders can end up at **exactly the same place** (the same angle of diffraction). The second-order line for red light with $\\lambda = 660\\ \\mathrm{nm}$ coincides with a line of shorter wavelength in the third order. What is the wavelength of that light?",
    "answer": {
     "value": 440,
     "unit": "nm"
    },
    "solution": "**The insight:** \"the same place\" means **the same angle** $\\alpha$, and therefore the same $d\\sin\\alpha$. Since $d\\sin\\alpha = n\\lambda$ for every line, the product $n\\lambda$ must be the same for the two coinciding lines:\n\n$$ n_1 \\lambda_1 = n_2 \\lambda_2 $$\n\nHere $n_1 = 2$, $\\lambda_1 = 660\\ \\mathrm{nm}$ and $n_2 = 3$. Both $d$ and $\\sin\\alpha$ cancel:\n\n$$ \\lambda_2 = \\frac{n_1 \\lambda_1}{n_2} = \\frac{2 \\cdot 660}{3} = 440\\ \\mathrm{nm} $$\n\n**Answer:** The light has the wavelength $440\\ \\mathrm{nm}$ (blue/violet).\n\n**General conclusion:** You need to know neither $d$ nor $\\alpha$: they cancel in the ratio. This overlap between orders is a real problem in spectroscopy: high orders of short-wavelength light \"contaminate\" low orders of long-wavelength light and must be filtered out."
   }
  ]
 },
 "fy2-4.3": {
  "kalla": "5ca137adcb",
  "data": [
   {
    "level": 1,
    "question": "A filament has the temperature $T = 2\\,500\\ \\mathrm{K}$ and radiates as a black body. At what wavelength is the emittance greatest? Use Wien's constant $2.8978\\cdot 10^{-3}\\ \\mathrm{m\\cdot K}$.",
    "answer": {
     "value": 1159,
     "unit": "nm"
    },
    "solution": "Wien's displacement law, solved for the peak wavelength:\n\n$$ \\lambda_\\mathrm{max}\\cdot T = 2.8978\\cdot 10^{-3} \\quad\\Leftrightarrow\\quad \\lambda_\\mathrm{max} = \\frac{2.8978\\cdot 10^{-3}}{T} = \\frac{2.8978\\cdot 10^{-3}}{2\\,500} = 1.16\\cdot 10^{-6}\\ \\mathrm{m} $$\n\n**Answer:** The peak wavelength is about $1\\,160\\ \\mathrm{nm}$ (infrared, which is why an incandescent bulb feels warm)."
   },
   {
    "level": 1,
    "question": "A black body has the temperature $T = 1\\,000\\ \\mathrm{K}$. Calculate its emittance (radiated power per square metre). Use $\\sigma = 5.67\\cdot 10^{-8}\\ \\mathrm{W/(m^2\\cdot K^4)}$.",
    "answer": {
     "value": 56.7,
     "unit": "kW/m²"
    },
    "solution": "The Stefan–Boltzmann law:\n\n$$ M = \\sigma T^4 = 5.67\\cdot 10^{-8} \\cdot (1\\,000)^4 = 5.67\\cdot 10^{-8} \\cdot 10^{12} = 5.67\\cdot 10^{4}\\ \\mathrm{W/m^2} $$\n\n**Answer:** The emittance is $56.7\\ \\mathrm{kW/m^2}$."
   },
   {
    "level": 1,
    "question": "A black plate with the area $A = 0.020\\ \\mathrm{m^2}$ has the emittance $M = 460\\ \\mathrm{W/m^2}$. Calculate the total power radiated by the plate.",
    "answer": {
     "value": 9.2,
     "unit": "W"
    },
    "solution": "The emittance is the radiated power per area, $M = P/A$. Solve for the power:\n\n$$ P = M \\cdot A = 460 \\cdot 0.020 = 9.2\\ \\mathrm{W} $$\n\n**Answer:** The plate radiates $9.2\\ \\mathrm{W}$."
   },
   {
    "level": 2,
    "question": "A filament can be regarded as a black body with the temperature $T = 2\\,800\\ \\mathrm{K}$ and the total surface area $A = 8.0\\cdot 10^{-5}\\ \\mathrm{m^2}$. Calculate the power radiated by the filament.",
    "answer": {
     "value": 279,
     "unit": "W"
    },
    "solution": "**Step 1: the emittance from the Stefan–Boltzmann law.**\n\n$$ M = \\sigma T^4 = 5.67\\cdot 10^{-8} \\cdot (2\\,800)^4 = 3.49\\cdot 10^{6}\\ \\mathrm{W/m^2} $$\n\n**Step 2: total power.** $M = P/A$ gives\n\n$$ P = M \\cdot A = 3.49\\cdot 10^{6} \\cdot 8.0\\cdot 10^{-5} = 279\\ \\mathrm{W} $$\n\n**Answer:** The filament radiates about $280\\ \\mathrm{W}$.\n\n**General conclusion:** The Stefan–Boltzmann law gives power **per area**; for the total power you must multiply by the surface area. The fourth power makes the power extremely sensitive to temperature."
   },
   {
    "level": 2,
    "question": "A star has its maximum emittance at the wavelength $\\lambda_\\mathrm{max} = 480\\ \\mathrm{nm}$. Treat the star as a black body and calculate its emittance $M$.",
    "answer": {
     "value": 75300000,
     "unit": "W/m²",
     "tol": 0.04
    },
    "solution": "**Step 1: the surface temperature from Wien's law.**\n\n$$ T = \\frac{2.8978\\cdot 10^{-3}}{\\lambda_\\mathrm{max}} = \\frac{2.8978\\cdot 10^{-3}}{480\\cdot 10^{-9}} = 6\\,037\\ \\mathrm{K} $$\n\n**Step 2: the emittance from the Stefan–Boltzmann law.**\n\n$$ M = \\sigma T^4 = 5.67\\cdot 10^{-8} \\cdot (6\\,037)^4 = 7.53\\cdot 10^{7}\\ \\mathrm{W/m^2} $$\n\n**Answer:** The emittance is about $7.5\\cdot 10^{7}\\ \\mathrm{W/m^2}$.\n\n**General conclusion:** The peak wavelength gives the temperature (Wien), and the temperature gives the emittance (Stefan–Boltzmann). Two black-body laws in a chain: the colour of a star therefore reveals both how hot and how intense it is."
   },
   {
    "level": 3,
    "question": "Two black bodies have **the same surface area**. Body A has its peak wavelength at $600\\ \\mathrm{nm}$, body B at $400\\ \\mathrm{nm}$. How many times greater is the emittance of body B compared with body A?",
    "answer": {
     "value": 5.06,
     "unit": "times",
     "tol": 0.03
    },
    "solution": "**The insight:** combine Wien (the temperature) with Stefan–Boltzmann (the emittance) as *ratios*, so that the constants cancel.\n\n**The temperature ratio from Wien's law** $(\\lambda_\\mathrm{max} T = \\text{const})$: a shorter peak wavelength means a higher temperature:\n\n$$ \\frac{T_\\mathrm{B}}{T_\\mathrm{A}} = \\frac{\\lambda_\\mathrm{A}}{\\lambda_\\mathrm{B}} = \\frac{600}{400} = 1.5 $$\n\n**The emittance ratio from Stefan–Boltzmann** $(M = \\sigma T^4)$: $\\sigma$ cancels:\n\n$$ \\frac{M_\\mathrm{B}}{M_\\mathrm{A}} = \\left(\\frac{T_\\mathrm{B}}{T_\\mathrm{A}}\\right)^4 = 1.5^4 = 5.06 $$\n\n**Answer:** Body B radiates about $5.1$ times as much per square metre.\n\n**General conclusion:** Neither the temperatures nor $\\sigma$ need to be calculated: everything is done as ratios in which the unknown factors disappear. A bluer body (shorter $\\lambda_\\mathrm{max}$) is always both hotter *and* more intense, and the $T^4$ dependence strongly amplifies the difference."
   }
  ]
 },
 "fy2-4.4": {
  "kalla": "8ab3584cd1",
  "data": [
   {
    "level": 1,
    "question": "The refractive index of diamond is $n = 2.42$. Calculate the speed of light in diamond. Use $c = 2.998\\cdot 10^{8}\\ \\mathrm{m/s}$.",
    "answer": {
     "value": 124000000,
     "unit": "m/s"
    },
    "solution": "The refractive index $n = c/v$, solved for the speed in the material:\n\n$$ n = \\frac{c}{v} \\quad\\Leftrightarrow\\quad v = \\frac{c}{n} = \\frac{2.998\\cdot 10^{8}}{2.42} = 1.24\\cdot 10^{8}\\ \\mathrm{m/s} $$\n\n**Answer:** The speed of light in diamond is $1.24\\cdot 10^{8}\\ \\mathrm{m/s}$ (about $41\\,\\%$ of the speed in a vacuum)."
   },
   {
    "level": 1,
    "question": "A ray of light strikes a glass surface from air with the angle of incidence $i = 40^\\circ$. The refractive index of the glass is $n_2 = 1.52$ (air: $n_1 = 1.00$). Calculate the angle of refraction $b$.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 240\" style=\"display:block;margin:14px auto;max-width:360px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.15)\"/><rect x=\"0\" y=\"120\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.32)\"/><line x1=\"20\" y1=\"120\" x2=\"340\" y2=\"120\" stroke=\"#1a1d24\" stroke-width=\"2\"/><line x1=\"180\" y1=\"20\" x2=\"180\" y2=\"220\" stroke=\"#5a6172\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"186\" y=\"26\" font-size=\"11\" fill=\"#5a6172\">normal</text><line x1=\"115.7\" y1=\"43.4\" x2=\"180\" y2=\"120\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"151.1,85.5 142.5,82.3 149.4,76.5\" fill=\"#c8324a\"/><line x1=\"180\" y1=\"120\" x2=\"222.3\" y2=\"210.6\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"203.2,169.8 195.8,164.5 203.9,160.7\" fill=\"#c8324a\"/><path d=\"M 180 88 A 32 32 0 0 0 159.4 95.5\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"165.0\" y=\"82.7\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\">40°</text><path d=\"M 180 152 A 32 32 0 0 0 193.5 149.0\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"189.5\" y=\"167.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">b</tspan></text><text x=\"22\" y=\"110.0\" font-size=\"12\" fill=\"#3a4250\">Air</text><text x=\"22\" y=\"138.0\" font-size=\"12\" fill=\"#3a4250\">Glass</text></svg>",
    "answer": {
     "value": 25,
     "unit": "°"
    },
    "solution": "The law of refraction (Snell's law), solved for the angle of refraction:\n\n$$ n_1\\sin i = n_2\\sin b \\quad\\Leftrightarrow\\quad \\sin b = \\frac{n_1\\sin i}{n_2} = \\frac{1.00\\cdot\\sin 40^\\circ}{1.52} = 0.423 $$\n\n$$ b = \\sin^{-1}(0.423) = 25^\\circ $$\n\n**Answer:** The angle of refraction is $25^\\circ$. The ray is refracted **towards** the normal, since glass is optically denser than air."
   },
   {
    "level": 1,
    "question": "A ray of light travels from water $(n_1 = 1.33)$ up towards the surface into air $(n_2 = 1.00)$ with the angle of incidence $i = 30^\\circ$. Calculate the angle of refraction $b$ in the air.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 240\" style=\"display:block;margin:14px auto;max-width:360px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.15)\"/><rect x=\"0\" y=\"120\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.32)\"/><line x1=\"20\" y1=\"120\" x2=\"340\" y2=\"120\" stroke=\"#1a1d24\" stroke-width=\"2\"/><line x1=\"180\" y1=\"20\" x2=\"180\" y2=\"220\" stroke=\"#5a6172\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"186\" y=\"26\" font-size=\"11\" fill=\"#5a6172\">normal</text><line x1=\"130.0\" y1=\"33.4\" x2=\"180\" y2=\"120\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"157.5,81.0 149.6,76.4 157.4,71.9\" fill=\"#c8324a\"/><line x1=\"180\" y1=\"120\" x2=\"246.9\" y2=\"194.3\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"216.8,160.9 208.1,157.9 214.8,151.9\" fill=\"#c8324a\"/><path d=\"M 180 88 A 32 32 0 0 0 164.0 92.3\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"166.1\" y=\"72.3\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\">30°</text><path d=\"M 180 152 A 32 32 0 0 0 201.4 143.8\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"195.8\" y=\"165.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">b</tspan></text><text x=\"22\" y=\"110.0\" font-size=\"12\" fill=\"#3a4250\">Water</text><text x=\"22\" y=\"138.0\" font-size=\"12\" fill=\"#3a4250\">Air</text></svg>",
    "answer": {
     "value": 41.7,
     "unit": "°"
    },
    "solution": "Snell's law, solved for the angle of refraction:\n\n$$ \\sin b = \\frac{n_1\\sin i}{n_2} = \\frac{1.33\\cdot\\sin 30^\\circ}{1.00} = 1.33 \\cdot 0.500 = 0.665 $$\n\n$$ b = \\sin^{-1}(0.665) = 41.7^\\circ $$\n\n**Answer:** The angle of refraction is about $42^\\circ$. The ray is refracted **away from** the normal $(b > i)$, since it travels from an optically denser to an optically less dense medium."
   },
   {
    "level": 2,
    "question": "The speed of light in a glass is $v = 2.00\\cdot 10^{8}\\ \\mathrm{m/s}$. A ray strikes the glass from air with the angle of incidence $i = 55^\\circ$. Calculate the angle of refraction $b$ in the glass.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 240\" style=\"display:block;margin:14px auto;max-width:360px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.15)\"/><rect x=\"0\" y=\"120\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.32)\"/><line x1=\"20\" y1=\"120\" x2=\"340\" y2=\"120\" stroke=\"#1a1d24\" stroke-width=\"2\"/><line x1=\"180\" y1=\"20\" x2=\"180\" y2=\"220\" stroke=\"#5a6172\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"186\" y=\"26\" font-size=\"11\" fill=\"#5a6172\">normal</text><line x1=\"98.1\" y1=\"62.6\" x2=\"180\" y2=\"120\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"143.1,94.2 134.0,93.3 139.2,85.9\" fill=\"#c8324a\"/><line x1=\"180\" y1=\"120\" x2=\"234.5\" y2=\"203.9\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"210.0,166.1 201.8,161.9 209.4,157.0\" fill=\"#c8324a\"/><path d=\"M 180 88 A 32 32 0 0 0 153.8 101.6\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"159.7\" y=\"85.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\">55°</text><path d=\"M 180 152 A 32 32 0 0 0 197.4 146.8\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"192.5\" y=\"166.2\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\"><tspan font-style=\"italic\">b</tspan></text><text x=\"22\" y=\"110.0\" font-size=\"12\" fill=\"#3a4250\">Air</text><text x=\"22\" y=\"138.0\" font-size=\"12\" fill=\"#3a4250\">Glass</text></svg>",
    "answer": {
     "value": 33.1,
     "unit": "°"
    },
    "solution": "**Step 1: the refractive index of the glass.**\n\n$$ n_2 = \\frac{c}{v} = \\frac{2.998\\cdot 10^{8}}{2.00\\cdot 10^{8}} = 1.50 $$\n\n**Step 2: the angle of refraction from Snell's law** $(n_1 = 1.00)$:\n\n$$ \\sin b = \\frac{n_1\\sin i}{n_2} = \\frac{\\sin 55^\\circ}{1.50} = 0.546 \\quad\\Rightarrow\\quad b = 33.1^\\circ $$\n\n**Answer:** The angle of refraction is about $33^\\circ$.\n\n**General conclusion:** The refractive index is not given directly but must first be found from the speed of light $(n = c/v)$. Two formulas in a row."
   },
   {
    "level": 2,
    "question": "A ray of light travels from air $(n_1 = 1.00)$ down into a liquid with the angle of incidence $i = 50^\\circ$ and is refracted to the angle of refraction $b = 35^\\circ$. Calculate the speed of light in the liquid.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 240\" style=\"display:block;margin:14px auto;max-width:360px;width:100%;height:auto;background:#fafaf5;border:1px solid #d8d1bd;border-radius:4px;font-family:Poppins,sans-serif\"><rect x=\"0\" y=\"0\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.15)\"/><rect x=\"0\" y=\"120\" width=\"360\" height=\"120\" fill=\"rgba(135,180,210,0.32)\"/><line x1=\"20\" y1=\"120\" x2=\"340\" y2=\"120\" stroke=\"#1a1d24\" stroke-width=\"2\"/><line x1=\"180\" y1=\"20\" x2=\"180\" y2=\"220\" stroke=\"#5a6172\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"186\" y=\"26\" font-size=\"11\" fill=\"#5a6172\">normal</text><line x1=\"103.4\" y1=\"55.7\" x2=\"180\" y2=\"120\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"145.5,91.1 136.5,89.4 142.3,82.5\" fill=\"#c8324a\"/><line x1=\"180\" y1=\"120\" x2=\"237.4\" y2=\"201.9\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"211.5,165.1 203.3,161.1 210.6,155.9\" fill=\"#c8324a\"/><path d=\"M 180 88 A 32 32 0 0 0 155.5 99.4\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"161.4\" y=\"84.1\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\">50°</text><path d=\"M 180 152 A 32 32 0 0 0 198.4 146.2\" stroke=\"#1a1d24\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"193.2\" y=\"166.0\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1a1d24\">35°</text><text x=\"22\" y=\"110.0\" font-size=\"12\" fill=\"#3a4250\">Air</text><text x=\"22\" y=\"138.0\" font-size=\"12\" fill=\"#3a4250\">Liquid</text></svg>",
    "answer": {
     "value": 225000000,
     "unit": "m/s"
    },
    "solution": "**Step 1: the refractive index of the liquid from Snell's law.**\n\n$$ n_2 = \\frac{n_1\\sin i}{\\sin b} = \\frac{1.00\\cdot\\sin 50^\\circ}{\\sin 35^\\circ} = \\frac{0.766}{0.574} = 1.34 $$\n\n**Step 2: the speed of light in the liquid** $(n = c/v)$:\n\n$$ v = \\frac{c}{n_2} = \\frac{2.998\\cdot 10^{8}}{1.34} = 2.25\\cdot 10^{8}\\ \\mathrm{m/s} $$\n\n**Answer:** The speed of light in the liquid is about $2.25\\cdot 10^{8}\\ \\mathrm{m/s}$."
   },
   {
    "level": 3,
    "question": "A ray of light travels from air $(n = 1.00)$ through a layer of glass $(n = 1.52)$ and on down into water $(n = 1.33)$. The angle of incidence in the air is $i = 40^\\circ$. Determine the angle of refraction $b$ in the water, and explain why the refractive index of the glass does not affect the answer.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300.0 272.0\" style=\"max-width:300px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><rect x=\"0\" y=\"0\" width=\"300\" height=\"100\" fill=\"rgba(135,180,210,0.10)\"/><rect x=\"0\" y=\"100\" width=\"300\" height=\"82\" fill=\"rgba(135,180,210,0.26)\"/><rect x=\"0\" y=\"182\" width=\"300\" height=\"90\" fill=\"rgba(135,180,210,0.42)\"/><line x1=\"12\" y1=\"100\" x2=\"288\" y2=\"100\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><line x1=\"12\" y1=\"182\" x2=\"288\" y2=\"182\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"14.0\" y=\"24.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#3a4250\" text-anchor=\"start\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">Air</text><text x=\"14.0\" y=\"116.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#3a4250\" text-anchor=\"start\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">Glass</text><text x=\"14.0\" y=\"198.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#3a4250\" text-anchor=\"start\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">Water</text><line x1=\"142\" y1=\"66\" x2=\"142\" y2=\"134\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><line x1=\"180.3\" y1=\"152\" x2=\"180.3\" y2=\"220\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><line x1=\"86.7\" y1=\"34.1\" x2=\"142\" y2=\"100\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"117.1,70.4 108.5,67.1 115.4,61.3\" fill=\"#c8324a\"/><line x1=\"142\" y1=\"100\" x2=\"180.3\" y2=\"182\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><line x1=\"180.3\" y1=\"182\" x2=\"221.8\" y2=\"257.3\" stroke=\"#c8324a\" stroke-width=\"2.2\"/><polygon points=\"205.2,227.2 197.4,222.3 205.3,218.0\" fill=\"#c8324a\"/><path d=\"M 142 70 A 30 30 0 0 0 122.7 77.0\" stroke=\"#0f1620\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"127.6\" y=\"60.5\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">40°</text><path d=\"M 180.3 212 A 30 30 0 0 0 194.8 208.3\" stroke=\"#0f1620\" stroke-width=\"1.2\" fill=\"none\"/><text x=\"190.7\" y=\"222.7\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">b</tspan></text></svg>",
    "answer": {
     "value": 28.9,
     "unit": "°"
    },
    "solution": "**The insight:** apply Snell's law at *each* boundary and chain them together.\n\nAt air–glass: $\\;n_\\mathrm{air}\\sin i = n_\\mathrm{glass}\\sin b_\\mathrm{glass}$\n\nAt glass–water: $\\;n_\\mathrm{glass}\\sin b_\\mathrm{glass} = n_\\mathrm{water}\\sin b$\n\nThe middle product $n_\\mathrm{glass}\\sin b_\\mathrm{glass}$ is **common** to both equalities. It can therefore be eliminated completely:\n\n$$ n_\\mathrm{air}\\sin i = n_\\mathrm{water}\\sin b $$\n\nThe glass layer has disappeared from the equation! Solve for $b$:\n\n$$ \\sin b = \\frac{n_\\mathrm{air}\\sin i}{n_\\mathrm{water}} = \\frac{1.00\\cdot\\sin 40^\\circ}{1.33} = 0.483 \\quad\\Rightarrow\\quad b = 28.9^\\circ $$\n\n**Answer:** The angle of refraction in the water is about $28.9^\\circ$, exactly the same as if the glass had not been there.\n\n**General conclusion:** The final angle in the water depends only on the **first** and the **last** medium. An intermediate layer with parallel faces (whatever its refractive index) shifts the ray sideways but does not change its direction. Seeing through the fact that the middle layer cancels is the whole point."
   }
  ]
 },
 "fy2-4.5": {
  "kalla": "6fec31b747",
  "data": [
   {
    "level": 1,
    "question": "Calculate the energy of a photon with the wavelength $\\lambda = 500\\ \\mathrm{nm}$. Give the answer in electronvolts. Use $h = 6.626\\cdot 10^{-34}\\ \\mathrm{Js}$, $c = 2.998\\cdot 10^{8}\\ \\mathrm{m/s}$ and $1\\ \\mathrm{eV} = 1.602\\cdot 10^{-19}\\ \\mathrm{J}$.",
    "answer": {
     "value": 2.48,
     "unit": "eV"
    },
    "solution": "The energy of the photon:\n\n$$ E = \\frac{hc}{\\lambda} = \\frac{6.626\\cdot 10^{-34}\\cdot 2.998\\cdot 10^{8}}{500\\cdot 10^{-9}} = 3.97\\cdot 10^{-19}\\ \\mathrm{J} $$\n\nConvert to electronvolts:\n\n$$ E = \\frac{3.97\\cdot 10^{-19}}{1.602\\cdot 10^{-19}} = 2.48\\ \\mathrm{eV} $$\n\n**Answer:** The energy of the photon is $2.48\\ \\mathrm{eV}$."
   },
   {
    "level": 1,
    "question": "Calculate the momentum of a photon with the wavelength $\\lambda = 400\\ \\mathrm{nm}$.",
    "answer": {
     "value": 1.66e-27,
     "unit": "kg·m/s"
    },
    "solution": "The momentum of the photon:\n\n$$ p = \\frac{h}{\\lambda} = \\frac{6.626\\cdot 10^{-34}}{400\\cdot 10^{-9}} = 1.66\\cdot 10^{-27}\\ \\mathrm{kg\\cdot m/s} $$\n\n**Answer:** The momentum is $1.66\\cdot 10^{-27}\\ \\mathrm{kg\\cdot m/s}$. Even though the photon has no mass, it has momentum."
   },
   {
    "level": 1,
    "question": "A photon with the energy $4.0\\ \\mathrm{eV}$ strikes a metal surface whose work function is $W_\\mathrm{u} = 2.3\\ \\mathrm{eV}$. Calculate the kinetic energy of the electron that is knocked out.",
    "answer": {
     "value": 1.7,
     "unit": "eV"
    },
    "solution": "The photoelectric equation, solved for the kinetic energy of the electron:\n\n$$ hf = W_\\mathrm{u} + E_\\mathrm{k} \\quad\\Leftrightarrow\\quad E_\\mathrm{k} = hf - W_\\mathrm{u} = 4.0 - 2.3 = 1.7\\ \\mathrm{eV} $$\n\n**Answer:** The kinetic energy of the electron is $1.7\\ \\mathrm{eV}$."
   },
   {
    "level": 2,
    "question": "Light with the wavelength $\\lambda = 400\\ \\mathrm{nm}$ strikes a metal surface with the work function $W_\\mathrm{u} = 2.0\\ \\mathrm{eV}$. Calculate the speed of the ejected electron. The mass of the electron is $m = 9.11\\cdot 10^{-31}\\ \\mathrm{kg}$.",
    "answer": {
     "value": 622000,
     "unit": "m/s",
     "tol": 0.03
    },
    "solution": "**Step 1: the energy of the photon.**\n\n$$ E = \\frac{hc}{\\lambda} = \\frac{6.626\\cdot 10^{-34}\\cdot 2.998\\cdot 10^{8}}{400\\cdot 10^{-9}} = 4.97\\cdot 10^{-19}\\ \\mathrm{J} = 3.10\\ \\mathrm{eV} $$\n\n**Step 2: the kinetic energy of the electron.**\n\n$$ E_\\mathrm{k} = hf - W_\\mathrm{u} = 3.10 - 2.0 = 1.10\\ \\mathrm{eV} = 1.76\\cdot 10^{-19}\\ \\mathrm{J} $$\n\n**Step 3: the speed of the electron** from $E_\\mathrm{k} = \\dfrac{mv^2}{2}$:\n\n$$ v = \\sqrt{\\frac{2E_\\mathrm{k}}{m}} = \\sqrt{\\frac{2\\cdot 1.76\\cdot 10^{-19}}{9.11\\cdot 10^{-31}}} = 6.22\\cdot 10^{5}\\ \\mathrm{m/s} $$\n\n**Answer:** The speed of the electron is about $6.2\\cdot 10^{5}\\ \\mathrm{m/s}$.\n\n**General conclusion:** Three steps: the energy of the photon, the surplus energy after the work function, and finally the speed. Do not forget to convert eV to joules before using the kinetic energy formula."
   },
   {
    "level": 2,
    "question": "A metal has the work function $W_\\mathrm{u} = 2.3\\ \\mathrm{eV}$. What is the **longest** wavelength (the threshold wavelength) that can just knock electrons out of the metal?",
    "answer": {
     "value": 539,
     "unit": "nm"
    },
    "solution": "**The insight:** at the threshold wavelength the kinetic energy of the electron is exactly zero $(E_\\mathrm{k} = 0)$: the photon then has exactly enough energy to free the electron, nothing more. Then $hf = W_\\mathrm{u}$, so:\n\n$$ \\frac{hc}{\\lambda} = W_\\mathrm{u} \\quad\\Leftrightarrow\\quad \\lambda = \\frac{hc}{W_\\mathrm{u}} $$\n\n$$\n\\left[ \\begin{array}{l}\nhc = 6.626\\cdot 10^{-34}\\cdot 2.998\\cdot 10^{8} = 1.986\\cdot 10^{-25}\\ \\mathrm{Jm} \\\\\nW_\\mathrm{u} = 2.3\\ \\mathrm{eV} = 2.3\\cdot 1.602\\cdot 10^{-19} = 3.68\\cdot 10^{-19}\\ \\mathrm{J}\n\\end{array} \\right]\n$$\n\n$$ \\lambda = \\frac{1.986\\cdot 10^{-25}}{3.68\\cdot 10^{-19}} = 5.39\\cdot 10^{-7}\\ \\mathrm{m} $$\n\n**Answer:** The threshold wavelength is $539\\ \\mathrm{nm}$. Light with a *longer* wavelength (lower energy) cannot knock out any electrons, however bright it is."
   },
   {
    "level": 3,
    "question": "In an experiment the same metal is illuminated with two different wavelengths. With $\\lambda_1 = 400\\ \\mathrm{nm}$ the ejected electrons get the kinetic energy $1.10\\ \\mathrm{eV}$, and with $\\lambda_2 = 300\\ \\mathrm{nm}$ the kinetic energy is $2.13\\ \\mathrm{eV}$. Determine **Planck's constant** from these measurements alone.",
    "answer": {
     "value": 6.6e-34,
     "unit": "Js",
     "tol": 0.04
    },
    "solution": "**The insight:** set up the photoelectric equation for *both* measurements and **eliminate the unknown work function** by subtracting them.\n\n$$ hf_1 = W_\\mathrm{u} + E_{\\mathrm{k},1} \\qquad hf_2 = W_\\mathrm{u} + E_{\\mathrm{k},2} $$\n\nSubtraction cancels $W_\\mathrm{u}$:\n\n$$ h(f_2 - f_1) = E_{\\mathrm{k},2} - E_{\\mathrm{k},1} \\quad\\Leftrightarrow\\quad h = \\frac{E_{\\mathrm{k},2} - E_{\\mathrm{k},1}}{f_2 - f_1} $$\n\nThe frequencies $(f = c/\\lambda)$:\n\n$$ f_1 = \\frac{2.998\\cdot 10^{8}}{400\\cdot 10^{-9}} = 7.50\\cdot 10^{14}\\ \\mathrm{Hz}, \\qquad f_2 = \\frac{2.998\\cdot 10^{8}}{300\\cdot 10^{-9}} = 9.99\\cdot 10^{14}\\ \\mathrm{Hz} $$\n\nThe energy difference $(2.13 - 1.10 = 1.03\\ \\mathrm{eV} = 1.65\\cdot 10^{-19}\\ \\mathrm{J})$:\n\n$$ h = \\frac{1.65\\cdot 10^{-19}}{(9.99 - 7.50)\\cdot 10^{14}} = \\frac{1.65\\cdot 10^{-19}}{2.50\\cdot 10^{14}} = 6.6\\cdot 10^{-34}\\ \\mathrm{Js} $$\n\n**Answer:** Planck's constant comes out as about $6.6\\cdot 10^{-34}\\ \\mathrm{Js}$, close to the table value $6.626\\cdot 10^{-34}\\ \\mathrm{Js}$.\n\n**General conclusion:** By measuring at two wavelengths you do not need to know the work function: it cancels in the difference. The slope of a graph of $E_\\mathrm{k}$ against $f$ *is* Planck's constant; this is exactly how Millikan confirmed Einstein's theory. (The work function is then found from one of the equations: $W_\\mathrm{u} = hf_1 - E_{\\mathrm{k},1} = 2.0\\ \\mathrm{eV}$.)"
   }
  ]
 },
 "fy2-4.6": {
  "kalla": "e3f52ce4b6",
  "data": [
   {
    "level": 1,
    "question": "Calculate the de Broglie wavelength of an electron moving with the speed $v = 1.0\\cdot 10^{6}\\ \\mathrm{m/s}$. The mass of the electron is $m = 9.11\\cdot 10^{-31}\\ \\mathrm{kg}$, and $h = 6.626\\cdot 10^{-34}\\ \\mathrm{Js}$.",
    "answer": {
     "value": 727,
     "unit": "pm"
    },
    "solution": "The de Broglie wavelength:\n\n$$ \\lambda = \\frac{h}{mv} = \\frac{6.626\\cdot 10^{-34}}{9.11\\cdot 10^{-31}\\cdot 1.0\\cdot 10^{6}} = 7.27\\cdot 10^{-10}\\ \\mathrm{m} $$\n\n**Answer:** The de Broglie wavelength is $7.27\\cdot 10^{-10}\\ \\mathrm{m} = 727\\ \\mathrm{pm}$ (of the same order of magnitude as the distances between atoms, which is why the wave nature of the electron is noticeable)."
   },
   {
    "level": 1,
    "question": "A ball with the mass $m = 0.10\\ \\mathrm{kg}$ is thrown with the speed $v = 20\\ \\mathrm{m/s}$. Calculate the de Broglie wavelength of the ball.",
    "answer": {
     "value": 3.31e-34,
     "unit": "m",
     "tol": 0.03
    },
    "solution": "The de Broglie wavelength applies to *all* objects, even macroscopic ones:\n\n$$ \\lambda = \\frac{h}{mv} = \\frac{6.626\\cdot 10^{-34}}{0.10\\cdot 20} = 3.31\\cdot 10^{-34}\\ \\mathrm{m} $$\n\n**Answer:** The de Broglie wavelength of the ball is $3.3\\cdot 10^{-34}\\ \\mathrm{m}$, inconceivably much smaller than the ball itself (and than an atomic nucleus). This is why the ball shows **no** measurable wave properties, and classical mechanics applies."
   },
   {
    "level": 1,
    "question": "A neutron has the de Broglie wavelength $\\lambda = 0.10\\ \\mathrm{nm}$. Calculate the speed of the neutron. The mass of the neutron is $m = 1.675\\cdot 10^{-27}\\ \\mathrm{kg}$.",
    "answer": {
     "value": 3960,
     "unit": "m/s"
    },
    "solution": "Solve for the speed in the de Broglie formula:\n\n$$ \\lambda = \\frac{h}{mv} \\quad\\Leftrightarrow\\quad v = \\frac{h}{m\\lambda} = \\frac{6.626\\cdot 10^{-34}}{1.675\\cdot 10^{-27}\\cdot 0.10\\cdot 10^{-9}} = 3.96\\cdot 10^{3}\\ \\mathrm{m/s} $$\n\n**Answer:** The speed of the neutron is about $3\\,960\\ \\mathrm{m/s}$. Slow (\"thermal\") neutrons are used precisely because their wavelength matches the distances between atoms in crystals."
   },
   {
    "level": 2,
    "question": "An electron is accelerated from rest through the voltage $U = 100\\ \\mathrm{V}$. Calculate the de Broglie wavelength of the electron. Use $m = 9.11\\cdot 10^{-31}\\ \\mathrm{kg}$ and $Q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 123,
     "unit": "pm"
    },
    "solution": "**Step 1: the speed of the electron** from the energy conversion electrical energy $\\to$ kinetic energy $(QU = \\dfrac{mv^2}{2})$:\n\n$$ v = \\sqrt{\\frac{2QU}{m}} = \\sqrt{\\frac{2\\cdot 1.602\\cdot 10^{-19}\\cdot 100}{9.11\\cdot 10^{-31}}} = 5.93\\cdot 10^{6}\\ \\mathrm{m/s} $$\n\n**Step 2: the de Broglie wavelength.**\n\n$$ \\lambda = \\frac{h}{mv} = \\frac{6.626\\cdot 10^{-34}}{9.11\\cdot 10^{-31}\\cdot 5.93\\cdot 10^{6}} = 1.23\\cdot 10^{-10}\\ \\mathrm{m} $$\n\n**Answer:** The de Broglie wavelength is about $123\\ \\mathrm{pm}$.\n\n**General conclusion:** The voltage gives the speed (energy conversion), and the speed gives the wavelength (de Broglie). This is how an electron microscope works: a higher voltage gives a shorter wavelength and therefore better resolution."
   },
   {
    "level": 2,
    "question": "A proton is accelerated from rest through the voltage $U = 1.0\\ \\mathrm{kV}$. Calculate the de Broglie wavelength of the proton. The mass of the proton is $m = 1.673\\cdot 10^{-27}\\ \\mathrm{kg}$ and its charge $Q = 1.602\\cdot 10^{-19}\\ \\mathrm{C}$.",
    "answer": {
     "value": 0.905,
     "unit": "pm",
     "tol": 0.03
    },
    "solution": "**Step 1: the speed of the proton** from $QU = \\dfrac{mv^2}{2}$:\n\n$$ v = \\sqrt{\\frac{2QU}{m}} = \\sqrt{\\frac{2\\cdot 1.602\\cdot 10^{-19}\\cdot 1\\,000}{1.673\\cdot 10^{-27}}} = 4.38\\cdot 10^{5}\\ \\mathrm{m/s} $$\n\n**Step 2: the de Broglie wavelength.**\n\n$$ \\lambda = \\frac{h}{mv} = \\frac{6.626\\cdot 10^{-34}}{1.673\\cdot 10^{-27}\\cdot 4.38\\cdot 10^{5}} = 9.05\\cdot 10^{-13}\\ \\mathrm{m} $$\n\n**Answer:** The de Broglie wavelength of the proton is about $0.905\\ \\mathrm{pm}$, much shorter than that of the electron at the same voltage, since the proton is so much heavier."
   },
   {
    "level": 3,
    "question": "An electron and a proton are both accelerated from rest through **the same** voltage $U$. Show that the de Broglie wavelength can be written $\\lambda = \\dfrac{h}{\\sqrt{2mQU}}$, and determine how many times longer the wavelength of the electron is than that of the proton. Use $m_\\mathrm{p}/m_\\mathrm{e} = 1\\,836$.",
    "answer": {
     "value": 42.85,
     "unit": "times",
     "tol": 0.03
    },
    "solution": "**Derivation.** The speed from the energy conversion $(QU = \\dfrac{mv^2}{2})$ is $v = \\sqrt{2QU/m}$. Substitute into $\\lambda = h/(mv)$:\n\n$$ \\lambda = \\frac{h}{m\\sqrt{\\dfrac{2QU}{m}}} = \\frac{h}{\\sqrt{m^2\\cdot \\dfrac{2QU}{m}}} = \\frac{h}{\\sqrt{2mQU}} \\quad\\text{Q.E.D.} $$\n\n**The insight:** the electron and the proton have the same magnitude of charge $Q$ and the same $U$, so these cancel in the ratio. All that remains is the mass dependence $\\lambda \\propto 1/\\sqrt{m}$:\n\n$$ \\frac{\\lambda_\\mathrm{e}}{\\lambda_\\mathrm{p}} = \\sqrt{\\frac{m_\\mathrm{p}}{m_\\mathrm{e}}} = \\sqrt{1\\,836} = 42.85 $$\n\n**Answer:** The de Broglie wavelength of the electron is about $43$ times longer than that of the proton.\n\n**General conclusion:** Everything except the mass ratio cancels. The lighter particle always gets the longer wavelength at the same accelerating voltage: a pure ratio argument in which $h$, $Q$ and $U$ never need to be substituted."
   }
  ]
 },
 "fy2-4.7": {
  "kalla": "9e11937536",
  "data": [
   {
    "level": 1,
    "question": "Which of the following light sources gives a **continuous spectrum** (all wavelengths)?",
    "choices": [
     "A neon tube.",
     "An incandescent bulb with a filament.",
     "A sodium lamp (street lighting).",
     "A hydrogen discharge tube."
    ],
    "correct": 1,
    "solution": "A filament that is heated emits **all** wavelengths: a continuous spectrum that we perceive as white. The others are rarefied atomic gases that emit only **certain** well-defined wavelengths (discrete spectrum / line spectrum).\n\n**Answer:** An incandescent bulb with a filament."
   },
   {
    "level": 1,
    "question": "What characterises an **emission spectrum** (line spectrum) from an atomic gas?",
    "choices": [
     "All wavelengths are emitted equally strongly.",
     "No wavelengths at all are emitted.",
     "Only certain well-defined wavelengths are emitted.",
     "Only a single wavelength can ever be emitted."
    ],
    "correct": 2,
    "solution": "The light from individual atoms arises when electrons jump between definite energy levels. Only the wavelengths corresponding to these jumps are emitted, so the spectrum consists of separate **lines** against a dark background: not a single line (a gas has several possible jumps) and not all colours.\n\n**Answer:** Only certain well-defined wavelengths are emitted."
   },
   {
    "level": 1,
    "question": "How does an **absorption spectrum** show that a gas has absorbed light of certain wavelengths?",
    "choices": [
     "As extra bright coloured lines against a black background.",
     "As a general strengthening of all colours.",
     "As dark (black) lines in an otherwise continuous band of colour.",
     "The whole spectrum becomes completely black."
    ],
    "correct": 2,
    "solution": "When white light passes through a gas, the gas absorbs exactly the wavelengths it would otherwise emit. These are then missing from the transmitted light and appear as **dark lines** in the continuous spectrum.\n\n**Answer:** As dark (black) lines in an otherwise continuous band of colour."
   },
   {
    "level": 2,
    "question": "In the spectrum of sunlight there are dark lines at **exactly the same wavelengths** as hydrogen emits in its emission spectrum. Which conclusion is correct?",
    "choices": [
     "The Sun has no hydrogen at all.",
     "The hydrogen in the Sun is colder than $0\\ \\mathrm{K}$.",
     "Sunlight contains no red light.",
     "There is hydrogen in the Sun's (outer) atmosphere."
    ],
    "correct": 3,
    "solution": "Atoms absorb the same wavelengths as they emit. The dark lines mean that hydrogen in the Sun's cooler outer atmosphere has absorbed exactly these wavelengths from the continuous light from the hot surface. Spectral lines work as a **fingerprint** for elements.\n\n**Answer:** There is hydrogen in the Sun's atmosphere."
   },
   {
    "level": 2,
    "question": "Why can an atom **only absorb** light with the same wavelengths as it can emit itself?",
    "choices": [
     "The atom in fact absorbs all radiation but happens to emit only certain colours.",
     "A photon is only absorbed if its energy exactly corresponds to the difference between two of the atom's energy levels: the same jump that gives emission.",
     "Absorption and emission are completely independent phenomena with no connection.",
     "The atom can absorb any wavelength but only emits the strongest ones."
    ],
    "correct": 1,
    "solution": "The energy levels in the atom are fixed. An electron can only be raised (excited) if the energy $hf$ of the photon **exactly** matches an allowed energy jump $E_n - E_m$. Exactly the same jump, taken in reverse, gives emission of the same wavelength: that is why the absorption and emission lines coincide.\n\n**Answer:** A photon is only absorbed if its energy exactly corresponds to an energy jump in the atom."
   },
   {
    "level": 3,
    "question": "Hydrogen gas is illuminated and the light is sent through a grating with 600 lines/mm. One of the spectral lines of hydrogen gives the first-order maximum at the angle $23.2^\\circ$. Calculate the wavelength of the line and decide which **series** (Lyman, Balmer or Paschen) the transition belongs to.",
    "answer": {
     "value": 657,
     "unit": "nm"
    },
    "solution": "**Step 1: the wavelength from the grating formula.** Slit separation $d = \\dfrac{1}{600}\\ \\mathrm{mm} = 1.667\\cdot 10^{-6}\\ \\mathrm{m}$:\n\n$$ \\lambda = \\frac{d\\sin\\alpha_1}{n} = \\frac{1.667\\cdot 10^{-6}\\cdot\\sin 23.2^\\circ}{1} = 6.57\\cdot 10^{-7}\\ \\mathrm{m} $$\n\n**Step 2: which series?** The wavelength $657\\ \\mathrm{nm}$ lies in the **visible** (red) region. Spectral lines in visible light from hydrogen belong to the **Balmer series** (transitions ending at $n = 2$). This is the famous red $\\mathrm{H}_\\alpha$ line (the transition $n = 3 \\to n = 2$).\n\n**Answer:** The wavelength is about $657\\ \\mathrm{nm}$ and the line belongs to the **Balmer series**.\n\n**General conclusion:** The grating translates an angle of diffraction into a wavelength, and the wavelength reveals both the element and which electron transition (series) gave rise to the light. This is how spectroscopy works in practice: from angle to atomic structure."
   }
  ]
 },
 "fy2-4.8": {
  "kalla": "bb180314da",
  "data": [
   {
    "level": 1,
    "question": "The energy levels of the hydrogen atom are given by $E_n = -\\dfrac{13.6}{n^2}\\ \\mathrm{eV}$. Calculate the energy at level $n = 4$.",
    "answer": {
     "value": -0.85,
     "unit": "eV"
    },
    "solution": "Substitute $n = 4$:\n\n$$ E_4 = -\\frac{13.6}{4^2} = -\\frac{13.6}{16} = -0.85\\ \\mathrm{eV} $$\n\n**Answer:** $E_4 = -0.85\\ \\mathrm{eV}$. The negative value means that the electron is **bound** to the nucleus (the ionisation limit is chosen as $0\\ \\mathrm{eV}$)."
   },
   {
    "level": 1,
    "question": "An electron in a hydrogen atom falls from level $n = 3\\ (E_3 = -1.51\\ \\mathrm{eV})$ to level $n = 2\\ (E_2 = -3.40\\ \\mathrm{eV})$. Calculate the energy of the emitted photon.",
    "answer": {
     "value": 1.89,
     "unit": "eV"
    },
    "solution": "The energy of the photon is the difference between the two levels:\n\n$$ hf = E_3 - E_2 = (-1.51) - (-3.40) = 1.89\\ \\mathrm{eV} $$\n\n**Answer:** The energy of the photon is $1.89\\ \\mathrm{eV}$."
   },
   {
    "level": 1,
    "question": "How much energy is needed to ionise a hydrogen atom in the state $n = 2\\ (E_2 = -3.40\\ \\mathrm{eV})$? (The ionisation limit is at $E = 0$.)",
    "answer": {
     "value": 3.4,
     "unit": "eV"
    },
    "solution": "Ionisation means that the electron is raised all the way up to $E = 0$:\n\n$$ \\Delta E = E_\\infty - E_2 = 0 - (-3.40) = 3.40\\ \\mathrm{eV} $$\n\n**Answer:** $3.40\\ \\mathrm{eV}$ is needed. (From the ground state $n = 1$, on the other hand, a full $13.6\\ \\mathrm{eV}$ would be needed.)"
   },
   {
    "level": 2,
    "question": "A hydrogen atom is de-excited from $n = 4$ to $n = 2$. Calculate the wavelength of the emitted light and state its colour.\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 378.0 300.0\" style=\"max-width:378px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"64.0\" y1=\"274.0\" x2=\"64.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><polygon points=\"64.0,26.0 67.9,34.1 60.1,34.1\" fill=\"#0f1620\"/><text x=\"60.0\" y=\"18.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"start\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">E</tspan> (eV)</text><line x1=\"64\" y1=\"50.0\" x2=\"300\" y2=\"50.0\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"192.0\" y=\"41.0\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">ionisation limit (0 eV)</text><line x1=\"204.0\" y1=\"105.0\" x2=\"204.0\" y2=\"163.0\" stroke=\"#c8324a\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><polygon points=\"204.0,163.0 200.1,154.9 207.9,154.9\" fill=\"#c8324a\"/><line x1=\"64\" y1=\"274.0\" x2=\"300\" y2=\"274.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"274.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 1</text><text x=\"306.0\" y=\"274.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−13.60 eV</text><line x1=\"64\" y1=\"162.0\" x2=\"300\" y2=\"162.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"162.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 2</text><text x=\"306.0\" y=\"162.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−3.40 eV</text><line x1=\"64\" y1=\"124.7\" x2=\"300\" y2=\"124.7\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"124.7\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 3</text><text x=\"306.0\" y=\"124.7\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−1.51 eV</text><line x1=\"64\" y1=\"106.0\" x2=\"300\" y2=\"106.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"106.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 4</text><text x=\"306.0\" y=\"106.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−0.85 eV</text></svg>",
    "answer": {
     "value": 486,
     "unit": "nm"
    },
    "solution": "**Step 1: the energy of the photon** (read off the levels in the diagram):\n\n$$ E = E_4 - E_2 = (-0.85) - (-3.40) = 2.55\\ \\mathrm{eV} = 2.55\\cdot 1.602\\cdot 10^{-19} = 4.09\\cdot 10^{-19}\\ \\mathrm{J} $$\n\n**Step 2: the wavelength** from $E = hc/\\lambda$:\n\n$$ \\lambda = \\frac{hc}{E} = \\frac{6.626\\cdot 10^{-34}\\cdot 2.998\\cdot 10^{8}}{4.09\\cdot 10^{-19}} = 4.86\\cdot 10^{-7}\\ \\mathrm{m} $$\n\n**Answer:** The wavelength is $486\\ \\mathrm{nm}$: **blue-green** light. (This is the $\\mathrm{H}_\\beta$ line in the Balmer series.)\n\n**General conclusion:** The difference between the levels gives the energy of the photon, and the energy gives the wavelength. Do not forget to convert eV to joules before using $E = hc/\\lambda$."
   },
   {
    "level": 2,
    "question": "A hydrogen atom emits ultraviolet light with the wavelength $\\lambda = 102.6\\ \\mathrm{nm}$. Use the energy levels below and decide **between which levels** the transition took place. (Answer with the $n$ of the upper level.)\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 378.0 300.0\" style=\"max-width:378px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"64.0\" y1=\"274.0\" x2=\"64.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><polygon points=\"64.0,26.0 67.9,34.1 60.1,34.1\" fill=\"#0f1620\"/><text x=\"60.0\" y=\"18.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"start\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">E</tspan> (eV)</text><line x1=\"64\" y1=\"50.0\" x2=\"300\" y2=\"50.0\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"192.0\" y=\"41.0\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">ionisation limit (0 eV)</text><line x1=\"64\" y1=\"274.0\" x2=\"300\" y2=\"274.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"274.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 1</text><text x=\"306.0\" y=\"274.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−13.60 eV</text><line x1=\"64\" y1=\"162.0\" x2=\"300\" y2=\"162.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"162.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 2</text><text x=\"306.0\" y=\"162.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−3.40 eV</text><line x1=\"64\" y1=\"124.7\" x2=\"300\" y2=\"124.7\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"124.7\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 3</text><text x=\"306.0\" y=\"124.7\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−1.51 eV</text><line x1=\"64\" y1=\"106.0\" x2=\"300\" y2=\"106.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"106.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 4</text><text x=\"306.0\" y=\"106.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−0.85 eV</text></svg>",
    "answer": {
     "value": 3,
     "unit": ""
    },
    "solution": "**Step 1: the energy of the photon.**\n\n$$ E = \\frac{hc}{\\lambda} = \\frac{6.626\\cdot 10^{-34}\\cdot 2.998\\cdot 10^{8}}{102.6\\cdot 10^{-9}} = 1.936\\cdot 10^{-18}\\ \\mathrm{J} = 12.09\\ \\mathrm{eV} $$\n\n**Step 2: match against the levels.** Which jump gives $12.09\\ \\mathrm{eV}$? Since it is high-energy UV light, it must end in the ground state $(n = 1,\\ E_1 = -13.6\\ \\mathrm{eV})$. Try $n = 3 \\to n = 1$:\n\n$$ E_3 - E_1 = (-1.51) - (-13.6) = 12.09\\ \\mathrm{eV} \\;\\checkmark $$\n\n**Answer:** The transition took place from $n = 3$ to $n = 1$ (a line in the Lyman series).\n\n**General conclusion:** You work backwards: the energy of the photon is compared with the differences between levels until it matches. UV lines from hydrogen belong to the Lyman series (ending at $n = 1$); visible lines belong to the Balmer series (ending at $n = 2$)."
   },
   {
    "level": 3,
    "question": "A hydrogen atom is excited to $n = 4$. When it is de-excited it can take different \"routes\" down. How many **different wavelengths** can the atom emit in total, and which is the **shortest** of them?\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 378.0 300.0\" style=\"max-width:378px;width:100%;height:auto;display:block;margin:16px auto;background:#fff;border:1px solid rgba(15,22,32,0.12);border-radius:6px;font-family:Poppins,sans-serif\"><line x1=\"64.0\" y1=\"274.0\" x2=\"64.0\" y2=\"26.0\" stroke=\"#0f1620\" stroke-width=\"1.8\" stroke-linecap=\"round\"/><polygon points=\"64.0,26.0 67.9,34.1 60.1,34.1\" fill=\"#0f1620\"/><text x=\"60.0\" y=\"18.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"start\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">E</tspan> (eV)</text><line x1=\"64\" y1=\"50.0\" x2=\"300\" y2=\"50.0\" stroke=\"#8a8579\" stroke-width=\"1.2\" stroke-dasharray=\"5 4\"/><text x=\"192.0\" y=\"41.0\" font-family=\"Poppins,sans-serif\" font-size=\"11\" fill=\"#8a8579\" text-anchor=\"middle\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\">ionisation limit (0 eV)</text><line x1=\"64\" y1=\"274.0\" x2=\"300\" y2=\"274.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"274.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 1</text><text x=\"306.0\" y=\"274.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−13.60 eV</text><line x1=\"64\" y1=\"162.0\" x2=\"300\" y2=\"162.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"162.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 2</text><text x=\"306.0\" y=\"162.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−3.40 eV</text><line x1=\"64\" y1=\"124.7\" x2=\"300\" y2=\"124.7\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"124.7\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 3</text><text x=\"306.0\" y=\"124.7\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−1.51 eV</text><line x1=\"64\" y1=\"106.0\" x2=\"300\" y2=\"106.0\" stroke=\"#0f1620\" stroke-width=\"1.8\"/><text x=\"52.0\" y=\"106.0\" font-family=\"Poppins,sans-serif\" font-size=\"13\" fill=\"#0f1620\" text-anchor=\"end\" dominant-baseline=\"middle\" stroke=\"#fff\" stroke-width=\"3\" stroke-linejoin=\"round\" paint-order=\"stroke\"><tspan font-style=\"italic\">n</tspan> = 4</text><text x=\"306.0\" y=\"106.0\" font-family=\"Poppins,sans-serif\" font-size=\"12\" fill=\"#8a8579\" text-anchor=\"start\" dominant-baseline=\"middle\">−0.85 eV</text></svg>",
    "answer": {
     "value": 97,
     "unit": "nm"
    },
    "solution": "**The insight:** the electron can fall to any lower level, even in several steps. Every *pair* of levels gives its own wavelength. Count all the possible downward jumps from $n = 4$:\n\n$$ 4\\to3,\\quad 4\\to2,\\quad 4\\to1,\\quad 3\\to2,\\quad 3\\to1,\\quad 2\\to1 $$\n\nThat makes **6 different wavelengths**.\n\n**The shortest wavelength** corresponds to the **largest energy jump** $(\\lambda = hc/E$, so the largest $E$ gives the smallest $\\lambda)$. The largest jump is $4 \\to 1$:\n\n$$ E = E_4 - E_1 = (-0.85) - (-13.6) = 12.75\\ \\mathrm{eV} = 2.043\\cdot 10^{-18}\\ \\mathrm{J} $$\n\n$$ \\lambda = \\frac{hc}{E} = \\frac{6.626\\cdot 10^{-34}\\cdot 2.998\\cdot 10^{8}}{2.043\\cdot 10^{-18}} = 9.7\\cdot 10^{-8}\\ \\mathrm{m} $$\n\n**Answer:** The atom can emit **6 different wavelengths**, and the shortest is about $97\\ \\mathrm{nm}$ (UV, the transition $4 \\to 1$).\n\n**General conclusion:** The number of possible lines from level $n$ is the number of ways of choosing two levels, that is $\\binom{n}{2}$, here $\\binom{4}{2} = 6$. The shortest wavelength always comes from the deepest fall (the largest energy difference), and the longest from the shallowest $(4 \\to 3)$."
   }
  ]
 }
});
